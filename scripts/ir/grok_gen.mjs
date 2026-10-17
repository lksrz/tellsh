#!/usr/bin/env node
// Synthetic NL -> IR-pilot training data generator using the `grok` CLI (headless).
// See scripts/ir/README.md. Node >= 20, no dependencies.
//
//   node scripts/ir/grok_gen.mjs --total 10000 --per-call 100 --concurrency 6 \
//        --out build/ir/grok/run1 --seed 1 [--model ID] [--dry-run]
//
// Only docs/IR.md excerpts (§0, §3 table, §7 rows, §8) and ir/schemas/*.json are sent to grok.

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { sampleValues, OPENINGS } from './value_pools.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

// ---------- args ----------
function parseArgs(argv) {
  const a = { total: 10000, perCall: 100, concurrency: 6, out: 'build/ir/grok/run1', seed: 1, model: '', dryRun: false, timeoutS: 900 };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i], v = argv[i + 1];
    switch (k) {
      case '--total': a.total = +v; i++; break;
      case '--per-call': a.perCall = +v; i++; break;
      case '--concurrency': a.concurrency = +v; i++; break;
      case '--out': a.out = v; i++; break;
      case '--seed': a.seed = +v; i++; break;
      case '--model': a.model = v; i++; break;
      case '--timeout': a.timeoutS = +v; i++; break;
      case '--effort': a.effort = v; i++; break;
      case '--backend': a.backend = v; i++; break;
      case '--dry-run': a.dryRun = true; break;
      default: console.error(`unknown arg ${k}`); process.exit(2);
    }
  }
  return a;
}

// ---------- rng ----------
function mulberry32(s) {
  return () => { s |= 0; s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
const pick = (r, xs) => xs[Math.floor(r() * xs.length)];
function pickW(r, entries) { // [[value, weight], ...]
  const tot = entries.reduce((s, [, w]) => s + w, 0); let x = r() * tot;
  for (const [v, w] of entries) { if ((x -= w) < 0) return v; }
  return entries[entries.length - 1][0];
}

// ---------- sources ----------
const SCHEMA_DIR = path.join(ROOT, 'ir/schemas');
const SCHEMAS = Object.fromEntries(fs.readdirSync(SCHEMA_DIR).filter(f => f.endsWith('.json')).map(f => {
  const j = JSON.parse(fs.readFileSync(path.join(SCHEMA_DIR, f), 'utf8'));
  return [f.replace(/\.json$/, ''), JSON.stringify(j)];
}));
const TOOLS = Object.keys(SCHEMAS);
// Binaries a rendered pilot command may use (schemas + compiler-produced xargs).
const ALLOWED_BINS = new Set([...TOOLS, 'xargs']);

function irSection(md, startRe, endRe) {
  const lines = md.split('\n'); const s = lines.findIndex(l => startRe.test(l));
  if (s < 0) return '';
  let e = lines.findIndex((l, i) => i > s && endRe.test(l)); if (e < 0) e = lines.length;
  return lines.slice(s, e).join('\n').trim();
}
const IR_MD = fs.readFileSync(path.join(ROOT, 'docs/IR.md'), 'utf8');
const SEC0 = irSection(IR_MD, /^## 0\./, /^## 1\./).replace(/\n---\s*$/, '');
const SEC3 = irSection(IR_MD, /^## 3\./, /^## 4\./).replace(/\n---\s*$/, '');
const SEC8 = irSection(IR_MD, /^## 8\./, /^## 9\./).replace(/\n---\s*$/, '');
const SEC7_ROWS = irSection(IR_MD, /^## 7\./, /^## 8\./).split('\n').filter(l => /^\| \d+ \|/.test(l));

// Keep only request + bash/verdict columns of §7 rows (format examples, no IR internals needed).
function exampleRows(nums) {
  return SEC7_ROWS.filter(l => nums.includes(+l.split('|')[1].trim())).map(l => {
    const c = l.split(/(?<!\\)\|/).map(x => x.trim().replace(/\\\|/g, '|')); return `- "${c[2]}" -> ${c[4]}`;
  }).join('\n');
}
const BASE_EXAMPLES = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 16, 18, 21, 22, 26, 28, 32, 36, 38, 39, 41, 45, 50, 55, 56, 57, 60];

// ---------- plan ----------
const TOOL_W = [['rg', 14], ['grep', 9], ['find', 11], ['ls', 6], ['git', 11], ['head', 6], ['tail', 6], ['wc', 6],
  ['sort', 3], ['uniq', 2], ['sed', 3], ['jq', 3], ['curl', 3], ['npm', 3], ['ps', 3], ['lsof', 3], ['pkill', 3]];
const PIPES = [
  { name: 'search_count', tools: ['rg', 'grep', 'wc'], desc: 'rg/grep piped to wc -l (count matching lines / occurrences via -o / files via -l)' },
  { name: 'find_each', tools: ['find', 'wc', 'head', 'tail', 'rg', 'grep', 'ls'], desc: 'find ... -exec CMD ... -- {} + folds (wc -l, head -n, rg -e P -H, ls -l)' },
  { name: 'rg_l_xargs', tools: ['rg', 'wc', 'head', 'tail', 'git'], desc: 'rg -l -0 ... | xargs -0 -r CMD -- (linux) / xargs -0 CMD -- (darwin); git diff --name-only -z | xargs -0 ...' },
  { name: 'git_log_head', tools: ['git', 'head', 'tail', 'rg', 'grep', 'wc'], desc: 'git log/diff/branch output piped to head/tail/grep/wc' },
  { name: 'freq', tools: ['sort', 'uniq', 'head', 'rg', 'grep'], desc: 'sort | uniq -c | sort -rn | head -n N (frequency), optionally after a search; sort -u' },
  { name: 'ps_grep', tools: ['ps', 'grep', 'lsof', 'wc'], desc: 'ps aux | grep NAME, ps aux | wc -l, lsof port checks' },
  { name: 'tail_follow_filter', tools: ['tail', 'grep', 'rg', 'head'], desc: 'tail -f FILE | grep --line-buffered P, tail -n N | grep, head after a filter' },
  { name: 'curl_jq_npm', tools: ['curl', 'jq', 'npm', 'tail'], desc: 'curl -g -s URL | jq \'.field\'; npm test 2>&1 | tail -n N; cd ./dir && npm run X && npm test' },
];
const CONTRASTS = [
  'literal vs regex (rg -F / grep -F vs a regex pattern, ^anchors from "starts with")',
  'first N matches overall (| head -n N) vs N matches per file (-m N)',
  'count of files vs lines vs occurrences (-l | wc -l, one total | wc -l, -o | wc -l; -c only per file)',
  'staged vs working tree vs against a branch (git diff --staged / git diff / git diff main)',
  'exclude a directory vs invert match (-g \'!dir\' vs -v)',
  'head vs tail direction, lines vs bytes',
  'find by name glob vs by content search; find size_gt vs size_lt; modified within vs before',
  'git log commits count (-n) vs piping lines to head',
];
const ABSTAIN = [
  { name: 'out_of_scope', w: 6, desc: 'requests needing §8 constructs: awk, sed substitution / sed -i, loops, writes (>, tee, cp, mv, rm), sudo, git write ops (commit, push, checkout, reset), npm install, cut, sort -k, xargs -I, kill by port, chmod, docker' },
  { name: 'ambiguous', w: 3, desc: 'requests whose intended command cannot be decided: "count TODOs" (files? lines? occurrences?), "show the previous commit", "search for foo in tests" (dir vs files), "diff vs main" variants, vague "clean up logs"' },
  { name: 'underspecified', w: 3, desc: 'requests missing a required value: no pattern, no file, "a few" lines, no port, no URL, no process name' },
  { name: 'not_shell', w: 3, desc: 'chit-chat, general knowledge, coding questions not asking for a command ("explain closures", "thanks!", "what is the capital of France", "write me a poem")' },
];
const STYLES = [
  'terse dev shorthand, lowercase, no punctuation (e.g. "rg todo src ts only")',
  'full polite sentences',
  'questions ("how do I...", "which files...", "is X...?")',
  'imperative commands ("show", "list", "find", "print")',
  'colloquial / chatty, slang',
  'with typos and missing punctuation (keep copied values exact)',
  'non-native English (slightly odd grammar, articles dropped)',
  'very specific: concrete paths, globs, numbers, quoted patterns',
  'vague but still complete enough for its label',
  'mixed: half terse, half full sentences',
];
const PROJECTS = ['a Node/TypeScript web app', 'a Python data pipeline', 'a Go microservice', 'a Rust CLI', 'a Java/Gradle backend', 'a monorepo with packages/*', 'a React Native app', 'an infra repo (terraform, ansible)', 'a Django site', 'a C/C++ library', 'a docs site (markdown)', 'a PHP/Laravel app', 'an ML research repo', 'a Ruby on Rails app', 'dotfiles and shell scripts'];

function buildPlan(a) {
  const r = mulberry32(a.seed);
  const n = Math.ceil(a.total / a.perCall);
  const plan = [];
  for (let i = 0; i < n; i++) {
    const k = Math.min(a.perCall, a.total - i * a.perCall);
    const kind = pickW(r, [['single', 55], ['pipe', 20], ['contrast', 10], ['abstain', 15]]);
    const spec = { kind, k, style: pick(r, STYLES), style2: pick(r, STYLES), project: pick(r, PROJECTS), os_linux_share: pick(r, [0.5, 0.6, 0.7]) };
    if (kind === 'single') { spec.focus = pickW(r, TOOL_W); spec.mix = { ok: 0.9, other: 0.1 }; }
    else if (kind === 'pipe') { const p = pick(r, PIPES); spec.focus = p.name; spec.tools = p.tools; spec.desc = p.desc; spec.mix = { ok: 0.9, other: 0.1 }; }
    else if (kind === 'contrast') { spec.focus = pick(r, CONTRASTS); spec.tools = ['rg', 'grep', 'find', 'git', 'head', 'wc']; spec.mix = { ok: 0.85, other: 0.15 }; }
    else { const ab = pickW(r, ABSTAIN.map(x => [x, x.w])); spec.focus = ab.name; spec.desc = ab.desc; spec.tools = ['rg', 'find', 'git']; spec.mix = { [ab.name]: 0.75, ok: 0.25 }; }
    plan.push({ call: i, spec });
  }
  return plan;
}

// ---------- prompt ----------
const SYSTEM = 'You generate synthetic training data for a natural-language-to-shell model. You output only JSON matching the given schema. You follow the provided tool schemas and rendering rules exactly.';

const OUT_SCHEMA = {
  type: 'object', required: ['items'],
  properties: { items: { type: 'array', items: { type: 'object', required: ['request', 'label', 'shell', 'os', 'command', 'tools', 'reason'],
    properties: {
      request: { type: 'string' },
      label: { type: 'string', enum: ['ok', 'ambiguous', 'underspecified', 'out_of_scope', 'not_shell'] },
      shell: { type: 'string', enum: ['bash'] },
      os: { type: 'string', enum: ['linux', 'darwin'] },
      command: { type: 'string' },
      tools: { type: 'array', items: { type: 'string' } },
      reason: { type: 'string' },
    }, additionalProperties: false } } }, additionalProperties: false,
};

function buildPrompt(spec, call = 0, seed = 1) {
  const vr = mulberry32((seed * 1000003 + call * 7919) | 0);
  const vals = sampleValues(vr);
  const opens = []; while (opens.length < 4) { const o = pick(vr, OPENINGS); if (!opens.includes(o)) opens.push(o); }
  const valueBlock = Object.entries(vals).map(([k, xs]) => `- ${k}: ${xs.map(x => JSON.stringify(x)).join(', ')}`).join('\n');
  const tools = spec.kind === 'single' ? [spec.focus] : spec.tools;
  const schemas = tools.map(t => `### ${t}.json\n${SCHEMAS[t]}`).join('\n\n');
  let focus;
  if (spec.kind === 'single') focus = `Single-command requests for the tool \`${spec.focus}\`. Cover many different options/mods of its schema (not just the common ones), different value types and normalizations. About ${Math.round(spec.mix.other * 100)}% may be non-ok (underspecified/ambiguous/out_of_scope) near-misses for this tool.`;
  else if (spec.kind === 'pipe') focus = `Compositions (pipes / each fan-out) legal per §3: ${spec.desc}. Respect the §3 table and limits. About ${Math.round(spec.mix.other * 100)}% may be illegal-composition requests labelled out_of_scope.`;
  else if (spec.kind === 'contrast') focus = `Minimal pairs / contrastive requests: ${spec.focus}. Emit items in adjacent pairs (or triples) whose wording differs minimally but whose commands differ. About ${Math.round(spec.mix.other * 100)}% may be the ambiguous/underspecified member of a pair.`;
  else focus = `Abstentions, label \`${spec.focus}\`: ${spec.desc}. About ${Math.round(spec.mix.ok * 100)}% should be closely-related ok requests (near-misses that ARE expressible) to sharpen the boundary.`;

  return `Generate exactly ${spec.k} items.

FOCUS: ${focus}
STYLE: mostly "${spec.style}", some "${spec.style2}". Imagine the user works on ${spec.project}.
OS: about ${Math.round(spec.os_linux_share * 100)}% "linux", rest "darwin". shell is always "bash".

## Item fields
- request: what a developer would type. Diverse, realistic phrasing; no two requests with the same wording; vary file names, paths, patterns, numbers (not always src/app.log/TODO).
- label: ok | ambiguous | underspecified | out_of_scope | not_shell.
- command: the bash command for ok items; "" for every non-ok item.
- tools: binaries used in command (e.g. ["rg","wc"]); [] for non-ok.
- reason: "" for ok; short reason for non-ok (e.g. "write_effect: sed -i", "need: a search pattern", "count kind not determinable").

## Values to use (sampled for this batch)
Draw file names, directories, extensions, patterns, authors, branches, revs, URLs, processes, ports, jq fields, sizes, ages and counts from these lists (mix and vary them; small variations are fine). Do NOT default to src/, docs/, README, app.log, TODO or foo unless they appear here.
${valueBlock}

## Request openings
Spread the requests over these opening styles (each used several times): ${opens.map(o => `[${o}]`).join('; ')}. At most 1 in 10 requests may start with "how many", and at most 1 in 10 with "show".

## Rules for requests
- Never paste a command into the request. At most ~1 in 10 requests may name a single flag; never the whole command line. The rest describe the intent in words ("with line numbers", "ignore case", "only file names").
- Counting requests always say WHAT is counted (lines / files / matches / occurrences / commits / processes), except in deliberately ambiguous items labelled ambiguous.
- Literal vs regex: the request uses words like "regex", "pattern", "matching ^...", "starts with", "ends with", or clearly writes regex syntax → regex. Otherwise the search text is a literal string.

## Tool choice rules
- grep ONLY when the request literally names grep; otherwise text search uses rg.
- regex (grep -E, or an rg regex pattern) ONLY when the request asks for a regex/pattern as above; otherwise use literal search (rg -F / grep -F when the text has regex metacharacters, plain literal pattern otherwise).

## Rules for ok commands
- Use ONLY the tools, ops and option flags present in the given schemas (and xargs only as the compiler's \`xargs -0 -r\` (linux) / \`xargs -0\` (darwin) transport). Nothing excluded by the schema notes.
- Copy rule: every value in the command (pattern, path, glob stem, name, URL, author, rev) must appear verbatim in the request, or be an allowed normalization: numbers words->digits, sizes->bytes with c (find -size +52428800c), relative days (-mtime -2), git dates (--since='1 week ago'), extension/language -> glob ('*.py'), "starts with X" -> '^X', jq field -> '.field', signals (force -> -KILL).
- Rendering: single quotes only when needed (metachars, spaces, globs); a path starting with ~/ ALWAYS keeps ~/ unquoted so it expands (never '~/x') (~/.config/x, or ~/'my dir/x' when the rest needs quotes); '\\'' for embedded quotes; patterns starting with - use -e; find leading-dash roots as ./-x; rg/grep first stage always has a path operand ('.' if none given); grep is recursive with -r and uses --include=/--exclude=/--exclude-dir=; rg uses -g 'GLOB' / -g '!DIR'; find exclude dir via -type d -name D -prune -o ... -print; each-inner argv ends with -- (find ... -exec wc -l -- {} +, xargs -0 -r wc -l --); inner rg/grep get -H and -e P.
- Forbidden in ok commands: ; || > >> $( backticks, loops, sudo, rm, any write, awk, cut, tee, sed other than sed -n 'A,Bp'. && only as in the npm example.
- If the request needs anything outside the schemas or §8 lists it, the label is out_of_scope (never approximate).

## Conventions (docs/ir_error_taxonomy_v2.md F10; gold_rewrite.mjs lints these)
- Decline (ambiguous / underspecified) ONLY when no single supported op answers the request. Clear tail, sed -n, jq, pkill, curl and git log requests are ok, never declined.
- Listing files: find D -type f [-maxdepth N] [-name G] [-not -name G]. rg --files ONLY when the request names rg/ripgrep, "files rg would search" or gitignore/ignored-file semantics.
- Never put -o before sort | uniq -c, sort -u or head when the request is about lines; -o only for "matches / occurrences / matched text / extract".
- git log -n N (with --oneline or a one-line --format), never a multi-line git log piped to head.
- "Count lines with X" over a directory, glob or several paths: one total (rg X D | wc -l). -c only for a single file or an "each / per / every file" cue.
- "the repo", "this project", "my repo" without a path → the current directory (no path operand / '.'), never a literal repo or project dir.
- curl -I only for "headers only / just the headers / HEAD"; -i for headers together with the body.

## IR invariants (§0)
${SEC0}

## Stream typing and legal compositions (§3)
${SEC3}

## Out of scope (§8)
${SEC8}

## Format examples (request -> bash / verdict), linux unless noted
${exampleRows(BASE_EXAMPLES)}

## Tool schemas (JSON, authoritative for flags)
${schemas}

Return {"items":[...]} with exactly ${spec.k} items.`;
}

// ---------- grok call ----------
function runGrok(promptFile, a, cwd) {
  return new Promise((resolve) => {
    const args = ['--prompt-file', promptFile, '--no-subagents', '--disable-web-search', '--max-turns', '1', '--tools', '',
      '--system-prompt-override', SYSTEM, '--json-schema', JSON.stringify(OUT_SCHEMA)];
    if (a.model) args.push('-m', a.model);
    if (a.effort) args.push('--reasoning-effort', a.effort);
    const ch = spawn('grok', args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '', err = '';
    ch.stdout.on('data', d => out += d); ch.stderr.on('data', d => err += d);
    const t = setTimeout(() => ch.kill('SIGKILL'), a.timeoutS * 1000);
    ch.on('close', code => { clearTimeout(t); resolve({ code, out, err }); });
    ch.on('error', e => { clearTimeout(t); resolve({ code: -1, out, err: String(e) }); });
  });
}

// ---------- codex / claude backends (same prompt, same schema) ----------
function runCmd(bin, args, cwd, a, input) {
  return new Promise((resolve) => {
    // CLIs run on the subscription login: never hand them a paid API key (global no-paid-API rule)
    const env = { ...process.env };
    for (const k of ['ANTHROPIC_API_KEY', 'CLAUDE_API_KEY', 'ANTHROPIC_AUTH_TOKEN', 'OPENAI_API_KEY', 'XAI_API_KEY']) delete env[k];
    const ch = spawn(bin, args, { cwd, env, stdio: [input == null ? 'ignore' : 'pipe', 'pipe', 'pipe'] });
    let out = '', err = '';
    ch.stdout.on('data', d => out += d); ch.stderr.on('data', d => err += d);
    if (input != null) { ch.stdin.write(input); ch.stdin.end(); }
    const t = setTimeout(() => ch.kill('SIGKILL'), a.timeoutS * 1000);
    ch.on('close', code => { clearTimeout(t); resolve({ code, out, err }); });
    ch.on('error', e => { clearTimeout(t); resolve({ code: -1, out, err: String(e) }); });
  });
}
async function runBackend(promptFile, a, cwd) {
  if (!a.backend || a.backend === 'grok') return runGrok(promptFile, a, cwd);
  const prompt = fs.readFileSync(promptFile, 'utf8');
  if (a.backend === 'codex') {
    const sf = promptFile + '.schema.json', of = promptFile + '.out.json';
    fs.writeFileSync(sf, JSON.stringify(OUT_SCHEMA));
    const args = ['exec', '-m', a.model || 'gpt-6-luna', '-c', `model_reasoning_effort="${a.effort || 'low'}"`, '--disable', 'multi_agent',
      '-s', 'read-only', '--skip-git-repo-check', '--json', '--output-schema', sf, '-o', of, '-'];
    const r = await runCmd('codex', args, cwd, a, `${SYSTEM}\n\n${prompt}`);
    let usage = {};
    for (const l of r.out.split('\n')) { try { const e = JSON.parse(l); const u = e.usage || e.msg?.info?.total_token_usage || e.info?.total_token_usage; if (u) usage = u; } catch {} }
    let text = ''; try { text = fs.readFileSync(of, 'utf8'); } catch {}
    return { code: r.code, err: r.err, out: JSON.stringify({ text, usage: { input_tokens: usage.input_tokens || 0, output_tokens: usage.output_tokens || 0, reasoning_tokens: usage.reasoning_output_tokens || usage.reasoning_tokens || 0, cached_input_tokens: usage.cached_input_tokens || 0 }, total_cost_usd: 0, modelUsage: { [a.model || 'gpt-6-luna']: {} } }) };
  }
  if (a.backend === 'claude') {
    const args = ['-p', '--model', a.model || 'claude-haiku-5-5', '--effort', a.effort || 'low', '--output-format', 'json', '--json-schema', JSON.stringify(OUT_SCHEMA),
      '--no-session-persistence', '--tools', '', '--system-prompt', SYSTEM];
    const r = await runCmd('claude', args, cwd, a, prompt);
    let j = {}; try { j = JSON.parse(r.out); } catch { return r; }
    const u = j.usage || {};
    const so = j.structured_output ?? j.structuredOutput;
    return { code: r.code, err: r.err, out: JSON.stringify({ structuredOutput: so, text: j.result, usage: { input_tokens: (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0), output_tokens: u.output_tokens || 0, reasoning_tokens: 0 }, total_cost_usd: j.total_cost_usd || 0, modelUsage: j.modelUsage || { [a.model || 'claude-haiku-5-5']: {} } }) };
  }
  if (a.backend === 'api') {
    // Anthropic Messages API (raw HTTP; key from CLAUDE_API_KEY or ANTHROPIC_API_KEY, never logged)
    const key = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;
    if (!key) return { code: 1, out: '', err: 'no CLAUDE_API_KEY / ANTHROPIC_API_KEY' };
    const model = a.model || 'claude-haiku-5-5';
    const body = { model, max_tokens: 32000, system: SYSTEM, messages: [{ role: 'user', content: prompt }],
      output_config: { effort: a.effort || 'medium', format: { type: 'json_schema', schema: OUT_SCHEMA } } };
    try {
      const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), a.timeoutS * 1000);
      const res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', signal: ctl.signal,
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json', ...((process.env.CLAUDE_WORKSPACE_ID || process.env.ANTHROPIC_WORKSPACE_ID) ? { 'anthropic-workspace-id': process.env.CLAUDE_WORKSPACE_ID || process.env.ANTHROPIC_WORKSPACE_ID } : {}) }, body: JSON.stringify(body) });
      clearTimeout(t);
      const j = await res.json();
      if (!res.ok) return { code: 1, out: '', err: `HTTP ${res.status}: ${j?.error?.type || ''} ${j?.error?.message || ''}`.slice(0, 300) };
      if (j.stop_reason !== 'end_turn') return { code: 1, out: '', err: `stop_reason ${j.stop_reason}` };
      const text = (j.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('');
      const u = j.usage || {};
      const PRICE = { 'claude-haiku-5-5': [0.10, 0.50], 'claude-sonnet-5-5': [2, 10], 'claude-opus-5-5': [4, 20] }[model] || [0, 0];
      const inTok = (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) + (u.cache_read_input_tokens || 0);
      const cost = (inTok * PRICE[0] + (u.output_tokens || 0) * PRICE[1]) / 1e6;
      return { code: 0, err: '', out: JSON.stringify({ text, usage: { input_tokens: inTok, output_tokens: u.output_tokens || 0, reasoning_tokens: 0 }, total_cost_usd: cost, modelUsage: { [model]: {} } }) };
    } catch (e) { return { code: 1, out: '', err: String(e).slice(0, 300) }; }
  }
  throw new Error('unknown backend ' + a.backend);
}

function parseGrok(out) {
  const j = JSON.parse(out);
  let items = j.structuredOutput?.items;
  if (!items) {
    let t = j.text;
    if (typeof t === 'string') { t = t.trim().replace(/^```(?:json)?\s*/, '').replace(/```\s*$/, ''); t = JSON.parse(t); }
    items = t?.items;
  }
  if (!Array.isArray(items)) throw new Error('no items array');
  const model = j.modelUsage ? Object.keys(j.modelUsage)[0] : '';
  return { items, usage: j.usage || {}, cost: j.total_cost_usd ?? 0, model };
}

// ---------- validation ----------
const FORBIDDEN = [[/;/, ';'], [/\|\|/, '||'], [/>>?/, 'redirect'], [/\$\(/, '$('], [/`/, 'backtick'], [/(^|[\s|&])sudo\b/, 'sudo'], [/(^|[\s|&])rm\b/, 'rm'],
  [/\b(for|while|until|do|done)\b/, 'loop'], [/(^|[\s|])(awk|cut|tee|perl|python|node)\b/, 'embedded/writer']];
function cmdBins(cmd) {
  const bins = [];
  for (const seg of cmd.split(/\|\s*|&&/)) {
    const w = seg.trim().split(/\s+/); if (!w[0]) continue;
    if (w[0] === 'cd') continue;
    bins.push(w[0]);
    if (w[0] === 'xargs') { const j = w.findIndex((x, i) => i > 0 && !x.startsWith('-')); if (j > 0) bins.push(w[j]); }
  }
  const ex = cmd.match(/-exec\s+(\S+)/g) || []; for (const e of ex) bins.push(e.split(/\s+/)[1]);
  return bins;
}
function validate(it, seen) {
  const issues = [];
  if (typeof it.request !== 'string' || !it.request.trim()) issues.push('empty request');
  const key = (it.request || '').trim().toLowerCase().replace(/\s+/g, ' ');
  if (seen.has(key)) issues.push('duplicate request'); else seen.add(key);
  const cmd = (it.command || '').trim();
  if (it.label === 'ok') {
    if (!cmd) issues.push('ok without command');
    else {
      const unq = cmd.replace(/'[^']*'/g, "''"); // ignore quoted content
      for (const [re, name] of FORBIDDEN) if (re.test(unq)) issues.push(`forbidden: ${name}`);
      if (/&&/.test(unq) && !/\bnpm\b/.test(unq)) issues.push('forbidden: && outside npm');
      if (/sed\s/.test(unq) && !/^sed -n '\d+(,(\d+|\$))?p'/.test(cmd.slice(cmd.indexOf('sed')))) issues.push('forbidden: sed beyond -n A,Bp');
      for (const b of cmdBins(cmd)) if (!ALLOWED_BINS.has(b)) issues.push(`tool not in schemas: ${b}`);
    }
  } else if (cmd) issues.push('non-ok with command');
  return issues;
}

// ---------- main ----------
async function main() {
  const a = parseArgs(process.argv);
  const out = path.resolve(ROOT, a.out);
  const cwd = path.join(ROOT, 'build/ir/grok/cwd');
  const promptDir = path.join(out, 'prompts');
  fs.mkdirSync(promptDir, { recursive: true }); fs.mkdirSync(cwd, { recursive: true });
  const plan = buildPlan(a);
  fs.writeFileSync(path.join(out, 'plan.json'), JSON.stringify({ args: a, plan }, null, 1));
  const usageF = path.join(out, 'usage.jsonl'), itemsF = path.join(out, 'items.jsonl'), rejF = path.join(out, 'rejects.jsonl');

  const done = new Set();
  if (fs.existsSync(usageF)) for (const l of fs.readFileSync(usageF, 'utf8').split('\n')) { if (!l) continue; try { const u = JSON.parse(l); if (u.ok) done.add(u.call); } catch {} }
  const seen = new Set();
  if (fs.existsSync(itemsF)) for (const l of fs.readFileSync(itemsF, 'utf8').split('\n')) { if (!l) continue; try { seen.add(JSON.parse(l).request.trim().toLowerCase().replace(/\s+/g, ' ')); } catch {} }

  const todo = plan.filter(p => !done.has(p.call));
  console.log(`plan: ${plan.length} calls (${done.size} already ok, ${todo.length} to run), out=${out}`);
  if (a.dryRun) { fs.writeFileSync(path.join(promptDir, 'dry.txt'), buildPrompt((todo[0] || plan[0]).spec, (todo[0] || plan[0]).call, a.seed)); console.log('dry run: wrote prompts/dry.txt'); return; }

  const t0 = Date.now(); let nOk = 0, nFail = 0, nItems = 0, nRej = 0, tokIn = 0, tokOut = 0, tokR = 0, cost = 0; const labels = {};
  let next = 0;
  async function worker() {
    while (next < todo.length) {
      const p = todo[next++];
      const pf = path.join(promptDir, `call${p.call}.txt`); fs.writeFileSync(pf, buildPrompt(p.spec, p.call, a.seed));
      let res, error = '', ms = 0, usage = {}, c = 0;
      for (let attempt = 0, waits = 0; attempt < 3; attempt++) {
        const s = Date.now(); const r = await runBackend(pf, a, cwd); ms += Date.now() - s;
        // rate limited / overloaded: back off and retry without spending an attempt (bounded)
        if (r.code !== 0 && /HTTP (429|529)|overloaded/i.test(r.err || '') && waits < 40) {
          waits++; attempt--; await new Promise((ok) => setTimeout(ok, Math.min(120000, 15000 * Math.min(waits, 4) + (p.call % 13) * 1000)));
          continue;
        }
        try {
          if (r.code !== 0) throw new Error(`exit ${r.code}: ${(r.err || r.out).slice(0, 300)}`);
          res = parseGrok(r.out); usage = res.usage; c = res.cost; break;
        } catch (e) {
          error = String(e.message || e);
          try { const j = JSON.parse(r.out); usage = j.usage || usage; c += j.total_cost_usd || 0; } catch {}
          res = null;
        }
      }
      const u = { call: p.call, input_tokens: usage.input_tokens || 0, output_tokens: usage.output_tokens || 0, reasoning_tokens: usage.reasoning_tokens || 0, cost_usd: c, ms, n_items: res ? res.items.length : 0, ok: !!res, error: res ? '' : error };
      tokIn += u.input_tokens; tokOut += u.output_tokens; tokR += u.reasoning_tokens; cost += c;
      if (res) {
        nOk++;
        const lines = [], rej = [];
        for (const it of res.items) {
          const rec = { ...it, call: p.call, spec: p.spec, model: res.model };
          const issues = validate(it, seen);
          if (issues.length) rej.push(JSON.stringify({ ...rec, issues }));
          lines.push(JSON.stringify(rec)); labels[it.label] = (labels[it.label] || 0) + 1;
        }
        fs.appendFileSync(itemsF, lines.map(l => l + '\n').join(''));
        if (rej.length) fs.appendFileSync(rejF, rej.map(l => l + '\n').join(''));
        nItems += lines.length; nRej += rej.length;
      } else nFail++;
      fs.appendFileSync(usageF, JSON.stringify(u) + '\n');
      console.log(`[${nOk + nFail}/${todo.length}] call ${p.call} ${p.spec.kind}:${p.spec.focus} ${u.ok ? `ok ${u.n_items} items` : `FAIL ${error.slice(0, 120)}`} ${(ms / 1000).toFixed(1)}s $${c.toFixed(4)}`);
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, a.concurrency) }, worker));
  const wall = (Date.now() - t0) / 1000;
  console.log('\n=== summary ===');
  console.log(`calls ok ${nOk}, failed ${nFail}; items ${nItems}; flagged ${nRej} (rejects.jsonl)`);
  console.log(`labels ${JSON.stringify(labels)}`);
  console.log(`tokens in ${tokIn} out ${tokOut} reasoning ${tokR}; total_cost_usd ${cost.toFixed(4)}${nItems ? ` ($${(cost / nItems).toFixed(5)}/item)` : ''}`);
  console.log(`wall ${wall.toFixed(1)}s`);
}

main().catch(e => { console.error(e); process.exit(1); });
