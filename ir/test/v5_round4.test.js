// docs/ir_error_taxonomy_v5.md "v5 round 4 (dev5)": possessive recency ("this week's", "today's") with no time filter, wc on a
// directory operand, -n piped into wc, git branch ancestry filters for branch-name questions, ls -d for a request that
// wants the entries, "file names only" word order, explanation requests. Items run decompile(command) -> lift -> gate.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas, gate, decompile, lift } from '../lib/index.js';
import { requestWantsNamesOnlyR3 } from '../lib/compile.js';
import { looksLikeDir } from '../lib/strict_v5r4.js';

const schemas = loadSchemas();
function check(request, command, platform = 'linux_gnu') {
  const env = { schemas, shell: 'bash', platform, request };
  const d = decompile(command, env);
  assert.ok(!d.error, `decompile ${command}: ${d.error}`);
  let ir;
  try { ir = lift(schemas, d.ir, request); } catch (e) { return { accept: false, reasons: [e.message] }; }
  return gate(request, ir, env);
}
const ok = (request, command, want, platform) => {
  const r = check(request, command, platform);
  assert.equal(r.accept, true, `${request} -> ${command}: ${(r.reasons || []).join(' / ')}`);
  if (want) assert.equal(r.command, want);
};
const no = (request, command, re) => {
  const r = check(request, command);
  assert.equal(r.accept, false, `expected a reject: ${request} -> ${command}`);
  assert.match(r.reasons.join(' / '), re);
};

test('r4-1: possessive recency with no time filter rejects', () => {
  no("This week's byte count for deploy/k8s/celery.toml?", 'wc -c deploy/k8s/celery.toml', /recency "this week's"/);
  no("this week's lines with TypeError in pipeline.txt, include line numbers", 'rg -n TypeError pipeline.txt', /recency/);
  no("today's NullPointerException hits in logs", 'rg NullPointerException logs', /recency "today's"/);
  // the possessive taken into the pattern is still dropped
  no("this week's files containing useEffect", "rg -l \"this week's\" .", /recency/);
  // a time filter expresses it; no recency word, no reject
  ok("this week's commits by alice, since 1 week ago", "git log --author=alice --since='1 week ago'");
  ok('files in modules/payments last modified over 90 days ago', 'find modules/payments -type f -mtime +90');
  ok('byte count for deploy/k8s/celery.toml', 'wc -c deploy/k8s/celery.toml');
});

test('r4-2: wc on a directory-looking operand rejects', () => {
  no('pull up word counts for spec/models and ~/.config/nvim', 'wc -w spec/models ~/.config/nvim', /wc_dir_operand/);
  no('count bytes in the files under .github/workflows', 'wc -c .github/workflows', /wc_dir_operand/);
  ok('word tally for db.html and oauth.md', 'wc -w db.html oauth.md');
  ok('line count of LICENSE', 'wc -l LICENSE');
  assert.equal(looksLikeDir('src/'), true);
  assert.equal(looksLikeDir('~/.config/nvim'), true);
  assert.equal(looksLikeDir('build'), false);
  assert.equal(looksLikeDir('docs/LICENSE'), false);
  assert.equal(looksLikeDir('src/*.js'), false);
});

test('r4-3: line numbers piped into wc reject', () => {
  no('Count lines in hooks.scss that match `panic`, and show line numbers too', 'rg -n panic hooks.scss | wc -l', /line_number_wc/);
  ok('Count lines in hooks.scss that match panic', 'rg panic hooks.scss | wc -l');
  ok('lines in hooks.scss that match panic, with line numbers', 'rg -n panic hooks.scss');
});

test('r4-4: an ancestry filter for a branch-name question rejects', () => {
  no('Are there any branches with chore/deps in their names?', 'git branch --contains=chore/deps', /branch_name_filter/);
  ok('branches that contain commit abc123', 'git branch --contains=abc123');
  ok('branches with feature in the name, ignore case', 'git branch | grep -i feature');
});

test('r4-5: ls -d for a request that wants the entries rejects', () => {
  no('list every entry in docs/api and show the directory itself too', 'ls -d docs/api', /ls_d_entries/);
  ok('only directory entries for var/log/nginx, not contents', 'ls -d var/log/nginx');
  ok('list every entry in docs/api', 'ls docs/api');
});

test('r4-6: "file names only" derives --format= like "only the file names"', () => {
  ok('file names only for merge commits that touched values.yaml', 'git log --merges --diff-merges=first-parent --name-only -- values.yaml',
    'git log --merges --diff-merges=first-parent --name-only --format= -- values.yaml');
  assert.equal(requestWantsNamesOnlyR3('history of models.rb, file names only'), true);
  assert.equal(requestWantsNamesOnlyR3('file names only per commit for models.rb'), false);
  assert.equal(requestWantsNamesOnlyR3('file names only with authors'), false);
});

test('r4-8: explanation requests reject as not_shell', () => {
  no('Please tell me how git branches work.', 'git branch', /explanation request/);
  no('how does git branch work?', 'git branch', /explanation request/);
  ok('list the git branches', 'git branch');
  ok("search docs for 'how does it work'", "rg 'how does it work' docs");
});

test('r4 review fixes: file-like paths, explain operands, branch refs, rev ranges, quoted possessives', () => {
  assert.equal(looksLikeDir('./script'), false);
  assert.equal(looksLikeDir('spec/models'), true);
  assert.equal(looksLikeDir('~/.config/nvim'), true);
  ok('line count of ./script', 'wc -l ./script');
  ok('search docs for explain', 'rg explain docs');
  ok('line count of explain.js', 'wc -l explain.js');
  ok('list branches that include the tip of the branch named main', 'git branch --contains main');
  no('list branches named like feature that include main', 'git branch --contains main', /branch_name_filter/);
  ok("search docs for today's", "rg \"today's\" docs");
  no("this week's line count of ../report.txt", 'wc -l ../report.txt', /recency/);
});
