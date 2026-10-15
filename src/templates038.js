// catalog-038: the 11 catalog templates added in 0.3.8 (git diff --stat / --name-only, git show --stat, git worktree
// list / add, pretty-printing a JSON file, a local HTTP server, creating a virtualenv, opening a file or URL with the
// default app, pip list, npm outdated). Like the 0.3.4 templates (src/fill.js newTemplateSlots / newTemplateWithhold):
// values are explicit only (never guessed from the tagger), and a request with a restriction, option or second action
// the template cannot express is withheld (`missing`), never rendered without it.

/** The 0.3.8 template intents (the two-model gate in src/pipeline.js reads this list). */
export const CATALOG_038 = ['git_diff_stat', 'git_diff_names', 'git_show_files', 'git_worktree_list', 'git_worktree_add',
  'json_pretty', 'http_server', 'venv_create', 'open_file', 'pip_list', 'npm_outdated'];
export const IS_038 = new Set(CATALOG_038);
// not in this release (review): recognised by the templates model but always withheld, like the 0.3.4 git grep / git show,
// so their requests never fall through to a different 0.3.3 answer
export const DISABLED_038 = new Set(['open_file', 'http_server', 'json_pretty', 'git_worktree_add', 'venv_create', 'git_show_files']);

const REF_TOKEN = /(?:^|\s)((?:HEAD|@)(?:[~^]\d*)*|(?=[0-9a-f]*\d)[0-9a-f]{7,40}|v\d+(?:\.\d+)*)(?=[\s,.;:!?]|$)/;
const REF_SHAPE = /^[\w./~^@-]+$/;
// words that are never a revision / branch / file name after a preposition
const NOT_VALUE = /^(?:the|a|an|my|our|this|that|it|last|latest|previous|current|commit|commits|branch|branche?s?|head|repo|repository|file|files|folder|directory|dir|new|separate|another|other|working|tree|worktree|ostatni\w*|poprzedni\w*|bieżąc\w*|biezac\w*|gałęzi|galezi|gałąź|galaz|commita|nowy\w*|nowej|osobn\w*|katalog\w*|folder\w*|pliku?|default|domyśln\w*|domysln\w*|app|application|aplikacj\w*|browser|przeglądar\w*|przegladar\w*|port)$/i;
const PATHISH = /^(?:\.{1,2}(?:[\/\\]\S*)?|~[\/\\]\S*|[\/\\]\S+|[a-z]:[\/\\]\S*|\S+[\/\\]\S*)$/i;
const RELATIVE = /\b(?:previous|prior|parent|before|one\s+before|second[- ]to[- ]last|przedostatni\w*|poprzedni\w*|wcześniejsz\w*|wczesniejsz\w*|rodzic\w*)\b/i;
// values the templates render without the request naming them (never taken from history)
const DEFAULTS = { git_show_files: { rev: ['HEAD', 'HEAD~1'] }, venv_create: { path: ['.venv'] } };
const unq = (s) => String(s).replace(/^(["'])(.*)\1$/, '$2');

/** Explicit slot values for the 0.3.8 templates (`v` is the extracted slots, edited in place). */
export function slots038(id, text, v, quoted = []) {
  const t = String(text).trim();
  const keep = {};
  if (id === 'git_diff_stat' || id === 'git_diff_names') {
    // 0.3.8: staged changes (--cached) are not rendered: a request about the index is withheld (staged words are not vocabulary)
    const lit = t.match(/\bgit\s+diff\s+(?:--(?:cached|staged)\s+)?(?:--stat|--name-only)\s+([^\s"']+)\s*$/i) || t.match(/\bgit\s+diff\s+(?:--(?:cached|staged)\s+)?([^\s"'-][^\s"']*)\s+(?:--stat|--name-only)\s*$/i);
    const prep = t.match(/\b(?:against|vs\.?|versus|compared\s+(?:to|with)|relative\s+to|since|from|between|względem|wzgledem|w\s+por[oó]wnaniu\s+z|od|do)\s+(?:the\s+)?(?:branch\s+|commit\s+|gałęzi\s+|galezi\s+)?(["']?)([^\s"']+)\1(?=[\s,.;!?]*$|\s)/i);
    const m = t.match(REF_TOKEN);
    const cand = lit ? lit[1] : prep && !NOT_VALUE.test(prep[2]) ? prep[2] : m ? m[1] : null;
    if (cand != null && REF_SHAPE.test(cand) && !cand.startsWith('-')) keep.rev = cand;
  }
  if (id === 'git_show_files') {
    const lit = t.match(/\bgit\s+show\s+--stat\s+([^\s"']+)\s*$/i) || t.match(/\b(?:commit|revision|tag|rewizj\w*|commicie|commita)\s+(["']?)([^\s"']+)\1(?=[\s,.;!?]*$|\s)/i);
    const m = t.match(REF_TOKEN);
    const litVal = lit ? lit[2] ?? lit[1] : null;
    const litOk = litVal != null && (/^git\s+show/i.test(lit[0]) || /[\d~^@:\/]/.test(litVal) || /^HEAD$/i.test(litVal));
    const cand = litOk ? litVal : m ? m[1] : null;
    if (cand != null && REF_SHAPE.test(cand) && !cand.startsWith('-')) keep.rev = cand;
    else if (RELATIVE.test(t)) keep.rev = 'HEAD~1';
  }
  if (id === 'git_worktree_add') {
    const lit = t.match(/\bgit\s+worktree\s+add\s+(["']?)([^\s"']+)\1\s+(["']?)([^\s"']+)\3\s*$/i);
    if (lit) { keep.path = lit[2]; keep.branch = lit[4]; } else {
      for (const p of t.matchAll(/(?<![\p{L}\d_])(?:at|in|into|to|under|inside|w|we|do|pod)\s+(?:the\s+)?(?:(?:folder|directory|dir|path|katalogu|folderze|ścieżce|sciezce)\s+)?(["']?)([^\s"']+)\1(?=[\s,.;!?]*$|\s)/giu)) {
        if ((p[1] || PATHISH.test(p[2])) && !NOT_VALUE.test(p[2])) { keep.path = p[2]; break; }
      }
      for (const b of t.matchAll(/(?<![\p{L}\d_])(?:branch|for|of|from|check\s*out|gałęzi|galezi|gałęź|galez|dla|z)\s+(?:the\s+)?(?:branch\s+|gałęzi\s+|galezi\s+)?(["']?)([^\s"']+)\1(?=[\s,.;!?]*$|\s)/giu)) {
        if (!NOT_VALUE.test(b[2]) && /^[\w./-]+$/.test(b[2]) && !b[2].startsWith('-') && b[2] !== keep.path && !PATHISH.test(b[2].replace(/^[\w-]+\/[\w.-]+$/, 'x'))) { keep.branch = b[2]; break; }
      }
    }
  }
  if (id === 'json_pretty' || id === 'open_file') {
    const url = id === 'open_file' ? t.match(/(?:^|\s)(https?:\/\/[^\s"'<>]+)/i) : null;
    const lit = id === 'json_pretty'
      ? t.match(/\bjq\s+(?:'\.'|"\."|\.)\s+(["']?)([^\s"']+)\1\s*$/i) || t.match(/(?:^|\s)python3?\s+-m\s+json\.tool\s+(["']?)([^\s"']+)\1\s*$/i)
      : t.match(/^(?:open|xdg-open|start|invoke-item|ii)\s+(["']?)([^\s"']+)\1\s*$/i);
    const named = t.match(/(?:^|\s)(["']?)([^\s"']+\.[A-Za-z0-9]{1,8})\1(?=[\s,.;!?]*$|\s)/);
    if (url) keep.file = url[1];
    else if (quoted.length === 1) keep.file = quoted[0];
    else if (lit && !NOT_VALUE.test(lit[2])) keep.file = lit[2];
    else if (named && !/^(?:e\.g|i\.e|etc|json\.tool)$/i.test(named[2]) && !/^\d+(?:\.\d+)*$/.test(named[2])) keep.file = named[2];
    else { const f = t.match(/\b(?:file|plik|pliku)\s+(["']?)([^\s"']+)\1(?=[\s,.;!?]*$|\s)/i); if (f && (f[1] || PATHISH.test(f[2]))) keep.file = f[2]; }
  }
  if (id === 'http_server') {
    const m = t.match(/\bhttp\.server\s+(\d+)\b/i) || t.match(/\b(?:port|porcie|portu|portem)\s*[:=]?\s*(\d+)\b/i) || t.match(/(?:\bon|\bna|\bat|(?:^|\s)localhost)?\s*:(\d+)\b/i) || t.match(/\b(?:on|na)\s+(\d+)\s*$/i);
    if (m) keep.port = m[1];
  }
  // venv_create: always .venv (a named venv / path in the request is withheld by withhold038)
  for (const k of ['rev', 'cached', 'path', 'file', 'branch', 'port', 'url', 'name', 'pattern', 'count', 'pkg', 'script', 'args', 'scope']) delete v[k];
  Object.assign(v, keep);
  if (keep.file != null) v.file = unq(keep.file);
  return v;
}

// Words each 0.3.8 template explains; anything else in the request is a restriction / option it cannot express.
const COMMON = `the a an me my our this that these please pls now just can could you would i want to need how do did does have has any if show display print list
  give get see what which are is of for in on with from current here git all every
  pokaż pokaz wyświetl wyswietl wypisz podaj daj mi mnie proszę prosze teraz jak jakie które ktore co są sa jest tego tej ten ta w z na do dla wszystkie
  chcę chce lista moje mam się sie przez`;
const WORDS = {
  git_diff_stat: `diff diffs stat stats statistic statistics summary summarise summarize overview changes changed change lines line count counts
    per file files how many much was were insertions deletions added removed --stat uncommitted unstaged working tree
    against vs vs. versus compared compare relative since between branch commit last
    each every per podsumowanie statystyki statystyk zmian plikach każdym kazdym zmieniono zmieniło zmienilo gicie diffa zmiany zmienione zmienionych linii linie ile plików plikow pliku plik dodanych usuniętych usunietych
    względem wzgledem porównaniu porownaniu porównaj porownaj od gałęzi galezi gałąź galaz commita ostatniego zatwierdzonych niezatwierdzonych`,
  git_diff_names: `diff only just names name filenames file files paths changed modified touched changes differ different --name-only
    uncommitted unstaged working tree against vs vs. versus compared compare relative since between branch commit last which have has been
    nazwy nazw plików plikow pliki zmienione zmienionych zmodyfikowane zmodyfikowanych zmieniły zmienily tylko się sie różnią roznia względem wzgledem
    porównaniu porownaniu od gałęzi galezi gałąź galaz commita ostatniego niezatwierdzone touch touched did were
    zmieniłem zmienilem zmieniłam zmienilam diffa gicie zmodyfikowanych`,
  git_show_files: `show --stat files file changed modified touched changes stat stats summary last latest newest recent most previous prior commit
    went into were was in by included part made has had one before second-to-last revision tag what which
    pliki plików plikow plik zmienione zmienionych zmieniono zmienił zmienil ostatni ostatnim ostatniego poprzedni poprzednim poprzedniego przedostatni
    przedostatnim commit commicie commita commitem rewizji tagu tag weszły weszly były byly change modify did zmodyfikowane statystyki podsumowanie weszło weszlo co`,
  git_worktree_list: `worktree worktrees work trees tree working list listing all every existing linked checkouts checked out exist there have i we
    repo repository branches any drzewa drzewo drzew robocze roboczych worktreey istnieją istnieja wszystkich gicie lista listę liste wylistuj istniejące istniejace podpięte podpiete mam`,
  git_worktree_add: `worktree work tree working add create new make set up setup separate another second extra checkout check out branch for of at in into to under inside
    folder directory dir path
    utwórz utworz stwórz stworz dodaj nowe nowy nowym nowego drzewo robocze roboczego worktree worktreea osobnym osobny osobnej osobne katalogu katalog folderze folder
    gałęzi galezi gałąź galaz dla pod ścieżce sciezce`,
  json_pretty: `pretty print pretty-print prettify format formatted reformat indent indented beautify nicely readable human readable view json file plik pliku
    jq . python -m json.tool contents content nice make printed form
    ładnie ladnie sformatuj sformatowany sformatowanego czytelnie czytelny czytelnej formie wcięciami wcieciami zawartość zawartosc`,
  http_server: `start run launch serve serving host hosting spin up local localhost simple quick static http web server webserver files directory folder dir here this
    port on at over locally python python3 -m http.server
    uruchom odpal postaw wystaw serwuj serwer lokalny lokalnie prosty statyczny www pliki katalog folder bieżący biezacy tutaj tu porcie port przez bieżącym biezacym bieżącego biezacego katalogu folderu`,
  venv_create: `.venv create make new set up setup init initialize python python3 virtual virtualenv venv env environment -m named called in into at folder directory dir
    utwórz utworz stwórz stworz załóż zaloz nowe nowy nowego wirtualne wirtualnego środowisko srodowisko pythona o nazwie nazwie katalogu folderze`,
  open_file: `open launch view start file url link page website site document picture image pdf with default app application program its viewer browser
    xdg-open invoke-item ii in
    otwórz otworz plik pliku link stronę strone dokument obrazek zdjęcie zdjecie domyślnej domyslnej domyślnym domyslnym aplikacji programie programem przeglądarce przegladarce`,
  pip_list: `pip pip3 python python3 -m list listing installed packages package libraries library modules versions version which what are have i we
    has pythona pythonie pakiety pakietów pakietow zainstalowane zainstalowanych biblioteki bibliotek moduły moduly wersje lista listę liste wylistuj mam`,
  npm_outdated: `npm outdated old stale out of date dependencies dependency deps packages package newer updates available versions version which what are
    have there check any for project if
    przestarzałe przestarzale nieaktualne stare zależności zaleznosci pakiety pakietów pakietow nowsze aktualizacje aktualizacji dostępne dostepne wersje sprawdź sprawdz czy są projektu projekcie przestarzałych przestarzalych nieaktualnych dostępnymi dostepnymi aktualizacjami mają maja`,
};
const VOCAB = Object.fromEntries(Object.entries(WORDS).map(([k, s]) => [k, new Set(`${COMMON} ${s}`.split(/\s+/).filter(Boolean).map((w) => w.toLowerCase()))]));
// the slots each template renders (only these explain words of the request)
const RENDERED = { git_diff_stat: ['rev'], git_diff_names: ['rev'], git_show_files: ['rev'], git_worktree_add: ['path', 'branch'], json_pretty: ['file'],
  http_server: ['port'], venv_create: [], open_file: ['file'], git_worktree_list: [], pip_list: [], npm_outdated: [] };
// (Unicode-aware word edges: `\b` would see a word break inside `zależności`)
const SECOND = /(?<![\p{L}\d_])(?:and|but|then|plus|afterwards|also|too|additionally|after\s+that|oraz|ale|potem|następnie|nastepnie|też|tez|również|rowniez|dodatkowo)(?![\p{L}\d_])/iu;
// Polish "i" (and); not the English pronoun ("which worktrees do i have", "the files i changed")
const SECOND_I = /(?<!(?:^|\s)(?:do|did|can|could|would|should|will|what|which|that|files|packages|branches|worktrees))\s+i\s+(?!(?:have|had|changed|touched|modified|edited|made|need|want|am|can|use|got|did)(?![\p{L}\d_]))/iu;
const NEGATION = /(?<![\p{L}\d_])(?:no|not|without|except|excluding|never|don'?t|bez|nie|oprócz|oprocz|poza)(?![\p{L}\d_])/iu;
// one listed pair is one thing, not two actions ("insertions and deletions", "dodanych i usuniętych")
const PAIR = /(?<![\p{L}\d_])(insertions|added|lines added|packages|dodanych|dodane)\s+(?:and|i)\s+(deletions|removed|versions|usuniętych|usunietych|usunięte|usuniete)(?![\p{L}\d_])/giu;
// a file opened with the default app that would run as a program (or script) instead of being viewed
const EXEC_EXT = /\.(?:exe|com|bat|cmd|ps1|psm1|vbs|vbe|js|jse|wsf|wsh|msi|msp|scr|pif|cpl|hta|jar|app|command|tool|sh|bash|zsh|csh|py|pyw|pl|rb|run|bin|appimage|desktop|lnk|url|scpt|workflow|pkg|dmg|deb|rpm)$/i;

/**
 * Why a suggestion for one of the 0.3.8 templates must not run as is ([] : fine). The pipeline puts these in `missing`.
 */
export function withhold038(id, text, slots = {}) {
  // an apostrophe inside a word is not a quote (`worktree'y`, `zastageowanych`, `don't`)
  const t = String(text).trim().replace(/(?<=[A-Za-z])'(?=[a-z]{1,9}(?![\p{L}\d_]))/gu, '').replace(PAIR, '$1 $2');
  if (/[\r\n\t\v\f\u0085\u2028\u2029]/.test(t)) return ['request (spans several lines)'];
  if (/[^\x20-\x7eąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/u.test(t) || /`/.test(t)) return ['value (characters outside ASCII / Polish letters)'];
  const out = [];
  const vals = (RENDERED[id] || []).map((k) => slots[k]).filter((x) => x != null).map((x) => String(x).toLowerCase());
  // each rendered value explains one occurrence; quoted text is one token
  const left = [...vals];
  const toks = [];
  for (const m of t.matchAll(/(["'])([^"']*)\1|(\S+)/g)) {
    if (m[2] != null) { toks.push({ w: m[2].toLowerCase(), q: true }); continue; }
    const c = m[3].replace(/^[(]+|[),;:!?]+$/g, '').replace(/(?<=[^.])\.$/, '').toLowerCase();
    if (c) toks.push({ w: c, q: false });
  }
  const rest = [];
  for (const { w, q } of toks) {
    const i = left.indexOf(w);
    if (i >= 0) { left.splice(i, 1); continue; }
    if (!q && VOCAB[id].has(w)) continue;
    rest.push(q ? `"${w}"` : w);
  }
  if (rest.length) out.push(`args (not expressed: ${[...new Set(rest)].slice(0, 4).join(' ')})`);
  if (/["']/.test(t.replace(/(["'])[^"']*\1/g, ''))) out.push('value (unclear where the quoted text ends)');
  const u = t.replace(/(["'])[^"']*\1/g, ' ');
  if (SECOND.test(u) || SECOND_I.test(` ${u} `)) out.push('args (a second action)');
  if (NEGATION.test(u)) out.push('args (an exclusion is not expressed)');
  // values come from the request only: an option-like value, or one the request does not literally contain, is not rendered
  for (const k of RENDERED[id] || []) {
    const x = slots[k];
    if (x == null || (DEFAULTS[id]?.[k] || []).includes(String(x))) continue;
    if (String(x).startsWith('-')) out.push(`${k} (looks like an option)`);
    else if (!t.toLowerCase().includes(String(x).toLowerCase())) out.push(`${k} (not named in the request)`);
  }
  if (id === 'venv_create' && (/(?<![\p{L}\d_])(?:named|called|nazwan\w*|nazwie|nazwą|nazwa)(?![\p{L}\d_])/iu.test(t) || /-m\s+venv\s+(?!\.venv\s*$)\S/i.test(t)
    || t.split(/\s+/).some((w) => w !== '.venv' && PATHISH.test(w)))) out.push('path (only .venv is supported)');
  if (id === 'git_show_files' && RELATIVE.test(t) && ((slots.rev != null && slots.rev !== 'HEAD~1') || REF_TOKEN.test(t) || /\bgit\s+show\b/i.test(t))) out.push('rev (an explicit revision and a relative one)');
  if (id === 'open_file' && slots.file != null && !/^https?:\/\//i.test(String(slots.file)) && EXEC_EXT.test(String(slots.file).replace(/[\/\\]+$/, ''))) out.push('file (a program or script would run, not open)');
  if (id === 'open_file' && slots.file != null && /^(?:file|javascript|data|vbscript|ms-\w+|search-ms):/i.test(String(slots.file))) out.push('file (not a file name or web address)');
  if (id === 'http_server' && slots.port != null && !(/^\d{1,5}$/.test(String(slots.port)) && +slots.port > 0 && +slots.port < 65536)) out.push('port (not a valid port)');
  return [...new Set(out)];
}
