#!/usr/bin/env node
// Compare cheap judges with a reference judge (Opus) on pred_correct; "positive" = reference says the pred is wrong.
//   node scripts/ir/judge_compare.mjs --ref build/ir/judge_cmp/rows400.jsonl haiku=DIR/adjudications.jsonl codex=... [--combo haiku+codex]
import fs from 'node:fs';
import { compareJudges, combineAnyWrong } from './adjudicate_lib.mjs';

const args = process.argv.slice(2);
const read = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const ref = read(args[args.indexOf('--ref') + 1]);
const judges = {}, combos = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--ref') { i++; continue; }
  if (args[i] === '--combo') { combos.push(args[++i]); continue; }
  const [name, f] = args[i].split('='); judges[name] = read(f);
}
const secs = (rs) => { const s = rs.map((r) => r.usage?.cli_seconds).filter((x) => x > 0); return s.length ? +(s.reduce((a, b) => a + b, 0) / s.length).toFixed(2) : null; };
const res = {};
for (const [n, js] of Object.entries(judges)) res[n] = { ...compareJudges(ref, js), failures: js.filter((r) => r.error).length, sec_per_call: secs(js) };
for (const c of combos) res[`${c} (any wrong)`] = compareJudges(ref, combineAnyWrong(...c.split('+').map((n) => judges[n])));
console.log(JSON.stringify(res, null, 1));
