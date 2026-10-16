// Gate step 3, strict obligations (docs/IR.md §6.3 "Audit r2"): conservative rejects derived from the
// first model's accepted-but-wrong answers. Called at the end of obligations() with its helpers:
//   1. cover words: a closed-lexicon request word must be explained by an element (no tolerance);
//   2. span integrity: a copied value must not stop inside a contiguous value phrase;
//   3. unrequested mods: every predicted mod needs a supporting request word, a cue class, a value
//      from the request, or a schema `implied` default (with its reason);
//   4. systematic data-audit patterns (git log | tail, rg DIR | uniq -c, git show --oneline, ...).

import { unitWord, isQuotedUnit } from './units.js';

// ---------- 3. request words of cue-less mods (key `op.mod` or `op.mod=const`) ----------
// Mods with a cue class, a negative polarity or a value copied from the request are supported by
// those; REQUIRE_WORDS (lexicon.js) keys are checked there. A mod listed nowhere is unrequested.
const ONE_LINE = ['one-liner', 'one-liners', 'oneliner', 'oneliners', 'oneline', 'one-line', 'one line', 'one line each', 'one per line', 'per line', 'compact', 'short',
  'shortly', 'brief', 'briefly', 'concise', 'condensed', 'terse', 'summary', 'summaries', 'summarized', 'subject',
  'subjects', 'title', 'titles', 'headline', 'headlines', 'hash', 'hashes', 'sha', 'shas', 'overview', 'quick'];
const STAT = ['stat', 'stats', 'summary', 'summarize', 'summarise', 'diffstat', 'statistics', 'insertions', 'deletions', 'lines changed', 'how much',
  'how many lines', 'counts', 'changed lines', 'line counts', 'size of'];
const NAMES = ['name-only', 'name', 'names', 'filename', 'filenames', 'file', 'files', 'path', 'paths', 'which', 'what'];
const NAME_STATUS = ['name-status', 'status', 'statuses', 'added', 'deleted', 'modified', 'renamed', 'change type', 'kind',
  'kinds', 'how each', 'how they'];
const PATCH = ['patch', 'patches', 'diff', 'diffs', 'changes', 'changed', 'change', 'content', 'contents', 'full',
  'lines', 'code'];
export const MOD_WORDS = {
  'http.get.fail': ['fail', 'fails', 'failing', 'failure', 'error', 'errors', 'strict', 'status', 'non-zero', 'nonzero'],
  'http.head.fail': ['fail', 'fails', 'failing', 'failure', 'error', 'errors', 'strict', 'status', 'non-zero', 'nonzero'],
  'git.status.short': ['short', 'brief', 'briefly', 'compact', 'concise', 'terse', 'summary', 'quick', 'condensed', 'one line', 'per line'],
  'git.status.branch': ['branch', 'tracking', 'upstream', 'ahead', 'behind'],
  'git.status.porcelain': ['porcelain', 'machine', 'machine-readable', 'script', 'scripts', 'parse', 'parsable', 'parseable', 'stable',
    'dirty', 'clean'],
  'git.log.oneline': [...ONE_LINE, 'messages'],
  'git.log.format=subject': ['subject', 'subjects', 'message', 'messages', 'title', 'titles', 'headline', 'headlines', 'summary', 'summaries'],
  'git.log.format=hash_subject': [...ONE_LINE, 'message', 'messages'],
  'git.log.format=hash_author_date_subject': ['author', 'authors', 'who', 'date', 'dates', 'when'],
  'git.log.format=fuller': ['full', 'fuller', 'committer', 'committers', 'everything', 'all details', 'detailed'],
  'git.log.date_format=relative': ['relative', 'ago', 'how long ago', 'human'],
  'git.log.date_format=short': ['short', 'date', 'dates', 'day', 'days', 'yyyy-mm-dd'],
  'git.log.date_format=iso': ['iso', 'iso-8601', 'iso8601', 'timestamp', 'timestamps'],
  'git.log.graph': ['graph', 'graphs', 'tree', 'topology', 'branching', 'ascii', 'visual', 'visualize', 'visualise', 'drawn', 'drawing'],
  'git.log.decorate': ['decorate', 'decorated', 'decoration', 'decorations', 'ref', 'refs', 'tag', 'tags', 'branch names', 'labels', 'pointers', 'labelled', 'labeled'],
  'git.log.stat': STAT,
  'git.log.name_only': NAMES,
  'git.log.name_status': NAME_STATUS,
  'git.log.patch': PATCH,
  'git.show.oneline': ONE_LINE,
  'git.show.stat': STAT,
  'git.show.name_only': NAMES,
  'git.show.name_status': NAME_STATUS,
  'git.show.no_patch': ['message', 'messages', 'subject', 'summary', 'header', 'headers', 'metadata', 'meta', 'info',
    'information', 'author', 'who', 'date', 'when', 'details', 'only', 'just', 'no diff', 'no patch', 'without', 'quiet', 'quietly', 'skip the diff', 'skip diff',
    'hide the diff', 'without the diff', 'not the diff', 'no-patch'],
  'git.diff.stat': STAT,
  'git.diff.name_only': NAMES,
  'git.diff.name_status': NAME_STATUS,
  'git.diff.word_diff': ['word-diff', 'word', 'words', 'word-level', 'word-by-word', 'inline', 'word diff'],
  'git.branch.verbose': ['verbose', 'details', 'detail', 'detailed', 'commit', 'commits', 'hash', 'hashes', 'sha',
    'subject', 'subjects', 'message', 'messages', 'tracking', 'upstream', 'info', 'latest', 'last', 'tip', 'tips'],
  'text.search.files_with_matches': ['file', 'files', 'filename', 'filenames', 'which', 'where', 'names', 'paths', 'path',
    'is there', 'are there'],
  'text.search.only_matching': ['occurrence', 'occurrences', 'occurence', 'occurences', 'match', 'matches', 'matched',
    'matching part', 'hit', 'hits', 'instance', 'instances', 'times', 'extract', 'extracted', 'only', 'just', 'each',
    'every', 'token', 'tokens', 'part', 'parts', 'value', 'values', 'string', 'strings', 'mentions', 'mention', 'tally',
    'how often', 'frequency'],
  'text.search.no_line_number': ['without', 'no', 'plain', 'bare', 'clean', 'unnumbered'],
  'json.select.raw': ['raw', 'plain', 'unquoted', 'quotes', 'quote', 'bare', 'text', 'string', 'strings', 'just', 'only',
    'field', 'fields', 'value', 'values', 'key', 'keys', 'name', 'names'],
  'json.select.compact': ['compact', 'compacted', 'one line', 'single line', 'single-line', 'minified', 'minify',
    'condensed', 'oneline', 'one-line', 'per line', 'one per line'],
  'dir.list.one_per_line': ['names', 'name', 'one-per-line', 'one line', 'each line', 'one each', 'one per line', 'per line', 'single column', 'one column', 'own line', 'line by line', 'each on'],
  'files.find.type=f': ['file', 'files', 'filename', 'filenames', 'regular', 'source', 'sources'],
  'file.count.lines': ['line', 'lines', 'loc', 'long', 'length', 'rows', 'row', 'entries', 'entry', 'how many',
    'number of', 'count', 'counts', 'commits', 'branches', 'files', 'matches', 'occurrences', 'times', 'results',
    'items', 'processes', 'packages', 'dependencies', 'deps', 'hits'],
  'file.count.words': ['word', 'words', 'wordcount'],
  'file.count.bytes': ['byte', 'bytes', 'size', 'sizes', 'big', 'bigger', 'large', 'heavy', 'weigh', 'weighs'],
  'file.count.chars': ['char', 'chars', 'character', 'characters', 'letters'],
  'lines.sort.numeric': ['numeric', 'numerically', 'number', 'numbers', 'count', 'counts', 'value', 'values', 'size',
    'sizes', 'biggest', 'largest', 'smallest', 'highest', 'lowest', 'most', 'least', 'top'],
  'lines.sort.human': ['human', 'human-readable', 'size', 'sizes', 'biggest', 'largest', 'smallest'],
};

// ---------- 1. cover words: a free occurrence needs one of the elements ----------
// keys: `op.mod`, `op` (the op is present), `freq` (the macro), `~literal` (every Pattern is literal and
// there is at least one), `rev:HEAD` handled in rule 4. `need` is checked only when `when` holds.
const COVER = [
  { words: ['merge commits', 'merge commit', 'merges'], keys: ['git.log.merges_only', 'git.log.no_merges'] },
  { words: ['dedupe', 'dedup', 'deduplicate', 'deduplicated', 'deduped', 'de-duplicate', 'unique', 'distinct', 'uniq'],
    keys: ['lines.sort.unique', 'lines.uniq', 'freq'] },
  { words: ['each occurrence', 'every occurrence', 'each match', 'every match', 'per line', 'all occurrences'],
    when: ['text.search'], unlessMods: ['context', 'before', 'after', 'max_count'], keys: ['text.search.only_matching', 'text.search.count_matches'] },
  { words: ['literally', 'literal', 'verbatim', 'fixed string', 'fixed-string', 'as a literal'], keys: ['~literal'] },
  { words: ['smart case', 'smart-case', 'smartcase'], keys: ['text.search.smart_case'] },
  { words: ['compact', 'compacted', 'minified'], when: ['json.select'], keys: ['json.select.compact'] },
  { words: ['only the matching', 'matching text', 'matching part', 'matched part', 'just the match', 'only the match',
    'just the matches', 'only the matches'], when: ['text.search'], keys: ['text.search.only_matching'] },
  { words: ['verbose'], when: ['git.branch'], keys: ['git.branch.verbose'] },
  { words: ['drop duplicate', 'drop duplicates', 'remove duplicate', 'remove duplicates', 'drop dupes', 'remove dupes',
    'without duplicates', 'no duplicates'], keys: ['lines.sort.unique', 'lines.uniq.count', 'lines.uniq!repeated'] },
  { words: ['full', 'every dependency', 'all dependencies', 'all deps', 'transitive', 'whole tree', 'entire tree'],
    when: ['npm.ls'], keys: ['npm.ls.all', 'npm.ls.depth'] },
  { words: ['remote branches', 'remote branch', 'remote-tracking'], when: ['git.branch'], keys: ['git.branch.remotes', 'git.branch.all'] },
  { words: ['every ref', 'all refs', 'every branch', 'all branches'], when: ['git.log'], keys: ['git.log.all_refs'] },
  { words: ['containing', 'contains', 'contain'], when: ['git.branch'], unless: ['text.search', 'git.log'], keys: ['git.branch.contains'] },
];
// "which files mention X": a search that answers with files needs -l / -L / -c.
const WHICH_FILES = ['files that', 'files which', 'files containing', 'files mentioning', 'files where', 'files having'];
const NAMES_ONLY = ['filenames', 'file names', 'names of files', 'names of the files', 'only names', 'just names',
  'only the names', 'just the names', 'only file names', 'just filenames', 'only filenames'];
const WHICH_LEAD = new Set(['which', 'what', 'list', 'whch']);
const FILE_WORDS = new Set(['files', 'file', 'filenames']);

// Extensionless names that are files, not directories.
const FILE_NAMES = new Set(['makefile', 'dockerfile', 'license', 'licence', 'readme', 'gemfile', 'rakefile', 'procfile',
  'jenkinsfile', 'vagrantfile', 'changelog', 'brewfile', 'podfile', 'containerfile', 'justfile', 'caddyfile']);
const isFileLike = (p) => {
  const base = p.replace(/\/+$/, '').split('/').pop();
  return /^[^.].*\.[A-Za-z0-9]{1,10}$/.test(base) || /^\.[A-Za-z0-9_-]+$/.test(base) && base !== '.git' || FILE_NAMES.has(base.toLowerCase());
};

// "most common", "rank", "top 5": what the freq macro answers ("how many times X appears" is a total).
const FREQ_STRICT = ['rank', 'ranked', 'ranking', 'most', 'often', 'frequent', 'frequency', 'frequencies', 'common',
  'popular', 'top', 'tally', 'breakdown', 'group', 'grouped', 'histogram', 'distribution', 'by count', 'per line',
  'each distinct', 'each unique', 'counts of each', 'count of each', 'how many of each'];
// Things that are whole log lines: a frequency table over them without -o is right.
const LINE_NOUNS = ['line', 'lines', 'warnings', 'errors', 'messages', 'entries', 'events', 'requests', 'records'];
// A word the request uses as an instruction, never as search text.
const META_PATTERNS = new Set(['produces', 'produce', 'prints', 'returns', 'generates', 'emits', 'yields', 'uniq',
  'sort', 'sorted', 'extension', 'extensions']);
// jq fields made up from request wording.
const FIELD_FILLER = new Set(['which', 'what', 'body', 'raw', 'output', 'result', 'it', 'this', 'that', 'field', 'value', 'key']);
// dot-files a bare ".name" glob legitimately names
const DOTFILES = new Set(['env', 'gitignore', 'gitattributes', 'editorconfig', 'npmrc', 'nvmrc', 'bashrc', 'zshrc', 'profile',
  'dockerignore', 'eslintrc', 'prettierrc', 'babelrc', 'git', 'github', 'vscode', 'idea', 'cache', 'config', 'local', 'ssh']);
const SCRIPT_NAMES = new Set(['lint', 'build', 'start', 'dev', 'format', 'typecheck', 'e2e', 'deploy', 'serve', 'watch', 'check', 'test', 'release', 'prepare']);
// directory names that are also English words
const DIRISH = new Set(['checks', 'scripts', 'config', 'configs', 'work', 'docs', 'src', 'lib', 'libs', 'tests', 'test', 'app',
  'apps', 'bin', 'build', 'dist', 'packages', 'modules', 'tools', 'utils', 'data', 'assets', 'public', 'templates', 'content']);
// Capitalised product names: context, not values.
export const PRODUCT_NAMES = new Set(['django', 'rails', 'react', 'docker', 'kubernetes', 'python', 'node', 'rust', 'java', 'linux',
  'mac', 'windows', 'jenkins', 'terraform', 'postgres', 'redis', 'vue', 'angular', 'flask', 'laravel', 'webpack', 'vite',
  'jest', 'ruby', 'golang', 'swift', 'kotlin', 'android', 'xcode', 'slack', 'chrome', 'firefox', 'nginx', 'apache']);
// Filter clauses ("lines with X", "files that mention X"): the next content word is a value.
const FILTER_LEADS = ['lines with', 'lines containing', 'lines matching', 'lines mentioning', 'lines having',
  'that mentions', 'that mention', 'that has', 'that have', 'that use', 'that uses', 'that contain', 'that contains',
  'that reference', 'that references', 'that import', 'that imports'];
const FILTER_SKIP = new Set(['a', 'an', 'the', 'any', 'some', 'contain', 'contains', 'mention', 'mentions', 'have', 'has', 'with', 'word', 'string', 'text', 'start', 'starts', 'begin', 'begins', 'end', 'ends', 'match', 'matches', 'include', 'includes',
  'commit', 'tag', 'literal', 'literally', 'phrase', 'both', 'either', 'it', 'their', 'its', 'working', 'pattern', 'regex', 'term', 'stderr', 'stdout']);

// Words this module gives a meaning to: never "unexplained" next to a value.
export const STRICT_KNOWN = new Set([...Object.values(MOD_WORDS).flat(), ...COVER.flatMap((r) => r.words), ...FREQ_STRICT,
  ...WHICH_FILES].flatMap((p) => p.split(' ')).concat(['incl', 'excl', 'rank', 'ranked', 'repeated', 'used', 'calls', 'import', 'imports', 'alive', 'set', 'present',
  'defined', 'exist', 'exists', 'configured', 'enabled', 'disabled', 'pinned', 'available', 'installed', 'up', 'mentioned', 'declared', 'occurs', 'occur', 'appears', 'shows', 'lives', 'sits', 'command']));

// Roles whose copied spans are text values (span integrity applies).
const TEXT_ROLES = new Set(['pattern', 'mod:grep_message', 'mod:author', 'name', 'mod:name_glob', 'mod:any_name']);
// A text value that is only a filler word was copied from the request's wording, not its content.
const FILLER = new Set(['please', 'pls', 'plz', 'thanks', 'thx', 'kindly', 'the', 'a', 'an', 'it', 'them', 'this',
  'that', 'these', 'those', 'here', 'there', 'me', 'my']);
// git vocabulary is never a bare-word path ("files changed in commit X" is not "-- commit").
const GIT_NOUNS = new Set(['commit', 'commits', 'branch', 'branches', 'tag', 'tags', 'stash']);
// generic request words that are not a path unless the request names them as one ("the folder named files"); the
// scope words ("repo", "project") are a path only outside git (where they mean the whole work tree: "git diff", not "-- repo")
const PATH_STOPWORDS = new Set(['unstaged', 'staged', 'changes', 'changed', 'files', 'file', 'directory', 'directories', 'folder', 'folders',
  'dir', 'dirs', 'here', 'everything', 'everywhere', 'whole', 'all']);
const GIT_SCOPE_WORDS = new Set(['repo', 'repos', 'repository', 'repositories', 'project', 'codebase', 'tree', 'worktree', 'workspace']);
const DIR_NOUNS = new Set(['folder', 'folders', 'directory', 'directories', 'dir', 'dirs', 'file', 'named', 'called']);
// a word that names a git ref by itself ("on develop", "from release/2.3")
const REF_WORD = /^(main|master|develop|development|dev|trunk|staging|production|prod|(release|hotfix|feature|bugfix|origin|upstream)\/[\w./-]+)$/;
const REF_PREP = new Set(['on', 'in', 'from']);
// "dev server", "in production mode": the word is not a ref
const REF_NOT_NEXT = new Set(['server', 'servers', 'environment', 'env', 'box', 'machine', 'host', 'mode', 'build', 'builds', 'dependencies', 'deps', 'dependency', 'folder', 'directory', 'dir', 'config', 'logs', 'log']);
const KNOWN_IDENT = new Set(['macos', 'ios', 'ipados', 'node_modules', '__pycache__', 'github', 'gitlab', 'javascript', 'typescript']);
const PATH_PREP = new Set(['in', 'under', 'inside', 'within', 'from', 'of', 'at', 'into', 'through', 'across', 'for']);
const CUE_LEAD = new Set(['including', 'include', 'incl', 'with', 'plus', 'and', 'no', 'without', 'also', 'even']);
const PATH_NEXT_REF = new Set(['branch', 'tag', 'commit', 'ref', 'remote']);
const OPERATOR = /^(=|==|===|!=|<=|>=|=>|->|:=|\+=|-=|&&|\|\|)$/;
const ALLCAPS = /^[A-Z][A-Z0-9_]+$/;
const CAPWORD = /^[A-Z][a-z]+(['’]s)?$/;
// All-caps words that are request vocabulary, not values.
const IGNORE_CAPS = new Set(['README', 'LICENSE', 'CHANGELOG', 'NAS', 'GPU', 'SSD', 'USB', 'GET', 'POST', 'PUT', 'JSON', 'YAML', 'YML', 'XML', 'HTML', 'CSV', 'TSV', 'SQL', 'CSS', 'JS',
  'TS', 'POM', 'JAR', 'NPM', 'GIT', 'SSH', 'TLS', 'SSL', 'DNS', 'PDF', 'PNG', 'JPG', 'SVG', 'ZIP', 'TAR', 'EOF', 'OK', 'PR', 'PRS', 'CPU', 'RAM', 'MB', 'GB', 'KB', 'TB', 'ID', 'IDS', 'URL', 'API', 'HTTP',
  'HTTPS', 'PID', 'PIDS', 'TCP', 'UDP', 'OS', 'CLI', 'UI', 'IP', 'IPS', 'MD', 'PLS', 'ASAP', 'FYI', 'LOC', 'UTC', 'ISO', 'CI', 'CD',
  'QA', 'AWS', 'GCP', 'IDE', 'VM', 'VMS', 'K8S']);

export function strictObligations(ir, stages, ctx, used, h) {
  const { seg } = ctx;
  const { words, consumed, fail, hasFree, hasMod, specOf, prevOf, inCue, isKnown, isUnknownWord } = h;
  // unknown and not a typo of a known word ("undr", "presnt", "maching")
  const unknown = (w) => isUnknownWord(w) && !STRICT_KNOWN.has(w) && !h.nearKnown(w);
  const execInfos = stages.filter((s) => s.kind !== 'macro');
  const hasFreq = stages.some((s) => s.kind === 'macro');
  // a free word or a part of a free hyphenated word ("human-numeric")
  const hasFreeH = (list) => hasFree(list) || list.find((ph) => !ph.includes(' ') && words.some((w, i) => !consumed.has(i) && w.includes('-') && w.split('-').includes(ph)));
  const nextOf = (info) => stages.find((s) => s.part === info.part && s.stage === info.stage + 1);
  const ops = new Set(execInfos.map((i) => i.exec.op));
  const has = (key) => {
    if (key === 'freq') return hasFreq;
    if (key === '~literal') {
      const pats = execInfos.flatMap((i) => [...(i.exec.args.pattern || []), ...(i.exec.mods.find((m) => m.mod === 'grep_message')?.values || [])]);
      return pats.every((v) => v.k !== 'span' || v.pkind !== 'regex') && pats.every((v) => v.k !== 'norm');
    }
    const [base, without] = key.split('!');
    const [o1, o2, mod] = base.split('.');
    return execInfos.some((i) => i.exec.op === `${o1}.${o2}` && (!mod || hasMod(i, mod)) && !(without && hasMod(i, without)));
  };

  // ---------- 3. unrequested mods ----------
  const impliedHolds = (info, spec) => [].concat(spec.implied?.when || []).some((w) => {
    if (w === 'always') return true;
    if (w === 'piped') return !!nextOf(info);
    if (w === 'each') return nextOf(info)?.kind === 'each';
    if (w.startsWith('after:')) {
      const [o1, o2, mod] = w.slice(6).split('.');
      const p = prevOf(info);
      return !!p?.exec && p.exec.op === `${o1}.${o2}` && (!mod || p.exec.mods.some((m) => m.mod === mod));
    }
    return false;
  });
  for (const info of execInfos) {
    const op = info.exec.op;
    for (const m of info.exec.mods) {
      const spec = specOf(info, m.mod);
      if (impliedHolds(info, spec)) continue;
      const consts = (m.values || []).filter((v) => v.k === 'const').map((v) => `${op}.${m.mod}=${v.id}`);
      const keys = [`${op}.${m.mod}`, ...consts].filter((k) => MOD_WORDS[k]);
      if (keys.length) {
        // find -type f with a "*.ext" name: the request names a file type
        const extGlob = op === 'files.find' && ['name_glob', 'any_name'].some((x) => (info.modValues[x] || []).some((g) => /\.[A-Za-z0-9]+$/.test(g)));
        // -type f is the natural default when the found paths are sized, named, or fed to a file command
        const typeFOk = extGlob || ['size_gt', 'size_lt', 'size', 'name_glob', 'any_name'].some((x) => hasMod(info, x)) || nextOf(info)?.kind === 'each';
        for (const k of keys) if (!(k === 'files.find.type=f' && typeFOk) && !(k === 'git.log.oneline' && hasFree(['commits'])) && !hasFreeH(MOD_WORDS[k]) && !h.flagSpelled(info, spec)) fail('unrequested_mod', `${k} needs one of: ${MOD_WORDS[k].slice(0, 6).join(', ')}`);
        continue;
      }
      if (h.requireWordsFor(op, m)) continue; // REQUIRE_WORDS: checked in obligations()
      if (spec.cue || spec.polarity === 'neg') continue;
      if ((m.values || []).length && m.values.every((v) => v.u)) continue; // a value copied from the request
      if (h.flagSpelled(info, spec)) continue;
      fail('unrequested_mod', `${op}.${m.mod}${consts.length ? ` (${consts.join(', ')})` : ''} has no supporting request word`);
    }
  }

  // ---------- 1. cover words ----------
  for (const r of COVER) {
    if (r.when && !r.when.some((o) => ops.has(o))) continue;
    if (r.unless && r.unless.some((o) => ops.has(o))) continue;
    if (r.unlessMods && execInfos.some((i) => r.unlessMods.some((x) => hasMod(i, x)))) continue;
    const w = hasFree(r.words);
    if (!w) continue;
    // "unique" counted by freq only when the request counts ("how many unique", "count distinct")
    const ok = r.keys.some((k) => (k === 'freq' ? hasFreq && ctx.cues.some((c) => ['COUNT', 'FREQ'].includes(c.cls)) : has(k)));
    if (!ok) fail('cover', `"${w}" needs ${r.keys.join(' or ')}`);
  }
  const filesWith = words.findIndex((w, i) => w === 'files' && words[i + 1] === 'with' && !consumed.has(i) && !consumed.has(i + 1));
  const whichFiles = (filesWith >= 0 && !['grep', 'rg', 'ripgrep', 'line', 'lines'].includes(words[filesWith + 2]) && !/^\d/.test(words[filesWith + 2] || '')) || hasFree(WHICH_FILES) || hasFree(NAMES_ONLY) || words.some((w, i) => WHICH_LEAD.has(w) && !consumed.has(i)
    && words.slice(i + 1, i + 4).some((x, k) => FILE_WORDS.has(x) && !consumed.has(i + 1 + k)));
  // "line numbers and filenames" is file:line output
  if (whichFiles && !hasFree(['line numbers', 'line number', 'line no', 'line nos'])) {
    for (const info of execInfos) {
      if (info.exec.op !== 'text.search' || nextOf(info) || info.kind === 'each') continue;
      const p = prevOf(info);
      if (p?.exec && (['files.find', 'dir.list'].includes(p.exec.op) || ['name_only', 'name_status', 'files_with_matches'].some((x) => hasMod(p, x)))) continue; // filters a name list
      if (!['files_with_matches', 'files_without_match', 'count', 'count_matches'].some((x) => hasMod(info, x)))
        fail('cover', '"which files" but the search prints matching lines');
    }
  }

  // ---------- 2. span integrity ----------
  const isFree = (i) => i >= 0 && i < seg.units.length && !consumed.has(i);
  const glued = (i, j) => seg.units[i].e === seg.units[j].s;
  for (const v of used) {
    if (v.role === 'paths' && v.kind === 'span' && !/[/.~]/.test(v.value) && !isQuotedUnit(seg.units[v.u[0]])) {
      if (GIT_NOUNS.has(v.value.toLowerCase())) fail('span', `path "${v.value}" is a git noun`);
      const lw = v.value.toLowerCase();
      if ((PATH_STOPWORDS.has(lw) || (GIT_SCOPE_WORDS.has(lw) && [...ops].some((o) => o.startsWith('git.')))) && !DIR_NOUNS.has(words[v.u[1]]) && !['named', 'called'].includes(words[v.u[0] - 1]))
        fail('span', `path "${v.value}" is a generic request word, not a path`);
      if (inCue(v.u[0]) && CUE_LEAD.has(words[v.u[0] - 1])) fail('span', `path "${v.value}" is a cue word`);
      if (FILLER.has(v.value.toLowerCase()) || ['and', 'or', 'of', 'in', 'with', 'for', 'to', 'on'].includes(v.value.toLowerCase()))
        fail('span', `path "${v.value}" is a function word`);
      if (words[v.u[0] - 1] === 'on' && ops.has('git.log')) fail('span', `"on ${v.value}" names a branch, not a path`);
      if (isFree(v.u[1]) && PATH_NEXT_REF.has(words[v.u[1]])) fail('span', `"${v.value} ${words[v.u[1]]}" names a ref, not a path`);
    }
    const typeD = execInfos.some((i) => i.exec.op === 'files.find' && (i.modValues.type || []).includes('d'));
    if (['mod:name_glob', 'mod:any_name'].includes(v.role) && !/[*?[]/.test(v.value) && !v.value.includes('.') && h.isExtWord(v.value) && !typeD)
      fail('span', `glob "${v.value}" is an extension without a wildcard`);
    // ".sh" / ".min.js" without a wildcard matches only a file of that exact name
    if (/glob|name/.test(v.role) && /^!?\.[A-Za-z0-9]/.test(v.value) && !/[*?[/]/.test(v.value)) {
      const rest = v.value.replace(/^!?\./, '');
      const parts = rest.toLowerCase().split('.');
      if (!DOTFILES.has(parts[0]) && ((parts.length === 1 && rest.length <= 5 && h.isExtWord(rest)) || (parts.length === 2 && ['min', 'test', 'spec', 'd', 'module', 'bundle'].includes(parts[0]) && h.isExtWord(parts[1])))) fail('span', `glob "${v.value}" is an extension without a wildcard`);
    }
    if (/glob|name/.test(v.role) && /\.\.\.?/.test(v.value)) fail('span', `glob "${v.value}" holds a revision range`);
    // a path that runs over request words ("schedule-run.log by name with retry")
    if (v.role === 'paths' && / /.test(v.value) && !isFileLike(v.value) && !isQuotedUnit(seg.units[v.u[0]]) && v.value.split(' ').some((x) => ['by', 'with', 'and', 'or', 'on', 'for', 'to', 'the'].includes(x.toLowerCase())))
      fail('span', `path "${v.value}" runs over request words`);
    // a path cut before an unexplained final word ("~/infra/my stacks")
    if (v.role === 'paths' && v.kind === 'span' && /\//.test(v.value) && !/\/$/.test(v.value) && !isFileLike(v.value) && isFree(v.u[1]) && !glued(v.u[1] - 1, v.u[1])
      && (v.u[1] + 1 === seg.units.length || /^[.!?,;]$/.test(seg.units[v.u[1] + 1].t)) && unknown(words[v.u[1]]) && !inCue(v.u[1]))
      fail('span', `path "${v.value}" stops before the unexplained word "${words[v.u[1]]}"`);
    // "users and orders": the second operand is dropped
    if (v.role === 'paths' && v.kind === 'span' && words[v.u[1]] === 'and' && isFree(v.u[1]) && isFree(v.u[1] + 1) && !inCue(v.u[1] + 1)
      && (/[./]/.test(seg.units[v.u[1] + 1].t) || ['folders', 'folder', 'dirs', 'directories', 'files'].includes(words[v.u[1] + 2]))) fail('dropped_value', `"${v.value} and ${seg.units[v.u[1] + 1].t}" drops the second operand`);
    if (!(v.kind === 'span' || v.kind === 'norm:possessive') || !TEXT_ROLES.has(v.role)) continue;
    if (/^[.,;:!?]$/.test(v.value) && v.u[0] > 0 && seg.units[v.u[0] - 1].e === seg.units[v.u[0]].s) fail('span', `"${v.value}" is trailing punctuation`);
    if (FILLER.has(v.value.toLowerCase())) fail('span', `"${v.value}" is a filler word`);
    const [a, b] = v.u;
    if (b - a === 1 && isQuotedUnit(seg.units[a])) continue;
    const first = seg.units[a].t;
    const last = seg.units[b - 1].t;
    if (b - a > 1 && (OPERATOR.test(first) || OPERATOR.test(last))) fail('span', `"${v.value}" starts or ends with an operator`);
    for (const [i, edge, side] of [[a - 1, first, 'before'], [b, last, 'after']]) {
      if (!isFree(i)) continue;
      const t = seg.units[i].t;
      const w = unitWord(seg.units[i]);
      if (OPERATOR.test(t)) fail('span', `"${v.value}" stops at the operator "${t}" (${side})`);
      if (ALLCAPS.test(edge) && ALLCAPS.test(t) && !inCue(i)) fail('span', `"${v.value}" stops inside the all-caps phrase "${t}" (${side})`);
      if (CAPWORD.test(edge.replace(/['’]s$/, '')) && CAPWORD.test(t) && !isKnown(w.replace(/['’]s$/, '')) && !inCue(i))
        fail('span', `"${v.value}" stops inside the name phrase "${t}" (${side})`);
      const atEnd = i + 1 === seg.units.length || /^[.!?,;]$/.test(seg.units[i + 1].t);
      const procGrep = execInfos.some((x) => x.exec.op === 'proc.list');
      if (side === 'after' && ['pattern', 'mod:grep_message'].includes(v.role) && atEnd && !procGrep && unknown(w) && !inCue(i) && !/['"`]/.test(t)) fail('span', `"${v.value}" stops before the unexplained word "${t}" (${side})`);
      if (side === 'after' && t === '!' && glued(b - 1, i) && i + 1 < seg.units.length) fail('span', `"${v.value}" drops the "!" glued to it`);
    }
  }

  // Dropped values: an unconsumed token that can only be content (ALL-CAPS, camelCase / snake_case
  // identifier, commit hash, a Capitalized unknown word mid-sentence), or an unknown word that names
  // the lines / script / operand the request is about ("INSERT lines", "lint script", "for figs").
  seg.units.forEach((u, i) => {
    if (consumed.has(i) || inCue(i) || isQuotedUnit(u)) return;
    const t = u.t;
    const w = words[i];
    if (ALLCAPS.test(t) && !IGNORE_CAPS.has(t)) fail('dropped_value', `"${t}" is not used by any value`);
    if (KNOWN_IDENT.has(w)) return;
    if (/^[a-z]+[A-Z][A-Za-z0-9]*$/.test(t) || /^[A-Za-z][A-Za-z0-9]*_[A-Za-z0-9_]+$/.test(t)) fail('dropped_value', `identifier "${t}" is not used by any value`);
    if (/^[0-9a-f]{7,40}$/.test(t) && ((/[0-9]/.test(t) && /[a-f]/.test(t)) || words[i - 1] === 'commit')) fail('dropped_value', `hash "${t}" is not used by any value`);
    if (/^[A-Za-z][\w.-]*(::[\w.-]*|:[\w.-]+)$/.test(t) && !/^https?:/i.test(t)) fail('dropped_value', `"${t}" is not used by any value`);
    const sentenceStart = i === 0 || /^[.!?:;]$/.test(seg.units[i - 1].t);
    // "the Completed lines", "each Processing by line": a capitalised word naming the lines is a value
    if (!sentenceStart && CAPWORD.test(t) && words.slice(i + 1, i + 3).some((x) => ['line', 'lines'].includes(x))) fail('dropped_value', `"${t}" is not used by any value`);
    if (!sentenceStart && CAPWORD.test(t) && !FILE_NAMES.has(w) && !PRODUCT_NAMES.has(w) && unknown(w.replace(/['’]s$/, ''))) fail('dropped_value', `"${t}" is not used by any value`);
    if (i > 0 && unknown(w) && ['lines', 'line', 'script'].includes(words[i + 1]) && words[i + 2] !== 'numbers') fail('dropped_value', `"${t} ${words[i + 1]}" is not used by any value`);
    const end = i + 1 === words.length || /^[.!?,;]$/.test(seg.units[i + 1].t);
    const noPaths = !used.some((v) => v.role === 'paths');
    if ((unknown(w) || /^[@#$]/.test(t)) && end && (['in', 'under', 'inside', 'within', 'from'].includes(words[i - 1]) || (words[i - 1] === 'for' && noPaths && ops.has('dir.list'))) && !words.some((x, k) => x === w && consumed.has(k)))
      fail('dropped_value', `"${words[i - 1]} ${t}" names an operand no value uses`);
  });

  // ---------- 4. data-audit patterns ----------
  if (hasFree(['empty out', 'clear out', 'truncate', 'wipe', 'empty the file'])) fail('coverage', 'truncating a file is not expressible');
  // "match case" / "case-sensitive" contradict -i
  const caseSensitive = ctx.cues.find((c) => ['match case', 'case-sensitive', 'case sensitive'].includes(c.phrase));
  if (caseSensitive && execInfos.some((i) => hasMod(i, 'ignore_case'))) fail('cue', `"${caseSensitive.phrase}" but the command ignores case`);
  for (const info of stages) {
    const p = prevOf(info);
    if (info.kind === 'macro') {
      if (!hasFree(FREQ_STRICT) && !ctx.cues.some((c) => c.cls === 'FREQ')) fail('freq', 'a frequency table but the request asks for no ranking / per-item counts');
      if (p?.exec?.op === 'text.search') checkSearchCount(p, 'freq');
      continue;
    }
    const op = info.exec.op;
    if (op === 'lines.uniq' && hasMod(info, 'count')) {
      const pp = p?.exec?.op === 'lines.sort' ? prevOf(p) : p;
      if (pp?.exec?.op === 'text.search') checkSearchCount(pp, 'uniq -c');
    }
    // git log is newest first: tail takes the oldest commits
    if (op === 'file.tail' && p?.exec?.op === 'git.log' && !hasMod(p, 'reverse') && !hasMod(p, 'max_count') && !hasMod(info, 'bytes')
      && (!hasFree(['line', 'lines', 'bytes']) || hasFree(['newest', 'latest', 'most recent', 'recent'])) && !hasFree(['oldest', 'earliest', 'first']))
      fail('direction', 'git log | tail takes the oldest commits; the newest N is git log -n N');
    // git show --oneline still prints the patch
    if (op === 'git.show' && hasMod(info, 'oneline') && !['no_patch', 'stat', 'name_only', 'name_status'].some((x) => hasMod(info, x))
      && !hasFree(['diff', 'patch', 'changes', 'changed', 'what changed', 'contents', 'content']))
      fail('scope', 'git show --oneline without -s also prints the patch');
    // "message / summary of X": git show without -s also prints the patch
    if (op === 'git.show' && !['no_patch', 'stat', 'name_only', 'name_status'].some((x) => hasMod(info, x))
      && hasFree(['message', 'messages', 'summary', 'subject', 'header', 'metadata', 'quiet', 'quietly', 'info'])
      && !hasFree(['diff', 'patch', 'changes', 'what changed', 'contents'])) fail('scope', 'git show without -s prints the patch too');
    // "uncommitted" = staged + unstaged = git diff HEAD
    if (op === 'git.diff' && hasFree(['uncommitted', 'not committed', 'not yet committed']) && !hasMod(info, 'staged')
      && !(info.values.rev || []).includes('HEAD')) fail('scope', '"uncommitted" changes are git diff HEAD');
    // git diff REV compares REV with the work tree; "changed in REV" is git show
    if (op === 'git.diff' && (info.values.rev || []).length === 1 && !/\.\./.test(info.values.rev[0])) {
      const rv = info.exec.args.rev[0];
      const before = rv.u ? words[rv.u[0] - 1] : undefined;
      if (['in', 'by', 'commit'].includes(before)) fail('scope', `"${before} ${info.values.rev[0]}" names one commit; git diff compares it with the work tree`);
    }
    // git log REV lists every ancestor: "commit X" / "subject of X" is one commit
    if (op === 'git.log' && (info.values.rev || []).length === 1 && !/\.\./.test(info.values.rev[0]) && !hasMod(info, 'max_count')
      && (hasFree(['commit']) || (['of', 'for'].includes(words[(info.exec.args.rev[0].u || [0])[0] - 1]) && hasFree(['message', 'subject', 'header'])))
      && !hasFree(['commits', 'history', 'log', 'ancestors', 'since', 'up to', 'reachable']))
      fail('scope', 'git log REV lists all its ancestors, not one commit');
    // git branch -a lists remote branches too: "local branches" is plain git branch
    if (op === 'git.branch' && hasMod(info, 'all') && hasFree(['local']) && !hasFree(['remote', 'remotes'])) fail('scope', 'git branch -a also lists remote branches');
    // --grep=HEAD / --grep=v1.2 after "tag" / "commit": a ref searched as message text
    for (const v of info.exec.mods.find((m) => m.mod === 'grep_message')?.values || []) {
      const val = v.u ? seg.text.slice(seg.units[v.u[0]].s, seg.units[v.u[1] - 1].e) : '';
      if (op === 'git.log' && v.u && (val === 'HEAD' || ['tag', 'commit', 'for', 'of'].includes(words[v.u[0] - 1]) && /^(v?\d+(\.\d+)+|HEAD(~\d+)?)$/.test(val)))
        fail('scope', `"${val}" is a ref, not message text`);
    }
    // --format without the asked-for date / author
    if (op === 'git.log' && (info.modValues.format || []).length && !['hash_author_date_subject', 'fuller'].includes(info.exec.mods.find((m) => m.mod === 'format').values[0].id)
      && hasFree(['date', 'dates', 'author', 'authors']) && !hasMod(info, 'author')) fail('cover', 'the format drops the asked-for author / date');
    // ls -h without -l shows no sizes
    if (op === 'dir.list' && hasMod(info, 'human') && !hasMod(info, 'long')) fail('scope', 'ls -h without -l shows no sizes');
    // "hidden files" / "only hidden": ls -A lists everything
    if (op === 'dir.list' && hasMod(info, 'hidden')) {
      const hid = words.findIndex((w) => w === 'hidden');
      const nounNext = ['files', 'file', 'entries', 'entry', 'dirs', 'directories', 'folders', 'ones', 'items', 'stuff'].includes(words[hid + 1]);
      const onlyBefore = ['only', 'just'].includes(words[hid - 1]) || ['only', 'just'].includes(words[hid - 2]);
      const incl = hasFree(['including', 'include', 'includes', 'with', 'too', 'also', 'plus', 'and', 'all', 'even', 'every', 'everything']);
      if (hid >= 0 && onlyBefore && !(incl && nounNext)) fail('scope', 'ls -A lists all entries, not only the hidden ones');
    }
    // npm test | tail: jest/vitest write to stderr
    if ((op === 'npm.test' || op === 'npm.run') && nextOf(info) && info.exec.stderr !== 'merge')
      fail('stderr', `${op} piped without 2>&1: the runner's output goes to stderr`);
    // wc | wc counts the lines of wc's own output
    if (op === 'file.count' && p?.exec?.op === 'file.count') fail('count_kind', 'wc after wc counts its output lines');
  }

  auditLeaks();

  // rg -c / --count-matches print one count per file: a total over a directory needs | wc -l
  const perFileCue = ctx.cues.some((c) => c.cls === 'PER_FILE') || whichFiles || hasFree(['each file', 'every file', 'per file', 'by file', 'files', 'counts'])
    || words.some((w, i) => ['each', 'every', 'per'].includes(w) && words.slice(i + 1, i + 3).some((x) => ['file', 'log', 'script', 'module', 'source'].includes(x)));
  for (const info of execInfos) {
    if (info.exec.op !== 'text.search' || !['count', 'count_matches'].some((x) => hasMod(info, x)) || info.position !== 'first') continue;
    const paths = info.values.paths || [];
    if (!perFileCue && (paths.length !== 1 || !isFileLike(paths[0]))) fail('per_file', 'rg -c counts per file; the request asks for a total');
  }

  // Audit r3: dropped filters / operands and misread roles still accepted after r2.
  function auditLeaks() {
    const patVals = execInfos.flatMap((i) => i.values.pattern || []);
    const freeWordAfter = (lead) => {
      const p = lead.split(' ');
      for (let i = 0; i + p.length <= words.length; i++) {
        if (!p.every((w, k) => words[i + k] === w && !consumed.has(i + k))) continue;
        let j = i + p.length;
        while (j < words.length && FILTER_SKIP.has(words[j]) && !consumed.has(j)) j++;
        if (j < words.length && !consumed.has(j) && !inCue(j) && /[A-Za-z0-9]/.test(seg.units[j].t) && !STRICT_KNOWN.has(words[j]) && !GIT_NOUNS.has(words[j])) return seg.units[j].t;
      }
      return null;
    };
    // "lines with X", "files that mention X": X must be a value
    for (const lead of FILTER_LEADS) {
      const x = freeWordAfter(lead);
      if (x) fail('dropped_value', `"${lead} ${x}": "${x}" is not used by any value`);
    }
    // "vs main", "against main": the compared ref must be used
    for (const lead of ['vs', 'versus', 'against']) {
      const x = freeWordAfter(lead);
      if (x && ops.has('git.diff')) fail('dropped_value', `"${lead} ${x}": "${x}" is not used by any value`);
    }
    // "starts with X" needs an anchored pattern
    if (hasFree(['start with', 'starts with', 'starting with', 'begin with', 'begins with', 'beginning with']) && patVals.length && !patVals.some((p) => p.startsWith('^')))
      fail('cover', '"starts with" needs a ^ anchor');
    // an instruction word used as the search pattern; a typo searched while the real word is dropped
    for (const info of execInfos) for (const v of info.exec.args.pattern || []) {
      if (!v.u) continue;
      const w = words[v.u[0]];
      if (v.u[1] - v.u[0] === 1 && META_PATTERNS.has(w) && !isQuotedUnit(seg.units[v.u[0]])) fail('span', `pattern "${w}" is a request word`);
      if (v.u[1] - v.u[0] === 1 && isUnknownWord(w) && !ops.has('proc.list') && seg.units[v.u[0]].t === w && !STRICT_KNOWN.has(w) && [...STRICT_KNOWN].some((k) => k.length >= 5 && !k.startsWith(w) && !w.startsWith(k) && edit1(w, k))
        && words.some((x, k) => !consumed.has(k) && !inCue(k) && x.length >= 4 && isUnknownWord(x) && !STRICT_KNOWN.has(x)))
        fail('span', `pattern "${w}" is a typo while another word is dropped`);
      // "notes or todo files": names, not content
      if (FILE_WORDS.has(words[v.u[1]]) && isFree(v.u[1]) && info.exec.op === 'text.search' && info.position === 'first' && !['files_with_matches', 'files_without_match', 'count'].some((x) => hasMod(info, x))) fail('scope', `"${w} ${words[v.u[1]]}" names files, not content`);
      // "src and include" read as a grep filter on find output
      if (info.kind !== 'each' && info.position !== 'first' && prevOf(info)?.exec?.op === 'files.find' && words[v.u[0] - 1] === 'and') fail('scope', `"${w}" is a second search root, not a filter`);
    }
    // a file name as a git diff revision
    for (const info of execInfos) {
      if (!['git.diff', 'git.show', 'git.log'].includes(info.exec.op)) continue;
      if ((info.values.paths || []).length) for (const r of info.values.rev || []) if (/\.[A-Za-z][A-Za-z0-9]+$/.test(r) && !/\.\./.test(r) && !/^v?\d/.test(r)) fail('scope', `"${r}" is a file, not a revision`);
    }
    // "on develop" / "from release/2.3": a ref the request names must reach an op that takes a revision
    const revInfos = execInfos.filter((i) => i.op.positionals.some((p) => p.role === 'rev'));
    if (revInfos.length) {
      for (let i = 1; i < words.length; i++) {
        let k = i;
        if (words[k] === 'branch' && !consumed.has(k)) k++;
        if (k >= words.length || !REF_PREP.has(words[i - 1]) || consumed.has(k) || isQuotedUnit(seg.units[k])) continue;
        const t = seg.units[k].t;
        if (!REF_WORD.test(t) && !(k > i && /^[\w./-]+$/.test(t))) continue;
        if (REF_NOT_NEXT.has(words[k + 1])) continue;
        if (!revInfos.some((r) => (r.values.rev || []).includes(t))) fail('dropped_value', `"${words[i - 1]} ${t}" names a ref the command does not use`);
      }
    }
    for (const info of stages) {
      if (info.kind === 'macro') continue;
      const op = info.exec.op;
      const p = prevOf(info);
      // git show prints the commit header first: head shows no file names
      if (op === 'file.head' && p?.exec?.op === 'git.show' && !hasMod(p, 'format') && !hasMod(p, 'oneline')) fail('scope', 'git show | head shows the commit header');
      // first N lines of each file that ... is per file, not of the match list
      if (op === 'file.head' && p?.exec?.op === 'text.search' && p.position === 'first' && !['files_with_matches', 'files_without_match'].some((x) => hasMod(p, x))
        && words.some((w, i) => w === 'lines' && words[i + 1] === 'of' && !consumed.has(i + 1) && words.slice(i + 2, i + 5).some((x) => ['each', 'every', 'files', 'file'].includes(x) || h.isExtWord(x))))
        fail('scope', '"first N lines of files" is per file; rg | head takes N matching lines');
      // "remote branches": -a lists the local ones first
      if (op === 'git.branch' && hasMod(info, 'all') && hasFree(['remote', 'remotes']) && !hasFree(['all', 'local', 'every', 'both', 'including', 'include', 'incl', 'too', 'also', 'plus', 'and']) && nextOf(info)?.exec?.op === 'file.head') fail('scope', 'git branch -a lists local branches first');
      // "tag X": git log lists every ancestor
      if (op === 'git.log' && !hasMod(info, 'max_count') && (info.exec.args.rev || []).some((r) => r.u && words[r.u[0] - 1] === 'tag')
        && !hasFree(['commits', 'history', 'log', 'since', 'up to', 'reachable'])) fail('scope', 'git log TAG lists all its ancestors, not the tag commit');
      // "listing files" with find but no -type f
      if (op === 'files.find' && hasMod(info, 'exclude_dir') && !hasMod(info, 'type') && !['name_glob', 'any_name', 'path_glob'].some((x) => hasMod(info, x)) && hasFree(['files', 'file'])) fail('scope', 'find without -type f lists directories too');
      // a file-name search without a name filter
      if (op === 'files.find' && !['name_glob', 'any_name', 'path_glob'].some((x) => hasMod(info, x)) && words.some((w, k) => !consumed.has(k) && FILE_NAMES.has(w)))
        fail('dropped_value', 'a file name the find does not use');
      // npm ls --depth=0 for "top level of DIR"
      if (op === 'npm.ls' && hasFree(['top level of', 'top-level of']) && !hasFree(['deps', 'dep', 'dependency', 'dependencies', 'packages', 'package', 'modules', 'npm', 'installed'])) fail('scope', '"top level" of a directory is not npm ls');
    }
    if ((hasFree(['top level', 'top-level']) || used.some((v) => v.kind === 'norm:scope_top')) && !ops.has('npm.ls') && freeWordAfter('for')) fail('dropped_value', `"for ${freeWordAfter('for')}" is not used by any value`);
    if (hasFree(['zombie', 'zombies', 'defunct']) && ops.has('proc.kill')) fail('scope', 'zombie processes cannot be killed');
    if (hasFree(['backwards', 'backward', 'reversed order', 'in reverse']) && !execInfos.some((i) => hasMod(i, 'reverse'))) fail('cover', '"backwards" needs a reverse');
    if (hasFree(['json', 'jsonl', 'ndjson']) && ops.has('text.search') && ops.size === 1 && !used.some((v) => /\.jsonl?$/i.test(v.value))) fail('cover', 'JSON output is not produced');
    const fieldNoun = hasFree(['field', 'fields', 'key', 'keys', 'property', 'attribute']);
    for (const info of execInfos) if (info.exec.op === 'json.select') for (const f of Object.values(info.values).flat()) {
      const x = String(f).replace(/^\./, '').toLowerCase();
      if (['which', 'what', 'it', 'this', 'that'].includes(x) || (FIELD_FILLER.has(x) && !fieldNoun)) fail('span', `jq field "${f}" is a request word`);
    }
    // "lint script" not run
    if ([...ops].some((o) => o.startsWith('npm.'))) words.forEach((w, i) => {
      if (['script', 'scripts'].includes(words[i + 1]) && !consumed.has(i) && SCRIPT_NAMES.has(w) && !(w === 'test' && ops.has('npm.test')))
        fail('dropped_value', `"${w} script" is not run`);
    });
    // "*.py" type in "every py in utils" dropped
    words.forEach((w, i) => {
      if (consumed.has(i) || !['each', 'every', 'all'].includes(words[i - 1]) || !h.isExtWord(w) || ['log', 'lock', 'config', 'data', 'text'].includes(w)) return;
      if (!used.some((v) => String(v.value).toLowerCase().endsWith(`.${w}`))) fail('coverage', `file type "${w}" is not used by any value`);
    });
    // "dotfiles in the current directory" lifted as a path
    if (ops.has('dir.list') && hasFree(['current directory', 'current dir', 'current folder', 'this directory', 'this folder', 'cwd'])
      && used.some((v) => v.role === 'paths' && v.value !== '.' && !isFileLike(v.value))) fail('scope', 'lists a directory, the request says the current one');
    // a "." search while "in DIR" is dropped
    const dotPath = execInfos.some((i) => ['text.search', 'files.find'].includes(i.exec.op) && i.position === 'first' && i.inStream === 'none'
      && !(i.exec.args.paths || []).some((v) => v.u));
    if (dotPath) words.forEach((w, i) => {
      if (consumed.has(i) || inCue(i) || !['in', 'under', 'inside', 'within'].includes(words[i - 1]) || consumed.has(i - 1)) return;
      if (unknown(w) || DIRISH.has(w)) fail('dropped_value', `"${words[i - 1]} ${w}" names a directory the search does not use`);
    });
  }

  // rg/grep over a directory or several files prefixes every line with its path: counting identical
  // lines then counts path:line (the IR cannot express -I / --no-filename). Without -o, the counted
  // lines are whole lines, not matches.
  function checkSearchCount(s, what) {
    if (s.inStream !== 'none' && s.position !== 'first') return;
    if (['files_with_matches', 'files_without_match', 'count', 'count_matches'].some((x) => hasMod(s, x))) fail('scope', `${what} over per-file counts / names`);
    const paths = s.values.paths || [];
    if (paths.length !== 1 || !isFileLike(paths[0])) fail('scope', `${what} over a directory search counts path:line, not the matches`);
    if (!hasMod(s, 'only_matching') && !hasFree(LINE_NOUNS)) fail('cover', `${what} without -o counts whole lines, not matches`);
  }
}

// one insert / delete / substitute apart ("presnt" ~ "present")
function edit1(a, b) {
  if (a === b || Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  return a.slice(i + 1) === b.slice(i + 1) || a.slice(i) === b.slice(i + 1) || a.slice(i + 1) === b.slice(i);
}
