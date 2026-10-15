import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { buildBundle, quantRows, readSafetensors, toF16 } from '../scripts/hybrid/export_student_js.js';
import { parseBundle, StudentModel, linear, attend, fromF16 } from '../src/rerank/student-js.js';
import { wasmLinear } from '../src/rerank/wasm-linear.js';
import { findStudentDir, loadStudent } from '../src/rerank/student.js';

// tiny random model (1 layer, hidden 8, 2 heads), built in-test
let seed = 7;
const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648 - 0.5; };
const T = (...shape) => ({ shape, data: Float32Array.from({ length: shape.reduce((a, b) => a * b, 1) }, rnd) });
const H = 8, I = 16, V = 20, NH = 2;
const tiny = () => {
  const t = { 'enc.embeddings.word_embeddings.weight': T(V, H), 'enc.embeddings.position_embeddings.weight': T(16, H), 'enc.embeddings.token_type_embeddings.weight': T(2, H),
    'enc.embeddings.LayerNorm.weight': T(H), 'enc.embeddings.LayerNorm.bias': T(H), 'enc.pooler.dense.weight': T(H, H), 'enc.pooler.dense.bias': T(H),
    'tool.weight': T(3, H), 'tool.bias': T(3), 'intent.weight': T(5, H), 'intent.bias': T(5), 'tag.weight': T(3, H), 'tag.bias': T(3) };
  const p = 'enc.encoder.layer.0.';
  for (const k of ['attention.self.query', 'attention.self.key', 'attention.self.value', 'attention.output.dense']) { t[`${p}${k}.weight`] = T(H, H); t[`${p}${k}.bias`] = T(H); }
  t[`${p}intermediate.dense.weight`] = T(I, H); t[`${p}intermediate.dense.bias`] = T(I);
  t[`${p}output.dense.weight`] = T(H, I); t[`${p}output.dense.bias`] = T(H);
  for (const k of ['attention.output.LayerNorm', 'output.LayerNorm']) { t[`${p}${k}.weight`] = T(H); t[`${p}${k}.bias`] = T(H); }
  return t;
};

// straightforward reference (plain arrays, float64, exact erf via a series) on the int8-dequantized weights
const erf = (x) => { let s = 0, term = x, n = 0; while (Math.abs(term) > 1e-17 && n < 200) { s += term / (2 * n + 1); n++; term *= -x * x / n; } return 2 / Math.sqrt(Math.PI) * s; };
const dq = (w) => { const { q, scale } = quantRows(w.data, w.shape[0], w.shape[1]); return Array.from({ length: w.shape[0] }, (_, r) => Array.from({ length: w.shape[1] }, (_, c) => q[r * w.shape[1] + c] * scale[r])); };
const rows = (w) => Array.from({ length: w.shape[0] }, (_, r) => Array.from(w.data.subarray(r * w.shape[1], (r + 1) * w.shape[1])));
const lin = (x, W, b) => x.map((xi) => W.map((w, o) => w.reduce((a, v, k) => a + v * xi[k], b.data[o])));
const ln = (x, g, b) => x.map((r) => { const m = r.reduce((a, v) => a + v, 0) / r.length; const v = r.reduce((a, z) => a + (z - m) ** 2, 0) / r.length; return r.map((z, k) => (z - m) / Math.sqrt(v + 1e-12) * g.data[k] + b.data[k]); });
function reference(t, ids) {
  const E = dq(t['enc.embeddings.word_embeddings.weight']); const P = rows(t['enc.embeddings.position_embeddings.weight']); const Ty = t['enc.embeddings.token_type_embeddings.weight'].data;
  let x = ln(ids.map((id, i) => E[id].map((v, k) => v + P[i][k] + Ty[k])), t['enc.embeddings.LayerNorm.weight'], t['enc.embeddings.LayerNorm.bias']);
  const g = (k) => t[`enc.encoder.layer.0.${k}`];
  const L = (k, src) => lin(src, dq(g(`${k}.weight`)), g(`${k}.bias`));
  const q = L('attention.self.query', x), k = L('attention.self.key', x), v = L('attention.self.value', x);
  const dh = H / NH;
  const ctx = x.map(() => new Array(H).fill(0));
  for (let h = 0; h < NH; h++) for (let i = 0; i < ids.length; i++) {
    const s = ids.map((_, j) => { let a = 0; for (let d = 0; d < dh; d++) a += q[i][h * dh + d] * k[j][h * dh + d]; return a / Math.sqrt(dh); });
    const m = Math.max(...s); const e = s.map((z) => Math.exp(z - m)); const z = e.reduce((a, b) => a + b, 0);
    for (let j = 0; j < ids.length; j++) for (let d = 0; d < dh; d++) ctx[i][h * dh + d] += e[j] / z * v[j][h * dh + d];
  }
  const a = L('attention.output.dense', ctx);
  x = ln(x.map((r, i) => r.map((z, j) => z + a[i][j])), g('attention.output.LayerNorm.weight'), g('attention.output.LayerNorm.bias'));
  const hh = L('intermediate.dense', x).map((r) => r.map((z) => 0.5 * z * (1 + erf(z / Math.SQRT2))));
  const o = L('output.dense', hh);
  x = ln(x.map((r, i) => r.map((z, j) => z + o[i][j])), g('output.LayerNorm.weight'), g('output.LayerNorm.bias'));
  const pooled = x[0].map((_, j) => x.reduce((s, r) => s + r[j], 0) / x.length);
  const head = (n, src) => lin([src], rows(t[`${n}.weight`]), t[`${n}.bias`])[0];
  return { tool: head('tool', pooled), intent: head('intent', pooled), tags: x.map((r) => head('tag', r)) };
}
const close = (a, b, eps, what) => { assert.equal(a.length, b.length, what); for (let i = 0; i < a.length; i++) assert.ok(Math.abs(a[i] - b[i]) < eps, `${what}[${i}]: ${a[i]} vs ${b[i]}`); };

test('student-js: forward pass of a tiny random model matches the reference implementation', () => {
  const t = tiny();
  const bin = buildBundle(t, { heads: NH });
  // both kernels: WebAssembly SIMD (default) and the plain-JS fallback
  for (const wasm of [true, false]) {
    const m = new StudentModel(parseBundle(bin), { wasm });
    assert.equal(m.runtime, wasm ? 'wasm-simd' : 'js');
    for (const ids of [[0, 5, 2], [1, 19, 7, 7, 3, 2, 2, 11, 2], [4]]) {
      const out = m.forward(ids); const ref = reference(t, ids);
      close(out.tool, ref.tool, 1e-4, 'tool');
      close(out.intent, ref.intent, 1e-4, 'intent');
      ids.forEach((_, i) => close(out.tags(i), ref.tags[i], 1e-4, `tag ${i}`));
    }
  }
});

test('student-js: blocked linear equals a naive matmul for odd shapes', () => {
  for (const [n, K, O] of [[1, 3, 1], [3, 5, 7], [4, 8, 9], [5, 6, 4]]) {
    const x = Float32Array.from({ length: n * K }, rnd); const W = Float32Array.from({ length: O * K }, rnd); const b = Float32Array.from({ length: O }, rnd);
    const out = new Float32Array(n * O);
    linear(x, n, K, W, b, O, out);
    const ref = [];
    for (let i = 0; i < n; i++) for (let o = 0; o < O; o++) { let a = b[o]; for (let k = 0; k < K; k++) a += x[i * K + k] * W[o * K + k]; ref.push(a); }
    close(out, ref, 1e-5, `linear ${n}x${K}x${O}`);
  }
});

test('student-js: WebAssembly kernels (linear, deq, attend) equal the JS reference on realistic shapes', () => {
  const k = wasmLinear(4 << 20);
  assert.ok(k, 'WebAssembly SIMD available (Node >= 18)');
  let off = 0;
  const f32 = (len) => { const v = new Float32Array(k.buffer, off, len); off += len * 4; for (let j = 0; j < len; j++) v[j] = rnd(); return v; };
  for (const [n, K, O] of [[1, 384, 384], [7, 384, 1536], [6, 1536, 384]]) {
    off = 0;
    const x = f32(n * K), W = f32(O * K), b = f32(O), out = f32(n * O), ref = new Float32Array(n * O);
    k.linear(x, n, K, W, b, O, out); linear(x, n, K, W, b, O, ref);
    close(out, ref, 1e-4, `wasm linear ${n}x${K}x${O}`);
  }
  off = 0;
  const q = new Int8Array(k.buffer, 0, 64); for (let j = 0; j < 64; j++) q[j] = (j * 37) % 255 - 127; off = 64;
  const s = f32(4), d = f32(64);
  k.deq(q, s, 4, 16, d);
  close(d, Array.from(q, (v, j) => Math.fround(v * s[Math.floor(j / 16)])), 1e-6, 'wasm deq');
  for (const n of [1, 5, 23]) {
    off = 0;
    const H = 384, NH = 12;
    const [qq, kk, vv, c1, p1] = [f32(n * H), f32(n * H), f32(n * H), f32(n * H), f32(n)];
    const c2 = new Float32Array(n * H);
    k.attend(qq, kk, vv, c1, p1, n, H, NH); attend(qq, kk, vv, c2, new Float32Array(n), n, H, NH);
    close(c1, c2, 1e-5, `wasm attend n=${n}`);
  }
});

test('student-js: bundle format round trip (safetensors -> student.bin -> typed arrays)', () => {
  const t = tiny();
  // safetensors writer for the round trip through readSafetensors
  const names = Object.keys(t); let off = 0; const head = {};
  for (const k of names) { head[k] = { dtype: 'F32', shape: t[k].shape, data_offsets: [off, off + t[k].data.byteLength] }; off += t[k].data.byteLength; }
  const h = Buffer.from(JSON.stringify(head)); const st = Buffer.alloc(8 + h.length + off);
  st.writeBigUInt64LE(BigInt(h.length)); h.copy(st, 8);
  for (const k of names) Buffer.from(t[k].data.buffer).copy(st, 8 + h.length + head[k].data_offsets[0]);
  const back = readSafetensors(st);
  assert.deepEqual(Object.keys(back), names);
  const b = parseBundle(buildBundle(back, { heads: NH, posOffset: 2 }));
  assert.deepEqual(b.config, { layers: 1, hidden: H, heads: NH, inter: I, vocab: V, eps: 1e-12, posOffset: 2, quant: 'int8-row' });
  assert.equal(b.tensors['pooler.dense.weight'], undefined);
  assert.equal(b.tensors['embeddings.word_embeddings.weight'].dtype, 'i8');
  assert.equal(b.tensors['tool.weight'].dtype, 'f32');
  assert.deepEqual(Array.from(b.get('embeddings.LayerNorm.bias')), Array.from(t['enc.embeddings.LayerNorm.bias'].data));
  const w = t['enc.encoder.layer.0.intermediate.dense.weight']; const q = b.get('encoder.layer.0.intermediate.dense.weight'); const s = b.get('encoder.layer.0.intermediate.dense.weight.scale');
  for (let i = 0; i < w.data.length; i++) assert.ok(Math.abs(q[i] * s[Math.floor(i / H)] - w.data[i]) <= s[Math.floor(i / H)] / 2 + 1e-7);
  assert.throws(() => parseBundle(Buffer.from('garbage-garbage')), /student\.bin/);
});

test('student-js: a corrupt student.bin loads as null (A alone), never a throw', async () => {
  const d = mkdtempSync(join(tmpdir(), 'tellsh-stujs-'));
  for (const f of ['student.bin', 'vocab.json', 'labels.json']) writeFileSync(join(d, f), 'garbage');
  assert.equal(findStudentDir(d), d);
  assert.equal(await loadStudent({ dir: d }), null);
});

const dir = findStudentDir();
const real = dir && existsSync(join(dir, 'student.bin')) ? await loadStudent() : null;
test('student-js: real bundle answers and caches per process (skipped without student.bin)', { skip: !real }, async () => {
  const env = { shell: 'bash', os: 'linux' };
  const a = await real.infer('pokaż status repozytorium git', env);
  assert.equal(a.topIntent, 'git_status');
  assert.ok(Math.abs(Object.values(a.intents).reduce((x, y) => x + y, 0) - 1) < 1e-4);
  assert.equal(await real.infer('pokaż status repozytorium git', env), a);
  const f = await real.infer('gdzie jest plik docker-compose.yml?', env);
  assert.equal(f.topIntent, 'find_by_name');
  assert.ok(Array.isArray(f.tagger('gdzie jest plik docker-compose.yml?', 'find').spans));
  assert.equal(real.kernel, 'wasm-simd');
  // the lazy tagger reads a copy of the token states: later queries must not change it
  const spans = JSON.stringify(f.tagger('gdzie jest plik docker-compose.yml?', 'find').spans);
  const g = await real.infer('find files named notes.txt in /tmp', env);
  assert.equal(JSON.stringify(f.tagger('gdzie jest plik docker-compose.yml?', 'find').spans), spans);
  assert.ok(g.tagger('find files named notes.txt in /tmp', 'find').spans.length > 0);
});

test('student-js: f16 storage round trip and an f16 bundle runs close to the int8 one', () => {
  const a = Float32Array.from([0, 1, -2.5, 0.1, 1e-6, 65504, 3e-5, -0.333, 1e9]);
  const b = fromF16(toF16(a));
  for (let i = 0; i < 8; i++) assert.ok(Math.abs(b[i] - a[i]) <= Math.abs(a[i]) * 1e-3 + 1e-7, `${a[i]} -> ${b[i]}`);
  assert.equal(b[8], Infinity);
  const t = tiny();
  const m16 = new StudentModel(parseBundle(buildBundle(t, { heads: NH, quant: 'f16' })));
  const m8 = new StudentModel(parseBundle(buildBundle(t, { heads: NH })));
  close(m16.forward([1, 4, 2]).intent, m8.forward([1, 4, 2]).intent, 0.05, 'f16 vs int8');
});
