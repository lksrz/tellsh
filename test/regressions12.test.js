// Regression tests for round 11: the round-10 findings (review/r10-claude.md, review/r10-codex.md). A login shell
// (`sudo -i`, `sudo --login`, `sudo -iu bob`, `runuser -l`) runs in the target user's home and `sudo --chroot` under
// another root, so history values keep that scope; a `cd` inside a `( … )` subshell does not outlast it, so relative
// values after it name files elsewhere (a `{ … }` group runs in the user's shell and stays as it was); every
// `npx wrangler` intent may run a project-local binary, so none is safe (never auto-run with --yes).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { suggest } from '../src/pipeline.js';
import { BY_ID, INTENTS } from '../src/catalog.js';
import { analyzeCommand, isAmbiguous } from '../src/history.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, history) => suggest(q, { env: BASH, ...(history ? { history } : {}) });
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BIN = join(ROOT, 'bin', 'tellsh.js');
const refused = (r, ph, why) => {
  assert.equal(r.context.rule, 'refused', `${why}: ${JSON.stringify(r.context)} -> ${r.command}`);
  assert.ok(r.command == null || r.command.includes(ph), `${why}: ${r.command}`);
};

test('major: sudo -i / --login and runuser -l run in the target home: relative history values are ambiguous', () => {
  for (const h of ['sudo -i cat notes.txt', 'sudo --login cat notes.txt', 'sudo -u bob -i cat notes.txt', 'sudo -iu bob cat notes.txt',
    'sudo -n -i cat notes.txt', 'runuser -l bob cat notes.txt', 'runuser --login bob cat notes.txt', 'time sudo -i cat notes.txt']) {
    refused(run('delete it', [h]), '<FILE>', h);
    const r = run('show it', [h]);
    assert.ok(r.command == null || r.command.includes('<'), `show it after ${h}: ${r.command}`);
    const a = analyzeCommand(h);
    assert.ok(a.ents.file == null || isAmbiguous(a.ents.file), `${h}: ${JSON.stringify(a.ents)}`);
  }
  // absolute paths name the same file from any directory
  assert.equal(run('delete it', ['sudo -i cat /tmp/a.txt']).command, 'rm /tmp/a.txt');
  // plain sudo / sudo -u keep the user's directory
  assert.equal(run('delete it', ['sudo cat notes.txt']).command, 'rm notes.txt');
  assert.equal(run('delete it', ['sudo -u bob cat notes.txt']).command, 'rm notes.txt');
});

test('major: sudo --chroot / -R runs under another root: every history value is ambiguous', () => {
  for (const h of ['sudo --chroot=/srv cat /etc/x', 'sudo --chroot /srv cat /etc/x', 'sudo -R /srv cat /etc/x', 'sudo -R/srv cat notes.txt']) {
    refused(run('delete it', [h]), '<FILE>', h);
    const r = run('show it', [h]);
    assert.ok(r.command == null || r.command.includes('<'), `show it after ${h}: ${r.command}`);
  }
});

test('major: a cd / pushd inside a ( … ) subshell does not outlast it: relative values after it are ambiguous', () => {
  for (const h of ['(cd /repo && cat notes.txt)', '(cd /repo; cat notes.txt)', '( cd /repo && cat notes.txt )', '(cd /repo && touch notes.txt)',
    '(pushd /repo && cat notes.txt)', '(cd /repo && (cat notes.txt))', 'true && (cd /repo && cat notes.txt)']) {
    refused(run('delete it', [h]), '<FILE>', h);
    const r = run('show it', [h]);
    assert.ok(r.command == null || r.command.includes('<'), `show it after ${h}: ${r.command}`);
  }
  // absolute paths are fine; so is a segment after the subshell closed (back in the user's directory)
  assert.equal(run('delete it', ['(cd /repo && cat /tmp/a.txt)']).command, 'rm /tmp/a.txt');
  assert.equal(run('delete it', ['(cd /repo); cat notes.txt']).command, 'rm notes.txt');
  assert.equal(run('delete it', ['(cd /repo && make) && cat notes.txt']).command, 'rm notes.txt');
  // a { … } group and a plain cd run in the user's own shell: the user is now in /repo
  assert.equal(run('delete it', ['{ cd /repo && cat notes.txt; }']).command, 'rm notes.txt');
  assert.equal(run('delete it', ['cd /repo && cat notes.txt']).command, 'rm notes.txt');
});

test('major: every npx wrangler intent is at least medium risk, never auto-run with --yes', () => {
  const ids = INTENTS.filter((t) => /^npx wrangler\b/.test(t.template)).map((t) => t.id);
  for (const id of ['wrangler_tail', 'wrangler_login', 'wrangler_whoami', 'wrangler_dev', 'wrangler_deploy']) assert.ok(ids.includes(id), id);
  for (const id of ids) assert.notEqual(BY_ID[id].risk, 'safe', id);
  for (const [q, id] of [['wrangler whoami', 'wrangler_whoami'], ['stream cloudflare worker logs', 'wrangler_tail'], ['log in to cloudflare with wrangler', 'wrangler_login']]) {
    const r = run(q);
    assert.equal(r.intent, id, q);
    assert.notEqual(r.risk, 'safe', q);
    // nothing can run even if the gate regressed: no npx on PATH
    const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', ...q.split(' ')],
      { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1', PATH: '/nonexistent' } });
    assert.equal(c.status, 4, q + ': ' + c.stdout + c.stderr);
    assert.match(c.stdout, /only auto-runs safe/);
  }
});
