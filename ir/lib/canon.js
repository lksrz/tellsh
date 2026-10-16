// canon(IR) — docs/IR.md §1 / §5.1. Exactly five steps, no semantic rewrites:
//   1. sort mods into the realized tool's schema order;
//   2. dedupe repeated values (and repeated mods);
//   3. replace provenance (span/norm/const) with value strings, keeping pkind -> {k:'lit', s, pkind?};
//   4. collapse mods declared same_argv_as in the realized tool into their target;
//   5. pkind regex without regex metacharacters -> literal.
// Step 3 also fixes the spelling of values the renderer would print identically: a leading `./` of
// a cwd is dropped (`cd ./X` is how every cwd renders), a `./` before a find root that needs it
// (`./-x`, `./(`) is dropped (dot_slash adds it back), and step 2 drops a first-stage `paths` equal
// to the op's first_stage_operands (`rg foo .` == `rg foo`: the compiler adds `.` itself).
// Pattern values without a pkind are taken as 'literal' (the gate sets pkind before compiling).
// canon is idempotent and accepts already-canonical ('lit') values, e.g. decompiler output.

import { IRError, lit, toJSON } from './ir.js';
import { realize, opSchema } from './schemas.js';
import { segment, spanText } from './units.js';
import { normalize, hasRegexMeta } from './normalizers.js';

const PATH_SPEC = { type: 'Path' };
export const CWD_SPEC = { type: 'Path', cwd: true };

// A find root that find would parse as an option or expression syntax: rendered as `./X` (dot_slash).
export const needsDotSlash = (s) => /^[-!(]/.test(s) || s === ')';

// ctx: { schemas (registry), request?: string, seg?: segment(request), pathExists?: fn }
export function canon(ir, ctx) {
  if (!ctx?.schemas) throw new Error('canon: ctx.schemas (registry) required');
  if (ir.status !== 'ok') {
    const out = { v: ir.v, status: ir.status };
    if (ir.reason) out.reason = ir.reason;
    if (ir.missing?.length) out.missing = [...new Set(ir.missing)].sort();
    return out;
  }
  const c = { ...ctx };
  if (!c.seg && typeof c.request === 'string') c.seg = segment(c.request);
  const out = { v: ir.v, status: 'ok' };
  if (ir.cwd) out.cwd = resolveValue(ir.cwd, CWD_SPEC, c, 'cwd');
  out.body = {
    k: 'and',
    parts: ir.body.parts.map((part, pi) => ({
      k: 'pipe',
      stages: part.stages.map((st, si) => {
        const path = `body.parts[${pi}].stages[${si}]`;
        if (st.k === 'exec') return canonExec(st, si === 0 ? 'first' : 'filter', c, path);
        if (st.k === 'each') return { k: 'each', exec: canonExec(st.exec, 'each', c, `${path}.exec`) };
        if (st.k === 'macro') {
          const m = { k: 'macro', id: st.id };
          if (st.args?.paths?.length) m.args = { paths: dedupe(st.args.paths.map((v, i) => resolveValue(v, PATH_SPEC, c, `${path}.args.paths[${i}]`))) };
          return m;
        }
        throw new IRError(`unknown stage kind ${st.k}`, { path });
      }),
    })),
  };
  return out;
}

function canonExec(e, position, ctx, path) {
  const r = realize(ctx.schemas, e, position);
  if (r.error) throw new IRError(r.error, { label: r.label, path });
  const tool = r.tool;
  const op = opSchema(ctx.schemas, tool, e.op);
  const out = { k: 'exec', op: e.op };
  if (e.pin) out.pin = e.pin;

  // steps 2+3: resolve and dedupe; merge repeated mod ids
  const byMod = new Map();
  for (const [i, m] of (e.mods || []).entries()) {
    const spec = op.options.find((o) => o.mod === m.mod);
    if (!spec) throw new IRError(`mod "${m.mod}" not supported by ${tool} ${e.op}`, { path: `${path}.mods[${i}]` });
    const vals = (m.values || []).map((v, j) => resolveValue(v, spec.value || {}, ctx, `${path}.mods[${i}].values[${j}]`));
    byMod.set(m.mod, [...(byMod.get(m.mod) || []), ...vals]);
  }
  // step 4: same_argv_as collapse (source values appended to the target in schema order)
  const order = (id) => op.options.findIndex((o) => o.mod === id);
  for (const id of [...byMod.keys()].sort((a, b) => order(a) - order(b))) {
    const target = op.options[order(id)].same_argv_as;
    if (!target) continue;
    const vals = byMod.get(id);
    byMod.delete(id);
    byMod.set(target, [...(byMod.get(target) || []), ...vals]);
  }
  // step 1: schema order
  out.mods = [...byMod.keys()].sort((a, b) => order(a) - order(b)).map((id) => {
    const vals = dedupe(byMod.get(id));
    return vals.length ? { mod: id, values: vals } : { mod: id };
  });

  out.args = {};
  for (const role of Object.keys(e.args || {}).sort()) {
    const spec = op.positionals.find((p) => p.role === role);
    if (!spec) throw new IRError(`role "${role}" not in ${tool} ${e.op}`, { path: `${path}.args` });
    const vals = dedupe(e.args[role].map((v, i) => resolveValue(v, spec, ctx, `${path}.args.${role}[${i}]`)));
    const fso = op.first_stage_operands;
    if (role === 'paths' && position === 'first' && fso && vals.map((v) => v.s).join('\0') === fso.join('\0')) continue;
    if (vals.length) out.args[role] = vals;
  }
  if (e.stderr) out.stderr = e.stderr;
  return out;
}

// Step 3 (+5): one value -> {k:'lit', s, pkind?}. spec: positional or option value spec.
export function resolveValue(v, spec, ctx, path = '') {
  let s;
  let pkind = v.pkind;
  switch (v.k) {
    case 'lit': s = v.s; break;
    case 'const':
      if (spec.enum && !(v.id in spec.enum)) throw new IRError(`const "${v.id}" not in enum`, { path });
      s = v.id;
      break;
    case 'span':
      if (!ctx.seg) throw new IRError('span value needs ctx.request', { path });
      try { s = spanText(ctx.seg, v.u); } catch (e) { throw new IRError(e.message, { path }); }
      break;
    case 'norm': {
      if (!ctx.seg) throw new IRError('norm value needs ctx.request', { path });
      let src;
      try { src = spanText(ctx.seg, v.u); } catch (e) { throw new IRError(e.message, { path }); }
      const r = normalize(v.kind, src, { dialect: spec.dialect, range: spec.range, request: ctx.seg.text, pathExists: ctx.pathExists });
      if (!r.ok) throw new IRError(`norm ${v.kind}("${src}"): ${r.reason}`, { label: r.label, path });
      s = r.value;
      if (r.pkind) pkind = r.pkind;
      break;
    }
    default: throw new IRError(`unknown value kind ${v.k}`, { path });
  }
  if (spec.cwd && s.startsWith('./') && s.length > 2) s = s.slice(2);
  if (spec.leading_dash === 'dot_slash' && s.startsWith('./') && needsDotSlash(s.slice(2))) s = s.slice(2);
  if (spec.type !== 'Pattern') return lit(s);
  if (!pkind || (pkind === 'regex' && !hasRegexMeta(s))) pkind = 'literal';
  return lit(s, pkind);
}

function dedupe(vals) {
  const seen = new Set();
  return vals.filter((v) => {
    const key = toJSON(v);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
