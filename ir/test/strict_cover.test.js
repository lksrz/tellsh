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

// docs/ir_error_taxonomy_v4.md fixes 4, 5, 9, 18 (WP1)
test('v4 fix 4: uniq -d / -u / collapse', () => {
  no('list consecutive duplicate lines in cron.log', 'uniq cron.log', /uniq_dup_noun/);
  ok('list consecutive duplicate lines in cron.log', 'uniq -d cron.log');
  no('adjacent lines appearing once in variables.tf', 'uniq variables.tf', /uniq_unique/);
  ok('adjacent lines appearing once in variables.tf', 'uniq -u variables.tf');
  no('list each line in db/schema.rb once, collapsing adjacent duplicates', 'uniq -d db/schema.rb', /uniq_collapse/);
  ok('list each line in db/schema.rb once, collapsing adjacent duplicates', 'uniq db/schema.rb');
  no('list repeated lines of queue/jobs.txt, adjacent only', 'uniq queue/jobs.txt | uniq -d', /uniq_twice/);
});

test('v4 fix 5: npm scripts list is npm run', () => {
  no('get me the list of package scripts', 'npm ls', /npm_scripts/);
  no('list the package scripts, nothing else', 'npm ls scripts', /npm_scripts|package/);
  ok('get me the list of package scripts', 'npm run');
  ok('run format then coverage npm scripts', 'npm run format && npm run coverage');
});

test('v4 fix 9: git log formats and dates', () => {
  no('subject-only log of the last 25 commits on chore/deps', "git log --format='%h %s' -n 25 chore/deps --", /log_subject_only/);
  ok('subject-only log of the last 25 commits on chore/deps', 'git log --format=%s -n 25 chore/deps --');
  no('hash plus subject for commits on feature/login-form', 'git log --format=%s feature/login-form --', /log_hash_subject/);
  ok('hash plus subject for commits on feature/login-form', "git log --format='%h %s' feature/login-form --");
  no('commits older than 2024-01-01', 'git log --since=2024-01-01', /log_until/);
  ok('commits older than 2024-01-01', 'git log --until=2024-01-01');
  no('short dates for the last 5 commits', 'git log -n 5', /log_short_date/);
  ok('short dates for the last 5 commits', 'git log --date=short -n 5');
  no('Full patches for commits by frank', 'git log --author=frank', /log_patch/);
  ok('Full patches for commits by frank', 'git log --author=frank -p');
});

test('v4 fix 9: git diff / branch / message cues', () => {
  no('word-level changes in application.yml not staged', 'git diff -- application.yml', /word_diff/);
  ok('word-level changes in application.yml not staged', 'git diff --word-diff -- application.yml');
  no('name-status of the index under docs/guides', 'git diff --name-status -- docs/guides', /diff_staged/);
  ok('name-status of the index under docs/guides', 'git diff --staged --name-status -- docs/guides');
  no('remote-tracking branches with commit info, please', 'git branch -r', /branch_verbose/);
  ok('remote-tracking branches with commit info, please', 'git branch -r -v');
  no('remote branches that include v3.4.1', 'git branch --contains=v3.4.1', /branch_all|remotes/);
  ok('count local branches, no remotes', 'git branch | wc -l');
  no('branches merged into develop', 'git branch', /branch_merged/);
  ok('branches merged into develop', 'git branch --merged=develop');
  no('commits matching both refactor and spec', 'git log --grep=refactor --grep=spec', /all_match/);
  no("commits whose message doesn't contain merge", 'git log --grep=merge', /invert_grep|polarity/);
  ok("commits whose message doesn't contain merge", 'git log --grep=merge --invert-grep');
  no('what changed in v2.0 relative to main', 'git show v2.0 --', /show_vs|unexplained/);
});

test('v4 fix 18: sort / wc / tail / find / ls cues', () => {
  no('sort names.txt, keep duplicates', 'sort -u names.txt', /sort_keep_dups/);
  ok('sort names.txt, keep duplicates', 'sort names.txt');
  no('sort ids.txt with duplicates removed', 'sort ids.txt', /sort_dedupe/);
  ok('sort ids.txt with duplicates removed', 'sort -u ids.txt');
  no('count the words in notes.md', 'wc -l -w notes.md', /wc_words/);
  ok('count the words in notes.md', 'wc -w notes.md');
  no('count lines, words, and bytes of a.txt', 'wc -l -w a.txt', /wc_units/);
  no('follow app.log even when it gets rotated', 'tail -f app.log', /tail_retry/);
  ok('follow app.log even when it gets rotated', 'tail -F app.log');
  no('files 2 or more levels deep in src', 'find src -maxdepth 2 -type f', /find_min_depth/);
  ok('files 2 or more levels deep in src', 'find src -mindepth 2 -type f');
  no('files in out, at most 2 levels deep', 'find out -mindepth 2 -type f', /find_max_depth/);
  ok('files in out, at most 2 levels deep', 'find out -maxdepth 2 -type f');
  no('files smaller than 10k in dist', 'find dist -type f -size +10240c', /find_size_sign/);
  ok('files smaller than 10k in dist', 'find dist -type f -size -10240c');
  no('folders in src, leaving out node_modules dirs', 'find src -type d -name node_modules -prune -o -print', /find_dirs/);
  no('only the dir entry for logs, no contents', 'ls logs', /ls_itself/);
  ok('only the dir entry for logs, no contents', 'ls -d logs');
});

test('v4 fix 18: grep context, case, head bytes, anchors', () => {
  no('2 lines after each TODO in a.py', 'rg -C 2 TODO a.py', /search_context/);
  ok('2 lines after each TODO in a.py', 'rg -A 2 TODO a.py');
  no('2 lines before and after panic in crash.txt', 'rg -A 2 panic crash.txt', /search_context/);
  ok('three lines before and one after panic in crash.txt', 'rg -B 3 -A 1 panic crash.txt');
  no('TODO in src, ignoring case', 'rg -s TODO src', /search_ignore_case/);
  ok('TODO in src, ignoring case', 'rg -i TODO src');
  no('first 200 bytes of notes.md', 'head -n 200 notes.md', /head_bytes/);
  ok('first 200 bytes of notes.md', 'head -c 200 notes.md');
  no('commits whose message starts with WIP, by wendy', 'git log --author=wendy --grep=WIP', /anchor_start/);
  ok('commits whose message starts with WIP, by wendy', "git log -E --author=wendy --grep='^WIP'");
  no('lines with error in app.log', "rg '^error' app.log", /anchor_cue/);
  ok('lines with error in app.log', 'rg error app.log');
});

test('v4 fix 18: curl and jq phrases', () => {
  no('fetch https://example.com, include the response headers', 'curl -g https://example.com', /curl_include_headers|HEADERS/);
  ok('fetch https://example.com, include the response headers', 'curl -g -i https://example.com');
  no('fetch https://example.com, bail on http errors', 'curl -g https://example.com', /curl_fail/);
  no('the name in package.json as text', "jq '.name' package.json", /jq_raw/);
  ok('the name in package.json as text', "jq -r '.name' package.json");
  no('the name in package.json as json', "jq -r '.name' package.json", /jq_json/);
});
