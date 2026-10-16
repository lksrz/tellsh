import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas } from '../lib/index.js';
import { rewriteRow, lint, adjudicationPlan } from '../../scripts/ir/gold_rewrite.mjs';

const schemas = loadSchemas();
const pipe = (...stages) => ({ v: 1, status: 'ok', body: { k: 'and', parts: [{ k: 'pipe', stages }] } });
const span = (a, as) => ({ k: 'span', u: [a, a + 1], as });
const row = (request, ir, command = 'x') => ({ request, label: 'ok', os: 'linux', ir, command, status: 'accepted', reasons: [] });

test('files_find: cue-less rg --files with a glob becomes find -type f -name', () => {
  const ir = pipe({ k: 'exec', op: 'files.list', mods: [{ mod: 'name_glob', values: [{ k: 'norm', kind: 'ext_glob', u: [1, 2] }] }], args: { paths: [span(4, 'Path')] } });
  const r = rewriteRow(row('list json files in packages/api', ir, "rg --files -g '*.json' packages/api"), schemas);
  assert.deepEqual(r.applied, ['files_find']);
  assert.equal(r.row.command, "find packages/api -type f -name '*.json'");
});

test('files_find: a directory exclusion becomes a prune', () => {
  const ir = pipe({ k: 'exec', op: 'files.list', mods: [{ mod: 'exclude_glob', values: [span(7, 'Glob')] }], args: { paths: [span(3, 'Path')] } });
  const r = rewriteRow(row('list files in ios but not the Pods folder', ir), schemas);
  assert.equal(r.row.command, 'find ios -type d -name Pods -prune -o -type f -print');
});

test('files_find: kept as rg when the request names rg semantics', () => {
  const ir = pipe({ k: 'exec', op: 'files.list', mods: [], args: { paths: [span(6, 'Path')] } });
  const r = rewriteRow(row('how many files rg would search in terraform', ir), schemas);
  assert.deepEqual(r.applied, []);
});

test('count_total: -c over a directory becomes | wc -l; a single file keeps -c', () => {
  const ir = pipe({ k: 'exec', op: 'text.search', mods: [{ mod: 'count' }], args: { pattern: [span(3, 'Pattern')], paths: [span(5, 'Path')] } });
  const r = rewriteRow(row('count lines with DEBUG in logs', ir), schemas);
  assert.deepEqual(r.applied, ['count_total']);
  assert.equal(r.row.command, 'rg DEBUG logs | wc -l');
  const f = rewriteRow(row('count lines with DEBUG in app.log', ir), schemas);
  assert.deepEqual(f.applied, []);
  const per = rewriteRow(row('count DEBUG lines per file in logs', pipe({ ...ir.body.parts[0].stages[0], args: { pattern: [span(1, 'Pattern')], paths: [span(6, 'Path')] } })), schemas);
  assert.deepEqual(per.applied, []);
});

test('drop_o: -o removed from a frequency pipeline over lines, kept for matches', () => {
  const ir = pipe({ k: 'exec', op: 'text.search', mods: [{ mod: 'only_matching' }], args: { pattern: [span(2, 'Pattern')], paths: [span(5, 'Path')] } }, { k: 'macro', id: 'freq' });
  const r = rewriteRow(row('frequency of WARNING lines in debug.log', ir), schemas);
  assert.deepEqual(r.applied, ['drop_o']);
  assert.ok(!/ -o /.test(r.row.command));
  const m = rewriteRow(row('frequency of WARNING matches in debug.log', ir), schemas);
  assert.deepEqual(m.applied, []);
});

test('scope_path: "the repo" path is dropped, bare "repo" stays', () => {
  const ir = pipe({ k: 'exec', op: 'files.find', mods: [{ mod: 'type', values: [{ k: 'const', id: 'f' }] }, { mod: 'newer', values: [span(3, 'Path')] }], args: { paths: [span(6, 'Path')] } });
  const r = rewriteRow(row('files newer than CHANGELOG.md under the repo', ir), schemas);
  assert.deepEqual(r.applied, ['scope_path']);
  assert.equal(r.row.command, 'find . -type f -newer CHANGELOG.md');
});

test('lint flags retired conventions', () => {
  const ir = pipe({ k: 'exec', op: 'files.list', mods: [], args: {} });
  assert.deepEqual(lint(row('list every file', ir, 'rg --files')), ['rg_files_cueless']);
  assert.deepEqual(lint({ ...row('x', null), label: 'ambiguous' }), []);
});

test('adjudicationPlan: train only, replace with a gate-accepted pred, drop when no pred is right', () => {
  const pred = pipe({ k: 'exec', op: 'file.tail', mods: [{ mod: 'lines', values: [{ k: 'norm', kind: 'int', u: [1, 2] }] }], args: { paths: [span(4, 'Path')] } });
  const req = 'last 20 lines of app.log';
  const adj = [
    { id: 'train:1', request: req, command: 'tail -n 20 app.log', goldLabel: 'ambiguous', gold_correct: false, pred_correct: true },
    { id: 'train:2', request: 'foo bar', command: 'ls', goldLabel: 'ok', gold_correct: false, pred_correct: false },
    { id: 'dev:3', request: 'baz', command: 'ls', goldLabel: 'ok', gold_correct: false, pred_correct: false },
  ];
  const kf = [{ src_id: 'train:1', os: 'linux', pred_ir: pred, pred_command: 'tail -n 20 app.log' }];
  const { plan, stats } = adjudicationPlan(adj, kf, schemas);
  assert.equal(plan.get('last 20 lines of app.log').action, 'replace');
  assert.equal(plan.get('foo bar').action, 'drop');
  assert.equal(plan.has('baz'), false);
  assert.equal(stats.replace, 1);
});
