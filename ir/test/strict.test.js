// Regression tests for the strict obligations (ir/lib/strict.js, audit r2): accepted-but-wrong answers of
// the first model are rejected, the correct neighbour is still accepted.
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

test('1. cover words need their element', () => {
  no('which merge commits have ref decorations?', 'git log --decorate', /merge/);
  ok('which merge commits have ref decorations?', 'git log --decorate --merges');
  no('dedupe ips.txt sorted', 'sort -n ips.txt', /dedupe|numeric/);
  ok('dedupe ips.txt sorted', 'sort -u ips.txt');
  // an only-matching cue: compile adds the implied -o itself (compile.js impliedOnlyMatching); v5 round 3 fix a:
  // "only the matching text" over a multi-file search also derives -I
  assert.equal(check('only the matching text order_id in json files under data/samples, first 30', "rg -g '*.json' order_id data/samples | head -n 30").command,
    "rg -o -I -g '*.json' order_id data/samples | head -n 30");
  no('branches that contain commit abc1234, with verbose info', 'git branch --contains=abc1234', /verbose/);
  no('which *test*.py files under myapp mention assertEqual', "rg -g '*test*.py' assertEqual myapp", /which files/);
  ok('which *test*.py files under myapp mention assertEqual', "rg -l -g '*test*.py' assertEqual myapp");
  no('deprecated in md files, match case', "rg -i -g '*.md' deprecated .", /match case/);
});

test('2. span integrity', () => {
  no('commit messages mentioning ORDER BY', 'git log --grep=ORDER', /all-caps/);
  ok('commit messages mentioning ORDER BY', "git log --grep='ORDER BY'");
  no("Wei Chen's commits from the last 3 days", "git log --author=Chen --since='3 days ago'", /name phrase/);
  no('commit messages matching the regex v[0-9]+ release', "git log -E --grep='v[0-9]+'", /unexplained/);
  no('how many times does sensitive = true appear in modules.tf', "rg --count-matches '= true' modules.tf", /operator/);
  no('dirs at least 2 levels below packages, no files pls', "find packages -mindepth 2 -type d -name 'pls'", /filler/);
  no('tsx files under packages/web ignoring case', "find packages/web -type f -iname 'tsx'", /extension/);
  no('list the names of files changed in commit 7ac3e91', 'git show --name-only 7ac3e91 -- commit', /git noun/);
  no('unique sorted INSERT lines in dump.sql', 'sort -u dump.sql', /INSERT/);
  no('files touched by commit deadbee', 'git log --name-only', /deadbee/);
});

test('3. unrequested mods; schema-implied defaults', () => {
  no('history of src/a.js', 'git log --oneline -- src/a.js', /oneline/);
  ok('commits mentioning fix', 'git log --oneline --grep=fix'); // --oneline is house style for a commit list
  ok('commits mentioning fix, one line each', 'git log --oneline --grep=fix');
  ok('how many commits mention fix', 'git log --oneline --grep=fix | wc -l'); // implied: piped
  no('Count the bytes in package-lock.json, please.', 'wc -w -c package-lock.json', /file.count.words/);
  no('changed in the last 15 minutes under internal/cache', 'find internal/cache -type f -mmin -15', /type=f/);
  ok('files changed in the last 15 minutes under internal/cache', 'find internal/cache -type f -mmin -15');
  ok('fetch https://example.com/a.json quietly', 'curl -g -s https://example.com/a.json'); // implied: always
  no('dedupe ips.txt sorted', 'sort -n -u ips.txt', /numeric/);
});

test('4. data-audit patterns', () => {
  no('last 5 commits', 'git log --oneline | tail -n 5', /oldest/);
  ok('last 5 commits', 'git log -n 5');
  no('most common TODO matches in src, top 3', 'rg -o TODO src | sort | uniq -c | sort -rn | head -n 3', /path:line/);
  ok('most common TODO matches in app.log, top 3', 'rg -o TODO app.log | sort | uniq -c | sort -rn | head -n 3');
  no('one line summary of commit HEAD~1', "git show --oneline 'HEAD~1' --", /patch/);
  ok('one line summary of commit HEAD~1', "git show -s --oneline 'HEAD~1' --");
  no('show my uncommitted changes', 'git diff', /git diff HEAD/);
  ok('show my uncommitted changes against HEAD', 'git diff HEAD');
  no('only hidden files in site', 'ls -A site', /hidden/);
  no('show hidden files in site', 'ls -A site', /hidden/);
  ok('show hidden files in site', "find site -maxdepth 1 -mindepth 1 -type f -name '.*'");
  ok('list site including hidden files', 'ls -A site');
  no('last 20 lines of npm test output', 'npm test | tail -n 20', /2>&1/);
  ok('last 20 lines of npm test output', 'npm test 2>&1 | tail -n 20');
  no('human sizes for coverage', 'ls -h coverage', /without -l/);
  no('how many lines does lib/parser.c have', 'wc -l lib/parser.c | wc -l', /wc after wc/);
  no('which files changed in v1.4.0', 'git diff --name-only v1.4.0 --', /one commit/);
  no('how many times does rollback appear in the migrations folder?', 'rg --count-matches rollback migrations', /per file/);
  no('how many lines in config/prod.yaml', 'sort config/prod.yaml | uniq -c | sort -rn', /frequency table/);
});

test('5. audit r3: over-strict rules relaxed', () => {
  ok('human-numeric sort of tmp/sizes.txt', 'sort -h tmp/sizes.txt');
  ok('all dirs named bin under ~/dotfiles', "find ~/dotfiles -type d -name 'bin'");
  ok('vim sessions', 'ps aux | grep vim');
  ok('count lines matching ready in each log under logs', 'rg -c ready logs');
  ok('list ~/exp_logs incl hidden files', 'ls -A ~/exp_logs');
  ok('line counts of everything under build/test-results', 'find build/test-results -type f -exec wc -l -- {} +');
  ok('which changed files have tsx in their path', 'git diff --name-only | grep tsx');
  ok('line numbers and filenames for ckpt in the runs folder', 'rg -n ckpt runs');
  ok('skip the diff for tag v2.3.0', 'git show -s v2.3.0 --');
  ok('porcelain status for my CI script', 'git status --porcelain');
  ok('is the working tree dirty', 'git status --porcelain');
  ok('top 4 most common deprecated warnings in logs/ios.log', 'rg deprecated logs/ios.log | sort | uniq -c | sort -rn | head -n 4');
  ok('is there any TODO left in the android folder', 'rg -l TODO android');
  ok('counts of each distinct line in app/out.txt', 'sort app/out.txt | uniq -c | sort -rn');
});

test('6. audit r3: dropped operands, misread roles', () => {
  no('human sizes, hidden, long for figs', 'ls -lAh', /figs/);
  no('short status for the users and orders folders', 'git status -s -- users', /second operand/);
  no('go into ./packages/web and run build script then lint script', 'cd ./packages/web && npm run build 2>&1 && npm test 2>&1', /lint/);
  no('Name and status of changes versus HEAD in Gemfile and Gemfile.lock', 'git diff --name-status HEAD Gemfile.lock -- Gemfile');
  no('which .sh scripts under packages/scripts ignoring case?', "find packages/scripts -type f -iname '.sh'", /wildcard/);
  no('dotfiles in the current directory too, one per line', 'ls -A1 dotfiles', /current/);
  no('rank the Completed lines in log/test.log by repeat count, top 3', 'sort log/test.log | uniq -c | sort -rn | head -n 3', /Completed/);
  no('count lines with uncaught in logs/api.log and logs/worker.log', 'wc -l logs/api.log logs/worker.log', /uncaught/);
  no('is nounset presnt in ~/bin/strict.sh with line numbers', 'rg -n presnt ~/bin/strict.sh', /typo/);
  no('how many lines git diff main produces', 'git diff main -- | grep produces | wc -l', /request word/);
  no('tf files ignore case in ~/infra/my stacks', "find ~/infra/my -type f -iname '*.tf'", /stacks/);
  no('first 7 lines of php files in app/Traits that use HasFactory', "rg -g '*.php' HasFactory app/Traits | head -n 7", /per file/);
  no('whch files mention drift in checks only hcl files and follow symlinks', "rg -l -g '*.hcl' -L drift .", /checks/);
  no('files changed vs main whose names contain retry', 'git diff --name-only retry --', /main/);
  no('which files changed in HEAD~1, first 3 only', "git show --name-only 'HEAD~1' -- | head -n 3", /header/);
  no('subject line of tag v3.0', 'git log --format=%s v3.0 --', /ancestors/);
  no('follow main.tf live, grep for lines that start with resource', 'tail -f main.tf | grep resource', /anchor/);
  no('files with lock in src, ignore case, include hidden', 'rg -i --hidden lock src', /which files/);
  no('kill the zombie node procs', 'pkill -x node', /zombie/);
  no('print matches as JSON lines for error in logs', 'rg error logs', /JSON/);
  no('Print deploy/apply.log backwards from the end', 'tail deploy/apply.log', /backwards/);
  no('Show the first 4 remote branches with verbose details.', 'git branch -a -v | head -n 4', /local branches first/);
  no('skip .git and vendor when listing files under src', 'find src -type d \\( -name .git -o -name vendor \\) -prune -o -print', /-type f/);
});

test('generic words are not paths; a named ref must be used', () => {
  no('unstaged changes across the whole repo', 'git diff -- repo', /generic request word/);
  ok('unstaged changes across the whole repo', 'git diff');
  no('unstaged changes only', 'git diff -- unstaged', /generic request word/);
  ok('files under repo, max depth 2', 'find repo -maxdepth 2 -type f');
  ok('word diff of the folder named changes', 'git diff --word-diff -- changes');
  no('last 5 commits on develop', 'git log -n 5', /names a ref/);
  ok('last 5 commits on develop', 'git log -n 5 develop');
  no('commits from main touching src', 'git log -- src', /names a ref/);
  ok('commits from main touching src', 'git log main -- src');
  ok('commits from release/2.3 touching src', 'git log release/2.3 -- src');
  ok('last 5 commits on the dev server logs', 'git log -n 5');
});

test('WP3 (v4 taxonomy): stopword path exemption, case negation, format author, curl -s', () => {
  no('unstaged file names', 'git diff --name-only -- unstaged', /generic request word/);
  ok('search TODO in src, not case sensitive', 'rg -i TODO src');
  no('commits by Priya Patel since 2 weeks ago, hash author date subject', "git log --format=%s --author='Priya Patel' --since='2 weeks ago'", /author \/ date/);
  ok('log subjects where the author is Jan Kowalski', "git log --format=%s --author='Jan Kowalski'");
  ok('fetch https://example.com/a.json silently', 'curl -g -s https://example.com/a.json');
});
