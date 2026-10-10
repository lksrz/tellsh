// Multinomial logistic regression inference over hashed features (see scripts/train.py).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { vectorize } from './features.js';

export const DEFAULT_MODEL = fileURLToPath(new URL('../model/model.bin', import.meta.url));

export function loadModel(path = DEFAULT_MODEL) {
  const buf = readFileSync(path);
  if (buf.toString('latin1', 0, 4) !== 'TSH1') throw new Error(`bad model file: ${path}`);
  const hlen = buf.readUInt32LE(4);
  const header = JSON.parse(buf.toString('utf8', 8, 8 + hlen));
  const { rows, classes, dim } = header;
  // copy into an aligned ArrayBuffer so typed-array views are always valid
  const ab = buf.buffer.slice(buf.byteOffset + 8 + hlen, buf.byteOffset + buf.length);
  let off = 0;
  const rowIds = new Uint32Array(ab, off, rows); off += rows * 4;
  const scale = new Float32Array(ab, off, classes); off += classes * 4;
  const bias = new Float32Array(ab, off, classes); off += classes * 4;
  const weights = new Int8Array(ab, off, rows * classes);
  const rowOf = new Map();
  for (let i = 0; i < rows; i++) rowOf.set(rowIds[i], i);
  return { ...header, rowOf, scale, bias, weights };
}

let cached = null;
export function getModel() {
  if (!cached) cached = loadModel();
  return cached;
}

// Returns probabilities for all classes (Float64Array, same order as model.labels).
export function predictProba(text, model = getModel()) {
  const { classes, dim, rowOf, weights, scale, bias } = model;
  const acc = new Float64Array(classes);
  for (const [idx, val] of vectorize(text, dim)) {
    const r = rowOf.get(idx);
    if (r === undefined) continue;
    const base = r * classes;
    for (let c = 0; c < classes; c++) acc[c] += val * weights[base + c];
  }
  let max = -Infinity;
  for (let c = 0; c < classes; c++) {
    acc[c] = acc[c] * scale[c] + bias[c];
    if (acc[c] > max) max = acc[c];
  }
  let sum = 0;
  for (let c = 0; c < classes; c++) { acc[c] = Math.exp(acc[c] - max); sum += acc[c]; }
  for (let c = 0; c < classes; c++) acc[c] /= sum;
  return acc;
}

// -> { intent, confidence, confident, top: [{intent, p}] }
export function classify(text, { top = 3, model = getModel(), threshold } = {}) {
  const p = predictProba(text, model);
  const order = Array.from(p.keys()).sort((a, b) => p[b] - p[a]).slice(0, Math.max(top, 1));
  const best = order[0];
  const thr = threshold ?? model.threshold;
  return {
    intent: model.labels[best],
    confidence: p[best],
    confident: p[best] >= thr,
    threshold: thr,
    top: order.map((i) => ({ intent: model.labels[i], p: p[i] })),
  };
}
