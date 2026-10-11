// Regression tests for the v0.3 final5 review (review/final5-claude.md), release prep:
//  (1) an extract request (extract / untar / unpack / decompress / rozpakuj / wypakuj) never becomes a command that creates
//      or overwrites an archive (`tar -c`, `zip`): the composer keeps the catalog `tar -x`, and a release guard refuses
//  (2) kill with keep / leave / spare / zostaw / nie ruszaj / except never targets the protected PID: it is removed from
//      the candidates, else `<PID>`; a release guard refuses a kill command that names it
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { createsArchive, extractIssue, protectedNumbers, protectedIssue, releaseGuards } from '../src/guards.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'fish', os: 'linux', coreutils: 'gnu' },
  { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, { shell: 'cmd', os: 'win32', coreutils: 'gnu' }];
const run = (q, env = BASH) => suggest(q, { env });

// ---------- (1) extract never creates ----------
test('final5-claude major 1: extract requests never create or overwrite the archive', () => {
  const cases = {
    'extract archive.tar.gz': 'tar -xzvf archive.tar.gz',
    'extract the archive backup.tar.gz': 'tar -xzvf backup.tar.gz',
    'untar archive.tar.gz': 'tar -xzvf archive.tar.gz',
    'unpack archive.tar.gz': 'tar -xzvf archive.tar.gz',
    'decompress backup.tar.gz': 'tar -xzvf backup.tar.gz',
    'extract files from archive.tar.gz to /tmp': 'mkdir -p /tmp && tar -xzvf archive.tar.gz -C /tmp',
    'rozpakuj archive.tar.gz': 'tar -xzvf archive.tar.gz',
    'rozpakuj archiwum backup.tar.gz': 'tar -xzvf backup.tar.gz',
    'wypakuj archiwum archive.tar.gz do /tmp': 'mkdir -p /tmp && tar -xzvf archive.tar.gz -C /tmp',
    'extract archive.zip': 'unzip archive.zip',
  };
  for (const [q, want] of Object.entries(cases)) {
    const r = run(q);
    assert.equal(r.command, want, q);
    assert.notEqual(r.method, 'composed', q);
  }
  for (const env of SHELLS) {
    for (const q of Object.keys(cases)) {
      const r = run(q, env);
      assert.ok(r.command == null || !createsArchive(r.command), `${env.shell}: ${q} -> ${r.command}`);
    }
  }
});

test('final5-claude major 1: createsArchive reads tar / zip / 7z / gzip modes', () => {
  for (const c of ['tar -c -z -f archive.tar.gz -- .', 'tar -czf a.tar.gz src', 'tar czf a.tar.gz src', 'tar --create -f a.tar x',
    'tar -rf a.tar x', 'sudo tar -uvf a.tar x', 'zip -r a.zip .', '7z a a.7z .', 'gzip a.tar', 'ls | tar -cf a.tar -T -']) {
    assert.ok(createsArchive(c), c);
  }
  for (const c of ['tar -xzvf archive.tar.gz', 'tar -xzvf archive.tar.gz -C /tmp', 'tar xzf a.tar.gz', 'tar -tzf a.tar.gz',
    'unzip archive.zip', 'unzip a.zip -d /tmp', 'gzip -d a.gz', 'gunzip a.gz', '7z x a.7z', 'ls -la']) {
    assert.ok(!createsArchive(c), c);
  }
});

test('final5-claude major 1: the release guard refuses a create command for an extract request', () => {
  for (const [q, cmd] of [['extract archive.tar.gz', 'tar -c -z -f archive.tar.gz -- .'], ['untar backup.tar', 'tar -cf backup.tar .'],
    ['rozpakuj archive.zip', 'zip -r archive.zip .'], ['unpack logs.tar.gz to /tmp', 'tar -c -z -f logs.tar.gz -- /tmp']]) {
    assert.ok(extractIssue(q, { command: cmd, intent: null }), q);
    const g = releaseGuards(q, { query: q, command: cmd, intent: null, risk: 'high', missing: [] });
    assert.equal(g.command, null, q);
    assert.equal(g.understood, false, q);
  }
  // an extract intent never carries a create command, whatever the request words
  assert.ok(extractIssue('archive.tar.gz please', { command: 'tar -czf archive.tar.gz .', intent: 'extract_targz' }));
  // creating an archive is untouched
  assert.equal(extractIssue('compress src into src.tar.gz', { command: 'tar -czf src.tar.gz src', intent: 'compress_targz' }), null);
  assert.equal(extractIssue('extract archive.tar.gz', { command: 'tar -xzvf archive.tar.gz', intent: 'extract_targz' }), null);
});

// ---------- (2) protected PID ----------
test('final5-claude major 2: a protected PID is never killed', () => {
  const cases = {
    'kill 1234 but keep 5678': 'kill 1234',
    'kill 1234 and leave 5678 running': 'kill 1234',
    'kill 1234, keep 5678 alive': 'kill 1234',
    'keep 5678, kill 1234': 'kill 1234',
    'kill 5678 and leave 1234 alone': 'kill 5678',
    'kill 1234 but keep 5678 and 9012': 'kill 1234',
    'zabij 1234 ale zostaw 5678': 'kill 1234',
    'zabij 1234, nie ruszaj 5678': 'kill 1234',
    // nothing left to kill: the PID is the user's to fill
    'kill the process but keep 5678': 'kill <PID>',
    'zabij proces ale zostaw 5678': 'kill <PID>',
    'kill it, leave 5678 running': 'kill <PID>',
  };
  for (const [q, want] of Object.entries(cases)) assert.equal(run(q).command, want, q);
  for (const env of SHELLS) {
    for (const q of [...Object.keys(cases), 'kill 1234 except 5678', 'kill 1234 but spare 5678']) {
      const r = run(q, env);
      for (const n of protectedNumbers(q)) {
        assert.ok(r.command == null || !new RegExp(`(^|[^\\d])${n}([^\\d]|$)`).test(r.command), `${env.shell}: ${q} -> ${r.command}`);
      }
    }
  }
});

test('final5-claude major 2: protectedNumbers and the kill release guard', () => {
  assert.deepEqual(protectedNumbers('kill 1234 but keep 5678'), [5678]);
  assert.deepEqual(protectedNumbers('kill 1234 and leave pid 5678 running'), [5678]);
  assert.deepEqual(protectedNumbers('zabij 1234, nie ruszaj procesu 5678'), [5678]);
  assert.deepEqual(protectedNumbers('zabij 1234 ale zostaw 5678 i 9012'), [5678, 9012]);
  assert.deepEqual(protectedNumbers('kill 1234 except 5678'), [5678]);
  assert.deepEqual(protectedNumbers('kill 1234'), []);
  assert.ok(protectedIssue('kill 1234 but keep 5678', { command: 'kill 5678', intent: 'kill_by_pid' }));
  assert.ok(protectedIssue('zostaw 5678', { command: 'kill -9 5678', intent: null }));
  assert.equal(protectedIssue('kill 1234 but keep 5678', { command: 'kill 1234', intent: 'kill_by_pid' }), null);
  // a non-kill command is not this guard's business
  assert.equal(protectedIssue('keep 5678', { command: 'ps -p 5678', intent: 'ps_pid' }), null);
  const g = releaseGuards('kill 1234 and leave 5678 running', { query: 'q', command: 'kill 5678', intent: 'kill_by_pid', risk: 'high', missing: [] });
  assert.equal(g.command, null);
});
