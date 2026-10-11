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
import { suggest, validSlot } from '../src/pipeline.js';
import { extractSlots, trimPathPunct } from '../src/slots.js';
import { normPath, exFromSpans, tagFeatureSets } from '../src/tagger.js';
import { tagTokens, tagFeatures } from '../src/features.js';
// the parser on its own (it only raises risk); the trust rule (a non-catalog command is high) is in regressions27.test.js
import { assessCommand as checkDanger } from '../src/danger.js';
import { buildCommand, finalizeSlots } from '../src/fill.js';
import { BY_ID } from '../src/catalog.js';
import { shQuote, psQuote, cmdQuote, pwshNativeSlots } from '../src/render.js';
import { shellInvocation } from '../src/cli.js';
import { splitCommand, isAmbiguous } from '../src/shellwords.js';
import { buildContext } from '../src/history.js';
import { parseModel, getModel, DEFAULT_MODEL } from '../src/model.js';

const BIN = fileURLToPath(new URL('../bin/tellsh.js', import.meta.url));
const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const PS_WIN = { shell: 'powershell', os: 'win32', coreutils: 'gnu' };
const CMD = { shell: 'cmd', os: 'win32', coreutils: 'gnu' };
const PS_LINUX = { shell: 'powershell', os: 'linux', coreutils: 'gnu' };
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
  // destructive: `/tmp/a.txt.` may be the name or a sentence dot -> placeholder (test/regressions3.test.js)
  assert.equal(run('delete file /tmp/a.txt.').command, 'rm <FILE>');
  assert.equal(run('show file /tmp/a.txt.').command, 'cat /tmp/a.txt');
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
  // absolute paths survive a cd (in the same line; an older line is never a reference target)
  assert.equal(run('show that file', ['cat /etc/hosts; cd sub']).command, 'cat /etc/hosts');
  assert.ok(!/hosts/.test(run('show that file', ['cat /etc/hosts', 'cd sub', 'true']).command ?? ''));
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

// ---------------------------------------------------------------------------------------------
// quoting per shell (r1-claude major 3/4, minor 5/6/7/9)

test('composer is never offered to fish (its single quotes treat \\ as an escape)', () => {
  const q = 'pokaż pliki w a\\ szczegółowo posortowane po rozmiarze';
  for (const compose of ['auto', 'force']) {
    const r = suggest(q, { env: { shell: 'fish', os: 'linux', coreutils: 'gnu' }, compose });
    assert.notEqual(r.method, 'composed', compose);
  }
});

test('PowerShell: values with " are refused for native programs, not for cmdlets', () => {
  const r = buildCommand('git_commit', '', { env: PS_WIN, resolved: { message: 'a" --amend "b' } });
  assert.equal(r.command, null);
  assert.match(r.gap, /PowerShell < 7\.3/);
  for (const [id, s] of [['extract_targz', { file: 'a".tar.gz' }], ['download_file', { url: 'https://x.org/"a' }], ['git_switch_branch', { branch: 'x"y' }]]) {
    assert.equal(buildCommand(id, '', { env: PS_WIN, resolved: s }).command, null, id);
  }
  assert.equal(buildCommand('git_commit', '', { env: PS_WIN, resolved: { message: 'fix it' } }).command, "git add -A; if ($LASTEXITCODE -eq 0) { git commit -m 'fix it' }");
  // cmdlets receive the single-quoted literal unchanged
  assert.equal(buildCommand('cat_file', '', { env: PS_WIN, resolved: { file: 'a"b.txt' } }).command, "Get-Content -LiteralPath 'a\"b.txt'");
  assert.deepEqual([...pwshNativeSlots('git add -A; if ($LASTEXITCODE -eq 0) { git commit -m {message} }')], ['message']);
  assert.deepEqual([...pwshNativeSlots("(Get-Content -LiteralPath {file} -Raw).Replace({old}, {new})")], []);
});

test('cmd: values starting with / are refused (switches); /s /c gets wrapping quotes', () => {
  const r = suggest('delete directory /q', { env: CMD });
  assert.equal(r.command, null);
  assert.match(r.gap, /switch/);
  assert.throws(() => cmdQuote('/q'), /switch/);
  assert.deepEqual(shellInvocation('"C:\\Program Files\\x.exe" "a b"', 'cmd'), ['cmd.exe', ['/d', '/s', '/c', '""C:\\Program Files\\x.exe" "a b""']]);
});

test('function templates: only path values get ./, other values starting with - become placeholders', () => {
  const b = buildCommand('base64_encode', '', { env: BASH, resolved: { text: '-n hello' } });
  assert.ok(!/\.\/-n/.test(b.command), b.command);
  assert.ok(b.missing.includes('text'));
  const f = buildCommand('grep_text', '', { env: CMD, resolved: { pattern: '-x', path: 'src' } });
  assert.ok(!/\.\/-x/.test(f.command || ''), f.command);
  const k = buildCommand('kill_by_name', '', { env: CMD, resolved: { name: '-f' } });
  assert.ok(!/\.\/-f/.test(k.command || ''), k.command);
  // a path still gets ./
  assert.equal(buildCommand('base64_encode', '', { env: BASH, resolved: { file: '-x.txt' } }).command, 'base64 ./-x.txt');
});

test('tilde expansion only for path slots', () => {
  assert.equal(buildCommand('git_commit', '', { env: BASH, resolved: { message: '~' } }).command, "git add -A && git commit -m '~'");
  assert.match(buildCommand('grep_text', '', { env: BASH, resolved: { pattern: '~/x', path: '~/src' } }).command, /-- '~\/x' ~\/src/);
  assert.equal(buildCommand('git_commit', '', { env: PS_LINUX, resolved: { message: '~' } }).command.includes("'~'"), true);
  assert.match(buildCommand('replace_text', '', { env: PS_WIN, resolved: { file: 'a.txt', old: '~', new: 'x' } }).command, /\.Replace\('~', 'x'\)/);
  assert.equal(shQuote('~/a b'), "~/'a b'");
  assert.equal(shQuote('~', { tilde: false }), "'~'");
  assert.equal(psQuote('~/x', { tilde: false }), "'~/x'");
});

test('"kill process named -9" is not kill 9; sed old text with a newline is escaped/refused', () => {
  const r = run('kill process named -9');
  assert.ok(!/\b9\b/.test(r.command), r.command);
  const s = buildCommand('replace_text', '', { env: BASH, resolved: finalizeSlots(BY_ID.replace_text, { file: 'a.txt', old: 'a\nb', new: 'c' }) });
  assert.ok(!s.command.includes('\n'), s.command);
  assert.equal(validSlot('old', 'a\nb'), false);
});

// ---------------------------------------------------------------------------------------------
// CLI / parsing / model robustness (r1-claude minor 2, 4, 11, 13)

test('--threshold must be a number in [0, 1]', () => {
  for (const v of ['foo', 'NaN', '2', '-1', '']) {
    const r = cli(['--threshold', v, '--json', 'bake', 'me', 'a', 'cake']);
    assert.equal(r.status, 2, v);
    assert.match(r.stderr, /--threshold/);
  }
  assert.equal(cli(['--threshold=0.5', '--json', 'list', 'files']).status, 0);
});

test('shellwords: &> is a redirection, $(...) and backticks are one ambiguous word', () => {
  const r = splitCommand('cat a.txt &> log.txt', 'posix', { keepRedirects: true });
  assert.deepEqual(r.segments.map((s) => s.words), [['cat', 'a.txt', '&>', 'log.txt']]);
  const d = splitCommand('echo $(cat a; ls) done', 'posix');
  assert.equal(d.segments.length, 1);
  assert.equal(d.segments[0].words.length, 3);
  assert.ok(isAmbiguous(d.segments[0].words[1]));
  const b = splitCommand('echo `cat a; ls` x', 'posix');
  assert.equal(b.segments.length, 1);
  assert.ok(isAmbiguous(b.segments[0].words[1]));
  assert.equal(run('delete it', ['make &> build.log']).command, 'rm build.log');
});

test('history parsing does not backtrack exponentially on long \\ or quote runs', () => {
  for (const [line, kind] of [['cat ' + '\\\\'.repeat(300) + ' ;', 'posix'], ['Get-Content -LiteralPath ' + "''".repeat(300) + ' ;', 'pwsh'], ['Get-Content -LiteralPath ' + '""'.repeat(300) + ' ;', 'pwsh']]) {
    const t = Date.now();
    buildContext([line], { kind });
    assert.ok(Date.now() - t < 2000, `${kind}: ${Date.now() - t} ms`);
  }
});

test('model.bin is validated: truncated or corrupt files give a clear error', () => {
  const buf = readFileSync(DEFAULT_MODEL);
  assert.ok(parseModel(buf).models.tagger);
  assert.throws(() => parseModel(buf.subarray(0, 6)), /bad model file/);
  assert.throws(() => parseModel(buf.subarray(0, buf.length - 1000)), /exceeds the file/);
  const hdr = Buffer.from(buf);
  hdr.writeUInt32LE(buf.length * 2, 4);
  assert.throws(() => parseModel(hdr), /header length/);
  const junk = Buffer.concat([Buffer.from('TSH2'), Buffer.from([3, 0, 0, 0]), Buffer.from('{x}')]);
  assert.throws(() => parseModel(junk), /not valid JSON/);
});

test('tagger features are deduplicated per token like training (set of indices)', () => {
  const dim = getModel().tagDim;
  for (const q of ['pokaż 10 największych plików w ~/Pobrane', 'kill nginx nginx', 'grep -rn foo foo /etc /etc']) {
    const toks = tagTokens(q);
    const raw = tagFeatures(toks, 'grep', dim);
    const sets = tagFeatureSets(toks, 'grep', dim);
    sets.forEach((f, i) => { assert.equal(new Set(f).size, f.length); assert.deepEqual([...new Set(raw[i])].sort(), [...f].sort()); });
  }
});
