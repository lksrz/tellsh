"""Train the typed-IR model (P heads + D decoder) on targets exported by scripts/ir/export_targets.mjs.

    python ml/ir/train.py --targets build/ir/targets/v1 --out runs/ir_h8 [--max-epochs 12 --batch 64 --lr 3e-4]
    # k-fold (ml/ir/kfold.py): --train-file / --dev-file override TARGETS/{train,dev}.jsonl

Anti-overfitting: label smoothing (--label-smoothing, label head + D actions), --dropout, --wd; early stopping when
dev d_exact has not improved for --patience evals (0 = off). best.pt is kept by dev d_exact (not loss).

CUDA when available (AMP bf16, or fp16 + GradScaler), else CPU (f32). Checkpoints: OUT/last.pt every epoch (and every
--ckpt-steps; full state incl. optimizer), OUT/best.pt (weights only) on the best dev exact-action match; --resume
continues from OUT/last.pt (a fresh run, with the student encoder, when it does not exist). Logs: OUT/log.jsonl.
"""
import argparse
import json
import math
import os
import sys
import time
from functools import partial

import torch
from torch.utils.data import DataLoader

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from data import IRDataset, Vocab, collate, load_vocab  # noqa: E402
from model import IRModel, param_counts  # noqa: E402
from metrics import quick_metrics  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))


def args_parser():
    a = argparse.ArgumentParser()
    a.add_argument("--targets", default=os.path.join(ROOT, "build/ir/targets/v1"))
    a.add_argument("--student", default=os.path.join(ROOT, "hybrid/models/student/student.bin"))
    a.add_argument("--out", default=os.path.join(ROOT, "build/ir/runs/h8"))
    a.add_argument("--arm", default="H8", choices=["H8", "HQ"], help="HQ = ternary QAT (not implemented yet)")
    a.add_argument("--max-epochs", "--epochs", dest="epochs", type=int, default=12)
    a.add_argument("--patience", type=int, default=3, help="stop after N evals without a dev d_exact gain (0 = off)")
    a.add_argument("--label-smoothing", type=float, default=0.1)
    a.add_argument("--train-file", default="", help="targets jsonl to train on (default TARGETS/train.jsonl)")
    a.add_argument("--dev-file", default="", help="targets jsonl for dev eval (default TARGETS/dev.jsonl)")
    a.add_argument("--max-steps", type=int, default=0, help="stop after this many optimizer steps (0 = no cap)")
    a.add_argument("--batch", type=int, default=64)
    a.add_argument("--lr", type=float, default=3e-4, help="P heads + decoder")
    a.add_argument("--enc-lr", type=float, default=1e-4, help="pretrained encoder")
    a.add_argument("--wd", type=float, default=0.01)
    a.add_argument("--warmup", type=int, default=500)
    a.add_argument("--d-model", type=int, default=384)
    a.add_argument("--d-layers", type=int, default=5)
    a.add_argument("--d-heads", type=int, default=8)
    a.add_argument("--d-ff", type=int, default=1536)
    a.add_argument("--dropout", type=float, default=0.1)
    a.add_argument("--limit", type=int, default=0, help="train on a random subset of N rows")
    a.add_argument("--dev-limit", type=int, default=0)
    a.add_argument("--log-every", type=int, default=50)
    a.add_argument("--eval-every", type=int, default=0, help="also eval every N steps (0 = once per epoch)")
    a.add_argument("--ckpt-steps", type=int, default=0)
    a.add_argument("--no-student", action="store_true", help="random encoder init")
    a.add_argument("--resume", action="store_true")
    a.add_argument("--device", default="")
    a.add_argument("--amp", default="auto", choices=["auto", "bf16", "fp16", "off"])
    a.add_argument("--workers", type=int, default=0)
    a.add_argument("--seed", type=int, default=1)
    return a


def model_kwargs(args):
    return dict(d_model=args.d_model, d_layers=args.d_layers, d_heads=args.d_heads, d_ff=args.d_ff, arm=args.arm, dropout=args.dropout,
                label_smoothing=args.label_smoothing)


def to(b, dev):
    return {k: v.to(dev, non_blocking=True) for k, v in b.items()}


@torch.no_grad()
def evaluate(model, loader, dev, amp_ctx):
    model.eval()
    tot, n, agg = 0.0, 0, {}
    preds = []
    for b in loader:
        b = to(b, dev)
        with amp_ctx():
            loss, parts = model.loss(b)
            p, acts, spans, _ = model.predict(b)
        tot += float(loss.detach()) * b["ids"].shape[0]
        n += b["ids"].shape[0]
        preds.append((b, p, acts, spans))
    model.train()
    m = quick_metrics(preds, model.v)
    m["loss"] = tot / max(1, n)
    return m


def main():
    args = args_parser().parse_args()
    torch.manual_seed(args.seed)
    dev = torch.device(args.device or ("cuda" if torch.cuda.is_available() else "cpu"))
    amp = args.amp
    if amp == "auto":
        amp = ("bf16" if torch.cuda.get_device_capability(dev)[0] >= 8 else "fp16") if dev.type == "cuda" else "off"  # Turing: fp16
    dtype = {"bf16": torch.bfloat16, "fp16": torch.float16}.get(amp)
    amp_ctx = (lambda: torch.autocast(dev.type, dtype=dtype)) if dtype else (lambda: torch.autocast(dev.type, enabled=False))
    scaler = torch.amp.GradScaler("cuda", enabled=amp == "fp16")
    os.makedirs(args.out, exist_ok=True)
    vocab = Vocab(load_vocab(args.targets))
    tr = IRDataset(args.train_file or os.path.join(args.targets, "train.jsonl"), vocab, limit=args.limit, seed=args.seed)
    dv = IRDataset(args.dev_file or os.path.join(args.targets, "dev.jsonl"), vocab, limit=args.dev_limit, seed=args.seed)
    col = partial(collate, v=vocab)
    lkw = dict(collate_fn=col, num_workers=args.workers, persistent_workers=args.workers > 0, pin_memory=dev.type == "cuda")
    tl = DataLoader(tr, batch_size=args.batch, shuffle=True, drop_last=True, **lkw)
    dl = DataLoader(dv, batch_size=args.batch * 2, shuffle=False, **lkw)
    model = IRModel(vocab, **model_kwargs(args))
    last = os.path.join(args.out, "last.pt")
    resuming = args.resume and os.path.exists(last)
    if args.resume and not resuming:
        print(f"--resume: {last} not found, starting a fresh run", flush=True)
    if not args.no_student and not resuming:
        cfg = model.enc.load_student(args.student)
        print(f"encoder initialised from {args.student} {cfg}", flush=True)
    model.to(dev)
    pc = param_counts(model)
    print(f"params {json.dumps(pc)}  device {dev}  amp {amp}  train {len(tr)}  dev {len(dv)}", flush=True)
    enc_params = list(model.enc.parameters())
    enc_ids = {id(p) for p in enc_params}
    rest = [p for p in model.parameters() if id(p) not in enc_ids]
    opt = torch.optim.AdamW([{"params": enc_params, "lr": args.enc_lr}, {"params": rest, "lr": args.lr}], weight_decay=args.wd)
    steps_per_epoch = len(tl)
    total = args.epochs * steps_per_epoch
    if args.max_steps:
        total = min(total, args.max_steps)
    sched = torch.optim.lr_scheduler.LambdaLR(
        opt, lambda s: min(1.0, (s + 1) / max(1, args.warmup)) * max(0.05, 0.5 * (1 + math.cos(math.pi * min(1.0, s / max(1, total))))))
    step, epoch0, skip0, best, bad = 0, 0, 0, -1.0, 0
    if resuming:
        ck = torch.load(last, map_location=dev, weights_only=False)
        model.load_state_dict(ck["model"])
        opt.load_state_dict(ck["opt"])
        sched.load_state_dict(ck["sched"])
        if "scaler" in ck:
            scaler.load_state_dict(ck["scaler"])
        step, epoch0, skip0, best = ck["step"], ck["epoch"], ck.get("ebatch", 0), ck.get("best", -1.0)
        bad = ck.get("bad", 0)
        print(f"resumed from {last}: step {step} epoch {epoch0} batch {skip0}", flush=True)
    log = open(os.path.join(args.out, "log.jsonl"), "a", encoding="utf-8")

    def save(path, epoch, ebatch=0):
        # last.pt: full training state; ebatch = batches already done in `epoch` (mid-epoch --ckpt-steps saves)
        torch.save({"model": model.state_dict(), "opt": opt.state_dict(), "sched": sched.state_dict(), "scaler": scaler.state_dict(),
                    "step": step, "epoch": epoch, "ebatch": ebatch, "best": best, "bad": bad, "args": vars(args), "vocab": vocab.raw,
                    "params": pc}, path)

    def save_best(path, epoch):
        # weights only (no optimizer / scheduler state) so best.pt stays small enough to ship
        torch.save({"model": model.state_dict(), "step": step, "epoch": epoch, "args": vars(args), "vocab": vocab.raw,
                    "params": pc}, path)

    def run_eval(epoch):
        nonlocal best, bad
        m = evaluate(model, dl, dev, amp_ctx)
        rec = {"type": "eval", "step": step, "epoch": epoch, **m}
        log.write(json.dumps(rec) + "\n")
        log.flush()
        print("eval " + json.dumps(rec), flush=True)
        if m["d_exact"] > best:
            best, bad = m["d_exact"], 0
            save_best(os.path.join(args.out, "best.pt"), epoch)
        else:
            bad += 1

    stop = lambda: args.patience > 0 and bad >= args.patience  # noqa: E731

    model.train()
    t0, run = time.time(), {}
    if resuming and (stop() or (args.max_steps and step >= args.max_steps)):
        print(f"already stopped (bad {bad}, step {step}): skipping training", flush=True)
        epoch0 = args.epochs
    for epoch in range(epoch0, args.epochs):
        skip, skip0 = skip0, 0
        done = skip  # batches of this epoch already trained on
        for bi, b in enumerate(tl):
            if bi < skip:  # resume mid-epoch: skip the batches already trained on (new shuffle order, same count)
                continue
            if args.max_steps and step >= args.max_steps:
                break
            b = to(b, dev)
            with amp_ctx():
                loss, parts = model.loss(b)
            opt.zero_grad(set_to_none=True)
            scaler.scale(loss).backward()
            scaler.unscale_(opt)
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
            scaler.step(opt)
            scaler.update()
            sched.step()
            step += 1
            done = bi + 1
            for k, v in parts.items():
                run[k] = run.get(k, 0.0) + v
            run["loss"] = run.get("loss", 0.0) + float(loss.detach())
            run["_n"] = run.get("_n", 0) + 1
            if step % args.log_every == 0:
                n = run.pop("_n")
                rec = {"type": "train", "step": step, "epoch": epoch, "lr": sched.get_last_lr()[1], "sec": round(time.time() - t0, 1),
                       **{k: round(v / n, 4) for k, v in run.items()}}
                log.write(json.dumps(rec) + "\n")
                log.flush()
                print(json.dumps(rec), flush=True)
                run = {}
            if args.eval_every and step % args.eval_every == 0:
                run_eval(epoch)
                if stop():
                    break
            if args.ckpt_steps and step % args.ckpt_steps == 0:
                save(last, epoch, bi + 1)
        full = done >= steps_per_epoch
        if not (stop() and args.eval_every and step % args.eval_every == 0):  # skip a repeat eval at the same step
            run_eval(epoch + 1 if full else epoch)
        save(last, epoch + 1, 0) if full else save(last, epoch, done)
        if args.max_steps and step >= args.max_steps:
            break
        if stop():
            print(f"early stop: no dev d_exact gain in {bad} evals (best {best:.4f})", flush=True)
            break
    print(f"done: step {step}, best dev d_exact {best:.4f}, {time.time() - t0:.0f}s", flush=True)


if __name__ == "__main__":
    main()
