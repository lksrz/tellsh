// scripts/ir/adjudicate_lib.mjs: prompt building, verdict parsing, A/B unshuffling, summary and score merge.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPrompt, parseVerdict, unshuffle, summarize, adjudicatedY, predIsA, category } from '../../scripts/ir/adjudicate_lib.mjs';

const row = { id: 'test:7', request: 'list files in src', os: 'darwin', command: 'ls src', gold: 'ls -1 src', goldLabel: 'ok' };

test('prompt places pred/gold in deterministic order and names the OS', () => {
  const p = buildPrompt(row);
  assert.equal(p.aIsPred, predIsA('test:7'));
  assert.equal(buildPrompt(row).aIsPred, p.aIsPred);
  const a = p.text.indexOf('ls src\n'), b = p.text.indexOf('ls -1 src');
  assert.ok(a >= 0 && b >= 0);
  assert.equal(a < b, p.aIsPred);
  assert.match(p.text, /darwin_bsd/);
  assert.doesNotMatch(p.text, /decline/);
  const ids = Array.from({ length: 40 }, (_, i) => predIsA(`dev:${i}`));
  assert.ok(ids.includes(true) && ids.includes(false));
});

test('refusal gold asks whether to answer at all', () => {
  const p = buildPrompt({ ...row, gold: null, goldLabel: 'not_shell' });
  assert.match(p.text, /decline/);
  assert.match(p.text, /not_shell/);
});

test('parseVerdict accepts fenced JSON and rejects missing fields', () => {
  assert.deepEqual(parseVerdict('```json\n{"a_correct":true,"b_correct":false,"equivalent":false,"reason":"x"}\n```'),
    { a_correct: true, b_correct: false, equivalent: false, reason: 'x' });
  assert.throws(() => parseVerdict('{"a_correct":true}'));
  assert.throws(() => parseVerdict('nope'));
});

test('unshuffle maps A/B back to pred/gold', () => {
  const v = { a_correct: true, b_correct: false, equivalent: false, reason: '' };
  assert.equal(unshuffle(v, true).pred_correct, true);
  assert.equal(unshuffle(v, false).pred_correct, false);
  assert.equal(unshuffle(v, false).gold_correct, true);
});

test('summary categories and cost', () => {
  const recs = [
    { y: 0, pred_correct: true, gold_correct: true, equivalent: true, cost_usd: 0.01 },
    { y: 0, pred_correct: true, gold_correct: false, cost_usd: 0.01 },
    { y: 0, pred_correct: false, gold_correct: true },
    { y: 0, pred_correct: false, gold_correct: false },
    { y: 1, pred_correct: false, gold_correct: true },
    { y: 0, error: 'x' },
  ];
  const s = summarize(recs);
  assert.deepEqual(s.disagree, { n: 4, both_correct: 1, pred_correct_gold_wrong: 1, pred_wrong: 1, both_wrong: 1, equivalent: 1 });
  assert.equal(s.agree_sample.pred_wrong, 1);
  assert.equal(s.errors, 1);
  assert.equal(s.cost_usd, 0.02);
  assert.equal(category({ pred_correct: true, gold_correct: false }), 'pred_correct_gold_wrong');
});

test('adjudicatedY flips only y=0 with matching command and pred correct', () => {
  const adj = new Map([['dev:1', { command: 'ls a', pred_correct: true }], ['dev:2', { command: 'ls b', pred_correct: false }]]);
  assert.equal(adjudicatedY(false, 'dev:1', 'ls a', adj), true);
  assert.equal(adjudicatedY(false, 'dev:1', 'ls X', adj), false);
  assert.equal(adjudicatedY(false, 'dev:2', 'ls b', adj), false);
  assert.equal(adjudicatedY(true, 'dev:9', 'x', adj), true);
  assert.equal(adjudicatedY(false, 'dev:1', 'ls a', null), false);
});

test('adjudicatedY truth mode lets the verdict override gold both ways', async () => {
  const { adjudicatedY } = await import('../../scripts/ir/adjudicate_lib.mjs');
  const adj = new Map([['a', { command: 'ls', pred_correct: false }], ['b', { command: 'pwd', pred_correct: true }]]);
  assert.equal(adjudicatedY(1, 'a', 'ls', adj), true);
  assert.equal(adjudicatedY(1, 'a', 'ls', adj, true), false);
  assert.equal(adjudicatedY(0, 'b', 'pwd', adj, true), true);
  assert.equal(adjudicatedY(1, 'a', 'ls -l', adj, true), true);
});
