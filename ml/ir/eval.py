"""Decode P and D outputs into predictions and score them with ir/lib (gate + compile) via node.

    # predict + score (needs node; on the Mac)
    python ml/ir/eval.py --ckpt build/ir/runs/h8/best.pt --split dev
    # predict only (GPU box without node), score later on the Mac
    python ml/ir/eval.py --ckpt best.pt --split dev --no-node --preds-out preds_dev.jsonl
    python ml/ir/eval.py --score-only --preds preds_dev.jsonl --split dev

Predictions are JSONL rows {id, p: {label, single, op, pin, mods, stderr, slots}, d: {actions, logp}} that
scripts/ir/eval_pred.mjs assembles into IR (P route), decodes from actions (D route) and routes P-then-D.
Each row also carries confidences of the greedy choices (ignored by older readers):
  p.conf = {label, min, prod}            label prob; min / product over the P probs the prediction uses
  d.conf = {label, min_tok, min_margin, ptr_min, ptr_logp}
           status-token prob, min action-token prob, min top1-top2 token margin, min / summed log of pointer
           (start*end) probs; d.logp stays the summed action-token log-prob.
Calibrate thresholds on dev with: node scripts/ir/eval_pred.mjs --calibrate ... (see ml/ir/README.md).
"""
import argparse
import json
import os
import subprocess
import sys
from functools import partial

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))


def p_conf(p, i, v, slots):
    """Probabilities of the greedy P choices that make up the prediction -> {label, min, prod}. Non-ok: label only;
    ok: + single, op, pin, stderr, every mod bit, every slot kind, start/end of predicted pointer slots."""
    ps = [float(p["label_prob"][i])]
    if v.labels[int(p["label"][i])] == "ok":
        ps += [float(p[k][i]) for k in ("single_prob", "op_prob", "pin_prob", "stderr_prob")]
        ps += p["mods_prob"][i].tolist() + p["kind_prob"][i].tolist()
        for k, s in enumerate(v.slots):
            if s in slots and slots[s]["u"][0] >= 0:
                ps += [float(p["start_prob"][i, k]), float(p["end_prob"][i, k])]
    prod = 1.0
    for x in ps:
        prod *= x
    return {"label": round(ps[0], 6), "min": round(min(ps), 6), "prod": round(prod, 6)}


def score(preds, split, data_dir, out):
    data = os.path.join(data_dir, f"{split}.jsonl")
    cmd = ["node", os.path.join(ROOT, "scripts/ir/eval_pred.mjs"), "--preds", preds, "--data", data, "--out", out]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        sys.exit(f"eval_pred.mjs failed:\n{r.stderr}")
    rep = json.loads(r.stdout)
    print(f"report -> {out}")
    keys = ["n", "label_acc", "exact_ir", "cmd_match", "accepted", "accepted_wrong", "accepted_wrong_rate_all",
            "accepted_wrong_rate_accepted", "abstain_precision", "abstain_recall", "routed_to_P"]
    for route, m in rep["routes"].items():
        print(f"  {route:3s} " + "  ".join(f"{k}={m[k]}" for k in keys if k in m))
    return rep


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--ckpt")
    a.add_argument("--split", default="dev")
    a.add_argument("--targets", default=os.path.join(ROOT, "build/ir/targets/v1"))
    a.add_argument("--data", default=os.path.join(ROOT, "build/ir/dataset/v1"), help="dataset dir (gold IR for scoring)")
    a.add_argument("--preds-out", default="")
    a.add_argument("--preds", default="", help="with --score-only: saved predictions")
    a.add_argument("--report", default="")
    a.add_argument("--batch", type=int, default=128)
    a.add_argument("--limit", type=int, default=0)
    a.add_argument("--device", default="")
    a.add_argument("--no-node", action="store_true", help="only write predictions")
    a.add_argument("--score-only", action="store_true", help="score --preds with node, no model")
    args = a.parse_args()

    if args.score_only:
        preds = args.preds
        score(preds, args.split, args.data, args.report or preds.replace(".jsonl", "") + ".report.json")
        return
    # model-side imports only here: --score-only needs neither torch nor numpy (plain python3 + node)
    import torch
    from torch.utils.data import DataLoader
    from data import IRDataset, Vocab, collate
    from metrics import d_sequences, p_rows, quick_metrics
    from model import IRModel

    dev = torch.device(args.device or ("cuda" if torch.cuda.is_available() else "cpu"))
    ck = torch.load(args.ckpt, map_location=dev, weights_only=False)
    vocab = Vocab(ck["vocab"])
    ta = ck["args"]
    model = IRModel(vocab, d_model=ta["d_model"], d_layers=ta["d_layers"], d_heads=ta["d_heads"], d_ff=ta["d_ff"], arm=ta["arm"])
    model.load_state_dict(ck["model"])
    model.to(dev).eval()
    ds = IRDataset(os.path.join(args.targets, f"{args.split}.jsonl"), vocab, limit=args.limit)
    dl = DataLoader(ds, batch_size=args.batch, shuffle=False, collate_fn=partial(collate, v=vocab))
    preds_path = args.preds_out or os.path.join(os.path.dirname(args.ckpt), f"preds_{args.split}.jsonl")
    batches, k = [], 0
    with open(preds_path, "w", encoding="utf-8") as f:
        for b in dl:
            b = {x: y.to(dev) for x, y in b.items()}
            p, acts, spans, logp, dc = model.predict(b, conf=True)
            batches.append((b, p, acts, spans))
            dc = {x: y.tolist() for x, y in dc.items()}
            for i, (pr, dseq, lp) in enumerate(zip(p_rows(p, vocab), d_sequences(acts, spans, vocab), logp.tolist())):
                pr["conf"] = p_conf(p, i, vocab, pr["slots"])
                d = {"actions": dseq, "logp": round(lp, 4), "conf": {x: round(y[i], 6) for x, y in dc.items()}}
                f.write(json.dumps({"id": ds.rows[k]["id"], "p": pr, "d": d}) + "\n")
                k += 1
    print(f"{k} predictions -> {preds_path}")
    print("quick " + json.dumps(quick_metrics(batches, vocab)))
    if not args.no_node:
        score(preds_path, args.split, args.data, args.report or preds_path.replace(".jsonl", "") + ".report.json")


if __name__ == "__main__":
    main()
