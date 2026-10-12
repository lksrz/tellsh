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

test('review r10: path segments kept in every -t form, nested relative revisions, drive-relative parents, selector positions', async () => {
  const held = async (q, o = BASH) => { const r = await run(q, o); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  assert.match((await run('pip install requests -t..\\..', PS)).command, /--target '\.\.\\\.\.'/);
  assert.equal((await run('pip install requests -t ../..')).command, 'python3 -m pip install requests --target ../..');
  assert.equal((await run('pip install requests --target=lib/..')).command, 'python3 -m pip install requests --target lib/..');
  for (const q of ['pip install requests -t./"my libs"', 'show the previous commit of the previous commit', 'deploy dist to static on cloudflare pages',
    'search tracked files for "TODO" on file', 'show the latest commit of tag latest']) await held(q);
  await held('wrangler pages deploy "C:.."', PS);
  await held('wrangler pages deploy "C:../.."', { shell: 'cmd', os: 'win32' });
  for (const q of ['show the previous commit', 'show the last commit', 'deploy dist to cloudflare pages', 'find TODO in tracked files']) assert.equal((await run(q)).missing.length, 0, q);
});

test('review r11: drive-relative pip targets, glued quoted separated targets, several commit selectors, tags without a value, more selector positions', async () => {
  const held = async (q, o = BASH) => { const r = await run(q, o); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  assert.match((await run('pip install requests -tC:..', PS)).command, /--target 'C:\.\.'/);
  assert.match((await run('pip install requests --target=C:..', PS)).command, /--target 'C:\.\.'/);
  for (const q of ['pip install requests --target "lib"cache', 'pip install requests -t "lib",cache', 'show the latest commit and the previous commit',
    'show the latest commit for the last tag', 'show tag commit', 'pokaż ostatni commit tagu', 'show the commit with revision latest',
    'deploy dist to cloudflare pages on static', 'deploy dist to cloudflare pages static', 'search tracked files for "TODO" across the file']) await held(q);
  for (const q of ['pip install requests --target "/tmp/a b"', 'show me the latest commit with its diff', 'wdróż katalog dist na cloudflare pages', 'deploy ./build to pages']) assert.equal((await run(q)).missing.length, 0, q);
});

test('review r12: pages replays, derived revision with a tag, job scope, partial quotes, second case-variant operand, bare drive', async () => {
  const H = ['npx wrangler pages deploy build'];
  const held = async (q, o = BASH, h) => { const r = await run(q, o, h); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  for (const q of ['same for production', 'same for staging', 'same for preview', 'same for docs']) await held(q, BASH, H);
  for (const q of ['show the previous tag commit', 'watch the build job in run 123', "pip install requests --target ./'my libs'", 'search tracked files for "word" and WORD']) await held(q);
  assert.match((await run('pip install requests -t C:', PS)).command, /--target 'C:'/);
  assert.equal((await run('same for ./out', BASH, H)).missing.length, 0);
  assert.equal((await run('watch the github actions run 123 until it finishes')).missing.length, 0);
});

test('review r13: escaped spaces in pip targets, a second grep pattern, issue-state exclusions', async () => {
  const held = async (q) => { const r = await run(q); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  for (const q of ['pip install requests -t/tmp/my\\ libs', 'pip install requests --target /tmp/my\\ libs', 'search tracked files for "word" and TEXT',
    'list all issues but closed', 'list all open issues but closed']) await held(q);
  assert.equal((await run('list closed issues')).command, 'gh issue list --state closed');
});

test('review r14: second pattern after a determiner, trailing comma in -t, implicit + explicit commit', async () => {
  const held = async (q) => { const r = await run(q); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  for (const q of ['search tracked files for "TODO" and the word TEXT', 'pip install requests -tlib,', 'show the latest commit and commit abc1234']) await held(q);
  for (const q of ['show commit abc1234', 'show the latest commit', 'pip install requests -t/tmp/pkgs']) assert.equal((await run(q)).missing.length, 0, q);
});

test('review r15: vocabulary word after an explicit pattern marker, any trailing punctuation on attached -t, dot segments are residue', async () => {
  const held = async (q) => { const r = await run(q); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  for (const q of ['search tracked files for "TODO" and the word tracked', 'search tracked files for "TODO" and the word files', 'pip install requests -tlib!',
    'pip install requests -t/tmp/lib.', 'list the files tracked by git in ..']) await held(q);
  for (const q of ['pip install requests -t/tmp/pkgs', 'pip install requests -t./lib/..', 'list tracked files']) assert.equal((await run(q)).missing.length, 0, q);
});

test('review r16: "and for X" patterns, ls-files scope words, punctuated separated/= pip targets, dots inside punctuation', async () => {
  const held = async (q) => { const r = await run(q); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  for (const q of ['search tracked files for "TODO" and for tracked', 'search tracked files for "TODO" and also for files', 'list the files tracked by git in files',
    'pip install requests --target=lib,', 'pip install requests -t lib,', 'list the files tracked by git in ..,']) await held(q);
  for (const q of ['pip install requests --target /tmp/pkgs', 'pip install requests -t ../..', 'list the files tracked by git', 'list tracked files in the repo']) assert.equal((await run(q)).missing.length, 0, q);
});

test('review r17: punctuation after a dot-segment target, marker before a determiner, named repo scope for ls-files', async () => {
  const held = async (q) => { const r = await run(q); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  for (const q of ['pip install requests -t ../..,', 'search tracked files for "TODO" and for the files', 'search tracked files for "TODO", files',
    'list the files tracked by git in repo files', 'list the files tracked by git in the repo files', 'list the files tracked by git with files']) await held(q);
  for (const q of ['pip install requests -t ../..', 'list tracked files in the repo', 'list the files tracked by git']) assert.equal((await run(q)).missing.length, 0, q);
});

test('review r18: glued punctuation / inner spaces in quoted pip targets, replacement grep patterns, named repo scopes', async () => {
  const held = async (q) => { const r = await run(q); assert.ok(r.command == null || r.missing.length > 0, `${q}: ${r.command} must not run on Enter`); };
  for (const q of ['pip install requests -t "lib".', 'pip install requests --target="lib".', 'pip install requests --target " lib "',
    'search tracked files for "TODO" but for the word files instead', 'search tracked files for "TODO" in repo codebase', 'list the files tracked by git in git repo files']) await held(q);
  for (const q of ['pip install requests --target "my libs"', 'search tracked files for "TODO"', 'list tracked files in the repo']) assert.equal((await run(q)).missing.length, 0, q);
});

// review r19: a second git grep pattern after ; / but / instead / also / the; a quoted workspace with edge spaces
test('r19: hidden second grep patterns and padded quoted workspaces are withheld', () => {
  for (const env of [{ shell: 'bash', os: 'linux' }, { shell: 'pwsh', os: 'win32' }, { shell: 'cmd', os: 'win32' }]) {
    for (const q of ['search tracked files for "TODO"; search for the word files', 'git grep "TODO"; git grep files',
      'search tracked files for "TODO" but tracked instead', 'search tracked files for "TODO" and also files',
      'search tracked files for "TODO"; tracked', 'run npm deploy in workspace " packages/api "', 'run npm deploy --workspace " packages/api "']) {
      const r = suggest(q, env);
      assert.ok(!r.command || r.missing.length > 0, `${env.shell}: ${q}`);
    }
    for (const q of ['search tracked files for "TODO"', 'list tracked files in the repo', 'run npm deploy in workspace "staging app"']) {
      assert.deepEqual(suggest(q, env).missing, [], `${env.shell}: ${q}`);
    }
  }
});

// review r20: or / and + vocabulary / postfix too-also add a second grep pattern; an unterminated quoted pip target
test('r20: postfix and vocabulary second grep patterns and unterminated pip targets are withheld', () => {
  for (const env of [{ shell: 'bash', os: 'linux' }, { shell: 'pwsh', os: 'win32' }, { shell: 'cmd', os: 'win32' }]) {
    for (const q of ['search tracked files for "TODO" and files too', 'search tracked files for "TODO" and files also',
      'search tracked files for "TODO" or files', 'search tracked files for "TODO" or repo too', 'search tracked files for "TODO" and FILES too',
      'search tracked files for "TODO" and TRACKED', 'pip install requests -t"lib', 'pip install requests --target "lib', 'pip install requests --target="lib',
      'run npm deploy --workspace=" packages/api "', 'run npm deploy -w " packages/api "']) {
      const r = suggest(q, env);
      assert.ok(!r.command || r.missing.length > 0, `${env.shell}: ${q}`);
    }
    for (const q of ['search tracked files for "TODO"', 'pip install requests -t "lib"']) assert.deepEqual(suggest(q, env).missing, [], `${env.shell}: ${q}`);
  }
});

// review r21: multi-line requests; an extra git show selector after and/or
test('r21: multi-line requests and extra git show selectors are withheld', () => {
  for (const env of [{ shell: 'bash', os: 'linux' }, { shell: 'pwsh', os: 'win32' }, { shell: 'cmd', os: 'win32' }]) {
    for (const q of ['pip install requests -t"my\nlibs"', 'pip install requests --target lib\nplease', 'git grep "TODO" files\nplease', 'git ls-files files\nplease',
      'show commit HEAD and tag diff', 'show commit HEAD or v1.0', 'search tracked files for "TODO"\tfiles']) {
      const r = suggest(q, env);
      assert.ok(!r.command || r.missing.length > 0, `${env.shell}: ${JSON.stringify(q)}`);
    }
    for (const q of ['show commit HEAD', 'git ls-files', 'pip install requests -t lib']) assert.deepEqual(suggest(q, env).missing, [], `${env.shell}: ${q}`);
  }
});

// review r22: several pattern-marker groups in git grep; extra git show selectors after , ; or a selector word
test('r22: extra grep pattern markers and extra git show selectors are withheld', () => {
  for (const env of [{ shell: 'bash', os: 'linux' }, { shell: 'pwsh', os: 'win32' }, { shell: 'cmd', os: 'win32' }]) {
    for (const q of ['search tracked files for "TODO" with the word files', 'search tracked files for word "TODO" word files', 'search tracked files for "TODO" to files',
      'show commit HEAD; show tag diff', 'show commit HEAD, show revision changes', 'show commit HEAD tag diff']) {
      const r = suggest(q, env);
      assert.ok(!r.command || r.missing.length > 0, `${env.shell}: ${q}`);
    }
    for (const q of ['search tracked files for "TODO"', 'search tracked files for the word "TODO"', 'show commit HEAD']) assert.deepEqual(suggest(q, env).missing, [], `${env.shell}: ${q}`);
  }
});

// review r23: a named tracked file in git grep; pages words no longer explain worker deploy targets
test('r23: named grep file and worker deploy to a pages word are withheld', () => {
  for (const env of [{ shell: 'bash', os: 'linux' }, { shell: 'pwsh', os: 'win32' }, { shell: 'cmd', os: 'win32' }]) {
    for (const q of ['find "TODO" in the tracked file codebase', 'deploy worker to public', 'deploy worker to dist']) {
      const r = suggest(q, env);
      assert.ok(!r.command || r.missing.length > 0, `${env.shell}: ${q}`);
    }
    for (const q of ['search tracked files for "TODO"', 'deploy worker to staging']) assert.deepEqual(suggest(q, env).missing, [], `${env.shell}: ${q}`);
  }
});
