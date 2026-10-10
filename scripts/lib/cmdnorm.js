// Normalisation of simple commands for the composer eval. Only rewrites that keep the behaviour:
//   option bundling / order for ordinary commands: "ls -ltr" == "ls -l -r -t"; "tar -tzvf a.tgz" == "tar -t -z -v -f a.tgz"
//   attached values: "head -n5 f" == "head -n 5 f" == "head -5 f"
//   quoting: 'a.txt' == a.txt (words are compared after shell unquoting)
// Kept strict: argument boundaries ('a b' != a b), case (-name != -iname, '*.LOG' != '*.log'),
// find's expression order (filters before -delete matter), and every pipeline stage in order.
import { splitCommand, rawOf } from '../../src/shellwords.js';

const VALUE_FLAGS = {
  grep: ['-A', '-B', '-C', '-e', '-m', '-f'],
  head: ['-n', '-c'], tail: ['-n', '-c'], sort: ['-k', '-t'], du: ['-d', '-t'], df: ['-t'],
  tar: ['-f', '-C'], ps: ['-u', '-o', '-p', '-C'], journalctl: ['-u', '-n', '-p'], wc: [], ls: [],
  'git log': ['-n'], 'docker ps': ['-n', '-f'], 'docker images': ['-f'],
};

/** Shell words of a command (unquoted). Kept for callers that only need the word list. */
export function shellWords(s) {
  const r = splitCommand(String(s));
  return r.ok ? r.segments.flatMap((g) => g.words.map(rawOf)) : String(s).split(/\s+/).filter(Boolean);
}

function normSegment(w) {
  const head = w[0] || '';
  let i = 1;
  let sub = '';
  if ((head === 'git' || head === 'docker') && w[1]) { sub = w[1]; i = 2; }
  const key = sub ? `${head} ${sub}` : head;
  if (head === 'find') return { key, flags: [], args: w.slice(1) }; // the expression is order-sensitive: compare verbatim
  const vf = VALUE_FLAGS[key] ?? VALUE_FLAGS[head] ?? [];
  const flags = [];
  const args = [];
  for (; i < w.length; i++) {
    const t = w[i];
    if (t === '--') { const rest = w.slice(i + 1); args.push(...(rest.some((x) => /^-/.test(x)) ? ['--'] : []), ...rest); break; } // `--` is a no-op unless an operand starts with -
    if (/^--[\w-]+=/.test(t)) { flags.push(t); continue; }
    if (/^--/.test(t)) { flags.push(vf.includes(t) ? `${t} ${w[++i] ?? ''}` : t); continue; }
    if (/^-\d+$/.test(t) && ['head', 'tail'].includes(head)) { flags.push(`-n ${t.slice(1)}`); continue; }
    if (/^-[A-Za-z]/.test(t)) {
      const letters = t.slice(1);
      for (let k = 0; k < letters.length; k++) {
        const f = '-' + letters[k];
        if (/\d/.test(letters[k])) { flags.push(f); continue; }
        if (vf.includes(f)) {
          const rest = letters.slice(k + 1);
          flags.push(`${f} ${rest || (w[++i] ?? '')}`);
          break;
        }
        flags.push(f);
      }
      continue;
    }
    if (head === 'ps' && /^[a-z]+$/.test(t) && i === 1) { for (const c of t) flags.push('bsd:' + c); continue; }
    args.push(t);
  }
  return { key, flags: [...new Set(flags)].sort(), args };
}

export function normCmd(cmd) {
  const r = splitCommand(String(cmd).trim(), 'posix', { keepRedirects: true });
  if (!r.ok) return 'raw:' + String(cmd).trim();
  return JSON.stringify(r.segments.map((g) => ({ ...normSegment(g.words.map(rawOf)), sep: g.sep })));
}

export const sameCmd = (a, b) => normCmd(a) === normCmd(b);
