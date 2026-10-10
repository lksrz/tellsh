#!/usr/bin/env node
// Hybrid benchmark: A (linear cascade), B (encoder), C (tiny-LM rerank of A's top-5), A+B, A+C.
//
//   node scripts/hybrid/eval_hybrid.js --calibrate   grid-search the policies on the TRAINING dev split with A_dev
//                                                    (build/adev/model/model.bin, never saw the dev rows) -> build/hybrid/policy.json
//   node scripts/hybrid/eval_hybrid.js               evaluate every system on the held-out sets -> build/hybrid/results.json,
//                                                    tables into HYBRID.md (<!-- hybrid:start/end -->)
// C needs cached letter logits from Python (build/hybrid/lm_<cands>.jsonl, scripts/hybrid/lm_rerank.py score);
// rows without a cached score are reported as missing (C alone is evaluated on the scored rows only).
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getModel, loadModel } from '../../src/model.js';
import { cascade } from '../../src/cascade.js';
import { suggest, resolveWithTagger } from '../../src/pipeline.js';
import { buildCommand, resolveSlots, finalizeSlots } from '../../src/fill.js';
import { exFromSpans, normPath, normExt, normNum } from '../../src/tagger.js';
import { extractSlots } from '../../src/slots.js';
import { BY_ID } from '../../src/catalog.js';
import { FAMILY_OF, NONE, SLOT_TAG } from '../../src/tools.js';
import { envFeatures } from '../../src/env.js';
import { normalize } from '../../src/features.js';
import { silverSpans, relex, mulberry32 } from '../lib/silver.js';
import { Encoder } from '../../src/rerank/encoder.js';
import { POLICY, rerank, suggestHybrid } from '../../src/rerank/hybrid.js';
import { evalSets, NEW_INTENTS, NEW_FAMILY } from './sets.js';
import { sameCmd } from '../lib/cmdnorm.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const argv = process.argv.slice(2);
const has = (k) => argv.includes(`--${k}`);
const arg = (k, d) => argv.find((a) => a.startsWith(`--${k}=`))?.split('=').slice(1).join('=') ?? d;
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);
const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
const key = (text, env) => `${env.shell}|${env.os}|${text}`;
const envOf = (r) => ({ shell: r.shell || 'bash', os: r.os || 'linux', coreutils: (r.os || 'linux') === 'darwin' ? 'bsd' : 'gnu' });
const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const TAG = arg('tag', ''); // separate policy/results files per LM variant (e.g. --tag=_ft)

// ---------------------------------------------------------------- model outputs (cached)
const encoder = has('no-b') ? null : await Encoder.load({ dir: arg('enc'), threads: +arg('threads', 1) });
if (!encoder && !has('no-b')) console.error('warning: encoder bundle not found; B systems skipped');
const B = new Map();
async function bOut(text, env) {
  const k = key(text, env);
  if (!B.has(k)) B.set(k, await encoder.infer(text, env));
  return B.get(k);
}
const LM = new Map();
const LM_SAMPLE = new Set(); // uniform random sample scored for "C alone" (deferred rows are scored in addition)
for (const f of (arg('lm', '') || '').split(',').filter(Boolean)) {
  const cands = readJsonl(join(ROOT, `build/hybrid/cands_${f.split(':')[0]}.jsonl`));
  const byId = new Map(cands.map((c) => [`${c.set}:${c.i}`, c]));
  for (const s of readJsonl(join(ROOT, `build/hybrid/lm_${f.replace(':', '_')}.jsonl`))) {
    const c = byId.get(`${s.set}:${s.i}`);
    if (!c) continue;
    const m = Math.max(...s.logits);
    const e = s.logits.map((v) => Math.exp(v - m));
    const z = e.reduce((a, b) => a + b, 0);
    LM.set(key(c.text, { shell: c.shell, os: c.os }), Object.fromEntries(s.cands.map((ci, j) => [ci, e[j] / z])));
    if (s.sample) LM_SAMPLE.add(key(c.text, { shell: c.shell, os: c.os }));
  }
}
const lmFn = async (text, env) => LM.get(key(text, env)) || null;

// ---------------------------------------------------------------- calibration on the training dev split
function decide(c, sys, P, bo, lo, thr) {
  if (sys === 'A') return c;
  if (/B/.test(sys)) return bo ? rerank(c, bo.intents, P, { thr, pNone: bo.pNone }) : c;
  return lo ? rerank(c, lo, P, { thr }) : c;
}
const SYSTEMS = ['A', 'B', 'C', 'A+B', 'A+C', 'A+B-safe', 'A+C-safe'];
if (has('calibrate')) {
  const adev = loadModel(join(ROOT, 'build/adev/model/model.bin'));
  const thr = adev.thresholds.accept;
  const dev = readJsonl(join(ROOT, 'build/hybrid/train.jsonl')).filter((r) => r.split === 'dev' && (r.intent || r.tool === NONE));
  const rows = [];
  for (const r of dev) {
    const env = envOf(r);
    const c = cascade(r.text, { model: adev, extras: envFeatures(env), top: 8 });
    rows.push({ r, c, bo: encoder ? await bOut(r.text, env) : null, lo: LM.get(key(r.text, env)) || null });
  }
  const score = (sys, P) => {
    let ok = 0; let n = 0; let deferred = 0; let ood = 0; let oodRej = 0; let ind = 0; let indOk = 0;
    for (const { r, c, bo, lo } of rows) {
      if (/C/.test(sys) && !lo && c.confidence < P.tau) continue;
      const d = decide(c, sys, P, bo, lo, thr);
      const und = d.confidence >= thr;
      n++;
      if (d.reranked !== undefined || c.confidence < P.tau) deferred++;
      ok += r.intent ? (und && d.intent === r.intent ? 1 : 0) : (und ? 0 : 1);
      if (r.intent) { ind++; if (und && d.intent === r.intent) indOk++; } else { ood++; if (!und) oodRej++; }
    }
    return { acc: ok / n, n, deferred: deferred / n, indAcc: indOk / ind, oodRej: oodRej / ood, nOod: ood };
  };
  const grid = (sys) => {
    // C was scored only where A_dev conf < 0.9 (cost), so A+C cannot defer above that
    const taus = sys === 'B' || sys === 'C' ? [Infinity] : /A\+C/.test(sys) ? [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9] : [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 0.995];
    const alphas = sys === 'B' || sys === 'C' ? [0] : [0, 0.25, 0.5, 0.75];
    const ks = sys === 'B' ? [0] : [3, 5];
    const accepts = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
    const nones = /B/.test(sys) ? [0.1, 0.2, 0.3, 0.5, 0.7, 1.01] : [1.01];
    let best = null;
    // constraint: OOD rejection on dev may drop at most ~2 of the 48 OOD rows below A_dev's (added after the first
    // held-out run showed the unconstrained policies answering almost every OOD request; see HYBRID.md)
    const oodFloor = out.A.oodRej - 0.045;
    for (const tau of taus) for (const alpha of alphas) for (const k of ks) for (const accept of accepts) for (const none of nones) for (const keepNone of [false, true]) {
      const P = { tau, alpha, k, accept, none, keepNone, tagger: POLICY[sys]?.tagger, ...(/safe/.test(sys) ? { rescue: false } : {}) };
      const s = score(sys, P);
      if (s.oodRej < oodFloor) continue;
      // ties (within 0.05 pt) -> prefer the policy that defers less (faster)
      if (!best || s.acc > best.s.acc + 5e-4 || (Math.abs(s.acc - best.s.acc) <= 5e-4 && s.deferred < best.s.deferred)) best = { P, s };
    }
    return best;
  };
  const out = { thrAdev: thr, n: rows.length, A: score('A', { tau: 0 }) };
  for (const sys of ['B', 'A+B', 'C', 'A+C', 'A+B-safe', 'A+C-safe']) {
    if (/B/.test(sys) && !encoder) continue;
    if (/C/.test(sys) && !LM.size) continue;
    out[sys] = grid(sys);
  }
  writeFileSync(join(ROOT, `build/hybrid/policy${TAG}.json`), JSON.stringify(out, (k, v) => (v === Infinity ? 'Infinity' : v), 1));
  console.log(JSON.stringify(out, (k, v) => (v === Infinity ? 'Infinity' : v)));
  process.exit(0);
}

// ---------------------------------------------------------------- evaluation
const cal = existsSync(join(ROOT, `build/hybrid/policy${TAG}.json`)) ? JSON.parse(readFileSync(join(ROOT, `build/hybrid/policy${TAG}.json`), 'utf8')) : {};
const policyOf = (sys) => {
  const p = cal[sys]?.P ? { ...cal[sys].P } : { ...POLICY[sys] };
  if (p.tau === 'Infinity') p.tau = Infinity;
  if (arg('tagger')) p.tagger = arg('tagger');
  return p;
};
const model = getModel();
const thr = model.thresholds.accept;
const ONLY = arg('systems') ? arg('systems').split(',') : null;
const active = SYSTEMS.filter((s) => !ONLY || ONLY.includes(s)).filter((s) => (/B/.test(s) ? !!encoder : /C/.test(s) ? LM.size > 0 : true));

async function run(sys, text, env, extra = {}) {
  if (sys === 'A') return suggest(text, { env, model, compose: 'off', ...extra });
  const P = policyOf(sys);
  if (/B/.test(sys)) await bOut(text, env);
  const r = await suggestHybrid(text, { env, model, compose: 'off', system: sys, policy: P, encoder: encoder && { infer: bOut }, lm: lmFn, ...extra });
  return r;
}

const SET = evalSets(ROOT);
const trainTexts = new Set(readJsonl(join(ROOT, 'build/hybrid/train.jsonl')).map((r) => normalize(r.text)));
// texts the shipped A model may have trained on: data/intents + data/shell/train
const aTrain = new Set([...readDir(join(ROOT, 'data/intents')), ...readJsonl(join(ROOT, 'data/shell/train.jsonl'))].map((r) => normalize(r.text)));
const blind = SET.blind().map((r) => ({ ...r, novel: !aTrain.has(normalize(r.text)) && !trainTexts.has(normalize(r.text)) }));
const blindOod = SET.blind_ood();
const evalRows = SET.eval();
const shellEval = SET.shell();
const oodEval = SET.ood();
const hist = readJsonl(join(ROOT, 'data/history/eval.jsonl'));
const gold = readJsonl(join(ROOT, 'data/slots/gold.jsonl'));
// private real-usage eval split (scripts/real/prepare_real.js; never committed), held out by command group
const realRows = has('no-private') ? [] : SET.real();
const realOoc = has('no-private') ? [] : SET.real_ooc();
// gold tool family (intents unknown to this tree's catalog, e.g. when evaluating the v0.3 code: NEW_FAMILY)
const famOf = (i) => FAMILY_OF[i] || NEW_FAMILY[i];

const R = {};
const md = [];
const t0 = Date.now();

// 1. classification (intent decided by the full pipeline incl. reject)
async function clsSet(name, rows) {
  R[name] = {};
  for (const sys of active) {
    const S = {};
    const bump = (k, f) => { S[k] ??= { n: 0, tool: 0, intent: 0, ans: 0, ansOk: 0, deferred: 0, missing: 0 }; S[k][f]++; };
    for (const r of rows) {
      const env = envOf(r);
      if (sys === 'C' && !LM_SAMPLE.has(key(r.text, env))) continue;
      const s = await run(sys, r.text, env);
      if (/C/.test(sys) && s.hybrid?.deferred && !LM.has(key(r.text, env))) { bump('all', 'missing'); continue; }
      const ks = ['all', r.lang, 'sh:' + env.shell, NEW_INTENTS.has(r.intent) ? 'new' : 'old'];
      if (r.literal !== undefined) ks.push(r.literal ? 'lit' : 'nat');
      for (const k of ks) {
        bump(k, 'n');
        if ((s.tool || FAMILY_OF[s.intent]) === famOf(r.intent)) bump(k, 'tool');
        if (s.understood && s.intent === r.intent) bump(k, 'intent');
        if (s.understood) { bump(k, 'ans'); if (s.intent === r.intent) bump(k, 'ansOk'); }
        if (s.hybrid?.deferred) bump(k, 'deferred');
      }
    }
    R[name][sys] = S;
  }
}
async function oodSet(name, rows) {
  R[name] = {};
  for (const sys of active) {
    let rej = 0; let n = 0;
    for (const r of rows) {
      const env = envOf(r);
      if (sys === 'C' && !LM_SAMPLE.has(key(r.text, env))) continue;
      const s = await run(sys, r.text, env);
      if (/C/.test(sys) && s.hybrid?.deferred && !LM.has(key(r.text, env))) continue;
      n++; if (!s.understood) rej++;
    }
    R[name][sys] = { n, rej };
  }
}
const SETS = [['eval', evalRows], ['shell', shellEval], ['blind', blind], ['blind_novel', blind.filter((r) => r.novel)],
  ['blind3', SET.blind3()], ['devtools', SET.devtools()]];
if (realRows.length) SETS.push(['real', realRows]);
for (const [n, rows] of SETS) { await clsSet(n, rows); console.error(`cls ${n} done ${((Date.now() - t0) / 1000).toFixed(0)}s`); }
await oodSet('ood', oodEval);
await oodSet('blind_ood', blindOod);
await oodSet('blind3_ood', SET.blind3_ood());
if (realOoc.length) await oodSet('real_ooc', realOoc);

// 1b. real usage, stage 3: slot values of correctly classified requests that occur in the real command, and exact
// (normalised) equality with the real command (real commands often carry extra flags, so this is a lower bound)
R.realSlots = {};
for (const sys of active.filter((x) => x !== 'C')) {
  const S = { n: 0, filled: 0, found: 0, exact: 0 };
  for (const r of realRows) {
    const env = envOf(r);
    const s = await run(sys, r.text, env);
    if (/C/.test(sys) && s.hybrid?.deferred && !LM.has(key(r.text, env))) continue;
    if (!(s.understood && s.intent === r.intent)) continue;
    S.n++;
    const defaults = BY_ID[r.intent]?.slots || {};
    const cmd = r.cmd.replace(/["']/g, '');
    for (const [k, v] of Object.entries(s.slots || {})) {
      if (v == null || String(v) === String(defaults[k]) || ['glob', 'namepat', 'sedexpr', 'age', 'since', 'minutes', 'sizeBytes'].includes(k)) continue;
      S.filled++;
      if (cmd.includes(String(v))) S.found++;
    }
    try { if (s.command && sameCmd(s.command, r.cmd)) S.exact++; } catch { /* unparsable */ }
  }
  R.realSlots[sys] = S;
}

// 2. data/eval under every shell context (intent accuracy)
const ENVS = { bash: BASH, zsh: { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, sh: { shell: 'sh', os: 'linux', coreutils: 'gnu' },
  powershell: { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, fish: { shell: 'fish', os: 'linux', coreutils: 'gnu' }, cmd: { shell: 'cmd', os: 'win32', coreutils: 'gnu' } };
R.evalShells = {};
if (!has('fast')) {
  for (const sys of active.filter((s) => !/C/.test(s))) {
    R.evalShells[sys] = {};
    for (const [sh, env] of Object.entries(ENVS)) {
      let ok = 0;
      for (const r of evalRows) { const s = await run(sys, r.text, env); if (s.understood && s.intent === r.intent) ok++; }
      R.evalShells[sys][sh] = ok / evalRows.length;
    }
  }
  console.error(`shells done ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}

// 3. slot F1 given the gold intent (data/slots/gold + blind spans): A tagger, B tagger, each with regex fallback
function typedFromSlots(slots) {
  const out = [];
  for (const [k, v] of Object.entries(slots)) {
    if (v == null) continue;
    const type = SLOT_TAG[k];
    if (!type || k === 'since' || k === 'days' || k === 'glob') continue;
    let val;
    if (k === 'age') val = (() => { const m = String(v).match(/^-m(min|time) -(\d+)$/); return m ? (m[1] === 'min' ? +m[2] : +m[2] * 1440) : null; })();
    else if (type === 'PATH') val = normPath(String(v)) ?? String(v);
    else if (type === 'NUM' || type === 'PORT' || type === 'PID') val = +v;
    else if (type === 'HOST') val = String(v).toLowerCase().replace(/^.*@/, '');
    else val = String(v).toLowerCase();
    if (k === 'target' && String(v).includes('@')) out.push(['USER', String(v).split('@')[0].toLowerCase()]);
    out.push([type, val]);
  }
  if (slots.glob) out.push(['EXT', String(slots.glob).replace(/^\*\./, '').toLowerCase()]);
  if (slots.age == null && slots.days != null && slots.since) out.push(['TIME', +slots.days * 1440]);
  return out;
}
function f1(G, Pr) {
  let tp = 0; let fp = 0; let fn = 0;
  G.forEach((g, i) => {
    const p = [...Pr[i]];
    for (const [t, v] of g) { const j = p.findIndex(([pt, pv]) => pt === t && String(pv) === String(v)); if (j >= 0) { tp++; p.splice(j, 1); } else fn++; }
    fp += p.length;
  });
  const pr = tp / (tp + fp || 1); const rc = tp / (tp + fn || 1);
  return { p: pr, r: rc, f1: pr + rc ? (2 * pr * rc) / (pr + rc) : 0 };
}
const spansOf = (r) => r.spans.map(([type, text]) => { const start = r.text.indexOf(text); return { type, start, end: start + text.length, text }; }).filter((s) => s.start >= 0);
const goldSlots = (r) => { const it = BY_ID[r.intent]; return finalizeSlots(it, resolveSlots(it, exFromSpans(r.text, spansOf(r)))); };
R.slots = {};
for (const [name, rows] of [['gold', gold], ['blind', blind]]) {
  const G = rows.map((r) => typedFromSlots(goldSlots(r)));
  const variants = { 'A tagger + regex (shipped)': [], 'A tagger only': [] };
  if (encoder) { variants['B tagger + regex'] = []; variants['B tagger only'] = []; }
  for (const r of rows) {
    const env = envOf(r);
    variants['A tagger + regex (shipped)'].push(typedFromSlots(resolveWithTagger(r.intent, r.text, { model }).slots));
    variants['A tagger only'].push(typedFromSlots(resolveWithTagger(r.intent, r.text, { model, mode: 'tagger' }).slots));
    if (encoder) {
      const b = await bOut(r.text, env);
      variants['B tagger + regex'].push(typedFromSlots(resolveWithTagger(r.intent, r.text, { model, tagger: b.tagger }).slots));
      variants['B tagger only'].push(typedFromSlots(resolveWithTagger(r.intent, r.text, { model, mode: 'tagger', tagger: b.tagger }).slots));
    }
  }
  R.slots[name] = {};
  for (const [v, P] of Object.entries(variants)) {
    const all = f1(G, P);
    const ix = (l) => rows.map((r, i) => (r.lang === l ? i : -1)).filter((i) => i >= 0);
    R.slots[name][v] = { ...all, en: f1(ix('en').map((i) => G[i]), ix('en').map((i) => P[i])).f1, pl: f1(ix('pl').map((i) => G[i]), ix('pl').map((i) => P[i])).f1, n: rows.length };
  }
}

// 4. end-to-end exact command: relexicalised data/eval (same construction and seed as scripts/eval.js) + blind gold commands
const rng = mulberry32(7);
const relexRows = [];
for (const r of evalRows) {
  const { spans } = silverSpans(r.text, r.intent);
  if (!spans.length) continue;
  const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'eval', keepProb: 0 });
  const it = BY_ID[r.intent];
  const gs = finalizeSlots(it, resolveSlots(it, exFromSpans(rx.text, rx.spans.map((s) => ({ ...s, text: rx.text.slice(s.start, s.end) })))));
  relexRows.push({ text: rx.text, lang: r.lang, intent: r.intent, gold: buildCommand(r.intent, rx.text, { env: BASH, resolved: gs }).command, shell: 'bash', os: 'linux' });
}
const blindE2E = blind.map((r) => ({ ...r, gold: buildCommand(r.intent, r.text, { env: envOf(r), resolved: goldSlots(r) }).command }));
const blind3E2E = readJsonl(join(ROOT, 'data/blind/e2e.jsonl')).map((r) => ({ ...r, shell: r.shell || 'bash', os: r.os || 'linux', gold: r.expect_command }));
const devE2E = SET.devtools().filter((r) => r.expect_command).map((r) => ({ ...r, gold: r.expect_command }));
R.e2e = {};
for (const [name, rows] of [['relex', relexRows], ['blind', blindE2E], ['blind_novel', blindE2E.filter((r) => r.novel)], ['blind3', blind3E2E], ['devtools', devE2E]]) {
  R.e2e[name] = {};
  for (const sys of active) {
    const S = { all: [0, 0], en: [0, 0], pl: [0, 0] };
    for (const r of rows) {
      const env = envOf(r);
      if (sys === 'C' && !LM_SAMPLE.has(key(r.text, env))) continue;
      const s = await run(sys, r.text, env);
      if (/C/.test(sys) && s.hybrid?.deferred && !LM.has(key(r.text, env))) continue;
      const ok = s.understood && s.command === r.gold ? 1 : 0;
      for (const k of ['all', r.lang]) { S[k][0]++; S[k][1] += ok; }
    }
    R.e2e[name][sys] = S;
  }
}
console.error(`e2e done ${((Date.now() - t0) / 1000).toFixed(0)}s`);
// 5. history references
R.history = {};
for (const sys of active) {
  let ok = 0;
  for (const r of hist) { const s = await run(sys, r.query, BASH, { history: r.history }); if (s.command === r.expect_command) ok++; }
  R.history[sys] = [hist.length, ok];
}

writeFileSync(join(ROOT, `build/hybrid/results${TAG}.json`), JSON.stringify({ R, policies: Object.fromEntries(active.map((s) => [s, policyOf(s)])), lmRows: LM.size, realRows: realRows.length, realOoc: realOoc.length }, (k, v) => (v === Infinity ? 'Infinity' : v), 1));
console.error(`wrote build/hybrid/results.json in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
