// A "same but …" follow-up never turns the previous command into a different, riskier intent, whichever path resolved
// it (the same-but rule, a pronoun, a place word): `same but no discard` after `git status` is not `git restore .`, and
// `same but without deleting it` after `cat config.txt` is not `rm config.txt`. Such a request is refused. Other
// phrasings ("again but without deleting it") are not recognised (README known limits); a plain "delete it" is not affected.
import { BY_ID } from './catalog.js';
import { sameBut } from './history.js';

/** The previous command's intent when the request is a same-but follow-up (whitespace folded), else undefined; a previous
 * command tellsh could not classify counts as UNKNOWN (ranked safe). */
export const UNKNOWN = '__unknown__';
export function sameButLast(query, ctx) {
  if (!ctx) return undefined;
  // the pattern is checked even when the previous command was not classified (no ctx.last)
  return sameBut(String(query).replace(/\s+/g, ' ').trim(), { ...ctx, last: ctx.last || { slots: {} } }) ? ctx.last?.intent || UNKNOWN : undefined;
}

const RANK = { safe: 0, medium: 1, high: 2 };
const rank = (id) => (id === UNKNOWN ? 0 : RANK[BY_ID[id]?.risk] ?? 2);

export function sameButRiskGuard(res) {
  const last = res?.context?.sameButLast;
  if (!last || !res.command) return res;
  // a composed command (no catalog intent) is never the answer to a same-but follow-up
  if (res.intent && res.method !== 'composed' && (res.intent === last || rank(res.intent) <= rank(last))) return res;
  return { ...res, understood: false, method: 'history-rule', confidence: 0, candidates: [], tools: [], command: null, missing: [],
    context: { ...res.context, rule: 'refused' }, hint: `this follow-up would turn ${last === UNKNOWN ? 'the previous command' : last} into the riskier ${res.method === 'composed' || !res.intent ? 'composed command' : res.intent}: ask for it directly` };
}
