#!/usr/bin/env node
// Evaluate the shipped model on the held-out set (data/eval/*.jsonl, never used for training),
// OOD rejection (data/ood_eval.jsonl) and slot extraction cases. Writes the eval section of EVAL.md.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { loadModel, predictProba } from '../src/classifier.js';
import { buildCommand } from '../src/fill.js';
import { SLOT_CASES } from '../test/slot-cases.js';
import { updateSection } from './report.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const readJsonl = (p) => readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));

const model = loadModel();
const evalDir = join(ROOT, 'data', 'eval');
const rows = readdirSync(evalDir).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(evalDir, f)));
const thr = model.threshold;

const stats = {};
const bump = (k, field) => { stats[k] ??= { n: 0, top1: 0, top3: 0, accepted: 0, acceptedCorrect: 0 }; stats[k][field]++; };
const confusions = new Map();
const perIntent = new Map();
const failures = [];
for (const r of rows) {
  const p = predictProba(r.text, model);
  const order = Array.from(p.keys()).sort((a, b) => p[b] - p[a]);
  const pred = model.labels[order[0]];
  const top3 = order.slice(0, 3).map((i) => model.labels[i]);
  const ok = pred === r.intent;
  for (const k of ['all', r.lang]) {
    bump(k, 'n');
    if (ok) bump(k, 'top1');
    if (top3.includes(r.intent)) bump(k, 'top3');
    if (p[order[0]] >= thr) { bump(k, 'accepted'); if (ok) bump(k, 'acceptedCorrect'); }
  }
  const pi = perIntent.get(r.intent) || { n: 0, ok: 0 };
  pi.n++; if (ok) pi.ok++;
  perIntent.set(r.intent, pi);
  if (!ok) {
    const key = `${r.intent} → ${pred}`;
    confusions.set(key, (confusions.get(key) || 0) + 1);
    failures.push({ text: r.text, gold: r.intent, pred, p: p[order[0]] });
  }
}

let ood = null;
const oodPath = join(ROOT, 'data', 'ood_eval.jsonl');
if (existsSync(oodPath)) {
  const o = readJsonl(oodPath);
  const rejected = o.filter((r) => Math.max(...predictProba(r.text, model)) < thr).length;
  ood = { n: o.length, rejected };
}

let slotOk = 0;
const slotFails = [];
for (const [intent, q, expected] of SLOT_CASES) {
  const got = buildCommand(intent, q, { platform: 'linux' }).command;
  if (got === expected) slotOk++; else slotFails.push({ intent, q, expected, got });
}

const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
const line = (k) => {
  const s = stats[k];
  return `| ${k.toUpperCase()} | ${s.n} | ${pct(s.top1, s.n)} | ${pct(s.top3, s.n)} | ${pct(s.accepted, s.n)} | ${pct(s.acceptedCorrect, s.accepted)} |`;
};
const worst = [...perIntent.entries()].map(([k, v]) => [k, v.ok / v.n, v]).sort((a, b) => a[1] - b[1]).slice(0, 12);
const topConf = [...confusions.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15);
const modelSize = statSync(join(ROOT, 'model', 'model.bin')).size;

const md = `## Intent classification (held-out set)

Model: ${model.classes} intents, ${model.rows} hashed feature rows (dim ${model.dim}), int8 weights,
file size **${(modelSize / 1e6).toFixed(2)} MB**, trained on ${model.n_train} sentences (${model.trained}), C=${model.C},
confidence threshold **${thr}** (calibrated on an internal split + data/ood.jsonl).

Eval set: \`data/eval/*.jsonl\`, ${rows.length} sentences written independently of the training data
(training sentences whose normalised text collides with an eval sentence are dropped at train time).

| split | n | top-1 | top-3 | answered (p ≥ thr) | precision when answered |
|---|---|---|---|---|---|
${line('all')}
${line('en')}
${line('pl')}

Out-of-domain rejection (\`data/ood_eval.jsonl\`, chit-chat that is not a shell task): ${ood ? `**${pct(ood.rejected, ood.n)}** (${ood.rejected}/${ood.n}) answered "I don't understand"` : 'n/a'}.

Slot extraction + template filling (\`test/slot-cases.js\`, exact command match on linux): **${slotOk}/${SLOT_CASES.length}**.

### Weakest intents (top-1)

| intent | acc | n |
|---|---|---|
${worst.map(([k, a, v]) => `| ${k} | ${(a * 100).toFixed(0)}% | ${v.n} |`).join('\n')}

### Most frequent confusions

| gold → predicted | count |
|---|---|
${topConf.map(([k, v]) => `| ${k} | ${v} |`).join('\n')}
`;

updateSection('eval', md);
const s = stats.all;
console.log(`eval: n=${s.n} top1=${pct(s.top1, s.n)} top3=${pct(s.top3, s.n)}  EN=${pct(stats.en.top1, stats.en.n)} PL=${pct(stats.pl.top1, stats.pl.n)}`);
console.log(`answered=${pct(s.accepted, s.n)} precision@thr=${pct(s.acceptedCorrect, s.accepted)}  OOD rejected=${ood ? pct(ood.rejected, ood.n) : 'n/a'}  slots=${slotOk}/${SLOT_CASES.length}`);
if (process.argv.includes('--verbose')) {
  for (const [k, v] of topConf) console.log(`  ${v}x ${k}`);
  for (const f of failures.slice(0, 200)) console.log(`  ✗ [${f.gold} → ${f.pred} ${(f.p * 100).toFixed(0)}%] ${f.text}`);
}
for (const f of slotFails) console.log(`  slot ✗ ${f.intent}: ${f.q}\n     got ${f.got}\n     exp ${f.expected}`);
console.log('wrote EVAL.md (eval section)');
