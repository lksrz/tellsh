// Stage 3: per-token BIO slot tagger (linear model over token features, tool as input feature),
// decoded with a constrained Viterbi: only tag types valid for the chosen tool are candidates and
// I-X may only follow B-X / I-X. Tagged spans are normalised with the regex parsers in slots.js.
import { tagTokens, tagFeatures } from './features.js';
import { logits } from './model.js';
import { extractSlots, KNOWN_EXT, EXT_ALIASES, KNOWN_PROCS, KNOWN_SERVICES, foldKeepLength, isStopWord, deinflect } from './slots.js';
import { familyTags } from './tools.js';
import { BY_ID } from './catalog.js';

let FAM_TAGS = null;
export const allowedTags = (tool) => {
  FAM_TAGS ??= familyTags(BY_ID);
  return FAM_TAGS[tool] || new Set(['PATH', 'NUM']);
};

/** -> { tokens, labels, spans: [{type, start, end, text}] } */
export function tag(text, tool, model) {
  const m = model.models.tagger;
  const toks = tagTokens(text);
  if (!toks.length || !m) return { tokens: toks, labels: [], spans: [] };
  const feats = tagFeatures(toks, tool, model.tagDim);
  const L = m.labels;
  const allowed = allowedTags(tool);
  const ok = L.map((l) => l === 'O' || allowed.has(l.slice(2)));
  const scores = feats.map((f) => {
    const z = logits(m, f);
    // log-softmax so Viterbi sums are comparable
    let max = -Infinity;
    for (let c = 0; c < z.length; c++) if (ok[c] && z[c] > max) max = z[c];
    let s = 0;
    for (let c = 0; c < z.length; c++) if (ok[c]) s += Math.exp(z[c] - max);
    const lse = max + Math.log(s);
    return Array.from(z, (v, c) => (ok[c] ? v - lse : -Infinity));
  });
  const n = toks.length;
  const C = L.length;
  const canFollow = (prev, cur) => {
    const lc = L[cur];
    if (!lc.startsWith('I-')) return true;
    if (prev < 0) return false;
    const lp = L[prev];
    return lp !== 'O' && lp.slice(2) === lc.slice(2);
  };
  const dp = Array.from({ length: n }, () => new Float64Array(C).fill(-Infinity));
  const bp = Array.from({ length: n }, () => new Int16Array(C).fill(-1));
  for (let c = 0; c < C; c++) if (canFollow(-1, c)) dp[0][c] = scores[0][c];
  for (let i = 1; i < n; i++) {
    for (let c = 0; c < C; c++) {
      if (scores[i][c] === -Infinity) continue;
      let best = -Infinity;
      let arg = -1;
      for (let p = 0; p < C; p++) {
        if (dp[i - 1][p] === -Infinity || !canFollow(p, c)) continue;
        if (dp[i - 1][p] > best) { best = dp[i - 1][p]; arg = p; }
      }
      if (arg >= 0) { dp[i][c] = best + scores[i][c]; bp[i][c] = arg; }
    }
  }
  let last = 0;
  for (let c = 1; c < C; c++) if (dp[n - 1][c] > dp[n - 1][last]) last = c;
  const path = new Array(n);
  path[n - 1] = last;
  for (let i = n - 1; i > 0; i--) path[i - 1] = bp[i][path[i]] >= 0 ? bp[i][path[i]] : 0;
  const labels = path.map((c) => L[c]);
  return { tokens: toks, labels, spans: snapToQuotes(text, labelsToSpans(text, toks, labels)) };
}

// a span inside a quoted string covers the whole string ('my file.txt' is one PATH, not two)
function snapToQuotes(text, spans) {
  const quoted = extractSlots(text).spans.filter((s) => s.type === 'QUOTED');
  if (!quoted.length) return spans;
  const out = [];
  for (const sp of spans) {
    const q = quoted.find((r) => sp.start < r.end && r.start < sp.end);
    if (!q) { out.push(sp); continue; }
    if (out.some((o) => o.start === q.start && o.end === q.end)) continue;
    out.push({ type: sp.type, start: q.start, end: q.end, text: text.slice(q.start, q.end), quoted: true });
  }
  return out;
}

export function labelsToSpans(text, toks, labels) {
  const spans = [];
  let cur = null;
  labels.forEach((l, i) => {
    if (l.startsWith('B-') || (l.startsWith('I-') && (!cur || cur.type !== l.slice(2)))) {
      if (cur) spans.push(cur);
      cur = { type: l.slice(2), start: toks[i].start, end: toks[i].end };
    } else if (l.startsWith('I-')) {
      cur.end = toks[i].end;
    } else {
      if (cur) spans.push(cur);
      cur = null;
    }
  });
  if (cur) spans.push(cur);
  for (const s of spans) s.text = text.slice(s.start, s.end);
  return spans;
}

// ---------- span normalisation (regex parsers reused on the span text) ----------

// generic nouns the tagger sometimes marks as a bare directory name ("ile zajmuje folder /etc")
const GENERIC = /^(folder\w*|katalog\w*|director(y|ies)|dirs?|files?|plik\w*|archiw\w*|archives?|the|this|that|ten|ta|to|tego|tym|it|path|sciezk\w*|repo|project|projekt\w*|system\w*|dysk\w*|disk|location|lokalizacj\w*|miejsc\w*)$/;

export function normPath(s) {
  const t = s.replace(/[.,;:!?]+$/, '');
  if (GENERIC.test(foldKeepLength(t).toLowerCase())) return null;
  const ex = extractSlots(t);
  if (ex.paths.length === 1) return ex.paths[0];
  if (/^[\w~./@+-][\w~./@+ -]*$/.test(t) && !/\s/.test(t)) return t;
  return null;
}
export function normExt(s) {
  const t = foldKeepLength(s).replace(/^\*?\./, '').toLowerCase();
  if (KNOWN_EXT.has(t)) return t;
  if (EXT_ALIASES[t]) return EXT_ALIASES[t];
  return /^[a-z0-9]{1,6}$/.test(t) ? t : null;
}
export function normNum(s) {
  const ex = extractSlots(s);
  if (ex.numbers.length === 1) return ex.numbers[0];
  return null;
}

const VALID = {
  NAME: (v) => /^[\w@.:+-]{1,64}$/.test(v),
  BRANCH: (v) => /^(?!-)[\w./-]{1,100}$/.test(v) && !/\.\.|\/$|\.lock$/.test(v),
  USER: (v) => /^[a-z_][\w.-]{0,31}$/i.test(v),
  VAR: (v) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(v),
  HOST: (v) => /^([\w.-]+@)?[\w.-]+$/.test(v) && /[a-z0-9]/i.test(v),
  URL: (v) => /^(https?|ftp|ssh|git):\/\/\S+$|^www\.\S+$|^git@[\w.-]+:\S+$/.test(v),
  PATTERN: (v) => v.length > 0 && v.length < 200 && !/\n/.test(v),
  REPL: (v) => v.length < 200 && !/\n/.test(v),
  MSG: (v) => v.length > 0 && v.length < 300,
  TEXT: (v) => v.length > 0 && v.length < 500,
};
const unquote = (s) => s.replace(/^["'„“`](.*)["'”`]$/s, '$1');

/**
 * Build an extractSlots()-shaped object from tagger spans only (no regex fallbacks), so the same
 * resolveSlots() logic can map it onto an intent. Invalid span values are dropped here (validation).
 */
export function exFromSpans(text, spans) {
  const ex = { text, quoted: [], urls: [], hosts: [], paths: [], pathsWithQuoted: [], numbers: [], words: [], rest: '', tagged: {}, taggerOnly: true, spans };
  const push = (k, v) => { (ex.tagged[k] ??= []).push(v); };
  for (const sp of spans) {
    const raw = unquote(sp.text.trim());
    switch (sp.type) {
      case 'PATH': { const p = sp.quoted ? raw : normPath(raw); if (p) { ex.paths.push(p); ex.pathsWithQuoted.push(p); } break; }
      case 'NUM': { const n = normNum(raw); if (n != null) { ex.numbers.push(n); ex.count ??= n; } break; }
      case 'SIZE': { const e = extractSlots(raw); if (e.size) ex.size ??= e.size; break; }
      case 'TIME': { const e = extractSlots(raw); if (e.duration) ex.duration ??= e.duration; break; }
      case 'PORT': { const n = +raw.replace(/^:/, ''); if (Number.isInteger(n) && n > 0 && n < 65536) ex.port ??= n; break; }
      case 'PID': { const n = +raw; if (Number.isInteger(n) && n > 0) ex.pid ??= n; break; }
      case 'MODE': if (/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(raw)) ex.mode ??= raw; break;
      case 'EXT': { const e = normExt(raw); if (e) ex.ext ??= e; break; }
      case 'URL': if (VALID.URL(raw)) { ex.urls.push(raw); } break;
      case 'HOST': if (VALID.HOST(raw) && !isStopWord(raw)) { ex.hosts.push(raw.includes('@') ? raw.split('@')[1] : raw); if (raw.includes('@')) ex.target ??= raw; } break;
      case 'NAME': {
        if (!VALID.NAME(raw) || isStopWord(raw)) break;
        const f = foldKeepLength(raw).toLowerCase();
        push('NAME', KNOWN_PROCS.has(f) || KNOWN_SERVICES.has(f) ? raw : deinflect(f, KNOWN_PROCS) || deinflect(f, KNOWN_SERVICES) || raw);
        break;
      }
      case 'BRANCH': case 'USER': if (VALID[sp.type](raw) && !isStopWord(raw) && !/^(origin|upstream)$/.test(raw)) push(sp.type, raw); break;
      default: if (VALID[sp.type]?.(raw)) push(sp.type, raw);
    }
  }
  return ex;
}
