// scripts/ir/adjudicate_lib.mjs --backend jev helpers: request body, response parsing, verdict mapping, retry, AUC / sweep.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JEV_VARIANTS, jevBody, parseJevResult, jevVerdict, jevRetryable, jevBackoffMs, aucOf, sweepWrong } from '../../scripts/ir/adjudicate_lib.mjs';

const row = { id: 'dev:1', request: 'count lines in a.txt', os: 'darwin', command: 'wc -l a.txt', gold: 'wc -l < a.txt', goldLabel: 'ok' };

test('jevBody: state has request/os/command only, one Noul per variant + gold check, gold in instructions', () => {
  const b = jevBody(row, 'jev-latest');
  assert.equal(b.model, 'jev-latest');
  assert.deepEqual(Object.keys(b.state), ['request', 'os', 'command']);
  assert.match(b.state.os, /darwin_bsd/);
  assert.deepEqual(Object.keys(b.questions).sort(), [...Object.keys(JEV_VARIANTS).map((v) => `v_${v}`), 'gold_ok'].sort());
  for (const q of Object.values(b.questions)) assert.equal(q.type, 'noul');
  assert.equal(b.questions.v_gold.instructions.reference_answer, 'wc -l < a.txt');
  assert.equal(typeof b.questions.v_plain.instructions, 'string');
  assert.ok(!JSON.stringify(b.state).includes('wc -l <'));
  const d = jevBody({ ...row, gold: null, goldLabel: 'ooc' }, 'm', ['plain'], false);
  assert.deepEqual(Object.keys(d.questions), ['v_plain']);
  assert.throws(() => jevBody(row, 'm', ['nope']), /unknown jev variant/);
});

test('jevBody: declined gold is described in reference_answer', () => {
  const b = jevBody({ ...row, gold: null, goldLabel: 'ooc' }, 'm');
  assert.match(b.questions.v_gold.instructions.reference_answer, /declined.*ooc/);
});

test('parseJevResult + jevVerdict: p per variant, threshold, gold_correct', () => {
  const j = { model: 'jev-1.13.0', answers: { v_plain: { type: 'noul', noul: 0.3 }, v_gold: { type: 'noul', noul: 0.8 }, gold_ok: { type: 'noul', noul: 0.4 } },
    usage: { input_tokens: 900, output_tokens: 20 } };
  const r = parseJevResult(j, ['plain', 'gold']);
  assert.deepEqual(r.p, { plain: 0.3, gold: 0.8 });
  assert.equal(r.p_gold, 0.4);
  assert.equal(r.usage.input_tokens, 900);
  const v = jevVerdict(r, 'gold', 0.5);
  assert.equal(v.p, 0.8); assert.equal(v.pred_correct, true); assert.equal(v.gold_correct, false);
  assert.equal(jevVerdict(r, 'plain', 0.5).pred_correct, false);
  assert.equal(jevVerdict(r, 'gold', 0.8).pred_correct, true);
  assert.throws(() => jevVerdict(r, 'strict', 0.5), /not asked/);
  assert.throws(() => parseJevResult({ answers: { v_plain: { noul: 0.1 } } }, ['plain', 'gold'], false), /missing v_gold/);
  assert.throws(() => parseJevResult({ answers: { v_plain: { noul: 0.1 } } }, ['plain']), /missing gold_ok/);
});

test('jevRetryable / jevBackoffMs', () => {
  for (const s of [429, 500, 529]) assert.ok(jevRetryable(s));
  for (const s of [200, 400, 401, 422]) assert.ok(!jevRetryable(s));
  assert.equal(jevBackoffMs(0, '3'), 3000);
  assert.equal(jevBackoffMs(2), 2000);
  assert.equal(jevBackoffMs(20), 30000);
});

test('aucOf: perfect, inverted, ties, degenerate', () => {
  assert.equal(aucOf([{ s: 1, pos: true }, { s: 0, pos: false }]), 1);
  assert.equal(aucOf([{ s: 0, pos: true }, { s: 1, pos: false }]), 0);
  assert.equal(aucOf([{ s: 0.5, pos: true }, { s: 0.5, pos: false }]), 0.5);
  assert.equal(aucOf([{ s: 1, pos: true }]), null);
});

test('sweepWrong: recall / precision when flagging p < t', () => {
  const sw = sweepWrong([{ p: 0.1, wrong: true }, { p: 0.4, wrong: false }, { p: 0.6, wrong: true }, { p: 0.9, wrong: false }]);
  assert.equal(sw[0].flagged, 0);
  const at = (t) => sw.find((s) => Math.abs(s.t - t) < 1e-3);
  assert.deepEqual([at(0.1).recall, at(0.1).precision], [0.5, 1]);
  assert.deepEqual([at(0.6).recall, at(0.6).precision, at(0.6).flagged], [1, 2 / 3, 3]);
  assert.equal(sw.at(-1).agreement, 0.5);
});
