#!/usr/bin/env node
// Re-check the abstention labels (non-ok rows) of an IR dataset. Never modifies the dataset.
//
//   node scripts/ir/relabel_nonok.mjs [--data build/ir/dataset/v1] [--out build/ir/relabel]
//        [--no-model] [--limit N] [--batch 25] [--conc 8] [--model claude-haiku-5-5] [--effort medium]
//
// 1. Consistency pass (no API): each non-ok request is reduced to a template (quoted strings,
//    paths, numbers, identifier-like tokens -> placeholders). If ok rows share the template, the
//    ok row's command is re-instantiated with the non-ok row's values and run through
//    decompile + lift + gate; the contradiction is reported either way.
// 2. Model pass: batches of non-ok rows go to the Anthropic Messages API (key CLAUDE_API_KEY /
//    ANTHROPIC_API_KEY, optional CLAUDE_WORKSPACE_ID; never logged) with a compact pilot-scope
//    description and a JSON-schema output: {label_correct, correct_label, command}. Responses are
//    cached in <out>/model_raw.jsonl, so a rerun only sends missing rows.
// 3. A proposed command only makes the row an ok candidate when the gate accepts it.
// Writes <out>/v1_changes.jsonl ({split, i, request, old_label, new_label, command?, source,
// gate_status, ...}) and <out>/summary.json.
import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { loadSchemas, decompile, gate } from '../../ir/lib/index.js';
import { lift } from '../../ir/lib/lift.js';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const DATA = opt('data', 'build/ir/dataset/v1');
const OUT = opt('out', 'build/ir/relabel');
const BATCH = Number(opt('batch', 25));
const CONC = Math.min(8, Number(opt('conc', 8)));
const LIMIT = Number(opt('limit', Infinity));
const MODEL = opt('model', 'claude-haiku-5-5');
const EFFORT = opt('effort', 'medium');
const NO_MODEL = args.includes('--no-model');
const LABELS = ['ok', 'out_of_scope', 'ambiguous', 'underspecified', 'not_shell'];
mkdirSync(OUT, { recursive: true });

const schemas = loadSchemas();
const PLATFORM = { linux: 'linux_gnu', darwin: 'darwin_bsd' };
const envOf = (row) => ({ schemas, shell: row.shell === 'zsh' ? 'zsh' : 'bash', platform: PLATFORM[row.os] || 'linux_gnu', request: row.request });

// decompile + lift + gate, as scripts/ir/convert.mjs (without the unpinned retry: strict).
function gateCommand(row, command) {
  const env = envOf(row);
  try {
    const d = decompile(command, env);
    if (d.error) return { gate_status: 'decompile_error', reason: `${d.reason}: ${d.error}` };
    let ir;
    try { ir = lift(schemas, d.ir, row.request); } catch (e) { return { gate_status: 'rejected', reason: `provenance: ${e.message}` }; }
    const g = gate(row.request, ir, env);
    if (!g.accept) return { gate_status: 'rejected', reason: `${g.label}: ${g.reasons.join(' / ')}`.slice(0, 300) };
    return { gate_status: 'accepted', gate_command: g.command };
  } catch (e) { return { gate_status: 'rejected', reason: `internal: ${e.message}` }; }
}

// ---------- data ----------

const splits = ['train', 'dev', 'test'];
const data = Object.fromEntries(splits.map((s) => [s, readFileSync(join(DATA, `${s}.jsonl`), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l))]));
const nonok = [];
for (const s of splits) data[s].forEach((r, i) => { if (r.label !== 'ok') nonok.push({ split: s, i, row: r }); });

// ---------- 1. consistency ----------

// Ordered value tokens + template. Identifier-like: has / . _ - digit or inner capital.
const TOK = /"[^"]*"|'[^']*'|`[^`]*`|\S+/g;
function template(req) {
  const vals = []; const parts = [];
  for (const m of req.match(TOK) || []) {
    const t = m.replace(/[,;:?!)]+$/, '').replace(/^\(+/, '');
    let ph = null;
    if (/^["'`]/.test(t)) ph = 'Q';
    else if (/^\d+(\.\d+)?$/.test(t)) ph = 'N';
    else if (/[/~]/.test(t) || /^\.?[\w-]*\.[\w*]+$/.test(t)) ph = 'P';
    else if (/[_\d]/.test(t) || /[a-z][A-Z]/.test(t) || /^\w+-\w/.test(t) || /^\*|\*$/.test(t)) ph = 'I';
    if (ph) { vals.push(t.replace(/^["'`]|["'`]$/g, '')); parts.push(ph); } else parts.push(t.toLowerCase());
  }
  return { key: parts.join(' '), vals };
}
const okByTpl = new Map();
for (const s of splits) data[s].forEach((r, i) => {
  if (r.label !== 'ok' || !r.command) return;
  const t = template(r.request);
  if (!t.vals.length) return; // value-free templates are too generic to transfer
  if (!okByTpl.has(t.key)) okByTpl.set(t.key, []);
  okByTpl.get(t.key).push({ split: s, i, row: r, vals: t.vals });
});
function instantiate(cmd, from, to) {
  let out = cmd; const marks = [];
  // longest first, via markers so a replaced value is not re-replaced
  const order = from.map((v, k) => k).sort((a, b) => from[b].length - from[a].length);
  for (const k of order) { if (!from[k] || !out.includes(from[k])) continue; out = out.split(from[k]).join(`\u0000${k}\u0000`); marks.push(k); }
  return out.replace(/\u0000(\d+)\u0000/g, (_, k) => to[Number(k)]);
}
const consistency = [];
for (const n of nonok) {
  const t = template(n.row.request);
  const oks = okByTpl.get(t.key);
  if (!oks || !t.vals.length) continue;
  let best = null;
  for (const o of oks.slice(0, 5)) {
    const cmd = instantiate(o.row.command, o.vals, t.vals);
    const g = gateCommand(n.row, cmd);
    best = { command: cmd, ...g, ref: `${o.split}:${o.i}`, ref_request: o.row.request };
    if (g.gate_status === 'accepted') break;
  }
  consistency.push({ split: n.split, i: n.i, request: n.row.request, old_label: n.row.label, new_label: best.gate_status === 'accepted' ? 'ok' : 'flag', source: 'consistency', n_ok_same_template: oks.length, ...best });
}
console.log(`non-ok rows: ${nonok.length}; consistency contradictions: ${consistency.length} (gate-accepted ${consistency.filter((c) => c.gate_status === 'accepted').length})`);

// ---------- 2. model ----------

function scopeText() {
  const lines = [];
  for (const [tool, s] of Object.entries(schemas)) {
    const ops = Object.entries(s.ops || {}).map(([op, o]) => {
      const mods = [...new Set((o.options || []).map((x) => x.mod).filter(Boolean))];
      return `${op} ("${o.gloss || ''}")${mods.length ? ' mods: ' + mods.join(',') : ''}`;
    });
    lines.push(`- ${s.binary || tool}: ${ops.join('; ')}`);
  }
  return lines.join('\n');
}
const md = readFileSync('docs/IR.md', 'utf8');
const sec8 = md.slice(md.indexOf('## 8. '), md.indexOf('## 9. ')).split('\n').filter((l) => !/^\s*\|/.test(l) && !/^8\. \*\*Unicode/.test(l)).join('\n').trim();
const SYSTEM = `You audit labels of a dataset that maps English requests to ONE shell command in a restricted "pilot IR".
Expressible = a single command or pipeline using only these tools/ops/modifiers (read-only):
${scopeText()}
Pipes between these tools are allowed (e.g. rg ... | head -n 5, rg -l x | xargs wc -l, sort | uniq -c, git log ... | head).

${sec8}

Labels:
- ok: expressible in the pilot IR, every required value (path, pattern, count, port, name, URL) is given or has a conventional default (e.g. current directory), and the intended command is clear.
- out_of_scope: a shell request that needs a construct listed in section 8 (or a tool not listed above).
- ambiguous: a shell request with several materially different readings (e.g. "count TODOs": files, lines or occurrences?).
- underspecified: a shell request missing a required value (no pattern, no file, "a few" lines, no port).
- not_shell: not asking for a shell command.
Judge by the request text alone. Be strict: a label is wrong only if you are confident. "how many lines in X mention Y" is ok (rg -c / grep -c Y X); "print the last 5 lines of server.log" is ok (tail -n 5 server.log).
For each item answer label_correct, correct_label (the right label; equal to the given one if correct) and, when correct_label is ok, command: the exact bash command copying values verbatim from the request (else "").`;
const OUT_SCHEMA = { type: 'object', additionalProperties: false, required: ['items'], properties: { items: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['id', 'label_correct', 'correct_label', 'command'], properties: {
  id: { type: 'integer' }, label_correct: { type: 'boolean' }, correct_label: { type: 'string', enum: LABELS }, command: { type: 'string' } } } } } };

const PRICE = { 'claude-haiku-5-5': [0.10, 0.50], 'claude-sonnet-5-5': [2, 10], 'claude-opus-5-5': [4, 20] }[MODEL] || [0, 0];
let cost = 0;
async function callApi(prompt) {
  const key = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (!key) throw new Error('no CLAUDE_API_KEY / ANTHROPIC_API_KEY');
  const ws = process.env.CLAUDE_WORKSPACE_ID || process.env.ANTHROPIC_WORKSPACE_ID;
  const body = { model: MODEL, max_tokens: 16000, system: SYSTEM, messages: [{ role: 'user', content: prompt }],
    output_config: { effort: EFFORT, format: { type: 'json_schema', schema: OUT_SCHEMA } } };
  for (let attempt = 0; ; attempt++) {
    let res, j;
    try {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 300000);
      res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', signal: ctl.signal,
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json', ...(ws ? { 'anthropic-workspace-id': ws } : {}) }, body: JSON.stringify(body) });
      clearTimeout(t);
      j = await res.json();
    } catch (e) { if (attempt < 5) { await sleep(5000 * (attempt + 1)); continue; } throw new Error(String(e).slice(0, 200)); }
    if (res.status === 429 || res.status === 529 || res.status >= 500) {
      if (attempt >= 40) throw new Error(`HTTP ${res.status} after retries`);
      const ra = Number(res.headers.get('retry-after')) || 0;
      await sleep(Math.max(ra * 1000, Math.min(60000, 2000 * 2 ** Math.min(attempt, 5))) + Math.random() * 1000);
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${j?.error?.type || ''} ${j?.error?.message || ''}`.slice(0, 300));
    const u = j.usage || {};
    const inTok = (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) + (u.cache_read_input_tokens || 0);
    cost += (inTok * PRICE[0] + (u.output_tokens || 0) * PRICE[1]) / 1e6;
    if (j.stop_reason !== 'end_turn') throw new Error(`stop_reason ${j.stop_reason}`);
    return JSON.parse((j.content || []).filter((b) => b.type === 'text').map((b) => b.text).join(''));
  }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const RAW = join(OUT, 'model_raw.jsonl');
const cache = new Map();
if (existsSync(RAW)) for (const l of readFileSync(RAW, 'utf8').split('\n').filter(Boolean)) { const r = JSON.parse(l); cache.set(`${r.split}:${r.i}`, r); }

if (!NO_MODEL) {
  const todo = nonok.filter((n) => !cache.has(`${n.split}:${n.i}`)).slice(0, LIMIT);
  const batches = []; for (let k = 0; k < todo.length; k += BATCH) batches.push(todo.slice(k, k + BATCH));
  console.log(`model: ${todo.length} rows to send in ${batches.length} batches (${cache.size} cached)`);
  let next = 0, done = 0, failed = 0;
  async function worker() {
    while (next < batches.length) {
      const b = batches[next++];
      const prompt = 'Items (JSON lines: id, given label, os, request):\n' + b.map((n, k) => JSON.stringify({ id: k, label: n.row.label, os: n.row.os, request: n.row.request })).join('\n');
      try {
        const out = await callApi(prompt);
        const byId = new Map((out.items || []).map((x) => [x.id, x]));
        const lines = [];
        b.forEach((n, k) => { const x = byId.get(k); if (!x) return; const r = { split: n.split, i: n.i, ...x }; delete r.id; cache.set(`${n.split}:${n.i}`, r); lines.push(JSON.stringify(r)); });
        if (lines.length) appendFileSync(RAW, lines.join('\n') + '\n');
      } catch (e) { failed++; console.error(`batch failed: ${e.message}`); }
      if (++done % 20 === 0) console.log(`  ${done}/${batches.length} batches, cost so far $${cost.toFixed(3)}`);
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));
  console.log(`model done: ${done} batches (${failed} failed), this run cost $${cost.toFixed(4)}`);
}

// ---------- 3. merge + gate ----------

const changes = [...consistency];
const consKeys = new Set(consistency.filter((c) => c.gate_status === 'accepted').map((c) => `${c.split}:${c.i}`));
let modelSaysWrong = 0;
for (const n of nonok) {
  const m = cache.get(`${n.split}:${n.i}`);
  if (!m || (m.label_correct && m.correct_label === n.row.label) || m.correct_label === n.row.label) continue;
  modelSaysWrong++;
  const base = { split: n.split, i: n.i, request: n.row.request, old_label: n.row.label, source: 'model', also_consistency: consKeys.has(`${n.split}:${n.i}`) };
  if (m.correct_label !== 'ok') { changes.push({ ...base, new_label: m.correct_label, gate_status: 'n/a' }); continue; }
  if (!m.command) { changes.push({ ...base, new_label: 'flag', gate_status: 'no_command' }); continue; }
  const g = gateCommand(n.row, m.command);
  changes.push({ ...base, new_label: g.gate_status === 'accepted' ? 'ok' : 'flag', command: m.command, ...g });
}
writeFileSync(join(OUT, 'v1_changes.jsonl'), changes.map((c) => JSON.stringify(c)).join('\n') + (changes.length ? '\n' : ''));

const count = (xs) => Object.fromEntries([...xs.reduce((m, x) => m.set(x, (m.get(x) || 0) + 1), new Map())].sort((a, b) => b[1] - a[1]));
const okRows = new Set(changes.filter((c) => c.new_label === 'ok').map((c) => `${c.split}:${c.i}`));
const summary = {
  non_ok_rows: nonok.length, model_judged: nonok.filter((n) => cache.has(`${n.split}:${n.i}`)).length, model_says_wrong: modelSaysWrong,
  run_cost_usd: Number(cost.toFixed(4)),
  consistency: { contradictions: consistency.length, by_transition: count(consistency.map((c) => `${c.old_label}->${c.new_label}`)) },
  model: { by_transition: count(changes.filter((c) => c.source === 'model').map((c) => `${c.old_label}->${c.new_label}`)), gate: count(changes.filter((c) => c.source === 'model').map((c) => c.gate_status)) },
  ok_candidates_unique: okRows.size,
  ok_candidates_by_split: count([...okRows].map((k) => k.split(':')[0])),
  ok_candidates_by_old_label: count(changes.filter((c) => c.new_label === 'ok').filter((c, k, a) => a.findIndex((d) => d.split === c.split && d.i === c.i) === k).map((c) => c.old_label)),
};
writeFileSync(join(OUT, 'summary.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify(summary, null, 2));
