// Gate step 3, strict cue coverage (docs/ir_error_taxonomy_v2.md F1, F5; v4.md fixes 4, 5, 9, 18): a free request cue needs the element
// it names (NEED), and must not meet the element that contradicts it (FORBID). Called from strict.js with its
// helpers; every failure is `cover: ...` (or `files_list: ...`). Tuned on train gold (datasets v2, v4). The git rules
// live in strict_cover_git.js.
//
// Rule fields: id, words (free phrase, any), when (ops, any present), need (keys, any), forbid (keys, none),
// unless (free phrases that cancel the rule), near (words present anywhere, any, needed for the rule to fire).
// Key forms: `op`, `op.mod`, `op.mod=const`, `op.mod!other`.

import { GIT_COVER_RULES, gitCoverObligations } from './strict_cover_git.js';

const DEPTH = ['depth', 'deep', 'level', 'levels', 'deeper', 'mindepth', 'maxdepth', 'nested', 'subdirectory', 'subdirectories'];
const IGNORE_CASE = ['ignore case', 'ignoring case', 'case-insensitive', 'case insensitive', 'case-insensitively', 'case insensitively',
  'any case', 'regardless of case', 'case does not matter', "case doesn't matter"];

export const COVER_RULES = [
  // uniq -d / -u
  { id: 'uniq_repeated', words: ['only repeated', 'only the repeated', 'only duplicated', 'only the duplicated', 'only duplicate',
    'only the duplicate', 'dupes only', 'duplicates only', 'only dupes', 'only duplicates', 'only the dupes', 'only the duplicates',
    'just the duplicates', 'just duplicates', 'just the dupes', 'more than once', 'appear twice', 'which repeat', 'that repeat',
    'duplicated lines', 'duplicate lines only'],
  unless: ['remove', 'drop', 'without', 'dedupe', 'collapse', 'how many', 'count', 'counts', 'number of', 'frequency', 'top', 'most', 'common'],
  need: ['lines.uniq.repeated'] },
  { id: 'uniq_unique', words: ['appear only once', 'appears only once',
    'occur only once', 'occurs only once', 'exactly once', 'singletons', 'non-repeated', 'non repeated',
    'not repeated', 'never repeated', 'unrepeated', 'never repeat', "don't repeat", 'do not repeat', 'not duplicated', 'no duplicates at all',
    'occurring once', 'occurs once', 'occur once', 'appearing once', 'appear once', 'appears once', 'non-repeating', 'one-off', 'singles',
    'lines that are unique'],
  unless: ['how many', 'count', 'number of'], need: ['lines.uniq.unique_only'] },
  // a duplicate noun with no removal / count cue asks for the repeated lines ("adjacent duplicates in a.txt")
  { id: 'uniq_dup_noun', words: ['duplicates', 'duplicate', 'duplicated', 'dupes', 'dups', 'repeats', 'repeated', 'repeating', 'repeat',
    'adjacent repeats'], when: ['lines.uniq'],
  unless: ['remove', 'removed', 'removing', 'drop', 'dropped', 'dropping', 'dedupe', 'deduped', 'dedup', 'deduplicate', 'deduplicated',
    'collapse', 'collapsed', 'collapses', 'collapsing', 'merge', 'merged', 'merging', 'squash', 'squashed', 'squashing', 'fold', 'folding',
    'without', 'no dupes', 'no duplicates', 'no repeats', 'count', 'counts', 'counted', 'counting', 'how many', 'number of', 'frequency',
    'how often', 'top', 'most', 'once', 'not', 'never', 'non', "don't", 'unique', 'distinct', 'keep duplicates', 'keeping duplicates',
    'duplicates kept', 'strip', 'stripped', 'eliminate', 'get rid'],
  need: ['lines.uniq.repeated'] },
  { id: 'uniq_collapse', words: ['collapse', 'collapsed', 'collapses', 'collapsing', 'squash', 'squashed', 'squashing', 'dedupe adjacent',
    'fold', 'removed', 'remove', 'drop', 'each line once'], when: ['lines.uniq'],
  unless: ['only repeated', 'only the repeated', 'only duplicated', 'only duplicates', 'only the duplicates', 'only dupes', 'only once',
    'exactly once', 'occurring once', 'appearing once', 'appear once', 'occur once',
    'singletons', 'unique', 'count', 'counts', 'how many'],
    forbid: ['lines.uniq.repeated', 'lines.uniq.unique_only'] },
  // sort / wc
  { id: 'sort_dedupe', words: ['no dupes', 'no duplicates', 'duplicates removed', 'dropping repeats', 'with duplicates removed',
    'drop duplicates', 'remove duplicates', 'without duplicates', 'dedupe', 'deduped', 'deduplicated', 'deduplicate'], when: ['lines.sort'],
  unless: ['at all', 'keep', 'keeping', 'kept'], need: ['lines.sort.unique', 'lines.uniq!repeated'] },
  { id: 'sort_keep_dups', words: ['keep duplicates', 'keeping duplicates', 'duplicates kept', 'keep dupes', 'keep the duplicates',
    'keeping the duplicates', 'keep repeats'], when: ['lines.sort'], forbid: ['lines.sort.unique', 'lines.uniq'] },
  { id: 'sort_numeric', words: ['numeric', 'numerically', 'numerical', 'by number', 'as numbers', 'number sort', 'numbers'], when: ['lines.sort'],
    unless: ['line numbers', 'line number'],
    need: ['lines.sort.numeric', 'lines.sort.human'] },
  { id: 'wc_words', words: ['words', 'word count', 'wordcount', 'word counts'], when: ['file.count'], unless: ['lines', 'line', 'whole', 'grep'],
    need: ['file.count.words'], forbid: ['file.count.lines'] },
  { id: 'wc_bytes', words: ['bytes', 'byte count', 'byte size'], when: ['file.count'], unless: ['lines', 'line', 'words'],
    need: ['file.count.bytes', 'file.count.chars'], forbid: ['file.count.lines'] },
  { id: 'wc_chars', words: ['characters', 'chars', 'character count'], when: ['file.count'], unless: ['lines', 'line', 'words'],
    need: ['file.count.chars', 'file.count.bytes'], forbid: ['file.count.lines'] },
  // tail -F
  { id: 'tail_retry', words: ['retry', 'retrying', 'retries', 'rotation', 'rotated', 'rotate', 'rotates', 'recreated', 'gets recreated'],
    when: ['file.tail'], unless: ['no retry', 'without retry', "don't retry", 'do not retry', 'not retry'], need: ['file.tail.follow_retry'] },
  { id: 'tail_retry', words: ['by name', 'reopen', 'reopens'], when: ['file.tail'],
    near: ['follow', 'follows', 'following', 'watch', 'watching', 'stream', 'streaming', 'live', 'keep', '-f', '-F'],
    need: ['file.tail.follow_retry'] },
  { id: 'tail_no_retry', words: ['no retry', 'without retry', "don't retry", 'do not retry', 'without retrying', 'no retrying'],
    when: ['file.tail'], forbid: ['file.tail.follow_retry'] },
  // grep / rg case
  { id: 'search_ignore_case', words: IGNORE_CASE, when: ['text.search'], unless: ['not case insensitive', 'case sensitive', 'case-sensitive'],
    forbid: ['text.search.case_sensitive', 'text.search.smart_case'] },
  // ls
  { id: 'ls_one_per_line', words: ['one per line', 'one column', 'single column', 'one entry per line', 'one name per line',
    'each on its own line', 'one-per-line', 'one file per line', 'a single column'], when: ['dir.list'],
  need: ['dir.list.one_per_line', 'dir.list.long'] },
  { id: 'ls_recursive', words: ['recursive', 'recursively', 'recurse', 'recursing'], when: ['dir.list'], need: ['dir.list.recursive'] },
  { id: 'ls_itself', words: ['itself', 'not its contents', 'not the contents', 'not their contents', 'themselves', 'directory entry',
    'dir entry', 'directory-only', 'no contents'], when: ['dir.list'], need: ['dir.list.directory'] },
  { id: 'ls_contents', words: ['contents', 'inside', "what's in", 'what is in'], when: ['dir.list'],
    unless: ['itself', 'themselves', 'directory entry', 'dir entry', 'not', 'no', 'without', 'only', 'just'], forbid: ['dir.list.directory'] },
  { id: 'ls_contents', words: ['entries of', 'hidden entries included'], when: ['dir.list'], unless: ['itself', 'themselves'],
    forbid: ['dir.list.directory'] },
  // find
  { id: 'find_links', words: ['symlinks', 'symlink', 'symbolic links', 'symbolic link', 'softlinks', 'soft links'],
    when: ['files.find'], need: ['files.find.type=l'] },
  { id: 'find_empty', words: ['empty'], when: ['files.find'], unless: ['non-empty', 'not empty', 'nonempty', 'empty out'],
    need: ['files.find.empty'] },
  { id: 'find_min_depth', words: ['or deeper', 'below the top', 'not at the top'], when: ['files.find'],
    unless: ['no deeper', 'not deeper'], need: ['files.find.min_depth'] },
  { id: 'find_min_depth', words: ['at least', 'or more', 'starting at depth', 'from depth', 'levels under', 'levels below', 'levels down'],
    when: ['files.find'], near: DEPTH, unless: ['within', 'max', 'maximum', 'no more than', 'no deeper', 'not deeper', 'at most', 'or less', 'or fewer', 'up to', 'max depth', 'maximum depth',
      'bytes', 'kb', 'mb', 'gb', 'size', 'bigger', 'larger', 'days', 'minutes', 'hours'],
    need: ['files.find.min_depth'] },
  { id: 'find_max_depth', words: ['or less', 'at most', 'no deeper', 'not deeper', 'up to', 'within', 'max depth', 'maximum depth',
    'at depth', 'depth only', 'or fewer', 'or shallower', 'no more than'], when: ['files.find'], near: DEPTH,
  unless: ['at least', 'or more', 'or deeper', 'starting at depth', 'from depth', 'bytes', 'kb', 'mb', 'gb', 'size', 'smaller', 'days',
    'minutes', 'hours'],
  need: ['files.find.max_depth'] },
  // "anything / everything / any entry named X" is any type (compile.js impliedFileType never adds -type f for it);
  // a size filter or a per-file exec still reads as files
  { id: 'find_any_type', words: ['anything named', 'anything called', 'everything named', 'everything called', 'anything matching',
    'everything matching', 'anything with', 'everything with', 'any entry', 'any entries', 'every entry', 'all entries'],
  when: ['files.find'], unless: ['file', 'files', 'regular'], forbid: ['files.find.type=f!size'] },
  // curl
  { id: 'curl_silent', words: ['quiet', 'quietly', 'silent', 'silently', 'no progress', 'hide progress', 'without progress',
    'hide the progress', 'without the progress', 'no progress bar', 'suppress progress', 'without a progress'],
  when: ['http.get', 'http.head', 'http.download'], unless: ['fail silently', 'silently fail'],
  need: ['http.get.silent', 'http.head.silent', 'http.download.silent'] },
  { id: 'curl_show_error', words: ['show errors', 'still show errors', 'but show errors', 'errors still', 'print errors', 'show error',
    'report errors', 'keep errors', 'errors visible', 'with errors', 'show-error', 'print any error', 'print any errors', 'still print errors',
    'still printing errors', 'errors on'], when: ['http.get', 'http.head', 'http.download'],
  need: ['http.get.show_error', 'http.head.show_error', 'http.download.show_error'] },
  { id: 'curl_fail', words: ['fail on', 'fail if', 'fail when', 'fail-on', 'silently fail', 'fail silently', 'failing on', 'fail for',
    'exit non-zero', 'exit nonzero', 'nonzero exit', 'non-zero exit', 'fail on error', 'fail on errors', 'fail fast', 'fail-fast',
    'on fail', 'silent-fail', 'http errors as failure', 'http errors as failures', 'bail on'],
  when: ['http.get', 'http.head'], need: ['http.get.fail', 'http.head.fail'] },
  { id: 'curl_include_headers', words: ['include headers', 'including headers', 'include the headers', 'including the headers',
    'headers and body', 'headers and the body', 'body and headers', 'headers too', 'with headers', 'with the headers', 'plus headers',
    'plus the headers', 'headers along', 'headers included', 'along with headers', 'along with the headers', 'body with headers',
    'include response headers', 'include the response headers', 'including response headers', 'including the response headers',
    'headers plus body', 'headers plus the body', 'plus body', 'plus the body', 'along with the body', 'incl headers'], when: ['http.get', 'http.head'], unless: ['only', 'just'],
  need: ['http.get.include_headers'], forbid: ['http.head'] },
  { id: 'curl_head_only', words: ['headers only', 'only headers', 'just headers', 'just the headers', 'only the headers',
    'head request', 'only the response headers', 'just the response headers', 'response headers only', 'no body', 'without the body',
    'without body', 'skip the body'], when: ['http.get', 'http.head'], unless: ['or', 'body', 'included', 'include', 'including'], need: ['http.head'] },
  { id: 'curl_head_only', words: ['and nothing else'], when: ['http.get', 'http.head'], near: ['header', 'headers'],
    unless: ['or', 'body', 'included', 'include', 'including'], need: ['http.head'] },
  // jq
  { id: 'jq_raw', words: ['raw', 'unquoted', 'without quotes', 'no quotes', 'strip quotes', 'strip the quotes', 'without the quotes',
    'raw strings', 'raw output', 'not quoted', 'plain strings', 'plain text', 'as text'], when: ['json.select'],
  unless: ['as json', 'as compact json', 'valid json'], need: ['json.select.raw'] },
  { id: 'jq_json', words: ['as json', 'as compact json', 'as valid json', 'json output', 'keep the quotes', 'with quotes', 'quoted'],
    when: ['json.select'], unless: ['unquoted', 'not quoted', 'without quotes', 'raw'], forbid: ['json.select.raw'] },
  ...GIT_COVER_RULES,
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
    if (r.near && !words.some((x) => r.near.includes(x))) continue;
    const w = hasFree(r.words);
    if (!w) continue;
    if (r.unless && hasFree(r.unless)) continue;
    if (r.need && !r.need.some(has)) fail('cover', `"${w}" needs ${r.need.join(' or ')} [${r.id}]`);
    const bad = (r.forbid || []).find(has);
    if (bad) fail('cover', `"${w}" contradicts ${bad} [${r.id}]`);
  }

  // wc: a list of units ("words and lines", "words, and bytes", "lines words bytes"), "<unit> count(s)" or "<unit> too"
  // needs every unit named
  if (ops.has('file.count')) {
    const UNIT = { word: 'words', words: 'words', line: 'lines', lines: 'lines', byte: 'bytes', bytes: 'bytes', char: 'chars',
      chars: 'chars', character: 'chars', characters: 'chars' };
    const JOIN = new Set(['and', ',', '&', '+', 'plus', 'or']);
    const named = new Set();
    const unitAt = (k) => (k < words.length && !consumed.has(k) ? UNIT[String(words[k]).replace(/,$/, '')] : undefined);
    words.forEach((w, i) => {
      const u = unitAt(i);
      if (!u) return;
      const next = String(words[i + 1]).replace(/,$/, '');
      if (['count', 'counts', 'too'].includes(next)) named.add(u);
      let k = i + 1;
      while (k < i + 3 && JOIN.has(words[k])) k++;
      const v = unitAt(k);
      if (v) { named.add(u); named.add(v); }
    });
    for (const u of named) {
      const need = u === 'bytes' || u === 'chars' ? ['file.count.bytes', 'file.count.chars'] : [`file.count.${u}`];
      if (!need.some(has)) fail('cover', `"${u}" count needs ${need.join(' or ')} [wc_units]`);
    }
  }

  // find: directories / folders as the listed noun need -type d (an exclusion clause is skipped by PREP); a
  // file / anything noun with no directory noun forbids it
  const DIRN = ['directories', 'folders', 'dirs', 'subdirectories', 'subfolders', 'subdirs'];
  if (ops.has('files.find') && !has('files.find.type=d')) {
    const PREP = new Set(['leaving', 'out', 'omit', 'omitting', 'minus', 'in', 'under', 'inside', 'within', 'from', 'of', 'at', 'into', 'through', 'across', 'for', 'below', 'beneath', 'over', 'outside', 'skip', 'skipping', 'excluding', 'exclude', 'not', 'no', 'except', 'ignore', 'ignoring', 'without', 'and', 'or', 'between']);
    const FILEN = new Set(['file', 'files', 'filenames', 'filename']);
    words.forEach((w, i) => {
      if (!DIRN.includes(w) || consumed.has(i) || cx.inCue(i)) return;
      if (words.slice(Math.max(0, i - 3), i).some((x) => PREP.has(x))) return;
      if (words.slice(0, i).some((x, k) => FILEN.has(x) && !consumed.has(k))) return;
      if (words.slice(i + 1).some((x, k) => FILEN.has(x) && !consumed.has(i + 1 + k))) return;
      fail('cover', `"${w}" names directories; find needs -type d [find_dirs]`);
    });
  }
  if (ops.has('files.find') && has('files.find.type=d') && !words.some((w) => DIRN.includes(w) || ['directory', 'folder', 'dir', 'subdirectory', 'subfolder'].includes(w))) {
    const w = hasFree(['files', 'file', 'anything', 'everything', 'entries']);
    if (w) fail('cover', `"${w}" is not a directory noun; find -type d [find_dirs]`);
  }

  // grep / rg context: "before and after" / "around" is -C; "N lines after" alone is -A; "N lines before" alone is -B
  if (ops.has('text.search') && hasFree(['line', 'lines', 'context'])) {
    const around = hasFree(['before and after', 'after and before', 'around', 'either side', 'surrounding', 'on both sides', 'on each side']);
    // "2 lines after", "3 after", "context after", "after each match"
    const side = (w) => words.findIndex((x, i) => x === w && !consumed.has(i) && (/^(\d+|one|two|three|four|five|six|seven|eight|nine|ten)$/.test(String(words[i - 1]))
      || ['line', 'lines', 'context'].includes(words[i - 1]) || ['each', 'every', 'the', 'it', 'them', 'matches', 'a'].includes(words[i + 1])
      && ['match', 'matches', 'hit', 'hits', 'it', 'them', 'each', 'every', 'line'].includes(words[i + 1] === 'the' || words[i + 1] === 'a' || words[i + 1] === 'each' || words[i + 1] === 'every' ? words[i + 2] : words[i + 1])));
    const B = side('before') >= 0 ? 'before' : undefined; const A = side('after') >= 0 ? 'after' : undefined;
    const ctxOn = has('text.search.context'); const bOn = has('text.search.before'); const aOn = has('text.search.after');
    if (around && !ctxOn && !(bOn && aOn)) fail('cover', `"${around}" needs context lines (-C) [search_context]`);
    else if (!around && A && !B && (ctxOn || bOn || !aOn)) fail('cover', `"${A}" alone is -A [search_context]`);
    else if (!around && B && !A && (ctxOn || aOn || !bOn)) fail('cover', `"${B}" alone is -B [search_context]`);
  }

  // find size sign: "smaller than / under 10k" is -size -N, "bigger than / over 10k" is -size +N
  if (has('files.find.size_lt') || has('files.find.size_gt')) {
    const SIZE = /^\d+(\.\d+)?(b|c|k|kb|kib|m|mb|mib|g|gb|gib|bytes?)$/i;
    const UNITW = /^(b|c|k|kb|kib|m|mb|mib|g|gb|gib|bytes?|kilobytes?|megabytes?|gigabytes?|gigs?|megs?)$/i;
    const signAt = (list) => list.find((ph) => {
      const p = ph.split(' ');
      return words.some((_, i) => {
        if (!p.every((x, k) => words[i + k] === x && !consumed.has(i + k))) return false;
        const t = String(words[i + p.length] || ''); const t2 = String(words[i + p.length + 1] || '');
        return SIZE.test(t) || (/^\d+(\.\d+)?$/.test(t) && UNITW.test(t2));
      });
    });
    const lt = signAt(['smaller than', 'less than', 'under', 'below', 'at most', 'no bigger than', 'no larger than', 'up to', 'max']);
    const gt = signAt(['bigger than', 'larger than', 'greater than', 'more than', 'over', 'above', 'at least', 'exceeding', 'exceed', 'min']);
    if (lt && !gt && (!has('files.find.size_lt') || has('files.find.size_gt'))) fail('cover', `"${lt}" needs -size -N [find_size_sign]`);
    if (gt && !lt && (!has('files.find.size_gt') || has('files.find.size_lt'))) fail('cover', `"${gt}" needs -size +N [find_size_sign]`);
  }

  // "first 200 bytes": head / tail -c
  if ((ops.has('file.head') || ops.has('file.tail')) && !ops.has('file.count') && !has('files.find.size_gt') && !has('files.find.size_lt')
    && words.some((w, i) => !consumed.has(i + 1) && /^(bytes?|chars|characters)$/.test(String(words[i + 1] || '')) && /^\d+$/.test(w)
      || /^\d+(b|bytes)$/i.test(w))
    && !has('file.head.bytes') && !has('file.tail.bytes')) fail('cover', '"N bytes" needs head / tail -c [head_bytes]');

  // uniq | uniq -d: the second stage sees no duplicates
  const uniqs = execInfos.filter((i) => i.exec.op === 'lines.uniq');
  if (uniqs.length > 1) fail('cover', 'uniq piped into uniq [uniq_twice]');

  // npm scripts: "list the scripts", "package scripts" is npm run with no script (npm.scripts)
  const npmOp = [...ops].some((o) => o.startsWith('npm.'));
  if ((npmOp || ops.has('dir.list') || ops.has('files.find')) && !ops.has('npm.scripts')) {
    const strong = ['npm scripts', 'package scripts', 'script list', 'scripts list', 'what scripts', 'scripts available',
      'available scripts', 'scripts defined', 'defined scripts', 'which scripts', 'list scripts', 'list of scripts', 'list the scripts'];
    const pathVals = execInfos.flatMap((i) => i.values.paths || []);
    const SCRIPT_NAMES = new Set(['lint', 'build', 'start', 'dev', 'format', 'typecheck', 'e2e', 'deploy', 'serve', 'watch', 'check', 'test', 'release', 'prepare']);
    const at = (ph) => { const p = ph.split(' '); return words.findIndex((_, i) => p.every((x, k) => words[i + k] === x)); };
    const cue = strong.find((ph) => at(ph) >= 0) || (npmOp && at('scripts') >= 0 ? 'scripts' : null);
    const named = words.some((w, i) => SCRIPT_NAMES.has(w) && ['script', 'scripts', 'and'].includes(words[i + 1]));
    // a real script name run ("run format then coverage npm scripts") is not the script list
    const WORDING = new Set(['scripts', 'script', 'package', 'packages', 'npm', 'list', 'available', 'prints', 'output', 'defined', 'all']);
    const runs = execInfos.filter((i) => i.exec.op === 'npm.run').flatMap((i) => i.values.script || []);
    const realRun = runs.length && runs.every((x) => !WORDING.has(String(x).toLowerCase()));
    if (cue && !realRun && !pathVals.some((p) => /(^|\/)scripts\/?$/.test(p)) && !named && !hasFree(['run the', 'run all', 'run each', 'run both']))
      fail('cover', `"${cue}" lists the package scripts: npm run with no script [npm_scripts]`);
  }

  gitCoverObligations(cx, has);

  // anchors: "ends with X" -> X$, "starts with X" -> ^X; never the other anchor. grep / rg patterns and git --grep.
  const END = ['ends with', 'end with', 'ending with', 'ends in', 'end in', 'ending in', 'that end with', 'finishing with', 'finish with'];
  const START = ['start with', 'starts with', 'starting with', 'begin with', 'begins with', 'beginning with'];
  const patterns = [];
  for (const info of execInfos) {
    (info.exec.args.pattern || []).forEach((v, k) => patterns.push({ v, val: (info.values.pattern || [])[k] }));
    const gm = info.exec.mods.find((m) => m.mod === 'grep_message');
    (gm?.values || []).forEach((v, k) => patterns.push({ v, val: (info.modValues.grep_message || [])[k] }));
  }
  const spanWords = (u) => (u ? words.slice(u[0], u[1]) : []);
  const phraseIn = (ws, list) => list.some((ph) => { const p = ph.split(' '); return ws.some((_, i) => p.every((x, k) => ws[i + k] === x)); });
  // the 3 free words right before a value
  const freeBefore = (u) => { const out = []; for (let j = u[0] - 1; j >= 0 && out.length < 3; j--) if (!consumed.has(j)) out.unshift(words[j]); return out; };
  for (const { v, val } of patterns) {
    if (typeof val !== 'string') continue;
    // a norm whose units (or the free words before them) hold the other cue
    const normWs = v.k === 'norm' && v.u ? [...freeBefore(v.u), ...spanWords(v.u)] : spanWords(v.u);
    if (v.k === 'norm' && v.kind === 'starts_with' && phraseIn(normWs, END) && !phraseIn(normWs, START)) fail('cover', '"ends with" read as starts-with [anchor_end]');
    if (v.k === 'norm' && v.kind === 'ends_with' && phraseIn(normWs, START) && !phraseIn(normWs, END)) fail('cover', '"starts with" read as ends-with [anchor_start]');
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
  const vals = patterns.map((p) => p.val).filter((x) => typeof x === 'string');
  if (hasFree(START) && vals.length && !vals.some((x) => x.startsWith('^'))) fail('cover', '"starts with" needs a ^ anchor [anchor_start]');
  // an anchored value needs some start / end cue (or the anchor spelled in the request)
  const ANCHOR_CUE = /^(start|starts|starting|begin|begins|beginning|begining|leading|prefix|prefixed|prefixes|end|ends|ending|endings|suffix|suffixed|trailing|finish|finishes|finishing|anchored|anchor|whole|entire|exact|exactly|only|first|last|empty|blank|line-start|line-end)$/;
  if (vals.some((x) => /^\^|[^\\]\$$/.test(x)) && !words.some((w) => ANCHOR_CUE.test(w)) && !seg.units.some((u) => /[\^$]/.test(u.t)))
    fail('cover', 'an anchored pattern but no start / end cue [anchor_cue]');
  void used;
}
