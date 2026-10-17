#!/usr/bin/env node
// Fresh held-out final test set from a new generator run, disjoint from a reference build (default v4).
//
//   node scripts/ir/build_final.mjs [--gen DIR[,DIR...]] [--ref v4] [--name final] [--ref-splits train] [--partial]
//
// 1. convert.mjs on each GEN dir (skipped when converted.jsonl is newer than items.jsonl). A dir is complete when
//    every planned call has an ok usage line; incomplete dirs are skipped unless --partial (then items.jsonl is
//    snapshotted into <dir>_partial/ and converted there, as build_v2.sh does);
// 2. same status filter as dedup.mjs, then the deterministic gold_rewrite rules (no adjudication overlay);
// 3. drop rows whose IR skeleton (dedup.mjs skeleton(), before or after the rewrite) occurs in a --ref-splits
//    split (default train: unseen by ref-trained models), or whose request is an exact / near duplicate
//    (dedup.mjs NearIndex, ref `near`) of any ref row (all splits); then exact + near dedup across all GEN dirs
//    (first dir wins), the ref per-skeleton cap and label-ratio cap (ref stats.json params);
// 4. writes build/ir/dataset/NAME/{test.jsonl,stats.json} and build/ir/targets/NAME/test.jsonl with the ref
//    vocab (export_targets.mjs --vocab), so models trained on ref targets can score it.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadSchemas } from '../../ir/lib/index.js';
import { normReq, skeleton, NearIndex, mulberry32 } from './dedup.mjs';
import { rewriteRow } from './gold_rewrite.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const readLines = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const bump = (m, k) => { m[k] = (m[k] || 0) + 1; };

// Every planned call has an ok usage line (as build_v2.sh complete()).
function complete(d) {
  const plan = JSON.parse(fs.readFileSync(path.join(d, 'plan.json'), 'utf8')).plan.length;
  const u = path.join(d, 'usage.jsonl');
  const ok = new Set(fs.existsSync(u) ? readLines(u).filter((x) => x.ok).map((x) => x.call) : []);
  return ok.size >= plan;
}

// Exclusion index over reference rows: ok skeletons of skelRows, exact normalized requests + near-dup index of rows.
export function refIndex(rows, near, skelRows = rows) {
  const skels = new Set(), exact = new Set(), nearIdx = new NearIndex(near);
  for (const r of skelRows) if (r.label === 'ok' && r.ir) skels.add(skeleton(r.ir));
  for (const r of rows) {
    const n = normReq(r.request);
    if (n && !exact.has(n)) { exact.add(n); nearIdx.add(n); }
  }
  return { skels, exact, near: nearIdx };
}

// Why a candidate must be excluded given the reference index (null = keep). skels: the row's skeleton(s).
export function refExclusion(ref, n, skels) {
  if (skels.some((k) => ref.skels.has(k))) return 'ref_skeleton';
  if (ref.exact.has(n)) return 'ref_exact';
  if (ref.near.hasDup(n)) return 'ref_near';
  return null;
}

function main() {
  const args = process.argv.slice(2);
  const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
  const GENS = opt('gen', 'build/ir/gen/haiku_final20k').split(','), REF = opt('ref', 'v4'), NAME = opt('name', 'final');
  const SPLITS = opt('ref-splits', 'train').split(','), PARTIAL = args.includes('--partial');
  const refDir = path.join(ROOT, 'build/ir/dataset', REF);
  const convs = [];
  for (const g of GENS) {
    let d = path.resolve(ROOT, g);
    if (!fs.existsSync(path.join(d, 'items.jsonl'))) { console.error(`${g}: no items.jsonl, skipped`); continue; }
    if (!complete(d)) {
      if (!PARTIAL) { console.error(`${g}: incomplete, skipped (use --partial)`); continue; }
      const pd = `${d}_partial`; fs.mkdirSync(pd, { recursive: true });
      const s = fs.readFileSync(path.join(d, 'items.jsonl'), 'utf8'); // whole lines only (generator may be mid-write)
      fs.writeFileSync(path.join(pd, 'items.jsonl'), s.slice(0, s.lastIndexOf('\n') + 1)); d = pd;
    }
    const conv = path.join(d, 'converted.jsonl');
    if (!(fs.existsSync(conv) && fs.statSync(conv).mtimeMs > fs.statSync(path.join(d, 'items.jsonl')).mtimeMs)) {
      const r = spawnSync(process.execPath, [path.join(ROOT, 'scripts/ir/convert.mjs'), d, '--examples', '0'], { stdio: ['ignore', 'ignore', 'inherit'] });
      if (r.status !== 0) throw new Error(`convert.mjs failed on ${d}`);
    }
    convs.push(conv);
  }
  if (!convs.length) throw new Error('no complete generator dirs');
  const p = JSON.parse(fs.readFileSync(path.join(refDir, 'stats.json'), 'utf8')).params;
  const refRows = (ss) => ss.flatMap((s) => readLines(path.join(refDir, `${s}.jsonl`)));
  const ref = refIndex(refRows(['train', 'dev', 'test']), p.near, refRows(SPLITS));
  const schemas = loadSchemas();
  const st = { gen: convs.map((f) => path.relative(ROOT, f)), ref: REF, ref_splits: SPLITS, params: { cap: p.cap, near: p.near, labelRatio: p.labelRatio, seed: p.seed },
    read: 0, read_per_gen: {}, dropped: {}, rewrite_applied: {}, rewrite_gate_rejected: {} };

  // status filter -> gold rewrite -> ref exclusion -> exact + near dedup across GEN dirs
  const rows = []; const seen = new Set(); const self = new NearIndex(p.near);
  for (const conv of convs) for (let j of readLines(conv)) {
    st.read++; bump(st.read_per_gen, path.basename(path.dirname(conv)));
    if (j.label === 'ok' ? !(j.status === 'accepted' && j.ir) : j.ir) { bump(st.dropped, `status:${j.label}:${j.status}`); continue; }
    const n = normReq(j.request); if (!n) { bump(st.dropped, 'empty_request'); continue; }
    const pre = j.label === 'ok' ? skeleton(j.ir) : null;
    const r = rewriteRow(j, schemas);
    r.applied.forEach((x) => bump(st.rewrite_applied, x)); r.rejected.forEach((x) => bump(st.rewrite_gate_rejected, x));
    j = r.row;
    const skel = j.label === 'ok' ? skeleton(j.ir) : null;
    const why = refExclusion(ref, n, [pre, skel].filter(Boolean));
    if (why) { bump(st.dropped, why); continue; }
    if (seen.has(n)) { bump(st.dropped, 'exact_dup'); continue; }
    seen.add(n);
    if (self.hasDup(n)) { bump(st.dropped, 'near_dup'); continue; }
    self.add(n); rows.push({ j, skel });
  }

  // per-skeleton cap (deterministic shuffle, as dedup.mjs), then label-ratio cap
  const rnd = mulberry32(p.seed);
  for (let i = rows.length - 1; i > 0; i--) { const k = Math.floor(rnd() * (i + 1)); [rows[i], rows[k]] = [rows[k], rows[i]]; }
  const perSkel = {}; const capped = [];
  for (const it of rows) {
    if (it.skel) { if ((perSkel[it.skel] || 0) >= p.cap) { bump(st.dropped, 'skeleton_cap'); continue; } bump(perSkel, it.skel); }
    capped.push(it);
  }
  const maxNon = Math.floor(p.labelRatio * capped.filter((x) => x.skel).length); const perLabel = {}; const out = [];
  for (const it of capped) {
    const lb = it.j.label;
    if (lb !== 'ok' && (perLabel[lb] || 0) >= maxNon) { bump(st.dropped, `label_cap:${lb}`); continue; }
    bump(perLabel, lb); out.push(it.j);
  }

  const dir = path.join(ROOT, 'build/ir/dataset', NAME); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'test.jsonl'), out.map((j) => {
    const rec = { request: j.request, label: j.label, os: j.os, ir: j.ir, command: j.command };
    if (j.label !== 'ok') rec.reasons = j.reasons;
    return JSON.stringify(rec) + '\n';
  }).join(''));
  Object.assign(st, { final: out.length, per_label: perLabel, skeletons: Object.keys(perSkel).length });

  const tdir = path.join(ROOT, 'build/ir/targets', NAME);
  const t = spawnSync(process.execPath, [path.join(ROOT, 'scripts/ir/export_targets.mjs'), '--data', dir, '--out', tdir,
    '--vocab', path.join(ROOT, 'build/ir/targets', REF, 'vocab.json')], { stdio: ['ignore', 'ignore', 'inherit'] });
  if (t.status !== 0) throw new Error('export_targets.mjs failed');
  st.targets = JSON.parse(fs.readFileSync(path.join(tdir, 'stats.json'), 'utf8')).test;
  fs.writeFileSync(path.join(dir, 'stats.json'), JSON.stringify(st, null, 1) + '\n');
  console.log(JSON.stringify({ read: st.read, final: st.final, dropped: st.dropped, per_label: perLabel, skeletons: st.skeletons, targets: st.targets }, null, 1));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
