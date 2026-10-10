// Model file (TSH2): several sparse int8 linear models in one binary, written by scripts/train.py.
//   'TSH2' | u32 header length | JSON header | per model: u32 rowIds[rows] f32 scale[C] f32 bias[C] i8 W[rows*C] (pad 4)
// Rows are sorted hash indices; lookup is a binary search, so loading needs no Map construction.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const DEFAULT_MODEL = fileURLToPath(new URL('../model/model.bin', import.meta.url));

export function loadModel(path = DEFAULT_MODEL) {
  return parseModel(readFileSync(path), path);
}

/** Parse a TSH2 buffer; every size and offset is checked so a truncated/corrupt file gives a clear error. */
export function parseModel(buf, path = '<buffer>') {
  const bad = (why) => new Error(`bad model file ${path}: ${why}`);
  if (buf.length < 8 || buf.toString('latin1', 0, 4) !== 'TSH2') throw bad('expected TSH2 magic');
  const hlen = buf.readUInt32LE(4);
  if (hlen === 0 || 8 + hlen > buf.length) throw bad(`header length ${hlen} exceeds the file size ${buf.length}`);
  let header;
  try { header = JSON.parse(buf.toString('utf8', 8, 8 + hlen)); } catch (e) { throw bad(`header is not valid JSON (${e.message})`); }
  if (!header || typeof header.models !== 'object' || header.models === null) throw bad('header has no models');
  // copy into a fresh, 4-byte aligned ArrayBuffer so typed-array views are always valid
  const ab = new Uint8Array(buf.subarray(8 + hlen)).buffer;
  const isCount = (n) => Number.isSafeInteger(n) && n >= 0;
  const models = {};
  for (const [name, m] of Object.entries(header.models)) {
    if (!m || !Array.isArray(m.labels) || !m.labels.length) throw bad(`model ${name}: missing labels`);
    if (!isCount(m.rows) || !isCount(m.offset) || m.offset % 4) throw bad(`model ${name}: invalid rows/offset`);
    const C = m.labels.length;
    const need = m.rows * 4 + C * 8 + m.rows * C;
    if (m.offset + need > ab.byteLength) throw bad(`model ${name}: data (${need} bytes at offset ${m.offset}) exceeds the file`);
    let off = m.offset;
    const rowIds = new Uint32Array(ab, off, m.rows); off += m.rows * 4;
    const scale = new Float32Array(ab, off, C); off += C * 4;
    const bias = new Float32Array(ab, off, C); off += C * 4;
    const weights = new Int8Array(ab, off, m.rows * C);
    models[name] = { name, labels: m.labels, classes: C, rowIds, scale, bias, weights };
  }
  return { ...header, models, size: buf.length };
}

let cached = null;
export function getModel() {
  if (!cached) cached = loadModel();
  return cached;
}

function findRow(rowIds, idx) {
  let lo = 0;
  let hi = rowIds.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const v = rowIds[mid];
    if (v === idx) return mid;
    if (v < idx) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}

/** Raw scores (logits) for a sparse input: iterable of [index, value] pairs, or of bare indices (value 1). */
export function logits(m, feats) {
  const { classes: C, rowIds, weights, scale, bias } = m;
  const acc = new Float64Array(C);
  for (const f of feats) {
    const idx = typeof f === 'number' ? f : f[0];
    const val = typeof f === 'number' ? 1 : f[1];
    const r = findRow(rowIds, idx);
    if (r < 0) continue;
    const base = r * C;
    for (let c = 0; c < C; c++) acc[c] += val * weights[base + c];
  }
  for (let c = 0; c < C; c++) acc[c] = acc[c] * scale[c] + bias[c];
  return acc;
}

export function softmax(z) {
  let max = -Infinity;
  for (const v of z) if (v > max) max = v;
  const out = new Float64Array(z.length);
  let sum = 0;
  for (let i = 0; i < z.length; i++) { out[i] = Math.exp(z[i] - max); sum += out[i]; }
  for (let i = 0; i < z.length; i++) out[i] /= sum;
  return out;
}

export const predictProba = (m, feats) => softmax(logits(m, feats));
