// catalog-038 gate fall-through: the templates model ranks a template intent among its candidates but not first, so the
// 0.3.3 model answers; a medium+ risk answer is then withheld (a retrain must not make a fetch request a runnable git pull).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { fallthroughGuard, FALLTHROUGH_P } from '../src/templates038.js';

const isNew = (i) => i === 'git_fetch';
const res = { intent: 'git_pull', command: 'git pull', risk: 'medium', missing: [] };

test('fallthroughGuard withholds a medium+ answer when a template candidate is above the threshold', () => {
  const probe = { intent: 'git_pull', candidates: [{ intent: 'git_pull', p: 0.6 }, { intent: 'git_fetch', p: 0.35 }] };
  assert.deepEqual(fallthroughGuard(probe, res, isNew).missing, ['args (a git_fetch template request, not answered by the fallback model)']);
  assert.equal(fallthroughGuard(probe, { ...res, risk: 'high' }, isNew).missing.length, 1);
});

test('fallthroughGuard keeps safe answers, low template probability, withheld answers and template answers', () => {
  const probe = { candidates: [{ intent: 'git_fetch', p: 0.5 }] };
  assert.equal(fallthroughGuard(probe, { ...res, risk: 'safe' }, isNew).missing.length, 0);
  assert.equal(fallthroughGuard({ candidates: [{ intent: 'git_fetch', p: FALLTHROUGH_P - 0.01 }] }, res, isNew), res);
  const w = { ...res, missing: ['x'] };
  assert.equal(fallthroughGuard(probe, w, isNew), w);
  const t = { ...res, intent: 'git_fetch' };
  assert.equal(fallthroughGuard(probe, t, isNew), t);
  assert.equal(fallthroughGuard(null, res, isNew), res);
});

test('fetch-like requests that fall through to git pull are not runnable', () => {
  for (const q of ['fetch the latest from upstream then new branch feature', 'get remote changes without merging', 'zaciągnij nowe commity z originu']) {
    const r = suggest(q, { shell: 'bash', os: 'linux' });
    assert.notEqual(r.intent, 'git_fetch', q);
    assert.ok(r.command == null || r.missing.length > 0, `${q} -> ${r.command} runnable`);
  }
});

test('a plain fetch request still answers git fetch', () => {
  assert.equal(suggest('fetch from origin', { shell: 'bash', os: 'linux' }).intent, 'git_fetch');
});
