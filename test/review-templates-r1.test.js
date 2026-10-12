// The git grep / git show templates are disabled in 0.3.4 (src/fill.js DISABLED_TEMPLATES). Their review suite (r1..r37)
// is kept in test-grep-show/ and runs here with TELLSH_ENABLE_GREP_SHOW=1, so the parser stays covered for a later release.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

test('kept git grep / git show review suite passes with the templates enabled', () => {
  const file = fileURLToPath(new URL('../test-grep-show/review-templates-r1.mjs', import.meta.url));
  const r = spawnSync(process.execPath, ['--test', file], { env: { ...process.env, TELLSH_ENABLE_GREP_SHOW: '1' }, encoding: 'utf8' });
  assert.equal(r.status, 0, (r.stdout || '').split('\n').filter((l) => /^not ok|^# (pass|fail)/.test(l)).join('\n'));
});
