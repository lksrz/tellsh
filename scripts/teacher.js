#!/usr/bin/env node
// Build-time teacher: TypeSafe Jev (https://docs.typesafe.ai, POST /v1/systemone, model jev-latest).
// Never used at runtime. The API key is read from the environment only; it is never printed or logged.
//
//   TYPESAFE_API_KEY=... node scripts/teacher.js verify   # (a) every training row: intent + risk
//   TYPESAFE_API_KEY=... node scripts/teacher.js label    # (b) label/filter new paraphrase candidates
//   TYPESAFE_API_KEY=... node scripts/teacher.js mine     # (c) hard negatives between confusable intents
//   node scripts/teacher.js report                        # EVAL.md teacher section from the artifacts
//
// Independence: the intent question shows ONLY the request (and the user's shell); never our label, the
// rendered command or anything derived from the label. The options are the label plus the cascade's
// closest alternatives plus known confusable intents plus "none of these", shuffled, so the label is
// one of 4-6 plausible options. The risk question is asked about the request alone. Because the label is
// always among the options, "agreement" is a consistency check, not an independent accuracy estimate.
// Options come from --options-model (default model/model.bin; sha256 recorded in each summary), so pin
// that file to rerun with identical prompts and cache keys. Failed calls are counted, never treated as a
// rejection. Held-out texts and their near-duplicates (scripts/lib/heldout.js) are never sent.
// Several rows are packed into one call (one question per row and aspect; Jev evaluates every
// question in isolation against the shared state), responses are cached in build/jev_cache.jsonl, and
// every network call is counted in data/teacher/ledger.json.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BY_ID, INTENTS } from '../src/catalog.js';
import { cascade } from '../src/cascade.js';
import { envFeatures } from '../src/env.js';
import { normalize } from '../src/features.js';
import { mulberry32 } from './lib/silver.js';
import { ask, pool, stats, recordLedger, LEDGER, PRICE_PER_MTOK, MODEL } from './lib/jev.js';
import { updateSection } from './report.js';
import { CONFUSABLE, CONTRAST_RULES } from './lib/confusable.js';
import { exclusionIndex } from './lib/heldout.js';
import { parseModel, DEFAULT_MODEL } from '../src/model.js';
import { createHash } from 'node:crypto';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const TDIR = join(ROOT, 'data', 'teacher');
const BDIR = join(ROOT, 'build', 'teacher');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=')[1] : d; };
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const writeJsonl = (p, rows) => writeFileSync(p, rows.map((r) => JSON.stringify(r)).join('\n') + (rows.length ? '\n' : ''));
const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f)).map((r) => ({ ...r, file: f }))) : []);

const STATE = 'Requests that users typed (in Polish or English) into a command-line assistant which turns each request into ONE shell command ' +
  'for the named shell. Each question quotes one request.';
const SHELL_NAME = { bash: 'bash', zsh: 'zsh', sh: 'POSIX sh', powershell: 'PowerShell', fish: 'fish', cmd: 'Windows cmd.exe' };
const RISK = {
  safe: 'read-only: only shows information',
  medium: 'changes files, settings or remote state in a recoverable way',
  high: 'deletes data, kills processes, discards work or is hard to undo',
};
const RANK = { safe: 0, medium: 1, high: 2 };

// The cascade that proposes the alternative options. Prompts (and so cache keys) depend on it: pin it
// with --options-model=FILE to rerun with the same questions; its sha256 is recorded in every summary.
const OPTIONS_MODEL_PATH = arg('options-model', DEFAULT_MODEL);
let optionsModel = null;
let optionsModelSha = null;
function getOptionsModel() {
  if (!optionsModel) {
    const buf = readFileSync(OPTIONS_MODEL_PATH);
    optionsModelSha = createHash('sha256').update(buf).digest('hex');
    optionsModel = parseModel(buf);
  }
  return optionsModel;
}

/** Options for the intent question: label + closest cascade alternatives + confusable intents, shuffled. */
function intentOptions(text, label, shell, os, rng, k = 3) {
  const c = cascade(text, { model: getOptionsModel(), extras: envFeatures({ shell: shell || 'bash', os: os || 'linux' }), top: 8 });
  const alts = c.top.map((t) => t.intent).filter((i) => i && i !== label);
  const conf = (CONFUSABLE[label] || []).filter((i) => i !== label);
  const opts = [...new Set([label, ...conf.slice(0, 2), ...alts])].slice(0, k + 1 + Math.min(1, conf.length));
  for (let i = opts.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [opts[i], opts[j]] = [opts[j], opts[i]]; }
  return { opts, model: c.intent, modelP: c.confidence };
}
const criteriaOf = (opts) => Object.fromEntries([...opts.map((i) => [i, BY_ID[i].description]), ['none', 'none of these / something else']]);
const intentQ = (text, shell, opts) => ({
  type: 'choice',
  instructions: { question: 'Which action does this request ask the assistant to do?', shell: SHELL_NAME[shell] || 'bash', request: text },
  criteria: criteriaOf(opts),
});
const riskQ = (text) => ({
  type: 'choice',
  instructions: { question: 'How risky is it to carry out this request on the user\'s machine?', request: text },
  criteria: RISK,
});

/** Ask about many items, `per` items per call. item -> { qs: {suffix: question} }; returns answers per item. */
async function askPacked(items, per, label) {
  const calls = [];
  for (let i = 0; i < items.length; i += per) {
    const group = items.slice(i, i + per);
    calls.push(async () => {
      const questions = {};
      group.forEach((it, j) => { for (const [k, q] of Object.entries(it.qs)) questions[`${k}_${j}`] = q; });
      const r = await ask(STATE, questions);
      return group.map((_, j) => Object.fromEntries(Object.keys(group[j].qs).map((k) => [k, r.answers[`${k}_${j}`]])));
    });
  }
  const t0 = Date.now();
  const res = await pool(calls, +arg('concurrency', 16), (d, n) => console.log(`  ${label}: ${d}/${n} calls (${stats.calls} network, ${stats.cached} cached, ${stats.inTok} tok, ${Math.round((Date.now() - t0) / 1000)} s)`));
  const out = [];
  res.forEach((r, ci) => {
    const n = Math.min(per, items.length - ci * per);
    for (let j = 0; j < n; j++) out.push(r?.error ? null : r[j]);
  });
  return out;
}

/**
 * The exclusion index of gen_data.js (scripts/lib/heldout.js exclusionIndex): held-out texts incl. near-duplicates
 * and contrastive rewrites, and texts that mention an eval-only slot value. Nothing it excludes is sent to Jev.
 */
const heldOutSet = () => exclusionIndex(ROOT);

/**
 * Training rows filtered as gen_data.js filters them: held-out texts (and their near-duplicates) are never
 * sent to the teacher, and rows dropped in data/teacher/decisions.jsonl are not mined from.
 */
function trainingRows(held = heldOutSet()) {
  const dropped = new Set(readJsonl(join(TDIR, 'decisions.jsonl')).filter((d) => d.text && d.action === 'drop').map((d) => normalize(d.text)));
  return [...readDir(join(ROOT, 'data', 'intents')).map((r) => ({ ...r, src: `intents/${r.file}` })),
    ...readJsonl(join(ROOT, 'data', 'train.jsonl')).map((r) => ({ ...r, src: 'train.jsonl' })),
    ...readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell/train.jsonl' }))]
    .filter((r) => !held.has(r.text) && !dropped.has(normalize(r.text)));
}

// ---------------------------------------------------------------------------------------------
// (a) verify every training row
async function verify() {
  const rng = mulberry32(+arg('seed', 5));
  const rows = trainingRows().slice(0, +arg('limit', 1e9));
  const items = rows.map((r) => {
    const o = intentOptions(r.text, r.intent, r.shell, r.os, rng);
    return { r, o, qs: { i: intentQ(r.text, r.shell, o.opts), k: riskQ(r.text) } };
  });
  console.log(`teacher verify: ${rows.length} training rows, ${+arg('per', 3)} per call`);
  const ans = await askPacked(items, +arg('per', 3), 'verify');
  mkdirSync(BDIR, { recursive: true });
  const res = items.map((it, j) => {
    const a = ans[j];
    if (!a) return { text: it.r.text, intent: it.r.intent, src: it.r.src, failed: true };
    return {
      text: it.r.text, intent: it.r.intent, lang: it.r.lang, shell: it.r.shell || '', src: it.r.src, opts: it.o.opts, model: it.o.model,
      t_intent: a.i?.choice, t_conf: a.i?.confidence, t_p: a.i?.probabilities?.[it.r.intent] ?? null,
      t_risk: a.k?.choice, t_risk_conf: a.k?.confidence, risk: BY_ID[it.r.intent].risk,
    };
  });
  writeJsonl(join(BDIR, 'verify.jsonl'), res);
  summarizeVerify(res);
  recordLedger('verify');
}

function summarizeVerify(res) {
  const ok = res.filter((r) => !r.failed);
  const agree = ok.filter((r) => r.t_intent === r.intent);
  // flagged: the teacher prefers another option (or none) with confidence >= 0.6 and gives our label p < 0.3
  const flagged = ok.filter((r) => r.t_intent !== r.intent && (r.t_conf ?? 0) >= 0.6 && (r.t_p ?? 0) < 0.3);
  const perIntent = {};
  for (const r of ok) {
    const p = (perIntent[r.intent] ??= { n: 0, agree: 0, riskHigher: 0, riskLower: 0, risk: r.risk, teacherRisk: {} });
    p.n++;
    if (r.t_intent === r.intent) p.agree++;
    p.teacherRisk[r.t_risk] = (p.teacherRisk[r.t_risk] || 0) + 1;
    if ((r.t_risk_conf ?? 0) >= 0.6 && RANK[r.t_risk] > RANK[r.risk]) p.riskHigher++;
    if ((r.t_risk_conf ?? 0) >= 0.6 && RANK[r.t_risk] < RANK[r.risk]) p.riskLower++;
  }
  // risk: an intent is flagged when the teacher rates the majority of its rows differently with confidence
  const riskFlags = Object.entries(perIntent).filter(([, p]) => p.riskHigher / p.n >= 0.5 || p.riskLower / p.n >= 0.5)
    .map(([id, p]) => ({ intent: id, ours: p.risk, teacher: Object.entries(p.teacherRisk).sort((a, b) => b[1] - a[1])[0][0], share: +(Math.max(p.riskHigher, p.riskLower) / p.n).toFixed(2), n: p.n }));
  const summary = {
    rows: res.length, answered: ok.length, failed: res.length - ok.length, optionsModelSha256: optionsModelSha,
    intentAgree: agree.length, flagged: flagged.length,
    riskAgree: ok.filter((r) => r.t_risk === r.risk).length,
    riskFlags,
    worstIntents: Object.entries(perIntent).map(([k, p]) => [k, +(p.agree / p.n).toFixed(3), p.n]).sort((a, b) => a[1] - b[1]).slice(0, 10),
  };
  mkdirSync(TDIR, { recursive: true });
  writeFileSync(join(TDIR, 'verify_summary.json'), JSON.stringify(summary, null, 1) + '\n');
  writeJsonl(join(TDIR, 'review.jsonl'), flagged.map((r) => ({ text: r.text, intent: r.intent, src: r.src, teacher: r.t_intent, conf: r.t_conf, p_ours: r.t_p, opts: r.opts })));
  console.log(`verify: ${ok.length}/${res.length} answered; intent agree ${agree.length} (${(100 * agree.length / ok.length).toFixed(1)}%); ` +
    `${flagged.length} flagged -> data/teacher/review.jsonl; risk agree ${(100 * summary.riskAgree / ok.length).toFixed(1)}%; ${riskFlags.length} intents with a risk disagreement`);
}

// ---------------------------------------------------------------------------------------------
// (b) label / filter new paraphrase candidates (data/candidates/*.jsonl) -> data/intents/g06_teacher.jsonl
async function label() {
  const rng = mulberry32(+arg('seed', 7));
  const held = heldOutSet();
  const have = new Set(trainingRows().filter((r) => !/^g0[67]_/.test(r.file || '')).map((r) => normalize(r.text)));
  const seen = new Set();
  const cands = readDir(join(ROOT, 'data', 'candidates')).filter((r) => {
    if (!r.intent) return false;
    const n = normalize(r.text);
    if (!BY_ID[r.intent] || held.has(r.text) || have.has(n) || seen.has(n)) return false;
    seen.add(n);
    return true;
  });
  const items = cands.map((r) => { const o = intentOptions(r.text, r.intent, r.shell, r.os, rng); return { r, o, qs: { i: intentQ(r.text, r.shell, o.opts) } }; });
  console.log(`teacher label: ${cands.length} new candidates (after dedup against training and held-out sets)`);
  const ans = await askPacked(items, +arg('per', 4), 'label');
  const accepted = [];
  const rejected = [];
  let failed = 0;
  items.forEach((it, j) => {
    const a = ans[j]?.i;
    if (!a) { failed++; return; } // a failed call is no answer, not a rejection
    const p = a?.probabilities?.[it.r.intent] ?? 0;
    const row = { text: it.r.text, intent: it.r.intent, lang: it.r.lang, ...(it.r.shell ? { shell: it.r.shell, os: it.r.os } : {}) };
    // accept when the teacher picks the proposed intent with p >= 0.6
    if (a && a.choice === it.r.intent && p >= 0.6) accepted.push({ ...row, src: 'teacher', hard: it.o.model !== it.r.intent });
    else rejected.push({ ...row, teacher: a?.choice ?? null, conf: a?.confidence ?? null, p_ours: p, opts: it.o.opts, model: it.o.model });
  });
  writeJsonl(join(ROOT, 'data', 'intents', 'g06_teacher.jsonl'), accepted.map(({ hard, ...r }) => r));
  writeJsonl(join(TDIR, 'label_rejected.jsonl'), rejected);
  // out-of-domain candidates (data/candidates/ood_*.jsonl): keep only what the teacher agrees is not a shell request
  const oodC = readDir(join(ROOT, 'data', 'candidates')).filter((r) => !r.intent && r.text && /^ood/.test(r.file));
  const oodHave = new Set(readJsonl(join(ROOT, 'data', 'ood.jsonl')).map((r) => normalize(r.text)));
  const oodItems = oodC.filter((r) => { const n = normalize(r.text); if (held.has(r.text) || oodHave.has(n) || seen.has(n)) return false; seen.add(n); return true; })
    .map((r) => ({ r, qs: { o: { type: 'noul', instructions: { question: 'Is this a request to do something on the computer that a shell command (bash, PowerShell, ...) could carry out — find, list, show, change, delete, kill, install, check something?', request: r.text } } } }));
  const oodAns = await askPacked(oodItems, +arg('per', 4), 'label-ood');
  const oodAcc = [];
  const oodRej = [];
  oodItems.forEach((it, j) => { const p = oodAns[j]?.o?.noul; if (p == null) { failed++; return; } (p < 0.3 ? oodAcc : oodRej).push({ text: it.r.text, lang: it.r.lang, p }); });
  writeJsonl(join(ROOT, 'data', 'ood_teacher.jsonl'), oodAcc.map(({ text, lang }) => ({ text, lang })));
  writeJsonl(join(TDIR, 'ood_rejected.jsonl'), oodRej);
  const hard = accepted.filter((r) => r.hard).length;
  const s = { candidates: cands.length, accepted: accepted.length, rejected: rejected.length, failed, optionsModelSha256: optionsModelSha, modelDisagreedOnAccepted: hard,
    ood: { candidates: oodItems.length, accepted: oodAcc.length, rejected: oodRej.length },
    byLang: Object.fromEntries(['en', 'pl'].map((l) => [l, accepted.filter((r) => r.lang === l).length])),
    byShell: accepted.reduce((m, r) => ((m[r.shell || 'bash'] = (m[r.shell || 'bash'] || 0) + 1), m), {}) };
  writeFileSync(join(TDIR, 'label_summary.json'), JSON.stringify(s, null, 1) + '\n');
  console.log(`label: accepted ${accepted.length}/${cands.length} (${hard} the current model got wrong), rejected ${rejected.length} -> data/teacher/label_rejected.jsonl`);
  recordLedger('label');
}

// ---------------------------------------------------------------------------------------------
// (c) hard negatives: contrastive rewrites of training rows across confusable intents
async function mine() {
  const rng = mulberry32(+arg('seed', 11));
  const held = heldOutSet();
  const rows = trainingRows().filter((r) => !/^g07_/.test(r.file || ''));
  const have = new Set(rows.map((r) => normalize(r.text)));
  const cands = [];
  const seen = new Set();
  for (const rule of CONTRAST_RULES) {
    const src = rows.filter((r) => r.intent === rule.from && (!rule.lang || r.lang === rule.lang));
    let made = 0;
    for (const r of src.sort(() => rng() - 0.5)) {
      if (made >= (rule.max || 40)) break;
      if (!rule.re.test(r.text)) continue;
      const text = r.text.replace(rule.re, rule.to);
      const n = normalize(text);
      if (text === r.text || rule.bad?.test(text) || held.has(text) || have.has(n) || seen.has(n)) continue;
      seen.add(n);
      cands.push({ text, intent: rule.target, lang: r.lang, shell: r.shell, os: r.os, from: r.intent, orig: r.text });
      made++;
    }
  }
  // plus: training rows of confusable intents the current model gets wrong or nearly wrong (margin < 0.2)
  const hardRows = [];
  for (const r of rows) {
    if (!CONFUSABLE[r.intent]) continue;
    const c = cascade(r.text, { model: getOptionsModel(), extras: envFeatures({ shell: r.shell || 'bash', os: r.os || 'linux' }), top: 2 });
    const margin = c.top[0]?.intent === r.intent ? (c.top[0].p - (c.top[1]?.p ?? 0)) : -1;
    if (margin < 0.2) hardRows.push({ ...r, margin });
  }
  const items = cands.map((r) => { const o = intentOptions(r.text, r.intent, r.shell, r.os, rng); if (!o.opts.includes(r.from)) o.opts.push(r.from); return { r, o, qs: { i: intentQ(r.text, r.shell, o.opts) } }; });
  console.log(`teacher mine: ${cands.length} contrastive rewrites from ${CONTRAST_RULES.length} rules; ${hardRows.length} low-margin training rows`);
  const ans = await askPacked(items, +arg('per', 4), 'mine');
  const accepted = [];
  const rejected = [];
  let failed = 0;
  items.forEach((it, j) => {
    const a = ans[j]?.i;
    if (!a) { failed++; return; } // a failed call is no answer, not a rejection
    const p = a?.probabilities?.[it.r.intent] ?? 0;
    const row = { text: it.r.text, intent: it.r.intent, lang: it.r.lang, ...(it.r.shell ? { shell: it.r.shell, os: it.r.os } : {}) };
    if (a && a.choice === it.r.intent && p >= 0.6) accepted.push({ ...row, src: 'hardneg' });
    else rejected.push({ ...row, from: it.r.from, orig: it.r.orig, teacher: a?.choice ?? null, conf: a?.confidence ?? null });
  });
  // low-margin rows are re-weighted (duplicated once) in training if the teacher already confirmed them in verify
  const verified = new Map(readJsonl(join(BDIR, 'verify.jsonl')).map((r) => [normalize(r.text) + '|' + r.intent, r]));
  const boost = hardRows.filter((r) => verified.get(normalize(r.text) + '|' + r.intent)?.t_intent === r.intent)
    .map((r) => ({ text: r.text, intent: r.intent, lang: r.lang, ...(r.shell ? { shell: r.shell, os: r.os } : {}), src: 'hardneg-boost' }));
  writeJsonl(join(ROOT, 'data', 'intents', 'g07_hardneg.jsonl'), accepted);
  writeJsonl(join(TDIR, 'hardneg_rejected.jsonl'), rejected);
  writeJsonl(join(TDIR, 'hardneg_boost.jsonl'), boost);
  const s = { rewrites: cands.length, accepted: accepted.length, rejected: rejected.length, failed, optionsModelSha256: optionsModelSha, lowMarginRows: hardRows.length, boosted: boost.length,
    byPair: accepted.reduce((m, r) => ((m[r.intent] = (m[r.intent] || 0) + 1), m), {}) };
  writeFileSync(join(TDIR, 'hardneg_summary.json'), JSON.stringify(s, null, 1) + '\n');
  console.log(`mine: accepted ${accepted.length}/${cands.length} rewrites; ${boost.length} teacher-confirmed low-margin rows boosted`);
  recordLedger('mine');
}

// ---------------------------------------------------------------------------------------------
function report() {
  const L = existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, 'utf8')) : null;
  if (!L) { updateSection('teacher', '## Teacher (TypeSafe Jev)\n\nNot run: no `data/teacher/ledger.json`.'); return; }
  const J = (f) => (existsSync(join(TDIR, f)) ? JSON.parse(readFileSync(join(TDIR, f), 'utf8')) : null);
  const V = J('verify_summary.json');
  const LB = J('label_summary.json');
  const HN = J('hardneg_summary.json');
  const decisions = readJsonl(join(TDIR, 'decisions.jsonl'));
  const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
  const usd = (t) => `$${((t / 1e6) * PRICE_PER_MTOK).toFixed(4)}`;
  const count = (pred) => decisions.filter(pred).length;
  const lines = [];
  lines.push('## Teacher (TypeSafe Jev, build time only)');
  lines.push('');
  lines.push(`All calls to \`${MODEL}\` ($${L.pricePerMtok}/Mtok input, output free), counted by \`scripts/lib/jev.js\` in \`data/teacher/ledger.json\` ` +
    '(every request sent, including failed and retried ones; cache hits are free and not counted). Several rows are packed per call; every row gets its own question(s), and the intent ' +
    'question shows only the request and shell — never our label or a command rendered from it.');
  lines.push('');
  lines.push('| task | calls | failed | input tokens | spend |');
  lines.push('|---|---|---|---|---|');
  for (const [k, t] of Object.entries(L.tasks)) lines.push(`| ${k} | ${t.calls} | ${t.failed} | ${t.inTok} | ${usd(t.inTok)} |`);
  lines.push(`| **total** | **${L.total.calls}** | ${L.total.failed} | ${L.total.inTok} | **$${L.total.usd.toFixed(4)}** |`);
  lines.push('');
  if (V) {
    lines.push(`**(a) Verification of every training row** (${V.rows} rows; ${V.answered} answered): teacher intent = our label for **${pct(V.intentAgree, V.answered)}** ` +
      '(not an independent accuracy: the options always contain our label plus the cascade\'s own top guesses, so this is agreement among 4-6 plausible choices); ' +
      `${V.flagged} rows flagged (teacher prefers another option with confidence ≥ 0.6 and gives our label p < 0.3) → \`data/teacher/review.jsonl\`. ` +
      (V.heldOutSent ? `This run predates the held-out filter: ${V.heldOutSent} of the rows sent were held-out texts or near-duplicates of one (none of them is in the training data of the shipped model; \`teacher.js\` no longer sends them). ` : '') +
      `Risk (asked about the request alone): identical to the catalog risk for ${pct(V.riskAgree, V.answered)} of rows; ${V.riskFlags.length} intents where the teacher rates most rows differently ` +
      `(${V.riskFlags.map((f) => `${f.intent} ${f.ours}→${f.teacher}`).join(', ') || 'none'}).`);
    lines.push('');
    lines.push(`After manual inspection (\`data/teacher/decisions.jsonl\`, ${decisions.length} decisions): ` +
      `**${count((d) => d.text && d.action === 'drop')} rows dropped**, **${count((d) => d.text && d.action === 'relabel')} rows relabelled**, ` +
      `${count((d) => d.text && d.action === 'keep')} flagged rows kept (teacher wrong or request genuinely ambiguous); risk: ` +
      `${count((d) => d.field === 'risk' && d.action === 'relabel')} intents relabelled (${decisions.filter((d) => d.field === 'risk' && d.action === 'relabel').map((d) => `${d.intent} ${d.from}→${d.to}`).join(', ') || 'none'}), ` +
      `${count((d) => d.field === 'risk' && d.action === 'keep')} kept.`);
    lines.push('');
  }
  if (LB) {
    lines.push(`**(b) New paraphrases**: ${LB.candidates} candidates (PL+EN, bash/zsh/sh/PowerShell/fish/cmd, written for v0.3; deduplicated against training and every held-out set) ` +
      `labelled by the teacher; **${LB.accepted} accepted** (teacher picks the proposed intent with p ≥ 0.6; EN ${LB.byLang.en}, PL ${LB.byLang.pl}; ` +
      `shells ${Object.entries(LB.byShell).map(([k, v]) => `${k} ${v}`).join(', ')}), ${LB.rejected} rejected → \`data/teacher/label_rejected.jsonl\`. ` +
      `${LB.modelDisagreedOnAccepted} of the accepted rows were misclassified by the v0.2 model. ` +
      (LB.ood ? `Out-of-domain candidates: ${LB.ood.candidates}, **${LB.ood.accepted} kept** (teacher p(shell request) < 0.3) → \`data/ood_teacher.jsonl\`.` : '') +
      (LB.heldOutLeaksRemoved ? ` ${LB.heldOutLeaksRemoved.accepted} accepted paraphrases and ${LB.heldOutLeaksRemoved.ood} out-of-domain rows were later removed as near-duplicates of held-out texts.` : ''));
    lines.push('');
  }
  if (HN) {
    lines.push(`**(c) Hard negatives**: ${HN.rewrites} contrastive rewrites of training rows across confusable intents (e.g. "symlinks" → "broken symlinks", "push" → "pull", ` +
      `"process" → "service"); **${HN.accepted} confirmed** by the teacher and added (${Object.entries(HN.byPair).map(([k, v]) => `${k} ${v}`).join(', ')}); ` +
      `${HN.boosted} low-margin training rows of confusable intents (confirmed in (a)) are given double weight.` +
      (HN.heldOutLeaksRemoved ? ` ${HN.heldOutLeaksRemoved.rewrites} confirmed rewrites and ${HN.heldOutLeaksRemoved.boosted} boosted rows were later removed because they were ` +
        'held-out texts, near-duplicates of one, or one-word rewrites of one (`scripts/lib/heldout.js`).' : ''));
  }
  updateSection('teacher', lines.join('\n'));
  console.log(`teacher report: ${L.total.calls} calls, ${L.total.inTok} input tokens, $${L.total.usd}`);
}

const cmd = process.argv[2];
const run = { verify, label, mine, report }[cmd];
if (!run) { console.log('usage: node scripts/teacher.js verify|label|mine|report'); process.exit(2); }
if (cmd !== 'report' && !process.env.TYPESAFE_API_KEY) { console.log('teacher: TYPESAFE_API_KEY not set — skipped'); process.exit(0); }
await run();
if (cmd !== 'report') console.log(`teacher ${cmd}: ${stats.calls} network calls (${stats.failed} failed, ${stats.retries} retries), ${stats.cached} cache hits, ${stats.inTok} input tokens ≈ $${((stats.inTok / 1e6) * PRICE_PER_MTOK).toFixed(4)}`);
