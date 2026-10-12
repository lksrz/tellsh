#!/usr/bin/env node
// Student encoder size, load time, per-call latency and RSS in Node (onnxruntime-node). Uses public eval texts only;
// each text is inferred once (the encoder's per-text cache is never hit).
//   node scripts/distill/bench_student.js <onnx dir> [--threads 1] [--n 300]
import { readFileSync, readdirSync, statSync, existsSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Encoder } from '../../src/rerank/encoder.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
const dir = args[0];
const threads = +opt('--threads', 1), N = +opt('--n', 300);
if (!dir || dir.startsWith('--') || !existsSync(join(dir, 'encoder.int8.onnx')) || !existsSync(join(dir, 'vocab.json'))) { console.error('usage: bench_student.js <onnx dir> [--threads 1] [--n 300]'); process.exit(1); }
const rss0 = process.memoryUsage().rss;
const enc = await Encoder.load({ dir, ort: 'node', threads });
// Encoder.load falls back to other bundles and to onnxruntime-web: insist on the requested bundle in onnxruntime-node
if (!enc || realpathSync(enc.dir) !== realpathSync(dir)) { console.error('bench_student: cannot load encoder from', dir); process.exit(1); }
if (enc.runtime !== 'onnxruntime-node') { console.error('bench_student: onnxruntime-node not available (got', enc.runtime + ')'); process.exit(1); }
const ed = join(ROOT, 'data/eval');
const texts = [...new Set(readdirSync(ed).filter((f) => f.endsWith('.jsonl')).flatMap((f) => readFileSync(join(ed, f), 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l).text)))].slice(0, N + 20);
for (const t of texts.slice(0, 20)) await enc.infer(t, { shell: 'bash', os: 'linux' }); // warm-up
if (texts.length <= 20) { console.error('bench_student: not enough eval texts'); process.exit(1); }
const ms = [];
for (const t of texts.slice(20)) { const t0 = performance.now(); await enc.infer(t, { shell: 'bash', os: 'linux' }); ms.push(performance.now() - t0); }
ms.sort((a, b) => a - b);
const q = (p) => +ms[Math.min(ms.length - 1, Math.floor(p * ms.length))].toFixed(2);
const size = (f) => +(statSync(join(enc.dir, f)).size / 1048576).toFixed(2);
console.log(JSON.stringify({ dir: enc.dir.replace(ROOT, ''), runtime: enc.runtime, threads, n: ms.length, onnxMB: size('encoder.int8.onnx'), vocabMB: size('vocab.json'), labelsMB: size('labels.json'),
  loadMs: +enc.loadMs.toFixed(1), p50: q(0.5), p90: q(0.9), p99: q(0.99), mean: +(ms.reduce((a, b) => a + b, 0) / ms.length).toFixed(2),
  rssMB: +(process.memoryUsage().rss / 1048576).toFixed(1), rssDeltaMB: +((process.memoryUsage().rss - rss0) / 1048576).toFixed(1) }));
