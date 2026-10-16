"""Learned verifier for the typed-IR pipeline: p(correct | request, os, candidate command).

Runs after the gate (which cannot check semantics): a cross-encoder over the pair "<s> os: request </s></s> command </s>"
(token ids made in JS by scripts/ir/make_negatives.mjs / make_candidates.mjs, student Unigram tokenizer), encoder
initialised from the S student exactly like ml/ir/model.py, mean-pool over non-pad tokens + linear head.

    python ml/ir/verifier.py train --data build/ir/verifier/v1 --out build/ir/runs/ver1 [--epochs 6 --batch 128]
    python ml/ir/verifier.py score --ckpt build/ir/runs/ver1/best.pt --pairs CAND.jsonl --out SCORES.jsonl --amp fp16   # fp16 on the 2080 Ti

train: BCE with small label smoothing, CUDA (AMP bf16, or fp16 + GradScaler) or CPU; OUT/last.pt each epoch (full state,
--resume continues from it), OUT/best.pt (weights only) on the best selection AUC (ties: lower ECE); early stop after
--patience evals without improvement; logs to OUT/log.jsonl. Selection set: DATA/select.jsonl when present (real
k-fold generator outputs, make_negatives.mjs --kfold), else the synthetic DATA/dev.jsonl (a weak proxy for AUC on real
candidates); both are evaluated and logged. score: writes {id, p_ok} per input row.
AMP auto: bf16 only on compute capability >= 8 (Ampere+), else fp16 (Turing reports bf16 support via slow emulation).
"""
import argparse
import json
import math
import os
import random
import sys
import time

import torch
import torch.nn as nn
import torch.nn.functional as F

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from model import Encoder  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
PAD = 1


# ---------------------------------------------------------------- data

def read_jsonl(path, limit=0, seed=0):
    with open(path, encoding="utf-8") as f:
        rows = [json.loads(l) for l in f if l.strip()]
    if limit and limit < len(rows):
        random.Random(seed).shuffle(rows)
        rows = rows[:limit]
    return rows


def collate(rows, max_len=160):
    T = min(max_len, max(len(r["ids"]) for r in rows))
    ids = torch.full((len(rows), T), PAD, dtype=torch.long)
    for i, r in enumerate(rows):
        x = r["ids"][:T]
        ids[i, :len(x)] = torch.tensor(x)
    y = torch.tensor([float(r.get("y", 0)) for r in rows])
    return {"ids": ids, "attn": ids != PAD, "y": y}


def batches(rows, bs, shuffle, seed=0):
    idx = list(range(len(rows)))
    if shuffle:
        random.Random(seed).shuffle(idx)
    for s in range(0, len(idx), bs):
        yield [rows[i] for i in idx[s:s + bs]]


# ---------------------------------------------------------------- model

class Verifier(nn.Module):
    def __init__(self, dropout=0.1):
        super().__init__()
        self.enc = Encoder()
        self.drop = nn.Dropout(dropout)
        self.head = nn.Linear(self.enc.word.embedding_dim, 1)

    def forward(self, ids, attn):
        x = self.enc(ids, attn)
        m = attn.unsqueeze(-1).to(x.dtype)
        pooled = (x * m).sum(1) / m.sum(1).clamp(min=1.0)
        return self.head(self.drop(pooled)).squeeze(-1).float()


# ---------------------------------------------------------------- metrics

def auc(p, y):
    """ROC AUC (Mann-Whitney with tie handling)."""
    pairs = sorted(zip(p, y))
    n1 = sum(y)
    n0 = len(y) - n1
    if not n1 or not n0:
        return float("nan")
    rank_sum, i = 0.0, 0
    while i < len(pairs):
        j = i
        while j < len(pairs) and pairs[j][0] == pairs[i][0]:
            j += 1
        r = (i + j + 1) / 2.0  # average 1-based rank of the tie block
        rank_sum += r * sum(t[1] for t in pairs[i:j])
        i = j
    return (rank_sum - n1 * (n1 + 1) / 2.0) / (n1 * n0)


def ece(p, y, bins=10):
    tot, n = 0.0, len(p)
    for b in range(bins):
        lo, hi = b / bins, (b + 1) / bins
        sel = [(pi, yi) for pi, yi in zip(p, y) if (lo <= pi < hi) or (b == bins - 1 and pi == 1.0)]
        if sel:
            tot += len(sel) / n * abs(sum(s[0] for s in sel) / len(sel) - sum(s[1] for s in sel) / len(sel))
    return tot


# ---------------------------------------------------------------- train / score

def amp_setup(dev, amp):
    if amp == "auto":
        amp = ("bf16" if torch.cuda.get_device_capability(dev)[0] >= 8 else "fp16") if dev.type == "cuda" else "off"
    dtype = {"bf16": torch.bfloat16, "fp16": torch.float16}.get(amp)
    ctx = (lambda: torch.autocast(dev.type, dtype=dtype)) if dtype else (lambda: torch.autocast(dev.type, enabled=False))
    return amp, ctx


@torch.no_grad()
def predict(model, rows, dev, amp_ctx, bs=256):
    model.eval()
    out = []
    for b in batches(rows, bs, False):
        t = collate(b)
        with amp_ctx():
            out.extend(torch.sigmoid(model(t["ids"].to(dev), t["attn"].to(dev))).tolist())
    model.train()
    return out


def evaluate(model, rows, dev, amp_ctx):
    p = predict(model, rows, dev, amp_ctx)
    y = [int(r["y"]) for r in rows]
    eps = 1e-6
    nll = -sum(math.log(max(eps, pi if yi else 1 - pi)) for pi, yi in zip(p, y)) / max(1, len(y))
    acc = sum((pi >= 0.5) == bool(yi) for pi, yi in zip(p, y)) / max(1, len(y))
    return {"auc": round(auc(p, y), 5), "ece": round(ece(p, y), 5), "nll": round(nll, 5), "acc": round(acc, 4), "n": len(y), "pos": sum(y)}


def train(args):
    torch.manual_seed(args.seed)
    dev = torch.device(args.device or ("cuda" if torch.cuda.is_available() else "cpu"))
    amp, amp_ctx = amp_setup(dev, args.amp)
    scaler = torch.amp.GradScaler("cuda", enabled=amp == "fp16")
    os.makedirs(args.out, exist_ok=True)
    tr = read_jsonl(os.path.join(args.data, "train.jsonl"), args.limit, args.seed)
    dv = read_jsonl(os.path.join(args.data, "dev.jsonl"), args.dev_limit, args.seed)
    sel_path = args.select or os.path.join(args.data, "select.jsonl")
    sel = read_jsonl(sel_path) if os.path.exists(sel_path) and args.select != "none" else None
    print(f"checkpoint selection on {sel_path + f' ({len(sel)} real rows)' if sel else 'synthetic dev (no select.jsonl)'}", flush=True)
    model = Verifier(args.dropout)
    last = os.path.join(args.out, "last.pt")
    resuming = args.resume and os.path.exists(last)
    if not args.no_student and not resuming:
        print(f"encoder initialised from {args.student} {model.enc.load_student(args.student)}", flush=True)
    model.to(dev)
    enc_ids = {id(p) for p in model.enc.parameters()}
    opt = torch.optim.AdamW([{"params": list(model.enc.parameters()), "lr": args.enc_lr},
                             {"params": [p for p in model.parameters() if id(p) not in enc_ids], "lr": args.lr}], weight_decay=args.wd)
    spe = math.ceil(len(tr) / args.batch)
    total = args.epochs * spe if not args.max_steps else min(args.epochs * spe, args.max_steps)
    sched = torch.optim.lr_scheduler.LambdaLR(
        opt, lambda s: min(1.0, (s + 1) / max(1, args.warmup)) * max(0.05, 0.5 * (1 + math.cos(math.pi * min(1.0, s / max(1, total))))))
    step, epoch0, best, bad = 0, 0, (-1.0, 0.0), 0
    if resuming:
        ck = torch.load(last, map_location=dev, weights_only=False)
        model.load_state_dict(ck["model"])
        opt.load_state_dict(ck["opt"])
        sched.load_state_dict(ck["sched"])
        scaler.load_state_dict(ck["scaler"])
        step, epoch0, best, bad = ck["step"], ck["epoch"], tuple(ck["best"]), ck["bad"]
        print(f"resumed from {last}: step {step} epoch {epoch0}", flush=True)
    npos = sum(int(r["y"]) for r in tr)
    pos_weight = torch.tensor(args.pos_weight if args.pos_weight > 0 else 1.0, device=dev)
    print(f"device {dev} amp {amp} train {len(tr)} (pos {npos}) dev {len(dv)} steps/epoch {spe} total {total}", flush=True)
    log = open(os.path.join(args.out, "log.jsonl"), "a", encoding="utf-8")

    def run_eval(epoch):
        nonlocal best, bad
        m = evaluate(model, dv, dev, amp_ctx)
        rec = {"type": "eval", "step": step, "epoch": epoch, **m}
        if sel:
            ms = evaluate(model, sel, dev, amp_ctx)
            rec["select"] = ms
            m = ms
        log.write(json.dumps(rec) + "\n")
        log.flush()
        print("eval " + json.dumps(rec), flush=True)
        key = (m["auc"], -m["ece"])
        if key > best:
            best, bad = key, 0
            torch.save({"model": model.state_dict(), "step": step, "epoch": epoch, "args": vars(args), "dev": rec}, os.path.join(args.out, "best.pt"))
        else:
            bad += 1

    model.train()
    t0, run, rn = time.time(), 0.0, 0
    for epoch in range(epoch0, args.epochs):
        for b in batches(tr, args.batch, True, seed=args.seed * 1000 + epoch):
            if args.max_steps and step >= args.max_steps:
                break
            t = collate(b)
            ids, attn, y = t["ids"].to(dev), t["attn"].to(dev), t["y"].to(dev)
            ys = y * (1 - args.smooth) + 0.5 * args.smooth
            with amp_ctx():
                logit = model(ids, attn)
            loss = F.binary_cross_entropy_with_logits(logit, ys, pos_weight=pos_weight)
            opt.zero_grad(set_to_none=True)
            scaler.scale(loss).backward()
            scaler.unscale_(opt)
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
            scaler.step(opt)
            scaler.update()
            sched.step()
            step += 1
            run, rn = run + float(loss.detach()), rn + 1
            if step % args.log_every == 0:
                rec = {"type": "train", "step": step, "epoch": epoch, "loss": round(run / rn, 5), "sec": round(time.time() - t0, 1)}
                log.write(json.dumps(rec) + "\n")
                log.flush()
                print(json.dumps(rec), flush=True)
                run, rn = 0.0, 0
            if args.eval_every and step % args.eval_every == 0:
                run_eval(epoch)
        if not args.eval_every or step % args.eval_every:
            run_eval(epoch)
        torch.save({"model": model.state_dict(), "opt": opt.state_dict(), "sched": sched.state_dict(), "scaler": scaler.state_dict(),
                    "step": step, "epoch": epoch + 1, "best": list(best), "bad": bad, "args": vars(args)}, last)
        if (args.max_steps and step >= args.max_steps) or (args.patience and bad >= args.patience):
            break
    print(f"done: best {'select' if sel else 'dev'} auc {best[0]} ece {-best[1]}  ({time.time() - t0:.0f}s)", flush=True)


def score(args):
    dev = torch.device(args.device or ("cuda" if torch.cuda.is_available() else "cpu"))
    _, amp_ctx = amp_setup(dev, args.amp)
    ck = torch.load(args.ckpt, map_location="cpu", weights_only=False)
    model = Verifier()
    model.load_state_dict(ck["model"])
    model.to(dev)
    rows = read_jsonl(args.pairs)
    t0 = time.time()
    p = predict(model, rows, dev, amp_ctx, bs=args.batch)
    dt = time.time() - t0
    with open(args.out, "w", encoding="utf-8") as f:
        for r, pi in zip(rows, p):
            f.write(json.dumps({"id": r["id"], "p_ok": round(pi, 6)}) + "\n")
    msg = f"scored {len(rows)} pairs in {dt:.1f}s ({1000 * dt / max(1, len(rows)):.2f} ms/pair, {dev}) -> {args.out}"
    if rows and "y" in rows[0]:
        y = [int(r["y"]) for r in rows]
        msg += f"  auc {auc(p, y):.4f} ece {ece(p, y):.4f}"
    print(msg, flush=True)


def main():
    a = argparse.ArgumentParser()
    sub = a.add_subparsers(dest="cmd", required=True)
    t = sub.add_parser("train")
    t.add_argument("--data", default=os.path.join(ROOT, "build/ir/verifier/v1"))
    t.add_argument("--student", default=os.path.join(ROOT, "hybrid/models/student/student.bin"))
    t.add_argument("--out", default=os.path.join(ROOT, "build/ir/runs/ver1"))
    t.add_argument("--epochs", type=int, default=6)
    t.add_argument("--max-steps", type=int, default=0)
    t.add_argument("--batch", type=int, default=128)
    t.add_argument("--lr", type=float, default=1e-3, help="head")
    t.add_argument("--enc-lr", type=float, default=5e-5, help="pretrained encoder")
    t.add_argument("--wd", type=float, default=0.01)
    t.add_argument("--warmup", type=int, default=300)
    t.add_argument("--dropout", type=float, default=0.1)
    t.add_argument("--smooth", type=float, default=0.02, help="label smoothing")
    t.add_argument("--pos-weight", type=float, default=0.0, help="BCE pos_weight (0 = 1.0)")
    t.add_argument("--limit", type=int, default=0)
    t.add_argument("--dev-limit", type=int, default=0)
    t.add_argument("--log-every", type=int, default=50)
    t.add_argument("--eval-every", type=int, default=0, help="also eval every N steps (0 = once per epoch)")
    t.add_argument("--patience", type=int, default=3)
    t.add_argument("--no-student", action="store_true")
    t.add_argument("--resume", action="store_true")
    t.add_argument("--select", default="", help="checkpoint-selection pairs (default DATA/select.jsonl if present; 'none' = dev)")
    t.add_argument("--device", default="")
    t.add_argument("--amp", default="auto", choices=["auto", "bf16", "fp16", "off"])
    t.add_argument("--seed", type=int, default=1)
    s = sub.add_parser("score")
    s.add_argument("--ckpt", required=True)
    s.add_argument("--pairs", required=True)
    s.add_argument("--out", required=True)
    s.add_argument("--batch", type=int, default=256)
    s.add_argument("--device", default="")
    s.add_argument("--amp", default="auto", choices=["auto", "bf16", "fp16", "off"])
    args = a.parse_args()
    train(args) if args.cmd == "train" else score(args)


if __name__ == "__main__":
    main()
