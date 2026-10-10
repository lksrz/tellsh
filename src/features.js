// Feature extraction shared (bit-for-bit) with scripts/features.py.
// Any change here MUST be mirrored there; test/parity.test.js checks it.

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

// FNV-1a 32-bit over ASCII (features are ASCII-only after normalize)
export function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Returns { words: string[], chars: string[] } — feature names before hashing.
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

// Sparse vector: Map<hashIndex, value>. Each block (words, chars) is counted then L2-normalised separately.
export function vectorize(text, dim) {
  const { words, chars } = featureNames(text);
  const out = new Map();
  for (const block of [words, chars]) {
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
