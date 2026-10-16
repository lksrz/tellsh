#!/usr/bin/env node
// K-fold split of the TRAIN targets for model-error mining (ml/ir/kfold.py): train K generators on K-1 folds and
// predict on the held-out fold, so the verifier sees realistic model errors on train data.
//
//   node scripts/ir/kfold_split.mjs [--v v1] [--k 3] [--seed kfold] [--limit N]
//
// Folds are skeleton-disjoint: ok rows by dedup.mjs skeleton(ir), non-ok rows by request (same keys as the
// train/dev/test split). Gold comes from build/ir/dataset/<v>/train.jsonl (targets id "train:N" = line N).
// Writes, for k in 0..K-1:
//   build/ir/targets/<v>/fold{k}_train.jsonl     targets rows (ids unchanged)
//   build/ir/targets/<v>/fold{k}_heldout.jsonl   targets rows, id rewritten to "fold{k}_heldout:<i>", src_id = old id
//   build/ir/dataset/<v>/fold{k}_heldout.jsonl   gold rows in the same order (for eval_pred.mjs --data), + src_id
// --limit N: only the first N train targets (CPU smoke runs).

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { skeleton } from './dedup.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const V = opt('v', 'v1');
const K = Number(opt('k', 3));
const SEED = opt('seed', 'kfold');
const LIMIT = Number(opt('limit', 0));
const TDIR = path.join(ROOT, 'build/ir/targets', V);
const DDIR = path.join(ROOT, 'build/ir/dataset', V);

const readLines = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean);
let targets = readLines(path.join(TDIR, 'train.jsonl')).map((l) => JSON.parse(l));
if (LIMIT) targets = targets.slice(0, LIMIT);
const gold = readLines(path.join(DDIR, 'train.jsonl')).map((l) => JSON.parse(l));

const foldOf = (key) => crypto.createHash('md5').update(SEED + '\u0000' + key).digest().readUInt32LE(0) % K;
const tr = Array.from({ length: K }, () => []), ho = Array.from({ length: K }, () => []), hg = Array.from({ length: K }, () => []);
for (const t of targets) {
  const [sp, ln] = String(t.id).split(':');
  const g = gold[Number(ln)];
  if (sp !== 'train' || !g || g.request !== t.request) throw new Error(`target ${t.id} does not match dataset train row`);
  const f = foldOf(g.label === 'ok' ? 'S' + skeleton(g.ir) : 'R' + g.request);
  for (let k = 0; k < K; k++) if (k !== f) tr[k].push(t);
  ho[f].push({ ...t, id: `fold${f}_heldout:${ho[f].length}`, src_id: t.id });
  hg[f].push({ ...g, src_id: t.id });
}
const write = (f, rows) => fs.writeFileSync(f, rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
const stats = [];
for (let k = 0; k < K; k++) {
  write(path.join(TDIR, `fold${k}_train.jsonl`), tr[k]);
  write(path.join(TDIR, `fold${k}_heldout.jsonl`), ho[k]);
  write(path.join(DDIR, `fold${k}_heldout.jsonl`), hg[k]);
  stats.push({ fold: k, train: tr[k].length, heldout: ho[k].length });
}
console.log(JSON.stringify({ v: V, k: K, rows: targets.length, folds: stats }));
