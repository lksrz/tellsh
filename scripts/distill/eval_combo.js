#!/usr/bin/env node
// Offline evaluation of an A + student combination (no runtime change): A answers by default; the student's intent is
// used when A's confidence < t, or (optionally) when the two disagree and the student's top-intent p >= s.
// Sweeps t (and s), prints per-set top-1 accuracy, and picks the t that maximises real_human (tuning half) accuracy while losing at
// most --max-loss pp (default 0.3) against A alone on data_eval, eval_v04 and shell_eval. To avoid scoring the choice on
// the rows it was tuned on, the real eval split is halved by a hash of the command group: t/s are picked on real_human_tune
// and the untouched half is reported as real_human_test. Aggregates only.
//   node scripts/distill/eval_combo.js <onnx dir> [--model A.bin] [--json out.json] [--max-loss 0.3]
import { readFileSync, readdirSync, existsSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadModel } from '../../src/model.js';
import { cascade } from '../../src/cascade.js';
import { envFeatures } from '../../src/env.js';
import { createHash } from 'node:crypto';
import { Encoder } from '../../src/rerank/encoder.js';
import { writePrivate } from '../lib/privwrite.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const dir = args[0];
if (!dir || dir.startsWith('--')) { console.error('usage: eval_combo.js <onnx dir> [--model A.bin] [--json out.json] [--max-loss 0.3]'); process.exit(1); }
const mp = opt('--model', join(ROOT, 'model/model.bin'));
const jo = opt('--json', null);
const MAXLOSS = +opt('--max-loss', 0.3);
const GUARD = ['data_eval', 'eval_v04', 'shell_eval'];
const rj = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const rd = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).flatMap((f) => rj(join(d, f))) : []);
const real = rj(join(ROOT, 'build/real/rows.jsonl')).filter((r) => r.split === 'eval' && r.intent);
const sets = {
  real, real_human: real.filter((r) => !r.tmpl), real_tmpl: real.filter((r) => r.tmpl),
  data_eval: rd(join(ROOT, 'data/eval')), eval_v04: rd(join(ROOT, 'data/eval_v04')), shell_eval: rj(join(ROOT, 'data/shell/eval.jsonl')),
};
for (const k of ['real', 'real_human', ...GUARD]) if (!sets[k].length) { console.error(`eval_combo: eval set ${k} is empty or missing`); process.exit(1); }
const model = loadModel(mp);
if (!existsSync(join(dir, 'encoder.int8.onnx')) || !existsSync(join(dir, 'vocab.json'))) { console.error('eval_combo: no encoder bundle in', dir); process.exit(1); }
const enc = await Encoder.load({ dir, threads: 2 });
// Encoder.load falls back to other bundles (env / cache / package): insist on the requested one
if (!enc || realpathSync(enc.dir) !== realpathSync(dir)) { console.error('eval_combo: cannot load encoder from', dir); process.exit(1); }

// one pass: per row [gold, A intent, A confidence, student intent, student p]
const preds = {};
for (const [name, rows] of Object.entries(sets)) {
  if (name === 'real_human' || name === 'real_tmpl') continue; // subsets of real, sliced below
  const out = [];
  for (const r of rows) {
    const env = { shell: r.shell || 'bash', os: r.os || 'linux' };
    const c = cascade(r.text, { model, extras: envFeatures({ ...env, coreutils: env.os === 'darwin' ? 'bsd' : 'gnu' }), top: 1 });
    const s = await enc.infer(r.text, env);
    out.push([r.intent, c.intent, c.confidence ?? 0, s.topIntent, s.intents?.[s.topIntent] ?? 0]);
  }
  preds[name] = out;
}
preds.real_human = preds.real.filter((_, i) => !real[i].tmpl);
preds.real_tmpl = preds.real.filter((_, i) => real[i].tmpl);
// sha256, not fnv1a: fnv1a's low bit is only the parity of the input characters
const half = (r) => createHash('sha256').update('combo:' + (r.group ?? r.text)).digest()[0] & 1;
preds.real_human_tune = preds.real.filter((_, i) => !real[i].tmpl && half(real[i]) === 0);
preds.real_human_test = preds.real.filter((_, i) => !real[i].tmpl && half(real[i]) === 1);
if (!preds.real_human_tune.length || !preds.real_human_test.length) { console.error('eval_combo: real_human tuning or test half is empty'); process.exit(1); }

const acc = (P, t, s) => {
  let ok = 0;
  for (const [g, a, ca, st, ps] of P) ok += (ca < t || (st !== a && ps >= s) ? st : a) === g;
  return 100 * ok / Math.max(1, P.length); // exact; decisions use this, output is rounded
};
const row = (t, s) => Object.fromEntries(Object.entries(preds).map(([k, P]) => [k, acc(P, t, s)]));
const r2 = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, +v.toFixed(2)]));
const base = row(0, Infinity), student = row(Infinity, Infinity);
const T = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
const S = [Infinity, 0.99, 0.97, 0.95, 0.9];
const sweep = [];
for (const s of S) for (const t of T) sweep.push({ t, s: s === Infinity ? null : s, acc: row(t, s) });
const ok = sweep.filter((r) => GUARD.every((k) => base[k] - r.acc[k] <= MAXLOSS + 1e-9));
// pick on the tuning half; ties -> smaller t, then no disagreement rule / stricter s
const best = ok.sort((a, b) => b.acc.real_human_tune - a.acc.real_human_tune || a.t - b.t || (b.s ?? 2) - (a.s ?? 2))[0] || null;
for (const r of sweep) r.acc = r2(r.acc);
const n = Object.fromEntries(Object.entries(preds).map(([k, P]) => [k, P.length]));
const out = { model: mp.replace(ROOT, ''), dir: enc.dir.replace(ROOT, ''), n, A: r2(base), student: r2(student), selectedOn: 'real_human_tune', maxLoss: MAXLOSS, best, sweep };
console.log(JSON.stringify(out));
if (jo) writePrivate(jo, JSON.stringify(out, null, 1) + '\n');
