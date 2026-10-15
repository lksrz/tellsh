import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readFileSync, mkdtempSync, writeFileSync, chmodSync, readdirSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseOptions, extractFlags, unknownFlags, toolOptions, checkCommand, which } from '../src/helpcheck.js';

const FIX = (f) => readFileSync(new URL(`./fixtures/help/${f}`, import.meta.url), 'utf8');
const BIN = fileURLToPath(new URL('../bin/tellsh.js', import.meta.url));
const rmCache = (d) => { for (const f of readdirSync(d)) unlinkSync(join(d, f)); };
const tmp = () => mkdtempSync(join(tmpdir(), 'tellsh-hc-'));

// a directory with fake executables (never run by the tests that inject a spawner)
function fakeBin(names, body = '#!/bin/sh\necho "  -a, --all   x"\necho "  -l          y"\n') {
  const d = tmp();
  for (const n of names) { writeFileSync(join(d, n), body); chmodSync(join(d, n), 0o755); }
  return d;
}

test('parseOptions: GNU --help, BSD man, git -h, sed, tar fixtures', () => {
  const ls = parseOptions(FIX('gnu_ls.txt'));
  for (const o of ['-a', '--all', '-A', '--almost-all', '--color', '-h', '--human-readable', '-l', '-1']) assert.ok(ls.includes(o), o);
  const bls = parseOptions(FIX('bsd_ls_man.txt'));
  for (const o of ['-@', '-A', '-H', '-L', '-a', '-d', '-h', '-l', '-t', '-1', '-%', '-D', '--color']) assert.ok(bls.includes(o), o);
  assert.ok(!bls.includes('--all'));
  const git = parseOptions(FIX('git_status_h.txt'));
  for (const o of ['-s', '--short', '--no-short', '--porcelain', '--branch', '--untracked-files', '-u']) assert.ok(git.includes(o), o);
  const gsed = parseOptions(FIX('gnu_sed.txt'));
  for (const o of ['-n', '--quiet', '--silent', '-e', '--expression', '-i', '--in-place', '-E', '-r']) assert.ok(gsed.includes(o), o);
  const bsed = parseOptions(FIX('bsd_sed_man.txt'));
  for (const o of ['-E', '-a', '-l', '-n', '-u', '-e', '-i']) assert.ok(bsed.includes(o), o);
  assert.ok(!bsed.includes('-r') && !bsed.includes('--in-place'));
  const tar = parseOptions(FIX('gnu_tar.txt'));
  for (const o of ['-c', '-z', '-f', '-C', '--exclude', '--gzip', '--file', '--directory']) assert.ok(tar.includes(o), o);
});

test('parseOptions strips man overstrike', () => {
  assert.deepEqual(parseOptions('     -\b-a\ba      all\n     -\b-l\bl   long'), ['-a', '-l']);
});

test('extractFlags: pipelines, combined shorts, --, git subcommands, globs', () => {
  assert.deepEqual(extractFlags("du -sh ./* | sort -rh | head -n 10"), [
    { tool: 'du', flags: ['-sh'] }, { tool: 'sort', flags: ['-rh'] }, { tool: 'head', flags: ['-n'] }]);
  assert.deepEqual(extractFlags('grep -rn -- -x .'), [{ tool: 'grep', flags: ['-rn'] }]);
  assert.deepEqual(extractFlags('git -C repo status --short -b'), [{ tool: 'git', sub: 'status', flags: ['--short', '-b'] }]);
  assert.deepEqual(extractFlags('find . -mtime -7 -name x'), [{ tool: 'find', flags: ['-mtime', '-7', '-name'] }]);
  assert.deepEqual(extractFlags('find . -exec du -k {} + -print | xargs -0 rm -f'), [
    { tool: 'find', flags: ['-exec', '-print'] }, { tool: 'xargs', flags: ['-0'] }]); // rm is xargs' command
  assert.deepEqual(extractFlags('shutdown -h now; echo -n hi'), []); // not allowlisted
  assert.deepEqual(extractFlags('ls $OPTS --all'), [{ tool: 'ls', flags: ['--all'] }]);
});

test('unknownFlags: combined, attached values, --x=v, long prefixes', () => {
  const o = parseOptions(FIX('gnu_ls.txt'));
  assert.deepEqual(unknownFlags(['-lah', '--color=auto', '--almost'], o), []);
  assert.deepEqual(unknownFlags(['-lZ', '--foo=1', '-Q'], o), ['-Z', '--foo', '-Q']);
  const t = parseOptions(FIX('gnu_tar.txt'));
  assert.deepEqual(unknownFlags(['-czf', '-C'], t), []);
  assert.deepEqual(unknownFlags(['-n10', '-5'], ['-n']), []);
  assert.deepEqual(unknownFlags(['-xtype', '-name', '-x'], ['-x', '-name', '-type'], { whole: true }), ['-xtype']);
  assert.deepEqual(unknownFlags(['-r'], parseOptions(FIX('bsd_sed_man.txt'))), ['-r']);
});

test('allowlist enforcement: a non-allowlisted tool or git subcommand is never spawned', () => {
  const dir = fakeBin(['shutdown', 'ls', 'git']);
  const calls = [];
  const spawn = (f, a) => { calls.push([f, a]); return { stdout: '-a --all -l' }; };
  const env = { PATH: dir };
  assert.equal(toolOptions('shutdown', { env, spawn, dir: tmp(), platform: 'linux' }).ok, false);
  assert.equal(toolOptions('git', { sub: 'log', env, spawn, dir: tmp(), platform: 'linux' }).ok, false);
  assert.equal(toolOptions('git', { sub: 'frobnicate', env, spawn, dir: tmp(), platform: 'linux' }).ok, false);
  assert.equal(checkCommand('shutdown -h now', { shell: 'bash', os: 'linux', env, spawn, platform: 'linux', dir: tmp() }).checked, false);
  assert.equal(calls.length, 0);
  toolOptions('ls', { env, spawn, dir: tmp(), platform: 'linux' });
  toolOptions('git', { sub: 'status', env, spawn, dir: tmp(), platform: 'linux' });
  assert.deepEqual(calls.map((c) => c[1]), [['--help'], ['status', '-h']]);
});

test('timeout / oversized output / probe error -> unchecked, not cached', () => {
  const dir = fakeBin(['ls']);
  const cache = tmp();
  for (const error of ['timeout']) {
    const r = toolOptions('ls', { env: { PATH: dir }, spawn: () => ({ error }), dir: cache, platform: 'linux' });
    assert.deepEqual(r, { ok: false, reason: error });
  }
  assert.deepEqual(readdirSync(cache), []);
  let big = 0;
  const huge = () => { big++; return { error: 'output too large' }; };
  assert.equal(toolOptions('ls', { env: { PATH: dir }, spawn: huge, dir: cache, platform: 'linux' }).reason, 'output too large');
  assert.equal(toolOptions('ls', { env: { PATH: dir }, spawn: huge, dir: cache, platform: 'linux' }).reason, 'output too large');
  assert.equal(big, 1);
  rmCache(cache);
  // a deterministic failure (no options in the text) is cached, so it does not cost a spawn on every call
  let n = 0;
  const empty = () => { n++; return { stdout: 'nothing here' }; };
  assert.equal(toolOptions('ls', { env: { PATH: dir }, spawn: empty, dir: cache, platform: 'linux' }).reason, 'no options found in help');
  assert.equal(toolOptions('ls', { env: { PATH: dir }, spawn: empty, dir: cache, platform: 'linux' }).reason, 'no options found in help');
  assert.equal(n, 1);
});

test('real spawner: a hanging tool is killed by the timeout', () => {
  const dir = fakeBin(['ls'], '#!/bin/sh\nsleep 5\n');
  const t = Date.now();
  const r = toolOptions('ls', { env: { PATH: dir + ':/bin:/usr/bin' }, dir: tmp(), platform: 'linux' });
  assert.equal(r.ok, false);
  assert.ok(Date.now() - t < 2000);
});

test('cache: miss then hit, corrupt file ignored', () => {
  const dir = fakeBin(['ls']);
  const cache = tmp();
  let n = 0;
  const spawn = () => { n++; return { stdout: FIX('gnu_ls.txt') }; };
  const o = { env: { PATH: dir }, spawn, dir: cache, platform: 'linux' };
  assert.equal(toolOptions('ls', o).cached, false);
  assert.equal(toolOptions('ls', o).cached, true);
  assert.equal(n, 1);
  const [f] = readdirSync(cache);
  writeFileSync(join(cache, f), '{not json');
  const r = toolOptions('ls', o);
  assert.equal(r.ok, true);
  assert.equal(r.cached, false);
  assert.equal(n, 2);
});

test('checkCommand: unknown flags, not installed, disabled, other OS / shell', () => {
  const dir = fakeBin(['ls']);
  const spawn = () => ({ stdout: FIX('bsd_ls_man.txt') });
  const base = { shell: 'bash', os: 'linux', spawn, platform: 'linux', dir: tmp() };
  const r = checkCommand('ls --all -la', { ...base, env: { PATH: dir } });
  assert.equal(r.checked, true);
  assert.deepEqual(r.unknown.map((u) => u.flag), ['--all']);
  assert.deepEqual(checkCommand('ls -la', { ...base, env: { PATH: tmp() } }), { checked: false, reason: 'not installed', tool: 'ls', notInstalled: ['ls'] });
  assert.equal(checkCommand('ls --all', { ...base, env: { PATH: dir, TELLSH_HELPCHECK: '0' } }).reason, 'disabled');
  assert.equal(checkCommand('ls --all', { ...base, os: 'darwin', env: { PATH: dir } }).checked, false);
  assert.equal(checkCommand('Get-ChildItem -Force', { ...base, shell: 'powershell', env: { PATH: dir } }).checked, false);
  assert.equal(checkCommand('ls --all', { ...base, platform: 'win32', env: { PATH: dir } }).checked, false);
});

// CLI: a fake `ls` (outside the system dirs, so asked for --help) whose help lacks -a / -h
function cliRun(args, extraEnv) {
  const dir = fakeBin(['ls'], '#!/bin/sh\necho "  -l   long"\necho "  -1   one per line"\n');
  const env = { ...process.env, NO_COLOR: '1', PATH: `${dir}:${process.env.PATH}`, XDG_CACHE_HOME: tmp(), TELLSH_SHELL: 'bash', TELLSH_HYBRID: '0', ...extraEnv };
  return spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env, input: '' });
}

test('CLI: unknown flags warn and --yes refuses; TELLSH_HELPCHECK=0 restores the old behaviour', () => {
  const r = cliRun(['--yes', 'list', 'all', 'files', 'including', 'hidden']);
  assert.match(r.stdout, /ls -lah/);
  assert.match(r.stdout, /flag -a not found in your installed ls help/);
  assert.match(r.stdout, /Not running/);
  assert.equal(r.status, 4);
  const j = JSON.parse(cliRun(['--json', 'list', 'all', 'files', 'including', 'hidden']).stdout);
  assert.equal(j.helpcheck.checked, true);
  assert.deepEqual(j.helpcheck.unknown.map((u) => u.flag), ['-a', '-h']);
  const off = cliRun(['-n', 'list', 'all', 'files', 'including', 'hidden'], { TELLSH_HELPCHECK: '0' });
  assert.doesNotMatch(off.stdout, /not found in your installed/);
});

test('smoke: the real ls on this system knows -l', { skip: process.platform === 'win32' || !which('ls') }, () => {
  const r = checkCommand('ls -l', { shell: 'bash', os: process.platform === 'darwin' ? 'darwin' : 'linux', dir: tmp() });
  if (!r.checked) return; // man/help unavailable here (minimal container): nothing to assert
  assert.deepEqual(r.unknown, []);
  const bad = checkCommand('ls --tellsh-no-such-flag', { shell: 'bash', os: process.platform === 'darwin' ? 'darwin' : 'linux', dir: tmp() });
  assert.deepEqual(bad.unknown.map((u) => u.flag), ['--tellsh-no-such-flag']);
});
