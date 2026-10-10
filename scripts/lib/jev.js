// TypeSafe Jev client for build-time teacher scripts: on-disk cache, bounded concurrency, retry with
// exponential backoff (429/529/5xx/network), and a call/token ledger. The API key is read from the
// environment only and never printed or logged. Never used at runtime.
import { readFileSync, appendFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
export const ENDPOINT = 'https://api.typesafe.ai/v1/systemone';
export const MODEL = 'jev-latest';
export const PRICE_PER_MTOK = 0.042; // USD per million input tokens (docs.typesafe.ai/models); output tokens are free
const CACHE = join(ROOT, 'build', 'jev_cache.jsonl');
export const LEDGER = join(ROOT, 'data', 'teacher', 'ledger.json');

let cache = null;
function loadCache() {
  if (cache) return cache;
  cache = new Map();
  if (existsSync(CACHE)) {
    for (const l of readFileSync(CACHE, 'utf8').split('\n')) {
      if (!l.trim()) continue;
      try { const { k, v } = JSON.parse(l); cache.set(k, v); } catch { /* torn line */ }
    }
  }
  return cache;
}
export const keyOf = (state, questions) => createHash('sha256').update(JSON.stringify([MODEL, state, questions])).digest('hex');

export const stats = { calls: 0, cached: 0, failed: 0, retries: 0, inTok: 0 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** One evaluation (state + typed questions). Cached by request content; retried with backoff. */
export async function ask(state, questions, { retries = 6 } = {}) {
  const k = keyOf(state, questions);
  const c = loadCache();
  if (c.has(k)) { stats.cached++; return c.get(k); }
  const KEY = process.env.TYPESAFE_API_KEY;
  if (!KEY) throw new Error('TYPESAFE_API_KEY not set');
  let delay = 500;
  for (let attempt = 0; ; attempt++) {
    let status = 0;
    // every request sent counts as a network call (also the ones that fail and are retried)
    stats.calls++;
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: MODEL, state, questions }),
        signal: AbortSignal.timeout(60000),
      });
      status = r.status;
      const j = await r.json().catch(() => null);
      if (r.ok && j?.answers) {
        stats.inTok += j.usage?.input_tokens || 0;
        const v = { answers: j.answers, usage: j.usage };
        c.set(k, v);
        mkdirSync(dirname(CACHE), { recursive: true });
        appendFileSync(CACHE, JSON.stringify({ k, v }) + '\n');
        return v;
      }
      if (r.ok || (status >= 400 && status < 500 && status !== 429 && status !== 408)) {
        stats.failed++;
        throw Object.assign(new Error(`HTTP ${status}`), { fatal: true });
      }
      const ra = +r.headers.get('retry-after');
      if (ra > 0) delay = Math.max(delay, ra * 1000);
    } catch (e) {
      if (e.fatal) throw e;
    }
    if (attempt >= retries) { stats.failed++; throw new Error(`gave up after ${retries} retries (last status ${status || 'network'})`); }
    stats.retries++;
    await sleep(delay + Math.random() * delay * 0.3);
    delay = Math.min(delay * 2, 30000);
  }
}

/** Run async thunks with bounded concurrency. */
export async function pool(thunks, n = 12, onProgress) {
  const out = new Array(thunks.length);
  let i = 0;
  let done = 0;
  const worker = async () => {
    while (i < thunks.length) {
      const j = i++;
      try { out[j] = await thunks[j](); } catch (e) { out[j] = { error: e.message }; }
      if (onProgress && ++done % 200 === 0) onProgress(done, thunks.length);
    }
  };
  await Promise.all(Array.from({ length: n }, worker));
  return out;
}

/** Add this run's network calls/tokens to the committed ledger (per task) and return the totals. */
export function recordLedger(task) {
  const L = existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, 'utf8')) : { model: MODEL, pricePerMtok: PRICE_PER_MTOK, tasks: {} };
  const t = (L.tasks[task] ??= { calls: 0, failed: 0, retries: 0, inTok: 0, runs: 0 });
  t.calls += stats.calls; t.failed += stats.failed; t.retries += stats.retries; t.inTok += stats.inTok; t.runs++;
  const tot = Object.values(L.tasks).reduce((a, x) => ({ calls: a.calls + x.calls, failed: a.failed + x.failed, inTok: a.inTok + x.inTok }), { calls: 0, failed: 0, inTok: 0 });
  L.total = { ...tot, usd: +((tot.inTok / 1e6) * PRICE_PER_MTOK).toFixed(5) };
  mkdirSync(dirname(LEDGER), { recursive: true });
  writeFileSync(LEDGER, JSON.stringify(L, null, 1) + '\n');
  return L;
}
