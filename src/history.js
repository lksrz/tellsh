// Shell-history context for reference resolution ("delete it", "to samo dla /var", "logs of that container").
// Only the tail of the history file is read, kept in memory for this one request, and never logged
// or written anywhere.
import { openSync, readSync, fstatSync, closeSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { INTENTS, BY_ID } from './catalog.js';
import { FAMILY_OF } from './tools.js';
import { extractSlots, foldKeepLength, isStopWord } from './slots.js';
import { VARIANTS } from './variants.js';
import { splitCommand, wordsOf, decodeWord, AMB, isAmbiguous, isExpansion, isGlob, rawOf, joinArgs } from './shellwords.js';
import { commandWords, commandChains } from './danger.js';

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

/** Last `n` commands from the user's history file (or from `file`; default 2: the previous command and the running `tellsh` line some shells write first). Returns [] when unavailable. */
export function loadHistory({ shell = 'bash', file, n = 2, env = process.env, os = process.platform } = {}) {
  const cands = file ? [[/zsh/.test(file) ? 'zsh' : /fish/.test(file) ? 'fish' : /PSReadLine/i.test(file) ? 'pwsh' : 'bash', file]]
    : historyCandidates(shell, env, os);
  for (const [kind, path] of cands) {
    try {
      if (!existsSync(path)) continue;
      const { buf, partial } = readTail(path);
      const text = (kind === 'zsh' ? unmetafy(buf) : buf).toString('utf8');
      const cmds = parseHistory(text, kind, { partial });
      if (cmds.length) return Object.assign(cmds.slice(-n), { kind: kind === 'pwsh' ? 'pwsh' : 'posix', shell: kind });
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
// The alternatives must never overlap, or matching a long run of \\ or '' against a template that
// does not fit backtracks exponentially: a backslash is only ever consumed by `\\.`, and a quoted
// PowerShell string cannot end right before another quote (`''''` is one string, not two).
const WORD_RE = {
  posix: String.raw`((?:'[^']*'|"(?:\\.|[^"\\])*"|\\.|[^\s'"\\;&|<>()])+)`,
  pwsh: `((?:['‘-‛](?:[^'‘-‛]|['‘-‛]{2})*['‘-‛](?!['‘-‛])|["“-„](?:${BT}.|["“-„]{2}|[^"“-„${BT}])*["“-„](?!["“-„])|${BT}.|[^\\s'"‘-„${BT};|(){}<>])+)`,
};
let INV = null;
function inverters() {
  if (INV) return INV;
  INV = [];
  const add = (id, tpl) => {
    if (typeof tpl !== 'string') return;
    // `«{scope!raw}»` only ever renders a placeholder: no command has a value there (`gh pr view 1 2` is not pr 1, scope 2)
    tpl = tpl.replace(/«\{scope!raw\}»/g, '');
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

/**
 * mv/cp/ln (Move-Item/Copy-Item) SRC... DST: "it" afterwards is the moved/copied item, which is DST
 * itself only when DST names the new file (`mv a.txt b.txt`). When DST is a directory the item now
 * lives somewhere inside it, so neither DST nor SRC is a safe "it": both types become ambiguous.
 */
function destEnts(srcs, dst, ents) {
  const d = rawOf(dst);
  if (!isAmbiguous(dst) && srcs.length === 1 && typeByExt(srcs[0]) === 'file' && typeByExt(d) === 'file' && !/[\\/]$/.test(d)) {
    ents.file ??= dst;
    return;
  }
  ents.file ??= AMB + d;
  ents.dir ??= AMB + d;
}

// options that take a value, per command (so `kill -s 9 4242` or `pkill nginx -u bob` pick the right word)
const VALUE_OPTS = {
  kill: new Set(['-s', '-n', '--signal']),
  pkill: new Set(['-u', '-U', '-g', '-G', '-P', '-s', '-t', '-F', '--signal', '--euid', '--uid', '--group', '--pgroup', '--parent', '--session', '--terminal', '--pidfile', '--ns', '--nslist']),
  killall: new Set(['-u', '--user', '-s', '--signal', '-o', '--older-than', '-y', '--younger-than', '-n', '--ns', '-Z', '--context']),
  pidof: new Set(['-o', '--omit-pid']),
  grep: new Set(['-e', '--regexp', '-f', '--file', '-m', '--max-count', '-A', '-B', '-C', '--include', '--exclude', '--exclude-dir', '--label', '--color', '-d', '-D']),
  checkout: new Set(['-b', '-B', '--orphan', '--conflict', '--pathspec-from-file']),
  switch: new Set(['-c', '-C', '--create', '--force-create', '--orphan', '--conflict']),
  mv: new Set(['-t', '--target-directory', '-S', '--suffix']),
};
VALUE_OPTS.pgrep = VALUE_OPTS.pkill;
VALUE_OPTS.cp = VALUE_OPTS.mv;
VALUE_OPTS.ln = VALUE_OPTS.mv;
VALUE_OPTS.rg = VALUE_OPTS.grep;

/** -> { pos: positional args, opts: {opt: value}, flags: [options without value], after: args after `--` } */
function parseArgs(args, valueOpts = new Set()) {
  const pos = [];
  const opts = {};
  const flags = [];
  let after = null;
  for (let i = 0; i < args.length; i++) {
    const a = String(args[i]);
    if (a === '--') { after = args.slice(i + 1); pos.push(...after); break; }
    if (/^--[^=]+=/.test(a)) { opts[a.replace(/=.*$/s, '')] = a.slice(a.indexOf('=') + 1); continue; }
    if (valueOpts.has(a)) { opts[a] = args[i + 1]; i++; continue; }
    // attached short value: -uroot, -tDIR
    if (/^-[A-Za-z]./.test(a) && valueOpts.has(a.slice(0, 2)) && !/^--/.test(a)) { opts[a.slice(0, 2)] = a.slice(2); continue; }
    if (/^-./.test(a)) { flags.push(a); continue; }
    pos.push(args[i]);
  }
  return { pos, opts, flags, after };
}

// VAR=x prefixes and wrapper commands (sudo -u root, env, command, nice -n 5, timeout 5, ...) removed: the command that runs.
// Returns `w` itself when there is nothing to remove.
function unwrap(w) {
  let i = 0;
  while (i < w.length && /^\w+=/.test(w[i])) i++;
  if (i < w.length && isAmbiguous(w[i])) return i ? w.slice(i) : w;
  const r = commandWords(w.map(String));
  return r.length === w.length ? w : w.slice(w.length - r.length);
}

const CD_HEADS = new Set(['cd', 'pushd', 'popd', 'chdir', 'set-location', 'sl', 'push-location', 'pop-location']);
// a path that depends on the working directory (stale once the directory changes)
export const isRelativePath = (v) => {
  const s = rawOf(String(v));
  return !/^(?:[~/\\]|[A-Za-z]:[\\/]|\$HOME\b|\$\{HOME\}|\$env:|%USERPROFILE%)/i.test(s);
};
const PATH_SLOT_KEYS = ['path', 'file', 'src', 'dst', 'dest', 'archive'];
/** Mark working-directory-relative file/dir values as ambiguous (the cwd changed after they were used). */
function staleRelative(ents, slots) {
  for (const t of ['file', 'dir']) if (ents[t] != null && !isAmbiguous(ents[t]) && isRelativePath(ents[t])) ents[t] = AMB + ents[t];
  if (slots) for (const k of PATH_SLOT_KEYS) if (slots[k] != null && !isAmbiguous(slots[k]) && isRelativePath(slots[k])) slots[k] = AMB + slots[k];
}

/** Mark a pull request / branch as ambiguous (after a cd): it names one only in the repository of the working directory. */
function staleRepo(ents, slots) {
  for (const o of [ents, slots || {}]) for (const t of ['pr', 'branch']) if (o[t] != null && !isAmbiguous(o[t])) o[t] = AMB + rawOf(o[t]);
}

// output/input redirection operator words (splitCommand keepRedirects): `>`, `2>>`, `&>`, `>|`, `<`, `>&`
const REDIR_TARGET_OP = /^\d*(?:[<>]{1,2}[&|]?|&>>?)$/;
const REDIR_DUP_OP = /^\d*[<>]+&[\d-]+$/;

/** PowerShell native commands. Returns true when the head was recognised. */
function psNative(head, args, ents, setIntent) {
  const kind = PS_NATIVE[head];
  if (!kind) return false;
  const { named, pos, sw } = psArgs(args);
  const path = named.literalpath ?? named.lp ?? named.path ?? named.pspath ?? pos[0];
  if (kind === 'file' && path != null) ents.file ??= path;
  else if (kind === 'path' && path != null) ents[typeByExt(path)] ??= path;
  else if (kind === 'dir' && path != null) {
    if (ents.dir == null) {
      ents.dir = path;
      // Get-ChildItem DIR -Filter/-Include/-Exclude/-Recurse (or DIR *.tmp): the matches live inside DIR
      if (!['set-location', 'sl', 'chdir', 'push-location'].includes(head) &&
          (named.filter != null || named.include != null || named.exclude != null || pos[1] != null || [...sw].some((x) => x.length >= 2 && 'recurse'.startsWith(x)))) ents.searchDir = true;
      else if (!['set-location', 'sl', 'chdir', 'push-location'].includes(head)) ents.listDir = true;
    }
  }
  else if (kind === 'dir' && !['set-location', 'sl', 'chdir', 'push-location'].includes(head)) {
    // Get-ChildItem without a path lists the working directory
    ents.listCwd = named.filter != null || named.include != null || named.exclude != null || [...sw].some((x) => x.length >= 2 && 'recurse'.startsWith(x)) ? 'search' : 'list';
  }
  else if (kind === 'remove' && path != null) ents[[...sw].some((s) => 'recurse'.startsWith(s)) ? 'dir' : typeByExt(path)] ??= path;
  else if (kind === 'copy') { const d = named.destination ?? pos[1]; if (d != null) destEnts(path != null ? String(path).split(',') : [], d, ents); }
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
  if (slots.pr && !String(slots.pr).startsWith('?')) put('pr', slots.pr);
  if (slots.file) put('file', slots.file);
  if (slots.archive) put('file', slots.archive);
  if (slots.dst && !isAmbiguous(slots.dst)) destEnts(slots.src != null ? [slots.src] : [], slots.dst, ents);
  if (slots.path && slots.path !== '.') put(['delete_dir', 'mkdir', 'dir_size', 'largest_dirs', 'list_files'].includes(intent) || fam === 'find' ? 'dir' : /\.\w{1,5}$/.test(slots.path) ? 'file' : 'dir', slots.path);
}

// the tellsh CLI itself (installed, via npx, or `node bin/tellsh.js`)
const TELLSH_LINE = /^(?:npx\s+(?:-y\s+)?|node\s+)?(?:\S*[\\/])?tellsh(?:\.js)?(?:\s+(.*))?$/s;

// tellsh options that take a separate value (`--shell bash`): the value is not part of the request
const TELLSH_VALUE_OPTS = new Set(['--shell', '--os', '--platform', '--top', '--threshold']);
/**
 * The request text of a `tellsh ...` history line (options removed), or null if the line is not a tellsh call.
 * Words keep their boundaries (`tellsh delete folder "/tmp/a b"` -> `delete folder "/tmp/a b"`); false when the
 * line cannot be read back as one request (a word with spaces and both quote characters, unparseable quoting).
 */
export function tellshQuery(line, kind = 'posix') {
  const a = tellshArgs(line, kind);
  return a == null || a === false ? a : a.text;
}

/** tellshQuery with the quoted arguments joinArgs could not classify: -> { text, unclear } | null | false */
export function tellshArgs(line, kind = 'posix') {
  const t = String(line).trim();
  const tm = t.match(TELLSH_LINE);
  if (!tm) return null;
  const w = wordsOf(tm[1] || '', lineKind(t, kind), { literalTilde: false });
  if (!w) return tm[1] ? false : { text: '', unclear: [] };
  const words = [];
  for (let i = 0; i < w.length; i++) {
    if (TELLSH_VALUE_OPTS.has(w[i])) { i++; continue; }
    if (!/^-/.test(w[i])) words.push(rawOf(w[i]));
  }
  if (!words.length) return { text: '', unclear: [] };
  return joinArgs(words) ?? false;
}

/**
 * Analyse one history line. `classify(query)` handles previous `tellsh <query>` lines.
 * kind: 'posix' | 'pwsh' (PowerShell history; Verb-Noun lines are always read as PowerShell).
 * Segments of a compound line (`a; b`, `a && b`, `a | b`) are read in order and later ones win: the
 * entities of `cat old.txt; cat new.txt` are those of `cat new.txt`. Redirection targets (`> out.txt`)
 * are files the line wrote. A `cd` makes every earlier working-directory-relative path ambiguous.
 * `at` gives each entity type the index of the segment it came from (later segment = newer), and
 * `searchDir` marks a `dir` entity that is only the root of a search (`find /var/log -name '*.gz'`,
 * `grep -rl TODO src`): the results live inside it, so it must never be a destructive target.
 * -> { line, intent, slots, ents, at, searchDir?, ambiguous, cd?, scoped?, fromTellsh?, opaque? }  (scoped: see scopedElsewhere)
 */
export function analyzeCommand(line, classify, kind = 'posix') {
  let ents = {};
  let intent = null;
  let slots = {};
  let ambiguous = false;
  const t = line.trim();
  const k = lineKind(t, kind);
  if (TELLSH_LINE.test(t)) {
    const qa = tellshArgs(t, k);
    // a request that cannot be read back: it may have named any file or directory
    if (qa === false) return { line: t, intent, slots, ents: { file: AMB + t, dir: AMB + t }, at: {}, listed: { file: 0, dir: 0 }, opaque: true, fromTellsh: true, ambiguous: true };
    const q = qa?.text;
    const r = q && classify ? classify(q, qa.unclear) : null;
    if (r?.intent) { intent = r.intent; slots = { ...(r.slots || {}) }; entsFromSlots(intent, slots, ents); }
    // `tellsh list directory /tmp/build`: like `ls /tmp/build`, the user saw the entries of the directory
    const sr = isSearchRoot(intent, slots, ents);
    const ld = !sr && ents.dir != null && (FAMILY_OF[intent] === 'ls' || intent === 'largest_dirs');
    const listed = Object.fromEntries(listedByIntent(intent).map((x) => [x, 0]));
    return { line: t, intent, slots, ents, at: {}, listed, ...(sr ? { searchDir: true } : {}), ...(ld ? { listDir: true } : {}), fromTellsh: true, ambiguous };
  }
  const split = splitCommand(t, k, { keepRedirects: true });
  if (!split.ok) {
    // cannot interpret the line (unterminated quote, heredoc, ...): it may name any file or directory,
    // so older file/dir values must not be picked up by "it"
    ents.file = AMB + t;
    ents.dir = AMB + t;
    return { line: t, intent, slots, ents, at: {}, listed: { file: 0, dir: 0 }, opaque: true, ambiguous: true };
  }
  const inv = invert(t, k);
  let segIntent = null;
  let segSlots = {};
  let segIntentAt = -1;
  let intentStale = false;
  let cdAt = -1;
  let scoped = false;
  const exportedScope = new Set(); // tools (git, docker, podman, gh) an `export VAR=…` earlier in the line pointed elsewhere
  const exportAt = {}; // tool -> index of the segment that exported (or removed) its scope variable
  let setEnvCall = false;
  let wrapCwd = false;
  const subCds = new Set(); // ids of `( … )` subshells in which a cd ran (posix)
  let searchDir = false;
  let listDir = false;
  const at = {};
  const listed = {}; // entity type -> index of the newest segment that listed values of that type
  // segments from..to-1 are connected by pipes only
  const samePipe = (from, to) => from >= 0 && split.segments.slice(from, to).every((s) => s.sep === '|');
  const firstWord = (s) => unwrap(s.words.filter((x) => !REDIR_TARGET_OP.test(x) && !REDIR_DUP_OP.test(x)))[0];
  split.segments.forEach(({ words, subs }, segIdx) => {
    const e = {};
    const setIntent = (id, s) => { segIntent = id; segSlots = s; segIntentAt = segIdx; };
    // redirections: the target is a file the command wrote (or read); it is not an argument
    let w = [];
    let redirTarget = null;
    for (let i = 0; i < words.length; i++) {
      const x = words[i];
      if (REDIR_DUP_OP.test(x)) continue;
      if (REDIR_TARGET_OP.test(x)) {
        const target = words[i + 1];
        i++;
        if (target != null && !/^\/dev\/(?:null|stdout|stderr|tty)$|^(?:\$null|NUL)$/i.test(rawOf(target))) redirTarget = target;
        continue;
      }
      w.push(x);
    }
    // wrappers (`sudo -u root ls`, `env ls`, `command ls`, `nice -n 5 ls`, `timeout 5 ps aux`): the command they run
    const raw = w;
    w = unwrap(w);
    // a wrapper whose options could not be read: what ran is unknown, so it may have printed or named anything
    if (!w.length || (w !== raw && /^-/.test(w[0]))) {
      e.file = AMB + raw.join(' '); e.dir = AMB + raw.join(' ');
      for (const x of ENT_TYPES) listed[x] = segIdx;
      w = [];
    }
    // `export GH_REPO=a/b; gh pr view 45`, `$env:DOCKER_HOST = …`: the later commands of the line are scoped as well
    // (`$env:GH_REPO="a/b"` is one word); the values earlier segments named for that tool name things of the old scope
    const rw = raw.map((x) => String(rawOf(x)));
    const exported = /^(?:export|declare|typeset|set)$/.test(rw[0]) ? rw.slice(1).filter((x) => SCOPE_ENV.test(x))
      : /^\$env:\w+(?:=.*)?$/i.test(rw[0]) && SCOPE_ENV.test(rw[0].slice(5).replace(/=.*$/, '') + '=') ? [rw[0].slice(5)] : [];
    // `unset GH_REPO`, `export -n GH_REPO`, `Remove-Item Env:GH_REPO`, `[Environment]::SetEnvironmentVariable('GH_REPO', $null)`:
    // a scope inherited from outside the line is dropped, so the values earlier segments named are of that other scope too
    // (later segments run in the scope tellsh runs in, so they are not marked)
    const removed = unsetScopeVars(rw, setEnvCall);
    setEnvCall = /SetEnvironmentVariable$/i.test(rw[rw.length - 1] ?? ''); // the call's arguments are the next segment
    for (const x of [...exported, ...removed]) {
      const tool = scopeTool(x);
      if (exported.includes(x)) exportedScope.add(tool);
      for (const t of SCOPE_ENTS[tool]) if (ents[t] != null && !isAmbiguous(ents[t])) ents[t] = AMB + rawOf(ents[t]);
      exportAt[tool] = segIdx;
    }
    if (w.length) segmentEnts(w, e, setIntent, split, k, segIdx, firstWord);
    // `git -C /repo blame notes.txt`, `docker --context prod logs web`: "delete it" / "stop it" here would hit a
    // different file / container than the one the command used (never resolved, never repeated)
    if (w.length && scopedElsewhere(w, raw, exportedScope)) {
      scoped = true;
      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x])) e[x] = AMB + rawOf(e[x]);
      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; markScoped(segSlots); }
    }
    // `env -C /repo cat notes.txt`, `sudo -D /repo …`: relative values name files in that directory, not here;
    // `chroot /srv cat /etc/x`: every value names something under the other root
    const ws = w.length && w !== raw ? wrapperScope(w, raw) : null;
    const subCd = k === 'posix' && !!subs?.some((id) => subCds.has(id));
    if (ws === 'root') {
      scoped = true;
      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x])) e[x] = AMB + rawOf(e[x]);
      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; markScoped(segSlots); }
    } else if (ws === 'cwd' || subCd) {
      // also `(cd /repo && cat notes.txt)`: the cd only lasts inside the subshell, so relative values name files
      // there, while "delete it" runs here
      wrapCwd = true;
      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x]) && isRelativePath(e[x])) e[x] = AMB + rawOf(e[x]);
      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; staleRelative({}, segSlots); }
    }
    // `(cd /repo && echo hi > notes.txt)`: the redirection opened notes.txt in /repo, not here (a wrapper's
    // redirection, `sudo -D /repo cat a > out.txt`, is opened by the calling shell, so it stays)
    if (redirTarget != null) e.file = subCd && !isAmbiguous(redirTarget) && isRelativePath(redirTarget) ? AMB + rawOf(redirTarget) : redirTarget;
    const pipedIn = segIdx > 0 && split.segments[segIdx - 1].sep === '|';
    if (w.length && !isAmbiguous(w[0])) for (const x of listedBySegment(w, pipedIn, k)) listed[x] = segIdx;
    // every command the wrapper chain may run (also when its options are misread): a listing anywhere in it counts
    if (w !== raw) for (const c of commandChains(raw, [], {})) if (c.length && !isAmbiguous(c[0])) for (const x of listedBySegment(c, pipedIn, k)) listed[x] = segIdx;
    // a listing piped into anything (`ls DIR | sort | grep pdf`, `ls -S DIR | head -1`, `gci DIR | Select-Object
    // -First 1`): what the user saw is a selection of the entries inside DIR, never DIR itself
    const piped = split.segments[segIdx].sep.startsWith('|') && !split.segments[segIdx].sep.startsWith('||');
    if (e.listDir && piped) { e.searchDir = true; delete e.listDir; }
    if (e.listCwd) {
      const how = piped ? 'search' : e.listCwd;
      // `cd DIR && ls | grep pdf`: the listing is of DIR
      if (cdAt >= 0 && at.dir === cdAt) { if (how === 'search') { searchDir = true; listDir = false; } else if (!searchDir) listDir = true; }
      delete e.listCwd;
    }
    const head = w.length && !isAmbiguous(w[0]) ? w[0].replace(/^.*[\\/]/, '').toLowerCase() : '';
    if (CD_HEADS.has(head)) {
      // the working directory changes: earlier relative paths (and a relative cd target) are stale
      cdAt = segIdx;
      if (k === 'posix' && subs) subCds.add(subs[subs.length - 1]);
      staleRelative(ents, null);
      staleRepo(ents, null);
      const target = w.slice(1).filter((a) => !/^-/.test(a))[0];
      if (target != null && !isAmbiguous(target) && !isRelativePath(target) && target !== '-') e.dir = target;
      else e.dir = AMB + (target ?? '-');
      delete e.file;
    }
    if (e.dir !== undefined) { searchDir = !!e.searchDir; listDir = !!e.listDir; }
    // `ls ~/Downloads | grep pdf`, `gci DIR | Where-Object …`: the listed directory was filtered, so what
    // the user saw are entries inside it
    // (any later stage of the same pipeline, not only the next one)
    else if (segIdx > 0 && at.dir != null && at.dir < segIdx && samePipe(at.dir, segIdx) && FILTER_HEADS.has(head)) searchDir = true;
    delete e.searchDir;
    delete e.listDir;
    for (const key of Object.keys(e)) at[key] = segIdx;
    Object.assign(ents, e); // later segments supersede earlier ones
  });
  if (inv && cdAt < 0) {
    // the whole line is a catalog/variant command: its slots are the most precise reading
    intent = inv.intent; slots = inv.slots; ambiguous = inv.ambiguous;
    if (scoped || Object.keys(exportAt).length) { slots = { ...slots }; markScoped(slots); }
    if (wrapCwd) { slots = { ...slots }; staleRelative({}, slots); }
    const ie = {};
    entsFromSlots(intent, slots, ie);
    for (const key of Object.keys(ie)) at[key] = split.segments.length;
    if (ie.dir !== undefined) {
      // a piped/filtered listing found above stays a search root even when the line is a catalog command
      const piped = searchDir && String(ie.dir) === String(ents.dir);
      searchDir = isSearchRoot(intent, slots, ie) || piped;
      listDir = !searchDir && (['ls', 'find'].includes(FAMILY_OF[intent]) || intent === 'largest_dirs');
    }
    ents = { ...ents, ...ie };
  } else if (segIntent) {
    intent = segIntent; slots = { ...segSlots };
    if (segIntentAt < cdAt) { staleRelative({}, slots); staleRepo({}, slots); }
    // `gh pr view 45; export GH_REPO=other/repo`: the pull request is one of the old repository
    for (const [tool, i] of Object.entries(exportAt)) if (segIntentAt < i) for (const t of SCOPE_ENTS[tool]) if (slots[t] != null && !isAmbiguous(slots[t])) slots[t] = AMB + rawOf(slots[t]);
    // `kill 1111; ls newdir`: another command ran after the one tellsh could repeat
    if (split.segments.slice(segIntentAt, -1).some((s) => s.sep !== '|')) intentStale = true;
  }
  if (Object.values(slots).some(isAmbiguous)) ambiguous = true;
  return { line: t, intent, slots, ents, at, ambiguous, ...(searchDir && ents.dir != null ? { searchDir: true } : {}),
    ...(listDir && !searchDir && ents.dir != null ? { listDir: true } : {}), ...(cdAt >= 0 ? { cd: true } : {}),
    ...(intentStale ? { intentStale: true } : {}), ...(scoped ? { scoped: true } : {}), listed,
    // the dir is the `cd` target (`cdFollowed`: another segment ran after the cd)
    ...(cdAt >= 0 && at.dir === cdAt ? { cdDir: true, cdFollowed: cdAt < split.segments.length - 1 } : {}) };
}

// Listings: commands that print many values of an entity type (`ls`, `find`, `ps aux`, `docker ps`, `git branch`).
// After one, "it"/"them" may mean any of the printed values, so an older value of that type is not a safe
// target for a changing command.
const FS_LISTERS = new Set(['ls', 'tree', 'dir', 'gci', 'get-childitem', 'll', 'la', 'find', 'fd', 'fdfind', 'locate', 'mlocate', 'plocate',
  'du', 'ncdu', 'exa', 'eza', 'lsd', 'vdir']);
const FS_SEARCHERS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'select-string', 'sls', 'findstr']);
const PROC_LISTERS = new Set(['ps', 'top', 'htop', 'btop', 'atop', 'pgrep', 'pidof', 'pstree', 'get-process', 'gps', 'tasklist']);
// global options that take a value, before the subcommand (`git -C /tmp status`, `docker --context prod ps`)
const GLOBAL_VALUE_OPTS = {
  git: new Set(['-C', '-c', '--git-dir', '--work-tree', '--namespace', '--super-prefix', '--config-env']),
  docker: new Set(['-H', '--host', '-c', '--context', '--config', '-l', '--log-level', '--tlscacert', '--tlscert', '--tlskey']),
  podman: new Set(['-c', '--connection', '--url', '--identity', '--root', '--runroot', '--cgroup-manager', '--log-level', '--storage-driver',
    '--module', '--events-backend', '--network-cmd-path', '--tmpdir', '--volumepath', '--imagestore', '--hooks-dir', '--conmon', '--runtime', '--ssh']),
};
// global options / environment that point git, docker or podman at another repository, directory or daemon
// (a short option may carry its value attached: `git -C/repo`, `docker -Htcp://prod:2375`, `podman -cprod`)
const SCOPE_OPTS = {
  git: /^-C|^--(?:git-dir|work-tree|namespace)(?:=|$)/,
  docker: /^-[Hc]|^--(?:host|context|config)(?:=|$)/,
  podman: /^-c|^--(?:connection|url|root|runroot|identity|ssh)(?:=|$)/,
  // gh has no global options: GH_REPO / GH_HOST (also exported earlier in the line) point it at another repository
  gh: /^-R|^--repo(?:=|$)/,
};
// the tool an exported variable scopes, and the values that tool's commands name
const scopeTool = (x) => (/^GIT_/.test(x) ? 'git' : /^DOCKER_/.test(x) ? 'docker' : /^CONTAINER_/.test(x) ? 'podman' : 'gh');
const SCOPE_ENTS = { git: ['branch'], docker: ['container'], podman: ['container'], gh: ['pr', 'branch'] };
const SCOPE_ENV = /^(?:GIT_DIR|GIT_WORK_TREE|GIT_NAMESPACE|DOCKER_HOST|DOCKER_CONTEXT|DOCKER_CONFIG|CONTAINER_HOST|CONTAINER_CONNECTION|GH_REPO|GH_HOST)=/;
/** The scope variables a segment removes (`unset`, `export -n`, `Remove-Item Env:…`, `SetEnvironmentVariable(…)`), as `NAME=`. */
function unsetScopeVars(rw, setEnvCall = false) {
  const head = String(rw[0] ?? '');
  let names = [];
  if (setEnvCall) names = [head.replace(/^['"]|['"]?,?$/g, '')];
  else if (head === 'unset' || (head === 'export' && rw.includes('-n'))) names = rw.slice(1).filter((x) => !/^-/.test(x));
  else if (/^(?:Remove-Item|ri|rm|del|erase|rd|rmdir|Clear-Item|cli)$/i.test(head)) names = rw.slice(1).map((x) => (x.match(/^(?:-\w+:)?Env:[\\/]?(\w+)$/i) || [])[1]).filter(Boolean);
  return names.map((x) => `${x}=`).filter((x) => SCOPE_ENV.test(x));
}
/** `git -C /repo …`, `docker --context prod …`, `DOCKER_HOST=… docker …` (w: the unwrapped words, raw: before unwrap). */
function scopedElsewhere(w, raw, exported = new Set()) {
  if (isAmbiguous(w[0])) return false;
  const head = String(w[0]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
  const re = SCOPE_OPTS[head];
  if (!re) return false;
  if (exported.has?.(head) || exported === true) return true;
  if (raw.slice(0, raw.length - w.length).some((x) => SCOPE_ENV.test(String(x)))) return true;
  const args = w.slice(1);
  return args.slice(0, args.length - afterGlobals(head, args).length).some((a) => re.test(String(a)));
}
// wrapper options that run the command in another working directory (`env -C /repo`, `sudo -D /repo`, also with the
// value attached or in a cluster) or under another root (`chroot /srv`, `unshare --root=/srv`, `nsenter -r`)
// login shells start in the target user's home (`sudo -i`, `sudo -iu bob`, `sudo --login`, `runuser -l`, `su -`);
// `run0 --user=bob` runs in bob's home (also `-i`, the target's login shell, in newer systemd)
const WRAPPER_CWD = {
  env: /^-[a-zA-Z0-9]*C|^--chdir(?:=|$)/,
  sudo: /^-[a-zA-Z]*[Di]|^--(?:chdir|login)(?:=|$)/,
  runuser: /^-[a-zA-Z]*l|^--login(?:=|$)/,
  su: /^-$|^-[a-zA-Z]*l|^--login(?:=|$)/,
  unshare: /^-w|^--wd(?:=|$)/,
  nsenter: /^-w|^--wd(?:=|$)/,
  'systemd-run': /^--working-directory(?:=|$)/,
  'start-stop-daemon': /^-d|^--chdir(?:=|$)/,
  run0: /^-[a-zA-Z]*[Dui]|^--(?:chdir|user|via-shell|login)(?:=|$)/,
};
// wrappers that always change to another directory: pkexec runs every command in the target user's home
const CWD_WRAPPERS = new Set(['pkexec']);
const WRAPPER_ROOT = {
  sudo: /^-[a-zA-Z]*R|^--chroot(?:=|$)/,
  unshare: /^-R|^--root(?:=|$)/,
  nsenter: /^-r|^--root(?:=|$)/,
  'start-stop-daemon': /^-r|^--chroot(?:=|$)/,
};
const ROOT_WRAPPERS = new Set(['chroot', 'proot', 'firejail', 'bwrap', 'systemd-nspawn']);
// namespace wrappers: the command saw another PID / network / mount namespace (`nsenter -t 1234 -p ps -p 42`,
// `unshare -n ss -ltn`), so a pid, port, process or path it named is not the one "kill it" would hit here
const NS_WRAPPERS = new Set(['nsenter', 'unshare']);
// wrapper options that run the command on another machine / host (`systemd-run --machine=web ps -p 42`,
// `systemd-run -H user@host …`, `run0 --machine=web …`, `sudo --host=web …`): like a namespace, nothing it named is here
const WRAPPER_HOST = {
  'systemd-run': /^-[a-zA-Z]*[MH]|^--(?:machine|host)(?:=|$)/,
  run0: /^-[a-zA-Z]*M|^--machine(?:=|$)/,
  sudo: /^-[a-zA-Z]*h|^--host(?:=|$)/,
};
// wrappers that always run the command on another machine / container (`machinectl shell web ps -p 42`)
const HOST_WRAPPERS = new Set(['machinectl']);
// unit properties (`systemd-run -p WorkingDirectory=/srv …`, `-pX=…`, `--property=X=…`, `--property X=…`, clustered after
// flags that take no value `-tp X=…` / `-tpX=…`, also run0) that run the command in another directory ('cwd') or under
// another root / mounts / namespaces ('root')
const PROP_WRAPPERS = new Set(['systemd-run', 'run0']);
// (the cluster class is the valueless short options of systemd-run(1): -t -P -q -G -d -S -r; keep it in sync with the man page)
const PROP_OPT = /^(?:-[tPqGdSr]*p|--property)$/;
const PROP_ATTACHED = /^(?:-[tPqGdSr]*p|--property=)(.+)$/;
const PROP_CWD = /^WorkingDirectory=/i;
const PROP_ROOT = /^(?:RootDirectory|RootImage|RootEphemeral|MountImages|ExtensionImages|ExtensionDirectories|BindPaths|BindReadOnlyPaths|TemporaryFileSystem|PrivateTmp|PrivateMounts|MountAPIVFS|PrivatePIDs|PrivateNetwork|NetworkNamespacePath|IPCNamespacePath|PrivateUsers|JoinsNamespaceOf|PrivateIPC|PrivateDevices)=|^ProtectHome=tmpfs\b/i;
/**
 * 'root' when a wrapper in the removed prefix of `raw` (before the unwrapped words `w`) runs the command under another
 * root (every path names something else), 'cwd' when it runs it in another working directory (relative paths do).
 */
function wrapperScope(w, raw) {
  let cur = null;
  let scope = null;
  let prop = false;
  for (const x of raw.slice(0, raw.length - w.length).map((v) => String(rawOf(v)))) {
    const p = prop ? x : PROP_WRAPPERS.has(cur) ? x.match(PROP_ATTACHED)?.[1] : null;
    prop = PROP_WRAPPERS.has(cur) && PROP_OPT.test(x);
    if (p != null) {
      if (PROP_ROOT.test(p)) return 'root';
      if (PROP_CWD.test(p)) scope = 'cwd';
      continue;
    }
    const h = x.replace(/^.*[\\/]/, '').toLowerCase();
    if (ROOT_WRAPPERS.has(h) || NS_WRAPPERS.has(h) || HOST_WRAPPERS.has(h)) return 'root';
    if (CWD_WRAPPERS.has(h)) { scope = 'cwd'; continue; }
    if (!x.startsWith('-')) { if (WRAPPER_CWD[h] || WRAPPER_ROOT[h] || WRAPPER_HOST[h]) cur = h; continue; }
    if (WRAPPER_ROOT[cur]?.test(x) || WRAPPER_HOST[cur]?.test(x)) return 'root';
    if (WRAPPER_CWD[cur]?.test(x)) scope = 'cwd';
  }
  return scope;
}
/** The values of a scoped command (scopedElsewhere) as ambiguous: they name things in another repository / daemon. */
function markScoped(o) {
  for (const x of Object.keys(o)) if (o[x] != null && typeof o[x] !== 'boolean' && !isAmbiguous(o[x])) o[x] = AMB + rawOf(o[x]);
}
/** The arguments after the global options of git/docker/podman (`git -C /tmp status` -> ['status']); other heads: unchanged. */
function afterGlobals(head, args) {
  const vo = GLOBAL_VALUE_OPTS[head];
  if (!vo) return args;
  let i = 0;
  while (i < args.length && /^-/.test(args[i]) && args[i] !== '--') i += vo.has(args[i]) ? 2 : 1;
  if (args[i] === '--') i++;
  return args.slice(i);
}
function listedBySegment(w, pipedIn, k) {
  const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
  const nonFlags = afterGlobals(head, w.slice(1)).filter((a) => !/^-/.test(a));
  // `du -sh DIR` is the size of DIR itself; `du DIR` / `du -d 1 DIR` lists what is inside
  if (head === 'du' && w.slice(1).some((a) => /^-[a-zA-Z]*s|^--summarize$/.test(a)) && !nonFlags.some(isGlob)) return [];
  if (FS_LISTERS.has(head)) return ['file', 'dir'];
  // grep reading a pipe filters what an earlier stage printed; reading files it lists matches
  if (FS_SEARCHERS.has(head)) return pipedIn ? [] : ['file', 'dir'];
  if (PROC_LISTERS.has(head)) return ['pid', 'proc'];
  if (['ss', 'netstat', 'lsof', 'fuser', 'get-nettcpconnection'].includes(head)) return ['port', 'pid', 'proc'];
  if (head === 'docker' || head === 'podman') {
    const sub = nonFlags.slice(0, 2).join(' ');
    return /^(?:ps|stats|container (?:ls|list|ps)|compose ps|top)\b/.test(sub) ? ['container'] : [];
  }
  if (head === 'systemctl') return !nonFlags.length || /^list-/.test(nonFlags[0]) || w.includes('--failed') ? ['service'] : [];
  if (head === 'service') return w.includes('--status-all') ? ['service'] : [];
  if (head === 'get-service' || head === 'gsv') return psArgs(w.slice(1)).pos.length || /-(?:name|displayname)\b/i.test(w.join(' ')) ? [] : ['service'];
  if (head === 'git') {
    const sub = nonFlags[0];
    if (sub === 'branch') return nonFlags.length === 1 && !w.some((a) => /^-(?:d|D|m|M|c|C|-delete|-move|-copy)$/.test(a)) ? ['branch'] : [];
    if (['grep', 'ls-files', 'status', 'clean'].includes(sub)) return ['file', 'dir'];
  }
  return [];
}
const LIST_INTENT = { docker_ps: ['container'], docker_ps_all: ['container'], docker_stats: ['container'], list_services: ['service'],
  failed_services: ['service'], git_branches: ['branch'], git_status: ['file', 'dir'] };
const LIST_FAMILY = { ls: ['file', 'dir'], find: ['file', 'dir'], grep: ['file', 'dir'], du: ['file', 'dir'], ps: ['pid', 'proc'], ss: ['port', 'pid', 'proc'] };
/** Entity types a catalog intent prints many values of (for previous `tellsh <query>` lines). */
const listedByIntent = (intent) => (intent ? LIST_INTENT[intent] || LIST_FAMILY[FAMILY_OF[intent]] || [] : []);

// pipeline stages that filter the entries of a listing piped into them
const FILTER_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag', 'findstr', 'select-string', 'sls', 'where-object', 'where', '?']);
const GREP_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag']);

// find/grep catalog intents: their path slot is where the search ran, not what it found
const isSearchRoot = (intent, slots, ents) => ents.dir != null && ['find', 'grep'].includes(FAMILY_OF[intent]) && String(ents.dir) === String(slots.path);

// the one operand of a command, or (several files: `touch a.txt b.txt`, `rm a b`) an ambiguous value: "delete them"
// or "delete it" may mean any or all of them, never just the last one
const oneOf = (ops) => (ops.length > 1 ? AMB + ops.map(rawOf).join(' ') : ops[0]);

/** Entities of one simple command `w` (sudo/VAR= removed) into `e`. */
function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
  if (isAmbiguous(w[0])) {
    if (w.slice(1).some((a) => PATHLIKE.test(rawOf(a)))) { e.file = AMB + w.join(' '); e.dir = AMB + w.join(' '); }
    return;
  }
  const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '');
  const args = afterGlobals(head, w.slice(1));
  const nonFlags = args.filter((a) => !/^-/.test(a));
  if (CD_HEADS.has(head.toLowerCase())) return; // handled by the caller
  if ((k === 'pwsh' || PS_CMDLET.test(head)) && psNative(head.toLowerCase(), args, e, setIntent)) return;
  if (head === 'docker') {
    const sub = nonFlags[0];
    if (sub === 'run') {
      const i = args.indexOf('--name');
      if (i >= 0 && args[i + 1]) e.container ??= args[i + 1];
      const nm = args.find((a) => a.startsWith('--name='));
      if (nm) e.container ??= nm.slice(7);
    } else if (DOCKER_CT.has(sub)) {
      const rest = args.slice(args.indexOf(sub) + 1);
      for (let i = 0; i < rest.length; i++) {
        if (DOCKER_VAL_FLAGS.has(rest[i])) { i++; continue; }
        if (/^-/.test(rest[i])) continue;
        e.container ??= rest[i];
        break;
      }
      if (DOCKER_INTENT[sub] && e.container != null) setIntent(DOCKER_INTENT[sub], { container: e.container });
    }
  } else if (head === 'systemctl' || head === 'service') {
    const svc = head === 'systemctl' ? nonFlags[1] : nonFlags[0];
    const verb = head === 'systemctl' ? nonFlags[0] : nonFlags[1];
    if (svc) e.service ??= svc.replace(/\.service$/, '');
    if (SYSTEMCTL_INTENT[verb] && svc) setIntent(SYSTEMCTL_INTENT[verb], { service: e.service });
  } else if (head === 'journalctl') {
    const i = args.findIndex((a) => a === '-u' || a === '--unit');
    if (i >= 0 && args[i + 1]) { e.service ??= args[i + 1].replace(/\.service$/, ''); setIntent('journal_service', { service: e.service }); }
  } else if (head === 'kill') {
    const { pos } = parseArgs(args, VALUE_OPTS.kill);
    if (pos.length === 1 && /^\d+$/.test(pos[0])) { e.pid = pos[0]; setIntent('kill_by_pid', { pid: pos[0] }); }
    else if (pos.length) e.pid = AMB + pos.map(rawOf).join(' '); // several PIDs or a job spec: not one process
  } else if (['pkill', 'killall', 'pgrep', 'pidof'].includes(head)) {
    const { pos } = parseArgs(args, VALUE_OPTS[head]);
    if (pos.length === 1) e.proc = pos[0];
    else if (pos.length > 1) e.proc = AMB + pos.map(rawOf).join(' ');
    if (head === 'pgrep' && pos.length === 1) setIntent('find_process', { name: pos[0] });
  } else if ((head === 'ps' || head === 'top' || head === 'htop') && args.some((a) => /^-\w*p$/.test(a))) {
    const i = args.findIndex((a) => /^-\w*p$/.test(a));
    const pid = (args[i + 1] || '').split(',')[0];
    if (/^\d+$/.test(pid)) e.pid = pid;
  } else if ((head === 'grep' || head === 'egrep') && split.segments.some((s, j) => j < segIdx && firstWord(s) === 'ps')) {
    // ps aux | grep -v grep | grep node: the process is the pattern of a non-inverted grep
    const { pos, opts, flags } = parseArgs(args, VALUE_OPTS.grep);
    const inverted = flags.some((f) => /^-[a-zA-Z]*v/.test(f) || f === '--invert-match');
    const pat = opts['-e'] ?? opts['--regexp'] ?? pos[0];
    if (!inverted && pat != null) e.proc = pat;
  } else if (GREP_HEADS.has(head) && nonFlags[0]) {
    const { pos, opts, flags } = parseArgs(args, VALUE_OPTS[head] || VALUE_OPTS.grep);
    const pat = opts['-e'] ?? opts['--regexp'] ?? pos[0];
    const path = opts['-e'] != null || opts['--regexp'] != null ? pos[0] : pos[1];
    if (pat != null) setIntent(flags.some((a) => /^-\w*l/.test(a)) ? 'grep_files_containing' : 'grep_text', { pattern: rawOf(pat), ...(path != null ? { path } : {}) });
    if (path != null) {
      const t = typeByExt(path);
      e[t] = path;
      if (t === 'dir') e.searchDir = true; // searched directory: the matches are inside it
    }
  } else if (head === 'lsof' || head === 'ss' || head === 'netstat' || head === 'fuser') {
    const pm = args.map(rawOf).join(' ').match(/(?::|tcp:|udp:|sport = :)(\d{2,5})\b/);
    if (pm) { e.port = pm[1]; setIntent('process_on_port', { port: pm[1] }); }
  } else if (head === 'gh' && nonFlags[0] === 'pr' && GH_PR_SELECTS.has(nonFlags[1])) {
    // `gh pr view 45`, `gh pr checkout feature/x`, `gh pr merge <url>`: the pull request ("merge that pr"); none named is
    // the current branch's, another repository's (-R / --repo) or several operands: none can be read (an older
    // selector of the line is replaced: `gh pr view 45; gh pr view` is about the current branch's pull request)
    const { pos, opts } = parseArgs(args.slice(args.indexOf(nonFlags[1]) + 1), GH_PR_VALUE_OPTS);
    const repo = opts['-R'] ?? opts['--repo'];
    if (pos.length === 1 && repo == null && !isAmbiguous(pos[0])) e.pr = rawOf(pos[0]);
    else e.pr = AMB + (pos.length ? pos.map(rawOf).join(' ') : 'the current branch');
  } else if (head === 'gh' && nonFlags[0] === 'pr') {
    // `gh pr list`, `gh pr status`, `gh pr create`: several pull requests, or one with no number yet
    e.pr = AMB + w.map(rawOf).join(' ');
  } else if (head === 'git') {
    const sub = nonFlags[0];
    const rest = args.slice(args.indexOf(sub) + 1);
    if (sub === 'grep') {
      // git grep [-l] PATTERN [DIR]: a search, its directory argument is only where it looked
      const { pos, opts } = parseArgs(rest, VALUE_OPTS.grep);
      const path = opts['-e'] != null ? pos[0] : pos[1];
      if (path != null) { const t = typeByExt(path); e[t] = path; if (t === 'dir') e.searchDir = true; }
      return;
    }
    if (sub === 'checkout' || sub === 'switch') {
      const { pos, opts, after } = parseArgs(rest, VALUE_OPTS[sub]);
      const created = opts['-b'] ?? opts['-B'] ?? opts['-c'] ?? opts['-C'] ?? opts['--create'] ?? opts['--force-create'] ?? opts['--orphan'];
      if (after) {
        // git checkout [<tree-ish>] -- <file>...: restores files, it does not switch branches
        if (after.length) e.file = after.length === 1 ? after[0] : AMB + after.map(rawOf).join(' ');
        return;
      }
      const b = created ?? pos[0];
      if (b != null && b !== '.' && b !== '-' && !isAmbiguous(b) && !String(b).startsWith('-')) {
        e.branch = b;
        e.current = b;
        if (created != null) e.created = b;
      }
    } else if (['merge', 'rebase'].includes(sub) || (sub === 'branch' && nonFlags[1])) {
      const b = nonFlags[nonFlags.length - 1];
      if (b && b !== sub && b !== '.' && !isGlob(b) && !b.startsWith('-')) e.branch = b;
    } else if (sub === 'push' && nonFlags.length >= 2) e.branch = nonFlags[nonFlags.length - 1];
    else if (sub === 'clone' && nonFlags[1]) e.url = nonFlags[1];
    else if (['add', 'diff', 'blame', 'restore', 'rm', 'log'].includes(sub) && nonFlags[1] && nonFlags[1] !== '.') e.file = nonFlags[nonFlags.length - 1];
  } else if (['ssh', 'ping', 'dig', 'nslookup', 'traceroute', 'mtr', 'host', 'telnet', 'nc'].includes(head)) {
    const h = nonFlags.find((a) => /[\w-]+\.[\w.-]+|^[\w-]+@/.test(a)) || nonFlags[0];
    if (h) e.host = h;
  } else if (['curl', 'wget', 'http'].includes(head)) {
    const u = args.find((a) => /^https?:\/\//.test(a));
    if (u) {
      e.url = u;
      const base = u.replace(/[?#].*$/, '').split('/').pop();
      const saves = head === 'wget' || args.some((a) => /^-\w*O/.test(a));
      if (saves && /\.\w{1,5}$/.test(base)) e.file = base;
    }
  } else if (head === 'rm' || head === 'trash' || head === 'rmdir') {
    const p = oneOf(nonFlags);
    if (p) e[args.some((a) => /^-\w*r/i.test(a)) || head === 'rmdir' ? 'dir' : 'file'] = p;
  } else if (head === 'cp' || head === 'mv' || head === 'ln') {
    const { pos, opts } = parseArgs(args, VALUE_OPTS[head]);
    const tdir = opts['-t'] ?? opts['--target-directory'];
    if (tdir != null) destEnts(pos.length === 1 ? pos : [...pos, ''], String(tdir) + '/', e);
    else if (pos.length >= 2) destEnts(pos.slice(0, -1), pos[pos.length - 1], e);
  } else if (head === 'tar' || head === 'zip') {
    const a = nonFlags.find((x) => /\.(tar(\.\w+)?|tgz|zip)$/.test(x));
    if (a) e.file = a;
  } else if (FILE_HEADS.has(head)) {
    // operands: not a chmod mode, a chown owner, or a count (`head -n 5 a.txt`); a script and its arguments
    // (`python3 script.py data.csv`) are several operands: "delete it" may mean either
    let ops = nonFlags.filter((a) => !/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$|^\d+$/.test(a));
    if (['chown'].includes(head)) ops = ops.slice(1);
    const p = oneOf(ops);
    if (p) e[/\/$/.test(rawOf(p)) ? 'dir' : 'file'] = p;
  } else if (DIR_HEADS.has(head)) {
    // find ROOT -name ...: the search root; other heads: the one directory argument (`ls /a /b`: ambiguous)
    // (find's root is the operands before its first expression word: `find -name "*.o"` has none)
    const p = head === 'find' ? args.slice(0, (args.findIndex((a) => /^[-(!]/.test(a)) + 1 || args.length + 1) - 1)[0] : oneOf(nonFlags.filter((a) => !isGlob(a) && !/^\d+$/.test(a)));
    if (p) {
      e.dir = p;
      if (head === 'find') e.searchDir = true;
      // `du DIR` / `du -d 1 DIR | sort -rh` lists the entries of DIR (`du -sh DIR` is DIR itself)
      else if (['ls', 'tree', 'ncdu'].includes(head) || (head === 'du' && !args.some((a) => /^-[a-zA-Z]*s|^--summarize$/.test(a)))) e.listDir = true;
    }
    // `ls`, `ls *.pdf`: the working directory (a glob selects some of its entries)
    else if (['ls', 'tree'].includes(head)) e.listCwd = nonFlags.some(isGlob) ? 'search' : 'list';
  } else if (!INERT_HEADS.has(head.toLowerCase())) {
    // unknown command (or unknown cmdlet) naming a path: we cannot tell what it did with it, so an
    // older file/dir must not be picked up by "it"
    const p = nonFlags.find((a) => PATHLIKE.test(rawOf(a)) && !/^\w+:\/\//.test(rawOf(a)));
    if (p) e[typeByExt(p)] = AMB + rawOf(p);
  }
}

const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url', 'pr'];
// gh pr subcommands whose operand selects one pull request, and the options of those that take a value
const GH_PR_SELECTS = new Set(['view', 'checkout', 'co', 'merge', 'close', 'reopen', 'diff', 'checks', 'review', 'ready', 'edit', 'comment']);
const GH_PR_VALUE_OPTS = new Set(['-R', '--repo', '--json', '-q', '--jq', '-t', '--template', '--title', '-b', '--body', '-F',
  '--body-file', '--subject', '-A', '--author-email', '--match-head-commit', '-B', '--base', '--branch', '--add-assignee',
  '--remove-assignee', '-l', '--add-label', '--remove-label', '-m', '--milestone', '-p', '--add-project', '--remove-project',
  '--add-reviewer', '--remove-reviewer', '--color']);
// (`view -c` is --comments, `review -c` / `-a` are --comment / --approve, `comment -e` is --editor: switches, no value)

/**
 * Build the context object from history commands (oldest first). Only the single most recent command is a
 * reference target ("delete it", "same for /var", "there" always mean the previous command, never an older one);
 * the running `tellsh <query>` line itself, which some shells write before it runs, is dropped first.
 * kind: 'posix' | 'pwsh' (default: `cmds.kind` as set by loadHistory, else posix)
 * -> { n, line, ents: {type: value}, entOrder, refOrder, searchRoots, listedDirs, last: {intent, slots, ambiguous, skipped, scoped},
 *      pos, listing, cdDir, features }
 *    values that could not be read unambiguously are kept as AMB-prefixed strings (see isAmbiguous).
 *    Within the line (`cat old.txt; ls newdir`) later segments win: pos gives the segment of each value, and refOrder
 *    ranks types by it (entOrder, which feeds the classifiers' ctx_ features, ranks by type only). searchRoots: the dir
 *    is a find/grep root or a filtered/piped listing; listedDirs: a plain listing. last.skipped: a later segment of the
 *    line ran after the repeatable command. listing: the segment of the newest listing of each entity type ({ seg });
 *    cdDir: the dir is a `cd` target ({ value, followed }). changeGuard() uses these.
 */
export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
  const k = kind || cmds.kind || 'posix';
  const list = [...cmds];
  // zsh (share_history / inc_append_history), fish and PSReadLine write the running line to the
  // history file before it executes: the current `tellsh <query>` call is not the previous command. bash writes it
  // only afterwards, so there an identical last line is an earlier call (`cmds.shell` as set by loadHistory)
  if (query != null && list.length && cmds.shell !== 'bash') {
    const norm = (x) => String(x).trim().replace(/\s+/g, ' ');
    const q = tellshQuery(list[list.length - 1], k);
    // exact match only: an earlier `tellsh` line whose text merely contains the query is the previous command
    if (q != null && q !== false && norm(q) === norm(query)) list.pop();
  }
  const line = list.length ? list[list.length - 1] : null;
  const a = line != null ? analyzeCommand(line, classify, k) : { ents: {}, at: {}, listed: {}, slots: {} };
  const ents = {};
  for (const t of ENT_TYPES) if (a.ents[t] != null) ents[t] = a.ents[t];
  const pos = Object.fromEntries(Object.keys(ents).map((t) => [t, a.at?.[t] ?? 0]));
  const dir = ents.dir != null ? String(ents.dir) : null;
  const searchRoots = new Set(dir != null && a.searchDir ? [dir] : []);
  const listedDirs = new Set(dir != null && a.listDir ? [dir] : []);
  const listing = Object.fromEntries(Object.entries(a.listed || {}).map(([t, seg]) => [t, { seg }]));
  const last = a.intent ? { intent: a.intent, slots: a.slots, ambiguous: !!a.ambiguous, skipped: !!a.intentStale, scoped: !!a.scoped } : null;
  const current = a.ents.current && !isAmbiguous(a.ents.current) ? a.ents.current : null;
  const cdDir = a.cdDir && dir != null ? { value: dir, followed: !!a.cdFollowed } : null;
  const byType = (x, y) => ENT_TYPES.indexOf(x) - ENT_TYPES.indexOf(y);
  const entOrder = Object.keys(ents).sort(byType);
  const refOrder = Object.keys(ents).sort((x, y) => pos[y] - pos[x] || byType(x, y));
  const ctx = { n: line != null ? 1 : 0, line, ents, currentBranch: current, entOrder, refOrder, searchRoots, listedDirs, last,
    cwdFlags: cwdFlags(cwd), pos, listing, cdDir };
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
  // (a pull request is not a feature the model was trained with)
  const order = (ctx.entOrder || []).filter((k) => k !== 'pr');
  if (order[0]) f.push('ctx_last=' + order[0]);
  for (const k of order) f.push('ctx_has=' + k);
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

// the forms that can only mean "repeat the previous command" (not "what about X" / "a w X")
const EXPLICIT_SAME = [SAME_RES[0], SAME_RES[3], SAME_RES[4], SAME_RES[6]];

// all rule regexes run on the diacritic-folded, lowercased query (same length as the original)
const fold = (q) => foldKeepLength(String(q)).toLowerCase();
const PRONOUN_EN = /\b(it|its|that|this|them|those|these|the same one)\b/;
const PRONOUN_WORD = /^(it|its|that|this|them|those|these|one|again|there|here|tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym|to|force|forced|forcibly|sila|sile|silowo|recursive\w*|rekurencyjn\w*|please|prosze|too|also|tez|rowniez)$/;
// plural references: the entries of a listing, never the listed directory itself
const PLURAL = /(?:^|[^a-z])(them|those|these|je|te|tamte|ich|nimi)(?=$|[^a-z])/;
const PRONOUN_PL = /(?:^|\s)(tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym)(?=\s|$|[?!.,])|(?:^|\s)to(?=\s*[?!.]*$|\s+(?:co|ktor\w*|tam)\b)|(?:^\s*|(?:^|\s)(?:zmerguj|scal|pokaz|zobacz|otworz|zamknij|sprawdz|wyswietl|zatwierdz|zaakceptuj|przejrzyj)\S*\s+)to(?=\s+(?:prs?\b|pull[\s-]+requests?\b))/;

// locative references: the directory of an earlier command as the place to act in ("delete all log files there",
// "usuń pliki log tam", "in the same folder"). Not "is there" / "there are" (existential), not "here" (the cwd).
const LOCATIVE = new RegExp([
  String.raw`(?<!\b(?:is|are|was|were|if|whether|be|still)\s+)\bthere\b(?!\s+(?:is|are|was|were|be|exists?|isn|aren|wasn|weren)\b|'s\b)`,
  String.raw`\binside(?=\s*(?:(?:too|also|as well|please|now|recursively)\s*)*[?!.,]*$)`,
  String.raw`\b(?:the\s+)?same\s+(?:folder|directory|dir|place|location|path|spot|catalog)\b`,
  String.raw`(?:^|\s)(?:tam|stamtad|tamze|tamtedy)(?=\s|$|[?!.,])`,
  String.raw`(?:^|\s)(?:tym\s+samym|tamtym|tego\s+samego|tamtego)\s+(?:folder\w*|katalog\w*|miejsc\w*)`,
  // "in the previous folder", "the last directory", "the directory I listed", "w poprzednim katalogu"
  String.raw`\b(?:previous|last|prior|earlier|preceding)\s+(?:folder|directory|dir|place|location|path|catalog)\b`,
  String.raw`\b(?:folder|directory|dir|place|location|path)\s+(?:that\s+|which\s+)?(?:i|we|you)\s+(?:just\s+)?(?:listed|used|searched|opened|visited|(?:was|were)\s+(?:just\s+)?in|went\s+(?:in)?to|cd'?e?d\s+(?:in)?to|changed\s+(?:in)?to|looked\s+(?:at|in|into))\b`,
  String.raw`(?:^|\s)(?:poprzedni\w*|ostatni\w*|wczesniejsz\w*)\s+(?:folder\w*|katalog\w*|miejsc\w*)`,
].join('|'));
export const hasLocative = (q) => LOCATIVE.test(fold(q));
// a request about the entries of a referenced directory, not the directory ("delete everything in it", "all files in it")
// ("delete its contents", "what is in it", "usuń jego zawartość", "to co jest w nim")
const CONTENTS = new RegExp([
  String.raw`\b(?:everything|all|anything|contents?|files?|wszystk\w*|wszystko|zawarto\w*|plik\w*)\b.*(?:^|\s)(?:in|inside|within|from|of|w|we|z|ze|wewnatrz)\s+(?:it|that|this|them|there|nim|niej|niego|tym|tamtym|tego|nich)(?=\s|$|[?!.,])`,
  String.raw`\b(?:contents?|entries)\b|\bzawarto\w*`,
  String.raw`\b(?:its|their)\s+(?:files?|items?|subfolders?|subdirectories)\b`,
  String.raw`\bwhat(?:'s|\s+is|\s+was|\s+are)?\s+(?:in|inside|within)\s+(?:it|that|this|there|them)\b`,
  String.raw`(?:^|\s)(?:jego|jej|ich)\s+(?:plik\w*|wszystk\w*|elementy|podkatalog\w*)`,
  String.raw`(?:^|\s)co\s+(?:jest\s+|sa\s+)?(?:w|we|wewnatrz)\s+(?:nim|niej|tym|srodku)(?=\s|$|[?!.,])`,
].join('|'));

const NOUN_TYPE = [
  [/\b(containers?|kontener\w*)\b/i, ['container']],
  [/\b(services?|unit|uslug\w*|serwis\w*|daemon|demon\w*)\b/i, ['service']],
  [/\b(process(es)?|proces\w*|program\w*|app)\b/i, ['pid', 'proc']],
  [/\b(pid)\b/i, ['pid']],
  [/\b(ports?|port\w*)\b/i, ['port']],
  [/\b(branch\w*|galaz\w*|galez\w*)\b/i, ['branch']], // folded gałąź/gałęzi/gałęzie (not "gallery")
  [/\b(dir(ectory)?|folder\w*|katalog\w*)\b/i, ['dir']],
  [/\b(files?|plik\w*)\b/i, ['file']],
  [/\b(hosts?|server\w*|serwer\w*|machine|maszyn\w*)\b/i, ['host']],
  [/\b(url|link\w*|adres\w*)\b/i, ['url']],
  [/\b(prs?|pull[\s-]+requests?)\b/i, ['pr']],
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
  host: ['host', 'target'], url: ['url'], file: ['file', 'src', 'path'], dir: ['path', 'src'], pr: ['pr'],
};

// "files that are larger", "processes which use", "modified this week": not references to an earlier command
const NOT_REF = /\b(?:that|which|this)\s+(?:are|is|was|were|have|has|had|(?:contain|match|end|start|begin|use|take|listen|run|belong|need)(?:s|es|ed|d|ing)?|running|using|taking|ran|took|do|does|did|can|could|will|would|should|i|you|we|they)\b|\b(?:this|that|last|next)\s+(?:week|month|year|day|morning|evening|afternoon|night|time|hour|minute)s?\b/g;
const refText = (q) => fold(q).replace(NOT_REF, (m) => ' '.repeat(m.length));
export const hasPronoun = (q) => PRONOUN_EN.test(refText(q)) || PRONOUN_PL.test(refText(q));

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
  // pronouns and filler words are not values ("what about this", "and with force")
  if (isStopWord(word) || PRONOUN_WORD.test(fold(word)) || /^-/.test(word)) return null;
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
    // "what about this": no new argument at all, nothing to retarget
    if (!rt && !arg.trim().split(/\s+/).some((w) => !PRONOUN_WORD.test(fold(w)) && !isStopWord(fold(w)))) {
      return { rule: 'refused', intent: null, stop: true, note: `"${arg}" does not name a new target for the previous ${ctx.last.intent}; not guessing` };
    }
    // any newer line ran after it: replaying the older changing command for a new target is a guess
    if (rt && ctx.last.skipped && BY_ID[ctx.last.intent].risk !== 'safe') {
      return { rule: 'refused', intent: null, stop: true, note: `the newest command that tellsh can repeat (${ctx.last.intent}) is not the previous command; not guessing` };
    }
    // "same for api" after `docker --context prod logs web`: here it would run against another daemon / repository
    if (rt && ctx.last.scoped) {
      return { rule: 'refused', intent: null, stop: true, note: `the previous command (${ctx.last.intent}) ran against another repository, directory or daemon (-C, --context, -H, ...); not guessing` };
    }
    // "same for /srv/x" after `git status`: the previous command has no slot for it; not a new request either
    if (!rt && EXPLICIT_SAME.some((re) => re.test(fold(query)))) {
      return { rule: 'refused', intent: null, stop: true, note: `the previous command (${ctx.last.intent}) has nothing that "${arg}" could replace; not guessing` };
    }
    if (rt) {
      const slots = { ...ctx.last.slots, [rt.slot]: rt.value };
      const amb = Object.entries(slots).find(([, v]) => isAmbiguous(v));
      if (amb) return { rule: 'refused', intent: ctx.last.intent, blank: [amb[0]], note: `previous ${ctx.last.intent} has ${amb[0]}=${rawOf(amb[1])}, which depends on the shell state; not guessing` };
      if (rt.slot === 'ext') delete slots.glob;
      if (rt.slot === 'name') delete slots.namepat;
      return { rule: 'same-for', intent: ctx.last.intent, slots, changed: rt.slot, note: `same as previous ${ctx.last.intent} with ${rt.slot}=${rt.value}` };
    }
  }
  // "same for X", "same but …" when the previous command is not one tellsh can repeat (`ls newdir`, `clear`)
  if (!ctx.last && (EXPLICIT_SAME.some((re) => re.test(fold(query))) || SAME_BUT.some((re) => re.test(fold(query))))) {
    return { rule: 'refused', intent: null, stop: true, note: 'the previous command is not one tellsh can repeat; not guessing' };
  }
  if (!hasPronoun(query) && hasLocative(query)) return locativeRef(fold(query), ctx);
  if (!hasPronoun(query)) return null;
  // which entity does the pronoun point at? noun hint first ("that container"), else the newest in the line
  const fq = fold(query);
  const order = ctx.refOrder || ctx.entOrder;
  let types = null;
  const named = [];
  // several types for one noun ("that process": pid or name): the one from the later segment wins
  for (const [re, ts] of NOUN_TYPE) if (re.test(fq)) { named.push(...ts); types = ts.filter((t) => ctx.ents[t] != null).sort((a, b) => order.indexOf(a) - order.indexOf(b)); if (types.length) break; }
  // "delete that branch" after a command without a branch: refuse instead of using another type's value
  if (named.length && !types?.length) {
    return { rule: 'refused', intent: null, ent: named[0], blank: [...new Set(named.flatMap((t) => SLOT_FROM_ENT[t] || []))], note: `the previous command names no ${named[0]}; not guessing` };
  }
  // "delete it" after `ls`, `clear`, `make`: nothing in the previous command it could mean (blanket: every slot type is
  // withheld, an optional one is simply left out: "push it" after `git commit` is `git push`)
  if (!ctx.entOrder.length) {
    const listed = Object.keys(ctx.listing || {});
    return { rule: 'refused', intent: null, blanket: true, blank: [...new Set(Object.values(SLOT_FROM_ENT).flat())],
      note: listed.length ? `the previous command listed ${listed.join('/')} values; the reference may mean any of them; not guessing`
        : 'the previous command names nothing the reference could mean; not guessing' };
  }
  const ent = (types && types.length ? types : order)[0];
  if (!ent) return null;
  let intent = null;
  let verb = null;
  for (const [name, re, table] of VERBS) {
    if (re.test(fq)) {
      const pick = table[ent] || (!types && order.map((e) => table[e]).find(Boolean));
      if (pick) { intent = pick; verb = name; break; }
    }
  }
  const finalEnt = intent ? (Object.entries(SLOT_FROM_ENT).find(([e]) => ctx.ents[e] != null && intentUses(intent, e)) ? pickEnt(intent, ent, ctx) : ent) : ent;
  const value = chooseValue(finalEnt, ctx);
  if (value == null || isAmbiguous(value)) {
    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: `the latest ${finalEnt} in history (${rawOf(value ?? '?')}) cannot be read unambiguously; not guessing` };
  }
  // a value that is fine to show but not to change (search root, listed directory, older value, ...)
  const guardNote = changeGuard(finalEnt, value, fq, ctx);
  // "delete that branch" after `git checkout main`: the checked-out branch is never the one to delete
  if (intent === 'git_delete_branch' && ctx.currentBranch != null && String(ctx.currentBranch) === String(value)) {
    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: `${rawOf(value)} is the checked-out branch (the previous command switched to it); not guessing` };
  }
  if (guardNote && intent && BY_ID[intent].risk !== 'safe') {
    // "delete all log files in this folder": the request is about entries inside the directory, so the verb's
    // directory intent (`rm -r`) is not what was asked; the classifier's intent stays (`find <PATH> … -delete`)
    const contents = finalEnt === 'dir' && CONTENTS.test(fq);
    return { rule: 'refused', intent: contents ? null : intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: guardNote, ...(contents ? { contents: true } : {}) };
  }
  if (intent === 'kill_by_name' && FORCE.test(fq)) intent = 'kill_force';
  if (intent === 'extract_targz' && /\.zip$/i.test(value)) intent = 'extract_zip';
  const fill = {};
  for (const s of SLOT_FROM_ENT[finalEnt] || []) fill[s] = value;
  // guarded: the caller must not use the value for a non-safe intent it picks itself
  return { rule: 'pronoun', intent, fill, ent: finalEnt, ...(guardNote ? { guarded: true, guardNote } : {}), note: `"${finalEnt}" from history = ${value}` };
}

/**
 * "there", "tam", "in the same folder": the newest directory of the history, as the place a command runs in
 * (`find {path} …`, `ls {path}`). It never names the object of a command (`rm -r`, `mv`): `locative` tells the caller.
 * Refused when there is no directory, it cannot be read, or a newer file is the newest location-like value.
 */
function locativeRef(fq, ctx) {
  const v = ctx.ents.dir;
  const base = { intent: null, ent: 'dir', blank: ['path', 'dest'], locative: true };
  if (v == null) return { rule: 'refused', ...base, note: 'the request refers to a place ("there"), but the previous command names no directory; not guessing' };
  if (isAmbiguous(v)) return { rule: 'refused', ...base, note: `the directory of the previous command (${rawOf(v)}) cannot be read unambiguously; not guessing` };
  // `cd /tmp/x; cat a.txt`: a file came after the directory in the previous command
  const fileNewer = ctx.ents.file != null && (ctx.pos.file ?? 0) >= (ctx.pos.dir ?? 0);
  if (fileNewer) return { rule: 'refused', ...base, note: `the previous command also names a file (${rawOf(ctx.ents.file)}), so "there" is unclear; not guessing` };
  const guardNote = changeGuard('dir', v, fq, ctx);
  return { rule: 'pronoun', ...base, fill: { path: String(v) }, ...(guardNote ? { guarded: true, guardNote } : {}), note: `"dir" from history = ${v}` };
}

/**
 * Why `value` (of entity type `type`, from the previous command) must not be the target of a changing command
 * (rm, mv, cp, kill, chmod, git branch -d, ...), or null:
 *   - the request is about the entries inside a directory ("delete everything in it", "its contents");
 *   - a find/grep search root or a listed directory (`ls /tmp/build`): the user saw entries inside it;
 *   - a later segment of the command listed values of the type (`cat a.txt; ls`, `pgrep foo | xargs ps`, `docker ps`);
 *   - the directory of a `cd` after which other commands ran (`cd /tmp/build; make`, `cd /tmp/build && rg TODO`);
 */
export function changeGuard(type, value, fq, ctx) {
  const v = String(value);
  if (type === 'dir' && CONTENTS.test(fq)) return `the request is about the entries inside ${v}, not ${v} itself; not guessing`;
  if (type === 'dir' && ctx.searchRoots?.has(v)) return `the directory of the previous command (${v}) is where a search ran, not what it found; not guessing`;
  if (type === 'dir' && ctx.listedDirs?.has(v)) {
    const pl = PLURAL.exec(fq);
    return pl ? `"${pl[1]}" are the entries listed in ${v}, not the directory; not guessing`
      : `${v} was listed: the reference may mean the directory or one of its entries; not guessing`;
  }
  const L = ctx.listing?.[type];
  if (L && L.seg > (ctx.pos?.[type] ?? 0)) {
    return `the previous command listed ${type === 'dir' || type === 'file' ? 'files' : `${type} values`}, so the reference may mean one of them, not ${v}; not guessing`;
  }
  if (type === 'dir' && ctx.cdDir?.value === v && ctx.cdDir.followed) return `${v} is the working directory of a cd after which other commands ran; not guessing`;
  // `cat a.txt; cd /srv`: the line also named a file before the cd, so "it" may mean the file as well as the directory
  if (type === 'dir' && ctx.cdDir?.value === v && ctx.ents.file != null) return `the previous command named a file (${rawOf(ctx.ents.file)}) and then changed to ${v}; the reference is unclear; not guessing`;
  // "delete that backups folder" after `mkdir /srv/current`: the request names something else
  const hints = [...fq.matchAll(HINTED_NOUN)].map((m) => m[1]).filter(isHintWord);
  if (hints.length && !hints.some((w) => foldKeepLength(v).toLowerCase().includes(w))) return `the request names "${hints.join(' ')}", which is not part of ${v}; not guessing`;
  return null;
}

/** The value of an entity type in the previous command (ambiguous values are returned as they are, and refused). */
const chooseValue = (type, ctx) => ctx.ents[type];

// a word naming which one between a reference and its noun ("that backups folder", "ten folder backups" is not read)
const HINTED_NOUN = /\b(?:that|this|those|these|the|ten|ta|te|tamten|tamta|tamte)\s+([a-z0-9][\w.-]*)\s+(?:folders?|director(?:y|ies)|dirs?|files?|branch(?:es)?|containers?|services?|process(?:es)?|katalog\w*|folder\w*|plik\w*|kontener\w*|uslug\w*|galaz\w*|galez\w*)\b/g;
// words of a request that may identify a target ("that backups folder"), not the action, pronoun or filler words
const NOT_HINT = /^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back|list\w*|wylistuj\w*|check|sprawdz\w*|wipe|nuke|purge|destroy|clear|clean\w*|wyczysc\w*|drop|what|which|where|about|with|from|into|then|also|again|teraz|jeszcze|whatever|everything|anything|something|thing|stuff|still|there|here|tutaj|tamto|wszystko|cokolwiek|whole|entire|completely|cale|calym|listening|running|working|executable|wykonywaln\w*|contents?|zawartosc\w*|entries|inside|wewnatrz|siedzi|srodku|please|prosze|again|ponownie|znowu|forcefully|recursively|rekurencyjnie|permanently|trwale|names?|nazw\w*|only|tylko|same|samo|thing|merged|zmergowan\w*|scalon\w*|current|biezac\w*|aktualn\w*|obecn\w*|previous|poprzedni\w*|ostatni\w*|last|other|inn\w*|empty|pust\w*|temporary|tymczasow\w*|local|lokaln\w*|remote|zdaln\w*|stopped|zatrzyman\w*|created|utworzon\w*|newly|nowo|nowy|nowa|nowe|nowym|whole|cal\w*|samym|given|mentioned|wspomnian\w*|above|powyzsz\w*|broken|zepsut\w*|failed|failing|nieudan\w*|old\w*|star\w*)$/;
const isHintWord = (w) => w.length >= 4 && !/^\d+$/.test(w) && !NOT_HINT.test(w) && !isStopWord(w) && !PRONOUN_WORD.test(w) && !FORCE.test(w)
  && !VERBS.some(([, re]) => re.test(w)) && !NOUN_TYPE.some(([re]) => re.test(w));

/** Implicit references ("ile ma słów", "md5 of the same file"): fill a missing slot from history. */
export function entityForSlot(slot, ctx) {
  // the most recent value of the type is used, or nothing: an ambiguous latest value never falls back
  // to an older one ({ ambiguous: true } tells the caller not to look anywhere else either)
  for (const [ent, slots] of Object.entries(SLOT_FROM_ENT)) {
    if (slots[0] === slot && ctx.ents[ent] != null) return isAmbiguous(ctx.ents[ent]) ? { ent, ambiguous: true } : { ent, value: String(ctx.ents[ent]) };
  }
  if (slot === 'file' && ctx.ents.dir == null && ctx.ents.file != null) return isAmbiguous(ctx.ents.file) ? { ent: 'file', ambiguous: true } : { ent: 'file', value: String(ctx.ents.file) };
  // a type that maps onto this slot exists but is ambiguous (e.g. src <- file/dir)
  if (Object.entries(SLOT_FROM_ENT).some(([ent, slots]) => slots.includes(slot) && isAmbiguous(ctx.ents[ent]))) return { ambiguous: true };
  return null;
}

const SAME_BUT = [/^\s*(?:and\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?,?\s+but\s+(.+)$/, /^\s*(?:a\s+|i\s+)?(?:to\s+)?samo,?\s+ale\s+(.+)$/,
  /^\s*(?:a\s+|i\s+)?tak samo,?\s+ale\s+(.+)$/];
/** "same but only file names" / "to samo ale tylko nazwy plików": modifier for the previous command. */
export function sameBut(query, ctx) {
  if (!ctx?.last) return null;
  const fq = fold(query);
  const lastSlots = Object.fromEntries(Object.entries(ctx.last.slots || {}).filter(([, v]) => !isAmbiguous(v)));
  // slots of the previous command that depend on the shell state ("$DIR"): withheld, never the catalog default
  const blank = Object.keys(ctx.last.slots || {}).filter((k) => isAmbiguous(ctx.last.slots[k]));
  for (const re of SAME_BUT) if (re.test(fq)) return { lastIntent: ctx.last.intent, lastSlots, blank, skipped: !!ctx.last.skipped, scoped: !!ctx.last.scoped };
  return null;
}

function intentUses(intent, ent) {
  const it = BY_ID[intent];
  return (SLOT_FROM_ENT[ent] || []).some((k) => k in it.slots);
}
function pickEnt(intent, ent, ctx) {
  if (intentUses(intent, ent)) return ent;
  return (ctx.refOrder || ctx.entOrder).find((e) => intentUses(intent, e)) || ent;
}
