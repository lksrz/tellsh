#!/usr/bin/env node
// Dedup + skeleton cap + label balance + skeleton-disjoint split for converted.jsonl files.
// See scripts/ir/README.md. Node >= 20, no dependencies.
//
//   node scripts/ir/dedup.mjs --name v1 [--cap 60] [--near 0.8] [--label-ratio 0.25] [--seed 1] \
//        [--overlay build/ir/relabel/v1_overlay.jsonl] [--source-cap N] \
//        build/ir/gen/haiku100k/converted.jsonl build/ir/grok/run10k/converted.jsonl=20000
//
// FILE=N caps that source at N rows after the status filter (deterministic shuffle); --source-cap N is the
// default cap for sources without one. --overlay applies apply_relabel.mjs output to non-ok rows (by
// normalized request): drop, relabel, or replace with the overlay's accepted ok row.
// Kept: label ok with status accepted (IR present), and non-ok labels (ir null). Dropped: ok items the
// converter rejected / mismatched / failed to decompile (conservative: never train on them).

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function parseArgs(argv) {
  const a = { name: '', cap: 60, near: 0.8, labelRatio: 0.25, seed: 1, inputs: [], overlay: '', sourceCap: 0 };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i], v = argv[i + 1];
    switch (k) {
      case '--name': a.name = v; i++; break;
      case '--cap': a.cap = +v; i++; break;
      case '--near': a.near = +v; i++; break;
      case '--label-ratio': a.labelRatio = +v; i++; break;
      case '--seed': a.seed = +v; i++; break;
      case '--overlay': a.overlay = v; i++; break;
      case '--source-cap': a.sourceCap = +v; i++; break;
      default: if (k.startsWith('--')) { console.error(`unknown arg ${k}`); process.exit(2); } a.inputs.push(k);
    }
  }
  if (!a.name || !a.inputs.length) { console.error('usage: dedup.mjs --name NAME [opts] FILE...'); process.exit(2); }
  return a;
}

export const normReq = (s) => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim().replace(/[.?!]+$/, '').trim();

// IR with values stripped: span/norm offsets and literal strings removed; ops, mods, kinds, consts kept.
export function skeleton(ir) {
  const strip = (o) => {
    if (Array.isArray(o)) return o.map(strip);
    if (o && typeof o === 'object') {
      const r = {};
      for (const [k, v] of Object.entries(o)) { if (k === 'u' || k === 's') continue; r[k] = strip(v); }
      return r;
    }
    return o;
  };
  return JSON.stringify(strip(ir.body));
}

const h32 = (s, seed) => { const b = crypto.createHash('md5').update(seed + '\u0000' + s).digest(); return b.readUInt32LE(0); };
const hhex = (s) => crypto.createHash('sha1').update(s).digest('hex');

// ---------- MinHash over word 3-shingles ----------
const NH = 64, BANDS = 16, ROWS = NH / BANDS;
const MASKS = Array.from({ length: NH }, (_, i) => h32('mask', i) | 0);
function shingles(s) {
  const w = s.split(' ').filter(Boolean);
  if (w.length < 3) return new Set([w.join(' ')]);
  const out = new Set(); for (let i = 0; i + 3 <= w.length; i++) out.add(w.slice(i, i + 3).join(' '));
  return out;
}
function fnv(s) { let h = 0x811c9dc5; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); } return h | 0; }
function minhash(sh) {
  const sig = new Int32Array(NH).fill(0x7fffffff);
  for (const x of sh) {
    const base = fnv(x);
    for (let i = 0; i < NH; i++) { const v = Math.imul(base ^ MASKS[i], 0x9e3779b1) ^ (base >>> 13); const p = v & 0x7fffffff; if (p < sig[i]) sig[i] = p; }
  }
  return sig;
}
function jaccard(a, b) { let n = 0; for (const x of a) if (b.has(x)) n++; return n / (a.size + b.size - n || 1); }

// Near-dup index over normalized requests: LSH band candidates, verified word-3-shingle Jaccard >= thr.
export class NearIndex {
  constructor(thr) { this.thr = thr; this.buckets = new Map(); this.shs = []; }
  #keys(sh) { const sig = minhash(sh); const ks = []; for (let b = 0; b < BANDS; b++) ks.push(b + ':' + Array.from(sig.subarray(b * ROWS, b * ROWS + ROWS)).join(',')); return ks; }
  hasDup(n) {
    const sh = shingles(n); const cand = new Set();
    for (const key of this.#keys(sh)) { const xs = this.buckets.get(key); if (xs) for (const x of xs) cand.add(x); }
    for (const c of cand) if (jaccard(sh, this.shs[c]) >= this.thr) return true;
    return false;
  }
  add(n) {
    const sh = shingles(n); const idx = this.shs.length; this.shs.push(sh);
    for (const key of this.#keys(sh)) { const xs = this.buckets.get(key); if (xs) xs.push(idx); else this.buckets.set(key, [idx]); }
  }
}

export function mulberry32(s) {
  return () => { s |= 0; s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const bump = (m, k, n = 1) => { m[k] = (m[k] || 0) + n; };

function ops(ir) {
  const out = []; const w = (o) => { if (Array.isArray(o)) o.forEach(w); else if (o && typeof o === 'object') { if (o.k === 'exec' && o.op) out.push(o.op); Object.values(o).forEach(w); } };
  w(ir.body); return out;
}

// Binaries in a rendered command (quoted text ignored): pipe/&& stages, xargs and -exec inner commands.
function cmdTools(cmd) {
  const unq = cmd.replace(/'[^']*'/g, "''"); const out = new Set();
  for (const seg of unq.split(/\|\s*|&&/)) {
    const w = seg.trim().split(/\s+/); if (!w[0] || w[0] === 'cd') continue; out.add(w[0]);
    if (w[0] === 'xargs') { const j = w.findIndex((x, i) => i > 0 && !x.startsWith('-')); if (j > 0) out.add(w[j]); }
  }
  for (const m of unq.match(/-exec\s+\S+/g) || []) out.add(m.split(/\s+/)[1]);
  return out;
}

function main() {
  const a = parseArgs(process.argv);
  const st = { inputs: a.inputs, params: { cap: a.cap, near: a.near, labelRatio: a.labelRatio, seed: a.seed, overlay: a.overlay || null, sourceCap: a.sourceCap },
    read: 0, dropped_status: {}, overlay: { ok: 0, relabel: 0, drop: 0 }, source_capped: 0, exact_dups: 0, near_dups: 0, skeleton_capped: 0, label_capped: {}, per_source: {} };
  const overlay = new Map();
  if (a.overlay) for (const l of fs.readFileSync(path.resolve(ROOT, a.overlay), 'utf8').split('\n')) if (l) { const o = JSON.parse(l); overlay.set(o.key, o); }
  const srcStat = (s) => (st.per_source[s] ??= { read: 0, ok_read: 0, ok_accepted: 0, overlay: 0, source_capped: 0, exact_dups: 0, near_dups: 0, skeleton_capped: 0, label_capped: 0, final: 0, final_label: {} });

  // 1. read + status filter + overlay + per-source cap + exact dedup
  const items = []; const seenExact = new Set(); const rs = mulberry32(a.seed + 7);
  for (const spec of a.inputs) {
    const m = spec.match(/^(.*)=(\d+)$/); const f = m ? m[1] : spec; const cap = m ? +m[2] : a.sourceCap;
    const src = path.basename(path.dirname(f)); const ss = srcStat(src); const rows = [];
    for (const l of fs.readFileSync(path.resolve(ROOT, f), 'utf8').split('\n')) {
      if (!l) continue; let j; try { j = JSON.parse(l); } catch { bump(st.dropped_status, 'bad_json'); continue; }
      st.read++; ss.read++; if (j.label === 'ok') ss.ok_read++;
      if (j.label === 'ok' ? !(j.status === 'accepted' && j.ir) : j.ir) { bump(st.dropped_status, `${j.label}:${j.status}`); continue; }
      const n = normReq(j.request); if (!n) { bump(st.dropped_status, 'empty_request'); continue; }
      if (j.label === 'ok') ss.ok_accepted++;
      const o = j.label !== 'ok' && overlay.get(n);
      if (o) {
        st.overlay[o.action]++; ss.overlay++;
        if (o.action === 'drop') continue;
        j = o.action === 'ok' ? { ...o.row } : { ...j, label: o.row.label };
      }
      rows.push({ j, n, src });
    }
    if (cap && rows.length > cap) {
      for (let i = rows.length - 1; i > 0; i--) { const k = Math.floor(rs() * (i + 1)); [rows[i], rows[k]] = [rows[k], rows[i]]; }
      ss.source_capped = rows.length - cap; st.source_capped += rows.length - cap; rows.length = cap;
    }
    for (const it of rows) {
      if (seenExact.has(it.n)) { st.exact_dups++; ss.exact_dups++; continue; }
      seenExact.add(it.n); items.push(it);
    }
  }

  // 2. near-dup removal (LSH candidates, verified Jaccard >= near; keep first)
  const near = new NearIndex(a.near); const kept = [];
  for (const it of items) {
    if (near.hasDup(it.n)) { st.near_dups++; srcStat(it.src).near_dups++; continue; }
    near.add(it.n); kept.push(it);
  }

  // 3. per-skeleton cap (ok items), shuffled deterministically so the cap keeps a varied subset
  const r = mulberry32(a.seed);
  for (let i = kept.length - 1; i > 0; i--) { const k = Math.floor(r() * (i + 1)); [kept[i], kept[k]] = [kept[k], kept[i]]; }
  const perSkel = {}; const capped = [];
  for (const it of kept) {
    if (it.j.label === 'ok') {
      it.skel = skeleton(it.j.ir);
      if ((perSkel[it.skel] || 0) >= a.cap) { st.skeleton_capped++; srcStat(it.src).skeleton_capped++; continue; }
      bump(perSkel, it.skel);
    }
    capped.push(it);
  }

  // 4. label balance: each non-ok label <= labelRatio * #ok
  const nOk = capped.filter((x) => x.j.label === 'ok').length;
  const maxNon = Math.floor(a.labelRatio * nOk); const perLabel = {}; const final = [];
  for (const it of capped) {
    const lb = it.j.label;
    if (lb !== 'ok' && (perLabel[lb] || 0) >= maxNon) { bump(st.label_capped, lb); srcStat(it.src).label_capped++; continue; }
    bump(perLabel, lb); final.push(it);
  }

  // 5. split: ok by skeleton hash (skeleton-disjoint), non-ok by request hash; ~90/5/5
  const splitOf = (key) => { const v = parseInt(hhex(key).slice(0, 8), 16) % 100; return v < 90 ? 'train' : v < 95 ? 'dev' : 'test'; };
  const out = { train: [], dev: [], test: [] };
  const by = { label: {}, tool: {}, op: {} }; const splitSkels = { train: new Set(), dev: new Set(), test: new Set() };
  for (const it of final) {
    const sp = it.j.label === 'ok' ? splitOf('skel:' + it.skel) : splitOf('req:' + it.n);
    if (it.skel) splitSkels[sp].add(it.skel);
    const rec = { request: it.j.request, label: it.j.label, os: it.j.os, ir: it.j.ir, command: it.j.command };
    if (it.j.label !== 'ok') rec.reasons = it.j.reasons;
    out[sp].push(JSON.stringify(rec));
    bump(by.label, `${sp}:${it.j.label}`); bump(by.label, it.j.label);
    const ss = srcStat(it.src); ss.final++; bump(ss.final_label, it.j.label);
    if (it.j.label === 'ok') {
      for (const op of new Set(ops(it.j.ir))) bump(by.op, op);
      for (const t of cmdTools(it.j.command)) bump(by.tool, t);
    }
  }
  for (const s of ['dev', 'test']) for (const k of splitSkels[s]) if (splitSkels.train.has(k)) throw new Error('skeleton leak');

  const dir = path.join(ROOT, 'build/ir/dataset', a.name); fs.mkdirSync(dir, { recursive: true });
  for (const [s, xs] of Object.entries(out)) fs.writeFileSync(path.join(dir, `${s}.jsonl`), xs.map((x) => x + '\n').join(''));
  const skelCounts = Object.values(perSkel).sort((x, y) => y - x);
  Object.assign(st, {
    after_exact: items.length, after_near: kept.length, after_cap: capped.length, final: final.length,
    splits: Object.fromEntries(Object.entries(out).map(([s, xs]) => [s, xs.length])),
    skeletons: { total: skelCounts.length, train: splitSkels.train.size, dev: splitSkels.dev.size, test: splitSkels.test.size,
      at_cap: skelCounts.filter((c) => c >= a.cap).length, singletons: skelCounts.filter((c) => c === 1).length },
    per_label: by.label, per_tool: by.tool, per_op: by.op,
  });
  fs.writeFileSync(path.join(dir, 'stats.json'), JSON.stringify(st, null, 1));
  console.log(JSON.stringify({ ...st, per_tool: undefined, per_op: undefined }, null, 1));
  console.log(`wrote ${dir}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
