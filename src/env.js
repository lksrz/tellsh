// Detect the target shell, OS and coreutils flavour (GNU / BSD / busybox). Results are fed to the
// classifiers as `shell=X os=Y` tokens and select the per-shell rendering of the command.
import { existsSync, readFileSync, readlinkSync, realpathSync } from 'node:fs';
import { join, basename, delimiter } from 'node:path';

export const SHELLS = ['bash', 'zsh', 'sh', 'powershell', 'fish', 'cmd'];
export const OSES = ['linux', 'darwin', 'win32'];
export const POSIX_SHELLS = new Set(['bash', 'zsh', 'sh']);

const SHELL_ALIASES = {
  bash: 'bash', zsh: 'zsh', sh: 'sh', dash: 'sh', ash: 'sh', busybox: 'sh', ksh: 'sh', mksh: 'sh',
  pwsh: 'powershell', powershell: 'powershell', 'powershell.exe': 'powershell', 'pwsh.exe': 'powershell', ps: 'powershell',
  fish: 'fish', cmd: 'cmd', 'cmd.exe': 'cmd',
};
export function normShell(s) {
  if (!s) return null;
  return SHELL_ALIASES[basename(String(s)).toLowerCase().replace(/^-/, '')] || null;
}
export function normOs(s) {
  if (!s) return null;
  const v = String(s).toLowerCase();
  if (/^(linux|gnu)/.test(v)) return 'linux';
  if (/^(darwin|mac|macos|osx)/.test(v)) return 'darwin';
  if (/^(win|windows|win32)/.test(v)) return 'win32';
  return null;
}

function parentComm(pid) {
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, 'utf8');
    const m = stat.match(/^\d+ \((.*)\) \S (\d+)/s);
    return m ? { comm: m[1], ppid: +m[2] } : null;
  } catch { return null; }
}

/** Shell that launched us: parent process chain (Linux /proc), PowerShell env heuristic, then $SHELL. */
export function detectShell(env = process.env, os = process.platform) {
  if (env.TELLSH_SHELL) return normShell(env.TELLSH_SHELL) || 'bash';
  if (os === 'linux') {
    let pid = process.ppid;
    for (let i = 0; i < 4 && pid > 1; i++) {
      const p = parentComm(pid);
      if (!p) break;
      const sh = normShell(p.comm);
      if (sh) return sh;
      pid = p.ppid; // e.g. npx / npm / node wrappers
    }
  }
  if (os === 'win32') {
    // PowerShell adds its per-user module dirs to PSModulePath; cmd.exe leaves only the system entry.
    const psm = (env.PSModulePath || '').split(';').filter(Boolean);
    if (psm.length >= 3 || /\\Documents\\(Windows)?PowerShell\\Modules/i.test(env.PSModulePath || '')) return 'powershell';
    if (env.SHELL && normShell(env.SHELL)) return normShell(env.SHELL); // Git Bash / MSYS
    return 'cmd';
  }
  return normShell(env.SHELL) || 'sh';
}

function onPath(name, env = process.env) {
  for (const dir of (env.PATH || '').split(delimiter)) {
    if (dir && existsSync(join(dir, name))) return true;
  }
  return false;
}

/** gnu | bsd | busybox. macOS = BSD unless Homebrew GNU coreutils (gdu/gsort) are installed. */
export function detectCoreutils(os = process.platform, env = process.env) {
  if (env.TELLSH_COREUTILS) return env.TELLSH_COREUTILS;
  if (os === 'darwin') return onPath('gdu', env) && onPath('gsort', env) ? 'gnu' : 'bsd';
  if (os === 'linux') {
    try {
      const ls = ['/bin/ls', '/usr/bin/ls'].find((p) => existsSync(p));
      if (ls) {
        const real = realpathSync(ls);
        if (/busybox/.test(real) || /busybox/.test(readlinkSync(ls, { encoding: 'utf8' }).toString())) return 'busybox';
      }
    } catch { /* not a symlink */ }
    return 'gnu';
  }
  return 'gnu';
}

/** -> { shell, os, coreutils, detected: {shell, os} } honouring --shell / --os overrides */
export function detectEnv({ shell, os } = {}, env = process.env) {
  const realOs = process.platform === 'darwin' || process.platform === 'win32' ? process.platform : 'linux';
  const o = normOs(os) || (normShell(shell) === 'cmd' ? 'win32' : realOs);
  const s = normShell(shell) || (o === realOs ? detectShell(env, realOs) : o === 'win32' ? 'powershell' : 'bash');
  const coreutils = o === realOs ? detectCoreutils(o, env) : o === 'darwin' ? 'bsd' : 'gnu';
  return { shell: s, os: o, coreutils };
}

/** classifier context tokens */
export const envFeatures = (e) => [`shell=${e.shell}`, `os=${e.os}`];
