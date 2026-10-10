// Order-insensitive normalisation of simple commands for the composer eval:
// "ls -ltr" == "ls -l -r -t"; "tar -tzvf a.tgz" == "tar -t -z -v -f a.tgz"; "head -n5 f" == "head -n 5 f".
const VALUE_FLAGS = {
  find: null, // every -predicate except the ones below takes a value
  grep: ['-A', '-B', '-C', '-e', '-m', '-f'],
  head: ['-n', '-c'], tail: ['-n', '-c'], sort: ['-k', '-t'], du: ['-d', '-t'], df: [],
  tar: ['-f', '-C'], ps: ['-u', '-o', '-p', '-C'], journalctl: ['-u', '-n', '-p'], wc: [], ls: [],
  'git log': ['-n'], 'docker ps': ['-n', '-f'], 'docker images': ['-f'],
};
const FIND_NOVAL = new Set(['-empty', '-print0', '-ls', '-delete', '-print', '-xdev']);

export function shellWords(s) {
  const out = [];
  const re = /'([^']*)'|"((?:\\.|[^"\\])*)"|(\S+)/g;
  let m;
  while ((m = re.exec(s))) out.push(m[1] ?? (m[2] != null ? m[2] : m[3]));
  return out;
}

export function normCmd(cmd) {
  const w = shellWords(String(cmd).trim());
  const head = w[0] || '';
  let i = 1;
  let sub = '';
  if ((head === 'git' || head === 'docker') && w[1]) { sub = w[1]; i = 2; }
  const key = sub ? `${head} ${sub}` : head;
  const vf = VALUE_FLAGS[key] ?? VALUE_FLAGS[head] ?? [];
  const flags = [];
  const args = [];
  for (; i < w.length; i++) {
    const t = w[i];
    if (t === '--') { args.push(...w.slice(i + 1)); break; }
    if (head === 'find' && /^-[a-z]/.test(t)) {
      if (FIND_NOVAL.has(t)) flags.push(t); else flags.push(`${t.replace('-iname', '-name')} ${w[++i] ?? ''}`.toLowerCase());
      continue;
    }
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
  return `${key} | ${[...new Set(flags)].sort().join(' ')} | ${args.join(' ')}`;
}

export const sameCmd = (a, b) => normCmd(a) === normCmd(b);
