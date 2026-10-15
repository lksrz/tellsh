#!/usr/bin/env node
// Latency of the pure-JS student (src/rerank/student-js.js), 1 thread: cold load, per-query p50/p95 on unique queries
// (fresh texts, so the per-process result cache never hits), first-query time, and end-to-end CLI wall time
// (`node bin/tellsh.js --dry-run --json <q>`, median of --runs) for a query that consults the student vs one that does not.
//   node scripts/hybrid/bench_student_js.js [--dir DIR] [--n 300] [--runs 7]   (JSON on stdout)
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { findStudentDir } from '../../src/rerank/student.js';
import { StudentJS } from '../../src/rerank/student-js.js';
import { evalSets } from './sets.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const dir = findStudentDir(opt('--dir'));
if (!dir) { console.error('bench_student_js: no student bundle'); process.exit(1); }
const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return +s[Math.min(s.length - 1, Math.floor(p * s.length))].toFixed(1); };

let t = performance.now();
const m = StudentJS.load(dir);
const loadMs = performance.now() - t;
const S = evalSets(ROOT);
const texts = [...new Set([...S.eval(), ...S.shell(), ...S.blind()].map((r) => r.text))].slice(0, +opt('--n', 300));
const ms = [];
let first;
for (const q of texts) {
  t = performance.now();
  await m.infer(q, { shell: 'bash', os: 'linux' });
  ms.push(performance.now() - t);
  first ??= ms[0];
}
const cli = (q) => {
  const w = [];
  let j;
  for (let i = 0; i < +opt('--runs', 7); i++) {
    t = performance.now();
    const r = spawnSync(process.execPath, ['bin/tellsh.js', '--dry-run', '--json', q], { cwd: ROOT, encoding: 'utf8', env: { ...process.env, TELLSH_STUDENT_DIR: dir } });
    w.push(performance.now() - t);
    j = JSON.parse(r.stdout);
  }
  return { q, ms: pct(w, 0.5), max: pct(w, 1), consulted: !!(j.hybrid?.consulted || j.hybrid?.deferred), intent: j.intent };
};
const out = {
  dir: dir.replace(ROOT, ''), loadMs: +loadMs.toFixed(1), firstQueryMs: +first.toFixed(1), n: ms.length,
  p50: pct(ms, 0.5), p95: pct(ms, 0.95), max: pct(ms, 1),
  cliStudent: cli('gdzie jest plik docker-compose.yml?'), cliA: cli('show git status'),
};
console.log(JSON.stringify(out, null, 1));
