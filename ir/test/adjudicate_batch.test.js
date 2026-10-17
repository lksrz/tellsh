// scripts/ir/adjudicate_lib.mjs --batch N helpers: batch prompt, verdict array parsing, retry + single-row fallback.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPrompt, buildBatchPrompt, parseBatchVerdicts, parseCliBatchResult, judgeBatch, cliArgs, BATCH_SCHEMA, BATCH_SYSTEM, SYSTEM }
  from '../../scripts/ir/adjudicate_lib.mjs';

const rows = [
  { id: 'dev:1', request: 'list files', os: 'linux', command: 'ls', gold: 'ls -1', goldLabel: 'ok' },
  { id: 'dev:2', request: 'tell me a joke', os: 'darwin', command: 'echo hi', gold: null, goldLabel: 'ooc' },
  { id: 'dev:3', request: 'count lines in a', os: 'linux', command: 'wc -l a', gold: 'wc -l < a', goldLabel: 'ok' },
];
const v = (item, a = true) => ({ item, a_correct: a, b_correct: !a, equivalent: false, reason: `r${item}` });

test('buildBatchPrompt: numbered items, same A/B order and refusal context as single mode', () => {
  const { items, text } = buildBatchPrompt(rows);
  assert.deepEqual(items.map((x) => x.aIsPred), rows.map((r) => buildPrompt(r).aIsPred));
  for (let i = 1; i <= 3; i++) assert.ok(text.includes(`=== Item ${i} ===`));
  assert.ok(text.includes('One answer declines'));
  assert.equal(text.split('One answer declines').length, 2);  // only the refusal row
  assert.ok(!text.includes('For each answer decide'));
  assert.ok(text.includes('For EACH of the 3 items'));
  const single = buildPrompt(rows[0]).text.split('\nFor each answer decide:')[0];
  assert.ok(text.includes(single));
});

test('cliArgs batch: array schema + batch rubric', () => {
  const a = cliArgs('m', 'low', true);
  assert.deepEqual(JSON.parse(a[a.indexOf('--json-schema') + 1]), BATCH_SCHEMA);
  assert.equal(a[a.indexOf('--system-prompt') + 1], BATCH_SYSTEM);
  assert.ok(BATCH_SYSTEM.startsWith(SYSTEM) && /independently/.test(BATCH_SYSTEM));
  assert.equal(cliArgs('m', 'low')[cliArgs('m', 'low').indexOf('--system-prompt') + 1], SYSTEM);
});

test('parseBatchVerdicts: object / bare array / fenced text; drops bad, out-of-range and duplicate items', () => {
  const m = parseBatchVerdicts({ verdicts: [v(2), v(1, false), v(3)] }, 3);
  assert.equal(m.size, 3);
  assert.equal(m.get(1).a_correct, false);
  assert.equal(parseBatchVerdicts('```json\n' + JSON.stringify([v(1), v(2)]) + '\n```', 2).size, 2);
  const bad = parseBatchVerdicts({ verdicts: [v(1), v(1), v(4), { item: 2, a_correct: 'yes' }, v(3)] }, 3);
  assert.deepEqual([...bad.keys()], [3]);
  assert.throws(() => parseBatchVerdicts({ foo: 1 }, 2), /missing verdicts/);
  assert.throws(() => parseBatchVerdicts('nope', 2), /no JSON/);
});

test('parseCliBatchResult: structured_output, usage, CLI error', () => {
  const r = parseCliBatchResult(JSON.stringify({ structured_output: { verdicts: [v(1)] }, usage: { input_tokens: 5, output_tokens: 9 }, total_cost_usd: 0.2 }), 1);
  assert.equal(r.verdicts.get(1).reason, 'r1');
  assert.equal(r.usage.output_tokens, 9);
  assert.equal(r.cost_usd, 0.2);
  assert.throws(() => parseCliBatchResult(JSON.stringify({ is_error: true, result: 'x' }), 1), /cli error/);
});

test('judgeBatch: complete first call -> no retry, no singles', async () => {
  let n = 0;
  const { out, calls } = await judgeBatch(rows, async () => { n++; return { verdicts: new Map([[1, v(1)], [2, v(2)], [3, v(3)]]) }; },
    async () => assert.fail('no single'));
  assert.equal(n, 1); assert.equal(calls.length, 1);
  assert.deepEqual(out.map((x) => [x.i, x.single, x.verdict.reason]), [[0, false, 'r1'], [1, false, 'r2'], [2, false, 'r3']]);
});

test('judgeBatch: missing items -> one batch retry, then single-row fallback for the rest', async () => {
  const replies = [new Map([[1, v(1)]]), new Map([[2, v(2)], [1, v(1, false)]])];
  const singles = [];
  const { out, calls } = await judgeBatch(rows, async () => ({ verdicts: replies.shift() }), async (i) => { singles.push(i); return { rec: { id: rows[i].id } }; });
  assert.equal(calls.length, 2);
  assert.deepEqual(singles, [2]);
  assert.equal(out[0].verdict.a_correct, true);  // first answer kept
  assert.equal(out[1].verdict.reason, 'r2');
  assert.equal(out[2].single, true);
});

test('judgeBatch: failing calls -> all rows judged singly', async () => {
  const singles = [];
  const { out, calls } = await judgeBatch(rows, async () => { throw new Error('cli exit 1'); }, async (i) => { singles.push(i); return {}; });
  assert.equal(calls.length, 2);
  assert.ok(calls.every((c) => c.error));
  assert.deepEqual(singles, [0, 1, 2]);
  assert.ok(out.every((x) => x.single));
});
