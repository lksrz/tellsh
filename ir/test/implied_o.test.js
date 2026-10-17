// Request-implied mods added by compile (compile.js impliedOnlyMatching, requestWantsNamesOnly): -o for a search piped
// into sort / uniq / freq when the request asks for the matches (or anywhere on an only-matching cue), and git log
// --name-only --format= on an only-the-file-names cue. Items run decompile(command) -> lift -> gate.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas, gate, decompile, lift, compile } from '../lib/index.js';

const schemas = loadSchemas();
const env = (request) => ({ schemas, shell: 'bash', platform: 'linux_gnu', request });
function check(request, command) {
  const d = decompile(command, env(request));
  assert.ok(!d.error, `decompile ${command}: ${d.error}`);
  return gate(request, lift(schemas, d.ir, request), env(request));
}
const ok = (request, command, want = command) => {
  const r = check(request, command);
  assert.equal(r.accept, true, `${request} -> ${command}: ${r.reasons.join(' / ')}`);
  assert.equal(r.command, want);
};

test('-o implied for sorted / unique / counted matches', () => {
  ok('unique sorted matches of TODO in src', 'rg TODO src | sort -u', 'rg -o -I TODO src | sort -u');
  ok('unique sorted matches of TODO in src', 'rg -o TODO src | sort -u', 'rg -o -I TODO src | sort -u');
  ok('sort the occurrences of TODO in src', 'rg TODO src | sort', 'rg -o -I TODO src | sort');
  ok('distinct matches of foo in a.log using grep', 'grep foo a.log | sort -u', 'grep -r -o foo a.log | sort -u');
});

test('-o stays off for line pipelines, head and line counts', () => {
  ok('unique lines with TODO in src', 'rg TODO src | sort -u', 'rg -I TODO src | sort -u');
  ok('first 5 matches of TODO in src', 'rg TODO src | head -n 5');
  ok('count lines with TODO in src', 'rg TODO src | wc -l');
  ok('how many times does TODO appear in src', 'rg -o TODO src | wc -l');
  ok('which files match TODO in src, sorted', 'rg -l TODO src | sort');
});

test('an only-matching cue implies -o anywhere', () => {
  ok('print only matches of foo in a.log with grep', 'grep foo a.log', 'grep -r -o foo a.log');
  ok('print only matches of foo in a.log with grep', 'grep -r -o foo a.log');
  ok('only the matching part of the regex v[0-9]+ in a.log, first 3', "rg 'v[0-9]+' a.log | head -n 3", "rg -o 'v[0-9]+' a.log | head -n 3");
});

test('git log --format= only on an only-the-file-names cue', () => {
  ok("just file names, wendy's changes under dist", 'git log --author=wendy --name-only -- dist',
    'git log --author=wendy --name-only --format= -- dist');
  ok('last 5 commits by judy, names only', 'git log -n 5 --author=judy --name-only');
  ok('only file names changed per commit under src', 'git log --name-only -- src');
  const d = decompile('git log --name-only --format= -- dist', env('only the file names under dist'));
  assert.deepEqual(d.ir.body.parts[0].stages[0].mods, [{ mod: 'name_only' }], '--format= is derived: stripped by decompile');
  const c = compile(d.ir, env('only the file names under dist'));
  assert.equal(c.text, 'git log --name-only --format= -- dist');
});

test('-o for "each / every (X) match", piped or not; not for matching lines', () => {
  ok('print each TODO match in a.log and its line number', 'rg -n TODO a.log', 'rg -o -n TODO a.log');
  ok('show every match of foo in a.log', 'rg foo a.log', 'rg -o foo a.log');
  ok('print each matching line of foo in a.log', 'rg foo a.log');
  ok('tail 15 of every rg match for foo in a.log', 'rg foo a.log | tail -n 15');
});

test('multi-file search into sort / uniq / freq derives --no-filename (rg -I / grep -h)', () => {
  ok('unique lines with TODO in src and lib', 'rg TODO src lib | sort -u', 'rg -I TODO src lib | sort -u');
  ok('sorted TODO lines', 'rg TODO | sort', 'rg -I TODO . | sort');
  ok('grep for TODO under docs, sorted', 'grep -r TODO docs | sort', 'grep -r -h TODO docs | sort');
  ok('sorted TODO lines in a.log', 'rg TODO a.log | sort');
  ok('sorted TODO lines in ~/.zshrc', 'rg TODO ~/.zshrc | sort');
  ok('TODO lines in src', 'rg TODO src');
  ok('which files match TODO in src, sorted', 'rg -l TODO src | sort');
  ok('sorted TODO lines in src with file names', 'rg TODO src | sort');
  const d = decompile('rg -I TODO src | sort', env('sorted TODO lines in src'));
  assert.ok(!d.ir.body.parts[0].stages[0].mods?.some((m) => m.mod === 'no_filename'), '-I is derived: stripped by decompile');
});
