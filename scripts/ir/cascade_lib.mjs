// adjudicate.mjs --backend cascade (Jev on every row, Opus on flagged + an audit sample) and the score_combined.mjs
// --adj-strata estimator. Pure helpers only.

// ---------------------------------------------------------------- stats
// O(k): pmf(i + 1) = pmf(i) * (n - i) / (i + 1) * p / (1 - p), in log space from pmf(0)
function binomCdf(k, n, p) {
  if (p <= 0) return 1;
  if (p >= 1) return k >= n ? 1 : 0;
  let l = n * Math.log(1 - p), s = Math.exp(l);
  const r = Math.log(p) - Math.log(1 - p);
  for (let i = 0; i < k; i++) { l += Math.log(n - i) - Math.log(i + 1) + r; s += Math.exp(l); }
  return Math.min(1, s);
}
// one-sided (1 - alpha) Clopper-Pearson upper bound of a proportion k / n
export function cpUpper(k, n, alpha = 0.05) {
  if (n === 0) return 1;
  if (k >= n) return 1;
  let lo = k / n, hi = 1;
  for (let it = 0; it < 60; it++) { const mid = (lo + hi) / 2; if (binomCdf(k, n, mid) > alpha) lo = mid; else hi = mid; }
  return hi;
}

// seeded LCG (same as adjudicate.mjs --sample-agree)
export function lcg(seed) { let s = seed; return () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648); }
const shuffled = (xs, rand) => xs.map((x) => [rand(), x]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);

export const auditSize = (nPassed, frac, min, max) => Math.min(nPassed, Math.max(min, Math.min(max, Math.round(frac * nPassed))));

// jev p per row (null = Jev failed -> flagged) -> stratum per row:
//   flagged (p < threshold, Opus), flagged_jev_only (flagged beyond --max-opus, Jev verdict), audit (passed, Opus), passed (Jev)
export function cascadeStrata(ps, { threshold, maxOpus = 600, audit = 0.05, auditMin = 50, auditMax = 200, seed = 1 }) {
  const rand = lcg(seed);
  const idx = ps.map((_, i) => i);
  const flagged = idx.filter((i) => !(ps[i] >= threshold)), passed = idx.filter((i) => ps[i] >= threshold);
  const out = new Array(ps.length).fill('passed');
  const fl = flagged.length > maxOpus ? shuffled(flagged, rand) : flagged;
  fl.forEach((i, k) => (out[i] = k < maxOpus ? 'flagged' : 'flagged_jev_only'));
  for (const i of shuffled(passed, rand).slice(0, auditSize(passed.length, audit, auditMin, auditMax))) out[i] = 'audit';
  return out;
}

// final cascade records (stratum, judge, jev_pred_correct, pred_correct) -> summary block
export function cascadeSummary(recs) {
  const by = (s) => recs.filter((r) => r.stratum === s);
  const ok = (r) => !r.error && typeof r.pred_correct === 'boolean';
  const strata = Object.fromEntries(['flagged', 'flagged_jev_only', 'audit', 'passed'].map((s) => [s, by(s).length]));
  const aud = by('audit').filter((r) => ok(r) && r.judge === 'opus'), miss = aud.filter((r) => !r.pred_correct).length;
  const fl = by('flagged').filter((r) => ok(r) && r.judge === 'opus'), over = fl.filter((r) => r.pred_correct).length;
  const r4 = (x) => (x == null ? null : +x.toFixed(4));
  return {
    strata, judge: { opus: recs.filter((r) => r.judge === 'opus').length, jev: recs.filter((r) => r.judge === 'jev').length, error: recs.filter((r) => r.error).length },
    audit: { n: aud.length, miss, miss_rate: aud.length ? r4(miss / aud.length) : null, miss_ub95: r4(cpUpper(miss, aud.length)) },
    flagged_opus: { n: fl.length, overturned: over, overturn_rate: fl.length ? r4(over / fl.length) : null },
  };
}

// audit miss counts from loaded cascade adjudications (Map id -> rec)
export function auditStats(adj) {
  let n = 0, miss = 0;
  for (const r of adj.values()) if (r.stratum === 'audit' && r.judge === 'opus' && typeof r.pred_correct === 'boolean') { n++; if (!r.pred_correct) miss++; }
  return { n, miss, rate: n ? miss / n : null, ub95: cpUpper(miss, n) };
}

// score_combined --adj-strata: kept items {id, command, ya} -> wrong estimate. Unaudited Jev-passed kept rows (their
// cascade record is stratum passed, same command) count as audit.rate wrong each instead of their (correct) Jev
// verdict; every other kept row counts by ya (Opus-confirmed, flagged_jev_only = Jev wrong, unadjudicated = raw y).
// adj_ub95_est = CP UB of the observed wrongs over all kept + unaudited count x audit-miss UB (a union-bound style
// conservative sum, each term at 95%, so jointly >= 90% and in practice wider).
export function strataEstimate(kept, adj, audit) {
  let obs = 0, u = 0;
  for (const x of kept) {
    const a = adj.get(String(x.id));
    if (a && a.command === x.command && a.stratum === 'passed' && a.judge === 'jev') u++;
    else if (!x.ya) obs++;
  }
  const n = kept.length, rate = audit.rate ?? 0;
  const est = obs + u * rate, ub = n ? cpUpper(obs, n) * n + u * audit.ub95 : 0;
  const pct = (a) => (n ? +((100 * a) / n).toFixed(3) : null);
  return { adj_wrong_obs: obs, jev_unaudited_kept: u, adj_wrong_est: +est.toFixed(2), adj_wrong_est_rate: pct(est), adj_ub95_est: pct(Math.min(n, ub)) };
}
