#!/usr/bin/env node
// Turn relabel_nonok.mjs proposals into an overlay for dedup.mjs (--overlay). Never modifies a dataset.
//
//   node scripts/ir/apply_relabel.mjs [--changes build/ir/relabel/v1_changes.jsonl] [--data build/ir/dataset/v1]
//        [--out build/ir/relabel/v1_overlay.jsonl]
//
// Per normalized request (dedup.mjs normReq), all change rows for it combined:
//   - any `flag` row                         -> drop (uncertain label, removed from the dataset);
//   - new_label ok with gate_status accepted -> ok row; IR re-derived here by decompile + lift + gate
//     (as convert.mjs, strict: no unpin retry); not re-accepted -> drop;
//   - non-ok -> non-ok                       -> applied only when the consistency pass and the model
//     propose the same label (model row with also_consistency + a consistency row); otherwise ignored;
//   - conflicting proposals                  -> drop.
// os comes from the dataset row the change points at ({split, i}). Writes one line per key:
//   {key, action: 'ok' | 'relabel' | 'drop', old_label, row?: {request, label, os, ir, command, status, reasons}}
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSchemas, decompile, gate, equals } from '../../ir/lib/index.js';
import { lift } from '../../ir/lib/lift.js';
import { normReq } from './dedup.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const CHANGES = path.resolve(ROOT, opt('changes', 'build/ir/relabel/v1_changes.jsonl'));
const DATA = path.resolve(ROOT, opt('data', 'build/ir/dataset/v1'));
const OUT = path.resolve(ROOT, opt('out', 'build/ir/relabel/v1_overlay.jsonl'));
const schemas = loadSchemas();
const PLATFORM = { linux: 'linux_gnu', darwin: 'darwin_bsd' };
const readLines = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));

const gold = {};
const goldRow = (split, i) => (gold[split] ??= readLines(path.join(DATA, `${split}.jsonl`)))[i];

// decompile + lift + gate; returns the converted row or null.
function toOk(request, command, os) {
  const env = { schemas, shell: 'bash', platform: PLATFORM[os] || 'linux_gnu', request };
  const d = decompile(command, env);
  if (d.error) return null;
  let ir; try { ir = lift(schemas, d.ir, request); } catch { return null; }
  const g = gate(request, ir, env);
  if (!g.accept) return null;
  if (g.command !== command) { const d2 = decompile(g.command, env); if (d2.error || !equals(d2.ir, d.ir)) return null; }
  return { request, label: 'ok', os, ir, command, status: 'accepted', reasons: ['relabel'] };
}

const byKey = new Map();
for (const c of readLines(CHANGES)) {
  const k = normReq(c.request);
  if (!byKey.has(k)) byKey.set(k, []);
  byKey.get(k).push(c);
}

const stats = { change_rows: 0, keys: byKey.size, ok: 0, relabel: 0, drop: 0, ignored: 0, drop_reasons: {}, relabel_by: {}, ok_by_old: {} };
const bump = (m, k) => { m[k] = (m[k] || 0) + 1; };
const out = [];
for (const [key, cs] of byKey) {
  stats.change_rows += cs.length;
  const old = cs[0].old_label;
  const g = goldRow(cs[0].split, cs[0].i);
  const os = g && g.request === cs[0].request ? g.os : 'linux';
  const drop = (why) => { stats.drop++; bump(stats.drop_reasons, why); out.push({ key, action: 'drop', old_label: old }); };
  const labels = new Set(cs.map((c) => c.new_label));
  if (labels.has('flag')) { drop('flag'); continue; }
  if (labels.size > 1) { drop('conflict'); continue; }
  const [nl] = labels;
  if (nl === 'ok') {
    const c = cs.find((x) => x.gate_status === 'accepted' && x.command);
    const row = c && toOk(c.request, c.command, os);
    if (!row) { drop('ok_not_accepted'); continue; }
    stats.ok++; bump(stats.ok_by_old, old);
    out.push({ key, action: 'ok', old_label: old, row });
    continue;
  }
  const agree = cs.some((x) => x.source === 'consistency') && cs.some((x) => x.source === 'model' && x.also_consistency);
  if (!agree) { stats.ignored++; continue; }
  stats.relabel++; bump(stats.relabel_by, `${old}->${nl}`);
  out.push({ key, action: 'relabel', old_label: old, row: { label: nl } });
}
fs.writeFileSync(OUT, out.map((r) => JSON.stringify(r)).join('\n') + '\n');
console.log(JSON.stringify(stats));
console.log(`wrote ${path.relative(ROOT, OUT)} (${out.length} keys)`);
