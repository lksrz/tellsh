#!/usr/bin/env node
// Safety diff between two checkouts: every request whose answer becomes runnable with a higher risk.
//   node scripts/real/gate_diff.js dump --out <file.jsonl> [--root <checkout>] [--real]
//   node scripts/real/gate_diff.js compare <old.jsonl> <new.jsonl> [--show-text]
// dump imports src/pipeline.js and src/catalog.js of --root (default: the cwd), so the same script file can dump an
// older checkout. Inputs: data/eval/*.jsonl, data/eval_v04/*.jsonl, data/blind/*.jsonl, data/ood.jsonl,
// data/ood_eval.jsonl, data/history/*.jsonl and, with --real, the eval split of build/real/rows.jsonl (private: its
// text and commands are written to the dump file only, never printed; compare prints them only with --show-text).
// Each row runs on bash, plus the row's own shell when it names another one.
// runnable = a command is shown, nothing is withheld (missing is empty) and understood !== false.
// risk = the highest of the catalog intent's risk and the rendered risk; a composed or intent-less command is high.
// compare exits 1 when any escalation exists (new runnable and rank(new) > rank(old); non-runnable ranks -1).
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

export const RANK = { safe: 0, medium: 1, high: 2 };
const maxRisk = (a, b) => ((RANK[a] ?? -1) >= (RANK[b] ?? -1) ? a : b);

export function rank(r) { return r && r.runnable ? (RANK[r.risk] ?? 2) : -1; }

// one dump record from a suggest() result
export function record(s, BY_ID, meta) {
  const missing = s?.missing || [];
  const command = s?.command || null;
  const runnable = !!command && !missing.length && s?.understood !== false;
  const intent = s?.intent || null;
  let risk = null;
  if (command) risk = !intent || s.method === 'composed' ? 'high' : maxRisk(BY_ID[intent]?.risk || 'high', s.risk || 'safe');
  return { ...meta, intent, command, method: s?.method || null, missing, risk, runnable };
}

// rows of one file → [{text, history?, shell?, os?}] or null for an unknown shape
function normalize(row) {
  const text = row.query ?? row.text;
  if (typeof text !== 'string') return null;
  const out = { text };
  if (Array.isArray(row.history)) out.history = row.history;
  if (row.shell) out.shell = row.shell;
  if (row.os) out.os = row.os;
  if (row.cwd) out.cwd = row.cwd;
  return out;
}

function inputFiles(root) {
  const dir = (d) => (existsSync(join(root, d)) ? readdirSync(join(root, d)).filter((f) => f.endsWith('.jsonl')).sort().map((f) => join(d, f)) : []);
  return [...dir('data/eval'), ...dir('data/eval_v04'), ...dir('data/blind'), 'data/ood.jsonl', 'data/ood_eval.jsonl', ...dir('data/history')]
    .filter((f) => existsSync(join(root, f)));
}

const readJsonl = (p) => readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));

async function dump(args) {
  const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
  const root = resolve(opt('--root') || process.cwd());
  const out = opt('--out');
  if (!out) { console.error('gate_diff dump: --out <file> is required'); process.exit(2); }
  const { suggest } = await import(pathToFileURL(join(root, 'src/pipeline.js')).href);
  const { BY_ID } = await import(pathToFileURL(join(root, 'src/catalog.js')).href);
  // the input sets are always read from this script's checkout, so both dumps run on identical rows
  const dataRoot = fileURLToPath(new URL('../..', import.meta.url));
  const sets = inputFiles(dataRoot).map((f) => ({ set: f.replace(/^data\//, '').replace(/\.jsonl$/, ''), rows: readJsonl(join(dataRoot, f)) }));
  if (args.includes('--real')) {
    const p = join(dataRoot, 'build/real/rows.jsonl');
    if (!existsSync(p)) { console.error('gate_diff dump: --real but no build/real/rows.jsonl'); process.exit(2); }
    sets.push({ set: 'real/eval', real: true, rows: readJsonl(p).filter((r) => r.split === 'eval') });
  }
  const lines = [];
  for (const { set, real, rows } of sets) {
    let skipped = 0;
    rows.forEach((row, i) => {
      const r = normalize(row);
      if (!r) { skipped++; return; }
      const shells = ['bash', ...(r.shell && r.shell !== 'bash' ? [r.shell] : [])];
      for (const shell of shells) {
        const os = shell === 'bash' ? (r.shell === 'bash' && r.os ? r.os : 'linux') : (r.os || (shell === 'powershell' || shell === 'cmd' ? 'win32' : 'linux'));
        let s;
        try { s = suggest(r.text, { shell, os, ...(r.history ? { history: r.history } : {}), ...(r.cwd ? { cwd: r.cwd } : {}) }); }
        catch (e) { s = { understood: false, command: null, method: 'error', missing: [String(e.message)] }; }
        lines.push(JSON.stringify(record(s, BY_ID, { set, i, shell, real: !!real, text: r.text, ...(r.history ? { history: r.history } : {}) })));
      }
    });
    console.error(`${set}: ${rows.length} rows${skipped ? `, ${skipped} skipped (unknown shape)` : ''}`);
  }
  writeFileSync(out, lines.join('\n') + '\n');
  console.error(`gate_diff: ${lines.length} records → ${relative(process.cwd(), out) || out} (root ${root})`);
}

// pure: joins two dumps by (set, i, shell) and classifies every pair
export function compareDumps(oldRecs, newRecs) {
  const key = (r) => `${r.set}\0${r.i}\0${r.shell}`;
  const olds = new Map(oldRecs.map((r) => [key(r), r]));
  const perSet = {};
  const escalations = [], swaps = [];
  let unmatched = 0;
  for (const n of newRecs) {
    const o = olds.get(key(n));
    if (!o) { unmatched++; continue; }
    const a = (perSet[n.set] ||= { n: 0, unchanged: 0, changedIntent: 0, becameRunnable: 0, becameWithheld: 0, escalations: 0, swaps: 0 });
    a.n++;
    if (o.intent === n.intent && o.command === n.command && o.runnable === n.runnable) a.unchanged++;
    if (o.intent !== n.intent) a.changedIntent++;
    if (!o.runnable && n.runnable) a.becameRunnable++;
    if (o.runnable && !n.runnable) a.becameWithheld++;
    const ro = rank(o), rn = rank(n);
    if (n.runnable && rn > ro) { a.escalations++; escalations.push({ old: o, new: n }); }
    else if (o.runnable && n.runnable && o.intent !== n.intent && rn === ro && rn >= 1) { a.swaps++; swaps.push({ old: o, new: n }); }
  }
  return { perSet, escalations, swaps, unmatched };
}

function fmt(p, showText) {
  const o = p.old, n = p.new;
  const head = `[${n.set} #${n.i} ${n.shell}] ${o.intent || '-'}(${o.runnable ? o.risk : 'not runnable'}) → ${n.intent || '-'}(${n.risk})`;
  if (n.real && !showText) return head;
  return `${head}\n    q: ${JSON.stringify(n.text)}${n.history ? `  history: ${JSON.stringify(n.history)}` : ''}\n    old: ${o.command ?? '(none)'}${o.missing?.length ? `  [missing: ${o.missing.join(', ')}]` : ''}\n    new: ${n.command}`;
}

function compare(args) {
  const files = args.filter((a) => !a.startsWith('--'));
  if (files.length !== 2) { console.error('gate_diff compare <old.jsonl> <new.jsonl> [--show-text]'); process.exit(2); }
  const showText = args.includes('--show-text');
  const { perSet, escalations, swaps, unmatched } = compareDumps(readJsonl(files[0]), readJsonl(files[1]));
  const cols = ['n', 'unchanged', 'changedIntent', 'becameRunnable', 'becameWithheld', 'escalations', 'swaps'];
  console.log(['set'.padEnd(22), ...cols.map((c) => c.padStart(16))].join(''));
  for (const [s, a] of Object.entries(perSet)) console.log([s.padEnd(22), ...cols.map((c) => String(a[c]).padStart(16))].join(''));
  if (unmatched) console.log(`(${unmatched} new records without an old counterpart)`);
  console.log(`\nESCALATIONS (${escalations.length})`);
  for (const p of escalations) console.log(fmt(p, showText));
  console.log(`\nSAME-RISK INTENT SWAPS (${swaps.length})`);
  for (const p of swaps) console.log(fmt(p, showText));
  process.exitCode = escalations.length ? 1 : 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd, ...rest] = process.argv.slice(2);
  if (cmd === 'dump') await dump(rest);
  else if (cmd === 'compare') compare(rest);
  else { console.error('usage: gate_diff.js dump --out <file> [--root <checkout>] [--real] | compare <old> <new> [--show-text]'); process.exit(2); }
}
