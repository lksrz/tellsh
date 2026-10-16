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

// n-best acceptance knobs {max_rank, min_margin, min_beam_agree}; P-route candidates (rank null / undefined) always pass
export const nbestKeeps = (x, k) => x.rank == null
  || ((k.max_rank == null || x.rank <= k.max_rank)
    && (k.min_margin == null || (x.margin ?? NO_MARGIN) >= k.min_margin)
    && (k.min_beam_agree == null || (x.nb_agree ?? 1) >= k.min_beam_agree));

// knob grid from the dev items: ranks seen x ensemble min_agree 0..N x beam-agreement / margin cut points
export function nbestGrid(items, N = 0) {
  const maxR = items.reduce((m, x) => (x.rank != null ? Math.max(m, x.rank) : m), 0);
  const ranks = [...new Set([0, 1, 2, 3, maxR])].filter((r) => r <= maxR).sort((a, b) => a - b);
  const out = [];
  for (const max_rank of ranks) for (let min_agree = 0; min_agree <= N; min_agree++)
    for (const min_beam_agree of [0, 0.5, 0.8, 0.9]) for (const min_margin of [0, 0.1, 0.5]) out.push({ max_rank, min_agree, min_beam_agree, min_margin });
  return out;
}

// every grid setting x threshold t -> {knobs, t, kept, wrong, adj_wrong, correct, adj_correct}
// items = {p, y, ya, agree, rank, margin, nb_agree}; t = -Infinity keeps unscored items too (gate only)
export function nbestEval(items, N, ts) {
  const rows = [];
  for (const k of nbestGrid(items, N)) {
    const pool = items.filter((x) => (x.agree ?? 0) >= k.min_agree && nbestKeeps(x, k));
    for (const t of ts) {
      let kept = 0, wrong = 0, adjWrong = 0;
      for (const x of pool) if (t === -Infinity || (x.p >= 0 && x.p >= t)) { kept++; if (!x.y) wrong++; if (!(x.ya ?? x.y)) adjWrong++; }
      rows.push({ ...k, t, kept, wrong, adj_wrong: adjWrong, correct: kept - wrong, adj_correct: kept - adjWrong });
    }
  }
  return rows;
}

// max kept row with crit(wrong, kept) and kept >= minKept (adj: adjudicated wrong counts); null when none
export function pickMaxKept(rows, crit, minKept, adj = false) {
  let best = null;
  for (const r of rows) if (r.kept >= minKept && crit(adj ? r.adj_wrong : r.wrong, r.kept) && (!best || r.kept > best.kept)) best = r;
  return best;
}

// lowest ub(wrong, kept) row whose coverage (correct / goldOk) >= floor; ties -> more kept; null when none
export function pickByCoverage(rows, floor, goldOk, ub, adj = false) {
  let best = null, bestU = Infinity;
  for (const r of rows) {
    if (!r.kept || (adj ? r.adj_correct : r.correct) < floor * goldOk) continue;
    const u = ub(adj ? r.adj_wrong : r.wrong, r.kept);
    if (u < bestU || (u === bestU && r.kept > best.kept)) { best = r; bestU = u; }
  }
  return best;
}
