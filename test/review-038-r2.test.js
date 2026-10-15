import test from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const runnable = (r) => !!r?.command && !(r.missing || []).length && r.understood !== false;

test('catalog-038 review r2: template vocabulary never answers a different request', () => {
  for (const top of [1, 3, 5]) for (const shell of ['bash', 'powershell']) {
    const o = { shell, os: shell === 'bash' ? 'linux' : 'win32', top };
    for (const q of ['podsumowanie zatwierdzonych zmian', 'pokaż statystyki zatwierdzonych zmian', 'statystyki zmian zatwierdzonych']) {
      const r = suggest(q, o);
      assert.ok(!(runnable(r) && r.intent === 'git_diff_stat'), `${shell}/${top}: ${q} -> ${r.command}`);
    }
    for (const q of ['show installed python version']) assert.notEqual(suggest(q, o).intent === 'pip_list' && runnable(suggest(q, o)), true, q);
    for (const q of ['what are my npm dependencies', 'list npm dependencies']) {
      const r = suggest(q, o);
      assert.ok(!(runnable(r) && r.intent === 'npm_outdated'), `${shell}/${top}: ${q} -> ${r.command}`);
    }
    for (const q of ['git diff --name-only name', 'git diff --stat main', 'git diff --name-only HEAD~1']) assert.ok(!runnable(suggest(q, o)) || !/^git diff --(?:stat|name-only)$/.test(suggest(q, o).command), q);
  }
  // still answered
  const o = { shell: 'bash', os: 'linux' };
  assert.equal(suggest('git diff --name-only', o).command, 'git diff --name-only');
  assert.equal(suggest('pokaż statystyki niezatwierdzonych zmian', o).command, 'git diff --stat');
  assert.equal(suggest('which npm packages are outdated', o).command, 'npm outdated');
  assert.equal(suggest('list installed pip packages', o).command, 'python3 -m pip list');
});
