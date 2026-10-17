// accountability.js CUE_KEYS (docs/ir_error_taxonomy_v4.md fix 10): an op cue the IR does not hold is uncovered.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas, gate, decompile, lift } from '../lib/index.js';

const schemas = loadSchemas();
function check(request, command) {
  const env = { schemas, shell: 'bash', platform: 'linux_gnu', request };
  const d = decompile(command, env);
  assert.ok(!d.error, `decompile ${command}: ${d.error}`);
  return gate(request, lift(schemas, d.ir, request), env);
}
const ok = (q, c) => { const r = check(q, c); assert.equal(r.accept, true, `${q} -> ${c}: ${r.reasons.join(' / ')}`); };
const no = (q, c, re) => { const r = check(q, c); assert.equal(r.accept, false, `expected a reject: ${q} -> ${c}`); assert.match(r.reasons.join(' / '), re); };

test('fix 10: op cues need their op', () => {
  no('give me a preview of notes.md', 'tail notes.md', /preview/);
  ok('give me a preview of notes.md', 'head notes.md');
  ok('files where array_map is at the start of a line', "rg -l '^array_map' .");
  ok('symlinks under src', 'find src -type l');
  no('which processes are alive', 'ls', /uncovered_content/);
});
