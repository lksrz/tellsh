#!/usr/bin/env node
// Distillation step 3: join teacher labels with the pool and append soft-labelled rows to the encoder training data.
// Rows whose teacher top disagrees with a non-null gold label are dropped unless --trust-teacher. Every text is re-checked
// against the held-out index and the hybrid dev split, and the pool must hash to pool.sha256 (labels join by position).
// Teacher rows carry only the soft distribution (no hard intent label), so the teacher argmax is not counted twice. Writes build/hybrid/train_distill.jsonl (gitignored build/): the base train.jsonl rows plus
//   {text, tool, intent, soft:{intent:p}, lang, shell, os, spans:null, split:'train', src:'teacher', w}
//   node scripts/distill/merge_labels.js [--min-p 0.5] [--w 0.5]
import { readFileSync, writeFileSync, existsSync, lstatSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { exclusionIndex } from '../lib/heldout.js';
import { normalize } from '../../src/features.js';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FAMILY_OF } from '../../src/tools.js';

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
const decisions = rj(join(ROOT, 'data/teacher/decisions.jsonl')).filter((d) => d.text && d.field !== 'risk');
// one current decision per text (last entry wins, as in gen_data.js / export_data.js)
const decide = new Map(decisions.map((d) => [normalize(d.text), d]));
const current = (r) => decide.get(normalize(r.text)) || (r.parent ? decide.get(normalize(r.parent)) : undefined);
const TW = Number.isFinite(parseFloat(process.env.TELLSH_TMPL_W)) ? parseFloat(process.env.TELLSH_TMPL_W) : 1;
const pool = new Map(rj(join(D, 'pool.jsonl')).map((r) => [r.id, r]));
const base = readFileSync(join(ROOT, 'build/hybrid/train.jsonl'), 'utf8');
const st = { labels: 0, kept: 0, lowConf: 0, goldConflict: 0, none: 0, heldOut: 0 };
const extra = [];
for (const l of rj(join(D, 'labels.jsonl'))) {
  st.labels++;
  const r = pool.get(l.id); if (!r) continue;
  // the label must have been made for this row's current candidate set (cands + none)
  const ks = Object.keys(l.soft || {}).sort().join('|'), cs = [...new Set([...r.cands, 'none'])].sort().join('|');
  if (ks !== cs) { console.error(`merge_labels: label ${l.id} was made for different candidates; relabel`); process.exit(1); }
  if (!l.h || l.h !== createHash('sha1').update(r.text).digest('hex').slice(0, 12)) { console.error(`merge_labels: label ${l.id} does not match the pool text`); process.exit(1); }
  const bad = (t) => excl.has(t) || dev.has(normalize(t)) || decide.get(normalize(t))?.action === 'drop';
  // relex copies: the parent sentence must pass too; copies from pools without provenance are skipped
  if (bad(r.text) || (r.src === 'public-relex' && (!r.parent || bad(r.parent)))) { st.heldOut++; continue; }
  const d = current(r);
  if (d?.action === 'drop') { st.heldOut++; continue; }
  const gold = (d?.action === 'relabel' && d.intent) || r.gold;
  if (l.soft[l.top] < MINP) { st.lowConf++; continue; }
  // teacher 'none' = no candidate fits; pool rows are shell requests (real out-of-catalog commands included), never
  // chit-chat, so they must not become NONE (tool-head rejection) rows: skip them
  if (l.top === 'none') { st.none++; continue; }
  let intent = l.top;
  if (gold && intent !== gold) { st.goldConflict++; if (!TRUST) continue; }
  const soft = Object.fromEntries(Object.entries(l.soft).filter(([k]) => k !== 'none'));
  extra.push({ text: r.text, tool: FAMILY_OF[intent], intent: '', soft, lang: r.lang, shell: r.shell, os: r.os,
    spans: null, split: 'train', src: 'teacher', w: W * (r.tmpl ? TW : 1) });
  st.kept++;
}
const outP = join(ROOT, 'build/hybrid/train_distill.jsonl');
try { if (lstatSync(outP).isSymbolicLink()) { console.error(`merge_labels: refusing to write through symlink ${outP}`); process.exit(1); } } catch {}
if (existsSync(join(ROOT, 'build')) && lstatSync(join(ROOT, 'build')).isSymbolicLink() || existsSync(join(ROOT, 'build/hybrid')) && lstatSync(join(ROOT, 'build/hybrid')).isSymbolicLink()) { console.error('merge_labels: build/ or build/hybrid is a symlink; refusing'); process.exit(1); }
writeFileSync(outP, base.replace(/\n*$/, '\n') + extra.map((r) => JSON.stringify(r) + '\n').join(''));
console.log(JSON.stringify(st));
