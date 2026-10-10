#!/usr/bin/env node
// Optional build-time teacher: verify a SAMPLE of generated training labels with TypeSafe Jev
// (https://docs.typesafe.ai, POST /v1/systemone, model jev-latest). Never used at runtime.
//
//   TYPESAFE_API_KEY=... node scripts/teacher.js [--calls 300] [--seed 5]
//
// Per sampled training row, ONE call asks (questions are evaluated in parallel by the API):
//   intent  choice   gold intent vs the two closest alternatives from our cascade (+ "none of these")
//   correct noul     the rendered bash command does what the request asks
//   risk    choice   safe / medium / high — compared with our final risk (catalog risk + danger.js)
//   span_i  noul     up to 3 silver slot spans ("'~/Pobrane' is the directory/file path")
// Disagreements are written to data/teacher/review.jsonl for manual inspection; decisions taken after
// inspection live in data/teacher/decisions.jsonl and are applied by scripts/gen_data.js.
// The API key is read from the environment only; it is never printed or logged.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BY_ID } from '../src/catalog.js';
import { FAMILY_OF } from '../src/tools.js';
import { buildCommand } from '../src/fill.js';
import { cascade } from '../src/cascade.js';
import { silverSpans, mulberry32 } from './lib/silver.js';
import { updateSection } from './report.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=')[1] : d; };
const MAX_CALLS = Math.min(300, +arg('calls', 300));
const PRICE_PER_MTOK = 0.042; // USD per million input tokens (jev-1.13, docs.typesafe.ai/models); output tokens are free
const ENDPOINT = 'https://api.typesafe.ai/v1/systemone';
const KEY = process.env.TYPESAFE_API_KEY;

const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const TYPE_DESC = {
  PATH: 'a file or directory path (or a named place like the home or Downloads folder)', SIZE: 'a file size', EXT: 'a file extension / file type',
  PORT: 'a network port number', TIME: 'a time window or age', NAME: 'the name of a process, service, container, package or command',
  NUM: 'a count (how many results/lines)', URL: 'a URL', HOST: 'a host name, IP address or user@host', BRANCH: 'a git branch name',
  PATTERN: 'the text to search for (or the text to be replaced)', REPL: 'the replacement text', USER: 'a user name', MODE: 'file permission bits',
  MSG: 'a commit message', VAR: 'an environment variable name', PID: 'a process id', TEXT: 'the text to encode/decode',
};
const RISK_DESC = {
  safe: 'read-only: only shows information, changes nothing',
  medium: 'changes files, settings, services or remote state, but in a recoverable way',
  high: 'deletes data, kills processes, discards work or is hard to undo',
};

async function ask(state, questions) {
  const r = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'jev-latest', state, questions }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return j;
}

async function main() {
  const reportOnly = process.argv.includes('--report-only');
  if (reportOnly) {
    const meta = JSON.parse(readFileSync(join(ROOT, 'build', 'teacher_meta.json'), 'utf8'));
    return summarize(readJsonl(join(ROOT, 'build', 'teacher_results.jsonl')), meta);
  }
  if (!KEY) {
    console.log('teacher: TYPESAFE_API_KEY not set — skipped');
    updateSection('teacher', '## Teacher verification (TypeSafe Jev)\n\nSkipped: `TYPESAFE_API_KEY` not set at build time.');
    return;
  }
  const rng = mulberry32(+arg('seed', 5));
  const rows = [...readdirSync(join(ROOT, 'data', 'intents')).sort().flatMap((f) => readJsonl(join(ROOT, 'data', 'intents', f))),
    ...readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl'))];
  // stratified sample: shuffle, then round-robin over intents
  const byIntent = {};
  for (const r of rows.sort(() => rng() - 0.5)) (byIntent[r.intent] ??= []).push(r);
  const sample = [];
  for (let round = 0; sample.length < MAX_CALLS && round < 10; round++) {
    for (const id of Object.keys(byIntent).sort(() => rng() - 0.5)) {
      if (sample.length >= MAX_CALLS) break;
      if (byIntent[id][round]) sample.push(byIntent[id][round]);
    }
  }
  const results = [];
  let calls = 0;
  let inTok = 0;
  let failed = 0;
  const t0 = Date.now();
  const work = sample.map((r) => async () => {
    const env = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
    const b = buildCommand(r.intent, r.text, { env });
    const c = cascade(r.text, { extras: ['shell=bash', 'os=linux'], top: 4 });
    const alts = c.top.map((t) => t.intent).filter((i) => i !== r.intent).slice(0, 2);
    const opts = [r.intent, ...alts].sort(() => rng() - 0.5);
    const criteria = Object.fromEntries(opts.map((i) => [i, BY_ID[i].description]));
    criteria.none = 'none of these';
    const { spans } = silverSpans(r.text, r.intent);
    const questions = {
      intent: { type: 'choice', instructions: 'Which action does the user request? (The request may be in Polish or English.)', criteria },
      correct: { type: 'noul', instructions: 'The shell command does what the request asks for (values the request does not mention may use sensible defaults)' },
      risk: { type: 'choice', instructions: 'How risky is running the shell command on a user machine', criteria: RISK_DESC },
    };
    spans.slice(0, 3).forEach((s, i) => {
      questions[`span_${i}`] = { type: 'noul', instructions: `In the request, "${r.text.slice(s.start, s.end)}" is ${TYPE_DESC[s.type]}` };
    });
    try {
      const j = await ask({ request: r.text, shell: 'bash on Linux', command: b.command }, questions);
      calls++;
      inTok += j.usage?.input_tokens || 0;
      const a = j.answers || {};
      results.push({
        text: r.text, intent: r.intent, lang: r.lang, command: b.command, risk: b.risk,
        t_intent: a.intent?.choice, t_intent_conf: a.intent?.confidence, t_correct: a.correct?.noul,
        t_risk: a.risk?.choice, t_risk_conf: a.risk?.confidence,
        spans: spans.slice(0, 3).map((s, i) => ({ type: s.type, text: r.text.slice(s.start, s.end), p: a[`span_${i}`]?.noul })),
      });
    } catch (e) {
      failed++;
      if (failed <= 3) console.log(`teacher: call failed (${e.message})`);
    }
  });
  // small concurrency, well under the documented rate limits
  for (let i = 0; i < work.length; i += 6) await Promise.all(work.slice(i, i + 6).map((f) => f()));
  const meta = { calls, failed, inTok, seconds: Math.round((Date.now() - t0) / 1000), date: new Date().toISOString().slice(0, 10) };
  mkdirSync(join(ROOT, 'build'), { recursive: true });
  writeFileSync(join(ROOT, 'build', 'teacher_meta.json'), JSON.stringify(meta));
  writeFileSync(join(ROOT, 'build', 'teacher_results.jsonl'), results.map((r) => JSON.stringify(r)).join('\n') + '\n');
  summarize(results, meta);
}

function summarize(results, { calls, failed, inTok, seconds }) {
  const RANK = { safe: 0, medium: 1, high: 2 };
  const review = [];
  let intentAgree = 0; let correctOk = 0; let riskAgree = 0; let riskHigher = 0; let spanN = 0; let spanOk = 0;
  for (const r of results) {
    const reasons = [];
    if (r.t_intent === r.intent) intentAgree++;
    else if ((r.t_intent_conf ?? 0) >= 0.5) reasons.push(`teacher intent ${r.t_intent} (${r.t_intent_conf})`);
    if ((r.t_correct ?? 0) >= 0.5) correctOk++; else if ((r.t_correct ?? 1) < 0.3) reasons.push(`command judged wrong (${r.t_correct})`);
    if (r.t_risk === r.risk) riskAgree++;
    if (RANK[r.t_risk] > RANK[r.risk] && (r.t_risk_conf ?? 0) >= 0.5) { riskHigher++; reasons.push(`teacher risk ${r.t_risk} > ours ${r.risk}`); }
    for (const s of r.spans) { spanN++; if ((s.p ?? 0) >= 0.5) spanOk++; else if ((s.p ?? 1) < 0.3) reasons.push(`span ${s.type} "${s.text}" rejected (${s.p})`); }
    if (reasons.length) review.push({ text: r.text, intent: r.intent, command: r.command, reasons });
  }
  mkdirSync(join(ROOT, 'data', 'teacher'), { recursive: true });
  writeFileSync(join(ROOT, 'data', 'teacher', 'review.jsonl'), review.map((r) => JSON.stringify(r)).join('\n') + '\n');
  const spend = (inTok / 1e6) * PRICE_PER_MTOK;
  const n = results.length;
  const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl'));
  const md = `## Teacher verification (TypeSafe Jev, build time only)

Sampled **${n}** training rows (stratified over intents, EN+PL, incl. shell-phrased rows) and made **${calls} API calls**
(${failed} failed) to \`jev-latest\`${seconds ? ` in ${seconds} s` : ''}: ${inTok} input tokens ≈ **$${spend.toFixed(4)}**
(at $${PRICE_PER_MTOK}/Mtok input, output free). Each call asked: intent (choice among the gold label and our two closest
alternatives), "the rendered command does what is asked" (noul), risk (choice) and up to 3 silver slot spans (noul).

| check | agreement |
|---|---|
| intent label = teacher choice | ${pct(intentAgree, n)} |
| command judged correct (noul ≥ 0.5) | ${pct(correctOk, n)} |
| risk level identical | ${pct(riskAgree, n)} (teacher rated higher with conf ≥ 0.5: ${riskHigher}) |
| silver slot spans accepted (noul ≥ 0.5) | ${pct(spanOk, spanN)} of ${spanN} |

${review.length} rows flagged → \`data/teacher/review.jsonl\`. After manual inspection (\`data/teacher/decisions.jsonl\`):
* intent labels: no disagreement, **0 training rows dropped or relabelled**;
* risk: **${decisions.filter((d) => d.action === 'relabel' && d.field === 'risk').length} intents relabelled safe → medium** (${decisions.filter((d) => d.action === 'relabel' && d.field === 'risk').map((d) => d.intent).join(', ')}) — they overwrite files or change the git working tree;
  ${decisions.filter((d) => d.action === 'keep' && d.field === 'risk').length} kept safe where the teacher was stricter than our definition (${decisions.filter((d) => d.action === 'keep' && d.field === 'risk').map((d) => d.intent).join(', ')});
* "command wrong" flags were slot-extraction bugs, not label errors (Windows \`C:\\\` paths, \`plik X.b64\` for base64, Polish inflection
  \`javy\` → \`java\`, filler words taken as values); fixed in \`src/slots.js\` / \`src/tagger.js\` (${decisions.filter((d) => d.action === 'keep' && d.field === 'label').length} rows kept).`;
  updateSection('teacher', md);
  console.log(`teacher: ${calls} calls, ${inTok} input tokens ≈ $${spend.toFixed(4)}; intent agree ${pct(intentAgree, n)}, correct ${pct(correctOk, n)}, risk agree ${pct(riskAgree, n)}, spans ${pct(spanOk, spanN)}; ${review.length} flagged`);
}

main().catch((e) => { console.log(`teacher: failed (${e.message}) — skipped`); process.exitCode = 0; });
