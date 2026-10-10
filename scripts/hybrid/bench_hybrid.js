#!/usr/bin/env node
// Latency of the hybrid systems, pinned to ONE core:  taskset -c 0 node scripts/hybrid/bench_hybrid.js
// -> build/hybrid/bench.json
import { spawnSync } from 'node:child_process';
import { readFileSync, readdirSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { performance } from 'node:perf_hooks';
import { cpus } from 'node:os';
import { suggest } from '../../src/pipeline.js';
import { getModel } from '../../src/model.js';
import { Encoder, findModelDir } from '../../src/rerank/encoder.js';
import { suggestHybrid } from '../../src/rerank/hybrid.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const q = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(p * s.length))]; };
const stat = (a) => ({ p50: +q(a, 0.5).toFixed(3), p95: +q(a, 0.95).toFixed(3), n: a.length });
const queries = readdirSync(join(ROOT, 'data/eval')).filter((f) => f.endsWith('.jsonl')).sort()
  .flatMap((f) => readFileSync(join(ROOT, 'data/eval', f), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l).text));
const N = +(process.env.WARM_N || 600);
const sample = Array.from({ length: N }, (_, i) => queries[(i * 7919) % queries.length]);
const env = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const out = { machine: cpus()[0].model, node: process.version, affinity: spawnSync('sh', ['-c', `taskset -pc ${process.pid}`], { encoding: 'utf8' }).stdout.trim().split(': ')[1] };
const model = getModel();
const time = async (fn) => { const ts = []; for (const s of sample) { const t = performance.now(); await fn(s); ts.push(performance.now() - t); } return ts; };
for (const s of sample.slice(0, 50)) suggest(s, { env, model, compose: 'off' });
out.warm_A = stat(await time((s) => suggest(s, { env, model, compose: 'off' })));
for (const rt of ['node', 'web']) {
  const enc = await Encoder.load({ ort: rt, threads: 1 });
  if (!enc || !enc.runtime.endsWith(rt)) continue;
  out[`load_B_${rt}_ms`] = +enc.loadMs.toFixed(1);
  for (const s of sample.slice(0, 20)) await enc.infer(s + ' ', env);
  const inferB = async (s) => { enc.cache.clear(); return enc.infer(s, env); };
  out[`warm_B_infer_${rt}`] = stat(await time(inferB));
  out[`warm_B_full_${rt}`] = stat(await time((s) => suggestHybrid(s, { env, model, compose: 'off', system: 'B', encoder: { infer: inferB } })));
  let deferred = 0;
  out[`warm_AB_${rt}`] = stat(await time(async (s) => { const r = await suggestHybrid(s, { env, model, compose: 'off', system: 'A+B', encoder: { infer: inferB } }); if (r.hybrid.deferred) deferred++; }));
  out[`warm_AB_${rt}`].deferred = +(deferred / sample.length).toFixed(3);
}
// cold: new process per query
const COLD = +(process.env.COLD_RUNS || 20);
const cold = (system, qs) => qs.map((qq) => { const t = performance.now(); const r = spawnSync(process.execPath, [join(ROOT, 'scripts/hybrid/cold_query.js'), system, qq], { encoding: 'utf8' }); if (r.status !== 0) throw new Error(r.stderr); return [performance.now() - t, JSON.parse(r.stdout).deferred]; });
const coldQs = sample.slice(0, COLD);
out.cold_node_baseline = stat(Array.from({ length: 10 }, () => { const t = performance.now(); spawnSync(process.execPath, ['-e', '0']); return performance.now() - t; }));
out.cold_A = stat(cold('A', coldQs).map((x) => x[0]));
const ab = cold('A+B', coldQs);
out.cold_AB = { ...stat(ab.map((x) => x[0])), deferred: ab.filter((x) => x[1]).length };
const abD = ab.filter((x) => x[1]).map((x) => x[0]);
if (abD.length) out.cold_AB_deferred_only = stat(abD);
out.cold_B = stat(cold('B', coldQs.slice(0, 10)).map((x) => x[0]));
const d = findModelDir();
if (d) out.bundle = Object.fromEntries(readdirSync(d).map((f) => [f, statSync(join(d, f)).size]));
// C: llama.cpp (GGUF) prompt processing on one thread, if available
const LB = process.env.LLAMA_BIN;
if (LB && existsSync(join(LB, 'llama-bench'))) {
  for (const f of (process.env.LLAMA_MODELS || '').split(',').filter(Boolean)) {
    const r = spawnSync(join(LB, 'llama-bench'), ['-m', f, '-t', '1', '-p', '112,308', '-n', '1', '-r', '3', '-o', 'json'], { encoding: 'utf8', env: { ...process.env, LD_LIBRARY_PATH: LB } });
    try { out[`C_llama_${f.split('/').pop()}`] = JSON.parse(r.stdout).map((x) => ({ n_prompt: x.n_prompt, n_gen: x.n_gen, tps: x.avg_ts, size: x.model_size })); } catch { out[`C_llama_${f.split('/').pop()}`] = r.stderr.slice(-300); }
    // cold: load + one few-shot-sized prompt, new process
    const prompt = 'x '.repeat(300);
    const ts = [];
    for (let i = 0; i < 3; i++) { const t = performance.now(); spawnSync(join(LB, 'llama-cli'), ['-m', f, '-t', '1', '-p', prompt, '-n', '1', '-no-cnv', '--no-warmup'], { encoding: 'utf8', env: { ...process.env, LD_LIBRARY_PATH: LB } }); ts.push(performance.now() - t); }
    out[`C_cold_${f.split('/').pop()}`] = stat(ts);
  }
}
writeFileSync(join(ROOT, 'build/hybrid/bench.json'), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
