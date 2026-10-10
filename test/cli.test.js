import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const BIN = fileURLToPath(new URL('../bin/tellsh.js', import.meta.url));
const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });

test('--version', () => {
  const r = run('--version');
  assert.equal(r.status, 0);
  assert.equal(r.stdout.trim(), '0.1.0');
});

test('--help', () => {
  const r = run('--help');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /Usage: tellsh/);
});

test('--json dry-run (EN)', () => {
  const r = run('--json', 'show', 'the', '5', 'largest', 'files', 'in', '/var/log');
  assert.equal(r.status, 0, r.stderr);
  const j = JSON.parse(r.stdout);
  assert.equal(j.intent, 'largest_files');
  assert.equal(j.risk, 'safe');
  assert.match(j.command, /head -n 5/);
  assert.match(j.command, /find \/var\/log/);
});

test('--json dry-run (PL)', () => {
  const r = run('--json', 'zabij proces na porcie 8080');
  const j = JSON.parse(r.stdout);
  assert.equal(j.intent, 'kill_by_port');
  assert.equal(j.risk, 'high');
  assert.match(j.command, /8080/);
});

test('dry-run prints command and never executes', () => {
  const r = run('-n', 'usuń plik important.txt');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /\$ rm important\.txt/);
  assert.match(r.stdout, /risk: high/);
});

test('non-TTY without --yes only prints', () => {
  const r = run('print', 'working', 'directory');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /\$ pwd/);
  assert.equal(r.stdout.trim().split('\n').filter((l) => l.startsWith('/')).length, 0);
});

test('--yes runs safe commands and passes exit code', () => {
  const r = run('--yes', 'print', 'working', 'directory');
  assert.equal(r.status, 0);
  assert.ok(r.stdout.includes(process.cwd()));
});

test('--yes refuses non-safe commands', () => {
  const r = run('--yes', 'delete', 'file', 'nothing-here.txt');
  assert.equal(r.status, 4);
  assert.match(r.stdout, /only auto-runs safe/);
});

test('unknown request -> I don\'t understand + candidates, exit 3', () => {
  const r = run('write me a poem about the sea');
  assert.equal(r.status, 3);
  assert.match(r.stdout, /I don't understand/);
  assert.match(r.stdout, /Did you mean/);
});

test('--platform darwin', () => {
  const j = JSON.parse(run('--json', '--platform', 'darwin', 'how much ram is free').stdout);
  assert.equal(j.command, 'vm_stat');
});
