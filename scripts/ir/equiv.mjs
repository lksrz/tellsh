// Equivalence key of a compiled command: two commands with the same key are counted as the same answer when labelling
// verifier pairs (make_candidates / kfold_mine / make_negatives) and when scoring (score_combined). The dataset writes
// some meanings in more than one form, so an exact string match labels correct answers as wrong. Covered forms:
//   find ... -type f            == find ...                 (the dataset mixes both on "files" requests)
//   git log ... --oneline       == git log ...              (mixed in gold)
//   rg [flags] -o X P | wc -l   == rg [flags] --count-matches X P
//   curl ... -S (without -s)    == curl ...                 (-S only has an effect together with -s)
//   tail -F                     == tail -f                  unless the request has a rotation / retry cue
//   rg|grep [flags] P FILE | wc -l == rg|grep [flags] -c P FILE   one operand that names a single file (basename with an
//       extension, no glob) and only line-selecting flags (-i -F -w -v -x -s -S -E -P); with several files or a directory
//       -c prints per-file counts, so those stay different. (On zero matches rg -c prints nothing while wc -l prints 0;
//       the dataset treats both as "the count".)
//   sort [flags] F | uniq         == sort -u [flags] F
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
const BOOL_SHORT = { rg: 'iFwvxlcsSoLHNnUz', grep: 'iFwvxlcsoHhnrREPLqZ', ls: 'aAlhtrSR1dFpGiu', sort: 'unrfbdghiMRVs' };
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
const LINE_FLAGS = new Set(['-i', '-F', '-w', '-v', '-x', '-s', '-S', '-E', '-P', '--ignore-case', '--fixed-strings', '--word-regexp', '--invert-match', '--line-regexp', '--smart-case']);
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
  let j = 1;
  while (j < w.length && w[j].startsWith('-') && w[j] !== '--') j++;
  return [w[0], ...w.slice(1, j).sort(), ...w.slice(j)];
}

function stageKey(w, request) {
  w = splitShort(w.map(unquote));
  const tool = w[0];
  if (tool === 'find') w = w.filter((x, i) => !(x === '-type' && w[i + 1] === 'f') && !(x === 'f' && w[i - 1] === '-type'));
  else if (tool === 'git' && w[1] === 'log') w = w.filter((x) => x !== '--oneline');
  else if (tool === 'curl' && !w.some((x) => /^-[a-zA-Z]*s[a-zA-Z]*$/.test(x) && !x.startsWith('--'))) w = w.filter((x) => x !== '-S');
  else if (tool === 'tail' && !ROTATION_CUE.test(request || '')) w = w.map((x) => (x === '-F' ? '-f' : x));
  return sortLeadingFlags(w);
}

export function equivKey(command, request = '') {
  if (command == null) return null;
  const parts = splitTop(String(command));
  // rg ... -o ... | wc -l  ->  rg ... --count-matches ...
  if (parts.length === 3 && parts[1] === '|' && /^wc\s+-l$/.test(parts[2])) {
    const w = words(parts[0]);
    if (w[0] === 'rg' && w.includes('-o')) return stageKey(w.map((x) => (x === '-o' ? '--count-matches' : x)), request).join(' ');
    const c = singleFileCount(splitShort(w.map(unquote)));
    if (c) return stageKey(c, request).join(' ');
  }
  // sort [flags] F | uniq  ->  sort -u [flags] F
  if (parts.length === 3 && parts[1] === '|' && parts[2] === 'uniq') {
    const w = words(parts[0]);
    if (w[0] === 'sort') return stageKey([w[0], '-u', ...w.slice(1)], request).join(' ');
  }
  return parts.map((p) => (p === '|' || p === '&&' ? p : stageKey(words(p), request).join(' '))).join(' ');
}

export const sameCommand = (a, b, request = '') => a != null && b != null && equivKey(a, request) === equivKey(b, request);
