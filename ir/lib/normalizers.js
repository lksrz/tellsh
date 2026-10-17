// Approved normalizers (docs/IR.md §6.2, the complete list). Each is a pure function of its source
// span text (plus a small context), so the gate can recompute it: NORM[kind](text, ctx).
//
// Result: { ok: true, value: string, pkind?: 'regex' }      value is the IR value string
//       | { ok: false, label: 'gate_reject' | 'ambiguous', reason }
//
// ctx (all optional): { dialect: 'rust_regex'|'posix_ere', request: string,
//                       pathExists: (p) => boolean, range: [min, max] }

const ok = (value, extra) => ({ ok: true, value: String(value), ...extra });
const fail = (reason, label = 'gate_reject') => ({ ok: false, label, reason });

// Enclosing quotes/backticks and one trailing .,;:!? are the only allowed trims (§6.2).
export function trimSource(text) {
  let t = String(text).normalize('NFC').trim();
  if (/[.,;:!?]$/.test(t) && t.length > 1) t = t.slice(0, -1);
  if (t.length >= 2 && /^['"`]/.test(t) && t[t.length - 1] === t[0]) t = t.slice(1, -1);
  return t;
}

// ---------- int ----------

const SMALL = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen',
  'nineteen', 'twenty'];
const TENS = { thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };

// Parses an integer phrase; null when it is not one ("few", "some", "couple" are never numbers).
export function parseIntPhrase(text) {
  const t = text.toLowerCase().trim();
  if (/^\d+$/.test(t)) return Number(t);
  if (/^\d{1,3}(,\d{3})+$/.test(t)) return Number(t.replace(/,/g, ''));
  const small = SMALL.indexOf(t);
  if (small >= 0) return small;
  if (t in TENS) return TENS[t];
  if (/^(a |one )?hundred$/.test(t)) return 100;
  if (t === 'a dozen' || t === 'dozen') return 12;
  if (/^(a |one )?thousand$/.test(t)) return 1000;
  return null;
}

function inRange(n, range) {
  return !range || (n >= range[0] && n <= range[1]);
}

function int(text, ctx = {}) {
  const n = parseIntPhrase(trimSource(text));
  if (n === null || !Number.isSafeInteger(n)) return fail(`not an integer: ${text}`);
  if (!inRange(n, ctx.range)) return fail(`${n} outside ${ctx.range.join('..')}`);
  return ok(n);
}

// ---------- size (binary units; 'b' = bytes) ----------

const SIZE_UNITS = { b: 1, byte: 1, bytes: 1, k: 1024, kb: 1024, m: 1024 ** 2, mb: 1024 ** 2,
  meg: 1024 ** 2, megs: 1024 ** 2, g: 1024 ** 3, gb: 1024 ** 3, gig: 1024 ** 3, gigs: 1024 ** 3 };

function size(text) {
  const m = /^(\d+)\s*([a-z]+)$/i.exec(trimSource(text));
  if (!m) return fail(`not a size: ${text}`);
  const mult = SIZE_UNITS[m[2].toLowerCase()];
  if (!mult) return fail(`unknown size unit ${m[2]}`);
  const n = Number(m[1]) * mult;
  if (!Number.isSafeInteger(n)) return fail('size too large');
  return ok(n);
}

// ---------- ages ----------

function ageDays(text, ctx = {}) {
  const m = /^(?:(?:last|past)\s+)?(.+?)\s+days?$/i.exec(trimSource(text));
  const n = m && parseIntPhrase(m[1]);
  if (!n) return fail(`not an age in days: ${text}`);
  if (!inRange(n, ctx.range)) return fail(`${n} outside ${ctx.range.join('..')}`);
  return ok(n);
}

function ageMinutes(text, ctx = {}) {
  const m = /^(?:last|past)\s+(.+?)\s+(minutes?|mins?|hours?)$/i.exec(trimSource(text));
  const n = m && parseIntPhrase(m[1]);
  if (!n) return fail(`not an age in minutes/hours: ${text}`);
  const v = /^h/i.test(m[2]) ? n * 60 : n;
  if (!inRange(v, ctx.range)) return fail(`${v} outside ${ctx.range.join('..')}`);
  return ok(v);
}

// ---------- dates ----------

const WEEKDAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DATE_UNITS = ['minute', 'hour', 'day', 'week', 'month'];

// Closed phrase table -> git approxidate text. git interprets it; we never approximate.
function gitDate(text) {
  const t = trimSource(text).toLowerCase().replace(/\s+/g, ' ');
  if (t === 'yesterday') return ok('yesterday');
  if (t === 'last week' || t === 'past week') return ok('1 week ago');
  let m = /^last (\w+)$/.exec(t);
  if (m && WEEKDAYS.includes(m[1])) return ok(`last ${m[1]}`);
  m = /^(.+?) (minute|hour|day|week|month)s? ago$/.exec(t) || /^(?:last|past) (.+?) (minute|hour|day|week|month)s?$/.exec(t);
  if (m && DATE_UNITS.includes(m[2])) {
    const n = parseIntPhrase(m[1]);
    if (n && n > 0) return ok(`${n} ${m[2]}${n === 1 ? '' : 's'} ago`);
  }
  return fail(`not a git date phrase: ${text}`);
}

function isoDate(text) {
  const t = trimSource(text);
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t);
  if (!m) return fail(`not YYYY-MM-DD: ${text}`);
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  if (d.getUTCFullYear() !== +m[1] || d.getUTCMonth() !== +m[2] - 1 || d.getUTCDate() !== +m[3])
    return fail(`not a calendar date: ${t}`);
  return ok(t);
}

// ---------- globs ----------

// Languages with exactly one canonical extension.
export const LANG_EXT = { python: 'py', go: 'go', golang: 'go', rust: 'rs', ruby: 'rb', java: 'java',
  kotlin: 'kt', swift: 'swift', php: 'php', lua: 'lua', dart: 'dart', scala: 'scala', elixir: 'ex',
  haskell: 'hs', perl: 'pl', zig: 'zig', svelte: 'svelte', vue: 'vue', json: 'json', toml: 'toml',
  css: 'css', scss: 'scss', sql: 'sql', csv: 'csv', terraform: 'tf', groovy: 'groovy', blade: 'blade.php',
  parquet: 'parquet', haml: 'haml', erb: 'erb', mdx: 'mdx', jsonl: 'jsonl', ndjson: 'ndjson' };
// v4: further extensions of a LANG_EXT language; compile.js impliedLangExts adds them as globs ("elixir files" -> *.ex, *.exs).
export const LANG_EXTRA = { elixir: ['exs'] };
// Languages with several extensions: ambiguous unless the request names the extension.
export const LANG_MULTI = new Set(['typescript', 'javascript', 'c++', 'cpp', 'c', 'yaml', 'html',
  'markdown', 'shell', 'bash', 'jsx', 'react', 'objective-c', 'csharp', 'c#', 'xml', 'text']);
// Bare (dotless) words accepted as an extension.
export const KNOWN_EXT = new Set(['ts', 'tsx', 'js', 'jsx', 'mjs', 'cjs', 'py', 'go', 'rs', 'rb',
  'java', 'kt', 'swift', 'php', 'lua', 'dart', 'scala', 'ex', 'exs', 'hs', 'pl', 'zig', 'vue',
  'svelte', 'json', 'toml', 'yaml', 'yml', 'md', 'txt', 'log', 'csv', 'tsv', 'html', 'htm', 'css',
  'scss', 'sql', 'sh', 'bash', 'zsh', 'c', 'h', 'cc', 'cpp', 'hpp', 'cxx', 'cs', 'xml', 'ini',
  'cfg', 'conf', 'env', 'lock', 'tf', 'gradle', 'proto', 'graphql', 'png', 'jpg', 'jpeg', 'gif',
  'svg', 'pdf', 'zip', 'gz', 'tar', 'tgz', 'mp4', 'mov', 'mp3', 'wav', 'erb', 'haml', 'mdx', 'parquet',
  'jar', 'ipynb', 'groovy', 'jsonl', 'ndjson', 'pyc', 'class', 'j2', 'snap', 'rst', 'bak', 'tfvars',
  'tfstate', 'ckpt', 'rake', 'hcl', 'plist', 'bin', 'cmake', 'po', 'sqlite3', 'sqlite', 'pid', 'fish',
  'orig', 'swp', 'whl', 'pkl', 'npy', 'onnx', 'pem', 'crt', 'pt', 'pth', 'h5', 'avro', 'twig', 'jinja', 'tpl']);
// Compound extensions accepted as a word ("min.js files", "blade.php templates").
const COMPOUND_PREFIX = new Set(['min', 'd', 'blade', 'spec', 'test', 'pb', 'stories', 'module']);

function extGlob(text) {
  const t = trimSource(text);
  const lower = t.toLowerCase();
  let m = /^\.([A-Za-z0-9_+-]{1,16})$/.exec(t);
  if (m) return ok(`*.${m[1]}`);
  if (KNOWN_EXT.has(lower)) return ok(`*.${lower}`);
  m = /^\.?([a-z]+)\.([a-z0-9]+)$/.exec(lower);
  if (m && COMPOUND_PREFIX.has(m[1]) && KNOWN_EXT.has(m[2])) return ok(`*.${m[1]}.${m[2]}`);
  if (lower in LANG_EXT) return ok(`*.${LANG_EXT[lower]}`);
  if (LANG_MULTI.has(lower)) return fail(`${t} has several extensions`, 'ambiguous');
  return fail(`unknown extension or language: ${t}`);
}

const GLOB_META = /[*?[\]{}!/\\]/;

function substrGlob(text) {
  const t = trimSource(text);
  if (!t || GLOB_META.test(t) || /[\x00-\x1f]/.test(t)) return fail(`not a plain name fragment: ${text}`);
  return ok(`*${t}*`);
}

// ---------- paths / revs / ranges / ports ----------

const HOME_WORDS = { 'my home': '~', 'home dir': '~', 'home directory': '~', 'my home dir': '~',
  'my home directory': '~', 'my downloads': '~/Downloads', 'my desktop': '~/Desktop',
  'my documents': '~/Documents' };

// Value starts with '~' and is rendered as tilde_prefix by the compiler.
function homePath(text) {
  const t = trimSource(text);
  if (t === '~' || /^~\/[^\x00-\x1f]*$/.test(t)) return ok(t);
  const w = HOME_WORDS[t.toLowerCase().replace(/\s+/g, ' ')];
  return w ? ok(w) : fail(`not a home path phrase: ${text}`);
}

// "previous commit" is deliberately absent (HEAD or HEAD~1?).
function revRel(text) {
  const t = trimSource(text).toLowerCase().replace(/\s+/g, ' ');
  if (/^(the )?last commit$/.test(t)) return ok('HEAD');
  if (/^(the )?commit before last$/.test(t)) return ok('HEAD~1');
  const m = /^(.+?) commits? (ago|back)$/.exec(t);
  const n = m && parseIntPhrase(m[1]);
  if (n && n > 0) return ok(`HEAD~${n}`);
  return fail(`not a relative revision: ${text}`, 'ambiguous');
}

function lineRange(text) {
  const t = trimSource(text).toLowerCase().replace(/\s+/g, ' ');
  const num = (s) => parseIntPhrase(s);
  let m = /^(?:from )?(?:lines? )?(\S+) (?:to|through) (?:the )?end$/.exec(t);
  if (m && num(m[1]) >= 1) return ok(`${num(m[1])},$`);
  m = /^(?:from )?(?:lines? )?(\S+?)(?: ?- ?| to | through )(\S+)$/.exec(t);
  if (m && num(m[1]) !== null && num(m[2]) !== null) {
    const a = num(m[1]), b = num(m[2]);
    if (a < 1 || a > b) return fail(`bad line range ${a}..${b}`);
    return ok(a === b ? `${a}` : `${a},${b}`);
  }
  m = /^(?:line )?(\S+)$/.exec(t);
  if (m && num(m[1]) >= 1) return ok(`${num(m[1])}`);
  return fail(`not a line range: ${text}`);
}

function port(text) {
  const m = /^(?:port\s+|:)?(\d{1,5})$/i.exec(trimSource(text));
  const n = m && Number(m[1]);
  if (!n || n > 65535) return fail(`not a port: ${text}`);
  return ok(n);
}

export const JQ_PATH_RE = /^(\.[A-Za-z_][A-Za-z0-9_]*(\[\d+\])*|\.\[\d+\])+$/;

// "index 5" -> .[5]; "results index 0", "item at index 0 of results", "results item 2" -> .results[0]
const JQ_INDEX_NOUN = '(?:index|element|item|entry)';
function jqIndex(t) {
  const n = (s) => { const v = parseIntPhrase(s); return v !== null && v >= 0 ? v : null; };
  const id = '([A-Za-z_][A-Za-z0-9_]*)';
  let m = new RegExp(`^(?:the )?${JQ_INDEX_NOUN} (?:at )?(?:index )?(\\S+)$`, 'i').exec(t);
  if (m && n(m[1]) !== null) return `.[${n(m[1])}]`;
  m = new RegExp(`^${id} ${JQ_INDEX_NOUN} (\\S+)$`, 'i').exec(t);
  if (m && n(m[2]) !== null && !/^(index|element|item|entry|the)$/i.test(m[1])) return `.${m[1]}[${n(m[2])}]`;
  m = new RegExp(`^(?:the )?${JQ_INDEX_NOUN} (?:at )?(?:index )?(\\S+) (?:of|in) (?:the )?${id}$`, 'i').exec(t);
  if (m && n(m[1]) !== null) return `.${m[2]}[${n(m[1])}]`;
  return null;
}

function jqPath(text) {
  const t = trimSource(text);
  const idx = /\s/.test(t) ? jqIndex(t.replace(/\s+/g, ' ')) : null;
  if (idx) return JQ_PATH_RE.test(idx) ? ok(idx) : fail(`not a jq field path: ${text}`);
  const v = t.startsWith('.') ? t : `.${t}`;
  return JQ_PATH_RE.test(v) ? ok(v) : fail(`not a jq field path: ${text}`);
}

// ---------- url_scheme ----------

// Hostname TLDs accepted for a bare host; extension-like TLDs (md, py, sh, rs, ai, io, zip...) are
// deliberately absent so 'notes.md' never becomes a URL.
export const URL_TLDS = new Set(['com', 'org', 'net', 'edu', 'gov', 'dev', 'app', 'co', 'uk', 'de',
  'pl', 'fr', 'nl', 'eu', 'us', 'ca', 'au', 'jp', 'info', 'biz', 'cloud', 'tech', 'xyz', 'me']);
const WEB_CUE = /\b(url|site|website|web|api|endpoint|https?|domain)\b/i;

function urlScheme(text, ctx = {}) {
  const t = trimSource(text);
  if (/^(\.{0,2}\/|~)/.test(t)) return fail(`path-like span: ${t}`, 'ambiguous');
  const m = /^([A-Za-z0-9](?:[A-Za-z0-9-]{0,62}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,62}[A-Za-z0-9])?)+)(\/[^\s\x00-\x1f\x7f]*)?$/.exec(t);
  if (!m) return fail(`not a bare hostname: ${t}`);
  const host = m[1].toLowerCase();
  const tld = host.slice(host.lastIndexOf('.') + 1);
  if (!URL_TLDS.has(tld)) return fail(`TLD .${tld} not allowed`);
  const cue = /^(www|api)\./.test(host) || (ctx.request !== undefined && WEB_CUE.test(ctx.request));
  if (!cue) return fail('no web cue');
  if (ctx.pathExists && ctx.pathExists(t)) return fail(`${t} exists as a local path`);
  const url = `https://${t}`;
  if (url.length > 2048) return fail('URL too long');
  return ok(url);
}

// ---------- regex anchors ----------

export const REGEX_META = /[.^$*+?()[\]{}|\\]/;
export const hasRegexMeta = (s) => REGEX_META.test(s);

// regex::escape (Rust regex crate) escapes these.
const RUST_META = /[\\.+*?()|[\]{}^$#&\-~]/g;
const ERE_META = /[\\.[\]()*+?{}|^$]/g;

export function escapeRegex(s, dialect) {
  if (dialect === 'rust_regex') return s.replace(RUST_META, '\\$&');
  if (dialect === 'posix_ere') return s.replace(ERE_META, '\\$&');
  throw new Error(`no escape for dialect ${dialect}`);
}

function anchored(where) {
  return (text, ctx = {}) => {
    const t = trimSource(text);
    if (!t) return fail('empty anchor text');
    if (!ctx.dialect) return fail('dialect required for an anchored pattern');
    const e = escapeRegex(t, ctx.dialect);
    return ok(where === 'start' ? `^${e}` : `${e}$`, { pkind: 'regex' });
  };
}

// ---------- signal / scope_top ----------

// "bob's" -> bob, "Jane Doe's" -> Jane Doe (a possessive author / owner name)
function possessive(text) {
  const t = trimSource(text);
  const m = /^(.*[^\s'’])['’]s$/.exec(t);
  return m ? ok(m[1]) : fail(`not a possessive: ${text}`);
}

function signal(text) {
  const t = trimSource(text).toLowerCase();
  if (['force', '-9', 'hard'].includes(t)) return ok('KILL');
  if (t === 'gracefully') return ok('TERM');
  const name = t.replace(/^-/, '').replace(/^sig/, '').toUpperCase();
  if (['KILL', 'TERM', 'INT', 'HUP'].includes(name)) return ok(name); // a named signal (HUP, SIGHUP, -HUP)
  return fail(`not a signal phrase: ${text}`);
}

const SCOPE_TOP = new Set(['only here', 'top level only', 'top-level only', 'not recursive',
  'non-recursive', 'nonrecursive', 'not recursively',
  'only the top level', 'only top level', 'just the top level', 'without recursing', 'no recursion']);

function scopeTop(text) {
  return SCOPE_TOP.has(trimSource(text).toLowerCase().replace(/\s+/g, ' ')) ? ok(1) : fail(`not a scope_top cue: ${text}`);
}

export const NORM = Object.freeze({
  int, size, age_days: ageDays, age_minutes: ageMinutes, git_date: gitDate, iso_date: isoDate,
  ext_glob: extGlob, substr_glob: substrGlob, home_path: homePath, rev_rel: revRel,
  line_range: lineRange, port, jq_path: jqPath, url_scheme: urlScheme,
  starts_with: anchored('start'), ends_with: anchored('end'), signal, scope_top: scopeTop, possessive,
});

export function normalize(kind, text, ctx) {
  const f = NORM[kind];
  if (!f) return fail(`unknown norm kind ${kind}`);
  return f(text, ctx);
}
