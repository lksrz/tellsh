Reading additional input from stdin...
OpenAI Codex v0.160.0
--------
workdir: /workspace/tellsh
model: gpt-6-astra
provider: openai
approval: never
sandbox: read-only
reasoning effort: high
reasoning summaries: none
session id: 01a12a90-5b03-71c0-ae38-bb19aed9dbd2
--------
user
Final review of tellsh v0.3 (git diff 0d87457..HEAD). Accepted design: uncertain args -> placeholder; risk allowlist. Report only blocker/major bugs (unsafe command marked safe, wrong target silently). Read-only. End with exactly one line 'VERDICT: APPROVE' or 'VERDICT: REQUEST_CHANGES'.
codex
I’ll review the diff and relevant execution paths for commands incorrectly marked safe or silently aimed at the wrong target, using the accepted placeholder and risk-allowlist design.
exec
/bin/bash -lc "pwd; rg --files -g AGENTS.md -g '"'!node_modules'"' -g '"'!vendor'"'; git status --short; git diff --stat 0d87457..HEAD" in /workspace/tellsh
 succeeded in 49ms:
/workspace/tellsh
?? review/final3-claude.md
?? review/final3-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   646 +-
 HYBRID.md                                    |   617 +
 README.md                                    |   269 +-
 bin/tellsh.js                                |     3 +
 data/blind/compose.jsonl                     |    58 +
 data/blind/e2e.jsonl                         |   207 +
 data/blind/history.jsonl                     |    79 +
 data/blind/intents.jsonl                     |   844 ++
 data/blind/ood.jsonl                         |    64 +
 data/candidates/ood_new.jsonl                |   464 +
 data/candidates/paraA.jsonl                  |  1329 ++
 data/candidates/paraB.jsonl                  |  1220 ++
 data/eval_baseline_v0.2.json                 |    56 +
 data/eval_v04/devtools.jsonl                 |   424 +
 data/history/eval.jsonl                      |     7 +-
 data/hybrid/blind/blind_en.jsonl             |   331 +
 data/hybrid/blind/blind_ood.jsonl            |    40 +
 data/hybrid/blind/blind_pl.jsonl             |   310 +
 data/intents/g06_teacher.jsonl               |  1911 +++
 data/intents/g07_hardneg.jsonl               |   463 +
 data/intents/g08_devtools.jsonl              |  1625 +++
 data/ood_teacher.jsonl                       |   380 +
 data/teacher/decisions.jsonl                 |   152 +-
 data/teacher/hardneg_boost.jsonl             |     3 +
 data/teacher/hardneg_rejected.jsonl          |   106 +
 data/teacher/hardneg_summary.json            |    29 +
 data/teacher/label_rejected.jsonl            |    39 +
 data/teacher/label_summary.json              |    27 +
 data/teacher/ledger.json                     |    33 +
 data/teacher/ood_rejected.jsonl              |    64 +
 data/teacher/review.jsonl                    |   152 +-
 data/teacher/verify_summary.json             |    91 +
 hybrid/package/tellsh-model-enc/README.md    |     6 +
 hybrid/package/tellsh-model-enc/package.json |    10 +
 hybrid/results/bench.json                    |   127 +
 hybrid/results/enc_export_report.json        |    20 +
 hybrid/results/policy.json                   |   125 +
 hybrid/results/policy_ft.json                |    67 +
 hybrid/results/prune_report.json             |    10 +
 hybrid/results/quant.json                    |     8 +
 hybrid/results/results.json                  |  2905 +++++
 hybrid/results/results_ft.json               |  1630 +++
 hybrid/results/sizes.json                    |    21 +
 hybrid/results/v04_after.json                |  2996 +++++
 hybrid/results/v04_after_ft.json             |  2945 +++++
 hybrid/results/v04_before.json               |  2996 +++++
 hybrid/results/v04_before_ft.json            |  2913 +++++
 hybrid/results/v04_bench_after.json          |    77 +
 hybrid/results/v04_bench_after_real.json     |    77 +
 hybrid/results/v04_bench_before.json         |    77 +
 hybrid/results/v04_bench_before_real.json    |    77 +
 hybrid/results/v04_enc_export_report.json    |    20 +
 hybrid/results/v04_policy.json               |    70 +
 hybrid/results/v04_policy_ft.json            |   125 +
 hybrid/results/v04_real_stats.json           |   137 +
 hybrid/results/zeroshot.jsonl                |     7 +
 model/compose_explained.json                 |     2 +-
 model/model.bin                              |   Bin 2707136 -> 2951156 bytes
 package.json                                 |    20 +-
 review/.f10done                              |     0
 review/.f11done                              |     0
 review/.f12done                              |     0
 review/.f13done                              |     0
 review/.f14done                              |     0
 review/.f15done                              |     0
 review/.f16done                              |     0
 review/.f17done                              |     0
 review/.f18done                              |     0
 review/.f19done                              |     0
 review/.f1done                               |     0
 review/.f20done                              |     0
 review/.f21done                              |     0
 review/.f22done                              |     0
 review/.f4bdone                              |     0
 review/.f5done                               |     0
 review/.f8done                               |     0
 review/.f9done                               |     0
 review/.h1done                               |     0
 review/.hdone                                |     0
 review/.r1done                               |     0
 review/.r2done                               |     0
 review/.r3done                               |     0
 review/.r4done                               |     0
 review/.r5done                               |     0
 review/.r6done                               |     0
 review/STATUS                                |     2 +
 review/close-fix.md                          |    37 +
 review/close2-fix.md                         |    23 +
 review/close3-fix.md                         |    34 +
 review/final-claude.md                       |    46 +
 review/final-codex.md                        |  6239 ++++++++++
 review/final2-claude.md                      |    35 +
 review/final2-codex.md                       | 16282 +++++++++++++++++++++++++
 review/fix1-log.md                           |    12 +
 review/fix10-log.md                          |    34 +
 review/fix11-log.md                          |    25 +
 review/fix12-log.md                          |    31 +
 review/fix13-log.md                          |    25 +
 review/fix14-log.md                          |    28 +
 review/fix15-log.md                          |    30 +
 review/fix16-log.md                          |    25 +
 review/fix17-log.md                          |    17 +
 review/fix18-log.md                          |    29 +
 review/fix19-log.md                          |    27 +
 review/fix2-log.md                           |    17 +
 review/fix20-log.md                          |    27 +
 review/fix21-log.md                          |    26 +
 review/fix22-log.md                          |    26 +
 review/fix3-log.md                           |    50 +
 review/fix4-log.md                           |    30 +
 review/fix4b-log.md                          |    55 +
 review/fix5-log.md                           |    58 +
 review/fix7-log.md                           |    41 +
 review/fix8-log.md                           |    48 +
 review/fix9-log.md                           |    29 +
 review/hybrid-log.md                         |    41 +
 review/r1-claude.md                          |   115 +
 review/r1-codex.md                           |  9854 +++++++++++++++
 review/r10-claude.md                         |    49 +
 review/r10-codex.md                          |  8707 +++++++++++++
 review/r11-claude.md                         |    53 +
 review/r11-codex.md                          |  9592 +++++++++++++++
 review/r12-claude.md                         |    37 +
 review/r12-codex.md                          | 10887 +++++++++++++++++
 review/r13-claude.md                         |    37 +
 review/r13-codex.md                          |  7148 +++++++++++
 review/r14-claude.md                         |    34 +
 review/r14-codex.md                          |  9586 +++++++++++++++
 review/r15-claude.md                         |    35 +
 review/r15-codex.md                          |  9479 ++++++++++++++
 review/r16-claude.md                         |    39 +
 review/r16-codex.md                          |  9975 +++++++++++++++
 review/r17-claude.md                         |    35 +
 review/r17-codex.md                          | 11097 +++++++++++++++++
 review/r18-claude.md                         |    48 +
 review/r18-codex.md                          |  7397 +++++++++++
 review/r19-claude.md                         |    45 +
 review/r19-codex.md                          |  8667 +++++++++++++
 review/r2-claude.md                          |    84 +
 review/r2-codex.md                           |  8616 +++++++++++++
 review/r20-claude.md                         |    64 +
 review/r20-codex.md                          | 10016 +++++++++++++++
 review/r21-claude.md                         |    55 +
 review/r21-codex.md                          |  8028 ++++++++++++
 review/r22-claude.md                         |    72 +
 review/r22-codex.md                          |  9835 +++++++++++++++
 review/r23-claude.md                         |    48 +
 review/r23-codex.md                          | 11782 ++++++++++++++++++
 review/r3-claude.md                          |    63 +
 review/r3-codex.md                           |  8281 +++++++++++++
 review/r4-claude.md                          |    57 +
 review/r4-codex.md                           |  9505 +++++++++++++++
 review/r5-claude.md                          |    46 +
 review/r5-codex.md                           |  9090 ++++++++++++++
 review/r6-claude.md                          |    60 +
 review/r6-codex.md                           | 10443 ++++++++++++++++
 review/r7-claude.md                          |    48 +
 review/r7-codex.md                           | 10037 +++++++++++++++
 review/r8-claude.md                          |    54 +
 review/r8-codex.md                           |  9340 ++++++++++++++
 review/r9-claude.md                          |    53 +
 review/r9-codex.md                           | 10346 ++++++++++++++++
 scripts/bench.js                             |     2 +-
 scripts/build_allowlist.js                   |    18 +
 scripts/build_triggers.js                    |     8 +-
 scripts/check_variants.js                    |     5 +-
 scripts/compare.js                           |    59 +
 scripts/eval.js                              |   316 +-
 scripts/gen_data.js                          |    62 +-
 scripts/hybrid/bench_hybrid.js               |    74 +
 scripts/hybrid/cold_query.js                 |    12 +
 scripts/hybrid/dump_cascade.js               |    37 +
 scripts/hybrid/eval_hybrid.js                |   351 +
 scripts/hybrid/export_data.js                |   144 +
 scripts/hybrid/export_encoder.py             |   110 +
 scripts/hybrid/fetch_model.js                |    56 +
 scripts/hybrid/lm_rerank.py                  |   267 +
 scripts/hybrid/prune_vocab.py                |   124 +
 scripts/hybrid/report_hybrid.js              |   159 +
 scripts/hybrid/sets.js                       |    49 +
 scripts/hybrid/train_a_dev.sh                |    34 +
 scripts/hybrid/train_encoder.py              |   167 +
 scripts/hybrid/train_lm_gpu.py               |   106 +
 scripts/lib/allowlist_table.js               |    61 +
 scripts/lib/cmdnorm.js                       |    10 +-
 scripts/lib/confusable.js                    |    66 +
 scripts/lib/heldout.js                       |    79 +
 scripts/lib/jev.js                           |   105 +
 scripts/lib/silver.js                        |    55 +-
 scripts/real/group.js                        |    28 +
 scripts/real/group_leak.js                   |    22 +
 scripts/real/prepare_real.js                 |   160 +
 scripts/real/real_rows.js                    |    25 +
 scripts/real/report_v04.js                   |   161 +
 scripts/report.js                            |     2 +-
 scripts/teacher.js                           |   475 +-
 scripts/tldr_ingest.py                       |    12 +-
 scripts/train.py                             |    34 +-
 src/allowlist-data.js                        |   387 +
 src/catalog.js                               |    42 +-
 src/cli.js                                   |    51 +-
 src/compose.js                               |   186 +-
 src/danger.js                                |   764 +-
 src/fill.js                                  |   652 +-
 src/history.js                               |  1026 +-
 src/model.js                                 |    22 +-
 src/pipeline.js                              |   497 +-
 src/render.js                                |    96 +-
 src/rerank/encoder.js                        |   152 +
 src/rerank/hybrid.js                         |   112 +
 src/rerank/tokenizer.js                      |    92 +
 src/shellwords.js                            |   101 +-
 src/slots.js                                 |   119 +-
 src/tagger.js                                |    55 +-
 src/tools.js                                 |    12 +-
 src/variants.js                              |    41 +-
 test/allowlist.test.js                       |     9 +
 test/compose.test.js                         |    50 +
 test/danger.test.js                          |     9 +-
 test/devtools.test.js                        |    98 +
 test/fixtures/parity.json                    |     2 +-
 test/hybrid.test.js                          |    46 +
 test/pipeline.test.js                        |     8 +-
 test/regressions.test.js                     |    18 +-
 test/regressions10.test.js                   |   145 +
 test/regressions11.test.js                   |    92 +
 test/regressions12.test.js                   |    78 +
 test/regressions13.test.js                   |    70 +
 test/regressions14.test.js                   |    85 +
 test/regressions15.test.js                   |    81 +
 test/regressions16.test.js                   |    58 +
 test/regressions17.test.js                   |    70 +
 test/regressions18.test.js                   |    61 +
 test/regressions19.test.js                   |   109 +
 test/regressions2.test.js                    |   326 +
 test/regressions20.test.js                   |   117 +
 test/regressions21.test.js                   |    70 +
 test/regressions22.test.js                   |    98 +
 test/regressions23.test.js                   |   101 +
 test/regressions24.test.js                   |   121 +
 test/regressions25.test.js                   |   164 +
 test/regressions26.test.js                   |    77 +
 test/regressions27.test.js                   |   167 +
 test/regressions3-history.test.js            |    87 +
 test/regressions3-render.test.js             |   151 +
 test/regressions3.test.js                    |    46 +
 test/regressions4.test.js                    |   202 +
 test/regressions5.test.js                    |   148 +
 test/regressions6.test.js                    |   172 +
 test/regressions7.test.js                    |   146 +
 test/regressions8.test.js                    |   202 +
 test/regressions9.test.js                    |   200 +
 test/shells.test.js                          |     8 +-
 254 files changed, 282610 insertions(+), 834 deletions(-)

exec
/bin/bash -lc 'cat src/pipeline.js' in /workspace/tellsh
 succeeded in 0ms:
// End-to-end: request -> command for the target shell.
//
//   env (shell/os/coreutils) + history ctx ──► classifier context tokens (shell=, os=, ctx_*)
//   history rules ("same for X", "delete it") ─► may fix intent / fill slots deterministically
//   cascade: tool top-3 ─► intent (p(tool)·p(intent|tool))
//   slots: BIO tagger (tool-conditioned) ─► validated values; regex extraction fills/overrides failures
//   render for shell/os ─► danger check
//   low confidence (or unexplained modifiers) ─► second pass: experimental flag composer
import { getModel } from './model.js';
import { cascade } from './cascade.js';
import { tag, exFromSpans } from './tagger.js';
import { extractSlots, pickArg, isOptionWord, foldKeepLength } from './slots.js';
import { resolveSlots, buildCommand, finalizeSlots, RAW_OK } from './fill.js';
import { BY_ID } from './catalog.js';
import { FAMILY_OF, NONE } from './tools.js';
import { detectEnv, envFeatures } from './env.js';
import { buildContext, resolveReference, hasPronoun, hasLocative, cwdFlags, sameBut, entityForSlot, isAmbiguous } from './history.js';
import { AMB } from './shellwords.js';
import { compose } from './compose.js';
import { assessCommand, maxRisk } from './danger.js';
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
  args: () => false, pr: (v) => RAW_OK.pr(v), repo: (v) => RAW_OK.repo(v), wenv: (v) => RAW_OK.wenv(v), dryrun: (v) => RAW_OK.dryrun(v), delbranch: (v) => RAW_OK.delbranch(v), npmverb: (v) => RAW_OK.npmverb(v),
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
  if (isAmbiguous(v)) return false;
  if (RAW_OK[k]) return RAW_OK[k](v);
  if (VALID_SLOT[k]) return VALID_SLOT[k](String(v));
  return String(v).length < 300 && !/\0/.test(String(v));
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
  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr', 'repo', 'wenv', 'num', 'args']) {
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
function composeInput(text, model, tool, unclear = []) {
  const ex = extractSlots(text);
  const t = tag(text, tool, model);
  const exT = exFromSpans(text, t.spans);
  const merged = { ...ex };
  if (exT.paths.length) merged.paths = exT.paths;
  // paths followed by sentence punctuation (`/tmp/data!`): fine for a read-only command, but a composed
  // command that changes something is never aimed at them (see blocksAmbiguous)
  // the same for a path that is the output of a command (`on \`pwd\``, `$(pwd)`): the catalog withholds it too
  // and a quoted argument that may be words of the request (joinArgs)
  const amb = [...(merged.paths || []).filter((p) => trailingPunctAfter(text, p) || insideSubstitution(text, String(p))), ...unclear];
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
const blocksAmbiguous = (comp, amb) => !!comp && !comp.invalid && amb.some((p) => comp.command.includes(p)) &&
  (WRITING_TOOLS.has(comp.tool) || assessCommand(comp.command, 'safe').risk !== 'safe');

/**
 * Pure function used by the CLI, eval and tests.
 * opts: { shell, os, env, history: string[] (commands, oldest first), cwd, threshold, top, compose: 'auto'|'force'|'off',
 *         slotMode: 'merge'|'tagger'|'regex', model, rerank, rerankTop (candidates the rerank hook sees; default top) }
 */
export function suggest(query, opts = {}) {
  return replayFloor(suggestOnce(query, opts));
}

// the trust rule (danger.js): a command resolved from history (a reference, "same but …", a value from an earlier
// command) is a replay, not a fresh render of what the request says: at least high, never auto-run
const REPLAY = 'resolved from history (a replay of an earlier command, not a fresh catalog render); needs an explicit yes';
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
      const r = suggest(q, { model, env, threshold: thr, compose: 'off', unclearArgs });
      if (!r.understood || !r.intent || r.method !== 'catalog') return null;
      const slots = { ...(r.slots || {}) };
      for (const k of r.missing || []) slots[k] = AMB + `<${k}>`;
      return { intent: r.intent, slots };
    };
    const kind = opts.historyKind || opts.history.kind || (env.shell === 'powershell' ? 'pwsh' : 'posix');
    ctx = buildContext(opts.history, { classify: quick, cwd: opts.cwd, kind, query });
  }
  const ctxFeats = ctx ? ctx.features : (opts.cwd ? cwdFlags(opts.cwd).map((c) => 'ctx_cwd=' + c) : []);
  const extras = [...envFeatures(env), ...ctxFeats];
  const ref = ctx ? resolveReference(query, ctx) : null;
  const context = ctx ? { used: true, commands: ctx.n, rule: ref?.rule || null, note: ref?.note || null } : { used: false };

  const base = { query, shell: env.shell, os: env.os, coreutils: env.coreutils, threshold: thr, context };

  // ---- rule: "same for X" reuses the previous intent with one slot replaced ----
  if (ref?.rule === 'same-for') {
    const slots = validHistorySlots(ref.slots);
    // a value that fails validation (a 300-character path, ...) is a placeholder, never `find .`
    const blank = invalidHistorySlots(ref.slots);
    // the new path ends in sentence punctuation (`same for /tmp/data!`): placeholder, as for any request
    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null && BY_ID[ref.intent].risk !== 'safe' && trailingPunctAfter(query, slots[ref.changed])) {
      blank.push(ref.changed);
      delete slots[ref.changed];
    }
    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank, keepOptional: blank });
    const res = { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
    const punct = blank.filter((k) => !invalidHistorySlots(ref.slots).includes(k));
    if (punct.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${punct.join(', ')}); quote the path`];
    if (punct.length < blank.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: it is not a valid value (${blank.filter((k) => !punct.includes(k)).join(', ')})`];
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
  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
  const ambiguousPaths = [];
  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
  const blank = new Set(r.withheld || []);
  // withheld operands whose optional part keeps its placeholder: an invalid operand, a history value that is ambiguous or
  // invalid (`gh pr merge <PR>` for "same but merge" after `tellsh merge pr nightly`, never the current branch's pull request)
  const keep = new Set(r.invalidOperands);
  if (BY_ID[intent].risk !== 'safe') {
    for (const k of Object.keys(slots)) {
      if (PATH_SLOT_NAMES.has(k) && r.sources[k] !== 'history' && trailingPunctAfter(query, slots[k])) { ambiguousPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
    }
    if (ambiguousPaths.length) finalizeSlots(BY_ID[intent], slots);
  }
  // a changing command whose path is the output of a command (`in \`pwd\``, `$(pwd)`), or a request that names more
  // explicit paths than the command takes (`in /tmp/x and /tmp/y`: only one would be used): placeholder + warning
  const unclearPaths = [];
  if (BY_ID[intent].risk !== 'safe') {
    const explicit = explicitPaths(query);
    const nPathSlots = [...PATH_SLOT_NAMES].filter((k) => usesSlot(BY_ID[intent], k)).length;
    const dropped = explicit.filter((p) => !Object.values(slots).some((v) => String(v) === p));
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
    finalizeSlots(BY_ID[intent], slots);
    method = 'history-rule';
  }
  // "remove the logs there", "delete notes.txt there": a place reference never names the object of a changing
  // command (`rm -r DIR`, `mv DIR …`); only the location a search-and-change runs in (`find DIR … -delete`). Any path
  // the request names is relative to the wrong directory, so every path slot is withheld (with or without history).
  if (locative && !refDst && !bothRefs && BY_ID[intent].risk !== 'safe' && FAMILY_OF[intent] !== 'find' && [...PATH_SLOT_NAMES].some((k) => usesSlot(BY_ID[intent], k))) {
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
  if (ctx && b.missing.length && ref?.rule !== 'refused' && BY_ID[intent].risk === 'safe' && b.risk === 'safe') {
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
  if (ambiguousText.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: unclear where the quoted text ends (\\" may be an escaped quote) (${ambiguousText.join(', ')})`];
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
    const ci = composeInput(query, model, fam, opts.unclearArgs);
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
    // a value with a line break is never composed into a command (the catalog rejects it as a path)
    if (comp && !comp.invalid && comp.command !== b.command && !/[\r\n]/.test(comp.command)) {
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

exec
/bin/bash -lc 'cat src/danger.js' in /workspace/tellsh
exec
/bin/bash -lc 'cat test/regressions27.test.js; cat test/regressions26.test.js; cat test/regressions25.test.js; cat src/allowlist-data.js' in /workspace/tellsh
 succeeded in 0ms:
// Regression tests for the v0.3 final2 review (review/final2-claude.md, review/final2-codex.md) and the structural rules
// that replace further parser patches:
//  (1) trust rule: a command is safe ONLY when it is tellsh's own render of a risk=safe catalog template with plain slot
//      values; edited, composed, history-replayed and unknown commands are at least high (--yes never runs them). The
//      parser only raises risk: it still reads $'…' quoting and sed e/w so a destructive payload stays critical.
//  (2) contested selectors: an alternative or a negation next to a selector (or / albo / lub / not / nie / oprócz /
//      except …) or two candidate values for one slot give a placeholder for that slot, never one of the candidates.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { buildCommand } from '../src/fill.js';
import { INTENTS, BY_ID } from '../src/catalog.js';
import { checkDanger, assessCommand, plainSlotValue, UNTRUSTED } from '../src/danger.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, opts = {}) => suggest(q, { env: BASH, ...opts });

// every command the two final2 reviews reported as safe
const FINAL2_DANGER = [
  // final2-claude blocker: $'…' hid the command after it
  "echo $'\\''; rm -rf ~ #'",
  "echo $'\\''; npx evil #'",
  "ls $'\\''`npx evil`'",
  // final2-claude major: find -exec runs any program
  'find . -exec ./evil {} +',
  'find . -exec bash ./evil.sh \\;',
  'find . -exec npx evil \\;',
  // final2-claude major: . and source run any file
  '. /tmp/x',
  'source ./evil.sh',
  'source ~/.bashrc',
  // final2-claude lesser: GNU sed e
  "sed 's/a/b/e' f",
  "sed -n '1e cmd' f",
  // final2-codex major
  "sed '1e rm -r /tmp/valuable' input.txt",
  'diskutil eraseDisk APFS New disk2',
  'source ./deploy.sh',
];

test('final2: every reported command is high risk (never safe) and needs an explicit yes', () => {
  for (const c of FINAL2_DANGER) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', `${c}: ${d.warnings.join('; ')}`);
  }
});

test("final2 blocker: $'…' is parsed as bash does, so the command after it is seen (rm -rf ~ stays critical)", () => {
  const d = assessCommand("echo $'\\''; rm -rf ~ #'");
  assert.equal(d.risk, 'high');
  assert.equal(d.critical, true, d.warnings.join('; '));
  assert.ok(assessCommand("echo $'\\''; npx evil #'").warnings.some((m) => /npx evil|unknown subcommand/.test(m)));
  assert.ok(assessCommand("ls $'\\''`npx evil`'").warnings.some((m) => /substitution/.test(m)));
  // a closed $'…' with no escape is still one word
  assert.equal(assessCommand("echo $'a b'").critical, false);
});

test('final2 lesser: the parser flags sed scripts that run a command or write a file', () => {
  for (const c of ["sed 's/a/b/e' f", "sed -n '1e cmd' f", "sed 'w out' f", "sed -e 's/a/b/w x' f", 'sed -f script.sed f']) {
    assert.ok(assessCommand(c).warnings.some((m) => /^sed /.test(m)), c);
  }
  for (const c of ["sed -n '120,180p' f", "sed 's/e/w/g' f", "sed '/we/d' f", "readlink /etc/localtime | sed 's#.*/zoneinfo/##'"]) {
    assert.ok(!assessCommand(c).warnings.some((m) => /^sed /.test(m)), c);
  }
});

test('trust rule: any command that is not a catalog render is at least high, however harmless it looks', () => {
  for (const c of ['ls -la', 'df -h', 'git status', 'diskutil list', 'echo hi']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', c);
    assert.ok(d.warnings.includes(UNTRUSTED), c);
    // the same text vouched for as tellsh's own render is judged by the parser alone
    assert.notEqual(checkDanger(c, 'safe', { rendered: true }).risk, 'high', c);
  }
  // a catalog render does not lower a risk the parser finds
  assert.equal(checkDanger('rm -rf /', 'safe', { rendered: true }).critical, true);
});

test('trust rule: a safe catalog render is safe only with plain slot values', () => {
  assert.equal(run('show free disk space').risk, 'safe');
  assert.equal(buildCommand('count_lines', '', { env: BASH, resolved: { file: 'notes.txt' } }).risk, 'safe');
  for (const file of ['a;b.txt', "it's.txt", 'a$b', 'a`b`', 'a|b', 'a>b', 'a\nb', 'x’y']) {
    const r = buildCommand('count_lines', '', { env: BASH, resolved: { file } });
    assert.equal(r.risk, 'high', JSON.stringify(file));
    assert.ok(r.warnings.includes(UNTRUSTED), JSON.stringify(file));
  }
  // a path starting with - is rendered ./-x (plain); a pattern starting with - is not
  assert.equal(buildCommand('count_lines', '', { env: BASH, resolved: { file: '-x' } }).risk, 'safe');
  assert.equal(buildCommand('grep_text', '', { env: BASH, resolved: { pattern: '-e' } }).risk, 'high');
  // a program slot: never a builtin that runs a file / a string, never a path
  for (const cmd of ['source', '.', 'eval', './evil', '/tmp/evil']) {
    assert.equal(buildCommand('tool_version', '', { env: BASH, resolved: { cmd } }).risk, 'high', cmd);
  }
  assert.equal(buildCommand('tool_version', '', { env: BASH, resolved: { cmd: 'node' } }).risk, 'safe');
  assert.equal(plainSlotValue('name', 'x -exec rm {} +'), false);
  assert.equal(plainSlotValue('age', '-mtime -1', { dashOk: true }), true);
});

test('trust rule: only risk=safe catalog intents ever render safe, in every shell', () => {
  const envs = [BASH, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'fish', os: 'linux', coreutils: 'gnu' },
    { shell: 'powershell', os: 'win32' }, { shell: 'cmd', os: 'win32' }];
  for (const it of INTENTS) {
    for (const env of envs) {
      let r;
      try { r = buildCommand(it.id, '', { env, resolved: {} }); } catch { continue; }
      if (r.command && r.risk === 'safe') assert.equal(BY_ID[it.id].risk, 'safe', `${it.id} ${env.shell}`);
    }
  }
});

test('trust rule: history replays and composed commands are at least high', () => {
  const h = run('count lines in it', { history: ['cat notes.txt'], compose: 'off' });
  assert.equal(h.method, 'history-rule');
  assert.equal(h.risk, 'high');
  const same = run('same for /var', { history: ['du -sh /home'], compose: 'off' });
  assert.equal(same.command, 'du -sh /var');
  assert.equal(same.risk, 'high');
  // the same request without history is a fresh catalog render: safe
  assert.equal(run('show the size of /var').risk, 'safe');
  const c = run('list files sorted by size with human readable sizes in reverse order', { compose: 'force' });
  assert.equal(c.method, 'composed');
  assert.equal(c.risk, 'high');
});

test('final2-codex: competing selectors give a placeholder, never one of the candidates', () => {
  for (const [q, cmd, missing] of [
    ['merge pr 4 or 44', 'gh pr merge <PR>', ['pr']],
    ['deploy worker --env prod --env prodprod', 'npx wrangler deploy --env <WENV>', ['wenv']],
    ['merge pr 42 but not in repo acme/app', 'gh pr merge 42 --repo <REPO>', ['repo']],
  ]) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.deepEqual(r.missing, missing, q);
  }
});

test('contested selectors: alternatives / negations (EN, PL) and two candidates for one slot', () => {
  for (const [q, cmd] of [
    ['zmerguj pr 42 albo 43', 'gh pr merge <PR>'],
    ['merge pr 42, not 43', 'gh pr merge <PR>'],
    ['deploy worker to prod, not staging', 'npx wrangler deploy --env <WENV>'],
    ['wdróż workera na produkcję, nie na staging', 'npx wrangler deploy --env <WENV>'],
    ['deploy worker to staging and production', 'npx wrangler deploy --env <WENV>'],
    ['install axios or lodash with npm', 'npm install <PKG>'],
    ['view run 8080808, not 123', 'gh run view <NUM>'],
    // the alternative is about the repository: the pull request stays
    ['merge pr 42 --repo acme/app or --repo other/repo', 'gh pr merge 42 --repo <REPO>'],
  ]) assert.equal(run(q).command, cmd, q);
  // no alternative / negation next to a selector: unchanged
  for (const [q, cmd] of [
    ['merge pr 42', 'gh pr merge 42'],
    ['npm install axios', 'npm install axios'],
    ['deploy worker to production', 'npx wrangler deploy --env production'],
    ['deploy worker to prod without a dry run', 'npx wrangler deploy --env prod'],
    ['co poszło nie tak w runie pipeline 8080808', 'gh run view 8080808'],
    ['why is run 8080808 not passing', 'gh run view 8080808'],
  ]) assert.equal(run(q).command, cmd, q);
});

test('a negated branch delete is no --delete-branch; a withheld run number is a placeholder, never dropped', () => {
  for (const q of ["merge pr 42 and don't delete the branch", 'zmerguj pr 42 i nie usuwaj brancha', 'merge pr 42 without deleting the branch']) {
    assert.equal(run(q).command, 'gh pr merge 42', q);
  }
  assert.equal(run('merge pr 42 and delete the branch').command, 'gh pr merge 42 --delete-branch');
  // was `gh run view` (the withheld `?` dropped the optional run number)
  assert.equal(run('view run 8080808 2').command, 'gh run view <NUM>');
});
// Regression tests for the v0.3 final review (review/final-claude.md, review/final-codex.md):
//  (1) a command substitution `$(…)` / `` `…` `` anywhere outside '…' (also inside "…") and a process substitution
//      `<(…)` / `>(…)` are high risk: the allowlist cannot see the command they run
//  (2) only allowlisted programs are safe: an unknown executable (`7z`, a dot-file, a path) is high, with no exemption
//      for words that look like a piece of a PowerShell expression
//  (3) an explicit wrangler `--env` keeps the other words nothing explains as `<ARGS>`, never drops them
//  (4) competing repositories for gh (two `--repo`, a URL of another repository, "a/b or c/d") are withheld (`<REPO>`)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { checkDanger, allowlistProblems } from '../src/danger.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const PWSH = { shell: 'pwsh', os: 'windows' };
const run = (q, env = BASH) => suggest(q, { env });

test('major: command and process substitutions are high risk, also inside double quotes', () => {
  for (const c of ['ls "$(rm -rf ~)"', 'ls "$(npx evil)"', 'ls "$(curl x -o ~/.bashrc)"', 'ls "`rm -rf ~`"', 'ls `npx evil`',
    'echo "$(unknown-program)"', 'echo "a $(id) b"', 'cat <(npx evil)', 'ls >(tee x)', 'ls "x"$(whoami)', 'echo $(( $(id -u) + 1 ))']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', `${c}: ${d.warnings.join('; ')}`);
    assert.ok(d.warnings.some((m) => /substitution; not on the allowlist/.test(m)), `${c}: ${d.warnings.join('; ')}`);
  }
  // single-quoted text and arithmetic expansion are not substitutions
  for (const c of ["ls '$(rm -rf ~)'", "du -sh '`rm -rf ~`'", "grep -r -- '<(x)' src"]) assert.deepEqual(allowlistProblems(c), [], c);
  assert.ok(!allowlistProblems('echo $((5 + 4))').some((m) => /substitution/.test(m)));
});

test('major: an unknown executable is high risk (no expression-fragment exemption, a path is not the program)', () => {
  for (const c of ['7z x a.7z -o/tmp', '.hidden --erase', './ls', '/tmp/x/ls -la', '~/bin/ls', 'C:\\t\\ls.exe', '.\\tool.exe /q', '1password',
    '[evil]', '@evil', ',evil', '%evil%', '-evil', '*', '{evil}']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', `${c}: ${d.warnings.join('; ')}`);
  }
  // the catalog's PowerShell expressions are still read as written (they are in the allowlist)
  for (const q of ['how many files are here', 'show free memory', 'cpu cores', 'base64 encode hello']) {
    const r = run(q, PWSH);
    assert.deepEqual(allowlistProblems(r.command), [], `${q}: ${r.command}`);
  }
});

test('major: an explicit --env keeps the unexplained deploy arguments as <ARGS>', () => {
  for (const env of [BASH, PWSH]) {
    const r = run('deploy worker --env staging --config other.toml', env);
    assert.equal(r.command, 'npx wrangler deploy --env staging <ARGS>', `${env.shell}: ${r.command}`);
    assert.deepEqual(r.missing, ['args']);
  }
  // nothing unexplained: the explicit environment alone
  for (const [q, cmd] of [['deploy worker --env staging', 'npx wrangler deploy --env staging'],
    ['deploy worker --env staging --dry-run', 'npx wrangler deploy --dry-run --env staging']]) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.deepEqual(r.missing, [], q);
  }
});

test('major: competing repositories are withheld, also beside an explicit pull request', () => {
  for (const [q, cmd] of [
    ['merge pr 42 --repo acme/app or --repo other/repo', 'gh pr merge 42 --repo <REPO>'],
    ['merge pr 42 --repo acme/app --repo other/repo', 'gh pr merge 42 --repo <REPO>'],
    ['merge pr 42 in acme/app or other/repo', 'gh pr merge 42 --repo <REPO>'],
    ['merge pr acme/app#42 --repo other/repo', 'gh pr merge 42 --repo <REPO>'],
    ['merge https://github.com/acme/app/pull/42 --repo other/repo', 'gh pr merge https://github.com/acme/app/pull/42 --repo <REPO>'],
  ]) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.deepEqual(r.missing, ['repo'], q);
  }
  // one repository, however often it is named: kept
  for (const [q, cmd] of [['merge pr 42 --repo acme/app', 'gh pr merge 42 --repo acme/app'],
    ['merge https://github.com/acme/app/pull/42 --repo acme/app', 'gh pr merge https://github.com/acme/app/pull/42 --repo acme/app'],
    ['merge pr acme/app#42', 'gh pr merge 42 --repo acme/app']]) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.deepEqual(r.missing, [], q);
  }
});
// Regression tests for round 24 (v0.3 close): the round-23 findings (review/r23-codex.md, review/r23-claude.md), fixed by
// two design rules instead of more special cases.
//  (1) gh / wrangler selector rule: a request is read against a closed vocabulary; a word that neither the vocabulary nor
//      a value that was read explains (descriptive, quoted, uncertain) withholds the selector as a placeholder the user
//      fills (`<PR>`, `<WENV>`, `<NUM>`, `<ARGS>`), never a guess and never a bare command.
//  (2) the danger checker is an allowlist: only the commands / subcommands / flags the catalog renders are trusted; any
//      wrapper, environment assignment, unknown program, subcommand or flag is high risk (confirmation needed).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { checkDanger, allowlistProblems } from '../src/danger.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const PWSH = { shell: 'pwsh', os: 'windows' };
const CMD = { shell: 'cmd', os: 'windows' };
const SHELLS = [BASH, PWSH, CMD];
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });
const withheld = (r, cmd, slots, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual([...r.missing].sort(), [slots].flat().sort(), msg);
};
const exact = (r, cmd, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual(r.missing, [], msg);
};

test('major: an environment after "in" / "on" is withheld, never dropped for the default target', () => {
  for (const env of SHELLS) {
    for (const q of ['deploy worker in preview2', 'deploy worker on qa_1', 'deploy the worker in customer-a', 'deploy worker on the eu cluster']) {
      withheld(run(q, null, env), 'npx wrangler deploy --env <WENV>', 'wenv', `${env.shell}: ${q}`);
    }
    // read environments stay as they were
    exact(run('deploy worker to staging', null, env), 'npx wrangler deploy --env staging', env.shell);
    exact(run('deploy worker to preview2', null, env), 'npx wrangler deploy --env preview2', env.shell);
    exact(run('deploy the worker', null, env), 'npx wrangler deploy', env.shell);
  }
});

test('major: a secret update keeps the environment it names (or withholds it)', () => {
  for (const env of SHELLS) {
    for (const q of ['set worker secret API_KEY --env staging', 'set worker secret API_KEY for staging', 'put secret API_KEY on the staging environment']) {
      exact(run(q, null, env), 'npx wrangler secret put API_KEY --env staging', `${env.shell}: ${q}`);
    }
    withheld(run('set worker secret API_KEY in preview2', null, env), 'npx wrangler secret put API_KEY --env <WENV>', 'wenv', env.shell);
    exact(run('set the API_KEY secret on the worker', null, env), 'npx wrangler secret put API_KEY', env.shell);
  }
  // the other wrangler commands take --env too
  exact(run('tail worker logs for production'), 'npx wrangler tail --env production');
});

test('major: a dependency install never makes up a package name', () => {
  for (const env of SHELLS) {
    for (const q of ['install the project dependencies with npm', 'install dependencies with npm', 'install npm dependencies',
      'npm install the deps for this repo', 'zainstaluj zaleznosci projektu', 'install dependencies from package.json']) {
      exact(run(q, null, env), 'npm install', `${env.shell}: ${q}`);
    }
    for (const q of ['npm ci', 'do a clean install with npm']) exact(run(q, null, env), 'npm ci', `${env.shell}: ${q}`);
    exact(run('add express to the project with npm', null, env), 'npm install express', env.shell);
    exact(run('install lodash via npm', null, env), 'npm install lodash', env.shell);
  }
});

test('major: pr creation keeps the repository (or withholds it); anything else it cannot express is a placeholder', () => {
  for (const env of SHELLS) {
    exact(run('create a pull request in repo acme/app', null, env), 'gh pr create --fill --repo acme/app', env.shell);
    withheld(run('create a pull request in the other repo', null, env), 'gh pr create --fill --repo <REPO>', 'repo', env.shell);
    for (const q of ['create a pr into develop', 'create a draft pr', 'create a pr with reviewer bob']) {
      withheld(run(q, null, env), 'gh pr create --fill <ARGS>', 'args', `${env.shell}: ${q}`);
    }
    exact(run('create a pull request', null, env), 'gh pr create --fill', env.shell);
  }
});

test('rule 1: descriptive, picked-out or unknown selectors are placeholders for every gh / wrangler command', () => {
  for (const env of SHELLS) {
    for (const [q, cmd, slot] of [
      ['merge the pr about auth', 'gh pr merge <PR>', 'pr'],
      ['merge the pr from the payments team', 'gh pr merge <PR>', 'pr'],
      ['view the pr bob opened', 'gh pr view <PR>', 'pr'],
      ['show checks of the flaky pr', 'gh pr checks <PR>', 'pr'],
      ['list prs with label bug', 'gh pr list <ARGS>', 'args'],
      ['list closed prs', 'gh pr list <ARGS>', 'args'],
      ['deploy worker in 2-3 minutes', 'npx wrangler deploy <ARGS>', 'args'],
    ]) withheld(run(q, null, env), cmd, slot, `${env.shell}: ${q}`);
    // explicit selectors stay; a word that only describes the command does not withhold them
    exact(run('merge pr 42', null, env), 'gh pr merge 42', env.shell);
    exact(run('merge pr 45 in repo acme/app', null, env), 'gh pr merge 45 --repo acme/app', env.shell);
    exact(run('merge pr 45 and delete the branch', null, env), 'gh pr merge 45 --delete-branch', env.shell);
    exact(run('list open prs', null, env), 'gh pr list', env.shell);
    exact(run('merge pr 42 in PowerShell', null, env), 'gh pr merge 42', env.shell);
  }
  // a second number competes with an explicit one: withheld
  withheld(run('merge pr 45 or 46'), 'gh pr merge <PR>', 'pr');
});

test('rule 1: an environment the request excludes is never the target', () => {
  for (const env of SHELLS) {
    for (const q of ['deploy worker but not to production', 'deploy worker, not to prod', "don't deploy worker to prod",
      'deploy worker to staging, not production', 'wdróż workera ale nie na produkcję']) {
      withheld(run(q, null, env), 'npx wrangler deploy --env <WENV>', 'wenv', `${env.shell}: ${q}`);
    }
  }
  // a negated dry run is still a plain deploy
  exact(run('deploy worker without a dry run'), 'npx wrangler deploy');
  exact(run('deploy the worker, not a dry run'), 'npx wrangler deploy');
});

test('minor (r23): url lead-ins, reopen / ready, merge <url>', () => {
  const url = 'https://github.com/acme/app/pull/12';
  exact(run(`show me the pr at ${url}`), `gh pr view ${url}`);
  exact(run(`can you merge the pr at ${url}`), `gh pr merge ${url}`);
  exact(run(`merge the pr (${url})`), `gh pr merge ${url}`);
  exact(run(`merge pr, url: ${url}`), `gh pr merge ${url}`);
  withheld(run(`merge the pr that depends on ${url}`), 'gh pr merge <PR>', 'pr');
  for (const q of [`merge ${url}`, `squash merge ${url}`, `i want to merge ${url}`]) exact(run(q), `gh pr merge ${url}`, q);
  for (const q of ['reopen pr', 'mark pr as ready']) {
    const r = run(q);
    assert.notEqual(r.command, 'gh pr create --fill', q);
    assert.equal(r.understood, false, q);
  }
});

test('rule 2: wrappers, assignments, unknown programs, subcommands and flags are high risk', () => {
  for (const c of ['sudo ls', 'timeout 5 ls', 'env FOO=1 ls', 'nohup node server.js', 'xargs -n1 echo', 'bash -c "ls"', 'FOO=1 ls',
    'mywrap ls', 'cowsay hi', 'git filter-branch', 'npx cowsay', 'npx wrangler delete', 'gh pr close 3', 'docker compose rm -f',
    'gh pr merge 12 --admin', 'git push --force-with-lease', 'rm -P f', 'ls --hyperlink=always', 'ssh host uptime', 'git -C /x status']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', `${c}: ${d.warnings.join('; ')}`);
    assert.ok(allowlistProblems(c).length > 0, c);
  }
  // known commands and flags: no allowlist problem (option clusters and attached numbers included)
  for (const c of ['ls -la', 'ls -lah /tmp', 'git status', 'git push origin main', 'tail -n5 f.txt', 'gh pr merge 12 --repo a/b --delete-branch',
    'npx wrangler deploy --dry-run --env staging', 'docker compose up -d', 'env | sort', 'ssh -N -L 8080:localhost:8080 example.com',
    'find /tmp -type f -iname "*.log" -mtime -3', 'grep -rn --include="*.js" -- TODO src', 'npm ci', 'node --version']) {
    assert.deepEqual(allowlistProblems(c), [], c);
  }
  // the allowlist only escalates: a deny rule still fires on a known command
  assert.equal(checkDanger('rm -rf /').critical, true);
});

test('rule 2: every catalog command is on the allowlist (only its sudo, bash -c and xargs wrappers and the substitution of a high-risk intent escalate)', async () => {
  const { INTENTS } = await import('../src/catalog.js');
  const { buildCommand } = await import('../src/fill.js');
  const V = { path: 'dir', file: 'f.txt', src: 'a.txt', dst: 'b.txt', dest: 'd', archive: 'x.tar.gz', count: 5, depth: 2, size: '10M',
    age: '-mtime -3', days: 3, port: 8080, pid: 1234, mode: '755', var: 'FOO', name: 'foo', service: 'nginx', container: 'web', pkg: 'htop',
    cmd: 'node', branch: 'dev', user: 'bob', pattern: 'err', host: 'example.com', target: 'example.com', message: 'msg', url: 'https://x.org/r.git',
    text: 'hi', ext: 'log', old: 'a', new: 'b', start: 1, end: 5, num: 7, pr: '12', repo: 'a/b', wenv: 'staging', dryrun: '--dry-run', script: 'dev' };
  const bad = [];
  for (const it of INTENTS) {
    for (const env of [BASH, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'fish', os: 'linux' }, { shell: 'powershell', os: 'win32' }, { shell: 'cmd', os: 'win32' }]) {
      const r = buildCommand(it.id, '', { env, resolved: { ...V } });
      if (!r.command) continue;
      const p = allowlistProblems(r.command).filter((m) => !/^runs another command through a wrapper \((?:sudo|bash|xargs)\)/.test(m)
        && !(it.risk === 'high' && /^runs a command substitution/.test(m)));
      if (p.length) bad.push(`${it.id}/${env.shell}: ${r.command} -> ${p.join('; ')}`);
    }
  }
  assert.deepEqual(bad, []);
});

test('a literal gh command keeps its pull request (the subcommand word is not a selector)', () => {
  for (const [q, cmd] of [['gh pr view 42', 'gh pr view 42'], ['gh pr merge 118', 'gh pr merge 118'], ['odpal gh pr merge 118', 'gh pr merge 118'],
    ['gh pr checks 7', 'gh pr checks 7'], ['gh pr view', 'gh pr view'], ['gh pr merge', 'gh pr merge']]) exact(run(q), cmd, q);
});
// GENERATED by scripts/build_allowlist.js from the catalog templates (all shells). Do not edit by hand.
// command key (program + known subcommand words) -> the flags tellsh renders for it ('*sub': any operand after the key)
export const ALLOW = {
  "$_.currenttemperature": [],
  "$_.freephysicalmemory": [],
  "$_.linktype": ["-a","-and","-d","-e","-eq","-n","-not","-o","-q","-t"],
  "$_.name": ["-a","-b","-band","-d","-e","-i","-k","-l","-like","-n","-o","-or","-r"],
  "$_.processname": ["-a","-c","-h","-m","-match","-o","-or","-r","-t"],
  "$_.sum": [],
  "$_.totalvisiblememorysize": [],
  "$env:<var>": ["-i","-l","-p","-s","-split","-t"],
  "$lastexitcode": ["-e","-eq","-q"],
  ",": [],
  "-": [],
  "-differenceobject": [],
  "-force": ["-ErrorAction"],
  "-gt": [],
  "-maxevents": ["-ErrorAction"],
  "-not": [],
  ".": [],
  "..": [],
  ".adddays": [],
  ".addminutes": [],
  ".count": [],
  ".historysavepath": ["-Pattern"],
  ".lastbootuptime": [],
  ".lastwritetime": [],
  ".processname": [],
  ".providerpath": [],
  ".replace": [],
  ".sum": [],
  ".words": [],
  "/bin/kill": [],
  "<arg>,": [],
  "<cmd>": ["--help","--version"],
  "<end>": [],
  "<num>": [],
  "<service>": [],
  "<start>": [],
  "<text>": [],
  "=": [],
  "@": [],
  "[convert]::frombase64string": [],
  "[convert]::tobase64string": [],
  "[math]::round": [],
  "[pscustomobject]@{": [],
  "[regex]::escape": [],
  "[system.environment]::osversion.version": [],
  "[system.environment]::processorcount": [],
  "[system.io.file]::readallbytes": [],
  "[system.io.path]::combine": [],
  "[system.text.encoding]::utf8.getbytes": [],
  "[system.text.encoding]::utf8.getstring": [],
  "ansible": ["--help","--version"],
  "apt": ["--help","--version"],
  "awk": [],
  "aws": ["--help","--version"],
  "az": ["--help","--version"],
  "base64": ["-D","-d","-i"],
  "bash": ["--help","--version","-c"],
  "brew": ["--help","--version"],
  "brew install": [],
  "brew list": [],
  "brew services": [],
  "brew update": [],
  "brew upgrade": [],
  "bun": ["--help","--version"],
  "cal": [],
  "call": [],
  "cargo": ["--help","--version"],
  "cat": [],
  "cd": [],
  "certutil": ["-hashfile"],
  "chmod": [],
  "clang": ["--help","--version"],
  "claude": ["--help","--version"],
  "cmake": ["--help","--version"],
  "code": ["--help","--version"],
  "codex": ["--help","--version"],
  "compare-object": ["-referenceobject"],
  "composer": ["--help","--version"],
  "compress-archive": ["-destinationpath","-literalpath"],
  "copy": ["/-y"],
  "copy-item": ["-confirm","-destination","-literalpath","-recurse"],
  "count": [],
  "cp": ["-i","-r","-ri"],
  "crontab": ["-e","-l"],
  "curl": ["--help","--version","-I","-L","-O","-f","-fLO","-o","-s","-sI","-w"],
  "cut": ["-d ","-f2-"],
  "date": [],
  "del": ["/s"],
  "deno": ["--help","--version"],
  "df": ["-h"],
  "diff": ["-u"],
  "dig": [],
  "dir": ["/a","/a:","/al","/q","/s"],
  "diskutil": [],
  "docker": ["--help","--version"],
  "docker compose down": [],
  "docker compose up": ["-d"],
  "docker exec": ["-i","-it","-t"],
  "docker images": [],
  "docker logs": ["--tail","-f"],
  "docker ps": ["-a","-q"],
  "docker ps -q": [],
  "docker stats": ["--no-stream"],
  "docker stop": [],
  "docker stop $": [],
  "docker stop %i": [],
  "docker stop <container>": [],
  "docker system prune": ["-a"],
  "doskey": [],
  "dotnet": ["--help","--version"],
  "dpkg": ["-l"],
  "du": ["-d","-h","-k","-s","-sh"],
  "echo": [],
  "echo.": [],
  "echo.%": [],
  "end": [],
  "env": [],
  "eslint": ["--help","--version"],
  "expand-archive": ["-destinationpath","-literalpath"],
  "expression": [],
  "fc": [],
  "ffmpeg": ["--help","--version"],
  "file": [],
  "find": ["-L","-delete","-empty","-exec","-f","-h","-iname","-k","-lh","-ls","-maxdepth","-mtime","-name","-not","-path","-printf","-r","-size","-t","-type","-xdev","-xtype","/c","/v"],
  "findmnt": [],
  "findstr": ["/c:","/i","/m","/n","/s"],
  "firebase": ["--help","--version"],
  "fish": ["--help","--version"],
  "flyctl": ["--help","--version"],
  "for": ["/f"],
  "foreach-object": [],
  "forfiles": ["/c","/d","/m","/p","/s"],
  "format-list": [],
  "free": ["-h"],
  "fsutil": [],
  "g++": ["--help","--version"],
  "gcc": ["--help","--version"],
  "gcloud": ["--help","--version"],
  "gem": ["--help","--version"],
  "get-childitem": ["-depth","-directory","-erroraction","-file","-force","-literalpath","-path","-recurse"],
  "get-ciminstance": ["-classname","-filter","-namespace"],
  "get-command": ["-all","-commandtype","-name"],
  "get-content": ["-literalpath","-raw","-tail","-totalcount","-wait"],
  "get-date": [],
  "get-filehash": ["-algorithm","-literalpath"],
  "get-item": ["-force","-literalpath"],
  "get-location": [],
  "get-netipaddress": [],
  "get-netroute": [],
  "get-nettcpconnection": ["-erroraction","-localport","-state"],
  "get-partition": [],
  "get-pnpdevice": ["-presentonly"],
  "get-process": ["-id"],
  "get-psdrive": ["-psprovider"],
  "get-psreadlineoption": [],
  "get-scheduledtask": ["-taskpath"],
  "get-service": ["-name"],
  "get-timezone": [],
  "get-volume": [],
  "get-winevent": ["-filterhashtable","-logname","-maxevents"],
  "gh": ["--help","--version"],
  "gh auth login": [],
  "gh auth status": [],
  "gh pr checks": ["--repo"],
  "gh pr create": ["--fill","--repo"],
  "gh pr list": ["--repo"],
  "gh pr merge": ["--delete-branch","--repo"],
  "gh pr view": ["--repo"],
  "gh run list": ["--repo"],
  "gh run view": ["--repo"],
  "git": ["--help","--version"],
  "git add": ["-A"],
  "git blame": [],
  "git branch": ["--show-current","-a","-d"],
  "git checkout": ["-b"],
  "git clone": [],
  "git commit": ["-m"],
  "git diff": ["--staged"],
  "git init": [],
  "git log": ["--decorate","--graph","--oneline","-n"],
  "git pull": [],
  "git push": [],
  "git remote": ["-v"],
  "git reset": ["--soft"],
  "git restore": [],
  "git stash": [],
  "git status": [],
  "go": ["--help","--version"],
  "gradle": ["--help","--version"],
  "grep": ["--include=","-E","-a","-ai","-i","-iE","-l","-n","-r","-rl","-rn"],
  "group-object": ["-casesensitive","-noelement","-property"],
  "head": ["-n"],
  "helm": ["--help","--version"],
  "heroku": ["--help","--version"],
  "history": ["--contains"],
  "hostname": [],
  "icacls": ["/T"],
  "id": [],
  "if": [],
  "ifconfig": [],
  "invoke-restmethod": ["-uri"],
  "ip": ["-b","-brief","-e","-f","-i","-r"],
  "ipconfig": [],
  "java": ["--help","--version"],
  "javac": ["--help","--version"],
  "join-path": [],
  "journalctl": ["--no-pager","--since","-b","-n","-p","-u"],
  "jq": ["--help","--version"],
  "kill": [],
  "kotlin": ["--help","--version"],
  "kubectl": ["--help","--version"],
  "last": ["-n"],
  "launchctl list": [],
  "launchctl list | awk nr == 1 || ($2 != \"0\" && $2 != \"-\")": [],
  "level": [],
  "ln": ["-s"],
  "log": ["--last","--predicate","--style"],
  "ls": ["-a","-h","-l","-lah"],
  "lsblk": [],
  "lscpu": [],
  "lsof": ["-C","-P","-T","-i","-iTCP","-n","-nP","-sTCP:LISTEN","-t","-ti"],
  "lspci": [],
  "lsusb": [],
  "make": ["--help","--version"],
  "md5": [],
  "md5sum": [],
  "measure-object": ["-property","-sum","-word"],
  "mkdir": ["-p"],
  "mklink": [],
  "modal": ["--help","--version"],
  "mount": [],
  "mountvol": [],
  "move": ["/-y"],
  "move-item": ["-destination","-literalpath"],
  "mv": ["-i"],
  "mvn": ["--help","--version"],
  "mysql": ["--help","--version"],
  "nc": ["-v","-z","-zv"],
  "net": [],
  "netlify": ["--help","--version"],
  "netstat": ["-a","-an","-ano","-n","-o","-r","-rn"],
  "netstat -ano ^| findstr /r /c:\":8080 .*listening\"": [],
  "netstat -ano ^| findstr /r /c:\":<port> .*listening\"": [],
  "new-item": ["-force","-itemtype","-path","-target"],
  "nginx": ["--help","--version"],
  "node": ["--help","--version"],
  "nodejs": ["--help","--version"],
  "npm": ["--help","--version"],
  "npm ci": [],
  "npm install": ["-g"],
  "npm run": [],
  "nproc": [],
  "npx": ["--help","--version"],
  "npx wrangler deploy": ["--dry-run","--env"],
  "npx wrangler dev": ["--env"],
  "npx wrangler login": [],
  "npx wrangler secret put": ["--env"],
  "npx wrangler tail": ["--env"],
  "npx wrangler whoami": [],
  "nslookup": [],
  "nvim": ["--help","--version"],
  "ollama": ["--help","--version"],
  "openssl": ["--help","--version"],
  "path": [],
  "perl": ["--help","--version"],
  "pgrep": ["-a","-af","-f","-l","-lf"],
  "php": ["--help","--version"],
  "ping": ["-c","-n"],
  "pip": ["--help","--version"],
  "pip3": ["--help","--version"],
  "pkill": ["-f"],
  "pmset": ["-g"],
  "pnpm": ["--help","--version"],
  "poetry": ["--help","--version"],
  "popd": [],
  "powershell": ["--help","--version"],
  "prettier": ["--help","--version"],
  "printenv": [],
  "printf": [],
  "providername": [],
  "ps": ["--forest","--sort=","-e","-ef","-f","-m","-r"],
  "psql": ["--help","--version"],
  "pushd": [],
  "pwd": [],
  "pwsh": ["--help","--version"],
  "py": ["-m"],
  "pytest": ["--help","--version"],
  "python": ["--help","--version"],
  "python3": ["--help","--version","-m"],
  "query": [],
  "readlink": [],
  "redis-cli": ["--help","--version"],
  "remove-item": ["-literalpath","-recurse"],
  "resolve-dnsname": ["-name"],
  "resolve-path": ["-literalpath"],
  "restart-service": ["-name"],
  "rm": ["-r"],
  "rmdir": ["/s"],
  "route": [],
  "rsync": ["--help","--version"],
  "ruby": ["--help","--version"],
  "rustc": ["--help","--version"],
  "rustup": ["--help","--version"],
  "sc": [],
  "schtasks": [],
  "sed": ["-i","-n"],
  "select-object": ["-expandproperty","-first","-index","-property","-unique"],
  "select-string": ["-casesensitive","-list","-literalpath","-pattern"],
  "sensors": [],
  "set": ["-l"],
  "set-content": ["-literalpath","-nonewline"],
  "set-service": ["-name","-startuptype"],
  "sha256sum": [],
  "shasum": ["-a"],
  "sort": ["-h","-n","-r","-rh","-rn","/+65","/r"],
  "sort-object": ["-descending"],
  "source": [],
  "split-path": ["-literalpath","-parent"],
  "sqlite3": ["--help","--version"],
  "ss": ["-l","-ltnup","-n","-p","-t","-tulpn","-tun","-u"],
  "ssh": ["--help","--version","-L","-N"],
  "start-service": ["-name"],
  "starttime": [],
  "stat": [],
  "stop-process": ["-force","-id"],
  "stop-service": ["-name"],
  "string": [],
  "sudo": ["--now","--samplers","-R","-n"],
  "supabase": ["--help","--version"],
  "sw_vers": [],
  "sysctl": ["-n"],
  "system_profiler": [],
  "systemctl": ["--failed","--no-pager"],
  "systemctl list-units": ["--no-pager","--state=","--type="],
  "systemctl status": ["--no-pager"],
  "systeminfo": [],
  "tail": ["-f","-n"],
  "tar": ["-C","-a","-c","-czvf","-f","-t","-tvf","-v","-x","-xf","-xzvf","-z"],
  "taskkill": ["/f","/im"],
  "tasklist": [],
  "taskschd.msc": [],
  "terraform": ["--help","--version"],
  "test-connection": ["-computername","-count"],
  "test-netconnection": ["-computername","-port","-traceroute"],
  "test-path": ["-literalpath"],
  "timedatectl show": ["--value","-p"],
  "tmux": ["--help","--version"],
  "touch": [],
  "tr": [],
  "traceroute": [],
  "tracert": [],
  "tsc": ["--help","--version"],
  "type": [],
  "tzutil": ["/g"],
  "uname": ["-a","-r"],
  "uniq": ["-D","-c","-d","-dD","-w#"],
  "unzip": ["-d"],
  "upower": ["-i"],
  "uptime": [],
  "uv": ["--help","--version"],
  "ver": [],
  "vercel": ["--help","--version"],
  "vim": ["--help","--version"],
  "vite": ["--help","--version"],
  "vm_stat": [],
  "wc": ["-l","-w"],
  "webpack": ["--help","--version"],
  "wevtutil": ["/c:","/f:","/rd:"],
  "wget": ["--help","--version"],
  "where": ["/r"],
  "where-object": ["-eq","-gt","-like","-lt","-match","-notmatch"],
  "which": ["-a"],
  "who": [],
  "whoami": [],
  "winget install": [],
  "winget list": [],
  "winget upgrade": ["--all"],
  "wrangler": ["--help","--version"],
  "xargs": ["-r"],
  "yarn": ["--help","--version"],
  "yq": ["--help","--version"],
  "zip": ["-r"],
  "zsh": ["--help","--version"],
};

 succeeded in 0ms:
// Dangerous-pattern checker. Runs on every final command (including user-edited ones)
// and can only ever escalate risk, never lower it. Whether a command can be safe at all is the
// trust rule at the end of this file (checkDanger): only tellsh's own catalog renders with plain values.
//
// Regex rules run on the command text after `git`/`docker` global options are removed
// (`git -C /repo -c x=y reset --hard` is checked as `git reset --hard`). Structural rules
// (rm, kill, Remove-Item, rd/del) tokenize each simple command so long options, quoted targets
// and `--` are understood.

import { ALLOW } from './allowlist-data.js';

const RANK = { safe: 0, medium: 1, high: 2 };
export const maxRisk = (a, b) => (RANK[b] > RANK[a] ? b : a);

// ---------------------------------------------------------------------------------------------
// light tokenizer: simple commands separated by ; & | && || ( ) and newlines, words unquoted
// (POSIX '…' "…" \x and PowerShell `x). Good enough for danger checks, not a full shell parser.

// PowerShell also treats the typographic quotes as quote characters (about_Quoting_Rules)
const PS_SQ = /['\u2018\u2019\u201A\u201B]/;
const PS_DQ = /["\u201C\u201D\u201E]/;

// $'…' (bash, zsh, ksh): the index of its closing quote (`\'` does not close it)
const ansiEnd = (s, i) => { let j = i + 2; while (j < s.length && s[j] !== "'") j += s[j] === '\\' ? 2 : 1; return Math.min(j, s.length); };
const ANSI_ESC = { n: '\n', t: '\t', r: '\r', a: '\x07', b: '\b', e: '\x1b', E: '\x1b', f: '\f', v: '\v' };

// winPaths: backslash is never an escape (cmd.exe / PowerShell paths such as "C:\"), and the
// PowerShell typographic quotes ‘…’ “…” quote like ' and "
export function simpleCommands(cmd, { winPaths = false } = {}) {
  const out = [];
  let words = [];
  let w = null;
  const flushWord = () => { if (w != null) { words.push(w); w = null; } };
  const flushCmd = () => { flushWord(); if (words.length) out.push(words); words = []; };
  const s = String(cmd);
  const isSq = (c) => (winPaths ? PS_SQ.test(c) : c === "'");
  const isDq = (c) => (winPaths ? PS_DQ.test(c) : c === '"');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (!winPaths && c === '$' && s[i + 1] === "'") {
      // bash ANSI-C quoting $'…': a backslash escapes the next character, also a quote (`$'\''` is one ')
      const end = ansiEnd(s, i);
      w = (w ?? '') + s.slice(i + 2, end).replace(/\\(.)/gs, (m, x) => ANSI_ESC[x] ?? x);
      i = end;
    } else if (isSq(c)) {
      let j = i + 1;
      while (j < s.length && !isSq(s[j])) j++;
      const end = j;
      w = (w ?? '') + s.slice(i + 1, end);
      i = end;
    } else if (isDq(c)) {
      let v = '';
      let j = i + 1;
      for (; j < s.length && !isDq(s[j]); j++) {
        if (((!winPaths && s[j] === '\\' && /[$`"\\\n]/.test(s[j + 1])) || s[j] === '`') && j + 1 < s.length) v += s[++j]; else v += s[j];
      }
      w = (w ?? '') + v;
      i = j;
    } else if (!winPaths && c === '\\' && i + 1 < s.length && !/[A-Za-z0-9_.%$~*]/.test(s[i + 1])) {
      w = (w ?? '') + s[++i]; // POSIX escape (keeps Windows paths like C:\Users intact)
    } else if ((c === '{' || c === '}') && w == null && (i + 1 >= s.length || /\s/.test(s[i + 1]))) {
      flushCmd(); // standalone { } = command group / script block
    } else if (/\s/.test(c)) {
      if (c === '\n') flushCmd(); else flushWord();
    } else if (/[;&|()]/.test(c)) {
      flushCmd();
    } else {
      w = (w ?? '') + c;
    }
  }
  flushCmd();
  return out;
}

// strip wrappers that run their argument as the command (sudo, timeout N, chroot DIR, env A=b, ...)
// options of each wrapper that take a separate value
const WRAPPER_OPTARG = {
  sudo: /^-[ugpCDhrtTUR]$|^--(?:user|group|prompt|close-from|chdir|chroot|host|role|type|other-user|command-timeout)$/,
  doas: /^-[uC]$/,
  nice: /^-n$|^--adjustment$/,
  ionice: /^-[cnpPu]$|^--(?:class|classdata|pid|pgid|uid)$/,
  xargs: /^-[IdEnLPsa]$|^--(?:arg-file|delimiter|max-args|max-procs|max-chars|replace|eof)$/,
  timeout: /^-[sk]$|^--(?:signal|kill-after)$/,
  chroot: /^--(?:userspec|groups)$/,
  stdbuf: /^-[ioe]$|^--(?:input|output|error)$/,
  env: /^-[uCS]$|^--(?:unset|chdir|split-string)$/,
  time: /^-[fo]$|^--(?:format|output)$/,
  exec: /^-a$/,
  unshare: /^-[SGRwl]$|^--(?:setuid|setgid|root|wd|map-user|map-group|propagation|setgroups)$/,
  watch: /^-[nq]$|^--(?:interval|equexit)$/,
  nsenter: /^-[tSGrw]$|^--(?:target|setuid|setgid|root|wd)$/,
  setpriv: /^--(?:reuid|regid|groups|inh-caps|ambient-caps|bounding-set|securebits|pdeathsig|selinux-label|apparmor-profile)$/,
  strace: /^-[eoopsuPIEXbS]$/,
  ltrace: /^-[eoopsuPnS]$/,
  flock: /^-[wEc]$|^--(?:timeout|wait|conflict-exit-code|command)$/,
  taskset: /^-[c]$/,
  'systemd-run': /^-[upEH]$|^--(?:unit|property|setenv|host|machine|description|slice|uid|gid|working-directory|on-calendar|on-active)$/,
  runuser: /^-[ugl]$|^--(?:user|group|login)$/,
  pkexec: /^--user$/,
  run0: /^-[ugD]$|^--(?:user|group|chdir|unit|property|description|slice|nice|setenv|background|machine|shell-prompt-prefix|area)$/,
  chrt: /^-[TPD]$|^--(?:sched-runtime|sched-period|sched-deadline)$/,
  cgexec: /^-g$/,
  torsocks: /^-[uapP]$|^--(?:user|pass|address|port)$/,
};
// Command strings given as an option value are checked as commands of their own. Any program:
// `-c STR`, `--command STR`, `--command=STR` (`flock -c "rm -rf /" LOCK`, `script -c "…"`, `find … -exec sh -c "…"`);
// shells, su and runuser also take -c inside a cluster (`bash -lc "…"`, `su -lc "…"`); env -S splits its string.
const CMD_STRING_ANY = /^(?:-c|--command|--session-command)$/;
const CMD_STRING_CLUSTER = /^-[a-zA-Z]*c$/;
const SHELLS = /^(?:ba|z|da|k|fi|c|tc|a|mk|r)?sh$|^busybox$/;
const PRIVILEGED = new Set(['sudo', 'doas', 'su', 'runuser', 'pkexec', 'run0', 'sudoedit']);
// programs whose whole job is to run a command (string): a payload that depends on the shell state cannot be checked
const RUNNERS = new Set(['su', 'runuser', 'flock', 'script', 'eval', 'env', 'watch', 'tmux', 'screen', 'ssh', 'xargs', 'parallel', 'sudo', 'doas',
  'pkexec', 'run0', 'nohup', 'setsid', 'timeout', 'iex', 'invoke-expression', 'cmd', 'pwsh', 'powershell', 'start-process', 'sem']);
const WRAPPERS = new Set(['sudo', 'doas', 'run0', 'command', 'builtin', 'exec', 'nohup', 'time', 'nice', 'ionice', 'then', 'do', 'else', '&', 'busybox', 'toybox', 'xargs', 'timeout', 'chroot', 'stdbuf', 'env', 'setsid', 'unbuffer', 'caffeinate',
  'unshare', 'watch', 'nsenter', 'setpriv', 'strace', 'ltrace', 'flock', 'taskset', 'systemd-run', 'runuser', 'firejail', 'proot', 'fakeroot',
  'pkexec', 'chrt', 'cgexec', 'eatmydata', 'torsocks', 'catchsegv', 'proxychains', 'proxychains4', 'tsocks', 'valgrind', 'faketime', 'ts',
  'chronic', 'nocache', 'trickle', 'numactl', 'schedtool', 'cpulimit', 'prlimit', 'sg', 'newgrp', 'su', 'parallel', 'sem', 'tmux', 'screen',
  'script', 'xvfb-run', 'dbus-launch', 'dbus-run-session', 'expect', 'gdb', 'ssh-agent', 'sshpass', 'with-lock-ex', 'lckdo', 'daemonize', 'start-stop-daemon']);
// programs that run the command at the end of their arguments without being a plain wrapper
const SUFFIX_RUNNERS = new Set(['ssh', 'mosh', 'kubectl', 'docker', 'podman', 'lxc', 'incus', 'machinectl', 'distrobox', 'toolbox', 'flatpak', 'nix-shell', 'firejail', 'bwrap']);

// programs whose arguments are data, never a command they run (`grep -r rm src`, `man rm`, `echo rm -rf /`)
const DATA_ARGS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'sed', 'awk', 'gawk', 'mawk', 'echo', 'printf', 'man', 'which', 'whereis',
  'type', 'whatis', 'apropos', 'help', 'info', 'tldr', 'git', 'cat', 'less', 'more', 'head', 'tail', 'ls', 'find', 'locate', 'tellsh', 'alias',
  'history', 'fc', 'complete', 'compgen', 'hash', 'test', '[', '[[', 'true', 'false', 'printenv', 'set', 'unset', 'export', 'declare', 'local',
  'readonly', 'trap', 'write-host', 'write-output', 'get-help', 'get-command', 'select-string', 'sls', 'findstr', 'wc', 'sort', 'uniq', 'cut',
  'tr', 'diff', 'cmp', 'file', 'stat', 'du', 'df', 'tree', 'jq', 'yq', 'xxd', 'od', 'hexdump', 'strings', 'mkdir', 'touch', 'cd', 'pushd']);
// programs that destroy or change things: after an unknown program they may be the command it runs (`mywrap rm -rf /`)
const DANGER_HEADS = /^(?:rm|rmdir|unlink|shred|wipe|wipefs|mkfs(?:\.\w+)?|mke2fs|dd|truncate|kill|pkill|killall|chmod|chown|chgrp|mv|cp|rsync|find|tar|tee|sh|bash|zsh|dash|ksh|fish|eval|shutdown|reboot|halt|poweroff|crontab|iptables|remove-item|ri|del|erase|rd|format|diskpart|stop-process|format-volume|clear-disk)$/i;

/** Collect `-c STR` style payloads of one simple command into `inner` (`unsure` when a runner's payload cannot be read). */
function payloads(w, inner, flags) {
  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
  if (PRIVILEGED.has(h)) flags.privileged = true;
  // a payload of a program that runs commands (or of `sh -c` inside other arguments: `find … -exec sh -c "…"`)
  // must be readable; `-c` of any other program (`grep -c "$PAT"`) is still checked, without that requirement
  const add = (v, i) => {
    if (v == null) return;
    const prev = String(w[i - 1] ?? '').replace(/^.*[\\/]/, '').toLowerCase();
    const runner = RUNNERS.has(h) || SHELLS.test(h) || SHELLS.test(prev) || /^--(?:command|session-command|split-string)/.test(String(w[i] ?? ''));
    if (!runner) { (flags.lenient ??= []).push(String(v)); return; }
    inner.push(String(v));
    if (/[$`]|^\s*$/.test(String(v))) flags.unsure = `${SHELLS.test(prev) ? prev : h} runs a command string that depends on the shell state (${String(v).slice(0, 40)}); it cannot be checked`;
  };
  for (let i = 1; i < w.length; i++) {
    const x = String(w[i]);
    if (x === '--' && !SHELLS.test(h)) continue;
    const eq = x.match(/^(--(?:command|session-command|split-string))=(.*)$/s);
    if (eq) { add(eq[2], i); continue; }
    if (h === 'pwsh' || h === 'powershell') {
      if (/^-(?:e|ec|en|enc\w*|encodedcommand)$/i.test(x)) { flags.unsure = `${h} -EncodedCommand cannot be checked`; i++; continue; }
      if (/^-(?:c|co\w*|command)$/i.test(x)) { add(w.slice(i + 1).join(' '), i); break; }
      continue;
    }
    if (h === 'cmd' && /^\/[ck]$/i.test(x)) { add(w.slice(i + 1).join(' '), i); break; }
    if (h === 'env' && (x === '-S' || x === '--split-string')) { add(w[i + 1], i); i++; continue; }
    if (CMD_STRING_ANY.test(x) || ((SHELLS.test(h) || h === 'su' || h === 'runuser') && CMD_STRING_CLUSTER.test(x))) {
      // sh -c 'cmd' arg0 args: only the string is the command
      add(w[i + 1], i);
      // its $0, $1, "$@" are the words after it (`sh -c 'rm -rf "$1"' _ /`): also checked with them filled in
      if (SHELLS.test(h) && w[i + 1] != null && w.length > i + 2) inner.push(withPositional(String(w[i + 1]), w.slice(i + 2).map(String)));
      i++;
    }
  }
  if (h === 'eval' || h === 'iex' || h === 'invoke-expression') add(w.slice(1).join(' '), 0);
}

const sq = (x) => `'${x.replace(/'/g, "'\\''")}'`;
/** `sh -c STR arg0 args…`: STR with $0…$9, ${N}, "$@", $@ and $* replaced by the (quoted) arguments. */
function withPositional(str, args) {
  const all = args.slice(1).map(sq).join(' ');
  return str.replace(/"\$@"|"\$\*"|\$@|\$\*/g, all).replace(/"\$\{?(\d)\}?"|\$\{?(\d)\}?/g, (m, a, b) => sq(args[+(a ?? b)] ?? ''));
}

/** The command a wrapper chain runs. `inner` collects command strings given as option values (`su -c "…"`). */
export function commandWords(words, inner = [], flags = {}) {
  let w = words;
  for (;;) {
    while (w.length && /^\w+=/.test(w[0])) w = w.slice(1);
    const h = (w[0] || '').replace(/^.*[\\/]/, '').toLowerCase();
    payloads(w, inner, flags);
    if (!WRAPPERS.has(h)) return w;
    w = w.slice(1);
    const optArg = WRAPPER_OPTARG[h];
    while (w.length && /^-/.test(w[0])) {
      const o = w[0];
      w = w.slice(1);
      if (o === '--') break;
      if (optArg && optArg.test(o)) w = w.slice(1);
    }
    if (h === 'env') while (w.length && /^\w+=/.test(w[0])) w = w.slice(1);
    if (h === 'timeout' && w.length) w = w.slice(1); // DURATION
    if (h === 'chroot' && w.length) w = w.slice(1); // NEWROOT
    if (h === 'flock' && w.length) w = w.slice(1); // LOCKFILE
    if (h === 'taskset' && w.length && /^(?:0x)?[\da-f,-]+$/i.test(w[0])) w = w.slice(1); // MASK (without -c: always one)
    if (h === 'chrt' && w.length && /^\d+$/.test(w[0])) w = w.slice(1); // PRIORITY
  }
}

/**
 * Every command a simple command may run: the wrapper chain as parsed by commandWords, and, because wrapper
 * options are not always understood (`sudo -iu root rm …`, `nice --adjustment=5 rm …`), the command starting
 * at every later non-option word of a wrapper / remote runner (`ssh host rm -rf /`, `docker exec ct rm …`).
 * The checks only ever escalate, so reading too many candidates is safe; missing one is not.
 */
export function commandChains(words, inner, flags) {
  const out = [];
  const push = (w) => { if (w.length && !out.some((o) => o.length === w.length && o.every((x, i) => x === w[i]))) out.push(w); };
  push(commandWords(words, inner, flags));
  const lead = words.findIndex((x) => !/^\w+=/.test(x));
  const h = lead >= 0 ? String(words[lead]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase() : '';
  const remote = SUFFIX_RUNNERS.has(h) && (!['docker', 'podman', 'kubectl', 'lxc', 'incus'].includes(h) || words.some((x) => ['exec', 'run', 'debug', 'create'].includes(x)));
  // an unknown program followed by a destructive command (`mywrap rm -rf /`, `catchsegv2 dd …`): it may run it
  if (h && !WRAPPERS.has(h) && !remote && !DATA_ARGS.has(h)) {
    for (let j = lead + 1; j < words.length - 1; j++) if (DANGER_HEADS.test(String(words[j]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, ''))) push(commandWords(words.slice(j), inner, flags));
  }
  if (WRAPPERS.has(h) || remote) {
    for (let j = lead + 1; j < words.length; j++) {
      if (/^-|^\w+=/.test(words[j])) continue;
      const w = commandWords(words.slice(j), inner, flags);
      push(w);
      // a lone quoted string with spaces is a command (`tmux new "rm -rf /"`, `ssh host "rm -rf /"`)
      if (w.length === 1 && /\s/.test(w[0])) inner.push(w[0]);
    }
  }
  return out;
}

// Lexically normalise a path for the danger checks: `//`, `/./`, a trailing `/.` and `/..` collapse
// (`rm -rf /.`, `rm -rf //`, `rm -r /etc/../`), so they are compared as the directory they name.
// Only absolute, ~ and $HOME paths; a `..` above the home prefix is kept as is.
export function normTarget(t) {
  const s = String(t).trim();
  const m = s.match(/^(\/|~(?=\/|$)|\$\{?HOME\}?(?=\/|$))(.*)$/s);
  if (!m) return s;
  const root = m[1] === '/';
  const parts = [];
  for (const p of m[2].split('/')) {
    if (p === '' || p === '.') continue;
    if (p === '..' && parts.length && parts[parts.length - 1] !== '..') { parts.pop(); continue; }
    if (p === '..' && root) continue;
    parts.push(p);
  }
  const prefix = root ? '' : m[1];
  return parts.length ? prefix + '/' + parts.join('/') : (root ? '/' : prefix);
}

// system directories (and their direct children), user homes and key dot-directories: a recursive
// delete or a move of any of these is critical
const SYS_CRIT = /^(?:\/\*?|(?:~|\$\{?HOME\}?)(?:\/\*|\/\.(?:ssh|gnupg|config|local)(?:\/\*)?)?|\/(?:bin|boot|dev|etc|home|lib\w*|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private)(?:\/\*)?|\/(?:bin|boot|etc|home|lib\w*|sbin|usr|System|Users|Library|private)\/[^/*]+(?:\/\*)?|\/var\/(?:lib|db|spool|log|mail|backups)(?:\/\*)?|\/usr\/local\/[^/*]+(?:\/\*)?)$/;
const sysCrit = (t) => SYS_CRIT.test(normTarget(t));

const POSIX_CRIT_TARGET = /^(?:\/+|\/+\*|~\/*|~\/+\*|\$\{?HOME\}?\/*|\$\{?HOME\}?\/+\*|\*|\.\/*|\.\/+\*|\.\.\/*|\.\.\/+\*|\.\*|\/+(?:bin|boot|dev|etc|home|lib|lib32|lib64|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private)\/*\*?)$/;

function rmCheck(words, hit) {
  let recursive = false;
  let force = false;
  let noPreserve = false;
  const targets = [];
  let opts = true;
  for (const a of words.slice(1)) {
    if (opts && a === '--') { opts = false; continue; }
    if (opts && /^--/.test(a)) {
      if (a === '--recursive') recursive = true;
      else if (a === '--force') force = true;
      else if (a === '--no-preserve-root') noPreserve = true;
      continue;
    }
    if (opts && /^-[a-zA-Z]+$/.test(a)) {
      if (/[rR]/.test(a)) recursive = true;
      if (/f/.test(a)) force = true;
      continue;
    }
    targets.push(a);
  }
  hit('high', 'rm deletes files permanently (no trash)');
  if (noPreserve) hit('high', 'rm --no-preserve-root', true);
  if (recursive && force) hit('high', 'rm -rf deletes without asking');
  if (recursive && targets.some((t) => POSIX_CRIT_TARGET.test(t.trim()) || PS_CRIT_TARGET.test(t.trim()) || sysCrit(t))) hit('high', 'recursive rm on /, ~, * or . — would wipe everything', true);
  if (targets.some((t) => /(?:^|[\\/])\.\.(?:[\\/]|$)/.test(t))) hit('high', 'path contains .. (refers to a parent directory)');
}

// a file under /etc, /boot, /usr, /bin, /sbin, /lib*: deleting, overwriting or editing it in place can make the system
// unbootable or lock everyone out (`rm /etc/passwd`, `sed -i d /etc/passwd`, `tee /etc/passwd < /dev/null`), the same as
// `> /etc/passwd` or `truncate -s0 /etc/passwd`
const SYS_FILE = /^\/+(?:etc|boot|usr|bin|sbin|lib\w*)\/+[^/]/;
const sysFile = (t) => SYS_FILE.test(normTarget(t));
// rm/unlink/shred of a system file; sed -i / perl -i on one; tee (not -a), dd of=, cp/install/mv/ln -f onto one; chmod 000 on one
function sysFileWriteCheck(w, head, hit) {
  const a = w.slice(1);
  if (head === 'dd') {
    if (a.some((x) => /^of=/.test(x) && sysFile(x.slice(3)))) hit('high', 'overwrites a system file', true);
  } else if (head === 'cp' || head === 'mv' || head === 'install' || (head === 'ln' && a.some((x) => /^-[a-zA-Z]*f/.test(x) || x === '--force'))) {
    // the destination: -t DIR / --target-directory=DIR (a file inside it), else the last operand unless it names a
    // directory by its form (`cp x.service /etc/systemd/system/`: adds a file)
    const ti = a.findIndex((x) => x === '-t' || x === '--target-directory');
    const td = ti >= 0 ? a[ti + 1] : a.find((x) => /^--target-directory=/.test(x))?.slice(19);
    if (td != null) return;
    const pos = positional(a);
    const dst = pos.length >= 2 ? pos[pos.length - 1] : null;
    if (dst != null && !/[\\/]$/.test(dst) && sysFile(dst)) hit('high', 'overwrites a system file or directory', true);
  } else if (/^(?:perl|ruby)[\d.]*$/.test(head)) {
    if (a.some((x) => /^-[a-zA-Z]*i/.test(x)) && positional(a).some(sysFile)) hit('high', 'edits a system file in place', true);
  } else if (head === 'chmod') {
    // no permissions at all (`chmod 000 /etc/passwd`, `chmod a= …`): nobody can read it, logins stop working
    const pos = positional(a);
    if (/^0*$|^[ugoa]*=$|^a?-rwx$/.test(pos[0] ?? 'x') && pos.slice(1).some(sysFile)) hit('high', 'removes every permission from a system file', true);
  } else if (head === 'rm' || head === 'unlink') {
    if (positional(a).some(sysFile)) hit('high', 'deletes a system file', true);
  } else if (head === 'sed') {
    if (!a.some((x) => /^-[a-zA-Z]*i/.test(x) || /^--in-place/.test(x))) return;
    // the script is the first positional unless given with -e/-f; every later positional is a file
    const pos = [];
    let script = !a.some((x) => /^-[a-zA-Z]*[ef]$|^--(?:expression|file)(?:=|$)/.test(x));
    let opts = true;
    for (let i = 0; i < a.length; i++) {
      const x = a[i];
      if (opts && x === '--') { opts = false; continue; }
      if (opts && /^-[a-zA-Z]*[ef]$|^--(?:expression|file)$/.test(x)) { i++; continue; }
      if (opts && /^-./.test(x)) continue;
      if (script) { script = false; continue; }
      pos.push(x);
    }
    if (pos.some(sysFile)) hit('high', 'edits a system file in place', true);
  } else if (head === 'tee') {
    const t = positional(a).filter(sysFile);
    if (t.length) hit('high', a.some((x) => /^-[a-zA-Z]*a/.test(x) || x === '--append') ? 'appends to a system file' : 'overwrites a system file', !a.some((x) => /^-[a-zA-Z]*a/.test(x) || x === '--append'));
  }
}

// sed scripts that run a shell command or write a file: GNU `e` (command, or flag of s///), `w` / `W` (command, or flag of
// s///); a script read from a file (-f) cannot be checked. `sed 's/a/b/e' f`, `sed -n '1e cmd' f`, `sed 'w out' f`.
function sedScripts(a) {
  const scripts = [];
  let fromFile = false;
  let first = !a.some((x) => /^-[a-zA-Z]*[ef]$|^--(?:expression|file)(?:=|$)|^-[a-zA-Z]*e./.test(x));
  let opts = true;
  for (let i = 0; i < a.length; i++) {
    const x = String(a[i]);
    if (opts && x === '--') { opts = false; continue; }
    if (opts && /^-[a-zA-Z]*f$|^--file$/.test(x)) { fromFile = true; i++; continue; }
    if (opts && /^--file=|^-[a-zA-Z]*f./.test(x)) { fromFile = true; continue; }
    if (opts && /^-[a-zA-Z]*e$|^--expression$/.test(x)) { if (a[i + 1] != null) scripts.push(String(a[i + 1])); i++; continue; }
    if (opts && /^--expression=/.test(x)) { scripts.push(x.slice(13)); continue; }
    if (opts && /^-[a-df-zA-Z]*e./.test(x)) { scripts.push(x.slice(x.indexOf('e') + 1)); continue; }
    if (opts && /^-./.test(x)) continue;
    if (first) { scripts.push(x); first = false; }
  }
  return { scripts, fromFile };
}
function sedRunsOrWrites(script) {
  const s = String(script);
  let i = 0;
  const skipAddr = () => {
    for (;;) {
      while (i < s.length && /[\s\d$,~+!{]/.test(s[i])) i++;
      if (s[i] === '/' || (s[i] === '\\' && i + 1 < s.length)) {
        const d = s[i] === '/' ? '/' : s[++i];
        for (i++; i < s.length && s[i] !== d; i++) if (s[i] === '\\') i++;
        i++;
        while (i < s.length && /[IM]/.test(s[i])) i++;
        continue;
      }
      return;
    }
  };
  while (i < s.length) {
    skipAddr();
    const c = s[i];
    if (c == null) break;
    if (c === 'e' || c === 'w' || c === 'W') return true;
    if (c === 's' || c === 'y') {
      const d = s[i + 1];
      if (d == null) break;
      let n = 0;
      for (i += 2; i < s.length && n < 2; i++) { if (s[i] === '\\') i++; else if (s[i] === d) n++; }
      if (c === 's') { const fl = s.slice(i).match(/^[^;}\n]*/)[0]; if (/[ewW]/.test(fl)) return true; i += fl.length; }
    } else if (/[aic:bTtrRqQlLv#]/.test(c)) {
      // text / label / file-name arguments run to the end of the line
      while (i < s.length && s[i] !== '\n') i++;
    }
    while (i < s.length && s[i] !== ';' && s[i] !== '\n' && s[i] !== '}') i++;
    i++;
  }
  return false;
}
function sedCheck(w, hit) {
  const { scripts, fromFile } = sedScripts(w.slice(1));
  if (fromFile) hit('high', 'sed reads its script from a file; it cannot be checked');
  if (scripts.some(sedRunsOrWrites)) hit('high', 'sed script runs a shell command or writes a file (e / w)');
}

// kill [-SIG | -s SIG | -n NUM | --signal SIG] [--] pid...   (pid 1 / -1 = init / every process)
function killCheck(words, hit) {
  hit('high', 'terminates processes');
  const a = words.slice(1);
  let i = 0;
  if (a[i] === '-s' || a[i] === '-n' || a[i] === '--signal') i += 2;
  else if (a[i] && /^-/.test(a[i]) && a[i] !== '--' && a[i] !== '-l' && a[i] !== '-L') i += 1;
  if (a[i] === '--') i++;
  if (a.slice(i).some((p) => /^-?1$/.test(p))) hit('high', 'kill -1 / PID 1 kills everything', true);
}

const PS_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*\*?|[\\/]+\*?|\*|~[\\/]*\*?|\$(?:HOME|env:USERPROFILE|env:HOMEDRIVE|env:SystemDrive|env:SystemRoot|env:windir|\{env:USERPROFILE\})[\\/]*\*?|[A-Za-z]:[\\/]+(?:Windows|Users|Program Files(?: \(x86\))?|ProgramData)[\\/]*\*?)$/i;
const PS_REMOVE = /^(?:remove-item|ri|rm|del|erase|rd|rmdir)$/i;

// Remove-Item and its aliases (PowerShell parameter names may be abbreviated: -r, -Rec, -lp, ...)
function removeItemCheck(words, hit) {
  const a = words.slice(1);
  if (a.some((x) => /^\/[sq]$/i.test(x))) return; // cmd.exe syntax, see cmdDelCheck
  hit('high', 'deletes files permanently');
  const isParam = (x, name, min = 2) => /^-\w/.test(x) && x.length - 1 >= Math.min(min, name.length) && name.startsWith(x.slice(1).replace(/:.*$/, '').toLowerCase());
  const recurse = a.some((x) => isParam(x, 'recurse', 1));
  const targets = [];
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    if (isParam(x, 'path', 1) || isParam(x, 'literalpath', 1) || /^-(?:lp|pspath)$/i.test(x)) { if (a[i + 1] != null) targets.push(...a[++i].split(',')); continue; }
    if (/^-/.test(x)) { if (/^-(?:include|exclude|filter|credential|stream)/i.test(x)) i++; continue; }
    targets.push(...x.split(','));
  }
  if (recurse && targets.some((t) => PS_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive Remove-Item on a drive root, home or *', true);
}

const CMD_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*\*?(?:\.\*)?|[\\/]+\*?|\*(?:\.\*)?|%(?:USERPROFILE|HOMEDRIVE|HOMEPATH|SystemDrive|SystemRoot|windir)%[\\/]*\*?(?:\.\*)?)$/i;

// cmd.exe rd/rmdir/del/erase (also reached from PowerShell aliases with cmd-style switches)
function cmdDelCheck(words, hit) {
  hit('high', 'deletes files permanently');
  const a = words.slice(1);
  const recursive = a.some((x) => /^\/s$/i.test(x));
  if (recursive && a.filter((x) => !/^\/\w$/.test(x)).some((t) => CMD_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive delete of a drive root or home', true);
}

// /, ~, $HOME, system directories, drive roots (not the relative ., .., * that rm -r also treats as critical)
const critTarget = (t) => { const s = String(t).trim(); return ((POSIX_CRIT_TARGET.test(s) || PS_CRIT_TARGET.test(s)) && !/^(?:\.{1,2}\/*\*?|\*|\.\*|\.\/+\*)$/.test(s)) || sysCrit(s); };
const SYS_PATH = /^\/+(?:etc|boot|bin|sbin|usr|lib\w*|dev|proc|sys)(?:\/|$)/;
const NULL_SRC = /^\/dev\/(?:null|zero|u?random)$/;
const positional = (args) => { const out = []; let opts = true; for (const a of args) { if (opts && a === '--') { opts = false; continue; } if (opts && /^-./.test(a)) continue; out.push(a); } return out; };

// find's own leading options (-H -L -P -O3 -D debugopts) come before the starting points
const findArgs = (w) => { let a = w.slice(1); for (;;) { if (/^-[HLP]$|^-O\d*$/.test(a[0] || '')) a = a.slice(1); else if (a[0] === '-D') a = a.slice(2); else return a; } };

// find ROOT... -delete / -exec rm: bulk deletion; critical on /, ~, C:\ ...
function findCheck(w, hit) {
  const a = findArgs(w);
  const roots = [];
  for (const x of a) { if (/^[-(!]/.test(x)) break; roots.push(x); }
  const del = a.includes('-delete') || a.some((x, i) => /^-(?:exec|execdir|ok|okdir)$/.test(x) && /^(?:\S*\/)?(?:rm|shred|unlink)$/.test(a[i + 1] || ''));
  if (del && roots.some(critTarget)) hit('high', 'bulk deletion under /, ~ or a drive root', true);
}

// rsync --delete … DEST: makes DEST identical to the source, deleting everything else in it
function rsyncCheck(w, hit) {
  const a = w.slice(1);
  if (!a.some((x) => /^--(?:delete|del$|remove-source-files)/.test(x))) return;
  hit('high', 'rsync --delete removes files in the destination');
  const pos = positional(a);
  if (pos.length && critTarget(pos[pos.length - 1])) hit('high', 'rsync --delete onto /, ~ or a drive root', true);
}

// cp/mv/install/ln onto system files; /dev/null (or zero/random) copied over a file destroys it
function copyCheck(w, hit) {
  const pos = positional(w.slice(1));
  if (pos.length < 2) return;
  const dst = pos[pos.length - 1];
  const srcs = pos.slice(0, -1);
  if (SYS_PATH.test(normTarget(dst)) || normTarget(dst) === '/') hit('high', 'overwrites a system file or directory');
  // moving /etc, /usr, ~ ... away is as destructive as deleting them
  if (w[0].replace(/^.*[\\/]/, '') === 'mv') {
    if (srcs.some(critTarget)) hit('high', 'moves a system or home directory away', true);
    else if (srcs.some((x) => SYS_PATH.test(normTarget(x)))) hit('high', 'moves a system file');
  }
  if (srcs.some((s) => NULL_SRC.test(s)) && !/^\/dev\//.test(dst)) hit('high', `overwrites ${dst} with ${srcs.find((s) => NULL_SRC.test(s))}`, SYS_PATH.test(dst));
}

const LISTERS = /^(?:get-childitem|gci|dir|ls|get-item|gi)$/i;
// `Get-ChildItem C:\ -Recurse … | Remove-Item`, `find / … | xargs rm`: listing a root, deleting the results
function pipelineDeleteCheck(text, hit) {
  for (const stmt of String(text).split(/[;\n]|&&|\|\|/)) {
    const segs = stmt.split('|').map((p) => commandWords(simpleCommands(p, { winPaths: true })[0] || []));
    for (let i = 0; i < segs.length - 1; i++) {
      const w = segs[i];
      if (!w.length) continue;
      const head = w[0].replace(/^.*[\\/]/, '').toLowerCase();
      let rootList = false;
      if (head === 'find') { const roots = []; for (const x of findArgs(w)) { if (/^[-(!]/.test(x)) break; roots.push(x); } rootList = roots.some(critTarget); }
      else if (LISTERS.test(head)) {
        const a = w.slice(1);
        const rec = a.some((x) => /^-r(?:e(?:c(?:u(?:r(?:s(?:e)?)?)?)?)?)?$/i.test(x)) || head === 'ls' && a.some((x) => /^-[a-zA-Z]*R/.test(x));
        const targets = [];
        for (let k = 0; k < a.length; k++) {
          if (/^-(?:path|literalpath|lp|pspath)$/i.test(a[k])) { if (a[k + 1] != null) targets.push(a[++k]); continue; }
          if (/^-(?:filter|include|exclude|depth|attributes)$/i.test(a[k])) { k++; continue; }
          if (!/^-/.test(a[k])) targets.push(a[k]);
        }
        rootList = rec && targets.some(critTarget);
      }
      if (!rootList) continue;
      const del = segs.slice(i + 1).some((s) => {
        const h = (s[0] || '').replace(/^.*[\\/]/, '').toLowerCase();
        return PS_REMOVE.test(h) || (h === 'xargs' && s.some((x) => /^(?:\S*\/)?(?:rm|shred)$/.test(x)));
      });
      if (del) hit('high', 'bulk deletion under /, ~ or a drive root', true);
    }
  }
}

// chmod/chown/chgrp -R on /, ~, * ... (options may come in any order: chmod -R -v 777 ~); without -R on /, ~ or a
// system directory (`chmod 000 /`, `chmod 000 /etc`, `chown nobody /`): the system stops working
function permCheck(w, hit) {
  const a = w.slice(1);
  const targets = positional(a).slice(1);
  if (!a.some((x) => /^-[a-zA-Z]*R[a-zA-Z]*$/.test(x) || x === '--recursive')) {
    if (targets.some((t) => TOP_DIR.test(normTarget(t)) || /^[A-Za-z]:[\\/]*$/.test(String(t).trim()))) hit('high', 'permission/owner change on / or a system directory', true);
    else if (targets.some((t) => SYS_PATH.test(normTarget(t)) || /^(?:~|\$\{?HOME\}?)$/.test(normTarget(t)))) hit('high', 'changes permissions/owner of a system file or the home directory');
    return;
  }
  if (targets.some(critTarget)) hit('high', 'recursive permission/owner change on /, ~ or *', true);
}

// / and the top-level system directories themselves
const TOP_DIR = /^(?:\/|\/(?:bin|boot|dev|etc|home|lib\w*|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private))$/;
// whole disk devices (writing to them destroys the filesystem on them)
const RAW_DISK = /^\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk|rdisk|md|dm-|mapper\/|loop)\w*/;
// tee/cp/install/sponge/pv … onto a whole disk device (`cat x | sudo tee /dev/sda`)
function rawDiskWriteCheck(w, hit) {
  if (positional(w.slice(1)).some((x) => RAW_DISK.test(normTarget(x)))) hit('high', 'writes onto a raw disk device', true);
}

// Interpreters running inline code (`python3 -c`, `perl -e`, `ruby -e`, `node -e`, `php -r`, awk programs that call
// system()): the code is not shell and cannot be checked, so it is high. Its string literals are checked as commands
// (`system("rm -rf /")`) and file-deleting calls on /, ~ or a system directory (`shutil.rmtree('/')`) are critical.
const INTERP_CODE = [
  [/^(?:python[\d.]*|pypy[\d.]*)$/, /^-[a-zA-Z]*c$/],
  [/^perl[\d.]*$/, /^-[a-zA-Z]*[eE]$/],
  [/^(?:ruby|jruby)[\d.]*$/, /^-[a-zA-Z]*e$/],
  [/^(?:node|nodejs|bun)$/, /^(?:-e|-p|-pe|--eval|--print)$/],
  [/^php[\d.]*$/, /^-r$/],
  [/^(?:lua[\d.]*|luajit|julia|rscript|osascript|tclsh)$/, /^-e$/],
];
const AWK = /^(?:awk|gawk|mawk|nawk|busybox-awk)$/;
const DELETE_CALL = /\b(?:rmtree|rm_rf|rm_r|rmdir|removedirs|rmSync|rmdirSync|unlink(?:Sync)?|remove|rm|delete|chmod|chown|chmodSync|chownSync)\s*\(?\s*(?:path\s*=\s*)?[rb]?['"]([^'"]*)['"]/g;
function inlineCode(w) {
  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
  if (AWK.test(h)) {
    const a = w.slice(1);
    for (let i = 0; i < a.length; i++) {
      if (/^-[Fvf]$/.test(a[i])) { if (a[i] === '-f') return null; i++; continue; }
      if (/^-/.test(a[i])) continue;
      return /\bsystem\s*\(|\|\s*getline|\b(?:print|printf)\b[^;}]*(?:>|\|)/.test(a[i]) ? { h, code: a[i] } : null;
    }
    return null;
  }
  if (h === 'deno' && w[1] === 'eval') return { h, code: w.slice(2).join(' ') };
  const it = INTERP_CODE.find(([re]) => re.test(h));
  if (!it) return null;
  const i = w.findIndex((x, j) => j > 0 && it[1].test(x));
  return i > 0 && w[i + 1] != null ? { h, code: String(w[i + 1]) } : null;
}
function interpCheck(w, hit) {
  const ic = inlineCode(w);
  if (!ic) return;
  hit('high', `${ic.h} runs inline code; it cannot be checked`);
  codeCheck(ic, hit);
}
const INTERP_HEAD = /^(?:python[\d.]*|pypy[\d.]*|perl[\d.]*|(?:j?ruby)[\d.]*|node|nodejs|bun|deno|php[\d.]*|lua[\d.]*|luajit|julia|rscript|osascript|tclsh|awk|gawk|mawk|nawk)$/;
/**
 * Code fed to a shell or an interpreter on stdin by a here-string or heredoc (`bash <<< 'rm -rf /'`,
 * `python3 - <<< "import os; os.system('rm -rf /')"`, `python3 <<EOF`): a shell's here-string is checked as a
 * command; interpreter code is high (cannot be checked) and its literals / delete calls are checked as for `-c`.
 */
function stdinCodeCheck(w, hit, inner) {
  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
  const shell = SHELLS.test(h);
  if (!shell && !INTERP_HEAD.test(h)) return;
  const hs = w.indexOf('<<<');
  if (hs >= 0) {
    const code = String(w[hs + 1] ?? '');
    if (shell) { inner.push(code); return; }
    hit('high', `${h} runs code from a here-string; it cannot be checked`);
    codeCheck({ h, code }, hit);
    return;
  }
  if (w.some((x) => /^<<-?\S/.test(String(x)) || x === '<<' || x === '<<-')) hit('high', `${h} runs a heredoc script; it cannot be checked`);
}
function codeCheck(ic, hit) {
  const lits = [];
  for (const m of ic.code.matchAll(/'([^']*)'|"([^"]*)"|`([^`]*)`|\bqq?\s*([{(\[])([^})\]]*)[})\]]/g)) lits.push(m[1] ?? m[2] ?? m[3] ?? m[5]);
  for (const c of lits) {
    if (!c || !c.trim()) continue;
    const d = assessCommand(c, 'safe', { lenient: true });
    for (const m of d.warnings) hit(d.risk, m, d.critical);
  }
  for (const m of ic.code.matchAll(DELETE_CALL)) if (critTarget(m[1]) || SYS_PATH.test(normTarget(m[1]))) hit('high', `${ic.h} code deletes or changes /, ~ or a system directory`, true);
}

// tar -x … -C / (or --directory=/): extracting over the root or home directory
function tarCheck(w, hit) {
  const a = w.slice(1);
  const extract = a.some((x) => /^-[a-zA-Z]*x/.test(x) || x === '--extract' || x === '--get') || /^[a-wyzA-Z]*x[a-zA-Z]*$/.test(a[0] || '');
  if (!extract) return;
  const dirs = [];
  a.forEach((x, i) => {
    if (x === '-C' || x === '--directory') dirs.push(a[i + 1] ?? '');
    else if (/^-C./.test(x)) dirs.push(x.slice(2));
    else if (/^--directory=/.test(x)) dirs.push(x.slice(12));
  });
  if (dirs.some(critTarget)) hit('high', 'extracts an archive over /, ~ or a drive root', true);
}

// docker run -v /:/host …: the container gets the host's whole filesystem (read-write unless :ro)
function dockerCheck(w, hit) {
  const a = w.slice(1);
  if (!a.includes('run') && !a.includes('create')) return;
  const vols = [];
  a.forEach((x, i) => {
    if (x === '-v' || x === '--volume' || x === '--mount') vols.push(a[i + 1] || '');
    else if (/^(?:-v=?|--volume=|--mount=)/.test(x)) vols.push(x.replace(/^(?:-v=?|--volume=|--mount=)/, ''));
    else if (/^-[a-zA-Z]*v$/.test(x)) vols.push(a[i + 1] || ''); // -itv /:/h
  });
  for (const v of vols) {
    const host = v.split(':')[0];
    const src = (v.match(/(?:^|,)(?:source|src)=([^,]*)/) || [])[1];
    const root = (v.includes(':') && normTarget(host) === '/') || (src != null && normTarget(src) === '/');
    if (root) hit('high', 'mounts the host root filesystem into a container', !/:ro(?:,|$)|(?:^|,)(?:readonly|ro)(?:=true|=1)?(?:,|$)/.test(v));
  }
}

// [regex, risk, message, critical]
const RULES = [
  [/\bmkfs(?:\.\w+)?\b|\bmke2fs\b|\bwipefs\b/, 'high', 'formats a filesystem', true],
  [/\bdd\b[^|;&]*\bof=\/dev\//, 'high', 'dd writing to a raw device', true],
  [/>\s*\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk)\w*/, 'high', 'redirect onto a raw disk device', true],
  [/\b(?:chmod|chown|chgrp)\s+(?:\S+\s+)*(?:-[a-zA-Z]*R[a-zA-Z]*|--recursive)\s+(?:\S+\s+)*['"]?\/['"]?(?:\s|$|\*)/, 'high', 'recursive permission/owner change on /', true],
  [/\bchmod\s+(?:-\S+\s+)*0?777\b/, 'medium', 'chmod 777 makes files world-writable'],
  [/:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:/, 'high', 'fork bomb', true],
  [/\b(?:curl|wget|fetch)\b[^|;]*\|\s*(?:sudo\s+)?(?:\S*\/)?(?:ba|z|da|k|fi)?sh\b/, 'high', 'pipes a download straight into a shell'],
  [/(?:\b(?:ba|z|da|k|fi)?sh\b|\bsource\b|\beval\b|(?:^|[;&|(]\s*)\.)\s[^|;&]*(?:<\(|\$\(|`)\s*(?:sudo\s+)?(?:curl|wget|fetch)\b/, 'high', 'runs a downloaded script'],
  [/\bsudo\b|\bdoas\b/, 'medium', 'runs with root privileges'],
  // text piped into a shell runs as a script whose content is not known here
  [/\|\s*(?:(?:sudo|doas)\s+(?:-\S+\s+)*)?(?:\S*\/)?(?:ba|z|da|k|fi|c|tc|a|mk)?sh\b(?!\s+-[a-zA-Z]*c\b)(?![\w.-])/, 'high', 'runs piped text as a shell script'],
  [/\|\s*(?:iex|Invoke-Expression)\b/i, 'high', 'runs piped text as a PowerShell script'],
  [/\bfind\b.*\s-delete\b|\bfind\b.*-exec(?:dir)?\s+(?:\S*\/)?rm\b|\bxargs\s+(?:-\S+\s+)*(?:\S*\/)?rm\b/, 'high', 'bulk deletion via find/xargs'],
  [/\bgit\s+push\b[^;&|]*\s(?:--force(?:-with-lease|-if-includes)?\b|-[a-zA-Z]*f\b|\+[^\s:]*(?::\S*)?|--mirror\b)/, 'high', 'force-push rewrites remote history'],
  [/\bgit\s+push\b[^;&|]*\s(?:--delete\b|-d\b|:\S)/, 'high', 'deletes a remote branch'],
  [/\bgit\s+reset\b[^;&|]*\s--(?:hard|merge|keep)\b|\bgit\s+clean\b[^;&|]*\s(?:-[a-zA-Z]*f|--force\b)|\bgit\s+restore\b|\bgit\s+checkout\b[^;&|]*\s(?:--\s|-f\b|--force\b|\.(?:\s|$))|\bgit\s+switch\b[^;&|]*\s(?:-f\b|--force\b|--discard-changes\b)/, 'high', 'discards uncommitted work'],
  [/\bgit\s+branch\b[^;&|]*\s(?:-D\b|-[a-zA-Z]*d[a-zA-Z]*f|--delete\s+--force|--force\s+--delete)/, 'high', 'force-deletes a branch'],
  [/\bgit\s+stash\s+(?:drop|clear)\b/, 'high', 'deletes stashed changes'],
  [/\bdocker\s+(?:system|volume|image|container|network|builder)\s+prune\b|\bdocker\s+(?:rmi?|container\s+rm|image\s+rm|volume\s+rm)\b/, 'high', 'deletes docker data'],
  [/\b(?:shutdown|reboot|halt|poweroff)\b|\binit\s+[06]\b/, 'high', 'shuts down / reboots the machine'],
  [/\b(?:pkill|killall)\b|\bdocker\s+kill\b/, 'high', 'terminates processes'],
  [/\b(?:shred|wipe|blkdiscard|truncate)\b[^|;&]*\s['"]?\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk|md|dm-|mapper\/|loop)\w*/, 'high', 'destroys a whole disk device', true],
  [/\b(?:shred|truncate)\b[^|;&]*\s['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'destroys the contents of a system file', true],
  [/\b(?:shred|truncate)\b/, 'high', 'destroys file contents'],
  [/\biptables\s+-F\b|\bufw\s+disable\b/, 'high', 'drops firewall rules'],
  [/\bmv\s+\S+\s+\/dev\/null\b/, 'high', 'moves a file into /dev/null (deletes it)', true],
  // redirections: N>, N>>, &>, >|, >> onto system files; any other file write is medium
  [/(?:^|[^>])(?:\d*|&)>(?!>)\|?\s*['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'overwrites a system file', true],
  [/(?:\d*|&)>>\|?\s*['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'appends to a system file'],
  // text piped into an interpreter with no script runs it as code (`curl … | python3`, `cat x | perl -`)
  [/\|\s*(?:(?:sudo|doas)\s+(?:-\S+\s+)*)?(?:\S*\/)?(?:python[\d.]*|perl[\d.]*|ruby|node|php[\d.]*)(?:\s+-)?\s*(?:$|[;&|)])/, 'high', 'runs piped text as a script'],
  [/(?:^|[^<>=-])(?:\d+|&)?>>?\|?(?!&|>)\s*(?!['"]?\/dev\/(?:null|stdout|stderr)\b)['"]?[^\s&|;)]/, 'medium', 'redirect writes to a file'],
  [/\btee\b/, 'medium', 'tee writes to a file'],
  [/\bsed\s+(?:-\S+\s+)*(?:-i|--in-place)\b/, 'medium', 'edits files in place'],
  [/\bcrontab\s+-r\b/, 'high', 'removes all cron jobs', true],
  // PowerShell
  [/\bRemove-Item\b|\bClear-Content\b/i, 'high', 'deletes files permanently'],
  [/\bStop-Process\b|\bspps\b|\btaskkill\b/i, 'high', 'terminates processes'],
  [/\bFormat-Volume\b|\bClear-Disk\b|\bInitialize-Disk\b|(?:^|[;&|(]\s*)format\s+[a-z]:/i, 'high', 'formats a disk', true],
  [/\b(?:Stop|Restart)-Computer\b|\bshutdown(?:\.exe)?\s+\/[srp]\b/i, 'high', 'shuts down / reboots the machine'],
  [/\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|curl|wget)\b[^|;]*\|\s*(?:iex|Invoke-Expression)\b/i, 'high', 'pipes a download straight into PowerShell'],
  [/\b(?:iex|Invoke-Expression)\b[^|;]*\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|curl|wget|DownloadString|DownloadData|Net\.WebClient)\b|\[scriptblock\]::Create\([^;]*\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|DownloadString)\b/i, 'high', 'runs a downloaded script'],
  [/\bSet-ExecutionPolicy\b|\bStart-Process\b.*-Verb\s+RunAs/i, 'medium', 'changes security policy / elevates'],
  [/\b(?:Stop|Restart|Start|Set)-Service\b/i, 'medium', 'changes a service'],
  [/\b(?:Set-Content|Out-File|Add-Content|Rename-Item|Move-Item|Copy-Item|New-Item|Set-Acl|Compress-Archive|Expand-Archive)\b/i, 'medium', 'modifies files'],
  [/\bdocker\s+stop\b/, 'medium', 'stops containers'],
];

// `git -C dir -c k=v --no-pager reset` -> `git reset`; `docker --context x -H h rm` -> `docker rm`
const OPTVAL = String.raw`(?:'[^']*'|"[^"]*"|[^\s;&|'"])+`;
const GIT_GLOBALS = new RegExp(String.raw`\bgit((?:\s+(?:(?:-C|-c|--git-dir|--work-tree|--namespace|--super-prefix|--config-env|--exec-path)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
const DOCKER_GLOBALS = new RegExp(String.raw`\bdocker((?:\s+(?:(?:-H|--host|-c|--context|--config|-l|--log-level|--tls\w*)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
export function normalizeGlobals(command) {
  return String(command).replace(GIT_GLOBALS, 'git').replace(DOCKER_GLOBALS, 'docker');
}

// ---------------------------------------------------------------------------------------------
// Allowlist (v0.3): only the commands and flags tellsh knows are safe. The known set is what the catalog itself renders
// for every shell (src/allowlist-data.js, generated by scripts/build_allowlist.js and checked by a test). Any wrapper
// (sudo, env, timeout, xargs, nohup, bash -c, ...), an environment assignment in front of a command, a program the set
// does not have, a subcommand of a multi-command tool it does not have (`git filter-branch`, `npx cowsay`) or a flag it
// does not have for that command (`gh pr merge --admin`, `rm -P`) makes the command high risk: it is shown with the
// reason and needs an explicit confirmation. The deny rules above still run; the allowlist only ever escalates.

// tools whose first words name a subcommand (`git push`, `docker compose up`, `npx wrangler deploy`, `gh pr merge`)
export const SUB_DEPTH = { git: 1, docker: 2, podman: 2, npm: 1, npx: 3, pnpm: 1, yarn: 1, gh: 2, systemctl: 1, apt: 1, 'apt-get': 1,
  dnf: 1, yum: 1, brew: 1, winget: 1, pip: 1, pip3: 1, kubectl: 1, wrangler: 2, timedatectl: 1, journalctl: 0, launchctl: 1,
  certutil: 0, python3: 0, py: 0 };
const PWSH_CMDLET = /^[a-z]+-[a-z]+$/;
// `-w32`, `-n5`: an option with its number attached is the option
const flagKey = (head, f) => {
  let x = String(f);
  if (/^--[^=]+=/.test(x)) x = x.replace(/=.*$/s, '=');
  else if (/^\/[A-Za-z?]{1,2}:/.test(x)) x = x.replace(/:.*$/s, ':');
  else if (/^-[A-Za-z]\d+$/.test(x)) x = x.replace(/\d+$/, '#');
  return PWSH_CMDLET.test(head) ? x.toLowerCase() : x;
};
// a word that is an option: -x, --long, -Param (PowerShell), /x (cmd.exe, short: never a path like /tmp); `-3`, `-10M`
// (find -mtime -3) and `-` (stdin) are values
const isFlag = (w) => /^-(?!\d)[^\s]/.test(w) && w !== '--' || /^\/[A-Za-z?]{1,2}(?::\S*)?$/.test(w) || /^\/[+-]\w*$/.test(w);
// the program as written: a path (`./x`, `/tmp/ls`, `C:\\t\\ls.exe`) is not the allowlisted program of the same name
const baseName = (w) => String(w).replace(/\.exe$/i, '').toLowerCase();
// a value the catalog renders where the tokenizer expects a program, by its shape: a number (`(Get-Date).AddMinutes(-4320)`),
// an argument list item (`.Replace('a', 'b')`), an environment variable (`$env:FOO`). Any other word is a program as written.
export const headKey = (w) => {
  const x = baseName(w);
  if (/^-?\d+(?:\.\d+)?$/.test(x)) return '<num>';
  if (/,$/.test(x) && x.length > 1) return '<arg>,';
  if (/^\$env:[a-z_]\w*$/.test(x)) return '$env:<var>';
  return x;
};

/**
 * The shape of one simple command: { head, key (head + known subcommand words), flags, assign, rest }.
 * `known(key)` says whether a longer key exists (checking); without it the subcommand words are taken up to SUB_DEPTH
 * (building the allowlist from rendered templates, where `literal(w)` tells a template word from an inserted value).
 */
export function commandShape(words, { known, literal = () => true } = {}) {
  let i = 0;
  const assign = [];
  while (i < words.length && /^[A-Za-z_]\w*=/.test(words[i])) assign.push(words[i++]);
  const head = headKey(words[i] ?? '');
  let key = head;
  let j = i + 1;
  const depth = SUB_DEPTH[head] ?? 0;
  for (let d = 0; d < depth && j < words.length; d++) {
    const w = String(words[j]);
    if (isFlag(w) || /^\d+$/.test(w) || !literal(w)) break;
    const next = `${key} ${w.toLowerCase()}`;
    if (known && !known(next)) break;
    key = next;
    j++;
  }
  const flags = [];
  const rest = [];
  let opts = true;
  for (; j < words.length; j++) {
    const w = String(words[j]);
    if (opts && w === '--') { opts = false; continue; }
    if (opts && isFlag(w)) flags.push(w); else rest.push(w);
  }
  return { head, key, flags, assign, rest };
}

// ssh: host plus a remote command (`ssh host rm -rf /`) runs that command; options with a value are not operands
const SSH_OPTARG = /^-[BbcDEeFIiJLlmOoPpQRSWw]$/;
const sshOperands = (words) => { let n = 0; for (let k = 1; k < words.length; k++) { if (SSH_OPTARG.test(words[k])) k++; else if (!/^-/.test(words[k])) n++; } return n; };
// shell keywords in front of a command (`… do taskkill`, `else New-Item …`, `& 'node'`): syntax, not a wrapper
export const KEYWORDS = new Set(['then', 'do', 'else', 'elif', '&', '!', 'time']);
// `$(…)`, `` `…` `` (also inside "…") and `<(…)` / `>(…)` outside '…' run a command the allowlist cannot see as written;
// `$((…))` with an arithmetic body is arithmetic, not a command
export function substitution(command) {
  const s = String(command);
  let dq = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '\\') { i++; continue; }
    if (c === '$' && s[i + 1] === "'" && !dq) { i = ansiEnd(s, i); continue; }
    if (c === "'" && !dq) { const j = s.indexOf("'", i + 1); if (j < 0) return null; i = j; continue; }
    if (c === '"') { dq = !dq; continue; }
    if (c === '`') return 'command';
    if (c === '$' && s[i + 1] === '(') {
      const m = s.slice(i).match(/^\$\(\(([^()]*(?:\([^()]*\)[^()]*)*)\)\)/);
      if (m && !m[1].includes('$(') && /^[\w\s+\-*/%$]*$/.test(m[1].replace(/[()]/g, ''))) { i += m[0].length - 1; continue; }
      return 'command';
    }
    if (!dq && (c === '<' || c === '>') && s[i + 1] === '(') return 'process';
  }
  return null;
}

let PREFIXES = null;
/** Problems the allowlist finds in a command ([] when every simple command, subcommand and flag is known). */
export function allowlistProblems(command, { extra = null } = {}) {
  const table = ALLOW;
  // extra: { key: flags } a caller vouches for (the composer's validated tool vocabulary), added to the table's
  const keyFlags = (k) => (extra?.[k] ? [...(table[k] || []), ...extra[k].map((f) => flagKey(k.split(' ')[0], f))] : table[k]);
  PREFIXES ??= new Set(Object.keys(ALLOW).flatMap((k) => k.split(' ').slice(1).map((_, i, a) => k.split(' ').slice(0, i + 1).join(' '))));
  const prefix = (k) => PREFIXES.has(k) || (extra && Object.keys(extra).some((e) => e.startsWith(k + ' ')));
  const out = [];
  const seen = new Set();
  const add = (m) => { if (!seen.has(m)) { seen.add(m); out.push(m); } };
  const subst = substitution(command);
  if (subst) add(`runs a ${subst} substitution; not on the allowlist`);
  for (let words of [...simpleCommands(command), ...simpleCommands(command, { winPaths: true })]) {
    while (words.length && KEYWORDS.has(String(words[0]).toLowerCase())) words = words.slice(1);
    if (!words.length) continue;
    const sh = commandShape(words, { known: (k) => keyFlags(k) != null || prefix(k) });
    if (sh.assign.length) add(`sets environment variables for the command (${sh.assign.map((a) => a.split('=')[0]).join(', ')}); not on the allowlist`);
    if (!sh.head) continue;
    // a wrapper with an operand runs it (`sudo rm x`, `timeout 5 ls`, `bash -c "…"`); alone it is a program (`env | sort`)
    if (((WRAPPERS.has(sh.head) || RUNNERS.has(sh.head)) && sh.head !== 'ssh' && sh.rest.length) || (SHELLS.test(sh.head) && sh.flags.some((f) => /^-[a-z]*c[a-z]*$/i.test(f)))) {
      add(`runs another command through a wrapper (${sh.head}); only commands on the allowlist are trusted`);
      continue;
    }
    if (sh.head === 'ssh' && sshOperands(words) > 1) {
      add('runs a remote command over ssh; not on the allowlist');
      continue;
    }
    const allowed = keyFlags(sh.key);
    if (allowed == null && prefix(sh.key)) { add(`unknown subcommand (${[sh.key, ...sh.rest.slice(0, 1)].join(' ')}); not on the allowlist`); continue; }
    if (allowed == null) { add(`unknown command (${sh.key}); not on the allowlist`); continue; }
    if ((SUB_DEPTH[sh.head] ?? 0) > 0 && sh.key === sh.head && sh.rest.length && !allowed.includes('*sub')) {
      add(`unknown subcommand (${sh.head} ${sh.rest[0]}); not on the allowlist`);
      continue;
    }
    for (const f of sh.flags) {
      const k = flagKey(sh.head, f);
      if (allowed.includes(k) || (/^-[A-Za-z]#$/.test(k) && allowed.includes(k.slice(0, 2)))) continue;
      // a cluster of known single-letter options (`ls -la` when -l and -a are known)
      if (/^-[A-Za-z]{2,}$/.test(f) && !PWSH_CMDLET.test(sh.head) && [...f.slice(1)].every((c) => allowed.includes(`-${c}`))) continue;
      add(`unknown option ${f} for ${sh.key}; not on the allowlist`);
    }
  }
  return out;
}

/**
 * The parser's reading of a command: deny rules, structural checks and the allowlist. It only ever raises `baseRisk`;
 * a `safe` result here does not make a command safe (see checkDanger).
 * @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}}
 */
export function assessCommand(command, baseRisk = 'safe', { lenient = false, allowlist = null } = {}) {
  let risk = baseRisk;
  const warnings = [];
  let critical = false;
  const hit = (r, msg, crit) => {
    risk = maxRisk(risk, r);
    if (!warnings.includes(msg)) warnings.push(msg);
    if (crit) critical = true;
  };
  const text = normalizeGlobals(command);
  const inner = [];
  const flags = {};
  // structural checks run on both readings of backslashes (POSIX escapes / Windows path separators)
  for (const words of [...simpleCommands(text), ...simpleCommands(text, { winPaths: true })]) {
   for (const w of commandChains(words, inner, flags)) {
    const head = w[0].replace(/^.*[\\/]/, '');
    const lower = head.toLowerCase().replace(/\.exe$/, '');
    // a lone string with spaces is a command handed to another program ('…' | bash)
    if (w.length === 1 && /\s/.test(w[0])) inner.push(w[0]);
    // the program itself depends on the shell state (`$CMD -rf /`, `$(which rm) -rf /`, `& $tool`): unknown
    if (!lenient && /^[$`]/.test(head)) hit('high', 'runs a command whose name depends on the shell state; it cannot be checked');
    if (head === 'rm' || head === 'unlink') rmCheck(w, hit);
    else if (head === 'kill') killCheck(w, hit);
    else if (/^(?:rd|rmdir|del|erase)$/i.test(head)) {
      const a = w.slice(1);
      if (!a.some((x) => /^\/[a-z]$/i.test(x)) && a.some((x) => /^-\w/.test(x))) removeItemCheck(w, hit);
      else cmdDelCheck(w, hit);
    } else if (PS_REMOVE.test(lower)) removeItemCheck(w, hit);
    else if (head === 'find') findCheck(w, hit);
    else if (head === 'rsync') rsyncCheck(w, hit);
    else if (['cp', 'mv', 'install', 'ln'].includes(head)) copyCheck(w, hit);
    else if (['chmod', 'chown', 'chgrp'].includes(head)) permCheck(w, hit);
    else if (head === 'tar' || head === 'bsdtar' || head === 'gtar') tarCheck(w, hit);
    else if (head === 'docker' || head === 'podman') dockerCheck(w, hit);
    else if (lower === 'sed' || lower === 'gsed') sedCheck(w, hit);
    if (['tee', 'cp', 'install', 'sponge', 'pv', 'mv', 'ln'].includes(lower)) rawDiskWriteCheck(w, hit);
    interpCheck(w, hit);
    stdinCodeCheck(w, hit, inner);
    if (head === 'git' && w[1] === 'rm') hit('high', 'rm deletes files permanently (no trash)');
    sysFileWriteCheck(w, head, hit);
   }
  }
  if (flags.unsure) hit('high', flags.unsure);
  if (flags.privileged) hit('medium', 'runs with root privileges');
  // `-c` values of other programs: checked as commands, but a name like "$PAT" is not a command name there
  for (const c of new Set(flags.lenient || [])) {
    if (!c.trim() || inner.includes(c)) continue;
    const d = assessCommand(c, 'safe', { lenient: true });
    for (const m of d.warnings) hit(d.risk, m, d.critical);
  }
  pipelineDeleteCheck(text, hit);
  for (const c of new Set(inner)) {
    if (c === command || !c.trim()) continue;
    // the allowlist judges the command as written (a wrapper around a payload is already high); payloads get the deny rules
    const d = assessCommand(c, 'safe', { allowlist: { off: true } });
    for (const m of d.warnings) hit(d.risk, m, d.critical);
  }
  for (const [re, r, msg, crit] of RULES) if (re.test(text)) hit(r, msg, crit);
  if (!lenient && !allowlist?.off) for (const m of allowlistProblems(command, { extra: allowlist?.extra })) hit('high', m);
  return { risk, warnings, critical };
}

// ---------------------------------------------------------------------------------------------
// Trust rule (v0.3 close3). A command is rated safe ONLY when it is byte-identical to a render of a catalog template whose
// intent is risk=safe, with slot values that are plain literals (plainSlotValue). Anything else (composer output, a
// history replay, a user edit, an unknown program, a construct the parser does not read) is at least high and needs an
// explicit "yes"; --yes never runs it. The parser above only raises risk, never lowers it: it adds the reasons and
// catches what must be retyped (critical), but a command it finds nothing wrong with is still not trusted.

export const UNTRUSTED = 'not a catalog command rendered by tellsh with plain values (edited, composed, from history or unknown); it is not checked as safe';

// characters a plain slot value never has: quotes (tellsh's own single quotes are the only ones), $ and backticks
// (expansion, $'…'), command separators and redirections, control characters, PowerShell's typographic quotes
const NOT_PLAIN = /['"`$;|&<>\u0000-\u001f\u007f\u2018-\u201f]/;
// find primaries that run, delete or write (`-exec`, `-ok`, `-delete`, `-fprint`, `-fls`)
const FIND_ACTION = /(?:^|\s)-(?:exec|execdir|ok|okdir|delete|fprint0?|fprintf|fls)(?=\s|$)/;
// a slot rendered where the program goes (`{cmd} --version`): a plain program name, never a path or a shell builtin
// that runs a file or a string
const COMMAND_SLOTS = new Set(['cmd']);
const NOT_A_PROGRAM = /^(?:source|\.|eval|exec|builtin|command|sudo|doas|su|env|xargs|bash|sh|zsh|dash|ksh|fish|pwsh|powershell|cmd|iex|invoke-expression)$/i;
/**
 * Whether a slot value is a plain literal: a number, or a string without quotes, $, backticks, ; | & < >, control
 * characters or find actions. `dashOk`: a leading `-` is fine (a path rendered as `./-x`, a raw value its validator
 * accepted, `-mtime -1`); otherwise it could be read as an option.
 */
export function plainSlotValue(name, value, { dashOk = false } = {}) {
  if (value == null) return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value !== 'string') return false;
  if (NOT_PLAIN.test(value) || FIND_ACTION.test(value)) return false;
  if (/^-/.test(value) && !dashOk) return false;
  if (COMMAND_SLOTS.has(name) && (!/^[A-Za-z0-9][\w.+-]*$/.test(value) || NOT_A_PROGRAM.test(value))) return false;
  return true;
}

/**
 * The risk of a final command. `rendered`: the caller vouches that `command` is exactly what tellsh rendered from a catalog
 * template with plain slot values (fill.js buildCommand); `baseRisk` is then the intent's risk. Without it the command
 * is at least high.
 * @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}}
 */
export function checkDanger(command, baseRisk = 'safe', { rendered = false, allowlist = null } = {}) {
  const d = assessCommand(command, baseRisk, { allowlist });
  if (rendered || d.risk === 'high') return d;
  return { risk: 'high', warnings: [UNTRUSTED, ...d.warnings], critical: d.critical };
}

exec
/bin/bash -lc 'cat package.json; git diff 0d87457..HEAD -- src/cli.js src/model.js src/render.js src/tools.js src/catalog.js src/variants.js; cat src/shellwords.js' in /workspace/tellsh
 succeeded in 0ms:
{
  "name": "tellsh",
  "version": "0.3.0",
  "description": "Offline natural-language (Polish & English) to shell command CLI: tool->intent->slot cascade of tiny linear models + templates for bash/zsh/sh/PowerShell (fish/cmd best effort). No LLM at runtime, zero dependencies.",
  "type": "module",
  "bin": {
    "tellsh": "bin/tellsh.js"
  },
  "main": "src/cli.js",
  "exports": {
    ".": "./src/cli.js",
    "./pipeline": "./src/pipeline.js",
    "./classifier": "./src/classifier.js",
    "./cascade": "./src/cascade.js",
    "./tagger": "./src/tagger.js",
    "./fill": "./src/fill.js",
    "./slots": "./src/slots.js",
    "./danger": "./src/danger.js",
    "./catalog": "./src/catalog.js",
    "./history": "./src/history.js",
    "./env": "./src/env.js",
    "./compose": "./src/compose.js",
    "./package.json": "./package.json",
    "./hybrid": "./src/rerank/hybrid.js"
  },
  "files": [
    "bin/tellsh.js",
    "src/*.js",
    "src/rerank/*.js",
    "model/model.bin",
    "model/tldr_triggers.json",
    "model/compose_explained.json",
    "README.md",
    "DATA_LICENSES.md",
    "LICENSE"
  ],
  "engines": {
    "node": ">=18"
  },
  "scripts": {
    "test": "node --test test/",
    "gen-data": "node scripts/gen_data.js",
    "train": "node scripts/gen_data.js && python3 scripts/train.py && node scripts/build_triggers.js",
    "tldr": "python3 -I scripts/tldr_ingest.py",
    "teacher": "node scripts/teacher.js",
    "eval": "node scripts/eval.js",
    "bench": "taskset -c 0 node scripts/bench.js",
    "prepack": "node -e \"for (const f of ['model/model.bin','model/tldr_triggers.json','model/compose_explained.json']) require('fs').statSync(f)\""
  },
  "keywords": [
    "cli",
    "bash",
    "shell",
    "natural-language",
    "nl2bash",
    "offline",
    "polish",
    "intent-classification",
    "terminal",
    "powershell",
    "zsh",
    "slot-filling"
  ],
  "author": "lksrz <lukasz@wearfits.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/lksrz/tellsh.git"
  },
  "dependencies": {},
  "peerDependencies": {
    "onnxruntime-node": ">=1.20.0",
    "tellsh-model-enc": "0.4.x"
  },
  "peerDependenciesMeta": {
    "onnxruntime-node": {
      "optional": true
    },
    "tellsh-model-enc": {
      "optional": true
    }
  }
}
diff --git a/src/catalog.js b/src/catalog.js
index f98833f..8de627c 100644
--- a/src/catalog.js
+++ b/src/catalog.js
@@ -72,6 +72,8 @@ export const INTENTS = [
   T('tail_follow', 'Follow a (log) file live', 'tail -f {file}',
     { file: '/var/log/syslog' }, 'safe', { darwinDefaults: { file: '/var/log/system.log' } }),
   T('cat_file', 'Print a file contents', 'cat {file}', { file: null }),
+  T('print_line_range', 'Show a range of lines of a file (lines N to M)',
+    "sed -n '{start!raw},{end!raw}p' {file}", { file: null, start: null, end: null }),
   T('compress_targz', 'Compress a directory/file into tar.gz',
     'tar -czvf {archive} {path}', { path: '.', archive: null }, 'medium'),
   T('extract_targz', 'Extract a tar.gz archive', 'tar -xzvf {file}«-C {dest}»', { file: null }, 'medium'),
@@ -180,7 +182,7 @@ export const INTENTS = [
   T('failed_services', 'List failed services', 'systemctl --failed --no-pager', {}),
   T('dmesg', 'Kernel messages (dmesg)', 'sudo dmesg | tail -n {count!raw}', { count: 50 }),
   T('battery', 'Battery level/status',
-    'cat /sys/class/power_supply/BAT*/capacity 2>/dev/null || upower -i "$(upower -e | grep -m1 BAT)"',
+    'cat /sys/class/power_supply/BAT*/capacity 2>/dev/null || upower -i /org/freedesktop/UPower/devices/DisplayDevice',
     {}, 'safe', { darwin: 'pmset -g batt' }),
   T('temperature', 'CPU temperature sensors', 'sensors', {}, 'safe',
     { darwin: 'sudo powermetrics --samplers smc -n 1 | grep -i temp', notes: 'needs lm-sensors on Linux' }),
@@ -210,6 +212,8 @@ export const INTENTS = [
     "curl -s -o /dev/null -w '%{http_code}\\n' {url}", { url: null }),
   T('download_file', 'Download a file from a URL', 'curl -fLO {url}', { url: null }, 'medium'),
   T('ssh_connect', 'Connect to a server over SSH', 'ssh {target}', { target: null }, 'medium'),
+  T('ssh_port_forward', 'Forward a local port to the same port on a server over SSH (tunnel)',
+    'ssh -N -L {port!raw}:localhost:{port!raw} {target}', { port: null, target: null }, 'medium'),
 
   // ---------- git ----------
   T('git_status', 'Show git working tree status', 'git status', {}),
@@ -249,6 +253,42 @@ export const INTENTS = [
   T('docker_stats', 'Container resource usage', 'docker stats --no-stream', {}),
   T('docker_compose_up', 'Start docker compose services', 'docker compose up -d', {}, 'medium'),
   T('docker_compose_down', 'Stop docker compose services', 'docker compose down', {}, 'medium'),
+
+  // ---------- developer tools (v0.4, from real command usage) ----------
+  // project scripts and installs run arbitrary package code: medium
+  T('npm_run_script', 'Run a package.json script with npm (npm run dev/build/test)', 'npm run {script}', { script: null }, 'medium'),
+  T('npm_install', 'Install the project dependencies (or one package) with npm', 'npm {npmverb!raw}«{pkg}»', { npmverb: 'install' }, 'medium'),
+  T('npm_install_global', 'Install an npm package globally', 'npm install -g {pkg}', { pkg: null }, 'medium',
+    { notes: 'may need sudo when the global prefix is not user-writable' }),
+  T('pip_install', 'Install a Python package with pip', 'python3 -m pip install {pkg}', { pkg: null }, 'medium'),
+  T('activate_venv', 'Activate a Python virtual environment', '. {path}/bin/activate', { path: '.venv' }, 'medium',
+    { notes: 'run it in your own shell: activating from tellsh only affects a subshell that exits right away' }),
+  T('tool_version', 'Show the installed version of a command-line tool', '{cmd} --version', { cmd: null }),
+  T('cli_help', 'Show the built-in help (--help) of a command', '{cmd} --help', { cmd: null }),
+
+  // ---------- Cloudflare wrangler ----------
+  // a dry run ("do a dry run of wrangler deploy") and an environment ("deploy worker to staging") are kept, never dropped
+  // for a deploy to the default target
+  T('wrangler_deploy', 'Deploy a Cloudflare Worker with wrangler', 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»«{args!raw}»', {}, 'medium'),
+  // npx prefers a project-local wrangler binary, so every npx wrangler command may run project code (and wrangler dev
+  // runs the configured build command): medium, like npm_run_script, never auto-run with --yes
+  T('wrangler_dev', 'Run a Cloudflare Worker locally (wrangler dev)', 'npx wrangler dev«--env {wenv!raw}»«{args!raw}»', {}, 'medium'),
+  T('wrangler_tail', 'Stream live logs of a deployed Cloudflare Worker', 'npx wrangler tail«--env {wenv!raw}»«{args!raw}»', {}, 'medium'),
+  T('wrangler_secret_put', 'Set a secret (environment variable) on a Cloudflare Worker', 'npx wrangler secret put {var!raw}«--env {wenv!raw}»«{args!raw}»',
+    { var: null }, 'medium', { notes: 'wrangler prompts for the value, so it never lands in shell history' }),
+  T('wrangler_login', 'Log in to Cloudflare with wrangler', 'npx wrangler login«{args!raw}»', {}, 'medium'),
+  T('wrangler_whoami', 'Show which Cloudflare account wrangler is logged in as', 'npx wrangler whoami«{args!raw}»', {}, 'medium'),
+
+  // ---------- GitHub CLI ----------
+  T('gh_auth_status', 'Show GitHub CLI login status', 'gh auth status«{args!raw}»', {}),
+  T('gh_auth_login', 'Log in to GitHub with the gh CLI', 'gh auth login«{args!raw}»', {}),
+  T('gh_pr_list', 'List pull requests of the repository', 'gh pr list«--repo {repo!raw}»«{args!raw}»', {}),
+  T('gh_pr_view', 'Show a pull request', 'gh pr view«{pr!raw}»«--repo {repo!raw}»', {}),
+  T('gh_pr_create', 'Create a pull request from the current branch', 'gh pr create --fill«--repo {repo!raw}»«{args!raw}»', {}, 'medium'),
+  T('gh_pr_checks', 'Show CI check status of a pull request', 'gh pr checks«{pr!raw}»«--repo {repo!raw}»', {}),
+  T('gh_pr_merge', 'Merge a pull request', 'gh pr merge«{pr!raw}»«--repo {repo!raw}»«{delbranch!raw}»', {}, 'medium'),
+  T('gh_run_list', 'List recent GitHub Actions workflow runs', 'gh run list«--repo {repo!raw}»«{args!raw}»', {}),
+  T('gh_run_view', 'Show a GitHub Actions run (and its failed logs)', 'gh run view«{num!raw}»«--repo {repo!raw}»', {}),
 ];
 
 export const BY_ID = Object.fromEntries(INTENTS.map((i) => [i.id, i]));
diff --git a/src/cli.js b/src/cli.js
index c4f433c..1eb3c56 100644
--- a/src/cli.js
+++ b/src/cli.js
@@ -8,6 +8,8 @@ import { suggest as pipelineSuggest } from './pipeline.js';
 import { checkDanger, maxRisk } from './danger.js';
 import { detectEnv, normShell, normOs } from './env.js';
 import { loadHistory } from './history.js';
+import { joinArgs } from './shellwords.js';
+import { suggestLazy } from './rerank/hybrid.js';
 
 const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
 
@@ -28,10 +30,13 @@ Options:
       --json        machine-readable output (implies --dry-run)
       --shell <s>   target shell: bash|zsh|sh|powershell|fish|cmd (default: detected)
       --os <o>      target OS: linux|darwin|win32 (default: this machine); --platform is an alias
-      --history[=FILE]  use the last ~10 shell history lines to resolve "it", "same for /var", ...
+      --history[=FILE]  use the previous shell command to resolve "it", "same for /var", ...
                     (read in memory only, never stored or logged; also TELLSH_HISTORY=1)
       --no-compose  never fall back to the experimental flag composer
       --compose     force the experimental composer
+      --hybrid      when unsure, re-rank with the optional neural model (needs onnxruntime-node and the
+                    tellsh-model-enc bundle; see HYBRID.md; also TELLSH_HYBRID=1, or =safe to never
+                    turn a rejection into an answer)
       --top <k>     show k candidate intents (default 3)
       --threshold <p>  override confidence threshold
   -v, --version     print version
@@ -48,7 +53,7 @@ const riskColor = (r) => (r === 'high' ? C.red : r === 'medium' ? C.yellow : C.g
 
 export function parseArgs(argv) {
   const o = { dryRun: false, yes: false, explain: false, json: false, top: 3, words: [], threshold: undefined, shell: undefined, os: undefined,
-    history: process.env.TELLSH_HISTORY === '1', historyFile: undefined, compose: 'auto' };
+    history: process.env.TELLSH_HISTORY === '1', historyFile: undefined, compose: 'auto', hybrid: ['1', 'safe'].includes(process.env.TELLSH_HYBRID) };
   for (let i = 0; i < argv.length; i++) {
     const a = argv[i];
     if (a === '--') { o.words.push(...argv.slice(i + 1)); break; }
@@ -58,7 +63,11 @@ export function parseArgs(argv) {
     else if (a === '--json') { o.json = true; o.dryRun = true; }
     else if (a === '--top') o.top = Math.max(1, parseInt(argv[++i], 10) || 3);
     else if (a.startsWith('--top=')) o.top = Math.max(1, parseInt(a.slice(6), 10) || 3);
-    else if (a === '--threshold') o.threshold = parseFloat(argv[++i]);
+    else if (a === '--threshold' || a.startsWith('--threshold=')) {
+      const v = a === '--threshold' ? argv[++i] : a.slice(12);
+      o.threshold = /^\s*(?:\d+(?:\.\d*)?|\.\d+)\s*$/.test(v ?? '') ? Number(v) : NaN;
+      if (!(o.threshold >= 0 && o.threshold <= 1)) o.badThreshold = v ?? '';
+    }
     else if (a === '--platform' || a === '--os') o.os = argv[++i];
     else if (a.startsWith('--os=') || a.startsWith('--platform=')) o.os = a.split('=')[1];
     else if (a === '--shell') o.shell = argv[++i];
@@ -68,6 +77,8 @@ export function parseArgs(argv) {
     else if (a === '--no-history') o.history = false;
     else if (a === '--compose') o.compose = 'force';
     else if (a === '--no-compose') o.compose = 'off';
+    else if (a === '--hybrid') o.hybrid = true;
+    else if (a === '--no-hybrid') o.hybrid = false;
     else if (a === '-v' || a === '--version') o.version = true;
     else if (a === '-h' || a === '--help') o.help = true;
     else o.words.push(a);
@@ -103,7 +114,9 @@ export function shellInvocation(command, shell) {
     const bin = hasBin('pwsh') ? 'pwsh' : 'powershell';
     return [bin, ['-NoProfile', '-Command', command]];
   }
-  if (shell === 'cmd') return ['cmd.exe', ['/d', '/s', '/c', command]];
+  // with /s, cmd strips the first and last `"` of everything after /c: wrap the command in one more
+  // pair so a command that itself starts/ends with a quote ("C:\Program Files\x.exe" ...) survives
+  if (shell === 'cmd') return ['cmd.exe', ['/d', '/s', '/c', `"${command}"`]];
   if (shell === 'fish') return ['fish', ['-c', command]];
   const envShell = process.env.SHELL && normShell(process.env.SHELL) === shell ? process.env.SHELL : null;
   return [envShell || shell || 'bash', ['-c', command]];
@@ -145,16 +158,24 @@ export async function main(argv = process.argv.slice(2)) {
   const opts = parseArgs(argv);
   if (opts.version) { console.log(pkg.version); return 0; }
   if (opts.help || !opts.words.length) { console.log(HELP); return opts.help ? 0 : 2; }
-  const query = opts.words.join(' ');
+  if (opts.badThreshold != null) { console.error(`tellsh: --threshold needs a number between 0 and 1 (got "${opts.badThreshold}")`); return 2; }
+  // the shell removed the quotes: a word with spaces is quoted again so "/tmp/a b" stays one path ("delete folder" as
+  // the first of several arguments is request text; a quoted argument that is neither is unclear: see joinArgs)
+  const joined = joinArgs(opts.words);
+  const query = joined?.text;
+  if (joined == null) { console.error('tellsh: an argument contains spaces and both kinds of quotes; it cannot be read as one value'); return 2; }
   if (opts.shell && !normShell(opts.shell)) { console.error(`tellsh: unknown shell "${opts.shell}" (bash|zsh|sh|powershell|fish|cmd)`); return 2; }
   if (opts.os && !normOs(opts.os)) { console.error(`tellsh: unknown OS "${opts.os}" (linux|darwin|win32)`); return 2; }
   let s;
   try {
     getModel();
     const env = detectEnv({ shell: opts.shell, os: opts.os });
-    // history is read only when asked for, kept in memory for this call, never printed or stored
-    const history = opts.history ? loadHistory({ shell: env.shell, file: opts.historyFile, n: 10 }) : undefined;
-    s = pipelineSuggest(query, { top: opts.top, threshold: opts.threshold, env, history, cwd: process.cwd(), compose: opts.compose });
+    // history is read only when asked for, kept in memory for this call, never printed or stored. Only the previous
+    // command is a reference target; the line before it is read too because some shells (zsh, fish, PSReadLine)
+    // write this `tellsh …` call to the file before it runs, and buildContext drops it.
+    const history = opts.history ? loadHistory({ shell: env.shell, file: opts.historyFile, n: 2 }) : undefined;
+    const so = { top: opts.top, threshold: opts.threshold, env, history, cwd: process.cwd(), compose: opts.compose, unclearArgs: joined.unclear };
+    s = opts.hybrid ? await suggestLazy(query, { ...so, system: process.env.TELLSH_HYBRID === 'safe' ? 'A+B-safe' : 'A+B' }) : pipelineSuggest(query, so);
   } catch (e) {
     console.error(`tellsh: ${e.message}`);
     return 1;
@@ -164,6 +185,12 @@ export async function main(argv = process.argv.slice(2)) {
     console.log(JSON.stringify(s, null, 2));
     return s.understood ? 0 : 3;
   }
+  if (!s.understood && s.context?.rule === 'refused') {
+    // a history reference that cannot be resolved safely: nothing to suggest
+    console.log(`Cannot resolve "${query}" from history: ${s.hint || s.context.note || 'not guessing'}.`);
+    console.log(C.dim('Name the target explicitly.'));
+    return 3;
+  }
   if (!s.understood) {
     console.log(`I don't understand "${query}" (confidence ${(s.confidence * 100).toFixed(0)}% < ${(s.threshold * 100).toFixed(0)}%).`);
     console.log('Did you mean:');
@@ -184,8 +211,9 @@ export async function main(argv = process.argv.slice(2)) {
   const interactive = process.stdin.isTTY && process.stdout.isTTY;
   const shellName = s.shell;
   if (opts.yes) {
-    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog') {
-      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' ? 'resolved from history' : s.missing.length ? 'incomplete' : s.risk;
+    const fromHistory = Object.values(s.slotSources || {}).includes('history');
+    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog' || fromHistory || s.hybrid?.deferred) {
+      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' || fromHistory ? 'resolved from history' : s.missing.length ? 'incomplete' : s.hybrid?.deferred ? 're-ranked by the neural fallback' : s.risk;
       console.log(C.yellow(`  --yes only auto-runs safe catalog commands; this one is ${why}. Not running.`));
       return 4;
     }
@@ -208,7 +236,8 @@ export async function main(argv = process.argv.slice(2)) {
     if (ans === 'e' || ans === 'edit') {
       command = (await editLine(command)).trim();
       if (!command) return 130;
-      const d = checkDanger(command, s.baseRisk);
+      // unchanged: the suggestion as rated; any change is a user edit, at least high (danger.js trust rule)
+      const d = command === s.command ? { risk: s.risk, warnings: s.warnings, critical: s.critical } : checkDanger(command, s.baseRisk);
       risk = maxRisk(s.baseRisk, d.risk);
       critical = d.critical;
       incomplete = /<[A-Z_]+>/.test(command);
diff --git a/src/model.js b/src/model.js
index 6ff252d..ee74346 100644
--- a/src/model.js
+++ b/src/model.js
@@ -7,14 +7,28 @@ import { fileURLToPath } from 'node:url';
 export const DEFAULT_MODEL = fileURLToPath(new URL('../model/model.bin', import.meta.url));
 
 export function loadModel(path = DEFAULT_MODEL) {
-  const buf = readFileSync(path);
-  if (buf.toString('latin1', 0, 4) !== 'TSH2') throw new Error(`bad model file (expected TSH2): ${path}`);
+  return parseModel(readFileSync(path), path);
+}
+
+/** Parse a TSH2 buffer; every size and offset is checked so a truncated/corrupt file gives a clear error. */
+export function parseModel(buf, path = '<buffer>') {
+  const bad = (why) => new Error(`bad model file ${path}: ${why}`);
+  if (buf.length < 8 || buf.toString('latin1', 0, 4) !== 'TSH2') throw bad('expected TSH2 magic');
   const hlen = buf.readUInt32LE(4);
-  const header = JSON.parse(buf.toString('utf8', 8, 8 + hlen));
-  const ab = buf.buffer.slice(buf.byteOffset + 8 + hlen, buf.byteOffset + buf.length);
+  if (hlen === 0 || 8 + hlen > buf.length) throw bad(`header length ${hlen} exceeds the file size ${buf.length}`);
+  let header;
+  try { header = JSON.parse(buf.toString('utf8', 8, 8 + hlen)); } catch (e) { throw bad(`header is not valid JSON (${e.message})`); }
+  if (!header || typeof header.models !== 'object' || header.models === null) throw bad('header has no models');
+  // copy into a fresh, 4-byte aligned ArrayBuffer so typed-array views are always valid
+  const ab = new Uint8Array(buf.subarray(8 + hlen)).buffer;
+  const isCount = (n) => Number.isSafeInteger(n) && n >= 0;
   const models = {};
   for (const [name, m] of Object.entries(header.models)) {
+    if (!m || !Array.isArray(m.labels) || !m.labels.length) throw bad(`model ${name}: missing labels`);
+    if (!isCount(m.rows) || !isCount(m.offset) || m.offset % 4) throw bad(`model ${name}: invalid rows/offset`);
     const C = m.labels.length;
+    const need = m.rows * 4 + C * 8 + m.rows * C;
+    if (m.offset + need > ab.byteLength) throw bad(`model ${name}: data (${need} bytes at offset ${m.offset}) exceeds the file`);
     let off = m.offset;
     const rowIds = new Uint32Array(ab, off, m.rows); off += m.rows * 4;
     const scale = new Float32Array(ab, off, C); off += C * 4;
diff --git a/src/render.js b/src/render.js
index 1a1c8f5..6f5ef6f 100644
--- a/src/render.js
+++ b/src/render.js
@@ -12,21 +12,24 @@ import { VARIANTS } from './variants.js';
 // never a leading `=`: zsh expands `=word` to the path of command `word`
 const SAFE_POSIX = /^[A-Za-z0-9_\/.,:@%+-][A-Za-z0-9_\/.,:@%+=-]*$/;
 
-/** POSIX shell quoting. Keeps a leading ~/ unquoted so tilde expansion still works. */
-export function shQuote(value) {
+// Every quote function takes { tilde }: true (default) only for path slots, where a leading ~ means
+// the home directory; any other value (grep pattern, commit message, sed text) stays a literal `~`.
+
+/** POSIX shell quoting. Keeps a leading ~/ of a path unquoted so tilde expansion still works. */
+export function shQuote(value, { tilde: expand = true } = {}) {
   const s = String(value);
   if (s === '') return "''";
-  const tilde = s.match(/^~(\/|$)(.*)$/s);
+  const tilde = expand && s.match(/^~(\/|$)(.*)$/s);
   if (tilde) return '~' + tilde[1] + (tilde[2] ? shQuote(tilde[2]) : '');
-  if (SAFE_POSIX.test(s)) return s;
+  if (SAFE_POSIX.test(s) && !s.startsWith('~')) return s;
   return "'" + s.replace(/'/g, `'\\''`) + "'";
 }
 
 /** fish: inside single quotes only \\ and \' are escapes. */
-export function fishQuote(value) {
+export function fishQuote(value, { tilde: expand = true } = {}) {
   const s = String(value);
   if (s === '') return "''";
-  const tilde = s.match(/^~(\/|$)(.*)$/s);
+  const tilde = expand && s.match(/^~(\/|$)(.*)$/s);
   if (tilde) return '~' + tilde[1] + (tilde[2] ? fishQuote(tilde[2]) : '');
   if (/^[A-Za-z0-9_\/.,:@+-][A-Za-z0-9_\/.,:@+=-]*$/.test(s)) return s;
   return "'" + s.replace(/[\\']/g, '\\$&') + "'";
@@ -42,9 +45,9 @@ const PS_DQ_SPECIAL = /[`$"\u201C\u201D\u201E]/g;
  * string both as a command argument and inside an expression (.Replace('a', 'b'), -match 'x').
  * ~ becomes $HOME in a double-quoted string.
  */
-export function psQuote(value) {
+export function psQuote(value, { tilde: expand = true } = {}) {
   const s = String(value);
-  const tilde = s.match(/^~(?:[/\\](.*))?$/s);
+  const tilde = expand && s.match(/^~(?:[/\\](.*))?$/s);
   if (tilde) {
     if (!tilde[1]) return '$HOME';
     return '"$HOME/' + tilde[1].replace(PS_DQ_SPECIAL, '`$&') + '"';
@@ -53,18 +56,27 @@ export function psQuote(value) {
 }
 
 export class UnquotableError extends Error {}
+/** A cmd.exe value starting with `/`: refused only where it stands alone as an argument (see cmdTemplate). */
+export class SwitchValueError extends UnquotableError {}
 
 /**
  * cmd.exe (best effort): double quotes, ~ -> %USERPROFILE%. cmd expands %VAR% (and !VAR! with delayed
  * expansion) even inside double quotes and has no escape for `"` inside them, so values containing
  * % ! " or control characters are refused (the intent is reported as a gap for cmd).
  */
-export function cmdQuote(value) {
+export function cmdQuote(value, { tilde: expand = true, attached = false } = {}) {
   let s = String(value);
-  s = s.replace(/^~(?=[/\\]|$)/, '%USERPROFILE%');
-  const body = s.replace(/^%USERPROFILE%/, '');
+  const home = expand && /^~(?=[/\\]|$)/.test(s);
+  if (home) s = '%USERPROFILE%' + s.slice(1);
+  const body = home ? s.slice('%USERPROFILE%'.length) : s;
   if (/[%!"\r\n\0]/.test(body)) throw new UnquotableError(`value ${JSON.stringify(String(value))} cannot be quoted safely for cmd.exe`);
-  if (/^[A-Za-z0-9_\\\/.:@+=%-]+$/.test(s)) return s.replace(/\//g, (m) => (/^[A-Za-z]:|%USERPROFILE%/.test(s) ? '\\' : m));
+  // cmd built-ins read /x as a switch even when quoted ("delete directory /q" -> rmdir /s /q); a value
+  // glued to a switch (findstr /c:{pattern}) is not an argument of its own and is fine
+  if (/^\//.test(s) && !attached) throw new SwitchValueError(`value ${JSON.stringify(String(value))} starts with / and would be read as a cmd.exe switch`);
+  // Windows paths: / -> \ (an unquoted foo/q could be read as foo /q by built-ins); other values that
+  // contain / are double-quoted
+  if (expand || /^[A-Za-z]:|%USERPROFILE%/.test(s)) s = s.replace(/\//g, '\\');
+  if (/^[A-Za-z0-9_\\.:@+=%-]+$/.test(s)) return s;
   return '"' + s + '"';
 }
 
@@ -83,6 +95,34 @@ function posixTemplate(intent, env) {
   return { tpl: intent.template, variant: 'posix' };
 }
 
+const CMD_HOLD = /\uE000(\d+)\uE001/g;
+const cmdTemplates = new WeakMap();
+/**
+ * Function templates for cmd.exe: a value starting with `/` is refused only where it is an argument of
+ * its own. Glued to a switch (`findstr /c:${q(pattern)}`) it cannot be read as one, so it is kept.
+ */
+function cmdTemplate(fn) {
+  if (!cmdTemplates.has(fn)) {
+    cmdTemplates.set(fn, (vals, q, ctx) => {
+      const held = [];
+      const q2 = (v, o) => {
+        try { return q(v, o); } catch (err) {
+          if (!(err instanceof SwitchValueError)) throw err;
+          held.push({ v, err });
+          return `\uE000${held.length - 1}\uE001`;
+        }
+      };
+      const out = fn(vals, q2, ctx);
+      return out.replace(CMD_HOLD, (m, i, at) => {
+        const h = held[+i];
+        if (!/\/\w+:$/.test(out.slice(0, at))) throw h.err;
+        return cmdQuote(h.v, { tilde: false, attached: true });
+      });
+    });
+  }
+  return cmdTemplates.get(fn);
+}
+
 /**
  * -> { tpl, kind: 'posix'|'fish'|'pwsh'|'cmd', variant, wrapPosix?: boolean, gap?: string }
  * wrapPosix: render the POSIX template and wrap it as `bash -c '...'` (PowerShell on unix).
@@ -103,10 +143,38 @@ export function chooseTemplate(intent, env) {
     return { tpl: null, kind: 'pwsh', gap: v.gaps?.pwsh || 'no PowerShell equivalent on Windows yet' };
   }
   if (shell === 'cmd') {
-    if (v.cmd) return { tpl: v.cmd, kind: 'cmd', variant: 'cmd' };
+    if (v.cmd) return { tpl: typeof v.cmd === 'function' ? cmdTemplate(v.cmd) : v.cmd, kind: 'cmd', variant: 'cmd' };
     return { tpl: null, kind: 'cmd', gap: v.gaps?.cmd || 'no cmd.exe equivalent yet (try PowerShell)' };
   }
   return { ...posixTemplate(intent, env), kind: 'posix' };
 }
 
-export const quoteForKind = (kind, wrapPosix) => (wrapPosix ? shQuote : { posix: shQuote, fish: fishQuote, pwsh: psQuote, cmd: cmdQuote }[kind]);
+/**
+ * PowerShell 5.1 and pwsh < 7.3 ("Legacy" native argument passing) build a native program's command
+ * line by wrapping arguments with spaces in "..." without escaping embedded `"` (and a trailing `\`
+ * then escapes the closing quote); empty arguments are dropped. `\"` would be right for Legacy but
+ * wrong for 7.3+ (Standard/Windows), so no escaping is correct for both: values like that are refused
+ * for native programs (git, tar, curl.exe, ssh, ...) and the intent is reported as a gap. Cmdlets and
+ * .NET expressions receive the single-quoted literal unchanged and are not affected.
+ */
+export const unsafeNativePwshArg = (v) => { const s = String(v); return s === '' || s.includes('"') || (/\s/.test(s) && /\\$/.test(s)); };
+const PS_KEYWORDS = new Set(['if', 'elseif', 'else', 'foreach', 'for', 'while', 'do', 'switch', 'return', 'try', 'catch', 'finally']);
+/** Slots of a PowerShell string template that are arguments of a native program (not a cmdlet/expression). */
+export function pwshNativeSlots(tpl) {
+  const out = new Set();
+  if (typeof tpl !== 'string') return out;
+  // Placeholders are masked first (same length, so indices still line up): the `{` of an earlier
+  // slot must not be taken for a script-block brace, which made that placeholder look like the
+  // command head and skipped every later slot (`tar -czvf {archive} {path}`, `scp {target}:{dst}`).
+  const masked = tpl.replace(/\{(\w+)(!raw)?\}/g, (m) => '\u0001'.repeat(m.length)).replace(/[«»]/g, ' ');
+  for (const m of tpl.matchAll(/\{(\w+)(!raw)?\}/g)) {
+    if (m[2]) continue;
+    const seg = masked.slice(0, m.index).split(/[;|{}(]/).pop();
+    // the first word of the segment that is not (part of) a placeholder
+    const head = seg.trim().split(/\s+/).find((w) => w && !/\u0001/.test(w)) || '';
+    if (/^[A-Za-z][\w.-]*$/.test(head) && !/^[A-Za-z]+-[A-Za-z]+$/.test(head) && !PS_KEYWORDS.has(head.toLowerCase())) out.add(m[1]);
+  }
+  return out;
+}
+
+export const quoteForKind =(kind, wrapPosix) => (wrapPosix ? shQuote : { posix: shQuote, fish: fishQuote, pwsh: psQuote, cmd: cmdQuote }[kind]);
diff --git a/src/tools.js b/src/tools.js
index c06039a..9a07c8a 100644
--- a/src/tools.js
+++ b/src/tools.js
@@ -14,7 +14,7 @@ export const FAMILIES = {
   sort: ['sort_uniq'],
   ls: ['list_files'],
   fileinfo: ['file_type', 'file_stat'],
-  head: ['head_file'],
+  head: ['head_file', 'print_line_range'],
   tail: ['tail_file', 'tail_follow'],
   cat: ['cat_file'],
   tar: ['compress_targz', 'extract_targz', 'list_archive'],
@@ -58,13 +58,19 @@ export const FAMILIES = {
   dig: ['dns_lookup'],
   traceroute: ['traceroute'],
   nc: ['port_check'],
-  ssh: ['ssh_connect'],
+  ssh: ['ssh_connect', 'ssh_port_forward'],
   git: ['git_status', 'git_log', 'git_diff', 'git_diff_staged', 'git_branches', 'git_current_branch',
     'git_new_branch', 'git_switch_branch', 'git_delete_branch', 'git_undo_commit', 'git_discard_changes',
     'git_stash', 'git_stash_pop', 'git_pull', 'git_push', 'git_clone', 'git_add_all', 'git_commit',
     'git_remote', 'git_blame', 'git_init'],
   docker: ['docker_ps', 'docker_ps_all', 'docker_logs', 'docker_images', 'docker_stop', 'docker_stop_all',
     'docker_prune', 'docker_exec', 'docker_stats', 'docker_compose_up', 'docker_compose_down'],
+  npm: ['npm_run_script', 'npm_install', 'npm_install_global'],
+  python: ['pip_install', 'activate_venv'],
+  cli: ['tool_version', 'cli_help'],
+  wrangler: ['wrangler_deploy', 'wrangler_dev', 'wrangler_tail', 'wrangler_secret_put', 'wrangler_login', 'wrangler_whoami'],
+  gh: ['gh_auth_status', 'gh_auth_login', 'gh_pr_list', 'gh_pr_view', 'gh_pr_create', 'gh_pr_checks', 'gh_pr_merge',
+    'gh_run_list', 'gh_run_view'],
 };
 
 /** Label used by stage 1 for requests that are not shell tasks at all (chit-chat). */
@@ -82,7 +88,7 @@ export const SLOT_TAG = {
   path: 'PATH', file: 'PATH', src: 'PATH', dst: 'PATH', dest: 'PATH', archive: 'PATH',
   count: 'NUM', depth: 'NUM', size: 'SIZE', age: 'TIME', days: 'TIME', since: 'TIME',
   port: 'PORT', pid: 'PID', mode: 'MODE', ext: 'EXT', glob: 'EXT', url: 'URL', host: 'HOST', target: 'HOST',
-  name: 'NAME', service: 'NAME', container: 'NAME', pkg: 'NAME', cmd: 'NAME', branch: 'BRANCH', user: 'USER',
+  name: 'NAME', service: 'NAME', container: 'NAME', pkg: 'NAME', cmd: 'NAME', script: 'NAME', start: 'NUM', end: 'NUM', num: 'NUM', pr: 'NUM', branch: 'BRANCH', user: 'USER',
   pattern: 'PATTERN', old: 'PATTERN', new: 'REPL', message: 'MSG', var: 'VAR', text: 'TEXT',
 };
 
diff --git a/src/variants.js b/src/variants.js
index 4a171b3..e934046 100644
--- a/src/variants.js
+++ b/src/variants.js
@@ -170,6 +170,10 @@ export const VARIANTS = {
     pwsh: 'Get-Content -LiteralPath {file}',
     cmd: 'type {file}',
   },
+  print_line_range: {
+    pwsh: 'Get-Content -LiteralPath {file} | Select-Object -Index (({start!raw} - 1)..({end!raw} - 1))',
+    gaps: { cmd: 'cmd.exe has no command that prints a line range of a file' },
+  },
   compress_targz: {
     pwsh: 'tar -czvf {archive} {path}', // tar.exe ships with Windows 10 1803+
     cmd: 'tar -czvf {archive} {path}',
@@ -432,7 +436,7 @@ export const VARIANTS = {
     cmd: 'taskschd.msc',
   },
   journal_service: {
-    pwsh: { win: "Get-WinEvent -FilterHashtable @{ LogName = 'System'; ProviderName = 'Service Control Manager' } -MaxEvents 1000 -ErrorAction SilentlyContinue | Where-Object Message -Like ('*' + {service} + '*')«| Where-Object TimeCreated -GT (Get-Date).AddMinutes(-{minutes!raw})» | Select-Object -First {count!raw}" },
+    pwsh: { win: "Get-WinEvent -FilterHashtable @{ LogName = 'System'; ProviderName = 'Service Control Manager' } -MaxEvents 1000 -ErrorAction SilentlyContinue | Where-Object Message -Match ([regex]::Escape({service}))«| Where-Object TimeCreated -GT (Get-Date).AddMinutes(-{minutes!raw})» | Select-Object -First {count!raw}" },
     gaps: { cmd: 'wevtutil cannot filter events by message text' },
   },
   journal_errors: {
@@ -476,7 +480,7 @@ export const VARIANTS = {
   battery: {
     fish: (s, q, ctx) => ((ctx && ctx.os) === 'darwin'
       ? 'pmset -g batt'
-      : 'set -l b /sys/class/power_supply/BAT*/capacity; if test (count $b) -gt 0; cat $b; else; upower -i (upower -e | grep -m1 BAT); end'),
+      : 'set -l b /sys/class/power_supply/BAT*/capacity; if test (count $b) -gt 0; cat $b; else; upower -i /org/freedesktop/UPower/devices/DisplayDevice; end'),
     pwsh: { win: 'Get-CimInstance -ClassName Win32_Battery | Select-Object Name, EstimatedChargeRemaining, BatteryStatus' },
     gaps: { cmd: 'powercfg /batteryreport only writes an HTML report' },
   },
@@ -554,6 +558,10 @@ export const VARIANTS = {
     pwsh: 'ssh {target}',
     cmd: 'ssh {target}',
   },
+  ssh_port_forward: {
+    pwsh: 'ssh -N -L {port!raw}:localhost:{port!raw} {target}', // OpenSSH client ships with Windows 10 1809+
+    cmd: 'ssh -N -L {port!raw}:localhost:{port!raw} {target}',
+  },
 
   // ---------- git ----------
   git_status: { pwsh: 'git status', cmd: 'git status' },
@@ -608,4 +616,33 @@ export const VARIANTS = {
   docker_stats: { pwsh: 'docker stats --no-stream', cmd: 'docker stats --no-stream' },
   docker_compose_up: { pwsh: 'docker compose up -d', cmd: 'docker compose up -d' },
   docker_compose_down: { pwsh: 'docker compose down', cmd: 'docker compose down' },
+
+  // ---------- developer tools (v0.4) ----------
+  // npm / npx / gh / ssh are the same native programs in PowerShell and cmd.exe
+  npm_run_script: { pwsh: 'npm run {script}', cmd: 'npm run {script}' },
+  npm_install: { pwsh: 'npm {npmverb!raw}«{pkg}»', cmd: 'npm {npmverb!raw}«{pkg}»' },
+  npm_install_global: { pwsh: 'npm install -g {pkg}', cmd: 'npm install -g {pkg}' },
+  pip_install: { pwsh: { win: 'py -m pip install {pkg}', unix: 'python3 -m pip install {pkg}' }, cmd: 'py -m pip install {pkg}' },
+  tool_version: { pwsh: '& {cmd} --version', cmd: '{cmd} --version' },
+  cli_help: { pwsh: '& {cmd} --help', cmd: '{cmd} --help' },
+  wrangler_deploy: { pwsh: 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»«{args!raw}»', cmd: 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»«{args!raw}»' },
+  wrangler_dev: { pwsh: 'npx wrangler dev«--env {wenv!raw}»«{args!raw}»', cmd: 'npx wrangler dev«--env {wenv!raw}»«{args!raw}»' },
+  wrangler_tail: { pwsh: 'npx wrangler tail«--env {wenv!raw}»«{args!raw}»', cmd: 'npx wrangler tail«--env {wenv!raw}»«{args!raw}»' },
+  wrangler_secret_put: { pwsh: 'npx wrangler secret put {var!raw}«--env {wenv!raw}»«{args!raw}»', cmd: 'npx wrangler secret put {var!raw}«--env {wenv!raw}»«{args!raw}»' },
+  wrangler_login: { pwsh: 'npx wrangler login«{args!raw}»', cmd: 'npx wrangler login«{args!raw}»' },
+  wrangler_whoami: { pwsh: 'npx wrangler whoami«{args!raw}»', cmd: 'npx wrangler whoami«{args!raw}»' },
+  gh_auth_status: { pwsh: 'gh auth status«{args!raw}»', cmd: 'gh auth status«{args!raw}»' },
+  gh_auth_login: { pwsh: 'gh auth login«{args!raw}»', cmd: 'gh auth login«{args!raw}»' },
+  gh_pr_list: { pwsh: 'gh pr list«--repo {repo!raw}»«{args!raw}»', cmd: 'gh pr list«--repo {repo!raw}»«{args!raw}»' },
+  gh_pr_view: { pwsh: 'gh pr view«{pr!raw}»«--repo {repo!raw}»', cmd: 'gh pr view«{pr!raw}»«--repo {repo!raw}»' },
+  gh_pr_create: { pwsh: 'gh pr create --fill«--repo {repo!raw}»«{args!raw}»', cmd: 'gh pr create --fill«--repo {repo!raw}»«{args!raw}»' },
+  gh_pr_checks: { pwsh: 'gh pr checks«{pr!raw}»«--repo {repo!raw}»', cmd: 'gh pr checks«{pr!raw}»«--repo {repo!raw}»' },
+  gh_pr_merge: { pwsh: 'gh pr merge«{pr!raw}»«--repo {repo!raw}»«{delbranch!raw}»', cmd: 'gh pr merge«{pr!raw}»«--repo {repo!raw}»«{delbranch!raw}»' },
+  gh_run_list: { pwsh: 'gh run list«--repo {repo!raw}»«{args!raw}»', cmd: 'gh run list«--repo {repo!raw}»«{args!raw}»' },
+  gh_run_view: { pwsh: 'gh run view«{num!raw}»«--repo {repo!raw}»', cmd: 'gh run view«{num!raw}»«--repo {repo!raw}»' },
+  activate_venv: {
+    fish: 'source {path}/bin/activate.fish',
+    pwsh: { win: "& (Join-Path {path} 'Scripts/Activate.ps1')", unix: "& (Join-Path {path} 'bin/Activate.ps1')" },
+    cmd: 'call {path}\\Scripts\\activate.bat',
+  },
 };
// Shell-aware word splitting for history lines and command comparison (POSIX sh/bash/zsh, fish
// approximated as POSIX, and PowerShell). Not a full parser: it understands quoting, escapes,
// command separators and redirections, and flags every word whose value depends on the shell
// state (expansions, unquoted globs), so callers never act on a guessed value.
//
// splitCommand(line, kind) -> { ok, segments: [{ words: string[], raw: string[] }] }
//   ok=false: unterminated quote, heredoc, or other syntax we do not interpret
//   words[i]: the literal value, or AMB + raw text when it contains an expansion ($x, $(..), `..`,
//             {a,b}), or GLOB + raw text when it contains an unquoted * ? [
// Redirections (`> f`, `2>&1`, `<in`) are dropped together with their target (keepRedirects: kept as
// words, e.g. ['ls', '>', 'out']). Each segment records the separator that ended it (sep: ; | && || &).

export const AMB = '\u0000';
export const GLOB = '\u0001';
export const isAmbiguous = (w) => typeof w === 'string' && (w.startsWith(AMB) || w.startsWith(GLOB));
export const isExpansion = (w) => typeof w === 'string' && w.startsWith(AMB);
export const isGlob = (w) => typeof w === 'string' && w.startsWith(GLOB);
export const rawOf = (w) => (isAmbiguous(w) ? w.slice(1) : w);

const PS_SQ = /['‘’‚‛]/;
const PS_DQ = /["“”„]/;

// index of the `)` closing the `(` at `open` (quotes skipped), or -1
function matchParen(s, open) {
  let depth = 0;
  for (let j = open; j < s.length; j++) {
    const d = s[j];
    if (d === "'") { const e = s.indexOf("'", j + 1); if (e < 0) return -1; j = e; continue; }
    if (d === '"') { let e = j + 1; while (e < s.length && s[e] !== '"') e += s[e] === '\\' ? 2 : 1; if (e >= s.length) return -1; j = e; continue; }
    if (d === '\\') { j++; continue; }
    if (d === '(') depth++;
    else if (d === ')' && --depth === 0) return j;
  }
  return -1;
}

export function splitCommand(line, kind = 'posix', { keepRedirects = false, literalTilde = true } = {}) {
  const ps = kind === 'pwsh' || kind === 'powershell';
  const s = String(line);
  const segments = [];
  let words = [];
  let raws = [];
  let w = null; // current word value
  let raw = '';
  let amb = false;
  let glob = false;
  let quoted0 = false; // the word starts with a quoted or escaped character
  let dropNext = false; // next word is a redirection target
  const flushWord = () => {
    if (w == null) return;
    // POSIX: a quoted/escaped leading ~ ('~/x', \~/x) is a directory literally named ~, not the home
    // directory; ./~/x keeps that meaning wherever the value is rendered again
    if (!ps && literalTilde && quoted0 && w.startsWith('~')) w = './' + w;
    if (dropNext) { dropNext = false; } else {
      words.push(amb ? AMB + raw : glob ? GLOB + raw : w);
      raws.push(raw);
    }
    w = null; raw = ''; amb = false; glob = false; quoted0 = false;
  };
  // open `( … )` subshells (posix): each segment records the ids of those it runs in (`subs`), so a `cd` inside one
  // is known not to outlast it
  const subs = [];
  let subId = 0;
  const flushSeg = (sep = '') => { flushWord(); if (words.length) segments.push({ words, raw: raws, sep, ...(subs.length ? { subs: [...subs] } : {}) }); else if (sep && segments.length) segments[segments.length - 1].sep += sep; words = []; raws = []; };
  const fail = () => ({ ok: false, segments: [] });

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const start = i;
    if (w == null && (ps ? PS_SQ.test(c) || PS_DQ.test(c) : c === "'" || c === '"' || c === '\\')) quoted0 = true;
    if (ps ? PS_SQ.test(c) : c === "'") {
      // single-quoted literal; PowerShell doubles any single-quote character to escape it
      let v = '';
      let j = i + 1;
      for (;; j++) {
        if (j >= s.length) return fail();
        if (ps ? PS_SQ.test(s[j]) : s[j] === "'") {
          if (ps && PS_SQ.test(s[j + 1] || '')) { v += s[++j]; continue; }
          break;
        }
        v += s[j];
      }
      w = (w ?? '') + v; i = j;
    } else if (ps ? PS_DQ.test(c) : c === '"') {
      let v = '';
      let j = i + 1;
      // PowerShell "$HOME/..." (how tellsh renders ~/...) is the home directory
      const home = ps && w == null && s.slice(j).match(/^\$(?:HOME|env:USERPROFILE)(?=[\\/"\u201C\u201D\u201E])/i);
      if (home) { v = '~'; j += home[0].length; }
      for (;; j++) {
        if (j >= s.length) return fail();
        const d = s[j];
        if (ps) {
          if (PS_DQ.test(d)) { if (PS_DQ.test(s[j + 1] || '')) { v += s[++j]; continue; } break; }
          if (d === '`') { if (j + 1 >= s.length) return fail(); v += s[++j]; continue; }
          if (d === '$') amb = true;
        } else {
          if (d === '"') break;
          if (d === '\\' && /[$`"\\\n]/.test(s[j + 1] || '')) { v += s[++j]; continue; }
          if (d === '$' || d === '`') amb = true;
        }
        v += d;
      }
      w = (w ?? '') + v; i = j;
    } else if (!ps && c === '\\') {
      if (i + 1 >= s.length) return fail();
      if (s[i + 1] !== '\n') w = (w ?? '') + s[i + 1];
      else if (w == null) quoted0 = false; // line continuation, not part of a word
      i++;
    } else if (ps && c === '`') {
      if (i + 1 >= s.length) return fail();
      w = (w ?? '') + s[++i];
    } else if (c === '$' && s[i + 1] === '(') {
      // command substitution / PowerShell subexpression: one (ambiguous) word, not a separator at `(`
      const end = matchParen(s, i + 1);
      if (end < 0) return fail();
      w = (w ?? '') + s.slice(i, end + 1); amb = true; i = end;
    } else if (!ps && c === '`') {
      const end = s.indexOf('`', i + 1);
      if (end < 0) return fail();
      w = (w ?? '') + s.slice(i, end + 1); amb = true; i = end;
    } else if (c === '\n' || c === ';' || c === '|' || c === '(' || c === ')' || (c === '&' && (ps ? s[i + 1] === '&' : s[i + 1] !== '>'))) {
      let sep = c === '\n' ? ';' : c;
      if ((c === '&' || c === '|') && s[i + 1] === c) { i++; sep += c; }
      flushSeg(sep);
      if (c === '(') subs.push(++subId);
      else if (c === ')') subs.pop();
    } else if ((c === '{' || c === '}') && w == null && (i + 1 >= s.length || /\s/.test(s[i + 1]))) {
      flushSeg(c); // command group / script block
    } else if (/\s/.test(c)) {
      flushWord();
    } else if (c === '#' && w == null && !ps) {
      break; // comment
    } else if (c === '<' || c === '>' || (!ps && c === '&' && s[i + 1] === '>')) {
      // redirection: [n]> [n]>> &> >& <  ... drop operator and its target
      if (c === '<' && s[i + 1] === '<') return fail(); // heredoc / here-string
      if (c === '<' && s[i + 1] === '(') return fail(); // process substitution
      if (c === '>' && s[i + 1] === '(') return fail();
      let fd = '';
      if (w != null && /^\d$/.test(w) && raw === w) { fd = w; w = null; raw = ''; } // fd number
      flushWord();
      let j = i + 1;
      while (j < s.length && /[>&|]/.test(s[j])) j++;
      let op = fd + s.slice(i, j);
      if (/&$/.test(s.slice(i, j)) && /^\d|^-/.test(s.slice(j))) { // 2>&1
        const k0 = j;
        while (j < s.length && /[\d-]/.test(s[j])) j++;
        op += s.slice(k0, j);
        if (keepRedirects) words.push(op), raws.push(op);
        i = j - 1;
        continue;
      }
      i = j - 1;
      if (keepRedirects) { words.push(op); raws.push(op); } else dropNext = true;
      continue;
    } else {
      if (c === '$') {
        // PowerShell: $HOME / $env:USERPROFILE at the start of a word is the home directory (~)
        const home = ps && w == null && s.slice(i).match(/^\$(?:HOME|env:USERPROFILE|\{env:USERPROFILE\})(?=$|[\\/\s;|)])/i);
        if (home) { w = '~'; i += home[0].length - 1; raw += s.slice(start, i + 1); continue; }
        amb = true;
      }
      if (!ps && c === '`') amb = true;
      // ~user, ~+, ~-: expanded by the shell to a directory we cannot know
      if (!ps && c === '~' && w == null && i + 1 < s.length && !/[\/\s;|&)]/.test(s[i + 1])) amb = true;
      if (/[*?[]/.test(c)) glob = true;
      if (!ps && c === '{' && /^\{[^}\s]*,[^}\s]*\}/.test(s.slice(i))) amb = true; // brace expansion
      w = (w ?? '') + c;
    }
    if (w != null) raw += s.slice(start, i + 1);
  }
  flushSeg();
  if (dropNext) return fail();
  return { ok: true, segments };
}

/** All words of a single simple command (no separators), or null if the text is not exactly one word list. */
export function wordsOf(line, kind = 'posix', opts = {}) {
  const r = splitCommand(line, kind, opts);
  if (!r.ok || r.segments.length !== 1) return null;
  return r.segments[0].words;
}

/** Decode one shell word (as written in a command) to its literal value; null if it is not exactly one word. */
export function decodeWord(text, kind = 'posix') {
  const w = wordsOf(text, kind);
  return w && w.length === 1 ? w[0] : null;
}

// a word that is a path by its form: /x, ~/x, ./x, ../x, C:\x, \\server
const PATH_START = /^(?:~(?:[\\/]|$)|\.{1,2}[\\/]|[\\/]|[A-Za-z]:[\\/])/;
// a word that contains a path separator or ends in a file extension ("My Notes.txt", "/tmp/a b")
const PATH_FORM = /[\\/]|\.[A-Za-z0-9]{1,8}$/;
// first words that make a multi-word argument read as part of the request, not a name ("the file notes.txt",
// "folder /tmp/x", "plik raport.pdf", "all files in /tmp/x"); compared without diacritics ("usuń" -> "usun")
const REQUEST_WORDS = new Set(('the all every each any some this that these those of in on at from to into with for ' +
  'file files folder folders directory directories dir dirs document documents ' +
  'delete remove erase rm show list display print open edit view read move copy rename find search make create ' +
  'ten ta to te tego tej wszystkie wszystko kazdy kazda w we z ze na do od dla ' +
  'plik pliki pliku plikow plikiem folderu folderze folderow katalog katalogi katalogu katalogow katalogiem dokument dokumenty ' +
  'usun skasuj wykasuj kasuj pokaz wyswietl otworz edytuj przenies skopiuj kopiuj zmien znajdz szukaj utworz stworz').split(' '));
const fold = (w) => w.normalize('NFD').replace(/\p{M}/gu, '').replace(/[łŁ]/g, 'l').toLowerCase();

/**
 * Join already-split words (argv, or the words of a `tellsh …` history line) back into request text without
 * losing their boundaries. A single word is the whole request (`tellsh "delete folder /tmp/x"`) and is used as it is.
 * Among several words, one with whitespace is
 *   - a value, quoted again so the slot extractor reads it as one value (never `/tmp/a`), when it starts like a path
 *     (`delete folder "/tmp/a b"`), or, after the first word, has the form of a file name whose first word is not a
 *     request word and whose spaces are all after the last separator (`delete "My Notes.txt"`);
 *   - request text, joined unquoted, when it is the first word and not a path (`tellsh "delete folder" /tmp/x`);
 *   - unclear otherwise (`tellsh delete folder "my data"`, `delete "folder /tmp/x"`, `delete "the file notes.txt"`:
 *     a name, or words of the request?): quoted, and listed in `unclear` so a changing command leaves that path as
 *     a placeholder.
 * -> { text, unclear: string[] }, or null when a word with whitespace contains both quote characters (cannot be
 *    re-quoted for the extractor).
 */
export function joinArgs(words) {
  if (words.length === 1) return { text: String(words[0]), unclear: [] };
  const out = [];
  const unclear = [];
  for (let i = 0; i < words.length; i++) {
    const s = String(words[i]);
    if (!/\s/.test(s)) { out.push(s); continue; }
    const sep = s.search(/[\\/]/);
    const nameLike = i > 0 && PATH_FORM.test(s) && !REQUEST_WORDS.has(fold(s.trim().split(/\s+/)[0])) && (sep < 0 || s.search(/\s/) > sep);
    const value = PATH_START.test(s) || nameLike;
    if (!value && i === 0) { out.push(s); continue; }
    if (!value) unclear.push(s);
    if (!s.includes('"')) out.push(`"${s}"`);
    else if (!s.includes("'")) out.push(`'${s}'`);
    else return null;
  }
  return { text: out.join(' '), unclear };
}

/** joinArgs(words).text, or null. */
export function joinWords(words) {
  return joinArgs(words)?.text ?? null;
}

exec
/bin/bash -lc "sed -n '1,240p' src/danger.js" in /workspace/tellsh
 succeeded in 0ms:
// Dangerous-pattern checker. Runs on every final command (including user-edited ones)
// and can only ever escalate risk, never lower it. Whether a command can be safe at all is the
// trust rule at the end of this file (checkDanger): only tellsh's own catalog renders with plain values.
//
// Regex rules run on the command text after `git`/`docker` global options are removed
// (`git -C /repo -c x=y reset --hard` is checked as `git reset --hard`). Structural rules
// (rm, kill, Remove-Item, rd/del) tokenize each simple command so long options, quoted targets
// and `--` are understood.

import { ALLOW } from './allowlist-data.js';

const RANK = { safe: 0, medium: 1, high: 2 };
export const maxRisk = (a, b) => (RANK[b] > RANK[a] ? b : a);

// ---------------------------------------------------------------------------------------------
// light tokenizer: simple commands separated by ; & | && || ( ) and newlines, words unquoted
// (POSIX '…' "…" \x and PowerShell `x). Good enough for danger checks, not a full shell parser.

// PowerShell also treats the typographic quotes as quote characters (about_Quoting_Rules)
const PS_SQ = /['\u2018\u2019\u201A\u201B]/;
const PS_DQ = /["\u201C\u201D\u201E]/;

// $'…' (bash, zsh, ksh): the index of its closing quote (`\'` does not close it)
const ansiEnd = (s, i) => { let j = i + 2; while (j < s.length && s[j] !== "'") j += s[j] === '\\' ? 2 : 1; return Math.min(j, s.length); };
const ANSI_ESC = { n: '\n', t: '\t', r: '\r', a: '\x07', b: '\b', e: '\x1b', E: '\x1b', f: '\f', v: '\v' };

// winPaths: backslash is never an escape (cmd.exe / PowerShell paths such as "C:\"), and the
// PowerShell typographic quotes ‘…’ “…” quote like ' and "
export function simpleCommands(cmd, { winPaths = false } = {}) {
  const out = [];
  let words = [];
  let w = null;
  const flushWord = () => { if (w != null) { words.push(w); w = null; } };
  const flushCmd = () => { flushWord(); if (words.length) out.push(words); words = []; };
  const s = String(cmd);
  const isSq = (c) => (winPaths ? PS_SQ.test(c) : c === "'");
  const isDq = (c) => (winPaths ? PS_DQ.test(c) : c === '"');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (!winPaths && c === '$' && s[i + 1] === "'") {
      // bash ANSI-C quoting $'…': a backslash escapes the next character, also a quote (`$'\''` is one ')
      const end = ansiEnd(s, i);
      w = (w ?? '') + s.slice(i + 2, end).replace(/\\(.)/gs, (m, x) => ANSI_ESC[x] ?? x);
      i = end;
    } else if (isSq(c)) {
      let j = i + 1;
      while (j < s.length && !isSq(s[j])) j++;
      const end = j;
      w = (w ?? '') + s.slice(i + 1, end);
      i = end;
    } else if (isDq(c)) {
      let v = '';
      let j = i + 1;
      for (; j < s.length && !isDq(s[j]); j++) {
        if (((!winPaths && s[j] === '\\' && /[$`"\\\n]/.test(s[j + 1])) || s[j] === '`') && j + 1 < s.length) v += s[++j]; else v += s[j];
      }
      w = (w ?? '') + v;
      i = j;
    } else if (!winPaths && c === '\\' && i + 1 < s.length && !/[A-Za-z0-9_.%$~*]/.test(s[i + 1])) {
      w = (w ?? '') + s[++i]; // POSIX escape (keeps Windows paths like C:\Users intact)
    } else if ((c === '{' || c === '}') && w == null && (i + 1 >= s.length || /\s/.test(s[i + 1]))) {
      flushCmd(); // standalone { } = command group / script block
    } else if (/\s/.test(c)) {
      if (c === '\n') flushCmd(); else flushWord();
    } else if (/[;&|()]/.test(c)) {
      flushCmd();
    } else {
      w = (w ?? '') + c;
    }
  }
  flushCmd();
  return out;
}

// strip wrappers that run their argument as the command (sudo, timeout N, chroot DIR, env A=b, ...)
// options of each wrapper that take a separate value
const WRAPPER_OPTARG = {
  sudo: /^-[ugpCDhrtTUR]$|^--(?:user|group|prompt|close-from|chdir|chroot|host|role|type|other-user|command-timeout)$/,
  doas: /^-[uC]$/,
  nice: /^-n$|^--adjustment$/,
  ionice: /^-[cnpPu]$|^--(?:class|classdata|pid|pgid|uid)$/,
  xargs: /^-[IdEnLPsa]$|^--(?:arg-file|delimiter|max-args|max-procs|max-chars|replace|eof)$/,
  timeout: /^-[sk]$|^--(?:signal|kill-after)$/,
  chroot: /^--(?:userspec|groups)$/,
  stdbuf: /^-[ioe]$|^--(?:input|output|error)$/,
  env: /^-[uCS]$|^--(?:unset|chdir|split-string)$/,
  time: /^-[fo]$|^--(?:format|output)$/,
  exec: /^-a$/,
  unshare: /^-[SGRwl]$|^--(?:setuid|setgid|root|wd|map-user|map-group|propagation|setgroups)$/,
  watch: /^-[nq]$|^--(?:interval|equexit)$/,
  nsenter: /^-[tSGrw]$|^--(?:target|setuid|setgid|root|wd)$/,
  setpriv: /^--(?:reuid|regid|groups|inh-caps|ambient-caps|bounding-set|securebits|pdeathsig|selinux-label|apparmor-profile)$/,
  strace: /^-[eoopsuPIEXbS]$/,
  ltrace: /^-[eoopsuPnS]$/,
  flock: /^-[wEc]$|^--(?:timeout|wait|conflict-exit-code|command)$/,
  taskset: /^-[c]$/,
  'systemd-run': /^-[upEH]$|^--(?:unit|property|setenv|host|machine|description|slice|uid|gid|working-directory|on-calendar|on-active)$/,
  runuser: /^-[ugl]$|^--(?:user|group|login)$/,
  pkexec: /^--user$/,
  run0: /^-[ugD]$|^--(?:user|group|chdir|unit|property|description|slice|nice|setenv|background|machine|shell-prompt-prefix|area)$/,
  chrt: /^-[TPD]$|^--(?:sched-runtime|sched-period|sched-deadline)$/,
  cgexec: /^-g$/,
  torsocks: /^-[uapP]$|^--(?:user|pass|address|port)$/,
};
// Command strings given as an option value are checked as commands of their own. Any program:
// `-c STR`, `--command STR`, `--command=STR` (`flock -c "rm -rf /" LOCK`, `script -c "…"`, `find … -exec sh -c "…"`);
// shells, su and runuser also take -c inside a cluster (`bash -lc "…"`, `su -lc "…"`); env -S splits its string.
const CMD_STRING_ANY = /^(?:-c|--command|--session-command)$/;
const CMD_STRING_CLUSTER = /^-[a-zA-Z]*c$/;
const SHELLS = /^(?:ba|z|da|k|fi|c|tc|a|mk|r)?sh$|^busybox$/;
const PRIVILEGED = new Set(['sudo', 'doas', 'su', 'runuser', 'pkexec', 'run0', 'sudoedit']);
// programs whose whole job is to run a command (string): a payload that depends on the shell state cannot be checked
const RUNNERS = new Set(['su', 'runuser', 'flock', 'script', 'eval', 'env', 'watch', 'tmux', 'screen', 'ssh', 'xargs', 'parallel', 'sudo', 'doas',
  'pkexec', 'run0', 'nohup', 'setsid', 'timeout', 'iex', 'invoke-expression', 'cmd', 'pwsh', 'powershell', 'start-process', 'sem']);
const WRAPPERS = new Set(['sudo', 'doas', 'run0', 'command', 'builtin', 'exec', 'nohup', 'time', 'nice', 'ionice', 'then', 'do', 'else', '&', 'busybox', 'toybox', 'xargs', 'timeout', 'chroot', 'stdbuf', 'env', 'setsid', 'unbuffer', 'caffeinate',
  'unshare', 'watch', 'nsenter', 'setpriv', 'strace', 'ltrace', 'flock', 'taskset', 'systemd-run', 'runuser', 'firejail', 'proot', 'fakeroot',
  'pkexec', 'chrt', 'cgexec', 'eatmydata', 'torsocks', 'catchsegv', 'proxychains', 'proxychains4', 'tsocks', 'valgrind', 'faketime', 'ts',
  'chronic', 'nocache', 'trickle', 'numactl', 'schedtool', 'cpulimit', 'prlimit', 'sg', 'newgrp', 'su', 'parallel', 'sem', 'tmux', 'screen',
  'script', 'xvfb-run', 'dbus-launch', 'dbus-run-session', 'expect', 'gdb', 'ssh-agent', 'sshpass', 'with-lock-ex', 'lckdo', 'daemonize', 'start-stop-daemon']);
// programs that run the command at the end of their arguments without being a plain wrapper
const SUFFIX_RUNNERS = new Set(['ssh', 'mosh', 'kubectl', 'docker', 'podman', 'lxc', 'incus', 'machinectl', 'distrobox', 'toolbox', 'flatpak', 'nix-shell', 'firejail', 'bwrap']);

// programs whose arguments are data, never a command they run (`grep -r rm src`, `man rm`, `echo rm -rf /`)
const DATA_ARGS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'sed', 'awk', 'gawk', 'mawk', 'echo', 'printf', 'man', 'which', 'whereis',
  'type', 'whatis', 'apropos', 'help', 'info', 'tldr', 'git', 'cat', 'less', 'more', 'head', 'tail', 'ls', 'find', 'locate', 'tellsh', 'alias',
  'history', 'fc', 'complete', 'compgen', 'hash', 'test', '[', '[[', 'true', 'false', 'printenv', 'set', 'unset', 'export', 'declare', 'local',
  'readonly', 'trap', 'write-host', 'write-output', 'get-help', 'get-command', 'select-string', 'sls', 'findstr', 'wc', 'sort', 'uniq', 'cut',
  'tr', 'diff', 'cmp', 'file', 'stat', 'du', 'df', 'tree', 'jq', 'yq', 'xxd', 'od', 'hexdump', 'strings', 'mkdir', 'touch', 'cd', 'pushd']);
// programs that destroy or change things: after an unknown program they may be the command it runs (`mywrap rm -rf /`)
const DANGER_HEADS = /^(?:rm|rmdir|unlink|shred|wipe|wipefs|mkfs(?:\.\w+)?|mke2fs|dd|truncate|kill|pkill|killall|chmod|chown|chgrp|mv|cp|rsync|find|tar|tee|sh|bash|zsh|dash|ksh|fish|eval|shutdown|reboot|halt|poweroff|crontab|iptables|remove-item|ri|del|erase|rd|format|diskpart|stop-process|format-volume|clear-disk)$/i;

/** Collect `-c STR` style payloads of one simple command into `inner` (`unsure` when a runner's payload cannot be read). */
function payloads(w, inner, flags) {
  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
  if (PRIVILEGED.has(h)) flags.privileged = true;
  // a payload of a program that runs commands (or of `sh -c` inside other arguments: `find … -exec sh -c "…"`)
  // must be readable; `-c` of any other program (`grep -c "$PAT"`) is still checked, without that requirement
  const add = (v, i) => {
    if (v == null) return;
    const prev = String(w[i - 1] ?? '').replace(/^.*[\\/]/, '').toLowerCase();
    const runner = RUNNERS.has(h) || SHELLS.test(h) || SHELLS.test(prev) || /^--(?:command|session-command|split-string)/.test(String(w[i] ?? ''));
    if (!runner) { (flags.lenient ??= []).push(String(v)); return; }
    inner.push(String(v));
    if (/[$`]|^\s*$/.test(String(v))) flags.unsure = `${SHELLS.test(prev) ? prev : h} runs a command string that depends on the shell state (${String(v).slice(0, 40)}); it cannot be checked`;
  };
  for (let i = 1; i < w.length; i++) {
    const x = String(w[i]);
    if (x === '--' && !SHELLS.test(h)) continue;
    const eq = x.match(/^(--(?:command|session-command|split-string))=(.*)$/s);
    if (eq) { add(eq[2], i); continue; }
    if (h === 'pwsh' || h === 'powershell') {
      if (/^-(?:e|ec|en|enc\w*|encodedcommand)$/i.test(x)) { flags.unsure = `${h} -EncodedCommand cannot be checked`; i++; continue; }
      if (/^-(?:c|co\w*|command)$/i.test(x)) { add(w.slice(i + 1).join(' '), i); break; }
      continue;
    }
    if (h === 'cmd' && /^\/[ck]$/i.test(x)) { add(w.slice(i + 1).join(' '), i); break; }
    if (h === 'env' && (x === '-S' || x === '--split-string')) { add(w[i + 1], i); i++; continue; }
    if (CMD_STRING_ANY.test(x) || ((SHELLS.test(h) || h === 'su' || h === 'runuser') && CMD_STRING_CLUSTER.test(x))) {
      // sh -c 'cmd' arg0 args: only the string is the command
      add(w[i + 1], i);
      // its $0, $1, "$@" are the words after it (`sh -c 'rm -rf "$1"' _ /`): also checked with them filled in
      if (SHELLS.test(h) && w[i + 1] != null && w.length > i + 2) inner.push(withPositional(String(w[i + 1]), w.slice(i + 2).map(String)));
      i++;
    }
  }
  if (h === 'eval' || h === 'iex' || h === 'invoke-expression') add(w.slice(1).join(' '), 0);
}

const sq = (x) => `'${x.replace(/'/g, "'\\''")}'`;
/** `sh -c STR arg0 args…`: STR with $0…$9, ${N}, "$@", $@ and $* replaced by the (quoted) arguments. */
function withPositional(str, args) {
  const all = args.slice(1).map(sq).join(' ');
  return str.replace(/"\$@"|"\$\*"|\$@|\$\*/g, all).replace(/"\$\{?(\d)\}?"|\$\{?(\d)\}?/g, (m, a, b) => sq(args[+(a ?? b)] ?? ''));
}

/** The command a wrapper chain runs. `inner` collects command strings given as option values (`su -c "…"`). */
export function commandWords(words, inner = [], flags = {}) {
  let w = words;
  for (;;) {
    while (w.length && /^\w+=/.test(w[0])) w = w.slice(1);
    const h = (w[0] || '').replace(/^.*[\\/]/, '').toLowerCase();
    payloads(w, inner, flags);
    if (!WRAPPERS.has(h)) return w;
    w = w.slice(1);
    const optArg = WRAPPER_OPTARG[h];
    while (w.length && /^-/.test(w[0])) {
      const o = w[0];
      w = w.slice(1);
      if (o === '--') break;
      if (optArg && optArg.test(o)) w = w.slice(1);
    }
    if (h === 'env') while (w.length && /^\w+=/.test(w[0])) w = w.slice(1);
    if (h === 'timeout' && w.length) w = w.slice(1); // DURATION
    if (h === 'chroot' && w.length) w = w.slice(1); // NEWROOT
    if (h === 'flock' && w.length) w = w.slice(1); // LOCKFILE
    if (h === 'taskset' && w.length && /^(?:0x)?[\da-f,-]+$/i.test(w[0])) w = w.slice(1); // MASK (without -c: always one)
    if (h === 'chrt' && w.length && /^\d+$/.test(w[0])) w = w.slice(1); // PRIORITY
  }
}

/**
 * Every command a simple command may run: the wrapper chain as parsed by commandWords, and, because wrapper
 * options are not always understood (`sudo -iu root rm …`, `nice --adjustment=5 rm …`), the command starting
 * at every later non-option word of a wrapper / remote runner (`ssh host rm -rf /`, `docker exec ct rm …`).
 * The checks only ever escalate, so reading too many candidates is safe; missing one is not.
 */
export function commandChains(words, inner, flags) {
  const out = [];
  const push = (w) => { if (w.length && !out.some((o) => o.length === w.length && o.every((x, i) => x === w[i]))) out.push(w); };
  push(commandWords(words, inner, flags));
  const lead = words.findIndex((x) => !/^\w+=/.test(x));
  const h = lead >= 0 ? String(words[lead]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase() : '';
  const remote = SUFFIX_RUNNERS.has(h) && (!['docker', 'podman', 'kubectl', 'lxc', 'incus'].includes(h) || words.some((x) => ['exec', 'run', 'debug', 'create'].includes(x)));
  // an unknown program followed by a destructive command (`mywrap rm -rf /`, `catchsegv2 dd …`): it may run it
  if (h && !WRAPPERS.has(h) && !remote && !DATA_ARGS.has(h)) {
    for (let j = lead + 1; j < words.length - 1; j++) if (DANGER_HEADS.test(String(words[j]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, ''))) push(commandWords(words.slice(j), inner, flags));
  }
  if (WRAPPERS.has(h) || remote) {
    for (let j = lead + 1; j < words.length; j++) {
      if (/^-|^\w+=/.test(words[j])) continue;
      const w = commandWords(words.slice(j), inner, flags);
      push(w);
      // a lone quoted string with spaces is a command (`tmux new "rm -rf /"`, `ssh host "rm -rf /"`)
      if (w.length === 1 && /\s/.test(w[0])) inner.push(w[0]);
    }
  }
  return out;
}

// Lexically normalise a path for the danger checks: `//`, `/./`, a trailing `/.` and `/..` collapse
// (`rm -rf /.`, `rm -rf //`, `rm -r /etc/../`), so they are compared as the directory they name.
// Only absolute, ~ and $HOME paths; a `..` above the home prefix is kept as is.
export function normTarget(t) {
  const s = String(t).trim();
  const m = s.match(/^(\/|~(?=\/|$)|\$\{?HOME\}?(?=\/|$))(.*)$/s);
  if (!m) return s;
  const root = m[1] === '/';
  const parts = [];
  for (const p of m[2].split('/')) {
    if (p === '' || p === '.') continue;

exec
/bin/bash -lc "sed -n '530,910p' src/danger.js" in /workspace/tellsh
 succeeded in 0ms:

// Interpreters running inline code (`python3 -c`, `perl -e`, `ruby -e`, `node -e`, `php -r`, awk programs that call
// system()): the code is not shell and cannot be checked, so it is high. Its string literals are checked as commands
// (`system("rm -rf /")`) and file-deleting calls on /, ~ or a system directory (`shutil.rmtree('/')`) are critical.
const INTERP_CODE = [
  [/^(?:python[\d.]*|pypy[\d.]*)$/, /^-[a-zA-Z]*c$/],
  [/^perl[\d.]*$/, /^-[a-zA-Z]*[eE]$/],
  [/^(?:ruby|jruby)[\d.]*$/, /^-[a-zA-Z]*e$/],
  [/^(?:node|nodejs|bun)$/, /^(?:-e|-p|-pe|--eval|--print)$/],
  [/^php[\d.]*$/, /^-r$/],
  [/^(?:lua[\d.]*|luajit|julia|rscript|osascript|tclsh)$/, /^-e$/],
];
const AWK = /^(?:awk|gawk|mawk|nawk|busybox-awk)$/;
const DELETE_CALL = /\b(?:rmtree|rm_rf|rm_r|rmdir|removedirs|rmSync|rmdirSync|unlink(?:Sync)?|remove|rm|delete|chmod|chown|chmodSync|chownSync)\s*\(?\s*(?:path\s*=\s*)?[rb]?['"]([^'"]*)['"]/g;
function inlineCode(w) {
  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
  if (AWK.test(h)) {
    const a = w.slice(1);
    for (let i = 0; i < a.length; i++) {
      if (/^-[Fvf]$/.test(a[i])) { if (a[i] === '-f') return null; i++; continue; }
      if (/^-/.test(a[i])) continue;
      return /\bsystem\s*\(|\|\s*getline|\b(?:print|printf)\b[^;}]*(?:>|\|)/.test(a[i]) ? { h, code: a[i] } : null;
    }
    return null;
  }
  if (h === 'deno' && w[1] === 'eval') return { h, code: w.slice(2).join(' ') };
  const it = INTERP_CODE.find(([re]) => re.test(h));
  if (!it) return null;
  const i = w.findIndex((x, j) => j > 0 && it[1].test(x));
  return i > 0 && w[i + 1] != null ? { h, code: String(w[i + 1]) } : null;
}
function interpCheck(w, hit) {
  const ic = inlineCode(w);
  if (!ic) return;
  hit('high', `${ic.h} runs inline code; it cannot be checked`);
  codeCheck(ic, hit);
}
const INTERP_HEAD = /^(?:python[\d.]*|pypy[\d.]*|perl[\d.]*|(?:j?ruby)[\d.]*|node|nodejs|bun|deno|php[\d.]*|lua[\d.]*|luajit|julia|rscript|osascript|tclsh|awk|gawk|mawk|nawk)$/;
/**
 * Code fed to a shell or an interpreter on stdin by a here-string or heredoc (`bash <<< 'rm -rf /'`,
 * `python3 - <<< "import os; os.system('rm -rf /')"`, `python3 <<EOF`): a shell's here-string is checked as a
 * command; interpreter code is high (cannot be checked) and its literals / delete calls are checked as for `-c`.
 */
function stdinCodeCheck(w, hit, inner) {
  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
  const shell = SHELLS.test(h);
  if (!shell && !INTERP_HEAD.test(h)) return;
  const hs = w.indexOf('<<<');
  if (hs >= 0) {
    const code = String(w[hs + 1] ?? '');
    if (shell) { inner.push(code); return; }
    hit('high', `${h} runs code from a here-string; it cannot be checked`);
    codeCheck({ h, code }, hit);
    return;
  }
  if (w.some((x) => /^<<-?\S/.test(String(x)) || x === '<<' || x === '<<-')) hit('high', `${h} runs a heredoc script; it cannot be checked`);
}
function codeCheck(ic, hit) {
  const lits = [];
  for (const m of ic.code.matchAll(/'([^']*)'|"([^"]*)"|`([^`]*)`|\bqq?\s*([{(\[])([^})\]]*)[})\]]/g)) lits.push(m[1] ?? m[2] ?? m[3] ?? m[5]);
  for (const c of lits) {
    if (!c || !c.trim()) continue;
    const d = assessCommand(c, 'safe', { lenient: true });
    for (const m of d.warnings) hit(d.risk, m, d.critical);
  }
  for (const m of ic.code.matchAll(DELETE_CALL)) if (critTarget(m[1]) || SYS_PATH.test(normTarget(m[1]))) hit('high', `${ic.h} code deletes or changes /, ~ or a system directory`, true);
}

// tar -x … -C / (or --directory=/): extracting over the root or home directory
function tarCheck(w, hit) {
  const a = w.slice(1);
  const extract = a.some((x) => /^-[a-zA-Z]*x/.test(x) || x === '--extract' || x === '--get') || /^[a-wyzA-Z]*x[a-zA-Z]*$/.test(a[0] || '');
  if (!extract) return;
  const dirs = [];
  a.forEach((x, i) => {
    if (x === '-C' || x === '--directory') dirs.push(a[i + 1] ?? '');
    else if (/^-C./.test(x)) dirs.push(x.slice(2));
    else if (/^--directory=/.test(x)) dirs.push(x.slice(12));
  });
  if (dirs.some(critTarget)) hit('high', 'extracts an archive over /, ~ or a drive root', true);
}

// docker run -v /:/host …: the container gets the host's whole filesystem (read-write unless :ro)
function dockerCheck(w, hit) {
  const a = w.slice(1);
  if (!a.includes('run') && !a.includes('create')) return;
  const vols = [];
  a.forEach((x, i) => {
    if (x === '-v' || x === '--volume' || x === '--mount') vols.push(a[i + 1] || '');
    else if (/^(?:-v=?|--volume=|--mount=)/.test(x)) vols.push(x.replace(/^(?:-v=?|--volume=|--mount=)/, ''));
    else if (/^-[a-zA-Z]*v$/.test(x)) vols.push(a[i + 1] || ''); // -itv /:/h
  });
  for (const v of vols) {
    const host = v.split(':')[0];
    const src = (v.match(/(?:^|,)(?:source|src)=([^,]*)/) || [])[1];
    const root = (v.includes(':') && normTarget(host) === '/') || (src != null && normTarget(src) === '/');
    if (root) hit('high', 'mounts the host root filesystem into a container', !/:ro(?:,|$)|(?:^|,)(?:readonly|ro)(?:=true|=1)?(?:,|$)/.test(v));
  }
}

// [regex, risk, message, critical]
const RULES = [
  [/\bmkfs(?:\.\w+)?\b|\bmke2fs\b|\bwipefs\b/, 'high', 'formats a filesystem', true],
  [/\bdd\b[^|;&]*\bof=\/dev\//, 'high', 'dd writing to a raw device', true],
  [/>\s*\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk)\w*/, 'high', 'redirect onto a raw disk device', true],
  [/\b(?:chmod|chown|chgrp)\s+(?:\S+\s+)*(?:-[a-zA-Z]*R[a-zA-Z]*|--recursive)\s+(?:\S+\s+)*['"]?\/['"]?(?:\s|$|\*)/, 'high', 'recursive permission/owner change on /', true],
  [/\bchmod\s+(?:-\S+\s+)*0?777\b/, 'medium', 'chmod 777 makes files world-writable'],
  [/:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:/, 'high', 'fork bomb', true],
  [/\b(?:curl|wget|fetch)\b[^|;]*\|\s*(?:sudo\s+)?(?:\S*\/)?(?:ba|z|da|k|fi)?sh\b/, 'high', 'pipes a download straight into a shell'],
  [/(?:\b(?:ba|z|da|k|fi)?sh\b|\bsource\b|\beval\b|(?:^|[;&|(]\s*)\.)\s[^|;&]*(?:<\(|\$\(|`)\s*(?:sudo\s+)?(?:curl|wget|fetch)\b/, 'high', 'runs a downloaded script'],
  [/\bsudo\b|\bdoas\b/, 'medium', 'runs with root privileges'],
  // text piped into a shell runs as a script whose content is not known here
  [/\|\s*(?:(?:sudo|doas)\s+(?:-\S+\s+)*)?(?:\S*\/)?(?:ba|z|da|k|fi|c|tc|a|mk)?sh\b(?!\s+-[a-zA-Z]*c\b)(?![\w.-])/, 'high', 'runs piped text as a shell script'],
  [/\|\s*(?:iex|Invoke-Expression)\b/i, 'high', 'runs piped text as a PowerShell script'],
  [/\bfind\b.*\s-delete\b|\bfind\b.*-exec(?:dir)?\s+(?:\S*\/)?rm\b|\bxargs\s+(?:-\S+\s+)*(?:\S*\/)?rm\b/, 'high', 'bulk deletion via find/xargs'],
  [/\bgit\s+push\b[^;&|]*\s(?:--force(?:-with-lease|-if-includes)?\b|-[a-zA-Z]*f\b|\+[^\s:]*(?::\S*)?|--mirror\b)/, 'high', 'force-push rewrites remote history'],
  [/\bgit\s+push\b[^;&|]*\s(?:--delete\b|-d\b|:\S)/, 'high', 'deletes a remote branch'],
  [/\bgit\s+reset\b[^;&|]*\s--(?:hard|merge|keep)\b|\bgit\s+clean\b[^;&|]*\s(?:-[a-zA-Z]*f|--force\b)|\bgit\s+restore\b|\bgit\s+checkout\b[^;&|]*\s(?:--\s|-f\b|--force\b|\.(?:\s|$))|\bgit\s+switch\b[^;&|]*\s(?:-f\b|--force\b|--discard-changes\b)/, 'high', 'discards uncommitted work'],
  [/\bgit\s+branch\b[^;&|]*\s(?:-D\b|-[a-zA-Z]*d[a-zA-Z]*f|--delete\s+--force|--force\s+--delete)/, 'high', 'force-deletes a branch'],
  [/\bgit\s+stash\s+(?:drop|clear)\b/, 'high', 'deletes stashed changes'],
  [/\bdocker\s+(?:system|volume|image|container|network|builder)\s+prune\b|\bdocker\s+(?:rmi?|container\s+rm|image\s+rm|volume\s+rm)\b/, 'high', 'deletes docker data'],
  [/\b(?:shutdown|reboot|halt|poweroff)\b|\binit\s+[06]\b/, 'high', 'shuts down / reboots the machine'],
  [/\b(?:pkill|killall)\b|\bdocker\s+kill\b/, 'high', 'terminates processes'],
  [/\b(?:shred|wipe|blkdiscard|truncate)\b[^|;&]*\s['"]?\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk|md|dm-|mapper\/|loop)\w*/, 'high', 'destroys a whole disk device', true],
  [/\b(?:shred|truncate)\b[^|;&]*\s['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'destroys the contents of a system file', true],
  [/\b(?:shred|truncate)\b/, 'high', 'destroys file contents'],
  [/\biptables\s+-F\b|\bufw\s+disable\b/, 'high', 'drops firewall rules'],
  [/\bmv\s+\S+\s+\/dev\/null\b/, 'high', 'moves a file into /dev/null (deletes it)', true],
  // redirections: N>, N>>, &>, >|, >> onto system files; any other file write is medium
  [/(?:^|[^>])(?:\d*|&)>(?!>)\|?\s*['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'overwrites a system file', true],
  [/(?:\d*|&)>>\|?\s*['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'appends to a system file'],
  // text piped into an interpreter with no script runs it as code (`curl … | python3`, `cat x | perl -`)
  [/\|\s*(?:(?:sudo|doas)\s+(?:-\S+\s+)*)?(?:\S*\/)?(?:python[\d.]*|perl[\d.]*|ruby|node|php[\d.]*)(?:\s+-)?\s*(?:$|[;&|)])/, 'high', 'runs piped text as a script'],
  [/(?:^|[^<>=-])(?:\d+|&)?>>?\|?(?!&|>)\s*(?!['"]?\/dev\/(?:null|stdout|stderr)\b)['"]?[^\s&|;)]/, 'medium', 'redirect writes to a file'],
  [/\btee\b/, 'medium', 'tee writes to a file'],
  [/\bsed\s+(?:-\S+\s+)*(?:-i|--in-place)\b/, 'medium', 'edits files in place'],
  [/\bcrontab\s+-r\b/, 'high', 'removes all cron jobs', true],
  // PowerShell
  [/\bRemove-Item\b|\bClear-Content\b/i, 'high', 'deletes files permanently'],
  [/\bStop-Process\b|\bspps\b|\btaskkill\b/i, 'high', 'terminates processes'],
  [/\bFormat-Volume\b|\bClear-Disk\b|\bInitialize-Disk\b|(?:^|[;&|(]\s*)format\s+[a-z]:/i, 'high', 'formats a disk', true],
  [/\b(?:Stop|Restart)-Computer\b|\bshutdown(?:\.exe)?\s+\/[srp]\b/i, 'high', 'shuts down / reboots the machine'],
  [/\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|curl|wget)\b[^|;]*\|\s*(?:iex|Invoke-Expression)\b/i, 'high', 'pipes a download straight into PowerShell'],
  [/\b(?:iex|Invoke-Expression)\b[^|;]*\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|curl|wget|DownloadString|DownloadData|Net\.WebClient)\b|\[scriptblock\]::Create\([^;]*\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|DownloadString)\b/i, 'high', 'runs a downloaded script'],
  [/\bSet-ExecutionPolicy\b|\bStart-Process\b.*-Verb\s+RunAs/i, 'medium', 'changes security policy / elevates'],
  [/\b(?:Stop|Restart|Start|Set)-Service\b/i, 'medium', 'changes a service'],
  [/\b(?:Set-Content|Out-File|Add-Content|Rename-Item|Move-Item|Copy-Item|New-Item|Set-Acl|Compress-Archive|Expand-Archive)\b/i, 'medium', 'modifies files'],
  [/\bdocker\s+stop\b/, 'medium', 'stops containers'],
];

// `git -C dir -c k=v --no-pager reset` -> `git reset`; `docker --context x -H h rm` -> `docker rm`
const OPTVAL = String.raw`(?:'[^']*'|"[^"]*"|[^\s;&|'"])+`;
const GIT_GLOBALS = new RegExp(String.raw`\bgit((?:\s+(?:(?:-C|-c|--git-dir|--work-tree|--namespace|--super-prefix|--config-env|--exec-path)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
const DOCKER_GLOBALS = new RegExp(String.raw`\bdocker((?:\s+(?:(?:-H|--host|-c|--context|--config|-l|--log-level|--tls\w*)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
export function normalizeGlobals(command) {
  return String(command).replace(GIT_GLOBALS, 'git').replace(DOCKER_GLOBALS, 'docker');
}

// ---------------------------------------------------------------------------------------------
// Allowlist (v0.3): only the commands and flags tellsh knows are safe. The known set is what the catalog itself renders
// for every shell (src/allowlist-data.js, generated by scripts/build_allowlist.js and checked by a test). Any wrapper
// (sudo, env, timeout, xargs, nohup, bash -c, ...), an environment assignment in front of a command, a program the set
// does not have, a subcommand of a multi-command tool it does not have (`git filter-branch`, `npx cowsay`) or a flag it
// does not have for that command (`gh pr merge --admin`, `rm -P`) makes the command high risk: it is shown with the
// reason and needs an explicit confirmation. The deny rules above still run; the allowlist only ever escalates.

// tools whose first words name a subcommand (`git push`, `docker compose up`, `npx wrangler deploy`, `gh pr merge`)
export const SUB_DEPTH = { git: 1, docker: 2, podman: 2, npm: 1, npx: 3, pnpm: 1, yarn: 1, gh: 2, systemctl: 1, apt: 1, 'apt-get': 1,
  dnf: 1, yum: 1, brew: 1, winget: 1, pip: 1, pip3: 1, kubectl: 1, wrangler: 2, timedatectl: 1, journalctl: 0, launchctl: 1,
  certutil: 0, python3: 0, py: 0 };
const PWSH_CMDLET = /^[a-z]+-[a-z]+$/;
// `-w32`, `-n5`: an option with its number attached is the option
const flagKey = (head, f) => {
  let x = String(f);
  if (/^--[^=]+=/.test(x)) x = x.replace(/=.*$/s, '=');
  else if (/^\/[A-Za-z?]{1,2}:/.test(x)) x = x.replace(/:.*$/s, ':');
  else if (/^-[A-Za-z]\d+$/.test(x)) x = x.replace(/\d+$/, '#');
  return PWSH_CMDLET.test(head) ? x.toLowerCase() : x;
};
// a word that is an option: -x, --long, -Param (PowerShell), /x (cmd.exe, short: never a path like /tmp); `-3`, `-10M`
// (find -mtime -3) and `-` (stdin) are values
const isFlag = (w) => /^-(?!\d)[^\s]/.test(w) && w !== '--' || /^\/[A-Za-z?]{1,2}(?::\S*)?$/.test(w) || /^\/[+-]\w*$/.test(w);
// the program as written: a path (`./x`, `/tmp/ls`, `C:\\t\\ls.exe`) is not the allowlisted program of the same name
const baseName = (w) => String(w).replace(/\.exe$/i, '').toLowerCase();
// a value the catalog renders where the tokenizer expects a program, by its shape: a number (`(Get-Date).AddMinutes(-4320)`),
// an argument list item (`.Replace('a', 'b')`), an environment variable (`$env:FOO`). Any other word is a program as written.
export const headKey = (w) => {
  const x = baseName(w);
  if (/^-?\d+(?:\.\d+)?$/.test(x)) return '<num>';
  if (/,$/.test(x) && x.length > 1) return '<arg>,';
  if (/^\$env:[a-z_]\w*$/.test(x)) return '$env:<var>';
  return x;
};

/**
 * The shape of one simple command: { head, key (head + known subcommand words), flags, assign, rest }.
 * `known(key)` says whether a longer key exists (checking); without it the subcommand words are taken up to SUB_DEPTH
 * (building the allowlist from rendered templates, where `literal(w)` tells a template word from an inserted value).
 */
export function commandShape(words, { known, literal = () => true } = {}) {
  let i = 0;
  const assign = [];
  while (i < words.length && /^[A-Za-z_]\w*=/.test(words[i])) assign.push(words[i++]);
  const head = headKey(words[i] ?? '');
  let key = head;
  let j = i + 1;
  const depth = SUB_DEPTH[head] ?? 0;
  for (let d = 0; d < depth && j < words.length; d++) {
    const w = String(words[j]);
    if (isFlag(w) || /^\d+$/.test(w) || !literal(w)) break;
    const next = `${key} ${w.toLowerCase()}`;
    if (known && !known(next)) break;
    key = next;
    j++;
  }
  const flags = [];
  const rest = [];
  let opts = true;
  for (; j < words.length; j++) {
    const w = String(words[j]);
    if (opts && w === '--') { opts = false; continue; }
    if (opts && isFlag(w)) flags.push(w); else rest.push(w);
  }
  return { head, key, flags, assign, rest };
}

// ssh: host plus a remote command (`ssh host rm -rf /`) runs that command; options with a value are not operands
const SSH_OPTARG = /^-[BbcDEeFIiJLlmOoPpQRSWw]$/;
const sshOperands = (words) => { let n = 0; for (let k = 1; k < words.length; k++) { if (SSH_OPTARG.test(words[k])) k++; else if (!/^-/.test(words[k])) n++; } return n; };
// shell keywords in front of a command (`… do taskkill`, `else New-Item …`, `& 'node'`): syntax, not a wrapper
export const KEYWORDS = new Set(['then', 'do', 'else', 'elif', '&', '!', 'time']);
// `$(…)`, `` `…` `` (also inside "…") and `<(…)` / `>(…)` outside '…' run a command the allowlist cannot see as written;
// `$((…))` with an arithmetic body is arithmetic, not a command
export function substitution(command) {
  const s = String(command);
  let dq = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '\\') { i++; continue; }
    if (c === '$' && s[i + 1] === "'" && !dq) { i = ansiEnd(s, i); continue; }
    if (c === "'" && !dq) { const j = s.indexOf("'", i + 1); if (j < 0) return null; i = j; continue; }
    if (c === '"') { dq = !dq; continue; }
    if (c === '`') return 'command';
    if (c === '$' && s[i + 1] === '(') {
      const m = s.slice(i).match(/^\$\(\(([^()]*(?:\([^()]*\)[^()]*)*)\)\)/);
      if (m && !m[1].includes('$(') && /^[\w\s+\-*/%$]*$/.test(m[1].replace(/[()]/g, ''))) { i += m[0].length - 1; continue; }
      return 'command';
    }
    if (!dq && (c === '<' || c === '>') && s[i + 1] === '(') return 'process';
  }
  return null;
}

let PREFIXES = null;
/** Problems the allowlist finds in a command ([] when every simple command, subcommand and flag is known). */
export function allowlistProblems(command, { extra = null } = {}) {
  const table = ALLOW;
  // extra: { key: flags } a caller vouches for (the composer's validated tool vocabulary), added to the table's
  const keyFlags = (k) => (extra?.[k] ? [...(table[k] || []), ...extra[k].map((f) => flagKey(k.split(' ')[0], f))] : table[k]);
  PREFIXES ??= new Set(Object.keys(ALLOW).flatMap((k) => k.split(' ').slice(1).map((_, i, a) => k.split(' ').slice(0, i + 1).join(' '))));
  const prefix = (k) => PREFIXES.has(k) || (extra && Object.keys(extra).some((e) => e.startsWith(k + ' ')));
  const out = [];
  const seen = new Set();
  const add = (m) => { if (!seen.has(m)) { seen.add(m); out.push(m); } };
  const subst = substitution(command);
  if (subst) add(`runs a ${subst} substitution; not on the allowlist`);
  for (let words of [...simpleCommands(command), ...simpleCommands(command, { winPaths: true })]) {
    while (words.length && KEYWORDS.has(String(words[0]).toLowerCase())) words = words.slice(1);
    if (!words.length) continue;
    const sh = commandShape(words, { known: (k) => keyFlags(k) != null || prefix(k) });
    if (sh.assign.length) add(`sets environment variables for the command (${sh.assign.map((a) => a.split('=')[0]).join(', ')}); not on the allowlist`);
    if (!sh.head) continue;
    // a wrapper with an operand runs it (`sudo rm x`, `timeout 5 ls`, `bash -c "…"`); alone it is a program (`env | sort`)
    if (((WRAPPERS.has(sh.head) || RUNNERS.has(sh.head)) && sh.head !== 'ssh' && sh.rest.length) || (SHELLS.test(sh.head) && sh.flags.some((f) => /^-[a-z]*c[a-z]*$/i.test(f)))) {
      add(`runs another command through a wrapper (${sh.head}); only commands on the allowlist are trusted`);
      continue;
    }
    if (sh.head === 'ssh' && sshOperands(words) > 1) {
      add('runs a remote command over ssh; not on the allowlist');
      continue;
    }
    const allowed = keyFlags(sh.key);
    if (allowed == null && prefix(sh.key)) { add(`unknown subcommand (${[sh.key, ...sh.rest.slice(0, 1)].join(' ')}); not on the allowlist`); continue; }
    if (allowed == null) { add(`unknown command (${sh.key}); not on the allowlist`); continue; }
    if ((SUB_DEPTH[sh.head] ?? 0) > 0 && sh.key === sh.head && sh.rest.length && !allowed.includes('*sub')) {
      add(`unknown subcommand (${sh.head} ${sh.rest[0]}); not on the allowlist`);
      continue;
    }
    for (const f of sh.flags) {
      const k = flagKey(sh.head, f);
      if (allowed.includes(k) || (/^-[A-Za-z]#$/.test(k) && allowed.includes(k.slice(0, 2)))) continue;
      // a cluster of known single-letter options (`ls -la` when -l and -a are known)
      if (/^-[A-Za-z]{2,}$/.test(f) && !PWSH_CMDLET.test(sh.head) && [...f.slice(1)].every((c) => allowed.includes(`-${c}`))) continue;
      add(`unknown option ${f} for ${sh.key}; not on the allowlist`);
    }
  }
  return out;
}

/**
 * The parser's reading of a command: deny rules, structural checks and the allowlist. It only ever raises `baseRisk`;
 * a `safe` result here does not make a command safe (see checkDanger).
 * @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}}
 */
export function assessCommand(command, baseRisk = 'safe', { lenient = false, allowlist = null } = {}) {
  let risk = baseRisk;
  const warnings = [];
  let critical = false;
  const hit = (r, msg, crit) => {
    risk = maxRisk(risk, r);
    if (!warnings.includes(msg)) warnings.push(msg);
    if (crit) critical = true;
  };
  const text = normalizeGlobals(command);
  const inner = [];
  const flags = {};
  // structural checks run on both readings of backslashes (POSIX escapes / Windows path separators)
  for (const words of [...simpleCommands(text), ...simpleCommands(text, { winPaths: true })]) {
   for (const w of commandChains(words, inner, flags)) {
    const head = w[0].replace(/^.*[\\/]/, '');
    const lower = head.toLowerCase().replace(/\.exe$/, '');
    // a lone string with spaces is a command handed to another program ('…' | bash)
    if (w.length === 1 && /\s/.test(w[0])) inner.push(w[0]);
    // the program itself depends on the shell state (`$CMD -rf /`, `$(which rm) -rf /`, `& $tool`): unknown
    if (!lenient && /^[$`]/.test(head)) hit('high', 'runs a command whose name depends on the shell state; it cannot be checked');
    if (head === 'rm' || head === 'unlink') rmCheck(w, hit);
    else if (head === 'kill') killCheck(w, hit);
    else if (/^(?:rd|rmdir|del|erase)$/i.test(head)) {
      const a = w.slice(1);
      if (!a.some((x) => /^\/[a-z]$/i.test(x)) && a.some((x) => /^-\w/.test(x))) removeItemCheck(w, hit);
      else cmdDelCheck(w, hit);
    } else if (PS_REMOVE.test(lower)) removeItemCheck(w, hit);
    else if (head === 'find') findCheck(w, hit);
    else if (head === 'rsync') rsyncCheck(w, hit);
    else if (['cp', 'mv', 'install', 'ln'].includes(head)) copyCheck(w, hit);
    else if (['chmod', 'chown', 'chgrp'].includes(head)) permCheck(w, hit);
    else if (head === 'tar' || head === 'bsdtar' || head === 'gtar') tarCheck(w, hit);
    else if (head === 'docker' || head === 'podman') dockerCheck(w, hit);
    else if (lower === 'sed' || lower === 'gsed') sedCheck(w, hit);
    if (['tee', 'cp', 'install', 'sponge', 'pv', 'mv', 'ln'].includes(lower)) rawDiskWriteCheck(w, hit);
    interpCheck(w, hit);
    stdinCodeCheck(w, hit, inner);
    if (head === 'git' && w[1] === 'rm') hit('high', 'rm deletes files permanently (no trash)');
    sysFileWriteCheck(w, head, hit);
   }
  }
  if (flags.unsure) hit('high', flags.unsure);
  if (flags.privileged) hit('medium', 'runs with root privileges');
  // `-c` values of other programs: checked as commands, but a name like "$PAT" is not a command name there
  for (const c of new Set(flags.lenient || [])) {
    if (!c.trim() || inner.includes(c)) continue;
    const d = assessCommand(c, 'safe', { lenient: true });
    for (const m of d.warnings) hit(d.risk, m, d.critical);
  }
  pipelineDeleteCheck(text, hit);
  for (const c of new Set(inner)) {
    if (c === command || !c.trim()) continue;
    // the allowlist judges the command as written (a wrapper around a payload is already high); payloads get the deny rules
    const d = assessCommand(c, 'safe', { allowlist: { off: true } });
    for (const m of d.warnings) hit(d.risk, m, d.critical);
  }
  for (const [re, r, msg, crit] of RULES) if (re.test(text)) hit(r, msg, crit);
  if (!lenient && !allowlist?.off) for (const m of allowlistProblems(command, { extra: allowlist?.extra })) hit('high', m);
  return { risk, warnings, critical };
}

// ---------------------------------------------------------------------------------------------
// Trust rule (v0.3 close3). A command is rated safe ONLY when it is byte-identical to a render of a catalog template whose
// intent is risk=safe, with slot values that are plain literals (plainSlotValue). Anything else (composer output, a
// history replay, a user edit, an unknown program, a construct the parser does not read) is at least high and needs an
// explicit "yes"; --yes never runs it. The parser above only raises risk, never lowers it: it adds the reasons and
// catches what must be retyped (critical), but a command it finds nothing wrong with is still not trusted.

export const UNTRUSTED = 'not a catalog command rendered by tellsh with plain values (edited, composed, from history or unknown); it is not checked as safe';

// characters a plain slot value never has: quotes (tellsh's own single quotes are the only ones), $ and backticks
// (expansion, $'…'), command separators and redirections, control characters, PowerShell's typographic quotes
const NOT_PLAIN = /['"`$;|&<>\u0000-\u001f\u007f\u2018-\u201f]/;
// find primaries that run, delete or write (`-exec`, `-ok`, `-delete`, `-fprint`, `-fls`)
const FIND_ACTION = /(?:^|\s)-(?:exec|execdir|ok|okdir|delete|fprint0?|fprintf|fls)(?=\s|$)/;
// a slot rendered where the program goes (`{cmd} --version`): a plain program name, never a path or a shell builtin

exec
/bin/bash -lc "sed -n '910,1080p' src/danger.js; sed -n '1,235p' src/pipeline.js" in /workspace/tellsh
 succeeded in 0ms:
// a slot rendered where the program goes (`{cmd} --version`): a plain program name, never a path or a shell builtin
// that runs a file or a string
const COMMAND_SLOTS = new Set(['cmd']);
const NOT_A_PROGRAM = /^(?:source|\.|eval|exec|builtin|command|sudo|doas|su|env|xargs|bash|sh|zsh|dash|ksh|fish|pwsh|powershell|cmd|iex|invoke-expression)$/i;
/**
 * Whether a slot value is a plain literal: a number, or a string without quotes, $, backticks, ; | & < >, control
 * characters or find actions. `dashOk`: a leading `-` is fine (a path rendered as `./-x`, a raw value its validator
 * accepted, `-mtime -1`); otherwise it could be read as an option.
 */
export function plainSlotValue(name, value, { dashOk = false } = {}) {
  if (value == null) return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value !== 'string') return false;
  if (NOT_PLAIN.test(value) || FIND_ACTION.test(value)) return false;
  if (/^-/.test(value) && !dashOk) return false;
  if (COMMAND_SLOTS.has(name) && (!/^[A-Za-z0-9][\w.+-]*$/.test(value) || NOT_A_PROGRAM.test(value))) return false;
  return true;
}

/**
 * The risk of a final command. `rendered`: the caller vouches that `command` is exactly what tellsh rendered from a catalog
 * template with plain slot values (fill.js buildCommand); `baseRisk` is then the intent's risk. Without it the command
 * is at least high.
 * @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}}
 */
export function checkDanger(command, baseRisk = 'safe', { rendered = false, allowlist = null } = {}) {
  const d = assessCommand(command, baseRisk, { allowlist });
  if (rendered || d.risk === 'high') return d;
  return { risk: 'high', warnings: [UNTRUSTED, ...d.warnings], critical: d.critical };
}
// End-to-end: request -> command for the target shell.
//
//   env (shell/os/coreutils) + history ctx ──► classifier context tokens (shell=, os=, ctx_*)
//   history rules ("same for X", "delete it") ─► may fix intent / fill slots deterministically
//   cascade: tool top-3 ─► intent (p(tool)·p(intent|tool))
//   slots: BIO tagger (tool-conditioned) ─► validated values; regex extraction fills/overrides failures
//   render for shell/os ─► danger check
//   low confidence (or unexplained modifiers) ─► second pass: experimental flag composer
import { getModel } from './model.js';
import { cascade } from './cascade.js';
import { tag, exFromSpans } from './tagger.js';
import { extractSlots, pickArg, isOptionWord, foldKeepLength } from './slots.js';
import { resolveSlots, buildCommand, finalizeSlots, RAW_OK } from './fill.js';
import { BY_ID } from './catalog.js';
import { FAMILY_OF, NONE } from './tools.js';
import { detectEnv, envFeatures } from './env.js';
import { buildContext, resolveReference, hasPronoun, hasLocative, cwdFlags, sameBut, entityForSlot, isAmbiguous } from './history.js';
import { AMB } from './shellwords.js';
import { compose } from './compose.js';
import { assessCommand, maxRisk } from './danger.js';
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
  args: () => false, pr: (v) => RAW_OK.pr(v), repo: (v) => RAW_OK.repo(v), wenv: (v) => RAW_OK.wenv(v), dryrun: (v) => RAW_OK.dryrun(v), delbranch: (v) => RAW_OK.delbranch(v), npmverb: (v) => RAW_OK.npmverb(v),
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
  if (isAmbiguous(v)) return false;
  if (RAW_OK[k]) return RAW_OK[k](v);
  if (VALID_SLOT[k]) return VALID_SLOT[k](String(v));
  return String(v).length < 300 && !/\0/.test(String(v));
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
  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr', 'repo', 'wenv', 'num', 'args']) {
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

exec
/bin/bash -lc "sed -n '235,530p' src/pipeline.js" in /workspace/tellsh
 succeeded in 0ms:
}

/** Second pass input: paths, numbers, ... from the merged extraction for the composer. */
function composeInput(text, model, tool, unclear = []) {
  const ex = extractSlots(text);
  const t = tag(text, tool, model);
  const exT = exFromSpans(text, t.spans);
  const merged = { ...ex };
  if (exT.paths.length) merged.paths = exT.paths;
  // paths followed by sentence punctuation (`/tmp/data!`): fine for a read-only command, but a composed
  // command that changes something is never aimed at them (see blocksAmbiguous)
  // the same for a path that is the output of a command (`on \`pwd\``, `$(pwd)`): the catalog withholds it too
  // and a quoted argument that may be words of the request (joinArgs)
  const amb = [...(merged.paths || []).filter((p) => trailingPunctAfter(text, p) || insideSubstitution(text, String(p))), ...unclear];
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
const blocksAmbiguous = (comp, amb) => !!comp && !comp.invalid && amb.some((p) => comp.command.includes(p)) &&
  (WRITING_TOOLS.has(comp.tool) || assessCommand(comp.command, 'safe').risk !== 'safe');

/**
 * Pure function used by the CLI, eval and tests.
 * opts: { shell, os, env, history: string[] (commands, oldest first), cwd, threshold, top, compose: 'auto'|'force'|'off',
 *         slotMode: 'merge'|'tagger'|'regex', model, rerank, rerankTop (candidates the rerank hook sees; default top) }
 */
export function suggest(query, opts = {}) {
  return replayFloor(suggestOnce(query, opts));
}

// the trust rule (danger.js): a command resolved from history (a reference, "same but …", a value from an earlier
// command) is a replay, not a fresh render of what the request says: at least high, never auto-run
const REPLAY = 'resolved from history (a replay of an earlier command, not a fresh catalog render); needs an explicit yes';
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
      const r = suggest(q, { model, env, threshold: thr, compose: 'off', unclearArgs });
      if (!r.understood || !r.intent || r.method !== 'catalog') return null;
      const slots = { ...(r.slots || {}) };
      for (const k of r.missing || []) slots[k] = AMB + `<${k}>`;
      return { intent: r.intent, slots };
    };
    const kind = opts.historyKind || opts.history.kind || (env.shell === 'powershell' ? 'pwsh' : 'posix');
    ctx = buildContext(opts.history, { classify: quick, cwd: opts.cwd, kind, query });
  }
  const ctxFeats = ctx ? ctx.features : (opts.cwd ? cwdFlags(opts.cwd).map((c) => 'ctx_cwd=' + c) : []);
  const extras = [...envFeatures(env), ...ctxFeats];
  const ref = ctx ? resolveReference(query, ctx) : null;
  const context = ctx ? { used: true, commands: ctx.n, rule: ref?.rule || null, note: ref?.note || null } : { used: false };

  const base = { query, shell: env.shell, os: env.os, coreutils: env.coreutils, threshold: thr, context };

  // ---- rule: "same for X" reuses the previous intent with one slot replaced ----
  if (ref?.rule === 'same-for') {
    const slots = validHistorySlots(ref.slots);
    // a value that fails validation (a 300-character path, ...) is a placeholder, never `find .`
    const blank = invalidHistorySlots(ref.slots);
    // the new path ends in sentence punctuation (`same for /tmp/data!`): placeholder, as for any request
    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null && BY_ID[ref.intent].risk !== 'safe' && trailingPunctAfter(query, slots[ref.changed])) {
      blank.push(ref.changed);
      delete slots[ref.changed];
    }
    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank, keepOptional: blank });
    const res = { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
    const punct = blank.filter((k) => !invalidHistorySlots(ref.slots).includes(k));
    if (punct.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${punct.join(', ')}); quote the path`];
    if (punct.length < blank.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: it is not a valid value (${blank.filter((k) => !punct.includes(k)).join(', ')})`];
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
  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
  const ambiguousPaths = [];
  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
  const blank = new Set(r.withheld || []);
  // withheld operands whose optional part keeps its placeholder: an invalid operand, a history value that is ambiguous or
  // invalid (`gh pr merge <PR>` for "same but merge" after `tellsh merge pr nightly`, never the current branch's pull request)
  const keep = new Set(r.invalidOperands);
  if (BY_ID[intent].risk !== 'safe') {
    for (const k of Object.keys(slots)) {
      if (PATH_SLOT_NAMES.has(k) && r.sources[k] !== 'history' && trailingPunctAfter(query, slots[k])) { ambiguousPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
    }
    if (ambiguousPaths.length) finalizeSlots(BY_ID[intent], slots);
  }
  // a changing command whose path is the output of a command (`in \`pwd\``, `$(pwd)`), or a request that names more
  // explicit paths than the command takes (`in /tmp/x and /tmp/y`: only one would be used): placeholder + warning
  const unclearPaths = [];
  if (BY_ID[intent].risk !== 'safe') {
    const explicit = explicitPaths(query);
    const nPathSlots = [...PATH_SLOT_NAMES].filter((k) => usesSlot(BY_ID[intent], k)).length;
    const dropped = explicit.filter((p) => !Object.values(slots).some((v) => String(v) === p));
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
    finalizeSlots(BY_ID[intent], slots);
    method = 'history-rule';
  }
  // "remove the logs there", "delete notes.txt there": a place reference never names the object of a changing
  // command (`rm -r DIR`, `mv DIR …`); only the location a search-and-change runs in (`find DIR … -delete`). Any path
  // the request names is relative to the wrong directory, so every path slot is withheld (with or without history).

codex
The risk checker restricts “safe” to catalog renders with validated values; history, composed commands, and edits are rated high. I’m now checking whether slot extraction can still discard an explicit target or substitute a default.
exec
/bin/bash -lc "sed -n '530,795p' src/pipeline.js; sed -n '1,210p' src/fill.js" in /workspace/tellsh
 succeeded in 0ms:
  // the request names is relative to the wrong directory, so every path slot is withheld (with or without history).
  if (locative && !refDst && !bothRefs && BY_ID[intent].risk !== 'safe' && FAMILY_OF[intent] !== 'find' && [...PATH_SLOT_NAMES].some((k) => usesSlot(BY_ID[intent], k))) {
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
  if (ctx && b.missing.length && ref?.rule !== 'refused' && BY_ID[intent].risk === 'safe' && b.risk === 'safe') {
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
  if (ambiguousText.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: unclear where the quoted text ends (\\" may be an escaped quote) (${ambiguousText.join(', ')})`];
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
    const ci = composeInput(query, model, fam, opts.unclearArgs);
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
    // a value with a line break is never composed into a command (the catalog rejects it as a path)
    if (comp && !comp.invalid && comp.command !== b.command && !/[\r\n]/.test(comp.command)) {
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
// Turn (intent, slots) into a concrete, safely-quoted command for the target shell.
import { BY_ID } from './catalog.js';
import { extractSlots, pickArg, pickDest, pickDir, foldKeepLength, isStopWord } from './slots.js';
import { checkDanger, maxRisk, plainSlotValue } from './danger.js';
import { shQuote, psQuote, chooseTemplate, quoteForKind, UnquotableError, pwshNativeSlots, unsafeNativePwshArg } from './render.js';

export { shQuote };

// Validators for slots that are inserted raw ({slot!raw}).
export const RAW_OK = {
  count: (v) => /^\d{1,6}$/.test(String(v)),
  depth: (v) => /^\d{1,2}$/.test(String(v)),
  days: (v) => /^\d{1,5}$/.test(String(v)),
  pid: (v) => /^\d{1,7}$/.test(String(v)),
  port: (v) => /^\d{1,5}$/.test(String(v)) && +v > 0 && +v < 65536,
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

exec
/bin/bash -lc "rg -n '"'^(export |function |const )'"' src/fill.js src/history.js src/render.js src/slots.js; cat test/regressions27.test.js" in /workspace/tellsh
 succeeded in 0ms:
src/slots.js:4:const FOLD = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };
src/slots.js:7:export function foldKeepLength(s) {
src/slots.js:20:const NUM_WORDS = {
src/slots.js:34:const NUM_WORD_RE = new RegExp(`\\b(${Object.keys(NUM_WORDS).sort((a, b) => b.length - a.length).join('|')})\\b`, 'g');
src/slots.js:35:const NUM = String.raw`(\d+(?:[.,]\d+)?)`;
src/slots.js:38:export const KNOWN_EXT = new Set(('log txt pdf py js mjs cjs ts tsx jsx json md csv tsv xml html htm css scss sh bash zsh ' +
src/slots.js:43:const AMBIG_EXT = new Set(['go', 'a', 'o', 'so', 'out', 'lock', 'env', 'db', 'class', 'war', 'tmp', 'doc', 'c', 'h', 'rs', 'sh']);
src/slots.js:44:export const EXT_ALIASES = {
src/slots.js:55:const WEAK_ALIAS = new Set(['text', 'logs', 'logi', 'logow', 'shell', 'backup', 'temp', 'java', 'image', 'video', 'ruby', 'rust']);
src/slots.js:56:const FILE_WORDS = /\b(files?|plik\w*|scripts?|skrypt\w*|sources?|zrodl\w*|documents?|dokument\w*)\b/;
src/slots.js:58:export const KNOWN_PROCS = new Set(('nginx apache2 httpd node nodejs python python3 java chrome chromium firefox code slack ' +
src/slots.js:64:export const KNOWN_SERVICES = new Set(('nginx apache2 apache httpd docker ssh sshd postgresql postgres mysql mariadb redis ' +
src/slots.js:70:const KNOWN_PKGS = new Set(('htop curl wget git vim nano tmux jq nodejs npm python3 python3-pip pip docker docker.io ' +
src/slots.js:76:const KNOWN_SCRIPTS = new Set(('dev start build test lint typecheck type-check preview serve watch format e2e deploy ' +
src/slots.js:78:export const KNOWN_TOOLS = new Set(('node nodejs npm npx pnpm yarn bun deno python python3 pip pip3 uv poetry pytest git gh docker ' +
src/slots.js:83:const SCRIPT_SYNONYMS = [
src/slots.js:91:const PKG_SKIP = new Set(('globally globalnie global -g --global system-wide systemowo package pakiet pakietu paczke paczka ' +
src/slots.js:96:const STOP = new Set(('the a an all any every some my me mi this that these those of for to in on at by with from ' +
src/slots.js:110:export const isStopWord = (w) => STOP.has(foldKeepLength(String(w)).toLowerCase());
src/slots.js:114:export const ROOT_LOCATION = /\b(whole (system|disk|drive|filesystem|computer)|entire (system|disk|drive|filesystem|computer)|root (dir(ectory)?|folder|filesystem)|cal\w* (system\w*|dysk\w*|komputer\w*)|(?:na|po) (?:cal\w* )?dysku(?!\s+[a-z]:)|on (?:the |my |this )?(?:whole |entire )?(?:disk|drive|hard drive|hdd|ssd)(?!\s+[a-z]:)|everywhere|wszedzie|katalog\w* glown\w*)\b/;
src/slots.js:116:export const ROOT_PHRASE_END = /(?:\b(?:whole|entire|cal\w*)\s+(?:dysk\w*|disk|drive|system\w*|filesystem|komputer\w*|computer)|\b(?:na|po)\s+(?:cal\w*\s+)?dysku|\bon(?: the| my| this)?(?: whole| entire)?\s+(?:disk|drive))$/;
src/slots.js:118:const LOCATIONS = [
src/slots.js:128:const blank = (s, start, end) => s.slice(0, start) + ' '.repeat(end - start) + s.slice(end);
src/slots.js:130:const wordEnd = (text, i) => { const m = /^[\p{L}\d]+/u.exec(text.slice(i)); return i + (m ? m[0].length : 1); };
src/slots.js:132:function numVal(s) {
src/slots.js:138:function sizeToFind(numStr, unit) {
src/slots.js:153:const UNIT_RE = String.raw`(minut\w*|mins?|minutes?|m|godzin\w*|godz|hours?|hrs?|h|dni|dnia|dzien|days?|d|dob\w*|tydzien|tygodni\w*|tyg|weeks?|w|miesiac\w*|mies|months?|lat|lata|rok|roku|years?)`;
src/slots.js:155:function unitOf(u) {
src/slots.js:164:export function durationDerived(amount, unit) {
src/slots.js:176:const PATH_TOKEN = /(?:^|[\s(=,])([A-Za-z]:\\[^\s"']*|\\\\[^\s"']+|(?:~|\.{1,2})?\/[^\s"']*|~(?=[\s,;:!?)]|$)|(?:[\w@+-][\w.@+-]*\/)+[^\s"']*|[\w@+-][\w@+-]*(?:\.[\w-]+)*\.[A-Za-z][A-Za-z0-9]{0,4}(?:\.[a-z0-9]{1,3})?)(?=$|[\s,;:!?).])/g;
src/slots.js:178:const countOf = (s, c) => s.split(c).length - 1;
src/slots.js:185:export function trimPathPunct(p) {
src/slots.js:201:export function extractSlots(input) {
src/slots.js:440:export function deinflect(w, vocab) {
src/slots.js:450:function nextAfter(words, triggers, { skip = STOP, accept = /^[\w@.:/+-]+$/ } = {}) {
src/slots.js:467:function withConstraint(text, w) {
src/slots.js:474:function original(text, folded) {
src/slots.js:479:const set = (s) => new Set(s.split(' '));
src/slots.js:480:const TRIG = {
src/slots.js:496:const OPTION_WORDS = ['recursively', 'recursive', 'rekurencyjnie', 'everywhere', 'wszedzie', 'case', 'insensitive', 'case-insensitive',
src/slots.js:499:const PATTERN_SKIP = new Set([...STOP, ...OPTION_WORDS]);
src/slots.js:501:export const isOptionWord = (w) => OPTION_WORDS.includes(foldKeepLength(String(w)).toLowerCase());
src/slots.js:502:const BRANCH_STOP = new Set([...STOP, 'on', 'off', 'and', 'then', 'git', 'switch', 'checkout', 'create', 'utworz', 'stworz', 'zrob', 'make', 'go', 'idz',
src/slots.js:504:const BRANCH_STRONG = set('branch branchu brancha branchem galaz galezi galezia -b checkout switch named called nazwie');
src/slots.js:506:const TAG_OF = { name: 'NAME', service: 'NAME', container: 'NAME', pkg: 'NAME', cmd: 'NAME', script: 'NAME', branch: 'BRANCH',
src/slots.js:510:function taggedArg(slot, ex) {
src/slots.js:523:export function pickArg(slot, ex) {
src/slots.js:615:const NOT_DIR = /^(plik|file|folder|katalog|director|dir$|ciag|ostatn|last|past|cal|whole|entire|this|current|biez|obecn|aktual|system|the$|my$|moim|moj|all$|each|every|real|czas|time|order|kolejn|desc|asc|base64|terminal|konsol|backgr|tle$|human|format|bajt|byte|linux|mac|bash|shell|repo|git|tym$|ten$|tej$|which|ktor|sort|reverse|odwrot|size|rozmiar|gb$|mb$|tar$|zip$|gz$)/;
src/slots.js:616:export function pickDir(ex) {
src/slots.js:630:export function pickDest(ex) {
src/render.js:13:const SAFE_POSIX = /^[A-Za-z0-9_\/.,:@%+-][A-Za-z0-9_\/.,:@%+=-]*$/;
src/render.js:19:export function shQuote(value, { tilde: expand = true } = {}) {
src/render.js:29:export function fishQuote(value, { tilde: expand = true } = {}) {
src/render.js:40:const PS_SQ = /['\u2018\u2019\u201A\u201B]/g;
src/render.js:41:const PS_DQ_SPECIAL = /[`$"\u201C\u201D\u201E]/g;
src/render.js:48:export function psQuote(value, { tilde: expand = true } = {}) {
src/render.js:58:export class UnquotableError extends Error {}
src/render.js:60:export class SwitchValueError extends UnquotableError {}
src/render.js:67:export function cmdQuote(value, { tilde: expand = true, attached = false } = {}) {
src/render.js:83:export const QUOTE = { bash: shQuote, zsh: shQuote, sh: shQuote, fish: fishQuote, powershell: psQuote, cmd: cmdQuote };
src/render.js:85:function posixTemplate(intent, env) {
src/render.js:98:const CMD_HOLD = /\uE000(\d+)\uE001/g;
src/render.js:99:const cmdTemplates = new WeakMap();
src/render.js:104:function cmdTemplate(fn) {
src/render.js:130:export function chooseTemplate(intent, env) {
src/render.js:160:export const unsafeNativePwshArg = (v) => { const s = String(v); return s === '' || s.includes('"') || (/\s/.test(s) && /\\$/.test(s)); };
src/render.js:161:const PS_KEYWORDS = new Set(['if', 'elseif', 'else', 'foreach', 'for', 'while', 'do', 'switch', 'return', 'try', 'catch', 'finally']);
src/render.js:163:export function pwshNativeSlots(tpl) {
src/render.js:180:export const quoteForKind =(kind, wrapPosix) => (wrapPosix ? shQuote : { posix: shQuote, fish: fishQuote, pwsh: psQuote, cmd: cmdQuote }[kind]);
src/history.js:14:export { isAmbiguous };
src/history.js:19:export function historyCandidates(shell, env = process.env, os = process.platform) {
src/history.js:38:function readTail(path, maxBytes = 32768) {
src/history.js:52:function unmetafy(buf) {
src/history.js:61:export function parseHistory(text, kind = 'bash', { partial = false } = {}) {
src/history.js:88:export function loadHistory({ shell = 'bash', file, n = 2, env = process.env, os = process.platform } = {}) {
src/history.js:112:const PS_CMDLET = /^[A-Za-z]+-[A-Za-z]+$/;
src/history.js:113:const lineKind = (line, kind) => (kind === 'pwsh' || PS_CMDLET.test(String(line).trim().split(/\s/)[0]) ? 'pwsh' : 'posix');
src/history.js:114:const PATHLIKE = /(?:^|\s)['"]?[~.\w-]*[\\/][\w.-]|\.\w{1,5}(?:['"]?\s|['"]?$)/;
src/history.js:115:const GLOB_SLOTS = new Set(['namepat', 'glob', 'pattern', 'sedexpr', 'old', 'new', 'text', 'message']);
src/history.js:118:const BT = '`';
src/history.js:122:const WORD_RE = {
src/history.js:127:function inverters() {
src/history.js:161:function invert(cmd, kind = 'posix') {
src/history.js:181:const FILE_HEADS = new Set(['cat', 'less', 'more', 'head', 'tail', 'vim', 'vi', 'nvim', 'nano', 'code', 'stat', 'file', 'wc',
src/history.js:183:const DIR_HEADS = new Set(['cd', 'ls', 'du', 'find', 'tree', 'mkdir', 'rmdir', 'pushd', 'ncdu']);
src/history.js:185:const INERT_HEADS = new Set(['echo', 'printf', 'man', 'which', 'whereis', 'type', 'history', 'clear', 'exit', 'export', 'alias', 'unalias',
src/history.js:188:const DOCKER_CT = new Set(['logs', 'exec', 'stop', 'start', 'restart', 'rm', 'inspect', 'attach', 'kill', 'top', 'port', 'pause', 'unpause']);
src/history.js:189:const DOCKER_VAL_FLAGS = new Set(['--tail', '-n', '--since', '--until', '-e', '--env', '-u', '--user', '-w', '--workdir', '-t', '--time', '-s', '--signal']);
src/history.js:190:const DOCKER_INTENT = { logs: 'docker_logs', stop: 'docker_stop', exec: 'docker_exec' };
src/history.js:191:const SYSTEMCTL_INTENT = { status: 'service_status', restart: 'service_restart', stop: 'service_stop', start: 'service_start', enable: 'service_enable' };
src/history.js:194:const PS_NATIVE = {
src/history.js:205:const PS_SERVICE_INTENT = { 'stop-service': 'service_stop', 'start-service': 'service_start', 'restart-service': 'service_restart', 'get-service': 'service_status' };
src/history.js:206:const PS_VALUE_PARAMS = new Set(['path', 'literalpath', 'lp', 'pspath', 'name', 'id', 'processname', 'computername', 'targetname', 'uri', 'destination',
src/history.js:210:function psArgs(args) {
src/history.js:225:const typeByExt = (p) => (/\.\w{1,5}$/.test(rawOf(p)) ? 'file' : 'dir');
src/history.js:232:function destEnts(srcs, dst, ents) {
src/history.js:243:const VALUE_OPTS = {
src/history.js:259:function parseArgs(args, valueOpts = new Set()) {
src/history.js:279:function unwrap(w) {
src/history.js:287:const CD_HEADS = new Set(['cd', 'pushd', 'popd', 'chdir', 'set-location', 'sl', 'push-location', 'pop-location']);
src/history.js:289:export const isRelativePath = (v) => {
src/history.js:293:const PATH_SLOT_KEYS = ['path', 'file', 'src', 'dst', 'dest', 'archive'];
src/history.js:295:function staleRelative(ents, slots) {
src/history.js:301:function staleRepo(ents, slots) {
src/history.js:306:const REDIR_TARGET_OP = /^\d*(?:[<>]{1,2}[&|]?|&>>?)$/;
src/history.js:307:const REDIR_DUP_OP = /^\d*[<>]+&[\d-]+$/;
src/history.js:310:function psNative(head, args, ents, setIntent) {
src/history.js:350:function entsFromSlots(intent, slots, ents) {
src/history.js:370:const TELLSH_LINE = /^(?:npx\s+(?:-y\s+)?|node\s+)?(?:\S*[\\/])?tellsh(?:\.js)?(?:\s+(.*))?$/s;
src/history.js:373:const TELLSH_VALUE_OPTS = new Set(['--shell', '--os', '--platform', '--top', '--threshold']);
src/history.js:379:export function tellshQuery(line, kind = 'posix') {
src/history.js:385:export function tellshArgs(line, kind = 'posix') {
src/history.js:411:export function analyzeCommand(line, classify, kind = 'posix') {
src/history.js:596:const FS_LISTERS = new Set(['ls', 'tree', 'dir', 'gci', 'get-childitem', 'll', 'la', 'find', 'fd', 'fdfind', 'locate', 'mlocate', 'plocate',
src/history.js:598:const FS_SEARCHERS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'select-string', 'sls', 'findstr']);
src/history.js:599:const PROC_LISTERS = new Set(['ps', 'top', 'htop', 'btop', 'atop', 'pgrep', 'pidof', 'pstree', 'get-process', 'gps', 'tasklist']);
src/history.js:601:const GLOBAL_VALUE_OPTS = {
src/history.js:609:const SCOPE_OPTS = {
src/history.js:617:const scopeTool = (x) => (/^GIT_/.test(x) ? 'git' : /^DOCKER_/.test(x) ? 'docker' : /^CONTAINER_/.test(x) ? 'podman' : 'gh');
src/history.js:618:const SCOPE_ENTS = { git: ['branch'], docker: ['container'], podman: ['container'], gh: ['pr', 'branch'] };
src/history.js:619:const SCOPE_ENV = /^(?:GIT_DIR|GIT_WORK_TREE|GIT_NAMESPACE|DOCKER_HOST|DOCKER_CONTEXT|DOCKER_CONFIG|CONTAINER_HOST|CONTAINER_CONNECTION|GH_REPO|GH_HOST)=/;
src/history.js:621:function unsetScopeVars(rw, setEnvCall = false) {
src/history.js:630:function scopedElsewhere(w, raw, exported = new Set()) {
src/history.js:644:const WRAPPER_CWD = {
src/history.js:656:const CWD_WRAPPERS = new Set(['pkexec']);
src/history.js:657:const WRAPPER_ROOT = {
src/history.js:663:const ROOT_WRAPPERS = new Set(['chroot', 'proot', 'firejail', 'bwrap', 'systemd-nspawn']);
src/history.js:666:const NS_WRAPPERS = new Set(['nsenter', 'unshare']);
src/history.js:669:const WRAPPER_HOST = {
src/history.js:675:const HOST_WRAPPERS = new Set(['machinectl']);
src/history.js:679:const PROP_WRAPPERS = new Set(['systemd-run', 'run0']);
src/history.js:681:const PROP_OPT = /^(?:-[tPqGdSr]*p|--property)$/;
src/history.js:682:const PROP_ATTACHED = /^(?:-[tPqGdSr]*p|--property=)(.+)$/;
src/history.js:683:const PROP_CWD = /^WorkingDirectory=/i;
src/history.js:684:const PROP_ROOT = /^(?:RootDirectory|RootImage|RootEphemeral|MountImages|ExtensionImages|ExtensionDirectories|BindPaths|BindReadOnlyPaths|TemporaryFileSystem|PrivateTmp|PrivateMounts|MountAPIVFS|PrivatePIDs|PrivateNetwork|NetworkNamespacePath|IPCNamespacePath|PrivateUsers|JoinsNamespaceOf|PrivateIPC|PrivateDevices)=|^ProtectHome=tmpfs\b/i;
src/history.js:689:function wrapperScope(w, raw) {
src/history.js:711:function markScoped(o) {
src/history.js:715:function afterGlobals(head, args) {
src/history.js:723:function listedBySegment(w, pipedIn, k) {
src/history.js:747:const LIST_INTENT = { docker_ps: ['container'], docker_ps_all: ['container'], docker_stats: ['container'], list_services: ['service'],
src/history.js:749:const LIST_FAMILY = { ls: ['file', 'dir'], find: ['file', 'dir'], grep: ['file', 'dir'], du: ['file', 'dir'], ps: ['pid', 'proc'], ss: ['port', 'pid', 'proc'] };
src/history.js:751:const listedByIntent = (intent) => (intent ? LIST_INTENT[intent] || LIST_FAMILY[FAMILY_OF[intent]] || [] : []);
src/history.js:754:const FILTER_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag', 'findstr', 'select-string', 'sls', 'where-object', 'where', '?']);
src/history.js:755:const GREP_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag']);
src/history.js:758:const isSearchRoot = (intent, slots, ents) => ents.dir != null && ['find', 'grep'].includes(FAMILY_OF[intent]) && String(ents.dir) === String(slots.path);
src/history.js:762:const oneOf = (ops) => (ops.length > 1 ? AMB + ops.map(rawOf).join(' ') : ops[0]);
src/history.js:765:function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
src/history.js:922:const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url', 'pr'];
src/history.js:924:const GH_PR_SELECTS = new Set(['view', 'checkout', 'co', 'merge', 'close', 'reopen', 'diff', 'checks', 'review', 'ready', 'edit', 'comment']);
src/history.js:925:const GH_PR_VALUE_OPTS = new Set(['-R', '--repo', '--json', '-q', '--jq', '-t', '--template', '--title', '-b', '--body', '-F',
src/history.js:945:export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
src/history.js:978:export function cwdFlags(cwd) {
src/history.js:989:export function ctxFeatures(ctx) {
src/history.js:1003:const SAME_RES = [
src/history.js:1015:const EXPLICIT_SAME = [SAME_RES[0], SAME_RES[3], SAME_RES[4], SAME_RES[6]];
src/history.js:1018:const fold = (q) => foldKeepLength(String(q)).toLowerCase();
src/history.js:1019:const PRONOUN_EN = /\b(it|its|that|this|them|those|these|the same one)\b/;
src/history.js:1020:const PRONOUN_WORD = /^(it|its|that|this|them|those|these|one|again|there|here|tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym|to|force|forced|forcibly|sila|sile|silowo|recursive\w*|rekurencyjn\w*|please|prosze|too|also|tez|rowniez)$/;
src/history.js:1022:const PLURAL = /(?:^|[^a-z])(them|those|these|je|te|tamte|ich|nimi)(?=$|[^a-z])/;
src/history.js:1023:const PRONOUN_PL = /(?:^|\s)(tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym)(?=\s|$|[?!.,])|(?:^|\s)to(?=\s*[?!.]*$|\s+(?:co|ktor\w*|tam)\b)|(?:^\s*|(?:^|\s)(?:zmerguj|scal|pokaz|zobacz|otworz|zamknij|sprawdz|wyswietl|zatwierdz|zaakceptuj|przejrzyj)\S*\s+)to(?=\s+(?:prs?\b|pull[\s-]+requests?\b))/;
src/history.js:1027:const LOCATIVE = new RegExp([
src/history.js:1038:export const hasLocative = (q) => LOCATIVE.test(fold(q));
src/history.js:1041:const CONTENTS = new RegExp([
src/history.js:1050:const NOUN_TYPE = [
src/history.js:1065:const FORCE = /\b(force\w*|forcibly|-9|sigkill|na sile|sila|silowo|brutaln\w*)\b/;
src/history.js:1066:const VERBS = [
src/history.js:1088:const SLOT_FROM_ENT = {
src/history.js:1094:const NOT_REF = /\b(?:that|which|this)\s+(?:are|is|was|were|have|has|had|(?:contain|match|end|start|begin|use|take|listen|run|belong|need)(?:s|es|ed|d|ing)?|running|using|taking|ran|took|do|does|did|can|could|will|would|should|i|you|we|they)\b|\b(?:this|that|last|next)\s+(?:week|month|year|day|morning|evening|afternoon|night|time|hour|minute)s?\b/g;
src/history.js:1095:const refText = (q) => fold(q).replace(NOT_REF, (m) => ' '.repeat(m.length));
src/history.js:1096:export const hasPronoun = (q) => PRONOUN_EN.test(refText(q)) || PRONOUN_PL.test(refText(q));
src/history.js:1099:export function sameFor(q) {
src/history.js:1109:function retarget(intent, arg) {
src/history.js:1133:export function resolveReference(query, ctx) {
src/history.js:1228:function locativeRef(fq, ctx) {
src/history.js:1248:export function changeGuard(type, value, fq, ctx) {
src/history.js:1271:const chooseValue = (type, ctx) => ctx.ents[type];
src/history.js:1274:const HINTED_NOUN = /\b(?:that|this|those|these|the|ten|ta|te|tamten|tamta|tamte)\s+([a-z0-9][\w.-]*)\s+(?:folders?|director(?:y|ies)|dirs?|files?|branch(?:es)?|containers?|services?|process(?:es)?|katalog\w*|folder\w*|plik\w*|kontener\w*|uslug\w*|galaz\w*|galez\w*)\b/g;
src/history.js:1276:const NOT_HINT = /^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back|list\w*|wylistuj\w*|check|sprawdz\w*|wipe|nuke|purge|destroy|clear|clean\w*|wyczysc\w*|drop|what|which|where|about|with|from|into|then|also|again|teraz|jeszcze|whatever|everything|anything|something|thing|stuff|still|there|here|tutaj|tamto|wszystko|cokolwiek|whole|entire|completely|cale|calym|listening|running|working|executable|wykonywaln\w*|contents?|zawartosc\w*|entries|inside|wewnatrz|siedzi|srodku|please|prosze|again|ponownie|znowu|forcefully|recursively|rekurencyjnie|permanently|trwale|names?|nazw\w*|only|tylko|same|samo|thing|merged|zmergowan\w*|scalon\w*|current|biezac\w*|aktualn\w*|obecn\w*|previous|poprzedni\w*|ostatni\w*|last|other|inn\w*|empty|pust\w*|temporary|tymczasow\w*|local|lokaln\w*|remote|zdaln\w*|stopped|zatrzyman\w*|created|utworzon\w*|newly|nowo|nowy|nowa|nowe|nowym|whole|cal\w*|samym|given|mentioned|wspomnian\w*|above|powyzsz\w*|broken|zepsut\w*|failed|failing|nieudan\w*|old\w*|star\w*)$/;
src/history.js:1277:const isHintWord = (w) => w.length >= 4 && !/^\d+$/.test(w) && !NOT_HINT.test(w) && !isStopWord(w) && !PRONOUN_WORD.test(w) && !FORCE.test(w)
src/history.js:1281:export function entityForSlot(slot, ctx) {
src/history.js:1293:const SAME_BUT = [/^\s*(?:and\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?,?\s+but\s+(.+)$/, /^\s*(?:a\s+|i\s+)?(?:to\s+)?samo,?\s+ale\s+(.+)$/,
src/history.js:1296:export function sameBut(query, ctx) {
src/history.js:1306:function intentUses(intent, ent) {
src/history.js:1310:function pickEnt(intent, ent, ctx) {
src/fill.js:7:export { shQuote };
src/fill.js:10:export const RAW_OK = {
src/fill.js:41:const PR_SELECTOR = /\b(?:pull[\s-]+requests?|pr|prs)\s+((?:(?:for|of|on|from|branch|number|no\.?|nr\.?|(?:the|a|my|our)(?=\s+branch\b))\s+)*)(?:(?:"([^"]*)"|'([^']*)'|`([^`]*)`|[„“”]([^„“”"]*)[“”])(?=[\s.,!?;:]|$)|(#?[^\s"'`„“”]+?)[.,!?]?(?=\s|$)|(["'`„“”]))/i;
src/fill.js:46:const PR_NOT_SELECTOR = /^(?:the|a|an|this|that|it|its|my|our|your|their|me|us|you|him|her|them|and|or|then|now|please|pls|into|to|with|without|in|at|by|is|was|which|again|request|requests|status|state|checks?|details?|info|summary|description|diff|changes|comments?|github|gh|web|browser|online|here|there|today|yesterday|tomorrow|earlier|later|review|fork|upstream|fast|asap|already|first|too|also|quickly|immediately|directly|safely|manually|automatically|finally|only|just|really|simply|properly|carefully|right|soon|instantly|issues?|tickets?|bugs?)$/i;
src/fill.js:49:const PR_MARKED = /[\d/_.#-]/;
src/fill.js:51:const PR_ABBREV = /^(?:e\.g|i\.e|w\/o|w\/|etc|vs|cf|a\.k\.a|n\/a|b\/c)$/i;
src/fill.js:52:const PR_HOST = /^(?:[\w-]+\.)+(?:com|org|net|io|dev|app|co|me)$/i;
src/fill.js:54:const PR_NUMBER_LEAD = /^(?:(?:number|no\.?|nr\.?)\s+)*$/i;
src/fill.js:55:const PR_WORD = /\b(?:pull[\s-]+requests?|pr|prs)\b/i;
src/fill.js:57:const PR_ISSUE = /^(?:issues?|tickets?|bugs?)$/i;
src/fill.js:59:const PR_UNIT_AFTER = /^\s+(?:secs?|seconds?|mins?|minutes?|hours?|hrs?|days?|weeks?|months?|years?|times?|ago|old|more|approvals?|reviews?|reviewers?|commits?|files?|lines?|changes?|comments?|checks?)\b/i;
src/fill.js:62:const PR_HASH_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit)\s+)+$/i;
src/fill.js:65:const PR_QUALIFIED = /^\s*(?:in\s+question\b|(?:by|from|since|before|after|about|titled|named|called|that|which|who|whose|where|od|autorstwa)\b|(?:\S+\s+)?(?:opened|created|authored|submitted|raised|written|made|sent|pushed|filed)\b)|\b(?:yesterday|today|tonight|tomorrow|ago|last\s+(?:week|month|year|night|friday|monday|tuesday|wednesday|thursday|saturday|sunday)|wczoraj\w*|dzisiaj|dzi[sś])\b/i;
src/fill.js:68:const PR_DESCRIBED = /^\s*(?:with|having|z|o)\s+(?:the\s+|a\s+)?(?:labels?|title|titled|name|tags?|authors?|assignees?|milestone|description|text|keywords?|words?|subject|commits?|etykiet\w*|tytu\w*|nazw\w*|autor\w*)\b|^\s*(?:labell?ed|tagged|assigned|mentioning|containing|regarding|concerning|touching|fixing|adding|removing|updating|changing)\b/i;
src/fill.js:71:const PR_WHEN = /^(?:last|this|next|past|previous|previously|before|earlier|ages|recently|lately|week|month|year|morning|afternoon|evening|night|weekend|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun|january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec|ago|wczoraj\w*|dzisiaj|przedwczoraj|zesz\w*|poprzedni\w*|wcze\w*)$/i;
src/fill.js:75:const PR_DET_WORD = /(?:^|\s)(?:the|a|an|my|our|your|his|her|their|this|that|these|those|its|ten|tego|ta|tamten|to)\s+((?:\S+\s+){1,3})$/i;
src/fill.js:76:const PR_DET_NEUTRAL = /^(?:current|branch|branch's|branch’s|own|one|same|previous|last|prior|single|github|gh|pull|this|that|the|my|our|bieżący\w*|biezacy\w*|obecn\w*|aktualn\w*|mój|moj\w*|nasz\w*|sw[oó]j|swoj\w*|ten|tego)$/i;
src/fill.js:77:const PR_ANAPHOR = /(?:^|\s)(?:said|above|aforementioned|abovementioned|above-mentioned|mentioned|referenced|aforesaid|forementioned|wspomnian\w*|powy[zż]sz\w*|ww\.?)\s+(?:\S+\s+)?$/i;
src/fill.js:80:const PR_VERB = /^(?:merge|squash|rebase|land|ship|accept|view|show|open|display|see|check|checkout|diff|review|approve|close|reopen|edit|ready|comment|list|get|fetch|print|describe|zmerguj\w*|scal\w*|poka[zż]\w*|zobacz\w*|otw[oó]rz\w*|zamknij\w*|sprawd[zź]\w*|wy[sś]wietl\w*|zatwierd[zź]\w*|zaakceptuj\w*|przejrzyj\w*)$/i;
src/fill.js:81:const PR_FILLER = /^(?:please|pls|now|then|just|and|also|out|up|go|ahead|to|it|tamten|that|this|ten|tego|gh|github|pull|i|you|can|could|would|will|let's|lets|me|us|want|need|prosz[eę]|teraz|i|oraz|a)$/i;
src/fill.js:83:const PR_STATE = /^(?:open|ready|review|close)$/i;
src/fill.js:84:function prWordBefore(before) {
src/fill.js:94:const PR_AFTER_PICK = /^\s*(?::\s*|[-–—]\s+|\s(?:for|of|with|in|on|from|about|regarding|re|dla|z|w|od)\s+)(?:(?:the|a|an|my|our|your|his|her|their|its|this|that)\s+)*([^\s.,!?;:]*)/i;
src/fill.js:95:const PR_AFTER_NEUTRAL = /^(?:$|-\S*|github|gh|web|browser|online|cli|terminal|here|this|current|same|local|repo|repository|squash|squashing|rebase|rebasing|merge|merging|auto|automerge|auto-merge|admin|review|me|us|it|now|please|pls|main|master|default|teraz|prosz[eę]|githubie|przegl[aą]darce)$/i;
src/fill.js:96:const prPickedAfter = (after) => {
src/fill.js:101:const PR_URL_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|and|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit|the|this|that|a|pull|requests?|pr|prs|at|is|me|you|can|could|would|i|want|to|url|link|[(]|zmerguj\w*|scal\w*|poka[zż]\w*|zobacz\w*|otw[oó]rz\w*|zamknij\w*|sprawd[zź]\w*)[\s:,]+)*[(<]?$/i;
src/fill.js:103:const PR_DEM_NUMBER = /\b(?:ten|(?:that|this|which|the)\s+one)\s+(?:\S+\s+)?(?:prs?|pull[\s-]+requests?)\b/gi;
src/fill.js:105:const PR_BRANCH_NAMED = /\b(?:for|of|on|from)\s+(?:\S+\s+){0,2}branch\b/i;
src/fill.js:107:const PR_DELETE_BRANCH = /\b(?:and\s+)?(?:delete|remove|usun)\s+(?:the\s+|its\s+|that\s+|tego\s+|ten\s+|t[ea]\s+)?(?:(?:local\s+and\s+remote|remote|head|feature)\s+)?(?:branch|branche?a?|galaz|galez)\b(?:\s+(?:after(?:wards)?|too|as\s+well|potem|tez))?/g;
src/fill.js:108:const PR_DELETE_NEGATED = /(?:\b(?:not|no|never|without|nor|nie|bez)|n't|\bdont)\s+(?:\S+\s+){0,1}$/;
src/fill.js:112:const WR_DRY = /\bdry[\s-]*run\b|\bna\s+sucho\b|\bwithout\s+(?:actually\s+)?(?:deploying|publishing|uploading)\b|\b(?:don'?t|do\s+not)\s+actually\s+(?:deploy|publish|upload)\b|\bbez\s+(?:faktycznego\s+)?(?:wdra[zż]ania|publikowania|deployu?)\b/i;
src/fill.js:113:const WR_DRY_NOT = /\b(?:not|no|without|skip|skipping|nie|bez)\s+(?:a\s+|the\s+|any\s+)?dry[\s-]*run\b|\b(?:don'?t|do\s+not)\s+(?:do\s+)?(?:a\s+|the\s+)?dry[\s-]*run\b/gi;
src/fill.js:114:const wranglerDry = (t) => WR_DRY.test(t.replace(WR_DRY_NOT, ' '));
src/fill.js:120:const WR_Q = `(?:"[^"]*"|'[^']*'|\`[^\`]*\`|[„“”][^„“”"]*[“”]|\\S+)`;
src/fill.js:121:const WR_ENV_OPT = new RegExp(`(?:^|\\s)(?:--env|-e|env)(?:=|(?<!\\benv)\\s+)(${WR_Q})`, 'i');
src/fill.js:122:const WR_ENV_AFTER = new RegExp(`\\b(?:env|environment|środowisk\\w*|srodowisk\\w*)\\s+(called\\s+|named\\s+|o\\s+nazwie\\s+)?(${WR_Q})`, 'gi');
src/fill.js:123:const WR_ENV_BEFORE = /(?:^|\s)(\S+)\s+(?:env|environment)\b/gi;
src/fill.js:124:const WR_ENV_PREP = new RegExp(`\\b(to|on|in|into|for|na|do|w|dla)\\s+(?:the\\s+|my\\s+|our\\s+)?(${WR_Q})(\\s+\\S+)?`, 'gi');
src/fill.js:125:const WR_ENV_KNOWN = /^(?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)$/i;
src/fill.js:128:const WR_ENV_STRONG = /^(?:production|prod|staging|stage|qa|uat|canary|preview|sandbox)$/i;
src/fill.js:130:const WR_ENV_END = /^\s+(?:and|then|now|please|pls|too|also|again|today|asap|with|using|via|without|from|but|so|env|environment)$/i;
src/fill.js:131:const WR_ENV_ANY = /\b(?:env|environment|środowisk\w*|srodowisk\w*|produkcj\w*|staging\w*|production|prod|stage|qa|uat|canary|sandbox)\b/i;
src/fill.js:134:const WR_ENV_STEM = /^(?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)(?=[\d_-])|[\d_-](?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)$/i;
src/fill.js:136:const wrEnvWord = (w) => {
src/fill.js:140:const wrQuoted = (w) => /^["'`„“”]/.test(String(w));
src/fill.js:142:const wrEnvMarked = (w) => RAW_OK.wenv(w) && /[A-Za-z]/.test(w) && /[\d_-]/.test(w);
src/fill.js:144:function wranglerEnv(t) {
src/fill.js:180:const SEL_WORDS = (s) => {
src/fill.js:184:const selHas = (v, w) => v.words.has(w) || v.stems.some((s) => w.startsWith(s));
src/fill.js:185:const SEL_COMMON = SEL_WORDS(`
src/fill.js:202:const SEL_FAMILY = {
src/fill.js:209:const SEL_INTENT = {
src/fill.js:248:const SEL_PICKERS = new Set(('latest last recent recently newest new old older oldest first second third next previous prior other another ' +
src/fill.js:251:const selFamilyAll = {};
src/fill.js:260:const SEL_SLOT = { gh_pr_merge: 'pr', gh_pr_view: 'pr', gh_pr_checks: 'pr', gh_run_view: 'num' };
src/fill.js:261:export const hasSelectorRule = (intentId) => /^(?:gh|wrangler)_/.test(intentId);
src/fill.js:263:const SEL_OTHER_NUMBER = /\b(?:issues?|tickets?|bugs?|zgloszeni\w*|fix(?:es)?|closes|resolves|naprawia\w*|zamyka\w*)\s+#?\d+\b/g;
src/fill.js:264:const SEL_ENV_PREP = /^(?:to|on|in|into|for|na|do|w|dla|env|environment|srodowisk\w*|called|named|nazwie)$/;
src/fill.js:265:const SEL_NEGATION = /^(?:not|never|don't|dont|nor|except|excluding|without|instead|rather|nie|bez|oprocz|poza|zamiast)$/;
src/fill.js:266:const SEL_DET = /^(?:the|a|an|my|our|this|that)$/;
src/fill.js:271:export function selectorResidue(intentId, text, values = {}) {
src/fill.js:308:const SEL_EXPLICIT = { pr: (v) => /^\d+$|^https?:\/\//.test(v), num: (v) => /^\d+$/.test(v), wenv: (v) => RAW_OK.wenv(v) };
src/fill.js:309:const selEnvish = (r) => /[a-z]/.test(r.w) && (SEL_ENV_PREP.test(r.prev) || WR_ENV_KNOWN.test(r.w) || WR_ENV_STEM.test(r.w) || /^(?:prod|produkc|staging|stage)/.test(r.w));
src/fill.js:317:export function selectorWithhold(intentId, text, values = {}) {
src/fill.js:342:const NPM_NOT_PKG = new Set(('dependencies dependency dependecies dependancies deps dep zaleznosci zaleznosc project projekt projektu ' +
src/fill.js:346:const NPM_INSTALL_VERB = /^(?:install|instal|add|i|zainstaluj|instaluj|doinstaluj|dodaj|pobierz|get|reinstall)$/;
src/fill.js:348:const NPM_CI = /(?:^|\s)npm\s+ci(?=\s|$)|\bclean[\s-]+install\w*|\bczyst\w*\s+instalacj\w*/i;
src/fill.js:354:function npmInstallTarget(text, v) {
src/fill.js:375:function prSelector(ex) {
src/fill.js:428:const PR_REPO_OPT = /(?:^|\s)(?:--repo(?:=|\s+|$)|-R(?:=|\s*))(\S*)/;
src/fill.js:429:const PR_REPO = /\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(?:github\s+)?(?:repo|repository|repozytorium)\s+(\S+)|\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(\S+(?:\s+\S+)?)\s+(?:github\s+)?(?:repo|repository)\b|\b(?:w|z)\s+repozytorium\s+(\S+)/i;
src/fill.js:431:const PR_REPO_HERE = /^(?:the|a|an|this|current|same|our|my|local|own|tym|tego|bieżącym|biezacym)(?:\s+(?:current|same|local|own))?$/i;
src/fill.js:433:const PR_REPO_HASH = /(?:^|\s)((?:https:\/\/)?(?:[\w-]+(?:\.[\w-]+)+\/)?[\w.-]+\/[\w.-]+)#(\d{1,12})(?=[\s.,!?;:]|$)/;
src/fill.js:436:const PR_REPO_PREP = /(?:^|\s)(in|of|on|from|for|at|to)\s+(?:the\s+)?(?:github\s+)?(\S+)/gi;
src/fill.js:437:const PR_SELECTOR_SPOT = /\b(?:pull[\s-]+requests?|pr|prs)\s+(?:(?:for|of|on|from|branch|number|no\.?|nr\.?|(?:the|a|my|our)(?=\s+branch\b))\s+)*$/i;
src/fill.js:438:const repoValue = (w) => w.replace(/[.,!?;:]+$/, '').replace(/^["'`]|["'`]$/g, '').replace(/^https:\/\/(?=github\.com\/)/i, '').replace(/(?:\.git)?\/?$/, '');
src/fill.js:442:const PR_URL_REPO = /(?:https?:\/\/)?github\.com\/([\w.-]+\/[\w.-]+)\/pull\/\d+/gi;
src/fill.js:443:const repoKey = (w) => w.toLowerCase().replace(/^github\.com\//, '');
src/fill.js:444:function repoMentions(text) {
src/fill.js:454:function prRepo(text) {
src/fill.js:478:const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
src/fill.js:479:const PLACEHOLDER = (name) => `<${name.toUpperCase()}>`;
src/fill.js:483:const sedEscapeOld = (s) => s.replace(/[\\/.*^$[\]]/g, '\\$&').replace(/\n/g, '\\n');
src/fill.js:484:const sedEscapeNew = (s) => s.replace(/[\\/&]/g, '\\$&').replace(/\n/g, '\\n');
src/fill.js:487:export function finalizeSlots(intent, v) {
src/fill.js:495:export function resolveSlots(intent, ex) {
src/fill.js:671:const CONTESTED = (id) => (hasSelectorRule(id) ? ['pr', 'num', 'wenv', 'repo', 'var'] : /^(?:npm_install|npm_install_global|pip_install)$/.test(id) ? ['pkg'] : id === 'npm_run_script' ? ['script'] : []);
src/fill.js:673:const SEL_ALT = /^(?:or|either|vs|versus|instead|rather|albo|lub|zamiast|ewentualnie|badz)$/;
src/fill.js:674:const SEL_NEG = /^(?:not|never|nor|don't|dont|except|excluding|exclude|without|nie|oprocz|poza|bez|wykluczajac)$|n't$/;
src/fill.js:676:const SEL_NEG_STATE = /^(?:tak|dziala\w*|przeszl\w*|przeszedl|przechodz\w*|poszlo|wyszlo|work\w*|pass\w*|ok|okay|right|sure|good|green|zielon\w*)$/;
src/fill.js:678:const SEL_CLAUSE_END = /^(?:and|then|i|oraz|potem|so)$/;
src/fill.js:680:const SEL_NUM_OTHER_BEFORE = /^(?:issues?|tickets?|bugs?|zgloszeni\w*|fix(?:es)?|closes|resolves|line|lines|linii|top|last|first)$/;
src/fill.js:681:const SEL_NUM_UNIT_AFTER = /^(?:secs?|seconds?|mins?|minutes?|minut\w*|hours?|hrs?|godzin\w*|days?|dni|dzien|weeks?|tygodn\w*|months?|miesi\w*|years?|lat\w*|times?|razy|ago|temu|old|more|approvals?|reviews?|reviewers?|commits?|files?|lines?|changes?|comments?|checks?)$/;
src/fill.js:682:const SEL_ENV_ALIAS = (w) => (/^(?:prod|production|produkc\w*)$/.test(w) ? 'prod' : /^(?:staging|stage|stagingu|stagingowe\w*)$/.test(w) ? 'staging' : w);
src/fill.js:683:const tokenClean = (w) => w.replace(/^[("'`„“”]+|[)"'`“”.,!?;:]+$/g, '');
src/fill.js:685:export function contestedSlots(intentId, text, values = {}) {
src/fill.js:732:function renderValue(name, raw, values, quote) {
src/fill.js:740:const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;
src/fill.js:746:export function render(template, values, required = [], quote = shQuote, keepOptional = []) {
src/fill.js:776:const DERIVED_REQUIRED = { namepat: 'name', glob: 'ext', sedexpr: 'old' };
src/fill.js:778:const SIZE_MULT = { c: 1, k: 1024, M: 1024 ** 2, G: 1024 ** 3 };
src/fill.js:780:export function deriveSlots(v) {
src/fill.js:794:export const envFromPlatform = (platform = process.platform) => ({
src/fill.js:806:export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [], keepOptional = [] } = {}) {
// Regression tests for the v0.3 final2 review (review/final2-claude.md, review/final2-codex.md) and the structural rules
// that replace further parser patches:
//  (1) trust rule: a command is safe ONLY when it is tellsh's own render of a risk=safe catalog template with plain slot
//      values; edited, composed, history-replayed and unknown commands are at least high (--yes never runs them). The
//      parser only raises risk: it still reads $'…' quoting and sed e/w so a destructive payload stays critical.
//  (2) contested selectors: an alternative or a negation next to a selector (or / albo / lub / not / nie / oprócz /
//      except …) or two candidate values for one slot give a placeholder for that slot, never one of the candidates.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { buildCommand } from '../src/fill.js';
import { INTENTS, BY_ID } from '../src/catalog.js';
import { checkDanger, assessCommand, plainSlotValue, UNTRUSTED } from '../src/danger.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, opts = {}) => suggest(q, { env: BASH, ...opts });

// every command the two final2 reviews reported as safe
const FINAL2_DANGER = [
  // final2-claude blocker: $'…' hid the command after it
  "echo $'\\''; rm -rf ~ #'",
  "echo $'\\''; npx evil #'",
  "ls $'\\''`npx evil`'",
  // final2-claude major: find -exec runs any program
  'find . -exec ./evil {} +',
  'find . -exec bash ./evil.sh \\;',
  'find . -exec npx evil \\;',
  // final2-claude major: . and source run any file
  '. /tmp/x',
  'source ./evil.sh',
  'source ~/.bashrc',
  // final2-claude lesser: GNU sed e
  "sed 's/a/b/e' f",
  "sed -n '1e cmd' f",
  // final2-codex major
  "sed '1e rm -r /tmp/valuable' input.txt",
  'diskutil eraseDisk APFS New disk2',
  'source ./deploy.sh',
];

test('final2: every reported command is high risk (never safe) and needs an explicit yes', () => {
  for (const c of FINAL2_DANGER) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', `${c}: ${d.warnings.join('; ')}`);
  }
});

test("final2 blocker: $'…' is parsed as bash does, so the command after it is seen (rm -rf ~ stays critical)", () => {
  const d = assessCommand("echo $'\\''; rm -rf ~ #'");
  assert.equal(d.risk, 'high');
  assert.equal(d.critical, true, d.warnings.join('; '));
  assert.ok(assessCommand("echo $'\\''; npx evil #'").warnings.some((m) => /npx evil|unknown subcommand/.test(m)));
  assert.ok(assessCommand("ls $'\\''`npx evil`'").warnings.some((m) => /substitution/.test(m)));
  // a closed $'…' with no escape is still one word
  assert.equal(assessCommand("echo $'a b'").critical, false);
});

test('final2 lesser: the parser flags sed scripts that run a command or write a file', () => {
  for (const c of ["sed 's/a/b/e' f", "sed -n '1e cmd' f", "sed 'w out' f", "sed -e 's/a/b/w x' f", 'sed -f script.sed f']) {
    assert.ok(assessCommand(c).warnings.some((m) => /^sed /.test(m)), c);
  }
  for (const c of ["sed -n '120,180p' f", "sed 's/e/w/g' f", "sed '/we/d' f", "readlink /etc/localtime | sed 's#.*/zoneinfo/##'"]) {
    assert.ok(!assessCommand(c).warnings.some((m) => /^sed /.test(m)), c);
  }
});

test('trust rule: any command that is not a catalog render is at least high, however harmless it looks', () => {
  for (const c of ['ls -la', 'df -h', 'git status', 'diskutil list', 'echo hi']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', c);
    assert.ok(d.warnings.includes(UNTRUSTED), c);
    // the same text vouched for as tellsh's own render is judged by the parser alone
    assert.notEqual(checkDanger(c, 'safe', { rendered: true }).risk, 'high', c);
  }
  // a catalog render does not lower a risk the parser finds
  assert.equal(checkDanger('rm -rf /', 'safe', { rendered: true }).critical, true);
});

test('trust rule: a safe catalog render is safe only with plain slot values', () => {
  assert.equal(run('show free disk space').risk, 'safe');
  assert.equal(buildCommand('count_lines', '', { env: BASH, resolved: { file: 'notes.txt' } }).risk, 'safe');
  for (const file of ['a;b.txt', "it's.txt", 'a$b', 'a`b`', 'a|b', 'a>b', 'a\nb', 'x’y']) {
    const r = buildCommand('count_lines', '', { env: BASH, resolved: { file } });
    assert.equal(r.risk, 'high', JSON.stringify(file));
    assert.ok(r.warnings.includes(UNTRUSTED), JSON.stringify(file));
  }
  // a path starting with - is rendered ./-x (plain); a pattern starting with - is not
  assert.equal(buildCommand('count_lines', '', { env: BASH, resolved: { file: '-x' } }).risk, 'safe');
  assert.equal(buildCommand('grep_text', '', { env: BASH, resolved: { pattern: '-e' } }).risk, 'high');
  // a program slot: never a builtin that runs a file / a string, never a path
  for (const cmd of ['source', '.', 'eval', './evil', '/tmp/evil']) {
    assert.equal(buildCommand('tool_version', '', { env: BASH, resolved: { cmd } }).risk, 'high', cmd);
  }
  assert.equal(buildCommand('tool_version', '', { env: BASH, resolved: { cmd: 'node' } }).risk, 'safe');
  assert.equal(plainSlotValue('name', 'x -exec rm {} +'), false);
  assert.equal(plainSlotValue('age', '-mtime -1', { dashOk: true }), true);
});

test('trust rule: only risk=safe catalog intents ever render safe, in every shell', () => {
  const envs = [BASH, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'fish', os: 'linux', coreutils: 'gnu' },
    { shell: 'powershell', os: 'win32' }, { shell: 'cmd', os: 'win32' }];
  for (const it of INTENTS) {
    for (const env of envs) {
      let r;
      try { r = buildCommand(it.id, '', { env, resolved: {} }); } catch { continue; }
      if (r.command && r.risk === 'safe') assert.equal(BY_ID[it.id].risk, 'safe', `${it.id} ${env.shell}`);
    }
  }
});

test('trust rule: history replays and composed commands are at least high', () => {
  const h = run('count lines in it', { history: ['cat notes.txt'], compose: 'off' });
  assert.equal(h.method, 'history-rule');
  assert.equal(h.risk, 'high');
  const same = run('same for /var', { history: ['du -sh /home'], compose: 'off' });
  assert.equal(same.command, 'du -sh /var');
  assert.equal(same.risk, 'high');
  // the same request without history is a fresh catalog render: safe
  assert.equal(run('show the size of /var').risk, 'safe');
  const c = run('list files sorted by size with human readable sizes in reverse order', { compose: 'force' });
  assert.equal(c.method, 'composed');
  assert.equal(c.risk, 'high');
});

test('final2-codex: competing selectors give a placeholder, never one of the candidates', () => {
  for (const [q, cmd, missing] of [
    ['merge pr 4 or 44', 'gh pr merge <PR>', ['pr']],
    ['deploy worker --env prod --env prodprod', 'npx wrangler deploy --env <WENV>', ['wenv']],
    ['merge pr 42 but not in repo acme/app', 'gh pr merge 42 --repo <REPO>', ['repo']],
  ]) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.deepEqual(r.missing, missing, q);
  }
});

test('contested selectors: alternatives / negations (EN, PL) and two candidates for one slot', () => {
  for (const [q, cmd] of [
    ['zmerguj pr 42 albo 43', 'gh pr merge <PR>'],
    ['merge pr 42, not 43', 'gh pr merge <PR>'],
    ['deploy worker to prod, not staging', 'npx wrangler deploy --env <WENV>'],
    ['wdróż workera na produkcję, nie na staging', 'npx wrangler deploy --env <WENV>'],
    ['deploy worker to staging and production', 'npx wrangler deploy --env <WENV>'],
    ['install axios or lodash with npm', 'npm install <PKG>'],
    ['view run 8080808, not 123', 'gh run view <NUM>'],
    // the alternative is about the repository: the pull request stays
    ['merge pr 42 --repo acme/app or --repo other/repo', 'gh pr merge 42 --repo <REPO>'],
  ]) assert.equal(run(q).command, cmd, q);
  // no alternative / negation next to a selector: unchanged
  for (const [q, cmd] of [
    ['merge pr 42', 'gh pr merge 42'],
    ['npm install axios', 'npm install axios'],
    ['deploy worker to production', 'npx wrangler deploy --env production'],
    ['deploy worker to prod without a dry run', 'npx wrangler deploy --env prod'],
    ['co poszło nie tak w runie pipeline 8080808', 'gh run view 8080808'],
    ['why is run 8080808 not passing', 'gh run view 8080808'],
  ]) assert.equal(run(q).command, cmd, q);
});

test('a negated branch delete is no --delete-branch; a withheld run number is a placeholder, never dropped', () => {
  for (const q of ["merge pr 42 and don't delete the branch", 'zmerguj pr 42 i nie usuwaj brancha', 'merge pr 42 without deleting the branch']) {
    assert.equal(run(q).command, 'gh pr merge 42', q);
  }
  assert.equal(run('merge pr 42 and delete the branch').command, 'gh pr merge 42 --delete-branch');
  // was `gh run view` (the withheld `?` dropped the optional run number)
  assert.equal(run('view run 8080808 2').command, 'gh run view <NUM>');
});

exec
/bin/bash -lc 'npm test' in /workspace/tellsh
exec
/bin/bash -lc "sed -n '495,670p' src/fill.js; sed -n '800,980p' src/fill.js; cat src/render.js" in /workspace/tellsh
 succeeded in 0ms:
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
    if (ex.pid) v.pid = ex.pid;
    else if (ex.numbers?.length) v.pid = ex.numbers.find((n) => n > 1);
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
  for (const k of contestedSlots(intent.id, String(ex.text), v)) if (has(k)) v[k] = '?';
  for (const k of Object.keys(v)) if (v[k] === undefined) delete v[k];
  return v;
}

// ---------------------------------------------------------------------------------------------
// Contested selectors (v0.3 close3): a selector the request offers alternatives for or negates ("merge pr 4 or 44", "merge
// pr 42 but not in repo acme/app", "deploy to prod, not staging", "zainstaluj axios albo lodash"), or names two candidate
// values for ("--env prod --env prodprod"), is withheld as a placeholder the user fills, never one of the candidates.
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
      const pathVals = new Set([...PATH_SLOTS].filter((k) => vals[k] != null).map((k) => String(vals[k])));
      const q = (s) => {
        const isPath = pathVals.has(String(s));
        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { tilde: isPath });
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
  const danger = checkDanger(command, intent.risk, { rendered: plain });
  return {
    ...base,
    command,
    risk: maxRisk(intent.risk, danger.risk),
    warnings: danger.warnings,
    critical: danger.critical,
    missing,
  };
}
// Per-shell rendering: pick the template variant for (shell, os, coreutils) and quote slot values
// for that shell. Intent and slots are shared across shells; only the rendered command differs.
//
// Precedence
//   bash/zsh/sh  linux: busybox (if busybox userland) ?? template
//                darwin: gnuMac (GNU coreutils present) ?? bsd ?? catalog darwin ?? template
//   fish         fish ?? the POSIX choice above (fish quoting)
//   powershell   pwsh (string | {win, unix}); no unix variant -> `bash -c '<posix>'`; no win variant -> gap
//   cmd          cmd ?? gap
import { VARIANTS } from './variants.js';

// never a leading `=`: zsh expands `=word` to the path of command `word`
const SAFE_POSIX = /^[A-Za-z0-9_\/.,:@%+-][A-Za-z0-9_\/.,:@%+=-]*$/;

// Every quote function takes { tilde }: true (default) only for path slots, where a leading ~ means
// the home directory; any other value (grep pattern, commit message, sed text) stays a literal `~`.

/** POSIX shell quoting. Keeps a leading ~/ of a path unquoted so tilde expansion still works. */
export function shQuote(value, { tilde: expand = true } = {}) {
  const s = String(value);
  if (s === '') return "''";
  const tilde = expand && s.match(/^~(\/|$)(.*)$/s);
  if (tilde) return '~' + tilde[1] + (tilde[2] ? shQuote(tilde[2]) : '');
  if (SAFE_POSIX.test(s) && !s.startsWith('~')) return s;
  return "'" + s.replace(/'/g, `'\\''`) + "'";
}

/** fish: inside single quotes only \\ and \' are escapes. */
export function fishQuote(value, { tilde: expand = true } = {}) {
  const s = String(value);
  if (s === '') return "''";
  const tilde = expand && s.match(/^~(\/|$)(.*)$/s);
  if (tilde) return '~' + tilde[1] + (tilde[2] ? fishQuote(tilde[2]) : '');
  if (/^[A-Za-z0-9_\/.,:@+-][A-Za-z0-9_\/.,:@+=-]*$/.test(s)) return s;
  return "'" + s.replace(/[\\']/g, '\\$&') + "'";
}

// PowerShell treats the typographic quotes as quote characters too (about_Quoting_Rules):
// single: ' ‘ ’ ‚ ‛   double: " “ ” „
const PS_SQ = /['\u2018\u2019\u201A\u201B]/g;
const PS_DQ_SPECIAL = /[`$"\u201C\u201D\u201E]/g;

/**
 * PowerShell: always a single-quoted literal (each single-quote character doubled), so the value is a
 * string both as a command argument and inside an expression (.Replace('a', 'b'), -match 'x').
 * ~ becomes $HOME in a double-quoted string.
 */
export function psQuote(value, { tilde: expand = true } = {}) {
  const s = String(value);
  const tilde = expand && s.match(/^~(?:[/\\](.*))?$/s);
  if (tilde) {
    if (!tilde[1]) return '$HOME';
    return '"$HOME/' + tilde[1].replace(PS_DQ_SPECIAL, '`$&') + '"';
  }
  return "'" + s.replace(PS_SQ, '$&$&') + "'";
}

export class UnquotableError extends Error {}
/** A cmd.exe value starting with `/`: refused only where it stands alone as an argument (see cmdTemplate). */
export class SwitchValueError extends UnquotableError {}

/**
 * cmd.exe (best effort): double quotes, ~ -> %USERPROFILE%. cmd expands %VAR% (and !VAR! with delayed
 * expansion) even inside double quotes and has no escape for `"` inside them, so values containing
 * % ! " or control characters are refused (the intent is reported as a gap for cmd).
 */
export function cmdQuote(value, { tilde: expand = true, attached = false } = {}) {
  let s = String(value);
  const home = expand && /^~(?=[/\\]|$)/.test(s);
  if (home) s = '%USERPROFILE%' + s.slice(1);
  const body = home ? s.slice('%USERPROFILE%'.length) : s;
  if (/[%!"\r\n\0]/.test(body)) throw new UnquotableError(`value ${JSON.stringify(String(value))} cannot be quoted safely for cmd.exe`);
  // cmd built-ins read /x as a switch even when quoted ("delete directory /q" -> rmdir /s /q); a value
  // glued to a switch (findstr /c:{pattern}) is not an argument of its own and is fine
  if (/^\//.test(s) && !attached) throw new SwitchValueError(`value ${JSON.stringify(String(value))} starts with / and would be read as a cmd.exe switch`);
  // Windows paths: / -> \ (an unquoted foo/q could be read as foo /q by built-ins); other values that
  // contain / are double-quoted
  if (expand || /^[A-Za-z]:|%USERPROFILE%/.test(s)) s = s.replace(/\//g, '\\');
  if (/^[A-Za-z0-9_\\.:@+=%-]+$/.test(s)) return s;
  return '"' + s + '"';
}

export const QUOTE = { bash: shQuote, zsh: shQuote, sh: shQuote, fish: fishQuote, powershell: psQuote, cmd: cmdQuote };

function posixTemplate(intent, env) {
  const v = VARIANTS[intent.id] || {};
  if (env.shell === 'zsh' && v.zsh) return { tpl: v.zsh, variant: 'zsh' };
  if (env.os === 'darwin') {
    if (env.coreutils === 'gnu' && v.gnuMac) return { tpl: v.gnuMac, variant: 'gnuMac' };
    if (v.bsd) return { tpl: v.bsd, variant: 'bsd' };
    if (intent.darwin) return { tpl: intent.darwin, variant: 'darwin' };
    return { tpl: intent.template, variant: 'posix' };
  }
  if (env.coreutils === 'busybox' && v.busybox) return { tpl: v.busybox, variant: 'busybox' };
  return { tpl: intent.template, variant: 'posix' };
}

const CMD_HOLD = /\uE000(\d+)\uE001/g;
const cmdTemplates = new WeakMap();
/**
 * Function templates for cmd.exe: a value starting with `/` is refused only where it is an argument of
 * its own. Glued to a switch (`findstr /c:${q(pattern)}`) it cannot be read as one, so it is kept.
 */
function cmdTemplate(fn) {
  if (!cmdTemplates.has(fn)) {
    cmdTemplates.set(fn, (vals, q, ctx) => {
      const held = [];
      const q2 = (v, o) => {
        try { return q(v, o); } catch (err) {
          if (!(err instanceof SwitchValueError)) throw err;
          held.push({ v, err });
          return `\uE000${held.length - 1}\uE001`;
        }
      };
      const out = fn(vals, q2, ctx);
      return out.replace(CMD_HOLD, (m, i, at) => {
        const h = held[+i];
        if (!/\/\w+:$/.test(out.slice(0, at))) throw h.err;
        return cmdQuote(h.v, { tilde: false, attached: true });
      });
    });
  }
  return cmdTemplates.get(fn);
}

/**
 * -> { tpl, kind: 'posix'|'fish'|'pwsh'|'cmd', variant, wrapPosix?: boolean, gap?: string }
 * wrapPosix: render the POSIX template and wrap it as `bash -c '...'` (PowerShell on unix).
 */
export function chooseTemplate(intent, env) {
  const v = VARIANTS[intent.id] || {};
  const shell = env.shell;
  if (shell === 'fish') {
    if (v.fish) return { tpl: v.fish, kind: 'fish', variant: 'fish' };
    return { ...posixTemplate(intent, env), kind: 'fish' };
  }
  if (shell === 'powershell') {
    const p = v.pwsh;
    const win = env.os === 'win32';
    const t = p == null ? null : typeof p === 'string' || typeof p === 'function' ? p : win ? p.win : p.unix;
    if (t) return { tpl: t, kind: 'pwsh', variant: 'pwsh' };
    if (!win) return { ...posixTemplate(intent, env), kind: 'pwsh', wrapPosix: true };
    return { tpl: null, kind: 'pwsh', gap: v.gaps?.pwsh || 'no PowerShell equivalent on Windows yet' };
  }
  if (shell === 'cmd') {
    if (v.cmd) return { tpl: typeof v.cmd === 'function' ? cmdTemplate(v.cmd) : v.cmd, kind: 'cmd', variant: 'cmd' };
    return { tpl: null, kind: 'cmd', gap: v.gaps?.cmd || 'no cmd.exe equivalent yet (try PowerShell)' };
  }
  return { ...posixTemplate(intent, env), kind: 'posix' };
}

/**
 * PowerShell 5.1 and pwsh < 7.3 ("Legacy" native argument passing) build a native program's command
 * line by wrapping arguments with spaces in "..." without escaping embedded `"` (and a trailing `\`
 * then escapes the closing quote); empty arguments are dropped. `\"` would be right for Legacy but
 * wrong for 7.3+ (Standard/Windows), so no escaping is correct for both: values like that are refused
 * for native programs (git, tar, curl.exe, ssh, ...) and the intent is reported as a gap. Cmdlets and
 * .NET expressions receive the single-quoted literal unchanged and are not affected.
 */
export const unsafeNativePwshArg = (v) => { const s = String(v); return s === '' || s.includes('"') || (/\s/.test(s) && /\\$/.test(s)); };
const PS_KEYWORDS = new Set(['if', 'elseif', 'else', 'foreach', 'for', 'while', 'do', 'switch', 'return', 'try', 'catch', 'finally']);
/** Slots of a PowerShell string template that are arguments of a native program (not a cmdlet/expression). */
export function pwshNativeSlots(tpl) {
  const out = new Set();
  if (typeof tpl !== 'string') return out;
  // Placeholders are masked first (same length, so indices still line up): the `{` of an earlier
  // slot must not be taken for a script-block brace, which made that placeholder look like the
  // command head and skipped every later slot (`tar -czvf {archive} {path}`, `scp {target}:{dst}`).
  const masked = tpl.replace(/\{(\w+)(!raw)?\}/g, (m) => '\u0001'.repeat(m.length)).replace(/[«»]/g, ' ');
  for (const m of tpl.matchAll(/\{(\w+)(!raw)?\}/g)) {
    if (m[2]) continue;
    const seg = masked.slice(0, m.index).split(/[;|{}(]/).pop();
    // the first word of the segment that is not (part of) a placeholder
    const head = seg.trim().split(/\s+/).find((w) => w && !/\u0001/.test(w)) || '';
    if (/^[A-Za-z][\w.-]*$/.test(head) && !/^[A-Za-z]+-[A-Za-z]+$/.test(head) && !PS_KEYWORDS.has(head.toLowerCase())) out.add(m[1]);
  }
  return out;
}

export const quoteForKind =(kind, wrapPosix) => (wrapPosix ? shQuote : { posix: shQuote, fish: fishQuote, pwsh: psQuote, cmd: cmdQuote }[kind]);

 exited 1 in 6965ms:

> tellsh@0.3.0 test
> node --test test/

TAP version 13
# Subtest: /workspace/tellsh/test/allowlist.test.js
ok 1 - /workspace/tellsh/test/allowlist.test.js
  ---
  duration_ms: 779.210531
  ...
# Subtest: /workspace/tellsh/test/cli.test.js
not ok 2 - /workspace/tellsh/test/cli.test.js
  ---
  duration_ms: 2722.106701
  location: '/workspace/tellsh/test/cli.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/compose.test.js
ok 3 - /workspace/tellsh/test/compose.test.js
  ---
  duration_ms: 482.23682
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 4 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 180.6364
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 5 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 240.054743
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 6 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 226.641193
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 7 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 170.815954
  ...
# Subtest: /workspace/tellsh/test/pipeline.test.js
not ok 8 - /workspace/tellsh/test/pipeline.test.js
  ---
  duration_ms: 400.851182
  location: '/workspace/tellsh/test/pipeline.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions.test.js
not ok 9 - /workspace/tellsh/test/regressions.test.js
  ---
  duration_ms: 1056.123856
  location: '/workspace/tellsh/test/regressions.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions10.test.js
not ok 10 - /workspace/tellsh/test/regressions10.test.js
  ---
  duration_ms: 601.407642
  location: '/workspace/tellsh/test/regressions10.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions11.test.js
not ok 11 - /workspace/tellsh/test/regressions11.test.js
  ---
  duration_ms: 881.035353
  location: '/workspace/tellsh/test/regressions11.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions12.test.js
not ok 12 - /workspace/tellsh/test/regressions12.test.js
  ---
  duration_ms: 529.02006
  location: '/workspace/tellsh/test/regressions12.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions13.test.js
ok 13 - /workspace/tellsh/test/regressions13.test.js
  ---
  duration_ms: 348.731451
  ...
# Subtest: /workspace/tellsh/test/regressions14.test.js
ok 14 - /workspace/tellsh/test/regressions14.test.js
  ---
  duration_ms: 401.966835
  ...
# Subtest: /workspace/tellsh/test/regressions15.test.js
ok 15 - /workspace/tellsh/test/regressions15.test.js
  ---
  duration_ms: 436.998364
  ...
# Subtest: /workspace/tellsh/test/regressions16.test.js
ok 16 - /workspace/tellsh/test/regressions16.test.js
  ---
  duration_ms: 447.390085
  ...
# Subtest: /workspace/tellsh/test/regressions17.test.js
ok 17 - /workspace/tellsh/test/regressions17.test.js
  ---
  duration_ms: 401.526987
  ...
# Subtest: /workspace/tellsh/test/regressions18.test.js
ok 18 - /workspace/tellsh/test/regressions18.test.js
  ---
  duration_ms: 494.127664
  ...
# Subtest: /workspace/tellsh/test/regressions19.test.js
ok 19 - /workspace/tellsh/test/regressions19.test.js
  ---
  duration_ms: 572.871589
  ...
# Subtest: /workspace/tellsh/test/regressions2.test.js
not ok 20 - /workspace/tellsh/test/regressions2.test.js
  ---
  duration_ms: 768.591001
  location: '/workspace/tellsh/test/regressions2.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions20.test.js
ok 21 - /workspace/tellsh/test/regressions20.test.js
  ---
  duration_ms: 546.808082
  ...
# Subtest: /workspace/tellsh/test/regressions21.test.js
ok 22 - /workspace/tellsh/test/regressions21.test.js
  ---
  duration_ms: 499.684217
  ...
# Subtest: /workspace/tellsh/test/regressions22.test.js
ok 23 - /workspace/tellsh/test/regressions22.test.js
  ---
  duration_ms: 570.393749
  ...
# Subtest: /workspace/tellsh/test/regressions23.test.js
ok 24 - /workspace/tellsh/test/regressions23.test.js
  ---
  duration_ms: 595.164668
  ...
# Subtest: /workspace/tellsh/test/regressions24.test.js
ok 25 - /workspace/tellsh/test/regressions24.test.js
  ---
  duration_ms: 735.291114
  ...
# Subtest: /workspace/tellsh/test/regressions25.test.js
ok 26 - /workspace/tellsh/test/regressions25.test.js
  ---
  duration_ms: 740.874663
  ...
# Subtest: /workspace/tellsh/test/regressions26.test.js
ok 27 - /workspace/tellsh/test/regressions26.test.js
  ---
  duration_ms: 330.242902
  ...
# Subtest: /workspace/tellsh/test/regressions27.test.js
ok 28 - /workspace/tellsh/test/regressions27.test.js
  ---
  duration_ms: 552.00899
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 29 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 433.632866
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 30 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 456.42367
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 31 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 416.183233
  ...
# Subtest: /workspace/tellsh/test/regressions4.test.js
not ok 32 - /workspace/tellsh/test/regressions4.test.js
  ---
  duration_ms: 1226.959615
  location: '/workspace/tellsh/test/regressions4.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions5.test.js
ok 33 - /workspace/tellsh/test/regressions5.test.js
  ---
  duration_ms: 772.179674
  ...
# Subtest: /workspace/tellsh/test/regressions6.test.js
ok 34 - /workspace/tellsh/test/regressions6.test.js
  ---
  duration_ms: 805.031179
  ...
# Subtest: /workspace/tellsh/test/regressions7.test.js
ok 35 - /workspace/tellsh/test/regressions7.test.js
  ---
  duration_ms: 501.011848
  ...
# Subtest: /workspace/tellsh/test/regressions8.test.js
not ok 36 - /workspace/tellsh/test/regressions8.test.js
  ---
  duration_ms: 658.391061
  location: '/workspace/tellsh/test/regressions8.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions9.test.js
not ok 37 - /workspace/tellsh/test/regressions9.test.js
  ---
  duration_ms: 912.5504
  location: '/workspace/tellsh/test/regressions9.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 38 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 3907.714738
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/slot-cases.js
ok 39 - /workspace/tellsh/test/slot-cases.js
  ---
  duration_ms: 119.816382
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 40 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 230.960473
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 41 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 251.93293
  location: '/workspace/tellsh/test/templates.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..41
# tests 41
# suites 0
# pass 29
# fail 12
# cancelled 0
# skipped 0
# todo 0
# duration_ms 6642.738144

exec
/bin/bash -lc "node --input-type=module <<'JS'
import { suggest } from './src/pipeline.js';
const qs = ['delete folder foo or bar','delete folder foo but not bar','delete folder foo and bar','delete folder /tmp/a or /tmp/b','delete folder /tmp/a but not /tmp/b','delete folder foo except bar','kill process 123 or 456','kill process 123 not 456','restart nginx or apache','stop docker container web or api','git checkout main or dev','uninstall nginx or apache','show pytest version','show webpack version','show the help for pytest','show the help for webpack','delete /tmp/a.txt from /tmp/b','extract backup.tar.gz to /tmp/restore','move file a.txt to b.txt','move file b.txt from /tmp/a to /tmp/c'];
for (const q of qs) {let r=suggest(q,{env:{shell:'bash',os:'linux',coreutils:'gnu'}}); console.log(JSON.stringify({q,cmd:r.command,intent:r.intent,ok:r.understood,risk:r.risk,missing:r.missing}));}
JS" in /workspace/tellsh
 succeeded in 99ms:
{"q":"delete folder foo or bar","cmd":"rm -r foo","intent":"delete_dir","ok":true,"risk":"high","missing":[]}
{"q":"delete folder foo but not bar","cmd":"rm -r foo","intent":"delete_dir","ok":true,"risk":"high","missing":[]}
{"q":"delete folder foo and bar","cmd":"rm -r foo","intent":"delete_dir","ok":true,"risk":"high","missing":[]}
{"q":"delete folder /tmp/a or /tmp/b","cmd":"rm -r <PATH>","intent":"delete_dir","ok":true,"risk":"high","missing":["path"]}
{"q":"delete folder /tmp/a but not /tmp/b","cmd":"rm -r <PATH>","intent":"delete_dir","ok":true,"risk":"high","missing":["path"]}
{"q":"delete folder foo except bar","cmd":"rm -r foo","intent":"delete_dir","ok":true,"risk":"high","missing":[]}
{"q":"kill process 123 or 456","cmd":"kill 123","intent":"kill_by_pid","ok":true,"risk":"high","missing":[]}
{"q":"kill process 123 not 456","cmd":"kill 123","intent":"kill_by_pid","ok":true,"risk":"high","missing":[]}
{"q":"restart nginx or apache","cmd":"sudo systemctl restart nginx","intent":"service_restart","ok":true,"risk":"high","missing":[]}
{"q":"stop docker container web or api","cmd":"docker stop docker","intent":"docker_stop","ok":true,"risk":"medium","missing":[]}
{"q":"git checkout main or dev","cmd":"git checkout main","intent":"git_switch_branch","ok":true,"risk":"medium","missing":[]}
{"q":"uninstall nginx or apache","ok":false}
{"q":"show pytest version","cmd":"pytest --version","intent":"tool_version","ok":true,"risk":"safe","missing":[]}
{"q":"show webpack version","cmd":"webpack --version","intent":"tool_version","ok":true,"risk":"safe","missing":[]}
{"q":"show the help for pytest","cmd":"pytest --help","intent":"cli_help","ok":true,"risk":"safe","missing":[]}
{"q":"show the help for webpack","cmd":"webpack --help","intent":"cli_help","ok":true,"risk":"safe","missing":[]}
{"q":"delete /tmp/a.txt from /tmp/b","cmd":"rm <FILE>","intent":"delete_file","ok":true,"risk":"high","missing":["file"]}
{"q":"extract backup.tar.gz to /tmp/restore","cmd":"tar -xzvf backup.tar.gz -C /tmp/restore","intent":"extract_targz","ok":true,"risk":"medium","missing":[]}
{"q":"move file a.txt to b.txt","cmd":"mv -i a.txt b.txt","intent":"move_rename","ok":true,"risk":"medium","missing":[]}
{"q":"move file b.txt from /tmp/a to /tmp/c","cmd":"mv -i b.txt /tmp/a","intent":"move_rename","ok":true,"risk":"medium","missing":[]}

exec
/bin/bash -lc "sed -n '140,180p' src/fill.js; sed -n '271,342p' src/fill.js; sed -n '375,478p' src/fill.js" in /workspace/tellsh
 succeeded in 0ms:
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
export function selectorResidue(intentId, text, values = {}) {
  if (!hasSelectorRule(intentId)) return [];
  const fam = SEL_FAMILY[intentId.split('_')[0]];
  const own = SEL_INTENT[intentId];
  let t = foldKeepLength(String(text)).toLowerCase();
  // values that were read, and the option / phrase forms they come in, are explained
  for (const k of ['pr', 'repo', 'wenv', 'var', 'num', 'url']) {
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
const PR_REPO = /\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(?:github\s+)?(?:repo|repository|repozytorium)\s+(\S+)|\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(\S+(?:\s+\S+)?)\s+(?:github\s+)?(?:repo|repository)\b|\b(?:w|z)\s+repozytorium\s+(\S+)/i;
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

exec
/bin/bash -lc 'git diff 0d87457..HEAD -- src/fill.js src/slots.js | head -n 170; node --test test/pipeline.test.js' in /workspace/tellsh
exec
/bin/bash -lc "sed -n '671,734p' src/fill.js; rg -n 'pytest|webpack|version|safe' README.md src/slots.js src/variants.js; rg --files /usr/local/lib /usr/lib 2>/dev/null | rg '/(_pytest/config|pytest|webpack-cli|webpack)/' | head -n 50" in /workspace/tellsh
 succeeded in 24ms:
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
src/variants.js:211:    // -Confirm keeps cp -i's "ask before overwriting" safety (Copy-Item overwrites silently).
src/variants.js:216:    // Move-Item refuses to overwrite an existing file without -Force, which matches mv -i's safety.
src/variants.js:355:  kernel_version: {
src/variants.js:626:  tool_version: { pwsh: '& {cmd} --version', cmd: '{cmd} --version' },
src/slots.js:60:  'vim nvim emacs zoom teams discord steam electron npm yarn webpack vite deno bun kubelet containerd jenkins tomcat ' +
src/slots.js:75:// package.json script names and command-line tools people ask about (npm run X, X --version, X --help)
src/slots.js:78:export const KNOWN_TOOLS = new Set(('node nodejs npm npx pnpm yarn bun deno python python3 pip pip3 uv poetry pytest git gh docker ' +
src/slots.js:82:  'prettier vite webpack brew apt rsync ssh zsh bash fish pwsh powershell').split(' '));
src/slots.js:262:      if (/^\d+([.,]\d+)*$/.test(raw)) continue; // version/number
src/slots.js:465:// "install requests==2.32.0 with pip": the package word with its version constraint / extras is the whole requirement
src/slots.js:485:  cmd: set('which where gdzie location lokalizacja path sciezka sciezke command komenda komendy polecenie polecenia binary binarka executable program programu jest is version wersja wersje wersji help pomoc usage manual flags flagi options opcje'),
src/slots.js:575:    // "install typescript@^5.4 with npm": a versioned requirement right after the install verb is the package
README.md:6:ports, names, …); a vetted, safely quoted template is rendered for *your* shell and OS. Requests outside the
README.md:12:  largest_files · bash/linux · risk: safe · confidence: 99%
README.md:16:  largest_files · powershell/win32 · risk: safe · confidence: 99%
README.md:24:  docker_logs · bash/linux · risk: safe · confidence: 94%
README.md:50:  -y, --yes            run without prompting (only risk=safe commands straight from the catalog; never
README.md:58:      --top <k>, --threshold <p>, -v/--version, -h/--help
README.md:137:(`py -m pip` on Windows), activating a virtualenv (per shell), `<tool> --version` / `--help`, printing a line range
README.md:154:or `merge my last pr` give `gh pr merge <PR>`; a named repository is kept, `merge pr 45 in repo a/b` -> `gh pr merge 45 --repo a/b`). A package version constraint is kept
README.md:188:tellsh silently uses the cascade. `TELLSH_HYBRID=safe` never turns a rejection into an answer. Re-ranked answers are
README.md:205:names `/tmp/a b`); a slot it left as a placeholder is not a usable value. Raw commands are parsed (template inversion +
README.md:255:  tool, new intent, slots carried over), and missing required slots of safe commands filled from the previous
README.md:276:* **Trust rule (v0.3 close3).** A command is rated **safe only** when it is byte-identical to tellsh's own render of a
README.md:277:  catalog template whose intent is `risk=safe`, with slot values that are plain literals: no quote characters (tellsh's
README.md:280:  validator), and a program slot (`{cmd} --version`) is a plain program name, never a path or `source` / `.` / `eval` /
README.md:286:  (critical), but finding nothing wrong does not make a command safe. It reads bash `$'…'` quoting (so
README.md:288:* Every intent has a base risk: **safe** (read-only), **medium** (modifies state: archives, git checkout/pull/stash,
README.md:289:  chmod, mv, sudo, …), **high** (destructive: rm, kill, prune, discard). v0.2 raised 10 intents from safe to medium after
README.md:299:  the trust rule it no longer decides whether a typed or edited command is safe (none is); it raises catalog renders
README.md:332:* `--yes` only runs `safe` commands, i.e. fresh catalog renders with plain values (the trust rule): never
README.md:395:* **The selector rule trades recall for safety.** Its vocabulary is closed and hand-written (English and Polish): a
README.md:407:  (`same for /var`, `count lines in it`) and every composed command is high and needs `yes`; a safe request with an
README.md:422:* Composer: closed vocabulary, POSIX only, no pipelines, no `--format`/`-o` style arguments; it is a safety net, not a generator.

 exited 1 in 367ms:
diff --git a/src/fill.js b/src/fill.js
index f9849d0..a48ee62 100644
--- a/src/fill.js
+++ b/src/fill.js
@@ -1,8 +1,8 @@
 // Turn (intent, slots) into a concrete, safely-quoted command for the target shell.
 import { BY_ID } from './catalog.js';
-import { extractSlots, pickArg, pickDest, pickDir } from './slots.js';
-import { checkDanger, maxRisk } from './danger.js';
-import { shQuote, psQuote, chooseTemplate, quoteForKind, UnquotableError } from './render.js';
+import { extractSlots, pickArg, pickDest, pickDir, foldKeepLength, isStopWord } from './slots.js';
+import { checkDanger, maxRisk, plainSlotValue } from './danger.js';
+import { shQuote, psQuote, chooseTemplate, quoteForKind, UnquotableError, pwshNativeSlots, unsafeNativePwshArg } from './render.js';
 
 export { shQuote };
 
@@ -19,13 +19,468 @@ export const RAW_OK = {
   var: (v) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(String(v)),
   minutes: (v) => /^\d{1,7}$/.test(String(v)),
   sizeBytes: (v) => /^\d{1,16}$/.test(String(v)),
+  start: (v) => /^\d{1,9}$/.test(String(v)) && +v > 0,
+  end: (v) => /^\d{1,9}$/.test(String(v)) && +v > 0,
+  num: (v) => /^\d{1,12}$/.test(String(v)),
+  // a repository as gh -R takes it: [HOST/]OWNER/REPO
+  dryrun: (v) => v === '--dry-run',
+  delbranch: (v) => v === '--delete-branch',
+  npmverb: (v) => v === 'install' || v === 'ci',
+  // a wrangler environment name (wrangler.toml [env.NAME])
+  wenv: (v) => /^[A-Za-z0-9][\w-]{0,62}$/.test(String(v)),
+  // a part of a gh / wrangler request the command does not express: always the user's to fill (`<ARGS>`)
+  args: () => false,
+  repo: (v) => /^(?:(?!-)[\w-]+(?:\.[\w-]+)+\/)?(?!-)[\w-][\w.-]{0,99}\/(?!-)[\w-][\w.-]{0,99}$/.test(String(v)) && !/\.\./.test(String(v)),
+  // a pull request as gh selects it: number, URL or head branch
+  pr: (v) => (/^\d+$/.test(String(v)) ? /^[1-9]\d{0,11}$/.test(String(v)) : /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/pull\/\d{1,12}\/?$/.test(String(v)) || /^(?![-.])(?!.*\.\.)[\w./-]{1,100}$/.test(String(v))),
 };
 
+// "merge pull request feature/login", "view the pr for branch fix-1", "pr #45", 'merge pull request "feature/login"'
+// (a quoted value ends at its matching quote, `“”„` being one family: "bob's-fix" is one value; a quote with no matching
+// close, `'it''s'`, is m[7] and withheld)
+const PR_SELECTOR = /\b(?:pull[\s-]+requests?|pr|prs)\s+((?:(?:for|of|on|from|branch|number|no\.?|nr\.?|(?:the|a|my|our)(?=\s+branch\b))\s+)*)(?:(?:"([^"]*)"|'([^']*)'|`([^`]*)`|[„“”]([^„“”"]*)[“”])(?=[\s.,!?;:]|$)|(#?[^\s"'`„“”]+?)[.,!?]?(?=\s|$)|(["'`„“”]))/i;
+// a function or describing word after "pull request" is not a selector ("merge the pull request and …", "merge pr now",
+// "check pr status", "view pull request on github", "merge pr by bob", "merge pull request quickly", "view pr from yesterday",
+// "close pr for issue 45"); only checked for an unmarked word (`feature/apply`, `fix-reply`, `#12-only` are selectors);
+// another unmarked word, `nightly`, is withheld
+const PR_NOT_SELECTOR = /^(?:the|a|an|this|that|it|its|my|our|your|their|me|us|you|him|her|them|and|or|then|now|please|pls|into|to|with|without|in|at|by|is|was|which|again|request|requests|status|state|checks?|details?|info|summary|description|diff|changes|comments?|github|gh|web|browser|online|here|there|today|yesterday|tomorrow|earlier|later|review|fork|upstream|fast|asap|already|first|too|also|quickly|immediately|directly|safely|manually|automatically|finally|only|just|really|simply|properly|carefully|right|soon|instantly|issues?|tickets?|bugs?)$/i;
+// an unmarked word (no digit, '/', '-', '_', '.', '#') names a branch only after "branch", "for" or "from" ("merge pr from bob");
+// otherwise it is withheld (the `?` fails validation)
+const PR_MARKED = /[\d/_.#-]/;
+// an abbreviation ("merge pr e.g. main", "merge pr w/o checks") or a host ("merge pr on github.com") is not a branch
+const PR_ABBREV = /^(?:e\.g|i\.e|w\/o|w\/|etc|vs|cf|a\.k\.a|n\/a|b\/c)$/i;
+const PR_HOST = /^(?:[\w-]+\.)+(?:com|org|net|io|dev|app|co|me)$/i;
+// a number names the pull request only right after "pr" / "pull request" (`pr 45`, `pr #45`, `pr number 45`) or as `#45`
+const PR_NUMBER_LEAD = /^(?:(?:number|no\.?|nr\.?)\s+)*$/i;
+const PR_WORD = /\b(?:pull[\s-]+requests?|pr|prs)\b/i;
+// an issue, ticket or bug is not the pull request ("merge pr for issue #45", "merge the pull request for ticket 3")
+const PR_ISSUE = /^(?:issues?|tickets?|bugs?)$/i;
+// a number followed by a unit is an amount, not the pull request ("merge pr 2 days old", "merge pr 3 times")
+const PR_UNIT_AFTER = /^\s+(?:secs?|seconds?|mins?|minutes?|hours?|hrs?|days?|weeks?|months?|years?|times?|ago|old|more|approvals?|reviews?|reviewers?|commits?|files?|lines?|changes?|comments?|checks?)\b/i;
+// `#45` alone names the pull request only as the first word after the verb ("merge #45", "squash merge #45", "please
+// close #7"); one in another clause ("the pr that closes #12", "merge the pr, see #99") is withheld
+const PR_HASH_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit)\s+)+$/i;
+// "merge the pull request by alice", "merge the pr from yesterday", "the pr that fixes login", "the pr opened last week": a
+// pull request picked out by who or when, which is not the current branch's (withheld)
+const PR_QUALIFIED = /^\s*(?:in\s+question\b|(?:by|from|since|before|after|about|titled|named|called|that|which|who|whose|where|od|autorstwa)\b|(?:\S+\s+)?(?:opened|created|authored|submitted|raised|written|made|sent|pushed|filed)\b)|\b(?:yesterday|today|tonight|tomorrow|ago|last\s+(?:week|month|year|night|friday|monday|tuesday|wednesday|thursday|saturday|sunday)|wczoraj\w*|dzisiaj|dzi[sś])\b/i;
+// "merge the pr with label urgent", "the pull request with title fix login", "z etykietą pilne": picked out by a label,
+// title, author, ... (withheld)
+const PR_DESCRIBED = /^\s*(?:with|having|z|o)\s+(?:the\s+|a\s+)?(?:labels?|title|titled|name|tags?|authors?|assignees?|milestone|description|text|keywords?|words?|subject|commits?|etykiet\w*|tytu\w*|nazw\w*|autor\w*)\b|^\s*(?:labell?ed|tagged|assigned|mentioning|containing|regarding|concerning|touching|fixing|adding|removing|updating|changing)\b/i;
+// "merge the pr from last week", "from monday", "view that pr from before": after "for" / "from" a word saying when is
+// not a branch (withheld)
+const PR_WHEN = /^(?:last|this|next|past|previous|previously|before|earlier|ages|recently|lately|week|month|year|morning|afternoon|evening|night|weekend|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun|january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec|ago|wczoraj\w*|dzisiaj|przedwczoraj|zesz\w*|poprzedni\w*|wcze\w*)$/i;
+// "merge the dependabot pr", "the docs pr", "said pr", "the above pr", "zmerguj to pr": a word between a determiner and
+// "pr" (or an anaphoric one) picks out a pull request the parser cannot read (withheld, also with history); "the current
+// pr", "my own pr", "that one pr", "the same pr", "the last pr" (a reference) stay as they are
+const PR_DET_WORD = /(?:^|\s)(?:the|a|an|my|our|your|his|her|their|this|that|these|those|its|ten|tego|ta|tamten|to)\s+((?:\S+\s+){1,3})$/i;
+const PR_DET_NEUTRAL = /^(?:current|branch|branch's|branch’s|own|one|same|previous|last|prior|single|github|gh|pull|this|that|the|my|our|bieżący\w*|biezacy\w*|obecn\w*|aktualn\w*|mój|moj\w*|nasz\w*|sw[oó]j|swoj\w*|ten|tego)$/i;
+const PR_ANAPHOR = /(?:^|\s)(?:said|above|aforementioned|abovementioned|above-mentioned|mentioned|referenced|aforesaid|forementioned|wspomnian\w*|powy[zż]sz\w*|ww\.?)\s+(?:\S+\s+)?$/i;
+// "merge dependabot pr", "merge draft pr", "merge alice's pr": without a determiner, a word between the request's verb and
+// "pr" picks out a pull request just the same (withheld); "merge pr", "squash and merge my pr", "zmerguj to pr" stay as they are
+const PR_VERB = /^(?:merge|squash|rebase|land|ship|accept|view|show|open|display|see|check|checkout|diff|review|approve|close|reopen|edit|ready|comment|list|get|fetch|print|describe|zmerguj\w*|scal\w*|poka[zż]\w*|zobacz\w*|otw[oó]rz\w*|zamknij\w*|sprawd[zź]\w*|wy[sś]wietl\w*|zatwierd[zź]\w*|zaakceptuj\w*|przejrzyj\w*)$/i;
+const PR_FILLER = /^(?:please|pls|now|then|just|and|also|out|up|go|ahead|to|it|tamten|that|this|ten|tego|gh|github|pull|i|you|can|could|would|will|let's|lets|me|us|want|need|prosz[eę]|teraz|i|oraz|a)$/i;
+// "merge open pr", "merge ready pr": after the verb, a state word picks a pull request out
+const PR_STATE = /^(?:open|ready|review|close)$/i;
+function prWordBefore(before) {
+  const words = before.replace(/[,;:]/g, ' ').trim().split(/\s+/).filter(Boolean);
+  const v = words.findIndex((x) => PR_VERB.test(x));
+  // "show checks for that pr", "view the diff of my pr": the words before the last preposition say what to show
+  const at = Math.max(v, words.findLastIndex((x) => /^(?:for|of|on|in|from|about|with|dla|z|w)$/i.test(x)));
+  return words.slice(at + 1).some((x) => !(PR_VERB.test(x) && !PR_STATE.test(x)) && !PR_FILLER.test(x) && !PR_DET_NEUTRAL.test(x));
+}
+// "merge pr for the login fix", "merge pr with dependabot", "merge pr of my colleague", "merge pr in docs", "merge pr: fix
+// login": a connective (or a colon) after "pr" and a word that is not neutral pick a pull request out (withheld); "merge pr
+// on github", "merge pr with squash", "merge pr in this repo", "merge pr for review" stay as they are
+const PR_AFTER_PICK = /^\s*(?::\s*|[-–—]\s+|\s(?:for|of|with|in|on|from|about|regarding|re|dla|z|w|od)\s+)(?:(?:the|a|an|my|our|your|his|her|their|its|this|that)\s+)*([^\s.,!?;:]*)/i;
+const PR_AFTER_NEUTRAL = /^(?:$|-\S*|github|gh|web|browser|online|cli|terminal|here|this|current|same|local|repo|repository|squash|squashing|rebase|rebasing|merge|merging|auto|automerge|auto-merge|admin|review|me|us|it|now|please|pls|main|master|default|teraz|prosz[eę]|githubie|przegl[aą]darce)$/i;
+const prPickedAfter = (after) => {
+  const m = after.match(PR_AFTER_PICK);
+  return m != null && !PR_AFTER_NEUTRAL.test(m[1]);
+};
+// a URL names the pull request when only a verb, a determiner or "pr" comes before it
+const PR_URL_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|and|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit|the|this|that|a|pull|requests?|pr|prs|at|is|me|you|can|could|would|i|want|to|url|link|[(]|zmerguj\w*|scal\w*|poka[zż]\w*|zobacz\w*|otw[oó]rz\w*|zamknij\w*|sprawd[zź]\w*)[\s:,]+)*[(<]?$/i;
+// "merge ten pr" (Polish "this"), "merge that one pr": a number word that is a demonstrative, not a number
+const PR_DEM_NUMBER = /\b(?:ten|(?:that|this|which|the)\s+one)\s+(?:\S+\s+)?(?:prs?|pull[\s-]+requests?)\b/gi;
+// "merge pr from the feature branch", "for my branch bob": a branch is named, but not one the parser read
+const PR_BRANCH_NAMED = /\b(?:for|of|on|from)\s+(?:\S+\s+){0,2}branch\b/i;
+// "and delete the branch", "delete the branch after", "usuń gałąź": the head branch goes with the merge (--delete-branch)
+const PR_DELETE_BRANCH = /\b(?:and\s+)?(?:delete|remove|usun)\s+(?:the\s+|its\s+|that\s+|tego\s+|ten\s+|t[ea]\s+)?(?:(?:local\s+and\s+remote|remote|head|feature)\s+)?(?:branch|branche?a?|galaz|galez)\b(?:\s+(?:after(?:wards)?|too|as\s+well|potem|tez))?/g;
+const PR_DELETE_NEGATED = /(?:\b(?:not|no|never|without|nor|nie|bez)|n't|\bdont)\s+(?:\S+\s+){0,1}$/;
+// wrangler deploy: "dry run", "--dry-run", "na sucho", "without (actually) deploying/publishing" (wrangler deploy --dry-run);
+// "not a dry run", "without dry run", "skip the dry run": a real deploy, no flag (a dry run asked for elsewhere in the
+// request, "without a dry run first? no, do a dry run", still counts)
+const WR_DRY = /\bdry[\s-]*run\b|\bna\s+sucho\b|\bwithout\s+(?:actually\s+)?(?:deploying|publishing|uploading)\b|\b(?:don'?t|do\s+not)\s+actually\s+(?:deploy|publish|upload)\b|\bbez\s+(?:faktycznego\s+)?(?:wdra[zż]ania|publikowania|deployu?)\b/i;
+const WR_DRY_NOT = /\b(?:not|no|without|skip|skipping|nie|bez)\s+(?:a\s+|the\s+|any\s+)?dry[\s-]*run\b|\b(?:don'?t|do\s+not)\s+(?:do\s+)?(?:a\s+|the\s+)?dry[\s-]*run\b/gi;
+const wranglerDry = (t) => WR_DRY.test(t.replace(WR_DRY_NOT, ' '));
+// the environment: "--env staging", "-e staging", "env=staging", "env staging", "to the staging environment", "to staging",
+// "for production", "na produkcję"; a name is taken only when it is a known one ("staging", "prod", ...) or a marked one
+// ("staging-eu", "preview2", "qa_1"), as a whole word, quoted or not ('to "preview2"'): "worker env", "with env vars", "env
+// file", "my environment is set" never make up `--env worker/with/is` (the environment is withheld, `<WENV>`); a plain
+// unknown word after "to" ("to cloudflare") is not an environment
+const WR_Q = `(?:"[^"]*"|'[^']*'|\`[^\`]*\`|[„“”][^„“”"]*[“”]|\\S+)`;
+const WR_ENV_OPT = new RegExp(`(?:^|\\s)(?:--env|-e|env)(?:=|(?<!\\benv)\\s+)(${WR_Q})`, 'i');
+const WR_ENV_AFTER = new RegExp(`\\b(?:env|environment|środowisk\\w*|srodowisk\\w*)\\s+(called\\s+|named\\s+|o\\s+nazwie\\s+)?(${WR_Q})`, 'gi');
+const WR_ENV_BEFORE = /(?:^|\s)(\S+)\s+(?:env|environment)\b/gi;
+const WR_ENV_PREP = new RegExp(`\\b(to|on|in|into|for|na|do|w|dla)\\s+(?:the\\s+|my\\s+|our\\s+)?(${WR_Q})(\\s+\\S+)?`, 'gi');
+const WR_ENV_KNOWN = /^(?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)$/i;
+// after "for" only a strong name is the environment ("for production", "for qa"); a weak one says what the deploy is for
+// ("for testing", "for dev", "for the qa team"): withheld, never made up
+const WR_ENV_STRONG = /^(?:production|prod|staging|stage|qa|uat|canary|preview|sandbox)$/i;
+// a word after the name that ends the phrase ("for prod now", "for qa, then …"), not a noun it describes ("for the qa team")
+const WR_ENV_END = /^\s+(?:and|then|now|please|pls|too|also|again|today|asap|with|using|via|without|from|but|so|env|environment)$/i;
+const WR_ENV_ANY = /\b(?:env|environment|środowisk\w*|srodowisk\w*|produkcj\w*|staging\w*|production|prod|stage|qa|uat|canary|sandbox)\b/i;
+// a marked name is an environment after a preposition only when a known one is part of it ("staging-eu", "preview2",
+// "qa_1"); another ("to v2", "to the worker-2 script") is withheld, never made up
+const WR_ENV_STEM = /^(?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)(?=[\d_-])|[\d_-](?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)$/i;
+// a quoted value is decoded (its quotes are not part of the name); a word loses the punctuation after it
+const wrEnvWord = (w) => {
+  const s = String(w);
+  return /^["'`„“”]/.test(s) && s.length > 1 && /["'`“”]$/.test(s) ? s.slice(1, -1) : s.replace(/[.,!?;:]+$/, '');
+};
+const wrQuoted = (w) => /^["'`„“”]/.test(String(w));
+// a marked name: letters with a digit, '-' or '_' ("staging-eu", "preview2"), not "2-3" or "src/worker.js"
+const wrEnvMarked = (w) => RAW_OK.wenv(w) && /[A-Za-z]/.test(w) && /[\d_-]/.test(w);
+/** The wrangler environment a deploy request names: a name, `?` (named, not readable) or null (the default). */
+function wranglerEnv(t) {
+  const o = t.match(WR_ENV_OPT);
+  if (o) { const w = wrEnvWord(o[1]); return RAW_OK.wenv(w) ? w : '?'; }
+  for (const m of t.matchAll(WR_ENV_AFTER)) {
+    const w = wrEnvWord(m[2]);
+    if (WR_ENV_KNOWN.test(w) || wrEnvMarked(w) || ((m[1] || wrQuoted(m[2])) && RAW_OK.wenv(w))) return w;
+    if (wrQuoted(m[2])) return '?';
+  }
+  for (const m of t.matchAll(WR_ENV_BEFORE)) {
+    if (WR_ENV_KNOWN.test(m[1]) || wrEnvMarked(m[1])) return m[1];
+  }
+  for (const m of t.matchAll(WR_ENV_PREP)) {
+    const prep = m[1].toLowerCase();
+    const w = wrEnvWord(m[2]);
+    const q = wrQuoted(m[2]);
+    if (prep === 'for' || prep === 'dla') {
+      if (WR_ENV_STRONG.test(w) && (!m[3] || WR_ENV_END.test(m[3]) || /^[.,!?;:]/.test(m[2].slice(w.length)))) return w;
+      if (WR_ENV_KNOWN.test(w) || wrEnvMarked(w) || q) return '?';
+      continue;
+    }
+    if (WR_ENV_KNOWN.test(w)) return w;
+    if (/^(?:to|into|na|do)$/.test(prep)) {
+      if (wrEnvMarked(w)) return WR_ENV_STEM.test(w) ? w : '?';
+      // 'to "my env"', 'to "cloudflare"': another quoted value is withheld, never dropped
+      if (q) return '?';
+    }
+  }
+  return WR_ENV_ANY.test(t) ? '?' : null;
TAP version 13
# Subtest: /workspace/tellsh/test/pipeline.test.js
not ok 1 - /workspace/tellsh/test/pipeline.test.js
  ---
  duration_ms: 334.420866
  location: '/workspace/tellsh/test/pipeline.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..1
# tests 1
# suites 0
# pass 0
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 342.766238

exec
/bin/bash -lc "node --input-type=module <<'JS'
import { suggest } from './src/pipeline.js';
for (const q of ['deploy worker --env prod --env production','deploy worker --env staging --env stage','deploy worker to prod and production','deploy worker --env Prod --env prod','merge pr 42 in repo acme/app in repo acme/app2','merge pr 42 in another repository','merge pr 42 from another repo','merge pr 42 --hostname github.corp.com','merge pr 42 --repo github.corp.com/acme/app','merge pr 42 from feature/foo','merge pr 42 in /tmp/other-repo','npm install axios lodash','npm install axios and lodash','npm install axios not lodash','npm install --prefix /tmp/foo axios','install requests and django with pip','run npm test in /tmp/project','run npm build --workspace app','deploy worker --env staging --config prod.toml','deploy worker --env staging without running it','show version of pytest']) {
 const r = suggest(q,{env:{shell:'bash',os:'linux',coreutils:'gnu'}});console.log(JSON.stringify({q,cmd:r.command,risk:r.risk,missing:r.missing,ok:r.understood}));
}
JS
node test/pipeline.test.js" in /workspace/tellsh
 exited 1 in 422ms:
{"q":"deploy worker --env prod --env production","cmd":"npx wrangler deploy --env <WENV>","risk":"medium","missing":["wenv"],"ok":true}
{"q":"deploy worker --env staging --env stage","cmd":"npx wrangler deploy --env <WENV>","risk":"medium","missing":["wenv"],"ok":true}
{"q":"deploy worker to prod and production","cmd":"npx wrangler deploy --env <WENV>","risk":"medium","missing":["wenv"],"ok":true}
{"q":"deploy worker --env Prod --env prod","cmd":"npx wrangler deploy --env Prod","risk":"medium","missing":[],"ok":true}
{"q":"merge pr 42 in repo acme/app in repo acme/app2","cmd":"gh pr merge 42 --repo <REPO>","risk":"medium","missing":["repo"],"ok":true}
{"q":"merge pr 42 in another repository","cmd":"gh pr merge 42 --repo <REPO>","risk":"medium","missing":["repo"],"ok":true}
{"q":"merge pr 42 from another repo","cmd":"gh pr merge 42 --repo <REPO>","risk":"medium","missing":["repo"],"ok":true}
{"q":"merge pr 42 --hostname github.corp.com","cmd":"gh pr merge 42","risk":"medium","missing":[],"ok":true}
{"q":"merge pr 42 --repo github.corp.com/acme/app","cmd":"gh pr merge 42 --repo github.corp.com/acme/app","risk":"medium","missing":[],"ok":true}
{"q":"merge pr 42 from feature/foo","cmd":"gh pr merge 42 --repo feature/foo","risk":"medium","missing":[],"ok":true}
{"q":"merge pr 42 in /tmp/other-repo","cmd":"gh pr merge 42","risk":"medium","missing":[],"ok":true}
{"q":"npm install axios lodash","cmd":"npm install axios","risk":"medium","missing":[],"ok":true}
{"q":"npm install axios and lodash","cmd":"npm install axios","risk":"medium","missing":[],"ok":true}
{"q":"npm install axios not lodash","cmd":"npm install axios","risk":"medium","missing":[],"ok":true}
{"q":"npm install --prefix /tmp/foo axios","cmd":"npm install <PKG>","risk":"medium","missing":["pkg"],"ok":true}
{"q":"install requests and django with pip","cmd":"python3 -m pip install requests","risk":"medium","missing":[],"ok":true}
{"q":"run npm test in /tmp/project","cmd":"npm run test","risk":"medium","missing":[],"ok":true}
{"q":"run npm build --workspace app","cmd":"npm run build","risk":"medium","missing":[],"ok":true}
{"q":"deploy worker --env staging --config prod.toml","cmd":"npx wrangler deploy --env <WENV>","risk":"medium","missing":["wenv"],"ok":true}
{"q":"deploy worker --env staging without running it","cmd":"npx wrangler deploy --env <WENV>","risk":"medium","missing":["wenv"],"ok":true}
{"q":"show version of pytest","cmd":"pytest --version","risk":"safe","missing":[],"ok":true}
TAP version 13
# Subtest: stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
ok 1 - stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
  ---
  duration_ms: 12.121755
  ...
# Subtest: PowerShell vocabulary maps to the same tool family
ok 2 - PowerShell vocabulary maps to the same tool family
  ---
  duration_ms: 1.130178
  ...
# Subtest: tagger: tool-conditioned BIO spans, only tags valid for the tool
ok 3 - tagger: tool-conditioned BIO spans, only tags valid for the tool
  ---
  duration_ms: 12.46359
  ...
# Subtest: slot merge: tagger primary, regex fills misses and replaces invalid values
ok 4 - slot merge: tagger primary, regex fills misses and replaces invalid values
  ---
  duration_ms: 7.977426
  ...
# Subtest: end-to-end bash + PowerShell + BSD
ok 5 - end-to-end bash + PowerShell + BSD
  ---
  duration_ms: 39.091154
  ...
# Subtest: history: pronouns, "same for", container/service/pid references (EN + PL)
ok 6 - history: pronouns, "same for", container/service/pid references (EN + PL)
  ---
  duration_ms: 57.203799
  ...
# Subtest: history is optional: without it a pronoun request gets a hint, never a guessed value
ok 7 - history is optional: without it a pronoun request gets a hint, never a guessed value
  ---
  duration_ms: 2.400147
  ...
# Subtest: history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
ok 8 - history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
  ---
  duration_ms: 0.831849
  ...
# Subtest: loadHistory reads only the tail of HISTFILE and returns the last n commands
not ok 9 - loadHistory reads only the tail of HISTFILE and returns the last n commands
  ---
  duration_ms: 1.375829
  location: '/workspace/tellsh/test/pipeline.test.js:92:1'
  failureType: 'testCodeFailure'
  error: "EROFS: read-only file system, mkdtemp '/tmp/tellsh-hist-XXXXXX'"
  code: 'EROFS'
  stack: |-
    mkdtempSync (node:fs:3005:18)
    TestContext.<anonymous> (file:///workspace/tellsh/test/pipeline.test.js:93:15)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: context exposes ctx_ classifier features and entity references
ok 10 - context exposes ctx_ classifier features and entity references
  ---
  duration_ms: 0.909674
  ...
# Subtest: second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
ok 11 - second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
  ---
  duration_ms: 11.059069
  ...
# Subtest: out-of-domain requests are rejected (also by the composer)
ok 12 - out-of-domain requests are rejected (also by the composer)
  ---
  duration_ms: 1.311221
  ...
# Subtest: env detection and overrides
ok 13 - env detection and overrides
  ---
  duration_ms: 0.85974
  ...
1..13
# tests 13
# suites 0
# pass 12
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 167.510667

codex
I reproduced two target-scope failures: `merge pr 42 in /tmp/other-repo` becomes `gh pr merge 42`, and `run npm test in /tmp/project` becomes `npm run test`, both without placeholders. I’m checking the new help/version commands for execution risks as well. Some tests require temporary files and fail under the read-only sandbox.
web search: 
web search: site.docs.pytest.org pytest --help conftest plugin loading ...
web search: 
web search: https://docs.pytest.org/en/stable/_modules/_pytest/config.html
exec
/bin/bash -lc "nl -ba src/catalog.js | sed -n '251,268p'; nl -ba src/fill.js | sed -n '317,340p'; nl -ba src/slots.js | sed -n '485,585p'; cat src/rerank/hybrid.js" in /workspace/tellsh
 succeeded in 0ms:
   251	  T('docker_exec', 'Open a shell inside a container', 'docker exec -it {container} sh',
   252	    { container: null }, 'medium'),
   253	  T('docker_stats', 'Container resource usage', 'docker stats --no-stream', {}),
   254	  T('docker_compose_up', 'Start docker compose services', 'docker compose up -d', {}, 'medium'),
   255	  T('docker_compose_down', 'Stop docker compose services', 'docker compose down', {}, 'medium'),
   256	
   257	  // ---------- developer tools (v0.4, from real command usage) ----------
   258	  // project scripts and installs run arbitrary package code: medium
   259	  T('npm_run_script', 'Run a package.json script with npm (npm run dev/build/test)', 'npm run {script}', { script: null }, 'medium'),
   260	  T('npm_install', 'Install the project dependencies (or one package) with npm', 'npm {npmverb!raw}«{pkg}»', { npmverb: 'install' }, 'medium'),
   261	  T('npm_install_global', 'Install an npm package globally', 'npm install -g {pkg}', { pkg: null }, 'medium',
   262	    { notes: 'may need sudo when the global prefix is not user-writable' }),
   263	  T('pip_install', 'Install a Python package with pip', 'python3 -m pip install {pkg}', { pkg: null }, 'medium'),
   264	  T('activate_venv', 'Activate a Python virtual environment', '. {path}/bin/activate', { path: '.venv' }, 'medium',
   265	    { notes: 'run it in your own shell: activating from tellsh only affects a subshell that exits right away' }),
   266	  T('tool_version', 'Show the installed version of a command-line tool', '{cmd} --version', { cmd: null }),
   267	  T('cli_help', 'Show the built-in help (--help) of a command', '{cmd} --help', { cmd: null }),
   268	
   317	export function selectorWithhold(intentId, text, values = {}) {
   318	  // a selector already withheld ("merge pr bob's", "my environment is set") already has its placeholder
   319	  if (['pr', 'num', 'wenv', 'repo'].some((k) => String(values[k] ?? '').startsWith('?'))) return null;
   320	  const res = selectorResidue(intentId, text, values);
   321	  if (!res.length) return null;
   322	  // "merge pr 42 in acme/app or other/repo": another repository beside the one read is a competing target, whatever else
   323	  // the request names (an explicit pull request included)
   324	  if (values.repo != null && res.some((r) => RAW_OK.repo(repoValue(r.w)))) return 'repo';
   325	  const main = SEL_SLOT[intentId];
   326	  if (main && main !== 'wenv') {
   327	    const v = values[main];
   328	    if (v != null && SEL_EXPLICIT[main](String(v)) && !res.some((r) => /^\d+$|^https?:/.test(r.w))) return null;
   329	    return main;
   330	  }
   331	  if (/^wrangler_/.test(intentId)) {
   332	    // "deploy worker but not to production", "don't deploy to prod": an environment the request excludes is never the
   333	    // target (also when one was read)
   334	    const negated = res.some((r) => SEL_NEGATION.test(r.w));
   335	    if (negated && (values.wenv != null || res.some(selEnvish) || WR_ENV_ANY.test(text))) return 'wenv';
   336	    // an explicit environment stays; the words nothing explains (`--config other.toml`) are withheld beside it, never dropped
   337	    return res.some(selEnvish) ? 'wenv' : 'args';
   338	  }
   339	  return 'args';
   340	}
   485	  cmd: set('which where gdzie location lokalizacja path sciezka sciezke command komenda komendy polecenie polecenia binary binarka executable program programu jest is version wersja wersje wersji help pomoc usage manual flags flagi options opcje'),
   486	  script: set('run uruchom odpal odpalic puść pusc wykonaj execute script skrypt skryptu skrypty npm'),
   487	  var: set('variable zmienna zmiennej zmiennych env value wartosc printenv echo secret sekret sekretu put'),
   488	  branch: set('branch branchu brancha branchem branche galaz galezi galezia checkout switch przelacz przelaczyc przejdz -b called named nazwie na to do delete usun skasuj'),
   489	  user: set('user uzytkownik uzytkownika uzytkownikowi owner wlasciciel wlasciciela to dla na chown byc'),
   490	  pattern: set('for containing contains contain word text phrase string pattern grep szukaj wyszukaj poszukaj slowo slowa tekst tekstu fraze fraza frazy zawierajace zawierajacy zawierajacych zawieraja zawiera zawierajace ciag wystapienia occurrences mentions mention wzmianki find znajdz search'),
   491	  host: set('ping pinguj pingnij host hosta hosts server serwer serwera serwerem to do domain domena domeny domenie for dla lookup resolve traceroute trace route trasa trase reach dns nslookup dig'),
   492	  target: set('ssh connect polacz polaczyc zaloguj login log to do na into server serwer serwera'),
   493	};
   494	
   495	// option words of a search request, never its pattern ("grep for ~/foo recursively in src")
   496	const OPTION_WORDS = ['recursively', 'recursive', 'rekurencyjnie', 'everywhere', 'wszedzie', 'case', 'insensitive', 'case-insensitive',
   497	  'case-insensitively', 'case-sensitive', 'insensitively', 'ignoring', 'ignore', 'sensitive', 'only', 'tylko', 'files', 'pliki', 'plikach',
   498	  'lines', 'linie', 'liniach'];
   499	const PATTERN_SKIP = new Set([...STOP, ...OPTION_WORDS]);
   500	/** A word that describes how to search ("case-insensitive", "recursively"), not what to search for. */
   501	export const isOptionWord = (w) => OPTION_WORDS.includes(foldKeepLength(String(w)).toLowerCase());
   502	const BRANCH_STOP = new Set([...STOP, 'on', 'off', 'and', 'then', 'git', 'switch', 'checkout', 'create', 'utworz', 'stworz', 'zrob', 'make', 'go', 'idz',
   503	  'origin', 'upstream', 'remote', 'istniejaca', 'istniejacy', 'existing', 'nowa', 'nowy', 'the']);
   504	const BRANCH_STRONG = set('branch branchu brancha branchem galaz galezi galezia -b checkout switch named called nazwie');
   505	
   506	const TAG_OF = { name: 'NAME', service: 'NAME', container: 'NAME', pkg: 'NAME', cmd: 'NAME', script: 'NAME', branch: 'BRANCH',
   507	  user: 'USER', pattern: 'PATTERN', message: 'MSG', var: 'VAR', text: 'TEXT' };
   508	
   509	// tagger-only mode (ex built by src/tagger.js exFromSpans): values come from tagged spans, no regex fallback
   510	function taggedArg(slot, ex) {
   511	  if (slot === 'host') return ex.hosts[0] ?? null;
   512	  if (slot === 'target') {
   513	    if (ex.target) return ex.target;
   514	    const host = ex.hosts[0];
   515	    const user = ex.tagged.USER?.[0];
   516	    return host ? (user ? `${user}@${host}` : host) : null;
   517	  }
   518	  const t = TAG_OF[slot];
   519	  const v = (t && (slot === 'pattern' ? ex.tagged[t]?.find((x) => !isOptionWord(x)) : ex.tagged[t]?.[0])) ?? null;
   520	  return slot === 'service' && v ? v.replace(/\.service$/, '') : v;
   521	}
   522	
   523	export function pickArg(slot, ex) {
   524	  if (ex.taggerOnly) return taggedArg(slot, ex);
   525	  const { quoted, words, text } = ex;
   526	  const vocab = slot === 'service' ? KNOWN_SERVICES : slot === 'pkg' ? KNOWN_PKGS : (slot === 'name' || slot === 'container') ? KNOWN_PROCS
   527	    : slot === 'script' ? KNOWN_SCRIPTS : slot === 'cmd' ? KNOWN_TOOLS : null;
   528	  if (['pattern', 'message', 'text', 'name', 'service', 'container', 'pkg', 'cmd', 'branch', 'user', 'script'].includes(slot) && quoted.length) {
   529	    return quoted[0];
   530	  }
   531	  if (slot === 'var') {
   532	    if (ex.var) return ex.var;
   533	    const r = nextAfter(words, TRIG.var, { accept: /^[a-z_][a-z0-9_]*$/ });
   534	    return r ? r.word.toUpperCase() : null;
   535	  }
   536	  if (slot === 'service') {
   537	    const svc = text.match(/([\w@.-]+)\.service\b/);
   538	    if (svc) return svc[1];
   539	  }
   540	  if (slot === 'host') {
   541	    if (ex.hosts.length) return ex.hosts[0];
   542	    const r = nextAfter(words, TRIG.host, { accept: /^[a-z0-9][\w.-]*$/ });
   543	    return r ? original(text, r.word) : (ex.paths.find((p) => /^[\w-]+\.[\w.-]+$/.test(p)) || null);
   544	  }
   545	  if (slot === 'target') {
   546	    if (ex.target) return ex.target;
   547	    const host = ex.hosts[0] || nextAfter(words, TRIG.target, { accept: /^[a-z0-9][\w.-]*$/ })?.word;
   548	    if (!host) return null;
   549	    const as = ex.rest.match(/\b(?:as|jako|user|uzytkownik\w*)\s+([a-z_][\w-]*)\b/);
   550	    return as && !STOP.has(as[1]) ? `${as[1]}@${host}` : host;
   551	  }
   552	  if (slot === 'message') {
   553	    const m = text.match(/(?:message|wiadomo\S*|opisem|komentarzem|-m|saying|:)\s+(.+)$/i);
   554	    return m ? m[1].trim().replace(/^(["'„“])(.*)["'”]$/s, '$2') : null;
   555	  }
   556	  if (slot === 'text') {
   557	    const b64 = text.match(/(?:^|\s)([A-Za-z0-9+/]{8,}={0,2})(?=\s|$)/);
   558	    if (b64 && /[A-Z]/.test(b64[1]) && /[a-z]/.test(b64[1]) || b64 && /=$/.test(b64[1])) return b64[1];
   559	    const m = text.match(/(?:encode|zakoduj|zakodowac|zakodować|decode|odkoduj|zdekoduj|dekoduj)\s+(?:the\s+)?(?:string|text|tekst|napis|slowo|słowo)?\s*(.+?)(?:\s+(?:in|to|na|w|do|z|from|using)\s+base64.*)?$/i);
   560	    if (m && !/^(base64|to|this|it|in)\b/i.test(m[1])) return m[1].trim();
   561	    return null;
   562	  }
   563	  if (slot === 'pkg') {
   564	    // "pip install requests", "npm i -g typescript": the installer is not the package, unless nothing else is named
   565	    // ("install npm"); a tool word right before the install verb is always the installer ("npm install")
   566	    const cmdLike = text.match(/\b(?:npm|pnpm|yarn|bun|pip3?|pipx|uv pip)\s+(?:i|install|add)\s+(?:(?:-[gDU]|--global|--save-dev|--upgrade|--user)\s+)*(@?[\w][\w.@\/=<>~+-]*)(?=\s|$)/i);
   567	    if (cmdLike && !/^-/.test(cmdLike[1])) return cmdLike[1];
   568	    // `npm install @types/node%x`: an operand that is not a package name is returned as it is, so validation rejects it
   569	    // and the command shows a placeholder (never a plain `npm install`)
   570	    const odd = text.match(/\b(?:npm|pnpm|yarn|bun|pip3?|pipx|uv pip)\s+(?:i|install|add)\s+(?:(?:-[gDU]|--global|--save-dev|--upgrade|--user)\s+)*([^\s-]\S*)/i);
   571	    if (odd) return odd[1];
   572	    // an npm scoped package (`@types/node`) is the package wherever it stands ("install @types/node with npm")
   573	    const scoped = text.match(/(?:^|\s)(@[\w.-]+\/[\w.-]+(?:@[\w.^~<>=*-]+)?)(?=\s|$)/);
   574	    if (scoped) return scoped[1];
   575	    // "install typescript@^5.4 with npm": a versioned requirement right after the install verb is the package
   576	    const req = text.match(/(?:^|\s)(?:install|add|zainstaluj|instaluj|doinstaluj)\s+(?:(?:the\s+)?(?:package|pakiet)\s+)?([A-Za-z][\w.-]*(?:\[[^\]\s]*\])?[=<>~!@^]\S*)/i);
   577	    if (req) return withConstraint(text, req[1].replace(/[=<>~!@^[].*$/s, ''));
   578	    for (const w of words) if (vocab.has(w) && !PKG_SKIP.has(w)) return withConstraint(text, original(text, w));
   579	    const r = nextAfter(words, TRIG.pkg, { skip: new Set([...STOP, ...PKG_SKIP]), accept: /^@?[\w.+-]+(?:\/[\w.+-]+)?(?:[=@<>~]=?[\w.*-]+)?$/ });
   580	    if (r) return withConstraint(text, original(text, r.word));
   581	    const i = words.findIndex((w, k) => vocab.has(w) && !/^(install|i|add|uninstall|zainstaluj|instaluj)$/.test(words[k + 1] || ''));
   582	    return i >= 0 ? withConstraint(text, original(text, words[i])) : null;
   583	  }
   584	  if (vocab) {
   585	    for (const w of words) if (vocab.has(w)) return original(text, w);
// Hybrid policy: the linear cascade (A) answers when it is confident; otherwise a neural model re-ranks A's top-k.
//
//   A conf >= tau                      -> A (fast path, ~0.3 ms)
//   A stage 1 says __none__ (keepNone)  -> keep A's rejection
//   else  B (encoder) / C (tiny LM)    -> score_i = alpha*log pA_i + (1-alpha)*log pX_i over A's top-k candidates
//                                         answer if pX(best) >= accept and pX(__none__) < none (B only), else reject
//
// suggestHybrid() wraps pipeline.suggest(): it runs the cheap pipeline first and only computes the neural model when
// the cascade asks for help, then re-runs the pipeline with the re-ranked decision (history rules are never re-ranked).
import { suggest } from '../pipeline.js';
import { detectEnv } from '../env.js';
import { FAMILY_OF, NONE } from '../tools.js';

// calibrated on the training dev split (scripts/hybrid/eval_hybrid.js --calibrate); see HYBRID.md
export const POLICY = {
  // v0.4 (enc-v2 retrained without held-out augmented rows, recalibrated with an A_dev that excludes the dev split
  // from every training source, OOD included); with the OOD-leaking A_dev A+B had tau 0.8, alpha 0.75; the first v0.4
  // encoder had tau 0.9, alpha 0.5, none 0.3 (both); v0.3 had none: 0.5 and k: 5 for the safe variant
  'A+B': { tau: 0.9, k: 5, alpha: 0.5, accept: 0, none: 0.5, keepNone: true, tagger: 'A' },
  'A+B-safe': { tau: 0.9, k: 3, alpha: 0.5, accept: 0, none: 0.5, rescue: false, tagger: 'A' },
  // A+C: C-ft rescored for the leak-free A_dev's candidates (before: tau 0.9)
  'A+C': { tau: 0.8, k: 5, alpha: 0.75, accept: 0, keepNone: true },
  'A+C-safe': { tau: 0.8, k: 5, alpha: 0.75, accept: 0, rescue: false },
  B: { tau: Infinity, k: 0, alpha: 0, accept: 0, none: 0.3, keepNone: true, tagger: 'B' },
  C: { tau: Infinity, k: 3, alpha: 0, accept: 0, keepNone: true },
};

const LOG = (p) => Math.log(Math.max(p, 1e-6));

/**
 * Re-rank a cascade result with model probabilities. pX: {intent: p} over (a superset of) the candidates;
 * k = 0 means "all intents pX knows" (B alone). Returns a cascade-shaped object; `confidence` is pushed above/below
 * the pipeline's accept threshold according to the policy's own accept rule.
 */
export function rerank(c, pX, P, { thr, pNone = 0 } = {}) {
  if (c.confidence >= P.tau) return c;
  // keepNone: the cascade's stage 1 says "not a shell request" -> keep its rejection (OOD safety)
  if (P.keepNone && c.topTool === NONE && c.confidence < thr) return c;
  // safe (rescue: false): only re-rank requests A answers anyway; A's rejections stay rejections
  if (P.rescue === false && c.confidence < thr) return c;
  const pa = Object.fromEntries(c.top.map((t) => [t.intent, t.p]));
  const cands = P.k > 0 ? c.top.slice(0, P.k).map((t) => t.intent) : Object.keys(pX);
  let best = null;
  let bestS = -Infinity;
  for (const i of cands) {
    const s = P.alpha * LOG(pa[i] ?? 0) + (1 - P.alpha) * LOG(pX[i] ?? 0);
    if (s > bestS) { bestS = s; best = i; }
  }
  if (!best) return c;
  const px = pX[best] ?? 0;
  const ok = px >= P.accept && pNone < (P.none ?? 1);
  const conf = ok ? Math.max(thr, px) : Math.min(thr - 1e-6, px);
  const tool = FAMILY_OF[best];
  const top = [{ intent: best, tool, p: conf, pTool: pa[best] ?? 0, pIntent: px }, ...c.top.filter((t) => t.intent !== best)];
  // an explicit model rejection (pNone >= none, or pX below accept) stays a rejection through the whole pipeline:
  // topTool __none__ keeps the low-confidence composer from answering in its place
  if (!ok) return { ...c, intent: best, tool, confidence: conf, top, reranked: true, topTool: NONE, rejected: true };
  return { ...c, intent: best, tool, confidence: conf, top, reranked: true, topTool: tool };
}

/**
 * opts: suggest() options + { system: 'A'|'B'|'C'|'A+B'|'A+C', encoder (src/rerank/encoder.js Encoder),
 *        lm: async (text, env, candidateIntents) -> {intent: p}, policy }
 * -> suggest() result + { hybrid: { system, deferred, model, ms } }
 */
export async function suggestHybrid(query, opts = {}) {
  const system = opts.system || 'A+B';
  const env = opts.env || detectEnv({ shell: opts.shell, os: opts.os });
  const base = { ...opts, env };
  if (system === 'A') return { ...suggest(query, base), hybrid: { system, deferred: false } };
  const P = { ...POLICY[system], ...(opts.policy || {}) };
  // the policy's k candidates are re-ranked whatever --top displays (k = 0: B alone, no cascade candidates needed)
  base.rerankTop = P.k;
  let seen = null;
  const first = suggest(query, { ...base, rerank: (c) => { seen = c; return c; } });
  if (!seen || seen.confidence >= P.tau) return { ...first, hybrid: { system, deferred: false } };
  const t0 = performance.now();
  let pX; let pNone = 0; let tagger;
  if (/B/.test(system)) {
    if (!opts.encoder) return { ...first, hybrid: { system, deferred: false, unavailable: 'encoder' } };
    const b = await opts.encoder.infer(query, env);
    pX = b.intents;
    pNone = b.pNone;
    if (P.tagger === 'B') tagger = b.tagger;
  } else {
    if (!opts.lm) return { ...first, hybrid: { system, deferred: false, unavailable: 'lm' } };
    pX = await opts.lm(query, env, seen.top.slice(0, P.k).map((t) => t.intent));
    if (!pX) return { ...first, hybrid: { system, deferred: true, unavailable: 'lm' } };
  }
  const ms = performance.now() - t0;
  const res = suggest(query, { ...base, tagger, rerank: (c, { thr }) => rerank(c, pX, P, { thr, pNone }) });
  return { ...res, hybrid: { system, deferred: true, ms, pNone } };
}

/** CLI entry: A+B with the encoder loaded lazily (only when the cascade defers); falls back to A when the optional
 *  runtime or model bundle is missing (result.hybrid.unavailable says why). */
let ENC = null;
export async function suggestLazy(query, opts = {}) {
  const encoder = { infer: async (t, env) => {
    if (ENC === null) { const { Encoder } = await import('./encoder.js'); ENC = (await Encoder.load({ threads: 1 })) || false; }
    if (!ENC) throw Object.assign(new Error('unavailable'), { unavailable: true });
    return ENC.infer(t, env);
  } };
  try {
    return await suggestHybrid(query, { ...opts, system: opts.system || 'A+B', encoder });
  } catch (e) {
    if (!e.unavailable) throw e;
    return { ...suggest(query, opts), hybrid: { system: 'A', deferred: false, unavailable: 'encoder (install onnxruntime-node + tellsh-model-enc)' } };
  }
}

export { NONE };

exec
/bin/bash -lc "command -v python3; command -v pytest; python3 -B -c 'import importlib.util; print(importlib.util.find_spec(\"pytest\"))'; nl -ba src/fill.js | sed -n '685,717p'; node bin/tellsh.js --json 'merge pr 42 in /tmp/other-repo'; node bin/tellsh.js --json 'run npm test in /tmp/project'; node bin/tellsh.js --json 'show the help for pytest'" in /workspace/tellsh
 succeeded in 428ms:
/usr/bin/python3
/home/box/.local/bin/pytest
ModuleSpec(name='pytest', loader=<_frozen_importlib_external.SourceFileLoader object at 0x7f01553a57c0>, origin='/home/box/.local/lib/python3.13/site-packages/pytest/__init__.py', submodule_search_locations=['/home/box/.local/lib/python3.13/site-packages/pytest'])
   685	export function contestedSlots(intentId, text, values = {}) {
   686	  // a slot already withheld (`?`) still takes the alternative / negation next to its candidates
   687	  const slots = CONTESTED(intentId).filter((k) => values[k] != null);
   688	  if (!slots.some((k) => !String(values[k]).startsWith('?'))) return [];
   689	  const raw = foldKeepLength(String(text)).toLowerCase().split(/\s+/).filter(Boolean);
   690	  const words = raw.map(tokenClean);
   691	  const ends = raw.map((w, i) => /[.,;!?:]$/.test(w) || SEL_CLAUSE_END.test(words[i]));
   692	  // the candidate values of a slot, by token index
   693	  const candidates = (k) => {
   694	    const out = new Map();
   695	    const v = foldKeepLength(String(values[k])).toLowerCase();
   696	    words.forEach((w, i) => {
   697	      const bare = w.replace(/^#(?=\d)/, '');
   698	      if (bare === v || (k === 'repo' && RAW_OK.repo(repoValue(w)) && repoKey(repoValue(w)) === repoKey(v))) out.set(i, k === 'repo' ? repoKey(v) : v);
   699	      if ((k === 'pr' || k === 'num') && /^\d{1,12}$/.test(bare) && !SEL_NUM_OTHER_BEFORE.test(words[i - 1] ?? '') && !SEL_NUM_UNIT_AFTER.test(words[i + 1] ?? '')) out.set(i, bare);
   700	      if (k === 'pr') { const u = w.match(/\/pull\/(\d{1,12})\/?$/); if (u) out.set(i, /^\d+$/.test(v) ? u[1] : w); }
   701	      if (k === 'repo' && /\//.test(w) && RAW_OK.repo(repoValue(w)) && (/^(?:--repo|-r|repo|repository|repozytorium|in|of|on|from|at|to|w|z)$/.test(words[i - 1] ?? '') || /^--repo=/.test(w))) out.set(i, repoKey(repoValue(w.replace(/^--repo=/, ''))));
   702	      if (k === 'wenv') {
   703	        const opt = w.match(/^(?:--env|env)=(.+)$/);
   704	        if (opt) out.set(i, SEL_ENV_ALIAS(opt[1]));
   705	        else if (/^(?:--env|-e)$/.test(words[i - 1] ?? '') && RAW_OK.wenv(w)) out.set(i, SEL_ENV_ALIAS(w));
   706	        else if (WR_ENV_STRONG.test(w) || /^produkc/.test(w)) out.set(i, SEL_ENV_ALIAS(w));
   707	        if (out.get(i) === SEL_ENV_ALIAS(v) || w === v) out.set(i, SEL_ENV_ALIAS(v));
   708	      }
   709	    });
   710	    return out;
   711	  };
   712	  const cand = Object.fromEntries(slots.map((k) => [k, candidates(k)]));
   713	  const out = new Set(slots.filter((k) => new Set(cand[k].values()).size > 1));
   714	  // the slots of the nearest candidate within n words of i, in the same clause
   715	  const nearest = (i, step, n) => {
   716	    for (let j = i + step, m = 0; j >= 0 && j < words.length && m < n; j += step, m++) {
   717	      const hit = slots.filter((k) => cand[k].has(j));
{
  "query": "merge pr 42 in /tmp/other-repo",
  "shell": "bash",
  "os": "linux",
  "coreutils": "gnu",
  "threshold": 0.375,
  "context": {
    "used": false
  },
  "confidence": 0.9811,
  "tool": "gh",
  "tools": [
    {
      "tool": "gh",
      "p": 1
    },
    {
      "tool": "find",
      "p": 0
    },
    {
      "tool": "git",
      "p": 0
    }
  ],
  "candidates": [
    {
      "intent": "gh_pr_merge",
      "tool": "gh",
      "p": 0.9811,
      "description": "Merge a pull request"
    },
    {
      "intent": "gh_pr_view",
      "tool": "gh",
      "p": 0.0138,
      "description": "Show a pull request"
    },
    {
      "intent": "gh_pr_list",
      "tool": "gh",
      "p": 0.0021,
      "description": "List pull requests of the repository"
    }
  ],
  "understood": true,
  "method": "catalog",
  "intent": "gh_pr_merge",
  "description": "Merge a pull request",
  "baseRisk": "medium",
  "slots": {
    "pr": "42"
  },
  "notes": null,
  "variant": "posix",
  "command": "gh pr merge 42",
  "risk": "medium",
  "warnings": [
    "path left as a placeholder: the request names more paths than gh_pr_merge takes (/tmp/other-repo); run it once per path"
  ],
  "critical": false,
  "missing": [],
  "slotSources": {
    "pr": "tagger"
  },
  "spans": [
    {
      "type": "NUM",
      "text": "42"
    }
  ]
}
{
  "query": "run npm test in /tmp/project",
  "shell": "bash",
  "os": "linux",
  "coreutils": "gnu",
  "threshold": 0.375,
  "context": {
    "used": false
  },
  "confidence": 0.9988,
  "tool": "npm",
  "tools": [
    {
      "tool": "npm",
      "p": 1
    },
    {
      "tool": "find",
      "p": 0
    },
    {
      "tool": "gh",
      "p": 0
    }
  ],
  "candidates": [
    {
      "intent": "npm_run_script",
      "tool": "npm",
      "p": 0.9988,
      "description": "Run a package.json script with npm (npm run dev/build/test)"
    },
    {
      "intent": "npm_install",
      "tool": "npm",
      "p": 0.0011,
      "description": "Install the project dependencies (or one package) with npm"
    },
    {
      "intent": "npm_install_global",
      "tool": "npm",
      "p": 0,
      "description": "Install an npm package globally"
    }
  ],
  "understood": true,
  "method": "catalog",
  "intent": "npm_run_script",
  "description": "Run a package.json script with npm (npm run dev/build/test)",
  "baseRisk": "medium",
  "slots": {
    "script": "test"
  },
  "notes": null,
  "variant": "posix",
  "command": "npm run test",
  "risk": "medium",
  "warnings": [
    "path left as a placeholder: the request names more paths than npm_run_script takes (/tmp/project); run it once per path"
  ],
  "critical": false,
  "missing": [],
  "slotSources": {
    "script": "tagger"
  },
  "spans": [
    {
      "type": "NAME",
      "text": "test"
    },
    {
      "type": "PATH",
      "text": "/tmp/project"
    }
  ]
}
{
  "query": "show the help for pytest",
  "shell": "sh",
  "os": "linux",
  "coreutils": "gnu",
  "threshold": 0.375,
  "context": {
    "used": false
  },
  "confidence": 0.9955,
  "tool": "cli",
  "tools": [
    {
      "tool": "cli",
      "p": 0.9967
    },
    {
      "tool": "journalctl",
      "p": 0.0005
    },
    {
      "tool": "gh",
      "p": 0.0003
    }
  ],
  "candidates": [
    {
      "intent": "cli_help",
      "tool": "cli",
      "p": 0.9955,
      "description": "Show the built-in help (--help) of a command"
    },
    {
      "intent": "tool_version",
      "tool": "cli",
      "p": 0.0012,
      "description": "Show the installed version of a command-line tool"
    },
    {
      "intent": "journal_service",
      "tool": "journalctl",
      "p": 0.0004,
      "description": "Show logs of a systemd service"
    }
  ],
  "understood": true,
  "method": "catalog",
  "intent": "cli_help",
  "description": "Show the built-in help (--help) of a command",
  "baseRisk": "safe",
  "slots": {
    "cmd": "pytest"
  },
  "notes": null,
  "variant": "posix",
  "command": "pytest --help",
  "risk": "safe",
  "warnings": [],
  "critical": false,
  "missing": [],
  "slotSources": {
    "cmd": "tagger"
  },
  "spans": [
    {
      "type": "NAME",
      "text": "pytest"
    }
  ]
}

web search: 
web search: 'pytest_load_initial_conftests('
exec
/bin/bash -lc "node --input-type=module <<'JS'
import { suggest } from './src/pipeline.js';
for (const q of ['run npm deploy --workspace staging','npm run deploy --workspace staging','run npm test in workspace api','run npm test in project api','npm install axios --prefix /tmp/project','npm install axios in /tmp/project','merge pr 42 on github.enterprise.test','merge pr 42 in project acme/backend','merge pr 42 in /tmp/other-repo','merge pr 42 --repo=acme/app --repo=other/app','stop docker container web','delete folder foo','kill process 123']) {
 const r = suggest(q,{env:{shell:'bash',os:'linux',coreutils:'gnu'}});console.log(JSON.stringify({q,cmd:r.command,risk:r.risk,missing:r.missing,warnings:r.warnings}));
}
JS
rg -n 'def _preparse|pytest_load_initial_conftests|known_args_namespace.help|def _importconftest|import_path\\(' /home/box/.local/lib/python3.13/site-packages/_pytest/config/__init__.py
sed -n '1360,1440p' /home/box/.local/lib/python3.13/site-packages/_pytest/config/__init__.py
sed -n '660,716p' /home/box/.local/lib/python3.13/site-packages/_pytest/config/__init__.py" in /workspace/tellsh
 succeeded in 141ms:
{"q":"run npm deploy --workspace staging","cmd":"npm run deploy","risk":"medium","missing":[],"warnings":[]}
{"q":"npm run deploy --workspace staging","cmd":"npm run deploy","risk":"medium","missing":[],"warnings":[]}
{"q":"run npm test in workspace api","cmd":"npm run test","risk":"medium","missing":[],"warnings":[]}
{"q":"run npm test in project api","cmd":"npm run test","risk":"medium","missing":[],"warnings":[]}
{"q":"npm install axios --prefix /tmp/project","cmd":"npm install axios","risk":"medium","missing":[],"warnings":["path left as a placeholder: the request names more paths than npm_install takes (/tmp/project); run it once per path"]}
{"q":"npm install axios in /tmp/project","cmd":"npm install axios","risk":"medium","missing":[],"warnings":["path left as a placeholder: the request names more paths than npm_install takes (/tmp/project); run it once per path"]}
{"q":"merge pr 42 on github.enterprise.test","cmd":"gh pr merge 42","risk":"medium","missing":[],"warnings":[]}
{"q":"merge pr 42 in project acme/backend","cmd":"gh pr merge 42","risk":"medium","missing":[],"warnings":[]}
{"q":"merge pr 42 in /tmp/other-repo","cmd":"gh pr merge 42","risk":"medium","missing":[],"warnings":["path left as a placeholder: the request names more paths than gh_pr_merge takes (/tmp/other-repo); run it once per path"]}
{"q":"merge pr 42 --repo=acme/app --repo=other/app","cmd":"gh pr merge 42 --repo <REPO>","risk":"medium","missing":["repo"],"warnings":[]}
{"q":"stop docker container web","cmd":"docker stop docker","risk":"medium","missing":[],"warnings":["stops containers"]}
{"q":"delete folder foo","cmd":"rm -r foo","risk":"high","missing":[],"warnings":["rm deletes files permanently (no trash)"]}
{"q":"kill process 123","cmd":"kill 123","risk":"high","missing":[],"warnings":["terminates processes"]}
733:    def _importconftest(
758:            mod = import_path(
1299:    def pytest_load_initial_conftests(self, early_config: Config) -> None:
1590:        # on early_config in the pytest_load_initial_conftests hook call below.
1605:            self.hook.pytest_load_initial_conftests(
1609:            if self.known_args_namespace.help or self.known_args_namespace.version:

        package_files = (
            str(file)
            for dist in importlib.metadata.distributions()
            if any(ep.group == "pytest11" for ep in dist.entry_points)
            for file in dist.files or []
        )

        for name in _iter_rewritable_modules(package_files):
            hook.mark_rewrite(name)

    def _configure_python_path(self) -> None:
        # `pythonpath = a b` will set `sys.path` to `[a, b, x, y, z, ...]`
        for path in reversed(self.getini("pythonpath")):
            sys.path.insert(0, str(path))
        self.add_cleanup(self._unconfigure_python_path)

    def _unconfigure_python_path(self) -> None:
        for path in self.getini("pythonpath"):
            path_str = str(path)
            if path_str in sys.path:
                sys.path.remove(path_str)

    def _validate_args(self, args: list[str], via: str) -> list[str]:
        """Validate known args."""
        self._parser.extra_info["config source"] = via
        try:
            self._parser.parse_known_and_unknown_args(
                args, namespace=copy.copy(self.option)
            )
        finally:
            self._parser.extra_info.pop("config source", None)

        return args

    def _decide_args(
        self,
        *,
        args: list[str],
        pyargs: bool,
        testpaths: list[str],
        invocation_dir: pathlib.Path,
        rootpath: pathlib.Path,
        warn: bool,
    ) -> tuple[list[str], ArgsSource]:
        """Decide the args (initial paths/nodeids) to use given the relevant inputs.

        :param warn: Whether can issue warnings.

        :returns: The args and the args source. Guaranteed to be non-empty.
        """
        if args:
            source = Config.ArgsSource.ARGS
            result = args
        else:
            if invocation_dir == rootpath:
                source = Config.ArgsSource.TESTPATHS
                if pyargs:
                    result = testpaths
                else:
                    result = []
                    for path in testpaths:
                        result.extend(sorted(glob.iglob(path, recursive=True)))
                    if testpaths and not result:
                        if warn:
                            warning_text = (
                                "No files were found in testpaths; "
                                "consider removing or adjusting your testpaths configuration. "
                                "Searching recursively from the current directory instead."
                            )
                            self.issue_config_time_warning(
                                PytestConfigWarning(warning_text), stacklevel=3
                            )
            else:
                result = []
            if not result:
                source = Config.ArgsSource.INVOCATION_DIR
                result = [str(invocation_dir)]
        return result, source

    @hookimpl(wrapper=True)

        for anchor in anchors:
            self._loadconftestmodules(
                anchor,
                importmode,
                rootpath,
                consider_namespace_packages=consider_namespace_packages,
            )

    def _is_in_confcutdir(self, path: pathlib.Path) -> bool:
        """Whether to consider the given path to load conftests from."""
        if self._confcutdir is None:
            return True
        # The semantics here are literally:
        #   Do not load a conftest if it is found upwards from confcut dir.
        # But this is *not* the same as:
        #   Load only conftests from confcutdir or below.
        # At first glance they might seem the same thing, however we do support use cases where
        # we want to load conftests that are not found in confcutdir or below, but are found
        # in completely different directory hierarchies like packages installed
        # in out-of-source trees.
        # (see #9767 for a regression where the logic was inverted).
        return path not in self._confcutdir.parents

    def _loadconftestmodules(
        self,
        path: pathlib.Path,
        importmode: str | ImportMode,
        rootpath: pathlib.Path,
        *,
        consider_namespace_packages: bool,
    ) -> None:
        if self._noconftest:
            return

        directory = self._get_directory(path)

        # Optimization: avoid repeated searches in the same directory.
        # Assumes always called with same importmode and rootpath.
        if directory in self._dirpath2confmods:
            return

        clist = []
        for parent in reversed((directory, *directory.parents)):
            if self._is_in_confcutdir(parent):
                conftestpath = parent / "conftest.py"
                if conftestpath.is_file():
                    mod = self._importconftest(
                        conftestpath,
                        importmode,
                        rootpath,
                        consider_namespace_packages=consider_namespace_packages,
                    )
                    clist.append(mod)
        self._dirpath2confmods[directory] = clist

    def _getconftestmodules(self, path: pathlib.Path) -> Sequence[types.ModuleType]:

exec
/bin/bash -lc "node --input-type=module <<'JS'
import assert from 'node:assert/strict';
import { suggest } from './src/pipeline.js';
for (const shell of ['bash','zsh','fish','powershell','cmd']) {
 const env = {shell,os:['powershell','cmd'].includes(shell)?'win32':'linux',coreutils:'gnu'};
 for (const q of ['show the help for pytest','run npm deploy --workspace staging','merge pr 42 in project acme/backend']) {
  const r=suggest(q,{env});
  assert.equal(r.understood,true); assert.deepEqual(r.missing,[]);
  console.log(JSON.stringify({shell,q,command:r.command,risk:r.risk,warnings:r.warnings}));
 }
}
JS
nl -ba src/pipeline.js | sed -n '416,444p'; sed -n '1570,1627p' /home/box/.local/lib/python3.13/site-packages/_pytest/config/__init__.py; git status --short" in /workspace/tellsh
 succeeded in 167ms:
{"shell":"bash","q":"show the help for pytest","command":"pytest --help","risk":"safe","warnings":[]}
{"shell":"bash","q":"run npm deploy --workspace staging","command":"npm run deploy","risk":"medium","warnings":[]}
{"shell":"bash","q":"merge pr 42 in project acme/backend","command":"gh pr merge 42","risk":"medium","warnings":[]}
{"shell":"zsh","q":"show the help for pytest","command":"pytest --help","risk":"safe","warnings":[]}
{"shell":"zsh","q":"run npm deploy --workspace staging","command":"npm run deploy","risk":"medium","warnings":[]}
{"shell":"zsh","q":"merge pr 42 in project acme/backend","command":"gh pr merge 42","risk":"medium","warnings":[]}
{"shell":"fish","q":"show the help for pytest","command":"pytest --help","risk":"safe","warnings":[]}
{"shell":"fish","q":"run npm deploy --workspace staging","command":"npm run deploy","risk":"medium","warnings":[]}
{"shell":"fish","q":"merge pr 42 in project acme/backend","command":"gh pr merge 42","risk":"medium","warnings":[]}
{"shell":"powershell","q":"show the help for pytest","command":"& 'pytest' --help","risk":"safe","warnings":[]}
{"shell":"powershell","q":"run npm deploy --workspace staging","command":"npm run 'deploy'","risk":"medium","warnings":[]}
{"shell":"powershell","q":"merge pr 42 in project acme/backend","command":"gh pr merge 42","risk":"medium","warnings":[]}
{"shell":"cmd","q":"show the help for pytest","command":"pytest --help","risk":"safe","warnings":[]}
{"shell":"cmd","q":"run npm deploy --workspace staging","command":"npm run deploy","risk":"medium","warnings":[]}
{"shell":"cmd","q":"merge pr 42 in project acme/backend","command":"gh pr merge 42","risk":"medium","warnings":[]}
   416	    return { ...out, understood: false, method: 'none', hint };
   417	  }
   418	
   419	  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode, tagger: opts.tagger });
   420	  const slots = r.slots;
   421	  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
   422	  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
   423	  const ambiguousPaths = [];
   424	  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
   425	  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
   426	  const blank = new Set(r.withheld || []);
   427	  // withheld operands whose optional part keeps its placeholder: an invalid operand, a history value that is ambiguous or
   428	  // invalid (`gh pr merge <PR>` for "same but merge" after `tellsh merge pr nightly`, never the current branch's pull request)
   429	  const keep = new Set(r.invalidOperands);
   430	  if (BY_ID[intent].risk !== 'safe') {
   431	    for (const k of Object.keys(slots)) {
   432	      if (PATH_SLOT_NAMES.has(k) && r.sources[k] !== 'history' && trailingPunctAfter(query, slots[k])) { ambiguousPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   433	    }
   434	    if (ambiguousPaths.length) finalizeSlots(BY_ID[intent], slots);
   435	  }
   436	  // a changing command whose path is the output of a command (`in \`pwd\``, `$(pwd)`), or a request that names more
   437	  // explicit paths than the command takes (`in /tmp/x and /tmp/y`: only one would be used): placeholder + warning
   438	  const unclearPaths = [];
   439	  if (BY_ID[intent].risk !== 'safe') {
   440	    const explicit = explicitPaths(query);
   441	    const nPathSlots = [...PATH_SLOT_NAMES].filter((k) => usesSlot(BY_ID[intent], k)).length;
   442	    const dropped = explicit.filter((p) => !Object.values(slots).some((v) => String(v) === p));
   443	    const tooMany = explicit.length > nPathSlots && dropped.length > 0;
   444	    // `in $(pwd)`: the location is the output of a command, so an empty path slot is withheld too (never `.`)
            if overrides := parse_override_ini(self.known_args_namespace.override_ini):
                self._inicfg.update(overrides)
                self._inicache.clear()
        self._checkversion()
        self._consider_importhook()
        self._configure_python_path()
        self.pluginmanager.consider_preparse(args, exclude_only=False)
        if (
            not os.environ.get("PYTEST_DISABLE_PLUGIN_AUTOLOAD")
            and not self.known_args_namespace.disable_plugin_autoload
        ):
            # Autoloading from distribution package entry point has
            # not been disabled.
            self.pluginmanager.load_setuptools_entrypoints("pytest11")
        # Otherwise only plugins explicitly specified in PYTEST_PLUGINS
        # are going to be loaded.
        self.pluginmanager.consider_env()

        # Parse again, now including options added in pytest_addoption
        # by third-party plugins loaded above. This way they're available
        # on early_config in the pytest_load_initial_conftests hook call below.
        self.known_args_namespace = self._parser.parse_known_args(
            args, namespace=copy.copy(self.option)
        )

        self._validate_plugins()
        self._warn_about_skipped_plugins()

        if self.known_args_namespace.confcutdir is None:
            if self.inipath is not None:
                confcutdir = str(self.inipath.parent)
            else:
                confcutdir = str(self.rootpath)
            self.known_args_namespace.confcutdir = confcutdir
        try:
            self.hook.pytest_load_initial_conftests(
                early_config=self, args=args, parser=self._parser
            )
        except ConftestImportFailure as e:
            if self.known_args_namespace.help or self.known_args_namespace.version:
                # we don't want to prevent --help/--version to work
                # so just let it pass and print a warning at the end
                self.issue_config_time_warning(
                    PytestConfigWarning(f"could not load initial conftests: {e.path}"),
                    stacklevel=2,
                )
            else:
                raise

        try:
            self._parser.parse(args, namespace=self.option)
        except PrintHelp:
            return

        self.args, self.args_source = self._decide_args(
            args=getattr(self.option, FILE_OR_DIR),
            pyargs=self.option.pyargs,
            testpaths=self.getini("testpaths"),
?? review/final3-claude.md
?? review/final3-codex.md

codex
- **Major — Project code can be marked safe** ([catalog.js:267](/workspace/tellsh/src/catalog.js:267)). `show the help for pytest` produces `pytest --help`, `risk: "safe"`, and no missing arguments. However, pytest imports project `conftest.py` files before displaying help, executing arbitrary project code ([pytest source](https://docs.pytest.org/en/stable/_modules/_pytest/config.html)). Consequently, `--yes` bypasses confirmation for code execution. This command needs a non-safe risk floor.

- **Major — npm workspace selection is silently discarded** ([catalog.js:259](/workspace/tellsh/src/catalog.js:259)). `run npm deploy --workspace staging` produces `npm run deploy` with no warnings or placeholders. This executes the current project’s deployment script instead of the selected workspace’s script. Preserve the workspace or withhold the command with a required placeholder.

- **Major — Explicit PR numbers bypass unresolved repository selectors** ([fill.js:328](/workspace/tellsh/src/fill.js:328)). `merge pr 42 in project acme/backend` produces `gh pr merge 42`, with no warnings or placeholders. The early return accepts a numeric PR despite unexplained repository information, potentially merging PR 42 in the current repository. Unresolved repository scope must remain a required placeholder.

All three suggestion failures reproduce across bash, zsh, fish, PowerShell, and cmd.

VERDICT: REQUEST_CHANGES
tokens used
125,293
- **Major — Project code can be marked safe** ([catalog.js:267](/workspace/tellsh/src/catalog.js:267)). `show the help for pytest` produces `pytest --help`, `risk: "safe"`, and no missing arguments. However, pytest imports project `conftest.py` files before displaying help, executing arbitrary project code ([pytest source](https://docs.pytest.org/en/stable/_modules/_pytest/config.html)). Consequently, `--yes` bypasses confirmation for code execution. This command needs a non-safe risk floor.

- **Major — npm workspace selection is silently discarded** ([catalog.js:259](/workspace/tellsh/src/catalog.js:259)). `run npm deploy --workspace staging` produces `npm run deploy` with no warnings or placeholders. This executes the current project’s deployment script instead of the selected workspace’s script. Preserve the workspace or withhold the command with a required placeholder.

- **Major — Explicit PR numbers bypass unresolved repository selectors** ([fill.js:328](/workspace/tellsh/src/fill.js:328)). `merge pr 42 in project acme/backend` produces `gh pr merge 42`, with no warnings or placeholders. The early return accepts a numeric PR despite unexplained repository information, potentially merging PR 42 in the current repository. Unresolved repository scope must remain a required placeholder.

All three suggestion failures reproduce across bash, zsh, fish, PowerShell, and cmd.

VERDICT: REQUEST_CHANGES
