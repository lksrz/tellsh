// Regression tests for the round-1 review findings (review/r1-claude.md, review/r1-codex.md):
// path truncation, history references, composer/PowerShell/cmd quoting, danger checker gaps, CLI
// argument validation, model loading, and the whole-disk location phrases.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { suggest } from '../src/pipeline.js';
import { extractSlots, trimPathPunct } from '../src/slots.js';
import { normPath, exFromSpans } from '../src/tagger.js';
import { checkDanger } from '../src/danger.js';

const BIN = fileURLToPath(new URL('../bin/tellsh.js', import.meta.url));
const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const PS_WIN = { shell: 'powershell', os: 'win32', coreutils: 'gnu' };
const CMD = { shell: 'cmd', os: 'win32', coreutils: 'gnu' };
const run = (q, history, env = BASH) => suggest(q, { env, history });

// ---------------------------------------------------------------------------------------------
// r1-claude blocker 1 / codex 4: paths were cut back to a parent directory

test('paths with ( , ; : keep every character (no parent directory is deleted)', () => {
  assert.equal(run('delete folder ~/Downloads/backup(2)').command, "rm -r ~/'Downloads/backup(2)'");
  assert.equal(run('delete the folder /home/me/photos,2019').command, 'rm -r /home/me/photos,2019');
  assert.equal(run('remove directory /var/www/site;old').command, "rm -r '/var/www/site;old'");
  assert.equal(run('delete file /srv/a:b.txt').command, 'rm /srv/a:b.txt');
});

test('trailing dots are not stripped from a path (only one sentence dot after an extension)', () => {
  assert.equal(run('delete folder ~/old...').command, 'rm -r ~/old...');
  assert.equal(run('delete file /tmp/data.').command, 'rm /tmp/data.');
  const up = run('delete directory /tmp/cache/..');
  assert.equal(up.command, 'rm -r /tmp/cache/..');
  assert.ok(up.warnings.some((w) => /\.\./.test(w)));
  assert.equal(run('delete file /tmp/a.txt.').command, 'rm /tmp/a.txt');
  assert.equal(trimPathPunct('/tmp/x),'), '/tmp/x');
  assert.equal(trimPathPunct('backup(2)'), 'backup(2)');
  assert.deepEqual(extractSlots('copy /a/b, /c/d').paths, ['/a/b', '/c/d']);
});

test('tagger span normalisation never accepts a shorter path than the span', () => {
  // a span the tokenizer cut at `(` / `)` / `.` is widened back to the whole word
  const text = 'delete folder ~/Downloads/backup(2) now';
  const at = text.indexOf('~');
  for (const end of [at + 20, text.indexOf('(') + 2, text.indexOf('Downloads') + 9]) {
    const start = end === text.indexOf('Downloads') + 9 ? text.indexOf('Downloads') : at;
    assert.deepEqual(exFromSpans(text, [{ type: 'PATH', start, end, text: text.slice(start, end) }]).paths, ['~/Downloads/backup(2)']);
  }
  const t2 = 'delete directory /tmp/cache/..';
  assert.deepEqual(exFromSpans(t2, [{ type: 'PATH', start: 17, end: 27, text: t2.slice(17, 27) }]).paths, ['/tmp/cache/..']);
  assert.equal(normPath('~/Downloads/backup(2)'), '~/Downloads/backup(2)');
  assert.equal(normPath('/srv/a:b.txt'), '/srv/a:b.txt');
  assert.equal(normPath('Pobrane'), '~/Downloads');
});

// ---------------------------------------------------------------------------------------------
// feature: whole-disk phrases -> filesystem root

test('whole-disk phrases map to / (C:\\ on Windows shells)', () => {
  for (const q of ['największe pliki na całym dysku', 'najwieksze pliki na calym dysku', 'największe pliki na dysku', 'największe pliki całego dysku',
    'largest files on disk', 'largest files on the disk', 'largest files on the whole drive', 'largest files on the entire disk', 'biggest files in the whole system']) {
    assert.match(run(q).command, /^find \/ -xdev -type f /, q);
  }
  assert.match(run('największe pliki na całym dysku', null, PS_WIN).command, /-LiteralPath 'C:\\' /);
  assert.deepEqual(extractSlots('na calym dysku').paths, ['/']);
  assert.deepEqual(extractSlots('on the disk').paths, ['/']);
});

test('deleting on the whole disk is flagged critical', () => {
  const r = run('delete all log files on disk');
  assert.match(r.command, /^find \/ /);
  assert.equal(r.critical, true);
  const p = run('delete all log files on disk', null, PS_WIN);
  assert.match(p.command, /'C:\\'.*Remove-Item/);
  assert.equal(p.critical, true);
});

// ---------------------------------------------------------------------------------------------
// r1-claude minor 3: danger checker gaps

test('danger: busybox, rsync --delete, /dev/null copies, root bind mounts, chmod -R ~, tar -C /', () => {
  for (const c of ['busybox rm -rf /', 'rsync -a --delete empty/ /', 'cp /dev/null /etc/passwd', 'docker run -v /:/h alpine rm -rf /h',
    'chmod -R -v 777 ~', 'tar -x -C / -f a.tar', 'tar -xf a.tar --directory=/', 'find / -name "*.log" -delete', 'find / -type f | xargs rm',
    "Get-ChildItem -LiteralPath 'C:\\' -Recurse | Remove-Item"]) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', c);
    assert.equal(d.critical, true, c);
  }
  for (const c of ['find . -name "*.log" -delete', 'chmod -R 755 .', 'tar -xzf a.tgz -C ./out', 'rsync -a --delete src/ backup/', 'docker run -v /:/host:ro img']) {
    assert.equal(checkDanger(c).critical, false, c);
  }
  assert.equal(checkDanger('find / -xdev -type f -exec du -h {} +').risk, 'safe');
});

test('danger: PowerShell typographic quotes do not hide a drive root', () => {
  for (const c of ['Remove-Item -Recurse -Force ‘C:\\’', 'Remove-Item -Recurse -Force “C:\\”']) assert.equal(checkDanger(c).critical, true, c);
});

// ---------------------------------------------------------------------------------------------
// history references (r1-claude major 5-9, minor 1/8; codex 1-3)

test('history: a mv/cp destination directory is not "it"', () => {
  const r = run('delete it', ['mv notes.txt ~/Documents/']);
  assert.ok(!/Documents/.test(r.command), r.command);
  assert.equal(r.context.rule, 'refused');
  const p = run('delete it', ['Move-Item notes.txt -Destination C:\\Users\\me\\Documents'], PS_WIN);
  assert.ok(!/Documents/.test(p.command), p.command);
  // renaming a file: the new name is "it"
  assert.equal(run('delete it', ['mv a.txt b.txt']).command, 'rm b.txt');
});

test('history: a requested type that is not in history is refused, and "gallery" is not a branch', () => {
  const r = run('delete that branch', ['ls tmp_dir']);
  assert.ok(!/tmp_dir/.test(r.command), r.command);
  assert.equal(r.context.rule, 'refused');
  const g = run('delete that gallery folder', ['git checkout gallery', 'ls gallery']);
  assert.ok(!/git branch/.test(g.command), g.command);
});

test('history: parsers pick the right word (kill -s, grep -v grep, pkill -u, checkout --)', () => {
  assert.equal(run('kill that process', ['kill -s 9 4242']).command, 'kill 4242');
  assert.equal(run('kill it', ['ps aux | grep -v grep | grep node']).command, 'pkill -f node');
  assert.equal(run('kill it', ['pkill nginx -u bob']).command, 'pkill -f nginx');
  const c = run('switch to that branch', ['git checkout -- app.js']);
  assert.ok(!/app\.js/.test(c.command), c.command);
  assert.equal(run('switch to that branch', ['git checkout -b feature/x origin/main']).command, 'git checkout feature/x');
});

test('history: later segments of a compound line win; redirect targets count', () => {
  assert.equal(run('delete it', ['cat old.txt; cat new.txt']).command, 'rm new.txt');
  assert.equal(run('delete it', ['cat old.txt && cat new.txt']).command, 'rm new.txt');
  const amb = run('delete it', ['cat old.txt; cat $F']);
  assert.ok(!/old\.txt/.test(amb.command), amb.command);
  assert.equal(run('delete it', ['echo hi > out.txt']).command, 'rm out.txt');
  assert.equal(run('delete it', ['cat a.txt > /dev/null']).command, 'rm a.txt');
});

test('history: no implicit fill of destructive commands, no fallback past an ambiguous value', () => {
  const r = run('delete the folder', ['du -sh /var/lib/docker']);
  assert.ok(!/docker/.test(r.command), r.command);
  const f = run('delete file', ['cat old.txt', 'frobnicate new.txt']);
  assert.ok(!/old\.txt/.test(f.command), f.command);
  // safe intents may still be filled implicitly ...
  assert.equal(run('count words', ['cat notes.txt']).command, 'wc -w notes.txt');
  // ... but never from an older value when the newest one is ambiguous
  const s = run('count words', ['cat notes.txt', 'frobnicate other.txt']);
  assert.ok(!/notes\.txt/.test(s.command), s.command);
});

test('history: any history-derived slot marks the result as history (never --yes)', () => {
  for (const [q, h] of [['show file contents', ['cat secret.txt']], ['count words', ['cat notes.txt']]]) {
    const r = run(q, h);
    assert.equal(r.method, 'history-rule', q);
    assert.ok(Object.values(r.slotSources).includes('history'));
  }
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r2-'));
  try {
    const hf = join(dir, 'bash_history');
    writeFileSync(hf, 'cat secret.txt\n');
    const out = cli(['--yes', `--history=${hf}`, '--shell', 'bash', '--os', 'linux', 'show', 'file', 'contents'], { cwd: dir });
    assert.equal(out.status, 4, out.stdout + out.stderr);
    assert.match(out.stdout, /Not running/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('history: relative paths from before a cd are not reused', () => {
  const r = run('delete it', ['cat notes.txt', 'cd /tmp', 'true']);
  assert.ok(!/notes\.txt/.test(r.command), r.command);
  const rel = run('show it', ['cat notes.txt', 'cd sub']);
  assert.ok(!/notes\.txt|sub/.test(rel.command), rel.command);
  // absolute paths survive a cd
  assert.equal(run('show that file', ['cat /etc/hosts', 'cd sub', 'true']).command, 'cat /etc/hosts');
  // same line: `cat a.txt; cd y` makes a.txt stale
  const same = run('show it', ['cat a.txt; cd y']);
  assert.ok(!/a\.txt/.test(same.command), same.command);
});

test('history: the running tellsh call is not the previous command', () => {
  assert.equal(run('same for /var', ['du -sh /home', 'tellsh --history same for /var']).command, 'du -sh /var');
  assert.equal(run('same for /var', ['du -sh /home', "tellsh --history 'same for /var'"]).command, 'du -sh /var');
  assert.equal(run('same for /var', ['du -sh /home', 'node bin/tellsh.js same for /var']).command, 'du -sh /var');
});

test('history: "same for" does not take pronouns or filler words as values', () => {
  for (const q of ['what about this', 'and with force', 'what about it']) {
    const r = run(q, ['rm -r olddir']);
    assert.notEqual(r.context.rule, 'same-for', q);
    assert.ok(!r.command || !/\b(this|force|it)\b/.test(r.command), `${q}: ${r.command}`);
  }
  assert.equal(run('same for build', ['rm -r olddir']).command, 'rm -r build');
});
