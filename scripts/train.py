#!/usr/bin/env python3
"""Train the tellsh v0.2 cascade and export model/model.bin (TSH2).

Input: build/cls.jsonl, build/tag.jsonl, build/meta.json written by `node scripts/gen_data.js`
(features are computed in JS by src/features.js -- the same code used at runtime).

Models (all multinomial logistic regression, int8-quantised, top-K feature rows kept):
  tool          stage 1: request -> tool family (+ __none__ for non-shell requests)
  intent:<fam>  stage 2: request -> intent, one model per family with >1 intent
  tagger        stage 3: token -> BIO slot label (tool is an input feature)

Thresholds are calibrated on a group-wise holdout (all copies of a sentence stay on one side):
  accept   cascade score p(tool) * p(intent|tool) needed to answer from the catalog
  compose  stage-1 tool probability needed to try the experimental composer instead

Usage: python3 scripts/train.py [--keep-tool 20000] [--C 30] [--tagC 2]
"""
import argparse
import json
import os
import struct
import sys
import time

import numpy as np
from scipy import sparse
from sklearn.linear_model import LogisticRegression

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, 'build')
DEFAULT_OUT = os.path.join(ROOT, 'model', 'model.bin')


def log(*a):
    print(*a, flush=True)


# ---------------------------------------------------------------------------------------------
# loading

def load_cls(dim):
    rows = [json.loads(l) for l in open(os.path.join(BUILD, 'cls.jsonl'), encoding='utf-8')]
    indptr, indices, data = [0], [], []
    for r in rows:
        for k, v in r['f']:
            indices.append(k)
            data.append(v)
        indptr.append(len(indices))
    X = sparse.csr_matrix((np.array(data), np.array(indices), np.array(indptr)), shape=(len(rows), dim))
    return rows, X


def load_tag(dim):
    seqs = [json.loads(l) for l in open(os.path.join(BUILD, 'tag.jsonl'), encoding='utf-8')]
    indptr, indices, ys, gids, seq_of = [0], [], [], [], []
    for si, s in enumerate(seqs):
        for f, y in zip(s['f'], s['y']):
            indices.extend(sorted(set(f)))
            indptr.append(len(indices))
            ys.append(y)
            gids.append(s['gid'])
            seq_of.append(si)
    X = sparse.csr_matrix((np.ones(len(indices)), np.array(indices), np.array(indptr)), shape=(len(ys), dim))
    return seqs, X, np.array(ys), np.array(gids), np.array(seq_of)


# ---------------------------------------------------------------------------------------------
# model helpers

class Compact:
    """LogisticRegression fitted on the non-empty columns only; exposes full-width coef."""

    def __init__(self, clf, cols, dim, labels):
        self.clf, self.cols, self.labels = clf, cols, list(labels)
        self.coef = np.zeros((len(self.labels), dim))
        if len(self.labels) == 2 and clf.coef_.shape[0] == 1:  # binary: expand to 2 classes
            self.coef[1, cols] = clf.coef_[0] / 2
            self.coef[0, cols] = -clf.coef_[0] / 2
            self.bias = np.array([-clf.intercept_[0] / 2, clf.intercept_[0] / 2])
        else:
            self.coef[:, cols] = clf.coef_
            self.bias = clf.intercept_.copy()

    def proba(self, X):
        z = X @ self.coef.T + self.bias
        z -= z.max(1, keepdims=True)
        e = np.exp(z)
        return e / e.sum(1, keepdims=True)


def fit(X, y, C, w=None, max_iter=1000):
    cols = np.flatnonzero(np.asarray((X != 0).sum(0)).ravel())
    labels = sorted(set(y))
    clf = LogisticRegression(C=C, max_iter=max_iter, tol=1e-4)
    clf.fit(X[:, cols], y, sample_weight=w)
    assert list(clf.classes_) == labels
    return Compact(clf, cols, X.shape[1], labels)


def prune_refit(X, y, C, keep, w=None):
    """Fit, keep the `keep` feature rows with the largest weight norm, refit on those rows only."""
    m = fit(X, y, C, w)
    norms = np.sqrt((m.coef ** 2).sum(0))
    used = np.flatnonzero(norms > 0)
    k = min(keep, len(used))
    rows = np.sort(used[np.argsort(-norms[used])[:k]])
    mask = np.zeros(X.shape[1], bool)
    mask[rows] = True
    Xr = X.multiply(mask[None, :]).tocsr() if k < len(used) else X
    m2 = fit(Xr, y, C, w)
    W = m2.coef[:, rows].T  # (rows, classes)
    return {'labels': m2.labels, 'rows': rows, 'W': W, 'b': m2.bias, 'model': m2}


def quantize(W):
    scale = np.abs(W).max(axis=0) / 127.0
    scale[scale == 0] = 1.0
    Q = np.clip(np.round(W / scale), -127, 127).astype(np.int8)
    return Q, scale.astype(np.float32)


# ---------------------------------------------------------------------------------------------
# cascade

def cascade_scores(p_tool, tool_labels, intent_models, X, fam_intents, k=3):
    """For each row: best (intent, score, tool_p, tool) using top-k tools; score = p(tool)*p(intent|tool)."""
    out = []
    none = tool_labels.index('__none__') if '__none__' in tool_labels else -1
    cache = {}
    for fam, m in intent_models.items():
        cache[fam] = m.proba(X)
    for r in range(X.shape[0]):
        order = np.argsort(-p_tool[r])
        best = (None, 0.0, 0.0, None)
        cand = [t for t in order if t != none][:k]
        for t in cand:
            fam = tool_labels[t]
            pt = p_tool[r, t]
            if fam in cache:
                pi = cache[fam][r]
                j = int(np.argmax(pi))
                s, intent = pt * pi[j], intent_models[fam].labels[j]
            else:
                s, intent = pt, fam_intents[fam][0]
            if s > best[1]:
                best = (intent, s, pt, fam)
        top_tool = tool_labels[order[0]]
        out.append((best[0], best[1], p_tool[r, order[0]], top_tool, [tool_labels[t] for t in cand]))
    return out


def train_all(rows, X, meta, idx, C, keep_tool, keep_int, log_prefix=''):
    """Train tool + intent models on row subset idx."""
    y_tool = np.array([rows[i]['y'] for i in idx])
    w = np.array([rows[i]['w'] for i in idx], dtype=float)
    Xs = X[idx]
    t0 = time.time()
    tool = prune_refit(Xs, y_tool, C, keep_tool, w)
    log(f'{log_prefix}tool model: {len(tool["labels"])} classes, {len(tool["rows"])} rows ({time.time() - t0:.0f}s)')
    intents = {}
    for fam, ids in meta['intentsByFamily'].items():
        if len(ids) < 2:
            continue
        sub = [i for i in idx if rows[i]['y'] == fam and rows[i]['i']]
        ys = np.array([rows[i]['i'] for i in sub])
        if len(set(ys)) < 2:
            continue
        intents[fam] = prune_refit(X[sub], ys, C, keep_int(len(ids)), np.array([rows[i]['w'] for i in sub], dtype=float))
    log(f'{log_prefix}intent models: {len(intents)} families ({time.time() - t0:.0f}s)')
    return tool, intents


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--C', type=float, default=30.0)
    ap.add_argument('--tagC', type=float, default=2.0)
    ap.add_argument('--keep-tool', type=int, default=20000)
    ap.add_argument('--keep-tag', type=int, default=24000)
    ap.add_argument('--holdout', type=float, default=0.15)
    ap.add_argument('--ood-holdout', type=float, default=0.35)
    ap.add_argument('--seed', type=int, default=13)
    ap.add_argument('--out', default=DEFAULT_OUT)
    args = ap.parse_args()
    t0 = time.time()
    meta = json.load(open(os.path.join(BUILD, 'meta.json')))
    dim, tag_dim = meta['dim'], meta['tagDim']
    rows, X = load_cls(dim)
    log(f'{len(rows)} classifier rows, {X.nnz} nnz')
    keep_int = lambda n: 1500 + 250 * n  # noqa: E731
    fam_intents = meta['intentsByFamily']

    # ---------------- calibration on a group-wise holdout ----------------
    rng = np.random.default_rng(args.seed)
    gids = np.array([r['gid'] for r in rows])
    ug = np.unique(gids)
    ho_g = set(rng.choice(ug, int(len(ug) * args.holdout), replace=False).tolist())
    # out-of-domain groups drive both thresholds: hold out a larger share of them (--ood-holdout) so the
    # compose threshold is not calibrated on a few dozen rows
    ood_g = np.unique([r['gid'] for r in rows if r['g'] == 'ood'])
    ho_g -= set(ood_g.tolist())
    ho_g |= set(rng.choice(ood_g, int(len(ood_g) * args.ood_holdout), replace=False).tolist()) if len(ood_g) else set()
    is_ho = np.array([g in ho_g for g in gids])
    # evaluate on the original (non-augmented) sentence of each group only: first row of the group
    first = np.zeros(len(rows), bool)
    seen = set()
    for i, g in enumerate(gids):
        if g not in seen:
            first[i] = True
            seen.add(g)
    tr_idx = np.flatnonzero(~is_ho)
    ho_idx = np.flatnonzero(is_ho & first)
    tool_s, int_s = train_all(rows, X, meta, tr_idx, args.C, args.keep_tool, keep_int, '[split] ')
    Xho = X[ho_idx]
    p_tool = tool_s['model'].proba(Xho)
    res = cascade_scores(p_tool, tool_s['labels'], {f: m['model'] for f, m in int_s.items()}, Xho, fam_intents)
    gold_i = [rows[i]['i'] for i in ho_idx]
    gold_t = [rows[i]['y'] for i in ho_idx]
    # thresholds are calibrated on curated rows only: the real-usage rows (g == 'real') carry noisy LLM labels, and
    # their "errors" would push the accept threshold up (they still train the models)
    src = [rows[i]['g'] for i in ho_idx]
    ind = np.array([g != '__none__' and gi != '' and s != 'real' for g, gi, s in zip(gold_t, gold_i, src)])
    oodm = np.array([g == '__none__' for g in gold_t])
    score = np.array([r[1] for r in res])
    correct = np.array([r[0] == gi for r, gi in zip(res, gold_i)])
    t1 = np.array([r[3] == g for r, g in zip(res, gold_t)])
    t3 = np.array([g in r[4] for r, g in zip(res, gold_t)])
    log(f'[split] holdout: intent acc={correct[ind].mean():.4f} tool top1={t1[ind].mean():.4f} top3={t3[ind].mean():.4f} '
        f'(n={ind.sum()}, ood n={oodm.sum()})')
    best_t, best_s = 0.0, -1
    for t in np.arange(0.02, 0.6, 0.005):
        keep_c = (score[ind & correct] >= t).mean()
        rej_w = (score[ind & ~correct] < t).mean() if (ind & ~correct).any() else 1.0
        rej_o = (score[oodm] < t).mean() if oodm.any() else 0.0
        if keep_c < 0.97:
            continue
        s = keep_c + 0.5 * rej_o + 0.25 * rej_w
        if s > best_s:
            best_t, best_s = float(t), s
    if best_s < 0:
        # no threshold keeps >= 97% of the correct answers: never fall back to "accept everything";
        # take the highest threshold that still keeps >= 90%, else a conservative default
        ok = [float(t) for t in np.arange(0.02, 0.6, 0.005) if (score[ind & correct] >= t).mean() >= 0.90]
        best_t = max(ok) if ok else 0.3
        log(f'WARNING: no accept threshold keeps 97% of correct answers; using {best_t:.3f}')
    # compose threshold: stage-1 top tool probability (non-__none__) that lets <=5% of OOD through
    top_nn = np.array([r[2] if r[3] != '__none__' else 0.0 for r in res])
    cands = [t for t in np.arange(0.1, 0.95, 0.01) if (top_nn[oodm] >= t).mean() <= 0.05] if oodm.any() else [0.5]
    compose_t = float(cands[0]) if cands else 0.9
    log(f'calibration rows: {int(ind.sum())} in-domain, {int(oodm.sum())} out-of-domain')
    log(f'accept threshold={best_t:.3f} (correct kept={(score[ind & correct] >= best_t).mean():.3f}, '
        f'OOD rejected={(score[oodm] < best_t).mean() if oodm.any() else float("nan"):.3f}); compose tool threshold={compose_t:.2f}')

    # ---------------- final models on all data ----------------
    all_idx = np.arange(len(rows))
    tool, intents = train_all(rows, X, meta, all_idx, args.C, args.keep_tool, keep_int, '[final] ')

    # ---------------- tagger ----------------
    seqs, XT, yT, gT, seq_of = load_tag(tag_dim)
    log(f'tagger: {len(seqs)} sequences, {XT.shape[0]} tokens')
    ho_t = np.array([g in ho_g for g in gT])
    tt = time.time()
    tag_split = fit(XT[~ho_t], yT[~ho_t], args.tagC)
    pred = np.array(tag_split.labels)[tag_split.proba(XT[ho_t]).argmax(1)]
    gold = yT[ho_t]
    nz = gold != 'O'
    log(f'[split] tagger token acc={np.mean(pred == gold):.4f} non-O recall={np.mean(pred[nz] == gold[nz]):.4f} '
        f'non-O precision={np.mean(pred[pred != "O"] == gold[pred != "O"]):.4f} ({time.time() - tt:.0f}s)')
    tagger = prune_refit(XT, yT, args.tagC, args.keep_tag)
    log(f'[final] tagger: {len(tagger["labels"])} labels, {len(tagger["rows"])} rows ({time.time() - tt:.0f}s)')

    # ---------------- export ----------------
    models = {'tool': tool, 'tagger': tagger}
    for fam, m in intents.items():
        models['intent:' + fam] = m
    header = {
        'version': 2, 'dim': dim, 'tagDim': tag_dim,
        'thresholds': {'accept': round(best_t, 4), 'compose': round(compose_t, 4)},
        'C': args.C, 'tagC': args.tagC, 'trained': time.strftime('%Y-%m-%d'),
        'n_train': int(sum(1 for r in rows if r['g'] in ('intents', 'shell')) // 2),
        'n_rows': len(rows), 'n_tag_seqs': len(seqs),
        'intentsByFamily': fam_intents,
        'holdout': {'intent_acc': round(float(correct[ind].mean()), 4), 'tool_top1': round(float(t1[ind].mean()), 4),
                    'tool_top3': round(float(t3[ind].mean()), 4)},
        'models': {},
    }
    payload = bytearray()
    blobs = {}
    for name, m in models.items():
        Q, scale = quantize(m['W'])
        b = np.asarray(m['b'], dtype=np.float32)
        blob = m['rows'].astype('<u4').tobytes() + scale.astype('<f4').tobytes() + b.astype('<f4').tobytes() + Q.tobytes(order='C')
        blob += b'\0' * ((4 - len(blob) % 4) % 4)
        header['models'][name] = {'labels': m['labels'], 'rows': int(len(m['rows'])), 'offset': len(payload)}
        payload += blob
        blobs[name] = (m['rows'], Q, scale, b)
    hb = json.dumps(header, separators=(',', ':')).encode('utf-8')
    hb += b' ' * ((4 - (8 + len(hb)) % 4) % 4)
    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, 'wb') as f:
        f.write(b'TSH2')
        f.write(struct.pack('<I', len(hb)))
        f.write(hb)
        f.write(payload)
    log(f'wrote {args.out} ({os.path.getsize(args.out) / 1e6:.2f} MB): ' +
        ', '.join(f'{n}={len(m["rows"])}x{len(m["labels"])}' for n, m in models.items() if not n.startswith('intent:')) +
        f', {len(intents)} intent models ({sum(len(m["rows"]) * len(m["labels"]) for m in intents.values())} weights)')

    # ---------------- parity fixture (JS inference must reproduce these probabilities) ----------------
    def q_proba(name, feats):
        rws, Q, scale, b = blobs[name]
        pos = {int(r): k for k, r in enumerate(rws)}
        z = b.astype(np.float64).copy()
        for k, v in feats:
            if k in pos:
                z += v * Q[pos[k]].astype(np.float64) * scale.astype(np.float64)
        z -= z.max()
        e = np.exp(z)
        return e / e.sum()

    fx = {'cls': [], 'tag': []}
    # never a private real-usage row (hashed n-grams of its text): curated rows only
    pub = [r for r in rows if r['g'] != 'real']
    step = max(1, len(pub) // 30)
    for r in pub[::step][:30]:
        p = q_proba('tool', r['f'])
        fx['cls'].append({'model': 'tool', 'f': r['f'], 'top': [[header['models']['tool']['labels'][i], float(p[i])] for i in np.argsort(-p)[:3]]})
        fam = r['y']
        if 'intent:' + fam in blobs:
            p = q_proba('intent:' + fam, r['f'])
            labels = header['models']['intent:' + fam]['labels']
            fx['cls'].append({'model': 'intent:' + fam, 'f': r['f'], 'top': [[labels[i], float(p[i])] for i in np.argsort(-p)[:2]]})
    for s in seqs[::max(1, len(seqs) // 10)][:10]:
        for f in s['f'][:3]:
            p = q_proba('tagger', [(k, 1.0) for k in sorted(set(f))])
            fx['tag'].append({'f': sorted(set(f)), 'top': [[header['models']['tagger']['labels'][i], float(p[i])] for i in np.argsort(-p)[:2]]})
    # the fixture belongs to the shipped model: written next to any other --out file, never over the test fixture
    shipped = os.path.abspath(args.out) == os.path.abspath(DEFAULT_OUT)
    parity = os.path.join(ROOT, 'test', 'fixtures', 'parity.json') if shipped else os.path.splitext(args.out)[0] + '.parity.json'
    with open(parity, 'w', encoding='utf-8') as f:
        json.dump(fx, f)
    log(f'wrote {os.path.relpath(parity, ROOT)}; done in {time.time() - t0:.0f}s')


if __name__ == '__main__':
    main()
