#!/usr/bin/env node
// LLM adjudication of accepted candidates that disagree with gold (y = 0): is the prediction, the gold, both or
// neither correct? Gold is synthetic (build/ir/dataset), never run this on build/real or private data.
//
//   node scripts/ir/adjudicate.mjs --cands build/ir/verifier/v1/cand_test.jsonl --data build/ir/dataset/v1/test.jsonl \
//     --out build/ir/adjudicate/v1_test [--model claude-opus-5-5] [--effort low] [--concurrency 16] \
//     [--sample-agree N] [--limit N] [--seed 1] [--backend api|cli] [--timeout 600]
//
// --backend cli runs `claude -p` per row on the subscription login (API key vars stripped from the child env, no
// tools); default concurrency 6 there. The cache key ignores the backend, so api and cli verdicts are interchangeable.
//
// Key from CLAUDE_API_KEY (or ANTHROPIC_API_KEY), workspace from CLAUDE_WORKSPACE_ID (anthropic-workspace-id header);
// neither is ever logged. Results are cached in OUT/cache.jsonl keyed by (id, command, gold, model), so reruns are
// resumable; OUT/adjudications.jsonl + OUT/summary.json are rewritten at the end.
import fs from 'node:fs';
import path from 'node:path';
import { loadSchemas } from '../../ir/lib/index.js';
import { readJsonl, goldCommand } from './make_candidates.mjs';
import { spawn } from 'node:child_process';
import { SYSTEM, OUT_SCHEMA, buildPrompt, parseVerdict, unshuffle, summarize, costOf, hashKey, cliArgs, cliEnv, parseCliResult } from './adjudicate_lib.mjs';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const CANDS = opt('cands'), DATA = opt('data'), OUT = opt('out');
if (!CANDS || !DATA || !OUT) { console.error('usage: adjudicate.mjs --cands CAND.jsonl --data SPLIT.jsonl --out DIR [--model M] [--concurrency 16] [--sample-agree N] [--limit N]'); process.exit(2); }
const MODEL = opt('model', 'claude-opus-5-5'), EFFORT = opt('effort', 'low');
const BACKEND = opt('backend', 'cli')  // cli (subscription) by default; never use the paid api (global rule);
if (!['api', 'cli'].includes(BACKEND)) { console.error(`unknown --backend ${BACKEND}`); process.exit(2); }
const TIMEOUT_S = Number(opt('timeout', 600));
const CONC = Number(opt('concurrency', BACKEND === 'cli' ? 6 : 16)), SAMPLE = Number(opt('sample-agree', 0)), LIMIT = Number(opt('limit', 0));
let seed = Number(opt('seed', 1));
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);

const schemas = loadSchemas();
const gold = readJsonl(DATA);
const cands = readJsonl(CANDS);
const rowOf = (c) => {
  const g = gold[Number(String(c.id).split(':')[1])];
  if (!g || g.request !== c.request) throw new Error(`candidate ${c.id} does not match ${DATA}`);
  return { id: c.id, request: c.request, os: c.os, command: c.command, route: c.route, y: c.y, gold: goldCommand(schemas, g), goldLabel: g.label };
};
let rows = cands.filter((c) => c.y === 0).map(rowOf);
if (SAMPLE > 0) {
  const agree = cands.filter((c) => c.y === 1).map((c) => [rand(), c]).sort((a, b) => a[0] - b[0]).slice(0, SAMPLE).map((x) => rowOf(x[1]));
  rows = rows.concat(agree);
}
if (LIMIT > 0) rows = rows.slice(0, LIMIT);

fs.mkdirSync(OUT, { recursive: true });
const CACHE = path.join(OUT, 'cache.jsonl');
const keyOf = (r) => hashKey(r.id, r.command, r.gold ?? `!${r.goldLabel}`, MODEL);
const cache = new Map();
if (fs.existsSync(CACHE)) for (const l of fs.readFileSync(CACHE, 'utf8').split('\n').filter(Boolean)) { try { const j = JSON.parse(l); cache.set(j.key, j); } catch {} }

const KEY = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;
const WS = process.env.CLAUDE_WORKSPACE_ID || process.env.ANTHROPIC_WORKSPACE_ID;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function call(prompt) {
  const body = { model: MODEL, max_tokens: 16000, system: SYSTEM, thinking: { type: 'adaptive' }, messages: [{ role: 'user', content: prompt }],
    output_config: { effort: EFFORT, format: { type: 'json_schema', schema: OUT_SCHEMA } } };
  let lastErr = '';
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 300000);
      const res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', signal: ctl.signal,
        headers: { 'x-api-key': KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json', ...(WS ? { 'anthropic-workspace-id': WS } : {}) }, body: JSON.stringify(body) });
      clearTimeout(t);
      const j = await res.json().catch(() => ({}));
      if (res.status === 429 || res.status >= 500) {
        lastErr = `HTTP ${res.status}`;
        const ra = Number(res.headers.get('retry-after'));
        await sleep((ra > 0 ? ra * 1000 : 2000 * 2 ** attempt) + Math.random() * 1000);
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${j?.error?.type || ''} ${j?.error?.message || ''}`.slice(0, 300));
      const text = (j.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
      return { verdict: parseVerdict(text), usage: j.usage || {} };
    } catch (e) {
      lastErr = String(e.message || e).slice(0, 300);
      if (/^HTTP 4/.test(lastErr) || /JSON|missing/.test(lastErr)) throw new Error(lastErr);
      await sleep(2000 * 2 ** attempt);
    }
  }
  throw new Error(`gave up: ${lastErr}`);
}

function runCli(prompt) {
  return new Promise((resolve) => {
    const ch = spawn('claude', cliArgs(MODEL, EFFORT), { stdio: ['pipe', 'pipe', 'pipe'], env: cliEnv(process.env) });
    let out = '', err = '';
    ch.stdout.on('data', (d) => (out += d)); ch.stderr.on('data', (d) => (err += d));
    ch.stdin.end(prompt);
    const t = setTimeout(() => ch.kill('SIGKILL'), TIMEOUT_S * 1000);
    ch.on('close', (code) => { clearTimeout(t); resolve({ code, out, err }); });
    ch.on('error', (e) => { clearTimeout(t); resolve({ code: -1, out, err: String(e) }); });
  });
}
// one CLI call per attempt; up to 2 retries on unparseable verdicts, up to 4 on CLI failures (exponential backoff)
async function callCli(prompt) {
  let lastErr = '', parseFails = 0, cliFails = 0;
  for (;;) {
    const t0 = Date.now();
    const r = await runCli(prompt);
    const secs = (Date.now() - t0) / 1000;
    try {
      if (r.code !== 0 && !r.out.trim()) throw new Error(`cli exit ${r.code}: ${r.err.slice(0, 200)}`);
      const res = parseCliResult(r.out);
      return { ...res, usage: { ...res.usage, cli_seconds: +secs.toFixed(2) } };
    } catch (e) {
      lastErr = String(e.message || e).slice(0, 300);
      const isParse = /JSON|missing/.test(lastErr) && !/^cli/.test(lastErr);
      if (isParse ? ++parseFails > 2 : ++cliFails > 4) throw new Error(`gave up: ${lastErr}`);
      await sleep(2000 * 2 ** (isParse ? 0 : cliFails - 1) + Math.random() * 1000);
    }
  }
}

if (BACKEND === 'api' && !KEY && rows.some((r) => !cache.has(keyOf(r)))) { console.error('no CLAUDE_API_KEY / ANTHROPIC_API_KEY'); process.exit(1); }
const out = new Array(rows.length);
let next = 0, done = 0, fresh = 0;
async function worker() {
  while (next < rows.length) {
    const i = next++, r = rows[i], key = keyOf(r);
    let rec = cache.get(key);
    if (!rec) {
      const { aIsPred, text } = buildPrompt(r);
      try {
        const res = BACKEND === 'cli' ? await callCli(text) : await call(text);
        const { verdict, usage } = res;
        rec = { key, ...r, model: MODEL, backend: BACKEND, a_is_pred: aIsPred, ...unshuffle(verdict, aIsPred), usage,
          cost_usd: BACKEND === 'cli' ? res.cost_usd : costOf(MODEL, usage) };
        fs.appendFileSync(CACHE, JSON.stringify(rec) + '\n');
        fresh++;
      } catch (e) { rec = { key, ...r, model: MODEL, error: String(e.message || e) }; }
    }
    out[i] = rec;
    if (++done % 25 === 0) console.error(`${done}/${rows.length} (${fresh} new)`);
  }
}
await Promise.all(Array.from({ length: Math.max(1, CONC) }, worker));
fs.writeFileSync(path.join(OUT, 'adjudications.jsonl'), out.map((r) => JSON.stringify(r)).join('\n') + '\n');
const summary = { cands: CANDS, data: DATA, model: MODEL, effort: EFFORT, backend: BACKEND, rows: rows.length, new_calls: fresh, ...summarize(out) };
fs.writeFileSync(path.join(OUT, 'summary.json'), JSON.stringify(summary, null, 1));
console.log(JSON.stringify(summary, null, 1));
