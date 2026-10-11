#!/usr/bin/env node
// Distillation step 3: join teacher labels with the pool and append soft-labelled rows to the encoder training data.
// Optional verifier gate: rows whose teacher top disagrees with a non-null gold label are kept only with the gold label
// unless --trust-teacher. Writes build/hybrid/train_distill.jsonl (gitignored build/): the base train.jsonl rows plus
//   {text, tool, intent, soft:{intent:p}, lang, shell, os, spans:null, split:'train', src:'teacher', w}
//   node scripts/distill/merge_labels.js [--min-p 0.5] [--w 0.5]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FAMILY_OF, NONE } from '../../src/tools.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const D = process.env.TELLSH_DISTILL_DIR || '/workspace/tellsh-data/distill';
const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const MINP = +arg('--min-p', 0.5), W = +arg('--w', 0.5), TRUST = args.includes('--trust-teacher');
const rj = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const pool = new Map(rj(join(D, 'pool.jsonl')).map((r) => [r.id, r]));
const base = readFileSync(join(ROOT, 'build/hybrid/train.jsonl'), 'utf8');
const st = { labels: 0, kept: 0, lowConf: 0, goldConflict: 0, none: 0 };
const extra = [];
for (const l of rj(join(D, 'labels.jsonl'))) {
  st.labels++;
  const r = pool.get(l.id); if (!r) continue;
  if (l.soft[l.top] < MINP) { st.lowConf++; continue; }
  let intent = l.top === 'none' ? '' : l.top;
  if (r.gold && intent !== r.gold) { st.goldConflict++; if (!TRUST) continue; }
  if (!intent) st.none++;
  const soft = Object.fromEntries(Object.entries(l.soft).filter(([k]) => k !== 'none'));
  extra.push({ text: r.text, tool: intent ? FAMILY_OF[intent] : NONE, intent, soft: intent ? soft : null, lang: r.lang, shell: r.shell, os: r.os,
    spans: null, split: 'train', src: 'teacher', w: r.tmpl ? W / 2 : W });
  st.kept++;
}
writeFileSync(join(ROOT, 'build/hybrid/train_distill.jsonl'), base + extra.map((r) => JSON.stringify(r)).join('\n') + '\n');
console.log(JSON.stringify(st));
