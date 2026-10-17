// Gate step 3, strict obligations, part 4 (docs/ir_error_taxonomy_v4.md WP3): pipeline and op semantics.
// Called at the end of strictObligations() (strict.js) with its helpers:
//   - operand kinds: sort / ls / rg on the wrong kind of operand (a file listed, a dir sorted, a file name searched);
//   - search output mode and counts (-l / -L / -o, per-file vs total, freq vs wc);
//   - git show vs diff vs log for one commit or a compare;
//   - jq fields made of request words, jq on a URL or a non-JSON file;
//   - pattern spans cut before a free content word, dropped list members;
//   - npm test stages.
// modWordsFor() narrows strict.js MOD_WORDS for a stage (bare "matches" licenses -o only with a match cue).

import { ONLY_MATCH_CUE, EACH_MATCH_CUE } from './compile.js';

// Measurement switch (scratch tooling): globalThis.__WP3_SKIP = Set of rule names to turn off ('all' = every
// rule off; 'allbut' = only the listed rules on). Unset in production: every rule is on.
export function wp3On(name) {
  const s = globalThis.__WP3_SKIP;
  if (!s) return true;
  if (s.has('all')) return false;
  if (s.has('allbut')) return s.has(name);
  return !s.has(name);
}

// ---------- MOD_WORDS narrowing ----------
const BARE_O = new Set(['match', 'matches', 'each', 'every', 'only', 'just']);
const O_DOWN = ['lines.sort', 'lines.uniq'];
const L_DROP = new Set(['file', 'files', 'where']);
const FILE_CLAUSE = new Set(['that', 'which', 'where', 'mention', 'mentions', 'mentioning', 'contain', 'contains', 'containing', 'with', 'match',
  'matching', 'having', 'have', 'has', 'referencing', 'reference', 'references', 'use', 'using', 'uses', 'import', 'importing', 'imports', 'calling', 'call', 'calls', 'define', 'defining']);
const FILE_ASK = new Set(['whether', 'list', 'count', 'how', 'number', 'which', 'what', 'wich', 'whch', 'first', 'top', 'show', 'print', 'names', 'name', 'only', 'just']);
const BRANCH_V_DROP = new Set(['commit', 'commits', 'tracking']);
const NAMES_DROP = new Set(['name', 'file', 'path', 'which', 'what']);
const NAMES_PHRASES = ['name only', 'file list', 'what changed', 'what they changed', 'what was changed', 'which files', 'what files', 'file names', 'file paths'];
const RAW_DROP = new Set(['field', 'fields', 'key', 'keys', 'name', 'names', 'value', 'values']);

// The request words that license mod key `k` on stage `info` (a subset of `list`).
export function modWordsFor(k, list, info, { seg, words, isExtWord, nextOf }) {
  if (k === 'text.search.only_matching' && wp3On('o_bare')) {
    const n = nextOf(info);
    const sorted = n && (n.kind === 'macro' || O_DOWN.includes(n.exec?.op));
    // "the regex matches only", "just the ERROR text": only / just next to the match noun still asks for -o
    const near = words.some((w, i) => ['match', 'matches', 'text'].includes(w) && words.slice(Math.max(0, i - 3), i + 2).some((x) => ['only', 'just'].includes(x)));
    if (!sorted && !near && !ONLY_MATCH_CUE.test(seg.text) && !EACH_MATCH_CUE.test(seg.text)) return list.filter((w) => !BARE_O.has(w));
  }
  // "py files with X": the file noun names the file type, not -l output
  // ("TODO in go files"; "list go files that mention TODO" still asks for files)
  if (k === 'text.search.files_with_matches' && wp3On('l_ext') && !/files-with-matches/i.test(seg.text)) {
    const fileAt = words.map((w, i) => (['file', 'files'].includes(w) ? i : -1)).filter((i) => i >= 0);
    const scopeOnly = (i) => i > 0 && isExtWord(words[i - 1]) && !words.slice(i + 1, i + 7).some((x) => FILE_CLAUSE.has(x)) && !words.slice(Math.max(0, i - 4), i - 1).some((x) => FILE_ASK.has(x));
    if (fileAt.length && fileAt.every(scopeOnly)) return list.filter((w) => !L_DROP.has(w));
  }
  if (k === 'git.branch.verbose' && wp3On('branch_v')) return list.filter((w) => !BRANCH_V_DROP.has(w));
  if (['git.log.name_only', 'git.show.name_only'].includes(k) && wp3On('names_log')) return [...list.filter((w) => !NAMES_DROP.has(w)), ...NAMES_PHRASES];
  if (k === 'json.select.raw' && wp3On('jq_raw_words')) return list.filter((w) => !RAW_DROP.has(w));
  return list;
}

// ---------- rule lexicons ----------
const LIST_CUE = ['list', 'listing', 'entries', 'contents', "what's in", 'what is in', 'whats in'];
const LS_ASK = ['list', 'listing', 'ls', 'long', 'entry', 'entries', 'details', 'detail', 'info', 'exists', 'exist', 'there', 'present', 'permissions', 'perms', 'owner', 'metadata', 'stat'];
const CONTENT_CUE = ['mention', 'mentions', 'mentioning', 'mentioned', 'contain', 'contains', 'containing', 'text', 'string', 'literal',
  'occurrence', 'occurrences', 'reference', 'references', 'referencing', 'usage', 'usages', 'uses', 'import', 'imports'];
const NAME_CUE = ['in the name', 'in their name', 'in its name', 'in the filename', 'in the file name', 'in their names', 'in the names'];
const COMPARE_CUE = ['vs', 'versus', 'against', 'compared', 'compare', 'relative to', 'since', 'between', 'working tree', 'work tree',
  'differ', 'differs', 'diff', 'difference', 'differences', 'worktree', 'staged', 'unstaged', 'index', 'uncommitted', 'to'];
const FETCH_NOUNS = new Set(['json', 'data', 'status', 'page', 'response', 'content', 'load', 'health', 'end', 'start', 'top', 'preview',
  'redirects', 'from', 'if', 'get']);
const FIELD_NOUN = new Set(['field', 'fields', 'key', 'keys', 'property', 'properties', 'attribute']);
const JSON_EXT = /\.(json|jsonl|ndjson|geojson|lock|map)$/i;
// words that end a pattern span without being content
const PAT_BOUNDARY = new Set(['in', 'under', 'from', 'of', 'inside', 'within', 'across', 'to', 'on', 'at', 'and', 'or', 'but', 'for', 'into',
  'by', 'with', 'without', 'excluding', 'except', 'not', 'no', 'only', 'just', 'please', 'pls', 'plz', 'thanks', 'the', 'a', 'an', 'files',
  'file', 'then', 'also', 'as', 'than', 'via', 'using', 'here', 'there', 'recursively', 'anywhere', 'everywhere', 'too', 'first', 'last',
  'that', 'which', 'where', 'it', 'them', 'case', 'ignoring', 'ignore', 'is', 'are', 'was', 'were', 'be', 'if', 'when', 'among', 'over',
  'sorted', 'sort', 'count', 'counted', 'counting', 'lines', 'line', 'show', 'print', 'list']);
// verbs and adverbs after a pattern ("MAX_RETRIES constant", "legacyMode turned on")
const PAT_AFTER_OK = new Set(['constant', 'overall', 'note', 'notes', 'written', 'left', 'turned', 'limited', 'searched', 'along', 'produce', 'produces',
  'set', 'used', 'defined', 'appear', 'appears', 'show', 'shows', 'together', 'anymore', 'still', 'again', 'somewhere', 'variable', 'function', 'method', 'class', 'keyword', 'token', 'literal', 'string', 'word', 'text']);
const HEAD_NOUN_END = new Set(['matches', 'lines', 'mentions']);
// nouns a pattern names without being part of it ("deprecated warnings")
const HEAD_NOUN_OK = new Set(['comments', 'comment', 'calls', 'call', 'messages', 'message', 'errors', 'error', 'warnings', 'warning', 'entries', 'entry',
  'commits', 'commit', 'processes', 'process', 'branches', 'branch', 'names', 'matches', 'mentions', 'occurrences', 'statements', 'logs', 'events', 'requests', 'records', 'ones', 'hits', 'tags', 'items', 'results', 'strings', 'words', 'blocks', 'definitions', 'usages', 'references', 'imports', 'tests', 'markers', 'notes', 'todos']);
const NOT_TEST_SCRIPT = ['test', 'tests', 'testing', 'jest', 'vitest', 'spec', 'specs', 'suite'];

export function pipelineObligations(cx) {
  const { words, fail, hasFree, execInfos, stages, ops, hasMod, ctx, seg, used, consumed, inCue, isFileLike, nextOf, prevOf, isExtWord } = cx;
  const isFree = (i) => i >= 0 && i < words.length && !consumed.has(i);
  const pathsOf = (info) => info.values?.paths || [];
  const exists = (p) => (ctx.env?.pathExists ? ctx.env.pathExists(p) : undefined);
  // one file operand: a file by its shape, unless the probe says it is not there as a file
  const oneFile = (info) => pathsOf(info).length === 1 && isFileLike(pathsOf(info)[0]);
  const freeIdx = (ph) => {
    const p = ph.split(' ');
    const out = [];
    for (let i = 0; i + p.length <= words.length; i++) if (p.every((w, k) => words[i + k] === w && !consumed.has(i + k))) out.push(i);
    return out;
  };

  // ---------- operand kinds (fix 10) ----------
  for (const info of execInfos) {
    const op = info.exec.op;
    const ps = pathsOf(info);
    // "list the contents of build": sort / uniq on one non-file operand
    if (wp3On('sort_dir') && ['lines.sort', 'lines.uniq'].includes(op) && info.position === 'first' && ps.length === 1 && !isFileLike(ps[0])
      && exists(ps[0]) !== true && hasFree(LIST_CUE) && !hasFree(['line', 'lines'])) fail('scope', `${op} reads "${ps[0]}" as a file; the request lists a directory`);
    // (a dot name is a dir as often as a file: ".expo", "~/.kube")
    if (op === 'dir.list' && ps.length === 1 && isFileLike(ps[0]) && !/^\./.test(ps[0].split('/').pop()) && exists(ps[0]) !== true && info.position === 'first'
      && !hasFree(LS_ASK)) {
      // "sort app.log in reverse": ls -r on a file sorts nothing
      if (wp3On('ls_file_sort') && ['reverse', 'sort_size', 'sort_time'].some((x) => hasMod(info, x)))
        fail('scope', `ls sorts the entries of a directory; "${ps[0]}" is a file`);
      else if (wp3On('ls_file') && !['long', 'human', 'size', 'sort_size', 'sort_time', 'directory', 'inode'].some((x) => hasMod(info, x)))
        fail('scope', `ls on the file "${ps[0]}" prints only its name`);
    }
    // "search for config.yaml": a file name is a find, not text
    if (wp3On('pat_file') && op === 'text.search' && info.position === 'first' && !hasFree(CONTENT_CUE)) {
      for (const v of info.exec.args.pattern || []) {
        const s = (info.values.pattern || [])[(info.exec.args.pattern || []).indexOf(v)] || '';
        if (v.k === 'span' && v.u && v.u[1] - v.u[0] === 1 && !/^console\./i.test(s) && (/^[^.\s]+\.(json|ya?ml|toml|txt|md|py|js|ts|tsx|jsx|go|rs|rb|java|sh|csv|log|conf|cfg|ini|lock|xml|html|css)$/i.test(s) || /^\*\.?\w+$/.test(s)))
          fail('scope', `pattern "${s}" is a file name; the request finds files, not text`);
      }
    }
    // "files with test in the name": a name filter, not a content search
    if (wp3On('names_search') && op === 'text.search' && info.position === 'first' && !hasFree(CONTENT_CUE)) {
      const nc = hasFree(NAME_CUE);
      if (nc) fail('scope', `"${nc}" filters file names; rg searches contents`);
    }
  }
  // "line 40 of app.log": a print-line op, and N is a line number, not a pattern
  if (wp3On('line_n')) words.forEach((w, i) => {
    if (w !== 'line' || !isFree(i) || !/^\d+$/.test(words[i + 1] || '') || words[i + 2] !== 'of' || ['from', 'starting', 'after', 'past'].includes(words[i - 1])) return;
    const n = words[i + 1];
    if (execInfos.some((x) => (x.values.pattern || []).includes(n))) fail('span', `"line ${n}" is a line number, not a pattern`);
    else if (!ops.has('file.lines') && !(ops.has('file.head') && ops.has('file.tail'))) fail('scope', `"line ${n} of" prints one line`);
  });

  // ---------- search output mode and counts (fix 13) ----------
  const search = execInfos.filter((i) => i.exec.op === 'text.search');
  for (const info of search) {
    if (wp3On('spelled_l')) {
      if (words.includes('files-with-matches') && !hasMod(info, 'files_with_matches')) fail('cover', '"files-with-matches" needs -l');
      if (words.includes('files-without-match') && !hasMod(info, 'files_without_match')) fail('cover', '"files-without-match" needs -L');
    }
    if (wp3On('fname_no_l') && hasMod(info, 'files_with_matches') && nextOf(info)?.kind !== 'each' && !hasFree(['names only', 'filenames only', 'only the', 'only file', 'just the', 'just file']) && hasFree(['with file names', 'with filenames', 'prefix the file name', 'with the file name', 'with the filename', 'prefixed with the file name']))
      fail('cover', '"with file names" prints matching lines with their file, not -l');
    if (wp3On('lack_L') && info.position === 'first' && !hasMod(info, 'files_without_match') && !hasMod(info, 'invert')
      && words.some((w, i) => ['lack', 'lacks', 'lacking', 'missing'].includes(w) && isFree(i) && words.slice(Math.max(0, i - 3), i).some((x) => ['files', 'file'].includes(x))))
      fail('cover', '"files lacking X" needs -L');
    // "at most N matches per file"
    if (wp3On('max_per_file') && !hasMod(info, 'max_count') && words.some((w, i) => /^\d+$/.test(w) && ['most', 'max', 'first'].includes(words[i - 1])
      && ['match', 'matches', 'hit', 'hits'].includes(words[i + 1]) && (['per', 'each'].includes(words[i + 2]) || (words[i + 2] === 'in' && words[i + 3] === 'each'))))
      fail('cover', '"N matches per file" needs -m N');
    const n = nextOf(info);
    // rg -l | xargs wc -l counts whole files, not the matching lines
    if (wp3On('l_wc') && hasMod(info, 'files_with_matches') && n?.kind === 'each' && n.exec.op === 'file.count' && hasFree(['lines containing', 'matching lines', 'lines matching', 'lines with']))
      fail('count_kind', '"lines containing X" counts matching lines; rg -l | xargs wc -l counts every line of the files');
    // rg -l | xargs head -n N where N counts files
    if (wp3On('l_each_n') && hasMod(info, 'files_with_matches') && n?.kind === 'each' && ['file.head', 'file.tail'].includes(n.exec.op)) {
      const nv = n.exec.mods.flatMap((m) => m.values || []).find((v) => v.u);
      const after = nv ? words.slice(nv.u[1], nv.u[1] + 2) : [];
      if (['files', 'paths', 'names', 'filenames', 'results'].includes(after[0]) || (after[0] === 'of' && after[1] === 'them'))
        fail('scope', `"${words[nv.u[0]]} ${after.join(' ')}" takes N files; xargs ${n.exec.op === 'file.head' ? 'head' : 'tail'} takes N lines of each`);
    }
  }
  if (wp3On('freq_wc')) for (const info of stages) {
    if (info.kind !== 'macro') continue;
    const n = nextOf(info);
    if (n?.exec?.op === 'file.count' && hasFree(['each', 'most frequent', 'most common'])) fail('count_kind', 'wc -l after a frequency table counts its rows');
  }
  if (wp3On('freq_need') && !stages.some((s) => s.kind === 'macro') && !execInfos.some((i) => i.exec.op === 'lines.uniq' && hasMod(i, 'count'))) {
    const w = hasFree(['most repeated', 'grouped by', 'how often']);
    if (w && !execInfos.some((i) => ['count', 'count_matches'].some((x) => hasMod(i, x)) || i.exec.op === 'file.count')) fail('freq', `"${w}" needs a frequency table`);
  }

  // "remote branches that contain fix/x": --contains, not a grep over the names
  if (wp3On('cover_contains') && ops.has('git.branch') && ops.has('text.search') && !execInfos.some((i) => hasMod(i, 'contains'))
    && !hasFree(['name', 'names', 'whole word', 'line', 'lines', 'text', 'string', 'keep', 'matching', 'match', 'filter']))
    words.forEach((w, i) => {
      if (!['contain', 'contains', 'containing'].includes(w) || !isFree(i)) return;
      const t = seg.units[i + 1]?.t || '';
      if (/^[\w.-]+\/[\w.-]+$/.test(t) || (/^[0-9a-f]{7,40}$/.test(t) && /\d/.test(t))) fail('cover', `"${w} ${t}" needs git branch --contains`);
    });

  // ---------- git show vs diff vs log (fix 14) ----------
  const compare = hasFree(COMPARE_CUE) || freeIdx('from').some((i) => words.slice(i + 1, i + 5).includes('to'));
  for (const info of execInfos) {
    const op = info.exec.op;
    const revs = info.exec.args.rev || [];
    if (wp3On('diff_one') && op === 'git.diff' && revs.length === 1 && !/\.\./.test((info.values.rev || [])[0] || '') && revs[0].u && !compare) {
      const b = words[revs[0].u[0] - 1];
      if (['of', 'for', 'at', 'tag'].includes(b)) fail('scope', `"${b} ${info.values.rev[0]}" names one commit; git diff compares it with the work tree`);
    }
    if (wp3On('show_range') && op === 'git.show' && ((info.values.rev || []).some((r) => /\.\./.test(r)) || hasFree(['differs from', 'differ from', 'difference between'])))
      fail('scope', 'git show prints commits; a range or a compare is git diff');
    if (wp3On('log_vs') && op === 'git.log' && !hasMod(info, 'patch') && hasFree(['vs', 'versus', 'compared to', 'compared with']) && !(info.values.rev || []).some((r) => /\.\./.test(r)))
      fail('scope', 'a compare of two revisions is git diff, not git log');
  }

  // ---------- jq (fix 15) ----------
  for (const info of execInfos) {
    if (info.exec.op !== 'json.select') continue;
    const p = prevOf(info);
    const fieldVals = Object.entries(info.values).filter(([r]) => r !== 'paths').flatMap(([, v]) => v);
    if (wp3On('jq_fetch') && p?.exec?.op?.startsWith('http.')) for (const f of fieldVals) {
      const x = String(f).replace(/^\./, '').toLowerCase();
      if (!FETCH_NOUNS.has(x) || (x === 'status' && !(p.values.url || []).some((u) => /\/status\/?$/.test(u)))) continue;
      const at = words.findIndex((w) => w === x);
      const near = at >= 0 && [words[at - 1], words[at + 1]].some((w) => FIELD_NOUN.has(w));
      if (!near && !seg.units.some((u) => u.t === `.${x}`)) fail('span', `jq field "${f}" is a fetch word`);
    }
    for (const pth of pathsOf(info)) {
      if (wp3On('jq_url') && /^https?:\/\//i.test(pth)) fail('scope', 'jq reads files; a URL needs curl');
      else if (wp3On('jq_ext') && /\.[A-Za-z0-9]+$/.test(pth) && !JSON_EXT.test(pth) && !hasFree(['json', 'jsonl', 'ndjson'])) fail('scope', `jq on "${pth}", not a JSON file`);
    }
    if (wp3On('jq_as_json') && hasMod(info, 'raw') && hasFree(['as json', 'as compact json', 'as valid json', 'as a json'])) fail('cover', '"as JSON" keeps the quotes; -r prints raw text');
  }

  // ---------- pattern truncation (fix 16) ----------
  const procGrep = ops.has('proc.list');
  for (const v of used) {
    if (!v.u || v.kind !== 'span' || !['pattern', 'mod:grep_message'].includes(v.role)) continue;
    const [a, b] = v.u;
    if (b - a === 1 && /^['"`]/.test(seg.units[a].t)) continue;
    // "regex status [0-9]{3}": the literal word before the metacharacters belongs to the regex
    if (wp3On('regex_prefix') && /^[[(\\^.]/.test(v.value) && isFree(a - 1) && ['regex', 'regexp', 'pattern'].includes(words[a - 2]) && /^[A-Za-z]\w*$/.test(seg.units[a - 1].t) && !inCue(a - 1)
      && !['matching', 'match', 'for', 'pattern', 'like', 'of', 'with', 'is', 'as', 'regex', 'regexp'].includes(words[a - 1]))
      fail('span', `"${v.value}" drops "${seg.units[a - 1].t}" from the regex`);
    // a multi-word pattern that ends in a head noun ("TODO matches") or holds "author"
    if (wp3On('pat_head') && b - a > 1 && (HEAD_NOUN_END.has(words[b - 1]) || words.slice(a, b).some((w) => ['author', 'authored'].includes(w))))
      fail('span', `pattern "${v.value}" runs over request words`);
    // the pattern stops before a free content word ("lines with connection refused" -> "connection")
    if (wp3On('pat_cut') && !procGrep && isFree(b) && !inCue(b) && /^[A-Za-z][A-Za-z0-9_]*$/.test(seg.units[b].t) && seg.units[b - 1].e !== seg.units[b].s
      && !PAT_BOUNDARY.has(words[b]) && !HEAD_NOUN_OK.has(words[b]) && !PAT_AFTER_OK.has(words[b]) && !/(ed|ly)$/.test(words[b]) && !cx.isKnownStrict(words[b]) && !cx.isKnown(words[b]) && (b + 1 === words.length || PAT_BOUNDARY.has(words[b + 1]) || /^[.,;!?]$/.test(seg.units[b + 1].t)))
      fail('span', `pattern "${v.value}" stops before "${seg.units[b].t}"`);
  }
  // "foo, bar or baz": a list member dropped
  if (wp3On('list_member')) for (const v of used) {
    if (!v.u || v.kind !== 'span' || !['paths', 'pattern'].includes(v.role)) continue;
    const b = v.u[1];
    if (!isFree(b) || !['or', ','].includes(seg.units[b]?.t) || !isFree(b + 1) || inCue(b + 1)) continue;
    const t = seg.units[b + 1].t;
    const same = v.role === 'paths' ? /[./]/.test(t) && /[./]/.test(v.value) : /^['"`]/.test(t) || (/[A-Z_]/.test(t) && /[A-Z_]/.test(v.value));
    if (same && !used.some((x) => x.u && x.u[0] === b + 1)) fail('dropped_value', `"${v.value} ${seg.units[b].t} ${t}" drops a list member`);
  }

  // ---------- npm (fix 5) ----------
  if (wp3On('npm_test') && ops.has('npm.test') && !hasFree(NOT_TEST_SCRIPT) && !words.some((w) => NOT_TEST_SCRIPT.includes(w))) fail('cover', 'npm test but the request names no tests');
  if (wp3On('npm_dup')) {
    const scripts = execInfos.filter((i) => i.exec.op.startsWith('npm.')).map((i) => (i.exec.op === 'npm.test' ? 'test' : i.exec.op === 'npm.run' ? (i.values.script || [])[0] : null)).filter(Boolean);
    if (new Set(scripts).size < scripts.length) fail('scope', 'two stages run the same npm script');
  }
  if (wp3On('npm_run_word') && ops.has('npm.run')) words.forEach((w, i) => {
    if (w !== 'run' || !isFree(i) || !isFree(i + 1) || inCue(i + 1)) return;
    const t = words[i + 1];
    if (!/^[a-z][\w:-]*$/.test(t) || cx.isKnown(t) || cx.isKnownStrict(t) || ['end', 'now', 'through', 'tests', 'output', 'it', 'the', 'a', 'my', 'our', 'npm', 'it', 'its', 'script', 'scripts', 'all', 'each', 'every', 'in', 'from', 'with', 'and', 'then', 'only', 'just'].includes(t)) return;
    fail('dropped_value', `"run ${t}": "${t}" is not the script that runs`);
  });
}
