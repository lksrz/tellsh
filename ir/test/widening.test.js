// Regression tests for the gate widening (too-narrow lexicons found on the haiku100k synthetic set):
// each block accepts the newly covered phrasing and keeps the nearby wrong / ambiguous case rejected.
// Items run like the converter: decompile(command) -> lift against the request -> gate (full
// round-trip through the real compile + decompile).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas, gate, decompile, lift, normalize, parseIntPhrase } from '../lib/index.js';

const schemas = loadSchemas();
function check(request, command) {
  const env = { schemas, shell: 'bash', platform: 'linux_gnu', request };
  const d = decompile(command, env);
  assert.ok(!d.error, `decompile ${command}: ${d.error}`);
  let ir;
  try { ir = lift(schemas, d.ir, request); } catch (e) { return { accept: false, label: 'provenance', reasons: [e.message] }; }
  return gate(request, ir, env);
}
const ok = (request, command) => {
  const r = check(request, command);
  assert.equal(r.accept, true, `${request} -> ${command}: ${r.reasons.join(' / ')}`);
};
const no = (request, command, re, label) => {
  const r = check(request, command);
  assert.equal(r.accept, false, `expected a reject: ${request} -> ${command}`);
  if (re) assert.match(r.reasons.join(' / '), re);
  if (label) assert.equal(r.label, label);
};

test('head/tail -c and count-less head/tail explain LIMIT; direction still checked', () => {
  ok('first 100 bytes of Cargo.lock', 'head -c 100 Cargo.lock');
  ok('last 512 bytes of trace.log', 'tail -c 512 trace.log');
  ok('peek at the opening 2048 bytes of dump.bin', 'head -c 2048 dump.bin');
  ok('the first lines of app.log', 'head app.log');
  no('last 100 bytes of dump.bin', 'head -c 100 dump.bin', /direction/);
});

test('"per file" / "each file" / "every file" need a per-file result', () => {
  ok('count matching lines per file for FIXME in lib', 'rg -c FIXME lib');
  ok('count occurrences per file of Animated in src', 'rg --count-matches Animated src');
  ok('line count of every file in db/migrate', 'find db/migrate -type f -exec wc -l -- {} +');
  ok('line count for each file that has render_async in it', "rg -l -0 render_async . | xargs -0 -r wc -l --");
  ok('every file under experiments', 'find experiments -type f');
  ok('3 matches per file of panic under crates', 'rg -m 3 panic crates');
  no('count lines matching TODO per file in src', 'rg TODO src | wc -l', /PER_FILE/);
});

test('a sort stage explains "sort" / "sorted"; "oldest first" does not explain a plain sort', () => {
  ok('sort fonts.txt', 'sort fonts.txt');
  ok('unique sorted lines of src/config.yaml', 'sort -u src/config.yaml');
  ok('files mentioning TODO, sorted and deduped', 'rg -l TODO . | sort -u');
  no('names.txt oldest first', 'sort names.txt', /REVERSE/);
});

test('extension words: new single extensions and compound ones; multi-extension languages stay ambiguous', () => {
  ok('parquet files under warehouse', "find warehouse -type f -name '*.parquet'");
  ok('jquery in packages/dashboard, skipping min.js files', "rg -g '!*.min.js' jquery packages/dashboard");
  ok('line counts of blade files under resources/views', "find resources/views -type f -name '*.blade.php' -exec wc -l -- {} +");
  ok('line count of rst files whose names end in .rst under docs', "find docs -type f -name '*.rst' -exec wc -l -- {} +");
  no('markdown files in docs', "find docs -type f -name '*.md'", /Glob/);
  assert.equal(normalize('ext_glob', 'min.js').value, '*.min.js');
  assert.equal(normalize('ext_glob', 'd.ts').value, '*.d.ts');
  assert.equal(normalize('ext_glob', 'app.js').ok, false);
});

test('count kinds: byte/character singulars, commits and branches; bare counts stay ambiguous', () => {
  ok('byte count of dist/bundle.js', 'wc -c dist/bundle.js');
  ok('character count of CHANGELOG.md', 'wc -m CHANGELOG.md');
  ok('how many commits by alice', 'git log --oneline --author=alice | wc -l');
  ok('how many remote branches', 'git branch -r | wc -l');
  ok('total lines across every file in config', 'find config -type f -exec wc -l -- {} +');
  no('how many commits by alice', 'git log --author=alice | wc -l', /count_kind/);
  no('how many TODO in src', 'rg TODO src | wc -l', /count_kind/, 'ambiguous');
  no('lines in src/main.c', 'wc -l src/main.c', /COUNT/);
});

test('NEG cues: leave out / outside / non- / no-less contractions / have no', () => {
  ok('list files that mention useEffect but leave out node_modules', "rg -l -g '!node_modules' useEffect .");
  ok('FIXME outside of third_party', "rg -g '!third_party' FIXME .");
  ok('non-merge commits from the past 2 weeks', "git log --no-merges --since='2 weeks ago'");
  ok('no merges on feature/parser-fix', 'git log --no-merges feature/parser-fix --');
  ok('files in docs that arent md', "find docs -type f -not -name '*.md'");
  ok('list files under lib that have no TODO in them', 'rg --files-without-match TODO lib');
  ok('dont forget the lint:ci script', 'npm run lint:ci');
  no('search for TODO in src, leave out vendor', 'rg TODO src', /NEG cue "leave out"/);
  no('non-merge commits from the past 2 weeks', "git log --since='2 weeks ago'", /NEG cue/);
});

test('a NEG window continues over a coordination, not into a new clause', () => {
  ok('skip node_modules and target when searching for deprecated', "rg -g '!node_modules' -g '!target' deprecated .");
  ok('json files in ., skip .git and node_modules', "find . -type d \\( -name .git -o -name node_modules \\) -prune -o -type f -name '*.json' -print");
  no('skip tests and search docs for TODO', "rg -g '!tests' -g '!docs' TODO .", /negation_scope/);
});

test('bound phrases are explained only by their mod', () => {
  ok('branches not merged into main', 'git branch --no-merged main');
  no('branches not merged into main', 'git branch --merged main');
  ok('show commit abc1234 without the patch', 'git show -s abc1234 --');
  no('show commit abc1234 without the patch', 'git show abc1234 --', /without the patch/);
  ok('skip 20 commits on develop', 'git log --skip=20 develop --');
  ok('count occurrences of Cache in app.ts, not just lines', 'rg --count-matches Cache app.ts');
  // over a directory --count-matches prints one count per file, not the total asked for
  no('count occurrences of Cache in app, not just lines', 'rg --count-matches Cache app', /per_file/);
  ok('search the fixtures folder for the literal a+b, not as a regex', "rg -F 'a+b' fixtures");
  ok('first parent history oneline', 'git log --first-parent --oneline');
  no('first parent history oneline', 'git log --oneline', /first parent/);
  ok('character count, not bytes, of notes.txt', 'wc -m notes.txt');
  ok('directory entry only for /etc/ansible, not its contents', 'ls -d /etc/ansible');
  ok('find lines mentioning changelog in docs, case doesn\'t matter', 'rg -i changelog docs');
  no('find lines mentioning changelog in docs, case doesn\'t matter', 'rg changelog docs');
  ok('what is changed but not staged yet', 'git diff');
  no('what is changed but not staged yet', 'git diff --staged');
});

test('SIZE "over N", RECENCY phrases and date bounds', () => {
  ok('files over 5mb in assets', 'find assets -type f -size +5242880c -print');
  ok('commits from the last 2 weeks touching pipeline', "git log --since='2 weeks ago' -- pipeline");
  ok('Commits between 2024-01-01 and 2024-03-31.', 'git log --since=2024-01-01 --until=2024-03-31');
  ok('which files changed in the last 3 commits', 'git log -n 3 --name-only');
  ok('errors.log, only from the last 15 lines', 'tail -n 15 errors.log');
  no('errors.log, only from the last 2 days', 'tail -n 2 errors.log', /RECENCY|LIMIT/);
  ok('files last modified more than 7 days ago in cache', 'find cache -type f -mtime +7');
});

test('LONG_FORMAT / HUMAN_SIZES: "long", "with sizes", human sizes imply ls -lh', () => {
  ok('long list of content/guide with sizes in human form', 'ls -lh content/guide');
  ok('human sizes for storage/app', 'ls -lh storage/app');
  ok('long hidden listing of ~/projects/app/log', 'ls -lA ~/projects/app/log');
  no('list storage/app', 'ls -l storage/app', /LONG_FORMAT/);
  no('is app.php long? how many lines', 'wc -l app.php', /"long"/);
});

test('LISTEN, WHOLE_LINE, WORD phrases; "the word X" stays a plain match', () => {
  ok('port 5432 listeners only', 'lsof -nP -iTCP:5432 -sTCP:LISTEN');
  ok('lines that are exactly READY in status.txt', 'rg -x READY status.txt');
  ok('whole-word cat in docs', 'rg -w cat docs');
  no('lines with the word fetch in web', 'rg -w fetch web', /WORD/);
  ok('lines with the word fetch in web', 'rg fetch web');
});

test('sort by time: "oldest first", "newest", "time order"', () => {
  ok('oldest first long listing of logs', 'ls -ltr logs');
  ok('three newest entries in tmp', 'ls -t tmp | head -n 3');
  ok('branches sorted by newest commit', 'git branch --sort=-committerdate');
  ok('newest 25 commits touching internal/store', 'git log -n 25 -- internal/store');
  no('oldest first in log', 'ls -t log', /sort_direction|REVERSE/);
  no('newest lines of names.txt', 'sort names.txt', /newest/);
});

test('depth phrases: npm ls --depth, "levels deep", "at most N levels", "no deeper than"', () => {
  ok('dependency tree two levels deep', 'npm ls --depth=2');
  ok('list only the top level deps', 'npm ls --depth=0');
  ok('top level dependency list', 'npm ls --depth=0');
  ok('md files at most two levels deep under packages', "find packages -maxdepth 2 -type f -name '*.md'");
  ok('files no deeper than 2 levels in configs', 'find configs -maxdepth 2 -type f');
  no('files at the top level of src', 'find src -type f', /top level/);
});

test('git branch: -a/-r combine with -v and --merged; --show-current stays alone', () => {
  ok('all branches verbose', 'git branch -a -v');
  ok('remote branches merged into origin/main', 'git branch -r --merged origin/main');
  ok('list all branches with their last commit', 'git branch -a -v');
  no('all branches and the current one', 'git branch -a --show-current', /at most one/);
});

test('possessive author names, jq index phrases, "thousand"', () => {
  ok("bob's commits in the last 3 days", "git log --author=bob --since='3 days ago'");
  ok("Jane Doe's commits following only the first parent", "git log --author='Jane Doe' --first-parent");
  ok('item at index 0 of results in out/run.json', "jq '.results[0]' out/run.json");
  ok('element at index 5 in migrations.json', "jq '.[5]' migrations.json");
  ok('first thousand lines of app.log', 'head -n 1000 app.log');
  assert.equal(normalize('possessive', "carol's").value, 'carol');
  assert.equal(normalize('possessive', 'carol').ok, false);
  assert.equal(normalize('jq_path', 'samples index 5').value, '.samples[5]');
  assert.equal(normalize('jq_path', 'index two').value, '.[2]');
  assert.equal(normalize('jq_path', 'author name').ok, false);
  assert.equal(parseIntPhrase('a thousand'), 1000);
});

test('audit r1: newly accepted wrong items are rejected', () => {
  no('byte size of packages/core/dist/index.js, just the number please', 'wc -c packages/core/dist/index.js');
  no('sort tags.txt and show the ones repeated, ignoring case', 'sort tags.txt | uniq -d -i');
  no('list packages to depth 3 under @types/node', 'npm ls --depth=3 @types/node');
  no('ERROR in app logs without line numbers', 'rg -N ERROR logs');
  no('log files in ./logs, plain names with .log', "find ./logs -type f -name '*.log'");
  no('config files not touched in more than 30 days', 'find config -type f -mtime +30');
  no('beta in the release notes folder, no line numbers', "rg -N beta 'release notes'");
  no('long list of dotfiles in ~/', 'ls -lA ~/');
  no('how many local branches are merged into main', 'git branch --merged=main | wc -l');
  no('just the dirs one level deep under static', 'find static -maxdepth 1 -type d');
  no('list directories one level deep under src', 'find src -maxdepth 1 -type d');
  no('directories one level under ~/projects', 'find ~/projects -maxdepth 1 -type d');
  no('case insensitive jdbc url in properties files', "rg -i -g '*.properties' 'jdbc url' .");
});

test('audit r1: nearby correct items still pass', () => {
  ok('show dependencies down to depth twelve', 'npm ls --depth=12');
  ok('long list including dotfiles in ~/', 'ls -lA ~/');
  ok('find TODO in src without line numbers', 'rg -N TODO src');
});
