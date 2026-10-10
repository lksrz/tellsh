#!/usr/bin/env node
// v0.4 before/after report: tables for HYBRID.md (<!-- v04:start/end -->) and EVAL.md (<!-- v04:start/end -->).
// Inputs (aggregate numbers only, committed): hybrid/results/v04_{before,after}{,_ft}.json (eval_hybrid.js results),
// hybrid/results/v04_bench_{before,after}{,_real}.json (bench_hybrid.js), hybrid/results/v04_real_stats.json.
//   node scripts/real/report_v04.js
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const RES = join(ROOT, 'hybrid/results');
const load = (f) => (existsSync(join(RES, f)) ? JSON.parse(readFileSync(join(RES, f), 'utf8')) : null);
const before = load('v04_before.json');
const after = load('v04_after.json');
const beforeFt = load('v04_before_ft.json');
const afterFt = load('v04_after_ft.json');
const st = load('v04_real_stats.json');
const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');

// system rows: [label, results, system key]
const ROWS = [
  ['A v0.3', before, 'A'], ['A v0.4', after, 'A'],
  ['A+B v0.3', before, 'A+B'], ['A+B v0.4', after, 'A+B'],
  ['A+B-safe v0.3', before, 'A+B-safe'], ['A+B-safe v0.4', after, 'A+B-safe'],
  ['B alone v0.3', before, 'B'], ['B alone v0.4', after, 'B'],
  ['A+C-ft v0.3', beforeFt, 'A+C'], ['A+C-ft v0.4', afterFt, 'A+C'],
].filter(([, r, s]) => r?.R?.eval?.[s]);

const get = (r, set, sys) => r?.R?.[set]?.[sys];
const cell = (S, k = 'all', f = 'intent') => (S?.[k] ? pct(S[k][f], S[k].n) : 'n/a');
const bold = (s) => `**${s}**`;

function clsTable(sets) {
  const md = ['| set | system | n | stage 1 tool | stage 2 intent | EN | PL | answered | precision | deferred |', '|---|---|---|---|---|---|---|---|---|---|'];
  for (const [set, label, key = 'all'] of sets) {
    for (const [name, r, sys] of ROWS) {
      const S = get(r, set, sys);
      if (!S?.[key]) continue;
      const a = S[key];
      md.push(`| ${label} | ${name} | ${a.n} | ${pct(a.tool, a.n)} | ${bold(pct(a.intent, a.n))} | ${key === 'all' ? cell(S, 'en') : '–'} | ${key === 'all' ? cell(S, 'pl') : '–'} | ${pct(a.ans, a.n)} | ${pct(a.ansOk, a.ans)} | ${sys === 'A' ? '–' : pct(a.deferred, a.n)} |`);
    }
  }
  return md.join('\n');
}

function realBreakdown() {
  const keys = [['all', 'all'], ['old', 'intents that existed in v0.3'], ['new', 'v0.4 intents'], ['nat', 'natural requests'], ['lit', 'literal commands'],
    ['en', 'EN'], ['pl', 'PL'], ['sh:bash', 'bash'], ['sh:zsh', 'zsh'], ['sh:powershell', 'PowerShell']];
  const sys = ROWS.filter(([, , s]) => s !== 'B');
  const md = [`| subset | n | ${sys.map(([n]) => n).join(' | ')} |`, `|---|---|${sys.map(() => '---').join('|')}|`];
  for (const [k, label] of keys) {
    const n = get(after, 'real', 'A')?.[k]?.n;
    if (!n) continue;
    md.push(`| ${label} | ${n} | ${sys.map(([, r, s]) => cell(get(r, 'real', s), k)).join(' | ')} |`);
  }
  return md.join('\n');
}

function oodTable() {
  const sets = [['ood', '`data/ood_eval`'], ['blind_ood', 'hybrid blind OOD'], ['blind3_ood', 'v0.3 blind OOD'], ['real_ooc', 'real out-of-catalog tasks']];
  const md = [`| system | ${sets.map(([, l]) => l).join(' | ')} |`, `|---|${sets.map(() => '---').join('|')}|`];
  for (const [name, r, sys] of ROWS) {
    md.push(`| ${name} | ${sets.map(([s]) => { const x = get(r, s, sys); return x ? `${pct(x.rej, x.n)} (n=${x.n})` : 'n/a'; }).join(' | ')} |`);
  }
  return md.join('\n');
}

function stage3Table() {
  const md = ['| system | correct-intent rows | slot values filled | found in the real command | real command reproduced exactly |', '|---|---|---|---|---|'];
  for (const [name, r, sys] of ROWS) {
    const S = r?.R?.realSlots?.[sys];
    if (!S) continue;
    md.push(`| ${name} | ${S.n} | ${S.filled} | ${pct(S.found, S.filled)} | ${pct(S.exact, S.n)} |`);
  }
  return md.join('\n');
}

function e2eTable() {
  const sets = [['relex', 'relex `data/eval`'], ['blind', 'hybrid blind'], ['blind3', 'v0.3 blind e2e'], ['devtools', 'v0.4 devtools']];
  const md = [`| system | ${sets.map(([, l]) => l).join(' | ')} |`, `|---|${sets.map(() => '---').join('|')}|`];
  for (const [name, r, sys] of ROWS) {
    md.push(`| ${name} | ${sets.map(([s]) => { const x = r?.R?.e2e?.[s]?.[sys]; return x ? `${pct(x.all[1], x.all[0])} (n=${x.all[0]})` : 'n/a'; }).join(' | ')} |`);
  }
  return md.join('\n');
}

function shellTable() {
  const sh = ['bash', 'zsh', 'sh', 'powershell', 'fish', 'cmd'];
  const md = [`| system | ${sh.map((s) => `data/eval as ${s}`).join(' | ')} | blind (hybrid) bash / zsh / pwsh | devtools bash / zsh / pwsh |`, `|---|${sh.map(() => '---').join('|')}|---|---|`];
  for (const [name, r, sys] of ROWS) {
    const es = r?.R?.evalShells?.[sys];
    const b = get(r, 'blind', sys);
    const d = get(r, 'devtools', sys);
    md.push(`| ${name} | ${sh.map((s) => (es?.[s] != null ? `${(100 * es[s]).toFixed(1)}%` : 'n/a')).join(' | ')} | ${['sh:bash', 'sh:zsh', 'sh:powershell'].map((k) => cell(b, k)).join(' / ')} | ${['sh:bash', 'sh:zsh', 'sh:powershell'].map((k) => cell(d, k)).join(' / ')} |`);
  }
  return md.join('\n');
}

function benchTable() {
  const B = [['v0.3, `data/eval` queries', load('v04_bench_before.json')], ['v0.4, `data/eval` queries', load('v04_bench_after.json')],
    ['v0.3, real-usage queries', load('v04_bench_before_real.json')], ['v0.4, real-usage queries', load('v04_bench_after_real.json')]].filter(([, b]) => b);
  if (!B.length) return '_not measured_';
  const f = (x) => (x ? `${x.p50} / ${x.p95}` : 'n/a');
  const md = ['| run | warm A | warm A+B (deferred) | warm B infer | cold A | cold A+B (deferred) | cold A+B, deferred only | B load ms |', '|---|---|---|---|---|---|---|---|'];
  for (const [label, b] of B) {
    md.push(`| ${label} | ${f(b.warm_A)} | ${f(b.warm_AB_node)} (${b.warm_AB_node ? (100 * b.warm_AB_node.deferred).toFixed(0) : '?'}%) | ${f(b.warm_B_infer_node)} | ${f(b.cold_A)} | ${f(b.cold_AB)} (${b.cold_AB?.deferred ?? '?'}/${b.cold_AB?.n ?? '?'}) | ${f(b.cold_AB_deferred_only)} | ${b.load_B_node_ms ?? 'n/a'} |`);
  }
  return md.join('\n') + `\n\np50 / p95 ms, \`taskset -c 0\` (one core), ${B[0][1].machine}, Node ${B[0][1].node}. Warm: ${B[0][1].warm_A?.n} queries in one process; cold: a new process per query (node start + model load + query), ${B[0][1].cold_A?.n} queries.`;
}

const dataNote = st ? `Real-usage data: ${st.commands} unique generic, verified commands (private; ${st.byLabelSource.pattern} labelled by a command pattern for the v0.4 intents, ` +
  `${st.byLabelSource.dataset} by the dataset's catalog intent, ${st.byLabelSource.outOfCatalog} out of catalog; ${st.droppedCompound} compound commands such as \`sleep 30; cp …\` dropped). ` +
  `Each command has up to 3 EN + 3 PL LLM-written requests. Split by command group (value-masked command skeleton; ${st.groups.eval} of ${st.groups.total} groups held out): ` +
  `train ${st.train.rows} labelled rows (A/B use at most 120 per intent and language), eval ${st.eval.rows} labelled rows (${st.eval.en} EN / ${st.eval.pl} PL; ` +
  `${st.eval.newIntents} on v0.4 intents; ${st.eval.literal} literal commands) + ${st.eval.oocRows} out-of-catalog rows.` : '';

const body = `### Classification before (v0.3) / after (v0.4) — full pipeline, a rejected request counts as wrong

${clsTable([['eval', '`data/eval` (bash)'], ['shell', '`data/shell/eval`'], ['blind', 'hybrid blind'], ['blind3', 'v0.3 blind'], ['devtools', 'v0.4 devtools (new + neighbours)'], ['real', 'REAL usage (held-out groups)']])}

${dataNote}

### Real usage, by subset (intent accuracy, stage 2)

${realBreakdown()}

### Real usage, stage 3 (slots) for correctly classified requests

${stage3Table()}

"found": the slot value occurs verbatim in the real command (defaults excluded). "Exact": the rendered command equals the real one after
normalisation (real commands often carry extra flags, so this is a lower bound).

### Rejection of out-of-domain / out-of-catalog requests

${oodTable()}

### End-to-end exact command

${e2eTable()}

### Per shell (intent accuracy)

${shellTable()}

### Latency

${benchTable()}
`;

function updateSection(file, name, text) {
  const p = join(ROOT, file);
  let md = readFileSync(p, 'utf8');
  const re = new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`);
  const block = `<!-- ${name}:start -->\n${text.trim()}\n<!-- ${name}:end -->`;
  md = re.test(md) ? md.replace(re, () => block) : `${md.trimEnd()}\n\n${block}\n`;
  writeFileSync(p, md);
}
updateSection('HYBRID.md', 'v04', body);
updateSection('EVAL.md', 'v04', body);
console.log(body);
