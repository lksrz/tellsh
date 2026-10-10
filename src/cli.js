// tellsh CLI: natural language (PL/EN) -> shell command, confirm, run.
import { spawn, spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline';
import { readFileSync } from 'node:fs';
import { constants as osConstants } from 'node:os';
import { getModel } from './model.js';
import { suggest as pipelineSuggest } from './pipeline.js';
import { checkDanger, maxRisk } from './danger.js';
import { detectEnv, normShell, normOs } from './env.js';
import { loadHistory } from './history.js';
import { joinArgs } from './shellwords.js';
import { suggestLazy } from './rerank/hybrid.js';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const HELP = `tellsh ${pkg.version} — natural language (Polish/English) -> shell command, fully offline

Usage: tellsh [options] <request...>

  tellsh pokaż 10 największych plików w ~/Pobrane
  tellsh what is listening on port 8080
  tellsh --history delete it
  tellsh -n kill node

Options:
  -n, --dry-run     print the command only, never run it
  -y, --yes         run without prompting (only risk=safe commands straight from the catalog;
                    never history-resolved, composed, incomplete or medium/high-risk ones)
  -e, --explain     show tool/intent scores, slots and their source
      --json        machine-readable output (implies --dry-run)
      --shell <s>   target shell: bash|zsh|sh|powershell|fish|cmd (default: detected)
      --os <o>      target OS: linux|darwin|win32 (default: this machine); --platform is an alias
      --history[=FILE]  use the previous shell command to resolve "it", "same for /var", ...
                    (read in memory only, never stored or logged; also TELLSH_HISTORY=1)
      --no-compose  never fall back to the experimental flag composer
      --compose     force the experimental composer
      --hybrid      when unsure, re-rank with the optional neural model (needs onnxruntime-node and the
                    tellsh-model-enc bundle; see HYBRID.md; also TELLSH_HYBRID=1, or =safe to never
                    turn a rejection into an answer)
      --top <k>     show k candidate intents (default 3)
      --threshold <p>  override confidence threshold
  -v, --version     print version
  -h, --help        this help

At the prompt: [Enter] run · e edit · n abort. High-risk and composed (experimental) commands
require typing "yes". Without a TTY (piped), tellsh only prints the command unless --yes is given.`;

const C = process.stdout.isTTY && !process.env.NO_COLOR
  ? { dim: (s) => `\x1b[2m${s}\x1b[0m`, bold: (s) => `\x1b[1m${s}\x1b[0m`, red: (s) => `\x1b[31m${s}\x1b[0m`,
      yellow: (s) => `\x1b[33m${s}\x1b[0m`, green: (s) => `\x1b[32m${s}\x1b[0m`, cyan: (s) => `\x1b[36m${s}\x1b[0m` }
  : { dim: (s) => s, bold: (s) => s, red: (s) => s, yellow: (s) => s, green: (s) => s, cyan: (s) => s };
const riskColor = (r) => (r === 'high' ? C.red : r === 'medium' ? C.yellow : C.green);

export function parseArgs(argv) {
  const o = { dryRun: false, yes: false, explain: false, json: false, top: 3, words: [], threshold: undefined, shell: undefined, os: undefined,
    history: process.env.TELLSH_HISTORY === '1', historyFile: undefined, compose: 'auto', hybrid: ['1', 'safe'].includes(process.env.TELLSH_HYBRID) };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--') { o.words.push(...argv.slice(i + 1)); break; }
    else if (a === '-n' || a === '--dry-run') o.dryRun = true;
    else if (a === '-y' || a === '--yes') o.yes = true;
    else if (a === '-e' || a === '--explain') o.explain = true;
    else if (a === '--json') { o.json = true; o.dryRun = true; }
    else if (a === '--top') o.top = Math.max(1, parseInt(argv[++i], 10) || 3);
    else if (a.startsWith('--top=')) o.top = Math.max(1, parseInt(a.slice(6), 10) || 3);
    else if (a === '--threshold' || a.startsWith('--threshold=')) {
      const v = a === '--threshold' ? argv[++i] : a.slice(12);
      o.threshold = /^\s*(?:\d+(?:\.\d*)?|\.\d+)\s*$/.test(v ?? '') ? Number(v) : NaN;
      if (!(o.threshold >= 0 && o.threshold <= 1)) o.badThreshold = v ?? '';
    }
    else if (a === '--platform' || a === '--os') o.os = argv[++i];
    else if (a.startsWith('--os=') || a.startsWith('--platform=')) o.os = a.split('=')[1];
    else if (a === '--shell') o.shell = argv[++i];
    else if (a.startsWith('--shell=')) o.shell = a.slice(8);
    else if (a === '--history') o.history = true;
    else if (a.startsWith('--history=')) { o.history = true; o.historyFile = a.slice(10); }
    else if (a === '--no-history') o.history = false;
    else if (a === '--compose') o.compose = 'force';
    else if (a === '--no-compose') o.compose = 'off';
    else if (a === '--hybrid') o.hybrid = true;
    else if (a === '--no-hybrid') o.hybrid = false;
    else if (a === '-v' || a === '--version') o.version = true;
    else if (a === '-h' || a === '--help') o.help = true;
    else o.words.push(a);
  }
  return o;
}

/** Pure function used by the CLI and tests: query -> suggestion object (see src/pipeline.js). */
export function suggest(query, { top = 3, threshold, platform, shell, os, history, cwd, compose } = {}) {
  return pipelineSuggest(query, { top, threshold, shell, os: os || platform, history, cwd, compose });
}

function ask(rl, q) {
  return new Promise((res) => rl.question(q, res));
}

function editLine(initial) {
  return new Promise((res) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl.question(C.cyan('edit> '), (ans) => { rl.close(); res(ans); });
    rl.write(initial);
  });
}

function hasBin(name) {
  const r = spawnSync(process.platform === 'win32' ? 'where' : 'which', [name], { stdio: 'ignore' });
  return r.status === 0;
}

/** Run with the target shell: $SHELL/bash/zsh/sh -c, fish -c, pwsh -NoProfile -Command, cmd /d /s /c. */
export function shellInvocation(command, shell) {
  if (shell === 'powershell') {
    const bin = hasBin('pwsh') ? 'pwsh' : 'powershell';
    return [bin, ['-NoProfile', '-Command', command]];
  }
  // with /s, cmd strips the first and last `"` of everything after /c: wrap the command in one more
  // pair so a command that itself starts/ends with a quote ("C:\Program Files\x.exe" ...) survives
  if (shell === 'cmd') return ['cmd.exe', ['/d', '/s', '/c', `"${command}"`]];
  if (shell === 'fish') return ['fish', ['-c', command]];
  const envShell = process.env.SHELL && normShell(process.env.SHELL) === shell ? process.env.SHELL : null;
  return [envShell || shell || 'bash', ['-c', command]];
}

export function runShell(command, shellName = normShell(process.env.SHELL) || 'bash') {
  const [shell, args] = shellInvocation(command, shellName);
  return new Promise((res) => {
    const child = spawn(shell, args, { stdio: 'inherit', windowsVerbatimArguments: shell === 'cmd.exe' });
    child.on('error', (e) => { console.error(`tellsh: cannot start ${shell}: ${e.message}`); res(127); });
    child.on('exit', (code, sig) => res(code ?? (sig ? 128 + (osConstants.signals[sig] ?? 1) : 1)));
  });
}

const PROMPT = { powershell: 'PS> ', cmd: '> ', fish: '> ' };
function printSuggestion(s, opts) {
  const out = process.stdout;
  out.write(`${C.bold((PROMPT[s.shell] || '$ ') + s.command)}\n`);
  const conf = `${(s.confidence * 100).toFixed(0)}%`;
  const label = s.method === 'composed' ? C.yellow('composed (experimental)') + C.dim(` ${s.composed.tool}${s.composed.sub ? ' ' + s.composed.sub : ''}`) : s.intent;
  out.write(C.dim('  ') + label + C.dim(` · ${s.shell}/${s.os} · risk: `) + riskColor(s.risk)(s.risk) + C.dim(` · confidence: ${conf}`) + '\n');
  if (s.method === 'composed') out.write(C.yellow(`  ~ assembled from a flag vocabulary (${s.reason}); check it carefully`) + '\n');
  if (s.context?.note) out.write(C.cyan(`  ↺ from history: ${s.context.note}`) + '\n');
  for (const w of s.warnings) out.write(riskColor(s.risk)(`  ! ${w}`) + '\n');
  if (s.missing.length) out.write(C.yellow(`  ? missing: ${s.missing.join(', ')} — edit the command (e) before running`) + '\n');
  if (s.hint) out.write(C.dim(`  hint: ${s.hint}`) + '\n');
  if (s.notes) out.write(C.dim(`  note: ${s.notes}`) + '\n');
  if (opts.explain) {
    if (s.description) out.write(C.dim(`  ${s.description}`) + '\n');
    if (s.variant) out.write(C.dim(`  rendering: ${s.variant}`) + '\n');
    if (s.catalogCommand) out.write(C.dim(`  catalog command was: ${s.catalogCommand}`) + '\n');
    out.write(C.dim(`  slots: ${JSON.stringify(s.slots)}${s.slotSources ? ' via ' + JSON.stringify(s.slotSources) : ''}`) + '\n');
    out.write(C.dim('  tools: ' + s.tools.map((t) => `${t.tool} ${(t.p * 100).toFixed(1)}%`).join(', ')) + '\n');
    out.write(C.dim('  candidates: ' + s.candidates.map((c) => `${c.intent} ${(c.p * 100).toFixed(1)}%`).join(', ')) + '\n');
  }
}

export async function main(argv = process.argv.slice(2)) {
  const opts = parseArgs(argv);
  if (opts.version) { console.log(pkg.version); return 0; }
  if (opts.help || !opts.words.length) { console.log(HELP); return opts.help ? 0 : 2; }
  if (opts.badThreshold != null) { console.error(`tellsh: --threshold needs a number between 0 and 1 (got "${opts.badThreshold}")`); return 2; }
  // the shell removed the quotes: a word with spaces is quoted again so "/tmp/a b" stays one path ("delete folder" as
  // the first of several arguments is request text; a quoted argument that is neither is unclear: see joinArgs)
  const joined = joinArgs(opts.words);
  const query = joined?.text;
  if (joined == null) { console.error('tellsh: an argument contains spaces and both kinds of quotes; it cannot be read as one value'); return 2; }
  if (opts.shell && !normShell(opts.shell)) { console.error(`tellsh: unknown shell "${opts.shell}" (bash|zsh|sh|powershell|fish|cmd)`); return 2; }
  if (opts.os && !normOs(opts.os)) { console.error(`tellsh: unknown OS "${opts.os}" (linux|darwin|win32)`); return 2; }
  let s;
  try {
    getModel();
    const env = detectEnv({ shell: opts.shell, os: opts.os });
    // history is read only when asked for, kept in memory for this call, never printed or stored. Only the previous
    // command is a reference target; the line before it is read too because some shells (zsh, fish, PSReadLine)
    // write this `tellsh …` call to the file before it runs, and buildContext drops it.
    const history = opts.history ? loadHistory({ shell: env.shell, file: opts.historyFile, n: 2 }) : undefined;
    const so = { top: opts.top, threshold: opts.threshold, env, history, cwd: process.cwd(), compose: opts.compose, unclearArgs: joined.unclear };
    s = opts.hybrid ? await suggestLazy(query, { ...so, system: process.env.TELLSH_HYBRID === 'safe' ? 'A+B-safe' : 'A+B' }) : pipelineSuggest(query, so);
  } catch (e) {
    console.error(`tellsh: ${e.message}`);
    return 1;
  }

  if (opts.json) {
    console.log(JSON.stringify(s, null, 2));
    return s.understood ? 0 : 3;
  }
  if (!s.understood && s.context?.rule === 'refused') {
    // a history reference that cannot be resolved safely: nothing to suggest
    console.log(`Cannot resolve "${query}" from history: ${s.hint || s.context.note || 'not guessing'}.`);
    console.log(C.dim('Name the target explicitly.'));
    return 3;
  }
  if (!s.understood) {
    console.log(`I don't understand "${query}" (confidence ${(s.confidence * 100).toFixed(0)}% < ${(s.threshold * 100).toFixed(0)}%).`);
    console.log('Did you mean:');
    for (const c of s.candidates) console.log(`  - ${c.intent}: ${c.description} ${C.dim(`(${(c.p * 100).toFixed(1)}%)`)}`);
    if (s.hint) console.log(C.dim(`hint: ${s.hint}`));
    console.log(C.dim('Try rephrasing, or use --threshold to lower the bar.'));
    return 3;
  }
  if (s.gap) {
    console.log(`No ${s.shell} rendering for "${s.intent}" on ${s.os}: ${s.gap}.`);
    console.log(C.dim(`Try --shell bash (or another shell) to see the command.`));
    return 5;
  }

  printSuggestion(s, opts);
  if (opts.dryRun) return 0;

  const interactive = process.stdin.isTTY && process.stdout.isTTY;
  const shellName = s.shell;
  if (opts.yes) {
    const fromHistory = Object.values(s.slotSources || {}).includes('history');
    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog' || fromHistory || s.hybrid?.deferred) {
      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' || fromHistory ? 'resolved from history' : s.missing.length ? 'incomplete' : s.hybrid?.deferred ? 're-ranked by the neural fallback' : s.risk;
      console.log(C.yellow(`  --yes only auto-runs safe catalog commands; this one is ${why}. Not running.`));
      return 4;
    }
    return runShell(s.command, shellName);
  }
  if (!interactive) return 0; // print-only when piped

  let command = s.command;
  let risk = s.risk;
  let critical = s.critical;
  let incomplete = s.missing.length > 0;
  const strict = () => risk === 'high' || s.method === 'composed';
  for (;;) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const prompt = strict()
      ? `${risk === 'high' ? C.red('High risk.') : C.yellow('Experimental.')} Type "yes" to run, e to edit, anything else aborts: `
      : incomplete ? 'e edit · n abort: ' : '[Enter] run · e edit · n abort: ';
    const ans = (await ask(rl, prompt)).trim().toLowerCase();
    rl.close();
    if (ans === 'e' || ans === 'edit') {
      command = (await editLine(command)).trim();
      if (!command) return 130;
      const d = checkDanger(command, s.baseRisk);
      risk = maxRisk(s.baseRisk, d.risk);
      critical = d.critical;
      incomplete = /<[A-Z_]+>/.test(command);
      process.stdout.write(C.dim('  risk: ') + riskColor(risk)(risk) + '\n');
      for (const w of d.warnings) process.stdout.write(riskColor(risk)(`  ! ${w}`) + '\n');
      continue;
    }
    if (incomplete) { if (ans === '' ) continue; return 130; }
    const go = strict() ? ans === 'yes' || ans === 'tak' : ans === '' || ans === 'y' || ans === 'yes' || ans === 't' || ans === 'tak';
    if (!go) { console.log('aborted'); return 130; }
    if (critical) {
      const rl2 = createInterface({ input: process.stdin, output: process.stdout });
      const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
      rl2.close();
      if (a2 !== command) { console.log('aborted'); return 130; }
    }
    return runShell(command, shellName);
  }
}
