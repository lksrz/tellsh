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
session id: 01a126f8-4499-7410-b737-c40d8b2afe10
--------
user
Re-review of tellsh (git diff 0d87457..HEAD; runtime src/ bin/, training scripts). History refs are now intentionally limited to 1 line back. Read-only. Findings with severity and file:line. End with exactly one line 'VERDICT: APPROVE' (no blocker/major) or 'VERDICT: REQUEST_CHANGES'.
codex
I’ll review the diff and trace the affected runtime and training paths, treating the one-line history limit as intentional. I’ll keep this read-only and report actionable findings with severity and file locations.
exec
/bin/bash -lc "pwd && rg --files -g 'AGENTS.md' -g '"'!node_modules'"' -g '"'!vendor'"' /workspace 2>/dev/null" in /workspace/tellsh
 succeeded in 5ms:
/workspace/tellsh
/workspace/ct-landing-2026-10-08/AGENTS.md
/workspace/whiteboard/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/planets/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/nodejs-server-sparse/AGENTS.md
/workspace/funnel-ship-2026-10-08/mg-plus/AGENTS.md
/workspace/monetization-cnvs-freesign-whenmeet-2026-10-08/repos/whiteboard/AGENTS.md
/workspace/funnel-ship-2026-10-08/mg-plai/AGENTS.md
/workspace/ar-metering/nodejs-server/AGENTS.md
/workspace/funnel-ship-2026-10-08/mg-plugand/AGENTS.md
/workspace/wearfits-genai-api/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/saas/AGENTS.md
/workspace/ar-metering/saas/AGENTS.md
/workspace/multigpt/AGENTS.md
/workspace/wearfits-genai-app/AGENTS.md
/workspace/planets/AGENTS.md
/workspace/catchup-2026-10-01/whiteboard-seo/AGENTS.md
/workspace/rubikon/web/public/AGENTS.md
/workspace/rubikon-deploy/web/public/AGENTS.md
/workspace/catchup-2026-10-01/multigpt/AGENTS.md
/workspace/ga4fix-genai-app/AGENTS.md
/workspace/nodejs-server-fix/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/multigpt/AGENTS.md
/workspace/website2026-retailers/AGENTS.md
/workspace/seo-ship-2026-10-05/planets/AGENTS.md
/workspace/rubikon-web-deploy/web/public/AGENTS.md
/workspace/nodejs-server-zf/AGENTS.md
/workspace/zf-requeue/wearfits-genai-app/AGENTS.md
/workspace/ga4-conv-2026-10-08/repos/rubikon/web/public/AGENTS.md
/workspace/zf-requeue/shopify-wearfits/AGENTS.md
/workspace/ga4-conv-2026-10-08/repos/whiteboard/AGENTS.md
/workspace/ga4-conv-2026-10-08/repos/f1pl/f1pl-web/public/data/AGENTS.md
/workspace/wf-nightly-2026-10-10/repo/AGENTS.md

exec
/bin/bash -lc 'git status --short && git diff --stat 0d87457..HEAD && git diff --name-only 0d87457..HEAD' in /workspace/tellsh
 succeeded in 0ms:
?? review/r8-claude.md
?? review/r8-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   412 +-
 HYBRID.md                                    |   579 ++
 README.md                                    |   143 +-
 bin/tellsh.js                                |     3 +
 data/blind/compose.jsonl                     |    58 +
 data/blind/e2e.jsonl                         |   207 +
 data/blind/history.jsonl                     |    79 +
 data/blind/intents.jsonl                     |   844 ++
 data/blind/ood.jsonl                         |    64 +
 data/candidates/ood_new.jsonl                |   464 ++
 data/candidates/paraA.jsonl                  |  1329 ++++
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
 hybrid/results/v04_after_ft.json             |  2913 +++++++
 hybrid/results/v04_before.json               |  2996 +++++++
 hybrid/results/v04_before_ft.json            |  2913 +++++++
 hybrid/results/v04_bench_after.json          |    77 +
 hybrid/results/v04_bench_after_real.json     |    77 +
 hybrid/results/v04_bench_before.json         |    77 +
 hybrid/results/v04_bench_before_real.json    |    77 +
 hybrid/results/v04_enc_export_report.json    |    20 +
 hybrid/results/v04_policy.json               |    70 +
 hybrid/results/v04_policy_ft.json            |    67 +
 hybrid/results/v04_real_stats.json           |   137 +
 hybrid/results/zeroshot.jsonl                |     7 +
 model/compose_explained.json                 |     2 +-
 model/model.bin                              |   Bin 2707136 -> 2951156 bytes
 package.json                                 |    20 +-
 review/.f1done                               |     0
 review/.f4bdone                              |     0
 review/.f5done                               |     0
 review/.h1done                               |     0
 review/.hdone                                |     0
 review/.r1done                               |     0
 review/.r2done                               |     0
 review/.r3done                               |     0
 review/.r4done                               |     0
 review/.r5done                               |     0
 review/.r6done                               |     0
 review/STATUS                                |     2 +
 review/fix1-log.md                           |    12 +
 review/fix2-log.md                           |    17 +
 review/fix3-log.md                           |    50 +
 review/fix4-log.md                           |    30 +
 review/fix4b-log.md                          |    55 +
 review/fix5-log.md                           |    58 +
 review/fix7-log.md                           |    41 +
 review/hybrid-log.md                         |    41 +
 review/r1-claude.md                          |   115 +
 review/r1-codex.md                           |  9854 +++++++++++++++++++++++
 review/r2-claude.md                          |    84 +
 review/r2-codex.md                           |  8616 ++++++++++++++++++++
 review/r3-claude.md                          |    63 +
 review/r3-codex.md                           |  8281 ++++++++++++++++++++
 review/r4-claude.md                          |    57 +
 review/r4-codex.md                           |  9505 ++++++++++++++++++++++
 review/r5-claude.md                          |    46 +
 review/r5-codex.md                           |  9090 +++++++++++++++++++++
 review/r6-claude.md                          |    60 +
 review/r6-codex.md                           | 10443 +++++++++++++++++++++++++
 review/r7-claude.md                          |    48 +
 review/r7-codex.md                           | 10037 ++++++++++++++++++++++++
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
 scripts/hybrid/export_data.js                |   135 +
 scripts/hybrid/export_encoder.py             |   110 +
 scripts/hybrid/fetch_model.js                |    56 +
 scripts/hybrid/lm_rerank.py                  |   267 +
 scripts/hybrid/prune_vocab.py                |   124 +
 scripts/hybrid/report_hybrid.js              |   159 +
 scripts/hybrid/sets.js                       |    49 +
 scripts/hybrid/train_a_dev.sh                |    26 +
 scripts/hybrid/train_encoder.py              |   167 +
 scripts/hybrid/train_lm_gpu.py               |   103 +
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
 src/catalog.js                               |    36 +
 src/cli.js                                   |    48 +-
 src/compose.js                               |   180 +-
 src/danger.js                                |   473 +-
 src/fill.js                                  |    85 +-
 src/history.js                               |   824 +-
 src/model.js                                 |    22 +-
 src/pipeline.js                              |   412 +-
 src/render.js                                |    96 +-
 src/rerank/encoder.js                        |   152 +
 src/rerank/hybrid.js                         |   107 +
 src/rerank/tokenizer.js                      |    92 +
 src/shellwords.js                            |    80 +-
 src/slots.js                                 |   107 +-
 src/tagger.js                                |    55 +-
 src/tools.js                                 |    12 +-
 src/variants.js                              |    37 +
 test/compose.test.js                         |    50 +
 test/devtools.test.js                        |    98 +
 test/fixtures/parity.json                    |     2 +-
 test/hybrid.test.js                          |    46 +
 test/pipeline.test.js                        |     8 +-
 test/regressions.test.js                     |     3 +-
 test/regressions2.test.js                    |   325 +
 test/regressions3-history.test.js            |    87 +
 test/regressions3-render.test.js             |   148 +
 test/regressions3.test.js                    |    46 +
 test/regressions4.test.js                    |   199 +
 test/regressions5.test.js                    |   144 +
 test/regressions6.test.js                    |   169 +
 test/regressions7.test.js                    |   143 +
 test/regressions8.test.js                    |   200 +
 test/regressions9.test.js                    |   200 +
 test/shells.test.js                          |     8 +-
 160 files changed, 102847 insertions(+), 800 deletions(-)
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
review/.f1done
review/.f4bdone
review/.f5done
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
review/fix2-log.md
review/fix3-log.md
review/fix4-log.md
review/fix4b-log.md
review/fix5-log.md
review/fix7-log.md
review/hybrid-log.md
review/r1-claude.md
review/r1-codex.md
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
  pkg: (v) => WORDISH(v) || /^@[\w.-]{1,64}\/[\w.-]{1,64}(?:@[\w.^~<>=*-]{1,32})?$/.test(v),
  branch: (v) => /^(?!-)[\w./-]{1,100}$/.test(v), user: (v) => /^[a-z_][\w.-]{0,31}$/i.test(v),
  glob: (v) => /^\*\.[\w]{1,8}$/.test(v),
  url: (v) => v.length < 2048 && (/^(?:https?|ftp|ftps|ssh|git|file):\/\/[^\s/?#]*[^\s]*$/i.test(v) || /^(?!-)[\w.-]+@[\w.-]+:[^\s]+$/.test(v)),
  host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
  pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
  old: (v) => v.length > 0 && v.length < 300 && !/[\n\r\0]/.test(v), new: (v) => v.length < 300 && !/[\n\r\0]/.test(v),
};
const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
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
  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user']) {
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
    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank });
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

  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode, tagger: opts.tagger });
  const slots = r.slots;
  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
  const ambiguousPaths = [];
  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
  const blank = new Set(r.withheld || []);
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
  // changing command never takes it (or a part of it) as its path: placeholder + warning
  const unclearArgs = [];
  if (BY_ID[intent].risk !== 'safe' && opts.unclearArgs?.length) {
    const words = (x) => String(x).toLowerCase().split(/\s+/).filter(Boolean);
    const partOf = (v, u) => { const a = words(u); const b = words(v); return b.length > 0 && a.some((_, i) => b.every((w, j) => a[i + j] === w)); };
    for (const k of Object.keys(slots)) {
      if (!PATH_SLOT_NAMES.has(k) || r.sources[k] === 'history') continue;
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
    for (const k of refDst ? [] : ref.blank || []) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
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
        if (slots[k] == null && usesSlot(it, k)) blank.add(k);
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
    for (const k of withheld) blank.add(k);
    if (withheld.length) { context.rule = 'refused'; context.note = `previous ${sb.lastIntent} has ${withheld.join(', ')} that depends on the shell state or is not a valid value; not guessing`; }
    finalizeSlots(it, slots);
  }
  let b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: r.invalidOperands });
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
      b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: r.invalidOperands });
      method = 'history-rule'; // history-derived: never auto-run by --yes
      context.rule ??= 'implicit';
      context.note = [context.note, `filled from history: ${filled.join(', ')}`].filter(Boolean).join('; ');
    }
  }
  if (Object.values(r.sources).includes('history')) method = 'history-rule';
  const res = { ...out, understood: true, method, ...b, slotSources: r.sources, spans: r.spans.map((s) => ({ type: s.type, text: s.text })) };
  if (ambiguousText.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: unclear where the quoted text ends (\\" may be an escaped quote) (${ambiguousText.join(', ')})`];
  if (ambiguousPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${ambiguousPaths.join(', ')}); quote the path`];
  if (unclearArgs.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the quoted argument is a name or part of the request (${unclearArgs.join(', ')}); pass the whole request as one quoted argument`];
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
/bin/bash -lc 'cat review/fix7-log.md && cat test/regressions9.test.js && cat review/r7-claude.md' in /workspace/tellsh
exec
/bin/bash -lc 'cat package.json && git diff 0d87457..HEAD -- src/cli.js bin/tellsh.js src/model.js src/tools.js src/catalog.js src/variants.js' in /workspace/tellsh
exec
/bin/bash -lc 'for f in /AGENTS.md /workspace/AGENTS.md; do if test -f "$f"; then cat "$f"; fi; done; wc -l src/*.js scripts/*.py scripts/*.js scripts/lib/*.js scripts/hybrid/* scripts/real/*' in /workspace/tellsh
 exited 1 in 0ms:
     45 src/cascade.js
    290 src/catalog.js
     20 src/classifier.js
    258 src/cli.js
    547 src/compose.js
    654 src/danger.js
     93 src/env.js
    173 src/features.js
    327 src/fill.js
   1121 src/history.js
     86 src/model.js
    580 src/pipeline.js
    180 src/render.js
    221 src/shellwords.js
    622 src/slots.js
    212 src/tagger.js
    118 src/tools.js
    648 src/variants.js
    427 scripts/tldr_ingest.py
    345 scripts/train.py
     79 scripts/bench.js
     70 scripts/build_triggers.js
    190 scripts/check_variants.js
     59 scripts/compare.js
    542 scripts/eval.js
    249 scripts/gen_data.js
     14 scripts/report.js
    361 scripts/teacher.js
     68 scripts/lib/cmdnorm.js
     66 scripts/lib/confusable.js
     79 scripts/lib/heldout.js
    105 scripts/lib/jev.js
     13 scripts/lib/pwsh_parse.js
    279 scripts/lib/silver.js
      0 scripts/hybrid/__pycache__
wc: scripts/hybrid/__pycache__: Is a directory
     74 scripts/hybrid/bench_hybrid.js
     12 scripts/hybrid/cold_query.js
     37 scripts/hybrid/dump_cascade.js
    351 scripts/hybrid/eval_hybrid.js
    135 scripts/hybrid/export_data.js
    110 scripts/hybrid/export_encoder.py
     56 scripts/hybrid/fetch_model.js
    267 scripts/hybrid/lm_rerank.py
    124 scripts/hybrid/prune_vocab.py
    159 scripts/hybrid/report_hybrid.js
     49 scripts/hybrid/sets.js
     26 scripts/hybrid/train_a_dev.sh
    167 scripts/hybrid/train_encoder.py
    103 scripts/hybrid/train_lm_gpu.py
    168 scripts/real/prepare_real.js
     25 scripts/real/real_rows.js
    161 scripts/real/report_v04.js
  11165 total

 succeeded in 0ms:
I've fixed every finding in `review/r7-claude.md` and `review/r7-codex.md`, each with regression tests. Everything is committed as `3538ae3` on `master`. All 306 tests pass, eval and the hybrid evaluation were re-run, and nothing was pushed or published. History still reads only the previous command.

**Findings fixed**
- **Major, quoted request text read as the path:** a multi-word argument is now treated as the request when it comes first (`tellsh "delete folder" /tmp/x` gives `rm -r /tmp/x`). It is treated as a value when it looks like a path (`"/tmp/my data"`, `"My Notes.txt"`). Anything else (`tellsh delete folder "my data"`) gets a placeholder plus a warning when the command changes something. Earlier `tellsh` lines in history are read the same way. All four of the reviewer's examples work, and the `.log` filter is kept.
- **Major, current `tellsh` call matched too loosely (both reviews):** it is now dropped from history only when it is an exact match for the request.
- **Major, composer filling withheld values:** `` `pwd` ``, `$(…)` and paths with line breaks are no longer composed into the command. The catalog command keeps its placeholder.
- **Major, `fetch_model.js` could write outside its directory:** the manifest must list exactly the three bundle files with checksums. Everything is downloaded and verified before anything is written.
- **Major, held-out texts in the hybrid training data:** all rows, including typo and reworded copies, are now checked against the held-out sets. That removed 143 rows, including the ones the reviewer named. I retrained the encoder (B) and recalibrated the A+B policies (A+B now: `tau` 0.8, `alpha` 0.75, `none` 0.5).
- **Major, `--top` changing hybrid results:** the reranker now always looks at its own 5 candidates. `--top` only limits how many are shown.
- **Minor:**
  - "delete them" after `touch a.txt b.txt` (or after `rm a b`, `ls /a /b`) now gives a placeholder, not the last file.
  - `rm /etc/passwd`, `sed -i … /etc/passwd` and `tee /etc/passwd` are critical; `tee -a` stays high.
  - "delete it" after `cat a.txt; cd /srv` is refused.
  - "move it there" is now marked refused with a note.
  - `npm install @types/node` keeps the package; an invalid package name becomes `<PKG>` instead of disappearing.
- **EVAL.md:** it now notes that the blind history scores from round 7 on aren't directly comparable with earlier rounds.

**Results**
- **Main model (A):** unchanged. Every eval number is identical to before, apart from the new-intents set's exact command (90.7% → 91.0%, from the scoped-package fix).
- **Hybrid after retraining:**

| | Before | After |
|---|---|---|
| Real usage, A+B | 88.8% | 88.3% |
| `data/eval`, A+B | 96.7% | 96.8% |
| Hybrid blind set, A+B | 98.9% | 99.4% |
| Blind out-of-domain rejected, A+B | 98.4% | 96.9% |
| End-to-end exact command (relexicalised `data/eval`), A+B | 86.8% | 85.4% |

  The hybrid now hands fewer requests to the encoder, so real-usage queries are faster (p50 12.2 → 1.3 ms). HYBRID.md, EVAL.md, README and the results files are updated.

**Things to check**
- **The tiny-LM reranker (C) was not retrained.** Its training data had the same leak, and retraining needs a GPU, which isn't available here. HYBRID.md says its numbers may be slightly optimistic. It isn't shipped.
- **The bundle version went from 0.4.0 to 0.4.1** in `hybrid/package/tellsh-model-enc/package.json`, because the model files changed. It hasn't been published.
- **The reviewer's typo example changed answer.** `clnoe https://github.com/sharkdp/bat` now gives `curl -fLO …` for every `--top`, where the old encoder gave `git clone` at `--top 5`. The answer no longer depends on `--top`, but the retrained encoder prefers `curl` here.
- **One older test changed on purpose:** "show it" or "delete it" after `ls /a /b` or `du -sh /a /b` now gives a placeholder, as the plural finding requires.
- **Problems I found but didn't fix**, because they exist in the previous commit too and are outside these findings:
  - `npm i -g typescript` gives `npm run typescript`.
  - `npm install all deps` gives `npm install all`.
- **Commit identity:** git has no identity configured, so I committed as `lksrz <lukasz@wearfits.com>`, matching earlier commits.
- **Left out of the commit:** the uncommitted edit to `review/fix7-log.md` was already there; I didn't stage or touch it.
// Regression tests for round 8: the round-7 findings (review/r7-claude.md, review/r7-codex.md). Quoted request text
// passed as several arguments is not a path; the running tellsh call is dropped only on an exact match; several
// operands are not "it"/"them"; deleting, editing or overwriting system files is critical; a cd after a file read;
// "move it there" is refused; the composer never fills a withheld slot; the encoder bundle installer only writes its
// own files; augmented hybrid training rows are filtered against the held-out sets; the hybrid re-ranks the policy's
// k candidates whatever --top shows; npm scoped packages.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readdirSync, existsSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { suggest } from '../src/pipeline.js';
import { checkDanger } from '../src/danger.js';
import { joinArgs, joinWords } from '../src/shellwords.js';
import { tellshArgs, analyzeCommand } from '../src/history.js';
import { suggestHybrid } from '../src/rerank/hybrid.js';
import { cascade } from '../src/cascade.js';
import { envFeatures } from '../src/env.js';
import { heldOutFilter } from '../scripts/hybrid/export_data.js';
import { exclusionIndex } from '../scripts/lib/heldout.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, history, o = {}) => suggest(q, { env: BASH, ...(history ? { history } : {}), ...o });
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BIN = join(ROOT, 'bin', 'tellsh.js');
const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
const cliJson = (...words) => JSON.parse(cli(['--json', '--shell', 'bash', '--os', 'linux', ...words]).stdout);

test('major: request text passed as several quoted arguments is never the path', () => {
  assert.deepEqual(joinArgs(['delete folder', '/tmp/x']), { text: 'delete folder /tmp/x', unclear: [] });
  assert.deepEqual(joinArgs(['usuń katalog', 'build']), { text: 'usuń katalog build', unclear: [] });
  assert.deepEqual(joinArgs(['delete', 'folder', 'my data']), { text: 'delete folder "my data"', unclear: ['my data'] });
  assert.equal(joinWords(['delete', 'My Notes.txt']), 'delete "My Notes.txt"');
  assert.equal(joinWords(['delete', 'folder', '/tmp/a b']), 'delete folder "/tmp/a b"');
  assert.equal(cliJson('--dry-run', 'delete folder', '/tmp/x').command, 'rm -r /tmp/x');
  assert.equal(cliJson('delete the folder', '/tmp/my data').command, "rm -r '/tmp/my data'");
  assert.equal(cliJson('usuń katalog', 'build').command, 'rm -r build');
  // the .log filter is kept
  assert.equal(cliJson('delete all log files in', '/tmp/my logs').command, "find '/tmp/my logs' -type f -iname '*.log' -delete");
  // a quoted argument that may be a name or words of the request: placeholder for a changing command
  const u = cliJson('delete', 'folder', 'my data');
  assert.equal(u.command, 'rm -r <PATH>');
  assert.ok(u.warnings.some((w) => /quoted argument/.test(w)), u.warnings);
  // still one value where a quoted text is expected
  assert.equal(cliJson('grep', 'for', 'hello world', 'in', 'src').command, "grep -rn -- 'hello world' src");
  // the same reading for `tellsh …` lines in history
  assert.deepEqual(tellshArgs('tellsh "delete folder" /tmp/x'), { text: 'delete folder /tmp/x', unclear: [] });
  assert.ok(!/delete folder/.test(run('delete it', ['tellsh "delete folder" /tmp/x']).command));
  const h = run('show it', ['tellsh delete folder "my data"']);
  assert.ok(!/my data|'my'/.test(h.command ?? ''), h.command);
});

test('the running tellsh call is dropped only when its request is exactly the query', () => {
  for (const h of [['cat secret.txt', 'tellsh show it delete it'], ['cat /tmp/important.txt', 'tellsh --dry-run "delete it from /tmp/scratch"']]) {
    const r = run('delete it', h);
    assert.ok(!/secret|important/.test(r.command ?? ''), `${JSON.stringify(h)} -> ${r.command}`);
  }
  assert.equal(run('delete it', ['cat a.txt', 'tellsh --history delete it']).command, 'rm a.txt');
  assert.equal(run('delete it', ['cat a.txt', 'tellsh --history "delete  it"']).command, 'rm a.txt');
});

test('several operands: "them" / "it" leave a placeholder instead of the last one', () => {
  for (const h of ['touch a.txt b.txt', 'rm -i a.txt b.txt', 'cat a.txt b.txt', 'mkdir /tmp/a /tmp/b']) {
    for (const q of ['delete them', 'delete it']) {
      const r = run(q, [h]);
      assert.equal(r.context.rule, 'refused', `${q} after ${h}: ${r.command}`);
      assert.ok(!/b\.txt|\/tmp\/b/.test(r.command ?? ''), `${q} after ${h}: ${r.command}`);
    }
  }
  // one operand (counts, chmod modes, owners and script arguments are not operands)
  assert.equal(run('delete it', ['head -n 5 a.txt']).command, 'rm a.txt');
  assert.equal(run('delete it', ['chmod 644 a.txt']).command, 'rm a.txt');
  assert.equal(run('delete it', ['chown me:me a.txt']).command, 'rm a.txt');
  assert.equal(analyzeCommand('python3 run.py --fast out.txt').ents.file, 'run.py');
});

test('deleting, editing in place or overwriting a system file is critical', () => {
  for (const c of ['rm /etc/passwd', 'rm -f /etc/shadow', 'sudo rm -- /boot/vmlinuz', 'unlink /etc/hosts', 'sed -i d /etc/passwd',
    "sed -i.bak -e 's/a/b/' /etc/fstab", 'tee /etc/passwd < /dev/null', 'cat /dev/null | sudo tee /etc/passwd', 'echo x | tee /usr/bin/ls']) {
    const d = checkDanger(c, 'high');
    assert.equal(d.critical, true, `${c}: ${JSON.stringify(d)}`);
  }
  for (const c of ['rm a.txt', 'sed -i d notes.txt', 'tee out.txt', 'echo x | sudo tee -a /etc/hosts', "sed 's/a/b/' /etc/passwd", 'cat /etc/passwd']) {
    assert.equal(checkDanger(c, 'safe').critical, false, c);
  }
  // reachable from a generated suggestion
  const r = run('delete it', ['sudo cat /etc/shadow']);
  assert.equal(r.command, 'rm /etc/shadow');
  assert.equal(r.critical, true);
});

test('a cd after a file read: "it" is refused, not the cd target', () => {
  const r = run('delete it', ['cat a.txt; cd /srv']);
  assert.equal(r.context.rule, 'refused');
  assert.ok(!/\/srv|a\.txt/.test(r.command ?? ''), r.command);
  // reading is fine: the directory is the newest value of the line
  assert.equal(run('show it', ['cat a.txt; cd /srv']).command, 'ls -lah /srv');
});

test('"move it there" is refused with a note, never reported as a resolved pronoun', () => {
  for (const h of [['cd /tmp/x'], ['cd /tmp/x; cat a.txt'], ['cat a.txt']]) {
    const r = run('move it there', h);
    assert.equal(r.context.rule, 'refused', JSON.stringify(h));
    assert.match(r.context.note, /"it".*"there"|it.*there/);
    assert.ok(r.command == null || /<SRC>|<DST>|<PATH>/.test(r.command), r.command);
  }
});

test('the composer never fills a slot the catalog withheld', () => {
  for (const q of ['change permissions recursively to 777 on `pwd`', 'change permissions recursively to 777 on $(pwd)',
    'change permissions recursively to 777 on "/tmp/a\nb"']) {
    const r = run(q);
    assert.notEqual(r.method, 'composed', `${q} -> ${r.command}`);
    assert.ok(!/-- pwd|\n/.test(r.command ?? ''), `${q} -> ${r.command}`);
    assert.ok(r.command == null || r.missing.length > 0, `${q} -> ${r.command}`);
  }
  for (const q of ['chmod -R 755 on `pwd`', 'chmod -R 755 on $(pwd)']) {
    for (const compose of ['auto', 'force']) {
      const r = run(q, null, { compose });
      assert.ok(!/(?:^|\s)(?:--\s+)?pwd(?:\s|$)/.test(r.command ?? ''), `${q} (${compose}) -> ${r.command}`);
    }
  }
  // an ordinary path still composes
  assert.equal(run('change permissions recursively to 777 on /tmp/ab').command, 'chmod -R 777 -- /tmp/ab');
});

test('fetch_model installs only the bundle files named in the manifest', () => {
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r8-'));
  const sha = (b) => createHash('sha256').update(b).digest('hex');
  const FILES = ['encoder.int8.onnx', 'vocab.json', 'labels.json'];
  const fetch = (from, to) => spawnSync(process.execPath, [join(ROOT, 'scripts/hybrid/fetch_model.js'), '--from', from, '--to', to], { encoding: 'utf8' });
  try {
    const src = join(dir, 'src', 'bundle');
    mkdirSync(src, { recursive: true });
    for (const f of FILES) writeFileSync(join(src, f), f);
    writeFileSync(join(dir, 'src', 'evil'), 'payload');
    const files = Object.fromEntries(FILES.map((f) => [f, sha(Buffer.from(f))]));
    // a name that escapes the destination, an absolute path, an extra name
    for (const extra of [{ '../evil': sha(Buffer.from('payload')) }, { [join(dir, 'abs')]: sha(Buffer.from('payload')) }, { 'other.bin': sha(Buffer.from('x')) }]) {
      writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files: { ...files, ...extra } }));
      const to = join(dir, 'out', 'enc');
      const r = fetch(src, to);
      assert.notEqual(r.status, 0, r.stdout);
      assert.match(r.stderr, /must list exactly/);
      assert.ok(!existsSync(to), 'nothing is written');
      assert.ok(!existsSync(join(dir, 'out', 'evil')) && !existsSync(join(dir, 'abs')));
    }
    // a missing name, or a bad checksum: nothing is written either
    writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files: { ...files, 'vocab.json': sha(Buffer.from('other')) } }));
    assert.notEqual(fetch(src, join(dir, 'out2')).status, 0);
    assert.ok(!existsSync(join(dir, 'out2')));
    // the real thing
    writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files }));
    const ok = fetch(src, join(dir, 'ok'));
    assert.equal(ok.status, 0, ok.stderr);
    assert.deepEqual(readdirSync(join(dir, 'ok')).sort(), [...FILES, 'manifest.json'].sort());
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('hybrid export: every emitted row (also typo / relexicalised copies) is checked against the held-out sets', () => {
  const excl = exclusionIndex(ROOT);
  const out = heldOutFilter({ has: (t) => excl.has(t) });
  for (const text of ['kill all node processes', 'koniec pliku /var/log/syslog', 'pokaz caly plik requirements.txt']) {
    assert.ok(excl.has(text), text);
    out.push({ text, kind: 'relex' });
    out.push({ text, kind: 'typo' });
  }
  out.push({ text: 'a training sentence nobody holds out 12345', kind: 'orig' });
  assert.equal(out.rows.length, 1);
  assert.equal(out.dropped, 6);
});

test('hybrid: the policy re-ranks its k candidates whatever --top displays', async () => {
  const q = 'clnoe https://github.com/sharkdp/bat';
  const c = cascade(q, { extras: envFeatures(BASH), top: 8 });
  const rank = c.top.findIndex((t) => t.intent === 'git_clone');
  assert.ok(rank >= 3 && rank < 5, `git_clone is 4th/5th in the cascade (rank ${rank})`);
  const fake = { infer: async () => ({ intents: { git_clone: 0.99 }, pNone: 0 }) };
  for (const top of [1, 3, 5]) {
    const r = await suggestHybrid(q, { env: BASH, top, encoder: fake });
    assert.equal(r.intent, 'git_clone', `top ${top}: ${r.command}`);
    assert.equal(r.candidates.length, top);
  }
});

test('npm scoped packages are kept (or the operand is a placeholder, never dropped)', () => {
  assert.equal(run('npm install @types/node').command, 'npm install @types/node');
  assert.equal(run('install @types/node with npm').command, 'npm install @types/node');
  assert.equal(run('npm install -g @angular/cli').command, 'npm install -g @angular/cli');
  assert.equal(suggest('npm install @types/node', { env: { shell: 'powershell', os: 'win32' } }).command, "npm install '@types/node'");
  for (const q of ['npm install @types/node%x', 'npm install "foo bar"']) {
    const r = run(q);
    assert.equal(r.command, 'npm install <PKG>', q);
    assert.deepEqual(r.missing, ['pkg']);
  }
  assert.equal(run('npm install').command, 'npm install');
});
# tellsh round 7 re-review (`0d87457..HEAD`, at `a816a06`)

All 295 tests pass. I probed the runtime with about 90 history and command-line cases. Nothing in the repo was changed; my scratch files were in `/tmp` and are deleted.

**Round 6 findings: all fixed.**
- **Quoted paths:** `delete folder "/tmp/a b"` now gives `rm -r '/tmp/a b'`, typed directly or read back from an earlier `tellsh` line.
- **Invalid history values:** a 265-character path becomes a placeholder, never `.`.
- **"Delete all log files in this folder" with a refused reference:** gives `find <PATH> … -delete`, never `rm -r .`.
- **Place wordings:** "previous folder", "w poprzednim katalogu" and the other variants now resolve.
- **`git -C` / `docker --context` before a listing:** fixed.
- **Minor ones also fixed:** "its contents", "move it there", several paths for one slot, `$(…)`, here-strings, `sh -c … _ /`, and NUL bytes.

**One-line history:** I found no case where a value from two lines back is used, apart from the minor case in finding 2 below. "delete it" after `ls`, `cd -`, `cat $HOME/a.txt`, `cat *.txt` or `cat a.txt | tee /etc/hosts` is refused with a placeholder.

## Findings

### Major
1. **A quoted multi-word request becomes the path** (`src/shellwords.js:191-201`, called at `src/cli.js:163`).
   - `joinWords` puts quotes back around any argument that contains a space. That includes arguments that are part of the request text, not a value.
   - Each of these gives a complete, high-risk command with no placeholder:
     - `tellsh --dry-run "delete folder" /tmp/x` gives `$ rm -r 'delete folder'`
     - `tellsh "delete the folder" "/tmp/my data"` gives `rm -r 'delete the folder'`
     - `tellsh "usuń katalog" build` gives `rm -r 'usuń katalog'`
     - `tellsh "delete all log files in" "/tmp/my logs"` gives `find '/tmp/my logs' -type f -iname <GLOB> -delete`, and the `.log` filter is lost.
   - At `0d87457` the first one gave `rm -r /tmp/x`, so this is a new regression from the round 6 fix.
   - The same function is used for `tellsh …` history lines (`src/history.js:384`), so the problem can come back through history too.
   - Suggested fix: only re-quote an argument with spaces when it looks like a value (it contains `/`, `\`, `~`, or a `.ext`), or when it comes after the first argument that is plain request text. When unsure, leave a placeholder. Add tests for `["delete folder", "/tmp/x"]` and `["usuń katalog", "build"]`.

### Minor
2. **The current `tellsh` call is matched too loosely** (`src/history.js:755`).
   - `norm(prev).includes(norm(query))` also removes an *earlier* `tellsh` line whose text merely contains the query.
   - In bash, which does not write the running command to the history file first: history `['cat secret.txt', 'tellsh show it delete it']` plus "delete it" gives `rm secret.txt`. That value is from two lines back.
   - Fix: require an exact match after normalisation. Removing the `includes` alternative does it.
3. **A plural reference silently drops values** (`src/history.js` `analyzeCommand`/`entsFromSlots`). "delete them" after `touch a.txt b.txt` gives `rm b.txt` with no warning. It should leave a placeholder or name all the files.
4. **The danger checker is inconsistent for system files** (`src/danger.js`).
   - Round 7 made `truncate -s0 /etc/passwd` and `cp /dev/null /etc/passwd` critical.
   - These are still only high, not critical: `rm /etc/passwd`, `rm -f /etc/shadow`, `sed -i d /etc/passwd`, `tee /etc/passwd < /dev/null`, `cat /dev/null | sudo tee /etc/passwd`.
   - Unlike the earlier checker gaps, this one is reachable from a generated suggestion, not just from editing at the confirm prompt: after `sudo cat /etc/shadow`, "delete it" gives `rm /etc/shadow`.
5. **`cat a.txt; cd /srv` then "delete it" gives `rm -r /srv`.** It is marked critical, so you have to type it again. But a `cd` at the end of a line wins over a file read in the same line. `locativeRef` refuses the matching "there" case (`cd /tmp/x; cat a.txt`). The "it" case should be refused too.
6. **"move it there" after `cd /tmp/x` returns nothing useful.** It comes back with `understood: false`, `method: none`, but `context.rule: 'pronoun'`. That is safe, since there is no command, but the context should say `refused` with the "it … there" note.

### Training, data and eval
- Only the EVAL.md wording and the gold rows changed. Training data and the model are unchanged.
- The 2 edited gold rows in the blind set (`data/blind/history.jsonl`) are listed in EVAL.md. Still, that set is described as never used for tuning. I'd note in EVAL.md that the blind history score from round 7 on is not directly comparable to earlier rounds.

The verdict is REQUEST_CHANGES because of the Major finding.

VERDICT: REQUEST_CHANGES

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
index f98833f..223d06b 100644
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
@@ -249,6 +253,38 @@ export const INTENTS = [
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
+  T('wrangler_dev', 'Run a Cloudflare Worker locally (wrangler dev)', 'npx wrangler dev', {}),
+  T('wrangler_tail', 'Stream live logs of a deployed Cloudflare Worker', 'npx wrangler tail', {}),
+  T('wrangler_secret_put', 'Set a secret (environment variable) on a Cloudflare Worker', 'npx wrangler secret put {var!raw}',
+    { var: null }, 'medium', { notes: 'wrangler prompts for the value, so it never lands in shell history' }),
+  T('wrangler_login', 'Log in to Cloudflare with wrangler', 'npx wrangler login', {}),
+  T('wrangler_whoami', 'Show which Cloudflare account wrangler is logged in as', 'npx wrangler whoami', {}),
+
+  // ---------- GitHub CLI ----------
+  T('gh_auth_status', 'Show GitHub CLI login status', 'gh auth status', {}),
+  T('gh_auth_login', 'Log in to GitHub with the gh CLI', 'gh auth login', {}),
+  T('gh_pr_list', 'List pull requests of the repository', 'gh pr list', {}),
+  T('gh_pr_view', 'Show a pull request', 'gh pr view«{num!raw}»', {}),
+  T('gh_pr_create', 'Create a pull request from the current branch', 'gh pr create --fill', {}, 'medium'),
+  T('gh_pr_checks', 'Show CI check status of a pull request', 'gh pr checks«{num!raw}»', {}),
+  T('gh_pr_merge', 'Merge a pull request', 'gh pr merge«{num!raw}»', {}, 'medium'),
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
index c06039a..4682149 100644
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
+  name: 'NAME', service: 'NAME', container: 'NAME', pkg: 'NAME', cmd: 'NAME', script: 'NAME', start: 'NUM', end: 'NUM', num: 'NUM', branch: 'BRANCH', user: 'USER',
   pattern: 'PATTERN', old: 'PATTERN', new: 'REPL', message: 'MSG', var: 'VAR', text: 'TEXT',
 };
 
diff --git a/src/variants.js b/src/variants.js
index 4a171b3..46951aa 100644
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
+  gh_pr_view: { pwsh: 'gh pr view«{num!raw}»', cmd: 'gh pr view«{num!raw}»' },
+  gh_pr_create: { pwsh: 'gh pr create --fill', cmd: 'gh pr create --fill' },
+  gh_pr_checks: { pwsh: 'gh pr checks«{num!raw}»', cmd: 'gh pr checks«{num!raw}»' },
+  gh_pr_merge: { pwsh: 'gh pr merge«{num!raw}»', cmd: 'gh pr merge«{num!raw}»' },
+  gh_run_list: { pwsh: 'gh run list', cmd: 'gh run list' },
+  gh_run_view: { pwsh: 'gh run view«{num!raw}»', cmd: 'gh run view«{num!raw}»' },
+  activate_venv: {
+    fish: 'source {path}/bin/activate.fish',
+    pwsh: { win: "& (Join-Path {path} 'Scripts/Activate.ps1')", unix: "& (Join-Path {path} 'bin/Activate.ps1')" },
+    cmd: 'call {path}\\Scripts\\activate.bat',
+  },
 };

exec
/bin/bash -lc "sed -n '1,300p' src/pipeline.js" in /workspace/tellsh
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
  pkg: (v) => WORDISH(v) || /^@[\w.-]{1,64}\/[\w.-]{1,64}(?:@[\w.^~<>=*-]{1,32})?$/.test(v),
  branch: (v) => /^(?!-)[\w./-]{1,100}$/.test(v), user: (v) => /^[a-z_][\w.-]{0,31}$/i.test(v),
  glob: (v) => /^\*\.[\w]{1,8}$/.test(v),
  url: (v) => v.length < 2048 && (/^(?:https?|ftp|ftps|ssh|git|file):\/\/[^\s/?#]*[^\s]*$/i.test(v) || /^(?!-)[\w.-]+@[\w.-]+:[^\s]+$/.test(v)),
  host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
  pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
  old: (v) => v.length > 0 && v.length < 300 && !/[\n\r\0]/.test(v), new: (v) => v.length < 300 && !/[\n\r\0]/.test(v),
};
const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
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
  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user']) {
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
    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank });
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


exec
/bin/bash -lc "sed -n '301,620p' src/pipeline.js" in /workspace/tellsh
 succeeded in 0ms:
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

  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode, tagger: opts.tagger });
  const slots = r.slots;
  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
  const ambiguousPaths = [];
  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
  const blank = new Set(r.withheld || []);
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
  // changing command never takes it (or a part of it) as its path: placeholder + warning
  const unclearArgs = [];
  if (BY_ID[intent].risk !== 'safe' && opts.unclearArgs?.length) {
    const words = (x) => String(x).toLowerCase().split(/\s+/).filter(Boolean);
    const partOf = (v, u) => { const a = words(u); const b = words(v); return b.length > 0 && a.some((_, i) => b.every((w, j) => a[i + j] === w)); };
    for (const k of Object.keys(slots)) {
      if (!PATH_SLOT_NAMES.has(k) || r.sources[k] === 'history') continue;
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
    for (const k of refDst ? [] : ref.blank || []) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
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
        if (slots[k] == null && usesSlot(it, k)) blank.add(k);
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
    for (const k of withheld) blank.add(k);
    if (withheld.length) { context.rule = 'refused'; context.note = `previous ${sb.lastIntent} has ${withheld.join(', ')} that depends on the shell state or is not a valid value; not guessing`; }
    finalizeSlots(it, slots);
  }
  let b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: r.invalidOperands });
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
      b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: r.invalidOperands });
      method = 'history-rule'; // history-derived: never auto-run by --yes
      context.rule ??= 'implicit';
      context.note = [context.note, `filled from history: ${filled.join(', ')}`].filter(Boolean).join('; ');
    }
  }
  if (Object.values(r.sources).includes('history')) method = 'history-rule';
  const res = { ...out, understood: true, method, ...b, slotSources: r.sources, spans: r.spans.map((s) => ({ type: s.type, text: s.text })) };
  if (ambiguousText.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: unclear where the quoted text ends (\\" may be an escaped quote) (${ambiguousText.join(', ')})`];
  if (ambiguousPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${ambiguousPaths.join(', ')}); quote the path`];
  if (unclearArgs.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the quoted argument is a name or part of the request (${unclearArgs.join(', ')}); pass the whole request as one quoted argument`];
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
/bin/bash -lc 'cat src/rerank/hybrid.js && cat src/render.js' in /workspace/tellsh
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
  // v0.4 (enc-v2 retrained without held-out augmented rows, recalibrated with the v0.4 A_dev); the first v0.4 encoder
  // had tau 0.9, alpha 0.5, none 0.3 (both); v0.3 had none: 0.5 and k: 5 for the safe variant
  'A+B': { tau: 0.8, k: 5, alpha: 0.75, accept: 0, none: 0.5, keepNone: true, tagger: 'A' },
  'A+B-safe': { tau: 0.9, k: 3, alpha: 0.5, accept: 0, none: 0.5, rescue: false, tagger: 'A' },
  'A+C': { tau: 0.9, k: 5, alpha: 0.75, accept: 0, keepNone: true },
  'A+C-safe': { tau: 0.9, k: 5, alpha: 0.75, accept: 0, rescue: false },
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
  return { ...c, intent: best, tool, confidence: conf, top, reranked: true, topTool: ok ? tool : c.topTool };
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

codex
The earlier fixes now have regression tests covering quoted CLI arguments, history ambiguity, composer fallback, and hybrid training exclusions. I’m checking nearby edge cases, especially whether refused values can reappear through another path.
exec
/bin/bash -lc 'cat src/fill.js && cat src/shellwords.js' in /workspace/tellsh
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
};

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
        // an operand the request named but that is not valid (keepOptional) keeps its placeholder: the optional part
        // is not silently dropped (`npm install <PKG>`, never `npm install`)
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
    return { ...base, command: null, gap: err.message, risk: intent.risk, warnings: [], critical: false, missing: [] };
  }
  if (choice.wrapPosix) {
    // PowerShell < 7.3 drops embedded double quotes when passing arguments to native programs, so a
    // POSIX command containing `"` is fed to bash on stdin instead of as a -c argument.
    if (command.includes('"')) { command = psQuote(command) + ' | bash'; base.variant = 'piped to bash (no native PowerShell variant)'; }
    else { command = 'bash -c ' + psQuote(command); base.variant = 'bash -c (no native PowerShell variant)'; }
  }
  missing = [...new Set(missing)];
  const danger = checkDanger(command, intent.risk);
  return {
    ...base,
    command,
    risk: maxRisk(intent.risk, danger.risk),
    warnings: danger.warnings,
    critical: danger.critical,
    missing,
  };
}
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
  const flushSeg = (sep = '') => { flushWord(); if (words.length) segments.push({ words, raw: raws, sep }); else if (sep && segments.length) segments[segments.length - 1].sep += sep; words = []; raws = []; };
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
// a word that contains a path separator or ends in a file extension ("my data/a.txt", "My Notes.txt")
const PATH_FORM = /[\\/]|\.[A-Za-z0-9]{1,8}$/;

/**
 * Join already-split words (argv, or the words of a `tellsh …` history line) back into request text without
 * losing their boundaries. A single word is the whole request (`tellsh "delete folder /tmp/x"`) and is used as it is.
 * Among several words, one with whitespace is
 *   - a value, quoted again so the slot extractor reads it as one value (never `/tmp/a`), when it has the form of a
 *     path: `delete folder "/tmp/a b"`, `delete "my data/a.txt"`;
 *   - request text, joined unquoted, when it is the first word and not a path (`tellsh "delete folder" /tmp/x`);
 *   - unclear otherwise (`tellsh delete folder "my data"`: a name, or words of the request?): quoted, and listed in
 *     `unclear` so a changing command leaves that path as a placeholder.
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
    const value = PATH_START.test(s) || (i > 0 && PATH_FORM.test(s));
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
/bin/bash -lc 'cat scripts/hybrid/export_data.js scripts/lib/heldout.js scripts/hybrid/train_encoder.py' in /workspace/tellsh
exec
/bin/bash -lc 'git diff 0d87457..HEAD -- scripts/train.py scripts/gen_data.js scripts/tldr_ingest.py && cat scripts/hybrid/train_a_dev.sh scripts/hybrid/train_lm_gpu.py' in /workspace/tellsh
 succeeded in 0ms:
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
 
diff --git a/scripts/tldr_ingest.py b/scripts/tldr_ingest.py
index 2313db6..2234fb8 100644
--- a/scripts/tldr_ingest.py
+++ b/scripts/tldr_ingest.py
@@ -288,6 +288,11 @@ def head_sub(cmd):
 
 
 # --- main ---------------------------------------------------------------------------
+def is_inside(p, root):
+    rp, rr = os.path.realpath(p), os.path.realpath(root)
+    return rp == rr or rp.startswith(rr + os.sep)
+
+
 def main():
     tldr = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_TLDR)
     os.makedirs(OUT_DIR, exist_ok=True)
@@ -296,11 +301,16 @@ def main():
     for lang, ldir in LANG_DIRS.items():
         for plat in PLATFORMS:
             d = os.path.join(tldr, ldir, plat)
-            if not os.path.isdir(d):
+            # the checkout is untrusted: never follow symlinked directories or pages out of the tree
+            if not os.path.isdir(d) or os.path.islink(d) or not is_inside(d, tldr):
                 continue
             for fn in sorted(os.listdir(d)):
                 if not fn.endswith('.md'):
                     continue
+                fp = os.path.join(d, fn)
+                if os.path.islink(fp) or not os.path.isfile(fp) or not is_inside(fp, tldr):
+                    skipped[lang] += 1
+                    continue
                 name = fn[:-3].lower()
                 fam = page_family(plat, name)
                 if fam is None:
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
# gen_data: additionally drop every dev-split sentence (same hash as export_data.js)
sed -e "s#if (heldOut.has(r0.text)) { dropped++; continue; }#if (heldOut.has(r0.text) || isDevText(r0.text)) { dropped++; continue; }#" \
    -e "s#^import { ctxFeatures } from '../src/history.js';#&\nimport { fnv1a as _fnv } from '../src/features.js';\nconst isDevText = (t) => _fnv('dev:' + normalize(t)) % 10 === 0;#" \
    $ROOT/scripts/gen_data.js > $T/scripts/gen_data.js
# both substitutions must have happened (the import alone is not enough)
grep -q 'heldOut.has(r0.text) || isDevText' $T/scripts/gen_data.js
cd $T && node scripts/gen_data.js && python3 scripts/train.py --out $T/model/model.bin
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
        for i in range(0, len(train) - a.bs + 1, a.bs):
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
  writeFileSync(join(OUT, 'train.jsonl'), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
  const meta = {
    tools: [...Object.keys(FAMILIES), NONE],
    intents: INTENTS.map((i) => i.id),
    intentTool: Object.fromEntries(INTENTS.map((i) => [i.id, FAMILY_OF[i.id]])),
    descriptions: Object.fromEntries(INTENTS.map((i) => [i.id, i.description])),
    tagLabels: ['O', ...TAG_TYPES.flatMap((t) => [`B-${t}`, `I-${t}`])],
  };
  writeFileSync(join(OUT, 'meta.json'), JSON.stringify(meta, null, 1));
  const c = (f) => rows.filter(f).length;
  console.log(`export_data: ${out.dropped} augmented rows dropped (held-out texts)`);
  console.log(`export_data: ${base.length} base (${base.filter((r) => r.src === 'real').length} real), ${rows.length} rows (train ${c((r) => r.split === 'train')}, dev ${c((r) => r.split === 'dev')}), tldr ${c((r) => r.src === 'tldr')}, ood ${c((r) => r.src === 'ood')}`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
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

exec
/bin/bash -lc 'git diff 0d87457..HEAD -- scripts/train.py scripts/gen_data.js scripts/tldr_ingest.py && cat scripts/hybrid/train_a_dev.sh scripts/hybrid/train_lm_gpu.py' in /workspace/tellsh
 succeeded in 0ms:
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
 
diff --git a/scripts/tldr_ingest.py b/scripts/tldr_ingest.py
index 2313db6..2234fb8 100644
--- a/scripts/tldr_ingest.py
+++ b/scripts/tldr_ingest.py
@@ -288,6 +288,11 @@ def head_sub(cmd):
 
 
 # --- main ---------------------------------------------------------------------------
+def is_inside(p, root):
+    rp, rr = os.path.realpath(p), os.path.realpath(root)
+    return rp == rr or rp.startswith(rr + os.sep)
+
+
 def main():
     tldr = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_TLDR)
     os.makedirs(OUT_DIR, exist_ok=True)
@@ -296,11 +301,16 @@ def main():
     for lang, ldir in LANG_DIRS.items():
         for plat in PLATFORMS:
             d = os.path.join(tldr, ldir, plat)
-            if not os.path.isdir(d):
+            # the checkout is untrusted: never follow symlinked directories or pages out of the tree
+            if not os.path.isdir(d) or os.path.islink(d) or not is_inside(d, tldr):
                 continue
             for fn in sorted(os.listdir(d)):
                 if not fn.endswith('.md'):
                     continue
+                fp = os.path.join(d, fn)
+                if os.path.islink(fp) or not os.path.isfile(fp) or not is_inside(fp, tldr):
+                    skipped[lang] += 1
+                    continue
                 name = fn[:-3].lower()
                 fam = page_family(plat, name)
                 if fam is None:
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
# gen_data: additionally drop every dev-split sentence (same hash as export_data.js)
sed -e "s#if (heldOut.has(r0.text)) { dropped++; continue; }#if (heldOut.has(r0.text) || isDevText(r0.text)) { dropped++; continue; }#" \
    -e "s#^import { ctxFeatures } from '../src/history.js';#&\nimport { fnv1a as _fnv } from '../src/features.js';\nconst isDevText = (t) => _fnv('dev:' + normalize(t)) % 10 === 0;#" \
    $ROOT/scripts/gen_data.js > $T/scripts/gen_data.js
# both substitutions must have happened (the import alone is not enough)
grep -q 'heldOut.has(r0.text) || isDevText' $T/scripts/gen_data.js
cd $T && node scripts/gen_data.js && python3 scripts/train.py --out $T/model/model.bin
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
        for i in range(0, len(train) - a.bs + 1, a.bs):
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
/bin/bash -lc "sed -n '1,195p' src/fill.js && sed -n '1,200p' src/danger.js" in /workspace/tellsh
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
};

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
  sudo: /^-[ugpCDhrtTUR]$|^--(?:user|group|prompt|close-from|chdir|host|role|type|other-user|command-timeout)$/,
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

exec
/bin/bash -lc "rg -n '"'^export |''^function |''^const .*='"' src/history.js && sed -n '730,1125p' src/history.js" in /workspace/tellsh
 succeeded in 0ms:
14:export { isAmbiguous };
19:export function historyCandidates(shell, env = process.env, os = process.platform) {
38:function readTail(path, maxBytes = 32768) {
52:function unmetafy(buf) {
61:export function parseHistory(text, kind = 'bash', { partial = false } = {}) {
88:export function loadHistory({ shell = 'bash', file, n = 2, env = process.env, os = process.platform } = {}) {
112:const PS_CMDLET = /^[A-Za-z]+-[A-Za-z]+$/;
113:const lineKind = (line, kind) => (kind === 'pwsh' || PS_CMDLET.test(String(line).trim().split(/\s/)[0]) ? 'pwsh' : 'posix');
114:const PATHLIKE = /(?:^|\s)['"]?[~.\w-]*[\\/][\w.-]|\.\w{1,5}(?:['"]?\s|['"]?$)/;
115:const GLOB_SLOTS = new Set(['namepat', 'glob', 'pattern', 'sedexpr', 'old', 'new', 'text', 'message']);
118:const BT = '`';
122:const WORD_RE = {
127:function inverters() {
161:function invert(cmd, kind = 'posix') {
181:const FILE_HEADS = new Set(['cat', 'less', 'more', 'head', 'tail', 'vim', 'vi', 'nvim', 'nano', 'code', 'stat', 'file', 'wc',
183:const DIR_HEADS = new Set(['cd', 'ls', 'du', 'find', 'tree', 'mkdir', 'rmdir', 'pushd', 'ncdu']);
185:const INERT_HEADS = new Set(['echo', 'printf', 'man', 'which', 'whereis', 'type', 'history', 'clear', 'exit', 'export', 'alias', 'unalias',
188:const DOCKER_CT = new Set(['logs', 'exec', 'stop', 'start', 'restart', 'rm', 'inspect', 'attach', 'kill', 'top', 'port', 'pause', 'unpause']);
189:const DOCKER_VAL_FLAGS = new Set(['--tail', '-n', '--since', '--until', '-e', '--env', '-u', '--user', '-w', '--workdir', '-t', '--time', '-s', '--signal']);
190:const DOCKER_INTENT = { logs: 'docker_logs', stop: 'docker_stop', exec: 'docker_exec' };
191:const SYSTEMCTL_INTENT = { status: 'service_status', restart: 'service_restart', stop: 'service_stop', start: 'service_start', enable: 'service_enable' };
194:const PS_NATIVE = {
205:const PS_SERVICE_INTENT = { 'stop-service': 'service_stop', 'start-service': 'service_start', 'restart-service': 'service_restart', 'get-service': 'service_status' };
206:const PS_VALUE_PARAMS = new Set(['path', 'literalpath', 'lp', 'pspath', 'name', 'id', 'processname', 'computername', 'targetname', 'uri', 'destination',
210:function psArgs(args) {
225:const typeByExt = (p) => (/\.\w{1,5}$/.test(rawOf(p)) ? 'file' : 'dir');
232:function destEnts(srcs, dst, ents) {
243:const VALUE_OPTS = {
259:function parseArgs(args, valueOpts = new Set()) {
279:function unwrap(w) {
287:const CD_HEADS = new Set(['cd', 'pushd', 'popd', 'chdir', 'set-location', 'sl', 'push-location', 'pop-location']);
289:export const isRelativePath = (v) => {
293:const PATH_SLOT_KEYS = ['path', 'file', 'src', 'dst', 'dest', 'archive'];
295:function staleRelative(ents, slots) {
301:const REDIR_TARGET_OP = /^\d*(?:[<>]{1,2}[&|]?|&>>?)$/;
302:const REDIR_DUP_OP = /^\d*[<>]+&[\d-]+$/;
305:function psNative(head, args, ents, setIntent) {
345:function entsFromSlots(intent, slots, ents) {
364:const TELLSH_LINE = /^(?:npx\s+(?:-y\s+)?|node\s+)?(?:\S*[\\/])?tellsh(?:\.js)?(?:\s+(.*))?$/s;
367:const TELLSH_VALUE_OPTS = new Set(['--shell', '--os', '--platform', '--top', '--threshold']);
373:export function tellshQuery(line, kind = 'posix') {
379:export function tellshArgs(line, kind = 'posix') {
405:export function analyzeCommand(line, classify, kind = 'posix') {
538:const FS_LISTERS = new Set(['ls', 'tree', 'dir', 'gci', 'get-childitem', 'll', 'la', 'find', 'fd', 'fdfind', 'locate', 'mlocate', 'plocate',
540:const FS_SEARCHERS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'select-string', 'sls', 'findstr']);
541:const PROC_LISTERS = new Set(['ps', 'top', 'htop', 'btop', 'atop', 'pgrep', 'pidof', 'pstree', 'get-process', 'gps', 'tasklist']);
543:const GLOBAL_VALUE_OPTS = {
550:function afterGlobals(head, args) {
558:function listedBySegment(w, pipedIn, k) {
582:const LIST_INTENT = { docker_ps: ['container'], docker_ps_all: ['container'], docker_stats: ['container'], list_services: ['service'],
584:const LIST_FAMILY = { ls: ['file', 'dir'], find: ['file', 'dir'], grep: ['file', 'dir'], du: ['file', 'dir'], ps: ['pid', 'proc'], ss: ['port', 'pid', 'proc'] };
586:const listedByIntent = (intent) => (intent ? LIST_INTENT[intent] || LIST_FAMILY[FAMILY_OF[intent]] || [] : []);
589:const FILTER_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag', 'findstr', 'select-string', 'sls', 'where-object', 'where', '?']);
590:const GREP_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag']);
593:const isSearchRoot = (intent, slots, ents) => ents.dir != null && ['find', 'grep'].includes(FAMILY_OF[intent]) && String(ents.dir) === String(slots.path);
597:const oneOf = (ops) => (ops.length > 1 ? AMB + ops.map(rawOf).join(' ') : ops[0]);
600:function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
746:const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];
762:export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
794:export function cwdFlags(cwd) {
805:export function ctxFeatures(ctx) {
817:const SAME_RES = [
829:const EXPLICIT_SAME = [SAME_RES[0], SAME_RES[3], SAME_RES[4], SAME_RES[6]];
832:const fold = (q) => foldKeepLength(String(q)).toLowerCase();
833:const PRONOUN_EN = /\b(it|its|that|this|them|those|these|the same one)\b/;
834:const PRONOUN_WORD = /^(it|its|that|this|them|those|these|one|again|there|here|tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym|to|force|forced|forcibly|sila|sile|silowo|recursive\w*|rekurencyjn\w*|please|prosze|too|also|tez|rowniez)$/;
836:const PLURAL = /(?:^|[^a-z])(them|those|these|je|te|tamte|ich|nimi)(?=$|[^a-z])/;
837:const PRONOUN_PL = /(?:^|\s)(tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym)(?=\s|$|[?!.,])|(?:^|\s)to(?=\s*[?!.]*$|\s+(?:co|ktor\w*|tam))/;
841:const LOCATIVE = new RegExp([
852:export const hasLocative = (q) => LOCATIVE.test(fold(q));
855:const CONTENTS = new RegExp([
864:const NOUN_TYPE = [
878:const FORCE = /\b(force\w*|forcibly|-9|sigkill|na sile|sila|silowo|brutaln\w*)\b/;
879:const VERBS = [
901:const SLOT_FROM_ENT = {
907:const NOT_REF = /\b(?:that|which|this)\s+(?:are|is|was|were|have|has|had|(?:contain|match|end|start|begin|use|take|listen|run|belong|need)(?:s|es|ed|d|ing)?|running|using|taking|ran|took|do|does|did|can|could|will|would|should|i|you|we|they)\b|\b(?:this|that|last|next)\s+(?:week|month|year|day|morning|evening|afternoon|night|time|hour|minute)s?\b/g;
908:const refText = (q) => fold(q).replace(NOT_REF, (m) => ' '.repeat(m.length));
909:export const hasPronoun = (q) => PRONOUN_EN.test(refText(q)) || PRONOUN_PL.test(refText(q));
912:export function sameFor(q) {
922:function retarget(intent, arg) {
946:export function resolveReference(query, ctx) {
1036:function locativeRef(fq, ctx) {
1056:export function changeGuard(type, value, fq, ctx) {
1079:const chooseValue = (type, ctx) => ctx.ents[type];
1082:const HINTED_NOUN = /\b(?:that|this|those|these|the|ten|ta|te|tamten|tamta|tamte)\s+([a-z0-9][\w.-]*)\s+(?:folders?|director(?:y|ies)|dirs?|files?|branch(?:es)?|containers?|services?|process(?:es)?|katalog\w*|folder\w*|plik\w*|kontener\w*|uslug\w*|galaz\w*|galez\w*)\b/g;
1084:const NOT_HINT = /^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back|list\w*|wylistuj\w*|check|sprawdz\w*|wipe|nuke|purge|destroy|clear|clean\w*|wyczysc\w*|drop|what|which|where|about|with|from|into|then|also|again|teraz|jeszcze|whatever|everything|anything|something|thing|stuff|still|there|here|tutaj|tamto|wszystko|cokolwiek|whole|entire|completely|cale|calym|listening|running|working|executable|wykonywaln\w*|contents?|zawartosc\w*|entries|inside|wewnatrz|siedzi|srodku|please|prosze|again|ponownie|znowu|forcefully|recursively|rekurencyjnie|permanently|trwale|names?|nazw\w*|only|tylko|same|samo|thing|merged|zmergowan\w*|scalon\w*|current|biezac\w*|aktualn\w*|obecn\w*|previous|poprzedni\w*|ostatni\w*|last|other|inn\w*|empty|pust\w*|temporary|tymczasow\w*|local|lokaln\w*|remote|zdaln\w*|stopped|zatrzyman\w*|created|utworzon\w*|newly|nowo|nowy|nowa|nowe|nowym|whole|cal\w*|samym|given|mentioned|wspomnian\w*|above|powyzsz\w*|broken|zepsut\w*|failed|failing|nieudan\w*|old\w*|star\w*)$/;
1085:const isHintWord = (w) => w.length >= 4 && !/^\d+$/.test(w) && !NOT_HINT.test(w) && !isStopWord(w) && !PRONOUN_WORD.test(w) && !FORCE.test(w)
1089:export function entityForSlot(slot, ctx) {
1101:const SAME_BUT = [/^\s*(?:and\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?,?\s+but\s+(.+)$/, /^\s*(?:a\s+|i\s+)?(?:to\s+)?samo,?\s+ale\s+(.+)$/,
1104:export function sameBut(query, ctx) {
1114:function intentUses(intent, ent) {
1118:function pickEnt(intent, ent, ctx) {
    if (p) {
      e.dir = p;
      if (head === 'find') e.searchDir = true;
      // `du DIR` / `du -d 1 DIR | sort -rh` lists the entries of DIR (`du -sh DIR` is DIR itself)
      else if (['ls', 'tree', 'ncdu'].includes(head) || (head === 'du' && !args.some((a) => /^-[a-zA-Z]*s|^--summarize$/.test(a)))) e.listDir = true;
    }
    // `ls`, `ls *.pdf`: the working directory (a glob selects some of its entries)
    else if (['ls', 'tree'].includes(head)) e.listCwd = nonFlags.some(isGlob) ? 'search' : 'list';
  } else if (!INERT_HEADS.has(head.toLowerCase())) {
    // unknown command (or unknown cmdlet) naming a path: we cannot tell what it did with it, so an
    // older file/dir must not be picked up by "it"
    const p = nonFlags.find((a) => PATHLIKE.test(rawOf(a)) && !/^\w+:\/\//.test(rawOf(a)));
    if (p) e[typeByExt(p)] = AMB + rawOf(p);
  }
}

const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];

/**
 * Build the context object from history commands (oldest first). Only the single most recent command is a
 * reference target ("delete it", "same for /var", "there" always mean the previous command, never an older one);
 * the running `tellsh <query>` line itself, which some shells write before it runs, is dropped first.
 * kind: 'posix' | 'pwsh' (default: `cmds.kind` as set by loadHistory, else posix)
 * -> { n, line, ents: {type: value}, entOrder, refOrder, searchRoots, listedDirs, last: {intent, slots, ambiguous, skipped},
 *      pos, listing, cdDir, features }
 *    values that could not be read unambiguously are kept as AMB-prefixed strings (see isAmbiguous).
 *    Within the line (`cat old.txt; ls newdir`) later segments win: pos gives the segment of each value, and refOrder
 *    ranks types by it (entOrder, which feeds the classifiers' ctx_ features, ranks by type only). searchRoots: the dir
 *    is a find/grep root or a filtered/piped listing; listedDirs: a plain listing. last.skipped: a later segment of the
 *    line ran after the repeatable command. listing: the segment of the newest listing of each entity type ({ seg });
 *    cdDir: the dir is a `cd` target ({ value, followed }). changeGuard() uses these.
 */
export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
  const k = kind || cmds.kind || 'posix';
  const list = [...cmds];
  // zsh (share_history / inc_append_history), fish and PSReadLine write the running line to the
  // history file before it executes: the current `tellsh <query>` call is not the previous command
  if (query != null && list.length) {
    const norm = (x) => String(x).trim().replace(/\s+/g, ' ');
    const q = tellshQuery(list[list.length - 1], k);
    // exact match only: an earlier `tellsh` line whose text merely contains the query is the previous command
    if (q != null && q !== false && norm(q) === norm(query)) list.pop();
  }
  const line = list.length ? list[list.length - 1] : null;
  const a = line != null ? analyzeCommand(line, classify, k) : { ents: {}, at: {}, listed: {}, slots: {} };
  const ents = {};
  for (const t of ENT_TYPES) if (a.ents[t] != null) ents[t] = a.ents[t];
  const pos = Object.fromEntries(Object.keys(ents).map((t) => [t, a.at?.[t] ?? 0]));
  const dir = ents.dir != null ? String(ents.dir) : null;
  const searchRoots = new Set(dir != null && a.searchDir ? [dir] : []);
  const listedDirs = new Set(dir != null && a.listDir ? [dir] : []);
  const listing = Object.fromEntries(Object.entries(a.listed || {}).map(([t, seg]) => [t, { seg }]));
  const last = a.intent ? { intent: a.intent, slots: a.slots, ambiguous: !!a.ambiguous, skipped: !!a.intentStale } : null;
  const current = a.ents.current && !isAmbiguous(a.ents.current) ? a.ents.current : null;
  const cdDir = a.cdDir && dir != null ? { value: dir, followed: !!a.cdFollowed } : null;
  const byType = (x, y) => ENT_TYPES.indexOf(x) - ENT_TYPES.indexOf(y);
  const entOrder = Object.keys(ents).sort(byType);
  const refOrder = Object.keys(ents).sort((x, y) => pos[y] - pos[x] || byType(x, y));
  const ctx = { n: line != null ? 1 : 0, line, ents, currentBranch: current, entOrder, refOrder, searchRoots, listedDirs, last,
    cwdFlags: cwdFlags(cwd), pos, listing, cdDir };
  ctx.features = ctxFeatures(ctx);
  return ctx;
}

export function cwdFlags(cwd) {
  if (!cwd) return [];
  const f = [];
  try {
    if (existsSync(join(cwd, '.git'))) f.push('git');
    if (['docker-compose.yml', 'docker-compose.yaml', 'compose.yml', 'compose.yaml'].some((n) => existsSync(join(cwd, n)))) f.push('compose');
  } catch { /* ignore */ }
  return f;
}

/** ctx_ tokens fed to the classifiers (same function is used by scripts/gen_data.js). */
export function ctxFeatures(ctx) {
  const f = [];
  if (ctx.entOrder?.[0]) f.push('ctx_last=' + ctx.entOrder[0]);
  for (const k of ctx.entOrder || []) f.push('ctx_has=' + k);
  if (ctx.last?.intent) f.push('ctx_tool=' + FAMILY_OF[ctx.last.intent]);
  for (const c of ctx.cwdFlags || []) f.push('ctx_cwd=' + c);
  return f;
}

// ---------------------------------------------------------------------------------------------
// deterministic coreference rules

const SAME_RES = [
  /^\s*(?:and\s+|now\s+)?(?:do\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?(?:\s+but)?\s+(?:for|in|on|with|to|at)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:now|again|and)\s+(?:for|in|on|with)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:what|how)\s+about\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:repeat|do it again|run it again)\s+(?:for|in|on|with)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:a\s+|i\s+)?(?:teraz\s+)?(?:to\s+)?samo\s+(?:dla|w|we|na|z|do|ale\s+dla|ale\s+w)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:a|i)\s+(?:teraz\s+)?(?:dla|w|we|na)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:tak samo|analogicznie|powt[oó]rz)\s+(?:dla|w|we|na)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:a\s+)?co\s+z\s+(.+?)\s*[?!.]*$/i,
];

// the forms that can only mean "repeat the previous command" (not "what about X" / "a w X")
const EXPLICIT_SAME = [SAME_RES[0], SAME_RES[3], SAME_RES[4], SAME_RES[6]];

// all rule regexes run on the diacritic-folded, lowercased query (same length as the original)
const fold = (q) => foldKeepLength(String(q)).toLowerCase();
const PRONOUN_EN = /\b(it|its|that|this|them|those|these|the same one)\b/;
const PRONOUN_WORD = /^(it|its|that|this|them|those|these|one|again|there|here|tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym|to|force|forced|forcibly|sila|sile|silowo|recursive\w*|rekurencyjn\w*|please|prosze|too|also|tez|rowniez)$/;
// plural references: the entries of a listing, never the listed directory itself
const PLURAL = /(?:^|[^a-z])(them|those|these|je|te|tamte|ich|nimi)(?=$|[^a-z])/;
const PRONOUN_PL = /(?:^|\s)(tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym)(?=\s|$|[?!.,])|(?:^|\s)to(?=\s*[?!.]*$|\s+(?:co|ktor\w*|tam))/;

// locative references: the directory of an earlier command as the place to act in ("delete all log files there",
// "usuń pliki log tam", "in the same folder"). Not "is there" / "there are" (existential), not "here" (the cwd).
const LOCATIVE = new RegExp([
  String.raw`(?<!\b(?:is|are|was|were|if|whether|be|still)\s+)\bthere\b(?!\s+(?:is|are|was|were|be|exists?|isn|aren|wasn|weren)\b|'s\b)`,
  String.raw`\binside(?=\s*(?:(?:too|also|as well|please|now|recursively)\s*)*[?!.,]*$)`,
  String.raw`\b(?:the\s+)?same\s+(?:folder|directory|dir|place|location|path|spot|catalog)\b`,
  String.raw`(?:^|\s)(?:tam|stamtad|tamze|tamtedy)(?=\s|$|[?!.,])`,
  String.raw`(?:^|\s)(?:tym\s+samym|tamtym|tego\s+samego|tamtego)\s+(?:folder\w*|katalog\w*|miejsc\w*)`,
  // "in the previous folder", "the last directory", "the directory I listed", "w poprzednim katalogu"
  String.raw`\b(?:previous|last|prior|earlier|preceding)\s+(?:folder|directory|dir|place|location|path|catalog)\b`,
  String.raw`\b(?:folder|directory|dir|place|location|path)\s+(?:that\s+|which\s+)?(?:i|we|you)\s+(?:just\s+)?(?:listed|used|searched|opened|visited|(?:was|were)\s+(?:just\s+)?in|went\s+(?:in)?to|cd'?e?d\s+(?:in)?to|changed\s+(?:in)?to|looked\s+(?:at|in|into))\b`,
  String.raw`(?:^|\s)(?:poprzedni\w*|ostatni\w*|wczesniejsz\w*)\s+(?:folder\w*|katalog\w*|miejsc\w*)`,
].join('|'));
export const hasLocative = (q) => LOCATIVE.test(fold(q));
// a request about the entries of a referenced directory, not the directory ("delete everything in it", "all files in it")
// ("delete its contents", "what is in it", "usuń jego zawartość", "to co jest w nim")
const CONTENTS = new RegExp([
  String.raw`\b(?:everything|all|anything|contents?|files?|wszystk\w*|wszystko|zawarto\w*|plik\w*)\b.*(?:^|\s)(?:in|inside|within|from|of|w|we|z|ze|wewnatrz)\s+(?:it|that|this|them|there|nim|niej|niego|tym|tamtym|tego|nich)(?=\s|$|[?!.,])`,
  String.raw`\b(?:contents?|entries)\b|\bzawarto\w*`,
  String.raw`\b(?:its|their)\s+(?:files?|items?|subfolders?|subdirectories)\b`,
  String.raw`\bwhat(?:'s|\s+is|\s+was|\s+are)?\s+(?:in|inside|within)\s+(?:it|that|this|there|them)\b`,
  String.raw`(?:^|\s)(?:jego|jej|ich)\s+(?:plik\w*|wszystk\w*|elementy|podkatalog\w*)`,
  String.raw`(?:^|\s)co\s+(?:jest\s+|sa\s+)?(?:w|we|wewnatrz)\s+(?:nim|niej|tym|srodku)(?=\s|$|[?!.,])`,
].join('|'));

const NOUN_TYPE = [
  [/\b(containers?|kontener\w*)\b/i, ['container']],
  [/\b(services?|unit|uslug\w*|serwis\w*|daemon|demon\w*)\b/i, ['service']],
  [/\b(process(es)?|proces\w*|program\w*|app)\b/i, ['pid', 'proc']],
  [/\b(pid)\b/i, ['pid']],
  [/\b(ports?|port\w*)\b/i, ['port']],
  [/\b(branch\w*|galaz\w*|galez\w*)\b/i, ['branch']], // folded gałąź/gałęzi/gałęzie (not "gallery")
  [/\b(dir(ectory)?|folder\w*|katalog\w*)\b/i, ['dir']],
  [/\b(files?|plik\w*)\b/i, ['file']],
  [/\b(hosts?|server\w*|serwer\w*|machine|maszyn\w*)\b/i, ['host']],
  [/\b(url|link\w*|adres\w*)\b/i, ['url']],
];

// verb class -> entity type -> intent
const FORCE = /\b(force\w*|forcibly|-9|sigkill|na sile|sila|silowo|brutaln\w*)\b/;
const VERBS = [
  ['blame', /\b(who (changed|modified|edited|wrote)|blame|kto (zmienial|modyfikowal|edytowal|pisal|zmienil))\b/i, { file: 'git_blame' }],
  ['extract', /\b(extract|unpack|unzip|untar|decompress|rozpakuj\w*|wypakuj\w*)\b/i, { file: 'extract_targz' }],
  ['kill', /\b(kill|zabij\w*|ubij\w*|terminate|zako[nń]cz\w*|ubi[cć])\b/i,
    { pid: 'kill_by_pid', proc: 'kill_by_name', port: 'kill_by_port', container: 'docker_stop' }],
  ['logs', /\b(logs?|log[iaó]\w*|journal)\b/i, { container: 'docker_logs', service: 'journal_service' }],
  ['restart', /\b(restart\w*|zrestartuj\w*|zrestartowa\w*|uruchom\w* ponownie|reload|prze[lł]aduj)\b/i, { service: 'service_restart' }],
  ['stop', /\b(stop|zatrzymaj\w*|wy[lł][aą]cz\w*|shut down)\b/i,
    { container: 'docker_stop', service: 'service_stop', pid: 'kill_by_pid', proc: 'kill_by_name' }],
  ['start', /\b(start|uruchom\w*|wystartuj\w*|w[lł][aą]cz\w*)\b/i, { service: 'service_start' }],
  ['delete', /\b(delete|remove|rm|erase|usu[nń]\w*|skasuj\w*|wywal\w*|wyrzu[cć]\w*)\b/i,
    { file: 'delete_file', dir: 'delete_dir', branch: 'git_delete_branch' }],
  ['enter', /\b(enter|shell into|exec|wejd[zź]\w*|wej[sś][cć])\b/i, { container: 'docker_exec' }],
  ['switch', /\b(switch|checkout|prze[lł][aą]cz\w*|przejd[zź]\w*)\b/i, { branch: 'git_switch_branch' }],
  ['status', /\b(status|stan\w*)\b/i, { service: 'service_status' }],
  ['size', /\b(size|how big|how much space|rozmiar\w*|ile zajmuje|ile wa[zż]y|wielko[sś][cć])\b/i, { dir: 'dir_size', file: 'file_stat' }],
  ['show', /\b(show|cat|print|display|open|read|view|poka[zż]\w*|wy[sś]wietl\w*|otw[oó]rz\w*|przeczytaj)\b/i,
    { file: 'cat_file', dir: 'list_files', service: 'service_status' }],
  ['ping', /\b(ping\w*)\b/i, { host: 'ping_host' }],
  ['connect', /\b(connect|ssh|po[lł][aą]cz\w*|zaloguj\w*)\b/i, { host: 'ssh_connect' }],
];

const SLOT_FROM_ENT = {
  container: ['container'], service: ['service'], pid: ['pid'], proc: ['name'], port: ['port'], branch: ['branch'],
  host: ['host', 'target'], url: ['url'], file: ['file', 'src', 'path'], dir: ['path', 'src'],
};

// "files that are larger", "processes which use", "modified this week": not references to an earlier command
const NOT_REF = /\b(?:that|which|this)\s+(?:are|is|was|were|have|has|had|(?:contain|match|end|start|begin|use|take|listen|run|belong|need)(?:s|es|ed|d|ing)?|running|using|taking|ran|took|do|does|did|can|could|will|would|should|i|you|we|they)\b|\b(?:this|that|last|next)\s+(?:week|month|year|day|morning|evening|afternoon|night|time|hour|minute)s?\b/g;
const refText = (q) => fold(q).replace(NOT_REF, (m) => ' '.repeat(m.length));
export const hasPronoun = (q) => PRONOUN_EN.test(refText(q)) || PRONOUN_PL.test(refText(q));

/** "same for X": returns the new argument text or null. */
export function sameFor(q) {
  const fq = fold(q);
  for (const re of SAME_RES) {
    const m = fq.match(re);
    if (m) { const at = m.index + m[0].indexOf(m[1]); return q.slice(at, at + m[1].length); }
  }
  return null;
}

/** Map a new argument onto the slot of `intent` it replaces. -> {slot, value} | null */
function retarget(intent, arg) {
  const it = BY_ID[intent];
  const has = (k) => k in it.slots || (typeof it.template === 'string' && it.template.includes(`{${k}`));
  const ex = extractSlots(arg);
  if (ex.paths.length && (has('path') || has('file'))) return { slot: has('path') ? 'path' : 'file', value: ex.paths[0] };
  if (ex.port && has('port')) return { slot: 'port', value: ex.port };
  if (ex.hosts.length && (has('host') || has('target'))) return { slot: has('host') ? 'host' : 'target', value: ex.target || ex.hosts[0] };
  if (ex.urls.length && has('url')) return { slot: 'url', value: ex.urls[0] };
  if (ex.ext && has('ext')) return { slot: 'ext', value: ex.ext };
  if (ex.count != null && (has('count') || has('pid'))) return { slot: has('pid') ? 'pid' : 'count', value: ex.count };
  const word = arg.trim().replace(/^(the|ten|ta|to|kontener\w*|container|service|usług\w*|branch|gałąź|galaz|proces\w*|process)\s+/i, '').trim();
  if (!/^[\w@.:/~+-]+$/.test(word)) return null;
  // pronouns and filler words are not values ("what about this", "and with force")
  if (isStopWord(word) || PRONOUN_WORD.test(fold(word)) || /^-/.test(word)) return null;
  for (const k of ['container', 'service', 'name', 'branch', 'pkg', 'host', 'path', 'file']) if (has(k)) return { slot: k, value: word };
  return null;
}

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
  // "delete it" after `ls`, `clear`, `make`: nothing in the previous command it could mean
  if (!ctx.entOrder.length) {
    const listed = Object.keys(ctx.listing || {});
    return { rule: 'refused', intent: null, blank: [...new Set(Object.values(SLOT_FROM_ENT).flat())],
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
function locativeRef(fq, ctx) {
  const v = ctx.ents.dir;
  const base = { intent: null, ent: 'dir', blank: ['path', 'dest'], locative: true };
  if (v == null) return { rule: 'refused', ...base, note: 'the request refers to a place ("there"), but the previous command names no directory; not guessing' };
  if (isAmbiguous(v)) return { rule: 'refused', ...base, note: `the directory of the previous command (${rawOf(v)}) cannot be read unambiguously; not guessing` };
  // `cd /tmp/x; cat a.txt`: a file came after the directory in the previous command
  const fileNewer = ctx.ents.file != null && (ctx.pos.file ?? 0) >= (ctx.pos.dir ?? 0);
  if (fileNewer) return { rule: 'refused', ...base, note: `the previous command also names a file (${rawOf(ctx.ents.file)}), so "there" is unclear; not guessing` };
  const guardNote = changeGuard('dir', v, fq, ctx);
  return { rule: 'pronoun', ...base, fill: { path: String(v) }, ...(guardNote ? { guarded: true, guardNote } : {}), note: `"dir" from history = ${v}` };
}

/**
 * Why `value` (of entity type `type`, from the previous command) must not be the target of a changing command
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
  // the most recent value of the type is used, or nothing: an ambiguous latest value never falls back
  // to an older one ({ ambiguous: true } tells the caller not to look anywhere else either)
  for (const [ent, slots] of Object.entries(SLOT_FROM_ENT)) {
    if (slots[0] === slot && ctx.ents[ent] != null) return isAmbiguous(ctx.ents[ent]) ? { ent, ambiguous: true } : { ent, value: String(ctx.ents[ent]) };
  }
  if (slot === 'file' && ctx.ents.dir == null && ctx.ents.file != null) return isAmbiguous(ctx.ents.file) ? { ent: 'file', ambiguous: true } : { ent: 'file', value: String(ctx.ents.file) };
  // a type that maps onto this slot exists but is ambiguous (e.g. src <- file/dir)
  if (Object.entries(SLOT_FROM_ENT).some(([ent, slots]) => slots.includes(slot) && isAmbiguous(ctx.ents[ent]))) return { ambiguous: true };
  return null;
}

const SAME_BUT = [/^\s*(?:and\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?,?\s+but\s+(.+)$/, /^\s*(?:a\s+|i\s+)?(?:to\s+)?samo,?\s+ale\s+(.+)$/,
  /^\s*(?:a\s+|i\s+)?tak samo,?\s+ale\s+(.+)$/];
/** "same but only file names" / "to samo ale tylko nazwy plików": modifier for the previous command. */
export function sameBut(query, ctx) {
  if (!ctx?.last) return null;
  const fq = fold(query);
  const lastSlots = Object.fromEntries(Object.entries(ctx.last.slots || {}).filter(([, v]) => !isAmbiguous(v)));
  // slots of the previous command that depend on the shell state ("$DIR"): withheld, never the catalog default
  const blank = Object.keys(ctx.last.slots || {}).filter((k) => isAmbiguous(ctx.last.slots[k]));
  for (const re of SAME_BUT) if (re.test(fq)) return { lastIntent: ctx.last.intent, lastSlots, blank, skipped: !!ctx.last.skipped };
  return null;
}

function intentUses(intent, ent) {
  const it = BY_ID[intent];
  return (SLOT_FROM_ENT[ent] || []).some((k) => k in it.slots);
}
function pickEnt(intent, ent, ctx) {
  if (intentUses(intent, ent)) return ent;
  return (ctx.refOrder || ctx.entOrder).find((e) => intentUses(intent, e)) || ent;
}

exec
/bin/bash -lc "node --input-type=module <<'NODE'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for (const h of ['rm -r /tmp/old','tellsh delete folder /tmp/old','find /tmp/old -type f -iname \\'*.log\\' -delete']) for (const q of ['same for /tmp/a and /tmp/b','same for "'$(pwd)'"','same for "'`pwd`'"','same for \"my data\"','same for /tmp/a"'!'"']) { const r=suggest(q,{env,history:[h]}); console.log(JSON.stringify({h,q,command:r.command,method:r.method,context:r.context,missing:r.missing}));}
NODE" in /workspace/tellsh
 succeeded in 123ms:
{"h":"rm -r /tmp/old","q":"same for /tmp/a and /tmp/b","command":"rm -r /tmp/a","method":"history-rule","context":{"used":true,"commands":1,"rule":"same-for","note":"same as previous delete_dir with path=/tmp/a"},"missing":[]}
{"h":"rm -r /tmp/old","q":"same for $(pwd)","command":null,"method":"history-rule","context":{"used":true,"commands":1,"rule":"refused","note":"the previous command (delete_dir) has nothing that \"$(pwd)\" could replace; not guessing"},"missing":[]}
{"h":"rm -r /tmp/old","q":"same for `pwd`","command":null,"method":"history-rule","context":{"used":true,"commands":1,"rule":"refused","note":"the previous command (delete_dir) has nothing that \"`pwd`\" could replace; not guessing"},"missing":[]}
{"h":"rm -r /tmp/old","q":"same for \"my data\"","command":null,"method":"history-rule","context":{"used":true,"commands":1,"rule":"refused","note":"the previous command (delete_dir) has nothing that \"\"my data\"\" could replace; not guessing"},"missing":[]}
{"h":"rm -r /tmp/old","q":"same for /tmp/a!","command":"rm -r <PATH>","method":"history-rule","context":{"used":true,"commands":1,"rule":"same-for","note":"same as previous delete_dir with path=/tmp/a"},"missing":["path"]}
{"h":"tellsh delete folder /tmp/old","q":"same for /tmp/a and /tmp/b","command":"rm -r /tmp/a","method":"history-rule","context":{"used":true,"commands":1,"rule":"same-for","note":"same as previous delete_dir with path=/tmp/a"},"missing":[]}
{"h":"tellsh delete folder /tmp/old","q":"same for $(pwd)","command":null,"method":"history-rule","context":{"used":true,"commands":1,"rule":"refused","note":"the previous command (delete_dir) has nothing that \"$(pwd)\" could replace; not guessing"},"missing":[]}
{"h":"tellsh delete folder /tmp/old","q":"same for `pwd`","command":null,"method":"history-rule","context":{"used":true,"commands":1,"rule":"refused","note":"the previous command (delete_dir) has nothing that \"`pwd`\" could replace; not guessing"},"missing":[]}
{"h":"tellsh delete folder /tmp/old","q":"same for \"my data\"","command":null,"method":"history-rule","context":{"used":true,"commands":1,"rule":"refused","note":"the previous command (delete_dir) has nothing that \"\"my data\"\" could replace; not guessing"},"missing":[]}
{"h":"tellsh delete folder /tmp/old","q":"same for /tmp/a!","command":"rm -r <PATH>","method":"history-rule","context":{"used":true,"commands":1,"rule":"same-for","note":"same as previous delete_dir with path=/tmp/a"},"missing":["path"]}
{"h":"find /tmp/old -type f -iname '*.log' -delete","q":"same for /tmp/a and /tmp/b","command":"find /tmp/a -type f -iname '*.log' -delete","method":"history-rule","context":{"used":true,"commands":1,"rule":"same-for","note":"same as previous delete_by_ext with path=/tmp/a"},"missing":[]}
{"h":"find /tmp/old -type f -iname '*.log' -delete","q":"same for $(pwd)","command":null,"method":"history-rule","context":{"used":true,"commands":1,"rule":"refused","note":"the previous command (delete_by_ext) has nothing that \"$(pwd)\" could replace; not guessing"},"missing":[]}
{"h":"find /tmp/old -type f -iname '*.log' -delete","q":"same for `pwd`","command":null,"method":"history-rule","context":{"used":true,"commands":1,"rule":"refused","note":"the previous command (delete_by_ext) has nothing that \"`pwd`\" could replace; not guessing"},"missing":[]}
{"h":"find /tmp/old -type f -iname '*.log' -delete","q":"same for \"my data\"","command":null,"method":"history-rule","context":{"used":true,"commands":1,"rule":"refused","note":"the previous command (delete_by_ext) has nothing that \"\"my data\"\" could replace; not guessing"},"missing":[]}
{"h":"find /tmp/old -type f -iname '*.log' -delete","q":"same for /tmp/a!","command":"find <PATH> -type f -iname '*.log' -delete","method":"history-rule","context":{"used":true,"commands":1,"rule":"same-for","note":"same as previous delete_by_ext with path=/tmp/a"},"missing":["path"]}

exec
/bin/bash -lc "sed -n '405,538p' src/history.js && sed -n '600,745p' src/history.js" in /workspace/tellsh
 succeeded in 0ms:
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
  let searchDir = false;
  let listDir = false;
  const at = {};
  const listed = {}; // entity type -> index of the newest segment that listed values of that type
  // segments from..to-1 are connected by pipes only
  const samePipe = (from, to) => from >= 0 && split.segments.slice(from, to).every((s) => s.sep === '|');
  const firstWord = (s) => unwrap(s.words.filter((x) => !REDIR_TARGET_OP.test(x) && !REDIR_DUP_OP.test(x)))[0];
  split.segments.forEach(({ words }, segIdx) => {
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
    if (w.length) segmentEnts(w, e, setIntent, split, k, segIdx, firstWord);
    if (redirTarget != null) e.file = redirTarget;
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
      staleRelative(ents, null);
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
    if (segIntentAt < cdAt) staleRelative({}, slots);
    // `kill 1111; ls newdir`: another command ran after the one tellsh could repeat
    if (split.segments.slice(segIntentAt, -1).some((s) => s.sep !== '|')) intentStale = true;
  }
  if (Object.values(slots).some(isAmbiguous)) ambiguous = true;
  return { line: t, intent, slots, ents, at, ambiguous, ...(searchDir && ents.dir != null ? { searchDir: true } : {}),
    ...(listDir && !searchDir && ents.dir != null ? { listDir: true } : {}), ...(cdAt >= 0 ? { cd: true } : {}),
    ...(intentStale ? { intentStale: true } : {}), listed,
    // the dir is the `cd` target (`cdFollowed`: another segment ran after the cd)
    ...(cdAt >= 0 && at.dir === cdAt ? { cdDir: true, cdFollowed: cdAt < split.segments.length - 1 } : {}) };
}

// Listings: commands that print many values of an entity type (`ls`, `find`, `ps aux`, `docker ps`, `git branch`).
// After one, "it"/"them" may mean any of the printed values, so an older value of that type is not a safe
// target for a changing command.
const FS_LISTERS = new Set(['ls', 'tree', 'dir', 'gci', 'get-childitem', 'll', 'la', 'find', 'fd', 'fdfind', 'locate', 'mlocate', 'plocate',
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
      const b = nonFlags[nonFlags.length - 1];
      if (b && b !== sub && b !== '.' && !isGlob(b) && !b.startsWith('-')) e.branch = b;
    } else if (sub === 'push' && nonFlags.length >= 2) e.branch = nonFlags[nonFlags.length - 1];
    else if (sub === 'clone' && nonFlags[1]) e.url = nonFlags[1];
    else if (['add', 'diff', 'blame', 'restore', 'rm', 'log'].includes(sub) && nonFlags[1] && nonFlags[1] !== '.') e.file = nonFlags[nonFlags.length - 1];
  } else if (['ssh', 'ping', 'dig', 'nslookup', 'traceroute', 'mtr', 'host', 'telnet', 'nc'].includes(head)) {
    const h = nonFlags.find((a) => /[\w-]+\.[\w.-]+|^[\w-]+@/.test(a)) || nonFlags[0];
    if (h) e.host = h;
  } else if (['curl', 'wget', 'http'].includes(head)) {
    const u = args.find((a) => /^https?:\/\//.test(a));
    if (u) {
      e.url = u;
      const base = u.replace(/[?#].*$/, '').split('/').pop();
      const saves = head === 'wget' || args.some((a) => /^-\w*O/.test(a));
      if (saves && /\.\w{1,5}$/.test(base)) e.file = base;
    }
  } else if (head === 'rm' || head === 'trash' || head === 'rmdir') {
    const p = oneOf(nonFlags);
    if (p) e[args.some((a) => /^-\w*r/i.test(a)) || head === 'rmdir' ? 'dir' : 'file'] = p;
  } else if (head === 'cp' || head === 'mv' || head === 'ln') {
    const { pos, opts } = parseArgs(args, VALUE_OPTS[head]);
    const tdir = opts['-t'] ?? opts['--target-directory'];
    if (tdir != null) destEnts(pos.length === 1 ? pos : [...pos, ''], String(tdir) + '/', e);
    else if (pos.length >= 2) destEnts(pos.slice(0, -1), pos[pos.length - 1], e);
  } else if (head === 'tar' || head === 'zip') {
    const a = nonFlags.find((x) => /\.(tar(\.\w+)?|tgz|zip)$/.test(x));
    if (a) e.file = a;
  } else if (FILE_HEADS.has(head)) {
    // operands: not a chmod mode, a chown owner, a count (`head -n 5 a.txt`), or the arguments of a script
    let ops = nonFlags.filter((a) => !/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$|^\d+$/.test(a));
    if (['chown'].includes(head)) ops = ops.slice(1);
    if (['python', 'python3', 'node', 'bash', 'sh', 'source'].includes(head)) ops = ops.slice(0, 1);
    const p = oneOf(ops);
    if (p) e[/\/$/.test(rawOf(p)) ? 'dir' : 'file'] = p;
  } else if (DIR_HEADS.has(head)) {
    // find ROOT -name ...: the search root; other heads: the one directory argument (`ls /a /b`: ambiguous)
    // (find's root is the operands before its first expression word: `find -name "*.o"` has none)
    const p = head === 'find' ? args.slice(0, (args.findIndex((a) => /^[-(!]/.test(a)) + 1 || args.length + 1) - 1)[0] : oneOf(nonFlags.filter((a) => !isGlob(a) && !/^\d+$/.test(a)));
    if (p) {
      e.dir = p;
      if (head === 'find') e.searchDir = true;
      // `du DIR` / `du -d 1 DIR | sort -rh` lists the entries of DIR (`du -sh DIR` is DIR itself)
      else if (['ls', 'tree', 'ncdu'].includes(head) || (head === 'du' && !args.some((a) => /^-[a-zA-Z]*s|^--summarize$/.test(a)))) e.listDir = true;
    }
    // `ls`, `ls *.pdf`: the working directory (a glob selects some of its entries)
    else if (['ls', 'tree'].includes(head)) e.listCwd = nonFlags.some(isGlob) ? 'search' : 'list';
  } else if (!INERT_HEADS.has(head.toLowerCase())) {
    // unknown command (or unknown cmdlet) naming a path: we cannot tell what it did with it, so an
    // older file/dir must not be picked up by "it"
    const p = nonFlags.find((a) => PATHLIKE.test(rawOf(a)) && !/^\w+:\/\//.test(rawOf(a)));
    if (p) e[typeByExt(p)] = AMB + rawOf(p);
  }
}


exec
/bin/bash -lc "cat scripts/hybrid/sets.js scripts/hybrid/dump_cascade.js && sed -n '1,180p' scripts/hybrid/eval_hybrid.js && cat src/rerank/encoder.js" in /workspace/tellsh
 succeeded in 0ms:
// Evaluation sets shared by scripts/hybrid/dump_cascade.js (A's top-k for the Python rerankers) and eval_hybrid.js.
// Every set is a list of {text, intent|null, lang, shell, os, ...}. The real-usage sets come from the PRIVATE
// build/real/rows.jsonl (scripts/real/prepare_real.js) and are empty when it is missing.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { silverSpans, relex, mulberry32 } from '../lib/silver.js';

const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);

// intents added in v0.4 (from real command usage)
export const NEW_INTENTS = new Set(['print_line_range', 'ssh_port_forward', 'npm_run_script', 'npm_install', 'npm_install_global',
  'pip_install', 'activate_venv', 'tool_version', 'cli_help', 'wrangler_deploy', 'wrangler_dev', 'wrangler_tail',
  'wrangler_secret_put', 'wrangler_login', 'wrangler_whoami', 'gh_auth_status', 'gh_auth_login', 'gh_pr_list', 'gh_pr_view',
  'gh_pr_create', 'gh_pr_checks', 'gh_pr_merge', 'gh_run_list', 'gh_run_view']);

// their tool families (lets the v0.3 code, which does not know them, be scored on stage 1 too)
export const NEW_FAMILY = Object.fromEntries([...NEW_INTENTS].map((i) => [i,
  i === 'print_line_range' ? 'head' : i === 'ssh_port_forward' ? 'ssh' : /^npm_/.test(i) ? 'npm' : /^(pip_install|activate_venv)$/.test(i) ? 'python'
    : /^(tool_version|cli_help)$/.test(i) ? 'cli' : i.split('_')[0]]));

export function evalSets(ROOT) {
  const real = readJsonl(join(ROOT, 'build/real/rows.jsonl')).filter((r) => r.split === 'eval');
  const v04 = readDir(join(ROOT, 'data/eval_v04'));
  return {
    eval: () => readDir(join(ROOT, 'data/eval')).map((r) => ({ ...r, shell: 'bash', os: 'linux' })),
    shell: () => readJsonl(join(ROOT, 'data/shell/eval.jsonl')),
    blind: () => readDir(join(ROOT, 'data/hybrid/blind')).filter((r) => r.intent),
    blind_ood: () => readDir(join(ROOT, 'data/hybrid/blind')).filter((r) => !r.intent),
    blind3: () => readJsonl(join(ROOT, 'data/blind/intents.jsonl')),
    blind3_ood: () => readJsonl(join(ROOT, 'data/blind/ood.jsonl')),
    ood: () => readJsonl(join(ROOT, 'data/ood_eval.jsonl')),
    devtools: () => v04.filter((r) => r.intent),
    real: () => real.filter((r) => r.intent),
    real_ooc: () => real.filter((r) => !r.intent),
    // relexicalised data/eval: same construction and seed as scripts/eval.js section 4
    relex: () => {
      const rng = mulberry32(7);
      const out = [];
      for (const r of readDir(join(ROOT, 'data/eval'))) {
        const { spans } = silverSpans(r.text, r.intent);
        if (!spans.length) continue;
        const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'eval', keepProb: 0 });
        out.push({ text: rx.text, intent: r.intent, lang: r.lang, shell: 'bash', os: 'linux' });
      }
      return out;
    },
  };
}
#!/usr/bin/env node
// Dump A's (linear cascade) top-k candidates for the hybrid datasets, used to train/evaluate the rerankers in Python.
//   node scripts/hybrid/dump_cascade.js [--model build/adev/model/model.bin] [--tag adev]
// -> build/hybrid/cands_<tag>.jsonl  {set, i, text, lang, shell, os, intent, tool, conf, topTool, topToolP, pNone, cands:[{intent,tool,p}]}
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadModel, getModel } from '../../src/model.js';
import { cascade } from '../../src/cascade.js';
import { envFeatures } from '../../src/env.js';
import { evalSets } from './sets.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split('=')[1] ?? d;
const model = arg('model') ? loadModel(arg('model')) : getModel();
const tag = arg('tag', 'ship');
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
export const SETS = {
  train: () => readJsonl(join(ROOT, 'build/hybrid/train.jsonl')).filter((r) => r.split === 'train' && r.intent && r.kind !== 'typo'),
  dev: () => readJsonl(join(ROOT, 'build/hybrid/train.jsonl')).filter((r) => r.split === 'dev'),
  ...evalSets(ROOT),
};
const ONLY = arg('sets') ? arg('sets').split(',') : null;
const out = [];
for (const [set, f] of Object.entries(SETS)) {
  if (ONLY && !ONLY.includes(set)) continue;
  f().forEach((r, i) => {
    const c = cascade(r.text, { model, extras: envFeatures({ shell: r.shell || 'bash', os: r.os || 'linux' }), top: 8 });
    out.push({ set, i, text: r.text, lang: r.lang, shell: r.shell || 'bash', os: r.os || 'linux', intent: r.intent || null, tool: r.tool || null,
      conf: c.confidence, topTool: c.topTool, topToolP: c.topToolP, pNone: c.pNone,
      cands: c.top.map((t) => ({ intent: t.intent, tool: t.tool, p: +t.p.toFixed(5) })) });
  });
}
writeFileSync(join(ROOT, `build/hybrid/cands_${tag}.jsonl`), out.map((o) => JSON.stringify(o)).join('\n') + '\n');
const c = {};
for (const o of out) { c[o.set] ??= [0, 0, 0]; if (o.intent) { c[o.set][0]++; if (o.cands[0]?.intent === o.intent) c[o.set][1]++; if (o.cands.slice(0, 5).some((x) => x.intent === o.intent)) c[o.set][2]++; } }
console.log(tag, Object.entries(c).map(([k, [n, a, b]]) => `${k}: n=${n} top1=${(100 * a / n).toFixed(1)} top5=${(100 * b / n).toFixed(1)}`).join(' | '));
#!/usr/bin/env node
// Hybrid benchmark: A (linear cascade), B (encoder), C (tiny-LM rerank of A's top-5), A+B, A+C.
//
//   node scripts/hybrid/eval_hybrid.js --calibrate   grid-search the policies on the TRAINING dev split with A_dev
//                                                    (build/adev/model/model.bin, never saw the dev rows) -> build/hybrid/policy.json
//   node scripts/hybrid/eval_hybrid.js               evaluate every system on the held-out sets -> build/hybrid/results.json,
//                                                    tables into HYBRID.md (<!-- hybrid:start/end -->)
// C needs cached letter logits from Python (build/hybrid/lm_<cands>.jsonl, scripts/hybrid/lm_rerank.py score);
// rows without a cached score are reported as missing (C alone is evaluated on the scored rows only).
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getModel, loadModel } from '../../src/model.js';
import { cascade } from '../../src/cascade.js';
import { suggest, resolveWithTagger } from '../../src/pipeline.js';
import { buildCommand, resolveSlots, finalizeSlots } from '../../src/fill.js';
import { exFromSpans, normPath, normExt, normNum } from '../../src/tagger.js';
import { extractSlots } from '../../src/slots.js';
import { BY_ID } from '../../src/catalog.js';
import { FAMILY_OF, NONE, SLOT_TAG } from '../../src/tools.js';
import { envFeatures } from '../../src/env.js';
import { normalize } from '../../src/features.js';
import { silverSpans, relex, mulberry32 } from '../lib/silver.js';
import { Encoder } from '../../src/rerank/encoder.js';
import { POLICY, rerank, suggestHybrid } from '../../src/rerank/hybrid.js';
import { evalSets, NEW_INTENTS, NEW_FAMILY } from './sets.js';
import { sameCmd } from '../lib/cmdnorm.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const argv = process.argv.slice(2);
const has = (k) => argv.includes(`--${k}`);
const arg = (k, d) => argv.find((a) => a.startsWith(`--${k}=`))?.split('=').slice(1).join('=') ?? d;
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);
const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
const key = (text, env) => `${env.shell}|${env.os}|${text}`;
const envOf = (r) => ({ shell: r.shell || 'bash', os: r.os || 'linux', coreutils: (r.os || 'linux') === 'darwin' ? 'bsd' : 'gnu' });
const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const TAG = arg('tag', ''); // separate policy/results files per LM variant (e.g. --tag=_ft)

// ---------------------------------------------------------------- model outputs (cached)
const encoder = has('no-b') ? null : await Encoder.load({ dir: arg('enc'), threads: +arg('threads', 1) });
if (!encoder && !has('no-b')) console.error('warning: encoder bundle not found; B systems skipped');
const B = new Map();
async function bOut(text, env) {
  const k = key(text, env);
  if (!B.has(k)) B.set(k, await encoder.infer(text, env));
  return B.get(k);
}
const LM = new Map();
const LM_SAMPLE = new Set(); // uniform random sample scored for "C alone" (deferred rows are scored in addition)
for (const f of (arg('lm', '') || '').split(',').filter(Boolean)) {
  const cands = readJsonl(join(ROOT, `build/hybrid/cands_${f.split(':')[0]}.jsonl`));
  const byId = new Map(cands.map((c) => [`${c.set}:${c.i}`, c]));
  for (const s of readJsonl(join(ROOT, `build/hybrid/lm_${f.replace(':', '_')}.jsonl`))) {
    const c = byId.get(`${s.set}:${s.i}`);
    if (!c) continue;
    const m = Math.max(...s.logits);
    const e = s.logits.map((v) => Math.exp(v - m));
    const z = e.reduce((a, b) => a + b, 0);
    LM.set(key(c.text, { shell: c.shell, os: c.os }), Object.fromEntries(s.cands.map((ci, j) => [ci, e[j] / z])));
    if (s.sample) LM_SAMPLE.add(key(c.text, { shell: c.shell, os: c.os }));
  }
}
const lmFn = async (text, env) => LM.get(key(text, env)) || null;

// ---------------------------------------------------------------- calibration on the training dev split
function decide(c, sys, P, bo, lo, thr) {
  if (sys === 'A') return c;
  if (/B/.test(sys)) return bo ? rerank(c, bo.intents, P, { thr, pNone: bo.pNone }) : c;
  return lo ? rerank(c, lo, P, { thr }) : c;
}
const SYSTEMS = ['A', 'B', 'C', 'A+B', 'A+C', 'A+B-safe', 'A+C-safe'];
if (has('calibrate')) {
  const adev = loadModel(join(ROOT, 'build/adev/model/model.bin'));
  const thr = adev.thresholds.accept;
  const dev = readJsonl(join(ROOT, 'build/hybrid/train.jsonl')).filter((r) => r.split === 'dev' && (r.intent || r.tool === NONE));
  const rows = [];
  for (const r of dev) {
    const env = envOf(r);
    const c = cascade(r.text, { model: adev, extras: envFeatures(env), top: 8 });
    rows.push({ r, c, bo: encoder ? await bOut(r.text, env) : null, lo: LM.get(key(r.text, env)) || null });
  }
  const score = (sys, P) => {
    let ok = 0; let n = 0; let deferred = 0; let ood = 0; let oodRej = 0; let ind = 0; let indOk = 0;
    for (const { r, c, bo, lo } of rows) {
      if (/C/.test(sys) && !lo && c.confidence < P.tau) continue;
      const d = decide(c, sys, P, bo, lo, thr);
      const und = d.confidence >= thr;
      n++;
      if (d.reranked !== undefined || c.confidence < P.tau) deferred++;
      ok += r.intent ? (und && d.intent === r.intent ? 1 : 0) : (und ? 0 : 1);
      if (r.intent) { ind++; if (und && d.intent === r.intent) indOk++; } else { ood++; if (!und) oodRej++; }
    }
    return { acc: ok / n, n, deferred: deferred / n, indAcc: indOk / ind, oodRej: oodRej / ood, nOod: ood };
  };
  const grid = (sys) => {
    // C was scored only where A_dev conf < 0.9 (cost), so A+C cannot defer above that
    const taus = sys === 'B' || sys === 'C' ? [Infinity] : /A\+C/.test(sys) ? [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9] : [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 0.98, 0.995];
    const alphas = sys === 'B' || sys === 'C' ? [0] : [0, 0.25, 0.5, 0.75];
    const ks = sys === 'B' ? [0] : [3, 5];
    const accepts = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];
    const nones = /B/.test(sys) ? [0.1, 0.2, 0.3, 0.5, 0.7, 1.01] : [1.01];
    let best = null;
    // constraint: OOD rejection on dev may drop at most ~2 of the 48 OOD rows below A_dev's (added after the first
    // held-out run showed the unconstrained policies answering almost every OOD request; see HYBRID.md)
    const oodFloor = out.A.oodRej - 0.045;
    for (const tau of taus) for (const alpha of alphas) for (const k of ks) for (const accept of accepts) for (const none of nones) for (const keepNone of [false, true]) {
      const P = { tau, alpha, k, accept, none, keepNone, tagger: POLICY[sys]?.tagger, ...(/safe/.test(sys) ? { rescue: false } : {}) };
      const s = score(sys, P);
      if (s.oodRej < oodFloor) continue;
      // ties (within 0.05 pt) -> prefer the policy that defers less (faster)
      if (!best || s.acc > best.s.acc + 5e-4 || (Math.abs(s.acc - best.s.acc) <= 5e-4 && s.deferred < best.s.deferred)) best = { P, s };
    }
    return best;
  };
  const out = { thrAdev: thr, n: rows.length, A: score('A', { tau: 0 }) };
  for (const sys of ['B', 'A+B', 'C', 'A+C', 'A+B-safe', 'A+C-safe']) {
    if (/B/.test(sys) && !encoder) continue;
    if (/C/.test(sys) && !LM.size) continue;
    out[sys] = grid(sys);
  }
  writeFileSync(join(ROOT, `build/hybrid/policy${TAG}.json`), JSON.stringify(out, (k, v) => (v === Infinity ? 'Infinity' : v), 1));
  console.log(JSON.stringify(out, (k, v) => (v === Infinity ? 'Infinity' : v)));
  process.exit(0);
}

// ---------------------------------------------------------------- evaluation
const cal = existsSync(join(ROOT, `build/hybrid/policy${TAG}.json`)) ? JSON.parse(readFileSync(join(ROOT, `build/hybrid/policy${TAG}.json`), 'utf8')) : {};
const policyOf = (sys) => {
  const p = cal[sys]?.P ? { ...cal[sys].P } : { ...POLICY[sys] };
  if (p.tau === 'Infinity') p.tau = Infinity;
  if (arg('tagger')) p.tagger = arg('tagger');
  return p;
};
const model = getModel();
const thr = model.thresholds.accept;
const ONLY = arg('systems') ? arg('systems').split(',') : null;
const active = SYSTEMS.filter((s) => !ONLY || ONLY.includes(s)).filter((s) => (/B/.test(s) ? !!encoder : /C/.test(s) ? LM.size > 0 : true));

async function run(sys, text, env, extra = {}) {
  if (sys === 'A') return suggest(text, { env, model, compose: 'off', ...extra });
  const P = policyOf(sys);
  if (/B/.test(sys)) await bOut(text, env);
  const r = await suggestHybrid(text, { env, model, compose: 'off', system: sys, policy: P, encoder: encoder && { infer: bOut }, lm: lmFn, ...extra });
  return r;
}

const SET = evalSets(ROOT);
const trainTexts = new Set(readJsonl(join(ROOT, 'build/hybrid/train.jsonl')).map((r) => normalize(r.text)));
// texts the shipped A model may have trained on: data/intents + data/shell/train
const aTrain = new Set([...readDir(join(ROOT, 'data/intents')), ...readJsonl(join(ROOT, 'data/shell/train.jsonl'))].map((r) => normalize(r.text)));
const blind = SET.blind().map((r) => ({ ...r, novel: !aTrain.has(normalize(r.text)) && !trainTexts.has(normalize(r.text)) }));
const blindOod = SET.blind_ood();
const evalRows = SET.eval();
const shellEval = SET.shell();
const oodEval = SET.ood();
const hist = readJsonl(join(ROOT, 'data/history/eval.jsonl'));
const gold = readJsonl(join(ROOT, 'data/slots/gold.jsonl'));
// private real-usage eval split (scripts/real/prepare_real.js; never committed), held out by command group
const realRows = has('no-private') ? [] : SET.real();
const realOoc = has('no-private') ? [] : SET.real_ooc();
// gold tool family (intents unknown to this tree's catalog, e.g. when evaluating the v0.3 code: NEW_FAMILY)
const famOf = (i) => FAMILY_OF[i] || NEW_FAMILY[i];

const R = {};
const md = [];
const t0 = Date.now();

// 1. classification (intent decided by the full pipeline incl. reject)
async function clsSet(name, rows) {
  R[name] = {};
  for (const sys of active) {
    const S = {};
    const bump = (k, f) => { S[k] ??= { n: 0, tool: 0, intent: 0, ans: 0, ansOk: 0, deferred: 0, missing: 0 }; S[k][f]++; };
    for (const r of rows) {
      const env = envOf(r);
      if (sys === 'C' && !LM_SAMPLE.has(key(r.text, env))) continue;
      const s = await run(sys, r.text, env);
      if (/C/.test(sys) && s.hybrid?.deferred && !LM.has(key(r.text, env))) { bump('all', 'missing'); continue; }
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

codex
I found a calibration gap: the shadow linear model excludes hybrid dev rows from the intent corpus, but the out-of-domain loader appears to admit them. I’m measuring the overlap and continuing runtime probes without executing generated commands.
exec
/bin/bash -lc "rg -n 'writeFile|mkdir|mkdtemp|execSync|spawnSync|rmSync|createWrite|copyFile|writeSync' test/*.js && rg --files build/adev build/hybrid | head -50" in /workspace/tellsh
 succeeded in 0ms:
test/regressions4.test.js:188:  const { spawnSync } = await import('node:child_process');
test/regressions4.test.js:189:  const { mkdtempSync, writeFileSync } = await import('node:fs');
test/regressions4.test.js:192:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r4-'));
test/regressions4.test.js:194:  writeFileSync(hist, 'rm -r old\nls newdir\n');
test/regressions4.test.js:195:  const r = spawnSync(process.execPath, ['bin/tellsh.js', '--dry-run', `--history=${hist}`, 'same', 'for', '/srv/current'], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/shells.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/shells.test.js:12:const has = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
test/shells.test.js:51:      const res = spawnSync(checker, args, { encoding: 'utf8' });
test/shells.test.js:65:    if (has('fish')) { const res = spawnSync('fish', ['-n', '-c', r.command]); if (res.status !== 0) bad.push(it.id); }
test/slot-cases.js:57:  ['mkdir', 'create folder src/components/ui', 'mkdir -p src/components/ui'],
test/regressions9.test.js:9:import { spawnSync } from 'node:child_process';
test/regressions9.test.js:10:import { mkdtempSync, mkdirSync, writeFileSync, readdirSync, existsSync, rmSync } from 'node:fs';
test/regressions9.test.js:29:const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/regressions9.test.js:66:  for (const h of ['touch a.txt b.txt', 'rm -i a.txt b.txt', 'cat a.txt b.txt', 'mkdir /tmp/a /tmp/b']) {
test/regressions9.test.js:131:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r8-'));
test/regressions9.test.js:134:  const fetch = (from, to) => spawnSync(process.execPath, [join(ROOT, 'scripts/hybrid/fetch_model.js'), '--from', from, '--to', to], { encoding: 'utf8' });
test/regressions9.test.js:137:    mkdirSync(src, { recursive: true });
test/regressions9.test.js:138:    for (const f of FILES) writeFileSync(join(src, f), f);
test/regressions9.test.js:139:    writeFileSync(join(dir, 'src', 'evil'), 'payload');
test/regressions9.test.js:143:      writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files: { ...files, ...extra } }));
test/regressions9.test.js:152:    writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files: { ...files, 'vocab.json': sha(Buffer.from('other')) } }));
test/regressions9.test.js:156:    writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files }));
test/regressions9.test.js:160:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions3-history.test.js:40:  assert.equal(run('delete it', ['cat old.txt; mkdir newdir']).command, 'rm -r newdir');
test/regressions3-history.test.js:42:  assert.equal(run('delete it', ['mkdir olddir; cat new.txt']).command, 'rm new.txt');
test/regressions3-history.test.js:60:  assert.equal(run('remove it', ['mkdir /srv/remove-backups', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:61:  assert.equal(run('delete it', ['mkdir /srv/delete-me', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:64:  assert.equal(run('usuń to', ['mkdir /srv/usun-stare', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:68:  const old = run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']);
test/regressions2.test.js:6:import { spawnSync } from 'node:child_process';
test/regressions2.test.js:8:import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
test/regressions2.test.js:25:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions2.test.js:171:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r2-'));
test/regressions2.test.js:174:    writeFileSync(hf, 'cat secret.txt\n');
test/regressions2.test.js:178:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions7.test.js:73:  assert.equal(run('copy notes.txt to it', ['mkdir /tmp/n']).command, 'cp -ri notes.txt /tmp/n');
test/regressions7.test.js:127:    `awk 'BEGIN{system("rm -rf /")}'`, `node -e "require('fs').rmSync('/',{recursive:true})"`, 'chmod 000 /', 'chmod 000 /etc',
test/regressions6.test.js:45:  assert.equal(run('delete it', ['mkdir /tmp/new']).command, 'rm -r /tmp/new');
test/regressions6.test.js:78:  refused(run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']), '<PATH>', 'hint');
test/regressions6.test.js:81:  const ctx = buildContext(['mkdir /a', 'mkdir /b']);
test/regressions6.test.js:157:  assert.equal(run('copy notes.txt to it', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
test/regressions6.test.js:158:  assert.equal(run('skopiuj notes.txt do niego', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
test/regressions6.test.js:159:  assert.equal(run('move report.pdf into that folder', ['mkdir /srv/x']).command, 'mv -i report.pdf /srv/x');
test/pipeline.test.js:4:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/pipeline.test.js:93:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-hist-'));
test/pipeline.test.js:96:    writeFileSync(f, Array.from({ length: 50 }, (_, i) => `: 17000000${i}:0;echo ${i}`).join('\n') + '\n');
test/pipeline.test.js:100:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions8.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions8.test.js:9:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/regressions8.test.js:22:const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/regressions8.test.js:53:  const ctx = buildContext(['cat a.txt', 'docker logs web', 'mkdir /tmp/b']);
test/regressions8.test.js:65:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r7-'));
test/regressions8.test.js:68:    writeFileSync(f, 'cat old.txt\nls\ncat new.txt\n');
test/regressions8.test.js:72:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions8.test.js:107:  const c = run('delete it', [`mkdir ${long}`]);
test/regressions8.test.js:193:test('minor: a NUL byte never reaches spawnSync', () => {
test/compose.test.js:47:  const { spawnSync } = await import('node:child_process');
test/compose.test.js:48:  const r = spawnSync('sh', ['-c', 'node bin/tellsh.js --dry-run show disk usage | head -c 1 >/dev/null; echo $?'], { encoding: 'utf8' });
test/regressions5.test.js:109:  assert.equal(run('move it to /tmp/old', ['mkdir /tmp/build']).command, 'mv -i /tmp/build /tmp/old');
test/cli.test.js:3:import { spawnSync } from 'node:child_process';
test/cli.test.js:5:import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/cli.test.js:10:const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/cli.test.js:94:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-cli-'));
test/cli.test.js:97:    writeFileSync(f, 'echo SECRET_TOKEN=abc123\ncat notes.txt\n');
test/cli.test.js:103:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/regressions.test.js:7:import { mkdtempSync, writeFileSync, readFileSync, rmSync, chmodSync } from 'node:fs';
test/regressions.test.js:23:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions.test.js:27:const tmp = () => mkdtempSync(join(tmpdir(), 'tellsh-reg-'));
test/regressions.test.js:52:    assert.equal(spawnSync('bash', ['-n', '-c', command]).status, 0, command);
test/regressions.test.js:66:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:192:    writeFileSync(fake, `#!/bin/sh\nprintf '%s\\n' "$@" > '${out}'\nprintf '%s' "$TELLSH_PARSE_SRC" > '${out}.src'\nexit 0\n`);
test/regressions.test.js:198:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:279:    writeFileSync(join(dir, 'notes.txt'), 'hello\n');
test/regressions.test.js:280:    writeFileSync(f, 'ls\ncat notes.txt\n');
test/regressions.test.js:286:  } finally { rmSync(dir, { recursive: true, force: true }); }
build/hybrid/run_enc.sh
build/hybrid/policy.json
build/hybrid/train_enc.log
build/hybrid/results_v04c.json
build/hybrid/results_v04b.json
build/hybrid/lm_ship_qwenft.jsonl
build/hybrid/lm_score_after.log
build/hybrid/train.jsonl
build/hybrid/lm_score_dev.log
build/hybrid/results.json
build/hybrid/eval_after_ft.log
build/hybrid/lm_adev_qwenft.jsonl
build/hybrid/cands_ship.jsonl
build/hybrid/results_ft.json
build/hybrid/cands_adev.jsonl
build/adev/test/regressions6.test.js
build/adev/test/slot-cases.js
build/adev/test/regressions3-render.test.js
build/adev/test/fixtures/parity.json
build/adev/test/regressions.test.js
build/adev/test/devtools.test.js
build/adev/test/regressions5.test.js
build/adev/test/parity.test.js
build/adev/test/shells.test.js
build/adev/test/regressions7.test.js
build/adev/test/hybrid.test.js
build/adev/test/regressions3-history.test.js
build/adev/test/pipeline.test.js
build/adev/test/danger.test.js
build/adev/test/regressions2.test.js
build/adev/test/regressions4.test.js
build/adev/test/cli.test.js
build/adev/test/regressions3.test.js
build/adev/test/compose.test.js
build/adev/test/slots.test.js
build/adev/test/templates.test.js
build/hybrid/enc-v04-leak/final.pt
build/hybrid/enc-v04-leak/ckpt.pt
build/hybrid/enc-v04-leak/tokenizer.json
build/hybrid/enc-v04-leak/train_info.json
build/hybrid/enc-v04-leak/tokenizer_config.json
build/hybrid/results_v04a.json
build/hybrid/enc/final.pt
build/hybrid/enc/ckpt.pt
build/hybrid/enc/tokenizer.json
build/hybrid/enc/train_info.json
build/hybrid/enc/tokenizer_config.json
build/hybrid/eval_after.log
build/adev/model/compose_explained.json
build/adev/model/model.bin

exec
/bin/bash -lc "node --input-type=module <<'NODE'
import {readFileSync,existsSync} from 'node:fs';
import {isDev} from './scripts/hybrid/export_data.js';
import {exclusionIndex} from './scripts/lib/heldout.js';
const root=process.cwd(), x=exclusionIndex(root); const read=p=>existsSync(p)?readFileSync(p,'utf8').trim().split('\\n').map(JSON.parse):[];
const rows=read('data/ood.jsonl').filter(r=>isDev(r.text)&&"'!x.has(r.text));console.log('"'OOD dev originals also admitted by A_dev:',rows.length, rows.slice(0,5));
const dev=read('build/hybrid/train.jsonl').filter(r=>r.split==='dev'&&r.tool==='__none__');console.log('Exported OOD dev rows:',dev.length);
const a=read('build/adev/build/cls.jsonl'); console.log('A_dev class rows',a.length);
NODE" in /workspace/tellsh
 succeeded in 1450ms:
OOD dev originals also admitted by A_dev: 23 [
  { text: 'recommend a good movie', lang: 'en' },
  { text: 'how tall is mount everest', lang: 'en' },
  { text: 'zamów pizzę', lang: 'pl' },
  { text: 'zarezerwuj lot do londynu', lang: 'pl' },
  { text: 'cześć', lang: 'pl' }
]
Exported OOD dev rows: 46
A_dev class rows 39593

exec
/bin/bash -lc 'node --test test/danger.test.js test/devtools.test.js test/hybrid.test.js test/parity.test.js test/slots.test.js test/templates.test.js test/compose.test.js test/regressions3.test.js test/regressions3-history.test.js test/regressions3-render.test.js test/regressions5.test.js test/regressions6.test.js test/regressions7.test.js' in /workspace/tellsh
 exited 1 in 1012ms:
TAP version 13
# Subtest: /workspace/tellsh/test/compose.test.js
ok 1 - /workspace/tellsh/test/compose.test.js
  ---
  duration_ms: 508.218677
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 2 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 196.585965
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 3 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 261.717442
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 4 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 238.818474
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 5 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 192.574205
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 6 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 329.834807
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 7 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 387.108212
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 8 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 355.656535
  ...
# Subtest: /workspace/tellsh/test/regressions5.test.js
ok 9 - /workspace/tellsh/test/regressions5.test.js
  ---
  duration_ms: 722.672595
  ...
# Subtest: /workspace/tellsh/test/regressions6.test.js
ok 10 - /workspace/tellsh/test/regressions6.test.js
  ---
  duration_ms: 760.588228
  ...
# Subtest: /workspace/tellsh/test/regressions7.test.js
ok 11 - /workspace/tellsh/test/regressions7.test.js
  ---
  duration_ms: 382.888278
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 12 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 249.868852
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 13 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 276.130984
  location: '/workspace/tellsh/test/templates.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..13
# tests 13
# suites 0
# pass 12
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 1015.623537

exec
/bin/bash -lc "node --input-type=module <<'NODE'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for (const [h,q] of [ ['git -C /repo diff notes.txt','delete it'],['git -C /repo blame notes.txt','delete it'],['docker --context production logs web','stop it'],['sudo -D /repo cat notes.txt','delete it'],['cat a.txt > b.txt','delete it'],['curl -o report.txt https://example.org/index.html','delete it'],['systemctl status nginx postgres','restart them'],['docker stop web db','stop them'], ['git add a.txt b.txt','delete them'], ['head -n 5 1234','delete it'],['cat -- /tmp/a','show it']]) {const r=suggest(q,{env,history:[h]}); console.log(JSON.stringify({h,q,command:r.command,context:r.context,missing:r.missing}));}
NODE" in /workspace/tellsh
 succeeded in 108ms:
{"h":"git -C /repo diff notes.txt","q":"delete it","command":"rm notes.txt","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = notes.txt"},"missing":[]}
{"h":"git -C /repo blame notes.txt","q":"delete it","command":"rm notes.txt","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = notes.txt"},"missing":[]}
{"h":"docker --context production logs web","q":"stop it","command":"docker stop web","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"container\" from history = web"},"missing":[]}
{"h":"sudo -D /repo cat notes.txt","q":"delete it","command":"rm notes.txt","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = notes.txt"},"missing":[]}
{"h":"cat a.txt > b.txt","q":"delete it","command":"rm b.txt","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = b.txt"},"missing":[]}
{"h":"curl -o report.txt https://example.org/index.html","q":"delete it","command":"rm <FILE>","context":{"used":true,"commands":1,"rule":null,"note":"the url from history does not fit delete_file; not used"},"missing":["file"]}
{"h":"systemctl status nginx postgres","q":"restart them","command":"sudo systemctl restart nginx","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"service\" from history = nginx"},"missing":[]}
{"h":"docker stop web db","q":"stop them","command":"docker stop web","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"container\" from history = web"},"missing":[]}
{"h":"git add a.txt b.txt","q":"delete them","command":"rm b.txt","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = b.txt"},"missing":[]}
{"h":"head -n 5 1234","q":"delete it","command":"rm 1234","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = 1234"},"missing":[]}
{"h":"cat -- /tmp/a","q":"show it","command":"cat /tmp/a","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = /tmp/a"},"missing":[]}

exec
/bin/bash -lc "sed -n '200,440p' src/danger.js" in /workspace/tellsh
 succeeded in 0ms:
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
// rm/unlink/shred of a system file; sed -i on one; tee (not -a) onto one
function sysFileWriteCheck(w, head, hit) {
  const a = w.slice(1);
  if (head === 'rm' || head === 'unlink') {
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

exec
/bin/bash -lc 'cat src/rerank/tokenizer.js && cat scripts/hybrid/export_encoder.py && cat scripts/hybrid/prune_vocab.py' in /workspace/tellsh
 succeeded in 0ms:
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
#!/usr/bin/env python3
"""Export the joint encoder (B) to ONNX + int8 (dynamic quantisation) and write the runtime bundle:

  hybrid/models/enc/
    encoder.int8.onnx   inputs input_ids/attention_mask [b,t] int64 -> tool [b,55], intent [b,149], tags [b,t,37]
    vocab.json          {"pieces": [...], "scores": [...], "unk": 3}  (pruned SentencePiece Unigram vocabulary)
    labels.json         tools / intents / tagLabels, context format, max length
  Also checks ONNX fp32 / int8 against PyTorch on dev sentences (argmax agreement).

Usage: python3 scripts/hybrid/export_encoder.py [--ckpt build/hybrid/enc/final.pt] [--out hybrid/models/enc]
"""
import argparse, json, os, sys
import numpy as np
import torch

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from train_encoder import Joint, ctx_str  # noqa: E402


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--enc', default=os.path.join(ROOT, 'build/hybrid/enc'))
    ap.add_argument('--ckpt', default=None)
    ap.add_argument('--out', default=os.path.join(ROOT, 'hybrid/models/enc'))
    ap.add_argument('--layers', type=int, default=None)
    ap.add_argument('--per-channel', action='store_true')
    ap.add_argument('--fp32-heads', action='store_true')
    ap.add_argument('--wq', type=int, default=0, help='weight-only quantisation bits (8 or 4) instead of dynamic int8')
    ap.add_argument('--block', type=int, default=32)
    ap.add_argument('--acc-level', type=int, default=None, help='MatMulNBits accuracy_level (4 = int8 compute)')
    ap.add_argument('--gather', action='store_true', help='also quantise the embedding Gather (smaller file)')
    a = ap.parse_args()
    from transformers import AutoTokenizer
    from onnxruntime.quantization import quantize_dynamic, QuantType
    import onnxruntime as ort
    ti = os.path.join(a.enc, 'train_info.json')
    info = json.load(open(ti)) if os.path.exists(ti) else {  # exporting a mid-training checkpoint
        'meta': json.load(open(os.path.join(ROOT, 'build/hybrid/meta.json'))), 'base': os.path.join(ROOT, 'build/hybrid/e5-pruned'), 'layers': 6}
    meta = info['meta']
    base = info['base']
    tok = AutoTokenizer.from_pretrained(base)
    model = Joint(base, len(meta['tools']), len(meta['intents']), len(meta['tagLabels']), a.layers or info.get('layers'))
    sd = torch.load(a.ckpt or os.path.join(a.enc, 'final.pt'), map_location='cpu', weights_only=False)
    model.load_state_dict(sd.get('model', sd))
    model.eval()
    os.makedirs(a.out, exist_ok=True)
    fp = os.path.join(a.out, 'encoder.fp32.onnx')
    q = os.path.join(a.out, 'encoder.int8.onnx')
    ex = tok(['pokaż największe pliki'], ['bash linux'], return_tensors='pt')
    torch.onnx.export(model, (ex['input_ids'], ex['attention_mask']), fp, input_names=['input_ids', 'attention_mask'],
                      output_names=['tool', 'intent', 'tags'],
                      dynamic_axes={'input_ids': {0: 'b', 1: 't'}, 'attention_mask': {0: 'b', 1: 't'}, 'tool': {0: 'b'}, 'intent': {0: 'b'}, 'tags': {0: 'b', 1: 't'}},
                      opset_version=17, dynamo=False)
    ops = ['MatMul', 'Gather'] if a.gather else ['MatMul']
    import onnx
    g = onnx.load(fp).graph
    # the output heads are tiny; keeping them fp32 removes most of the int8 argmax flips
    excl = [n.name for n in g.node if n.op_type in ('MatMul', 'Gemm') and any(h in n.name for h in ('/tool/', '/intent/', '/tag/'))] if a.fp32_heads else []
    if a.wq:
        # weight-only block quantisation (MatMulNBits / GatherBlockQuantized): activations stay fp32
        from onnxruntime.quantization.matmul_nbits_quantizer import MatMulNBitsQuantizer
        wq = MatMulNBitsQuantizer(onnx.load(fp), bits=a.wq, block_size=a.block, is_symmetric=True, accuracy_level=a.acc_level,
                                  op_types_to_quantize=('MatMul',), nodes_to_exclude=excl)
        wq.process()
        tmp = q + '.mm.onnx'
        wq.model.save_model_to_file(tmp if a.gather else q, use_external_data_format=False)
        if a.gather:  # embedding table: plain int8 (a lookup, no activation quantisation involved)
            quantize_dynamic(tmp, q, weight_type=QuantType.QInt8, op_types_to_quantize=['Gather'], per_channel=False)
            os.remove(tmp)
    else:
        quantize_dynamic(fp, q, weight_type=QuantType.QInt8, op_types_to_quantize=ops, per_channel=a.per_channel, nodes_to_exclude=excl)
    spec = json.load(open(os.path.join(base, 'tokenizer.json'), encoding='utf-8'))
    vocab = spec['model']['vocab']
    json.dump({'pieces': [p for p, _ in vocab], 'scores': [round(s, 5) for _, s in vocab], 'unk': spec['model']['unk_id']},
              open(os.path.join(a.out, 'vocab.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    json.dump({'tools': meta['tools'], 'intents': meta['intents'], 'tagLabels': meta['tagLabels'], 'maxLen': 64,
               'context': '{shell} {os}', 'layers': info.get('layers'), 'version': 1},
              open(os.path.join(a.out, 'labels.json'), 'w'), indent=1)
    # parity on dev rows
    rows = [json.loads(l) for l in open(os.path.join(ROOT, 'build/hybrid/train.jsonl'), encoding='utf-8')]
    rows = [r for r in rows if r['split'] == 'dev'][:600]
    sess = {k: ort.InferenceSession(p, providers=['CPUExecutionProvider']) for k, p in (('fp32', fp), ('int8', q))}
    agree = {'fp32': [0, 0], 'int8': [0, 0]}
    acc = {'pt': 0, 'fp32': 0, 'int8': 0}
    il = {t: i for i, t in enumerate(meta['intents'])}
    rows = [r for r in rows if r['intent']]
    for r in rows:
        e = tok([r['text']], [ctx_str(r)], return_tensors='pt', truncation='only_first', max_length=64)
        with torch.no_grad():
            pt = model(e['input_ids'], e['attention_mask'])
        feed = {'input_ids': e['input_ids'].numpy(), 'attention_mask': e['attention_mask'].numpy()}
        acc['pt'] += int(int(pt[1].argmax()) == il[r['intent']])
        for k, s in sess.items():
            o = s.run(None, feed)
            acc[k] += int(int(np.argmax(o[1])) == il[r['intent']])
            agree[k][0] += int(np.argmax(o[1]) == int(pt[1].argmax()))
            agree[k][1] += int(np.argmax(o[0]) == int(pt[0].argmax()))
    rep = {'fp32_mb': round(os.path.getsize(fp) / 1e6, 2), 'int8_mb': round(os.path.getsize(q) / 1e6, 2),
           'vocab_json_mb': round(os.path.getsize(os.path.join(a.out, 'vocab.json')) / 1e6, 2),
           'intent_argmax_agree_fp32': agree['fp32'][0] / len(rows), 'intent_argmax_agree_int8': agree['int8'][0] / len(rows),
           'tool_argmax_agree_int8': agree['int8'][1] / len(rows), 'n': len(rows), 'gather_quantized': a.gather, 'per_channel': a.per_channel, 'fp32_heads': a.fp32_heads, 'wq': a.wq, 'block': a.block, 'acc_level': a.acc_level,
           'dev_intent_acc': {k: round(v / len(rows), 4) for k, v in acc.items()}}
    json.dump(rep, open(os.path.join(a.out, 'export_report.json'), 'w'), indent=1)
    os.remove(fp) if not os.environ.get('KEEP_FP32') else None
    print(rep)


if __name__ == '__main__':
    main()
#!/usr/bin/env python3
"""Prune the 250k-piece XLM-R SentencePiece (Unigram) vocabulary of multilingual-e5-small to the pieces PL+EN text needs.

Kept pieces = specials + every piece produced when tokenising
  * all tellsh training/eval texts (build/hybrid/train.jsonl, data/**.jsonl text fields, tldr descriptions),
  * the 80k most frequent English and Polish words (wordfreq), lower-case, Capitalised and (PL) with diacritics folded,
  * every single printable ASCII / Polish character (fallback so any input still segments without <unk>).
The pruned model segments any text with the remaining pieces via the same Unigram Viterbi (scores unchanged), and the
embedding matrix is sliced to the kept ids.  Writes build/hybrid/e5-pruned/ (HF model dir) + vocab report.

Usage: python3 scripts/hybrid/prune_vocab.py [--base intfloat/multilingual-e5-small] [--words 80000]
"""
import argparse, glob, json, os, sys, unicodedata
import torch
from transformers import AutoTokenizer, AutoModel, PreTrainedTokenizerFast

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def fold(s):
    s = s.replace('ł', 'l').replace('Ł', 'L')
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')


def corpus_texts():
    texts = []
    for l in open(os.path.join(ROOT, 'build/hybrid/train.jsonl'), encoding='utf-8'):
        texts.append(json.loads(l)['text'])
    for f in glob.glob(os.path.join(ROOT, 'data/**/*.jsonl'), recursive=True):
        if '/hybrid/blind/' in f:
            continue  # blind eval: never used for any modelling decision
        for l in open(f, encoding='utf-8'):
            l = l.strip()
            if not l:
                continue
            r = json.loads(l)
            for k in ('text', 'query'):
                if isinstance(r.get(k), str):
                    texts.append(r[k])
            for h in r.get('history', []) or []:
                texts.append(h)
    return texts


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', default='intfloat/multilingual-e5-small')
    ap.add_argument('--words', type=int, default=80000)
    ap.add_argument('--out', default=os.path.join(ROOT, 'build/hybrid/e5-pruned'))
    a = ap.parse_args()
    from wordfreq import top_n_list
    tok = AutoTokenizer.from_pretrained(a.base)
    fast = tok.backend_tokenizer if hasattr(tok, 'backend_tokenizer') else tok._tokenizer
    spec = json.loads(fast.to_str())
    vocab = spec['model']['vocab']
    texts = corpus_texts()
    words = []
    for lang in ('en', 'pl'):
        for w in top_n_list(lang, a.words):
            words += [w, w.capitalize()]
            if lang == 'pl':
                words += [fold(w)]
    chars = [chr(c) for c in range(33, 127)] + list('ąćęłńóśźżĄĆĘŁŃÓŚŹŻ„”“’–—…«»€£§°×')
    keep = set(range(4))  # <s> <pad> </s> <unk>
    for batch_start in range(0, len(texts) + len(words), 4096):
        chunk = (texts + words)[batch_start:batch_start + 4096]
        for enc in fast.encode_batch(chunk, add_special_tokens=False):
            keep.update(enc.ids)
    piece_id = {p: i for i, (p, _) in enumerate(vocab)}
    for c in chars:
        for p in (c, '▁' + c):
            if p in piece_id:
                keep.add(piece_id[p])
    keep.add(piece_id['▁'])
    kept = sorted(keep)
    old2new = {o: n for n, o in enumerate(kept)}
    spec['model']['vocab'] = [vocab[o] for o in kept]
    spec['model']['unk_id'] = old2new[spec['model']['unk_id']]
    for at in spec.get('added_tokens', []):
        at['id'] = old2new.get(at['id'], at['id'])
    # post-processor references special token ids
    def remap(o):
        if isinstance(o, dict):
            for k, v in o.items():
                if k == 'ids' and isinstance(v, list):
                    o[k] = [old2new.get(x, x) for x in v]
                elif k == 'id' and isinstance(v, int):
                    o[k] = old2new.get(v, v)
                else:
                    remap(v)
        elif isinstance(o, list):
            for v in o:
                remap(v)
    remap(spec.get('post_processor'))
    os.makedirs(a.out, exist_ok=True)
    with open(os.path.join(a.out, 'tokenizer.json'), 'w', encoding='utf-8') as f:
        json.dump(spec, f, ensure_ascii=False)
    newtok = PreTrainedTokenizerFast(tokenizer_file=os.path.join(a.out, 'tokenizer.json'), bos_token='<s>', eos_token='</s>',
                                     unk_token='<unk>', pad_token='<pad>', cls_token='<s>', sep_token='</s>', mask_token='<unk>')
    newtok.save_pretrained(a.out)
    model = AutoModel.from_pretrained(a.base)
    emb = model.get_input_embeddings().weight.data
    new = torch.nn.Embedding(len(kept), emb.shape[1], padding_idx=old2new[1])
    new.weight.data = emb[kept].clone()
    model.set_input_embeddings(new)
    model.config.vocab_size = len(kept)
    model.config.pad_token_id = old2new[1]
    model.save_pretrained(a.out)
    # parity: pruned segmentation vs original on the corpus texts
    diff = 0
    for t in texts:
        o = [vocab[i][0] for i in fast.encode(t, add_special_tokens=False).ids]
        n = newtok.convert_ids_to_tokens(newtok(t, add_special_tokens=False)['input_ids'])
        diff += o != n
    params = sum(p.numel() for p in model.parameters())
    rep = {'base': a.base, 'vocab_before': len(vocab), 'vocab_after': len(kept), 'params_after': params,
           'emb_params_before': int(emb.numel()), 'emb_params_after': int(new.weight.numel()),
           'corpus_texts': len(texts), 'segmentation_diff_on_corpus': diff}
    json.dump(rep, open(os.path.join(a.out, 'prune_report.json'), 'w'), indent=1)
    print(rep)


if __name__ == '__main__':
    main()

exec
/bin/bash -lc "git diff 0d87457..HEAD -- src/history.js | sed -n '1,220p' && sed -n '1,165p' src/cli.js && sed -n '210,260p' src/cli.js" in /workspace/tellsh
 succeeded in 0ms:
diff --git a/src/history.js b/src/history.js
index 1beb1e0..b034054 100644
--- a/src/history.js
+++ b/src/history.js
@@ -6,9 +6,10 @@ import { homedir } from 'node:os';
 import { join } from 'node:path';
 import { INTENTS, BY_ID } from './catalog.js';
 import { FAMILY_OF } from './tools.js';
-import { extractSlots, foldKeepLength } from './slots.js';
+import { extractSlots, foldKeepLength, isStopWord } from './slots.js';
 import { VARIANTS } from './variants.js';
-import { splitCommand, wordsOf, decodeWord, AMB, isAmbiguous, isExpansion, isGlob, rawOf } from './shellwords.js';
+import { splitCommand, wordsOf, decodeWord, AMB, isAmbiguous, isExpansion, isGlob, rawOf, joinArgs } from './shellwords.js';
+import { commandWords, commandChains } from './danger.js';
 
 export { isAmbiguous };
 
@@ -83,8 +84,8 @@ export function parseHistory(text, kind = 'bash', { partial = false } = {}) {
   return cmds;
 }
 
-/** Last `n` commands from the user's history file (or from `file`). Returns [] when unavailable. */
-export function loadHistory({ shell = 'bash', file, n = 10, env = process.env, os = process.platform } = {}) {
+/** Last `n` commands from the user's history file (or from `file`; default 2: the previous command and the running `tellsh` line some shells write first). Returns [] when unavailable. */
+export function loadHistory({ shell = 'bash', file, n = 2, env = process.env, os = process.platform } = {}) {
   const cands = file ? [[/zsh/.test(file) ? 'zsh' : /fish/.test(file) ? 'fish' : /PSReadLine/i.test(file) ? 'pwsh' : 'bash', file]]
     : historyCandidates(shell, env, os);
   for (const [kind, path] of cands) {
@@ -115,9 +116,12 @@ const GLOB_SLOTS = new Set(['namepat', 'glob', 'pattern', 'sedexpr', 'old', 'new
 
 // template inversion: catalog/variant template -> regex that recovers intent + slot values from a command
 const BT = '`';
+// The alternatives must never overlap, or matching a long run of \\ or '' against a template that
+// does not fit backtracks exponentially: a backslash is only ever consumed by `\\.`, and a quoted
+// PowerShell string cannot end right before another quote (`''''` is one string, not two).
 const WORD_RE = {
-  posix: String.raw`((?:'[^']*'|"(?:\\.|[^"\\])*"|\\.|[^\s'"\;&|<>()])+)`,
-  pwsh: `((?:['‘-‛](?:[^'‘-‛]|['‘-‛]{2})*['‘-‛]|["“-„](?:${BT}.|["“-„]{2}|[^"“-„${BT}])*["“-„]|${BT}.|[^\\s'"‘-„${BT};|(){}<>])+)`,
+  posix: String.raw`((?:'[^']*'|"(?:\\.|[^"\\])*"|\\.|[^\s'"\\;&|<>()])+)`,
+  pwsh: `((?:['‘-‛](?:[^'‘-‛]|['‘-‛]{2})*['‘-‛](?!['‘-‛])|["“-„](?:${BT}.|["“-„]{2}|[^"“-„${BT}])*["“-„](?!["“-„])|${BT}.|[^\\s'"‘-„${BT};|(){}<>])+)`,
 };
 let INV = null;
 function inverters() {
@@ -220,6 +224,83 @@ function psArgs(args) {
 
 const typeByExt = (p) => (/\.\w{1,5}$/.test(rawOf(p)) ? 'file' : 'dir');
 
+/**
+ * mv/cp/ln (Move-Item/Copy-Item) SRC... DST: "it" afterwards is the moved/copied item, which is DST
+ * itself only when DST names the new file (`mv a.txt b.txt`). When DST is a directory the item now
+ * lives somewhere inside it, so neither DST nor SRC is a safe "it": both types become ambiguous.
+ */
+function destEnts(srcs, dst, ents) {
+  const d = rawOf(dst);
+  if (!isAmbiguous(dst) && srcs.length === 1 && typeByExt(srcs[0]) === 'file' && typeByExt(d) === 'file' && !/[\\/]$/.test(d)) {
+    ents.file ??= dst;
+    return;
+  }
+  ents.file ??= AMB + d;
+  ents.dir ??= AMB + d;
+}
+
+// options that take a value, per command (so `kill -s 9 4242` or `pkill nginx -u bob` pick the right word)
+const VALUE_OPTS = {
+  kill: new Set(['-s', '-n', '--signal']),
+  pkill: new Set(['-u', '-U', '-g', '-G', '-P', '-s', '-t', '-F', '--signal', '--euid', '--uid', '--group', '--pgroup', '--parent', '--session', '--terminal', '--pidfile', '--ns', '--nslist']),
+  killall: new Set(['-u', '--user', '-s', '--signal', '-o', '--older-than', '-y', '--younger-than', '-n', '--ns', '-Z', '--context']),
+  pidof: new Set(['-o', '--omit-pid']),
+  grep: new Set(['-e', '--regexp', '-f', '--file', '-m', '--max-count', '-A', '-B', '-C', '--include', '--exclude', '--exclude-dir', '--label', '--color', '-d', '-D']),
+  checkout: new Set(['-b', '-B', '--orphan', '--conflict', '--pathspec-from-file']),
+  switch: new Set(['-c', '-C', '--create', '--force-create', '--orphan', '--conflict']),
+  mv: new Set(['-t', '--target-directory', '-S', '--suffix']),
+};
+VALUE_OPTS.pgrep = VALUE_OPTS.pkill;
+VALUE_OPTS.cp = VALUE_OPTS.mv;
+VALUE_OPTS.ln = VALUE_OPTS.mv;
+VALUE_OPTS.rg = VALUE_OPTS.grep;
+
+/** -> { pos: positional args, opts: {opt: value}, flags: [options without value], after: args after `--` } */
+function parseArgs(args, valueOpts = new Set()) {
+  const pos = [];
+  const opts = {};
+  const flags = [];
+  let after = null;
+  for (let i = 0; i < args.length; i++) {
+    const a = String(args[i]);
+    if (a === '--') { after = args.slice(i + 1); pos.push(...after); break; }
+    if (/^--[^=]+=/.test(a)) { opts[a.replace(/=.*$/s, '')] = a.slice(a.indexOf('=') + 1); continue; }
+    if (valueOpts.has(a)) { opts[a] = args[i + 1]; i++; continue; }
+    // attached short value: -uroot, -tDIR
+    if (/^-[A-Za-z]./.test(a) && valueOpts.has(a.slice(0, 2)) && !/^--/.test(a)) { opts[a.slice(0, 2)] = a.slice(2); continue; }
+    if (/^-./.test(a)) { flags.push(a); continue; }
+    pos.push(args[i]);
+  }
+  return { pos, opts, flags, after };
+}
+
+// VAR=x prefixes and wrapper commands (sudo -u root, env, command, nice -n 5, timeout 5, ...) removed: the command that runs.
+// Returns `w` itself when there is nothing to remove.
+function unwrap(w) {
+  let i = 0;
+  while (i < w.length && /^\w+=/.test(w[i])) i++;
+  if (i < w.length && isAmbiguous(w[i])) return i ? w.slice(i) : w;
+  const r = commandWords(w.map(String));
+  return r.length === w.length ? w : w.slice(w.length - r.length);
+}
+
+const CD_HEADS = new Set(['cd', 'pushd', 'popd', 'chdir', 'set-location', 'sl', 'push-location', 'pop-location']);
+// a path that depends on the working directory (stale once the directory changes)
+export const isRelativePath = (v) => {
+  const s = rawOf(String(v));
+  return !/^(?:[~/\\]|[A-Za-z]:[\\/]|\$HOME\b|\$\{HOME\}|\$env:|%USERPROFILE%)/i.test(s);
+};
+const PATH_SLOT_KEYS = ['path', 'file', 'src', 'dst', 'dest', 'archive'];
+/** Mark working-directory-relative file/dir values as ambiguous (the cwd changed after they were used). */
+function staleRelative(ents, slots) {
+  for (const t of ['file', 'dir']) if (ents[t] != null && !isAmbiguous(ents[t]) && isRelativePath(ents[t])) ents[t] = AMB + ents[t];
+  if (slots) for (const k of PATH_SLOT_KEYS) if (slots[k] != null && !isAmbiguous(slots[k]) && isRelativePath(slots[k])) slots[k] = AMB + slots[k];
+}
+
+// output/input redirection operator words (splitCommand keepRedirects): `>`, `2>>`, `&>`, `>|`, `<`, `>&`
+const REDIR_TARGET_OP = /^\d*(?:[<>]{1,2}[&|]?|&>>?)$/;
+const REDIR_DUP_OP = /^\d*[<>]+&[\d-]+$/;
+
 /** PowerShell native commands. Returns true when the head was recognised. */
 function psNative(head, args, ents, setIntent) {
   const kind = PS_NATIVE[head];
@@ -228,9 +309,21 @@ function psNative(head, args, ents, setIntent) {
   const path = named.literalpath ?? named.lp ?? named.path ?? named.pspath ?? pos[0];
   if (kind === 'file' && path != null) ents.file ??= path;
   else if (kind === 'path' && path != null) ents[typeByExt(path)] ??= path;
-  else if (kind === 'dir' && path != null) ents.dir ??= path;
+  else if (kind === 'dir' && path != null) {
+    if (ents.dir == null) {
+      ents.dir = path;
+      // Get-ChildItem DIR -Filter/-Include/-Exclude/-Recurse (or DIR *.tmp): the matches live inside DIR
+      if (!['set-location', 'sl', 'chdir', 'push-location'].includes(head) &&
+          (named.filter != null || named.include != null || named.exclude != null || pos[1] != null || [...sw].some((x) => x.length >= 2 && 'recurse'.startsWith(x)))) ents.searchDir = true;
+      else if (!['set-location', 'sl', 'chdir', 'push-location'].includes(head)) ents.listDir = true;
+    }
+  }
+  else if (kind === 'dir' && !['set-location', 'sl', 'chdir', 'push-location'].includes(head)) {
+    // Get-ChildItem without a path lists the working directory
+    ents.listCwd = named.filter != null || named.include != null || named.exclude != null || [...sw].some((x) => x.length >= 2 && 'recurse'.startsWith(x)) ? 'search' : 'list';
+  }
   else if (kind === 'remove' && path != null) ents[[...sw].some((s) => 'recurse'.startsWith(s)) ? 'dir' : typeByExt(path)] ??= path;
-  else if (kind === 'copy') { const d = named.destination ?? pos[1]; if (d != null) ents[typeByExt(d)] ??= d; }
+  else if (kind === 'copy') { const d = named.destination ?? pos[1]; if (d != null) destEnts(path != null ? String(path).split(',') : [], d, ents); }
   else if (kind === 'new' && path != null) ents[/^dir/i.test(named.itemtype ?? named.type ?? '') ? 'dir' : 'file'] ??= path;
   else if (kind === 'proc') {
     const id = named.id ?? (pos[0] != null && /^\d+$/.test(pos[0]) ? pos[0] : null);
@@ -263,178 +356,437 @@ function entsFromSlots(intent, slots, ents) {
   if (slots.url) put('url', slots.url);
   if (slots.file) put('file', slots.file);
   if (slots.archive) put('file', slots.archive);
-  if (slots.dst) put(/\.\w+$/.test(slots.dst) ? 'file' : 'dir', slots.dst);
+  if (slots.dst && !isAmbiguous(slots.dst)) destEnts(slots.src != null ? [slots.src] : [], slots.dst, ents);
   if (slots.path && slots.path !== '.') put(['delete_dir', 'mkdir', 'dir_size', 'largest_dirs', 'list_files'].includes(intent) || fam === 'find' ? 'dir' : /\.\w{1,5}$/.test(slots.path) ? 'file' : 'dir', slots.path);
 }
 
+// the tellsh CLI itself (installed, via npx, or `node bin/tellsh.js`)
+const TELLSH_LINE = /^(?:npx\s+(?:-y\s+)?|node\s+)?(?:\S*[\\/])?tellsh(?:\.js)?(?:\s+(.*))?$/s;
+
+// tellsh options that take a separate value (`--shell bash`): the value is not part of the request
+const TELLSH_VALUE_OPTS = new Set(['--shell', '--os', '--platform', '--top', '--threshold']);
+/**
+ * The request text of a `tellsh ...` history line (options removed), or null if the line is not a tellsh call.
+ * Words keep their boundaries (`tellsh delete folder "/tmp/a b"` -> `delete folder "/tmp/a b"`); false when the
+ * line cannot be read back as one request (a word with spaces and both quote characters, unparseable quoting).
+ */
+export function tellshQuery(line, kind = 'posix') {
+  const a = tellshArgs(line, kind);
+  return a == null || a === false ? a : a.text;
+}
+
+/** tellshQuery with the quoted arguments joinArgs could not classify: -> { text, unclear } | null | false */
+export function tellshArgs(line, kind = 'posix') {
+  const t = String(line).trim();
+  const tm = t.match(TELLSH_LINE);
+  if (!tm) return null;
+  const w = wordsOf(tm[1] || '', lineKind(t, kind), { literalTilde: false });
+  if (!w) return tm[1] ? false : { text: '', unclear: [] };
+  const words = [];
+  for (let i = 0; i < w.length; i++) {
+    if (TELLSH_VALUE_OPTS.has(w[i])) { i++; continue; }
+    if (!/^-/.test(w[i])) words.push(rawOf(w[i]));
+  }
+  if (!words.length) return { text: '', unclear: [] };
+  return joinArgs(words) ?? false;
+}
+
 /**
  * Analyse one history line. `classify(query)` handles previous `tellsh <query>` lines.
  * kind: 'posix' | 'pwsh' (PowerShell history; Verb-Noun lines are always read as PowerShell).
+ * Segments of a compound line (`a; b`, `a && b`, `a | b`) are read in order and later ones win: the
+ * entities of `cat old.txt; cat new.txt` are those of `cat new.txt`. Redirection targets (`> out.txt`)
+ * are files the line wrote. A `cd` makes every earlier working-directory-relative path ambiguous.
+ * `at` gives each entity type the index of the segment it came from (later segment = newer), and
+ * `searchDir` marks a `dir` entity that is only the root of a search (`find /var/log -name '*.gz'`,
+ * `grep -rl TODO src`): the results live inside it, so it must never be a destructive target.
+ * -> { line, intent, slots, ents, at, searchDir?, ambiguous, cd?, fromTellsh?, opaque? }
  */
 export function analyzeCommand(line, classify, kind = 'posix') {
-  const ents = {};
+  let ents = {};
   let intent = null;
   let slots = {};
   let ambiguous = false;
   const t = line.trim();
   const k = lineKind(t, kind);
-  const tm = t.match(/^(?:npx\s+(?:-y\s+)?)?tellsh\s+(.*)$/s);
-  if (tm) {
-    const w = wordsOf(tm[1], k);
-    const q = w ? w.filter((x) => !/^-/.test(x)).map(rawOf).join(' ') : '';
-    const r = q && classify ? classify(q) : null;
-    if (r?.intent) { intent = r.intent; slots = r.slots || {}; entsFromSlots(intent, slots, ents); }
-    return { line: t, intent, slots, ents, fromTellsh: true, ambiguous };
-  }
-  const split = splitCommand(t, k);
+  if (TELLSH_LINE.test(t)) {
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

exec
/bin/bash -lc 'cat test/templates.test.js && node test/templates.test.js' in /workspace/tellsh
 exited 1 in 109ms:
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { shQuote, render, buildCommand } from '../src/fill.js';
import { INTENTS } from '../src/catalog.js';

// round-trip through a real shell: printf '%s' <quoted> must print the original
const roundTrip = (s) => execFileSync('bash', ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' });

test('shQuote round-trips nasty strings through bash', () => {
  for (const s of ["it's", 'a b', '$(rm -rf ~)', '`id`', '"; ls', 'tab\there', 'new\nline', '*.log', '!bang', 'ąę żółw', "''", '\\', '-rf']) {
    assert.equal(roundTrip(s), s);
  }
});

test('shQuote keeps simple words bare and tilde expandable', () => {
  assert.equal(shQuote('/var/log'), '/var/log');
  assert.equal(shQuote('~/my dir'), "~/'my dir'");
  assert.equal(shQuote('~'), '~');
  assert.equal(shQuote(''), "''");
});

test('raw slots are validated, never injected', () => {
  const r = render('head -n {count!raw} {file}', { count: '5; rm -rf /', file: 'a' }, ['count']);
  assert.equal(r.command, 'head -n <COUNT> a');
  assert.deepEqual(r.missing, ['count']);
});

test('optional segments are dropped when slot missing', () => {
  assert.equal(render('git diff«-- {file}»', {}).command, 'git diff');
  assert.equal(render('git diff«-- {file}»', { file: 'a b' }).command, "git diff -- 'a b'");
});

test('non-slot braces are left alone', () => {
  assert.equal(render("awk '{print $1}' {file}", { file: 'x' }).command, "awk '{print $1}' x");
  assert.equal(render("curl -w '%{http_code}' {url}", { url: 'https://a' }).command, "curl -w '%{http_code}' https://a");
});

test('every intent renders on linux and darwin without throwing, with valid risk', () => {
  for (const i of INTENTS) {
    for (const platform of ['linux', 'darwin']) {
      const r = buildCommand(i.id, '', { platform });
      assert.ok(r.command && typeof r.command === 'string', i.id);
      assert.ok(['safe', 'medium', 'high'].includes(r.risk), i.id);
      assert.ok(!/undefined|(?<!\/dev\/)null|\{\w+(!raw)?\}/.test(r.command.replace(/%\{http_code\}/, '')), `${i.id}/${platform}: ${r.command}`);
    }
  }
});

test('darwin variants differ where commands differ', () => {
  assert.equal(buildCommand('memory_usage', '', { platform: 'darwin' }).command, 'vm_stat');
  assert.equal(buildCommand('memory_usage', '', { platform: 'linux' }).command, 'free -h');
  assert.match(buildCommand('listening_ports', '', { platform: 'darwin' }).command, /^lsof/);
  assert.match(buildCommand('replace_text', 'replace a with b in f.txt', { platform: 'darwin' }).command, /^sed -i '' /);
});

test('injection attempt in a filename stays a single quoted argument', () => {
  const r = buildCommand('cat_file', 'show file "x; rm -rf ~"', { platform: 'linux' });
  assert.equal(r.command, "cat 'x; rm -rf ~'");
});
TAP version 13
# Subtest: shQuote round-trips nasty strings through bash
not ok 1 - shQuote round-trips nasty strings through bash
  ---
  duration_ms: 6.316124
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
  duration_ms: 0.411499
  ...
# Subtest: raw slots are validated, never injected
ok 3 - raw slots are validated, never injected
  ---
  duration_ms: 1.373982
  ...
# Subtest: optional segments are dropped when slot missing
ok 4 - optional segments are dropped when slot missing
  ---
  duration_ms: 0.322947
  ...
# Subtest: non-slot braces are left alone
ok 5 - non-slot braces are left alone
  ---
  duration_ms: 0.363647
  ...
# Subtest: every intent renders on linux and darwin without throwing, with valid risk
ok 6 - every intent renders on linux and darwin without throwing, with valid risk
  ---
  duration_ms: 67.033079
  ...
# Subtest: darwin variants differ where commands differ
ok 7 - darwin variants differ where commands differ
  ---
  duration_ms: 1.446554
  ...
# Subtest: injection attempt in a filename stays a single quoted argument
ok 8 - injection attempt in a filename stays a single quoted argument
  ---
  duration_ms: 0.490869
  ...
1..8
# tests 8
# suites 0
# pass 7
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 93.546665

exec
/bin/bash -lc "nl -ba src/history.js | sed -n '535,622p'; nl -ba scripts/hybrid/train_a_dev.sh; sed -n '250,315p' scripts/train.py; git status --short" in /workspace/tellsh
 succeeded in 0ms:
   535	// Listings: commands that print many values of an entity type (`ls`, `find`, `ps aux`, `docker ps`, `git branch`).
   536	// After one, "it"/"them" may mean any of the printed values, so an older value of that type is not a safe
   537	// target for a changing command.
   538	const FS_LISTERS = new Set(['ls', 'tree', 'dir', 'gci', 'get-childitem', 'll', 'la', 'find', 'fd', 'fdfind', 'locate', 'mlocate', 'plocate',
   539	  'du', 'ncdu', 'exa', 'eza', 'lsd', 'vdir']);
   540	const FS_SEARCHERS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'select-string', 'sls', 'findstr']);
   541	const PROC_LISTERS = new Set(['ps', 'top', 'htop', 'btop', 'atop', 'pgrep', 'pidof', 'pstree', 'get-process', 'gps', 'tasklist']);
   542	// global options that take a value, before the subcommand (`git -C /tmp status`, `docker --context prod ps`)
   543	const GLOBAL_VALUE_OPTS = {
   544	  git: new Set(['-C', '-c', '--git-dir', '--work-tree', '--namespace', '--super-prefix', '--config-env']),
   545	  docker: new Set(['-H', '--host', '-c', '--context', '--config', '-l', '--log-level', '--tlscacert', '--tlscert', '--tlskey']),
   546	  podman: new Set(['-c', '--connection', '--url', '--identity', '--root', '--runroot', '--cgroup-manager', '--log-level', '--storage-driver',
   547	    '--module', '--events-backend', '--network-cmd-path', '--tmpdir', '--volumepath', '--imagestore', '--hooks-dir', '--conmon', '--runtime', '--ssh']),
   548	};
   549	/** The arguments after the global options of git/docker/podman (`git -C /tmp status` -> ['status']); other heads: unchanged. */
   550	function afterGlobals(head, args) {
   551	  const vo = GLOBAL_VALUE_OPTS[head];
   552	  if (!vo) return args;
   553	  let i = 0;
   554	  while (i < args.length && /^-/.test(args[i]) && args[i] !== '--') i += vo.has(args[i]) ? 2 : 1;
   555	  if (args[i] === '--') i++;
   556	  return args.slice(i);
   557	}
   558	function listedBySegment(w, pipedIn, k) {
   559	  const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
   560	  const nonFlags = afterGlobals(head, w.slice(1)).filter((a) => !/^-/.test(a));
   561	  // `du -sh DIR` is the size of DIR itself; `du DIR` / `du -d 1 DIR` lists what is inside
   562	  if (head === 'du' && w.slice(1).some((a) => /^-[a-zA-Z]*s|^--summarize$/.test(a)) && !nonFlags.some(isGlob)) return [];
   563	  if (FS_LISTERS.has(head)) return ['file', 'dir'];
   564	  // grep reading a pipe filters what an earlier stage printed; reading files it lists matches
   565	  if (FS_SEARCHERS.has(head)) return pipedIn ? [] : ['file', 'dir'];
   566	  if (PROC_LISTERS.has(head)) return ['pid', 'proc'];
   567	  if (['ss', 'netstat', 'lsof', 'fuser', 'get-nettcpconnection'].includes(head)) return ['port', 'pid', 'proc'];
   568	  if (head === 'docker' || head === 'podman') {
   569	    const sub = nonFlags.slice(0, 2).join(' ');
   570	    return /^(?:ps|stats|container (?:ls|list|ps)|compose ps|top)\b/.test(sub) ? ['container'] : [];
   571	  }
   572	  if (head === 'systemctl') return !nonFlags.length || /^list-/.test(nonFlags[0]) || w.includes('--failed') ? ['service'] : [];
   573	  if (head === 'service') return w.includes('--status-all') ? ['service'] : [];
   574	  if (head === 'get-service' || head === 'gsv') return psArgs(w.slice(1)).pos.length || /-(?:name|displayname)\b/i.test(w.join(' ')) ? [] : ['service'];
   575	  if (head === 'git') {
   576	    const sub = nonFlags[0];
   577	    if (sub === 'branch') return nonFlags.length === 1 && !w.some((a) => /^-(?:d|D|m|M|c|C|-delete|-move|-copy)$/.test(a)) ? ['branch'] : [];
   578	    if (['grep', 'ls-files', 'status', 'clean'].includes(sub)) return ['file', 'dir'];
   579	  }
   580	  return [];
   581	}
   582	const LIST_INTENT = { docker_ps: ['container'], docker_ps_all: ['container'], docker_stats: ['container'], list_services: ['service'],
   583	  failed_services: ['service'], git_branches: ['branch'], git_status: ['file', 'dir'] };
   584	const LIST_FAMILY = { ls: ['file', 'dir'], find: ['file', 'dir'], grep: ['file', 'dir'], du: ['file', 'dir'], ps: ['pid', 'proc'], ss: ['port', 'pid', 'proc'] };
   585	/** Entity types a catalog intent prints many values of (for previous `tellsh <query>` lines). */
   586	const listedByIntent = (intent) => (intent ? LIST_INTENT[intent] || LIST_FAMILY[FAMILY_OF[intent]] || [] : []);
   587	
   588	// pipeline stages that filter the entries of a listing piped into them
   589	const FILTER_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag', 'findstr', 'select-string', 'sls', 'where-object', 'where', '?']);
   590	const GREP_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag']);
   591	
   592	// find/grep catalog intents: their path slot is where the search ran, not what it found
   593	const isSearchRoot = (intent, slots, ents) => ents.dir != null && ['find', 'grep'].includes(FAMILY_OF[intent]) && String(ents.dir) === String(slots.path);
   594	
   595	// the one operand of a command, or (several files: `touch a.txt b.txt`, `rm a b`) an ambiguous value: "delete them"
   596	// or "delete it" may mean any or all of them, never just the last one
   597	const oneOf = (ops) => (ops.length > 1 ? AMB + ops.map(rawOf).join(' ') : ops[0]);
   598	
   599	/** Entities of one simple command `w` (sudo/VAR= removed) into `e`. */
   600	function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
   601	  if (isAmbiguous(w[0])) {
   602	    if (w.slice(1).some((a) => PATHLIKE.test(rawOf(a)))) { e.file = AMB + w.join(' '); e.dir = AMB + w.join(' '); }
   603	    return;
   604	  }
   605	  const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '');
   606	  const args = afterGlobals(head, w.slice(1));
   607	  const nonFlags = args.filter((a) => !/^-/.test(a));
   608	  if (CD_HEADS.has(head.toLowerCase())) return; // handled by the caller
   609	  if ((k === 'pwsh' || PS_CMDLET.test(head)) && psNative(head.toLowerCase(), args, e, setIntent)) return;
   610	  if (head === 'docker') {
   611	    const sub = nonFlags[0];
   612	    if (sub === 'run') {
   613	      const i = args.indexOf('--name');
   614	      if (i >= 0 && args[i + 1]) e.container ??= args[i + 1];
   615	      const nm = args.find((a) => a.startsWith('--name='));
   616	      if (nm) e.container ??= nm.slice(7);
   617	    } else if (DOCKER_CT.has(sub)) {
   618	      const rest = args.slice(args.indexOf(sub) + 1);
   619	      for (let i = 0; i < rest.length; i++) {
   620	        if (DOCKER_VAL_FLAGS.has(rest[i])) { i++; continue; }
   621	        if (/^-/.test(rest[i])) continue;
   622	        e.container ??= rest[i];
     1	#!/bin/sh
     2	# Retrain the linear cascade (A) WITHOUT the hybrid dev split (scripts/hybrid/export_data.js isDev), so that the
     3	# hybrid thresholds (when to defer from A to B/C) are calibrated on sentences A has never seen.
     4	# Builds a shadow tree build/adev/ (src, data symlinked; gen_data/train copied with one extra filter) and writes
     5	# build/adev/model/model.bin. The shipped model/model.bin is not touched.
     6	set -e
     7	ROOT=$(cd "$(dirname "$0")/../.." && pwd)
     8	T=$ROOT/build/adev
     9	mkdir -p $T/scripts/lib $T/model $T/build
    10	ln -sfn $ROOT/src $T/src
    11	ln -sfn $ROOT/data $T/data
    12	# private real-usage rows (if present) and the real/ loader
    13	mkdir -p $T/scripts/real && cp $ROOT/scripts/real/*.js $T/scripts/real/
    14	[ -d $ROOT/build/real ] && ln -sfn $ROOT/build/real $T/build/real
    15	# test/ is copied, not symlinked: train.py writes test/fixtures/parity.json
    16	mkdir -p $T/test/fixtures && cp $ROOT/test/*.js $T/test/
    17	cp $ROOT/scripts/lib/*.js $T/scripts/lib/
    18	cp $ROOT/scripts/train.py $T/scripts/train.py
    19	cp $ROOT/model/*.json $T/model/
    20	# gen_data: additionally drop every dev-split sentence (same hash as export_data.js)
    21	sed -e "s#if (heldOut.has(r0.text)) { dropped++; continue; }#if (heldOut.has(r0.text) || isDevText(r0.text)) { dropped++; continue; }#" \
    22	    -e "s#^import { ctxFeatures } from '../src/history.js';#&\nimport { fnv1a as _fnv } from '../src/features.js';\nconst isDevText = (t) => _fnv('dev:' + normalize(t)) % 10 === 0;#" \
    23	    $ROOT/scripts/gen_data.js > $T/scripts/gen_data.js
    24	# both substitutions must have happened (the import alone is not enough)
    25	grep -q 'heldOut.has(r0.text) || isDevText' $T/scripts/gen_data.js
    26	cd $T && node scripts/gen_data.js && python3 scripts/train.py --out $T/model/model.bin
    log(f'accept threshold={best_t:.3f} (correct kept={(score[ind & correct] >= best_t).mean():.3f}, '
        f'OOD rejected={(score[oodm] < best_t).mean() if oodm.any() else float("nan"):.3f}); compose tool threshold={compose_t:.2f}')

    # ---------------- final models on all data ----------------
    all_idx = np.arange(len(rows))
    tool, intents = train_all(rows, X, meta, all_idx, args.C, args.keep_tool, keep_int, '[final] ')

    # ---------------- tagger ----------------
    seqs, XT, yT, gT, seq_of = load_tag(tag_dim)
    log(f'tagger: {len(seqs)} sequences, {XT.shape[0]} tokens')
    ho_t = np.array([g in ho_g for g in gT])
    tt = time.time()
    tag_split = fit(XT[~ho_t], yT[~ho_t], args.tagC)
    pred = np.array(tag_split.labels)[tag_split.proba(XT[ho_t]).argmax(1)]
    gold = yT[ho_t]
    nz = gold != 'O'
    log(f'[split] tagger token acc={np.mean(pred == gold):.4f} non-O recall={np.mean(pred[nz] == gold[nz]):.4f} '
        f'non-O precision={np.mean(pred[pred != "O"] == gold[pred != "O"]):.4f} ({time.time() - tt:.0f}s)')
    tagger = prune_refit(XT, yT, args.tagC, args.keep_tag)
    log(f'[final] tagger: {len(tagger["labels"])} labels, {len(tagger["rows"])} rows ({time.time() - tt:.0f}s)')

    # ---------------- export ----------------
    models = {'tool': tool, 'tagger': tagger}
    for fam, m in intents.items():
        models['intent:' + fam] = m
    header = {
        'version': 2, 'dim': dim, 'tagDim': tag_dim,
        'thresholds': {'accept': round(best_t, 4), 'compose': round(compose_t, 4)},
        'C': args.C, 'tagC': args.tagC, 'trained': time.strftime('%Y-%m-%d'),
        'n_train': int(sum(1 for r in rows if r['g'] in ('intents', 'shell')) // 2),
        'n_rows': len(rows), 'n_tag_seqs': len(seqs),
        'intentsByFamily': fam_intents,
        'holdout': {'intent_acc': round(float(correct[ind].mean()), 4), 'tool_top1': round(float(t1[ind].mean()), 4),
                    'tool_top3': round(float(t3[ind].mean()), 4)},
        'models': {},
    }
    payload = bytearray()
    blobs = {}
    for name, m in models.items():
        Q, scale = quantize(m['W'])
        b = np.asarray(m['b'], dtype=np.float32)
        blob = m['rows'].astype('<u4').tobytes() + scale.astype('<f4').tobytes() + b.astype('<f4').tobytes() + Q.tobytes(order='C')
        blob += b'\0' * ((4 - len(blob) % 4) % 4)
        header['models'][name] = {'labels': m['labels'], 'rows': int(len(m['rows'])), 'offset': len(payload)}
        payload += blob
        blobs[name] = (m['rows'], Q, scale, b)
    hb = json.dumps(header, separators=(',', ':')).encode('utf-8')
    hb += b' ' * ((4 - (8 + len(hb)) % 4) % 4)
    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, 'wb') as f:
        f.write(b'TSH2')
        f.write(struct.pack('<I', len(hb)))
        f.write(hb)
        f.write(payload)
    log(f'wrote {args.out} ({os.path.getsize(args.out) / 1e6:.2f} MB): ' +
        ', '.join(f'{n}={len(m["rows"])}x{len(m["labels"])}' for n, m in models.items() if not n.startswith('intent:')) +
        f', {len(intents)} intent models ({sum(len(m["rows"]) * len(m["labels"]) for m in intents.values())} weights)')

    # ---------------- parity fixture (JS inference must reproduce these probabilities) ----------------
    def q_proba(name, feats):
        rws, Q, scale, b = blobs[name]
        pos = {int(r): k for k, r in enumerate(rws)}
        z = b.astype(np.float64).copy()
        for k, v in feats:
            if k in pos:
                z += v * Q[pos[k]].astype(np.float64) * scale.astype(np.float64)
?? review/r8-claude.md
?? review/r8-codex.md

exec
/bin/bash -lc "node --input-type=module <<'NODE'
import {readFileSync} from 'node:fs';
import {vectorize} from './src/features.js';
import {isDev} from './scripts/hybrid/export_data.js';
import {exclusionIndex} from './scripts/lib/heldout.js';
const read=p=>readFileSync(p,'utf8').trim().split('\\n').map(JSON.parse);
const x=exclusionIndex(process.cwd());const dev=read('data/ood.jsonl').filter(r=>isDev(r.text)&&"'!x.has(r.text));
const a=read('"'build/adev/build/cls.jsonl');const fs=new Set(a.filter(r=>r.g==='ood').map(r=>JSON.stringify(r.f)));
let n=0;for(const r of dev){let hit=false;for(const shell of ['bash','zsh','sh','powershell','fish','cmd']) for(const os of ['linux','darwin','win32']) {const f=[...vectorize(r.text,1<<18,["'`shell=${shell}`,`os=${os}`])].sort((a,b)=>a[0]-b[0]).map(([k,v])=>[k,+v.toFixed(6)]);if(fs.has(JSON.stringify(f)))hit=true;}if(hit)n++;}
console.log(`${n}/${dev.length} hybrid OOD dev originals have exact feature rows in existing A_dev training artifact`);
NODE' in /workspace/tellsh
 succeeded in 1641ms:
23/23 hybrid OOD dev originals have exact feature rows in existing A_dev training artifact

codex
I confirmed two issues: history parsing drops `git -C` and Docker context options before reusing targets, and all 23 original out-of-domain dev sentences appear in the shadow model’s training artifact. Twelve selected test files passed; a shell quoting test was blocked by the sandbox (`spawnSync bash EPERM`).
exec
/bin/bash -lc "sed -n '1,240p' scripts/teacher.js && cat scripts/lib/jev.js" in /workspace/tellsh
 succeeded in 0ms:
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
    .map((r) => ({ r, qs: { o: { type: 'noul', instructions: { question: 'Is this a request to do something on the computer that a shell command (bash, PowerShell, ...) could carry out — find, list, show, change, delete, kill, install, check something?', request: r.text } } } }));
  const oodAns = await askPacked(oodItems, +arg('per', 4), 'label-ood');
  const oodAcc = [];
  const oodRej = [];
  oodItems.forEach((it, j) => { const p = oodAns[j]?.o?.noul; if (p == null) { failed++; return; } (p < 0.3 ? oodAcc : oodRej).push({ text: it.r.text, lang: it.r.lang, p }); });
  writeJsonl(join(ROOT, 'data', 'ood_teacher.jsonl'), oodAcc.map(({ text, lang }) => ({ text, lang })));
  writeJsonl(join(TDIR, 'ood_rejected.jsonl'), oodRej);
  const hard = accepted.filter((r) => r.hard).length;
  const s = { candidates: cands.length, accepted: accepted.length, rejected: rejected.length, failed, optionsModelSha256: optionsModelSha, modelDisagreedOnAccepted: hard,
    ood: { candidates: oodItems.length, accepted: oodAcc.length, rejected: oodRej.length },
    byLang: Object.fromEntries(['en', 'pl'].map((l) => [l, accepted.filter((r) => r.lang === l).length])),
    byShell: accepted.reduce((m, r) => ((m[r.shell || 'bash'] = (m[r.shell || 'bash'] || 0) + 1), m), {}) };
  writeFileSync(join(TDIR, 'label_summary.json'), JSON.stringify(s, null, 1) + '\n');
  console.log(`label: accepted ${accepted.length}/${cands.length} (${hard} the current model got wrong), rejected ${rejected.length} -> data/teacher/label_rejected.jsonl`);
  recordLedger('label');
}

// ---------------------------------------------------------------------------------------------
// (c) hard negatives: contrastive rewrites of training rows across confusable intents
async function mine() {
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
/bin/bash -lc 'git diff 0d87457..HEAD -- src/slots.js src/tagger.js src/compose.js' in /workspace/tellsh
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
diff --git a/src/slots.js b/src/slots.js
index fb80f79..f3f9723 100644
--- a/src/slots.js
+++ b/src/slots.js
@@ -72,6 +72,26 @@ const KNOWN_PKGS = new Set(('htop curl wget git vim nano tmux jq nodejs npm pyth
   'traceroute dnsutils whois unzip zip p7zip ripgrep fd-find bat fzf golang rustc ruby php sqlite3 postgresql ' +
   'redis nginx apache2 mc lm-sensors iotop iftop nethogs rsync gnupg imagemagick').split(' '));
 
+// package.json script names and command-line tools people ask about (npm run X, X --version, X --help)
+const KNOWN_SCRIPTS = new Set(('dev start build test lint typecheck type-check preview serve watch format e2e deploy ' +
+  'storybook coverage clean release prepare check bench docs generate migrate seed test:unit test:e2e build:prod').split(' '));
+const KNOWN_TOOLS = new Set(('node nodejs npm npx pnpm yarn bun deno python python3 pip pip3 uv poetry pytest git gh docker ' +
+  'kubectl helm terraform ansible go rustc cargo rustup java javac mvn gradle kotlin ruby gem perl php composer ' +
+  'dotnet gcc g++ clang cmake make ffmpeg curl wget jq yq tmux vim nvim code wrangler vercel netlify heroku modal ' +
+  'gcloud aws az firebase flyctl supabase claude codex ollama openssl sqlite3 psql mysql redis-cli nginx tsc eslint ' +
+  'prettier vite webpack brew apt rsync ssh zsh bash fish pwsh powershell').split(' '));
+const SCRIPT_SYNONYMS = [
+  [/\b(dev|development|developerski\w*|deweloperski\w*|devserver)\b/, 'dev'],
+  [/\b(tests?|testy|testow|testami|unit tests?)\b/, 'test'],
+  [/\b(build|zbuduj\w*|zbudowa\w*|budowanie|zbuildu\w*|buildu|builda)\b/, 'build'],
+  [/\b(lint\w*|linter\w*)\b/, 'lint'],
+  [/\b(typecheck|type-check|sprawdzanie typow|type check)\b/, 'typecheck'],
+];
+// words between the install verb and the package name ("install globally the typescript package with npm")
+const PKG_SKIP = new Set(('globally globalnie global -g --global system-wide systemowo package pakiet pakietu paczke paczka ' +
+  'paczki module modul modulu library biblioteke biblioteka biblioteki lib npm pip pip3 python python3 via using przez ' +
+  'uzywajac z za pomoca pomoca the a an with from w do for dla mi sobie').split(' '));
+
 // words that are never a slot value
 const STOP = new Set(('the a an all any every some my me mi this that these those of for to in on at by with from ' +
   'named called name nazwie nazwa nazwany nazwana o process processes proces procesy procesu procesow program ' +
@@ -89,12 +109,18 @@ const STOP = new Set(('the a an all any every some my me mi this that these thos
   'moim mojego moj moja moje mojej mojego twoim your exactly dokladnie somewhere gdzies anywhere ma byc być').split(' '));
 export const isStopWord = (w) => STOP.has(foldKeepLength(String(w)).toLowerCase());
 
+// whole-disk phrases -> the filesystem root ('/'; rendered as C:\ for PowerShell/cmd on Windows).
+// Runs on folded text: "na całym dysku" -> "na calym dysku", "całego dysku" -> "calego dysku".
+export const ROOT_LOCATION = /\b(whole (system|disk|drive|filesystem|computer)|entire (system|disk|drive|filesystem|computer)|root (dir(ectory)?|folder|filesystem)|cal\w* (system\w*|dysk\w*|komputer\w*)|(?:na|po) (?:cal\w* )?dysku(?!\s+[a-z]:)|on (?:the |my |this )?(?:whole |entire )?(?:disk|drive|hard drive|hdd|ssd)(?!\s+[a-z]:)|everywhere|wszedzie|katalog\w* glown\w*)\b/;
+// tagger span on a bare disk noun ("dysku", "disk"): the phrase ending at the span decides
+export const ROOT_PHRASE_END = /(?:\b(?:whole|entire|cal\w*)\s+(?:dysk\w*|disk|drive|system\w*|filesystem|komputer\w*|computer)|\b(?:na|po)\s+(?:cal\w*\s+)?dysku|\bon(?: the| my| this)?(?: whole| entire)?\s+(?:disk|drive))$/;
+
 const LOCATIONS = [
   [/\b(home dir(ectory)?|home folder|my home|katalog\w* domow\w*|folder\w* domow\w*|domow\w* (katalog|folder)\w*|w domu|\$home)\b/, '~'],
   [/\b(downloads?( folder| dir(ectory)?)?|pobrane|pobranych|folder\w* pobrane)\b/, '~/Downloads'],
   [/\b(desktop|pulpit\w*)\b/, '~/Desktop'],
   [/\b(documents|dokumenty|dokumentach|dokumentow)\b/, '~/Documents'],
-  [/\b(whole (system|disk|drive|filesystem|computer)|entire (system|disk|drive|filesystem|computer)|root (dir(ectory)?|folder|filesystem)|cal\w* (system\w*|dysk\w*|komputer\w*)|everywhere|wszedzie|katalog\w* glown\w*)\b/, '/'],
+  [ROOT_LOCATION, '/'],
   [/\b(current (dir(ectory)?|folder)|this (dir(ectory)?|folder)|here|tutaj|tu|biezac\w* (katalog|folder)\w*|tym (katalogu|folderze)|obecn\w* (katalog|folder)\w*|aktualn\w* (katalog|folder)\w*)\b/, '.'],
   [/\b(var log|system logs? dir(ectory)?|katalog\w* (z )?logami|katalog\w* logow)\b/, '/var/log'],
 ];
@@ -144,7 +170,29 @@ export function durationDerived(amount, unit) {
   return { minutes, days, age, since };
 }
 
-const PATH_TOKEN = /(?:^|[\s(=,])([A-Za-z]:\\[^\s,;"'()]*|\\\\[^\s,;"'()]+|(?:~|\.{1,2})?\/[^\s,;:"'()]*|~(?=[\s,;]|$)|(?:[\w@+-][\w.@+-]*\/)+[\w.@+-]*|[\w@+-][\w@+-]*(?:\.[\w-]+)*\.[A-Za-z][A-Za-z0-9]{0,4}(?:\.[a-z0-9]{1,3})?)(?=$|[\s,;:!?)])/g;
+// Paths keep every character up to the next whitespace/quote: `backup(2)`, `photos,2019`, `site;old`,
+// `a:b.txt` and `cache/..` are real names. Sentence punctuation after the path is removed by
+// trimPathPunct, which never removes a character that could be part of the name.
+const PATH_TOKEN = /(?:^|[\s(=,])([A-Za-z]:\\[^\s"']*|\\\\[^\s"']+|(?:~|\.{1,2})?\/[^\s"']*|~(?=[\s,;:!?)]|$)|(?:[\w@+-][\w.@+-]*\/)+[^\s"']*|[\w@+-][\w@+-]*(?:\.[\w-]+)*\.[A-Za-z][A-Za-z0-9]{0,4}(?:\.[a-z0-9]{1,3})?)(?=$|[\s,;:!?).])/g;
+
+const countOf = (s, c) => s.split(c).length - 1;
+/**
+ * Remove sentence punctuation that follows a path: trailing , ; : ! ?, a `)` without a matching `(`
+ * inside the path, and a single sentence-final `.` right after a file extension (`/tmp/a.txt.`).
+ * Everything else is kept exactly as written: `/tmp/data.`, `~/old...` and `/tmp/cache/..` are not
+ * shortened, so a (destructive) command never silently moves to another path such as a parent.
+ */
+export function trimPathPunct(p) {
+  let s = String(p);
+  for (;;) {
+    const before = s;
+    s = s.replace(/[,;:!?]+$/, '');
+    if (s.length > 1 && s.endsWith(')') && countOf(s, ')') > countOf(s, '(')) s = s.slice(0, -1);
+    if (s === before) break;
+  }
+  if (/[^./\\]\.[A-Za-z][A-Za-z0-9]{0,4}\.$/.test(s)) s = s.slice(0, -1);
+  return s;
+}
 
 /**
  * @returns object with: quoted[], urls[], hosts[], target, paths[], count, size, duration, port, pid, mode,
@@ -209,7 +257,7 @@ export function extractSlots(input) {
     const found = [];
     while ((m = PATH_TOKEN.exec(work))) {
       const start = m.index + m[0].length - m[1].length;
-      const raw = text.slice(start, start + m[1].length).replace(/[.]+$/, '');
+      const raw = trimPathPunct(text.slice(start, start + m[1].length));
       if (!raw) continue;
       if (/^\d+([.,]\d+)*$/.test(raw)) continue; // version/number
       if (/^\d+(\.\d+)?[kmgt]i?b?$/i.test(raw)) continue; // size like 1.5GB
@@ -240,6 +288,7 @@ export function extractSlots(input) {
   for (const [re, val] of LOCATIONS) {
     const m = work.match(re);
     if (m) {
+      if (re === ROOT_LOCATION) out.rootPhrase = true;
       spans.push([m.index, val]);
       mark('PATH', m.index, m.index + m[0].length, val);
       work = blank(work, m.index, m.index + m[0].length);
@@ -364,7 +413,8 @@ export function extractSlots(input) {
   }
   // 15. remaining numbers -> count
   {
-    const numMs = [...work.matchAll(/(?<![\w.])(\d+)(?![\w.])/g)];
+    // "-9" is an option/signal, never a count or a PID ("kill process named -9")
+    const numMs = [...work.matchAll(/(?<![\w.-])(\d+)(?![\w.])/g)];
     const nums = numMs.map((m) => +m[1]);
     out.numbers = nums;
     out.numberSpans = numMs.map((m) => ({ type: 'NUM', start: m.index, end: wordEnd(text, m.index), value: +m[1] }));
@@ -423,8 +473,9 @@ const TRIG = {
   service: set('service services usluga usluge uslugi usluga serwis serwisu serwisy daemon demon demona unit restart restartuj zrestartuj start uruchom wystartuj stop zatrzymaj status stan enable wlacz wlaczyc wylacz disable logs logi logow logach of for dla journal journalctl reload przeladuj'),
   container: set('container kontener kontenera kontenerze kontenerow logs logi logow exec into do stop zatrzymaj shell bash sh wejdz enter'),
   pkg: set('install zainstaluj instaluj doinstaluj package pakiet pakietu paczke paczka installed zainstalowany zainstalowane zainstalowana apt brew mam have'),
-  cmd: set('which where gdzie location lokalizacja path sciezka sciezke command komenda komendy polecenie polecenia binary binarka executable program programu jest is'),
-  var: set('variable zmienna zmiennej zmiennych env value wartosc printenv echo'),
+  cmd: set('which where gdzie location lokalizacja path sciezka sciezke command komenda komendy polecenie polecenia binary binarka executable program programu jest is version wersja wersje wersji help pomoc usage manual flags flagi options opcje'),
+  script: set('run uruchom odpal odpalic puść pusc wykonaj execute script skrypt skryptu skrypty npm'),
+  var: set('variable zmienna zmiennej zmiennych env value wartosc printenv echo secret sekret sekretu put'),
   branch: set('branch branchu brancha branchem branche galaz galezi galezia checkout switch przelacz przelaczyc przejdz -b called named nazwie na to do delete usun skasuj'),
   user: set('user uzytkownik uzytkownika uzytkownikowi owner wlasciciel wlasciciela to dla na chown byc'),
   pattern: set('for containing contains contain word text phrase string pattern grep szukaj wyszukaj poszukaj slowo slowa tekst tekstu fraze fraza frazy zawierajace zawierajacy zawierajacych zawieraja zawiera zawierajace ciag wystapienia occurrences mentions mention wzmianki find znajdz search'),
@@ -432,11 +483,18 @@ const TRIG = {
   target: set('ssh connect polacz polaczyc zaloguj login log to do na into server serwer serwera'),
 };
 
+// option words of a search request, never its pattern ("grep for ~/foo recursively in src")
+const OPTION_WORDS = ['recursively', 'recursive', 'rekurencyjnie', 'everywhere', 'wszedzie', 'case', 'insensitive', 'case-insensitive',
+  'case-insensitively', 'case-sensitive', 'insensitively', 'ignoring', 'ignore', 'sensitive', 'only', 'tylko', 'files', 'pliki', 'plikach',
+  'lines', 'linie', 'liniach'];
+const PATTERN_SKIP = new Set([...STOP, ...OPTION_WORDS]);
+/** A word that describes how to search ("case-insensitive", "recursively"), not what to search for. */
+export const isOptionWord = (w) => OPTION_WORDS.includes(foldKeepLength(String(w)).toLowerCase());
 const BRANCH_STOP = new Set([...STOP, 'on', 'off', 'and', 'then', 'git', 'switch', 'checkout', 'create', 'utworz', 'stworz', 'zrob', 'make', 'go', 'idz',
   'origin', 'upstream', 'remote', 'istniejaca', 'istniejacy', 'existing', 'nowa', 'nowy', 'the']);
 const BRANCH_STRONG = set('branch branchu brancha branchem galaz galezi galezia -b checkout switch named called nazwie');
 
-const TAG_OF = { name: 'NAME', service: 'NAME', container: 'NAME', pkg: 'NAME', cmd: 'NAME', branch: 'BRANCH',
+const TAG_OF = { name: 'NAME', service: 'NAME', container: 'NAME', pkg: 'NAME', cmd: 'NAME', script: 'NAME', branch: 'BRANCH',
   user: 'USER', pattern: 'PATTERN', message: 'MSG', var: 'VAR', text: 'TEXT' };
 
 // tagger-only mode (ex built by src/tagger.js exFromSpans): values come from tagged spans, no regex fallback
@@ -449,15 +507,16 @@ function taggedArg(slot, ex) {
     return host ? (user ? `${user}@${host}` : host) : null;
   }
   const t = TAG_OF[slot];
-  const v = (t && ex.tagged[t]?.[0]) ?? null;
+  const v = (t && (slot === 'pattern' ? ex.tagged[t]?.find((x) => !isOptionWord(x)) : ex.tagged[t]?.[0])) ?? null;
   return slot === 'service' && v ? v.replace(/\.service$/, '') : v;
 }
 
 export function pickArg(slot, ex) {
   if (ex.taggerOnly) return taggedArg(slot, ex);
   const { quoted, words, text } = ex;
-  const vocab = slot === 'service' ? KNOWN_SERVICES : slot === 'pkg' ? KNOWN_PKGS : (slot === 'name' || slot === 'container') ? KNOWN_PROCS : null;
-  if (['pattern', 'message', 'text', 'name', 'service', 'container', 'pkg', 'cmd', 'branch', 'user'].includes(slot) && quoted.length) {
+  const vocab = slot === 'service' ? KNOWN_SERVICES : slot === 'pkg' ? KNOWN_PKGS : (slot === 'name' || slot === 'container') ? KNOWN_PROCS
+    : slot === 'script' ? KNOWN_SCRIPTS : slot === 'cmd' ? KNOWN_TOOLS : null;
+  if (['pattern', 'message', 'text', 'name', 'service', 'container', 'pkg', 'cmd', 'branch', 'user', 'script'].includes(slot) && quoted.length) {
     return quoted[0];
   }
   if (slot === 'var') {
@@ -492,6 +551,24 @@ export function pickArg(slot, ex) {
     if (m && !/^(base64|to|this|it|in)\b/i.test(m[1])) return m[1].trim();
     return null;
   }
+  if (slot === 'pkg') {
+    // "pip install requests", "npm i -g typescript": the installer is not the package, unless nothing else is named
+    // ("install npm"); a tool word right before the install verb is always the installer ("npm install")
+    const cmdLike = text.match(/\b(?:npm|pnpm|yarn|bun|pip3?|pipx|uv pip)\s+(?:i|install|add)\s+(?:(?:-[gDU]|--global|--save-dev|--upgrade|--user)\s+)*(@?[\w][\w.@\/=<>~+-]*)(?=\s|$)/i);
+    if (cmdLike && !/^-/.test(cmdLike[1])) return cmdLike[1];
+    // `npm install @types/node%x`: an operand that is not a package name is returned as it is, so validation rejects it
+    // and the command shows a placeholder (never a plain `npm install`)
+    const odd = text.match(/\b(?:npm|pnpm|yarn|bun|pip3?|pipx|uv pip)\s+(?:i|install|add)\s+(?:(?:-[gDU]|--global|--save-dev|--upgrade|--user)\s+)*([^\s-]\S*)/i);
+    if (odd) return odd[1];
+    // an npm scoped package (`@types/node`) is the package wherever it stands ("install @types/node with npm")
+    const scoped = text.match(/(?:^|\s)(@[\w.-]+\/[\w.-]+(?:@[\w.^~<>=*-]+)?)(?=\s|$)/);
+    if (scoped) return scoped[1];
+    for (const w of words) if (vocab.has(w) && !PKG_SKIP.has(w)) return original(text, w);
+    const r = nextAfter(words, TRIG.pkg, { skip: new Set([...STOP, ...PKG_SKIP]), accept: /^@?[\w.+-]+(?:\/[\w.+-]+)?(?:[=@<>~]=?[\w.*-]+)?$/ });
+    if (r) return original(text, r.word);
+    const i = words.findIndex((w, k) => vocab.has(w) && !/^(install|i|add|uninstall|zainstaluj|instaluj)$/.test(words[k + 1] || ''));
+    return i >= 0 ? original(text, words[i]) : null;
+  }
   if (vocab) {
     for (const w of words) if (vocab.has(w)) return original(text, w);
     // Polish inflection of a known name: "procesy javy" -> java, "logi nginxa" -> nginx, "chroma" -> chrome
@@ -504,8 +581,16 @@ export function pickArg(slot, ex) {
     const p = ex.paths.find((x) => /^[\w-]+\/[\w./-]+$/.test(x));
     return p || null;
   }
+  if (slot === 'script') {
+    // "dev server" / "serwer deweloperski" -> dev, "tests" / "testy" -> test, "zbuduj" -> build, ...
+    for (const [re, name] of SCRIPT_SYNONYMS) if (re.test(ex.rest ?? text)) return name;
+    // an unknown name only when the request calls it a script ("run the storybook:ci script", "skrypt deploy-all")
+    if (!/\b(scripts?|skrypt\w*|npm run)\b/.test(ex.rest ?? text)) return null;
+    const r = nextAfter(words, TRIG.script, { skip: new Set([...STOP, 'npm', 'script', 'skrypt', 'skryptu', 'the']), accept: /^[\w:.-]+$/ });
+    return r ? original(text, r.word) : null;
+  }
   if (slot === 'pattern') {
-    const r = nextAfter(words, TRIG.pattern, { accept: /^[\w@.:/+-]+$/ });
+    const r = nextAfter(words, TRIG.pattern, { skip: PATTERN_SKIP, accept: /^[\w@.:/+-]+$/ });
     return r ? original(text, r.word) : null;
   }
   const trig = TRIG[slot];
diff --git a/src/tagger.js b/src/tagger.js
index a24d6c3..3027a45 100644
--- a/src/tagger.js
+++ b/src/tagger.js
@@ -3,7 +3,7 @@
 // I-X may only follow B-X / I-X. Tagged spans are normalised with the regex parsers in slots.js.
 import { tagTokens, tagFeatures } from './features.js';
 import { logits } from './model.js';
-import { extractSlots, KNOWN_EXT, EXT_ALIASES, KNOWN_PROCS, KNOWN_SERVICES, foldKeepLength, isStopWord, deinflect } from './slots.js';
+import { extractSlots, KNOWN_EXT, EXT_ALIASES, KNOWN_PROCS, KNOWN_SERVICES, foldKeepLength, isStopWord, deinflect, trimPathPunct, ROOT_PHRASE_END } from './slots.js';
 import { familyTags } from './tools.js';
 import { BY_ID } from './catalog.js';
 
@@ -13,12 +13,15 @@ export const allowedTags = (tool) => {
   return FAM_TAGS[tool] || new Set(['PATH', 'NUM']);
 };
 
+/** Training (scripts/train.py load_tag) uses each token's *set* of feature indices: dedupe the same way. */
+export const tagFeatureSets = (toks, tool, dim) => tagFeatures(toks, tool, dim).map((f) => [...new Set(f)]);
+
 /** -> { tokens, labels, spans: [{type, start, end, text}] } */
 export function tag(text, tool, model) {
   const m = model.models.tagger;
   const toks = tagTokens(text);
   if (!toks.length || !m) return { tokens: toks, labels: [], spans: [] };
-  const feats = tagFeatures(toks, tool, model.tagDim);
+  const feats = tagFeatureSets(toks, tool, model.tagDim);
   const L = m.labels;
   const allowed = allowedTags(tool);
   const ok = L.map((l) => l === 'O' || allowed.has(l.slice(2)));
@@ -103,14 +106,39 @@ export function labelsToSpans(text, toks, labels) {
 // generic nouns the tagger sometimes marks as a bare directory name ("ile zajmuje folder /etc")
 const GENERIC = /^(folder\w*|katalog\w*|director(y|ies)|dirs?|files?|plik\w*|archiw\w*|archives?|the|this|that|ten|ta|to|tego|tym|it|path|sciezk\w*|repo|project|projekt\w*|system\w*|dysk\w*|disk|location|lokalizacj\w*|miejsc\w*)$/;
 
+/**
+ * Span text -> path value, or null. The value must represent the *whole* span: a path that the regex
+ * parser only recognises in part (`~/Downloads/backup(2)` -> `~/Downloads`) is rejected rather than
+ * shortened to a parent or to a named location inside it.
+ */
 export function normPath(s) {
-  const t = s.replace(/[.,;:!?]+$/, '');
+  const t = trimPathPunct(String(s).trim());
+  if (!t) return null;
   if (GENERIC.test(foldKeepLength(t).toLowerCase())) return null;
   const ex = extractSlots(t);
-  if (ex.paths.length === 1) return ex.paths[0];
-  if (/^[\w~./@+-][\w~./@+ -]*$/.test(t) && !/\s/.test(t)) return t;
+  const ps = ex.spans.filter((x) => x.type === 'PATH');
+  if (ex.paths.length === 1 && ps.length === 1) {
+    const covered = t.slice(ps[0].start, ps[0].end).trim();
+    // the recognised path (or named location phrase) must be the entire span, give or take filler words
+    const rest = (t.slice(0, ps[0].start) + ' ' + t.slice(ps[0].end)).trim();
+    if (covered && (!rest || /^[\p{L}\s]+$/u.test(rest))) return ex.paths[0];
+  }
+  if (/^[\w~./@+-][\w~./@+-]*$/.test(t)) return t;
   return null;
 }
+
+// tagger tokens peel `(`, `)`, `,`, `.` ... off a word; a path span is widened back to the whole
+// whitespace-delimited word so `backup(2)` or `cache/..` is not cut short.
+function pathChunk(text, sp) {
+  let a = sp.start;
+  let b = sp.end;
+  while (a > 0 && !/\s/.test(text[a - 1])) a--;
+  while (b < text.length && !/\s/.test(text[b])) b++;
+  let chunk = text.slice(a, b);
+  const lead = chunk.match(/^[(\[{"'„“`]+/)?.[0].length || 0;
+  chunk = chunk.slice(lead).replace(/["'”`]+$/, '');
+  return { text: chunk, start: a + lead, end: a + lead + chunk.length };
+}
 export function normExt(s) {
   const t = foldKeepLength(s).replace(/^\*?\./, '').toLowerCase();
   if (KNOWN_EXT.has(t)) return t;
@@ -142,12 +170,25 @@ const unquote = (s) => s.replace(/^["'„“`](.*)["'”`]$/s, '$1');
  * resolveSlots() logic can map it onto an intent. Invalid span values are dropped here (validation).
  */
 export function exFromSpans(text, spans) {
-  const ex = { text, quoted: [], urls: [], hosts: [], paths: [], pathsWithQuoted: [], numbers: [], words: [], rest: '', tagged: {}, taggerOnly: true, spans };
+  const ex = { text, quoted: [], urls: [], hosts: [], paths: [], pathsWithQuoted: [], numbers: [], words: [], rest: '', tagged: {}, taggerOnly: true, spans, rejectedPaths: [] };
   const push = (k, v) => { (ex.tagged[k] ??= []).push(v); };
   for (const sp of spans) {
     const raw = unquote(sp.text.trim());
     switch (sp.type) {
-      case 'PATH': { const p = sp.quoted ? raw : normPath(raw); if (p) { ex.paths.push(p); ex.pathsWithQuoted.push(p); } break; }
+      case 'PATH': {
+        let p;
+        if (sp.quoted) p = raw;
+        else {
+          const ch = pathChunk(text, sp);
+          // "na (całym) dysku", "on (the) disk", "whole drive": the filesystem root
+          const upto = foldKeepLength(text.slice(0, ch.end)).toLowerCase().replace(/[.,;:!?]+$/, '');
+          if (ROOT_PHRASE_END.test(upto)) { p = '/'; ex.rootPhrase = true; } else p = normPath(ch.text);
+          // a path-looking word we cannot represent exactly: nothing (placeholder), never a part of it
+          if (!p && /[\\/~.]/.test(ch.text) && !GENERIC.test(foldKeepLength(ch.text).toLowerCase())) ex.rejectedPaths.push(ch);
+        }
+        if (p) { ex.paths.push(p); ex.pathsWithQuoted.push(p); }
+        break;
+      }
       case 'NUM': { const n = normNum(raw); if (n != null) { ex.numbers.push(n); ex.count ??= n; } break; }
       case 'SIZE': { const e = extractSlots(raw); if (e.size) ex.size ??= e.size; break; }
       case 'TIME': { const e = extractSlots(raw); if (e.duration) ex.duration ??= e.duration; break; }

exec
/bin/bash -lc 'cat scripts/real/prepare_real.js scripts/real/real_rows.js && cat scripts/hybrid/train_lm_gpu.py' in /workspace/tellsh
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
// Shared loader for the private real-usage rows (build/real/rows.jsonl from scripts/real/prepare_real.js).
// gen_data.js (A) and hybrid/export_data.js (B) take the SAME capped training subset; every eval-split text is
// held out from both. Missing file (no private data) -> no rows.
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fnv1a } from '../../src/features.js';

// at most CAP rows per intent and language (sed -n line ranges alone are ~2500 rows), chosen by a text hash
export const CAP = 120;

export function readReal(root) {
  const p = join(root, 'build', 'real', 'rows.jsonl');
  return existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)) : [];
}

export const realEvalTexts = (rows) => rows.filter((r) => r.split === 'eval').map((r) => r.text);

/** Labelled train-split rows, capped -> [{text, intent, lang, shell, os, src: 'real'}] */
export function realTrain(rows, ids, cap = CAP) {
  const n = {};
  return rows.filter((r) => r.split === 'train' && r.intent && ids.has(r.intent))
    .map((r) => ({ r, k: fnv1a('real:' + r.text) })).sort((a, b) => a.k - b.k).map(({ r }) => r)
    .filter((r) => (n[r.intent + r.lang] = (n[r.intent + r.lang] || 0) + 1) <= cap)
    .map((r) => ({ text: r.text, intent: r.intent, lang: r.lang, shell: r.shell, os: r.os, src: 'real' }));
}
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
        for i in range(0, len(train) - a.bs + 1, a.bs):
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
/bin/bash -lc "sed -n '440,660p' src/danger.js && sed -n '1,115p' src/history.js" in /workspace/tellsh
 succeeded in 0ms:
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
    const d = checkDanger(c, 'safe', { lenient: true });
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

/** @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}} */
export function checkDanger(command, baseRisk = 'safe', { lenient = false } = {}) {
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
    const d = checkDanger(c, 'safe', { lenient: true });
    for (const m of d.warnings) hit(d.risk, m, d.critical);
  }
  pipelineDeleteCheck(text, hit);
  for (const c of new Set(inner)) {
    if (c === command || !c.trim()) continue;
    const d = checkDanger(c);
    for (const m of d.warnings) hit(d.risk, m, d.critical);
  }
  for (const [re, r, msg, crit] of RULES) if (re.test(text)) hit(r, msg, crit);
  return { risk, warnings, critical };
}
// Shell-history context for reference resolution ("delete it", "to samo dla /var", "logs of that container").
// Only the tail of the history file is read, kept in memory for this one request, and never logged
// or written anywhere.
import { openSync, readSync, fstatSync, closeSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { INTENTS, BY_ID } from './catalog.js';
import { FAMILY_OF } from './tools.js';
import { extractSlots, foldKeepLength, isStopWord } from './slots.js';
import { VARIANTS } from './variants.js';
import { splitCommand, wordsOf, decodeWord, AMB, isAmbiguous, isExpansion, isGlob, rawOf, joinArgs } from './shellwords.js';
import { commandWords, commandChains } from './danger.js';

export { isAmbiguous };

// ---------------------------------------------------------------------------------------------
// reading

export function historyCandidates(shell, env = process.env, os = process.platform) {
  const home = env.HOME || env.USERPROFILE || homedir();
  const ps = os === 'win32'
    ? join(env.APPDATA || join(home, 'AppData', 'Roaming'), 'Microsoft', 'Windows', 'PowerShell', 'PSReadLine', 'ConsoleHost_history.txt')
    : join(env.XDG_DATA_HOME || join(home, '.local', 'share'), 'powershell', 'PSReadLine', 'ConsoleHost_history.txt');
  const fish = join(env.XDG_DATA_HOME || join(home, '.local', 'share'), 'fish', 'fish_history');
  const byShell = {
    zsh: [['zsh', env.HISTFILE], ['zsh', join(home, '.zsh_history')], ['zsh', join(home, '.zhistory')]],
    bash: [['bash', env.HISTFILE], ['bash', join(home, '.bash_history')]],
    sh: [['bash', env.HISTFILE], ['bash', join(home, '.sh_history')], ['bash', join(home, '.ash_history')], ['bash', join(home, '.bash_history')]],
    fish: [['fish', fish]],
    powershell: [['pwsh', ps]],
    cmd: [],
  };
  const order = [...(byShell[shell] || []), ...byShell.bash, ...byShell.zsh];
  const seen = new Set();
  return order.filter(([, p]) => p && !seen.has(p) && seen.add(p));
}

function readTail(path, maxBytes = 32768) {
  const fd = openSync(path, 'r');
  try {
    const size = fstatSync(fd).size;
    const len = Math.min(size, maxBytes);
    const buf = Buffer.alloc(len);
    readSync(fd, buf, 0, len, size - len);
    return { buf, partial: size > len };
  } finally {
    closeSync(fd);
  }
}

// zsh "metafies" bytes >= 0x83: Meta (0x83) followed by byte ^ 0x20
function unmetafy(buf) {
  const out = [];
  for (let i = 0; i < buf.length; i++) {
    if (buf[i] === 0x83 && i + 1 < buf.length) { out.push(buf[++i] ^ 0x20); } else out.push(buf[i]);
  }
  return Buffer.from(out);
}

/** Parse raw history text into commands (oldest first). kind: bash | zsh | fish | pwsh */
export function parseHistory(text, kind = 'bash', { partial = false } = {}) {
  let lines = text.split(/\r?\n/);
  if (partial) lines = lines.slice(1); // first line may be cut in the middle
  const cmds = [];
  if (kind === 'fish') {
    for (const l of lines) {
      const m = l.match(/^- cmd: (.*)$/);
      if (m) cmds.push(m[1].replace(/\\n/g, '\n').replace(/\\\\/g, '\\'));
    }
    return cmds;
  }
  let cur = null;
  for (let l of lines) {
    if (kind === 'bash' && /^#\d{9,}$/.test(l)) continue; // HISTTIMEFORMAT timestamps
    if (kind === 'zsh' && cur === null) l = l.replace(/^: \d+:\d+;/, ''); // extended history
    const cont = kind === 'pwsh' ? /`$/.test(l) : /\\$/.test(l);
    const body = cont ? l.slice(0, -1) : l;
    cur = cur === null ? body : cur + '\n' + body;
    if (!cont) {
      if (cur.trim()) cmds.push(cur.trim());
      cur = null;
    }
  }
  return cmds;
}

/** Last `n` commands from the user's history file (or from `file`; default 2: the previous command and the running `tellsh` line some shells write first). Returns [] when unavailable. */
export function loadHistory({ shell = 'bash', file, n = 2, env = process.env, os = process.platform } = {}) {
  const cands = file ? [[/zsh/.test(file) ? 'zsh' : /fish/.test(file) ? 'fish' : /PSReadLine/i.test(file) ? 'pwsh' : 'bash', file]]
    : historyCandidates(shell, env, os);
  for (const [kind, path] of cands) {
    try {
      if (!existsSync(path)) continue;
      const { buf, partial } = readTail(path);
      const text = (kind === 'zsh' ? unmetafy(buf) : buf).toString('utf8');
      const cmds = parseHistory(text, kind, { partial });
      if (cmds.length) return Object.assign(cmds.slice(-n), { kind: kind === 'pwsh' ? 'pwsh' : 'posix' });
    } catch { /* unreadable: no context */ }
  }
  return [];
}

// ---------------------------------------------------------------------------------------------
// entities from commands
//
// Values are decoded with a shell-aware tokenizer (src/shellwords.js): quotes, escapes (a\ b.txt),
// separators inside quotes, PowerShell '' / ` escapes. A value that depends on shell state ($VAR,
// $(..), unquoted globs) or a line that cannot be interpreted becomes an *ambiguous* entity: it
// still shadows older values of the same type, and a reference to it is refused instead of being
// resolved to a stale or guessed target.

const PS_CMDLET = /^[A-Za-z]+-[A-Za-z]+$/;
const lineKind = (line, kind) => (kind === 'pwsh' || PS_CMDLET.test(String(line).trim().split(/\s/)[0]) ? 'pwsh' : 'posix');
const PATHLIKE = /(?:^|\s)['"]?[~.\w-]*[\\/][\w.-]|\.\w{1,5}(?:['"]?\s|['"]?$)/;
const GLOB_SLOTS = new Set(['namepat', 'glob', 'pattern', 'sedexpr', 'old', 'new', 'text', 'message']);

exec
/bin/bash -lc "node --test --test-name-pattern='the running tellsh|several operands|deleting, editing|a cd after|move it there|the composer|hybrid export|hybrid:|npm scoped' test/regressions9.test.js" in /workspace/tellsh
 succeeded in 745ms:
TAP version 13
# Subtest: /workspace/tellsh/test/regressions9.test.js
ok 1 - /workspace/tellsh/test/regressions9.test.js
  ---
  duration_ms: 679.986764
  ...
1..1
# tests 1
# suites 0
# pass 1
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 688.543276

exec
/bin/bash -lc "nl -ba scripts/gen_data.js | sed -n '211,234p'; nl -ba scripts/hybrid/eval_hybrid.js | sed -n '76,91p'; git diff --check 0d87457..HEAD -- src bin scripts; git status --short" in /workspace/tellsh
 succeeded in 0ms:
   211	  const tldr = readJsonl(join(ROOT, 'data', 'tldr', 'tools.jsonl'));
   212	  const cap = {};
   213	  let nT = 0;
   214	  for (const r of tldr.sort(() => rng() - 0.5)) {
   215	    if (!FAMILIES[r.tool] || !r.text || r.text.length < 8) continue;
   216	    if (leaks(r.text)) continue;
   217	    const key = r.tool + r.lang;
   218	    if ((cap[key] = (cap[key] || 0) + 1) > (r.lang === 'pl' ? 60 : 80)) continue;
   219	    const win = /^windows\//.test(r.page || '');
   220	    emit(r.text, r.tool, '', win ? ['shell=powershell', 'os=win32'] : sampleEnv(), 0.5, 'tldr', r.lang, gid++);
   221	    nT++;
   222	  }
   223	
   224	  // 4. out-of-domain -> __none__
   225	  const ood = [...readJsonl(join(ROOT, 'data', 'ood.jsonl')), ...readJsonl(join(ROOT, 'data', 'ood_teacher.jsonl'))];
   226	  for (const r of ood) {
   227	    if (leaks(r.text)) continue;
   228	    const g = gid++;
   229	    emit(r.text, NONE, '', sampleEnv(), 1, 'ood', r.lang, g);
   230	    emit(typo(r.text), NONE, '', [...sampleEnv(), ...(rng() < 0.25 ? randomCtx() : [])], 1, 'ood', r.lang, g);
   231	  }
   232	
   233	  cls.end();
   234	  tag.end();
    76	  const thr = adev.thresholds.accept;
    77	  const dev = readJsonl(join(ROOT, 'build/hybrid/train.jsonl')).filter((r) => r.split === 'dev' && (r.intent || r.tool === NONE));
    78	  const rows = [];
    79	  for (const r of dev) {
    80	    const env = envOf(r);
    81	    const c = cascade(r.text, { model: adev, extras: envFeatures(env), top: 8 });
    82	    rows.push({ r, c, bo: encoder ? await bOut(r.text, env) : null, lo: LM.get(key(r.text, env)) || null });
    83	  }
    84	  const score = (sys, P) => {
    85	    let ok = 0; let n = 0; let deferred = 0; let ood = 0; let oodRej = 0; let ind = 0; let indOk = 0;
    86	    for (const { r, c, bo, lo } of rows) {
    87	      if (/C/.test(sys) && !lo && c.confidence < P.tau) continue;
    88	      const d = decide(c, sys, P, bo, lo, thr);
    89	      const und = d.confidence >= thr;
    90	      n++;
    91	      if (d.reranked !== undefined || c.confidence < P.tau) deferred++;
?? review/r8-claude.md
?? review/r8-codex.md

codex
- **Major — [src/history.js:606](/workspace/tellsh/src/history.js:606): History targets lose their execution context.** `afterGlobals()` discards scope-changing options before extracting reusable entities. Reproduced:
  - `git -C /repo blame notes.txt` → “delete it” produces `rm notes.txt`, targeting the current directory.
  - `docker --context production logs web` → “stop it” produces `docker stop web`, targeting the default Docker context.
  
  Both are reported as resolved, with no missing slots. Preserve the scope or refuse references whose targets depend on it.

- **Major — [scripts/hybrid/train_a_dev.sh:21](/workspace/tellsh/scripts/hybrid/train_a_dev.sh:21): Hybrid calibration data still leaks into A_dev training.** The injected dev exclusion only covers the intent-row loop; the OOD loader at [scripts/gen_data.js:225](/workspace/tellsh/scripts/gen_data.js:225) bypasses it. All **23/23 original hybrid OOD dev sentences** have exact feature matches in the existing A_dev training artifact. Calibration then uses these sentences to select rejection constraints and fallback thresholds. Exclude dev groups across every training source, rebuild A_dev, and recalibrate.

Read-only review; no files changed. Selected runtime tests passed. The shell round-trip check was blocked by sandbox `EPERM`, so full-suite success was not verified.

VERDICT: REQUEST_CHANGES
tokens used
163,216
- **Major — [src/history.js:606](/workspace/tellsh/src/history.js:606): History targets lose their execution context.** `afterGlobals()` discards scope-changing options before extracting reusable entities. Reproduced:
  - `git -C /repo blame notes.txt` → “delete it” produces `rm notes.txt`, targeting the current directory.
  - `docker --context production logs web` → “stop it” produces `docker stop web`, targeting the default Docker context.
  
  Both are reported as resolved, with no missing slots. Preserve the scope or refuse references whose targets depend on it.

- **Major — [scripts/hybrid/train_a_dev.sh:21](/workspace/tellsh/scripts/hybrid/train_a_dev.sh:21): Hybrid calibration data still leaks into A_dev training.** The injected dev exclusion only covers the intent-row loop; the OOD loader at [scripts/gen_data.js:225](/workspace/tellsh/scripts/gen_data.js:225) bypasses it. All **23/23 original hybrid OOD dev sentences** have exact feature matches in the existing A_dev training artifact. Calibration then uses these sentences to select rejection constraints and fallback thresholds. Exclude dev groups across every training source, rebuild A_dev, and recalibrate.

Read-only review; no files changed. Selected runtime tests passed. The shell round-trip check was blocked by sandbox `EPERM`, so full-suite success was not verified.

VERDICT: REQUEST_CHANGES
