// docs/ir_error_taxonomy_v5.md: v5 round request-aware fixes (implied git log --oneline, number-word values,
// branch refs, find directory exclusions, curl URL globs, dropped file names, short dates, last-N windows).
// Items run decompile(command) -> lift -> gate, like strict_cover.test.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas, gate, decompile, lift } from '../lib/index.js';
import { requestWantsFileNames, requestImpliesOneline } from '../lib/compile.js';
import { branchRef } from '../lib/strict_cover_git.js';

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
// accepted, or rejected for some unrelated reason: never by the given rule
const notRule = (request, command, re) => {
  const r = check(request, command);
  assert.doesNotMatch(r.accept ? '' : r.reasons.join(' / '), re, `${request} -> ${command}`);
};
const no = (request, command, re) => {
  const r = check(request, command);
  assert.equal(r.accept, false, `expected a reject: ${request} -> ${command}`);
  assert.match(r.reasons.join(' / '), re);
};

test('fix 1: an unpiped git log for a commits request is --oneline', () => {
  ok('commits mentioning FIXME in the message, ignoring case, no merges', 'git log --grep=FIXME -i --no-merges',
    'git log --oneline --grep=FIXME -i --no-merges');
  ok("Jan Kowalski's non-merge commits touching admin.java", "git log --author='Jan Kowalski' --no-merges -- admin.java",
    "git log --oneline --author='Jan Kowalski' --no-merges -- admin.java");
  ok('commits mentioning FIXME', 'git log --oneline --grep=FIXME', 'git log --oneline --grep=FIXME');
  // piped, shaped, or a full-log / author / date cue: as predicted
  ok('how many commits mention FIXME', 'git log --oneline --grep=FIXME | wc -l', 'git log --oneline --grep=FIXME | wc -l');
  ok('commits mentioning FIXME with stats', 'git log --stat --grep=FIXME', 'git log --grep=FIXME --stat');
  ok('full commits mentioning FIXME', 'git log --grep=FIXME', 'git log --grep=FIXME');
  ok('the log of go.mod', 'git log -- go.mod', 'git log -- go.mod');
  assert.equal(requestImpliesOneline('commits by bob with dates'), false);
  assert.equal(requestImpliesOneline('commits with full message bodies'), false);
  assert.equal(requestImpliesOneline('how many lines of the log mention commits'), false);
  assert.equal(requestImpliesOneline('recent commits'), true);
  // review #3 / #4: singular commit, complete messages
  ok('show the last 1 commit', 'git log -n 1', 'git log -n 1');
  assert.equal(requestImpliesOneline('show the last commit'), false);
  assert.equal(requestImpliesOneline('the latest commit and the commits before it'), false);
  assert.equal(requestImpliesOneline('commits touching api.go with complete messages'), false);
  assert.equal(requestImpliesOneline('commits with their entire message'), false);
  assert.equal(requestImpliesOneline('commits mentioning FIXME in the commit message'), true);
});

test('fix 2: a number word is not a positional value', () => {
  no('fifteen levels of the dependency tree', 'npm ls fifteen', /num_word_value/);
  no('first 7 lines of a.txt b.txt c.txt, all three', 'head -n 7 a.txt b.txt c.txt three', /num_word_value/);
  ok('fifteen levels of the dependency tree', 'npm ls --depth=15');
  ok('search for seven in notes.txt', 'rg seven notes.txt'); // a search pattern is exempt
  ok('first 3 lines of chapter-seven.md', 'head -n 3 chapter-seven.md'); // part of a larger token
  // review #5 / #10: a name or a jq filter that happens to be a number word
  notRule('npm ls three', 'npm ls three', /num_word_value/);
  ok('show the dependency tree for the package three', 'npm ls three');
  ok('jq first data.json', "jq '.first' data.json");
});

test('fix 3: a named branch must reach the command', () => {
  no('commits before 2024-01-01 on the api branch', 'git log --until=2024-01-01', /branch_ref/);
  ok('commits before 2024-01-01 on the api branch', 'git log --until=2024-01-01 api --');
  ok('commits on the current branch', 'git log');
  assert.equal(branchRef(['commits', 'on', 'branch', 'api']), 'api');
  // review #2: a ref inside a path or a mod value is not carried
  no('commits on the api branch touching api.txt', 'git log -- api.txt', /branch_ref/);
  no('commits on the api branch by api', 'git log --author=api', /branch_ref/);
  ok('commits on the api branch touching api.txt', 'git log api -- api.txt');
  // review #11: adjective-ish words never count; every match is checked
  for (const w of ['wrong', 'stale', 'experimental', 'broken', 'big'])
    assert.equal(branchRef(['commits', 'on', 'the', w, 'branch'], `commits on the ${w} branch`), null, w);
  assert.equal(branchRef(['commits', 'on', 'the', 'payments', 'branch'], "commits on the 'payments' branch"), 'payments');
  assert.equal(branchRef(['commits', 'on', 'the', 'fix-42', 'branch']), 'fix-42');
  notRule('commits on the wrong branch', 'git log', /branch_ref/);
  no('diff between the main branch and the dev branch, on the dev branch', 'git diff main', /branch_ref/);
  assert.equal(branchRef(['print', 'the', 'branch', 'graph', 'of', 'the', 'last', '15', 'commits']), null);
  for (const w of ['this', 'current', 'my', 'same', 'other', 'each', 'every', 'new', 'remote', 'default', 'feature'])
    assert.equal(branchRef(['commits', 'on', 'the', w, 'branch']), null, w);
});

test('fix 4: find -not -name on a directory excludes nothing', () => {
  no('*.bak files anywhere except .idea', "find . -type f -name '*.bak' -not -name .idea", /find_dir_name/);
  no('list files under examples but skip the out folder', 'find examples -type f -not -name out', /find_dir_name/);
  // review #6 / #9: extension-less file names, "files named X", -type d
  ok('list files under examples but skip anything named out', 'find examples -type f -not -name out');
  ok('all files except files named foo', 'find . -type f -not -name foo');
  ok('all files except the files named test', 'find . -type f -not -name test');
  ok('directories matching build* except the dist folder', "find . -type d -name 'build*' -not -name dist");
  ok('*.bak files anywhere except .idea', "find . -type d -name .idea -prune -o -type f -name '*.bak' -print");
  ok('*.py files except setup.py', "find . -type f -name '*.py' -not -name setup.py");
  ok('files except the Makefile', 'find . -type f -not -name Makefile');
});

test('fix 5: curl -g keeps a URL glob literal', () => {
  no('get https://example.com/{a,b}/index pages', "curl -g 'https://example.com/{a,b}/index'", /curl_url_glob/);
  no('get https://example.com/page[1-3].html', "curl -g 'https://example.com/page[1-3].html'", /curl_url_glob/);
  ok('fetch https://example.com/{a,b} literally', "curl -g 'https://example.com/{a,b}'");
});

test('fix 6: dropped file names ask for lines, not -l', () => {
  no('use grep sorted unique KeyError lines under backend/app/models, drop the file names', 'grep -r -l KeyError backend/app/models | sort -u', /drop_names/);
  ok('use grep sorted unique KeyError lines under backend/app/models, drop the file names', 'grep -r KeyError backend/app/models | sort -u',
    'grep -r -h KeyError backend/app/models | sort -u');
  assert.equal(requestWantsFileNames('sorted lines, without the file names'), false);
  assert.equal(requestWantsFileNames('sorted lines with file names'), true);
  // review #8: path wording is scope, not a dropped name
  assert.equal(requestWantsFileNames('lines with paths, excluding paths under vendor'), true);
  notRule('which files contain TODO lines, skip paths under vendor', 'grep -r -l TODO .', /drop_names/);
});

test('fix 7: a short-date cue needs --date=short', () => {
  no('commits from 2024-01-01 until 2024-03-31, date short, hash author date subject',
    "git log --format='%h %an %ad %s' --since=2024-01-01 --until=2024-03-31", /log_short_date/);
  ok('commits from 2024-01-01 until 2024-03-31, date short, hash author date subject',
    "git log --format='%h %an %ad %s' --date=short --since=2024-01-01 --until=2024-03-31");
});

test('review #12: yyyy-mm-dd describing an input date is not a short-date cue', () => {
  ok('commits since 2024-01-01 (yyyy-mm-dd)', 'git log --since=2024-01-01');
});

test('fix 8: "in the last N commits" restricts the window before the message filter', () => {
  no('search commit messages for FIXME in last 20 commits, ignore case', 'git log -n 20 --grep=FIXME -i', /log_window/);
  no('among the last 50 commits, which ones mention refactor', 'git log -n 50 --grep=refactor', /log_window/);
  ok('search commit messages for FIXME in last 20 commits, ignore case', 'git log --oneline -n 20 | grep -i FIXME');
  ok('the last 20 commits mentioning FIXME', 'git log -n 20 --grep=FIXME');
  ok('last 5 commits by alice', 'git log -n 5 --author=alice');
  // review #7: the window phrase inside the searched text
  notRule("last 5 commits whose message says 'in the last 5 commits'", "git log -n 5 --grep='in the last 5 commits'", /log_window/);
  // only quoted spans are skipped, so a pattern word never erases the window cue
  no('search commit messages for last in last 20 commits', 'git log -n 20 --grep=last', /log_window/);
  no("search commit messages for 'last' in last 20 commits", 'git log -n 20 --grep=last', /log_window/);
  no('search commit messages in last 20 commits for last', 'git log -n 20 --grep=last', /log_window/);
});

test('review #1: --dump-setting falls back to by_coverage_50 on a none / unknown setting', async () => {
  const { dumpSetting } = await import('../../scripts/ir/combined_lib.mjs');
  const nb = { by_point: { t: 0.9 }, by_upper_bound: null, by_coverage_50: { t: 0.5 } };
  const warns = []; const w = (m) => warns.push(m);
  assert.deepEqual(dumpSetting(nb, 'by_point', w), { t: 0.9 });
  assert.equal(warns.length, 0);
  assert.deepEqual(dumpSetting(nb, 'by_upper_bound', w), { t: 0.5 });
  assert.deepEqual(dumpSetting(nb, 'by_pont', w), { t: 0.5 });
  assert.equal(warns.length, 2);
  assert.match(warns[1], /unknown/);
});
