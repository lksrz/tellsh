// Regression tests for the v0.3 final3 review (review/final3-claude.md, review/final3-codex.md) and the rules that replace
// further parser patches:
//  (1) paths: an unquoted path or name followed by more words of its name (`~/Old Projects`) is taken to the end of its
//      span; when that end is unclear (`/tmp/a.txt b.txt`) the path is a placeholder. Never the first word alone.
//  (2) prompt: a medium-risk command never runs on a plain Enter (it needs "y"); a high-risk one needs "yes".
//  (3) tools that run project code (pytest, npm/yarn/pnpm run, make, cargo, go test/run, python/node scripts, npx,
//      wrangler) are at least medium, also for --help / --version.
//  (4) scope options (--workspace, --repo / "in project X", --env, --config, --prefix) are kept or placeholdered, never
//      dropped.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest, pathTail } from '../src/pipeline.js';
import { assessCommand, checkDanger } from '../src/danger.js';
import { scopeMentions } from '../src/fill.js';
import { confirmRule } from '../src/cli.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'fish', os: 'linux', coreutils: 'gnu' },
  { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, { shell: 'cmd', os: 'win32', coreutils: 'gnu' }];
const run = (q, env = BASH) => suggest(q, { env });

// ---------- (1) paths ----------
test('final3-claude major: an unquoted path with spaces is never cut at its first space', () => {
  const whole = {
    'delete the folder ~/Old Projects': "rm -r ~/'Old Projects'",
    'delete folder /tmp/my data': "rm -r '/tmp/my data'",
    'delete all .log files in /var/log old': "find '/var/log old' -type f -iname '*.log' -delete",
    'chmod 777 /srv/my app': "chmod 777 '/srv/my app'",
    'move /tmp/old notes to /tmp/archive': "mv -i '/tmp/old notes' /tmp/archive",
    // the same for a bare name and for Polish
    'delete the folder Old Projects': "rm -r 'Old Projects'",
    'usuń folder ~/Stare Projekty': "rm -r ~/'Stare Projekty'",
    // a modifier or a connector ends the name
    'delete the folder ~/Old Projects please': "rm -r ~/'Old Projects'",
    'delete the folder ~/Old Projects recursively': "rm -r ~/'Old Projects'",
    'copy ~/My Notes to /tmp/backup': "cp -ri ~/'My Notes' /tmp/backup",
  };
  for (const [q, cmd] of Object.entries(whole)) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.deepEqual(r.missing, [], q);
  }
});

test('final3-claude major: a path whose end is unclear is a placeholder with a warning', () => {
  for (const [q, cmd, k] of [
    ['delete file /tmp/a.txt b.txt', 'rm <FILE>', 'file'],
    ['delete file /tmp/my notes.txt', 'rm <FILE>', 'file'],
    ['copy /tmp/my notes /tmp/b', 'cp -ri <SRC> /tmp/b', 'src'],
  ]) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.ok(r.missing.includes(k), q);
    assert.ok(r.warnings.some((w) => /unclear where the unquoted name ends/.test(w)), `${q}: ${r.warnings.join('; ')}`);
  }
  // ends in sentence punctuation: the existing placeholder (the name may include the `.`)
  const p = run('delete the folder ~/Old Projects.');
  assert.equal(p.command, 'rm -r <PATH>');
});

test('paths: words of the request after a path are not part of its name', () => {
  for (const [q, cmd] of [
    ['make script.sh executable', 'chmod +x script.sh'],
    ['delete file /tmp/notes.txt now', 'rm /tmp/notes.txt'],
    ['delete file /tmp/notes.txt permanently', 'rm /tmp/notes.txt'],
    ['copy /tmp/a /tmp/b', 'cp -ri /tmp/a /tmp/b'],
    ['copy /tmp/a.txt /tmp/b', 'cp -ri /tmp/a.txt /tmp/b'],
    ['list files in ~/Old Projects', "ls -lah ~/'Old Projects'"],
    ['which directory inside node_modules is the largest? show 15', 'du -h -d 1 node_modules 2>/dev/null | sort -rh | head -n 15'],
    ['ile jest plików w /etc razem z podkatalogami', 'find /etc -type f | wc -l'],
    ['utwórz archiwum tar.gz z /etc o nazwie etc.tgz', 'tar -czvf etc.tgz /etc'],
  ]) assert.equal(run(q).command, cmd, q);
  // a withheld path keeps its placeholder in an optional part of the template (never `git restore` of everything)
  assert.equal(pathTail('rm /tmp/a.txt b.txt', '/tmp/a.txt', [], { used: ['b.txt'] }), null);
  assert.deepEqual(pathTail('rm /tmp/a.txt b.txt', '/tmp/a.txt', []), { ambiguous: true, words: ['b.txt'] });
});

test('paths: the composer takes the whole name too, never its first word', () => {
  const r = run('recursively chmod 777 /srv/my app');
  assert.ok(r.command.endsWith("'/srv/my app'"), r.command);
  assert.ok(!/(?:^|\s)\/srv\/my(?:\s|$)/.test(r.command), r.command);
  // a read-only composed command is not blocked by words of the request after its path
  assert.equal(run('find files in /tmp owned by user bob').command, 'find /tmp -type f -user bob');
});

test('paths: the one-argument and the several-argument forms agree', () => {
  // `tellsh delete the folder "~/Old Projects"` is quoted again by joinArgs
  assert.equal(run('delete the folder ~/Old Projects').command, run("delete the folder '~/Old Projects'").command);
});

// ---------- (2) prompt ----------
test('0.3.2 UX: Enter runs at every risk level, Esc/Ctrl+C abort, medium/high keep a warning', () => {
  for (const r of ['safe', 'medium', 'high', undefined]) {
    const d = (k, st = {}) => confirmRule(r).decide(k, st);
    assert.equal(d('\r'), 'run', String(r));
    for (const k of ['\x03', '\x04', 'n', 'q', 'x\x03', 'n\r', '\x1b\x1b']) assert.equal(d(k), 'abort', `${r} ${JSON.stringify(k)}`);
    assert.equal(d('\x1b'), 'pending-esc'); // lone Esc: the caller aborts unless a sequence follows
    assert.equal(d('e'), 'edit');
    // review r1: \n (Ctrl+J), \r\n, an Enter inside a burst, arrows, typed words never run
    for (const k of ['\n', '\r\n', 'ls\r', '\r\r', '\x1b[A', 'y', 'yes', 'x', ' ']) assert.equal(d(k), null, `${r} ${JSON.stringify(k)}`);
  }
  const rule = confirmRule('high');
  // an arrow split across chunks is not an Esc
  let st = {};
  assert.equal(rule.decide('\x1b', st), 'pending-esc');
  assert.equal(rule.decide('[A', st), null);
  st = {};
  assert.equal(rule.decide('\x1b[', st), null);
  assert.equal(rule.decide('A', st), null);
  // bracketed paste: contents (newlines, n, q, Esc) are ignored across chunks; Enter after the paste runs
  st = {};
  assert.equal(rule.decide('\x1b[200~rm -rf x\r', st), null);
  assert.equal(rule.decide('\r', st), null);
  assert.equal(rule.decide('more\nq\x1b[201~', st), null);
  assert.equal(rule.decide('\r', st), 'run');
  assert.equal(rule.decide('\x1b[200~text\x03', {}), 'abort');
  assert.equal(confirmRule('safe').warning, null);
  assert.match(confirmRule('medium').warning, /Medium risk/);
  assert.match(confirmRule('high').warning, /High risk/);
  assert.match(confirmRule(undefined).warning, /High risk/);
  assert.match(confirmRule('high', { composed: true }).warning, /High risk, experimental/);
  for (const r of ['safe', 'medium', 'high']) assert.equal(confirmRule(r, { incomplete: true }).decide('\r', {}), 'edit', r);
  // the reviewed medium rows still carry the medium warning
  for (const q of ['chmod 777 /srv/my app', 'move /tmp/old notes to /tmp/archive']) assert.equal(run(q).risk, 'medium', q);
});

// ---------- (3) project code ----------
test('final3-codex major: tools that run project code are at least medium, also for --help', () => {
  for (const env of SHELLS) {
    const r = run('show the help for pytest', env);
    assert.equal(r.risk, 'medium', `${env.shell}: ${r.command}`);
    assert.ok(r.warnings.some((w) => /runs code from the project/.test(w)), env.shell);
  }
  for (const c of ['pytest --help', 'pytest --version', 'py.test --help', 'make --help', 'make', 'cargo --version', 'cargo test',
    'go test ./...', 'go run .', 'go generate', 'python3 script.py', 'python -m mypkg', 'node app.js', 'node server.js --help',
    'npx eslint --help', 'npm run build', 'npm run --help', 'npm test', 'yarn dev', 'yarn --version', 'pnpm run build',
    'wrangler --version', 'wrangler dev', 'npx wrangler deploy', 'bun run dev', 'tox --help', 'poetry run pytest', 'uv run x.py', 'bundle exec rake']) {
    assert.notEqual(assessCommand(c).risk, 'safe', c);
    assert.notEqual(checkDanger(c, 'safe', { rendered: true }).risk, 'safe', c);
  }
  // the tool's own --help / --version, without project code: unchanged
  for (const c of ['node --version', 'python3 --version', 'npm --version', 'npm --help', 'pnpm --help', 'go version', 'go help', 'git --help']) {
    assert.equal(checkDanger(c, 'safe', { rendered: true }).risk, 'safe', c);
  }
  for (const q of ['pokaz wersje cargo', 'help for make']) assert.equal(run(q).risk, 'medium', q);
  // a medium intent gets no extra warning (it is medium already)
  assert.ok(!run('run npm deploy').warnings.some((w) => /runs code from the project/.test(w)));
});

// ---------- (4) scope options ----------
test('final3-codex major: an npm workspace is kept, never dropped', () => {
  for (const env of SHELLS) {
    const r = run('run npm deploy --workspace staging', env);
    assert.match(r.command, /^npm run '?deploy'? --workspace staging$/, `${env.shell}: ${r.command}`);
  }
  for (const [q, cmd] of [
    ['run npm deploy -w staging', 'npm run deploy --workspace staging'],
    ['run npm deploy --workspace=staging', 'npm run deploy --workspace staging'],
    ['run the build script in workspace api', 'npm run build --workspace api'],
    ['install express in workspace api', 'npm install express --workspace api'],
  ]) assert.equal(run(q).command, cmd, q);
  // two workspaces: neither is guessed
  const two = run('run npm deploy --workspace a --workspace b');
  assert.equal(two.command, 'npm run deploy --workspace <WORKSPACE>');
  assert.ok(two.missing.includes('workspace'));
  // a workspace that is not a readable name
  assert.ok(run('run npm deploy --workspace ../x').missing.includes('workspace'));
});

test('final3-codex major: a scope npm cannot express is a placeholder, never dropped', () => {
  for (const [q, cmd] of [
    ['run npm deploy --env prod', 'npm run deploy <SCOPE>'],
    ['run npm test in project api', 'npm run test <SCOPE>'],
    ['run tests with npm --prefix api', 'npm run test <SCOPE>'],
    ['run npm build --config x.json', 'npm run build <SCOPE>'],
  ]) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.ok(r.missing.includes('scope'), q);
  }
});

test('final3-codex major: an explicit pull request does not hide an unresolved repository', () => {
  for (const env of SHELLS) assert.equal(run('merge pr 42 in project acme/backend', env).command, 'gh pr merge 42 --repo acme/backend', env.shell);
  for (const [q, cmd] of [
    ['merge pr 42 in project backend', 'gh pr merge 42 --repo <REPO>'],
    ['view pr 42 in project acme/backend', 'gh pr view 42 --repo acme/backend'],
    ['list prs in project acme/backend', 'gh pr list --repo acme/backend'],
    ['merge pr 42 in acme/backend', 'gh pr merge 42 --repo acme/backend'],
    ['merge pr 42 --repo acme/backend', 'gh pr merge 42 --repo acme/backend'],
    // gh has no environment: placeholder
    ['merge pr 42 --env prod', 'gh pr merge 42 <SCOPE>'],
  ]) assert.equal(run(q).command, cmd, q);
  // a wrangler config file is not dropped either
  assert.ok(run('deploy worker --config other.toml').missing.length > 0);
});

test('scope mentions: short options belong to one tool', () => {
  assert.deepEqual(scopeMentions('npm_run_script', 'run build -w api').map((s) => s.kind), ['workspace']);
  assert.deepEqual(scopeMentions('gh_pr_merge', 'merge pr -w api'), []);
  assert.deepEqual(scopeMentions('gh_pr_merge', 'merge pr 4 -R a/b').map((s) => [s.kind, s.value]), [['repo', 'a/b']]);
  // "in this project" is the working directory's
  assert.deepEqual(scopeMentions('npm_run_script', 'run build in this project'), []);
});

test('a contested npm script is a placeholder, never the literal marker', () => {
  const r = run('run npm build or test');
  assert.equal(r.command, 'npm run <SCRIPT>');
  assert.ok(!/'\?'/.test(r.command));
});
