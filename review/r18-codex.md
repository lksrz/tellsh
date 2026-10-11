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
session id: 01a129c8-d56a-77a1-bb33-7ca8eda487dd
--------
user
Re-review of tellsh (git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD; runtime src/ bin/, training scripts). History refs are intentionally limited to 1 line back. Read-only. Findings with severity and file:line. End with exactly one line that is either VERDICT: APPROVE (no blocker/major) or VERDICT: REQUEST_CHANGES.
codex
I’ll review the diff and trace the affected runtime and training paths, keeping the review read-only and within the available history.

exec
/bin/bash -lc "pwd && rg --files -g AGENTS.md -g '"'!node_modules'"' -g '"'!vendor'"' /workspace 2>/dev/null" in /workspace/tellsh
 succeeded in 272ms:
/workspace/tellsh
/workspace/ct-landing-2026-10-08/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/planets/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/nodejs-server-sparse/AGENTS.md
/workspace/monetization-cnvs-freesign-whenmeet-2026-10-08/repos/whiteboard/AGENTS.md
/workspace/ar-metering/nodejs-server/AGENTS.md
/workspace/funnel-ship-2026-10-08/mg-plus/AGENTS.md
/workspace/ar-metering/saas/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/saas/AGENTS.md
/workspace/funnel-ship-2026-10-08/mg-plai/AGENTS.md
/workspace/catchup-2026-10-01/whiteboard-seo/AGENTS.md
/workspace/wearfits-genai-app/AGENTS.md
/workspace/planets/AGENTS.md
/workspace/funnel-ship-2026-10-08/mg-plugand/AGENTS.md
/workspace/multigpt/AGENTS.md
/workspace/whiteboard/AGENTS.md
/workspace/catchup-2026-10-01/multigpt/AGENTS.md
/workspace/nodejs-server-fix/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/multigpt/AGENTS.md
/workspace/ga4fix-genai-app/AGENTS.md
/workspace/rubikon-deploy/web/public/AGENTS.md
/workspace/wearfits-genai-api/AGENTS.md
/workspace/rubikon/web/public/AGENTS.md
/workspace/seo-ship-2026-10-05/planets/AGENTS.md
/workspace/website2026-retailers/AGENTS.md
/workspace/ga4-conv-2026-10-08/repos/rubikon/web/public/AGENTS.md
/workspace/rubikon-web-deploy/web/public/AGENTS.md
/workspace/ga4-conv-2026-10-08/repos/f1pl/f1pl-web/public/data/AGENTS.md
/workspace/wf-nightly-2026-10-10/repo/AGENTS.md
/workspace/ga4-conv-2026-10-08/repos/whiteboard/AGENTS.md
/workspace/nodejs-server-zf/AGENTS.md
/workspace/zf-requeue/wearfits-genai-app/AGENTS.md
/workspace/zf-requeue/shopify-wearfits/AGENTS.md

exec
/bin/bash -lc 'git status --short && git diff --stat 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD && git diff --name-only 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD' in /workspace/tellsh
 succeeded in 0ms:
?? review/r18-claude.md
?? review/r18-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   521 +-
 HYBRID.md                                    |   610 ++
 README.md                                    |   169 +-
 bin/tellsh.js                                |     3 +
 data/blind/compose.jsonl                     |    58 +
 data/blind/e2e.jsonl                         |   207 +
 data/blind/history.jsonl                     |    79 +
 data/blind/intents.jsonl                     |   844 ++
 data/blind/ood.jsonl                         |    64 +
 data/candidates/ood_new.jsonl                |   464 ++
 data/candidates/paraA.jsonl                  |  1329 +++
 data/candidates/paraB.jsonl                  |  1220 +++
 data/eval_baseline_v0.2.json                 |    56 +
 data/eval_v04/devtools.jsonl                 |   424 +
 data/history/eval.jsonl                      |     7 +-
 data/hybrid/blind/blind_en.jsonl             |   331 +
 data/hybrid/blind/blind_ood.jsonl            |    40 +
 data/hybrid/blind/blind_pl.jsonl             |   310 +
 data/intents/g06_teacher.jsonl               |  1911 +++++
 data/intents/g07_hardneg.jsonl               |   463 ++
 data/intents/g08_devtools.jsonl              |  1625 ++++
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
 hybrid/results/results.json                  |  2905 +++++++
 hybrid/results/results_ft.json               |  1630 ++++
 hybrid/results/sizes.json                    |    21 +
 hybrid/results/v04_after.json                |  2996 +++++++
 hybrid/results/v04_after_ft.json             |  2945 +++++++
 hybrid/results/v04_before.json               |  2996 +++++++
 hybrid/results/v04_before_ft.json            |  2913 +++++++
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
 review/.f1done                               |     0
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
 review/STATUS                                |     1 +
 review/fix1-log.md                           |    12 +
 review/fix10-log.md                          |    34 +
 review/fix11-log.md                          |    25 +
 review/fix12-log.md                          |    31 +
 review/fix13-log.md                          |    25 +
 review/fix14-log.md                          |    28 +
 review/fix15-log.md                          |    30 +
 review/fix16-log.md                          |    25 +
 review/fix17-log.md                          |    17 +
 review/fix2-log.md                           |    17 +
 review/fix3-log.md                           |    50 +
 review/fix4-log.md                           |    30 +
 review/fix4b-log.md                          |    55 +
 review/fix5-log.md                           |    58 +
 review/fix7-log.md                           |    41 +
 review/fix8-log.md                           |    48 +
 review/fix9-log.md                           |    29 +
 review/hybrid-log.md                         |    41 +
 review/r1-claude.md                          |   115 +
 review/r1-codex.md                           |  9854 ++++++++++++++++++++++
 review/r10-claude.md                         |    49 +
 review/r10-codex.md                          |  8707 +++++++++++++++++++
 review/r11-claude.md                         |    53 +
 review/r11-codex.md                          |  9592 +++++++++++++++++++++
 review/r12-claude.md                         |    37 +
 review/r12-codex.md                          | 10887 ++++++++++++++++++++++++
 review/r13-claude.md                         |    37 +
 review/r13-codex.md                          |  7148 ++++++++++++++++
 review/r14-claude.md                         |    34 +
 review/r14-codex.md                          |  9586 +++++++++++++++++++++
 review/r15-claude.md                         |    35 +
 review/r15-codex.md                          |  9479 +++++++++++++++++++++
 review/r16-claude.md                         |    39 +
 review/r16-codex.md                          |  9975 ++++++++++++++++++++++
 review/r17-claude.md                         |    35 +
 review/r17-codex.md                          | 11097 +++++++++++++++++++++++++
 review/r2-claude.md                          |    84 +
 review/r2-codex.md                           |  8616 +++++++++++++++++++
 review/r3-claude.md                          |    63 +
 review/r3-codex.md                           |  8281 ++++++++++++++++++
 review/r4-claude.md                          |    57 +
 review/r4-codex.md                           |  9505 +++++++++++++++++++++
 review/r5-claude.md                          |    46 +
 review/r5-codex.md                           |  9090 ++++++++++++++++++++
 review/r6-claude.md                          |    60 +
 review/r6-codex.md                           | 10443 +++++++++++++++++++++++
 review/r7-claude.md                          |    48 +
 review/r7-codex.md                           | 10037 ++++++++++++++++++++++
 review/r8-claude.md                          |    54 +
 review/r8-codex.md                           |  9340 +++++++++++++++++++++
 review/r9-claude.md                          |    53 +
 review/r9-codex.md                           | 10346 +++++++++++++++++++++++
 scripts/bench.js                             |     2 +-
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
 scripts/lib/cmdnorm.js                       |    10 +-
 scripts/lib/confusable.js                    |    66 +
 scripts/lib/heldout.js                       |    79 +
 scripts/lib/jev.js                           |   105 +
 scripts/lib/silver.js                        |    55 +-
 scripts/real/prepare_real.js                 |   168 +
 scripts/real/real_rows.js                    |    25 +
 scripts/real/report_v04.js                   |   161 +
 scripts/report.js                            |     2 +-
 scripts/teacher.js                           |   475 +-
 scripts/tldr_ingest.py                       |    12 +-
 scripts/train.py                             |    34 +-
 src/catalog.js                               |    38 +
 src/cli.js                                   |    48 +-
 src/compose.js                               |   180 +-
 src/danger.js                                |   491 +-
 src/fill.js                                  |   187 +-
 src/history.js                               |   992 ++-
 src/model.js                                 |    22 +-
 src/pipeline.js                              |   453 +-
 src/render.js                                |    96 +-
 src/rerank/encoder.js                        |   152 +
 src/rerank/hybrid.js                         |   112 +
 src/rerank/tokenizer.js                      |    92 +
 src/shellwords.js                            |   101 +-
 src/slots.js                                 |   119 +-
 src/tagger.js                                |    55 +-
 src/tools.js                                 |    12 +-
 src/variants.js                              |    37 +
 test/compose.test.js                         |    50 +
 test/devtools.test.js                        |    98 +
 test/fixtures/parity.json                    |     2 +-
 test/hybrid.test.js                          |    46 +
 test/pipeline.test.js                        |     8 +-
 test/regressions.test.js                     |     3 +-
 test/regressions10.test.js                   |   145 +
 test/regressions11.test.js                   |    92 +
 test/regressions12.test.js                   |    78 +
 test/regressions13.test.js                   |    70 +
 test/regressions14.test.js                   |    83 +
 test/regressions15.test.js                   |    81 +
 test/regressions16.test.js                   |    58 +
 test/regressions17.test.js                   |    70 +
 test/regressions18.test.js                   |    61 +
 test/regressions19.test.js                   |   109 +
 test/regressions2.test.js                    |   325 +
 test/regressions3-history.test.js            |    87 +
 test/regressions3-render.test.js             |   148 +
 test/regressions3.test.js                    |    46 +
 test/regressions4.test.js                    |   199 +
 test/regressions5.test.js                    |   144 +
 test/regressions6.test.js                    |   169 +
 test/regressions7.test.js                    |   143 +
 test/regressions8.test.js                    |   201 +
 test/regressions9.test.js                    |   200 +
 test/shells.test.js                          |     8 +-
 210 files changed, 201209 insertions(+), 805 deletions(-)
.gitignore
EVAL.md
HYBRID.md
README.md
bin/tellsh.js
data/blind/compose.jsonl
data/blind/e2e.jsonl
data/blind/history.jsonl
data/blind/intents.jsonl
data/blind/ood.jsonl
data/candidates/ood_new.jsonl
data/candidates/paraA.jsonl
data/candidates/paraB.jsonl
data/eval_baseline_v0.2.json
data/eval_v04/devtools.jsonl
data/history/eval.jsonl
data/hybrid/blind/blind_en.jsonl
data/hybrid/blind/blind_ood.jsonl
data/hybrid/blind/blind_pl.jsonl
data/intents/g06_teacher.jsonl
data/intents/g07_hardneg.jsonl
data/intents/g08_devtools.jsonl
data/ood_teacher.jsonl
data/teacher/decisions.jsonl
data/teacher/hardneg_boost.jsonl
data/teacher/hardneg_rejected.jsonl
data/teacher/hardneg_summary.json
data/teacher/label_rejected.jsonl
data/teacher/label_summary.json
data/teacher/ledger.json
data/teacher/ood_rejected.jsonl
data/teacher/review.jsonl
data/teacher/verify_summary.json
hybrid/package/tellsh-model-enc/README.md
hybrid/package/tellsh-model-enc/package.json
hybrid/results/bench.json
hybrid/results/enc_export_report.json
hybrid/results/policy.json
hybrid/results/policy_ft.json
hybrid/results/prune_report.json
hybrid/results/quant.json
hybrid/results/results.json
hybrid/results/results_ft.json
hybrid/results/sizes.json
hybrid/results/v04_after.json
hybrid/results/v04_after_ft.json
hybrid/results/v04_before.json
hybrid/results/v04_before_ft.json
hybrid/results/v04_bench_after.json
hybrid/results/v04_bench_after_real.json
hybrid/results/v04_bench_before.json
hybrid/results/v04_bench_before_real.json
hybrid/results/v04_enc_export_report.json
hybrid/results/v04_policy.json
hybrid/results/v04_policy_ft.json
hybrid/results/v04_real_stats.json
hybrid/results/zeroshot.jsonl
model/compose_explained.json
model/model.bin
package.json
review/.f10done
review/.f11done
review/.f12done
review/.f13done
review/.f14done
review/.f15done
review/.f16done
review/.f17done
review/.f1done
review/.f4bdone
review/.f5done
review/.f8done
review/.f9done
review/.h1done
review/.hdone
review/.r1done
review/.r2done
review/.r3done
review/.r4done
review/.r5done
review/.r6done
review/STATUS
review/fix1-log.md
review/fix10-log.md
review/fix11-log.md
review/fix12-log.md
review/fix13-log.md
review/fix14-log.md
review/fix15-log.md
review/fix16-log.md
review/fix17-log.md
review/fix2-log.md
review/fix3-log.md
review/fix4-log.md
review/fix4b-log.md
review/fix5-log.md
review/fix7-log.md
review/fix8-log.md
review/fix9-log.md
review/hybrid-log.md
review/r1-claude.md
review/r1-codex.md
review/r10-claude.md
review/r10-codex.md
review/r11-claude.md
review/r11-codex.md
review/r12-claude.md
review/r12-codex.md
review/r13-claude.md
review/r13-codex.md
review/r14-claude.md
review/r14-codex.md
review/r15-claude.md
review/r15-codex.md
review/r16-claude.md
review/r16-codex.md
review/r17-claude.md
review/r17-codex.md
review/r2-claude.md
review/r2-codex.md
review/r3-claude.md
review/r3-codex.md
review/r4-claude.md
review/r4-codex.md
review/r5-claude.md
review/r5-codex.md
review/r6-claude.md
review/r6-codex.md
review/r7-claude.md
review/r7-codex.md
review/r8-claude.md
review/r8-codex.md
review/r9-claude.md
review/r9-codex.md
scripts/bench.js
scripts/build_triggers.js
scripts/check_variants.js
scripts/compare.js
scripts/eval.js
scripts/gen_data.js
scripts/hybrid/bench_hybrid.js
scripts/hybrid/cold_query.js
scripts/hybrid/dump_cascade.js
scripts/hybrid/eval_hybrid.js
scripts/hybrid/export_data.js
scripts/hybrid/export_encoder.py
scripts/hybrid/fetch_model.js
scripts/hybrid/lm_rerank.py
scripts/hybrid/prune_vocab.py
scripts/hybrid/report_hybrid.js
scripts/hybrid/sets.js
scripts/hybrid/train_a_dev.sh
scripts/hybrid/train_encoder.py
scripts/hybrid/train_lm_gpu.py
scripts/lib/cmdnorm.js
scripts/lib/confusable.js
scripts/lib/heldout.js
scripts/lib/jev.js
scripts/lib/silver.js
scripts/real/prepare_real.js
scripts/real/real_rows.js
scripts/real/report_v04.js
scripts/report.js
scripts/teacher.js
scripts/tldr_ingest.py
scripts/train.py
src/catalog.js
src/cli.js
src/compose.js
src/danger.js
src/fill.js
src/history.js
src/model.js
src/pipeline.js
src/render.js
src/rerank/encoder.js
src/rerank/hybrid.js
src/rerank/tokenizer.js
src/shellwords.js
src/slots.js
src/tagger.js
src/tools.js
src/variants.js
test/compose.test.js
test/devtools.test.js
test/fixtures/parity.json
test/hybrid.test.js
test/pipeline.test.js
test/regressions.test.js
test/regressions10.test.js
test/regressions11.test.js
test/regressions12.test.js
test/regressions13.test.js
test/regressions14.test.js
test/regressions15.test.js
test/regressions16.test.js
test/regressions17.test.js
test/regressions18.test.js
test/regressions19.test.js
test/regressions2.test.js
test/regressions3-history.test.js
test/regressions3-render.test.js
test/regressions3.test.js
test/regressions4.test.js
test/regressions5.test.js
test/regressions6.test.js
test/regressions7.test.js
test/regressions8.test.js
test/regressions9.test.js
test/shells.test.js

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
import { checkDanger } from './danger.js';
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
  pr: (v) => RAW_OK.pr(v), repo: (v) => RAW_OK.repo(v),
  host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
  pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
  old: (v) => v.length > 0 && v.length < 300 && !/[\n\r\0]/.test(v), new: (v) => v.length < 300 && !/[\n\r\0]/.test(v),
};
const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
// "that pr", "this pull request", "the same pr": a pull request named by reference
const PR_REFERENCE = /\b(?:that|this|its|the\s+same|the\s+previous|the\s+last|ten|tego|tamten)\s+(?:\w+\s+)?(?:prs?|pull[\s-]+requests?)\b/i;
// "the other pr", "the latest pr", "my last pull request", "the most recent pr": a pull request picked out among several, which
// neither the current branch's pull request nor the one of the previous command is (withheld, also with history)
const PR_PICKED = /\b(?:(?:the|a|an|my|our|your|his|her|their|some|any)\s+)?(?:other|another|latest|newest|most\s+recent|recent|oldest|older|newer|earlier|next|first|second|third|new|old|pending|approved|remaining|(?:(?:my|our|your|his|her|their)\s+)(?:last|previous|prior)|inn[yaeoy]\w*|ostatni\w*|najnowsz\w*|poprzedni\w*|kolejn\w*|nastepn\w*|następn\w*|starsz\w*)\s+(?:(?:open|opened|draft|merged|github)\s+)?(?:prs?|pull[\s-]+requests?)\b/i;
const PR_CLOSE = /(?:^|[\s,;])(?:close|closing|shut|reject|decline|abandon|zamkn\S*)(?=[\s.,!?;:]|$)/i;
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
    if (validSlot(k, rT[k])) { slots[k] = rT[k]; sources[k] = 'tagger'; } else if (rR[k] != null && (validSlot(k, rR[k]) || !VALID_SLOT[k]) && !(PATH_SLOT_NAMES.has(k) && partOfRejected(rR[k]))) { slots[k] = rR[k]; sources[k] = 'regex'; }
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
  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr', 'repo']) {
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
 * Composed commands always carry at least medium risk, so "changes something" is: a writing tool (chmod,
 * tar) or anything the danger checker flags on its own (find -delete, git/docker subcommands, ...).
 */
const WRITING_TOOLS = new Set(['chmod', 'tar']);
const blocksAmbiguous = (comp, amb) => !!comp && !comp.invalid && amb.some((p) => comp.command.includes(p)) &&
  (WRITING_TOOLS.has(comp.tool) || checkDanger(comp.command, 'safe').risk !== 'safe');

/**
 * Pure function used by the CLI, eval and tests.
 * opts: { shell, os, env, history: string[] (commands, oldest first), cwd, threshold, top, compose: 'auto'|'force'|'off',
 *         slotMode: 'merge'|'tagger'|'regex', model, rerank, rerankTop (candidates the rerank hook sees; default top) }
 */
export function suggest(query, opts = {}) {
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
  if (['gh_pr_create', 'gh_pr_view', 'gh_pr_checks'].includes(intent) && PR_CLOSE.test(query)) {
    return { ...out, understood: false, method: 'none', hint: 'closing a pull request is not supported (gh pr close <PR>)' };
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
    // the reference points at something we cannot read safely: leave the slot empty (placeholder)
    refWordsOnly();
    for (const k of refDst ? [] : ref.blank || []) if (slots[k] == null && usesSlot(BY_ID[intent], k)) { blank.add(k); if (!ref.blanket) keep.add(k); }
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
    for (const k of Object.keys(refFill)) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
    finalizeSlots(BY_ID[intent], slots);
    context.rule = 'refused';
    context.note = ref.guardNote;
    method = 'history-rule';
  } else if (ref?.rule === 'pronoun') {
    const it = BY_ID[intent];
    for (const [k, v] of Object.entries(refFill)) {
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
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/cli.js bin/tellsh.js src/model.js src/catalog.js src/tools.js src/variants.js' in /workspace/tellsh
exec
/bin/bash -lc 'for f in /AGENTS.md /workspace/AGENTS.md; do if [ -f "$f" ]; then cat "$f"; fi; done; cat package.json; cat review/fix17-log.md; cat review/r17-claude.md' in /workspace/tellsh
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
I fixed all four Major findings from round 17 and committed them as `d7bc315`. Nothing was pushed. All 351 tests pass, including the new `test/regressions19.test.js`, and every eval number is the same as before.

**What changed:**
1. **`cd` after `gh pr view N`** (`src/history.js`): after a trailing `cd`, `pushd` or `popd`, the previous PR number is treated as ambiguous. So after `gh pr view 7 && cd ../other`, `… && cd /` or `…; popd`, "merge that pr" gives `gh pr merge <PR>`. `cd ../other && gh pr view 7` still gives `gh pr merge 7`, since the PR is from the repository you're now in. I also applied this to branches: "delete that branch" after `git merge feat; cd /` gives `git branch -d <BRANCH>`.
2. **Phrases that pick out a different PR** (`src/pipeline.js`): "merge the other pr", "the latest pr", "the newest pr", "the most recent pr", "my last pr", "another pr", "the first pr" and similar phrases now give `<PR>`. This also holds when history has a PR, because "the other pr" can't mean that one. "merge the pr" and "merge the current pr" still give a bare `gh pr merge`.
3. **`GH_REPO` / `GH_HOST`**: these now count as pointing `gh` at another repository, whether written as a prefix, via `env`, or with `export` earlier in the line. After `GH_REPO=other/repo gh pr view 45`, "merge that pr" gives `gh pr merge <PR>`.
4. **Repository named in the request** (`src/fill.js` plus the `gh pr` view/checks/merge templates): the repository is now kept rather than dropped. "merge pr 45 in repository other/repo", `--repo other/repo` and `-R other/repo` all give `gh pr merge 45 --repo other/repo`. A repository it can't read ("in another repo", "in repo v2") gives `--repo <REPO>`. Because `gh` needs a PR named when `--repo` is used, "merge pr --repo a/b" gives `<PR> --repo a/b`. "merge that pr in repo a/b" does not reuse the PR from history, since that PR belongs to this repository.

**Minor findings I also fixed:**
- "close that pr", "close pr 45" and "zamknij ten pr" are now refused, instead of suggesting `gh pr create --fill` or `gh pr view 45`.
- When reading history, `-c`, `-a` and `-e` on `gh pr view/review/comment` are treated as plain switches, so `gh pr view -c 7` is read as PR 7.

**Two older tests changed on purpose** (`test/regressions17.test.js`): "merge pr in repo v2" now also withholds the repository (`gh pr merge <PR> --repo <REPO>`), and "close pr for issue 45" is now refused instead of giving `gh pr view <PR>`.

**Not done:** `checkout pr 7` still gives `gh pr checks 7`, and `merge it` after `git checkout feat` still gives `git branch -d feat`. Both were already known from earlier rounds. The training/eval split problem in `scripts/real/prepare_real.js` (packages like `npm install express` vs `react` landing in different groups) is also still open, because fixing it means regenerating the split.

I added a round-18 note to `EVAL.md` along with fresh bench results, and updated the PR section of the README. `review/fix17-log.md` was untracked and empty, so I left it out of the commit. No git identity is configured on this machine, so I made the commit as `lksrz <lukasz@wearfits.com>`, the author of the earlier commits, without changing any git config.
I'm requesting changes. The fix16 changes do what they claim: issue numbers and `#N` in another clause are withheld, "merge that pr" now reads the PR from a previous `gh pr view/checkout/merge N`, and "from the branch X" is parsed. All 345 tests pass. But one new path merges PR N in the wrong repository, and the "never a bare merge when a PR is referred to" rule still has holes.

I tested by calling `suggest()` directly from scratch scripts in `/tmp/r17`. I extracted `2dfca9d` (before fix16) into `/tmp/r17/old` with `git archive` to check which problems are older. No tracked files were changed.

## Major

**M1 — `src/history.js:521` (`staleRelative`) with the new `pr` entity at `src/history.js:790-796`: a `cd` after `gh pr view N` still hands out N.**
- **Cause:** a `cd`/`pushd`/`popd` segment calls `staleRelative(ents, null)`, which only marks `file` and `dir` as stale. The new `pr` entity survives, even though which repository a PR number refers to depends on the working directory.
- **Examples:** each gives a complete command with `missing=[]`:
  - after `gh pr view 7 && cd ../other` → `merge that pr` → `gh pr merge 7`. That merges PR #7 of a different repository.
  - after `gh pr view 7 && cd /` → `gh pr merge 7`
  - after `gh pr view 7; popd` → `gh pr merge 7`
- **Inconsistency:** the wrapper and subshell forms are already withheld (`env -C ../x gh pr view 7` and `(cd ../x && gh pr view 7)` → `<PR>`), and a file is too (after `cat a.txt && cd ..`, "delete that file" → `rm <FILE>`). Only the plain trailing `cd` slips through.
- **Suggested fix:** in the `CD_HEADS` branch, also mark `ents.pr` as ambiguous (a PR number or branch name is meaningful only in the cwd's repository). Add a regressions18 case for it.

**M2 — `src/pipeline.js:96` (`PR_REFERENCE`): other ways of naming a specific PR still give a bare `gh pr merge` (the current branch's PR).**
- **Examples:** each gives `gh pr merge` with `missing=[]`:
  - `merge the other pr`
  - `merge the latest pr`
  - `merge the newest pr`
  - `merge the most recent pr`
  - `merge my last pr` (also after `gh pr view 45`, where the "that pr" path would have used 45)
- **Why it's wrong:** this is the same defect as r16 M2. The user names a specific PR (and "the other pr" can't be the current branch's), and the suggestion silently picks the current branch's PR instead. `PR_REFERENCE` is a short list of exact words (`that|this|the same|the previous|the last|…`), so near-synonyms fall through. These behaved the same before fix16 (checked against `2dfca9d`).
- **Suggested fix:** widen the reference set (`latest|newest|most recent|other|my last|my latest|…`), or invert the rule: any word qualifying "pr" other than an article or "my"/"our" withholds `<PR>`.

## Minor
- **`src/history.js:880-882` (`GH_PR_VALUE_OPTS`):** this is one shared set, but `-c`, `-a` and `-e` take a value in some `gh pr` subcommands and are plain switches in others: `view -c` is `--comments`, `review -c` is `--comment`, `review -a` is `--approve`, `comment -e` is `--editor`. So after `gh pr view -c 7`, `gh pr review -a 7` or `gh pr comment -e 7`, "merge that pr" is withheld ("names no pr"). This is the safe direction, but it should be a per-subcommand table.
- **Intent, older than fix16 (same at `2dfca9d`):** `close that pr` → `gh pr create --fill`, both with and without history. That suggests the opposite action and opens a PR, which other people can see. `close the pr` / `close pull request 45` → `gh pr view …`. The catalog has no `gh_pr_close` intent, so "close" should at least withhold rather than map to create.
- **Carried over, acknowledged in fix16-log:**
  - `checkout pr 7` → `gh pr checks 7`.
  - After `git checkout feat`, `merge it` → `git branch -d feat`.
  - `merge pr from the branch main and delete it` → `gh pr merge main` drops the delete-branch part. Same behaviour as `merge pr and delete the branch`, which the tests expect.
  - `scripts/real/prepare_real.js:67-79`: `group()` still treats operands as subcommands (`npm install lodash` and `npm install express` land in different groups), which weakens the train/eval holdout. Deferred, with a reason given.

VERDICT: REQUEST_CHANGES

 succeeded in 0ms:
diff --git a/bin/tellsh.js b/bin/tellsh.js
index bf8a0ed..cfc9deb 100755
--- a/bin/tellsh.js
+++ b/bin/tellsh.js
@@ -1,6 +1,9 @@
 #!/usr/bin/env node
 import { main } from '../src/cli.js';
 
+// `tellsh … | head -1`: a closed pipe is not an error
+for (const s of [process.stdout, process.stderr]) s.on('error', (e) => { if (e.code === 'EPIPE') process.exit(process.exitCode ?? 0); throw e; });
+
 main().then((code) => { process.exitCode = code; }, (err) => {
   console.error(`tellsh: ${err?.stack || err}`);
   process.exitCode = 1;
diff --git a/src/catalog.js b/src/catalog.js
index f98833f..e24b720 100644
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
@@ -210,6 +212,8 @@ export const INTENTS = [
     "curl -s -o /dev/null -w '%{http_code}\\n' {url}", { url: null }),
   T('download_file', 'Download a file from a URL', 'curl -fLO {url}', { url: null }, 'medium'),
   T('ssh_connect', 'Connect to a server over SSH', 'ssh {target}', { target: null }, 'medium'),
+  T('ssh_port_forward', 'Forward a local port to the same port on a server over SSH (tunnel)',
+    'ssh -N -L {port!raw}:localhost:{port!raw} {target}', { port: null, target: null }, 'medium'),
 
   // ---------- git ----------
   T('git_status', 'Show git working tree status', 'git status', {}),
@@ -249,6 +253,40 @@ export const INTENTS = [
   T('docker_stats', 'Container resource usage', 'docker stats --no-stream', {}),
   T('docker_compose_up', 'Start docker compose services', 'docker compose up -d', {}, 'medium'),
   T('docker_compose_down', 'Stop docker compose services', 'docker compose down', {}, 'medium'),
+
+  // ---------- developer tools (v0.4, from real command usage) ----------
+  // project scripts and installs run arbitrary package code: medium
+  T('npm_run_script', 'Run a package.json script with npm (npm run dev/build/test)', 'npm run {script}', { script: null }, 'medium'),
+  T('npm_install', 'Install the project dependencies (or one package) with npm', 'npm install«{pkg}»', {}, 'medium'),
+  T('npm_install_global', 'Install an npm package globally', 'npm install -g {pkg}', { pkg: null }, 'medium',
+    { notes: 'may need sudo when the global prefix is not user-writable' }),
+  T('pip_install', 'Install a Python package with pip', 'python3 -m pip install {pkg}', { pkg: null }, 'medium'),
+  T('activate_venv', 'Activate a Python virtual environment', '. {path}/bin/activate', { path: '.venv' }, 'medium',
+    { notes: 'run it in your own shell: activating from tellsh only affects a subshell that exits right away' }),
+  T('tool_version', 'Show the installed version of a command-line tool', '{cmd} --version', { cmd: null }),
+  T('cli_help', 'Show the built-in help (--help) of a command', '{cmd} --help', { cmd: null }),
+
+  // ---------- Cloudflare wrangler ----------
+  T('wrangler_deploy', 'Deploy a Cloudflare Worker with wrangler', 'npx wrangler deploy', {}, 'medium'),
+  // npx prefers a project-local wrangler binary, so every npx wrangler command may run project code (and wrangler dev
+  // runs the configured build command): medium, like npm_run_script, never auto-run with --yes
+  T('wrangler_dev', 'Run a Cloudflare Worker locally (wrangler dev)', 'npx wrangler dev', {}, 'medium'),
+  T('wrangler_tail', 'Stream live logs of a deployed Cloudflare Worker', 'npx wrangler tail', {}, 'medium'),
+  T('wrangler_secret_put', 'Set a secret (environment variable) on a Cloudflare Worker', 'npx wrangler secret put {var!raw}',
+    { var: null }, 'medium', { notes: 'wrangler prompts for the value, so it never lands in shell history' }),
+  T('wrangler_login', 'Log in to Cloudflare with wrangler', 'npx wrangler login', {}, 'medium'),
+  T('wrangler_whoami', 'Show which Cloudflare account wrangler is logged in as', 'npx wrangler whoami', {}, 'medium'),
+
+  // ---------- GitHub CLI ----------
+  T('gh_auth_status', 'Show GitHub CLI login status', 'gh auth status', {}),
+  T('gh_auth_login', 'Log in to GitHub with the gh CLI', 'gh auth login', {}),
+  T('gh_pr_list', 'List pull requests of the repository', 'gh pr list', {}),
+  T('gh_pr_view', 'Show a pull request', 'gh pr view«{pr!raw}»«--repo {repo!raw}»', {}),
+  T('gh_pr_create', 'Create a pull request from the current branch', 'gh pr create --fill', {}, 'medium'),
+  T('gh_pr_checks', 'Show CI check status of a pull request', 'gh pr checks«{pr!raw}»«--repo {repo!raw}»', {}),
+  T('gh_pr_merge', 'Merge a pull request', 'gh pr merge«{pr!raw}»«--repo {repo!raw}»', {}, 'medium'),
+  T('gh_run_list', 'List recent GitHub Actions workflow runs', 'gh run list', {}),
+  T('gh_run_view', 'Show a GitHub Actions run (and its failed logs)', 'gh run view«{num!raw}»', {}),
 ];
 
 export const BY_ID = Object.fromEntries(INTENTS.map((i) => [i.id, i]));
diff --git a/src/cli.js b/src/cli.js
index c4f433c..b5f3da8 100644
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
index 4a171b3..ab8ebab 100644
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
+  npm_install: { pwsh: 'npm install«{pkg}»', cmd: 'npm install«{pkg}»' },
+  npm_install_global: { pwsh: 'npm install -g {pkg}', cmd: 'npm install -g {pkg}' },
+  pip_install: { pwsh: { win: 'py -m pip install {pkg}', unix: 'python3 -m pip install {pkg}' }, cmd: 'py -m pip install {pkg}' },
+  tool_version: { pwsh: '& {cmd} --version', cmd: '{cmd} --version' },
+  cli_help: { pwsh: '& {cmd} --help', cmd: '{cmd} --help' },
+  wrangler_deploy: { pwsh: 'npx wrangler deploy', cmd: 'npx wrangler deploy' },
+  wrangler_dev: { pwsh: 'npx wrangler dev', cmd: 'npx wrangler dev' },
+  wrangler_tail: { pwsh: 'npx wrangler tail', cmd: 'npx wrangler tail' },
+  wrangler_secret_put: { pwsh: 'npx wrangler secret put {var!raw}', cmd: 'npx wrangler secret put {var!raw}' },
+  wrangler_login: { pwsh: 'npx wrangler login', cmd: 'npx wrangler login' },
+  wrangler_whoami: { pwsh: 'npx wrangler whoami', cmd: 'npx wrangler whoami' },
+  gh_auth_status: { pwsh: 'gh auth status', cmd: 'gh auth status' },
+  gh_auth_login: { pwsh: 'gh auth login', cmd: 'gh auth login' },
+  gh_pr_list: { pwsh: 'gh pr list', cmd: 'gh pr list' },
+  gh_pr_view: { pwsh: 'gh pr view«{pr!raw}»«--repo {repo!raw}»', cmd: 'gh pr view«{pr!raw}»«--repo {repo!raw}»' },
+  gh_pr_create: { pwsh: 'gh pr create --fill', cmd: 'gh pr create --fill' },
+  gh_pr_checks: { pwsh: 'gh pr checks«{pr!raw}»«--repo {repo!raw}»', cmd: 'gh pr checks«{pr!raw}»«--repo {repo!raw}»' },
+  gh_pr_merge: { pwsh: 'gh pr merge«{pr!raw}»«--repo {repo!raw}»', cmd: 'gh pr merge«{pr!raw}»«--repo {repo!raw}»' },
+  gh_run_list: { pwsh: 'gh run list', cmd: 'gh run list' },
+  gh_run_view: { pwsh: 'gh run view«{num!raw}»', cmd: 'gh run view«{num!raw}»' },
+  activate_venv: {
+    fish: 'source {path}/bin/activate.fish',
+    pwsh: { win: "& (Join-Path {path} 'Scripts/Activate.ps1')", unix: "& (Join-Path {path} 'bin/Activate.ps1')" },
+    cmd: 'call {path}\\Scripts\\activate.bat',
+  },
 };

exec
/bin/bash -lc 'cat src/rerank/hybrid.js src/rerank/encoder.js src/rerank/tokenizer.js' in /workspace/tellsh
 succeeded in 0ms:
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
// (B) Hybrid encoder runtime: pruned multilingual-e5 (int8 ONNX) -> tool / intent distributions + BIO slot spans.
// Optional: onnxruntime is lazy-loaded (onnxruntime-node, else onnxruntime-web/WASM) and the model bundle is looked up
// in $TELLSH_MODEL_DIR, ~/.cache/tellsh/enc-v2, the `tellsh-model-enc` package, or hybrid/models/enc (development).
// Nothing here touches the network: the bundle has to be installed once (scripts/hybrid/fetch_model.js or npm).
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { UnigramTokenizer } from './tokenizer.js';
import { allowedTags } from '../tagger.js';

const require = createRequire(import.meta.url);
export const BUNDLE = 'enc-v2'; // v0.4 labels (173 intents); enc-v1 was the v0.3 bundle (149)

export function findModelDir(explicit) {
  const cands = [explicit, process.env.TELLSH_MODEL_DIR, join(homedir(), '.cache', 'tellsh', BUNDLE)];
  try { cands.push(join(require.resolve('tellsh-model-enc/package.json'), '..')); } catch { /* not installed */ }
  cands.push(fileURLToPath(new URL('../../hybrid/models/enc', import.meta.url)));
  return cands.find((d) => d && existsSync(join(d, 'encoder.int8.onnx')) && existsSync(join(d, 'vocab.json'))) || null;
}

async function loadOrt(prefer) {
  const order = prefer === 'web' ? ['onnxruntime-web', 'onnxruntime-node'] : ['onnxruntime-node', 'onnxruntime-web'];
  for (const m of order) {
    try { const ort = await import(m); return { ort: ort.default ?? ort, name: m }; } catch { /* try next */ }
  }
  return null;
}

const softmax = (a) => { const m = Math.max(...a); const e = a.map((v) => Math.exp(v - m)); const s = e.reduce((x, y) => x + y, 0); return e.map((v) => v / s); };

export class Encoder {
  static async load({ dir, ort: prefer, threads = 1 } = {}) {
    const d = findModelDir(dir);
    if (!d) return null;
    const rt = await loadOrt(prefer);
    if (!rt) return null;
    const t0 = performance.now();
    const v = JSON.parse(readFileSync(join(d, 'vocab.json'), 'utf8'));
    const labels = JSON.parse(readFileSync(join(d, 'labels.json'), 'utf8'));
    const tok = new UnigramTokenizer({ vocab: v.pieces.map((p, i) => [p, v.scores[i]]), unkId: v.unk });
    if (rt.name === 'onnxruntime-web' && rt.ort.env?.wasm) rt.ort.env.wasm.numThreads = threads;
    const opts = { executionProviders: [rt.name === 'onnxruntime-web' ? 'wasm' : 'cpu'], intraOpNumThreads: threads, interOpNumThreads: 1, graphOptimizationLevel: 'all' };
    const model = rt.name === 'onnxruntime-web' ? readFileSync(join(d, 'encoder.int8.onnx')) : join(d, 'encoder.int8.onnx');
    const session = await rt.ort.InferenceSession.create(model, opts);
    const e = new Encoder(rt, session, tok, labels, d);
    e.loadMs = performance.now() - t0;
    return e;
  }

  constructor(rt, session, tok, labels, dir) {
    Object.assign(this, { ort: rt.ort, runtime: rt.name, session, tok, labels, dir });
    this.T = labels.tagLabels;
    this.cache = new Map();
  }

  /** -> { tools: {tool: p}, intents: {intent: p}, topIntent, topTool, pNone, tagger(text, tool) -> {spans} } */
  async infer(text, env = {}) {
    const key = `${env.shell}|${env.os}|${text}`;
    if (this.cache.has(key)) return this.cache.get(key);
    const ctx = this.labels.context.replace('{shell}', env.shell || 'bash').replace('{os}', env.os || 'linux');
    const enc = this.tok.encodePair(text, ctx, this.labels.maxLen);
    const n = enc.ids.length;
    const T = this.ort.Tensor;
    const feeds = { input_ids: new T('int64', BigInt64Array.from(enc.ids, BigInt), [1, n]), attention_mask: new T('int64', new BigInt64Array(n).fill(1n), [1, n]) };
    const out = await this.session.run(feeds);
    const pt = softmax(Array.from(out.tool.data));
    const pi = softmax(Array.from(out.intent.data));
    const tools = Object.fromEntries(this.labels.tools.map((t, i) => [t, pt[i]]));
    const intents = Object.fromEntries(this.labels.intents.map((t, i) => [t, pi[i]]));
    const C = this.T.length;
    const tagLogits = [];
    for (let j = 0; j < enc.nA; j++) tagLogits.push(Array.from(out.tags.data.subarray((j + 1) * C, (j + 2) * C)));
    const res = {
      tools, intents,
      topTool: this.labels.tools[pt.indexOf(Math.max(...pt))],
      topIntent: this.labels.intents[pi.indexOf(Math.max(...pi))],
      pNone: tools.__none__ ?? 0,
      tagger: (t, tool) => ({ spans: decodeSpans(t, enc.tokens, tagLogits, this.T, tool) }),
    };
    if (this.cache.size > 256) this.cache.clear();
    this.cache.set(key, res);
    return res;
  }
}

/** Constrained Viterbi over sub-word BIO logits (tags allowed for the tool; I-X only after B-X/I-X), then spans
 *  widened to whole words (sub-word pieces of one word belong to one span). */
export function decodeSpans(text, toks, logits, L, tool) {
  const n = toks.length;
  if (!n) return [];
  const allowed = allowedTags(tool);
  const ok = L.map((l) => l === 'O' || allowed.has(l.slice(2)));
  const C = L.length;
  const sc = logits.map((z) => {
    let m = -Infinity;
    for (let c = 0; c < C; c++) if (ok[c] && z[c] > m) m = z[c];
    let s = 0;
    for (let c = 0; c < C; c++) if (ok[c]) s += Math.exp(z[c] - m);
    const lse = m + Math.log(s);
    return z.map((v, c) => (ok[c] ? v - lse : -Infinity));
  });
  const follow = (p, c) => !L[c].startsWith('I-') || (p >= 0 && L[p] !== 'O' && L[p].slice(2) === L[c].slice(2));
  const dp = sc.map(() => new Float64Array(C).fill(-Infinity));
  const bp = sc.map(() => new Int16Array(C).fill(-1));
  for (let c = 0; c < C; c++) if (follow(-1, c)) dp[0][c] = sc[0][c];
  for (let i = 1; i < n; i++) {
    for (let c = 0; c < C; c++) {
      if (sc[i][c] === -Infinity) continue;
      let best = -Infinity; let arg = -1;
      for (let p = 0; p < C; p++) if (dp[i - 1][p] > best && follow(p, c)) { best = dp[i - 1][p]; arg = p; }
      if (arg >= 0) { dp[i][c] = best + sc[i][c]; bp[i][c] = arg; }
    }
  }
  let last = 0;
  for (let c = 1; c < C; c++) if (dp[n - 1][c] > dp[n - 1][last]) last = c;
  const path = new Array(n);
  path[n - 1] = last;
  for (let i = n - 1; i > 0; i--) path[i - 1] = Math.max(0, bp[i][path[i]]);
  const spans = [];
  let cur = null;
  path.forEach((c, i) => {
    const l = L[c];
    const t = toks[i];
    if (l === 'O') { cur = null; return; }
    if (l.startsWith('B-') || !cur || cur.type !== l.slice(2)) { cur = { type: l.slice(2), start: t.start, end: t.end }; spans.push(cur); } else cur.end = t.end;
  });
  // widen to word boundaries, trim trailing punctuation, merge spans that now overlap
  const out = [];
  for (const s of spans) {
    let a = s.start; let b = s.end;
    while (a > 0 && !/\s/.test(text[a - 1])) a--;
    while (b < text.length && !/\s/.test(text[b])) b++;
    let w = text.slice(a, b);
    const lead = w.match(/^["'„“`(]+/)?.[0].length || 0;
    const trail = w.match(/["'”`),.;:!?]+$/)?.[0].length || 0;
    const quoted = lead > 0 && /["'„“`]/.test(w[0]);
    if (!quoted) { a += lead; b -= trail; } else {
      // quoted value: the whole quoted string (may contain spaces)
      const q = w[0] === '„' ? '”' : w[0];
      const close = text.indexOf(q === '“' ? '”' : q, a + 1);
      if (close > a) b = close + 1;
    }
    if (b <= a) continue;
    const prev = out[out.length - 1];
    if (prev && a < prev.end) { if (prev.type === s.type) prev.end = Math.max(prev.end, b); continue; }
    out.push({ type: s.type, start: a, end: b, quoted });
  }
  for (const s of out) s.text = text.slice(s.start, s.end);
  return out;
}
// SentencePiece-Unigram tokenizer (XLM-R style) for the hybrid encoder, no dependencies.
// Reproduces HF `tokenizers` for the pruned multilingual-e5 vocabulary: NFKC normalisation, whitespace split,
// '▁' prepended to every word, Viterbi over piece log-probabilities, unknown characters -> <unk> (consecutive
// unknowns fused), offsets into the original string.
const UNK_PENALTY = 10;

export class UnigramTokenizer {
  /** vocab: [[piece, score], ...] in id order; unkId; special ids */
  constructor({ vocab, unkId = 3, bos = 0, eos = 2, pad = 1 }) {
    this.pieces = new Map();
    this.maxLen = 1;
    let min = Infinity;
    vocab.forEach(([p, s], i) => {
      if (i <= 3) return; // specials are never produced by segmentation
      this.pieces.set(p, [i, s]);
      const n = [...p].length;
      if (n > this.maxLen) this.maxLen = n;
      if (s < min) min = s;
    });
    this.unkScore = min - UNK_PENALTY;
    Object.assign(this, { unkId, bos, eos, pad, size: vocab.length });
  }

  /** segment one word ('▁' + word) -> [{id, start, end}] with offsets in code points of the piece string */
  segment(word) {
    const chars = [...word];
    const n = chars.length;
    const best = new Float64Array(n + 1).fill(-Infinity);
    const from = new Int32Array(n + 1).fill(-1);
    const tokId = new Int32Array(n + 1).fill(-1);
    best[0] = 0;
    for (let i = 0; i < n; i++) {
      if (best[i] === -Infinity) continue;
      let s = '';
      let hit = false;
      for (let j = i; j < Math.min(n, i + this.maxLen); j++) {
        s += chars[j];
        const e = this.pieces.get(s);
        if (e) {
          if (j === i) hit = true;
          const v = best[i] + e[1];
          if (v > best[j + 1]) { best[j + 1] = v; from[j + 1] = i; tokId[j + 1] = e[0]; }
        }
      }
      if (!hit) { // single unknown character
        const v = best[i] + this.unkScore;
        if (v > best[i + 1]) { best[i + 1] = v; from[i + 1] = i; tokId[i + 1] = this.unkId; }
      }
    }
    const out = [];
    for (let k = n; k > 0; k = from[k]) out.push({ id: tokId[k], start: from[k], end: k });
    out.reverse();
    const fused = [];
    for (const t of out) {
      const last = fused[fused.length - 1];
      if (last && last.id === this.unkId && t.id === this.unkId) last.end = t.end; else fused.push(t);
    }
    return fused;
  }

  /** -> [{id, start, end}] offsets are UTF-16 indices into `text` (the '▁' of a word maps to the word start) */
  tokenize(text) {
    const out = [];
    const re = /\S+/gu;
    let m;
    while ((m = re.exec(text))) {
      const raw = m[0];
      const norm = raw.normalize('NFKC');
      const same = norm === raw;
      const cps = [...norm];
      // code point index -> UTF-16 offset in raw (only exact when NFKC did not change the word)
      const cu = [0];
      for (const c of cps) cu.push(cu[cu.length - 1] + c.length);
      for (const p of this.segment('▁' + norm.replace(/\s+/g, '▁'))) {
        const s = Math.max(0, p.start - 1);
        const e = Math.max(0, p.end - 1);
        out.push({ id: p.id, start: m.index + (same ? cu[s] : 0), end: m.index + (same ? cu[e] : raw.length) });
      }
    }
    return out;
  }

  /** XLM-R pair encoding: <s> A </s></s> B </s>; A truncated to fit maxLen. -> {ids, offsets (A only), nA} */
  encodePair(a, b, maxLen = 64) {
    const ta = this.tokenize(a);
    const tb = this.tokenize(b);
    const room = Math.max(1, maxLen - tb.length - 4);
    const A = ta.slice(0, room);
    const ids = [this.bos, ...A.map((t) => t.id), this.eos, this.eos, ...tb.map((t) => t.id), this.eos];
    return { ids, tokens: A, nA: A.length };
  }
}

exec
/bin/bash -lc 'cat scripts/real/prepare_real.js scripts/hybrid/export_data.js scripts/hybrid/train_encoder.py scripts/hybrid/train_lm_gpu.py' in /workspace/tellsh
 succeeded in 0ms:
#!/usr/bin/env node
// Real-usage data (PRIVATE, never committed): turn the real-command dataset into labelled request rows and a
// train / eval split held out by COMMAND GROUP. Writes only under build/real/ (gitignored):
//   build/real/rows.jsonl   {text, intent|null, lang, shell, os, group, split: train|eval, cmd, literal, src}
//   build/real/stats.json   aggregate counts only (safe to quote in docs)
//
// Input: $TELLSH_REAL_DATA or /workspace/tellsh-data/dataset.jsonl; one row per unique (redacted) command with
// 3 EN + 3 PL LLM-written request descriptions. Only `generic` + `verified` rows are used; the `tool` field is
// ignored (noisy). Labels:
//   1. the command matches one of the v0.4 developer-tool patterns below (deterministic, checked on the command)
//   2. else the dataset's `intent_or_null`, when it is a catalog intent
//   3. else null: a real shell task outside the catalog ("out-of-catalog"; eval only: should be rejected/composed)
// Command group: head + subcommands + sorted flags + number of operands, with every value masked, so
// `gh pr view 12 --repo a/b` and `gh pr view 40 --repo c/d` are one group. Per label, whole groups go to eval
// until >= 25% of that label's commands are held out (labels with one group stay in train).
//
// Usage: node scripts/real/prepare_real.js [--data <dataset.jsonl>] [--eval-frac 0.25]
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { BY_ID } from '../../src/catalog.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const SRC = arg('--data', process.env.TELLSH_REAL_DATA || '/workspace/tellsh-data/dataset.jsonl');
const EVAL_FRAC = +arg('--eval-frac', 0.25);
if (!existsSync(SRC)) { console.error(`prepare_real: no dataset at ${SRC}`); process.exit(1); }

// v0.4 intents: label = the command itself (sudo / npx / env prefixes stripped)
const NEW = [
  ['wrangler_deploy', /^wrangler (deploy|publish)\b/],
  ['wrangler_dev', /^wrangler dev\b/],
  ['wrangler_tail', /^wrangler tail\b(?!.*--help)/],
  ['wrangler_secret_put', /^wrangler secret put\b/],
  ['wrangler_login', /^wrangler login\b/],
  ['wrangler_whoami', /^wrangler whoami\b/],
  ['gh_auth_status', /^gh auth status\b/],
  ['gh_auth_login', /^gh auth login\b/],
  ['gh_pr_list', /^gh pr list\b/],
  ['gh_pr_view', /^gh pr view\b/],
  ['gh_pr_create', /^gh pr create\b/],
  ['gh_pr_checks', /^gh pr checks\b/],
  ['gh_pr_merge', /^gh pr merge\b/],
  ['gh_run_list', /^gh run list\b/],
  ['gh_run_view', /^gh run view\b/],
  ['npm_install_global', /^npm (i|install)\b.*\s(-g|--global)\b/],
  ['npm_install', /^npm (i|install|ci)\b(?!.*\s(-g|--global)\b)/],
  ['npm_run_script', /^npm(?: --prefix \S+)? (?:run(?:-script)? [\w:.-]+|test|start|t)(?:\s|$)/],
  ['pip_install', /^(?:pip3?|python3?(?:\.\d+)? -m pip) install\b(?!.*\s-(?:r|e)\b)/],
  ['activate_venv', /^(?:source|\.) \S*\/bin\/activate(?:\.fish)?\s*$|\\Scripts\\activate(?:\.bat|\.ps1)?\s*$/i],
  ['ssh_port_forward', /^ssh\b.*\s-\w*L\s?\d+:/],
  ['print_line_range', /^(?:nl -ba \S+ \| )?sed -n ['"]?\d+,\d+p['"]?(?: \S+)?$/],
  ['tool_version', /^[\w.-]+ (?:--version|-v|-V|version)$/],
  ['cli_help', /^[\w.-]+(?: [a-z][\w-]*){0,2} (?:--help|-h|help)$/],
];
const COMPOUND = /^(sleep|cd|for|while|if|echo|printf|bash|sh|zsh|pwd|export|time|timeout|-n|until|then|do)$/;
const strip = (c) => c.trim().replace(/^(?:sudo |npx (?:-y )?|env \w+=\S+ )+/, '');
function newIntentOf(cmd) {
  const c = strip(cmd);
  for (const [id, re] of NEW) if (re.test(c)) return id;
  return null;
}

// value-masked command skeleton (see header)
function group(cmd) {
  const w = strip(cmd).split(/\s+/);
  const head = [w[0]];
  let i = 1;
  while (i < w.length && head.length < 3 && /^[a-z][a-z-]*$/.test(w[i])) head.push(w[i++]);
  const flags = new Set();
  let ops = 0;
  for (; i < w.length; i++) {
    if (/^-{1,2}[A-Za-z][\w-]*/.test(w[i])) flags.add(w[i].replace(/=.*/, ''));
    else if (!/^[|;&]/.test(w[i])) ops++;
  }
  return `${head.join(' ')} ${[...flags].sort().join(' ')} #${Math.min(ops, 3)}`;
}

// redaction placeholders -> plausible values (same value in the command and its descriptions)
const USERS = ['alex', 'kasia', 'dev', 'mike', 'ola', 'jan', 'sam', 'deploy'];
const h = (s) => createHash('sha256').update(s).digest();
function fill(s, seed) {
  return s.replace(/<USER>/g, USERS[seed[0] % USERS.length]).replace(/<EMAIL>/g, 'someone@example.com')
    .replace(/<HEX>/g, seed.toString('hex').slice(0, 12)).replace(/<(PASSWORD|SECRET)>/g, 'xxxxxx');
}

const rows = readFileSync(SRC, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const st = { commands: 0, skippedNotGeneric: 0, skippedUnverified: 0, byLabelSource: { pattern: 0, dataset: 0, outOfCatalog: 0 }, relabelled: 0, droppedCompound: 0 };
const cmds = [];
for (const r of rows) {
  if (!r.generic) { st.skippedNotGeneric++; continue; }
  if (!r.verified || !r.descriptions_en?.length) { st.skippedUnverified++; continue; }
  const seed = h(r.cmd_redacted);
  const cmd = fill(r.cmd_redacted, seed);
  let intent = newIntentOf(cmd);
  if (intent) { st.byLabelSource.pattern++; if (r.intent_or_null && r.intent_or_null !== intent) st.relabelled++; }
  else if (r.intent_or_null && BY_ID[r.intent_or_null]) {
    // `sleep 30; cp …`, `cd x && cat …`, `for …`: a compound command is not one catalog intent (dataset label dropped)
    const head = strip(cmd).split(/[\s;]+/)[0];
    if (COMPOUND.test(head) && !(head === 'echo' && ['env_var_get', 'show_path'].includes(r.intent_or_null))) { st.droppedCompound++; continue; }
    intent = r.intent_or_null; st.byLabelSource.dataset++;
  }
  else { intent = null; st.byLabelSource.outOfCatalog++; }
  const shell = r.shell === 'powershell' ? 'powershell' : r.shell || 'bash';
  const os = r.os === 'windows' ? 'win32' : r.os || 'linux';
  cmds.push({ cmd, intent, shell, os, group: group(cmd), seed, src: r.source_type,
    texts: [...r.descriptions_en.map((t) => [t, 'en']), ...r.descriptions_pl.map((t) => [t, 'pl'])] });
  st.commands++;
}

// group-wise split, per label (null = out-of-catalog counts as one label)
const byLabel = new Map();
for (const c of cmds) {
  const k = c.intent || '__ooc__';
  if (!byLabel.has(k)) byLabel.set(k, new Map());
  const g = byLabel.get(k);
  g.set(c.group, (g.get(c.group) || 0) + 1);
}
const evalGroups = new Set();
for (const [label, groups] of byLabel) {
  if (groups.size < 2) continue;
  const total = [...groups.values()].reduce((a, b) => a + b, 0);
  const order = [...groups.keys()].sort((a, b) => h(label + a).compare(h(label + b)));
  let n = 0;
  for (const g of order) {
    if (n >= EVAL_FRAC * total) break;
    if (n + groups.get(g) > 0.5 * total) continue; // never hold out more than half of a label
    evalGroups.add(label + '\u0000' + g);
    n += groups.get(g);
  }
}

const out = [];
const norm = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
for (const c of cmds) {
  const split = evalGroups.has((c.intent || '__ooc__') + '\u0000' + c.group) ? 'eval' : 'train';
  for (const [t, lang] of c.texts) {
    if (!t || t.length > 300) continue;
    const text = fill(t, c.seed);
    out.push({ text, intent: c.intent, lang, shell: c.shell, os: c.os, group: c.group, split, cmd: c.cmd,
      literal: norm(text) === norm(c.cmd), src: c.src });
  }
}
// a text that occurs in both splits (short generic descriptions) is held out: dropped from train
const evalTexts = new Set(out.filter((r) => r.split === 'eval').map((r) => norm(r.text)));
const final = out.filter((r) => r.split === 'eval' || !evalTexts.has(norm(r.text)));
st.droppedTrainTextInEval = out.length - final.length;

const cnt = (f) => final.filter(f).length;
Object.assign(st, {
  rows: final.length,
  train: { rows: cnt((r) => r.split === 'train' && r.intent), oocRows: cnt((r) => r.split === 'train' && !r.intent) },
  eval: { rows: cnt((r) => r.split === 'eval' && r.intent), oocRows: cnt((r) => r.split === 'eval' && !r.intent),
    en: cnt((r) => r.split === 'eval' && r.intent && r.lang === 'en'), pl: cnt((r) => r.split === 'eval' && r.intent && r.lang === 'pl'),
    literal: cnt((r) => r.split === 'eval' && r.intent && r.literal),
    newIntents: cnt((r) => r.split === 'eval' && r.intent && NEW.some(([id]) => id === r.intent)),
    byShell: Object.fromEntries(['bash', 'zsh', 'powershell'].map((s) => [s, cnt((r) => r.split === 'eval' && r.intent && r.shell === s)])) },
  labels: { train: new Set(final.filter((r) => r.split === 'train' && r.intent).map((r) => r.intent)).size,
    eval: new Set(final.filter((r) => r.split === 'eval' && r.intent).map((r) => r.intent)).size },
  groups: { total: new Set(cmds.map((c) => c.group)).size, eval: evalGroups.size },
  perNewIntent: Object.fromEntries(NEW.map(([id]) => [id, { train: cnt((r) => r.intent === id && r.split === 'train'), eval: cnt((r) => r.intent === id && r.split === 'eval') }])),
});
mkdirSync(join(ROOT, 'build', 'real'), { recursive: true });
writeFileSync(join(ROOT, 'build', 'real', 'rows.jsonl'), final.map((r) => JSON.stringify(r)).join('\n') + '\n');
writeFileSync(join(ROOT, 'build', 'real', 'stats.json'), JSON.stringify(st, null, 1));
console.log(JSON.stringify({ commands: st.commands, rows: st.rows, train: st.train, eval: st.eval, labels: st.labels, groups: st.groups }));
#!/usr/bin/env node
// Export raw-text training data for the hybrid neural models (B: encoder, C: LM reranker).
// Mirrors scripts/gen_data.js (same sources, same held-out filter, same teacher decisions, same silver spans and
// relexicalisation) but writes text + char-offset spans instead of hashed features.
//
//   build/hybrid/train.jsonl  {text, tool, intent, lang, shell, os, spans:[[type,start,end]], gid, src, split}
//     split = 'dev' for ~10% of the base sentence groups (all copies of a sentence stay on one side); dev rows are
//     never used to fit B/C and serve to calibrate the hybrid thresholds.
//   build/hybrid/meta.json    {tools, intents, intentTool, tagLabels}
//   build/hybrid/dev_texts.json  every normalized dev text (train rows with one of these texts are dropped)
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { INTENTS } from '../../src/catalog.js';
import { FAMILIES, FAMILY_OF, NONE, TAG_TYPES } from '../../src/tools.js';
import { normalize, fnv1a } from '../../src/features.js';
import { silverSpans, relex, mulberry32 } from '../lib/silver.js';
import { exclusionIndex } from '../lib/heldout.js';
import { readReal, realTrain } from '../real/real_rows.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const OUT = join(ROOT, 'build', 'hybrid');
const rng = mulberry32(29);
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);

const SHELL_P = [['bash', 0.35], ['zsh', 0.25], ['sh', 0.07], ['powershell', 0.18], ['fish', 0.08], ['cmd', 0.07]];
function sampleEnv() {
  let s = 'bash';
  let r = rng();
  for (const [k, p] of SHELL_P) { if ((r -= p) <= 0) { s = k; break; } }
  let os;
  if (s === 'cmd') os = 'win32';
  else if (s === 'powershell') os = rng() < 0.7 ? 'win32' : rng() < 0.5 ? 'linux' : 'darwin';
  else if (s === 'zsh') os = rng() < 0.6 ? 'darwin' : 'linux';
  else os = rng() < 0.7 ? 'linux' : 'darwin';
  return { shell: s, os };
}
function typo(text) {
  const chars = [...text];
  const idxs = chars.map((c, i) => (/\p{L}/u.test(c) ? i : -1)).filter((i) => i >= 0);
  if (idxs.length < 4) return text;
  const i = idxs[1 + Math.floor(rng() * (idxs.length - 2))];
  const op = rng();
  if (op < 0.4) chars.splice(i, 1);
  else if (op < 0.8 && /\p{L}/u.test(chars[i + 1] || '')) [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
  else chars.splice(i, 0, chars[i]);
  return chars.join('');
}
// typo() shifts offsets, so only the clean / relexicalised copies carry spans
export const isDev = (text) => fnv1a('dev:' + normalize(text)) % 10 === 0;

/**
 * The row sink: every emitted row is checked against the held-out index, not only the originals. A typo or
 * relexicalised copy can be exactly a held-out text ("kill all node processes", "koniec pliku /var/log/syslog").
 */
export function heldOutFilter(heldOut) {
  const out = { rows: [], dropped: 0 };
  out.push = (o) => { if (heldOut.has(o.text)) out.dropped++; else out.rows.push(o); };
  return out;
}

function main() {
  mkdirSync(OUT, { recursive: true });
  const ids = new Set(INTENTS.map((i) => i.id));
  // the same held-out index as gen_data.js (eval / blind sets, near-duplicates, eval-only values, real-usage eval split)
  const real = process.argv.includes('--no-real') ? [] : readReal(ROOT);
  const excl = exclusionIndex(ROOT);
  const heldOut = { has: (n) => excl.has(n) };
  const intentRows = [...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'train.jsonl'))].map((r) => ({ ...r, src: 'intents' }));
  const shellRows = readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell' }));
  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl')).filter((d) => d.text && d.field !== 'risk');
  const decide = new Map(decisions.map((d) => [normalize(d.text), d]));
  const seen = new Set();
  const base = [];
  const realRows = realTrain(real, ids);
  for (const r0 of [...intentRows, ...shellRows, ...realRows]) {
    if (!ids.has(r0.intent)) throw new Error(`unknown intent ${r0.intent}`);
    const n = normalize(r0.text);
    if (heldOut.has(r0.text)) continue;
    const d = decide.get(n);
    if (d?.action === 'drop') continue;
    const r = d?.action === 'relabel' && d.intent ? { ...r0, intent: d.intent } : r0;
    const key = n + '|' + r.intent + '|' + (r.shell || '');
    if (seen.has(key)) continue;
    seen.add(key);
    base.push(r);
  }
  const out = heldOutFilter(heldOut);
  const { rows, push } = out;
  let gid = 0;
  for (const r of base) {
    const g = gid++;
    const tool = FAMILY_OF[r.intent];
    const split = isDev(r.text) ? 'dev' : 'train';
    const env = () => (r.shell ? { shell: r.shell, os: r.os || 'linux' } : sampleEnv());
    const { spans } = silverSpans(r.text, r.intent);
    const sp = (s) => s.map((x) => [x.type, x.start, x.end]);
    push({ text: r.text, tool, intent: r.intent, lang: r.lang, ...env(), spans: sp(spans), gid: g, src: r.src, split, kind: 'orig' });
    push({ text: typo(r.text), tool, intent: r.intent, lang: r.lang, ...env(), spans: null, gid: g, src: r.src, split, kind: 'typo' });
    for (let k = 0; k < 2; k++) {
      const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'train' });
      if (rx.text !== r.text) push({ text: rx.text, tool, intent: r.intent, lang: r.lang, ...env(), spans: sp(rx.spans), gid: g, src: r.src, split, kind: 'relex' });
    }
  }
  // tldr descriptions: tool label only (intent ''), capped per family/lang as in gen_data
  const tldr = readJsonl(join(ROOT, 'data', 'tldr', 'tools.jsonl'));
  const cap = {};
  for (const r of tldr.sort(() => rng() - 0.5)) {
    if (!FAMILIES[r.tool] || !r.text || r.text.length < 8 || heldOut.has(r.text)) continue;
    const key = r.tool + r.lang;
    if ((cap[key] = (cap[key] || 0) + 1) > (r.lang === 'pl' ? 60 : 80)) continue;
    const win = /^windows\//.test(r.page || '');
    push({ text: r.text, tool: r.tool, intent: '', lang: r.lang, ...(win ? { shell: 'powershell', os: 'win32' } : sampleEnv()), spans: null, gid: gid++, src: 'tldr', split: isDev(r.text) ? 'dev' : 'train', kind: 'orig' });
  }
  for (const r of readJsonl(join(ROOT, 'data', 'ood.jsonl'))) {
    if (heldOut.has(r.text)) continue;
    const g = gid++;
    const split = isDev(r.text) ? 'dev' : 'train';
    push({ text: r.text, tool: NONE, intent: '', lang: r.lang, ...sampleEnv(), spans: [], gid: g, src: 'ood', split, kind: 'orig' });
    push({ text: typo(r.text), tool: NONE, intent: '', lang: r.lang, ...sampleEnv(), spans: [], gid: g, src: 'ood', split, kind: 'typo' });
  }
  // a typo / relexicalised copy (or another source's sentence) on the train side can be exactly a dev text
  // ("policz pliki w /var/log"): the dev split must stay unseen, so such train rows are dropped
  const devTexts = new Set(rows.filter((r) => r.split === 'dev').map((r) => normalize(r.text)));
  const before = rows.length;
  rows.splice(0, rows.length, ...rows.filter((r) => r.split === 'dev' || !devTexts.has(normalize(r.text))));
  writeFileSync(join(OUT, 'train.jsonl'), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
  // the complete dev-text index (every emitted dev row, not only texts whose own hash is dev): train_a_dev.sh
  // excludes it from A_dev's training data
  writeFileSync(join(OUT, 'dev_texts.json'), JSON.stringify([...devTexts].sort()));
  const meta = {
    tools: [...Object.keys(FAMILIES), NONE],
    intents: INTENTS.map((i) => i.id),
    intentTool: Object.fromEntries(INTENTS.map((i) => [i.id, FAMILY_OF[i.id]])),
    descriptions: Object.fromEntries(INTENTS.map((i) => [i.id, i.description])),
    tagLabels: ['O', ...TAG_TYPES.flatMap((t) => [`B-${t}`, `I-${t}`])],
  };
  writeFileSync(join(OUT, 'meta.json'), JSON.stringify(meta, null, 1));
  const c = (f) => rows.filter(f).length;
  console.log(`export_data: ${out.dropped} augmented rows dropped (held-out texts), ${before - rows.length} train rows dropped (dev texts)`);
  console.log(`export_data: ${base.length} base (${base.filter((r) => r.src === 'real').length} real), ${rows.length} rows (train ${c((r) => r.split === 'train')}, dev ${c((r) => r.split === 'dev')}), tldr ${c((r) => r.src === 'tldr')}, ood ${c((r) => r.src === 'ood')}`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
#!/usr/bin/env python3
"""(B) Fine-tune the vocab-pruned multilingual-e5-small as a joint tool + intent classifier with a BIO slot-tagger head.

Input:  build/hybrid/train.jsonl, build/hybrid/meta.json (node scripts/hybrid/export_data.js)
        build/hybrid/e5-pruned/ (python3 scripts/hybrid/prune_vocab.py)
Model:  <s> request </s></s> "bash linux" </s>  ->  mean-pooled encoder -> tool head (55) + intent head (149)
                                                   per-token -> BIO head (37 labels; only request tokens are labelled)
Rows with intent '' (tldr descriptions, OOD) train the tool head only; typo copies carry no spans (tag loss masked).
Only split=='train' rows are used; split=='dev' is kept for threshold calibration.
Resumable: a checkpoint (model + optimizer + step) is written every --ckpt-every steps and at each epoch end.

Usage: python3 scripts/hybrid/train_encoder.py [--layers 6] [--epochs 2.5] [--threads 2] [--out build/hybrid/enc]
"""
import argparse, json, math, os, random, time
import torch
import torch.nn as nn
from transformers import AutoModel, AutoTokenizer

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class Joint(nn.Module):
    def __init__(self, base, n_tool, n_intent, n_tag, layers=None):
        super().__init__()
        self.enc = AutoModel.from_pretrained(base) if isinstance(base, str) else base
        if layers and layers < len(self.enc.encoder.layer):  # keep the bottom `layers` transformer blocks
            self.enc.encoder.layer = self.enc.encoder.layer[:layers]
            self.enc.config.num_hidden_layers = layers
        h = self.enc.config.hidden_size
        self.drop = nn.Dropout(0.1)
        self.tool = nn.Linear(h, n_tool)
        self.intent = nn.Linear(h, n_intent)
        self.tag = nn.Linear(h, n_tag)

    def forward(self, input_ids, attention_mask):
        hs = self.enc(input_ids=input_ids, attention_mask=attention_mask).last_hidden_state
        m = attention_mask.unsqueeze(-1).to(hs.dtype)
        pooled = (hs * m).sum(1) / m.sum(1).clamp(min=1)
        pooled = self.drop(pooled)
        return self.tool(pooled), self.intent(pooled), self.tag(self.drop(hs))


def ctx_str(r):
    return f"{r.get('shell') or 'bash'} {r.get('os') or 'linux'}"


def encode(tok, rows, meta, max_len=64):
    tl = {t: i for i, t in enumerate(meta['tools'])}
    il = {t: i for i, t in enumerate(meta['intents'])}
    gl = {t: i for i, t in enumerate(meta['tagLabels'])}
    enc = tok([r['text'] for r in rows], [ctx_str(r) for r in rows], truncation='only_first', max_length=max_len,
              return_offsets_mapping=True)
    out = []
    for k, r in enumerate(rows):
        ids = enc['input_ids'][k]
        offs = enc['offset_mapping'][k]
        seq = enc.sequence_ids(k)
        tags = [-100] * len(ids)
        if r.get('spans') is not None:
            prev_span = None
            for j, (s, e) in enumerate(offs):
                if seq[j] != 0 or e <= s:
                    continue
                lab = 'O'
                cur = None
                for si, (typ, a, b) in enumerate(r['spans']):
                    # XLM-R offsets may include the leading space of a word piece
                    ss = s + (1 if r['text'][s:s + 1] == ' ' else 0)
                    if min(e, b) - max(ss, a) > 0:
                        cur = si
                        lab = ('I-' if prev_span == si else 'B-') + typ
                        break
                tags[j] = gl[lab]
                prev_span = cur
        out.append({'ids': ids, 'tool': tl[r['tool']], 'intent': il.get(r['intent'], -100) if r['intent'] else -100, 'tags': tags})
    return out


def collate(batch, pad_id):
    L = max(len(b['ids']) for b in batch)
    ids = torch.full((len(batch), L), pad_id, dtype=torch.long)
    att = torch.zeros((len(batch), L), dtype=torch.long)
    tags = torch.full((len(batch), L), -100, dtype=torch.long)
    for i, b in enumerate(batch):
        n = len(b['ids'])
        ids[i, :n] = torch.tensor(b['ids'])
        att[i, :n] = 1
        tags[i, :n] = torch.tensor(b['tags'])
    return ids, att, torch.tensor([b['tool'] for b in batch]), torch.tensor([b['intent'] for b in batch]), tags


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', default=os.path.join(ROOT, 'build/hybrid/e5-pruned'))
    ap.add_argument('--out', default=os.path.join(ROOT, 'build/hybrid/enc'))
    ap.add_argument('--epochs', type=float, default=4)
    ap.add_argument('--bs', type=int, default=32)
    ap.add_argument('--lr', type=float, default=8e-5)
    ap.add_argument('--threads', type=int, default=4)
    ap.add_argument('--ckpt-every', type=int, default=500)
    ap.add_argument('--seed', type=int, default=17)
    ap.add_argument('--layers', type=int, default=6, help='truncate the encoder to its bottom N layers (12 = full)')
    ap.add_argument('--all', action='store_true', help='also train on the dev split (final model; no calibration data left)')
    a = ap.parse_args()
    torch.set_num_threads(a.threads)
    random.seed(a.seed)
    torch.manual_seed(a.seed)
    meta = json.load(open(os.path.join(ROOT, 'build/hybrid/meta.json')))
    rows = [json.loads(l) for l in open(os.path.join(ROOT, 'build/hybrid/train.jsonl'), encoding='utf-8')]
    rows = [r for r in rows if a.all or r['split'] == 'train']
    tok = AutoTokenizer.from_pretrained(a.base)
    data = encode(tok, rows, meta)
    model = Joint(a.base, len(meta['tools']), len(meta['intents']), len(meta['tagLabels']), a.layers)
    head_params = [p for n, p in model.named_parameters() if not n.startswith('enc.')]
    enc_params = [p for n, p in model.named_parameters() if n.startswith('enc.')]
    opt = torch.optim.AdamW([{'params': enc_params, 'lr': a.lr}, {'params': head_params, 'lr': a.lr * 10}], weight_decay=0.01)
    steps_per_epoch = math.ceil(len(data) / a.bs)
    total = int(steps_per_epoch * a.epochs)
    warm = int(0.06 * total)
    sched = torch.optim.lr_scheduler.LambdaLR(opt, lambda s: min(1, (s + 1) / max(1, warm)) * max(0.0, (total - s) / max(1, total - warm)))
    os.makedirs(a.out, exist_ok=True)
    ck = os.path.join(a.out, 'ckpt.pt')
    step = 0
    if os.path.exists(ck):
        st = torch.load(ck, map_location='cpu', weights_only=False)
        model.load_state_dict(st['model']); opt.load_state_dict(st['opt']); sched.load_state_dict(st['sched']); step = st['step']
        print(f'resumed at step {step}/{total}', flush=True)
    ce = nn.CrossEntropyLoss(ignore_index=-100)
    pad = tok.pad_token_id
    t0 = time.time()
    model.train()
    while step < total:
        ep = step // steps_per_epoch
        order = list(range(len(data)))
        random.Random(a.seed + ep).shuffle(order)
        # length-bucketed batches for speed
        chunks = [order[i:i + a.bs * 50] for i in range(0, len(order), a.bs * 50)]
        batches = []
        for c in chunks:
            c = sorted(c, key=lambda i: len(data[i]['ids']))
            batches += [c[i:i + a.bs] for i in range(0, len(c), a.bs)]
        random.Random(a.seed + 1000 + ep).shuffle(batches)
        for bi in range(step - ep * steps_per_epoch, len(batches)):
            if step >= total:
                break
            ids, att, yt, yi, ytag = collate([data[i] for i in batches[bi]], pad)
            lt, li, lg = model(ids, att)
            loss = ce(lt, yt) + (ce(li, yi) if (yi >= 0).any() else 0) + 0.5 * (ce(lg.reshape(-1, lg.shape[-1]), ytag.reshape(-1)) if (ytag >= 0).any() else 0)
            opt.zero_grad()
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
            opt.step(); sched.step(); step += 1
            if step % 50 == 0:
                el = time.time() - t0
                print(f'step {step}/{total} ep {ep} loss {loss.item():.4f} {el:.0f}s', flush=True)
            if step % a.ckpt_every == 0 or step == total or bi == len(batches) - 1:
                torch.save({'model': model.state_dict(), 'opt': opt.state_dict(), 'sched': sched.state_dict(), 'step': step}, ck + '.tmp')
                os.replace(ck + '.tmp', ck)
    model.eval()
    torch.save(model.state_dict(), os.path.join(a.out, 'final.pt'))
    tok.save_pretrained(a.out)
    json.dump({'base': a.base, 'layers': a.layers, 'epochs': a.epochs, 'rows': len(data), 'all': a.all, 'meta': meta}, open(os.path.join(a.out, 'train_info.json'), 'w'))
    print('done', flush=True)


if __name__ == '__main__':
    main()
#!/usr/bin/env python3
"""(C) GPU fine-tuning of the option-letter reranker (ready to run; CPU training on the dev box was too slow).

Trains Qwen2.5-0.5B-Instruct (default; any HF causal LM works) to answer the A..E option prompt of
scripts/hybrid/lm_rerank.py: cross-entropy on the 5 letter logits at the last position only (one forward pass,
exactly what runs at inference).  LoRA (r=16, all linear layers) in bf16, then merged.

Inputs (create on the dev box, copy to the GPU machine together with this repo):
  node scripts/hybrid/export_data.js && node scripts/hybrid/dump_cascade.js --tag=ship
  -> build/hybrid/meta.json, build/hybrid/cands_ship.jsonl   (rows with set=='train' are used; 'dev' for validation)

Run (single GPU, ~15-30 min on an A10/L4 for 3 epochs of ~15.7k rows):
  pip install torch transformers peft accelerate
  python3 scripts/hybrid/train_lm_gpu.py --model Qwen/Qwen2.5-0.5B-Instruct --epochs 3 --out build/hybrid/lm-qwen05
Then on the dev box:
  python3 scripts/hybrid/lm_rerank.py score --model build/hybrid/lm-qwen05/final --plain --cands build/hybrid/cands_ship.jsonl ...
  python3 /path/to/llama.cpp/convert_hf_to_gguf.py build/hybrid/lm-qwen05/final --outtype q8_0   (CPU runtime)
"""
import argparse, json, math, os, random, sys, time
import torch

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lm_rerank import Prompter, candidate_list, read_cands, ROOT  # noqa: E402


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--model', default='Qwen/Qwen2.5-0.5B-Instruct')
    ap.add_argument('--cands', default=os.path.join(ROOT, 'build/hybrid/cands_ship.jsonl'))
    ap.add_argument('--out', default=os.path.join(ROOT, 'build/hybrid/lm-qwen05'))
    ap.add_argument('--epochs', type=float, default=3)
    ap.add_argument('--bs', type=int, default=32)
    ap.add_argument('--lr', type=float, default=2e-4)
    ap.add_argument('--full', action='store_true', help='full fine-tune instead of LoRA')
    a = ap.parse_args()
    from transformers import AutoModelForCausalLM, AutoTokenizer
    dev = 'cuda' if torch.cuda.is_available() else 'cpu'
    torch.manual_seed(0)
    tok = AutoTokenizer.from_pretrained(a.model)
    tok.padding_side = 'left'
    if tok.pad_token is None:
        tok.pad_token = tok.eos_token
    m = AutoModelForCausalLM.from_pretrained(a.model, dtype=torch.bfloat16).to(dev)
    if not a.full:
        from peft import LoraConfig, get_peft_model
        m = get_peft_model(m, LoraConfig(r=16, lora_alpha=32, lora_dropout=0.05,
                                         target_modules=['q_proj', 'k_proj', 'v_proj', 'o_proj', 'gate_proj', 'up_proj', 'down_proj']))
        m.print_trainable_parameters()
    P = Prompter(tok, chat=False)
    lid = torch.tensor(P.letter_ids, device=dev)
    train = [r for r in read_cands(a.cands, {'train'}) if r['intent']]
    val = [r for r in read_cands(a.cands, {'dev'}) if r['intent']][:1000]
    if not train:
        raise SystemExit('no labeled train rows in ' + a.cands)
    steps = int(math.ceil(len(train) / a.bs) * a.epochs)
    params = [p for p in m.parameters() if p.requires_grad]
    opt = torch.optim.AdamW(params, lr=a.lr, weight_decay=0.0)
    sched = torch.optim.lr_scheduler.LambdaLR(opt, lambda s: min(1, (s + 1) / 50) * max(0.0, 1 - s / steps))

    def batch_logits(rows, rng, train_mode):
        lists = [candidate_list(r, rng, train=True) for r in rows]
        enc = tok([P(r['text'], r['shell'], r['os'], c) for r, c in zip(rows, lists)], return_tensors='pt', padding=True,
                  add_special_tokens=False).to(dev)
        lg = m(**enc, logits_to_keep=1).logits[:, -1, :][:, lid].float()
        y = torch.tensor([c.index(r['intent']) for r, c in zip(rows, lists)], device=dev)
        return lg, y

    @torch.no_grad()
    def evaluate():
        m.eval()
        ok = 0
        rng = random.Random(5)
        for i in range(0, len(val), a.bs):
            lg, y = batch_logits(val[i:i + a.bs], rng, False)
            ok += (lg.argmax(-1) == y).sum().item()
        m.train()
        return ok / max(1, len(val))

    print('zero-shot choice accuracy on dev:', evaluate(), flush=True)
    rng = random.Random(11)
    step = 0
    t0 = time.time()
    m.train()
    while step < steps:
        random.Random(step).shuffle(train)
        # the last, partial batch too: with fewer rows than --bs a full-batch-only loop never advances `step`
        for i in range(0, len(train), a.bs):
            lg, y = batch_logits(train[i:i + a.bs], rng, True)
            loss = torch.nn.functional.cross_entropy(lg, y)
            opt.zero_grad(); loss.backward(); torch.nn.utils.clip_grad_norm_(params, 1.0); opt.step(); sched.step(); step += 1
            if step % 50 == 0:
                print(f'step {step}/{steps} loss {loss.item():.4f} {time.time() - t0:.0f}s', flush=True)
            if step % 500 == 0:
                print('dev choice accuracy:', evaluate(), flush=True)
            if step >= steps:
                break
    print('final dev choice accuracy:', evaluate(), flush=True)
    if not a.full:
        m = m.merge_and_unload()
    os.makedirs(a.out, exist_ok=True)
    m.save_pretrained(os.path.join(a.out, 'final'))
    tok.save_pretrained(os.path.join(a.out, 'final'))


if __name__ == '__main__':
    main()

exec
/bin/bash -lc "sed -n '1,260p' src/cli.js; sed -n '1,230p' src/pipeline.js" in /workspace/tellsh
 succeeded in 0ms:
// tellsh CLI: natural language (PL/EN) -> shell command, confirm, run.
import { spawn, spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline';
import { readFileSync } from 'node:fs';
import { constants as osConstants } from 'node:os';
import { getModel } from './model.js';
import { suggest as pipelineSuggest } from './pipeline.js';
import { checkDanger, maxRisk } from './danger.js';
import { detectEnv, normShell, normOs } from './env.js';
import { loadHistory } from './history.js';
import { joinArgs } from './shellwords.js';
import { suggestLazy } from './rerank/hybrid.js';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const HELP = `tellsh ${pkg.version} — natural language (Polish/English) -> shell command, fully offline

Usage: tellsh [options] <request...>

  tellsh pokaż 10 największych plików w ~/Pobrane
  tellsh what is listening on port 8080
  tellsh --history delete it
  tellsh -n kill node

Options:
  -n, --dry-run     print the command only, never run it
  -y, --yes         run without prompting (only risk=safe commands straight from the catalog;
                    never history-resolved, composed, incomplete or medium/high-risk ones)
  -e, --explain     show tool/intent scores, slots and their source
      --json        machine-readable output (implies --dry-run)
      --shell <s>   target shell: bash|zsh|sh|powershell|fish|cmd (default: detected)
      --os <o>      target OS: linux|darwin|win32 (default: this machine); --platform is an alias
      --history[=FILE]  use the previous shell command to resolve "it", "same for /var", ...
                    (read in memory only, never stored or logged; also TELLSH_HISTORY=1)
      --no-compose  never fall back to the experimental flag composer
      --compose     force the experimental composer
      --hybrid      when unsure, re-rank with the optional neural model (needs onnxruntime-node and the
                    tellsh-model-enc bundle; see HYBRID.md; also TELLSH_HYBRID=1, or =safe to never
                    turn a rejection into an answer)
      --top <k>     show k candidate intents (default 3)
      --threshold <p>  override confidence threshold
  -v, --version     print version
  -h, --help        this help

At the prompt: [Enter] run · e edit · n abort. High-risk and composed (experimental) commands
require typing "yes". Without a TTY (piped), tellsh only prints the command unless --yes is given.`;

const C = process.stdout.isTTY && !process.env.NO_COLOR
  ? { dim: (s) => `\x1b[2m${s}\x1b[0m`, bold: (s) => `\x1b[1m${s}\x1b[0m`, red: (s) => `\x1b[31m${s}\x1b[0m`,
      yellow: (s) => `\x1b[33m${s}\x1b[0m`, green: (s) => `\x1b[32m${s}\x1b[0m`, cyan: (s) => `\x1b[36m${s}\x1b[0m` }
  : { dim: (s) => s, bold: (s) => s, red: (s) => s, yellow: (s) => s, green: (s) => s, cyan: (s) => s };
const riskColor = (r) => (r === 'high' ? C.red : r === 'medium' ? C.yellow : C.green);

export function parseArgs(argv) {
  const o = { dryRun: false, yes: false, explain: false, json: false, top: 3, words: [], threshold: undefined, shell: undefined, os: undefined,
    history: process.env.TELLSH_HISTORY === '1', historyFile: undefined, compose: 'auto', hybrid: ['1', 'safe'].includes(process.env.TELLSH_HYBRID) };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--') { o.words.push(...argv.slice(i + 1)); break; }
    else if (a === '-n' || a === '--dry-run') o.dryRun = true;
    else if (a === '-y' || a === '--yes') o.yes = true;
    else if (a === '-e' || a === '--explain') o.explain = true;
    else if (a === '--json') { o.json = true; o.dryRun = true; }
    else if (a === '--top') o.top = Math.max(1, parseInt(argv[++i], 10) || 3);
    else if (a.startsWith('--top=')) o.top = Math.max(1, parseInt(a.slice(6), 10) || 3);
    else if (a === '--threshold' || a.startsWith('--threshold=')) {
      const v = a === '--threshold' ? argv[++i] : a.slice(12);
      o.threshold = /^\s*(?:\d+(?:\.\d*)?|\.\d+)\s*$/.test(v ?? '') ? Number(v) : NaN;
      if (!(o.threshold >= 0 && o.threshold <= 1)) o.badThreshold = v ?? '';
    }
    else if (a === '--platform' || a === '--os') o.os = argv[++i];
    else if (a.startsWith('--os=') || a.startsWith('--platform=')) o.os = a.split('=')[1];
    else if (a === '--shell') o.shell = argv[++i];
    else if (a.startsWith('--shell=')) o.shell = a.slice(8);
    else if (a === '--history') o.history = true;
    else if (a.startsWith('--history=')) { o.history = true; o.historyFile = a.slice(10); }
    else if (a === '--no-history') o.history = false;
    else if (a === '--compose') o.compose = 'force';
    else if (a === '--no-compose') o.compose = 'off';
    else if (a === '--hybrid') o.hybrid = true;
    else if (a === '--no-hybrid') o.hybrid = false;
    else if (a === '-v' || a === '--version') o.version = true;
    else if (a === '-h' || a === '--help') o.help = true;
    else o.words.push(a);
  }
  return o;
}

/** Pure function used by the CLI and tests: query -> suggestion object (see src/pipeline.js). */
export function suggest(query, { top = 3, threshold, platform, shell, os, history, cwd, compose } = {}) {
  return pipelineSuggest(query, { top, threshold, shell, os: os || platform, history, cwd, compose });
}

function ask(rl, q) {
  return new Promise((res) => rl.question(q, res));
}

function editLine(initial) {
  return new Promise((res) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl.question(C.cyan('edit> '), (ans) => { rl.close(); res(ans); });
    rl.write(initial);
  });
}

function hasBin(name) {
  const r = spawnSync(process.platform === 'win32' ? 'where' : 'which', [name], { stdio: 'ignore' });
  return r.status === 0;
}

/** Run with the target shell: $SHELL/bash/zsh/sh -c, fish -c, pwsh -NoProfile -Command, cmd /d /s /c. */
export function shellInvocation(command, shell) {
  if (shell === 'powershell') {
    const bin = hasBin('pwsh') ? 'pwsh' : 'powershell';
    return [bin, ['-NoProfile', '-Command', command]];
  }
  // with /s, cmd strips the first and last `"` of everything after /c: wrap the command in one more
  // pair so a command that itself starts/ends with a quote ("C:\Program Files\x.exe" ...) survives
  if (shell === 'cmd') return ['cmd.exe', ['/d', '/s', '/c', `"${command}"`]];
  if (shell === 'fish') return ['fish', ['-c', command]];
  const envShell = process.env.SHELL && normShell(process.env.SHELL) === shell ? process.env.SHELL : null;
  return [envShell || shell || 'bash', ['-c', command]];
}

export function runShell(command, shellName = normShell(process.env.SHELL) || 'bash') {
  const [shell, args] = shellInvocation(command, shellName);
  return new Promise((res) => {
    const child = spawn(shell, args, { stdio: 'inherit', windowsVerbatimArguments: shell === 'cmd.exe' });
    child.on('error', (e) => { console.error(`tellsh: cannot start ${shell}: ${e.message}`); res(127); });
    child.on('exit', (code, sig) => res(code ?? (sig ? 128 + (osConstants.signals[sig] ?? 1) : 1)));
  });
}

const PROMPT = { powershell: 'PS> ', cmd: '> ', fish: '> ' };
function printSuggestion(s, opts) {
  const out = process.stdout;
  out.write(`${C.bold((PROMPT[s.shell] || '$ ') + s.command)}\n`);
  const conf = `${(s.confidence * 100).toFixed(0)}%`;
  const label = s.method === 'composed' ? C.yellow('composed (experimental)') + C.dim(` ${s.composed.tool}${s.composed.sub ? ' ' + s.composed.sub : ''}`) : s.intent;
  out.write(C.dim('  ') + label + C.dim(` · ${s.shell}/${s.os} · risk: `) + riskColor(s.risk)(s.risk) + C.dim(` · confidence: ${conf}`) + '\n');
  if (s.method === 'composed') out.write(C.yellow(`  ~ assembled from a flag vocabulary (${s.reason}); check it carefully`) + '\n');
  if (s.context?.note) out.write(C.cyan(`  ↺ from history: ${s.context.note}`) + '\n');
  for (const w of s.warnings) out.write(riskColor(s.risk)(`  ! ${w}`) + '\n');
  if (s.missing.length) out.write(C.yellow(`  ? missing: ${s.missing.join(', ')} — edit the command (e) before running`) + '\n');
  if (s.hint) out.write(C.dim(`  hint: ${s.hint}`) + '\n');
  if (s.notes) out.write(C.dim(`  note: ${s.notes}`) + '\n');
  if (opts.explain) {
    if (s.description) out.write(C.dim(`  ${s.description}`) + '\n');
    if (s.variant) out.write(C.dim(`  rendering: ${s.variant}`) + '\n');
    if (s.catalogCommand) out.write(C.dim(`  catalog command was: ${s.catalogCommand}`) + '\n');
    out.write(C.dim(`  slots: ${JSON.stringify(s.slots)}${s.slotSources ? ' via ' + JSON.stringify(s.slotSources) : ''}`) + '\n');
    out.write(C.dim('  tools: ' + s.tools.map((t) => `${t.tool} ${(t.p * 100).toFixed(1)}%`).join(', ')) + '\n');
    out.write(C.dim('  candidates: ' + s.candidates.map((c) => `${c.intent} ${(c.p * 100).toFixed(1)}%`).join(', ')) + '\n');
  }
}

export async function main(argv = process.argv.slice(2)) {
  const opts = parseArgs(argv);
  if (opts.version) { console.log(pkg.version); return 0; }
  if (opts.help || !opts.words.length) { console.log(HELP); return opts.help ? 0 : 2; }
  if (opts.badThreshold != null) { console.error(`tellsh: --threshold needs a number between 0 and 1 (got "${opts.badThreshold}")`); return 2; }
  // the shell removed the quotes: a word with spaces is quoted again so "/tmp/a b" stays one path ("delete folder" as
  // the first of several arguments is request text; a quoted argument that is neither is unclear: see joinArgs)
  const joined = joinArgs(opts.words);
  const query = joined?.text;
  if (joined == null) { console.error('tellsh: an argument contains spaces and both kinds of quotes; it cannot be read as one value'); return 2; }
  if (opts.shell && !normShell(opts.shell)) { console.error(`tellsh: unknown shell "${opts.shell}" (bash|zsh|sh|powershell|fish|cmd)`); return 2; }
  if (opts.os && !normOs(opts.os)) { console.error(`tellsh: unknown OS "${opts.os}" (linux|darwin|win32)`); return 2; }
  let s;
  try {
    getModel();
    const env = detectEnv({ shell: opts.shell, os: opts.os });
    // history is read only when asked for, kept in memory for this call, never printed or stored. Only the previous
    // command is a reference target; the line before it is read too because some shells (zsh, fish, PSReadLine)
    // write this `tellsh …` call to the file before it runs, and buildContext drops it.
    const history = opts.history ? loadHistory({ shell: env.shell, file: opts.historyFile, n: 2 }) : undefined;
    const so = { top: opts.top, threshold: opts.threshold, env, history, cwd: process.cwd(), compose: opts.compose, unclearArgs: joined.unclear };
    s = opts.hybrid ? await suggestLazy(query, { ...so, system: process.env.TELLSH_HYBRID === 'safe' ? 'A+B-safe' : 'A+B' }) : pipelineSuggest(query, so);
  } catch (e) {
    console.error(`tellsh: ${e.message}`);
    return 1;
  }

  if (opts.json) {
    console.log(JSON.stringify(s, null, 2));
    return s.understood ? 0 : 3;
  }
  if (!s.understood && s.context?.rule === 'refused') {
    // a history reference that cannot be resolved safely: nothing to suggest
    console.log(`Cannot resolve "${query}" from history: ${s.hint || s.context.note || 'not guessing'}.`);
    console.log(C.dim('Name the target explicitly.'));
    return 3;
  }
  if (!s.understood) {
    console.log(`I don't understand "${query}" (confidence ${(s.confidence * 100).toFixed(0)}% < ${(s.threshold * 100).toFixed(0)}%).`);
    console.log('Did you mean:');
    for (const c of s.candidates) console.log(`  - ${c.intent}: ${c.description} ${C.dim(`(${(c.p * 100).toFixed(1)}%)`)}`);
    if (s.hint) console.log(C.dim(`hint: ${s.hint}`));
    console.log(C.dim('Try rephrasing, or use --threshold to lower the bar.'));
    return 3;
  }
  if (s.gap) {
    console.log(`No ${s.shell} rendering for "${s.intent}" on ${s.os}: ${s.gap}.`);
    console.log(C.dim(`Try --shell bash (or another shell) to see the command.`));
    return 5;
  }

  printSuggestion(s, opts);
  if (opts.dryRun) return 0;

  const interactive = process.stdin.isTTY && process.stdout.isTTY;
  const shellName = s.shell;
  if (opts.yes) {
    const fromHistory = Object.values(s.slotSources || {}).includes('history');
    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog' || fromHistory || s.hybrid?.deferred) {
      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' || fromHistory ? 'resolved from history' : s.missing.length ? 'incomplete' : s.hybrid?.deferred ? 're-ranked by the neural fallback' : s.risk;
      console.log(C.yellow(`  --yes only auto-runs safe catalog commands; this one is ${why}. Not running.`));
      return 4;
    }
    return runShell(s.command, shellName);
  }
  if (!interactive) return 0; // print-only when piped

  let command = s.command;
  let risk = s.risk;
  let critical = s.critical;
  let incomplete = s.missing.length > 0;
  const strict = () => risk === 'high' || s.method === 'composed';
  for (;;) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const prompt = strict()
      ? `${risk === 'high' ? C.red('High risk.') : C.yellow('Experimental.')} Type "yes" to run, e to edit, anything else aborts: `
      : incomplete ? 'e edit · n abort: ' : '[Enter] run · e edit · n abort: ';
    const ans = (await ask(rl, prompt)).trim().toLowerCase();
    rl.close();
    if (ans === 'e' || ans === 'edit') {
      command = (await editLine(command)).trim();
      if (!command) return 130;
      const d = checkDanger(command, s.baseRisk);
      risk = maxRisk(s.baseRisk, d.risk);
      critical = d.critical;
      incomplete = /<[A-Z_]+>/.test(command);
      process.stdout.write(C.dim('  risk: ') + riskColor(risk)(risk) + '\n');
      for (const w of d.warnings) process.stdout.write(riskColor(risk)(`  ! ${w}`) + '\n');
      continue;
    }
    if (incomplete) { if (ans === '' ) continue; return 130; }
    const go = strict() ? ans === 'yes' || ans === 'tak' : ans === '' || ans === 'y' || ans === 'yes' || ans === 't' || ans === 'tak';
    if (!go) { console.log('aborted'); return 130; }
    if (critical) {
      const rl2 = createInterface({ input: process.stdin, output: process.stdout });
      const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
      rl2.close();
      if (a2 !== command) { console.log('aborted'); return 130; }
    }
    return runShell(command, shellName);
  }
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
import { checkDanger } from './danger.js';
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
  pr: (v) => RAW_OK.pr(v), repo: (v) => RAW_OK.repo(v),
  host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
  pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
  old: (v) => v.length > 0 && v.length < 300 && !/[\n\r\0]/.test(v), new: (v) => v.length < 300 && !/[\n\r\0]/.test(v),
};
const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
// "that pr", "this pull request", "the same pr": a pull request named by reference
const PR_REFERENCE = /\b(?:that|this|its|the\s+same|the\s+previous|the\s+last|ten|tego|tamten)\s+(?:\w+\s+)?(?:prs?|pull[\s-]+requests?)\b/i;
// "the other pr", "the latest pr", "my last pull request", "the most recent pr": a pull request picked out among several, which
// neither the current branch's pull request nor the one of the previous command is (withheld, also with history)
const PR_PICKED = /\b(?:(?:the|a|an|my|our|your|his|her|their|some|any)\s+)?(?:other|another|latest|newest|most\s+recent|recent|oldest|older|newer|earlier|next|first|second|third|new|old|pending|approved|remaining|(?:(?:my|our|your|his|her|their)\s+)(?:last|previous|prior)|inn[yaeoy]\w*|ostatni\w*|najnowsz\w*|poprzedni\w*|kolejn\w*|nastepn\w*|następn\w*|starsz\w*)\s+(?:(?:open|opened|draft|merged|github)\s+)?(?:prs?|pull[\s-]+requests?)\b/i;
const PR_CLOSE = /(?:^|[\s,;])(?:close|closing|shut|reject|decline|abandon|zamkn\S*)(?=[\s.,!?;:]|$)/i;
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
    if (validSlot(k, rT[k])) { slots[k] = rT[k]; sources[k] = 'tagger'; } else if (rR[k] != null && (validSlot(k, rR[k]) || !VALID_SLOT[k]) && !(PATH_SLOT_NAMES.has(k) && partOfRejected(rR[k]))) { slots[k] = rR[k]; sources[k] = 'regex'; }
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
  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr', 'repo']) {
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

exec
/bin/bash -lc 'node --test test/' in /workspace/tellsh
 exited 1 in 6232ms:
TAP version 13
# Subtest: /workspace/tellsh/test/cli.test.js
not ok 1 - /workspace/tellsh/test/cli.test.js
  ---
  duration_ms: 2798.651499
  location: '/workspace/tellsh/test/cli.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/compose.test.js
ok 2 - /workspace/tellsh/test/compose.test.js
  ---
  duration_ms: 494.286668
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 3 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 239.028605
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 4 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 278.867995
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 5 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 303.011435
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 6 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 236.296636
  ...
# Subtest: /workspace/tellsh/test/pipeline.test.js
not ok 7 - /workspace/tellsh/test/pipeline.test.js
  ---
  duration_ms: 405.105016
  location: '/workspace/tellsh/test/pipeline.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions.test.js
not ok 8 - /workspace/tellsh/test/regressions.test.js
  ---
  duration_ms: 1197.885771
  location: '/workspace/tellsh/test/regressions.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions10.test.js
not ok 9 - /workspace/tellsh/test/regressions10.test.js
  ---
  duration_ms: 612.36839
  location: '/workspace/tellsh/test/regressions10.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions11.test.js
not ok 10 - /workspace/tellsh/test/regressions11.test.js
  ---
  duration_ms: 1034.814524
  location: '/workspace/tellsh/test/regressions11.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions12.test.js
not ok 11 - /workspace/tellsh/test/regressions12.test.js
  ---
  duration_ms: 574.038594
  location: '/workspace/tellsh/test/regressions12.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions13.test.js
ok 12 - /workspace/tellsh/test/regressions13.test.js
  ---
  duration_ms: 386.658495
  ...
# Subtest: /workspace/tellsh/test/regressions14.test.js
ok 13 - /workspace/tellsh/test/regressions14.test.js
  ---
  duration_ms: 487.130008
  ...
# Subtest: /workspace/tellsh/test/regressions15.test.js
ok 14 - /workspace/tellsh/test/regressions15.test.js
  ---
  duration_ms: 461.9316
  ...
# Subtest: /workspace/tellsh/test/regressions16.test.js
ok 15 - /workspace/tellsh/test/regressions16.test.js
  ---
  duration_ms: 466.114429
  ...
# Subtest: /workspace/tellsh/test/regressions17.test.js
ok 16 - /workspace/tellsh/test/regressions17.test.js
  ---
  duration_ms: 456.167011
  ...
# Subtest: /workspace/tellsh/test/regressions18.test.js
ok 17 - /workspace/tellsh/test/regressions18.test.js
  ---
  duration_ms: 582.086568
  ...
# Subtest: /workspace/tellsh/test/regressions19.test.js
ok 18 - /workspace/tellsh/test/regressions19.test.js
  ---
  duration_ms: 559.755097
  ...
# Subtest: /workspace/tellsh/test/regressions2.test.js
not ok 19 - /workspace/tellsh/test/regressions2.test.js
  ---
  duration_ms: 861.027386
  location: '/workspace/tellsh/test/regressions2.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 20 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 459.127249
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 21 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 465.008556
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 22 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 437.818074
  ...
# Subtest: /workspace/tellsh/test/regressions4.test.js
not ok 23 - /workspace/tellsh/test/regressions4.test.js
  ---
  duration_ms: 1211.051569
  location: '/workspace/tellsh/test/regressions4.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions5.test.js
ok 24 - /workspace/tellsh/test/regressions5.test.js
  ---
  duration_ms: 768.783433
  ...
# Subtest: /workspace/tellsh/test/regressions6.test.js
ok 25 - /workspace/tellsh/test/regressions6.test.js
  ---
  duration_ms: 792.930996
  ...
# Subtest: /workspace/tellsh/test/regressions7.test.js
ok 26 - /workspace/tellsh/test/regressions7.test.js
  ---
  duration_ms: 420.476043
  ...
# Subtest: /workspace/tellsh/test/regressions8.test.js
not ok 27 - /workspace/tellsh/test/regressions8.test.js
  ---
  duration_ms: 685.759746
  location: '/workspace/tellsh/test/regressions8.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions9.test.js
not ok 28 - /workspace/tellsh/test/regressions9.test.js
  ---
  duration_ms: 936.809131
  location: '/workspace/tellsh/test/regressions9.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 29 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 3971.382865
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/slot-cases.js
ok 30 - /workspace/tellsh/test/slot-cases.js
  ---
  duration_ms: 110.041625
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 31 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 218.245221
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 32 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 218.111929
  location: '/workspace/tellsh/test/templates.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..32
# tests 32
# suites 0
# pass 20
# fail 12
# cancelled 0
# skipped 0
# todo 0
# duration_ms 6228.297787

exec
/bin/bash -lc 'cat scripts/hybrid/export_data.js; cat scripts/hybrid/train_a_dev.sh; cat scripts/lib/heldout.js; git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- scripts/train.py scripts/gen_data.js scripts/lib/silver.js' in /workspace/tellsh
 succeeded in 0ms:
#!/usr/bin/env node
// Export raw-text training data for the hybrid neural models (B: encoder, C: LM reranker).
// Mirrors scripts/gen_data.js (same sources, same held-out filter, same teacher decisions, same silver spans and
// relexicalisation) but writes text + char-offset spans instead of hashed features.
//
//   build/hybrid/train.jsonl  {text, tool, intent, lang, shell, os, spans:[[type,start,end]], gid, src, split}
//     split = 'dev' for ~10% of the base sentence groups (all copies of a sentence stay on one side); dev rows are
//     never used to fit B/C and serve to calibrate the hybrid thresholds.
//   build/hybrid/meta.json    {tools, intents, intentTool, tagLabels}
//   build/hybrid/dev_texts.json  every normalized dev text (train rows with one of these texts are dropped)
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { INTENTS } from '../../src/catalog.js';
import { FAMILIES, FAMILY_OF, NONE, TAG_TYPES } from '../../src/tools.js';
import { normalize, fnv1a } from '../../src/features.js';
import { silverSpans, relex, mulberry32 } from '../lib/silver.js';
import { exclusionIndex } from '../lib/heldout.js';
import { readReal, realTrain } from '../real/real_rows.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const OUT = join(ROOT, 'build', 'hybrid');
const rng = mulberry32(29);
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);

const SHELL_P = [['bash', 0.35], ['zsh', 0.25], ['sh', 0.07], ['powershell', 0.18], ['fish', 0.08], ['cmd', 0.07]];
function sampleEnv() {
  let s = 'bash';
  let r = rng();
  for (const [k, p] of SHELL_P) { if ((r -= p) <= 0) { s = k; break; } }
  let os;
  if (s === 'cmd') os = 'win32';
  else if (s === 'powershell') os = rng() < 0.7 ? 'win32' : rng() < 0.5 ? 'linux' : 'darwin';
  else if (s === 'zsh') os = rng() < 0.6 ? 'darwin' : 'linux';
  else os = rng() < 0.7 ? 'linux' : 'darwin';
  return { shell: s, os };
}
function typo(text) {
  const chars = [...text];
  const idxs = chars.map((c, i) => (/\p{L}/u.test(c) ? i : -1)).filter((i) => i >= 0);
  if (idxs.length < 4) return text;
  const i = idxs[1 + Math.floor(rng() * (idxs.length - 2))];
  const op = rng();
  if (op < 0.4) chars.splice(i, 1);
  else if (op < 0.8 && /\p{L}/u.test(chars[i + 1] || '')) [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
  else chars.splice(i, 0, chars[i]);
  return chars.join('');
}
// typo() shifts offsets, so only the clean / relexicalised copies carry spans
export const isDev = (text) => fnv1a('dev:' + normalize(text)) % 10 === 0;

/**
 * The row sink: every emitted row is checked against the held-out index, not only the originals. A typo or
 * relexicalised copy can be exactly a held-out text ("kill all node processes", "koniec pliku /var/log/syslog").
 */
export function heldOutFilter(heldOut) {
  const out = { rows: [], dropped: 0 };
  out.push = (o) => { if (heldOut.has(o.text)) out.dropped++; else out.rows.push(o); };
  return out;
}

function main() {
  mkdirSync(OUT, { recursive: true });
  const ids = new Set(INTENTS.map((i) => i.id));
  // the same held-out index as gen_data.js (eval / blind sets, near-duplicates, eval-only values, real-usage eval split)
  const real = process.argv.includes('--no-real') ? [] : readReal(ROOT);
  const excl = exclusionIndex(ROOT);
  const heldOut = { has: (n) => excl.has(n) };
  const intentRows = [...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'train.jsonl'))].map((r) => ({ ...r, src: 'intents' }));
  const shellRows = readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell' }));
  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl')).filter((d) => d.text && d.field !== 'risk');
  const decide = new Map(decisions.map((d) => [normalize(d.text), d]));
  const seen = new Set();
  const base = [];
  const realRows = realTrain(real, ids);
  for (const r0 of [...intentRows, ...shellRows, ...realRows]) {
    if (!ids.has(r0.intent)) throw new Error(`unknown intent ${r0.intent}`);
    const n = normalize(r0.text);
    if (heldOut.has(r0.text)) continue;
    const d = decide.get(n);
    if (d?.action === 'drop') continue;
    const r = d?.action === 'relabel' && d.intent ? { ...r0, intent: d.intent } : r0;
    const key = n + '|' + r.intent + '|' + (r.shell || '');
    if (seen.has(key)) continue;
    seen.add(key);
    base.push(r);
  }
  const out = heldOutFilter(heldOut);
  const { rows, push } = out;
  let gid = 0;
  for (const r of base) {
    const g = gid++;
    const tool = FAMILY_OF[r.intent];
    const split = isDev(r.text) ? 'dev' : 'train';
    const env = () => (r.shell ? { shell: r.shell, os: r.os || 'linux' } : sampleEnv());
    const { spans } = silverSpans(r.text, r.intent);
    const sp = (s) => s.map((x) => [x.type, x.start, x.end]);
    push({ text: r.text, tool, intent: r.intent, lang: r.lang, ...env(), spans: sp(spans), gid: g, src: r.src, split, kind: 'orig' });
    push({ text: typo(r.text), tool, intent: r.intent, lang: r.lang, ...env(), spans: null, gid: g, src: r.src, split, kind: 'typo' });
    for (let k = 0; k < 2; k++) {
      const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'train' });
      if (rx.text !== r.text) push({ text: rx.text, tool, intent: r.intent, lang: r.lang, ...env(), spans: sp(rx.spans), gid: g, src: r.src, split, kind: 'relex' });
    }
  }
  // tldr descriptions: tool label only (intent ''), capped per family/lang as in gen_data
  const tldr = readJsonl(join(ROOT, 'data', 'tldr', 'tools.jsonl'));
  const cap = {};
  for (const r of tldr.sort(() => rng() - 0.5)) {
    if (!FAMILIES[r.tool] || !r.text || r.text.length < 8 || heldOut.has(r.text)) continue;
    const key = r.tool + r.lang;
    if ((cap[key] = (cap[key] || 0) + 1) > (r.lang === 'pl' ? 60 : 80)) continue;
    const win = /^windows\//.test(r.page || '');
    push({ text: r.text, tool: r.tool, intent: '', lang: r.lang, ...(win ? { shell: 'powershell', os: 'win32' } : sampleEnv()), spans: null, gid: gid++, src: 'tldr', split: isDev(r.text) ? 'dev' : 'train', kind: 'orig' });
  }
  for (const r of readJsonl(join(ROOT, 'data', 'ood.jsonl'))) {
    if (heldOut.has(r.text)) continue;
    const g = gid++;
    const split = isDev(r.text) ? 'dev' : 'train';
    push({ text: r.text, tool: NONE, intent: '', lang: r.lang, ...sampleEnv(), spans: [], gid: g, src: 'ood', split, kind: 'orig' });
    push({ text: typo(r.text), tool: NONE, intent: '', lang: r.lang, ...sampleEnv(), spans: [], gid: g, src: 'ood', split, kind: 'typo' });
  }
  // a typo / relexicalised copy (or another source's sentence) on the train side can be exactly a dev text
  // ("policz pliki w /var/log"): the dev split must stay unseen, so such train rows are dropped
  const devTexts = new Set(rows.filter((r) => r.split === 'dev').map((r) => normalize(r.text)));
  const before = rows.length;
  rows.splice(0, rows.length, ...rows.filter((r) => r.split === 'dev' || !devTexts.has(normalize(r.text))));
  writeFileSync(join(OUT, 'train.jsonl'), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
  // the complete dev-text index (every emitted dev row, not only texts whose own hash is dev): train_a_dev.sh
  // excludes it from A_dev's training data
  writeFileSync(join(OUT, 'dev_texts.json'), JSON.stringify([...devTexts].sort()));
  const meta = {
    tools: [...Object.keys(FAMILIES), NONE],
    intents: INTENTS.map((i) => i.id),
    intentTool: Object.fromEntries(INTENTS.map((i) => [i.id, FAMILY_OF[i.id]])),
    descriptions: Object.fromEntries(INTENTS.map((i) => [i.id, i.description])),
    tagLabels: ['O', ...TAG_TYPES.flatMap((t) => [`B-${t}`, `I-${t}`])],
  };
  writeFileSync(join(OUT, 'meta.json'), JSON.stringify(meta, null, 1));
  const c = (f) => rows.filter(f).length;
  console.log(`export_data: ${out.dropped} augmented rows dropped (held-out texts), ${before - rows.length} train rows dropped (dev texts)`);
  console.log(`export_data: ${base.length} base (${base.filter((r) => r.src === 'real').length} real), ${rows.length} rows (train ${c((r) => r.split === 'train')}, dev ${c((r) => r.split === 'dev')}), tldr ${c((r) => r.src === 'tldr')}, ood ${c((r) => r.src === 'ood')}`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
#!/bin/sh
# Retrain the linear cascade (A) WITHOUT the hybrid dev split (scripts/hybrid/export_data.js isDev), so that the
# hybrid thresholds (when to defer from A to B/C) are calibrated on sentences A has never seen.
# Builds a shadow tree build/adev/ (src, data symlinked; gen_data/train copied with one extra filter) and writes
# build/adev/model/model.bin. The shipped model/model.bin is not touched.
set -e
ROOT=$(cd "$(dirname "$0")/../.." && pwd)
T=$ROOT/build/adev
mkdir -p $T/scripts/lib $T/model $T/build
ln -sfn $ROOT/src $T/src
ln -sfn $ROOT/data $T/data
# private real-usage rows (if present) and the real/ loader
mkdir -p $T/scripts/real && cp $ROOT/scripts/real/*.js $T/scripts/real/
[ -d $ROOT/build/real ] && ln -sfn $ROOT/build/real $T/build/real
# test/ is copied, not symlinked: train.py writes test/fixtures/parity.json
mkdir -p $T/test/fixtures && cp $ROOT/test/*.js $T/test/
cp $ROOT/scripts/lib/*.js $T/scripts/lib/
cp $ROOT/scripts/train.py $T/scripts/train.py
cp $ROOT/model/*.json $T/model/
# gen_data: additionally drop every dev-split sentence (same hash as export_data.js) AND every text of the complete
# exported dev split (its typo / relexicalised copies hash anywhere: build/hybrid/dev_texts.json from export_data.js),
# from every training source: the base intent rows, and through leaks() (which every emitted row and the tldr /
# out-of-domain loaders check) the OOD, tldr and anaphora rows (an OOD dev sentence is skipped with its typo copy)
DEV_TEXTS=$ROOT/build/hybrid/dev_texts.json
[ -f $DEV_TEXTS ] || { echo "train_a_dev: $DEV_TEXTS missing; run node scripts/hybrid/export_data.js first" >&2; exit 1; }
sed -e "s#if (heldOut.has(r0.text)) { dropped++; continue; }#if (heldOut.has(r0.text) || isDevText(r0.text)) { dropped++; continue; }#" \
    -e "s#^  const leaks = excl.has;\$#  const leaks = (t) => excl.has(t) || isDevText(t);#" \
    -e "s#^import { ctxFeatures } from '../src/history.js';#&\nimport { fnv1a as _fnv } from '../src/features.js';\nconst _devIndex = new Set(JSON.parse(readFileSync('$DEV_TEXTS', 'utf8')));\nconst isDevText = (t) => _fnv('dev:' + normalize(t)) % 10 === 0 || _devIndex.has(normalize(t));#" \
    $ROOT/scripts/gen_data.js > $T/scripts/gen_data.js
# every substitution must have happened (the import alone is not enough)
grep -q 'heldOut.has(r0.text) || isDevText' $T/scripts/gen_data.js
grep -q 'const leaks = (t) => excl.has(t) || isDevText(t);' $T/scripts/gen_data.js
grep -q '_devIndex.has(normalize(t))' $T/scripts/gen_data.js
cd $T && node scripts/gen_data.js && python3 scripts/train.py --out $T/model/model.bin
// Held-out texts shared by gen_data.js, teacher.js and eval.js. A training text leaks when it equals a
// held-out text after normalize(), when it equals one after filler words are removed and word order is
// ignored ("list all symlinks in X" vs "list symlinks in X", "show disks and partitions" vs "partitions and
// disks show"), or when it is a contrastive rewrite (scripts/lib/confusable.js) of a
// held-out text ("push my commits" -> "pull my commits").
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { normalize } from '../../src/features.js';
import { CONTRAST_RULES } from './confusable.js';
import { SLOT_CASES } from '../../test/slot-cases.js';
import { EVAL_VALUES } from './silver.js';
import { readReal, realEvalTexts } from '../real/real_rows.js';

const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);

const FILLER = new Set(('a an the all any some every each my me our your please pls plz just now currently right here ' +
  'can could would you i want to like quickly real quick ' +
  'wszystkie wszystkich wszystko mi mnie moje moich moj moja moim prosze teraz aktualnie obecnie sobie moze mozesz ' +
  'czy jakies jakie tu tutaj').split(' '));

/**
 * Key without filler words and word order (normalize() first: lowercase, no diacritics, digits -> 0):
 * "last 30 kernel messages" and "kernel messages last 30" are the same request for leakage purposes.
 */
export function nearKey(text) {
  return normalize(text).split(' ').filter((w) => w && !FILLER.has(w)).sort().join(' ');
}

/**
 * Raw held-out request texts (eval sets, blind sets, slot gold, the hand-written slot cases of
 * test/slot-cases.js). Every caller (gen_data.js, teacher.js) gets the same index.
 */
export function heldOutTexts(root, extra = []) {
  const r = (...p) => readJsonl(join(root, 'data', ...p));
  return [
    ...readDir(join(root, 'data', 'eval')).map((x) => x.text),
    ...r('shell', 'eval.jsonl').map((x) => x.text),
    ...r('history', 'eval.jsonl').map((x) => x.query),
    ...r('compose', 'eval.jsonl').map((x) => x.text),
    ...r('slots', 'gold.jsonl').map((x) => x.text),
    ...r('ood_eval.jsonl').map((x) => x.text),
    ...readDir(join(root, 'data', 'blind')).map((x) => x.text ?? x.query),
    ...readDir(join(root, 'data', 'eval_v04')).map((x) => x.text),
    ...readDir(join(root, 'data', 'hybrid', 'blind')).map((x) => x.text),
    ...SLOT_CASES.map((c) => c[1]),
    // private real-usage eval split (build/real/rows.jsonl, if present)
    ...realEvalTexts(readReal(root)),
    ...extra,
  ].filter(Boolean);
}

/** -> { has(text): boolean, exact: Set, near: Set } over the held-out texts and their contrastive rewrites. */
export function heldOutIndex(texts) {
  const exact = new Set();
  const near = new Set();
  const add = (t) => { exact.add(normalize(t)); const k = nearKey(t); if (k) near.add(k); };
  for (const t of texts) {
    add(t);
    for (const rule of CONTRAST_RULES) if (rule.re.test(t)) { const w = t.replace(rule.re, rule.to); if (w !== t) add(w); }
  }
  return { exact, near, has: (t) => exact.has(normalize(t)) || near.has(nearKey(t)) };
}

const esc = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** Eval-only slot values (scripts/lib/silver.js EVAL_POOLS) as one whole-word regex. */
export const EVAL_VALUE_RE = new RegExp(`(?<![\\p{L}\\d_])(?:${[...EVAL_VALUES].sort((a, b) => b.length - a.length).map(esc).join('|')})(?![\\p{L}\\d_])`, 'iu');

/**
 * The one exclusion index of every build-time script that produces or sends training text (gen_data.js and
 * the Jev teacher, teacher.js): a text is excluded when it is a held-out text (or a near-duplicate / contrastive
 * rewrite of one) or mentions an eval-only slot value.
 * -> { heldOut: heldOutIndex(...), evalValue(text), has(text) }
 */
export function exclusionIndex(root, extra = []) {
  const heldOut = heldOutIndex(heldOutTexts(root, extra));
  const evalValue = (t) => EVAL_VALUE_RE.test(String(t));
  return { heldOut, evalValue, has: (t) => heldOut.has(t) || evalValue(t) };
}
diff --git a/scripts/gen_data.js b/scripts/gen_data.js
index fad8a27..4fedd07 100644
--- a/scripts/gen_data.js
+++ b/scripts/gen_data.js
@@ -12,6 +12,8 @@ import { FAMILIES, FAMILY_OF, NONE, TAG_TYPES } from '../src/tools.js';
 import { vectorize, normalize, tagTokens, tagFeatures } from '../src/features.js';
 import { ctxFeatures } from '../src/history.js';
 import { silverSpans, relex, bioLabels, mulberry32 } from './lib/silver.js';
+import { exclusionIndex } from './lib/heldout.js';
+import { readReal, realTrain } from './real/real_rows.js';
 
 const ROOT = fileURLToPath(new URL('..', import.meta.url));
 export const DIM = 1 << 18;
@@ -98,31 +100,36 @@ function main() {
   mkdirSync(outDir, { recursive: true });
   const ids = new Set(INTENTS.map((i) => i.id));
 
-  // held-out texts (never trained on)
-  const heldOut = new Set([
-    ...readDir(join(ROOT, 'data', 'eval')).map((r) => r.text),
-    ...readJsonl(join(ROOT, 'data', 'shell', 'eval.jsonl')).map((r) => r.text),
-    ...readJsonl(join(ROOT, 'data', 'history', 'eval.jsonl')).map((r) => r.query),
-    ...readJsonl(join(ROOT, 'data', 'compose', 'eval.jsonl')).map((r) => r.text),
-    ...readJsonl(join(ROOT, 'data', 'slots', 'gold.jsonl')).map((r) => r.text),
-    ...readJsonl(join(ROOT, 'data', 'ood_eval.jsonl')).map((r) => r.text),
-  ].map(normalize));
+  // held-out texts (never trained on), with filler-word near-duplicates and contrastive rewrites, and
+  // eval-only slot values (scripts/lib/silver.js EVAL_POOLS): the same index teacher.js uses (scripts/lib/heldout.js)
+  // private real-usage rows (scripts/real/prepare_real.js; build/real/, never committed): the train split is used for
+  // training, the eval split is held out like every other eval set. --no-real trains on public data only.
+  const real = args.includes('--no-real') ? [] : readReal(ROOT);
+  const excl = exclusionIndex(ROOT);
+  const heldOut = excl.heldOut;
+  const evalValRe = { test: excl.evalValue };
+  const leaks = excl.has;
 
   const intentRows = [...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'train.jsonl'))]
     .map((r) => ({ ...r, src: 'intents' }));
   const shellRows = readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell' }));
+  const realRows = realTrain(real, ids);
   for (const r of [...intentRows, ...shellRows]) if (!ids.has(r.intent)) throw new Error(`unknown intent ${r.intent}: ${r.text}`);
+  const publicCount = intentRows.length + shellRows.length;
 
   // teacher review decisions (data/teacher/decisions.jsonl): drop or relabel individual training rows
   const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl')).filter((d) => d.text && d.field !== 'risk');
   const decide = new Map(decisions.map((d) => [normalize(d.text), d]));
   let dropped = 0;
+  let droppedEvalValue = 0;
+  let droppedDerived = 0;
   let teacherDropped = 0;
   const seen = new Set();
   const base = [];
-  for (const r0 of [...intentRows, ...shellRows]) {
+  for (const r0 of [...intentRows, ...shellRows, ...realRows]) {
     const n = normalize(r0.text);
-    if (heldOut.has(n)) { dropped++; continue; }
+    if (heldOut.has(r0.text)) { dropped++; continue; }
+    if (evalValRe.test(r0.text)) { droppedEvalValue++; continue; }
     const d = decide.get(n);
     if (d?.action === 'drop') { teacherDropped++; continue; }
     const r = d?.action === 'relabel' && d.intent ? { ...r0, intent: d.intent } : r0;
@@ -136,13 +143,17 @@ function main() {
   const tag = createWriteStream(join(outDir, 'tag.jsonl'));
   const counts = { cls: 0, tag: 0, bySrc: {} };
   let gid = 0;
+  // every emitted example (incl. typo / relexicalised copies and anaphora phrases) is checked against the
+  // held-out texts and eval-only values, not just the base rows
   const emit = (text, family, intent, extras, w, g, lang, group) => {
+    if (leaks(text)) { droppedDerived++; return; }
     const f = [...vectorize(text, DIM, extras).entries()].sort((a, b) => a[0] - b[0]).map(([k, v]) => [k, +v.toFixed(6)]);
     cls.write(JSON.stringify({ y: family, i: intent || '', f, w, g, lang: lang || '', gid: group }) + '\n');
     counts.cls++;
     counts.bySrc[g] = (counts.bySrc[g] || 0) + 1;
   };
   const emitTag = (text, spans, tool, group) => {
+    if (leaks(text)) { droppedDerived++; return; }
     const toks = tagTokens(text);
     if (!toks.length) return;
     const y = bioLabels(toks, spans);
@@ -150,14 +161,23 @@ function main() {
     counts.tag++;
   };
 
+  // teacher-confirmed low-margin rows of confusable intents (scripts/teacher.js mine) get a second copy
+  const boost = new Set(readJsonl(join(ROOT, 'data', 'teacher', 'hardneg_boost.jsonl')).map((r) => normalize(r.text) + '|' + r.intent));
+  let nBoost = 0;
+
   // 1. intent paraphrases (+ typo copy, + relexicalised copy), random env, some ctx noise
   for (const r of base) {
     const g = gid++;
     const fam = FAMILY_OF[r.intent];
     const env = () => (r.shell ? [`shell=${r.shell}`, `os=${r.os || 'linux'}`] : sampleEnv());
     const ctx = () => (rng() < 0.25 ? randomCtx() : []);
-    emit(r.text, fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g);
-    emit(typo(r.text), fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g);
+    // real-usage rows: LLM-written requests with noisy labels -> half weight, and no tagger rows (their regex silver
+    // spans are unreliable: long paths, backticks, command fragments)
+    const w = r.src === 'real' ? 0.5 : 1;
+    emit(r.text, fam, r.intent, [...env(), ...ctx()], w, r.src, r.lang, g);
+    if (boost.has(normalize(r.text) + '|' + r.intent)) { emit(r.text, fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g); nBoost++; }
+    emit(typo(r.text), fam, r.intent, [...env(), ...ctx()], w, r.src, r.lang, g);
+    if (r.src === 'real') continue;
     const { spans } = silverSpans(r.text, r.intent);
     emitTag(r.text, spans, fam, g);
     for (let k = 0; k < 2; k++) {
@@ -167,14 +187,17 @@ function main() {
     }
   }
 
+  // filtered training corpus for scripts/build_triggers.js (same exclusions and teacher decisions)
+  writeFileSync(join(outDir, 'train_rows.jsonl'), base.filter((r) => r.src !== 'real').map((r) => JSON.stringify({ text: r.text, intent: r.intent, lang: r.lang, shell: r.shell || '' })).join('\n') + '\n');
+
   // 2. history anaphora: pronoun requests whose intent depends on ctx_ features
   let nAna = 0;
   for (const [, v] of Object.entries(ANAPHORA)) {
     for (const [ent, intent] of Object.entries(v.map)) {
       for (const lang of ['en', 'pl']) {
         for (const text of v[lang]) {
+          const g = gid++; // the three context variants of one phrase share a calibration group
           for (let k = 0; k < 3; k++) {
-            const g = gid++;
             emit(text, FAMILY_OF[intent], intent, [...sampleEnv(), ...randomCtx(ent)], 1, 'ctx', lang, g);
             if (k === 0) emitTag(text, [], FAMILY_OF[intent], g);
             nAna++;
@@ -190,7 +213,7 @@ function main() {
   let nT = 0;
   for (const r of tldr.sort(() => rng() - 0.5)) {
     if (!FAMILIES[r.tool] || !r.text || r.text.length < 8) continue;
-    if (heldOut.has(normalize(r.text))) continue;
+    if (leaks(r.text)) continue;
     const key = r.tool + r.lang;
     if ((cap[key] = (cap[key] || 0) + 1) > (r.lang === 'pl' ? 60 : 80)) continue;
     const win = /^windows\//.test(r.page || '');
@@ -199,9 +222,9 @@ function main() {
   }
 
   // 4. out-of-domain -> __none__
-  const ood = readJsonl(join(ROOT, 'data', 'ood.jsonl'));
+  const ood = [...readJsonl(join(ROOT, 'data', 'ood.jsonl')), ...readJsonl(join(ROOT, 'data', 'ood_teacher.jsonl'))];
   for (const r of ood) {
-    if (heldOut.has(normalize(r.text))) continue;
+    if (leaks(r.text)) continue;
     const g = gid++;
     emit(r.text, NONE, '', sampleEnv(), 1, 'ood', r.lang, g);
     emit(typo(r.text), NONE, '', [...sampleEnv(), ...(rng() < 0.25 ? randomCtx() : [])], 1, 'ood', r.lang, g);
@@ -215,10 +238,11 @@ function main() {
     families: [...Object.keys(FAMILIES), NONE],
     intentsByFamily: FAMILIES,
     tagLabels,
-    counts: { ...counts, base: base.length, droppedHeldOut: dropped, teacherDropped, anaphora: nAna, tldr: nT, ood: ood.length },
+    counts: { ...counts, base: base.length, public: publicCount, real: realRows.length, realUsed: base.filter((r) => r.src === 'real').length, droppedHeldOut: dropped, droppedEvalValue, droppedDerived, teacherDropped, boosted: nBoost, anaphora: nAna, tldr: nT, ood: ood.length },
   };
   writeFileSync(join(outDir, 'meta.json'), JSON.stringify(meta, null, 1));
-  console.log(`gen_data: ${base.length} base sentences (${dropped} dropped: collide with held-out sets), ` +
+  console.log(`gen_data: ${base.length} base sentences (${dropped} dropped: collide with held-out sets; ${droppedEvalValue} mention an eval-only value; ` +
+    `${droppedDerived} derived rows dropped), ` +
     `${counts.cls} classifier rows ${JSON.stringify(counts.bySrc)}, ${counts.tag} tagger sequences, ${nT} tldr rows, ${nAna} anaphora rows`);
 }
 
diff --git a/scripts/lib/silver.js b/scripts/lib/silver.js
index 8cdfa79..d276c37 100644
--- a/scripts/lib/silver.js
+++ b/scripts/lib/silver.js
@@ -92,7 +92,10 @@ export function silverSpans(text, intentId) {
   return { spans: out, resolved: r, ex };
 }
 
-// ---------- value pools (index % 4 == 3 -> held-out eval pool) ----------
+// ---------- value pools ----------
+// TRAIN: values used to relexicalise training rows. EVAL: values used only by the e2e eval; they are
+// disjoint from TRAIN and gen_data.js drops/relexicalises every training row that mentions one of them,
+// so an eval value never occurs in any training text. Numbers come from disjoint ranges (see RANGES).
 const P = {
   dir: ['/var/log', '/etc/nginx', '~/projects', './src', 'build', '/opt/app', '~/Documents/reports', '/srv/www',
     'node_modules', '../backup', '/tmp/cache', '~/Pobrane', '/mnt/data', '/home/ola/zdjecia', 'dist', '/var/lib/docker',
@@ -114,6 +117,7 @@ const P = {
     'backend_2', 'kafka-broker', 'grafana', 'mailhog', 'minio', 'test-runner', 'app'],
   pkg: ['htop', 'curl', 'jq', 'ripgrep', 'tmux', 'ffmpeg', 'tree', 'ncdu', 'nmap', 'git', 'zsh', 'neofetch', 'wget', 'unzip', 'bat', 'fzf'],
   cmd: ['python3', 'node', 'git', 'docker', 'java', 'code', 'npm', 'pip', 'gcc', 'make', 'kubectl', 'go', 'ruby', 'cargo', 'psql', 'terraform'],
+  script: ['dev', 'build', 'test', 'lint', 'start', 'typecheck', 'preview', 'format', 'e2e', 'serve', 'watch', 'storybook'],
   branch: ['main', 'develop', 'feature/login', 'fix-123', 'release/2.1', 'hotfix/crash', 'feat/JIRA-42-auth', 'dev',
     'staging', 'bugfix/null-ptr', 'experiment', 'feature/nowy-panel', 'v2', 'chore/deps', 'test/e2e', 'poprawki'],
   pattern: ['error', 'TODO', 'api_key', 'FIXME', 'Exception', 'localhost', 'password', 'timeout', 'deprecated',
@@ -132,12 +136,45 @@ const P = {
   url: ['https://example.com', 'https://github.com/user/repo.git', 'http://localhost:3000/health', 'https://api.example.com/v1',
     'https://x.org/file.zip', 'https://onet.pl', 'https://releases.example.com/app-1.2.tar.gz', 'http://192.168.1.1',
     'git@github.com:org/app.git', 'https://wp.pl', 'https://httpbin.org/get', 'https://cdn.example.net/img.png'],
-  mode: ['755', '644', '600', '700', '777', '640', 'u+x', 'g-w', 'a+r', 'o-rwx', '750', '+x'],
+  mode: ['755', '644', '600', '700', '640', 'u+x', 'g-w', 'a+r', '750', '+x'],
   ext: ['pdf', 'log', 'py', 'js', 'txt', 'json', 'md', 'csv', 'jpg', 'png', 'yaml', 'sh', 'html', 'ts', 'mp4', 'conf'],
   port: [22, 80, 443, 3000, 5432, 8080, 8443, 9000, 27017, 6379, 5173, 8000, 4200, 3306, 9090, 5000],
 };
-const pool = (name, split) => P[name].filter((_, i) => (split === 'eval' ? i % 4 === 3 : i % 4 !== 3));
+const E = {
+  dir: ['/srv/qv-archiwum', '~/zz_badania/rok3', './pkg/vqlite', '/opt/kwartet/var', '/mnt/nas7/media', 'tmp_wyniki_q',
+    '~/Pulpit/kwerendy', '/data/ingest-b7', 'src/qparse', '../kopie_xq'],
+  file: ['qv_notatki.txt', 'zx-config.toml', '/srv/qv-app/settings.ini', 'raport_q4_qv.pdf', 'kwartet.log', 'ingest_b7.csv',
+    'qvmain.go', '~/.qvrc', 'wnioski-qz.md', 'schemat_qv.sql'],
+  tar: ['qv-kopia.tar.gz', 'zxlogs.tgz', 'kwartet-src.tar.gz'],
+  zip: ['qv-zdjecia.zip', 'zx-export.zip', 'kwartet-docs.zip'],
+  proc: ['qvworker', 'zxd-sync', 'kwartetd', 'ingestor-b7', 'qvproxy'],
+  service: ['qv-api', 'zx-sched', 'kwartet', 'ingest-b7'],
+  container: ['qv-db', 'zx_cache', 'kwartet-web', 'ingest-b7'],
+  pkg: ['qvtool', 'zxutil', 'kwartet-cli'],
+  cmd: ['qvctl', 'zxrun', 'kwartet'],
+  script: ['bundle:analyze', 'proofread', 'smoke-suite'],
+  branch: ['feature/qv-panel', 'fix/zx-77', 'release/qv-9', 'kwartet-refaktor'],
+  pattern: ['QVERR', 'zx_timeout', 'kwartet_fail', 'błąd_qv'],
+  phrase: ['qv sync failed', 'zx brak odpowiedzi'],
+  user: ['qvadmin', 'zxops', 'kwartet'],
+  msg: ['qv poprawka indeksu', 'zx cleanup', 'kwartet: nowy moduł'],
+  var: ['QV_HOME', 'ZX_TOKEN', 'KWARTET_ENV'],
+  text: ['qvsecret', 'zx tekst', 'kwartet9'],
+  host: ['qv.internal.example', '172.31.77.9', 'zx-gw.example.net', 'kwartet.lan'],
+  userhost: ['qvadmin@qv.internal.example', 'zxops@172.31.77.9', 'deploy@kwartet.lan'],
+  url: ['https://qv.example.net/api/v3', 'https://zx.example.org/pkg-7.tar.gz', 'http://kwartet.lan:7781/status'],
+  mode: ['711', '604', 'o+x', 'g+rw'],
+  ext: ['qvd', 'zxl', 'toml', 'parquet'],
+  port: [7781, 6612, 9471, 4719],
+};
+// numeric ranges: [train, eval] (disjoint)
+const RANGES = { num: [[1, 30], [31, 60]], depth: [[1, 4], [5, 8]], pid: [[100, 49999], [50000, 99999]], port: [[20000, 65000], [10000, 19999]], qty: [[1, 30], [31, 60]] };
+const pool = (name, split) => (split === 'eval' ? E[name] : P[name]);
+const inRange = (rng, k, split) => { const [a, b] = RANGES[k][split === 'eval' ? 1 : 0]; return a + Math.floor(rng() * (b - a + 1)); };
 export const POOLS = P;
+export const EVAL_POOLS = E;
+/** Every string value of the eval pools (gen_data.js keeps them out of all training text). */
+export const EVAL_VALUES = [...new Set(Object.values(E).flat().map(String))];
 
 const NUMW = {
   en: ['three', 'five', 'ten', 'twenty', 'two', 'seven'],
@@ -160,16 +197,16 @@ function replacement(sp, orig, lang, rng, split) {
       return v;
     }
     case 'NUM': {
-      if (sp.slot === 'depth') return String(1 + Math.floor(rng() * 4));
-      if (/^\d+$/.test(orig) || rng() < 0.7) return String(1 + Math.floor(rng() * 30));
+      if (sp.slot === 'depth') return String(inRange(rng, 'depth', split));
+      if (split === 'eval' || /^\d+$/.test(orig) || rng() < 0.7) return String(inRange(rng, 'num', split));
       return pick(rng, NUMW[lang] || NUMW.en);
     }
     case 'TIME': case 'SIZE': {
       if (!/\d/.test(orig)) return null;
-      return orig.replace(/\d+(?:[.,]\d+)?/, () => String(1 + Math.floor(rng() * 30)));
+      return orig.replace(/\d+(?:[.,]\d+)?/, () => String(inRange(rng, 'qty', split)));
     }
-    case 'PORT': return String(rng() < 0.6 ? pick(rng, pool('port', split)) : 1024 + Math.floor(rng() * 60000));
-    case 'PID': return String(100 + Math.floor(rng() * 99000));
+    case 'PORT': return String(rng() < 0.6 ? pick(rng, pool('port', split)) : inRange(rng, 'port', split));
+    case 'PID': return String(inRange(rng, 'pid', split));
     case 'MODE': return pick(rng, pool('mode', split));
     case 'EXT': {
       const e = pick(rng, pool('ext', split));
@@ -181,7 +218,7 @@ function replacement(sp, orig, lang, rng, split) {
     case 'URL': return pick(rng, pool('url', split));
     case 'HOST': return orig.includes('@') ? pick(rng, pool('userhost', split)) : pick(rng, pool('host', split));
     case 'NAME': {
-      const kind = { service: 'service', container: 'container', pkg: 'pkg', cmd: 'cmd' }[sp.slot] || 'proc';
+      const kind = { service: 'service', container: 'container', pkg: 'pkg', cmd: 'cmd', script: 'script' }[sp.slot] || 'proc';
       return pick(rng, pool(kind, split));
     }
     case 'BRANCH': return pick(rng, pool('branch', split));
diff --git a/scripts/train.py b/scripts/train.py
index 9e83a1a..2eafbf5 100644
--- a/scripts/train.py
+++ b/scripts/train.py
@@ -28,6 +28,7 @@ from sklearn.linear_model import LogisticRegression
 
 ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
 BUILD = os.path.join(ROOT, 'build')
+DEFAULT_OUT = os.path.join(ROOT, 'model', 'model.bin')
 
 
 def log(*a):
@@ -176,8 +177,9 @@ def main():
     ap.add_argument('--keep-tool', type=int, default=20000)
     ap.add_argument('--keep-tag', type=int, default=24000)
     ap.add_argument('--holdout', type=float, default=0.15)
+    ap.add_argument('--ood-holdout', type=float, default=0.35)
     ap.add_argument('--seed', type=int, default=13)
-    ap.add_argument('--out', default=os.path.join(ROOT, 'model', 'model.bin'))
+    ap.add_argument('--out', default=DEFAULT_OUT)
     args = ap.parse_args()
     t0 = time.time()
     meta = json.load(open(os.path.join(BUILD, 'meta.json')))
@@ -192,6 +194,11 @@ def main():
     gids = np.array([r['gid'] for r in rows])
     ug = np.unique(gids)
     ho_g = set(rng.choice(ug, int(len(ug) * args.holdout), replace=False).tolist())
+    # out-of-domain groups drive both thresholds: hold out a larger share of them (--ood-holdout) so the
+    # compose threshold is not calibrated on a few dozen rows
+    ood_g = np.unique([r['gid'] for r in rows if r['g'] == 'ood'])
+    ho_g -= set(ood_g.tolist())
+    ho_g |= set(rng.choice(ood_g, int(len(ood_g) * args.ood_holdout), replace=False).tolist()) if len(ood_g) else set()
     is_ho = np.array([g in ho_g for g in gids])
     # evaluate on the original (non-augmented) sentence of each group only: first row of the group
     first = np.zeros(len(rows), bool)
@@ -208,7 +215,10 @@ def main():
     res = cascade_scores(p_tool, tool_s['labels'], {f: m['model'] for f, m in int_s.items()}, Xho, fam_intents)
     gold_i = [rows[i]['i'] for i in ho_idx]
     gold_t = [rows[i]['y'] for i in ho_idx]
-    ind = np.array([g != '__none__' and gi != '' for g, gi in zip(gold_t, gold_i)])
+    # thresholds are calibrated on curated rows only: the real-usage rows (g == 'real') carry noisy LLM labels, and
+    # their "errors" would push the accept threshold up (they still train the models)
+    src = [rows[i]['g'] for i in ho_idx]
+    ind = np.array([g != '__none__' and gi != '' and s != 'real' for g, gi, s in zip(gold_t, gold_i, src)])
     oodm = np.array([g == '__none__' for g in gold_t])
     score = np.array([r[1] for r in res])
     correct = np.array([r[0] == gi for r, gi in zip(res, gold_i)])
@@ -226,10 +236,17 @@ def main():
         s = keep_c + 0.5 * rej_o + 0.25 * rej_w
         if s > best_s:
             best_t, best_s = float(t), s
+    if best_s < 0:
+        # no threshold keeps >= 97% of the correct answers: never fall back to "accept everything";
+        # take the highest threshold that still keeps >= 90%, else a conservative default
+        ok = [float(t) for t in np.arange(0.02, 0.6, 0.005) if (score[ind & correct] >= t).mean() >= 0.90]
+        best_t = max(ok) if ok else 0.3
+        log(f'WARNING: no accept threshold keeps 97% of correct answers; using {best_t:.3f}')
     # compose threshold: stage-1 top tool probability (non-__none__) that lets <=5% of OOD through
     top_nn = np.array([r[2] if r[3] != '__none__' else 0.0 for r in res])
     cands = [t for t in np.arange(0.1, 0.95, 0.01) if (top_nn[oodm] >= t).mean() <= 0.05] if oodm.any() else [0.5]
     compose_t = float(cands[0]) if cands else 0.9
+    log(f'calibration rows: {int(ind.sum())} in-domain, {int(oodm.sum())} out-of-domain')
     log(f'accept threshold={best_t:.3f} (correct kept={(score[ind & correct] >= best_t).mean():.3f}, '
         f'OOD rejected={(score[oodm] < best_t).mean() if oodm.any() else float("nan"):.3f}); compose tool threshold={compose_t:.2f}')
 
@@ -301,8 +318,10 @@ def main():
         return e / e.sum()
 
     fx = {'cls': [], 'tag': []}
-    step = max(1, len(rows) // 30)
-    for r in rows[::step][:30]:
+    # never a private real-usage row (hashed n-grams of its text): curated rows only
+    pub = [r for r in rows if r['g'] != 'real']
+    step = max(1, len(pub) // 30)
+    for r in pub[::step][:30]:
         p = q_proba('tool', r['f'])
         fx['cls'].append({'model': 'tool', 'f': r['f'], 'top': [[header['models']['tool']['labels'][i], float(p[i])] for i in np.argsort(-p)[:3]]})
         fam = r['y']
@@ -314,9 +333,12 @@ def main():
         for f in s['f'][:3]:
             p = q_proba('tagger', [(k, 1.0) for k in sorted(set(f))])
             fx['tag'].append({'f': sorted(set(f)), 'top': [[header['models']['tagger']['labels'][i], float(p[i])] for i in np.argsort(-p)[:2]]})
-    with open(os.path.join(ROOT, 'test', 'fixtures', 'parity.json'), 'w', encoding='utf-8') as f:
+    # the fixture belongs to the shipped model: written next to any other --out file, never over the test fixture
+    shipped = os.path.abspath(args.out) == os.path.abspath(DEFAULT_OUT)
+    parity = os.path.join(ROOT, 'test', 'fixtures', 'parity.json') if shipped else os.path.splitext(args.out)[0] + '.parity.json'
+    with open(parity, 'w', encoding='utf-8') as f:
         json.dump(fx, f)
-    log(f'wrote test/fixtures/parity.json; done in {time.time() - t0:.0f}s')
+    log(f'wrote {os.path.relpath(parity, ROOT)}; done in {time.time() - t0:.0f}s')
 
 
 if __name__ == '__main__':

codex
The latest fixes cover several PR targeting cases, but the broader diff still needs checking. I’m tracing history resolution and operand extraction, and checking whether the training split keeps related commands together.

exec
/bin/bash -lc "cat test/regressions19.test.js; nl -ba scripts/real/prepare_real.js | sed -n '25,175p'; rg -n '"'^export|''^function|GH_|gh|PR_'"' src/history.js src/fill.js" in /workspace/tellsh
 succeeded in 0ms:
// Regression tests for round 18: the round-17 findings (review/r17-claude.md, review/r17-codex.md). A pull request (or
// branch) read from history is ambiguous after a trailing cd/pushd/popd or under GH_REPO/GH_HOST; "the other pr", "the
// latest pr", "my last pr" never become the current branch's pull request; a repository the request names is kept as
// `--repo` or withheld, never dropped; "close that pr" is refused instead of `gh pr create`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'pwsh', os: 'windows' }, { shell: 'cmd', os: 'windows' }];
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });
const withheld = (r, cmd, slots, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual([...r.missing].sort(), [slots].flat().sort(), msg);
};
const exact = (r, cmd, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual(r.missing, [], msg);
};

test('major: a cd after `gh pr view N` makes the pull request ambiguous (another repository)', () => {
  for (const env of SHELLS) {
    for (const h of ['gh pr view 7 && cd ../other', 'gh pr view 7 && cd /', 'gh pr view 7; popd', 'gh pr checkout 7; pushd /srv/x',
      'gh pr view feature/x && cd ~/other']) {
      for (const q of ['merge that pr', 'merge this pull request']) withheld(run(q, [h], env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
    // a cd before the gh command: the pull request is one of the repository the user is in now
    exact(run('merge that pr', ['cd ../other && gh pr view 7'], env), 'gh pr merge 7', env.shell);
    exact(run('merge that pr', ['gh pr view 7'], env), 'gh pr merge 7', env.shell);
  }
  // a branch is repository-scoped as well
  for (const h of ['git checkout -b feat && cd ../other', 'git merge feat; cd /']) withheld(run('delete that branch', [h]), 'git branch -d <BRANCH>', 'branch', h);
  exact(run('delete that branch', ['git merge feat']), 'git branch -d feat');
});

test('major: GH_REPO / GH_HOST scope the pull request of the previous command', () => {
  for (const env of SHELLS) {
    for (const h of ['GH_REPO=other/repo gh pr view 45', 'env GH_REPO=other/repo gh pr view 45', 'GH_HOST=ghe.example.com gh pr view 45',
      'export GH_REPO=other/repo; gh pr view 45', 'export GH_REPO=other/repo && gh pr checkout 45']) {
      withheld(run('merge that pr', [h], env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${h}`);
    }
  }
  // other variables do not scope gh
  exact(run('merge that pr', ['FOO=1 gh pr view 45']), 'gh pr merge 45');
});

test('major: a pull request picked out among several is never the current branch\'s', () => {
  for (const env of SHELLS) {
    for (const q of ['merge the other pr', 'merge the latest pr', 'merge the newest pr', 'merge the most recent pr', 'merge my last pr',
      'merge another pr', 'merge the other pull request', 'merge our previous pr', 'merge the latest open pr', 'merge the first pr',
      'view the newest pr']) {
      const r = run(q, null, env);
      assert.match(r.command, /^gh pr (?:merge|view) <PR>$/, `${env.shell}: ${q}`);
      assert.deepEqual(r.missing, ['pr'], `${env.shell}: ${q}`);
    }
    // also with a pull request in history: "the other pr" is not that one, "my last pr" is not the one viewed
    for (const q of ['merge the other pr', 'merge my last pr', 'merge the latest pr']) withheld(run(q, ['gh pr view 45'], env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
  }
  // a named pull request wins; nothing named is still the current branch's
  exact(run('merge pr 45, the latest one'), 'gh pr merge 45');
  for (const q of ['merge the pr', 'merge pr', 'merge the current pr', 'first merge the pr']) exact(run(q), 'gh pr merge', q);
});

test('major: a repository the request names is kept as --repo or withheld, never dropped', () => {
  for (const env of SHELLS) {
    const cases = {
      'merge pr 45 in repository other/repo': 'gh pr merge 45 --repo other/repo',
      'merge pr 45 --repo other/repo': 'gh pr merge 45 --repo other/repo',
      'merge pr 45 --repo=other/repo': 'gh pr merge 45 --repo other/repo',
      'merge pr 45 -R other/repo': 'gh pr merge 45 --repo other/repo',
      'merge pr 45 in repo other/repo': 'gh pr merge 45 --repo other/repo',
      'merge pr 45 in the other/repo repository': 'gh pr merge 45 --repo other/repo',
      'merge pr #12 in repo acme/web': 'gh pr merge 12 --repo acme/web',
      'view pr 45 in repo a/b': 'gh pr view 45 --repo a/b',
    };
    for (const [q, cmd] of Object.entries(cases)) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
    // a repository that cannot be read: placeholder
    for (const q of ['merge pr 45 in another repo', 'merge pr 45 in the other repository', 'merge pr 45 in repo v2', 'merge pr 45 --repo',
      'merge pr 45 in repo "a/b;rm"']) withheld(run(q, null, env), 'gh pr merge 45 --repo <REPO>', 'repo', `${env.shell}: ${q}`);
    // gh needs the pull request named together with --repo
    withheld(run('merge pr --repo other/repo', null, env), 'gh pr merge <PR> --repo other/repo', 'pr', env.shell);
    withheld(run('merge the pr in repo other/repo', null, env), 'gh pr merge <PR> --repo other/repo', 'pr', env.shell);
    // "that pr" was one of this repository's: not the pull request of another one
    withheld(run('merge that pr in repo a/b', ['gh pr view 45'], env), 'gh pr merge <PR> --repo a/b', 'pr', env.shell);
  }
  // the working directory's repository is no qualifier
  for (const q of ['merge pr 45 in this repo', 'merge pr 45 in the current repository', 'merge pr 45']) exact(run(q), 'gh pr merge 45', q);
  // a lowercase -r is not gh's -R
  withheld(run('merge pull request -rf'), 'gh pr merge <PR>', 'pr');
});

test('minor: closing a pull request is refused, never `gh pr create` or `gh pr view`', () => {
  for (const env of SHELLS) {
    for (const q of ['close that pr', 'close the pr', 'close pr 45', 'close pull request 45', 'zamknij ten pr']) {
      const r = run(q, null, env);
      assert.equal(r.understood, false, `${env.shell}: ${q}`);
      assert.ok(!r.command, `${env.shell}: ${q}`);
    }
    assert.equal(run('close that pr', ['gh pr view 45'], env).command ?? null, null, env.shell);
  }
  for (const [q, cmd] of Object.entries({ 'create a pr': 'gh pr create --fill', 'show closed prs': 'gh pr list', 'view pr 45': 'gh pr view 45' })) {
    assert.equal(run(q).command, cmd, q);
  }
});

test('minor: switches of gh pr subcommands are not read as taking a value', () => {
  for (const h of ['gh pr view -c 7', 'gh pr review -a 7', 'gh pr review -c 7', 'gh pr comment -e 7']) exact(run('merge that pr', [h]), 'gh pr merge 7', h);
  withheld(run('merge that pr', ['gh pr checkout -b local 7 --repo a/b']), 'gh pr merge <PR>', 'pr');
});
    25	const args = process.argv.slice(2);
    26	const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
    27	const SRC = arg('--data', process.env.TELLSH_REAL_DATA || '/workspace/tellsh-data/dataset.jsonl');
    28	const EVAL_FRAC = +arg('--eval-frac', 0.25);
    29	if (!existsSync(SRC)) { console.error(`prepare_real: no dataset at ${SRC}`); process.exit(1); }
    30	
    31	// v0.4 intents: label = the command itself (sudo / npx / env prefixes stripped)
    32	const NEW = [
    33	  ['wrangler_deploy', /^wrangler (deploy|publish)\b/],
    34	  ['wrangler_dev', /^wrangler dev\b/],
    35	  ['wrangler_tail', /^wrangler tail\b(?!.*--help)/],
    36	  ['wrangler_secret_put', /^wrangler secret put\b/],
    37	  ['wrangler_login', /^wrangler login\b/],
    38	  ['wrangler_whoami', /^wrangler whoami\b/],
    39	  ['gh_auth_status', /^gh auth status\b/],
    40	  ['gh_auth_login', /^gh auth login\b/],
    41	  ['gh_pr_list', /^gh pr list\b/],
    42	  ['gh_pr_view', /^gh pr view\b/],
    43	  ['gh_pr_create', /^gh pr create\b/],
    44	  ['gh_pr_checks', /^gh pr checks\b/],
    45	  ['gh_pr_merge', /^gh pr merge\b/],
    46	  ['gh_run_list', /^gh run list\b/],
    47	  ['gh_run_view', /^gh run view\b/],
    48	  ['npm_install_global', /^npm (i|install)\b.*\s(-g|--global)\b/],
    49	  ['npm_install', /^npm (i|install|ci)\b(?!.*\s(-g|--global)\b)/],
    50	  ['npm_run_script', /^npm(?: --prefix \S+)? (?:run(?:-script)? [\w:.-]+|test|start|t)(?:\s|$)/],
    51	  ['pip_install', /^(?:pip3?|python3?(?:\.\d+)? -m pip) install\b(?!.*\s-(?:r|e)\b)/],
    52	  ['activate_venv', /^(?:source|\.) \S*\/bin\/activate(?:\.fish)?\s*$|\\Scripts\\activate(?:\.bat|\.ps1)?\s*$/i],
    53	  ['ssh_port_forward', /^ssh\b.*\s-\w*L\s?\d+:/],
    54	  ['print_line_range', /^(?:nl -ba \S+ \| )?sed -n ['"]?\d+,\d+p['"]?(?: \S+)?$/],
    55	  ['tool_version', /^[\w.-]+ (?:--version|-v|-V|version)$/],
    56	  ['cli_help', /^[\w.-]+(?: [a-z][\w-]*){0,2} (?:--help|-h|help)$/],
    57	];
    58	const COMPOUND = /^(sleep|cd|for|while|if|echo|printf|bash|sh|zsh|pwd|export|time|timeout|-n|until|then|do)$/;
    59	const strip = (c) => c.trim().replace(/^(?:sudo |npx (?:-y )?|env \w+=\S+ )+/, '');
    60	function newIntentOf(cmd) {
    61	  const c = strip(cmd);
    62	  for (const [id, re] of NEW) if (re.test(c)) return id;
    63	  return null;
    64	}
    65	
    66	// value-masked command skeleton (see header)
    67	function group(cmd) {
    68	  const w = strip(cmd).split(/\s+/);
    69	  const head = [w[0]];
    70	  let i = 1;
    71	  while (i < w.length && head.length < 3 && /^[a-z][a-z-]*$/.test(w[i])) head.push(w[i++]);
    72	  const flags = new Set();
    73	  let ops = 0;
    74	  for (; i < w.length; i++) {
    75	    if (/^-{1,2}[A-Za-z][\w-]*/.test(w[i])) flags.add(w[i].replace(/=.*/, ''));
    76	    else if (!/^[|;&]/.test(w[i])) ops++;
    77	  }
    78	  return `${head.join(' ')} ${[...flags].sort().join(' ')} #${Math.min(ops, 3)}`;
    79	}
    80	
    81	// redaction placeholders -> plausible values (same value in the command and its descriptions)
    82	const USERS = ['alex', 'kasia', 'dev', 'mike', 'ola', 'jan', 'sam', 'deploy'];
    83	const h = (s) => createHash('sha256').update(s).digest();
    84	function fill(s, seed) {
    85	  return s.replace(/<USER>/g, USERS[seed[0] % USERS.length]).replace(/<EMAIL>/g, 'someone@example.com')
    86	    .replace(/<HEX>/g, seed.toString('hex').slice(0, 12)).replace(/<(PASSWORD|SECRET)>/g, 'xxxxxx');
    87	}
    88	
    89	const rows = readFileSync(SRC, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
    90	const st = { commands: 0, skippedNotGeneric: 0, skippedUnverified: 0, byLabelSource: { pattern: 0, dataset: 0, outOfCatalog: 0 }, relabelled: 0, droppedCompound: 0 };
    91	const cmds = [];
    92	for (const r of rows) {
    93	  if (!r.generic) { st.skippedNotGeneric++; continue; }
    94	  if (!r.verified || !r.descriptions_en?.length) { st.skippedUnverified++; continue; }
    95	  const seed = h(r.cmd_redacted);
    96	  const cmd = fill(r.cmd_redacted, seed);
    97	  let intent = newIntentOf(cmd);
    98	  if (intent) { st.byLabelSource.pattern++; if (r.intent_or_null && r.intent_or_null !== intent) st.relabelled++; }
    99	  else if (r.intent_or_null && BY_ID[r.intent_or_null]) {
   100	    // `sleep 30; cp …`, `cd x && cat …`, `for …`: a compound command is not one catalog intent (dataset label dropped)
   101	    const head = strip(cmd).split(/[\s;]+/)[0];
   102	    if (COMPOUND.test(head) && !(head === 'echo' && ['env_var_get', 'show_path'].includes(r.intent_or_null))) { st.droppedCompound++; continue; }
   103	    intent = r.intent_or_null; st.byLabelSource.dataset++;
   104	  }
   105	  else { intent = null; st.byLabelSource.outOfCatalog++; }
   106	  const shell = r.shell === 'powershell' ? 'powershell' : r.shell || 'bash';
   107	  const os = r.os === 'windows' ? 'win32' : r.os || 'linux';
   108	  cmds.push({ cmd, intent, shell, os, group: group(cmd), seed, src: r.source_type,
   109	    texts: [...r.descriptions_en.map((t) => [t, 'en']), ...r.descriptions_pl.map((t) => [t, 'pl'])] });
   110	  st.commands++;
   111	}
   112	
   113	// group-wise split, per label (null = out-of-catalog counts as one label)
   114	const byLabel = new Map();
   115	for (const c of cmds) {
   116	  const k = c.intent || '__ooc__';
   117	  if (!byLabel.has(k)) byLabel.set(k, new Map());
   118	  const g = byLabel.get(k);
   119	  g.set(c.group, (g.get(c.group) || 0) + 1);
   120	}
   121	const evalGroups = new Set();
   122	for (const [label, groups] of byLabel) {
   123	  if (groups.size < 2) continue;
   124	  const total = [...groups.values()].reduce((a, b) => a + b, 0);
   125	  const order = [...groups.keys()].sort((a, b) => h(label + a).compare(h(label + b)));
   126	  let n = 0;
   127	  for (const g of order) {
   128	    if (n >= EVAL_FRAC * total) break;
   129	    if (n + groups.get(g) > 0.5 * total) continue; // never hold out more than half of a label
   130	    evalGroups.add(label + '\u0000' + g);
   131	    n += groups.get(g);
   132	  }
   133	}
   134	
   135	const out = [];
   136	const norm = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
   137	for (const c of cmds) {
   138	  const split = evalGroups.has((c.intent || '__ooc__') + '\u0000' + c.group) ? 'eval' : 'train';
   139	  for (const [t, lang] of c.texts) {
   140	    if (!t || t.length > 300) continue;
   141	    const text = fill(t, c.seed);
   142	    out.push({ text, intent: c.intent, lang, shell: c.shell, os: c.os, group: c.group, split, cmd: c.cmd,
   143	      literal: norm(text) === norm(c.cmd), src: c.src });
   144	  }
   145	}
   146	// a text that occurs in both splits (short generic descriptions) is held out: dropped from train
   147	const evalTexts = new Set(out.filter((r) => r.split === 'eval').map((r) => norm(r.text)));
   148	const final = out.filter((r) => r.split === 'eval' || !evalTexts.has(norm(r.text)));
   149	st.droppedTrainTextInEval = out.length - final.length;
   150	
   151	const cnt = (f) => final.filter(f).length;
   152	Object.assign(st, {
   153	  rows: final.length,
   154	  train: { rows: cnt((r) => r.split === 'train' && r.intent), oocRows: cnt((r) => r.split === 'train' && !r.intent) },
   155	  eval: { rows: cnt((r) => r.split === 'eval' && r.intent), oocRows: cnt((r) => r.split === 'eval' && !r.intent),
   156	    en: cnt((r) => r.split === 'eval' && r.intent && r.lang === 'en'), pl: cnt((r) => r.split === 'eval' && r.intent && r.lang === 'pl'),
   157	    literal: cnt((r) => r.split === 'eval' && r.intent && r.literal),
   158	    newIntents: cnt((r) => r.split === 'eval' && r.intent && NEW.some(([id]) => id === r.intent)),
   159	    byShell: Object.fromEntries(['bash', 'zsh', 'powershell'].map((s) => [s, cnt((r) => r.split === 'eval' && r.intent && r.shell === s)])) },
   160	  labels: { train: new Set(final.filter((r) => r.split === 'train' && r.intent).map((r) => r.intent)).size,
   161	    eval: new Set(final.filter((r) => r.split === 'eval' && r.intent).map((r) => r.intent)).size },
   162	  groups: { total: new Set(cmds.map((c) => c.group)).size, eval: evalGroups.size },
   163	  perNewIntent: Object.fromEntries(NEW.map(([id]) => [id, { train: cnt((r) => r.intent === id && r.split === 'train'), eval: cnt((r) => r.intent === id && r.split === 'eval') }])),
   164	});
   165	mkdirSync(join(ROOT, 'build', 'real'), { recursive: true });
   166	writeFileSync(join(ROOT, 'build', 'real', 'rows.jsonl'), final.map((r) => JSON.stringify(r)).join('\n') + '\n');
   167	writeFileSync(join(ROOT, 'build', 'real', 'stats.json'), JSON.stringify(st, null, 1));
   168	console.log(JSON.stringify({ commands: st.commands, rows: st.rows, train: st.train, eval: st.eval, labels: st.labels, groups: st.groups }));
src/history.js:14:export { isAmbiguous };
src/history.js:19:export function historyCandidates(shell, env = process.env, os = process.platform) {
src/history.js:38:function readTail(path, maxBytes = 32768) {
src/history.js:52:function unmetafy(buf) {
src/history.js:61:export function parseHistory(text, kind = 'bash', { partial = false } = {}) {
src/history.js:88:export function loadHistory({ shell = 'bash', file, n = 2, env = process.env, os = process.platform } = {}) {
src/history.js:121:// PowerShell string cannot end right before another quote (`''''` is one string, not two).
src/history.js:127:function inverters() {
src/history.js:161:function invert(cmd, kind = 'posix') {
src/history.js:210:function psArgs(args) {
src/history.js:232:function destEnts(srcs, dst, ents) {
src/history.js:242:// options that take a value, per command (so `kill -s 9 4242` or `pkill nginx -u bob` pick the right word)
src/history.js:259:function parseArgs(args, valueOpts = new Set()) {
src/history.js:279:function unwrap(w) {
src/history.js:289:export const isRelativePath = (v) => {
src/history.js:295:function staleRelative(ents, slots) {
src/history.js:301:function staleRepo(ents, slots) {
src/history.js:310:function psNative(head, args, ents, setIntent) {
src/history.js:350:function entsFromSlots(intent, slots, ents) {
src/history.js:379:export function tellshQuery(line, kind = 'posix') {
src/history.js:385:export function tellshArgs(line, kind = 'posix') {
src/history.js:411:export function analyzeCommand(line, classify, kind = 'posix') {
src/history.js:482:    // `export GH_REPO=a/b; gh pr view 45`, `$env:DOCKER_HOST = …`: the later commands of the line are scoped as well
src/history.js:597:  // gh has no global options: GH_REPO / GH_HOST (also exported earlier in the line) point it at another repository
src/history.js:598:  gh: /^-R|^--repo(?:=|$)/,
src/history.js:600:const SCOPE_ENV = /^(?:GIT_DIR|GIT_WORK_TREE|GIT_NAMESPACE|DOCKER_HOST|DOCKER_CONTEXT|DOCKER_CONFIG|CONTAINER_HOST|CONTAINER_CONNECTION|GH_REPO|GH_HOST)=/;
src/history.js:602:function scopedElsewhere(w, raw, exported = false) {
src/history.js:661:function wrapperScope(w, raw) {
src/history.js:683:function markScoped(o) {
src/history.js:687:function afterGlobals(head, args) {
src/history.js:695:function listedBySegment(w, pipedIn, k) {
src/history.js:737:function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
src/history.js:804:  } else if (head === 'gh' && nonFlags[0] === 'pr' && GH_PR_SELECTS.has(nonFlags[1])) {
src/history.js:805:    // `gh pr view 45`, `gh pr checkout feature/x`, `gh pr merge <url>`: the pull request ("merge that pr"); none named is
src/history.js:807:    const { pos, opts } = parseArgs(args.slice(args.indexOf(nonFlags[1]) + 1), GH_PR_VALUE_OPTS);
src/history.js:891:// gh pr subcommands whose operand selects one pull request, and the options of those that take a value
src/history.js:892:const GH_PR_SELECTS = new Set(['view', 'checkout', 'co', 'merge', 'close', 'reopen', 'diff', 'checks', 'review', 'ready', 'edit', 'comment']);
src/history.js:893:const GH_PR_VALUE_OPTS = new Set(['-R', '--repo', '--json', '-q', '--jq', '-t', '--template', '--title', '-b', '--body', '-F',
src/history.js:913:export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
src/history.js:946:export function cwdFlags(cwd) {
src/history.js:957:export function ctxFeatures(ctx) {
src/history.js:1006:export const hasLocative = (q) => LOCATIVE.test(fold(q));
src/history.js:1062:const NOT_REF = /\b(?:that|which|this)\s+(?:are|is|was|were|have|has|had|(?:contain|match|end|start|begin|use|take|listen|run|belong|need)(?:s|es|ed|d|ing)?|running|using|taking|ran|took|do|does|did|can|could|will|would|should|i|you|we|they)\b|\b(?:this|that|last|next)\s+(?:week|month|year|day|morning|evening|afternoon|night|time|hour|minute)s?\b/g;
src/history.js:1064:export const hasPronoun = (q) => PRONOUN_EN.test(refText(q)) || PRONOUN_PL.test(refText(q));
src/history.js:1067:export function sameFor(q) {
src/history.js:1077:function retarget(intent, arg) {
src/history.js:1101:export function resolveReference(query, ctx) {
src/history.js:1196:function locativeRef(fq, ctx) {
src/history.js:1216:export function changeGuard(type, value, fq, ctx) {
src/history.js:1249:export function entityForSlot(slot, ctx) {
src/history.js:1264:export function sameBut(query, ctx) {
src/history.js:1274:function intentUses(intent, ent) {
src/history.js:1278:function pickEnt(intent, ent, ctx) {
src/fill.js:7:export { shQuote };
src/fill.js:10:export const RAW_OK = {
src/fill.js:25:  // a repository as gh -R takes it: [HOST/]OWNER/REPO
src/fill.js:27:  // a pull request as gh selects it: number, URL or head branch
src/fill.js:34:const PR_SELECTOR = /\b(?:pull[\s-]+requests?|pr|prs)\s+((?:(?:for|of|on|from|branch|number|no\.?|nr\.?|(?:the|a|my|our)(?=\s+branch\b))\s+)*)(?:(?:"([^"]*)"|'([^']*)'|`([^`]*)`|[„“”]([^„“”"]*)[“”])(?=[\s.,!?;:]|$)|(#?[^\s"'`„“”]+?)[.,!?]?(?=\s|$)|(["'`„“”]))/i;
src/fill.js:38:// another unmarked word, `nightly`, is withheld
src/fill.js:39:const PR_NOT_SELECTOR = /^(?:the|a|an|this|that|it|its|my|our|your|their|me|us|you|him|her|them|and|or|then|now|please|pls|into|to|with|without|in|at|by|is|was|which|again|request|requests|status|state|checks?|details?|info|summary|description|diff|changes|comments?|github|gh|web|browser|online|here|there|today|yesterday|tomorrow|earlier|later|review|fork|upstream|fast|asap|already|first|too|also|quickly|immediately|directly|safely|manually|automatically|finally|only|just|really|simply|properly|carefully|right|soon|instantly|issues?|tickets?|bugs?)$/i;
src/fill.js:42:const PR_MARKED = /[\d/_.#-]/;
src/fill.js:44:const PR_ABBREV = /^(?:e\.g|i\.e|w\/o|w\/|etc|vs|cf|a\.k\.a|n\/a|b\/c)$/i;
src/fill.js:45:const PR_HOST = /^(?:[\w-]+\.)+(?:com|org|net|io|dev|app|co|me)$/i;
src/fill.js:46:// a number names the pull request only right after "pr" / "pull request" (`pr 45`, `pr #45`, `pr number 45`) or as `#45`
src/fill.js:47:const PR_NUMBER_LEAD = /^(?:(?:number|no\.?|nr\.?)\s+)*$/i;
src/fill.js:48:const PR_WORD = /\b(?:pull[\s-]+requests?|pr|prs)\b/i;
src/fill.js:50:const PR_ISSUE = /^(?:issues?|tickets?|bugs?)$/i;
src/fill.js:52:const PR_UNIT_AFTER = /^\s+(?:secs?|seconds?|mins?|minutes?|hours?|hrs?|days?|weeks?|months?|years?|times?|ago|old|more|approvals?|reviews?|reviewers?|commits?|files?|lines?|changes?|comments?|checks?)\b/i;
src/fill.js:55:const PR_HASH_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit)\s+)+$/i;
src/fill.js:57:const PR_BRANCH_NAMED = /\b(?:for|of|on|from)\s+(?:\S+\s+){0,2}branch\b/i;
src/fill.js:59: * The pull request the user names (quoted: kept as written, validation withholds an odd one), else null (`gh pr merge`
src/fill.js:62: * is withheld (`?`, shown as `<PR>`), never a bare `gh pr merge`.
src/fill.js:64:function prSelector(ex) {
src/fill.js:67:  const m = text.match(PR_SELECTOR);
src/fill.js:75:    if (PR_ISSUE.test(w)) return '?';
src/fill.js:77:    if (/^#?\d+$/.test(w) && PR_UNIT_AFTER.test(rest)) return '?';
src/fill.js:78:    if (/^\d+$/.test(w)) return branch || PR_NUMBER_LEAD.test(m[1]) ? w : '?';
src/fill.js:80:    if (/^#\d+$/.test(w) && !PR_NUMBER_LEAD.test(m[1])) return '?';
src/fill.js:81:    if (PR_ABBREV.test(w) || (PR_HOST.test(w) && !branch)) return '?';
src/fill.js:82:    if (PR_MARKED.test(w)) return w;
src/fill.js:84:    if (branch) return PR_NOT_SELECTOR.test(w) ? `?${w}` : w;
src/fill.js:85:    if (!PR_NOT_SELECTOR.test(w)) {
src/fill.js:88:      // "merge pr main": a bare word may be a branch or say something else: withheld (`gh pr merge <PR>`), never dropped
src/fill.js:93:  if (hash && PR_HASH_LEAD.test(text.slice(0, hash.index + hash[0].indexOf('#')))) return hash[1];
src/fill.js:98:  const p = text.match(PR_WORD);
src/fill.js:100:  if (ex.numbers?.length || /\d/.test(text) || /[/_#'"`„“”’]|\w[.-]\w/.test(after) || PR_BRANCH_NAMED.test(after)) return '?';
src/fill.js:105:const PR_REPO_OPT = /(?:^|\s)(?:--repo(?:=|\s+|$)|-R(?:=|\s*))(\S*)/;
src/fill.js:106:const PR_REPO = /\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(?:github\s+)?(?:repo|repository|repozytorium)\s+(\S+)|\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(\S+(?:\s+\S+)?)\s+(?:github\s+)?(?:repo|repository)\b|\b(?:w|z)\s+repozytorium\s+(\S+)/i;
src/fill.js:107:const PR_REPO_HERE = /^(?:this|current|the\s+current|same|the\s+same|our|my|local|the\s+local|tym|tego|bieżącym|biezacym)$/i;
src/fill.js:108:/** The repository a gh pr request names: { repo (a value, or `?` when it is not readable), rest (the text without it) } or null. */
src/fill.js:109:function prRepo(text) {
src/fill.js:110:  const m = text.match(PR_REPO_OPT) || text.match(PR_REPO);
src/fill.js:113:  if (m[2] != null && PR_REPO_HERE.test(w)) return null;
src/fill.js:126:export function finalizeSlots(intent, v) {
src/fill.js:134:export function resolveSlots(intent, ex) {
src/fill.js:140:  // "grep for ~/foo in src": the path-like word right after the search verb is the pattern, the other
src/fill.js:203:  // line range: "lines 10-20", "od 10 do 20", "10 to 20", "from line 5 through 9"; else the first two numbers
src/fill.js:205:    const m = String(ex.text).match(/(?<![\w.])(\d{1,9})\s*(?:-|–|—|\.\.|,|:|to|do|through|thru|until|till|and|i)\s*(?:line\s+|linii\s+|linia\s+)?(\d{1,9})(?![\w.])/i);
src/fill.js:217:    // ("in the other repo", "in repo v2") withheld, never dropped; gh needs a pull request named with it
src/fill.js:221:    // dropped for a bare `gh pr merge`, which acts on the current branch's pull request
src/fill.js:275:function renderValue(name, raw, values, quote) {
src/fill.js:289:export function render(template, values, required = [], quote = shQuote, keepOptional = []) {
src/fill.js:323:export function deriveSlots(v) {
src/fill.js:337:export const envFromPlatform = (platform = process.platform) => ({
src/fill.js:349:export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [], keepOptional = [] } = {}) {

exec
/bin/bash -lc "sed -n '410,610p' src/history.js; sed -n '735,835p' src/history.js; sed -n '1095,1195p' src/history.js" in /workspace/tellsh
 succeeded in 0ms:
 */
export function analyzeCommand(line, classify, kind = 'posix') {
  let ents = {};
  let intent = null;
  let slots = {};
  let ambiguous = false;
  const t = line.trim();
  const k = lineKind(t, kind);
  if (TELLSH_LINE.test(t)) {
    const qa = tellshArgs(t, k);
    // a request that cannot be read back: it may have named any file or directory
    if (qa === false) return { line: t, intent, slots, ents: { file: AMB + t, dir: AMB + t }, at: {}, listed: { file: 0, dir: 0 }, opaque: true, fromTellsh: true, ambiguous: true };
    const q = qa?.text;
    const r = q && classify ? classify(q, qa.unclear) : null;
    if (r?.intent) { intent = r.intent; slots = { ...(r.slots || {}) }; entsFromSlots(intent, slots, ents); }
    // `tellsh list directory /tmp/build`: like `ls /tmp/build`, the user saw the entries of the directory
    const sr = isSearchRoot(intent, slots, ents);
    const ld = !sr && ents.dir != null && (FAMILY_OF[intent] === 'ls' || intent === 'largest_dirs');
    const listed = Object.fromEntries(listedByIntent(intent).map((x) => [x, 0]));
    return { line: t, intent, slots, ents, at: {}, listed, ...(sr ? { searchDir: true } : {}), ...(ld ? { listDir: true } : {}), fromTellsh: true, ambiguous };
  }
  const split = splitCommand(t, k, { keepRedirects: true });
  if (!split.ok) {
    // cannot interpret the line (unterminated quote, heredoc, ...): it may name any file or directory,
    // so older file/dir values must not be picked up by "it"
    ents.file = AMB + t;
    ents.dir = AMB + t;
    return { line: t, intent, slots, ents, at: {}, listed: { file: 0, dir: 0 }, opaque: true, ambiguous: true };
  }
  const inv = invert(t, k);
  let segIntent = null;
  let segSlots = {};
  let segIntentAt = -1;
  let intentStale = false;
  let cdAt = -1;
  let scoped = false;
  let exportedScope = false;
  let wrapCwd = false;
  const subCds = new Set(); // ids of `( … )` subshells in which a cd ran (posix)
  let searchDir = false;
  let listDir = false;
  const at = {};
  const listed = {}; // entity type -> index of the newest segment that listed values of that type
  // segments from..to-1 are connected by pipes only
  const samePipe = (from, to) => from >= 0 && split.segments.slice(from, to).every((s) => s.sep === '|');
  const firstWord = (s) => unwrap(s.words.filter((x) => !REDIR_TARGET_OP.test(x) && !REDIR_DUP_OP.test(x)))[0];
  split.segments.forEach(({ words, subs }, segIdx) => {
    const e = {};
    const setIntent = (id, s) => { segIntent = id; segSlots = s; segIntentAt = segIdx; };
    // redirections: the target is a file the command wrote (or read); it is not an argument
    let w = [];
    let redirTarget = null;
    for (let i = 0; i < words.length; i++) {
      const x = words[i];
      if (REDIR_DUP_OP.test(x)) continue;
      if (REDIR_TARGET_OP.test(x)) {
        const target = words[i + 1];
        i++;
        if (target != null && !/^\/dev\/(?:null|stdout|stderr|tty)$|^(?:\$null|NUL)$/i.test(rawOf(target))) redirTarget = target;
        continue;
      }
      w.push(x);
    }
    // wrappers (`sudo -u root ls`, `env ls`, `command ls`, `nice -n 5 ls`, `timeout 5 ps aux`): the command they run
    const raw = w;
    w = unwrap(w);
    // a wrapper whose options could not be read: what ran is unknown, so it may have printed or named anything
    if (!w.length || (w !== raw && /^-/.test(w[0]))) {
      e.file = AMB + raw.join(' '); e.dir = AMB + raw.join(' ');
      for (const x of ENT_TYPES) listed[x] = segIdx;
      w = [];
    }
    // `export GH_REPO=a/b; gh pr view 45`, `$env:DOCKER_HOST = …`: the later commands of the line are scoped as well
    const rw = raw.map((x) => String(rawOf(x)));
    if ((/^(?:export|declare|typeset|set)$/.test(rw[0]) && rw.slice(1).some((x) => SCOPE_ENV.test(x))) ||
      /^\$env:(\w+)$/i.test(rw[0]) && SCOPE_ENV.test(rw[0].slice(5) + '=')) exportedScope = true;
    if (w.length) segmentEnts(w, e, setIntent, split, k, segIdx, firstWord);
    // `git -C /repo blame notes.txt`, `docker --context prod logs web`: "delete it" / "stop it" here would hit a
    // different file / container than the one the command used (never resolved, never repeated)
    if (w.length && scopedElsewhere(w, raw, exportedScope)) {
      scoped = true;
      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x])) e[x] = AMB + rawOf(e[x]);
      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; markScoped(segSlots); }
    }
    // `env -C /repo cat notes.txt`, `sudo -D /repo …`: relative values name files in that directory, not here;
    // `chroot /srv cat /etc/x`: every value names something under the other root
    const ws = w.length && w !== raw ? wrapperScope(w, raw) : null;
    const subCd = k === 'posix' && !!subs?.some((id) => subCds.has(id));
    if (ws === 'root') {
      scoped = true;
      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x])) e[x] = AMB + rawOf(e[x]);
      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; markScoped(segSlots); }
    } else if (ws === 'cwd' || subCd) {
      // also `(cd /repo && cat notes.txt)`: the cd only lasts inside the subshell, so relative values name files
      // there, while "delete it" runs here
      wrapCwd = true;
      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x]) && isRelativePath(e[x])) e[x] = AMB + rawOf(e[x]);
      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; staleRelative({}, segSlots); }
    }
    // `(cd /repo && echo hi > notes.txt)`: the redirection opened notes.txt in /repo, not here (a wrapper's
    // redirection, `sudo -D /repo cat a > out.txt`, is opened by the calling shell, so it stays)
    if (redirTarget != null) e.file = subCd && !isAmbiguous(redirTarget) && isRelativePath(redirTarget) ? AMB + rawOf(redirTarget) : redirTarget;
    const pipedIn = segIdx > 0 && split.segments[segIdx - 1].sep === '|';
    if (w.length && !isAmbiguous(w[0])) for (const x of listedBySegment(w, pipedIn, k)) listed[x] = segIdx;
    // every command the wrapper chain may run (also when its options are misread): a listing anywhere in it counts
    if (w !== raw) for (const c of commandChains(raw, [], {})) if (c.length && !isAmbiguous(c[0])) for (const x of listedBySegment(c, pipedIn, k)) listed[x] = segIdx;
    // a listing piped into anything (`ls DIR | sort | grep pdf`, `ls -S DIR | head -1`, `gci DIR | Select-Object
    // -First 1`): what the user saw is a selection of the entries inside DIR, never DIR itself
    const piped = split.segments[segIdx].sep.startsWith('|') && !split.segments[segIdx].sep.startsWith('||');
    if (e.listDir && piped) { e.searchDir = true; delete e.listDir; }
    if (e.listCwd) {
      const how = piped ? 'search' : e.listCwd;
      // `cd DIR && ls | grep pdf`: the listing is of DIR
      if (cdAt >= 0 && at.dir === cdAt) { if (how === 'search') { searchDir = true; listDir = false; } else if (!searchDir) listDir = true; }
      delete e.listCwd;
    }
    const head = w.length && !isAmbiguous(w[0]) ? w[0].replace(/^.*[\\/]/, '').toLowerCase() : '';
    if (CD_HEADS.has(head)) {
      // the working directory changes: earlier relative paths (and a relative cd target) are stale
      cdAt = segIdx;
      if (k === 'posix' && subs) subCds.add(subs[subs.length - 1]);
      staleRelative(ents, null);
      staleRepo(ents, null);
      const target = w.slice(1).filter((a) => !/^-/.test(a))[0];
      if (target != null && !isAmbiguous(target) && !isRelativePath(target) && target !== '-') e.dir = target;
      else e.dir = AMB + (target ?? '-');
      delete e.file;
    }
    if (e.dir !== undefined) { searchDir = !!e.searchDir; listDir = !!e.listDir; }
    // `ls ~/Downloads | grep pdf`, `gci DIR | Where-Object …`: the listed directory was filtered, so what
    // the user saw are entries inside it
    // (any later stage of the same pipeline, not only the next one)
    else if (segIdx > 0 && at.dir != null && at.dir < segIdx && samePipe(at.dir, segIdx) && FILTER_HEADS.has(head)) searchDir = true;
    delete e.searchDir;
    delete e.listDir;
    for (const key of Object.keys(e)) at[key] = segIdx;
    Object.assign(ents, e); // later segments supersede earlier ones
  });
  if (inv && cdAt < 0) {
    // the whole line is a catalog/variant command: its slots are the most precise reading
    intent = inv.intent; slots = inv.slots; ambiguous = inv.ambiguous;
    if (scoped) { slots = { ...slots }; markScoped(slots); }
    if (wrapCwd) { slots = { ...slots }; staleRelative({}, slots); }
    const ie = {};
    entsFromSlots(intent, slots, ie);
    for (const key of Object.keys(ie)) at[key] = split.segments.length;
    if (ie.dir !== undefined) {
      // a piped/filtered listing found above stays a search root even when the line is a catalog command
      const piped = searchDir && String(ie.dir) === String(ents.dir);
      searchDir = isSearchRoot(intent, slots, ie) || piped;
      listDir = !searchDir && (['ls', 'find'].includes(FAMILY_OF[intent]) || intent === 'largest_dirs');
    }
    ents = { ...ents, ...ie };
  } else if (segIntent) {
    intent = segIntent; slots = { ...segSlots };
    if (segIntentAt < cdAt) { staleRelative({}, slots); staleRepo({}, slots); }
    // `kill 1111; ls newdir`: another command ran after the one tellsh could repeat
    if (split.segments.slice(segIntentAt, -1).some((s) => s.sep !== '|')) intentStale = true;
  }
  if (Object.values(slots).some(isAmbiguous)) ambiguous = true;
  return { line: t, intent, slots, ents, at, ambiguous, ...(searchDir && ents.dir != null ? { searchDir: true } : {}),
    ...(listDir && !searchDir && ents.dir != null ? { listDir: true } : {}), ...(cdAt >= 0 ? { cd: true } : {}),
    ...(intentStale ? { intentStale: true } : {}), ...(scoped ? { scoped: true } : {}), listed,
    // the dir is the `cd` target (`cdFollowed`: another segment ran after the cd)
    ...(cdAt >= 0 && at.dir === cdAt ? { cdDir: true, cdFollowed: cdAt < split.segments.length - 1 } : {}) };
}

// Listings: commands that print many values of an entity type (`ls`, `find`, `ps aux`, `docker ps`, `git branch`).
// After one, "it"/"them" may mean any of the printed values, so an older value of that type is not a safe
// target for a changing command.
const FS_LISTERS = new Set(['ls', 'tree', 'dir', 'gci', 'get-childitem', 'll', 'la', 'find', 'fd', 'fdfind', 'locate', 'mlocate', 'plocate',
  'du', 'ncdu', 'exa', 'eza', 'lsd', 'vdir']);
const FS_SEARCHERS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'select-string', 'sls', 'findstr']);
const PROC_LISTERS = new Set(['ps', 'top', 'htop', 'btop', 'atop', 'pgrep', 'pidof', 'pstree', 'get-process', 'gps', 'tasklist']);
// global options that take a value, before the subcommand (`git -C /tmp status`, `docker --context prod ps`)
const GLOBAL_VALUE_OPTS = {
  git: new Set(['-C', '-c', '--git-dir', '--work-tree', '--namespace', '--super-prefix', '--config-env']),
  docker: new Set(['-H', '--host', '-c', '--context', '--config', '-l', '--log-level', '--tlscacert', '--tlscert', '--tlskey']),
  podman: new Set(['-c', '--connection', '--url', '--identity', '--root', '--runroot', '--cgroup-manager', '--log-level', '--storage-driver',
    '--module', '--events-backend', '--network-cmd-path', '--tmpdir', '--volumepath', '--imagestore', '--hooks-dir', '--conmon', '--runtime', '--ssh']),
};
// global options / environment that point git, docker or podman at another repository, directory or daemon
// (a short option may carry its value attached: `git -C/repo`, `docker -Htcp://prod:2375`, `podman -cprod`)
const SCOPE_OPTS = {
  git: /^-C|^--(?:git-dir|work-tree|namespace)(?:=|$)/,
  docker: /^-[Hc]|^--(?:host|context|config)(?:=|$)/,
  podman: /^-c|^--(?:connection|url|root|runroot|identity|ssh)(?:=|$)/,
  // gh has no global options: GH_REPO / GH_HOST (also exported earlier in the line) point it at another repository
  gh: /^-R|^--repo(?:=|$)/,
};
const SCOPE_ENV = /^(?:GIT_DIR|GIT_WORK_TREE|GIT_NAMESPACE|DOCKER_HOST|DOCKER_CONTEXT|DOCKER_CONFIG|CONTAINER_HOST|CONTAINER_CONNECTION|GH_REPO|GH_HOST)=/;
/** `git -C /repo …`, `docker --context prod …`, `DOCKER_HOST=… docker …` (w: the unwrapped words, raw: before unwrap). */
function scopedElsewhere(w, raw, exported = false) {
  if (isAmbiguous(w[0])) return false;
  const head = String(w[0]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
  const re = SCOPE_OPTS[head];
  if (!re) return false;
  if (exported) return true;
  if (raw.slice(0, raw.length - w.length).some((x) => SCOPE_ENV.test(String(x)))) return true;
  const args = w.slice(1);
  return args.slice(0, args.length - afterGlobals(head, args).length).some((a) => re.test(String(a)));

/** Entities of one simple command `w` (sudo/VAR= removed) into `e`. */
function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
  if (isAmbiguous(w[0])) {
    if (w.slice(1).some((a) => PATHLIKE.test(rawOf(a)))) { e.file = AMB + w.join(' '); e.dir = AMB + w.join(' '); }
    return;
  }
  const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '');
  const args = afterGlobals(head, w.slice(1));
  const nonFlags = args.filter((a) => !/^-/.test(a));
  if (CD_HEADS.has(head.toLowerCase())) return; // handled by the caller
  if ((k === 'pwsh' || PS_CMDLET.test(head)) && psNative(head.toLowerCase(), args, e, setIntent)) return;
  if (head === 'docker') {
    const sub = nonFlags[0];
    if (sub === 'run') {
      const i = args.indexOf('--name');
      if (i >= 0 && args[i + 1]) e.container ??= args[i + 1];
      const nm = args.find((a) => a.startsWith('--name='));
      if (nm) e.container ??= nm.slice(7);
    } else if (DOCKER_CT.has(sub)) {
      const rest = args.slice(args.indexOf(sub) + 1);
      for (let i = 0; i < rest.length; i++) {
        if (DOCKER_VAL_FLAGS.has(rest[i])) { i++; continue; }
        if (/^-/.test(rest[i])) continue;
        e.container ??= rest[i];
        break;
      }
      if (DOCKER_INTENT[sub] && e.container != null) setIntent(DOCKER_INTENT[sub], { container: e.container });
    }
  } else if (head === 'systemctl' || head === 'service') {
    const svc = head === 'systemctl' ? nonFlags[1] : nonFlags[0];
    const verb = head === 'systemctl' ? nonFlags[0] : nonFlags[1];
    if (svc) e.service ??= svc.replace(/\.service$/, '');
    if (SYSTEMCTL_INTENT[verb] && svc) setIntent(SYSTEMCTL_INTENT[verb], { service: e.service });
  } else if (head === 'journalctl') {
    const i = args.findIndex((a) => a === '-u' || a === '--unit');
    if (i >= 0 && args[i + 1]) { e.service ??= args[i + 1].replace(/\.service$/, ''); setIntent('journal_service', { service: e.service }); }
  } else if (head === 'kill') {
    const { pos } = parseArgs(args, VALUE_OPTS.kill);
    if (pos.length === 1 && /^\d+$/.test(pos[0])) { e.pid = pos[0]; setIntent('kill_by_pid', { pid: pos[0] }); }
    else if (pos.length) e.pid = AMB + pos.map(rawOf).join(' '); // several PIDs or a job spec: not one process
  } else if (['pkill', 'killall', 'pgrep', 'pidof'].includes(head)) {
    const { pos } = parseArgs(args, VALUE_OPTS[head]);
    if (pos.length === 1) e.proc = pos[0];
    else if (pos.length > 1) e.proc = AMB + pos.map(rawOf).join(' ');
    if (head === 'pgrep' && pos.length === 1) setIntent('find_process', { name: pos[0] });
  } else if ((head === 'ps' || head === 'top' || head === 'htop') && args.some((a) => /^-\w*p$/.test(a))) {
    const i = args.findIndex((a) => /^-\w*p$/.test(a));
    const pid = (args[i + 1] || '').split(',')[0];
    if (/^\d+$/.test(pid)) e.pid = pid;
  } else if ((head === 'grep' || head === 'egrep') && split.segments.some((s, j) => j < segIdx && firstWord(s) === 'ps')) {
    // ps aux | grep -v grep | grep node: the process is the pattern of a non-inverted grep
    const { pos, opts, flags } = parseArgs(args, VALUE_OPTS.grep);
    const inverted = flags.some((f) => /^-[a-zA-Z]*v/.test(f) || f === '--invert-match');
    const pat = opts['-e'] ?? opts['--regexp'] ?? pos[0];
    if (!inverted && pat != null) e.proc = pat;
  } else if (GREP_HEADS.has(head) && nonFlags[0]) {
    const { pos, opts, flags } = parseArgs(args, VALUE_OPTS[head] || VALUE_OPTS.grep);
    const pat = opts['-e'] ?? opts['--regexp'] ?? pos[0];
    const path = opts['-e'] != null || opts['--regexp'] != null ? pos[0] : pos[1];
    if (pat != null) setIntent(flags.some((a) => /^-\w*l/.test(a)) ? 'grep_files_containing' : 'grep_text', { pattern: rawOf(pat), ...(path != null ? { path } : {}) });
    if (path != null) {
      const t = typeByExt(path);
      e[t] = path;
      if (t === 'dir') e.searchDir = true; // searched directory: the matches are inside it
    }
  } else if (head === 'lsof' || head === 'ss' || head === 'netstat' || head === 'fuser') {
    const pm = args.map(rawOf).join(' ').match(/(?::|tcp:|udp:|sport = :)(\d{2,5})\b/);
    if (pm) { e.port = pm[1]; setIntent('process_on_port', { port: pm[1] }); }
  } else if (head === 'gh' && nonFlags[0] === 'pr' && GH_PR_SELECTS.has(nonFlags[1])) {
    // `gh pr view 45`, `gh pr checkout feature/x`, `gh pr merge <url>`: the pull request ("merge that pr"); none named is
    // the current branch's (left out); another repository's (-R / --repo) or several operands cannot be read
    const { pos, opts } = parseArgs(args.slice(args.indexOf(nonFlags[1]) + 1), GH_PR_VALUE_OPTS);
    const repo = opts['-R'] ?? opts['--repo'];
    if (pos.length === 1 && repo == null && !isAmbiguous(pos[0])) e.pr = rawOf(pos[0]);
    else if (pos.length) e.pr = AMB + pos.map(rawOf).join(' ');
  } else if (head === 'git') {
    const sub = nonFlags[0];
    const rest = args.slice(args.indexOf(sub) + 1);
    if (sub === 'grep') {
      // git grep [-l] PATTERN [DIR]: a search, its directory argument is only where it looked
      const { pos, opts } = parseArgs(rest, VALUE_OPTS.grep);
      const path = opts['-e'] != null ? pos[0] : pos[1];
      if (path != null) { const t = typeByExt(path); e[t] = path; if (t === 'dir') e.searchDir = true; }
      return;
    }
    if (sub === 'checkout' || sub === 'switch') {
      const { pos, opts, after } = parseArgs(rest, VALUE_OPTS[sub]);
      const created = opts['-b'] ?? opts['-B'] ?? opts['-c'] ?? opts['-C'] ?? opts['--create'] ?? opts['--force-create'] ?? opts['--orphan'];
      if (after) {
        // git checkout [<tree-ish>] -- <file>...: restores files, it does not switch branches
        if (after.length) e.file = after.length === 1 ? after[0] : AMB + after.map(rawOf).join(' ');
        return;
      }
      const b = created ?? pos[0];
      if (b != null && b !== '.' && b !== '-' && !isAmbiguous(b) && !String(b).startsWith('-')) {
        e.branch = b;
        e.current = b;
        if (created != null) e.created = b;
      }
    } else if (['merge', 'rebase'].includes(sub) || (sub === 'branch' && nonFlags[1])) {
/**
 * Deterministic resolution. Returns null, or
 *   { rule: 'same-for', intent, slots, note }   (full override, slots to merge over the previous ones)
 *   { rule: 'pronoun', intent|null, fill: {slot: value}, ent, note }
 *   { rule: 'refused', intent|null, ent?, note }  (the referenced value is ambiguous: nothing is filled)
 */
export function resolveReference(query, ctx) {
  if (!ctx || !ctx.n) return null;
  const arg = sameFor(query);
  if (arg && ctx.last) {
    const rt = retarget(ctx.last.intent, arg);
    // "what about this": no new argument at all, nothing to retarget
    if (!rt && !arg.trim().split(/\s+/).some((w) => !PRONOUN_WORD.test(fold(w)) && !isStopWord(fold(w)))) {
      return { rule: 'refused', intent: null, stop: true, note: `"${arg}" does not name a new target for the previous ${ctx.last.intent}; not guessing` };
    }
    // any newer line ran after it: replaying the older changing command for a new target is a guess
    if (rt && ctx.last.skipped && BY_ID[ctx.last.intent].risk !== 'safe') {
      return { rule: 'refused', intent: null, stop: true, note: `the newest command that tellsh can repeat (${ctx.last.intent}) is not the previous command; not guessing` };
    }
    // "same for api" after `docker --context prod logs web`: here it would run against another daemon / repository
    if (rt && ctx.last.scoped) {
      return { rule: 'refused', intent: null, stop: true, note: `the previous command (${ctx.last.intent}) ran against another repository, directory or daemon (-C, --context, -H, ...); not guessing` };
    }
    // "same for /srv/x" after `git status`: the previous command has no slot for it; not a new request either
    if (!rt && EXPLICIT_SAME.some((re) => re.test(fold(query)))) {
      return { rule: 'refused', intent: null, stop: true, note: `the previous command (${ctx.last.intent}) has nothing that "${arg}" could replace; not guessing` };
    }
    if (rt) {
      const slots = { ...ctx.last.slots, [rt.slot]: rt.value };
      const amb = Object.entries(slots).find(([, v]) => isAmbiguous(v));
      if (amb) return { rule: 'refused', intent: ctx.last.intent, blank: [amb[0]], note: `previous ${ctx.last.intent} has ${amb[0]}=${rawOf(amb[1])}, which depends on the shell state; not guessing` };
      if (rt.slot === 'ext') delete slots.glob;
      if (rt.slot === 'name') delete slots.namepat;
      return { rule: 'same-for', intent: ctx.last.intent, slots, changed: rt.slot, note: `same as previous ${ctx.last.intent} with ${rt.slot}=${rt.value}` };
    }
  }
  // "same for X", "same but …" when the previous command is not one tellsh can repeat (`ls newdir`, `clear`)
  if (!ctx.last && (EXPLICIT_SAME.some((re) => re.test(fold(query))) || SAME_BUT.some((re) => re.test(fold(query))))) {
    return { rule: 'refused', intent: null, stop: true, note: 'the previous command is not one tellsh can repeat; not guessing' };
  }
  if (!hasPronoun(query) && hasLocative(query)) return locativeRef(fold(query), ctx);
  if (!hasPronoun(query)) return null;
  // which entity does the pronoun point at? noun hint first ("that container"), else the newest in the line
  const fq = fold(query);
  const order = ctx.refOrder || ctx.entOrder;
  let types = null;
  const named = [];
  // several types for one noun ("that process": pid or name): the one from the later segment wins
  for (const [re, ts] of NOUN_TYPE) if (re.test(fq)) { named.push(...ts); types = ts.filter((t) => ctx.ents[t] != null).sort((a, b) => order.indexOf(a) - order.indexOf(b)); if (types.length) break; }
  // "delete that branch" after a command without a branch: refuse instead of using another type's value
  if (named.length && !types?.length) {
    return { rule: 'refused', intent: null, ent: named[0], blank: [...new Set(named.flatMap((t) => SLOT_FROM_ENT[t] || []))], note: `the previous command names no ${named[0]}; not guessing` };
  }
  // "delete it" after `ls`, `clear`, `make`: nothing in the previous command it could mean (blanket: every slot type is
  // withheld, an optional one is simply left out: "push it" after `git commit` is `git push`)
  if (!ctx.entOrder.length) {
    const listed = Object.keys(ctx.listing || {});
    return { rule: 'refused', intent: null, blanket: true, blank: [...new Set(Object.values(SLOT_FROM_ENT).flat())],
      note: listed.length ? `the previous command listed ${listed.join('/')} values; the reference may mean any of them; not guessing`
        : 'the previous command names nothing the reference could mean; not guessing' };
  }
  const ent = (types && types.length ? types : order)[0];
  if (!ent) return null;
  let intent = null;
  let verb = null;
  for (const [name, re, table] of VERBS) {
    if (re.test(fq)) {
      const pick = table[ent] || (!types && order.map((e) => table[e]).find(Boolean));
      if (pick) { intent = pick; verb = name; break; }
    }
  }
  const finalEnt = intent ? (Object.entries(SLOT_FROM_ENT).find(([e]) => ctx.ents[e] != null && intentUses(intent, e)) ? pickEnt(intent, ent, ctx) : ent) : ent;
  const value = chooseValue(finalEnt, ctx);
  if (value == null || isAmbiguous(value)) {
    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: `the latest ${finalEnt} in history (${rawOf(value ?? '?')}) cannot be read unambiguously; not guessing` };
  }
  // a value that is fine to show but not to change (search root, listed directory, older value, ...)
  const guardNote = changeGuard(finalEnt, value, fq, ctx);
  // "delete that branch" after `git checkout main`: the checked-out branch is never the one to delete
  if (intent === 'git_delete_branch' && ctx.currentBranch != null && String(ctx.currentBranch) === String(value)) {
    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: `${rawOf(value)} is the checked-out branch (the previous command switched to it); not guessing` };
  }
  if (guardNote && intent && BY_ID[intent].risk !== 'safe') {
    // "delete all log files in this folder": the request is about entries inside the directory, so the verb's
    // directory intent (`rm -r`) is not what was asked; the classifier's intent stays (`find <PATH> … -delete`)
    const contents = finalEnt === 'dir' && CONTENTS.test(fq);
    return { rule: 'refused', intent: contents ? null : intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: guardNote, ...(contents ? { contents: true } : {}) };
  }
  if (intent === 'kill_by_name' && FORCE.test(fq)) intent = 'kill_force';
  if (intent === 'extract_targz' && /\.zip$/i.test(value)) intent = 'extract_zip';
  const fill = {};
  for (const s of SLOT_FROM_ENT[finalEnt] || []) fill[s] = value;
  // guarded: the caller must not use the value for a non-safe intent it picks itself
  return { rule: 'pronoun', intent, fill, ent: finalEnt, ...(guardNote ? { guarded: true, guardNote } : {}), note: `"${finalEnt}" from history = ${value}` };
}

/**
 * "there", "tam", "in the same folder": the newest directory of the history, as the place a command runs in
 * (`find {path} …`, `ls {path}`). It never names the object of a command (`rm -r`, `mv`): `locative` tells the caller.
 * Refused when there is no directory, it cannot be read, or a newer file is the newest location-like value.
 */

exec
/bin/bash -lc "sed -n '1,130p' src/fill.js; sed -n '200,240p' src/fill.js; git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/render.js src/shellwords.js" in /workspace/tellsh
 succeeded in 0ms:
// Turn (intent, slots) into a concrete, safely-quoted command for the target shell.
import { BY_ID } from './catalog.js';
import { extractSlots, pickArg, pickDest, pickDir, foldKeepLength } from './slots.js';
import { checkDanger, maxRisk } from './danger.js';
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
  repo: (v) => /^(?:[\w-]+(?:\.[\w-]+)+\/)?[\w-][\w.-]{0,99}\/[\w-][\w.-]{0,99}$/.test(String(v)) && !/\.\./.test(String(v)),
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
// "merge pr from the feature branch", "for my branch bob": a branch is named, but not one the parser read
const PR_BRANCH_NAMED = /\b(?:for|of|on|from)\s+(?:\S+\s+){0,2}branch\b/i;
/**
 * The pull request the user names (quoted: kept as written, validation withholds an odd one), else null (`gh pr merge`
 * acts on the current branch's pull request). A number elsewhere in the request ("merge pr with 2 approvals", "merge the
 * 2 open prs") is never the pull request; a request that names something the parser cannot read (`bob's`, `in repo v2`)
 * is withheld (`?`, shown as `<PR>`), never a bare `gh pr merge`.
 */
function prSelector(ex) {
  if (ex.urls[0] != null) return ex.urls[0];
  const text = String(ex.text);
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
      if (/\b(?:for|from)\s+$/i.test(m[1])) return /\d/.test(rest) ? `?${w}` : w;
      // "merge pr main": a bare word may be a branch or say something else: withheld (`gh pr merge <PR>`), never dropped
      return `?${w}`;
    }
  }
  const hash = text.match(/(?:^|\s)#(\d{1,12})(?=[\s.,!?;:]|$)/);
  if (hash && PR_HASH_LEAD.test(text.slice(0, hash.index + hash[0].indexOf('#')))) return hash[1];
  // 'merge the "feature/login" pull request': an explicitly quoted value is the target
  if (ex.quoted.length) return ex.quoted[0];
  // named but not readable: a number anywhere ("merge the 2 open prs", "merge pr in 2 minutes"), or a marked word or a
  // quote after "pr" ("merge pr bob's", "merge pr feature/x's", "merge pr in repo v2"): withheld
  const p = text.match(PR_WORD);
  const after = p ? text.slice(p.index + p[0].length) : '';
  if (ex.numbers?.length || /\d/.test(text) || /[/_#'"`„“”’]|\w[.-]\w/.test(after) || PR_BRANCH_NAMED.test(after)) return '?';
  return null;
}
// "--repo a/b", "-R a/b", "in (the) repo(sitory) a/b", "in the a/b repo"; "in the other repo", "in another repository": named,
// not readable ("this repo", "the current repository" are the working directory's)
const PR_REPO_OPT = /(?:^|\s)(?:--repo(?:=|\s+|$)|-R(?:=|\s*))(\S*)/;
const PR_REPO = /\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(?:github\s+)?(?:repo|repository|repozytorium)\s+(\S+)|\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(\S+(?:\s+\S+)?)\s+(?:github\s+)?(?:repo|repository)\b|\b(?:w|z)\s+repozytorium\s+(\S+)/i;
const PR_REPO_HERE = /^(?:this|current|the\s+current|same|the\s+same|our|my|local|the\s+local|tym|tego|bieżącym|biezacym)$/i;
/** The repository a gh pr request names: { repo (a value, or `?` when it is not readable), rest (the text without it) } or null. */
function prRepo(text) {
  const m = text.match(PR_REPO_OPT) || text.match(PR_REPO);
  if (!m) return null;
  const w = (m[1] ?? m[2] ?? m[3] ?? '').replace(/[.,!?;:]+$/, '').replace(/^["'`]|["'`]$/g, '');
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
export function finalizeSlots(intent, v) {
  if (v.ext != null && v.glob == null) v.glob = `*.${v.ext}`;
  if (intent.id === 'find_by_name' && v.name) v.namepat = /[*?]/.test(v.name) || /\.\w+$/.test(v.name) ? v.name : `*${v.name}*`;
  if (intent.id === 'replace_text' && v.old != null && v.new != null) v.sedexpr = `s/${sedEscapeOld(v.old)}/${sedEscapeNew(v.new)}/g`;
  return v;
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
    // the pull request the user names: a URL or a branch is kept as it is (validation withholds an odd one), never
    // dropped for a bare `gh pr merge`, which acts on the current branch's pull request
    const sel = prSelector(rq ? { ...ex, text: rq.rest, numbers: (rq.rest.match(/\d+/g) || []).map(Number), quoted: ex.quoted.filter((q) => rq.rest.includes(q)) } : ex);
    if (sel != null) v.pr = String(sel).replace(/^#(?=\d)/, '');
    else if (rq) v.pr = '?';
    delete v.count;
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
diff --git a/src/shellwords.js b/src/shellwords.js
index b20a84a..e563ac0 100644
--- a/src/shellwords.js
+++ b/src/shellwords.js
@@ -20,7 +20,21 @@ export const rawOf = (w) => (isAmbiguous(w) ? w.slice(1) : w);
 const PS_SQ = /['‘’‚‛]/;
 const PS_DQ = /["“”„]/;
 
-export function splitCommand(line, kind = 'posix', { keepRedirects = false } = {}) {
+// index of the `)` closing the `(` at `open` (quotes skipped), or -1
+function matchParen(s, open) {
+  let depth = 0;
+  for (let j = open; j < s.length; j++) {
+    const d = s[j];
+    if (d === "'") { const e = s.indexOf("'", j + 1); if (e < 0) return -1; j = e; continue; }
+    if (d === '"') { let e = j + 1; while (e < s.length && s[e] !== '"') e += s[e] === '\\' ? 2 : 1; if (e >= s.length) return -1; j = e; continue; }
+    if (d === '\\') { j++; continue; }
+    if (d === '(') depth++;
+    else if (d === ')' && --depth === 0) return j;
+  }
+  return -1;
+}
+
+export function splitCommand(line, kind = 'posix', { keepRedirects = false, literalTilde = true } = {}) {
   const ps = kind === 'pwsh' || kind === 'powershell';
   const s = String(line);
   const segments = [];
@@ -30,21 +44,30 @@ export function splitCommand(line, kind = 'posix', { keepRedirects = false } = {
   let raw = '';
   let amb = false;
   let glob = false;
+  let quoted0 = false; // the word starts with a quoted or escaped character
   let dropNext = false; // next word is a redirection target
   const flushWord = () => {
     if (w == null) return;
+    // POSIX: a quoted/escaped leading ~ ('~/x', \~/x) is a directory literally named ~, not the home
+    // directory; ./~/x keeps that meaning wherever the value is rendered again
+    if (!ps && literalTilde && quoted0 && w.startsWith('~')) w = './' + w;
     if (dropNext) { dropNext = false; } else {
       words.push(amb ? AMB + raw : glob ? GLOB + raw : w);
       raws.push(raw);
     }
-    w = null; raw = ''; amb = false; glob = false;
+    w = null; raw = ''; amb = false; glob = false; quoted0 = false;
   };
-  const flushSeg = (sep = '') => { flushWord(); if (words.length) segments.push({ words, raw: raws, sep }); else if (sep && segments.length) segments[segments.length - 1].sep += sep; words = []; raws = []; };
+  // open `( … )` subshells (posix): each segment records the ids of those it runs in (`subs`), so a `cd` inside one
+  // is known not to outlast it
+  const subs = [];
+  let subId = 0;
+  const flushSeg = (sep = '') => { flushWord(); if (words.length) segments.push({ words, raw: raws, sep, ...(subs.length ? { subs: [...subs] } : {}) }); else if (sep && segments.length) segments[segments.length - 1].sep += sep; words = []; raws = []; };
   const fail = () => ({ ok: false, segments: [] });
 
   for (let i = 0; i < s.length; i++) {
     const c = s[i];
     const start = i;
+    if (w == null && (ps ? PS_SQ.test(c) || PS_DQ.test(c) : c === "'" || c === '"' || c === '\\')) quoted0 = true;
     if (ps ? PS_SQ.test(c) : c === "'") {
       // single-quoted literal; PowerShell doubles any single-quote character to escape it
       let v = '';
@@ -82,14 +105,26 @@ export function splitCommand(line, kind = 'posix', { keepRedirects = false } = {
     } else if (!ps && c === '\\') {
       if (i + 1 >= s.length) return fail();
       if (s[i + 1] !== '\n') w = (w ?? '') + s[i + 1];
+      else if (w == null) quoted0 = false; // line continuation, not part of a word
       i++;
     } else if (ps && c === '`') {
       if (i + 1 >= s.length) return fail();
       w = (w ?? '') + s[++i];
-    } else if (c === '\n' || c === ';' || c === '|' || c === '(' || c === ')' || (c === '&' && (!ps || s[i + 1] === '&'))) {
+    } else if (c === '$' && s[i + 1] === '(') {
+      // command substitution / PowerShell subexpression: one (ambiguous) word, not a separator at `(`
+      const end = matchParen(s, i + 1);
+      if (end < 0) return fail();
+      w = (w ?? '') + s.slice(i, end + 1); amb = true; i = end;
+    } else if (!ps && c === '`') {
+      const end = s.indexOf('`', i + 1);
+      if (end < 0) return fail();
+      w = (w ?? '') + s.slice(i, end + 1); amb = true; i = end;
+    } else if (c === '\n' || c === ';' || c === '|' || c === '(' || c === ')' || (c === '&' && (ps ? s[i + 1] === '&' : s[i + 1] !== '>'))) {
       let sep = c === '\n' ? ';' : c;
       if ((c === '&' || c === '|') && s[i + 1] === c) { i++; sep += c; }
       flushSeg(sep);
+      if (c === '(') subs.push(++subId);
+      else if (c === ')') subs.pop();
     } else if ((c === '{' || c === '}') && w == null && (i + 1 >= s.length || /\s/.test(s[i + 1]))) {
       flushSeg(c); // command group / script block
     } else if (/\s/.test(c)) {
@@ -126,6 +161,8 @@ export function splitCommand(line, kind = 'posix', { keepRedirects = false } = {
         amb = true;
       }
       if (!ps && c === '`') amb = true;
+      // ~user, ~+, ~-: expanded by the shell to a directory we cannot know
+      if (!ps && c === '~' && w == null && i + 1 < s.length && !/[\/\s;|&)]/.test(s[i + 1])) amb = true;
       if (/[*?[]/.test(c)) glob = true;
       if (!ps && c === '{' && /^\{[^}\s]*,[^}\s]*\}/.test(s.slice(i))) amb = true; // brace expansion
       w = (w ?? '') + c;
@@ -138,8 +175,8 @@ export function splitCommand(line, kind = 'posix', { keepRedirects = false } = {
 }
 
 /** All words of a single simple command (no separators), or null if the text is not exactly one word list. */
-export function wordsOf(line, kind = 'posix') {
-  const r = splitCommand(line, kind);
+export function wordsOf(line, kind = 'posix', opts = {}) {
+  const r = splitCommand(line, kind, opts);
   if (!r.ok || r.segments.length !== 1) return null;
   return r.segments[0].words;
 }
@@ -149,3 +186,55 @@ export function decodeWord(text, kind = 'posix') {
   const w = wordsOf(text, kind);
   return w && w.length === 1 ? w[0] : null;
 }
+
+// a word that is a path by its form: /x, ~/x, ./x, ../x, C:\x, \\server
+const PATH_START = /^(?:~(?:[\\/]|$)|\.{1,2}[\\/]|[\\/]|[A-Za-z]:[\\/])/;
+// a word that contains a path separator or ends in a file extension ("My Notes.txt", "/tmp/a b")
+const PATH_FORM = /[\\/]|\.[A-Za-z0-9]{1,8}$/;
+// first words that make a multi-word argument read as part of the request, not a name ("the file notes.txt",
+// "folder /tmp/x", "plik raport.pdf", "all files in /tmp/x"); compared without diacritics ("usuń" -> "usun")
+const REQUEST_WORDS = new Set(('the all every each any some this that these those of in on at from to into with for ' +
+  'file files folder folders directory directories dir dirs document documents ' +
+  'delete remove erase rm show list display print open edit view read move copy rename find search make create ' +
+  'ten ta to te tego tej wszystkie wszystko kazdy kazda w we z ze na do od dla ' +
+  'plik pliki pliku plikow plikiem folderu folderze folderow katalog katalogi katalogu katalogow katalogiem dokument dokumenty ' +
+  'usun skasuj wykasuj kasuj pokaz wyswietl otworz edytuj przenies skopiuj kopiuj zmien znajdz szukaj utworz stworz').split(' '));
+const fold = (w) => w.normalize('NFD').replace(/\p{M}/gu, '').replace(/[łŁ]/g, 'l').toLowerCase();
+
+/**
+ * Join already-split words (argv, or the words of a `tellsh …` history line) back into request text without
+ * losing their boundaries. A single word is the whole request (`tellsh "delete folder /tmp/x"`) and is used as it is.
+ * Among several words, one with whitespace is
+ *   - a value, quoted again so the slot extractor reads it as one value (never `/tmp/a`), when it starts like a path
+ *     (`delete folder "/tmp/a b"`), or, after the first word, has the form of a file name whose first word is not a
+ *     request word and whose spaces are all after the last separator (`delete "My Notes.txt"`);
+ *   - request text, joined unquoted, when it is the first word and not a path (`tellsh "delete folder" /tmp/x`);
+ *   - unclear otherwise (`tellsh delete folder "my data"`, `delete "folder /tmp/x"`, `delete "the file notes.txt"`:
+ *     a name, or words of the request?): quoted, and listed in `unclear` so a changing command leaves that path as
+ *     a placeholder.
+ * -> { text, unclear: string[] }, or null when a word with whitespace contains both quote characters (cannot be
+ *    re-quoted for the extractor).
+ */
+export function joinArgs(words) {
+  if (words.length === 1) return { text: String(words[0]), unclear: [] };
+  const out = [];
+  const unclear = [];
+  for (let i = 0; i < words.length; i++) {
+    const s = String(words[i]);
+    if (!/\s/.test(s)) { out.push(s); continue; }
+    const sep = s.search(/[\\/]/);
+    const nameLike = i > 0 && PATH_FORM.test(s) && !REQUEST_WORDS.has(fold(s.trim().split(/\s+/)[0])) && (sep < 0 || s.search(/\s/) > sep);
+    const value = PATH_START.test(s) || nameLike;
+    if (!value && i === 0) { out.push(s); continue; }
+    if (!value) unclear.push(s);
+    if (!s.includes('"')) out.push(`"${s}"`);
+    else if (!s.includes("'")) out.push(`'${s}'`);
+    else return null;
+  }
+  return { text: out.join(' '), unclear };
+}
+
+/** joinArgs(words).text, or null. */
+export function joinWords(words) {
+  return joinArgs(words)?.text ?? null;
+}

exec
/bin/bash -lc 'node test/pipeline.test.js' in /workspace/tellsh
 exited 1 in 206ms:
TAP version 13
# Subtest: stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
ok 1 - stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
  ---
  duration_ms: 8.778499
  ...
# Subtest: PowerShell vocabulary maps to the same tool family
ok 2 - PowerShell vocabulary maps to the same tool family
  ---
  duration_ms: 2.57321
  ...
# Subtest: tagger: tool-conditioned BIO spans, only tags valid for the tool
ok 3 - tagger: tool-conditioned BIO spans, only tags valid for the tool
  ---
  duration_ms: 13.209142
  ...
# Subtest: slot merge: tagger primary, regex fills misses and replaces invalid values
ok 4 - slot merge: tagger primary, regex fills misses and replaces invalid values
  ---
  duration_ms: 8.3734
  ...
# Subtest: end-to-end bash + PowerShell + BSD
ok 5 - end-to-end bash + PowerShell + BSD
  ---
  duration_ms: 43.055092
  ...
# Subtest: history: pronouns, "same for", container/service/pid references (EN + PL)
ok 6 - history: pronouns, "same for", container/service/pid references (EN + PL)
  ---
  duration_ms: 67.886026
  ...
# Subtest: history is optional: without it a pronoun request gets a hint, never a guessed value
ok 7 - history is optional: without it a pronoun request gets a hint, never a guessed value
  ---
  duration_ms: 1.157282
  ...
# Subtest: history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
ok 8 - history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
  ---
  duration_ms: 0.632692
  ...
# Subtest: loadHistory reads only the tail of HISTFILE and returns the last n commands
not ok 9 - loadHistory reads only the tail of HISTFILE and returns the last n commands
  ---
  duration_ms: 1.101089
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
  duration_ms: 0.762725
  ...
# Subtest: second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
ok 11 - second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
  ---
  duration_ms: 9.246912
  ...
# Subtest: out-of-domain requests are rejected (also by the composer)
ok 12 - out-of-domain requests are rejected (also by the composer)
  ---
  duration_ms: 0.955378
  ...
# Subtest: env detection and overrides
ok 13 - env detection and overrides
  ---
  duration_ms: 0.622835
  ...
1..13
# tests 13
# suites 0
# pass 12
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 174.920057

exec
/bin/bash -lc "sed -n '1,124p' src/fill.js; sed -n '1101,1195p' src/history.js; sed -n '800,821p' src/history.js; sed -n '887,899p' src/history.js" in /workspace/tellsh
 succeeded in 0ms:
// Turn (intent, slots) into a concrete, safely-quoted command for the target shell.
import { BY_ID } from './catalog.js';
import { extractSlots, pickArg, pickDest, pickDir, foldKeepLength } from './slots.js';
import { checkDanger, maxRisk } from './danger.js';
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
  repo: (v) => /^(?:[\w-]+(?:\.[\w-]+)+\/)?[\w-][\w.-]{0,99}\/[\w-][\w.-]{0,99}$/.test(String(v)) && !/\.\./.test(String(v)),
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
// "merge pr from the feature branch", "for my branch bob": a branch is named, but not one the parser read
const PR_BRANCH_NAMED = /\b(?:for|of|on|from)\s+(?:\S+\s+){0,2}branch\b/i;
/**
 * The pull request the user names (quoted: kept as written, validation withholds an odd one), else null (`gh pr merge`
 * acts on the current branch's pull request). A number elsewhere in the request ("merge pr with 2 approvals", "merge the
 * 2 open prs") is never the pull request; a request that names something the parser cannot read (`bob's`, `in repo v2`)
 * is withheld (`?`, shown as `<PR>`), never a bare `gh pr merge`.
 */
function prSelector(ex) {
  if (ex.urls[0] != null) return ex.urls[0];
  const text = String(ex.text);
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
      if (/\b(?:for|from)\s+$/i.test(m[1])) return /\d/.test(rest) ? `?${w}` : w;
      // "merge pr main": a bare word may be a branch or say something else: withheld (`gh pr merge <PR>`), never dropped
      return `?${w}`;
    }
  }
  const hash = text.match(/(?:^|\s)#(\d{1,12})(?=[\s.,!?;:]|$)/);
  if (hash && PR_HASH_LEAD.test(text.slice(0, hash.index + hash[0].indexOf('#')))) return hash[1];
  // 'merge the "feature/login" pull request': an explicitly quoted value is the target
  if (ex.quoted.length) return ex.quoted[0];
  // named but not readable: a number anywhere ("merge the 2 open prs", "merge pr in 2 minutes"), or a marked word or a
  // quote after "pr" ("merge pr bob's", "merge pr feature/x's", "merge pr in repo v2"): withheld
  const p = text.match(PR_WORD);
  const after = p ? text.slice(p.index + p[0].length) : '';
  if (ex.numbers?.length || /\d/.test(text) || /[/_#'"`„“”’]|\w[.-]\w/.test(after) || PR_BRANCH_NAMED.test(after)) return '?';
  return null;
}
// "--repo a/b", "-R a/b", "in (the) repo(sitory) a/b", "in the a/b repo"; "in the other repo", "in another repository": named,
// not readable ("this repo", "the current repository" are the working directory's)
const PR_REPO_OPT = /(?:^|\s)(?:--repo(?:=|\s+|$)|-R(?:=|\s*))(\S*)/;
const PR_REPO = /\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(?:github\s+)?(?:repo|repository|repozytorium)\s+(\S+)|\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(\S+(?:\s+\S+)?)\s+(?:github\s+)?(?:repo|repository)\b|\b(?:w|z)\s+repozytorium\s+(\S+)/i;
const PR_REPO_HERE = /^(?:this|current|the\s+current|same|the\s+same|our|my|local|the\s+local|tym|tego|bieżącym|biezacym)$/i;
/** The repository a gh pr request names: { repo (a value, or `?` when it is not readable), rest (the text without it) } or null. */
function prRepo(text) {
  const m = text.match(PR_REPO_OPT) || text.match(PR_REPO);
  if (!m) return null;
  const w = (m[1] ?? m[2] ?? m[3] ?? '').replace(/[.,!?;:]+$/, '').replace(/^["'`]|["'`]$/g, '');
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

export function resolveReference(query, ctx) {
  if (!ctx || !ctx.n) return null;
  const arg = sameFor(query);
  if (arg && ctx.last) {
    const rt = retarget(ctx.last.intent, arg);
    // "what about this": no new argument at all, nothing to retarget
    if (!rt && !arg.trim().split(/\s+/).some((w) => !PRONOUN_WORD.test(fold(w)) && !isStopWord(fold(w)))) {
      return { rule: 'refused', intent: null, stop: true, note: `"${arg}" does not name a new target for the previous ${ctx.last.intent}; not guessing` };
    }
    // any newer line ran after it: replaying the older changing command for a new target is a guess
    if (rt && ctx.last.skipped && BY_ID[ctx.last.intent].risk !== 'safe') {
      return { rule: 'refused', intent: null, stop: true, note: `the newest command that tellsh can repeat (${ctx.last.intent}) is not the previous command; not guessing` };
    }
    // "same for api" after `docker --context prod logs web`: here it would run against another daemon / repository
    if (rt && ctx.last.scoped) {
      return { rule: 'refused', intent: null, stop: true, note: `the previous command (${ctx.last.intent}) ran against another repository, directory or daemon (-C, --context, -H, ...); not guessing` };
    }
    // "same for /srv/x" after `git status`: the previous command has no slot for it; not a new request either
    if (!rt && EXPLICIT_SAME.some((re) => re.test(fold(query)))) {
      return { rule: 'refused', intent: null, stop: true, note: `the previous command (${ctx.last.intent}) has nothing that "${arg}" could replace; not guessing` };
    }
    if (rt) {
      const slots = { ...ctx.last.slots, [rt.slot]: rt.value };
      const amb = Object.entries(slots).find(([, v]) => isAmbiguous(v));
      if (amb) return { rule: 'refused', intent: ctx.last.intent, blank: [amb[0]], note: `previous ${ctx.last.intent} has ${amb[0]}=${rawOf(amb[1])}, which depends on the shell state; not guessing` };
      if (rt.slot === 'ext') delete slots.glob;
      if (rt.slot === 'name') delete slots.namepat;
      return { rule: 'same-for', intent: ctx.last.intent, slots, changed: rt.slot, note: `same as previous ${ctx.last.intent} with ${rt.slot}=${rt.value}` };
    }
  }
  // "same for X", "same but …" when the previous command is not one tellsh can repeat (`ls newdir`, `clear`)
  if (!ctx.last && (EXPLICIT_SAME.some((re) => re.test(fold(query))) || SAME_BUT.some((re) => re.test(fold(query))))) {
    return { rule: 'refused', intent: null, stop: true, note: 'the previous command is not one tellsh can repeat; not guessing' };
  }
  if (!hasPronoun(query) && hasLocative(query)) return locativeRef(fold(query), ctx);
  if (!hasPronoun(query)) return null;
  // which entity does the pronoun point at? noun hint first ("that container"), else the newest in the line
  const fq = fold(query);
  const order = ctx.refOrder || ctx.entOrder;
  let types = null;
  const named = [];
  // several types for one noun ("that process": pid or name): the one from the later segment wins
  for (const [re, ts] of NOUN_TYPE) if (re.test(fq)) { named.push(...ts); types = ts.filter((t) => ctx.ents[t] != null).sort((a, b) => order.indexOf(a) - order.indexOf(b)); if (types.length) break; }
  // "delete that branch" after a command without a branch: refuse instead of using another type's value
  if (named.length && !types?.length) {
    return { rule: 'refused', intent: null, ent: named[0], blank: [...new Set(named.flatMap((t) => SLOT_FROM_ENT[t] || []))], note: `the previous command names no ${named[0]}; not guessing` };
  }
  // "delete it" after `ls`, `clear`, `make`: nothing in the previous command it could mean (blanket: every slot type is
  // withheld, an optional one is simply left out: "push it" after `git commit` is `git push`)
  if (!ctx.entOrder.length) {
    const listed = Object.keys(ctx.listing || {});
    return { rule: 'refused', intent: null, blanket: true, blank: [...new Set(Object.values(SLOT_FROM_ENT).flat())],
      note: listed.length ? `the previous command listed ${listed.join('/')} values; the reference may mean any of them; not guessing`
        : 'the previous command names nothing the reference could mean; not guessing' };
  }
  const ent = (types && types.length ? types : order)[0];
  if (!ent) return null;
  let intent = null;
  let verb = null;
  for (const [name, re, table] of VERBS) {
    if (re.test(fq)) {
      const pick = table[ent] || (!types && order.map((e) => table[e]).find(Boolean));
      if (pick) { intent = pick; verb = name; break; }
    }
  }
  const finalEnt = intent ? (Object.entries(SLOT_FROM_ENT).find(([e]) => ctx.ents[e] != null && intentUses(intent, e)) ? pickEnt(intent, ent, ctx) : ent) : ent;
  const value = chooseValue(finalEnt, ctx);
  if (value == null || isAmbiguous(value)) {
    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: `the latest ${finalEnt} in history (${rawOf(value ?? '?')}) cannot be read unambiguously; not guessing` };
  }
  // a value that is fine to show but not to change (search root, listed directory, older value, ...)
  const guardNote = changeGuard(finalEnt, value, fq, ctx);
  // "delete that branch" after `git checkout main`: the checked-out branch is never the one to delete
  if (intent === 'git_delete_branch' && ctx.currentBranch != null && String(ctx.currentBranch) === String(value)) {
    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: `${rawOf(value)} is the checked-out branch (the previous command switched to it); not guessing` };
  }
  if (guardNote && intent && BY_ID[intent].risk !== 'safe') {
    // "delete all log files in this folder": the request is about entries inside the directory, so the verb's
    // directory intent (`rm -r`) is not what was asked; the classifier's intent stays (`find <PATH> … -delete`)
    const contents = finalEnt === 'dir' && CONTENTS.test(fq);
    return { rule: 'refused', intent: contents ? null : intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: guardNote, ...(contents ? { contents: true } : {}) };
  }
  if (intent === 'kill_by_name' && FORCE.test(fq)) intent = 'kill_force';
  if (intent === 'extract_targz' && /\.zip$/i.test(value)) intent = 'extract_zip';
  const fill = {};
  for (const s of SLOT_FROM_ENT[finalEnt] || []) fill[s] = value;
  // guarded: the caller must not use the value for a non-safe intent it picks itself
  return { rule: 'pronoun', intent, fill, ent: finalEnt, ...(guardNote ? { guarded: true, guardNote } : {}), note: `"${finalEnt}" from history = ${value}` };
}

/**
 * "there", "tam", "in the same folder": the newest directory of the history, as the place a command runs in
 * (`find {path} …`, `ls {path}`). It never names the object of a command (`rm -r`, `mv`): `locative` tells the caller.
 * Refused when there is no directory, it cannot be read, or a newer file is the newest location-like value.
 */
    }
  } else if (head === 'lsof' || head === 'ss' || head === 'netstat' || head === 'fuser') {
    const pm = args.map(rawOf).join(' ').match(/(?::|tcp:|udp:|sport = :)(\d{2,5})\b/);
    if (pm) { e.port = pm[1]; setIntent('process_on_port', { port: pm[1] }); }
  } else if (head === 'gh' && nonFlags[0] === 'pr' && GH_PR_SELECTS.has(nonFlags[1])) {
    // `gh pr view 45`, `gh pr checkout feature/x`, `gh pr merge <url>`: the pull request ("merge that pr"); none named is
    // the current branch's (left out); another repository's (-R / --repo) or several operands cannot be read
    const { pos, opts } = parseArgs(args.slice(args.indexOf(nonFlags[1]) + 1), GH_PR_VALUE_OPTS);
    const repo = opts['-R'] ?? opts['--repo'];
    if (pos.length === 1 && repo == null && !isAmbiguous(pos[0])) e.pr = rawOf(pos[0]);
    else if (pos.length) e.pr = AMB + pos.map(rawOf).join(' ');
  } else if (head === 'git') {
    const sub = nonFlags[0];
    const rest = args.slice(args.indexOf(sub) + 1);
    if (sub === 'grep') {
      // git grep [-l] PATTERN [DIR]: a search, its directory argument is only where it looked
      const { pos, opts } = parseArgs(rest, VALUE_OPTS.grep);
      const path = opts['-e'] != null ? pos[0] : pos[1];
      if (path != null) { const t = typeByExt(path); e[t] = path; if (t === 'dir') e.searchDir = true; }
      return;
    }
    if (sub === 'checkout' || sub === 'switch') {
  }
}

const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url', 'pr'];
// gh pr subcommands whose operand selects one pull request, and the options of those that take a value
const GH_PR_SELECTS = new Set(['view', 'checkout', 'co', 'merge', 'close', 'reopen', 'diff', 'checks', 'review', 'ready', 'edit', 'comment']);
const GH_PR_VALUE_OPTS = new Set(['-R', '--repo', '--json', '-q', '--jq', '-t', '--template', '--title', '-b', '--body', '-F',
  '--body-file', '--subject', '-A', '--author-email', '--match-head-commit', '-B', '--base', '--branch', '--add-assignee',
  '--remove-assignee', '-l', '--add-label', '--remove-label', '-m', '--milestone', '-p', '--add-project', '--remove-project',
  '--add-reviewer', '--remove-reviewer', '--color']);
// (`view -c` is --comments, `review -c` / `-a` are --comment / --approve, `comment -e` is --editor: switches, no value)

/**

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const [q,h] of [
 ['merge that pr','gh pr view 45; export GH_REPO=other/repo'],
 ['merge that pr','gh pr view 45; export GH_HOST=ghe.example.com'],
 ['merge that pr','gh pr view 45; GH_REPO=other/repo'],
 ['merge that pr','GH_REPO=other/repo; gh pr view 45'],
 ['merge that pr','env --chdir=/tmp gh pr view 45'],
 ['merge that pr','gh --repo other/repo pr view 45'],
 ['merge it','git checkout feat'],
 ['merge pr 45 in repository other/repo',null],
 ['merge pr 45 from repository https://github.com/other/repo',null],
 ['merge pr 45 in another repository',null],
 ['merge the pull request by alice',null],
 ['merge the pr from yesterday',null],
 ['merge all open prs',null],
 ['merge all prs',null],
 ['merge pr 45 and 46',null],
 ['merge pr #45 and #46',null],
 ['merge the PR whose checks passed',null],
 ['merge pr 45 --repo acme/web --repo other/repo',null]
]) {const r=suggest(q,{env,...(h?{history:[h]}:{})}); console.log(JSON.stringify({q,h,command:r.command,missing:r.missing,risk:r.risk,intent:r.intent,understood:r.understood,context:r.context}));}
JS" in /workspace/tellsh
 succeeded in 197ms:
{"q":"merge that pr","h":"gh pr view 45; export GH_REPO=other/repo","command":"gh pr merge 45","missing":[],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge that pr","h":"gh pr view 45; export GH_HOST=ghe.example.com","command":"gh pr merge 45","missing":[],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge that pr","h":"gh pr view 45; GH_REPO=other/repo","command":"gh pr merge","missing":[],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":true,"commands":1,"rule":"refused","note":"the previous command listed pr values, so the reference may mean one of them, not 45; not guessing"}}
{"q":"merge that pr","h":"GH_REPO=other/repo; gh pr view 45","command":"gh pr merge 45","missing":[],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge that pr","h":"env --chdir=/tmp gh pr view 45","command":"gh pr merge <PR>","missing":["pr"],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":true,"commands":1,"rule":"refused","note":"the latest pr in history (45) cannot be read unambiguously; not guessing"}}
{"q":"merge that pr","h":"gh --repo other/repo pr view 45","command":"gh pr merge <PR>","missing":["pr"],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":true,"commands":1,"rule":"refused","note":"the previous command names no pr; not guessing"}}
{"q":"merge it","h":"git checkout feat","command":"git branch -d feat","missing":[],"risk":"medium","intent":"git_delete_branch","understood":true,"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"branch\" from history = feat"}}
{"q":"merge pr 45 in repository other/repo","h":null,"command":"gh pr merge 45 --repo other/repo","missing":[],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":false}}
{"q":"merge pr 45 from repository https://github.com/other/repo","h":null,"command":"gh pr merge 45 --repo <REPO>","missing":["repo"],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":false}}
{"q":"merge pr 45 in another repository","h":null,"command":"gh pr merge 45 --repo <REPO>","missing":["repo"],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":false}}
{"q":"merge the pull request by alice","h":null,"command":"gh pr merge","missing":[],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":false}}
{"q":"merge the pr from yesterday","h":null,"command":"gh pr merge","missing":[],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":false}}
{"q":"merge all open prs","h":null,"command":"gh pr list","missing":[],"risk":"safe","intent":"gh_pr_list","understood":true,"context":{"used":false}}
{"q":"merge all prs","h":null,"command":"gh pr merge","missing":[],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":false}}
{"q":"merge pr 45 and 46","h":null,"command":"gh pr merge 45","missing":[],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":false}}
{"q":"merge pr #45 and #46","h":null,"command":"gh pr merge 45","missing":[],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":false}}
{"q":"merge the PR whose checks passed","h":null,"command":"gh pr merge <PR>","missing":["pr"],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":false}}
{"q":"merge pr 45 --repo acme/web --repo other/repo","h":null,"command":"gh pr merge 45 --repo acme/web","missing":[],"risk":"medium","intent":"gh_pr_merge","understood":true,"context":{"used":false}}

exec
/bin/bash -lc "sed -n '1,180p' scripts/hybrid/train_encoder.py; cat scripts/hybrid/train_lm_gpu.py" in /workspace/tellsh
 succeeded in 0ms:
#!/usr/bin/env python3
"""(B) Fine-tune the vocab-pruned multilingual-e5-small as a joint tool + intent classifier with a BIO slot-tagger head.

Input:  build/hybrid/train.jsonl, build/hybrid/meta.json (node scripts/hybrid/export_data.js)
        build/hybrid/e5-pruned/ (python3 scripts/hybrid/prune_vocab.py)
Model:  <s> request </s></s> "bash linux" </s>  ->  mean-pooled encoder -> tool head (55) + intent head (149)
                                                   per-token -> BIO head (37 labels; only request tokens are labelled)
Rows with intent '' (tldr descriptions, OOD) train the tool head only; typo copies carry no spans (tag loss masked).
Only split=='train' rows are used; split=='dev' is kept for threshold calibration.
Resumable: a checkpoint (model + optimizer + step) is written every --ckpt-every steps and at each epoch end.

Usage: python3 scripts/hybrid/train_encoder.py [--layers 6] [--epochs 2.5] [--threads 2] [--out build/hybrid/enc]
"""
import argparse, json, math, os, random, time
import torch
import torch.nn as nn
from transformers import AutoModel, AutoTokenizer

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class Joint(nn.Module):
    def __init__(self, base, n_tool, n_intent, n_tag, layers=None):
        super().__init__()
        self.enc = AutoModel.from_pretrained(base) if isinstance(base, str) else base
        if layers and layers < len(self.enc.encoder.layer):  # keep the bottom `layers` transformer blocks
            self.enc.encoder.layer = self.enc.encoder.layer[:layers]
            self.enc.config.num_hidden_layers = layers
        h = self.enc.config.hidden_size
        self.drop = nn.Dropout(0.1)
        self.tool = nn.Linear(h, n_tool)
        self.intent = nn.Linear(h, n_intent)
        self.tag = nn.Linear(h, n_tag)

    def forward(self, input_ids, attention_mask):
        hs = self.enc(input_ids=input_ids, attention_mask=attention_mask).last_hidden_state
        m = attention_mask.unsqueeze(-1).to(hs.dtype)
        pooled = (hs * m).sum(1) / m.sum(1).clamp(min=1)
        pooled = self.drop(pooled)
        return self.tool(pooled), self.intent(pooled), self.tag(self.drop(hs))


def ctx_str(r):
    return f"{r.get('shell') or 'bash'} {r.get('os') or 'linux'}"


def encode(tok, rows, meta, max_len=64):
    tl = {t: i for i, t in enumerate(meta['tools'])}
    il = {t: i for i, t in enumerate(meta['intents'])}
    gl = {t: i for i, t in enumerate(meta['tagLabels'])}
    enc = tok([r['text'] for r in rows], [ctx_str(r) for r in rows], truncation='only_first', max_length=max_len,
              return_offsets_mapping=True)
    out = []
    for k, r in enumerate(rows):
        ids = enc['input_ids'][k]
        offs = enc['offset_mapping'][k]
        seq = enc.sequence_ids(k)
        tags = [-100] * len(ids)
        if r.get('spans') is not None:
            prev_span = None
            for j, (s, e) in enumerate(offs):
                if seq[j] != 0 or e <= s:
                    continue
                lab = 'O'
                cur = None
                for si, (typ, a, b) in enumerate(r['spans']):
                    # XLM-R offsets may include the leading space of a word piece
                    ss = s + (1 if r['text'][s:s + 1] == ' ' else 0)
                    if min(e, b) - max(ss, a) > 0:
                        cur = si
                        lab = ('I-' if prev_span == si else 'B-') + typ
                        break
                tags[j] = gl[lab]
                prev_span = cur
        out.append({'ids': ids, 'tool': tl[r['tool']], 'intent': il.get(r['intent'], -100) if r['intent'] else -100, 'tags': tags})
    return out


def collate(batch, pad_id):
    L = max(len(b['ids']) for b in batch)
    ids = torch.full((len(batch), L), pad_id, dtype=torch.long)
    att = torch.zeros((len(batch), L), dtype=torch.long)
    tags = torch.full((len(batch), L), -100, dtype=torch.long)
    for i, b in enumerate(batch):
        n = len(b['ids'])
        ids[i, :n] = torch.tensor(b['ids'])
        att[i, :n] = 1
        tags[i, :n] = torch.tensor(b['tags'])
    return ids, att, torch.tensor([b['tool'] for b in batch]), torch.tensor([b['intent'] for b in batch]), tags


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', default=os.path.join(ROOT, 'build/hybrid/e5-pruned'))
    ap.add_argument('--out', default=os.path.join(ROOT, 'build/hybrid/enc'))
    ap.add_argument('--epochs', type=float, default=4)
    ap.add_argument('--bs', type=int, default=32)
    ap.add_argument('--lr', type=float, default=8e-5)
    ap.add_argument('--threads', type=int, default=4)
    ap.add_argument('--ckpt-every', type=int, default=500)
    ap.add_argument('--seed', type=int, default=17)
    ap.add_argument('--layers', type=int, default=6, help='truncate the encoder to its bottom N layers (12 = full)')
    ap.add_argument('--all', action='store_true', help='also train on the dev split (final model; no calibration data left)')
    a = ap.parse_args()
    torch.set_num_threads(a.threads)
    random.seed(a.seed)
    torch.manual_seed(a.seed)
    meta = json.load(open(os.path.join(ROOT, 'build/hybrid/meta.json')))
    rows = [json.loads(l) for l in open(os.path.join(ROOT, 'build/hybrid/train.jsonl'), encoding='utf-8')]
    rows = [r for r in rows if a.all or r['split'] == 'train']
    tok = AutoTokenizer.from_pretrained(a.base)
    data = encode(tok, rows, meta)
    model = Joint(a.base, len(meta['tools']), len(meta['intents']), len(meta['tagLabels']), a.layers)
    head_params = [p for n, p in model.named_parameters() if not n.startswith('enc.')]
    enc_params = [p for n, p in model.named_parameters() if n.startswith('enc.')]
    opt = torch.optim.AdamW([{'params': enc_params, 'lr': a.lr}, {'params': head_params, 'lr': a.lr * 10}], weight_decay=0.01)
    steps_per_epoch = math.ceil(len(data) / a.bs)
    total = int(steps_per_epoch * a.epochs)
    warm = int(0.06 * total)
    sched = torch.optim.lr_scheduler.LambdaLR(opt, lambda s: min(1, (s + 1) / max(1, warm)) * max(0.0, (total - s) / max(1, total - warm)))
    os.makedirs(a.out, exist_ok=True)
    ck = os.path.join(a.out, 'ckpt.pt')
    step = 0
    if os.path.exists(ck):
        st = torch.load(ck, map_location='cpu', weights_only=False)
        model.load_state_dict(st['model']); opt.load_state_dict(st['opt']); sched.load_state_dict(st['sched']); step = st['step']
        print(f'resumed at step {step}/{total}', flush=True)
    ce = nn.CrossEntropyLoss(ignore_index=-100)
    pad = tok.pad_token_id
    t0 = time.time()
    model.train()
    while step < total:
        ep = step // steps_per_epoch
        order = list(range(len(data)))
        random.Random(a.seed + ep).shuffle(order)
        # length-bucketed batches for speed
        chunks = [order[i:i + a.bs * 50] for i in range(0, len(order), a.bs * 50)]
        batches = []
        for c in chunks:
            c = sorted(c, key=lambda i: len(data[i]['ids']))
            batches += [c[i:i + a.bs] for i in range(0, len(c), a.bs)]
        random.Random(a.seed + 1000 + ep).shuffle(batches)
        for bi in range(step - ep * steps_per_epoch, len(batches)):
            if step >= total:
                break
            ids, att, yt, yi, ytag = collate([data[i] for i in batches[bi]], pad)
            lt, li, lg = model(ids, att)
            loss = ce(lt, yt) + (ce(li, yi) if (yi >= 0).any() else 0) + 0.5 * (ce(lg.reshape(-1, lg.shape[-1]), ytag.reshape(-1)) if (ytag >= 0).any() else 0)
            opt.zero_grad()
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
            opt.step(); sched.step(); step += 1
            if step % 50 == 0:
                el = time.time() - t0
                print(f'step {step}/{total} ep {ep} loss {loss.item():.4f} {el:.0f}s', flush=True)
            if step % a.ckpt_every == 0 or step == total or bi == len(batches) - 1:
                torch.save({'model': model.state_dict(), 'opt': opt.state_dict(), 'sched': sched.state_dict(), 'step': step}, ck + '.tmp')
                os.replace(ck + '.tmp', ck)
    model.eval()
    torch.save(model.state_dict(), os.path.join(a.out, 'final.pt'))
    tok.save_pretrained(a.out)
    json.dump({'base': a.base, 'layers': a.layers, 'epochs': a.epochs, 'rows': len(data), 'all': a.all, 'meta': meta}, open(os.path.join(a.out, 'train_info.json'), 'w'))
    print('done', flush=True)


if __name__ == '__main__':
    main()
#!/usr/bin/env python3
"""(C) GPU fine-tuning of the option-letter reranker (ready to run; CPU training on the dev box was too slow).

Trains Qwen2.5-0.5B-Instruct (default; any HF causal LM works) to answer the A..E option prompt of
scripts/hybrid/lm_rerank.py: cross-entropy on the 5 letter logits at the last position only (one forward pass,
exactly what runs at inference).  LoRA (r=16, all linear layers) in bf16, then merged.

Inputs (create on the dev box, copy to the GPU machine together with this repo):
  node scripts/hybrid/export_data.js && node scripts/hybrid/dump_cascade.js --tag=ship
  -> build/hybrid/meta.json, build/hybrid/cands_ship.jsonl   (rows with set=='train' are used; 'dev' for validation)

Run (single GPU, ~15-30 min on an A10/L4 for 3 epochs of ~15.7k rows):
  pip install torch transformers peft accelerate
  python3 scripts/hybrid/train_lm_gpu.py --model Qwen/Qwen2.5-0.5B-Instruct --epochs 3 --out build/hybrid/lm-qwen05
Then on the dev box:
  python3 scripts/hybrid/lm_rerank.py score --model build/hybrid/lm-qwen05/final --plain --cands build/hybrid/cands_ship.jsonl ...
  python3 /path/to/llama.cpp/convert_hf_to_gguf.py build/hybrid/lm-qwen05/final --outtype q8_0   (CPU runtime)
"""
import argparse, json, math, os, random, sys, time
import torch

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from lm_rerank import Prompter, candidate_list, read_cands, ROOT  # noqa: E402


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--model', default='Qwen/Qwen2.5-0.5B-Instruct')
    ap.add_argument('--cands', default=os.path.join(ROOT, 'build/hybrid/cands_ship.jsonl'))
    ap.add_argument('--out', default=os.path.join(ROOT, 'build/hybrid/lm-qwen05'))
    ap.add_argument('--epochs', type=float, default=3)
    ap.add_argument('--bs', type=int, default=32)
    ap.add_argument('--lr', type=float, default=2e-4)
    ap.add_argument('--full', action='store_true', help='full fine-tune instead of LoRA')
    a = ap.parse_args()
    from transformers import AutoModelForCausalLM, AutoTokenizer
    dev = 'cuda' if torch.cuda.is_available() else 'cpu'
    torch.manual_seed(0)
    tok = AutoTokenizer.from_pretrained(a.model)
    tok.padding_side = 'left'
    if tok.pad_token is None:
        tok.pad_token = tok.eos_token
    m = AutoModelForCausalLM.from_pretrained(a.model, dtype=torch.bfloat16).to(dev)
    if not a.full:
        from peft import LoraConfig, get_peft_model
        m = get_peft_model(m, LoraConfig(r=16, lora_alpha=32, lora_dropout=0.05,
                                         target_modules=['q_proj', 'k_proj', 'v_proj', 'o_proj', 'gate_proj', 'up_proj', 'down_proj']))
        m.print_trainable_parameters()
    P = Prompter(tok, chat=False)
    lid = torch.tensor(P.letter_ids, device=dev)
    train = [r for r in read_cands(a.cands, {'train'}) if r['intent']]
    val = [r for r in read_cands(a.cands, {'dev'}) if r['intent']][:1000]
    if not train:
        raise SystemExit('no labeled train rows in ' + a.cands)
    steps = int(math.ceil(len(train) / a.bs) * a.epochs)
    params = [p for p in m.parameters() if p.requires_grad]
    opt = torch.optim.AdamW(params, lr=a.lr, weight_decay=0.0)
    sched = torch.optim.lr_scheduler.LambdaLR(opt, lambda s: min(1, (s + 1) / 50) * max(0.0, 1 - s / steps))

    def batch_logits(rows, rng, train_mode):
        lists = [candidate_list(r, rng, train=True) for r in rows]
        enc = tok([P(r['text'], r['shell'], r['os'], c) for r, c in zip(rows, lists)], return_tensors='pt', padding=True,
                  add_special_tokens=False).to(dev)
        lg = m(**enc, logits_to_keep=1).logits[:, -1, :][:, lid].float()
        y = torch.tensor([c.index(r['intent']) for r, c in zip(rows, lists)], device=dev)
        return lg, y

    @torch.no_grad()
    def evaluate():
        m.eval()
        ok = 0
        rng = random.Random(5)
        for i in range(0, len(val), a.bs):
            lg, y = batch_logits(val[i:i + a.bs], rng, False)
            ok += (lg.argmax(-1) == y).sum().item()
        m.train()
        return ok / max(1, len(val))

    print('zero-shot choice accuracy on dev:', evaluate(), flush=True)
    rng = random.Random(11)
    step = 0
    t0 = time.time()
    m.train()
    while step < steps:
        random.Random(step).shuffle(train)
        # the last, partial batch too: with fewer rows than --bs a full-batch-only loop never advances `step`
        for i in range(0, len(train), a.bs):
            lg, y = batch_logits(train[i:i + a.bs], rng, True)
            loss = torch.nn.functional.cross_entropy(lg, y)
            opt.zero_grad(); loss.backward(); torch.nn.utils.clip_grad_norm_(params, 1.0); opt.step(); sched.step(); step += 1
            if step % 50 == 0:
                print(f'step {step}/{steps} loss {loss.item():.4f} {time.time() - t0:.0f}s', flush=True)
            if step % 500 == 0:
                print('dev choice accuracy:', evaluate(), flush=True)
            if step >= steps:
                break
    print('final dev choice accuracy:', evaluate(), flush=True)
    if not a.full:
        m = m.merge_and_unload()
    os.makedirs(a.out, exist_ok=True)
    m.save_pretrained(os.path.join(a.out, 'final'))
    tok.save_pretrained(os.path.join(a.out, 'final'))


if __name__ == '__main__':
    main()

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const h of ['gh pr view 45; gh pr list','gh pr list','gh pr view 45 | head -1','gh pr view 45; echo done','gh pr view 45; clear','gh pr view 45; git status','gh pr view 45; gh pr view','gh pr view 45; gh pr checks','gh pr view 45; gh pr view 46','gh pr view 45; gh pr list --state closed']) {
 for (const q of ['merge that pr','merge it']) {const r=suggest(q,{env,history:[h]}); console.log(JSON.stringify({q,h,command:r.command,missing:r.missing,context:r.context}));}
}
JS
sed -n '1210,1249p' src/history.js; nl -ba src/pipeline.js | sed -n '513,550p'; nl -ba src/pipeline.js | sed -n '583,619p'" in /workspace/tellsh
 succeeded in 104ms:
{"q":"merge that pr","h":"gh pr view 45; gh pr list","command":"gh pr merge 45","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge it","h":"gh pr view 45; gh pr list","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge that pr","h":"gh pr list","command":"gh pr merge <PR>","missing":["pr"],"context":{"used":true,"commands":1,"rule":"refused","note":"the previous command names no pr; not guessing"}}
{"q":"merge it","h":"gh pr list","context":{"used":true,"commands":1,"rule":"refused","note":"the previous command names nothing the reference could mean; not guessing"}}
{"q":"merge that pr","h":"gh pr view 45 | head -1","command":"gh pr merge 45","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge it","h":"gh pr view 45 | head -1","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge that pr","h":"gh pr view 45; echo done","command":"gh pr merge 45","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge it","h":"gh pr view 45; echo done","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge that pr","h":"gh pr view 45; clear","command":"gh pr merge 45","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge it","h":"gh pr view 45; clear","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge that pr","h":"gh pr view 45; git status","command":"gh pr merge 45","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge it","h":"gh pr view 45; git status","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge that pr","h":"gh pr view 45; gh pr view","command":"gh pr merge 45","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge it","h":"gh pr view 45; gh pr view","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge that pr","h":"gh pr view 45; gh pr checks","command":"gh pr merge 45","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge it","h":"gh pr view 45; gh pr checks","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge that pr","h":"gh pr view 45; gh pr view 46","command":"gh pr merge 46","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 46"}}
{"q":"merge it","h":"gh pr view 45; gh pr view 46","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 46"}}
{"q":"merge that pr","h":"gh pr view 45; gh pr list --state closed","command":"gh pr merge 45","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge it","h":"gh pr view 45; gh pr list --state closed","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
 * (rm, mv, cp, kill, chmod, git branch -d, ...), or null:
 *   - the request is about the entries inside a directory ("delete everything in it", "its contents");
 *   - a find/grep search root or a listed directory (`ls /tmp/build`): the user saw entries inside it;
 *   - a later segment of the command listed values of the type (`cat a.txt; ls`, `pgrep foo | xargs ps`, `docker ps`);
 *   - the directory of a `cd` after which other commands ran (`cd /tmp/build; make`, `cd /tmp/build && rg TODO`);
 */
export function changeGuard(type, value, fq, ctx) {
  const v = String(value);
  if (type === 'dir' && CONTENTS.test(fq)) return `the request is about the entries inside ${v}, not ${v} itself; not guessing`;
  if (type === 'dir' && ctx.searchRoots?.has(v)) return `the directory of the previous command (${v}) is where a search ran, not what it found; not guessing`;
  if (type === 'dir' && ctx.listedDirs?.has(v)) {
    const pl = PLURAL.exec(fq);
    return pl ? `"${pl[1]}" are the entries listed in ${v}, not the directory; not guessing`
      : `${v} was listed: the reference may mean the directory or one of its entries; not guessing`;
  }
  const L = ctx.listing?.[type];
  if (L && L.seg > (ctx.pos?.[type] ?? 0)) {
    return `the previous command listed ${type === 'dir' || type === 'file' ? 'files' : `${type} values`}, so the reference may mean one of them, not ${v}; not guessing`;
  }
  if (type === 'dir' && ctx.cdDir?.value === v && ctx.cdDir.followed) return `${v} is the working directory of a cd after which other commands ran; not guessing`;
  // `cat a.txt; cd /srv`: the line also named a file before the cd, so "it" may mean the file as well as the directory
  if (type === 'dir' && ctx.cdDir?.value === v && ctx.ents.file != null) return `the previous command named a file (${rawOf(ctx.ents.file)}) and then changed to ${v}; the reference is unclear; not guessing`;
  // "delete that backups folder" after `mkdir /srv/current`: the request names something else
  const hints = [...fq.matchAll(HINTED_NOUN)].map((m) => m[1]).filter(isHintWord);
  if (hints.length && !hints.some((w) => foldKeepLength(v).toLowerCase().includes(w))) return `the request names "${hints.join(' ')}", which is not part of ${v}; not guessing`;
  return null;
}

/** The value of an entity type in the previous command (ambiguous values are returned as they are, and refused). */
const chooseValue = (type, ctx) => ctx.ents[type];

// a word naming which one between a reference and its noun ("that backups folder", "ten folder backups" is not read)
const HINTED_NOUN = /\b(?:that|this|those|these|the|ten|ta|te|tamten|tamta|tamte)\s+([a-z0-9][\w.-]*)\s+(?:folders?|director(?:y|ies)|dirs?|files?|branch(?:es)?|containers?|services?|process(?:es)?|katalog\w*|folder\w*|plik\w*|kontener\w*|uslug\w*|galaz\w*|galez\w*)\b/g;
// words of a request that may identify a target ("that backups folder"), not the action, pronoun or filler words
const NOT_HINT = /^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back|list\w*|wylistuj\w*|check|sprawdz\w*|wipe|nuke|purge|destroy|clear|clean\w*|wyczysc\w*|drop|what|which|where|about|with|from|into|then|also|again|teraz|jeszcze|whatever|everything|anything|something|thing|stuff|still|there|here|tutaj|tamto|wszystko|cokolwiek|whole|entire|completely|cale|calym|listening|running|working|executable|wykonywaln\w*|contents?|zawartosc\w*|entries|inside|wewnatrz|siedzi|srodku|please|prosze|again|ponownie|znowu|forcefully|recursively|rekurencyjnie|permanently|trwale|names?|nazw\w*|only|tylko|same|samo|thing|merged|zmergowan\w*|scalon\w*|current|biezac\w*|aktualn\w*|obecn\w*|previous|poprzedni\w*|ostatni\w*|last|other|inn\w*|empty|pust\w*|temporary|tymczasow\w*|local|lokaln\w*|remote|zdaln\w*|stopped|zatrzyman\w*|created|utworzon\w*|newly|nowo|nowy|nowa|nowe|nowym|whole|cal\w*|samym|given|mentioned|wspomnian\w*|above|powyzsz\w*|broken|zepsut\w*|failed|failing|nieudan\w*|old\w*|star\w*)$/;
const isHintWord = (w) => w.length >= 4 && !/^\d+$/.test(w) && !NOT_HINT.test(w) && !isStopWord(w) && !PRONOUN_WORD.test(w) && !FORCE.test(w)
  && !VERBS.some(([, re]) => re.test(w)) && !NOUN_TYPE.some(([re]) => re.test(w));

/** Implicit references ("ile ma słów", "md5 of the same file"): fill a missing slot from history. */
export function entityForSlot(slot, ctx) {
   513	    for (const [k, v] of Object.entries(refFill)) {
   514	      if (!validSlot(k, v)) {
   515	        // the referenced value cannot be used (too long, a newline, ...): placeholder, never the catalog default
   516	        if (slots[k] != null && PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
   517	        if (slots[k] == null && usesSlot(it, k)) { blank.add(k); keep.add(k); }
   518	        continue;
   519	      }
   520	      // the referenced value wins unless the request spells out its own value literally ("kill 4242")
   521	      const literal = slots[k] != null && !PRONOUN_VALUE.test(String(slots[k])) && new RegExp(`(^|[^\\w])${String(slots[k]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^\\w])`, 'i').test(query);
   522	      if (usesSlot(it, k) && (!literal || (k === 'path' && slots[k] === '.'))) { slots[k] = v; r.sources[k] = 'history'; }
   523	    }
   524	    // the chosen command does not take the referenced value: do not claim it was used
   525	    if (!Object.values(r.sources).includes('history')) { context.rule = null; context.note = `the ${ref.ent} from history does not fit ${intent}; not used`; }
   526	    finalizeSlots(it, slots);
   527	    method = 'history-rule';
   528	  }
   529	  if (sb) {
   530	    const it = BY_ID[intent];
   531	    for (const [k, v] of Object.entries(validHistorySlots(sb.lastSlots))) {
   532	      if (usesSlot(it, k) && slots[k] == null && !blank.has(k) && !['namepat', 'sedexpr'].includes(k)) { slots[k] = v; r.sources[k] = 'history'; }
   533	    }
   534	    // a slot of the previous command that depends on the shell state (`find "$DIR" …`) or is not a valid value
   535	    // (a 300-character path): placeholder, not `.`
   536	    const withheld = [...(sb.blank || []), ...invalidHistorySlots(sb.lastSlots)].filter((k) => usesSlot(it, k) && slots[k] == null && !['namepat', 'sedexpr'].includes(k));
   537	    for (const k of withheld) { blank.add(k); keep.add(k); }
   538	    if (withheld.length) { context.rule = 'refused'; context.note = `previous ${sb.lastIntent} has ${withheld.join(', ')} that depends on the shell state or is not a valid value; not guessing`; }
   539	    finalizeSlots(it, slots);
   540	  }
   541	  // "merge the other pr", "merge my last pr": not the previous command's pull request either, unless the request names one;
   542	  // "merge that pr in repo a/b": the previous command's pull request was one of the working directory's repository
   543	  if (usesSlot(BY_ID[intent], 'pr') && (slots.pr == null || r.sources.pr === 'history') && (PR_PICKED.test(query) || (r.sources.pr === 'history' && slots.repo != null))) {
   544	    delete slots.pr; delete r.sources.pr;
   545	    blank.add('pr'); keep.add('pr');
   546	    context.rule = ctx ? 'refused' : context.rule;
   547	    if (ctx) context.note = 'the request means a pull request (another one, or one in another repository) the history does not name; not guessing';
   548	  }
   549	  // "merge that pr" with no history to read it from: the pull request is withheld, never the current branch's
   550	  if (!ref && slots.pr == null && usesSlot(BY_ID[intent], 'pr') && PR_REFERENCE.test(query)) {
   583	      : `path left as a placeholder: it is the output of a command substitution (${unclearPaths.join(', ')})`];
   584	  }
   585	  if (method === 'catalog' && ctx == null && hasPronoun(query) && b.missing.length) res.hint = 'this looks like a reference to an earlier command; try --history';
   586	
   587	  // ---- second pass on modifier mismatch: the request asks for flags the catalog command lacks ----
   588	  //   same tool: >= 1 triggered flag not in the catalog command; another stage-1 tool: >= 2 triggered flags
   589	  // a slot the catalog withheld on purpose (command substitution, a rejected or unclear path, ...) is never filled by the
   590	  // composer: the catalog command with its placeholder is the answer
   591	  if (method === 'catalog' && composeMode !== 'off' && b.command && !blank.size && !['powershell', 'cmd', 'fish'].includes(env.shell)) {
   592	    const fam = FAMILY_OF[intent];
   593	    const ci = composeInput(query, model, fam, opts.unclearArgs);
   594	    const opt = { patternOf: ci.pattern, nameOf: ci.nameOf };
   595	    const have = flagTokens(b.command);
   596	    const expl = new Set(explained()[intent] || []);
   597	    const unexplained = (cmp) => cmp.triggered.filter((f) => !expl.has((cmp.sub ? cmp.sub + ' ' : '') + f));
   598	    let comp = compose(query, [{ tool: fam, p: 1 }], ci.ex, opt);
   599	    if (blocksAmbiguous(comp, ci.ambiguousPaths)) comp = null;
   600	    // same tool: the composed command must keep the catalog command's head (+ git/docker subcommand)
   601	    const sameHead = comp && !comp.invalid && headOf(comp.command) === headOf(b.command);
   602	    let extra = sameHead ? unexplained(comp).filter((f) => [...flagTokens(f)].some((x) => !have.has(x))) : [];
   603	    if (!extra.length) {
   604	      const others = c.tools.filter((t) => t.tool !== NONE && t.p >= 0.05);
   605	      let alt = compose(query, others.length ? others : [{ tool: fam, p: 1 }], ci.ex, opt);
   606	      if (blocksAmbiguous(alt, ci.ambiguousPaths)) alt = null;
   607	      const ux = alt && !alt.invalid && headOf(alt.command) !== headOf(b.command) ? unexplained(alt) : [];
   608	      if (ux.length >= 2) { comp = alt; extra = ux; }
   609	    }
   610	    // a value with a line break is never composed into a command (the catalog rejects it as a path)
   611	    if (comp && !comp.invalid && comp.command !== b.command && !/[\r\n]/.test(comp.command)) {
   612	      if (extra.length >= 1 || composeMode === 'force') {
   613	        return { ...res, method: 'composed', experimental: true, reason: `request asks for ${extra.join(' ')} not in the catalog command`,
   614	          catalogCommand: b.command, description: `composed ${comp.tool}${comp.sub ? ' ' + comp.sub : ''} command (experimental)`,
   615	          command: comp.command, risk: comp.risk, baseRisk: 'medium', warnings: comp.warnings, critical: comp.critical, missing: [],
   616	          composed: { tool: comp.tool, sub: comp.sub, flags: comp.flags, validation: comp.validation } };
   617	      }
   618	    }
   619	  }

codex
I reproduced PR targeting errors within a single history line: a later repository change can leave an earlier PR number usable, and a later PR listing or selector-free view can leave the old number selected. Some tests also fail because the read-only sandbox blocks temporary-file creation; I’m separating those failures from product defects.

exec
/bin/bash -lc "sed -n '1,250p' src/danger.js; sed -n '1,220p' scripts/teacher.js" in /workspace/tellsh
 succeeded in 0ms:
// Dangerous-pattern checker. Runs on every final command (including user-edited ones)
// and can only ever escalate risk, never lower it.
//
// Regex rules run on the command text after `git`/`docker` global options are removed
// (`git -C /repo -c x=y reset --hard` is checked as `git reset --hard`). Structural rules
// (rm, kill, Remove-Item, rd/del) tokenize each simple command so long options, quoted targets
// and `--` are understood.

const RANK = { safe: 0, medium: 1, high: 2 };
export const maxRisk = (a, b) => (RANK[b] > RANK[a] ? b : a);

// ---------------------------------------------------------------------------------------------
// light tokenizer: simple commands separated by ; & | && || ( ) and newlines, words unquoted
// (POSIX '…' "…" \x and PowerShell `x). Good enough for danger checks, not a full shell parser.

// PowerShell also treats the typographic quotes as quote characters (about_Quoting_Rules)
const PS_SQ = /['\u2018\u2019\u201A\u201B]/;
const PS_DQ = /["\u201C\u201D\u201E]/;

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
    if (isSq(c)) {
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
#!/usr/bin/env node
// Build-time teacher: TypeSafe Jev (https://docs.typesafe.ai, POST /v1/systemone, model jev-latest).
// Never used at runtime. The API key is read from the environment only; it is never printed or logged.
//
//   TYPESAFE_API_KEY=... node scripts/teacher.js verify   # (a) every training row: intent + risk
//   TYPESAFE_API_KEY=... node scripts/teacher.js label    # (b) label/filter new paraphrase candidates
//   TYPESAFE_API_KEY=... node scripts/teacher.js mine     # (c) hard negatives between confusable intents
//   node scripts/teacher.js report                        # EVAL.md teacher section from the artifacts
//
// Independence: the intent question shows ONLY the request (and the user's shell); never our label, the
// rendered command or anything derived from the label. The options are the label plus the cascade's
// closest alternatives plus known confusable intents plus "none of these", shuffled, so the label is
// one of 4-6 plausible options. The risk question is asked about the request alone. Because the label is
// always among the options, "agreement" is a consistency check, not an independent accuracy estimate.
// Options come from --options-model (default model/model.bin; sha256 recorded in each summary), so pin
// that file to rerun with identical prompts and cache keys. Failed calls are counted, never treated as a
// rejection. Held-out texts and their near-duplicates (scripts/lib/heldout.js) are never sent.
// Several rows are packed into one call (one question per row and aspect; Jev evaluates every
// question in isolation against the shared state), responses are cached in build/jev_cache.jsonl, and
// every network call is counted in data/teacher/ledger.json.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BY_ID, INTENTS } from '../src/catalog.js';
import { cascade } from '../src/cascade.js';
import { envFeatures } from '../src/env.js';
import { normalize } from '../src/features.js';
import { mulberry32 } from './lib/silver.js';
import { ask, pool, stats, recordLedger, LEDGER, PRICE_PER_MTOK, MODEL } from './lib/jev.js';
import { updateSection } from './report.js';
import { CONFUSABLE, CONTRAST_RULES } from './lib/confusable.js';
import { exclusionIndex } from './lib/heldout.js';
import { parseModel, DEFAULT_MODEL } from '../src/model.js';
import { createHash } from 'node:crypto';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const TDIR = join(ROOT, 'data', 'teacher');
const BDIR = join(ROOT, 'build', 'teacher');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=')[1] : d; };
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const writeJsonl = (p, rows) => writeFileSync(p, rows.map((r) => JSON.stringify(r)).join('\n') + (rows.length ? '\n' : ''));
const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f)).map((r) => ({ ...r, file: f }))) : []);

const STATE = 'Requests that users typed (in Polish or English) into a command-line assistant which turns each request into ONE shell command ' +
  'for the named shell. Each question quotes one request.';
const SHELL_NAME = { bash: 'bash', zsh: 'zsh', sh: 'POSIX sh', powershell: 'PowerShell', fish: 'fish', cmd: 'Windows cmd.exe' };
const RISK = {
  safe: 'read-only: only shows information',
  medium: 'changes files, settings or remote state in a recoverable way',
  high: 'deletes data, kills processes, discards work or is hard to undo',
};
const RANK = { safe: 0, medium: 1, high: 2 };

// The cascade that proposes the alternative options. Prompts (and so cache keys) depend on it: pin it
// with --options-model=FILE to rerun with the same questions; its sha256 is recorded in every summary.
const OPTIONS_MODEL_PATH = arg('options-model', DEFAULT_MODEL);
let optionsModel = null;
let optionsModelSha = null;
function getOptionsModel() {
  if (!optionsModel) {
    const buf = readFileSync(OPTIONS_MODEL_PATH);
    optionsModelSha = createHash('sha256').update(buf).digest('hex');
    optionsModel = parseModel(buf);
  }
  return optionsModel;
}

/** Options for the intent question: label + closest cascade alternatives + confusable intents, shuffled. */
function intentOptions(text, label, shell, os, rng, k = 3) {
  const c = cascade(text, { model: getOptionsModel(), extras: envFeatures({ shell: shell || 'bash', os: os || 'linux' }), top: 8 });
  const alts = c.top.map((t) => t.intent).filter((i) => i && i !== label);
  const conf = (CONFUSABLE[label] || []).filter((i) => i !== label);
  const opts = [...new Set([label, ...conf.slice(0, 2), ...alts])].slice(0, k + 1 + Math.min(1, conf.length));
  for (let i = opts.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [opts[i], opts[j]] = [opts[j], opts[i]]; }
  return { opts, model: c.intent, modelP: c.confidence };
}
const criteriaOf = (opts) => Object.fromEntries([...opts.map((i) => [i, BY_ID[i].description]), ['none', 'none of these / something else']]);
const intentQ = (text, shell, opts) => ({
  type: 'choice',
  instructions: { question: 'Which action does this request ask the assistant to do?', shell: SHELL_NAME[shell] || 'bash', request: text },
  criteria: criteriaOf(opts),
});
const riskQ = (text) => ({
  type: 'choice',
  instructions: { question: 'How risky is it to carry out this request on the user\'s machine?', request: text },
  criteria: RISK,
});

/** Ask about many items, `per` items per call. item -> { qs: {suffix: question} }; returns answers per item. */
async function askPacked(items, per, label) {
  const calls = [];
  for (let i = 0; i < items.length; i += per) {
    const group = items.slice(i, i + per);
    calls.push(async () => {
      const questions = {};
      group.forEach((it, j) => { for (const [k, q] of Object.entries(it.qs)) questions[`${k}_${j}`] = q; });
      const r = await ask(STATE, questions);
      return group.map((_, j) => Object.fromEntries(Object.keys(group[j].qs).map((k) => [k, r.answers[`${k}_${j}`]])));
    });
  }
  const t0 = Date.now();
  const res = await pool(calls, +arg('concurrency', 16), (d, n) => console.log(`  ${label}: ${d}/${n} calls (${stats.calls} network, ${stats.cached} cached, ${stats.inTok} tok, ${Math.round((Date.now() - t0) / 1000)} s)`));
  const out = [];
  res.forEach((r, ci) => {
    const n = Math.min(per, items.length - ci * per);
    for (let j = 0; j < n; j++) out.push(r?.error ? null : r[j]);
  });
  return out;
}

/**
 * The exclusion index of gen_data.js (scripts/lib/heldout.js exclusionIndex): held-out texts incl. near-duplicates
 * and contrastive rewrites, and texts that mention an eval-only slot value. Nothing it excludes is sent to Jev.
 */
const heldOutSet = () => exclusionIndex(ROOT);

/**
 * Training rows filtered as gen_data.js filters them: held-out texts (and their near-duplicates) are never
 * sent to the teacher, and rows dropped in data/teacher/decisions.jsonl are not mined from.
 */
function trainingRows(held = heldOutSet()) {
  const dropped = new Set(readJsonl(join(TDIR, 'decisions.jsonl')).filter((d) => d.text && d.action === 'drop').map((d) => normalize(d.text)));
  return [...readDir(join(ROOT, 'data', 'intents')).map((r) => ({ ...r, src: `intents/${r.file}` })),
    ...readJsonl(join(ROOT, 'data', 'train.jsonl')).map((r) => ({ ...r, src: 'train.jsonl' })),
    ...readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell/train.jsonl' }))]
    .filter((r) => !held.has(r.text) && !dropped.has(normalize(r.text)));
}

// ---------------------------------------------------------------------------------------------
// (a) verify every training row
async function verify() {
  const rng = mulberry32(+arg('seed', 5));
  const rows = trainingRows().slice(0, +arg('limit', 1e9));
  const items = rows.map((r) => {
    const o = intentOptions(r.text, r.intent, r.shell, r.os, rng);
    return { r, o, qs: { i: intentQ(r.text, r.shell, o.opts), k: riskQ(r.text) } };
  });
  console.log(`teacher verify: ${rows.length} training rows, ${+arg('per', 3)} per call`);
  const ans = await askPacked(items, +arg('per', 3), 'verify');
  mkdirSync(BDIR, { recursive: true });
  const res = items.map((it, j) => {
    const a = ans[j];
    if (!a) return { text: it.r.text, intent: it.r.intent, src: it.r.src, failed: true };
    return {
      text: it.r.text, intent: it.r.intent, lang: it.r.lang, shell: it.r.shell || '', src: it.r.src, opts: it.o.opts, model: it.o.model,
      t_intent: a.i?.choice, t_conf: a.i?.confidence, t_p: a.i?.probabilities?.[it.r.intent] ?? null,
      t_risk: a.k?.choice, t_risk_conf: a.k?.confidence, risk: BY_ID[it.r.intent].risk,
    };
  });
  writeJsonl(join(BDIR, 'verify.jsonl'), res);
  summarizeVerify(res);
  recordLedger('verify');
}

function summarizeVerify(res) {
  const ok = res.filter((r) => !r.failed);
  const agree = ok.filter((r) => r.t_intent === r.intent);
  // flagged: the teacher prefers another option (or none) with confidence >= 0.6 and gives our label p < 0.3
  const flagged = ok.filter((r) => r.t_intent !== r.intent && (r.t_conf ?? 0) >= 0.6 && (r.t_p ?? 0) < 0.3);
  const perIntent = {};
  for (const r of ok) {
    const p = (perIntent[r.intent] ??= { n: 0, agree: 0, riskHigher: 0, riskLower: 0, risk: r.risk, teacherRisk: {} });
    p.n++;
    if (r.t_intent === r.intent) p.agree++;
    p.teacherRisk[r.t_risk] = (p.teacherRisk[r.t_risk] || 0) + 1;
    if ((r.t_risk_conf ?? 0) >= 0.6 && RANK[r.t_risk] > RANK[r.risk]) p.riskHigher++;
    if ((r.t_risk_conf ?? 0) >= 0.6 && RANK[r.t_risk] < RANK[r.risk]) p.riskLower++;
  }
  // risk: an intent is flagged when the teacher rates the majority of its rows differently with confidence
  const riskFlags = Object.entries(perIntent).filter(([, p]) => p.riskHigher / p.n >= 0.5 || p.riskLower / p.n >= 0.5)
    .map(([id, p]) => ({ intent: id, ours: p.risk, teacher: Object.entries(p.teacherRisk).sort((a, b) => b[1] - a[1])[0][0], share: +(Math.max(p.riskHigher, p.riskLower) / p.n).toFixed(2), n: p.n }));
  const summary = {
    rows: res.length, answered: ok.length, failed: res.length - ok.length, optionsModelSha256: optionsModelSha,
    intentAgree: agree.length, flagged: flagged.length,
    riskAgree: ok.filter((r) => r.t_risk === r.risk).length,
    riskFlags,
    worstIntents: Object.entries(perIntent).map(([k, p]) => [k, +(p.agree / p.n).toFixed(3), p.n]).sort((a, b) => a[1] - b[1]).slice(0, 10),
  };
  mkdirSync(TDIR, { recursive: true });
  writeFileSync(join(TDIR, 'verify_summary.json'), JSON.stringify(summary, null, 1) + '\n');
  writeJsonl(join(TDIR, 'review.jsonl'), flagged.map((r) => ({ text: r.text, intent: r.intent, src: r.src, teacher: r.t_intent, conf: r.t_conf, p_ours: r.t_p, opts: r.opts })));
  console.log(`verify: ${ok.length}/${res.length} answered; intent agree ${agree.length} (${(100 * agree.length / ok.length).toFixed(1)}%); ` +
    `${flagged.length} flagged -> data/teacher/review.jsonl; risk agree ${(100 * summary.riskAgree / ok.length).toFixed(1)}%; ${riskFlags.length} intents with a risk disagreement`);
}

// ---------------------------------------------------------------------------------------------
// (b) label / filter new paraphrase candidates (data/candidates/*.jsonl) -> data/intents/g06_teacher.jsonl
async function label() {
  const rng = mulberry32(+arg('seed', 7));
  const held = heldOutSet();
  const have = new Set(trainingRows().filter((r) => !/^g0[67]_/.test(r.file || '')).map((r) => normalize(r.text)));
  const seen = new Set();
  const cands = readDir(join(ROOT, 'data', 'candidates')).filter((r) => {
    if (!r.intent) return false;
    const n = normalize(r.text);
    if (!BY_ID[r.intent] || held.has(r.text) || have.has(n) || seen.has(n)) return false;
    seen.add(n);
    return true;
  });
  const items = cands.map((r) => { const o = intentOptions(r.text, r.intent, r.shell, r.os, rng); return { r, o, qs: { i: intentQ(r.text, r.shell, o.opts) } }; });
  console.log(`teacher label: ${cands.length} new candidates (after dedup against training and held-out sets)`);
  const ans = await askPacked(items, +arg('per', 4), 'label');
  const accepted = [];
  const rejected = [];
  let failed = 0;
  items.forEach((it, j) => {
    const a = ans[j]?.i;
    if (!a) { failed++; return; } // a failed call is no answer, not a rejection
    const p = a?.probabilities?.[it.r.intent] ?? 0;
    const row = { text: it.r.text, intent: it.r.intent, lang: it.r.lang, ...(it.r.shell ? { shell: it.r.shell, os: it.r.os } : {}) };
    // accept when the teacher picks the proposed intent with p >= 0.6
    if (a && a.choice === it.r.intent && p >= 0.6) accepted.push({ ...row, src: 'teacher', hard: it.o.model !== it.r.intent });
    else rejected.push({ ...row, teacher: a?.choice ?? null, conf: a?.confidence ?? null, p_ours: p, opts: it.o.opts, model: it.o.model });
  });
  writeJsonl(join(ROOT, 'data', 'intents', 'g06_teacher.jsonl'), accepted.map(({ hard, ...r }) => r));
  writeJsonl(join(TDIR, 'label_rejected.jsonl'), rejected);
  // out-of-domain candidates (data/candidates/ood_*.jsonl): keep only what the teacher agrees is not a shell request
  const oodC = readDir(join(ROOT, 'data', 'candidates')).filter((r) => !r.intent && r.text && /^ood/.test(r.file));
  const oodHave = new Set(readJsonl(join(ROOT, 'data', 'ood.jsonl')).map((r) => normalize(r.text)));
  const oodItems = oodC.filter((r) => { const n = normalize(r.text); if (held.has(r.text) || oodHave.has(n) || seen.has(n)) return false; seen.add(n); return true; })

exec
/bin/bash -lc "nl -ba src/history.js | sed -n '473,499p'; nl -ba src/history.js | sed -n '691,736p'; nl -ba src/pipeline.js | sed -n '480,518p'; nl -ba src/fill.js | sed -n '73,104p'; cat scripts/lib/jev.js" in /workspace/tellsh
 succeeded in 0ms:
   473	    // wrappers (`sudo -u root ls`, `env ls`, `command ls`, `nice -n 5 ls`, `timeout 5 ps aux`): the command they run
   474	    const raw = w;
   475	    w = unwrap(w);
   476	    // a wrapper whose options could not be read: what ran is unknown, so it may have printed or named anything
   477	    if (!w.length || (w !== raw && /^-/.test(w[0]))) {
   478	      e.file = AMB + raw.join(' '); e.dir = AMB + raw.join(' ');
   479	      for (const x of ENT_TYPES) listed[x] = segIdx;
   480	      w = [];
   481	    }
   482	    // `export GH_REPO=a/b; gh pr view 45`, `$env:DOCKER_HOST = …`: the later commands of the line are scoped as well
   483	    const rw = raw.map((x) => String(rawOf(x)));
   484	    if ((/^(?:export|declare|typeset|set)$/.test(rw[0]) && rw.slice(1).some((x) => SCOPE_ENV.test(x))) ||
   485	      /^\$env:(\w+)$/i.test(rw[0]) && SCOPE_ENV.test(rw[0].slice(5) + '=')) exportedScope = true;
   486	    if (w.length) segmentEnts(w, e, setIntent, split, k, segIdx, firstWord);
   487	    // `git -C /repo blame notes.txt`, `docker --context prod logs web`: "delete it" / "stop it" here would hit a
   488	    // different file / container than the one the command used (never resolved, never repeated)
   489	    if (w.length && scopedElsewhere(w, raw, exportedScope)) {
   490	      scoped = true;
   491	      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x])) e[x] = AMB + rawOf(e[x]);
   492	      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; markScoped(segSlots); }
   493	    }
   494	    // `env -C /repo cat notes.txt`, `sudo -D /repo …`: relative values name files in that directory, not here;
   495	    // `chroot /srv cat /etc/x`: every value names something under the other root
   496	    const ws = w.length && w !== raw ? wrapperScope(w, raw) : null;
   497	    const subCd = k === 'posix' && !!subs?.some((id) => subCds.has(id));
   498	    if (ws === 'root') {
   499	      scoped = true;
   691	  while (i < args.length && /^-/.test(args[i]) && args[i] !== '--') i += vo.has(args[i]) ? 2 : 1;
   692	  if (args[i] === '--') i++;
   693	  return args.slice(i);
   694	}
   695	function listedBySegment(w, pipedIn, k) {
   696	  const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
   697	  const nonFlags = afterGlobals(head, w.slice(1)).filter((a) => !/^-/.test(a));
   698	  // `du -sh DIR` is the size of DIR itself; `du DIR` / `du -d 1 DIR` lists what is inside
   699	  if (head === 'du' && w.slice(1).some((a) => /^-[a-zA-Z]*s|^--summarize$/.test(a)) && !nonFlags.some(isGlob)) return [];
   700	  if (FS_LISTERS.has(head)) return ['file', 'dir'];
   701	  // grep reading a pipe filters what an earlier stage printed; reading files it lists matches
   702	  if (FS_SEARCHERS.has(head)) return pipedIn ? [] : ['file', 'dir'];
   703	  if (PROC_LISTERS.has(head)) return ['pid', 'proc'];
   704	  if (['ss', 'netstat', 'lsof', 'fuser', 'get-nettcpconnection'].includes(head)) return ['port', 'pid', 'proc'];
   705	  if (head === 'docker' || head === 'podman') {
   706	    const sub = nonFlags.slice(0, 2).join(' ');
   707	    return /^(?:ps|stats|container (?:ls|list|ps)|compose ps|top)\b/.test(sub) ? ['container'] : [];
   708	  }
   709	  if (head === 'systemctl') return !nonFlags.length || /^list-/.test(nonFlags[0]) || w.includes('--failed') ? ['service'] : [];
   710	  if (head === 'service') return w.includes('--status-all') ? ['service'] : [];
   711	  if (head === 'get-service' || head === 'gsv') return psArgs(w.slice(1)).pos.length || /-(?:name|displayname)\b/i.test(w.join(' ')) ? [] : ['service'];
   712	  if (head === 'git') {
   713	    const sub = nonFlags[0];
   714	    if (sub === 'branch') return nonFlags.length === 1 && !w.some((a) => /^-(?:d|D|m|M|c|C|-delete|-move|-copy)$/.test(a)) ? ['branch'] : [];
   715	    if (['grep', 'ls-files', 'status', 'clean'].includes(sub)) return ['file', 'dir'];
   716	  }
   717	  return [];
   718	}
   719	const LIST_INTENT = { docker_ps: ['container'], docker_ps_all: ['container'], docker_stats: ['container'], list_services: ['service'],
   720	  failed_services: ['service'], git_branches: ['branch'], git_status: ['file', 'dir'] };
   721	const LIST_FAMILY = { ls: ['file', 'dir'], find: ['file', 'dir'], grep: ['file', 'dir'], du: ['file', 'dir'], ps: ['pid', 'proc'], ss: ['port', 'pid', 'proc'] };
   722	/** Entity types a catalog intent prints many values of (for previous `tellsh <query>` lines). */
   723	const listedByIntent = (intent) => (intent ? LIST_INTENT[intent] || LIST_FAMILY[FAMILY_OF[intent]] || [] : []);
   724	
   725	// pipeline stages that filter the entries of a listing piped into them
   726	const FILTER_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag', 'findstr', 'select-string', 'sls', 'where-object', 'where', '?']);
   727	const GREP_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag']);
   728	
   729	// find/grep catalog intents: their path slot is where the search ran, not what it found
   730	const isSearchRoot = (intent, slots, ents) => ents.dir != null && ['find', 'grep'].includes(FAMILY_OF[intent]) && String(ents.dir) === String(slots.path);
   731	
   732	// the one operand of a command, or (several files: `touch a.txt b.txt`, `rm a b`) an ambiguous value: "delete them"
   733	// or "delete it" may mean any or all of them, never just the last one
   734	const oneOf = (ops) => (ops.length > 1 ? AMB + ops.map(rawOf).join(' ') : ops[0]);
   735	
   736	/** Entities of one simple command `w` (sudo/VAR= removed) into `e`. */
   480	      if (PRONOUN_VALUE.test(String(slots[k])) || (PATH_SLOT_NAMES.has(k) && slots[k] === '.' && !/(?:^|\s)\.(?:\s|$)/.test(query))) { delete slots[k]; delete r.sources[k]; }
   481	    }
   482	  };
   483	  if (ref?.rule === 'refused') {
   484	    // the reference points at something we cannot read safely: leave the slot empty (placeholder)
   485	    refWordsOnly();
   486	    for (const k of refDst ? [] : ref.blank || []) if (slots[k] == null && usesSlot(BY_ID[intent], k)) { blank.add(k); if (!ref.blanket) keep.add(k); }
   487	    finalizeSlots(BY_ID[intent], slots);
   488	    method = 'history-rule';
   489	  }
   490	  // "remove the logs there", "delete notes.txt there": a place reference never names the object of a changing
   491	  // command (`rm -r DIR`, `mv DIR …`); only the location a search-and-change runs in (`find DIR … -delete`). Any path
   492	  // the request names is relative to the wrong directory, so every path slot is withheld (with or without history).
   493	  if (locative && !refDst && !bothRefs && BY_ID[intent].risk !== 'safe' && FAMILY_OF[intent] !== 'find' && [...PATH_SLOT_NAMES].some((k) => usesSlot(BY_ID[intent], k))) {
   494	    for (const k of Object.keys(slots)) if (PATH_SLOT_NAMES.has(k)) { delete slots[k]; delete r.sources[k]; }
   495	    for (const k of PATH_SLOT_NAMES) if (usesSlot(BY_ID[intent], k)) blank.add(k);
   496	    finalizeSlots(BY_ID[intent], slots);
   497	    if (ctx) {
   498	      context.rule = 'refused';
   499	      context.note = `"there" names a place, not what ${intent} would change; not guessing`;
   500	      method = 'history-rule';
   501	    }
   502	  } else if (ref?.rule === 'pronoun' && ref.guarded && BY_ID[intent].risk !== 'safe') {
   503	    // the value must not be changed (search root, listed directory, ...; see changeGuard) and the classifier
   504	    // picked a modifying intent: refuse
   505	    refWordsOnly();
   506	    for (const k of Object.keys(refFill)) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
   507	    finalizeSlots(BY_ID[intent], slots);
   508	    context.rule = 'refused';
   509	    context.note = ref.guardNote;
   510	    method = 'history-rule';
   511	  } else if (ref?.rule === 'pronoun') {
   512	    const it = BY_ID[intent];
   513	    for (const [k, v] of Object.entries(refFill)) {
   514	      if (!validSlot(k, v)) {
   515	        // the referenced value cannot be used (too long, a newline, ...): placeholder, never the catalog default
   516	        if (slots[k] != null && PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
   517	        if (slots[k] == null && usesSlot(it, k)) { blank.add(k); keep.add(k); }
   518	        continue;
    73	    const branch = /\bbranch\s+$/i.test(m[1]);
    74	    // "merge my pr from 2 days ago", "view pr for 3 days": a number after a connective is not the pull request
    75	    if (PR_ISSUE.test(w)) return '?';
    76	    const rest = text.slice(m.index + m[0].length);
    77	    if (/^#?\d+$/.test(w) && PR_UNIT_AFTER.test(rest)) return '?';
    78	    if (/^\d+$/.test(w)) return branch || PR_NUMBER_LEAD.test(m[1]) ? w : '?';
    79	    // "merge the pr for #12": the pull request for issue 12, or pull request 12
    80	    if (/^#\d+$/.test(w) && !PR_NUMBER_LEAD.test(m[1])) return '?';
    81	    if (PR_ABBREV.test(w) || (PR_HOST.test(w) && !branch)) return '?';
    82	    if (PR_MARKED.test(w)) return w;
    83	    // "merge pr for branch status": after "branch" any word is the selector, a describing one is withheld
    84	    if (branch) return PR_NOT_SELECTOR.test(w) ? `?${w}` : w;
    85	    if (!PR_NOT_SELECTOR.test(w)) {
    86	      // "merge pr for fix #12": the word is followed by a number, so it may describe rather than name the branch
    87	      if (/\b(?:for|from)\s+$/i.test(m[1])) return /\d/.test(rest) ? `?${w}` : w;
    88	      // "merge pr main": a bare word may be a branch or say something else: withheld (`gh pr merge <PR>`), never dropped
    89	      return `?${w}`;
    90	    }
    91	  }
    92	  const hash = text.match(/(?:^|\s)#(\d{1,12})(?=[\s.,!?;:]|$)/);
    93	  if (hash && PR_HASH_LEAD.test(text.slice(0, hash.index + hash[0].indexOf('#')))) return hash[1];
    94	  // 'merge the "feature/login" pull request': an explicitly quoted value is the target
    95	  if (ex.quoted.length) return ex.quoted[0];
    96	  // named but not readable: a number anywhere ("merge the 2 open prs", "merge pr in 2 minutes"), or a marked word or a
    97	  // quote after "pr" ("merge pr bob's", "merge pr feature/x's", "merge pr in repo v2"): withheld
    98	  const p = text.match(PR_WORD);
    99	  const after = p ? text.slice(p.index + p[0].length) : '';
   100	  if (ex.numbers?.length || /\d/.test(text) || /[/_#'"`„“”’]|\w[.-]\w/.test(after) || PR_BRANCH_NAMED.test(after)) return '?';
   101	  return null;
   102	}
   103	// "--repo a/b", "-R a/b", "in (the) repo(sitory) a/b", "in the a/b repo"; "in the other repo", "in another repository": named,
   104	// not readable ("this repo", "the current repository" are the working directory's)
// TypeSafe Jev client for build-time teacher scripts: on-disk cache, bounded concurrency, retry with
// exponential backoff (429/529/5xx/network), and a call/token ledger. The API key is read from the
// environment only and never printed or logged. Never used at runtime.
import { readFileSync, appendFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
export const ENDPOINT = 'https://api.typesafe.ai/v1/systemone';
export const MODEL = 'jev-latest';
export const PRICE_PER_MTOK = 0.042; // USD per million input tokens (docs.typesafe.ai/models); output tokens are free
const CACHE = join(ROOT, 'build', 'jev_cache.jsonl');
export const LEDGER = join(ROOT, 'data', 'teacher', 'ledger.json');

let cache = null;
function loadCache() {
  if (cache) return cache;
  cache = new Map();
  if (existsSync(CACHE)) {
    for (const l of readFileSync(CACHE, 'utf8').split('\n')) {
      if (!l.trim()) continue;
      try { const { k, v } = JSON.parse(l); cache.set(k, v); } catch { /* torn line */ }
    }
  }
  return cache;
}
export const keyOf = (state, questions) => createHash('sha256').update(JSON.stringify([MODEL, state, questions])).digest('hex');

export const stats = { calls: 0, cached: 0, failed: 0, retries: 0, inTok: 0 };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** One evaluation (state + typed questions). Cached by request content; retried with backoff. */
export async function ask(state, questions, { retries = 6 } = {}) {
  const k = keyOf(state, questions);
  const c = loadCache();
  if (c.has(k)) { stats.cached++; return c.get(k); }
  const KEY = process.env.TYPESAFE_API_KEY;
  if (!KEY) throw new Error('TYPESAFE_API_KEY not set');
  let delay = 500;
  for (let attempt = 0; ; attempt++) {
    let status = 0;
    // every request sent counts as a network call (also the ones that fail and are retried)
    stats.calls++;
    try {
      const r = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: MODEL, state, questions }),
        signal: AbortSignal.timeout(60000),
      });
      status = r.status;
      const j = await r.json().catch(() => null);
      if (r.ok && j?.answers) {
        stats.inTok += j.usage?.input_tokens || 0;
        const v = { answers: j.answers, usage: j.usage };
        c.set(k, v);
        mkdirSync(dirname(CACHE), { recursive: true });
        appendFileSync(CACHE, JSON.stringify({ k, v }) + '\n');
        return v;
      }
      if (r.ok || (status >= 400 && status < 500 && status !== 429 && status !== 408)) {
        stats.failed++;
        throw Object.assign(new Error(`HTTP ${status}`), { fatal: true });
      }
      const ra = +r.headers.get('retry-after');
      if (ra > 0) delay = Math.max(delay, ra * 1000);
    } catch (e) {
      if (e.fatal) throw e;
    }
    if (attempt >= retries) { stats.failed++; throw new Error(`gave up after ${retries} retries (last status ${status || 'network'})`); }
    stats.retries++;
    await sleep(delay + Math.random() * delay * 0.3);
    delay = Math.min(delay * 2, 30000);
  }
}

/** Run async thunks with bounded concurrency. */
export async function pool(thunks, n = 12, onProgress) {
  const out = new Array(thunks.length);
  let i = 0;
  let done = 0;
  const worker = async () => {
    while (i < thunks.length) {
      const j = i++;
      try { out[j] = await thunks[j](); } catch (e) { out[j] = { error: e.message }; }
      if (onProgress && ++done % 200 === 0) onProgress(done, thunks.length);
    }
  };
  await Promise.all(Array.from({ length: n }, worker));
  return out;
}

/** Add this run's network calls/tokens to the committed ledger (per task) and return the totals. */
export function recordLedger(task) {
  const L = existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, 'utf8')) : { model: MODEL, pricePerMtok: PRICE_PER_MTOK, tasks: {} };
  const t = (L.tasks[task] ??= { calls: 0, failed: 0, retries: 0, inTok: 0, runs: 0 });
  t.calls += stats.calls; t.failed += stats.failed; t.retries += stats.retries; t.inTok += stats.inTok; t.runs++;
  const tot = Object.values(L.tasks).reduce((a, x) => ({ calls: a.calls + x.calls, failed: a.failed + x.failed, inTok: a.inTok + x.inTok }), { calls: 0, failed: 0, inTok: 0 });
  L.total = { ...tot, usd: +((tot.inTok / 1e6) * PRICE_PER_MTOK).toFixed(5) };
  mkdirSync(dirname(LEDGER), { recursive: true });
  writeFileSync(LEDGER, JSON.stringify(L, null, 1) + '\n');
  return L;
}

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {spawnSync} from 'node:child_process';
for(const n of ['cli','regressions','regressions10','regressions11','regressions12','regressions2','regressions4','regressions8','regressions9','shells','templates']) {
 const r=spawnSync(process.execPath,["'`test/${n}.test.js`],{encoding:'"'utf8'});
 const txt=r.stdout+r.stderr;
 const fails=txt.split(/(?=not ok \\d)/).filter(s=>s.startsWith('not ok')).map(s=>s.split(/\\n  \\.\\.\\./)[0]);
 console.log(n,JSON.stringify(fails.map(s=>({test:s.split('\\n')[0],error:s.match(/\\n  error:[\\s\\S]*?(?=\\n  (?:code|stack|operator|expected|actual):)/)?.[0]}))));
}
JS" in /workspace/tellsh
exec
/bin/bash -lc "git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/compose.js; sed -n '250,410p' src/fill.js" in /workspace/tellsh
 succeeded in 0ms:
diff --git a/src/compose.js b/src/compose.js
index 5766219..3f86ec1 100644
--- a/src/compose.js
+++ b/src/compose.js
@@ -10,8 +10,12 @@ import { readFileSync } from 'node:fs';
 import { foldKeepLength } from './slots.js';
 import { shQuote } from './render.js';
 import { checkDanger, maxRisk } from './danger.js';
+import { splitCommand, rawOf } from './shellwords.js';
 
 const fold = (s) => ' ' + foldKeepLength(String(s)).toLowerCase().replace(/[^a-z0-9.*/~+-]+/g, ' ') + ' ';
+// trigger matching ignores file names and paths ("words.txt" must not trigger wc -w, "tree.md" not --forest)
+const PATHISH = /(?:^|\s)(?:[~.]?\/\S*|\S+\/\S*|[\w-]+\.[A-Za-z0-9]{1,6}|\*\.\w+)(?=\s|$|[,;!?])/g;
+const foldReq = (s) => fold(String(s).replace(PATHISH, ' '));
 
 // trigger syntax: plain words/phrases are matched as stem prefixes at a word start ("szczegol" matches
 // "szczegolami"); a trailing "$" requires a whole word.
@@ -53,7 +57,7 @@ export const TOOLS = {
   grep: {
     head: 'grep', args: ['pattern', 'path'],
     flags: [
-      F('-i', ['case insensitive', 'case-insensitive', 'ignore case', 'ignoring case', 'any case', 'bez wzgledu na wielkosc', 'wielkosc liter', 'ignoruj wielkosc', 'niezaleznie od wielkosci']),
+      F('-i', ['case insensitive', 'case-insensitive', 'ignore case', 'ignoring case', 'any case', 'regardless of case', 'bez wzgledu na wielkosc', 'wielkosc liter', 'wielkosci liter', 'bez rozrozniania', 'ignoruj wielkosc', 'niezaleznie od wielkosci']),
       F('-n', ['line number', 'numbers of lines', 'with numbers', 'numerami linii', 'numer linii', 'numery linii', 'numerem linii', 'z numerami']),
       F('-r', ['recursive', 'subdirector', 'all files in', 'rekurenc', 'podkatalog', 'w calym katalogu', 'w katalogu$']),
       F('-l', ['only file names', 'only filenames', 'file names only', 'which files', 'list files', 'names of files', 'tylko nazwy plikow', 'nazwy plikow', 'ktore pliki'], { group: 'out' }),
@@ -62,9 +66,9 @@ export const TOOLS = {
       F('-w', ['whole word', 'exact word', 'full word', 'cale slowo', 'calych slow', 'jako slowo']),
       F('-o', ['only the match', 'only matching', 'just the match', 'tylko dopasowan', 'samo dopasowan']),
       F('-E', ['regex', 'extended', 'regular expression', 'wyrazenie regularn']),
-      F('-A', ['lines after', 'after each match', 'linii po', 'po kazdym'], { value: 'count' }),
-      F('-B', ['lines before', 'before each match', 'linii przed', 'przed kazdym'], { value: 'count' }),
-      F('-C', ['context', 'around each match', 'kontekst', 'wokol'], { value: 'count' }),
+      F('-A', ['lines after', 'after each match', 'after every match', 'linii po', 'linie po', 'po kazdym'], { value: 'ctx' }),
+      F('-B', ['lines before', 'before each match', 'before every match', 'linii przed', 'linie przed', 'przed kazdym'], { value: 'ctx' }),
+      F('-C', ['context', 'around each match', 'around every match', 'kontekst', 'wokol'], { value: 'ctx' }),
       F('-h', ['without filename', 'no filename', 'without file name', 'bez nazw plikow', 'bez nazwy pliku']),
     ],
   },
@@ -85,7 +89,7 @@ export const TOOLS = {
     head: 'df', args: ['path'],
     flags: [
       F('-h', ['human', 'readable', 'gb', 'czyteln', 'ludzk']),
-      F('-t', [], { value: 'fstype' }),
+      F('-t', [], { value: 'fstype', detect: /\s(ext[234]|xfs|btrfs|tmpfs|nfs4?|vfat|ntfs|zfs|apfs|overlay|squashfs)\s/ }),
       F('-T', ['with type', 'filesystem type', 'types', 'z typem', 'typy system', 'typ systemu']),
       F('-i', ['inode', 'i-node']),
       F('-l', ['local only', 'only local', 'tylko lokaln']),
@@ -147,6 +151,7 @@ export const TOOLS = {
       F('-w', ['words', 'word count', 'slow', 'wyrazow']),
       F('-c', ['bytes', 'bajt']),
       F('-m', ['characters', 'chars', 'znakow', 'znaki']),
+      F('<', ['without filename', 'without the filename', 'without file name', 'no filename', 'just the number', 'only the number', 'bez nazwy pliku', 'sama liczba', 'tylko liczb']),
     ],
   },
   git: {
@@ -156,7 +161,7 @@ export const TOOLS = {
           F('--oneline', ['one line', 'oneline', 'compact', 'short', 'jednej linii', 'jedna linia', 'w skrocie', 'zwiezl']),
           F('--graph', ['graph', 'tree', 'graf', 'drzew']),
           F('-n', ['last', 'latest', 'recent', 'ostatni'], { value: 'count' }),
-          F('--author', ['by author', 'author', 'autor', 'from user'], { value: 'user' }),
+          F('--author', ['by author', 'author', 'autor', 'from user', 'commits by', 'commity od', 'commity uzytkownika'], { value: 'author' }),
           F('--stat', ['stat', 'changed files', 'files changed', 'statyst', 'zmienione pliki']),
           F('-p', ['patch', 'with diff', 'with changes', 'z diffem', 'ze zmianami']),
           F('--all', ['all branches', 'wszystkich galezi', 'wszystkie galezie']),
@@ -190,8 +195,9 @@ export const TOOLS = {
       ps: { triggers: ['container', 'kontener', 'ps$', 'running'], args: [],
         flags: [
           F('-a', ['all', 'stopped', 'including stopped', 'wszystkie', 'zatrzymane']),
-          F('-q', ['only ids', 'ids only', 'just ids', 'only the ids', 'quiet', 'tylko id', 'same id', 'identyfikator']),
+          F('-q', ['only ids', 'ids only', 'just ids', 'only the ids', 'only their ids', 'quiet', 'tylko id', 'tylko ich id', 'same id', 'identyfikator']),
           F('-s', ['size', 'sizes', 'rozmiar']),
+          F("--format '{{.Names}}'", ['only names', 'only their names', 'names only', 'just the names', 'tylko nazwy', 'tylko ich nazwy', 'same nazwy']),
           F('--no-trunc', ['full', 'not truncated', 'no trunc', 'untruncated', 'pelne', 'nieobciet', 'bez obcinania']),
           F('-l', ['latest', 'last created', 'most recent', 'ostatnio utworzony', 'najnowszy']),
           F('-n', ['last', 'ostatnie'], { value: 'count' }),
@@ -199,7 +205,7 @@ export const TOOLS = {
       images: { triggers: ['image', 'obraz'], args: [],
         flags: [
           F('-a', ['all', 'intermediate', 'wszystkie', 'posrednie']),
-          F('-q', ['only ids', 'ids only', 'just ids', 'quiet', 'tylko id', 'same id', 'identyfikator']),
+          F('-q', ['only ids', 'ids only', 'just ids', 'only their ids', 'quiet', 'tylko id', 'tylko ich id', 'same id', 'identyfikator']),
           F('--no-trunc', ['full', 'not truncated', 'pelne', 'bez obcinania']),
           F('--digests', ['digest', 'skrot']),
         ] },
@@ -279,7 +285,7 @@ function tldrScore(fq, stems) {
 
 function selectFlags(fq, spec, head, sub) {
   const tl = tldrTriggers()[head + (sub ? ' ' + sub : '')] || {};
-  const scored = spec.flags.map((f) => ({ ...f, score: f.always || f.implied || f.compress ? 1 : triggerScore(fq, f.triggers) + tldrScore(fq, tl[f.flag]) }))
+  const scored = spec.flags.map((f) => ({ ...f, score: f.always || f.implied || f.compress ? 1 : f.detect?.test(fq) ? 1.2 : triggerScore(fq, f.triggers) + tldrScore(fq, tl[f.flag]) }))
     .filter((f) => f.score >= 1);
   // one flag per exclusive group (highest score, then earliest in vocabulary)
   const out = [];
@@ -295,7 +301,7 @@ function selectFlags(fq, spec, head, sub) {
 export function triggeredFlags(query, toolFamily) {
   const tn = FAMILY_TOOL[toolFamily];
   if (!tn) return [];
-  const fq = fold(query);
+  const fq = foldReq(query);
   const spec = TOOLS[tn];
   const subs = spec.sub ? Object.entries(spec.sub) : [[null, spec]];
   const out = [];
@@ -305,29 +311,60 @@ export function triggeredFlags(query, toolFamily) {
   return out;
 }
 
-/** Validate a composed command: flags must come from the tool vocabulary; POSIX syntax via `bash -n`. */
+/** First `$(`, `${`, `$((`, backtick, `<(` or `>(` that the shell would expand (i.e. not inside '…'), or null. */
+function expansionOutsideSingleQuotes(cmd) {
+  const s = String(cmd);
+  let dq = false;
+  for (let i = 0; i < s.length; i++) {
+    const c = s[i];
+    if (c === '\\') { i++; continue; }
+    if (c === "'" && !dq) { const j = s.indexOf("'", i + 1); if (j < 0) return 'an unterminated quote'; i = j; continue; }
+    if (c === '"') { dq = !dq; continue; }
+    if (c === '`') return 'a backtick';
+    if (c === '$' && /[({]/.test(s[i + 1] || '')) return s.slice(i, i + 2);
+    if (!dq && (c === '<' || c === '>') && s[i + 1] === '(') return s.slice(i, i + 2);
+  }
+  return null;
+}
+
+/**
+ * Validate a composed command: every option must come from the tool vocabulary, every operand that could be
+ * read as an option is rejected (values are checked after shell unquoting, so a quoted '--use-compress-program=…'
+ * is caught too; anything after `--` is an operand), value flags need an operand, and POSIX syntax via `bash -n`.
+ */
 export function validateComposed(cmd, toolName, sub) {
   const spec = TOOLS[toolName];
-  const vocab = new Set((sub ? spec.sub[sub].flags : spec.flags).flatMap((f) => f.flag.split(' ')[0]));
-  if (spec.filters) for (const x of ['-name', '-iname', '-mtime', '-mmin', '-size', '-type', '-maxdepth', '-empty', '-newer', '-print0', 'f', 'd', 'l']) vocab.add(x);
-  const words = cmd.match(/'(?:[^']|'\\'')*'|\S+/g) || [];
-  // flags that take an operand must have one (find -newer FILE, grep -A N, ...)
-  const needsArg = new Set((sub ? spec.sub[sub].flags : spec.flags).filter((f) => f.value && !f.flag.startsWith('--')).map((f) => f.flag));
+  const fl = sub ? spec.sub[sub].flags : spec.flags;
+  const vocab = new Set(fl.flatMap((f) => f.flag.split(' ')[0]));
+  if (spec.filters) for (const x of ['-name', '-iname', '-mtime', '-mmin', '-size', '-type', '-maxdepth', '-empty', '-newer', '-print0', '-user']) vocab.add(x);
+  const needsArg = new Set(fl.filter((f) => f.value && !f.flag.startsWith('--')).map((f) => f.flag));
   if (spec.filters) for (const x of ['-name', '-iname', '-mtime', '-mmin', '-size', '-type', '-maxdepth', '-newer', '-user']) needsArg.add(x);
+  const subst = expansionOutsideSingleQuotes(cmd);
+  if (subst) return { ok: false, error: `contains ${subst} (command substitution / expansion is never composed)` };
+  const r = splitCommand(cmd, 'posix', { keepRedirects: true });
+  if (!r.ok || r.segments.length !== 1) return { ok: false, error: 'not a single simple command' };
+  const words = r.segments[0].words.map(rawOf);
+  let ddash = false;
   for (let i = sub ? 2 : 1; i < words.length; i++) {
-    if (!needsArg.has(words[i])) continue;
-    const next = words[i + 1];
-    if (next == null || (/^-[a-z]/i.test(next) && !/^-\d/.test(next))) return { ok: false, error: `${words[i]} needs an operand` };
-    i++;
-  }
-  for (const w of words.slice(sub ? 2 : 1)) {
+    const w = words[i];
+    if (ddash) continue;
+    if (w === '--') { ddash = true; continue; }
+    if (w === '<') { i++; continue; } // stdin redirect (wc < file)
+    if (needsArg.has(w)) {
+      const next = words[i + 1];
+      if (next == null || (/^-/.test(next) && !/^[-+]\d/.test(next))) return { ok: false, error: `${w} needs an operand` };
+      i++;
+      continue;
+    }
     if (!/^-/.test(w)) continue;
     const base = w.replace(/=.*$/, '');
-    if (!vocab.has(w) && !vocab.has(base) && !/^-\d+$/.test(w) && !/^[-+]\d/.test(w)) return { ok: false, error: `flag ${w} not in the ${toolName} vocabulary` };
+    if (!vocab.has(w) && !vocab.has(base) && !/^-\d+$/.test(w)) return { ok: false, error: `${w} is not an option in the ${toolName} vocabulary` };
   }
-  const r = spawnSync('bash', ['-n', '-c', cmd], { encoding: 'utf8', timeout: 2000 });
-  if (r.error) return { ok: true, syntax: 'skipped (bash not found)' };
-  if (r.status !== 0) return { ok: false, error: `bash -n: ${r.stderr.trim()}` };
+  // a NUL byte cannot be passed to bash (spawnSync throws) and is never part of a command argument
+  if (/\0/.test(cmd)) return { ok: false, error: 'contains a NUL byte' };
+  const sx = spawnSync('bash', ['-n', '-c', cmd], { encoding: 'utf8', timeout: 2000 });
+  if (sx.error) return { ok: true, syntax: 'skipped (bash not found)' };
+  if (sx.status !== 0) return { ok: false, error: `bash -n: ${sx.stderr.trim()}` };
   return { ok: true, syntax: 'bash -n ok' };
 }
 
@@ -339,7 +376,7 @@ export function validateComposed(cmd, toolName, sub) {
  * -> null | { command, tool, sub, flags, risk, warnings, validation, experimental: true }
  */
 export function compose(query, tools, ex, { patternOf, nameOf } = {}) {
-  const fq = fold(query);
+  const fq = foldReq(query);
   let best = null;
   for (const { tool: fam, p } of tools) {
     const tn = FAMILY_TOOL[fam];
@@ -366,15 +403,29 @@ export function compose(query, tools, ex, { patternOf, nameOf } = {}) {
   const spec = TOOLS[tn];
   const parts = [spec.head];
   if (sub) parts.push(sub);
-  const q = shQuote;
-  const valueOf = (kind) => {
+  // non-path values (grep patterns, names, refs, separators, globs) are always quoted literally: a
+  // leading ~ stays a literal `~` and never expands to the home directory
+  const q = (v) => shQuote(v, { tilde: false });
+  // operands: a path starting with - gets ./ (never an option); other values starting with - are refused
+  const qp = (p) => shQuote(/^-/.test(String(p)) ? `./${p}` : p);
+  const word = (v) => (v == null || /^-/.test(String(v)) ? null : v);
+  // a number written right next to one of the flag's trigger words ("last 5", "ostatnie 10", "5 lines after")
+  const numNear = (f) => {
+    for (const t of f?.triggers || []) {
+      const w = foldKeepLength(t.replace(/\$$/, '')).toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
+      const m = fq.match(new RegExp(`\\s${w}\\w*\\s+(\\d{1,6})\\s`)) || fq.match(new RegExp(`\\s(\\d{1,6})\\s+${w}`));
+      if (m) return m[1];
+    }
+    return null;
+  };
+  const valueOf = (kind, f) => {
     switch (kind) {
-      case 'count': return ex.count != null ? String(ex.count) : null;
+      case 'count': { const n = numNear(f); return n ?? (ex.count != null ? String(ex.count) : null); }
+      case 'ctx': { const n = numNear(f) ?? fq.match(/\s(\d{1,3})\s+(?:lines?|linie|linii|wiersz\w*)\s/)?.[1]; return n ?? (ex.count != null ? String(ex.count) : null); }
       case 'depth': return ex.count != null && ex.count <= 20 ? String(ex.count) : '1';
-      case 'user': return nameOf?.('USER') || null;
-      case 'name': return nameOf?.('NAME') || null;
+      case 'name': return word(nameOf?.('NAME') || null);
       case 'since': return ex.duration?.since ? q(ex.duration.since) : null;
-      case 'dest': return ex.paths[1] ? q(ex.paths[1]) : null;
+      case 'dest': return ex.paths[1] ? qp(ex.paths[1]) : null;
       case 'sep': {
         const m = query.match(/(?:by|przez)\s+(['"]?)([,;:|\t])\1/);
         if (m) return q(m[2]);
@@ -390,15 +441,29 @@ export function compose(query, tools, ex, { patternOf, nameOf } = {}) {
         if (ex.count == null) return null;
         return /\b(from line|starting at line|od linii|od wiersza|poczawszy od)\b/.test(fq) ? `+${ex.count}` : String(ex.count);
       }
-      case 'newer': return newerRef ? q(newerRef) : null;
+      case 'newer': return newerRef ? qp(newerRef) : null;
       case 'fstype': { const m = fq.match(/\b(ext[234]|xfs|btrfs|tmpfs|nfs4?|vfat|ntfs|zfs|apfs|overlay|squashfs)\b/); return m ? m[1] : null; }
       case 'fname': {
         const m = query.match(/(?:named|called|nazwan\w*|o nazwie|nazywaj\w* si[eę])\s+["']?([\w.*?-]+)/i);
-        return m ? q(m[1]) : nameOf?.('NAME') ? q(nameOf('NAME')) : null;
+        const v = word(m ? m[1] : nameOf?.('NAME'));
+        return v ? q(v) : null;
       }
       case 'user': {
-        const m = query.match(/(?:user|owned by|belonging to|u[zż]ytkownik\w*|w[lł]a[sś]ciciel\w*|nale[zż][aą]ce do)\s+([a-z_][\w-]*)/i);
-        return m ? m[1] : nameOf?.('USER') || null;
+        // "owned by (user) bob", "of user postgres", "należące do użytkownika ola"; skip filler words
+        const NOTUSER = /^(and|or|the|a|with|of|in|i|oraz|z|w|user|users|uzytkownik\w*|użytkownik\w*|command|commands|process\w*|proces\w*)$/i;
+        for (const m of query.matchAll(/(?:user|owned by|belonging to|u[zż]ytkownik\w*|w[lł]a[sś]ciciel\w*|nale[zż][aą]ce do)\s+(?:(?:the\s+)?(?:user|u[zż]ytkownik\w*)\s+)?([a-z_][\w-]*)/gi)) {
+          if (!NOTUSER.test(m[1])) return word(m[1]);
+        }
+        return word(nameOf?.('USER') || null);
+      }
+      case 'author': {
+        // "commits by alice", "by author bob", "autor: jan", "commity od ola"
+        const NOTAUTHOR = /^(and|or|the|a|an|me|author|autor\w*|user|uzytkownik\w*|użytkownik\w*|date|time|size|name|day|week|month|year|data|daty|dat[aey]|last|latest|ostatni\w*)$/i;
+        for (const m of query.matchAll(/(?:\bauthor|\bautor\w*|\bcommits? by|\bby|\bfrom user|\bcommity od|\bod u[zż]ytkownika)\s*:?\s+(?:(?:the\s+)?(?:author|autor\w*|user|u[zż]ytkownik\w*)\s+)?["']?([A-Za-z_][\w.@+-]*)/gi)) {
+          if (!NOTAUTHOR.test(m[1])) { const v = word(m[1]); if (v) return q(v); }
+        }
+        const n = word(nameOf?.('USER') || null);
+        return n ? q(n) : null;
       }
       default: return null;
     }
@@ -408,24 +473,28 @@ export function compose(query, tools, ex, { patternOf, nameOf } = {}) {
     const m = query.match(/(?:newer than|nowsze? niż|nowsze? niz|nowszych niż|nowszych niz|nowszy niż|nowszy niz)\s+["'„]?([^\s"'”]+)/i);
     return m ? (ex.paths.find((p) => p === m[1] || m[1].startsWith(p)) || m[1]) : null;
   })() : null;
+  // head/tail: bytes (-c) replace the implied line count
+  if (flags.some((f) => f.flag === '-c' && !f.implied) && ['head', 'tail'].includes(tn)) flags.splice(0, flags.length, ...flags.filter((f) => !f.implied));
   const used = [];
   const archive = ex.paths.find((x) => /\.(tar(\.\w+)?|tgz|tbz2?|txz)$/.test(x));
   for (const f of flags) {
     if (f.compress) { if (archive && f.compress.test(archive)) { parts.push(f.flag); used.push(f.flag); } continue; }
     if (f.value) {
-      const v = valueOf(f.value);
+      const v = valueOf(f.value, f);
       if (v == null) continue;
       if (f.flag.startsWith('--')) parts.push(`${f.flag}=${v}`);
       else parts.push(f.flag, v);
-    } else if (f.flag === '-f' && tn === 'tar') {
-      continue; // added with the archive below
+    } else if ((f.flag === '-f' && tn === 'tar') || f.flag === '<') {
+      if (f.flag === '<') used.push(f.flag);
+      continue; // added with the archive / file below
     } else parts.push(f.flag);
     used.push(f.flag);
   }
   // tool-specific arguments
-  const paths = ex.paths.filter((p) => p !== newerRef);
+  const fnameV = flags.some((f) => f.value === 'fname') ? valueOf('fname')?.replace(/^'|'$/g, '') : null;
+  const paths = ex.paths.filter((p) => p !== newerRef && p !== fnameV);
   if (tn === 'find') {
-    parts.splice(1, 0, q(paths[0] || '.'));
+    parts.splice(1, 0, qp(paths[0] || '.'));
     if (ex.ext && !used.includes('-name')) parts.push(used.includes('-iname') ? '-iname' : '-name', q(`*.${ex.ext}`));
     if (ex.duration) parts.push(ex.duration.age.split(' ')[0], ex.duration.age.split(' ')[1]);
     if (ex.size) parts.push('-size', (/\b(smaller|less|under|below|mniejsz|ponizej)\b/.test(fq) ? '-' : '+') + ex.size);
@@ -433,31 +502,40 @@ export function compose(query, tools, ex, { patternOf, nameOf } = {}) {
     const i = parts.indexOf('-maxdepth');
     if (i > 2) { const v = parts.splice(i, 2); parts.splice(2, 0, ...v); }
   } else if (tn === 'grep') {
-    const pat = patternOf?.() ?? null;
+    let pat = patternOf?.() ?? null;
+    // "search for ~/foo in src": the word right after "search for" is the pattern even when it looks
+    // like a path (it must not become a search path, and ~ must stay literal)
+    const lead = query.match(/(?:search(?:ing)? for|look(?:ing)? for|grep(?: for)?|szukaj|wyszukaj)\s+(["'„]?)([^\s"'”]+)\1/i)?.[2];
+    if (lead && paths.includes(lead)) pat = lead;
     if (!pat) return null;
     if (ex.ext && used.includes('-r')) parts.push(`--include=${q(`*.${ex.ext}`)}`);
     parts.push('--', q(pat));
-    if (paths.length) parts.push(...paths.map(q));
+    // the pattern is never also a search path (`search for ~/foo in src` -> grep -- '~/foo' src)
+    const searchPaths = paths.filter((x) => x !== pat && x !== String(pat).trim());
+    if (searchPaths.length) parts.push(...searchPaths.map(qp));
     else if (used.includes('-r')) parts.push('.');
   } else if (tn === 'tar') {
     const arch = paths.find((x) => /\.(tar(\.\w+)?|tgz|tbz2?|txz)$/.test(x));
     if (!arch) return null;
-    parts.push('-f', q(arch));
+    parts.push('-f', qp(arch));
     const rest = paths.filter((x) => x !== arch && !(used.includes('-C') && x === paths[1]));
-    if (used.includes('-c')) parts.push(...(rest.length ? rest : ['.']).map(q));
+    if (used.includes('-c')) parts.push('--', ...(rest.length ? rest : ['.']).map(qp));
   } else if (tn === 'chmod') {
     if (!ex.mode || !paths.length) return null;
-    parts.push(ex.mode, ...paths.map(q));
+    parts.push(ex.mode, '--', ...paths.map(qp));
   } else if (tn === 'curl') {
     const url = ex.urls?.[0] || (ex.hosts?.[0] ? `https://${ex.hosts[0]}` : null);
-    if (!url) return null;
+    if (!url || /^-/.test(url)) return null;
     parts.push(q(url));
   } else if ((fspec.args || []).includes('ref')) {
     const ref = nameOf?.('BRANCH') || query.match(/(?:against|compared to|vs\.?|w stosunku do|wzgl[eę]dem|do)\s+([\w./-]+)\s*$/i)?.[1];
-    if (ref) parts.push(q(ref));
-    else if (paths.length) parts.push('--', ...paths.map(q));
+    if (word(ref)) parts.push(q(ref));
+    else if (paths.length) parts.push('--', ...paths.map(qp));
   } else if ((fspec.args || []).includes('path') || (fspec.args || []).includes('file')) {
-    if (paths.length) parts.push(...paths.slice(0, 2).map(q));
+    if (used.includes('<')) {
+      if (!paths.length) return null;
+      parts.push('<', qp(paths[0]));
+    } else if (paths.length) parts.push(...paths.slice(0, 2).map(qp));
     else if ((fspec.args || []).includes('file') && !['ls', 'du', 'df'].includes(tn)) return null;
   }
   const command = parts.join(' ');
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
  for (const k of Object.keys(v)) if (v[k] === undefined) delete v[k];
  return v;
}

function renderValue(name, raw, values, quote) {
  if (!(name in values)) return null;
  let val = values[name];
  if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
  if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
  return quote(val, { tilde: PATH_SLOTS.has(name), name });
}

const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;

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
  return { command: out, missing };
}

const DERIVED_REQUIRED = { namepat: 'name', glob: 'ext', sedexpr: 'old' };

const SIZE_MULT = { c: 1, k: 1024, M: 1024 ** 2, G: 1024 ** 3 };
/** Slots derived from others so every shell can use the unit it needs (find: -mmin/-size, PowerShell: minutes/bytes). */
export function deriveSlots(v) {
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

 succeeded in 12014ms:
cli []
regressions []
regressions10 []
regressions11 []
regressions12 []
regressions2 []
regressions4 []
regressions8 []
regressions9 []
shells []
templates []

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {readFileSync} from 'node:fs';
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const h of ['gh pr view 45; FOO=1','gh pr view 45; env','gh pr view 45; export GH_REPO=other/repo','gh pr view 45; gh pr view']) {
 const r=suggest('merge that pr',{env,history:[h]});
 console.log(JSON.stringify({h,command:r.command,missing:r.missing,context:r.context}));
}
const source=readFileSync('scripts/real/prepare_real.js','utf8');
const match=source.match(/function group\\(cmd\\) \\{[\\s\\S]*?\\n\\}/)[0];
const group=new Function('strip',"'`return (${match})`)(s=>s.trim());
for(const c of ['"'npm install express','npm install react','npm run dev','npm run build']) console.log(JSON.stringify({cmd:c,group:group(c)}));
JS
git status --short" in /workspace/tellsh
 succeeded in 116ms:
{"h":"gh pr view 45; FOO=1","command":"gh pr merge","missing":[],"context":{"used":true,"commands":1,"rule":"refused","note":"the previous command listed pr values, so the reference may mean one of them, not 45; not guessing"}}
{"h":"gh pr view 45; env","command":"gh pr merge","missing":[],"context":{"used":true,"commands":1,"rule":"refused","note":"the previous command listed pr values, so the reference may mean one of them, not 45; not guessing"}}
{"h":"gh pr view 45; export GH_REPO=other/repo","command":"gh pr merge 45","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"h":"gh pr view 45; gh pr view","command":"gh pr merge 45","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"cmd":"npm install express","group":"npm install express  #0"}
{"cmd":"npm install react","group":"npm install react  #0"}
{"cmd":"npm run dev","group":"npm run dev  #0"}
{"cmd":"npm run build","group":"npm run build  #0"}
?? review/r18-claude.md
?? review/r18-codex.md

exec
/bin/bash -lc 'node test/templates.test.js' in /workspace/tellsh
 exited 1 in 125ms:
TAP version 13
# Subtest: shQuote round-trips nasty strings through bash
not ok 1 - shQuote round-trips nasty strings through bash
  ---
  duration_ms: 6.771865
  location: '/workspace/tellsh/test/templates.test.js:10:1'
  failureType: 'testCodeFailure'
  error: 'spawnSync bash EPERM'
  code: 'EPERM'
  stack: |-
    Object.spawnSync (node:internal/child_process:1123:20)
    spawnSync (node:child_process:877:24)
    execFileSync (node:child_process:920:15)
    roundTrip (file:///workspace/tellsh/test/templates.test.js:8:26)
    TestContext.<anonymous> (file:///workspace/tellsh/test/templates.test.js:12:18)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    node:internal/test_runner/harness:255:12
    node:internal/process/task_queues:140:7
  ...
# Subtest: shQuote keeps simple words bare and tilde expandable
ok 2 - shQuote keeps simple words bare and tilde expandable
  ---
  duration_ms: 0.325356
  ...
# Subtest: raw slots are validated, never injected
ok 3 - raw slots are validated, never injected
  ---
  duration_ms: 1.378722
  ...
# Subtest: optional segments are dropped when slot missing
ok 4 - optional segments are dropped when slot missing
  ---
  duration_ms: 0.41242
  ...
# Subtest: non-slot braces are left alone
ok 5 - non-slot braces are left alone
  ---
  duration_ms: 0.316756
  ...
# Subtest: every intent renders on linux and darwin without throwing, with valid risk
ok 6 - every intent renders on linux and darwin without throwing, with valid risk
  ---
  duration_ms: 74.948195
  ...
# Subtest: darwin variants differ where commands differ
ok 7 - darwin variants differ where commands differ
  ---
  duration_ms: 1.892621
  ...
# Subtest: injection attempt in a filename stays a single quoted argument
ok 8 - injection attempt in a filename stays a single quoted argument
  ---
  duration_ms: 0.421782
  ...
1..8
# tests 8
# suites 0
# pass 7
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 99.730355

exec
/bin/bash -lc 'node --test test/regressions19.test.js test/hybrid.test.js test/devtools.test.js test/compose.test.js' in /workspace/tellsh
 succeeded in 413ms:
TAP version 13
# Subtest: /workspace/tellsh/test/compose.test.js
ok 1 - /workspace/tellsh/test/compose.test.js
  ---
  duration_ms: 422.805188
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 2 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 220.453528
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 3 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 223.850833
  ...
# Subtest: /workspace/tellsh/test/regressions19.test.js
ok 4 - /workspace/tellsh/test/regressions19.test.js
  ---
  duration_ms: 397.796096
  ...
1..4
# tests 4
# suites 0
# pass 4
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 429.058762

codex
1. **Major — [src/history.js:484](/workspace/tellsh/src/history.js:484): trailing scope changes preserve stale PR numbers.** After `gh pr view 45; export GH_REPO=other/repo`, requesting `merge that pr` produces `gh pr merge 45`, with no missing operands. The inherited environment makes this merge #45 in another repository. Scope changes must invalidate previously collected repository entities, not just affect subsequent segments.

2. **Major — [src/history.js:809](/workspace/tellsh/src/history.js:809): later PR commands leave an earlier selector active.** After `gh pr view 45; gh pr view`, `merge that pr` still produces `gh pr merge 45`, although the latest view concerns the current branch’s PR. `gh pr view 45; gh pr list` also preserves 45. Selector-free views and PR listings must invalidate the earlier selector.

3. **Major — [src/pipeline.js:506](/workspace/tellsh/src/pipeline.js:506): a refused reference becomes an executable bare merge.** After `gh pr view 45; env`, `merge that pr` returns `context.rule="refused"` but also `command="gh pr merge"` and `missing=[]`. This branch adds `pr` to `blank` without preserving its optional placeholder, silently targeting the current branch’s PR. Preserve `<PR>` or reject the suggestion.

4. **Major — [src/fill.js:100](/workspace/tellsh/src/fill.js:100): unresolved PR qualifiers still default to the current branch.** Both `merge the pull request by alice` and `merge the pr from yesterday` produce bare `gh pr merge`, with no missing operands. These qualifiers identify a target that has not been resolved; they must produce `<PR>` rather than silently disappear.

5. **Minor — [scripts/real/prepare_real.js:71](/workspace/tellsh/scripts/real/prepare_real.js:71): command grouping retains operand values.** `npm install express` and `npm install react` become different groups because the package is treated as a subcommand. Equivalent command patterns can therefore cross the train/eval boundary, weakening the claimed command-group holdout. Use command-specific subcommand parsing and regenerate the split.

All history reproductions use one history line. Focused regression, hybrid, devtools, and compose tests passed. Full-suite validation was limited by sandbox `EROFS` and subprocess `EPERM` errors. No files changed.

VERDICT: REQUEST_CHANGES
tokens used
124,069
1. **Major — [src/history.js:484](/workspace/tellsh/src/history.js:484): trailing scope changes preserve stale PR numbers.** After `gh pr view 45; export GH_REPO=other/repo`, requesting `merge that pr` produces `gh pr merge 45`, with no missing operands. The inherited environment makes this merge #45 in another repository. Scope changes must invalidate previously collected repository entities, not just affect subsequent segments.

2. **Major — [src/history.js:809](/workspace/tellsh/src/history.js:809): later PR commands leave an earlier selector active.** After `gh pr view 45; gh pr view`, `merge that pr` still produces `gh pr merge 45`, although the latest view concerns the current branch’s PR. `gh pr view 45; gh pr list` also preserves 45. Selector-free views and PR listings must invalidate the earlier selector.

3. **Major — [src/pipeline.js:506](/workspace/tellsh/src/pipeline.js:506): a refused reference becomes an executable bare merge.** After `gh pr view 45; env`, `merge that pr` returns `context.rule="refused"` but also `command="gh pr merge"` and `missing=[]`. This branch adds `pr` to `blank` without preserving its optional placeholder, silently targeting the current branch’s PR. Preserve `<PR>` or reject the suggestion.

4. **Major — [src/fill.js:100](/workspace/tellsh/src/fill.js:100): unresolved PR qualifiers still default to the current branch.** Both `merge the pull request by alice` and `merge the pr from yesterday` produce bare `gh pr merge`, with no missing operands. These qualifiers identify a target that has not been resolved; they must produce `<PR>` rather than silently disappear.

5. **Minor — [scripts/real/prepare_real.js:71](/workspace/tellsh/scripts/real/prepare_real.js:71): command grouping retains operand values.** `npm install express` and `npm install react` become different groups because the package is treated as a subcommand. Equivalent command patterns can therefore cross the train/eval boundary, weakening the claimed command-group holdout. Use command-specific subcommand parsing and regenerate the split.

All history reproductions use one history line. Focused regression, hybrid, devtools, and compose tests passed. Full-suite validation was limited by sandbox `EROFS` and subprocess `EPERM` errors. No files changed.

VERDICT: REQUEST_CHANGES
