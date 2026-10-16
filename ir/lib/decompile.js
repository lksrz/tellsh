// decompile(text, env) — docs/IR.md §5.5: strict tokenizer + schema-driven getopt, bash/zsh.
// Reads a rendered command (or a real skeleton in the same subset) back into a canonical IR:
// `lit` values (raw copy candidates; provenance is the gate's job), pkind recovered from -F/-E
// (and from metacharacters for rg), derived and compiler mods stripped, compiler-added operands
// ('.' for a first-stage rg/grep/find) dropped. Anything outside the pilot IR returns
// {error, reason} with reason one of OOS_REASONS; a well-formed command returns {ir}.

import { program, and, pipe, exec, each, freq, mod, lit, validateShape, IRError } from './ir.js';
import { realize } from './schemas.js';
import { hasRegexMeta } from './normalizers.js';
import { canon, needsDotSlash } from './canon.js';

class DecompileError extends Error {
  constructor(message, reason = 'unsupported_construct') {
    super(message);
    this.reason = reason;
  }
}
const fail = (msg, reason) => { throw new DecompileError(msg, reason); };

// ---------- tokenizer ----------

const BARE = /[A-Za-z0-9_@%+:,./=-]/;
const WORD_END = /[\s|&;<>()]/;

// Words: {text, raw, quoted}. raw = compiler syntax (`\(`, `\)`, `{}`). Operators: {op}.
export function tokenize(s) {
  const toks = [];
  let i = 0;
  const n = s.length;
  const atDelim = (j) => j >= n || /[\s|&]/.test(s[j]);
  while (i < n) {
    const c = s[i];
    if (c === ' ' || c === '\t') { i++; continue; }
    if (c === '\n' || c === '\r') fail('newline (multiple commands)', 'control_flow');
    if (c === '|') {
      if (s[i + 1] === '|') fail('`||` is not in the pilot IR', 'control_flow');
      toks.push({ op: '|' }); i++; continue;
    }
    if (c === '&') {
      if (s[i + 1] !== '&') fail('`&` (background job) is not in the pilot IR', 'control_flow');
      toks.push({ op: '&&' }); i += 2; continue;
    }
    if (c === ';') fail('`;` is not in the pilot IR', 'control_flow');
    if (c === '(' || c === ')') fail('subshells are not in the pilot IR', 'control_flow');
    if (c === '<' || c === '>') fail('redirections are not in the pilot IR', 'write_effect');
    if (s.startsWith('2>/dev/null', i) && atDelim(i + 11)) { toks.push({ op: '2>/dev/null' }); i += 11; continue; }
    if (s.startsWith('2>&1', i) && atDelim(i + 4)) { toks.push({ op: '2>&1' }); i += 4; continue; }
    if (c === '#') fail('comments are not in the pilot IR');
    // a word: concatenated bare / quoted / escaped segments
    let text = '';
    let quoted = false;
    let raw = false;
    const start = i;
    while (i < n && !WORD_END.test(s[i])) {
      const ch = s[i];
      if (ch === "'") {
        const j = s.indexOf("'", i + 1);
        if (j < 0) fail('unterminated single quote');
        text += s.slice(i + 1, j); quoted = true; i = j + 1;
      } else if (ch === '"') {
        const j = s.indexOf('"', i + 1);
        if (j < 0) fail('unterminated double quote');
        const body = s.slice(i + 1, j);
        if (/[$`\\!]/.test(body)) fail('double-quoted expansion/escape is not in the pilot IR');
        text += body; quoted = true; i = j + 1;
      } else if (ch === '\\') {
        const nx = s[i + 1];
        if (nx === undefined || nx === '\n') fail('line continuation is not in the pilot IR');
        if ((nx === '(' || nx === ')') && i === start && (i + 2 >= n || WORD_END.test(s[i + 2]) || s[i + 2] === ' ')) {
          raw = true;
        } else if (/[A-Za-z0-9]/.test(nx)) fail(`escape \\${nx} is not in the pilot IR`);
        text += nx; quoted = true; i += 2;
      } else if (ch === '$' || ch === '`') {
        fail('expansions and command substitution are not in the pilot IR');
      } else if (ch === '~') {
        if (i !== start || !(i + 1 >= n || s[i + 1] === '/' || WORD_END.test(s[i + 1]))) fail('`~` only as a leading ~/ prefix');
        text += ch; i++;
      } else if (ch === '{' && i === start && s[i + 1] === '}' && (i + 2 >= n || WORD_END.test(s[i + 2]))) {
        text += '{}'; raw = true; i += 2;
      } else if (ch === '=' && i === start) {
        fail('a leading `=` is not in the pilot IR (zsh EQUALS)');
      } else if (BARE.test(ch)) {
        text += ch; i++;
      } else if ('*?[]{}'.includes(ch)) {
        fail('live shell globs / brace expansion are not in the pilot IR');
      } else fail(`unquoted character ${JSON.stringify(ch)} is not in the pilot IR`);
    }
    toks.push({ text, raw, quoted });
  }
  return toks;
}

// ---------- pipeline structure ----------

const isFlagWord = (w) => !w.raw && w.text.length > 1 && w.text[0] === '-';

function splitParts(toks) {
  const parts = [[]];
  for (const t of toks) {
    if (t.op === '&&') parts.push([]);
    else parts[parts.length - 1].push(t);
  }
  return parts.map((p) => {
    const stages = [{ words: [], stderr: undefined }];
    for (const t of p) {
      const st = stages[stages.length - 1];
      if (t.op === '|') stages.push({ words: [], stderr: undefined });
      else if (t.op === '2>/dev/null' || t.op === '2>&1') {
        if (!st.words.length || st.stderr) fail('misplaced stderr redirection', 'unsupported_construct');
        st.stderr = t.op === '2>&1' ? 'merge' : 'discard';
      } else if (t.op) fail(`unexpected ${t.op}`);
      else {
        if (st.stderr) fail('words after a stderr redirection');
        st.words.push(t);
      }
    }
    for (const st of stages) if (!st.words.length) fail('empty command', 'control_flow');
    return stages;
  });
}

const texts = (ws) => ws.map((w) => w.text);

// sort [[--] FILE] | uniq -c | sort -rn  ->  freq macro (`--` precedes a FILE starting with '-')
function freqAt(stages, i) {
  if (i + 2 >= stages.length) return null;
  const [a, b, c] = [stages[i], stages[i + 1], stages[i + 2]].map((s) => texts(s.words));
  if ([stages[i], stages[i + 1], stages[i + 2]].some((s) => s.stderr)) return null;
  if (b.join(' ') !== 'uniq -c') return null;
  if (!['sort -rn', 'sort -nr'].includes(c.join(' '))) return null;
  if (a[0] !== 'sort') return null;
  if (a.length === 1) return { paths: [] };
  if (a.length === 2 && !a[1].startsWith('-')) return { paths: [stages[i].words[1]] };
  const eoo = stages[i].words[1];
  if (a.length === 3 && a[1] === '--' && !eoo.quoted && a[2].startsWith('-')) return { paths: [stages[i].words[2]] };
  return null;
}

// ---------- values ----------

function untemplate(s, tpl) {
  if (!tpl) return s;
  const [pre, post] = tpl.split('{v}');
  if (!s.startsWith(pre) || !s.endsWith(post) || s.length <= pre.length + post.length) return null;
  return s.slice(pre.length, s.length - post.length);
}

// Inverse-render one option value through its spec. Returns the value string or null (no match).
function readValue(spec, s, strictValidator) {
  const v = spec.value || {};
  let x = s;
  if (v.prefix) {
    if (!x.startsWith(v.prefix)) return null;
    x = x.slice(v.prefix.length);
  }
  x = untemplate(x, v.template);
  if (x === null || x === '') return null;
  if (['Int', 'Size', 'Port'].includes(v.type) && !/^\d+$/.test(x)) return null;
  if (v.type === 'Const') {
    const id = Object.keys(v.enum).find((k) => v.enum[k] === x);
    if (id === undefined) return null;
    x = id;
  }
  if (strictValidator && v.validator && !new RegExp(v.validator, 'u').test(x)) return null;
  return x;
}

// The flag spellings the backend emits for `platform` (§5.5: the strict tokenizer accepts only those);
// with no platform, every spelling. A platform-absent option has none.
function flagsOfPlatform(spec, platform) {
  const pl = platform && spec.platform?.[platform];
  if (pl === 'absent') return [];
  if (pl?.flag) return [pl.flag];
  const out = [];
  if (typeof spec.flag === 'string') out.push(spec.flag);
  if (!platform) for (const p of Object.values(spec.platform || {})) if (p && p.flag) out.push(p.flag);
  return out;
}

// Among the specs sharing a flag, the first (schema order) whose value form matches;
// validators only break ties. same_argv_as sources are never chosen (canon collapses into the target).
function pickSpec(cands, s) {
  const usable = cands.filter((c) => !c.same_argv_as);
  for (const strict of [true, false]) {
    for (const c of usable) {
      const x = readValue(c, s, strict);
      if (x !== null) return { spec: c, value: x };
    }
  }
  return null;
}

// ---------- per-stage getopt ----------

class Acc {
  constructor() { this.mods = new Map(); this.flags = new Set(); }
  add(spec, value) {
    if (spec.model !== 'predict') { this.flags.add(spec.mod); return; }
    if (!this.mods.has(spec.mod)) this.mods.set(spec.mod, []);
    if (value !== undefined) this.mods.get(spec.mod).push(value);
  }
}

function dashSpecs(op) {
  return op.options.filter((o) => (o.form === 'bool' || o.form === 'sep' || o.form === 'eq' || o.form === 'attached'));
}

// Generic getopt for a non-find op. words: argv after binary + argv_prefix.
function getopt(tool, op, words, platform) {
  const specs = dashSpecs(op);
  const flagsOf = (o) => flagsOfPlatform(o, platform);
  const byFlag = (f) => specs.filter((o) => flagsOf(o).includes(f));
  const acc = new Acc();
  const dashE = op.positionals.find((p) => p.leading_dash === 'dash_e' || p.multi === 'dash_e');
  const ePatterns = [];
  const pos = [];
  let eoo = -1; // index in pos where `--` occurred
  const wordOpt = op.options.find((o) => o.form === 'word');
  let wordVal;

  const takeValue = (cands, val, flag) => {
    const hit = pickSpec(cands, val);
    if (!hit) fail(`${tool}: bad value ${JSON.stringify(val)} for ${flag}`);
    acc.add(hit.spec, hit.value);
  };

  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    const t = w.text;
    if (eoo >= 0 || !isFlagWord(w)) {
      if (wordOpt && wordVal === undefined && eoo < 0) {
        const x = untemplate(t, wordOpt.value?.template);
        if (x !== null) { wordVal = x; continue; }
      }
      pos.push(w);
      continue;
    }
    if (t === '--') { eoo = pos.length; continue; }
    // 1. exact flag (bool, or sep/eq taking the next word)
    const exact = byFlag(t);
    if (exact.length) {
      const bools = exact.filter((o) => o.form === 'bool');
      if (bools.length) { acc.add(bools[0]); continue; }
      const sep = exact.filter((o) => o.form === 'sep' || o.form === 'eq');
      if (sep.length) {
        if (i + 1 >= words.length) fail(`${tool}: ${t} needs a value`);
        takeValue(sep, words[++i].text, t);
        continue;
      }
    }
    if (dashE && (t === '-e' || t === '--regexp')) {
      if (i + 1 >= words.length) fail(`${tool}: ${t} needs a value`);
      ePatterns.push(words[++i]);
      continue;
    }
    // 2. --flag=value
    if (t.startsWith('--') && t.includes('=')) {
      const k = t.indexOf('=');
      const cands = byFlag(t.slice(0, k)).filter((o) => o.form === 'eq' || o.form === 'sep');
      if (!cands.length) fail(`${tool}: unknown option ${t.slice(0, k)}`);
      takeValue(cands, t.slice(k + 1), t.slice(0, k));
      continue;
    }
    // 3. attached (-iTCP:3000, -KILL)
    const att = specs.filter((o) => o.form === 'attached' && flagsOf(o).some((f) => t.startsWith(f) && t.length > f.length));
    const attHit = att.length && pickSpec(att, t.slice(flagsOf(att[0]).find((f) => t.startsWith(f)).length));
    if (attHit) { acc.add(attHit.spec, attHit.value); continue; }
    // 4. short cluster: -lAhS, -n5, -rnm 3, -eP
    if (!t.startsWith('--') && t.length > 2) {
      let j = 1;
      for (; j < t.length; j++) {
        const f = `-${t[j]}`;
        const cs = byFlag(f);
        const b = cs.find((o) => o.form === 'bool');
        if (b) { acc.add(b); continue; }
        const rest = t.slice(j + 1);
        if (dashE && f === '-e') {
          if (rest) ePatterns.push({ text: rest, raw: false, quoted: w.quoted });
          else if (i + 1 < words.length) ePatterns.push(words[++i]);
          else fail(`${tool}: -e needs a value`);
          break;
        }
        const sep = cs.filter((o) => o.form === 'sep');
        if (!sep.length) fail(`${tool}: unknown option ${f} in ${t}`);
        if (rest) takeValue(sep, rest, f);
        else if (i + 1 < words.length) takeValue(sep, words[++i].text, f);
        else fail(`${tool}: ${f} needs a value`);
        break;
      }
      continue;
    }
    fail(`${tool}: unknown option ${t}`);
  }
  if (wordOpt && wordVal !== undefined) acc.add(wordOpt, wordVal);
  return { acc, pos, ePatterns, eoo };
}

// Assign positionals to roles (schema order, greedy, leaving room for later minimums).
function assignRoles(tool, op, pos, ePatterns, eoo) {
  const args = {};
  const roles = op.positionals;
  let rest = [...pos];
  const revRole = roles.find((r) => r.eoo_after);
  const pathRole = roles.find((r) => r.always_eoo);
  if (pathRole) {
    // git: words before `--` are revs, after it paths
    const before = eoo >= 0 ? rest.slice(0, eoo) : rest;
    const after = eoo >= 0 ? rest.slice(eoo) : [];
    if (before.length) {
      if (!revRole) fail(`${tool}: paths must follow --`);
      if (before.length > revRole.arity[1]) fail(`${tool}: too many ${revRole.role} values`);
      args[revRole.role] = before;
    }
    if (after.length) {
      if (after.length > pathRole.arity[1]) fail(`${tool}: too many paths`);
      args[pathRole.role] = after;
    }
    return args;
  }
  for (const [ri, r] of roles.entries()) {
    if (ePatterns.length && (r.leading_dash === 'dash_e' || r.multi === 'dash_e')) {
      if (ePatterns.length > r.arity[1]) fail(`${tool}: too many ${r.role} values`);
      args[r.role] = ePatterns;
      continue;
    }
    const laterMin = roles.slice(ri + 1).reduce((s, x) => s + x.arity[0], 0);
    const max = r.multi === 'dash_e' ? 1 : r.arity[1];
    const take = Math.min(max, Math.max(0, rest.length - laterMin));
    if (take < r.arity[0]) fail(`${tool}: missing ${r.role}`);
    if (take) args[r.role] = rest.slice(0, take);
    rest = rest.slice(take);
  }
  if (rest.length) fail(`${tool}: too many operands`);
  return args;
}

// ---------- find ----------

function parseFind(op, words) {
  const acc = new Acc();
  const spec = (id) => op.options.find((o) => o.mod === id);
  const roots = [];
  let i = 0;
  while (i < words.length && !isFlagWord(words[i]) && !words[i].raw && words[i].text !== '!') roots.push(words[i++]);
  let caseMode = null; // 'i' (iname) | 'n' (name)
  let prune = false;
  let print = false;
  let inner = null;
  const need = (k) => { if (i + k >= words.length) fail(`find: ${words[i].text} needs a value`); };
  const nameFlag = (w) => {
    if (w.raw) return null;
    const m = w.text === '-name' ? 'n' : w.text === '-iname' ? 'i' : null;
    if (m) {
      if (caseMode && caseMode !== m) fail('find: mixed -name/-iname is not expressible');
      caseMode = m;
    }
    return m;
  };
  // reads `-name A -o -name B ... )` starting at i; returns values
  const orNames = () => {
    const vals = [];
    for (;;) {
      if (i + 1 >= words.length || !nameFlag(words[i])) fail('find: bad or-group');
      vals.push(words[i + 1].text);
      i += 2;
      if (words[i]?.raw && words[i].text === ')') { i++; return vals; }
      if (words[i]?.text !== '-o') fail('find: bad or-group');
      i++;
    }
  };
  while (i < words.length) {
    const w = words[i];
    const t = w.text;
    if (print || inner) fail('find: expression after the terminal action');
    if (t === '-type' && words[i + 1]?.text === 'd' && !prune) {
      // prune group?
      const n1 = words[i + 2];
      if (n1 && !n1.raw && n1.text === '-name' && words[i + 4]?.text === '-prune' && words[i + 5]?.text === '-o') {
        acc.add(spec('exclude_dir'), words[i + 3].text);
        prune = true; i += 6; continue;
      }
      if (n1?.raw && n1.text === '(') {
        const save = i;
        i += 3;
        const mode = caseMode;
        caseMode = null;
        const vals = orNames();
        if (caseMode === 'i') fail('find: -iname in a prune group');
        caseMode = mode;
        if (words[i]?.text !== '-prune' || words[i + 1]?.text !== '-o') { i = save; } else {
          for (const v of vals) acc.add(spec('exclude_dir'), v);
          prune = true; i += 2; continue;
        }
      }
    }
    if (w.raw && t === '(') {
      i++;
      for (const v of orNames()) acc.add(spec('any_name'), v);
      continue;
    }
    if (t === '-not' && words[i + 1]?.text === '-name') {
      need(2);
      acc.add(spec('exclude_glob'), words[i + 2].text);
      i += 3; continue;
    }
    if (nameFlag(w)) {
      need(1);
      acc.add(spec('name_glob'), words[i + 1].text);
      i += 2; continue;
    }
    if (t === '-print') { print = true; i++; continue; }
    if (t === '-print0') { acc.flags.add(op.nul.mod); i++; continue; }
    if (t === '-exec') {
      let j = i + 1;
      while (j < words.length && !(words[j].text === '{}' && words[j + 1]?.text === '+')) {
        if (words[j].text === '{}' || words[j].text === ';') fail('find: only `-exec CMD … {} +` is in the pilot IR', 'embedded_program');
        j++;
      }
      if (j >= words.length) fail('find: -exec must end with {} +', 'embedded_program');
      inner = words.slice(i + 1, j);
      i = j + 2;
      continue;
    }
    const cands = op.options.filter((o) => (o.form === 'sep' || o.form === 'bool') && o.flag === t);
    if (!cands.length) fail(`find: unknown primary ${t}`);
    if (cands[0].form === 'bool') { acc.add(cands[0]); i++; continue; }
    need(1);
    const hit = pickSpec(cands, words[i + 1].text);
    if (!hit) fail(`find: bad value ${JSON.stringify(words[i + 1].text)} for ${t}`);
    acc.add(hit.spec, hit.value);
    i += 2;
  }
  if (prune && !print && !inner) fail('find: a prune group needs -print or -exec');
  if (caseMode === 'i') acc.add(spec('ignore_case'));
  return { acc, roots, inner };
}

// ---------- stage -> exec ----------

const TOOL_BY_BINARY = (reg) => {
  const m = {};
  for (const s of Object.values(reg.tools)) m[s.binary] = s.tool;
  return m;
};

const FIND_TOOL = 'find';

function valueWord(w, role) {
  let s = w.text;
  if (role?.leading_dash === 'dot_slash' && s.startsWith('./') && needsDotSlash(s.slice(2))) s = s.slice(2);
  return s;
}

// Pattern kind from the stage's -F/-E flags (and rg's default regex dialect).
function patternKind(tool, flags, s) {
  if (flags.has('fixed_strings')) return 'literal';
  if (flags.has('extended_regex')) return hasRegexMeta(s) ? 'regex' : 'literal';
  if (!hasRegexMeta(s)) return 'literal';
  if (tool === 'rg') return 'regex';
  fail(`${tool}: a pattern with metacharacters needs -E or -F (basic regex is not in the pilot IR)`);
}

function buildExec(reg, tool, opId, op, acc, args, position, stderr) {
  const ex = exec(opId, { stderr });
  const flagsPk = acc.flags;
  for (const [id, vals] of acc.mods) {
    const spec = op.options.find((o) => o.mod === id);
    const v = spec.value || {};
    ex.mods.push(mod(id, vals.map((s) => (v.type === 'Pattern' ? lit(s, patternKind(tool, flagsPk, s)) : lit(s)))));
  }
  for (const [role, ws] of Object.entries(args)) {
    const r = op.positionals.find((p) => p.role === role);
    ex.args[role] = ws.map((w) => {
      const s = valueWord(w, r);
      return r.type === 'Pattern' ? lit(s, patternKind(tool, flagsPk, s)) : lit(s);
    });
  }
  // compiler-added operands of a first stage
  if (position === 'first' && op.first_stage_operands && ex.args.paths
    && texts(args.paths).join('\0') === op.first_stage_operands.join('\0')) delete ex.args.paths;
  const r = realize(reg, { op: opId }, position);
  if (r.error || r.tool !== tool) ex.pin = tool;
  return ex;
}

// Parses one argv into {exec, nul, inner?}. position: 'first' | 'filter' | 'each'.
function parseStage(reg, words, position, stderr, platform) {
  const bin = words[0];
  if (bin.raw || bin.quoted) fail(`unsupported command word ${JSON.stringify(bin.text)}`, 'tool_unsupported');
  const tool = TOOL_BY_BINARY(reg)[bin.text];
  if (!tool) fail(`tool ${bin.text} is not in the pilot`, 'tool_unsupported');
  const schema = reg.tools[tool];
  const rest = words.slice(1);
  const ops = Object.entries(schema.ops)
    .filter(([, o]) => o.argv_prefix.every((p, k) => rest[k] && !rest[k].raw && rest[k].text === p))
    .sort((a, b) => b[1].argv_prefix.length - a[1].argv_prefix.length);
  if (!ops.length) fail(`${tool}: subcommand not in the pilot`, 'tool_unsupported');
  let firstErr = null;
  for (const [opId, op] of ops) {
    try {
      const argv = rest.slice(op.argv_prefix.length);
      if (tool === FIND_TOOL) {
        const { acc, roots, inner } = parseFind(op, argv);
        const args = roots.length ? { paths: roots } : {};
        if (roots.length > op.positionals[0].arity[1]) fail('find: too many roots');
        if (stderr && !(op.stderr || []).includes(stderr)) fail(`${tool}: stderr ${stderr} not allowed`);
        return { exec: buildExec(reg, tool, opId, op, acc, args, position, stderr), nul: acc.flags.has(op.nul?.mod), inner };
      }
      const { acc, pos, ePatterns, eoo } = getopt(tool, op, argv, platform);
      const args = assignRoles(tool, op, pos, ePatterns, eoo);
      checkRequired(op, acc);
      if (stderr && !(op.stderr || []).includes(stderr)) fail(`${tool}: stderr ${stderr} not allowed`);
      return { exec: buildExec(reg, tool, opId, op, acc, args, position, stderr), nul: !!op.nul && acc.flags.has(op.nul.mod) };
    } catch (e) {
      if (!(e instanceof DecompileError)) throw e;
      firstErr ??= e;
    }
  }
  throw firstErr;
}

// Only the rules that discriminate ops sharing an argv prefix (curl download: -o xor -O).
function checkRequired(op, acc) {
  for (const r of op.rules || []) {
    if (r.required && !r.required.some((m) => acc.mods.has(m))) fail(`needs one of ${r.required.join(', ')}`);
  }
}

// xargs -0 [-r] CMD … --   (exactly as the backend emits it: `xargs -0 -r` on linux_gnu, where
// without -r an empty input would run the inner command on the cwd; `xargs -0` on darwin_bsd)
function parseXargs(words, platform) {
  let i = 1;
  let nul = false;
  let r = false;
  for (; i < words.length && isFlagWord(words[i]); i++) {
    const t = words[i].text;
    if (t === '--null' || t === '--no-run-if-empty') { nul ||= t === '--null'; r ||= t === '--no-run-if-empty'; continue; }
    if (/^-[0r]+$/.test(t)) { nul ||= t.includes('0'); r ||= t.includes('r'); continue; }
    fail(`xargs ${t} is not in the pilot IR`, 'embedded_program');
  }
  if (!nul) fail('xargs without -0 is not in the pilot IR');
  if (platform === 'linux_gnu' && !r) fail('xargs -0 without -r on linux_gnu runs the command on empty input');
  if (platform === 'darwin_bsd' && r) fail('xargs -r is not what the darwin_bsd backend emits');
  if (i >= words.length) fail('xargs needs a command');
  return words.slice(i);
}

function parseInner(reg, words, platform) {
  let w = words;
  if (w.length && w[w.length - 1].text === '--' && !w[w.length - 1].quoted) w = w.slice(0, -1);
  if (!w.length) fail('each: empty inner command');
  const { exec: ex, inner } = parseStage(reg, w, 'each', undefined, platform);
  if (inner) fail('each: nested -exec');
  if (ex.args.paths?.length) fail('each: the inner command must not carry file operands');
  return ex;
}

// ---------- program ----------

function decompileProgram(text, env) {
  const reg = env.schemas;
  const toks = tokenize(text);
  if (!toks.length) fail('empty command');
  let parts = splitParts(toks);
  let cwd;
  const p0 = parts[0];
  if (p0.length === 1 && p0[0].words[0].text === 'cd' && !p0[0].words[0].quoted) {
    const w = p0[0].words;
    if (parts.length < 2 || w.length !== 2 || p0[0].stderr || isFlagWord(w[1])) fail('cd is only a `cd ./X && …` prefix');
    cwd = lit(w[1].text.startsWith('./') && w[1].text.length > 2 ? w[1].text.slice(2) : w[1].text);
    parts = parts.slice(1);
  }
  const outParts = parts.map((stages) => {
    const out = [];
    let pendingNul = false;
    for (let i = 0; i < stages.length; i++) {
      const st = stages[i];
      const f = freqAt(stages, i);
      if (pendingNul && texts(st.words)[0] !== 'xargs') fail('a NUL path stream must feed xargs -0');
      if (f) {
        out.push(freq(f.paths.map((w) => lit(w.text))));
        i += 2;
        continue;
      }
      if (st.words[0].text === 'xargs' && !st.words[0].quoted) {
        if (!pendingNul) fail('xargs needs a NUL path stream (-0/-print0/-z) from the previous stage');
        if (st.stderr) fail('stderr redirection on xargs');
        out.push(each(parseInner(reg, parseXargs(st.words, env.platform), env.platform)));
        pendingNul = false;
        continue;
      }
      const { exec: ex, nul, inner } = parseStage(reg, st.words, i === 0 ? 'first' : 'filter', st.stderr, env.platform);
      out.push(ex);
      if (inner) {
        if (nul) fail('find: -print0 together with -exec');
        out.push(each(parseInner(reg, inner, env.platform)));
      }
      pendingNul = nul;
    }
    if (pendingNul) fail('a NUL path stream must feed xargs -0');
    return pipe(...out);
  });
  const ir = program(and(...outParts), { cwd });
  const errs = validateShape(ir);
  if (errs.length) fail(errs.join('; '));
  try {
    return canon(ir, { schemas: reg });
  } catch (e) {
    if (e instanceof IRError) fail(e.message);
    throw e;
  }
}

// decompile(text, env) -> {ir} | {error, reason}. env.schemas is required.
export function decompile(text, env) {
  if (!env?.schemas) throw new Error('decompile: env.schemas (registry) required');
  try {
    return { ir: decompileProgram(String(text), env) };
  } catch (e) {
    if (e instanceof DecompileError) return { error: e.message, reason: e.reason };
    throw e;
  }
}
