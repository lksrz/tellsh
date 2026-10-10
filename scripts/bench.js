#!/usr/bin/env node
// Latency benchmark. Run pinned to one core: `taskset -c 0 node scripts/bench.js` (npm run bench).
//  cold: spawn a fresh `node bin/tellsh.js --dry-run --json --shell bash <query>` (node startup + model load + full pipeline)
//  warm: in-process full pipeline per query: env/ctx tokens -> cascade (tool top-3 + intent) -> BIO tagger ->
//        regex fallback/merge -> render for the shell -> danger check (+ composer check)
import { spawnSync, execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { cpus } from 'node:os';
import { loadModel } from '../src/model.js';
import { suggest } from '../src/pipeline.js';
import { updateSection } from './report.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BIN = join(ROOT, 'bin', 'tellsh.js');
const COLD_RUNS = +(process.env.COLD_RUNS || 40);
const WARM_N = +(process.env.WARM_N || 2000);

const quantile = (arr, q) => { const s = [...arr].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(q * s.length))]; };
const fmt = (ms) => `${ms.toFixed(ms < 1 ? 3 : 1)} ms`;
const queries = readdirSync(join(ROOT, 'data', 'eval')).filter((f) => f.endsWith('.jsonl')).sort()
  .flatMap((f) => readFileSync(join(ROOT, 'data', 'eval', f), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l).text));

const nodeOnly = [];
for (let i = 0; i < 10; i++) { const t = performance.now(); spawnSync(process.execPath, ['-e', '0']); nodeOnly.push(performance.now() - t); }

const cold = [];
for (let i = 0; i < COLD_RUNS; i++) {
  const q = queries[(i * 37) % queries.length];
  const t = performance.now();
  const r = spawnSync(process.execPath, [BIN, '--dry-run', '--json', '--shell', 'bash', '--os', 'linux', q], { encoding: 'utf8' });
  cold.push(performance.now() - t);
  if (![0, 3, 5].includes(r.status)) throw new Error(`cold run failed (${r.status}): ${r.stderr}`);
}

const tl = performance.now();
const model = loadModel();
const loadMs = performance.now() - tl;

const run = (env, extra = {}) => {
  for (let i = 0; i < 200; i++) suggest(queries[i % queries.length], { model, env, ...extra });
  const times = [];
  for (let i = 0; i < WARM_N; i++) {
    const q = queries[(i * 7) % queries.length];
    const t = performance.now();
    suggest(q, { model, env, ...extra });
    times.push(performance.now() - t);
  }
  return times;
};
const warm = run({ shell: 'bash', os: 'linux', coreutils: 'gnu' }, { compose: 'off' });
const warmCompose = run({ shell: 'bash', os: 'linux', coreutils: 'gnu' });
const warmPs = run({ shell: 'powershell', os: 'win32', coreutils: 'gnu' });
const hist = ['docker run -d --name web nginx', 'cd ~/projects/api', 'tellsh ile zajmuje /home', 'git checkout -b feature/x', 'cat notes.txt'];
const warmHist = run({ shell: 'bash', os: 'linux', coreutils: 'gnu' }, { history: hist });

let affinity = 'unknown';
try { affinity = execFileSync('taskset', ['-cp', String(process.pid)], { encoding: 'utf8' }).trim().split(': ').pop(); } catch {}

const md = `## Latency

Machine: ${cpus()[0]?.model || 'unknown CPU'}, Node ${process.version}, ${process.platform}; CPU affinity: \`${affinity}\` (run via \`taskset -c 0\`).

| measurement | p50 | p95 | runs |
|---|---|---|---|
| bare \`node -e 0\` startup (baseline) | ${fmt(quantile(nodeOnly, 0.5))} | ${fmt(quantile(nodeOnly, 0.95))} | ${nodeOnly.length} |
| **cold**: \`node bin/tellsh.js --dry-run --json --shell bash <query>\` (new process, model load, full pipeline) | **${fmt(quantile(cold, 0.5))}** | **${fmt(quantile(cold, 0.95))}** | ${cold.length} |
| model load (in-process, one-off) | ${fmt(loadMs)} | – | 1 |
| **warm**: full cascade + tagger + render (bash, composer off) | **${fmt(quantile(warm, 0.5))}** | **${fmt(quantile(warm, 0.95))}** | ${warm.length} |
| warm, incl. composer modifier check (shipped default) | ${fmt(quantile(warmCompose, 0.5))} | ${fmt(quantile(warmCompose, 0.95))} | ${warmCompose.length} |
| warm, PowerShell rendering | ${fmt(quantile(warmPs, 0.5))} | ${fmt(quantile(warmPs, 0.95))} | ${warmPs.length} |
| warm, 5 history lines given (only the previous one is read; context build + reference rules) | ${fmt(quantile(warmHist, 0.5))} | ${fmt(quantile(warmHist, 0.95))} | ${warmHist.length} |

The composer runs \`bash -n\` (a subprocess, ~2 ms) only when it actually returns a composed command.
`;
updateSection('bench', md);
console.log(md);
