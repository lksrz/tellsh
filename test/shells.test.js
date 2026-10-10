// Every intent renders for every shell; POSIX renders are syntax-checked with `bash -n` / `sh -n`
// (also busybox sh if present); fish / PowerShell renders are parsed only when those shells are installed.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync, execFileSync } from 'node:child_process';
import { INTENTS } from '../src/catalog.js';
import { buildCommand } from '../src/fill.js';
import { shQuote, fishQuote, psQuote, cmdQuote } from '../src/render.js';
import { VARIANTS } from '../src/variants.js';

const has = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
// nasty-but-valid values for every slot (quotes, spaces, $, &, globs)
const SAMPLE = {
  path: '/tmp/my dir', file: "it's.txt", src: 'a b.txt', dst: '/tmp/x', dest: '/tmp/out', archive: 'out.tar.gz', name: 'node',
  service: 'nginx', container: 'web', pkg: 'htop', cmd: 'git', var: 'HOME', branch: 'feature/x', user: 'www-data',
  pattern: "a'b $x", host: 'example.com', target: 'root@example.com', message: 'fix "quotes" & $HOME', url: 'https://x.org/a?b=1&c',
  port: 8080, pid: 4242, mode: '755', old: 'a/b', new: 'c&d', text: 'hello world', glob: '*.pdf', age: '-mtime -3', size: '100M',
  count: 5, days: 30, since: '3 days ago', depth: 2,
};
function sampleFor(intent) {
  const v = {};
  const names = new Set(Object.keys(intent.slots));
  for (const t of [intent.template, intent.darwin, ...Object.values(VARIANTS[intent.id] || {})]) {
    if (typeof t === 'string') for (const m of t.matchAll(/\{(\w+)/g)) names.add(m[1]);
    else if (t && typeof t === 'object') for (const s of Object.values(t)) if (typeof s === 'string') for (const m of s.matchAll(/\{(\w+)/g)) names.add(m[1]);
  }
  for (const n of names) if (SAMPLE[n] != null) v[n] = SAMPLE[n];
  if (intent.id === 'replace_text') v.sedexpr = 's/a\\/b/c\\&d/g';
  if (intent.id === 'find_by_name') v.namepat = '*my file*';
  if (intent.id.startsWith('base64')) v.text = SAMPLE.text;
  if (intent.id === 'list_archive') v.file = 'out.tar.gz';
  return v;
}

const POSIX_ENVS = [
  ['bash/linux', { shell: 'bash', os: 'linux', coreutils: 'gnu' }, 'bash'],
  ['zsh/darwin BSD', { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, 'bash'],
  ['zsh/darwin GNU', { shell: 'zsh', os: 'darwin', coreutils: 'gnu' }, 'bash'],
  ['sh/linux (dash)', { shell: 'sh', os: 'linux', coreutils: 'gnu' }, 'sh'],
  ['sh/busybox', { shell: 'sh', os: 'linux', coreutils: 'busybox' }, has('busybox') ? 'busybox' : 'sh'],
];
for (const [label, env, checker] of POSIX_ENVS) {
  test(`${label}: every intent renders and passes ${checker} -n`, () => {
    const bad = [];
    for (const it of INTENTS) {
      const r = buildCommand(it.id, '', { env, resolved: sampleFor(it) });
      assert.ok(r.command, `${it.id}: no command`);
      assert.deepEqual(r.missing, [], `${it.id}: missing ${r.missing}`);
      const args = checker === 'busybox' ? ['sh', '-n', '-c', r.command] : ['-n', '-c', r.command];
      const res = spawnSync(checker, args, { encoding: 'utf8' });
      if (res.status !== 0) bad.push(`${it.id}: ${r.command}\n    ${res.stderr.trim()}`);
    }
    assert.deepEqual(bad, []);
  });
}

test('fish: every intent renders (fish -n when installed)', (t) => {
  const env = { shell: 'fish', os: 'linux', coreutils: 'gnu' };
  const bad = [];
  for (const it of INTENTS) {
    const r = buildCommand(it.id, '', { env, resolved: sampleFor(it) });
    assert.ok(r.command, it.id);
    assert.ok(!/\$\{|\$\(/.test(r.command), `${it.id}: POSIX-only expansion in fish render: ${r.command}`);
    if (has('fish')) { const res = spawnSync('fish', ['-n', '-c', r.command]); if (res.status !== 0) bad.push(it.id); }
  }
  if (!has('fish')) t.diagnostic('fish not installed: syntax check skipped');
  assert.deepEqual(bad, []);
});

for (const os of ['win32', 'linux']) {
  test(`PowerShell/${os}: every intent renders or reports a gap (parser check when pwsh is installed)`, (t) => {
    const env = { shell: 'powershell', os, coreutils: 'gnu' };
    let gaps = 0;
    const bad = [];
    for (const it of INTENTS) {
      const r = buildCommand(it.id, '', { env, resolved: sampleFor(it) });
      if (r.gap) { gaps++; continue; }
      assert.ok(r.command, it.id);
      // cheap structural lint: balanced quotes/brackets, no bash-only expansions outside bash -c
      if (!/^bash -c /.test(r.command)) {
        const s = r.command.replace(/'(?:[^']|'')*'/g, "''").replace(/"(?:`.|[^"`])*"/g, '""');
        for (const [o, c] of [['{', '}'], ['(', ')'], ['[', ']']]) assert.equal(s.split(o).length, s.split(c).length, `${it.id}: unbalanced ${o}${c}: ${r.command}`);
        assert.ok(!/\$\{\w+:-/.test(s), `${it.id}: POSIX expansion in PowerShell: ${r.command}`);
      }
      if (has('pwsh')) {
        const res = spawnSync('pwsh', ['-NoProfile', '-Command', '$e=$null;[void][System.Management.Automation.Language.Parser]::ParseInput($args[0],[ref]$null,[ref]$e);if($e.Count){exit 1}', r.command]);
        if (res.status !== 0) bad.push(it.id);
      }
    }
    if (!has('pwsh')) t.diagnostic(`pwsh not installed: parser check skipped (${gaps} gaps)`);
    assert.ok(gaps <= (os === 'win32' ? 5 : 0), `too many PowerShell gaps on ${os}: ${gaps}`);
    assert.deepEqual(bad, []);
  });
}

test('cmd: best-effort coverage is reported, gaps carry a reason', () => {
  const env = { shell: 'cmd', os: 'win32', coreutils: 'gnu' };
  let ok = 0;
  for (const it of INTENTS) {
    const r = buildCommand(it.id, '', { env, resolved: sampleFor(it) });
    if (r.gap) assert.ok(r.gap.length > 5, it.id); else ok++;
  }
  assert.ok(ok >= 100, `cmd renders: ${ok}`);
});

test('quoting round-trips through bash and sh', () => {
  for (const s of ["it's", 'a b', '$(rm -rf ~)', '`id`', '"; ls', '*.log', 'ąę żółw', '\\', '-rf']) {
    for (const sh of ['bash', 'sh']) assert.equal(execFileSync(sh, ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' }), s);
  }
});

test('fish / PowerShell / cmd quoting rules', () => {
  assert.equal(fishQuote("it's"), "'it\\'s'");
  assert.equal(fishQuote('a\\b c'), "'a\\\\b c'");
  assert.equal(fishQuote('~/my dir'), "~/'my dir'");
  assert.equal(psQuote("it's"), "'it''s'");
  assert.equal(psQuote('$(evil)'), "'$(evil)'");
  assert.equal(psQuote('~/Pobrane'), '"$HOME/Pobrane"');
  assert.equal(psQuote('~/$x'), '"$HOME/`$x"');
  assert.equal(cmdQuote('a "b"'), '"a ""b"""');
  assert.equal(cmdQuote('~/Downloads'), '%USERPROFILE%\\Downloads');
});

test('per-shell variants: intent shared, rendering differs', () => {
  const q = { path: '/var', count: 5 };
  assert.match(buildCommand('largest_dirs', '', { env: { shell: 'bash', os: 'linux', coreutils: 'gnu' }, resolved: q }).command, /^du -h -d 1 \/var .*sort -rh/);
  assert.match(buildCommand('largest_dirs', '', { env: { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, resolved: q }).command, /^du -k -d 1 \/var .*sort -rn/);
  assert.match(buildCommand('largest_dirs', '', { env: { shell: 'zsh', os: 'darwin', coreutils: 'gnu' }, resolved: q }).command, /gsort -rh/);
  assert.match(buildCommand('largest_dirs', '', { env: { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, resolved: q }).command, /^Get-ChildItem/);
  assert.match(buildCommand('replace_text', 'replace a with b in f.txt', { env: { shell: 'zsh', os: 'darwin', coreutils: 'bsd' } }).command, /^sed -i '' /);
  assert.equal(buildCommand('show_path', '', { env: { shell: 'fish', os: 'linux', coreutils: 'gnu' } }).command, 'string join \\n $PATH');
  // PowerShell on Linux without a native variant runs the POSIX command through bash -c
  const r = buildCommand('journal_errors', '', { env: { shell: 'powershell', os: 'linux', coreutils: 'gnu' } });
  assert.ok(/^bash -c '/.test(r.command) || /journalctl/.test(r.command), r.command);
});
