#!/usr/bin/env node
// Before/after table for EVAL.md: v0.2 (code + model at commit 2b5eea8, measured with the v0.3 eval
// harness: data/eval_baseline_v0.2.json) vs the current build (build/eval_summary.json from scripts/eval.js).
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { updateSection } from './report.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (p) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null);
const B = read(join(ROOT, 'data', 'eval_baseline_v0.2.json'));
const A = read(join(ROOT, 'build', 'eval_summary.json'));
if (!B || !A) { console.log('compare: missing baseline or build/eval_summary.json (run scripts/eval.js)'); process.exit(0); }
const version = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version;
const get = (o, k) => k.split('.').reduce((x, p) => (x == null ? x : x[p]), o);
const f = (v) => (v == null ? 'n/a' : `${(v * 100).toFixed(1)}%`);
const d = (a, b) => (a == null || b == null ? '' : `${a - b >= 0 ? '+' : ''}${((a - b) * 100).toFixed(1)}`);
const ROWS = [
  ['**Blind sets (written for v0.3 before any result; never tuned on)**'],
  ['intent top-1, `data/blind/intents.jsonl` (all shells)', 'blind_intent'],
  ['  … EN / PL', 'blind_intent_en', 'blind_intent_pl'],
  ['  … whole-disk location rows', 'blind_intent_disk'],
  ['end-to-end exact command, `data/blind/e2e.jsonl` (hand-written gold)', 'blind_e2e'],
  ['  … given gold intent', 'blind_e2e_gold_intent'],
  ['  … whole-disk location rows', 'blind_e2e_disk'],
  ['history references exact, `data/blind/history.jsonl`', 'history_blind'],
  ['composer: any answer acceptable, `data/blind/compose.jsonl`', 'compose_blind_any'],
  ['composer: composed & acceptable, blind', 'compose_blind_composed_acc'],
  ['OOD rejected, `data/blind/ood.jsonl`', 'ood_blind_rejected'],
  ['**Held-out sets from v0.2 (not tuned on, but known since v0.2)**'],
  ['intent top-1, `data/eval` (bash)', 'intent_top1'],
  ['  … EN / PL', 'intent_top1_en', 'intent_top1_pl'],
  ['tool top-1, `data/eval`', 'tool_top1'],
  ['answered / precision when answered', 'answered', 'precision_answered'],
  ['end-to-end exact, relexicalised `data/eval` (eval-only values; complete commands only)', 'e2e_relex'],
  ['  … given gold intent', 'e2e_relex_gold_intent'],
  ['slot F1 (`data/slots/gold.jsonl`)', 'slot_f1'],
  ['shell-phrased intent top-1: bash / zsh / PowerShell / cmd', 'shell_phrased.bash', 'shell_phrased.zsh', 'shell_phrased.powershell', 'shell_phrased.cmd'],
  ['OOD rejected, `data/ood_eval.jsonl`', 'ood_rejected'],
  ['composer false fires on `data/eval` (lower is better)', 'compose_false_fire'],
  ['**Development sets (used for tuning since v0.2 — not blind)**'],
  ['history references exact, `data/history/eval.jsonl`', 'history_dev'],
  ['composer: any answer acceptable, `data/compose/eval.jsonl`', 'compose_dev_any'],
  ['**v0.2 weak intents (`data/eval`, n=16 each)**'],
  ...['find_symlinks', 'broken_symlinks', 'find_process', 'service_status', 'git_push', 'git_pull', 'empty_files', 'list_files', 'disk_free', 'block_devices', 'users_logged_in', 'show_path']
    .map((k) => [`  ${k}`, `weak.${k}`]),
];
const lines = [`## v0.2 → v${version}`, '',
  'Both columns are measured with the **same v0.3 eval harness** (stricter: complete commands only, eval-only value pools, quoting-aware comparison); ' +
  'the v0.2 column runs the v0.2 code and model (commit `2b5eea8`) — so v0.2 numbers can differ slightly from the v0.2 EVAL.md.', '',
  `| metric | v0.2 | v${version} | Δ (pt) |`, '|---|---|---|---|'];
for (const [label, ...keys] of ROWS) {
  if (!keys.length) { lines.push(`| ${label} | | | |`); continue; }
  const b = keys.map((k) => get(B, k));
  const a = keys.map((k) => get(A, k));
  lines.push(`| ${label} | ${b.map(f).join(' / ')} | **${a.map(f).join(' / ')}** | ${keys.map((_, i) => d(a[i], b[i])).join(' / ')} |`);
}
updateSection('compare', lines.join('\n'));
console.log('compare: wrote EVAL.md compare section');
