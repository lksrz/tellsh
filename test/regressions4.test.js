// Regression tests for the round-3 review findings (review/r3-claude.md, review/r3-codex.md):
// refused/ambiguous slots never fall back to catalog defaults, punctuation guard on "same for" and the
// composer, "same for" never replays an older changing command, typed references by recency, literal
// tildes from history, filtered listings / plural pronouns, danger wrappers, composer pattern slots,
// ambiguous quoted text, teacher call accounting and order-insensitive held-out matching.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { checkDanger } from '../src/danger.js';
import { splitCommand } from '../src/shellwords.js';
import { sameCmd } from '../scripts/lib/cmdnorm.js';
import { nearKey, heldOutIndex } from '../scripts/lib/heldout.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const PWSH = { shell: 'powershell', os: 'win32', coreutils: 'gnu' };
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });

test('blocker: a withheld path is a placeholder, never the catalog default `.`', () => {
  const a = run('delete all log files in /tmp/data!');
  assert.match(a.command, /^find <PATH> /);
  assert.ok(!/find \. /.test(a.command), a.command);
  assert.ok(a.missing.includes('path'));
  assert.ok(a.warnings.some((w) => /placeholder/.test(w)));
  // refused history reference (the dir is a search root, the request names "files")
  const b = run('delete all those log files', ['find /var/log -type f -iname "*.log"']);
  assert.equal(b.context.rule, 'refused');
  assert.match(b.command, /^find <PATH> /);
  assert.ok(b.missing.includes('path'));
  // an ordinary request still uses the default
  assert.equal(run('delete all log files').command.startsWith('find . '), true);
});

test('punctuation guard covers "same for" and the composer', () => {
  const a = run('same for /tmp/data!', ['rm -r old']);
  assert.equal(a.command, 'rm -r <PATH>');
  assert.ok(a.missing.includes('path'));
  assert.ok(a.warnings.some((w) => /placeholder/.test(w)));
  assert.equal(run('same for /tmp/data', ['rm -r old']).command, 'rm -r /tmp/data');
  const c = run('change permissions recursively to 777 on /tmp/data!');
  assert.ok(!/\/tmp\/data/.test(c.command || ''), c.command);
  assert.notEqual(c.method, 'composed');
  // a sentence comma after a path does not stop a read-only composition
  const f = run("find directories named node_modules under ~/code, don't go deeper than 3 levels");
  assert.equal(f.method, 'composed');
  assert.equal(f.command, 'find ~/code -maxdepth 3 -type d -name node_modules');
  assert.equal(run('szukaj słowa password w katalogu /etc, rekurencyjnie, tylko nazwy plików, bez wielkości liter').command, 'grep -i -r -l -- password /etc');
});

test('"same for" never replays an older changing command past a newer one', () => {
  const r = run('same for /srv/current', ['rm -r old', 'ls newdir']);
  assert.equal(r.understood, false);
  assert.equal(r.command, null);
  assert.equal(r.context.rule, 'refused');
  // the previous command itself, or a safe one, is still repeated
  assert.equal(run('same for /srv/current', ['rm -r old']).command, 'rm -r /srv/current');
  assert.equal(run('same for /srv/x', ['du -sh old', 'ls newdir']).command, 'du -sh /srv/x');
  // any newer line, even one that names nothing, is the previous command (round 4)
  assert.equal(run('same for /srv/x', ['rm -r old', 'clear']).command, null);
  // "what about this": no new target at all
  const w = run('what about this', ['rm -r foo']);
  assert.equal(w.understood, false);
  assert.equal(w.command, null);
});

test('typed process references follow recency', () => {
  assert.equal(run('kill that process', ['kill 1111', 'pgrep current-worker']).command, 'pkill -f current-worker');
  assert.equal(run('kill that process', ['pgrep current-worker', 'kill 1111']).command, 'kill 1111');
  const amb = run('kill that process', ['kill 1111', 'pgrep "$PROC"']);
  assert.equal(amb.context.rule, 'refused');
  assert.ok(!/1111/.test(amb.command), amb.command);
  // pgrep printed newer PIDs: "that pid" may be one of them (round 4b)
  assert.equal(run('kill that pid', ['kill 1111', 'pgrep current-worker']).command, 'kill <PID>');
  assert.equal(run('kill that pid', ['pgrep current-worker', 'kill 1111']).command, 'kill 1111');
});

test('a quoted or escaped ~ from history stays a literal directory named ~', () => {
  assert.equal(run('delete it', ["cat '~/notes.txt'"]).command, "rm './~/notes.txt'");
  assert.equal(run('delete it', ['cat \\~/notes.txt']).command, "rm './~/notes.txt'");
  assert.equal(run('delete it', ['cat "~"/notes.txt']).command, "rm './~/notes.txt'");
  assert.equal(run('delete it', ['cat ~/notes.txt']).command, 'rm ~/notes.txt');
  // ~user expands to a directory we cannot know
  assert.equal(run('delete it', ['cat ~bob/notes.txt']).context.rule, 'refused');
  assert.equal(sameCmd("cat '~/notes.txt'", 'cat ~/notes.txt'), false);
  assert.equal(sameCmd("cat '~/notes.txt'", 'cat \\~/notes.txt'), true);
  assert.deepEqual(splitCommand('cd ~ && ls ~/x').segments.map((s) => s.words), [['cd', '~'], ['ls', '~/x']]);
  // PowerShell resolves ~ in quoted paths too: unchanged
  assert.deepEqual(splitCommand("Get-Content '~/x'", 'pwsh').segments[0].words, ['Get-Content', '~/x']);
});

test('"delete them/it" after a filtered listing never targets the listed directory', () => {
  for (const [q, h, env] of [
    ['delete them', ['Get-ChildItem C:\\Users\\me\\Downloads -Recurse -Include *.tmp'], PWSH],
    ['delete it', ['Get-ChildItem C:\\Users\\me\\Downloads -Recurse -Include *.tmp'], PWSH],
    ['delete them', ['Get-ChildItem $HOME\\Downloads -Filter *.pdf'], PWSH],
    ['delete them', ['gci C:\\logs *.log'], PWSH],
    ['delete them', ['ls -la ~/Downloads | grep pdf'], BASH],
    ['delete it', ['ls -la ~/Downloads | grep pdf'], BASH],
    ['usuń je', ['ls ~/Pobrane | grep pdf'], BASH],
    ['delete them', ['egrep -rl TODO src'], BASH],
    ['delete them', ['git grep -l TODO src'], BASH],
    ['delete them', ['ack -l TODO src'], BASH],
  ]) {
    const r = run(q, h, env);
    assert.equal(r.context.rule, 'refused', `${q} after ${h}: ${r.command}`);
    assert.match(r.command, /<PATH>/, `${q} after ${h}: ${r.command}`);
    assert.ok(r.missing.includes('path'));
  }
  // a pipe into ps/grep still reads a process, not a directory
  assert.notEqual(run('delete it', ['ps aux | grep node']).context.rule, 'refused');
});

test('plural pronouns after a plain listing refer to the entries, not the directory', () => {
  for (const [q, h, env] of [
    ['delete them', ['ls /tmp/build'], BASH],
    ['remove those', ['ls /tmp/build'], BASH],
    ['delete them', ['grep -rl TODO src', 'ls src'], BASH],
    ['usuń je', ['ls /tmp/build'], BASH],
    ['delete them', ['Get-ChildItem C:\\tmp\\old'], PWSH],
  ]) {
    const r = run(q, h, env);
    assert.equal(r.context.rule, 'refused', `${q} after ${h}: ${r.command}`);
    assert.match(r.command, /<PATH>/);
  }
  // singular "it" is refused too (round 4b: the directory or one of its entries); non-destructive plural reuse is fine
  assert.equal(run('delete it', ['ls /tmp/build']).command, 'rm -r <PATH>');
  assert.equal(run('delete it', ['grep -rl TODO src', 'ls src']).command, 'rm -r <PATH>');
  assert.equal(run('list them', ['ls /tmp/build']).command, 'ls -lah /tmp/build');
});

test('danger: more command wrappers, whole-disk shred', () => {
  for (const c of ['unshare rm -rf /', 'unshare -m rm -rf /', 'watch rm -rf /', 'watch -n 1 rm -rf /', "watch 'rm -rf /'",
    'nsenter -t 1 -m rm -rf /', 'flock /tmp/l rm -rf /', 'taskset -c 0 rm -rf /', 'strace -f rm -rf /', 'systemd-run rm -rf /',
    'shred -u /dev/sda', 'shred /dev/nvme0n1', 'blkdiscard /dev/sdb', 'wipe /dev/mmcblk0']) {
    assert.equal(checkDanger(c).critical, true, c);
  }
  assert.equal(checkDanger('shred -u notes.txt').critical, false);
  assert.equal(checkDanger('watch ls').risk, 'safe');
  assert.equal(checkDanger('taskset 1 node bench.js').risk, 'safe');
});

test('grep pattern slot: option words are not the pattern, a path-like pattern keeps the search dir', () => {
  assert.equal(run('grep for ~/foo recursively in src').command, "grep -rn -- '~/foo' src");
  assert.equal(run('grep for ~/foo in src').command, "grep -rn -- '~/foo' src");
  assert.equal(run('grep for TODO recursively in src').command, 'grep -rn -- TODO src');
  assert.equal(run('grep TODO in ~/proj').command, 'grep -rn -- TODO ~/proj');
});

test('quoted text that may end at an escaped quote is a placeholder in every shell', () => {
  const q = 'search for "a\\" -e evil" in src';
  for (const env of [BASH, PWSH]) {
    const r = run(q, null, env);
    if (!r.understood) continue; // rejecting the request is fine too (v0.4 model); never a cut-off pattern
    assert.match(r.command, /<PATTERN>/, r.command);
    assert.ok(!/'a\\'/.test(r.command), r.command);
    assert.ok(r.missing.includes('pattern'));
  }
  assert.equal(run('search for "a\\" in src').command, "grep -rn -- 'a\\' src"); // nothing after it: unambiguous
});

test('teacher accounting: every request sent is a network call', async () => {
  const saved = { fetch: globalThis.fetch, key: process.env.TYPESAFE_API_KEY };
  process.env.TYPESAFE_API_KEY = 'test-placeholder';
  let requests = 0;
  globalThis.fetch = async () => { requests++; return { ok: false, status: 503, json: async () => null, headers: { get: () => null } }; };
  try {
    const { ask, stats } = await import('../scripts/lib/jev.js');
    const before = stats.calls;
    await assert.rejects(ask(`regression-test-${Date.now()}`, {}, { retries: 1 }));
    assert.equal(requests, 2);
    assert.equal(stats.calls - before, 2);
  } finally {
    globalThis.fetch = saved.fetch;
    if (saved.key == null) delete process.env.TYPESAFE_API_KEY; else process.env.TYPESAFE_API_KEY = saved.key;
  }
});

test('held-out matching ignores word order', () => {
  assert.equal(nearKey('last 30 kernel messages'), nearKey('kernel messages last 30'));
  assert.equal(nearKey('pokaż dyski i partycje'), nearKey('pokaż partycje i dyski'));
  const idx = heldOutIndex(['show all disks and partitions']);
  assert.ok(idx.has('partitions and disks show'));
  assert.ok(!idx.has('show disks'));
});

test('CLI: an unresolvable history reference says so (exit 3, no command)', async () => {
  const { spawnSync } = await import('node:child_process');
  const { mkdtempSync, writeFileSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r4-'));
  const hist = join(dir, 'bash_history');
  writeFileSync(hist, 'rm -r old\nls newdir\n');
  const r = spawnSync(process.execPath, ['bin/tellsh.js', '--dry-run', `--history=${hist}`, 'same', 'for', '/srv/current'], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
  assert.equal(r.status, 3);
  assert.match(r.stdout, /Cannot resolve "same for \/srv\/current" from history/);
  assert.doesNotMatch(r.stdout, /rm -r/);
});
