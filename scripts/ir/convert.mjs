#!/usr/bin/env node
// Convert a generator output dir (items.jsonl from scripts/ir/grok_gen.mjs) into typed IR.
//
//   node scripts/ir/convert.mjs <dir> [--seed N] [--examples 15]
//
// For each `ok` item: decompile(command) -> lit IR; lift every lit value back to a span / norm /
// const against the request (provenance, docs/IR.md §4); gate(request, liftedIR) with the full
// round-trip (§5.5), so `accepted` means accepted by the real gate; compare the gate's command (the
// IR the gate settled on, with pkind) with the original (exact text, or canonical-equal: both
// decompile to the same IR).
// Non-ok items keep their label (status `not_ok`).
// Writes <dir>/converted.jsonl: {request, label, os, ir, command, status, reasons}, status one of
// accepted | rejected | decompile_error | mismatch | not_ok. Prints a summary.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  loadSchemas, decompile, gate, equals, segment, resolveValue,
  opSchema, realize, valueActions, span, norm, cnst,
} from '../../ir/lib/index.js';

const args = process.argv.slice(2);
const dir = args.find((a) => !a.startsWith('--'));
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? Number(args[i + 1]) : d; };
if (!dir) { console.error('usage: convert.mjs <dir> [--seed N] [--examples N]'); process.exit(2); }
const schemas = loadSchemas();
const PLATFORM = { linux: 'linux_gnu', darwin: 'darwin_bsd' };
const MAX_SPAN = 8;

// ---------- lift lit values to provenance values ----------

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
  for (const make of cands) {
    for (let len = 1; len <= Math.min(MAX_SPAN, n); len++) {
      for (let a = 0; a + len <= n; a++) {
        const b = a + len;
        if (!free(a, b)) continue;
        const c = make(a, b);
        if (same(c)) { used.push([a, b]); return c; }
      }
    }
  }
  throw new Error(`no provenance for ${spec.type} "${want}"`);
}

function lift(ir, request) {
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

// ---------- per item ----------

function convert(item) {
  const base = { request: item.request, label: item.label, os: item.os, ir: null, command: item.command ?? null };
  if (item.label !== 'ok') return { ...base, status: 'not_ok', reasons: item.reason ? [item.reason] : [] };
  const env = { schemas, shell: item.shell === 'zsh' ? 'zsh' : 'bash', platform: PLATFORM[item.os] || 'linux_gnu', request: item.request };
  const d = decompile(item.command, env);
  if (d.error) return { ...base, status: 'decompile_error', reasons: [`${d.reason}: ${d.error}`] };
  let ir;
  try { ir = lift(d.ir, item.request); } catch (e) {
    return { ...base, ir: d.ir, status: 'rejected', reasons: [`provenance: ${e.message}`] };
  }
  let g = gate(item.request, ir, env);
  // A pinned tool the request never names (generator used grep where the IR default is rg):
  // retry unpinned so the remaining checks still report; an accept then counts as a mismatch.
  let unpinned = false;
  if (!g.accept && g.reasons.some((r) => /^pin: pinned \S+ but the request does not name it/.test(r))) {
    for (const p of ir.body.parts) for (const st of p.stages) delete (st.k === 'each' ? st.exec : st).pin;
    g = gate(item.request, ir, env);
    unpinned = true;
  }
  if (!g.accept) return { ...base, ir, status: 'rejected', reasons: [`${g.label}: ${g.reasons.join(' / ')}`] };
  // The gate's command compiles g.ir (pkind set by the gate), never the lifted IR.
  const text = g.command;
  if (unpinned) return { ...base, ir, status: 'mismatch', reasons: [`pin dropped (tool not named in request): ${text}`] };
  if (text === item.command) return { ...base, ir, status: 'accepted', reasons: [] };
  const d2 = decompile(text, env);
  if (!d2.error && equals(d2.ir, d.ir)) return { ...base, ir, status: 'accepted', reasons: [`canonical-equal: ${text}`] };
  return { ...base, ir, status: 'mismatch', reasons: [`compiled: ${text}`, equals(g.ir, d.ir) ? 'same canon' : 'canon differs'] };
}

// ---------- summary ----------

// Aggregate a reason into a coarse key: drop quoted values, numbers and stage paths.
const reasonKey = (r) => r
  .replace(/"[^"]*"/g, '"…"').replace(/'[^']*'/g, "'…'")
  .replace(/\bp\d+(\.s\d+)?(\.[\w.[\]]+)?/g, 'S').replace(/\[\d+(,\d+)?\]/g, '[]').replace(/\d+/g, 'N')
  .replace(/^(pin dropped[^:]*):.*/, "$1").split(" / ")[0].slice(0, 110);

function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32); }

const items = readFileSync(join(dir, 'items.jsonl'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const rows = items.map((it) => { try { return convert(it); } catch (e) {
  return { request: it.request, label: it.label, os: it.os, ir: null, command: it.command ?? null, status: 'rejected', reasons: [`internal: ${e.message}`] };
} });
writeFileSync(join(dir, 'converted.jsonl'), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');

const count = (xs) => xs.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map());
const top = (m, k) => [...m].sort((a, b) => b[1] - a[1]).slice(0, k);
const ok = rows.filter((r) => r.label === 'ok');
console.log(`${dir}: ${rows.length} items, ${ok.length} ok`);
console.log('status:', Object.fromEntries(top(count(rows.map((r) => r.status)), 10)));
const bad = rows.filter((r) => ['rejected', 'decompile_error', 'mismatch'].includes(r.status));
console.log('\ntop reasons:');
for (const [k, v] of top(count(bad.map((r) => `${r.status} | ${reasonKey(r.reasons[0] || '')}`)), 25)) console.log(String(v).padStart(6), k);
console.log('\nper-tool acceptance (first word of command):');
const byTool = new Map();
for (const [i, r] of rows.entries()) {
  if (r.label !== 'ok') continue;
  const t = (items[i].tools || [])[0] || String(r.command).split(/\s+/)[0];
  const e = byTool.get(t) || [0, 0];
  e[1]++; if (r.status === 'accepted') e[0]++;
  byTool.set(t, e);
}
for (const [t, [a, n]] of [...byTool].sort((x, y) => y[1][1] - x[1][1])) console.log(`  ${t.padEnd(8)} ${a}/${n} (${((100 * a) / n).toFixed(1)}%)`);
const rand = rng(opt('seed', 1));
const pool = rows.filter((r) => r.status === 'rejected');
const k = Math.min(opt('examples', 15), pool.length);
console.log(`\n${k} random rejected:`);
for (let i = 0; i < k; i++) {
  const r = pool.splice(Math.floor(rand() * pool.length), 1)[0];
  console.log(`- ${r.request}\n    $ ${r.command}\n    ${r.reasons.join(' | ').slice(0, 300)}`);
}
