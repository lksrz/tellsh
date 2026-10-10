import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BIN = fileURLToPath(new URL('../bin/tellsh.js', import.meta.url));
const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });

test('--version', () => {
  const r = run('--version');
  assert.equal(r.status, 0);
  assert.equal(r.stdout.trim(), JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version);
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

test('--platform darwin (alias of --os)', () => {
  const j = JSON.parse(run('--json', '--shell', 'bash', '--platform', 'darwin', 'how much ram is free').stdout);
  assert.equal(j.command, 'vm_stat');
});

test('--shell powershell / cmd / fish render natively; gaps exit 5', () => {
  const ps = JSON.parse(run('--json', '--shell', 'powershell', '--os', 'win32', 'kill process notepad').stdout);
  assert.match(ps.command, /Stop-Process/);
  assert.equal(ps.risk, 'high');
  const cmd = JSON.parse(run('--json', '--shell', 'cmd', 'show my ip address').stdout);
  assert.equal(cmd.os, 'win32');
  assert.match(cmd.command, /ipconfig/);
  const gap = run('--shell', 'cmd', 'make deploy.sh executable');
  assert.equal(gap.status, 5);
  assert.match(gap.stdout, /No cmd rendering/);
  assert.equal(run('--shell', 'tcsh', 'ls').status, 2);
});

test('--history=FILE resolves references and never echoes the history', () => {
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-cli-'));
  try {
    const f = join(dir, 'hist');
    writeFileSync(f, 'echo SECRET_TOKEN=abc123\ncat notes.txt\n');
    const r = run('--json', '--shell', 'bash', `--history=${f}`, 'delete', 'it');
    const j = JSON.parse(r.stdout);
    assert.equal(j.command, 'rm notes.txt');
    assert.equal(j.context.used, true);
    assert.ok(!r.stdout.includes('SECRET_TOKEN') && !r.stderr.includes('SECRET_TOKEN'));
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('composed commands are labelled experimental and refused by --yes', () => {
  const r = run('--shell', 'bash', '-n', 'list files sorted by modification time, oldest first, with details');
  assert.match(r.stdout, /composed \(experimental\)/);
  const y = run('--shell', 'bash', '--yes', 'list files sorted by modification time, oldest first, with details');
  assert.equal(y.status, 4);
});
