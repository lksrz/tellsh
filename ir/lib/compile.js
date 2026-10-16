// compile(ir, env) — docs/IR.md §5: canon -> realize (§5.2) -> ArgvPlan (§5.3) -> render (§5.4).
// Pure and deterministic: the output depends only on (IR, request, shell, platform, tool versions,
// schemas). bash and zsh get identical bytes.
//
// ArgvPlan: { cwd?: string, parts: [{ stages: [{ argv: Word[], stderr?: 'discard'|'merge' }] }] }
// Word: { text, kind: 'literal'|'tilde_prefix'|'raw', prefix?, quote?: 'always', render? }
//   text   = the exact argv string the program receives;
//   raw    = compiler/schema syntax (binary, flags, '--', '{}', '+', '\(' ...), rendered verbatim
//            (`render` when it differs from text, e.g. text '(' render '\(');
//   prefix = a raw head of a literal word (eq/attached forms: '--since=', '-iTCP:'), rendered bare
//            before the quoted rest;
//   quote  = 'always': single-quoted even when bare-safe (Glob, sed script, JqPath).

import { canon, needsDotSlash } from './canon.js';
import { IRError, LIMITS, validateShape, UNSAFE_CHARS } from './ir.js';
import { realize, opSchema, stdoutOf, pipeIllegal, eachIllegal } from './schemas.js';
import { escapeRegex, hasRegexMeta } from './normalizers.js';

export const COMPILER_VERSION = 1;
export const SHELLS = ['bash', 'zsh'];
export const BARE_WORD = /^[A-Za-z0-9_@%+:,./-]+$/;
// UNSAFE_CHARS (§5.4) lives in ir.js, shared with the gate.
export { UNSAFE_CHARS };
// git options whose values git reads as patterns (literal under -F, ERE-escaped under -E)
const GIT_PATTERN_MODS = ['author', 'grep_message'];

class CompileError extends Error {
  constructor(message, label = 'gate_reject') {
    super(message);
    this.label = label;
  }
}
const fail = (msg, label) => { throw new CompileError(msg, label); };

// ---------- words and quoting (§5.4) ----------

export function quote(s, always = false) {
  if (!always && BARE_WORD.test(s)) return s;
  return `'${s.replace(/'/g, `'\\''`)}'`;
}

const raw = (text, render) => (render ? { text, kind: 'raw', render } : { text, kind: 'raw' });

function valueWord(body, { prefix = '', always = false, path = false } = {}) {
  if (UNSAFE_CHARS.test(body)) fail(`unsafe character in value ${JSON.stringify(body)}`, 'unsafe_value');
  const w = { text: prefix + body, kind: 'literal' };
  if (prefix) w.prefix = prefix;
  if (always) w.quote = 'always';
  if (path && !prefix && !always && (body === '~' || body.startsWith('~/'))) w.kind = 'tilde_prefix';
  return w;
}

export function renderWord(w) {
  if (w.kind === 'raw') return w.render ?? w.text;
  const prefix = w.prefix || '';
  const body = w.text.slice(prefix.length);
  if (w.kind === 'tilde_prefix') {
    if (body === '~') return '~';
    const rest = body.slice(2);
    return `~/${rest ? quote(rest) : ''}`;
  }
  return prefix + quote(body, w.quote === 'always');
}

export function renderPlan(plan) {
  const parts = plan.parts.map((p) => p.stages.map((st) => {
    let s = st.argv.map(renderWord).join(' ');
    if (st.stderr === 'discard') s += ' 2>/dev/null';
    else if (st.stderr === 'merge') s += ' 2>&1';
    return s;
  }).join(' | ')).join(' && ');
  return plan.cwd !== undefined ? `cd ${renderWord(valueWord(plan.cwd, { path: true }))} && ${parts}` : parts;
}

// ---------- environment ----------

function cmpVersion(a, b) {
  const pa = String(a).split('.').map((x) => parseInt(x, 10) || 0);
  const pb = String(b).split('.').map((x) => parseInt(x, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d) return d;
  }
  return 0;
}

// env.tools absent = no availability probe (pure compile); present = installed binaries -> version.
function checkTool(env, schema) {
  if (schema.platforms[env.platform] !== 'ok') fail(`${schema.binary} is not available on ${env.platform}`, 'env_unsupported');
  if (!env.tools) return;
  if (!(schema.binary in env.tools)) {
    fail(schema.tool === 'rg' ? "rg not installed; ask 'with grep'" : `${schema.binary} not installed`, 'env_unsupported');
  }
  const v = env.tools[schema.binary];
  if (typeof v === 'string' && v && schema.versions?.min && cmpVersion(v, schema.versions.min) < 0) {
    fail(`${schema.binary} ${v} is older than ${schema.versions.min}`, 'env_unsupported');
  }
}

function checkModVersion(env, schema, spec) {
  const v = env.tools?.[schema.binary];
  if (spec.min_version && typeof v === 'string' && v && cmpVersion(v, spec.min_version) < 0) {
    fail(`${schema.binary} ${spec.flag} needs ${spec.min_version} (have ${v})`, 'env_unsupported');
  }
}

// ---------- one exec -> argv ----------

// sctx: { input: Stream, pipedOut: bool, nul: bool, fold: Word[] | null }
function buildExec(env, e, position, sctx) {
  const reg = env.schemas;
  const r = realize(reg, e, position);
  if (r.error) fail(r.error, r.label);
  const schema = reg.tools[r.tool];
  const op = opSchema(reg, r.tool, e.op);
  checkTool(env, schema);
  const specOf = (id) => op.options.find((o) => o.mod === id);

  const values = new Map();
  for (const m of e.mods || []) {
    const spec = specOf(m.mod);
    if (!spec) fail(`mod "${m.mod}" not supported by ${r.tool} ${e.op}`);
    if (spec.model !== 'predict') fail(`mod "${m.mod}" is ${spec.model}: never part of the IR`);
    values.set(m.mod, m.values || []);
  }
  const predicted = [...values.keys()];
  for (const role of Object.keys(e.args || {})) {
    if (!op.positionals.some((p) => p.role === role)) fail(`role "${role}" not in ${r.tool} ${e.op}`);
  }
  const paths = e.args?.paths || [];

  if (position === 'filter') {
    const why = pipeIllegal(sctx.input, op, { hasFileOperands: paths.length > 0, consumerMods: predicted });
    if (why) fail(`${e.op} after ${sctx.input}: ${why}`);
  }
  if (position === 'each' && paths.length) fail('an each inner takes its paths from the producer');
  if (e.stderr) {
    if (position === 'each') fail('stderr mode on an each inner');
    if (!(op.stderr || []).includes(e.stderr)) fail(`stderr "${e.stderr}" not allowed for ${e.op}`);
  }

  // pattern kinds (§1): drives -F / -E and escaping of literal siblings of a regex
  const patPos = op.positionals.find((p) => p.type === 'Pattern');
  const posPats = patPos ? e.args?.pattern || [] : [];
  const gitPats = values.get('grep_message') || [];
  const gitAll = GIT_PATTERN_MODS.flatMap((m) => values.get(m) || []);
  const isRegex = (v) => v.pkind === 'regex';
  const derive = {
    pattern_literal_with_meta: () => !posPats.some(isRegex) && posPats.some((v) => hasRegexMeta(v.s)),
    pattern_regex: () => posPats.some(isRegex),
    git_patterns_literal_with_meta: () => !gitPats.some(isRegex) && gitAll.some((v) => hasRegexMeta(v.s)),
    git_pattern_regex: () => gitPats.some(isRegex),
    first_stage: () => position === 'first',
    endless_input_and_piped_output: () => sctx.input === 'endless' && sctx.pipedOut,
    each_transport: () => sctx.nul,
    each_inner: () => position === 'each',
    always: () => true,
  };
  const active = new Set(predicted);
  for (const spec of op.options) {
    if (spec.model === 'predict') continue;
    const f = derive[spec.derive];
    if (!f) throw new Error(`compile: unknown derive rule "${spec.derive}" (${r.tool} ${spec.mod})`);
    if (f()) active.add(spec.mod);
  }
  if (sctx.nul && !(op.nul && active.has(op.nul.mod))) fail(`${e.op} has no NUL variant`);

  const escapeLiterals = (dialect, on) => (v) => {
    if (isRegex(v) || !on) return v.s;
    return escapeRegex(v.s, dialect);
  };
  const posEsc = patPos ? escapeLiterals(patPos.dialect, posPats.some(isRegex)) : null;
  const gitEsc = escapeLiterals('posix_ere', active.has('extended_regex') && r.tool === 'git');

  // option value -> word
  const optWord = (spec, v) => {
    const vs = spec.value;
    if (vs.validator && !new RegExp(vs.validator, 'u').test(v.s)) fail(`value "${v.s}" fails the ${spec.mod} validator`);
    let s = v.s;
    if (vs.type === 'Const') {
      if (!(s in vs.enum)) fail(`const "${s}" not in ${spec.mod} enum`);
      s = vs.enum[s];
    } else if (r.tool === 'git' && GIT_PATTERN_MODS.includes(spec.mod)) s = gitEsc(v);
    if (vs.type !== 'Const' && !vs.prefix && !vs.template && spec.form === 'sep' && s.startsWith('-')) {
      fail(`copied value "${s}" starts with '-' in a separate-word option (${spec.mod})`, 'unsafe_value');
    }
    if (vs.template) s = vs.template.replace('{v}', s);
    s = (vs.prefix || '') + s;
    const pre = spec.form === 'eq' ? `${flagOf(spec)}=` : spec.form === 'attached' ? flagOf(spec) : '';
    return valueWord(s, { prefix: pre, always: vs.quote === 'always', path: vs.type === 'Path' && !pre });
  };
  const flagOf = (spec) => {
    const pl = spec.platform?.[env.platform];
    if (pl === 'absent') fail(`${r.tool} ${spec.mod} is not available on ${env.platform}`, 'env_unsupported');
    const alt = spec.alt_flag_when;
    if (alt && active.has(alt.mod)) return alt.flag;
    return pl?.flag ?? spec.flag;
  };
  const flagWords = (spec) => [].concat(flagOf(spec)).map((f) => raw(f));

  // options in schema order
  const opts = [];
  let clusterAt = -1;
  let cluster = '';
  let prune = false;
  for (const spec of op.options) {
    if (!active.has(spec.mod)) continue;
    checkModVersion(env, schema, spec);
    const vals = values.get(spec.mod) || [];
    switch (spec.form) {
      case 'none':
        flagOf(spec);
        break;
      case 'bool': {
        const f = flagOf(spec);
        if (schema.cluster_short && spec.model === 'predict' && /^-[A-Za-z0-9]$/.test(f)) {
          if (clusterAt < 0) { clusterAt = opts.length; opts.push(null); }
          cluster += f.slice(1);
        } else opts.push(...flagWords(spec));
        break;
      }
      case 'sep':
        if (!vals.length) fail(`mod "${spec.mod}" needs a value`);
        for (const v of vals) opts.push(...flagWords(spec), optWord(spec, v));
        break;
      case 'eq':
      case 'attached':
        if (!vals.length) fail(`mod "${spec.mod}" needs a value`);
        for (const v of vals) opts.push(optWord(spec, v));
        break;
      case 'word':
        if (!vals.length) fail(`mod "${spec.mod}" needs a value`);
        for (const v of vals) opts.push(optWord(spec, v));
        break;
      case 'group': {
        if (!vals.length) fail(`mod "${spec.mod}" needs a value`);
        const f = flagWords(spec);
        const names = vals.map((v) => optWord(spec, v));
        const alts = names.length === 1 ? [...f, names[0]]
          : [raw('(', '\\('), ...names.flatMap((n, i) => [...(i ? [raw('-o')] : []), ...f, n]), raw(')', '\\)')];
        if (spec.group.kind === 'prune') {
          opts.push(raw('-type'), raw('d'), ...alts, raw('-prune'), raw('-o'));
          prune = true;
        } else opts.push(...alts);
        break;
      }
      default:
        throw new Error(`compile: unknown form ${spec.form}`);
    }
  }
  if (clusterAt >= 0) opts[clusterAt] = raw(`-${cluster}`);

  // positionals in schema order, with dash safety (§5.3.4)
  const pos = [];
  let eoo = false;
  for (const p of op.positionals) {
    let vals = e.args?.[p.role] || [];
    let fixed = false;
    if (!vals.length && p.role === 'paths' && position === 'first') {
      if (op.first_stage_operands) { vals = op.first_stage_operands.map((s) => ({ k: 'lit', s })); fixed = true; }
      else if (op.no_operands === 'stdin') fail(`${e.op} as a first stage would read stdin (invariant 8)`);
    }
    if (!fixed && (vals.length < p.arity[0] || vals.length > p.arity[1])) {
      if (!(position === 'each' && p.role === 'paths')) fail(`role "${p.role}": ${vals.length} values (arity ${p.arity.join('..')})`);
    }
    const strs = vals.map((v) => {
      if (!fixed && p.validator && !new RegExp(p.validator, 'u').test(v.s)) fail(`value "${v.s}" fails the ${p.role} validator`);
      let s = p.type === 'Pattern' ? posEsc(v) : v.s;
      if (p.template) s = p.template.replace('{v}', s);
      return s;
    });
    const word = (s) => valueWord(s, { always: p.quote === 'always', path: p.type === 'Path' });
    const dash = strs.some((s) => s.startsWith('-'));
    if (p.leading_dash === 'dash_e') {
      const useE = dash || position === 'each' || (p.multi === 'dash_e' && strs.length > 1);
      for (const s of strs) pos.push(...(useE ? [raw('-e')] : []), word(s));
      continue;
    }
    if (p.leading_dash === 'reject' && dash) fail(`value starting with '-' for role "${p.role}"`, 'unsafe_value');
    if (strs.length && !eoo && ((p.leading_dash === 'eoo' && dash) || p.always_eoo)) { pos.push(raw('--')); eoo = true; }
    for (const s of strs) pos.push(word(p.leading_dash === 'dot_slash' && needsDotSlash(s) ? `./${s}` : s));
    if (strs.length && p.eoo_after && !eoo) { pos.push(raw('--')); eoo = true; }
  }
  if (position === 'each') pos.push(raw('--'));

  const head = [raw(schema.binary), ...op.argv_prefix.map((a) => raw(a))];
  let argv = op.layout === 'operands_first' ? [...head, ...pos, ...opts] : [...head, ...opts, ...pos];
  if (sctx.fold) argv.push(raw('-exec'), ...sctx.fold, raw('{}'), raw('+'));
  else if (prune) argv.push(raw('-print'));

  return { argv, tool: r.tool, op, stdout: stdoutOf(op, [...active], position === 'filter' ? sctx.input : 'lines') };
}

// ---------- program -> plan ----------

function compilePart(env, part, counter) {
  const out = [];
  const st = part.stages;
  let stream = 'none';
  let prevOp = null;
  for (let i = 0; i < st.length; i++) {
    const s = st[i];
    const pipedOut = i < st.length - 1;
    if (s.k === 'each') fail('each must directly follow an exec that produces paths');
    if (s.k === 'macro') {
      if (s.id !== 'freq') fail(`unknown macro ${s.id}`);
      const paths = s.args?.paths || [];
      if (i === 0 && !paths.length) fail('a first-stage freq needs a file (invariant 8)');
      if (prevOp === 'lines.sort') fail('freq after lines.sort');
      const pos = i === 0 ? 'first' : 'filter';
      const a = buildExec(env, { k: 'exec', op: 'lines.sort', mods: [], args: paths.length ? { paths } : {} }, pos, { input: stream, pipedOut: true });
      const b = buildExec(env, { k: 'exec', op: 'lines.uniq', mods: [{ mod: 'count' }], args: {} }, 'filter', { input: a.stdout, pipedOut: true });
      // fixed argv (§5.3.7): `sort -rn`, not the schema-order `sort -n -r`
      out.push({ argv: a.argv }, { argv: b.argv }, { argv: [raw('sort'), raw('-rn')] });
      stream = b.stdout;
      prevOp = 'macro';
      continue;
    }
    if (s.k !== 'exec') fail(`unknown stage kind ${s.k}`);
    const position = i === 0 ? 'first' : 'filter';
    const next = st[i + 1];
    let built;
    if (next?.k === 'each') {
      const plain = buildExec(env, s, position, { input: stream, pipedOut: true });
      const innerPiped = i + 1 < st.length - 1;
      const inner = buildExec(env, next.exec, 'each', { input: 'none', pipedOut: innerPiped });
      const innerMods = (next.exec.mods || []).map((m) => m.mod);
      const why = eachIllegal(plain.op, plain.stdout, inner.op, innerMods);
      if (why) fail(`each: ${why}`);
      if (plain.tool === 'find') {
        // In `-exec … {} +` the `{}` may only be the final argument: a value containing `{}` would be
        // substituted (or rejected) by find.
        if (inner.argv.some((w) => w.kind !== 'raw' && w.text.includes('{}'))) {
          fail('a value containing {} cannot be passed through find -exec', 'unsafe_value');
        }
        built = buildExec(env, s, position, { input: stream, pipedOut: innerPiped, fold: inner.argv });
        built.stdout = inner.stdout;
        out.push(stage(built.argv, s.stderr));
      } else {
        built = buildExec(env, s, position, { input: stream, pipedOut: true, nul: true });
        out.push(stage(built.argv, s.stderr));
        const xargs = [raw('xargs'), raw('-0'), ...(env.platform === 'linux_gnu' ? [raw('-r')] : []), ...inner.argv];
        out.push({ argv: xargs });
        built = { ...built, stdout: inner.stdout };
      }
      prevOp = next.exec.op;
      stream = built.stdout;
      i++;
      continue;
    }
    built = buildExec(env, s, position, { input: stream, pipedOut });
    out.push(stage(built.argv, s.stderr));
    stream = built.stdout;
    prevOp = s.op;
  }
  if (out.length > LIMITS.realPerPipe) fail(`${out.length} commands in one pipe (max ${LIMITS.realPerPipe})`);
  counter.n += out.length;
  return { stages: out };
}

function stage(argv, stderr) {
  return stderr ? { argv, stderr } : { argv };
}

function cwdText(s) {
  if (UNSAFE_CHARS.test(s)) fail('unsafe character in cwd', 'unsafe_value');
  if (!s) fail('empty cwd');
  if (s.startsWith('/') || s === '~' || s.startsWith('~/') || s.startsWith('./') || s.startsWith('../')) return s;
  return `./${s}`;
}

// F1 (taxonomy v2): a name exclusion (`-not -name`) on a request whose noun is files lists regular files only. A
// files.find exec with exclude_glob and no type gets type=f when the request says "file(s)" and names no
// directories / folders / links. Deterministic (depends on the IR and the request only); added before canon, so
// `canonical` carries the mod and decompile(compile(x)) round-trips to it.
const FILE_NOUN = /\bfiles?\b/i;
const NON_FILE_NOUN = /\b(dir(ector(y|ies))?s?|folders?|(sym)?links?|entries|everything)\b/i;
export function impliedFileType(ir, request) {
  if (typeof request !== 'string' || !FILE_NOUN.test(request) || NON_FILE_NOUN.test(request)) return ir;
  const fix = (e) => {
    if (e?.k !== 'exec' || e.op !== 'files.find') return e;
    const mods = e.mods || [];
    if (!mods.some((m) => m.mod === 'exclude_glob') || mods.some((m) => m.mod === 'type')) return e;
    return { ...e, mods: [...mods, { mod: 'type', values: [{ k: 'const', id: 'f' }] }] };
  };
  return {
    ...ir,
    body: {
      ...ir.body,
      parts: ir.body.parts.map((p) => ({ ...p, stages: p.stages.map((st) => (st.k === 'each' ? { ...st, exec: fix(st.exec) } : fix(st))) })),
    },
  };
}

// compile(ir, env) -> { plan, text, canonical } | { error, label }
export function compile(ir, env) {
  try {
    if (!env?.schemas) throw new Error('compile: env.schemas (registry) required');
    if (!SHELLS.includes(env.shell ?? 'bash')) fail(`shell ${env.shell} has no backend`, 'env_unsupported');
    if (!['linux_gnu', 'darwin_bsd'].includes(env.platform)) fail(`unknown platform ${env.platform}`, 'env_unsupported');
    if (!ir || ir.status !== 'ok') return { error: `abstention: ${ir?.status}`, label: ir?.status ?? 'gate_reject' };
    const shape = validateShape(ir);
    if (shape.length) fail(`invalid IR: ${shape.join('; ')}`);
    const c = canon(impliedFileType(ir, env.request), { schemas: env.schemas, request: env.request, pathExists: env.pathExists });
    const counter = { n: 0 };
    const plan = {};
    if (c.cwd) plan.cwd = cwdText(c.cwd.s);
    plan.parts = c.body.parts.map((p) => compilePart(env, p, counter));
    if (counter.n > LIMITS.realTotal) fail(`${counter.n} commands in total (max ${LIMITS.realTotal})`);
    return { plan, text: renderPlan(plan), canonical: c };
  } catch (e) {
    if (e instanceof CompileError || e instanceof IRError) return { error: e.message, label: e.label };
    throw e;
  }
}
