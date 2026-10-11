#!/usr/bin/env node
// Template matrix: every catalog intent x every (shell, os, variant) tellsh renders for.
//
//   node scripts/matrix.js gen <platform> [out.json]   render + static checks (needs the repo; run on any machine)
//   node scripts/matrix.js run <cases.json> [out.json] syntax check, binary lookup and sandboxed execution ON the target
//                                                       (standalone: node builtins only, does not import src/)
//   node scripts/matrix.js report <results.json>...     write MATRIX.md
//
// Platforms: linux (bash/sh/zsh, GNU; run it in a throwaway container), busybox (Alpine sh), darwin (zsh+bash BSD,
// zsh GNU = Homebrew coreutils), win32 (Windows PowerShell 5.1, cmd).
//
// Safety of `run`: every command runs with cwd = a fresh fixture copy inside a mktemp dir, HOME = <fixture>/home, a
// timeout, stdin closed. Intents that need network, sudo, services, docker, package managers, kill, interactive input
// or that touch the system are never executed (static-only). Risk high/critical runs only when the cases file was
// generated with --container (a throwaway container). The temp dir is removed at the end.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

// ------------------------------------------------------------------------------------------- policy
const NETWORK = 'needs network';
const STATIC_ONLY = {
  public_ip: NETWORK, ping_host: NETWORK, dns_lookup: NETWORK, traceroute: NETWORK, port_check: NETWORK,
  curl_headers: NETWORK, http_status: NETWORK, download_file: NETWORK, ssh_connect: NETWORK, ssh_port_forward: NETWORK,
  git_pull: NETWORK, git_push: NETWORK, git_clone: NETWORK,
  npm_install: 'package install', npm_install_global: 'package install', pip_install: 'package install',
  install_package: 'package install (sudo)', system_update: 'package install (sudo)',
  chown: 'sudo / user change', dmesg: 'sudo',
  service_restart: 'service (sudo)', service_stop: 'service (sudo)', service_start: 'service (sudo)', service_enable: 'service (sudo)',
  service_status: 'services', list_services: 'services', failed_services: 'services', journal_service: 'services', journal_errors: 'services',
  kill_by_name: 'kill', kill_force: 'kill', kill_by_pid: 'kill', kill_by_port: 'kill',
  tail_follow: 'runs forever (follow)', cron_edit: 'interactive editor', docker_exec: 'docker', docker_logs: 'docker',
  npm_run_script: 'runs project code',
};
for (const id of ['docker_ps', 'docker_ps_all', 'docker_images', 'docker_stop', 'docker_stop_all', 'docker_prune', 'docker_stats',
  'docker_compose_up', 'docker_compose_down']) STATIC_ONLY[id] = 'docker';
const isRemoteTool = (id) => /^(gh|wrangler)_/.test(id);
// per-cell reasons not to execute (shell- or OS-specific)
const cellStatic = (id, env, command) => {
  if (/\s-Confirm\b/.test(command)) return 'asks for confirmation every time (interactive)';
  if (env.os === 'win32' && id === 'last_logins') return 'Security event log needs an elevated prompt';
  if (env.os === 'win32' && env.shell === 'powershell' && id === 'history_search') return 'PSReadLine finds its history via the Windows known folder, not the fixture HOME: would read the real history';
  if (env.os === 'win32' && id === 'package_installed') return 'winget list refreshes its sources over the network';
  if (env.os === 'win32' && id === 'temperature') return 'MSAcpi_ThermalZoneTemperature needs an elevated prompt';
  if (env.os === 'win32' && env.shell === 'powershell' && id === 'create_symlink') return 'Windows PowerShell 5.1 New-Item SymbolicLink needs an elevated prompt (known limit)';
  return null;
};
// programs that are not part of a base OS install (a template that needs them cannot work without them; their absence
// on a test machine makes the cell static-only, not a failure)
const OPTIONAL_TOOLS = new Set(['docker', 'gh', 'npm', 'npx', 'node', 'brew', 'python3', 'pip', 'pip3', 'git', 'sudo', 'systemctl', 'journalctl',
  'timedatectl', 'crontab', 'upower', 'sensors', 'lspci', 'lsusb', 'ping', 'dig', 'traceroute', 'nc', 'file', 'dpkg', 'curl', 'ssh', 'wrangler',
  'curl.exe', 'ssh.exe']);

// intents whose success prints nothing (writes inside the fixture, or a lookup that may legitimately be empty)
const NO_OUTPUT = new Set(['routes', 'mkdir', 'touch_file', 'chmod', 'make_executable', 'copy', 'move_rename', 'delete_file', 'delete_dir',
  'delete_by_ext', 'create_symlink', 'replace_text', 'git_add_all', 'git_new_branch', 'git_switch_branch', 'git_delete_branch',
  'git_undo_commit', 'git_discard_changes', 'git_stash', 'git_stash_pop', 'git_diff', 'git_diff_staged', 'git_remote', 'cron_list',
  'users_logged_in', 'last_logins', 'activate_venv', 'compress_zip', 'compress_targz', 'extract_zip', 'extract_targz',
  'battery', 'temperature', 'gpu_info', 'usb_devices', 'listening_ports', 'established_connections', 'process_on_port',
  'find_process', 'package_installed', 'timezone', 'git_init', 'git_commit', 'disk_mounts', 'block_devices']);
// exit codes that are not a failure: grep/diff "no match"/"differ", crontab without a table, cal/who quirks
const OK_CODES = { diff_files: [0, 1], cron_list: [0, 1], find_process: [0, 1], package_installed: [0, 1], process_on_port: [0, 1],
  history_search: [0, 1], established_connections: [0, 1], users_logged_in: [0, 1], battery: [0, 1], temperature: [0, 1], gpu_info: [0, 1], usb_devices: [0, 1], last_logins: [0, 1] };
// a run in a git repo (fixture/repo)
const IN_REPO = (id) => /^git_/.test(id) && id !== 'git_init';

// realistic slot values; every path points into the fixture (cwd)
const SAMPLE = {
  path: 'my docs', file: 'my docs/notes.txt', src: 'my docs/notes.txt', dst: 'copy of notes.txt', dest: 'out',
  archive: 'backup.tar.gz', count: 5, depth: 2, days: 30, size: '1k', age: '-mtime -1', ext: 'txt', name: 'notes',
  pattern: 'hello', mode: '644', old: 'hello', new: 'bye', text: 'hello world', var: 'HOME', cmd: 'git', branch: 'feature-x',
  start: 1, end: 3, user: 'nobody', service: 'ssh', container: 'web', pkg: 'git', host: 'example.com', url: 'https://example.com',
  port: 8080, pid: 4242, target: 'me@example.com', message: 'test commit', script: 'build',
};
const PER_INTENT = {
  extract_targz: { file: 'arch/sample.tar.gz', dest: 'out' }, extract_zip: { file: 'arch/sample.zip', dest: 'out' },
  list_archive: { file: 'arch/sample.tar.gz' }, compress_zip: { archive: 'backup.zip' },
  find_larger_than: { size: '10k' }, find_smaller_than: { size: '1k' }, sort_uniq: { file: 'my docs/log lines.txt' },
  base64_decode: { file: 'my docs/encoded.b64' }, git_blame: { file: 'README.md' }, git_diff: { file: 'src.txt' },
  git_discard_changes: { file: 'src.txt' }, git_switch_branch: { branch: 'dev' }, git_delete_branch: { branch: 'dev' },
  delete_dir: { path: 'my docs/empty dir' }, activate_venv: { path: '.venv' }, find_by_name: { name: 'notes' },
  diff_files: { src: 'my docs/notes.txt', dst: 'my docs/notes copy.txt' }, create_symlink: { src: 'my docs/notes.txt', dst: 'link to notes' },
};

const ENVS = {
  linux: [{ shell: 'bash', os: 'linux', coreutils: 'gnu' }, { shell: 'sh', os: 'linux', coreutils: 'gnu' }, { shell: 'zsh', os: 'linux', coreutils: 'gnu' }],
  busybox: [{ shell: 'sh', os: 'linux', coreutils: 'busybox' }],
  darwin: [{ shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'bash', os: 'darwin', coreutils: 'bsd' }, { shell: 'zsh', os: 'darwin', coreutils: 'gnu' }],
  win32: [{ shell: 'powershell', os: 'win32', coreutils: 'gnu' }, { shell: 'cmd', os: 'win32', coreutils: 'gnu' }],
};
const envLabel = (e) => `${e.shell}/${e.os}${e.os === 'darwin' || e.coreutils === 'busybox' ? '/' + e.coreutils : ''}`;

// ------------------------------------------------------------------------------------------- gen
const POSIX_SKIP = new Set(['then', 'do', 'else', 'elif', '!', 'time', '{', '}', '(', ')', 'if', 'fi', 'done', 'while', 'for', 'in']);
function posixHeads(command, simpleCommands) {
  const heads = new Set();
  for (const w of simpleCommands(command)) {
    const words = w.filter((x) => !/^\d*[<>]/.test(x));
    let i = 0;
    while (i < words.length && (/^[A-Za-z_]\w*=/.test(words[i]) || POSIX_SKIP.has(words[i]))) i++;
    const h = words[i];
    if (h && /^[A-Za-z0-9_.\/-]+$/.test(h) && !/^-/.test(h) && !/^\d+$/.test(h)) heads.add(h);
    // programs run by find -exec / xargs
    for (let j = i; j < words.length - 1; j++) if (/^-(exec|execdir|ok)$/.test(words[j]) || words[j] === 'xargs') {
      let k = j + 1; while (k < words.length && /^-/.test(words[k])) k++;
      if (words[k] && /^[A-Za-z][\w.-]*$/.test(words[k])) heads.add(words[k]);
    }
  }
  return [...heads];
}
const PS_KW = new Set(['if', 'elseif', 'else', 'foreach', 'for', 'while', 'do', 'switch', 'return', 'try', 'catch', 'finally', 'param', 'in', 'exit']);
function pwshHeads(command) {
  const heads = new Set();
  const masked = command.replace(/'(?:[^']|'')*'/g, "''").replace(/"(?:[^"`]|`.)*"/g, '""');
  for (const seg of masked.split(/[|;{}()]|&&|\|\|/)) {
    if (/^\s*\w+\s*=/.test(seg)) continue; // hashtable key (@{ Name = … })
    const h = seg.trim().replace(/^&\s*/, '').split(/\s+/)[0];
    if (h && /^[A-Za-z][\w.-]*$/.test(h) && !PS_KW.has(h.toLowerCase())) heads.add(h);
  }
  return [...heads];
}
const CMD_BUILTINS = new Set(['dir', 'echo', 'type', 'cd', 'set', 'del', 'erase', 'rd', 'rmdir', 'md', 'mkdir', 'copy', 'move', 'ren', 'rename',
  'for', 'if', 'ver', 'vol', 'path', 'cls', 'pushd', 'popd', 'mklink', 'date', 'time', 'call', 'start', 'title', 'assoc', 'break', 'exit']);
function cmdHeads(command) {
  const heads = new Set();
  const masked = command.replace(/"[^"]*"/g, '""');
  for (const seg of masked.split(/\|\||&&|[|&]|\bdo\b/)) {
    const words = seg.trim().replace(/^@/, '').replace(/^\(+/, '').split(/\s+/);
    let h = words[0];
    if (/^(for|if)$/i.test(h)) continue;
    if (h && /^[A-Za-z][\w.-]*$/.test(h)) heads.add(h.toLowerCase());
  }
  return [...heads];
}

async function gen(platform, out, { container }) {
  const { INTENTS } = await import('../src/catalog.js');
  const { buildCommand, finalizeSlots } = await import('../src/fill.js');
  const { simpleCommands } = await import('../src/danger.js');
  const envs = ENVS[platform];
  if (!envs) throw new Error(`unknown platform ${platform}`);
  const cases = [];
  for (const intent of INTENTS) {
    for (const env of envs) {
      const values = { ...SAMPLE, ...(PER_INTENT[intent.id] || {}) };
      // only slots the intent knows (plus the catalog's optional ones) are passed, like the real slot filler would
      const known = new Set([...Object.keys(intent.slots)]);
      const tplText = typeof intent.template === 'string' ? intent.template : '';
      for (const m of tplText.matchAll(/\{(\w+)(!raw)?\}/g)) known.add(m[1]);
      for (const k of ['glob', 'namepat', 'sedexpr']) if (known.has(k)) known.add({ glob: 'ext', namepat: 'name', sedexpr: 'old' }[k]);
      if (known.has('sedexpr')) known.add('new');
      if (['find_recent', 'find_by_ext'].includes(intent.id)) known.delete('age');
      if (['base64_encode', 'base64_decode', 'list_archive'].includes(intent.id)) known.add('file');
      const resolved = {};
      for (const k of known) if (values[k] != null) resolved[k] = values[k];
      let r;
      finalizeSlots(intent, resolved);
      try { r = buildCommand(intent.id, '', { env, resolved }); } catch (err) { r = { command: null, gap: `render threw: ${err.message}`, risk: intent.risk, warnings: [], missing: [] }; }
      const c = { id: intent.id, env, label: envLabel(env), catalogRisk: intent.risk, risk: r.risk, command: r.command, variant: r.variant || null,
        gap: r.gap || null, warnings: r.warnings || [], missing: r.missing || [], staticIssues: [], heads: [], exec: null };
      if (r.command) {
        if (c.missing.length) c.staticIssues.push(`placeholder left for ${c.missing.join(', ')} although a value was given`);
        const unknown = c.warnings.filter((w) => /^unknown (command|option|subcommand)/.test(w));
        if (unknown.length) c.staticIssues.push(...unknown);
        // a template that runs through sudo is high by the trust rule (wrapper -> confirm), on purpose
        c.expectedRisk = /(?:^|[|;&]\s*)sudo\s/.test(r.command) ? 'high' : c.catalogRisk;
        if (c.risk !== c.expectedRisk) c.staticIssues.push(`risk ${c.risk} != expected ${c.expectedRisk}: ${c.warnings.join('; ')}`);
        c.heads = env.shell === 'powershell' ? pwshHeads(r.command) : env.shell === 'cmd' ? cmdHeads(r.command) : posixHeads(r.command, simpleCommands);
        let why = STATIC_ONLY[intent.id] || (isRemoteTool(intent.id) ? NETWORK : null) || cellStatic(intent.id, env, r.command);
        if (!why && (c.risk === 'high' || r.critical) && !container) why = 'risk high: container only';
        if (!why && c.missing.length) why = 'placeholder';
        // cmd's doskey history belongs to an interactive session: a fresh cmd has none
        const quiet = NO_OUTPUT.has(intent.id) || (env.shell === 'cmd' && intent.id === 'history_search');
        c.exec = why ? { run: false, why } : { run: true, cwd: IN_REPO(intent.id) ? 'repo' : '.', expectOutput: !quiet, okCodes: OK_CODES[intent.id] || [0] };
      }
      cases.push(c);
    }
  }
  const data = JSON.stringify({ platform, container: !!container, generated: new Date().toISOString(), cases }, null, 1);
  if (out) fs.writeFileSync(out, data); else process.stdout.write(data);
}

// ------------------------------------------------------------------------------------------- fixture (run side)
function writeFixture(root, platform) {
  const w = (p, s, mode) => { fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true }); fs.writeFileSync(path.join(root, p), s); if (mode) fs.chmodSync(path.join(root, p), mode); };
  w('my docs/notes.txt', 'hello world\nsecond line\nthird line\nhello again\n');
  w('my docs/notes copy.txt', 'hello world\nsecond line changed\nthird line\n');
  w('my docs/log lines.txt', 'GET /a\nGET /b\nGET /a\nPOST /c\nGET /a\nGET /b\n');
  w('my docs/encoded.b64', Buffer.from('hello world\n').toString('base64') + '\n');
  w('my docs/big file.bin', Buffer.alloc(200 * 1024, 7));
  w('my docs/medium notes.txt', 'x'.repeat(20 * 1024));
  w('my docs/empty.txt', '');
  w('my docs/dup a.txt', 'same content\n');
  w('my docs/sub/dup b.txt', 'same content\n');
  w('my docs/sub/script.sh', '#!/bin/sh\necho hi\n', 0o755);
  w('my docs/sub/data.json', '{"a": 1}\n');
  w('my docs/.hidden', 'secret-free dotfile\n');
  w('my docs/report.pdf', '%PDF-1.4 fake\n');
  fs.mkdirSync(path.join(root, 'my docs/empty dir'), { recursive: true });
  w('.hidden-top', 'dot\n');
  w('home/.bash_history', 'ls -la\ngrep hello notes.txt\n');
  w('home/.ash_history', 'grep hello notes.txt\n');
  w('home/AppData/Roaming/Microsoft/Windows/PowerShell/PSReadLine/ConsoleHost_history.txt', 'Select-String hello notes.txt\n');
  w('home/.zsh_history', ': 1700000000:0;grep hello notes.txt\n');
  w('home/.gitconfig', '[user]\n\tname = Matrix\n\temail = matrix@example.invalid\n[init]\n\tdefaultBranch = main\n');
  w('.venv/bin/activate', 'VIRTUAL_ENV=fixture; export VIRTUAL_ENV\n');
  w('.venv/Scripts/Activate.ps1', '$env:VIRTUAL_ENV = "fixture"\n');
  w('.venv/Scripts/activate.bat', '@set VIRTUAL_ENV=fixture\n');
  // an old file for -mtime +30
  const old = new Date(Date.now() - 45 * 86400e3);
  w('my docs/old report.txt', 'old\n'); fs.utimesSync(path.join(root, 'my docs/old report.txt'), old, old);
  try { fs.symlinkSync('notes.txt', path.join(root, 'my docs/link.txt')); fs.symlinkSync('missing-target', path.join(root, 'my docs/broken link')); } catch { /* Windows without developer mode */ }
  // tiny git repo with a dev branch, one commit and an uncommitted change
  const repo = path.join(root, 'repo');
  w('repo/README.md', 'line one\nline two\n');
  w('repo/src.txt', 'alpha\nbeta\n');
  const genv = cleanEnv(path.join(root, 'home'));
  const git = (...a) => spawnSync('git', a, { cwd: repo, env: genv, stdio: 'ignore' });
  git('init', '-q'); git('add', '-A'); git('commit', '-qm', 'init'); git('branch', 'dev');
  fs.appendFileSync(path.join(repo, 'README.md'), 'line three\n'); git('commit', '-qam', 'second');
  // a stash entry (for stash pop) and a separate uncommitted change (for diff / stash / restore)
  fs.writeFileSync(path.join(repo, 'stashed.txt'), 'stashed\n'); git('add', 'stashed.txt'); git('stash', '-q');
  // (in a file both branches share, so `git checkout dev` is not blocked by it)
  fs.appendFileSync(path.join(repo, 'src.txt'), 'gamma (uncommitted)\n');
  // archives (made with the platform's own tar; zip via tar -a on Windows/bsdtar, `zip` elsewhere)
  fs.mkdirSync(path.join(root, 'arch/src'), { recursive: true });
  w('arch/src/a.txt', 'archived a\n'); w('arch/src/b c.txt', 'archived b\n');
  spawnSync('tar', ['-czf', 'sample.tar.gz', 'src'], { cwd: path.join(root, 'arch'), env: genv });
  if (platform === 'win32') spawnSync('tar', ['-a', '-cf', 'sample.zip', 'src'], { cwd: path.join(root, 'arch'), env: genv });
  else if (spawnSync('zip', ['-qr', 'sample.zip', 'src'], { cwd: path.join(root, 'arch'), env: genv }).error) spawnSync('tar', ['--format=zip', '-cf', 'sample.zip', 'src'], { cwd: path.join(root, 'arch'), env: genv });
}

const DEFAULT_MAC_PATH = '/usr/bin:/bin:/usr/sbin:/sbin';
// The environment of every spawned process is built from an allowlist, never inherited wholesale: GIT_DIR / GIT_WORK_TREE /
// GIT_CONFIG_* would point git at a real repository, BASH_ENV / ENV / ZDOTDIR would run startup files, etc.
const KEEP_ENV = /^(PATH|PATHEXT|SystemRoot|SYSTEMROOT|windir|WINDIR|ComSpec|COMSPEC|SystemDrive|TEMP|TMP|TMPDIR|OS|NUMBER_OF_PROCESSORS|PROCESSOR_\w+|ProgramFiles|ProgramFiles\(x86\)|ProgramW6432|ProgramData|CommonProgramFiles|CommonProgramFiles\(x86\)|CommonProgramW6432|PSModulePath|USER|LOGNAME|USERNAME|USERDOMAIN|COMPUTERNAME|LANG|TERM)$/;
function cleanEnv(home) {
  const env = {};
  for (const [k, v] of Object.entries(process.env)) if (KEEP_ENV.test(k)) env[k] = v;
  Object.assign(env, { HOME: home, USERPROFILE: home, APPDATA: path.join(home, 'AppData', 'Roaming'), LOCALAPPDATA: path.join(home, 'AppData', 'Local'),
    GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: path.join(home, '.gitconfig'), GIT_CEILING_DIRECTORIES: path.dirname(path.dirname(home)),
    PAGER: 'cat', GIT_PAGER: 'cat', EDITOR: 'true', VISUAL: 'true', GIT_TERMINAL_PROMPT: '0' });
  if (process.platform !== 'win32') env.LC_ALL = 'C';
  return env;
}
function shellFor(env, platform) {
  if (env.shell === 'powershell') return { bin: 'powershell', file: (f) => ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-File', f], ext: '.ps1' };
  if (env.shell === 'cmd') return { bin: 'cmd', file: (f) => ['/d', '/c', f], ext: '.cmd' };
  const bin = env.shell === 'sh' && platform === 'linux' ? 'sh' : env.shell;
  return { bin, file: (f) => (env.shell === 'zsh' ? ['-f', f] : [f]), ext: '.sh' };
}

function run(casesFile, out) {
  const { platform, container, cases } = JSON.parse(fs.readFileSync(casesFile, 'utf8'));
  // a cases file generated with --container runs high-risk cells: refuse that anywhere but inside a container
  const inContainer = fs.existsSync('/.dockerenv') || fs.existsSync('/run/.containerenv');
  if (container && !inContainer) {
    for (const c of cases) if (c.exec && c.exec.run && (c.risk === 'high' || c.critical)) c.exec = { run: false, why: 'risk high: container only' };
  }
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tellsh-matrix-'));
  const tplDir = path.join(tmp, 'template');
  fs.mkdirSync(tplDir);
  writeFixture(tplDir, platform);
  const results = [];
  const availCache = new Map();
  const bsdPath = platform === 'darwin' ? DEFAULT_MAC_PATH : null;
  try {
    let n = 0;
    for (const c of cases) {
      n++;
      const res = { ...c, syntax: null, missingBins: [], status: null, detail: '' };
      results.push(res);
      if (!c.command) { res.status = 'gap'; res.detail = c.gap; continue; }
      const sh = shellFor(c.env, platform);
      const fixture = path.join(tmp, `case-${n}`);
      fs.cpSync(tplDir, fixture, { recursive: true, verbatimSymlinks: true, preserveTimestamps: true });
      const home = path.join(fixture, 'home');
      const envVars = cleanEnv(home);
      if (bsdPath && c.env.coreutils === 'bsd') envVars.PATH = bsdPath;
      // 1. syntax
      const scriptFile = path.join(tmp, `case-${n}${sh.ext}`);
      if (c.env.shell === 'powershell') {
        fs.writeFileSync(scriptFile, c.command + '\n');
        const p = spawnSync('powershell', ['-NoProfile', '-NonInteractive', '-Command',
          `$e=$null;$t=$null;[void][System.Management.Automation.Language.Parser]::ParseFile('${scriptFile.replace(/'/g, "''")}',[ref]$t,[ref]$e);$e|ForEach-Object{$_.Message}`], { encoding: 'utf8', timeout: 30000, env: envVars });
        res.syntax = (p.stdout || '').trim() ? (p.stdout || '').trim() : 'ok';
      } else if (c.env.shell === 'cmd') {
        res.syntax = 'n/a';
      } else {
        fs.writeFileSync(scriptFile, c.command + '\n');
        const p = spawnSync(sh.bin, ['-n', scriptFile], { encoding: 'utf8', timeout: 15000, env: envVars });
        res.syntax = p.error ? `shell ${sh.bin} unavailable` : p.status === 0 ? 'ok' : (p.stderr || '').trim() || `exit ${p.status}`;
      }
      // 2. binaries present (macOS BSD cells: default PATH only)
      for (const h of c.heads) {
        const key = `${c.env.shell}|${c.env.coreutils}|${h}`;
        if (!availCache.has(key)) {
          let ok;
          if (c.env.shell === 'powershell') ok = spawnSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', `if (Get-Command -Name '${h}' -ErrorAction SilentlyContinue) { exit 0 } else { exit 1 }`], { timeout: 30000, env: envVars }).status === 0;
          else if (c.env.shell === 'cmd') ok = /^(for|if|echo\.?)$/.test(h) || ['dir', 'echo', 'type', 'cd', 'set', 'del', 'rd', 'rmdir', 'md', 'mkdir', 'copy', 'move', 'ren', 'ver', 'vol', 'path', 'mklink', 'date', 'time', 'pushd', 'popd', 'call', 'start', 'erase', 'rename'].includes(h)
            || spawnSync('where', [h], { stdio: 'ignore', env: envVars }).status === 0;
          else ok = spawnSync(sh.bin, ['-c', `command -v "$1" >/dev/null`, 'x', h], { env: envVars, stdio: 'ignore' }).status === 0;
          availCache.set(key, !!ok);
        }
        if (!availCache.get(key)) res.missingBins.push(h);
      }
      const staticFail = [...c.staticIssues];
      if (res.syntax !== 'ok' && res.syntax !== 'n/a') staticFail.push(`syntax: ${res.syntax}`);
      const optional = res.missingBins.filter((b) => OPTIONAL_TOOLS.has(b));
      const core = res.missingBins.filter((b) => !OPTIONAL_TOOLS.has(b));
      if (core.length) staticFail.push(`not installed by default: ${core.join(', ')}`);
      // `a || b || c` fallbacks: a missing optional tool in an earlier alternative is expected, run it when the last one exists
      const alts = c.command.split('||');
      const lastAlt = alts.length > 1 ? alts[alts.length - 1] : null;
      const fallbackOk = lastAlt != null && !optional.some((t) => new RegExp(`(^|[\\s|;&(])${t.replace(/[.]/g, '\\.')}(\\s|$)`).test(lastAlt));
      if (optional.length && !staticFail.length && !fallbackOk) {
        res.status = 'static'; res.detail = `needs ${optional.join(', ')} (not installed on this test machine)`;
        fs.rmSync(fixture, { recursive: true, force: true });
        continue;
      }
      // 3. execution
      if (!c.exec || !c.exec.run) {
        res.status = staticFail.length ? 'fail' : 'static';
        res.detail = staticFail.length ? staticFail.join(' | ') : (c.exec ? c.exec.why : 'no command');
        fs.rmSync(fixture, { recursive: true, force: true });
        continue;
      }
      let body = c.command;
      if (c.env.shell === 'powershell') body = `$ProgressPreference = 'SilentlyContinue'\n${c.command}\nif (-not $?) { exit 1 }\n`;
      if (c.env.shell === 'cmd') body = `@echo off\r\n${c.command}\r\n`;
      fs.writeFileSync(scriptFile, body + '\n');
      const p = spawnSync(sh.bin, sh.file(scriptFile), { cwd: path.join(fixture, c.exec.cwd), env: envVars, encoding: 'utf8', timeout: 20000, input: '', maxBuffer: 8 << 20 });
      res.exit = p.error && p.error.code === 'ETIMEDOUT' ? 'timeout' : p.status;
      res.stdout = (p.stdout || '').slice(0, 600);
      res.stderr = (p.stderr || '').slice(0, 600);
      const probs = [...staticFail];
      if (res.exit === 'timeout') probs.push('timed out after 20 s');
      else if (!c.exec.okCodes.includes(res.exit)) probs.push(`exit ${res.exit}: ${res.stderr.trim().split('\n').slice(-2).join(' / ')}`);
      // native programs (tar -v, git checkout) report progress on stderr; only PowerShell error records are failures
      else if (c.env.shell === 'powershell' && /FullyQualifiedErrorId|CategoryInfo/.test(res.stderr)) probs.push(`stderr: ${res.stderr.trim().split('\n').slice(0, 2).join(' / ')}`);
      else if (c.exec.expectOutput && !res.stdout.trim()) probs.push('no output (expected some)');
      res.status = probs.length ? 'fail' : 'pass';
      res.detail = probs.join(' | ');
      fs.rmSync(fixture, { recursive: true, force: true });
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  const data = JSON.stringify({ platform, container, host: os.hostname(), ran: new Date().toISOString(), results }, null, 1);
  if (out) fs.writeFileSync(out, data); else process.stdout.write(data);
}

// ------------------------------------------------------------------------------------------- report
function report(files, { before = [], out = 'MATRIX.md' } = {}) {
  const lines = ['# tellsh template matrix', '',
    'Generated by `scripts/matrix.js` (gen on the dev box, run on each target). Every catalog intent is rendered for every',
    '(shell, OS, coreutils) cell with realistic slot values pointing into a throwaway fixture dir, then checked for syntax,',
    'allowlist / risk, binaries present by default, and (when safe to run) executed with a timeout.', '',
    '- **pass**: syntax ok, all programs present, allowlist clean, risk = catalog risk, ran with an accepted exit code and expected output',
    '- **static**: all static checks pass; not executed on purpose (network, sudo, services, docker, kill, interactive, high risk outside a container)',
    '- **gap**: the shell has no equivalent; tellsh says so instead of rendering a command',
    '- **fail**: anything else (listed below)', ''];
  const totals = (f) => { const t = { pass: 0, fail: 0, static: 0, gap: 0 }; for (const r of JSON.parse(fs.readFileSync(f, 'utf8')).results) t[r.status]++; return t; };
  if (before.length) {
    lines.push('## Summary (first run → after the v0.3.1 fixes)', '', '| platform | pass | fail | static | gap |', '|---|---|---|---|---|');
    for (const f of files) {
      const p = JSON.parse(fs.readFileSync(f, 'utf8')).platform;
      const bf = before.find((x) => JSON.parse(fs.readFileSync(x, 'utf8')).platform === p);
      const a = totals(f); const b0 = bf ? totals(bf) : null;
      lines.push(`| ${p} | ${['pass', 'fail', 'static', 'gap'].map((k) => (b0 ? `${b0[k]} → ${a[k]}` : a[k])).join(' | ')} |`);
    }
    lines.push('', 'The first run also counted harness problems (fixture gaps, optional tools missing on the test machine, native', 'stderr in PowerShell); those were fixed in the harness, the template / allowlist fixes are in the v0.3.1 changelog.', '');
  }
  for (const f of files) {
    const { platform, container, host, ran, results } = JSON.parse(fs.readFileSync(f, 'utf8'));
    lines.push(`## ${platform}${container ? ' (container)' : ''}`, '', `Host \`${host}\`, run ${ran}.`, '', '| cell | pass | fail | static | gap |', '|---|---|---|---|---|');
    const by = new Map();
    for (const r of results) {
      const k = r.label; if (!by.has(k)) by.set(k, { pass: 0, fail: 0, static: 0, gap: 0 });
      by.get(k)[r.status]++;
    }
    const tot = { pass: 0, fail: 0, static: 0, gap: 0 };
    for (const [k, v] of by) { lines.push(`| ${k} | ${v.pass} | ${v.fail} | ${v.static} | ${v.gap} |`); for (const s in tot) tot[s] += v[s]; }
    lines.push(`| **total** | ${tot.pass} | ${tot.fail} | ${tot.static} | ${tot.gap} |`, '');
    const fails = results.filter((r) => r.status === 'fail');
    if (fails.length) {
      lines.push('Failures:', '');
      for (const r of fails) lines.push(`- \`${r.id}\` ${r.label}: \`${String(r.command).replace(/`/g, "'").replace(/\|/g, '\\|')}\` → ${String(r.detail).replace(/\|/g, '\\|').replace(/\n/g, ' ')}`);
      lines.push('');
    } else lines.push('No failures.', '');
    const stat = results.filter((r) => r.status === 'static');
    const reasons = {};
    for (const r of stat) (reasons[r.detail] ||= new Set()).add(r.id);
    lines.push('<details><summary>static-only</summary>', '');
    for (const [why, ids] of Object.entries(reasons)) lines.push(`- ${why}: ${[...ids].join(', ')}`);
    lines.push('', '</details>', '');
  }
  fs.writeFileSync(out, lines.join('\n'));
}

// ------------------------------------------------------------------------------------------- main
const [mode, ...args] = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const pos = args.filter((a) => !a.startsWith('--'));
if (mode === 'gen') await gen(pos[0], pos[1], { container: flags.has('--container') });
else if (mode === 'run') run(pos[0], pos[1]);
else if (mode === 'report') { const bi = args.indexOf('--before'); const before = bi >= 0 ? args[bi + 1].split(',') : []; report(pos.filter((x) => x !== args[bi + 1]), { before }); }
else { console.error('usage: matrix.js gen <linux|busybox|darwin|win32> [out] [--container] | run <cases> [out] | report <results...>'); process.exit(2); }
