// Regression tests for round 15: the round-14 findings (review/r14-claude.md, review/r14-codex.md). An explicit pull
// request selector (`feature/apply`, `hotfix/weekly`, `#12-only`, `from feature-only`) is kept, never dropped by the
// describing-word list; a describing word after "branch" is withheld; a quoted target ends at its matching quote;
// values a command saw under `systemd-run -p WorkingDirectory=…` / `-p RootDirectory=…` stay ambiguous.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'pwsh', os: 'windows' }, { shell: 'cmd', os: 'windows' }];
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });

test('major: an explicit branch selector ending in a describing word is kept', () => {
  const kept = {
    'merge pr feature/apply': 'gh pr merge feature/apply', 'merge pull request fix-reply': 'gh pr merge fix-reply',
    'merge pr hotfix/weekly': 'gh pr merge hotfix/weekly', 'merge pull request release/monthly': 'gh pr merge release/monthly',
    'view pr fix/assembly': 'gh pr view fix/assembly', 'merge pr #12-only': 'gh pr merge 12-only',
    'merge pull request from feature-only': 'gh pr merge feature-only', 'merge pr from nightly': 'gh pr merge nightly',
  };
  for (const env of SHELLS) {
    for (const [q, cmd] of Object.entries(kept)) {
      const r = run(q, null, env);
      assert.equal(r.command, cmd, `${env.shell}: ${q}`);
      assert.deepEqual(r.missing, [], `${env.shell}: ${q}`);
    }
    // named but unclear: withheld, never a bare `gh pr merge`
    for (const q of ['merge pull request for branch status', 'merge pr nightly', 'merge pull request "bob\'s fix"', "merge pr 'it''s'"]) {
      const r = run(q, null, env);
      assert.equal(r.command, 'gh pr merge <PR>', `${env.shell}: ${q}`);
      assert.deepEqual(r.missing, ['pr'], `${env.shell}: ${q}`);
    }
  }
});

test('minor: a quoted target ends at its matching quote; time / review words are not targets', () => {
  // the apostrophe no longer cuts the value ("bob"): the whole value fails validation and is withheld
  for (const q of ['merge pull request "bob\'s-fix"', 'merge pull request "don\'t-merge-yet"']) {
    assert.equal(run(q).command, 'gh pr merge <PR>', q);
  }
  assert.equal(run('merge pull request “feature/x”').command, 'gh pr merge feature/x');
  for (const [q, cmd] of Object.entries({ 'view pr from yesterday': 'gh pr view <PR>', 'merge pr for review': 'gh pr merge',
    'merge pr from fork': 'gh pr merge <PR>', 'merge pull request quickly': 'gh pr merge' })) assert.equal(run(q).command, cmd, q);
});

test('major: systemd-run unit properties that move the filesystem keep history paths ambiguous', () => {
  for (const h of ['systemd-run -p WorkingDirectory=/srv cat notes.txt', 'systemd-run --property=WorkingDirectory=/srv cat notes.txt',
    'systemd-run --property WorkingDirectory=/srv cat notes.txt', 'systemd-run -pWorkingDirectory=/srv cat notes.txt',
    'systemd-run -p RootDirectory=/srv cat /etc/example.conf', 'systemd-run --property=RootDirectory=/srv cat /etc/example.conf',
    'sudo systemd-run -p BindPaths=/a:/etc cat /etc/example.conf', 'run0 --property=RootDirectory=/srv cat /etc/example.conf']) {
    const r = run('delete it', [h]);
    assert.equal(r.command, 'rm <FILE>', h);
  }
  assert.equal(run('kill it', ['systemd-run -p PrivatePIDs=yes ps -p 42']).command, 'kill <PID>');
  // other properties, and an absolute path under another working directory, still resolve
  assert.equal(run('delete it', ['systemd-run -p Nice=5 cat notes.txt']).command, 'rm notes.txt');
  assert.equal(run('delete it', ['systemd-run -p WorkingDirectory=/srv cat /etc/example.conf']).command, 'rm /etc/example.conf');
  assert.equal(run('kill it', ['systemd-run -p Nice=5 ps -p 42']).command, 'kill 42');
});
