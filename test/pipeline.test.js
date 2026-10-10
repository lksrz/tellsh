// Cascade + tagger + history + composer behaviour (src/pipeline.js) and environment detection.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { suggest, resolveWithTagger } from '../src/pipeline.js';
import { cascade } from '../src/cascade.js';
import { tag } from '../src/tagger.js';
import { getModel } from '../src/model.js';
import { detectEnv, normShell, normOs } from '../src/env.js';
import { parseHistory, loadHistory, buildContext, resolveReference } from '../src/history.js';
import { validateComposed } from '../src/compose.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const S = (q, o = {}) => suggest(q, { env: BASH, ...o });

test('stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1', () => {
  const c = cascade('pokaż 5 największych plików w ~/Pobrane');
  assert.equal(c.tools.length, 3);
  assert.equal(c.intent, 'largest_files');
  assert.equal(c.tool, 'find');
  assert.ok(c.confidence > 0.5);
  for (const t of c.top) assert.ok(Math.abs(t.p - t.pTool * t.pIntent) < 1e-9);
});

test('PowerShell vocabulary maps to the same tool family', () => {
  assert.equal(cascade('Get-Process sorted by memory, top 5', { extras: ['shell=powershell', 'os=win32'] }).tool, 'ps');
  assert.equal(cascade('Get-ChildItem -Recurse *.log', { extras: ['shell=powershell', 'os=win32'] }).tool, 'find');
});

test('tagger: tool-conditioned BIO spans, only tags valid for the tool', () => {
  const m = getModel();
  const t = tag('kill the qzx-worker process', 'kill', m);
  assert.deepEqual(t.spans.map((s) => [s.type, s.text]), [['NAME', 'qzx-worker']]);
  const g = tag('git checkout -b feat/JIRA-12-login', 'git', m);
  assert.ok(g.spans.some((s) => s.type === 'BRANCH' && s.text === 'feat/JIRA-12-login'));
  // SIZE is not a valid tag for git -> never produced
  for (const s of tag('commit 100MB of changes', 'git', m).spans) assert.notEqual(s.type, 'SIZE');
});

test('slot merge: tagger primary, regex fills misses and replaces invalid values', () => {
  const r = resolveWithTagger('largest_files', 'pokaż 5 największych plików w ~/Pobrane');
  assert.equal(r.slots.path, '~/Pobrane');
  assert.equal(r.slots.count, 5);
  const q = resolveWithTagger('move_rename', "move 'my file.txt' to ~/Desktop");
  assert.equal(q.slots.src, 'my file.txt');
  assert.equal(q.slots.dst, '~/Desktop');
});

test('end-to-end bash + PowerShell + BSD', () => {
  assert.equal(S('pokaż 5 największych plików w ~/Pobrane').command, 'find ~/Pobrane -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 5');
  assert.match(S('zabij proces qzx-worker').command, /^pkill -f qzx-worker$/);
  assert.match(suggest('what is listening on port 8080', { env: { shell: 'powershell', os: 'win32', coreutils: 'gnu' } }).command, /^Get-NetTCPConnection -LocalPort 8080/);
  assert.match(suggest('show the 3 largest folders in /var', { env: { shell: 'zsh', os: 'darwin', coreutils: 'bsd' } }).command, /^du -k -d 1 \/var.*sort -rn \| head -n 3$/);
});

test('history: pronouns, "same for", container/service/pid references (EN + PL)', () => {
  const cases = [
    [['ls', 'docker run -d --name web nginx'], 'logs of that container', 'docker logs --tail 100 -f web'],
    // only the previous command is a reference target: an older line is never used
    [['docker run -d --name web nginx', 'ls'], 'logs of that container', 'docker logs --tail 100 -f <CONTAINER>'],
    [['docker run -d --name web nginx'], 'logi tego kontenera', 'docker logs --tail 100 -f web'],
    [['cat notes.txt'], 'delete it', 'rm notes.txt'],
    [['cat notes.txt'], 'usuń to', 'rm notes.txt'],
    [['du -sh /home'], 'same for /var', 'du -sh /var'],
    [['tellsh ile zajmuje /home'], 'to samo dla /var', 'du -sh /var'],
    [['pgrep -af node'], 'kill it', 'pkill -f node'],
    [['top', 'ps -fp 31337'], 'ubij ten proces', 'kill 31337'],
    [['systemctl status nginx'], 'zrestartuj tę usługę', 'sudo systemctl restart nginx'],
    // the newest branch is the checked-out main: an older branch is never picked for a delete (round 4b)
    [['git checkout -b feature/x', 'git push -u origin feature/x', 'git checkout main'], 'delete that branch', 'git branch -d <BRANCH>'],
    [['git checkout main', 'git push origin feature/x'], 'delete that branch', 'git branch -d feature/x'],
    [['grep -rn TODO src'], 'to samo ale tylko nazwy plików', 'grep -rl -- TODO src'],
    [['sha256sum ubuntu.iso'], 'now the md5 of the same file', 'md5sum ubuntu.iso'],
  ];
  for (const [history, q, exp] of cases) assert.equal(S(q, { history }).command, exp, `${q} [${history.join('; ')}]`);
});

test('history is optional: without it a pronoun request gets a hint, never a guessed value', () => {
  const s = S('delete it');
  assert.ok(!s.understood || s.missing.length || s.hint, JSON.stringify(s));
});

test('history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation', () => {
  assert.deepEqual(parseHistory('#1700000000\nls\n#1700000001\ncd /tmp\n', 'bash'), ['ls', 'cd /tmp']);
  assert.deepEqual(parseHistory(': 1700000000:0;ls -la\n: 1700000001:0;echo a \\\nb\n', 'zsh'), ['ls -la', 'echo a \nb']);
  assert.deepEqual(parseHistory('- cmd: ls -la\n  when: 1700\n- cmd: git status\n', 'fish'), ['ls -la', 'git status']);
  assert.deepEqual(parseHistory('Get-ChildItem `\n  -Recurse\nGet-Process\n', 'pwsh'), ['Get-ChildItem \n  -Recurse', 'Get-Process']);
});

test('loadHistory reads only the tail of HISTFILE and returns the last n commands', () => {
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-hist-'));
  try {
    const f = join(dir, '.zsh_history');
    writeFileSync(f, Array.from({ length: 50 }, (_, i) => `: 17000000${i}:0;echo ${i}`).join('\n') + '\n');
    const h = loadHistory({ shell: 'zsh', env: { HISTFILE: f, HOME: dir }, n: 10 });
    assert.equal(h.length, 10);
    assert.equal(h[9], 'echo 49');
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('context exposes ctx_ classifier features and entity references', () => {
  const ctx = buildContext(['docker run -d --name api nginx']);
  assert.ok(ctx.features.includes('ctx_last=container'));
  assert.ok(ctx.features.includes('ctx_has=container'));
  assert.equal(resolveReference('stop it', ctx).intent, 'docker_stop');
});

test('second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk', () => {
  const s = S('list files sorted by modification time, oldest first, with details');
  assert.equal(s.method, 'composed');
  assert.equal(s.experimental, true);
  assert.equal(s.command, 'ls -l -t -r');
  assert.notEqual(s.risk, 'safe');
  assert.equal(s.composed.validation.ok, true);
  assert.equal(validateComposed('ls -l --evil', 'ls').ok, false);
  assert.equal(validateComposed("ls -l 'unterminated", 'ls').ok, false);
  assert.equal(S('list files sorted by modification time, oldest first', { compose: 'off' }).method, 'catalog');
});

test('out-of-domain requests are rejected (also by the composer)', () => {
  for (const q of ['write me a poem about the sea', 'jaka jest pogoda w krakowie', 'tell me a joke']) assert.equal(S(q).understood, false, q);
});

test('env detection and overrides', () => {
  assert.equal(normShell('/usr/bin/zsh'), 'zsh');
  assert.equal(normShell('pwsh.exe'), 'powershell');
  assert.equal(normShell('dash'), 'sh');
  assert.equal(normOs('macos'), 'darwin');
  assert.deepEqual(detectEnv({ shell: 'fish', os: 'darwin' }), { shell: 'fish', os: 'darwin', coreutils: 'bsd' });
  assert.equal(detectEnv({ shell: 'cmd' }).os, 'win32');
  assert.equal(detectEnv({ os: 'win32' }).shell, process.platform === 'win32' ? detectEnv({ os: 'win32' }).shell : 'powershell');
});
