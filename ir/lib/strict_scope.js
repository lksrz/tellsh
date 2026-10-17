// Gate step 3, dropped scope (docs/ir_error_taxonomy_v4.md fixes 1, 8, 17): a home phrase, a directory /
// pathspec in path position, or a ref the request names must reach a value. Called from valueObligations
// with its cx; every failure is `dropped_value`. Tuned on v4 train gold.

import { STRICT_KNOWN, PRODUCT_NAMES } from './strict.js';

// strict.js DIRISH (directory names that are also English words)
export const DIRISH = new Set(['checks', 'scripts', 'config', 'configs', 'work', 'docs', 'src', 'lib', 'libs', 'tests', 'test', 'app',
  'apps', 'bin', 'build', 'dist', 'packages', 'modules', 'tools', 'utils', 'data', 'assets', 'public', 'templates', 'content']);

// normalizers.js HOME_WORDS phrases (a free one means the home path was dropped)
const HOME_PHRASES = ['my home directory', 'my home dir', 'my home', 'home directory', 'home dir', 'my desktop', 'my downloads', 'my documents'];
const HOME_DIRS = new Set(['desktop', 'downloads', 'documents']);

// fix 8: a word in path position names a directory unless it is request wording
const PATH_LEAD = ['in', 'under', 'inside', 'within', 'touching', 'touched', 'affecting', 'limited to', 'restricted to', 'only for'];
const GIT_PATH_LEAD = ['for', 'of'];
const PATH_BOUNDARY = new Set(['but', 'skip', 'skipping', 'excluding', 'except', 'without', 'with', 'and', 'only', 'ignoring', 'ignore',
  'recursively', 'that', 'which', 'containing', 'mentioning', 'matching', 'bigger', 'larger', 'smaller', 'over', 'not', 'sorted', 'newest',
  'oldest', 'one', 'max', 'case', 'whole', 'leave', 'leaving', 'please', 'pls', 'from', 'since', 'by', 'as']);
const PATH_DET = new Set(['the', 'my', 'our', 'this', 'that', 'a', 'an']);
const PATH_DIR_NEXT = new Set(['folder', 'dir', 'directory']);
const PATH_POS_STOP = new Set(`
last past previous recent latest repo repos repository project projects codebase code monorepo root reverse order case any
message messages long them it its their those these files file current whole commit commits working tree short process
history output full both range only name names total place detail details json yaml yml human here there all each every
one ones lines line entries form format text plain parallel depth bytes size use place general first top bottom same
staged unstaged index branch branches tag tags remote log logs pretty color colour sorted order alphabetical numeric
seconds second minutes minute hours hour days day weeks week months month years year today yesterday tonight morning
the a an my our this that some which what how where when total background foreground terminal shell kilobytes megabytes
in on at to of for from by across and or with into onto cwd folder folders directory directories dir dirs list release site
human-readable readable scripting msg his her difference proj mb kb gb mode quiet verbose detail descending ascending reverse-order realtime real time live
`.split(/\s+/).filter(Boolean));

// fix 17: strict ref shapes a request names
const REF_TOKEN = /^(HEAD[~^]\d*|v\d+(\.\d+)+[\w.-]*|[\w./-]+\.\.\.?[\w./-]+|(feat|fix|chore|refactor|release|hotfix|feature|bugfix|origin|upstream)\/[\w./-]+)$/;
const REF_PREP_X = new Set(['on', 'from', 'of', 'for', 'to', 'against', 'vs', 'versus']);
const REF_NEXT = new Set(['branch', 'commits', 'history', 'log']);
// strict.js REF_NOT_NEXT: "prod server", "dev dependencies"
const REF_NOT_NEXT = new Set(['server', 'servers', 'environment', 'env', 'box', 'machine', 'host', 'mode', 'build', 'builds', 'dependencies', 'deps', 'dependency', 'folder', 'directory', 'dir', 'config', 'logs', 'log']);
const REV_OPS = new Set(['git.log', 'git.diff', 'git.show']);

export function scopeObligations(cx) {
  const { words, fail, execInfos, ops, used, consumed, inCue, seg, GIT_SCOPE_WORDS, REF_WORD } = cx;
  const free = (i) => i >= 0 && i < words.length && !consumed.has(i);
  const pathVals = used.filter((v) => v.role === 'paths');
  const allPaths = execInfos.flatMap((i) => i.values.paths || []);
  const at = (ph, i) => ph.split(' ').every((w, k) => words[i + k] === w && free(i + k));

  // fix 1: "my home" / "my desktop" free and no ~ path
  for (let i = 0; i < words.length; i++) {
    const ph = HOME_PHRASES.find((p) => at(p, i));
    if (!ph) continue;
    if (!allPaths.some((p) => String(p).startsWith('~'))) fail('dropped_value', `"${ph}" names a home directory no path uses`);
    break;
  }
  for (const v of pathVals) if (v.u && HOME_DIRS.has(String(v.value)) && words[v.u[0] - 1] === 'my') fail('dropped_value', `"my ${v.value}" is ~/${v.value[0].toUpperCase()}${v.value.slice(1)}`);

  // fix 8: a dropped directory / pathspec in path position
  const first = execInfos.find((i) => i.position === 'first');
  const searchNoPath = first && ['text.search', 'files.find', 'dir.list'].includes(first.exec.op) && first.inStream === 'none'
    && !(first.exec.args.paths || []).some((v) => v.u);
  const gitInfo = execInfos.find((i) => ['git.log', 'git.diff', 'git.status', 'git.show'].includes(i.exec.op));
  const gitNoPath = gitInfo && !(gitInfo.values.paths || []).length;
  if ((searchNoPath || gitNoPath)) {
    const leads = gitNoPath ? [...PATH_LEAD, ...GIT_PATH_LEAD] : PATH_LEAD;
    const cand = (j, forLead, strong, lead) => {
      if (!free(j) || inCue(j)) return false;
      const w = words[j], t = seg.units[j].t;
      if (!/^[a-z0-9][\w.\/-]*$/i.test(t) || /^\d+$/.test(w) || PATH_POS_STOP.has(w) || GIT_SCOPE_WORDS.has(w) || cx.isExtWord(w) || PRODUCT_NAMES.has(w)) return false;
      // a directory name: unknown, a dir-ish English word, or with a digit / slash ("e2e", "src/api")
      if (['tree', 'files', 'file'].includes(words[j + 1]) || GIT_SCOPE_WORDS.has(words[j + 1])) return false;
      if (/[\d/]/.test(w)) return true;
      if (DIRISH.has(w)) return !forLead;
      if (!STRICT_KNOWN.has(w) && !cx.isKnown(w)) return true;
      // a known word names a directory after a strong lead, or when a clause boundary follows it ("in logs, skip x")
      if (STRICT_KNOWN.has(w) && !DIRISH.has(w)) return false;
      const nx = words[j + 1], nt = seg.units[j + 1]?.t;
      if (!lead) return false;
      return strong || nx === undefined || !/[A-Za-z0-9]/.test(nt) || PATH_BOUNDARY.has(nx);
    };
    for (let i = 0; i < words.length; i++) {
      const lead = leads.find((p) => at(p, i));
      let j = -1;
      if (lead) {
        j = i + lead.split(' ').length;
        while (j < words.length && PATH_DET.has(words[j]) && free(j)) j++;
      } else if (PATH_DIR_NEXT.has(words[i + 1]) && free(i + 1) && !PATH_DET.has(words[i]) && !['including', 'include', 'incl'].includes(words[i - 1])) j = i;
      if (j < 0 || !cand(j, GIT_PATH_LEAD.includes(lead), !lead || !['in', ...GIT_PATH_LEAD].includes(lead), lead)) continue;
      fail('dropped_value', `"${lead ? `${lead} ` : ''}${words[j]}" names a directory / pathspec no path uses`);
      break;
    }
  }

  // fix 17: a named ref that is no rev value
  if ([...ops].some((o) => REV_OPS.has(o))) {
    const revs = used.filter((v) => ['rev', 'mod:rev'].includes(v.role)).map((v) => String(v.value));
    for (let i = 0; i < words.length; i++) {
      const t = seg.units[i].t;
      if (!free(i) || !REF_TOKEN.test(t) || /\.(js|ts|go|py|rb|md|json|txt|sh|c|h|rs|java)$/.test(t)) continue;
      fail('dropped_value', `ref "${t}" is not a rev value`);
      break;
    }
    const textCue = words.some((w) => ['message', 'messages', 'msg', 'msgs', 'literal', 'text', 'grep', 'subject', 'subjects', 'mention', 'mentioning', 'mentions', 'containing', 'literally'].includes(w));
    for (const v of used) if (['mod:grep_message', 'mod:author', 'pattern'].includes(v.role) && REF_TOKEN.test(String(v.value)) && !revs.includes(String(v.value))
      && (v.role === 'mod:author' || !textCue))
      fail('dropped_value', `ref "${v.value}" is used as ${v.role}, not a rev`);
    // "of main", "the dev branch", "master commits": a branch word the rev drops
    for (let i = 0; i < words.length; i++) {
      if (!free(i) || inCue(i) || REF_NOT_NEXT.has(words[i + 1])) continue;
      const t = seg.units[i].t;
      if (!REF_WORD.test(t)) {
        // "the experiments branch": a name before "branch"
        if (words[i + 1] === 'branch' && /^[\w./-]+$/.test(t) && !STRICT_KNOWN.has(words[i]) && !cx.isKnown(words[i])) { fail('dropped_value', `branch "${t}" is not a rev value`); break; }
        continue;
      }
      const prev = words[i - 1] === 'the' ? words[i - 2] : words[i - 1];
      if (REF_PREP_X.has(prev) || REF_NEXT.has(words[i + 1])) { fail('dropped_value', `ref "${seg.units[i].t}" is not a rev value`); break; }
    }
  }
}
