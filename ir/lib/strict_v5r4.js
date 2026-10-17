// Gate step 3, v5 round 4 (dev5) request-aware checks (docs/ir_error_taxonomy_v5.md "v5 round 4"): wc on a
// directory operand, line numbers piped into wc, git branch ancestry filters for a branch-name question, and ls -d
// for a request that wants the entries. Called from strict_v5.js with the cover context; every failure is
// `cover: ... [rule id]`. Fix r4-1 (possessive recency) and r4-8 (explanation requests) live in decline.js,
// r4-6 (names-only word order) in compile.js requestWantsNamesOnlyR3.

import { DOT_DIRS, BARE_FILES } from './compile.js';

// r4-2: wc does not recurse and errors on a directory; an operand reads as one when it ends in /, is ~ / . / .., is a
// known dot directory or well-known directory name, or sits under a home-config dot directory with no extension
export const looksLikeDir = (p) => {
  const s = String(p);
  if (/[*?[{$]/.test(s) || s === '-') return false;
  if (s.endsWith('/') || ['.', '..', '~'].includes(s)) return true;
  const base = s.split('/').pop();
  if (DOT_DIRS.has(base)) return true;
  if (/\.[^/.]+$/.test(base) || /^\./.test(base) || BARE_FILES.test(base)) return false;
  // "spec/models", "~/.config/nvim"; "./script" stays a file, a bare word stays ambiguous
  return (s.includes('/') && KNOWN_DIRS.has(base)) || /(^|\/)\.[^/.]+\//.test(s);
};
const KNOWN_DIRS = new Set(['src', 'lib', 'bin', 'docs', 'spec', 'tests', 'test', 'models', 'config', 'build', 'dist', 'vendor',
  'node_modules', 'app', 'pkg', 'include', 'scripts', 'templates', 'modules', 'packages']);
// r4-4: a question about branch names ("with X in their names", "named like X", "whose name contains X")
const BRANCH_NAME_CUE = /\bin (the |its |their )?names?\b|\bnamed like\b|\bnames? (contains?|containing|includes?|including|match(es|ing)?|starts? with|starting with)\b|\bbranch(es)? (that are |whose names are )?named (like|after|with)\b|\bbranches named\b|\bname has\b/i;
// r4-5: the request wants what is inside the directory, which ls -d does not list
const ENTRIES_CUE = /\b(every|each|all( the)?) (entry|entries|file|files|item|items) (in|inside|under|of)\b|\bwhat(?:'s| is) (in|inside) (it|there|them)\b|\b(the |its )contents of\b/i;
const ONLY_DIR_CUE = /\bnot (what is |what's )?inside\b|\b(not|no|without) (its |the )?contents\b|\b(only|just) the (directory|dir|folder) (entry|itself)\b|\bdirectory entr(y|ies)\b|\bitself only\b/i;

export function v5r4Obligations(cx) {
  const { fail, execInfos, seg } = cx;
  const request = String(seg.text || '').replace(/(["'`]).*?\1/g, ' ');
  const nextOf = (info) => execInfos.find((s) => s.part === info.part && s.stage === info.stage + 1);

  for (const info of execInfos) {
    const op = info.exec.op;
    if (op === 'file.count' && info.kind !== 'each') {
      const dir = (info.values.paths || []).find(looksLikeDir);
      if (dir !== undefined) fail('cover', `wc does not recurse; '${dir}' is a directory [wc_dir_operand]`);
    }
    if (op === 'text.search' && cx.hasMod(info, 'line_number') && nextOf(info)?.exec?.op === 'file.count')
      fail('cover', 'line numbers (-n) piped into wc are discarded [line_number_wc]');
    if (op === 'git.branch' && ['contains', 'merged', 'no_merged'].some((m) => cx.hasMod(info, m))
      && BRANCH_NAME_CUE.test(request) && !/\b(commits?|merged|contain(s|ing)? (the )?commit)\b/i.test(request))
      fail('cover', 'a question about branch names needs a name filter (git branch | grep / --list), not an ancestry filter [branch_name_filter]');
    if (op === 'dir.list' && cx.hasMod(info, 'directory') && ENTRIES_CUE.test(request) && !ONLY_DIR_CUE.test(request))
      fail('cover', 'ls -d lists the directory itself, not its entries [ls_d_entries]');
  }
}
