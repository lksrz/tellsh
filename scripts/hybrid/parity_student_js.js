#!/usr/bin/env node
// Parity of the pure-JS student (src/rerank/student-js.js, student.bin) against the ONNX student it replaces
// (onnxruntime-node + the 0.1.0 encoder.int8.onnx bundle): intent / tool argmax agreement, max |dp| of the intent
// distribution and agreement of the final A+S decision (suggestHybrid with each encoder), per set and overall.
//   node scripts/hybrid/parity_student_js.js [--js DIR] [--onnx DIR] [--max N] [--pos-offset K]   (JSON on stdout)
import { fileURLToPath } from 'node:url';
import { Encoder } from '../../src/rerank/encoder.js';
import { StudentJS } from '../../src/rerank/student-js.js';
import { suggestHybrid } from '../../src/rerank/hybrid.js';
import { findStudentDir } from '../../src/rerank/student.js';
import { evalSets } from './sets.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const MAX = +opt('--max', Infinity);
const js = StudentJS.load(opt('--js', findStudentDir()));
if (opt('--pos-offset')) js.model.c.posOffset = +opt('--pos-offset');
const onnxDir = opt('--onnx', fileURLToPath(new URL('../../node_modules/tellsh-model-student', import.meta.url)));
const ox = await Encoder.load({ dir: onnxDir, ort: 'node', threads: 1 });
if (!ox || ox.runtime !== 'onnxruntime-node' || !ox.dir.endsWith('tellsh-model-student')) { console.error('parity: needs onnxruntime-node and the ONNX student bundle'); process.exit(1); }
const S = evalSets(ROOT);
const sub = (rows) => rows.filter((_, i) => MAX === Infinity || i % Math.ceil(rows.length / MAX) === 0);
const sets = { eval: S.eval(), shell: S.shell(), blind: S.blind(), blind3: S.blind3() };
const arg = (o) => Object.entries(o).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
const tot = { n: 0, intent: 0, tool: 0, decision: 0, maxDp: 0 };
const out = { js: js.dir.replace(ROOT, ''), onnx: ox.dir.replace(ROOT, ''), sets: {}, diffs: [] };
for (const [name, all] of Object.entries(sets)) {
  const rows = sub(all);
  const s = { n: rows.length, intent: 0, tool: 0, decision: 0, maxDp: 0 };
  for (const r of rows) {
    const env = { shell: r.shell || 'bash', os: r.os || 'linux' };
    const [a, b] = [await js.infer(r.text, env), await ox.infer(r.text, env)];
    s.intent += arg(a.intents) === arg(b.intents);
    s.tool += arg(a.tools) === arg(b.tools);
    for (const k in a.intents) s.maxDp = Math.max(s.maxDp, Math.abs(a.intents[k] - b.intents[k]));
    const o = { env, top: 3, cwd: '/tmp', compose: 'off' };
    const [x, y] = [await suggestHybrid(r.text, { ...o, system: 'A+S', encoder: js }), await suggestHybrid(r.text, { ...o, system: 'A+S', encoder: ox })];
    const same = x.understood === y.understood && x.intent === y.intent && x.command === y.command;
    s.decision += same;
    if (!same && out.diffs.length < 20) out.diffs.push({ set: name, text: r.text, js: x.intent, onnx: y.intent });
  }
  for (const k of ['n', 'intent', 'tool', 'decision']) tot[k] += s[k];
  tot.maxDp = Math.max(tot.maxDp, s.maxDp);
  out.sets[name] = { n: s.n, intent: +(100 * s.intent / s.n).toFixed(2), tool: +(100 * s.tool / s.n).toFixed(2), decision: +(100 * s.decision / s.n).toFixed(2), maxDp: +s.maxDp.toFixed(4) };
  console.error(name, JSON.stringify(out.sets[name]));
}
out.all = { n: tot.n, intent: +(100 * tot.intent / tot.n).toFixed(2), tool: +(100 * tot.tool / tot.n).toFixed(2), decision: +(100 * tot.decision / tot.n).toFixed(2), maxDp: +tot.maxDp.toFixed(4) };
console.error('all', JSON.stringify(out.all));
console.log(JSON.stringify(out));
