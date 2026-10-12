// Hybrid policy: the linear cascade (A) answers when it is confident; otherwise a neural model re-ranks A's top-k.
//
//   A conf >= tau                      -> A (fast path, ~0.3 ms)
//   A stage 1 says __none__ (keepNone)  -> keep A's rejection
//   else  B (encoder) / C (tiny LM)    -> score_i = alpha*log pA_i + (1-alpha)*log pX_i over A's top-k candidates
//                                         answer if pX(best) >= accept and pX(__none__) < none (B only), else reject
//
// suggestHybrid() wraps pipeline.suggest(): it runs the cheap pipeline first and only computes the neural model when
// the cascade asks for help, then re-runs the pipeline with the re-ranked decision (history rules are never re-ranked).
import { suggest } from '../pipeline.js';
import { detectEnv } from '../env.js';
import { FAMILY_OF, NONE } from '../tools.js';

// calibrated on the training dev split (scripts/hybrid/eval_hybrid.js --calibrate); see HYBRID.md
export const POLICY = {
  // v0.4 (enc-v2 retrained without held-out augmented rows, recalibrated with an A_dev that excludes the dev split
  // from every training source, OOD included); with the OOD-leaking A_dev A+B had tau 0.8, alpha 0.75; the first v0.4
  // encoder had tau 0.9, alpha 0.5, none 0.3 (both); v0.3 had none: 0.5 and k: 5 for the safe variant
  'A+B': { tau: 0.9, k: 5, alpha: 0.5, accept: 0, none: 0.5, keepNone: true, tagger: 'A' },
  'A+B-safe': { tau: 0.9, k: 3, alpha: 0.5, accept: 0, none: 0.5, rescue: false, tagger: 'A' },
  // A+C: C-ft rescored for the leak-free A_dev's candidates (before: tau 0.9)
  'A+C': { tau: 0.8, k: 5, alpha: 0.75, accept: 0, keepNone: true },
  'A+C-safe': { tau: 0.8, k: 5, alpha: 0.75, accept: 0, rescue: false },
  B: { tau: Infinity, k: 0, alpha: 0, accept: 0, none: 0.3, keepNone: true, tagger: 'B' },
  // A+S: the distilled student (src/rerank/student.js) replaces A's answer when A's confidence < 0.6 (k = 0, alpha = 0:
  // the student's own argmax over the catalog intents). Safe by construction: A's rejections stay rejections (rescue:
  // false; rescuing them turned most out-of-catalog real requests into wrong answers), and a student below p 0.5 or
  // saying "not a shell request" leaves A's decision untouched (fallback). Measured end to end with
  // scripts/hybrid/eval_student_runtime.js. A+S-full adds the disagreement rule (a confident A answer is replaced when
  // the student disagrees with p >= 0.9); it needs the student on every query and is opt-in (TELLSH_HYBRID=student-full).
  'A+S': { tau: 0.6, k: 0, alpha: 0, accept: 0.5, none: 0.5, keepNone: true, rescue: false, fallback: true, tagger: 'A' },
  'A+S-full': { tau: 0.6, k: 0, alpha: 0, accept: 0.5, none: 0.5, keepNone: true, rescue: false, fallback: true, tagger: 'A', disagree: 0.9 },
  C: { tau: Infinity, k: 3, alpha: 0, accept: 0, keepNone: true },
};

const LOG = (p) => Math.log(Math.max(p, 1e-6));

/**
 * Re-rank a cascade result with model probabilities. pX: {intent: p} over (a superset of) the candidates;
 * k = 0 means "all intents pX knows" (B alone). Returns a cascade-shaped object; `confidence` is pushed above/below
 * the pipeline's accept threshold according to the policy's own accept rule.
 */
export function rerank(c, pX, P, { thr, pNone = 0 } = {}) {
  if (c.confidence >= P.tau) {
    // disagreement rule: a confident cascade answer is replaced only by a confident, different, in-catalog model answer
    if (!P.disagree || pNone >= (P.none ?? 1)) return c;
    let bi = null; let bp = -1;
    for (const [i, p] of Object.entries(pX)) if (FAMILY_OF[i] && p > bp) { bp = p; bi = i; }
    if (!bi || bi === c.intent || bp < P.disagree) return c;
    const top = [{ intent: bi, tool: FAMILY_OF[bi], p: Math.max(thr, bp), pTool: 0, pIntent: bp }, ...c.top.filter((t) => t.intent !== bi)];
    return { ...c, intent: bi, tool: FAMILY_OF[bi], confidence: Math.max(thr, bp), top, reranked: true, topTool: FAMILY_OF[bi] };
  }
  // keepNone: the cascade's stage 1 says "not a shell request" -> keep its rejection (OOD safety)
  if (P.keepNone && c.topTool === NONE && c.confidence < thr) return c;
  // safe (rescue: false): only re-rank requests A answers anyway; A's rejections stay rejections
  if (P.rescue === false && c.confidence < thr) return c;
  const pa = Object.fromEntries(c.top.map((t) => [t.intent, t.p]));
  // k = 0: every intent the model knows that this catalog also has (a model bundle may be older/newer than the catalog)
  const cands = P.k > 0 ? c.top.slice(0, P.k).map((t) => t.intent) : Object.keys(pX).filter((i) => FAMILY_OF[i]);
  let best = null;
  let bestS = -Infinity;
  for (const i of cands) {
    const s = P.alpha * LOG(pa[i] ?? 0) + (1 - P.alpha) * LOG(pX[i] ?? 0);
    if (s > bestS) { bestS = s; best = i; }
  }
  if (!best) return c;
  const px = pX[best] ?? 0;
  const ok = px >= P.accept && pNone < (P.none ?? 1);
  // fallback (A+S): an unconvinced model leaves A's own decision (answer or rejection) untouched
  if (!ok && P.fallback) return c;
  const conf = ok ? Math.max(thr, px) : Math.min(thr - 1e-6, px);
  const tool = FAMILY_OF[best];
  const top = [{ intent: best, tool, p: conf, pTool: pa[best] ?? 0, pIntent: px }, ...c.top.filter((t) => t.intent !== best)];
  // an explicit model rejection (pNone >= none, or pX below accept) stays a rejection through the whole pipeline:
  // topTool __none__ keeps the low-confidence composer from answering in its place
  if (!ok) return { ...c, intent: best, tool, confidence: conf, top, reranked: true, topTool: NONE, rejected: true };
  return { ...c, intent: best, tool, confidence: conf, top, reranked: true, topTool: tool };
}

/**
 * opts: suggest() options + { system: 'A'|'B'|'C'|'A+B'|'A+C', encoder (src/rerank/encoder.js Encoder),
 *        lm: async (text, env, candidateIntents) -> {intent: p}, policy }
 * -> suggest() result + { hybrid: { system, deferred, model, ms } }
 */
export async function suggestHybrid(query, opts = {}) {
  const system = opts.system || 'A+B';
  const env = opts.env || detectEnv({ shell: opts.shell, os: opts.os });
  const base = { ...opts, env };
  if (system === 'A') return { ...suggest(query, base), hybrid: { system, deferred: false } };
  const P = { ...POLICY[system], ...(opts.policy || {}) };
  // the policy's k candidates are re-ranked whatever --top displays (k = 0: B alone, no cascade candidates needed)
  base.rerankTop = P.k;
  let seen = null; let seenThr = 0;
  const first = suggest(query, { ...base, rerank: (c, { thr }) => { seen = c; seenThr = thr; return c; } });
  if (!seen || (seen.confidence >= P.tau && !P.disagree)) return { ...first, hybrid: { system, deferred: false } };
  // the policy keeps every cascade rejection (rescue: false): the model could not change anything, so do not load or run it
  if (P.rescue === false && seen.confidence < seenThr) return { ...first, hybrid: { system, deferred: false } };
  const t0 = performance.now();
  let pX; let pNone = 0; let tagger;
  if (/B|S/.test(system)) {
    if (!opts.encoder) return { ...first, hybrid: { system, deferred: false, unavailable: 'encoder' } };
    const b = await opts.encoder.infer(query, env);
    pX = b.intents;
    pNone = b.pNone;
    if (P.tagger === 'B') tagger = b.tagger;
  } else {
    if (!opts.lm) return { ...first, hybrid: { system, deferred: false, unavailable: 'lm' } };
    pX = await opts.lm(query, env, seen.top.slice(0, P.k).map((t) => t.intent));
    if (!pX) return { ...first, hybrid: { system, deferred: true, unavailable: 'lm' } };
  }
  const ms = performance.now() - t0;
  const res = suggest(query, { ...base, tagger, rerank: (c, { thr }) => rerank(c, pX, P, { thr, pNone }) });
  return { ...res, hybrid: { system, deferred: true, ms, pNone } };
}

/** CLI entry: A+B (enc-v2 bundle) or A+S / A+S-full (student bundle), the model loaded lazily (only when the cascade
 *  defers, or on every query for A+S-full) and once per process; falls back to A when the optional runtime or model
 *  bundle is missing or cannot be opened (result.hybrid.unavailable says why). */
const LOADED = new Map();
const loader = (student) => async () => {
  if (student) { const { loadStudent } = await import('./student.js'); return loadStudent({ threads: 1 }); }
  const { Encoder } = await import('./encoder.js');
  try { return await Encoder.load({ threads: 1 }); } catch { return null; }
};
export async function suggestLazy(query, opts = {}) {
  const system = opts.system || 'A+B';
  const student = /S/.test(system);
  const key = student ? 'S' : 'B';
  const encoder = { infer: async (t, env) => {
    if (!LOADED.has(key)) LOADED.set(key, (await (opts.load || loader(student))()) || false);
    const m = LOADED.get(key);
    if (!m) throw Object.assign(new Error('unavailable'), { unavailable: true });
    try { return await m.infer(t, env); } catch { throw Object.assign(new Error('unavailable'), { unavailable: true }); }
  } };
  try {
    return await suggestHybrid(query, { ...opts, system, encoder });
  } catch (e) {
    if (!e.unavailable) throw e;
    const why = student ? 'student (install onnxruntime-node + tellsh-model-student)' : 'encoder (install onnxruntime-node + tellsh-model-enc)';
    return { ...suggest(query, opts), hybrid: { system: 'A', deferred: false, unavailable: why } };
  }
}
/** test hook: forget loaded models */
export const _resetLazy = () => LOADED.clear();

export { NONE };
