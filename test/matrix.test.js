// v0.3.1: fixes found by the cross-platform template matrix (scripts/matrix.js, MATRIX.md)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildCommand } from '../src/fill.js';
import { checkDanger } from '../src/danger.js';

const WIN_PS = { shell: 'powershell', os: 'win32', coreutils: 'gnu' };
const CMD = { shell: 'cmd', os: 'win32', coreutils: 'gnu' };
const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const b = (id, env, resolved) => buildCommand(id, '', { env, resolved });

test('matrix: every template renders without static issues on every platform', () => {
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-mx-test-'));
  try {
    for (const p of ['linux', 'busybox', 'darwin', 'win32']) {
      const out = join(dir, `${p}.json`);
      const r = spawnSync(process.execPath, ['scripts/matrix.js', 'gen', p, out, '--container'], { encoding: 'utf8' });
      assert.equal(r.status, 0, r.stderr);
      const bad = JSON.parse(readFileSync(out, 'utf8')).cases.filter((c) => c.staticIssues.length);
      assert.deepEqual(bad.map((c) => `${c.id} ${c.label}: ${c.staticIssues.join('; ')}`), [], p);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('PowerShell expressions starting with $ are not commands; & $var still is', () => {
  for (const id of ['dir_size', 'hidden_files', 'memory_usage', 'show_path', 'find_process']) {
    const r = b(id, WIN_PS, { path: 'my docs', var: 'HOME', name: 'node' });
    assert.equal(r.risk, 'safe', `${id}: ${r.command} ${r.warnings}`);
  }
  assert.equal(b('env_var_get', WIN_PS, { var: 'HOME' }).risk, 'safe');
  assert.equal(b('git_commit', WIN_PS, { message: 'x' }).risk, 'medium');
  for (const c of ['& $tool -rf C:\\', "& '$x'", 'Get-Item x; & $env:COMSPEC', '& ($env:COMSPEC)', '. ($env:SCRIPT)', '& "$x"', '& { $x }', '& (@($env:SCRIPT) | Select-Object -First 1)', '. (@($env:SCRIPT) | Select-Object -First 1)']) {
    assert.equal(checkDanger(c, 'safe', { rendered: true, shell: 'powershell' }).risk, 'high', c);
  }
  // without the shell hint (POSIX reading) a $-head is still unknown
  assert.equal(checkDanger('$CMD -rf /', 'safe', { rendered: true }).risk, 'high');
});

test('New-Item: without -Force it never overwrites; -Force (any -ItemType, registry keys too) or -Value is a write', () => {
  const m = b('mkdir', WIN_PS, { path: 'a b' });
  assert.equal(m.command, "if (-not (Test-Path -LiteralPath 'a b' -PathType Container)) { New-Item -ItemType Directory -Path 'a b' }");
  assert.equal(m.risk, 'safe');
  assert.doesNotMatch(b('mkdir', WIN_PS, { path: 'HKCU:\\Software\\Victim' }).command, /-Force/);
  assert.notEqual(checkDanger("New-Item -ItemType Directory -Force -Path 'HKCU:\\Software\\Victim'", 'safe', { rendered: true, shell: 'powershell' }).risk, 'safe');
  assert.doesNotMatch(b('extract_targz', WIN_PS, { file: 'a.tar.gz', dest: 'out' }).command, /-Force/);
  assert.equal(b('touch_file', WIN_PS, { file: 'a.txt' }).risk, 'safe');
  assert.notEqual(checkDanger("New-Item -ItemType File -Force -Path 'a.txt'", 'safe', { rendered: true, shell: 'powershell' }).risk, 'safe');
  assert.notEqual(checkDanger("New-Item -Path 'a.txt' -Value 'x'", 'safe', { rendered: true, shell: 'powershell' }).risk, 'safe');
});

test('cmd: type nul >> (touch) and 2>nul are not writes; other redirects are; nul is a plain file outside Windows shells', () => {
  assert.equal(b('touch_file', CMD, { file: 'a.txt' }).risk, 'safe');
  assert.equal(checkDanger('dir 2>nul', 'safe', { rendered: true, shell: 'cmd' }).risk, 'safe');
  assert.equal(checkDanger('echo x > nul', 'safe', { rendered: true, shell: 'bash' }).risk, 'medium');
  assert.equal(checkDanger('echo x > nul', 'safe', { rendered: true }).risk, 'medium');
  assert.equal(checkDanger('echo x > nul', 'safe', { rendered: true, shell: 'powershell', os: 'linux' }).risk, 'medium');
  assert.equal(checkDanger('Get-Item x 2> nul', 'safe', { rendered: true, shell: 'powershell', os: 'win32' }).risk, 'safe');
  assert.equal(checkDanger('type nul >> a.txt', 'safe', { rendered: true, shell: 'bash' }).risk, 'medium');
  assert.equal(checkDanger('echo x > "nul backup"', 'safe', { rendered: true, shell: 'cmd' }).risk, 'medium');
  assert.equal(checkDanger('echo x >> a.txt', 'safe', { rendered: true, shell: 'cmd' }).risk, 'medium');
  assert.equal(checkDanger('type nul > a.txt', 'safe', { rendered: true, shell: 'cmd' }).risk, 'medium');
  assert.equal(checkDanger('dir > nul.txt', 'safe', { rendered: true, shell: 'cmd' }).risk, 'medium');
});

test('extract to a directory creates it first (tar -C needs an existing dir), no leading space', () => {
  assert.equal(b('extract_targz', BASH, { file: 'a.tar.gz', dest: 'out' }).command, 'mkdir -p out && tar -xzvf a.tar.gz -C out');
  assert.equal(b('extract_targz', BASH, { file: 'a.tar.gz' }).command, 'tar -xzvf a.tar.gz');
  assert.equal(b('extract_targz', WIN_PS, { file: 'a.tar.gz', dest: 'out' }).command, "if (-not (Test-Path -LiteralPath 'out' -PathType Container)) { New-Item -ItemType Directory -Path 'out' | Out-Null }; tar -xzvf 'a.tar.gz' -C 'out'");
  assert.equal(b('extract_targz', CMD, { file: 'a.tar.gz', dest: 'out' }).command, 'mkdir out 2>nul & tar -xzvf a.tar.gz -C out');
  assert.equal(b('extract_zip', CMD, { file: 'a.zip', dest: 'out' }).command, 'mkdir out 2>nul & tar -xf a.zip -C out');
});

test('cmd: mkdir -p semantics, dotfiles in hidden_files, no admin-only disk_free', () => {
  assert.equal(b('mkdir', CMD, { path: 'my docs' }).command, 'if not exist "my docs\\" mkdir "my docs"');
  assert.equal(b('mkdir', CMD, { path: 'out' }).command, 'if not exist out\\ mkdir out');
  assert.equal(b('mkdir', CMD, { path: '~/new dir' }).command, 'if not exist "%USERPROFILE%\\new dir\\" mkdir "%USERPROFILE%\\new dir"');
  assert.equal(b('mkdir', CMD, { path: 'my docs' }).risk, 'safe');
  const h = b('hidden_files', CMD, { path: 'my docs' });
  assert.equal(h.command, 'pushd "my docs" && (dir /a:h /b 2>nul & dir /a /b .* & popd)');
  assert.equal(h.risk, 'safe');
  assert.equal(b('hidden_files', CMD, { path: '~' }).command, 'pushd "%USERPROFILE%" && (dir /a:h /b 2>nul & dir /a /b .* & popd)');
  assert.equal(b('hidden_files', CMD, { path: '~/my docs' }).command, 'pushd "%USERPROFILE%\\my docs" && (dir /a:h /b 2>nul & dir /a /b .* & popd)');
  assert.ok(b('disk_free', CMD, {}).gap);
});

test('Windows PowerShell: zip via bsdtar, duplicate hashing skips unreadable files', () => {
  assert.equal(b('compress_zip', WIN_PS, { path: 'my docs', archive: 'b.zip' }).command, "tar -a -c -f 'b.zip' 'my docs'");
  // GNU tar has no zip format: PowerShell on Linux / macOS keeps Compress-Archive
  for (const os of ['linux', 'darwin']) {
    assert.equal(b('compress_zip', { shell: 'powershell', os, coreutils: 'gnu' }, { path: 'my docs', archive: 'b.zip' }).command, "Compress-Archive -LiteralPath 'my docs' -DestinationPath 'b.zip'");
  }
  assert.match(b('duplicate_files', WIN_PS, { path: '.' }).command, /Get-FileHash -Algorithm MD5 -ErrorAction SilentlyContinue/);
});

test('timezone falls back to /etc/localtime and date (Alpine has no timedatectl or /etc/timezone)', () => {
  const r = b('timezone', BASH, {});
  assert.match(r.command, /readlink \/etc\/localtime 2>\/dev\/null \|\| date \+%Z$/);
  assert.equal(r.risk, 'safe');
});

test('busybox and macOS GNU variants are on the allowlist', () => {
  const bb = { shell: 'sh', os: 'linux', coreutils: 'busybox' };
  for (const id of ['grep_text', 'find_symlinks', 'top_cpu', 'top_mem', 'listening_ports', 'ip_addresses']) {
    const r = b(id, bb, { path: '.', pattern: 'x' });
    assert.equal(r.risk, 'safe', `${id}: ${r.command} ${r.warnings}`);
  }
  const gm = { shell: 'zsh', os: 'darwin', coreutils: 'gnu' };
  for (const id of ['largest_files', 'largest_dirs', 'duplicate_files']) assert.equal(b(id, gm, { path: '.' }).risk, 'safe', id);
});

test('broken_symlinks (Windows PowerShell 5.1): no Split-Path -LiteralPath -Parent (parameter set error)', () => {
  const r = b('broken_symlinks', WIN_PS, { path: 'my docs' });
  assert.doesNotMatch(r.command, /Split-Path/);
  assert.match(r.command, /\[System\.IO\.Path\]::GetDirectoryName\(\$_\.FullName\)/);
  assert.equal(r.risk, 'safe');
});

test('g-prefixed names are trusted only where the macOS GNU templates render them; fuser -k kills', () => {
  for (const c of ['gfind / -delete', 'gxargs -r git commit', 'gfoo /var', 'grm -rf /']) {
    assert.equal(checkDanger(c, 'safe', { rendered: true }).risk, 'high', c);
  }
  assert.equal(checkDanger('gdu -h -d 1 /var 2>/dev/null | gsort -rh | head -n 10', 'safe', { rendered: true }).risk, 'safe');
  for (const c of ['fuser -k /', 'fuser -k -TERM 8080/tcp', 'fuser -vk 80/tcp']) assert.equal(checkDanger(c, 'safe', { rendered: true }).risk, 'high', c);
});

test('matrix run: a hostile environment (GIT_DIR, BASH_ENV) cannot reach outside the fixture', { skip: process.platform === 'win32' }, () => {
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-mx-iso-'));
  try {
    const victim = join(dir, 'victim');
    spawnSync('git', ['init', '-q', victim]);
    const marker = join(dir, 'bash_env_ran');
    writeFileSync(join(dir, 'evil.sh'), `touch '${marker}'\n`);
    const cases = { platform: 'linux', container: false, cases: [
      { id: 'git_status', env: BASH, label: 'bash/linux', catalogRisk: 'safe', risk: 'safe', command: 'git status', staticIssues: [], heads: ['git'],
        exec: { run: true, cwd: 'repo', expectOutput: true, okCodes: [0] } },
      { id: 'list_files', env: BASH, label: 'bash/linux', catalogRisk: 'safe', risk: 'safe', command: 'ls -lah .', staticIssues: [], heads: ['ls'],
        exec: { run: true, cwd: '.', expectOutput: true, okCodes: [0] } }] };
    writeFileSync(join(dir, 'cases.json'), JSON.stringify(cases));
    const r = spawnSync(process.execPath, ['scripts/matrix.js', 'run', join(dir, 'cases.json'), join(dir, 'out.json')], {
      encoding: 'utf8', env: { ...process.env, GIT_DIR: join(victim, '.git'), GIT_WORK_TREE: victim, BASH_ENV: join(dir, 'evil.sh') } });
    assert.equal(r.status, 0, r.stderr);
    const log = spawnSync('git', ['-C', victim, 'rev-list', '--all', '--count'], { encoding: 'utf8' });
    assert.equal(log.stdout.trim(), '0', 'the fixture git setup must not commit into GIT_DIR');
    assert.equal(existsSync(marker), false, 'BASH_ENV must not be honoured');
    const res = JSON.parse(readFileSync(join(dir, 'out.json'), 'utf8')).results;
    assert.deepEqual(res.map((x) => x.status), ['pass', 'pass'], JSON.stringify(res.map((x) => x.detail)));
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('New-Item: -Target alias and pipeline input are content writes', () => {
  for (const c of ["New-Item -ItemType File -Path 'a.txt' -Target 'hello'", "echo hello | New-Item -ItemType File -Path 'a.txt'"])
    assert.notEqual(checkDanger(c, 'safe', { rendered: true, shell: 'powershell' }).risk, 'safe', c);
  assert.equal(checkDanger("New-Item -ItemType Directory -Path 'x'", 'safe', { rendered: true, shell: 'powershell' }).risk, 'safe');
});

test('cmd: type nul >> a & a real redirect stays a write', () => {
  assert.notEqual(checkDanger('type nul >> a.txt & echo x > b.txt', 'safe', { rendered: true, shell: 'cmd', os: 'win32' }).risk, 'safe');
});

test('matrix report: without --before every results file is kept', () => {
  const dir = mkdtempSync(join(tmpdir(), 'mxr-'));
  try {
    const res = (platform) => JSON.stringify({ platform, results: [{ id: 'list_files', label: 'bash/' + platform, status: 'pass' }] });
    writeFileSync(join(dir, 'a.json'), res('linux')); writeFileSync(join(dir, 'b.json'), res('darwin'));
    const r = spawnSync(process.execPath, [join(process.cwd(), 'scripts/matrix.js'), 'report', join(dir, 'a.json'), join(dir, 'b.json')], { encoding: 'utf8', cwd: dir });
    const md = readFileSync(join(dir, 'MATRIX.md'), 'utf8');
    assert.match(md, /linux/); assert.match(md, /darwin/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('cmd: ~ paths become a double-quoted %USERPROFILE% (a user name may contain a space)', async () => {
  const { cmdQuote, psQuote } = await import('../src/render.js');
  assert.equal(cmdQuote('~'), '"%USERPROFILE%"');
  assert.equal(cmdQuote('~/foo'), '"%USERPROFILE%\\foo"');
  assert.equal(cmdQuote('~/my docs'), '"%USERPROFILE%\\my docs"');
  assert.equal(psQuote('~/foo'), '"$HOME/foo"');
  for (const [id, slots] of [['delete_dir', { path: '~/foo' }], ['mkdir', { path: '~/foo' }], ['hidden_files', { path: '~' }], ['list_files', { path: '~/foo' }]]) {
    const r = buildCommand(id, slots, { shell: 'cmd', os: 'win32' });
    if (r.gap) continue;
    assert.doesNotMatch(r.command, /(?<!")%USERPROFILE%/, `${id}: ${r.command}`);
  }
  assert.equal(checkDanger('rd /s /q "%USERPROFILE%"', 'high', { rendered: true, shell: 'cmd', os: 'win32' }).critical, true);
});
