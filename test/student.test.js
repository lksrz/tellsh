import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { suggestHybrid, suggestLazy, rerank, POLICY, _resetLazy } from '../src/rerank/hybrid.js';
import { suggest } from '../src/pipeline.js';
import { findStudentDir, loadStudent } from '../src/rerank/student.js';
import { NONE } from '../src/tools.js';

const env = { shell: 'bash', os: 'linux' };
const P = POLICY['A+S'];
const c0 = (conf, intent = 'git_status', topTool = 'git') => ({ confidence: conf, topTool, intent, tool: 'git', tools: [], top: [{ intent, p: conf }] });

test('A+S: below tau the student replaces A with its own in-catalog argmax', () => {
  const r = rerank(c0(0.45), { largest_dirs: 0.8, git_status: 0.1 }, P, { thr: 0.3 });
  assert.equal(r.intent, 'largest_dirs');
  assert.ok(r.reranked && r.confidence >= 0.3);
});

test('A+S: confident A, unconvinced student, "not a shell request" and unknown intents keep A untouched', () => {
  const hi = c0(0.7);
  assert.equal(rerank(hi, { largest_dirs: 0.99 }, P, { thr: 0.3 }), hi);
  const lo = c0(0.45);
  assert.equal(rerank(lo, { largest_dirs: 0.4 }, P, { thr: 0.3 }), lo); // p < accept
  assert.equal(rerank(lo, { largest_dirs: 0.9 }, P, { thr: 0.3, pNone: 0.7 }), lo); // student says none
  // an intent this catalog does not have (newer/older bundle) is never chosen
  assert.equal(rerank(lo, { not_in_catalog_xyz: 0.99, git_status: 0.01 }, P, { thr: 0.3 }).intent, 'git_status');
});

test('A+S: A rejections stay rejections (rescue: false), also via keepNone', () => {
  const rej = c0(0.1);
  assert.equal(rerank(rej, { largest_dirs: 0.99 }, P, { thr: 0.3 }), rej);
  const none = c0(0.1, 'git_status', NONE);
  assert.equal(rerank(none, { largest_dirs: 0.99 }, P, { thr: 0.3 }), none);
});

test('A+S-full: the disagreement rule replaces a confident A only with a confident, different student answer', () => {
  const F = POLICY['A+S-full'];
  const hi = c0(0.8);
  assert.equal(rerank(hi, { largest_dirs: 0.95 }, F, { thr: 0.3 }).intent, 'largest_dirs');
  assert.equal(rerank(hi, { largest_dirs: 0.85 }, F, { thr: 0.3 }), hi);
  assert.equal(rerank(hi, { git_status: 0.99 }, F, { thr: 0.3 }), hi);
  assert.equal(rerank(hi, { largest_dirs: 0.95 }, F, { thr: 0.3, pNone: 0.6 }), hi);
});

const spy = () => { const s = { n: 0, infer: async () => { s.n++; return { intents: { largest_dirs: 0.9 }, pNone: 0 }; } }; return s; };

test('A+S: the student is not called for confident answers or for rejections', async () => {
  const s = spy();
  const a = await suggestHybrid('show git status', { env, system: 'A+S', encoder: s });
  assert.equal(a.intent, 'git_status');
  const b = await suggestHybrid('jak się masz', { env, system: 'A+S', encoder: s });
  assert.equal(b.understood, false);
  assert.equal(s.n, 0);
});

test('suggestLazy: missing runtime/bundle, a failing loader or a failing model all degrade to A', async () => {
  const q = 'show git status';
  const a = suggest(q, { env });
  for (const load of [async () => null, async () => { throw new Error('boom'); }, async () => ({ infer: async () => { throw new Error('ort'); } })]) {
    _resetLazy();
    // A+S-full calls the student on every query, so each failure mode is exercised
    const r = await suggestLazy(q, { env, system: 'A+S-full', load: async () => { try { return await load(); } catch { return null; } } });
    assert.equal(r.intent, a.intent);
    assert.equal(r.command, a.command);
    assert.equal(r.hybrid.system, 'A');
    assert.match(r.hybrid.unavailable, /student/);
  }
  _resetLazy();
});

test('suggestLazy loads the model once and only when needed', async () => {
  _resetLazy();
  let loads = 0;
  const load = async () => { loads++; return spy(); };
  await suggestLazy('show git status', { env, system: 'A+S', load });
  assert.equal(loads, 0);
  await suggestLazy('show git status', { env, system: 'A+S-full', load });
  await suggestLazy('show git log', { env, system: 'A+S-full', load });
  assert.equal(loads, 1);
  _resetLazy();
});

test('student bundle lookup: incomplete directories are skipped, and loading never falls back to another bundle', async () => {
  const d = mkdtempSync(join(tmpdir(), 'tellsh-stu-'));
  writeFileSync(join(d, 'vocab.json'), '{}'); // no student.bin, no labels.json
  const found = findStudentDir(d);
  assert.notEqual(found, d);
  if (found !== null) for (const f of ['student.bin', 'vocab.json', 'labels.json']) assert.ok(existsSync(join(found, f)), f);
  const bad = join(d, 'bad'); mkdirSync(bad);
  for (const f of ['student.bin', 'vocab.json', 'labels.json']) writeFileSync(join(bad, f), 'garbage');
  const old = { S: process.env.TELLSH_STUDENT_DIR };
  process.env.TELLSH_STUDENT_DIR = bad;
  try {
    assert.equal(findStudentDir(), bad);
    assert.equal(await loadStudent(), null); // corrupt model -> null, never a throw
  } finally { if (old.S === undefined) delete process.env.TELLSH_STUDENT_DIR; else process.env.TELLSH_STUDENT_DIR = old.S; }
});

test('CLI: TELLSH_HYBRID=0 and a broken student bundle both answer with A alone', () => {
  const d = mkdtempSync(join(tmpdir(), 'tellsh-stu-'));
  for (const f of ['student.bin', 'vocab.json', 'labels.json']) writeFileSync(join(d, f), 'garbage');
  const run = (extra) => spawnSync(process.execPath, ['bin/tellsh.js', '--json', 'show git status'], { encoding: 'utf8', env: { ...process.env, ...extra } });
  const off = JSON.parse(run({ TELLSH_HYBRID: '0' }).stdout);
  assert.equal(off.intent, 'git_status');
  assert.equal(off.hybrid, undefined);
  const r = run({ TELLSH_HYBRID: 'student-full', TELLSH_STUDENT_DIR: d });
  assert.equal(r.status, 0);
  const j = JSON.parse(r.stdout);
  assert.equal(j.intent, 'git_status');
  assert.equal(j.hybrid.system, 'A');
});

const real = await loadStudent();
test('A+S with the real student bundle (skipped without student.bin)', { skip: !real }, async () => {
  const p = await real.infer('pokaż status repozytorium git', env);
  assert.ok(p.intents.git_status > 0.5);
  const r = await suggestHybrid('show git status', { env, system: 'A+S', encoder: real });
  assert.equal(r.intent, 'git_status');
});

test('A+S: a low-confidence answered query is deferred to the student, and the pipeline rebuilds the command', async () => {
  const { readFileSync, readdirSync } = await import('node:fs');
  const rows = readdirSync('data/eval').flatMap((f) => readFileSync(join('data/eval', f), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)));
  let q = null;
  for (const r of rows) {
    let seen; let thr;
    suggest(r.text, { env, rerankTop: 0, rerank: (c, o) => { seen = c; thr = o.thr; return c; } });
    if (seen && seen.confidence >= thr && seen.confidence < 0.6 && seen.intent !== 'largest_dirs') { q = r.text; break; }
  }
  assert.ok(q, 'no low-confidence eval query found');
  const s = spy();
  const r = await suggestHybrid(q, { env, system: 'A+S', encoder: s });
  assert.equal(s.n, 1);
  assert.equal(r.hybrid.deferred, true);
  assert.equal(r.intent, 'largest_dirs');
  assert.ok(r.command);
});

test('A+S: pipeline refusals above the threshold (gh_pr_* guards) are never handed to the student', async () => {
  for (const q of ['revert pr 45', 'approve pr']) {
    const a = suggest(q, { env });
    assert.equal(a.understood, false, `A refuses ${q}`);
    for (const system of ['A+S', 'A+S-full']) {
      const s = { n: 0, infer: async () => { s.n++; return { intents: { git_revert: 0.99, delete_dir: 0.99 }, pNone: 0 }; } };
      const r = await suggestHybrid(q, { env, system, encoder: s });
      assert.equal(r.understood, false, `${system} ${q}`);
      assert.equal(s.n, 0);
    }
  }
});

test('A+S: disagreement never replaces a rejection, even with a threshold above tau', () => {
  const rej = c0(0.7);
  assert.equal(rerank(rej, { largest_dirs: 0.99 }, POLICY['A+S-full'], { thr: 0.8 }), rej);
});

test('A+S: consulting the student without changing the answer is not "deferred" (--yes keeps working)', async () => {
  const s = { n: 0, infer: async () => { s.n++; return { intents: { git_status: 0.99 }, pNone: 0 }; } };
  const r = await suggestHybrid('show git status', { env, system: 'A+S-full', encoder: s });
  assert.equal(s.n, 1);
  assert.equal(r.hybrid.deferred, false);
  assert.equal(r.hybrid.consulted, true);
});

test('suggestLazy: concurrent first calls share one load; a throwing loader degrades to A', async () => {
  _resetLazy();
  let loads = 0;
  const load = async () => { loads++; await new Promise((r) => setTimeout(r, 20)); return spy(); };
  await Promise.all([1, 2, 3].map(() => suggestLazy('show git status', { env, system: 'A+S-full', load })));
  assert.equal(loads, 1);
  _resetLazy();
  const r = await suggestLazy('show git status', { env, system: 'A+S-full', load: async () => { throw new Error('boom'); } });
  assert.equal(r.intent, 'git_status');
  assert.equal(r.hybrid.system, 'A');
  _resetLazy();
});

test('the student runs on the pure-JS runtime; an ONNX-only (0.1.x) bundle counts as missing', async () => {
  const m = await loadStudent();
  if (m) assert.equal(m.runtime, 'js');
  const d = mkdtempSync(join(tmpdir(), 'tellsh-stu-'));
  for (const f of ['encoder.int8.onnx', 'vocab.json', 'labels.json']) writeFileSync(join(d, f), 'x');
  assert.notEqual(findStudentDir(d), d);
});

test('CLI: TELLSH_HYBRID off values disable the student', () => {
  for (const v of ['0', 'off', 'false', 'NO']) {
    const r = spawnSync(process.execPath, ['bin/tellsh.js', '--json', 'show git status'], { encoding: 'utf8', env: { ...process.env, TELLSH_HYBRID: v } });
    assert.equal(JSON.parse(r.stdout).hybrid, undefined, v);
  }
  // on values select A+B (a confident query: the cascade answers, the encoder is never loaded)
  for (const v of ['1', 'true', 'Yes', 'on']) {
    const r = spawnSync(process.execPath, ['bin/tellsh.js', '--json', 'show git status'], { encoding: 'utf8', env: { ...process.env, TELLSH_HYBRID: v } });
    assert.equal(JSON.parse(r.stdout).hybrid.system, 'A+B', v);
  }
});

test('A+S: a templates-model answer the student replaces is deferred (the rerank hook may run twice)', async () => {
  const q = "I'd like to update remote branches";
  let seen; let thr;
  suggest(q, { env, rerankTop: 0, rerank: (c, o) => { seen = c; thr = o.thr; return c; } });
  assert.equal(seen.intent, 'git_fetch');
  assert.ok(seen.confidence >= thr && seen.confidence < 0.6);
  const s = { infer: async () => ({ intents: { git_branches: 0.95 }, pNone: 0 }) };
  const r = await suggestHybrid(q, { env, system: 'A+S', encoder: s });
  assert.equal(r.intent, 'git_branches');
  assert.equal(r.hybrid.deferred, true);
});

test('A+S: a templates-gate rerun landing on an intent neither A nor the student chose keeps A', async () => {
  const q = 'please inspect the last commit'; // templates model 0.3.8: git_show in the [thr, 0.6) band on PowerShell
  const e = { shell: 'powershell', os: 'win32' };
  let seen; let thr;
  suggest(q, { env: e, rerankTop: 0, rerank: (c, o) => { seen ??= c; thr = o.thr; return c; } });
  assert.equal(seen.intent, 'git_show');
  assert.ok(seen.confidence >= thr && seen.confidence < 0.6);
  const a = suggest(q, { env: e });
  const s = { infer: async () => ({ intents: { git_log: 0.86 }, pNone: 0 }) };
  const r = await suggestHybrid(q, { env: e, system: 'A+S', encoder: s });
  assert.equal(r.intent, a.intent);
  assert.equal(r.command, a.command);
  assert.equal(r.hybrid.deferred, false);
  assert.equal(r.hybrid.consulted, true);
});

test('A+S: a low-confidence answer the student agrees with is returned unchanged (not deferred)', async () => {
  const { readFileSync, readdirSync } = await import('node:fs');
  const rows = readdirSync('data/eval').flatMap((f) => readFileSync(join('data/eval', f), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)));
  let q = null; let seen;
  for (const r of rows) {
    let thr;
    suggest(r.text, { env, rerankTop: 0, rerank: (c, o) => { seen = c; thr = o.thr; return c; } });
    if (seen.confidence >= thr && seen.confidence < 0.6) { q = r.text; break; }
  }
  assert.ok(q);
  const a = suggest(q, { env });
  const s = { n: 0, infer: async () => { s.n++; return { intents: { [seen.intent]: 0.95 }, pNone: 0 }; } };
  const r = await suggestHybrid(q, { env, system: 'A+S', encoder: s });
  assert.equal(s.n, 1);
  assert.equal(r.hybrid.deferred, false);
  assert.equal(r.hybrid.consulted, true);
  assert.equal(r.command, a.command);
  assert.equal(r.confidence, a.confidence);
});

// fixed real-student queries (read-only commands); each test first checks its premise through the CLI's own --json,
// so a bundle change that breaks it fails loudly
const cli = (args, cwd) => spawnSync(process.execPath, [join(process.cwd(), 'bin/tellsh.js'), '--shell', 'bash', '--os', 'linux', ...args], { encoding: 'utf8', cwd, env: { ...process.env, TELLSH_HYBRID: '' } });

test('CLI: --yes still runs a low-confidence safe answer the real student agrees with', { skip: !real }, () => {
  const q = 'display my current location in the filesystem'; // current_dir, A < 0.6, the student agrees
  const cwd = mkdtempSync(join(tmpdir(), 'tellsh-yes-'));
  const j = JSON.parse(cli(['--json', q], cwd).stdout);
  assert.equal(j.hybrid.consulted, true);
  assert.equal(j.hybrid.deferred, false);
  assert.ok(j.confidence < 0.6 && j.risk === 'safe' && j.method === 'catalog');
  const r = cli(['--yes', q], cwd);
  assert.equal(r.status, 0);
  assert.ok(!r.stdout.includes('Not running'));
});

test('CLI: --yes refuses a safe answer the real student changed', { skip: !real }, () => {
  const q = 'gdzie są obrazki .jpg w /home/anna/Obrazy?'; // the student changes A's find_by_ext to list_files
  const cwd = mkdtempSync(join(tmpdir(), 'tellsh-yes-'));
  const j = JSON.parse(cli(['--json', q], cwd).stdout);
  assert.equal(j.hybrid.deferred, true);
  assert.ok(j.risk === 'safe' && j.method === 'catalog');
  const r = cli(['--yes', q], cwd);
  assert.equal(r.status, 4);
  assert.match(r.stdout, /re-ranked by the neural fallback/);
});
