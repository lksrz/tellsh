// Regression tests for the round-3 review findings on rendering, the danger checker and the composer:
// PowerShell < 7.3 native-argument guard on every slot, danger checker gaps (wrappers, path
// normalisation, system directories, mv, docker -v=), composer quoting/--author/substitution, and
// cmd.exe handling of values containing `/`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { checkDanger, normTarget } from '../src/danger.js';
import { buildCommand } from '../src/fill.js';
import { cmdQuote, pwshNativeSlots } from '../src/render.js';
import { compose, validateComposed } from '../src/compose.js';
import { extractSlots } from '../src/slots.js';

const PS_WIN = { shell: 'powershell', os: 'win32', coreutils: 'gnu' };
const CMD = { shell: 'cmd', os: 'win32', coreutils: 'gnu' };
const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };

// ---------------------------------------------------------------------------------------------
// 1. PowerShell < 7.3: every slot of a native command is checked, not only the first one

test('pwshNativeSlots finds every slot of a native command', () => {
  assert.deepEqual([...pwshNativeSlots('tar -czvf {archive} {path}')].sort(), ['archive', 'path']);
  assert.deepEqual([...pwshNativeSlots('tar -xzvf {file}«-C {dest}»')].sort(), ['dest', 'file']);
  assert.deepEqual([...pwshNativeSlots('scp {target}:{dst}')].sort(), ['dst', 'target']);
  assert.deepEqual([...pwshNativeSlots('docker logs --tail {count!raw} -f {container}')], ['container']);
  // cmdlets / expressions are still not native
  assert.deepEqual([...pwshNativeSlots('if (Test-Path -LiteralPath {file}) { (Get-Item -LiteralPath {file}).LastWriteTime = Get-Date } else { New-Item -ItemType File -Path {file} }')], []);
  assert.deepEqual([...pwshNativeSlots('Compress-Archive -LiteralPath {path} -DestinationPath {archive}')], []);
});

test('PowerShell: a later native slot with " is refused (tar -C, tar path)', () => {
  const x = buildCommand('extract_targz', '', { env: PS_WIN, resolved: { file: 'x.tar.gz', dest: 'out" --to-command="calc' } });
  assert.equal(x.command, null);
  assert.match(x.gap, /native program/);
  const c = buildCommand('compress_targz', '', { env: PS_WIN, resolved: { archive: 'b.tar.gz', path: 'a" --use-compress-program=evil "b' } });
  assert.equal(c.command, null);
  assert.match(c.gap, /native program/);
  assert.equal(buildCommand('compress_targz', '', { env: PS_WIN, resolved: { archive: 'b.tar.gz', path: 'src' } }).command, "tar -czvf 'b.tar.gz' 'src'");
  const r = suggest(`extract x.tar.gz to 'out" --to-command="calc'`, { env: PS_WIN });
  assert.equal(r.command, null);
});

// ---------------------------------------------------------------------------------------------
// 2. danger checker

test('wrapper commands are looked through (timeout, chroot, stdbuf, env, nice, xargs, ...)', () => {
  for (const c of ['timeout 5 rm -rf /', 'timeout -s KILL 5 rm -rf /', 'chroot / rm -rf /', 'chroot --userspec=a:b /mnt rm -rf /',
    'stdbuf -oL rm -rf /', 'stdbuf -o L rm -rf /', 'env -u X A=1 rm -rf /', 'nice -n 5 rm -rf /', 'ionice -c 3 rm -rf /',
    'sudo -u root rm -rf /', 'doas rm -rf /', 'nohup rm -rf ~', 'time -p rm -rf ~', 'exec rm -rf /boot', 'command rm -rf $HOME', 'setsid rm -rf /']) {
    const d = checkDanger(c);
    assert.equal(d.critical, true, c);
    assert.equal(d.risk, 'high', c);
  }
});

test('paths like /. // /./ /etc/.. are normalised to /', () => {
  assert.equal(normTarget('/.'), '/');
  assert.equal(normTarget('//'), '/');
  assert.equal(normTarget('/./'), '/');
  assert.equal(normTarget('/etc/..'), '/');
  assert.equal(normTarget('/usr//lib/'), '/usr/lib');
  assert.equal(normTarget('~/./.ssh/'), '~/.ssh');
  for (const c of ['rm -rf /.', 'rm -rf /./', 'rm -rf //', 'rm -r /etc/../', 'find -L / -delete', 'find -P -O3 /. -delete']) assert.equal(checkDanger(c).critical, true, c);
});

test('recursive delete of system directories and key home directories is consistently critical', () => {
  for (const t of ['/etc', '/usr', '/usr/lib', '/usr/local/bin', '/var', '/var/lib', '/boot', '/bin', '/sbin', '/lib64', '/home/me', '~', '$HOME', '~/.ssh', '$HOME/.ssh', '~/.gnupg']) {
    assert.equal(checkDanger(`rm -r ${t}`).critical, true, t);
  }
  for (const t of ['/tmp/x', '/home/me/photos', '~/Downloads/old', 'build']) assert.equal(checkDanger(`rm -r ${t}`).critical, false, t);
});

test('mv of a system or home directory is critical; ordinary moves stay safe', () => {
  for (const c of ['mv /etc /tmp/x', 'mv ~ /tmp/x', 'mv /usr/lib /tmp', 'sudo mv /boot /old']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', c);
    assert.equal(d.critical, true, c);
  }
  assert.equal(checkDanger('mv /tmp/a /tmp/b').risk, 'safe');
});

test('docker -v=/:/h and --mount=…source=/ mount the host root', () => {
  assert.equal(checkDanger('docker run -v=/:/h alpine').critical, true);
  assert.equal(checkDanger('docker run -v=//:/h alpine').critical, true);
  assert.equal(checkDanger('docker run --mount=type=bind,source=/,target=/h alpine').critical, true);
  const ro = checkDanger('docker run -v=/:/h:ro alpine');
  assert.equal(ro.risk, 'high');
  assert.equal(ro.critical, false);
  assert.equal(checkDanger('docker run -v=/srv/data:/data alpine').risk, 'safe');
});

// ---------------------------------------------------------------------------------------------
// 3. composer

const grepTools = [{ tool: 'grep', p: 1 }];
const composeGrep = (q, pattern, paths) => compose(q, grepTools, { ...extractSlots(q), paths }, { patternOf: () => pattern, nameOf: () => null });

test('composer: grep patterns are quoted literally and never reused as a search path', () => {
  const a = composeGrep('search for ~/foo recursively ignoring case in src', 'recursively', ['~/foo', 'src']);
  assert.equal(a.command, "grep -i -r -- '~/foo' src");
  const b = composeGrep('search for "~" recursively ignoring case in /tmp', '~', ['~', '/tmp']);
  assert.equal(b.command, "grep -i -r -- '~' /tmp");
  // a real search path keeps tilde expansion
  const c = composeGrep('search for TODO recursively ignoring case in ~/src', 'TODO', ['~/src']);
  assert.equal(c.command, 'grep -i -r -- TODO ~/src');
  // end to end through the pipeline
  assert.equal(suggest('search for ~/foo recursively ignoring case in src', { env: BASH }).command, "grep -i -r -- '~/foo' src");
  assert.equal(suggest('search for "~" recursively ignoring case in /tmp', { env: BASH }).command, "grep -i -r -- '~' /tmp");
});

test('composer: git log --author always gets a value (or is not emitted)', () => {
  const gitTools = [{ tool: 'git', p: 1 }];
  const run = (q) => compose(q, gitTools, extractSlots(q), { patternOf: () => null, nameOf: () => null });
  assert.match(run('git log commits by alice').command, /--author=alice\b/);
  assert.match(run('git log by author bob').command, /--author=bob\b/);
  const none = run('git log by author');
  assert.ok(!none || !/--author(?!=\w)/.test(none.command), none?.command);
});

test('composer validation rejects command substitution and expansions', () => {
  for (const c of ['grep -- "$(id)" .', 'grep -- $(id) .', 'grep -- `id` .', 'grep -- "${x}" .', 'grep -- x <(id)']) {
    const v = validateComposed(c, 'grep');
    assert.equal(v.ok, false, c);
  }
  assert.equal(validateComposed("grep -- '$(id)' .", 'grep').ok, true);
  assert.equal(validateComposed("grep -- '`id`' .", 'grep').ok, true);
});

// ---------------------------------------------------------------------------------------------
// 4. cmd.exe: values with /

test('cmd: a value starting with / is fine when glued to a switch (findstr /c:), refused standalone', () => {
  const r = buildCommand('grep_text', '', { env: CMD, resolved: { pattern: '/api', path: 'src' } });
  assert.equal(r.command, 'pushd src && (findstr /s /n /c:"/api" * & popd)');
  const s = buildCommand('grep_text', '', { env: CMD, resolved: { pattern: 'x', path: '/api' } });
  assert.equal(s.command, null);
  assert.match(s.gap, /switch/);
  assert.equal(suggest('delete directory /q', { env: CMD }).command, null);
  assert.throws(() => cmdQuote('/q'), /switch/);
});

test('cmd: an embedded / is never left unquoted (foo/q is not read as foo /q)', () => {
  assert.equal(cmdQuote('foo/q'), 'foo\\q'); // path: Windows separator
  assert.equal(cmdQuote('a/q', { tilde: false }), '"a/q"'); // other values: quoted
  assert.equal(buildCommand('delete_dir', '', { env: CMD, resolved: { path: 'foo/q' } }).command, 'rmdir /s foo\\q');
  assert.equal(buildCommand('find_process', '', { env: CMD, resolved: { name: 'a/q' } }).command, 'tasklist | findstr /i "a/q"');
  assert.equal(buildCommand('delete_dir', '', { env: BASH, resolved: { path: 'foo/q' } }).command, 'rm -r foo/q');
});
