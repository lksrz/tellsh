// Regression tests for round 16: the round-15 findings (review/r15-claude.md, review/r15-codex.md). A number elsewhere
// in the request is never the pull request to merge (only `pr 45`, `pr #45`, `pr number 45`, `#45`); a request that names
// a pull request the parser cannot read (`bob's`, `in repo v2`) is withheld as `<PR>`, never a bare `gh pr merge`; an
// optional operand withheld by history replay keeps its placeholder; clustered / root-changing systemd-run properties.
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

test('major: a number that is not next to "pr" is never the pull request', () => {
  for (const env of SHELLS) {
    for (const q of ['merge pr with 2 approvals', 'merge my pr from 2 days ago', 'merge the pr in 2 minutes', 'merge the 2 open prs',
      'merge pr with squash and delete 1 branch']) withheld(run(q, null, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
    for (const [q, cmd] of Object.entries({ 'merge pr 45': 'gh pr merge 45', 'merge pr #45': 'gh pr merge 45',
      'merge pr number 45': 'gh pr merge 45', 'merge #45': 'gh pr merge 45', 'merge pull request 45': 'gh pr merge 45',
      'merge pr no. 7': 'gh pr merge 7', 'merge pull request #12 now': 'gh pr merge 12', 'show checks for pr 12': 'gh pr checks 12' })) {
      const r = run(q, null, env);
      assert.equal(r.command, cmd, `${env.shell}: ${q}`);
      assert.deepEqual(r.missing, [], `${env.shell}: ${q}`);
    }
  }
  withheld(run('view pr for 3 days'), 'gh pr view <PR>', 'pr');
});

test('major: a named pull request that does not parse is withheld, never a bare merge', () => {
  for (const env of SHELLS) {
    for (const q of ["merge pr feature/x's", "merge pr it's-fix", "merge pr bob's", 'merge pr bob’s', 'merge pr in repo v2']) {
      withheld(run(q, null, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
    }
  }
  // nothing named: the current branch's pull request, as before
  for (const q of ['merge pr', 'merge the pr', 'merge pr now', 'merge pr for review']) assert.equal(run(q).command, 'gh pr merge', q);
});

test('major: history replay keeps the placeholder of an optional operand it withholds', () => {
  for (const env of SHELLS) {
    const r = run('same but merge', ['tellsh merge pr nightly'], env);
    withheld(r, 'gh pr merge <PR>', 'pr', env.shell);
    assert.equal(r.understood, true);
  }
  withheld(run('same for foo/bar', ['npm install lodash']), 'npm install <PKG>', 'pkg');
  // a valid value still replays
  assert.equal(run('same but merge', ['tellsh merge pr 45']).command, 'gh pr merge 45');
  assert.equal(run('same for express', ['npm install lodash']).command, 'npm install express');
});

test('minor: abbreviations, hosts and issues are not pull request selectors', () => {
  for (const q of ['merge pr e.g. main', 'merge pr w/o checks', 'merge pr on github.com']) withheld(run(q), 'gh pr merge <PR>', 'pr', q);
  withheld(run('close pr for issue 45'), 'gh pr view <PR>', 'pr');
});

test('minor: clustered -p and more root-changing systemd-run properties keep history paths ambiguous', () => {
  for (const h of ['systemd-run -tp WorkingDirectory=/srv cat notes.txt', 'systemd-run -tpWorkingDirectory=/srv cat notes.txt',
    'systemd-run -p ProtectHome=tmpfs cat /home/u/a.txt', 'systemd-run -p PrivateDevices=yes cat /etc/example.conf',
    'systemd-run -p PrivateIPC=yes cat /etc/example.conf']) assert.equal(run('delete it', [h]).command, 'rm <FILE>', h);
  for (const [h, cmd] of Object.entries({ 'systemd-run -t cat notes.txt': 'rm notes.txt',
    'systemd-run -p ProtectHome=read-only cat /home/u/a.txt': 'rm /home/u/a.txt' })) assert.equal(run('delete it', [h]).command, cmd, h);
});
