// A "same but …" follow-up never turns the previous command into a different, riskier intent, whichever path resolved
// it (the same-but rule, a pronoun, a place word): `same but no discard` after `git status` is not `git restore .`, and
// `same but without deleting it` after `cat config.txt` is not `rm config.txt`. Such a request is refused.
import { BY_ID } from './catalog.js';

const RANK = { safe: 0, medium: 1, high: 2 };
const rank = (id) => RANK[BY_ID[id]?.risk] ?? 2;

export function sameButRiskGuard(res) {
  const last = res?.context?.sameButLast;
  if (!last || !res.intent || res.intent === last || rank(res.intent) <= rank(last)) return res;
  return { ...res, understood: false, method: 'history-rule', confidence: 0, candidates: [], tools: [], command: null, missing: [],
    context: { ...res.context, rule: 'refused' }, hint: `"same but" would turn ${last} into the riskier ${res.intent}: ask for it directly` };
}
