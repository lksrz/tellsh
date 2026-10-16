// scripts/ir/combined_lib.mjs: ensemble agreement counts and the (min_agree, threshold) dev choice.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { agreeCount, keeps, chooseGrid } from '../../scripts/ir/combined_lib.mjs';

test('agreeCount counts equivalent accepted commands of other models', () => {
  const others = [new Map([['dev:1', 'ls src']]), new Map([['dev:1', 'ls -a src']]), new Map(), new Map([['dev:1', 'ls src']])];
  assert.equal(agreeCount('dev:1', 'ls src', 'list src', others), 2);
  assert.equal(agreeCount('dev:2', 'ls src', 'list src', others), 0);
  assert.equal(agreeCount('dev:1', 'ls src', 'list src', []), 0);
});

test('keeps combines min_agree and threshold; -Infinity keeps unscored', () => {
  assert.ok(keeps({ p: -1, agree: 1 }, 1, -Infinity));
  assert.ok(!keeps({ p: -1, agree: 1 }, 1, 0.5));
  assert.ok(!keeps({ p: 0.9, agree: 0 }, 1, 0.5));
  assert.ok(keeps({ p: 0.9, agree: 2 }, 1, 0.5));
});

test('chooseGrid picks max kept satisfying the criterion', () => {
  // wrong candidates have low agreement; a verifier threshold alone cannot remove them
  const items = [
    ...Array.from({ length: 6 }, () => ({ p: 0.9, y: true, agree: 1 })),
    ...Array.from({ length: 2 }, () => ({ p: 0.95, y: false, agree: 0 })),
    { p: 0.6, y: true, agree: 0 },
  ];
  const crit = (w) => w === 0;
  assert.deepEqual(chooseGrid(items, 1, crit, 1), { min_agree: 1, t: 0.9, kept: 6 });
  assert.deepEqual(chooseGrid(items, 1, crit, 1, false), { min_agree: 1, t: -Infinity, kept: 6 });
  assert.equal(chooseGrid(items, 0, crit, 1), null);
  assert.equal(chooseGrid(items, 1, crit, 7), null);
});
