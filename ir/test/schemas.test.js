import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  loadSchemas, validateSchema, formatProblem, opSchema, realize, stdoutOf, acceptsStream,
  pipeIllegal, eachIllegal, valueActions, exec, optionSpec,
} from '../lib/index.js';

test('all 17 schemas load clean', () => {
  const { registry, problems } = loadSchemas(undefined, { strict: false });
  assert.deepEqual(problems.map(formatProblem), []);
  assert.equal(registry.stats.tools, 17);
  assert.equal(registry.stats.ops, 26);
  assert.equal(registry.stats.mods, 113);
  assert.equal(registry.stats.optionEntries, 179);
  assert.match(registry.hash, /^[0-9a-f]{64}$/);
});

test('validator reports concrete problems', () => {
  const bad = {
    schema_version: 1, tool: 'x', binary: 'x', versions: {}, platforms: { linux_gnu: 'ok', darwin_bsd: 'maybe' },
    ops: { 'x.y': {
      realization: 'default', argv_prefix: [], gloss: 'g', effects: ['read_fs'],
      stdin: { accepts: [], when: 'never' }, stdout: 'lines', no_operands: 'cwd',
      positionals: [{ role: 'p', type: 'Pattern', arity: [1, 1], leading_dash: 'eoo' }],
      options: [
        { mod: 'a', flag: '-a', form: 'sep', model: 'predict' },
        { mod: 'b', flag: '-b', form: 'bool', model: 'predict', cue: 'NOPE' },
      ],
      rules: [{ excl: ['a', 'zz'] }],
    } },
  };
  const msgs = validateSchema(bad, 'x.json').map((p) => `${p.path}: ${p.msg}`);
  assert.ok(msgs.includes('$.platforms.darwin_bsd: must be ok|absent'));
  assert.ok(msgs.some((m) => m.includes('Pattern positional needs a dialect')));
  assert.ok(msgs.some((m) => m.includes('form sep needs a value spec')));
  assert.ok(msgs.some((m) => m.includes('unknown cue class "NOPE"')));
  assert.ok(msgs.some((m) => m.includes('unknown mod "zz"')));
});

test('realization (§5.2)', () => {
  const reg = loadSchemas();
  const ts = exec('text.search');
  assert.equal(realize(reg, ts, 'first').tool, 'rg');
  assert.equal(realize(reg, ts, 'filter').tool, 'grep');
  assert.equal(realize(reg, ts, 'each').tool, 'rg');
  assert.equal(realize(reg, exec('text.search', { pin: 'grep' }), 'first').tool, 'grep');
  assert.equal(realize(reg, exec('git.log'), 'first').tool, 'git');
  assert.ok(realize(reg, exec('nope.op'), 'first').error);
  assert.ok(realize(reg, exec('git.log', { pin: 'rg' }), 'first').error);
});

test('stream typing (§3)', () => {
  const reg = loadSchemas();
  const rg = opSchema(reg, 'rg', 'text.search');
  const grep = opSchema(reg, 'grep', 'text.search');
  const head = opSchema(reg, 'head', 'file.head');
  const tail = opSchema(reg, 'tail', 'file.tail');
  const wc = opSchema(reg, 'wc', 'file.count');
  const sort = opSchema(reg, 'sort', 'lines.sort');
  const jq = opSchema(reg, 'jq', 'json.select');
  const curlGet = opSchema(reg, 'curl', 'http.get');
  const find = opSchema(reg, 'find', 'files.find');
  const ls = opSchema(reg, 'ls', 'dir.list');
  const git = opSchema(reg, 'git', 'git.log');

  assert.equal(stdoutOf(rg, []), 'lines');
  assert.equal(stdoutOf(rg, ['files_with_matches']), 'paths');
  assert.equal(stdoutOf(rg, ['files_with_matches', 'null']), 'paths0');
  assert.equal(stdoutOf(head, [], 'paths'), 'paths');
  assert.equal(stdoutOf(tail, ['follow']), 'endless');
  assert.equal(stdoutOf(curlGet, []), 'bytes');
  assert.equal(stdoutOf(curlGet, ['include_headers']), 'lines');

  assert.ok(acceptsStream(wc, 'paths'));
  assert.ok(acceptsStream(head, 'endless'));
  assert.ok(acceptsStream(grep, 'endless'));
  assert.ok(!acceptsStream(sort, 'endless'));
  assert.ok(!acceptsStream(wc, 'endless'));
  assert.ok(!acceptsStream(tail, 'endless'));
  assert.ok(acceptsStream(jq, 'bytes'));
  assert.ok(!acceptsStream(head, 'bytes'));
  assert.ok(!acceptsStream(git, 'lines'));

  assert.equal(pipeIllegal('lines', wc), null);
  assert.match(pipeIllegal('lines', wc, { hasFileOperands: true }), /no file operands/);
  assert.match(pipeIllegal('lines', grep, { consumerMods: ['files_with_matches'] }), /illegal on stdin/);
  assert.match(pipeIllegal('paths0', wc), /compiler-only/);

  assert.equal(eachIllegal(rg, 'paths', wc, ['lines']), null);
  assert.equal(eachIllegal(find, 'paths', head, ['lines']), null);
  assert.match(eachIllegal(ls, 'lines', wc), /no NUL variant/);
  assert.match(eachIllegal(rg, 'lines', wc), /paths stream/);
  assert.match(eachIllegal(rg, 'paths', sort), /not each_ok/);
  assert.match(eachIllegal(rg, 'paths', tail, ['follow']), /endless/);
});

test('value actions (§4.5)', () => {
  const reg = loadSchemas();
  assert.deepEqual(valueActions(optionSpec(reg, 'find', 'files.find', 'modified_within_days').value).norms, ['age_days']);
  assert.deepEqual(valueActions(optionSpec(reg, 'rg', 'text.search', 'max_depth').value).norms, ['int', 'scope_top']);
  const sig = valueActions(optionSpec(reg, 'pkill', 'proc.kill', 'signal').value);
  assert.deepEqual(sig, { span: false, norms: ['signal'], consts: [] });
  assert.deepEqual(valueActions(optionSpec(reg, 'find', 'files.find', 'type').value).consts, ['f', 'd', 'l']);
  assert.equal(valueActions({ type: 'Glob' }).span, true);
});
