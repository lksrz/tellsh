// Typed command IR: data model, constructors, JSON (de)serialization and structural equality.
// Authoritative design: docs/IR.md §1. IR values never carry shell syntax; only the compiler does.

export const IR_VERSION = 1;

export const MODEL_ABSTAIN = ['not_shell', 'out_of_scope', 'underspecified'];
export const STATUSES = ['ok', ...MODEL_ABSTAIN];
// User-facing outcome labels (gate output): ok, or one of the abstentions.
export const LABELS = ['ok', 'ambiguous', 'underspecified', 'out_of_scope', 'not_shell'];
export const GATE_VERDICTS = ['accept', 'ambiguous', 'gate_reject', 'unsafe_value',
  'env_unsupported', 'low_confidence', 'disagree'];
export const OOS_REASONS = ['tool_unsupported', 'embedded_program', 'control_flow',
  'write_effect', 'privileged', 'unsupported_construct'];
export const VTYPES = ['Pattern', 'Path', 'Glob', 'Name', 'Rev', 'Url', 'ScriptName',
  'ProcName', 'JqPath', 'Int', 'Size', 'Port', 'Date', 'LineRange'];
export const NORM_KINDS = ['int', 'size', 'age_days', 'age_minutes', 'git_date', 'iso_date',
  'ext_glob', 'substr_glob', 'home_path', 'rev_rel', 'line_range', 'port', 'jq_path',
  'url_scheme', 'starts_with', 'ends_with', 'signal', 'scope_top'];
export const PKINDS = ['literal', 'regex'];
export const STDERR_MODES = ['discard', 'merge'];
export const MACROS = ['freq'];

// Characters never emitted inside a value (§5.4), shared by the gate and the compiler: every Unicode
// control (Cc: C0, DEL, C1 such as U+0085 NEL / U+009B CSI) and format character (Cf: bidi
// overrides/isolates/marks, zero-width chars, U+00AD, U+061C, U+180E, U+FEFF, ...), plus the line and
// paragraph separators U+2028/U+2029.
export const UNSAFE_CHARS = /[\p{Cc}\p{Cf}\u2028\u2029]/u;

export const LIMITS = { parts: [1, 3], stages: [1, 4], realPerPipe: 6, realTotal: 8, eachPerPipe: 1 };

export class IRError extends Error {
  constructor(message, { label = 'gate_reject', path = '' } = {}) {
    super(path ? `${path}: ${message}` : message);
    this.name = 'IRError';
    this.label = label;
    this.path = path;
  }
}

// ---------- constructors ----------

export function program(body, { cwd } = {}) {
  const p = { v: IR_VERSION, status: 'ok' };
  if (cwd) p.cwd = cwd;
  p.body = body.k === 'and' ? body : body.k === 'pipe' ? and(body) : and(pipe(body));
  return p;
}

export function abstain(status, { reason, missing } = {}) {
  if (!MODEL_ABSTAIN.includes(status)) throw new IRError(`not an abstain status: ${status}`);
  const p = { v: IR_VERSION, status };
  if (reason) p.reason = reason;
  if (missing && missing.length) p.missing = [...missing];
  return p;
}

export const and = (...parts) => ({ k: 'and', parts });
export const pipe = (...stages) => ({ k: 'pipe', stages });

export function exec(op, { pin, mods = [], args = {}, stderr } = {}) {
  const e = { k: 'exec', op };
  if (pin) e.pin = pin;
  e.mods = mods;
  e.args = args;
  if (stderr) e.stderr = stderr;
  return e;
}

export const each = (inner) => ({ k: 'each', exec: inner });

export function freq(paths) {
  const m = { k: 'macro', id: 'freq' };
  if (paths && paths.length) m.args = { paths };
  return m;
}

export function mod(id, values) {
  const m = { mod: id };
  if (values && values.length) m.values = values;
  return m;
}

export function span(u0, u1, as, pkind) {
  const v = { k: 'span', u: [u0, u1], as };
  if (pkind) v.pkind = pkind;
  return v;
}

export const norm = (kind, u0, u1) => ({ k: 'norm', kind, u: [u0, u1] });
export const cnst = (id) => ({ k: 'const', id });

// Canonical value (output of canon/decompile only): provenance replaced by the value string.
export function lit(s, pkind) {
  const v = { k: 'lit', s };
  if (pkind) v.pkind = pkind;
  return v;
}

// ---------- traversal ----------

// Every exec in the program, with its location. Each inners are yielded with position 'each'.
export function* execs(ir) {
  if (!ir || ir.status !== 'ok') return;
  for (const [pi, part] of ir.body.parts.entries()) {
    for (const [si, st] of part.stages.entries()) {
      if (st.k === 'exec') yield { exec: st, part: pi, stage: si, position: si === 0 ? 'first' : 'filter' };
      else if (st.k === 'each') yield { exec: st.exec, part: pi, stage: si, position: 'each' };
    }
  }
}

// ---------- shape validation ----------

const isInt = (n) => Number.isInteger(n) && n >= 0;
const isObj = (o) => o !== null && typeof o === 'object' && !Array.isArray(o);

function checkValue(v, path, errs) {
  if (!isObj(v)) return errs.push(`${path}: value must be an object`);
  switch (v.k) {
    case 'span':
      if (!Array.isArray(v.u) || v.u.length !== 2 || !isInt(v.u[0]) || !isInt(v.u[1]) || v.u[1] <= v.u[0])
        errs.push(`${path}: span.u must be a half-open [a,b) with a<b`);
      if (!VTYPES.includes(v.as)) errs.push(`${path}: span.as must be a VType, got ${v.as}`);
      if (v.pkind !== undefined && !PKINDS.includes(v.pkind)) errs.push(`${path}: bad pkind ${v.pkind}`);
      break;
    case 'norm':
      if (!NORM_KINDS.includes(v.kind)) errs.push(`${path}: unknown norm kind ${v.kind}`);
      if (!Array.isArray(v.u) || v.u.length !== 2 || !isInt(v.u[0]) || !isInt(v.u[1]) || v.u[1] <= v.u[0])
        errs.push(`${path}: norm.u must be a half-open [a,b) with a<b`);
      break;
    case 'const':
      if (typeof v.id !== 'string' || !v.id) errs.push(`${path}: const.id must be a non-empty string`);
      break;
    case 'lit':
      if (typeof v.s !== 'string') errs.push(`${path}: lit.s must be a string`);
      if (v.pkind !== undefined && !PKINDS.includes(v.pkind)) errs.push(`${path}: bad pkind ${v.pkind}`);
      break;
    default:
      errs.push(`${path}: unknown value kind ${v.k}`);
  }
}

function checkValues(vs, path, errs) {
  if (!Array.isArray(vs) || vs.length === 0) return errs.push(`${path}: must be a non-empty array of values`);
  vs.forEach((v, i) => checkValue(v, `${path}[${i}]`, errs));
}

function checkExec(e, path, errs) {
  if (!isObj(e) || e.k !== 'exec') return errs.push(`${path}: expected an exec`);
  if (typeof e.op !== 'string' || !e.op) errs.push(`${path}.op: required`);
  if (e.pin !== undefined && typeof e.pin !== 'string') errs.push(`${path}.pin: must be a tool id`);
  if (!Array.isArray(e.mods)) errs.push(`${path}.mods: must be an array`);
  else e.mods.forEach((m, i) => {
    if (!isObj(m) || typeof m.mod !== 'string') return errs.push(`${path}.mods[${i}]: needs a mod id`);
    if (m.values !== undefined) checkValues(m.values, `${path}.mods[${i}].values`, errs);
  });
  if (!isObj(e.args)) errs.push(`${path}.args: must be an object`);
  else for (const [role, vs] of Object.entries(e.args)) checkValues(vs, `${path}.args.${role}`, errs);
  if (e.stderr !== undefined && !STDERR_MODES.includes(e.stderr)) errs.push(`${path}.stderr: bad mode ${e.stderr}`);
}

// Structural check only (no schema knowledge). Returns a list of error strings.
export function validateShape(ir) {
  const errs = [];
  if (!isObj(ir)) return ['program must be an object'];
  if (ir.v !== IR_VERSION) errs.push(`v must be ${IR_VERSION}`);
  if (!STATUSES.includes(ir.status)) errs.push(`unknown status ${ir.status}`);
  if (ir.status !== 'ok') {
    if (ir.body !== undefined) errs.push('an abstention has no body');
    if (ir.reason !== undefined && !OOS_REASONS.includes(ir.reason)) errs.push(`unknown reason ${ir.reason}`);
    if (ir.missing !== undefined && (!Array.isArray(ir.missing) || ir.missing.some((r) => typeof r !== 'string')))
      errs.push('missing must be an array of role names');
    return errs;
  }
  if (ir.cwd !== undefined) checkValue(ir.cwd, 'cwd', errs);
  const b = ir.body;
  if (!isObj(b) || b.k !== 'and' || !Array.isArray(b.parts)) return [...errs, 'body must be {k:"and", parts}'];
  if (b.parts.length < LIMITS.parts[0] || b.parts.length > LIMITS.parts[1])
    errs.push(`body.parts: ${b.parts.length} parts (allowed ${LIMITS.parts.join('..')})`);
  b.parts.forEach((p, pi) => {
    const pp = `body.parts[${pi}]`;
    if (!isObj(p) || p.k !== 'pipe' || !Array.isArray(p.stages)) return errs.push(`${pp}: must be {k:"pipe", stages}`);
    if (p.stages.length < LIMITS.stages[0] || p.stages.length > LIMITS.stages[1])
      errs.push(`${pp}.stages: ${p.stages.length} stages (allowed ${LIMITS.stages.join('..')})`);
    let eachCount = 0;
    p.stages.forEach((s, si) => {
      const sp = `${pp}.stages[${si}]`;
      if (!isObj(s)) return errs.push(`${sp}: must be an object`);
      if (s.k === 'exec') checkExec(s, sp, errs);
      else if (s.k === 'each') {
        eachCount++;
        if (si === 0) errs.push(`${sp}: each cannot be a first stage`);
        checkExec(s.exec, `${sp}.exec`, errs);
      } else if (s.k === 'macro') {
        if (!MACROS.includes(s.id)) errs.push(`${sp}: unknown macro ${s.id}`);
        if (s.args !== undefined) {
          if (!isObj(s.args) || Object.keys(s.args).some((k) => k !== 'paths')) errs.push(`${sp}.args: only paths`);
          else if (s.args.paths !== undefined) checkValues(s.args.paths, `${sp}.args.paths`, errs);
        }
      } else errs.push(`${sp}: unknown stage kind ${s.k}`);
    });
    if (eachCount > LIMITS.eachPerPipe) errs.push(`${pp}: more than ${LIMITS.eachPerPipe} each`);
  });
  return errs;
}

// ---------- JSON ----------

function sortKeys(x) {
  if (Array.isArray(x)) return x.map(sortKeys);
  if (isObj(x)) {
    const o = {};
    for (const k of Object.keys(x).sort()) if (x[k] !== undefined) o[k] = sortKeys(x[k]);
    return o;
  }
  return x;
}

// Deterministic JSON: keys sorted, undefined fields dropped, array order preserved.
export const toJSON = (ir) => JSON.stringify(sortKeys(ir));

export function fromJSON(input) {
  let ir;
  try { ir = typeof input === 'string' ? JSON.parse(input) : structuredClone(input); }
  catch (e) { throw new IRError(`invalid JSON: ${e.message}`); }
  const errs = validateShape(ir);
  if (errs.length) throw new IRError(`invalid IR:\n  ${errs.join('\n  ')}`);
  return ir;
}

// Structural equality (order-sensitive for arrays; run canon() first for set semantics).
export const equals = (a, b) => toJSON(a) === toJSON(b);
