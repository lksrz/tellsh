// End-to-end: request -> command for the target shell.
//
//   env (shell/os/coreutils) + history ctx ──► classifier context tokens (shell=, os=, ctx_*)
//   history rules ("same for X", "delete it") ─► may fix intent / fill slots deterministically
//   cascade: tool top-3 ─► intent (p(tool)·p(intent|tool))
//   slots: BIO tagger (tool-conditioned) ─► validated values; regex extraction fills/overrides failures
//   render for shell/os ─► danger check
//   low confidence (or unexplained modifiers) ─► second pass: experimental flag composer
import { getModel, loadModel } from './model.js';
import { fileURLToPath } from 'node:url';
import { cascade } from './cascade.js';
import { tag, exFromSpans } from './tagger.js';
import { extractSlots, pickArg, isOptionWord, foldKeepLength, isStopWord } from './slots.js';
import { resolveSlots, buildCommand, finalizeSlots, RAW_OK, newTemplateWithhold } from './fill.js';
import { BY_ID } from './catalog.js';
import { FAMILY_OF, NONE } from './tools.js';
import { detectEnv, envFeatures } from './env.js';
import { buildContext, resolveReference, hasPronoun, hasLocative, cwdFlags, sameBut, entityForSlot, isAmbiguous } from './history.js';
import { AMB } from './shellwords.js';
import { compose } from './compose.js';
import { assessCommand, maxRisk } from './danger.js';
import { releaseGuards, createsArchive } from './guards.js';
import { readFileSync } from 'node:fs';

let EXPLAINED = null;
const explained = () => {
  if (!EXPLAINED) {
    try { EXPLAINED = JSON.parse(readFileSync(new URL('../model/compose_explained.json', import.meta.url), 'utf8')); } catch { EXPLAINED = {}; }
  }
  return EXPLAINED;
};
const headOf = (cmd) => { const w = String(cmd).replace(/^sudo\s+/, '').split(/\s+/); return ['git', 'docker'].includes(w[0]) ? `${w[0]} ${w[1]}` : w[0]; };

// extracted "values" that are really the pronoun/filler words of a reference ("restart it", "zatrzymaj tę usługę")
const PRONOUN_VALUE = /^(it|its|that|this|them|those|one|again|back|there|here|to|tego|ten|tę|te|ta|tą|tej|tym|go|je|ją|ja|jego|jej|niego|nią|nia|nim|niej|mu|tamten|tamtego|tamto|ponownie|znowu)$/i;

// Non-path values must never start with `-` (they would become options: `ssh -oProxyCommand=…`,
// `curl -o/path`); paths get a ./ prefix at render time instead.
const FUNCTION_WORD = /^(?:the|a|an|of|for|to|in|on|at|by|with|from|into|onto|up|out|it|its|this|that|these|those|and|or|then|is|my|me|your|there|same|inside|w|we|z|ze|na|do|od|dla|o|i|oraz|jest|mi|moim|tym|ten|ta|to|tej|tam|stamtąd|stamtad|tamże|tamze|samym|samego)$/i;
// "folder out" / "plik w": a word that is normally a function word names the item when it directly follows the
// noun and ends the request (or is followed by a word that cannot start a location: "folder out sorted by size")
const NAME_NOUN = { path: String.raw`folder|directory|dir|katalog\w*|podkatalog\w*`, file: String.raw`file|plik\w*` };
const NAME_NEXT = /^(?:sorted|sort|sorting|recursively|recursive|please|now|force|forcibly|forcefully|posortowan\w*|rekurencyjnie|prosze|teraz)$/i;
function namedStopWord(text, k) {
  const m = String(text).match(new RegExp(String.raw`(?:^|\s)(?:${NAME_NOUN[k]})\s+(\S+)(?:\s+(\S+))?`, 'i'));
  if (!m || !FUNCTION_WORD.test(m[1]) || (m[2] != null && !NAME_NEXT.test(m[2]))) return null;
  if (m[2] == null && m.index + m[0].length !== String(text).trimEnd().length) return null;
  return m[1];
}
// "list files in the", "list files in out", "pokaż pliki w": the request names a location but its object is only
// function words. The path is withheld (placeholder), never silently replaced by the catalog default `.`.
const LOC_WORD = /^(?:in|inside|within|under|of|from|at|on|into|w|we|z|ze|na|do|od|pod|dla)$/i;
const LOC_NOUN = /^(?:folder\w*|directory|directories|dir|dirs|katalog\w*|podkatalog\w*|files?|plik\w*)$/i;
function danglingLocation(text) {
  const words = String(text).trim().replace(/[?!.,;:]+$/, '').split(/\s+/).filter(Boolean);
  while (words.length && NAME_NEXT.test(words[words.length - 1])) words.pop();
  const last = words.length - 1;
  if (last < 1 || !FUNCTION_WORD.test(words[last])) return false;
  if (LOC_WORD.test(words[last])) return true;
  for (let j = last - 1; j >= 0; j--) {
    if (LOC_WORD.test(words[j])) return true;
    if (!FUNCTION_WORD.test(words[j]) && !LOC_NOUN.test(words[j])) return false;
  }
  return false;
}
// a reference in destination position: "to it", "into that folder", "do niego", "there"
const REF_DST = /(?:^|\s)(?:to|into|onto|inside|in|do|na|w|we|pod)\s+(?:(?:the|that|this|those|these|same|ten|ta|tego|tamtego|tym|tamtym|tamten)\s+)?(?:(?:folder\w*|directory|dir|katalog\w*|location|place|miejsc\w*)(?=\s|$|[?!.,])|(?:it|that|this|them|there|tego|niego|nim|tym|tam|tamtego|tamten)(?=\s|$|[?!.,]))|(?:^|\s)(?:there|tam)(?=\s|$|[?!.,])/;
/** `v` appears in `text` right after a destination word ("to /tmp/old", "into backup", "do /tmp/old"). */
function afterDestWord(text, v) {
  const t = foldKeepLength(String(text)).toLowerCase();
  const fv = foldKeepLength(v).toLowerCase();
  for (let i = t.indexOf(fv); i >= 0; i = t.indexOf(fv, i + 1)) {
    if (/(?:^|\s)(?:to|into|onto|in|inside|do|na|w|we|pod|->|=>)\s+(?:the\s+|a\s+)?(?:(?:folder|directory|dir|katalog\w*|folderu|location)\s+)?["'“„]?$/.test(t.slice(0, i))) return true;
  }
  return false;
}
const WORDISH = (v) => /^(?!-)[\w@.:+-]{1,64}$/.test(v);
const VALID_SLOT = {
  // a bare function word ("on", "the", "w") is a tagging error, never a file or directory to act on
  path: (v) => typeof v === 'string' && v.length < 256 && !/[\n\0\u0001]/.test(v) && /[\w~./]/.test(v) && !FUNCTION_WORD.test(v),
  name: WORDISH, service: WORDISH, container: WORDISH, cmd: WORDISH,
  // npm scoped packages (`@types/node`, `@scope/pkg@1.2`) have one slash after the scope
  // pip requirements with a version constraint (`requests==2.32.0`, `django>=4,<5`, `uvicorn[standard]~=0.30`) or extras alone
  // (`requests[socks]`)
  pkg: (v) => WORDISH(v) || /^@[\w.-]{1,64}\/[\w.-]{1,64}(?:@[\w.^~<>=*-]{1,32})?$/.test(v) ||
    /^[A-Za-z][\w.-]{0,63}(?:\[[\w.,-]{1,64}\])?(?:(?:===?|[<>!~]=|[<>])[\w.*+!-]{1,32})(?:,(?:===?|[<>!~]=|[<>])[\w.*+!-]{1,32}){0,3}$/.test(v) ||
    /^[A-Za-z][\w.-]{0,63}@[\^~]?[\w.*-]{1,32}$/.test(v) || /^[A-Za-z][\w.-]{0,63}\[[\w.,-]{1,64}\]$/.test(v),
  branch: (v) => /^(?!-)[\w./-]{1,100}$/.test(v), user: (v) => /^[a-z_][\w.-]{0,31}$/i.test(v),
  glob: (v) => /^\*\.[\w]{1,8}$/.test(v),
  url: (v) => v.length < 2048 && (/^(?:https?|ftp|ftps|ssh|git|file):\/\/[^\s/?#]*[^\s]*$/i.test(v) || /^(?!-)[\w.-]+@[\w.-]+:[^\s]+$/.test(v)),
  args: () => false, scope: () => false, workspace: (v) => RAW_OK.workspace(v), pr: (v) => RAW_OK.pr(v), repo: (v) => RAW_OK.repo(v), wenv: (v) => RAW_OK.wenv(v), dryrun: (v) => RAW_OK.dryrun(v), delbranch: (v) => RAW_OK.delbranch(v), npmverb: (v) => RAW_OK.npmverb(v),
  host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
  pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
  old: (v) => v.length > 0 && v.length < 300 && !/[\n\r\0]/.test(v), new: (v) => v.length < 300 && !/[\n\r\0]/.test(v),
};
const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
// "that pr", "this pull request", "the same pr", Polish "zmerguj to pr": a pull request named by reference (English "merge
// changes to pr" is not one)
const PR_REFERENCE = /\b(?:that|this|its|the\s+same|the\s+previous|the\s+last|ten|tego|tamten)\s+(?:\w+\s+)?(?:prs?|pull[\s-]+requests?)\b|(?:^\s*|(?:^|\s)(?:zmerguj|scal|poka[zż]|zobacz|otw[oó]rz|zamknij|sprawd[zź]|wy[sś]wietl|zatwierd[zź]|zaakceptuj|przejrzyj)\S*\s+)to\s+(?:prs?|pull[\s-]+requests?)\b/i;
// "the other pr", "the latest pr", "my last pull request", "the most recent pr": a pull request picked out among several, which
// neither the current branch's pull request nor the one of the previous command is (withheld, also with history)
const PR_PICKED = /\b(?:(?:the|a|an|my|our|your|his|her|their|some|any)\s+)?(?:other|another|latest|newest|most\s+recent|recent|oldest|older|newer|earlier|next|first|second|third|new|old|pending|approved|remaining|(?:(?:my|our|your|his|her|their)\s+)(?:last|previous|prior)|inn[yaeoy]\w*|ostatni\w*|najnowsz\w*|poprzedni\w*|kolejn\w*|nastepn\w*|następn\w*|starsz\w*)\s+(?:(?:open|opened|draft|merged|github)\s+)?(?:prs?|pull[\s-]+requests?)\b/i;
const PR_CREATE_WORD = /(?<![\p{L}\d_])(?:create|creating|new|make|submit|raise|file|send|draft|utw[oó]rz\p{L}*|stw[oó]rz\p{L}*|now[yaeią]\p{L}*|za[lł][oó][zż]\p{L}*|wy[sś]lij\p{L}*)(?![\p{L}\d_])/iu;
const PR_NOT_CREATE = /(?<![\p{L}\d_])(?:approve\w*|accept\w*|lgtm|reopen\w*|re-open\w*|ready|undraft\w*|convert\w*|mark\w*|oznacz\w*|otw[oó]rz\s+ponownie|zatwierd[zź]\w*|zaakceptuj\w*|akceptuj\w*)(?![\p{L}\d_])|\b(?:in|on|w)\s+(?:the\s+|a\s+)?(?:web|browser|przegl[aą]dar\w*)\b/iu;
// a pull request URL (GitHub or GitHub Enterprise)
const PR_URL = /\bhttps:\/\/[\w.-]+\/[\w.-]+\/[\w.-]+\/pull\/\d+\b/i;
const PR_CLOSE = /(?:^|[\s,;])(?:close|closing|shut|reject|decline|abandon|cancel|zamkn\S*)(?=[\s.,!?;:]|$)/i;
// "merge and close pr 45": a merge the request asks for; "close pr 45 without merge", "do not merge pr 45", "unmerge pr 45":
// one it does not (a negation within the two words before it, or a prefix that undoes it)
const MERGE_WORD = /(?:^|[^\w-])((?:un|de)?merg\w*|(?:roz)?scal\w*)/gi;
const MERGE_NEGATION = /(?:\b(?:not|no|never|without|nor|instead\s+of|rather\s+than|nie|bez)|n't|\bdont|\bundo(?:\s+the)?|\brevert(?:\s+the)?|\bcofnij)\s+(?:\S+\s+){0,2}$/i;
const mergeAsked = (q) => [...String(q).matchAll(MERGE_WORD)].some((m) => !/^(?:un|de|roz)/i.test(m[1]) && !MERGE_NEGATION.test(q.slice(0, m.index + m[0].length - m[1].length)));
// slots naming the one thing a command acts on, other than a path (not free text: pattern, message, glob, ...)
const OPERAND_SLOT_NAMES = new Set(['name', 'service', 'container', 'pkg', 'host', 'target', 'branch', 'user', 'script', 'url', 'pid']);
for (const k of PATH_SLOT_NAMES) if (k !== 'path') VALID_SLOT[k] = VALID_SLOT.path;
export function validSlot(k, v) {
  if (v == null || v === '') return false;
  // a negation word is never the thing a command acts on ("kill the process that is not responding" is not `pkill -f not`)
  if (OPERAND_SLOT_NAMES.has(k) && /^(?:not|no|never|nie|bez|without|except|but|oprocz|oprócz|poza|ani)$/i.test(String(v))) return false;
  if (isAmbiguous(v)) return false;
  if (RAW_OK[k]) return RAW_OK[k](v);
  if (VALID_SLOT[k]) return VALID_SLOT[k](String(v));
  // `?…` marks a value that was named but withheld (fill.js): a placeholder, never rendered as `'?'`
  return String(v).length < 300 && !/\0/.test(String(v)) && !String(v).startsWith('?');
}
/** Values recovered from history go through the same validation as classifier/regex values. */
const validHistorySlots = (slots) => Object.fromEntries(Object.entries(slots || {}).filter(([k, v]) => ['namepat', 'sedexpr'].includes(k) || validSlot(k, v)));
/** History slots that failed validation (too long, a newline, ...): withheld as placeholders, never the catalog default. */
const invalidHistorySlots = (slots) => Object.keys(slots || {}).filter((k) => !['namepat', 'sedexpr'].includes(k) && slots[k] != null && !validSlot(k, slots[k]));

/**
 * Slot resolution: tagger is primary, regex is fallback + validator.
 * -> { slots, sources: {slot: 'tagger'|'regex'}, spans }
 */
export function resolveWithTagger(intentId, text, { model = getModel(), tool, mode = 'merge', tagger } = {}) {
  const intent = BY_ID[intentId];
  const exR = extractSlots(text);
  const rR = resolveSlots(intent, exR);
  if (mode === 'regex') return { slots: rR, sources: Object.fromEntries(Object.keys(rR).map((k) => [k, 'regex'])), spans: [] };
  // tagger: optional external slot tagger (hybrid encoder, src/rerank/) -> { spans }
  const t = tagger ? tagger(text, tool || FAMILY_OF[intentId]) : tag(text, tool || FAMILY_OF[intentId], model);
  const exT = exFromSpans(text, t.spans);
  const rT = resolveSlots(intent, exT);
  if (rT.archive && !exT.paths.includes(rT.archive)) delete rT.archive; // derived default, not a tagged value
  if (mode === 'tagger') return { slots: rT, sources: Object.fromEntries(Object.keys(rT).map((k) => [k, 'tagger'])), spans: t.spans };
  const slots = {};
  const sources = {};
  // a regex path that is only part of a tagged path word the tagger could not represent exactly
  // (or a named location inside it) must not stand in for it: the slot stays empty (placeholder)
  const partOfRejected = (v) => exT.rejectedPaths?.some((ch) => exR.spans.some((s) => s.type === 'PATH' && s.value === v && s.start < ch.end && ch.start < s.end && text.slice(s.start, s.end) !== ch.text));
  for (const k of new Set([...Object.keys(rT), ...Object.keys(rR)])) {
    if (k === 'namepat' || k === 'sedexpr') continue; // derived, recomputed below
    if (validSlot(k, rT[k])) { slots[k] = rT[k]; sources[k] = 'tagger'; } else if (rR[k] != null && (validSlot(k, rR[k]) || (!VALID_SLOT[k] && !String(rR[k]).startsWith('?'))) && !(PATH_SLOT_NAMES.has(k) && partOfRejected(rR[k]))) { slots[k] = rR[k]; sources[k] = 'regex'; }
  }
  // "delete the folder out", "du of folder out sorted by size": a stop word right after the noun is its name
  for (const k of ['path', 'file']) {
    if (!usesSlot(intent, k) || slots[k] != null) continue;
    const v = namedStopWord(text, k);
    if (v != null) { slots[k] = v; sources[k] = 'regex'; }
    break;
  }
  // a path the tagger or regex read but that was rejected (a bare function word: "in the", "of it"; a name with a
  // newline; part of a path the tagger could not represent), a location whose object is only function words, or a
  // place named only by reference ("there", "tam", "in the same folder"): withheld, so the command shows a
  // placeholder instead of the default `.`
  // with a place reference the location is "there", never a word the request names ("remove the logs in there")
  if (hasLocative(text) && slots.path != null && usesSlot(intent, 'path') && !usesSlot(intent, 'dst')) { delete slots.path; delete sources.path; }
  const withheld = [];
  for (const k of ['path', 'file']) {
    if (!usesSlot(intent, k) || slots[k] != null) continue;
    const rejected = [rT[k], rR[k]].some((v) => typeof v === 'string' && v !== '' && !validSlot(k, v)) || exT.rejectedPaths?.length > 0;
    if (rejected || danglingLocation(text) || hasLocative(text)) withheld.push(k);
    break;
  }
  // an operand the request names but that is not a valid value (`npm install @types/node;rm`): placeholder, never
  // silently dropped from an optional part of the template (`npm install`)
  const invalidOperands = [];
  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr', 'repo', 'wenv', 'num', 'args', 'scope', 'workspace', 'piptarget', 'rport', 'rhost', 'script']) {
    if (!usesSlot(intent, k) || slots[k] != null || withheld.includes(k)) continue;
    if ([rT[k], rR[k]].some((v) => typeof v === 'string' && v !== '' && !validSlot(k, v))) { withheld.push(k); invalidOperands.push(k); }
  }
  finalizeSlots(intent, slots);
  return { slots, sources, spans: t.spans, withheld, invalidOperands };
}

/** Explicit paths the request names (`/tmp/x`, `~/a`, `./b`, `"C:\\x"`, quoted names with a slash), in order, distinct. */
function explicitPaths(text) {
  const ex = extractSlots(text);
  return (ex.pathsWithQuoted || []).filter((p) => typeof p === 'string' && !/[*?]/.test(p) && !/^\w+:\/\//.test(p) &&
    (/^(?:~|\.{0,2}\/|[A-Za-z]:[\\/])/.test(p) || (ex.quoted.includes(p) && /[\\/]/.test(p))));
}

/** Every occurrence of `v` in `text` is inside backticks or `$(…)`: the value is the output of a command, not a name. */
function insideSubstitution(text, v) {
  if (!v) return false;
  let found = false;
  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) {
    found = true;
    const before = text.slice(0, i);
    const ticks = (before.match(/`/g) || []).length % 2 === 1;
    const open = before.lastIndexOf('$(');
    const paren = open >= 0 && !before.slice(open).includes(')');
    if (!ticks && !paren) return false;
  }
  return found;
}

// Unquoted paths with spaces (v0.3 close4): `delete the folder ~/Old Projects` names `~/Old Projects`, never `~/Old`. The
// words after a path up to the end of its span (the end of the request, a connector such as "to", a modifier such as
// "recursively", a noun such as "files") are part of its name; when that end is unclear (another file name, a number or
// another value, a name that already has an extension: `/tmp/a.txt b.txt`) the path is withheld as a placeholder.
const PATH_END = /^(?:to|into|o|u|a|przy|nad|pod|przed|za|ku|onto|in|inside|within|under|on|at|from|with|without|and|or|then|as|by|for|than|but|except|excluding|not|nie|nic|ani|nigdy|instead|via|using|if|when|where|which|that|who|so|w|we|z|ze|do|na|i|oraz|lub|albo|potem|jako|po|bez|niz|oprocz|poza|zamiast|ktore|ktory|ktora|gdzie|older|newer|larger|bigger|smaller|greater|less|more|modified|changed|created|edited|named|called|containing|matching|sorted|sort|sorting|recursively|recursive|please|pls|now|force|forcibly|forcefully|here|there|everywhere|only|first|last|top|including|showing|show|it|its|permanently|completely|entirely|fully|safely|quickly|immediately|again|also|too|instead|trwale|calkowicie|calkiem|natychmiast|ponownie|tez|rowniez|starsz\w*|nowsz\w*|wieksz\w*|mniejsz\w*|zmienion\w*|zmodyfikowan\w*|nazwie|nazwan\w*|zawierajac\w*|posortowan\w*|rekurencyjnie|prosze|teraz|tylko|tutaj|tam|wszedzie|folder\w*|director(?:y|ies)|dirs?|katalog\w*|podkatalog\w*|files?|plik\w*|archive|archiwum|environments?|srodowisk\w*)$/i;
const PATH_EXT = /\.[A-Za-z][A-Za-z0-9]{0,4}$/;
/**
 * The words that follow an unquoted path value in the request before the end of its span:
 * null (nothing follows, or the value is quoted / not found), { value } (the whole name) or { ambiguous: true }.
 */
// words of the request around a path, never part of its name ("node_modules is the largest", "/etc razem z podkatalogami")
const REQUEST_WORD = /^(?:is|are|was|were|be|been|being|am|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|don't|doesn't|didn't|won't|can't|does|do|did|has|have|had|will|would|can|could|should|must|may|might|contain|contains|reference|references|use|uses|used|take|takes|taking|eat|eats|eating|weigh|weighs|occupy|occupies|hold|holds|need|needs|get|gets|got|look|looks|appear|appears|exist|exists|mention|mentions|say|says|shows|lists|total|altogether|overall|combined|together|right|correct|ok|okay|thanks|thank|you|jest|sa|byl|byla|bylo|byly|bedzie|beda|ma|maja|mial|miala|mialy|zawiera|zawieraja|zajmuje|zajmuja|wazy|waza|razem|lacznie|wedlug|wg|ile|czy|sie|odwoluje|odwoluja|uzywa|uzywaja|uzywan\w*|edytowan\w*|zmienian\w*|dzieki|dziekuje|executable|runnable|readable|writable|writeable|inplace|in-place|point|points|one|level|levels|deep|human|wykonywaln\w*|uruchamialn\w*|uzytkownikowi|uzytkownika|wlasciciel\w*|kompresj\w*)$/i;
/**
 * The words that follow an unquoted path value `v` in the request before the end of its span: null (nothing follows, the
 * value is quoted or not found, or only words of the request follow), { value } (the whole name) or { ambiguous: true }.
 * `used`: the values of the other slots (a following path that is one ends the span). `strict`: a changing command, where
 * name words followed by words of the request (`/srv/my app is …`) are ambiguous; a read-only one keeps the first reading
 * and only takes an explicit path to the end of a run of name words.
 */
export function pathTail(text, v, spans = [], { used = [], strict = true } = {}) {
  if (typeof v !== 'string' || !v || /\s/.test(v) || REQUEST_WORD.test(foldKeepLength(v).toLowerCase())) return null;
  const other = spans.filter((sp) => sp.type !== 'PATH' && sp.start != null);
  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) {
    if (i > 0 && !/\s/.test(text[i - 1])) continue; // part of a word, or quoted
    if (!/^[ \t]+\S/.test(text.slice(i + v.length))) return null;
    const words = [];
    let ambiguous = false;
    let fileNext = false;
    let end = i + v.length;
    const re = /\S+/g;
    re.lastIndex = i + v.length;
    for (let m = re.exec(text); m; m = re.exec(text)) {
      const at = m.index;
      const w = m[0];
      const bare = w.replace(/[.,;:!?)]+$/, '');
      const fold = foldKeepLength(bare).toLowerCase();
      // another value of the request (a number, a size, a time, a name) after name words: where the name ends is unclear
      if (other.some((sp) => at < sp.end && sp.start < at + w.length) || /^\d/.test(bare)) { if (words.length) ambiguous = true; break; }
      if (!bare || PATH_END.test(fold) || /^[-–—"'„“`(]/.test(w)) break;
      // (the stop-word list names nouns too, `app`, `service`: only a read-only command stops at them)
      if (REQUEST_WORD.test(fold) || (!strict && isStopWord(fold))) { if (words.length) ambiguous = true; break; }
      if (/[\\/~$`*?]/.test(bare) || PATH_EXT.test(bare)) {
        // a second path: the next operand (`cp /tmp/a /tmp/b`), or a name the command would drop (`rm /tmp/a.txt b.txt`)
        if (!used.includes(bare) || words.length) { ambiguous = true; fileNext = true; words.push(bare); }
        break;
      }
      // a plain word that is the value of another slot (`chown … ~/x kwartet` with user kwartet) ends the name
      if (used.includes(bare)) break;
      words.push(bare);
      end = at + bare.length;
      if (bare !== w) break; // sentence punctuation ends the span
    }
    if (!words.length) return null;
    // a name with an extension is whole: plain words after it are the request's (`make script.sh executable`); only another
    // file name right after it is unclear (`rm /tmp/a.txt b.txt`)
    if (PATH_EXT.test(v)) return strict && fileNext && words.length === 1 ? { ambiguous: true, words } : null;
    if (ambiguous) return strict ? { ambiguous: true, words } : null;
    // a read-only command: only an explicit path that ends the request (`list files in ~/Old Projects`)
    if (!strict && (!/[\\/~]/.test(v) || /\S/.test(text.slice(end).replace(/^[.!?]+/, '')))) return null;
    return { value: v + text.slice(i + v.length, end), words };
  }
  return null;
}

// Source and destination of a two-path command (v0.3 close5): the request is split at its one connector ("to", "into",
// "do", "na", "as", "jako") before the paths are read, so `rename /tmp/my file.txt to /tmp/new.txt` never becomes
// `mv /tmp/my file.txt` (the third word silently dropped). Each side gives one value, the whole spaced name, or (when where
// it ends is unclear: `/tmp/my file.txt`, `report.txt notes.txt`) null, a placeholder.
// (not `ln -s`: "link to X" names the link's target, the first operand)
const TWO_PATH_INTENTS = new Set(['copy', 'move_rename']);
const DST_FILLER = /^(?:the|a|an|my|our|folder\w*|director(?:y|ies)|dir|katalog\w*|location|place|file|plik\w*|moj\w*)$/i;
function splitTwoPaths(query, slots) {
  const q = String(query);
  const masked = foldKeepLength(q).toLowerCase().replace(/(["'])(?:(?!\1).)*\1/g, (m) => 'x'.repeat(m.length));
  const cons = [...masked.matchAll(/\s(?:to|into|onto|as|do|na|jako|->|=>)\s/g)];
  if (cons.length !== 1) return null;
  const L = q.slice(0, cons[0].index);
  const R = q.slice(cons[0].index + cons[0][0].length);
  const vals = [slots.src, slots.dst].filter((v) => typeof v === 'string' && v !== '');
  // the first slot value on a side ("…/tmp/my…" before "file.txt"); quoted values are whole names
  // (a whole word: `build` is not the start of `build_old`)
  const wordAt = (side, v) => { for (let i = side.indexOf(v); i >= 0; i = side.indexOf(v, i + 1)) if ((i === 0 || /[\s"'„“`]/.test(side[i - 1])) && /^(?:$|[\s"'”`.,;:!?)])/.test(side.slice(i + v.length))) return i; return -1; };
  const anchor = (side) => vals.map((v) => ({ v, i: wordAt(side, v) })).filter((x) => x.i >= 0).sort((a, b) => a.i - b.i || b.v.length - a.v.length)[0]?.v ?? null;
  const read = (side, v) => {
    if (v == null) return { v: null, found: false };
    const t = pathTail(side, v, [], { strict: true });
    if (!t) return { v, found: true };
    return t.value != null && validSlot('src', t.value) ? { v: t.value, found: true } : { v: null, found: true, words: [v, ...t.words].join(' ') };
  };
  const src = read(L, anchor(L));
  let dv = anchor(R);
  if (dv == null) {
    const first = R.trim().split(/\s+/).find((w) => !DST_FILLER.test(w)) ?? '';
    const bare = first.replace(/[.,;:!?)]+$/, '');
    if (bare && !FUNCTION_WORD.test(bare) && !PRONOUN_VALUE.test(bare) && !/^["'„“`]/.test(bare)) dv = bare;
  }
  const dst = read(R, dv);
  if (!src.found && !dst.found) return null;
  // "move it to /tmp/old": a side without a value of its own never takes the other side's ("mv /tmp/old /tmp/old")
  if (!src.found && slots.src != null && slots.src === dst.v) return { src: { v: null, found: true, quiet: true }, dst };
  // "rename my notes.txt to notes.txt": the same name on both sides; the source is unclear ("my notes.txt"?)
  if (src.v != null && src.v === dst.v) return { src: { v: null, found: true, words: L.trim() }, dst };
  return { src, dst };
}

// An operand that is the noun of the request (v0.3 close5): "stop docker container web" names the container `web`, never
// `docker`. A value that is the tool or the noun itself is replaced by the word after the last such noun, or withheld.
const NOUN_VALUE = {
  container: /^(?:docker|dockera|podman|containers?|kontener\w*)$/i,
  service: /^(?:services?|systemd|systemctl|uslug\w*|usług\w*|serwis\w*|daemon|unit)$/i,
  pkg: /^(?:packages?|pakiet\w*|apt|apt-get|pip3?|npm|brew|dnf|yum)$/i,
  name: /^(?:process(?:es)?|proces\w*)$/i,
};
const NOUN_SKIP = /^(?:the|a|an|named|called|o|nazwie|nazwan\w*|id)$/i;
const NOUN_VERB = /^(?:stop|start|restart|run|show|list|ls|ps|logs?|remove|rm|kill|exec|status|enable|disable|reload|install|inspect|zatrzymaj|uruchom|zrestartuj|restartuj|usu[nń]|zabij|poka[zż]|wy[sś]wietl|zainstaluj|w[lł][aą]cz|wy[lł][aą]cz|logi)$/i;
function nounOperand(k, v, query) {
  const words = String(query).trim().split(/\s+/).map((w) => w.replace(/[.,;:!?]+$/, ''));
  let last = -1;
  words.forEach((w, i) => { if (NOUN_VALUE[k].test(w)) last = i; });
  // past the request's own words after it: "docker logs nginx", "docker exec -it api-server sh", "docker exec do api-server"
  let i = last + 1;
  while (i < words.length && (NOUN_SKIP.test(words[i]) || NOUN_VERB.test(words[i]) || FUNCTION_WORD.test(words[i]) || /^-/.test(words[i]))) i++;
  // nothing after it: the word right after the opening verb ("put eslint in the global npm packages", "instal pytest via pip")
  const c = words[i] ?? (words.length > 2 && !NOUN_VALUE[k].test(words[0]) && !FUNCTION_WORD.test(words[1]) && !NOUN_VERB.test(words[1]) && !NOUN_SKIP.test(words[1]) && !isStopWord(foldKeepLength(words[1]).toLowerCase()) ? words[1] : null);
  return c != null && !NOUN_VALUE[k].test(c) && validSlot(k, c) ? c : null;
}

/** `v` occurs in `text` only directly followed by punctuation that trimPathPunct removed (`/tmp/x!`). */
function trailingPunctAfter(text, v) {
  const at = [];
  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) at.push(text.slice(i + v.length));
  return at.length > 0 && at.every((after) => /^[.,;:!?)]+(?=\s|$)/.test(after));
}

/**
 * `v` was read from a quoted string of the request that ends in a backslash while the same quote
 * character appears again later (`"a\" -e evil"`): the user may have meant \" as an escaped quote,
 * so where the text ends is unclear.
 */
function cutAtEscapedQuote(text, v) {
  if (typeof v !== 'string' || !v.endsWith('\\')) return false;
  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) {
    const after = text.slice(i + v.length);
    if (/^["'”`]/.test(after) && after.slice(1).includes(after[0] === '”' ? '"' : after[0])) return true;
  }
  return false;
}
const TEXT_SLOT_NAMES = ['pattern', 'message', 'text', 'name', 'old', 'new', 'service', 'container', 'pkg', 'cmd', 'branch', 'user'];

const usesSlot = (intent, k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));

function flagTokens(cmd) {
  const set = new Set();
  for (const w of String(cmd).split(/\s+/)) {
    if (/^-[A-Za-z]+$/.test(w) && !w.startsWith('--')) for (const c of w.slice(1)) set.add('-' + c);
    else if (/^-/.test(w)) set.add(w.replace(/=.*$/, ''));
    else if (/^[a-z]{3}$/.test(w)) set.add(w); // ps aux
  }
  return set;
}

/** Second pass input: paths, numbers, ... from the merged extraction for the composer. */
function composeInput(text, model, tool, unclear = [], grown = {}) {
  const ex = extractSlots(text);
  const t = tag(text, tool, model);
  const exT = exFromSpans(text, t.spans);
  const merged = { ...ex };
  if (exT.paths.length) merged.paths = exT.paths;
  // a path the catalog read to the end of its name (`/srv/my` -> `/srv/my app`): the composer takes the whole name too
  if (merged.paths) merged.paths = merged.paths.map((p) => grown[p] ?? p);
  // paths followed by sentence punctuation (`/tmp/data!`): fine for a read-only command, but a composed
  // command that changes something is never aimed at them (see blocksAmbiguous)
  // the same for a path that is the output of a command (`on \`pwd\``, `$(pwd)`): the catalog withholds it too
  // and a quoted argument that may be words of the request (joinArgs)
  const amb = [...(merged.paths || []).filter((p) => trailingPunctAfter(text, p) || insideSubstitution(text, String(p))), ...unclear];
  // an unquoted path that more words may follow (`/srv/my app`): a composed command that changes something never takes its
  // first word alone (see blocksAmbiguous)
  amb.tails = (merged.paths || []).filter((p) => pathTail(text, p, t.spans) != null);
  for (const k of ['count', 'size', 'duration', 'ext', 'mode']) if (exT[k] != null) merged[k] = exT[k];
  const pattern = () => { const p = exT.tagged.PATTERN?.find((x) => !isOptionWord(x)) ?? ex.quoted[0] ?? pickArg('pattern', ex) ?? null; return cutAtEscapedQuote(text, p) ? null : p; };
  const nameOf = (type) => exT.tagged[type]?.[0] ?? null;
  return { ex: merged, pattern, nameOf, ambiguousPaths: amb };
}
/**
 * A composed command that changes something and uses a path whose end is unclear (`chmod -R 777 /tmp/data!`).
 * Composed commands are always high (the trust rule), so "changes something" is judged by the parser: a writing tool (chmod,
 * tar) or anything the danger checker flags on its own (find -delete, git/docker subcommands, ...).
 */
const WRITING_TOOLS = new Set(['chmod', 'tar']);
const blocksAmbiguous = (comp, amb) => !!comp && !comp.invalid && ((amb.some((p) => comp.command.includes(p)) &&
  (WRITING_TOOLS.has(comp.tool) || assessCommand(comp.command, 'safe').risk !== 'safe')) ||
  // a path whose name may go on: judged by the deny rules alone (a read-only `find /tmp -user bob` is not blocked)
  ((amb.tails || []).some((p) => comp.command.includes(p)) &&
  (WRITING_TOOLS.has(comp.tool) || assessCommand(comp.command, 'safe', { allowlist: { off: true } }).risk !== 'safe')));

/**
 * Pure function used by the CLI, eval and tests.
 * opts: { shell, os, env, history: string[] (commands, oldest first), cwd, threshold, top, compose: 'auto'|'force'|'off',
 *         slotMode: 'merge'|'tagger'|'regex', model, rerank, rerankTop (candidates the rerank hook sees; default top) }
 */
// the intents a typed command may become (a translation for the shell, never another program)
const LIT_FAMILY = { cargo: /^cargo_/, python: /^python_|^pip_|^run_python/, python3: /^python_|^pip_|^run_python/, py: /^python_|^pip_/, node: /^node_|^run_node/, go: /^go_/, make: /^make_/, terraform: /^terraform_/, helm: /^helm_/, brew: /^brew_|^pkg_/, apt: /^apt_|^pkg_/, 'apt-get': /^apt_|^pkg_/, winget: /^winget_|^pkg_/, mv: /^move_|rename/, 'move-item': /^move_|rename/, cp: /^copy_/, 'copy-item': /^copy_/, rm: /^delete_|^remove_/, rmdir: /^delete_dir/, 'remove-item': /^delete_|^remove_/, del: /^delete_/, erase: /^delete_/, rd: /^delete_dir/,
  ls: /^list_|^ls|dir_list|show_dir/, cat: /^cat_|^show_file|view_file/, git: /^git_/, gh: /^gh_/, docker: /^docker_/, kubectl: /^k8s_|^kube/, npm: /^npm_/, npx: /^npx_|^wrangler_|^npm_/, pnpm: /^pnpm_|^npm_/, yarn: /^yarn_|^npm_/,
  pip: /^pip_/, pip3: /^pip_/, wrangler: /^wrangler_/, ssh: /^ssh_/, scp: /^scp_|^copy_remote/, rsync: /^rsync|^sync_/, find: /^find_/, tar: /^tar_|^archive|^extract/, zip: /^zip_|^archive/, unzip: /^unzip|^extract/,
  kill: /^kill_/, pkill: /^kill_/, killall: /^kill_/, 'stop-process': /^kill_/, chmod: /^chmod|^perm/, chown: /^chown|^owner/, curl: /^download_|^http_|^curl/, wget: /^download_/, du: /^dir_size|^disk_/, df: /^disk_/,
  ps: /^process_|^list_process/, top: /^process_|^top/, ping: /^ping_/, grep: /^grep_|^search_/, head: /^head_|^show_file/, tail: /^tail_|^follow_/, wc: /^count_/, sort: /^sort_/, systemctl: /^service_/, service: /^service_/, history: /^history/, crontab: /^cron/ };
function literalIntentOk(first, intent) { const f = LIT_FAMILY[String(first).toLowerCase()]; return f ? f.test(String(intent)) : false; }

// 0.3.4 two-model gate: the 0.3.3 model (model/model.bin) answers everything it already knew; the retrained model
// (model/model_templates.bin) is used only when it picks one of the new 0.3.4 template intents, so a retrain can never
// change the pre-existing intents (their classification and slots stay exactly as on 0.3.3).
export const NEW_TEMPLATE_INTENTS = new Set(['git_fetch', 'git_ls_files', 'gh_run_watch', 'gh_issue_list', 'gh_issue_view', 'wrangler_d1_list', 'wrangler_pages_deploy', 'git_grep', 'git_show']);
const TEMPLATES_MODEL = fileURLToPath(new URL('../model/model_templates.bin', import.meta.url));
let templatesModel;
function getTemplatesModel() {
  if (templatesModel === undefined) { try { templatesModel = loadModel(TEMPLATES_MODEL); } catch { templatesModel = null; } }
  return templatesModel;
}
// applied to every answer (fresh, history replay, composed): a pip target a shell would expand or unescape is never runnable
function pipTargetGuard(res) {
  if (!res || !res.command || (res.missing || []).length || !/^pip_/.test(res.intent || '')) return res;
  const m = String(res.command).match(/--target\s+("([^"]*)"|'([^']*)'|(\S+))/);
  const pt = res.slots?.piptarget ?? (m ? (m[2] ?? m[3] ?? m[4]) : null);
  if (pt == null) return res;
  const win = /^(?:powershell|pwsh|cmd)$/.test(res.shell);
  const ok = win ? /^(?:[A-Za-z]:)?[\w.\-\/\\ ]+$/.test(String(pt)) : /^[\w.\-\/ ]+$/.test(String(pt));
  return ok ? res : { ...res, missing: ['piptarget (a variable or escape the shell would expand)'] };
}
// a request that refers back to the previous command: a pronoun, a place word, or same/again/them/its/that/those/this
const REFERS_BACK = /\b(?:it|its|it's|them|their|they|that|those|this|these|there|here|same|again|previous|above|tam|tu|tego|tej|ten|je|ich|go|jego|samo|znowu|ponownie|jeszcze)\b/i;
function refersBack(q) { return hasPronoun(q) || hasLocative(q) || REFERS_BACK.test(String(q)); }
export function suggest(query, opts = {}) {
  const once = (o) => pipTargetGuard(releaseGuards(query, replayFloor(suggestOnce(query, o))));
  if (opts.model) return once(opts);
  const tm = getTemplatesModel();
  if (!tm) return once(opts);
  // the templates model is probed without the rerank hook; with the hook, the reranked answer of either model may be consulted, and only a 0.3.4 template intent is kept from the templates model
  const probe = once({ ...opts, model: tm, rerank: undefined, gated: true });
  // a history refusal of the templates model (the previous line is a 0.3.4 template) is kept, never re-asked of 0.3.3
  if (probe && opts.history?.length && probe.context?.rule === 'refused' && !probe.command && probe.context.newTemplateLast) return probe;
  if (!probe || !NEW_TEMPLATE_INTENTS.has(probe.intent)) return once({ ...opts, gated: true });
  if (!opts.rerank) return probe;
  // with the hook: the reranked templates answer is kept only if it is still a 0.3.4 template intent, otherwise 0.3.3 answers
  const alt = once({ ...opts, model: tm, gated: true });
  return alt && NEW_TEMPLATE_INTENTS.has(alt.intent) ? alt : once({ ...opts, gated: true });
}

// the trust rule (danger.js): a command resolved from history (a reference, "same but …", a value from an earlier
// command) is a replay, not a fresh render of what the request says: at least high, never auto-run
const REPLAY = 'resolved from history (a replay of an earlier command, not a fresh catalog render); high risk: read it before pressing Enter';
function replayFloor(s) {
  if (!s?.command || s.method !== 'history-rule' || s.risk === 'high') return s;
  return { ...s, risk: maxRisk(s.risk, 'high'), warnings: [REPLAY, ...(s.warnings || [])] };
}

function suggestOnce(query, opts = {}) {
  const model = opts.model || getModel();
  const env = opts.env || detectEnv({ shell: opts.shell, os: opts.os });
  const top = opts.top ?? 3;
  const thr = opts.threshold ?? model.thresholds.accept;
  const composeMode = opts.compose || 'auto';
  // a NUL byte cannot be part of any command argument (and marks ambiguous values internally)
  if (/\0/.test(String(query))) {
    return { query, shell: env.shell, os: env.os, coreutils: env.coreutils, threshold: thr, context: { used: false }, understood: false, method: 'none',
      confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: 'the request contains a NUL byte' };
  }

  // ---- context (history + cwd), in memory only ----
  let ctx = null;
  if (opts.history?.length) {
    // an earlier `tellsh <query>`: what that request produced on its own (no history, no composer). Slots it left as
    // placeholders (refused, ambiguous, rejected) are ambiguous values here, never the catalog default or a guess.
    const quick = (q, unclearArgs) => {
      // with the two-model gate, an earlier request is classified by the gate too (both models read history the same way)
      const r = opts.gated ? suggest(q, { env, compose: 'off', unclearArgs, ...(opts.threshold != null ? { threshold: opts.threshold } : {}) }) : suggest(q, { model, env, threshold: thr, compose: 'off', unclearArgs });
      if (!r.understood || !r.intent || r.method !== 'catalog') return null;
      const slots = { ...(r.slots || {}) };
      for (const k of r.missing || []) slots[k] = AMB + `<${k}>`;
      return { intent: r.intent, slots };
    };
    const kind = opts.historyKind || opts.history.kind || (env.shell === 'powershell' ? 'pwsh' : 'posix');
    ctx = buildContext(opts.history, { classify: quick, cwd: opts.cwd, kind, query });
  }
  // 0.3.4: the previous history line is one of the new templates (git fetch, gh issue view, wrangler pages deploy, ...).
  // The 0.3.3 model never saw these lines as history, so they add no history features (the request is read as on 0.3.3),
  // and every follow-up that refers to that command is refused, except a "same for X" replay of the identical operation.
  const newLast = !!ctx && NEW_TEMPLATE_INTENTS.has(ctx.last?.intent);
  const cwdFeats = opts.cwd ? cwdFlags(opts.cwd).map((c) => 'ctx_cwd=' + c) : [];
  const ctxFeats = ctx && !newLast ? ctx.features : cwdFeats;
  const extras = [...envFeatures(env), ...ctxFeats];
  const ref = ctx ? resolveReference(query, ctx) : null;
  const context = ctx ? { used: true, commands: ctx.n, rule: ref?.rule || null, note: ref?.note || null } : { used: false };

  const base = { query, shell: env.shell, os: env.os, coreutils: env.coreutils, threshold: thr, context };
  if (newLast && ref?.rule !== 'same-for' && (ref || sameBut(query, ctx) || refersBack(query))) {
    context.rule = 'refused';
    context.newTemplateLast = true;
    context.note = `the previous command (${ctx.last.intent}) is new in this release; a follow-up that refers to it is only supported as "same for X"; not guessing`;
    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: context.note };
  }

  // ---- rule: "same for X" reuses the previous intent with one slot replaced ----
  if (ref?.rule === 'same-for') {
    const slots = validHistorySlots(ref.slots);
    // a value that fails validation (a 300-character path, ...) is a placeholder, never `find .`
    const blank = invalidHistorySlots(ref.slots);
    // `same for ~/Old Projects`, `same for ~/'Old Projects'`: the whole new name, or a placeholder when where it ends is
    // unclear (`same for /tmp/a.txt b.txt`; the words after "same for" are the target, so a read-only command reads them
    // strictly too); never its first word (`rm -r ~/Old`) or the part before a quote (`rm -r ~/`)
    let cutHistory = null;
    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null) {
      const v = String(slots[ref.changed]);
      const a = String(ref.arg ?? '').trim();
      const q = a.match(/^([^\s"']*)(["'])([^"']+)\2([^\s"']*)$/);
      const whole = /["']/.test(a) ? (q ? q[1] + q[3] + q[4] : null)
        : (() => { const t = pathTail(query, v, [], { strict: true }); return t ? t.value ?? null : v; })();
      if (whole != null && validSlot(ref.changed, whole)) slots[ref.changed] = whole;
      else { cutHistory = `${ref.changed}=${a}`; blank.push(ref.changed); delete slots[ref.changed]; }
    }
    // the new path ends in sentence punctuation (`same for /tmp/data!`): placeholder, as for any request
    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null && BY_ID[ref.intent].risk !== 'safe' && trailingPunctAfter(query, slots[ref.changed])) {
      blank.push(ref.changed);
      delete slots[ref.changed];
    }
    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank, keepOptional: blank });
    const res = { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
    const punct = blank.filter((k) => !invalidHistorySlots(ref.slots).includes(k) && !(cutHistory && k === ref.changed));
    if (cutHistory) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear where the new name ends (${cutHistory}); quote the path`];
    if (punct.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${punct.join(', ')}); quote the path`];
    // a replayed 0.3.4-template command gets the same withholding as a fresh request ("same for / without publishing")
    if (!(res.missing || []).length) { const w = newTemplateWithhold(ref.intent, query, slots, res.command); if (w.length) res.missing = w; }
    if (punct.length + (cutHistory ? 1 : 0) < blank.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: it is not a valid value (${blank.filter((k) => !punct.includes(k) && !(cutHistory && k === ref.changed)).join(', ')})`];
    return res;
  }
  // ---- the reference cannot be resolved at all ("what about this", an older command to replay) ----
  if (ref?.rule === 'refused' && ref.stop) {
    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: ref.note };
  }

  const sb = ctx && !ref ? sameBut(query, ctx) : null;
  // a request about the entries of the referenced directory does not use the history at all: its intent is read
  // without the history features (they favour `delete_dir` for "delete log files in this folder")
  // rerankTop: the re-ranker's own candidate count (A+B uses 5); independent of how many candidates are displayed
  const c0 = cascade(query, { model, extras: ref?.contents ? envFeatures(env) : extras, top: Math.max(top, opts.rerankTop || 0), restrictTool: sb ? FAMILY_OF[sb.lastIntent] : undefined });
  // rerank: optional hybrid hook (src/rerank/hybrid.js); history rules keep the linear cascade's decision
  const c = opts.rerank && !sb && !ref ? opts.rerank(c0, { thr }) : c0;
  const candidates = c.top.slice(0, Math.max(1, top)).map((t) => ({ intent: t.intent, tool: t.tool, p: +t.p.toFixed(4), description: BY_ID[t.intent]?.description }));
  const tools = c.tools.map((t) => ({ tool: t.tool, p: +t.p.toFixed(4) }));
  let intent = c.intent;
  let confidence = c.confidence;
  let method = 'catalog';
  if ((ref?.rule === 'pronoun' || ref?.rule === 'refused') && ref.intent) { intent = ref.intent; method = 'history-rule'; confidence = Math.max(confidence, thr); }
  if (sb) { method = 'history-rule'; confidence = Math.max(confidence, thr); context.rule = 'same-but'; context.note = `modifies previous ${sb.lastIntent}`; }
  // "merge https://github.com/o/r/pull/3": a merge of a pull request URL is never `git clone` of it
  if (intent === 'git_clone' && !sb && !ref && PR_URL.test(query) && mergeAsked(query)) intent = 'gh_pr_merge';
  // "same but force" after `rm -r old; ls newdir`: the command it would modify is not the previous one
  if (sb?.skipped && (BY_ID[sb.lastIntent].risk !== 'safe' || BY_ID[intent].risk !== 'safe')) {
    context.rule = 'refused';
    context.note = `the newest command that tellsh can modify (${sb.lastIntent}) is not the previous command; not guessing`;
    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
  }
  // "same but no push" after `git fetch --all`: a 0.3.4 template replayed as "same but ..." keeps its operation; a modification
  // that lands on another intent (git push, git pull, gh pr list) is refused, never a runnable different command
  if (sb && intent !== sb.lastIntent && (NEW_TEMPLATE_INTENTS.has(sb.lastIntent) || NEW_TEMPLATE_INTENTS.has(intent))) {
    context.rule = 'refused';
    context.note = `"same but ..." would change the previous command (${sb.lastIntent}) into another operation (${intent}); not guessing`;
    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
  }
  // "same for api" after `docker --context prod logs web`: repeated here it would run against the default daemon
  if (sb?.scoped) {
    context.rule = 'refused';
    context.note = `the previous command (${sb.lastIntent}) ran against another repository, directory or daemon (-C, --context, -H, ...); not guessing`;
    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
  }
  const out = { ...base, confidence: +confidence.toFixed(4), tool: FAMILY_OF[intent] || c.tool, tools, candidates };

  const tryCompose = (reason) => {
    if (composeMode === 'off') return null;
    // a place reference ("list files there", "tam") has no composer operand: never `find .` in its place
    if (hasLocative(query) && composeMode !== 'force') return null;
    // composer vocabulary and quoting are POSIX-only (fish treats \\ and \' as escapes inside single quotes)
    if (env.shell === 'powershell' || env.shell === 'cmd' || env.shell === 'fish') return null;
    const capable = c.tools.filter((t) => t.tool !== NONE);
    if (c.topTool === NONE && composeMode !== 'force') return null;
    const ci = composeInput(query, model, capable[0]?.tool, opts.unclearArgs);
    const r = compose(query, capable, ci.ex, { patternOf: ci.pattern, nameOf: ci.nameOf });
    if (!r || r.invalid) return r?.invalid ? { invalid: r.invalid, command: r.command } : null;
    if (blocksAmbiguous(r, ci.ambiguousPaths)) return null;
    // a value with a line break (`"/tmp/a\nb"`) is never composed into a command: the catalog withholds it too
    if (/[\r\n]/.test(r.command)) return null;
    // calibrated gate: confident stage-1 tool, or strong flag evidence (>= 2 triggered flags) for a likely tool
    const pOf = capable.find((t) => t.tool === r.tool)?.p ?? 0;
    if (composeMode !== 'force' && !(c.topToolP >= model.thresholds.compose || (r.triggered.length >= 2 && pOf >= 0.2))) return null;
    return { ...out, understood: true, method: 'composed', experimental: true, reason, intent: null, description: `composed ${r.tool}${r.sub ? ' ' + r.sub : ''} command (experimental)`,
      command: r.command, risk: r.risk, baseRisk: 'medium', warnings: r.warnings, critical: r.critical, missing: [], slots: {}, notes: null,
      composed: { tool: r.tool, sub: r.sub, flags: r.flags, validation: r.validation } };
  };

  if (confidence < thr && method === 'catalog') {
    const comp = tryCompose('low confidence');
    if (comp && !comp.invalid) return comp;
    const hint = hasPronoun(query) && !ctx ? 'this looks like a reference to an earlier command; try --history' : null;
    // "move it there" with history: an object and a place reference at once is refused, not reported as resolved
    if (ctx && hasPronoun(query) && hasLocative(query)) {
      context.rule = 'refused';
      context.note = 'the request names both an object ("it") and a place ("there") from the previous command; not guessing which is which';
      return { ...out, understood: false, method: 'history-rule', hint: context.note, composeError: comp?.invalid || null };
    }
    return { ...out, understood: false, method: 'none', hint, composeError: comp?.invalid || null };
  }
  // "close that pr", "close pr 45": the catalog has no command that closes a pull request; the opposite one (`gh pr create`)
  // or another one (`gh pr view 45`) is never suggested in its place
  // "close pr 45 and delete branch", "close pr 45 without merge": refused for gh_pr_merge too, unless the request also asks
  // for the merge ("merge and close pr 45"); "do not merge pr 45", "unmerge pr 45": never `gh pr merge 45`
  const closes = PR_CLOSE.test(query);
  const merges = intent === 'gh_pr_merge' && mergeAsked(query);
  // "revert pr 45": not `gh pr view 45` either
  if (intent?.startsWith('gh_pr_') && /\brevert\w*\b/i.test(query) && !merges) {
    return { ...out, understood: false, method: 'none', hint: 'reverting a pull request is not supported (gh pr revert <PR>)' };
  }
  // "approve pr", "open pr in web": approving or viewing a pull request, never `gh pr create` (which publishes a new one)
  if (intent === 'gh_pr_create' && !PR_CREATE_WORD.test(query) && PR_NOT_CREATE.test(query)) {
    return { ...out, understood: false, method: 'none', hint: 'approving, reopening, marking ready or opening an existing pull request is not supported (gh pr review --approve <PR>, gh pr reopen <PR>, gh pr ready <PR>, gh pr view --web <PR>); not suggesting gh pr create' };
  }
  if (intent?.startsWith('gh_pr_') && ((closes && !merges) || (intent === 'gh_pr_merge' && !merges && [...query.matchAll(MERGE_WORD)].length))) {
    const hint = closes ? 'closing a pull request is not supported (gh pr close <PR>)' : 'the request does not ask for a merge (it negates or undoes one); not suggesting gh pr merge';
    return { ...out, understood: false, method: 'none', hint };
  }

  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode, tagger: opts.tagger });
  const slots = r.slots;
  // "stop docker container web": the operand is never the tool or noun word (`docker stop docker`)
  const nounBlank = [];
  for (const k of Object.keys(NOUN_VALUE)) {
    if (slots[k] == null || !NOUN_VALUE[k].test(String(slots[k]))) continue;
    const c = nounOperand(k, String(slots[k]), query);
    if (c != null) slots[k] = c; else { delete slots[k]; delete r.sources[k]; nounBlank.push(k); }
  }
  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
  const ambiguousPaths = [];
  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
  const blank = new Set([...(r.withheld || []), ...nounBlank]);
  // withheld operands whose optional part keeps its placeholder: an invalid operand, a history value that is ambiguous or
  // invalid (`gh pr merge <PR>` for "same but merge" after `tellsh merge pr nightly`, never the current branch's pull request)
  const keep = new Set([...r.invalidOperands, ...nounBlank]);
  // an unquoted path followed by more words of its name (`~/Old Projects`): the whole name, or a placeholder when where it
  // ends is unclear; never the first word alone
  const cutPaths = [];
  const grown = {};
  for (const k of Object.keys(slots)) {
    if (!PATH_SLOT_NAMES.has(k) || r.sources[k] === 'history') continue;
    const t = pathTail(query, slots[k], r.spans, { used: Object.entries(slots).filter(([j]) => j !== k).map(([, x]) => String(x)), strict: BY_ID[intent].risk !== 'safe' });
    if (!t) continue;
    if (t.value != null && validSlot(k, t.value)) { grown[slots[k]] = t.value; slots[k] = t.value; continue; }
    cutPaths.push(`${k}=${slots[k]} ${t.words.join(' ')}`); delete slots[k]; delete r.sources[k]; blank.add(k); keep.add(k);
  }
  if (cutPaths.length) finalizeSlots(BY_ID[intent], slots);
  if (BY_ID[intent].risk !== 'safe') {
    for (const k of Object.keys(slots)) {
      if (PATH_SLOT_NAMES.has(k) && r.sources[k] !== 'history' && trailingPunctAfter(query, slots[k])) { ambiguousPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
    }
    if (ambiguousPaths.length) finalizeSlots(BY_ID[intent], slots);
  }
  // `rename /tmp/my file.txt to /tmp/new.txt`, `move report.txt notes.txt to /tmp/dir`: the source is what precedes "to",
  // the destination what follows it; an unclear side is a placeholder + warning, never another word of the request
  const splitPaths = [];
  if (TWO_PATH_INTENTS.has(intent) && !ref && !sb && !hasLocative(query)) {
    const sp = splitTwoPaths(query, slots);
    for (const [k, side] of sp ? [['src', sp.src], ['dst', sp.dst]] : []) {
      if (!side.found || r.sources[k] === 'history') continue;
      if (side.v == null) { if (!side.quiet) splitPaths.push(`${k}=${side.words}`); delete slots[k]; delete r.sources[k]; blank.add(k); keep.add(k); } else if (slots[k] !== side.v) { slots[k] = side.v; r.sources[k] = 'regex'; }
    }
    if (sp) finalizeSlots(BY_ID[intent], slots);
  }
  // a changing command whose path is the output of a command (`in \`pwd\``, `$(pwd)`), or a request that names more
  // explicit paths than the command takes (`in /tmp/x and /tmp/y`: only one would be used): placeholder + warning
  const unclearPaths = [];
  if (BY_ID[intent].risk !== 'safe') {
    const explicit = explicitPaths(query);
    const nPathSlots = [...PATH_SLOT_NAMES].filter((k) => usesSlot(BY_ID[intent], k)).length;
    const dropped = explicit.filter((p) => !Object.values(slots).some((v) => String(v) === p || String(v).startsWith(p + ' ')));
    const tooMany = explicit.length > nPathSlots && dropped.length > 0;
    // `in $(pwd)`: the location is the output of a command, so an empty path slot is withheld too (never `.`)
    if (/\$\(|`/.test(query)) for (const k of ['path', 'file']) if (usesSlot(BY_ID[intent], k) && slots[k] == null && !unclearPaths.length) { unclearPaths.push(`${k}=?`); blank.add(k); }
    for (const k of Object.keys(slots)) {
      if (!PATH_SLOT_NAMES.has(k) || r.sources[k] === 'history') continue;
      const sub = insideSubstitution(query, String(slots[k]));
      if (sub || tooMany) { unclearPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
    }
    if (tooMany) for (const k of PATH_SLOT_NAMES) if (usesSlot(BY_ID[intent], k) && slots[k] == null) blank.add(k);
    if (unclearPaths.length || tooMany) finalizeSlots(BY_ID[intent], slots);
    if (tooMany && !unclearPaths.length) unclearPaths.push(dropped.join(', '));
    if (tooMany) unclearPaths.tooMany = true;
  }
  // `tellsh delete folder "my data"`: a quoted argument that may be a name or words of the request (see joinArgs). A
  // changing command never takes it (or a part of it) as its path or other operand (process, service, container,
  // package, ...): placeholder + warning
  const unclearArgs = [];
  if (BY_ID[intent].risk !== 'safe' && opts.unclearArgs?.length) {
    const words = (x) => String(x).toLowerCase().split(/\s+/).filter(Boolean);
    const partOf = (v, u) => { const a = words(u); const b = words(v); return b.length > 0 && a.some((_, i) => b.every((w, j) => a[i + j] === w)); };
    for (const k of Object.keys(slots)) {
      if (!(PATH_SLOT_NAMES.has(k) || OPERAND_SLOT_NAMES.has(k)) || r.sources[k] === 'history') continue;
      const u = opts.unclearArgs.find((x) => partOf(slots[k], x));
      if (u != null) { unclearArgs.push(`${k}=${u}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
    }
    if (unclearArgs.length) finalizeSlots(BY_ID[intent], slots);
  }
  const ambiguousText = [];
  for (const k of TEXT_SLOT_NAMES) {
    if (slots[k] != null && cutAtEscapedQuote(query, slots[k])) { ambiguousText.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
  }
  if (ambiguousText.length) { delete slots.sedexpr; delete slots.namepat; finalizeSlots(BY_ID[intent], slots); }
  // "move it to /tmp/old", "copy them to /backup": the reference is the source, so the one path the request
  // names is the destination (never `mv /tmp/old <DST>`). "copy notes.txt to it / into that folder / there":
  // the reference is the destination and the named path the source (never `cp -ri /backup notes.txt`).
  const itR = BY_ID[intent];
  const fq = foldKeepLength(query).toLowerCase();
  const twoPaths = usesSlot(itR, 'src') && usesSlot(itR, 'dst');
  const isRef = ref?.rule === 'pronoun' || ref?.rule === 'refused';
  const locative = hasLocative(query);
  // "move it there": an object reference and a place reference at once. Which history value is the source and
  // which the destination cannot be told from one previous command (`cd /tmp/x; cat a.txt`): both are withheld.
  const bothRefs = twoPaths && locative && hasPronoun(query);
  const refDst = !bothRefs && twoPaths && isRef && REF_DST.test(fq);
  // the slots the reference fills (pronoun) or leaves empty (refused / guarded)
  const refFill = refDst ? (ref.fill ? { dst: Object.values(ref.fill)[0] } : {}) : ref?.fill || {};
  if (bothRefs) {
    for (const k of Object.keys(slots)) if (PATH_SLOT_NAMES.has(k)) { delete slots[k]; delete r.sources[k]; }
    for (const k of PATH_SLOT_NAMES) if (usesSlot(itR, k)) blank.add(k);
    finalizeSlots(itR, slots);
    if (ctx) { context.rule = 'refused'; context.note = 'the request names both what to move and where ("it" … "there"); not guessing which is which'; }
    method = ctx ? 'history-rule' : method;
  } else if (refDst) {
    if (slots.src == null && slots.dst != null && !PRONOUN_VALUE.test(String(slots.dst))) { slots.src = slots.dst; r.sources.src = r.sources.dst; }
    delete slots.dst; delete r.sources.dst;
    if (slots.src != null && PRONOUN_VALUE.test(String(slots.src))) { delete slots.src; delete r.sources.src; }
    if (ref.rule === 'refused') blank.add('dst');
  } else if (isRef && twoPaths && slots.src != null && slots.dst == null &&
      !PRONOUN_VALUE.test(String(slots.src)) && (ref.fill?.src != null || ref.blank?.includes('src'))) {
    slots.dst = slots.src; r.sources.dst = r.sources.src;
    delete slots.src; delete r.sources.src;
    if (ref.rule === 'refused' || ref.guarded) blank.add('src');
  }
  // "move them to /tmp/old" with nothing resolved for "them" (no history, an unrelated history, ...): the one named
  // path follows "to"/"into"/"do", so it is the destination; the source stays a placeholder (never `mv /tmp/old <DST>`)
  if (!bothRefs && twoPaths && slots.src != null && slots.dst == null && !refDst && afterDestWord(query, String(slots.src))) {
    slots.dst = slots.src; r.sources.dst = r.sources.src;
    delete slots.src; delete r.sources.src;
    blank.add('src');
  }
  // values that are only the words of a refused or guarded reference: a pronoun, or the `.` the tagger reads for
  // "this folder" / "that directory" (never `rm -r .` for "delete all log files in this folder")
  const refWordsOnly = () => {
    for (const k of Object.keys(slots)) {
      if (PRONOUN_VALUE.test(String(slots[k])) || (PATH_SLOT_NAMES.has(k) && slots[k] === '.' && !/(?:^|\s)\.(?:\s|$)/.test(query))) { delete slots[k]; delete r.sources[k]; }
    }
  };
  if (ref?.rule === 'refused') {
    // the reference points at something we cannot read safely: leave the slot empty (placeholder); a pull request stays
    // `<PR>` even then (left out, `gh pr merge` would act on the current branch's)
    refWordsOnly();
    for (const k of refDst ? [] : ref.blank || []) if (slots[k] == null && usesSlot(BY_ID[intent], k)) { blank.add(k); if (!ref.blanket || k === 'pr') keep.add(k); }
    // "show it" after an unreadable command: the pronoun is not the default `.` either
    if (hasPronoun(query)) for (const k of PATH_SLOT_NAMES) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
    finalizeSlots(BY_ID[intent], slots);
    method = 'history-rule';
  }
  // "remove the logs there", "delete notes.txt there": a place reference never names the object of a changing
  // command (`rm -r DIR`, `mv DIR …`); only the location a search-and-change runs in (`find DIR … -delete`). Any path
  // the request names is relative to the wrong directory, so every path slot is withheld (with or without history).
  // "move it there" with history: an object and a place reference at once is refused for any changing intent, at any confidence
  if (ctx && ref?.rule !== 'refused' && hasPronoun(query) && locative && BY_ID[intent].risk !== 'safe') {
    for (const k of Object.keys(slots)) if (PATH_SLOT_NAMES.has(k) || r.sources[k] === 'history') { delete slots[k]; delete r.sources[k]; }
    for (const k of Object.keys(BY_ID[intent].slots || {})) if (usesSlot(BY_ID[intent], k)) blank.add(k);
    finalizeSlots(BY_ID[intent], slots);
    context.rule = 'refused';
    context.note = 'the request names both an object ("it") and a place ("there") from the previous command; not guessing which is which';
    method = 'history-rule';
  } else if (locative && !refDst && !bothRefs && BY_ID[intent].risk !== 'safe' && FAMILY_OF[intent] !== 'find' && [...PATH_SLOT_NAMES].some((k) => usesSlot(BY_ID[intent], k))) {
    for (const k of Object.keys(slots)) if (PATH_SLOT_NAMES.has(k)) { delete slots[k]; delete r.sources[k]; }
    for (const k of PATH_SLOT_NAMES) if (usesSlot(BY_ID[intent], k)) blank.add(k);
    finalizeSlots(BY_ID[intent], slots);
    if (ctx) {
      context.rule = 'refused';
      context.note = `"there" names a place, not what ${intent} would change; not guessing`;
      method = 'history-rule';
    }
  } else if (ref?.rule === 'pronoun' && ref.guarded && BY_ID[intent].risk !== 'safe') {
    // the value must not be changed (search root, listed directory, ...; see changeGuard) and the classifier
    // picked a modifying intent: refuse
    refWordsOnly();
    // (a pull request keeps its `<PR>`: left out, `gh pr merge` would act on the current branch's)
    for (const k of Object.keys(refFill)) if (slots[k] == null && usesSlot(BY_ID[intent], k)) { blank.add(k); if (k === 'pr') keep.add(k); }
    finalizeSlots(BY_ID[intent], slots);
    context.rule = 'refused';
    context.note = ref.guardNote;
    method = 'history-rule';
  } else if (ref?.rule === 'pronoun') {
    const it = BY_ID[intent];
    for (const [k, v] of Object.entries(refFill)) {
      // a pull request the request names but that cannot be read ("merge the pr that fixes login", `that pr "bob's"`): the
      // request means that one, not the history's, so it stays withheld (as without history)
      if (k === 'pr' && r.invalidOperands.includes(k)) { if (usesSlot(it, k)) { blank.add(k); keep.add(k); } continue; }
      if (!validSlot(k, v)) {
        // the referenced value cannot be used (too long, a newline, ...): placeholder, never the catalog default
        if (slots[k] != null && PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
        if (slots[k] == null && usesSlot(it, k)) { blank.add(k); keep.add(k); }
        continue;
      }
      // the referenced value wins unless the request spells out its own value literally ("kill 4242")
      const literal = slots[k] != null && !PRONOUN_VALUE.test(String(slots[k])) && new RegExp(`(^|[^\\w])${String(slots[k]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^\\w])`, 'i').test(query);
      if (usesSlot(it, k) && (!literal || (k === 'path' && slots[k] === '.'))) { slots[k] = v; r.sources[k] = 'history'; }
    }
    // the chosen command does not take the referenced value: do not claim it was used
    if (!Object.values(r.sources).includes('history')) { context.rule = null; context.note = `the ${ref.ent} from history does not fit ${intent}; not used`; }
    finalizeSlots(it, slots);
    method = 'history-rule';
  }
  if (sb) {
    const it = BY_ID[intent];
    for (const [k, v] of Object.entries(validHistorySlots(sb.lastSlots))) {
      if (usesSlot(it, k) && slots[k] == null && !blank.has(k) && !['namepat', 'sedexpr'].includes(k)) { slots[k] = v; r.sources[k] = 'history'; }
    }
    // a slot of the previous command that depends on the shell state (`find "$DIR" …`) or is not a valid value
    // (a 300-character path): placeholder, not `.`
    const withheld = [...(sb.blank || []), ...invalidHistorySlots(sb.lastSlots)].filter((k) => usesSlot(it, k) && slots[k] == null && !['namepat', 'sedexpr'].includes(k));
    for (const k of withheld) { blank.add(k); keep.add(k); }
    if (withheld.length) { context.rule = 'refused'; context.note = `previous ${sb.lastIntent} has ${withheld.join(', ')} that depends on the shell state or is not a valid value; not guessing`; }
    finalizeSlots(it, slots);
  }
  // "merge the other pr", "merge my last pr": not the previous command's pull request either, unless the request names one;
  // "merge that pr in repo a/b": the previous command's pull request was one of the working directory's repository
  if (usesSlot(BY_ID[intent], 'pr') && (slots.pr == null || r.sources.pr === 'history') && (PR_PICKED.test(query) || (r.sources.pr === 'history' && slots.repo != null))) {
    delete slots.pr; delete r.sources.pr;
    blank.add('pr'); keep.add('pr');
    context.rule = ctx ? 'refused' : context.rule;
    if (ctx) context.note = 'the request means a pull request (another one, or one in another repository) the history does not name; not guessing';
  }
  // "merge that pr" with no history to read it from: the pull request is withheld, never the current branch's
  if (!ref && slots.pr == null && usesSlot(BY_ID[intent], 'pr') && PR_REFERENCE.test(query)) {
    blank.add('pr'); keep.add('pr');
    if (ctx) { context.rule = 'refused'; context.note = 'the request refers to a pull request the history does not name; not guessing'; }
  }
  let b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: [...keep] });
  // implicit reference: a required slot is still missing and the history has a value of that type.
  // Only for safe intents: a destructive command ("delete the folder") is never aimed at a history
  // value without an explicit reference word ("delete it"), which goes through resolveReference.
  // 0.3.4: never from a 0.3.4 template history line (`deploy site.v2` + "show contents" is not `cat site.v2`)
  if (ctx && !newLast && b.missing.length && ref?.rule !== 'refused' && BY_ID[intent].risk === 'safe' && b.risk === 'safe') {
    const filled = [];
    for (const m of b.missing) {
      if (r.withheld?.includes(m)) continue; // "list files in the": not a reference to history either
      const e = entityForSlot(m, ctx);
      // an ambiguous newest value blocks the fill; ctx.last is consulted only when no entity type applies
      const v = e ? (e.ambiguous ? null : e.value) : (ctx.last?.slots?.[m] ?? null);
      if (v != null && validSlot(m, v)) { slots[m] = v; r.sources[m] = 'history'; filled.push(`${m}=${v}`); }
    }
    if (filled.length) {
      finalizeSlots(BY_ID[intent], slots);
      b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: [...keep] });
      method = 'history-rule'; // history-derived: never auto-run by --yes
      context.rule ??= 'implicit';
      context.note = [context.note, `filled from history: ${filled.join(', ')}`].filter(Boolean).join('; ');
    }
  }
  if (Object.values(r.sources).includes('history')) method = 'history-rule';
  const res = { ...out, understood: true, method, ...b, slotSources: r.sources, spans: r.spans.map((s) => ({ type: s.type, text: s.text })) };
  // a refused history reference is never runnable as is, even when the intent has no slot left to blank (`git push`)
  if (context.rule === 'refused' && !(res.missing || []).length) res.missing = ['reference (refused: edit the command)'];
  // 0.3.4 templates: a restriction / option / value boundary the template cannot express is withheld, never dropped
  if (!(res.missing || []).length && res.intent) { const w = newTemplateWithhold(res.intent, query, slots, res.command); if (w.length) res.missing = w; }
  // 0.3.4 retrain guard: a request that already is a shell command is never rewritten into a different runnable one —
  // a compound line (| ; && > $( `) or an option the rendered command drops is withheld; nothing is moved/copied into a null device
  if (!(res.missing || []).length && res.command) {
    const q = String(query).trim();
    const LIT = /^(?:sudo|mv|cp|rm|rmdir|ln|chmod|chown|git|wget|curl|ssh|scp|rsync|find|ls|cat|tar|zip|unzip|kill|pkill|killall|docker|kubectl|npm|npx|pnpm|yarn|pip|pip3|python|python3|node|gh|wrangler|dd|mkfs|shutdown|reboot|systemctl|service|iex|iwr|irm|invoke-expression|invoke-webrequest|remove-item|move-item|copy-item|set-content|stop-process|powershell|pwsh|bash|sh|zsh|cmd|del|erase|rd|format|reg|netsh|crontab|truncate|shred|history|grep|sed|awk|xargs|head|tail|sort|uniq|wc|du|df|ps|top|ping|nc|ncat|telnet)$/i;
    const first = q.split(/\s+/)[0] || '';
    const PROG = /^(?:cargo|python|python3|py|node|deno|bun|go|make|cmake|ruby|java|javac|rustc|gcc|clang|perl|php|dotnet|mvn|gradle|terraform|helm|ansible|brew|apt|apt-get|dnf|yum|pacman|choco|winget|scoop)$/i;
    const looksLiteral = /(?:^|\s)(?:-{1,2}[A-Za-z]|[~.]{0,2}\/|~(?=\s|$))|[|;&<>`*]|\$\(/.test(q);
    const shortSame = LIT.test(first) && /^[a-z][\w.-]*(?:\s+[a-z0-9][\w.:@/-]*){1,2}$/.test(q) && (String(res.command).toLowerCase().replace(/^sudo\s+/, '').split(/\s+/)[0] || '') === first.toLowerCase();
    // a wrapper (time, env, nohup, watch, exec, nice, timeout, xargs) in front of a typed command is never rewritten
    if (/^(?:time|env|nohup|watch|exec|nice|ionice|timeout|xargs|command|builtin|stdbuf|strace|caffeinate|nsenter|systemd-run|pkexec|faketime|doas|su|chroot|unshare|firejail|flatpak-spawn|runuser|setsid|script|echo|printf|tee|tellsh|:)$/i.test(first) && looksLiteral) res.missing = ['request (a wrapped shell command is not rewritten)'];
    else if ((LIT.test(first) || PROG.test(first)) && q.split(/\s+/).length > 1 && (looksLiteral || PROG.test(first) || shortSame)) {
      if (/[|;&<>`]|\$\(/.test(q.replace(/(["'])(?:(?!\1).)*\1/g, ' '))) res.missing = ['request (a compound shell command is not rewritten)'];
      else if (!literalIntentOk(first, res.intent) && (String(res.command).toLowerCase().replace(/^sudo\s+/, '').split(/\s+/)[0] || '') !== first.toLowerCase()) res.missing = [`request (the typed ${first} command is not rewritten as ${res.intent})`];
      else {
        const cmd = String(res.command).toLowerCase().replace(/\$home/g, '~');
        const same = (cmd.replace(/^sudo\s+/, '').split(/\s+/)[0] || '') === first.toLowerCase();
        // a translation for another shell (du -sh -> Get-ChildItem … Measure-Object) keeps the operands, not the unix flags
        const lost = same ? q.split(/\s+/).slice(1).filter((w) => /^-{1,2}[A-Za-z]/.test(w) && !cmd.includes(w.toLowerCase())) : [];
        // every operand of the typed command reaches the rendered one (`du -sh src` is never `du -sh .`)
        const ops = q.split(/\s+/).slice(1).filter((w) => !/^-/.test(w)).map((w) => w.replace(/^["']|["']$/g, '').toLowerCase()).filter((w) => w && !cmd.includes(w) && !cmd.includes(w.replace(/\\/g, '/')) && !cmd.includes(w.replace(/\//g, '\\')));
        if (lost.length) res.missing = [`options (not rendered: ${lost.slice(0, 3).join(' ')})`];
        else if (ops.length) res.missing = [`operands (not rendered: ${ops.slice(0, 3).join(' ')})`];
      }
    }
    // a bare URL is never a mutating action (`https://github.com/o/r/pull/12` is not `gh pr merge`)
    if (!(res.missing || []).length && /^\S+:\/\/\S+$/.test(q) && res.risk !== 'safe') res.missing = ['action (a bare URL names no action)'];
    if (!(res.missing || []).length && /^(?:move_rename|copy_file|copy_dir|move_file)$/.test(res.intent) && /(?:^|[\s'"])(?:\/dev\/null|nul|\$null)(?=$|[\s'"])/i.test(String(res.command))) res.missing = ['destination (a null device)'];
  }
  // 0.3.4 known-limits guard: a pip target that a shell would expand or unescape ($VAR, $env:X, %X%, a backtick, or a backslash in
  // a POSIX shell) is never rendered as a literal folder name; a git fetch request with an option or a fetch modifier is withheld
  if (!(res.missing || []).length && /^pip_/.test(res.intent || '') && slots.piptarget != null) {
    const pt = String(slots.piptarget);
    const win = /^(?:powershell|pwsh|cmd)$/.test(res.shell);
    // allow-list: letters, digits, _ . - / and spaces; a drive (C:) and backslashes only in PowerShell / cmd; never a ~ (it would be quoted as a literal folder)
    const ok = win ? /^(?:[A-Za-z]:)?[\w.\-\/\\ ]+$/.test(pt) : /^[\w.\-\/ ]+$/.test(pt);
    if (!ok) res.missing = ['piptarget (a variable or escape the shell would expand)'];
  }
  if (!(res.missing || []).length && res.intent === 'git_fetch') {
    // allow-list: only words that ask for a plain fetch of everything
    const FETCH_OK = /^(?:git|fetch|fetching|get|download|pull|all|every|everything|the|a|latest|new|newest|recent|remote|remotes|branch|branches|ref|refs|commits?|changes|updates?|from|repo|repository|now|please|pls|just|me|my|for|of|pobierz|pobrać|pobrac|ściągnij|sciagnij|wszystkie|wszystko|nowe|najnowsze|gałęzie|galezie|gałęzi|galezi|zmiany|z|ze|repozytorium|teraz|proszę|prosze)$/i;
    const words = String(query).replace(/^\s*git\s+fetch\s+--all\s*$/i, 'fetch').split(/\s+/).filter(Boolean);
    if (words.some((w) => !FETCH_OK.test(w.replace(/[.!?]+$/, '')))) res.missing = ['options (git fetch is always git fetch --all)'];
    // a second operation ("fetch ... and git pull", "fetch, then merge"): never a fetch that drops it
    if (/\b(?:and|then|i|oraz|potem)\b|[,;&|]/i.test(String(query)) || (/\bfetch/i.test(query) && /\bpull/i.test(query))
      || /[\r\n]|[.!?:](?=\s*\S)/.test(String(query)) || (String(query).match(/\bgit\b/gi) || []).length > 1) res.missing = ['args (a second action)'];
    if (/(?:^|\s)-{1,2}[A-Za-z]|\b(?:dry|prune|pruning|tags?|depth|shallow|unshallow|remote|origin|upstream|force|refspec|no|not|without|only|just)\b/i.test(String(query).replace(/^\s*git\s+fetch\s+--all\s*$/i, ''))) res.missing = ['options (git fetch is always git fetch --all)'];
  }
  // 0.3.4 retrain guard (model-independent): a slot value carrying shell substitution (`...`, $(...), ${...}) in a command
  // that is not read-only, or one value read into two slots from a single occurrence, is withheld, never run
  if (!(res.missing || []).length && res.intent) {
    const vals = Object.entries(slots).filter(([k, v]) => !k.startsWith('_') && typeof v === 'string' && v && !v.startsWith('?'));
    const subst = vals.filter(([, v]) => /`|\$\(|\$\{/.test(v));
    if (subst.length && res.risk !== 'safe') res.missing = subst.map(([k]) => `${k} (contains shell substitution)`);
    else {
      const q = String(query);
      const occ = (v) => q.split(v).length - 1;
      const PLACE = /^(?:path|src|dst|dest|dir|file|target|piptarget)$/;
      const dup = vals.filter(([k, v], i) => vals.some(([k2, v2], j) => j !== i && v2 === v && (PLACE.test(k) || PLACE.test(k2))) && occ(v) < 2).map(([k]) => k);
      if (dup.length) res.missing = [...new Set(dup)].slice(1).map((k) => `${k} (the same text was read into two slots)`);
    }
  }
  // "npm install there": a place word rejected as a package / name is still missing, also where that slot is optional
  if (slots._placeRejected?.length && !(res.missing || []).length) res.missing = slots._placeRejected.map((k) => `${k} (a place word is not a ${k} name)`);
  if (ambiguousText.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: unclear where the quoted text ends (\\" may be an escaped quote) (${ambiguousText.join(', ')})`];
  if (splitPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear which words name the ${splitPaths.map((x) => x.split('=')[0] === 'src' ? 'source' : 'destination').join(' and ')} (${splitPaths.join(', ')}); quote each path`];
  if (cutPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear where the unquoted name ends (${cutPaths.join(', ')}); quote the path`];
  if (ambiguousPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${ambiguousPaths.join(', ')}); quote the path`];
  if (unclearArgs.length) res.warnings = [...(res.warnings || []), `${unclearArgs.every((x) => PATH_SLOT_NAMES.has(x.split('=')[0])) ? 'path' : 'value'} left as a placeholder: unclear whether the quoted argument is a name or part of the request (${unclearArgs.join(', ')}); pass the whole request as one quoted argument`];
  if (unclearPaths.length) {
    res.warnings = [...(res.warnings || []), unclearPaths.tooMany
      ? `path left as a placeholder: the request names more paths than ${intent} takes (${explicitPaths(query).join(', ')}); run it once per path`
      : `path left as a placeholder: it is the output of a command substitution (${unclearPaths.join(', ')})`];
  }
  if (method === 'catalog' && ctx == null && hasPronoun(query) && b.missing.length) res.hint = 'this looks like a reference to an earlier command; try --history';

  // ---- second pass on modifier mismatch: the request asks for flags the catalog command lacks ----
  //   same tool: >= 1 triggered flag not in the catalog command; another stage-1 tool: >= 2 triggered flags
  // a slot the catalog withheld on purpose (command substitution, a rejected or unclear path, ...) is never filled by the
  // composer: the catalog command with its placeholder is the answer
  if (method === 'catalog' && composeMode !== 'off' && b.command && !blank.size && !['powershell', 'cmd', 'fish'].includes(env.shell)) {
    const fam = FAMILY_OF[intent];
    const ci = composeInput(query, model, fam, opts.unclearArgs, grown);
    const opt = { patternOf: ci.pattern, nameOf: ci.nameOf };
    const have = flagTokens(b.command);
    const expl = new Set(explained()[intent] || []);
    const unexplained = (cmp) => cmp.triggered.filter((f) => !expl.has((cmp.sub ? cmp.sub + ' ' : '') + f));
    let comp = compose(query, [{ tool: fam, p: 1 }], ci.ex, opt);
    if (blocksAmbiguous(comp, ci.ambiguousPaths)) comp = null;
    // same tool: the composed command must keep the catalog command's head (+ git/docker subcommand)
    const sameHead = comp && !comp.invalid && headOf(comp.command) === headOf(b.command);
    let extra = sameHead ? unexplained(comp).filter((f) => [...flagTokens(f)].some((x) => !have.has(x))) : [];
    if (!extra.length) {
      const others = c.tools.filter((t) => t.tool !== NONE && t.p >= 0.05);
      let alt = compose(query, others.length ? others : [{ tool: fam, p: 1 }], ci.ex, opt);
      if (blocksAmbiguous(alt, ci.ambiguousPaths)) alt = null;
      const ux = alt && !alt.invalid && headOf(alt.command) !== headOf(b.command) ? unexplained(alt) : [];
      if (ux.length >= 2) { comp = alt; extra = ux; }
    }
    // a value with a line break is never composed into a command (the catalog rejects it as a path); an extract intent is
    // never replaced by a command that creates or rewrites an archive ("extract archive.tar.gz" is not `tar -c -f archive.tar.gz`)
    // a 0.3.4-template suggestion that was withheld is never replaced by a composed command that drops what was withheld
    if (comp && NEW_TEMPLATE_INTENTS.has(intent) && (res.missing || []).length) comp = null;
    if (comp && !comp.invalid && comp.command !== b.command && !/[\r\n]/.test(comp.command) && !(/^extract_/.test(intent) && createsArchive(comp.command))) {
      if (extra.length >= 1 || composeMode === 'force') {
        return { ...res, method: 'composed', experimental: true, reason: `request asks for ${extra.join(' ')} not in the catalog command`,
          catalogCommand: b.command, description: `composed ${comp.tool}${comp.sub ? ' ' + comp.sub : ''} command (experimental)`,
          command: comp.command, risk: comp.risk, baseRisk: 'medium', warnings: comp.warnings, critical: comp.critical, missing: [],
          composed: { tool: comp.tool, sub: comp.sub, flags: comp.flags, validation: comp.validation } };
      }
    }
  }
  return res;
}
