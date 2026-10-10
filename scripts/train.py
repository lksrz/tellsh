#!/usr/bin/env python3
"""Train the tellsh intent classifier and export model/model.bin.

Pipeline: hashed features (scripts/features.py == src/features.js) -> multinomial logistic
regression (scikit-learn) -> keep top-K feature rows by weight norm -> retrain on those ->
int8 quantisation (per-class scale) -> calibrate confidence threshold on a held-out split
plus out-of-domain sentences (data/ood.jsonl).

Usage: python3 scripts/train.py [--dim 262144] [--keep 24000] [--C auto]
"""
import argparse
import glob
import json
import os
import random
import re
import struct
import subprocess
import sys
import time

import numpy as np
from scipy import sparse
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from features import vectorize, normalize  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_jsonl(paths):
    rows = []
    for p in paths:
        with open(p, encoding='utf-8') as f:
            for ln, line in enumerate(f, 1):
                line = line.strip()
                if not line:
                    continue
                try:
                    rows.append(json.loads(line))
                except json.JSONDecodeError as e:
                    raise SystemExit(f'{p}:{ln}: {e}')
    return rows


def catalog_ids():
    out = subprocess.run(
        ['node', '-e', "import('./src/catalog.js').then(m=>console.log(JSON.stringify(m.INTENTS.map(i=>i.id))))"],
        cwd=ROOT, capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


KEYBOARD_NEIGHBOURS = 'qwertyuiop asdfghjkl zxcvbnm'


def typo(text, rng):
    """One random character-level edit (drop / swap / duplicate) inside a word."""
    chars = list(text)
    idxs = [i for i, c in enumerate(chars) if c.isalpha()]
    if len(idxs) < 4:
        return text
    i = rng.choice(idxs[1:-1])
    op = rng.random()
    if op < 0.4:
        del chars[i]
    elif op < 0.8 and i + 1 < len(chars) and chars[i + 1].isalpha():
        chars[i], chars[i + 1] = chars[i + 1], chars[i]
    else:
        chars.insert(i, chars[i])
    return ''.join(chars)


def featurize(texts, dim):
    indptr, indices, data = [0], [], []
    for t in texts:
        v = vectorize(t, dim)
        for k in sorted(v):
            indices.append(k)
            data.append(v[k])
        indptr.append(len(indices))
    return sparse.csr_matrix((np.array(data, dtype=np.float64), np.array(indices), np.array(indptr)),
                             shape=(len(texts), dim))


class CompactLR:
    """LogisticRegression fitted only on non-empty columns (much faster with hashed features)."""

    def __init__(self, clf, cols, dim):
        self.clf, self.cols = clf, cols
        self.coef_ = np.zeros((clf.coef_.shape[0], dim))
        self.coef_[:, cols] = clf.coef_
        self.intercept_ = clf.intercept_

    def predict_proba(self, X):
        return self.clf.predict_proba(X[:, self.cols])

    def predict(self, X):
        return self.predict_proba(X).argmax(1)


def fit(X, y, C, max_iter=1000):
    cols = np.flatnonzero(np.asarray((X != 0).sum(0)).ravel())
    clf = LogisticRegression(C=C, max_iter=max_iter, tol=1e-4)
    clf.fit(X[:, cols], y)
    return CompactLR(clf, cols, X.shape[1])


def softmax(z):
    z = z - z.max(axis=1, keepdims=True)
    e = np.exp(z)
    return e / e.sum(axis=1, keepdims=True)


def quantize(W):
    """W: (rows, classes) -> int8 Q, float32 scale per class."""
    scale = np.abs(W).max(axis=0) / 127.0
    scale[scale == 0] = 1.0
    Q = np.clip(np.round(W / scale), -127, 127).astype(np.int8)
    return Q, scale.astype(np.float32)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dim', type=int, default=1 << 18)
    ap.add_argument('--keep', type=int, default=24000, help='feature rows kept in the shipped model')
    ap.add_argument('--C', default='auto')
    ap.add_argument('--aug', type=int, default=1, help='typo-augmented copies per sample')
    ap.add_argument('--seed', type=int, default=13)
    ap.add_argument('--out', default=os.path.join(ROOT, 'model', 'model.bin'))
    args = ap.parse_args()
    rng = random.Random(args.seed)
    t0 = time.time()

    ids = catalog_ids()
    id_set = set(ids)
    paths = sorted(glob.glob(os.path.join(ROOT, 'data', 'intents', '*.jsonl')))
    extra = os.path.join(ROOT, 'data', 'train.jsonl')
    if os.path.exists(extra):
        paths.append(extra)
    rows = load_jsonl(paths)
    bad = sorted({r['intent'] for r in rows} - id_set)
    if bad:
        raise SystemExit(f'unknown intents in training data: {bad}')
    missing = [i for i in ids if i not in {r["intent"] for r in rows}]
    if missing:
        print(f'WARNING: intents without training data: {missing}', file=sys.stderr)
    labels = [i for i in ids if i not in missing]
    lab_idx = {l: k for k, l in enumerate(labels)}

    # held-out guarantee: drop training sentences that (after normalisation) also occur in data/eval
    eval_norm = {normalize(r['text']) for r in load_jsonl(sorted(glob.glob(os.path.join(ROOT, 'data', 'eval', '*.jsonl'))))}
    n0 = len(rows)
    rows = [r for r in rows if normalize(r['text']) not in eval_norm]
    print(f'dropped {n0 - len(rows)} training sentences that collide with the eval set')

    # dedupe on normalised text
    seen, data = set(), []
    for r in rows:
        key = (normalize(r['text']), r['intent'])
        if key in seen:
            continue
        seen.add(key)
        data.append(r)
    print(f'{len(data)} unique training sentences, {len(labels)} intents ({len(rows) - len(data)} dups dropped)')

    texts = [r['text'] for r in data]
    y = np.array([lab_idx[r['intent']] for r in data])

    def augment(txts, ys):
        at, ay = list(txts), list(ys)
        for _ in range(args.aug):
            for t, l in zip(txts, ys):
                at.append(typo(t, rng))
                ay.append(l)
        return at, np.array(ay)

    # ---- model selection + threshold calibration on an internal split ----
    tr_t, ho_t, tr_y, ho_y = train_test_split(texts, y, test_size=0.2, random_state=args.seed, stratify=y)
    a_t, a_y = augment(tr_t, tr_y)
    Xa = featurize(a_t, args.dim)
    Xho = featurize(ho_t, args.dim)
    ood_path = os.path.join(ROOT, 'data', 'ood.jsonl')
    ood = [r['text'] for r in load_jsonl([ood_path])] if os.path.exists(ood_path) else []
    Xood = featurize(ood, args.dim) if ood else None

    grid = [float(args.C)] if args.C != 'auto' else [10.0, 30.0]
    best = None
    for C in grid:
        clf = fit(Xa, a_y, C)
        acc = (clf.predict(Xho) == ho_y).mean()
        sys.stdout.flush()
        print(f'  C={C:<5} holdout acc={acc:.4f}')
        if best is None or acc > best[1]:
            best = (C, acc, clf)
    C, _, split_clf = best
    print(f'chosen C={C}')

    # threshold: keep >=97% of correct in-domain predictions, then maximise OOD rejection + correct acceptance
    p_ho = split_clf.predict_proba(Xho)
    conf_ho, pred_ho = p_ho.max(1), p_ho.argmax(1)
    correct = pred_ho == ho_y
    conf_ood = split_clf.predict_proba(Xood).max(1) if ood else np.array([])
    best_t, best_score = 0.0, -1
    for t in np.arange(0.02, 0.6, 0.005):
        keep_correct = (conf_ho[correct] >= t).mean()
        reject_wrong = (conf_ho[~correct] < t).mean() if (~correct).any() else 1.0
        reject_ood = (conf_ood < t).mean() if ood else 0.0
        if keep_correct < 0.97:
            continue
        score = keep_correct + 0.5 * reject_ood + 0.25 * reject_wrong
        if score > best_score:
            best_t, best_score = float(t), score
    print(f'threshold={best_t:.3f}  (holdout correct kept={(conf_ho[correct] >= best_t).mean():.3f}, '
          f'OOD rejected={(conf_ood < best_t).mean() if ood else float("nan"):.3f})')

    # ---- final model on all data ----
    all_t, all_y = augment(texts, y)
    X = featurize(all_t, args.dim)
    clf = fit(X, all_y, C)
    W = clf.coef_.T  # (dim, classes)
    norms = np.sqrt((W ** 2).sum(1))
    used = np.flatnonzero(norms > 0)
    keep = min(args.keep, len(used))
    rows_kept = np.sort(used[np.argsort(-norms[used])[:keep]])
    print(f'{len(used)} active feature rows, keeping {keep}')
    # retrain restricted to kept rows so the remaining weights compensate
    Xr = X[:, rows_kept]
    clf2 = fit(Xr, all_y, C)
    Wr = clf2.coef_.T.astype(np.float64)
    b = clf2.intercept_.astype(np.float32)
    Q, scale = quantize(Wr)

    # threshold re-check on final quantised model is done by scripts/eval.js
    header = {
        'version': 1,
        'dim': args.dim,
        'labels': labels,
        'rows': int(keep),
        'classes': len(labels),
        'threshold': round(best_t, 4),
        'C': C,
        'trained': time.strftime('%Y-%m-%d'),
        'n_train': len(texts),
    }
    hb = json.dumps(header, separators=(',', ':')).encode('utf-8')
    hb += b' ' * ((4 - (8 + len(hb)) % 4) % 4)  # align payload to 4 bytes
    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, 'wb') as f:
        f.write(b'TSH1')
        f.write(struct.pack('<I', len(hb)))
        f.write(hb)
        f.write(rows_kept.astype('<u4').tobytes())
        f.write(scale.astype('<f4').tobytes())
        f.write(b.astype('<f4').tobytes())
        f.write(Q.tobytes(order='C'))
    size = os.path.getsize(args.out)
    print(f'wrote {args.out} ({size / 1e6:.2f} MB)')

    # ---- parity fixture for test/parity.test.js ----
    eval_paths = sorted(glob.glob(os.path.join(ROOT, 'data', 'eval', '*.jsonl')))
    samples = [r['text'] for r in data[::max(1, len(data) // 40)]][:40]
    samples += ['Pokaż 5 największych plików w ~/Pobrane', 'zabij proces na porcie 8080',
                'ŻÓŁĆ gęślą jaźń 123', 'git   checkout -b "feature/x"', '', '???', 'ünïcödé straße']
    row_of = {int(r): k for k, r in enumerate(rows_kept)}
    Wq = Q.astype(np.float64) * scale.astype(np.float64)
    fixture = []
    for s in samples:
        v = vectorize(s, args.dim)
        logits = b.astype(np.float64).copy()
        for k, val in v.items():
            if k in row_of:
                logits += val * Wq[row_of[k]]
        p = softmax(logits[None, :])[0]
        top = np.argsort(-p)[:3]
        fixture.append({'text': s,
                        'features': [[int(k), v[k]] for k in sorted(v)],
                        'top': [[labels[i], float(p[i])] for i in top]})
    fx = os.path.join(ROOT, 'test', 'fixtures', 'parity.json')
    os.makedirs(os.path.dirname(fx), exist_ok=True)
    with open(fx, 'w', encoding='utf-8') as f:
        json.dump({'dim': args.dim, 'samples': fixture}, f, ensure_ascii=False)
    print(f'wrote {fx}; eval files present: {len(eval_paths)} (never used for training)')
    print(f'done in {time.time() - t0:.1f}s')


if __name__ == '__main__':
    main()
