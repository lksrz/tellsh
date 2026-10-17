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
import { escapeRegex, hasRegexMeta, LANG_EXTRA } from './normalizers.js';
import { segment, spanText } from './units.js';

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
    pattern_literal_with_meta: () => !posPats.some(isRegex) && posPats.some((v) => hasRegexMeta(v.s) || requestSaysLiteral(env.request)),
    pattern_regex: () => posPats.some(isRegex),
    git_patterns_literal_with_meta: () => !gitPats.some(isRegex) && gitAll.some((v) => hasRegexMeta(v.s) || (gitPats.length && requestSaysLiteral(env.request))),
    git_pattern_regex: () => gitPats.some(isRegex),
    first_stage: () => position === 'first',
    endless_input_and_piped_output: () => sctx.input === 'endless' && sctx.pipedOut,
    each_transport: () => sctx.nul,
    each_inner: () => position === 'each',
    names_without_header: () => ['name_only', 'name_status'].some((m) => values.has(m)) && !values.has('oneline'),
    names_only_requested: () => ['name_only', 'name_status'].some((m) => values.has(m)) && !values.has('oneline') && !values.has('format')
      && (requestWantsNamesOnly(env.request) || (!sctx.pipedOut && requestWantsNamesOnlyR3(env.request)))
      && !(!sctx.pipedOut && NAMES_ONLY_EXTRA_CUE.test(env.request)),
    multi_file_sorted: () => !requestWantsFileNames(env.request)
      && ((position === 'first' && searchFeedsSort(paths, sctx.next, values)) || ((position === 'first' || paths.length > 0) && bareMatchesMultiFile(paths, values, env.request))),
    merges_with_file_lists: () => values.has('merges_only') && ['name_only', 'name_status', 'stat'].some((m) => values.has(m)),
    all_entries_requested: () => !values.has('hidden') && requestWantsAllEntries(env.request, paths),
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
    built = buildExec(env, s, position, { input: stream, pipedOut, next });
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

// F1 (taxonomy v2, widened v3): a request whose noun is files lists regular files only. A files.find exec with no
// type (whatever its name / time / size filters) gets type=f when the request says "file(s)" and names no
// directories / folders / links / entries / everything / anything.
// Deterministic (depends on the IR and the request only); added before canon, so `canonical` carries the mod and
// decompile(compile(x)) round-trips to it. scripts/ir/equiv.mjs keeps -type f significant on the same test.
export const FILE_NOUN = /\bfiles?\b/i;
export const NON_FILE_NOUN = /\b(dir(ector(y|ies))?s?|folders?|(sym)?links?|entries|entry|everything|anything|sockets?|fifos?|pipes?)\b/i;
export const requestWantsFiles = (request) => typeof request === 'string' && FILE_NOUN.test(request) && !NON_FILE_NOUN.test(request);

// v5 round 3 fix b: a find whose every name / iname value is file-like (an extension: *.css, cache.java) lists files
// even when the request does not say "files", unless it mentions directories / folders.
const DIR_MENTION = /\b(dirs?|directory|directories|subdirector(y|ies)|folders?|subfolders?)\b/i;
const FILE_LIKE_NAME = /\.(?!d$)[A-Za-z0-9]+$/;
const nameText = (v, request) => (v?.k === 'norm' ? (v.kind === 'ext_glob' ? '*.ext' : '') : patText(v, request));
export function namesAreFileLike(e, request) {
  const vals = (e.mods || []).filter((m) => GLOB_MODS.includes(m.mod)).flatMap((m) => m.values || []);
  return vals.length > 0 && vals.every((v) => FILE_LIKE_NAME.test(nameText(v, request).split('/').pop()));
}

// "anything / any entry named X", symlinks / links: any type, so no -type f from file-like names (round-3 review).
// strict_cover.js find_any_type uses the same words.
export const FIND_ANY_TYPE_WORDS = ['anything named', 'anything called', 'everything named', 'everything called', 'anything matching',
  'everything matching', 'anything with', 'everything with', 'any entry', 'any entries', 'every entry', 'all entries'];
const ANY_TYPE_CUE = new RegExp(`\\b(${FIND_ANY_TYPE_WORDS.join('|')}|anything|entries|whatever|items named|symlinks?|links?)\\b`, 'i');
export function impliedFileType(ir, request) {
  const files = requestWantsFiles(request);
  const noDirs = typeof request === 'string' && !DIR_MENTION.test(request);
  if (!files && !noDirs) return ir;
  const fix = (e) => {
    if (e?.k !== 'exec' || e.op !== 'files.find') return e;
    const mods = e.mods || [];
    if (mods.some((m) => m.mod === 'type')) return e;
    if (!files && (ANY_TYPE_CUE.test(request) || !namesAreFileLike(e, request))) return e;
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

// F7 (restored): -o for a piped search whose request is about the matches themselves. A text.search exec (no
// -l / -L / -c / --count-matches / context / -v / -m) feeding sort / uniq / a macro (freq) gets only_matching when the
// request has a match / occurrence / extract cue and does not talk about lines; and, in any position, when it says
// "only matching" / "only the matches" / "print only matches" / "each (X) match" (EACH_MATCH_CUE). Line pipelines ("lines with X | sort -u") and head /
// wc -l stay as predicted (wc -l keeps its own schema `implied`). Added before canon like impliedFileType, so
// `canonical` carries -o; strict.js accepts it through the `implied.when: "match_cue"` form (same predicate).
export const ONLY_MATCH_CUE = /\b(only|just)[- ](the )?(matching|matched|match(es)?)\b(?! (files?|file ?names|lines?|paths?)\b)|\bprint only match|\bonly[- ]matches\b/i;
export const MATCH_CUE = /\b(matches|matched|occurrences?|extract(s|ed|ing)?|each match|every match)\b/i;
const LINE_CUE = /\blines?\b/i;
// "each / every (X) match" asks for the matches one by one, piped or not ("print each TODO match and its line number");
// "each matching line" / "every line with a match" stay line-level
export const EACH_MATCH_CUE = /\b(each|every)( (?!(lines?|files?|paths?|rg|grep|ripgrep)\b)[^\s,;]+){0,2} match(es)?\b/i;
const O_BLOCK = ['count_matches', 'files_with_matches', 'files_without_match', 'count', 'context', 'before', 'after', 'invert', 'max_count'];
const O_DOWNSTREAM = ['lines.sort', 'lines.uniq'];
// stage: a text.search exec; next: the stage after it in the pipe (or undefined)
export function matchCueImpliesO(stage, next, request) {
  if (typeof request !== 'string' || stage?.k !== 'exec' || stage.op !== 'text.search') return false;
  if ((stage.mods || []).some((m) => O_BLOCK.includes(m.mod))) return false;
  if (ONLY_MATCH_CUE.test(request) || EACH_MATCH_CUE.test(request)) return true;
  const sorted = next && (next.k === 'macro' || (next.k === 'exec' && O_DOWNSTREAM.includes(next.op)));
  return !!sorted && MATCH_CUE.test(request) && !LINE_CUE.test(request);
}

export function impliedOnlyMatching(ir, request) {
  if (typeof request !== 'string') return ir;
  return {
    ...ir,
    body: {
      ...ir.body,
      parts: ir.body.parts.map((p) => ({ ...p, stages: p.stages.map((st, i) => {
        if (!matchCueImpliesO(st, p.stages[i + 1], request) || (st.mods || []).some((m) => m.mod === 'only_matching')) return st;
        return { ...st, mods: [...(st.mods || []), { mod: 'only_matching' }] };
      }) })),
    },
  };
}

// F8 (v4): a multi-file search (no path = cwd recursive, a directory-like operand, a glob, several paths) prefixes
// each line with `path:`, so its matches fed to sort / uniq / freq would be unique per file. The schema's derived
// no_filename (rg -I / grep -h) drops the prefix unless the search lists / counts files or the request asks for them.
// Derived (never in the IR): decompile strips it, so round-trips are unaffected.
const FILENAME_CUE = /\b(file ?names?|filenames?|paths?|which files?|in which files?|per file|each file|every file|by file)\b/i;
// v5 fix 6: "drop / omit / without / no / hide / strip / leave out (the) file names" negates the mention, it does not ask for them
export const DROP_NAMES_CUE = /\b(drop(ping)?|omit(ting)?|without|no|hide|hiding|strip(ping)?|leave out|leaving out|remove|removing|exclude|excluding|suppress(ing)?|skip(ping)?)( the| any| all)? (file ?names?|filenames?)\b/gi;
export const requestWantsFileNames = (request) => typeof request === 'string' && FILENAME_CUE.test(request.replace(DROP_NAMES_CUE, ' '));
const NF_BLOCK = ['files_with_matches', 'files_without_match', 'count', 'count_matches', 'with_filename'];
// a single operand counts as one file when its basename has an extension, is a dotfile (not a known dot dir)
// or is a well-known extension-less file; anything else reads as a directory (rg / grep -r recurse into it)
export const DOT_DIRS = new Set(['.git', '.github', '.config', '.ssh', '.cache', '.local', '.vscode', '.idea', '.cargo', '.npm', '.venv', '.terraform']);
export const BARE_FILES = /^(Procfile|Makefile|GNUmakefile|Dockerfile|Containerfile|Gemfile|Rakefile|Vagrantfile|Jenkinsfile|Brewfile|Podfile|Justfile|LICENSE|README|CHANGELOG|AUTHORS|NOTICE|VERSION|CODEOWNERS|syslog|messages|auth|kern|dmesg|hosts|passwd|group|fstab|crontab)$/i;
const looksLikeFile = (v) => {
  if (v?.k === 'lit' || v?.k === 'span' || v?.k === 'norm') {
    const s = String(v.s ?? '');
    if (/[*?[]/.test(s) || s === '.' || s === '..' || s.endsWith('/')) return false;
    const base = s.split('/').pop();
    if (/^\./.test(base)) return !DOT_DIRS.has(base);
    return /\.[^/]+$/.test(base) || BARE_FILES.test(base);
  }
  return false;
};
// v5 round 3 fix a: "nothing else" / "only the matched text" / "just the matches" over a multi-file search asks
// for the bare matches, so the `path:` prefix goes too (in any position).
const BARE_MATCH_CUE = /\bnothing else\b|\b(only|just) (the )?(match(ed|ing)? text|matches)\b/i;
export function bareMatchesMultiFile(paths, values, request) {
  if (typeof request !== 'string' || !BARE_MATCH_CUE.test(request) || NF_BLOCK.some((m) => values.has(m))) return false;
  return paths.length !== 1 || values.has('name_glob') || !looksLikeFile(paths[0]);
}
export function searchFeedsSort(paths, next, values) {
  if (NF_BLOCK.some((m) => values.has(m))) return false;
  const sorted = next && (next.k === 'macro' || (next.k === 'exec' && O_DOWNSTREAM.includes(next.op)));
  if (!sorted) return false;
  return paths.length !== 1 || values.has('name_glob') || !looksLikeFile(paths[0]);
}

// git log --name-only / --name-status --format= (derived no_header) only when the request asks for just the file names
// and not for the commits / history / per-commit grouping; git show derives it unconditionally (one commit).
export const requestWantsNamesOnly = (request) => typeof request === 'string'
  && /\b(only|just)( the)?( changed)? (file ?names|filenames|names of the (changed )?files)\b/i.test(request)
  && !/\b(log|history|who|per commit|each commit|commits? (by|on|touching|that|in|since|from|until))\b/i.test(request);
// v5 round 3 fix d: "just / only (the) (changed) file names" drops the headers even when commits are mentioned,
// unless the request groups the names per commit. Unpiped logs only (piped logs keep requestWantsNamesOnly).
export const requestWantsNamesOnlyR3 = (request) => typeof request === 'string'
  && (/\b(only|just)( the)?( changed)? (file ?names|filenames|names of the (changed )?files)\b/i.test(request)
    // v5 round 4 fix 6: the reversed word order ("file names only")
    || /\b(changed )?(file ?names|filenames) only\b/i.test(request))
  && !/\b(who|per commit|each commit|every commit|with (the |their )?commits?|commits? and (the |their )?(changed )?files|which commits?)\b/i.test(request)
  && !NAMES_ONLY_EXTRA_CUE.test(request);
// round-3 review: names-only drops the headers, so not when the request also wants authors / dates / subjects / hashes
const NAMES_ONLY_EXTRA_CUE = /\b(authors?|authored|dates?|dated|relative|when|who|subjects?|messages?|hash(es)?|sha)\b/i;

// v4 fix 2: a literal cue ("literal match", "fixed string", "verbatim") always renders -F (rg / grep) or
// --fixed-strings (git --grep), not only when the pattern has a metacharacter. Derived: decompile strips it.
export const LITERAL_CUE = /\b(literal(ly)?|fixed[- ]strings?|verbatim|as a plain string|not (a |as a )?regex)\b/i;
export const requestSaysLiteral = (request) => typeof request === 'string' && LITERAL_CUE.test(request);

// v4 fix 2: `ls -a` (derived all) when the request asks for every entry of a directory and no hidden (-A) mod is
// predicted: ". and ..", "dot entries", "all entries", or "all of <path>" right before a path operand.
const ALL_ENTRIES_CUE = /(^|\s)\. and \.\.(\s|$)|\b(all|every) (the )?entries\b|\bdot entries\b/i;
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export function requestWantsAllEntries(request, paths = []) {
  if (typeof request !== 'string') return false;
  if (ALL_ENTRIES_CUE.test(request)) return true;
  return paths.some((v) => typeof v?.s === 'string' && new RegExp(`\\ball of (the )?${reEsc(v.s)}(?!\\s+(files?|dirs?|folders?|directories|entries)\\b)(\\s|[,.;]|$)`, 'i').test(request));
}

// v4 (lexicon multi-extension): a language with several extensions ("elixir files") names all of them. The ext_glob
// norm resolves to the first (*.ex, normalizers.js LANG_EXT); compile appends the others as literal globs (find name_glob becomes any_name).
// Request-implied like impliedFileType: strict.js sees the predicted IR, the round-trip reference applies the same step.
const GLOB_MODS = ['name_glob', 'any_name'];
export function impliedLangExts(ir, request) {
  if (typeof request !== 'string') return ir;
  let seg = null;
  const extraOf = (v) => {
    if (v?.k !== 'norm' || v.kind !== 'ext_glob') return [];
    seg ??= segment(request);
    let src;
    try { src = spanText(seg, v.u).toLowerCase(); } catch { return []; }
    return LANG_EXTRA[src] || [];
  };
  const fix = (e) => {
    if (e?.k !== 'exec' || !(e.mods || []).length) return e;
    let changed = false;
    const mods = e.mods.map((m) => {
      if (!GLOB_MODS.includes(m.mod)) return m;
      const extra = (m.values || []).flatMap(extraOf).map((x) => `*.${x}`)
        .filter((g) => !(m.values || []).some((v) => v.k === 'lit' && v.s === g));
      if (!extra.length) return m;
      changed = true;
      const mod = e.op === 'files.find' && m.mod === 'name_glob' ? 'any_name' : m.mod;
      return { ...m, mod, values: [...m.values, ...extra.map((g) => ({ k: 'lit', s: g }))] };
    });
    if (!changed || mods.filter((m) => m.mod === 'any_name').length > 1) return e;
    return { ...e, mods };
  };
  return {
    ...ir,
    body: {
      ...ir.body,
      parts: ir.body.parts.map((p) => ({ ...p, stages: p.stages.map((st) => (st.k === 'each' ? { ...st, exec: fix(st.exec) } : fix(st))) })),
    },
  };
}

// v5 fix 1: a git log printed as is (last stage of its pipe) for a request about commits lists them --oneline (the
// judge rubric: "commits ... mean --oneline or -n"). Not when the log is piped (wc / head / grep count lines), already
// shaped (format / stat / patch / name lists / graph / --date) or the request asks for the full multi-line entry or
// for authors / dates. Request-implied like impliedFileType: strict.js sees the predicted IR, the round-trip
// reference applies the same step; scripts/ir/equiv.mjs treats unpiped --oneline as insignificant.
const COMMIT_CUE = /\bcommits\b/i;
const ONE_COMMIT_CUE = /\b(last|latest|newest|most recent|that|this|single) commit\b(?! (messages?|subjects?|bod(y|ies)))/i;
const FULL_LOG_CUE = /\b(full|complete|entire|whole|details?|detailed|body|bodies|(messages?|commit) bod(y|ies)|verbose|patch(es)?|diffs?|log lines|lines of (the )?(log|history|output)|how many lines|authors?|authored|emails?|dates?|dated|when|times?|timestamps?|who)\b/i;
const ONELINE_BLOCK = ['oneline', 'format', 'pretty', 'stat', 'shortstat', 'numstat', 'patch', 'name_only', 'name_status', 'graph', 'date_format', 'no_header'];
export const requestImpliesOneline = (request) => typeof request === 'string' && COMMIT_CUE.test(request) && !ONE_COMMIT_CUE.test(request) && !FULL_LOG_CUE.test(request);
// v5 round 2 fix 4: a git log piped straight into a line filter (grep / rg) for "commits" / "commit lines" greps one
// line per commit (train gold: 46 `git log --oneline | grep` vs 1 plain for these cues). Not for wc / head / tail.
const PIPED_COMMIT_CUE = /\b(commits|commit lines)\b/i;
// a downstream pattern on the full-log layout (commit / Author: / Date: headers, indented body) needs the plain log
const FULL_LOG_PATTERN = /\^\s*(commit|author|date|merge)\b|author:|date:|commit \[0-9a-f|^\^(\s| |\\s)/i;
const patText = (v, request) => {
  if (typeof v?.s === 'string') return v.s;
  if (v?.k !== 'span') return '';
  try { return spanText(segment(request), v.u); } catch { return ''; }
};
const fullLogPattern = (st, request) => (st?.args?.pattern || []).some((v) => FULL_LOG_PATTERN.test(patText(v, request)));
export const requestImpliesPipedOneline = (request) => typeof request === 'string' && PIPED_COMMIT_CUE.test(request)
  && !ONE_COMMIT_CUE.test(request) && !FULL_LOG_CUE.test(request);
export function impliedOneline(ir, request) {
  const last = requestImpliesOneline(request), piped = requestImpliesPipedOneline(request);
  if (!last && !piped) return ir;
  return {
    ...ir,
    body: {
      ...ir.body,
      parts: ir.body.parts.map((p) => ({ ...p, stages: p.stages.map((st, i) => {
        if (st?.k !== 'exec' || st.op !== 'git.log') return st;
        const next = p.stages[i + 1];
        if (!(i === p.stages.length - 1 ? last : piped && next?.k === 'exec' && next.op === 'text.search' && !fullLogPattern(next, request))) return st;
        if ((st.mods || []).some((m) => ONELINE_BLOCK.includes(m.mod))) return st;
        return { ...st, mods: [...(st.mods || []), { mod: 'oneline' }] };
      }) })),
    },
  };
}

// every request-implied mod compile adds before canon (gate.js builds its round-trip reference the same way)
export const impliedMods = (ir, request) => impliedOneline(impliedLangExts(impliedOnlyMatching(impliedFileType(ir, request), request), request), request);

// compile(ir, env) -> { plan, text, canonical } | { error, label }
export function compile(ir, env) {
  try {
    if (!env?.schemas) throw new Error('compile: env.schemas (registry) required');
    if (!SHELLS.includes(env.shell ?? 'bash')) fail(`shell ${env.shell} has no backend`, 'env_unsupported');
    if (!['linux_gnu', 'darwin_bsd'].includes(env.platform)) fail(`unknown platform ${env.platform}`, 'env_unsupported');
    if (!ir || ir.status !== 'ok') return { error: `abstention: ${ir?.status}`, label: ir?.status ?? 'gate_reject' };
    const shape = validateShape(ir);
    if (shape.length) fail(`invalid IR: ${shape.join('; ')}`);
    const c = canon(impliedMods(ir, env.request), { schemas: env.schemas, request: env.request, pathExists: env.pathExists });
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
