// Out-of-catalog (OOC) veto. A separate model, model/model_ooc.bin (a templates-model-shaped cascade model trained with an
// extra stage-1 class __ooc__ for real shell tasks the catalog does not cover, tools.js OOC), is probed only for its
// p(__ooc__); the shipped templates model (model/model_templates.bin) and so the template gating are untouched.
// When p(__ooc__) >= OOC_T, a fresh low-confidence (< OOC_C) catalog / composed answer of the 0.3.3 model is withheld:
// it would be the nearest catalog intent, not the task. The cheap conditions on the answer are checked first, so the
// ooc model runs only for a vetoable answer. Answers resolved from history (method 'history-rule', a slot sourced from
// history, any context rule) are never vetoed. A missing model/model_ooc.bin (or a model without the __ooc__ label,
// pOoc = 0) means no veto.
// TELLSH_OOC_VETO=off (or 0 / false / no) disables it; earlier `tellsh` lines in the history are classified without the veto,
// so the context of a later request is the same as in 0.3.10; TELLSH_OOC_T / TELLSH_OOC_C override the thresholds (experiments).
import { fileURLToPath } from 'node:url';
import { loadModel } from './model.js';

export const OOC_HINT = 'this looks like a shell task tellsh does not know yet';
// thresholds tuned on the real-usage tune half (scripts/real/eval_ooc.js --half=tune --sweep)
export const OOC_T = 0.99;
export const OOC_C = 0.8;

const num = (v, d) => (v != null && v !== '' && Number.isFinite(+v) ? +v : d);
export const oocT = () => num(process.env.TELLSH_OOC_T, OOC_T);

const OOC_MODEL = fileURLToPath(new URL('../model/model_ooc.bin', import.meta.url));
let oocModel;
export function getOocModel() {
  if (oocModel === undefined) { try { oocModel = loadModel(OOC_MODEL); } catch { oocModel = null; } }
  return oocModel;
}

/** The cheap conditions (no model call): `res` is a fresh low-confidence catalog / composed answer the veto may withhold. */
export function oocVetoable(res) {
  if (/^(?:0|off|false|no)$/i.test(process.env.TELLSH_OOC_VETO || '') || !res?.understood || !res.command) return false;
  if (res.method !== 'catalog' && res.method !== 'composed') return false;
  if (res.context?.rule || Object.values(res.slotSources || {}).includes('history')) return false;
  return (res.confidence ?? 0) < num(process.env.TELLSH_OOC_C, OOC_C);
}

/** The answer `res`, or a withheld (never runnable) copy of it when the ooc-model result of `probeFn()` says out-of-catalog. */
export function oocVeto(probeFn, res) {
  if (!oocVetoable(res)) return res;
  const probe = probeFn?.();
  if (!probe || !((probe.pOoc || 0) >= oocT())) return res;
  const { risk, baseRisk, warnings, critical, composed, slots, slotSources, description, notes, experimental, reason, catalogCommand, ...rest } = res;
  return { ...rest, understood: false, method: 'none', command: null, intent: null, missing: [], hint: OOC_HINT, ooc: true, vetoed: res.intent || res.method };
}

/** The ooc-model probe for suggest(): `once` with the ooc model (same features / env / history), or null without the model. */
export function oocProbe(once, opts) {
  const m = getOocModel();
  return m ? once({ ...opts, model: m, rerank: undefined, gated: true }) : null;
}
