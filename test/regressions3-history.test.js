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
  // the same directory used by a newer non-listing command is an ordinary target again; a newer listing
  // of it is not (round 4b: "it" after `ls src` may be src or one of its entries)
  assert.equal(run('delete it', ['grep -rl TODO src', 'du -sh src']).command, 'rm -r src');
  assert.equal(run('delete it', ['grep -rl TODO src', 'ls src']).context.rule, 'refused');
  const ctx = buildContext(['find /var/log -name "*.gz"']);
  assert.ok(ctx.searchRoots.has('/var/log'));
});

test('history: the later segment of a compound line wins across entity types', () => {
  assert.equal(run('delete it', ['cat old.txt; mkdir newdir']).command, 'rm -r newdir');
  assert.equal(run('delete it', ['cat old.txt && du -sh newdir']).command, 'rm -r newdir');
  assert.equal(run('delete it', ['mkdir olddir; cat new.txt']).command, 'rm new.txt');
  // a listing: neither the listed directory nor the older file (round 4b)
  for (const h of ['cat old.txt; ls newdir', 'cat old.txt && ls newdir', 'ls olddir; cat new.txt']) {
    if (h.startsWith('ls')) assert.equal(run('delete it', [h]).command, 'rm new.txt');
    else assert.match(run('delete it', [h]).command, /<PATH>/, h);
  }
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
  assert.equal(run('remove it', ['mkdir /srv/remove-backups', 'mkdir /srv/current']).command, 'rm -r /srv/current');
  assert.equal(run('delete it', ['mkdir /srv/delete-me', 'mkdir /srv/current']).command, 'rm -r /srv/current');
  assert.equal(run('kill it', ['pgrep kill-worker', 'pgrep current-worker']).command, 'pkill -f current-worker');
  assert.equal(run('stop that process', ['pgrep stop-worker', 'pgrep current-worker']).command, 'pkill -f current-worker');
  assert.equal(run('usuń to', ['mkdir /srv/usun-stare', 'mkdir /srv/current']).command, 'rm -r /srv/current');
  // only the previous command is a reference target: a target word never selects an older line, and a changing
  // command whose words do not match the previous value is refused
  assert.ok(!/remove-backups/.test(run('show that backups folder', ['ls /srv/remove-backups', 'ls /srv/current']).command ?? ''));
  const old = run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']);
  assert.equal(old.context.rule, 'refused');
  assert.equal(old.command, 'rm -r <PATH>');
});

test('history: a note never claims a history value the command does not use', () => {
  const r = run('what about this', ['rm -r foo']);
  assert.ok(!/foo/.test(r.command ?? ''), r.command);
  assert.ok(!/foo/.test(r.context.note ?? ''), r.context.note);
  assert.notEqual(r.context.rule, 'pronoun');
  assert.ok(!Object.values(r.slotSources ?? {}).includes('history'));
});

test('history: `ls /a /b` + "it" is the last argument', () => {
  assert.equal(run('delete it', ['du -sh /a /b']).command, 'rm -r /b');
  assert.equal(run('delete it', ['ls /a /b']).command, 'rm -r <PATH>'); // listed (round 4b)
  assert.equal(run('show it', ['ls /a /b']).command, 'ls -lah /b');
  assert.equal(run('how big is it', ['du -sh /a /b']).command, 'du -sh /b');
});
