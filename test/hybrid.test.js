import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggestHybrid, rerank, POLICY } from '../src/rerank/hybrid.js';
import { NONE } from '../src/tools.js';

const env = { shell: 'bash', os: 'linux' };
// fake encoder: puts all mass on one intent, so the re-ranked decision is fully determined by the policy
const fake = (intent, pNone = 0) => ({ infer: async () => ({ intents: { [intent]: 0.99 }, pNone, tagger: undefined }) });

test('confident cascade answers alone (encoder never called)', async () => {
  let called = false;
  const enc = { infer: async () => { called = true; return { intents: {}, pNone: 0 }; } };
  const r = await suggestHybrid('show git status', { env, encoder: enc });
  assert.equal(r.intent, 'git_status');
  assert.equal(r.hybrid.deferred, false);
  assert.equal(called, false);
});

test('rerank only picks among the cascade top-k', () => {
  const c = { confidence: 0.5, topTool: 'fs', intent: 'a', tool: 'fs', tools: [], top: [{ intent: 'a', p: 0.5 }, { intent: 'b', p: 0.3 }] };
  const r = rerank(c, { b: 0.9, zzz: 0.99 }, POLICY['A+B'], { thr: 0.3 });
  assert.equal(r.intent, 'b');
  assert.ok(r.reranked);
});

test('keepNone keeps the cascade rejection; safe never rescues', () => {
  const none = { confidence: 0.1, topTool: NONE, intent: 'a', tool: 'fs', tools: [], top: [{ intent: 'a', p: 0.1 }] };
  assert.equal(rerank(none, { a: 0.99 }, POLICY['A+B'], { thr: 0.3 }), none);
  const low = { ...none, topTool: 'fs' };
  assert.equal(rerank(low, { a: 0.99 }, POLICY['A+B-safe'], { thr: 0.3 }), low);
  // encoder says "not a shell request" -> rejection
  assert.ok(rerank(low, { a: 0.99 }, POLICY['A+B'], { thr: 0.3, pNone: 0.9 }).confidence < 0.3);
});

test('re-ranked dangerous answers keep the danger checks of the normal pipeline', async () => {
  const r = await suggestHybrid('get rid of everything in /', { env, encoder: fake('delete_dir') });
  assert.equal(r.intent, 'delete_dir');
  assert.equal(r.risk, 'high');
  assert.equal(r.critical, true);
  assert.equal(r.hybrid.deferred, true);
});

test('missing encoder falls back to the cascade', async () => {
  const r = await suggestHybrid('zrób coś z plikami chyba', { env });
  assert.ok(r.hybrid.unavailable === 'encoder' || r.hybrid.deferred === false);
});
