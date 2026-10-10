"""Feature extraction — mirror of src/features.js. Keep both in sync (test/parity.test.js)."""
import math
import re
import unicodedata

STEM_LEN = 5
CHAR_MIN = 3
CHAR_MAX = 5

_COMBINING = re.compile(r'[̀-ͯ]')
_DIGITS = re.compile(r'[0-9]+')
_NONALNUM = re.compile(r'[^a-z0-9]+')


def normalize(text):
    s = str(text).lower().replace('ł', 'l')
    s = unicodedata.normalize('NFD', s)
    s = _COMBINING.sub('', s)
    s = _DIGITS.sub('0', s)
    s = _NONALNUM.sub(' ', s).strip()
    return s


def tokenize(text):
    s = normalize(text)
    return s.split(' ') if s else []


def _stem(t):
    return t[:STEM_LEN] if len(t) > STEM_LEN else t


def fnv1a(s):
    h = 0x811c9dc5
    for ch in s.encode('ascii'):
        h ^= ch
        h = (h * 0x01000193) & 0xFFFFFFFF
    return h


def feature_names(text):
    toks = tokenize(text)
    stems = [_stem(t) for t in toks]
    words, chars = [], []
    for i, st in enumerate(stems):
        words.append('w:' + st)
        if i + 1 < len(stems):
            words.append('b:' + st + '_' + stems[i + 1])
    for t in toks:
        p = ' ' + t + ' '
        for n in range(CHAR_MIN, CHAR_MAX + 1):
            for i in range(len(p) - n + 1):
                chars.append('c:' + p[i:i + n])
    return words, chars


def vectorize(text, dim):
    """dict index -> value; each block count-then-L2-normalised separately."""
    out = {}
    for block in feature_names(text):
        counts = {}
        for f in block:
            idx = fnv1a(f) % dim
            counts[idx] = counts.get(idx, 0) + 1
        norm = math.sqrt(sum(v * v for v in counts.values())) or 1.0
        for k, v in counts.items():
            out[k] = out.get(k, 0.0) + v / norm
    return out
