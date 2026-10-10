// Second pass (experimental): compose a command from a closed vocabulary when no catalog intent fits.
//   1. command head = a tool from stage 1 (top-3), restricted to tools that have a flag vocabulary
//   2. per tool, every flag has natural-language triggers (EN + PL, matched on folded stems) plus
//      weak evidence from tldr-pages flag descriptions; flags whose trigger score >= 1 are selected
//   3. slot values (paths, patterns, numbers, ...) come from the tagger/regex extraction
//   4. validation: only flags from the tool's vocabulary, then `bash -n` syntax check
// Composed commands are always at least medium risk and must be confirmed explicitly (never --yes).
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { foldKeepLength } from './slots.js';
import { shQuote } from './render.js';
import { checkDanger, maxRisk } from './danger.js';

const fold = (s) => ' ' + foldKeepLength(String(s)).toLowerCase().replace(/[^a-z0-9.*/~+-]+/g, ' ') + ' ';

// trigger syntax: plain words/phrases are matched as stem prefixes at a word start ("szczegol" matches
// "szczegolami"); a trailing "$" requires a whole word.
const F = (flag, triggers, extra = {}) => ({ flag, triggers, ...extra });

export const TOOLS = {
  ls: {
    head: 'ls', args: ['path'],
    flags: [
      F('-l', ['long', 'detail', 'details', 'permission', 'with size', 'owner', 'full info', 'szczegol', 'dlug', 'uprawnien', 'wlasciciel']),
      F('-a', ['hidden', 'all files', 'dotfile', 'dot file', 'including hidden', 'ukryt', 'wszystkie pliki', 'z kropk']),
      F('-t', ['by time', 'by date', 'modification time', 'modified time', 'newest', 'most recent', 'latest first', 'by modif', 'wg czasu', 'wedlug czasu', 'po czasie', 'wg daty', 'wedlug daty', 'po dacie', 'najnowsz', 'czasu modyfikacji', 'daty modyfikacji'], { group: 'sort' }),
      F('-S', ['by size', 'largest first', 'biggest first', 'size order', 'sorted by size', 'wg rozmiaru', 'wedlug rozmiaru', 'po rozmiarze', 'najwieksze najpierw', 'od najwiekszego'], { group: 'sort' }),
      F('-r', ['reverse', 'oldest first', 'ascending', 'smallest first', 'odwrot', 'najstarsz', 'rosnac', 'od najmniejsz', 'od najstarsz']),
      F('-h', ['human', 'readable size', 'kb mb', 'czyteln', 'ludzk']),
      F('-R', ['recursive', 'subdirector', 'subfolder', 'rekurenc', 'podkatalog', 'podfolder']),
      F('-1', ['one per line', 'per line', 'single column', 'one column', 'jeden na linie', 'po jednym', 'w jednej kolumnie', 'jedna kolumna']),
      F('-d', ['directory itself', 'not its contents', 'not the contents', 'sam katalog', 'nie zawartosc']),
      F('-i', ['inode', 'i-wezl', 'i-node']),
      F('-U', ['unsorted', 'no sorting', 'without sorting', 'directory order', 'bez sortowania', 'nieposortowan']),
    ],
  },
  find: {
    head: 'find', args: ['path'], filters: true,
    flags: [
      F('-type f', ['files$', 'file$', 'pliki$', 'plikow$', 'plik$', 'only files', 'tylko pliki'], { group: 'type' }),
      F('-type d', ['director', 'folder', 'katalog', 'dirs$'], { group: 'type' }),
      F('-type l', ['symlink', 'symbolic link', 'dowiazan', 'link symbol'], { group: 'type' }),
      F('-empty', ['empty', 'pust']),
      F('-maxdepth', ['depth', 'levels deep', 'level', 'not recursive', 'top level only', 'glebok', 'poziom', 'bez podkatalog'], { value: 'depth' }),
      F('-iname', ['case insensitive', 'ignore case', 'ignoring case', 'bez wzgledu na wielkosc', 'wielkosc liter']),
      F('-newer', ['newer than']),
      F('-print0', ['null separated', 'print0']),
      F('-executable', ['executable', 'wykonywaln']),
      F('-user', ['owned by', 'belonging to', 'of user', 'nalezace do', 'uzytkownika', 'wlasciciel'], { value: 'user' }),
      F('-name', ['named', 'called', 'nazwan', 'o nazwie', 'nazywaj'], { value: 'fname' }),
    ],
  },
  grep: {
    head: 'grep', args: ['pattern', 'path'],
    flags: [
      F('-i', ['case insensitive', 'case-insensitive', 'ignore case', 'ignoring case', 'any case', 'bez wzgledu na wielkosc', 'wielkosc liter', 'ignoruj wielkosc', 'niezaleznie od wielkosci']),
      F('-n', ['line number', 'numbers of lines', 'with numbers', 'numerami linii', 'numer linii', 'numery linii', 'numerem linii', 'z numerami']),
      F('-r', ['recursive', 'subdirector', 'all files in', 'rekurenc', 'podkatalog', 'w calym katalogu', 'w katalogu$']),
      F('-l', ['only file names', 'only filenames', 'file names only', 'which files', 'list files', 'names of files', 'tylko nazwy plikow', 'nazwy plikow', 'ktore pliki'], { group: 'out' }),
      F('-c', ['count', 'how many lines', 'number of matching', 'ile linii', 'policz', 'zlicz', 'liczba', 'ile razy', 'trafien'], { group: 'out' }),
      F('-v', ['invert', 'not containing', "don't contain", 'do not contain', 'not matching', 'excluding', 'which are not', 'that are not', 'nie zawieraj', 'bez slowa', 'ktore nie', 'odwroc dopasowan']),
      F('-w', ['whole word', 'exact word', 'full word', 'cale slowo', 'calych slow', 'jako slowo']),
      F('-o', ['only the match', 'only matching', 'just the match', 'tylko dopasowan', 'samo dopasowan']),
      F('-E', ['regex', 'extended', 'regular expression', 'wyrazenie regularn']),
      F('-A', ['lines after', 'after each match', 'linii po', 'po kazdym'], { value: 'count' }),
      F('-B', ['lines before', 'before each match', 'linii przed', 'przed kazdym'], { value: 'count' }),
      F('-C', ['context', 'around each match', 'kontekst', 'wokol'], { value: 'count' }),
      F('-h', ['without filename', 'no filename', 'without file name', 'bez nazw plikow', 'bez nazwy pliku']),
    ],
  },
  du: {
    head: 'du', args: ['path'],
    flags: [
      F('-s', ['total', 'summary', 'summar', 'only the total', 'one number', 'lacznie', 'laczny', 'suma', 'podsumow', 'calkowit']),
      F('-h', ['human', 'readable', 'czyteln', 'ludzk'], { group: 'unit' }),
      F('-m', ['megabyte', 'in mb', 'megabajt', 'w mb'], { group: 'unit' }),
      F('-k', ['kilobyte', 'in kb', 'kilobajt', 'w kb'], { group: 'unit' }),
      F('-a', ['all files', 'every file', 'files too', 'including files', 'kazdy plik', 'wszystkie pliki', 'takze pliki', 'rowniez pliki']),
      F('-c', ['grand total', 'total at the end', 'suma na koncu', 'podsumowanie na koncu']),
      F('-d', ['depth', 'level', 'levels', 'each subdirectory', 'every subdirectory', 'glebok', 'poziom', 'kazdego podkatalogu'], { value: 'depth' }),
      F('-x', ['one filesystem', 'same filesystem', 'jeden system plikow', 'tym samym systemie plikow']),
    ],
  },
  df: {
    head: 'df', args: ['path'],
    flags: [
      F('-h', ['human', 'readable', 'gb', 'czyteln', 'ludzk']),
      F('-t', [], { value: 'fstype' }),
      F('-T', ['with type', 'filesystem type', 'types', 'z typem', 'typy system', 'typ systemu']),
      F('-i', ['inode', 'i-node']),
      F('-l', ['local only', 'only local', 'tylko lokaln']),
    ],
  },
  ps: {
    head: 'ps', args: [],
    flags: [
      F('aux', ['all processes', 'every process', 'all users', 'with users', 'wszystkie procesy', 'kazdy proces', 'wszystkich uzytkownik'], { group: 'sel' }),
      F('-ef', ['full format', 'full listing', 'ppid', 'parent', 'pelny format', 'rodzic'], { group: 'sel' }),
      F('--forest', ['tree', 'forest', 'hierarch', 'drzew']),
      F('--sort=-%mem', ['by memory', 'by mem', 'by ram', 'most memory', 'wg pamieci', 'wedlug pamieci', 'po pamieci', 'najwiecej pamieci', 'wg ram'], { group: 'sort' }),
      F('--sort=-%cpu', ['by cpu', 'most cpu', 'wg cpu', 'wedlug cpu', 'po cpu', 'procesora'], { group: 'sort' }),
      F('-u', ['owned by', 'of user', 'for user', 'uzytkownika', 'nalezace do'], { value: 'user' }),
    ],
  },
  tar: {
    head: 'tar', args: ['archive', 'path'],
    flags: [
      F('-c', ['create', 'pack', 'compress', 'archive', 'utworz', 'spakuj', 'stworz', 'zrob archiwum', 'skompresuj'], { group: 'op' }),
      F('-x', ['extract', 'unpack', 'decompress', 'rozpakuj', 'wypakuj', 'rozpakowac', 'wypakowac'], { group: 'op' }),
      F('-t', ['list', 'contents', 'what is in', "what's in", 'show files in', 'zawartosc', 'wylistuj', 'co jest w', 'lista plikow'], { group: 'op' }),
      F('-z', [], { compress: /\.(tar\.gz|tgz)$/ }),
      F('-j', [], { compress: /\.(tar\.bz2|tbz2?)$/ }),
      F('-J', [], { compress: /\.(tar\.xz|txz)$/ }),
      F('-v', ['verbose', 'verbosely', 'show progress', 'szczegol', 'gadatliw', 'pokazuj pliki']),
      F('-f', [], { always: true }),
      F('-C', ['into', 'to directory', 'do katalogu', 'do folderu', 'w katalogu docelowym'], { value: 'dest' }),
    ],
  },
  sort: {
    head: 'sort', args: ['file'],
    flags: [
      F('-r', ['reverse', 'descending', 'largest first', 'highest first', 'malejaco', 'odwrot', 'od najwieksz']),
      F('-n', ['numeric', 'numerically', 'as numbers', 'numeryczn', 'liczbowo', 'jak liczby']),
      F('-h', ['human readable', 'human-readable', 'sizes like', 'czytelne rozmiary']),
      F('-u', ['unique', 'deduplicate', 'without duplicates', 'remove duplicates', 'unikal', 'bez duplikat', 'usun duplikat']),
      F('-f', ['ignore case', 'case insensitive', 'bez wzgledu na wielkosc']),
      F('-t', ['separated by', 'delimiter', 'separator', 'oddzielon', 'rozdzielon'], { value: 'sep' }),
      F('-k', ['column', 'field', 'kolumn', 'pole', 'polu'], { value: 'column' }),
    ],
  },
  head: {
    head: 'head', args: ['file'],
    flags: [F('-c', ['bytes', 'bajt'], { value: 'count' }), F('-n', [], { value: 'count', implied: true })],
  },
  tail: {
    head: 'tail', args: ['file'],
    flags: [
      F('-c', ['bytes', 'bajt'], { value: 'count' }),
      F('-n', [], { value: 'lines', implied: true }),
      F('-f', ['follow', 'live', 'watch', 'as it grows', 'na biezaco', 'na zywo', 'sledz', 'obserwuj']),
    ],
  },
  wc: {
    head: 'wc', args: ['file'],
    flags: [
      F('-l', ['lines', 'line count', 'linii', 'linie', 'wierszy']),
      F('-w', ['words', 'word count', 'slow', 'wyrazow']),
      F('-c', ['bytes', 'bajt']),
      F('-m', ['characters', 'chars', 'znakow', 'znaki']),
    ],
  },
  git: {
    head: 'git', sub: {
      log: { triggers: ['log', 'history', 'commits', 'historia', 'historie', 'commity', 'commitow'], args: [],
        flags: [
          F('--oneline', ['one line', 'oneline', 'compact', 'short', 'jednej linii', 'jedna linia', 'w skrocie', 'zwiezl']),
          F('--graph', ['graph', 'tree', 'graf', 'drzew']),
          F('-n', ['last', 'latest', 'recent', 'ostatni'], { value: 'count' }),
          F('--author', ['by author', 'author', 'autor', 'from user'], { value: 'user' }),
          F('--stat', ['stat', 'changed files', 'files changed', 'statyst', 'zmienione pliki']),
          F('-p', ['patch', 'with diff', 'with changes', 'z diffem', 'ze zmianami']),
          F('--all', ['all branches', 'wszystkich galezi', 'wszystkie galezie']),
          F('--decorate', ['decorate', 'with refs', 'tags and branches']),
          F('--reverse', ['oldest first', 'reverse', 'chronolog', 'od najstarsz']),
          F('--merges', ['only merges', 'merge commits', 'tylko merge']),
          F('--no-merges', ['without merges', 'no merges', 'bez merge']),
        ] },
      branch: { triggers: ['branch', 'branches', 'galez', 'galezi', 'branche', 'branchy'], args: [],
        flags: [
          F('-a', ['all', 'including remote', 'wszystkie', 'z zdalnymi', 'lacznie ze zdalnymi'], { group: 'sel' }),
          F('-r', ['remote only', 'only remote', 'remote branches', 'tylko zdalne', 'zdalne galezie'], { group: 'sel' }),
          F('-v', ['verbose', 'last commit', 'with commit', 'ostatnim commitem', 'z commitem', 'szczegol']),
          F('--merged', ['merged', 'zmergowane', 'scalone']),
          F('--no-merged', ['not merged', 'unmerged', 'niezmergowane', 'nie scalone', 'niescalone']),
        ] },
      diff: { triggers: ['diff', 'changes', 'changed', 'difference', 'zmiany', 'zmienion', 'roznice', 'roznica'], args: ['ref'],
        flags: [
          F('--staged', ['staged', 'cached', 'index', 'w indeksie', 'staged', 'dodane']),
          F('--stat', ['stat', 'summary', 'which files', 'statyst', 'podsumow', 'ktore pliki']),
          F('--name-only', ['names only', 'only names', 'file names', 'tylko nazwy', 'nazwy plikow']),
          F('-w', ['ignore whitespace', 'ignoring whitespace', 'bez bialych znakow', 'ignoruj biale']),
          F('--word-diff', ['word diff', 'by word', 'per word', 'slowami', 'po slowach']),
        ] },
      status: { triggers: ['status', 'stan'], args: [],
        flags: [F('-s', ['short', 'compact', 'krotk', 'zwiezl']), F('-b', ['branch', 'galez'])] },
    },
  },
  docker: {
    head: 'docker', sub: {
      ps: { triggers: ['container', 'kontener', 'ps$', 'running'], args: [],
        flags: [
          F('-a', ['all', 'stopped', 'including stopped', 'wszystkie', 'zatrzymane']),
          F('-q', ['only ids', 'ids only', 'just ids', 'only the ids', 'quiet', 'tylko id', 'same id', 'identyfikator']),
          F('-s', ['size', 'sizes', 'rozmiar']),
          F('--no-trunc', ['full', 'not truncated', 'no trunc', 'untruncated', 'pelne', 'nieobciet', 'bez obcinania']),
          F('-l', ['latest', 'last created', 'most recent', 'ostatnio utworzony', 'najnowszy']),
          F('-n', ['last', 'ostatnie'], { value: 'count' }),
        ] },
      images: { triggers: ['image', 'obraz'], args: [],
        flags: [
          F('-a', ['all', 'intermediate', 'wszystkie', 'posrednie']),
          F('-q', ['only ids', 'ids only', 'just ids', 'quiet', 'tylko id', 'same id', 'identyfikator']),
          F('--no-trunc', ['full', 'not truncated', 'pelne', 'bez obcinania']),
          F('--digests', ['digest', 'skrot']),
        ] },
    },
  },
  ss: {
    head: 'ss', args: [],
    flags: [
      F('-t', ['tcp']), F('-u', ['udp']), F('-l', ['listening', 'listen', 'nasluch']),
      F('-n', ['numeric', 'numbers', "don't resolve", 'no dns', 'numerycz', 'bez rozwiazywania']),
      F('-p', ['process', 'pid', 'program', 'proces']), F('-a', ['all', 'wszystkie']),
      F('-s', ['summary', 'statistics', 'podsumow', 'statyst']),
    ],
  },
  journalctl: {
    head: 'journalctl', args: [],
    flags: [
      F('-u', ['service', 'unit', 'uslug', 'serwis'], { value: 'name' }),
      F('-f', ['follow', 'live', 'na biezaco', 'na zywo', 'sledz']),
      F('-n', ['last', 'lines', 'ostatni', 'linii'], { value: 'count' }),
      F('-b', ['this boot', 'current boot', 'since boot', 'od startu', 'od uruchomienia', 'biezacego rozruchu']),
      F('-k', ['kernel', 'jadr']),
      F('-r', ['reverse', 'newest first', 'odwrot', 'najnowsze najpierw']),
      F('-p err', ['error', 'errors', 'bled', 'bledy']),
      F('--since', ['since', 'last', 'from', 'od', 'ostatni'], { value: 'since' }),
      F('--no-pager', [], { always: true }),
    ],
  },
  curl: {
    head: 'curl', args: ['url'],
    flags: [
      F('-I', ['headers', 'head request', 'naglowk'], { group: 'm' }),
      F('-L', ['follow redirect', 'redirects', 'przekierowan']),
      F('-s', ['silent', 'quiet', 'cicho', 'bez paska']),
      F('-O', ['download', 'save', 'pobierz', 'zapisz'], { group: 'out' }),
      F('-v', ['verbose', 'debug', 'szczegol']),
      F('-k', ['insecure', 'ignore certificate', 'self-signed', 'bez weryfikacji', 'ignoruj certyfikat']),
      F('--compressed', ['compressed', 'gzip', 'kompresj']),
    ],
  },
  chmod: {
    head: 'chmod', args: ['mode', 'path'],
    flags: [F('-R', ['recursive', 'recursively', 'everything inside', 'rekurenc', 'wszystko w srodku', 'cal']), F('-v', ['verbose', 'szczegol'])],
  },
};

// tldr-derived weak triggers: { head: { flag: [stems] } } (CC-BY-4.0 tldr-pages, see DATA_LICENSES.md)
let TLDR = null;
function tldrTriggers() {
  if (TLDR) return TLDR;
  try { TLDR = JSON.parse(readFileSync(new URL('../model/tldr_triggers.json', import.meta.url), 'utf8')); } catch { TLDR = {}; }
  return TLDR;
}

const FAMILY_TOOL = { ls: 'ls', find: 'find', grep: 'grep', du: 'du', df: 'df', ps: 'ps', tar: 'tar', sort: 'sort',
  head: 'head', tail: 'tail', wc: 'wc', git: 'git', docker: 'docker', ss: 'ss', journalctl: 'journalctl', curl: 'curl', chmod: 'chmod' };
export const composerTools = () => Object.keys(FAMILY_TOOL);

function triggerScore(fq, triggers) {
  let best = 0;
  for (const t of triggers) {
    const whole = t.endsWith('$');
    const w = foldKeepLength(whole ? t.slice(0, -1) : t).toLowerCase();
    const re = new RegExp(`\\s${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${whole ? '\\s' : ''}`);
    if (re.test(fq)) best = Math.max(best, 1 + Math.min(w.length, 20) / 100);
  }
  return best;
}
const STOP = new Set('the a an of in on to for and or with by from all show list display me my files file plik pliki w z na do i oraz pokaz wyswietl'.split(' '));
function tldrScore(fq, stems) {
  if (!stems?.length) return 0;
  const toks = new Set(fq.trim().split(/\s+/).filter((t) => t.length > 2 && !STOP.has(t)).map((t) => t.slice(0, 5)));
  let hit = 0;
  for (const s of stems) if (toks.has(s)) hit++;
  return hit >= 2 ? 0.5 * hit : 0;
}

function selectFlags(fq, spec, head, sub) {
  const tl = tldrTriggers()[head + (sub ? ' ' + sub : '')] || {};
  const scored = spec.flags.map((f) => ({ ...f, score: f.always || f.implied || f.compress ? 1 : triggerScore(fq, f.triggers) + tldrScore(fq, tl[f.flag]) }))
    .filter((f) => f.score >= 1);
  // one flag per exclusive group (highest score, then earliest in vocabulary)
  const out = [];
  const groups = new Set();
  for (const f of scored.sort((a, b) => b.score - a.score)) {
    if (f.group) { if (groups.has(f.group)) continue; groups.add(f.group); }
    out.push(f);
  }
  return out.sort((a, b) => spec.flags.indexOf(spec.flags.find((x) => x.flag === a.flag)) - spec.flags.indexOf(spec.flags.find((x) => x.flag === b.flag)));
}

/** Flags whose triggers fire for this request with `toolFamily`'s vocabulary (used to build the explained-flags table). */
export function triggeredFlags(query, toolFamily) {
  const tn = FAMILY_TOOL[toolFamily];
  if (!tn) return [];
  const fq = fold(query);
  const spec = TOOLS[tn];
  const subs = spec.sub ? Object.entries(spec.sub) : [[null, spec]];
  const out = [];
  for (const [sub, fspec] of subs) {
    for (const f of selectFlags(fq, fspec, spec.head, sub)) if (!f.always && !f.implied && !f.compress) out.push((sub ? sub + ' ' : '') + f.flag);
  }
  return out;
}

/** Validate a composed command: flags must come from the tool vocabulary; POSIX syntax via `bash -n`. */
export function validateComposed(cmd, toolName, sub) {
  const spec = TOOLS[toolName];
  const vocab = new Set((sub ? spec.sub[sub].flags : spec.flags).flatMap((f) => f.flag.split(' ')[0]));
  if (spec.filters) for (const x of ['-name', '-iname', '-mtime', '-mmin', '-size', '-type', '-maxdepth', '-empty', '-newer', '-print0', 'f', 'd', 'l']) vocab.add(x);
  const words = cmd.match(/'(?:[^']|'\\'')*'|\S+/g) || [];
  for (const w of words.slice(sub ? 2 : 1)) {
    if (!/^-/.test(w)) continue;
    const base = w.replace(/=.*$/, '');
    if (!vocab.has(w) && !vocab.has(base) && !/^-\d+$/.test(w) && !/^[-+]\d/.test(w)) return { ok: false, error: `flag ${w} not in the ${toolName} vocabulary` };
  }
  const r = spawnSync('bash', ['-n', '-c', cmd], { encoding: 'utf8', timeout: 2000 });
  if (r.error) return { ok: true, syntax: 'skipped (bash not found)' };
  if (r.status !== 0) return { ok: false, error: `bash -n: ${r.stderr.trim()}` };
  return { ok: true, syntax: 'bash -n ok' };
}

/**
 * @param query   request text
 * @param tools   stage-1 candidates [{tool, p}] (top-3)
 * @param ex      slot extraction for the query (regex+tagger merge): { paths, count, size, duration, ext, quoted, ... }
 * @param patternOf callback(toolFamily) -> pattern text (tagger PATTERN / quoted) or null
 * -> null | { command, tool, sub, flags, risk, warnings, validation, experimental: true }
 */
export function compose(query, tools, ex, { patternOf, nameOf } = {}) {
  const fq = fold(query);
  let best = null;
  for (const { tool: fam, p } of tools) {
    const tn = FAMILY_TOOL[fam];
    if (!tn) continue;
    const spec = TOOLS[tn];
    let sub = null;
    let fspec = spec;
    if (spec.sub) {
      let bs = 0;
      for (const [name, s] of Object.entries(spec.sub)) {
        const sc = triggerScore(fq, s.triggers);
        if (sc > bs) { bs = sc; sub = name; }
      }
      if (!sub) continue;
      fspec = spec.sub[sub];
    }
    const flags = selectFlags(fq, fspec, spec.head, sub);
    const hits = flags.filter((f) => !f.always && !f.implied && !f.compress).length;
    const score = p * (1 + hits);
    if (!best || score > best.score) best = { score, tn, sub, fspec, flags, p, hits };
  }
  if (!best || best.hits === 0) return null;
  const { tn, sub, fspec, flags } = best;
  const spec = TOOLS[tn];
  const parts = [spec.head];
  if (sub) parts.push(sub);
  const q = shQuote;
  const valueOf = (kind) => {
    switch (kind) {
      case 'count': return ex.count != null ? String(ex.count) : null;
      case 'depth': return ex.count != null && ex.count <= 20 ? String(ex.count) : '1';
      case 'user': return nameOf?.('USER') || null;
      case 'name': return nameOf?.('NAME') || null;
      case 'since': return ex.duration?.since ? q(ex.duration.since) : null;
      case 'dest': return ex.paths[1] ? q(ex.paths[1]) : null;
      case 'sep': {
        const m = query.match(/(?:by|przez)\s+(['"]?)([,;:|\t])\1/);
        if (m) return q(m[2]);
        const w = fq.match(/\b(comma|przecin\w*|semicolon|srednik\w*|colon|dwukrop\w*|tab\w*|pipe)\b/);
        return w ? q({ c: ',', p: ',', s: ';', d: ':', t: '\t' }[/^(comma|przec)/.test(w[1]) ? 'c' : /^(semi|sred)/.test(w[1]) ? 's' : /^(colon|dwuk)/.test(w[1]) ? 'd' : /^tab/.test(w[1]) ? 't' : 'p'] || '|') : null;
      }
      case 'column': {
        const ord = fq.match(/\b(first|second|third|fourth|fifth|pierwsz\w*|drug\w*|trzeci\w*|czwart\w*|piat\w*)\b/);
        if (ord) return String(['fir', 'sec', 'thi', 'fou', 'fif'].indexOf(ord[1].slice(0, 3)) + 1 || ['pie', 'dru', 'trz', 'czw', 'pia'].indexOf(ord[1].slice(0, 3)) + 1);
        return ex.count != null ? String(ex.count) : null;
      }
      case 'lines': {
        if (ex.count == null) return null;
        return /\b(from line|starting at line|od linii|od wiersza|poczawszy od)\b/.test(fq) ? `+${ex.count}` : String(ex.count);
      }
      case 'fstype': { const m = fq.match(/\b(ext[234]|xfs|btrfs|tmpfs|nfs4?|vfat|ntfs|zfs|apfs|overlay|squashfs)\b/); return m ? m[1] : null; }
      case 'fname': {
        const m = query.match(/(?:named|called|nazwan\w*|o nazwie|nazywaj\w* si[eę])\s+["']?([\w.*?-]+)/i);
        return m ? q(m[1]) : nameOf?.('NAME') ? q(nameOf('NAME')) : null;
      }
      case 'user': {
        const m = query.match(/(?:user|owned by|belonging to|u[zż]ytkownik\w*|w[lł]a[sś]ciciel\w*|nale[zż][aą]ce do)\s+([a-z_][\w-]*)/i);
        return m ? m[1] : nameOf?.('USER') || null;
      }
      default: return null;
    }
  };
  const used = [];
  const archive = ex.paths.find((x) => /\.(tar(\.\w+)?|tgz|tbz2?|txz)$/.test(x));
  for (const f of flags) {
    if (f.compress) { if (archive && f.compress.test(archive)) { parts.push(f.flag); used.push(f.flag); } continue; }
    if (f.value) {
      const v = valueOf(f.value);
      if (v == null) continue;
      if (f.flag.startsWith('--')) parts.push(`${f.flag}=${v}`);
      else parts.push(f.flag, v);
    } else if (f.flag === '-f' && tn === 'tar') {
      continue; // added with the archive below
    } else parts.push(f.flag);
    used.push(f.flag);
  }
  // tool-specific arguments
  const paths = [...ex.paths];
  if (tn === 'find') {
    parts.splice(1, 0, q(paths[0] || '.'));
    if (ex.ext && !used.includes('-name')) parts.push(used.includes('-iname') ? '-iname' : '-name', q(`*.${ex.ext}`));
    if (ex.duration) parts.push(ex.duration.age.split(' ')[0], ex.duration.age.split(' ')[1]);
    if (ex.size) parts.push('-size', (/\b(smaller|less|under|below|mniejsz|ponizej)\b/.test(fq) ? '-' : '+') + ex.size);
    // move -maxdepth right after the path (find warns otherwise)
    const i = parts.indexOf('-maxdepth');
    if (i > 2) { const v = parts.splice(i, 2); parts.splice(2, 0, ...v); }
  } else if (tn === 'grep') {
    const pat = patternOf?.() ?? null;
    if (!pat) return null;
    if (ex.ext && used.includes('-r')) parts.push(`--include=${q(`*.${ex.ext}`)}`);
    parts.push('--', q(pat));
    if (paths.length) parts.push(...paths.map(q));
    else if (used.includes('-r')) parts.push('.');
  } else if (tn === 'tar') {
    const arch = paths.find((x) => /\.(tar(\.\w+)?|tgz|tbz2?|txz)$/.test(x));
    if (!arch) return null;
    parts.push('-f', q(arch));
    const rest = paths.filter((x) => x !== arch && !(used.includes('-C') && x === paths[1]));
    if (used.includes('-c')) parts.push(...(rest.length ? rest : ['.']).map(q));
  } else if (tn === 'chmod') {
    if (!ex.mode || !paths.length) return null;
    parts.push(ex.mode, ...paths.map(q));
  } else if (tn === 'curl') {
    const url = ex.urls?.[0] || (ex.hosts?.[0] ? `https://${ex.hosts[0]}` : null);
    if (!url) return null;
    parts.push(q(url));
  } else if ((fspec.args || []).includes('ref')) {
    const ref = nameOf?.('BRANCH') || query.match(/(?:against|compared to|vs\.?|w stosunku do|wzgl[eę]dem|do)\s+([\w./-]+)\s*$/i)?.[1];
    if (ref) parts.push(q(ref));
    else if (paths.length) parts.push('--', ...paths.map(q));
  } else if ((fspec.args || []).includes('path') || (fspec.args || []).includes('file')) {
    if (paths.length) parts.push(...paths.slice(0, 2).map(q));
    else if ((fspec.args || []).includes('file') && !['ls', 'du', 'df'].includes(tn)) return null;
  }
  const command = parts.join(' ');
  const validation = validateComposed(command, tn, sub);
  if (!validation.ok) return { command, tool: tn, sub, flags: used, invalid: validation.error, experimental: true };
  const d = checkDanger(command, 'medium');
  const triggered = flags.filter((f) => !f.always && !f.implied && !f.compress).map((f) => f.flag).filter((f) => used.includes(f));
  return { command, tool: tn, sub, flags: used, triggered, risk: maxRisk('medium', d.risk), warnings: d.warnings, critical: d.critical, validation, experimental: true };
}
