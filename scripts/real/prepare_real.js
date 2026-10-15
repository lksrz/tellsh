#!/usr/bin/env node
// Real-usage data (PRIVATE, never committed): turn the real-command dataset into labelled request rows and a
// train / eval split held out by COMMAND GROUP. Writes only under build/real/ (gitignored):
//   build/real/rows.jsonl   {text, intent|null, lang, shell, os, group, split: train|eval, cmd, literal, src, tmpl}
//   build/real/stats.json   aggregate counts only (safe to quote in docs)
//
// Input: $TELLSH_REAL_DATA or /workspace/tellsh-data/dataset.jsonl; one row per unique (redacted) command with
// 3 EN + 3 PL LLM-written request descriptions. Only `generic` + `verified` rows are used; the `tool` field is
// ignored (noisy). Labels:
//   1. the command matches one of the v0.4 developer-tool patterns below (deterministic, checked on the command)
//   2. else the dataset's `intent_or_null`, when it is a catalog intent
//   3. else null: a real shell task outside the catalog ("out-of-catalog"; eval only: should be rejected/composed)
// Command group: head + subcommands + sorted flags + number of operands, with every value masked, so
// `gh pr view 12 --repo a/b` and `gh pr view 40 --repo c/d` are one group. Every group goes to ONE side: it is owned by
// its majority label, and per label whole owned groups go to eval until >= 25% of that label's commands are held out.
// `tmpl` marks rows whose descriptions were template-generated (aic-studio only); real_rows.js fills caps with them last.
//
// `--group structural` (default) is the split the 0.3.5+ models were trained and evaluated on (per-tool subcommand
// depth, operands masked). `--group v04` reproduces the 0.3.3 split, whose skeleton keeps up to two lower-case words
// after the head, so operands leak into it (`npm install express` / `npm install react` are two groups; 552 of its 2957
// labelled eval rows share a structural skeleton with a train row, scripts/real/group_leak.js, HYBRID.md#v04-real-usage).
// The templates-catalog patterns (0.3.4 intents) postdate the 0.3.5/0.3.6 build/real: a rebuild labels those commands
// instead of leaving them out-of-catalog (other groups can change sides too); `--labels 036` leaves them out and
// reproduces the 0.3.5/0.3.6 build/real.
//
// Usage: node scripts/real/prepare_real.js [--data <dataset.jsonl>] [--eval-frac 0.25] [--group v04|structural] [--labels current|036]
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { BY_ID } from '../../src/catalog.js';
import { strip, group } from './group.js';
import { writePrivate } from '../lib/privwrite.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const SRC = arg('--data', process.env.TELLSH_REAL_DATA || '/workspace/tellsh-data/dataset.jsonl');
const EVAL_FRAC = +arg('--eval-frac', 0.25);
const GROUP = arg('--group', 'structural');
const LABELS = arg('--labels', 'current');
if (!['current', '036'].includes(LABELS)) { console.error(`prepare_real: --labels must be current or 036, got ${LABELS}`); process.exit(1); }
if (!existsSync(SRC)) { console.error(`prepare_real: no dataset at ${SRC}`); process.exit(1); }

// v0.4 intents: label = the command itself (sudo / npx / env prefixes stripped)
const NEW = [
  ['wrangler_deploy', /^wrangler (deploy|publish)\b/],
  ['wrangler_dev', /^wrangler dev\b/],
  ['wrangler_tail', /^wrangler tail\b(?!.*--help)/],
  ['wrangler_secret_put', /^wrangler secret put\b/],
  ['wrangler_login', /^wrangler login\b/],
  ['wrangler_whoami', /^wrangler whoami\b/],
  ['gh_auth_status', /^gh auth status\b/],
  ['gh_auth_login', /^gh auth login\b/],
  ['gh_pr_list', /^gh pr list\b/],
  ['gh_pr_view', /^gh pr view\b/],
  ['gh_pr_create', /^gh pr create\b/],
  ['gh_pr_checks', /^gh pr checks\b/],
  ['gh_pr_merge', /^gh pr merge\b/],
  ['gh_run_list', /^gh run list\b/],
  ['gh_run_view', /^gh run view\b/],
  ['npm_install_global', /^npm (i|install)\b.*\s(-g|--global)\b/],
  ['npm_install', /^npm (i|install|ci)\b(?!.*\s(-g|--global)\b)/],
  ['npm_run_script', /^npm(?: --prefix \S+)? (?:run(?:-script)? [\w:.-]+|test|start|t)(?:\s|$)/],
  ['pip_install', /^(?:pip3?|python3?(?:\.\d+)? -m pip) install\b(?!.*\s-(?:r|e)\b)/],
  ['activate_venv', /^(?:source|\.) \S*\/bin\/activate(?:\.fish)?\s*$|\\Scripts\\activate(?:\.bat|\.ps1)?\s*$/i],
  // templates-catalog (0.3.4): left out with --labels 036, which reproduces the 0.3.5/0.3.6 build/real exactly
  ...(LABELS === '036' ? [] : [
    ['wrangler_d1_list', /^wrangler d1 list\b/],
    ['wrangler_pages_deploy', /^wrangler pages deploy\b/],
    ['gh_run_watch', /^gh run watch\b/],
    ['gh_issue_list', /^gh issue list\b/],
    ['gh_issue_view', /^gh issue view\b/],
    ['git_show', /^git show(?: [\w~^.\/-]+)?$/],
    ['git_fetch', /^git fetch(?: (?:--all|--prune|-p|origin))*$/],
    ['git_ls_files', /^git ls-files$/],
    ['git_grep', /^git grep(?: -n)? (?:-- )?(?:'[^']*'|"[^"]*"|\S+)$/],
  ]),
  ['ssh_port_forward', /^ssh\b.*\s-\w*L\s?\d+:/],
  ['print_line_range', /^(?:nl -ba \S+ \| )?sed -n ['"]?\d+,\d+p['"]?(?: \S+)?$/],
  ['tool_version', /^[\w.-]+ (?:--version|-v|-V|version)$/],
  ['cli_help', /^[\w.-]+(?: [a-z][\w-]*){0,2} (?:--help|-h|help)$/],
];
const COMPOUND = /^(sleep|cd|for|while|if|echo|printf|bash|sh|zsh|pwd|export|time|timeout|-n|until|then|do)$/;
function newIntentOf(cmd) {
  const c = strip(cmd);
  for (const [id, re] of NEW) if (re.test(c)) return id;
  return null;
}

// redaction placeholders -> plausible values (same value in the command and its descriptions)
const USERS = ['alex', 'kasia', 'dev', 'mike', 'ola', 'jan', 'sam', 'deploy'];
const h = (s) => createHash('sha256').update(s).digest();
function fill(s, seed) {
  return s.replace(/<USER>/g, USERS[seed[0] % USERS.length]).replace(/<EMAIL>/g, 'someone@example.com')
    .replace(/<HEX>/g, seed.toString('hex').slice(0, 12)).replace(/<(PASSWORD|SECRET)>/g, 'xxxxxx');
}

const rows = readFileSync(SRC, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const st = { commands: 0, skippedNotGeneric: 0, skippedUnverified: 0, byLabelSource: { pattern: 0, dataset: 0, outOfCatalog: 0 }, relabelled: 0, droppedCompound: 0 };
const cmds = [];
for (const r of rows) {
  if (!r.generic) { st.skippedNotGeneric++; continue; }
  if (!r.verified || !r.descriptions_en?.length) { st.skippedUnverified++; continue; }
  const seed = h(r.cmd_redacted);
  const cmd = fill(r.cmd_redacted, seed);
  let intent = newIntentOf(cmd);
  if (intent) { st.byLabelSource.pattern++; if (r.intent_or_null && r.intent_or_null !== intent) st.relabelled++; }
  else if (r.intent_or_null && BY_ID[r.intent_or_null]) {
    // `sleep 30; cp …`, `cd x && cat …`, `for …`: a compound command is not one catalog intent (dataset label dropped)
    const head = strip(cmd).split(/[\s;]+/)[0];
    if (COMPOUND.test(head) && !(head === 'echo' && ['env_var_get', 'show_path'].includes(r.intent_or_null))) { st.droppedCompound++; continue; }
    intent = r.intent_or_null; st.byLabelSource.dataset++;
  }
  else { intent = null; st.byLabelSource.outOfCatalog++; }
  const shell = r.shell === 'powershell' ? 'powershell' : r.shell || 'bash';
  const os = r.os === 'windows' ? 'win32' : r.os || 'linux';
  // aic-studio-only rows: descriptions were template-generated there (lower training weight, see real_rows.js)
  const tmpl = Array.isArray(r.hosts) && r.hosts.length > 0 && r.hosts.every((x) => x === 'aic-studio');
  cmds.push({ cmd, intent, shell, os, group: group(cmd, GROUP), seed, src: r.source_type, tmpl,
    texts: [...r.descriptions_en.map((t) => [t, 'en']), ...r.descriptions_pl.map((t) => [t, 'pl'])] });
  st.commands++;
}

// group-wise split: every command skeleton goes to ONE side, whatever the labels of its commands. A group is owned by
// its majority label; per label, whole owned groups go to eval until >= EVAL_FRAC of that label's commands are held out
// (never more than half; labels with one group stay in train).
const gLabels = new Map();
for (const c of cmds) {
  const k = c.intent || '__ooc__';
  if (!gLabels.has(c.group)) gLabels.set(c.group, new Map());
  const m = gLabels.get(c.group); m.set(k, (m.get(k) || 0) + 1);
}
const byLabel = new Map();
for (const [g, m] of gLabels) {
  const owner = [...m.entries()].sort((x, y) => y[1] - x[1] || (x[0] < y[0] ? -1 : 1))[0][0];
  if (!byLabel.has(owner)) byLabel.set(owner, new Map());
  byLabel.get(owner).set(g, [...m.values()].reduce((x, y) => x + y, 0));
}
const evalSkeletons = new Set();
for (const [label, groups] of byLabel) {
  if (groups.size < 2) continue;
  const total = [...groups.values()].reduce((x, y) => x + y, 0);
  const order = [...groups.keys()].sort((x, y) => h(label + x).compare(h(label + y)));
  let n = 0;
  for (const g of order) {
    if (n >= EVAL_FRAC * total) break;
    if (n + groups.get(g) > 0.5 * total) continue; // never hold out more than half of a label
    evalSkeletons.add(g);
    n += groups.get(g);
  }
}

const out = [];
const norm = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
for (const c of cmds) {
  const split = evalSkeletons.has(c.group) ? 'eval' : 'train';
  for (const [t, lang] of c.texts) {
    if (!t || t.length > 300) continue;
    const text = fill(t, c.seed);
    out.push({ text, intent: c.intent, lang, shell: c.shell, os: c.os, group: c.group, split, cmd: c.cmd,
      literal: norm(text) === norm(c.cmd), src: c.src, tmpl: c.tmpl });
  }
}
// a text that occurs in both splits (short generic descriptions) is held out: dropped from train
const evalTexts = new Set(out.filter((r) => r.split === 'eval').map((r) => norm(r.text)));
const final = out.filter((r) => r.split === 'eval' || !evalTexts.has(norm(r.text)));
st.droppedTrainTextInEval = out.length - final.length;

const cnt = (f) => final.filter(f).length;
Object.assign(st, {
  rows: final.length,
  train: { rows: cnt((r) => r.split === 'train' && r.intent), oocRows: cnt((r) => r.split === 'train' && !r.intent) },
  eval: { rows: cnt((r) => r.split === 'eval' && r.intent), oocRows: cnt((r) => r.split === 'eval' && !r.intent),
    en: cnt((r) => r.split === 'eval' && r.intent && r.lang === 'en'), pl: cnt((r) => r.split === 'eval' && r.intent && r.lang === 'pl'),
    literal: cnt((r) => r.split === 'eval' && r.intent && r.literal),
    newIntents: cnt((r) => r.split === 'eval' && r.intent && NEW.some(([id]) => id === r.intent)),
    byShell: Object.fromEntries(['bash', 'zsh', 'powershell'].map((s) => [s, cnt((r) => r.split === 'eval' && r.intent && r.shell === s)])) },
  labels: { train: new Set(final.filter((r) => r.split === 'train' && r.intent).map((r) => r.intent)).size,
    eval: new Set(final.filter((r) => r.split === 'eval' && r.intent).map((r) => r.intent)).size },
  groups: { total: new Set(cmds.map((c) => c.group)).size, eval: evalSkeletons.size },
  perNewIntent: Object.fromEntries(NEW.map(([id]) => [id, { train: cnt((r) => r.intent === id && r.split === 'train'), eval: cnt((r) => r.intent === id && r.split === 'eval') }])),
});
mkdirSync(join(ROOT, 'build', 'real'), { recursive: true });
writePrivate(join(ROOT, 'build', 'real', 'rows.jsonl'), final.map((r) => JSON.stringify(r)).join('\n') + '\n');
writePrivate(join(ROOT, 'build', 'real', 'stats.json'), JSON.stringify(st, null, 1));
console.log(JSON.stringify({ commands: st.commands, rows: st.rows, train: st.train, eval: st.eval, labels: st.labels, groups: st.groups }));
