#!/usr/bin/env node
// Model A top-1 intent accuracy (cascade, no reject threshold) on the private real-usage eval split
// (build/real/rows.jsonl) and the public held-out sets. Aggregates only. A model trained on a different split (e.g. the
// shipped 0.3.x model, trained on --group v04) has seen some of these eval texts: retrain on the current split before comparing.
//   node scripts/real/eval_a.js [model.bin] [--json out.json]
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadModel } from '../../src/model.js';
import { cascade } from '../../src/cascade.js';
import { envFeatures } from '../../src/env.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const args = process.argv.slice(2);
const mp = args.find((a) => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--json') || join(ROOT, 'model/model.bin');
const jo = args.includes('--json') ? args[args.indexOf('--json') + 1] : null;
const model = loadModel(mp);
const rj = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const rd = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).flatMap((f) => rj(join(d, f))) : []);
const real = rj(join(ROOT, 'build/real/rows.jsonl')).filter((r) => r.split === 'eval' && r.intent);
const known = new Set(Object.keys(model.models).filter((k) => k.startsWith('intent:')).flatMap((k) => model.models[k].labels).concat(Object.values(model.intentsByFamily).flat()));
const sets = {
  real: real, real_en: real.filter((r) => r.lang === 'en'), real_pl: real.filter((r) => r.lang === 'pl'),
  real_human: real.filter((r) => !r.tmpl), real_tmpl: real.filter((r) => r.tmpl),
  data_eval: rd(join(ROOT, 'data/eval')), eval_v04: rd(join(ROOT, 'data/eval_v04')), shell_eval: rj(join(ROOT, 'data/shell/eval.jsonl')),
};
const out = { model: mp.replace(ROOT, ''), sets: {} };
for (const [name, rows] of Object.entries(sets)) {
  let ok = 0, okKnown = 0, nKnown = 0; const per = {};
  for (const r of rows) {
    const env = { shell: r.shell || 'bash', os: r.os || 'linux', coreutils: (r.os || 'linux') === 'darwin' ? 'bsd' : 'gnu' };
    const c = cascade(r.text, { model, extras: envFeatures(env), top: 1 });
    const hit = c.intent === r.intent;
    ok += hit; (per[r.intent] ||= [0, 0])[0] += hit; per[r.intent][1]++;
    if (known.has(r.intent)) { nKnown++; okKnown += hit; }
  }
  out.sets[name] = { n: rows.length, acc: +(100 * ok / Math.max(1, rows.length)).toFixed(2), nKnown, accKnown: +(100 * okKnown / Math.max(1, nKnown)).toFixed(2),
    macro: +(100 * Object.values(per).reduce((a, [h, n]) => a + h / n, 0) / Math.max(1, Object.keys(per).length)).toFixed(2) };
}
console.log(JSON.stringify(out, null, 1));
if (jo) writeFileSync(jo, JSON.stringify(out, null, 1));
