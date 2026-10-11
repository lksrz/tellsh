// Regression tests for round 14: the round-13 findings (review/r13-codex.md, review/r13-claude.md). A quoted pull
// request target is kept (or withheld as <PR>), never dropped for a bare `gh pr merge`; a describing word after "pr"
// is not a target, an unmarked bare word is withheld; values a command saw on another machine / host
// (`systemd-run --machine=…`, `run0 --machine=…`) stay ambiguous; pip extras without a version are accepted.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { analyzeCommand, isAmbiguous } from '../src/history.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'pwsh', os: 'windows' }, { shell: 'cmd', os: 'windows' }];
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });

test('major: a quoted pull request target is kept or withheld, never dropped', () => {
  const cases = {
    'merge pull request "feature/login"': 'gh pr merge feature/login',
    "merge pull request 'feature/login'": 'gh pr merge feature/login',
    'merge pull request "feature/login" now': 'gh pr merge feature/login',
    'merge pr "123"': 'gh pr merge 123',
    'view pull request "https://github.com/o/r/pull/9"': 'gh pr view https://github.com/o/r/pull/9',
    'merge the "feature/login" pull request': 'gh pr merge feature/login',
  };
  for (const env of SHELLS) {
    for (const [q, cmd] of Object.entries(cases)) {
      const r = run(q, null, env);
      assert.equal(r.command, cmd, `${env.shell}: ${q}`);
      assert.deepEqual(r.missing, [], `${env.shell}: ${q}`);
    }
    // a quoted value that is not a PR number, URL or branch: placeholder
    for (const q of ['merge pull request "foo bar"', 'merge pull request "x;rm -rf /"', 'merge pull request ""']) {
      const r = run(q, null, env);
      assert.equal(r.command, 'gh pr merge <PR>', `${env.shell}: ${q}`);
      assert.deepEqual(r.missing, ['pr'], `${env.shell}: ${q}`);
    }
  }
});

test('minor: a describing word after "pr" is not a target; a bare unmarked word is withheld', () => {
  const plain = {
    'check pr status': 'gh pr checks', 'show pr status': 'gh pr checks', 'view pull request on github': 'gh pr view',
    'merge PR by bob': 'gh pr merge <PR>', 'merge pull request quickly': 'gh pr merge', 'merge pull request for me': 'gh pr merge',
    'merge pr now': 'gh pr merge', 'merge the pull request': 'gh pr merge',
  };
  for (const [q, cmd] of Object.entries(plain)) assert.equal(run(q).command, cmd, q);
  const kept = {
    'merge pull request from bob': 'gh pr merge bob', 'merge pull request for branch bob': 'gh pr merge bob',
    'merge pr fix-1': 'gh pr merge fix-1', 'merge pull request feature/login': 'gh pr merge feature/login', 'merge pr #45': 'gh pr merge 45',
  };
  for (const [q, cmd] of Object.entries(kept)) assert.equal(run(q).command, cmd, q);
  const r = run('merge pr main');
  assert.equal(r.command, 'gh pr merge <PR>');
  assert.deepEqual(r.missing, ['pr']);
});

test('major: values a command saw on another machine / host stay ambiguous', () => {
  for (const h of ['systemd-run --machine=web ps -p 42', 'systemd-run --machine web ps -p 42', 'systemd-run -H user@host ps -p 42',
    'systemd-run --host=user@host ps -p 42', 'run0 --machine=web ps -p 42', 'sudo systemd-run --machine=web ps -p 42',
    'sudo --host=web ps -p 42', 'machinectl shell web ps -p 42', 'systemd-run -M web ps -p 42']) {
    const r = run('kill it', [h]);
    assert.ok(!/\b42\b/.test(r.command), `${h}: ${r.command}`);
    const a = analyzeCommand(h);
    assert.ok(a.ents.pid == null || isAmbiguous(a.ents.pid), `${h}: ${JSON.stringify(a.ents)}`);
  }
  for (const h of ['systemd-run --machine=web lsof -i :8080', 'run0 --machine=web lsof -i :8080', 'systemd-run -H web lsof -i :8080']) {
    for (const q of ['kill it', 'what is using that port']) {
      const r = run(q, [h]);
      assert.ok(r.command == null || !r.command.includes('8080'), `${q} after ${h}: ${r.command}`);
    }
  }
  // the same wrappers on this machine still resolve
  for (const h of ['systemd-run ps -p 42', 'run0 ps -p 42', 'systemd-run --user ps -p 42', 'sudo -H ps -p 42']) {
    assert.equal(run('kill it', [h]).command, 'kill 42', h);
  }
});

test('minor: pip extras without a version are accepted (and still validated)', () => {
  assert.equal(run('install requests[socks] with pip').command, "python3 -m pip install 'requests[socks]'");
  assert.equal(run('pip install uvicorn[standard]').command, "python3 -m pip install 'uvicorn[standard]'");
  assert.equal(run('install requests[socks,security] with pip').command, "python3 -m pip install 'requests[socks,security]'");
  assert.equal(run('install requests[a;rm] with pip').command, 'python3 -m pip install <PKG>');
});
