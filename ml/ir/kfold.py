"""K-fold model-error mining: train one generator per fold of the TRAIN split and predict its held-out fold.

    node scripts/ir/kfold_split.mjs --v v1 --k 3                 # on the Mac (needs node); copy targets to the GPU box
    python ml/ir/kfold.py --v v1 --k 3 --out build/ir/runs/kfold [train.py args after --, e.g. -- --batch 128 --workers 2]
    node scripts/ir/kfold_mine.mjs --v v1 --k 3 --runs build/ir/runs/kfold   # on the Mac: verifier rows

Per fold k: train.py --train-file TARGETS/fold{k}_train.jsonl (dev = the regular dev split, for early stopping) into
OUT/fold{k}, then eval.py --no-node --data-file TARGETS/fold{k}_heldout.jsonl --preds-out OUT/fold{k}/preds_heldout.jsonl.
Folds whose preds are complete (one row per held-out row; eval.py writes them atomically) are skipped (rerun = resume); a fold with OUT/fold{k}/last.pt but no preds resumes training.
"""
import argparse
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))


def lines(path, limit=0):
    with open(path, encoding="utf-8") as f:
        n = sum(1 for l in f if l.strip())
    return min(n, limit) if limit else n


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--v", default="v1")
    a.add_argument("--k", type=int, default=3)
    a.add_argument("--folds", default="", help="comma list of folds to run (default all)")
    a.add_argument("--out", default=os.path.join(ROOT, "build/ir/runs/kfold"))
    a.add_argument("--eval-batch", type=int, default=128)
    a.add_argument("--eval-limit", type=int, default=0)
    args, extra = a.parse_known_args()
    extra = [x for x in extra if x != "--"]
    targets = os.path.join(ROOT, "build/ir/targets", args.v)
    folds = [int(x) for x in args.folds.split(",")] if args.folds else range(args.k)
    for k in folds:
        out = os.path.join(args.out, f"fold{k}")
        preds = os.path.join(out, "preds_heldout.jsonl")
        if os.path.exists(preds) and lines(preds) == lines(os.path.join(targets, f"fold{k}_heldout.jsonl"), args.eval_limit):
            print(f"fold {k}: {preds} exists, skipping", flush=True)
            continue
        tr = [sys.executable, os.path.join(HERE, "train.py"), "--targets", targets, "--out", out,
              "--train-file", os.path.join(targets, f"fold{k}_train.jsonl"), "--resume", *extra]
        print(f"fold {k}: " + " ".join(tr), flush=True)
        subprocess.run(tr, check=True)
        ev = [sys.executable, os.path.join(HERE, "eval.py"), "--ckpt", os.path.join(out, "best.pt"), "--no-node",
              "--data-file", os.path.join(targets, f"fold{k}_heldout.jsonl"), "--preds-out", preds,
              "--batch", str(args.eval_batch), "--limit", str(args.eval_limit)]
        print(f"fold {k}: " + " ".join(ev), flush=True)
        subprocess.run(ev, check=True)
    print("kfold done", flush=True)


if __name__ == "__main__":
    main()
