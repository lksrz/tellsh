#!/usr/bin/env node
// LLM adjudication of accepted candidates that disagree with gold (y = 0): is the prediction, the gold, both or
// neither correct? Gold is synthetic (build/ir/dataset), never run this on build/real or private data.
//
//   node scripts/ir/adjudicate.mjs --cands build/ir/verifier/v1/cand_test.jsonl --data build/ir/dataset/v1/test.jsonl \
//     --out build/ir/adjudicate/v1_test [--model claude-opus-5-5] [--effort low] [--concurrency 16] \
//     [--sample-agree N] [--limit N] [--seed 1] [--backend api|cli|codex|grok] [--timeout 600] [--cache-tag T]
// --backend cascade: stage 1 Jev (--jev-model jev-1.13.0, --jev-variant gold, --jev-threshold 0.73) on every row; stage 2
// Opus via cli (--model, --opus-concurrency 6) on flagged rows (Jev p < threshold or Jev error; at most --max-opus 600, a
// seeded random subset beyond that stays Jev-only: stratum flagged_jev_only) plus a seeded audit sample of Jev-passed rows
// (--audit 0.05, clamped to --audit-min 50 / --audit-max 200). Final verdict = Opus if judged, else Jev; records add
// judge / stratum / audit / jev_p; summary.cascade has strata counts, audit miss rate + CP UB95, flagged overturn rate.
// --extra-cache F[,F] reads further cache.jsonl files (read-only; e.g. an earlier Opus run on the same candidates).
//   node scripts/ir/adjudicate.mjs --rows ROWS.jsonl --out DIR ...   (adjudication-shaped rows, gold already joined)
//
// --backend cli runs `claude -p` per row on the subscription login (API key vars stripped from the child env, no
// tools); default concurrency 6 there. --backend codex (`codex exec`, default gpt-6-luna) and --backend grok (grok
// headless, default grok-4.6) are cheaper subscription judges (default concurrency 4); all CLI backends get a child env
// without API keys. The cache key holds the model (and --cache-tag if given), so use a fresh --out per judge config. The cache key ignores the backend, so api and cli verdicts are interchangeable.
//
// --backend jev (TypeSafe Jev HTTP API, key from JEV_API_KEY, never logged; default model jev-latest, concurrency 8):
// every row asks all JEV_VARIANTS Nouls + a gold check in one request and stores p / p_variants / p_gold;
// pred_correct = p(--jev-variant, default gold) >= --threshold (default 0.5), re-derived from the cache on rerun.
//
// Key from CLAUDE_API_KEY (or ANTHROPIC_API_KEY), workspace from CLAUDE_WORKSPACE_ID (anthropic-workspace-id header);
// neither is ever logged. Results are cached in OUT/cache.jsonl keyed by (id, command, gold, model), so reruns are
// resumable; OUT/adjudications.jsonl + OUT/summary.json are rewritten at the end.
import fs from 'node:fs';
import path from 'node:path';
import { loadSchemas } from '../../ir/lib/index.js';
import { readJsonl, goldCommand } from './make_candidates.mjs';
import { spawn } from 'node:child_process';
import { SYSTEM, OUT_SCHEMA, buildPrompt, parseVerdict, unshuffle, summarize, costOf, hashKey, cliArgs, cliEnv, parseCliResult,
  DEFAULT_MODEL, codexArgs, codexPrompt, parseCodexResult, grokArgs, parseGrokResult, rowsFromAdjudications,
  JEV_URL, JEV_PRICE_PER_TOK, JEV_VARIANTS, jevBody, parseJevResult, jevVerdict, jevRetryable, jevBackoffMs } from './adjudicate_lib.mjs';
import { cascadeStrata, cascadeSummary } from './cascade_lib.mjs';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const CANDS = opt('cands'), DATA = opt('data'), OUT = opt('out'), ROWS = opt('rows'), CACHE_TAG = opt('cache-tag', '');
if (!OUT || (!ROWS && (!CANDS || !DATA))) { console.error('usage: adjudicate.mjs --cands CAND.jsonl --data SPLIT.jsonl --out DIR [--model M] [--concurrency 16] [--sample-agree N] [--limit N]'); process.exit(2); }
const BACKEND = opt('backend', 'cli');  // cli (subscription) by default; never use the paid api (global rule)
if (!['api', 'cli', 'codex', 'grok', 'jev', 'cascade'].includes(BACKEND)) { console.error(`unknown --backend ${BACKEND}`); process.exit(2); }
const CASCADE = BACKEND === 'cascade';
const MODEL = opt('model', CASCADE ? DEFAULT_MODEL.cli : DEFAULT_MODEL[BACKEND]), EFFORT = opt('effort', 'low');
const TIMEOUT_S = Number(opt('timeout', 600));
const CONC = Number(opt('concurrency', BACKEND === 'cli' ? 6 : BACKEND === 'api' ? 16 : BACKEND === 'jev' || CASCADE ? 8 : 4)), SAMPLE = Number(opt('sample-agree', 0)), LIMIT = Number(opt('limit', 0));
let seed = Number(opt('seed', 1));
const JEV_VARIANT = opt('jev-variant', 'gold'), JEV_THRESHOLD = Number(opt(CASCADE ? 'jev-threshold' : 'threshold', CASCADE ? 0.73 : 0.5));
const JEV_MODEL = CASCADE ? opt('jev-model', 'jev-1.13.0') : MODEL;
const OPUS_CONC = Number(opt('opus-concurrency', 6));
const CASCADE_OPT = { threshold: JEV_THRESHOLD, maxOpus: Number(opt('max-opus', 600)), audit: Number(opt('audit', 0.05)),
  auditMin: Number(opt('audit-min', 50)), auditMax: Number(opt('audit-max', 200)), seed: Number(opt('seed', 1)) };
const EXTRA_CACHE = (opt('extra-cache') || '').split(',').filter(Boolean);  // read-only caches (e.g. an earlier Opus run)
if ((BACKEND === 'jev' || CASCADE) && !JEV_VARIANTS[JEV_VARIANT]) { console.error(`unknown --jev-variant ${JEV_VARIANT}`); process.exit(2); }
const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);

const schemas = ROWS ? null : loadSchemas();
const gold = ROWS ? [] : readJsonl(DATA);
const cands = ROWS ? [] : readJsonl(CANDS);
const rowOf = (c) => {
  const g = gold[Number(String(c.id).split(':')[1])];
  if (!g || g.request !== c.request) throw new Error(`candidate ${c.id} does not match ${DATA}`);
  return { id: c.id, request: c.request, os: c.os, command: c.command, route: c.route, y: c.y, gold: goldCommand(schemas, g), goldLabel: g.label };
};
let rows = ROWS ? rowsFromAdjudications(readJsonl(ROWS)) : cands.filter((c) => c.y === 0).map(rowOf);
if (SAMPLE > 0 && !ROWS) {
  const agree = cands.filter((c) => c.y === 1).map((c) => [rand(), c]).sort((a, b) => a[0] - b[0]).slice(0, SAMPLE).map((x) => rowOf(x[1]));
  rows = rows.concat(agree);
}
if (LIMIT > 0) rows = rows.slice(0, LIMIT);

fs.mkdirSync(OUT, { recursive: true });
const CACHE = path.join(OUT, 'cache.jsonl');
const keyFor = (r, model) => hashKey(r.id, r.command, r.gold ?? `!${r.goldLabel}`, model, ...(CACHE_TAG ? [CACHE_TAG] : []));
const keyOf = (r) => keyFor(r, MODEL);
const cache = new Map();
for (const f of [...EXTRA_CACHE, CACHE]) if (fs.existsSync(f)) for (const l of fs.readFileSync(f, 'utf8').split('\n').filter(Boolean)) { try { const j = JSON.parse(l); if (!j.error) cache.set(j.key, j); } catch {} }

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

// --backend jev: one POST per row (all variants + gold check as Nouls); backoff on 429 / 529 / 5xx / network errors
const JEV_KEY = process.env.JEV_API_KEY;
async function callJev(row, model = MODEL) {
  const body = JSON.stringify(jevBody(row, model));
  let lastErr = '';
  for (let attempt = 0; attempt < 8; attempt++) {
    const t0 = Date.now();
    try {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 60000);
      const res = await fetch(JEV_URL, { method: 'POST', signal: ctl.signal, headers: { authorization: `Bearer ${JEV_KEY}`, 'content-type': 'application/json' }, body });
      clearTimeout(t);
      const j = await res.json().catch(() => ({}));
      if (jevRetryable(res.status)) { lastErr = `HTTP ${res.status}`; await sleep(jevBackoffMs(attempt, res.headers.get('retry-after')) + Math.random() * 500); continue; }
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${JSON.stringify(j).slice(0, 300)}`);
      const r = parseJevResult(j);
      return { ...r, usage: { ...r.usage, latency_s: +((Date.now() - t0) / 1000).toFixed(3), attempts: attempt + 1 } };
    } catch (e) {
      lastErr = String(e.message || e).slice(0, 300);
      if (/^HTTP 4|^jev:/.test(lastErr)) throw new Error(lastErr);
      await sleep(jevBackoffMs(attempt));
    }
  }
  throw new Error(`gave up: ${lastErr}`);
}

const TMP = path.join(OUT, 'tmp');
let tmpSeq = 0;
function spawnCli(bin, argv, input) {
  return new Promise((resolve) => {
    const ch = spawn(bin, argv, { stdio: [input == null ? 'ignore' : 'pipe', 'pipe', 'pipe'], env: cliEnv(process.env) });
    let out = '', err = '';
    ch.stdout.on('data', (d) => (out += d)); ch.stderr.on('data', (d) => (err += d));
    if (input != null) ch.stdin.end(input);
    const t = setTimeout(() => ch.kill('SIGKILL'), TIMEOUT_S * 1000);
    ch.on('close', (code) => { clearTimeout(t); resolve({ code, out, err }); });
    ch.on('error', (e) => { clearTimeout(t); resolve({ code: -1, out, err: String(e) }); });
  });
}
// one call of the selected CLI backend -> {code, out, err, parse()} (parse throws on a bad verdict)
async function runCli(prompt, backend = BACKEND) {
  if (backend === 'cli') { const r = await spawnCli('claude', cliArgs(MODEL, EFFORT), prompt); return { ...r, parse: () => parseCliResult(r.out) }; }
  fs.mkdirSync(TMP, { recursive: true });
  const base = path.join(TMP, `${process.pid}_${tmpSeq++}`);
  try {
    if (backend === 'codex') {
      const sf = base + '.schema.json', of = base + '.out.json';
      fs.writeFileSync(sf, JSON.stringify(OUT_SCHEMA));
      const r = await spawnCli('codex', codexArgs(MODEL, EFFORT, sf, of), codexPrompt(prompt));
      let last = ''; try { last = fs.readFileSync(of, 'utf8'); } catch {}
      return { ...r, out: last ? r.out || ' ' : '', parse: () => parseCodexResult(r.out, last) };
    }
    const pf = base + '.prompt.txt';
    fs.writeFileSync(pf, prompt);
    const r = await spawnCli('grok', grokArgs(MODEL, EFFORT, pf), null);
    return { ...r, parse: () => parseGrokResult(r.out) };
  } finally { for (const f of ['.schema.json', '.out.json', '.prompt.txt']) fs.rmSync(base + f, { force: true }); }
}
// one CLI call per attempt; up to 2 retries on unparseable verdicts, up to 4 on CLI failures (exponential backoff)
async function callCli(prompt, backend = BACKEND) {
  let lastErr = '', parseFails = 0, cliFails = 0;
  for (;;) {
    const t0 = Date.now();
    const r = await runCli(prompt, backend);
    const secs = (Date.now() - t0) / 1000;
    try {
      if (r.code !== 0 && !r.out.trim()) throw new Error(`cli exit ${r.code}: ${r.err.slice(0, 200)}`);
      const res = r.parse();
      return { ...res, usage: { ...res.usage, cli_seconds: +secs.toFixed(2) } };
    } catch (e) {
      lastErr = String(e.message || e).slice(0, 300);
      const isParse = /JSON|missing/.test(lastErr) && !/^cli/.test(lastErr);
      if (isParse ? ++parseFails > 2 : ++cliFails > 4) throw new Error(`gave up: ${lastErr}`);
      await sleep(2000 * 2 ** (isParse ? 0 : cliFails - 1) + Math.random() * 1000);
    }
  }
}

if ((BACKEND === 'jev' || CASCADE) && !JEV_KEY && rows.some((r) => !cache.has(keyFor(r, JEV_MODEL)))) { console.error('no JEV_API_KEY'); process.exit(1); }
if (BACKEND === 'api' && !KEY && rows.some((r) => !cache.has(keyOf(r)))) { console.error('no CLAUDE_API_KEY / ANTHROPIC_API_KEY'); process.exit(1); }
let done = 0, fresh = 0;
// one Jev verdict for row r (cache or call); variant / threshold re-derived from cached p_variants
async function judgeJev(r, model) {
  const key = keyFor(r, model);
  let rec = cache.get(key);
  if (rec && rec.p_variants) return { ...rec, ...jevVerdict({ p: rec.p_variants, p_gold: rec.p_gold }, JEV_VARIANT, JEV_THRESHOLD) };
  try {
    const res = await callJev(r, model);
    rec = { key, ...r, model, model_version: res.model, backend: 'jev', jev_variant: JEV_VARIANT, ...jevVerdict(res, JEV_VARIANT, JEV_THRESHOLD),
      usage: res.usage, cost_usd: res.usage.input_tokens * JEV_PRICE_PER_TOK };
    fs.appendFileSync(CACHE, JSON.stringify(rec) + '\n');
    cache.set(key, rec); fresh++;
    return rec;
  } catch (e) { return { key, ...r, model, error: String(e.message || e) }; }
}
// one LLM verdict (api / cli / codex / grok) for row r
async function judgeLlm(r, backend, model) {
  const key = keyFor(r, model);
  if (cache.has(key)) return cache.get(key);
  const { aIsPred, text } = buildPrompt(r);
  try {
    const res = backend !== 'api' ? await callCli(text, backend) : await call(text);
    const { verdict, usage } = res;
    const rec = { key, ...r, model, backend, a_is_pred: aIsPred, ...unshuffle(verdict, aIsPred), usage,
      cost_usd: backend !== 'api' ? res.cost_usd : costOf(model, usage) };
    fs.appendFileSync(CACHE, JSON.stringify(rec) + '\n');
    cache.set(key, rec); fresh++;
    return rec;
  } catch (e) { return { key, ...r, model, error: String(e.message || e) }; }
}
async function pool(n, conc, fn) {
  let next = 0;
  await Promise.all(Array.from({ length: Math.max(1, conc) }, async () => {
    while (next < n) { const i = next++; await fn(i); if (++done % 25 === 0) console.error(`${done} done (${fresh} new)`); }
  }));
}
let out = new Array(rows.length), cascadeInfo;
const t0 = Date.now();
if (!CASCADE) await pool(rows.length, CONC, async (i) => { out[i] = BACKEND === 'jev' ? await judgeJev(rows[i], MODEL) : await judgeLlm(rows[i], BACKEND, MODEL); });
else {
  // stage 1: Jev on every row; stage 2: Opus (cli) on flagged (capped) + audit sample; final = Opus if judged, else Jev
  const jev = new Array(rows.length);
  await pool(rows.length, CONC, async (i) => { jev[i] = await judgeJev(rows[i], JEV_MODEL); });
  const tJev = Date.now();
  const strata = cascadeStrata(jev.map((j) => (j.error ? null : j.p)), CASCADE_OPT);
  const toOpus = strata.map((s, i) => (s === 'flagged' || s === 'audit' ? i : -1)).filter((i) => i >= 0);
  const cachedOpus = toOpus.filter((i) => cache.has(keyOf(rows[i]))).length;
  const opus = new Array(rows.length);
  const freshJev = fresh;
  await pool(toOpus.length, OPUS_CONC, async (k) => { const i = toOpus[k]; opus[i] = await judgeLlm(rows[i], 'cli', MODEL); });
  out = rows.map((r, i) => {
    const j = jev[i], o = opus[i], useOpus = o && !o.error;
    const base = useOpus ? o : j.error ? { ...j } : j;
    return { ...base, judge: useOpus ? 'opus' : j.error ? null : 'jev', stratum: strata[i], audit: strata[i] === 'audit',
      jev_p: j.error ? null : j.p, jev_pred_correct: j.error ? null : j.pred_correct, jev_model: JEV_MODEL, jev_threshold: JEV_THRESHOLD,
      ...(o?.error ? { opus_error: o.error } : {}), ...(!useOpus && j.error ? { error: j.error } : {}) };
  });
  cascadeInfo = { jev_model: JEV_MODEL, jev_variant: JEV_VARIANT, jev_threshold: JEV_THRESHOLD, max_opus: CASCADE_OPT.maxOpus,
    audit_fraction: CASCADE_OPT.audit, audit_min: CASCADE_OPT.auditMin, audit_max: CASCADE_OPT.auditMax, seed: CASCADE_OPT.seed,
    jev_new_calls: freshJev, opus_rows: toOpus.length, opus_cached: cachedOpus, opus_new_calls: fresh - freshJev,
    seconds: { jev: +((tJev - t0) / 1000).toFixed(1), opus: +((Date.now() - tJev) / 1000).toFixed(1) }, ...cascadeSummary(out) };
}
fs.writeFileSync(path.join(OUT, 'adjudications.jsonl'), out.map((r) => JSON.stringify(r)).join('\n') + '\n');
const summary = { cands: CANDS, data: DATA, rows_file: ROWS, cache_tag: CACHE_TAG || undefined, model: MODEL, effort: EFFORT, backend: BACKEND, rows: rows.length, new_calls: fresh,
  seconds: +((Date.now() - t0) / 1000).toFixed(1), ...(cascadeInfo ? { cascade: cascadeInfo } : {}), ...summarize(out) };
fs.writeFileSync(path.join(OUT, 'summary.json'), JSON.stringify(summary, null, 1));
console.log(JSON.stringify(summary, null, 1));
