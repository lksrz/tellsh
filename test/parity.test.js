// JS inference over the TSH2 model must reproduce the probabilities computed by scripts/train.py
// (same features: they are produced by src/features.js for both training and inference).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { normalize, fnv1a } from '../src/features.js';
import { getModel, predictProba } from '../src/model.js';

const fx = JSON.parse(readFileSync(new URL('./fixtures/parity.json', import.meta.url), 'utf8'));

test('fnv1a matches known vectors', () => {
  assert.equal(fnv1a(''), 0x811c9dc5);
  assert.equal(fnv1a('a'), 0xe40c292c);
  assert.equal(fnv1a('foobar'), 0xbf9cf968);
});

test('normalize folds Polish diacritics and digits', () => {
  assert.equal(normalize('Pokaż ŻÓŁĆ gęślą jaźń 123 plików!'), 'pokaz zolc gesla jazn 0 plikow');
});

test('classifier models (tool + intent) match Python probabilities', () => {
  const model = getModel();
  assert.ok(fx.cls.length >= 30);
  for (const s of fx.cls) {
    const m = model.models[s.model];
    const p = predictProba(m, s.f);
    for (const [label, pp] of s.top) {
      const i = m.labels.indexOf(label);
      assert.ok(Math.abs(p[i] - pp) < 1e-5, `${s.model} ${label}: ${p[i]} vs ${pp}`);
    }
  }
});

test('tagger matches Python probabilities', () => {
  const m = getModel().models.tagger;
  assert.ok(fx.tag.length > 0);
  for (const s of fx.tag) {
    const p = predictProba(m, s.f);
    for (const [label, pp] of s.top) assert.ok(Math.abs(p[m.labels.indexOf(label)] - pp) < 1e-5);
  }
});
