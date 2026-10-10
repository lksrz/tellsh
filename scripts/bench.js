#!/usr/bin/env node
// Latency benchmark. Run pinned to one core: `taskset -c 0 node scripts/bench.js` (npm run bench).
//  cold: spawn a fresh `node bin/tellsh.js --dry-run --json ...` process (includes node startup + model load)
//  warm: in-process classify + slot fill over 2000 queries
import { spawnSync, execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { cpus } from 'node:os';
import { loadModel, classify } from '../src/classifier.js';
import { buildCommand } from '../src/fill.js';
import { updateSection } from './report.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BIN = join(ROOT, 'bin', 'tellsh.js');
const COLD_RUNS = +(process.env.COLD_RUNS || 30);
const WARM_N = +(process.env.WARM_N || 2000);

const quantile = (arr, q) => {
  const s = [...arr].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.floor(q * s.length))];
};
const fmt = (ms) => `${ms.toFixed(ms < 1 ? 3 : 1)} ms`;

const queries = readdirSync(join(ROOT, 'data', 'eval')).filter((f) => f.endsWith('.jsonl')).sort()
  .flatMap((f) => readFileSync(join(ROOT, 'data', 'eval', f), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l).text));

// baseline: bare node startup
const nodeOnly = [];
for (let i = 0; i < 10; i++) {
  const t = performance.now();
  spawnSync(process.execPath, ['-e', '0']);
  nodeOnly.push(performance.now() - t);
}

const cold = [];
for (let i = 0; i < COLD_RUNS; i++) {
  const q = queries[(i * 37) % queries.length];
  const t = performance.now();
  const r = spawnSync(process.execPath, [BIN, '--dry-run', '--json', q], { encoding: 'utf8' });
  cold.push(performance.now() - t);
  if (r.status !== 0 && r.status !== 3) throw new Error(`cold run failed (${r.status}): ${r.stderr}`);
}

const tl = performance.now();
const model = loadModel();
const loadMs = performance.now() - tl;

// warm-up then measure
for (let i = 0; i < 200; i++) classify(queries[i % queries.length], { model });
const warm = [];
for (let i = 0; i < WARM_N; i++) {
  const q = queries[i % queries.length];
  const t = performance.now();
  const c = classify(q, { model });
  if (c.confident) buildCommand(c.intent, q);
  warm.push(performance.now() - t);
}

let affinity = 'unknown';
try { affinity = execFileSync('taskset', ['-cp', String(process.pid)], { encoding: 'utf8' }).trim().split(': ').pop(); } catch {}

const md = `## Latency

Machine: ${cpus()[0]?.model || 'unknown CPU'}, Node ${process.version}, ${process.platform}; CPU affinity: \`${affinity}\` (run via \`taskset -c 0\`).

| measurement | p50 | p95 | runs |
|---|---|---|---|
| bare \`node -e 0\` startup (baseline) | ${fmt(quantile(nodeOnly, 0.5))} | ${fmt(quantile(nodeOnly, 0.95))} | ${nodeOnly.length} |
| **cold**: \`node bin/tellsh.js --dry-run --json <query>\` (new process, model load, classify, fill) | **${fmt(quantile(cold, 0.5))}** | **${fmt(quantile(cold, 0.95))}** | ${cold.length} |
| model load (in-process, one-off) | ${fmt(loadMs)} | – | 1 |
| **warm**: classify + slot fill, in-process | **${fmt(quantile(warm, 0.5))}** | **${fmt(quantile(warm, 0.95))}** | ${warm.length} |
`;
updateSection('bench', md);
console.log(md);
