// scripts/train.py must never overwrite a shipped model under model/ unless --replace-shipped is passed
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const hasDeps = spawnSync('python3', ['-c', 'import numpy, scipy, sklearn'], { encoding: 'utf8' }).status === 0;

test('train.py refuses to overwrite model/model.bin', { skip: !hasDeps && 'python3 with numpy/scipy/sklearn not available' }, () => {
  for (const out of [[], ['--out', 'model/model.bin'], ['--out', 'model/model_templates.bin']]) {
    const r = spawnSync('python3', ['scripts/train.py', ...out], { cwd: ROOT, encoding: 'utf8' });
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /refusing to overwrite the shipped model\//);
  }
});

test('npm run train writes to build/, not model/', async () => {
  const { readFileSync } = await import('node:fs');
  const pkg = JSON.parse(readFileSync(`${ROOT}package.json`, 'utf8'));
  assert.match(pkg.scripts.train, /train\.py --out build\/model\.bin/);
});
