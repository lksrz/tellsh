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
  assert.equal(await cmd('git show HEAD~1'), 'git show HEAD~1');
  assert.equal(await cmd('show the previous commit'), 'git show HEAD~1');
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
