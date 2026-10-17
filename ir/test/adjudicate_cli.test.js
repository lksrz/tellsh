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

import { codexArgs, codexPrompt, parseCodexResult, grokArgs, parseGrokResult, rowsFromAdjudications, compareJudges, combineAnyWrong, DEFAULT_MODEL } from '../../scripts/ir/adjudicate_lib.mjs';

test('codex/grok argv carry model, effort, schema; defaults', () => {
  const c = codexArgs('gpt-6-luna', 'low', 's.json', 'o.json');
  assert.equal(c[c.indexOf('-m') + 1], 'gpt-6-luna');
  assert.ok(c.includes('model_reasoning_effort="low"'));
  assert.equal(c[c.indexOf('--output-schema') + 1], 's.json');
  assert.equal(c.at(-1), '-');
  assert.ok(codexPrompt('P').startsWith(SYSTEM) && codexPrompt('P').endsWith('P'));
  const g = grokArgs('grok-4.6', 'low', 'p.txt');
  assert.equal(g[g.indexOf('--prompt-file') + 1], 'p.txt');
  assert.equal(g[g.indexOf('--reasoning-effort') + 1], 'low');
  assert.equal(g[g.indexOf('--system-prompt-override') + 1], SYSTEM);
  assert.equal(DEFAULT_MODEL.codex, 'gpt-6-luna');
  assert.equal(DEFAULT_MODEL.grok, 'grok-4.6');
});

test('cliEnv strips OpenAI / xAI keys too', () => {
  assert.deepEqual(cliEnv({ OPENAI_API_KEY: 'a', XAI_API_KEY: 'b', PATH: '/p' }), { PATH: '/p' });
});

test('parseCodexResult / parseGrokResult', () => {
  const v = { a_correct: false, b_correct: true, equivalent: false, reason: 'r' };
  const ev = [JSON.stringify({ type: 'x' }), JSON.stringify({ usage: { input_tokens: 5, output_tokens: 2, cached_input_tokens: 1 } }), 'junk'].join('\n');
  const r = parseCodexResult(ev, JSON.stringify(v));
  assert.deepEqual(r.verdict, v);
  assert.equal(r.usage.input_tokens, 5);
  assert.throws(() => parseCodexResult(ev, ''), /no JSON/);
  assert.deepEqual(parseGrokResult(JSON.stringify({ structuredOutput: v, total_cost_usd: 0.1 })).verdict, v);
  assert.deepEqual(parseGrokResult(JSON.stringify({ text: '```json\n' + JSON.stringify(v) + '\n```' })).verdict, v);
  assert.throws(() => parseGrokResult('nope'), /not JSON/);
});

test('rowsFromAdjudications drops verdicts and errors', () => {
  const rows = rowsFromAdjudications([{ id: 'a', request: 'q', os: 'linux', command: 'ls', y: 0, gold: null, goldLabel: 'ambiguous', pred_correct: true, key: 'k' }, { id: 'b', error: 'x' }]);
  assert.deepEqual(rows, [{ id: 'a', request: 'q', os: 'linux', command: 'ls', route: undefined, y: 0, gold: null, goldLabel: 'ambiguous' }]);
});

test('compareJudges + combineAnyWrong', () => {
  const ref = [{ id: 1, command: 'a', pred_correct: false }, { id: 2, command: 'b', pred_correct: false }, { id: 3, command: 'c', pred_correct: true }, { id: 4, command: 'd', pred_correct: true }];
  const j1 = [{ id: 1, command: 'a', pred_correct: false }, { id: 2, command: 'b', pred_correct: true }, { id: 3, command: 'c', pred_correct: true }, { id: 4, command: 'd', pred_correct: false }];
  const j2 = [{ id: 1, command: 'a', pred_correct: true }, { id: 2, command: 'b', pred_correct: false }, { id: 3, command: 'c', pred_correct: true }, { id: 4, command: 'd', error: 'x' }];
  const c = compareJudges(ref, j1);
  assert.deepEqual([c.tp, c.fn, c.fp, c.tn, c.agreement, c.recall_wrong, c.precision_wrong], [1, 1, 1, 1, 0.5, 0.5, 0.5]);
  assert.equal(compareJudges(ref, j2).missing, 1);
  const combo = compareJudges(ref, combineAnyWrong(j1, j2));
  assert.deepEqual([combo.n, combo.tp, combo.fn, combo.tn], [3, 2, 0, 1]);
});
