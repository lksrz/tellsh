#!/usr/bin/env node
// Two-model gate (src/pipeline.js suggest: 0.3.3 model + templates model) top-1 intent accuracy on the private real-usage
// eval split (build/real/rows.jsonl). Aggregates only. Splits the labelled rows into the template intents
// (NEW_TEMPLATE_INTENTS) and every other catalog intent, and counts "steals": rows of another intent that the gate
// answers with a template intent. To compare templates models, swap
// model/model_templates.bin in a scratch checkout.
//   node scripts/real/eval_gate.js [--json out.json] [--limit N]
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { suggest, NEW_TEMPLATE_INTENTS } from '../../src/pipeline.js';
import { BY_ID } from '../../src/catalog.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const p = join(ROOT, 'build/real/rows.jsonl');
if (!existsSync(p)) { console.error('eval_gate: no build/real/rows.jsonl'); process.exit(1); }
let rows = readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)).filter((r) => r.split === 'eval' && r.intent && BY_ID[r.intent]);
if (opt('--limit')) rows = rows.filter((_, i) => i % Math.ceil(rows.length / +opt('--limit')) === 0);

const acc = () => ({ n: 0, ok: 0 });
const sets = { all: acc(), human: acc(), tmpl: acc(), templates: acc(), other: acc() };
const perTemplate = {};
let steals = 0, withheld = 0;
for (const r of rows) {
  const s = suggest(r.text, { shell: r.shell || 'bash', os: r.os || 'linux' });
  const hit = s?.intent === r.intent;
  const isT = NEW_TEMPLATE_INTENTS.has(r.intent);
  for (const k of ['all', r.tmpl ? 'tmpl' : 'human', isT ? 'templates' : 'other']) { sets[k].n++; sets[k].ok += hit; }
  if (isT) { const e = (perTemplate[r.intent] ||= acc()); e.n++; e.ok += hit; if (hit && (s.missing || []).length) withheld++; }
  else if (NEW_TEMPLATE_INTENTS.has(s?.intent)) steals++;
}
const pct = (e) => +(100 * e.ok / Math.max(1, e.n)).toFixed(2);
const out = {
  sets: Object.fromEntries(Object.entries(sets).map(([k, e]) => [k, { n: e.n, acc: pct(e) }])),
  steals, stealsPct: +(100 * steals / Math.max(1, sets.other.n)).toFixed(2), templateHitsWithheld: withheld,
  perTemplate: Object.fromEntries(Object.entries(perTemplate).sort().map(([k, e]) => [k, { n: e.n, acc: pct(e) }])),
};
console.log(JSON.stringify(out, null, 1));
if (opt('--json')) writeFileSync(opt('--json'), JSON.stringify(out, null, 1));
