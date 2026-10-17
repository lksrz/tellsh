// strict_cover.js / strict_values.js (docs/ir_error_taxonomy_v2.md F1, F5, F6, F8, F13): cue -> required /
// forbidden element, value-span integrity and glob shapes. Items run decompile(command) -> lift -> gate.
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

test('F1: rg --files needs an ignored / rg cue', () => {
  no('list json files in packages/api', "rg --files -g '*.json' packages/api", /files_list/);
  ok('list json files in packages/api, respecting gitignore', "rg --files -g '*.json' packages/api");
});

test('F5: cue words need their mod', () => {
  no('check that factory.json lines sort numerically in reverse', 'sort -r factory.json', /sort_numeric/);
  ok('check that factory.json lines sort numerically in reverse', 'sort -n -r factory.json');
  no('print adjacent duplicated lines in app.log', 'uniq app.log', /uniq_repeated/);
  ok('print adjacent duplicated lines in app.log', 'uniq -d app.log');
  no('collapse adjacent duplicate lines in app.log', 'uniq -d app.log', /uniq_collapse/);
  no('the log of go.mod with relative dates', 'git log --date=short -- go.mod', /log_relative/);
  ok('the log of go.mod with relative dates', 'git log --date=relative -- go.mod');
  no('which name is in producer.json? raw please', "jq '.name' producer.json", /jq_raw/);
  no('just the response headers for https://example.com', 'curl -g -i https://example.com', /curl_head_only/);
  no('remote branches', 'git branch -a', /branch_remote/);
  ok('remote branches', 'git branch -r');
  no('one per line, hidden, for docs', 'ls -A docs', /ls_one_per_line/);
});

test('F5: "ends with" needs $ and no ^', () => {
  no('lines that end with ECONNRESET in gc.log', 'rg ECONNRESET gc.log', /anchor_end/);
  ok('lines that end with ECONNRESET in gc.log', "rg 'ECONNRESET$' gc.log");
});

test('F6: request words and possessives are not values', () => {
  no('long hidden listing of the cwd', 'ls -lA cwd', /scope word/);
  no('word level diff of my unstaged edits in migrations', 'git diff --word-diff unstaged -- migrations', /generic word|request word|unstaged/);
  no("alice's commits", "git log --author=alice\\'s", /possessive|alice/);
});

test('F8: glob / exclude shapes', () => {
  no('grep legacyMode everywhere except CHANGELOG.md', 'grep -r --exclude-dir=CHANGELOG.md legacyMode .', /is a file/);
  no('files over 10mb outside of .git', "find . -type f -not -name '.git' -size +10485760c", /exclude_dir/);
});

test('implied only_matching before wc -l', () => {
  ok('how many times does Log::error show up in laravel.log', 'rg -o Log::error laravel.log | wc -l');
  no('most common error lines in app.log', 'rg -o error app.log | sort | uniq -c | sort -rn', /only_matching|unrequested/);
});

test('find_any_type: "anything / any entry named X" is any type, unless files or a size filter', () => {
  no('anything named build.gradle under the repo', "find . -type f -name 'build.gradle'", /find_any_type/);
  ok('anything named build.gradle under the repo', "find . -name 'build.gradle'");
  ok('any entry or file named build.gradle under the repo', "find . -type f -name 'build.gradle'");
  ok('anything over 10mb in dist', 'find dist -type f -size +10485760c');
});

test('wc_units: every unit named in a list / "<unit> count" needs its flag', () => {
  no('word and line counts for yarn.lock', 'wc -l yarn.lock', /wc_units/);
  no('word and line counts for yarn.lock', 'wc -w yarn.lock', /wc_units|count_kind/);
  ok('word and line counts for yarn.lock', 'wc -l -w yarn.lock');
  no('count words, lines and bytes of a.txt', 'wc -l -w a.txt', /wc_units/);
  ok('count words, lines and bytes of a.txt', 'wc -l -w -c a.txt');
  no('line count and word count of a.txt', 'wc -l a.txt', /wc_units|count_kind/);
});
