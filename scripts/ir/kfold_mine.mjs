#!/usr/bin/env node
// Turn k-fold held-out predictions (ml/ir/kfold.py) into verifier training rows.
//
//   node scripts/ir/kfold_mine.mjs [--v v1] [--k 3] [--runs build/ir/runs/kfold] [--out build/ir/verifier/<v>/kfold.jsonl]
//
// For every held-out row and route (P, D) whose prediction the gate ACCEPTS, writes one row:
//   {fold, src_id, request, os, route, pred_ir, pred_command, gold_label, gold_command, y, conf}
// y = 1 (positive) when gold is ok and the command is equivalent (equiv.mjs) to the gold command, else 0 (negative: a realistic model error
// the gate let through). Rows the gate rejects are not written (they never reach the verifier). Also prints counts.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSchemas, gate } from '../../ir/lib/index.js';
import { decodeActions, assembleP } from './actions.mjs';
import { sameCommand } from './equiv.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const V = opt('v', 'v1');
const K = Number(opt('k', 3));
const RUNS = path.resolve(ROOT, opt('runs', 'build/ir/runs/kfold'));
const OUT = path.resolve(ROOT, opt('out', `build/ir/verifier/${V}/kfold.jsonl`));

const schemas = loadSchemas();
const PLATFORM = { linux: 'linux_gnu', darwin: 'darwin_bsd' };
const envOf = (r) => ({ schemas, shell: 'bash', platform: PLATFORM[r.os] || 'linux_gnu', request: r.request });
const readJsonl = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const accept = (r, ir) => {
  if (!ir || ir.status !== 'ok') return null;
  try { const g = gate(r.request, ir, envOf(r)); return g.accept ? g.command : null; } catch { return null; }
};

const out = [], counts = {};
for (let k = 0; k < K; k++) {
  const gold = readJsonl(path.join(ROOT, 'build/ir/dataset', V, `fold${k}_heldout.jsonl`));
  const pf = path.join(RUNS, `fold${k}`, 'preds_heldout.jsonl');
  if (!fs.existsSync(pf)) { console.error(`missing ${pf}`); continue; }
  for (const pr of readJsonl(pf)) {
    const i = Number(String(pr.id).split(':')[1]);
    const r = gold[i];
    if (!r) throw new Error(`fold ${k}: prediction ${pr.id} has no gold row`);
    const goldCmd = r.label === 'ok' ? (accept(r, r.ir) ?? r.command) : null;
    const cand = {
      P: () => (pr.p?.label === 'ok' && pr.p?.single !== false ? assembleP(pr.p, schemas) : null),
      D: () => decodeActions(pr.d.actions, schemas),
    };
    for (const [route, f] of Object.entries(cand)) {
      let ir = null;
      try { ir = f(); } catch { ir = null; }
      const cmd = accept(r, ir);
      if (cmd == null) continue;
      const y = r.label === 'ok' && sameCommand(cmd, goldCmd, r.request) ? 1 : 0;
      const c = (counts[route] ??= { pos: 0, neg: 0 });
      c[y ? 'pos' : 'neg']++;
      out.push({ fold: k, src_id: r.src_id, request: r.request, os: r.os, route, pred_ir: ir, pred_command: cmd,
        gold_label: r.label, gold_command: goldCmd, y, conf: route === 'P' ? pr.p?.conf : pr.d?.conf });
    }
  }
}
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out.map((r) => JSON.stringify(r)).join('\n') + (out.length ? '\n' : ''));
console.log(JSON.stringify({ out: OUT, rows: out.length, counts }));
