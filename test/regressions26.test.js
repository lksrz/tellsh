// Regression tests for the v0.3 final review (review/final-claude.md, review/final-codex.md):
//  (1) a command substitution `$(…)` / `` `…` `` anywhere outside '…' (also inside "…") and a process substitution
//      `<(…)` / `>(…)` are high risk: the allowlist cannot see the command they run
//  (2) only allowlisted programs are safe: an unknown executable (`7z`, a dot-file, a path) is high, with no exemption
//      for words that look like a piece of a PowerShell expression
//  (3) an explicit wrangler `--env` keeps the other words nothing explains as `<ARGS>`, never drops them
//  (4) competing repositories for gh (two `--repo`, a URL of another repository, "a/b or c/d") are withheld (`<REPO>`)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { checkDanger, allowlistProblems } from '../src/danger.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const PWSH = { shell: 'pwsh', os: 'windows' };
const run = (q, env = BASH) => suggest(q, { env });

test('major: command and process substitutions are high risk, also inside double quotes', () => {
  for (const c of ['ls "$(rm -rf ~)"', 'ls "$(npx evil)"', 'ls "$(curl x -o ~/.bashrc)"', 'ls "`rm -rf ~`"', 'ls `npx evil`',
    'echo "$(unknown-program)"', 'echo "a $(id) b"', 'cat <(npx evil)', 'ls >(tee x)', 'ls "x"$(whoami)', 'echo $(( $(id -u) + 1 ))']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', `${c}: ${d.warnings.join('; ')}`);
    assert.ok(d.warnings.some((m) => /substitution; not on the allowlist/.test(m)), `${c}: ${d.warnings.join('; ')}`);
  }
  // single-quoted text and arithmetic expansion are not substitutions
  for (const c of ["ls '$(rm -rf ~)'", "du -sh '`rm -rf ~`'", "grep -r -- '<(x)' src"]) assert.deepEqual(allowlistProblems(c), [], c);
  assert.ok(!allowlistProblems('echo $((5 + 4))').some((m) => /substitution/.test(m)));
});

test('major: an unknown executable is high risk (no expression-fragment exemption, a path is not the program)', () => {
  for (const c of ['7z x a.7z -o/tmp', '.hidden --erase', './ls', '/tmp/x/ls -la', '~/bin/ls', 'C:\\t\\ls.exe', '.\\tool.exe /q', '1password',
    '[evil]', '@evil', ',evil', '%evil%', '-evil', '*', '{evil}']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', `${c}: ${d.warnings.join('; ')}`);
  }
  // the catalog's PowerShell expressions are still read as written (they are in the allowlist)
  for (const q of ['how many files are here', 'show free memory', 'cpu cores', 'base64 encode hello']) {
    const r = run(q, PWSH);
    assert.deepEqual(allowlistProblems(r.command), [], `${q}: ${r.command}`);
  }
});

test('major: an explicit --env keeps the unexplained deploy arguments as <ARGS>', () => {
  for (const env of [BASH, PWSH]) {
    const r = run('deploy worker --env staging --config other.toml', env);
    assert.equal(r.command, 'npx wrangler deploy --env staging <ARGS>', `${env.shell}: ${r.command}`);
    assert.deepEqual(r.missing, ['args']);
  }
  // nothing unexplained: the explicit environment alone
  for (const [q, cmd] of [['deploy worker --env staging', 'npx wrangler deploy --env staging'],
    ['deploy worker --env staging --dry-run', 'npx wrangler deploy --dry-run --env staging']]) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.deepEqual(r.missing, [], q);
  }
});

test('major: competing repositories are withheld, also beside an explicit pull request', () => {
  for (const [q, cmd] of [
    ['merge pr 42 --repo acme/app or --repo other/repo', 'gh pr merge 42 --repo <REPO>'],
    ['merge pr 42 --repo acme/app --repo other/repo', 'gh pr merge 42 --repo <REPO>'],
    ['merge pr 42 in acme/app or other/repo', 'gh pr merge 42 --repo <REPO>'],
    ['merge pr acme/app#42 --repo other/repo', 'gh pr merge 42 --repo <REPO>'],
    ['merge https://github.com/acme/app/pull/42 --repo other/repo', 'gh pr merge https://github.com/acme/app/pull/42 --repo <REPO>'],
  ]) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.deepEqual(r.missing, ['repo'], q);
  }
  // one repository, however often it is named: kept
  for (const [q, cmd] of [['merge pr 42 --repo acme/app', 'gh pr merge 42 --repo acme/app'],
    ['merge https://github.com/acme/app/pull/42 --repo acme/app', 'gh pr merge https://github.com/acme/app/pull/42 --repo acme/app'],
    ['merge pr acme/app#42', 'gh pr merge 42 --repo acme/app']]) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.deepEqual(r.missing, [], q);
  }
});
