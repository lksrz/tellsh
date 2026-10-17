// Ensemble-agreement helpers for score_combined.mjs: per accepted candidate of the main model, count how many other
// models' own gate-accepted commands (same PD route assembly, make_candidates.candidates) are sameCommand-equal to it,
// and choose (min_agree, verifier threshold) on dev.
import { candidates } from './make_candidates.mjs';
import { sameCommand } from './equiv.mjs';

// id -> accepted command of one model's predictions on a split
export function acceptedById(schemas, gold, preds, split) {
  return new Map(candidates(schemas, gold, preds, split).map((c) => [String(c.id), c.command]));
}

// number of other models (Maps id -> command) whose accepted command equals `command` for row `id`
export function agreeCount(id, command, request, others) {
  let n = 0;
  for (const m of others) {
    const c = m.get(String(id));
    if (c != null && sameCommand(c, command, request)) n++;
  }
  return n;
}

// item = {p, y, agree}; t = -Infinity keeps unscored items too (gate / agreement only)
export const keeps = (x, a, t) => (x.agree ?? 0) >= a && (t === -Infinity || (x.p >= 0 && x.p >= t));

// max kept rows over the (min_agree in 0..N) x threshold grid subject to crit(wrong, kept) and kept >= minKept;
// ties go to the lower min_agree. Thresholds: every scored p when useScores (unscored = rejected), else only
// -Infinity (agreement-only mode).
export function chooseGrid(items, N, crit, minKept, useScores = true) {
  const ts = useScores ? [...new Set(items.map((x) => x.p).filter((p) => p >= 0))].sort((a, b) => a - b) : [-Infinity];
  let best = null;
  for (let a = 0; a <= N; a++) {
    for (const t of ts) {
      const kept = items.filter((x) => keeps(x, a, t)), wrong = kept.filter((x) => !x.y).length;
      if (kept.length < minKept) break;
      if (crit(wrong, kept.length)) { if (!best || kept.length > best.kept) best = { min_agree: a, t, kept: kept.length }; break; }
    }
  }
  return best;
}

// --dump-setting: the named n-best setting, else by_coverage_50 (an unknown name or a 'none' / null setting warns)
export function dumpSetting(nbSet, name, warn = (m) => console.error(m)) {
  if (!(name in nbSet)) warn(`--dump-setting ${name}: unknown (have ${Object.keys(nbSet).join(', ')}); using by_coverage_50`);
  else if (!nbSet[name]) warn(`--dump-setting ${name}: no setting on dev ('none'); using by_coverage_50`);
  return nbSet[name] || nbSet.by_coverage_50 || null;
}
