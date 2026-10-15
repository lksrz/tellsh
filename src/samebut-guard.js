// A "same but …" follow-up, or any follow-up with a negation ("again but without deleting it", "don't remove it"), never
// turns the previous command into a different, riskier intent, whichever path resolved it (the same-but rule, a pronoun,
// a place word): `same but no discard` after `git status` is not `git restore .`, and `again but without deleting it`
// after `cat config.txt` is not `rm config.txt`. Such a request is refused. A plain "delete it" is not affected.
import { BY_ID } from './catalog.js';
import { sameBut } from './history.js';

const NEGATION = /(?<![\p{L}\d_])(?:without|not|no|never|don'?t|do not|dont|bez|nie)(?![\p{L}\d_])/iu;
/** The previous command's intent when the request is a same-but or a negated follow-up (whitespace folded), else
 * undefined. A previous command tellsh could not classify (`Get-Content x`) counts as UNKNOWN (ranked safe) when the
 * request refers to it (`referred`: a pronoun / place reference was resolved). */
export const UNKNOWN = '__unknown__';
export function sameButOrNegated(query, ctx, referred = false) {
  if (!ctx) return undefined;
  const q = String(query).replace(/\s+/g, ' ').trim();
  if (!(NEGATION.test(q) || (ctx.last && sameBut(q, ctx)))) return undefined;
  return ctx.last?.intent || (referred ? UNKNOWN : undefined);
}

const RANK = { safe: 0, medium: 1, high: 2 };
const rank = (id) => (id === UNKNOWN ? 0 : RANK[BY_ID[id]?.risk] ?? 2);

export function sameButRiskGuard(res) {
  const last = res?.context?.sameButLast;
  if (!last || !res.intent || res.intent === last || rank(res.intent) <= rank(last)) return res;
  return { ...res, understood: false, method: 'history-rule', confidence: 0, candidates: [], tools: [], command: null, missing: [],
    context: { ...res.context, rule: 'refused' }, hint: `this follow-up would turn ${last === UNKNOWN ? 'the previous command' : last} into the riskier ${res.intent}: ask for it directly` };
}
