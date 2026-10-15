// catalog-038 (0.3.8): git diff --stat / --name-only, git show --stat, git worktree list / add, json_pretty, http_server,
// venv_create, open_file, pip_list, npm_outdated. Explicit values only; a restriction the template cannot express is withheld.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildCommand, newTemplateWithhold } from '../src/fill.js';
import { BY_ID } from '../src/catalog.js';
import { FAMILY_OF } from '../src/tools.js';
import { NEW_TEMPLATE_INTENTS, suggest } from '../src/pipeline.js';
import { CATALOG_038 } from '../src/templates038.js';
import { loadModel } from '../src/model.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const MAC = { shell: 'zsh', os: 'darwin', coreutils: 'bsd' };
const PS = { shell: 'powershell', os: 'win32', coreutils: 'gnu' };
const CMD = { shell: 'cmd', os: 'win32', coreutils: 'gnu' };
const build = (id, text, env = BASH) => buildCommand(id, text, { env });
const cmd = (id, text, env = BASH) => build(id, text, env).command;
const withheld = (id, text, env = BASH) => { const r = build(id, text, env); return newTemplateWithhold(id, text, r.slots, r.command); };

test('catalog-038 intents: catalog, tool family, template gate, risk', () => {
  assert.equal(CATALOG_038.length, 11);
  for (const id of CATALOG_038) { assert.ok(BY_ID[id], id); assert.ok(FAMILY_OF[id], id); assert.ok(NEW_TEMPLATE_INTENTS.has(id), id); }
  for (const id of ['git_diff_stat', 'git_diff_names', 'git_show_files', 'git_worktree_list', 'json_pretty']) assert.equal(BY_ID[id].risk, 'safe', id);
  // not read-only (a server, opening an app, writing a worktree / venv) or running project code: never auto-run with --yes
  for (const id of ['http_server', 'open_file', 'git_worktree_add', 'venv_create', 'pip_list', 'npm_outdated']) assert.equal(BY_ID[id].risk, 'medium', id);
  for (const id of ['http_server', 'open_file']) for (const env of [BASH, MAC, PS, CMD]) assert.notEqual(build(id, id === 'open_file' ? 'open report.pdf' : 'start a web server', env).risk, 'safe');
});

test('catalog-038 renders per shell', () => {
  for (const [id, text, bash, mac, ps, cm] of [
    ['git_diff_stat', 'show a diff stat', 'git diff --stat', 'git diff --stat', 'git diff --stat', 'git diff --stat'],
    ['git_diff_stat', 'diff stat of staged changes against main', 'git diff --cached --stat main', null, "git diff --cached --stat 'main'", 'git diff --cached --stat main'],
    ['git_diff_names', 'which files changed compared to develop', 'git diff --name-only develop', null, null, null],
    ['git_show_files', 'which files changed in the last commit', 'git show --stat HEAD', null, "git show --stat 'HEAD'", 'git show --stat HEAD'],
    ['git_show_files', 'files changed in commit abc1234', 'git show --stat abc1234', null, null, null],
    ['git_show_files', 'files in the previous commit', "git show --stat 'HEAD~1'", null, null, null],
    ['git_worktree_list', 'list worktrees', 'git worktree list', 'git worktree list', 'git worktree list', 'git worktree list'],
    ['git_worktree_add', 'create a worktree at ../hotfix for branch hotfix/login', 'git worktree add ../hotfix hotfix/login', null, "git worktree add '../hotfix' 'hotfix/login'", 'git worktree add ..\\hotfix "hotfix/login"'],
    ['git_worktree_add', 'add a worktree', 'git worktree add <PATH> <BRANCH>', null, null, null],
    ['json_pretty', 'pretty print data.json', 'jq . data.json', 'jq . data.json', "Get-Content -LiteralPath 'data.json' -Raw | ConvertFrom-Json | ConvertTo-Json -Depth 100", 'py -m json.tool data.json'],
    ['json_pretty', 'pretty print json', 'jq . <FILE>', null, null, null],
    ['http_server', 'start a web server on port 9000', 'python3 -m http.server 9000 --bind 127.0.0.1', null, 'py -m http.server 9000 --bind 127.0.0.1', 'py -m http.server 9000 --bind 127.0.0.1'],
    ['http_server', 'uruchom serwer na porcie 5000', 'python3 -m http.server 5000 --bind 127.0.0.1', null, null, null],
    ['http_server', 'serve this directory', 'python3 -m http.server 8000 --bind 127.0.0.1', null, null, null],
    ['venv_create', 'create a virtualenv', 'python3 -m venv .venv', null, "py -m venv '.venv'", 'py -m venv .venv'],
    ['venv_create', 'create a venv named env', 'python3 -m venv env', null, null, null],
    ['open_file', 'open report.pdf', 'xdg-open report.pdf', 'open report.pdf', "Invoke-Item -LiteralPath 'report.pdf'", 'start "" report.pdf'],
    ['open_file', 'open https://example.com', 'xdg-open https://example.com', 'open https://example.com', "Start-Process 'https://example.com'", 'start "" "https://example.com"'],
    ['open_file', 'open a file', 'xdg-open <FILE>', null, null, null],
    ['pip_list', 'list installed pip packages', 'python3 -m pip list', 'python3 -m pip list', 'py -m pip list', 'py -m pip list'],
    ['npm_outdated', 'which npm packages are outdated', 'npm outdated', 'npm outdated', 'npm outdated', 'npm outdated'],
  ]) {
    assert.equal(cmd(id, text), bash, `${id}: ${text}`);
    if (mac) assert.equal(cmd(id, text, MAC), mac, `${id} (zsh/darwin): ${text}`);
    if (ps) assert.equal(cmd(id, text, PS), ps, `${id} (PowerShell): ${text}`);
    if (cm) assert.equal(cmd(id, text, CMD), cm, `${id} (cmd): ${text}`);
  }
});

test('catalog-038: a restriction, option or second action the template cannot express is withheld', () => {
  for (const [id, text] of [
    ['git_diff_stat', 'diff stat but only for src'],
    ['git_diff_stat', 'git diff --stat -w'],
    ['git_diff_names', 'list changed files without the tests'],
    ['git_diff_names', 'list changed python files'],
    ['git_show_files', 'which files changed in the last commit by alice'],
    ['git_worktree_list', 'list worktrees and remove the stale ones'],
    ['git_worktree_add', 'create a worktree at ../x for branch dev and switch to it'],
    ['git_worktree_add', 'create a worktree at ../x for a new branch dev --detach'],
    ['json_pretty', 'pretty print data.json sorted by key'],
    ['json_pretty', 'pretty print data.json\nrm -rf ~'],
    ['http_server', 'serve files on the network'],
    ['http_server', 'start a web server on all interfaces'],
    ['http_server', 'start a web server on port 99999'],
    ['http_server', 'serve this folder over https'],
    ['venv_create', 'create a venv with python 3.12'],
    ['venv_create', 'create a venv and install requests'],
    ['open_file', 'open setup.exe'],
    ['open_file', 'open install.sh'],
    ['open_file', 'open report.pdf in vim'],
    ['open_file', 'otwórz plik „raport.pdf”'],
    ['pip_list', 'list outdated pip packages'],
    ['pip_list', 'pip list --user'],
    ['npm_outdated', 'npm outdated and update them'],
    ['npm_outdated', 'npm outdated --global'],
    ['npm_outdated', 'nieaktualne pakiety npm oprócz react'],
  ]) assert.ok(withheld(id, text).length > 0, `${id}: ${JSON.stringify(text)} -> ${cmd(id, text)}`);
  // plain requests are not
  for (const [id, text] of [['npm_outdated', 'sprawdź przestarzałe zależności'], ['git_worktree_list', 'which worktrees do i have'], ['git_diff_stat', 'show insertions and deletions per file'],
    ['git_worktree_list', "wylistuj worktree'y"], ['pip_list', 'show installed packages and versions']]) assert.deepEqual(withheld(id, text), [], `${id}: ${text}`);
});

const ROWS = readFileSync(new URL('../data/intents/g10_catalog038.jsonl', import.meta.url), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
test('g10 training rows: every intent has EN and PL rows; hard negatives are existing intents; no positive is withheld', () => {
  const n = {};
  for (const r of ROWS) { assert.ok(BY_ID[r.intent], r.intent); assert.ok(['en', 'pl'].includes(r.lang)); n[`${r.intent}/${r.lang}`] = (n[`${r.intent}/${r.lang}`] || 0) + 1; }
  for (const id of CATALOG_038) for (const lang of ['en', 'pl']) assert.ok((n[`${id}/${lang}`] || 0) >= 20, `${id}/${lang}: ${n[`${id}/${lang}`]}`);
  assert.ok(ROWS.filter((r) => !CATALOG_038.includes(r.intent)).length >= 30, 'near-miss hard negatives');
  for (const r of ROWS.filter((x) => CATALOG_038.includes(x.intent))) {
    assert.deepEqual(withheld(r.intent, r.text), [], `${r.intent}: ${r.text}`);
    for (const env of [BASH, MAC, PS, CMD]) assert.ok(build(r.intent, r.text, env).command, `${r.intent} (${env.shell}): ${r.text}`);
  }
});

// The shipped model/model_templates.bin predates 0.3.8: these run once it is retrained with data/intents/g10_catalog038.jsonl.
let known = new Set();
try { known = new Set(Object.values(loadModel(new URL('../model/model_templates.bin', import.meta.url).pathname).models).flatMap((m) => m.labels)); } catch { /* no templates model */ }
const E2E = [
  ['show a diff stat', 'git_diff_stat', 'git diff --stat'],
  ['list the changed files', 'git_diff_names', 'git diff --name-only'],
  ['which files changed in the last commit', 'git_show_files', 'git show --stat HEAD'],
  ['list git worktrees', 'git_worktree_list', 'git worktree list'],
  ['create a worktree at ../hotfix for branch hotfix/login', 'git_worktree_add', 'git worktree add ../hotfix hotfix/login'],
  ['pretty print data.json', 'json_pretty', 'jq . data.json'],
  ['start a web server on port 9000', 'http_server', 'python3 -m http.server 9000 --bind 127.0.0.1'],
  ['create a python virtual environment', 'venv_create', 'python3 -m venv .venv'],
  ['open report.pdf', 'open_file', 'xdg-open report.pdf'],
  ['list installed pip packages', 'pip_list', 'python3 -m pip list'],
  ['which npm packages are outdated', 'npm_outdated', 'npm outdated'],
];
for (const [q, id, want] of E2E) {
  test(`catalog-038 end to end (retrained templates model): ${q}`, { skip: known.has(id) ? false : `model/model_templates.bin does not know ${id} yet (retrain)` }, () => {
    const r = suggest(q, { env: BASH });
    assert.equal(r.intent, id);
    assert.equal(r.command, want);
  });
}
