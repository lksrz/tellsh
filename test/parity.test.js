// JS feature extraction + inference must reproduce the Python training pipeline exactly.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { vectorize, normalize, fnv1a } from '../src/features.js';
import { classify, getModel } from '../src/classifier.js';

const fx = JSON.parse(readFileSync(new URL('./fixtures/parity.json', import.meta.url), 'utf8'));

test('fnv1a matches known vectors', () => {
  assert.equal(fnv1a(''), 0x811c9dc5);
  assert.equal(fnv1a('a'), 0xe40c292c);
  assert.equal(fnv1a('foobar'), 0xbf9cf968);
});

test('normalize folds Polish diacritics and digits', () => {
  assert.equal(normalize('Pokaż ŻÓŁĆ gęślą jaźń 123 plików!'), 'pokaz zolc gesla jazn 0 plikow');
});

test('hashed features identical to Python for every fixture sample', () => {
  for (const s of fx.samples) {
    const js = [...vectorize(s.text, fx.dim).entries()].sort((a, b) => a[0] - b[0]);
    assert.equal(js.length, s.features.length, `feature count for ${JSON.stringify(s.text)}`);
    js.forEach(([k, v], i) => {
      assert.equal(k, s.features[i][0], `index for ${JSON.stringify(s.text)}`);
      assert.ok(Math.abs(v - s.features[i][1]) < 1e-12, `value for ${JSON.stringify(s.text)}`);
    });
  }
});

test('quantised model probabilities match Python', () => {
  const model = getModel();
  assert.equal(model.dim, fx.dim);
  for (const s of fx.samples) {
    const r = classify(s.text, { top: 3 });
    assert.equal(r.top[0].intent, s.top[0][0], `top-1 for ${JSON.stringify(s.text)}`);
    for (let i = 0; i < 3; i++) {
      assert.equal(r.top[i].intent, s.top[i][0]);
      assert.ok(Math.abs(r.top[i].p - s.top[i][1]) < 1e-5, `p mismatch for ${JSON.stringify(s.text)}: ${r.top[i].p} vs ${s.top[i][1]}`);
    }
  }
});
