// Pure-JS runtime of the distilled student (no onnxruntime): a 3-layer BERT-style encoder (pruned multilingual-e5-small)
// read from student.bin (scripts/hybrid/export_student_js.js: int8 per-row weights + f32 rest), mean pooling -> tool /
// intent heads, per-token tag head (lazy). Same infer() interface as Encoder (src/rerank/encoder.js). Transformer weights
// are dequantized to Float32 once at load into one arena; the matmuls run in a WebAssembly SIMD kernel
// (src/rerank/wasm-linear.js, plain-JS fallback); the 27k-row word embedding stays int8, only looked-up rows dequantized.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { UnigramTokenizer } from './tokenizer.js';
import { decodeSpans } from './encoder.js';
import { wasmLinear } from './wasm-linear.js';

const SIZE = { i8: 1, f16: 2, f32: 4 };
const int = (v, lo, hi) => Number.isInteger(v) && v >= lo && v <= hi;

/** student.bin buffer -> {config, get(name) -> typed array view}. The header is untrusted: the config must be in
 *  sane bounds and every tensor the model reads must have its expected dtype and shape and lie inside the file;
 *  anything else throws (loadStudent -> null) before any allocation that depends on it. */
export function parseBundle(buf) {
  if (buf.length < 8 || buf.toString('latin1', 0, 4) !== 'TSJ1') throw new Error('not a student.bin bundle');
  const n = buf.readUInt32LE(4);
  if (8 + n > buf.length) throw new Error('student.bin: truncated header');
  const { config: c, tensors } = JSON.parse(buf.toString('utf8', 8, 8 + n));
  const bad = (what) => { throw new Error(`student.bin: bad ${what}`); };
  if (!c || !tensors || typeof tensors !== 'object') bad('header');
  if (!int(c.layers, 1, 24) || !int(c.hidden, 1, 2048) || !int(c.heads, 1, 64) || c.hidden % c.heads || !int(c.inter, 1, 8192)
    || !int(c.vocab, 1, 500000) || !int(c.posOffset, 0, 8) || !(c.eps > 0 && c.eps < 1)) bad('config');
  const start = Math.ceil((8 + n) / 8) * 8;
  const bytes = Math.max(0, buf.length - start);
  for (const [k, t] of Object.entries(tensors)) {
    if (!t || !SIZE[t.dtype] || !Array.isArray(t.shape) || !t.shape.length || t.shape.length > 2 || !t.shape.every((d) => int(d, 1, 1 << 24))) bad(`tensor ${k}`);
    const len = t.shape.reduce((x, y) => x * y, 1);
    if (!int(t.offset, 0, bytes) || t.offset % SIZE[t.dtype] || t.offset + len * SIZE[t.dtype] > bytes) bad(`tensor ${k} (outside the file)`);
  }
  // expected tensors: name -> [shape, allowed dtypes]
  const { hidden: H, inter: I, vocab: V } = c;
  const want = (name, shape, dtypes = ['f32']) => {
    const t = tensors[name];
    if (!t || !dtypes.includes(t.dtype) || t.shape.length !== shape.length || t.shape.some((d, j) => shape[j] !== undefined && d !== shape[j])) bad(`tensor ${name}`);
    return t.shape;
  };
  const weight = (name, rows, cols, dtypes = ['i8', 'f16']) => {
    if (want(`${name}.weight`, [rows, cols], dtypes) && tensors[`${name}.weight`].dtype === 'i8') want(`${name}.weight.scale`, [rows]);
    want(`${name}.bias`, [rows]);
  };
  const ln = (name) => { want(`${name}.weight`, [H]); want(`${name}.bias`, [H]); };
  want('embeddings.word_embeddings.weight', [V, H], ['i8']); want('embeddings.word_embeddings.weight.scale', [V]);
  const [P] = want('embeddings.position_embeddings.weight', [undefined, H]);
  if (P <= c.posOffset || P > 4096) bad('position embeddings');
  want('embeddings.token_type_embeddings.weight', [undefined, H]);
  ln('embeddings.LayerNorm');
  for (let l = 0; l < c.layers; l++) {
    const p = `encoder.layer.${l}`;
    for (const k of ['attention.self.query', 'attention.self.key', 'attention.self.value', 'attention.output.dense']) weight(`${p}.${k}`, H, H);
    weight(`${p}.intermediate.dense`, I, H); weight(`${p}.output.dense`, H, I);
    ln(`${p}.attention.output.LayerNorm`); ln(`${p}.output.LayerNorm`);
  }
  for (const h of ['tool', 'intent', 'tag']) { const [O] = want(`${h}.weight`, [undefined, H]); want(`${h}.bias`, [O]); }
  // copy into an 8-aligned ArrayBuffer once (a Buffer from readFileSync may be unaligned)
  const ab = new ArrayBuffer(bytes);
  new Uint8Array(ab).set(buf.subarray(start));
  const get = (name) => {
    const t = tensors[name];
    if (!t) throw new Error(`student.bin: missing ${name}`);
    const len = t.shape.reduce((x, y) => x * y, 1);
    return t.dtype === 'i8' ? new Int8Array(ab, t.offset, len) : t.dtype === 'f16' ? new Uint16Array(ab, t.offset, len) : new Float32Array(ab, t.offset, len);
  };
  return { config: c, tensors, get };
}

/** IEEE half (Uint16Array) -> Float32Array */
export function fromF16(h) {
  const out = new Float32Array(h.length);
  for (let i = 0; i < h.length; i++) {
    const x = h[i]; const s = x & 0x8000 ? -1 : 1; const e = (x >> 10) & 0x1f; const m = x & 0x3ff;
    out[i] = e === 0 ? s * m * 2 ** -24 : e === 31 ? (m ? NaN : s * Infinity) : s * (1 + m / 1024) * 2 ** (e - 15);
  }
  return out;
}

/** erf, Abramowitz-Stegun 7.1.26 refined (|err| < 1.2e-7): exact GELU as in HF BERT ('gelu') */
function erf(x) {
  const s = x < 0 ? -1 : 1; const a = Math.abs(x);
  const t = 1 / (1 + 0.5 * a);
  const y = 1 - t * Math.exp(-a * a - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
  return s * y;
}

/** out[n,O] = x[n,K] W[O,K]^T + b; blocks of 4 outputs x 2 rows share loads (~2.5x a plain dot loop in V8) */
export function linear(x, n, K, W, b, O, out) {
  let o = 0;
  for (; o + 3 < O; o += 4) {
    const w0 = o * K, w1 = w0 + K, w2 = w1 + K, w3 = w2 + K;
    const b0 = b[o], b1 = b[o + 1], b2 = b[o + 2], b3 = b[o + 3];
    let i = 0;
    for (; i + 1 < n; i += 2) {
      const xa = i * K, xb = xa + K;
      let a0 = 0, a1 = 0, a2 = 0, a3 = 0, c0 = 0, c1 = 0, c2 = 0, c3 = 0;
      for (let k = 0; k < K; k++) {
        const u = x[xa + k], v = x[xb + k], p0 = W[w0 + k], p1 = W[w1 + k], p2 = W[w2 + k], p3 = W[w3 + k];
        a0 += u * p0; a1 += u * p1; a2 += u * p2; a3 += u * p3; c0 += v * p0; c1 += v * p1; c2 += v * p2; c3 += v * p3;
      }
      let r = i * O + o;
      out[r] = a0 + b0; out[r + 1] = a1 + b1; out[r + 2] = a2 + b2; out[r + 3] = a3 + b3;
      r += O;
      out[r] = c0 + b0; out[r + 1] = c1 + b1; out[r + 2] = c2 + b2; out[r + 3] = c3 + b3;
    }
    for (; i < n; i++) {
      const xa = i * K;
      let a0 = 0, a1 = 0, a2 = 0, a3 = 0;
      for (let k = 0; k < K; k++) { const u = x[xa + k]; a0 += u * W[w0 + k]; a1 += u * W[w1 + k]; a2 += u * W[w2 + k]; a3 += u * W[w3 + k]; }
      const r = i * O + o;
      out[r] = a0 + b0; out[r + 1] = a1 + b1; out[r + 2] = a2 + b2; out[r + 3] = a3 + b3;
    }
  }
  for (; o < O; o++) {
    const wo = o * K;
    for (let i = 0; i < n; i++) { const xa = i * K; let a = 0; for (let k = 0; k < K; k++) a += x[xa + k] * W[wo + k]; out[i * O + o] = a + b[o]; }
  }
}

/** in place: x[i] = LN(x[i] + r[i]) * g + b per row (r may be null) */
export function addNorm(x, r, n, H, g, b, eps) {
  for (let i = 0; i < n; i++) {
    const o = i * H;
    let m = 0;
    for (let k = 0; k < H; k++) { const v = r ? x[o + k] + r[o + k] : x[o + k]; x[o + k] = v; m += v; }
    m /= H;
    let s = 0;
    for (let k = 0; k < H; k++) { const d = x[o + k] - m; s += d * d; }
    const inv = 1 / Math.sqrt(s / H + eps);
    for (let k = 0; k < H; k++) x[o + k] = (x[o + k] - m) * inv * g[k] + b[k];
  }
}

/** multi-head self-attention over all n tokens (no padding): ctx = softmax(q k^T / sqrt(dh)) v per head */
export function attend(q, k, v, ctx, p, n, H, NH) {
  const dh = H / NH; const sc = 1 / Math.sqrt(dh);
  for (let hd = 0; hd < NH; hd++) {
    const ho = hd * dh;
    for (let i = 0; i < n; i++) {
      const qi = i * H + ho;
      let m = -Infinity;
      for (let j = 0; j < n; j++) {
        const kj = j * H + ho;
        let a = 0;
        for (let d = 0; d < dh; d++) a += q[qi + d] * k[kj + d];
        a *= sc; p[j] = a; if (a > m) m = a;
      }
      let s = 0;
      for (let j = 0; j < n; j++) { p[j] = Math.exp(p[j] - m); s += p[j]; }
      for (let d = 0; d < dh; d++) ctx[qi + d] = 0;
      for (let j = 0; j < n; j++) {
        const w = p[j] / s; const vj = j * H + ho;
        for (let d = 0; d < dh; d++) ctx[qi + d] += w * v[vj + d];
      }
    }
  }
}

/** in place exact GELU */
function gelu(h, len) { for (let j = 0; j < len; j++) { const z = h[j]; h[j] = 0.5 * z * (1 + erf(z * Math.SQRT1_2)); } }

const softmax = (z) => { let m = -Infinity; for (const v of z) if (v > m) m = v; let s = 0; const e = Array.from(z, (v) => { const x = Math.exp(v - m); s += x; return x; }); return e.map((v) => v / s); };

export class StudentModel {
  /** bundle: parseBundle() result; wasm: false forces the plain-JS matmul (the default uses the SIMD kernel if available) */
  constructor(bundle, { wasm = true } = {}) {
    const { config: c, get } = bundle;
    this.c = c;
    const { hidden: H, inter: I } = c;
    // one arena (the WebAssembly memory when the SIMD kernel is used) holds the transformer weights and activations
    const names = [];
    for (let l = 0; l < c.layers; l++) for (const p of ['attention.self.query', 'attention.self.key', 'attention.self.value', 'attention.output.dense', 'intermediate.dense', 'output.dense']) names.push(`encoder.layer.${l}.${p}`);
    this.nMax = get('embeddings.position_embeddings.weight').length / H - c.posOffset;
    const floats = names.reduce((a, p) => a + get(`${p}.weight`).length + get(`${p}.bias`).length, 0) + this.nMax * (6 * H + I) + this.nMax + (H * I) / 4 + I + 8; // + int8 staging for deq
    const kern = wasm && H % 4 === 0 && I % 4 === 0 && H % 2 === 0 ? wasmLinear(floats * 4) : null;
    const buffer = kern ? kern.buffer : new ArrayBuffer(floats * 4);
    this.runtime = kern ? 'wasm-simd' : 'js';
    this.mm = kern ? kern.linear : linear;
    this.att = kern && (H / c.heads) % 4 === 0 ? kern.attend : attend;
    let off = 0;
    const take = (len) => { const v = new Float32Array(buffer, off, len); off += len * 4; return v; };
    const stageQ = new Int8Array(buffer, take(Math.ceil((H * I) / 4)).byteOffset, H * I); const stageS = take(I);
    const lin = (p) => {
      const q = get(`${p}.weight`); const W = take(q.length);
      if (q instanceof Uint16Array) W.set(fromF16(q));
      else if (kern && q.length / get(`${p}.weight.scale`).length % 4 === 0) {
        const sc = get(`${p}.weight.scale`);
        stageQ.set(q); stageS.set(sc);
        kern.deq(stageQ, stageS, sc.length, q.length / sc.length, W);
      } else { const s = get(`${p}.weight.scale`); const cols = q.length / s.length; for (let r = 0; r < s.length; r++) { const f = s[r]; for (let j = r * cols, e = j + cols; j < e; j++) W[j] = q[j] * f; } }
      const b = take(get(`${p}.bias`).length); b.set(get(`${p}.bias`));
      return { W, b };
    };
    const ln = (p) => ({ g: get(`${p}.weight`), b: get(`${p}.bias`) });
    this.emb = { q: get('embeddings.word_embeddings.weight'), s: get('embeddings.word_embeddings.weight.scale'), pos: get('embeddings.position_embeddings.weight'), type: get('embeddings.token_type_embeddings.weight'), ln: ln('embeddings.LayerNorm') };
    this.layers = [];
    for (let l = 0; l < c.layers; l++) {
      const p = `encoder.layer.${l}`;
      this.layers.push({ q: lin(`${p}.attention.self.query`), k: lin(`${p}.attention.self.key`), v: lin(`${p}.attention.self.value`), o: lin(`${p}.attention.output.dense`), ln1: ln(`${p}.attention.output.LayerNorm`), i: lin(`${p}.intermediate.dense`), out: lin(`${p}.output.dense`), ln2: ln(`${p}.output.LayerNorm`) });
    }
    const N = this.nMax;
    this.buf = { x: take(N * H), q: take(N * H), k: take(N * H), v: take(N * H), ctx: take(N * H), t: take(N * H), h: take(N * I), p: take(N) };
    const head = (p) => ({ W: get(`${p}.weight`), b: get(`${p}.bias`), O: get(`${p}.bias`).length });
    this.heads = { tool: head('tool'), intent: head('intent'), tag: head('tag') };
  }

  /** ids -> {tool, intent: Float32Array logits, tags(i) -> logits of token i} (attention over all ids, no padding) */
  forward(ids) {
    const n = ids.length;
    const { hidden: H, heads: NH, inter: I, eps, posOffset } = this.c;
    if (n > this.nMax) throw new Error(`student: ${n} tokens > ${this.nMax}`);
    const mm = this.mm;
    const { x, q, k, v, ctx, t, h, p } = this.buf;
    const E = this.emb;
    for (let i = 0; i < n; i++) {
      const r = ids[i] * H; const s = E.s[ids[i]]; const po = (i + posOffset) * H; const o = i * H;
      for (let j = 0; j < H; j++) x[o + j] = E.q[r + j] * s + E.pos[po + j] + E.type[j];
    }
    addNorm(x, null, n, H, E.ln.g, E.ln.b, eps);
    for (const L of this.layers) {
      mm(x, n, H, L.q.W, L.q.b, H, q);
      mm(x, n, H, L.k.W, L.k.b, H, k);
      mm(x, n, H, L.v.W, L.v.b, H, v);
      this.att(q, k, v, ctx, p, n, H, NH);
      mm(ctx, n, H, L.o.W, L.o.b, H, t);
      addNorm(x, t, n, H, L.ln1.g, L.ln1.b, eps);
      mm(x, n, H, L.i.W, L.i.b, I, h);
      gelu(h, n * I);
      mm(h, n, I, L.out.W, L.out.b, H, t);
      addNorm(x, t, n, H, L.ln2.g, L.ln2.b, eps);
    }
    const pooled = new Float32Array(H);
    for (let i = 0; i < n; i++) for (let j = 0; j < H; j++) pooled[j] += x[i * H + j];
    for (let j = 0; j < H; j++) pooled[j] /= n;
    const run = (hd, src, off = 0) => { const o = new Float32Array(hd.O); linear(src.subarray(off, off + H), 1, H, hd.W, hd.b, hd.O, o); return o; };
    const { tool, intent, tag } = this.heads;
    // the tag head runs lazily (A+S never asks for it) on a copy of the token states (x is reused by the next forward)
    let xs = null;
    return { tool: run(tool, pooled), intent: run(intent, pooled), states: () => (xs ??= x.slice(0, n * H)), tags: (i, src = x) => run(tag, src, i * H) };
  }
}

/** Encoder-compatible wrapper: tokenizer + labels + per-process result cache */
export class StudentJS {
  static load(dir) {
    const t0 = performance.now();
    const model = new StudentModel(parseBundle(readFileSync(join(dir, 'student.bin'))));
    const v = JSON.parse(readFileSync(join(dir, 'vocab.json'), 'utf8'));
    const labels = JSON.parse(readFileSync(join(dir, 'labels.json'), 'utf8'));
    const tok = new UnigramTokenizer({ vocab: v.pieces.map((p, i) => [p, v.scores[i]]), unkId: v.unk });
    const s = new StudentJS(model, tok, labels, dir);
    s.loadMs = performance.now() - t0;
    return s;
  }

  constructor(model, tok, labels, dir) {
    Object.assign(this, { model, tok, labels, dir, runtime: 'js', kernel: model.runtime });
    this.T = labels.tagLabels;
    this.cache = new Map();
  }

  /** -> { tools: {tool: p}, intents: {intent: p}, topIntent, topTool, pNone, tagger(text, tool) -> {spans} } */
  async infer(text, env = {}) {
    const key = `${env.shell}|${env.os}|${text}`;
    if (this.cache.has(key)) return this.cache.get(key);
    const ctx = this.labels.context.replace('{shell}', env.shell || 'bash').replace('{os}', env.os || 'linux');
    const enc = this.tok.encodePair(text, ctx, this.labels.maxLen);
    const out = this.model.forward(enc.ids);
    const pt = softmax(out.tool);
    const pi = softmax(out.intent);
    const tools = Object.fromEntries(this.labels.tools.map((t, i) => [t, pt[i]]));
    const intents = Object.fromEntries(this.labels.intents.map((t, i) => [t, pi[i]]));
    const xs = out.states();
    let tagLogits = null;
    const res = {
      tools, intents,
      topTool: this.labels.tools[pt.indexOf(Math.max(...pt))],
      topIntent: this.labels.intents[pi.indexOf(Math.max(...pi))],
      pNone: tools.__none__ ?? 0,
      tagger: (t, tool) => ({ spans: decodeSpans(t, enc.tokens, (tagLogits ??= Array.from({ length: enc.nA }, (_, j) => Array.from(out.tags(j + 1, xs)))), this.T, tool) }),
    };
    if (this.cache.size > 256) this.cache.clear();
    this.cache.set(key, res);
    return res;
  }
}
