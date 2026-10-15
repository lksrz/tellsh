// feat/templates-catalog: new catalog templates (git show/fetch/ls-files/grep, gh run watch, gh issue list/view, wrangler d1 list /
// pages deploy) and the Known-limits fixes (pip --target / quoted --workspace in PowerShell and cmd, attached -t, quoted
// "in workspace").
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildCommand } from '../src/fill.js';
import { BY_ID } from '../src/catalog.js';
import { FAMILY_OF } from '../src/tools.js';
import { suggest } from '../src/pipeline.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const PS = { shell: 'powershell', os: 'win32', coreutils: 'gnu' };
const CMD = { shell: 'cmd', os: 'win32', coreutils: 'gnu' };
const cmd = (id, text, env = BASH) => buildCommand(id, text, { env }).command;
// end to end (classifier + tagger): the request picks the intent and the slots
const run = (q, env = BASH) => suggest(q, { env });
const NEW = ['git_show', 'git_fetch', 'git_ls_files', 'git_grep', 'gh_run_watch', 'gh_issue_list', 'gh_issue_view', 'wrangler_d1_list', 'wrangler_pages_deploy'];

test('new-template intents are in the catalog and a tool family', () => {
  for (const id of NEW) { assert.ok(BY_ID[id], id); assert.ok(FAMILY_OF[id], id); }
  assert.equal(BY_ID.git_show.risk, 'safe');
  assert.equal(BY_ID.wrangler_pages_deploy.risk, 'medium');
  assert.equal(BY_ID.wrangler_d1_list.risk, 'medium');
});

test('new templates render with their slots', () => {
  for (const [id, text, want] of [
    ['git_show', 'show the last commit', 'git show'],
    ['git_fetch', 'fetch from all remotes', 'git fetch --all'],
    ['git_ls_files', 'list tracked files', 'git ls-files'],
    ['git_grep', 'git grep TODO', 'git grep -n -- TODO'],
    ['gh_run_watch', 'watch run 123456789', 'gh run watch 123456789'],
    ['gh_run_watch', 'watch the ci run until it finishes', 'gh run watch'],
    ['gh_issue_list', 'list github issues', 'gh issue list'],
    ['gh_issue_list', 'list issues in repo acme/app', 'gh issue list --repo acme/app'],
    ['gh_issue_view', 'show issue 42', 'gh issue view 42'],
    ['gh_issue_view', 'show the issue', 'gh issue view <NUM>'],
    ['wrangler_d1_list', 'list my d1 databases', 'npx wrangler d1 list'],
    ['wrangler_pages_deploy', 'deploy ./build to pages', 'npx wrangler pages deploy ./build'],
  ]) assert.equal(cmd(id, text), want, `${id}: ${text}`);
  assert.match(cmd('git_grep', 'git grep TODO', PS), /^git grep -n '--' '?TODO'?$/);
});

test('known limits: pip --target and quoted --workspace in PowerShell / cmd; attached -t; quoted "in workspace"', () => {
  assert.equal(cmd('pip_install', 'pip install requests --target C:\\libs', CMD), 'py -m pip install requests --target C:\\libs');
  assert.match(cmd('pip_install', "pip install requests --target 'C:\\my libs'", PS), /--target 'C:\\my libs'$/);
  assert.equal(cmd('pip_install', 'pip install requests -t/tmp/pkgs'), 'python3 -m pip install requests --target /tmp/pkgs');
  assert.equal(run('npm run build --workspace "staging app"', PS).command, "npm run 'build' --workspace 'staging app'");
  assert.equal(run('npm run build --workspace "staging app"', CMD).command, 'npm run build --workspace "staging app"');
  assert.equal(run('run npm deploy in workspace "staging app"').command, "npm run deploy --workspace 'staging app'");
  assert.equal(run("run npm deploy in workspace 'staging app'").command, "npm run deploy --workspace 'staging app'");
  assert.equal(run('run npm deploy in workspace api').command, 'npm run deploy --workspace api');
});

test('new-template intents end to end (retrained model)', () => {
  for (const [q, want] of [
    ['fetch new branches from origin without merging', 'git fetch --all'],
    ['list the files tracked by git', 'git ls-files'],
    ['watch the github actions run until it finishes', 'gh run watch'],
    ['list open github issues', 'gh issue list'],
    ['show github issue 42', 'gh issue view 42'],
    ['list my cloudflare d1 databases', 'npx wrangler d1 list'],
    ['deploy the dist folder to cloudflare pages', 'npx wrangler pages deploy dist'],
  ]) assert.equal(run(q).command, want, q);
});
