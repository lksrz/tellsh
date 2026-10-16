// Gate step 3, value-span integrity and glob shape (docs/ir_error_taxonomy_v2.md F6, F8, conservative F13).
// Called from strict.js with its helpers and word sets; every failure is `span: ...` / `scope: ...`.
// Tuned on train gold (dataset v2).

import { isQuotedUnit } from './units.js';

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

  // F13 (conservative): "this file" / "that folder" with no value
  const DEIXIS = ['this file', 'that file', 'that dir', 'that folder', 'that directory', 'the file i', 'the one i'];
  const d = hasFree(DEIXIS);
  if (d && !used.some((v) => v.role === 'paths' && v.u)) fail('scope', `"${d}" refers to a file the request does not name`);
  void consumed;
}
