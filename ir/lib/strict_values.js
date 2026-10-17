// Gate step 3, value-span integrity, value roles and glob shape (docs/ir_error_taxonomy_v2.md F6, F8, conservative F13;
// docs/ir_error_taxonomy_v4.md fixes 5, 6, 7, 11, 12). Called from strict.js with its helpers and word sets; every
// failure is `span: ...` / `scope: ...` / `dropped_value: ...`. Tuned on train gold (datasets v2, v4).

import { isQuotedUnit } from './units.js';
import { scopeObligations, DIRISH } from './strict_scope.js';
import { STRICT_KNOWN } from './strict.js';

// scope words that are never a literal directory (F6.1)
const SCOPE_STOP = new Set(['current', 'cwd', 'pwd', 'top-level', 'across', 'machine', 'readable', 'printing']);
// words that precede a scope word naming the work tree ("the repo", "this project")
const SCOPE_DET = new Set(['the', 'this', 'my', 'our', 'whole', 'entire']);
// a rev that looks like a ref (F6.4)
const REF_SHAPE = /^((feat|fix|chore|refactor|docs|test|perf|build|ci|style|release|hotfix|feature|bugfix|origin|upstream)\/[\w./-]+|[0-9a-f]{7,40}|HEAD([~^]\d*)*|@(\{.*\})?|v?\d[\w.-]*|.*[/~^.@{].*|origin|upstream|main|master|develop|development|dev|trunk|staging|production|prod|stable|next|beta|alpha|gh-pages)$/;
// a word a request uses as wording: never a search pattern of a trailing filter stage
const FILTER_WORDS = new Set(['lines', 'line', 'output', 'results', 'result', 'entries', 'entry', 'processes', 'process',
  'branches', 'tags', 'commits', 'files', 'matches', 'items', 'ones', 'stuff', 'everything', 'anything', 'something']);
// directory names that are never a -not -name / --exclude file pattern (F8)
const DIR_IDENT = new Set(['node_modules', 'vendor', 'target', '__pycache__', '.git', 'dist', 'build', '.venv', 'venv', '.cache']);
const EXT_FILE = /^[^.*?[!][^*?[]*\.[A-Za-z][A-Za-z0-9]{0,9}$/;

// v4 fix 7: a rev the request spells as a ref (no catch-all)
const STRICT_REF = /^((?=[a-f]*\d)[0-9a-f]{4,40}|[\w./-]*[~^]\d*|HEAD([~^]\d*)*|v\d[\w.-]*|\d+(\.\d+)+[\w.-]*|[^\s.]*\.\.\.?[^\s]*|@\{\w+\}|@|[\w-]+@\{[^}]*\}|(feat|fix|chore|refactor|docs|test|perf|build|ci|style|release|hotfix|feature|bugfix|experiment|origin|upstream)\/[\w./-]+|origin|upstream|main|master|develop|development|dev|trunk|staging|production|prod|stable|next|beta|alpha|gh-pages)$/;
// isFileLike with an alphabetic extension ("release/2.4" is a ref, "app.py" is a file)
const fileLikeRev = (p) => !/^v\d/.test(p) && !p.includes('..') && /^[^.\d][^/]*\.[A-Za-z][A-Za-z0-9]{0,9}$/.test(p.split('/').pop());
const REV_NOUN = new Set(['branch', 'tag', 'ref']);
const PATH_NOUN = new Set(['path', 'paths', 'file', 'files', 'folder', 'dir', 'directory', 'under', 'touching', 'touched', 'affecting', 'pathspec']);
// v4 fix 6: request wording that is never a one-word path
const PATH_WORDING = new Set(['could', 'check', 'chek', 'but', 'as', 'at', 'vs', 'versus', 'against', 'else', 'used', 'older', 'newer', 'modified',
  'touched', 'changed', 'edited', 'including', 'literally', 'lines', 'regular', 'stat', 'status', 'give', 'print', 'quick', 'full',
  'machine-readable', 'uncommitted', 'insensitive', 'incl', 'with', 'plus', 'and', 'no', 'without', 'also', 'even']);
const PREPS = new Set(['in', 'under', 'inside', 'within', 'from', 'of', 'at', 'into', 'through', 'across', 'for', 'on', 'to', 'with', 'by']);
// v4 fix 5: npm package / script values that are request wording
const NPM_WORDING = new Set(['full', 'all', 'every', 'whole', 'complete', 'nested', 'tree', 'view', 'level', 'levels', 'dep', 'deps', 'dependency',
  'dependencies', 'package', 'packages', 'module', 'modules', 'installed', 'available', 'including', 'included', 'transitive', 'direct', 'top',
  'up', 'dump', 'list', 'scripts', 'script', 'it', 'master', 'everything']);
const SCRIPT_WORDING = new Set(['scripts', 'script', 'package', 'available', 'npm', 'list', 'output', 'prints']);
const PKG_LEAD = ['for', 'checking for', 'check for', 'is', 'pulled in', 'depends on', 'uses', 'version of', 'where is', 'who needs', 'why is'];
// v4 fix 12: a one-word trailing / --grep / -c pattern follows a filter lead or precedes a head noun
const FILTER_LEAD = new Set(['with', 'containing', 'contain', 'contains', 'mention', 'mentions', 'mentioning', 'matching', 'match', 'matches',
  'for', 'grep', 'keep', 'only', 'have', 'has', 'about', 'named', 'like', 'where', 'is', 'find', 'if', 'whether', 'any', 'are', 'does', 'word',
  'and', 'or', 'both', 'either', 'of', 'on', 'lack', 'lacks', 'lacking', 'without', 'says', 'say', 'saying', 'literally', 'regex', 'pattern',
  'include', 'includes', 'including', 'around', 'filter', 'filtering', 'search', 'grepping', 'mentioned', 'each', 'after', 'before', 'exactly',
  'times', 'rg', 'message', 'messages', 'show', 'having']);
const FILTER_DET = new Set(['the', 'a', 'an', 'case-insensitive', 'case-sensitive', 'insensitive', 'sensitive', 'word', 'string', 'text', 'literal', 'term', 'phrase', 'keyword', 'token']);
const HEAD_NOUN = new Set(['processes', 'process', 'lines', 'line', 'entries', 'entry', 'commits', 'commit', 'branches', 'branch', 'names', 'name',
  'messages', 'message', 'matches', 'match', 'ones', 'errors', 'warnings', 'files', 'logs', 'calls', 'items', 'rows', 'tags', 'containers',
  'appears', 'appear', 'occurrences', 'occurrence', 'hunt', 'hits', 'mentions', 'or', 'and']);
const ALWAYS_NOT_PATTERN = { 'file.tail.follow_retry': ['retry', 'retrying', 'rotated', 'rotation'], 'git.diff': ['staged', 'unstaged', 'edits'],
  'proc.list': ['hello', 'hi', 'hey', 'mac', 'macos', 'linux', 'ubuntu', 'box', 'machine', 'host', 'server', 'laptop'] };

export function valueObligations(cx) {
  const { words, fail, hasFree, execInfos, ops, used, seg, consumed, isKnown, isFileLike, GIT_SCOPE_WORDS, GIT_NOUNS, FILLER, REF_WORD, DIR_NOUNS, FILE_NAMES } = cx;
  const gitOp = [...ops].some((o) => o.startsWith('git.'));
  const quoted = (v) => v.u && isQuotedUnit(seg.units[v.u[0]]);

  for (const v of used) {
    if (v.kind !== 'span' || quoted(v)) continue;
    const lw = String(v.value).toLowerCase();
    const prev = words[v.u[0] - 1], next = words[v.u[1]];
    const named = ['named', 'called'].includes(prev) || DIR_NOUNS.has(next);
    if (v.role === 'paths') {
      if (/^[,;]$/.test(v.value)) fail('span', `path "${v.value}" is punctuation`);
      if (SCOPE_STOP.has(lw) && !named) fail('span', `path "${v.value}" is a scope word, not a path`);
      if (GIT_SCOPE_WORDS.has(lw) && !gitOp && !named && (SCOPE_DET.has(prev) || next === 'root')) fail('span', `path "${v.value}" names the work tree, not a directory`);
      if (gitOp && REF_WORD.test(v.value) && !isFileLike(v.value) && ['on', 'from', 'branch'].includes(prev)) fail('span', `path "${v.value}" is a ref`);
    }
    // F6.3: revs, packages, scripts, authors, trailing grep patterns must not be request wording
    if (['rev', 'mod:rev', 'packages', 'script', 'mod:author'].includes(v.role) && v.u[1] - v.u[0] === 1
      && (FILLER.has(lw) || GIT_NOUNS.has(lw) || GIT_SCOPE_WORDS.has(lw) || ['changes', 'changed', 'files', 'file', 'all', 'everything', 'here', 'current', 'latest', 'last', 'recent'].includes(lw)))
      fail('span', `${v.role} "${v.value}" is a request word`);
      // function words as names / globs / excluded dirs ("-name the -prune")
    if (['name', 'mod:name_glob', 'mod:any_name', 'mod:exclude_glob', 'mod:exclude_dir'].includes(v.role) && (FILLER.has(lw) || ['and', 'or', 'of', 'in', 'with', 'for', 'to', 'on', 'but', 'not', 'except', 'skip', 'ones', 'files', 'dirs', 'folders', 'directories'].includes(lw)))
      fail('span', `${v.role} "${v.value}" is a function word`);
    // F6.4: a rev that is a plain English word
    if (v.role === 'rev' && !REF_SHAPE.test(v.value) && isKnown(lw) && !['branch', 'tag', 'ref'].includes(prev) && !['branch', 'tag', 'ref'].includes(next))
      fail('span', `rev "${v.value}" is a generic word, not a ref`);
    // F6.5: possessive kept in the author
    if (v.role === 'mod:author' && /['’]s$/.test(v.value)) fail('span', `author "${v.value}" keeps the possessive`);
    // trailing punctuation inside a value
    if (['paths', 'rev', 'mod:author', 'packages', 'script'].includes(v.role) && /[,;!?]$/.test(v.value) && v.value.length > 1)
      fail('span', `"${v.value}" keeps trailing punctuation`);
  }

  // F6.3: spurious trailing grep stage on request wording
  for (const info of execInfos) {
    if (info.exec.op !== 'text.search' || info.position === 'first') continue;
    for (const v of info.exec.args.pattern || []) {
      if (!v.u || v.u[1] - v.u[0] !== 1 || isQuotedUnit(seg.units[v.u[0]])) continue;
      const w = words[v.u[0]];
      if (FILTER_WORDS.has(w) || FILLER.has(w)) fail('span', `filter pattern "${w}" is a request word`);
    }
  }

  // F8: glob / exclude shapes
  for (const info of execInfos) {
    const rgGlob = info.tool === 'rg' || info.exec.op === 'files.list';
    for (const g of info.modValues.exclude_dir || []) if (EXT_FILE.test(g) && !FILE_NAMES.has(g)) fail('span', `exclude_dir "${g}" is a file`);
    for (const g of info.modValues.exclude_glob || []) {
      const x = g.replace(/^!/, '');
      if (DIR_IDENT.has(x) && !rgGlob && !(info.modValues.type || []).includes('d')) fail('span', `exclude "${g}" is a directory; needs an exclude_dir`);
    }
    for (const k of ['name_glob', 'exclude_glob']) for (const g of info.modValues[k] || []) {
      const x = g.replace(/^!/, '');
      if (!(rgGlob && k === 'exclude_glob') && !/[*?[./]/.test(x) && cx.isExtWord(x) && !(info.modValues.type || []).includes('d')) fail('span', `glob "${g}" is an extension without a wildcard`);
    }
    // grep --include NAME . : a named file is an operand, not an include glob
    if (info.exec.op === 'text.search' && info.tool === 'grep' && !hasFree(['each', 'every', 'all', 'any']) && (info.values.paths || []).every((p) => p === '.') && (info.modValues.name_glob || []).length === 1) {
      const g = info.modValues.name_glob[0];
      if (!/[*?[]/.test(g) && EXT_FILE.test(g)) fail('span', `include glob "${g}" names one file; it is an operand`);
    }
  }

  // v4 fix 11: exclude / name glob shapes
  globObligations(cx);

  // F13 (conservative): "this file" / "that folder" with no value
  const DEIXIS = ['this file', 'that file', 'that dir', 'that folder', 'that directory', 'the file i', 'the one i'];
  const d = hasFree(DEIXIS);
  if (d && !used.some((v) => v.role === 'paths' && v.u)) fail('scope', `"${d}" refers to a file the request does not name`);
  roleObligations(cx);
  scopeObligations(cx);
  void consumed;
}

// v4 fixes 5, 6, 7, 11, 12: value roles the request wording contradicts
function roleObligations(cx) {
  const { words, fail, hasFree, execInfos, ops, used, seg, inCue, isFileLike, GIT_SCOPE_WORDS, FILLER, REF_WORD } = cx;
  const gitOp = [...ops].some((o) => o.startsWith('git.'));
  const quoted = (v) => v.u && isQuotedUnit(seg.units[v.u[0]]);
  const one = (v) => v.u && v.u[1] - v.u[0] === 1;
  for (const v of used) {
    if (v.kind !== 'span' || !v.u || quoted(v)) continue;
    const val = String(v.value), lw = val.toLowerCase();
    const prev = words[v.u[0] - 1], prev2 = words[v.u[0] - 2], next = words[v.u[1]];
    const first = words[v.u[0]];
    // fix 7: revs
    if (v.role === 'rev') {
      if (fileLikeRev(val)) fail('span', `rev "${val}" is a file name`);
      else if (one(v) && !STRICT_REF.test(val) && !REV_NOUN.has(prev) && !REV_NOUN.has(next) && !['on', 'from'].includes(prev)
        && (['folder', 'folders', 'dir', 'directory', 'file', 'files'].includes(next) || !/[\d/_-]/.test(val) && (cx.isKnown(lw) || STRICT_KNOWN.has(lw) || /[a-z]s$/.test(lw))))
        fail('span', `rev "${val}" is not ref-shaped`);
      if (/\.$/.test(val)) fail('span', `rev "${val}" keeps a trailing period`);
    }
    if (v.role === 'paths' && gitOp && one(v) && STRICT_REF.test(val) && !/^\d+$/.test(val) && !isFileLike(val) && !PATH_NOUN.has(prev) && !PATH_NOUN.has(next) && !PATH_NOUN.has(prev2)
      && (REF_WORD.test(val) || /^[0-9a-f]{7,40}$|^HEAD|\.\.|^v\d/.test(val)))
      fail('span', `pathspec "${val}" is a ref`);
    if (v.role === 'paths' && gitOp && REF_WORD.test(val) && !isFileLike(val) && ['vs', 'versus', 'against', 'to', 'for', 'of'].includes(prev))
      fail('span', `path "${val}" is a ref`);
    if (v.role === 'mod:author') {
      if (/^[0-9a-f]{7,40}$|^HEAD[~^]|\//.test(val)) fail('span', `author "${val}" is a ref`);
      if (v.u[1] - v.u[0] > 1 && words.slice(v.u[0], v.u[1]).some((w) => ['author', 'by'].includes(w))) fail('span', `author "${val}" contains its lead`);
      const lead = ['by', 'author', 'authored', 'from', 'for', 'authors', 'committer', 'author:'].includes(prev) || /['’]s$/.test(seg.units[v.u[1]]?.t || '')
        || /['’]s$/.test(seg.units[v.u[0]]?.t || '') || ['by', 'author'].includes(prev2);
      if (!lead && (cx.isKnown(lw) || STRICT_KNOWN.has(lw)) && !['or', 'and', 'either', 'match', 'matches', 'matching', 'literal', 'named', 'name'].includes(prev)
        && !['commits', 'commit', 'made', 'authored', 'committed'].includes(next)) fail('span', `author "${val}" has no by / author lead`);
    }
    // fix 6: paths that are request wording
    if (v.role === 'paths') {
      const t0 = seg.units[v.u[0]].t;
      const named = ['named', 'called', 'in', 'under', 'inside', 'within', 'of', 'for', 'touching', 'touched', 'affecting', 'and'].includes(prev) || ['folder', 'dir', 'directory', 'tree', 'path', 'folders', 'dirs'].includes(next);
      if (one(v) && !named && (PATH_WORDING.has(lw) || (inCue(v.u[0]) && !/[/.~]/.test(val) && cx.isKnown(lw) && !DIRISH.has(lw) && lw !== 'dotfiles'))) fail('span', `path "${val}" is request wording`);
      if (/['’]s$/.test(val)) fail('span', `path "${val}" keeps the possessive`);
      if (one(v) && !named && cx.isExtWord(lw) && ['files', 'scripts', 'only', 'file'].includes(next) && !/[/.]/.test(val)) fail('span', `path "${val}" is a file type`);
      if (v.u[1] - v.u[0] > 1 && PREPS.has(first) && !/[/.~]/.test(t0)) fail('span', `path "${val}" starts with a preposition`);
      if (gitOp && one(v) && !named && !/[/.~]/.test(val) && STRICT_KNOWN.has(lw)
        && !DIRISH.has(lw))
        fail('span', `pathspec "${val}" is a cue word`);
    }
    if (v.role === 'rev' && one(v) && gitOp && STRICT_KNOWN.has(lw) && !STRICT_REF.test(val) && !REV_NOUN.has(next) && !REV_NOUN.has(prev))
      fail('span', `rev "${val}" is a cue word`);
    // fix 5: npm values
    if (v.role === 'packages' && ops.has('npm.ls')) {
      if (NPM_WORDING.has(lw) || isFileLike(val) && /\.(json|txt|md|lock|ya?ml|log|toml|cfg|ini)$/.test(lw)) fail('span', `package "${val}" is request wording`);
    } else if (v.role === 'packages' && (NPM_WORDING.has(lw) && one(v) || isFileLike(val) && !/\.(js|ts)$/.test(val) && !val.startsWith('@')))
      fail('span', `package "${val}" is request wording`);
    if (v.role === 'script' && SCRIPT_WORDING.has(lw)) fail('span', `script "${val}" is request wording`);
  }

  // fix 5: "is X installed", "checking for X" with npm ls and no package: the package was dropped
  if (ops.has('npm.ls') && !used.some((v) => v.role === 'packages')) {
    for (let i = 0; i < words.length; i++) {
      const lead = PKG_LEAD.find((ph) => ph.split(' ').every((w, k) => words[i + k] === w));
      if (!lead) continue;
      const j = i + lead.split(' ').length;
      const w = words[j];
      if (!w || cx.consumed.has(j) || inCue(j) || FILLER.has(w) || NPM_WORDING.has(w) || STRICT_KNOWN.has(w) || !/^[@a-z0-9][\w@/.-]*$/i.test(seg.units[j].t)) continue;
      if (lead === 'is' && !['installed', 'pulled', 'there', 'present', 'used', 'in'].includes(words[j + 1])) continue;
      if (lead === 'for' && cx.isKnown(w) && !['installed', 'pulled'].includes(words[j + 1]) && j !== words.length - 1) continue;
      fail('dropped_value', `package "${seg.units[j].t}" is not an npm ls value`);
      break;
    }
  }

  // fix 12: a one-word trailing / --grep / -c pattern needs a filter lead or a head noun
  const procFirst = execInfos.some((i) => i.exec.op === 'proc.list');
  for (const info of execInfos) {
    const pats = [];
    if (info.exec.op === 'text.search' && (info.inStream === 'lines' || info.position === 'first' && cx.hasMod(info, 'count'))) pats.push(...(info.exec.args.pattern || []));
    if (info.exec.op === 'git.log') pats.push(...(info.exec.mods.find((m) => m.mod === 'grep_message')?.values || []));
    if (pats.length > 1) continue;
    for (const v of pats) {
      if (!v.u || v.u[1] - v.u[0] !== 1 || isQuotedUnit(seg.units[v.u[0]]) || !/^[A-Za-z][\w-]*$/.test(seg.units[v.u[0]].t)) continue;
      if (procFirst || v.u[0] === 0) continue;
      let k = v.u[0] - 1;
      while (k >= 0 && FILTER_DET.has(words[k])) k--;
      const lead = FILTER_LEAD.has(words[k]) || words[k] === 'whole';
      if (!lead && !HEAD_NOUN.has(words[v.u[1]]) && !['in', 'over', 'from', 'within', 'across', ','].includes(words[v.u[1]] ?? ',')) fail('span', `pattern "${seg.units[v.u[0]].t}" has no filter lead`);
    }
  }
  for (const [key, bad] of Object.entries(ALWAYS_NOT_PATTERN)) {
    const [o1, o2, mod] = key.split('.');
    const on = execInfos.some((i) => i.exec.op === `${o1}.${o2}` && (!mod || cx.hasMod(i, mod)));
    if (!on) continue;
    for (const i of execInfos) for (const v of [...(i.exec.args.pattern || []), ...(i.exec.mods.find((m) => m.mod === 'grep_message')?.values || [])])
      if (v.u && v.u[1] - v.u[0] === 1 && bad.includes(words[v.u[0]])
        && !words.slice(Math.max(0, v.u[0] - 3), v.u[0]).some((w) => ['keep', 'lines', 'filter', 'grep', 'containing', 'matching', 'mentioning', 'mention', 'for'].includes(w))) fail('span', `pattern "${words[v.u[0]]}" is request wording`);
  }
  void hasFree; void GIT_SCOPE_WORDS;
}

const DOTFILES = new Set(['env', 'gitignore', 'gitattributes', 'editorconfig', 'npmrc', 'nvmrc', 'bashrc', 'zshrc', 'profile',
  'dockerignore', 'eslintrc', 'prettierrc', 'babelrc', 'git', 'github', 'vscode', 'idea', 'cache', 'config', 'local', 'ssh']);
const NEG_LEAD = new Set(['skip', 'skipping', 'except', 'excluding', 'without', 'not']);
const DIR_NOUN = new Set(['folder', 'folders', 'dir', 'dirs', 'directory', 'directories']);
function globObligations(cx) {
  const { words, fail, execInfos, used } = cx;
  const byVal = (g) => used.find((v) => v.u && String(v.value) === g);
  for (const info of execInfos) {
    const isDir = (info.modValues.type || []).includes('d');
    for (const g of info.modValues.exclude_dir || []) {
      const v = byVal(g);
      if (v && /^[a-z0-9]+$/.test(g) && cx.isExtWord(g) && !DIRISH.has(g) && !['log', 'lock', 'out', 'tmp', 'bin', 'go'].includes(g) && !DIR_NOUN.has(words[v.u[1]]) && !DIR_NOUN.has(words[v.u[0] - 1])) fail('span', `exclude_dir "${g}" is a file type`);
    }
    for (const g of info.modValues.exclude_glob || []) {
      const x = g.replace(/^!/, ''), v = byVal(g) || byVal(x);
      if ((info.tool === 'rg' || info.exec.op === 'files.list') && !/[*?[./]/.test(x) && cx.isExtWord(x) && !DIRISH.has(x) && x !== 'log' && !(v && (DIR_NOUN.has(words[v.u[1]]) || DIR_NOUN.has(words[v.u[0] - 1])))) fail('span', `glob "${g}" is an extension without a wildcard`);
      if (info.exec.op === 'files.find' && !isDir && v && !/[*?[]/.test(x) && (DIR_NOUN.has(words[v.u[1]]) || DIR_NOUN.has(words[v.u[0] - 1]))) fail('span', `exclude "${g}" names a directory; needs an exclude_dir`);
    }
    for (const k of ['name_glob', 'exclude_glob']) for (const g of info.modValues[k] || []) {
      const x = g.replace(/^!/, ''), v = byVal(g) || byVal(x);
      if (!isDir && k === 'name_glob' && /^\.[a-z0-9]+$/.test(x) && !DOTFILES.has(x.slice(1)) && cx.isExtWord(x.slice(1)) && !(v && DIR_NOUN.has(words[v.u[1]]))) fail('span', `glob "${g}" is an extension without a wildcard`);
      if (k === 'name_glob' && v && NEG_LEAD.has(words[v.u[0] - 1])) fail('span', `glob "${g}" follows an exclusion word`);
      const m = /^\*\.([a-z0-9]+)$/.exec(x);
      if (m && DOTFILES.has(m[1]) && words.some((w, i) => (w === `.${m[1]}` && ['named', 'called'].includes(words[i - 1]))))
        fail('span', `glob "${g}" should be the dotfile ".${m[1]}"`);
      const s2 = /^\*([a-z0-9]+)\*$/.exec(x);
      if (s2 && cx.isExtWord(s2[1]) && words.some((w, i) => w === s2[1] && ['files', 'file'].includes(words[i + 1]))) fail('span', `glob "${g}" should be *.${s2[1]}`);
    }
  }
}
