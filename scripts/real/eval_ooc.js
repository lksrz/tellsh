#!/usr/bin/env node
// A-only (no student) end-to-end check of out-of-catalog rejection vs in-catalog accuracy through suggest():
// per set, correct = understood && intent == gold (in-catalog sets) or rejected = !understood (out-of-scope sets).
// Aggregates only (the real_* sets are PRIVATE). HYBRID.md#out-of-catalog-rejection
//   node scripts/real/eval_ooc.js            (JSON on stdout; TELLSH_OOC_VETO=off|ooc|reject selects the veto)
import { fileURLToPath } from 'node:url';
import { suggest } from '../../src/pipeline.js';
import { evalSets } from '../hybrid/sets.js';
import { loadModel } from '../../src/model.js';

// --sweep: veto off, plus the out-of-catalog veto at every stage-1 p(__ooc__) threshold T (templates model probe)
// (T = p(__ooc__) floor, C = the vetoed answer's confidence ceiling)
const SWEEP = process.argv.includes('--sweep') ? [0.5, 0.7, 0.9, 0.95, 0.98, 0.99].flatMap((t) => [0.6, 0.8, 0.9, 2].map((c) => [t, c])) : null;
if (SWEEP) process.env.TELLSH_OOC_VETO = 'off';
const TM = SWEEP && loadModel(fileURLToPath(new URL('../../model/model_templates.bin', import.meta.url)));

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
  const okT = SWEEP ? SWEEP.map(() => 0) : [];
  for (const r of rows) {
    const o = { env: { shell: r.shell || 'bash', os: r.os || 'linux' }, top: 3, cwd: '/tmp', compose: 'off' };
    const s = suggest(r.text, o);
    const good = r.intent ? (s.understood && s.intent === r.intent) : !s.understood;
    ok += good;
    vetoed += !!s.vetoed;
    if (SWEEP) {
      const p = suggest(r.text, { ...o, model: TM }).pOoc || 0;
      const vetoable = s.understood && (s.method === 'catalog' || s.method === 'composed');
      SWEEP.forEach(([t, c], k) => { okT[k] += vetoable && p >= t && s.confidence < c ? !r.intent : good; });
    }
  }
  const key = rows.every((r) => !r.intent) ? 'rejected' : 'correct';
  out[name] = { n: rows.length, [key]: +(100 * ok / rows.length).toFixed(2), vetoed: +(100 * vetoed / rows.length).toFixed(2),
    ...(SWEEP ? { sweep: Object.fromEntries(SWEEP.map(([t, c], k) => [`${t}/${c}`, +(100 * okT[k] / rows.length).toFixed(2)])) } : {}) };
  console.error(name, JSON.stringify(out[name]));
}
console.log(JSON.stringify(out));
