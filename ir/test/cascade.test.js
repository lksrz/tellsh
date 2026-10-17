// scripts/ir/cascade_lib.mjs: cascade stratum selection, summary, --adj-strata estimator.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpUpper, auditSize, cascadeStrata, cascadeSummary, auditStats, strataEstimate } from '../../scripts/ir/cascade_lib.mjs';

test('auditSize: fraction clamped to [min, max] and to the passed count', () => {
  assert.equal(auditSize(10000, 0.05, 50, 200), 200);
  assert.equal(auditSize(2000, 0.05, 50, 200), 100);
  assert.equal(auditSize(300, 0.05, 50, 200), 50);
  assert.equal(auditSize(30, 0.05, 50, 200), 30);
});

test('cascadeStrata: flagged below threshold (null = flagged), cap, audit among passed, seeded', () => {
  const ps = [0.1, 0.9, null, 0.8, 0.72, 0.73, 0.95, 0.2];
  const s = cascadeStrata(ps, { threshold: 0.73, maxOpus: 10, audit: 0.5, auditMin: 1, auditMax: 2, seed: 3 });
  assert.deepEqual([0, 2, 4, 7].map((i) => s[i]), ['flagged', 'flagged', 'flagged', 'flagged']);
  assert.equal([1, 3, 5, 6].filter((i) => s[i] === 'audit').length, 2);
  assert.equal(s.filter((x) => x === 'passed').length, 2);
  const c = cascadeStrata(ps, { threshold: 0.73, maxOpus: 3, audit: 0, auditMin: 0, auditMax: 0, seed: 3 });
  assert.equal(c.filter((x) => x === 'flagged').length, 3);
  assert.equal(c.filter((x) => x === 'flagged_jev_only').length, 1);
  assert.deepEqual(cascadeStrata(ps, { threshold: 0.73, maxOpus: 3, seed: 3, auditMin: 1, auditMax: 2 }),
    cascadeStrata(ps, { threshold: 0.73, maxOpus: 3, seed: 3, auditMin: 1, auditMax: 2 }));
});

test('cascadeSummary: audit miss rate + CP UB, overturn rate', () => {
  const recs = [
    { stratum: 'audit', judge: 'opus', pred_correct: false }, { stratum: 'audit', judge: 'opus', pred_correct: true },
    { stratum: 'flagged', judge: 'opus', pred_correct: true }, { stratum: 'flagged', judge: 'opus', pred_correct: false },
    { stratum: 'flagged', judge: 'opus', pred_correct: false }, { stratum: 'passed', judge: 'jev', pred_correct: true },
  ];
  const s = cascadeSummary(recs);
  assert.deepEqual(s.strata, { flagged: 3, flagged_jev_only: 0, audit: 2, passed: 1 });
  assert.equal(s.audit.miss_rate, 0.5);
  assert.equal(s.audit.miss_ub95, +cpUpper(1, 2).toFixed(4));
  assert.equal(s.flagged_opus.overturn_rate, 0.3333);
  assert.equal(s.judge.opus, 5);
});

test('strataEstimate: observed wrongs + unaudited Jev-passed x miss rate; conservative UB', () => {
  const adj = new Map([
    ['a', { command: 'x', stratum: 'passed', judge: 'jev' }], ['b', { command: 'x', stratum: 'passed', judge: 'jev' }],
    ['c', { command: 'x', stratum: 'audit', judge: 'opus', pred_correct: false }], ['d', { command: 'x', stratum: 'audit', judge: 'opus', pred_correct: true }],
    ['e', { command: 'x', stratum: 'flagged', judge: 'opus', pred_correct: false }],
  ]);
  const audit = auditStats(adj);
  assert.deepEqual([audit.n, audit.miss, audit.rate], [2, 1, 0.5]);
  const kept = [{ id: 'a', command: 'x', ya: true }, { id: 'b', command: 'y', ya: true }, { id: 'c', command: 'x', ya: false },
    { id: 'd', command: 'x', ya: true }, { id: 'e', command: 'x', ya: false }];
  const r = strataEstimate(kept, adj, audit);
  assert.equal(r.jev_unaudited_kept, 1);  // b: other command -> not the cascade's row
  assert.equal(r.adj_wrong_obs, 2);
  assert.equal(r.adj_wrong_est, 2.5);
  assert.equal(r.adj_wrong_est_rate, 50);
  assert.equal(r.adj_ub95_est, +((100 * Math.min(5, cpUpper(2, 5) * 5 + audit.ub95)) / 5).toFixed(3));
});
