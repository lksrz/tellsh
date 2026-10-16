#!/usr/bin/env node
// Score typed-IR model predictions (written by ml/ir/eval.py) with ir/lib canon + gate (docs/IR.md §6, §10).
//
//   node scripts/ir/eval_pred.mjs --preds PRED.jsonl --data build/ir/dataset/v1/dev.jsonl [--out REPORT.json]
//   node scripts/ir/eval_pred.mjs --oracle --data build/ir/dataset/v1/dev.jsonl     # gold targets as predictions
//
// PRED row: {id: "<split>:<line>", p: {label, single, op, pin, mods, stderr, slots}, d: {actions: [[name, u0, u1]]}}
// Every gold row is scored (missing prediction = abstention); ids must be unique and from the --data split.
// Routes: P (heads only; abstains when single=false), D (decoder), PD (P when it predicts ok + one stage and the gate accepts it, else D).
// Metrics per route: label accuracy, exact canonical-IR match and compiled-command match (on gold-ok rows),
// accepted-wrong (gate accepts but the command differs from gold, or gold is not ok) over all rows and
// over accepted rows, abstention precision/recall (abstain = no accepted command; positive = gold not ok).

import fs from 'node:fs';
import { loadSchemas, canon, equals, gate } from '../../ir/lib/index.js';
import { encodeActions, decodeActions, pTargets, assembleP, LABELS } from './actions.mjs';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const DATA = opt('data');
const PREDS = opt('preds');
const ORACLE = args.includes('--oracle');
if (!DATA || (!PREDS && !ORACLE)) { console.error('usage: eval_pred.mjs --data SPLIT.jsonl (--preds PRED.jsonl | --oracle) [--out R.json]'); process.exit(2); }

const schemas = loadSchemas();
const PLATFORM = { linux: 'linux_gnu', darwin: 'darwin_bsd' };
const readJsonl = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const gold = readJsonl(DATA);
const SPLIT = DATA.split(/[\\/]/).pop().replace(/\.jsonl$/, '');
const preds = ORACLE
  ? gold.map((r, i) => {
    const p = pTargets(r.ir, schemas);
    return {
      id: `${SPLIT}:${i}`,
      p: p ? { label: r.label, single: true, ...p } : { label: r.label, single: false, op: 'none' },
      d: { actions: encodeActions(r.ir, r.label, r.reasons, schemas) },
    };
  })
  : readJsonl(PREDS);

const envOf = (r) => ({ schemas, shell: 'bash', platform: PLATFORM[r.os] || 'linux_gnu', request: r.request });

// Run the gate on a predicted IR -> {label, accepted, command, canon}
function judge(r, ir, modelLabel) {
  if (!ir) return { label: modelLabel, accepted: false, command: null, canon: null, err: 'decode' };
  if (ir.status !== 'ok') return { label: modelLabel, accepted: false, command: null, canon: ir.status === 'ambiguous' ? { v: 1, status: 'ambiguous' } : safeCanon(r, ir) };
  let g;
  try { g = gate(r.request, ir, envOf(r)); } catch (e) { return { label: 'ok', accepted: false, command: null, canon: safeCanon(r, ir), err: 'gate_throw' }; }
  return { label: 'ok', accepted: !!g.accept, command: g.accept ? g.command : null, canon: safeCanon(r, ir), gate: g.label };
}
function safeCanon(r, ir) { try { return canon(ir, { schemas, request: r.request }); } catch { return null; } }

const goldInfo = gold.map((r) => {
  if (r.label !== 'ok') return { canon: { v: 1, status: r.label }, command: null };
  const g = gate(r.request, r.ir, envOf(r));
  return { canon: safeCanon(r, r.ir), command: g.accept ? g.command : r.command };
});

// Index predictions by gold row; every gold row is scored, a missing prediction counts as abstention.
const byRow = new Map();
for (const pr of preds) {
  const [sp, ln] = String(pr.id).split(':');
  const i = Number(ln);
  if (sp !== SPLIT) { console.error(`prediction id ${pr.id} is not from split ${SPLIT} (${DATA})`); process.exit(2); }
  if (!Number.isInteger(i) || i < 0 || i >= gold.length) { console.error(`prediction id ${pr.id} out of range`); process.exit(2); }
  if (byRow.has(i)) { console.error(`duplicate prediction id ${pr.id}`); process.exit(2); }
  byRow.set(i, pr);
}
const MISSING = { label: null, accepted: false, command: null, canon: null, err: 'missing' };

const routes = { P: [], D: [], PD: [] };
gold.forEach((r, i) => {
  const pr = byRow.get(i);
  if (!pr) { for (const k of Object.keys(routes)) routes[k].push([i, k === 'PD' ? { ...MISSING, route: 'D' } : MISSING]); return; }
  let pOut, dOut;
  const pl = pr.p?.label ?? 'ok';
  // P can only express 1 part x 1 stage; single=false is the model saying so -> P abstains
  if (pl === 'ok' && pr.p?.single === false) pOut = { label: 'ok', accepted: false, command: null, canon: null, err: 'not_single' };
  else try { pOut = judge(r, assembleP(pr.p, schemas), pl); } catch { pOut = judge(r, null, pl); }
  const dl = (() => { const a = pr.d?.actions?.find(([x]) => x !== 'BOS')?.[0]; return { OK: 'ok', NOT_SHELL: 'not_shell', OOS: 'out_of_scope', UNDER: 'underspecified', AMBIG: 'ambiguous' }[a] ?? 'ok'; })();
  try { dOut = judge(r, decodeActions(pr.d.actions, schemas), dl); } catch { dOut = judge(r, null, dl); }
  const pFast = pr.p?.label === 'ok' && pr.p?.single !== false && pOut.accepted;
  routes.P.push([i, pOut]);
  routes.D.push([i, dOut]);
  routes.PD.push([i, pFast ? { ...pOut, route: 'P' } : { ...dOut, route: 'D' }]);
});

const pct = (a, b) => (b ? +((100 * a) / b).toFixed(2) : null);
function score(rows) {
  let n = 0, lab = 0, okN = 0, exact = 0, cmd = 0, acc = 0, accWrong = 0, abst = 0, abstTrue = 0, negN = 0, fromP = 0;
  const confusion = {};
  for (const [i, o] of rows) {
    const g = gold[i], gi = goldInfo[i];
    n++;
    if (o.label === g.label) lab++;
    confusion[`${g.label}->${o.label}`] = (confusion[`${g.label}->${o.label}`] || 0) + 1;
    if (g.label !== 'ok') negN++;
    if (o.route === 'P') fromP++;
    if (g.label === 'ok') {
      okN++;
      if (o.canon && gi.canon && equals(o.canon, gi.canon)) exact++;
      if (o.accepted && o.command === gi.command) cmd++;
    }
    if (o.accepted) {
      acc++;
      if (g.label !== 'ok' || o.command !== gi.command) accWrong++;
    } else {
      abst++;
      if (g.label !== 'ok') abstTrue++;
    }
  }
  return {
    n, missing: rows.filter(([, o]) => o.err === 'missing').length, label_acc: pct(lab, n), gold_ok: okN, exact_ir: pct(exact, okN), cmd_match: pct(cmd, okN), accepted: acc,
    accepted_wrong: accWrong, accepted_wrong_rate_all: pct(accWrong, n), accepted_wrong_rate_accepted: pct(accWrong, acc),
    abstain_precision: pct(abstTrue, abst), abstain_recall: pct(abstTrue, negN), ...(rows.some(([, o]) => o.route) ? { routed_to_P: fromP } : {}),
    confusion,
  };
}

const report = { data: DATA, preds: PREDS || 'oracle', labels: LABELS, routes: Object.fromEntries(Object.entries(routes).map(([k, v]) => [k, score(v)])) };
// Gold-oracle check of the P route on P-expressible rows only (P can express ~45% of ok rows by design).
report.p_coverage = { single_ok: routes.P.filter(([, o]) => o.label === 'ok' && o.err !== 'not_single').length, accepted: routes.P.filter(([, o]) => o.accepted).length };
if (ORACLE) report.p_expressible = gold.filter((r) => pTargets(r.ir, schemas)).length;
const text = JSON.stringify(report, null, 1);
if (opt('out')) fs.writeFileSync(opt('out'), text);
console.log(text);
