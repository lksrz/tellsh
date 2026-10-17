// Pure helpers of adjudicate.mjs (prompt building, response parsing, A/B unshuffling, summary, merge into scoring).
import crypto from 'node:crypto';
import fs from 'node:fs';

export const PLATFORM_NAME = { linux: 'linux_gnu (GNU coreutils)', darwin: 'darwin_bsd (macOS, BSD userland)' };
export const PRICE = { 'claude-haiku-5-5': [0.10, 0.50], 'claude-sonnet-5-5': [2, 10], 'claude-opus-5-5': [4, 20] };

export const OUT_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['a_correct', 'b_correct', 'equivalent', 'reason'],
  properties: { a_correct: { type: 'boolean' }, b_correct: { type: 'boolean' }, equivalent: { type: 'boolean' }, reason: { type: 'string' } },
};

// SYSTEM carries the v4 judge rubric (taxonomy v4 fixes 19 and 21). adjudicate.mjs keyOf does not hash SYSTEM: re-judge
// rubric-affected rows into a fresh OUT dir (OUT/cache.jsonl).
export const SYSTEM = `You are a strict expert reviewer of shell commands (bash). You judge whether a candidate answer fully and
exactly does what a user asked: no dropped constraints, no extra unrequested effects, right paths / patterns /
flags for the stated OS. Equivalent spellings (flag order, quoting, -c vs | wc -l, etc.) are equally correct.
Judge each answer independently on its own merits; do not assume either is the reference. Reply only with JSON.

House conventions (docs/IR.md "Judge rubric"; apply them, do not re-argue them):
- "N lines of the log / history / output", "log lines", "how many lines does git log print" mean the plain multi-line
  git log (no --oneline); commits, "commit lines", "one line" / one-liners mean --oneline or -n.
- "in / within the last N lines (of F) ... X" filters inside that tail: tail first, then the search.
- "the last N lines with / matching X" are the last N matching lines: search first, then tail.
- "N of the sorted / unique X" slices after sorting: sort (or sort -u / uniq) first, then head / tail.
- "among the last N commits" restricts to those commits: git log -n N piped to a filter, not -n N with --grep.`;

export const hashKey = (...parts) => crypto.createHash('sha256').update(parts.map(String).join('\u0000')).digest('hex').slice(0, 24);
// deterministic A/B order per row: true -> A is the prediction
export const predIsA = (id) => parseInt(hashKey('order', id).slice(0, 8), 16) % 2 === 0;

// row {id, request, os, command(pred), gold(command|null), goldLabel}
export function buildPrompt(row) {
  const os = PLATFORM_NAME[row.os] || PLATFORM_NAME.linux;
  const predText = row.command;
  const goldText = row.gold ?? `(no command: decline to answer; the request is labelled "${row.goldLabel}", i.e. it should not be answered with a shell command)`;
  const aIsPred = predIsA(row.id);
  const [A, B] = aIsPred ? [predText, goldText] : [goldText, predText];
  const refusal = row.gold == null
    ? `\nOne answer declines instead of giving a command. For that answer, "correct" means the request really should NOT be
answered with a single shell command (e.g. not a shell task, unsafe, too ambiguous to act on). For the command answer,
"correct" means the request should be answered with a command AND this command does exactly what was asked.
"equivalent" is false in that case.\n`
    : '';
  return {
    aIsPred,
    text: `Target: ${os}, shell bash.
User request: ${JSON.stringify(row.request)}

Answer A:
${A}

Answer B:
${B}
${refusal}
For each answer decide: does it fully and exactly do what was asked (no dropped constraints, no extra unrequested
effects, right paths/patterns, works on the target OS)? Also say whether A and B are behaviourally equivalent for this
request. Output JSON {"a_correct": bool, "b_correct": bool, "equivalent": bool, "reason": "<one short sentence>"}.`,
  };
}

export function parseVerdict(text) {
  let t = String(text ?? '').trim().replace(/^```(?:json)?\s*/, '').replace(/```\s*$/, '');
  const m = t.match(/\{[\s\S]*\}/);
  if (!m) throw new Error('no JSON object');
  const j = JSON.parse(m[0]);
  for (const k of ['a_correct', 'b_correct', 'equivalent']) if (typeof j[k] !== 'boolean') throw new Error(`missing ${k}`);
  return { a_correct: j.a_correct, b_correct: j.b_correct, equivalent: j.equivalent, reason: String(j.reason ?? '').slice(0, 400) };
}

// verdict on A/B -> verdict on pred/gold
export function unshuffle(v, aIsPred) {
  return { pred_correct: aIsPred ? v.a_correct : v.b_correct, gold_correct: aIsPred ? v.b_correct : v.a_correct, equivalent: v.equivalent, reason: v.reason };
}

export function category(r) {
  if (r.pred_correct && r.gold_correct) return 'both_correct';
  if (r.pred_correct) return 'pred_correct_gold_wrong';
  if (r.gold_correct) return 'pred_wrong';
  return 'both_wrong';
}

export function costOf(model, usage = {}) {
  const p = PRICE[model] || [0, 0];
  const inTok = (usage.input_tokens || 0) + (usage.cache_creation_input_tokens || 0) + (usage.cache_read_input_tokens || 0);
  return (inTok * p[0] + (usage.output_tokens || 0) * p[1]) / 1e6;
}

export function summarize(recs) {
  const s = {};
  for (const set of ['disagree', 'agree_sample']) {
    const rs = recs.filter((r) => (set === 'disagree' ? r.y === 0 : r.y === 1) && !r.error);
    const c = { n: rs.length, both_correct: 0, pred_correct_gold_wrong: 0, pred_wrong: 0, both_wrong: 0, equivalent: 0 };
    for (const r of rs) { c[category(r)]++; if (r.equivalent) c.equivalent++; }
    s[set] = c;
  }
  s.errors = recs.filter((r) => r.error).length;
  s.cost_usd = +recs.reduce((a, r) => a + (r.cost_usd || 0), 0).toFixed(4);
  s.input_tokens = recs.reduce((a, r) => a + (r.usage?.input_tokens || 0), 0);
  s.output_tokens = recs.reduce((a, r) => a + (r.usage?.output_tokens || 0), 0);
  return s;
}

// adjudications files -> Map id -> {command, pred_correct}
export function loadAdjudications(files) {
  const m = new Map();
  for (const f of files) for (const l of fs.readFileSync(f, 'utf8').split('\n').filter(Boolean)) {
    const r = JSON.parse(l);
    if (!r.error) m.set(String(r.id), r);
  }
  return m;
}
// adjudicated correctness: a y=0 candidate is correct when its adjudication (same command) says the pred is correct.
// truth = true (score_combined --adj-truth, for fully adjudicated sets): the judge verdict decides in both directions,
// so a y=1 candidate the judge calls wrong (gold and pred agree on a wrong command) counts as wrong.
export function adjudicatedY(y, id, command, adj, truth = false) {
  const a = adj?.get(String(id));
  const hit = a && a.command === command && typeof a.pred_correct === 'boolean';
  if (truth && hit) return a.pred_correct;
  if (y) return true;
  return !!(hit && a.pred_correct);
}

// ---------- --backend cli (Claude Code CLI on the subscription login) ----------
// argv for `claude -p`, same flags as grok_gen.mjs's claude backend: no tools, no session, rubric as system prompt.
export function cliArgs(model, effort, batch = false) {
  return ['-p', '--model', model, '--effort', effort, '--output-format', 'json', '--json-schema', JSON.stringify(batch ? BATCH_SCHEMA : OUT_SCHEMA),
    '--no-session-persistence', '--tools', '', '--strict-mcp-config', '--disable-slash-commands', '--system-prompt', batch ? BATCH_SYSTEM : SYSTEM];
}
// child env without API credentials, so the CLI falls back to the subscription (OAuth) login.
export const CLI_STRIP_ENV = ['ANTHROPIC_API_KEY', 'CLAUDE_API_KEY', 'ANTHROPIC_AUTH_TOKEN', 'OPENAI_API_KEY', 'XAI_API_KEY', 'GROK_API_KEY'];
export function cliEnv(env) {
  const e = { ...env };
  for (const k of CLI_STRIP_ENV) delete e[k];
  return e;
}
// `claude -p --output-format json` stdout -> {verdict, usage, cost_usd}; throws on CLI error or a bad verdict.
export function parseCliResult(stdout) {
  let j;
  try { j = JSON.parse(stdout); } catch { throw new Error('cli: stdout is not JSON'); }
  if (j.is_error) throw new Error(`cli error: ${String(j.result ?? j.subtype ?? '').slice(0, 200)}`);
  const so = j.structured_output ?? j.structuredOutput;
  const verdict = parseVerdict(so && typeof so === 'object' ? JSON.stringify(so) : j.result);
  const u = j.usage || {};
  const usage = { input_tokens: u.input_tokens || 0, cache_creation_input_tokens: u.cache_creation_input_tokens || 0,
    cache_read_input_tokens: u.cache_read_input_tokens || 0, output_tokens: u.output_tokens || 0 };
  return { verdict, usage, cost_usd: Number(j.total_cost_usd) || 0 };
}

// ---------- --batch N (cli backend / cascade Opus stage): N rows per `claude -p` call ----------
// Structured output must be an object, so the array sits under "verdicts"; each verdict carries its 1-based item index.
export const BATCH_SCHEMA = {
  type: 'object', additionalProperties: false, required: ['verdicts'],
  properties: { verdicts: { type: 'array', items: { ...OUT_SCHEMA, required: ['item', ...OUT_SCHEMA.required],
    properties: { item: { type: 'integer' }, ...OUT_SCHEMA.properties } } } },
};
export const BATCH_SYSTEM = `${SYSTEM}

You will get several numbered items. Judge each item independently, exactly as if it were the only one: items are
unrelated, and nothing in one item says anything about another. Return one verdict per item, with its item number.`;

// rows -> {items: [{aIsPred}], text}: each item is the single-row prompt body (same A/B order and refusal context)
export function buildBatchPrompt(rows) {
  const items = [], parts = [];
  rows.forEach((r, i) => {
    const { aIsPred, text } = buildPrompt(r);
    items.push({ aIsPred });
    parts.push(`=== Item ${i + 1} ===\n${text.split('\nFor each answer decide:')[0].trimEnd()}`);
  });
  return { items, text: `${parts.join('\n\n')}

For EACH of the ${rows.length} items decide: does each answer fully and exactly do what was asked, and are A and B
behaviourally equivalent for that request? Output JSON {"verdicts": [{"item": <1..${rows.length}>, "a_correct": bool,
"b_correct": bool, "equivalent": bool, "reason": "<one short sentence>"}, ...]} with exactly one verdict per item.` };
}
// batch verdict text / object -> Map item (1-based) -> verdict; only well-formed, in-range, non-duplicate items kept
export function parseBatchVerdicts(textOrObj, n) {
  let j = textOrObj;
  if (typeof j !== 'object' || j == null) {
    const t = String(j ?? '').trim().replace(/^```(?:json)?\s*/, '').replace(/```\s*$/, '');
    const m = t.match(/[\[{][\s\S]*[\]}]/);
    if (!m) throw new Error('no JSON object');
    j = JSON.parse(m[0]);
  }
  const arr = Array.isArray(j) ? j : j.verdicts;
  if (!Array.isArray(arr)) throw new Error('missing verdicts');
  const out = new Map(), dup = new Set();
  for (const v of arr) {
    const k = Number(v?.item);
    if (!Number.isInteger(k) || k < 1 || k > n) continue;
    let pv; try { pv = parseVerdict(JSON.stringify(v)); } catch { continue; }
    if (out.has(k)) dup.add(k); else out.set(k, pv);
  }
  for (const k of dup) out.delete(k);  // ambiguous: judged again
  return out;
}
// `claude -p` batch stdout -> {verdicts: Map, usage, cost_usd}; throws on a CLI error / no parseable array
export function parseCliBatchResult(stdout, n) {
  let j;
  try { j = JSON.parse(stdout); } catch { throw new Error('cli: stdout is not JSON'); }
  if (j.is_error) throw new Error(`cli error: ${String(j.result ?? j.subtype ?? '').slice(0, 200)}`);
  const so = j.structured_output ?? j.structuredOutput;
  const verdicts = parseBatchVerdicts(so && typeof so === 'object' ? so : j.result, n);
  const u = j.usage || {};
  return { verdicts, usage: { input_tokens: u.input_tokens || 0, cache_creation_input_tokens: u.cache_creation_input_tokens || 0,
    cache_read_input_tokens: u.cache_read_input_tokens || 0, output_tokens: u.output_tokens || 0 }, cost_usd: Number(j.total_cost_usd) || 0 };
}
// one batch: call(prompt) -> {verdicts: Map, ...}; retry once when items are missing, then single(rowIndex) for the rest.
// Returns [{i, verdict, aIsPred, single}] in row order plus the batch call results (for usage / timing).
export async function judgeBatch(rows, call, single) {
  const { items, text } = buildBatchPrompt(rows);
  const got = new Map(), calls = [];
  for (let attempt = 0; attempt < 2 && got.size < rows.length; attempt++) {
    try {
      const res = await call(text);
      calls.push(res);
      for (const [k, v] of res.verdicts) if (!got.has(k)) got.set(k, v);
    } catch (e) { calls.push({ error: String(e.message || e) }); }
  }
  const out = [];
  for (let i = 0; i < rows.length; i++) {
    const v = got.get(i + 1);
    out.push(v ? { i, verdict: v, aIsPred: items[i].aIsPred, single: false } : { i, ...(await single(i)), single: true });
  }
  return { out, calls };
}

// ---------- --backend codex / grok (subscription CLIs, same flags as grok_gen.mjs) ----------
export const DEFAULT_MODEL = { cli: 'claude-opus-5-5', api: 'claude-opus-5-5', codex: 'gpt-6-luna', grok: 'grok-4.6', jev: 'jev-latest' };
// `codex exec` argv: prompt on stdin ('-'), schema file + last-message file, read-only sandbox.
export function codexArgs(model, effort, schemaFile, outFile) {
  return ['exec', '-m', model, '-c', `model_reasoning_effort="${effort}"`, '--disable', 'multi_agent',
    '-s', 'read-only', '--skip-git-repo-check', '--json', '--output-schema', schemaFile, '-o', outFile, '-'];
}
// codex has no system prompt flag: the rubric is prepended to the user prompt.
export const codexPrompt = (prompt) => `${SYSTEM}\n\n${prompt}`;
// codex --json event stream (stdout) + last message (outFile text) -> {verdict, usage, cost_usd}
export function parseCodexResult(stdout, lastMessage) {
  let u = {};
  for (const l of String(stdout ?? '').split('\n')) {
    try { const e = JSON.parse(l); const x = e.usage || e.msg?.info?.total_token_usage || e.info?.total_token_usage; if (x) u = x; } catch {}
  }
  const verdict = parseVerdict(lastMessage);
  return { verdict, usage: { input_tokens: u.input_tokens || 0, cache_read_input_tokens: u.cached_input_tokens || 0,
    output_tokens: u.output_tokens || 0, reasoning_tokens: u.reasoning_output_tokens || u.reasoning_tokens || 0 }, cost_usd: 0 };
}
export function grokArgs(model, effort, promptFile) {
  return ['--prompt-file', promptFile, '--no-subagents', '--disable-web-search', '--max-turns', '1', '--tools', '',
    '--system-prompt-override', SYSTEM, '--json-schema', JSON.stringify(OUT_SCHEMA), '-m', model, '--reasoning-effort', effort];
}
// grok headless stdout {structuredOutput | text, usage, total_cost_usd} -> {verdict, usage, cost_usd}
export function parseGrokResult(stdout) {
  let j;
  try { j = JSON.parse(stdout); } catch { throw new Error('cli: stdout is not JSON'); }
  const so = j.structuredOutput ?? j.structured_output;
  const verdict = parseVerdict(so && typeof so === 'object' ? JSON.stringify(so) : j.text ?? j.result);
  const u = j.usage || {};
  return { verdict, usage: { input_tokens: u.input_tokens || 0, output_tokens: u.output_tokens || 0, reasoning_tokens: u.reasoning_tokens || 0 },
    cost_usd: Number(j.total_cost_usd) || 0 };
}

// --rows: adjudication-shaped rows (gold already joined) -> judge input rows, verdict fields dropped.
export function rowsFromAdjudications(recs) {
  return recs.filter((r) => !r.error).map((r) => ({ id: r.id, request: r.request, os: r.os, command: r.command, route: r.route, y: r.y,
    gold: r.gold ?? null, goldLabel: r.goldLabel }));
}

// judge vs reference (Opus) on pred_correct; "positive" = reference says wrong. Rows matched by id+command.
export function compareJudges(ref, judge) {
  const m = new Map(judge.filter((r) => !r.error && typeof r.pred_correct === 'boolean').map((r) => [`${r.id}\u0000${r.command}`, r]));
  const c = { n: 0, missing: 0, agree: 0, tp: 0, fp: 0, fn: 0, tn: 0 };
  for (const r of ref) {
    const j = m.get(`${r.id}\u0000${r.command}`);
    if (!j) { c.missing++; continue; }
    c.n++;
    const rw = !r.pred_correct, jw = !j.pred_correct;
    if (rw === jw) c.agree++;
    if (rw && jw) c.tp++; else if (!rw && jw) c.fp++; else if (rw) c.fn++; else c.tn++;
  }
  const div = (a, b) => (b ? +(a / b).toFixed(4) : null);
  return { ...c, agreement: div(c.agree, c.n), recall_wrong: div(c.tp, c.tp + c.fn), precision_wrong: div(c.tp, c.tp + c.fp) };
}
// combine judges: wrong if any judge says wrong (OR) -> rows with pred_correct = all correct; rows missing in any judge dropped
export function combineAnyWrong(...judges) {
  const maps = judges.map((js) => new Map(js.filter((r) => !r.error && typeof r.pred_correct === 'boolean').map((r) => [`${r.id}\u0000${r.command}`, r])));
  const out = [];
  for (const [k, r] of maps[0]) {
    const all = maps.map((m) => m.get(k));
    if (all.some((x) => !x)) continue;
    out.push({ id: r.id, command: r.command, pred_correct: all.every((x) => x.pred_correct) });
  }
  return out;
}

// ---------- --backend jev (TypeSafe Jev System One HTTP API, Noul questions -> p(correct)) ----------
// One request per row: state {request, os, command}, every variant below asked as its own Noul (evaluated
// independently, input tokens billed once for the state). --jev-variant picks the one behind pred_correct.
export const JEV_URL = 'https://api.typesafe.ai/v1/systemone';
export const JEV_PRICE_PER_TOK = 42 / 1e9;  // $42 / Btok input, output free (docs.typesafe.ai/models)
const JEV_Q = 'The shell command `command` does exactly what `request` asks on the `os` target: no dropped constraints, '
  + 'no extra unrequested effects, correct paths / patterns / flags. Equivalent spellings (flag order, quoting) count as correct.';
const JEV_CRIT = { true: 'Running `command` fully satisfies every part of `request` on `os` and does nothing else.',
  false: '`command` misses, changes or adds something relative to `request`, uses a wrong path / pattern / flag, or does not work on `os`.' };
const goldRef = (row) => row.gold ?? `(no command: the request should be declined, label "${row.goldLabel}")`;
export const JEV_VARIANTS = {
  plain: () => ({ type: 'noul', instructions: JEV_Q }),
  criteria: () => ({ type: 'noul', instructions: JEV_Q, criteria: JEV_CRIT }),
  strict: () => ({ type: 'noul', instructions: 'Would a strict expert shell reviewer accept `command` as an exact, complete answer to '
    + '`request` on `os`? Reject it for any dropped constraint, extra effect, wrong path, pattern or flag, or wrong tool for the OS.' }),
  gold: (row) => ({ type: 'noul', criteria: JEV_CRIT, instructions: { reference_answer: goldRef(row),
    question: `${JEV_Q} \`reference_answer\` is a reference answer that may itself be wrong; use it only as a hint.` } }),  gold_nocrit: (row) => ({ type: 'noul', instructions: { reference_answer: goldRef(row),
    question: `${JEV_Q} \`reference_answer\` is a reference answer that may itself be wrong; use it only as a hint.` } }),
  gold_strict: (row) => ({ type: 'noul', criteria: JEV_CRIT, instructions: { reference_answer: goldRef(row),
    question: 'Would a strict expert shell reviewer accept `command` as an exact, complete answer to `request` on `os`? '
      + '`reference_answer` is one possible answer (possibly wrong): compare what both do, and reject `command` for any dropped '
      + 'constraint, extra effect, wrong path, pattern or flag that the request does not allow.' } }),
};
// gold check: is the reference answer itself correct (-> gold_correct)
const JEV_GOLD_Q = (row) => ({ type: 'noul', criteria: JEV_CRIT, instructions: { reference_answer: goldRef(row),
  question: 'Judge `reference_answer` instead of `command`: it does exactly what `request` asks on `os` (no dropped constraints, '
    + 'no extra effects, correct paths / patterns / flags). If it declines, yes means the request really should not be answered with a shell command.' } });

export function jevBody(row, model, variants = Object.keys(JEV_VARIANTS), withGold = true) {
  const questions = {};
  for (const v of variants) {
    if (!JEV_VARIANTS[v]) throw new Error(`unknown jev variant ${v}`);
    questions[`v_${v}`] = JEV_VARIANTS[v](row);
  }
  if (withGold) questions.gold_ok = JEV_GOLD_Q(row);
  return { model, state: { request: row.request, os: PLATFORM_NAME[row.os] || PLATFORM_NAME.linux, command: row.command }, questions };
}
// response JSON -> {p: {variant: number}, p_gold, model, usage}; throws when an asked Noul is missing
export function parseJevResult(j, variants = Object.keys(JEV_VARIANTS), withGold = true) {
  const a = j?.answers || {}, num = (k) => { const x = a[k]?.noul; if (typeof x !== 'number' || !Number.isFinite(x)) throw new Error(`jev: missing ${k}`); return x; };
  const p = Object.fromEntries(variants.map((v) => [v, num(`v_${v}`)]));
  return { p, p_gold: withGold ? num('gold_ok') : null, model: j.model, usage: { input_tokens: j.usage?.input_tokens || 0, output_tokens: j.usage?.output_tokens || 0 } };
}
// parsed result -> verdict fields of an adjudication record (pred_correct = p >= threshold)
export function jevVerdict(res, variant, threshold) {
  if (!(variant in res.p)) throw new Error(`jev: variant ${variant} not asked`);
  const p = res.p[variant];
  return { p, p_variants: res.p, p_gold: res.p_gold, threshold, pred_correct: p >= threshold,
    gold_correct: res.p_gold == null ? null : res.p_gold >= threshold, equivalent: null, reason: `jev ${variant} p=${p}` };
}
// retry policy: 429 / 529 / 5xx / network -> backoff (retry-after seconds if given), anything else fatal
export const jevRetryable = (status) => status === 429 || status >= 500;
export const jevBackoffMs = (attempt, retryAfter) => (Number(retryAfter) > 0 ? Number(retryAfter) * 1000 : Math.min(30000, 500 * 2 ** attempt));

// ROC AUC of score s for positive label (Mann-Whitney, ties count 1/2); rows [{s, pos}]
export function aucOf(rows) {
  const pos = rows.filter((r) => r.pos), neg = rows.filter((r) => !r.pos);
  if (!pos.length || !neg.length) return null;
  const all = rows.map((r) => r.s).sort((a, b) => a - b), rank = new Map();
  for (let i = 0; i < all.length;) { let j = i; while (j < all.length && all[j] === all[i]) j++; rank.set(all[i], (i + j + 1) / 2); i = j; }
  const sumPos = pos.reduce((a, r) => a + rank.get(r.s), 0);
  return +((sumPos - pos.length * (pos.length + 1) / 2) / (pos.length * neg.length)).toFixed(4);
}
// threshold sweep for "wrong" detection: flag wrong when p < t. rows [{p, wrong}] -> per-t {t, recall, precision, agreement, flagged}
export function sweepWrong(rows) {
  const ts = [...new Set(rows.map((r) => r.p))].sort((a, b) => a - b).map((p) => p + 1e-9);
  const nW = rows.filter((r) => r.wrong).length;
  return [0, ...ts].map((t) => {
    let tp = 0, fp = 0;
    for (const r of rows) if (r.p < t) { if (r.wrong) tp++; else fp++; }
    const fn = nW - tp, tn = rows.length - nW - fp;
    return { t: +t.toFixed(4), recall: nW ? tp / nW : null, precision: tp + fp ? tp / (tp + fp) : null, agreement: (tp + tn) / rows.length, flagged: tp + fp, fn };
  });
}
