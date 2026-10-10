// Regression tests for the round-3 review findings on history references (src/history.js):
// search roots as destructive targets, compound-line recency, request verbs as target hints,
// unused history notes, and multi-argument `ls`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { buildContext, ctxFeatures } from '../src/history.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, history, env = BASH) => suggest(q, { env, history });

test('history: "delete them" after a search never targets the search root', () => {
  for (const [q, h, root] of [
    ['delete them', ['find /var/log -name "*.gz"'], '/var/log'],
    ['delete them', ['grep -rl TODO src'], 'src'],
    ['delete them', ['find . -name node_modules -type d'], '.'],
    ['delete it', ['find /var/log -name "*.gz"'], '/var/log'],
    ['remove those', ['grep -r TODO /srv/app'], '/srv/app'],
    ['wipe them', ['find /var/log -name "*.gz"'], '/var/log'], // no history verb: the classifier picks the intent
  ]) {
    const r = run(q, h);
    assert.equal(r.context.rule, 'refused', `${q} after ${h}: ${r.command}`);
    assert.ok(!r.command?.includes(` ${root}`) || /<PATH>/.test(r.command), `${q} after ${h}: ${r.command}`);
    assert.notEqual(r.slotSources?.path, 'history');
  }
  // still refused, as before
  assert.equal(run('delete those files', ['find ~ -size +1G']).context.rule, 'refused');
  // non-destructive reuse of the search root is fine
  assert.equal(run('list it', ['find /var/log -name "*.gz"']).command, 'ls -lah /var/log');
  assert.equal(run('how big is it', ['grep -rl TODO src']).command, 'du -sh src');
  // the same directory used by a newer non-search command is an ordinary target again
  assert.equal(run('delete it', ['grep -rl TODO src', 'ls src']).command, 'rm -r src');
  const ctx = buildContext(['find /var/log -name "*.gz"']);
  assert.ok(ctx.searchRoots.has('/var/log'));
});

test('history: the later segment of a compound line wins across entity types', () => {
  assert.equal(run('delete it', ['cat old.txt; ls newdir']).command, 'rm -r newdir');
  assert.equal(run('delete it', ['cat old.txt && ls newdir']).command, 'rm -r newdir');
  assert.equal(run('delete it', ['ls olddir; cat new.txt']).command, 'rm new.txt');
  // the newest target is ambiguous: refuse instead of falling back to old.txt
  const amb = run('delete it', ['cat old.txt; ls $D']);
  assert.equal(amb.context.rule, 'refused');
  assert.ok(!/old\.txt/.test(amb.command), amb.command);
  // the model features (ctx_last=...) are unchanged: they still rank types by line only
  const ctx = buildContext(['cat old.txt; ls newdir']);
  assert.deepEqual(ctx.refOrder, ['dir', 'file']);
  assert.deepEqual(ctx.entOrder, ['file', 'dir']);
  assert.deepEqual(ctxFeatures(ctx), ['ctx_last=file', 'ctx_has=file', 'ctx_has=dir']);
});

test('history: request verbs are not target hints (newest target wins)', () => {
  assert.equal(run('remove it', ['ls /srv/remove-backups', 'ls /srv/current']).command, 'rm -r /srv/current');
  assert.equal(run('delete it', ['ls /srv/delete-me', 'ls /srv/current']).command, 'rm -r /srv/current');
  assert.equal(run('kill it', ['pgrep kill-worker', 'pgrep current-worker']).command, 'pkill -f current-worker');
  assert.equal(run('stop that process', ['pgrep stop-worker', 'pgrep current-worker']).command, 'pkill -f current-worker');
  assert.equal(run('usuń to', ['ls /srv/usun-stare', 'ls /srv/current']).command, 'rm -r /srv/current');
  // an explicit target word still selects an older value
  assert.equal(run('delete that backups folder', ['ls /srv/remove-backups', 'ls /srv/current']).command, 'rm -r /srv/remove-backups');
});

test('history: a note never claims a history value the command does not use', () => {
  const r = run('what about this', ['rm -r foo']);
  assert.ok(!/foo/.test(r.command ?? ''), r.command);
  assert.ok(!/foo/.test(r.context.note ?? ''), r.context.note);
  assert.notEqual(r.context.rule, 'pronoun');
  assert.ok(!Object.values(r.slotSources ?? {}).includes('history'));
});

test('history: `ls /a /b` + "it" is the last argument', () => {
  assert.equal(run('delete it', ['ls /a /b']).command, 'rm -r /b');
  assert.equal(run('show it', ['ls /a /b']).command, 'ls -lah /b');
  assert.equal(run('how big is it', ['du -sh /a /b']).command, 'du -sh /b');
});
