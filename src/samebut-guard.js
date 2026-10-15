// A "same but …" follow-up never turns the previous command into a different, riskier intent, whichever path resolved
// it (the same-but rule, a pronoun, a place word): `same but no discard` after `git status` is not `git restore .`, and
// `same but without deleting it` after `cat config.txt` is not `rm config.txt`. Such a request is refused. Repeat
// phrasings anchored at the start and followed by "but"/"ale" ("again but …", "repeat it but …", "jeszcze raz, ale …")
// get the same guard (guard only: they are not applied as modifiers); a plain "delete it" is not affected.
import { BY_ID } from './catalog.js';
import { sameBut } from './history.js';

/** The previous command's intent when the request is a same-but follow-up (whitespace folded), else undefined; a previous
 * command tellsh could not classify counts as UNKNOWN (ranked safe). */
export const UNKNOWN = '__unknown__';
export function sameButLast(query, ctx) {
  if (!ctx) return undefined;
  // the pattern is checked even when the previous command was not classified (no ctx.last)
  const q = String(query).replace(/\s+/g, ' ').trim();
  return sameBut(q, { ...ctx, last: ctx.last || { slots: {} } }) || isRepeatBut(q) ? ctx.last?.intent || UNKNOWN : undefined;
}

// guard-only repeat phrasings: start of the request, then "but"/"ale" after a space or a comma/dash (diacritics folded)
const SEP = String.raw`(?:\s*[,;:–—-]\s*|\s+)`;
const EN = String.raw`^(?:(?:and|now|ok|okay|so|please)\s*,?\s+)*`;
const PL = String.raw`^(?:(?:a|i|ok|dobra|prosze)\s*,?\s+)*`;
const REPEAT_BUT = [
  String.raw`${EN}(?:(?:do|run)\s+(?:it|that|this|the\s+same)\s+)?(?:again|once\s+more|one\s+more\s+time)${SEP}but\b`,
  String.raw`${EN}(?:repeat|rerun|re-run|redo)(?:\s+(?:it|that|this|the\s+(?:last|previous)(?:\s+(?:one|command))?))?${SEP}but\b`,
  String.raw`${EN}(?:(?:just\s+)?like|as)\s+(?:before|last\s+time)${SEP}but\b`,
  String.raw`${EN}(?:do\s+)?the\s+same\s+again${SEP}but\b`,
  String.raw`${PL}(?:(?:zrob|uruchom|odpal)\s+(?:to\s+)?)?(?:jeszcze\s+raz|znowu|ponownie)(?:\s+to)?${SEP}ale\b`,
  String.raw`${PL}(?:powtorz|ponow)(?:\s+(?:to|ostatnie(?:\s+polecenie)?))?${SEP}ale\b`,
  String.raw`${PL}(?:tak\s+)?jak\s+(?:poprzednio|wczesniej|ostatnio)${SEP}ale\b`,
].map((src) => new RegExp(src));
const foldRepeat = (q) => String(q).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l').replace(/Ł/g, 'L').toLowerCase().replace(/\s+/g, ' ').trim();
export const isRepeatBut = (q) => REPEAT_BUT.some((re) => re.test(foldRepeat(q)));

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
