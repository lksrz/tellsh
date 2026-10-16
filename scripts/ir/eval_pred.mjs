#!/usr/bin/env node
// Score typed-IR model predictions (written by ml/ir/eval.py) with ir/lib canon + gate (docs/IR.md §6, §10).
//
//   node scripts/ir/eval_pred.mjs --preds PRED.jsonl --data build/ir/dataset/v1/dev.jsonl [--out REPORT.json]
//   node scripts/ir/eval_pred.mjs --oracle --data build/ir/dataset/v1/dev.jsonl     # gold targets as predictions
//
// PRED row: {id: "<split>:<line>", p: {label, single, op, pin, mods, stderr, slots}, d: {actions: [[name, u0, u1]]}}
// Every gold row is scored (missing prediction = abstention); ids must be unique and from the --data split.
// Routes: P (heads only; abstains when single=false), D (decoder), PD (P when it predicts ok + one stage and the gate accepts it, else D).
// Metrics per route: label accuracy, exact canonical-IR match and compiled-command match (on gold-ok rows),
// accepted-wrong (gate accepts but the command differs from gold, or gold is not ok) over all rows and
// over accepted rows, abstention precision/recall (abstain = no accepted command; positive = gold not ok).
//
// Confidence thresholds (rows with p.conf / d.conf from ml/ir/eval.py; older preds only have p.label_prob, d.logp):
//   --calibrate [--thresholds-out T.json]  (dev) per route and scalar confidence, the threshold with max coverage
//       whose accepted-wrong rate over kept rows is <= 0.5 / 1 / 2 %; PD sweeps a P-fast-path and a D threshold
//       jointly; writes T.json (default PRED.thresholds.json) and adds report.calibration + reliability tables.
//   --thresholds T.json  (test) applies dev-chosen thresholds: report.thresholded = coverage / accepted-wrong per target.

import fs from 'node:fs';
import { loadSchemas, canon, equals, gate } from '../../ir/lib/index.js';
import { encodeActions, decodeActions, pTargets, assembleP, LABELS } from './actions.mjs';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const DATA = opt('data');
const PREDS = opt('preds');
const ORACLE = args.includes('--oracle');
if (!DATA || (!PREDS && !ORACLE)) { console.error('usage: eval_pred.mjs --data SPLIT.jsonl (--preds PRED.jsonl | --oracle) [--out R.json]'); process.exit(2); }

const schemas = loadSchemas();
const PLATFORM = { linux: 'linux_gnu', darwin: 'darwin_bsd' };
const readJsonl = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const gold = readJsonl(DATA);
const SPLIT = DATA.split(/[\\/]/).pop().replace(/\.jsonl$/, '');
const preds = ORACLE
  ? gold.map((r, i) => {
    const p = pTargets(r.ir, schemas);
    return {
      id: `${SPLIT}:${i}`,
      p: p ? { label: r.label, single: true, ...p } : { label: r.label, single: false, op: 'none' },
      d: { actions: encodeActions(r.ir, r.label, r.reasons, schemas) },
    };
  })
  : readJsonl(PREDS);

const envOf = (r) => ({ schemas, shell: 'bash', platform: PLATFORM[r.os] || 'linux_gnu', request: r.request });

// Run the gate on a predicted IR -> {label, accepted, command, canon}
function judge(r, ir, modelLabel) {
  if (!ir) return { label: modelLabel, accepted: false, command: null, canon: null, err: 'decode' };
  if (ir.status !== 'ok') return { label: modelLabel, accepted: false, command: null, canon: ir.status === 'ambiguous' ? { v: 1, status: 'ambiguous' } : safeCanon(r, ir) };
  let g;
  try { g = gate(r.request, ir, envOf(r)); } catch (e) { return { label: 'ok', accepted: false, command: null, canon: safeCanon(r, ir), err: 'gate_throw' }; }
  return { label: 'ok', accepted: !!g.accept, command: g.accept ? g.command : null, canon: safeCanon(r, ir), gate: g.label };
}
function safeCanon(r, ir) { try { return canon(ir, { schemas, request: r.request }); } catch { return null; } }

const goldInfo = gold.map((r) => {
  if (r.label !== 'ok') return { canon: { v: 1, status: r.label }, command: null };
  const g = gate(r.request, r.ir, envOf(r));
  return { canon: safeCanon(r, r.ir), command: g.accept ? g.command : r.command };
});

// Index predictions by gold row; every gold row is scored, a missing prediction counts as abstention.
const byRow = new Map();
for (const pr of preds) {
  const [sp, ln] = String(pr.id).split(':');
  const i = Number(ln);
  if (sp !== SPLIT) { console.error(`prediction id ${pr.id} is not from split ${SPLIT} (${DATA})`); process.exit(2); }
  if (!Number.isInteger(i) || i < 0 || i >= gold.length) { console.error(`prediction id ${pr.id} out of range`); process.exit(2); }
  if (byRow.has(i)) { console.error(`duplicate prediction id ${pr.id}`); process.exit(2); }
  byRow.set(i, pr);
}
const MISSING = { label: null, accepted: false, command: null, canon: null, err: 'missing' };

const routes = { P: [], D: [], PD: [] };
const confs = new Array(gold.length).fill(null), pFastAt = new Array(gold.length).fill(false);
// scalar confidences in [0, 1] per definition; undefined when the preds file lacks the field
function confOf(pr) {
  const pc = pr.p?.conf, dc = pr.d?.conf, lp = pr.d?.logp;
  return {
    P: { p_label: pc?.label ?? pr.p?.label_prob, p_min: pc?.min, p_prod: pc?.prod },
    D: {
      d_label: dc?.label, d_min_tok: dc?.min_tok, d_seqprob: lp == null ? undefined : Math.exp(lp),
      d_min_all: dc ? Math.min(dc.min_tok, dc.ptr_min) : undefined,
      d_prob_all: dc && lp != null ? Math.exp(lp + dc.ptr_logp) : undefined,
      d_margin: dc?.min_margin,
    },
  };
}
gold.forEach((r, i) => {
  const pr = byRow.get(i);
  if (!pr) { for (const k of Object.keys(routes)) routes[k].push([i, k === 'PD' ? { ...MISSING, route: 'D' } : MISSING]); return; }
  let pOut, dOut;
  const pl = pr.p?.label ?? 'ok';
  // P can only express 1 part x 1 stage; single=false is the model saying so -> P abstains
  if (pl === 'ok' && pr.p?.single === false) pOut = { label: 'ok', accepted: false, command: null, canon: null, err: 'not_single' };
  else try { pOut = judge(r, assembleP(pr.p, schemas), pl); } catch { pOut = judge(r, null, pl); }
  const dl = (() => { const a = pr.d?.actions?.find(([x]) => x !== 'BOS')?.[0]; return { OK: 'ok', NOT_SHELL: 'not_shell', OOS: 'out_of_scope', UNDER: 'underspecified', AMBIG: 'ambiguous' }[a] ?? 'ok'; })();
  try { dOut = judge(r, decodeActions(pr.d.actions, schemas), dl); } catch { dOut = judge(r, null, dl); }
  const pFast = pr.p?.label === 'ok' && pr.p?.single !== false && pOut.accepted;
  confs[i] = confOf(pr);
  pFastAt[i] = pFast;
  routes.P.push([i, pOut]);
  routes.D.push([i, dOut]);
  routes.PD.push([i, pFast ? { ...pOut, route: 'P' } : { ...dOut, route: 'D' }]);
});

const pct = (a, b) => (b ? +((100 * a) / b).toFixed(2) : null);
function score(rows) {
  let n = 0, lab = 0, okN = 0, exact = 0, cmd = 0, acc = 0, accWrong = 0, abst = 0, abstTrue = 0, negN = 0, fromP = 0;
  const confusion = {};
  for (const [i, o] of rows) {
    const g = gold[i], gi = goldInfo[i];
    n++;
    if (o.label === g.label) lab++;
    confusion[`${g.label}->${o.label}`] = (confusion[`${g.label}->${o.label}`] || 0) + 1;
    if (g.label !== 'ok') negN++;
    if (o.route === 'P') fromP++;
    if (g.label === 'ok') {
      okN++;
      if (o.canon && gi.canon && equals(o.canon, gi.canon)) exact++;
      if (o.accepted && o.command === gi.command) cmd++;
    }
    if (o.accepted) {
      acc++;
      if (g.label !== 'ok' || o.command !== gi.command) accWrong++;
    } else {
      abst++;
      if (g.label !== 'ok') abstTrue++;
    }
  }
  return {
    n, missing: rows.filter(([, o]) => o.err === 'missing').length, label_acc: pct(lab, n), gold_ok: okN, exact_ir: pct(exact, okN), cmd_match: pct(cmd, okN), accepted: acc,
    accepted_wrong: accWrong, accepted_wrong_rate_all: pct(accWrong, n), accepted_wrong_rate_accepted: pct(accWrong, acc),
    abstain_precision: pct(abstTrue, abst), abstain_recall: pct(abstTrue, negN), ...(rows.some(([, o]) => o.route) ? { routed_to_P: fromP } : {}),
    confusion,
  };
}

// --dump FILE: one line per accepted-but-wrong D/PD row (gold vs predicted command), for error analysis
const DUMP = opt('dump');
if (DUMP) {
  const out = [];
  for (const k of ['D', 'PD']) for (const [i, o] of routes[k]) {
    const g = gold[i], gi = goldInfo[i];
    if (o.accepted && (g.label !== 'ok' || o.command !== gi.command)) out.push(JSON.stringify({ route: k, i, request: g.request, gold_label: g.label, gold: gi.command, pred: o.command }));
  }
  fs.writeFileSync(DUMP, out.join('\n') + '\n');
}
// ---------------------------------------------------------------- confidence calibration
const TARGETS = [0.5, 1, 2]; // max accepted-wrong % over kept rows
const isWrong = (i, o) => o.accepted && (gold[i].label !== 'ok' || o.command !== goldInfo[i].command);
// accepted rows of a single-confidence route -> [{c, w}]
const items = (k, side, def) => routes[k].filter(([, o]) => o.accepted).map(([i, o]) => ({ c: confs[i]?.[side][def], w: isWrong(i, o) }));
const hasDef = (its) => its.length > 0 && its.every((x) => typeof x.c === 'number' && Number.isFinite(x.c));
// best threshold: rows kept iff c >= t; base = rows always kept {kept, wrong}; returns {t, kept, wrong} per target
function sweep(its, base = { kept: 0, wrong: 0 }) {
  const s = [...its].sort((a, b) => b.c - a.c);
  const best = Object.fromEntries(TARGETS.map((T) => [T, null]));
  const ok = (kept, wrong, T) => kept > 0 && 100 * wrong <= T * kept;
  for (const T of TARGETS) if (ok(base.kept, base.wrong, T)) best[T] = { t: Infinity, kept: base.kept, wrong: base.wrong };
  let kept = base.kept, wrong = base.wrong;
  for (let j = 0; j < s.length; j++) {
    kept++; wrong += s[j].w ? 1 : 0;
    if (j + 1 < s.length && s[j + 1].c === s[j].c) continue; // ties go together
    for (const T of TARGETS) if (ok(kept, wrong, T) && (!best[T] || kept > best[T].kept)) best[T] = { t: s[j].c, kept, wrong };
  }
  return best;
}
const fmt = (n, b, extra) => b && { ...extra, kept: b.kept, coverage: pct(b.kept, n), accepted_wrong: b.wrong, accepted_wrong_rate_accepted: pct(b.wrong, b.kept) };
function reliability(its, bins = 10) {
  const s = [...its].sort((a, b) => a.c - b.c), out = [];
  for (let b = 0; b < bins; b++) {
    const part = s.slice(Math.floor((b * s.length) / bins), Math.floor(((b + 1) * s.length) / bins));
    if (!part.length) continue;
    const w = part.filter((x) => x.w).length;
    out.push({ c_lo: +part[0].c.toFixed(4), c_hi: +part[part.length - 1].c.toFixed(4), mean_conf: +(part.reduce((a, x) => a + x.c, 0) / part.length).toFixed(4), n: part.length, correct: pct(part.length - w, part.length) });
  }
  return out;
}
const DEFS = { P: Object.keys(confOf({}).P), D: Object.keys(confOf({}).D) };
function calibrate() {
  const n = gold.length, cal = { targets_pct: TARGETS, routes: {} }, thr = { targets_pct: TARGETS, routes: {} };
  for (const [k, side] of [['P', 'P'], ['D', 'D']]) {
    const per = {};
    for (const def of DEFS[side]) {
      const its = items(k, side, def);
      if (hasDef(its)) per[def] = sweep(its);
    }
    cal.routes[k] = { by_def: Object.fromEntries(Object.entries(per).map(([d, b]) => [d, Object.fromEntries(TARGETS.map((T) => [T, fmt(n, b[T], { t: b[T]?.t })]))])) };
    thr.routes[k] = {};
    for (const T of TARGETS) {
      const cands = Object.entries(per).filter(([, b]) => b[T]).sort((a, b) => b[1][T].kept - a[1][T].kept);
      if (cands.length) thr.routes[k][T] = { def: cands[0][0], t: cands[0][1][T].t };
    }
    const d1 = thr.routes[k][1]?.def ?? Object.keys(per)[0];
    if (d1) cal.routes[k].reliability = { def: d1, bins: reliability(items(k, side, d1)) };
  }
  // PD: P fast path kept iff pFast and p >= tP, else D kept iff D accepted and d >= tD
  thr.routes.PD = {};
  const best = {};
  for (const pd of DEFS.P) for (const dd of DEFS.D) {
    const pIts = gold.map((_, i) => i).filter((i) => pFastAt[i]).map((i) => ({ i, c: confs[i].P[pd], w: isWrong(i, routes.P[i][1]) }));
    const dIts = routes.D.filter(([i, o]) => !pFastAt[i] && o.accepted).map(([i, o]) => ({ i, c: confs[i].D[dd], w: isWrong(i, o) }));
    if (!hasDef(pIts) || !hasDef(dIts)) continue;
    const qs = [...new Set([0, ...Array.from({ length: 20 }, (_, q) => [...pIts].sort((a, b) => a.c - b.c)[Math.floor((q * pIts.length) / 20)].c), Infinity])];
    for (const tP of qs) {
      const keptP = pIts.filter((x) => x.c >= tP);
      const base = { kept: keptP.length, wrong: keptP.filter((x) => x.w).length };
      // P-fast rows below tP fall back to D (their D outcome)
      const fall = pIts.filter((x) => x.c < tP).map((x) => routes.D[x.i][1].accepted ? { c: confs[x.i].D[dd], w: isWrong(x.i, routes.D[x.i][1]) } : null).filter(Boolean);
      const b = sweep([...dIts, ...fall], base);
      for (const T of TARGETS) if (b[T] && (!best[T] || b[T].kept > best[T].kept)) best[T] = { ...b[T], p_def: pd, tP, d_def: dd, tD: b[T].t };
    }
  }
  cal.routes.PD = {};
  for (const T of TARGETS) {
    if (!best[T]) continue;
    const { p_def, tP, d_def, tD } = best[T];
    thr.routes.PD[T] = { p_def, tP, d_def, tD };
    cal.routes.PD[T] = fmt(n, best[T], thr.routes.PD[T]);
  }
  for (const k of ['P', 'D']) for (const T of TARGETS) if (thr.routes[k][T]) cal.routes[k][`chosen_${T}`] = fmt(n, applyOne(k, thr.routes[k][T]), thr.routes[k][T]);
  return { cal, thr };
}
// apply one threshold entry to a route -> {kept, wrong}
function applyOne(k, e) {
  let kept = 0, wrong = 0;
  const keep = (i, o, side, def, t) => { if (o.accepted && confs[i] && confs[i][side][def] >= t) { kept++; if (isWrong(i, o)) wrong++; return true; } return false; };
  for (let i = 0; i < gold.length; i++) {
    if (k === 'PD') { if (!(pFastAt[i] && keep(i, routes.P[i][1], 'P', e.p_def, e.tP))) keep(i, routes.D[i][1], 'D', e.d_def, e.tD); }
    else keep(i, routes[k][i][1], k, e.def, e.t);
  }
  return { kept, wrong };
}
const reviveInf = (k, v) => (v === 'Infinity' ? Infinity : v);
const jsonInf = (k, v) => (v === Infinity ? 'Infinity' : v);

const report = { data: DATA, preds: PREDS || 'oracle', labels: LABELS, routes: Object.fromEntries(Object.entries(routes).map(([k, v]) => [k, score(v)])) };
// Gold-oracle check of the P route on P-expressible rows only (P can express ~45% of ok rows by design).
report.p_coverage = { single_ok: routes.P.filter(([, o]) => o.label === 'ok' && o.err !== 'not_single').length, accepted: routes.P.filter(([, o]) => o.accepted).length };
if (ORACLE) report.p_expressible = gold.filter((r) => pTargets(r.ir, schemas)).length;
if (args.includes('--calibrate')) {
  const { cal, thr } = calibrate();
  thr.calibrated_on = DATA; thr.preds = PREDS;
  report.calibration = cal;
  const tout = opt('thresholds-out') || String(PREDS).replace(/\.jsonl$/, '') + '.thresholds.json';
  fs.writeFileSync(tout, JSON.stringify(thr, jsonInf, 1));
  report.thresholds_out = tout;
}
if (opt('thresholds')) {
  const thr = JSON.parse(fs.readFileSync(opt('thresholds'), 'utf8'), reviveInf);
  report.thresholded = { thresholds: opt('thresholds'), calibrated_on: thr.calibrated_on, routes: {} };
  for (const [k, per] of Object.entries(thr.routes)) {
    report.thresholded.routes[k] = Object.fromEntries(Object.entries(per).map(([T, e]) => [T, fmt(gold.length, applyOne(k, e), e)]));
  }
}
const text = JSON.stringify(report, jsonInf, 1);
if (opt('out')) fs.writeFileSync(opt('out'), text);
console.log(text);
