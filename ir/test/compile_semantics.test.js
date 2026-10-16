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
