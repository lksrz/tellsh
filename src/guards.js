// Release guards (v0.3 close5): checks on a finished suggestion that turn a command contradicting the request into a refusal.
//
//   negation / exclusion: "kill all python processes except 1234", "don't delete a.txt", "usuń pliki oprócz app.log",
//     "remove all .log files without app.log": the exclusion is never ignored. A command that cannot express it (no
//     --exclude, ! -name, grep -v, ...) is not suggested; the request is refused with a hint.
//   opposite action: "uninstall nginx", "odinstaluj nginx", "pip uninstall requests" is never `apt install` / `pip install`.
import { foldKeepLength } from './slots.js';

// exclusion words that always exclude something ("except", "other than", "oprócz", "z wyjątkiem", "everything but")
const EXCLUDE = /(?:^|[\s,;(])(?:except(?:\s+for)?|excepting|excluding|exclude|other\s+than|apart\s+from|aside\s+from|besides|save\s+for|but\s+not|(?:everything|all|anything|any|every\s+\S+|wszystko|wszystkie)\s+but|oprocz|procz|poza|z\s+wyjatkiem|za\s+wyjatkiem|wyjawszy|wykluczajac|pomijajac|omijajac)(?=[\s,;:]|$)\s*(.*)$/i;
// negation words that exclude only when a value follows them ("not 1234", "without app.log", "bez /tmp/x", "don't kill
// 1234"); otherwise they describe a manner ("without asking", "bez potwierdzenia", "not modified in 10 days")
const NEGATE_WORD = /(?:^|[\s,;(])(?:not|nor|never|without|nie|bez|ani|don'?t|do\s+not)(?=[\s,;:]|$)\s*(.*)$/i;
// words between an exclusion word and its value ("except pid 1234", "oprócz pliku app.log", "but not the file x")
const FILLER = /^(?:the|a|an|for|of|in|inside|from|on|at|under|within|w|we|na|do|pod|its|their|his|her|my|jego|jej|ich|pid|pids|process\w*|proces\w*|file|files|plik\w*|folder\w*|director(?:y|ies)|dir|katalog\w*|containers?|kontener\w*|services?|uslug\w*|package\w*|pakiet\w*|branch\w*|galez\w*|galaz\w*|images?|obraz\w*|those|these|that|this|one|ones|ten|ta|tego|tej|tych|numer\w*|number|nr|id|with|z|ze|named|called|o|nazwie)$/;
// a value: a number, a path, a file name with an extension, a glob, a quoted string
const VALUE = /^(?:\d+|[~./*][^\s]*|\S*[/\\]\S*|[\w@-]+\.[A-Za-z0-9]{1,5}|["'`„“].*)$/;
// the command expresses an exclusion
const EXPRESSED = /--exclude\b|--ignore\b|(?:^|\s)!\s+-|\s-not\s|\bgrep\s+(?:-\w*v|--invert-match)\b|-prune\b|\s-Exclude\b|-notlike\b|-notmatch\b/;
// a command that acts on a set (every matching process / file / container / package), not on the values it names
const SET_ACTING = /\b(?:pkill|killall)\b|\bfind\b.*\s-(?:delete|exec)\b|\$\(|\bxargs\b|\bprune\b|\brm\s+-\w*r|\bRemove-Item\b.*-Recurse|\|\s*Stop-Process\b|\btaskkill\b.*\/IM\b|\bdocker\s+(?:rm|stop|kill)\b.*\s-a\b/i;
const UNIVERSAL = /(?:^|\s)(?:all|every|everything|each|any|wszystk\w*|kazd\w*|cal[aey]\w*)(?=\s|$)/;
// action verbs a negation may stand before
const ACTION = String.raw`(?:delete|remove|rm|erase|wipe|purge|kill|terminate|stop|restart|reload|shut\w*|reboot|install|uninstall|upgrade|update|move|mv|rename|copy|cp|overwrite|push|pull|merge|deploy|drop|reset|clean|prune|format|chmod|chown|change|touch|run|start|create|make|commit|checkout|switch|enable|disable|truncate|empty|usuw\w*|usun\w*|kasuj\w*|skasuj\w*|wywal\w*|zabij\w*|ubij\w*|zatrzym\w*|restartuj\w*|zrestartuj\w*|przeladuj\w*|instaluj\w*|zainstaluj\w*|aktualizuj\w*|przeno\w*|przenies\w*|kopiuj\w*|skopiuj\w*|nadpis\w*|wypych\w*|wypchnij\w*|scal\w*|zmerguj\w*|resetuj\w*|czysc\w*|wyczysc\w*|formatuj\w*|zmieni\w*|zmien\w*|urucham\w*|uruchom\w*|odpal\w*|wylacz\w*|wlacz\w*|tworz\w*|utworz\w*|commituj\w*|zacommituj\w*)`;
// a prohibition of the whole request: "don't delete a.txt", "never remove /tmp/x", "nie usuwaj a.txt" (a negated action verb
// opening it). A prohibition later in the request ("merge pr 42 and don't delete the branch") negates a part of it: see NEGATE_WORD.
const PROHIBIT = new RegExp(String.raw`^\s*(?:(?:please|pls|prosze)\s+)?(?:don'?t|do\s+not|never|nie)\s+(?:(?:please|ever|prosze|wolno)\s+)?${ACTION}(?=[\s,;:.!?]|$)`, 'i');

// an English verb a request forbids -> the command words that perform it
const NEGATED_ACTION = {
  delete: ['rm', '-delete', 'delete', 'Remove-Item', 'del', 'rmdir'], remove: ['rm', '-delete', 'remove', 'uninstall', 'Remove-Item', 'del', 'rmdir', 'prune'],
  kill: ['kill', 'pkill', 'killall', 'Stop-Process', 'taskkill'], stop: ['stop', 'Stop-Service', 'Stop-Process'], restart: ['restart', 'Restart-Service'],
  start: ['start', 'Start-Service'], install: ['install'], uninstall: ['uninstall', 'remove', 'purge'], move: ['mv', 'Move-Item', 'move'],
  rename: ['mv', 'Rename-Item', 'ren'], copy: ['cp', 'Copy-Item', 'copy'], overwrite: ['-f', '--force'], push: ['push'], merge: ['merge'],
  deploy: ['deploy'], reset: ['reset'], prune: ['prune'], reboot: ['reboot'], chmod: ['chmod'], chown: ['chown'], commit: ['commit'],
};
const ACTION_WORD = new RegExp(String.raw`^${ACTION}$`, 'i');
const cleanTok = (w) => w.replace(/[),.;:!?]+$/, '');
/** The words after an exclusion word, past its filler words: the first one, or null. */
function excludedValue(rest, { verb = false } = {}) {
  const words = String(rest).trim().split(/\s+/).filter(Boolean).map(cleanTok);
  let i = verb && words.length && ACTION_WORD.test(foldKeepLength(words[0]).toLowerCase()) ? 1 : 0;
  while (i < words.length && i < 3 && FILLER.test(words[i].toLowerCase())) i++;
  return words[i] ?? null;
}
const cmdHas = (cmd, v) => {
  const bare = String(v).replace(/^["'`„“]+|["'`”]+$/g, '');
  return bare !== '' && String(cmd).split(/[\s'"=:]+/).some((t) => t === bare || t.replace(/^\.\//, '') === bare.replace(/^\.\//, ''));
};

/** Why the command contradicts a negation or exclusion in the request, or null. */
export function negationIssue(query, res) {
  if (!res?.command) return null;
  const q = String(query);
  const f = foldKeepLength(q).toLowerCase();
  const changing = res.risk !== 'safe';
  // ("don't deploy worker to prod" -> `--env <WENV>`: the placeholder is the user's to fill)
  if (changing && PROHIBIT.test(f) && !res.missing?.length) return `the request says not to do it (${f.match(PROHIBIT)[0].trim()}); not suggesting a command that does`;
  // "stop nginx, don't restart it": the action the request forbids is the command's own (a placeholder is the user's to fill:
  // "don't deploy worker to prod" -> `--env <WENV>`)
  for (const m of f.matchAll(/(?:^|[\s,;(])(?:don'?t|do\s+not|never)\s+(\w+)/g)) {
    const acts = NEGATED_ACTION[m[1]];
    if (changing && acts && !res.missing?.length && String(res.command).split(/\s+/).some((w) => acts.includes(w))) return `the request says not to ${m[1]}; not suggesting a command that does`;
  }
  if (EXPRESSED.test(res.command)) return null;
  const ex = f.match(EXCLUDE);
  if (ex) {
    const v = excludedValue(q.slice(q.length - ex[1].length));
    // a placeholder stands for the excluded part ("merge pr 42 but not in repo acme/app" -> `--repo <REPO>`): the user fills it
    const held = res.missing?.length > 0 && (v == null || !cmdHas(res.command, v));
    // a read-only command only when a value is excluded ("list files except .txt"; "czy ktoś poza mną" is no exclusion)
    if (!held && (changing || (v != null && (VALUE.test(v) || cmdHas(res.command, v))))) {
      return `the request excludes something (${q.slice(ex.index, ex.index + ex[0].length - ex[1].length).trim()} ${v ?? ''}) that ${res.intent || 'the command'} cannot leave out; not suggesting a command that would include it`;
    }
  }
  if (!changing) return null;
  for (let s = f, m = s.match(NEGATE_WORD); m; s = m[1], m = s.match(NEGATE_WORD)) {
    const v = excludedValue(q.slice(q.length - m[1].length), { verb: true });
    if (v == null || !VALUE.test(v)) continue;
    // "kill process 1234 not 5678" -> `kill 1234` leaves 5678 alone; `pkill -f python` or `kill 5678` does not
    if (cmdHas(res.command, v) || SET_ACTING.test(res.command) || UNIVERSAL.test(f)) {
      return `the request excludes ${v} (${m[0].trim().split(/\s+/)[0]} ${v}), which ${res.intent || 'the command'} cannot leave out; not suggesting a command that would include it`;
    }
  }
  return null;
}

// removing a package: never the install command
const UNINSTALL = /(?:^|[\s,(])(?:uninstall\w*|un-install\w*|deinstall\w*|remove|removing|rm|purge|erase|delete|drop|get\s+rid\s+of|odinstaluj\w*|deinstaluj\w*|usun\w*|usuw\w*|wyrzuc\w*|wywal\w*|skasuj\w*|pozbadz\s+sie)(?=[\s,;:.!?]|$)/i;
const INSTALLS = (res) => /install/.test(res.intent || '') || /(?:^|\s)(?:install|i|add)(?=\s|$)/.test(String(res.command).replace(/^sudo\s+/, '').split(/\s*[|;&]/)[0]);
/** The request removes a package but the command installs one. */
export function uninstallIssue(query, res) {
  if (!res?.command || !INSTALLS(res)) return null;
  const f = foldKeepLength(String(query)).toLowerCase();
  if (!UNINSTALL.test(f)) return null;
  return 'removing a package is not supported (apt remove <PKG>, pip uninstall <PKG>, npm uninstall <PKG>); not suggesting the install command';
}

/** A suggestion that contradicts its request becomes a refusal with a hint. */
export function releaseGuards(query, res) {
  const hint = uninstallIssue(query, res) || negationIssue(query, res);
  if (!hint) return res;
  const { shell, os, coreutils, threshold, context, confidence, tool, tools, candidates } = res;
  return { query, shell, os, coreutils, threshold, context, confidence, tool, tools, candidates, understood: false, method: 'none', command: null, missing: [], hint, refusedIntent: res.intent ?? null };
}
