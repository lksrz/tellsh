// Regression tests for round 19: the round-18 findings (review/r18-claude.md, review/r18-codex.md). "close pr 45 …" is
// refused also when the classifier picks gh_pr_merge (and a negated merge is never `gh pr merge`); a repository named
// without the word "repo" (`in org/repo`, `on github.com/org/repo`, `org/repo#7`) is kept as `--repo`; an export of
// GH_REPO after `gh pr view N`, or a later `gh pr view` / `gh pr list`, makes N ambiguous; a refused reference keeps
// `<PR>`; a pull request picked out by who or when ("by alice", "from yesterday") is withheld.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'pwsh', os: 'windows' }, { shell: 'cmd', os: 'windows' }];
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });
const withheld = (r, cmd, slots, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual([...r.missing].sort(), [slots].flat().sort(), msg);
};
const exact = (r, cmd, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual(r.missing, [], msg);
};
const refused = (r, re, msg) => {
  assert.equal(r.understood, false, msg);
  assert.ok(!r.command, msg);
  assert.match(r.hint, re, msg);
};

test('major: closing a pull request is refused also when the classifier picks gh_pr_merge', () => {
  for (const env of SHELLS) {
    for (const q of ['close pr 45 and delete branch', 'close pr 45 without merge', 'close pr 45, do not merge', 'close the pull request 45 without merging',
      'decline and close pr 45 and delete the branch', 'close pr 45', 'close the pull request', 'cancel pr 45']) {
      refused(run(q, null, env), /closing a pull request is not supported/, `${env.shell}: ${q}`);
    }
    // a merge the request asks for
    exact(run('merge and close pr 45', null, env), 'gh pr merge 45', env.shell);
    exact(run('merge pr 45 and close the issue', null, env), 'gh pr merge 45', env.shell);
  }
  // a negated or undone merge is never `gh pr merge`
  for (const q of ['do not merge pr 45', "don't merge pr 45", 'unmerge pr 45', 'undo the merge of pr 45']) {
    const r = run(q);
    assert.ok(!r.command || !/^gh pr merge/.test(r.command), q);
  }
  refused(run('revert pr 45'), /reverting a pull request is not supported/);
  exact(run('merge pr 45'), 'gh pr merge 45');
  exact(run('squash merge pr 45'), 'gh pr merge 45');
});

test('major: a repository named as OWNER/REPO after a preposition is kept as --repo', () => {
  for (const env of SHELLS) {
    for (const [q, repo] of [['merge pr 7 in other/repo', 'other/repo'], ['merge pr 7 of org/repo', 'org/repo'], ['merge pr 7 from org/repo', 'org/repo'],
      ['merge pr 7 to org/repo', 'org/repo'], ['merge pr 7 for org/repo', 'org/repo'], ['merge pull request 7 at org/repo', 'org/repo'],
      ['merge pr 7 on github.com/org/repo', 'github.com/org/repo'], ['merge pr 7 on https://github.com/org/repo', 'github.com/org/repo'],
      ['merge pr org/repo#7', 'org/repo']]) {
      exact(run(q, null, env), `gh pr merge 7 --repo ${repo}`, `${env.shell}: ${q}`);
    }
  }
  // right after "pr for" / "pr from": the branch of the pull request
  exact(run('view the pr for feature/login'), 'gh pr view feature/login');
  exact(run('merge pr from feature/x'), 'gh pr merge feature/x');
});

test('minor: a repository starting with "-" is withheld; "the repo", "my current repo" are the working directory\'s', () => {
  for (const q of ['merge pr 45 --repo -x/y', 'merge pr 45 -R=-x/y', 'merge pr 45 in repository -o/x', 'merge pr 45 --repo x/-y']) {
    withheld(run(q), 'gh pr merge 45 --repo <REPO>', 'repo', q);
  }
  exact(run('merge pr 45 for the repo'), 'gh pr merge 45');
  const r = run('show checks of the pr in my current repo');
  assert.ok(!/--repo/.test(r.command), r.command);
});

test('major: an export of GH_REPO / GH_HOST after `gh pr view N` makes N ambiguous', () => {
  for (const env of SHELLS) {
    for (const h of ['gh pr view 45; export GH_REPO=other/repo', 'gh pr view 45 && export GH_HOST=ghe.example.com', 'gh pr checkout 45; declare -x GH_REPO=a/b']) {
      withheld(run('merge that pr', [h], env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${h}`);
    }
  }
  withheld(run('merge that pr', ['gh pr view 45; $env:GH_REPO="a/b"'], SHELLS[1]), 'gh pr merge <PR>', 'pr');
  withheld(run('merge that pr', ['$env:GH_REPO="a/b"; gh pr view 45'], SHELLS[1]), 'gh pr merge <PR>', 'pr');
  // another variable, or a GIT_* one, does not scope gh
  exact(run('merge that pr', ['gh pr view 45; export FOO=1']), 'gh pr merge 45');
  exact(run('merge that pr', ['gh pr view 45; export GIT_DIR=/x']), 'gh pr merge 45');
  // a branch is scoped by an exported GIT_DIR
  withheld(run('delete that branch', ['git merge feat; export GIT_DIR=/srv/other.git']), 'git branch -d <BRANCH>', 'branch');
});

test('major: a later `gh pr view` / `gh pr list` replaces an earlier pull request selector', () => {
  for (const env of SHELLS) {
    for (const h of ['gh pr view 45; gh pr view', 'gh pr view 45; gh pr list', 'gh pr view 45 && gh pr status', 'gh pr view 45; gh pr view --web',
      'gh pr view 45; gh pr list --state open']) {
      withheld(run('merge that pr', [h], env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${h}`);
    }
    exact(run('merge that pr', ['gh pr view 45'], env), 'gh pr merge 45', env.shell);
    exact(run('merge that pr', ['gh pr list; gh pr view 45'], env), 'gh pr merge 45', env.shell);
  }
});

test('major: a refused pull request reference keeps <PR>, never a bare `gh pr merge`', () => {
  for (const env of SHELLS) {
    for (const h of ['gh pr view 45; env', 'gh pr view', 'gh pr list', 'ls', 'clear']) {
      const r = run('merge that pr', [h], env);
      withheld(r, 'gh pr merge <PR>', 'pr', `${env.shell}: ${h}`);
      assert.equal(r.context.rule, 'refused', `${env.shell}: ${h}`);
    }
  }
});

test('major: a pull request picked out by who or when is withheld', () => {
  for (const env of SHELLS) {
    for (const q of ['merge the pull request by alice', 'merge the pr from yesterday', 'merge the pr opened by bob', 'merge the pr that fixes login',
      'merge the pr created last week', 'merge pr from 2 days ago']) {
      withheld(run(q, null, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
    }
    // nothing picked out: the current branch's pull request
    for (const q of ['merge the pr', 'merge pr now', 'merge the pr and delete the branch', 'merge pull request quickly']) exact(run(q, null, env), 'gh pr merge', `${env.shell}: ${q}`);
  }
  exact(run('view pull request on github'), 'gh pr view');
});
