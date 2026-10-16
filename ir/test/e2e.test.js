// End-to-end round trip over the §7 accepted examples (docs/IR.md §5.5, §6):
// decompile(compile(ir).text) equals canon(ir), and gate(request, ir) accepts with the §7 command.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas, compile, decompile, gate, canon, equals, toJSON } from '../lib/index.js';
import { OK_EXAMPLES, BASH, helpers } from './fixtures/gate_examples.js';

const schemas = loadSchemas();

for (const ex of OK_EXAMPLES) {
  test(`e2e §7 #${ex.n}: ${ex.request}`, () => {
    const env = { schemas, shell: 'bash', platform: 'linux_gnu', request: ex.request, pathExists: () => false, isDir: () => true };
    const ir = ex.ir(helpers(ex.request));
    const c = compile(ir, env);
    assert.ok(!c.error, c.error);
    if (BASH[ex.n]) assert.equal(c.text, BASH[ex.n]);
    const d = decompile(c.text, env);
    assert.ok(!d.error, `${d.error} (${d.reason})`);
    const want = canon(ir, { schemas, request: ex.request });
    assert.ok(equals(d.ir, want), `${toJSON(d.ir)}\n!=\n${toJSON(want)}`);
    const g = gate(ex.request, ir, env);
    assert.equal(g.accept, true, g.reasons.join(' / '));
    assert.equal(g.command, c.text);
  });
}
