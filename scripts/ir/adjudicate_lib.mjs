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
export function cliArgs(model, effort) {
  return ['-p', '--model', model, '--effort', effort, '--output-format', 'json', '--json-schema', JSON.stringify(OUT_SCHEMA),
    '--no-session-persistence', '--tools', '', '--strict-mcp-config', '--disable-slash-commands', '--system-prompt', SYSTEM];
}
// child env without API credentials, so the CLI falls back to the subscription (OAuth) login.
export const CLI_STRIP_ENV = ['ANTHROPIC_API_KEY', 'CLAUDE_API_KEY', 'ANTHROPIC_AUTH_TOKEN'];
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
