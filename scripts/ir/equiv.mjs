// Equivalence key of a compiled command: two commands with the same key are counted as the same answer when labelling
// verifier pairs (make_candidates / kfold_mine / make_negatives) and when scoring (score_combined). The dataset writes
// some meanings in more than one form, so an exact string match labels correct answers as wrong. Covered forms:
//   rg [flags] -o X P | wc -l   == rg [flags] --count-matches X P
//   tail -F                     == tail -f                  unless the request has a rotation / retry cue
//   rg|grep [flags] P FILE | wc -l == rg|grep [flags] -c P FILE   one operand that names a single file (basename with an
//       extension, no glob) and only line-selecting flags (-i -F -w -v -x -s -S -E -P); with several files or a directory
//       -c prints per-file counts, so those stay different. (On zero matches rg -c prints nothing while wc -l prints 0;
//       the dataset treats both as "the count".)
//   sort [flags] F | uniq         == sort -u [flags] F      (any adjacent pair; sort -f | uniq -i == sort -u -f)
//   X | grep|rg LINE_FLAGS P | wc -l == X | grep|rg LINE_FLAGS -c P   (the counter reads stdin: one total either way)
//   git log ARGS | head -n N      == git log -n N ARGS     ARGS one line per commit (--oneline / one-line --format),
//       no --graph / -p / --stat / --name-*; -N, -nN, -n N are spelled --max-count=N
//   git log ... --oneline         == git log ...           only when git log is not piped (before head / wc / grep
//       the line shape changes the output); --decorate dropped when a --format / --pretty=format: has no %d
//   find ... -type f              == find ...              unless the request says "file(s)" and the command excludes
//       names (-not / !): then -type f is part of the answer
//   find \( -name A -o -name B \)  == the same alternatives in any order
//   curl -s                       dropped when the output goes to a pipe or -o / -O / -I and the request has no quiet /
//       silent / progress cue; -S dropped unless the request asks to show errors (or there is no -s)
//   jq -r FILTER                  == jq FILTER when FILTER ends in `length` (a number prints the same raw or not)
//   npm ls --all PKG              == npm ls PKG;  npm run X 2>&1 (not piped) == npm run X
//   ls -1                         dropped with -l or when ls is piped, unless the request says "one per line"
// Flags before the first operand are compared as a set (order-insensitive); combined boolean short flags of rg/grep/ls/
// sort are split (-iF == -i -F); single-quoted words without shell-special characters are unquoted ('a+b' == a+b).

const ROTATION_CUE = /\b(rotat\w*|retry\w*|re-?creat\w*|re-?open\w*|truncat\w*|replaced|reappear\w*|even if (?:it|the file) (?:is )?(?:deleted|moved|removed|missing))\b/i;

// shell words of one pipeline stage, quotes kept (only used as a comparison key)
function words(s) {
  return s.match(/(?:'[^']*'|"(?:\\.|[^"\\])*"|\\.|[^\s'"\\])+/g) || [];
}

// split on top-level pipes / && (outside quotes)
function splitTop(cmd) {
  const parts = [];
  let cur = '', q = null;
  for (let i = 0; i < cmd.length; i++) {
    const ch = cmd[i];
    if (q) { cur += ch; if (ch === q) q = null; else if (ch === '\\' && q === '"') cur += cmd[++i] ?? ''; continue; }
    if (ch === "'" || ch === '"') { q = ch; cur += ch; continue; }
    if (ch === '|' && cmd[i + 1] !== '|') { parts.push(cur.trim(), '|'); cur = ''; continue; }
    if (ch === '&' && cmd[i + 1] === '&') { parts.push(cur.trim(), '&&'); cur = ''; i++; continue; }
    cur += ch;
  }
  parts.push(cur.trim());
  return parts;
}

const SAFE_UNQUOTED = /^[A-Za-z0-9_@%+=:,.\/-]+$/;
const unquote = (x) => (x.length > 2 && x[0] === "'" && x.endsWith("'") && SAFE_UNQUOTED.test(x.slice(1, -1)) ? x.slice(1, -1) : x);

// boolean short flags per tool: a combined word made only of these letters is split (-iF -> -i -F)
const BOOL_SHORT = { rg: 'iFwvxlcsSoLHNnUz', grep: 'iFwvxlcsoHhnrREPLqZ', ls: 'aAlhtrSR1dFpGiu', sort: 'unrfbdghiMRVs', curl: 'sSfLIikvO', jq: 'rcSeCMnjas' };
function splitShort(w) {
  const set = BOOL_SHORT[w[0]];
  if (!set) return w;
  const out = [w[0]];
  for (const x of w.slice(1)) {
    if (/^-[A-Za-z0-9]{2,}$/.test(x) && [...x.slice(1)].every((c) => set.includes(c))) out.push(...[...x.slice(1)].map((c) => `-${c}`));
    else out.push(x);
  }
  return out;
}

// flags that only choose which lines match; with them, "| wc -l" on one file equals -c
const LINE_FLAGS = new Set(['-i', '-F', '-w', '-v', '-x', '-s', '-S', '-E', '-P', '--ignore-case', '--fixed-strings', '--word-regexp', '--invert-match', '--line-regexp', '--smart-case',
  '-r', '-R', '--recursive']);
const looksLikeFile = (x) => !/[*?[\]{}$`]/.test(x) && !x.endsWith('/') && /^[^.].*\.[A-Za-z0-9]+$|\/[^/.][^/]*\.[A-Za-z0-9]+$/.test(x) && !/(^|\/)\.\.?$/.test(x);
// rg|grep LINE_FLAGS PAT FILE (exactly one file) -> the same words with -c, else null
function singleFileCount(w) {
  if (w[0] !== 'rg' && w[0] !== 'grep') return null;
  const flags = [], ops = [];
  for (const x of w.slice(1)) (x.startsWith('-') && x !== '-' ? flags : ops).push(x);
  if (!flags.every((f) => LINE_FLAGS.has(f)) || ops.length !== 2 || !looksLikeFile(unquote(ops[1]))) return null;
  return [w[0], ...flags, '-c', ...ops];
}

// sort the leading flag words (after the tool name) so flag order does not matter
function sortLeadingFlags(w) {
  const i = isGitLog(w) ? 2 : 1;
  let j = i;
  while (j < w.length && w[j].startsWith('-') && w[j] !== '--') j++;
  return [...w.slice(0, i), ...w.slice(i, j).sort(), ...w.slice(j)];
}

const FILE_NOUN = /\bfiles?\b/i;
const QUIET_CUE = /\b(quiet\w*|silent\w*|progress)\b/i;
const SHOW_ERRORS_CUE = /\b(show\w*|print\w*|report\w*|display\w*|keep|still)\b[\w\s]{0,20}\berrors?\b|\berrors? (?:on|shown|visible)\b/i;
const ONE_PER_LINE_CUE = /\bone (?:\w+ )?per line\b|\bsingle column\b|\bone column\b/i;
const GIT_MULTI = /^(--graph|-p|--patch|-u|--stat|--shortstat|--numstat|--name-only|--name-status|--summary)$/;

// `head -n N` / `head -N` -> N, else null
function headCount(w) {
  if (w[0] !== 'head') return null;
  if (w.length === 3 && w[1] === '-n' && /^\d+$/.test(w[2])) return w[2];
  if (w.length === 2 && /^-n?\d+$/.test(w[1])) return w[1].replace(/^-n?/, '');
  return null;
}
const isGitLog = (w) => w[0] === 'git' && w[1] === 'log';
const gitFormat = (w) => w.find((x) => /^--(format|pretty)=/.test(x));
// git log count spellings -> one word --max-count=N
function gitLogCount(w) {
  const out = [];
  for (let i = 0; i < w.length; i++) {
    const x = w[i];
    let m;
    if (i > 1 && (x === '-n' || x === '--max-count') && /^\d+$/.test(w[i + 1] || '')) { out.push(`--max-count=${w[++i]}`); continue; }
    if (i > 1 && (m = /^(?:-n|-|--max-count=)(\d+)$/.exec(x))) { out.push(`--max-count=${m[1]}`); continue; }
    out.push(x);
  }
  return out;
}
// one line per commit and no multi-line extras
function gitLogOneLine(w) {
  if (w.some((x) => GIT_MULTI.test(x))) return false;
  if (w.includes('--oneline')) return true;
  const f = gitFormat(w);
  return !!f && /^--(format|pretty)=(tformat:|format:)?[^\n]*$/.test(f) && !/%n|\\n/.test(f) && !/^--pretty=(full|fuller|medium|raw|email)/.test(f);
}
// grep|rg reading stdin with only line-selecting flags (pattern is the one operand)
function stdinLineCounter(w) {
  if (w[0] !== 'rg' && w[0] !== 'grep') return false;
  const flags = w.slice(1).filter((x) => x.startsWith('-') && x !== '-');
  const ops = w.slice(1).filter((x) => !(x.startsWith('-') && x !== '-'));
  return ops.length === 1 && flags.every((f) => LINE_FLAGS.has(f));
}

// adjacent-stage rewrites inside one pipeline (stages: word arrays, already unquoted / split)
function mergeStages(stages) {
  const out = [];
  for (let i = 0; i < stages.length; i++) {
    let w = stages[i];
    const next = stages[i + 1];
    if (isGitLog(w)) w = gitLogCount(w);
    if (next && isGitLog(w) && !w.some((x) => x.startsWith('--max-count=')) && headCount(next) && gitLogOneLine(w)) {
      out.push([...w.slice(0, 2), `--max-count=${headCount(next)}`, ...w.slice(2)]);
      i++;
      continue;
    }
    if (next && w[0] === 'sort' && (next.length === 1 && next[0] === 'uniq' || (next.length === 2 && next[0] === 'uniq' && next[1] === '-i' && w.includes('-f')))) {
      out.push(['sort', '-u', ...w.slice(1)]);
      i++;
      continue;
    }
    if (next && out.length && stdinLineCounter(w) && next.length === 2 && next[0] === 'wc' && next[1] === '-l') {
      out.push([w[0], '-c', ...w.slice(1)]);
      i++;
      continue;
    }
    out.push(w);
  }
  return out;
}

// sort the -name alternatives of each find \( A -o B \) group
function sortFindGroups(w) {
  const out = [];
  for (let i = 0; i < w.length; i++) {
    if (w[i] !== '\\(' && w[i] !== '(') { out.push(w[i]); continue; }
    const j = w.indexOf(w[i] === '(' ? ')' : '\\)', i);
    if (j < 0) { out.push(w[i]); continue; }
    const alts = [];
    let cur = [];
    for (const x of w.slice(i + 1, j)) {
      if (x === '-o') { alts.push(cur); cur = []; } else cur.push(x);
    }
    alts.push(cur);
    if (!alts.every((a) => a.length === 2 && /^-i?name$/.test(a[0]))) { out.push(w[i]); continue; }
    alts.sort((a, b) => a.join(' ').localeCompare(b.join(' ')));
    out.push(w[i], ...alts.flatMap((a, k) => (k ? ['-o', ...a] : a)), w[j]);
    i = j;
  }
  return out;
}

// ctx: { request, piped (the stage feeds another) }
function stageKey(w, { request = '', piped = false } = {}) {
  const tool = w[0];
  if (tool === 'find') {
    const keepTypeF = FILE_NOUN.test(request) && w.some((x) => x === '-not' || x === '!' || x === '\\!');
    if (!keepTypeF) w = w.filter((x, i) => !(x === '-type' && w[i + 1] === 'f') && !(x === 'f' && w[i - 1] === '-type'));
    w = sortFindGroups(w);
  } else if (isGitLog(w)) {
    w = gitLogCount(w);
    if (!piped) w = w.filter((x) => x !== '--oneline');
    const f = gitFormat(w);
    if (f && !/^--pretty=(?!format:|tformat:)/.test(f) && !f.includes('%d') && !f.includes('%D')) w = w.filter((x) => x !== '--decorate');
  } else if (tool === 'curl') {
    const hasS = w.includes('-s') || w.includes('--silent');
    if (!hasS || !SHOW_ERRORS_CUE.test(request)) w = w.filter((x) => x !== '-S' && x !== '--show-error');
    const redirected = piped || w.some((x) => ['-o', '-O', '-I', '--output', '--remote-name', '--head'].includes(x));
    if (redirected && !QUIET_CUE.test(request)) w = w.filter((x) => x !== '-s' && x !== '--silent');
  } else if (tool === 'tail' && !ROTATION_CUE.test(request)) w = w.map((x) => (x === '-F' ? '-f' : x));
  else if (tool === 'jq') {
    const filter = w.slice(1).find((x) => !x.startsWith('-'));
    if (filter && /(^|[|\s'])length\s*'?$/.test(filter)) w = w.filter((x) => x !== '-r' && x !== '--raw-output');
  } else if (tool === 'npm' && w[1] === 'ls' && w.slice(2).some((x) => !x.startsWith('-'))) w = w.filter((x) => x !== '--all');
  else if (tool === 'npm' && w[1] === 'run' && !piped && w[w.length - 1] === '2>&1') w = w.slice(0, -1);
  else if (tool === 'ls' && (w.includes('-l') || piped) && !ONE_PER_LINE_CUE.test(request)) w = w.filter((x) => x !== '-1');
  return sortLeadingFlags(w);
}

export function equivKey(command, request = '') {
  if (command == null) return null;
  const parts = splitTop(String(command));
  const solo = { request };
  // rg ... -o ... | wc -l  ->  rg ... --count-matches ...
  if (parts.length === 3 && parts[1] === '|' && /^wc\s+-l$/.test(parts[2])) {
    const w = words(parts[0]);
    if (w[0] === 'rg' && w.includes('-o')) return stageKey(splitShort(w.map(unquote)).map((x) => (x === '-o' ? '--count-matches' : x)), solo).join(' ');
    const c = singleFileCount(splitShort(w.map(unquote)));
    if (c) return stageKey(c, solo).join(' ');
  }
  // pipelines joined by &&: adjacent-stage rewrites, then one key per stage
  const pipes = [[]];
  for (const p of parts) {
    if (p === '&&') pipes.push([]);
    else if (p !== '|') pipes[pipes.length - 1].push(splitShort(words(p).map(unquote)));
  }
  return pipes.map((st) => {
    const merged = mergeStages(st);
    return merged.map((w, i) => stageKey(w, { request, piped: i < merged.length - 1 }).join(' ')).join(' | ');
  }).join(' && ');
}

export const sameCommand = (a, b, request = '') => a != null && b != null && equivKey(a, request) === equivKey(b, request);
