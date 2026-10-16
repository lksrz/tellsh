// Pointer-unit segmenter (docs/IR.md §4.1) and span text resolution.
// Units split only at whitespace; quoted/backticked strings are atomic (may contain spaces);
// a trailing , ; ! ? (or . / : at the end of a token) becomes its own unit.

const QUOTES = new Set(["'", '"', '`']);
const TRAIL = /[,;!?.:]$/;

// Returns { text, units: [{s, e, t}] } with [s, e) char offsets into the ORIGINAL request text:
// span values are byte-exact slices of what the user typed (§4.1). NFC is applied only where words
// are compared (cue / lexicon matching: see unitWord).
export function segment(request) {
  const text = String(request);
  const units = [];
  let i = 0;
  const n = text.length;
  while (i < n) {
    if (/\s/.test(text[i])) { i++; continue; }
    if (QUOTES.has(text[i])) {
      const close = text.indexOf(text[i], i + 1);
      if (close > i + 1) {
        units.push({ s: i, e: close + 1, t: text.slice(i, close + 1) });
        i = close + 1; // anything glued after the closing quote starts a new token
        continue;
      }
    }
    let j = i;
    while (j < n && !/\s/.test(text[j])) j++;
    pushToken(units, text, i, j);
    i = j;
  }
  return { text, units };
}

function pushToken(units, text, s, e) {
  if (e - s > 1 && TRAIL.test(text[e - 1]) && !QUOTES.has(text[s])) {
    units.push({ s, e: e - 1, t: text.slice(s, e - 1) });
    units.push({ s: e - 1, e, t: text[e - 1] });
  } else units.push({ s, e, t: text.slice(s, e) });
}

// A unit's text for word matching: NFC + lower case.
export const unitWord = (u) => u.t.normalize('NFC').toLowerCase();

// True when the unit is one atomic quoted/backticked string.
export const isQuotedUnit = (u) => u.t.length >= 2 && QUOTES.has(u.t[0]) && u.t[u.t.length - 1] === u.t[0];

// Text of the half-open unit range [a, b): request[charStart(a) : charEnd(b-1)]. The enclosing
// quotes/backticks are trimmed only when the span is exactly one quoted unit; a multi-unit span keeps
// its raw text (`'foo' or 'bar'` never becomes `foo' or 'bar`).
export function spanText(seg, [a, b]) {
  const { text, units } = seg;
  if (!(a >= 0 && b > a && b <= units.length)) throw new RangeError(`span [${a},${b}) outside ${units.length} units`);
  if (b - a === 1 && isQuotedUnit(units[a])) return units[a].t.slice(1, -1);
  return text.slice(units[a].s, units[b - 1].e);
}
