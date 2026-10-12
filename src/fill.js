// Turn (intent, slots) into a concrete, safely-quoted command for the target shell.
import { BY_ID } from './catalog.js';
import { extractSlots, pickArg, pickDest, pickDir, foldKeepLength, isStopWord } from './slots.js';
import { checkDanger, maxRisk, plainSlotValue } from './danger.js';
import { protectedNumbers } from './guards.js';
import { shQuote, psQuote, chooseTemplate, quoteForKind, UnquotableError, pwshNativeSlots, unsafeNativePwshArg } from './render.js';

export { shQuote };

// Validators for slots that are inserted raw ({slot!raw}).
export const RAW_OK = {
  count: (v) => /^\d{1,6}$/.test(String(v)),
  depth: (v) => /^\d{1,2}$/.test(String(v)),
  days: (v) => /^\d{1,5}$/.test(String(v)),
  pid: (v) => /^\d{1,7}$/.test(String(v)),
  port: (v) => /^\d{1,5}$/.test(String(v)) && +v > 0 && +v < 65536,
  // ssh -L LOCAL:RHOST:RPORT: the remote end of a tunnel (a host name, an IPv4 address or a bracketed IPv6 address)
  rport: (v) => /^\d{1,5}$/.test(String(v)) && +v > 0 && +v < 65536,
  rhost: (v) => /^(?!-)[A-Za-z0-9](?:[\w.-]{0,252})$|^\[[0-9A-Fa-f:.]{2,45}\]$/.test(String(v)),
  size: (v) => /^\d+[ckMG]?$/.test(String(v)),
  age: (v) => /^-m(?:min|time) -\d+$/.test(String(v)),
  mode: (v) => /^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(String(v)),
  var: (v) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(String(v)),
  minutes: (v) => /^\d{1,7}$/.test(String(v)),
  sizeBytes: (v) => /^\d{1,16}$/.test(String(v)),
  start: (v) => /^\d{1,9}$/.test(String(v)) && +v > 0,
  end: (v) => /^\d{1,9}$/.test(String(v)) && +v > 0,
  num: (v) => /^\d{1,12}$/.test(String(v)),
  // a repository as gh -R takes it: [HOST/]OWNER/REPO
  dryrun: (v) => v === '--dry-run',
  delbranch: (v) => v === '--delete-branch',
  npmverb: (v) => v === 'install' || v === 'ci',
  // a wrangler environment name (wrangler.toml [env.NAME])
  wenv: (v) => /^[A-Za-z0-9][\w-]{0,62}$/.test(String(v)),
  // a part of a gh / wrangler request the command does not express: always the user's to fill (`<ARGS>`)
  args: () => false,
  // a scope the request names that the command cannot express (`npm run deploy --env prod`): always the user's to fill (`<SCOPE>`)
  scope: () => false,
  // an npm workspace (`--workspace api`, `-w packages/api`, `@scope/app`, a quoted `"staging app"`; rendered quoted)
  // pip install --target DIR (rendered quoted)
  piptarget: (v) => /^(?!-)[^\0\n\r]{1,255}$/.test(String(v)) && /[\w~./]/.test(String(v)),
  workspace: (v) => /^(?![-.])[\w@./-](?:[\w@./ -]{0,98}[\w@./-])?$/.test(String(v)) && !/\.\./.test(String(v)),
  repo: (v) => /^(?:(?!-)[\w-]+(?:\.[\w-]+)+\/)?(?!-)[\w-][\w.-]{0,99}\/(?!-)[\w-][\w.-]{0,99}$/.test(String(v)) && !/\.\./.test(String(v)),
  // a pull request as gh selects it: number, URL or head branch
  pr: (v) => (/^\d+$/.test(String(v)) ? /^[1-9]\d{0,11}$/.test(String(v)) : /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/pull\/\d{1,12}\/?$/.test(String(v)) || /^(?![-.])(?!.*\.\.)[\w./-]{1,100}$/.test(String(v))),
};

// "merge pull request feature/login", "view the pr for branch fix-1", "pr #45", 'merge pull request "feature/login"'
// (a quoted value ends at its matching quote, `“”„` being one family: "bob's-fix" is one value; a quote with no matching
// close, `'it''s'`, is m[7] and withheld)
const PR_SELECTOR = /\b(?:pull[\s-]+requests?|pr|prs)\s+((?:(?:for|of|on|from|branch|number|no\.?|nr\.?|(?:the|a|my|our)(?=\s+branch\b))\s+)*)(?:(?:"([^"]*)"|'([^']*)'|`([^`]*)`|[„“”]([^„“”"]*)[“”])(?=[\s.,!?;:]|$)|(#?[^\s"'`„“”]+?)[.,!?]?(?=\s|$)|(["'`„“”]))/i;
// a function or describing word after "pull request" is not a selector ("merge the pull request and …", "merge pr now",
// "check pr status", "view pull request on github", "merge pr by bob", "merge pull request quickly", "view pr from yesterday",
// "close pr for issue 45"); only checked for an unmarked word (`feature/apply`, `fix-reply`, `#12-only` are selectors);
// another unmarked word, `nightly`, is withheld
const PR_NOT_SELECTOR = /^(?:the|a|an|this|that|it|its|my|our|your|their|me|us|you|him|her|them|and|or|then|now|please|pls|into|to|with|without|in|at|by|is|was|which|again|request|requests|status|state|checks?|details?|info|summary|description|diff|changes|comments?|github|gh|web|browser|online|here|there|today|yesterday|tomorrow|earlier|later|review|fork|upstream|fast|asap|already|first|too|also|quickly|immediately|directly|safely|manually|automatically|finally|only|just|really|simply|properly|carefully|right|soon|instantly|issues?|tickets?|bugs?)$/i;
// an unmarked word (no digit, '/', '-', '_', '.', '#') names a branch only after "branch", "for" or "from" ("merge pr from bob");
// otherwise it is withheld (the `?` fails validation)
const PR_MARKED = /[\d/_.#-]/;
// an abbreviation ("merge pr e.g. main", "merge pr w/o checks") or a host ("merge pr on github.com") is not a branch
const PR_ABBREV = /^(?:e\.g|i\.e|w\/o|w\/|etc|vs|cf|a\.k\.a|n\/a|b\/c)$/i;
const PR_HOST = /^(?:[\w-]+\.)+(?:com|org|net|io|dev|app|co|me)$/i;
// a number names the pull request only right after "pr" / "pull request" (`pr 45`, `pr #45`, `pr number 45`) or as `#45`
const PR_NUMBER_LEAD = /^(?:(?:number|no\.?|nr\.?)\s+)*$/i;
const PR_WORD = /\b(?:pull[\s-]+requests?|pr|prs)\b/i;
// an issue, ticket or bug is not the pull request ("merge pr for issue #45", "merge the pull request for ticket 3")
const PR_ISSUE = /^(?:issues?|tickets?|bugs?)$/i;
// a number followed by a unit is an amount, not the pull request ("merge pr 2 days old", "merge pr 3 times")
const PR_UNIT_AFTER = /^\s+(?:secs?|seconds?|mins?|minutes?|hours?|hrs?|days?|weeks?|months?|years?|times?|ago|old|more|approvals?|reviews?|reviewers?|commits?|files?|lines?|changes?|comments?|checks?)\b/i;
// `#45` alone names the pull request only as the first word after the verb ("merge #45", "squash merge #45", "please
// close #7"); one in another clause ("the pr that closes #12", "merge the pr, see #99") is withheld
const PR_HASH_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit)\s+)+$/i;
// "merge the pull request by alice", "merge the pr from yesterday", "the pr that fixes login", "the pr opened last week": a
// pull request picked out by who or when, which is not the current branch's (withheld)
const PR_QUALIFIED = /^\s*(?:in\s+question\b|(?:by|from|since|before|after|about|titled|named|called|that|which|who|whose|where|od|autorstwa)\b|(?:\S+\s+)?(?:opened|created|authored|submitted|raised|written|made|sent|pushed|filed)\b)|\b(?:yesterday|today|tonight|tomorrow|ago|last\s+(?:week|month|year|night|friday|monday|tuesday|wednesday|thursday|saturday|sunday)|wczoraj\w*|dzisiaj|dzi[sś])\b/i;
// "merge the pr with label urgent", "the pull request with title fix login", "z etykietą pilne": picked out by a label,
// title, author, ... (withheld)
const PR_DESCRIBED = /^\s*(?:with|having|z|o)\s+(?:the\s+|a\s+)?(?:labels?|title|titled|name|tags?|authors?|assignees?|milestone|description|text|keywords?|words?|subject|commits?|etykiet\w*|tytu\w*|nazw\w*|autor\w*)\b|^\s*(?:labell?ed|tagged|assigned|mentioning|containing|regarding|concerning|touching|fixing|adding|removing|updating|changing)\b/i;
// "merge the pr from last week", "from monday", "view that pr from before": after "for" / "from" a word saying when is
// not a branch (withheld)
const PR_WHEN = /^(?:last|this|next|past|previous|previously|before|earlier|ages|recently|lately|week|month|year|morning|afternoon|evening|night|weekend|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun|january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec|ago|wczoraj\w*|dzisiaj|przedwczoraj|zesz\w*|poprzedni\w*|wcze\w*)$/i;
// "merge the dependabot pr", "the docs pr", "said pr", "the above pr", "zmerguj to pr": a word between a determiner and
// "pr" (or an anaphoric one) picks out a pull request the parser cannot read (withheld, also with history); "the current
// pr", "my own pr", "that one pr", "the same pr", "the last pr" (a reference) stay as they are
const PR_DET_WORD = /(?:^|\s)(?:the|a|an|my|our|your|his|her|their|this|that|these|those|its|ten|tego|ta|tamten|to)\s+((?:\S+\s+){1,3})$/i;
const PR_DET_NEUTRAL = /^(?:current|branch|branch's|branch’s|own|one|same|previous|last|prior|single|github|gh|pull|this|that|the|my|our|bieżący\w*|biezacy\w*|obecn\w*|aktualn\w*|mój|moj\w*|nasz\w*|sw[oó]j|swoj\w*|ten|tego)$/i;
const PR_ANAPHOR = /(?:^|\s)(?:said|above|aforementioned|abovementioned|above-mentioned|mentioned|referenced|aforesaid|forementioned|wspomnian\w*|powy[zż]sz\w*|ww\.?)\s+(?:\S+\s+)?$/i;
// "merge dependabot pr", "merge draft pr", "merge alice's pr": without a determiner, a word between the request's verb and
// "pr" picks out a pull request just the same (withheld); "merge pr", "squash and merge my pr", "zmerguj to pr" stay as they are
const PR_VERB = /^(?:merge|squash|rebase|land|ship|accept|view|show|open|display|see|check|checkout|diff|review|approve|close|reopen|edit|ready|comment|list|get|fetch|print|describe|zmerguj\w*|scal\w*|poka[zż]\w*|zobacz\w*|otw[oó]rz\w*|zamknij\w*|sprawd[zź]\w*|wy[sś]wietl\w*|zatwierd[zź]\w*|zaakceptuj\w*|przejrzyj\w*)$/i;
const PR_FILLER = /^(?:please|pls|now|then|just|and|also|out|up|go|ahead|to|it|tamten|that|this|ten|tego|gh|github|pull|i|you|can|could|would|will|let's|lets|me|us|want|need|prosz[eę]|teraz|i|oraz|a)$/i;
// "merge open pr", "merge ready pr": after the verb, a state word picks a pull request out
const PR_STATE = /^(?:open|ready|review|close)$/i;
function prWordBefore(before) {
  const words = before.replace(/[,;:]/g, ' ').trim().split(/\s+/).filter(Boolean);
  const v = words.findIndex((x) => PR_VERB.test(x));
  // "show checks for that pr", "view the diff of my pr": the words before the last preposition say what to show
  const at = Math.max(v, words.findLastIndex((x) => /^(?:for|of|on|in|from|about|with|dla|z|w)$/i.test(x)));
  return words.slice(at + 1).some((x) => !(PR_VERB.test(x) && !PR_STATE.test(x)) && !PR_FILLER.test(x) && !PR_DET_NEUTRAL.test(x));
}
// "merge pr for the login fix", "merge pr with dependabot", "merge pr of my colleague", "merge pr in docs", "merge pr: fix
// login": a connective (or a colon) after "pr" and a word that is not neutral pick a pull request out (withheld); "merge pr
// on github", "merge pr with squash", "merge pr in this repo", "merge pr for review" stay as they are
const PR_AFTER_PICK = /^\s*(?::\s*|[-–—]\s+|\s(?:for|of|with|in|on|from|about|regarding|re|dla|z|w|od)\s+)(?:(?:the|a|an|my|our|your|his|her|their|its|this|that)\s+)*([^\s.,!?;:]*)/i;
const PR_AFTER_NEUTRAL = /^(?:$|-\S*|github|gh|web|browser|online|cli|terminal|here|this|current|same|local|repo|repository|squash|squashing|rebase|rebasing|merge|merging|auto|automerge|auto-merge|admin|review|me|us|it|now|please|pls|main|master|default|teraz|prosz[eę]|githubie|przegl[aą]darce)$/i;
const prPickedAfter = (after) => {
  const m = after.match(PR_AFTER_PICK);
  return m != null && !PR_AFTER_NEUTRAL.test(m[1]);
};
// a URL names the pull request when only a verb, a determiner or "pr" comes before it
const PR_URL_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|and|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit|the|this|that|a|pull|requests?|pr|prs|at|is|me|you|can|could|would|i|want|to|url|link|[(]|zmerguj\w*|scal\w*|poka[zż]\w*|zobacz\w*|otw[oó]rz\w*|zamknij\w*|sprawd[zź]\w*)[\s:,]+)*[(<]?$/i;
// "merge ten pr" (Polish "this"), "merge that one pr": a number word that is a demonstrative, not a number
const PR_DEM_NUMBER = /\b(?:ten|(?:that|this|which|the)\s+one)\s+(?:\S+\s+)?(?:prs?|pull[\s-]+requests?)\b/gi;
// "merge pr from the feature branch", "for my branch bob": a branch is named, but not one the parser read
const PR_BRANCH_NAMED = /\b(?:for|of|on|from)\s+(?:\S+\s+){0,2}branch\b/i;
// "and delete the branch", "delete the branch after", "usuń gałąź": the head branch goes with the merge (--delete-branch)
const PR_DELETE_BRANCH = /\b(?:and\s+)?(?:delete|remove|usun)\s+(?:the\s+|its\s+|that\s+|tego\s+|ten\s+|t[ea]\s+)?(?:(?:local\s+and\s+remote|remote|head|feature)\s+)?(?:branch|branche?a?|galaz|galez)\b(?:\s+(?:after(?:wards)?|too|as\s+well|potem|tez))?/g;
const PR_DELETE_NEGATED = /(?:\b(?:not|no|never|without|nor|nie|bez)|n't|\bdont)\s+(?:\S+\s+){0,1}$/;
// wrangler deploy: "dry run", "--dry-run", "na sucho", "without (actually) deploying/publishing" (wrangler deploy --dry-run);
// "not a dry run", "without dry run", "skip the dry run": a real deploy, no flag (a dry run asked for elsewhere in the
// request, "without a dry run first? no, do a dry run", still counts)
const WR_DRY = /\bdry[\s-]*run\b|\bna\s+sucho\b|\bwithout\s+(?:actually\s+)?(?:deploying|publishing|uploading)\b|\b(?:don'?t|do\s+not)\s+actually\s+(?:deploy|publish|upload)\b|\bbez\s+(?:faktycznego\s+)?(?:wdra[zż]ania|publikowania|deployu?)\b/i;
const WR_DRY_NOT = /\b(?:not|no|without|skip|skipping|nie|bez)\s+(?:a\s+|the\s+|any\s+)?dry[\s-]*run\b|\b(?:don'?t|do\s+not)\s+(?:do\s+)?(?:a\s+|the\s+)?dry[\s-]*run\b/gi;
const wranglerDry = (t) => WR_DRY.test(t.replace(WR_DRY_NOT, ' '));
// the environment: "--env staging", "-e staging", "env=staging", "env staging", "to the staging environment", "to staging",
// "for production", "na produkcję"; a name is taken only when it is a known one ("staging", "prod", ...) or a marked one
// ("staging-eu", "preview2", "qa_1"), as a whole word, quoted or not ('to "preview2"'): "worker env", "with env vars", "env
// file", "my environment is set" never make up `--env worker/with/is` (the environment is withheld, `<WENV>`); a plain
// unknown word after "to" ("to cloudflare") is not an environment
const WR_Q = `(?:"[^"]*"|'[^']*'|\`[^\`]*\`|[„“”][^„“”"]*[“”]|\\S+)`;
const WR_ENV_OPT = new RegExp(`(?:^|\\s)(?:--env|-e|env)(?:=|(?<!\\benv)\\s+)(${WR_Q})`, 'i');
const WR_ENV_AFTER = new RegExp(`\\b(?:env|environment|środowisk\\w*|srodowisk\\w*)\\s+(called\\s+|named\\s+|o\\s+nazwie\\s+)?(${WR_Q})`, 'gi');
const WR_ENV_BEFORE = /(?:^|\s)(\S+)\s+(?:env|environment)\b/gi;
const WR_ENV_PREP = new RegExp(`\\b(to|on|in|into|for|na|do|w|dla)\\s+(?:the\\s+|my\\s+|our\\s+)?(${WR_Q})(\\s+\\S+)?`, 'gi');
const WR_ENV_KNOWN = /^(?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)$/i;
// after "for" only a strong name is the environment ("for production", "for qa"); a weak one says what the deploy is for
// ("for testing", "for dev", "for the qa team"): withheld, never made up
const WR_ENV_STRONG = /^(?:production|prod|staging|stage|qa|uat|canary|preview|sandbox)$/i;
// a word after the name that ends the phrase ("for prod now", "for qa, then …"), not a noun it describes ("for the qa team")
const WR_ENV_END = /^\s+(?:and|then|now|please|pls|too|also|again|today|asap|with|using|via|without|from|but|so|env|environment)$/i;
const WR_ENV_ANY = /\b(?:env|environment|środowisk\w*|srodowisk\w*|produkcj\w*|staging\w*|production|prod|stage|qa|uat|canary|sandbox)\b/i;
// a marked name is an environment after a preposition only when a known one is part of it ("staging-eu", "preview2",
// "qa_1"); another ("to v2", "to the worker-2 script") is withheld, never made up
const WR_ENV_STEM = /^(?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)(?=[\d_-])|[\d_-](?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)$/i;
// a quoted value is decoded (its quotes are not part of the name); a word loses the punctuation after it
const wrEnvWord = (w) => {
  const s = String(w);
  return /^["'`„“”]/.test(s) && s.length > 1 && /["'`“”]$/.test(s) ? s.slice(1, -1) : s.replace(/[.,!?;:]+$/, '');
};
const wrQuoted = (w) => /^["'`„“”]/.test(String(w));
// a marked name: letters with a digit, '-' or '_' ("staging-eu", "preview2"), not "2-3" or "src/worker.js"
const wrEnvMarked = (w) => RAW_OK.wenv(w) && /[A-Za-z]/.test(w) && /[\d_-]/.test(w);
/** The wrangler environment a deploy request names: a name, `?` (named, not readable) or null (the default). */
function wranglerEnv(t) {
  const o = t.match(WR_ENV_OPT);
  if (o) { const w = wrEnvWord(o[1]); return RAW_OK.wenv(w) ? w : '?'; }
  for (const m of t.matchAll(WR_ENV_AFTER)) {
    const w = wrEnvWord(m[2]);
    if (WR_ENV_KNOWN.test(w) || wrEnvMarked(w) || ((m[1] || wrQuoted(m[2])) && RAW_OK.wenv(w))) return w;
    if (wrQuoted(m[2])) return '?';
  }
  for (const m of t.matchAll(WR_ENV_BEFORE)) {
    if (WR_ENV_KNOWN.test(m[1]) || wrEnvMarked(m[1])) return m[1];
  }
  for (const m of t.matchAll(WR_ENV_PREP)) {
    const prep = m[1].toLowerCase();
    const w = wrEnvWord(m[2]);
    const q = wrQuoted(m[2]);
    if (prep === 'for' || prep === 'dla') {
      if (WR_ENV_STRONG.test(w) && (!m[3] || WR_ENV_END.test(m[3]) || /^[.,!?;:]/.test(m[2].slice(w.length)))) return w;
      if (WR_ENV_KNOWN.test(w) || wrEnvMarked(w) || q) return '?';
      continue;
    }
    if (WR_ENV_KNOWN.test(w)) return w;
    if (/^(?:to|into|na|do)$/.test(prep)) {
      if (wrEnvMarked(w)) return WR_ENV_STEM.test(w) ? w : '?';
      // 'to "my env"', 'to "cloudflare"': another quoted value is withheld, never dropped
      if (q) return '?';
    }
  }
  return WR_ENV_ANY.test(t) ? '?' : null;
}
// ---------------------------------------------------------------------------------------------
// gh / wrangler selector rule (v0.3): a request is read against a closed vocabulary. Every word must be a command word of
// the intent's family, a function word, or part of a value that was read (a pull request, a repository, an environment, a
// secret name). Any other word ("merge the pr about auth", "deploy worker in preview2", "create a pr into develop") names
// or describes something the command does not express: the selector is withheld as a placeholder the user has to fill
// (`gh pr merge <PR>`, `npx wrangler deploy --env <WENV>`, `gh pr create --fill <ARGS>`), never guessed and never dropped
// for a bare command. A word that is not in the vocabulary is never accepted as harmless.
const SEL_WORDS = (s) => {
  const words = s.trim().split(/\s+/);
  return { words: new Set(words.filter((w) => !w.endsWith('*'))), stems: words.filter((w) => w.endsWith('*')).map((w) => w.slice(0, -1)) };
};
const selHas = (v, w) => v.words.has(w) || v.stems.some((s) => w.startsWith(s));
const SEL_COMMON = SEL_WORDS(`
  the a an my our your this that these those it its me us i i'm im you we he she they them
  to on in into onto for from of at with by via using through over up out as
  please pls plz now just quickly again also too and then so ok okay hey hi go ahead
  can could would will shall do does did done how what whats what's is are am be been should want wanna need needs gonna let lets
  help run running execute use command commands line cli terminal shell console here there current currently same local
  right away asap today actually real really properly correctly give get tell print read see show display
  powershell* pwsh mac macu maca macos osx windows* linux* cmd cmd.exe fish fishu bash bashu zsh zshu terminal*
  z ze w we na do dla przez od o po i oraz a to ten ta te tego tej tym tych mi mnie sobie sie się jest sa są co
  prosze pls jak jakie jaki jakiego jakim czy mozesz moge mozna chce chcialbym chcialabym musze zrob zrobic zrobmy teraz
  szybko juz tutaj tu obecny obecnego obecnej obecnym aktualny aktualnego aktualnej aktualne biezacy biezacego biezacej
  moj moja moje mojego mojej moim moich naszego nasz nasza nasze polecenie* komend* konsol* linii
  uzyj uzywajac pomoca za daj odpal* pokaz* zobacz* sprawdz* wyswietl* wypisz* zerknij smialo dawaj
  jako dalej jakies jakis any some are there about their time czas* pod otworz set skonfiguruj* zebym mogl moc robic dodac edge
  same but first one yes no if whether says saying mowi done finished skonczylem gotowe give access dostep* daj* what's whats did does before after przed zanim byl byla bylo byly verify* weryfik* dziala* works working still have has which who ktore ktory ktora jeszcze ma mamy mam powiedz confirm potwierdz* check sprawdzic`);
// command words per family; a pull request, run or environment the request picks out ("the latest", "my last", "for the
// login fix") is never one of them
const SEL_FAMILY = {
  gh: SEL_WORDS(`project projekt* scopes scope scope'y token valid details szczegol* uwierzytelnion* authenticated logged zalogowan* stan setup flow tool narzedzi* credentials danymi dane konfiguracj* first-time pierwsza feature ficzer messages message description opis* commit* pushed wypchnalem wypchnij* turn zamien* tests testy pass przechodza zacznij pracy wrzuc* queue kolejce outstanding enumerate wymien* lately succeed* ran today dzis few kilka overview executions status statusem najnowszych runow odpalily wylistowac gh github* git hub
    repo repos repository repozytori* pr prs pra prka prke prki prku prow pr-y pr-ow pull pulla pull-request* request* requescie
    view open look check checks checking ci status statuses state otworz web browser online przegladar*
    branch branchu brancha branchem galezi galaz changes zmian zmiany`),
  wrangler: SEL_WORDS(`project projekt* zdeploy* session sesj* instance instancj* function funkcj* log* authenticated configured skonfigurowan* oauth browser przegladar* expired wygasl* valid wazn* details szczegol* using uzywa* uzywam account* konta konto koncie organizac* org tozsamosc* aktualn* say env environment environments srodowisk* called named nazwie npx wrangler* cloudflare* cf worker workers worker's workera workerze workerem workerow workerowi`),
};
const SEL_INTENT = {
  gh_pr_merge: SEL_WORDS(`merge* land squash squash-merge squashing rebase rebasing auto automerge auto-merge admin
    zmerguj* zmergow* zmerdz* wmerguj* merguj* scal* polacz* main master maina mastera base bazow* review* zatwierdz*
    accept approve* zaakceptuj complete finalize sfinalizuj checki`),
  gh_pr_view: SEL_WORDS(`view details detail info information diff description summary web browser online przegladarce przegladarka
    szczegol* opis* podsumowan* przeczytaj`),
  gh_pr_checks: SEL_WORDS(`tests test build builds passing passed failing failed pass fail green red results result
    workflow workflows actions action pipeline pipelines testy testow buildy przechodz* przeszl* checki checkow wynik*
    zielon* padl* padaj*`),
  gh_pr_create: SEL_WORDS(`create creating make new submit raise file send open put start propose utworz* stworz* zaloz* wystaw*
    nowy nowa nowe zglos* zrob wyslij* zaproponuj zacznij for these those my changes work zmiany zmian zmianach commit commits`),
  gh_pr_list: SEL_WORDS(`pry list listing all open opened pending show which there any lista liste wylistuj* listuj* wszystkie otwarte otwartych`),
  gh_run_list: SEL_WORDS(`list listing recent recently latest last all show workflow workflows run runs action actions ci pipeline pipelines
    build builds job jobs history happened happen* recently fail* failed failing passed przeszl* padl* ostatni* wszystkie uruchomien* przebieg* runy runow workflowy workflowow akcj* histori*
    wylistuj* listuj* lista liste buildow`),
  gh_run_view: SEL_WORDS(`view details logs log output failed failing failure why workflow run runa runie action ci pipeline build job
    szczegol* logi`),
  gh_auth_status: SEL_WORDS(`auth authenticated authentication logged log login signed sign status who account whoami am which user
    zalogowan* konto konta koncie kim kto jestem uwierzytelnien* logowani* token valid wazn* expired wygasl* session sesj*
    authorized autoryzacj* loguje credentials dane still nadal`),
  gh_auth_login: SEL_WORDS(`not nie auth authenticate authentication log login sign signin zaloguj* zalogowac logowani* konto account
    uwierzytelnij* autoryzuj* kont* konc* connect podlacz* polacz* link authorize re-authenticate re-login again ponownie setup configure skonfiguruj* konfiguracj*`),
  gh_run_watch: SEL_WORDS(`watch watching follow live progress until finish* finishes done complete* wait waiting ends end status run runa runie
    action ci pipeline build job workflow obserwuj* sledz* czekaj* poczekaj* zaczekaj* zakonczy* skonczy* skonczenia zakonczenia na zywo postep* biezac*`),
  gh_issue_list: SEL_WORDS(`issue issues list listing all open opened closed state zamkniete zamknietych show which there any bugs tickets problems zgloszenia zgloszen issue'y issuesy
    lista liste wylistuj* listuj* wszystkie otwarte otwartych pokaz* tickety bledy`),
  gh_issue_view: SEL_WORDS(`issue view details detail info information description summary show read open web browser online
    szczegol* opis* zgloszeni* przeczytaj pokaz* ticket bug`),
  wrangler_d1_list: SEL_WORDS(`d1 database databases db dbs baza bazy baz danych list listing all show which there my moje wszystkie
    lista liste wylistuj* listuj* pokaz*`),
  wrangler_pages_deploy: SEL_WORDS(`pages page static site website strona strone stron* statyczn* frontend build output folder directory katalog* dist public out
    depl* publish* upload wdroz* zdeployuj* deployuj* opublikuj* wrzuc* wgraj*`),
  wrangler_deploy: SEL_WORDS(`depl* redeploy publish* ship push release upload go wdroz* zdeployuj* deployuj* opublikuj* wypchnij*
    wrzuc* wgraj* make roll rollout wypusc* wydaj* pusc* code kod kodu version wersj* new nowa nowy najnowsz* latest fresh swiez*
    changed changes zmienilem zmian* after po`),
  wrangler_dev: SEL_WORDS(`dev develop development locally local server serve start preview mode lokaln* serwer* uruchom* odpal*
    tryb* developersk* deweloper* localhos* 127.0.0.1 machine maszyn* depl* pusc* przetest* spin launch fire boot try test przetestuj* emul* serwuj* hot reload* odpal*`),
  wrangler_tail: SEL_WORDS(`thrown right now teraz tail* logs log live stream* realtime real-time watch follow logi logow zywo strumien*
    podglad* sledz* obserwuj* rzeczywist* czasie biezaco monitor* errors bledy exceptions wyjatki console.log requests requesty
    happen* happening debug* output wdrozon* wyjscie zdebug* print* wypisuj* feed attach podepnij* podlacz* deployed zdeployowan* dzialajac* running`),
  wrangler_secret_put: SEL_WORDS(`new nowy nowa nowe push wypchnij* secret secrets set put add store save update change create rotate register encrypted configure sekret*
    ustaw* dodaj* zapisz* zmien* zaktualizuj* zaszyfrowan* zarejestruj* zrotuj* utworz* jako value variable called named nazwie`),
  wrangler_login: SEL_WORDS(`not nie kont* konc* podlacz* login log sign signin re-login authenticate re-authenticate authentication auth authorize account konto kontem
    zaloguj* zalogowac logowani* autoryz* uwierzytelni* polacz* connect browser przegladarce first najpierw ponownie again`),
  wrangler_whoami: SEL_WORDS(`whoami who account logged log signed status which user am konto konta koncie zalogowan* kim kto jestem
    identity tozsamosc* id identyfikator* email mail maila whose czyje* active aktywn* uses using uzywa* uzywam`),
};
// words that pick one pull request / run / target out of several ("the latest pr", "the draft pr", "the failing run"):
// explained only for the intents that list them (gh_pr_list "open prs", gh_run_list "recent runs"), never by the family
const SEL_PICKERS = new Set(('latest last recent recently newest new old older oldest first second third next previous prior other another ' +
  'approved pending draft failing failed fail passing passed pass green red open opened closed merged ready big small ' +
  'ostatni ostatnie ostatniego najnowszy najnowsze nowy nowa nowe stary inny inne poprzedni kolejny otwarte otwartych').split(' '));
const selFamilyAll = {};
for (const [id, v] of Object.entries(SEL_INTENT)) {
  // the 0.3.4 template words (pages folders, d1, issues, runs) explain nothing for the older intents of the family
  if (/^(?:wrangler_pages_deploy|wrangler_d1_list|gh_run_watch|gh_issue_list|gh_issue_view)$/.test(id)) continue;
  const f = id.split('_')[0];
  const all = (selFamilyAll[f] ??= { words: new Set(), stems: [] });
  // a negation ("not logged in" for a login) is explained only for the intent that lists it, never family-wide
  for (const w of v.words) if (!SEL_PICKERS.has(w) && !/^(?:not|nie|never|without|bez)$/.test(w)) all.words.add(w);
  all.stems.push(...v.stems.filter((x) => !SEL_PICKERS.has(x)));
}
// the slot that takes the placeholder when a request has words the vocabulary does not explain
const SEL_SLOT = { gh_pr_merge: 'pr', gh_pr_view: 'pr', gh_pr_checks: 'pr', gh_run_view: 'num', gh_run_watch: 'num', gh_issue_view: 'num' };
export const hasSelectorRule = (intentId) => /^(?:gh|wrangler)_/.test(intentId);
// "for issue #3", "for ticket 12", "the pr that fixes #12": a number of another kind, explained as not the pull request
const SEL_OTHER_NUMBER = /\b(?:issues?|tickets?|bugs?|zgloszeni\w*|fix(?:es)?|closes|resolves|naprawia\w*|zamyka\w*)\s+#?\d+\b/g;
const SEL_ENV_PREP = /^(?:to|on|in|into|for|na|do|w|dla|env|environment|srodowisk\w*|called|named|nazwie)$/;
const SEL_NEGATION = /^(?:not|never|don't|dont|nor|except|excluding|without|instead|rather|nie|bez|oprocz|poza|zamiast)$/;
const SEL_DET = /^(?:the|a|an|my|our|this|that)$/;
/**
 * The words of a gh / wrangler request the vocabulary and the read values do not explain, each with the word before it
 * ([] : nothing unexplained).
 */
export function selectorResidue(intentId, text, values = {}) {
  if (!hasSelectorRule(intentId)) return [];
  const fam = SEL_FAMILY[intentId.split('_')[0]];
  const own = SEL_INTENT[intentId];
  let t = foldKeepLength(String(text)).toLowerCase();
  // values that were read, and the option / phrase forms they come in, are explained
  for (const k of ['pr', 'repo', 'wenv', 'var', 'num', 'url', 'path']) {
    const val = values[k];
    if (val == null || String(val).startsWith('?')) continue;
    const s = foldKeepLength(String(val)).toLowerCase();
    // the value as a whole word: `prod` does not explain `prodprod`, `4` does not explain `44`
    t = t.replace(new RegExp(`(?<![\\w-])${s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`, 'g'), ' ');
  }
  if (/^wrangler_/.test(intentId)) t = t.replace(WR_DRY_NOT, ' ').replace(WR_DRY, ' ');
  if (values.delbranch) t = t.replace(PR_DELETE_BRANCH, ' ');
  t = t.replace(/(?:^|\s)(?:--env|-e|--repo|-r|env=|--repo=|--env=)(?=\s|$)/g, ' ')
    .replace(/(?:^|\s)(?:https?:\/\/|github\.com\/)(?=\s|$)/g, ' ')
    .replace(/\b(?:number|numer|nr|no\.|num)(?=\s|$)/g, ' ')
    .replace(/\benv(?:ironment)?\s+var(?:iable)?s?\b|\bzmienn\w*(?:\s+srodowiskow\w*)?|\bsrodowiskow\w*/g, ' ')
    .replace(/\b(?:the\s+)?command\s+line\b|\bz\s+linii\s+komend\b/g, ' ');
  if (/^gh_pr_/.test(intentId) && values.pr != null && !String(values.pr).startsWith('?')) t = t.replace(SEL_OTHER_NUMBER, ' ');
  const out = [];
  let prev = '';
  for (let w of t.split(/[\s,;!?()]+|:(?!\/\/)/)) {
    w = w.replace(/^[#"'`„“”.]+|["'`„“”.]+$/g, '').replace(/'s$/, '');
    if (!w || /^[-–—]+$/.test(w)) continue;
    // "merge pr with --squash": an option word the intent knows (gh asks for the merge method itself)
    const famAll = selFamilyAll[intentId.split('_')[0]];
    if (selHas(SEL_COMMON, w) || selHas(fam, w) || (!SEL_PICKERS.has(w) && famAll && selHas(famAll, w)) || (own && selHas(own, w.replace(/^--(?=[a-z])/, '')))) {
      if (!SEL_DET.test(w)) prev = w;
      continue;
    }
    out.push({ w, prev });
    prev = w;
  }
  return out;
}
const SEL_EXPLICIT = { pr: (v) => /^\d+$|^https?:\/\//.test(v), num: (v) => /^\d+$/.test(v), wenv: (v) => RAW_OK.wenv(v) };
const selEnvish = (r) => /[a-z]/.test(r.w) && (SEL_ENV_PREP.test(r.prev) || WR_ENV_KNOWN.test(r.w) || WR_ENV_STEM.test(r.w) || /^(?:prod|produkc|staging|stage)/.test(r.w));
/**
 * gh / wrangler selector rule: the slot to withhold (`?`, a placeholder the user fills) for the words of a request
 * nothing explains, or null. An explicit value that was read (pull request 45, a URL, `--env staging`) stays unless an
 * unexplained word competes with it (another number, another environment); otherwise the intent's selector is withheld:
 * the pull request (`<PR>`), the run (`<NUM>`), the environment (`<WENV>`, for a word placed as one) or the rest of the
 * request (`<ARGS>`).
 */
export function selectorWithhold(intentId, text, values = {}) {
  // a selector already withheld ("merge pr bob's", "my environment is set") already has its placeholder
  if (['pr', 'num', 'wenv', 'repo'].some((k) => String(values[k] ?? '').startsWith('?'))) return null;
  const res = selectorResidue(intentId, text, values);
  if (!res.length) return null;
  // "merge pr 42 in acme/app or other/repo": another repository beside the one read is a competing target, whatever else
  // the request names (an explicit pull request included)
  if (values.repo != null && res.some((r) => RAW_OK.repo(repoValue(r.w)))) return 'repo';
  const main = SEL_SLOT[intentId];
  if (main && main !== 'wenv') {
    const v = values[main];
    if (v != null && SEL_EXPLICIT[main](String(v)) && !res.some((r) => /^\d+$|^https?:/.test(r.w))) return null;
    return main;
  }
  if (/^wrangler_/.test(intentId)) {
    // "deploy worker but not to production", "don't deploy to prod": an environment the request excludes is never the
    // target (also when one was read)
    const negated = res.some((r) => SEL_NEGATION.test(r.w));
    if (negated && (values.wenv != null || res.some(selEnvish) || WR_ENV_ANY.test(text))) return 'wenv';
    // an explicit environment stays; the words nothing explains (`--config other.toml`) are withheld beside it, never dropped
    return res.some(selEnvish) ? 'wenv' : 'args';
  }
  return 'args';
}
// npm install: words that name the project's dependencies (or the tool), never a package to add
const NPM_NOT_PKG = new Set(('dependencies dependency dependecies dependancies deps dep zaleznosci zaleznosc project projekt projektu ' +
  'packages package pakiety paczki modules module moduly node_modules node npm ci clean czysta czysty everything all wszystko ' +
  'package.json lockfile lock repo repository it this them')
  .split(' '));
const NPM_INSTALL_VERB = /^(?:install|instal|add|i|zainstaluj|instaluj|doinstaluj|dodaj|pobierz|get|reinstall)$/;
// "npm ci", "a clean install", "czysta instalacja": npm ci (installs exactly the lockfile)
const NPM_CI = /(?:^|\s)npm\s+ci(?=\s|$)|\bclean[\s-]+install\w*|\bczyst\w*\s+instalacj\w*/i;
/**
 * npm install: "install the project dependencies" is `npm install` (no package); a package word the request does not
 * pick out clearly ("add express to the project with npm" read as `npm`) is the word right after the install verb, or
 * withheld (`npm install <PKG>`), never made up from "dependencies", "project" or "npm".
 */
function npmInstallTarget(text, v) {
  const f = foldKeepLength(text).toLowerCase();
  if (NPM_CI.test(f) && (v.pkg == null || NPM_NOT_PKG.has(String(v.pkg).toLowerCase()))) { delete v.pkg; v.npmverb = 'ci'; return; }
  const p0 = foldKeepLength(String(v.pkg ?? '')).toLowerCase();
  if (v.pkg == null || !(NPM_NOT_PKG.has(p0) || isStopWord(p0))) return;
  const words = f.split(/[\s,;!?()]+/).map((w) => w.replace(/^["'`]+|["'`.:]+$/g, '')).filter(Boolean);
  const named = words.filter((w) => !NPM_NOT_PKG.has(w) && !NPM_INSTALL_VERB.test(w) && !isStopWord(w) &&
    !/^(?:the|a|an|my|our|for|from|with|via|using|to|into|in|of|this|these|please|pls|i|just|cloned|z|ze|do|dla|przez|w|mojego|tego|tym|ten|naszego)$/.test(w));
  delete v.pkg;
  if (!named.length) return;
  const at = words.findIndex((w) => w === named[0]);
  const prev = words.slice(0, at).filter((w) => !/^(?:the|a|an|package|pakiet|paczke)$/.test(w)).pop();
  v.pkg = named.length === 1 && NPM_INSTALL_VERB.test(prev || '') ? text.split(/\s+/).find((w) => foldKeepLength(w).toLowerCase().replace(/[.,!?;:]+$/, '') === named[0])?.replace(/[.,!?;:]+$/, '') ?? '?' : '?';
}

/**
 * The pull request the user names (quoted: kept as written, validation withholds an odd one), else null (`gh pr merge`
 * acts on the current branch's pull request). A number elsewhere in the request ("merge pr with 2 approvals", "merge the
 * 2 open prs") is never the pull request; a request that names something the parser cannot read (`bob's`, `in repo v2`)
 * is withheld (`?`, shown as `<PR>`), never a bare `gh pr merge`.
 */
function prSelector(ex) {
  const text = String(ex.text);
  if (ex.urls[0] != null) {
    // "merge pr <url>", "merge <url>", "view the pull request at <url>": the URL is the pull request; "the pr that depends
    // on <url>" names a related one (withheld, never the URL's)
    const at = text.indexOf(ex.urls[0]);
    return at < 0 || PR_URL_LEAD.test(text.slice(0, at)) ? ex.urls[0] : '?';
  }
  const m = text.match(PR_SELECTOR);
  if (m) {
    const quoted = m[2] ?? m[3] ?? m[4] ?? m[5];
    if (quoted != null) return quoted || '?'; // `""`: named but empty, withheld
    if (m[7] != null) return '?'; // an unclosed / odd quote: withheld
    const w = m[6];
    const branch = /\bbranch\s+$/i.test(m[1]);
    // "merge my pr from 2 days ago", "view pr for 3 days": a number after a connective is not the pull request
    if (PR_ISSUE.test(w)) return '?';
    const rest = text.slice(m.index + m[0].length);
    if (/^#?\d+$/.test(w) && PR_UNIT_AFTER.test(rest)) return '?';
    if (/^\d+$/.test(w)) return branch || PR_NUMBER_LEAD.test(m[1]) ? w : '?';
    // "merge the pr for #12": the pull request for issue 12, or pull request 12
    if (/^#\d+$/.test(w) && !PR_NUMBER_LEAD.test(m[1])) return '?';
    if (PR_ABBREV.test(w) || (PR_HOST.test(w) && !branch)) return '?';
    if (PR_MARKED.test(w)) return w;
    // "merge pr for branch status": after "branch" any word is the selector, a describing one is withheld
    if (branch) return PR_NOT_SELECTOR.test(w) ? `?${w}` : w;
    if (!PR_NOT_SELECTOR.test(w)) {
      // "merge pr for fix #12": the word is followed by a number, so it may describe rather than name the branch
      if (/\b(?:for|from)\s+$/i.test(m[1])) return /\d/.test(rest) || PR_WHEN.test(w) ? `?${w}` : w;
      // "merge pr main": a bare word may be a branch or say something else: withheld (`gh pr merge <PR>`), never dropped
      return `?${w}`;
    }
  }
  const hash = text.match(/(?:^|\s)#(\d{1,12})(?=[\s.,!?;:]|$)/);
  if (hash && PR_HASH_LEAD.test(text.slice(0, hash.index + hash[0].indexOf('#')))) return hash[1];
  const p = text.match(PR_WORD);
  const after = p ? text.slice(p.index + p[0].length) : '';
  const before = p ? text.slice(0, p.index) : '';
  // 'merge the pr with label "urgent"', 'the pr titled "fix"': a quoted description, not the pull request (withheld)
  if (ex.quoted.length && (PR_DESCRIBED.test(after) || PR_QUALIFIED.test(after))) return '?';
  // 'merge the "feature/login" pull request': an explicitly quoted value is the target
  if (ex.quoted.length) return ex.quoted[0];
  // named but not readable: a number anywhere ("merge the 2 open prs", "merge pr in 2 minutes"), or a marked word or a
  // quote after "pr" ("merge pr bob's", "merge pr feature/x's", "merge pr in repo v2"): withheld
  const det = before.match(PR_DET_WORD);
  if (PR_ANAPHOR.test(before) || (det && det[1].trim().split(/\s+/).some((x) => !PR_DET_NEUTRAL.test(x))) || (p && prWordBefore(before))) return '?';
  if (PR_DESCRIBED.test(after) || prPickedAfter(after)) return '?';
  const numbers = !/\d/.test(text) && (ex.numbers?.length ?? 0) <= [...text.matchAll(PR_DEM_NUMBER)].length ? [] : ex.numbers || [];
  if (numbers.length || /\d/.test(text) || /[/_#'"`„“”’]|\w[.-]\w/.test(after) || PR_BRANCH_NAMED.test(after) || PR_QUALIFIED.test(after)) return '?';
  return null;
}
// "--repo a/b", "-R a/b", "in (the) repo(sitory) a/b", "in the a/b repo"; "in the other repo", "in another repository": named,
// not readable ("this repo", "the current repository" are the working directory's)
const PR_REPO_OPT = /(?:^|\s)(?:--repo(?:=|\s+|$)|-R(?:=|\s*))(\S*)/;
const PR_REPO = /\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(?:github\s+)?(?:repo|repository|repozytorium|project)\s+(\S+)|\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(\S+(?:\s+\S+)?)\s+(?:github\s+)?(?:repo|repository)\b|\b(?:w|z)\s+(?:repozytorium|projek\w*)\s+(\S+)/i;
// "this repo", "the repo", "my current repo", "our own repository": the working directory's
const PR_REPO_HERE = /^(?:the|a|an|this|current|same|our|my|local|own|tym|tego|bieżącym|biezacym)(?:\s+(?:current|same|local|own))?$/i;
// "org/repo#7": a repository and a pull request in one word
const PR_REPO_HASH = /(?:^|\s)((?:https:\/\/)?(?:[\w-]+(?:\.[\w-]+)+\/)?[\w.-]+\/[\w.-]+)#(\d{1,12})(?=[\s.,!?;:]|$)/;
// "merge pr 7 in other/repo", "of org/repo", "on github.com/org/repo", "at https://github.com/org/repo": a repository
// without the word "repo" (a value gh -R takes); right after "pr for" / "pr from" / … the word is the branch selector
const PR_REPO_PREP = /(?:^|\s)(in|of|on|from|for|at|to)\s+(?:the\s+)?(?:github\s+)?(\S+)/gi;
const PR_SELECTOR_SPOT = /\b(?:pull[\s-]+requests?|pr|prs)\s+(?:(?:for|of|on|from|branch|number|no\.?|nr\.?|(?:the|a|my|our)(?=\s+branch\b))\s+)*$/i;
const repoValue = (w) => w.replace(/[.,!?;:]+$/, '').replace(/^["'`]|["'`]$/g, '').replace(/^https:\/\/(?=github\.com\/)/i, '').replace(/(?:\.git)?\/?$/, '');
/** The repository a gh pr request names: { repo (a value, or `?` when it is not readable), rest (the text without it), pr } or null. */
// every repository a request names in a readable form: options (`--repo a/b`, `-R a/b`), `a/b#7`, a pull request URL,
// "in repo a/b"
const PR_URL_REPO = /(?:https?:\/\/)?github\.com\/([\w.-]+\/[\w.-]+)\/pull\/\d+/gi;
const repoKey = (w) => w.toLowerCase().replace(/^github\.com\//, '');
function repoMentions(text) {
  const out = new Set();
  for (const re of [PR_REPO_OPT, PR_REPO_HASH, PR_URL_REPO, PR_REPO]) {
    for (const m of text.matchAll(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'))) {
      const w = repoValue(m[1] ?? m[2] ?? m[3] ?? '');
      if (RAW_OK.repo(w)) out.add(repoKey(w));
    }
  }
  return out;
}
function prRepo(text) {
  const cut = (i, len, put = ' ') => (text.slice(0, i) + put + text.slice(i + len)).replace(/\s+/g, ' ').trim();
  const h = text.match(PR_REPO_HASH);
  if (h && RAW_OK.repo(repoValue(h[1]))) {
    const at = h.index + h[0].indexOf(h[1]);
    return { repo: repoValue(h[1]), rest: cut(at, h[1].length + 1 + h[2].length, ` #${h[2]} `), pr: h[2] };
  }
  const m = text.match(PR_REPO_OPT) || text.match(PR_REPO);
  if (!m) {
    for (const p of text.matchAll(PR_REPO_PREP)) {
      const w = repoValue(p[2]);
      if (!RAW_OK.repo(w)) continue;
      const host = w.split('/').length === 3;
      // "merge pr from feature/x", "view the pr for fix/a": the branch the pull request is for
      if (!host && /^(?:of|on|from|for)$/i.test(p[1]) && PR_SELECTOR_SPOT.test(text.slice(0, p.index + p[0].indexOf(p[1])))) continue;
      return { repo: w, rest: cut(p.index, p[0].length) };
    }
    return null;
  }
  const w = repoValue(m[1] ?? m[2] ?? m[3] ?? '');
  if (m[2] != null && PR_REPO_HERE.test(w)) return null;
  const rest = (text.slice(0, m.index) + ' ' + text.slice(m.index + m[0].length)).replace(/\s+/g, ' ').trim();
  return { repo: RAW_OK.repo(w) ? w : '?', rest };
}
const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
const PLACEHOLDER = (name) => `<${name.toUpperCase()}>`;

// sed needs regex-escaped search text and &,\,/ escaped replacement
// (a newline would end the s command: written as \n, which never matches inside one line)
const sedEscapeOld = (s) => s.replace(/[\\/.*^$[\]]/g, '\\$&').replace(/\n/g, '\\n');
const sedEscapeNew = (s) => s.replace(/[\\/&]/g, '\\$&').replace(/\n/g, '\\n');

/** Recompute derived slots after values were merged/overridden (tagger, history rules). */
// a place word ("there", "tam", "inside") is a reference to a directory, never a container / service / process / branch name
const PLACE_WORD = /^(?:there|here|inside|over\s+there|tam|tu|tutaj|stamt[aą]d|tamże|wewn[aą]trz)$/i;
export function finalizeSlots(intent, v) {
  for (const k of ['container', 'service', 'name', 'branch', 'user', 'pkg', 'script']) if (typeof v[k] === 'string' && PLACE_WORD.test(v[k].trim())) {
    // left empty (never a literal '?'); recorded so the pipeline keeps it missing even where the slot is optional
    delete v[k];
    if (!v._placeRejected) Object.defineProperty(v, '_placeRejected', { value: [], enumerable: false, writable: true });
    if (!v._placeRejected.includes(k)) v._placeRejected.push(k);
  }
  if (v.ext != null && v.glob == null) v.glob = `*.${v.ext}`;
  if (intent.id === 'find_by_name' && v.name) v.namepat = /[*?]/.test(v.name) || /\.\w+$/.test(v.name) ? v.name : `*${v.name}*`;
  if (intent.id === 'replace_text' && v.old != null && v.new != null) v.sedexpr = `s/${sedEscapeOld(v.old)}/${sedEscapeNew(v.new)}/g`;
  return v;
}

// ssh tunnel (v0.3 close5): "forward local port 8080 to remote port 5432 on db.example.com", "-L 8080:db.internal:5432 via
// bastion", "forward 8080 to db.internal:5432 through bastion": both ends are kept, never `-L 8080:localhost:8080`. A remote
// port the request names but that cannot be told apart from the local one (two bare numbers) is withheld (`<RPORT>`).
const TUNNEL_WORD = /^(?:ssh|tunnel|tunel\w*|tunnels|port\w*|forward\w*|przekier\w*|local|remote|lokaln\w*|zdaln\w*|server|serwer\w*|host|localhost)$/i;
const PORT_N = String.raw`(\d{1,5})(?![\w.:])`;
function tunnelEnds(text, v) {
  const t = foldKeepLength(text).toLowerCase();
  const L = t.match(/(?:^|\s)-l\s*(\d{1,5}):([\w.-]+|\[[0-9a-f:.]+\]):(\d{1,5})(?=\s|$)/);
  if (L) {
    const at = t.indexOf(L[0]) + L[0].indexOf(L[2]);
    v.port = +L[1]; v.rhost = text.slice(at, at + L[2].length); v.rport = +L[3];
    // the ssh server is a host outside the -L spec ("-L 8080:db.internal:5432 bastion"), never the far host
    const rest = (text.slice(0, t.indexOf(L[0])) + ' ' + text.slice(t.indexOf(L[0]) + L[0].length)).split(/\s+/).map((w) => w.replace(/[,;!?]+$/, ''));
    const server = rest.filter((w) => /^(?!-)[\w.@-]+$/.test(w) && /[.@]/.test(w)).pop() ?? rest.filter((w) => /^[a-z][\w-]*$/i.test(w) && !TUNNEL_WORD.test(w) && !isStopWord(w.toLowerCase())).pop();
    if (server) v.target = server; else delete v.target;
    return;
  }
  const local = t.match(new RegExp(String.raw`(?:local|lokaln\w*)\s+(?:port\w*\s+)?` + PORT_N));
  const remote = t.match(new RegExp(String.raw`(?:remote|zdaln\w*|destination|docelow\w*|target)\s+(?:port\w*\s+)?` + PORT_N));
  // a far host other than the ssh server: HOST:PORT next to another host the connection goes through
  const hp = [...text.matchAll(/(?:^|\s)((?!-)[A-Za-z0-9][\w.-]*):(\d{1,5})(?=[\s,.;!?]|$)/g)];
  const via = /(?:^|\s)(?:via|through|thru|over|using|przez|poprzez|on|na|from|z|ze)\s+(?:the\s+)?(?:(?:server|host|bastion|jump\s*host|serwer\w*)\s+)?([\w.@-]+)/i;
  if (local) v.port = +local[1];
  if (remote) v.rport = +remote[1];
  if (hp.length === 1) {
    const [, h, p] = hp[0];
    const other = [...text.matchAll(new RegExp(via.source, 'gi'))].map((m) => m[1].replace(/[.,;!?]+$/, '')).find((x) => x !== h && /[.@]|^[a-z][\w-]*$/i.test(x) && x !== 'ssh');
    if (other && v.target !== other && v.target != null && String(v.target).startsWith(h)) v.target = other;
    if (other) { v.rhost = h; v.target = other; } else if (v.target == null || String(v.target).startsWith(h + ':') || v.target === h) v.target = h;
    v.rport = +p;
    if (!local && v.port === +p) {
      // the only number is the remote one: the local port is not named
      const nums = [...t.matchAll(/(?<![\w.:])(\d{1,5})(?![\w.:])/g)].map((m) => +m[1]);
      if (nums.length) v.port = nums[0]; else delete v.port;
    }
  } else if (hp.length > 1) v.rport = '?';
  if (v.target != null && /:/.test(String(v.target)) && !/@/.test(String(v.target))) v.target = String(v.target).replace(/:\d+$/, '');
  // "ssh tunnel … on web1": a word of the request ("tunnel") is never the server
  if (v.target != null && TUNNEL_WORD.test(String(v.target))) {
    const m = [...text.matchAll(new RegExp(via.source, 'gi'))].map((x) => x[1].replace(/[.,;!?]+$/, '')).find((x) => !TUNNEL_WORD.test(x) && !/^\d+$/.test(x));
    if (m) v.target = m; else delete v.target;
  }
  if (remote == null && hp.length === 0) {
    // "forward 8080 to 5432 on db": two different bare port numbers; which is which is not said with local / remote
    const nums = [...t.matchAll(/(?<![\w.:])(\d{1,5})(?![\w.:])/g)].map((m) => +m[1]).filter((n) => n > 0 && n < 65536);
    if (new Set(nums).size > 1) {
      const ab = t.match(new RegExp(String.raw`(?<![\w.:])(\d{1,5})\s+(?:to|into|na|do|->)\s+(?:(?:the\s+)?port\w*\s+)?` + PORT_N));
      if (local) v.rport = nums.find((n) => n !== +local[1]);
      else if (ab) { v.port = +ab[1]; v.rport = +ab[2]; } else v.rport = '?';
    }
  }
}

/** Resolve the values an intent can use from the generic extraction. */
export function resolveSlots(intent, ex) {
  const v = {};
  const has = (k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
  const textual = ['pattern', 'message', 'text', 'name', 'old', 'branch', 'service', 'container', 'pkg', 'cmd', 'user', 'script']
    .some((k) => k in intent.slots) || ['base64_encode', 'base64_decode', 'replace_text', 'find_by_name'].includes(intent.id);
  const paths = [...(textual ? ex.paths : ex.pathsWithQuoted)];
  // "grep for ~/foo in src": the path-like word right after the search verb is the pattern, the other
  // path is where to search (only when there is one: otherwise the single path is the search root)
  let pathPattern = null;
  if (has('pattern') && !ex.quoted.length && paths.length >= 2) {
    const m = foldKeepLength(String(ex.text)).toLowerCase().match(/(?:^|\s)(?:grep|search|look|find|szukaj|wyszukaj|poszukaj|znajdz)\s+(?:for\s+|(?:the\s+)?(?:text|string|pattern|word)\s+)?(\S+)/);
    const at = m ? m.index + m[0].length - m[1].length : -1;
    const word = at >= 0 ? String(ex.text).slice(at, at + m[1].length) : null;
    if (word != null && paths.includes(word)) { pathPattern = word; paths.splice(paths.indexOf(word), 1); }
  }
  // "on the disk" / "na (całym) dysku" is a search scope, never the object of a changing command
  // ("usuń folder cache na dysku" is not `rm -r /`), and a folder the user names wins over it
  if (ex.rootPhrase && paths.includes('/') && !/(^|\s)["']?\/["']?(?=[\s,.;:!?]|$)/.test(ex.text) &&
      ((intent.risk !== 'safe' && !/^find \{path\}/.test(String(intent.template))) || (has('path') && pickDir(ex)))) {
    paths.splice(paths.indexOf('/'), 1);
  }

  // archive-type paths (compress/extract)
  const isArchive = (p) => /\.(tar\.gz|tgz|tar|zip|tar\.bz2|tar\.xz|gz)$/i.test(p) && !/^(tar\.gz|tar|tgz|zip|gz)$/i.test(p);
  if (has('archive')) {
    const a = paths.find(isArchive);
    if (a) { v.archive = a; paths.splice(paths.indexOf(a), 1); }
  }
  if (has('src') || has('dst')) {
    if (paths[0]) v.src = paths[0];
    if (paths[1]) v.dst = paths[1];
    else if (paths[0]) {
      const d = pickDest(ex);
      if (d && d !== paths[0]) v.dst = d;
    }
  }
  if (has('file')) {
    const f = paths.find((p) => /\.[A-Za-z0-9]+$/.test(p) || p.includes('/')) || paths[0];
    if (f) v.file = f;
    if (has('dest') && paths.length > 1) v.dest = paths.find((p) => p !== f);
  }
  if (has('path') && paths.length) {
    v.path = paths[0];
  } else if (has('path') && !['find_by_name', 'chown'].includes(intent.id)) {
    const d = pickDir(ex);
    if (d) v.path = d;
  }
  if (has('archive') && !v.archive) {
    const base = (v.path || '.').replace(/\/+$/, '').split('/').pop();
    const ext = intent.id === 'compress_zip' ? '.zip' : '.tar.gz';
    v.archive = (!base || base === '.' || base === '..' || base === '~') ? `archive${ext}` : `${base}${ext}`;
  }
  if (ex.count != null) v.count = ex.count;
  if (has('depth') && ex.count != null && ex.count <= 10) v.depth = ex.count;
  if (ex.size) v.size = ex.size;
  if (ex.duration) {
    v.age = ex.duration.age;
    v.days = ex.duration.days;
    v.since = ex.duration.since;
  } else if (has('days') && ex.count != null) {
    v.days = ex.count;
  }
  if (ex.port) v.port = ex.port;
  if (has('pid')) {
    // a number the request protects ("kill 1234 but keep 5678", "zostaw 5678") is never the target: another one, else <PID>
    const kept = new Set(protectedNumbers(ex.text));
    if (ex.pid && !kept.has(+ex.pid)) v.pid = ex.pid;
    else if (ex.numbers?.length) v.pid = ex.numbers.find((n) => n > 1 && !kept.has(n));
  }
  if (has('port') && !v.port && ex.numbers?.length) v.port = ex.numbers.find((n) => n >= 20 && n < 65536);
  if (ex.mode && has('mode')) v.mode = ex.mode;
  // line range: "lines 10-20", "od 10 do 20", "10 to 20", "from line 5 through 9"; else the first two numbers
  if (has('start')) {
    const m = String(ex.text).match(/(?<![\w.])(\d{1,9})\s*(?:-|–|—|\.\.|,|:|to|do|through|thru|until|till|and|i)\s*(?:line\s+|linii\s+|linia\s+)?(\d{1,9})(?![\w.])/i);
    const [a, b] = m ? [+m[1], +m[2]] : (ex.numbers || []).slice(0, 2);
    if (a > 0 && b > 0) { v.start = Math.min(a, b); v.end = Math.max(a, b); }
    delete v.count;
  }
  if (has('num')) {
    const n = ex.pid ?? ex.numbers?.find((x) => x > 0) ?? ex.count;
    if (n != null) v.num = n;
    delete v.count;
  }
  if (has('pr')) {
    // "merge pr 45 in repository other/repo", "… --repo other/repo": the repository is kept (`--repo`), an unreadable one
    // ("in the other repo", "in repo v2") withheld, never dropped; gh needs a pull request named with it
    const rq = has('repo') ? prRepo(String(ex.text)) : null;
    if (rq) v.repo = rq.repo;
    // "--repo a/b or --repo c/d", a pull request URL of a/b with `--repo c/d`: competing repositories are withheld
    if (rq && rq.repo !== '?' && [...repoMentions(String(ex.text))].some((r) => r !== repoKey(rq.repo))) v.repo = '?';
    // the pull request the user names: a URL or a branch is kept as it is (validation withholds an odd one), never
    // dropped for a bare `gh pr merge`, which acts on the current branch's pull request
    // a literal gh command ("gh pr view 42"): its subcommand word is not a selector
    const lit = (t) => String(t).replace(/^(\s*(?:\S+\s+)?)gh\s+pr\s+(?:view|merge|checks)(?=\s|$)/i, '$1pr');
    const sel = prSelector(rq ? { ...ex, text: lit(rq.rest), numbers: (rq.rest.match(/\d+/g) || []).map(Number), quoted: ex.quoted.filter((q) => rq.rest.includes(q)) } : { ...ex, text: lit(ex.text) });
    if (rq?.pr != null) v.pr = rq.pr;
    else if (sel != null) v.pr = String(sel).replace(/^#(?=\d)/, '');
    else if (rq) v.pr = '?';
    delete v.count;
  }
  // "create a pull request in repo acme/app", "list prs of other/repo": the repository is kept (`--repo`) or withheld
  if (has('repo') && !has('pr')) {
    const rq = prRepo(String(ex.text));
    if (rq) v.repo = rq.repo;
    if (rq && rq.repo !== '?' && [...repoMentions(String(ex.text))].some((r) => r !== repoKey(rq.repo))) v.repo = '?';
  }
  // "merge pr 45 and delete the branch": gh pr merge --delete-branch
  // "… and don't delete the branch", "nie usuwaj brancha", "keep the branch, do not remove it": a negated delete is no flag
  if (intent.id === 'gh_pr_merge') {
    const f = foldKeepLength(String(ex.text)).toLowerCase();
    if ([...f.matchAll(PR_DELETE_BRANCH)].some((m) => !PR_DELETE_NEGATED.test(f.slice(0, m.index + m[0].search(/delete|remove|usun/))))) v.delbranch = '--delete-branch';
  }
  if (has('wenv')) {
    const t = String(ex.text);
    if (wranglerDry(t)) v.dryrun = '--dry-run';
    // an environment named but not readable ("to the env called 'a b'", "worker env") is withheld, never the default target
    const w = wranglerEnv(t);
    if (w != null) v.wenv = w;
  }
  if (ex.ext) v.glob = `*.${ex.ext}`;
  if (ex.urls.length) v.url = ex.urls[0];
  else if (has('url') && ex.hosts.length) v.url = /^\w+:\/\//.test(ex.hosts[0]) ? ex.hosts[0] : `https://${ex.hosts[0]}`;

  if (pathPattern != null) v.pattern = pathPattern;
  for (const k of ['name', 'service', 'container', 'pkg', 'cmd', 'script', 'var', 'branch', 'user', 'pattern', 'host', 'target', 'message']) {
    if (has(k) && v[k] == null) {
      const val = pickArg(k, ex);
      if (val != null && val !== '') v[k] = val;
    }
  }
  // a literal npm script name (`npm run build --workspace "staging app"`, `run npm deploy …`) is the script, whatever else
  // the request quotes
  if (intent.id === 'npm_run_script' && (v.script == null || String(v.script).startsWith('?'))) {
    const t = String(ex.text);
    const m = t.match(/\bnpm\s+run(?:-script)?\s+([A-Za-z0-9][\w:.-]*)(?=\s|$)/) || t.match(/^\s*run\s+npm\s+(?!(?:run|install|i|ci|scripts?|the|a|my|publish|unpublish|audit|update|upgrade|uninstall|remove|rm|outdated|login|logout|link|pack|version|init|exec|config|cache|deprecate|dist-tag|owner|access|token|adduser)\b)([A-Za-z0-9][\w:.-]*)(?=\s|$)/i);
    if (m) v.script = m[1];
  }
  // the new git / gh / wrangler templates: a value the request does not name explicitly is never guessed
  newTemplateSlots(intent.id, String(ex.text), v, ex.quoted || []);
  if (intent.id === 'base64_encode' || intent.id === 'base64_decode') {
    const t = pickArg('text', ex);
    const fileWord = /\b(plik\w*|files?)\s+\S+\.\w+/i.test(ex.text);
    if (ex.quoted.length) v.text = ex.quoted[0];
    else if (paths.length && fileWord) v.file = paths[0];
    else if (paths.length && !(t && t.includes(' '))) v.file = paths[0];
    else if (t) v.text = t;
  }
  if (intent.id === 'find_by_name') {
    let name = v.name ?? (ex.quoted[0] || paths.find((p) => !p.includes('/') && p !== '.' && p !== '~'));
    if (!name) {
      const w = ex.rest.match(/\b(?:named|called|name|nazwie|nazwa|nazwany|nazywa sie|nazywajacy sie|plik|file|pliku)\s+(?:o\s+)?(?:nazwie\s+)?([\w.*-]+)/);
      if (w && !/^(o|the|a|nazwie|named|called)$/.test(w[1])) name = w[1];
    }
    if (name) {
      v.name = name;
      v.namepat = /[*?]/.test(name) || /\.\w+$/.test(name) ? name : `*${name}*`;
      if (v.path === name) v.path = paths.find((p) => p !== name);
    }
  }
  if (intent.id === 'replace_text') {
    let [o, n] = ex.taggerOnly ? [ex.tagged.PATTERN?.[0], ex.tagged.REPL?.[0]] : ex.quoted;
    if (!ex.taggerOnly && (o == null || n == null)) {
      const m = ex.text.match(/(?:replace|substitute|change|swap|zamie[nń]|zmie[nń]|podmie[nń]|zast[aą]p)\s+(?:all\s+|every\s+|wszystkie\s+|ka[zż]de\s+)?(?:occurrences of\s+|wyst[aą]pienia\s+)?(?:word\s+|s[lł]owo\s+|text\s+|tekst\s+|string\s+)?["'„]?([^\s"'”]+)["'”]?\s+(?:with|to|for|into|by|na|->|=>)\s+["'„]?([^\s"'”]+)["'”]?/i);
      if (m) { o = o ?? m[1]; n = n ?? m[2]; }
    }
    if (o != null) v.old = o;
    if (n != null) v.new = n;
    if (o != null && n != null) v.sedexpr = `s/${sedEscapeOld(o)}/${sedEscapeNew(n)}/g`;
    // the file is the path that is not one of the replaced words
    if (v.file && (v.file === o || v.file === n)) v.file = paths.find((p) => p !== o && p !== n);
  }
  if (intent.id === 'chown' && v.user && v.path === v.user) delete v.path;
  if (intent.id === 'npm_install') npmInstallTarget(String(ex.text), v);
  // gh / wrangler: a word the request has that neither the vocabulary nor a read value explains withholds the selector
  if (hasSelectorRule(intent.id)) {
    const k = selectorWithhold(intent.id, String(ex.text), v);
    if (k && has(k)) v[k] = '?';
  }
  if (intent.id === 'ssh_port_forward') tunnelEnds(String(ex.text), v);
  scopeSlots(intent.id, String(ex.text), v, has);
  for (const k of contestedSlots(intent.id, String(ex.text), v)) if (has(k)) v[k] = '?';
  for (const k of Object.keys(v)) if (v[k] === undefined) delete v[k];
  return v;
}

// ---------------------------------------------------------------------------------------------
// Scope options (v0.3 close4): a dev-tool request that says where its command acts (a workspace, a repository or project, an
// environment, a config file, a prefix / directory) keeps it, rendered as the option, or gets a placeholder; never the
// default scope. `npm run deploy --workspace staging` -> `npm run deploy --workspace staging`; `npm run deploy --env prod`
// -> `npm run deploy <SCOPE>` (npm has no such scope); `merge pr 42 in project acme/backend` -> `--repo acme/backend`.
const SCOPE_FAMILIES = /^(?:npm_|pip_install$|gh_|wrangler_)/;
const SCOPE_KIND = {
  '--workspace': 'workspace', '-w': 'workspace', '--workspaces': 'workspace', '--ws': 'workspace', '--filter': 'workspace',
  '--repo': 'repo', '-r': 'repo', '--env': 'env', '-e': 'env', '--config': 'config', '-c': 'config',
  '--prefix': 'dir', '--cwd': 'dir', '--dir': 'dir', '-c-dir': 'dir', '--project': 'project', '--target': 'target', '-t': 'target',
};
// short forms are options of one tool only: npm -w, gh -R, wrangler -e / -c
const SCOPE_SHORT = { '-w': /^npm_/, '-r': /^gh_/, '-e': /^wrangler_/, '-c': /^wrangler_/, '-t': /^pip_/ };
// a quoted value is one value (`--workspace "staging app"`), never its first word
const SCOPE_OPT = /(?:^|\s)(--workspaces?|--ws|--filter|--repo|--env|--config|--prefix|--cwd|--dir|--project|--target|-[wRect])(?:=(?:"([^"]*)"|'([^']*)'|(\S*))|\s+(?:"([^"]*)"|'([^']*)'|(?!-)([^\s,;!?]+))|(?=[\s,;!?]|$))/g;
// "in workspace api", "for the project acme/app", "w projekcie api", "in the staging environment" is read by wranglerEnv
const SCOPE_PHRASE = /(?:^|\s)(?:in|for|of|on|from|within|inside|under|at|w|we|dla|z)\s+(?:the\s+|a\s+)?(workspace|project|projek\w*|repo|repository|repozytori\w*|env|environment|srodowisk\w*|config|configuration|konfiguracj\w*)\s+(?!-)("[^"\n]*"|'[^'\n]*'|[^\s,;!?]+)/g;
// pip's attached short form: `-t/tmp/pkgs`, `-t~/pkgs` (the separated `-t DIR` is read by SCOPE_OPT)
// trailing sentence punctuation is dropped, but never a `.` / `..` path segment (`-t lib/..`, `..\..`)
const stripScopePunct = (x) => (/(?:^|[\/\\:])\.{1,2}$/.test(x) || /^[a-z]:$/i.test(x) ? x : x.replace(/[.,!?;:]+$/, ''));
const SCOPE_ATTACHED_T = /(?:^|\s)-t((?:"[^"\n]*"|'[^'\n]*'|[/~.\w][^\s,;!?]*))/g;
const SCOPE_PHRASE_KIND = (w) => /^(?:workspace)$/.test(w) ? 'workspace' : /^(?:repo|repository|repozytori)/.test(w) ? 'repo'
  : /^(?:env|environment|srodowisk)/.test(w) ? 'env' : /^(?:config|configuration|konfiguracj)/.test(w) ? 'config' : 'project';
const SCOPE_NOT_VALUE = /^(?:the|a|an|this|that|current|same|my|our|own|local|default|root|here|it|tym|tego|bieżącym|biezacym|obecnym|moim|naszym)$/i;
/** The scopes a request names: [{ kind, value (null: named without a readable value) }]. */
export function scopeMentions(intentId, text) {
  const out = [];
  const t = String(text);
  for (const m of t.matchAll(SCOPE_OPT)) {
    const opt = m[1].length === 2 ? m[1].toLowerCase() : m[1];
    if (SCOPE_SHORT[opt] && !SCOPE_SHORT[opt].test(intentId)) continue;
    const quoted = m[2] ?? m[3] ?? m[5] ?? m[6];
    const raw = quoted ?? m[4] ?? m[7] ?? null;
    // a quoted value glued to more text (`--target "lib"cache`, `-t "lib",cache`) or an operand cut at punctuation is a placeholder
    const after = t.slice(m.index + m[0].length);
    const gluedQ = quoted != null && (SCOPE_KIND[opt] === 'target' ? /^\S/.test(after) || quoted !== quoted.trim() : (/^\S/.test(after) && !/^[.!?;:)]+(?:\s|$)/.test(after)) || quoted !== quoted.trim());
    const punctTarget = SCOPE_KIND[opt] === 'target' && quoted == null && raw != null && (/^[,;!?]/.test(after) || (/[,;:.!?]$/.test(raw) && !/^[a-z]:$/i.test(raw) && !/(?:^|[\/\\:])\.{1,2}$/.test(raw)));
    const cutRaw = quoted == null && raw != null && (punctTarget || /\\$/.test(raw) || /^[,;!?]\S/.test(after) || /["'`]/.test(raw) || /^["'`]/.test(after));
    out.push({ kind: SCOPE_KIND[opt], value: gluedQ || cutRaw ? null : quoted != null ? quoted.trim() || null : raw ? stripScopePunct(raw).replace(/^["'`]|["'`]$/g, '') || null : null, at: m.index });
  }
  if (/^pip_/.test(intentId)) {
    // `-t@foo`: an attached target the parser does not read is still a target (placeholder), never dropped
    for (const m of t.matchAll(/(?:^|\s)-t([^\s/~.\w"'][^\s]*)/g)) out.push({ kind: 'target', value: null, at: m.index });
    // a pip target in a multi-line request: the shell reading of the operand is unclear: a placeholder
    if (/[\r\n\t\v\f\u0085\u2028\u2029]/.test(t) && /(?:^|\s)(?:-t|--target)/.test(t)) out.push({ kind: 'target', value: null, at: t.search(/(?:-t|--target)/) });
    // `-t"lib` / `--target "lib`: an unterminated quote is unreadable: a placeholder, never dropped
    for (const m of t.matchAll(/(?:^|\s)(?:-t|--target)(?:=|\s*)(["'])/g)) { const rest = t.slice(m.index + m[0].length); if (!rest.includes(m[1])) out.push({ kind: 'target', value: null, at: m.index }); }
    for (const m of t.matchAll(SCOPE_ATTACHED_T)) {
      // quoted contents are literal; only an unquoted value loses trailing punctuation
      const q = /^(["'])([\s\S]*)\1$/.exec(m[1]);
      // `-t"/tmp/a\"b"`: an escaped quote makes the end unclear: a placeholder
      const escaped = q && (q[2].endsWith('\\') || t.charAt(m.index + m[0].length) === q[1] || /^\S/.test(t.slice(m.index + m[0].length)));
      // the operand pip reads is everything up to the next space (`-t/tmp/lib,cache`): anything else is a placeholder
      const whole = (t.slice(m.index).match(/^\s*-t(\S+)/) || [])[1] ?? '';
      const cut = !q && (stripScopePunct(whole) !== stripScopePunct(m[1]) || /["'`]/.test(whole) || /\\\s|\\$/.test(t.slice(m.index, m.index + m[0].length + 1)));
      // `-tlib,`: a trailing comma / semicolon / colon is part of what pip reads: placeholder
      const whole0 = (t.slice(m.index).match(/^\s*-t(\S+)/) || [])[1] ?? '';
      if (!q && /[,;:.!?]$/.test(whole0) && !/^[a-z]:$/i.test(whole0) && !/(?:^|[\/\\:])\.{1,2}$/.test(whole0)) { out.push({ kind: 'target', value: null, at: m.index }); continue; }
      const bare = stripScopePunct(m[1]).trim(); // `-t./lib/..` keeps its `..`
      const value = escaped || cut ? null : q ? q[2] : bare;
      out.push({ kind: 'target', value: value || null, at: m.index });
    }
  }
  const f = foldKeepLength(t).toLowerCase();
  for (const m of f.matchAll(SCOPE_PHRASE)) {
    const at = m.index + m[0].length - m[2].length;
    const rawv = t.slice(at, at + m[2].length);
    const quotedv = /^(["'])[\s\S]*\1$/.test(rawv) && rawv.length >= 2;
    const value = quotedv ? (rawv.slice(1, -1).trim() === rawv.slice(1, -1) ? rawv.slice(1, -1) : '') : rawv.replace(/[.,!?;:]+$/, '').replace(/^["'`]|["'`]$/g, '');
    // an empty quoted value (`in workspace ""`) is a placeholder, never a dropped scope
    if (quotedv) { const aft = t.slice(at + m[2].length); const glued = (/^\S/.test(aft) && !/^[,.;:!?)]+(?:\s|$)/.test(aft)) || /\\$/.test(rawv.slice(1, -1)); out.push({ kind: SCOPE_PHRASE_KIND(m[1]), value: glued ? null : value || null, at }); continue; }
    // "w projekcie na macu", "in the project with npm": a function word is no scope value
    if (SCOPE_NOT_VALUE.test(value) || isStopWord(value) || /^(?:on|onto|under|over|via|using|w|we|z|ze|na|do|od|po|przez|pod|nad)$/i.test(value)) continue;
    out.push({ kind: SCOPE_PHRASE_KIND(m[1]), value: value || null, at });
  }
  return [...new Set(out)];
}
function scopeSlots(intentId, text, v, has) {
  if (!SCOPE_FAMILIES.test(intentId)) return;
  const unexpressed = [];
  const seen = {};
  for (const s of scopeMentions(intentId, text)) {
    // gh: a project is the repository; the repository and a wrangler environment are read by prRepo / wranglerEnv
    const kind = s.kind === 'project' && /^gh_/.test(intentId) ? 'repo' : s.kind;
    if (kind === 'repo' && has('repo')) { if (v.repo == null) v.repo = s.value != null && RAW_OK.repo(s.value) ? s.value : '?'; continue; }
    if (kind === 'env' && has('wenv')) { if (v.wenv == null) v.wenv = s.value != null && RAW_OK.wenv(s.value) ? s.value : '?'; continue; }
    if (kind === 'workspace' && has('workspace')) {
      const w = s.value != null && RAW_OK.workspace(s.value) ? s.value : '?';
      // two different workspaces: neither is guessed
      v.workspace = seen.workspace != null && seen.workspace !== w ? '?' : w;
      seen.workspace = w;
      // a workspace value is not the script / package ("run npm --workspace api" is not `npm run api`)
      for (const k of ['script', 'pkg']) if (s.value != null && v[k] === s.value) v[k] = '?';
      continue;
    }
    // pip --target DIR: where the package is installed, kept (`python3 -m pip install requests --target /tmp/packages`)
    if (kind === 'target' && has('piptarget')) {
      const d = s.value != null && RAW_OK.piptarget(s.value) ? s.value : '?';
      v.piptarget = seen.piptarget != null && seen.piptarget !== d ? '?' : d;
      seen.piptarget = d;
      if (s.value != null && v.pkg === s.value) v.pkg = '?';
      continue;
    }
    unexpressed.push(s);
  }
  if (!unexpressed.length) return;
  for (const s of unexpressed) for (const k of ['script', 'pkg']) if (s.value != null && v[k] === s.value) v[k] = '?';
  if (has('scope')) v.scope = '?';
  else if (has('args')) v.args = '?';
}

// ---------------------------------------------------------------------------------------------
// Contested selectors (v0.3 close3): a selector the request offers alternatives for or negates ("merge pr 4 or 44", "merge
// pr 42 but not in repo acme/app", "deploy to prod, not staging", "zainstaluj axios albo lodash"), or names two candidate
// values for ("--env prod --env prodprod"), is withheld as a placeholder the user fills, never one of the candidates.
const CONTESTED = (id) => (hasSelectorRule(id) ? ['pr', 'num', 'wenv', 'repo', 'var'] : /^(?:npm_install|npm_install_global|pip_install)$/.test(id) ? ['pkg'] : id === 'npm_run_script' ? ['script'] : []);
// an alternative looks both ways ("4 or 44"); a negation at what follows it ("not in repo a/b", "nie na staging")
const SEL_ALT = /^(?:or|either|vs|versus|instead|rather|albo|lub|zamiast|ewentualnie|badz)$/;
const SEL_NEG = /^(?:not|never|nor|don't|dont|except|excluding|exclude|without|nie|oprocz|poza|bez|wykluczajac)$|n't$/;
// a negation that describes a state ("what went wrong" = "co poszło nie tak", "not working", "nie przeszedł"), not a selector
const SEL_NEG_STATE = /^(?:tak|dziala\w*|przeszl\w*|przeszedl|przechodz\w*|poszlo|wyszlo|work\w*|pass\w*|ok|okay|right|sure|good|green|zielon\w*)$/;
// a word that ends a clause (the alternative / negation does not reach past it)
const SEL_CLAUSE_END = /^(?:and|then|i|oraz|potem|so)$/;
// a number of something else ("issue 12", "2 approvals", "in 5 minutes"), not a candidate pull request / run
const SEL_NUM_OTHER_BEFORE = /^(?:issues?|tickets?|bugs?|zgloszeni\w*|fix(?:es)?|closes|resolves|line|lines|linii|top|last|first)$/;
const SEL_NUM_UNIT_AFTER = /^(?:secs?|seconds?|mins?|minutes?|minut\w*|hours?|hrs?|godzin\w*|days?|dni|dzien|weeks?|tygodn\w*|months?|miesi\w*|years?|lat\w*|times?|razy|ago|temu|old|more|approvals?|reviews?|reviewers?|commits?|files?|lines?|changes?|comments?|checks?)$/;
const SEL_ENV_ALIAS = (w) => (/^(?:prod|production|produkc\w*)$/.test(w) ? 'prod' : /^(?:staging|stage|stagingu|stagingowe\w*)$/.test(w) ? 'staging' : w);
const tokenClean = (w) => w.replace(/^[("'`„“”]+|[)"'`“”.,!?;:]+$/g, '');
/** The selector slots of a request that are contested (an alternative, a negation, two candidates): withheld (`?`). */
export function contestedSlots(intentId, text, values = {}) {
  // a slot already withheld (`?`) still takes the alternative / negation next to its candidates
  const slots = CONTESTED(intentId).filter((k) => values[k] != null);
  if (!slots.some((k) => !String(values[k]).startsWith('?'))) return [];
  const raw = foldKeepLength(String(text)).toLowerCase().split(/\s+/).filter(Boolean);
  const words = raw.map(tokenClean);
  const ends = raw.map((w, i) => /[.,;!?:]$/.test(w) || SEL_CLAUSE_END.test(words[i]));
  // the candidate values of a slot, by token index
  const candidates = (k) => {
    const out = new Map();
    const v = foldKeepLength(String(values[k])).toLowerCase();
    words.forEach((w, i) => {
      const bare = w.replace(/^#(?=\d)/, '');
      if (bare === v || (k === 'repo' && RAW_OK.repo(repoValue(w)) && repoKey(repoValue(w)) === repoKey(v))) out.set(i, k === 'repo' ? repoKey(v) : v);
      if ((k === 'pr' || k === 'num') && /^\d{1,12}$/.test(bare) && !SEL_NUM_OTHER_BEFORE.test(words[i - 1] ?? '') && !SEL_NUM_UNIT_AFTER.test(words[i + 1] ?? '')) out.set(i, bare);
      if (k === 'pr') { const u = w.match(/\/pull\/(\d{1,12})\/?$/); if (u) out.set(i, /^\d+$/.test(v) ? u[1] : w); }
      if (k === 'repo' && /\//.test(w) && RAW_OK.repo(repoValue(w)) && (/^(?:--repo|-r|repo|repository|repozytorium|in|of|on|from|at|to|w|z)$/.test(words[i - 1] ?? '') || /^--repo=/.test(w))) out.set(i, repoKey(repoValue(w.replace(/^--repo=/, ''))));
      if (k === 'wenv') {
        const opt = w.match(/^(?:--env|env)=(.+)$/);
        if (opt) out.set(i, SEL_ENV_ALIAS(opt[1]));
        else if (/^(?:--env|-e)$/.test(words[i - 1] ?? '') && RAW_OK.wenv(w)) out.set(i, SEL_ENV_ALIAS(w));
        else if (WR_ENV_STRONG.test(w) || /^produkc/.test(w)) out.set(i, SEL_ENV_ALIAS(w));
        if (out.get(i) === SEL_ENV_ALIAS(v) || w === v) out.set(i, SEL_ENV_ALIAS(v));
      }
    });
    return out;
  };
  const cand = Object.fromEntries(slots.map((k) => [k, candidates(k)]));
  const out = new Set(slots.filter((k) => new Set(cand[k].values()).size > 1));
  // the slots of the nearest candidate within n words of i, in the same clause
  const nearest = (i, step, n) => {
    for (let j = i + step, m = 0; j >= 0 && j < words.length && m < n; j += step, m++) {
      const hit = slots.filter((k) => cand[k].has(j));
      if (hit.length) return hit;
      if (ends[step > 0 ? j : j - 1]) break;
    }
    return [];
  };
  words.forEach((w, i) => {
    const alt = SEL_ALT.test(w);
    if (!alt && (!SEL_NEG.test(w) || SEL_NEG_STATE.test(words[i + 1] ?? ''))) return;
    const hit = [...(/[.,;!?:]$/.test(raw[i]) ? [] : nearest(i, 1, 5)), ...(alt ? nearest(i, -1, 3) : [])];
    for (const k of hit) out.add(k);
  });
  return [...out].filter((k) => !String(values[k]).startsWith('?'));
}

function renderValue(name, raw, values, quote) {
  if (!(name in values)) return null;
  let val = values[name];
  if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
  if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
  return quote(val, { tilde: PATH_SLOTS.has(name), name });
}

const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|rport|rhost|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;

/**
 * Fill a template. Returns { command, missing[] }.
 * `values` = resolved slots merged over intent defaults.
 */
export function render(template, values, required = [], quote = shQuote, keepOptional = []) {
  const missing = [];
  const isSlot = (name) => name in values || required.includes(name) || SLOT_NAMES.test(name);
  // Single pass over the template: every {slot} and «optional segment» is substituted exactly once and
  // inserted values are never scanned again (a value containing "{file}" must stay inert text).
  const out = template.replace(/«([^»]*)»|\{(\w+)(!raw)?\}/g, (m, seg, name, raw) => {
    if (seg != null) {
      let ok = true;
      const r = seg.replace(/\{(\w+)(!raw)?\}/g, (m2, n2, raw2) => {
        if (!ok) return m2;
        const val = renderValue(n2, !!raw2, values, quote);
        // an operand withheld on purpose (keepOptional: an invalid operand, an unresolved history value) keeps its
        // placeholder: the optional part is not silently dropped (`npm install <PKG>`, never `npm install`)
        if (val == null && keepOptional.includes(n2)) { missing.push(n2); return PLACEHOLDER(n2); }
        if (val == null) { ok = false; return m2; }
        return val;
      });
      return ok ? (/^\s/.test(r) ? r : ' ' + r) : '';
    }
    if (!isSlot(name)) return m; // not a slot (e.g. awk braces, %{http_code}, PowerShell script blocks)
    const val = renderValue(name, !!raw, values, quote);
    if (val == null) {
      missing.push(name);
      return PLACEHOLDER(name);
    }
    return val;
  });
  // an optional segment at the very start (`«mkdir -p {dest} && »tar …`) must not leave a leading space
  return { command: out.replace(/^\s+/, ''), missing };
}

const DERIVED_REQUIRED = { namepat: 'name', glob: 'ext', sedexpr: 'old' };

const SIZE_MULT = { c: 1, k: 1024, M: 1024 ** 2, G: 1024 ** 3 };
/** Slots derived from others so every shell can use the unit it needs (find: -mmin/-size, PowerShell: minutes/bytes). */
export function deriveSlots(v) {
  // ssh -L: the remote port is the local one unless the request names another
  if (v.rhost != null && v.rport == null && v.port != null) v.rport = v.port;
  if (v.glob && v.ext == null) { const m = String(v.glob).match(/^\*\.([\w]+)$/); if (m) v.ext = m[1]; }
  if (v.minutes == null && v.age) {
    const m = String(v.age).match(/^-m(min|time) -(\d+)$/);
    if (m) v.minutes = m[1] === 'min' ? +m[2] : +m[2] * 1440;
  }
  if (v.sizeBytes == null && v.size != null) {
    const m = String(v.size).match(/^(\d+)([ckMG]?)$/);
    if (m) v.sizeBytes = +m[1] * (SIZE_MULT[m[2]] ?? 512);
  }
  return v;
}

/** env from the legacy `platform` option */
export const envFromPlatform = (platform = process.platform) => ({
  shell: 'bash',
  os: platform === 'darwin' ? 'darwin' : platform === 'win32' ? 'win32' : 'linux',
  coreutils: platform === 'darwin' ? 'bsd' : 'gnu',
});

/**
 * Build a full suggestion for an intent and query.
 *   env: { shell, os, coreutils } (default: bash on `platform`)
 *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
 * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}
 */
export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [], keepOptional = [] } = {}) {
  const intent = BY_ID[intentId];
  if (!intent) throw new Error(`unknown intent ${intentId}`);
  const e = env || envFromPlatform(platform);
  const resolved = given || resolveSlots(intent, extracted || extractSlots(text));
  const defaults = { ...intent.slots, ...(e.os === 'darwin' ? intent.darwinDefaults : {}) };
  const values = {};
  for (const [k, d] of Object.entries(defaults)) if (d != null) values[k] = d;
  Object.assign(values, resolved);
  // blank: slots withheld on purpose (refused reference, ambiguous path): no default stands in for them
  for (const k of blank) if (resolved[k] == null) delete values[k];
  // the filesystem root ("whole disk", "na całym dysku") is the system drive for Windows shells
  if (e.os === 'win32' && (e.shell === 'powershell' || e.shell === 'cmd')) {
    for (const k of PATH_SLOTS) if (values[k] === '/') values[k] = 'C:\\';
  }
  deriveSlots(values);
  // (a withheld slot is not derived from another one either: `<RPORT>`, never the local port)
  for (const k of blank) if (resolved[k] == null) delete values[k];
  const required = [...new Set([...Object.entries(intent.slots).filter(([, d]) => d == null).map(([k]) => k), ...blank.filter((k) => !(k in values))])];

  const choice = chooseTemplate(intent, e);
  const base = {
    intent: intent.id, description: intent.description, baseRisk: intent.risk, slots: resolved,
    notes: intent.notes || null, shell: e.shell, os: e.os, variant: choice.variant || null,
  };
  if (choice.gap) {
    return { ...base, command: null, gap: choice.gap, risk: intent.risk, warnings: [], critical: false, missing: [] };
  }
  const baseQuote = quoteForKind(choice.kind, choice.wrapPosix);
  const tpl = choice.tpl;
  const pwshNative = choice.kind === 'pwsh' && !choice.wrapPosix;
  const nativeSlots = pwshNative ? pwshNativeSlots(tpl) : new Set();
  const quote = !pwshNative ? baseQuote : (v, o = {}) => {
    // function templates: every value is checked (the target program is not known statically)
    if ((typeof tpl === 'function' || nativeSlots.has(o.name)) && unsafeNativePwshArg(v)) {
      throw new UnquotableError(`value ${JSON.stringify(String(v))} cannot be passed to a native program safely by PowerShell < 7.3 (embedded " or trailing \\)`);
    }
    return baseQuote(v, o);
  };
  let command;
  let missing = [];
  try {
    if (typeof tpl === 'function') {
      const vals = { ...values };
      for (const r of required) if (!(r in vals)) { missing.push(r); vals[r] = PLACEHOLDER(r); }
      // only path slots may get a ./ prefix; any other value starting with - would be read as an
      // option (printf -n, findstr /?, taskkill ...): it is left as a placeholder instead
      for (const [k, v] of Object.entries(vals)) {
        if (!PATH_SLOTS.has(k) && !RAW_OK[k] && typeof v === 'string' && /^-/.test(v)) { missing.push(k); vals[k] = PLACEHOLDER(k); }
      }
      // slot role must be passed explicitly ({ name } or { tilde }); never infer from value
      // equality — a pattern equal to a path would otherwise be rewritten like a path
      const q = (s, o = {}) => {
        const isPath = 'tilde' in o ? !!o.tilde : PATH_SLOTS.has(o.name);
        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { ...o, tilde: isPath });
      };
      // catalog functions take the OS string, variant functions a ctx object
      command = tpl(vals, q, tpl === intent.template || tpl === intent.darwin ? e.os : e);
      if (/<TEXT>/.test(command)) missing.push('text');
    } else {
      ({ command, missing } = render(tpl, values, required, quote, keepOptional.filter((k) => blank.includes(k) && !(k in values))));
      missing = missing.map((m) => DERIVED_REQUIRED[m] || m);
    }
  } catch (err) {
    if (!(err instanceof UnquotableError)) throw err;
    return { ...base, command: null, gap: err.message, risk: intent.risk, warnings: [], critical: false, missing: [] };
  }
  if (choice.wrapPosix) {
    // PowerShell < 7.3 drops embedded double quotes when passing arguments to native programs, so a
    // POSIX command containing `"` is fed to bash on stdin instead of as a -c argument.
    if (command.includes('"')) { command = psQuote(command) + ' | bash'; base.variant = 'piped to bash (no native PowerShell variant)'; }
    else { command = 'bash -c ' + psQuote(command); base.variant = 'bash -c (no native PowerShell variant)'; }
  }
  missing = [...new Set(missing)];
  // the trust rule (danger.js): this is tellsh's own render; it can be rated safe only when every value it was given is
  // a plain literal (a missing value is tellsh's own <PLACEHOLDER>, and the command cannot run before it is edited)
  const used = typeof tpl === 'function' ? Object.keys(values) : [...String(tpl).matchAll(/\{(\w+)(!raw)?\}/g)].map((m) => m[1]);
  const plain = used.every((k) => !(k in values) || plainSlotValue(k, values[k], { dashOk: PATH_SLOTS.has(k) || (!!RAW_OK[k] && RAW_OK[k](values[k])) }));
  const danger = checkDanger(command, intent.risk, { rendered: plain, shell: choice.kind === 'pwsh' && !choice.wrapPosix ? 'powershell' : e.shell, os: e.os });
  return {
    ...base,
    command,
    risk: maxRisk(intent.risk, danger.risk),
    warnings: danger.warnings,
    critical: danger.critical,
    missing,
  };
}

const markMissing = (v, k) => {
  if (!v._placeRejected) Object.defineProperty(v, '_placeRejected', { value: [], enumerable: false, writable: true });
  if (!v._placeRejected.includes(k)) v._placeRejected.push(k);
};
const NPM_BUILTIN = /^(?:publish|unpublish|audit|update|upgrade|uninstall|remove|rm|outdated|login|logout|link|pack|version|init|exec|config|cache|deprecate|dist-tag|owner|access|token|adduser|trust|undeprecate|rebuild|prune|dedupe|fund|doctor|ls|list|explain|query|search|view|info|star|stars|unstar|ping|prefix|root|bin|bugs|docs|edit|help|hook|org|profile|repo|shrinkwrap|team|whoami|set|get|pkg|sbom|diff|ci|install-test|it|completion|find-dupes|exec|x)$/i;
const REF_TOKEN = /(?:^|\s)((?:HEAD|@)(?:[~^]\d*)*|(?=[0-9a-f]*\d)[0-9a-f]{7,40}|v\d+(?:\.\d+)*)(?=[\s,.;:!?]|$)/;
/** Explicit values only for the 0.3.4 templates (git show/fetch/grep, gh issue/run, wrangler pages deploy). */
export function newTemplateSlots(id, text, v, quoted) {
  let t = text.trim();
  if (id === 'git_show') {
    delete v.branch; delete v.rev;
    const lit = t.match(/\bgit\s+show\s+(["']?)([^\s"']+)\1(?=\s|$)/i) || t.match(/\b(?:commit|revision|tag|rewizj\w*|tagu?)\s+(["']?)([^\s"']+)\1(?=[\s,.;!?]*$|\s)/i);
    const m = t.match(REF_TOKEN);
    // after "commit" / "tag" only something ref-shaped (a hash, HEAD~1, v1.2, a/b), never an English word ("commit with its diff")
    const litOk = lit && (/^git\s+show/i.test(lit[0]) || /[\d~^@:\/]/.test(lit[2]) || /^HEAD$/i.test(lit[2]));
    const cand = litOk ? lit[2] : m ? m[1] : null;
    if (cand != null) {
      if (lit && /^git\s+show/i.test(lit[0]) && /^[\w./~^@{}:!-]+$/.test(cand) && !cand.startsWith('-')) v.rev = cand; // literal: as typed
      else if (/^(?:the|a|last|latest|newest|ostatni\w*|previous|prior|poprzedni\w*|that|this|it)$/i.test(cand)) { if (/^(?:previous|prior|poprzedni\w*)$/i.test(cand)) v.rev = 'HEAD~1'; }
      else if (/^[\w./~^@{}:!-]+$/.test(cand) && !cand.startsWith('-')) v.rev = cand;
    } else if (/\b(?:previous|prior|one before|second[- ]to[- ]last|przedostatni\w*|poprzedni\w*)\b/i.test(t)) v.rev = 'HEAD~1';
  }
  // git_fetch is always `git fetch --all` (a superset of one remote; --prune is not offered): a known limit
  if (id === 'grep_text' && typeof v.pattern === 'string' && v.pattern.startsWith('-') && !quoted.includes(v.pattern)) delete v.pattern;
  if (id === 'npm_run_script' && typeof v.script === 'string' && NPM_BUILTIN.test(v.script) && !new RegExp(`\\bnpm\\s+run(?:-script)?\\s+${v.script}\\b|\\bscript\\s+${v.script}\\b`, 'i').test(t)) delete v.script;
  if (id === 'git_grep') {
    const lit = t.match(/\bgit\s+grep\s+((?:-\S+\s+)*)(?:--\s+)?(?:for\s+)?(["']?)([^\s"']+)\2/i);
    const flags = lit ? lit[1].trim().split(/\s+/).filter((x) => x && x !== '-n' && x !== '--') : [];
    if (quoted.length) v.pattern = quoted[0];
    else if (lit && !lit[3].startsWith('-')) v.pattern = lit[3];
    else {
      const f = t.match(/\b(?:for|na|fraz\w*|słowo|slowo)\s+(["']?)([^\s"']+)\1\s*$/i);
      if (f && !f[2].startsWith('-')) v.pattern = f[2];
    }
    if (typeof v.pattern === 'string' && (v.pattern.startsWith('-') || /^(?:tracked|repo|repository|files?|the|git|for)$/i.test(v.pattern))) delete v.pattern;
    // options the template cannot express (`-i`, `-w`, `-e`): withheld, never silently dropped
    if (flags.length || /\b(?:case[- ]insensitive|ignore case|bez wzgl[eę]du na wielko\w*)\b/i.test(t)) delete v.pattern;
  }
  if (id === 'gh_issue_view' || id === 'gh_run_watch') {
    const UNIT = String.raw`(?!\s*(?:comments?|komentarz\w*|days?|weeks?|months?|years?|hours?|minutes?|mins?|seconds?|dni|dzie\w*|tygodn\w*|miesi\w*|godzin\w*|minut\w*|times?|razy|old|ago|temu)\b)`;
    const re = id === 'gh_issue_view'
      ? new RegExp(String.raw`(?:\bgh\s+issue\s+view\s+#?|^\s*#|\b(?:issue|ticket|bug|zgloszeni\w*|zgłoszeni\w*)\s+(?:(?:nr|no\.?|number|numer)\s*)?#?)(\d+)\b` + UNIT, 'i')
      : new RegExp(String.raw`(?:\bgh\s+run\s+watch\s+|\b(?:run|runa|runu)\s+(?:(?:id|nr|no\.?|number|numer)\s*)?#?)(\d+)\b` + UNIT, 'i');
    const m = t.match(re);
    if (m) v.num = m[1]; else delete v.num;
  }
  if (id === 'gh_issue_list') {
    // a repository name (`acme/closed`, quoted or not, or the value read into the repo slot) never sets the state
    t = t.replace(/--repo[=\s]+\S+|(["']?)(?:[\w.-]+\/)+[\w.-]+\1/gi, ' ');
    if (typeof v.repo === 'string' && v.repo) t = t.split(v.repo).join(' ');
    if (/\b(?:closed|zamkni\w*)\b/i.test(t)) v.state = 'closed';
    else if (/\b(?:all|every|wszystkie|wszystkich)\b/i.test(t) && !/\b(?:open|opened|otwart\w*)\b/i.test(t)) v.state = 'all';
    if (/\b(?:closed|zamkni\w*)\b/i.test(t) && /\b(?:open|opened|otwart\w*)\b/i.test(t)) v.state = 'all';
    if (v.state && typeof v.args === 'string' && v.args.startsWith('?')) delete v.args;
  }
  if (id === 'wrangler_pages_deploy') {
    // the upload directory only when it is named right after "deploy" and looks like a directory; otherwise <PATH>
    const DIR = /^(?:\.|\.\/\S+|\.\.\/\S+|~\/\S+|\/\S+|\S+\/\S*|build|dist|public|out|_site|output)$/i;
    const m = t.match(/\bpages\s+deploy\s+(["']?)([^\s"']+)\1(?=\s|$)/i) || (t.match(/\b(?:deploy|publish|upload|wdr[oó]ż|opublikuj|wrzuć|wrzuc)\s+(?:the\s+)?(?:(?:folder|dir|directory|katalog)\s+)?(["']?)([^\s"']+)\1(?:\s+(?:folder|dir|directory|katalog))?\s+(?:to|on|onto|na|do)\b/i));
    const qm = t.match(/\b(?:pages\s+deploy|deploy|publish|upload)\s+(?:the\s+)?(["'])([^"']+)\1/i);
    delete v.path;
    if (qm) v.path = qm[2];
    else if (m && DIR.test(m[2].replace(/[,;!?]+$/, ''))) v.path = m[2].replace(/[,;!?]+$/, '');
    // a dry run, a preview / branch / project / message the template cannot express: withheld, never a real deploy
    if (/\bdry[\s-]*run\b|\bna\s+sucho\b|\bwithout\s+(?:actually\s+)?(?:deploying|publishing|uploading)\b|\b(?:don'?t|do\s+not)\s+actually\b|\bpreview\b|\bbranch\b|\bga[lł][eę]zi\w*|\bproject\b|\bprojekt\w*|\bmessage\b|\bcommit\b|\bproduction\b|\bprod\b|\bstaging\b|--\w/i.test(t)) v.args = '?';
  }
  return v;
}

// Words the 0.3.4 templates explain; anything else in the request is a restriction / option the template cannot express.
const WH_COMMON = 'same again instead too also but tak samo zamiast też tez the a an our this that please now pls to on in of for with from and git npx gh wrangler cloudflare github pokaz pokaż mi na do w z dla prosze proszę teraz';
const WH_WORDS = {
  git_show: `${WH_COMMON} my me show display view see print commit commits revision tag last latest newest most recent previous prior second-to-last its diff changes change patch details what was changed in latest ostatni ostatniego ostatnia ostatnie poprzedni poprzedniego przedostatni commita commit zmiany zmian szczegoly szczegóły rewizje rewizję tagu tag`,
  git_grep: `${WH_COMMON} my me grep search find look lookup text string pattern word occurrences tracked files file repo repository codebase all every across szukaj wyszukaj znajdz znajdź poszukaj plikach plikow plików sledzonych śledzonych repozytorium kodzie kod -n --`,
  wrangler_pages_deploy: `${WH_COMMON} my me pages page deploy redeploy publish upload ship push static strona strone stronę stron statyczna statyczną folder directory dir katalog katalogu wdroz wdroż wdróż zdeployuj deployuj opublikuj wrzuc wrzuć wgraj`,
  gh_run_watch: `${WH_COMMON} me --repo repo repository watch watching follow live progress until it its is finishes finish finished done complete completes wait ends end run github actions action ci workflow build status obserwuj śledź sledz czekaj poczekaj zaczekaj aż az zakończy zakonczy skończy skonczy żywo zywo postęp postep runa runu`,
  gh_issue_view: `${WH_COMMON} me --repo repo repository show view issue details detail info information description summary read zgłoszenie zgloszenie zgłoszenia zgloszenia ticket bug szczegóły szczegoly opis przeczytaj nr number numer no`,
  gh_issue_list: `${WH_COMMON} --repo list listing show which what are there any issues issue bugs tickets problems all open opened closed state zgłoszenia zgloszenia zgłoszeń zgloszen lista listę liste wylistuj wszystkie otwarte otwartych zamknięte zamkniete repo repository`,
  wrangler_d1_list: `${WH_COMMON} me d1 database databases db dbs baza bazy baz danych list listing all show which what are there my moje moich wszystkie lista listę liste wylistuj listuj pokaż pokaz account konto konta`,
  git_ls_files: `${WH_COMMON} me ls-files list listing show which what are is all every files file tracked by git repo repository lista listę pliki plików plikow śledzone sledzone śledzonych sledzonych pokaż wszystkie przez`,
};
// only the slots a template renders explain words of the request (an extracted `since: yesterday` that never reaches
// `git show` does not)
const WH_RENDERED = { git_show: ['rev'], git_grep: ['pattern'], wrangler_pages_deploy: ['path'], gh_run_watch: ['num', 'repo'], gh_issue_view: ['num', 'repo'], gh_issue_list: ['repo', 'state'], git_ls_files: [], wrangler_d1_list: [] };
const whTokens = (t, vals = []) => { const left = [...vals]; return t.replace(/(["'])([^"']*)\1/g, (q, _, inner) => { const i = left.indexOf(inner); if (i >= 0) { left.splice(i, 1); return ' '; } return ` ${q} `; }).split(/\s+/).map((w) => { const c = w.replace(/^[(]+|[),.;:!?]+$/g, '').toLowerCase(); return /^\.+$/.test(w) || (!c && /\.\./.test(w)) ? w : c; }).filter(Boolean); };
const UNIT_AFTER = /^\s*-?(?:comments?|labels?|assignees?|reactions?|commits?|files?|failures?|errors?|checks?|runs?|issues?|prs?|people|users?|minutes?|komentarz\w*|days?|d|weeks?|wks?|w|months?|mos?|years?|yrs?|y|hours?|hrs?|h|minutes?|mins?|m|seconds?|secs?|s|dni|dzie\w*|tygodn\w*|miesi\w*|godz\w*|minut\w*|sekund\w*|times?|razy|old|ago|temu|jobs?|attempts?|steps?|items?|of|out|x|%|th|st|nd|rd)\b|^-\w/i;
/**
 * Why a suggestion for one of the 0.3.4 templates must not run as is ([] : fine): the request has a restriction, option,
 * scope or value boundary the template cannot express. The pipeline puts these in `missing`.
 */
export function newTemplateWithhold(id, text, slots = {}, command = null) {
  const t = String(text);
  const out = [];
  const glued = (val) => {
    if (val == null) return false;
    for (const m of t.matchAll(/(["'])((?:[^"'\\]|\\.)*)\1/g)) if (m[2] === String(val) || m[2].includes('\\')) {
      if (m[2].includes('\\') || /^[^\s,;!?)]/.test(t.slice(m.index + m[0].length)) || /[^\s(=]$/.test(t.slice(0, m.index))) return true;
    }
    return false;
  };
  // r21: a multi-line (or control-character) request is never read as one of these templates: the line-based checks cannot vouch for it
  if (WH_WORDS[id] && /[\r\n\t\v\f\u0085\u2028\u2029]/.test(t)) return ['request (spans several lines)'];
  // r30: typographic quotes or backticks are not read as quoting: the 0.3.4 templates never render them as runnable
  // r31: structural — any non-ASCII punctuation, symbol, space or control character (quote-likes of every script) and any backtick
  // r32: allow-list instead — only ASCII and Polish letters; anything else (saltillo ꞌ, other scripts' quote-likes) withholds
  if (WH_WORDS[id] && (/[^\x20-\x7eąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/u.test(t) || /`/.test(t))) return ['value (characters outside ASCII / Polish letters)'];
  if (WH_WORDS[id]) {
    // (the --repo value and the option itself are explained by the rendered repo slot)
    const ok = new Set(WH_WORDS[id].split(/\s+/));
    const raw = (WH_RENDERED[id] || []).map((k) => slots[k]).filter((x) => x != null).map((x) => String(x));
    // each rendered value explains one occurrence only (`for "src" in "src"`, `"foo" and "FOO"`)
    const vals = raw.map((x) => x.toLowerCase().replace(/^#/, ''));
    const left = [...vals];
    // quoted occurrences consumed by whTokens are removed from `left` first, so they never explain a second copy
    { const used = [...raw]; for (const m of t.matchAll(/(["'])([^"']*)\1/g)) { const i = used.indexOf(m[2]); if (i >= 0) { used.splice(i, 1); const j = left.indexOf(m[2].toLowerCase().replace(/^#/, '')); if (j >= 0) left.splice(j, 1); } } }
    const usedUp = new Set(vals.filter((x) => !left.includes(x)));
    const rest = whTokens(t, raw).filter((w) => { if (usedUp.has(w.replace(/^#/, '')) && !left.includes(w.replace(/^#/, ''))) return true; if (ok.has(w)) return false; const i = left.indexOf(w.replace(/^#/, '')); if (i >= 0) { left.splice(i, 1); return false; } return true; });
    // the literal form: nothing may follow the pattern (`git grep TODO -- code` is a pathspec, not vocabulary)
    if (id === 'git_grep') { const g = t.match(/\bgit\s+grep\s+(?:-n\s+)?(?:--\s+)?(?:"[^"]*"|'[^']*'|[^\s"']+)\s+(\S.*)$/i); if (g) { rest.length = 0; rest.push(g[1]); } }
    if (id === 'git_show') { const g = t.match(/\bgit\s+show\s+(?:"[^"]*"|'[^']*'|[^\s"']+)\s+(\S.*)$/i); if (g) { rest.length = 0; rest.push(g[1]); } }
    if (id === 'git_ls_files') { const g = t.match(/\bgit\s+ls-files\s+(\S.*)$/i); if (g) { rest.length = 0; rest.push(g[1]); } }
    // the derived `HEAD~1` ("the previous commit") does not appear in the request; a revision that does is explicit
    if (id === 'git_show' && slots.rev != null && t.toLowerCase().includes(String(slots.rev).toLowerCase()) && /\b(?:previous|prior|second[- ]to[- ]last|before|poprzedni\w*|przedostatni\w*|parent|rodzic\w*)\b/i.test(t)) rest.push('(relative to the named revision)');
    // two relative selectors ("the previous commit of the previous commit") or a named ref/tag/branch position
    if (id === 'git_show') {
      const rel = t.match(/\b(?:previous|prior|second[- ]to[- ]last|before|poprzedni\w*|przedostatni\w*|parent|rodzic\w*)\b/gi) || [];
      if (rel.length > 1) rest.push('(nested relative revision)');
      // several commit selectors ("the latest commit and the previous commit") name more than one object
      const sel = t.match(/\b(?:latest|last|newest|most recent|previous|prior|second[- ]to[- ]last|ostatni\w*|najnowsz\w*|poprzedni\w*|przedostatni\w*)\b/gi) || [];
      if (sel.length > 1 || (sel.length && slots.rev != null && t.toLowerCase().includes(String(slots.rev).toLowerCase()))) rest.push('(more than one commit selected)');
      // a tag / revision / branch named without a value read into rev is not HEAD
      if ((slots.rev == null || !t.toLowerCase().includes(String(slots.rev).toLowerCase())) && /\b(?:tags?|tagu|tagi|revision|rewizj\w*|branch\w*|gał[eę]zi\w*|galezi\w*)\b/i.test(t)) rest.push('(a tag, revision or branch without a value)');
      for (const m of t.matchAll(/\b(?:tag|branch|ref|revision|of|from|on|at|with|for|in|to|across|z|na|w|dla)\s+(?:the\s+)?(?=(["']?)([^\s"']+)\1)/gi)) if (String(slots.rev ?? '').toLowerCase() !== m[2].toLowerCase() && !/^(?:commit|commits|repo|repository|head|its|it|diff|changes|me|my|this|that)$/i.test(m[2])) rest.push(m[2]);
    }
    if (id === 'wrangler_pages_deploy') for (const m of t.matchAll(/\b(?:to|for|into|onto|on|as|named|called|in|at|under|across|pages|na|do|dla|w|jako)\s+(?:the\s+|my\s+)?(?=(["']?)([^\s"']+)\1)/gi)) if (!/^(?:cloudflare|pages|page)$/i.test(m[2]) && String(slots.path ?? '').toLowerCase() !== m[2].toLowerCase()) rest.push(m[2]);
    // a second pattern ("for "word" and TEXT", "foo or bar") is never searched
    if (id === 'git_grep') for (const m of t.matchAll(/(?:\b(?:and|or|but|instead|rather|oraz|lub|albo|i|ale|zamiast)|[,;])\s+(?:also\s+|than\s+|of\s+)?((?:(?:the|a|an|for|word|words|text|string|pattern|phrase|słowo|slowo|fraz\w*)\s+)*)(?=(["']?)([^\s"']+)\2)/gi)) if (/^[,;]/.test(m[0]) || /^(?:but|instead|rather|ale|zamiast)\b/i.test(m[0]) || /\balso\s/i.test(m[0]) || /\b(?:the|a|an)\s+$/i.test(m[1]) || /\b(?:word|words|text|string|pattern|phrase|for|słowo|slowo|fraz\w*)\b/i.test(m[1]) || !/^(?:tracked|files?|the|repo|repository|show|list|print|line|lines|numbers?)$/i.test(m[3])) rest.push(m[3]);
    // r22: structural — git grep with more than one pattern-marker group; git show with a , ; clause or a selector word naming anything but the read revision
    if (id === 'git_grep') { const M = '(?:for|with|to|word|words|text|string|pattern|phrase|słowo|slowo|fraz\\w*)'; const groups = t.match(new RegExp(`\\b${M}(?:\\s+(?:the|a|an|${M}))*\\b`, 'gi')) || []; if (groups.length > 1) rest.push(groups[1]); }
    if (id === 'git_show') { if (/[,;]/.test(t)) rest.push(';'); for (const m of t.matchAll(/\b(?:tag|branch|ref|revision|rewizj\w*|gałęź|galez)(?:\s*[:=\-–—.!?)(]+\s*|\s+)(?:named\s+|called\s+)?(["']?)([^\s"']+)\1/gi)) if (String(slots.rev ?? slots.revision ?? '').toLowerCase() !== m[2].toLowerCase()) rest.push(m[2]); }
    // r23: "in the tracked file X" names a file restriction git grep -n does not render
    if (id === 'git_grep') for (const m of t.matchAll(/\b(?:file|files|plik|pliku|plikach)\s*[:=,\-–—]*\s+(?:named\s+|called\s+)?(["']?)([^\s"']+)\1/gi)) if (!/^(?:for|with|to|and|or|containing|that|which|in|matching|word|text|pattern|za|na|z|w|zawierając\w*|zawierajac\w*)$/i.test(m[2])) rest.push(m[2]);
    // r25: structural — git grep -n renders no file restriction: a singular file word, or files followed by punctuation, is always withheld
    if ((id === 'git_grep' || id === 'git_ls_files') && (/\b(?:file|plik|pliku)\b/i.test(t) || /\b(?:files|plikach|plikow|plików)\s*[^\w\s"']+\s*\S/i.test(t))) rest.push('(a file restriction)');
    // r26: structural — any option-looking token (`--`, `-i`, `--cached`) in a git grep request is withheld: only `-n --` is rendered
    if (id === 'git_grep' && /(?:^|\s)-{1,2}(?=\s|$|[^\s\d])/.test(t.replace(/\bgit\s+grep\s+-n\s+--(?=\s)/i, ' '))) rest.push('(an option or pathspec)');
    // r31: pages — a source/folder word naming anything but the rendered path is a directory the command does not express
    if (id === 'wrangler_pages_deploy') for (const m of t.matchAll(/\b(?:from|source|src|directory|dir|folder|katalog\w*|folder\w*|z|ze)\s*[:=]?\s+(?:the\s+|my\s+)?(["']?)([^\s"']+)\1/gi)) if (!/^(?:cloudflare|pages|page|the|my|a|to)$/i.test(m[2]) && String(slots.path ?? '').toLowerCase() !== m[2].toLowerCase()) rest.push(m[2]);
    // r21: for git show, and/or/plus/then always adds another selector (withheld)
    if (id === 'git_show') for (const m of t.matchAll(/\b(?:and|or|plus|then|oraz|lub|albo|i|potem)\s+(\S+)/gi)) rest.push(m[1]);
    // r20: or always starts another pattern; and only continues into show/print/list/display (line numbers); too/also/as well add a pattern
    if (id === 'git_grep') { for (const m of t.matchAll(/\b(?:or|lub|albo)\s+(\S+)/gi)) rest.push(m[1]); for (const m of t.matchAll(/\b(?:and|oraz|i)\s+(?!(?:show|print|list|display|pokaż|pokaz|wypisz)\b)(\S+)/gi)) rest.push(m[1]); if (/\b(?:too|also|as\s+well|też|tez|również|rowniez)\b/i.test(t)) rest.push('too'); }
    if (id === 'git_ls_files' || id === 'git_grep') for (const m of t.matchAll(/\b(?:repo|repository|repozytorium)\s+(?:named\s+|called\s+)?(?=(["']?)([^\s"']+)\1)/gi)) if (!/^(?:and|or|but|for|with|only|too|instead|please|i|oraz)$/i.test(m[2])) rest.push(m[2]);
    if (id === 'git_ls_files') for (const m of t.matchAll(/\b(?:in|inside|within|under|of|at|from|below|for|on|with|w|we|z)\s+(?:(?:the|all|my|a|this|git|repo|repository|repozytorium)\s+)*(?=(["']?)([^\s"']+)\1)/gi)) if (!/^(?:repo|repository|repozytorium|git|this)$/i.test(m[2])) rest.push(m[2]);
    // a place for git grep ("in files", "under src") is a pathspec unless it names the repository itself
    if (id === 'git_grep') for (const m of t.matchAll(/\b(?:in|inside|within|under|on|of|at|across|except|excluding|from|w|we|na|poza|oprócz|oprocz)\s+(?:the\s+|all\s+|my\s+|a\s+)?(?=(["']?)([^\s"']+)\1)/gi)) if (!/^(?:repo|repository|repozytorium|tracked|git|codebase|plikach|sledzonych|śledzonych)$/i.test(m[2])) rest.push(m[2]);
    // r28: structural — clause punctuation outside quotes and the rendered values (`in: files`, `repo: x`) is never explained
    { let u = t.replace(/(["'])[^"']*\1/g, ' '); for (const x of Object.values(slots)) if (x != null && String(x).length) u = u.split(String(x)).join(' '); if (/[:;,=()\[\]{}|&<>]/.test(u) || /[.!?]+\s+\S/.test(u)) rest.push('(punctuation)');
      // r29: a negation or exclusion ("with no description") is never rendered; `no 42` / `no. 42` is a number marker
      if (/\b(?:no|not|without|except|excluding|minus|never|don'?t|bez|nie|oprócz|oprocz|poza)\b(?!\.?\s*#?\d)/i.test(t.replace(/(["'])[^"']*\1/g, ' '))) rest.push('(an exclusion)'); }
    // r32: structural — a second action (and / then / plus / oraz / potem) is never rendered; only "open and closed" issues are one list
    { const u2 = id === 'gh_issue_list' ? t.replace(/\b(?:open|opened|otwarte)\s+(?:and|i|oraz)\s+(?:closed|zamkni\w*)\b/gi, ' ') : t; if (/\b(?:and|then|plus|afterwards|also|too|additionally|as\s+well|after\s+that|oraz|potem|następnie|nastepnie|też|tez|również|rowniez|dodatkowo)\b|(?:^|\s)i(?=\s)/i.test(u2.replace(/(["'])[^"']*\1/g, ' '))) rest.push('(a second action)'); }
    if (rest.length) out.push(`${id === 'git_grep' ? 'pattern' : id === 'git_show' ? 'rev' : 'args'} (not expressed: ${[...new Set(rest)].slice(0, 4).join(' ')})`);
    if (Object.values(slots).some((x) => glued(x)) || /\\["']/.test(t)) out.push('value (unclear where the quoted text ends)');
  }
  if (id === 'wrangler_pages_deploy') {
    // also for a replay ("same for production"): environments, branches, projects, dry runs are never expressed
    if (/\bdry[\s-]*run\b|\bna\s+sucho\b|\bwithout\s+(?:actually\s+)?(?:deploying|publishing|uploading)\b|\b(?:don'?t|do\s+not)\s+actually\b|\b(?:preview|production|prod|staging|stage|main|master|dev|test|branch|project|message|commit)\b|\bga[lł][eę]zi\w*|\bprojekt\w*|--\w/i.test(t)) out.push('args (an environment, branch, project or dry run is not expressed)');
    const pv = slots.path == null ? null : String(slots.path);
    if (pv != null && !t.includes(`"${pv}"`) && !t.includes(`'${pv}'`) && !/^(?:\.|\.\/\S+|\.\.\/\S+|~\/\S+|\/\S+|\S+[\/\\]\S*|[a-z]:\S*|build|dist|public|out|_site|output)$/i.test(pv)) out.push('path (not a directory name)');
  }
  if (id === 'wrangler_pages_deploy' && slots.path != null) {
    let p = String(slots.path).trim().replace(/^(["'])(.*)\1$/, '$2').replace(/\\/g, '/').toLowerCase();
    const drive = /^[a-z]:/.exec(p); const driveRel = drive && !/^[a-z]:\//.test(p);
    if (drive) p = p.slice(2) || '/';
    if (driveRel && p !== '/') p = `./${p}`; // `C:..` is relative to the drive's current directory
    p = p.replace(/^(?:\$home|%userprofile%|\$env:userprofile)(?=\/|$)/, '~');
    const segs = []; let up = 0; const abs = p.startsWith('/'); const home = p.startsWith('~');
    for (const seg of p.replace(/^~/, '').split('/')) { if (!seg || seg === '.') continue; if (seg === '..') { if (segs.length) segs.pop(); else up++; } else segs.push(seg); }
    const sensitive = segs.some((x) => x.startsWith('.')) || ((abs || drive) && (segs.length === 1 || (segs.length === 2 && /^(?:home|users|mnt|media|volumes)$/.test(segs[0]))));
    const unc = /^\/\/[^/]/.test(p) && segs.length <= 2; // \\server\share is a volume root
    if (up > 0 || ((abs || home || drive) && segs.length === 0) || sensitive || unc) out.push('path (a root, home or parent directory is never uploaded as is)');
  }
  if (id === 'gh_issue_list' && /\b(?:but|except|excluding|without|not|no|nie|bez|opr[oó]cz|poza)\b/i.test(t.replace(/(["']?)(?:[\w.-]+\/)+[\w.-]+\1/g, ' '))) out.push('state (an exclusion is not expressed)');
  if (/^(?:gh_issue_view|gh_run_watch|gh_issue_list|git_ls_files)$/.test(id)) {
    // an option the template cannot express (`--exit-status`, `--json`, `--others`, `-- src`) is withheld
    const opts = whTokens(t).filter((w) => /^-/.test(w) && w !== '--repo' && !/^--repo=/.test(w));
    if (opts.length) out.push(`args (not expressed: ${opts.slice(0, 3).join(' ')})`);
    if (id === 'git_ls_files' && /\b(?:untracked|ignored|deleted|modified|others|staged|nieśledzon\w*|niesledzon\w*|usunięt\w*|zmodyfikowan\w*)\b/i.test(t)) out.push('args (a filter git ls-files is not rendered with)');
  }
  if ((id === 'gh_issue_view' || id === 'gh_run_watch') && slots.num != null && command != null && !new RegExp(`(?:^|\\s)${slots.num}(?:\\s|$)`).test(command)) out.push('num (the number named is not a valid id)');
  if ((id === 'gh_issue_view' || id === 'gh_run_watch') && slots.num == null && /(?:\b(?:run|runs|issue|issues|watch|view)\s+#?|#)\d+/i.test(t)) out.push('num (the number named is not a valid id)');
  if (id === 'gh_issue_view' || id === 'gh_run_watch') {
    if (slots.num != null) {
      const at = t.search(new RegExp(String.raw`(?:^|[^\d])${slots.num}(?!\d)`));
      const after = at >= 0 ? t.slice(t.indexOf(String(slots.num), at) + String(slots.num).length) : '';
      if (UNIT_AFTER.test(after)) out.push('num (the number is a count or an age, not an id)');
    }
  }
  return [...new Set(out)];
}
