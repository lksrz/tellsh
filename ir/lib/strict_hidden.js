// Gate step 3, hidden-only listings: "hidden files in X", "the dotfiles of X", "only hidden dirs" ask for the dot
// entries alone. ls -a/-A, rg --files --hidden and a find without a dot name list every entry. The IR spells a
// hidden-only listing as files.find with the fixed values name_glob='.*' (find -name '.*') and, for a top-level
// listing, max_depth=1; min_depth=1 keeps the start directory ('.' matches '.*') out (schema `consts`: no request
// provenance). Those fixed values are allowed only on a hidden-only request, the depth ones only together with the
// dot name, max_depth=1 only without a recursion cue.
// Called from strict.js; every failure is `hidden: ...`. Tuned on train gold (dataset v3).

const NOUN = new Set(['files', 'file', 'entries', 'entry', 'dirs', 'dir', 'directories', 'directory', 'folders', 'folder',
  'ones', 'items', 'stuff', 'paths', 'names', 'filenames', 'config', 'configs', 'subdirectories', 'subdirs', 'subfolders']);
const DOT_WORDS = new Set(['dotfiles', 'dotfile', 'dotdirs', 'dot-files', 'dot-dirs', 'dotfolders']);
// a cue that wants the hidden entries as well as the others (anywhere in the request)
export const HIDDEN_INCL = ['including', 'include', 'includes', 'included', 'incl', 'also', 'plus', 'as well', 'too', 'even',
  'everything', 'both', 'along with', 'and hidden', 'and dotfiles', 'and dot files', 'hidden and', 'or hidden', 'hidden or', "don't skip", 'do not skip', 'not skip'];
// "with" / "all" include the hidden entries only before the cue ("with hidden ones", "a listing of X with sizes,
// dotfiles"); "all hidden files" and "dotfiles with long format" stay hidden-only
const NEAR_INCL = new Set(['with', 'all', 'every']);
// a cue that drops the hidden entries
const HIDDEN_EXCL = ['skip', 'skipping', 'without', 'no', 'excluding', 'exclude', 'except', 'ignore', 'ignoring', 'non-hidden', 'not', 'visible'];
// the listing goes below the top level
export const RECURSE = ['under', 'recursive', 'recursively', 'recurse', 'anywhere', 'below', 'beneath', 'nested', 'tree', 'deep',
  'subdirectories', 'subfolders', 'subdirs', 'everywhere', 'throughout', 'all levels', 'any depth', 'any level'];

// The request asks for the hidden entries only.
export function hiddenOnlyCue(words, hasFree, consumed = new Set()) {
  const at = [];
  words.forEach((w, i) => {
    if (consumed.has(i)) return;
    if (DOT_WORDS.has(w) || (w === 'dot' && ['files', 'file', 'dirs', 'entries', 'directories', 'folders'].includes(words[i + 1]))
      || (w === 'hidden' && (NOUN.has(words[i + 1]) || NOUN.has(words[i + 2]) || ['only', 'just'].includes(words[i - 1])))) at.push(i);
  });
  if (!at.length || hasFree(HIDDEN_INCL) || hasFree(HIDDEN_EXCL)) return false;
  const near = (i) => [1, 2].some((k) => NEAR_INCL.has(words[i - k]) && !consumed.has(i - k) && (k === 1 || ['the', 'any', 'their', 'its'].includes(words[i - 1])));
  // "all hidden files": 'all' right before the cue is a quantifier, not an inclusion
  const withBefore = (i) => words.slice(0, i).some((w, k) => w === 'with' && !consumed.has(k));
  return !at.some((i) => withBefore(i) || (near(i) && !(words[i - 1] === 'all' && (words[i] === 'hidden' || DOT_WORDS.has(words[i])))));
}

const isDotGlob = (g) => typeof g === 'string' && g.startsWith('.');
const constsOf = (info, mod) => (info.exec.mods.find((m) => m.mod === mod)?.values || []).filter((v) => v.k === 'const').map((v) => v.id);

export function hiddenObligations({ words, fail, hasFree, execInfos, hasMod, consumed }) {
  const only = hiddenOnlyCue(words, hasFree, consumed);
  for (const info of execInfos) {
    const op = info.exec.op;
    const dotConst = constsOf(info, 'name_glob').includes('.*');
    const minConst = constsOf(info, 'min_depth').length > 0, maxConst = constsOf(info, 'max_depth').length > 0;
    if (dotConst && !only) fail('hidden', "find -name '.*' needs a hidden-only request (hidden files / dotfiles)");
    if ((minConst || maxConst) && !dotConst) fail('hidden', "a fixed depth goes with the dot name: -mindepth 1 [-maxdepth 1] -name '.*'");
    if (maxConst && !minConst) fail('hidden', 'find -maxdepth 1 also lists the start directory (no -mindepth 1)');
    if (maxConst && hasFree(RECURSE)) fail('hidden', 'a recursive request lists hidden entries at every depth, not -maxdepth 1');
    if (!only || info.position !== 'first') continue;
    if (op === 'dir.list' && hasMod(info, 'hidden')) fail('hidden', 'ls -a/-A lists every entry, not only the hidden ones');
    // "hidden files rg would list": the rg listing itself is asked for
    if (op === 'files.list' && hasMod(info, 'hidden') && !hasFree(['rg', 'ripgrep'])) fail('hidden', 'rg --files --hidden lists every file, not only the hidden ones');
    if (op === 'files.find' && !['name_glob', 'any_name'].some((m) => (info.modValues[m] || []).some(isDotGlob)))
      fail('hidden', "find without -name '.*' lists every entry, not only the hidden ones");
  }
}
