// Help-verifier (0.3.7): check the flags of a rendered command against the documentation of the tool actually
// installed (GNU vs BSD, old vs new versions). Deterministic, local, no LLM.
//
// Safety: the probed tool is NEVER executed. Only its man page is read, by `man` from a fixed list of absolute paths
// (not PATH), argv `-P cat <page>`, no shell, stdin closed, a minimal environment (no inherited variables), a timeout
// and an output cap. The tool itself is only located (absolute PATH entries, realpath) to tell whether it is installed
// and to key the cache. `git <sub>` reads the page `git-<sub>`. Windows / PowerShell / cmd / fish: never checked.
//
// The check is conservative: an option whose argument count is unknown swallows the next word and ends a combined
// cluster, so a missed warning is preferred to a false one. Commands nested in `find -exec … ;` or run by `xargs` are
// NOT checked (their words are skipped).
//
// Parsed option tables (and failures, for a day) are cached per binary identity (realpath + size + mtime) in
// $XDG_CACHE_HOME/tellsh/help or ~/.cache/tellsh/help. One CLI call spends at most BUDGET_MS on man probes in total.
// TELLSH_HELPCHECK=0 turns it all off.
import { spawnSync } from 'node:child_process';
import { statSync, existsSync, accessSync, realpathSync, readFileSync, writeFileSync, mkdirSync, constants as fsConstants } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join, dirname, delimiter, isAbsolute } from 'node:path';
import { createHash } from 'node:crypto';
import { splitCommand, isAmbiguous } from './shellwords.js';

export const TIMEOUT_MS = 250;
export const BUDGET_MS = 270; // > TIMEOUT_MS: the first probe of a call gets a full timeout (a real one is remembered)
export const MAX_OUTPUT = 256 * 1024;
export const FAIL_TTL_MS = 24 * 3600 * 1000;
export const MAN_PATHS = ['/usr/bin/man', '/bin/man'];
const CACHE_VERSION = 2;
const MAN_ENV_PATH = '/usr/bin:/bin:/usr/sbin:/sbin';

// tools whose man page is read (the tool is never run)
const TOOLS = ['ls', 'grep', 'egrep', 'fgrep', 'find', 'du', 'df', 'sort', 'tar', 'sed', 'head', 'tail', 'wc', 'cut', 'uniq',
  'cat', 'ln', 'cp', 'mv', 'rm', 'mkdir', 'chmod', 'touch', 'uname', 'shasum', 'stat', 'date', 'xargs', 'ps', 'tr', 'diff', 'zip',
  'unzip', 'base64', 'file', 'free', 'uptime', 'lsof',
  'gls', 'ggrep', 'gfind', 'gdu', 'gdf', 'gsort', 'gtar', 'gsed', 'ghead', 'gtail', 'gwc', 'gcut', 'gstat', 'gdate', 'gxargs'];
export const ALLOWLIST = new Set([...TOOLS, 'git']);
const WHOLE_WORD = new Set(['find', 'gfind']); // `-xtype` is one primary, never `-x -t -y …`
const SYSTEM_DIRS = /^\/(?:usr\/)?s?bin\//;

export const helpcheckEnabled = (env = process.env) => !['0', 'off', 'false', 'no'].includes(String(env.TELLSH_HELPCHECK ?? '').toLowerCase());

export function cacheDir(env = process.env) {
  return join(env.XDG_CACHE_HOME || join(homedir(), '.cache'), 'tellsh', 'help');
}

/** First executable `name` in an ABSOLUTE PATH entry -> path, or null (relative entries like `.` or `bin` are ignored). */
export function which(name, env = process.env) {
  if (name.includes('/')) return null;
  for (const dir of (env.PATH || '').split(delimiter)) {
    if (!dir || !isAbsolute(dir)) continue;
    const p = join(dir, name);
    try { if (statSync(p).isFile()) { accessSync(p, fsConstants.X_OK); return p; } } catch { /* next */ }
  }
  return null;
}

export const findMan = (paths = MAN_PATHS) => paths.find((p) => isAbsolute(p) && existsSync(p)) || null;

const strip = (s) => String(s).replace(/[^\n]\x08/g, '').replace(/\r/g, '');

// an option's argument as written in a definition (`char`, `<msg>`, `NUM`, `field1[,field2]`)
const ARG_WORD = /^(?:<[^>]+>|[A-Za-z][\w.-]*(?:\[[^\]]*\])?|\[[^\]]+\]|#)$/;
function noteArity(map, name, arity) {
  if (!(name in map)) map[name] = arity;
  else if (map[name] !== arity) map[name] = null; // contradicting definitions: unknown
}

/**
 * Man / help text -> { options: { '-a': 'none', '-t': 'req', '--color': 'opt', '-x': null, ... } }.
 * null = the option is mentioned but its argument count is not known.
 */
export function parseOptions(text) {
  const t = strip(text);
  const map = {};
  const defs = {};
  // 1) definition lines: an option list at the start of a line (`-a, --all   …`, `-t char, --field-separator=char`,
  //    `-m <msg>, --message=<msg>`, `--color[=WHEN]`). An argument follows after ONE space or `=`; two or more spaces
  //    start the description. Aliases on one line share the argument (GNU writes it on the long form only).
  for (const line of t.split('\n')) {
    const m = line.match(/^\s{0,12}(-\S.*)$/);
    if (!m) continue;
    const head = m[1].split(/\s{2,}|\t/)[0];
    const group = [];
    let arity = 'none';
    for (let item of head.split(/,\s+/)) {
      if (item.startsWith('--[no-]')) { item = '--' + item.slice(7); (defs['--no-' + item.slice(2).split(/[[=\s]/)[0]] ||= new Set()).add('none'); }
      const im = item.match(/^(--?[A-Za-z0-9@%#?][\w@%#?.+-]*?)(?:(\[=[^\]]*\]|\[[^\]]*\])|=(\S+)|\s(\S+))?(?:\s.*)?$/);
      if (!im) break;
      const [, name, optArg, eqArg, spArg] = im;
      group.push(name);
      if (optArg) arity = arity === 'req' ? 'req' : 'opt';
      else if (eqArg || (spArg && ARG_WORD.test(spArg))) arity = 'req';
    }
    for (const g of group) (defs[g] ||= new Set()).add(arity);
  }
  for (const [k, s] of Object.entries(defs)) map[k] = s.size === 1 ? [...s][0] : null;
  // git `--[no-]name`
  for (const m of t.matchAll(/--\[no-\]([\w-]+)/g)) if (!defs['--' + m[1]]) { noteArity(map, '--' + m[1], 'none'); noteArity(map, '--no-' + m[1], 'none'); }
  // 2) BSD synopsis: `[-ABCabc1%]` clusters take no argument, `[-t char]` takes one
  for (const m of t.matchAll(/\[-([^\s\]-][^\s\]]*)\]/g)) for (const c of m[1]) if (c !== '\\' && c !== '&' && !defs['-' + c]) noteArity(map, '-' + c, 'none');
  for (const m of t.matchAll(/\[(-[A-Za-z0-9])\s+([a-z_<][\w<>-]*)\]?/g)) if (!defs[m[1]]) noteArity(map, m[1], 'req');
  // 3) any other option-looking token (prose): known name, unknown arity
  for (const m of t.matchAll(/(^|[\s[(|,'"`])(--?[A-Za-z0-9@%#?][\w@%#?.+-]*)/gm)) {
    const o = m[2].replace(/[.,;:]+$/, '');
    if (/^--?[A-Za-z0-9@%#?]/.test(o) && !(o in map)) map[o] = null;
  }
  return { options: map };
}

/** Default spawner (only ever called with an absolute `man`): no shell, stdin ignored, timeout, output cap. */
export function defaultSpawn(file, args, { env, cwd, timeout = TIMEOUT_MS } = {}) {
  const r = spawnSync(file, args, { stdio: ['ignore', 'pipe', 'ignore'], env, cwd, timeout, maxBuffer: MAX_OUTPUT,
    encoding: 'utf8', killSignal: 'SIGKILL' });
  if (r.error) return { error: r.error.code === 'ETIMEDOUT' ? 'timeout' : r.error.code === 'ENOBUFS' ? 'output too large' : r.error.message };
  return { stdout: r.stdout || '' };
}

/**
 * Option table of an installed tool (git: `{ sub }`), from the cache or one man probe.
 * -> { ok: true, options, cached } | { ok: false, reason }
 */
export function toolOptions(tool, { sub, env = process.env, spawn = defaultSpawn, dir = cacheDir(env), man = findMan(), deadline = Infinity, now = Date.now, maxTimeout = TIMEOUT_MS } = {}) {
  if (!ALLOWLIST.has(tool)) return { ok: false, reason: 'tool not checked' };
  if (tool === 'git' && !/^[a-z][a-z-]*$/.test(sub || '')) return { ok: false, reason: 'subcommand not checked' };
  const path = which(tool, env);
  if (!path) return { ok: false, reason: 'not installed' };
  let real;
  let st;
  try { real = realpathSync(path); st = statSync(real); } catch { return { ok: false, reason: 'not installed' }; }
  if (!man || !isAbsolute(man)) return { ok: false, reason: 'no man' };
  const page = tool === 'git' ? `git-${sub}` : tool;
  const key = `${CACHE_VERSION}\0${real}\0${st.size}\0${st.mtimeMs}\0${man}\0${page}`;
  const cfile = join(dir, `${page.replace(/[^\w.-]/g, '_')}-${createHash('sha1').update(key).digest('hex').slice(0, 16)}.json`);
  try {
    const c = JSON.parse(readFileSync(cfile, 'utf8'));
    if (c && c.key === key && typeof c.fail === 'string' && now() - c.at < FAIL_TTL_MS) return { ok: false, reason: c.fail, cached: true };
    if (c && c.key === key && c.options && typeof c.options === 'object' && !Array.isArray(c.options)) return { ok: true, options: c.options, cached: true };
  } catch { /* missing or corrupt: probe again */ }
  const left = deadline - now();
  if (left <= 0) return { ok: false, reason: 'budget' };
  const timeout = Math.min(maxTimeout, left);
  const menv = { PATH: MAN_ENV_PATH, MANPAGER: 'cat', PAGER: 'cat', LC_ALL: 'C', TERM: 'dumb', MANWIDTH: '200' };
  // a tool outside the system dirs (Homebrew, /opt) is documented next to its bin/: that man dir is searched first
  if (!SYSTEM_DIRS.test(real)) menv.MANPATH = `${join(dirname(dirname(real)), 'share', 'man')}:`;
  const r = spawn(man, ['-P', 'cat', page], { env: menv, cwd: tmpdir(), timeout });
  const save = (data) => { try { mkdirSync(dir, { recursive: true }); writeFileSync(cfile, JSON.stringify({ key, page, ...data })); } catch { /* read-only cache: fine */ } };
  if (!r || r.error) {
    const reason = r?.error || 'probe failed';
    // a timeout cut short by this call's budget says nothing about the page: not remembered
    if (reason !== 'timeout' || timeout >= maxTimeout) save({ fail: reason, at: now() });
    return { ok: false, reason };
  }
  const { options } = parseOptions(r.stdout);
  if (Object.keys(options).length < 2) { save({ fail: 'no man page', at: now() }); return { ok: false, reason: 'no man page' }; }
  save({ options });
  return { ok: true, options, cached: false };
}

/**
 * Words of each allowlisted simple command of `command` (POSIX shells): [{ tool, sub?, words }]. A word with an
 * expansion or glob is null (an operand, never flagged).
 */
export function extractFlags(command) {
  const r = splitCommand(command, 'posix');
  if (!r.ok) return [];
  const out = [];
  for (const seg of r.segments) {
    const w = seg.words;
    if (!w.length || isAmbiguous(w[0]) || !ALLOWLIST.has(w[0])) continue;
    let i = 1;
    let sub;
    if (w[0] === 'git') {
      while (i < w.length && typeof w[i] === 'string' && w[i].startsWith('-')) i += w[i] === '-C' || w[i] === '-c' ? 2 : 1;
      sub = w[i++];
      if (!sub || isAmbiguous(sub)) continue;
    }
    const words = w.slice(i).map((a) => (isAmbiguous(a) ? null : a));
    out.push(sub ? { tool: w[0], sub, words } : { tool: w[0], words });
  }
  return out;
}

// a long option: exact name or a UNIQUE prefix (getopt_long); ambiguous or unknown -> null
function resolveLong(name, options) {
  if (name in options) return name;
  const hits = Object.keys(options).filter((o) => o.startsWith('--') && o.startsWith(name));
  return hits.length === 1 ? hits[0] : null;
}

/** Unknown flags among `words` (one simple command's arguments), given its option table. */
export function unknownFlags(words, options, { tool } = {}) {
  const bad = [];
  const whole = WHOLE_WORD.has(tool);
  for (let i = 0; i < words.length; i++) {
    const a = words[i];
    if (a == null) continue;
    if (a === '--') break;
    if (a.length < 2 || a[0] !== '-') {
      if (tool === 'xargs' || tool === 'gxargs') break; // the command xargs runs is not checked
      continue;
    }
    // the command run by find -exec / -ok is not checked: skip to its `;` / `+`
    if (whole && /^-(?:exec|execdir|ok|okdir)$/.test(a)) { while (i + 1 < words.length && words[i + 1] !== ';' && words[i + 1] !== '+') i++; i++; continue; }
    if (a.startsWith('--')) {
      const name = a.split('=')[0];
      const r = resolveLong(name, options);
      if (!r) { bad.push(name); continue; }
      if (!a.includes('=') && (options[r] === 'req' || options[r] == null)) i++; // its operand (or possibly one: arity unknown)
      continue;
    }
    if (a in options) { if (options[a] === 'req' || options[a] == null) i++; continue; }
    if (/^-\d/.test(a)) continue; // a negative number / relative value (`-n -5`, `-mtime -7`)
    if (whole) { bad.push(a); continue; }
    const cs = a.slice(1);
    for (let j = 0; j < cs.length; j++) {
      const o = '-' + cs[j];
      if (!(o in options)) {
        if (j === 0 || /[A-Za-z]/.test(cs[j])) bad.push(o);
        break; // what follows an unknown option cannot be read
      }
      const ar = options[o];
      if (ar === 'none') continue;
      // takes a value (the attached remainder, or the next word), or its arity is unknown: the cluster ends here
      if (j === cs.length - 1 && ar !== 'opt') i++;
      break;
    }
  }
  return [...new Set(bad)];
}

/**
 * Check a final suggestion against the installed tools' man pages. POSIX shells on the OS tellsh runs on only.
 * -> { checked: true, tool, unknown: [{ tool, flag, source }], notInstalled? } | { checked: false, reason, tool?, notInstalled? }
 */
export function checkCommand(command, { shell, os, env = process.env, platform = process.platform, spawn = defaultSpawn, dir, man = findMan(), budget = BUDGET_MS, now = Date.now } = {}) {
  if (!helpcheckEnabled(env)) return { checked: false, reason: 'disabled' };
  if (platform === 'win32' || !['bash', 'zsh', 'sh'].includes(shell)) return { checked: false, reason: 'shell not checked' };
  const realOs = platform === 'darwin' ? 'darwin' : 'linux';
  if (os && os !== realOs) return { checked: false, reason: 'rendered for another OS' };
  const deadline = now() + budget;
  let first = null;
  const unknown = [];
  const tools = [];
  const notInstalled = [];
  for (const p of extractFlags(command)) {
    const label = p.sub ? `git ${p.sub}` : p.tool;
    const r = toolOptions(p.tool, { sub: p.sub, env, spawn, dir: dir || cacheDir(env), man, deadline, now });
    if (!r.ok) {
      if (r.reason === 'not installed' && !notInstalled.includes(p.tool)) notInstalled.push(p.tool);
      first ??= { checked: false, reason: r.reason, tool: label };
      continue;
    }
    tools.push(label);
    for (const f of unknownFlags(p.words, r.options, { tool: p.tool })) unknown.push({ tool: label, flag: f, source: 'man page' });
  }
  const extra = notInstalled.length ? { notInstalled } : {};
  if (!tools.length) return { ...(first || { checked: false, reason: 'no checked tool' }), ...extra };
  return { checked: true, tool: tools.join(', '), unknown, ...extra };
}
