// Lift a decompiled lit IR back to provenance values against a request (docs/IR.md §4): every lit
// value becomes a span / norm / const that resolves to the same string. Used by the converter
// (scripts/ir/convert.mjs) and the tests; throws `no provenance for <Type> "<value>"`.
import { segment } from './units.js';
import { resolveValue } from './canon.js';
import { opSchema, realize, valueActions } from './schemas.js';
import { span, norm, cnst } from './ir.js';

const MAX_SPAN = 8;

function liftValue(v, spec, seg, used) {
  if (v.k !== 'lit') return v; // const ids come back from decompile already
  const acts = valueActions(spec);
  const n = seg.units.length;
  const want = v.s;
  const free = (a, b) => used.every(([x, y]) => b <= x || y <= a);
  const same = (cand) => {
    try { return resolveValue(cand, spec, { seg }).s === want; } catch { return false; }
  };
  if (acts.consts.includes(want)) return cnst(want);
  // span first (shortest, earliest, non-overlapping), then each allowed norm kind
  const cands = [];
  if (acts.span) cands.push((a, b) => span(a, b, spec.type));
  for (const k of acts.norms) cands.push((a, b) => norm(k, a, b));
  // within a length, a span spelled like an extension (".rst") before a bare word ("rst files")
  const dotted = (a) => (seg.units[a].t.startsWith('.') ? 0 : 1);
  for (const make of cands) {
    for (let len = 1; len <= Math.min(MAX_SPAN, n); len++) {
      const starts = [...Array(n - len + 1).keys()].sort((x, y) => dotted(x) - dotted(y) || x - y);
      for (const a of starts) {
        const b = a + len;
        if (!free(a, b)) continue;
        const c = make(a, b);
        if (same(c)) { used.push([a, b]); return c; }
      }
    }
  }
  throw new Error(`no provenance for ${spec.type} "${want}"`);
}

export function lift(schemas, ir, request) {
  const seg = segment(request);
  const used = [];
  const out = structuredClone(ir);
  if (out.cwd) out.cwd = liftValue(out.cwd, { type: 'Path', cwd: true }, seg, used);
  for (const part of out.body.parts) {
    part.stages.forEach((st, si) => {
      if (st.k === 'macro') {
        if (st.args?.paths) st.args.paths = st.args.paths.map((v) => liftValue(v, { type: 'Path' }, seg, used));
        return;
      }
      const e = st.k === 'each' ? st.exec : st;
      const position = st.k === 'each' ? 'each' : si === 0 ? 'first' : 'filter';
      const r = realize(schemas, e, position);
      if (r.error) throw new Error(r.error);
      const op = opSchema(schemas, r.tool, e.op);
      for (const m of e.mods || []) {
        if (!m.values) continue;
        const spec = op.options.find((o) => o.mod === m.mod).value;
        m.values = m.values.map((v) => liftValue(v, spec, seg, used));
      }
      for (const [role, vs] of Object.entries(e.args || {})) {
        const spec = op.positionals.find((p) => p.role === role);
        e.args[role] = vs.map((v) => liftValue(v, spec, seg, used));
      }
    });
  }
  return out;
}

