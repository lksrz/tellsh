// Regression tests for round 18: the round-17 findings (review/r17-claude.md, review/r17-codex.md). A pull request (or
// branch) read from history is ambiguous after a trailing cd/pushd/popd or under GH_REPO/GH_HOST; "the other pr", "the
// latest pr", "my last pr" never become the current branch's pull request; a repository the request names is kept as
// `--repo` or withheld, never dropped; "close that pr" is refused instead of `gh pr create`.
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

test('major: a cd after `gh pr view N` makes the pull request ambiguous (another repository)', () => {
  for (const env of SHELLS) {
    for (const h of ['gh pr view 7 && cd ../other', 'gh pr view 7 && cd /', 'gh pr view 7; popd', 'gh pr checkout 7; pushd /srv/x',
      'gh pr view feature/x && cd ~/other']) {
      for (const q of ['merge that pr', 'merge this pull request']) withheld(run(q, [h], env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
    // a cd before the gh command: the pull request is one of the repository the user is in now
    exact(run('merge that pr', ['cd ../other && gh pr view 7'], env), 'gh pr merge 7', env.shell);
    exact(run('merge that pr', ['gh pr view 7'], env), 'gh pr merge 7', env.shell);
  }
  // a branch is repository-scoped as well
  for (const h of ['git checkout -b feat && cd ../other', 'git merge feat; cd /']) withheld(run('delete that branch', [h]), 'git branch -d <BRANCH>', 'branch', h);
  exact(run('delete that branch', ['git merge feat']), 'git branch -d feat');
});

test('major: GH_REPO / GH_HOST scope the pull request of the previous command', () => {
  for (const env of SHELLS) {
    for (const h of ['GH_REPO=other/repo gh pr view 45', 'env GH_REPO=other/repo gh pr view 45', 'GH_HOST=ghe.example.com gh pr view 45',
      'export GH_REPO=other/repo; gh pr view 45', 'export GH_REPO=other/repo && gh pr checkout 45']) {
      withheld(run('merge that pr', [h], env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${h}`);
    }
  }
  // other variables do not scope gh
  exact(run('merge that pr', ['FOO=1 gh pr view 45']), 'gh pr merge 45');
});

test('major: a pull request picked out among several is never the current branch\'s', () => {
  for (const env of SHELLS) {
    for (const q of ['merge the other pr', 'merge the latest pr', 'merge the newest pr', 'merge the most recent pr', 'merge my last pr',
      'merge another pr', 'merge the other pull request', 'merge our previous pr', 'merge the latest open pr', 'merge the first pr',
      'view the newest pr']) {
      const r = run(q, null, env);
      assert.match(r.command, /^gh pr (?:merge|view) <PR>$/, `${env.shell}: ${q}`);
      assert.deepEqual(r.missing, ['pr'], `${env.shell}: ${q}`);
    }
    // also with a pull request in history: "the other pr" is not that one, "my last pr" is not the one viewed
    for (const q of ['merge the other pr', 'merge my last pr', 'merge the latest pr']) withheld(run(q, ['gh pr view 45'], env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
  }
  // a named pull request wins; nothing named is still the current branch's
  exact(run('merge pr 45, the latest one'), 'gh pr merge 45');
  for (const q of ['merge the pr', 'merge pr', 'merge the current pr', 'first merge the pr']) exact(run(q), 'gh pr merge', q);
});

test('major: a repository the request names is kept as --repo or withheld, never dropped', () => {
  for (const env of SHELLS) {
    const cases = {
      'merge pr 45 in repository other/repo': 'gh pr merge 45 --repo other/repo',
      'merge pr 45 --repo other/repo': 'gh pr merge 45 --repo other/repo',
      'merge pr 45 --repo=other/repo': 'gh pr merge 45 --repo other/repo',
      'merge pr 45 -R other/repo': 'gh pr merge 45 --repo other/repo',
      'merge pr 45 in repo other/repo': 'gh pr merge 45 --repo other/repo',
      'merge pr 45 in the other/repo repository': 'gh pr merge 45 --repo other/repo',
      'merge pr #12 in repo acme/web': 'gh pr merge 12 --repo acme/web',
      'view pr 45 in repo a/b': 'gh pr view 45 --repo a/b',
    };
    for (const [q, cmd] of Object.entries(cases)) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
    // a repository that cannot be read: placeholder
    for (const q of ['merge pr 45 in another repo', 'merge pr 45 in the other repository', 'merge pr 45 in repo v2', 'merge pr 45 --repo',
      'merge pr 45 in repo "a/b;rm"']) withheld(run(q, null, env), 'gh pr merge 45 --repo <REPO>', 'repo', `${env.shell}: ${q}`);
    // gh needs the pull request named together with --repo
    withheld(run('merge pr --repo other/repo', null, env), 'gh pr merge <PR> --repo other/repo', 'pr', env.shell);
    withheld(run('merge the pr in repo other/repo', null, env), 'gh pr merge <PR> --repo other/repo', 'pr', env.shell);
    // "that pr" was one of this repository's: not the pull request of another one
    withheld(run('merge that pr in repo a/b', ['gh pr view 45'], env), 'gh pr merge <PR> --repo a/b', 'pr', env.shell);
  }
  // the working directory's repository is no qualifier
  for (const q of ['merge pr 45 in this repo', 'merge pr 45 in the current repository', 'merge pr 45']) exact(run(q), 'gh pr merge 45', q);
  // a lowercase -r is not gh's -R
  withheld(run('merge pull request -rf'), 'gh pr merge <PR>', 'pr');
});

test('minor: closing a pull request is refused, never `gh pr create` or `gh pr view`', () => {
  for (const env of SHELLS) {
    for (const q of ['close that pr', 'close the pr', 'close pr 45', 'close pull request 45', 'zamknij ten pr']) {
      const r = run(q, null, env);
      assert.equal(r.understood, false, `${env.shell}: ${q}`);
      assert.ok(!r.command, `${env.shell}: ${q}`);
    }
    assert.equal(run('close that pr', ['gh pr view 45'], env).command ?? null, null, env.shell);
  }
  for (const [q, cmd] of Object.entries({ 'create a pr': 'gh pr create --fill', 'show closed prs': 'gh pr list', 'view pr 45': 'gh pr view 45' })) {
    assert.equal(run(q).command, cmd, q);
  }
});

test('minor: switches of gh pr subcommands are not read as taking a value', () => {
  for (const h of ['gh pr view -c 7', 'gh pr review -a 7', 'gh pr review -c 7', 'gh pr comment -e 7']) exact(run('merge that pr', [h]), 'gh pr merge 7', h);
  withheld(run('merge that pr', ['gh pr checkout -b local 7 --repo a/b']), 'gh pr merge <PR>', 'pr');
});
