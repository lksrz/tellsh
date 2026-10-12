#!/usr/bin/env node
// End-to-end check of the runtime student fallback (src/rerank/hybrid.js A+S / A+S-full) through the full pipeline:
// per set, the share of rows answered with the gold intent (understood && intent == gold) and, for the out-of-scope
// sets, the share wrongly answered (false accepts). Same rows for every system; aggregates only.
//   node scripts/hybrid/eval_student_runtime.js [--student DIR] [--max N]   (JSON on stdout)
import { fileURLToPath } from 'node:url';
import { suggest } from '../../src/pipeline.js';
import { suggestHybrid } from '../../src/rerank/hybrid.js';
import { loadStudent, findStudentDir } from '../../src/rerank/student.js';
import { evalSets } from './sets.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const dir = findStudentDir(opt('--student'));
const MAX = +opt('--max', Infinity);
const enc = await loadStudent({ dir: opt('--student'), threads: 2 });
if (!enc) { console.error('eval_student_runtime: no student bundle / onnxruntime-node'); process.exit(1); }
const S = evalSets(ROOT);
const sub = (rows) => rows.filter((_, i) => MAX === Infinity || i % Math.ceil(rows.length / MAX) === 0);
const real = S.real();
const sets = { eval: S.eval(), devtools: S.devtools(), shell: S.shell(), blind: S.blind(), blind3: S.blind3(),
  real_human: sub(real.filter((r) => !r.tmpl)), real_tmpl: sub(real.filter((r) => r.tmpl)),
  ood: S.ood(), blind_ood: S.blind_ood(), blind3_ood: S.blind3_ood(), real_ooc: sub(S.real_ooc()) };
const systems = { A: null, 'A+S': 'A+S', 'A+S-full': 'A+S-full' };
const out = { student: dir.replace(ROOT, ''), sets: {} };
for (const [name, rows] of Object.entries(sets)) {
  if (!rows.length) continue;
  const res = {};
  for (const [sys, system] of Object.entries(systems)) {
    let ok = 0, acc = 0, deferred = 0, consulted = 0;
    for (const r of rows) {
      const env = { shell: r.shell || 'bash', os: r.os || 'linux' };
      const o = { env, top: 3, cwd: '/tmp', compose: 'off' };
      const s = system ? await suggestHybrid(r.text, { ...o, system, encoder: enc }) : suggest(r.text, o);
      acc += !!s.understood; deferred += !!s.hybrid?.deferred; consulted += !!(s.hybrid?.consulted || s.hybrid?.deferred);
      ok += r.intent ? (s.understood && s.intent === r.intent) : !s.understood;
    }
    res[sys] = { [rows.every((r) => !r.intent) ? 'rejected' : 'correct']: +(100 * ok / rows.length).toFixed(2), answered: +(100 * acc / rows.length).toFixed(2), studentCalls: +(100 * consulted / rows.length).toFixed(1), changed: +(100 * deferred / rows.length).toFixed(1) };
  }
  out.sets[name] = { n: rows.length, ...res };
  console.error(name, JSON.stringify(out.sets[name]));
}
console.log(JSON.stringify(out));
