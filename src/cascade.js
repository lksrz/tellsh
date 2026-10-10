// Stages 1+2 of the cascade.
//   stage 1: p(tool | request, shell/os/ctx tokens)          -> top-k tool families (k = 3)
//   stage 2: p(intent | request, tool) inside each candidate -> score = p(tool) * p(intent | tool)
// The best score over all candidate tools wins, so a stage-1 mistake ranked 2nd/3rd can still be recovered.
import { getModel, predictProba } from './model.js';
import { vectorize } from './features.js';
import { NONE } from './tools.js';

/**
 * -> { intent, tool, confidence, top: [{intent, tool, p, pTool, pIntent}], tools: [{tool, p}],
 *      topTool, topToolP, pNone }
 */
export function cascade(text, { model = getModel(), extras = [], k = 3, top = 3, restrictTool } = {}) {
  const feats = [...vectorize(text, model.dim, extras)];
  const tm = model.models.tool;
  const pt = predictProba(tm, feats);
  const order = Array.from(pt.keys()).sort((a, b) => pt[b] - pt[a]);
  const noneIdx = tm.labels.indexOf(NONE);
  // restrictTool: stage 2 only inside one family (history "same but ..." refers to the previous tool)
  if (restrictTool) { const i = tm.labels.indexOf(restrictTool); pt[i] = 1; order.splice(order.indexOf(i), 1); order.unshift(i); }
  const cands = restrictTool ? [tm.labels.indexOf(restrictTool)] : order.filter((i) => i !== noneIdx).slice(0, k);
  const scored = [];
  for (const i of cands) {
    const fam = tm.labels[i];
    const im = model.models['intent:' + fam];
    if (im) {
      const pi = predictProba(im, feats);
      im.labels.forEach((l, j) => scored.push({ intent: l, tool: fam, p: pt[i] * pi[j], pTool: pt[i], pIntent: pi[j] }));
    } else {
      for (const l of model.intentsByFamily[fam] || []) scored.push({ intent: l, tool: fam, p: pt[i], pTool: pt[i], pIntent: 1 });
    }
  }
  scored.sort((a, b) => b.p - a.p);
  const best = scored[0] || { intent: null, tool: null, p: 0 };
  return {
    intent: best.intent,
    tool: best.tool,
    confidence: best.p,
    top: scored.slice(0, Math.max(1, top)),
    tools: order.slice(0, k).map((i) => ({ tool: tm.labels[i], p: pt[i] })),
    topTool: tm.labels[order[0]],
    topToolP: pt[order[0]],
    pNone: noneIdx >= 0 ? pt[noneIdx] : 0,
  };
}
