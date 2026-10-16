// Out-of-catalog veto (src/ooc.js): a fresh low-confidence catalog / composed answer is withheld when the probe of the
// separate model/model_ooc.bin says p(__ooc__) >= T. The shipped templates model has no __ooc__ label.
import { test, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { oocVeto, OOC_HINT, OOC_T, OOC_C, getOocModel } from '../src/ooc.js';
import { loadModel } from '../src/model.js';
import { fileURLToPath } from 'node:url';
import { cascade } from '../src/cascade.js';
import { getModel } from '../src/model.js';
import { suggest } from '../src/pipeline.js';

const ENV = ['TELLSH_OOC_VETO', 'TELLSH_OOC_T', 'TELLSH_OOC_C'];
const saved = Object.fromEntries(ENV.map((k) => [k, process.env[k]]));
afterEach(() => { for (const k of ENV) { if (saved[k] === undefined) delete process.env[k]; else process.env[k] = saved[k]; } });
const clear = () => { for (const k of ENV) delete process.env[k]; };

const probe = () => ({ pOoc: 0.99 });
const p = (pOoc) => () => (pOoc === undefined ? {} : { pOoc });
const res = { understood: true, method: 'catalog', intent: 'ls_files', command: 'ls -la', confidence: 0.3, risk: 'safe',
  baseRisk: 'safe', warnings: ['w'], critical: false, slots: { path: '.' }, slotSources: { path: 'request' }, missing: [], candidates: [{ intent: 'ls_files' }] };

test('oocVeto withholds a fresh low-confidence catalog / composed answer', () => {
  clear();
  for (const r of [res, { ...res, method: 'composed', intent: null, composed: { tool: 'ls' }, experimental: true }]) {
    const v = oocVeto(probe, r);
    assert.equal(v.understood, false);
    assert.equal(v.method, 'none');
    assert.equal(v.command, null);
    assert.equal(v.intent, null);
    assert.deepEqual(v.missing, []);
    assert.equal(v.hint, OOC_HINT);
    assert.equal(v.ooc, true);
    assert.equal(v.vetoed, r.intent || 'composed');
    for (const k of ['risk', 'baseRisk', 'warnings', 'critical', 'slots', 'composed', 'catalogCommand']) assert.ok(!(k in v), k);
    assert.ok(!JSON.stringify(v).includes('ls -la'));
  }
});

test('oocVeto: TELLSH_OOC_VETO=off disables it', () => {
  clear(); process.env.TELLSH_OOC_VETO = 'off';
  assert.equal(oocVeto(probe, res), res);
});

test('oocVeto: p(__ooc__) below T, no probe, or a probe without pOoc keeps the answer', () => {
  clear();
  assert.equal(oocVeto(p(OOC_T - 0.01), res), res);
  assert.equal(oocVeto(p(), res), res);
  assert.equal(oocVeto(() => null, res), res);
  assert.equal(oocVeto(null, res), res);
  process.env.TELLSH_OOC_T = '0.5';
  assert.equal(oocVeto(p(0.6), res).understood, false);
});

test('oocVeto: confidence at or above C keeps the answer; TELLSH_OOC_C overrides', () => {
  clear();
  assert.equal(oocVeto(probe, { ...res, confidence: OOC_C }).understood, true);
  process.env.TELLSH_OOC_C = '0.2';
  assert.equal(oocVeto(probe, res).understood, true);
});

test('oocVeto never touches history answers, templates answers or not-understood answers', () => {
  clear();
  for (const r of [
    { ...res, method: 'history-rule' },
    { ...res, method: 'templates' },
    { ...res, context: { used: true, rule: 'implicit' } },
    { ...res, slotSources: { path: 'history' } },
    { ...res, understood: false, command: null, method: 'none' },
    { ...res, command: null },
  ]) assert.equal(oocVeto(probe, r), r);
});

test('oocVeto calls the probe only when the cheap conditions pass, and then once', () => {
  clear();
  let calls = 0;
  const counted = () => { calls++; return { pOoc: 0.999 }; };
  for (const r of [{ ...res, method: 'history-rule' }, { ...res, confidence: OOC_C }, { ...res, command: null }, { ...res, slotSources: { path: 'history' } }]) oocVeto(counted, r);
  process.env.TELLSH_OOC_VETO = 'off'; oocVeto(counted, res);
  assert.equal(calls, 0);
  clear();
  assert.equal(oocVeto(counted, res).understood, false);
  assert.equal(calls, 1);
});

test('model/model_ooc.bin loads with the __ooc__ stage-1 label; the templates model has none', () => {
  const om = getOocModel();
  assert.ok(om, 'model/model_ooc.bin loads');
  assert.ok(om.models.tool.labels.includes('__ooc__'));
  const tm = loadModel(fileURLToPath(new URL('../model/model_templates.bin', import.meta.url)));
  assert.ok(!tm.models.tool.labels.includes('__ooc__'));
});

test('cascade: pOoc is 0 when the model has no __ooc__ label', () => {
  const m = getModel();
  assert.ok(!m.models.tool.labels.includes('__ooc__'));
  assert.equal(cascade('list files', { model: m }).pOoc, 0);
});

test('suggest never returns a command after a veto', () => {
  clear(); process.env.TELLSH_OOC_T = '0'; process.env.TELLSH_OOC_C = '2';
  let vetoed = 0;
  for (const q of ['list files', 'show disk usage', 'kill process 1234', 'git status', 'find big files', 'make a directory foo']) {
    const s = suggest(q, { env: { shell: 'bash', os: 'linux' }, cwd: '/tmp' });
    if (!s.vetoed) continue;
    vetoed++;
    assert.equal(s.understood, false);
    assert.equal(s.command, null);
    assert.equal(s.hint, OOC_HINT);
  }
  assert.ok(vetoed > 0, 'at least one fall-through answer is vetoed');
});

test('a forced veto never changes how earlier tellsh lines in the history are read (context stays as with the veto off)', () => {
  clear();
  const q = 'podglad crontaba';
  const o = { shell: 'bash', os: 'linux', top: 3, cwd: '/tmp', compose: 'off', history: ['tellsh "npx echo"', 'tellsh "list files"', 'git status'] };
  process.env.TELLSH_OOC_VETO = 'off';
  const off = suggest(q, o);
  process.env.TELLSH_OOC_VETO = 'on'; process.env.TELLSH_OOC_T = '0'; process.env.TELLSH_OOC_C = '2';
  const on = suggest(q, o);
  // the veto may withhold the answer itself, never turn it into another runnable command
  if (on.command) { assert.equal(on.command, off.command); assert.equal(on.intent, off.intent); }
});

test('TELLSH_OOC_VETO accepts 0 / false / no / OFF', () => {
  clear();
  for (const v of ['0', 'false', 'no', 'OFF']) { process.env.TELLSH_OOC_VETO = v; assert.equal(oocVeto(probe, res), res); }
});

test('a plain not-understood answer carries no ooc field', () => {
  clear();
  const r = suggest('hello there how are you', { shell: 'bash', os: 'linux' });
  assert.equal(r.understood, false);
  assert.equal('ooc' in r && r.ooc !== true, false);
});

test('A+S fallback: a vetoed re-ranked answer stays withheld (never A\'s other command)', async () => {
  clear();
  const { suggestHybrid } = await import('../src/rerank/hybrid.js');
  const enc = { infer: async () => ({ intents: { activate_venv: 0.6 }, pNone: 0, tagger: undefined }) };
  for (const q of ['włącz środowisko wirtualne pythona', 'show git status', 'list files here']) {
    for (const system of ['A+S', 'A+S-full']) {
      process.env.TELLSH_OOC_VETO = 'off';
      const off = await suggestHybrid(q, { env: { shell: 'bash', os: 'linux' }, system, encoder: enc });
      process.env.TELLSH_OOC_VETO = 'on'; process.env.TELLSH_OOC_T = '0'; process.env.TELLSH_OOC_C = '2';
      const on = await suggestHybrid(q, { env: { shell: 'bash', os: 'linux' }, system, encoder: enc });
      clear();
      if (on.command) assert.equal(on.command, off.command, `${system} ${q}`);
    }
  }
});
