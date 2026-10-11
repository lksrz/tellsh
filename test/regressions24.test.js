// Regression tests for round 23: the round-22 findings (review/r22-claude.md, review/r22-codex.md). After "for" only a
// strong environment name is taken ("for production", "for qa"), a weak one ("for testing", "for the qa team") is
// withheld, and a request for prod / qa is never dropped to the default target; a quoted environment is decoded, never
// dropped; a selector after "pr" ("merge pr for the login fix", "merge pr: fix login") is withheld like one before it; a
// URL of a related pull request is not the merge target; "approve pr" / "open pr in web" are not `gh pr create`.
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

test('major: after "for" a strong environment is taken, a weak one is withheld, never made up or dropped', () => {
  for (const env of SHELLS) {
    const cases = {
      'deploy worker for production': 'production', 'publish worker for prod': 'prod', 'deploy worker for qa': 'qa',
      'deploy worker for uat': 'uat', 'deploy worker for canary': 'canary', 'deploy worker for preview': 'preview',
      'deploy worker for staging': 'staging', 'deploy worker for the sandbox': 'sandbox', 'deploy worker for prod now': 'prod',
      'deploy worker for production.': 'production',
    };
    for (const [q, e] of Object.entries(cases)) exact(run(q, null, env), `npx wrangler deploy --env ${e}`, `${env.shell}: ${q}`);
    for (const q of ['deploy worker for testing', 'deploy worker for test', 'deploy worker for dev', 'deploy worker for beta',
      'deploy worker for the qa team', 'deploy worker for prod users', 'deploy worker for staging-eu']) {
      withheld(run(q, null, env), 'npx wrangler deploy --env <WENV>', 'wenv', `${env.shell}: ${q}`);
    }
    // a word after "for" that is not an environment name leaves the default target
    exact(run('deploy worker for real', null, env), 'npx wrangler deploy', env.shell);
    // v0.3 selector rule: a descriptive target is the user's to fill
    withheld(run('deploy worker for a customer', null, env), 'npx wrangler deploy --env <WENV>', 'wenv', env.shell);
  }
});

test('major: a quoted environment is decoded, never dropped', () => {
  for (const env of SHELLS) {
    const cases = {
      'deploy worker to "preview2"': 'npx wrangler deploy --env preview2',
      "deploy worker to 'staging'": 'npx wrangler deploy --env staging',
      'deploy worker to “prod-eu”': 'npx wrangler deploy --env prod-eu',
      'deploy worker env "staging-eu"': 'npx wrangler deploy --env staging-eu',
      'deploy worker --env "qa"': 'npx wrangler deploy --env qa',
      'deploy worker env=staging': 'npx wrangler deploy --env staging',
    };
    for (const [q, cmd] of Object.entries(cases)) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
    for (const q of ['deploy worker to "my env"', "deploy worker to 'cloudflare'", "deploy worker env 'staging eu'"]) {
      withheld(run(q, null, env), 'npx wrangler deploy --env <WENV>', 'wenv', `${env.shell}: ${q}`);
    }
  }
});

test('minor: a marked word after a preposition is an environment only with a known name in it', () => {
  exact(run('deploy worker to staging-eu'), 'npx wrangler deploy --env staging-eu');
  exact(run('deploy worker to qa_1'), 'npx wrangler deploy --env qa_1');
  for (const q of ['deploy worker to v2', 'deploy to the worker-2 script', 'deploy worker to customer-a']) {
    withheld(run(q), 'npx wrangler deploy --env <WENV>', 'wenv', q);
  }
});

test('minor: a dry run asked for after a negated one is still a dry run', () => {
  exact(run('deploy worker without a dry run first? no, do a dry run'), 'npx wrangler deploy --dry-run');
  // v0.3 selector rule: "not just" leaves something the command does not express: the user fills it
  const r = run('deploy worker, not just a dry run');
  assert.equal(r.command, 'npx wrangler deploy --dry-run <ARGS>');
  assert.deepEqual(r.missing, ['args']);
  exact(run('deploy the worker, not a dry run'), 'npx wrangler deploy');
});

test('major: a selector after "pr" is withheld, never a bare `gh pr merge`', () => {
  const qs = ['merge pr for the login fix', 'merge pr for the issue', 'merge pr: fix login', 'merge pr with dependabot',
    'merge pr of my colleague', 'merge pr in docs', 'merge pr - fix login', 'merge pr dependabot', 'merge pr renovate',
    'merge pr docs', 'merge pr draft', 'merge pr open', "merge pr dependabot's", "merge pr of alice's", 'merge pr about the login fix'];
  for (const env of SHELLS) {
    for (const q of qs) {
      for (const h of [null, ['gh pr view 45']]) withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
    for (const q of ['merge pr', 'merge pr now', 'merge pr on github', 'merge pr in this repo', 'merge pr with squash',
      'merge pr for review', 'merge pr with --squash', 'merge pr in the browser']) {
      exact(run(q, null, env), 'gh pr merge', `${env.shell}: ${q}`);
    }
    exact(run('merge pr for main', null, env), 'gh pr merge main', env.shell);
    exact(run('merge pr for branch fix-1', null, env), 'gh pr merge fix-1', env.shell);
  }
});

test('minor: "current branch pr", "the branch pr" are the current branch\'s', () => {
  for (const q of ['merge current branch pr', 'merge the branch pr', "merge branch's pr"]) {
    for (const h of [null, ['gh pr view 45']]) exact(run(q, h), 'gh pr merge', `${q} after ${h}`);
  }
  withheld(run('merge feature branch pr'), 'gh pr merge <PR>', 'pr');
});

test('major: the URL of a related pull request is not the merge target', () => {
  const url = 'https://github.com/acme/app/pull/12';
  for (const env of SHELLS) {
    for (const q of [`merge the pr that depends on ${url}`, `merge the pr blocked by ${url}`, `merge the pr after ${url}`]) {
      for (const h of [null, ['gh pr view 45']]) withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
    exact(run(`merge pr ${url}`, null, env), `gh pr merge ${url}`, env.shell);
    exact(run(`view the pull request at ${url}`, null, env), `gh pr view ${url}`, env.shell);
  }
});

test('minor: "approve pr" and "open pr in web" are never `gh pr create`', () => {
  for (const [q, h] of [['approve pr'], ['open pr in web'], ['approve that pr', ['gh pr view 45']], ['zatwierdź pr']]) {
    const r = run(q, h);
    assert.notEqual(r.command, 'gh pr create --fill', q);
    assert.equal(r.understood, false, q);
  }
  exact(run('create a pr'), 'gh pr create --fill');
  exact(run('open a new pr'), 'gh pr create --fill');
});
