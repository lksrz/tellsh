// Closed EN lexicons of the gate's obligations (docs/IR.md §6.3). Data only, plus findCues.
// Words are compared NFC + lower case (units.unitWord).

import { LANG_EXT, LANG_MULTI, KNOWN_EXT, parseIntPhrase } from './normalizers.js';
import { unitWord } from './units.js';

// ---------- cue lexicon: matched longest-first, one class per phrase ----------

export const CUE_LEXICON = {
  // Positive multiword phrases containing a NEG word are claimed first by their own class.
  IGNORED: ['ignore .gitignore', 'ignore gitignore', 'without respecting gitignore',
    "don't respect gitignore", 'do not respect gitignore', 'including ignored', 'ignored files',
    'gitignored', 'no-ignore', 'ignoring gitignore', 'ignoring .gitignore', 'ignoring gitignore rules',
    'ignore gitignore rules', 'ignore .gitignore rules'],
  HIDDEN: ["don't skip hidden", 'do not skip hidden', 'without skipping hidden', 'hidden',
    'dotfiles', 'dot files', 'including hidden'],
  CASE: ['case-insensitive', 'case insensitive', 'case-insensitively', 'ignore case', 'ignoring case',
    'any case', 'regardless of case', 'case-sensitive', 'case sensitive', 'smart case',
    'match case', 'in any case', 'ignoring letter case', 'ignore letter case', "case doesn't matter",
    'case does not matter', 'not case sensitive', 'not case-sensitive', 'ignore the case', 'ignoring the case',
    'ignoring capitalization', 'ignore capitalization', 'ignoring capitalisation', 'ignore capitalisation'],
  SCOPE_TOP: ['not recursive', 'not recursively', 'non-recursive', 'nonrecursive', 'top level only',
    'top-level only', 'only top level', 'only here', 'depth', 'max depth', 'levels deep',
    'only the top level', 'just the top level', 'without recursing', 'no recursion', 'deep at most', 'no deeper than',
    'levels down', 'level down', 'level deep', 'levels below', 'level below', 'levels under', 'level under'],
  FOLLOW_LINKS: ['follow symlinks', 'follow links', 'following symlinks', 'follow symbolic links'],
  WORD: ['whole word', 'whole words', 'as a word', 'word boundaries', 'exact word', 'whole-word', 'whole-words',
    'word match', 'word-match', 'word boundary', 'full word', 'full words', 'word search'],
  WHOLE_LINE: ['whole line', 'whole lines', 'entire line', 'exact line', 'full line', 'whole-line',
    'are exactly', 'is exactly', 'exactly equal to', 'matching exactly', 'lines exactly', 'full-line', 'exact-line',
    'exactly equal', 'exactly match'],
  LINE_NUMBERS: ['line numbers', 'line number', 'numbered'],
  CONTEXT: ['context', 'lines around', 'surrounding', 'lines before', 'lines after', 'before and after'],
  SORT: ['sorted by most recent', 'by most recent', 'biggest first', 'largest first', 'smallest first',
    'newest first', 'most recent first', 'sorted', 'sort', 'ordered by', 'by size', 'by date',
    'by time', 'by cpu', 'by memory', 'by mem', 'highest first', 'lowest first', 'most recently',
    'time order', 'reverse time order', 'ranked by', 'from the smallest', 'from smallest', 'from the largest',
    'from largest', 'from the biggest', 'from biggest', 'newest commit first', 'newest files first',
    'newest committer date first', 'biggest on top', 'largest on top', 'newest on top', 'highest on top'],
  // "each file" / "per file" are explained by per-file results (rg -c/-l/-m, wc over paths, find)
  PER_FILE: ['per file', 'per-file', 'each file', 'every file'],
  LIMIT: ['at most', 'first', 'last', 'top', 'latest', 'most recent', 'limit', 'head', 'tail', 'newest', 'max'],
  COUNT: ['how many', 'number of', 'count', 'counts', 'tally', 'totals', 'total lines', 'total line', 'total words',
    'total bytes', 'size in bytes', 'sizes in bytes', 'byte size'],
  RECENCY: ['in the last', 'in the past', 'within the last', 'since', 'until', 'ago', 'recently',
    'newer than', 'older than', 'modified', 'changed in the', 'from the last', 'in last', 'within the past', 'from the past',
    'changed within', 'modified within', 'touched within', 'untouched', 'untouched for', 'last modified',
    'last changed', 'last touched', 'last updated'],
  SIZE: ['bigger than', 'larger than', 'smaller than', 'more than', 'less than', 'at least', 'bigger',
    'larger', 'smaller', 'exceeding'],
  REVERSE: ['reverse', 'reversed', 'in reverse', 'reverse order', 'oldest first'],
  LONG_FORMAT: ['detailed', 'long format', 'long listing', 'with details', 'permissions', 'long', 'long details', 'long list', 'long-format',
    'with sizes', 'with their sizes', 'with size'],
  HUMAN_SIZES: ['human sizes', 'human-readable', 'human readable', 'readable sizes', 'human', 'human-sort'],
  FOLLOW_REDIRECTS: ['follow redirects', 'following redirects'],
  FOLLOW: ['follow', 'following', 'keep watching', 'watch', 'live', 'as it grows'],
  HEADERS: ['response headers', 'with headers', 'include headers', 'headers'],
  LISTEN: ['listening', 'listen', 'listens', 'listener', 'listeners', 'listened', 'listen-only', 'accepting connections'],
  FORCE: ['forcefully', 'force', 'hard', '-9'],
  REGEX: ['regular expression', 'regex', 'regexp'],
  ADJACENT: ['adjacent', 'consecutive', 'in a row'],
  // Explained by the freq macro (gate-internal class, not a schema cue).
  FREQ: ['most common', 'most frequent', 'how often', 'frequency', 'by frequency', 'most common first',
    'most frequent first'],
  TIMEOUT: ['timeout', 'time out', 'time limit', 'max time', 'give up after', 'seconds', 'second', 'secs',
    'sec', '--max-time'],
  // Phrases bound to one mod (BOUND_MODS): explained only when the command has that mod. Several
  // contain a NEG word and are claimed here first ("not merged" is --no-merged, not a negation).
  BOUND: Object.keys(BOUND_MODS_INIT()),
  // Bare names (basename only): no element prints them, so the gate always rejects.
  NAMES_ONLY: ['plain names', 'bare names', 'base names', 'basename', 'basenames', 'names without the path',
    'without the path', 'without paths', 'without the directory'],
  // Neutral quantifiers that need no element (find recurses by default).
  NEUTRAL: ['any depth', 'at any depth', 'all depths', 'how long'],
  NEG: ['other than', 'but not', 'apart from', 'not', 'without', 'except', 'excluding', 'exclude',
    'skip', 'skipping', 'ignore', 'ignoring', 'lacking', 'outside', 'outside of', 'leave out', 'leaving out',
    'leaves out', 'minus', 'everything but', 'missing', 'lack', 'lacks', 'prune',
    'have no', 'has no', 'with no', 'no mention of', 'no match for', 'no matches for', 'no merges', 'no merge'],
};

// Contractions typed without an apostrophe.
const NEG_BARE = new Set(['dont', 'doesnt', 'isnt', 'arent', 'didnt', 'havent', 'hasnt', 'wont', 'cant', 'shouldnt']);
// Bound phrase -> the keys that explain it: `op.mod` (the command has that mod), `op` (the command runs
// that op without a recursive mod) or `op!mod` (the op without that mod).
function BOUND_MODS_INIT() {
  const m = {};
  const put = (list, keys) => { for (const p of list) m[p] = keys; };
  put(['not merged', 'not yet merged', 'not been merged', "haven't been merged", "aren't merged", 'not merged yet',
    "haven't merged", 'not fully merged'], ['git.branch.no_merged']);
  put(['first parent', 'first-parent', 'following only the first parent', 'following the first parent',
    'follow only the first parent', 'follow the first parent'], ['git.log.first_parent']);
  put(['not as a regex', 'not a regex', 'not regex', 'not as regex', 'not as a pattern'],
    ['text.search~literal', 'git.log.fixed_strings']);
  put(['without the patch', 'without the diff', 'without patch', 'without diff', 'no patch', 'no diff',
    'skip the diff', 'without the diffs', 'no diffs'], ['git.show.no_patch']);
  put(['not modified', 'not touched', 'not changed', 'not been modified', 'not been touched', 'not been changed',
    'not updated', 'not been updated'], ['files.find.modified_before_days']);
  put(['without line numbers', 'no line numbers', 'without line number', 'no line number'], ['text.search.no_line_number']);
  put(['not lines', 'not just lines', 'not just matching lines', 'not matching lines'], ['text.search.count_matches']);
  put(["not what's inside", 'not its contents', 'not the contents', "not what's in it"], ['dir.list.directory']);
  put(['skip the first', 'skip the newest', 'skip the latest', 'skip the most recent', 'skipping the first',
    'skipping the newest', 'skipping the latest'], ['git.log.skip']);
  // "top level" of a tree: npm ls --depth, a max depth, or an ls / jq that never recurses
  put(['top level', 'top-level'], ['npm.ls.top_level', 'npm.ls.depth', 'files.find.max_depth', 'text.search.max_depth',
    'files.list.max_depth', 'dir.list', 'json.select']);
  put(['not bytes', 'not the bytes', 'rather than bytes', 'instead of bytes'], ['file.count.chars']);
  put(['not just the lines', 'not only the lines'], ['text.search.count_matches']);
  put(['skip dupes', 'skip duplicates', 'skipping duplicates', 'skipping dupes', 'drop duplicates', 'drop dupes'],
    ['lines.sort.unique', 'lines.uniq']);
  put(['not staged', 'not yet staged', 'not staged yet', "haven't staged", "haven't i staged", 'have not staged',
    'not been staged', 'but not staged'], ['git.diff!staged']);
  put(["don't show progress", 'no progress', 'without progress', 'no progress bar', 'without the progress bar',
    'no progress meter', 'without a progress bar', 'without the progress meter'],
  ['http.get.silent', 'http.download.silent', 'http.head.silent']);
  put(['without following redirects', 'not following redirects', "don't follow redirects", 'do not follow redirects',
    'no redirects'], ['http.get!location', 'http.head!location', 'http.download!location']);
  put(['listening or not', 'not only listeners', 'not just listeners', 'not only listening', 'not just listening'],
    ['port.who!listening']);
  put(['not what is inside', 'not what is inside it', 'not contents', "don't descend", 'do not descend',
    'not inside it'], ['dir.list.directory']);
  put(['not inside longer words', 'not inside other words', 'not part of longer words', 'not part of other words'],
    ['text.search.word']);
  put(['latest commit info', 'last commit info', 'with last commit', 'with their last commit', 'with latest commit',
    'with the last commit', 'with the latest commit'], ['git.branch.verbose']);
  put(['no consecutive', 'no adjacent'], ['lines.uniq.unique_only']);
  put(['ignore the nested', 'ignoring the nested', 'ignore nested', 'without the nested', 'no nested'], ['npm.ls.top_level']);
  return m;
}
export const BOUND_MODS = BOUND_MODS_INIT();
// A cue phrase that also satisfies other classes ("oldest first" on ls -tr is SORT and REVERSE).
export const ALSO_CLASSES = { 'oldest first': ['SORT'], 'reverse time order': ['REVERSE'], newest: ['SORT'] };
// "in the last 2 weeks" is RECENCY, "in the last 3 commits" / "from the last 15 lines" is LIMIT: the
// noun after the number (or right after the phrase) decides.
const RECENCY_OR_LIMIT = new Set(['in the last', 'from the last', 'in last', 'within the last', 'in the past',
  'from the past', 'changed in the', 'within the past']);
const TIME_UNITS = new Set(['minute', 'minutes', 'min', 'mins', 'hour', 'hours', 'day', 'days', 'week', 'weeks',
  'month', 'months', 'year', 'years', 'fortnight', 'quarter']);
// Which elements may explain a cue through its ALSO classes (null: any element of that class). Other
// phrases are explained by their own class only ("oldest first" never explains a plain sort).
export const ALSO_EXPLAINS = { newest: ['dir.list.sort_time', 'git.branch.sort'] };
// Explain-only classes of a mod: the mod never needs them, but explains them when present.
export const MOD_EXPLAINS = {
  'npm.ls.top_level': ['SCOPE_TOP', 'LIMIT'],
  'npm.ls.depth': ['SCOPE_TOP'],
};
// Words that start a new request clause after "and"/"or" (a NEG window never continues across them).
export const CLAUSE_VERBS = new Set(['show', 'list', 'search', 'find', 'grep', 'count', 'print', 'look', 'give',
  'get', 'display', 'tell', 'then', 'only', 'just', 'include', 'including', 'keep', 'also', 'sort', 'return']);

const PHRASES = Object.entries(CUE_LEXICON)
  .flatMap(([cls, list]) => list.map((p) => ({ cls, words: p.split(' ') })))
  .sort((a, b) => b.words.length - a.words.length);

// Cue occurrences over pointer units: [{cls, a, b, phrase}] (half-open unit ranges).
export function findCues(seg) {
  const words = seg.units.map(unitWord);
  const claimed = new Array(words.length).fill(false);
  const out = [];
  for (const { cls, words: ph } of PHRASES) {
    for (let i = 0; i + ph.length <= words.length; i++) {
      if (ph.every((w, k) => words[i + k] === w && !claimed[i + k])) {
        for (let k = 0; k < ph.length; k++) claimed[i + k] = true;
        out.push({ cls, a: i, b: i + ph.length, phrase: ph.join(' ') });
      }
    }
  }
  words.forEach((w, i) => {
    if (claimed[i]) return;
    // "don't forget", "dont mind": politeness, not a negation
    if ((/n't$/.test(w.replace(/’/g, "'")) || NEG_BARE.has(w)) && !['forget', 'mind', 'worry'].includes(words[i + 1])) out.push({ cls: 'NEG', a: i, b: i + 1, phrase: w });
    // "non-merge", "non-panic": a negating prefix (lexicon words like "non-recursive" are claimed above)
    else if (/^non-[a-z]/.test(w) && !NON_WORDS.has(w)) out.push({ cls: 'NEG', a: i, b: i + 1, phrase: w });
    // "over 50mb", "over 30 days": a threshold before a number
    else if (w === 'over' && /^\d/.test(words[i + 1] || '')) out.push({ cls: 'SIZE', a: i, b: i + 1, phrase: w });
    // "before 2024-01-01", "between 2024-01-01 and ...": a date bound
    else if (['before', 'after', 'between', 'from'].includes(w) && /^\d{4}-\d{2}-\d{2}$/.test(words[i + 1] || ''))
      out.push({ cls: 'RECENCY', a: i, b: i + 1, phrase: w });
  });
  for (const c of out) {
    if (ALSO_CLASSES[c.phrase]) c.also = ALSO_CLASSES[c.phrase];
    // "at most two levels deep" is a depth bound, not a result limit
    if (RECENCY_OR_LIMIT.has(c.phrase)) {
      const n = words[c.b] || '';
      const noun = words[c.b + 1];
      if ((/^\d+$/.test(n) || parseIntPhrase(n) !== null) && !TIME_UNITS.has(noun)) c.cls = 'LIMIT';
    }
    // "two levels down max", "at most 3 levels"
    const near = words.slice(Math.max(0, c.a - 3), c.b + 3);
    if (['at most', 'max'].includes(c.phrase) && near.some((w) => ['level', 'levels', 'deep', 'depth'].includes(w))) c.cls = 'SCOPE_TOP';
  }
  return out.sort((x, y) => x.a - y.a);
}

// ---------- sub-lexicons of specific obligations ----------

export const PER_FILE = new Set(['per file', 'per-file', 'each file', 'every file']);
// Direction words (§6.3). `end` counts only as "the end"; a word inside a non-LIMIT cue phrase
// ("top level only", "newest first") is not a direction word.
export const DIR_WORDS = { first: 'first', top: 'first', head: 'first', beginning: 'first', start: 'first',
  last: 'last', bottom: 'last', end: 'last', tail: 'last', latest: 'last', final: 'last', 'most recent': 'last' };
export const KILL_VERBS = new Set(['kill', 'terminate', 'stop', 'pkill', 'killall']);
// "stop listing", "stop watching": a kill verb followed by another gerund is not a kill request.
export const NOT_GERUND = new Set(['everything', 'anything', 'something', 'nothing', 'running', 'hanging']);
export const CLAUSE_BOUNDARY = new Set([',', ';', '.', ':', '!', '?', 'and', 'then']);
// Closed-lexicon coverage words (§6.3): tool names, write verbs, languages/extensions, op verbs.
export const TOOL_WORDS = { rg: ['rg'], ripgrep: ['rg'], grep: ['grep'], egrep: [], git: ['git'],
  ls: ['ls'], wc: ['wc'], uniq: ['uniq'], sed: ['sed'], npm: ['npm'], curl: ['curl'], wget: [],
  jq: ['jq'], ps: ['ps'], lsof: ['lsof'], pkill: ['pkill'], awk: [], xargs: [], perl: [], gh: [],
  docker: [], kubectl: [], sudo: [], tee: [], cut: [], killall: [], yarn: [], pnpm: [] };
export const WRITE_VERBS = new Set(['delete', 'remove', 'rm', 'replace', 'rename', 'move', 'copy', 'write',
  'save', 'edit', 'overwrite', 'install', 'uninstall', 'push', 'email', 'mail', 'send',
  'upload', 'create', 'chmod', 'chown', 'mkdir', 'touch', 'append', 'checkout', 'reset']);
export const OP_VERBS = { kill: 'proc.kill', terminate: 'proc.kill', download: 'http.download' };
// Languages and extensions: a file-type word no value uses is a dropped filter ("count lines in
// python files"). Language names that are not plain English always count; extension words and
// names that are also plain English or other nouns (go, c, text, shell, json, html, md, ...) count
// only right before "file(s)" or spelled as an extension (".go").
const PLAIN = ['go', 'c', 'json', 'css', 'sql', 'csv', 'html', 'text', 'shell', 'bash', 'react', 'markdown', 'xml'];
const ALWAYS_LANG = new Set([...Object.keys(LANG_EXT), ...LANG_MULTI].map((w) => w.toLowerCase()).filter((w) => !PLAIN.includes(w)));
const FILE_TYPE_WORDS = new Set([...PLAIN, ...Object.values(LANG_EXT), ...KNOWN_EXT, 'md', 'ts', 'js', 'tsx', 'jsx', 'yml',
  'yaml', 'toml', 'txt', 'log', 'cfg', 'ini', 'conf'].map((w) => w.toLowerCase()));
const FILE_NOUN_NEXT = new Set(['file', 'files', 'source', 'sources', 'code', 'scripts', 'documents', 'docs']);
export const langExt = (w) => LANG_EXT[w] ?? w;
export const langWordAt = (words, i) => {
  const w = words[i];
  const bare = w.startsWith('.') ? w.slice(1) : w;
  if (ALWAYS_LANG.has(w)) return w;
  if (!ALWAYS_LANG.has(bare) && !FILE_TYPE_WORDS.has(bare)) return null;
  if (w.startsWith('.') || FILE_NOUN_NEXT.has(words[i + 1])) return bare;
  return null;
};
export const PIN_NAMES = { rg: ['rg', 'ripgrep'], grep: ['grep'] };

// ---------- request words a behaviour-changing mod or const needs (§6.3, cue-less mods) ----------
// key `op.mod` or `op.mod=const`: any one of the words / phrases must appear in the request.
// Mods that only change the output format (curl -s, jq -r, git log --oneline, ...) are not listed.
const DIR_NOUNS = ['dir', 'dirs', 'directory', 'directories', 'folder', 'folders', 'subdirectory',
  'subdirectories', 'subfolder', 'subfolders'];
const LINK_NOUNS = ['symlink', 'symlinks', 'symbolic', 'link', 'links', 'softlink', 'softlinks'];
export const REQUIRE_WORDS = {
  'files.find.type=d': DIR_NOUNS,
  'files.find.type=l': LINK_NOUNS,
  'files.find.empty': ['empty'],
  'git.log.merges_only': ['merge', 'merges', 'merged', 'merge commits'],
  'git.log.skip': ['skip', 'skipping', 'skipped', 'offset'],
  'git.log.first_parent': ['first-parent', 'first parent', 'mainline'],
  'git.log.all_refs': ['all', 'every', 'branches', 'refs'],
  'git.log.all_match': ['all', 'both', 'every'],
  'git.branch.all': ['all', 'every', 'remote', 'remotes', 'remote-tracking'],
  'git.branch.remotes': ['remote', 'remotes', 'remote-tracking', 'origin'],
  'git.branch.show_current': ['current', 'active', 'checked'],
  'git.branch.merged': ['merged'],
  'git.branch.no_merged': ['unmerged', 'not merged', "haven't been merged", 'not yet merged', 'not been merged'],
  'git.branch.contains': ['contain', 'contains', 'containing', 'include', 'includes', 'including', 'with'],
  'git.branch.sort=-committerdate': ['recent', 'recently', 'newest', 'latest', 'last', 'descending', 'new'],
  'git.branch.sort=committerdate': ['oldest', 'ascending', 'least recent', 'least recently'],
  'git.branch.sort=refname': ['name', 'names', 'alphabetical', 'alphabetically', 'alphabetic', 'refname'],
  'git.branch.sort=-creatordate': ['created', 'creation', 'creatordate'],
  'git.diff.staged': ['staged', 'cached', 'index', 'stage'],
  'text.search.before': ['before', 'preceding', 'above', 'prior'],
  'text.search.after': ['after', 'following', 'below', 'trailing'],
  'file.head.bytes': ['byte', 'bytes', 'characters', 'chars'],
  'file.tail.bytes': ['byte', 'bytes', 'characters', 'chars'],
  'file.tail.from_line': ['from', 'starting', 'start', 'onward', 'onwards', 'after', 'beyond', 'rest'],
  'dir.list.directory': ['itself', 'themselves', 'entry', 'entries', 'contents', 'node', 'nodes'],
  'dir.list.recursive': ['recursive', 'recursively', 'recurse', 'recursing', 'subdirectory', 'subdirectories',
    'subfolders', 'tree', 'all', 'every', 'nested'],
  'npm.ls.all': ['all', 'every', 'full', 'transitive', 'nested', 'tree', 'whole'],
  'npm.ls.top_level': ['top', 'top-level', 'direct', 'depth', 'level', 'only'],
  'lines.sort.unique': ['unique', 'distinct', 'dedupe', 'dedup', 'deduplicate', 'deduplicated', 'deduped', 'duplicate',
    'duplicates', 'dupes', 'repeats', 'uniq', 'unique-sort'],
  'lines.uniq.repeated': ['duplicate', 'duplicates', 'duplicated', 'repeated', 'repeat', 'repeats', 'repeating', 'more than once', 'twice'],
  'lines.uniq.unique_only': ['once', 'non-repeated', 'unrepeated', 'non-duplicate', 'non-duplicated',
    'uniques', 'singles', 'singleton', 'singletons', 'single time', 'one-off', 'no consecutive', 'no adjacent', 'non-repeating'],
  'proc.list.sort_cpu': ['cpu', 'processor', '%cpu'],
  'proc.list.sort_mem': ['memory', 'mem', 'ram', 'rss', '%mem'],
  'dir.list.sort_size': ['size', 'sizes', 'biggest', 'largest', 'smallest', 'bigger', 'larger', 'big', 'large', 'small'],
  'dir.list.sort_time': ['time', 'date', 'recent', 'recently', 'newest', 'oldest', 'modified', 'modification',
    'latest', 'last', 'mtime', 'new', 'old', 'age', 'changed'],
  'proc.kill.signal=INT': ['interrupt', 'int', 'sigint', 'ctrl-c', 'ctrl+c'],
  'proc.kill.signal=HUP': ['hup', 'hangup', 'sighup', 'reload'],
};
// "non-" words some mod needs as its own request word: never a NEG cue.
// "just the number": bare output (wc FILE also prints the name).
export const BARE_NUMBER = ['just the number', 'only the number', 'the number only', 'number only', 'just a number',
  'bare number', 'just the count', 'only the count', 'the count only', 'count only', 'just the size', 'only the size'];
const NON_WORDS = new Set(Object.values(REQUIRE_WORDS).flat().filter((w) => w.startsWith('non-')));
// The freq macro needs a FREQ/SORT/COUNT cue or one of these words.
export const FREQ_WORDS = ['rank', 'ranked', 'ranking', 'repeated', 'repeat', 'repeats', 'most', 'often',
  'frequent', 'common', 'times', 'occurrences', 'popular'];
// Sort direction: words the sorted order contradicts. key: `op:mods-present` -> forbidden words.
// ls -S / -t are biggest / newest first, -r reverses them; ps --sort=-%cpu/-%mem is descending.
export const SORT_FORBID = [
  { op: 'dir.list', mod: 'sort_size', reverse: false, words: ['smallest', 'ascending', 'small'] },
  { op: 'dir.list', mod: 'sort_size', reverse: true, words: ['biggest', 'largest', 'descending'] },
  { op: 'dir.list', mod: 'sort_time', reverse: false, words: ['oldest', 'ascending', 'least recent'] },
  { op: 'dir.list', mod: 'sort_time', reverse: true, words: ['newest', 'latest', 'descending', 'most recent', 'recent first'] },
  { op: 'proc.list', mod: 'sort_cpu', reverse: false, words: ['least', 'lowest', 'smallest', 'ascending'] },
  { op: 'proc.list', mod: 'sort_mem', reverse: false, words: ['least', 'lowest', 'smallest', 'ascending'] },
];
// find -type f: the request names directories or links but never files.
export const TYPE_F_CONFLICT = [...DIR_NOUNS, ...LINK_NOUNS];
export const FILE_NOUNS = ['file', 'files', 'filename', 'filenames'];

// ---------- unknown content words (§6.3 coverage) ----------
// Function words and the pilot's domain vocabulary. An unconsumed word outside these, the cue
// lexicon and the closed lexicons above is "unknown"; more than MAX_UNKNOWN gives gate_reject.
export const MAX_UNKNOWN = 1;
export const KNOWN_WORDS = new Set(`
a an the this that these those it its it's i me my mine we our us you your yours he she they them their
is are was were be been being am do does did done doing have has had having can could would should will
shall may might must to of in on at by for from with into onto over under about as than then so if
or and but nor also just only even still too very really please kindly now here there where when what
which who whom whose why how all any each every both either neither some such same other another more
most less least few many much several no yes up down out off again once per via within across
between through throughout around near next after before since until while during
show list display print give get tell find search look check see view output return let fetch grab
pull read open dump report want need like would i'd i'm let's lets know name named called
files file filename filenames folder folders directory directories dir dirs subdirectory subdirectories
subfolder subfolders path paths tree project repo repository codebase workspace current working cwd
line lines word words character characters chars byte bytes text content contents match matches
matching matched occurrence occurrences instance instances result results entry entries item items
string strings pattern patterns term terms phrase keyword keywords literal literally exact exactly
mention mentions mentioning mentioned contain contains containing contained include includes including
has having anywhere everywhere somewhere inside under below beneath within
commit commits branch branches log logs history message messages author authors change changes changed
diff diffs status staged unstaged tag tags ref refs hash hashes sha merge merges
process processes proc procs program programs running run runs pid pids port ports service app
url urls site website page endpoint api request response body http https web server json key keys
field fields value values array object property properties
size sizes big small large biggest smallest largest newest oldest recent new old age time date dates
day days hour hours minute minutes week weeks month months year years second seconds today yesterday
ago older newer modified updated created edited touched
count number total amount sum frequency often frequent common unique distinct duplicate duplicates
sorted order ordered alphabetical alphabetically ascending descending reverse reversed
script scripts package packages dependency dependencies dependencies module modules test tests
code source sources config configuration settings env environment
top bottom first last latest final head tail start end beginning
each one ones single whole entire full complete everything anything something nothing
recursively recursive deep nested level levels depth
format formatted short summary details detail verbose oneline compact raw pretty
use using used via with without
lowercase uppercase case
group grouped
following followed preceding
part parts
error errors fail fails failing failed failure failures quiet quietly silent silently progress meter bar
bad stat stats diffstat retry retries retrying rotation rotate rotates rotated reopen reopens
mac macos macbook laptop machine box host server computer system systemwide linux darwin local locally
hey hi yo gimme pls plz quick quickly real right good kinda wanna gonna stuff thing things
table user users everyone everyone's everyones uid uids usage graph decoration decorations decorate
surface spot hunt peep retrieve against versus vs plus together identical collapse dupe dupes
numeric numerically alphabetize alphabetized high low percent percentage column columns style mixed
range subject treat whether unless wait stay sitting executing serving hit hits filter filtered glob
iso snapshot worker workers job jobs task tasks console stderr stdout terminal screen
aux cd go combined deps dont don't im i'm lemme whats what's appear appears fixed root binary binaries
database client ci cli src flag flags vm pod svc dev mini
`.split(/\s+/).filter(Boolean));
