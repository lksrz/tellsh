#!/usr/bin/env node
// Student encoder (ONNX) top-1 intent accuracy on the same sets as scripts/real/eval_a.js (aggregates only).
//   node scripts/distill/eval_student.js <onnx dir> [--json out.json] [--max N]
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Encoder } from '../../src/rerank/encoder.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const args = process.argv.slice(2);
const dir = args[0];
const jo = args.includes('--json') ? args[args.indexOf('--json') + 1] : null;
const MAX = args.includes('--max') ? +args[args.indexOf('--max') + 1] : Infinity;
const rj = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const rd = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).flatMap((f) => rj(join(d, f))) : []);
const real = rj(join(ROOT, 'build/real/rows.jsonl')).filter((r) => r.split === 'eval' && r.intent);
// deterministic subsample of the real set (it is large; CPU inference)
const sub = (rows) => rows.filter((_, i) => MAX === Infinity || i % Math.ceil(rows.length / MAX) === 0);
const sets = {
  real: sub(real), real_human: sub(real.filter((r) => !r.tmpl)), real_tmpl: sub(real.filter((r) => r.tmpl)),
  data_eval: rd(join(ROOT, 'data/eval')), eval_v04: rd(join(ROOT, 'data/eval_v04')), shell_eval: rj(join(ROOT, 'data/shell/eval.jsonl')),
};
const enc = await Encoder.load({ dir, threads: 2 });
if (!enc) { console.error('eval_student: cannot load encoder from', dir); process.exit(1); }
const out = { dir: dir.replace(ROOT, ''), sets: {} };
for (const [name, rows] of Object.entries(sets)) {
  let ok = 0; const per = {};
  for (const r of rows) {
    const p = await enc.infer(r.text, { shell: r.shell || 'bash', os: r.os || 'linux' });
    const hit = p.topIntent === r.intent;
    ok += hit; (per[r.intent] ||= [0, 0])[0] += hit; per[r.intent][1]++;
  }
  out.sets[name] = { n: rows.length, acc: +(100 * ok / Math.max(1, rows.length)).toFixed(2),
    macro: +(100 * Object.values(per).reduce((a, [h, n]) => a + h / n, 0) / Math.max(1, Object.keys(per).length)).toFixed(2) };
}
console.log(JSON.stringify(out, null, 1));
if (jo) writeFileSync(jo, JSON.stringify(out, null, 1));
