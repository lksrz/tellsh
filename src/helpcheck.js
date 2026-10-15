// Help-verifier (0.3.7): check the flags of a rendered command against the help text of the tool actually installed
// (GNU vs BSD, old vs new versions). Deterministic, local, no LLM.
//
// Safety: a tool is only ever executed when it is on ALLOWLIST below, with the fixed help argv listed there (`-h` is
// not help everywhere: `shutdown -h`, `ls -h`, `df -h`). No shell, stdin closed, LC_ALL=C, pagers set to cat, a short
// timeout and an output cap; non-zero exit codes are accepted (BSD tools print usage and exit 1, `git <sub> -h` 129).
// On macOS a tool from the system directories is read through its man page (`man -P cat <tool>`), never run; a tool
// elsewhere on PATH (Homebrew GNU) and every tool on Linux is asked for `--help`. Windows / PowerShell / cmd / fish:
// never checked.
//
// Parsed option sets are cached per binary identity (realpath + size + mtime) in $XDG_CACHE_HOME/tellsh/help or
// ~/.cache/tellsh/help; a later call costs one stat and a small JSON read. TELLSH_HELPCHECK=0 turns it all off.
import { spawnSync } from 'node:child_process';
import { statSync, accessSync, realpathSync, readFileSync, writeFileSync, mkdirSync, constants as fsConstants } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join, delimiter } from 'node:path';
import { createHash } from 'node:crypto';
import { splitCommand, isAmbiguous } from './shellwords.js';

export const TIMEOUT_MS = 300;
export const MAX_OUTPUT = 256 * 1024;
const CACHE_VERSION = 1;

// tools whose help is read. `--help` is used on Linux and for non-system binaries on macOS: every tool here either
// prints help for it (GNU, busybox) or rejects the unknown option before doing anything (BSD getopt). Linux procps
// `ps --help` is only a summary: `--help all` is the full list.
const HELP_TOOLS = ['ls', 'grep', 'egrep', 'fgrep', 'find', 'du', 'df', 'sort', 'tar', 'sed', 'head', 'tail', 'wc', 'cut', 'uniq',
  'cat', 'ln', 'cp', 'mv', 'rm', 'mkdir', 'chmod', 'touch', 'uname', 'shasum', 'stat', 'date', 'xargs', 'ps', 'tr', 'diff', 'zip', 'unzip', 'base64', 'file', 'free', 'uptime', 'lsof',
  'gls', 'ggrep', 'gfind', 'gdu', 'gdf', 'gsort', 'gtar', 'gsed', 'ghead', 'gtail', 'gwc', 'gcut', 'gstat', 'gdate', 'gxargs'];
export const ALLOWLIST = Object.fromEntries(HELP_TOOLS.map((t) => [t, { help: t === 'ps' ? ['--help', 'all'] : ['--help'] }]));
// git: `git <sub> -h` prints the parse-options usage and exits 129 before touching anything (builtins win over
// aliases). Never `git --help` (opens man / a pager). Subcommands whose -h omits the inherited diff/rev-list options
// (log, show, diff: its -h covers only --no-index) would report false positives and are not checked.
export const GIT_SUBS = new Set(['status', 'add', 'commit', 'branch', 'checkout', 'switch', 'restore', 'reset', 'stash',
  'fetch', 'pull', 'push', 'clone', 'remote', 'tag', 'grep', 'ls-files', 'merge', 'rebase', 'rm', 'mv', 'clean', 'blame', 'config',
  'init', 'describe', 'cherry-pick', 'revert']);
const GIT_INCOMPLETE = new Set(['log', 'show', 'diff', 'whatchanged', 'shortlog', 'reflog', 'rev-list']);
const SYSTEM_DIRS = /^\/(?:usr\/)?s?bin\//;

export const helpcheckEnabled = (env = process.env) => !['0', 'off', 'false', 'no'].includes(String(env.TELLSH_HELPCHECK ?? '').toLowerCase());

export function cacheDir(env = process.env) {
  return join(env.XDG_CACHE_HOME || join(homedir(), '.cache'), 'tellsh', 'help');
}

/** First executable `name` on PATH -> absolute path, or null. */
export function which(name, env = process.env) {
  if (name.includes('/')) return null;
  for (const dir of (env.PATH || '').split(delimiter)) {
    if (!dir) continue;
    const p = join(dir, name);
    try { if (statSync(p).isFile()) { accessSync(p, fsConstants.X_OK); return p; } } catch { /* next */ }
  }
  return null;
}

const strip = (s) => String(s).replace(/[^\n]\x08/g, '').replace(/\r/g, '');

/** Help / usage / man text -> sorted list of option strings ('-a', '--all', '-name'). */
export function parseOptions(text) {
  const t = strip(text);
  const opts = new Set();
  const add = (o) => { if (/^--?[A-Za-z0-9@%#?]/.test(o)) opts.add(o); };
  // option-looking tokens anywhere (description text mentions options too: over-collecting only makes the check more
  // lenient). A token starts after whitespace or [ ( | , and ends at = [ < or a closing bracket / punctuation.
  for (const m of t.matchAll(/(^|[\s[(|,'"`])(--?(?:\[no-\])?[A-Za-z0-9@%#?][\w@%#?.+-]*(?:\[[^\]\s]*\])?)/gm)) {
    let tok = m[2];
    const inBracket = m[1] === '[';
    tok = tok.replace(/\[=[^\]]*\]$/, '').replace(/[.,;:]+$/, '');
    if (tok.startsWith('--[no-]')) { const n = tok.slice(7).replace(/\[.*$/, ''); add('--' + n); add('--no-' + n); continue; }
    tok = tok.replace(/\[.*$/, '');
    if (!tok.startsWith('--') && tok.length > 2) {
      // a synopsis cluster `[-ABCabc1%]` lists single-letter options: add each one (the whole word as well)
      if (inBracket) for (const c of tok.slice(1)) add('-' + c);
      add(tok);
    } else add(tok);
  }
  // a BSD synopsis cluster may include characters the token pattern stops at (`[-@ABC...%,]`)
  for (const m of t.matchAll(/\[-([^\s\]-][^\s\]]*)\]/g)) for (const c of m[1]) if (c !== '\\' && c !== '&') opts.add('-' + c);
  return [...opts].sort();
}

/** Default spawner: no shell, stdin ignored, timeout and output cap. -> { stdout, error } */
export function defaultSpawn(file, args, { env, cwd } = {}) {
  const r = spawnSync(file, args, { stdio: ['ignore', 'pipe', 'pipe'], env, cwd, timeout: TIMEOUT_MS, maxBuffer: MAX_OUTPUT,
    encoding: 'utf8', killSignal: 'SIGKILL' });
  if (r.error) return { error: r.error.code === 'ETIMEDOUT' ? 'timeout' : r.error.code === 'ENOBUFS' ? 'output too large' : r.error.message };
  return { stdout: `${r.stdout || ''}\n${r.stderr || ''}` };
}

const probeEnv = (env) => ({ PATH: env.PATH || '', HOME: env.HOME || homedir(), LC_ALL: 'C', LANG: 'C', PAGER: 'cat', MANPAGER: 'cat',
  GIT_PAGER: 'cat', TERM: 'dumb', MANWIDTH: '120', NO_COLOR: '1' });

/**
 * Option set of an installed tool (git: `{ tool: 'git', sub }`), via the cache or one allowlisted probe.
 * -> { ok: true, options, source, path } | { ok: false, reason }
 */
export function toolOptions(tool, { sub, env = process.env, platform = process.platform, spawn = defaultSpawn, dir = cacheDir(env) } = {}) {
  let argv;
  let file;
  let source;
  if (tool === 'git') {
    if (!GIT_SUBS.has(sub)) return { ok: false, reason: GIT_INCOMPLETE.has(sub) ? `git ${sub} -h does not list all its options` : 'subcommand not checked' };
  } else if (!ALLOWLIST[tool]) return { ok: false, reason: 'tool not checked' };
  const path = which(tool, env);
  if (!path) return { ok: false, reason: 'not installed' };
  let real;
  let st;
  try { real = realpathSync(path); st = statSync(real); } catch { return { ok: false, reason: 'not installed' }; }
  if (tool === 'git') { file = path; argv = [sub, '-h']; source = 'help'; }
  else if (platform === 'darwin' && SYSTEM_DIRS.test(real)) {
    const man = which('man', env);
    if (!man) return { ok: false, reason: 'no man' };
    file = man; argv = ['-P', 'cat', tool]; source = 'man page';
  } else { file = path; argv = ALLOWLIST[tool].help; source = 'help'; }
  const label = tool === 'git' ? `git-${sub}` : tool;
  const key = `${CACHE_VERSION}\0${real}\0${st.size}\0${st.mtimeMs}\0${file}\0${argv.join('\0')}`;
  const cfile = join(dir, `${label.replace(/[^\w.-]/g, '_')}-${createHash('sha1').update(key).digest('hex').slice(0, 16)}.json`);
  try {
    const c = JSON.parse(readFileSync(cfile, 'utf8'));
    if (c && c.key === key && typeof c.fail === 'string') return { ok: false, reason: c.fail };
    if (c && c.key === key && Array.isArray(c.options) && c.options.every((o) => typeof o === 'string')) return { ok: true, options: c.options, source: c.source, path, cached: true };
  } catch { /* missing or corrupt: probe again */ }
  const r = spawn(file, argv, { env: probeEnv(env), cwd: tmpdir() });
  const save = (data) => { try { mkdirSync(dir, { recursive: true }); writeFileSync(cfile, JSON.stringify({ key, tool: label, source, ...data })); } catch { /* read-only cache: fine */ } };
  // a timeout may be a cold disk: tried again next time; an oversized or option-less text is remembered for this binary
  if (!r || r.error) { if (r?.error === 'output too large') save({ fail: r.error }); return { ok: false, reason: r?.error || 'probe failed' }; }
  const options = parseOptions(r.stdout);
  if (options.length < 2) { save({ fail: 'no options found in help' }); return { ok: false, reason: 'no options found in help' }; }
  save({ options });
  return { ok: true, options, source, path, cached: false };
}

/**
 * Flags used by each allowlisted simple command of `command` (POSIX shells).
 * -> [{ tool, sub?, flags: [...] }]. Words after `--` and words with expansions/globs are skipped.
 */
export function extractFlags(command) {
  const r = splitCommand(command, 'posix');
  if (!r.ok) return [];
  const out = [];
  for (const seg of r.segments) {
    const w = seg.words;
    if (!w.length || isAmbiguous(w[0])) continue;
    let i = 1;
    let sub;
    const tool = w[0];
    if (tool === 'git') {
      while (i < w.length && typeof w[i] === 'string' && w[i].startsWith('-')) i += w[i] === '-C' || w[i] === '-c' ? 2 : 1;
      sub = w[i++];
      if (!sub || isAmbiguous(sub)) continue;
    } else if (!ALLOWLIST[tool]) continue;
    const flags = [];
    for (; i < w.length; i++) {
      const a = w[i];
      if (isAmbiguous(a)) continue;
      if (a === '--') break;
      // the words of a command run by find -exec / xargs belong to that command
      if (tool === 'find' && /^-(?:exec|execdir|ok|okdir)$/.test(a)) {
        flags.push(a);
        while (i + 1 < w.length && w[i + 1] !== ';' && w[i + 1] !== '+') i++;
        continue;
      }
      if (tool === 'xargs' && a[0] !== '-') break;
      if (a.length < 2 || a[0] !== '-') continue;
      flags.push(a);
    }
    out.push(sub ? { tool, sub, flags } : { tool, flags });
  }
  return out;
}

/** Flags of `flags` the option list does not know (combined shorts `-lah`, attached values `-n10`, `--x=v`). */
export function unknownFlags(flags, options, { whole = false } = {}) {
  const set = new Set(options);
  const longs = options.filter((o) => o.startsWith('--'));
  const bad = [];
  for (const f of flags) {
    const name = f.split('=')[0];
    if (set.has(name)) continue;
    if (/^-\d/.test(f)) continue; // a negative number / relative value (`-n -5`, `-mtime -7`), not a known option
    if (name.startsWith('--')) {
      // getopt_long accepts an unambiguous prefix
      if (name.length > 3 && longs.some((o) => o.startsWith(name))) continue;
      bad.push(name);
      continue;
    }
    if (whole) { bad.push(name); continue; } // find: `-xtype` is one primary, never `-x -t -y ...`
    const cs = f.slice(1);
    if (!set.has('-' + cs[0])) { bad.push(name); continue; } // `-x`, or a find-style `-primary`
    for (let j = 1; j < cs.length; j++) {
      if (set.has('-' + cs[j])) continue;
      if (!/[A-Za-z]/.test(cs[j])) break; // an attached value (`-n10`, `-t,`, `-k2,2`)
      bad.push('-' + cs[j]);
    }
  }
  return [...new Set(bad)];
}

/**
 * Check a final suggestion against the installed tools. Runs only for POSIX shells on the OS tellsh runs on.
 * -> { checked: true, tool, unknown, source, notInstalled? } | { checked: false, reason, tool?, notInstalled? }
 */
export function checkCommand(command, { shell, os, env = process.env, platform = process.platform, spawn = defaultSpawn, dir } = {}) {
  if (!helpcheckEnabled(env)) return { checked: false, reason: 'disabled' };
  if (platform === 'win32' || !['bash', 'zsh', 'sh'].includes(shell)) return { checked: false, reason: 'shell not checked' };
  const realOs = platform === 'darwin' ? 'darwin' : 'linux';
  if (os && os !== realOs) return { checked: false, reason: 'rendered for another OS' };
  const parts = extractFlags(command);
  let first = null;
  const unknown = [];
  const tools = [];
  const notInstalled = [];
  for (const p of parts) {
    const label = p.sub ? `git ${p.sub}` : p.tool;
    const r = toolOptions(p.tool, { sub: p.sub, env, platform, spawn, dir: dir || cacheDir(env) });
    if (!r.ok) {
      if (r.reason === 'not installed' && !notInstalled.includes(p.tool)) notInstalled.push(p.tool);
      first ??= { checked: false, reason: r.reason, tool: label };
      continue;
    }
    tools.push(label);
    for (const f of unknownFlags(p.flags, r.options, { whole: p.tool === 'find' || p.tool === 'gfind' })) unknown.push({ tool: label, flag: f, source: r.source });
  }
  const extra = notInstalled.length ? { notInstalled } : {};
  if (!tools.length) return { ...(first || { checked: false, reason: 'no checked tool' }), ...extra };
  return { checked: true, tool: tools.join(', '), unknown, ...extra };
}
