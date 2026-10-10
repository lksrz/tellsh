// Regression tests for the round-5 fixes (review/r5-claude.md, review/r5-codex.md): place references ("there", "tam",
// "in the same folder") go through the history guard and never fall back to `.`; rejected paths never become `.`;
// "move them to X" never makes X the source; "everything in it" never deletes the directory itself; earlier
// `tellsh` requests keep their placeholders when they are read back from history; "same but" never refills a
// withheld slot; wrapped listings (`sudo -u root ls`) protect older values; the danger checker reads inline
// interpreter code, non-recursive chmod/chown of /, writes onto raw disks and destructive commands after unknown programs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { checkDanger } from '../src/danger.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, history) => suggest(q, { env: BASH, ...(history ? { history } : {}) });
const placeholder = (r, ph, why) => {
  assert.ok(r.command == null || r.command.includes(ph), `${why}: ${r.command}`);
  assert.ok(r.command == null || !/ \.(?:\s|$)/.test(r.command), `${why}: ${r.command}`);
};

test('"there", "tam", "stamtąd", "inside", "in the same folder" are place references, never `.`', () => {
  // claude r5 blocker: with history, the listed directory is not a target for a changing command
  for (const [q, h] of [
    ['delete all log files there', ['ls /var/log']], ['delete all log files there', ['cd /var/log', 'ls']],
    ['delete all .tmp files over there', ['ls /var/log']], ['delete all log files inside', ['ls /var/log']],
    ['usuń wszystkie pliki log tam', ['ls /var/log']], ['usuń wszystkie pliki log stamtąd', ['ls /var/log']],
    // a cd after which other commands ran, no directory at all, a newer file
    ['delete all log files there', ['cd /tmp/x', 'make']], ['delete all log files there', ['cat /etc/hosts']],
    ['delete all log files there', ['cd /tmp/x', 'cat a.txt']],
  ]) {
    const r = run(q, h);
    assert.equal(r.context.rule, 'refused', `${q} after ${h}: ${JSON.stringify(r.context)}`);
    placeholder(r, '<PATH>', `${q} after ${h}`);
  }
  // claude r5 minor 2 and no history: placeholder, never `find there` / `find same` / `find .`
  for (const q of ['delete all log files there', 'delete all log files in there', 'delete all log files from there',
    'delete all log files in the same folder', 'delete all log files in the same place', 'remove the logs in there too',
    'usuń wszystkie pliki log tam', 'list files there']) {
    const r = run(q);
    placeholder(r, '<PATH>', q);
    assert.ok(!/\b(?:there|same|tam)\b/.test(r.command), `${q}: ${r.command}`);
  }
  // a place never names the object of a changing command
  for (const q of ['remove the logs in there too', 'delete the folder there', 'delete notes.txt there']) {
    const r = run(q, ['cd /tmp/x']);
    assert.ok(!r.command.includes('/tmp/x'), `${q}: ${r.command}`);
    assert.equal(r.context.rule, 'refused', q);
  }
  // the newest directory, unambiguous and from the most recent segment: a search root (or a destination) is fine
  assert.equal(run('delete all log files there', ['cd /tmp']).command, "find /tmp -type f -iname '*.log' -delete");
  assert.equal(run('find files named foo there', ['cd /tmp/x']).command, "find /tmp/x -iname '*foo*'");
  assert.equal(run('copy notes.txt there', ['cd /tmp/x']).command, 'cp -ri notes.txt /tmp/x');
  assert.equal(run('copy notes.txt there', ['ls /tmp/x']).command, 'cp -ri notes.txt <DST>');
  // reads may use a listed directory
  assert.equal(run('list files there', ['ls /var/log']).command, 'ls -lah /var/log');
  // existential "there" is not a reference
  assert.equal(run('is there a file named foo').command, "find . -iname '*foo*'");
});

test('a rejected explicit path is withheld, never replaced by `.` (codex r5 major 4)', () => {
  for (const q of ['delete all log files in "/tmp/a\nb"', 'list files in "/tmp/a\nb"']) placeholder(run(q), '<PATH>', JSON.stringify(q));
});

test('"move them to X" / "copy them to X": X is the destination, the source a placeholder (claude r5 minor 3)', () => {
  for (const [q, h, cmd] of [
    ['move them to /tmp/old', null, 'mv -i <SRC> /tmp/old'], ['move them to /tmp/old', ['ls'], 'mv -i <SRC> /tmp/old'],
    ['move them to /tmp/old', ['ls *.pdf'], 'mv -i <SRC> /tmp/old'], ['move them to /tmp/old', ['ls | grep pdf'], 'mv -i <SRC> /tmp/old'],
    ['move them to /tmp/old', ['echo hi'], 'mv -i <SRC> /tmp/old'], ['copy them to /backup', null, 'cp -ri <SRC> /backup'],
    ['przenieś je do /tmp/old', null, 'mv -i <SRC> /tmp/old'],
  ]) assert.equal(run(q, h).command, cmd, `${q} after ${h}`);
  // two named paths, or a resolved reference: unchanged
  assert.equal(run('copy notes.txt to /backup').command, 'cp -ri notes.txt /backup');
  assert.equal(run('rename a.txt to b.txt').command, 'mv -i a.txt b.txt');
  assert.equal(run('copy it to /backup', ['cat a.txt']).command, 'cp -ri a.txt /backup');
  assert.equal(run('copy notes.txt to it', ['mkdir /tmp/n']).command, 'cp -ri notes.txt /tmp/n');
});

test('"delete everything in it" is about the entries, never the directory itself (claude r5 minor 4)', () => {
  for (const q of ['delete everything in it', 'usuń wszystko w nim', 'remove all the contents of it']) {
    const r = run(q, ['cd /tmp/build']);
    assert.ok(!r.command?.includes('/tmp/build'), `${q}: ${r.command}`);
  }
  assert.equal(run('delete it', ['cd /tmp/build']).command, 'rm -r /tmp/build');
});

test('an earlier tellsh request keeps its placeholders when read back from history (codex r5 blocker)', () => {
  for (const [q, h, ph] of [
    ['same for txt', ['tellsh delete all log files in the'], '<PATH>'],
    ['delete it', ['tellsh delete folder /tmp/data!'], '<PATH>'],
    ['same for txt', ['tellsh delete all log files there'], '<PATH>'],
  ]) {
    const r = run(q, h);
    assert.equal(r.context.rule, 'refused', `${q} after ${h}: ${r.command}`);
    placeholder(r, ph, `${q} after ${h}`);
  }
  // values the earlier request did read are still used
  assert.equal(run('same for /tmp/b', ['tellsh list files in /tmp/a']).command, 'ls -lah /tmp/b');
  assert.equal(run('delete it', ['tellsh show file notes.txt']).command, 'rm notes.txt');
});

test('"same but" never refills a slot the request withheld (codex r5 major 2)', () => {
  const r = run('same but delete txt files in /tmp/new!', ['find /srv/old -type f -iname "*.log" -delete']);
  assert.ok(!r.command.includes('/srv/old'), r.command);
  assert.ok(r.command.includes('<PATH>') && r.missing.includes('path'), r.command);
});

test('a wrapped listing protects older values like a plain one (codex r5 major 3)', () => {
  for (const [q, h, ph] of [
    ['delete it', ['cat old.txt; sudo -u root ls'], '<FILE>'], ['kill that pid', ['kill 1111; sudo -u root ps aux'], '<PID>'],
    ['stop it', ['docker logs old; sudo -u root docker ps'], '<CONTAINER>'], ['delete it', ['cat old.txt; env ls'], '<FILE>'],
    ['delete it', ['cat old.txt; command ls'], '<FILE>'], ['delete it', ['cat old.txt; nice -n 5 ls'], '<FILE>'],
    ['delete it', ['cat old.txt; timeout 5 ls'], '<FILE>'], ['delete it', ['cat old.txt; sudo -iu root ls'], '<FILE>'],
    // a wrapper whose arguments cannot be read: unknown, refuse
    ['delete it', ['cat old.txt; sudo -u'], '<FILE>'],
    // and in their own line (only the previous line is read)
    ['delete it', ['cat old.txt', 'sudo -u root ls'], '<FILE>'], ['delete it', ['cat old.txt', 'sudo -u'], '<FILE>'],
  ]) {
    const r = run(q, h);
    assert.equal(r.context.rule, 'refused', `${q} after ${h}: ${r.command}`);
    assert.ok(r.command.includes(ph), `${q} after ${h}: ${r.command}`);
  }
  // a wrapped command still names its own target
  assert.equal(run('delete it', ['sudo -u root cat new.txt']).command, 'rm new.txt');
  assert.equal(run('kill it', ['sudo kill 4242']).command, 'kill 4242');
});

test('danger: inline interpreter code, chmod/chown of /, raw disk writes, unknown wrappers (claude r5 minor 5)', () => {
  for (const c of ['perl -e "system(q{rm -rf /})"', `python3 -c "import shutil; shutil.rmtree('/')"`, `ruby -e 'system("rm -rf /")'`,
    `awk 'BEGIN{system("rm -rf /")}'`, `node -e "require('fs').rmSync('/',{recursive:true})"`, 'chmod 000 /', 'chmod 000 /etc',
    'chown nobody /', 'cat x | sudo tee /dev/sda', 'cp disk.img /dev/nvme0n1', 'unknownwrapper rm -rf /', 'mywrap -x rm -rf ~']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', c);
    assert.ok(d.critical, `${c}: ${d.warnings.join('; ')}`);
  }
  // inline code that cannot be checked is high, not critical
  for (const c of ['python3 -c "print(1)"', 'node -e "1"', 'perl -ne "print if /x/" f', 'chmod 644 /etc/hosts', 'chmod 700 ~']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', c);
    assert.ok(!d.critical, c);
  }
  // unchanged
  for (const c of ['awk "{print $1}" f', 'chmod +x script.sh', 'chmod 755 ./x', 'grep -r rm src', 'man rm', 'echo rm -rf /', 'python3 script.py']) {
    assert.equal(checkDanger(c).risk, 'safe', `${c}: ${checkDanger(c).warnings.join('; ')}`);
  }
});
