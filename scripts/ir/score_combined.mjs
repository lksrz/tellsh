#!/usr/bin/env node
// Score the pipeline generator -> gate -> verifier(threshold) (ml/ir/verifier.py) on dev and test.
//
//   node scripts/ir/score_combined.mjs \
//     --dev-data build/ir/dataset/v1/dev.jsonl   --dev-preds build/ir/runs/h8/preds_dev.jsonl   --dev-scores S_dev.jsonl \
//     [--test-data build/ir/dataset/v1/test.jsonl --test-preds build/ir/runs/h8/preds_test.jsonl --test-scores S_test.jsonl] \
//     [--target 0.5] [--min-kept 200] [--out REPORT.json]
//
// Candidates: PD route of the generator (same routing as eval_pred.mjs / make_candidates.mjs); scores = {id, p_ok}
// per accepted candidate (a missing score = verifier rejects: never kept, never a threshold). Correct = same
// equivalence key as the gold command (equiv.mjs: -type f, --oneline, rg -o|wc -l, curl -S, tail -F). A row is kept iff the gate accepts and p_ok >= t.
// Per split and threshold: coverage = correct kept / gold ok; accepted-wrong = wrong kept / kept with a one-sided 95%
// Clopper-Pearson upper bound; abstention precision / recall (abstain = not kept, positive = gold not ok, or the
// candidate is wrong); verifier AUC / ECE over accepted candidates.
// The threshold is chosen on dev only (max kept rows subject to accepted-wrong <= target %), twice: by the upper
// bound and by the point estimate, and applied unchanged to test. `gate_only` = no verifier (t = 0).
// --adjudications F[,F...] (adjudicate.mjs output, dev and/or test): a y = 0 candidate whose adjudication (same id and
// command) says the prediction is correct also counts as correct; each row then adds adj_wrong / adj_accepted_wrong_rate /
// adj_accepted_wrong_ub95 next to the raw numbers (thresholds are still chosen on the raw labels).
// --dev-agree P1,P2,... / --test-agree P1,P2,... (other models' preds for the same split): each candidate gets
// agree = number of other models whose own gate-accepted command is sameCommand-equal (combined_lib.mjs). Adds
// `agreement`: a dev-chosen (min_agree, t) setting (max kept subject to UB / point <= target) applied to test, and a
// sweep over min_agree in 0..N x t. Without --*-scores the run is agreement-only (gate + min_agree, no verifier).

import fs from 'node:fs';
import { loadSchemas } from '../../ir/lib/index.js';
import { readJsonl, candidates, goldCommand } from './make_candidates.mjs';
import { sameCommand } from './equiv.mjs';
import { loadAdjudications, adjudicatedY } from './adjudicate_lib.mjs';
import { acceptedById, agreeCount, keeps, chooseGrid } from './combined_lib.mjs';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const TARGET = Number(opt('target', 0.5)) / 100;
const schemas = loadSchemas();
const ADJ = opt('adjudications') ? loadAdjudications(opt('adjudications').split(',')) : null;

// ---------------------------------------------------------------- stats
function logBinomPmf(k, n, p) {
  if (p <= 0) return k === 0 ? 0 : -Infinity;
  if (p >= 1) return k === n ? 0 : -Infinity;
  let lc = 0;
  for (let i = 1; i <= k; i++) lc += Math.log(n - k + i) - Math.log(i);
  return lc + k * Math.log(p) + (n - k) * Math.log(1 - p);
}
const binomCdf = (k, n, p) => { let s = 0; for (let i = 0; i <= k; i++) s += Math.exp(logBinomPmf(i, n, p)); return Math.min(1, s); };
// one-sided (1 - alpha) Clopper-Pearson upper bound of a proportion k / n
export function cpUpper(k, n, alpha = 0.05) {
  if (n === 0) return 1;
  if (k >= n) return 1;
  let lo = k / n, hi = 1;
  for (let it = 0; it < 60; it++) { const mid = (lo + hi) / 2; if (binomCdf(k, n, mid) > alpha) lo = mid; else hi = mid; }
  return hi;
}
function auc(items) {
  const s = [...items].sort((a, b) => a.p - b.p);
  const n1 = s.filter((x) => x.y).length, n0 = s.length - n1;
  if (!n1 || !n0) return null;
  let rank = 0;
  for (let i = 0; i < s.length;) {
    let j = i;
    while (j < s.length && s[j].p === s[i].p) j++;
    const r = (i + j + 1) / 2;
    for (let q = i; q < j; q++) if (s[q].y) rank += r;
    i = j;
  }
  return (rank - (n1 * (n1 + 1)) / 2) / (n1 * n0);
}
function ece(items, bins = 10) {
  let tot = 0;
  for (let b = 0; b < bins; b++) {
    const sel = items.filter((x) => x.p >= b / bins && (x.p < (b + 1) / bins || (b === bins - 1 && x.p === 1)));
    if (sel.length) tot += (sel.length / items.length) * Math.abs(sel.reduce((a, x) => a + x.p, 0) / sel.length - sel.filter((x) => x.y).length / sel.length);
  }
  return tot;
}
const r4 = (x) => (x == null ? null : +x.toFixed(4));
const pct = (a, b) => (b ? +((100 * a) / b).toFixed(3) : null);

// ---------------------------------------------------------------- per split
function load(split) {
  const DATA = opt(`${split}-data`), PREDS = opt(`${split}-preds`), SCORES = opt(`${split}-scores`);
  if (!DATA || !PREDS || (!SCORES && !AGREE_ONLY)) return null;
  const gold = readJsonl(DATA);
  const name = DATA.split(/[\\/]/).pop().replace(/\.jsonl$/, '');
  const scores = SCORES ? new Map(readJsonl(SCORES).map((r) => [String(r.id), r.p_ok])) : null;
  const others = (opt(`${split}-agree`) || '').split(',').filter(Boolean).map((f) => acceptedById(schemas, gold, readJsonl(f), name));
  const items = candidates(schemas, gold, readJsonl(PREDS), name).map((c) => {
    const y = sameCommand(c.command, goldCommand(schemas, gold[c.i]), c.request);
    return { p: scores ? scores.get(String(c.id)) ?? -1 : 1, y, ya: adjudicatedY(y, c.id, c.command, ADJ), route: c.route,
      agree: agreeCount(c.id, c.command, c.request, others) };
  });
  const missing = items.filter((x) => x.p < 0).length;
  return { name, nOthers: others.length, n: gold.length, goldOk: gold.filter((r) => r.label === 'ok').length, items, missing };
}

function at(S, t, a = 0) {
  const kept = S.items.filter((x) => keeps(x, a, t)); // t = -Infinity (gate_only) keeps unscored too
  const wrong = kept.filter((x) => !x.y).length, right = kept.length - wrong;
  const abst = S.n - kept.length;
  // positives for abstention: rows without a correct accepted candidate (gold not ok, generator wrong, or none)
  const shouldAbstain = S.n - S.items.filter((x) => x.y).length;
  const abstTrue = shouldAbstain - wrong; // abstained rows that had no correct candidate
  return {
    t: t === -Infinity ? 0 : t === Infinity ? 'none' : r4(t), kept: kept.length, correct: right, wrong,
    coverage: pct(right, S.goldOk), accepted_wrong_rate: pct(wrong, kept.length), accepted_wrong_ub95: pct(cpUpper(wrong, kept.length), 1),
    abstain_precision: pct(abstTrue, abst), abstain_recall: pct(abstTrue, shouldAbstain),
    ...(a ? { min_agree: a } : {}),
    correct_lost: S.items.filter((x) => x.y && !keeps(x, a, t)).length,
    ...(ADJ ? adjAt(kept) : {}),
  };
}

function adjAt(kept) {
  const w = kept.filter((x) => !x.ya).length;
  return { adj_wrong: w, adj_accepted_wrong_rate: pct(w, kept.length), adj_accepted_wrong_ub95: pct(cpUpper(w, kept.length), 1) };
}

// lowest threshold (max kept) whose criterion holds on dev; unscored candidates (p = -1) are never kept and never a
// threshold; a threshold must keep at least MIN_KEPT dev rows (a handful of kept rows is noise, not a rate)
const MIN_KEPT = Number(opt('min-kept', 200));
function choose(S, crit) {
  const ts = [...new Set(S.items.map((x) => x.p).filter((p) => p >= 0))].sort((a, b) => a - b);
  for (const t of ts) {
    const kept = S.items.filter((x) => x.p >= t), wrong = kept.filter((x) => !x.y).length;
    if (kept.length < MIN_KEPT) break;
    if (crit(wrong, kept.length)) return t;
  }
  return Infinity;
}

const AGREE_ONLY = !opt('dev-scores') && !!opt('dev-agree');
const dev = load('dev'), test = load('test');
if (!dev) { console.error('usage: score_combined.mjs --dev-data D --dev-preds P (--dev-scores S | --dev-agree P1,..) [--test-data ... --test-preds ... --test-scores ... --test-agree ...]'); process.exit(2); }
const thr = AGREE_ONLY ? {} : {
  by_upper_bound: choose(dev, (w, k) => cpUpper(w, k) <= TARGET),
  by_point: choose(dev, (w, k) => w / k <= TARGET),
};
const report = { target_pct: TARGET * 100, thresholds: Object.fromEntries(Object.entries(thr).map(([k, v]) => [k, v === Infinity ? 'none' : r4(v)])) };
const N = dev.nOthers;
const SWEEP_T = AGREE_ONLY ? [-Infinity] : [-Infinity, 0.5, 0.7, 0.8, 0.9, 0.95, 0.98, 0.99];
const grid = N ? {
  by_upper_bound: chooseGrid(dev.items, N, (w, k) => cpUpper(w, k) <= TARGET, MIN_KEPT, !AGREE_ONLY),
  by_point: chooseGrid(dev.items, N, (w, k) => w / k <= TARGET, MIN_KEPT, !AGREE_ONLY),
} : null;
if (grid) report.agreement_settings = Object.fromEntries(Object.entries(grid).map(([k, v]) => [k, v ? { min_agree: v.min_agree, t: v.t === -Infinity ? 0 : r4(v.t) } : 'none']));
for (const S of [dev, test].filter(Boolean)) {
  if (grid) {
    if (S.nOthers !== N) throw new Error(`${S.name}: ${S.nOthers} agreeing models, dev has ${N}`);
    const pick = (g) => (g ? at(S, g.t, g.min_agree) : at(S, Infinity));
    report[S.name] = { agreement: { models: N, by_upper_bound: pick(grid.by_upper_bound), by_point: pick(grid.by_point),
      sweep: Array.from({ length: N + 1 }, (_, a) => SWEEP_T.map((t) => ({ min_agree: a, ...at(S, t, a) }))).flat() } };
  }
  if (AGREE_ONLY) { Object.assign(report[S.name], { rows: S.n, gold_ok: S.goldOk, accepted_candidates: S.items.length, gate_only: at(S, -Infinity) }); continue; }
  report[S.name] = { ...report[S.name],
    rows: S.n, gold_ok: S.goldOk, accepted_candidates: S.items.length, missing_scores: S.missing,
    verifier: { auc: r4(auc(S.items.filter((x) => x.p >= 0))), ece: r4(ece(S.items.filter((x) => x.p >= 0))) },
    gate_only: at(S, -Infinity),
    by_upper_bound: at(S, thr.by_upper_bound),
    by_point: at(S, thr.by_point),
    sweep: [0.5, 0.7, 0.8, 0.9, 0.95, 0.98, 0.99].map((t) => at(S, t)),
  };
}
const text = JSON.stringify(report, null, 1);
if (opt('out')) fs.writeFileSync(opt('out'), text);
console.log(text);
