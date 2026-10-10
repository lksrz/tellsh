// Compatibility wrapper (v0.1 API): classify(text) on top of the v0.2 cascade.
import { getModel, loadModel, DEFAULT_MODEL } from './model.js';
import { cascade } from './cascade.js';

export { getModel, loadModel, DEFAULT_MODEL };

// -> { intent, confidence, confident, threshold, top: [{intent, p}] }
export function classify(text, { top = 3, model = getModel(), threshold, extras = [] } = {}) {
  const c = cascade(text, { model, top, extras });
  const thr = threshold ?? model.thresholds.accept;
  return {
    intent: c.intent,
    tool: c.tool,
    confidence: c.confidence,
    confident: c.confidence >= thr,
    threshold: thr,
    top: c.top.map((t) => ({ intent: t.intent, p: t.p })),
    tools: c.tools,
  };
}
