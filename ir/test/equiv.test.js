// scripts/ir/equiv.mjs: equivalent command spellings share a key; different meanings do not.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sameCommand } from '../../scripts/ir/equiv.mjs';

test('equivalence key', () => {
  for (const [a, b] of [
    ['rg EXPORT include/api.h | wc -l', 'rg -c EXPORT include/api.h'],
    ["rg -F a+b logs/x.log | wc -l", "rg -F -c 'a+b' logs/x.log"],
    ['grep -i x f.txt | wc -l', 'grep -ic x f.txt'],
    ['sort a.txt | uniq', 'sort -u a.txt'],
    ['ls -tr1', 'ls -1 -t -r'],
  ]) assert.ok(sameCommand(a, b), `${a} == ${b}`);
  for (const [a, b] of [
    ['rg x logs | wc -l', 'rg -c x logs'],
    ['rg x a.log b.log | wc -l', 'rg -c x a.log b.log'],
    ['rg -l x f.txt | wc -l', 'rg -l -c x f.txt'],
    ["rg 'a b' f.txt", 'rg a b f.txt'],
    ['sort a.txt | uniq -c', 'sort -u a.txt'],
  ]) assert.ok(!sameCommand(a, b), `${a} != ${b}`);
});
