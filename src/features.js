// Feature extraction for all models. This is the single source of truth: scripts/gen_data.js uses
// these same functions to featurise the training data that scripts/train.py fits, so training and
// inference can never drift apart (test/parity.test.js checks the exported weights reproduce Python).
import { KNOWN_EXT, KNOWN_PROCS, KNOWN_SERVICES, foldKeepLength } from './slots.js';

export const STEM_LEN = 5;
export const CHAR_MIN = 3;
export const CHAR_MAX = 5;

// lowercase, fold Polish/Latin diacritics, digits -> 0, keep [a-z0-9] tokens
export function normalize(text) {
  let s = String(text).toLowerCase().replace(/ł/g, 'l');
  s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  s = s.replace(/[0-9]+/g, '0');
  s = s.replace(/[^a-z0-9]+/g, ' ').trim();
  return s;
}

export function tokenize(text) {
  const s = normalize(text);
  return s ? s.split(' ') : [];
}

const stem = (t) => (t.length > STEM_LEN ? t.slice(0, STEM_LEN) : t);

// FNV-1a 32-bit over UTF-16 code units (feature names are ASCII after normalisation)
export function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i) & 0xff;
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Returns { words, chars } — feature names before hashing.
export function featureNames(text) {
  const toks = tokenize(text);
  const words = [];
  const chars = [];
  const stems = toks.map(stem);
  for (let i = 0; i < stems.length; i++) {
    words.push('w:' + stems[i]);
    if (i + 1 < stems.length) words.push('b:' + stems[i] + '_' + stems[i + 1]);
  }
  for (const t of toks) {
    const p = ' ' + t + ' ';
    for (let n = CHAR_MIN; n <= CHAR_MAX; n++) {
      for (let i = 0; i + n <= p.length; i++) chars.push('c:' + p.slice(i, i + n));
    }
  }
  return { words, chars };
}

/**
 * Sparse classifier vector: Map<hashIndex, value>. Blocks (words, chars, extras) are counted then
 * L2-normalised separately. `extras` are context tokens such as `shell=bash`, `os=linux`,
 * `ctx_tool=docker` (shell/OS/history features).
 */
export function vectorize(text, dim, extras = []) {
  const { words, chars } = featureNames(text);
  const out = new Map();
  const blocks = [words, chars];
  if (extras.length) blocks.push(extras.map((e) => 'x:' + e));
  for (const block of blocks) {
    const counts = new Map();
    for (const f of block) {
      const idx = fnv1a(f) % dim;
      counts.set(idx, (counts.get(idx) || 0) + 1);
    }
    let norm = 0;
    for (const v of counts.values()) norm += v * v;
    norm = Math.sqrt(norm) || 1;
    for (const [k, v] of counts) out.set(k, (out.get(k) || 0) + v / norm);
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// Token-level features for the BIO slot tagger.

const QUOTE_CHARS = `"'„“”\``;

/**
 * Split text into tokens with character offsets. Whitespace separates tokens; quote characters,
 * brackets and sentence punctuation at token edges become their own tokens; a trailing "." is
 * split off unless the token is a path-like "." / ".." / "x.y".
 */
export function tagTokens(text) {
  const toks = [];
  const re = /\S+/g;
  let m;
  while ((m = re.exec(text))) {
    let s = m.index;
    let w = m[0];
    const pre = [];
    const post = [];
    // peel leading punctuation/quotes
    while (w.length > 1 && /^[(\[{,;!?"'„“”`]/.test(w)) { pre.push([s, w[0]]); s++; w = w.slice(1); }
    // peel trailing punctuation/quotes and sentence dots
    for (;;) {
      if (w.length > 1 && /[)\]},;:!?"'„“”`]$/.test(w)) { post.unshift([s + w.length - 1, w.slice(-1)]); w = w.slice(0, -1); continue; }
      if (w.length > 1 && /\.$/.test(w) && !/^\.+$/.test(w) && !/\.\.$/.test(w)) { post.unshift([s + w.length - 1, '.']); w = w.slice(0, -1); continue; }
      break;
    }
    for (const [i, c] of pre) toks.push({ text: c, start: i, end: i + 1 });
    toks.push({ text: w, start: s, end: s + w.length });
    for (const [i, c] of post) toks.push({ text: c, start: i, end: i + 1 });
  }
  return toks;
}

const fold = (w) => foldKeepLength(w).toLowerCase();
function shape(w) {
  let s = '';
  for (const ch of w) {
    const c = /\p{Lu}/u.test(ch) ? 'X' : /\p{Ll}/u.test(ch) ? 'x' : /\d/.test(ch) ? 'd' : ch;
    if (s[s.length - 1] !== c || !/[Xxd]/.test(c)) s += c;
  }
  return s.slice(0, 8);
}
const NUM_WORD = /^(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|dozen|jeden|jedna|dwa|dwie|trzy|cztery|piec|pieciu|szesc|siedem|osiem|dziewiec|dziesiec|dziesieciu|pietnascie|dwadziescia|\w+nascie|\w+nastu)$/;
const TIME_UNIT = /^(min\w*|minut\w*|godz\w*|hours?|hrs?|h|dni|dnia|dzien|days?|dob\w*|tydzien|tygodni\w*|weeks?|miesi\w*|months?|lat|rok\w*|years?|ago|temu|yesterday|wczoraj\w*|today|dzis\w*)$/;
const SIZE_UNIT = /^(\d+([.,]\d+)?)?(k|m|g|t)i?b?$|^(kb|mb|gb|tb|bytes?|bajt\w*|mega\w*|giga\w*|kilo\w*)$/;
const LOC_WORD = /^(home|domow\w*|downloads?|pobran\w*|desktop|pulpi\w*|documents|dokument\w*|root|current|biezac\w*|here|tutaj|tu|everywhere|wszedzie|katalog\w*|folder\w*|directory|dir)$/;

/** Feature names for token i (binary features). `tool` is the stage-2 family (input feature). */
export function tokenFeatureNames(toks, i, tool) {
  const w = toks[i].text;
  const lw = fold(w);
  const at = (k) => (toks[k] ? fold(toks[k].text) : k < 0 ? '<s>' : '</s>');
  const st = (x) => (x.length > STEM_LEN ? x.slice(0, STEM_LEN) : x);
  const f = ['b', 'w=' + lw, 'st=' + st(lw), 'sh=' + shape(w), 'p2=' + lw.slice(0, 2), 's3=' + lw.slice(-3),
    'w-1=' + at(i - 1), 'w+1=' + at(i + 1), 'w-2=' + st(at(i - 2)), 'w+2=' + st(at(i + 2)),
    'bg-=' + st(at(i - 1)) + '|' + st(lw), 'bg+=' + st(lw) + '|' + st(at(i + 1)),
    'T=' + tool, 'T|w=' + tool + '|' + st(lw), 'T|w-1=' + tool + '|' + st(at(i - 1))];
  // inside quotes?
  let q = 0;
  for (let k = 0; k < i; k++) if (QUOTE_CHARS.includes(toks[k].text)) q ^= 1;
  if (q) f.push('inq');
  if (toks[i - 1] && QUOTE_CHARS.includes(toks[i - 1].text)) f.push('q-1');
  if (toks[i + 1] && QUOTE_CHARS.includes(toks[i + 1].text)) f.push('q+1');
  if (i === 0) f.push('first');
  if (i === toks.length - 1) f.push('last');
  if (w.includes('/')) f.push('has/');
  if (/^~/.test(w)) f.push('tilde');
  if (/^\.{1,2}\//.test(w) || w === '.' || w === '..') f.push('dotpath');
  if (/\w\.\w/.test(w)) f.push('hasdot');
  if (/^\*?\.[a-z0-9]{1,6}$/i.test(w)) f.push('dotext');
  if (/^-/.test(w)) f.push('dash');
  if (/^\d+$/.test(w)) f.push(w.length <= 2 ? 'num12' : w.length <= 4 ? 'num34' : 'num5+');
  else if (/\d/.test(w)) f.push('hasdigit');
  if (/[A-Z]/.test(w.slice(1))) f.push('innerupper');
  if (/^[A-Z_][A-Z0-9_]+$/.test(w)) f.push('allcaps');
  if (w.includes('@')) f.push('at');
  if (/:\d+$/.test(w)) f.push('colonnum');
  if (/^\w+:\/\//.test(w) || /^www\./.test(w)) f.push('url');
  if (/^[0-7]{3,4}$/.test(w) || /^[ugoa]*[+=-][rwxXst]+$/.test(w)) f.push('modeish');
  if (/[_-]/.test(w) && /\w/.test(w)) f.push('hyphen');
  if (KNOWN_PROCS.has(lw)) f.push('gz=proc');
  if (KNOWN_SERVICES.has(lw)) f.push('gz=svc');
  if (KNOWN_EXT.has(lw.replace(/^\*?\./, ''))) f.push('gz=ext');
  if (NUM_WORD.test(lw)) f.push('gz=numw');
  if (TIME_UNIT.test(lw)) f.push('gz=tunit');
  if (SIZE_UNIT.test(lw)) f.push('gz=sunit');
  if (LOC_WORD.test(lw)) f.push('gz=loc');
  return f;
}

/** Hashed indices of tagger features for every token. */
export function tagFeatures(toks, tool, dim) {
  return toks.map((_, i) => tokenFeatureNames(toks, i, tool).map((n) => fnv1a(n) % dim));
}
