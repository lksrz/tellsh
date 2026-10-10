// Silver slot spans + relexicalisation for tagger training/eval data.
//  silverSpans(text, intent): run the regex extractor with the GOLD intent and map every slot the
//    intent actually uses back to its surface span -> typed spans (PATH, NUM, NAME, ...).
//  relex(text, spans, ...): replace span values with fresh values from a pool (train or held-out),
//    keeping exact offsets, so the tagger sees many values in the same contexts.
import { extractSlots, foldKeepLength } from '../../src/slots.js';
import { resolveSlots } from '../../src/fill.js';
import { BY_ID } from '../../src/catalog.js';
import { SLOT_TAG } from '../../src/tools.js';

export function usedSlots(intent) {
  const s = new Set(Object.keys(intent.slots));
  if (typeof intent.template === 'string') for (const m of intent.template.matchAll(/\{(\w+)/g)) s.add(m[1]);
  if (s.has('glob')) s.add('ext');
  if (s.has('namepat')) s.add('name');
  if (s.has('sedexpr')) { s.add('old'); s.add('new'); }
  if (s.has('age') || s.has('days') || s.has('since')) { s.add('age'); s.add('days'); s.add('since'); }
  if (intent.id.startsWith('base64')) { s.add('file'); s.add('text'); }
  if (intent.id === 'list_archive') s.add('file');
  return s;
}

const isWordChar = (c) => c !== undefined && /[\p{L}\d_]/u.test(c);
function findLit(text, v, taken) {
  if (v == null || v === '') return null;
  const val = String(v);
  const hay = [text, foldKeepLength(text).toLowerCase()];
  const needles = [val, foldKeepLength(val).toLowerCase()];
  for (let h = 0; h < 2; h++) {
    let from = 0;
    for (;;) {
      const i = hay[h].indexOf(needles[h], from);
      if (i < 0) break;
      const j = i + val.length;
      const free = !taken.some((o) => o.start < j && i < o.end);
      if (free && !isWordChar(text[i - 1]) && !isWordChar(text[j])) return { start: i, end: j };
      from = i + 1;
    }
  }
  return null;
}

export function silverSpans(text, intentId) {
  const intent = BY_ID[intentId];
  const ex = extractSlots(text);
  const r = resolveSlots(intent, ex);
  const used = usedSlots(intent);
  const out = [];
  const add = (type, sp, slot) => {
    if (!sp || sp.end <= sp.start) return;
    if (out.some((o) => o.start < sp.end && sp.start < o.end)) return;
    out.push({ type, start: sp.start, end: sp.end, slot });
  };
  const ofType = (t) => ex.spans.filter((s) => s.type === t);
  const numSpan = (v) => (ex.countSpan?.value === v ? ex.countSpan : ex.numberSpans?.find((s) => s.value === v));
  const order = ['url', 'host', 'target', 'port', 'pid', 'size', 'age', 'since', 'days', 'mode', 'glob',
    'src', 'dst', 'file', 'path', 'dest', 'archive', 'count', 'depth'];
  const keys = Object.keys(r).sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99));
  for (const k of keys) {
    const v = r[k];
    if (!used.has(k) || v == null) continue;
    switch (k) {
      case 'path': case 'file': case 'src': case 'dst': case 'dest': case 'archive':
        add('PATH', ex.spans.find((s) => (s.type === 'PATH' || s.type === 'QUOTED') && s.value === v) ||
          (k === 'path' || k === 'dest' ? findLit(text, v, out) : null), k); break;
      case 'count': case 'depth': add('NUM', numSpan(v), k); break;
      case 'days': add(ex.duration ? 'TIME' : 'NUM', ex.duration ? ofType('TIME')[0] : numSpan(v), k); break;
      case 'age': case 'since': add('TIME', ofType('TIME')[0], k); break;
      case 'size': add('SIZE', ofType('SIZE')[0], k); break;
      case 'port': add('PORT', ofType('PORT')[0] || numSpan(v), k); break;
      case 'pid': add('PID', ofType('PID')[0] || numSpan(v), k); break;
      case 'mode': add('MODE', ex.modeSpan, k); break;
      case 'glob': add('EXT', ofType('EXT')[0], k); break;
      case 'url': add('URL', ofType('URL')[0] || ofType('HOST')[0], k); break;
      case 'host': add('HOST', ofType('HOST').find((s) => s.value === v) || findLit(text, v, out), k); break;
      case 'target': {
        const hs = ofType('HOST').find((s) => s.value === v || String(v).endsWith(s.value)) || findLit(text, v, out);
        add('HOST', hs, k);
        const u = String(v).split('@');
        if (u.length === 2 && hs && !text.slice(hs.start, hs.end).includes('@')) add('USER', findLit(text, u[0], out), 'user');
        break;
      }
      default: {
        const type = SLOT_TAG[k];
        if (!type) break;
        const q = ex.spans.find((s) => s.type === 'QUOTED' && s.value === v);
        add(type, q || findLit(text, v, out), k);
      }
    }
  }
  out.sort((a, b) => a.start - b.start);
  return { spans: out, resolved: r, ex };
}

// ---------- value pools ----------
// TRAIN: values used to relexicalise training rows. EVAL: values used only by the e2e eval; they are
// disjoint from TRAIN and gen_data.js drops/relexicalises every training row that mentions one of them,
// so an eval value never occurs in any training text. Numbers come from disjoint ranges (see RANGES).
const P = {
  dir: ['/var/log', '/etc/nginx', '~/projects', './src', 'build', '/opt/app', '~/Documents/reports', '/srv/www',
    'node_modules', '../backup', '/tmp/cache', '~/Pobrane', '/mnt/data', '/home/ola/zdjecia', 'dist', '/var/lib/docker',
    '~/code/tellsh', 'src/components', '/usr/local/bin', '~/Desktop/stare', 'logs', '/data/exports', './tests', '/etc',
    '~/Music', 'public/img', '/var/www/html', 'vendor', '~/.config', '/backup/2024', 'docs', '/home/jan/projekty'],
  file: ['notes.txt', 'config.yaml', './scripts/run.sh', '/etc/hosts', 'app.log', 'README.md', 'data.csv', '~/.bashrc',
    'main.py', 'index.js', 'raport_2024.pdf', 'Dockerfile', 'docker-compose.yml', '/var/log/syslog', 'package.json',
    'server.conf', 'test.py', '/etc/fstab', 'faktura-03.pdf', 'src/app.ts', 'error.log', 'deploy.sh', 'zdjecie.jpg',
    '.env', 'requirements.txt', 'build/output.bin', 'notatki.md', '/var/log/nginx/access.log', 'Makefile', 'lista.txt',
    'schema.sql', 'wyniki_final.xlsx'],
  tar: ['backup.tar.gz', 'logs-2024.tgz', 'release.tar.gz', 'site.tar.gz', 'dane.tar.gz', 'archive.tar.gz', 'src.tgz', 'kopia.tar.gz'],
  zip: ['site.zip', 'photos.zip', 'projekt.zip', 'export.zip', 'docs.zip', 'zdjecia.zip', 'build.zip', 'raporty.zip'],
  proc: ['nginx', 'node', 'chrome', 'myapp', 'worker-2', 'api_server', 'java', 'python3', 'qzx-daemon', 'ffmpeg',
    'gunicorn', 'backend', 'firefox', 'redis-server', 'slack', 'celery', 'vite', 'postgres', 'spotify', 'crawler',
    'zoom', 'webpack', 'sidekiq', 'mongod', 'code', 'deno', 'kafka', 'puma'],
  service: ['nginx', 'docker', 'ssh', 'postgresql', 'redis', 'myapp', 'cron', 'apache2', 'api-gateway', 'mysql',
    'grafana-server', 'bluetooth', 'cups', 'fail2ban', 'containerd', 'prometheus', 'haproxy', 'php-fpm', 'jenkins', 'ufw'],
  container: ['web', 'db', 'redis-cache', 'api-1', 'my_app', 'frontend', 'nginx-proxy', 'worker', 'postgres-dev',
    'backend_2', 'kafka-broker', 'grafana', 'mailhog', 'minio', 'test-runner', 'app'],
  pkg: ['htop', 'curl', 'jq', 'ripgrep', 'tmux', 'ffmpeg', 'tree', 'ncdu', 'nmap', 'git', 'zsh', 'neofetch', 'wget', 'unzip', 'bat', 'fzf'],
  cmd: ['python3', 'node', 'git', 'docker', 'java', 'code', 'npm', 'pip', 'gcc', 'make', 'kubectl', 'go', 'ruby', 'cargo', 'psql', 'terraform'],
  script: ['dev', 'build', 'test', 'lint', 'start', 'typecheck', 'preview', 'format', 'e2e', 'serve', 'watch', 'storybook'],
  branch: ['main', 'develop', 'feature/login', 'fix-123', 'release/2.1', 'hotfix/crash', 'feat/JIRA-42-auth', 'dev',
    'staging', 'bugfix/null-ptr', 'experiment', 'feature/nowy-panel', 'v2', 'chore/deps', 'test/e2e', 'poprawki'],
  pattern: ['error', 'TODO', 'api_key', 'FIXME', 'Exception', 'localhost', 'password', 'timeout', 'deprecated',
    'NullPointer', 'warning', 'secret', 'session_id', 'błąd', 'uwaga', 'debug'],
  phrase: ['connection refused', 'out of memory', 'Not Found', 'permission denied', 'hello world', 'brak dostępu',
    'segmentation fault', 'disk full'],
  user: ['www-data', 'root', 'ola', 'deploy', 'jan', 'postgres', 'nobody', 'admin', 'kasia', 'git', 'ubuntu', 'marek'],
  msg: ['fix typo', 'initial commit', 'poprawki w README', 'add login form', 'wip', 'update deps', 'naprawa błędu logowania',
    'refactor parser', 'bump version', 'dodanie testów', 'remove dead code', 'nowy endpoint'],
  var: ['PATH', 'HOME', 'JAVA_HOME', 'NODE_ENV', 'EDITOR', 'LANG', 'DATABASE_URL', 'GOPATH', 'SHELL', 'USER', 'API_TOKEN', 'TERM'],
  text: ['hello', 'Hello World', 'secret123', 'zażółć', 'admin:admin', 'tellsh', 'abc123', 'my token'],
  host: ['google.com', '8.8.8.8', 'example.org', 'myserver.local', '192.168.1.10', 'github.com', 'api.example.com',
    'wp.pl', '10.0.0.5', 'onet.pl', 'db.internal', '1.1.1.1', 'cloudflare.com', 'serwer.firma.pl', 'localhost', 'gitlab.com'],
  userhost: ['root@myserver.com', 'ola@10.0.0.5', 'deploy@prod.example.com', 'jan@192.168.0.20', 'admin@vps.example.org',
    'ubuntu@ec2.example.net', 'git@serwer.pl', 'pi@raspberrypi.local'],
  url: ['https://example.com', 'https://github.com/user/repo.git', 'http://localhost:3000/health', 'https://api.example.com/v1',
    'https://x.org/file.zip', 'https://onet.pl', 'https://releases.example.com/app-1.2.tar.gz', 'http://192.168.1.1',
    'git@github.com:org/app.git', 'https://wp.pl', 'https://httpbin.org/get', 'https://cdn.example.net/img.png'],
  mode: ['755', '644', '600', '700', '640', 'u+x', 'g-w', 'a+r', '750', '+x'],
  ext: ['pdf', 'log', 'py', 'js', 'txt', 'json', 'md', 'csv', 'jpg', 'png', 'yaml', 'sh', 'html', 'ts', 'mp4', 'conf'],
  port: [22, 80, 443, 3000, 5432, 8080, 8443, 9000, 27017, 6379, 5173, 8000, 4200, 3306, 9090, 5000],
};
const E = {
  dir: ['/srv/qv-archiwum', '~/zz_badania/rok3', './pkg/vqlite', '/opt/kwartet/var', '/mnt/nas7/media', 'tmp_wyniki_q',
    '~/Pulpit/kwerendy', '/data/ingest-b7', 'src/qparse', '../kopie_xq'],
  file: ['qv_notatki.txt', 'zx-config.toml', '/srv/qv-app/settings.ini', 'raport_q4_qv.pdf', 'kwartet.log', 'ingest_b7.csv',
    'qvmain.go', '~/.qvrc', 'wnioski-qz.md', 'schemat_qv.sql'],
  tar: ['qv-kopia.tar.gz', 'zxlogs.tgz', 'kwartet-src.tar.gz'],
  zip: ['qv-zdjecia.zip', 'zx-export.zip', 'kwartet-docs.zip'],
  proc: ['qvworker', 'zxd-sync', 'kwartetd', 'ingestor-b7', 'qvproxy'],
  service: ['qv-api', 'zx-sched', 'kwartet', 'ingest-b7'],
  container: ['qv-db', 'zx_cache', 'kwartet-web', 'ingest-b7'],
  pkg: ['qvtool', 'zxutil', 'kwartet-cli'],
  cmd: ['qvctl', 'zxrun', 'kwartet'],
  script: ['bundle:analyze', 'proofread', 'smoke-suite'],
  branch: ['feature/qv-panel', 'fix/zx-77', 'release/qv-9', 'kwartet-refaktor'],
  pattern: ['QVERR', 'zx_timeout', 'kwartet_fail', 'błąd_qv'],
  phrase: ['qv sync failed', 'zx brak odpowiedzi'],
  user: ['qvadmin', 'zxops', 'kwartet'],
  msg: ['qv poprawka indeksu', 'zx cleanup', 'kwartet: nowy moduł'],
  var: ['QV_HOME', 'ZX_TOKEN', 'KWARTET_ENV'],
  text: ['qvsecret', 'zx tekst', 'kwartet9'],
  host: ['qv.internal.example', '172.31.77.9', 'zx-gw.example.net', 'kwartet.lan'],
  userhost: ['qvadmin@qv.internal.example', 'zxops@172.31.77.9', 'deploy@kwartet.lan'],
  url: ['https://qv.example.net/api/v3', 'https://zx.example.org/pkg-7.tar.gz', 'http://kwartet.lan:7781/status'],
  mode: ['711', '604', 'o+x', 'g+rw'],
  ext: ['qvd', 'zxl', 'toml', 'parquet'],
  port: [7781, 6612, 9471, 4719],
};
// numeric ranges: [train, eval] (disjoint)
const RANGES = { num: [[1, 30], [31, 60]], depth: [[1, 4], [5, 8]], pid: [[100, 49999], [50000, 99999]], port: [[20000, 65000], [10000, 19999]], qty: [[1, 30], [31, 60]] };
const pool = (name, split) => (split === 'eval' ? E[name] : P[name]);
const inRange = (rng, k, split) => { const [a, b] = RANGES[k][split === 'eval' ? 1 : 0]; return a + Math.floor(rng() * (b - a + 1)); };
export const POOLS = P;
export const EVAL_POOLS = E;
/** Every string value of the eval pools (gen_data.js keeps them out of all training text). */
export const EVAL_VALUES = [...new Set(Object.values(E).flat().map(String))];

const NUMW = {
  en: ['three', 'five', 'ten', 'twenty', 'two', 'seven'],
  pl: ['trzy', 'pięć', 'dziesięć', 'dwadzieścia', 'dwa', 'siedem'],
};

function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
const ARCH = /\.(tar\.gz|tgz|tar|zip|tar\.bz2|tar\.xz|gz)$/i;
const LOCISH = /\s|^(home|downloads?|pobrane|desktop|pulpit|documents|dokumenty)$/i;

function replacement(sp, orig, lang, rng, split) {
  const quotedCtx = sp.quoted;
  switch (sp.type) {
    case 'PATH': {
      if (LOCISH.test(orig) && !/[/~.]/.test(orig)) return null; // named location phrase: keep
      if (ARCH.test(orig)) return pick(rng, pool(/zip$/i.test(orig) ? 'zip' : 'tar', split));
      const fileish = /\.[A-Za-z0-9]{1,5}$/.test(orig) || ['file', 'src'].includes(sp.slot) && !/\/$/.test(orig) && /\./.test(orig);
      let v = pick(rng, pool(fileish ? 'file' : 'dir', split));
      if (quotedCtx && rng() < 0.3) v = v.replace(/[^/]*$/, (b) => b.replace(/[_-]/, ' '));
      return v;
    }
    case 'NUM': {
      if (sp.slot === 'depth') return String(inRange(rng, 'depth', split));
      if (split === 'eval' || /^\d+$/.test(orig) || rng() < 0.7) return String(inRange(rng, 'num', split));
      return pick(rng, NUMW[lang] || NUMW.en);
    }
    case 'TIME': case 'SIZE': {
      if (!/\d/.test(orig)) return null;
      return orig.replace(/\d+(?:[.,]\d+)?/, () => String(inRange(rng, 'qty', split)));
    }
    case 'PORT': return String(rng() < 0.6 ? pick(rng, pool('port', split)) : inRange(rng, 'port', split));
    case 'PID': return String(inRange(rng, 'pid', split));
    case 'MODE': return pick(rng, pool('mode', split));
    case 'EXT': {
      const e = pick(rng, pool('ext', split));
      if (/^\*\./.test(orig)) return '*.' + e;
      if (/^\./.test(orig)) return '.' + e;
      if (/^[a-z0-9]{1,5}$/i.test(orig) && orig.length <= 4) return e;
      return null; // alias word like "python" / "pythonowe": keep
    }
    case 'URL': return pick(rng, pool('url', split));
    case 'HOST': return orig.includes('@') ? pick(rng, pool('userhost', split)) : pick(rng, pool('host', split));
    case 'NAME': {
      const kind = { service: 'service', container: 'container', pkg: 'pkg', cmd: 'cmd', script: 'script' }[sp.slot] || 'proc';
      return pick(rng, pool(kind, split));
    }
    case 'BRANCH': return pick(rng, pool('branch', split));
    case 'PATTERN': case 'REPL': return quotedCtx && rng() < 0.4 ? pick(rng, pool('phrase', split)) : pick(rng, pool('pattern', split));
    case 'USER': return pick(rng, pool('user', split));
    case 'MSG': return pick(rng, pool('msg', split));
    case 'VAR': return pick(rng, pool('var', split));
    case 'TEXT': return quotedCtx ? pick(rng, pool('text', split)) : pick(rng, pool('text', split)).split(' ')[0];
    default: return null;
  }
}

/** Replace span values; returns { text, spans } with updated offsets. keepProb: chance to keep a value. */
export function relex(text, spans, { lang = 'en', rng, split = 'train', keepProb = 0.2 } = {}) {
  let out = '';
  let last = 0;
  const ns = [];
  for (const sp of spans) {
    const orig = text.slice(sp.start, sp.end);
    const quoted = /["'„“`]/.test(text[sp.start - 1] || '');
    let rep = rng() < keepProb ? null : replacement({ ...sp, quoted }, orig, lang, rng, split);
    if (rep != null && !quoted && /\s/.test(rep) && !['TIME', 'SIZE', 'MSG'].includes(sp.type)) rep = rep.split(' ')[0];
    const val = rep ?? orig;
    out += text.slice(last, sp.start);
    ns.push({ ...sp, start: out.length, end: out.length + val.length, replaced: rep != null });
    out += val;
    last = sp.end;
  }
  out += text.slice(last);
  return { text: out, spans: ns };
}

/** BIO labels for tokens given spans (a token takes the label of the span it overlaps most). */
export function bioLabels(toks, spans) {
  const labels = toks.map(() => 'O');
  for (const sp of spans) {
    let first = true;
    toks.forEach((t, i) => {
      const ov = Math.min(t.end, sp.end) - Math.max(t.start, sp.start);
      if (ov <= 0) return;
      if (/^["'„“”`]$/.test(t.text)) return;
      labels[i] = (first ? 'B-' : 'I-') + sp.type;
      first = false;
    });
  }
  return labels;
}

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
