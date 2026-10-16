#!/usr/bin/env node
// Correct verifier pair labels with LLM adjudications (adjudicate.mjs output) of the same split.
//
//   node scripts/ir/apply_adjudications.mjs --pairs build/ir/verifier/v2/train.jsonl --adj build/ir/adjudicate/v2_kfold/adjudications.jsonl \
//     [--adj ...] --out build/ir/verifier/v2/train.jsonl
//
// A pair (src row id, command) that was adjudicated gets y = pred_correct. Gold positives (kind gold) of a row whose
// gold the judge called wrong are dropped. Counts are printed; the file is rewritten atomically.
import fs from 'node:fs';

const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : null; };
const all = (k) => args.flatMap((a, i) => (a === `--${k}` ? [args[i + 1]] : []));
const PAIRS = opt('pairs'), OUT = opt('out') || PAIRS, ADJ = all('adj');
if (!PAIRS || !ADJ.length) { console.error('usage: apply_adjudications.mjs --pairs P.jsonl --adj A.jsonl [--adj ...] [--out O.jsonl]'); process.exit(2); }
const read = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));

const verdict = new Map(), goldWrong = new Set();
for (const f of ADJ) for (const a of read(f)) {
  if (typeof a.pred_correct !== 'boolean') continue;
  verdict.set(`${a.id}\u0000${a.command}`, a.pred_correct ? 1 : 0);
  if (a.goldLabel === 'ok' && a.gold_correct === false) goldWrong.add(a.id);
}
const n = { rows: 0, flipped_to_1: 0, flipped_to_0: 0, gold_dropped: 0, matched: 0 };
const out = [];
for (const r of read(PAIRS)) {
  n.rows++;
  const src = r.src ?? r.id;
  if (r.kind === 'gold' && goldWrong.has(src)) { n.gold_dropped++; continue; }
  const v = verdict.get(`${src}\u0000${r.command}`);
  if (v !== undefined) {
    n.matched++;
    if (v !== r.y) { v ? n.flipped_to_1++ : n.flipped_to_0++; r.y = v; r.adjudicated = true; }
  }
  out.push(JSON.stringify(r));
}
fs.writeFileSync(`${OUT}.tmp`, out.join('\n') + '\n');
fs.renameSync(`${OUT}.tmp`, OUT);
console.log(JSON.stringify(n));
