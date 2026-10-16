// Closed EN lexicons of the gate's obligations (docs/IR.md §6.3). Data only, plus findCues.
// Words are compared NFC + lower case (units.unitWord).

import { LANG_EXT, LANG_MULTI, KNOWN_EXT } from './normalizers.js';
import { unitWord } from './units.js';

// ---------- cue lexicon: matched longest-first, one class per phrase ----------

export const CUE_LEXICON = {
  // Positive multiword phrases containing a NEG word are claimed first by their own class.
  IGNORED: ['ignore .gitignore', 'ignore gitignore', 'without respecting gitignore',
    "don't respect gitignore", 'do not respect gitignore', 'including ignored', 'ignored files',
    'gitignored', 'no-ignore'],
  HIDDEN: ["don't skip hidden", 'do not skip hidden', 'without skipping hidden', 'hidden',
    'dotfiles', 'dot files', 'including hidden'],
  CASE: ['case-insensitive', 'case insensitive', 'case-insensitively', 'ignore case', 'ignoring case',
    'any case', 'regardless of case', 'case-sensitive', 'case sensitive', 'smart case',
    'match case', 'in any case'],
  SCOPE_TOP: ['not recursive', 'not recursively', 'non-recursive', 'nonrecursive', 'top level only',
    'top-level only', 'only top level', 'only here', 'depth', 'max depth', 'levels deep',
    'only the top level', 'just the top level', 'without recursing', 'no recursion'],
  FOLLOW_LINKS: ['follow symlinks', 'follow links', 'following symlinks', 'follow symbolic links'],
  WORD: ['whole word', 'whole words', 'as a word', 'word boundaries', 'exact word'],
  WHOLE_LINE: ['whole line', 'whole lines', 'entire line', 'exact line', 'full line'],
  LINE_NUMBERS: ['line numbers', 'line number', 'numbered'],
  CONTEXT: ['context', 'lines around', 'surrounding', 'lines before', 'lines after', 'before and after'],
  SORT: ['sorted by most recent', 'by most recent', 'biggest first', 'largest first', 'smallest first',
    'newest first', 'most recent first', 'sorted', 'sort', 'ordered by', 'by size', 'by date',
    'by time', 'by cpu', 'by memory', 'by mem'],
  LIMIT: ['per file', 'per-file', 'each file', 'every file', 'at most', 'first', 'last',
    'top', 'latest', 'most recent', 'limit', 'head', 'tail'],
  COUNT: ['how many', 'number of', 'count', 'counts', 'tally'],
  RECENCY: ['in the last', 'in the past', 'within the last', 'since', 'until', 'ago', 'recently',
    'newer than', 'older than', 'modified', 'changed in the'],
  SIZE: ['bigger than', 'larger than', 'smaller than', 'more than', 'less than', 'at least', 'bigger',
    'larger', 'smaller', 'exceeding'],
  REVERSE: ['reverse', 'reversed', 'in reverse', 'reverse order', 'oldest first'],
  LONG_FORMAT: ['detailed', 'long format', 'long listing', 'with details', 'permissions'],
  HUMAN_SIZES: ['human sizes', 'human-readable', 'human readable'],
  FOLLOW_REDIRECTS: ['follow redirects', 'following redirects'],
  FOLLOW: ['follow', 'following', 'keep watching', 'watch', 'live'],
  HEADERS: ['response headers', 'with headers', 'include headers', 'headers'],
  LISTEN: ['listening', 'listen', 'listens'],
  FORCE: ['forcefully', 'force', 'hard', '-9'],
  REGEX: ['regular expression', 'regex', 'regexp'],
  ADJACENT: ['adjacent', 'consecutive', 'in a row'],
  // Explained by the freq macro (gate-internal class, not a schema cue).
  FREQ: ['most common', 'most frequent', 'how often', 'frequency', 'by frequency'],
  TIMEOUT: ['timeout', 'time out', 'time limit', 'max time', 'give up after', 'seconds', 'second', 'secs',
    'sec', '--max-time'],
  NEG: ['other than', 'but not', 'apart from', 'not', 'without', 'except', 'excluding', 'exclude',
    'skip', 'skipping', 'ignore', 'ignoring', 'lacking'],
};

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
    if (!claimed[i] && /n't$/.test(w.replace(/’/g, "'"))) out.push({ cls: 'NEG', a: i, b: i + 1, phrase: w });
  });
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
  'lines.sort.unique': ['unique', 'distinct', 'dedupe', 'dedup', 'deduplicate', 'deduplicated', 'duplicate',
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
