import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  loadSchemas, canon, program, pipe, exec, each, freq, mod, span, norm, cnst, lit, abstain,
  toJSON, fromJSON, equals, validateShape, IRError, segment,
} from '../lib/index.js';

const schemas = loadSchemas();
const unitIndex = (request, word) => segment(request).units.findIndex((u) => u.t === word);

test('§4.4 example canonicalizes to value strings', () => {
  const request = 'which files mention useEffect, skip node_modules';
  const ir = fromJSON('{"v":1,"status":"ok","body":{"k":"and","parts":[{"k":"pipe","stages":[{"k":"exec","op":"text.search","mods":[{"mod":"files_with_matches"},{"mod":"exclude_dir","values":[{"k":"span","u":[6,7],"as":"Name"}]}],"args":{"pattern":[{"k":"span","u":[3,4],"as":"Pattern"}]}}]}]}}');
  const c = canon(ir, { schemas, request });
  assert.deepEqual(c.body.parts[0].stages[0], {
    k: 'exec', op: 'text.search',
    // exclude_dir collapses into exclude_glob for rg (same_argv_as)
    mods: [{ mod: 'files_with_matches' }, { mod: 'exclude_glob', values: [lit('node_modules')] }],
    args: { pattern: [lit('useEffect', 'literal')] },
  });
  assert.ok(equals(canon(c, { schemas }), c), 'idempotent');
});

test('mods sorted into schema order, values and mods deduped', () => {
  const request = 'git log by alice alice';
  const ir = program(exec('git.log', {
    mods: [mod('max_count', [lit('5')]), mod('oneline'), mod('author', [span(3, 4, 'Name'), span(4, 5, 'Name')]), mod('oneline')],
  }));
  const c = canon(ir, { schemas, request });
  assert.deepEqual(c.body.parts[0].stages[0].mods, [
    { mod: 'oneline' }, { mod: 'max_count', values: [lit('5')] }, { mod: 'author', values: [lit('alice')] },
  ]);
});

test('same_argv_as collapse is per realized tool (grep keeps exclude_dir)', () => {
  const ir = program(pipe(exec('proc.list'), exec('text.search', {
    mods: [mod('exclude_dir', [lit('x')])], args: { pattern: [lit('redis')] },
  })));
  // grep (stdin filter) supports exclude_dir natively; no collapse
  const c = canon(ir, { schemas });
  assert.equal(c.body.parts[0].stages[1].mods[0].mod, 'exclude_dir');
});

test('norms are recomputed from their source span', () => {
  const request = 'files bigger than 50mb, not in node_modules';
  const ir = program(exec('files.find', {
    mods: [mod('size_gt', [norm('size', 3, 4)]), mod('type', [cnst('f')]),
      mod('exclude_dir', [span(unitIndex(request, 'node_modules'), unitIndex(request, 'node_modules') + 1, 'Name')])],
  }));
  const c = canon(ir, { schemas, request });
  assert.deepEqual(c.body.parts[0].stages[0].mods, [
    { mod: 'exclude_dir', values: [lit('node_modules')] },
    { mod: 'type', values: [lit('f')] },
    { mod: 'size_gt', values: [lit('52428800')] },
  ]);
});

test('pkind: anchored normalizer gives regex; regex without metachar folds to literal', () => {
  const request = 'lines starting with import in main.ts';
  const ir = program(exec('text.search', { args: { pattern: [norm('starts_with', 3, 4)], paths: [span(5, 6, 'Path')] } }));
  const c = canon(ir, { schemas, request });
  assert.deepEqual(c.body.parts[0].stages[0].args, { paths: [lit('main.ts')], pattern: [lit('^import', 'regex')] });

  const ir2 = program(exec('text.search', { args: { pattern: [lit('foo', 'regex')] } }));
  assert.deepEqual(canon(ir2, { schemas }).body.parts[0].stages[0].args.pattern, [lit('foo', 'literal')]);
  const ir3 = program(exec('text.search', { args: { pattern: [lit('a.b*', 'regex')] } }));
  assert.deepEqual(canon(ir3, { schemas }).body.parts[0].stages[0].args.pattern, [lit('a.b*', 'regex')]);
});

test('starts_with escapes per realized dialect (grep: ERE)', () => {
  const request = 'use grep for lines starting with a.b';
  const ir = program(exec('text.search', { pin: 'grep', args: { pattern: [norm('starts_with', 6, 7)] } }));
  assert.deepEqual(canon(ir, { schemas, request }).body.parts[0].stages[0].args.pattern, [lit('^a\\.b', 'regex')]);
});

test('no semantic rewrites: git log | head stays two stages', () => {
  const ir = program(pipe(exec('git.log'), exec('file.head', { mods: [mod('lines', [lit('20')])] })));
  const c = canon(ir, { schemas });
  assert.equal(c.body.parts[0].stages.length, 2);
});

test('each, macro and cwd are canonicalized', () => {
  const request = 'in web count lines of access.log';
  const ir = program(pipe(freq([span(5, 6, 'Path'), span(5, 6, 'Path')]), exec('file.head', { mods: [mod('lines', [lit('10')])] })), { cwd: span(1, 2, 'Path') });
  const c = canon(ir, { schemas, request });
  assert.deepEqual(c.cwd, lit('web'));
  assert.deepEqual(c.body.parts[0].stages[0], { k: 'macro', id: 'freq', args: { paths: [lit('access.log')] } });

  const ir2 = program(pipe(exec('text.search', { mods: [mod('files_with_matches')], args: { pattern: [lit('x')] } }), each(exec('file.count', { mods: [mod('lines')] }))));
  assert.equal(canon(ir2, { schemas }).body.parts[0].stages[1].exec.mods[0].mod, 'lines');
});

test('failures carry labels', () => {
  const request = 'show the previous commit';
  const bad = program(exec('git.show', { args: { rev: [norm('rev_rel', 2, 4)] } }));
  assert.throws(() => canon(bad, { schemas, request }), (e) => e instanceof IRError && e.label === 'ambiguous');
  assert.throws(() => canon(program(exec('git.log', { mods: [mod('hidden')] })), { schemas }), IRError);
  assert.throws(() => canon(program(exec('files.find', { mods: [mod('type', [cnst('x')])] })), { schemas }), IRError);
});

test('abstentions pass through; JSON round-trip and shape checks', () => {
  const a = abstain('underspecified', { missing: ['pattern'] });
  assert.deepEqual(canon(a, { schemas }), { v: 1, status: 'underspecified', missing: ['pattern'] });
  const ir = program(exec('git.log', { mods: [mod('oneline')] }));
  assert.ok(equals(fromJSON(toJSON(ir)), ir));
  assert.match(validateShape({ v: 1, status: 'ok', body: { k: 'and', parts: [] } }).join(), /0 parts/);
  assert.throws(() => fromJSON({ v: 1, status: 'ok', body: { k: 'and', parts: [{ k: 'pipe', stages: [{ k: 'each', exec: exec('x') }] }] } }), /first stage/);
  assert.throws(() => fromJSON('{'), IRError);
});
