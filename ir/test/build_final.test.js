import { test } from 'node:test';
import assert from 'node:assert/strict';
import { refIndex, refExclusion } from '../../scripts/ir/build_final.mjs';
import { normReq, skeleton } from '../../scripts/ir/dedup.mjs';

const pipe = (op, u) => ({ v: 1, status: 'ok', body: { k: 'and', parts: [{ k: 'pipe', stages: [{ k: 'exec', op, mods: [], args: { paths: [{ k: 'span', u, as: 'Path' }] } }] }] } });
const ref = refIndex([
  { request: 'list all files in the src folder recursively please', label: 'ok', ir: pipe('files.find', [5, 6]) },
  { request: 'what is the weather', label: 'not_shell', ir: null },
], 0.8);

test('refExclusion: same skeleton with different values is excluded', () => {
  const sk = skeleton(pipe('files.find', [2, 3]));
  assert.equal(refExclusion(ref, normReq('find stuff in lib'), [sk]), 'ref_skeleton');
});

test('refExclusion: exact and near request duplicates are excluded', () => {
  const other = skeleton(pipe('files.list', [0, 1]));
  assert.equal(refExclusion(ref, normReq('What is the  weather?'), []), 'ref_exact');
  assert.equal(refExclusion(ref, normReq('list all files in the src folder recursively please now'), [other]), 'ref_near');
});

test('refExclusion: unseen skeleton and request is kept', () => {
  assert.equal(refExclusion(ref, normReq('show disk usage of home'), [skeleton(pipe('files.list', [0, 1]))]), null);
});
