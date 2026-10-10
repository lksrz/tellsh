#!/usr/bin/env node
// Dump A's (linear cascade) top-k candidates for the hybrid datasets, used to train/evaluate the rerankers in Python.
//   node scripts/hybrid/dump_cascade.js [--model build/adev/model/model.bin] [--tag adev]
// -> build/hybrid/cands_<tag>.jsonl  {set, i, text, lang, shell, os, intent, tool, conf, topTool, topToolP, pNone, cands:[{intent,tool,p}]}
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadModel, getModel } from '../../src/model.js';
import { cascade } from '../../src/cascade.js';
import { envFeatures } from '../../src/env.js';
import { evalSets } from './sets.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split('=')[1] ?? d;
const model = arg('model') ? loadModel(arg('model')) : getModel();
const tag = arg('tag', 'ship');
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
export const SETS = {
  train: () => readJsonl(join(ROOT, 'build/hybrid/train.jsonl')).filter((r) => r.split === 'train' && r.intent && r.kind !== 'typo'),
  dev: () => readJsonl(join(ROOT, 'build/hybrid/train.jsonl')).filter((r) => r.split === 'dev'),
  ...evalSets(ROOT),
};
const ONLY = arg('sets') ? arg('sets').split(',') : null;
const out = [];
for (const [set, f] of Object.entries(SETS)) {
  if (ONLY && !ONLY.includes(set)) continue;
  f().forEach((r, i) => {
    const c = cascade(r.text, { model, extras: envFeatures({ shell: r.shell || 'bash', os: r.os || 'linux' }), top: 8 });
    out.push({ set, i, text: r.text, lang: r.lang, shell: r.shell || 'bash', os: r.os || 'linux', intent: r.intent || null, tool: r.tool || null,
      conf: c.confidence, topTool: c.topTool, topToolP: c.topToolP, pNone: c.pNone,
      cands: c.top.map((t) => ({ intent: t.intent, tool: t.tool, p: +t.p.toFixed(5) })) });
  });
}
writeFileSync(join(ROOT, `build/hybrid/cands_${tag}.jsonl`), out.map((o) => JSON.stringify(o)).join('\n') + '\n');
const c = {};
for (const o of out) { c[o.set] ??= [0, 0, 0]; if (o.intent) { c[o.set][0]++; if (o.cands[0]?.intent === o.intent) c[o.set][1]++; if (o.cands.slice(0, 5).some((x) => x.intent === o.intent)) c[o.set][2]++; } }
console.log(tag, Object.entries(c).map(([k, [n, a, b]]) => `${k}: n=${n} top1=${(100 * a / n).toFixed(1)} top5=${(100 * b / n).toFixed(1)}`).join(' | '));
