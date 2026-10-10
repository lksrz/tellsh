// Shell-history context for reference resolution ("delete it", "to samo dla /var", "logs of that container").
// Only the tail of the history file is read, kept in memory for this one request, and never logged
// or written anywhere.
import { openSync, readSync, fstatSync, closeSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { INTENTS, BY_ID } from './catalog.js';
import { FAMILY_OF } from './tools.js';
import { extractSlots, foldKeepLength } from './slots.js';
import { VARIANTS } from './variants.js';
import { splitCommand, wordsOf, decodeWord, AMB, isAmbiguous, isExpansion, isGlob, rawOf } from './shellwords.js';

export { isAmbiguous };

// ---------------------------------------------------------------------------------------------
// reading

export function historyCandidates(shell, env = process.env, os = process.platform) {
  const home = env.HOME || env.USERPROFILE || homedir();
  const ps = os === 'win32'
    ? join(env.APPDATA || join(home, 'AppData', 'Roaming'), 'Microsoft', 'Windows', 'PowerShell', 'PSReadLine', 'ConsoleHost_history.txt')
    : join(env.XDG_DATA_HOME || join(home, '.local', 'share'), 'powershell', 'PSReadLine', 'ConsoleHost_history.txt');
  const fish = join(env.XDG_DATA_HOME || join(home, '.local', 'share'), 'fish', 'fish_history');
  const byShell = {
    zsh: [['zsh', env.HISTFILE], ['zsh', join(home, '.zsh_history')], ['zsh', join(home, '.zhistory')]],
    bash: [['bash', env.HISTFILE], ['bash', join(home, '.bash_history')]],
    sh: [['bash', env.HISTFILE], ['bash', join(home, '.sh_history')], ['bash', join(home, '.ash_history')], ['bash', join(home, '.bash_history')]],
    fish: [['fish', fish]],
    powershell: [['pwsh', ps]],
    cmd: [],
  };
  const order = [...(byShell[shell] || []), ...byShell.bash, ...byShell.zsh];
  const seen = new Set();
  return order.filter(([, p]) => p && !seen.has(p) && seen.add(p));
}

function readTail(path, maxBytes = 32768) {
  const fd = openSync(path, 'r');
  try {
    const size = fstatSync(fd).size;
    const len = Math.min(size, maxBytes);
    const buf = Buffer.alloc(len);
    readSync(fd, buf, 0, len, size - len);
    return { buf, partial: size > len };
  } finally {
    closeSync(fd);
  }
}

// zsh "metafies" bytes >= 0x83: Meta (0x83) followed by byte ^ 0x20
function unmetafy(buf) {
  const out = [];
  for (let i = 0; i < buf.length; i++) {
    if (buf[i] === 0x83 && i + 1 < buf.length) { out.push(buf[++i] ^ 0x20); } else out.push(buf[i]);
  }
  return Buffer.from(out);
}

/** Parse raw history text into commands (oldest first). kind: bash | zsh | fish | pwsh */
export function parseHistory(text, kind = 'bash', { partial = false } = {}) {
  let lines = text.split(/\r?\n/);
  if (partial) lines = lines.slice(1); // first line may be cut in the middle
  const cmds = [];
  if (kind === 'fish') {
    for (const l of lines) {
      const m = l.match(/^- cmd: (.*)$/);
      if (m) cmds.push(m[1].replace(/\\n/g, '\n').replace(/\\\\/g, '\\'));
    }
    return cmds;
  }
  let cur = null;
  for (let l of lines) {
    if (kind === 'bash' && /^#\d{9,}$/.test(l)) continue; // HISTTIMEFORMAT timestamps
    if (kind === 'zsh' && cur === null) l = l.replace(/^: \d+:\d+;/, ''); // extended history
    const cont = kind === 'pwsh' ? /`$/.test(l) : /\\$/.test(l);
    const body = cont ? l.slice(0, -1) : l;
    cur = cur === null ? body : cur + '\n' + body;
    if (!cont) {
      if (cur.trim()) cmds.push(cur.trim());
      cur = null;
    }
  }
  return cmds;
}

/** Last `n` commands from the user's history file (or from `file`). Returns [] when unavailable. */
export function loadHistory({ shell = 'bash', file, n = 10, env = process.env, os = process.platform } = {}) {
  const cands = file ? [[/zsh/.test(file) ? 'zsh' : /fish/.test(file) ? 'fish' : /PSReadLine/i.test(file) ? 'pwsh' : 'bash', file]]
    : historyCandidates(shell, env, os);
  for (const [kind, path] of cands) {
    try {
      if (!existsSync(path)) continue;
      const { buf, partial } = readTail(path);
      const text = (kind === 'zsh' ? unmetafy(buf) : buf).toString('utf8');
      const cmds = parseHistory(text, kind, { partial });
      if (cmds.length) return Object.assign(cmds.slice(-n), { kind: kind === 'pwsh' ? 'pwsh' : 'posix' });
    } catch { /* unreadable: no context */ }
  }
  return [];
}

// ---------------------------------------------------------------------------------------------
// entities from commands
//
// Values are decoded with a shell-aware tokenizer (src/shellwords.js): quotes, escapes (a\ b.txt),
// separators inside quotes, PowerShell '' / ` escapes. A value that depends on shell state ($VAR,
// $(..), unquoted globs) or a line that cannot be interpreted becomes an *ambiguous* entity: it
// still shadows older values of the same type, and a reference to it is refused instead of being
// resolved to a stale or guessed target.

const PS_CMDLET = /^[A-Za-z]+-[A-Za-z]+$/;
const lineKind = (line, kind) => (kind === 'pwsh' || PS_CMDLET.test(String(line).trim().split(/\s/)[0]) ? 'pwsh' : 'posix');
const PATHLIKE = /(?:^|\s)['"]?[~.\w-]*[\\/][\w.-]|\.\w{1,5}(?:['"]?\s|['"]?$)/;
const GLOB_SLOTS = new Set(['namepat', 'glob', 'pattern', 'sedexpr', 'old', 'new', 'text', 'message']);

// template inversion: catalog/variant template -> regex that recovers intent + slot values from a command
const BT = '`';
const WORD_RE = {
  posix: String.raw`((?:'[^']*'|"(?:\\.|[^"\\])*"|\\.|[^\s'"\;&|<>()])+)`,
  pwsh: `((?:['‘-‛](?:[^'‘-‛]|['‘-‛]{2})*['‘-‛]|["“-„](?:${BT}.|["“-„]{2}|[^"“-„${BT}])*["“-„]|${BT}.|[^\\s'"‘-„${BT};|(){}<>])+)`,
};
let INV = null;
function inverters() {
  if (INV) return INV;
  INV = [];
  const add = (id, tpl) => {
    if (typeof tpl !== 'string') return;
    const names = [];
    const raws = [];
    const src = { posix: '', pwsh: '' };
    for (const part of tpl.split(/(«[^»]*»)/)) {
      const opt = part.startsWith('«');
      const body = opt ? part.slice(1, -1) : part;
      const rx = { posix: '', pwsh: '' };
      for (const piece of body.split(/(\{\w+(?:!raw)?\})/)) {
        const m = piece.match(/^\{(\w+)(!raw)?\}$/);
        for (const k of ['posix', 'pwsh']) {
          if (m) rx[k] += !m[2] ? WORD_RE[k] : m[1] === 'age' ? '(-m(?:min|time) -\\d+)' : '([\\w.+=-]+)';
          else rx[k] += piece.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        if (m) { names.push(m[1]); raws.push(!!m[2]); }
      }
      for (const k of ['posix', 'pwsh']) src[k] += opt ? `(?: ${rx[k]})?` : rx[k];
    }
    try { INV.push({ id, re: { posix: new RegExp(`^${src.posix}$`), pwsh: new RegExp(`^${src.pwsh}$`) }, names, raws }); } catch { /* skip */ }
  };
  for (const it of INTENTS) {
    add(it.id, it.template);
    add(it.id, it.darwin);
    const v = VARIANTS[it.id] || {};
    for (const k of ['bsd', 'gnuMac', 'busybox', 'zsh', 'fish']) add(it.id, v[k]);
    if (v.pwsh) for (const t of typeof v.pwsh === 'object' ? [v.pwsh.win, v.pwsh.unix] : [v.pwsh]) add(it.id, t);
  }
  return INV;
}

function invert(cmd, kind = 'posix') {
  for (const { id, re, names, raws } of inverters()) {
    const m = cmd.match(re[kind]);
    if (!m) continue;
    const slots = {};
    let ambiguous = false;
    names.forEach((n, i) => {
      const rv = m[i + 1];
      if (rv == null) return;
      if (raws[i]) { slots[n] = rv; return; }
      const v = decodeWord(rv, kind);
      if (v == null || isExpansion(v) || (isGlob(v) && !GLOB_SLOTS.has(n))) { ambiguous = true; slots[n] = AMB + rv; return; }
      slots[n] = rawOf(v);
    });
    if (slots.namepat && !slots.name && !isAmbiguous(slots.namepat)) slots.name = slots.namepat.replace(/^\*|\*$/g, '');
    return { intent: id, slots, ambiguous };
  }
  return null;
}

const FILE_HEADS = new Set(['cat', 'less', 'more', 'head', 'tail', 'vim', 'vi', 'nvim', 'nano', 'code', 'stat', 'file', 'wc',
  'sha256sum', 'md5sum', 'shasum', 'md5', 'touch', 'open', 'bat', 'chmod', 'chown', 'source', 'python', 'python3', 'node', 'bash', 'sh', 'unzip', 'gzip', 'gunzip', 'xdg-open']);
const DIR_HEADS = new Set(['cd', 'ls', 'du', 'find', 'tree', 'mkdir', 'rmdir', 'pushd', 'ncdu']);
// heads whose arguments are never file references (no stale-reference invalidation for them)
const INERT_HEADS = new Set(['echo', 'printf', 'man', 'which', 'whereis', 'type', 'history', 'clear', 'exit', 'export', 'alias', 'unalias',
  'npm', 'npx', 'yarn', 'pnpm', 'make', 'cargo', 'go', 'pip', 'pip3', 'apt', 'apt-get', 'brew', 'tellsh', 'true', 'false', 'date', 'sleep',
  'write-host', 'write-output', 'get-help', 'get-command', 'set-psreadlineoption', 'clear-host', 'cls']);
const DOCKER_CT = new Set(['logs', 'exec', 'stop', 'start', 'restart', 'rm', 'inspect', 'attach', 'kill', 'top', 'port', 'pause', 'unpause']);
const DOCKER_VAL_FLAGS = new Set(['--tail', '-n', '--since', '--until', '-e', '--env', '-u', '--user', '-w', '--workdir', '-t', '--time', '-s', '--signal']);
const DOCKER_INTENT = { logs: 'docker_logs', stop: 'docker_stop', exec: 'docker_exec' };
const SYSTEMCTL_INTENT = { status: 'service_status', restart: 'service_restart', stop: 'service_stop', start: 'service_start', enable: 'service_enable' };

// PowerShell cmdlets and their aliases -> what their target argument is
const PS_NATIVE = {
  'get-content': 'file', gc: 'file', type: 'file', 'get-filehash': 'file', 'select-string': 'file', 'expand-archive': 'file', 'set-content': 'file', 'add-content': 'file', 'out-file': 'file',
  'get-item': 'path', gi: 'path', 'get-itemproperty': 'path', 'invoke-item': 'path', ii: 'path', 'rename-item': 'path', rni: 'path', 'test-path': 'path',
  'remove-item': 'remove', ri: 'remove', del: 'remove', erase: 'remove', rd: 'remove',
  'set-location': 'dir', sl: 'dir', chdir: 'dir', 'push-location': 'dir', 'get-childitem': 'dir', gci: 'dir', dir: 'dir',
  'copy-item': 'copy', cpi: 'copy', copy: 'copy', 'move-item': 'copy', mi: 'copy', move: 'copy', 'new-item': 'new', ni: 'new',
  'stop-process': 'proc', spps: 'proc', 'get-process': 'proc', gps: 'proc',
  'stop-service': 'service', 'start-service': 'service', 'restart-service': 'service', 'get-service': 'service', gsv: 'service', 'set-service': 'service',
  'test-connection': 'host', 'test-netconnection': 'host', 'resolve-dnsname': 'host',
  'invoke-webrequest': 'url', iwr: 'url', 'invoke-restmethod': 'url', irm: 'url',
};
const PS_SERVICE_INTENT = { 'stop-service': 'service_stop', 'start-service': 'service_start', 'restart-service': 'service_restart', 'get-service': 'service_status' };
const PS_VALUE_PARAMS = new Set(['path', 'literalpath', 'lp', 'pspath', 'name', 'id', 'processname', 'computername', 'targetname', 'uri', 'destination',
  'destinationpath', 'totalcount', 'tail', 'head', 'first', 'last', 'encoding', 'filter', 'include', 'exclude', 'itemtype', 'type', 'algorithm', 'value',
  'newname', 'pattern', 'count', 'depth', 'outfile', 'method', 'erroraction', 'ea', 'port', 'delimiter', 'readcount', 'stream', 'credential', 'displayname']);

function psArgs(args) {
  const named = {};
  const pos = [];
  const sw = new Set();
  for (let i = 0; i < args.length; i++) {
    const m = String(args[i]).match(/^-([A-Za-z]\w*)(?::(.+))?$/);
    if (!m) { pos.push(args[i]); continue; }
    const p = m[1].toLowerCase();
    if (m[2] != null) named[p] = m[2];
    else if (PS_VALUE_PARAMS.has(p) && args[i + 1] != null) named[p] = args[++i];
    else sw.add(p);
  }
  return { named, pos, sw };
}

const typeByExt = (p) => (/\.\w{1,5}$/.test(rawOf(p)) ? 'file' : 'dir');

/** PowerShell native commands. Returns true when the head was recognised. */
function psNative(head, args, ents, setIntent) {
  const kind = PS_NATIVE[head];
  if (!kind) return false;
  const { named, pos, sw } = psArgs(args);
  const path = named.literalpath ?? named.lp ?? named.path ?? named.pspath ?? pos[0];
  if (kind === 'file' && path != null) ents.file ??= path;
  else if (kind === 'path' && path != null) ents[typeByExt(path)] ??= path;
  else if (kind === 'dir' && path != null) ents.dir ??= path;
  else if (kind === 'remove' && path != null) ents[[...sw].some((s) => 'recurse'.startsWith(s)) ? 'dir' : typeByExt(path)] ??= path;
  else if (kind === 'copy') { const d = named.destination ?? pos[1]; if (d != null) ents[typeByExt(d)] ??= d; }
  else if (kind === 'new' && path != null) ents[/^dir/i.test(named.itemtype ?? named.type ?? '') ? 'dir' : 'file'] ??= path;
  else if (kind === 'proc') {
    const id = named.id ?? (pos[0] != null && /^\d+$/.test(pos[0]) ? pos[0] : null);
    const nm = named.name ?? named.processname ?? (id == null ? pos[0] : null);
    if (id != null) ents.pid ??= String(id).split(',')[0];
    if (nm != null) ents.proc ??= nm;
  } else if (kind === 'service') {
    const s = named.name ?? named.displayname ?? pos[0];
    if (s != null) { ents.service ??= s; if (PS_SERVICE_INTENT[head]) setIntent(PS_SERVICE_INTENT[head], { service: s }); }
  } else if (kind === 'host') { const h = named.computername ?? named.targetname ?? pos[0]; if (h != null) ents.host ??= h; }
  else if (kind === 'url') {
    const u = named.uri ?? pos[0];
    if (u != null) ents.url ??= u;
    if (named.outfile != null) ents.file ??= named.outfile;
  }
  return true;
}

function entsFromSlots(intent, slots, ents) {
  const fam = FAMILY_OF[intent];
  const put = (k, v) => { if (v != null && v !== '' && !/^<\w+>$/.test(String(v))) ents[k] ??= String(v); };
  if (slots.container) put('container', slots.container);
  if (slots.service) put('service', slots.service);
  if (slots.name && fam !== 'find') put('proc', slots.name);
  if (/^\d+$/.test(String(slots.pid ?? ''))) put('pid', slots.pid);
  if (slots.port) put('port', slots.port);
  if (slots.branch) put('branch', slots.branch);
  if (slots.host) put('host', slots.host);
  if (slots.target) put('host', slots.target);
  if (slots.url) put('url', slots.url);
  if (slots.file) put('file', slots.file);
  if (slots.archive) put('file', slots.archive);
  if (slots.dst) put(/\.\w+$/.test(slots.dst) ? 'file' : 'dir', slots.dst);
  if (slots.path && slots.path !== '.') put(['delete_dir', 'mkdir', 'dir_size', 'largest_dirs', 'list_files'].includes(intent) || fam === 'find' ? 'dir' : /\.\w{1,5}$/.test(slots.path) ? 'file' : 'dir', slots.path);
}

/**
 * Analyse one history line. `classify(query)` handles previous `tellsh <query>` lines.
 * kind: 'posix' | 'pwsh' (PowerShell history; Verb-Noun lines are always read as PowerShell).
 */
export function analyzeCommand(line, classify, kind = 'posix') {
  const ents = {};
  let intent = null;
  let slots = {};
  let ambiguous = false;
  const t = line.trim();
  const k = lineKind(t, kind);
  const tm = t.match(/^(?:npx\s+(?:-y\s+)?)?tellsh\s+(.*)$/s);
  if (tm) {
    const w = wordsOf(tm[1], k);
    const q = w ? w.filter((x) => !/^-/.test(x)).map(rawOf).join(' ') : '';
    const r = q && classify ? classify(q) : null;
    if (r?.intent) { intent = r.intent; slots = r.slots || {}; entsFromSlots(intent, slots, ents); }
    return { line: t, intent, slots, ents, fromTellsh: true, ambiguous };
  }
  const split = splitCommand(t, k);
  if (!split.ok) {
    // cannot interpret the line (unterminated quote, heredoc, ...): it may name any file or directory,
    // so older file/dir values must not be picked up by "it"
    ents.file = AMB + t;
    ents.dir = AMB + t;
    return { line: t, intent, slots, ents, opaque: true, ambiguous: true };
  }
  const inv = invert(t, k);
  if (inv) { intent = inv.intent; slots = inv.slots; ambiguous = inv.ambiguous; entsFromSlots(intent, slots, ents); }
  const setIntent = (id, s) => { if (!intent) { intent = id; slots = s; } };
  for (const { words } of split.segments) {
    let w = words;
    while (w.length && (w[0] === 'sudo' || /^\w+=/.test(w[0]))) w = w.slice(1);
    if (!w.length) continue;
    if (isAmbiguous(w[0])) {
      if (w.slice(1).some((a) => PATHLIKE.test(rawOf(a)))) { ents.file ??= AMB + t; ents.dir ??= AMB + t; }
      continue;
    }
    const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '');
    const args = w.slice(1);
    const nonFlags = args.filter((a) => !/^-/.test(a));
    if ((k === 'pwsh' || PS_CMDLET.test(head)) && psNative(head.toLowerCase(), args, ents, setIntent)) continue;
    if (head === 'docker') {
      const sub = nonFlags[0];
      if (sub === 'run') {
        const i = args.indexOf('--name');
        if (i >= 0 && args[i + 1]) ents.container ??= args[i + 1];
        const nm = args.find((a) => a.startsWith('--name='));
        if (nm) ents.container ??= nm.slice(7);
      } else if (DOCKER_CT.has(sub)) {
        const rest = args.slice(args.indexOf(sub) + 1);
        for (let i = 0; i < rest.length; i++) {
          if (DOCKER_VAL_FLAGS.has(rest[i])) { i++; continue; }
          if (/^-/.test(rest[i])) continue;
          ents.container ??= rest[i];
          break;
        }
        intent ??= DOCKER_INTENT[sub] || null;
        if (intent) slots = { container: ents.container, ...slots };
      }
    } else if (head === 'systemctl' || head === 'service') {
      const svc = head === 'systemctl' ? nonFlags[1] : nonFlags[0];
      const verb = head === 'systemctl' ? nonFlags[0] : nonFlags[1];
      if (svc) ents.service ??= svc.replace(/\.service$/, '');
      if (!intent && SYSTEMCTL_INTENT[verb] && svc) { intent = SYSTEMCTL_INTENT[verb]; slots = { service: ents.service }; }
    } else if (head === 'journalctl') {
      const i = args.findIndex((a) => a === '-u' || a === '--unit');
      if (i >= 0 && args[i + 1]) { ents.service ??= args[i + 1].replace(/\.service$/, ''); intent ??= 'journal_service'; }
    } else if (head === 'kill') {
      const pid = nonFlags.find((a) => /^\d+$/.test(a));
      if (pid) { ents.pid ??= pid; if (!intent) { intent = 'kill_by_pid'; slots = { pid }; } }
    } else if (['pkill', 'killall', 'pgrep', 'pidof'].includes(head)) {
      if (nonFlags[0]) ents.proc ??= nonFlags[nonFlags.length - 1];
      if (!intent && head === 'pgrep') { intent = 'find_process'; slots = { name: ents.proc }; }
    } else if ((head === 'ps' || head === 'top' || head === 'htop') && args.some((a) => /^-\w*p$/.test(a))) {
      const i = args.findIndex((a) => /^-\w*p$/.test(a));
      const pid = (args[i + 1] || '').split(',')[0];
      if (/^\d+$/.test(pid)) ents.pid ??= pid;
    } else if (head === 'grep' && split.segments.some((s) => s.words[0] === 'ps')) {
      if (nonFlags[0]) ents.proc ??= nonFlags[0];
    } else if ((head === 'grep' || head === 'rg') && nonFlags[0]) {
      const path = nonFlags[1];
      if (!intent) {
        intent = args.some((a) => /^-\w*l/.test(a)) ? 'grep_files_containing' : 'grep_text';
        slots = { pattern: rawOf(nonFlags[0]), ...(path ? { path } : {}) };
      }
      if (path) ents[typeByExt(path)] ??= path;
    } else if (head === 'lsof' || head === 'ss' || head === 'netstat' || head === 'fuser') {
      const pm = args.map(rawOf).join(' ').match(/(?::|tcp:|udp:|sport = :)(\d{2,5})\b/);
      if (pm) { ents.port ??= pm[1]; if (!intent) { intent = 'process_on_port'; slots = { port: pm[1] }; } }
    } else if (head === 'git') {
      const sub = nonFlags[0];
      if (['checkout', 'switch', 'merge', 'rebase'].includes(sub) || (sub === 'branch' && nonFlags[1])) {
        const b = nonFlags[nonFlags.length - 1];
        const creates = args.some((a) => ['-b', '-B', '-c', '-C'].includes(a));
        if (b && b !== sub && b !== '.' && !isGlob(b) && !b.startsWith('-')) {
          ents.branch ??= b;
          if ((sub === 'checkout' || sub === 'switch')) ents.current ??= b;
          if (creates) ents.created ??= b;
        }
      } else if (sub === 'push' && nonFlags.length >= 2) ents.branch ??= nonFlags[nonFlags.length - 1];
      else if (sub === 'clone' && nonFlags[1]) ents.url ??= nonFlags[1];
      else if (['add', 'diff', 'blame', 'restore', 'rm', 'log'].includes(sub) && nonFlags[1] && nonFlags[1] !== '.') ents.file ??= nonFlags[nonFlags.length - 1];
    } else if (['ssh', 'ping', 'dig', 'nslookup', 'traceroute', 'mtr', 'host', 'telnet', 'nc'].includes(head)) {
      const h = nonFlags.find((a) => /[\w-]+\.[\w.-]+|^[\w-]+@/.test(a)) || nonFlags[0];
      if (h) ents.host ??= h;
    } else if (['curl', 'wget', 'http'].includes(head)) {
      const u = args.find((a) => /^https?:\/\//.test(a));
      if (u) {
        ents.url ??= u;
        const base = u.replace(/[?#].*$/, '').split('/').pop();
        const saves = head === 'wget' || args.some((a) => /^-\w*O/.test(a));
        if (saves && /\.\w{1,5}$/.test(base)) ents.file ??= base;
      }
    } else if (head === 'rm' || head === 'trash' || head === 'rmdir') {
      const p = nonFlags[nonFlags.length - 1];
      if (p) ents[args.some((a) => /^-\w*r/i.test(a)) || head === 'rmdir' ? 'dir' : 'file'] ??= p;
    } else if (head === 'cp' || head === 'mv' || head === 'ln') {
      const p = nonFlags[nonFlags.length - 1];
      if (p) ents[typeByExt(p)] ??= p;
    } else if (head === 'tar' || head === 'zip') {
      const a = nonFlags.find((x) => /\.(tar(\.\w+)?|tgz|zip)$/.test(x));
      if (a) ents.file ??= a;
    } else if (FILE_HEADS.has(head)) {
      const p = nonFlags.filter((a) => !/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(a)).pop();
      if (p) ents[/\/$/.test(p) ? 'dir' : 'file'] ??= p;
    } else if (DIR_HEADS.has(head)) {
      const p = head === 'find' ? nonFlags[0] : nonFlags.find((a) => !isGlob(a));
      if (p) ents.dir ??= p;
    } else if (!INERT_HEADS.has(head.toLowerCase())) {
      // unknown command (or unknown cmdlet) naming a path: we cannot tell what it did with it, so an
      // older file/dir must not be picked up by "it"
      const p = nonFlags.find((a) => PATHLIKE.test(rawOf(a)) && !/^\w+:\/\//.test(rawOf(a)));
      if (p) ents[typeByExt(p)] ??= AMB + rawOf(p);
    }
  }
  if (Object.values(slots).some(isAmbiguous)) ambiguous = true;
  return { line: t, intent, slots, ents, ambiguous };
}

const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];

/**
 * Build the context object from history commands (oldest first).
 * kind: 'posix' | 'pwsh' (default: `cmds.kind` as set by loadHistory, else posix)
 * -> { n, ents: {type: value}, entOrder: [types by recency], last: {intent, slots, ambiguous}, features: [...] }
 *    values that could not be read unambiguously are kept as AMB-prefixed strings (see isAmbiguous)
 */
export function buildContext(cmds, { classify, cwd, kind } = {}) {
  const k = kind || cmds.kind || 'posix';
  const ents = {};
  const all = {};
  const recency = {};
  let last = null;
  let current = null;
  const recent = [...cmds].reverse();
  recent.forEach((line, i) => {
    const a = analyzeCommand(line, classify, k);
    if (!last && a.intent) last = { intent: a.intent, slots: a.slots, age: i, ambiguous: !!a.ambiguous };
    if (current == null && a.ents.current && !isAmbiguous(a.ents.current)) current = a.ents.current;
    for (const t of ENT_TYPES) {
      if (a.ents[t] == null) continue;
      if (ents[t] == null) { ents[t] = a.ents[t]; recency[t] = i; }
      (all[t] ??= []).includes(String(a.ents[t])) || all[t].push(String(a.ents[t]));
    }
  });
  const entOrder = Object.keys(ents).sort((a, b) => recency[a] - recency[b] || ENT_TYPES.indexOf(a) - ENT_TYPES.indexOf(b));
  const ctx = { n: cmds.length, ents, all, currentBranch: current, entOrder, last, cwdFlags: cwdFlags(cwd) };
  ctx.features = ctxFeatures(ctx);
  return ctx;
}

export function cwdFlags(cwd) {
  if (!cwd) return [];
  const f = [];
  try {
    if (existsSync(join(cwd, '.git'))) f.push('git');
    if (['docker-compose.yml', 'docker-compose.yaml', 'compose.yml', 'compose.yaml'].some((n) => existsSync(join(cwd, n)))) f.push('compose');
  } catch { /* ignore */ }
  return f;
}

/** ctx_ tokens fed to the classifiers (same function is used by scripts/gen_data.js). */
export function ctxFeatures(ctx) {
  const f = [];
  if (ctx.entOrder?.[0]) f.push('ctx_last=' + ctx.entOrder[0]);
  for (const k of ctx.entOrder || []) f.push('ctx_has=' + k);
  if (ctx.last?.intent) f.push('ctx_tool=' + FAMILY_OF[ctx.last.intent]);
  for (const c of ctx.cwdFlags || []) f.push('ctx_cwd=' + c);
  return f;
}

// ---------------------------------------------------------------------------------------------
// deterministic coreference rules

const SAME_RES = [
  /^\s*(?:and\s+|now\s+)?(?:do\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?(?:\s+but)?\s+(?:for|in|on|with|to|at)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:now|again|and)\s+(?:for|in|on|with)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:what|how)\s+about\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:repeat|do it again|run it again)\s+(?:for|in|on|with)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:a\s+|i\s+)?(?:teraz\s+)?(?:to\s+)?samo\s+(?:dla|w|we|na|z|do|ale\s+dla|ale\s+w)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:a|i)\s+(?:teraz\s+)?(?:dla|w|we|na)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:tak samo|analogicznie|powt[oó]rz)\s+(?:dla|w|we|na)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:a\s+)?co\s+z\s+(.+?)\s*[?!.]*$/i,
];

// all rule regexes run on the diacritic-folded, lowercased query (same length as the original)
const fold = (q) => foldKeepLength(String(q)).toLowerCase();
const PRONOUN_EN = /\b(it|its|that|this|them|those|these|the same one)\b/;
const PRONOUN_PL = /(?:^|\s)(tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym)(?=\s|$|[?!.,])|(?:^|\s)to(?=\s*[?!.]*$|\s+(?:co|ktor\w*|tam))/;

const NOUN_TYPE = [
  [/\b(containers?|kontener\w*)\b/i, ['container']],
  [/\b(services?|unit|uslug\w*|serwis\w*|daemon|demon\w*)\b/i, ['service']],
  [/\b(process(es)?|proces\w*|program\w*|app)\b/i, ['pid', 'proc']],
  [/\b(pid)\b/i, ['pid']],
  [/\b(ports?|port\w*)\b/i, ['port']],
  [/\b(branch\w*|gal\w*|gal[eę]\w*|branch)\b/i, ['branch']],
  [/\b(dir(ectory)?|folder\w*|katalog\w*)\b/i, ['dir']],
  [/\b(files?|plik\w*)\b/i, ['file']],
  [/\b(hosts?|server\w*|serwer\w*|machine|maszyn\w*)\b/i, ['host']],
  [/\b(url|link\w*|adres\w*)\b/i, ['url']],
];

// verb class -> entity type -> intent
const FORCE = /\b(force\w*|forcibly|-9|sigkill|na sile|sila|silowo|brutaln\w*)\b/;
const VERBS = [
  ['blame', /\b(who (changed|modified|edited|wrote)|blame|kto (zmienial|modyfikowal|edytowal|pisal|zmienil))\b/i, { file: 'git_blame' }],
  ['extract', /\b(extract|unpack|unzip|untar|decompress|rozpakuj\w*|wypakuj\w*)\b/i, { file: 'extract_targz' }],
  ['kill', /\b(kill|zabij\w*|ubij\w*|terminate|zako[nń]cz\w*|ubi[cć])\b/i,
    { pid: 'kill_by_pid', proc: 'kill_by_name', port: 'kill_by_port', container: 'docker_stop' }],
  ['logs', /\b(logs?|log[iaó]\w*|journal)\b/i, { container: 'docker_logs', service: 'journal_service' }],
  ['restart', /\b(restart\w*|zrestartuj\w*|zrestartowa\w*|uruchom\w* ponownie|reload|prze[lł]aduj)\b/i, { service: 'service_restart' }],
  ['stop', /\b(stop|zatrzymaj\w*|wy[lł][aą]cz\w*|shut down)\b/i,
    { container: 'docker_stop', service: 'service_stop', pid: 'kill_by_pid', proc: 'kill_by_name' }],
  ['start', /\b(start|uruchom\w*|wystartuj\w*|w[lł][aą]cz\w*)\b/i, { service: 'service_start' }],
  ['delete', /\b(delete|remove|rm|erase|usu[nń]\w*|skasuj\w*|wywal\w*|wyrzu[cć]\w*)\b/i,
    { file: 'delete_file', dir: 'delete_dir', branch: 'git_delete_branch' }],
  ['enter', /\b(enter|shell into|exec|wejd[zź]\w*|wej[sś][cć])\b/i, { container: 'docker_exec' }],
  ['switch', /\b(switch|checkout|prze[lł][aą]cz\w*|przejd[zź]\w*)\b/i, { branch: 'git_switch_branch' }],
  ['status', /\b(status|stan\w*)\b/i, { service: 'service_status' }],
  ['size', /\b(size|how big|how much space|rozmiar\w*|ile zajmuje|ile wa[zż]y|wielko[sś][cć])\b/i, { dir: 'dir_size', file: 'file_stat' }],
  ['show', /\b(show|cat|print|display|open|read|view|poka[zż]\w*|wy[sś]wietl\w*|otw[oó]rz\w*|przeczytaj)\b/i,
    { file: 'cat_file', dir: 'list_files', service: 'service_status' }],
  ['ping', /\b(ping\w*)\b/i, { host: 'ping_host' }],
  ['connect', /\b(connect|ssh|po[lł][aą]cz\w*|zaloguj\w*)\b/i, { host: 'ssh_connect' }],
];

const SLOT_FROM_ENT = {
  container: ['container'], service: ['service'], pid: ['pid'], proc: ['name'], port: ['port'], branch: ['branch'],
  host: ['host', 'target'], url: ['url'], file: ['file', 'src', 'path'], dir: ['path', 'src'],
};

export const hasPronoun = (q) => PRONOUN_EN.test(fold(q)) || PRONOUN_PL.test(fold(q));

/** "same for X": returns the new argument text or null. */
export function sameFor(q) {
  const fq = fold(q);
  for (const re of SAME_RES) {
    const m = fq.match(re);
    if (m) { const at = m.index + m[0].indexOf(m[1]); return q.slice(at, at + m[1].length); }
  }
  return null;
}

/** Map a new argument onto the slot of `intent` it replaces. -> {slot, value} | null */
function retarget(intent, arg) {
  const it = BY_ID[intent];
  const has = (k) => k in it.slots || (typeof it.template === 'string' && it.template.includes(`{${k}`));
  const ex = extractSlots(arg);
  if (ex.paths.length && (has('path') || has('file'))) return { slot: has('path') ? 'path' : 'file', value: ex.paths[0] };
  if (ex.port && has('port')) return { slot: 'port', value: ex.port };
  if (ex.hosts.length && (has('host') || has('target'))) return { slot: has('host') ? 'host' : 'target', value: ex.target || ex.hosts[0] };
  if (ex.urls.length && has('url')) return { slot: 'url', value: ex.urls[0] };
  if (ex.ext && has('ext')) return { slot: 'ext', value: ex.ext };
  if (ex.count != null && (has('count') || has('pid'))) return { slot: has('pid') ? 'pid' : 'count', value: ex.count };
  const word = arg.trim().replace(/^(the|ten|ta|to|kontener\w*|container|service|usług\w*|branch|gałąź|galaz|proces\w*|process)\s+/i, '').trim();
  if (!/^[\w@.:/~+-]+$/.test(word)) return null;
  for (const k of ['container', 'service', 'name', 'branch', 'pkg', 'host', 'path', 'file']) if (has(k)) return { slot: k, value: word };
  return null;
}

/**
 * Deterministic resolution. Returns null, or
 *   { rule: 'same-for', intent, slots, note }   (full override, slots to merge over the previous ones)
 *   { rule: 'pronoun', intent|null, fill: {slot: value}, ent, note }
 *   { rule: 'refused', intent|null, ent?, note }  (the referenced value is ambiguous: nothing is filled)
 */
export function resolveReference(query, ctx) {
  if (!ctx || !ctx.n) return null;
  const arg = sameFor(query);
  if (arg && ctx.last) {
    const rt = retarget(ctx.last.intent, arg);
    if (rt) {
      const slots = { ...ctx.last.slots, [rt.slot]: rt.value };
      const amb = Object.entries(slots).find(([, v]) => isAmbiguous(v));
      if (amb) return { rule: 'refused', intent: ctx.last.intent, note: `previous ${ctx.last.intent} has ${amb[0]}=${rawOf(amb[1])}, which depends on the shell state; not guessing` };
      if (rt.slot === 'ext') delete slots.glob;
      if (rt.slot === 'name') delete slots.namepat;
      return { rule: 'same-for', intent: ctx.last.intent, slots, note: `same as previous ${ctx.last.intent} with ${rt.slot}=${rt.value}` };
    }
  }
  if (!hasPronoun(query) || !ctx.entOrder.length) return null;
  // which entity does the pronoun point at? noun hint first ("that container"), else most recent
  const fq = fold(query);
  let types = null;
  for (const [re, ts] of NOUN_TYPE) if (re.test(fq)) { types = ts.filter((t) => ctx.ents[t] != null); if (types.length) break; }
  const ent = (types && types.length ? types : ctx.entOrder)[0];
  if (!ent) return null;
  let intent = null;
  let verb = null;
  for (const [name, re, table] of VERBS) {
    if (re.test(fq)) {
      const pick = table[ent] || (!types && ctx.entOrder.map((e) => table[e]).find(Boolean));
      if (pick) { intent = pick; verb = name; break; }
    }
  }
  const finalEnt = intent ? (Object.entries(SLOT_FROM_ENT).find(([e]) => ctx.ents[e] != null && intentUses(intent, e)) ? pickEnt(intent, ent, ctx) : ent) : ent;
  const value = chooseValue(finalEnt, fq, ctx, verb);
  if (value == null || isAmbiguous(value)) {
    return { rule: 'refused', intent, ent: finalEnt, note: `the latest ${finalEnt} in history (${rawOf(value ?? '?')}) cannot be read unambiguously; not guessing` };
  }
  if (intent === 'kill_by_name' && FORCE.test(fq)) intent = 'kill_force';
  if (intent === 'extract_targz' && /\.zip$/i.test(value)) intent = 'extract_zip';
  const fill = {};
  for (const s of SLOT_FROM_ENT[finalEnt] || []) fill[s] = value;
  return { rule: 'pronoun', intent, fill, ent: finalEnt, note: `"${finalEnt}" from history = ${value}` };
}

/**
 * Pick one value of an entity type: a value the request names part of ("that release branch" ->
 * release/2.3) wins; deleting/switching a branch skips the branch that is checked out; else most recent.
 */
function chooseValue(type, fq, ctx, verb) {
  let vals = ctx.all?.[type] || (ctx.ents[type] != null ? [String(ctx.ents[type])] : []);
  const words = fq.split(/[^a-z0-9]+/).filter((w) => w.length >= 4 && !/^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back)$/.test(w));
  const named = vals.find((v) => !isAmbiguous(v) && words.some((w) => foldKeepLength(v).toLowerCase().includes(w)));
  if (named) return named;
  if (type === 'branch' && (verb === 'delete' || verb === 'switch') && ctx.currentBranch) {
    const other = vals.filter((v) => v !== ctx.currentBranch);
    if (other.length) vals = other;
  }
  return vals[0];
}

/** Implicit references ("ile ma słów", "md5 of the same file"): fill a missing slot from history. */
export function entityForSlot(slot, ctx) {
  // the most recent value of the type is used, or nothing: an ambiguous latest value never falls back to an older one
  for (const [ent, slots] of Object.entries(SLOT_FROM_ENT)) {
    if (slots[0] === slot && ctx.ents[ent] != null) return isAmbiguous(ctx.ents[ent]) ? null : { ent, value: String(ctx.ents[ent]) };
  }
  if (slot === 'file' && ctx.ents.dir == null && ctx.ents.file != null && !isAmbiguous(ctx.ents.file)) return { ent: 'file', value: String(ctx.ents.file) };
  return null;
}

const SAME_BUT = [/^\s*(?:and\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?,?\s+but\s+(.+)$/, /^\s*(?:a\s+|i\s+)?(?:to\s+)?samo,?\s+ale\s+(.+)$/,
  /^\s*(?:a\s+|i\s+)?tak samo,?\s+ale\s+(.+)$/];
/** "same but only file names" / "to samo ale tylko nazwy plików": modifier for the previous command. */
export function sameBut(query, ctx) {
  if (!ctx?.last) return null;
  const fq = fold(query);
  const lastSlots = Object.fromEntries(Object.entries(ctx.last.slots || {}).filter(([, v]) => !isAmbiguous(v)));
  for (const re of SAME_BUT) if (re.test(fq)) return { lastIntent: ctx.last.intent, lastSlots };
  return null;
}

function intentUses(intent, ent) {
  const it = BY_ID[intent];
  return (SLOT_FROM_ENT[ent] || []).some((k) => k in it.slots);
}
function pickEnt(intent, ent, ctx) {
  if (intentUses(intent, ent)) return ent;
  return ctx.entOrder.find((e) => intentUses(intent, e)) || ent;
}
