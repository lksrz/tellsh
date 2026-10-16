// Gate step 3 (docs/IR.md §6.3): deterministic request/command compatibility obligations.
// obligations(ir, stages, ctx, used): ctx = { seg, cues, obl, env, reg, reject } from gate.js; every
// failed check calls ctx.reject (throws), every passed check is logged to ctx.obl.

import { effectsOf } from './schemas.js';
import { unitWord } from './units.js';
import { parseIntPhrase } from './normalizers.js';
import {
  CUE_LEXICON, PER_FILE, DIR_WORDS, KILL_VERBS, NOT_GERUND, CLAUSE_BOUNDARY, TOOL_WORDS, WRITE_VERBS,
  OP_VERBS, langWordAt, langExt, PIN_NAMES, REQUIRE_WORDS, SORT_FORBID, TYPE_F_CONFLICT, FILE_NOUNS, KNOWN_WORDS,
  MAX_UNKNOWN, FREQ_WORDS, BOUND_MODS, MOD_EXPLAINS, CLAUSE_VERBS, ALSO_EXPLAINS, BARE_NUMBER,
} from './lexicon.js';

const isNumeric = (u) => /^[-+:]?\d/.test(u.t) || parseIntPhrase(unitWord(u)) !== null;

// Every word of the closed lexicons: such a word is never an "unknown content word".
const LEXICON_WORDS = new Set([
  ...Object.values(CUE_LEXICON).flat().flatMap((p) => p.split(' ')),
  ...Object.keys(DIR_WORDS).flatMap((p) => p.split(' ')),
  ...Object.values(REQUIRE_WORDS).flat().flatMap((p) => p.split(' ')),
  ...SORT_FORBID.flatMap((r) => r.words).flatMap((p) => p.split(' ')),
  ...Object.keys(TOOL_WORDS), ...WRITE_VERBS, ...KILL_VERBS, ...Object.keys(OP_VERBS), ...NOT_GERUND,
]);

// Words that may precede a bare directory word ("in logs", "under the src").
const PATH_LEAD = new Set(['in', 'under', 'inside', 'within', 'of', 'from', 'at', 'into', 'through', 'across', 'the',
  'my', 'our', 'this', 'that', 'to', 'on', 'for', 'and', 'or', 'below', 'beneath', 'throughout', 'all', 'every', 'via',
  'over', 'with', 'than', 'vs', 'versus', 'between', 'both', 'whole', 'entire', 'touching', 'touched', 'affecting',
  'changing', 'changed', 'modified', 'named', 'called', 'about', 'against', 'path', 'root', 'dir', 'directory', 'folder', 'files', 'file',
  'dirs', 'directories', 'folders', 'symlinks', 'search', 'serch']);

// "config files", "log files": a word that names a kind of file, not a directory, before "files".
const FILE_KIND_WORDS = new Set(['config', 'configs', 'configuration', 'settings', 'log', 'logs', 'test', 'tests',
  'source', 'backup', 'backups', 'data', 'temp', 'tmp', 'image', 'images', 'media', 'video', 'audio', 'binary', 'text',
  'script', 'scripts', 'template', 'templates', 'lock', 'cache', 'env', 'secret', 'secrets', 'doc', 'build']);

export function obligations(ir, stages, ctx, used) {
  const { seg, cues, obl, reject } = ctx;
  const words = seg.units.map(unitWord);
  const consumed = new Set();
  for (const s of used) for (let i = s.u[0]; i < s.u[1]; i++) consumed.add(i);
  const isConsumed = (c) => { for (let i = c.a; i < c.b; i++) if (consumed.has(i)) return true; return false; };
  const inCue = (i, pred = () => true) => cues.some((c) => c.a <= i && i < c.b && pred(c));
  const pass = (check, detail) => obl.push({ check, ok: true, detail });
  const fail = (check, detail, label = 'gate_reject') => { obl.push({ check, ok: false, detail }); reject(`${check}: ${detail}`, label); };
  const execInfos = stages.filter((s) => s.kind !== 'macro');
  const hasFreq = stages.some((s) => s.kind === 'macro');
  const specOf = (info, id) => info.op.options.find((o) => o.mod === id);
  const valuesOf = (info, id) => (info.exec.mods.find((m) => m.mod === id)?.values || []);
  const hasMod = (info, id) => info.exec.mods.some((m) => m.mod === id);
  // free (unconsumed) occurrence of a word or phrase
  const freeAt = (ph) => {
    const p = ph.split(' ');
    for (let i = 0; i + p.length <= words.length; i++) {
      if (p.every((w, k) => words[i + k] === w && !consumed.has(i + k))) return i;
    }
    return -1;
  };
  const hasFree = (list) => list.find((ph) => freeAt(ph) >= 0);

  // The request spells the mod's own flag ("ls -d", "uniq -u", or inside a cluster "-1d").
  const flagSpelled = (info, spec) => [].concat(spec.flag || []).some((f) => seg.units.some((u) => u.t === f
    || (ctx.reg.tools[info.tool].cluster_short && /^-[A-Za-z]$/.test(f) && /^-[A-Za-z0-9]+$/.test(u.t) && u.t.includes(f[1]))));

  // Polarity and negation scope: every NEG element binds inside a NEG cue's window, and every NEG
  // cue's window binds at least one NEG element ("not in tests, skip vendor" needs both exclusions).
  // "skip 20 commits": git log --skip whose count follows the word is not a negation
  const skipVals = execInfos.filter((i) => i.exec.op === 'git.log').flatMap((i) => valuesOf(i, 'skip'));
  const isSkipCount = (c) => ['skip', 'skipping'].includes(c.phrase) && skipVals.some((v) => v.u && v.u[0] >= c.b && v.u[0] <= c.b + 2);
  const negCues = cues.filter((c) => c.cls === 'NEG' && !isConsumed(c) && !isSkipCount(c));
  const negElems = [];
  for (const info of execInfos) for (const m of info.exec.mods) if (specOf(info, m.mod).polarity === 'neg') negElems.push({ info, mod: m.mod });
  if (negCues.length && !negElems.length) fail('polarity', `NEG cue "${negCues[0].phrase}" but no negated element`);
  if (!negCues.length && negElems.length) fail('polarity', `negated mod "${negElems[0].mod}" without a NEG cue`);
  if (!negCues.length && ctx.env.polarity?.neg && ctx.env.polarity?.confident) fail('polarity', 'polarity head says negated; lexicon found no cue');
  // A window runs up to 4 words after the cue, to a clause boundary; a coordination ("skip node_modules
  // and dist", "except the old, tmp or cache folders") continues it unless a new clause verb follows.
  const COORD = new Set(['and', 'or', 'nor', ',']);
  const windows = negCues.map((c) => {
    let end = c.b;
    let limit = c.b + 4;
    for (;;) {
      while (end < words.length && end < limit && !CLAUSE_BOUNDARY.has(words[end])) end++;
      let k = end;
      while (k < words.length && COORD.has(words[k])) k++;
      if (k === end || end >= limit || k >= words.length || CLAUSE_VERBS.has(words[k]) || k - end > 2) break;
      end = k;
      limit = k + 3;
    }
    return [c.b, end];
  });
  const stemWindows = negCues.map((c, k) => [c.a, windows[k][1]]);
  const windowsOf = (u) => windows.flatMap(([a, b], k) => (u[0] >= a && u[1] <= b ? [k] : []));
  const covered = new Set();
  for (const { info, mod } of negElems) {
    let hits = [];
    if (['invert', 'invert_grep', 'files_without_match'].includes(mod)) {
      const pats = mod === 'invert_grep' ? valuesOf(info, 'grep_message') : info.exec.args.pattern || [];
      hits = pats.flatMap((v) => (v.u ? windowsOf(v.u) : []));
    } else if (valuesOf(info, mod).length) {
      const per = valuesOf(info, mod).map((v) => (v.u ? windowsOf(v.u) : []));
      if (per.every((h) => h.length)) hits = per.flat();
    } else {
      const stem = mod.split('_').pop().replace(/s$/, '');
      hits = stemWindows.flatMap(([a, b], k) => (words.slice(a, b).some((w) => w.includes(stem)) ? [k] : []));
    }
    if (!hits.length) fail('negation_scope', `${mod} does not bind inside a NEG cue's window`);
    hits.forEach((k) => covered.add(k));
  }
  negCues.forEach((c, k) => {
    if (!covered.has(k)) fail('negation_scope', `NEG cue "${c.phrase}" has no negated element in its window`);
  });
  pass('polarity', `${negCues.length} NEG cue(s), ${negElems.length} negated element(s)`);

  // Cue classes, both directions. An element carries one or more classes: it needs any one of them
  // in the request, and explains each of them.
  const elements = []; // {classes, d}
  const addEl = (classes, d, alt) => elements.push({ classes: [].concat(classes), d, alt });
  // explain-only: never required, but explains its classes when they are present
  const addExplains = (classes, d) => elements.push({ classes: [].concat(classes), d, optional: true });
  const prevOf = (info) => stages.find((s) => s.part === info.part && s.stage === info.stage - 1);
  const hasRegexPattern = (info) => [...(info.exec.args.pattern || []), ...valuesOf(info, 'grep_message')].some((v) => v.k === 'span' && v.pkind === 'regex');
  for (const info of stages) {
    // freq = sort | uniq -c | sort -rn: it sorts, counts, and answers "most common"
    if (info.kind === 'macro') { addEl(['FREQ', 'SORT', 'COUNT'], 'freq', FREQ_WORDS); continue; }
    for (const m of info.exec.mods) {
      const spec = specOf(info, m.mod);
      // a count after freq ("10 most common lines") takes its LIMIT from the FREQ phrase
      const afterFreq = stages.some((s) => s.kind === 'macro' && s.part === info.part && s.stage < info.stage);
      // rg/grep -m is a per-file limit: "3 matches per file" names it
      const perFileLimit = info.exec.op === 'text.search' && m.mod === 'max_count' ? ['PER_FILE'] : [];
      // ls -h alone shows no sizes: "human sizes for X" asks for ls -lh
      if (info.exec.op === 'dir.list' && m.mod === 'long' && hasMod(info, 'human')) perFileLimit.push('HUMAN_SIZES');
      if (spec.cue) addEl([].concat(spec.cue, afterFreq && [].concat(spec.cue).includes('LIMIT') ? ['FREQ'] : [], perFileLimit), `${info.exec.op}.${m.mod}`);
      for (const s of info.modValues[m.mod] || []) if (spec.value?.enum_cue?.[s]) addEl(spec.value.enum_cue[s], `${m.mod}=${s}`);
    }
    if (hasRegexPattern(info)) addEl('REGEX', `${info.exec.op} regex pattern`);
    if (info.exec.op === 'http.head') addEl('HEADERS', 'http.head');
    const op = info.exec.op;
    for (const m of info.exec.mods) if (MOD_EXPLAINS[`${op}.${m.mod}`]) addExplains(MOD_EXPLAINS[`${op}.${m.mod}`], `${op}.${m.mod}`);
    // a sort stage is what "sorted" asks for; head/tail with no count still take the first/last 10
    if (op === 'lines.sort') addExplains('SORT', op);
    // plain ls prints bare names
    if (op === 'dir.list' && !hasMod(info, 'long') && !hasMod(info, 'recursive')) addExplains('NAMES_ONLY', op);
    if ((op === 'file.head' || op === 'file.tail') && (!info.exec.mods.length || hasMod(info, 'bytes'))) addExplains('LIMIT', op);
    // per-file results: rg/grep -c/-l/-L/-m, wc over a path list or file operands, find listings
    const perFileMods = ['count', 'count_matches', 'files_with_matches', 'files_without_match', 'max_count'];
    if (op === 'text.search' && info.exec.mods.some((m) => perFileMods.includes(m.mod))) addExplains('PER_FILE', op);
    if (op === 'files.find' && info.stage === 0) addExplains('PER_FILE', op);
    if (['git.log', 'git.show', 'git.diff'].includes(op) && info.exec.mods.some((m) => ['stat', 'name_status', 'name_only'].includes(m.mod))) addExplains('PER_FILE', op);
    if (op === 'file.count' && (info.kind === 'each' || info.inStream === 'paths' || (info.exec.args.paths || []).length)) addExplains('PER_FILE', op);
    if (info.exec.op === 'lines.uniq') {
      const before = stages.find((s) => s.part === info.part && s.stage === info.stage - 1);
      if (!(before && before.exec?.op === 'lines.sort')) addEl('ADJACENT', 'uniq not after sort');
    }
  }
  const cueHas = (c, cls) => c.cls === cls || (c.also || []).includes(cls);
  for (const el of elements) {
    if (el.optional) continue;
    if (!cues.some((c) => el.classes.some((x) => cueHas(c, x))) && !(el.alt && hasFree(el.alt))) fail('cue', `${el.d} needs a ${el.classes.join(' or ')} cue in the request`);
  }
  // BOUND_MODS keys: `op.mod`, a bare `op` (run without a recursive mod), or `op!mod` (op without mod)
  const hasOpMod = (key) => {
    // `op~literal`: the op runs with literal (non-regex) patterns only (rg/grep derive -F themselves)
    if (key.endsWith('~literal')) {
      const lop = key.slice(0, -'~literal'.length);
      return execInfos.some((i) => i.exec.op === lop && (i.exec.args.pattern || []).length
        && (i.exec.args.pattern || []).every((v) => v.pkind !== 'regex'));
    }
    const [base, without] = key.split('!');
    const [o1, o2, mod] = base.split('.');
    const op = `${o1}.${o2}`;
    return execInfos.some((i) => i.exec.op === op && (mod ? hasMod(i, mod)
      : without ? !hasMod(i, without) : !hasMod(i, 'recursive')));
  };
  for (const c of cues) {
    if (c.cls === 'NEG' || c.cls === 'NEUTRAL' || isConsumed(c)) continue;
    if (c.cls === 'BOUND') {
      if (!(BOUND_MODS[c.phrase] || []).some(hasOpMod)) fail('cue', `"${c.phrase}" needs ${BOUND_MODS[c.phrase].join(' or ')}`);
      continue;
    }
    const viaAlso = (el) => c.phrase in ALSO_EXPLAINS && (ALSO_EXPLAINS[c.phrase] === null || ALSO_EXPLAINS[c.phrase].includes(el.d))
      && el.classes.some((x) => cueHas(c, x));
    if (!elements.some((el) => el.classes.includes(c.cls) || viaAlso(el))) fail('cue', `"${c.phrase}" (${c.cls}) is not explained by any element`);
  }
  pass('cues', [...new Set(elements.flatMap((el) => el.classes))].join(' ') || 'none');

  // Behaviour-changing mods and consts without a cue class need their own request words; sort
  // direction words must agree with the sort order; find -type f is not "directories" / "links".
  for (const info of execInfos) {
    const op = info.exec.op;
    for (const m of info.exec.mods) {
      const keys = [`${op}.${m.mod}`, ...(info.modValues[m.mod] || []).map((s) => `${op}.${m.mod}=${s}`)];
      for (const k of keys) {
        if (REQUIRE_WORDS[k] && !hasFree(REQUIRE_WORDS[k]) && !flagSpelled(info, specOf(info, m.mod))) fail('mod_words', `${k} needs one of: ${REQUIRE_WORDS[k].slice(0, 6).join(', ')}`);
      }
    }
    for (const r of SORT_FORBID) {
      if (r.op !== op || !hasMod(info, r.mod) || hasMod(info, 'reverse') !== r.reverse) continue;
      const w = hasFree(r.words);
      if (w) fail('sort_direction', `request says "${w}" but ${op}.${r.mod}${r.reverse ? ' + reverse' : ''} sorts the other way`);
    }
    if (op === 'files.find' && (info.modValues.type || []).includes('f')) {
      const w = hasFree(TYPE_F_CONFLICT);
      if (w && !hasFree(FILE_NOUNS)) fail('mod_words', `request names "${w}" but the command finds regular files`);
    }
  }
  pass('mod_words', 'behaviour-changing mods have request words');

  // Numbers: every numeric token (digits or a number word the int normalizer accepts) is consumed.
  // "one per line", "one line each" are layout, not counts.
  const layoutOne = (i) => words[i] === 'one' && (['per', 'line', 'entry', 'item', 'name', 'filename', 'file', 'each', 'by', 'of', 'at', 'liner', 'another'].includes(words[i + 1])
    || ['each', 'in', 'any', 'every', 'no', 'which', 'this', 'that', 'the'].includes(words[i - 1]));
  // "these four: a b c d" counts the operands the request lists, not a limit
  const listCount = (i) => ['these', 'those', 'all', 'both'].includes(words[i - 1]);
  seg.units.forEach((u, i) => {
    if (isNumeric(u) && !consumed.has(i) && !layoutOne(i) && !listCount(i)) fail('numbers', `numeric token "${u.t}" is not consumed`);
  });
  pass('numbers', 'all numeric tokens consumed');

  // Named values: quoted strings, path-like units, URLs, flag-like units.
  const predictedFlags = new Set();
  for (const info of execInfos) {
    for (const m of info.exec.mods) {
      const spec = specOf(info, m.mod);
      for (const f of [].concat(spec.flag || [])) predictedFlags.add(f);
      if (ctx.reg.tools[info.tool].cluster_short && typeof spec.flag === 'string') predictedFlags.add(`cluster:${spec.flag.slice(1)}`);
    }
  }
  seg.units.forEach((u, i) => {
    if (consumed.has(i)) return;
    const t = u.t;
    if (/^['"`]/.test(t) && t.length > 1) fail('named_values', `quoted string ${t} is not consumed`);
    if (/^https?:\/\//i.test(t)) fail('named_values', `URL ${t} is not consumed`);
    if (/^--?[A-Za-z][\w-]*$/.test(t)) {
      const cluster = /^-[A-Za-z]+$/.test(t) && [...t.slice(1)].every((ch) => predictedFlags.has(`cluster:${ch}`));
      if (!predictedFlags.has(t) && !cluster) fail('named_values', `flag-like ${t} matches no predicted mod`);
      return;
    }
    if (/^[.,;:!?]+$/.test(t)) return;
    if (t.includes('/') || /^[~.]/.test(t) || /^[^\s.]+\.[A-Za-z0-9]{1,10}$/.test(t)) fail('named_values', `path-like "${t}" is not consumed`);
  });
  pass('named_values', 'all named values consumed');

  // Direction: every free direction word anywhere in the request agrees with every direction
  // element (file.head / file.tail themselves, and head/tail/max_count counts). On a newest-first
  // stream (git log, ls -t) "last/latest/most recent" means the first items.
  const dirWords = [];
  words.forEach((w, i) => {
    if (consumed.has(i) || inCue(i, (c) => c.cls !== 'LIMIT')) return;
    const two = `${w} ${words[i + 1]}`;
    if (DIR_WORDS[two] && !consumed.has(i + 1)) { dirWords.push({ w: two, dir: DIR_WORDS[two] }); return; }
    if (!DIR_WORDS[w] || (two in DIR_WORDS)) return;
    if (['end', 'start', 'beginning'].includes(w) && words[i - 1] !== 'the') return;
    if (w === 'top' && ['level', '-level', 'levels'].includes(words[i + 1])) return; // top level deps
    dirWords.push({ w, dir: DIR_WORDS[w] });
  });
  // downstream of a newest-first stream "last" is ambiguous (last commits vs last lines of the output)
  const afterNewestFirst = (info) => stages.some((s) => s.part === info.part && s.stage < info.stage && s.exec
    && (s.exec.op === 'git.log' || (s.exec.op === 'dir.list' && hasMod(s, 'sort_time') && !hasMod(s, 'reverse'))));
  const dirElems = [];
  for (const info of execInfos) {
    const op = info.exec.op;
    // head/tail with no count still take the first/last 10 (tail -f / tail -n +N take no side)
    const counted = ['lines', 'bytes', 'from_line', 'follow', 'follow_retry'].some((id) => hasMod(info, id));
    if (op === 'file.head' && !counted) dirElems.push({ info, dir: 'first', d: op });
    if (op === 'file.tail' && !counted) dirElems.push({ info, dir: 'last', d: op });
    for (const m of info.exec.mods) {
      const spec = specOf(info, m.mod);
      if (spec.direction) dirElems.push({ info, dir: spec.direction, d: `${op}.${m.mod}` });
    }
  }
  for (const { info, dir, d } of dirElems) {
    for (const { w, dir: said } of dirWords) {
      if (said === 'last' && afterNewestFirst(info)) continue;
      const want = said === 'last' && info.exec.op === 'git.log' ? 'first' : said;
      if (want !== dir) fail('direction', `request says "${w}" but ${d} takes the ${dir} items`);
    }
  }
  pass('direction', 'consistent');

  // First-N vs per-file: rg/grep -m counts per file.
  const perFile = cues.some((c) => PER_FILE.has(c.phrase));
  for (const info of execInfos) {
    if (info.exec.op === 'text.search' && hasMod(info, 'max_count') && !perFile)
      fail('per_file', 'max_count is per file; "first N" needs | head -n N');
  }

  // Count kind.
  const countCues = cues.filter((c) => c.cls === 'COUNT');
  for (const c of countCues) {
    const near = [words[c.a - 1], ...words.slice(c.b, c.b + 3)];
    const kindOf = (w) => ({ files: 'files', file: 'files', times: 'occ', occurrences: 'occ', occurrence: 'occ', matches: 'occ',
      lines: 'lines', line: 'lines', words: 'words', word: 'words', bytes: 'bytes', byte: 'bytes', characters: 'chars',
      character: 'chars', chars: 'chars', char: 'chars', commits: 'commits', branches: 'branches' })[w];
    // "total lines": the kind may sit inside the cue phrase itself
    const kind = kindOf(words[c.a - 1]) || words.slice(c.a, c.b + 3).map(kindOf).find(Boolean);
    // freq counts identical lines: "sort by count", "with counts"
    if (hasFreq && (!kind || kind === 'lines' || kind === 'occ')) { pass('count_kind', 'freq'); continue; }
    if (!kind) fail('count_kind', `"${c.phrase} ${near.slice(1).join(' ')}" does not say what to count`, 'ambiguous');
    const wc = (info, id) => info.exec?.op === 'file.count' && info.exec.mods.some((m) => m.mod === id);
    const has = (op, id) => execInfos.some((i) => i.exec.op === op && hasMod(i, id));
    let okKind;
    if (kind === 'files') okKind = stages.some((s) => wc(s, 'lines') && s.kind === 'exec' && s.inStream === 'paths');
    else if (kind === 'occ') {
      okKind = has('text.search', 'count_matches') || stages.some((s) => wc(s, 'lines') && s.kind === 'exec' && s.stage > 0 &&
        stages.some((p) => p.part === s.part && p.stage === s.stage - 1 && p.exec?.op === 'text.search' && p.exec.mods.some((m) => m.mod === 'only_matching')));
    } else if (kind === 'lines') {
      okKind = has('text.search', 'count') || stages.some((s) => wc(s, 'lines') && !(s.kind === 'exec' && s.inStream === 'paths') &&
        !stages.some((p) => p.part === s.part && p.stage === s.stage - 1 && p.exec?.mods.some((m) => m.mod === 'only_matching')));
    } else if (kind === 'commits' || kind === 'branches') {
      // wc -l right after a one-line-per-item producer: git log --oneline/--format, git branch
      okKind = stages.some((s) => wc(s, 'lines') && s.kind === 'exec' && s.stage > 0 && s.exec.mods.length === 1 && (() => {
        const p = prevOf(s);
        if (!p?.exec) return false;
        if (kind === 'branches') return p.exec.op === 'git.branch' && !p.exec.mods.some((m) => m.mod === 'show_current');
        return p.exec.op === 'git.log' && p.exec.mods.some((m) => ['oneline', 'format'].includes(m.mod))
          && !p.exec.mods.some((m) => ['stat', 'name_only', 'name_status', 'patch', 'graph'].includes(m.mod));
      })());
    } else okKind = stages.some((s) => wc(s, kind));
    if (!okKind) fail('count_kind', `request counts ${kind}; the command counts something else`);
    pass('count_kind', kind);
  }

  // Audit r1 (conservative rejects of known wrong accepts; docs/IR.md §6.3).
  for (const info of execInfos) {
    const op = info.exec.op;
    // "just the number" of a file: wc FILE also prints the name (wc -c < FILE is not expressible)
    if (op === 'file.count' && (info.exec.args.paths || []).length && hasFree(BARE_NUMBER))
      fail('bare_output', '"just the number" but wc prints the file name too');
    // uniq -i after a case-sensitive sort misses case variants (needs sort -f)
    if (op === 'lines.uniq' && hasMod(info, 'ignore_case')) {
      const p = prevOf(info);
      if (p?.exec?.op === 'lines.sort' && !p.exec.mods.some((m) => m.mod === 'ignore_case')) fail('case_fold', 'uniq -i after a case-sensitive sort');
    }
    // npm ls PKG shows the paths leading to PKG, not the tree under it
    if (op === 'npm.ls' && hasMod(info, 'depth') && (info.exec.args.packages || []).length) fail('scope', 'npm ls --depth with a package shows who depends on it');
    // find -maxdepth -type d without -mindepth 1 lists the start directory itself
    if (op === 'files.find' && hasMod(info, 'max_depth') && (info.modValues.type || []).includes('d') && !hasMod(info, 'min_depth'))
      fail('scope', 'find -maxdepth -type d also lists the start directory (no -mindepth 1)');
    // "dotfiles" asks for the hidden entries only; ls -a/-A lists everything
    if (op === 'dir.list' && hasMod(info, 'hidden') && words.some((w, i) => w === 'dotfiles' || (w === 'dot' && words[i + 1] === 'files'))
      && !words.some((w) => ['including', 'include', 'with', 'too', 'also', 'plus'].includes(w))) fail('scope', 'ls -a lists more than the dotfiles');
    // git branch --merged=X always lists X itself: a count is off by one
    if (op === 'git.branch' && hasMod(info, 'merged') && countCues.length) fail('count_kind', 'git branch --merged also lists the reference branch');
  }
  // Paths copied from loose request words: a bare word path (no / . ~) must not be a multiword
  // guess ("release notes"), a noun modifier ("config files") or follow an unconsumed modifier ("app logs").
  for (const v of used) {
    if (v.role !== 'paths' || v.kind !== 'span' || /[/.~]/.test(v.value) || /^['"`]/.test(seg.units[v.u[0]].t)) continue;
    if (v.u[1] - v.u[0] > 1) fail('path', `path "${v.value}" is built from several request words`);
    if (FILE_KIND_WORDS.has(words[v.u[0]]) && ['files', 'file'].includes(words[v.u[1]])) fail('path', `"${v.value} files" names a kind of file, not a directory`);
    const prev = v.u[0] - 1;
    if (prev >= 0 && !consumed.has(prev) && /^[a-z]/.test(words[prev]) && !PATH_LEAD.has(words[prev]) && !/ing$/.test(words[prev]) && !(words[prev] in OP_VERBS) && !CLAUSE_VERBS.has(words[prev]) && !(words[prev] in TOOL_WORDS) && !inCue(prev)) fail('path', `"${words[prev]} ${v.value}" leaves "${words[prev]}" unexplained`);
  }

  // Kill: a kill verb (not "stop listing", "stop watching": a verb followed by another gerund) and
  // an exact ProcName span.
  for (const info of execInfos) {
    if (info.exec.op !== 'proc.kill') continue;
    const verb = words.some((w, i) => KILL_VERBS.has(w) && !consumed.has(i)
      && !(/[a-z]ing$/.test(words[i + 1] || '') && !NOT_GERUND.has(words[i + 1])));
    if (!verb) fail('kill', 'pkill needs a kill/stop/terminate verb');
    if (!(info.exec.args.name || []).every((v) => v.k === 'span')) fail('kill', 'the process name must be a copied span');
  }

  // Pin: set only when the request names the tool.
  for (const info of execInfos) {
    if (info.exec.pin && !words.some((w, i) => (PIN_NAMES[info.exec.pin] || [info.exec.pin]).includes(w) && !consumed.has(i)))
      fail('pin', `pinned ${info.exec.pin} but the request does not name it`);
  }

  // Coverage: closed-lexicon words must be explained; more than MAX_UNKNOWN unknown content words
  // (outside consumed spans, cue phrases and the closed lexicons) means the request asks for more.
  const tools = new Set(execInfos.map((i) => i.tool));
  const ops = new Set(execInfos.map((i) => i.exec.op));
  const effects = new Set(execInfos.flatMap((i) => effectsOf(i.op, i.exec.mods.map((m) => m.mod))));
  const unknown = [];
  words.forEach((w, i) => {
    if (consumed.has(i)) return;
    if (w in TOOL_WORDS && !TOOL_WORDS[w].some((t) => tools.has(t))) fail('coverage', `tool "${w}" is not what the command runs`);
    if (WRITE_VERBS.has(w) && !(effects.has('write_fs') && ['save', 'write'].includes(w))) fail('coverage', `write verb "${w}" is not expressible`);
    if (w in OP_VERBS && !ops.has(OP_VERBS[w])) fail('coverage', `verb "${w}" needs ${OP_VERBS[w]}`);
    const lang = langWordAt(words, i);
    // explained when a value names that extension ("tsx files named Button.tsx", "log files *.log")
    if (lang && !used.some((v) => v.value.toLowerCase().endsWith(`.${langExt(lang)}`))) fail('coverage', `file type "${lang}" is not used by any value`);
    if (isUnknownWord(w) && !inCue(i)) unknown.push(w);
  });
  if (unknown.length > MAX_UNKNOWN) fail('coverage', `unexplained words: ${unknown.join(', ')}`);
  pass('coverage', unknown.length ? `closed-lexicon words explained; unknown: ${unknown.join(', ')}` : 'closed-lexicon words explained');
}

function isUnknownWord(w) {
  if (!/^[a-z][a-z'’-]*$/.test(w)) return false;
  const base = w.replace(/['’]s$/, '');
  const known = (x) => KNOWN_WORDS.has(x) || LEXICON_WORDS.has(x);
  if (known(base)) return false;
  for (const suf of ['s', 'es', 'ed', 'd', 'ing', 'ly']) if (base.endsWith(suf) && known(base.slice(0, -suf.length))) return false;
  if (base.includes('-') && base.split('-').every((p) => !p || known(p))) return false;
  return true;
}
