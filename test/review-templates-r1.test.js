// dual review r1 of feat/templates-catalog (0.3.4): Claude + Codex findings
import test from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const BASH = { shell: 'bash', os: 'linux' };
const PS = { shell: 'pwsh', os: 'win32' };
const run = (q, o = BASH, history) => suggest(q, { ...o, ...(history ? { history } : {}) });

test('review r1 blocker: a place word never renders as a literal ? argument', async () => {
  for (const [q, o] of [['switch to branch there', BASH], ['restart service tam', PS], ['stop container there', BASH], ['stop the service there', PS], ['kill process inside', BASH]]) {
    const r = await run(q, o);
    assert.ok(r.command == null || !/['"]\?['"]|\s\?(?:\s|$)/.test(r.command), `${q}: ${r.command}`);
  }
});

test('review r1 blocker: a refused history reference is never runnable as is', async () => {
  for (const [q, h] of [['push it there', ['cd /tmp/x']], ['stop it there', ['docker logs web']], ['move it there', ['cat a.txt']]]) {
    const r = await run(q, BASH, h);
    if (r.command == null) continue;
    assert.equal(r.context.rule, 'refused', q);
    assert.ok(r.missing.length > 0, `${q}: ${r.command} must not run on Enter`);
  }
});

test('review r1 majors: new templates take only explicit values', async () => {
  const cmd = async (q, o) => (await run(q, o)).command;
  assert.equal(await cmd('git show abc1234'), 'git show abc1234');
  assert.equal(await cmd('git show HEAD~1'), "git show 'HEAD~1'");
  assert.equal(await cmd('show the previous commit'), "git show 'HEAD~1'");
  assert.match(await cmd('wrangler pages deploy build'), /deploy build$/);
  assert.match(await cmd('deploy the build folder to pages in production'), /deploy (?:build|<PATH>)/);
  assert.doesNotMatch(await cmd('deploy the build folder to pages in production'), /deploy (?:dist|production)/);
  for (const q of ['git grep -i todo', 'git grep -e foo']) assert.doesNotMatch(await cmd(q), /-- -/, q);
  assert.equal(await cmd('search tracked files for "TODO.*"'), "git grep -n -- 'TODO.*'");
  for (const q of ['show issue with 2 comments', 'watch the github actions run from 2 days ago', 'watch run for issue 42']) assert.match(await cmd(q), /<NUM>/, q);
  assert.equal(await cmd('show issue 42'), 'gh issue view 42');
  assert.equal(await cmd('list all github issues'), 'gh issue list --state all');
  assert.doesNotMatch(await cmd('run npm publish'), /npm run publish/);
  assert.match(await cmd('run npm deploy in workspace ""'), /<WORKSPACE>/);
  assert.match(await cmd("pip install requests -t'/tmp/pkgs;'"), /--target '\/tmp\/pkgs;'/);
});

test('review r2: explicit values only, unsupported parts withheld, per-shell quoting', async () => {
  const sug = (q, o = BASH) => run(q, o);
  const cmd = async (q, o) => (await sug(q, o)).command;
  for (const [q, exp] of [['git show deadbeef', 'git show deadbeef'], ['git show abc123', 'git show abc123'], ['git show "abc1234"', 'git show abc1234'], ['git show v1.2.3-beta', 'git show v1.2.3-beta']]) assert.equal(await cmd(q), exp, q);
  assert.equal(await cmd('git show HEAD^1', { shell: 'cmd', os: 'win32' }), 'git show "HEAD^1"');
  assert.equal(await cmd('git show @', PS), "git show '@'");
  for (const q of ['deploy the folder to cloudflare pages', 'deploy the static site to "cloudflare pages"']) assert.match(await cmd(q), /deploy <PATH>/, q);
  for (const q of ['deploy public to cloudflare pages in preview', 'deploy build to cloudflare pages --dry-run', 'deploy build to cloudflare pages without actually deploying']) {
    const r = await sug(q);
    assert.ok(r.missing.length > 0, `${q}: ${r.command} must not run on Enter`);
  }
  assert.equal(await cmd('wrangler pages deploy "my out"'), "npx wrangler pages deploy 'my out'");
  assert.match(await cmd('show the issue mentioning #12'), /<NUM>/);
  assert.match(await cmd('watch run 2 weeks old'), /<NUM>/);
  assert.equal(await cmd('show issue #7'), 'gh issue view 7');
  assert.equal(await cmd('git grep for parseConfig'), 'git grep -n -- parseConfig');
  assert.match(await cmd('git grep -i TODO'), /<PATTERN>/);
  assert.match(await cmd('pip install requests -t"/tmp/a\\"b"'), /<PIPTARGET>/);
  for (const q of ['npm install there', 'install npm package there']) assert.ok((await sug(q)).missing.length > 0, q);
  assert.equal(await cmd('list closed github issues'), 'gh issue list --state closed');
  assert.match(await cmd('run npm rebuild'), /<SCRIPT>/);
  assert.equal(await cmd('npm run build'), 'npm run build');
});

test('review r3: anything the template cannot express is withheld (missing), never dropped', async () => {
  const sug = (q) => run(q);
  const held = async (q) => { const r = await sug(q); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  for (const q of ['watch run 2 hrs old', 'watch run 20 secs old', 'watch the run 5 jobs', 'watch run 3 attempts', 'git grep TODO -- "*.js"',
    'wdroż build na cloudflare pages bez publikowania', 'deploy build to cloudflare pages to stage', 'wrangler pages deploy "my out"dist',
    'run npm deploy in workspace "staging app"suffix', 'run npm trust', 'show commit abc']) await held(q);
  const cmd = async (q) => (await sug(q)).command;
  assert.equal(await cmd('git show HEAD:README.md'), 'git show HEAD:README.md');
  assert.equal(await cmd('git show "HEAD^!"'), "git show 'HEAD^!'");
  assert.equal(await cmd('show me the latest commit with its diff'), 'git show');
  assert.equal(await cmd('list all open github issues'), 'gh issue list');
  for (const q of ['watch run 123', 'show issue 42', 'git grep alpha', 'deploy dist to cloudflare pages', 'wdróż katalog dist na cloudflare pages', 'grep the repo for TODO']) {
    const r = await sug(q);
    assert.equal(r.missing.length, 0, `${q}: ${r.command} ${JSON.stringify(r.missing)}`);
  }
});

test('review r4: options with an explicit id, generic nouns, pathspecs, extra revisions, ls-files filters, composer, broad dirs', async () => {
  const held = async (q) => { const r = await run(q); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  for (const q of ['deploy the site to cloudflare pages', 'deploy docs to pages', 'watch run 123 --exit-status', 'show issue 42 --json title',
    'search tracked files for TODO case insensitive', 'git grep TODO -- code', 'git show HEAD HEAD~1', 'show the commit one before HEAD',
    'git ls-files --others', 'git ls-files -- src', 'watch the run 5 failures', 'deploy ~ to cloudflare pages', 'deploy .. to cloudflare pages']) await held(q);
  assert.equal((await run('list open and closed github issues')).command, 'gh issue list --state all');
  for (const q of ['list tracked files', 'git ls-files', 'deploy dist to cloudflare pages']) assert.equal((await run(q)).missing.length, 0, q);
});

test('review r5: only rendered slots explain words; gh/ls-files residue; literal refs; dropped ids; normalized broad dirs', async () => {
  const held = async (q, o = BASH) => { const r = await run(q, o); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  for (const q of ['show the commit from yesterday', 'watch run 2 builds', 'watch run 5 workflows', 'watch run 42 every 5s', 'gh run watch 99999999999999',
    'wrangler pages deploy "/."', 'wrangler pages deploy "./.."', 'list my open issues', 'show issue 42 in the browser', 'show issue 42 with comments',
    'show issue 42 as json', 'list tracked js files', 'git ls-files src', 'git show HEAD tag', 'git grep "TODO FIXME" -- code', 'please git grep TODO -- code']) await held(q);
  await held('deploy C:/ to cloudflare pages', PS);
  assert.equal((await run('git show previous')).command, 'git show previous');
  assert.equal((await run('git show latest')).command, 'git show latest');
  for (const q of ['gh issue view 42 --repo acme/app', 'watch the github actions run 123 until it finishes', 'list issues in repo acme/app', 'git ls-files', 'show the last commit']) {
    assert.equal((await run(q)).missing.length, 0, q);
  }
});

test('review r6: history replays, attached pip operands, case, glued suffixes, repo names, positional scope, sensitive dirs', async () => {
  const H = ['npx wrangler pages deploy dist'];
  const held = async (q, h) => { const r = await run(q, BASH, h); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  for (const q of ['same for /tmp/out without publishing', 'same for /', 'same for ~/', 'same for ../']) await held(q, H);
  for (const q of ['pip install requests -t@foo', 'pip install requests -t/tmp/lib,cache', 'Git grep TODO -- code', 'Git show HEAD tag',
    'run npm deploy in workspace "staging app"!prod', 'search tracked files for "TODO" in code', 'git ls-files files',
    'deploy /home/me to cloudflare pages', 'deploy ~/.ssh to cloudflare pages', 'deploy dist to frontend on cloudflare pages']) await held(q);
  assert.equal((await run('Git show previous')).command, 'git show previous');
  assert.equal((await run('list open issues in repo acme/closed')).command, 'gh issue list --repo acme/closed');
  assert.equal((await run('gh issue list --repo acme/closed')).command, 'gh issue list --repo acme/closed');
  for (const q of ['watch run 42 in repo foo/bar', 'pip install requests -t/tmp/pkgs', 'deploy /tmp/site/dist to pages']) assert.equal((await run(q)).missing.length, 0, q);
  assert.equal((await run('same for ./build', BASH, H)).missing.length, 0);
});

test('review r7: issue state after the word repo, quoted pip operands, relative revisions, repeated values', async () => {
  const held = async (q) => { const r = await run(q); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  assert.equal((await run('list closed issues in the repo')).command, 'gh issue list --state closed');
  for (const q of ['pip install requests -t"lib",cache', 'show the previous commit from HEAD', 'show the second-to-last commit from HEAD',
    'grep tracked files for "src" in "src"', 'search tracked files for "foo" and "FOO"']) await held(q);
  assert.equal((await run('pip install requests -t"/tmp/a b"')).missing.length, 0);
  const r = await run('Git grep TODO -- code');
  assert.equal(r.missing.length, 1);
  assert.doesNotMatch(r.missing[0], /code -- code/);
});

test('review r8: one value explains one word across quoted and bare forms; explicit HEAD~1 with a relative word; quoted repo names', async () => {
  const held = async (q) => { const r = await run(q); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  for (const q of ['grep tracked files for "src" in src', 'search tracked files for "foo" and FOO', 'show the previous commit from HEAD~1', 'show the previous commit HEAD~1']) await held(q);
  assert.equal((await run('list open issues in repo "acme/closed"')).command, 'gh issue list --repo acme/closed');
  assert.equal((await run('list all issues in repository "acme/open"')).command, 'gh issue list --repo acme/open --state all');
  assert.equal((await run('list issues of acme/closed')).command, 'gh issue list --repo acme/closed');
  assert.equal((await run('show the previous commit')).missing.length, 0);
});

test('review r9: relative words with any named revision, -t keeps .., hosted repo names, local d1, UNC roots, place words in grep, site as a project', async () => {
  const held = async (q, o = BASH) => { const r = await run(q, o); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  for (const q of ['show commit main^ previous', 'show the commit before feature/x', 'list local d1 databases', 'deploy dist to site on cloudflare pages', 'search tracked files for "TODO" in files']) await held(q);
  await held('wrangler pages deploy "//server/share"', PS);
  assert.equal((await run('pip install requests -t./lib/..')).command, 'python3 -m pip install requests --target ./lib/..');
  assert.equal((await run('list open issues in repo github.example.com/acme/closed')).command, 'gh issue list --repo github.example.com/acme/closed');
  assert.equal((await run('list all issues in repository "github.example.com/acme/open"')).command, 'gh issue list --repo github.example.com/acme/open --state all');
  for (const q of ['list d1 databases', 'show the previous commit', 'find TODO in tracked files', 'grep the repo for TODO']) assert.equal((await run(q)).missing.length, 0, q);
});
