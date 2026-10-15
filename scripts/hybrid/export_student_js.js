#!/usr/bin/env node
// Export the distilled student (f32 safetensors from scripts/hybrid/train_encoder.py, class Joint) to the pure-JS
// bundle read by src/rerank/student-js.js: student.bin = magic 'TSJ1', u32 LE header length, JSON header
// {config, tensors: {name: {dtype: 'i8'|'f32', shape, offset}}}, then 8-byte aligned blobs (offsets from data start).
// The word embedding and every transformer linear weight are int8 with a per-output-row symmetric scale (`name.scale`,
// f32; --quant f16 keeps the transformer weights as IEEE half floats instead); biases, LayerNorms, position/type embeddings and the (small) heads stay f32. The pooler is dropped (unused).
//   node scripts/hybrid/export_student_js.js CKPT.safetensors OUT_DIR [--vocab-from DIR] [--heads 12] [--pos-offset 0] [--quant int8|f16]
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** safetensors buffer -> {name: {shape, data: Float32Array}} (F32 only) */
export function readSafetensors(buf) {
  const n = Number(buf.readBigUInt64LE(0));
  const h = JSON.parse(buf.subarray(8, 8 + n).toString('utf8'));
  const out = {};
  for (const [k, v] of Object.entries(h)) {
    if (k === '__metadata__') continue;
    if (v.dtype !== 'F32') throw new Error(`${k}: dtype ${v.dtype} (F32 only)`);
    const [a, b] = v.data_offsets;
    const bytes = buf.subarray(8 + n + a, 8 + n + b);
    out[k] = { shape: v.shape, data: new Float32Array(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.length)) };
  }
  return out;
}

/** symmetric per-row int8: -> {q: Int8Array, scale: Float32Array} */
export function quantRows(data, rows, cols) {
  const q = new Int8Array(rows * cols);
  const scale = new Float32Array(rows);
  for (let r = 0; r < rows; r++) {
    let m = 0;
    for (let c = 0; c < cols; c++) m = Math.max(m, Math.abs(data[r * cols + c]));
    const s = m / 127 || 1;
    scale[r] = s;
    for (let c = 0; c < cols; c++) q[r * cols + c] = Math.round(data[r * cols + c] / s);
  }
  return { q, scale };
}

/** Float32Array -> Uint16Array of IEEE half floats (round to nearest even) */
export function toF16(a) {
  const f = new Float32Array(1); const u = new Uint32Array(f.buffer); const out = new Uint16Array(a.length);
  for (let i = 0; i < a.length; i++) {
    f[0] = a[i]; const x = u[0]; const s = (x >>> 16) & 0x8000; let e = ((x >>> 23) & 0xff) - 112; let m = x & 0x7fffff;
    if (e <= 0) { if (e < -10) { out[i] = s; continue; } m |= 0x800000; const sh = 14 - e; const r = (m >>> sh) + (((m >>> (sh - 1)) & 1) && ((m & ((1 << (sh - 1)) - 1)) || ((m >>> sh) & 1)) ? 1 : 0); out[i] = s | r; continue; }
    if (e >= 31) { out[i] = s | 0x7c00; continue; }
    let h = (e << 10) | (m >>> 13); const rem = m & 0x1fff;
    if (rem > 0x1000 || (rem === 0x1000 && (h & 1))) h++;
    out[i] = s | h;
  }
  return out;
}

const QUANT = /(word_embeddings|attention\.self\.(query|key|value)|attention\.output\.dense|intermediate\.dense|output\.dense)\.weight$/;

/** tensors {name: {shape, data}} -> student.bin Buffer */
export function buildBundle(t, { heads = 12, posOffset = 0, eps = 1e-12, quant = 'int8' } = {}) {
  const P = 'enc.';
  let layers = 0;
  while (t[`${P}encoder.layer.${layers}.attention.self.query.weight`]) layers++;
  const [vocab, hidden] = t[`${P}embeddings.word_embeddings.weight`].shape;
  const inter = t[`${P}encoder.layer.0.intermediate.dense.weight`].shape[0];
  const config = { layers, hidden, heads, inter, vocab, eps, posOffset, quant: quant === 'f16' ? 'f16' : 'int8-row' };
  const blobs = [];
  for (const [k, v] of Object.entries(t)) {
    if (k.includes('pooler')) continue;
    const name = k.startsWith(P) ? k.slice(P.length) : k;
    if (QUANT.test(k) && quant === 'f16' && !k.includes('word_embeddings')) blobs.push([name, 'f16', v.shape, toF16(v.data)]);
    else if (QUANT.test(k)) {
      const { q, scale } = quantRows(v.data, v.shape[0], v.shape[1]);
      blobs.push([name, 'i8', v.shape, q], [`${name}.scale`, 'f32', [v.shape[0]], scale]);
    } else blobs.push([name, 'f32', v.shape, v.data]);
  }
  const tensors = {};
  let off = 0;
  for (const [name, dtype, shape, a] of blobs) { tensors[name] = { dtype, shape, offset: off }; off += Math.ceil(a.byteLength / 8) * 8; }
  const head = Buffer.from(JSON.stringify({ config, tensors }));
  const start = Math.ceil((8 + head.length) / 8) * 8;
  const out = Buffer.alloc(start + off);
  out.write('TSJ1', 0, 'latin1');
  out.writeUInt32LE(head.length, 4);
  head.copy(out, 8);
  for (const [name, , , a] of blobs) Buffer.from(a.buffer, a.byteOffset, a.byteLength).copy(out, start + tensors[name].offset);
  return out;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2);
  const opt = (k, d) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
  const [ckpt, outDir] = args;
  if (!ckpt || !outDir) { console.error('usage: export_student_js.js CKPT.safetensors OUT_DIR [--vocab-from DIR] [--heads 12] [--pos-offset 0] [--quant int8|f16]'); process.exit(2); }
  const buf = buildBundle(readSafetensors(readFileSync(ckpt)), { heads: +opt('--heads', 12), posOffset: +opt('--pos-offset', 0), quant: opt('--quant', 'int8') });
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'student.bin'), buf);
  const from = opt('--vocab-from');
  if (from) for (const f of ['vocab.json', 'labels.json']) if (existsSync(join(from, f))) copyFileSync(join(from, f), join(outDir, f));
  console.error(`student.bin: ${(buf.length / 1048576).toFixed(2)} MB -> ${outDir}`);
}
