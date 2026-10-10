// Regression tests for the round-4b fixes (review/r4-claude.md, review/r4-codex.md, stricter rules):
// a history value is the target of a changing command only when it is unambiguous and comes from the most
// recent history segment that produced its type (never the parent directory of a listing or search, never an
// older value, never a value a newer listing may have replaced); stale commands are never replayed; the danger
// checker unwraps -c/--command payloads and scans the trailing command of every wrapper (unsure -> high);
// function words never turn a path into `.`; the Jev teacher and gen_data.js share one exclusion index.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { suggest } from '../src/pipeline.js';
import { checkDanger } from '../src/danger.js';
import { buildContext, changeGuard } from '../src/history.js';
import { exclusionIndex } from '../scripts/lib/heldout.js';
import { EVAL_VALUES } from '../scripts/lib/silver.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const PWSH = { shell: 'powershell', os: 'win32', coreutils: 'gnu' };
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });
const refused = (r, placeholder, why) => {
  assert.equal(r.context.rule, 'refused', `${why}: ${JSON.stringify(r.context)} -> ${r.command}`);
  assert.ok(r.command == null || r.command.includes(placeholder), `${why}: ${r.command}`);
};

test('a changing command is never aimed at the parent directory of a listing or search', () => {
  for (const [q, h, env] of [
    // singular "it" too: the listed directory or one of its entries
    ['delete it', ['ls /tmp/build']], ['delete that folder', ['ls /tmp/build']], ['delete it', ['tree /tmp/build']],
    ['delete it', ['du /tmp/build']], ['delete it', ['du -h -d 1 /tmp/build | sort -rh']],
    ['usuń to', ['ls /tmp/build']], ['remove it', ['Get-ChildItem C:\\x'], PWSH],
    // a search without a path after `cd` searches the cd directory
    ['delete it', ['cd /tmp/build && grep -rl TODO']], ['delete them', ['cd /tmp/build; rg TODO']],
    ['delete them', ['cd /tmp/build; fd pdf']], ['delete them', ['cd /tmp/build; find -name "*.o"']],
    ['delete it', ['pushd /tmp/build; ls']], ['delete it', ['cd /tmp/build; ls -la']],
    // the cd directory after other commands ran in it
    ['delete it', ['cd /tmp/build; make']], ['delete it', ['cd /tmp/build && make']],
  ]) refused(run(q, h, env), '<PATH>', `${q} after ${JSON.stringify(h)}`);
  for (const [q, h] of [['move it to /tmp/old', ['ls /tmp/build']], ['copy it to /backup', ['cat a.txt', 'ls']]]) {
    const r = run(q, h);
    refused(r, '<SRC>', q);
    assert.ok(!/build|a\.txt/.test(r.command), r.command);
  }
  assert.equal(run('make it executable', ['ls scripts']).command, 'chmod +x <FILE>');
  // the directory itself (not a listing of it) is still a target
  assert.equal(run('delete it', ['du -sh /tmp/build']).command, 'rm -r /tmp/build');
  assert.equal(run('delete it', ['mkdir /tmp/new']).command, 'rm -r /tmp/new');
  assert.equal(run('delete it', ['cd /tmp/build']).command, 'rm -r /tmp/build');
  // reads are fine
  assert.equal(run('show it', ['ls /tmp/build']).command, 'ls -lah /tmp/build');
});

test('a newer listing of the same entity type blocks an older value for a changing command', () => {
  for (const [q, h, ph] of [
    ['delete it', ['cat foo.txt; ls'], '<FILE>'],
    ['delete it', ['cat foo.txt; ls /tmp'], '<PATH>'],
    ['remove it', ['Get-Content a.txt; Get-ChildItem'], '<FILE>'],
    ['kill it', ['pgrep foo; ps aux'], '<NAME>'],
    ['kill that pid', ['kill 1111; pgrep worker'], '<PID>'],
    ['stop it', ['docker logs web; docker ps'], '<CONTAINER>'],
    ['restart that service', ['systemctl status nginx; systemctl list-units'], '<SERVICE>'],
    ['delete that branch', ['git checkout -b feat; git branch'], '<BRANCH>'],
    // an older line is never read (round 7: one line of history)
    ['delete it', ['cat foo.txt', 'ls'], '<FILE>'],
    ['stop it', ['docker logs web', 'docker ps'], '<'],
  ]) refused(run(q, h), ph, `${q} after ${JSON.stringify(h)}`);
  // a value printed after the listing (or by it) is fine
  assert.equal(run('delete it', ['ls; cat foo.txt']).command, 'rm foo.txt');
  assert.equal(run('kill it', ['ps aux | grep node']).command, 'pkill -f node');
  assert.equal(run('ubij ten proces', ['top', 'ps -fp 31337']).command, 'kill 31337');
  assert.equal(run('stop it', ['docker ps; docker logs web']).command, 'docker stop web');
  // reads may still use the value listed over
  assert.equal(run('show it', ['cat foo.txt; ls']).command, 'cat foo.txt');
});

test('only the newest value of a type is a target: no older branch, no hint-selected older path', () => {
  const b = run('delete that branch', ['git checkout -b feat', 'git checkout main']);
  refused(b, '<BRANCH>', 'branch');
  assert.match(b.context.note, /checked-out/);
  refused(run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']), '<PATH>', 'hint');
  assert.equal(run('delete that branch', ['git push origin feature/x']).command, 'git branch -d feature/x');
  // only the previous line is read
  const ctx = buildContext(['mkdir /a', 'mkdir /b']);
  assert.deepEqual(ctx.ents, { dir: '/b' });
  assert.equal(changeGuard('dir', '/b', 'delete it', ctx), null);
  assert.match(changeGuard('dir', '/b', 'delete that backups folder', ctx), /backups/);
});

test('stale changing commands are never replayed', () => {
  for (const h of [['rm -r old; ls'], ['rm -r old', 'ls'], ['rm -r old', 'cd /tmp'], ['kill 1111; echo done'], ['tellsh delete folder old', 'ls']]) {
    for (const q of ['same for /srv/x', 'same but force', 'to samo dla /srv/x']) {
      const r = run(q, h);
      assert.ok(r.command == null || !/^(?:rm|kill)\b/.test(r.command) || /<\w+>/.test(r.command), `${q} after ${JSON.stringify(h)} -> ${r.command}`);
    }
  }
  assert.equal(run('same for /srv/x', ['rm -r old']).command, 'rm -r /srv/x');
});

test('danger: generic -c/--command payloads, trailing commands of wrappers, unsure -> high', () => {
  for (const c of ['bash -lc "rm -rf /"', 'sh -ec "rm -rf /"', 'script -c "rm -rf /" /dev/null', 'foo --command "rm -rf /"', 'foo --command="rm -rf /"',
    'env -S "rm -rf /"', 'tmux new "rm -rf /"', 'ssh host rm -rf /', 'ssh -p 22 host "rm -rf /"', 'docker exec ct rm -rf /', 'parallel rm -rf ::: /',
    'find . -exec sh -c "rm -rf /" \;', 'sudo -iu root rm -rf /', 'sudo --preserve-env=PATH rm -rf /', 'nice --adjustment=5 rm -rf /',
    'ionice -c3 rm -rf /', 'timeout -s KILL 10 rm -rf /', 'timeout --preserve-status 5 rm -rf /', 'stdbuf -oL rm -rf /', 'nohup rm -rf / &',
    'setsid -f rm -rf /', 'doas -u root rm -rf /', 'env -i FOO=1 rm -rf /', 'xargs -0 -I{} rm -rf /', 'flock -w 5 /tmp/l rm -rf /',
    'eatmydata rm -rf /', 'catchsegv rm -rf /', 'proxychains rm -rf /', 'faketime "2020-01-01" rm -rf /', 'su -lc "rm -rf /" root',
    'runuser -l root -c "rm -rf /"', 'pkexec --user root rm -rf /', 'chrt -f 99 rm -rf /', 'cgexec -g cpu:x rm -rf /', 'torsocks rm -rf /',
    'cmd /c rd /s /q C:\\', 'powershell -Command Remove-Item -Recurse C:\\']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', c);
    assert.equal(d.critical, true, `${c}: ${d.warnings.join('; ')}`);
  }
  // cannot be checked: high
  for (const c of ['$CMD -rf /', 'eval "$X"', 'sh -c "$X"', 'su -c "$CMD"', 'echo "rm -rf /" | sh', 'cat script | sudo bash',
    'powershell -EncodedCommand AAAA', 'iwr x | iex', '$(which rm) -rf /tmp/x', 'find . -exec sh -c "rm \\"$1\\"" _ {} \;']) {
    assert.equal(checkDanger(c).risk, 'high', c);
  }
  // inline interpreter code is not shell and cannot be checked (round 5: unsure -> high)
  assert.equal(checkDanger('python3 -c "print(1)"').risk, 'high');
  // privilege change: at least medium
  for (const c of ['su - bob', 'sudo -u bob ls', 'pkexec ls', 'runuser -u bob ls']) assert.notEqual(checkDanger(c).risk, 'safe', c);
  // unchanged: ordinary -c options and wrapped harmless commands
  for (const c of ['grep -c foo file', 'grep -c "$PAT" file', 'wc -c file', 'head -c 10 f', 'ssh user@host', 'ssh -p 22 host uptime',
    'docker exec -it web sh', 'tar -czvf a.tgz dir', 'nohup node server.js &', 'timeout 5 ping -c 3 x.org',
    'nice -n 10 make', 'watch -n 1 df -h', 'xargs -n1 echo', 'ls | shuf', 'ls | sha256sum', 'tmux new -s work', 'kubectl exec -it pod -- ls /']) {
    assert.equal(checkDanger(c).risk, 'safe', `${c}: ${checkDanger(c).warnings.join('; ')}`);
  }
});

test('a function word never turns a path into `.`: placeholder instead', () => {
  for (const q of ['list files in the', 'list files in out', 'list files in', 'pokaż pliki w', 'find log files in the', 'list files in it']) {
    const r = run(q);
    if (!r.understood && !r.command) continue; // a rejection is fine too (v0.4 model); never `.`
    assert.ok(r.command?.includes('<PATH>'), `${q} -> ${r.command}`);
    assert.ok(!/ \.(?:\s|$)/.test(r.command), `${q} -> ${r.command}`);
  }
  // with history, "in it" is a reference; "in the" is not filled implicitly
  assert.equal(run('list everything in it', ['cd /tmp/x']).command, 'ls -lah /tmp/x');
  assert.match(run('list files in the', ['cd /tmp/x']).command, /<PATH>/);
  // unchanged: a real location word or no location at all
  assert.equal(run('list files').command, 'ls -lah .');
  assert.equal(run('list all files in the current directory').command, 'ls -lah .');
  assert.equal(run('delete the folder out').command, 'rm -r out');
});

test('the Jev teacher uses the exclusion index of gen_data.js, including eval-only values', () => {
  const root = new URL('..', import.meta.url).pathname;
  const idx = exclusionIndex(root);
  const v = EVAL_VALUES.find((x) => /^[\w./-]{4,}$/.test(x));
  assert.ok(idx.has(`show the contents of ${v}`), v);
  assert.ok(idx.evalValue(`show the contents of ${v}`));
  for (const f of ['scripts/teacher.js', 'scripts/gen_data.js']) {
    const src = readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
    assert.match(src, /exclusionIndex\(ROOT\)/, f);
    assert.doesNotMatch(src, /heldOutIndex\(heldOutTexts/, f);
  }
});

test('a reference in destination position is the destination, under the same guard', () => {
  assert.equal(run('copy notes.txt to it', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
  assert.equal(run('skopiuj notes.txt do niego', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
  assert.equal(run('move report.pdf into that folder', ['mkdir /srv/x']).command, 'mv -i report.pdf /srv/x');
  // a listed directory (or anything else changeGuard rejects) is not a destination either
  for (const q of ['copy notes.txt to it', 'copy notes.txt into that folder']) {
    const r = run(q, ['ls /backup']);
    assert.equal(r.command, 'cp -ri notes.txt <DST>', q);
    assert.equal(r.context.rule, 'refused');
  }
  // the reference as the source is unchanged
  assert.equal(run('move it to /tmp/old', ['cat a.txt']).command, 'mv -i a.txt /tmp/old');
  assert.equal(run('copy them to /backup', ['ls /x | grep pdf']).command, 'cp -ri <SRC> /backup');
});
