// Model-side encodings of the typed IR (docs/IR.md §4), shared by export_targets.mjs and eval_pred.mjs
// so the Python trainer never re-implements IR logic.
//
//   buildVocab(schemas)              -> action vocabulary (D route, §4.4) + P-route head vocabularies
//   encodeActions(ir, label, reasons, schemas) -> [[action, u0, u1]]  (canonical order, §4.4)
//   decodeActions(actions, schemas)  -> IR (span/norm/const values, provenance kept)
//   pTargets(ir, schemas, vocab)     -> P-route targets (§4.3) or null when P cannot express the IR
//   assembleP(pred, schemas)         -> IR from P-head outputs
//
// Deviations from §4.4 (pilot trainer): an AMBIG status action exists because the dataset label set has
// `ambiguous`; `missing:<Role>` is not emitted (dataset reasons are free text); STDERR:* comes after a
// stage's values, right before its delimiter.

import { realize, opSchema, optionIndex, valueActions, NORM_KINDS, OOS_REASONS } from '../../ir/lib/index.js';

export const STATUS_ACTIONS = { ok: 'OK', not_shell: 'NOT_SHELL', out_of_scope: 'OOS', underspecified: 'UNDER', ambiguous: 'AMBIG' };
export const LABELS = ['ok', 'ambiguous', 'underspecified', 'out_of_scope', 'not_shell'];
const STATUS_OF = Object.fromEntries(Object.entries(STATUS_ACTIONS).map(([k, v]) => [v, k]));
const STRUCT = ['EOS', 'PIPE', 'AND', 'EACH', 'CWD', 'STDERR:discard', 'STDERR:merge', 'MACRO:freq'];
const PATH_SPEC = { type: 'Path' };

export const isPointer = (a) => a === 'SPAN' || a.startsWith('norm:');

export function buildVocab(schemas) {
  const ops = Object.keys(schemas.ops).sort();
  const mods = new Set(), roles = new Set(), consts = new Set(), pins = new Set(), valuedMods = new Set();
  for (const op of ops) {
    const tools = Object.keys(schemas.ops[op]);
    if (tools.length > 1) tools.forEach((t) => pins.add(t));
    for (const t of tools) {
      const s = schemas.ops[op][t];
      for (const p of s.positionals || []) roles.add(p.role);
      for (const o of s.options || []) {
        if (o.model !== 'predict') continue;
        mods.add(o.mod);
        if (o.value) { valuedMods.add(o.mod); valueActions(o.value).consts.forEach((c) => consts.add(c)); }
      }
      for (const p of s.positionals || []) valueActions(p).consts.forEach((c) => consts.add(c));
    }
  }
  const sorted = (s) => [...s].sort();
  const actions = ['PAD', 'BOS', ...Object.values(STATUS_ACTIONS), ...OOS_REASONS.map((r) => `reason:${r}`), ...STRUCT,
    ...ops.map((o) => `op:${o}`), ...sorted(pins).map((p) => `pin:${p}`), ...sorted(mods).map((m) => `mod:${m}`),
    ...sorted(roles).map((r) => `arg:${r}`), 'SPAN', ...NORM_KINDS.map((k) => `norm:${k}`), ...sorted(consts).map((c) => `const:${c}`)];
  const valueKinds = ['none', 'SPAN', ...NORM_KINDS.map((k) => `norm:${k}`), ...sorted(consts).map((c) => `const:${c}`)];
  const slots = ['@cwd', ...sorted(roles).map((r) => `arg:${r}`), ...sorted(valuedMods).map((m) => `mod:${m}`)];
  return {
    version: 1, schema_hash: schemas.hash, labels: LABELS, actions, pointer: actions.map(isPointer),
    p: { ops: ['none', ...ops], pins: ['none', ...sorted(pins)], mods: sorted(mods), stderr: ['none', 'discard', 'merge'], slots, value_kinds: valueKinds },
  };
}

const position = (si, isEach) => (isEach ? 'each' : si === 0 ? 'first' : 'filter');
const toolOf = (schemas, e, pos) => { const r = realize(schemas, e, pos); return r.error ? null : r.tool; };

function valueAction(v) {
  if (v.k === 'span') return ['SPAN', v.u[0], v.u[1]];
  if (v.k === 'norm') return [`norm:${v.kind}`, v.u[0], v.u[1]];
  if (v.k === 'const') return [`const:${v.id}`, -1, -1];
  throw new Error(`cannot encode value kind ${v.k}`);
}

function encodeExec(e, pos, schemas, out) {
  out.push([`op:${e.op}`, -1, -1]);
  if (e.pin) out.push([`pin:${e.pin}`, -1, -1]);
  const tool = toolOf(schemas, e, pos);
  const s = tool ? opSchema(schemas, tool, e.op) : null;
  const positionals = s?.positionals || [];
  const first = positionals.find((p) => p.arity[0] >= 1)?.role;
  if (first && e.args?.[first]?.length) e.args[first].forEach((v) => out.push(valueAction(v)));
  const idx = (m) => { const o = s?.options.find((x) => x.mod === m.mod); return o ? optionIndex(o) : 1e9; };
  for (const m of [...(e.mods || [])].sort((a, b) => idx(a) - idx(b))) {
    out.push([`mod:${m.mod}`, -1, -1]);
    (m.values || []).forEach((v) => out.push(valueAction(v)));
  }
  const order = positionals.map((p) => p.role);
  const roles = Object.keys(e.args || {}).filter((r) => r !== first && e.args[r]?.length)
    .sort((a, b) => (order.indexOf(a) + 1 || 1e9) - (order.indexOf(b) + 1 || 1e9) || (a < b ? -1 : 1));
  for (const r of roles) { out.push([`arg:${r}`, -1, -1]); e.args[r].forEach((v) => out.push(valueAction(v))); }
  if (e.stderr) out.push([`STDERR:${e.stderr}`, -1, -1]);
}

export function encodeActions(ir, label, reasons, schemas) {
  if (label !== 'ok') {
    const out = [[STATUS_ACTIONS[label], -1, -1]];
    if (label === 'out_of_scope') {
      const r = (reasons || []).map((x) => String(x).split(':')[0].trim()).find((x) => OOS_REASONS.includes(x));
      if (r) out.push([`reason:${r}`, -1, -1]);
    }
    out.push(['EOS', -1, -1]);
    return out;
  }
  const out = [['OK', -1, -1]];
  if (ir.cwd) { out.push(['CWD', -1, -1]); out.push(valueAction(ir.cwd)); }
  ir.body.parts.forEach((part, pi) => {
    if (pi > 0) out.push(['AND', -1, -1]);
    part.stages.forEach((st, si) => {
      if (si > 0) out.push([st.k === 'each' ? 'EACH' : 'PIPE', -1, -1]);
      if (st.k === 'macro') {
        out.push([`MACRO:${st.id}`, -1, -1]);
        if (st.args?.paths?.length) { out.push(['arg:paths', -1, -1]); st.args.paths.forEach((v) => out.push(valueAction(v))); }
      } else encodeExec(st.k === 'each' ? st.exec : st, position(si, st.k === 'each'), schemas, out);
    });
  });
  out.push(['EOS', -1, -1]);
  return out;
}

// ---------- decoding (D route) ----------

// Spec of the value a role / mod takes for the exec being decoded (null = unknown -> span as Path).
function roleSpec(schemas, e, pos, role) {
  const tool = toolOf(schemas, e, pos);
  return tool ? opSchema(schemas, tool, e.op)?.positionals?.find((p) => p.role === role) ?? null : null;
}
function modSpec(schemas, e, pos, mod) {
  const tool = toolOf(schemas, e, pos);
  return tool ? opSchema(schemas, tool, e.op)?.options?.find((o) => o.mod === mod)?.value ?? null : null;
}
function makeValue(a, u0, u1, spec) {
  if (a === 'SPAN') return { k: 'span', u: [u0, u1], as: spec?.type && spec.type !== 'Const' ? spec.type : 'Path' };
  if (a.startsWith('norm:')) return { k: 'norm', kind: a.slice(5), u: [u0, u1] };
  return { k: 'const', id: a.slice(6) };
}

// actions: [[name, u0, u1]] (a leading BOS and anything after EOS are ignored). Throws on malformed input.
export function decodeActions(actions, schemas) {
  const seq = actions.filter(([a]) => a !== 'BOS' && a !== 'PAD');
  const head = seq[0]?.[0];
  if (!head || !STATUS_OF[head]) throw new Error(`first action must be a status, got ${head}`);
  const status = STATUS_OF[head];
  if (status !== 'ok') {
    const ir = { v: 1, status };
    const r = seq.find(([a]) => a.startsWith('reason:'));
    if (r && status === 'out_of_scope') ir.reason = r[0].slice(7);
    return ir;
  }
  const ir = { v: 1, status: 'ok', body: { k: 'and', parts: [{ k: 'pipe', stages: [] }] } };
  let part = ir.body.parts[0], cur = null, curPos = 'first', target = null, nextEach = false, ended = false;
  const startStage = (st) => { part.stages.push(st); };
  for (let i = 1; i < seq.length && !ended; i++) {
    const [a, u0, u1] = seq[i];
    if (a === 'EOS') { ended = true; break; }
    if (a === 'CWD') { if (cur || part.stages.length) throw new Error('CWD after a stage'); target = { cwd: true }; continue; }
    if (a === 'AND') { part = { k: 'pipe', stages: [] }; ir.body.parts.push(part); cur = null; target = null; continue; }
    if (a === 'PIPE' || a === 'EACH') { if (!part.stages.length) throw new Error(`${a} before a stage`); nextEach = a === 'EACH'; cur = null; target = null; continue; }
    if (a.startsWith('STDERR:')) { if (!cur || cur.macro) throw new Error('STDERR outside an exec'); cur.e.stderr = a.slice(7); continue; }
    if (a === 'MACRO:freq') {
      const m = { k: 'macro', id: 'freq' };
      startStage(m); cur = { macro: m }; target = null; nextEach = false; continue;
    }
    if (a.startsWith('op:')) {
      const e = { k: 'exec', op: a.slice(3), mods: [], args: {} };
      const si = part.stages.length;
      curPos = position(si, nextEach);
      startStage(nextEach ? { k: 'each', exec: e } : e);
      nextEach = false;
      cur = { e };
      const first = (() => { const tool = toolOf(schemas, e, curPos); return tool ? opSchema(schemas, tool, e.op)?.positionals?.find((p) => p.arity[0] >= 1)?.role : null; })();
      target = first ? { role: first } : null;
      continue;
    }
    if (target?.cwd && (a === 'SPAN' || a.startsWith('norm:'))) { ir.cwd = makeValue(a, u0, u1, PATH_SPEC); target = null; continue; }
    if (!cur) throw new Error(`${a} outside a stage`);
    if (a.startsWith('pin:')) { if (cur.macro) throw new Error('pin on macro'); cur.e.pin = a.slice(4); continue; }
    if (a.startsWith('mod:')) { if (cur.macro) throw new Error('mod on macro'); const m = { mod: a.slice(4) }; cur.e.mods.push(m); target = { mod: m }; continue; }
    if (a.startsWith('arg:')) { target = { role: a.slice(4) }; continue; }
    if (a === 'SPAN' || a.startsWith('norm:') || a.startsWith('const:')) {
      if (!target) throw new Error(`value ${a} without a role`);
      if (cur.macro) { const args = (cur.macro.args ||= { paths: [] }); args.paths.push(makeValue(a, u0, u1, PATH_SPEC)); continue; }
      if (target.mod) { (target.mod.values ||= []).push(makeValue(a, u0, u1, modSpec(schemas, cur.e, curPos, target.mod.mod))); continue; }
      (cur.e.args[target.role] ||= []).push(makeValue(a, u0, u1, roleSpec(schemas, cur.e, curPos, target.role)));
      continue;
    }
    throw new Error(`unexpected action ${a}`);
  }
  if (!ended) throw new Error('no EOS');
  if (ir.body.parts.some((p) => !p.stages.length)) throw new Error('empty pipe');
  return ir;
}

// ---------- P route ----------

const slotValue = (v) => { const [a, u0, u1] = valueAction(v); return { kind: a, u: [u0, u1] }; };

// One exec stage in one part (cwd and stderr allowed); every slot holds at most one value.
export function pTargets(ir, schemas) {
  if (!ir || ir.status !== 'ok' || ir.body.parts.length !== 1 || ir.body.parts[0].stages.length !== 1) return null;
  const e = ir.body.parts[0].stages[0];
  if (e.k !== 'exec') return null;
  const slots = {};
  if (ir.cwd) slots['@cwd'] = slotValue(ir.cwd);
  for (const [r, vs] of Object.entries(e.args || {})) {
    if (!vs?.length) continue;
    if (vs.length > 1) return null;
    slots[`arg:${r}`] = slotValue(vs[0]);
  }
  for (const m of e.mods || []) {
    if (!m.values?.length) continue;
    if (m.values.length > 1) return null;
    slots[`mod:${m.mod}`] = slotValue(m.values[0]);
  }
  return { op: e.op, pin: e.pin || 'none', mods: (e.mods || []).map((m) => m.mod), stderr: e.stderr || 'none', slots };
}

// pred: {label, op, pin, mods[], stderr, slots: {slot: {kind, u}}} -> IR
export function assembleP(pred, schemas) {
  if (pred.label !== 'ok') {
    return { v: 1, status: pred.label }; // 'ambiguous' is a label, not an IR status: the caller treats it as abstention
  }
  if (!pred.op || pred.op === 'none') throw new Error('P: no op');
  const e = { k: 'exec', op: pred.op, mods: [], args: {} };
  if (pred.pin && pred.pin !== 'none') e.pin = pred.pin;
  const tool = toolOf(schemas, e, 'first');
  const s = tool ? opSchema(schemas, tool, e.op) : null;
  if (!s) throw new Error(`P: op ${pred.op} not realizable`);
  const slots = pred.slots || {};
  const val = (slot, spec) => { const v = slots[slot]; return v && v.kind !== 'none' ? makeValue(v.kind, v.u[0], v.u[1], spec) : null; };
  const supported = new Map(s.options.filter((o) => o.model === 'predict').map((o) => [o.mod, o]));
  for (const m of pred.mods || []) {
    const o = supported.get(m);
    if (!o) continue; // masked to the op's supported set (§4.3)
    const mi = { mod: m };
    if (o.value) { const v = val(`mod:${m}`, o.value); if (v) mi.values = [v]; }
    e.mods.push(mi);
  }
  for (const p of s.positionals || []) { const v = val(`arg:${p.role}`, p); if (v) e.args[p.role] = [v]; }
  if (pred.stderr && pred.stderr !== 'none') e.stderr = pred.stderr;
  const ir = { v: 1, status: 'ok', body: { k: 'and', parts: [{ k: 'pipe', stages: [e] }] } };
  const cwd = val('@cwd', PATH_SPEC);
  if (cwd) ir.cwd = cwd;
  return ir;
}
