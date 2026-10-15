#!/usr/bin/env node
// A-only (no student) end-to-end check of out-of-catalog rejection vs in-catalog accuracy through suggest():
// per set, correct = understood && intent == gold (in-catalog sets) or rejected = !understood (out-of-scope sets).
// Aggregates only (the real_* sets are PRIVATE). HYBRID.md#out-of-catalog-rejection
//   node scripts/real/eval_ooc.js            (JSON on stdout; TELLSH_OOC_VETO=off|ooc|reject selects the veto)
import { fileURLToPath } from 'node:url';
import { suggest } from '../../src/pipeline.js';
import { evalSets } from '../hybrid/sets.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const S = evalSets(ROOT);
const real = S.real();
const sets = { eval: S.eval(), devtools: S.devtools(), shell: S.shell(), blind: S.blind(), blind3: S.blind3(),
  real_human: real.filter((r) => !r.tmpl), real_tmpl: real.filter((r) => r.tmpl),
  ood: S.ood(), blind_ood: S.blind_ood(), blind3_ood: S.blind3_ood(), real_ooc: S.real_ooc() };
const out = {};
for (const [name, rows] of Object.entries(sets)) {
  if (!rows.length) continue;
  let ok = 0, vetoed = 0;
  for (const r of rows) {
    const s = suggest(r.text, { env: { shell: r.shell || 'bash', os: r.os || 'linux' }, top: 3, cwd: '/tmp', compose: 'off' });
    ok += r.intent ? (s.understood && s.intent === r.intent) : !s.understood;
    vetoed += !!s.vetoed;
  }
  out[name] = { n: rows.length, [rows.every((r) => !r.intent) ? 'rejected' : 'correct']: +(100 * ok / rows.length).toFixed(2), vetoed: +(100 * vetoed / rows.length).toFixed(2) };
  console.error(name, JSON.stringify(out[name]));
}
console.log(JSON.stringify(out));
