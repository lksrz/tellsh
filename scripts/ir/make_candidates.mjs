#!/usr/bin/env node
// Verifier inputs from generator predictions (ml/ir/eval.py output): one candidate pair per row whose PD route
// (P fast path when P predicts ok + one stage and the gate accepts it, else D; same routing as eval_pred.mjs)
// yields a gate-accepted command. The pairs file carries token ids, so verifier.py scores it without node.
//
//   node scripts/ir/make_candidates.mjs --data build/ir/dataset/v1/dev.jsonl --preds build/ir/runs/h8/preds_dev.jsonl \
//     --out build/ir/verifier/v1/cand_dev.jsonl
//
// D route: with d.nbest (eval.py --nbest K) the first gate-accepted hypothesis (nbest_lib.mjs); rows then also carry
// rank / margin / nb_agree.
// Row: {id, request, os, command, route, ids, y}  (y = 1 when the command is equivalent (equiv.mjs) to the gate-compiled gold command;
// informative only: score_combined.mjs recomputes correctness from the gold split).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gate } from '../../ir/lib/index.js';
import { decodeActions, assembleP } from './actions.mjs';
import { loadTokenizer } from './export_targets.mjs';
import { sameCommand } from './equiv.mjs';
import { selectD } from './nbest_lib.mjs';

export const PLATFORM = { linux: 'linux_gnu', darwin: 'darwin_bsd' };
export const MAX_PAIR_TOKENS = 160;
export const readJsonl = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
export const envOf = (schemas, r) => ({ schemas, shell: 'bash', platform: PLATFORM[r.os] || 'linux_gnu', request: r.request });

// Verifier pair: <s> os request </s></s> command </s>; the request is truncated first, then the command.
export function encodePair(tok, request, os, command, maxLen = MAX_PAIR_TOKENS) {
  const a = tok.tokenize(`${os === 'darwin' ? 'macos' : 'linux'}: ${request}`).map((t) => t.id);
  let b = tok.tokenize(command).map((t) => t.id);
  if (b.length > maxLen - 8) b = b.slice(0, maxLen - 8);
  const A = a.slice(0, Math.max(4, maxLen - b.length - 4));
  return [tok.bos, ...A, tok.eos, tok.eos, ...b, tok.eos];
}

// gate-accepted command of an IR, or null
export function acceptedCommand(schemas, r, ir) {
  if (!ir || ir.status !== 'ok') return null;
  try { const g = gate(r.request, ir, envOf(schemas, r)); return g.accept ? g.command : null; } catch { return null; }
}

// gold command per row (gate-compiled when accepted, else the dataset command; null when gold is not ok)
export function goldCommand(schemas, r) {
  if (r.label !== 'ok') return null;
  return acceptedCommand(schemas, r, r.ir) ?? r.command;
}

// D route of one prediction row: first gate-accepted d.nbest hypothesis (nbest_lib.mjs) or the greedy d.actions
export function dSelect(schemas, r, d) {
  const compile = (actions) => { let ir; try { ir = decodeActions(actions, schemas); } catch { return null; } return acceptedCommand(schemas, r, ir); };
  return selectD(d, compile, (a, b) => sameCommand(a, b, r.request));
}

// PD route of one prediction row -> {command, route[, rank, margin, nb_agree]} | null (abstain); the n-best fields
// are set for D candidates of preds with d.nbest
export function pdCandidate(schemas, r, pr) {
  if (!pr) return null;
  if (pr.p?.label === 'ok' && pr.p?.single !== false) {
    let ir = null;
    try { ir = assembleP(pr.p, schemas); } catch { /* falls back to D */ }
    const c = acceptedCommand(schemas, r, ir);
    if (c) return { command: c, route: 'P' };
  }
  const s = dSelect(schemas, r, pr.d);
  if (!s.command) return null;
  return Array.isArray(pr.d?.nbest) ? { command: s.command, route: 'D', rank: s.rank, margin: s.margin, nb_agree: s.agree } : { command: s.command, route: 'D' };
}

// gold rows + prediction rows -> [{id, i, request, os, command, route}] for every row with an accepted candidate
export function candidates(schemas, gold, preds, split) {
  const out = [];
  for (const pr of preds) {
    const [sp, ln] = String(pr.id).split(':');
    const i = Number(ln);
    if (sp !== split || !gold[i]) throw new Error(`prediction id ${pr.id} is not a row of split ${split}`);
    const r = gold[i];
    const c = pdCandidate(schemas, r, pr);
    if (c) out.push({ id: pr.id, i, request: r.request, os: r.os, ...c });
  }
  return out;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const { loadSchemas } = await import('../../ir/lib/index.js');
  const args = process.argv.slice(2);
  const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
  const DATA = opt('data'), PREDS = opt('preds'), OUT = opt('out');
  if (!DATA || !PREDS || !OUT) { console.error('usage: make_candidates.mjs --data SPLIT.jsonl --preds PRED.jsonl --out CAND.jsonl'); process.exit(2); }
  const schemas = loadSchemas();
  const tok = loadTokenizer();
  const gold = readJsonl(DATA);
  const split = DATA.split(/[\\/]/).pop().replace(/\.jsonl$/, '');
  const cands = candidates(schemas, gold, readJsonl(PREDS), split);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  let right = 0;
  fs.writeFileSync(OUT, cands.map((c) => {
    const y = sameCommand(c.command, goldCommand(schemas, gold[c.i]), c.request) ? 1 : 0;
    right += y;
    return JSON.stringify({ id: c.id, request: c.request, os: c.os, command: c.command, route: c.route, ...(c.rank != null ? { rank: c.rank, margin: c.margin, nb_agree: c.nb_agree } : {}), y, ids: encodePair(tok, c.request, c.os, c.command) });
  }).join('\n') + '\n');
  console.error(`${split}: ${gold.length} rows, ${cands.length} accepted candidates (${right} correct, ${cands.length - right} wrong) -> ${OUT}`);
}
