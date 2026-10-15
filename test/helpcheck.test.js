import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readFileSync, mkdtempSync, writeFileSync, chmodSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseOptions, extractFlags, unknownFlags, toolOptions, checkCommand, which, findMan, TIMEOUT_MS } from '../src/helpcheck.js';

const FIX = (f) => readFileSync(new URL(`./fixtures/help/${f}`, import.meta.url), 'utf8');
const OPTS = (f) => parseOptions(FIX(f)).options;
const BIN = fileURLToPath(new URL('../bin/tellsh.js', import.meta.url));
const tmp = () => mkdtempSync(join(tmpdir(), 'tellsh-hc-'));
const MAN = '/usr/bin/man'; // injected spawners never run it

// a directory with fake executables (never run: only located)
function fakeBin(names, body = '#!/bin/sh\necho RAN > "$0.ran"\n') {
  const d = tmp();
  for (const n of names) { writeFileSync(join(d, n), body); chmodSync(join(d, n), 0o755); }
  return d;
}
const manSpawn = (text, calls = []) => (f, a, o) => { calls.push({ f, a, o }); return { stdout: text }; };

test('parseOptions: names and arity from GNU, BSD, git fixtures', () => {
  const ls = OPTS('gnu_ls.txt');
  assert.equal(ls['-a'], 'none'); assert.equal(ls['--all'], 'none'); assert.equal(ls['--color'], 'opt'); assert.equal(ls['-1'], 'none');
  const bls = OPTS('bsd_ls_man.txt');
  for (const o of ['-@', '-A', '-H', '-a', '-d', '-h', '-l', '-t', '-1', '-%']) assert.equal(bls[o], 'none', o);
  assert.equal(bls['-D'], 'req'); assert.equal(bls['--color'], 'req'); assert.ok(!('--all' in bls));
  const git = OPTS('git_status_h.txt');
  assert.equal(git['--short'], 'none'); assert.equal(git['--no-short'], 'none'); assert.equal(git['--porcelain'], 'opt'); assert.equal(git['-u'], 'opt');
  const gsed = OPTS('gnu_sed.txt');
  assert.equal(gsed['-e'], 'req'); assert.equal(gsed['--expression'], 'req'); assert.equal(gsed['-i'], 'opt'); assert.equal(gsed['-n'], 'none');
  const bsed = OPTS('bsd_sed_man.txt');
  assert.equal(bsed['-i'], 'req'); assert.equal(bsed['-e'], 'req'); assert.equal(bsed['-E'], 'none'); assert.ok(!('-r' in bsed));
  const tar = OPTS('gnu_tar.txt');
  assert.equal(tar['-f'], 'req'); assert.equal(tar['-C'], 'req'); assert.equal(tar['--exclude'], 'req'); assert.equal(tar['-z'], 'none');
  assert.deepEqual(parseOptions('     -\b-a\ba      all\n     -\b-l\bl      long').options, { '-a': 'none', '-l': 'none' });
});

test('extractFlags: words per allowlisted command, git subcommand, globs as null', () => {
  assert.deepEqual(extractFlags('du -sh ./* | sort -rh | head -n 10'), [
    { tool: 'du', words: ['-sh', null] }, { tool: 'sort', words: ['-rh'] }, { tool: 'head', words: ['-n', '10'] }]);
  assert.deepEqual(extractFlags('git -C repo status --short -b'), [{ tool: 'git', sub: 'status', words: ['--short', '-b'] }]);
  assert.deepEqual(extractFlags('shutdown -h now; echo -n hi'), []);
});

test('unknownFlags: operands, attached values, clusters, --, find -exec, xargs', () => {
  const ls = OPTS('gnu_ls.txt');
  assert.deepEqual(unknownFlags(['-lah', '--color=auto', '--almost'], ls), []);
  assert.deepEqual(unknownFlags(['-lZ', '--foo=1', '-Q'], ls), ['-Z', '--foo', '-Q']);
  assert.deepEqual(unknownFlags(['-l', '--', '-Q'], ls), []);
  const tar = OPTS('gnu_tar.txt');
  assert.deepEqual(unknownFlags(['-czf', '-weird.tgz', '-C', '-dir'], tar), []); // -f / -C consume their operand
  const sort = { '-t': 'req', '-k': 'req', '-r': 'none', '-n': 'none' };
  assert.deepEqual(unknownFlags(['-tX', '-k2,2', '-rn'], sort), []); // sort -tX: X is -t's value
  assert.deepEqual(unknownFlags(['-t', '-Q'], sort), []);
  assert.deepEqual(unknownFlags(['-iBAK', 's/a/b/'], OPTS('gnu_sed.txt')), []); // sed -iBAK
  assert.deepEqual(unknownFlags(['-iBAK'], OPTS('bsd_sed_man.txt')), []);
  const commit = { '-m': 'req', '--message': 'req', '-a': 'none' };
  assert.deepEqual(unknownFlags(['-m', '--release'], commit), []); // git commit -m '--release'
  assert.deepEqual(unknownFlags(['-am', '--release'], commit), []);
  // unknown arity: the next word is not flagged, the rest of the cluster is not split
  assert.deepEqual(unknownFlags(['-x', '--bogus', '-xQ'], { '-x': null }), []);
  assert.deepEqual(unknownFlags(['-n', '1', '--bogus', 'echo', '--zz'], { '-n': 'req', '-0': 'none' }, { tool: 'xargs' }), ['--bogus']);
  assert.deepEqual(unknownFlags(['.', '-xtype', 'l', '-name', 'x', '-exec', 'rm', '-Q', '{}', '+', '-print'],
    { '-name': 'req', '-type': 'req', '-x': 'none', '-exec': 'req', '-print': 'none' }, { tool: 'find' }), ['-xtype']);
  assert.deepEqual(unknownFlags(['-n10', '-5'], { '-n': 'req' }), []);
});

test('long options: a unique prefix is accepted, an ambiguous one is flagged', () => {
  const o = OPTS('gnu_ls_ambig.txt');
  assert.deepEqual(unknownFlags(['--colo', '--cont'], o), []);
  assert.deepEqual(unknownFlags(['--co'], o), ['--co']);
});

test('only the absolute man is spawned, never the tool; relative PATH entries are ignored', () => {
  const dir = fakeBin(['ls', 'git', 'shutdown']);
  const calls = [];
  const spawn = manSpawn(FIX('gnu_ls.txt'), calls);
  const o = { env: { PATH: dir, SECRET: 'x' }, spawn, man: MAN };
  assert.equal(toolOptions('shutdown', { ...o, dir: tmp() }).reason, 'tool not checked');
  assert.equal(toolOptions('ls', { ...o, dir: tmp() }).ok, true);
  assert.equal(toolOptions('git', { ...o, sub: 'log', dir: tmp() }).ok, true);
  assert.equal(checkCommand('shutdown -h now', { shell: 'bash', os: 'linux', platform: 'linux', ...o, dir: tmp() }).checked, false);
  assert.deepEqual(calls.map((c) => [c.f, c.a]), [[MAN, ['-P', 'cat', 'ls']], [MAN, ['-P', 'cat', 'git-log']]]);
  assert.equal(calls[0].o.env.SECRET, undefined);
  assert.equal(calls[0].o.env.MANPAGER, 'cat');
  assert.equal(readdirSync(dir).filter((f) => f.endsWith('.ran')).length, 0);
  // a relative man is refused, and a tool only reachable through a relative PATH entry is "not installed"
  assert.equal(toolOptions('ls', { ...o, man: 'man', dir: tmp() }).reason, 'no man');
  assert.equal(findMan(['man', 'bin/man']), null);
  assert.equal(which('ls', { PATH: `.${':'}bin` }), null);
  assert.equal(toolOptions('ls', { ...o, env: { PATH: 'relative/bin' }, dir: tmp() }).reason, 'not installed');
});

test('budget: no probe starts after the deadline', () => {
  const dir = fakeBin(['ls', 'sort', 'head']);
  let t = 0;
  const now = () => t;
  const calls = [];
  const spawn = (f, a, o) => { calls.push(o.timeout); t += 200; return { stdout: FIX('gnu_ls.txt') }; };
  const r = checkCommand('ls -l | sort | head', { shell: 'bash', os: 'linux', platform: 'linux', env: { PATH: dir }, spawn, man: MAN, dir: tmp(), budget: 250, now });
  assert.deepEqual(calls, [250, 50]);
  assert.equal(r.checked, true);
  assert.equal(r.tool, 'ls, sort');
});

test('failures are cached for a day; a timeout cut short by the budget is not', () => {
  const dir = fakeBin(['ls']);
  const cache = tmp();
  let t = 1e12;
  const now = () => t;
  let n = 0;
  const spawn = () => { n++; return { error: 'timeout' }; };
  const o = { env: { PATH: dir }, spawn, man: MAN, dir: cache, now };
  assert.equal(toolOptions('ls', { ...o, deadline: t + 100 }).reason, 'timeout');
  assert.equal(toolOptions('ls', { ...o, deadline: t + 100 }).reason, 'timeout');
  assert.equal(n, 2); // budget-shortened: retried
  assert.equal(toolOptions('ls', o).reason, 'timeout'); // full TIMEOUT_MS: remembered
  assert.equal(toolOptions('ls', o).cached, true);
  assert.equal(n, 3);
  t += 25 * 3600 * 1000;
  toolOptions('ls', o);
  assert.equal(n, 4); // expired
  assert.ok(TIMEOUT_MS > 100);
  let m = 0;
  const empty = () => { m++; return { stdout: 'nothing here' }; };
  const c2 = tmp();
  assert.equal(toolOptions('ls', { ...o, spawn: empty, dir: c2 }).reason, 'no man page');
  assert.equal(toolOptions('ls', { ...o, spawn: empty, dir: c2 }).reason, 'no man page');
  assert.equal(m, 1);
});

test('real spawner: a hanging man is killed by the timeout', () => {
  const man = join(fakeBin(['man'], '#!/bin/sh\nsleep 5\n'), 'man');
  const t = Date.now();
  const r = toolOptions('ls', { env: { PATH: '/bin:/usr/bin' }, man, dir: tmp() });
  assert.equal(r.reason, 'timeout');
  assert.ok(Date.now() - t < 2000);
});

test('cache: miss then hit, corrupt file ignored', () => {
  const dir = fakeBin(['ls']);
  const cache = tmp();
  const calls = [];
  const o = { env: { PATH: dir }, spawn: manSpawn(FIX('gnu_ls.txt'), calls), man: MAN, dir: cache };
  assert.equal(toolOptions('ls', o).cached, false);
  assert.equal(toolOptions('ls', o).cached, true);
  assert.equal(calls.length, 1);
  const [f] = readdirSync(cache);
  writeFileSync(join(cache, f), '{not json');
  assert.equal(toolOptions('ls', o).cached, false);
  assert.equal(calls.length, 2);
});

test('checkCommand: unknown flags, not installed, disabled, other OS / shell', () => {
  const dir = fakeBin(['ls']);
  const base = { shell: 'bash', os: 'linux', spawn: manSpawn(FIX('bsd_ls_man.txt')), man: MAN, platform: 'linux', dir: tmp() };
  const r = checkCommand('ls --all -la', { ...base, env: { PATH: dir } });
  assert.deepEqual(r.unknown.map((u) => u.flag), ['--all']);
  assert.deepEqual(checkCommand('ls -la', { ...base, env: { PATH: tmp() } }), { checked: false, reason: 'not installed', tool: 'ls', notInstalled: ['ls'] });
  assert.equal(checkCommand('ls --all', { ...base, env: { PATH: dir, TELLSH_HELPCHECK: '0' } }).reason, 'disabled');
  assert.equal(checkCommand('ls --all', { ...base, os: 'darwin', env: { PATH: dir } }).checked, false);
  assert.equal(checkCommand('Get-ChildItem -Force', { ...base, shell: 'powershell', env: { PATH: dir } }).checked, false);
  assert.equal(checkCommand('ls --all', { ...base, platform: 'win32', env: { PATH: dir } }).checked, false);
});

// CLI end to end, with a real man page for a fake `ls` placed outside the system dirs: <tmp>/bin/ls is documented by
// <tmp>/share/man/man1/ls.1 (searched first through MANPATH), whose options lack -a and -h
function cliRun(args, extraEnv) {
  const root = tmp();
  const bin = join(root, 'bin');
  spawnSync('mkdir', ['-p', bin, join(root, 'share/man/man1')]);
  writeFileSync(join(bin, 'ls'), '#!/bin/sh\necho RAN > "$0.ran"\n');
  chmodSync(join(bin, 'ls'), 0o755);
  writeFileSync(join(root, 'share/man/man1/ls.1'), '.TH LS 1\n.SH OPTIONS\n.TP\n.B \\-l\nlong\n.TP\n.B \\-1\none per line\n');
  const xdg = tmp();
  // warm the cache with a generous timeout so a loaded test machine cannot turn the CLI's 300 ms probe into a skip
  toolOptions('ls', { env: { PATH: bin }, dir: join(xdg, 'tellsh', 'help'), maxTimeout: 10000 });
  const env = { ...process.env, NO_COLOR: '1', PATH: `${bin}:${process.env.PATH}`, XDG_CACHE_HOME: xdg, TELLSH_SHELL: 'bash', TELLSH_HYBRID: '0', ...extraEnv };
  const r = spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env, input: '' });
  assert.equal(readdirSync(bin).filter((f) => f.endsWith('.ran')).length, 0, 'the tool was executed');
  return r;
}

const canMan = process.platform !== 'win32' && !!which('ls') && toolOptions('ls', { dir: tmp(), maxTimeout: 10000 }).ok;

test('CLI: unknown flags warn and --yes refuses; TELLSH_HELPCHECK=0 turns it off', { skip: !canMan && 'no working man here' }, () => {
  const r = cliRun(['--yes', 'list', 'all', 'files', 'including', 'hidden']);
  assert.match(r.stdout, /ls -lah/);
  assert.match(r.stdout, /flag -a not found in your installed ls man page/);
  assert.match(r.stdout, /Not running/);
  assert.equal(r.status, 4);
  const j = JSON.parse(cliRun(['--json', 'list', 'all', 'files', 'including', 'hidden']).stdout);
  assert.deepEqual(j.helpcheck.unknown.map((u) => u.flag), ['-a']); // the cluster stops at the first unknown letter
  const off = cliRun(['-n', 'list', 'all', 'files', 'including', 'hidden'], { TELLSH_HELPCHECK: '0' });
  assert.doesNotMatch(off.stdout, /not found in your installed/);
});

test('smoke: the real ls man page on this system knows -l', { skip: !canMan && 'no ls man page here' }, () => {
  const os = process.platform === 'darwin' ? 'darwin' : 'linux';
  const dir = tmp();
  toolOptions('ls', { dir, maxTimeout: 10000 });
  assert.deepEqual(checkCommand('ls -l', { shell: 'bash', os, dir }).unknown, []);
  const bad = checkCommand('ls --tellsh-no-such-flag', { shell: 'bash', os, dir });
  assert.deepEqual(bad.unknown.map((u) => u.flag), ['--tellsh-no-such-flag']);
});
