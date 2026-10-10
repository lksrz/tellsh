#!/usr/bin/env node
// Sanity checks for src/variants.js:
//  - every catalog intent has an entry, and every entry is a catalog intent
//  - every intent has `pwsh` or `gaps.pwsh` (and a pwsh without `win` explains the Windows gap)
//  - only known keys / slots are used, raw only for validated slots
//  - every required catalog slot appears in every variant
//  - bsd / gnuMac / busybox renders parse with `bash -n` and `dash -n` (busybox also with `busybox sh -n`)
//  - PowerShell renders have balanced quotes/brackets and avoid `&&`, `||` and common aliases
// Usage: node scripts/check_variants.js [--verbose]
import { spawnSync } from 'node:child_process';
import { INTENTS } from '../src/catalog.js';
import { VARIANTS } from '../src/variants.js';
import { shQuote } from '../src/fill.js';

const verbose = process.argv.includes('--verbose');
const KEYS = new Set(['bsd', 'gnuMac', 'busybox', 'fish', 'pwsh', 'cmd', 'gaps']);
const SHELL_KEYS = ['bsd', 'gnuMac', 'busybox', 'fish', 'pwsh', 'cmd'];
const SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive', 'count', 'depth', 'days', 'size', 'age', 'since',
  'name', 'service', 'container', 'pkg', 'cmd', 'var', 'branch', 'user', 'pattern', 'host', 'target', 'message', 'url',
  'port', 'pid', 'mode', 'old', 'new', 'sedexpr', 'text', 'glob', 'namepat', 'ext', 'minutes', 'sizeBytes', 'script', 'start', 'end', 'num']);
const RAW_OK = new Set(['count', 'depth', 'days', 'pid', 'port', 'size', 'age', 'mode', 'var', 'minutes', 'sizeBytes', 'start', 'end', 'num']);
const NOT_SLOTS = new Set(['http_code']); // literal braces that look like slots (curl -w '%{http_code}')
// a required catalog slot may be satisfied by a derived slot
const ALIASES = { ext: ['ext', 'glob'], name: ['name', 'namepat'], old: ['old', 'sedexpr'], new: ['new', 'sedexpr'] };

const SAMPLE = {
  path: 'some dir', file: 'my file.txt', src: 'a b.txt', dst: 'c d.txt', dest: 'out dir', archive: 'arch ive.tar.gz',
  count: '7', depth: '2', days: '30', size: '100M', age: '-mtime -3', since: '3 days ago', name: 'node srv',
  service: 'ng inx', container: 'web app', pkg: 'jq x', cmd: 'py thon', var: 'HOME', branch: 'feat/x y',
  user: 'bob o', pattern: "it's here", host: 'example.com', target: 'me@host x', message: 'fix: "it"', url: 'https://e.x/?a=1&b',
  port: '8080', pid: '4242', mode: '755', old: 'fo o', new: 'ba r', sedexpr: 's/fo o/ba r/g', text: 'hello world',
  glob: '*.pdf', namepat: '*fo o*', ext: 'pdf', minutes: '4320', sizeBytes: '104857600',
  script: 'build:prod x', start: '10', end: '20', num: '42',
};

const psQuote = (v) => `'${String(v).replace(/'/g, "''")}'`;
const cmdQuote = (v) => `"${String(v).replace(/"/g, '""')}"`;
const fishQuote = (v) => `'${String(v).replace(/[\\']/g, '\\$&')}'`;
const QUOTERS = { bsd: shQuote, gnuMac: shQuote, busybox: shQuote, fish: fishQuote, pwsh: psQuote, cmd: cmdQuote };

let failures = 0;
const fail = (id, where, msg) => { failures++; console.log(`FAIL ${id} [${where}] ${msg}`); };

/** Render a string template with sample values (all optional segments kept). */
function renderSample(tpl, quote) {
  return tpl
    .replace(/«([^»]*)»/g, ' $1')
    .replace(/\{(\w+)(!raw)?\}/g, (m, name, raw) => {
      if (!SLOTS.has(name)) return m;
      return raw ? SAMPLE[name] : quote(SAMPLE[name]);
    });
}

/** Expand a variant value into [label, ctx, rendered, rawTemplateOrNull] entries. */
function expand(key, value, quote) {
  const out = [];
  const one = (label, v, ctx) => {
    if (typeof v === 'function') out.push([label, ctx, v({ ...SAMPLE }, quote, ctx), null]);
    else if (typeof v === 'string') out.push([label, ctx, renderSample(v, quote), v]);
    else out.push([label, ctx, null, null]);
  };
  const ctxs = key === 'pwsh' || key === 'cmd' ? [{ os: 'win32', shell: key }, { os: 'linux', shell: key }]
    : key === 'busybox' ? [{ os: 'linux', shell: 'sh' }]
      : [{ os: 'darwin', shell: 'bash', coreutils: key === 'gnuMac' ? 'gnu' : 'bsd' }, { os: 'linux', shell: 'bash' }];
  if (key === 'pwsh' && value && typeof value === 'object' && typeof value !== 'function') {
    for (const k of Object.keys(value)) {
      if (!['win', 'unix'].includes(k)) out.push([`pwsh.${k}`, null, null, null]);
      else one(`pwsh.${k}`, value[k], { os: k === 'win' ? 'win32' : 'linux', shell: 'pwsh' });
    }
    return out;
  }
  if (typeof value === 'function') {
    for (const ctx of key === 'fish' ? [{ os: 'darwin', shell: 'fish' }, { os: 'linux', shell: 'fish' }] : ctxs) {
      one(`${key}(${ctx.os})`, value, ctx);
    }
    return out;
  }
  one(key, value, ctxs[0]);
  return out;
}

function syntaxCheck(shell, cmd) {
  const args = shell === 'busybox' ? ['busybox', ['sh', '-n', '-c', cmd]] : [shell, ['-n', '-c', cmd]];
  const r = spawnSync(args[0], args[1], { encoding: 'utf8' });
  if (r.error) return null; // shell not installed
  return r.status === 0 ? '' : (r.stderr || `exit ${r.status}`).trim();
}

const PS_ALIASES = /(^|[|;({]\s*)(ls|dir|cat|type|rm|del|cp|copy|mv|move|echo|ps|kill|sort|select|where|foreach|%|\?|gci|gc|sls|iwr|irm|curl|wget|cd|pwd|man|sleep|tee|diff)(\s|$)/;

function pwshCheck(id, label, s, ctx) {
  // quotes: single-quoted strings with '' doubling, double-quoted strings
  let depth = { '(': 0, '{': 0, '[': 0 };
  const close = { ')': '(', '}': '{', ']': '[' };
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === "'") {
      i++;
      while (i < s.length && !(s[i] === "'" && s[i + 1] !== "'")) i += s[i] === "'" ? 2 : 1;
      if (i >= s.length) return fail(id, label, `unterminated single quote: ${s}`);
    } else if (c === '"') {
      i++;
      while (i < s.length && s[i] !== '"') i += s[i] === '`' ? 2 : 1;
      if (i >= s.length) return fail(id, label, `unterminated double quote: ${s}`);
    } else if (c in depth) depth[c]++;
    else if (c in close) {
      if (--depth[close[c]] < 0) return fail(id, label, `unbalanced '${c}': ${s}`);
    }
    i++;
  }
  for (const [k, v] of Object.entries(depth)) if (v) return fail(id, label, `unbalanced '${k}': ${s}`);
  const bare = s.replace(/'(?:[^']|'')*'|"[^"]*"/g, "''");
  if (/&&|\|\|/.test(bare)) fail(id, label, `uses && / || (not valid in Windows PowerShell 5.1): ${s}`);
  if (ctx?.os === 'win32' && PS_ALIASES.test(bare)) fail(id, label, `uses an alias / ambiguous name: ${s}`);
  if (ctx?.os !== 'win32' && /(^|[|;({]\s*)(kill)(\s|$)/.test(bare)) fail(id, label, `kill is an alias of Stop-Process in pwsh: ${s}`);
  if (/(^|\s)--(\s|$)/.test(bare)) fail(id, label, `bare -- may be swallowed by PowerShell: ${s}`);
}

const counts = Object.fromEntries(SHELL_KEYS.map((k) => [k, 0]));
const gapList = [];
const ids = new Set(INTENTS.map((i) => i.id));
for (const id of Object.keys(VARIANTS)) if (!ids.has(id)) fail(id, '-', 'not a catalog intent');

for (const intent of INTENTS) {
  const v = VARIANTS[intent.id];
  if (!v) { fail(intent.id, '-', 'missing from VARIANTS'); continue; }
  for (const k of Object.keys(v)) if (!KEYS.has(k)) fail(intent.id, k, 'unknown key');
  const gaps = v.gaps || {};
  for (const [k, reason] of Object.entries(gaps)) {
    if (!SHELL_KEYS.includes(k)) fail(intent.id, `gaps.${k}`, 'unknown gap key');
    gapList.push(`${intent.id} ${k}: ${reason}`);
  }
  if (!v.pwsh && !gaps.pwsh) fail(intent.id, 'pwsh', 'no pwsh variant and no gaps.pwsh');
  if (v.pwsh && typeof v.pwsh === 'object' && !v.pwsh.win && !gaps.pwsh) fail(intent.id, 'pwsh', 'pwsh has no `win` and no gaps.pwsh');
  if (v.cmd && gaps.cmd) fail(intent.id, 'cmd', 'both cmd and gaps.cmd');
  const required = Object.entries(intent.slots).filter(([, d]) => d == null).map(([k]) => k);

  for (const key of SHELL_KEYS) {
    if (!(key in v)) continue;
    counts[key]++;
    for (const [label, ctx, rendered, tpl] of expand(key, v[key], QUOTERS[key])) {
      if (rendered == null) { fail(intent.id, label, 'bad value type'); continue; }
      if (tpl != null) {
        for (const [, name, raw] of tpl.matchAll(/\{(\w+)(!raw)?\}/g)) {
          if (NOT_SLOTS.has(name)) continue;
          if (!SLOTS.has(name)) fail(intent.id, label, `unknown slot {${name}}`);
          else if (raw && !RAW_OK.has(name)) fail(intent.id, label, `{${name}!raw} not allowed`);
        }
        if ((tpl.match(/«/g) || []).length !== (tpl.match(/»/g) || []).length) fail(intent.id, label, 'unbalanced «»');
        for (const seg of tpl.matchAll(/«([^»]*)»/g)) {
          if (!/\{\w+(!raw)?\}/.test(seg[1])) fail(intent.id, label, `optional segment without slot: «${seg[1]}»`);
        }
        for (const r of required) {
          const names = ALIASES[r] || [r];
          // required slots must not be hidden inside an optional segment
          const outside = tpl.replace(/«[^»]*»/g, '');
          if (!names.some((n) => outside.includes(`{${n}}`) || outside.includes(`{${n}!raw}`))) {
            fail(intent.id, label, `required slot {${r}} missing`);
          }
        }
      } else {
        for (const r of required) {
          const names = ALIASES[r] || [r];
          if (!names.some((n) => rendered.includes(SAMPLE[n]) || rendered.includes(QUOTERS[key](SAMPLE[n])))) {
            fail(intent.id, label, `required slot {${r}} missing from function output`);
          }
        }
      }
      if (verbose) console.log(`${intent.id} [${label}] ${rendered}`);
      if (['bsd', 'gnuMac', 'busybox'].includes(key)) {
        for (const sh of key === 'busybox' ? ['bash', 'dash', 'busybox'] : ['bash', 'dash']) {
          const err = syntaxCheck(sh, rendered);
          if (err) fail(intent.id, `${label}/${sh}`, `${err}\n    ${rendered}`);
        }
      }
      if (key === 'pwsh') pwshCheck(intent.id, label, rendered, ctx);
      if (key === 'fish' && /\$\(|\$\{|`/.test(rendered)) fail(intent.id, label, `POSIX-only syntax in fish: ${rendered}`);
    }
  }
}

const n = INTENTS.length;
console.log(`\nintents: ${n}`);
for (const k of SHELL_KEYS) console.log(`  ${k.padEnd(8)} ${counts[k]}`);
const pwshGaps = INTENTS.filter((i) => !VARIANTS[i.id]?.pwsh).length;
console.log(`  pwsh full gaps: ${pwshGaps}`);
console.log(`\ngaps (${gapList.length}):\n  ${gapList.join('\n  ')}`);
console.log(failures ? `\n${failures} failure(s)` : '\nall checks passed');
process.exit(failures ? 1 : 0);
