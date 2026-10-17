// v3 strict-dev semantics: git show names without the header, hidden-only listings (ir/lib/strict_hidden.js),
// request-implied find -type f, git branch -vv for tracking info. Items run like strict.test.js:
// decompile(command) -> lift against the request -> gate (full compile + decompile round-trip).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas, gate, decompile, lift, compile, equals, program, exec, mod, cnst } from '../lib/index.js';
import { rewriteRow } from '../../scripts/ir/gold_rewrite.mjs';
import { equivKey } from '../../scripts/ir/equiv.mjs';

const schemas = loadSchemas();
const env = (request) => ({ schemas, shell: 'bash', platform: 'linux_gnu', request });
function check(request, command) {
  const d = decompile(command, env(request));
  assert.ok(!d.error, `decompile ${command}: ${d.error}`);
  let ir;
  try { ir = lift(schemas, d.ir, request); } catch (e) { return { accept: false, reasons: [e.message] }; }
  return gate(request, ir, env(request));
}
const ok = (request, command) => {
  const r = check(request, command);
  assert.equal(r.accept, true, `${request} -> ${command}: ${r.reasons.join(' / ')}`);
  assert.equal(r.command, command);
};
const no = (request, command, re) => {
  const r = check(request, command);
  assert.equal(r.accept, false, `expected a reject: ${request} -> ${command}`);
  if (re) assert.match(r.reasons.join(' / '), re);
};

test('git show --name-only / --name-status print names only (--format=)', () => {
  ok('which files changed in commit abc1234', 'git show --name-only --format= abc1234 --');
  ok('files changed in abc1234 with status letters', 'git show --name-status --format= abc1234 --');
  ok('one line summary of abc1234 and the files it touched', 'git show --oneline --name-only abc1234 --');
  const d = decompile('git show --name-only --format= abc1234 --', env());
  assert.deepEqual(d.ir.body.parts[0].stages[0].mods, [{ mod: 'name_only' }], '--format= is derived: stripped by decompile');
});

test('hidden-only cue rejects listings of every entry', () => {
  no('hidden files in src', 'ls -A src', /hidden/);
  no('list the dotfiles in ~', 'ls -A ~', /dotfiles|hidden/);
  no('hidden entries in docs one per line', 'ls -A1 docs', /hidden/);
  no('hidden files under src', 'rg --files --hidden src', /hidden|rg --files/);
  no('hidden files under src', 'find src -type f', /hidden/);
  ok('list src including hidden files', 'ls -A src');
  ok('all files in src, hidden ones too', 'ls -A src');
  ok('search hidden files for api_key', 'rg --hidden api_key .');
});

test('hidden-only listing: find -mindepth 1 [-maxdepth 1] [-type f|d] -name .*', () => {
  ok('hidden files in src', "find src -maxdepth 1 -mindepth 1 -type f -name '.*'");
  ok('hidden dirs of src', "find src -maxdepth 1 -mindepth 1 -type d -name '.*'");
  ok('hidden entries in docs', "find docs -maxdepth 1 -mindepth 1 -name '.*'");
  ok('hidden files under src', "find src -mindepth 1 -type f -name '.*'");
  no('hidden files under src', "find src -maxdepth 1 -mindepth 1 -type f -name '.*'", /recursive/);
  no('files in src including hidden ones', "find src -maxdepth 1 -mindepth 1 -type f -name '.*'", /hidden-only/);
  no('files in src', "find src -maxdepth 1 -mindepth 1 -type f", /fixed depth|SCOPE_TOP|hidden/);
  no('hidden files in src', "find src -maxdepth 1 -type f -name '.*'", /mindepth/);
});

test('gold rewrite hidden_only: ls -A / rg --files --hidden -> find', () => {
  const row = (request, command) => {
    const d = decompile(command, env(request));
    return { request, label: 'ok', os: 'linux', ir: lift(schemas, d.ir, request), command, status: 'accepted', reasons: [] };
  };
  const rw = (q, c) => rewriteRow(row(q, c), schemas);
  assert.equal(rw('hidden files in src', 'ls -A src').row.command, "find src -maxdepth 1 -mindepth 1 -type f -name '.*'");
  assert.equal(rw('hidden entries in the scripts folder', 'ls -A scripts').row.command, "find scripts -maxdepth 1 -mindepth 1 -name '.*'");
  assert.equal(rw('recursively show hidden files under .github', 'ls -AR .github').row.command, "find .github -mindepth 1 -type f -name '.*'");
  assert.deepEqual(rw('list src including hidden files', 'ls -A src').applied, []);
  assert.deepEqual(rw('hidden files in src sorted by size', 'ls -AS src').applied, [], 'sort / long modes have no find form');
});

test('files request -> find -type f whatever the filters; equiv keeps it significant', () => {
  const find = (...mods) => program(exec('files.find', { mods }));
  const c = (ir, request) => compile(ir, env(request));
  const r = c(find(), 'list all files');
  assert.equal(r.text, 'find . -type f');
  assert.ok(equals(decompile(r.text, env()).ir, r.canonical));
  assert.equal(c(find(), 'list everything').text, 'find .');
  assert.equal(c(find(), 'files and folders').text, 'find .');
  assert.equal(c(find(mod('type', [cnst('d')])), 'files').text, 'find . -type d', 'an explicit type wins');
  ok('md files under docs', "find docs -type f -name '*.md'");
  assert.notEqual(equivKey("find . -type f -name '*.md'", 'md files'), equivKey("find . -name '*.md'", 'md files'));
  assert.equal(equivKey("find . -type f -name '*.md'", 'md entries'), equivKey("find . -name '*.md'", 'md entries'));
});

test('git branch -vv for tracking info / upstream', () => {
  no('branches with their tracking info', 'git branch -v', /very_verbose/);
  no('local branches and their upstream', 'git branch', /very_verbose/);
  ok('branches with their tracking info', 'git branch -vv');
  ok('local branches and their upstream', 'git branch -vv');
  ok('remote tracking branches only', 'git branch -r');
  ok('branches with last commit', 'git branch -v');
});
