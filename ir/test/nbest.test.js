// scripts/ir/nbest_lib.mjs: n-best D routing (first gate-accepted hypothesis), margin, beam agreement, knobs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selectD, nbestKeeps, nbestEval, pickMaxKept, pickByCoverage, NO_MARGIN } from '../../scripts/ir/nbest_lib.mjs';

// actions are plain strings here: compile maps them to a command (null = gate rejects)
const table = { a: null, b: 'ls src', c: 'ls  src', d: 'ls -a', e: null };
const compile = (x) => table[x];
const same = (x, y) => x.replace(/\s+/g, ' ') === y.replace(/\s+/g, ' ');
const hyp = (actions, score, logp = score) => ({ actions, score, logp, ptr_logp: 0 });

test('no nbest: greedy actions, rank 0, no margin / agreement', () => {
  assert.deepEqual(selectD({ actions: 'b' }, compile, same), { command: 'ls src', actions: 'b', rank: 0, margin: null, agree: null });
  assert.equal(selectD({ actions: 'a' }, compile, same).command, null);
});

test('first gate-accepted hypothesis in rank order, margin to next distinct command', () => {
  const s = selectD({ actions: 'a', nbest: [hyp('a', -0.1), hyp('b', -0.3), hyp('c', -0.4), hyp('d', -1.0)] }, compile, same);
  assert.equal(s.command, 'ls src');
  assert.equal(s.actions, 'b');
  assert.equal(s.rank, 1);
  assert.equal(s.margin, 0.7); // c compiles to the same command -> skipped; d differs
});

test('rejected hypothesis after the chosen one counts as distinct; none -> NO_MARGIN', () => {
  assert.equal(selectD({ nbest: [hyp('b', -0.2), hyp('e', -0.5)] }, compile, same).margin, 0.3);
  assert.equal(selectD({ nbest: [hyp('b', -0.2), hyp('c', -0.5)] }, compile, same).margin, NO_MARGIN);
});

test('beam agreement = softmax mass on hypotheses with an equal command', () => {
  const s = selectD({ nbest: [hyp('b', 0, Math.log(0.5)), hyp('d', 0, Math.log(0.3)), hyp('c', 0, Math.log(0.2))] }, compile, same);
  assert.equal(s.agree, 0.7);
});

test('nothing accepted: abstain with the best hypothesis', () => {
  const s = selectD({ nbest: [hyp('a', -0.1), hyp('e', -0.2)] }, compile, same);
  assert.deepEqual(s, { command: null, actions: 'a', rank: null, margin: null, agree: null });
});

test('compile throwing counts as rejected', () => {
  const s = selectD({ nbest: [hyp('x', -0.1), hyp('b', -0.2)] }, (x) => { if (x === 'x') throw new Error('bad'); return compile(x); }, same);
  assert.equal(s.rank, 1);
});

test('nbestKeeps: P candidates pass, D candidates checked against each knob', () => {
  const k = { max_rank: 1, min_margin: 0.2, min_beam_agree: 0.5 };
  assert.ok(nbestKeeps({ rank: null }, k));
  assert.ok(nbestKeeps({ rank: 1, margin: 0.3, nb_agree: 0.6 }, k));
  assert.ok(!nbestKeeps({ rank: 2, margin: 0.3, nb_agree: 0.6 }, k));
  assert.ok(!nbestKeeps({ rank: 0, margin: 0.1, nb_agree: 0.6 }, k));
  assert.ok(!nbestKeeps({ rank: 0, margin: 0.3, nb_agree: 0.4 }, k));
  assert.ok(nbestKeeps({ rank: 5, margin: 0, nb_agree: 0 }, {}));
});

test('nbestEval + pickMaxKept / pickByCoverage over the knob grid', () => {
  const items = [
    ...Array.from({ length: 10 }, () => ({ p: 1, y: true, rank: 0, margin: 1, nb_agree: 1, agree: 1 })),
    ...Array.from({ length: 3 }, () => ({ p: 1, y: false, ya: true, rank: 2, margin: 1, nb_agree: 1, agree: 0 })),
    { p: 1, y: true, rank: null, agree: 1 },
  ];
  const rows = nbestEval(items, 1, [-Infinity]);
  const b = pickMaxKept(rows, (w) => w === 0, 1);
  assert.equal(b.kept, 11);
  assert.ok(b.max_rank < 2 || b.min_agree === 1);
  assert.equal(pickMaxKept(rows, (w) => w === 0, 100), null);
  assert.equal(pickMaxKept(rows, (w) => w === 0, 1, true).kept, 14); // adjudicated: the rank-2 ones are correct
  const c = pickByCoverage(rows, 0.9, 12, (w, k) => w / k);
  assert.equal(c.kept, 11); // 11 / 12 correct, 0 wrong
  assert.equal(pickByCoverage(rows, 0.99, 12, (w, k) => w / k), null); // raw correct is at most 11 / 12
  assert.equal(pickByCoverage(rows, 0.99, 12, (w, k) => w / k, true).kept, 14); // adjudicated: 14 correct
});
