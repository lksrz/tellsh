// The allowlist table (see scripts/build_allowlist.js): every catalog intent rendered for every shell with marked values,
// tokenised like the danger checker reads commands.
import { INTENTS } from '../../src/catalog.js';
import { buildCommand } from '../../src/fill.js';
import { simpleCommands, commandShape, SUB_DEPTH, KEYWORDS, headKey } from '../../src/danger.js';
import { KNOWN_TOOLS } from '../../src/slots.js';

const V = { path: 'zqdir', file: 'zqf.txt', src: 'zqa.txt', dst: 'zqb.txt', dest: 'zqd', archive: 'zqx.tar.gz', count: 5, depth: 2, size: '10M',
  age: '-mtime -3', days: 3, since: '3 days ago', port: 8080, pid: 1234, mode: '755', var: 'ZQVAR', name: 'zqname', service: 'zqsvc',
  container: 'zqctr', pkg: 'zqpkg', cmd: 'zqcmd', branch: 'zqbranch', user: 'zquser', pattern: 'zqpat', host: 'zqhost.example',
  target: 'zqhost.example', message: 'zqmsg', url: 'https://zq.example/r.git', text: 'zqtext', ext: 'log', old: 'zqold', new: 'zqnew',
  start: 1, end: 5, num: 7, pr: '12', repo: 'zqo/zqr', wenv: 'zqenv', dryrun: '--dry-run', delbranch: '--delete-branch', script: 'zqscript', workspace: 'zqws', piptarget: 'zqpipdir', rhost: 'zqrhost.example', rport: 9090,
  glob: '*.log', minutes: 5, sizeBytes: 1000 };
const ENVS = [
  { shell: 'bash', os: 'linux', coreutils: 'gnu' }, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'bash', os: 'darwin', coreutils: 'bsd' },
  { shell: 'sh', os: 'linux', coreutils: 'gnu' }, { shell: 'sh', os: 'linux', coreutils: 'busybox' },
  { shell: 'zsh', os: 'linux', coreutils: 'gnu' }, { shell: 'zsh', os: 'darwin', coreutils: 'gnu' }, { shell: 'fish', os: 'linux', coreutils: 'gnu' }, { shell: 'fish', os: 'darwin', coreutils: 'bsd' },
  { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, { shell: 'powershell', os: 'linux', coreutils: 'gnu' }, { shell: 'powershell', os: 'darwin', coreutils: 'bsd' },
  { shell: 'cmd', os: 'win32', coreutils: 'gnu' },
];
const literal = (w) => !/zq/i.test(w);

export function allowlistTable() {
  const table = {};
  const put = (key, flag) => { const s = (table[key] ??= new Set()); if (flag != null) s.add(flag); };
  for (const it of INTENTS) {
    for (const env of ENVS) {
      // with every optional value and with none, so both forms of each template are seen
      for (const resolved of [{ ...V }, { ...V, npmverb: 'ci' }, {}]) {
        let r;
        try { r = buildCommand(it.id, '', { env, resolved }); } catch { continue; }
        if (!r.command) continue;
        for (const words of [...simpleCommands(r.command), ...simpleCommands(r.command, { winPaths: true })]) {
          let w = words;
          while (w.length && KEYWORDS.has(String(w[0]).toLowerCase())) w = w.slice(1);
          // a piece of a PowerShell expression (`$_.Length -gt 1MB`, `.Count`, `[math]::Round`) is recorded as written, like a program
          if (!w.length || !literal(headKey(w[0]))) continue; // `{cmd} --version`: the program is a value (below)
          const sh = commandShape(w, { literal });
          put(sh.key);
          if ((SUB_DEPTH[sh.head] ?? 0) > 0 && sh.key === sh.head && sh.rest.length) put(sh.key, '*sub');
          for (const f of sh.flags) {
            const k = flagKeyOf(sh.head, f);
            put(sh.key, k);
            // a cluster of single-letter options also allows each letter (`ls -lah` -> -l, -a, -h)
            if (/^-[A-Za-z]{2,5}$/.test(f) && sh.head !== 'find' && !/^[a-z]+-[a-z]+$/.test(sh.head)) for (const c of f.slice(1)) put(sh.key, `-${c}`);
          }
        }
      }
    }
  }
  // tool_version / cli_help: `{cmd} --version`, `{cmd} --help` for the tools the request vocabulary knows
  for (const t of KNOWN_TOOLS) { put(t, '--version'); put(t, '--help'); }
  return Object.fromEntries(Object.entries(table).map(([k, s]) => [k, [...s].sort()]));
}
// the same normalisation as the checker (src/danger.js flagKey)
function flagKeyOf(head, f) {
  let x = String(f);
  if (/^--[^=]+=/.test(x)) x = x.replace(/=.*$/s, '=');
  else if (/^\/[A-Za-z?]{1,2}:/.test(x)) x = x.replace(/:.*$/s, ':');
  else if (/^-[A-Za-z]\d+$/.test(x)) x = x.replace(/\d+$/, '#');
  return /^[a-z]+-[a-z]+$/.test(head) ? x.toLowerCase() : x;
}
