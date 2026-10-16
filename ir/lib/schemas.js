// Tool schemas: load + validate ir/schemas/*.json (docs/IR.md §2), index ops/options/mods/cues,
// realization (§5.2) and stream typing / legal compositions (§3).

import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { VTYPES, NORM_KINDS } from './ir.js';

export const DEFAULT_SCHEMA_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'schemas');

export const EFFECTS = ['read_fs', 'list_fs', 'read_vcs', 'read_proc', 'pure', 'net_read',
  'exec_project', 'write_fs', 'signal_proc'];
export const READ_ONLY_EFFECTS = ['read_fs', 'list_fs', 'read_vcs', 'read_proc', 'pure'];
export const STREAMS = ['none', 'lines', 'paths', 'paths0', 'json', 'bytes', 'endless'];
export const CUE_CLASSES = ['CASE', 'HIDDEN', 'IGNORED', 'FOLLOW_LINKS', 'SCOPE_TOP', 'WORD',
  'WHOLE_LINE', 'LINE_NUMBERS', 'CONTEXT', 'LIMIT', 'COUNT', 'RECENCY', 'SIZE', 'SORT', 'REVERSE',
  'LONG_FORMAT', 'HUMAN_SIZES', 'FOLLOW', 'FOLLOW_REDIRECTS', 'HEADERS', 'LISTEN', 'FORCE', 'REGEX',
  'ADJACENT', 'TIMEOUT'];
export const REALIZATIONS = ['default', 'pinned', 'stdin_filter'];
export const PLATFORMS = ['linux_gnu', 'darwin_bsd'];
const FORMS = ['bool', 'sep', 'eq', 'attached', 'word', 'group', 'none'];
const VALUE_FORMS = ['sep', 'eq', 'attached', 'word', 'group'];
const MODELS = ['predict', 'derived', 'compiler'];
const LEADING_DASH = ['eoo', 'dash_e', 'dot_slash', 'reject'];
const DIALECTS = ['rust_regex', 'posix_ere', 'posix_bre'];
const NO_OPERANDS = ['cwd', 'stdin', 'error', 'nothing'];
const TEMPLATE_TYPES = ['Int', 'Const', 'LineRange', 'Size'];

// Value actions by type when a spec declares no `norms` (§4.5). span = SPAN action allowed.
export const TYPE_ACTIONS = {
  Int: { span: false, norms: ['int'] },
  Size: { span: false, norms: ['size'] },
  Path: { span: true, norms: ['home_path'] },
  Pattern: { span: true, norms: ['starts_with', 'ends_with'] },
  Glob: { span: true, norms: ['ext_glob', 'substr_glob'] },
  Name: { span: true, norms: ['possessive'] },
  ScriptName: { span: true, norms: [] },
  ProcName: { span: true, norms: [] },
  Rev: { span: true, norms: ['rev_rel'] },
  Url: { span: true, norms: ['url_scheme'] },
  Date: { span: false, norms: ['git_date', 'iso_date'] },
  LineRange: { span: false, norms: ['line_range'] },
  Port: { span: false, norms: ['port'] },
  JqPath: { span: false, norms: ['jq_path'] },
  Const: { span: false, norms: [] },
};

export class SchemaError extends Error {
  constructor(problems) {
    super(`schema problems:\n  ${problems.map(formatProblem).join('\n  ')}`);
    this.name = 'SchemaError';
    this.problems = problems;
  }
}

export const formatProblem = (p) => `${p.file}: ${p.path}: ${p.msg}`;

// ---------- validation ----------

const isObj = (o) => o !== null && typeof o === 'object' && !Array.isArray(o);
const isStrArr = (a) => Array.isArray(a) && a.every((x) => typeof x === 'string');
const isPair = (a) => Array.isArray(a) && a.length === 2 && a.every(Number.isInteger) && a[0] <= a[1];

const TOOL_KEYS = ['schema_version', 'tool', 'binary', 'versions', 'platforms', 'cluster_short', 'ops'];
const OP_KEYS = ['realization', 'argv_prefix', 'gloss', 'effects', 'stdin', 'stdout', 'stdout_when',
  'nul', 'no_operands', 'first_stage_operands', 'layout', 'each_ok', 'stderr', 'positionals',
  'options', 'rules', 'excluded', 'notes'];
const POS_KEYS = ['role', 'type', 'arity', 'leading_dash', 'always_eoo', 'eoo_after', 'multi', 'norms',
  'template', 'quote', 'dialect', 'validator', 'note'];
const OPT_KEYS = ['mod', 'flag', 'form', 'value', 'model', 'derive', 'cue', 'polarity', 'direction',
  'alt_flag_when', 'group', 'same_argv_as', 'effects_add', 'stdout', 'platform', 'min_version', 'implied', 'note'];
const VAL_KEYS = ['type', 'range', 'enum', 'repeat', 'prefix', 'template', 'quote', 'validator',
  'dialect', 'norms', 'enum_cue'];

function unknownKeys(obj, allowed, path, add) {
  for (const k of Object.keys(obj)) if (!allowed.includes(k)) add(path, `unknown key "${k}"`);
}

// JS regex that Rust `regex` can also run: no lookaround, no back-references.
function checkValidator(re, path, add) {
  if (typeof re !== 'string') return add(path, 'validator must be a string');
  try { new RegExp(re, 'u'); } catch (e) { return add(path, `validator does not compile: ${e.message}`); }
  if (/\(\?[=!<]/.test(re) || /\\[1-9]/.test(re)) add(path, 'validator uses lookaround/back-references (not Rust-regex compatible)');
}

function checkNorms(norms, path, add) {
  if (norms === undefined) return;
  if (!isStrArr(norms) || norms.length === 0) return add(path, 'norms must be a non-empty string array');
  for (const n of norms) if (!NORM_KINDS.includes(n)) add(path, `unknown norm kind "${n}"`);
}

function checkTemplate(t, type, path, add) {
  if (t === undefined) return;
  if (typeof t !== 'string' || !t.includes('{v}')) add(path, 'template must contain {v}');
  if (!TEMPLATE_TYPES.includes(type)) add(path, `template not allowed on type ${type}`);
}

function checkPositional(p, path, add) {
  if (!isObj(p)) return add(path, 'must be an object');
  unknownKeys(p, POS_KEYS, path, add);
  if (typeof p.role !== 'string' || !p.role) add(path, 'role required');
  if (!VTYPES.includes(p.type)) add(path, `unknown type "${p.type}"`);
  if (!isPair(p.arity) || p.arity[0] < 0) add(path, 'arity must be [min,max] with 0<=min<=max');
  if (!LEADING_DASH.includes(p.leading_dash)) add(path, `bad leading_dash "${p.leading_dash}"`);
  for (const b of ['always_eoo', 'eoo_after']) if (p[b] !== undefined && typeof p[b] !== 'boolean') add(path, `${b} must be boolean`);
  if (p.multi !== undefined && p.multi !== 'dash_e') add(path, 'multi must be "dash_e"');
  if (p.quote !== undefined && p.quote !== 'always') add(path, 'quote must be "always"');
  if (p.dialect !== undefined && !DIALECTS.includes(p.dialect)) add(path, `bad dialect "${p.dialect}"`);
  if (p.validator !== undefined) checkValidator(p.validator, `${path}.validator`, add);
  checkNorms(p.norms, `${path}.norms`, add);
  checkTemplate(p.template, p.type, `${path}.template`, add);
  if (p.type === 'Pattern' && !p.dialect) add(path, 'Pattern positional needs a dialect');
}

function checkValueSpec(v, path, add) {
  if (!isObj(v)) return add(path, 'must be an object');
  unknownKeys(v, VAL_KEYS, path, add);
  if (v.type !== 'Const' && !VTYPES.includes(v.type)) add(path, `unknown type "${v.type}"`);
  if (v.type === 'Const') {
    if (!isObj(v.enum) || !Object.keys(v.enum).length || !Object.values(v.enum).every((x) => typeof x === 'string'))
      add(path, 'Const value needs a non-empty enum of strings');
  } else if (v.enum !== undefined) add(path, 'enum only on Const values');
  if (v.range !== undefined && !isPair(v.range)) add(path, 'range must be [min,max]');
  if (v.range !== undefined && !['Int', 'Port'].includes(v.type)) add(path, `range not meaningful on ${v.type}`);
  if (v.repeat !== undefined && (!isPair(v.repeat) || v.repeat[0] < 1)) add(path, 'repeat must be [min,max] with min>=1');
  if (v.prefix !== undefined && typeof v.prefix !== 'string') add(path, 'prefix must be a string');
  if (v.quote !== undefined && v.quote !== 'always') add(path, 'quote must be "always"');
  if (v.dialect !== undefined && !DIALECTS.includes(v.dialect)) add(path, `bad dialect "${v.dialect}"`);
  if (v.type === 'Pattern' && !v.dialect) add(path, 'Pattern value needs a dialect');
  if (v.validator !== undefined) checkValidator(v.validator, `${path}.validator`, add);
  checkNorms(v.norms, `${path}.norms`, add);
  checkTemplate(v.template, v.type, `${path}.template`, add);
  if (v.enum_cue !== undefined) {
    if (!isObj(v.enum_cue)) add(path, 'enum_cue must be an object');
    else for (const [k, c] of Object.entries(v.enum_cue)) {
      if (!v.enum || !(k in v.enum)) add(`${path}.enum_cue`, `"${k}" is not an enum id`);
      if (!CUE_CLASSES.includes(c)) add(`${path}.enum_cue`, `unknown cue class "${c}"`);
    }
  }
}

function checkOption(o, path, add) {
  if (!isObj(o)) return add(path, 'must be an object');
  unknownKeys(o, OPT_KEYS, path, add);
  if (typeof o.mod !== 'string' || !/^[a-z][a-z0-9_]*$/.test(o.mod)) add(path, `bad mod id "${o.mod}"`);
  if (!FORMS.includes(o.form)) add(path, `bad form "${o.form}"`);
  const flagOk = typeof o.flag === 'string' ? o.flag.length > 0 : isStrArr(o.flag) && o.flag.length > 0;
  if (o.form === 'none' || o.form === 'word') {
    if (o.flag !== undefined) add(path, `form ${o.form} takes no flag`);
  } else if (!flagOk) add(path, 'flag required (string or string[])');
  if (VALUE_FORMS.includes(o.form)) {
    if (o.value === undefined) add(path, `form ${o.form} needs a value spec`);
    else checkValueSpec(o.value, `${path}.value`, add);
  } else if (o.value !== undefined) add(path, `form ${o.form} takes no value`);
  if (!MODELS.includes(o.model)) add(path, `bad model "${o.model}"`);
  if (o.model === 'derived' && typeof o.derive !== 'string') add(path, 'derived mod needs a derive rule');
  // cue: one class, or a list (the mod needs any one of them and explains each of them)
  if (o.cue !== undefined) {
    for (const c of [].concat(o.cue)) if (!CUE_CLASSES.includes(c)) add(path, `unknown cue class "${c}"`);
  }
  // implied: {reason, when}: an implied default of the op, needing no request word (strict.js);
  // when: 'always' | 'piped' (the stage feeds another) | 'each' (it feeds an each stage) | 'after:op[.mod]' (the previous stage)
  // | 'before:op[.mod]' (the next stage), or a list
  if (o.implied !== undefined) {
    const ws = [].concat(o.implied?.when ?? []);
    if (!isObj(o.implied) || typeof o.implied.reason !== 'string' || !o.implied.reason || !ws.length
      || !ws.every((w) => w === 'always' || w === 'piped' || w === 'each' || /^(after|before):[a-z]+\.[a-z_]+(\.[a-z_]+)?$/.test(w)))
      add(path, 'implied must be {reason, when: always|piped|each|after:op[.mod]|before:op[.mod] (or a list)}');
  }
  if (o.polarity !== undefined && o.polarity !== 'neg') add(path, 'polarity must be "neg"');
  if (o.direction !== undefined && !['first', 'last'].includes(o.direction)) add(path, 'direction must be first|last');
  if ((o.form === 'group') !== (o.group !== undefined)) add(path, 'group spec required iff form "group"');
  if (o.group !== undefined && !(isObj(o.group) && ['prune', 'or'].includes(o.group.kind))) add(path, 'group.kind must be prune|or');
  if (o.alt_flag_when !== undefined && !(isObj(o.alt_flag_when) && typeof o.alt_flag_when.mod === 'string' && typeof o.alt_flag_when.flag === 'string'))
    add(path, 'alt_flag_when must be {mod, flag}');
  if (o.effects_add !== undefined && !(isStrArr(o.effects_add) && o.effects_add.every((e) => EFFECTS.includes(e)))) add(path, 'bad effects_add');
  if (o.stdout !== undefined && !STREAMS.includes(o.stdout)) add(path, `bad stdout "${o.stdout}"`);
  if (o.min_version !== undefined && typeof o.min_version !== 'string') add(path, 'min_version must be a string');
  if (o.platform !== undefined) {
    if (!isObj(o.platform)) add(path, 'platform must be an object');
    else for (const [k, v] of Object.entries(o.platform)) {
      if (!PLATFORMS.includes(k)) add(`${path}.platform`, `unknown platform "${k}"`);
      if (v !== 'absent' && !(isObj(v) && typeof v.flag === 'string')) add(`${path}.platform.${k}`, 'must be "absent" or {flag}');
    }
  }
}

function checkRule(r, i, modIds, roles, path, add) {
  const p = `${path}[${i}]`;
  const mod = (m) => { if (!modIds.has(m)) add(p, `unknown mod "${m}"`); };
  const role = (r2) => { if (!roles.has(r2)) add(p, `unknown role "${r2}"`); };
  const keys = Object.keys(r).sort().join('+');
  switch (keys) {
    case 'excl': case 'required': case 'stdin_excl':
      if (!isStrArr(r[keys]) || r[keys].length < (keys === 'excl' ? 2 : 1)) add(p, `${keys} needs a mod list`);
      else r[keys].forEach(mod);
      break;
    case 'any_of+requires': mod(r.requires); if (isStrArr(r.any_of) && r.any_of.length) r.any_of.forEach(mod); else add(p, 'any_of needs mods'); break;
    case 'arity+role_count+when': role(r.role_count); mod(r.when); if (!isPair(r.arity)) add(p, 'arity must be [min,max]'); break;
    case 'excl_role+role': mod(r.excl_role); role(r.role); break;
    case 'min+min_values+when': mod(r.min_values); mod(r.when); if (!Number.isInteger(r.min) || r.min < 1) add(p, 'min must be >=1'); break;
    case 'no_range_multi': role(r.no_range_multi); break;
    default: add(p, `unknown rule shape {${keys}}`);
  }
}

function checkOp(opId, o, schema, path, add) {
  if (!isObj(o)) return add(path, 'must be an object');
  unknownKeys(o, OP_KEYS, path, add);
  if (!/^[a-z]+\.[a-z_]+$/.test(opId)) add(path, `bad op id "${opId}"`);
  const reals = Array.isArray(o.realization) ? o.realization : [o.realization];
  if (!reals.length || !reals.every((r) => REALIZATIONS.includes(r))) add(path, `bad realization ${JSON.stringify(o.realization)}`);
  if (!isStrArr(o.argv_prefix)) add(path, 'argv_prefix must be a string array');
  if (typeof o.gloss !== 'string' || !o.gloss) add(path, 'gloss required');
  if (!isStrArr(o.effects) || !o.effects.length || !o.effects.every((e) => EFFECTS.includes(e))) add(path, `bad effects ${JSON.stringify(o.effects)}`);
  if (!isObj(o.stdin) || !isStrArr(o.stdin.accepts) || !['never', 'no_file_operands'].includes(o.stdin.when)) add(path, 'stdin must be {accepts, when: never|no_file_operands}');
  else {
    if (o.stdin.accepts.some((s) => !STREAMS.includes(s) || s === 'paths0' || s === 'none')) add(path, `bad stdin.accepts ${JSON.stringify(o.stdin.accepts)}`);
    if ((o.stdin.when === 'never') !== (o.stdin.accepts.length === 0)) add(path, 'stdin.when "never" iff accepts is empty');
  }
  if (o.stdout !== 'input' && !STREAMS.includes(o.stdout)) add(path, `bad stdout "${o.stdout}"`);
  if (!NO_OPERANDS.includes(o.no_operands)) add(path, `bad no_operands "${o.no_operands}"`);
  if (o.first_stage_operands !== undefined && !isStrArr(o.first_stage_operands)) add(path, 'first_stage_operands must be a string array');
  if (o.layout !== undefined && o.layout !== 'operands_first') add(path, 'layout must be "operands_first"');
  if (o.each_ok !== undefined && o.each_ok !== true) add(path, 'each_ok must be true or absent');
  if (o.stderr !== undefined && !(isStrArr(o.stderr) && o.stderr.every((s) => ['discard', 'merge'].includes(s)))) add(path, 'bad stderr list');
  for (const k of ['excluded', 'notes']) if (o[k] !== undefined && !isStrArr(o[k])) add(path, `${k} must be a string array`);

  const roles = new Set();
  if (!Array.isArray(o.positionals)) add(path, 'positionals must be an array');
  else o.positionals.forEach((p, i) => {
    checkPositional(p, `${path}.positionals[${i}]`, add);
    if (p && roles.has(p.role)) add(`${path}.positionals[${i}]`, `duplicate role "${p.role}"`);
    if (p) roles.add(p.role);
  });
  const modIds = new Set();
  if (!Array.isArray(o.options)) add(path, 'options must be an array');
  else o.options.forEach((opt, i) => {
    checkOption(opt, `${path}.options[${i}]`, add);
    if (opt && modIds.has(opt.mod)) add(`${path}.options[${i}]`, `duplicate mod "${opt.mod}"`);
    if (opt) modIds.add(opt.mod);
  });
  for (const opt of o.options || []) {
    if (opt.alt_flag_when && !modIds.has(opt.alt_flag_when.mod)) add(`${path}.options.${opt.mod}`, `alt_flag_when mod "${opt.alt_flag_when.mod}" not in op`);
    if (opt.same_argv_as !== undefined && !modIds.has(opt.same_argv_as)) add(`${path}.options.${opt.mod}`, `same_argv_as "${opt.same_argv_as}" not in op`);
    if (opt.form === 'bool' && schema.cluster_short && opt.model === 'predict' && !/^-[A-Za-z0-9]$/.test(opt.flag)) add(`${path}.options.${opt.mod}`, 'cluster_short tool with a non-short bool flag');
  }
  if (o.stdout_when !== undefined) {
    if (!Array.isArray(o.stdout_when)) add(path, 'stdout_when must be an array');
    else o.stdout_when.forEach((w, i) => {
      const wp = `${path}.stdout_when[${i}]`;
      if (!isObj(w) || !isStrArr(w.mods) || !w.mods.length) return add(wp, 'must be {mods, stdout}');
      w.mods.forEach((m) => { if (!modIds.has(m)) add(wp, `unknown mod "${m}"`); });
      if (!STREAMS.includes(w.stdout)) add(wp, `bad stdout "${w.stdout}"`);
    });
  }
  if (o.nul !== undefined) {
    const nm = isObj(o.nul) && o.options?.find((x) => x.mod === o.nul.mod);
    if (!nm) add(path, `nul.mod "${o.nul?.mod}" not in op`);
    else if (nm.model !== 'compiler') add(path, `nul mod "${nm.mod}" must be model "compiler"`);
  }
  if (Array.isArray(o.rules)) o.rules.forEach((r, i) => (isObj(r) ? checkRule(r, i, modIds, roles, `${path}.rules`, add) : add(`${path}.rules[${i}]`, 'must be an object')));
  else if (o.rules !== undefined) add(path, 'rules must be an array');

  if (o.each_ok) {
    if (!o.effects?.every((e) => e === 'read_fs' || e === 'list_fs')) add(path, 'each_ok op must have only read_fs/list_fs effects');
    const pp = o.positionals?.find((p) => p.role === 'paths');
    if (!pp || !(pp.arity?.[1] > 1)) add(path, 'each_ok op needs a paths positional with upper arity > 1');
    if (o.stdout === 'endless') add(path, 'each_ok op cannot produce endless output');
  }
  if (o.layout === 'operands_first' && !o.positionals?.some((p) => p.role === 'paths')) add(path, 'operands_first needs a paths positional');
}

// Validates one parsed schema. Returns a list of {file, path, msg}.
export function validateSchema(schema, file = '<schema>') {
  const problems = [];
  const add = (path, msg) => problems.push({ file, path, msg });
  if (!isObj(schema)) { add('$', 'schema must be an object'); return problems; }
  unknownKeys(schema, TOOL_KEYS, '$', add);
  if (schema.schema_version !== 1) add('$.schema_version', 'must be 1');
  if (typeof schema.tool !== 'string' || !schema.tool) add('$.tool', 'required');
  else if (file.endsWith('.json') && basename(file, '.json') !== schema.tool) add('$.tool', `"${schema.tool}" does not match file name`);
  if (typeof schema.binary !== 'string' || !schema.binary) add('$.binary', 'required');
  if (!isObj(schema.versions)) add('$.versions', 'must be an object');
  else {
    if (schema.versions.min !== undefined && !/^\d+(\.\d+)*$/.test(schema.versions.min)) add('$.versions.min', 'must be a dotted version');
    if (schema.versions.notes !== undefined && !isStrArr(schema.versions.notes)) add('$.versions.notes', 'must be a string array');
  }
  if (!isObj(schema.platforms)) add('$.platforms', 'must be an object');
  else for (const pl of PLATFORMS) if (!['ok', 'absent'].includes(schema.platforms[pl])) add(`$.platforms.${pl}`, 'must be ok|absent');
  if (schema.cluster_short !== undefined && typeof schema.cluster_short !== 'boolean') add('$.cluster_short', 'must be boolean');
  if (!isObj(schema.ops) || !Object.keys(schema.ops).length) add('$.ops', 'must be a non-empty object');
  else for (const [id, op] of Object.entries(schema.ops)) checkOp(id, op, schema, `$.ops.${id}`, add);
  return problems;
}

// ---------- registry ----------

function buildRegistry(schemas, hash) {
  const tools = {};
  const ops = {};
  const mods = new Set();
  const cues = {};
  let optionEntries = 0;
  for (const s of schemas) {
    tools[s.tool] = s;
    for (const [opId, o] of Object.entries(s.ops)) {
      (ops[opId] ??= {})[s.tool] = o;
      o.options.forEach((opt, index) => {
        optionEntries++;
        mods.add(opt.mod);
        for (const c of [].concat(opt.cue || [])) (cues[c] ??= []).push({ tool: s.tool, op: opId, mod: opt.mod });
        for (const c of Object.values(opt.value?.enum_cue || {})) (cues[c] ??= []).push({ tool: s.tool, op: opId, mod: opt.mod, enum: true });
        Object.defineProperty(opt, '_index', { value: index, enumerable: false });
      });
    }
  }
  const reg = {
    tools, ops, mods, cues, hash,
    stats: { tools: schemas.length, ops: Object.keys(ops).length,
      opSchemas: schemas.reduce((n, s) => n + Object.keys(s.ops).length, 0),
      mods: mods.size, optionEntries },
  };
  return Object.freeze(reg);
}

// Cross-schema checks (need the whole set).
function crossCheck(schemas) {
  const problems = [];
  const byOp = {};
  for (const s of schemas) for (const [opId, o] of Object.entries(s.ops)) (byOp[opId] ??= []).push({ tool: s.tool, o });
  for (const [opId, list] of Object.entries(byOp)) {
    const defaults = list.filter(({ o }) => [].concat(o.realization).includes('default'));
    if (defaults.length !== 1) problems.push({ file: list.map((x) => `${x.tool}.json`).join(','), path: `ops.${opId}`, msg: `exactly one tool must realize "${opId}" by default (found ${defaults.length})` });
  }
  return problems;
}

// Loads and validates every *.json in dir. strict (default): throws SchemaError listing all problems.
export function loadSchemas(dir = DEFAULT_SCHEMA_DIR, { strict = true } = {}) {
  const files = readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
  const problems = [];
  const schemas = [];
  const h = createHash('sha256');
  for (const f of files) {
    const raw = readFileSync(join(dir, f), 'utf8');
    h.update(f).update('\0').update(raw).update('\0');
    let s;
    try { s = JSON.parse(raw); } catch (e) { problems.push({ file: f, path: '$', msg: `invalid JSON: ${e.message}` }); continue; }
    const ps = validateSchema(s, f);
    problems.push(...ps);
    if (!ps.length) schemas.push(s);
  }
  problems.push(...crossCheck(schemas));
  if (strict && problems.length) throw new SchemaError(problems);
  const reg = buildRegistry(schemas, h.digest('hex'));
  return strict ? reg : { registry: reg, problems };
}

// ---------- lookups ----------

export function opSchema(reg, tool, op) {
  return reg.ops[op]?.[tool] ?? null;
}

export function optionSpec(reg, tool, op, mod) {
  return opSchema(reg, tool, op)?.options.find((o) => o.mod === mod) ?? null;
}

export const optionIndex = (spec) => spec._index;

export function positionalSpec(reg, tool, op, role) {
  return opSchema(reg, tool, op)?.positionals.find((p) => p.role === role) ?? null;
}

// Allowed value actions for a positional or an option value spec (§4.5).
export function valueActions(spec) {
  const type = spec.type;
  const base = TYPE_ACTIONS[type] ?? { span: false, norms: [] };
  const consts = type === 'Const' && !spec.norms ? Object.keys(spec.enum || {}) : [];
  return { span: base.span, norms: spec.norms ?? base.norms, consts };
}

// ---------- realization (§5.2) ----------

// position: 'first' | 'filter' (stdin filter, stage > 0) | 'each' (each inner).
// Returns { tool } or { error, label }.
export function realize(reg, exec, position) {
  const byTool = reg.ops[exec.op];
  if (!byTool) return { error: `unknown op "${exec.op}"`, label: 'gate_reject' };
  if (exec.pin) {
    return byTool[exec.pin] ? { tool: exec.pin } : { error: `op "${exec.op}" has no realization by ${exec.pin}`, label: 'gate_reject' };
  }
  const tools = Object.keys(byTool);
  if (tools.length === 1) return { tool: tools[0] };
  const want = position === 'filter' ? 'stdin_filter' : 'default';
  const hit = tools.find((t) => [].concat(byTool[t].realization).includes(want));
  return hit ? { tool: hit } : { error: `no ${want} realization for "${exec.op}"`, label: 'gate_reject' };
}

// ---------- streams (§3) ----------

// stdout stream of an op given its mod ids and its input stream ('input' passes it through).
// The most specific stdout_when entry whose mods are all present wins; an option-level `stdout`
// (on a present mod) overrides both (the last such mod in modIds wins).
export function stdoutOf(op, modIds, input = 'none') {
  const have = new Set(modIds);
  let best = null;
  for (const w of op.stdout_when || []) {
    if (w.mods.every((m) => have.has(m)) && (!best || w.mods.length > best.mods.length)) best = w;
  }
  let s = best ? best.stdout : op.stdout;
  for (const m of modIds) {
    const o = (op.options || []).find((x) => x.mod === m);
    if (o?.stdout) s = o.stdout;
  }
  return s === 'input' ? input : s;
}

// Can `op` read `stream` on stdin? paths is a subtype of lines; paths0 is compiler-only.
export function acceptsStream(op, stream) {
  if (op.stdin.when === 'never') return false;
  const acc = op.stdin.accepts;
  if (acc.includes(stream)) return true;
  return stream === 'paths' && acc.includes('lines');
}

// Pipe producer -> consumer legality (§3). hasFileOperands: consumer carries file operands.
// Returns null when legal, else a reason string.
export function pipeIllegal(producerStream, consumer, { hasFileOperands = false, consumerMods = [] } = {}) {
  if (producerStream === 'paths0') return 'paths0 is compiler-only';
  if (producerStream === 'none') return 'producer has no stdout';
  if (!acceptsStream(consumer, producerStream)) return `consumer does not accept ${producerStream}`;
  if (hasFileOperands) return 'a stdin consumer must have no file operands';
  const stdinExcl = (consumer.rules || []).filter((r) => r.stdin_excl).flatMap((r) => r.stdin_excl);
  const bad = consumerMods.find((m) => stdinExcl.includes(m));
  if (bad) return `mod "${bad}" is illegal on stdin`;
  return null;
}

// `each` legality (§3): producer must expose a nul variant and emit paths directly;
// inner must be each_ok and not endless with its mods. Returns null or a reason.
export function eachIllegal(producer, producerStream, inner, innerMods = []) {
  if (!producer.nul) return 'producer has no NUL variant';
  if (producerStream !== 'paths') return `each needs a paths stream (got ${producerStream})`;
  if (!inner.each_ok) return 'inner op is not each_ok';
  if (stdoutOf(inner, innerMods, 'none') === 'endless') return 'each inner cannot be endless';
  return null;
}

// Union of an op's effects plus any option effects_add for the given mods.
export function effectsOf(op, modIds = []) {
  const set = new Set(op.effects);
  for (const m of modIds) for (const e of op.options.find((o) => o.mod === m)?.effects_add || []) set.add(e);
  return [...set];
}
