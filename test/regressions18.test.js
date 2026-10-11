// Regression tests for round 17: the round-16 findings (review/r16-claude.md, review/r16-codex.md). An issue, ticket or
// bug number is never the pull request to merge, and `#45` alone names it only right after the verb; "merge that pr"
// reads the pull request of a previous `gh pr view/checkout N` or is withheld, never the current branch's; a branch
// named as "from the branch main" is read, an unreadable one withheld.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'pwsh', os: 'windows' }, { shell: 'cmd', os: 'windows' }];
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });
const withheld = (r, cmd, slot, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual(r.missing, [slot], msg);
};
const exact = (r, cmd, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual(r.missing, [], msg);
};

test('major: an issue number or a #N in another clause is never the pull request', () => {
  for (const env of SHELLS) {
    for (const q of ['merge pr for issue #45', 'squash merge the pr for issue #8', 'merge the pr in issue #4', 'merge the pr that closes #12',
      'merge pr which fixes #12', 'merge the pr, see #99', 'merge the pull request for ticket #3', 'merge pr for bug #3',
      'merge the pr for #12', 'merge pr for fix #12', 'merge pr for issue 45']) withheld(run(q, null, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
    for (const [q, cmd] of Object.entries({ 'merge #45': 'gh pr merge 45', 'squash merge #45': 'gh pr merge 45', 'please merge #45': 'gh pr merge 45',
      'merge pr #45': 'gh pr merge 45', 'merge pull request #12 now': 'gh pr merge 12', 'merge #45 for issue #3': 'gh pr merge 45',
      'merge pr number 45': 'gh pr merge 45' })) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
  }
});

test('major: "merge that pr" uses the pull request of the previous gh pr command or is withheld', () => {
  for (const env of SHELLS) {
    exact(run('merge that pr', ['gh pr view 45'], env), 'gh pr merge 45', env.shell);
    exact(run('merge this pull request', ['gh pr checkout 45'], env), 'gh pr merge 45', env.shell);
    exact(run('merge that pr', ['gh pr view feature/x'], env), 'gh pr merge feature/x', env.shell);
    for (const h of [['git checkout feat'], ['cat a.txt'], ['ls'], ['gh pr list'], ['gh pr view'], ['gh pr view 12 --repo a/b'], ['gh pr view 1 2'], null]) {
      for (const q of ['merge that pr', 'merge this pull request']) withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
  }
  exact(run('show checks for that pr', ['gh pr view 45']), 'gh pr checks 45');
  // nothing referred to: the current branch's pull request, as before
  for (const q of ['merge pr', 'merge the pr']) exact(run(q, ['gh pr view 45']), 'gh pr merge', q);
  // a pull request in history does not change what the model sees
  assert.equal(run('git status', ['gh pr view 45']).command, 'git status');
});

test('major: a branch named as "from the branch X" is read, an unreadable one is withheld', () => {
  for (const env of SHELLS) {
    for (const [q, cmd] of Object.entries({ 'merge pr from the branch main': 'gh pr merge main', 'merge pr for the branch develop': 'gh pr merge develop',
      'merge the pull request from the branch release': 'gh pr merge release', 'merge pr from my branch foo': 'gh pr merge foo',
      'merge pr from branch main': 'gh pr merge main' })) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
    for (const q of ['merge pr from the feature branch', 'merge pr from the branch']) withheld(run(q, null, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
  }
  exact(run('merge pr and delete the branch'), 'gh pr merge');
});

test('minor: an amount after "pr" and a zero or zero-padded number are not pull requests', () => {
  for (const q of ['merge pr 2 days old', 'merge pr 3 times', 'merge pr 0', 'merge pr 007']) withheld(run(q), 'gh pr merge <PR>', 'pr', q);
  exact(run('merge pr 12'), 'gh pr merge 12');
});
