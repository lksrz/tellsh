// scripts/real/gate_diff.js: the pure compare logic (escalations, same-risk swaps, per-set counts) and the record rule.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compareDumps, record, rank } from '../scripts/real/gate_diff.js';

const rec = (i, intent, risk, runnable, set = 's') => ({ set, i, shell: 'bash', intent, risk, runnable, command: runnable ? intent : null });

test('rank: not runnable is -1, otherwise the risk rank', () => {
  assert.equal(rank(rec(0, 'a', 'high', false)), -1);
  assert.equal(rank(rec(0, 'a', 'safe', true)), 0);
  assert.equal(rank(rec(0, 'a', 'high', true)), 2);
});

test('compareDumps: escalations, swaps and per-set counts', () => {
  const old = [rec(0, 'ls', 'safe', true), rec(1, 'rm', 'high', false), rec(2, 'a', 'medium', true), rec(3, 'b', 'high', true), rec(4, 'x', 'safe', true), rec(5, 'c', 'safe', true)];
  const neu = [rec(0, 'ls', 'safe', true), rec(1, 'rm', 'high', true), rec(2, 'b', 'medium', true), rec(3, 'b', 'high', false), rec(4, 'y', 'medium', true), rec(5, 'd', 'safe', true)];
  const r = compareDumps(old, neu);
  assert.deepEqual(r.escalations.map((p) => p.new.i), [1, 4]);
  assert.deepEqual(r.swaps.map((p) => p.new.i), [2]); // safe→safe swap (#5) is not reported
  assert.deepEqual(r.perSet.s, { n: 6, unchanged: 1, changedIntent: 3, becameRunnable: 1, becameWithheld: 1, escalations: 2, swaps: 1 });
  assert.equal(r.unmatched, 0);
});

test('compareDumps: joins by set, index and shell; unmatched rows counted', () => {
  const r = compareDumps([rec(0, 'a', 'safe', true, 'x')], [rec(0, 'a', 'high', true, 'y'), { ...rec(0, 'a', 'safe', true, 'x'), shell: 'zsh' }]);
  assert.equal(r.unmatched, 2);
  assert.equal(r.escalations.length, 0);
});

test('record: runnable needs a command, no missing and understood !== false; composed is high', () => {
  const BY_ID = { ls: { risk: 'safe' }, rm: { risk: 'high' } };
  assert.equal(record({ intent: 'ls', command: 'ls', missing: [], method: 'catalog', risk: 'safe' }, BY_ID, {}).runnable, true);
  assert.equal(record({ intent: 'ls', command: 'ls', missing: ['x'] }, BY_ID, {}).runnable, false);
  assert.equal(record({ intent: 'ls', command: 'ls', understood: false }, BY_ID, {}).runnable, false);
  assert.equal(record({ intent: null, command: 'find .', method: 'composed' }, BY_ID, {}).risk, 'high');
  assert.equal(record({ intent: 'ls', command: 'ls', method: 'history-rule', risk: 'high' }, BY_ID, {}).risk, 'high');
});
