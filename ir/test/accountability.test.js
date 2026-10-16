// Accountability (ir/lib/accountability.js): every content word of the request must be a copied value, a cue of
// an element the IR holds, or request wording. Dropped content is rejected (`uncovered_content`); the complete
// neighbour is accepted. Items run like strict.test.js: decompile(command) -> lift -> gate.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas, gate, decompile, lift } from '../lib/index.js';

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
const no = (request, command, re = /uncovered_content/) => {
  const r = check(request, command);
  assert.equal(r.accept, false, `expected a reject: ${request} -> ${command}`);
  assert.match(r.reasons.join(' / '), re);
};

test('dropped content words are uncovered', () => {
  no('staged word diff for the accounts app', 'git diff --staged --word-diff', /uncovered_content: "accounts"/);
  ok('staged word diff for the accounts app', 'git diff --staged --word-diff -- accounts');
  no('name-status diff against main for src', 'git diff --name-status main --', /"src"/);
  ok('name-status diff against main for src', 'git diff --name-status main -- src');
  no('show zod, top level only', 'npm ls --depth=0', /"zod"/);
  ok('show zod, top level only', 'npm ls --depth=0 zod');
  no('sources in src and tests and fuzz', 'find src tests -type f', /"fuzz"/);
});

test('a file type next to globbed ones must be used', () => {
  no('png jpg or gif in assets', "find assets -type f \\( -name '*.png' -o -name '*.gif' \\)", /"jpg"/);
  ok('png jpg or gif in assets', "find assets -type f \\( -name '*.png' -o -name '*.jpg' -o -name '*.gif' \\)");
});

test('a cue word needs its element', () => {
  no('status with branch info, porcelain format', 'git status -b', /porcelain/);
  ok('status with branch info, porcelain format', 'git status -b --porcelain');
  no('history of build.gradle and settings.gradle', 'ls build.gradle settings.gradle', /history/);
  ok('history of build.gradle and settings.gradle', 'git log -- build.gradle settings.gradle');
  no('first 5 files whose names contain deploy', 'rg -l deploy . | head -n 5', /whose names/);
  no('Show a word diff of the working tree', 'git diff --word-diff working --', /working tree/);
  ok('Show a word diff of the working tree', 'git diff --word-diff');
  // a cue word echoed by a value is that value ("the zsh history file")
  ok('byte count of the zsh history file ~/.zsh_history', 'wc -c ~/.zsh_history');
});

test('request wording, head nouns and value echoes are accounted for', () => {
  ok('kill the metro bundler', 'pkill -x metro');
  ok('numerically sort the ids in ~/exports/ids.txt', 'sort -n ~/exports/ids.txt');
  ok('just the names of files that differ from main', 'git diff --name-only main');
  ok('print lines that dont have TODO in the django project', 'rg -v TODO .');
});
