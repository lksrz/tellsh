// docs/ir_error_taxonomy_v5.md "v5 round 2 (dev4)": context direction, "X in the name" globs, per-file line counts,
// implied --oneline before a grep. Items run decompile(command) -> lift -> gate, like v5_fixes.test.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas, gate, decompile, lift } from '../lib/index.js';
import { requestImpliesPipedOneline } from '../lib/compile.js';
import { contextDirection, nameContains, nameCues, requestWantsFileLineCounts } from '../lib/strict_v5r2.js';

const schemas = loadSchemas();
function check(request, command) {
  const env = { schemas, shell: 'bash', platform: 'linux_gnu', request };
  const d = decompile(command, env);
  assert.ok(!d.error, `decompile ${command}: ${d.error}`);
  let ir;
  try { ir = lift(schemas, d.ir, request); } catch (e) { return { accept: false, reasons: [e.message] }; }
  return gate(request, ir, env);
}
const ok = (request, command, want) => {
  const r = check(request, command);
  assert.equal(r.accept, true, `${request} -> ${command}: ${r.reasons.join(' / ')}`);
  if (want) assert.equal(r.command, want);
};
const notRule = (request, command, re) => {
  const r = check(request, command);
  assert.doesNotMatch(r.accept ? '' : r.reasons.join(' / '), re, `${request} -> ${command}`);
};
const no = (request, command, re) => {
  const r = check(request, command);
  assert.equal(r.accept, false, `expected a reject: ${request} -> ${command}`);
  assert.match(r.reasons.join(' / '), re);
};

test('r2 fix 1: context direction (-A / -B / -C)', () => {
  const q = 'lines with ctx.Done in .go files under third_party, with line numbers and one line of trailing context';
  no(q, "rg -F -n -C 1 -g '*.go' ctx.Done third_party", /context_dir/);
  ok(q, "rg -F -n -A 1 -g '*.go' ctx.Done third_party");
  assert.equal(contextDirection('TODO in src with 2 lines after each match'), 'after');
  no('TODO in src with 2 lines of leading context', 'rg -C 2 TODO src', /context_dir/);
  no('TODO in src with 2 lines of context', 'rg -A 2 TODO src', /mod_words|context_dir/); // mod_words fires first
  ok('TODO in src with 2 lines of context', 'rg -C 2 TODO src');
  // both sides named, or no cue: never this rule
  notRule('three lines before and one after panic in crash.txt', 'rg -B 3 -A 1 panic crash.txt', /context_dir/);
  notRule('2 lines before and after TODO in src', 'rg -C 2 TODO src', /context_dir/);
  notRule('TODO in src, 2 lines after', 'rg -A 2 TODO src', /context_dir/);
  assert.equal(contextDirection('lines around the match'), 'both');
  assert.equal(contextDirection('3 lines after each hit and 1 before'), null);
  assert.equal(contextDirection('TODO in src'), null);
});

test('r2 fix 2: "X in the name" needs *X*', () => {
  const q = 'which files under frontend/src/views mention setTimeout, leaving out anything with test in the name? just the paths';
  no(q, "rg -l -g '!test' setTimeout frontend/src/views", /name_contains/);
  ok(q, "rg -l -g '!*test*' setTimeout frontend/src/views");
  no('files in notebooks with eval in the name', "find notebooks -type f -name 'eval'", /name_contains/);
  ok('files in notebooks with eval in the name', "find notebooks -type f -name '*eval*'");
  no('files named like retry under src', "find src -type f -name 'retry'", /name_contains/);
  // an extension or a glob, or no name cue: never this rule
  notRule('files with test in the name', "find . -type f -name 'test.py'", /name_contains/);
  notRule('setTimeout in views, skip the test dir', "rg -l -g '!test' setTimeout views", /name_contains/);
  assert.deepEqual(nameContains('anything with "spec" in its name'), ['spec']);
  assert.deepEqual(nameContains('files whose name contains draft'), ['draft']);
  assert.deepEqual(nameContains('files in src'), []);
});

test('r2 fix 3: line count of each matching file is xargs wc -l, not -c', () => {
  no('for everything in bench with FIXME in it, line count per file', 'rg -c FIXME bench', /file_line_counts/);
  ok('for everything in bench with FIXME in it, line count per file', 'rg -l -0 FIXME bench | xargs -0 -r wc -l --');
  no('line count per file for files with WARNING in var/log/nginx', 'rg -c WARNING var/log/nginx', /file_line_counts/);
  no('line counts of every file that mentions setTimeout', 'rg -c setTimeout .', /file_line_counts/);
  // match counts: -c stays
  notRule('count lines per file under backend/app/models where the regex user_[0-9]+ matches', "rg -c 'user_[0-9]+' backend/app/models", /file_line_counts/);
  notRule('show matching line counts per file for the whole word err in packages/worker', 'rg -w -c err packages/worker', /file_line_counts/);
  notRule('per-file line counts for invalid token, ignoring case', "rg -c -i 'invalid token' .", /file_line_counts/);
  notRule('how many lines match TODO per file in src', 'rg -c TODO src', /file_line_counts/);
  assert.equal(requestWantsFileLineCounts('line counts of the matching files for tokio'), true);
  assert.equal(requestWantsFileLineCounts('count matching lines per file for null'), false);
});

test('r2 fix 4: git log piped into grep for commits is --oneline', () => {
  ok('commit lines by judy from the last 2 days, grep for refactor', "git log --author=judy --since='2 days ago' | grep refactor",
    "git log --oneline --author=judy --since='2 days ago' | grep refactor");
  ok('grep the git log for fixup commits', 'git log | grep fixup', 'git log --oneline | grep fixup');
  // full-log cue, singular commit, other pipes, shaped log: as predicted
  ok('lines of the git log that mention pandas', 'git log | grep pandas', 'git log | grep pandas');
  ok('grep the full commits for pandas', 'git log | grep pandas', 'git log | grep pandas');
  ok('count commits by bob', 'git log --oneline --author=bob | wc -l', 'git log --oneline --author=bob | wc -l');
  ok('first 5 commit lines by bob', 'git log --author=bob | head -n 5', 'git log --author=bob | head -n 5');
  ok('subjects of commits, grep fix', 'git log --format=%s | grep fix', 'git log --format=%s | grep fix');
  assert.equal(requestImpliesPipedOneline('is there a commit on api mentioning FIXME, grep the log'), false);
  assert.equal(requestImpliesPipedOneline('commit lines mentioning deploy'), true);
});

test('r2 review fixes: full-log grep patterns, name-cue polarity, leading / following context words', () => {
  // piped --oneline is not added when the grep pattern reads the full-log layout
  ok('grep commits for the regex ^commit', "git log | grep -E '^commit'", "git log | grep -E '^commit'");
  ok("grep commits for 'Author: alice'", "git log | grep 'Author: alice'", "git log | grep 'Author: alice'");
  assert.equal(requestImpliesPipedOneline('grep commits for the regex ^commit'), true); // the cue fires; the pattern blocks it
  // inclusion cue + exact exclusion: the bare exclusion name is fine
  ok('files in src with foo in the name except files named foo', "find src -type f -name '*foo*' -not -name foo");
  // an inclusion cue does not constrain an exclusion glob, and vice versa
  notRule('files in src with foo in the name, skip build', "find src -type f -name '*foo*' -not -name build", /name_contains/);
  no('files in src except those with foo in the name', "find src -type f -not -name foo", /name_contains/);
  assert.deepEqual(nameCues('files in src except those with foo in the name'), [{ x: 'foo', neg: true }]);
  // context words: leading / preceding -> -B, following / trailing / subsequent -> -A
  ok('TODO in src with 2 lines of leading context', 'rg -B 2 TODO src');
  ok('TODO in src with 2 lines of following context', 'rg -A 2 TODO src');
  ok('TODO in src with 2 lines of trailing context', 'rg -A 2 TODO src');
  ok('TODO in src with 2 lines of preceding context', 'rg -B 2 TODO src');
  ok('grep TODO in notes.txt with 3 lines of leading context', 'grep -B 3 TODO notes.txt');
});
