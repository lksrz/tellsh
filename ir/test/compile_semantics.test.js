// compile.js product semantics from taxonomy v2: F1 (files + name exclusion -> -type f).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas, compile, decompile, equals, program, exec, mod, lit, cnst } from '../lib/index.js';

const schemas = loadSchemas();
const env = (o = {}) => ({ schemas, shell: 'bash', platform: 'linux_gnu', ...o });
const notMd = (extra = []) => program(exec('files.find', { mods: [mod('exclude_glob', [lit('*.md')]), ...extra] }));

test('F1: a files request with -not -name lists regular files', () => {
  const r = compile(notMd(), env({ request: 'files except markdown' }));
  assert.equal(r.text, "find . -type f -not -name '*.md'");
  const d = decompile(r.text, env());
  assert.ok(d.ir && equals(d.ir, r.canonical), 'round-trips to the canonical IR');
  assert.equal(compile(notMd(), env({ request: 'everything except markdown' })).text, "find . -not -name '*.md'");
  assert.equal(compile(notMd(), env({ request: 'files and directories except markdown' })).text, "find . -not -name '*.md'");
  assert.equal(compile(notMd(), env()).text, "find . -not -name '*.md'");
  assert.equal(compile(notMd([mod('type', [cnst('d')])]), env({ request: 'files' })).text, "find . -type d -not -name '*.md'");
});

// ---------- taxonomy v4 fix 2: derived, request-aware mods (no new predicted mod, v4 checkpoints unchanged) ----------
const rt = (r) => { const d = decompile(r.text, env()); assert.ok(d.ir && equals(d.ir, r.canonical), `round-trips: ${r.text}`); };
const v4span = (a, as) => ({ k: 'span', u: [a, a + 1], as });

test('v4: git log --merges with a file list derives --diff-merges=first-parent', () => {
  const ir = program(exec('git.log', { mods: [mod('merges_only'), mod('name_only')], args: { rev: [v4span(4, 'Rev')] } }));
  const r = compile(ir, env({ request: 'merge commits only on main with file names' }));
  assert.equal(r.text, 'git log --merges --diff-merges=first-parent --name-only main --');
  rt(r);
  const plain = program(exec('git.log', { mods: [mod('merges_only')] }));
  assert.equal(compile(plain, env({ request: 'merge commits' })).text, 'git log --merges');
});

test('v4: ls -a on an every-entry cue, never with hidden (-A)', () => {
  const ls = (mods, req, at = 2) => compile(program(exec('dir.list', { mods, args: { paths: [v4span(at, 'Path')] } })), env({ request: req }));
  const r = ls([mod('one_per_line'), mod('reverse')], 'all of pkg one per line reverse');
  assert.equal(r.text, 'ls -a -r1 pkg');
  rt(r);
  assert.equal(ls([], 'list . and .. in pkg', 6).text, 'ls -a pkg');
  assert.equal(ls([mod('hidden')], 'all of pkg with hidden').text, 'ls -A pkg');
  assert.equal(ls([], 'list all of the pkg files', 4).text, 'ls pkg');
});

test('v4: a literal cue renders -F even without a metacharacter', () => {
  const g = compile(program(exec('git.log', { mods: [mod('grep_message', [v4span(2, 'Pattern')])] })), env({ request: 'commits mentioning tenant_id, literal match' }));
  assert.equal(g.text, 'git log -F --grep=tenant_id');
  rt(g);
  const s = (req) => compile(program(exec('text.search', { args: { pattern: [v4span(4, 'Pattern')], paths: [v4span(6, 'Path')] } })), env({ request: req })).text;
  assert.equal(s('search the literal string CRITICAL in out'), 'rg -F CRITICAL out');
  assert.equal(s('search the plain string CRITICAL in out'), 'rg CRITICAL out');
});

test('v4: a multi-extension language names all its globs (elixir -> *.ex, *.exs)', () => {
  const req = 'search XXX in elixir files tests/unit';
  const ext = { k: 'norm', kind: 'ext_glob', u: [3, 4] };
  const r = compile(program(exec('text.search', { mods: [mod('name_glob', [ext])], args: { pattern: [v4span(1, 'Pattern')], paths: [v4span(5, 'Path')] } })), env({ request: req }));
  assert.equal(r.text, "rg -g '*.ex' -g '*.exs' XXX tests/unit");
  rt(r);
  const f = compile(program(exec('files.find', { mods: [mod('name_glob', [ext])], args: { paths: [v4span(5, 'Path')] } })), env({ request: req }));
  assert.equal(f.text, "find tests/unit -type f \\( -name '*.ex' -o -name '*.exs' \\)");
  rt(f);
});
