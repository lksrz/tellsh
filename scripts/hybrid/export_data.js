#!/usr/bin/env node
// Export raw-text training data for the hybrid neural models (B: encoder, C: LM reranker).
// Mirrors scripts/gen_data.js (same sources, same held-out filter, same teacher decisions, same silver spans and
// relexicalisation) but writes text + char-offset spans instead of hashed features.
//
//   build/hybrid/train.jsonl  {text, tool, intent, lang, shell, os, spans:[[type,start,end]], gid, src, split}
//     split = 'dev' for ~10% of the base sentence groups (all copies of a sentence stay on one side); dev rows are
//     never used to fit B/C and serve to calibrate the hybrid thresholds.
//   build/hybrid/meta.json    {tools, intents, intentTool, tagLabels}
//   build/hybrid/dev_texts.json  every normalized dev text (train rows with one of these texts are dropped)
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { INTENTS } from '../../src/catalog.js';
import { FAMILIES, FAMILY_OF, NONE, TAG_TYPES } from '../../src/tools.js';
import { normalize, fnv1a } from '../../src/features.js';
import { silverSpans, relex, mulberry32 } from '../lib/silver.js';
import { exclusionIndex } from '../lib/heldout.js';
import { writePrivate } from '../lib/privwrite.js';
import { readReal, realTrain } from '../real/real_rows.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const OUT = join(ROOT, 'build', 'hybrid');
const rng = mulberry32(29);
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);

const SHELL_P = [['bash', 0.35], ['zsh', 0.25], ['sh', 0.07], ['powershell', 0.18], ['fish', 0.08], ['cmd', 0.07]];
function sampleEnv() {
  let s = 'bash';
  let r = rng();
  for (const [k, p] of SHELL_P) { if ((r -= p) <= 0) { s = k; break; } }
  let os;
  if (s === 'cmd') os = 'win32';
  else if (s === 'powershell') os = rng() < 0.7 ? 'win32' : rng() < 0.5 ? 'linux' : 'darwin';
  else if (s === 'zsh') os = rng() < 0.6 ? 'darwin' : 'linux';
  else os = rng() < 0.7 ? 'linux' : 'darwin';
  return { shell: s, os };
}
function typo(text) {
  const chars = [...text];
  const idxs = chars.map((c, i) => (/\p{L}/u.test(c) ? i : -1)).filter((i) => i >= 0);
  if (idxs.length < 4) return text;
  const i = idxs[1 + Math.floor(rng() * (idxs.length - 2))];
  const op = rng();
  if (op < 0.4) chars.splice(i, 1);
  else if (op < 0.8 && /\p{L}/u.test(chars[i + 1] || '')) [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
  else chars.splice(i, 0, chars[i]);
  return chars.join('');
}
// typo() shifts offsets, so only the clean / relexicalised copies carry spans
export const isDev = (text) => fnv1a('dev:' + normalize(text)) % 10 === 0;

/**
 * The row sink: every emitted row is checked against the held-out index, not only the originals. A typo or
 * relexicalised copy can be exactly a held-out text ("kill all node processes", "koniec pliku /var/log/syslog").
 */
export function heldOutFilter(heldOut) {
  const out = { rows: [], dropped: 0 };
  out.push = (o) => { if (heldOut.has(o.text)) out.dropped++; else out.rows.push(o); };
  return out;
}

function main() {
  mkdirSync(OUT, { recursive: true });
  const ids = new Set(INTENTS.map((i) => i.id));
  // the same held-out index as gen_data.js (eval / blind sets, near-duplicates, eval-only values, real-usage eval split)
  const real = process.argv.includes('--no-real') ? [] : readReal(ROOT);
  const excl = exclusionIndex(ROOT);
  const heldOut = { has: (n) => excl.has(n) };
  const intentRows = [...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'train.jsonl'))].map((r) => ({ ...r, src: 'intents' }));
  const shellRows = readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell' }));
  // template-generated real rows: TELLSH_TMPL_W multiplier (same meaning as gen_data.js; default 1 = no extra down-weighting)
  const TW = Number.isFinite(parseFloat(process.env.TELLSH_TMPL_W)) ? parseFloat(process.env.TELLSH_TMPL_W) : 1;
  const tw = (r) => (r.tmpl && TW !== 1 ? { w: TW } : {});
  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl')).filter((d) => d.text && d.field !== 'risk');
  const decide = new Map(decisions.map((d) => [normalize(d.text), d]));
  const seen = new Set();
  const base = [];
  const realRows = realTrain(real, ids);
  for (const r0 of [...intentRows, ...shellRows, ...realRows]) {
    if (!ids.has(r0.intent)) throw new Error(`unknown intent ${r0.intent}`);
    const n = normalize(r0.text);
    if (heldOut.has(r0.text)) continue;
    const d = decide.get(n);
    if (d?.action === 'drop') continue;
    const r = d?.action === 'relabel' && d.intent ? { ...r0, intent: d.intent } : r0;
    const key = n + '|' + r.intent + '|' + (r.shell || '');
    if (seen.has(key)) continue;
    seen.add(key);
    base.push(r);
  }
  const out = heldOutFilter(heldOut);
  const { rows, push } = out;
  let gid = 0;
  for (const r of base) {
    const g = gid++;
    const tool = FAMILY_OF[r.intent];
    const split = isDev(r.text) ? 'dev' : 'train';
    const env = () => (r.shell ? { shell: r.shell, os: r.os || 'linux' } : sampleEnv());
    const { spans } = silverSpans(r.text, r.intent);
    const sp = (s) => s.map((x) => [x.type, x.start, x.end]);
    push({ text: r.text, tool, intent: r.intent, lang: r.lang, ...env(), spans: sp(spans), gid: g, src: r.src, split, kind: 'orig', ...tw(r) });
    push({ text: typo(r.text), tool, intent: r.intent, lang: r.lang, ...env(), spans: null, gid: g, src: r.src, split, kind: 'typo', ...tw(r) });
    for (let k = 0; k < 2; k++) {
      const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'train' });
      if (rx.text !== r.text) push({ text: rx.text, tool, intent: r.intent, lang: r.lang, ...env(), spans: sp(rx.spans), gid: g, src: r.src, split, kind: 'relex', ...tw(r) });
    }
  }
  // tldr descriptions: tool label only (intent ''), capped per family/lang as in gen_data
  const tldr = readJsonl(join(ROOT, 'data', 'tldr', 'tools.jsonl'));
  const cap = {};
  for (const r of tldr.sort(() => rng() - 0.5)) {
    if (!FAMILIES[r.tool] || !r.text || r.text.length < 8 || heldOut.has(r.text)) continue;
    const key = r.tool + r.lang;
    if ((cap[key] = (cap[key] || 0) + 1) > (r.lang === 'pl' ? 60 : 80)) continue;
    const win = /^windows\//.test(r.page || '');
    push({ text: r.text, tool: r.tool, intent: '', lang: r.lang, ...(win ? { shell: 'powershell', os: 'win32' } : sampleEnv()), spans: null, gid: gid++, src: 'tldr', split: isDev(r.text) ? 'dev' : 'train', kind: 'orig' });
  }
  for (const r of readJsonl(join(ROOT, 'data', 'ood.jsonl'))) {
    if (heldOut.has(r.text)) continue;
    const g = gid++;
    const split = isDev(r.text) ? 'dev' : 'train';
    push({ text: r.text, tool: NONE, intent: '', lang: r.lang, ...sampleEnv(), spans: [], gid: g, src: 'ood', split, kind: 'orig' });
    push({ text: typo(r.text), tool: NONE, intent: '', lang: r.lang, ...sampleEnv(), spans: [], gid: g, src: 'ood', split, kind: 'typo' });
  }
  // a typo / relexicalised copy (or another source's sentence) on the train side can be exactly a dev text
  // ("policz pliki w /var/log"): the dev split must stay unseen, so such train rows are dropped
  const devTexts = new Set(rows.filter((r) => r.split === 'dev').map((r) => normalize(r.text)));
  const before = rows.length;
  rows.splice(0, rows.length, ...rows.filter((r) => r.split === 'dev' || !devTexts.has(normalize(r.text))));
  writePrivate(join(OUT, 'train.jsonl'), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
  // the complete dev-text index (every emitted dev row, not only texts whose own hash is dev): train_a_dev.sh
  // excludes it from A_dev's training data
  writePrivate(join(OUT, 'dev_texts.json'), JSON.stringify([...devTexts].sort()));
  const meta = {
    tools: [...Object.keys(FAMILIES), NONE],
    intents: INTENTS.map((i) => i.id),
    intentTool: Object.fromEntries(INTENTS.map((i) => [i.id, FAMILY_OF[i.id]])),
    descriptions: Object.fromEntries(INTENTS.map((i) => [i.id, i.description])),
    tagLabels: ['O', ...TAG_TYPES.flatMap((t) => [`B-${t}`, `I-${t}`])],
  };
  writePrivate(join(OUT, 'meta.json'), JSON.stringify(meta, null, 1));
  const c = (f) => rows.filter(f).length;
  console.log(`export_data: ${out.dropped} augmented rows dropped (held-out texts), ${before - rows.length} train rows dropped (dev texts)`);
  console.log(`export_data: ${base.length} base (${base.filter((r) => r.src === 'real').length} real), ${rows.length} rows (train ${c((r) => r.split === 'train')}, dev ${c((r) => r.split === 'dev')}), tldr ${c((r) => r.src === 'tldr')}, ood ${c((r) => r.src === 'ood')}`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
