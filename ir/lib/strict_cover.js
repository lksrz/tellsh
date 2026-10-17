// Gate step 3, strict cue coverage (docs/ir_error_taxonomy_v2.md F1, F5): a free request cue needs the element
// it names (NEED), and must not meet the element that contradicts it (FORBID). Called from strict.js with its
// helpers; every failure is `cover: ...` (or `files_list: ...`). Tuned on train gold (dataset v2).
//
// Rule fields: id, words (free phrase, any), when (ops, any present), need (keys, any), forbid (keys, none),
// unless (free phrases that cancel the rule). Key forms: `op`, `op.mod`, `op.mod=const`, `op.mod!other`.

const REMOTE = ['remote', 'remotes', 'remote-tracking'];
const ALL_BRANCHES = ['local', 'all branches', 'every branch', 'all the branches', 'including remote', 'including remotes',
  'remote too', 'remotes too', 'remote ones too', 'local and remote', 'remote and local', 'plus remote', 'plus remotes',
  'and remote', 'and remotes', 'both', 'with remotes', 'with remote', 'as well', 'included', 'including', 'incl', 'include'];
const NOT_LOCAL = ['nothing local', 'no local', 'not local', 'without local', 'not the local', 'only remote', 'only the remote', 'remote only', 'remotes only', 'just remote', 'just the remote'];

export const COVER_RULES = [
  // uniq -d / -u
  { id: 'uniq_repeated', words: ['only repeated', 'only the repeated', 'only duplicated', 'only the duplicated', 'only duplicate',
    'only the duplicate', 'dupes only', 'duplicates only', 'only dupes', 'only duplicates', 'only the dupes', 'only the duplicates',
    'just the duplicates', 'just duplicates', 'just the dupes', 'more than once', 'appear twice', 'which repeat', 'that repeat',
    'duplicated lines', 'duplicate lines only'],
  unless: ['remove', 'drop', 'without', 'dedupe', 'collapse', 'how many', 'count', 'counts', 'number of', 'frequency', 'top', 'most', 'common', 'consecutive'],
  need: ['lines.uniq.repeated'] },
  { id: 'uniq_unique', words: ['appear only once', 'appears only once',
    'occur only once', 'occurs only once', 'exactly once', 'singletons', 'non-repeated', 'non repeated',
    'not repeated', 'never repeated', 'unrepeated', 'never repeat', "don't repeat", 'do not repeat', 'not duplicated', 'no duplicates at all'],
  unless: ['how many', 'count', 'number of'], need: ['lines.uniq.unique_only'] },
  { id: 'uniq_collapse', words: ['collapse', 'squash', 'dedupe adjacent'],
    forbid: ['lines.uniq.repeated', 'lines.uniq.unique_only'] },
  // sort / wc
  { id: 'sort_numeric', words: ['numeric', 'numerically', 'numerical', 'by number', 'as numbers'], when: ['lines.sort'],
    need: ['lines.sort.numeric', 'lines.sort.human'] },
  { id: 'wc_words', words: ['words', 'word count', 'wordcount', 'word counts'], when: ['file.count'], unless: ['lines', 'line', 'whole', 'grep'],
    need: ['file.count.words'] },
  { id: 'wc_bytes', words: ['bytes', 'byte count', 'byte size'], when: ['file.count'], unless: ['lines', 'line', 'words'],
    need: ['file.count.bytes', 'file.count.chars'] },
  { id: 'wc_chars', words: ['characters', 'chars', 'character count'], when: ['file.count'], unless: ['lines', 'line', 'words'],
    need: ['file.count.chars', 'file.count.bytes'] },
  // git log format / dates
  { id: 'log_hash_subject', words: ['hash and subject', 'hashes and subjects', 'hash and message', 'hashes and messages',
    'sha and subject', 'shas and subjects', 'hash and title', 'hashes and titles', 'sha and message', 'shas and messages'],
  when: ['git.log'], need: ['git.log.format=hash_subject', 'git.log.oneline'] },
  { id: 'log_subject_only', words: ['subjects only', 'only subjects', 'just subjects', 'just the subjects', 'only the subjects',
    'subject lines only', 'only subject lines', 'just subject lines', 'just the subject lines', 'only the subject lines',
    'just the subject', 'only the subject', 'without hashes', 'no hashes', 'without the hash', 'no hash'],
  when: ['git.log'], need: ['git.log.format=subject'] },
  { id: 'log_fuller', words: ['fuller', 'committer', 'committers'], when: ['git.log'], need: ['git.log.format=fuller'] },
  { id: 'log_author_date', words: ['author and date', 'authors and dates', 'date and author', 'dates and authors',
    'with author', 'with authors', 'with the author', 'with dates', 'with the date', 'with date', 'who and when', 'with their author',
    'and author', 'and authors', 'and date', 'and dates', 'author, date', 'authors, dates'],
  when: ['git.log'], forbid: ['git.log.oneline', 'git.log.format=subject', 'git.log.format=hash_subject'] },
  { id: 'log_relative', words: ['relative date', 'relative dates', 'relative time', 'relative times', 'how long ago', 'relative'],
    when: ['git.log'], need: ['git.log.date_format=relative'] },
  { id: 'log_iso', words: ['iso', 'iso-8601', 'iso8601', 'iso 8601'], when: ['git.log'], need: ['git.log.date_format=iso'] },
  { id: 'log_until', words: ['until', 'up until', 'till'], when: ['git.log'], need: ['git.log.until'] },
  { id: 'log_patch', words: ['with patches', 'with patch', 'with the patch', 'with diffs', 'with the diffs', 'with the diff',
    'with diff', 'including diffs', 'including the diff', 'including patches', 'plus the diff', 'plus diffs', 'and their diffs',
    'and the diffs', 'and patches'], when: ['git.log'], need: ['git.log.patch', 'git.log.stat'] },
  { id: 'git_stat', words: ['diffstat', 'stat', 'stats', 'with stats', 'insertions', 'deletions'], when: ['git.log', 'git.show', 'git.diff'],
    need: ['git.log.stat', 'git.show.stat', 'git.diff.stat'] },
  { id: 'git_name_only', words: ['names only', 'only the names', 'only names', 'just the names', 'just names', 'filenames only',
    'only filenames', 'just filenames', 'just the filenames', 'only the filenames', 'file names only', 'just the file names',
    'only the file names', 'only file names', 'just file names', 'name-only'], when: ['git.log', 'git.show', 'git.diff'],
  need: ['git.log.name_only', 'git.show.name_only', 'git.diff.name_only', 'git.log.name_status', 'git.show.name_status', 'git.diff.name_status'] },
  { id: 'diff_staged', words: ['staged', 'cached', 'in the index'], when: ['git.diff'],
    unless: ['unstaged', 'not staged', 'uncommitted', 'and staged', 'staged and', 'or staged', 'not yet staged', "haven't staged", 'not been staged', 'before staging'],
    need: ['git.diff.staged'] },
  { id: 'log_decorate', words: ['decorate', 'decorated', 'decorations', 'branch labels', 'with labels', 'ref names', 'with refs', 'tag labels'],
    when: ['git.log'], need: ['git.log.decorate'] },
  { id: 'log_graph', words: ['graph', 'as a graph', 'ascii graph'], when: ['git.log'], need: ['git.log.graph'] },
  // show vs diff
  { id: 'show_vs', words: ['vs', 'versus', 'compared to', 'compared with', 'working tree', 'work tree', 'against'], when: ['git.show'], unless: ['parent', 'its parent', 'previous commit'],
    forbid: ['git.show'] },
  // git status
  { id: 'status_short', words: ['short', 'brief', 'compact', 'concise', 'short format', 'short form'], when: ['git.status'],
    unless: ['porcelain', 'machine', 'machine-readable'], need: ['git.status.short', 'git.status.porcelain'] },
  { id: 'status_branch', words: ['branch info', 'branch line', 'branch header', 'with branch', 'with the branch', 'tracking info',
    'ahead', 'behind', 'and branch', 'plus branch', 'branch name', 'branch and', 'tracking'], when: ['git.status'], need: ['git.status.branch'] },
  { id: 'status_porcelain', words: ['porcelain', 'machine-readable', 'machine readable', 'script-friendly', 'parseable', 'parsable'],
    when: ['git.status'], need: ['git.status.porcelain'] },
  // branches
  { id: 'branch_current', words: ['current branch', 'which branch am i on', 'what branch am i on', 'branch am i on', "branch i'm on",
    'branch i am on', 'active branch', 'checked out branch', 'checked-out branch', 'branch is checked out', 'current git branch'],
  when: ['git.branch'], unless: ['all', 'every', 'branches', 'other', 'others'], need: ['git.branch.show_current'] },
  { id: 'branch_tracking', words: ['tracking info', 'tracking information', 'tracking branch', 'tracking branches', 'upstream', 'upstreams',
    'their upstream', 'remote-tracking branch', 'what they track', 'which remote', 'tracked branch', 'tracking'], when: ['git.branch'],
  unless: ['remote tracking', 'remote-tracking', 'remote branches'], need: ['git.branch.very_verbose'] },
  // ls
  { id: 'ls_one_per_line', words: ['one per line', 'one column', 'single column', 'one entry per line', 'one name per line',
    'each on its own line', 'one-per-line', 'one file per line', 'a single column'], when: ['dir.list'],
  need: ['dir.list.one_per_line', 'dir.list.long'] },
  { id: 'ls_recursive', words: ['recursive', 'recursively', 'recurse', 'recursing'], when: ['dir.list'], need: ['dir.list.recursive'] },
  { id: 'ls_itself', words: ['itself', 'not its contents', 'not the contents', 'not their contents', 'themselves', 'directory entry'], when: ['dir.list'], need: ['dir.list.directory'] },
  { id: 'ls_contents', words: ['contents', 'inside', "what's in", 'what is in'], when: ['dir.list'],
    unless: ['itself', 'themselves', 'entry', 'entries', 'not', 'no', 'without', 'only', 'just'], forbid: ['dir.list.directory'] },
  // find
  { id: 'find_links', words: ['symlinks', 'symlink', 'symbolic links', 'symbolic link', 'softlinks', 'soft links'],
    when: ['files.find'], need: ['files.find.type=l'] },
  { id: 'find_empty', words: ['empty'], when: ['files.find'], unless: ['non-empty', 'not empty', 'nonempty', 'empty out'],
    need: ['files.find.empty'] },
  { id: 'find_min_depth', words: ['or deeper', 'below the top', 'not at the top'], when: ['files.find'],
    unless: ['no deeper', 'not deeper'], need: ['files.find.min_depth'] },
  // curl
  { id: 'curl_silent', words: ['quiet', 'quietly', 'silent', 'silently', 'no progress', 'hide progress', 'without progress',
    'hide the progress', 'without the progress', 'no progress bar', 'suppress progress', 'without a progress'],
  when: ['http.get', 'http.head', 'http.download'], unless: ['fail silently', 'silently fail'],
  need: ['http.get.silent', 'http.head.silent', 'http.download.silent'] },
  { id: 'curl_show_error', words: ['show errors', 'still show errors', 'but show errors', 'errors still', 'print errors', 'show error',
    'report errors', 'keep errors', 'errors visible', 'with errors'], when: ['http.get', 'http.head', 'http.download'],
  need: ['http.get.show_error', 'http.head.show_error', 'http.download.show_error'] },
  { id: 'curl_fail', words: ['fail on', 'fail if', 'fail when', 'fail-on', 'silently fail', 'fail silently', 'failing on', 'fail for',
    'exit non-zero', 'exit nonzero', 'nonzero exit', 'non-zero exit', 'fail on error', 'fail on errors', 'fail fast', 'fail-fast'],
  when: ['http.get', 'http.head'], need: ['http.get.fail', 'http.head.fail'] },
  { id: 'curl_include_headers', words: ['include headers', 'including headers', 'include the headers', 'including the headers',
    'headers and body', 'headers and the body', 'body and headers', 'headers too', 'with headers', 'with the headers', 'plus headers',
    'plus the headers', 'headers along', 'headers included', 'along with headers', 'along with the headers', 'body with headers',
    ], when: ['http.get', 'http.head'], unless: ['only', 'just'],
  need: ['http.get.include_headers'], forbid: ['http.head'] },
  { id: 'curl_head_only', words: ['headers only', 'only headers', 'just headers', 'just the headers', 'only the headers',
    'head request', 'only the response headers', 'just the response headers', 'response headers only', 'no body', 'without the body',
    'without body', 'skip the body'], when: ['http.get', 'http.head'], unless: ['or', 'body', 'included', 'include', 'including', 'lines'], need: ['http.head'] },
  // jq
  { id: 'jq_raw', words: ['raw', 'unquoted', 'without quotes', 'no quotes', 'strip quotes', 'strip the quotes', 'without the quotes',
    'raw strings', 'raw output', 'not quoted', 'plain strings', 'plain text'], when: ['json.select'], need: ['json.select.raw'] },
];

export function coverObligations(cx) {
  const { words, fail, hasFree, execInfos, ops, hasMod, ctx, seg, used, consumed } = cx;
  const has = (key) => {
    const [base, without] = key.split('!');
    const [path, cst] = base.split('=');
    const [o1, o2, mod] = path.split('.');
    return execInfos.some((i) => i.exec.op === `${o1}.${o2}` && (!mod || hasMod(i, mod))
      && (!cst || (i.modValues[mod] || []).includes(cst)) && !(without && hasMod(i, without)));
  };

  // F1: rg --files skips ignored files; a plain listing is find -type f
  if (ops.has('files.list') && !ctx.cues.some((c) => c.cls === 'IGNORED')
    && !words.some((w) => ['rg', 'ripgrep', 'gitignore', '.gitignore', 'ignored', 'gitignored', 'respect', 'respecting', 'respects'].includes(w)))
    fail('files_list', 'rg --files skips ignored files; listing files is find -type f');

  for (const r of COVER_RULES) {
    if (r.when && !r.when.some((o) => ops.has(o))) continue;
    const w = hasFree(r.words);
    if (!w) continue;
    if (r.unless && hasFree(r.unless)) continue;
    if (r.need && !r.need.some(has)) fail('cover', `"${w}" needs ${r.need.join(' or ')} [${r.id}]`);
    const bad = (r.forbid || []).find(has);
    if (bad) fail('cover', `"${w}" contradicts ${bad} [${r.id}]`);
  }

  // git branch: "remote branches" is -r; "all / local and remote branches" is -a
  if (ops.has('git.branch') && hasFree(REMOTE)) {
    const allCue = hasFree(ALL_BRANCHES);
    if (!allCue && has('git.branch.all') && !has('git.branch.remotes')) fail('cover', '"remote branches" is git branch -r; -a also lists local ones [branch_remote]');
    if (allCue && !hasFree(NOT_LOCAL) && has('git.branch.remotes') && !has('git.branch.all')) fail('cover', `"${allCue}" needs git branch -a, -r lists only remote ones [branch_all]`);
  }

  // find: directories / folders as the listed noun need -type d
  if (ops.has('files.find') && !has('files.find.type=d') && !has('files.find.exclude_dir')) {
    const DIRN = ['directories', 'folders', 'dirs', 'subdirectories', 'subfolders', 'subdirs'];
    const PREP = new Set(['in', 'under', 'inside', 'within', 'from', 'of', 'at', 'into', 'through', 'across', 'for', 'below', 'beneath', 'over', 'outside', 'skip', 'skipping', 'excluding', 'exclude', 'not', 'no', 'except', 'ignore', 'ignoring', 'without', 'and', 'or', 'between']);
    const FILEN = new Set(['file', 'files', 'filenames', 'filename']);
    words.forEach((w, i) => {
      if (!DIRN.includes(w) || consumed.has(i) || cx.inCue(i)) return;
      if (words.slice(Math.max(0, i - 3), i).some((x) => PREP.has(x))) return;
      if (words.slice(0, i).some((x, k) => FILEN.has(x) && !consumed.has(k))) return;
      if (words.slice(i + 1).some((x, k) => FILEN.has(x) && !consumed.has(i + 1 + k))) return;
      fail('cover', `"${w}" names directories; find needs -type d [find_dirs]`);
    });
  }

  // anchors: "ends with X" -> X$, "starts with X" -> ^X; never the other anchor
  const END = ['ends with', 'end with', 'ending with', 'ends in', 'end in', 'ending in', 'that end with', 'finishing with', 'finish with'];
  const START = ['start with', 'starts with', 'starting with', 'begin with', 'begins with', 'beginning with'];
  const patterns = [];
  for (const info of execInfos) (info.exec.args.pattern || []).forEach((v, k) => patterns.push({ v, val: (info.values.pattern || [])[k] }));
  const spanWords = (u) => (u ? words.slice(u[0], u[1]) : []);
  const phraseIn = (ws, list) => list.some((ph) => { const p = ph.split(' '); return ws.some((_, i) => p.every((x, k) => ws[i + k] === x)); });
  for (const { v, val } of patterns) {
    if (typeof val !== 'string') continue;
    // a norm whose units hold the other cue
    if (v.k === 'norm' && v.kind === 'starts_with' && phraseIn(spanWords(v.u), END) && !phraseIn(spanWords(v.u), START)) fail('cover', '"ends with" read as starts-with [anchor_end]');
    if (v.k === 'norm' && v.kind === 'ends_with' && phraseIn(spanWords(v.u), START) && !phraseIn(spanWords(v.u), END)) fail('cover', '"starts with" read as ends-with [anchor_start]');
    if (!v.u || v.k !== 'span') continue;
    // the free cue right before the span ("lines ending with ;"): the span must carry the anchor
    let j = v.u[0] - 1;
    while (j >= 0 && ['a', 'an', 'the', 'string', 'text', 'word', 'literal', 'pattern', 'regex'].includes(words[j]) && !consumed.has(j)) j--;
    const before = words.slice(Math.max(0, j - 2), j + 1).join(' ');
    const endCue = END.some((ph) => before.endsWith(ph)) && !consumed.has(j);
    const startCue = START.some((ph) => before.endsWith(ph)) && !consumed.has(j);
    if (endCue && (!val.endsWith('$') || (val.startsWith('^') && !hasFree(START)))) fail('cover', `"ends with ${val}" needs a $ anchor and no ^ [anchor_end]`);
    if (startCue && val.endsWith('$') && !val.startsWith('^') && !hasFree(END)) fail('cover', `"starts with ${val}" got a $ anchor [anchor_start]`);
  }
  void seg; void used;
}
