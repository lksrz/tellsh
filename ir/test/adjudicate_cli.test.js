// scripts/ir/adjudicate_lib.mjs --backend cli helpers: argv, credential-free env, CLI JSON parsing.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cliArgs, cliEnv, parseCliResult, SYSTEM } from '../../scripts/ir/adjudicate_lib.mjs';

test('cliArgs: print mode, model/effort, no tools, rubric as system prompt', () => {
  const a = cliArgs('claude-opus-5-5', 'low');
  assert.equal(a[0], '-p');
  assert.equal(a[a.indexOf('--model') + 1], 'claude-opus-5-5');
  assert.equal(a[a.indexOf('--effort') + 1], 'low');
  assert.equal(a[a.indexOf('--tools') + 1], '');
  assert.equal(a[a.indexOf('--system-prompt') + 1], SYSTEM);
  assert.equal(a[a.indexOf('--output-format') + 1], 'json');
});

test('cliEnv strips API credentials and keeps the rest', () => {
  const src = { ANTHROPIC_API_KEY: 'x', CLAUDE_API_KEY: 'y', ANTHROPIC_AUTH_TOKEN: 'z', HOME: '/h', PATH: '/p' };
  const e = cliEnv(src);
  assert.deepEqual(e, { HOME: '/h', PATH: '/p' });
  assert.equal(src.CLAUDE_API_KEY, 'y');
});

test('parseCliResult: structured_output, result text fallback, errors', () => {
  const v = { a_correct: true, b_correct: false, equivalent: false, reason: 'r' };
  const r = parseCliResult(JSON.stringify({ structured_output: v, usage: { input_tokens: 3, output_tokens: 7 }, total_cost_usd: 0.5 }));
  assert.deepEqual(r.verdict, v);
  assert.equal(r.usage.output_tokens, 7);
  assert.equal(r.cost_usd, 0.5);
  assert.deepEqual(parseCliResult(JSON.stringify({ result: '```json\n' + JSON.stringify(v) + '\n```' })).verdict, v);
  assert.equal(parseCliResult(JSON.stringify({ result: JSON.stringify(v) })).cost_usd, 0);
  assert.throws(() => parseCliResult('not json'), /not JSON/);
  assert.throws(() => parseCliResult(JSON.stringify({ is_error: true, result: 'limit' })), /cli error/);
  assert.throws(() => parseCliResult(JSON.stringify({ result: '{"a_correct": true}' })), /missing/);
});
