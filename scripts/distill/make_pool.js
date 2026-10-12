#!/usr/bin/env node
// Distillation step 1: unlabelled PL/EN request pool for the teacher, with model A's top-k candidates per text.
// Sources: every real train-split text (uncapped, incl. out-of-catalog rows), public train paraphrases, and their
// relexicalised copies. Every text is checked against the shared held-out index (eval sets never reach the teacher).
// Output is PRIVATE: $TELLSH_DISTILL_DIR (default /workspace/tellsh-data/distill)/pool.jsonl
//   {id, text, lang, shell, os, src, tmpl, gold|null, cands:[intent...]}   (gold = dataset/public label, may be null)
//   node scripts/distill/make_pool.js [--k 8] [--max 60000]
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, realpathSync, lstatSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative, resolve, isAbsolute, sep, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { exclusionIndex } from '../lib/heldout.js';
import { writePrivate } from '../lib/privwrite.js';
import { readReal } from '../real/real_rows.js';
import { cascade } from '../../src/cascade.js';
import { getModel, loadModel } from '../../src/model.js';
import { envFeatures } from '../../src/env.js';
import { normalize, fnv1a } from '../../src/features.js';
import { relex, silverSpans, mulberry32 } from '../lib/silver.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const OUT = process.env.TELLSH_DISTILL_DIR || '/workspace/tellsh-data/distill';
const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
// private output must stay outside the repo (or inside gitignored build/)
{ const real = (p) => { let q = resolve(p); const tail = []; while (!existsSync(q)) { tail.unshift(basename(q)); q = dirname(q); } return join(realpathSync(q), ...tail); };
  const rel = relative(realpathSync(ROOT), real(OUT)); if (!(rel === '..' || rel.startsWith('..' + sep)) && !isAbsolute(rel) && !(rel === 'build' || rel.startsWith('build' + sep))) { console.error(`make_pool: ${OUT} is inside the repo; use a path outside it or under build/`); process.exit(1); } }
const K = +arg('--k', 8), MAX = +arg('--max', 60000);
const rj = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const rd = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => rj(join(d, f))) : []);

const excl = exclusionIndex(ROOT);
// the hybrid dev split (build/hybrid/dev_texts.json, export_data.js) calibrates A+B: never pseudo-label it
const devP = join(ROOT, 'build/hybrid/dev_texts.json');
if (!existsSync(devP)) { console.error('make_pool: run scripts/hybrid/export_data.js first (dev_texts.json)'); process.exit(1); }
const dev = new Set(JSON.parse(readFileSync(devP, 'utf8')));
const rng = mulberry32(7);
// same teacher decisions as gen_data.js / export_data.js: dropped rows stay out, relabelled rows carry the new gold
const decide = new Map(rj(join(ROOT, 'data/teacher/decisions.jsonl')).filter((d) => d.text && d.field !== 'risk').map((d) => [normalize(d.text), d]));
const decided = (r) => { const d = decide.get(normalize(r.text)); if (d?.action === 'drop') return null; return d?.action === 'relabel' && d.intent ? { ...r, intent: d.intent, gold: d.intent } : r; };
const src = [
  ...readReal(ROOT).filter((r) => r.split === 'train').map((r) => ({ ...r, src: 'real', gold: r.intent || null })),
  ...[...rd(join(ROOT, 'data/intents')), ...rj(join(ROOT, 'data/shell/train.jsonl'))].map((r) => ({ ...r, src: 'public', gold: r.intent })),
];
const seen = new Set(), pool = [];
const blocked = (text) => { const n = normalize(text); return !n || dev.has(n) || excl.has(text) || excl.has(n); };
const push = (r0, text, s, parent) => {
  const n = normalize(text);
  if (seen.has(n) || blocked(text)) return;
  // the decision on the generated text itself wins (drop / relabel), as in the exports
  const r = decided({ ...r0, text }); if (!r) return;
  seen.add(n);
  pool.push({ text, ...(parent ? { parent } : {}), lang: r.lang || '', shell: r.shell || 'bash', os: r.os || 'linux', src: s, tmpl: !!r.tmpl, gold: r.gold ?? null });
};
for (const r0 of src) {
  const r = decided(r0); if (!r) continue;
  // a dev / held-out sentence is not paraphrased either (relex swaps values, which would defeat the near-key match)
  if (blocked(r.text)) continue;
  push(r, r.text, r.src);
  if (r.src === 'public' && r.intent) { const x = relex(r.text, silverSpans(r.text, r.intent).spans, { lang: r.lang || 'en', rng, split: 'train' }).text; if (x && x !== r.text) push(r, x, 'public-relex', r.text); }
}
// deterministic subsample: non-template rows (public and real) first, then template-generated real rows, each by hash
pool.sort((a, b) => (a.tmpl - b.tmpl) || fnv1a(a.text) - fnv1a(b.text));
const sel = pool.slice(0, MAX);
// candidates must come from an A trained with the current eval/dev exclusions (e.g. build/adev/model/model.bin after
// train_a_dev.sh, or a retrain on this split); the shipped model predates the split, so it needs an explicit opt-in
const mp = arg('--model', null);
if (!mp && !args.includes('--allow-shipped-model')) { console.error('make_pool: pass --model <A trained on the current split> (or --allow-shipped-model)'); process.exit(1); }
const model = mp ? loadModel(mp) : getModel();
for (const [i, r] of sel.entries()) {
  const env = { shell: r.shell, os: r.os, coreutils: r.os === 'darwin' ? 'bsd' : 'gnu' };
  const c = cascade(r.text, { model, extras: envFeatures(env), k: 4, top: K });
  r.id = i;
  r.cands = [...new Set([...(r.gold ? [r.gold] : []), ...c.top.map((t) => t.intent)])].slice(0, K);
  r.pNone = +c.pNone.toFixed(4);
}
mkdirSync(OUT, { recursive: true, mode: 0o700 });
const body = sel.map((r) => JSON.stringify(r)).join('\n') + '\n';
const noLink = (f) => { try { if (lstatSync(f).isSymbolicLink()) { console.error(`make_pool: refusing to write through symlink ${f}`); process.exit(1); } } catch {} return f; };
writePrivate(noLink(join(OUT, 'pool.jsonl')), body, { mode: 0o600 });
// labels.jsonl refers to pool rows by position: merge_labels.js refuses a pool whose hash changed since labelling
writePrivate(noLink(join(OUT, 'pool.sha256')), createHash('sha256').update(body).digest('hex') + '\n', { mode: 0o600 });
const by = (f) => sel.reduce((m, r) => ((m[f(r)] = (m[f(r)] || 0) + 1), m), {});
console.log(JSON.stringify({ pool: pool.length, written: sel.length, bySrc: by((r) => r.src), byLang: by((r) => r.lang) }));
