// Regression tests for the v0.3 final2 review (review/final2-claude.md, review/final2-codex.md) and the structural rules
// that replace further parser patches:
//  (1) trust rule: a command is safe ONLY when it is tellsh's own render of a risk=safe catalog template with plain slot
//      values; edited, composed, history-replayed and unknown commands are at least high (--yes never runs them). The
//      parser only raises risk: it still reads $'…' quoting and sed e/w so a destructive payload stays critical.
//  (2) contested selectors: an alternative or a negation next to a selector (or / albo / lub / not / nie / oprócz /
//      except …) or two candidate values for one slot give a placeholder for that slot, never one of the candidates.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { buildCommand } from '../src/fill.js';
import { INTENTS, BY_ID } from '../src/catalog.js';
import { checkDanger, assessCommand, plainSlotValue, UNTRUSTED } from '../src/danger.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, opts = {}) => suggest(q, { env: BASH, ...opts });

// every command the two final2 reviews reported as safe
const FINAL2_DANGER = [
  // final2-claude blocker: $'…' hid the command after it
  "echo $'\\''; rm -rf ~ #'",
  "echo $'\\''; npx evil #'",
  "ls $'\\''`npx evil`'",
  // final2-claude major: find -exec runs any program
  'find . -exec ./evil {} +',
  'find . -exec bash ./evil.sh \\;',
  'find . -exec npx evil \\;',
  // final2-claude major: . and source run any file
  '. /tmp/x',
  'source ./evil.sh',
  'source ~/.bashrc',
  // final2-claude lesser: GNU sed e
  "sed 's/a/b/e' f",
  "sed -n '1e cmd' f",
  // final2-codex major
  "sed '1e rm -r /tmp/valuable' input.txt",
  'diskutil eraseDisk APFS New disk2',
  'source ./deploy.sh',
];

test('final2: every reported command is high risk (never safe) and needs an explicit yes', () => {
  for (const c of FINAL2_DANGER) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', `${c}: ${d.warnings.join('; ')}`);
  }
});

test("final2 blocker: $'…' is parsed as bash does, so the command after it is seen (rm -rf ~ stays critical)", () => {
  const d = assessCommand("echo $'\\''; rm -rf ~ #'");
  assert.equal(d.risk, 'high');
  assert.equal(d.critical, true, d.warnings.join('; '));
  assert.ok(assessCommand("echo $'\\''; npx evil #'").warnings.some((m) => /npx evil|unknown subcommand/.test(m)));
  assert.ok(assessCommand("ls $'\\''`npx evil`'").warnings.some((m) => /substitution/.test(m)));
  // a closed $'…' with no escape is still one word
  assert.equal(assessCommand("echo $'a b'").critical, false);
});

test('final2 lesser: the parser flags sed scripts that run a command or write a file', () => {
  for (const c of ["sed 's/a/b/e' f", "sed -n '1e cmd' f", "sed 'w out' f", "sed -e 's/a/b/w x' f", 'sed -f script.sed f']) {
    assert.ok(assessCommand(c).warnings.some((m) => /^sed /.test(m)), c);
  }
  for (const c of ["sed -n '120,180p' f", "sed 's/e/w/g' f", "sed '/we/d' f", "readlink /etc/localtime | sed 's#.*/zoneinfo/##'"]) {
    assert.ok(!assessCommand(c).warnings.some((m) => /^sed /.test(m)), c);
  }
});

test('trust rule: any command that is not a catalog render is at least high, however harmless it looks', () => {
  for (const c of ['ls -la', 'df -h', 'git status', 'diskutil list', 'echo hi']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', c);
    assert.ok(d.warnings.includes(UNTRUSTED), c);
    // the same text vouched for as tellsh's own render is judged by the parser alone
    assert.notEqual(checkDanger(c, 'safe', { rendered: true }).risk, 'high', c);
  }
  // a catalog render does not lower a risk the parser finds
  assert.equal(checkDanger('rm -rf /', 'safe', { rendered: true }).critical, true);
});

test('trust rule: a safe catalog render is safe only with plain slot values', () => {
  assert.equal(run('show free disk space').risk, 'safe');
  assert.equal(buildCommand('count_lines', '', { env: BASH, resolved: { file: 'notes.txt' } }).risk, 'safe');
  for (const file of ['a;b.txt', "it's.txt", 'a$b', 'a`b`', 'a|b', 'a>b', 'a\nb', 'x’y']) {
    const r = buildCommand('count_lines', '', { env: BASH, resolved: { file } });
    assert.equal(r.risk, 'high', JSON.stringify(file));
    assert.ok(r.warnings.includes(UNTRUSTED), JSON.stringify(file));
  }
  // a path starting with - is rendered ./-x (plain); a pattern starting with - is not
  assert.equal(buildCommand('count_lines', '', { env: BASH, resolved: { file: '-x' } }).risk, 'safe');
  assert.equal(buildCommand('grep_text', '', { env: BASH, resolved: { pattern: '-e' } }).risk, 'high');
  // a program slot: never a builtin that runs a file / a string, never a path
  for (const cmd of ['source', '.', 'eval', './evil', '/tmp/evil']) {
    assert.equal(buildCommand('tool_version', '', { env: BASH, resolved: { cmd } }).risk, 'high', cmd);
  }
  assert.equal(buildCommand('tool_version', '', { env: BASH, resolved: { cmd: 'node' } }).risk, 'safe');
  assert.equal(plainSlotValue('name', 'x -exec rm {} +'), false);
  assert.equal(plainSlotValue('age', '-mtime -1', { dashOk: true }), true);
});

test('trust rule: only risk=safe catalog intents ever render safe, in every shell', () => {
  const envs = [BASH, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'fish', os: 'linux', coreutils: 'gnu' },
    { shell: 'powershell', os: 'win32' }, { shell: 'cmd', os: 'win32' }];
  for (const it of INTENTS) {
    for (const env of envs) {
      let r;
      try { r = buildCommand(it.id, '', { env, resolved: {} }); } catch { continue; }
      if (r.command && r.risk === 'safe') assert.equal(BY_ID[it.id].risk, 'safe', `${it.id} ${env.shell}`);
    }
  }
});

test('trust rule: history replays and composed commands are at least high', () => {
  const h = run('count lines in it', { history: ['cat notes.txt'], compose: 'off' });
  assert.equal(h.method, 'history-rule');
  assert.equal(h.risk, 'high');
  const same = run('same for /var', { history: ['du -sh /home'], compose: 'off' });
  assert.equal(same.command, 'du -sh /var');
  assert.equal(same.risk, 'high');
  // the same request without history is a fresh catalog render: safe
  assert.equal(run('show the size of /var').risk, 'safe');
  const c = run('list files sorted by size with human readable sizes in reverse order', { compose: 'force' });
  assert.equal(c.method, 'composed');
  assert.equal(c.risk, 'high');
});

test('final2-codex: competing selectors give a placeholder, never one of the candidates', () => {
  for (const [q, cmd, missing] of [
    ['merge pr 4 or 44', 'gh pr merge <PR>', ['pr']],
    ['deploy worker --env prod --env prodprod', 'npx wrangler deploy --env <WENV>', ['wenv']],
    ['merge pr 42 but not in repo acme/app', 'gh pr merge 42 --repo <REPO>', ['repo']],
  ]) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.deepEqual(r.missing, missing, q);
  }
});

test('contested selectors: alternatives / negations (EN, PL) and two candidates for one slot', () => {
  for (const [q, cmd] of [
    ['zmerguj pr 42 albo 43', 'gh pr merge <PR>'],
    ['merge pr 42, not 43', 'gh pr merge <PR>'],
    ['deploy worker to prod, not staging', 'npx wrangler deploy --env <WENV>'],
    ['wdróż workera na produkcję, nie na staging', 'npx wrangler deploy --env <WENV>'],
    ['deploy worker to staging and production', 'npx wrangler deploy --env <WENV>'],
    ['install axios or lodash with npm', 'npm install <PKG>'],
    ['view run 8080808, not 123', 'gh run view <NUM>'],
    // the alternative is about the repository: the pull request stays
    ['merge pr 42 --repo acme/app or --repo other/repo', 'gh pr merge 42 --repo <REPO>'],
  ]) assert.equal(run(q).command, cmd, q);
  // no alternative / negation next to a selector: unchanged
  for (const [q, cmd] of [
    ['merge pr 42', 'gh pr merge 42'],
    ['npm install axios', 'npm install axios'],
    ['deploy worker to production', 'npx wrangler deploy --env production'],
    ['deploy worker to prod without a dry run', 'npx wrangler deploy --env prod'],
    ['co poszło nie tak w runie pipeline 8080808', 'gh run view 8080808'],
    ['why is run 8080808 not passing', 'gh run view 8080808'],
  ]) assert.equal(run(q).command, cmd, q);
});

test('a negated branch delete is no --delete-branch; a withheld run number is a placeholder, never dropped', () => {
  for (const q of ["merge pr 42 and don't delete the branch", 'zmerguj pr 42 i nie usuwaj brancha', 'merge pr 42 without deleting the branch']) {
    assert.equal(run(q).command, 'gh pr merge 42', q);
  }
  assert.equal(run('merge pr 42 and delete the branch').command, 'gh pr merge 42 --delete-branch');
  // was `gh run view` (the withheld `?` dropped the optional run number)
  assert.equal(run('view run 8080808 2').command, 'gh run view <NUM>');
});
