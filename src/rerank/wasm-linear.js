// WebAssembly SIMD (f32x4) kernels for the student, over one shared memory: linear (out[n,O] = x[n,K] W[O,K]^T + b, f32,
// K a multiple of 4, O even) deq (int8 rows x per-row scale -> f32, cols a multiple of 4) and attend
// (multi-head self-attention, head size a multiple of 4). The module is assembled
// here from opcodes (well under 1 KB, no toolchain); null when WebAssembly SIMD is unavailable.

const leb = (v) => { const o = []; do { let b = v & 0x7f; v >>>= 7; if (v) b |= 0x80; o.push(b); } while (v); return o; };
const sleb = (v) => { const o = []; for (;;) { const b = v & 0x7f; v >>= 7; if ((v === 0 && !(b & 0x40)) || (v === -1 && (b & 0x40))) { o.push(b); return o; } o.push(b | 0x80); } };
const str = (s) => [s.length, ...Buffer.from(s)];
const sec = (id, body) => [id, ...leb(body.length), ...body];

// opcodes
const get = (l) => [0x20, l], set = (l) => [0x21, l], c = (v) => [0x41, ...sleb(v)];
const ADD = 0x6a, MUL = 0x6c, SHL = 0x74, LT = 0x48, EQZ = 0x45, FADD = 0x92;
const LOOP = [0x03, 0x40], BLOCK = [0x02, 0x40], IF = [0x04, 0x40], END = 0x0b, BR = (d) => [0x0c, d], BR_IF = (d) => [0x0d, d];
const V_LOAD = [0xfd, 0x00, 0x00, 0x00], V_ZERO = [0xfd, 0x0c, ...new Array(16).fill(0)], F4ADD = [0xfd, 0xe4, 0x01], F4MUL = [0xfd, 0xe6, 0x01];
const lane = (l) => [0xfd, 0x1f, l];
const F_LOAD = [0x2a, 0x02, 0x00], F_STORE = [0x38, 0x02, 0x00];

// params: 0 x, 1 n, 2 K, 3 W, 4 b, 5 O, 6 out (byte offsets / counts); i32 locals: 7 o, 8 i, 9 k, 10 kb (= 4K), 11 xa,
// 12 xb, 13 wa, 14 wb; f32: 15 ba, 16 bb (biases); v128: 17 xva, 18 xvb, 19 wva, 20 wvb, 21-24 accumulators
// Blocks of 2 outputs x 2 input rows (O even), then the odd last row: 4 loads feed 4 multiply-adds.
const [x, n, , W, b, O, out, o, i, k, kb, xa, xb, wa, wb, ba, bb, xva, xvb, wva, wvb, a00, a01, a10, a11] = Array.from({ length: 25 }, (_, j) => j);
const hsum = (a, bias) => [...get(a), ...lane(0), ...get(a), ...lane(1), FADD, ...get(a), ...lane(2), FADD, ...get(a), ...lane(3), FADD, ...get(bias), FADD];
// out[row, o + d] = hsum(acc) + bias
const store = (row, d, a, bias) => [...get(out), ...row, ...get(O), MUL, ...get(o), ADD, ...c(d), ADD, ...c(2), SHL, ADD, ...hsum(a, bias), ...F_STORE];
// acc[r][w] += x_r[k..k+3] * W_w[k..k+3] over k; xs: [[xptr, xvec]], ws: [[wptr, wvec]], accs[r][w]
const dot = (xs, ws, accs) => [
  ...accs.flat().flatMap((a) => [...V_ZERO, ...set(a)]), ...c(0), ...set(k),
  ...LOOP,
  ...[...xs, ...ws].flatMap(([p, vec]) => [...get(p), ...get(k), ADD, ...V_LOAD, ...set(vec)]),
  ...xs.flatMap(([, xv], r) => ws.flatMap(([, wv], q) => [...get(accs[r][q]), ...get(xv), ...get(wv), ...F4MUL, ...F4ADD, ...set(accs[r][q])])),
  ...get(k), ...c(16), ADD, ...set(k), ...get(k), ...get(kb), LT, ...BR_IF(0), END,
];
const ROW1 = [...get(i), ...c(1), ADD];
const code = [
  ...get(2), ...c(2), SHL, ...set(kb), ...c(0), ...set(o),
  ...LOOP,
  ...get(W), ...get(o), ...get(kb), MUL, ADD, ...set(wa), ...get(wa), ...get(kb), ADD, ...set(wb),
  ...get(b), ...get(o), ...c(2), SHL, ADD, ...F_LOAD, ...set(ba),
  ...get(b), ...get(o), ...c(2), SHL, ADD, ...c(4), ADD, ...F_LOAD, ...set(bb),
  ...c(0), ...set(i),
  ...BLOCK, ...LOOP, // pairs of rows
  ...ROW1, ...get(n), LT, EQZ, ...BR_IF(1),
  ...get(x), ...get(i), ...get(kb), MUL, ADD, ...set(xa), ...get(xa), ...get(kb), ADD, ...set(xb),
  ...dot([[xa, xva], [xb, xvb]], [[wa, wva], [wb, wvb]], [[a00, a01], [a10, a11]]),
  ...store(get(i), 0, a00, ba), ...store(get(i), 1, a01, bb), ...store(ROW1, 0, a10, ba), ...store(ROW1, 1, a11, bb),
  ...get(i), ...c(2), ADD, ...set(i), ...BR(0), END, END,
  ...get(i), ...get(n), LT, ...IF, // odd last row
  ...get(x), ...get(i), ...get(kb), MUL, ADD, ...set(xa),
  ...dot([[xa, xva]], [[wa, wva], [wb, wvb]], [[a00, a01]]), ...store(get(i), 0, a00, ba), ...store(get(i), 1, a01, bb), END,
  ...get(o), ...c(2), ADD, ...set(o), ...get(o), ...get(O), LT, ...BR_IF(0), END,
  END,
];
const body = [0x03, 0x08, 0x7f, 0x02, 0x7d, 0x08, 0x7b, ...code];

// deq params: 0 src (int8), 1 scales (f32), 2 rows, 3 cols, 4 dst (f32); locals: 5 r, 6 end (i32), 7 sv (v128)
const LOAD32_ZERO = [0xfd, 0x5c, 0x00, 0x00], EXT8 = [0xfd, 0x87, 0x01], EXT16 = [0xfd, 0xa7, 0x01], CVT = [0xfd, 0xfa, 0x01];
const SPLAT = [0xfd, 0x13], V_STORE = [0xfd, 0x0b, 0x00, 0x00];
const deqCode = [
  ...c(0), ...set(5),
  ...LOOP,
  ...get(1), ...get(5), ...c(2), SHL, ADD, ...F_LOAD, ...SPLAT, ...set(7),
  ...get(0), ...get(3), ADD, ...set(6),
  ...LOOP,
  ...get(4), ...get(0), ...LOAD32_ZERO, ...EXT8, ...EXT16, ...CVT, ...get(7), ...F4MUL, ...V_STORE,
  ...get(0), ...c(4), ADD, ...set(0), ...get(4), ...c(16), ADD, ...set(4),
  ...get(0), ...get(6), LT, ...BR_IF(0), END,
  ...get(5), ...c(1), ADD, ...set(5), ...get(5), ...get(2), LT, ...BR_IF(0), END,
  END,
];
const deqBody = [0x02, 0x02, 0x7f, 0x01, 0x7b, ...deqCode];
// attend params: 0 q, 1 k, 2 v, 3 ctx, 4 p, 5 n, 6 H, 7 NH (i32), 8 sc (f32); i32 locals: 9 hd, 10 i, 11 j, 12 d, 13 hb
// (= 4H), 14 dhb (= 4 dh), 15 row, 16 col; f32: 17 m, 18 s, 19 a; v128: 20 acc, 21 wv. Per head and query row:
// scores = q_i . k_j * sc, softmax (exp imported from JS), ctx_i = sum_j p_j v_j. dh a multiple of 4.
const FSUB = 0x93, FMUL = 0x94, FDIV = 0x95, FMAX = 0x97, DIVU = 0x6e, NEG_INF = [0x43, 0x00, 0x00, 0x80, 0xff], F0 = [0x43, 0, 0, 0, 0];
const at = (base, r, dst) => [...get(base), ...get(r), ...get(13), MUL, ADD, ...get(9), ...get(14), MUL, ADD, ...set(dst)];
const pj = [...get(4), ...get(11), ...c(2), SHL, ADD];
const loopTo = (v, lim, step, inner) => [...c(0), ...set(v), ...LOOP, ...inner, ...get(v), ...c(step), ADD, ...set(v), ...get(v), ...get(lim), LT, ...BR_IF(0), END];
const attCode = [
  ...get(6), ...c(2), SHL, ...set(13), ...get(6), ...get(7), DIVU, ...c(2), SHL, ...set(14),
  ...loopTo(9, 7, 1, loopTo(10, 5, 1, [
    ...at(0, 10, 15), ...NEG_INF, ...set(17),
    ...loopTo(11, 5, 1, [
      ...at(1, 11, 16), ...V_ZERO, ...set(20),
      ...loopTo(12, 14, 16, [...get(20), ...get(15), ...get(12), ADD, ...V_LOAD, ...get(16), ...get(12), ADD, ...V_LOAD, ...F4MUL, ...F4ADD, ...set(20)]),
      ...get(20), ...lane(0), ...get(20), ...lane(1), FADD, ...get(20), ...lane(2), FADD, ...get(20), ...lane(3), FADD, ...get(8), FMUL, ...set(19),
      ...pj, ...get(19), ...F_STORE, ...get(17), ...get(19), FMAX, ...set(17),
    ]),
    ...F0, ...set(18),
    ...loopTo(11, 5, 1, [...pj, ...pj, ...F_LOAD, ...get(17), FSUB, 0x10, 0x00, ...set(19), ...get(19), ...F_STORE, ...get(18), ...get(19), FADD, ...set(18)]),
    ...at(3, 10, 15),
    ...loopTo(12, 14, 16, [...get(15), ...get(12), ADD, ...V_ZERO, ...V_STORE]),
    ...loopTo(11, 5, 1, [
      ...pj, ...F_LOAD, ...get(18), FDIV, ...SPLAT, ...set(21), ...at(2, 11, 16),
      ...loopTo(12, 14, 16, [...get(15), ...get(12), ADD, ...get(15), ...get(12), ADD, ...V_LOAD, ...get(16), ...get(12), ADD, ...V_LOAD, ...get(21), ...F4MUL, ...F4ADD, ...V_STORE]),
    ]),
  ])),
  END,
];
const attBody = [0x03, 0x08, 0x7f, 0x03, 0x7d, 0x02, 0x7b, ...attCode];
// function index 0 is the imported exp: linear = 1, deq = 2, attend = 3
export const BYTES = new Uint8Array([0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00,
  ...sec(1, [0x04, 0x60, 0x07, ...new Array(7).fill(0x7f), 0x00, 0x60, 0x05, ...new Array(5).fill(0x7f), 0x00,
    0x60, 0x09, ...new Array(8).fill(0x7f), 0x7d, 0x00, 0x60, 0x01, 0x7d, 0x01, 0x7d]),
  ...sec(2, [0x02, ...str('env'), ...str('mem'), 0x02, 0x00, 0x01, ...str('env'), ...str('exp'), 0x00, 0x03]),
  ...sec(3, [0x03, 0x00, 0x01, 0x02]),
  ...sec(7, [0x03, ...str('linear'), 0x00, 0x01, ...str('deq'), 0x00, 0x02, ...str('attend'), 0x00, 0x03]),
  ...sec(10, [0x03, ...leb(body.length), ...body, ...leb(deqBody.length), ...deqBody, ...leb(attBody.length), ...attBody]),
]);

/** -> {buffer, linear(x, n, K, W, b, O, out), deq(q, scale, rows, cols, dst), attend(q, k, v, ctx, p, n, H, NH)} over typed-array views of `buffer`
 *  (bytes >= what the caller places in it), or null */
export function wasmLinear(bytes) {
  try {
    if (typeof WebAssembly !== 'object' || !WebAssembly.validate(BYTES)) return null;
    const mem = new WebAssembly.Memory({ initial: Math.ceil(bytes / 65536) });
    const e = new WebAssembly.Instance(new WebAssembly.Module(BYTES), { env: { mem, exp: Math.exp } }).exports;
    return {
      buffer: mem.buffer,
      linear: (xv, nn, K, Wv, bv, OO, ov) => e.linear(xv.byteOffset, nn, K, Wv.byteOffset, bv.byteOffset, OO, ov.byteOffset),
      deq: (q, sv, rows, cols, dv) => e.deq(q.byteOffset, sv.byteOffset, rows, cols, dv.byteOffset),
      attend: (q, k, v, ctx, p, nn, H, NH) => e.attend(q.byteOffset, k.byteOffset, v.byteOffset, ctx.byteOffset, p.byteOffset, nn, H, NH, 1 / Math.sqrt(H / NH)),
    };
  } catch {
    return null;
  }
}
