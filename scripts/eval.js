#!/usr/bin/env node
// Evaluation of the v0.2 cascade. Writes the eval section of EVAL.md.
//   1. per-stage accuracy on data/eval (held-out, never trained on): tool top-1/top-3, intent top-1/top-3,
//      answered / precision, per language
//   2. per shell: intent accuracy on data/eval under each shell context + data/shell/eval.jsonl
//      (shell-specific phrasing), render coverage and syntax validity (bash -n / sh -n)
//   3. slot F1 on data/slots/gold.jsonl (hand-annotated) for tagger / regex / merged, per type
//   4. end-to-end exact command: test/slot-cases.js (hand-written) and a relexicalised copy of data/eval
//      (values from held-out pools, gold command rendered from the inserted values)
//   5. history reference cases (data/history/eval.jsonl)
//   6. second pass / composer on out-of-catalogue requests (data/compose/eval.jsonl)
//   7. OOD rejection (data/ood_eval.jsonl)
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { getModel } from '../src/model.js';
import { cascade } from '../src/cascade.js';
import { suggest, resolveWithTagger } from '../src/pipeline.js';
import { buildCommand, resolveSlots, finalizeSlots } from '../src/fill.js';
import { exFromSpans, normPath, normExt, normNum } from '../src/tagger.js';
import { extractSlots } from '../src/slots.js';
import { BY_ID } from '../src/catalog.js';
import { FAMILY_OF, SLOT_TAG, TAG_TYPES } from '../src/tools.js';
import { envFeatures } from '../src/env.js';
import { SLOT_CASES } from '../test/slot-cases.js';
import { silverSpans, relex, mulberry32 } from './lib/silver.js';
import { sameCmd } from './lib/cmdnorm.js';
import { updateSection } from './report.js';
import { pwshParses } from './lib/pwsh_parse.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const VERBOSE = process.argv.includes('--verbose');
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const readDir = (d) => readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f)));
const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
const model = getModel();
const thr = model.thresholds.accept;
const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const ENVS = {
  bash: BASH, zsh: { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, sh: { shell: 'sh', os: 'linux', coreutils: 'gnu' },
  powershell: { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, fish: { shell: 'fish', os: 'linux', coreutils: 'gnu' },
  cmd: { shell: 'cmd', os: 'win32', coreutils: 'gnu' },
};
const out = [];
const md = (s = '') => out.push(s);
const t0 = Date.now();

// ------------------------------------------------------------------------------------------
// 1. classification per stage
const evalRows = readDir(join(ROOT, 'data', 'eval'));
function clsStats(rows, env, extraFn = () => []) {
  const S = {};
  const conf = new Map();
  const per = new Map();
  const bump = (k, f) => { S[k] ??= { n: 0, tool1: 0, tool3: 0, top1: 0, top3: 0, ans: 0, ansOk: 0 }; S[k][f]++; };
  for (const r of rows) {
    const c = cascade(r.text, { model, extras: [...envFeatures(r.shell ? { shell: r.shell, os: r.os } : env), ...extraFn(r)] });
    const fam = FAMILY_OF[r.intent];
    const ok = c.intent === r.intent;
    for (const k of ['all', r.lang]) {
      bump(k, 'n');
      if (c.topTool === fam) bump(k, 'tool1');
      if (c.tools.some((t) => t.tool === fam)) bump(k, 'tool3');
      if (ok) bump(k, 'top1');
      if (c.top.slice(0, 3).some((t) => t.intent === r.intent)) bump(k, 'top3');
      if (c.confidence >= thr) { bump(k, 'ans'); if (ok) bump(k, 'ansOk'); }
    }
    const pi = per.get(r.intent) || { n: 0, ok: 0 };
    pi.n++; if (ok) pi.ok++;
    per.set(r.intent, pi);
    if (!ok) { const key = `${r.intent} → ${c.intent}`; conf.set(key, (conf.get(key) || 0) + 1); if (VERBOSE) console.log(`  ✗ [${r.intent} → ${c.intent} ${(c.confidence * 100).toFixed(0)}%] ${r.text}`); }
  }
  return { S, conf, per };
}
const C1 = clsStats(evalRows, BASH);
const row = (k, s) => `| ${k} | ${s.n} | ${pct(s.tool1, s.n)} | ${pct(s.tool3, s.n)} | ${pct(s.top1, s.n)} | ${pct(s.top3, s.n)} | ${pct(s.ans, s.n)} | ${pct(s.ansOk, s.ans)} |`;
const modelSize = statSync(join(ROOT, 'model', 'model.bin')).size;
const intentModels = Object.keys(model.models).filter((k) => k.startsWith('intent:'));
const tm = model.models.tool;
const tg = model.models.tagger;
md('## Model');
md();
md(`\`model/model.bin\` **${(modelSize / 1e6).toFixed(2)} MB** (int8 weights, TSH2): stage 1 tool model ${tm.rowIds.length} rows × ${tm.labels.length} classes ` +
  `(${tm.labels.length - 1} tool families + \`__none__\`), ${intentModels.length} stage-2 intent models ` +
  `(${intentModels.reduce((a, k) => a + model.models[k].rowIds.length * model.models[k].labels.length, 0)} weights), ` +
  `tagger ${tg.rowIds.length} rows × ${tg.labels.length} BIO labels. Trained ${model.trained} on ${model.n_rows} classifier rows ` +
  `and ${model.n_tag_seqs} tagged sequences. Thresholds: accept **${model.thresholds.accept}** (cascade score), compose **${model.thresholds.compose}** (stage-1 tool p). ` +
  `Internal holdout during training: tool top-1 ${(model.holdout.tool_top1 * 100).toFixed(1)}%, top-3 ${(model.holdout.tool_top3 * 100).toFixed(1)}%, intent ${(model.holdout.intent_acc * 100).toFixed(1)}%.`);
md();
md('## 1. Cascade accuracy per stage (held-out `data/eval`, shell=bash os=linux)');
md();
md(`${evalRows.length} sentences written independently of the training data (training sentences colliding with any eval set are dropped by \`gen_data.js\`).`);
md('Stage 1 = tool family (top-1 / top-3); stage 2 = intent after p(tool)·p(intent|tool) over the top-3 tools.');
md();
md('| split | n | tool top-1 | tool top-3 | intent top-1 | intent top-3 | answered (p ≥ thr) | precision when answered |');
md('|---|---|---|---|---|---|---|---|');
for (const k of ['all', 'en', 'pl']) md(row(k.toUpperCase(), C1.S[k]));
md();
const worst = [...C1.per.entries()].map(([k, v]) => [k, v.ok / v.n, v.n]).sort((a, b) => a[1] - b[1]).slice(0, 8);
md('Weakest intents: ' + worst.map(([k, a, n]) => `${k} ${(a * 100).toFixed(0)}% (n=${n})`).join(', ') + '.');
md('Top confusions: ' + [...C1.conf.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => `${k} ×${v}`).join(', ') + '.');
md();

// ------------------------------------------------------------------------------------------
// 2. per shell
const shellEval = readJsonl(join(ROOT, 'data', 'shell', 'eval.jsonl'));
const hasBin = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
const syntaxCheck = (cmd, shell) => {
  if (shell === 'bash' || shell === 'zsh') return spawnSync('bash', ['-n', '-c', cmd]).status === 0;
  if (shell === 'sh') return spawnSync('sh', ['-n', '-c', cmd]).status === 0;
  if (shell === 'fish' && hasBin('fish')) return spawnSync('fish', ['-n', '-c', cmd]).status === 0;
  if (shell === 'powershell' && hasBin('pwsh')) return pwshParses(cmd); // parse only, never runs cmd
  return null;
};
md('## 2. Per shell');
md();
md('Intent accuracy of the same held-out set under each shell/OS context (the `shell=` / `os=` tokens are classifier features),');
md('plus `data/shell/eval.jsonl`: requests phrased by users of that shell (cmdlet names, `dir /s`, Windows paths, …).');
md('*rendered*: share of eval intents with a native rendering for that shell; *syntax ok*: renders that pass `bash -n` (bash, zsh) / `sh -n` (dash; sh) ' +
  '/ `fish -n` / PowerShell parser — n/a when that shell is not installed here.');
md();
md('| shell (os) | data/eval intent top-1 | shell-phrased n | shell-phrased intent top-1 (EN / PL) | rendered | syntax ok |');
md('|---|---|---|---|---|---|');
const shellRes = {};
for (const [sh, env] of Object.entries(ENVS)) {
  const cs = sh === 'bash' ? C1 : clsStats(evalRows, env);
  const se = shellEval.filter((r) => r.shell === sh);
  const ss = clsStats(se, env);
  // render each eval sentence's gold intent with the extracted slots for this shell
  let rendered = 0;
  let checked = 0;
  let synOk = 0;
  const seen = new Set();
  for (const r of evalRows) {
    if (seen.has(r.intent)) continue;
    seen.add(r.intent);
    const b = buildCommand(r.intent, r.text, { env });
    if (b.gap || !b.command) continue;
    rendered++;
    if (b.missing.length) continue;
    const ok = syntaxCheck(b.command, sh);
    if (ok == null) continue;
    checked++;
    if (ok) synOk++; else if (VERBOSE) console.log(`  syntax ✗ ${sh}: ${b.command}`);
  }
  shellRes[sh] = { acc: cs.S.all.top1 / cs.S.all.n, rendered, n: seen.size, checked, synOk };
  const s = ss.S.all;
  md(`| ${sh} (${env.os}${env.coreutils === 'bsd' ? ', BSD' : ''}) | ${pct(cs.S.all.top1, cs.S.all.n)} | ${s ? s.n : 0} | ${s ? `${pct(s.top1, s.n)} (${pct(ss.S.en?.top1 || 0, ss.S.en?.n || 0)} / ${pct(ss.S.pl?.top1 || 0, ss.S.pl?.n || 0)})` : 'n/a'} | ${rendered}/${seen.size} | ${checked ? `${synOk}/${checked}` : 'n/a (not installed)'} |`);
}
md();

// ------------------------------------------------------------------------------------------
// 3. slot F1 (hand-annotated gold)
const gold = readJsonl(join(ROOT, 'data', 'slots', 'gold.jsonl'));
function typedValue(type, text) {
  const t = String(text).replace(/^["'„“`](.*)["'”`]$/s, '$1').trim();
  switch (type) {
    case 'PATH': return normPath(t);
    case 'NUM': return normNum(t);
    case 'SIZE': return extractSlots(t).size ?? null;
    case 'TIME': return extractSlots(t).duration?.minutes ?? null;
    case 'EXT': return normExt(t);
    case 'PORT': case 'PID': { const n = parseInt(t.replace(/^\D+/, ''), 10); return Number.isFinite(n) ? n : null; }
    case 'HOST': return t.toLowerCase().replace(/^.*@/, '');
    default: return t.toLowerCase();
  }
}
// resolved slots -> typed values (same normalisation for every system)
function typedFromSlots(slots) {
  const out = [];
  for (const [k, v] of Object.entries(slots)) {
    if (v == null) continue;
    let type = SLOT_TAG[k];
    if (!type || k === 'since' || k === 'days' || k === 'glob') continue; // age carries TIME, ext/glob once
    let val;
    if (k === 'age') val = (() => { const m = String(v).match(/^-m(min|time) -(\d+)$/); return m ? (m[1] === 'min' ? +m[2] : +m[2] * 1440) : null; })();
    else if (type === 'PATH') val = normPath(String(v)) ?? String(v);
    else if (type === 'NUM' || type === 'PORT' || type === 'PID') val = +v;
    else if (type === 'HOST') val = String(v).toLowerCase().replace(/^.*@/, '');
    else val = String(v).toLowerCase();
    if (k === 'target' && String(v).includes('@')) out.push(['USER', String(v).split('@')[0].toLowerCase()]);
    out.push([type, val]);
  }
  if (slots.glob) out.push(['EXT', String(slots.glob).replace(/^\*\./, '').toLowerCase()]);
  if (slots.age == null && slots.days != null && slots.since) out.push(['TIME', +slots.days * 1440]);
  return out;
}
function f1(goldSets, predSets) {
  const per = {};
  let tp = 0; let fp = 0; let fn = 0;
  goldSets.forEach((g, i) => {
    const p = [...predSets[i]];
    for (const [t, v] of g) {
      per[t] ??= { tp: 0, fp: 0, fn: 0 };
      const j = p.findIndex(([pt, pv]) => pt === t && String(pv) === String(v));
      if (j >= 0) { tp++; per[t].tp++; p.splice(j, 1); } else { fn++; per[t].fn++; }
    }
    for (const [t] of p) { fp++; per[t] ??= { tp: 0, fp: 0, fn: 0 }; per[t].fp++; }
  });
  const F = (a) => { const pr = a.tp / (a.tp + a.fp || 1); const rc = a.tp / (a.tp + a.fn || 1); return pr + rc ? (2 * pr * rc) / (pr + rc) : 0; };
  return { f1: F({ tp, fp, fn }), p: tp / (tp + fp || 1), r: tp / (tp + fn || 1), per: Object.fromEntries(Object.entries(per).map(([k, a]) => [k, { ...a, f1: F(a) }])) };
}
const goldTyped = [];
const sys = { tagger: [], regex: [], merge: [] };
for (const r of gold) {
  const it = BY_ID[r.intent];
  // gold: annotated spans restricted to what the intent can use (others cannot be scored for any system)
  const gslots = resolveSlots(it, exFromSpans(r.text, r.spans.map(([type, text]) => {
    const start = r.text.indexOf(text);
    return { type, start, end: start + text.length, text };
  })));
  goldTyped.push(typedFromSlots(finalizeSlots(it, gslots)));
  for (const mode of ['tagger', 'regex', 'merge']) sys[mode].push(typedFromSlots(resolveWithTagger(r.intent, r.text, { model, mode }).slots));
}
const F = Object.fromEntries(Object.entries(sys).map(([k, v]) => [k, f1(goldTyped, v)]));
const goldLang = (lang) => gold.map((r, i) => (r.lang === lang ? i : -1)).filter((i) => i >= 0);
const fLang = (mode, lang) => { const ix = goldLang(lang); return f1(ix.map((i) => goldTyped[i]), ix.map((i) => sys[mode][i])).f1; };
md('## 3. Slot filling (stage 3)');
md();
md(`\`data/slots/gold.jsonl\`: ${gold.length} hand-annotated requests (${goldLang('en').length} EN / ${goldLang('pl').length} PL), gold intent given. ` +
  'Spans are mapped onto the slots the intent uses and compared as normalised typed values (paths after location mapping, sizes in find units, durations in minutes, …).');
md();
md('| slot method | precision | recall | F1 | F1 EN | F1 PL |');
md('|---|---|---|---|---|---|');
for (const [k, v] of Object.entries(F)) md(`| ${k === 'merge' ? '**tagger + regex fallback (shipped)**' : k === 'tagger' ? 'BIO tagger only' : 'regex only (v0.1)'} | ${(v.p * 100).toFixed(1)}% | ${(v.r * 100).toFixed(1)}% | ${(v.f1 * 100).toFixed(1)}% | ${(fLang(k, 'en') * 100).toFixed(1)}% | ${(fLang(k, 'pl') * 100).toFixed(1)}% |`);
md();
md('Per type F1 (tagger only / regex only / merged): ' + TAG_TYPES.filter((t) => F.merge.per[t]).map((t) =>
  `${t} ${(F.tagger.per[t]?.f1 * 100 || 0).toFixed(0)}/${(F.regex.per[t]?.f1 * 100 || 0).toFixed(0)}/${(F.merge.per[t].f1 * 100).toFixed(0)}`).join(', ') + '.');
md();

// ------------------------------------------------------------------------------------------
// 4. end-to-end exact command
const slotCase = { merge: 0, tagger: 0, regex: 0 };
const slotFails = [];
for (const [intent, q, expected] of SLOT_CASES) {
  for (const mode of Object.keys(slotCase)) {
    const got = buildCommand(intent, q, { env: BASH, resolved: resolveWithTagger(intent, q, { model, mode }).slots }).command;
    if (got === expected) slotCase[mode]++; else if (mode === 'merge') slotFails.push({ intent, q, expected, got });
  }
}
// relexicalised held-out eval: values from the held-out pools, gold command rendered from the inserted spans
const rng = mulberry32(7);
const e2e = { all: { n: 0, ok: 0, okGoldIntent: 0 }, en: { n: 0, ok: 0, okGoldIntent: 0 }, pl: { n: 0, ok: 0, okGoldIntent: 0 } };
const e2eFails = [];
for (const r of evalRows) {
  const { spans } = silverSpans(r.text, r.intent);
  if (!spans.length) continue;
  const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'eval', keepProb: 0 });
  const it = BY_ID[r.intent];
  const goldSlots = finalizeSlots(it, resolveSlots(it, exFromSpans(rx.text, rx.spans.map((s) => ({ ...s, text: rx.text.slice(s.start, s.end) })))));
  // regex-only values the silver labeler did not mark (e.g. defaults) are not part of the gold
  const goldCmd = buildCommand(r.intent, rx.text, { env: BASH, resolved: goldSlots }).command;
  const s = suggest(rx.text, { env: BASH, model, compose: 'off' });
  const okGi = buildCommand(r.intent, rx.text, { env: BASH, resolved: resolveWithTagger(r.intent, rx.text, { model }).slots }).command === goldCmd;
  for (const k of ['all', r.lang]) {
    e2e[k].n++;
    if (s.understood && s.command === goldCmd) e2e[k].ok++;
    if (okGi) e2e[k].okGoldIntent++;
  }
  if (!(s.understood && s.command === goldCmd) && e2eFails.length < 400) e2eFails.push({ text: rx.text, gold: goldCmd, got: s.command, intent: r.intent, pred: s.intent });
}
md('## 4. End-to-end exact command (bash, linux)');
md();
md(`* \`test/slot-cases.js\` (${SLOT_CASES.length} hand-written request → command pairs, gold intent): ` +
  `**${slotCase.merge}/${SLOT_CASES.length}** shipped (tagger + regex fallback), ${slotCase.tagger}/${SLOT_CASES.length} tagger only, ${slotCase.regex}/${SLOT_CASES.length} regex only.`);
md(`* Relexicalised \`data/eval\` (${e2e.all.n} requests that contain slot values; every value replaced from a *held-out* value pool never used in training; ` +
  'gold command rendered from the inserted spans; full pipeline incl. classification):');
md();
md('| split | n | exact command (full pipeline) | exact command given gold intent |');
md('|---|---|---|---|');
for (const k of ['all', 'en', 'pl']) md(`| ${k.toUpperCase()} | ${e2e[k].n} | ${pct(e2e[k].ok, e2e[k].n)} | ${pct(e2e[k].okGoldIntent, e2e[k].n)} |`);
md();

// ------------------------------------------------------------------------------------------
// 5. history
const hist = readJsonl(join(ROOT, 'data', 'history', 'eval.jsonl'));
const H = { all: { n: 0, intent: 0, cmd: 0, noHist: 0 }, en: { n: 0, intent: 0, cmd: 0, noHist: 0 }, pl: { n: 0, intent: 0, cmd: 0, noHist: 0 } };
const histFails = [];
for (const r of hist) {
  const s = suggest(r.query, { env: BASH, model, history: r.history, compose: 'off' });
  const s0 = suggest(r.query, { env: BASH, model, compose: 'off' });
  for (const k of ['all', r.lang]) {
    H[k].n++;
    if (s.intent === r.expect_intent) H[k].intent++;
    if (s.command === r.expect_command) H[k].cmd++;
    if (s0.command === r.expect_command) H[k].noHist++;
  }
  if (s.command !== r.expect_command) histFails.push({ q: r.query, h: r.history.slice(-2), exp: r.expect_command, got: s.command, rule: s.context?.rule });
}
md('## 5. History references (`data/history/eval.jsonl`)');
md();
md('"delete it" / "usuń to", "same for /var" / "to samo dla /var", "logs of that container" / "logi tego kontenera", "kill it", … with the last shell-history lines given (raw commands and earlier `tellsh` queries).');
md();
md('| split | n | intent | exact command | exact command without history |');
md('|---|---|---|---|---|');
for (const k of ['all', 'en', 'pl']) md(`| ${k.toUpperCase()} | ${H[k].n} | ${pct(H[k].intent, H[k].n)} | ${pct(H[k].cmd, H[k].n)} | ${pct(H[k].noHist, H[k].n)} |`);
md();
md('*Development note:* this set was written independently of the rules, but it was then used while developing them: the first ' +
  '(blind) run scored **60.4%** exact; the failures led to general fixes (more Polish pronoun forms, `ps -p`/`wget` entities, ' +
  'blame/extract verbs, "same but …", implicit required-slot fill). The number above is therefore not a blind score.');
md();
md('*Review fixes:* history lines are now split with a shell-aware tokenizer (`a\\ b.txt`, quoted `;`/`|`, PowerShell `\'\'`/backtick escapes, ' +
  'native cmdlets such as `Get-Content -LiteralPath`), and a reference whose latest value depends on the shell state (`$F`, `*.txt`, ' +
  'unparseable or unknown-command lines) is refused (placeholder) instead of falling back to an older value. Two gold commands ' +
  '(`kill_by_port`) were updated for the `-sTCP:LISTEN` fix; no other row changed.');
md();

// ------------------------------------------------------------------------------------------
// 6. composer
const comp = readJsonl(join(ROOT, 'data', 'compose', 'eval.jsonl'));
const CP = { all: { n: 0, composed: 0, exact: 0, acc: 0, e2eAcc: 0 }, en: { n: 0, composed: 0, exact: 0, acc: 0, e2eAcc: 0 }, pl: { n: 0, composed: 0, exact: 0, acc: 0, e2eAcc: 0 } };
const compFails = [];
for (const r of comp) {
  const s = suggest(r.text, { env: BASH, model });
  const cands = [r.gold, ...(r.acceptable || [])];
  const isComposed = s.method === 'composed';
  const exact = isComposed && sameCmd(s.command, r.gold);
  const acc = isComposed && cands.some((c) => sameCmd(s.command, c));
  const e2eAcc = s.understood && cands.some((c) => sameCmd(s.command, c));
  for (const k of ['all', r.lang]) {
    CP[k].n++;
    if (isComposed) CP[k].composed++;
    if (exact) CP[k].exact++;
    if (acc) CP[k].acc++;
    if (e2eAcc) CP[k].e2eAcc++;
  }
  if (!e2eAcc) compFails.push({ q: r.text, gold: r.gold, got: s.understood ? s.command : '(not understood)', method: s.method });
}
let falseCompose = 0;
for (const r of evalRows) if (suggest(r.text, { env: BASH, model }).method === 'composed') falseCompose++;
md('## 6. Second pass: experimental composer (`data/compose/eval.jsonl`)');
md();
md(`${comp.length} out-of-catalogue requests (a tool with a flag combination that no catalog template has), written independently of the composer vocabulary. ` +
  'Commands are compared after shell unquoting with only behaviour-preserving normalisation: option bundling/order for ordinary ' +
  'commands (`ls -ltr` = `ls -l -t -r`, `head -n5` = `head -5`); argument boundaries, case (`-name` ≠ `-iname`), find\'s expression order, ' +
  'redirections and pipeline separators must match. *exact* = the gold command, *acceptable* = gold or a listed alternative. ' +
  '(Before the review the comparison lowercased find predicates and mapped `-iname` to `-name`; that credited one catalog answer: ' +
  '"any answer acceptable" was 33.3%, now 31.4%.)');
md();
md('| split | n | composer fired | composed exact | composed acceptable | any answer acceptable (catalog or composed) |');
md('|---|---|---|---|---|---|');
for (const k of ['all', 'en', 'pl']) md(`| ${k.toUpperCase()} | ${CP[k].n} | ${pct(CP[k].composed, CP[k].n)} | ${pct(CP[k].exact, CP[k].n)} | ${pct(CP[k].acc, CP[k].n)} | ${pct(CP[k].e2eAcc, CP[k].n)} |`);
md();
md('*Development note:* the flag vocabulary was written before looking at this set; the first (blind) run fired on 11.8% ' +
  'and was acceptable on **3.9%**. After inspecting the failures, general fixes were made (firing on unexplained modifiers, ' +
  'value flags, tar compression from the archive name, the data-driven explained-flag table) — the numbers above include them.');
md();
md(`False fires on in-catalogue requests (\`data/eval\`, composer replaced a catalog answer): **${pct(falseCompose, evalRows.length)}** (${falseCompose}/${evalRows.length}).`);
md();

// ------------------------------------------------------------------------------------------
// 7. OOD
const ood = readJsonl(join(ROOT, 'data', 'ood_eval.jsonl'));
const oodLang = { en: [0, 0], pl: [0, 0] };
let rejected = 0;
for (const r of ood) {
  const s = suggest(r.text, { env: BASH, model });
  const rej = !s.understood;
  if (rej) rejected++;
  oodLang[r.lang] ??= [0, 0];
  oodLang[r.lang][0]++;
  if (rej) oodLang[r.lang][1]++;
  else if (VERBOSE) console.log(`  OOD accepted: ${r.text} -> ${s.command}`);
}
md('## 7. Out-of-domain rejection (`data/ood_eval.jsonl`)');
md();
md(`**${pct(rejected, ood.length)}** (${rejected}/${ood.length}) answered "I don't understand" (EN ${pct(oodLang.en[1], oodLang.en[0])}, PL ${pct(oodLang.pl[1], oodLang.pl[0])}), including the composer path.`);

updateSection('eval', out.join('\n'));
const s = C1.S.all;
console.log(`stage1 tool top1=${pct(s.tool1, s.n)} top3=${pct(s.tool3, s.n)} | intent top1=${pct(s.top1, s.n)} (EN ${pct(C1.S.en.top1, C1.S.en.n)} PL ${pct(C1.S.pl.top1, C1.S.pl.n)}) answered=${pct(s.ans, s.n)} prec=${pct(s.ansOk, s.ans)}`);
console.log('per shell: ' + Object.entries(shellRes).map(([k, v]) => `${k} ${(v.acc * 100).toFixed(1)}% render ${v.rendered}/${v.n} syntax ${v.checked ? v.synOk + '/' + v.checked : 'n/a'}`).join(' | '));
console.log(`slot F1 merge=${(F.merge.f1 * 100).toFixed(1)} tagger=${(F.tagger.f1 * 100).toFixed(1)} regex=${(F.regex.f1 * 100).toFixed(1)} | slot-cases merge ${slotCase.merge}/${SLOT_CASES.length} tagger ${slotCase.tagger} regex ${slotCase.regex}`);
console.log(`e2e relex exact=${pct(e2e.all.ok, e2e.all.n)} (gold intent ${pct(e2e.all.okGoldIntent, e2e.all.n)}) | history cmd=${pct(H.all.cmd, H.all.n)} | compose fired=${pct(CP.all.composed, CP.all.n)} exact=${pct(CP.all.exact, CP.all.n)} acceptable=${pct(CP.all.acc, CP.all.n)} anyAcc=${pct(CP.all.e2eAcc, CP.all.n)} falseFire=${falseCompose} | OOD rejected=${pct(rejected, ood.length)}`);
if (VERBOSE) {
  for (const f of slotFails) console.log(`  slot-case ✗ ${f.intent}: ${f.q}\n      got ${f.got}\n      exp ${f.expected}`);
  for (const f of histFails) console.log(`  hist ✗ ${f.q} [${f.h.join(' ; ')}] rule=${f.rule}\n      got ${f.got}\n      exp ${f.exp}`);
  for (const f of compFails) console.log(`  comp ✗ (${f.method}) ${f.q}\n      got ${f.got}\n      exp ${f.gold}`);
  for (const f of e2eFails.slice(0, 60)) console.log(`  e2e ✗ [${f.intent}→${f.pred}] ${f.text}\n      got ${f.got}\n      exp ${f.gold}`);
}
console.log(`wrote EVAL.md (eval section) in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
