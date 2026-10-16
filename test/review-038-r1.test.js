// catalog-038 review r1: the fall-through guard does not depend on the display option `top`; git diff --stat / --name-only
// are value-free (a request naming a revision or scope is withheld, never answered with the plain diff).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const runnable = (q, o = {}) => { const r = suggest(q, { shell: 'bash', os: 'linux', ...o }); return r.command && !(r.missing || []).length ? r.command : null; };

test('r1: the fall-through guard gives the same runnable / withheld answer for top 1, 2, 3, 5', () => {
  for (const q of ['zaciągnij nowe commity z originu', 'fetch the latest from upstream then new branch feature', 'now git fetch from upstream',
    'could you inspect the last commit without merging', 'stash the changed files']) {
    const want = runnable(q, { top: 5 });
    for (const top of [1, 2, 3]) assert.equal(runnable(q, { top }), want, `top ${top}: ${q}`);
    assert.ok(!/^git (?:pull|reset|stash)\b/.test(want || ''), `${q} -> ${want}`);
  }
  for (const top of [1, 2, 3]) assert.ok(suggest('show a diff stat', { shell: 'bash', os: 'linux', top }).candidates.length <= top);
});

test('r1: the diff templates never take a revision; a scoped request is withheld', () => {
  for (const q of ['what changes do you see per file', 'diff stat from here', 'list changed files from now', 'diff stat since yesterday',
    'diff stat since monday', 'diff stat vs remote', 'list changed files from the server', 'show diff stat from staged changes',
    'diff stat of commit abc1234', 'names of files changed in the commit', 'names of files changed in the last commit',
    'which files changed on this branch', 'how many lines were added in each file per commit', 'diff stat since last commit',
    'diff stat od ostatniego commita', 'podsumowanie zmian dodanych do commita']) {
    const c = runnable(q);
    assert.ok(!/^git diff\b/.test(c || ''), `${q} -> ${c}`);
  }
  for (const q of ['which files do i have changed', 'show a diff stat', 'list the changed files']) {
    const c = runnable(q);
    assert.ok(c == null || c === 'git diff --stat' || c === 'git diff --name-only', `${q} -> ${c}`);
  }
});
