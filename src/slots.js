// Deterministic slot extraction (regex + small vocabularies). No ML here.
// extractSlots(text) returns everything it can find; src/fill.js picks what an intent needs.

const FOLD = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };

// Lowercase + fold Polish diacritics, preserving string length so indices map back to the original.
export function foldKeepLength(s) {
  let out = '';
  for (const ch of s) {
    let c = ch.toLowerCase();
    if (c.length !== ch.length) c = ch;
    c = FOLD[c] || c;
    if (c.length !== ch.length) c = ch; // never change length
    out += c;
  }
  return out;
}

// ---------- number words (EN + PL, folded) up to 20 ----------
const NUM_WORDS = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
  eighteen: 18, nineteen: 19, twenty: 20, dozen: 12,
  jeden: 1, jedna: 1, jedno: 1, jednego: 1, jednej: 1,
  dwa: 2, dwie: 2, dwoch: 2, dwu: 2, dwoma: 2,
  trzy: 3, trzech: 3, cztery: 4, czterech: 4,
  piec: 5, pieciu: 5, szesc: 6, szesciu: 6, siedem: 7, siedmiu: 7, osiem: 8, osmiu: 8,
  dziewiec: 9, dziewieciu: 9, dziesiec: 10, dziesieciu: 10,
  jedenascie: 11, jedenastu: 11, dwanascie: 12, dwunastu: 12, trzynascie: 13, trzynastu: 13,
  czternascie: 14, czternastu: 14, pietnascie: 15, pietnastu: 15, szesnascie: 16, szesnastu: 16,
  siedemnascie: 17, siedemnastu: 17, osiemnascie: 18, osiemnastu: 18,
  dziewietnascie: 19, dziewietnastu: 19, dwadziescia: 20, dwudziestu: 20,
};
const NUM_WORD_RE = new RegExp(`\\b(${Object.keys(NUM_WORDS).sort((a, b) => b.length - a.length).join('|')})\\b`, 'g');
const NUM = String.raw`(\d+(?:[.,]\d+)?)`;

// ---------- vocabularies ----------
export const KNOWN_EXT = new Set(('log txt pdf py js mjs cjs ts tsx jsx json md csv tsv xml html htm css scss sh bash zsh ' +
  'jpg jpeg png gif webp svg bmp tiff mp4 mkv avi mov webm mp3 wav flac ogg zip gz tgz tar bz2 xz 7z rar iso ' +
  'yaml yml toml ini conf cfg env cpp hpp java kt go rs rb php sql sqlite db doc docx xls xlsx ppt pptx odt ods ' +
  'deb rpm dmg exe bak tmp swp out lock class jar war o so a').split(' '));
// extensions that are also common words: only accepted with an explicit dot
const AMBIG_EXT = new Set(['go', 'a', 'o', 'so', 'out', 'lock', 'env', 'db', 'class', 'war', 'tmp', 'doc', 'c', 'h', 'rs', 'sh']);
export const EXT_ALIASES = {
  python: 'py', pythona: 'py', pythonowe: 'py', javascript: 'js', javascriptowe: 'js', typescript: 'ts',
  typescriptowe: 'ts', markdown: 'md', markdownowe: 'md', tekstowe: 'txt', tekstowych: 'txt', tekstowy: 'txt',
  text: 'txt', logi: 'log', logow: 'log', logs: 'log', logami: 'log', logach: 'log',
  images: 'jpg', image: 'jpg', photos: 'jpg', zdjecia: 'jpg', zdjec: 'jpg', obrazki: 'png', obrazkow: 'png',
  shell: 'sh', bashowe: 'sh', skrypty: 'sh', skryptow: 'sh', yamlowe: 'yaml', jsonowe: 'json', jsonow: 'json',
  pdfy: 'pdf', pdfow: 'pdf', pdfami: 'pdf', pdfach: 'pdf', csvki: 'csv', csvek: 'csv', golang: 'go', rust: 'rs',
  ruby: 'rb', java: 'java', cpp: 'cpp', backup: 'bak', backupy: 'bak', tymczasowe: 'tmp', temporary: 'tmp', temp: 'tmp',
  mp3ki: 'mp3', filmy: 'mp4', videos: 'mp4', video: 'mp4', filmow: 'mp4', archiwa: 'zip',
};
// alias words that only count as an extension when next to a "files" word
const WEAK_ALIAS = new Set(['text', 'logs', 'logi', 'logow', 'shell', 'backup', 'temp', 'java', 'image', 'video', 'ruby', 'rust']);
const FILE_WORDS = /\b(files?|plik\w*|scripts?|skrypt\w*|sources?|zrodl\w*|documents?|dokument\w*)\b/;

export const KNOWN_PROCS = new Set(('nginx apache2 httpd node nodejs python python3 java chrome chromium firefox code slack ' +
  'spotify docker dockerd postgres mysqld mysql redis redis-server mongod sshd php php-fpm gunicorn uwsgi ruby rails ' +
  'vim nvim emacs zoom teams discord steam electron npm yarn webpack vite deno bun kubelet containerd jenkins tomcat ' +
  'elasticsearch kafka zookeeper cron crond xorg gnome-shell pulseaudio pipewire htop top tmux screen sleep ffmpeg vlc ' +
  'thunderbird telegram signal celery sidekiq puma unicorn beam erlang dotnet ollama postgresql mariadb caddy traefik ' +
  'haproxy memcached rabbitmq-server minecraft safari skype obs gimp blender libreoffice').split(' '));
export const KNOWN_SERVICES = new Set(('nginx apache2 apache httpd docker ssh sshd postgresql postgres mysql mariadb redis ' +
  'redis-server mongod mongodb cron crond cups bluetooth networkmanager network-manager ufw firewalld fail2ban php-fpm ' +
  'systemd-resolved systemd-journald rsyslog containerd kubelet jenkins tomcat elasticsearch grafana-server grafana ' +
  'prometheus haproxy postfix dovecot named bind9 avahi-daemon snapd gdm lightdm sddm nfs-server smbd samba vsftpd ' +
  'memcached rabbitmq-server supervisor openvpn wireguard caddy traefik ntp chronyd chrony nodered pm2 gunicorn ' +
  'celery minio vault consul nomad zabbix-agent netdata cockpit').split(' '));
const KNOWN_PKGS = new Set(('htop curl wget git vim nano tmux jq nodejs npm python3 python3-pip pip docker docker.io ' +
  'ffmpeg tree ncdu neofetch zsh fish build-essential gcc make cmake openssl openssh-server net-tools nmap ' +
  'traceroute dnsutils whois unzip zip p7zip ripgrep fd-find bat fzf golang rustc ruby php sqlite3 postgresql ' +
  'redis nginx apache2 mc lm-sensors iotop iftop nethogs rsync gnupg imagemagick').split(' '));

// package.json script names and command-line tools people ask about (npm run X, X --version, X --help)
const KNOWN_SCRIPTS = new Set(('dev start build test lint typecheck type-check preview serve watch format e2e deploy ' +
  'storybook coverage clean release prepare check bench docs generate migrate seed test:unit test:e2e build:prod').split(' '));
const KNOWN_TOOLS = new Set(('node nodejs npm npx pnpm yarn bun deno python python3 pip pip3 uv poetry pytest git gh docker ' +
  'kubectl helm terraform ansible go rustc cargo rustup java javac mvn gradle kotlin ruby gem perl php composer ' +
  'dotnet gcc g++ clang cmake make ffmpeg curl wget jq yq tmux vim nvim code wrangler vercel netlify heroku modal ' +
  'gcloud aws az firebase flyctl supabase claude codex ollama openssl sqlite3 psql mysql redis-cli nginx tsc eslint ' +
  'prettier vite webpack brew apt rsync ssh zsh bash fish pwsh powershell').split(' '));
// words between the install verb and the package name ("install globally the typescript package with npm")
const PKG_SKIP = new Set(('globally globalnie global -g --global system-wide systemowo package pakiet pakietu paczke paczka ' +
  'paczki module modul modulu library biblioteke biblioteka biblioteki lib npm pip pip3 python python3 via using przez ' +
  'uzywajac z za pomoca pomoca the a an with from w do for dla mi sobie').split(' '));

// words that are never a slot value
const STOP = new Set(('the a an all any every some my me mi this that these those of for to in on at by with from ' +
  'named called name nazwie nazwa nazwany nazwana o process processes proces procesy procesu procesow program ' +
  'programu app aplikacje aplikacja aplikacji service services usluga usluge uslugi uslug serwis serwisu daemon demon ' +
  'demona unit container kontener kontenera kontenerze kontenerow kontenery package pakiet pakietu paczke paczka ' +
  'branch brancha branchu gałąź galaz galezi galezia new nowy nowa nowej nowego nowa nowa nowym local lokalny ' +
  'lokalna lokalnej please prosze pls plz wszystkie wszystko wszystkich running uruchomiony dzialajacy dzialajace ' +
  'force forcibly silowo sile -9 now teraz natychmiast is jest czy mam have i do na w we z ze ze od dla jak how ' +
  'which what co gdzie where file plik pliku files pliki command komenda komendy polecenie polecenia called ' +
  'zmienna zmiennej variable env value wartosc wartość and i oraz then logs logi logow status restart start stop ' +
  'kill zabij ubij show pokaz pokaż sprawdz sprawdź check list lista via using uzywajac it its it\'s up out into ' +
  'się sie mnie mi tego ten ta to tej tym user uzytkownik uzytkownika owner wlasciciel host server serwer serwera ' +
  'domain domena domeny word slowo slowa text tekst tekstu phrase fraze fraza string ciag pattern wzorzec ' +
  'history historii historia historie historyczne shell bash zsh commands komend poprzednich previous earlier wczesniej ' +
  'moim mojego moj moja moje mojej mojego twoim your exactly dokladnie somewhere gdzies anywhere ma byc być').split(' '));
export const isStopWord = (w) => STOP.has(foldKeepLength(String(w)).toLowerCase());

// whole-disk phrases -> the filesystem root ('/'; rendered as C:\ for PowerShell/cmd on Windows).
// Runs on folded text: "na całym dysku" -> "na calym dysku", "całego dysku" -> "calego dysku".
export const ROOT_LOCATION = /\b(whole (system|disk|drive|filesystem|computer)|entire (system|disk|drive|filesystem|computer)|root (dir(ectory)?|folder|filesystem)|cal\w* (system\w*|dysk\w*|komputer\w*)|(?:na|po) (?:cal\w* )?dysku(?!\s+[a-z]:)|on (?:the |my |this )?(?:whole |entire )?(?:disk|drive|hard drive|hdd|ssd)(?!\s+[a-z]:)|everywhere|wszedzie|katalog\w* glown\w*)\b/;
// tagger span on a bare disk noun ("dysku", "disk"): the phrase ending at the span decides
export const ROOT_PHRASE_END = /(?:\b(?:whole|entire|cal\w*)\s+(?:dysk\w*|disk|drive|system\w*|filesystem|komputer\w*|computer)|\b(?:na|po)\s+(?:cal\w*\s+)?dysku|\bon(?: the| my| this)?(?: whole| entire)?\s+(?:disk|drive))$/;

const LOCATIONS = [
  [/\b(home dir(ectory)?|home folder|my home|katalog\w* domow\w*|folder\w* domow\w*|domow\w* (katalog|folder)\w*|w domu|\$home)\b/, '~'],
  [/\b(downloads?( folder| dir(ectory)?)?|pobrane|pobranych|folder\w* pobrane)\b/, '~/Downloads'],
  [/\b(desktop|pulpit\w*)\b/, '~/Desktop'],
  [/\b(documents|dokumenty|dokumentach|dokumentow)\b/, '~/Documents'],
  [ROOT_LOCATION, '/'],
  [/\b(current (dir(ectory)?|folder)|this (dir(ectory)?|folder)|here|tutaj|tu|biezac\w* (katalog|folder)\w*|tym (katalogu|folderze)|obecn\w* (katalog|folder)\w*|aktualn\w* (katalog|folder)\w*)\b/, '.'],
  [/\b(var log|system logs? dir(ectory)?|katalog\w* (z )?logami|katalog\w* logow)\b/, '/var/log'],
];

const blank = (s, start, end) => s.slice(0, start) + ' '.repeat(end - start) + s.slice(end);
// end of the word starting at `i` in the original text (number words were padded to digits in `work`)
const wordEnd = (text, i) => { const m = /^[\p{L}\d]+/u.exec(text.slice(i)); return i + (m ? m[0].length : 1); };

function numVal(s) {
  if (s == null) return null;
  if (/^\d+([.,]\d+)?$/.test(s)) return parseFloat(s.replace(',', '.'));
  return NUM_WORDS[s] ?? null;
}

function sizeToFind(numStr, unit) {
  const n = parseFloat(numStr.replace(',', '.'));
  const u = unit.toLowerCase();
  let mult; // in KiB
  if (/^(t|tb|tib|tera\w*)$/.test(u)) mult = 1024 ** 3;
  else if (/^(g|gb|gib|giga\w*|gig|gigs)$/.test(u)) mult = 1024 ** 2;
  else if (/^(m|mb|mib|meg|megs|mega\w*)$/.test(u)) mult = 1024;
  else if (/^(k|kb|kib|kilo\w*)$/.test(u)) mult = 1;
  else return `${Math.round(n)}c`; // bytes
  const kib = n * mult;
  if (Number.isInteger(kib / 1024 ** 2) && kib >= 1024 ** 2) return `${kib / 1024 ** 2}G`;
  if (Number.isInteger(kib / 1024) && kib >= 1024) return `${kib / 1024}M`;
  return `${Math.round(kib)}k`;
}

const UNIT_RE = String.raw`(minut\w*|mins?|minutes?|m|godzin\w*|godz|hours?|hrs?|h|dni|dnia|dzien|days?|d|dob\w*|tydzien|tygodni\w*|tyg|weeks?|w|miesiac\w*|mies|months?|lat|lata|rok|roku|years?)`;

function unitOf(u) {
  if (/^(minut|mins?$|minutes?$|m$)/.test(u)) return 'min';
  if (/^(godz|hours?$|hrs?$|h$)/.test(u)) return 'h';
  if (/^(dni|dnia|dzien|days?$|d$|dob)/.test(u)) return 'd';
  if (/^(tydzien|tygodni|tyg|weeks?$|w$)/.test(u)) return 'w';
  if (/^(miesiac|mies|months?$)/.test(u)) return 'mo';
  return 'y';
}

export function durationDerived(amount, unit) {
  const minutes = { min: 1, h: 60, d: 1440, w: 10080, mo: 43200, y: 525600 }[unit] * amount;
  const days = Math.max(1, Math.round(minutes / 1440));
  const age = minutes < 1440 ? `-mmin -${Math.round(minutes)}` : `-mtime -${days}`;
  const names = { min: 'minutes', h: 'hours', d: 'days', w: 'weeks', mo: 'months', y: 'years' };
  const since = `${amount} ${amount === 1 ? names[unit].slice(0, -1) : names[unit]} ago`;
  return { minutes, days, age, since };
}

// Paths keep every character up to the next whitespace/quote: `backup(2)`, `photos,2019`, `site;old`,
// `a:b.txt` and `cache/..` are real names. Sentence punctuation after the path is removed by
// trimPathPunct, which never removes a character that could be part of the name.
const PATH_TOKEN = /(?:^|[\s(=,])([A-Za-z]:\\[^\s"']*|\\\\[^\s"']+|(?:~|\.{1,2})?\/[^\s"']*|~(?=[\s,;:!?)]|$)|(?:[\w@+-][\w.@+-]*\/)+[^\s"']*|[\w@+-][\w@+-]*(?:\.[\w-]+)*\.[A-Za-z][A-Za-z0-9]{0,4}(?:\.[a-z0-9]{1,3})?)(?=$|[\s,;:!?).])/g;

const countOf = (s, c) => s.split(c).length - 1;
/**
 * Remove sentence punctuation that follows a path: trailing , ; : ! ?, a `)` without a matching `(`
 * inside the path, and a single sentence-final `.` right after a file extension (`/tmp/a.txt.`).
 * Everything else is kept exactly as written: `/tmp/data.`, `~/old...` and `/tmp/cache/..` are not
 * shortened, so a (destructive) command never silently moves to another path such as a parent.
 */
export function trimPathPunct(p) {
  let s = String(p);
  for (;;) {
    const before = s;
    s = s.replace(/[,;:!?]+$/, '');
    if (s.length > 1 && s.endsWith(')') && countOf(s, ')') > countOf(s, '(')) s = s.slice(0, -1);
    if (s === before) break;
  }
  if (/[^./\\]\.[A-Za-z][A-Za-z0-9]{0,4}\.$/.test(s)) s = s.slice(0, -1);
  return s;
}

/**
 * @returns object with: quoted[], urls[], hosts[], target, paths[], count, size, duration, port, pid, mode,
 *   ext, var, words (folded token list), text (original), rest (folded text with consumed spans blanked)
 */
export function extractSlots(input) {
  const text = String(input);
  let work = foldKeepLength(text); // same length as text
  const out = { text, quoted: [], urls: [], hosts: [], paths: [], numbers: [], spans: [] };
  const spans = []; // [start, value] for ordering paths
  // surface spans (character offsets into `text`) by type; `work` stays the same length as `text`
  // throughout so every regex index maps straight back to the original string
  const mark = (type, start, end, value) => out.spans.push({ type, start, end, value });
  const take = (re, fn) => {
    re.lastIndex = 0;
    let m;
    const found = [];
    while ((m = re.exec(work))) found.push(m);
    for (const mm of found) {
      fn(mm);
    }
    for (const mm of found.reverse()) work = blank(work, mm.index, mm.index + mm[0].length);
  };
  const cut = (m) => { work = blank(work, m.index, m.index + m[0].length); };

  // 1. quoted strings (values from the original text, case preserved)
  const quotedSpans = [];
  take(/"([^"]*)"|(?<![\p{L}\d])'(.+?)'(?![\p{L}\d])|„([^”"]*)[”"]|“([^”]*)”|`([^`]*)`/gu, (m) => {
    const v = text.slice(m.index + 1, m.index + m[0].length - 1);
    out.quoted.push(v);
    quotedSpans.push([m.index, v]);
    mark('QUOTED', m.index + 1, m.index + m[0].length - 1, v);
  });
  // 2. URLs and git remotes
  take(/\b(?:https?|ftp|ssh|git):\/\/[^\s"'<>]+|\bwww\.[^\s"'<>]+|\bgit@[\w.-]+:[\w./-]+/g, (m) => {
    const u = text.slice(m.index, m.index + m[0].length).replace(/[.,;:!?)]+$/, '');
    out.urls.push(u);
    mark('URL', m.index, m.index + u.length, u);
    const h = u.replace(/^\w+:\/\//, '').replace(/^git@/, '').split(/[/:?#]/)[0];
    if (h) out.hosts.push(h);
  });
  // 3. user@host
  take(/\b[\w.-]+@[\w.-]*[\w-]\b/g, (m) => {
    const v = text.slice(m.index, m.index + m[0].length);
    out.target = out.target || v;
    out.hosts.push(v.split('@')[1]);
    mark('HOST', m.index, m.index + v.length, v);
  });
  // 4. IPv4 (optionally with :port)
  take(/\b(\d{1,3}(?:\.\d{1,3}){3})(?::(\d{1,5}))?\b/g, (m) => {
    out.hosts.push(m[1]);
    mark('HOST', m.index, m.index + m[1].length, m[1]);
    if (m[2]) {
      out.port = out.port || +m[2];
      mark('PORT', m.index + m[0].length - m[2].length, m.index + m[0].length, +m[2]);
    }
  });
  // 5. paths / filenames (positions kept for src/dst ordering)
  PATH_TOKEN.lastIndex = 0;
  {
    let m;
    const found = [];
    while ((m = PATH_TOKEN.exec(work))) {
      const start = m.index + m[0].length - m[1].length;
      const raw = trimPathPunct(text.slice(start, start + m[1].length));
      if (!raw) continue;
      if (/^\d+([.,]\d+)*$/.test(raw)) continue; // version/number
      if (/^\d+(\.\d+)?[kmgt]i?b?$/i.test(raw)) continue; // size like 1.5GB
      if (/^(e\.g|i\.e|np|tj|itp|etc|tar\.gz|tar\.bz2|tar\.xz)$/i.test(raw)) continue;
      if (/^[^/]*\.[a-z]+$/i.test(raw) && !raw.includes('/')) {
        // bare "name.ext": a domain (host intents) or a filename — keep it as both candidates
        if (/^[a-z0-9-]+(\.[a-z0-9-]+)*\.(com|org|net|io|pl|dev|de|uk|eu|gov|edu|info|co|app|ai|me|cloud|local|lan|internal|xyz|tech|ru|fr|it|es|nl|cz|us|ca)$/i.test(raw)) {
          out.hosts.push(raw);
          mark('HOST', start, start + raw.length, raw);
          continue;
        }
      }
      if (/:\/\//.test(raw)) continue;
      found.push([start, raw, m[1].length]);
    }
    for (const [start, raw, len] of found.reverse()) {
      spans.push([start, raw]);
      mark('PATH', start, start + raw.length, raw);
      work = blank(work, start, start + len);
    }
  }
  // 5b. domains / hostnames not caught above (e.g. "google.com" without path)
  take(/\b((?:[a-z0-9-]+\.)+[a-z]{2,})\b/g, (m) => {
    out.hosts.push(text.slice(m.index, m.index + m[0].length));
    mark('HOST', m.index, m.index + m[0].length, out.hosts[out.hosts.length - 1]);
  });
  // 6. named locations
  for (const [re, val] of LOCATIONS) {
    const m = work.match(re);
    if (m) {
      if (re === ROOT_LOCATION) out.rootPhrase = true;
      spans.push([m.index, val]);
      mark('PATH', m.index, m.index + m[0].length, val);
      work = blank(work, m.index, m.index + m[0].length);
    }
  }
  spans.sort((a, b) => a[0] - b[0]);
  for (const [, v] of spans) if (!out.paths.includes(v)) out.paths.push(v);
  // same list but with quoted strings as path candidates (for intents that take only paths)
  out.pathsWithQuoted = [];
  for (const [, v] of [...spans, ...quotedSpans].sort((a, b) => a[0] - b[0])) {
    if (!out.pathsWithQuoted.includes(v)) out.pathsWithQuoted.push(v);
  }

  // 7. variable names (UPPER_CASE in the original)
  {
    const m = text.match(/(?:^|[\s$])\$?\{?([A-Z_][A-Z0-9_]{1,})\}?(?=$|[\s,.?!])/);
    if (m && !/^(PID|CPU|RAM|GPU|USB|DNS|IP|URL|HTTP|HTTPS|SSH|TCP|UDP|OS|PDF|JSON|CSV|MD5|SHA|SHA256|GB|MB|KB|TB|II|PL|EN|README|TODO|FIXME|ERROR|WARN|INFO|DEBUG|HEAD|API|SQL|AWS|GCP)$/.test(m[1])) {
      out.var = m[1];
      const at = m.index + m[0].indexOf(m[1]);
      mark('VAR', at, at + m[1].length, m[1]);
    }
  }

  // 8. number words -> digits, padded with spaces so positions keep mapping to `text`
  work = work.replace(NUM_WORD_RE, (w) => String(NUM_WORDS[w]).padEnd(w.length));
  // half an hour
  work = work.replace(/\b(half an hour|pol godziny|polgodziny)\b/, (w) => '30 min'.padEnd(w.length));

  // 9. sizes
  {
    const m = work.match(new RegExp(String.raw`(?:^|\s|[+><])${NUM}\s*(tb|tib|terabajt\w*|terabytes?|gb|gib|gigabajt\w*|gigabytes?|giga|gigs?|g|mb|mib|megabajt\w*|megabytes?|mega|megs?|meg|m|kb|kib|kilobajt\w*|kilobytes?|kilo|k|bajt\w*|bytes?|b)\b(?!\s*(?:dni|days?|godz|hour|minut))`, 'i'));
    // "5 m" could be minutes; treat bare m/k/g as size only when glued ("100M") or explicit unit
    if (m && !(/^[mkgb]$/i.test(m[2]) && /\s/.test(m[0].trim().slice(m[1].length, m[1].length + 1)))) {
      out.size = sizeToFind(m[1], m[2]);
      const at = m.index + m[0].indexOf(m[1]);
      mark('SIZE', at, m.index + m[0].length, out.size);
      cut(m);
    }
  }

  // 10. durations
  const durRe = new RegExp(String.raw`(?:\b(?:last|past|previous|within|in the last|ostatni\w*|poprzedni\w*|minion\w*|older than|starsze? niz|starszych niz|sprzed|ponad|over|more than|od|since|for|przez|z)\s+)?\b${NUM}\s*${UNIT_RE}\b(?:\s+ago|\s+temu)?`);
  let dm = work.match(durRe);
  if (dm) {
    const amount = numVal(dm[1]);
    out.duration = { amount, unit: unitOf(dm[2]), ...durationDerived(amount, unitOf(dm[2])) };
    mark('TIME', dm.index, dm.index + dm[0].length, out.duration.minutes);
    cut(dm);
  } else {
    const rel = [
      [/\b(yesterday|wczoraj\w*|od wczoraj)\b/, 2, 'd', 'yesterday'],
      [/\b(today|dzisiaj|dzis|dzisiejsz\w*|this morning|rano)\b/, 1, 'd', 'today'],
      [/\b(last|past|this|ostatni\w*|z ostatni\w*|w ostatni\w*|ten|tym|ta) (hour|godzin\w*)\b/, 1, 'h'],
      [/\b(last|past|this|ostatni\w*|z ostatni\w*|w ostatni\w*|ten|tym) (week|tydzien|tygodni\w*)\b/, 7, 'd'],
      [/\b(last|past|this|ostatni\w*|z ostatni\w*|w ostatni\w*|ten|tym) (month|miesiac\w*)\b/, 30, 'd'],
      [/\b(last|past|ostatni\w*|z ostatni\w*|ostatniej|w ostatni\w*) (day|dob\w*|dzien|24h)\b/, 1, 'd'],
      [/\b(last|past|ostatni\w*|z ostatni\w*|w ostatni\w*) (year|rok\w*)\b/, 365, 'd'],
      [/\b(minute|minut\w*) temu\b/, 1, 'min'],
    ];
    for (const [re, amount, unit, since] of rel) {
      const m = work.match(re);
      if (m) {
        out.duration = { amount, unit, ...durationDerived(amount, unit) };
        if (since) out.duration.since = since;
        mark('TIME', m.index, m.index + m[0].length, out.duration.minutes);
        cut(m);
        break;
      }
    }
  }

  // 11. ports
  {
    const m = work.match(/\b(?:port\w*|porcie)\s*(?:nr\.?|numer|number|no\.?)?\s*:?\s*(\d{1,5})\b/) ||
      work.match(/(?:^|[\s\w]):(\d{2,5})\b/) || work.match(/\b(\d{2,5})\s*(?:port\w*|porcie)\b/);
    if (m && +m[1] > 0 && +m[1] < 65536) {
      out.port = out.port || +m[1];
      const at = m.index + m[0].lastIndexOf(m[1]);
      mark('PORT', at, at + m[1].length, +m[1]);
      cut(m);
    }
  }
  // 12. pid
  {
    const m = work.match(/\b(?:pid\w*|process id|id procesu|procesu? (?:o )?(?:id|numerze|nr)|numer procesu)\s*(?:=|:|nr|numer)?\s*(\d+)\b/);
    if (m) {
      out.pid = +m[1];
      const at = m.index + m[0].lastIndexOf(m[1]);
      mark('PID', at, at + m[1].length, +m[1]);
      cut(m);
    }
  }
  // 13. chmod mode
  {
    const m = work.match(/(?:^|\s)([0-7]{3,4})(?=\s|$)/) || work.match(/(?:^|\s)([ugoa]*[+=-][rwxXst]+)(?=\s|$)/);
    if (m && (/[+=-]/.test(m[1]) || /^[0-7]{3,4}$/.test(m[1]))) {
      out.mode = m[1];
      out.modeRaw = m[0];
      const at = m.index + m[0].indexOf(m[1]);
      out.modeSpan = { type: 'MODE', start: at, end: at + m[1].length, value: m[1] };
    }
  }
  // 14. extension
  {
    let m = work.match(/(?:^|\s)\*?\.([a-z0-9]{1,6})\b/);
    if (m && (KNOWN_EXT.has(m[1]) || /^[a-z]{1,5}$/.test(m[1]))) {
      out.ext = m[1];
      const at = m.index + m[0].search(/\S/);
      mark('EXT', at, m.index + m[0].length, m[1]);
      cut(m);
    } else {
      const hasFileWord = FILE_WORDS.test(work);
      for (const tm of work.matchAll(/[a-z0-9]+/g)) {
        const t = tm[0];
        let e = null;
        if (KNOWN_EXT.has(t) && !AMBIG_EXT.has(t) && t !== 'tar' && t !== 'zip' && t !== 'gz') e = t;
        else if (EXT_ALIASES[t] && (!WEAK_ALIAS.has(t) || hasFileWord)) e = EXT_ALIASES[t];
        else if ((t === 'zip' || t === 'gz' || t === 'tar') && hasFileWord) e = t;
        if (e) { out.ext = e; mark('EXT', tm.index, tm.index + t.length, e); break; }
      }
    }
  }
  // 15. remaining numbers -> count
  {
    // "-9" is an option/signal, never a count or a PID ("kill process named -9")
    const numMs = [...work.matchAll(/(?<![\w.-])(\d+)(?![\w.])/g)];
    const nums = numMs.map((m) => +m[1]);
    out.numbers = nums;
    out.numberSpans = numMs.map((m) => ({ type: 'NUM', start: m.index, end: wordEnd(text, m.index), value: +m[1] }));
    const top = work.match(/\b(?:top|first|last|pierwsz\w*|ostatni\w*|najwieksz\w*)\s+(\d+)\b/) ||
      work.match(/\b(\d+)\s+(?:largest|biggest|najwieksz\w*|top|najciezsz\w*|lines?|lini\w*|files?|plik\w*|process\w*|proces\w*|commit\w*|entries|wpis\w*|items?|results?|wynik\w*|ostatnich|pierwszych)\b/);
    if (top) {
      out.count = +top[1];
      const at = top.index + top[0].indexOf(top[1]);
      out.countSpan = { type: 'NUM', start: at, end: wordEnd(text, at), value: out.count };
    } else if (nums.length) {
      out.count = nums[0];
      out.countSpan = out.numberSpans[0];
    }
  }
  out.rest = work;
  out.words = work.split(/[^a-z0-9@._/+-]+/).filter(Boolean);
  return out;
}

// ---------- argument extraction for name-like slots ----------

/** Map a Polish-inflected form onto a vocabulary entry (javy -> java, nginxa -> nginx). */
export function deinflect(w, vocab) {
  if (w.length < 4) return null;
  for (const suf of ['ami', 'ach', 'owi', 'em', 'om', 'ie', 'y', 'a', 'u', 'e', 'i']) {
    if (!w.endsWith(suf)) continue;
    const stem = w.slice(0, -suf.length);
    for (const add of ['', 'a', 'e', 'o']) if (stem.length + add.length >= 3 && vocab.has(stem + add)) return stem + add;
  }
  return null;
}

function nextAfter(words, triggers, { skip = STOP, accept = /^[\w@.:/+-]+$/ } = {}) {
  for (let i = 0; i < words.length; i++) {
    if (!triggers.has(words[i])) continue;
    for (let j = i + 1; j < words.length; j++) {
      const w = words[j];
      if (skip.has(w)) continue;
      if (triggers.has(w)) continue;
      if (accept.test(w) && !/^\d+$/.test(w)) return { word: w, index: j };
      break;
    }
  }
  return null;
}

// original-case token from the original text matching a folded word
function original(text, folded) {
  const toks = text.split(/[\s,;!?()"']+/);
  return toks.find((t) => foldKeepLength(t).replace(/[.:]+$/, '') === folded) || folded;
}

const set = (s) => new Set(s.split(' '));
const TRIG = {
  name: set('kill killall pkill zabij ubij zakoncz zakończ terminate stop end zamknij close proces procesu procesy procesow process processes named called nazwie pgrep find znajdz szukaj running dziala działa ubic zabic zabić'),
  service: set('service services usluga usluge uslugi usluga serwis serwisu serwisy daemon demon demona unit restart restartuj zrestartuj start uruchom wystartuj stop zatrzymaj status stan enable wlacz wlaczyc wylacz disable logs logi logow logach of for dla journal journalctl reload przeladuj'),
  container: set('container kontener kontenera kontenerze kontenerow logs logi logow exec into do stop zatrzymaj shell bash sh wejdz enter'),
  pkg: set('install zainstaluj instaluj doinstaluj package pakiet pakietu paczke paczka installed zainstalowany zainstalowane zainstalowana apt brew mam have'),
  cmd: set('which where gdzie location lokalizacja path sciezka sciezke command komenda komendy polecenie polecenia binary binarka executable program programu jest is version wersja wersje wersji help pomoc usage manual flags flagi options opcje'),
  script: set('run uruchom odpal odpalic puść pusc wykonaj execute script skrypt skryptu skrypty npm'),
  var: set('variable zmienna zmiennej zmiennych env value wartosc printenv echo secret sekret sekretu put'),
  branch: set('branch branchu brancha branchem branche galaz galezi galezia checkout switch przelacz przelaczyc przejdz -b called named nazwie na to do delete usun skasuj'),
  user: set('user uzytkownik uzytkownika uzytkownikowi owner wlasciciel wlasciciela to dla na chown byc'),
  pattern: set('for containing contains contain word text phrase string pattern grep szukaj wyszukaj poszukaj slowo slowa tekst tekstu fraze fraza frazy zawierajace zawierajacy zawierajacych zawieraja zawiera zawierajace ciag wystapienia occurrences mentions mention wzmianki find znajdz search'),
  host: set('ping pinguj pingnij host hosta hosts server serwer serwera serwerem to do domain domena domeny domenie for dla lookup resolve traceroute trace route trasa trase reach dns nslookup dig'),
  target: set('ssh connect polacz polaczyc zaloguj login log to do na into server serwer serwera'),
};

// option words of a search request, never its pattern ("grep for ~/foo recursively in src")
const OPTION_WORDS = ['recursively', 'recursive', 'rekurencyjnie', 'everywhere', 'wszedzie', 'case', 'insensitive', 'case-insensitive',
  'case-insensitively', 'case-sensitive', 'insensitively', 'ignoring', 'ignore', 'sensitive', 'only', 'tylko', 'files', 'pliki', 'plikach',
  'lines', 'linie', 'liniach'];
const PATTERN_SKIP = new Set([...STOP, ...OPTION_WORDS]);
/** A word that describes how to search ("case-insensitive", "recursively"), not what to search for. */
export const isOptionWord = (w) => OPTION_WORDS.includes(foldKeepLength(String(w)).toLowerCase());
const BRANCH_STOP = new Set([...STOP, 'on', 'off', 'and', 'then', 'git', 'switch', 'checkout', 'create', 'utworz', 'stworz', 'zrob', 'make', 'go', 'idz',
  'origin', 'upstream', 'remote', 'istniejaca', 'istniejacy', 'existing', 'nowa', 'nowy', 'the']);
const BRANCH_STRONG = set('branch branchu brancha branchem galaz galezi galezia -b checkout switch named called nazwie');

const TAG_OF = { name: 'NAME', service: 'NAME', container: 'NAME', pkg: 'NAME', cmd: 'NAME', script: 'NAME', branch: 'BRANCH',
  user: 'USER', pattern: 'PATTERN', message: 'MSG', var: 'VAR', text: 'TEXT' };

// tagger-only mode (ex built by src/tagger.js exFromSpans): values come from tagged spans, no regex fallback
function taggedArg(slot, ex) {
  if (slot === 'host') return ex.hosts[0] ?? null;
  if (slot === 'target') {
    if (ex.target) return ex.target;
    const host = ex.hosts[0];
    const user = ex.tagged.USER?.[0];
    return host ? (user ? `${user}@${host}` : host) : null;
  }
  const t = TAG_OF[slot];
  const v = (t && (slot === 'pattern' ? ex.tagged[t]?.find((x) => !isOptionWord(x)) : ex.tagged[t]?.[0])) ?? null;
  return slot === 'service' && v ? v.replace(/\.service$/, '') : v;
}

export function pickArg(slot, ex) {
  if (ex.taggerOnly) return taggedArg(slot, ex);
  const { quoted, words, text } = ex;
  const vocab = slot === 'service' ? KNOWN_SERVICES : slot === 'pkg' ? KNOWN_PKGS : (slot === 'name' || slot === 'container') ? KNOWN_PROCS
    : slot === 'script' ? KNOWN_SCRIPTS : slot === 'cmd' ? KNOWN_TOOLS : null;
  if (['pattern', 'message', 'text', 'name', 'service', 'container', 'pkg', 'cmd', 'branch', 'user', 'script'].includes(slot) && quoted.length) {
    return quoted[0];
  }
  if (slot === 'var') {
    if (ex.var) return ex.var;
    const r = nextAfter(words, TRIG.var, { accept: /^[a-z_][a-z0-9_]*$/ });
    return r ? r.word.toUpperCase() : null;
  }
  if (slot === 'service') {
    const svc = text.match(/([\w@.-]+)\.service\b/);
    if (svc) return svc[1];
  }
  if (slot === 'host') {
    if (ex.hosts.length) return ex.hosts[0];
    const r = nextAfter(words, TRIG.host, { accept: /^[a-z0-9][\w.-]*$/ });
    return r ? original(text, r.word) : (ex.paths.find((p) => /^[\w-]+\.[\w.-]+$/.test(p)) || null);
  }
  if (slot === 'target') {
    if (ex.target) return ex.target;
    const host = ex.hosts[0] || nextAfter(words, TRIG.target, { accept: /^[a-z0-9][\w.-]*$/ })?.word;
    if (!host) return null;
    const as = ex.rest.match(/\b(?:as|jako|user|uzytkownik\w*)\s+([a-z_][\w-]*)\b/);
    return as && !STOP.has(as[1]) ? `${as[1]}@${host}` : host;
  }
  if (slot === 'message') {
    const m = text.match(/(?:message|wiadomo\S*|opisem|komentarzem|-m|saying|:)\s+(.+)$/i);
    return m ? m[1].trim().replace(/^(["'„“])(.*)["'”]$/s, '$2') : null;
  }
  if (slot === 'text') {
    const b64 = text.match(/(?:^|\s)([A-Za-z0-9+/]{8,}={0,2})(?=\s|$)/);
    if (b64 && /[A-Z]/.test(b64[1]) && /[a-z]/.test(b64[1]) || b64 && /=$/.test(b64[1])) return b64[1];
    const m = text.match(/(?:encode|zakoduj|zakodowac|zakodować|decode|odkoduj|zdekoduj|dekoduj)\s+(?:the\s+)?(?:string|text|tekst|napis|slowo|słowo)?\s*(.+?)(?:\s+(?:in|to|na|w|do|z|from|using)\s+base64.*)?$/i);
    if (m && !/^(base64|to|this|it|in)\b/i.test(m[1])) return m[1].trim();
    return null;
  }
  if (slot === 'pkg') {
    // "pip install requests", "npm i -g typescript": the installer is not the package, unless nothing else is named
    // ("install npm"); a tool word right before the install verb is always the installer ("npm install")
    const cmdLike = text.match(/\b(?:npm|pnpm|yarn|bun|pip3?|pipx|uv pip)\s+(?:i|install|add)\s+(?:(?:-[gDU]|--global|--save-dev|--upgrade|--user)\s+)*(@?[\w][\w.@\/=<>~+-]*)/i);
    if (cmdLike && !/^-/.test(cmdLike[1])) return cmdLike[1];
    for (const w of words) if (vocab.has(w) && !PKG_SKIP.has(w)) return original(text, w);
    const r = nextAfter(words, TRIG.pkg, { skip: new Set([...STOP, ...PKG_SKIP]), accept: /^@?[\w.+-]+(?:\/[\w.+-]+)?(?:[=@<>~]=?[\w.*-]+)?$/ });
    if (r) return original(text, r.word);
    const i = words.findIndex((w, k) => vocab.has(w) && !/^(install|i|add|uninstall|zainstaluj|instaluj)$/.test(words[k + 1] || ''));
    return i >= 0 ? original(text, words[i]) : null;
  }
  if (vocab) {
    for (const w of words) if (vocab.has(w)) return original(text, w);
    // Polish inflection of a known name: "procesy javy" -> java, "logi nginxa" -> nginx, "chroma" -> chrome
    for (const w of words) { const d = deinflect(w, vocab); if (d) return d; }
  }
  if (slot === 'branch') {
    const r = nextAfter(words, BRANCH_STRONG, { skip: BRANCH_STOP, accept: /^[\w./-]+$/ }) ||
      nextAfter(words, TRIG.branch, { skip: BRANCH_STOP, accept: /^[\w./-]+$/ });
    if (r) return original(text, r.word);
    const p = ex.paths.find((x) => /^[\w-]+\/[\w./-]+$/.test(x));
    return p || null;
  }
  if (slot === 'script') {
    const r = nextAfter(words, TRIG.script, { skip: new Set([...STOP, 'npm', 'script', 'skrypt', 'skryptu', 'the']), accept: /^[\w:.-]+$/ });
    return r ? original(text, r.word) : null;
  }
  if (slot === 'pattern') {
    const r = nextAfter(words, TRIG.pattern, { skip: PATTERN_SKIP, accept: /^[\w@.:/+-]+$/ });
    return r ? original(text, r.word) : null;
  }
  const trig = TRIG[slot];
  if (!trig) return null;
  const r = nextAfter(words, trig);
  return r ? original(text, r.word) : null;
}

// bare directory name: "in src", "w folderze projekt", "katalog node_modules"
const NOT_DIR = /^(plik|file|folder|katalog|director|dir$|ciag|ostatn|last|past|cal|whole|entire|this|current|biez|obecn|aktual|system|the$|my$|moim|moj|all$|each|every|real|czas|time|order|kolejn|desc|asc|base64|terminal|konsol|backgr|tle$|human|format|bajt|byte|linux|mac|bash|shell|repo|git|tym$|ten$|tej$|which|ktor|sort|reverse|odwrot|size|rozmiar|gb$|mb$|tar$|zip$|gz$)/;
export function pickDir(ex) {
  const re = /\b(?:in|inside|under|within|w|we|wewnatrz|pod|of|z|ze|from|for|dla|folder\w*|katalog\w*|directory|dir|podkatalog\w*)\s+(?:the\s+|my\s+|moim\s+)?(?:folder\w*\s+|katalog\w*\s+|directory\s+|dir\s+|podkatalog\w*\s+)?([\w][\w.-]*)/g;
  let m;
  while ((m = re.exec(ex.rest))) {
    const w = m[1];
    const bad = STOP.has(w) || NOT_DIR.test(w) || /^\d+$/.test(w) || KNOWN_EXT.has(w) || EXT_ALIASES[w] ||
      (!/^(folder|katalog|director|dir|podkatalog)/.test(m[0]) && !/[._-]/.test(w) && w.length < 3);
    if (bad) { re.lastIndex = m.index + 1; continue; }
    return original(ex.text, w);
  }
  return null;
}

// src/dst style: "X to Y" / "X do Y" when only one explicit path was found
export function pickDest(ex) {
  const m = ex.rest.match(/\b(?:to|into|do|na|->|as|jako)\s+([\w.~/-]+)\s*$/) || ex.rest.match(/\b(?:to|into|do|->)\s+(?:folder\w*|katalog\w*|directory|dir)?\s*([\w.~/-]+)/);
  if (m && !STOP.has(m[1])) return original(ex.text, m[1]);
  return null;
}
