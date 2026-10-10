// Regression tests for round 8: the round-7 findings (review/r7-claude.md, review/r7-codex.md). Quoted request text
// passed as several arguments is not a path; the running tellsh call is dropped only on an exact match; several
// operands are not "it"/"them"; deleting, editing or overwriting system files is critical; a cd after a file read;
// "move it there" is refused; the composer never fills a withheld slot; the encoder bundle installer only writes its
// own files; augmented hybrid training rows are filtered against the held-out sets; the hybrid re-ranks the policy's
// k candidates whatever --top shows; npm scoped packages.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readdirSync, existsSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { suggest } from '../src/pipeline.js';
import { checkDanger } from '../src/danger.js';
import { joinArgs, joinWords } from '../src/shellwords.js';
import { tellshArgs, analyzeCommand } from '../src/history.js';
import { suggestHybrid } from '../src/rerank/hybrid.js';
import { cascade } from '../src/cascade.js';
import { envFeatures } from '../src/env.js';
import { heldOutFilter } from '../scripts/hybrid/export_data.js';
import { exclusionIndex } from '../scripts/lib/heldout.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, history, o = {}) => suggest(q, { env: BASH, ...(history ? { history } : {}), ...o });
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BIN = join(ROOT, 'bin', 'tellsh.js');
const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
const cliJson = (...words) => JSON.parse(cli(['--json', '--shell', 'bash', '--os', 'linux', ...words]).stdout);

test('major: request text passed as several quoted arguments is never the path', () => {
  assert.deepEqual(joinArgs(['delete folder', '/tmp/x']), { text: 'delete folder /tmp/x', unclear: [] });
  assert.deepEqual(joinArgs(['usuń katalog', 'build']), { text: 'usuń katalog build', unclear: [] });
  assert.deepEqual(joinArgs(['delete', 'folder', 'my data']), { text: 'delete folder "my data"', unclear: ['my data'] });
  assert.equal(joinWords(['delete', 'My Notes.txt']), 'delete "My Notes.txt"');
  assert.equal(joinWords(['delete', 'folder', '/tmp/a b']), 'delete folder "/tmp/a b"');
  assert.equal(cliJson('--dry-run', 'delete folder', '/tmp/x').command, 'rm -r /tmp/x');
  assert.equal(cliJson('delete the folder', '/tmp/my data').command, "rm -r '/tmp/my data'");
  assert.equal(cliJson('usuń katalog', 'build').command, 'rm -r build');
  // the .log filter is kept
  assert.equal(cliJson('delete all log files in', '/tmp/my logs').command, "find '/tmp/my logs' -type f -iname '*.log' -delete");
  // a quoted argument that may be a name or words of the request: placeholder for a changing command
  const u = cliJson('delete', 'folder', 'my data');
  assert.equal(u.command, 'rm -r <PATH>');
  assert.ok(u.warnings.some((w) => /quoted argument/.test(w)), u.warnings);
  // still one value where a quoted text is expected
  assert.equal(cliJson('grep', 'for', 'hello world', 'in', 'src').command, "grep -rn -- 'hello world' src");
  // the same reading for `tellsh …` lines in history
  assert.deepEqual(tellshArgs('tellsh "delete folder" /tmp/x'), { text: 'delete folder /tmp/x', unclear: [] });
  assert.ok(!/delete folder/.test(run('delete it', ['tellsh "delete folder" /tmp/x']).command));
  const h = run('show it', ['tellsh delete folder "my data"']);
  assert.ok(!/my data|'my'/.test(h.command ?? ''), h.command);
});

test('the running tellsh call is dropped only when its request is exactly the query', () => {
  for (const h of [['cat secret.txt', 'tellsh show it delete it'], ['cat /tmp/important.txt', 'tellsh --dry-run "delete it from /tmp/scratch"']]) {
    const r = run('delete it', h);
    assert.ok(!/secret|important/.test(r.command ?? ''), `${JSON.stringify(h)} -> ${r.command}`);
  }
  assert.equal(run('delete it', ['cat a.txt', 'tellsh --history delete it']).command, 'rm a.txt');
  assert.equal(run('delete it', ['cat a.txt', 'tellsh --history "delete  it"']).command, 'rm a.txt');
});

test('several operands: "them" / "it" leave a placeholder instead of the last one', () => {
  for (const h of ['touch a.txt b.txt', 'rm -i a.txt b.txt', 'cat a.txt b.txt', 'mkdir /tmp/a /tmp/b']) {
    for (const q of ['delete them', 'delete it']) {
      const r = run(q, [h]);
      assert.equal(r.context.rule, 'refused', `${q} after ${h}: ${r.command}`);
      assert.ok(!/b\.txt|\/tmp\/b/.test(r.command ?? ''), `${q} after ${h}: ${r.command}`);
    }
  }
  // one operand (counts, chmod modes, owners and script arguments are not operands)
  assert.equal(run('delete it', ['head -n 5 a.txt']).command, 'rm a.txt');
  assert.equal(run('delete it', ['chmod 644 a.txt']).command, 'rm a.txt');
  assert.equal(run('delete it', ['chown me:me a.txt']).command, 'rm a.txt');
  assert.equal(analyzeCommand('python3 run.py --fast out.txt').ents.file, 'run.py');
});

test('deleting, editing in place or overwriting a system file is critical', () => {
  for (const c of ['rm /etc/passwd', 'rm -f /etc/shadow', 'sudo rm -- /boot/vmlinuz', 'unlink /etc/hosts', 'sed -i d /etc/passwd',
    "sed -i.bak -e 's/a/b/' /etc/fstab", 'tee /etc/passwd < /dev/null', 'cat /dev/null | sudo tee /etc/passwd', 'echo x | tee /usr/bin/ls']) {
    const d = checkDanger(c, 'high');
    assert.equal(d.critical, true, `${c}: ${JSON.stringify(d)}`);
  }
  for (const c of ['rm a.txt', 'sed -i d notes.txt', 'tee out.txt', 'echo x | sudo tee -a /etc/hosts', "sed 's/a/b/' /etc/passwd", 'cat /etc/passwd']) {
    assert.equal(checkDanger(c, 'safe').critical, false, c);
  }
  // reachable from a generated suggestion
  const r = run('delete it', ['sudo cat /etc/shadow']);
  assert.equal(r.command, 'rm /etc/shadow');
  assert.equal(r.critical, true);
});

test('a cd after a file read: "it" is refused, not the cd target', () => {
  const r = run('delete it', ['cat a.txt; cd /srv']);
  assert.equal(r.context.rule, 'refused');
  assert.ok(!/\/srv|a\.txt/.test(r.command ?? ''), r.command);
  // reading is fine: the directory is the newest value of the line
  assert.equal(run('show it', ['cat a.txt; cd /srv']).command, 'ls -lah /srv');
});

test('"move it there" is refused with a note, never reported as a resolved pronoun', () => {
  for (const h of [['cd /tmp/x'], ['cd /tmp/x; cat a.txt'], ['cat a.txt']]) {
    const r = run('move it there', h);
    assert.equal(r.context.rule, 'refused', JSON.stringify(h));
    assert.match(r.context.note, /"it".*"there"|it.*there/);
    assert.ok(r.command == null || /<SRC>|<DST>|<PATH>/.test(r.command), r.command);
  }
});

test('the composer never fills a slot the catalog withheld', () => {
  for (const q of ['change permissions recursively to 777 on `pwd`', 'change permissions recursively to 777 on $(pwd)',
    'change permissions recursively to 777 on "/tmp/a\nb"']) {
    const r = run(q);
    assert.notEqual(r.method, 'composed', `${q} -> ${r.command}`);
    assert.ok(!/-- pwd|\n/.test(r.command ?? ''), `${q} -> ${r.command}`);
    assert.ok(r.command == null || r.missing.length > 0, `${q} -> ${r.command}`);
  }
  for (const q of ['chmod -R 755 on `pwd`', 'chmod -R 755 on $(pwd)']) {
    for (const compose of ['auto', 'force']) {
      const r = run(q, null, { compose });
      assert.ok(!/(?:^|\s)(?:--\s+)?pwd(?:\s|$)/.test(r.command ?? ''), `${q} (${compose}) -> ${r.command}`);
    }
  }
  // an ordinary path still composes
  assert.equal(run('change permissions recursively to 777 on /tmp/ab').command, 'chmod -R 777 -- /tmp/ab');
});

test('fetch_model installs only the bundle files named in the manifest', () => {
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r8-'));
  const sha = (b) => createHash('sha256').update(b).digest('hex');
  const FILES = ['encoder.int8.onnx', 'vocab.json', 'labels.json'];
  const fetch = (from, to) => spawnSync(process.execPath, [join(ROOT, 'scripts/hybrid/fetch_model.js'), '--from', from, '--to', to], { encoding: 'utf8' });
  try {
    const src = join(dir, 'src', 'bundle');
    mkdirSync(src, { recursive: true });
    for (const f of FILES) writeFileSync(join(src, f), f);
    writeFileSync(join(dir, 'src', 'evil'), 'payload');
    const files = Object.fromEntries(FILES.map((f) => [f, sha(Buffer.from(f))]));
    // a name that escapes the destination, an absolute path, an extra name
    for (const extra of [{ '../evil': sha(Buffer.from('payload')) }, { [join(dir, 'abs')]: sha(Buffer.from('payload')) }, { 'other.bin': sha(Buffer.from('x')) }]) {
      writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files: { ...files, ...extra } }));
      const to = join(dir, 'out', 'enc');
      const r = fetch(src, to);
      assert.notEqual(r.status, 0, r.stdout);
      assert.match(r.stderr, /must list exactly/);
      assert.ok(!existsSync(to), 'nothing is written');
      assert.ok(!existsSync(join(dir, 'out', 'evil')) && !existsSync(join(dir, 'abs')));
    }
    // a missing name, or a bad checksum: nothing is written either
    writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files: { ...files, 'vocab.json': sha(Buffer.from('other')) } }));
    assert.notEqual(fetch(src, join(dir, 'out2')).status, 0);
    assert.ok(!existsSync(join(dir, 'out2')));
    // the real thing
    writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files }));
    const ok = fetch(src, join(dir, 'ok'));
    assert.equal(ok.status, 0, ok.stderr);
    assert.deepEqual(readdirSync(join(dir, 'ok')).sort(), [...FILES, 'manifest.json'].sort());
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('hybrid export: every emitted row (also typo / relexicalised copies) is checked against the held-out sets', () => {
  const excl = exclusionIndex(ROOT);
  const out = heldOutFilter({ has: (t) => excl.has(t) });
  for (const text of ['kill all node processes', 'koniec pliku /var/log/syslog', 'pokaz caly plik requirements.txt']) {
    assert.ok(excl.has(text), text);
    out.push({ text, kind: 'relex' });
    out.push({ text, kind: 'typo' });
  }
  out.push({ text: 'a training sentence nobody holds out 12345', kind: 'orig' });
  assert.equal(out.rows.length, 1);
  assert.equal(out.dropped, 6);
});

test('hybrid: the policy re-ranks its k candidates whatever --top displays', async () => {
  const q = 'clnoe https://github.com/sharkdp/bat';
  const c = cascade(q, { extras: envFeatures(BASH), top: 8 });
  const rank = c.top.findIndex((t) => t.intent === 'git_clone');
  assert.ok(rank >= 3 && rank < 5, `git_clone is 4th/5th in the cascade (rank ${rank})`);
  const fake = { infer: async () => ({ intents: { git_clone: 0.99 }, pNone: 0 }) };
  for (const top of [1, 3, 5]) {
    const r = await suggestHybrid(q, { env: BASH, top, encoder: fake });
    assert.equal(r.intent, 'git_clone', `top ${top}: ${r.command}`);
    assert.equal(r.candidates.length, top);
  }
});

test('npm scoped packages are kept (or the operand is a placeholder, never dropped)', () => {
  assert.equal(run('npm install @types/node').command, 'npm install @types/node');
  assert.equal(run('install @types/node with npm').command, 'npm install @types/node');
  assert.equal(run('npm install -g @angular/cli').command, 'npm install -g @angular/cli');
  assert.equal(suggest('npm install @types/node', { env: { shell: 'powershell', os: 'win32' } }).command, "npm install '@types/node'");
  for (const q of ['npm install @types/node%x', 'npm install "foo bar"']) {
    const r = run(q);
    assert.equal(r.command, 'npm install <PKG>', q);
    assert.deepEqual(r.missing, ['pkg']);
  }
  assert.equal(run('npm install').command, 'npm install');
});
