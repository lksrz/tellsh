// Regression tests for round 20: the round-19 findings (review/r19-codex.md). With history, a pull request the request
// names but that cannot be read ("the pr that fixes login", `that pr "bob's"`) stays withheld, as without history; a
// scope variable removed after `gh pr view N` (`unset GH_REPO`, `Remove-Item Env:GH_REPO`, ...) makes N ambiguous; the
// structural command grouping masks operands.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { group } from '../scripts/real/group.js';

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

test('major: history never overwrites a pull request the request names but cannot read', () => {
  for (const env of SHELLS) {
    for (const q of ['merge the pr that fixes login', 'merge that pr "bob\'s"', 'merge the pr by alice', 'merge that pr from yesterday', 'merge that pr main']) {
      for (const h of [null, ['gh pr view 45'], ['gh pr merge 45'], ['gh pr checks 45']]) {
        withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
      }
    }
    // a reference with nothing else named still reads the history
    exact(run('merge that pr', ['gh pr view 45'], env), 'gh pr merge 45', env.shell);
    // a pull request the request names readably wins over the history's
    exact(run('merge pr 7', ['gh pr view 45'], env), 'gh pr merge 7', env.shell);
  }
});

test('major: removing a repository scope after `gh pr view N` makes N ambiguous', () => {
  const lines = {
    bash: ['gh pr view 45; unset GH_REPO', 'gh pr view 45 && unset GH_HOST', 'gh pr view 45; unset -v GH_REPO', 'gh pr view 45; export -n GH_REPO',
      'gh pr view 45; unset FOO GH_REPO', 'gh pr view 45; export GH_REPO=a/b'],
    pwsh: ['gh pr view 45; Remove-Item Env:GH_REPO', 'gh pr view 45; Remove-Item -Path Env:\\GH_REPO', 'gh pr view 45; rm env:GH_HOST',
      'gh pr view 45; [Environment]::SetEnvironmentVariable("GH_REPO", $null)', 'gh pr view 45; $env:GH_REPO=$null'],
    cmd: ['gh pr view 45 & set GH_REPO=', 'gh pr view 45 && set GH_HOST='],
  };
  for (const env of SHELLS) {
    for (const h of lines[env.shell]) {
      for (const q of ['merge that pr', 'merge that pull request']) withheld(run(q, [h], env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
  }
  // the scope is dropped before the pull request is named: it is one of the repository tellsh runs in
  exact(run('merge that pr', ['unset GH_REPO; gh pr view 45']), 'gh pr merge 45');
  exact(run('merge that pr', ['Remove-Item Env:GH_REPO; gh pr view 45'], PWSH), 'gh pr merge 45');
  // an unrelated variable changes nothing
  exact(run('merge that pr', ['gh pr view 45; unset FOO']), 'gh pr merge 45');
  exact(run('merge that pr', ['gh pr view 45; Remove-Item Env:FOO'], PWSH), 'gh pr merge 45');
});

test('minor: the structural command grouping masks operands, the v04 one reproduces the shipped split', () => {
  for (const [a, b] of [['npm install express', 'npm install react'], ['cat alpha', 'cat beta'], ['git checkout feat', 'git checkout main'],
    ['gh pr view 12 --repo a/b', 'gh pr view 40 --repo c/d'], ['docker compose up web', 'docker compose up db'], ['sudo apt install curl', 'apt install jq']]) {
    assert.equal(group(a, 'structural'), group(b, 'structural'), `${a} / ${b}`);
  }
  for (const [a, b] of [['gh pr view 12', 'gh pr merge 12'], ['git checkout feat', 'git branch feat'], ['npm install express', 'npm install -g express'],
    ['docker compose up', 'docker compose down']]) {
    assert.notEqual(group(a, 'structural'), group(b, 'structural'), `${a} / ${b}`);
  }
  assert.notEqual(group('npm install express'), group('npm install react'));
  assert.equal(group('gh pr view 12 --repo a/b'), 'gh pr view --repo #2');
});
