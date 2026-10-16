#!/usr/bin/env node
// Training data for the learned verifier (ml/ir/verifier.py): (request, os, command) pairs labelled correct / wrong.
// Deterministic. Keeps the dataset split (no skeleton leakage: pairs of a split come from that split's rows only).
//
//   node scripts/ir/make_negatives.mjs [--data build/ir/dataset/v1] [--out build/ir/verifier/v1] [--k 4]
//       [--splits train,dev,test] [--limit-train N] [--errors DUMP.jsonl:SPLIT ...] [--span-cap 0.25]
//       [--kfold build/ir/verifier/v1/kfold.jsonl [--kfold-select-fold 0]]
//
// Positives: the gate-compiled gold command of every ok row. Negatives equivalent to gold (equiv.mjs: -type f,
// --oneline, rg -o|wc -l, curl -S without -s, tail -F without a rotation cue) are dropped. Negatives: up to K perturbations of the gold IR that the GATE STILL ACCEPTS
// and that compile to a different command (the verifier only sees gate-accepted candidates):
//   mod_drop, mod_add (unrequested boolean mod), mod_swap (sibling boolean mod, e.g. -l/-L, lines/words, -r),
//   span_shift (copied span truncated / extended by one unit), span_other (value replaced by another request span),
//   role_swap (values of two roles swapped, e.g. path <-> pattern), op_family (head <-> tail, files.find <-> files.list,
//   ...), stage_drop (drop a pipe stage or an && part). Sort direction / count kind / -n vs head are covered by
//   mod_add / mod_drop / mod_swap / stage_drop on the schema's boolean mods.
// Picked round-robin over kinds in a hash order seeded by the row index (stable across runs). Span perturbations whose
// new span starts or ends with a function word ('in net.log', 'WARN in') are dropped (a trivial shortcut), and span_*
// negatives are capped at --span-cap of a split's negatives (hash order), so the mix is not dominated by span errors.
// --errors FILE:SPLIT adds real model errors (eval_pred.mjs --dump rows: {i, request, gold, pred}) as negatives of
// SPLIT (the dump's own split; dev/test errors never go to train). Correct model predictions equal the gold command,
// which is already a positive. Deduplicated on (i, pred) (the dump has the D and PD route of the same row).
// --kfold FILE adds k-fold mined generator outputs (kfold_mine.mjs; train rows only, incl. non-ok requests) to train
// as kind kfold_error (y=0) / kfold_ok (y=1), deduplicated on (src_id, pred_command). Rows of --kfold-select-fold
// (default 0; -1 = none) go to select.jsonl instead: real-error data verifier.py uses to pick best.pt. Folds are
// skeleton-disjoint, so select rows share no skeleton with the k-fold rows in train.
// Row: {id, src, request, os, command, y, kind, ids}

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { loadSchemas, segment } from '../../ir/lib/index.js';
import { loadTokenizer } from './export_targets.mjs';
import { readJsonl, encodePair, acceptedCommand, goldCommand } from './make_candidates.mjs';
import { equivKey } from './equiv.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const DATA = path.resolve(ROOT, opt('data', 'build/ir/dataset/v1'));
const OUT = path.resolve(ROOT, opt('out', 'build/ir/verifier/v1'));
const K = Number(opt('k', 4));
const SPLITS = opt('splits', 'train,dev,test').split(',');
const LIMIT_TRAIN = Number(opt('limit-train', 0));
const ERRORS = args.flatMap((a, i) => (a === '--errors' ? [args[i + 1]] : []));
const SPAN_CAP = Number(opt('span-cap', 0.25));
const KFOLD = opt('kfold') ? path.resolve(ROOT, opt('kfold')) : null;
const KFOLD_SELECT = Number(opt('kfold-select-fold', 0));

// function words: a span starting or ending with one is an easy-to-spot wrong value
const FUNCTION_WORDS = new Set(('a an the in on at of for to from into onto with without by as and or but vs versus than then '
  + 'that this these those which who whose what where when all any each every some my your our their its it them is are '
  + 'be was were do does did not no only just also called named containing inside under over').split(' '));
const isFn = (u) => u && FUNCTION_WORDS.has(u.t.toLowerCase());
const spanOk = (units, a, b) => !isFn(units[a]) && !isFn(units[b - 1]);

const hash = (s) => crypto.createHash('md5').update(s).digest().readUInt32LE(0);
const clone = (x) => structuredClone(x);

// every exec of an IR with its location
function stagesOf(ir) {
  const out = [];
  ir.body.parts.forEach((p, pi) => p.stages.forEach((s, si) => { const e = s.k === 'each' ? s.exec : s; if (e.k === 'exec') out.push({ pi, si, e }); }));
  return out;
}
const execAt = (ir, pi, si) => { const s = ir.body.parts[pi].stages[si]; return s.k === 'each' ? s.exec : s; };

// all value slots holding a span: [{get(ir) -> value array, j}]
function spanSlots(ir) {
  const out = [];
  const visit = (arrGet) => (arrGet(ir) || []).forEach((v, j) => { if (v && v.k === 'span') out.push({ get: arrGet, j }); });
  if (ir.cwd && ir.cwd.k === 'span') out.push({ cwd: true });
  for (const { pi, si, e } of stagesOf(ir)) {
    for (const role of Object.keys(e.args || {})) visit((x) => execAt(x, pi, si).args[role]);
    (e.mods || []).forEach((m, mi) => { if (m.values) visit((x) => execAt(x, pi, si).mods[mi].values); });
  }
  return out;
}
const slotValue = (ir, s) => (s.cwd ? ir.cwd : s.get(ir)[s.j]);

function boolMods(schemas, e) {
  const tools = schemas.ops[e.op] || {};
  const s = tools[e.pin] || Object.values(tools)[0];
  return s ? s.options.filter((o) => o.model === 'predict' && o.form === 'bool').map((o) => o.mod) : [];
}
const family = (op) => op.split('.')[0];

// gold IR -> [{kind, ir}] candidate perturbations (not yet gated)
function perturb(schemas, ir, units) {
  const nUnits = units.length;
  const out = [];
  const add = (kind, f) => { const x = clone(ir); if (f(x) !== false) out.push({ kind, ir: x }); };
  const allOps = Object.keys(schemas.ops);
  for (const { pi, si, e } of stagesOf(ir)) {
    const at = (x) => execAt(x, pi, si);
    const present = new Set((e.mods || []).map((m) => m.mod));
    const bools = boolMods(schemas, e);
    (e.mods || []).forEach((m, mi) => {
      add('mod_drop', (x) => { at(x).mods.splice(mi, 1); });
      if (!m.values) for (const b of bools) if (!present.has(b)) add('mod_swap', (x) => { at(x).mods[mi] = { mod: b }; });
    });
    for (const b of bools) if (!present.has(b)) add('mod_add', (x) => { at(x).mods.push({ mod: b }); });
    for (const op of allOps) if (op !== e.op && family(op) === family(e.op)) add('op_family', (x) => { const t = at(x); t.op = op; delete t.pin; });
    const roles = Object.keys(e.args || {}).filter((r) => e.args[r]?.length);
    for (let a = 0; a < roles.length; a++) for (let b = a + 1; b < roles.length; b++) {
      add('role_swap', (x) => { const g = at(x).args; [g[roles[a]], g[roles[b]]] = [g[roles[b]], g[roles[a]]]; });
    }
  }
  ir.body.parts.forEach((p, pi) => {
    if (p.stages.length > 1) p.stages.forEach((_, si) => { if (si > 0) add('stage_drop', (x) => { x.body.parts[pi].stages.splice(si, 1); }); });
  });
  if (ir.body.parts.length > 1) ir.body.parts.forEach((_, pi) => add('stage_drop', (x) => { x.body.parts.splice(pi, 1); }));
  const slots = spanSlots(ir);
  for (const s of slots) {
    const [u0, u1] = slotValue(ir, s).u;
    const shifts = [[u0 - 1, u1], [u0, u1 + 1], [u0 + 1, u1], [u0, u1 - 1]];
    for (const [a, b] of shifts) if (a >= 0 && b <= nUnits && b > a && spanOk(units, a, b)) add('span_shift', (x) => { slotValue(x, s).u = [a, b]; });
    // another span of the same width elsewhere in the request (does not overlap the original)
    const w = u1 - u0;
    for (let a = 0; a + w <= nUnits; a++) if ((a + w <= u0 || a >= u1) && spanOk(units, a, a + w)) add('span_other', (x) => { slotValue(x, s).u = [a, a + w]; });
  }
  return out;
}

// pick up to k: round-robin over kinds, each kind in a hash order seeded by the row key
function pick(cands, k, key) {
  const byKind = new Map();
  for (const c of [...cands].sort((a, b) => hash(key + a.command) - hash(key + b.command))) {
    if (!byKind.has(c.kind)) byKind.set(c.kind, []);
    byKind.get(c.kind).push(c);
  }
  const kinds = [...byKind.keys()].sort((a, b) => (a.startsWith('span_') - b.startsWith('span_')) || hash(key + a) - hash(key + b)); // span_* last
  const out = [];
  for (let round = 0; out.length < k; round++) {
    let any = false;
    for (const kd of kinds) { const c = byKind.get(kd)[round]; if (c && out.length < k) { out.push(c); any = true; } }
    if (!any) break;
  }
  return out;
}

const isSpan = (kind) => kind.startsWith('span_');

// keep at most cap * (all negatives) span_* negatives: drop the excess in hash order
function capSpans(recs, cap, key) {
  if (!(cap > 0 && cap < 1)) return recs;
  const neg = recs.filter((x) => !x.y);
  const spans = neg.filter((x) => isSpan(x.kind));
  const allowed = Math.floor((cap * (neg.length - spans.length)) / (1 - cap));
  if (spans.length <= allowed) return recs;
  const drop = new Set(spans.sort((a, b) => hash(key + a.src + a.command) - hash(key + b.src + b.command)).slice(allowed));
  return recs.filter((x) => !drop.has(x));
}

function main() {
  const schemas = loadSchemas();
  const tok = loadTokenizer();
  fs.mkdirSync(OUT, { recursive: true });
  const errorsBy = {};
  for (const spec of ERRORS) {
    const [file, split] = spec.split(/:(?=[a-z]+$)/);
    if (!split) { console.error(`--errors ${spec}: expected FILE:SPLIT`); process.exit(2); }
    (errorsBy[split] ||= []).push(...readJsonl(file));
  }
  const stats = { k: K, span_cap: SPAN_CAP };
  const line = (split, n, x) => JSON.stringify({ id: `${split}:${n}`, src: x.src, request: x.request, os: x.os, command: x.command, y: x.y, kind: x.kind, ids: encodePair(tok, x.request, x.os, x.command) });
  for (const split of SPLITS) {
    const file = path.join(DATA, `${split}.jsonl`);
    if (!fs.existsSync(file)) continue;
    let rows = readJsonl(file).map((r, i) => ({ r, i }));
    if (split === 'train' && LIMIT_TRAIN && LIMIT_TRAIN < rows.length) {
      rows = rows.sort((a, b) => hash(`t${a.i}`) - hash(`t${b.i}`)).slice(0, LIMIT_TRAIN).sort((a, b) => a.i - b.i);
    }
    const st = { rows: rows.length, ok_rows: 0, pos: 0, neg: 0, model_err: 0, gated: 0, equiv_dropped: 0, no_neg: 0, span_capped: 0, kinds: {} };
    let recs = [];
    const emit = (src, r, command, y, kind) => recs.push({ src, request: r.request, os: r.os, command, y, kind });
    const t0 = Date.now();
    for (const { r, i } of rows) {
      if (r.label !== 'ok') continue;
      const gold = goldCommand(schemas, r);
      if (!gold || !acceptedCommand(schemas, r, r.ir)) continue;
      st.ok_rows++;
      emit(`${split}:${i}`, r, gold, 1, 'gold');
      const units = segment(r.request).units;
      const seen = new Set([equivKey(gold, r.request)]), cands = [];
      for (const { kind, ir } of perturb(schemas, r.ir, units)) {
        st.gated++;
        const c = acceptedCommand(schemas, r, ir);
        if (!c || c === gold) continue;
        const key = equivKey(c, r.request);
        if (seen.has(key)) { if (key === equivKey(gold, r.request)) st.equiv_dropped++; continue; }
        seen.add(key);
        cands.push({ kind, command: c });
      }
      const chosen = pick(cands, K, `${split}:${i}`);
      if (!chosen.length) st.no_neg++;
      for (const c of chosen) emit(`${split}:${i}`, r, c.command, 0, c.kind);
    }
    const n0 = recs.length;
    recs = capSpans(recs, SPAN_CAP, split);
    st.span_capped = n0 - recs.length;
    const gsplit = readJsonl(file), errSeen = new Set();
    for (const e of errorsBy[split] || []) {
      const r = gsplit[e.i];
      if (!r || r.request !== e.request || !e.pred) continue;
      if (equivKey(e.pred, r.request) === equivKey(goldCommand(schemas, r), r.request)) continue;
      const k = `${e.i}\t${e.pred}`;
      if (errSeen.has(k)) continue;
      errSeen.add(k);
      st.model_err++;
      emit(`${split}:${e.i}`, r, e.pred, 0, 'model_error');
    }
    if (split === 'dev' && st.model_err && !KFOLD) {
      console.error('note: dev model errors go to dev.jsonl; without --kfold (select.jsonl) verifier.py picks best.pt on the same real dev candidates score_combined tunes the threshold on (dev metrics optimistic, test unaffected)');
    }
    let select = [];
    if (split === 'train' && !KFOLD) fs.rmSync(path.join(OUT, 'select.jsonl'), { force: true }); // no stale selection set
    if (split === 'train' && KFOLD) {
      const kseen = new Set(), kst = { rows: 0, dup: 0, train: 0, select: 0, pos: 0, neg: 0, non_ok: 0 };
      for (const x of readJsonl(KFOLD)) {
        kst.rows++;
        const k = `${x.src_id}\t${equivKey(x.pred_command, x.request)}`;
        if (kseen.has(k)) { kst.dup++; continue; }
        kseen.add(k);
        const rec = { src: x.src_id, request: x.request, os: x.os, command: x.pred_command, y: x.y ? 1 : 0, kind: x.y ? 'kfold_ok' : 'kfold_error' };
        kst[rec.y ? 'pos' : 'neg']++;
        if (x.gold_label !== 'ok') kst.non_ok++;
        if (x.fold === KFOLD_SELECT) { select.push(rec); kst.select++; } else { recs.push(rec); kst.train++; }
      }
      st.kfold = kst;
    }
    for (const x of recs) { if (x.y) st.pos++; else { st.neg++; st.kinds[x.kind] = (st.kinds[x.kind] || 0) + 1; } }
    fs.writeFileSync(path.join(OUT, `${split}.jsonl`), recs.map((x, n) => line(split, n, x)).join('\n') + '\n');
    if (select.length) fs.writeFileSync(path.join(OUT, 'select.jsonl'), select.map((x, n) => line('select', n, x)).join('\n') + '\n');
    st.seconds = (Date.now() - t0) / 1000;
    stats[split] = st;
    console.error(`${split}: ${JSON.stringify(st)}`);
  }
  fs.writeFileSync(path.join(OUT, `stats${LIMIT_TRAIN ? '.limited' : ''}.json`), JSON.stringify(stats, null, 1));
}

main();
