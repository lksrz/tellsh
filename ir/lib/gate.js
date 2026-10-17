// gate(request, ir, env) — docs/IR.md §6. The checks run in order; the first failure abstains:
//   1. schema (§6.1): ops, mods, values, arity, rules, stream legality (§3), limits, invariant 8;
//   2. provenance (§6.2): every value recomputed from the request (spans, approved normalizers,
//      enum consts), no overlapping units, type validators, regex dialects; the gate sets pkind;
//   3. obligations (§6.3): polarity + negation scope, cue classes (both directions), numbers,
//      named values, direction, count kind, first-N vs per-file, kill verb, closed-lexicon coverage;
//   4. environment (§6.4);
//   5. round-trip (§5.5) via compile + decompile (skippable with env.skipRoundTrip);
//   6. effects -> risk (§6.5). Risk is computed from effects only and can only be raised.
//
// Result: { accept, label, risk, reasons, obligations, spans, command?, gloss?, ir? }.
// label: 'ok' on accept; a model abstention status for an abstaining IR; otherwise a gate verdict
// ('gate_reject' | 'unsafe_value' | 'env_unsupported' | 'ambiguous').

import { validateShape, execs, equals } from './ir.js';
import {
  opSchema, realize, valueActions, stdoutOf, acceptsStream, pipeIllegal, eachIllegal, effectsOf,
  READ_ONLY_EFFECTS,
} from './schemas.js';
import { segment, spanText, unitWord, isQuotedUnit } from './units.js';
import { canon, resolveValue, CWD_SPEC } from './canon.js';
import { parseIntPhrase } from './normalizers.js';
import { UNSAFE_CHARS } from './ir.js';
import { obligations } from './obligations.js';
import { findCues } from './lexicon.js';
// Namespace imports: bindings are resolved at call time, so compile/decompile may still be stubs
// (or import this module) without breaking gate's load.
import * as compileModule from './compile.js';
import * as decompileModule from './decompile.js';

const RISK_ORDER = ['safe', 'medium', 'high', 'deny'];
const maxRisk = (a, b) => (RISK_ORDER.indexOf(a) >= RISK_ORDER.indexOf(b) ? a : b);

class Reject extends Error {
  constructor(label, reason, risk) {
    super(reason);
    this.label = label;
    this.risk = risk;
  }
}
const reject = (reason, label = 'gate_reject', risk) => { throw new Reject(label, reason, risk); };

// ---------- helpers ----------

const ERE_ESCAPABLE = new Set('.[]()*+?{}|^$\\'.split(''));

export { findCues };

// Strict POSIX-ERE checker (§1): a small ERE grammar walk. Only the POSIX escape set; no `(?…)`
// groups (lookaround, non-capturing, named), no lazy/possessive or stacked quantifiers, no `{,n}`,
// no quantifier without an atom (pattern/group/alternative start, after an anchor), no bare `{`.
// GNU and BSD disagree on all of these. The result must also parse as a JS RegExp.
function ereProblem(s) {
  let prev = 'start'; // 'start' | 'atom' | 'quant' | 'anchor'
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '\\') {
      if (!ERE_ESCAPABLE.has(s[i + 1])) return `escape \\${s[i + 1] ?? ''} outside the POSIX set`;
      i++;
      prev = 'atom';
    } else if (c === '[') {
      let j = i + 1;
      if (s[j] === '^') j++;
      if (s[j] === ']') j++;
      while (j < s.length && s[j] !== ']') {
        if (s[j] === '[' && ':.='.includes(s[j + 1] ?? '')) {
          const close = s.indexOf(`${s[j + 1]}]`, j + 2);
          if (close < 0) return 'unterminated bracket class';
          j = close + 2;
        } else j++;
      }
      if (j >= s.length) return 'unterminated bracket expression';
      i = j;
      prev = 'atom';
    } else if (c === '(') {
      if (s[i + 1] === '?') return '`(?` group syntax is not POSIX ERE';
      prev = 'start';
    } else if (c === '|') {
      prev = 'start';
    } else if (c === ')') {
      prev = 'atom';
    } else if (c === '^' || c === '$') {
      prev = 'anchor';
    } else if (c === '*' || c === '+' || c === '?' || c === '{') {
      if (c === '{') {
        const m = /^\{(\d+)(,(\d*))?\}/.exec(s.slice(i));
        if (!m) return /^\{,/.test(s.slice(i)) ? '`{,n}` is not POSIX ERE' : 'a bare `{` is not POSIX ERE';
        if (m[3] && Number(m[3]) < Number(m[1])) return `bad interval ${m[0]}`;
        i += m[0].length - 1;
      }
      if (prev === 'quant') return `stacked quantifier at ${i} (lazy/possessive forms are not POSIX ERE)`;
      if (prev !== 'atom') return `quantifier ${c} without an atom`;
      prev = 'quant';
    } else prev = 'atom';
  }
  try { new RegExp(s); } catch (e) { return `does not parse: ${e.message}`; }
  return null;
}

function rustProblem(s) {
  if (/\(\?<?[=!]/.test(s)) return 'lookaround is not supported by Rust regex';
  if (/\\[1-9]/.test(s)) return 'back-references are not supported by Rust regex';
  try { new RegExp(s); } catch (e) { return `does not parse: ${e.message}`; }
  return null;
}

function cmpVersion(a, b) {
  const x = String(a).split('.').map(Number);
  const y = String(b).split('.').map(Number);
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] || 0) - (y[i] || 0);
    if (d) return d;
  }
  return 0;
}

// A numeric token (§6.3 numbers): digits, or a number word the int normalizer accepts ("five", "a dozen").
export const isNumericUnit = (u) => /^[-+:]?\d/.test(u.t) || parseIntPhrase(unitWord(u)) !== null;

// A value path as the program will see it: relative to the program's cwd (when set), with a leading
// `~` expanded from env.home. null when it cannot be resolved (no env.home for a tilde path): callers
// then assume the worst (the write target exists; the read operand is not probed).
export function resolvePath(p, ctx) {
  const tilde = (x) => {
    if (x !== '~' && !x.startsWith('~/')) return x;
    const home = ctx.env.home;
    return typeof home === 'string' && home ? home.replace(/\/$/, '') + x.slice(1) : null;
  };
  const x = tilde(p);
  if (x === null) return null;
  if (x.startsWith('/') || ctx.cwdValue === undefined) return x;
  const cwd = tilde(ctx.cwdValue);
  if (cwd === null) return null;
  return `${cwd.replace(/\/+$/, '')}/${x}`;
}

const dirname = (p) => (p.includes('/') ? p.slice(0, p.lastIndexOf('/')) || '/' : '.');
const overlaps = (x, y) => x[0] < y[1] && y[0] < x[1];

// ---------- 1. schema + stage analysis (§6.1, §3) ----------

function analyze(ir, reg) {
  const stages = []; // flat list of stage infos
  let realTotal = 0;
  ir.body.parts.forEach((part, pi) => {
    let stream = 'none';
    let real = 0;
    let prev = null;
    part.stages.forEach((st, si) => {
      const where = `part ${pi + 1} stage ${si + 1}`;
      if (st.k === 'macro') {
        const hasPaths = !!st.args?.paths?.length;
        if (si === 0 && !hasPaths) reject(`${where}: freq as a first stage needs a file (invariant 8)`);
        if (si > 0) {
          if (hasPaths) reject(`${where}: freq after a pipe cannot take file operands`);
          if (!['lines', 'paths'].includes(stream)) reject(`${where}: freq cannot read ${stream}`);
        }
        const info = { kind: 'macro', st, part: pi, stage: si, inStream: stream, outStream: 'lines', where };
        stages.push(info);
        stream = 'lines';
        real += 3;
        prev = info;
        return;
      }
      const isEach = st.k === 'each';
      const e = isEach ? st.exec : st;
      const position = isEach ? 'each' : si === 0 ? 'first' : 'filter';
      const r = realize(reg, e, position);
      if (r.error) reject(`${where}: ${r.error}`, r.label);
      const op = opSchema(reg, r.tool, e.op);
      const info = { kind: isEach ? 'each' : 'exec', st, exec: e, part: pi, stage: si, position, tool: r.tool, op, where, inStream: stream };
      checkExecSchema(info);
      const modIds = e.mods.map((m) => m.mod);
      const hasPaths = !!e.args.paths?.length;
      if (position === 'first') {
        if (op.stdin.when !== 'never' && op.no_operands === 'stdin' && !hasPaths && !op.first_stage_operands)
          reject(`${where}: ${r.tool} with no file operand would read stdin (invariant 8)`);
        info.inStream = 'none';
      } else if (position === 'filter') {
        const why = pipeIllegal(stream, op, { hasFileOperands: hasPaths, consumerMods: modIds });
        if (why) reject(`${where}: ${stream} -> ${e.op}: ${why}`);
      } else {
        if (!prev || prev.kind !== 'exec') reject(`${where}: each must follow an exec stage`);
        const innerEffects = effectsOf(op, modIds);
        if (!op.each_ok || innerEffects.some((x) => !READ_ONLY_EFFECTS.includes(x)))
          reject(`${where}: each with a non-each_ok inner (${e.op})`, 'gate_reject', 'deny');
        const why = eachIllegal(prev.op, stream, op, modIds);
        if (why) reject(`${where}: ${why}`);
        if (hasPaths) reject(`${where}: an each inner takes its paths from the producer`);
        info.producer = prev;
        real += prev.tool === 'find' ? 0 : 1; // xargs
      }
      const out = stdoutOf(op, modIds, position === 'filter' ? stream : 'lines');
      info.outStream = out;
      stages.push(info);
      stream = out;
      real += 1;
      prev = info;
    });
    if (real > 6) reject(`part ${pi + 1}: ${real} real commands (max 6 per pipe)`);
    realTotal += real;
  });
  if (realTotal > 8) reject(`${realTotal} real commands (max 8)`);
  return stages;
}

function checkExecSchema({ exec: e, op, tool, where, position }) {
  const seen = new Set();
  for (const m of e.mods) {
    const spec = op.options.find((o) => o.mod === m.mod);
    if (!spec) reject(`${where}: mod "${m.mod}" not supported by ${tool} ${e.op}`);
    if (spec.model !== 'predict') reject(`${where}: mod "${m.mod}" is ${spec.model}, never a model output`);
    if (seen.has(m.mod)) reject(`${where}: mod "${m.mod}" repeated`);
    seen.add(m.mod);
    const n = m.values?.length || 0;
    if (!spec.value) { if (n) reject(`${where}: mod "${m.mod}" takes no value`); continue; }
    const [lo, hi] = spec.value.repeat || [1, 1];
    if (n < lo || n > hi) reject(`${where}: mod "${m.mod}" takes ${lo}..${hi} values, got ${n}`);
  }
  for (const role of Object.keys(e.args)) {
    if (!op.positionals.some((p) => p.role === role)) reject(`${where}: role "${role}" not in ${tool} ${e.op}`);
  }
  for (const p of op.positionals) {
    const n = e.args[p.role]?.length || 0;
    // A filter / each stage gets its operands from stdin or the producer.
    const min = position !== 'first' && p.role === 'paths' ? 0 : p.arity[0];
    if (n < min) reject(`${where}: role "${p.role}" needs ${p.arity[0]}..${p.arity[1]} values`, 'underspecified');
    if (n > p.arity[1]) reject(`${where}: role "${p.role}" takes at most ${p.arity[1]} values`);
  }
  if (e.stderr && !(op.stderr || []).includes(e.stderr)) reject(`${where}: stderr ${e.stderr} not allowed for ${e.op}`);
  const have = new Set(e.mods.map((m) => m.mod));
  for (const r of op.rules || []) {
    if (r.excl && r.excl.filter((m) => have.has(m)).length > 1) reject(`${where}: at most one of ${r.excl.join(', ')}`);
    if (r.requires && have.has(r.requires) && !r.any_of.some((m) => have.has(m)))
      reject(`${where}: ${r.requires} requires one of ${r.any_of.join(', ')}`);
    if (r.required && !r.required.some((m) => have.has(m))) reject(`${where}: one of ${r.required.join(', ')} is required`);
    if (r.role_count && have.has(r.when)) {
      const n = e.args[r.role_count]?.length || 0;
      if (n < r.arity[0] || n > r.arity[1]) reject(`${where}: ${r.when} needs ${r.arity.join('..')} ${r.role_count}`);
    }
    if (r.excl_role && have.has(r.excl_role) && e.args[r.role]?.length) reject(`${where}: ${r.excl_role} forbids ${r.role}`);
    if (r.min_values && have.has(r.when)) {
      const n = e.mods.find((m) => m.mod === r.min_values)?.values?.length || 0;
      if (n < r.min) reject(`${where}: ${r.when} needs >= ${r.min} ${r.min_values} values`);
    }
  }
}

// ---------- 2. provenance (§6.2) ----------

function provenance(ir, stages, ctx) {
  const used = []; // {u, role, kind, value, where}
  const regexCue = ctx.cues.some((c) => c.cls === 'REGEX');

  const check = (v, spec, role, where) => {
    const type = spec.type;
    const acts = valueActions(spec);
    if (v.k === 'lit') reject(`${where}: canonical (lit) values are not a model output`);
    if (v.k === 'span') {
      if (!acts.span) reject(`${where}: ${type} values cannot be copied spans`);
      if (v.as !== type) reject(`${where}: span typed ${v.as}, expected ${type}`);
      v.pkind = type === 'Pattern' ? (regexCue ? 'regex' : 'literal') : undefined; // gate sets pkind
      if (v.pkind === undefined) delete v.pkind;
    } else if (v.k === 'norm') {
      if (!acts.norms.includes(v.kind)) reject(`${where}: norm ${v.kind} not allowed for ${type}`);
    } else if (v.k === 'const') {
      if (!acts.consts.includes(v.id)) reject(`${where}: const "${v.id}" not an allowed value`);
    }
    if (v.u) {
      if (!(v.u[1] <= ctx.seg.units.length)) reject(`${where}: span [${v.u}] outside the request`);
      if (v.k === 'span' && v.u[1] - v.u[0] > 1) multiUnitSpan(v.u, type, where, ctx);
      const src = spanText(ctx.seg, v.u);
      if (UNSAFE_CHARS.test(src)) reject(`${where}: control, bidi or zero-width character in "${src}"`, 'unsafe_value');
    }
    let resolved;
    try {
      resolved = resolveValue(v, spec, { seg: ctx.seg, pathExists: ctx.env.pathExists }, where);
    } catch (e) {
      reject(e.message, e.label === 'ambiguous' ? 'ambiguous' : 'gate_reject');
    }
    const s = resolved.s;
    if (!s.length) reject(`${where}: empty value`);
    if (UNSAFE_CHARS.test(s)) reject(`${where}: unsafe character in value`, 'unsafe_value');
    if (spec.validator && !new RegExp(spec.validator, 'u').test(s)) reject(`${where}: "${s}" fails the ${type} validator`, 'unsafe_value');
    if (type === 'Pattern' && v.k !== 'const') {
      const pre = v.k === 'norm' ? 'regex' : v.pkind; // pkind before canon's literal fold
      if (pre === 'regex') {
        const why = spec.dialect === 'posix_ere' ? ereProblem(s) : rustProblem(s);
        if (why) reject(`${where}: regex "${s}" ${why}`, 'unsafe_value');
      }
      if (v.k === 'norm') v.anchor = true;
    }
    if (v.u) used.push({ u: [...v.u], role, kind: v.k === 'norm' ? `norm:${v.kind}` : v.k, value: s, where });
    return s;
  };

  if (ir.cwd) ctx.cwdValue = check(ir.cwd, CWD_SPEC, 'cwd', 'cwd');
  for (const info of stages) {
    if (info.kind === 'macro') {
      info.values = { paths: (info.st.args?.paths || []).map((v, i) => check(v, { type: 'Path' }, 'paths', `${info.where}.paths[${i}]`)) };
      continue;
    }
    const e = info.exec;
    info.values = {};
    info.modValues = {};
    for (const m of e.mods) {
      const spec = info.op.options.find((o) => o.mod === m.mod);
      info.modValues[m.mod] = (m.values || []).map((v, i) => check(v, spec.value, `mod:${m.mod}`, `${info.where}.${m.mod}[${i}]`));
    }
    for (const [role, vs] of Object.entries(e.args)) {
      const spec = info.op.positionals.find((p) => p.role === role);
      info.values[role] = vs.map((v, i) => check(v, spec, role, `${info.where}.${role}[${i}]`));
    }
    for (const r of info.op.rules || []) {
      if (r.no_range_multi && (info.values[r.no_range_multi] || []).length > 1 && info.values[r.no_range_multi].some((s) => s.includes('..')))
        reject(`${info.where}: a ${r.no_range_multi} range cannot be combined with another ${r.no_range_multi}`);
    }
  }
  for (let i = 0; i < used.length; i++) {
    for (let j = i + 1; j < used.length; j++) {
      if (overlaps(used[i].u, used[j].u)) reject(`values overlap: ${used[i].where} and ${used[j].where} share request units`);
    }
  }
  return used;
}

// A copied span over several units: never from/to a quoted unit (the quotes would be copied, or two
// quoted strings glued), and for Pattern/Glob/Name never over a cue phrase, NEG or numeric unit (the
// span would swallow the modifier / negation / count the request asks for: "TODO not in tests").
function multiUnitSpan([a, b], type, where, ctx) {
  const { units } = ctx.seg;
  if (isQuotedUnit(units[a]) || isQuotedUnit(units[b - 1])) reject(`${where}: a multi-unit span cannot start or end with a quoted string`);
  if (!['Pattern', 'Glob', 'Name'].includes(type)) return;
  const cue = ctx.cues.find((c) => c.a < b && a < c.b);
  if (cue) reject(`${where}: span swallows the cue "${cue.phrase}" (${cue.cls}); quote the value to search for it`);
  for (let i = a; i < b; i++) if (isNumericUnit(units[i])) reject(`${where}: span swallows the number "${units[i].t}"`);
}

// ---------- 3. obligations (§6.3) ----------

// The checks live in obligations.js.

// ---------- effects -> risk (§6.5) ----------

function deriveRisk(stages, ctx) {
  let risk = 'safe';
  const all = new Set();
  ctx.writeTargets = [];
  for (const info of stages) {
    if (info.kind === 'macro') continue;
    const eff = effectsOf(info.op, info.exec.mods.map((m) => m.mod));
    eff.forEach((x) => all.add(x));
    for (const x of eff) {
      if (x === 'net_read' || x === 'exec_project') risk = maxRisk(risk, 'medium');
      if (x === 'signal_proc') risk = maxRisk(risk, 'high');
      if (x === 'write_fs') {
        let target;
        if (info.modValues?.output?.length) target = info.modValues.output[0];
        else if (info.exec.mods.some((m) => m.mod === 'remote_name')) {
          const url = info.values.url?.[0] || '';
          const path = url.replace(/^https?:\/\/[^/]*/i, '').replace(/[?#].*$/, '');
          target = path.slice(path.lastIndexOf('/') + 1);
          if (!target) reject('-O: the URL has no file name to write', 'gate_reject');
        }
        if (!target) reject('write_fs without a known target');
        const resolved = resolvePath(target, ctx);
        ctx.writeTargets.push(resolved);
        // unknown (no probe, or an unresolvable path): assume it exists
        const exists = ctx.env.pathExists && resolved !== null ? ctx.env.pathExists(resolved) : true;
        risk = maxRisk(risk, exists ? 'high' : 'medium');
      }
    }
  }
  if (all.has('net_read') && all.has('exec_project')) reject('net_read and exec_project in one program', 'gate_reject', 'deny');
  return risk;
}

// ---------- 4. environment (§6.4) ----------

function environment(ir, stages, ctx, risk) {
  const { env, reg, obl, reasons } = ctx;
  const fail = (detail) => { obl.push({ check: 'env', ok: false, detail }); reject(`env: ${detail}`, 'env_unsupported'); };
  const needTool = (tool, mods = []) => {
    const schema = reg.tools[tool];
    if (env.platform && schema.platforms[env.platform] === 'absent') fail(`${tool} is absent on ${env.platform}`);
    if (env.tools) {
      if (!(schema.binary in env.tools)) fail(`${schema.binary} is not installed`);
      const ver = env.tools[schema.binary];
      const mins = [schema.versions.min, ...mods.map((m) => m.min_version)].filter(Boolean);
      for (const min of mins) if (ver && cmpVersion(ver, min) < 0) fail(`${schema.binary} ${ver} < ${min}`);
    }
    for (const m of mods) if (env.platform && m.platform?.[env.platform] === 'absent') fail(`${tool} ${m.mod} is absent on ${env.platform}`);
  };
  for (const info of stages) {
    if (info.kind === 'macro') { if (reg.tools.sort) needTool('sort'); if (reg.tools.uniq) needTool('uniq'); continue; }
    needTool(info.tool, info.exec.mods.map((m) => info.op.options.find((o) => o.mod === m.mod)));
    if (info.exec.op.startsWith('git.') && 'gitTop' in env && !env.gitTop) fail('not inside a git work tree');
    if (info.kind === 'each' && info.producer.exec.op.startsWith('git.') && (!env.gitTop || env.cwd !== env.gitTop))
      fail('each after git needs cwd == git toplevel');
    if (info.exec.op === 'proc.kill' && env.platform === 'linux_gnu' && (info.values.name || []).some((n) => n.length > 15))
      fail('pkill -x on Linux matches the 15-char comm; longer names never match');
  }
  if (ctx.cwdValue !== undefined && env.isDir) {
    const cwd = resolvePath(ctx.cwdValue, { env, cwdValue: undefined });
    if (cwd !== null && !env.isDir(cwd)) fail(`cwd ${ctx.cwdValue} is not a directory`);
  }
  if (env.pathExists) {
    const reads = stages.flatMap((s) => s.values?.paths || []);
    for (const p of reads) {
      const r = resolvePath(p, ctx);
      if (r === null || env.pathExists(r)) continue;
      if (RISK_ORDER.indexOf(risk) >= 1) fail(`read operand ${p} does not exist`);
      reasons.push(`note: ${p} does not exist`);
    }
  }
  if (env.isDir) for (const t of ctx.writeTargets) if (t !== null && !env.isDir(dirname(t))) fail(`parent directory of ${t} does not exist`);
  obl.push({ check: 'env', ok: true, detail: env.platform || 'no platform given' });
}

// ---------- gloss ----------

function glossOf(stages, ir) {
  const parts = ir.body.parts.map((_, pi) => stages.filter((s) => s.part === pi).map((s) => {
    if (s.kind === 'macro') return `count identical lines${s.values.paths.length ? ` of ${s.values.paths.join(' ')}` : ''}, most frequent first`;
    const g = s.op.gloss.replace(/\{(\w+)\}/g, (_, k) => {
      const v = s.values[k] || s.modValues[k];
      if (v?.length) return v.join(' ');
      if (k === 'paths' || k === 'roots') return s.position === 'first' ? (s.op.first_stage_operands || ['.']).join(' ') : 'the input';
      return '';
    }).replace(/\s+/g, ' ').trim();
    return s.kind === 'each' ? `for each path: ${g}` : g;
  }).join(' | '));
  return (ir.cwd ? 'in the given directory: ' : '') + parts.join('; then ');
}

// ---------- 5. round-trip (§5.5) ----------

function roundTrip(gated, ctx) {
  const { env, obl } = ctx;
  if (env.skipRoundTrip) {
    obl.push({ check: 'round_trip', ok: true, detail: 'skipped (env.skipRoundTrip)' });
    return null;
  }
  const compile = env.compile || compileModule.compile;
  const decompile = env.decompile || decompileModule.decompile;
  const cenv = { ...env, request: ctx.seg.text };
  let c;
  try { c = compile(gated, cenv); } catch (e) {
    reject(/not implemented/.test(e.message)
      ? 'round_trip: compile is not implemented (set env.skipRoundTrip to test the gate alone)'
      : `round_trip: compile threw: ${e.message}`);
  }
  if (c.error) reject(`compile: ${c.error}`, c.label || 'gate_reject');
  let d;
  try { d = decompile(c.text, cenv); } catch (e) { reject(`round_trip: decompile threw: ${e.message}`); }
  if (d.error) reject(`round_trip: decompile failed (compiler bug): ${d.error}`);
  // compile adds the request-implied find -type f before canon (compile.js impliedFileType): so does the reference
  const want = canon(compileModule.impliedFileType(gated, ctx.seg.text), { schemas: ctx.reg, seg: ctx.seg, pathExists: env.pathExists });
  if (!equals(d.ir, want)) reject('round_trip: decompile(render(IR)) != canon(IR)');
  obl.push({ check: 'round_trip', ok: true, detail: c.text });
  return c.text;
}

// ---------- entry ----------

export function gate(request, ir, env = {}) {
  const res = { accept: false, label: 'gate_reject', risk: 'safe', reasons: [], obligations: [], spans: [] };
  try {
    if (!env.schemas) throw new Error('gate: env.schemas (registry) required');
    const shape = validateShape(ir);
    if (shape.length) reject(`schema: ${shape.join('; ')}`);
    if (ir.status !== 'ok') {
      res.label = ir.status;
      if (ir.reason) res.reasons.push(`reason: ${ir.reason}`);
      if (ir.missing?.length) res.reasons.push(`need: ${ir.missing.join(', ')}`);
      return res;
    }
    const gated = structuredClone(ir);
    const seg = segment(request);
    const ctx = { env, reg: env.schemas, seg, cues: findCues(seg), obl: res.obligations, reasons: res.reasons, reject };
    for (const { exec: e } of execs(gated)) { e.mods ??= []; e.args ??= {}; }

    const stages = analyze(gated, ctx.reg);
    res.obligations.push({ check: 'schema', ok: true, detail: `${stages.length} stage(s)` });
    const used = provenance(gated, stages, ctx);
    res.spans = used.map(({ u, role, kind, value }) => ({ u, role, kind, value }));
    res.obligations.push({ check: 'provenance', ok: true, detail: `${used.length} value(s) from the request` });
    let risk = deriveRisk(stages, ctx);
    res.risk = risk;
    obligations(gated, stages, ctx, used);
    environment(gated, stages, ctx, risk);
    // Strip gate-internal markers before compile / canon.
    const clean = JSON.parse(JSON.stringify(gated, (k, v) => (k === 'anchor' ? undefined : v)));
    const command = roundTrip(clean, ctx);
    if (env.dangerRisk) risk = maxRisk(risk, env.dangerRisk); // danger.js can only raise
    Object.assign(res, { accept: true, label: 'ok', risk, gloss: glossOf(stages, gated) });
    if (command !== null) res.command = command;
    res.ir = canon(clean, { schemas: ctx.reg, seg, pathExists: env.pathExists });
    return res;
  } catch (e) {
    if (!(e instanceof Reject)) throw e;
    res.accept = false;
    res.label = e.label;
    if (e.risk) res.risk = maxRisk(res.risk, e.risk);
    res.reasons.push(e.message);
    delete res.gloss;
    return res;
  }
}
