#!/usr/bin/env node
// Distillation step 3: join teacher labels with the pool and append soft-labelled rows to the encoder training data.
// Rows whose teacher top disagrees with a non-null gold label are dropped unless --trust-teacher. Every text is re-checked
// against the held-out index and the hybrid dev split, and the pool must hash to pool.sha256 (labels join by position).
// Teacher rows carry only the soft distribution (no hard intent label), so the teacher argmax is not counted twice. Writes build/hybrid/train_distill.jsonl (gitignored build/): the base train.jsonl rows plus
//   {text, tool, intent, soft:{intent:p}, lang, shell, os, spans:null, split:'train', src:'teacher', w}
//   node scripts/distill/merge_labels.js [--min-p 0.5] [--w 0.5]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { exclusionIndex } from '../lib/heldout.js';
import { normalize } from '../../src/features.js';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FAMILY_OF, NONE } from '../../src/tools.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const D = process.env.TELLSH_DISTILL_DIR || '/workspace/tellsh-data/distill';
// labels are private: merge only writes build/hybrid/train_distill.jsonl (gitignored)
const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const MINP = +arg('--min-p', 0.5), W = +arg('--w', 0.5), TRUST = args.includes('--trust-teacher');
const rj = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const poolBody = readFileSync(join(D, 'pool.jsonl'), 'utf8');
const want = existsSync(join(D, 'pool.sha256')) ? readFileSync(join(D, 'pool.sha256'), 'utf8').trim() : null;
if (!want || createHash('sha256').update(poolBody).digest('hex') !== want) { console.error('merge_labels: pool.jsonl changed since labelling (or no pool.sha256); relabel'); process.exit(1); }
const excl = exclusionIndex(ROOT);
const dev = new Set(JSON.parse(readFileSync(join(ROOT, 'build/hybrid/dev_texts.json'), 'utf8')));
const pool = new Map(rj(join(D, 'pool.jsonl')).map((r) => [r.id, r]));
const base = readFileSync(join(ROOT, 'build/hybrid/train.jsonl'), 'utf8');
const st = { labels: 0, kept: 0, lowConf: 0, goldConflict: 0, none: 0, heldOut: 0 };
const extra = [];
for (const l of rj(join(D, 'labels.jsonl'))) {
  st.labels++;
  const r = pool.get(l.id); if (!r) continue;
  if (l.h && l.h !== createHash('sha1').update(r.text).digest('hex').slice(0, 12)) { console.error(`merge_labels: label ${l.id} does not match the pool text`); process.exit(1); }
  if (excl.has(r.text) || dev.has(normalize(r.text))) { st.heldOut++; continue; }
  if (l.soft[l.top] < MINP) { st.lowConf++; continue; }
  let intent = l.top === 'none' ? '' : l.top;
  if (r.gold && intent !== r.gold) { st.goldConflict++; if (!TRUST) continue; }
  if (!intent) st.none++;
  const soft = Object.fromEntries(Object.entries(l.soft).filter(([k]) => k !== 'none'));
  extra.push({ text: r.text, tool: intent ? FAMILY_OF[intent] : NONE, intent: '', soft: intent ? soft : null, lang: r.lang, shell: r.shell, os: r.os,
    spans: null, split: 'train', src: 'teacher', w: r.tmpl ? W / 2 : W });
  st.kept++;
}
writeFileSync(join(ROOT, 'build/hybrid/train_distill.jsonl'), base + extra.map((r) => JSON.stringify(r)).join('\n') + '\n');
console.log(JSON.stringify(st));
