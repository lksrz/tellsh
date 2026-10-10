// Regression tests for round 9: the round-8 findings (review/r8-claude.md, review/r8-codex.md). A quoted argument
// after the first that mixes request words with a path or file name is unclear, not a path; history values of
// `git -C` / `docker --context` commands belong to another repository / daemon; a script and its arguments are
// several operands; bash does not write the running call to its history first; system files written by dd, cp,
// install, mv, ln -f, perl -i or chmod 000 are critical; unclear arguments are checked against every operand slot;
// the A_dev calibration model excludes the hybrid dev split from every training source.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { suggest } from '../src/pipeline.js';
import { checkDanger } from '../src/danger.js';
import { joinArgs } from '../src/shellwords.js';
import { analyzeCommand, isAmbiguous } from '../src/history.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, history, o = {}) => suggest(q, { env: BASH, ...(history ? { history } : {}), ...o });
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BIN = join(ROOT, 'bin', 'tellsh.js');
const cliJson = (...words) => JSON.parse(spawnSync(process.execPath, [BIN, '--json', '--shell', 'bash', '--os', 'linux', ...words],
  { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } }).stdout);
const refused = (r, ph, why) => {
  assert.equal(r.context.rule, 'refused', `${why}: ${JSON.stringify(r.context)} -> ${r.command}`);
  assert.ok(r.command == null || r.command.includes(ph), `${why}: ${r.command}`);
};

test('major: a quoted argument mixing request words with a path or file name is unclear, not the path', () => {
  assert.deepEqual(joinArgs(['delete', 'folder /tmp/x']), { text: 'delete "folder /tmp/x"', unclear: ['folder /tmp/x'] });
  assert.deepEqual(joinArgs(['delete', 'the file notes.txt']), { text: 'delete "the file notes.txt"', unclear: ['the file notes.txt'] });
  assert.deepEqual(joinArgs(['usuń', 'plik raport.pdf']), { text: 'usuń "plik raport.pdf"', unclear: ['plik raport.pdf'] });
  assert.deepEqual(joinArgs(['delete', 'all files in /tmp/x']).unclear, ['all files in /tmp/x']);
  assert.deepEqual(joinArgs(['usuń', 'katalog /tmp/x']).unclear, ['katalog /tmp/x']);
  // the space before the separator: a request word and a path, or a directory with a space? unclear
  assert.deepEqual(joinArgs(['delete', 'my data/a.txt']).unclear, ['my data/a.txt']);
  // genuine names stay values
  for (const v of ['My Notes.txt', 'data/my notes.txt', '/tmp/my data', '~/My Documents', './a b/c.txt']) {
    assert.deepEqual(joinArgs(['delete', v]), { text: `delete "${v}"`, unclear: [] }, v);
  }
  // the first word is still the request
  assert.deepEqual(joinArgs(['delete folder', '/tmp/x']), { text: 'delete folder /tmp/x', unclear: [] });

  const cases = [
    [['delete', 'folder /tmp/x'], '<PATH>', /\/tmp\/x/],
    [['delete', 'the file notes.txt'], '<FILE>', /notes\.txt/],
    [['usuń', 'plik raport.pdf'], '<FILE>', /raport/],
    [['delete', 'all files in /tmp/x'], '<PATH>', /\/tmp\/x/],
  ];
  for (const [args, ph, bad] of cases) {
    const r = cliJson(...args);
    assert.ok(r.command.includes(ph) && !bad.test(r.command), `${args}: ${r.command}`);
    assert.ok(r.warnings.some((w) => /quoted argument is a name or part of the request/.test(w)), `${args}: ${r.warnings}`);
  }
  assert.equal(cliJson('delete', 'My Notes.txt').command, "rm 'My Notes.txt'");
});

test('major: the history copy of such a call is not read as the path', () => {
  for (const h of ['tellsh delete "folder /tmp/x"', 'tellsh delete "the file notes.txt"', "tellsh usuń 'plik raport.pdf'"]) {
    for (const q of ['show it', 'delete it']) {
      const r = run(q, [h]);
      assert.ok(!/folder|the file|plik/.test(r.command ?? ''), `${q} after ${h}: ${r.command}`);
    }
  }
  assert.equal(run('delete it', ['tellsh show "My Notes.txt"']).command, "rm 'My Notes.txt'");
});

test('major: history values of a command scoped to another repository, directory or daemon are refused', () => {
  refused(run('delete it', ['git -C /repo blame notes.txt']), '<FILE>', 'git -C blame');
  refused(run('delete it', ['git --work-tree=/srv/app diff a.txt']), '<FILE>', 'git --work-tree=');
  refused(run('stop it', ['docker --context production logs web']), '<CONTAINER>', 'docker --context');
  refused(run('stop it', ['docker -H tcp://prod:2375 logs web']), '<CONTAINER>', 'docker -H');
  refused(run('stop it', ['DOCKER_HOST=tcp://prod:2375 docker logs web']), '<CONTAINER>', 'DOCKER_HOST=');
  // and the command is not repeated without its scope
  for (const q of ['do it again', 'same for api']) {
    const r = run(q, ['docker --context production logs web']);
    assert.ok(!/^docker (?:logs|stop)\b/.test(r.command ?? '') || r.command.includes('<'), `${q}: ${r.command}`);
  }
  const a = analyzeCommand('docker --context production logs web');
  assert.ok(isAmbiguous(a.ents.container) && (a.intent == null || a.ambiguous), JSON.stringify(a));
  // without a scope option nothing changes
  assert.equal(run('delete it', ['git blame notes.txt']).command, 'rm notes.txt');
  assert.equal(run('stop it', ['docker logs web']).command, 'docker stop web');
  assert.equal(run('stop it', ['docker --debug logs web']).command, 'docker stop web');
});

test('minor: a script and its arguments are several operands', () => {
  for (const h of ['python3 script.py data.csv', 'node build.js out/', 'bash deploy.sh prod.env']) {
    const r = run('delete it', [h]);
    assert.ok(r.command == null || r.command.includes('<'), `${h}: ${r.command}`);
  }
  assert.equal(run('delete it', ['python3 script.py']).command, 'rm script.py');
  assert.equal(run('delete it', ['node build.js --watch']).command, 'rm build.js');
});

test('nit: bash does not write the running call first, so an identical last tellsh line is the previous command', () => {
  const h = (shell) => Object.assign(['cat secret.txt', 'tellsh delete it'], { kind: 'posix', shell });
  assert.ok(!/secret/.test(run('delete it', h('bash')).command ?? ''), 'bash');
  // zsh / fish / PSReadLine write it first: the line is this call, the previous command is the one before it
  assert.equal(run('delete it', h('zsh')).command, 'rm secret.txt');
  assert.equal(run('delete it', h('fish')).command, 'rm secret.txt');
});

test('minor: dd, cp, install, mv, ln -f, perl -i and chmod 000 onto a system file are critical', () => {
  for (const c of ['dd if=/dev/zero of=/etc/passwd', 'sudo dd if=x of=/boot/vmlinuz', 'cp /tmp/x /etc/passwd', 'install -m 644 x /etc/passwd',
    'sudo mv /tmp/x /etc/shadow', 'ln -sf /tmp/x /etc/passwd', 'perl -pi -e s/a/b/ /etc/passwd', 'perl -i.bak -pe 1 /etc/fstab', 'chmod 000 /etc/passwd',
    'sudo sh -c "cp x /etc/passwd"']) {
    const d = checkDanger(c);
    assert.ok(d.critical && d.risk === 'high', `${c}: ${JSON.stringify(d)}`);
  }
  // reading a system file, copying into a system directory, ordinary dd / chmod: not critical
  for (const c of ['cp /etc/passwd /tmp/x', 'sudo cp x.service /etc/systemd/system/', 'dd if=a.iso of=out.img', 'chmod 644 /etc/hosts',
    'ln -s /etc/passwd x', 'perl -pi -e s/a/b/ notes.txt', 'cp -t /etc/nginx a.conf']) {
    assert.ok(!checkDanger(c).critical, c);
  }
});

test('minor: an unclear argument blanks every operand slot it contains, not only path slots', () => {
  const r = run('stop service nginx', null, { unclearArgs: ['nginx please'] });
  assert.ok(r.command.includes('<SERVICE>') && !/nginx/.test(r.command), r.command);
  assert.ok(r.warnings.some((w) => /^value left as a placeholder/.test(w)), r.warnings.join('; '));
  const c = run('stop container web', null, { unclearArgs: ['web now'] });
  assert.ok(c.command.includes('<CONTAINER>'), c.command);
  // text slots (a commit message) are not operands
  assert.ok(/fix the bug/.test(run('commit "fix the bug"', null, { unclearArgs: ['fix the bug'] }).command));
  // unrelated unclear arguments change nothing
  assert.equal(run('stop service nginx', null, { unclearArgs: ['my data'] }).command, 'sudo systemctl stop nginx');
});

test('major: A_dev excludes the hybrid dev split from every training source (OOD, tldr, anaphora too)', () => {
  const sh = readFileSync(join(ROOT, 'scripts/hybrid/train_a_dev.sh'), 'utf8');
  const gen = readFileSync(join(ROOT, 'scripts/gen_data.js'), 'utf8');
  // the lines the script rewrites exist in gen_data.js, and the script fails when a rewrite did not happen
  assert.ok(gen.includes('if (heldOut.has(r0.text)) { dropped++; continue; }'));
  assert.ok(/^ {2}const leaks = excl\.has;$/m.test(gen));
  assert.ok(gen.includes("import { ctxFeatures } from '../src/history.js';"));
  assert.ok(sh.includes("grep -q 'const leaks = (t) => excl.has(t) || isDevText(t);'"));
  // every source goes through leaks(): the OOD and tldr loaders and every emitted row
  for (const re of [/for \(const r of ood\) \{\s*if \(leaks\(r\.text\)\) continue;/, /if \(leaks\(r\.text\)\) continue;\s*const key = r\.tool/, /const emit = [^\n]*\n\s*if \(leaks\(text\)\)/]) {
    assert.ok(re.test(gen), String(re));
  }
  // the rewrite applied to gen_data.js produces the expected line
  const sed = spawnSync('sh', ['-c', `sed -n -e "s#^  const leaks = excl.has;\\$#  const leaks = (t) => excl.has(t) || isDevText(t);#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
  assert.equal(sed.stdout.trim(), 'const leaks = (t) => excl.has(t) || isDevText(t);');
});
