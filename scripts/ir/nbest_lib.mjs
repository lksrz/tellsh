// N-best D routing (ml/ir/eval.py --nbest K writes d.nbest = [{actions, logp, ptr_logp, score}, ...], best first).
// The D candidate is the first gate-accepted hypothesis in rank order; alongside it:
//   rank   index of that hypothesis in d.nbest (0 = the beam's best)
//   margin its score minus the score of the next lower-ranked hypothesis whose command differs (sameCommand; a
//          hypothesis that does not compile / is rejected counts as different); NO_MARGIN when there is none
//   agree  beam agreement: softmax mass (over logp + ptr_logp of all hypotheses) on hypotheses whose accepted command
//          is sameCommand-equal to the chosen one, in [0, 1]
// Rows without d.nbest keep the greedy d.actions (rank 0, margin / agree null).
// Pure helpers: the caller injects compile(actions) -> command | null and same(a, b) -> bool.

export const NO_MARGIN = 99;

// d = pred.d -> {command, actions, rank, margin, agree} (command null when nothing is accepted; actions = the
// chosen hypothesis, or the best one when none is accepted)
export function selectD(d, compile, same) {
  const hyps = d?.nbest;
  if (!Array.isArray(hyps) || !hyps.length) {
    const command = d?.actions ? compile(d.actions) : null;
    return { command, actions: d?.actions ?? null, rank: 0, margin: null, agree: null };
  }
  const cmds = hyps.map((h) => { try { return compile(h.actions); } catch { return null; } });
  const rank = cmds.findIndex((c) => c != null);
  if (rank < 0) return { command: null, actions: hyps[0].actions, rank: null, margin: null, agree: null };
  const command = cmds[rank];
  const sc = (h) => h.score ?? h.logp ?? 0;
  let margin = NO_MARGIN;
  for (let j = rank + 1; j < hyps.length; j++) {
    if (cmds[j] == null || !same(cmds[j], command)) { margin = sc(hyps[rank]) - sc(hyps[j]); break; }
  }
  const tot = hyps.map((h) => (h.logp ?? 0) + (h.ptr_logp ?? 0));
  const mx = Math.max(...tot);
  let z = 0, on = 0;
  tot.forEach((t, j) => { const w = Math.exp(t - mx); z += w; if (cmds[j] != null && same(cmds[j], command)) on += w; });
  return { command, actions: hyps[rank].actions, rank, margin: +margin.toFixed(4), agree: +(on / z).toFixed(4) };
}

// n-best acceptance knobs; P-route candidates (rank null / undefined) always pass
export const nbestKeeps = (x, k) => x.rank == null
  || ((k.max_rank == null || x.rank <= k.max_rank)
    && (k.min_margin == null || (x.margin ?? NO_MARGIN) >= k.min_margin)
    && (k.min_agree == null || (x.nb_agree ?? 1) >= k.min_agree));

// candidate grid of knob settings from the dev items (ranks seen, agreement / margin cut points)
export function nbestGrid(items) {
  const d = items.filter((x) => x.rank != null);
  const maxR = d.reduce((m, x) => Math.max(m, x.rank), 0);
  const ranks = [...new Set([0, 1, 2, 3, maxR])].filter((r) => r <= maxR);
  const agrees = [0, 0.5, 0.7, 0.8, 0.9, 0.95];
  const margins = [0, 0.05, 0.1, 0.2, 0.5, 1];
  const out = [];
  for (const max_rank of ranks) for (const min_agree of agrees) for (const min_margin of margins) out.push({ max_rank, min_agree, min_margin });
  return out;
}

// max kept items over the knob grid x verifier threshold subject to crit(wrong, kept), kept >= minKept.
// items = {p, y, rank, margin, nb_agree}; thresholds: every scored p when useScores, else -Infinity (gate only).
export function chooseNbest(items, crit, minKept, useScores = true) {
  const ts = useScores ? [...new Set(items.map((x) => x.p).filter((p) => p >= 0))].sort((a, b) => a - b) : [-Infinity];
  let best = null;
  for (const k of nbestGrid(items)) {
    const pool = items.filter((x) => nbestKeeps(x, k));
    for (const t of ts) {
      const kept = pool.filter((x) => t === -Infinity || (x.p >= 0 && x.p >= t)), wrong = kept.filter((x) => !x.y).length;
      if (kept.length < minKept) break;
      if (crit(wrong, kept.length)) { if (!best || kept.length > best.kept) best = { ...k, t, kept: kept.length }; break; }
    }
  }
  return best;
}
