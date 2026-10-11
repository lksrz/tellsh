// Regression tests for the v0.3 final4 review (review/final4-claude.md, review/final4-codex.md):
//  (1) a negation or exclusion ("except", "but not", "oprócz", "bez", "not 1234", "don't delete") is never ignored: the
//      command expresses it, a placeholder stands for it, or the request is refused (src/guards.js)
//  (2) removing a package (uninstall / remove / odinstaluj) never becomes the install command
//  (3) an operand is never the tool or noun word ("stop docker container web" -> `docker stop web`)
//  (4) move / copy: source and destination are read on each side of "to" / "do" / "na"; an unclear side is a placeholder
//  (5) history "same for <spaced path>" keeps the whole path
//  (6) a quoted --workspace value is one value; pip --target is kept; ssh -L keeps the remote host and port
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'fish', os: 'linux', coreutils: 'gnu' },
  { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, { shell: 'cmd', os: 'win32', coreutils: 'gnu' }];
const run = (q, env = BASH, history) => suggest(q, { env, history });
const refused = (r, q) => {
  assert.equal(r.command ?? null, null, `${q}: ${r.command}`);
  assert.equal(r.understood, false, q);
};

// ---------- (1) negation / exclusion ----------
test('final4-claude major 2: an excluded process is never killed (or killed alone)', () => {
  for (const env of SHELLS) {
    for (const q of ['kill python except pid 1234', 'kill all python processes except pid 1234', 'kill all python processes except 1234',
      'kill every python process but not 1234', 'zabij wszystkie procesy python oprócz 1234', 'kill python not 1234',
      'kill all node processes except 4242', "kill python, but don't kill 1234", 'kill 1234 and not 5678']) {
      refused(run(q, env), `${env.shell}: ${q}`);
    }
  }
  // the excluded value is left alone and nothing else is acted on: kept
  assert.equal(run('kill process 1234 not 5678').command, 'kill 1234');
  assert.equal(run('delete a.txt not b.txt').command, 'rm a.txt');
});

test('an exclusion a changing command cannot express is refused; a prohibition of the request too', () => {
  for (const q of ['delete all log files except today', 'rm everything but notes.txt', 'delete all files except notes.txt',
    'delete all files other than notes.txt', 'usuń pliki *.log z wyjątkiem app.log', 'remove all .log files without app.log',
    'delete branches except main', 'stop all services except ssh', 'stop all containers except db', 'remove all docker images except nginx',
    'delete everything in /tmp/x except a.txt', 'compress /srv/app excluding node_modules', 'delete log files older than 7 days but not in /var/log/keep',
    "don't delete a.txt", 'do not kill 1234', 'never remove /tmp/x', 'nie usuwaj a.txt', 'nie restartuj nginx', "stop nginx, don't restart it"]) {
    refused(run(q), q);
  }
  // a read-only command that would show what the request excludes
  refused(run('list files except .txt'), 'list files except .txt');
  // a negation that describes a manner, a state or a part of the request the command leaves out is not an exclusion
  const kept = {
    'delete /tmp/x without asking': 'rm /tmp/x',
    'usuń /tmp/x bez pytania': 'rm /tmp/x',
    'find files not modified in 30 days': 'find . -type f -mtime +30',
    'czy ktoś poza mną jest teraz zalogowany': 'who',
    'what did i change but not stage yet': 'git diff',
    "merge pr 42 and don't delete the branch": 'gh pr merge 42',
    'install nginx without recommends': 'sudo apt install nginx',
  };
  for (const [q, cmd] of Object.entries(kept)) assert.equal(run(q).command, cmd, q);
  // a placeholder already stands for the excluded part (close3 selectors): kept
  assert.equal(run('merge pr 42 but not in repo acme/app').command, 'gh pr merge 42 --repo <REPO>');
  assert.equal(run("don't deploy worker to prod").command, 'npx wrangler deploy --env <WENV>');
});

test('a negation word is never the operand ("kill the process that is not responding" is not `pkill -f not`)', () => {
  const r = run('kill the process that is not responding');
  assert.ok(!/(?:^|\s)'?not'?(?:\s|$)/.test(String(r.command)), r.command);
});

// ---------- (2) uninstall is never install ----------
test('final4-claude major 3: removing a package is never the install command (contrastive)', () => {
  for (const env of SHELLS) {
    for (const q of ['uninstall nginx', 'uninstall package nginx', 'remove package nginx', 'odinstaluj nginx', 'usuń pakiet nginx',
      'apt remove nginx', 'brew uninstall wget', 'pip uninstall requests', 'uninstall requests with pip', 'npm uninstall lodash', 'npm rm lodash']) {
      const r = run(q, env);
      assert.ok(!/(?:^|\s)(?:install|i|add)(?:\s|$)/.test(String(r.command)) || /uninstall|remove|purge/.test(String(r.command)), `${env.shell}: ${q}: ${r.command}`);
    }
  }
  // the same requests without the removal word still install
  const install = {
    'install nginx': 'sudo apt install nginx',
    'install package nginx': 'sudo apt install nginx',
    'zainstaluj nginx': 'sudo apt install nginx',
    'pip install requests': 'python3 -m pip install requests',
    'install requests with pip': 'python3 -m pip install requests',
    'npm install': 'npm install',
  };
  for (const [q, cmd] of Object.entries(install)) assert.equal(run(q).command, cmd, q);
  // an injected `;rm` inside a package name is not a removal request (it is withheld as before)
  assert.equal(run('install requests==2.32.0;rm with pip').command, 'python3 -m pip install <PKG>');
});

// ---------- (3) the noun is never the operand ----------
test('final4-claude major 3: "stop docker container web" is `docker stop web`', () => {
  const cases = {
    'stop docker container web': 'docker stop web',
    'docker stop container web': 'docker stop web',
    'stop docker web': 'docker stop web',
    'zatrzymaj kontener docker web': 'docker stop web',
    'show logs of docker container web': 'docker logs --tail 100 -f web',
    'docker logs nginx': 'docker logs --tail 100 -f nginx',
    'docker exec -it api-server sh': 'docker exec -it api-server sh',
    'stop container web': 'docker stop web',
    // no name at all: placeholder, never `docker stop docker`
    'stop the docker container': 'docker stop <CONTAINER>',
    'docker stop': 'docker stop <CONTAINER>',
    'put eslint in the global npm packages': 'npm install -g eslint',
    'instal pytest via pip': 'python3 -m pip install pytest',
  };
  for (const [q, cmd] of Object.entries(cases)) assert.equal(run(q).command, cmd, q);
});

// ---------- (4) move / copy ----------
test('final4-claude major 1: move / copy / rename keep the stated destination; an unclear source is a placeholder', () => {
  const cases = {
    'rename /tmp/my file.txt to /tmp/new.txt': 'mv -i <SRC> /tmp/new.txt',
    'move /tmp/my file.txt to /tmp/dir': 'mv -i <SRC> /tmp/dir',
    'copy /tmp/my file.txt to /tmp/dir': 'cp -ri <SRC> /tmp/dir',
    'przenieś /tmp/my file.txt do /tmp/dir': 'mv -i <SRC> /tmp/dir',
    'move report.txt notes.txt to /tmp/dir': 'mv -i <SRC> /tmp/dir',
    'rename my notes.txt to notes.txt': 'mv -i <SRC> notes.txt',
    // clear sides
    "move '/tmp/my file.txt' to /tmp/dir": "mv -i '/tmp/my file.txt' /tmp/dir",
    "copy '/tmp/my file.txt' to '/tmp/new dir'": "cp -ri '/tmp/my file.txt' '/tmp/new dir'",
    'move /tmp/old notes to /tmp/archive': "mv -i '/tmp/old notes' /tmp/archive",
    'copy a.txt to ~/My Docs': "cp -ri a.txt ~/'My Docs'",
    'rename the folder build to build_old': 'mv -i build build_old',
    'change the name of index.htm to index.html': 'mv -i index.htm index.html',
    'zmień nazwę a.txt na b.txt': 'mv -i a.txt b.txt',
    'skopiuj plik env.example do .env.local': 'cp -ri env.example .env.local',
    'mv draft.md into the archive folder': 'mv -i draft.md archive',
    'move it to /tmp/old': 'mv -i <SRC> /tmp/old',
  };
  for (const [q, cmd] of Object.entries(cases)) assert.equal(run(q).command, cmd, q);
  const r = run('rename /tmp/my file.txt to /tmp/new.txt');
  assert.deepEqual(r.missing, ['src']);
  assert.ok(r.warnings.some((w) => /unclear which words name the source/.test(w)), r.warnings.join('; '));
});

// ---------- (5) history ----------
test('final4-codex major: "same for <spaced path>" keeps the whole path', () => {
  const h = ['rm -r /tmp/old'];
  assert.equal(run('same for ~/Old Projects', BASH, h).command, "rm -r ~/'Old Projects'");
  assert.equal(run("same for ~/'Old Projects'", BASH, h).command, "rm -r ~/'Old Projects'");
  assert.equal(run('same for ~/Old Projects please', BASH, h).command, "rm -r ~/'Old Projects'");
  assert.equal(run('same for /tmp/new', BASH, h).command, 'rm -r /tmp/new');
  const amb = run('same for /tmp/a.txt b.txt', BASH, h);
  assert.equal(amb.command, 'rm -r <PATH>');
  assert.deepEqual(amb.missing, ['path']);
  assert.equal(run('same for /srv/my app', BASH, ['du -sh /var/log']).command, "du -sh '/srv/my app'");
});

// ---------- (6) scope values, pip target, ssh tunnel ----------
test('final4-codex major: a quoted --workspace value is one value', () => {
  assert.equal(run('run npm deploy --workspace "staging app"').command, "npm run deploy --workspace 'staging app'");
  assert.equal(run('run npm deploy --workspace="staging app"').command, "npm run deploy --workspace 'staging app'");
  assert.equal(run('run npm deploy --workspace staging').command, 'npm run deploy --workspace staging');
  assert.equal(run('npm install lodash -w packages/api').command, 'npm install lodash --workspace packages/api');
});

test('final4-codex major: pip --target is kept', () => {
  assert.equal(run('install requests with pip --target /tmp/packages').command, 'python3 -m pip install requests --target /tmp/packages');
  assert.equal(run('pip install requests -t /tmp/pkgs').command, 'python3 -m pip install requests --target /tmp/pkgs');
  assert.equal(run('pip install requests --target="/tmp/my pkgs"').command, "python3 -m pip install requests --target '/tmp/my pkgs'");
  const r = run('install requests with pip --target /tmp/packages');
  assert.equal(r.risk, 'medium');
  assert.deepEqual(r.missing, []);
});

test('final4-codex major: ssh -L keeps the remote host and port', () => {
  const cases = {
    'forward local port 8080 to remote port 5432 on db.example.com over ssh': 'ssh -N -L 8080:localhost:5432 db.example.com',
    'przekieruj lokalny port 8080 na zdalny port 5432 na serwerze db.example.com': 'ssh -N -L 8080:localhost:5432 db.example.com',
    'forward local 8080 to db.internal:5432 via bastion.example.com': 'ssh -N -L 8080:db.internal:5432 bastion.example.com',
    'ssh tunnel -L 8080:db.internal:5432 bastion': 'ssh -N -L 8080:db.internal:5432 bastion',
    'forward 8080 to 5432 on db.example.com over ssh': 'ssh -N -L 8080:localhost:5432 db.example.com',
    'ssh tunnel local port 9000 remote port 80 on web1': 'ssh -N -L 9000:localhost:80 web1',
    // the same port on both ends when only one is named
    'forward port 5432 from db.example.com': 'ssh -N -L 5432:localhost:5432 db.example.com',
    'forward port 8080 to db.example.com over ssh': 'ssh -N -L 8080:localhost:8080 db.example.com',
    // two bare ports, neither said to be local or remote: the remote one is withheld
    'ssh tunnel ports 8080 5432 on db.example.com': 'ssh -N -L 8080:localhost:<RPORT> db.example.com',
  };
  for (const [q, cmd] of Object.entries(cases)) assert.equal(run(q).command, cmd, q);
});
