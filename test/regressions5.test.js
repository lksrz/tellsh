// Regression tests for the round-4 review findings (review/r4-claude.md, review/r4-codex.md):
// "same but" keeps ambiguous slots as placeholders, stale commands are never replayed or modified,
// listing provenance through `cd`, pipelines and `tellsh` lines, source/destination of refused
// references, stop words used as names, `-c` command strings and more wrappers in the danger checker,
// and one held-out index for gen_data.js and teacher.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { suggest } from '../src/pipeline.js';
import { checkDanger } from '../src/danger.js';
import { buildContext } from '../src/history.js';
import { heldOutTexts, heldOutIndex } from '../scripts/lib/heldout.js';
import { SLOT_CASES } from './slot-cases.js';
// v0.3: commands outside the catalog are high by the allowlist; these cases check the deny rules alone
const denyOnly = (c, base = 'safe') => checkDanger(c, base, { allowlist: { off: true } });

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const PWSH = { shell: 'powershell', os: 'win32', coreutils: 'gnu' };
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });
const refusedPath = (r, slot = 'path') => {
  assert.equal(r.context.rule, 'refused', JSON.stringify(r.context));
  assert.ok(r.missing.includes(slot), r.command);
};

test('blocker: "same but" never replaces an ambiguous previous path with `.`', () => {
  const r = run('same but delete txt files', ['find "$DIR" -type f -iname "*.log" -delete']);
  assert.equal(r.command, "find <PATH> -type f -iname '*.txt' -delete");
  refusedPath(r);
  // a readable previous path is still reused
  assert.equal(run('same but delete txt files', ['find /tmp/x -type f -iname "*.log" -delete']).command, "find /tmp/x -type f -iname '*.txt' -delete");
});

test('stale commands are not replayed by "same for" or modified by "same but"', () => {
  for (const newer of ['ls', 'echo done', 'sleep 5', 'clear', 'git status', 'ls newdir']) {
    const r = run('same for /srv/current', ['rm -r old', newer]);
    assert.equal(r.command, null, newer);
    assert.equal(r.understood, false);
    assert.equal(r.context.rule, 'refused');
  }
  const sb = run('same but force', ['rm -r old', 'ls newdir']);
  assert.equal(sb.command, null);
  assert.equal(sb.context.rule, 'refused');
  // a later segment of the same line
  const k = run('same for 2222', ['kill 1111; ls newdir']);
  assert.equal(k.command, null);
  assert.equal(buildContext(['kill 1111; ls newdir']).last.skipped, true);
  assert.equal(buildContext(['kill 1111']).last.skipped, false);
  // the previous command itself still works
  assert.equal(run('same for /srv/current', ['rm -r old']).command, 'rm -r /srv/current');
  assert.equal(run('same for 2222', ['kill 1111']).command, 'kill 2222');
  assert.equal(run('same for /srv/x', ['du -sh old', 'ls newdir']).command, null);
  assert.equal(run('same for /srv/x', ['ls newdir', 'du -sh old']).command, 'du -sh /srv/x');
});

test('a listing after `cd` is a listing of the cd directory', () => {
  for (const [q, h, env] of [
    ['delete them', ['cd ~/Downloads && ls | grep pdf']],
    ['delete it', ['cd ~/Downloads; ls | grep pdf']],
    ['delete them', ['cd /tmp/build; ls']],
    ['usuń je', ['cd /tmp/build; ls']],
    ['delete it', ['cd /tmp/build; ls *.pdf']],
    ['delete them', ['cd /tmp/build && ls']],
    ['delete it', ['cd /tmp/build && ls | grep pdf']],
    ['delete them', ['cd /tmp/build; Get-ChildItem'], PWSH],
    ['delete it', ['Set-Location C:\\x; Get-ChildItem -Filter *.tmp'], PWSH],
  ]) {
    const r = run(q, h, env);
    refusedPath(r);
    assert.ok(!/Downloads|build|C:\\x/.test(r.command), `${JSON.stringify(h)} ${q} -> ${r.command}`);
  }
  // singular "it" after a listing is refused too (round 4b); the newest cd with nothing after it is a target
  assert.equal(run('delete it', ['cd /tmp/build; ls']).command, 'rm -r <PATH>');
  assert.equal(run('delete them', ['cd /tmp/a; cd /tmp/b']).command, 'rm -r /tmp/b');
  // only the previous line is read: a listing in its own line names nothing, so the cd of an older line is not used
  for (const h of [['cd ~/Downloads', 'ls | grep pdf'], ['cd /tmp/build', 'ls'], ['cd /tmp/a', 'cd /tmp/b', 'ls']]) {
    const r = run('delete them', h);
    assert.equal(r.context.rule, 'refused', JSON.stringify(h));
    assert.ok(!/Downloads|build|\/tmp\/[ab]/.test(r.command), `${JSON.stringify(h)} -> ${r.command}`);
  }
});

test('a listing piped into any later stage is a selection of its entries', () => {
  for (const [h, env] of [
    [['ls ~/Downloads | sort | grep pdf']], [['ls ~/Downloads | head -50 | grep pdf']], [['ls ~/Downloads | sort | rg pdf']],
    [['ls -S ~/Downloads | head -1']], [['du -sh ~/Downloads | sort | grep x']],
    [['Get-ChildItem C:\\x | Sort-Object Length | Select-Object -First 1'], PWSH],
  ]) {
    const r = run('delete it', h, env);
    refusedPath(r);
    assert.ok(!/Downloads|C:\\x/.test(r.command), `${h} -> ${r.command}`);
  }
  // an unpiped listing followed by another command on the same line is a listing too (round 4b)
  assert.equal(run('delete it', ['ls /tmp/build; echo done']).command, 'rm -r <PATH>');
});

test('a `tellsh` listing line is a listing too', () => {
  refusedPath(run('delete them', ['tellsh list directory /tmp/build']));
  assert.ok(buildContext(['tellsh list directory /tmp/build'], {
    classify: () => ({ intent: 'list_files', slots: { path: '/tmp/build' } }),
  }).listedDirs.has('/tmp/build'));
});

test('a refused or pronoun source keeps the request path as the destination', () => {
  const a = run('move them to /tmp/old', ['ls /tmp/build | grep pdf']);
  assert.equal(a.command, 'mv -i <SRC> /tmp/old');
  refusedPath(a, 'src');
  const b = run('copy it to /backup', ['cat $F']);
  assert.equal(b.command, 'cp -ri <SRC> /backup');
  refusedPath(b, 'src');
  assert.equal(run('copy it to /backup', ['cat a.txt']).command, 'cp -ri a.txt /backup');
  assert.equal(run('move it to /tmp/old', ['mkdir /tmp/build']).command, 'mv -i /tmp/build /tmp/old');
  assert.equal(run('move it to /tmp/old', ['ls /tmp/build']).command, 'mv -i <SRC> /tmp/old'); // listed (round 4b)
});

test('a stop word right after "folder"/"file" is a name, not a reason to use `.`', () => {
  assert.equal(run('delete the folder out').command, 'rm -r out');
  assert.equal(run('delete folder up').command, 'rm -r up');
  assert.equal(run('delete the file w').command, 'rm w');
  assert.equal(run('show disk usage of folder out sorted by size').command, 'du -sh out');
  // still a preposition when a location follows
  assert.equal(run('delete the cache folder on the disk').command, 'rm -r <PATH>');
});

test('danger: -c command strings and more wrappers are unwrapped', () => {
  for (const c of ['flock -c "rm -rf /" /tmp/l', 'flock /tmp/l -c "rm -rf /"', 'su -c "rm -rf /"', 'su - root -c "rm -rf /"', 'su -lc "rm -rf /" root',
    'su --command="rm -rf /"', 'runuser root -c "rm -rf /"', 'runuser -u root -- rm -rf /', 'pkexec rm -rf /', 'pkexec --user root rm -rf /',
    'chrt 10 rm -rf /', 'chrt -f 10 rm -rf /', 'cgexec -g cpu:x rm -rf /', 'eatmydata rm -rf /', 'torsocks rm -rf /', 'torsocks -P 9050 rm -rf /', 'catchsegv rm -rf /']) {
    const d = checkDanger(c, 'safe');
    assert.equal(d.risk, 'high', c);
    assert.equal(d.critical, true, c);
  }
  for (const c of ['flock /tmp/l echo hi', 'cgexec -g cpu:x ls', 'chrt -p 1234']) assert.equal(denyOnly(c, 'safe').risk, 'safe', c);
  // switching user is a privilege change, like sudo (round 4b)
  assert.equal(denyOnly('su - bob', 'safe').risk, 'medium');
  assert.equal(checkDanger('su - bob', 'safe').risk, 'high'); // v0.3: su is a wrapper
});

test('teacher.js and gen_data.js exclude the same held-out texts, including the slot cases', () => {
  const root = new URL('..', import.meta.url).pathname;
  const idx = heldOutIndex(heldOutTexts(root));
  for (const [, q] of SLOT_CASES) assert.ok(idx.has(q), q);
  assert.ok(idx.has('chmod 755 deploy.sh') || !SLOT_CASES.some((c) => c[1] === 'chmod 755 deploy.sh'));
  for (const f of ['scripts/teacher.js', 'scripts/gen_data.js']) {
    const src = readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
    assert.match(src, /exclusionIndex\(ROOT\)/, f); // one index for both (round 4b: also the eval-only values)
  }
});
