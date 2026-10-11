// Regression tests for round 24 (v0.3 close): the round-23 findings (review/r23-codex.md, review/r23-claude.md), fixed by
// two design rules instead of more special cases.
//  (1) gh / wrangler selector rule: a request is read against a closed vocabulary; a word that neither the vocabulary nor
//      a value that was read explains (descriptive, quoted, uncertain) withholds the selector as a placeholder the user
//      fills (`<PR>`, `<WENV>`, `<NUM>`, `<ARGS>`), never a guess and never a bare command.
//  (2) the danger checker is an allowlist: only the commands / subcommands / flags the catalog renders are trusted; any
//      wrapper, environment assignment, unknown program, subcommand or flag is high risk (confirmation needed).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { checkDanger, allowlistProblems } from '../src/danger.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const PWSH = { shell: 'pwsh', os: 'windows' };
const CMD = { shell: 'cmd', os: 'windows' };
const SHELLS = [BASH, PWSH, CMD];
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });
const withheld = (r, cmd, slots, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual([...r.missing].sort(), [slots].flat().sort(), msg);
};
const exact = (r, cmd, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual(r.missing, [], msg);
};

test('major: an environment after "in" / "on" is withheld, never dropped for the default target', () => {
  for (const env of SHELLS) {
    for (const q of ['deploy worker in preview2', 'deploy worker on qa_1', 'deploy the worker in customer-a', 'deploy worker on the eu cluster']) {
      withheld(run(q, null, env), 'npx wrangler deploy --env <WENV>', 'wenv', `${env.shell}: ${q}`);
    }
    // read environments stay as they were
    exact(run('deploy worker to staging', null, env), 'npx wrangler deploy --env staging', env.shell);
    exact(run('deploy worker to preview2', null, env), 'npx wrangler deploy --env preview2', env.shell);
    exact(run('deploy the worker', null, env), 'npx wrangler deploy', env.shell);
  }
});

test('major: a secret update keeps the environment it names (or withholds it)', () => {
  for (const env of SHELLS) {
    for (const q of ['set worker secret API_KEY --env staging', 'set worker secret API_KEY for staging', 'put secret API_KEY on the staging environment']) {
      exact(run(q, null, env), 'npx wrangler secret put API_KEY --env staging', `${env.shell}: ${q}`);
    }
    withheld(run('set worker secret API_KEY in preview2', null, env), 'npx wrangler secret put API_KEY --env <WENV>', 'wenv', env.shell);
    exact(run('set the API_KEY secret on the worker', null, env), 'npx wrangler secret put API_KEY', env.shell);
  }
  // the other wrangler commands take --env too
  exact(run('tail worker logs for production'), 'npx wrangler tail --env production');
});

test('major: a dependency install never makes up a package name', () => {
  for (const env of SHELLS) {
    for (const q of ['install the project dependencies with npm', 'install dependencies with npm', 'install npm dependencies',
      'npm install the deps for this repo', 'zainstaluj zaleznosci projektu', 'install dependencies from package.json']) {
      exact(run(q, null, env), 'npm install', `${env.shell}: ${q}`);
    }
    for (const q of ['npm ci', 'do a clean install with npm']) exact(run(q, null, env), 'npm ci', `${env.shell}: ${q}`);
    exact(run('add express to the project with npm', null, env), 'npm install express', env.shell);
    exact(run('install lodash via npm', null, env), 'npm install lodash', env.shell);
  }
});

test('major: pr creation keeps the repository (or withholds it); anything else it cannot express is a placeholder', () => {
  for (const env of SHELLS) {
    exact(run('create a pull request in repo acme/app', null, env), 'gh pr create --fill --repo acme/app', env.shell);
    withheld(run('create a pull request in the other repo', null, env), 'gh pr create --fill --repo <REPO>', 'repo', env.shell);
    for (const q of ['create a pr into develop', 'create a draft pr', 'create a pr with reviewer bob']) {
      withheld(run(q, null, env), 'gh pr create --fill <ARGS>', 'args', `${env.shell}: ${q}`);
    }
    exact(run('create a pull request', null, env), 'gh pr create --fill', env.shell);
  }
});

test('rule 1: descriptive, picked-out or unknown selectors are placeholders for every gh / wrangler command', () => {
  for (const env of SHELLS) {
    for (const [q, cmd, slot] of [
      ['merge the pr about auth', 'gh pr merge <PR>', 'pr'],
      ['merge the pr from the payments team', 'gh pr merge <PR>', 'pr'],
      ['view the pr bob opened', 'gh pr view <PR>', 'pr'],
      ['show checks of the flaky pr', 'gh pr checks <PR>', 'pr'],
      ['list prs with label bug', 'gh pr list <ARGS>', 'args'],
      ['list closed prs', 'gh pr list <ARGS>', 'args'],
      ['deploy worker in 2-3 minutes', 'npx wrangler deploy <ARGS>', 'args'],
    ]) withheld(run(q, null, env), cmd, slot, `${env.shell}: ${q}`);
    // explicit selectors stay; a word that only describes the command does not withhold them
    exact(run('merge pr 42', null, env), 'gh pr merge 42', env.shell);
    exact(run('merge pr 45 in repo acme/app', null, env), 'gh pr merge 45 --repo acme/app', env.shell);
    exact(run('merge pr 45 and delete the branch', null, env), 'gh pr merge 45 --delete-branch', env.shell);
    exact(run('list open prs', null, env), 'gh pr list', env.shell);
    exact(run('merge pr 42 in PowerShell', null, env), 'gh pr merge 42', env.shell);
  }
  // a second number competes with an explicit one: withheld
  withheld(run('merge pr 45 or 46'), 'gh pr merge <PR>', 'pr');
});

test('rule 1: an environment the request excludes is never the target', () => {
  for (const env of SHELLS) {
    for (const q of ['deploy worker but not to production', 'deploy worker, not to prod', "don't deploy worker to prod",
      'deploy worker to staging, not production', 'wdróż workera ale nie na produkcję']) {
      withheld(run(q, null, env), 'npx wrangler deploy --env <WENV>', 'wenv', `${env.shell}: ${q}`);
    }
  }
  // a negated dry run is still a plain deploy
  exact(run('deploy worker without a dry run'), 'npx wrangler deploy');
  exact(run('deploy the worker, not a dry run'), 'npx wrangler deploy');
});

test('minor (r23): url lead-ins, reopen / ready, merge <url>', () => {
  const url = 'https://github.com/acme/app/pull/12';
  exact(run(`show me the pr at ${url}`), `gh pr view ${url}`);
  exact(run(`can you merge the pr at ${url}`), `gh pr merge ${url}`);
  exact(run(`merge the pr (${url})`), `gh pr merge ${url}`);
  exact(run(`merge pr, url: ${url}`), `gh pr merge ${url}`);
  withheld(run(`merge the pr that depends on ${url}`), 'gh pr merge <PR>', 'pr');
  for (const q of [`merge ${url}`, `squash merge ${url}`, `i want to merge ${url}`]) exact(run(q), `gh pr merge ${url}`, q);
  for (const q of ['reopen pr', 'mark pr as ready']) {
    const r = run(q);
    assert.notEqual(r.command, 'gh pr create --fill', q);
    assert.equal(r.understood, false, q);
  }
});

test('rule 2: wrappers, assignments, unknown programs, subcommands and flags are high risk', () => {
  for (const c of ['sudo ls', 'timeout 5 ls', 'env FOO=1 ls', 'nohup node server.js', 'xargs -n1 echo', 'bash -c "ls"', 'FOO=1 ls',
    'mywrap ls', 'cowsay hi', 'git filter-branch', 'npx cowsay', 'npx wrangler delete', 'gh pr close 3', 'docker compose rm -f',
    'gh pr merge 12 --admin', 'git push --force-with-lease', 'rm -P f', 'ls --hyperlink=always', 'ssh host uptime', 'git -C /x status']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', `${c}: ${d.warnings.join('; ')}`);
    assert.ok(allowlistProblems(c).length > 0, c);
  }
  // known commands and flags: no allowlist problem (option clusters and attached numbers included)
  for (const c of ['ls -la', 'ls -lah /tmp', 'git status', 'git push origin main', 'tail -n5 f.txt', 'gh pr merge 12 --repo a/b --delete-branch',
    'npx wrangler deploy --dry-run --env staging', 'docker compose up -d', 'env | sort', 'ssh -N -L 8080:localhost:8080 example.com',
    'find /tmp -type f -iname "*.log" -mtime -3', 'grep -rn --include="*.js" -- TODO src', 'npm ci', 'node --version']) {
    assert.deepEqual(allowlistProblems(c), [], c);
  }
  // the allowlist only escalates: a deny rule still fires on a known command
  assert.equal(checkDanger('rm -rf /').critical, true);
});

test('rule 2: every catalog command is on the allowlist (only its sudo, bash -c and xargs wrappers and the substitution of a high-risk intent escalate)', async () => {
  const { INTENTS } = await import('../src/catalog.js');
  const { buildCommand } = await import('../src/fill.js');
  const V = { path: 'dir', file: 'f.txt', src: 'a.txt', dst: 'b.txt', dest: 'd', archive: 'x.tar.gz', count: 5, depth: 2, size: '10M',
    age: '-mtime -3', days: 3, port: 8080, pid: 1234, mode: '755', var: 'FOO', name: 'foo', service: 'nginx', container: 'web', pkg: 'htop',
    cmd: 'node', branch: 'dev', user: 'bob', pattern: 'err', host: 'example.com', target: 'example.com', message: 'msg', url: 'https://x.org/r.git',
    text: 'hi', ext: 'log', old: 'a', new: 'b', start: 1, end: 5, num: 7, pr: '12', repo: 'a/b', wenv: 'staging', dryrun: '--dry-run', script: 'dev' };
  const bad = [];
  for (const it of INTENTS) {
    for (const env of [BASH, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'fish', os: 'linux' }, { shell: 'powershell', os: 'win32' }, { shell: 'cmd', os: 'win32' }]) {
      const r = buildCommand(it.id, '', { env, resolved: { ...V } });
      if (!r.command) continue;
      const p = allowlistProblems(r.command).filter((m) => !/^runs another command through a wrapper \((?:sudo|bash|xargs)\)/.test(m)
        && !(it.risk === 'high' && /^runs a command substitution/.test(m)));
      if (p.length) bad.push(`${it.id}/${env.shell}: ${r.command} -> ${p.join('; ')}`);
    }
  }
  assert.deepEqual(bad, []);
});

test('a literal gh command keeps its pull request (the subcommand word is not a selector)', () => {
  for (const [q, cmd] of [['gh pr view 42', 'gh pr view 42'], ['gh pr merge 118', 'gh pr merge 118'], ['odpal gh pr merge 118', 'gh pr merge 118'],
    ['gh pr checks 7', 'gh pr checks 7'], ['gh pr view', 'gh pr view'], ['gh pr merge', 'gh pr merge']]) exact(run(q), cmd, q);
});
