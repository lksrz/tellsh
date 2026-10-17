// strict_scope.js / strict_values.js roles (docs/ir_error_taxonomy_v4.md fixes 1, 5, 6, 7, 8, 11, 12, 17).
// Items run decompile(command) -> lift -> gate.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas, gate, decompile, lift } from '../lib/index.js';

const schemas = loadSchemas();
function check(request, command) {
  const env = { schemas, shell: 'bash', platform: 'linux_gnu', request };
  const d = decompile(command, env);
  assert.ok(!d.error, `decompile ${command}: ${d.error}`);
  let ir;
  try { ir = lift(schemas, d.ir, request); } catch (e) { return { accept: false, reasons: [e.message] }; }
  return gate(request, ir, env);
}
const ok = (request, command) => {
  const r = check(request, command);
  assert.equal(r.accept, true, `${request} -> ${command}: ${r.reasons.join(' / ')}`);
};
const no = (request, command, re) => {
  const r = check(request, command);
  assert.equal(r.accept, false, `expected a reject: ${request} -> ${command}`);
  assert.match(r.reasons.join(' / '), re);
};

test('fix 1: a home phrase must reach a ~ path', () => {
  no('notes.txt anywhere in my home, max depth 4', 'find . -maxdepth 4 -name notes.txt', /home directory/);
  ok('notes.txt anywhere in my home, max depth 4', 'find ~ -maxdepth 4 -name notes.txt');
});

test('fix 8: a directory in path position must reach a path', () => {
  no('whole word ignore case viewport within e2e', 'rg -i -w viewport .', /within e2e/);
  ok('whole word ignore case viewport within e2e', 'rg -i -w viewport e2e');
  no('commits by alice touching ci', 'git log --author=alice', /touching ci/);
  ok('commits by alice touching ci', 'git log --author=alice -- ci');
  ok('commits until yesterday in fuller format', 'git log --format=fuller --until=yesterday');
  ok('count commits in the docs repo since last week, oneline', "git log --oneline --since='1 week ago' | wc -l");
});

test('fix 17: a named ref must be a rev', () => {
  no('graph of the dev branch', 'git log --graph', /ref "dev"|branch_ref/);
  ok('graph of the dev branch', 'git log --graph dev --');
  no('7 newest commits of v1.2.0 printed oldest first', 'git log -n 7 --reverse', /v1\.2\.0/);
  ok('commits whose message contains the literal v1.2.0', 'git log -F --grep=v1.2.0');
});

test('fix 7: rev / pathspec / author roles', () => {
  no('decorated oneline history of the experiments folder', 'git log --oneline --decorate experiments --', /experiments/);
  ok('decorated oneline history of the experiments folder', 'git log --oneline --decorate -- experiments');
  ok('commits on release/2.x before 2023-06-30', 'git log --until=2023-06-30 release/2.x --');
  ok('show commit a4c2 but only the message, no patch', 'git show -s a4c2 --');
  ok('count the commits renovate made in the last 30 days', "git log --oneline --author=renovate --since='30 days ago' | wc -l");
});

test('fix 6: request wording is not a path', () => {
  ok('List include with hidden entries, reverse time order.', 'ls -Atr include');
  no("list bob's files", "ls bob\\'s", /possessive/);
});

test('fix 5: npm package and script values', () => {
  no('full dependency tree', 'npm ls full', /request wording/);
  ok('show the axios and lodash.debounce entries', 'npm ls axios lodash.debounce');
});

test('fix 12: a trailing one-word pattern needs a filter lead', () => {
  ok('commits where message has both FIXME and REVIEW', 'git log --grep=FIXME --grep=REVIEW --all-match');
  ok('follow logs/worker.log by name through rotation, keep lines with retry', 'tail -F logs/worker.log | grep --line-buffered retry');
});

test('fix 11: exclude and name glob shapes', () => {
  ok('tf files outside the .terraform cache dirs', "find . -type d -name .terraform -prune -o -type f -name '*.tf' -print");
  no('the .py files under src', "find src -type f -name '.py'", /extension without a wildcard/);
  no('lines with error in logs but skip csv files', "rg -g '!csv' error logs", /extension without a wildcard/);
});
