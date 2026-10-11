// Regression tests for round 13: the round-12 findings (review/r12-codex.md). An explicit pull request (number, URL or
// branch) is kept in `gh pr merge/view/checks`, or withheld as a placeholder, never dropped for the current branch's
// pull request; a command run in another namespace (`nsenter -t 1234 -p …`, `unshare -n …`) leaves pid/port/process
// values ambiguous; a package's version constraint is kept; the GPU LM trainer processes a partial batch.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { suggest } from '../src/pipeline.js';
import { analyzeCommand, isAmbiguous } from '../src/history.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });

test('major: an explicit pull request target is kept or withheld, never dropped', () => {
  const cases = {
    'merge pull request https://github.com/owner/repo/pull/123': 'gh pr merge https://github.com/owner/repo/pull/123',
    'merge pull request feature/login': 'gh pr merge feature/login',
    'merge pull request 123': 'gh pr merge 123',
    'merge pr #45': 'gh pr merge 45',
    'merge the pr for branch fix-1': 'gh pr merge fix-1',
    'show checks of pull request https://github.com/o/r/pull/9': 'gh pr checks https://github.com/o/r/pull/9',
    'view pull request 12': 'gh pr view 12',
  };
  for (const [q, cmd] of Object.entries(cases)) assert.equal(run(q).command, cmd, q);
  assert.equal(run('merge pull request feature/login', null, { shell: 'pwsh', os: 'windows' }).command, 'gh pr merge feature/login');
  // a selector that is not a PR number, URL or branch: placeholder, not a bare `gh pr merge`
  for (const q of ['merge pull request https://gitlab.com/x/y/-/merge_requests/3', 'merge pull request foo;rm', 'merge pull request ../x', 'merge pull request -rf']) {
    const r = run(q);
    assert.equal(r.command, 'gh pr merge <PR>', q);
    assert.deepEqual(r.missing, ['pr'], q);
  }
  // no selector named: the current branch's pull request
  for (const q of ['merge the pull request', 'merge pr now']) assert.equal(run(q).command, 'gh pr merge', q);
  // v0.3: "and delete the branch" is kept as --delete-branch
  assert.equal(run('merge the pull request and delete the branch').command, 'gh pr merge --delete-branch');
  assert.equal(run('view run 123456').command, 'gh run view 123456');
});

test('major: values a command saw in another namespace stay ambiguous', () => {
  for (const h of ['nsenter -t 1234 -p ps -p 42', 'nsenter --target 1234 --pid ps -p 42', 'nsenter --target=1234 --pid -- ps -p 42',
    'sudo nsenter -t 1234 -p ps -p 42', 'unshare -p -f ps -p 42', 'sudo -E nsenter -t 1 -p kill -0 42']) {
    const r = run('kill it', [h]);
    assert.equal(r.context.rule, 'refused', `${h}: ${r.command}`);
    assert.ok(r.command.includes('<PID>'), `${h}: ${r.command}`);
    const a = analyzeCommand(h);
    assert.ok(a.ents.pid == null || isAmbiguous(a.ents.pid), `${h}: ${JSON.stringify(a.ents)}`);
  }
  for (const h of ['nsenter -t 1234 -n lsof -i :8080', 'nsenter -a -t 1 lsof -i :8080', 'nsenter --net=/run/netns/blue lsof -i :8080',
    'nsenter -t 1234 -n -- lsof -i :8080', 'unshare -n lsof -i :8080']) {
    for (const q of ['kill it', 'what is using that port']) {
      const r = run(q, [h]);
      assert.ok(r.command == null || !r.command.includes('8080'), `${q} after ${h}: ${r.command}`);
    }
    const a = analyzeCommand(h);
    assert.ok(a.ents.port == null || isAmbiguous(a.ents.port), `${h}: ${JSON.stringify(a.ents)}`);
  }
  // the same commands in the caller's namespaces still resolve
  assert.equal(run('kill it', ['ps -p 42']).command, 'kill 42');
  assert.equal(run('kill it', ['sudo ps -p 42']).command, 'kill 42');
});

test('minor: a package version constraint is kept (or withheld), never dropped', () => {
  const cases = {
    'install requests==2.32.0 with pip': 'python3 -m pip install requests==2.32.0',
    'pip install requests==2.32.0': 'python3 -m pip install requests==2.32.0',
    'install requests>=2 with pip': "python3 -m pip install 'requests>=2'",
    'install django>=4,<5 with pip': "python3 -m pip install 'django>=4,<5'",
    'install requests[socks]==2.32.0 with pip': "python3 -m pip install 'requests[socks]==2.32.0'",
    'install typescript@^5.4 with npm': "npm install 'typescript@^5.4'",
    'install requests with pip': 'python3 -m pip install requests',
  };
  for (const [q, cmd] of Object.entries(cases)) assert.equal(run(q).command, cmd, q);
  const r = run('install requests==2.32.0;rm with pip');
  assert.equal(r.command, 'python3 -m pip install <PKG>');
});

test('minor: the GPU LM trainer runs the partial batch (fewer rows than --bs never loops forever)', () => {
  const src = readFileSync(join(ROOT, 'scripts/hybrid/train_lm_gpu.py'), 'utf8');
  assert.ok(src.includes('for i in range(0, len(train), a.bs):'));
  assert.ok(!src.includes('len(train) - a.bs + 1'));
  assert.ok(src.includes('if not train:'));
});
