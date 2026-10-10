#!/usr/bin/env node
// Derive weak NL triggers for composer flags from tldr-pages flag descriptions (data/tldr/flags.jsonl,
// CC-BY-4.0). For every (head [sub], flag) in the composer vocabulary keep the stems that are most
// specific to that flag relative to the tool's other flags. Output: model/tldr_triggers.json (small).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { TOOLS } from '../src/compose.js';
import { foldKeepLength } from '../src/slots.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const src = `${ROOT}data/tldr/flags.jsonl`;
if (!existsSync(src)) { console.error('no data/tldr/flags.jsonl (run scripts/tldr_ingest.py)'); process.exit(1); }
const rows = readFileSync(src, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const STOP = new Set(('the a an of in on to for and or with by from all show list display given specific current ' +
  'file files directory directories using use into only each its their this that which when what are is be as ' +
  'dla oraz albo jest lub ktore ktory tylko wszystkie plik pliki katalog katalogu').split(' '));
const stems = (t) => foldKeepLength(t).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/)
  .filter((w) => w.length > 2 && !STOP.has(w)).map((w) => w.slice(0, 5));

const out = {};
for (const [tn, spec] of Object.entries(TOOLS)) {
  const variants = spec.sub ? Object.entries(spec.sub).map(([s, v]) => [`${spec.head} ${s}`, v.flags, s]) : [[spec.head, spec.flags, null]];
  for (const [key, flags, sub] of variants) {
    const mine = rows.filter((r) => r.head === spec.head && (sub ? r.sub === sub : true));
    const vocab = new Set(flags.map((f) => f.flag.split(' ')[0]));
    const byFlag = {};
    const total = {};
    for (const r of mine) {
      const f = r.flag;
      const long = r.long;
      const k = vocab.has(f) ? f : vocab.has(long) ? long : null;
      for (const s of new Set(stems(r.text))) {
        total[s] = (total[s] || 0) + 1;
        if (k) (byFlag[k] ??= {})[s] = (byFlag[k][s] || 0) + 1;
      }
    }
    const entry = {};
    for (const [flag, counts] of Object.entries(byFlag)) {
      const ranked = Object.entries(counts).map(([s, c]) => [s, c / total[s] * Math.log(1 + c)])
        .filter(([, sc]) => sc > 0.3).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([s]) => s);
      if (ranked.length) entry[flag] = ranked;
    }
    if (Object.keys(entry).length) out[key] = entry;
  }
}
writeFileSync(`${ROOT}model/tldr_triggers.json`, JSON.stringify(out));

// "explained" flags: triggers that fire on >= 5% of an intent's own training paraphrases are part of what that
// intent means ("hidden" for hidden_files, "kernel" for dmesg) and must not make the composer replace it.
const { triggeredFlags } = await import('../src/compose.js');
const { FAMILY_OF } = await import('../src/tools.js');
// read the FILTERED corpus written by gen_data.js (held-out collisions, eval-only values and teacher drops removed)
const trainFile = `${ROOT}build/train_rows.jsonl`;
if (!existsSync(trainFile)) { console.error('no build/train_rows.jsonl (run scripts/gen_data.js first)'); process.exit(1); }
const train = readFileSync(trainFile, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const counts = {};
const totals = {};
for (const r of train) {
  totals[r.intent] = (totals[r.intent] || 0) + 1;
  for (const f of new Set(triggeredFlags(r.text, FAMILY_OF[r.intent]))) ((counts[r.intent] ??= {})[f] = (counts[r.intent][f] || 0) + 1);
}
const explained = {};
for (const [intent, c] of Object.entries(counts)) {
  const fl = Object.entries(c).filter(([, n]) => n / totals[intent] >= 0.05).map(([f]) => f).sort();
  if (fl.length) explained[intent] = fl;
}
writeFileSync(`${ROOT}model/compose_explained.json`, JSON.stringify(explained));
console.log(`model/compose_explained.json: ${Object.keys(explained).length} intents, e.g. hidden_files=${JSON.stringify(explained.hidden_files)} dmesg=${JSON.stringify(explained.dmesg)}`);
console.log(`model/tldr_triggers.json: ${Object.keys(out).length} tools, ${Object.values(out).reduce((a, e) => a + Object.keys(e).length, 0)} flags`);
console.log(JSON.stringify(out.ls), JSON.stringify(out['git log']));
