// Regression tests for round 22: the round-21 findings (review/r21-claude.md, review/r21-codex.md). wrangler deploy never
// makes up an environment ("worker env", "with env vars", "for testing") and keeps a custom one whole ("staging-eu",
// "preview2"); a word before "pr" picks out a pull request also without a determiner ("merge dependabot pr", "merge alice's
// pr"); a quoted label / title is not the pull request; a negated dry run is a real deploy; English "to pr" is not a
// reference; "the pr in question" is withheld.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const PWSH = { shell: 'pwsh', os: 'windows' };
const CMD = { shell: 'cmd', os: 'windows' };
const SHELLS = [BASH, PWSH, CMD];
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });
const withheld = (r, cmd, slots, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual([...r.missing].sort(), [slots].flat().sort(), msg);
};
const exact = (r, cmd, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual(r.missing, [], msg);
};

test('major: "X env" never makes up an environment name', () => {
  for (const env of SHELLS) {
    for (const q of ['deploy worker env', 'deploy worker with env vars', 'deploy worker with environment variables',
      'deploy worker using env file', 'deploy worker, my environment is set']) {
      withheld(run(q, null, env), 'npx wrangler deploy --env <WENV>', 'wenv', `${env.shell}: ${q}`);
    }
    const cases = {
      'deploy worker environment staging.': 'npx wrangler deploy --env staging',
      'deploy worker env staging': 'npx wrangler deploy --env staging',
      'deploy worker to staging env': 'npx wrangler deploy --env staging',
      'deploy worker to the production environment': 'npx wrangler deploy --env production',
      'deploy worker to env called foo': 'npx wrangler deploy --env foo',
      // "for" + a weak name never makes one up ("for testing", "for the qa team" are withheld: test/regressions24.test.js)
      'deploy worker to cloudflare': 'npx wrangler deploy',
    };
    for (const [q, cmd] of Object.entries(cases)) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
  }
});

test('major: a custom environment name is kept whole', () => {
  for (const env of SHELLS) {
    const cases = {
      'deploy worker to staging-eu': 'npx wrangler deploy --env staging-eu',
      'deploy worker to preview2': 'npx wrangler deploy --env preview2',
      'deploy worker to the staging-eu environment': 'npx wrangler deploy --env staging-eu',
    };
    for (const [q, cmd] of Object.entries(cases)) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
    // v0.3 selector rule: a time the command does not express is the user's to fill
    const r = run('deploy worker in 2-3 minutes', null, env);
    assert.equal(r.command, 'npx wrangler deploy <ARGS>', env.shell);
    assert.deepEqual(r.missing, ['args'], env.shell);
  }
});

test('major: a word before "pr" picks out a pull request also without a determiner', () => {
  const qs = ['merge dependabot pr', 'merge renovate pr', 'merge docs pr', 'merge draft pr', 'merge open pr', "merge alice's pr",
    'merge alices pr', 'merge dependabot pull request', 'show checks for dependabot pr'];
  for (const env of SHELLS) {
    for (const q of qs) {
      for (const h of [null, ['gh pr view 45']]) {
        const r = run(q, h, env);
        assert.match(r.command, /^gh pr \w+ <PR>$/, `${env.shell}: ${q} after ${h}`);
        assert.deepEqual(r.missing, ['pr'], `${env.shell}: ${q} after ${h}`);
      }
    }
    for (const q of ['merge pr', 'merge my pr', 'squash merge pr', 'squash and merge my pr', 'approve and merge pr', 'please merge pr now',
      'can you merge the pr']) {
      exact(run(q, null, env), 'gh pr merge', `${env.shell}: ${q}`);
    }
    exact(run('merge that pr', ['gh pr view 45'], env), 'gh pr merge 45', env.shell);
    exact(run('show checks for that pr', ['gh pr view 45'], env), 'gh pr checks 45', env.shell);
  }
});

test('major: a quoted label or title is not the pull request', () => {
  for (const env of SHELLS) {
    for (const q of ['merge the pr with label "urgent"', 'merge the pr with title "fix-login"', 'merge the pr titled "fix-login"',
      'merge the pr by "alice"']) {
      for (const h of [null, ['gh pr view 45']]) withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
    exact(run('merge the "feature/login" pull request', null, env), 'gh pr merge feature/login', env.shell);
  }
});

test('minor: a negated dry run is a real deploy', () => {
  exact(run('deploy the worker, not a dry run'), 'npx wrangler deploy');
  exact(run('deploy worker to production without dry run'), 'npx wrangler deploy --env production');
  exact(run('deploy the worker to staging dry run'), 'npx wrangler deploy --dry-run --env staging');
});

test('minor: English "to pr" is not a reference; "the pr in question" is withheld', () => {
  const h = ['gh pr view 45'];
  withheld(run('merge changes to pr', h), 'gh pr merge <PR>', 'pr');
  assert.notEqual(run('check out to pr', h).command, 'gh pr checks 45');
  assert.notEqual(run('view diff to pr', h).command, 'gh pr view 45');
  exact(run('zmerguj to pr', h), 'gh pr merge 45');
  for (const x of [null, h]) withheld(run('merge the pr in question', x), 'gh pr merge <PR>', 'pr');
});
