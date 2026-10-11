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
session id: 01a12a01-678c-7f93-8e59-2cee1fc2655d
--------
user
Re-review of tellsh (git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD; runtime src/ bin/, training scripts). History refs are intentionally limited to 1 line back. Read-only. Findings with severity and file:line. End with exactly one line that is either VERDICT: APPROVE (no blocker/major) or VERDICT: REQUEST_CHANGES.
codex
I’ll review the diff and trace the affected runtime and training paths, keeping the review read-only. I’ll report actionable findings with severity and file:line references.
exec
/bin/bash -lc "pwd && rg --files -g 'AGENTS.md' -g '"'!node_modules'"' -g '"'!vendor'"' /workspace 2>/dev/null" in /workspace/tellsh
 succeeded in 0ms:
/workspace/tellsh
/workspace/rubikon/web/public/AGENTS.md
/workspace/whiteboard/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/planets/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/nodejs-server-sparse/AGENTS.md
/workspace/monetization-cnvs-freesign-whenmeet-2026-10-08/repos/whiteboard/AGENTS.md
/workspace/ar-metering/nodejs-server/AGENTS.md
/workspace/ct-landing-2026-10-08/AGENTS.md
/workspace/catchup-2026-10-01/whiteboard-seo/AGENTS.md
/workspace/wearfits-genai-api/AGENTS.md
/workspace/ga4fix-genai-app/AGENTS.md
/workspace/wearfits-genai-app/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/saas/AGENTS.md
/workspace/ar-metering/saas/AGENTS.md
/workspace/funnel-ship-2026-10-08/mg-plus/AGENTS.md
/workspace/planets/AGENTS.md
/workspace/funnel-ship-2026-10-08/mg-plai/AGENTS.md
/workspace/catchup-2026-10-01/multigpt/AGENTS.md
/workspace/funnel-ship-2026-10-08/mg-plugand/AGENTS.md
/workspace/nodejs-server-fix/AGENTS.md
/workspace/rubikon-deploy/web/public/AGENTS.md
/workspace/seo-ship-2026-10-05/planets/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/multigpt/AGENTS.md
/workspace/multigpt/AGENTS.md
/workspace/website2026-retailers/AGENTS.md
/workspace/rubikon-web-deploy/web/public/AGENTS.md
/workspace/wf-nightly-2026-10-10/repo/AGENTS.md
/workspace/nodejs-server-zf/AGENTS.md
/workspace/ga4-conv-2026-10-08/repos/rubikon/web/public/AGENTS.md
/workspace/ga4-conv-2026-10-08/repos/f1pl/f1pl-web/public/data/AGENTS.md
/workspace/ga4-conv-2026-10-08/repos/whiteboard/AGENTS.md
/workspace/zf-requeue/wearfits-genai-app/AGENTS.md
/workspace/zf-requeue/shopify-wearfits/AGENTS.md

exec
/bin/bash -lc 'git status --short && git diff --stat 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD && git diff --name-only 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD' in /workspace/tellsh
 succeeded in 0ms:
?? review/r20-claude.md
?? review/r20-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   543 +-
 HYBRID.md                                    |   617 ++
 README.md                                    |   174 +-
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
 review/.f18done                              |     0
 review/.f19done                              |     0
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
 review/fix18-log.md                          |    29 +
 review/fix19-log.md                          |    27 +
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
 review/r18-claude.md                         |    48 +
 review/r18-codex.md                          |  7397 ++++++++++++++++
 review/r19-claude.md                         |    45 +
 review/r19-codex.md                          |  8667 +++++++++++++++++++
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
 scripts/real/group.js                        |    28 +
 scripts/real/group_leak.js                   |    22 +
 scripts/real/prepare_real.js                 |   160 +
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
 src/fill.js                                  |   215 +-
 src/history.js                               |  1024 ++-
 src/model.js                                 |    22 +-
 src/pipeline.js                              |   474 +-
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
 test/regressions20.test.js                   |   116 +
 test/regressions21.test.js                   |    70 +
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
 222 files changed, 217764 insertions(+), 806 deletions(-)
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
review/.f18done
review/.f19done
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
review/fix18-log.md
review/fix19-log.md
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
review/r18-claude.md
review/r18-codex.md
review/r19-claude.md
review/r19-codex.md
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
scripts/real/group.js
scripts/real/group_leak.js
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
test/regressions20.test.js
test/regressions21.test.js
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
/bin/bash -lc 'cat src/render.js && cat src/shellwords.js' in /workspace/tellsh
exec
/bin/bash -lc 'cat src/pipeline.js' in /workspace/tellsh
 succeeded in 0ms:
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
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- scripts/train.py scripts/gen_data.js scripts/lib/heldout.js scripts/lib/silver.js scripts/hybrid/export_data.js scripts/hybrid/train_encoder.py' in /workspace/tellsh
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
  // "close pr 45 and delete branch", "close pr 45 without merge": refused for gh_pr_merge too, unless the request also asks
  // for the merge ("merge and close pr 45"); "do not merge pr 45", "unmerge pr 45": never `gh pr merge 45`
  const closes = PR_CLOSE.test(query);
  const merges = intent === 'gh_pr_merge' && mergeAsked(query);
  // "revert pr 45": not `gh pr view 45` either
  if (intent?.startsWith('gh_pr_') && /\brevert\w*\b/i.test(query) && !merges) {
    return { ...out, understood: false, method: 'none', hint: 'reverting a pull request is not supported (gh pr revert <PR>)' };
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
/bin/bash -lc 'cat package.json && cat bin/tellsh.js && cat src/cli.js' in /workspace/tellsh
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
#!/usr/bin/env node
import { main } from '../src/cli.js';

// `tellsh … | head -1`: a closed pipe is not an error
for (const s of [process.stdout, process.stderr]) s.on('error', (e) => { if (e.code === 'EPIPE') process.exit(process.exitCode ?? 0); throw e; });

main().then((code) => { process.exitCode = code; }, (err) => {
  console.error(`tellsh: ${err?.stack || err}`);
  process.exitCode = 1;
});
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
 
diff --git a/scripts/hybrid/export_data.js b/scripts/hybrid/export_data.js
new file mode 100644
index 0000000..aff003d
--- /dev/null
+++ b/scripts/hybrid/export_data.js
@@ -0,0 +1,144 @@
+#!/usr/bin/env node
+// Export raw-text training data for the hybrid neural models (B: encoder, C: LM reranker).
+// Mirrors scripts/gen_data.js (same sources, same held-out filter, same teacher decisions, same silver spans and
+// relexicalisation) but writes text + char-offset spans instead of hashed features.
+//
+//   build/hybrid/train.jsonl  {text, tool, intent, lang, shell, os, spans:[[type,start,end]], gid, src, split}
+//     split = 'dev' for ~10% of the base sentence groups (all copies of a sentence stay on one side); dev rows are
+//     never used to fit B/C and serve to calibrate the hybrid thresholds.
+//   build/hybrid/meta.json    {tools, intents, intentTool, tagLabels}
+//   build/hybrid/dev_texts.json  every normalized dev text (train rows with one of these texts are dropped)
+import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
+import { join } from 'node:path';
+import { fileURLToPath, pathToFileURL } from 'node:url';
+import { INTENTS } from '../../src/catalog.js';
+import { FAMILIES, FAMILY_OF, NONE, TAG_TYPES } from '../../src/tools.js';
+import { normalize, fnv1a } from '../../src/features.js';
+import { silverSpans, relex, mulberry32 } from '../lib/silver.js';
+import { exclusionIndex } from '../lib/heldout.js';
+import { readReal, realTrain } from '../real/real_rows.js';
+
+const ROOT = fileURLToPath(new URL('../..', import.meta.url));
+const OUT = join(ROOT, 'build', 'hybrid');
+const rng = mulberry32(29);
+const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
+const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);
+
+const SHELL_P = [['bash', 0.35], ['zsh', 0.25], ['sh', 0.07], ['powershell', 0.18], ['fish', 0.08], ['cmd', 0.07]];
+function sampleEnv() {
+  let s = 'bash';
+  let r = rng();
+  for (const [k, p] of SHELL_P) { if ((r -= p) <= 0) { s = k; break; } }
+  let os;
+  if (s === 'cmd') os = 'win32';
+  else if (s === 'powershell') os = rng() < 0.7 ? 'win32' : rng() < 0.5 ? 'linux' : 'darwin';
+  else if (s === 'zsh') os = rng() < 0.6 ? 'darwin' : 'linux';
+  else os = rng() < 0.7 ? 'linux' : 'darwin';
+  return { shell: s, os };
+}
+function typo(text) {
+  const chars = [...text];
+  const idxs = chars.map((c, i) => (/\p{L}/u.test(c) ? i : -1)).filter((i) => i >= 0);
+  if (idxs.length < 4) return text;
+  const i = idxs[1 + Math.floor(rng() * (idxs.length - 2))];
+  const op = rng();
+  if (op < 0.4) chars.splice(i, 1);
+  else if (op < 0.8 && /\p{L}/u.test(chars[i + 1] || '')) [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
+  else chars.splice(i, 0, chars[i]);
+  return chars.join('');
+}
+// typo() shifts offsets, so only the clean / relexicalised copies carry spans
+export const isDev = (text) => fnv1a('dev:' + normalize(text)) % 10 === 0;
+
+/**
+ * The row sink: every emitted row is checked against the held-out index, not only the originals. A typo or
+ * relexicalised copy can be exactly a held-out text ("kill all node processes", "koniec pliku /var/log/syslog").
+ */
+export function heldOutFilter(heldOut) {
+  const out = { rows: [], dropped: 0 };
+  out.push = (o) => { if (heldOut.has(o.text)) out.dropped++; else out.rows.push(o); };
+  return out;
+}
+
+function main() {
+  mkdirSync(OUT, { recursive: true });
+  const ids = new Set(INTENTS.map((i) => i.id));
+  // the same held-out index as gen_data.js (eval / blind sets, near-duplicates, eval-only values, real-usage eval split)
+  const real = process.argv.includes('--no-real') ? [] : readReal(ROOT);
+  const excl = exclusionIndex(ROOT);
+  const heldOut = { has: (n) => excl.has(n) };
+  const intentRows = [...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'train.jsonl'))].map((r) => ({ ...r, src: 'intents' }));
+  const shellRows = readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell' }));
+  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl')).filter((d) => d.text && d.field !== 'risk');
+  const decide = new Map(decisions.map((d) => [normalize(d.text), d]));
+  const seen = new Set();
+  const base = [];
+  const realRows = realTrain(real, ids);
+  for (const r0 of [...intentRows, ...shellRows, ...realRows]) {
+    if (!ids.has(r0.intent)) throw new Error(`unknown intent ${r0.intent}`);
+    const n = normalize(r0.text);
+    if (heldOut.has(r0.text)) continue;
+    const d = decide.get(n);
+    if (d?.action === 'drop') continue;
+    const r = d?.action === 'relabel' && d.intent ? { ...r0, intent: d.intent } : r0;
+    const key = n + '|' + r.intent + '|' + (r.shell || '');
+    if (seen.has(key)) continue;
+    seen.add(key);
+    base.push(r);
+  }
+  const out = heldOutFilter(heldOut);
+  const { rows, push } = out;
+  let gid = 0;
+  for (const r of base) {
+    const g = gid++;
+    const tool = FAMILY_OF[r.intent];
+    const split = isDev(r.text) ? 'dev' : 'train';
+    const env = () => (r.shell ? { shell: r.shell, os: r.os || 'linux' } : sampleEnv());
+    const { spans } = silverSpans(r.text, r.intent);
+    const sp = (s) => s.map((x) => [x.type, x.start, x.end]);
+    push({ text: r.text, tool, intent: r.intent, lang: r.lang, ...env(), spans: sp(spans), gid: g, src: r.src, split, kind: 'orig' });
+    push({ text: typo(r.text), tool, intent: r.intent, lang: r.lang, ...env(), spans: null, gid: g, src: r.src, split, kind: 'typo' });
+    for (let k = 0; k < 2; k++) {
+      const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'train' });
+      if (rx.text !== r.text) push({ text: rx.text, tool, intent: r.intent, lang: r.lang, ...env(), spans: sp(rx.spans), gid: g, src: r.src, split, kind: 'relex' });
+    }
+  }
+  // tldr descriptions: tool label only (intent ''), capped per family/lang as in gen_data
+  const tldr = readJsonl(join(ROOT, 'data', 'tldr', 'tools.jsonl'));
+  const cap = {};
+  for (const r of tldr.sort(() => rng() - 0.5)) {
+    if (!FAMILIES[r.tool] || !r.text || r.text.length < 8 || heldOut.has(r.text)) continue;
+    const key = r.tool + r.lang;
+    if ((cap[key] = (cap[key] || 0) + 1) > (r.lang === 'pl' ? 60 : 80)) continue;
+    const win = /^windows\//.test(r.page || '');
+    push({ text: r.text, tool: r.tool, intent: '', lang: r.lang, ...(win ? { shell: 'powershell', os: 'win32' } : sampleEnv()), spans: null, gid: gid++, src: 'tldr', split: isDev(r.text) ? 'dev' : 'train', kind: 'orig' });
+  }
+  for (const r of readJsonl(join(ROOT, 'data', 'ood.jsonl'))) {
+    if (heldOut.has(r.text)) continue;
+    const g = gid++;
+    const split = isDev(r.text) ? 'dev' : 'train';
+    push({ text: r.text, tool: NONE, intent: '', lang: r.lang, ...sampleEnv(), spans: [], gid: g, src: 'ood', split, kind: 'orig' });
+    push({ text: typo(r.text), tool: NONE, intent: '', lang: r.lang, ...sampleEnv(), spans: [], gid: g, src: 'ood', split, kind: 'typo' });
+  }
+  // a typo / relexicalised copy (or another source's sentence) on the train side can be exactly a dev text
+  // ("policz pliki w /var/log"): the dev split must stay unseen, so such train rows are dropped
+  const devTexts = new Set(rows.filter((r) => r.split === 'dev').map((r) => normalize(r.text)));
+  const before = rows.length;
+  rows.splice(0, rows.length, ...rows.filter((r) => r.split === 'dev' || !devTexts.has(normalize(r.text))));
+  writeFileSync(join(OUT, 'train.jsonl'), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
+  // the complete dev-text index (every emitted dev row, not only texts whose own hash is dev): train_a_dev.sh
+  // excludes it from A_dev's training data
+  writeFileSync(join(OUT, 'dev_texts.json'), JSON.stringify([...devTexts].sort()));
+  const meta = {
+    tools: [...Object.keys(FAMILIES), NONE],
+    intents: INTENTS.map((i) => i.id),
+    intentTool: Object.fromEntries(INTENTS.map((i) => [i.id, FAMILY_OF[i.id]])),
+    descriptions: Object.fromEntries(INTENTS.map((i) => [i.id, i.description])),
+    tagLabels: ['O', ...TAG_TYPES.flatMap((t) => [`B-${t}`, `I-${t}`])],
+  };
+  writeFileSync(join(OUT, 'meta.json'), JSON.stringify(meta, null, 1));
+  const c = (f) => rows.filter(f).length;
+  console.log(`export_data: ${out.dropped} augmented rows dropped (held-out texts), ${before - rows.length} train rows dropped (dev texts)`);
+  console.log(`export_data: ${base.length} base (${base.filter((r) => r.src === 'real').length} real), ${rows.length} rows (train ${c((r) => r.split === 'train')}, dev ${c((r) => r.split === 'dev')}), tldr ${c((r) => r.src === 'tldr')}, ood ${c((r) => r.src === 'ood')}`);
+}
+if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
diff --git a/scripts/hybrid/train_encoder.py b/scripts/hybrid/train_encoder.py
new file mode 100644
index 0000000..cf50054
--- /dev/null
+++ b/scripts/hybrid/train_encoder.py
@@ -0,0 +1,167 @@
+#!/usr/bin/env python3
+"""(B) Fine-tune the vocab-pruned multilingual-e5-small as a joint tool + intent classifier with a BIO slot-tagger head.
+
+Input:  build/hybrid/train.jsonl, build/hybrid/meta.json (node scripts/hybrid/export_data.js)
+        build/hybrid/e5-pruned/ (python3 scripts/hybrid/prune_vocab.py)
+Model:  <s> request </s></s> "bash linux" </s>  ->  mean-pooled encoder -> tool head (55) + intent head (149)
+                                                   per-token -> BIO head (37 labels; only request tokens are labelled)
+Rows with intent '' (tldr descriptions, OOD) train the tool head only; typo copies carry no spans (tag loss masked).
+Only split=='train' rows are used; split=='dev' is kept for threshold calibration.
+Resumable: a checkpoint (model + optimizer + step) is written every --ckpt-every steps and at each epoch end.
+
+Usage: python3 scripts/hybrid/train_encoder.py [--layers 6] [--epochs 2.5] [--threads 2] [--out build/hybrid/enc]
+"""
+import argparse, json, math, os, random, time
+import torch
+import torch.nn as nn
+from transformers import AutoModel, AutoTokenizer
+
+ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
+
+
+class Joint(nn.Module):
+    def __init__(self, base, n_tool, n_intent, n_tag, layers=None):
+        super().__init__()
+        self.enc = AutoModel.from_pretrained(base) if isinstance(base, str) else base
+        if layers and layers < len(self.enc.encoder.layer):  # keep the bottom `layers` transformer blocks
+            self.enc.encoder.layer = self.enc.encoder.layer[:layers]
+            self.enc.config.num_hidden_layers = layers
+        h = self.enc.config.hidden_size
+        self.drop = nn.Dropout(0.1)
+        self.tool = nn.Linear(h, n_tool)
+        self.intent = nn.Linear(h, n_intent)
+        self.tag = nn.Linear(h, n_tag)
+
+    def forward(self, input_ids, attention_mask):
+        hs = self.enc(input_ids=input_ids, attention_mask=attention_mask).last_hidden_state
+        m = attention_mask.unsqueeze(-1).to(hs.dtype)
+        pooled = (hs * m).sum(1) / m.sum(1).clamp(min=1)
+        pooled = self.drop(pooled)
+        return self.tool(pooled), self.intent(pooled), self.tag(self.drop(hs))
+
+
+def ctx_str(r):
+    return f"{r.get('shell') or 'bash'} {r.get('os') or 'linux'}"
+
+
+def encode(tok, rows, meta, max_len=64):
+    tl = {t: i for i, t in enumerate(meta['tools'])}
+    il = {t: i for i, t in enumerate(meta['intents'])}
+    gl = {t: i for i, t in enumerate(meta['tagLabels'])}
+    enc = tok([r['text'] for r in rows], [ctx_str(r) for r in rows], truncation='only_first', max_length=max_len,
+              return_offsets_mapping=True)
+    out = []
+    for k, r in enumerate(rows):
+        ids = enc['input_ids'][k]
+        offs = enc['offset_mapping'][k]
+        seq = enc.sequence_ids(k)
+        tags = [-100] * len(ids)
+        if r.get('spans') is not None:
+            prev_span = None
+            for j, (s, e) in enumerate(offs):
+                if seq[j] != 0 or e <= s:
+                    continue
+                lab = 'O'
+                cur = None
+                for si, (typ, a, b) in enumerate(r['spans']):
+                    # XLM-R offsets may include the leading space of a word piece
+                    ss = s + (1 if r['text'][s:s + 1] == ' ' else 0)
+                    if min(e, b) - max(ss, a) > 0:
+                        cur = si
+                        lab = ('I-' if prev_span == si else 'B-') + typ
+                        break
+                tags[j] = gl[lab]
+                prev_span = cur
+        out.append({'ids': ids, 'tool': tl[r['tool']], 'intent': il.get(r['intent'], -100) if r['intent'] else -100, 'tags': tags})
+    return out
+
+
+def collate(batch, pad_id):
+    L = max(len(b['ids']) for b in batch)
+    ids = torch.full((len(batch), L), pad_id, dtype=torch.long)
+    att = torch.zeros((len(batch), L), dtype=torch.long)
+    tags = torch.full((len(batch), L), -100, dtype=torch.long)
+    for i, b in enumerate(batch):
+        n = len(b['ids'])
+        ids[i, :n] = torch.tensor(b['ids'])
+        att[i, :n] = 1
+        tags[i, :n] = torch.tensor(b['tags'])
+    return ids, att, torch.tensor([b['tool'] for b in batch]), torch.tensor([b['intent'] for b in batch]), tags
+
+
+def main():
+    ap = argparse.ArgumentParser()
+    ap.add_argument('--base', default=os.path.join(ROOT, 'build/hybrid/e5-pruned'))
+    ap.add_argument('--out', default=os.path.join(ROOT, 'build/hybrid/enc'))
+    ap.add_argument('--epochs', type=float, default=4)
+    ap.add_argument('--bs', type=int, default=32)
+    ap.add_argument('--lr', type=float, default=8e-5)
+    ap.add_argument('--threads', type=int, default=4)
+    ap.add_argument('--ckpt-every', type=int, default=500)
+    ap.add_argument('--seed', type=int, default=17)
+    ap.add_argument('--layers', type=int, default=6, help='truncate the encoder to its bottom N layers (12 = full)')
+    ap.add_argument('--all', action='store_true', help='also train on the dev split (final model; no calibration data left)')
+    a = ap.parse_args()
+    torch.set_num_threads(a.threads)
+    random.seed(a.seed)
+    torch.manual_seed(a.seed)
+    meta = json.load(open(os.path.join(ROOT, 'build/hybrid/meta.json')))
+    rows = [json.loads(l) for l in open(os.path.join(ROOT, 'build/hybrid/train.jsonl'), encoding='utf-8')]
+    rows = [r for r in rows if a.all or r['split'] == 'train']
+    tok = AutoTokenizer.from_pretrained(a.base)
+    data = encode(tok, rows, meta)
+    model = Joint(a.base, len(meta['tools']), len(meta['intents']), len(meta['tagLabels']), a.layers)
+    head_params = [p for n, p in model.named_parameters() if not n.startswith('enc.')]
+    enc_params = [p for n, p in model.named_parameters() if n.startswith('enc.')]
+    opt = torch.optim.AdamW([{'params': enc_params, 'lr': a.lr}, {'params': head_params, 'lr': a.lr * 10}], weight_decay=0.01)
+    steps_per_epoch = math.ceil(len(data) / a.bs)
+    total = int(steps_per_epoch * a.epochs)
+    warm = int(0.06 * total)
+    sched = torch.optim.lr_scheduler.LambdaLR(opt, lambda s: min(1, (s + 1) / max(1, warm)) * max(0.0, (total - s) / max(1, total - warm)))
+    os.makedirs(a.out, exist_ok=True)
+    ck = os.path.join(a.out, 'ckpt.pt')
+    step = 0
+    if os.path.exists(ck):
+        st = torch.load(ck, map_location='cpu', weights_only=False)
+        model.load_state_dict(st['model']); opt.load_state_dict(st['opt']); sched.load_state_dict(st['sched']); step = st['step']
+        print(f'resumed at step {step}/{total}', flush=True)
+    ce = nn.CrossEntropyLoss(ignore_index=-100)
+    pad = tok.pad_token_id
+    t0 = time.time()
+    model.train()
+    while step < total:
+        ep = step // steps_per_epoch
+        order = list(range(len(data)))
+        random.Random(a.seed + ep).shuffle(order)
+        # length-bucketed batches for speed
+        chunks = [order[i:i + a.bs * 50] for i in range(0, len(order), a.bs * 50)]
+        batches = []
+        for c in chunks:
+            c = sorted(c, key=lambda i: len(data[i]['ids']))
+            batches += [c[i:i + a.bs] for i in range(0, len(c), a.bs)]
+        random.Random(a.seed + 1000 + ep).shuffle(batches)
+        for bi in range(step - ep * steps_per_epoch, len(batches)):
+            if step >= total:
+                break
+            ids, att, yt, yi, ytag = collate([data[i] for i in batches[bi]], pad)
+            lt, li, lg = model(ids, att)
+            loss = ce(lt, yt) + (ce(li, yi) if (yi >= 0).any() else 0) + 0.5 * (ce(lg.reshape(-1, lg.shape[-1]), ytag.reshape(-1)) if (ytag >= 0).any() else 0)
+            opt.zero_grad()
+            loss.backward()
+            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
+            opt.step(); sched.step(); step += 1
+            if step % 50 == 0:
+                el = time.time() - t0
+                print(f'step {step}/{total} ep {ep} loss {loss.item():.4f} {el:.0f}s', flush=True)
+            if step % a.ckpt_every == 0 or step == total or bi == len(batches) - 1:
+                torch.save({'model': model.state_dict(), 'opt': opt.state_dict(), 'sched': sched.state_dict(), 'step': step}, ck + '.tmp')
+                os.replace(ck + '.tmp', ck)
+    model.eval()
+    torch.save(model.state_dict(), os.path.join(a.out, 'final.pt'))
+    tok.save_pretrained(a.out)
+    json.dump({'base': a.base, 'layers': a.layers, 'epochs': a.epochs, 'rows': len(data), 'all': a.all, 'meta': meta}, open(os.path.join(a.out, 'train_info.json'), 'w'))
+    print('done', flush=True)
+
+
+if __name__ == '__main__':
+    main()
diff --git a/scripts/lib/heldout.js b/scripts/lib/heldout.js
new file mode 100644
index 0000000..ec55d41
--- /dev/null
+++ b/scripts/lib/heldout.js
@@ -0,0 +1,79 @@
+// Held-out texts shared by gen_data.js, teacher.js and eval.js. A training text leaks when it equals a
+// held-out text after normalize(), when it equals one after filler words are removed and word order is
+// ignored ("list all symlinks in X" vs "list symlinks in X", "show disks and partitions" vs "partitions and
+// disks show"), or when it is a contrastive rewrite (scripts/lib/confusable.js) of a
+// held-out text ("push my commits" -> "pull my commits").
+import { readFileSync, readdirSync, existsSync } from 'node:fs';
+import { join } from 'node:path';
+import { normalize } from '../../src/features.js';
+import { CONTRAST_RULES } from './confusable.js';
+import { SLOT_CASES } from '../../test/slot-cases.js';
+import { EVAL_VALUES } from './silver.js';
+import { readReal, realEvalTexts } from '../real/real_rows.js';
+
+const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
+const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);
+
+const FILLER = new Set(('a an the all any some every each my me our your please pls plz just now currently right here ' +
+  'can could would you i want to like quickly real quick ' +
+  'wszystkie wszystkich wszystko mi mnie moje moich moj moja moim prosze teraz aktualnie obecnie sobie moze mozesz ' +
+  'czy jakies jakie tu tutaj').split(' '));
+
+/**
+ * Key without filler words and word order (normalize() first: lowercase, no diacritics, digits -> 0):
+ * "last 30 kernel messages" and "kernel messages last 30" are the same request for leakage purposes.
+ */
+export function nearKey(text) {
+  return normalize(text).split(' ').filter((w) => w && !FILLER.has(w)).sort().join(' ');
+}
+
+/**
+ * Raw held-out request texts (eval sets, blind sets, slot gold, the hand-written slot cases of
+ * test/slot-cases.js). Every caller (gen_data.js, teacher.js) gets the same index.
+ */
+export function heldOutTexts(root, extra = []) {
+  const r = (...p) => readJsonl(join(root, 'data', ...p));
+  return [
+    ...readDir(join(root, 'data', 'eval')).map((x) => x.text),
+    ...r('shell', 'eval.jsonl').map((x) => x.text),
+    ...r('history', 'eval.jsonl').map((x) => x.query),
+    ...r('compose', 'eval.jsonl').map((x) => x.text),
+    ...r('slots', 'gold.jsonl').map((x) => x.text),
+    ...r('ood_eval.jsonl').map((x) => x.text),
+    ...readDir(join(root, 'data', 'blind')).map((x) => x.text ?? x.query),
+    ...readDir(join(root, 'data', 'eval_v04')).map((x) => x.text),
+    ...readDir(join(root, 'data', 'hybrid', 'blind')).map((x) => x.text),
+    ...SLOT_CASES.map((c) => c[1]),
+    // private real-usage eval split (build/real/rows.jsonl, if present)
+    ...realEvalTexts(readReal(root)),
+    ...extra,
+  ].filter(Boolean);
+}
+
+/** -> { has(text): boolean, exact: Set, near: Set } over the held-out texts and their contrastive rewrites. */
+export function heldOutIndex(texts) {
+  const exact = new Set();
+  const near = new Set();
+  const add = (t) => { exact.add(normalize(t)); const k = nearKey(t); if (k) near.add(k); };
+  for (const t of texts) {
+    add(t);
+    for (const rule of CONTRAST_RULES) if (rule.re.test(t)) { const w = t.replace(rule.re, rule.to); if (w !== t) add(w); }
+  }
+  return { exact, near, has: (t) => exact.has(normalize(t)) || near.has(nearKey(t)) };
+}
+
+const esc = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
+/** Eval-only slot values (scripts/lib/silver.js EVAL_POOLS) as one whole-word regex. */
+export const EVAL_VALUE_RE = new RegExp(`(?<![\\p{L}\\d_])(?:${[...EVAL_VALUES].sort((a, b) => b.length - a.length).map(esc).join('|')})(?![\\p{L}\\d_])`, 'iu');
+
+/**
+ * The one exclusion index of every build-time script that produces or sends training text (gen_data.js and
+ * the Jev teacher, teacher.js): a text is excluded when it is a held-out text (or a near-duplicate / contrastive
+ * rewrite of one) or mentions an eval-only slot value.
+ * -> { heldOut: heldOutIndex(...), evalValue(text), has(text) }
+ */
+export function exclusionIndex(root, extra = []) {
+  const heldOut = heldOutIndex(heldOutTexts(root, extra));
+  const evalValue = (t) => EVAL_VALUE_RE.test(String(t));
+  return { heldOut, evalValue, has: (t) => heldOut.has(t) || evalValue(t) };
+}
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

exec
/bin/bash -lc "nl -ba src/pipeline.js | sed -n '1,240p'" in /workspace/tellsh
 succeeded in 0ms:
     1	// End-to-end: request -> command for the target shell.
     2	//
     3	//   env (shell/os/coreutils) + history ctx ──► classifier context tokens (shell=, os=, ctx_*)
     4	//   history rules ("same for X", "delete it") ─► may fix intent / fill slots deterministically
     5	//   cascade: tool top-3 ─► intent (p(tool)·p(intent|tool))
     6	//   slots: BIO tagger (tool-conditioned) ─► validated values; regex extraction fills/overrides failures
     7	//   render for shell/os ─► danger check
     8	//   low confidence (or unexplained modifiers) ─► second pass: experimental flag composer
     9	import { getModel } from './model.js';
    10	import { cascade } from './cascade.js';
    11	import { tag, exFromSpans } from './tagger.js';
    12	import { extractSlots, pickArg, isOptionWord, foldKeepLength } from './slots.js';
    13	import { resolveSlots, buildCommand, finalizeSlots, RAW_OK } from './fill.js';
    14	import { BY_ID } from './catalog.js';
    15	import { FAMILY_OF, NONE } from './tools.js';
    16	import { detectEnv, envFeatures } from './env.js';
    17	import { buildContext, resolveReference, hasPronoun, hasLocative, cwdFlags, sameBut, entityForSlot, isAmbiguous } from './history.js';
    18	import { AMB } from './shellwords.js';
    19	import { compose } from './compose.js';
    20	import { checkDanger } from './danger.js';
    21	import { readFileSync } from 'node:fs';
    22	
    23	let EXPLAINED = null;
    24	const explained = () => {
    25	  if (!EXPLAINED) {
    26	    try { EXPLAINED = JSON.parse(readFileSync(new URL('../model/compose_explained.json', import.meta.url), 'utf8')); } catch { EXPLAINED = {}; }
    27	  }
    28	  return EXPLAINED;
    29	};
    30	const headOf = (cmd) => { const w = String(cmd).replace(/^sudo\s+/, '').split(/\s+/); return ['git', 'docker'].includes(w[0]) ? `${w[0]} ${w[1]}` : w[0]; };
    31	
    32	// extracted "values" that are really the pronoun/filler words of a reference ("restart it", "zatrzymaj tę usługę")
    33	const PRONOUN_VALUE = /^(it|its|that|this|them|those|one|again|back|there|here|to|tego|ten|tę|te|ta|tą|tej|tym|go|je|ją|ja|jego|jej|niego|nią|nia|nim|niej|mu|tamten|tamtego|tamto|ponownie|znowu)$/i;
    34	
    35	// Non-path values must never start with `-` (they would become options: `ssh -oProxyCommand=…`,
    36	// `curl -o/path`); paths get a ./ prefix at render time instead.
    37	const FUNCTION_WORD = /^(?:the|a|an|of|for|to|in|on|at|by|with|from|into|onto|up|out|it|its|this|that|these|those|and|or|then|is|my|me|your|there|same|inside|w|we|z|ze|na|do|od|dla|o|i|oraz|jest|mi|moim|tym|ten|ta|to|tej|tam|stamtąd|stamtad|tamże|tamze|samym|samego)$/i;
    38	// "folder out" / "plik w": a word that is normally a function word names the item when it directly follows the
    39	// noun and ends the request (or is followed by a word that cannot start a location: "folder out sorted by size")
    40	const NAME_NOUN = { path: String.raw`folder|directory|dir|katalog\w*|podkatalog\w*`, file: String.raw`file|plik\w*` };
    41	const NAME_NEXT = /^(?:sorted|sort|sorting|recursively|recursive|please|now|force|forcibly|forcefully|posortowan\w*|rekurencyjnie|prosze|teraz)$/i;
    42	function namedStopWord(text, k) {
    43	  const m = String(text).match(new RegExp(String.raw`(?:^|\s)(?:${NAME_NOUN[k]})\s+(\S+)(?:\s+(\S+))?`, 'i'));
    44	  if (!m || !FUNCTION_WORD.test(m[1]) || (m[2] != null && !NAME_NEXT.test(m[2]))) return null;
    45	  if (m[2] == null && m.index + m[0].length !== String(text).trimEnd().length) return null;
    46	  return m[1];
    47	}
    48	// "list files in the", "list files in out", "pokaż pliki w": the request names a location but its object is only
    49	// function words. The path is withheld (placeholder), never silently replaced by the catalog default `.`.
    50	const LOC_WORD = /^(?:in|inside|within|under|of|from|at|on|into|w|we|z|ze|na|do|od|pod|dla)$/i;
    51	const LOC_NOUN = /^(?:folder\w*|directory|directories|dir|dirs|katalog\w*|podkatalog\w*|files?|plik\w*)$/i;
    52	function danglingLocation(text) {
    53	  const words = String(text).trim().replace(/[?!.,;:]+$/, '').split(/\s+/).filter(Boolean);
    54	  while (words.length && NAME_NEXT.test(words[words.length - 1])) words.pop();
    55	  const last = words.length - 1;
    56	  if (last < 1 || !FUNCTION_WORD.test(words[last])) return false;
    57	  if (LOC_WORD.test(words[last])) return true;
    58	  for (let j = last - 1; j >= 0; j--) {
    59	    if (LOC_WORD.test(words[j])) return true;
    60	    if (!FUNCTION_WORD.test(words[j]) && !LOC_NOUN.test(words[j])) return false;
    61	  }
    62	  return false;
    63	}
    64	// a reference in destination position: "to it", "into that folder", "do niego", "there"
    65	const REF_DST = /(?:^|\s)(?:to|into|onto|inside|in|do|na|w|we|pod)\s+(?:(?:the|that|this|those|these|same|ten|ta|tego|tamtego|tym|tamtym|tamten)\s+)?(?:(?:folder\w*|directory|dir|katalog\w*|location|place|miejsc\w*)(?=\s|$|[?!.,])|(?:it|that|this|them|there|tego|niego|nim|tym|tam|tamtego|tamten)(?=\s|$|[?!.,]))|(?:^|\s)(?:there|tam)(?=\s|$|[?!.,])/;
    66	/** `v` appears in `text` right after a destination word ("to /tmp/old", "into backup", "do /tmp/old"). */
    67	function afterDestWord(text, v) {
    68	  const t = foldKeepLength(String(text)).toLowerCase();
    69	  const fv = foldKeepLength(v).toLowerCase();
    70	  for (let i = t.indexOf(fv); i >= 0; i = t.indexOf(fv, i + 1)) {
    71	    if (/(?:^|\s)(?:to|into|onto|in|inside|do|na|w|we|pod|->|=>)\s+(?:the\s+|a\s+)?(?:(?:folder|directory|dir|katalog\w*|folderu|location)\s+)?["'“„]?$/.test(t.slice(0, i))) return true;
    72	  }
    73	  return false;
    74	}
    75	const WORDISH = (v) => /^(?!-)[\w@.:+-]{1,64}$/.test(v);
    76	const VALID_SLOT = {
    77	  // a bare function word ("on", "the", "w") is a tagging error, never a file or directory to act on
    78	  path: (v) => typeof v === 'string' && v.length < 256 && !/[\n\0\u0001]/.test(v) && /[\w~./]/.test(v) && !FUNCTION_WORD.test(v),
    79	  name: WORDISH, service: WORDISH, container: WORDISH, cmd: WORDISH,
    80	  // npm scoped packages (`@types/node`, `@scope/pkg@1.2`) have one slash after the scope
    81	  // pip requirements with a version constraint (`requests==2.32.0`, `django>=4,<5`, `uvicorn[standard]~=0.30`) or extras alone
    82	  // (`requests[socks]`)
    83	  pkg: (v) => WORDISH(v) || /^@[\w.-]{1,64}\/[\w.-]{1,64}(?:@[\w.^~<>=*-]{1,32})?$/.test(v) ||
    84	    /^[A-Za-z][\w.-]{0,63}(?:\[[\w.,-]{1,64}\])?(?:(?:===?|[<>!~]=|[<>])[\w.*+!-]{1,32})(?:,(?:===?|[<>!~]=|[<>])[\w.*+!-]{1,32}){0,3}$/.test(v) ||
    85	    /^[A-Za-z][\w.-]{0,63}@[\^~]?[\w.*-]{1,32}$/.test(v) || /^[A-Za-z][\w.-]{0,63}\[[\w.,-]{1,64}\]$/.test(v),
    86	  branch: (v) => /^(?!-)[\w./-]{1,100}$/.test(v), user: (v) => /^[a-z_][\w.-]{0,31}$/i.test(v),
    87	  glob: (v) => /^\*\.[\w]{1,8}$/.test(v),
    88	  url: (v) => v.length < 2048 && (/^(?:https?|ftp|ftps|ssh|git|file):\/\/[^\s/?#]*[^\s]*$/i.test(v) || /^(?!-)[\w.-]+@[\w.-]+:[^\s]+$/.test(v)),
    89	  pr: (v) => RAW_OK.pr(v), repo: (v) => RAW_OK.repo(v),
    90	  host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
    91	  pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
    92	  old: (v) => v.length > 0 && v.length < 300 && !/[\n\r\0]/.test(v), new: (v) => v.length < 300 && !/[\n\r\0]/.test(v),
    93	};
    94	const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
    95	// "that pr", "this pull request", "the same pr": a pull request named by reference
    96	const PR_REFERENCE = /\b(?:that|this|its|the\s+same|the\s+previous|the\s+last|ten|tego|tamten)\s+(?:\w+\s+)?(?:prs?|pull[\s-]+requests?)\b/i;
    97	// "the other pr", "the latest pr", "my last pull request", "the most recent pr": a pull request picked out among several, which
    98	// neither the current branch's pull request nor the one of the previous command is (withheld, also with history)
    99	const PR_PICKED = /\b(?:(?:the|a|an|my|our|your|his|her|their|some|any)\s+)?(?:other|another|latest|newest|most\s+recent|recent|oldest|older|newer|earlier|next|first|second|third|new|old|pending|approved|remaining|(?:(?:my|our|your|his|her|their)\s+)(?:last|previous|prior)|inn[yaeoy]\w*|ostatni\w*|najnowsz\w*|poprzedni\w*|kolejn\w*|nastepn\w*|następn\w*|starsz\w*)\s+(?:(?:open|opened|draft|merged|github)\s+)?(?:prs?|pull[\s-]+requests?)\b/i;
   100	const PR_CLOSE = /(?:^|[\s,;])(?:close|closing|shut|reject|decline|abandon|cancel|zamkn\S*)(?=[\s.,!?;:]|$)/i;
   101	// "merge and close pr 45": a merge the request asks for; "close pr 45 without merge", "do not merge pr 45", "unmerge pr 45":
   102	// one it does not (a negation within the two words before it, or a prefix that undoes it)
   103	const MERGE_WORD = /(?:^|[^\w-])((?:un|de)?merg\w*|(?:roz)?scal\w*)/gi;
   104	const MERGE_NEGATION = /(?:\b(?:not|no|never|without|nor|instead\s+of|rather\s+than|nie|bez)|n't|\bdont|\bundo(?:\s+the)?|\brevert(?:\s+the)?|\bcofnij)\s+(?:\S+\s+){0,2}$/i;
   105	const mergeAsked = (q) => [...String(q).matchAll(MERGE_WORD)].some((m) => !/^(?:un|de|roz)/i.test(m[1]) && !MERGE_NEGATION.test(q.slice(0, m.index + m[0].length - m[1].length)));
   106	// slots naming the one thing a command acts on, other than a path (not free text: pattern, message, glob, ...)
   107	const OPERAND_SLOT_NAMES = new Set(['name', 'service', 'container', 'pkg', 'host', 'target', 'branch', 'user', 'script', 'url', 'pid']);
   108	for (const k of PATH_SLOT_NAMES) if (k !== 'path') VALID_SLOT[k] = VALID_SLOT.path;
   109	export function validSlot(k, v) {
   110	  if (v == null || v === '') return false;
   111	  if (isAmbiguous(v)) return false;
   112	  if (RAW_OK[k]) return RAW_OK[k](v);
   113	  if (VALID_SLOT[k]) return VALID_SLOT[k](String(v));
   114	  return String(v).length < 300 && !/\0/.test(String(v));
   115	}
   116	/** Values recovered from history go through the same validation as classifier/regex values. */
   117	const validHistorySlots = (slots) => Object.fromEntries(Object.entries(slots || {}).filter(([k, v]) => ['namepat', 'sedexpr'].includes(k) || validSlot(k, v)));
   118	/** History slots that failed validation (too long, a newline, ...): withheld as placeholders, never the catalog default. */
   119	const invalidHistorySlots = (slots) => Object.keys(slots || {}).filter((k) => !['namepat', 'sedexpr'].includes(k) && slots[k] != null && !validSlot(k, slots[k]));
   120	
   121	/**
   122	 * Slot resolution: tagger is primary, regex is fallback + validator.
   123	 * -> { slots, sources: {slot: 'tagger'|'regex'}, spans }
   124	 */
   125	export function resolveWithTagger(intentId, text, { model = getModel(), tool, mode = 'merge', tagger } = {}) {
   126	  const intent = BY_ID[intentId];
   127	  const exR = extractSlots(text);
   128	  const rR = resolveSlots(intent, exR);
   129	  if (mode === 'regex') return { slots: rR, sources: Object.fromEntries(Object.keys(rR).map((k) => [k, 'regex'])), spans: [] };
   130	  // tagger: optional external slot tagger (hybrid encoder, src/rerank/) -> { spans }
   131	  const t = tagger ? tagger(text, tool || FAMILY_OF[intentId]) : tag(text, tool || FAMILY_OF[intentId], model);
   132	  const exT = exFromSpans(text, t.spans);
   133	  const rT = resolveSlots(intent, exT);
   134	  if (rT.archive && !exT.paths.includes(rT.archive)) delete rT.archive; // derived default, not a tagged value
   135	  if (mode === 'tagger') return { slots: rT, sources: Object.fromEntries(Object.keys(rT).map((k) => [k, 'tagger'])), spans: t.spans };
   136	  const slots = {};
   137	  const sources = {};
   138	  // a regex path that is only part of a tagged path word the tagger could not represent exactly
   139	  // (or a named location inside it) must not stand in for it: the slot stays empty (placeholder)
   140	  const partOfRejected = (v) => exT.rejectedPaths?.some((ch) => exR.spans.some((s) => s.type === 'PATH' && s.value === v && s.start < ch.end && ch.start < s.end && text.slice(s.start, s.end) !== ch.text));
   141	  for (const k of new Set([...Object.keys(rT), ...Object.keys(rR)])) {
   142	    if (k === 'namepat' || k === 'sedexpr') continue; // derived, recomputed below
   143	    if (validSlot(k, rT[k])) { slots[k] = rT[k]; sources[k] = 'tagger'; } else if (rR[k] != null && (validSlot(k, rR[k]) || !VALID_SLOT[k]) && !(PATH_SLOT_NAMES.has(k) && partOfRejected(rR[k]))) { slots[k] = rR[k]; sources[k] = 'regex'; }
   144	  }
   145	  // "delete the folder out", "du of folder out sorted by size": a stop word right after the noun is its name
   146	  for (const k of ['path', 'file']) {
   147	    if (!usesSlot(intent, k) || slots[k] != null) continue;
   148	    const v = namedStopWord(text, k);
   149	    if (v != null) { slots[k] = v; sources[k] = 'regex'; }
   150	    break;
   151	  }
   152	  // a path the tagger or regex read but that was rejected (a bare function word: "in the", "of it"; a name with a
   153	  // newline; part of a path the tagger could not represent), a location whose object is only function words, or a
   154	  // place named only by reference ("there", "tam", "in the same folder"): withheld, so the command shows a
   155	  // placeholder instead of the default `.`
   156	  // with a place reference the location is "there", never a word the request names ("remove the logs in there")
   157	  if (hasLocative(text) && slots.path != null && usesSlot(intent, 'path') && !usesSlot(intent, 'dst')) { delete slots.path; delete sources.path; }
   158	  const withheld = [];
   159	  for (const k of ['path', 'file']) {
   160	    if (!usesSlot(intent, k) || slots[k] != null) continue;
   161	    const rejected = [rT[k], rR[k]].some((v) => typeof v === 'string' && v !== '' && !validSlot(k, v)) || exT.rejectedPaths?.length > 0;
   162	    if (rejected || danglingLocation(text) || hasLocative(text)) withheld.push(k);
   163	    break;
   164	  }
   165	  // an operand the request names but that is not a valid value (`npm install @types/node;rm`): placeholder, never
   166	  // silently dropped from an optional part of the template (`npm install`)
   167	  const invalidOperands = [];
   168	  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr', 'repo']) {
   169	    if (!usesSlot(intent, k) || slots[k] != null || withheld.includes(k)) continue;
   170	    if ([rT[k], rR[k]].some((v) => typeof v === 'string' && v !== '' && !validSlot(k, v))) { withheld.push(k); invalidOperands.push(k); }
   171	  }
   172	  finalizeSlots(intent, slots);
   173	  return { slots, sources, spans: t.spans, withheld, invalidOperands };
   174	}
   175	
   176	/** Explicit paths the request names (`/tmp/x`, `~/a`, `./b`, `"C:\\x"`, quoted names with a slash), in order, distinct. */
   177	function explicitPaths(text) {
   178	  const ex = extractSlots(text);
   179	  return (ex.pathsWithQuoted || []).filter((p) => typeof p === 'string' && !/[*?]/.test(p) && !/^\w+:\/\//.test(p) &&
   180	    (/^(?:~|\.{0,2}\/|[A-Za-z]:[\\/])/.test(p) || (ex.quoted.includes(p) && /[\\/]/.test(p))));
   181	}
   182	
   183	/** Every occurrence of `v` in `text` is inside backticks or `$(…)`: the value is the output of a command, not a name. */
   184	function insideSubstitution(text, v) {
   185	  if (!v) return false;
   186	  let found = false;
   187	  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) {
   188	    found = true;
   189	    const before = text.slice(0, i);
   190	    const ticks = (before.match(/`/g) || []).length % 2 === 1;
   191	    const open = before.lastIndexOf('$(');
   192	    const paren = open >= 0 && !before.slice(open).includes(')');
   193	    if (!ticks && !paren) return false;
   194	  }
   195	  return found;
   196	}
   197	
   198	/** `v` occurs in `text` only directly followed by punctuation that trimPathPunct removed (`/tmp/x!`). */
   199	function trailingPunctAfter(text, v) {
   200	  const at = [];
   201	  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) at.push(text.slice(i + v.length));
   202	  return at.length > 0 && at.every((after) => /^[.,;:!?)]+(?=\s|$)/.test(after));
   203	}
   204	
   205	/**
   206	 * `v` was read from a quoted string of the request that ends in a backslash while the same quote
   207	 * character appears again later (`"a\" -e evil"`): the user may have meant \" as an escaped quote,
   208	 * so where the text ends is unclear.
   209	 */
   210	function cutAtEscapedQuote(text, v) {
   211	  if (typeof v !== 'string' || !v.endsWith('\\')) return false;
   212	  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) {
   213	    const after = text.slice(i + v.length);
   214	    if (/^["'”`]/.test(after) && after.slice(1).includes(after[0] === '”' ? '"' : after[0])) return true;
   215	  }
   216	  return false;
   217	}
   218	const TEXT_SLOT_NAMES = ['pattern', 'message', 'text', 'name', 'old', 'new', 'service', 'container', 'pkg', 'cmd', 'branch', 'user'];
   219	
   220	const usesSlot = (intent, k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
   221	
   222	function flagTokens(cmd) {
   223	  const set = new Set();
   224	  for (const w of String(cmd).split(/\s+/)) {
   225	    if (/^-[A-Za-z]+$/.test(w) && !w.startsWith('--')) for (const c of w.slice(1)) set.add('-' + c);
   226	    else if (/^-/.test(w)) set.add(w.replace(/=.*$/, ''));
   227	    else if (/^[a-z]{3}$/.test(w)) set.add(w); // ps aux
   228	  }
   229	  return set;
   230	}
   231	
   232	/** Second pass input: paths, numbers, ... from the merged extraction for the composer. */
   233	function composeInput(text, model, tool, unclear = []) {
   234	  const ex = extractSlots(text);
   235	  const t = tag(text, tool, model);
   236	  const exT = exFromSpans(text, t.spans);
   237	  const merged = { ...ex };
   238	  if (exT.paths.length) merged.paths = exT.paths;
   239	  // paths followed by sentence punctuation (`/tmp/data!`): fine for a read-only command, but a composed
   240	  // command that changes something is never aimed at them (see blocksAmbiguous)

exec
/bin/bash -lc "nl -ba src/pipeline.js | sed -n '241,520p'" in /workspace/tellsh
 succeeded in 0ms:
   241	  // the same for a path that is the output of a command (`on \`pwd\``, `$(pwd)`): the catalog withholds it too
   242	  // and a quoted argument that may be words of the request (joinArgs)
   243	  const amb = [...(merged.paths || []).filter((p) => trailingPunctAfter(text, p) || insideSubstitution(text, String(p))), ...unclear];
   244	  for (const k of ['count', 'size', 'duration', 'ext', 'mode']) if (exT[k] != null) merged[k] = exT[k];
   245	  const pattern = () => { const p = exT.tagged.PATTERN?.find((x) => !isOptionWord(x)) ?? ex.quoted[0] ?? pickArg('pattern', ex) ?? null; return cutAtEscapedQuote(text, p) ? null : p; };
   246	  const nameOf = (type) => exT.tagged[type]?.[0] ?? null;
   247	  return { ex: merged, pattern, nameOf, ambiguousPaths: amb };
   248	}
   249	/**
   250	 * A composed command that changes something and uses a path whose end is unclear (`chmod -R 777 /tmp/data!`).
   251	 * Composed commands always carry at least medium risk, so "changes something" is: a writing tool (chmod,
   252	 * tar) or anything the danger checker flags on its own (find -delete, git/docker subcommands, ...).
   253	 */
   254	const WRITING_TOOLS = new Set(['chmod', 'tar']);
   255	const blocksAmbiguous = (comp, amb) => !!comp && !comp.invalid && amb.some((p) => comp.command.includes(p)) &&
   256	  (WRITING_TOOLS.has(comp.tool) || checkDanger(comp.command, 'safe').risk !== 'safe');
   257	
   258	/**
   259	 * Pure function used by the CLI, eval and tests.
   260	 * opts: { shell, os, env, history: string[] (commands, oldest first), cwd, threshold, top, compose: 'auto'|'force'|'off',
   261	 *         slotMode: 'merge'|'tagger'|'regex', model, rerank, rerankTop (candidates the rerank hook sees; default top) }
   262	 */
   263	export function suggest(query, opts = {}) {
   264	  const model = opts.model || getModel();
   265	  const env = opts.env || detectEnv({ shell: opts.shell, os: opts.os });
   266	  const top = opts.top ?? 3;
   267	  const thr = opts.threshold ?? model.thresholds.accept;
   268	  const composeMode = opts.compose || 'auto';
   269	  // a NUL byte cannot be part of any command argument (and marks ambiguous values internally)
   270	  if (/\0/.test(String(query))) {
   271	    return { query, shell: env.shell, os: env.os, coreutils: env.coreutils, threshold: thr, context: { used: false }, understood: false, method: 'none',
   272	      confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: 'the request contains a NUL byte' };
   273	  }
   274	
   275	  // ---- context (history + cwd), in memory only ----
   276	  let ctx = null;
   277	  if (opts.history?.length) {
   278	    // an earlier `tellsh <query>`: what that request produced on its own (no history, no composer). Slots it left as
   279	    // placeholders (refused, ambiguous, rejected) are ambiguous values here, never the catalog default or a guess.
   280	    const quick = (q, unclearArgs) => {
   281	      const r = suggest(q, { model, env, threshold: thr, compose: 'off', unclearArgs });
   282	      if (!r.understood || !r.intent || r.method !== 'catalog') return null;
   283	      const slots = { ...(r.slots || {}) };
   284	      for (const k of r.missing || []) slots[k] = AMB + `<${k}>`;
   285	      return { intent: r.intent, slots };
   286	    };
   287	    const kind = opts.historyKind || opts.history.kind || (env.shell === 'powershell' ? 'pwsh' : 'posix');
   288	    ctx = buildContext(opts.history, { classify: quick, cwd: opts.cwd, kind, query });
   289	  }
   290	  const ctxFeats = ctx ? ctx.features : (opts.cwd ? cwdFlags(opts.cwd).map((c) => 'ctx_cwd=' + c) : []);
   291	  const extras = [...envFeatures(env), ...ctxFeats];
   292	  const ref = ctx ? resolveReference(query, ctx) : null;
   293	  const context = ctx ? { used: true, commands: ctx.n, rule: ref?.rule || null, note: ref?.note || null } : { used: false };
   294	
   295	  const base = { query, shell: env.shell, os: env.os, coreutils: env.coreutils, threshold: thr, context };
   296	
   297	  // ---- rule: "same for X" reuses the previous intent with one slot replaced ----
   298	  if (ref?.rule === 'same-for') {
   299	    const slots = validHistorySlots(ref.slots);
   300	    // a value that fails validation (a 300-character path, ...) is a placeholder, never `find .`
   301	    const blank = invalidHistorySlots(ref.slots);
   302	    // the new path ends in sentence punctuation (`same for /tmp/data!`): placeholder, as for any request
   303	    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null && BY_ID[ref.intent].risk !== 'safe' && trailingPunctAfter(query, slots[ref.changed])) {
   304	      blank.push(ref.changed);
   305	      delete slots[ref.changed];
   306	    }
   307	    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank, keepOptional: blank });
   308	    const res = { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
   309	    const punct = blank.filter((k) => !invalidHistorySlots(ref.slots).includes(k));
   310	    if (punct.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${punct.join(', ')}); quote the path`];
   311	    if (punct.length < blank.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: it is not a valid value (${blank.filter((k) => !punct.includes(k)).join(', ')})`];
   312	    return res;
   313	  }
   314	  // ---- the reference cannot be resolved at all ("what about this", an older command to replay) ----
   315	  if (ref?.rule === 'refused' && ref.stop) {
   316	    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: ref.note };
   317	  }
   318	
   319	  const sb = ctx && !ref ? sameBut(query, ctx) : null;
   320	  // a request about the entries of the referenced directory does not use the history at all: its intent is read
   321	  // without the history features (they favour `delete_dir` for "delete log files in this folder")
   322	  // rerankTop: the re-ranker's own candidate count (A+B uses 5); independent of how many candidates are displayed
   323	  const c0 = cascade(query, { model, extras: ref?.contents ? envFeatures(env) : extras, top: Math.max(top, opts.rerankTop || 0), restrictTool: sb ? FAMILY_OF[sb.lastIntent] : undefined });
   324	  // rerank: optional hybrid hook (src/rerank/hybrid.js); history rules keep the linear cascade's decision
   325	  const c = opts.rerank && !sb && !ref ? opts.rerank(c0, { thr }) : c0;
   326	  const candidates = c.top.slice(0, Math.max(1, top)).map((t) => ({ intent: t.intent, tool: t.tool, p: +t.p.toFixed(4), description: BY_ID[t.intent]?.description }));
   327	  const tools = c.tools.map((t) => ({ tool: t.tool, p: +t.p.toFixed(4) }));
   328	  let intent = c.intent;
   329	  let confidence = c.confidence;
   330	  let method = 'catalog';
   331	  if ((ref?.rule === 'pronoun' || ref?.rule === 'refused') && ref.intent) { intent = ref.intent; method = 'history-rule'; confidence = Math.max(confidence, thr); }
   332	  if (sb) { method = 'history-rule'; confidence = Math.max(confidence, thr); context.rule = 'same-but'; context.note = `modifies previous ${sb.lastIntent}`; }
   333	  // "same but force" after `rm -r old; ls newdir`: the command it would modify is not the previous one
   334	  if (sb?.skipped && (BY_ID[sb.lastIntent].risk !== 'safe' || BY_ID[intent].risk !== 'safe')) {
   335	    context.rule = 'refused';
   336	    context.note = `the newest command that tellsh can modify (${sb.lastIntent}) is not the previous command; not guessing`;
   337	    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
   338	  }
   339	  // "same for api" after `docker --context prod logs web`: repeated here it would run against the default daemon
   340	  if (sb?.scoped) {
   341	    context.rule = 'refused';
   342	    context.note = `the previous command (${sb.lastIntent}) ran against another repository, directory or daemon (-C, --context, -H, ...); not guessing`;
   343	    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
   344	  }
   345	  const out = { ...base, confidence: +confidence.toFixed(4), tool: FAMILY_OF[intent] || c.tool, tools, candidates };
   346	
   347	  const tryCompose = (reason) => {
   348	    if (composeMode === 'off') return null;
   349	    // a place reference ("list files there", "tam") has no composer operand: never `find .` in its place
   350	    if (hasLocative(query) && composeMode !== 'force') return null;
   351	    // composer vocabulary and quoting are POSIX-only (fish treats \\ and \' as escapes inside single quotes)
   352	    if (env.shell === 'powershell' || env.shell === 'cmd' || env.shell === 'fish') return null;
   353	    const capable = c.tools.filter((t) => t.tool !== NONE);
   354	    if (c.topTool === NONE && composeMode !== 'force') return null;
   355	    const ci = composeInput(query, model, capable[0]?.tool, opts.unclearArgs);
   356	    const r = compose(query, capable, ci.ex, { patternOf: ci.pattern, nameOf: ci.nameOf });
   357	    if (!r || r.invalid) return r?.invalid ? { invalid: r.invalid, command: r.command } : null;
   358	    if (blocksAmbiguous(r, ci.ambiguousPaths)) return null;
   359	    // a value with a line break (`"/tmp/a\nb"`) is never composed into a command: the catalog withholds it too
   360	    if (/[\r\n]/.test(r.command)) return null;
   361	    // calibrated gate: confident stage-1 tool, or strong flag evidence (>= 2 triggered flags) for a likely tool
   362	    const pOf = capable.find((t) => t.tool === r.tool)?.p ?? 0;
   363	    if (composeMode !== 'force' && !(c.topToolP >= model.thresholds.compose || (r.triggered.length >= 2 && pOf >= 0.2))) return null;
   364	    return { ...out, understood: true, method: 'composed', experimental: true, reason, intent: null, description: `composed ${r.tool}${r.sub ? ' ' + r.sub : ''} command (experimental)`,
   365	      command: r.command, risk: r.risk, baseRisk: 'medium', warnings: r.warnings, critical: r.critical, missing: [], slots: {}, notes: null,
   366	      composed: { tool: r.tool, sub: r.sub, flags: r.flags, validation: r.validation } };
   367	  };
   368	
   369	  if (confidence < thr && method === 'catalog') {
   370	    const comp = tryCompose('low confidence');
   371	    if (comp && !comp.invalid) return comp;
   372	    const hint = hasPronoun(query) && !ctx ? 'this looks like a reference to an earlier command; try --history' : null;
   373	    // "move it there" with history: an object and a place reference at once is refused, not reported as resolved
   374	    if (ctx && hasPronoun(query) && hasLocative(query)) {
   375	      context.rule = 'refused';
   376	      context.note = 'the request names both an object ("it") and a place ("there") from the previous command; not guessing which is which';
   377	      return { ...out, understood: false, method: 'history-rule', hint: context.note, composeError: comp?.invalid || null };
   378	    }
   379	    return { ...out, understood: false, method: 'none', hint, composeError: comp?.invalid || null };
   380	  }
   381	  // "close that pr", "close pr 45": the catalog has no command that closes a pull request; the opposite one (`gh pr create`)
   382	  // or another one (`gh pr view 45`) is never suggested in its place
   383	  // "close pr 45 and delete branch", "close pr 45 without merge": refused for gh_pr_merge too, unless the request also asks
   384	  // for the merge ("merge and close pr 45"); "do not merge pr 45", "unmerge pr 45": never `gh pr merge 45`
   385	  const closes = PR_CLOSE.test(query);
   386	  const merges = intent === 'gh_pr_merge' && mergeAsked(query);
   387	  // "revert pr 45": not `gh pr view 45` either
   388	  if (intent?.startsWith('gh_pr_') && /\brevert\w*\b/i.test(query) && !merges) {
   389	    return { ...out, understood: false, method: 'none', hint: 'reverting a pull request is not supported (gh pr revert <PR>)' };
   390	  }
   391	  if (intent?.startsWith('gh_pr_') && ((closes && !merges) || (intent === 'gh_pr_merge' && !merges && [...query.matchAll(MERGE_WORD)].length))) {
   392	    const hint = closes ? 'closing a pull request is not supported (gh pr close <PR>)' : 'the request does not ask for a merge (it negates or undoes one); not suggesting gh pr merge';
   393	    return { ...out, understood: false, method: 'none', hint };
   394	  }
   395	
   396	  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode, tagger: opts.tagger });
   397	  const slots = r.slots;
   398	  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
   399	  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
   400	  const ambiguousPaths = [];
   401	  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
   402	  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
   403	  const blank = new Set(r.withheld || []);
   404	  // withheld operands whose optional part keeps its placeholder: an invalid operand, a history value that is ambiguous or
   405	  // invalid (`gh pr merge <PR>` for "same but merge" after `tellsh merge pr nightly`, never the current branch's pull request)
   406	  const keep = new Set(r.invalidOperands);
   407	  if (BY_ID[intent].risk !== 'safe') {
   408	    for (const k of Object.keys(slots)) {
   409	      if (PATH_SLOT_NAMES.has(k) && r.sources[k] !== 'history' && trailingPunctAfter(query, slots[k])) { ambiguousPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   410	    }
   411	    if (ambiguousPaths.length) finalizeSlots(BY_ID[intent], slots);
   412	  }
   413	  // a changing command whose path is the output of a command (`in \`pwd\``, `$(pwd)`), or a request that names more
   414	  // explicit paths than the command takes (`in /tmp/x and /tmp/y`: only one would be used): placeholder + warning
   415	  const unclearPaths = [];
   416	  if (BY_ID[intent].risk !== 'safe') {
   417	    const explicit = explicitPaths(query);
   418	    const nPathSlots = [...PATH_SLOT_NAMES].filter((k) => usesSlot(BY_ID[intent], k)).length;
   419	    const dropped = explicit.filter((p) => !Object.values(slots).some((v) => String(v) === p));
   420	    const tooMany = explicit.length > nPathSlots && dropped.length > 0;
   421	    // `in $(pwd)`: the location is the output of a command, so an empty path slot is withheld too (never `.`)
   422	    if (/\$\(|`/.test(query)) for (const k of ['path', 'file']) if (usesSlot(BY_ID[intent], k) && slots[k] == null && !unclearPaths.length) { unclearPaths.push(`${k}=?`); blank.add(k); }
   423	    for (const k of Object.keys(slots)) {
   424	      if (!PATH_SLOT_NAMES.has(k) || r.sources[k] === 'history') continue;
   425	      const sub = insideSubstitution(query, String(slots[k]));
   426	      if (sub || tooMany) { unclearPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   427	    }
   428	    if (tooMany) for (const k of PATH_SLOT_NAMES) if (usesSlot(BY_ID[intent], k) && slots[k] == null) blank.add(k);
   429	    if (unclearPaths.length || tooMany) finalizeSlots(BY_ID[intent], slots);
   430	    if (tooMany && !unclearPaths.length) unclearPaths.push(dropped.join(', '));
   431	    if (tooMany) unclearPaths.tooMany = true;
   432	  }
   433	  // `tellsh delete folder "my data"`: a quoted argument that may be a name or words of the request (see joinArgs). A
   434	  // changing command never takes it (or a part of it) as its path or other operand (process, service, container,
   435	  // package, ...): placeholder + warning
   436	  const unclearArgs = [];
   437	  if (BY_ID[intent].risk !== 'safe' && opts.unclearArgs?.length) {
   438	    const words = (x) => String(x).toLowerCase().split(/\s+/).filter(Boolean);
   439	    const partOf = (v, u) => { const a = words(u); const b = words(v); return b.length > 0 && a.some((_, i) => b.every((w, j) => a[i + j] === w)); };
   440	    for (const k of Object.keys(slots)) {
   441	      if (!(PATH_SLOT_NAMES.has(k) || OPERAND_SLOT_NAMES.has(k)) || r.sources[k] === 'history') continue;
   442	      const u = opts.unclearArgs.find((x) => partOf(slots[k], x));
   443	      if (u != null) { unclearArgs.push(`${k}=${u}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   444	    }
   445	    if (unclearArgs.length) finalizeSlots(BY_ID[intent], slots);
   446	  }
   447	  const ambiguousText = [];
   448	  for (const k of TEXT_SLOT_NAMES) {
   449	    if (slots[k] != null && cutAtEscapedQuote(query, slots[k])) { ambiguousText.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   450	  }
   451	  if (ambiguousText.length) { delete slots.sedexpr; delete slots.namepat; finalizeSlots(BY_ID[intent], slots); }
   452	  // "move it to /tmp/old", "copy them to /backup": the reference is the source, so the one path the request
   453	  // names is the destination (never `mv /tmp/old <DST>`). "copy notes.txt to it / into that folder / there":
   454	  // the reference is the destination and the named path the source (never `cp -ri /backup notes.txt`).
   455	  const itR = BY_ID[intent];
   456	  const fq = foldKeepLength(query).toLowerCase();
   457	  const twoPaths = usesSlot(itR, 'src') && usesSlot(itR, 'dst');
   458	  const isRef = ref?.rule === 'pronoun' || ref?.rule === 'refused';
   459	  const locative = hasLocative(query);
   460	  // "move it there": an object reference and a place reference at once. Which history value is the source and
   461	  // which the destination cannot be told from one previous command (`cd /tmp/x; cat a.txt`): both are withheld.
   462	  const bothRefs = twoPaths && locative && hasPronoun(query);
   463	  const refDst = !bothRefs && twoPaths && isRef && REF_DST.test(fq);
   464	  // the slots the reference fills (pronoun) or leaves empty (refused / guarded)
   465	  const refFill = refDst ? (ref.fill ? { dst: Object.values(ref.fill)[0] } : {}) : ref?.fill || {};
   466	  if (bothRefs) {
   467	    for (const k of Object.keys(slots)) if (PATH_SLOT_NAMES.has(k)) { delete slots[k]; delete r.sources[k]; }
   468	    for (const k of PATH_SLOT_NAMES) if (usesSlot(itR, k)) blank.add(k);
   469	    finalizeSlots(itR, slots);
   470	    if (ctx) { context.rule = 'refused'; context.note = 'the request names both what to move and where ("it" … "there"); not guessing which is which'; }
   471	    method = ctx ? 'history-rule' : method;
   472	  } else if (refDst) {
   473	    if (slots.src == null && slots.dst != null && !PRONOUN_VALUE.test(String(slots.dst))) { slots.src = slots.dst; r.sources.src = r.sources.dst; }
   474	    delete slots.dst; delete r.sources.dst;
   475	    if (slots.src != null && PRONOUN_VALUE.test(String(slots.src))) { delete slots.src; delete r.sources.src; }
   476	    if (ref.rule === 'refused') blank.add('dst');
   477	  } else if (isRef && twoPaths && slots.src != null && slots.dst == null &&
   478	      !PRONOUN_VALUE.test(String(slots.src)) && (ref.fill?.src != null || ref.blank?.includes('src'))) {
   479	    slots.dst = slots.src; r.sources.dst = r.sources.src;
   480	    delete slots.src; delete r.sources.src;
   481	    if (ref.rule === 'refused' || ref.guarded) blank.add('src');
   482	  }
   483	  // "move them to /tmp/old" with nothing resolved for "them" (no history, an unrelated history, ...): the one named
   484	  // path follows "to"/"into"/"do", so it is the destination; the source stays a placeholder (never `mv /tmp/old <DST>`)
   485	  if (!bothRefs && twoPaths && slots.src != null && slots.dst == null && !refDst && afterDestWord(query, String(slots.src))) {
   486	    slots.dst = slots.src; r.sources.dst = r.sources.src;
   487	    delete slots.src; delete r.sources.src;
   488	    blank.add('src');
   489	  }
   490	  // values that are only the words of a refused or guarded reference: a pronoun, or the `.` the tagger reads for
   491	  // "this folder" / "that directory" (never `rm -r .` for "delete all log files in this folder")
   492	  const refWordsOnly = () => {
   493	    for (const k of Object.keys(slots)) {
   494	      if (PRONOUN_VALUE.test(String(slots[k])) || (PATH_SLOT_NAMES.has(k) && slots[k] === '.' && !/(?:^|\s)\.(?:\s|$)/.test(query))) { delete slots[k]; delete r.sources[k]; }
   495	    }
   496	  };
   497	  if (ref?.rule === 'refused') {
   498	    // the reference points at something we cannot read safely: leave the slot empty (placeholder); a pull request stays
   499	    // `<PR>` even then (left out, `gh pr merge` would act on the current branch's)
   500	    refWordsOnly();
   501	    for (const k of refDst ? [] : ref.blank || []) if (slots[k] == null && usesSlot(BY_ID[intent], k)) { blank.add(k); if (!ref.blanket || k === 'pr') keep.add(k); }
   502	    finalizeSlots(BY_ID[intent], slots);
   503	    method = 'history-rule';
   504	  }
   505	  // "remove the logs there", "delete notes.txt there": a place reference never names the object of a changing
   506	  // command (`rm -r DIR`, `mv DIR …`); only the location a search-and-change runs in (`find DIR … -delete`). Any path
   507	  // the request names is relative to the wrong directory, so every path slot is withheld (with or without history).
   508	  if (locative && !refDst && !bothRefs && BY_ID[intent].risk !== 'safe' && FAMILY_OF[intent] !== 'find' && [...PATH_SLOT_NAMES].some((k) => usesSlot(BY_ID[intent], k))) {
   509	    for (const k of Object.keys(slots)) if (PATH_SLOT_NAMES.has(k)) { delete slots[k]; delete r.sources[k]; }
   510	    for (const k of PATH_SLOT_NAMES) if (usesSlot(BY_ID[intent], k)) blank.add(k);
   511	    finalizeSlots(BY_ID[intent], slots);
   512	    if (ctx) {
   513	      context.rule = 'refused';
   514	      context.note = `"there" names a place, not what ${intent} would change; not guessing`;
   515	      method = 'history-rule';
   516	    }
   517	  } else if (ref?.rule === 'pronoun' && ref.guarded && BY_ID[intent].risk !== 'safe') {
   518	    // the value must not be changed (search root, listed directory, ...; see changeGuard) and the classifier
   519	    // picked a modifying intent: refuse
   520	    refWordsOnly();

exec
/bin/bash -lc "nl -ba src/pipeline.js | sed -n '520,730p'; cat src/rerank/hybrid.js; cat src/rerank/encoder.js" in /workspace/tellsh
 succeeded in 0ms:
   520	    refWordsOnly();
   521	    // (a pull request keeps its `<PR>`: left out, `gh pr merge` would act on the current branch's)
   522	    for (const k of Object.keys(refFill)) if (slots[k] == null && usesSlot(BY_ID[intent], k)) { blank.add(k); if (k === 'pr') keep.add(k); }
   523	    finalizeSlots(BY_ID[intent], slots);
   524	    context.rule = 'refused';
   525	    context.note = ref.guardNote;
   526	    method = 'history-rule';
   527	  } else if (ref?.rule === 'pronoun') {
   528	    const it = BY_ID[intent];
   529	    for (const [k, v] of Object.entries(refFill)) {
   530	      // a pull request the request names but that cannot be read ("merge the pr that fixes login", `that pr "bob's"`): the
   531	      // request means that one, not the history's, so it stays withheld (as without history)
   532	      if (k === 'pr' && r.invalidOperands.includes(k)) { if (usesSlot(it, k)) { blank.add(k); keep.add(k); } continue; }
   533	      if (!validSlot(k, v)) {
   534	        // the referenced value cannot be used (too long, a newline, ...): placeholder, never the catalog default
   535	        if (slots[k] != null && PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
   536	        if (slots[k] == null && usesSlot(it, k)) { blank.add(k); keep.add(k); }
   537	        continue;
   538	      }
   539	      // the referenced value wins unless the request spells out its own value literally ("kill 4242")
   540	      const literal = slots[k] != null && !PRONOUN_VALUE.test(String(slots[k])) && new RegExp(`(^|[^\\w])${String(slots[k]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^\\w])`, 'i').test(query);
   541	      if (usesSlot(it, k) && (!literal || (k === 'path' && slots[k] === '.'))) { slots[k] = v; r.sources[k] = 'history'; }
   542	    }
   543	    // the chosen command does not take the referenced value: do not claim it was used
   544	    if (!Object.values(r.sources).includes('history')) { context.rule = null; context.note = `the ${ref.ent} from history does not fit ${intent}; not used`; }
   545	    finalizeSlots(it, slots);
   546	    method = 'history-rule';
   547	  }
   548	  if (sb) {
   549	    const it = BY_ID[intent];
   550	    for (const [k, v] of Object.entries(validHistorySlots(sb.lastSlots))) {
   551	      if (usesSlot(it, k) && slots[k] == null && !blank.has(k) && !['namepat', 'sedexpr'].includes(k)) { slots[k] = v; r.sources[k] = 'history'; }
   552	    }
   553	    // a slot of the previous command that depends on the shell state (`find "$DIR" …`) or is not a valid value
   554	    // (a 300-character path): placeholder, not `.`
   555	    const withheld = [...(sb.blank || []), ...invalidHistorySlots(sb.lastSlots)].filter((k) => usesSlot(it, k) && slots[k] == null && !['namepat', 'sedexpr'].includes(k));
   556	    for (const k of withheld) { blank.add(k); keep.add(k); }
   557	    if (withheld.length) { context.rule = 'refused'; context.note = `previous ${sb.lastIntent} has ${withheld.join(', ')} that depends on the shell state or is not a valid value; not guessing`; }
   558	    finalizeSlots(it, slots);
   559	  }
   560	  // "merge the other pr", "merge my last pr": not the previous command's pull request either, unless the request names one;
   561	  // "merge that pr in repo a/b": the previous command's pull request was one of the working directory's repository
   562	  if (usesSlot(BY_ID[intent], 'pr') && (slots.pr == null || r.sources.pr === 'history') && (PR_PICKED.test(query) || (r.sources.pr === 'history' && slots.repo != null))) {
   563	    delete slots.pr; delete r.sources.pr;
   564	    blank.add('pr'); keep.add('pr');
   565	    context.rule = ctx ? 'refused' : context.rule;
   566	    if (ctx) context.note = 'the request means a pull request (another one, or one in another repository) the history does not name; not guessing';
   567	  }
   568	  // "merge that pr" with no history to read it from: the pull request is withheld, never the current branch's
   569	  if (!ref && slots.pr == null && usesSlot(BY_ID[intent], 'pr') && PR_REFERENCE.test(query)) {
   570	    blank.add('pr'); keep.add('pr');
   571	    if (ctx) { context.rule = 'refused'; context.note = 'the request refers to a pull request the history does not name; not guessing'; }
   572	  }
   573	  let b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: [...keep] });
   574	  // implicit reference: a required slot is still missing and the history has a value of that type.
   575	  // Only for safe intents: a destructive command ("delete the folder") is never aimed at a history
   576	  // value without an explicit reference word ("delete it"), which goes through resolveReference.
   577	  if (ctx && b.missing.length && ref?.rule !== 'refused' && BY_ID[intent].risk === 'safe' && b.risk === 'safe') {
   578	    const filled = [];
   579	    for (const m of b.missing) {
   580	      if (r.withheld?.includes(m)) continue; // "list files in the": not a reference to history either
   581	      const e = entityForSlot(m, ctx);
   582	      // an ambiguous newest value blocks the fill; ctx.last is consulted only when no entity type applies
   583	      const v = e ? (e.ambiguous ? null : e.value) : (ctx.last?.slots?.[m] ?? null);
   584	      if (v != null && validSlot(m, v)) { slots[m] = v; r.sources[m] = 'history'; filled.push(`${m}=${v}`); }
   585	    }
   586	    if (filled.length) {
   587	      finalizeSlots(BY_ID[intent], slots);
   588	      b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: [...keep] });
   589	      method = 'history-rule'; // history-derived: never auto-run by --yes
   590	      context.rule ??= 'implicit';
   591	      context.note = [context.note, `filled from history: ${filled.join(', ')}`].filter(Boolean).join('; ');
   592	    }
   593	  }
   594	  if (Object.values(r.sources).includes('history')) method = 'history-rule';
   595	  const res = { ...out, understood: true, method, ...b, slotSources: r.sources, spans: r.spans.map((s) => ({ type: s.type, text: s.text })) };
   596	  if (ambiguousText.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: unclear where the quoted text ends (\\" may be an escaped quote) (${ambiguousText.join(', ')})`];
   597	  if (ambiguousPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${ambiguousPaths.join(', ')}); quote the path`];
   598	  if (unclearArgs.length) res.warnings = [...(res.warnings || []), `${unclearArgs.every((x) => PATH_SLOT_NAMES.has(x.split('=')[0])) ? 'path' : 'value'} left as a placeholder: unclear whether the quoted argument is a name or part of the request (${unclearArgs.join(', ')}); pass the whole request as one quoted argument`];
   599	  if (unclearPaths.length) {
   600	    res.warnings = [...(res.warnings || []), unclearPaths.tooMany
   601	      ? `path left as a placeholder: the request names more paths than ${intent} takes (${explicitPaths(query).join(', ')}); run it once per path`
   602	      : `path left as a placeholder: it is the output of a command substitution (${unclearPaths.join(', ')})`];
   603	  }
   604	  if (method === 'catalog' && ctx == null && hasPronoun(query) && b.missing.length) res.hint = 'this looks like a reference to an earlier command; try --history';
   605	
   606	  // ---- second pass on modifier mismatch: the request asks for flags the catalog command lacks ----
   607	  //   same tool: >= 1 triggered flag not in the catalog command; another stage-1 tool: >= 2 triggered flags
   608	  // a slot the catalog withheld on purpose (command substitution, a rejected or unclear path, ...) is never filled by the
   609	  // composer: the catalog command with its placeholder is the answer
   610	  if (method === 'catalog' && composeMode !== 'off' && b.command && !blank.size && !['powershell', 'cmd', 'fish'].includes(env.shell)) {
   611	    const fam = FAMILY_OF[intent];
   612	    const ci = composeInput(query, model, fam, opts.unclearArgs);
   613	    const opt = { patternOf: ci.pattern, nameOf: ci.nameOf };
   614	    const have = flagTokens(b.command);
   615	    const expl = new Set(explained()[intent] || []);
   616	    const unexplained = (cmp) => cmp.triggered.filter((f) => !expl.has((cmp.sub ? cmp.sub + ' ' : '') + f));
   617	    let comp = compose(query, [{ tool: fam, p: 1 }], ci.ex, opt);
   618	    if (blocksAmbiguous(comp, ci.ambiguousPaths)) comp = null;
   619	    // same tool: the composed command must keep the catalog command's head (+ git/docker subcommand)
   620	    const sameHead = comp && !comp.invalid && headOf(comp.command) === headOf(b.command);
   621	    let extra = sameHead ? unexplained(comp).filter((f) => [...flagTokens(f)].some((x) => !have.has(x))) : [];
   622	    if (!extra.length) {
   623	      const others = c.tools.filter((t) => t.tool !== NONE && t.p >= 0.05);
   624	      let alt = compose(query, others.length ? others : [{ tool: fam, p: 1 }], ci.ex, opt);
   625	      if (blocksAmbiguous(alt, ci.ambiguousPaths)) alt = null;
   626	      const ux = alt && !alt.invalid && headOf(alt.command) !== headOf(b.command) ? unexplained(alt) : [];
   627	      if (ux.length >= 2) { comp = alt; extra = ux; }
   628	    }
   629	    // a value with a line break is never composed into a command (the catalog rejects it as a path)
   630	    if (comp && !comp.invalid && comp.command !== b.command && !/[\r\n]/.test(comp.command)) {
   631	      if (extra.length >= 1 || composeMode === 'force') {
   632	        return { ...res, method: 'composed', experimental: true, reason: `request asks for ${extra.join(' ')} not in the catalog command`,
   633	          catalogCommand: b.command, description: `composed ${comp.tool}${comp.sub ? ' ' + comp.sub : ''} command (experimental)`,
   634	          command: comp.command, risk: comp.risk, baseRisk: 'medium', warnings: comp.warnings, critical: comp.critical, missing: [],
   635	          composed: { tool: comp.tool, sub: comp.sub, flags: comp.flags, validation: comp.validation } };
   636	      }
   637	    }
   638	  }
   639	  return res;
   640	}
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

codex
The diff adds substantial history handling, operand validation, and an optional neural fallback. I’m checking those boundaries closely, especially whether an unresolved value can become a runnable command. I’ll treat the one-line history limit as intentional.
exec
/bin/bash -lc 'cat src/render.js' in /workspace/tellsh
 succeeded in 0ms:
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

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/fill.js' in /workspace/tellsh
 succeeded in 0ms:
diff --git a/src/fill.js b/src/fill.js
index f9849d0..9b66f73 100644
--- a/src/fill.js
+++ b/src/fill.js
@@ -1,8 +1,8 @@
 // Turn (intent, slots) into a concrete, safely-quoted command for the target shell.
 import { BY_ID } from './catalog.js';
-import { extractSlots, pickArg, pickDest, pickDir } from './slots.js';
+import { extractSlots, pickArg, pickDest, pickDir, foldKeepLength } from './slots.js';
 import { checkDanger, maxRisk } from './danger.js';
-import { shQuote, psQuote, chooseTemplate, quoteForKind, UnquotableError } from './render.js';
+import { shQuote, psQuote, chooseTemplate, quoteForKind, UnquotableError, pwshNativeSlots, unsafeNativePwshArg } from './render.js';
 
 export { shQuote };
 
@@ -19,13 +19,134 @@ export const RAW_OK = {
   var: (v) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(String(v)),
   minutes: (v) => /^\d{1,7}$/.test(String(v)),
   sizeBytes: (v) => /^\d{1,16}$/.test(String(v)),
+  start: (v) => /^\d{1,9}$/.test(String(v)) && +v > 0,
+  end: (v) => /^\d{1,9}$/.test(String(v)) && +v > 0,
+  num: (v) => /^\d{1,12}$/.test(String(v)),
+  // a repository as gh -R takes it: [HOST/]OWNER/REPO
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
+const PR_QUALIFIED = /^\s*(?:(?:by|from|since|before|after|about|titled|named|called|that|which|who|whose|where|od|autorstwa)\b|(?:\S+\s+)?(?:opened|created|authored|submitted|raised|written|made|sent|pushed|filed)\b)|\b(?:yesterday|today|tonight|tomorrow|ago|last\s+(?:week|month|year|night|friday|monday|tuesday|wednesday|thursday|saturday|sunday)|wczoraj\w*|dzisiaj|dzi[sś])\b/i;
+// "merge pr from the feature branch", "for my branch bob": a branch is named, but not one the parser read
+const PR_BRANCH_NAMED = /\b(?:for|of|on|from)\s+(?:\S+\s+){0,2}branch\b/i;
+/**
+ * The pull request the user names (quoted: kept as written, validation withholds an odd one), else null (`gh pr merge`
+ * acts on the current branch's pull request). A number elsewhere in the request ("merge pr with 2 approvals", "merge the
+ * 2 open prs") is never the pull request; a request that names something the parser cannot read (`bob's`, `in repo v2`)
+ * is withheld (`?`, shown as `<PR>`), never a bare `gh pr merge`.
+ */
+function prSelector(ex) {
+  if (ex.urls[0] != null) return ex.urls[0];
+  const text = String(ex.text);
+  const m = text.match(PR_SELECTOR);
+  if (m) {
+    const quoted = m[2] ?? m[3] ?? m[4] ?? m[5];
+    if (quoted != null) return quoted || '?'; // `""`: named but empty, withheld
+    if (m[7] != null) return '?'; // an unclosed / odd quote: withheld
+    const w = m[6];
+    const branch = /\bbranch\s+$/i.test(m[1]);
+    // "merge my pr from 2 days ago", "view pr for 3 days": a number after a connective is not the pull request
+    if (PR_ISSUE.test(w)) return '?';
+    const rest = text.slice(m.index + m[0].length);
+    if (/^#?\d+$/.test(w) && PR_UNIT_AFTER.test(rest)) return '?';
+    if (/^\d+$/.test(w)) return branch || PR_NUMBER_LEAD.test(m[1]) ? w : '?';
+    // "merge the pr for #12": the pull request for issue 12, or pull request 12
+    if (/^#\d+$/.test(w) && !PR_NUMBER_LEAD.test(m[1])) return '?';
+    if (PR_ABBREV.test(w) || (PR_HOST.test(w) && !branch)) return '?';
+    if (PR_MARKED.test(w)) return w;
+    // "merge pr for branch status": after "branch" any word is the selector, a describing one is withheld
+    if (branch) return PR_NOT_SELECTOR.test(w) ? `?${w}` : w;
+    if (!PR_NOT_SELECTOR.test(w)) {
+      // "merge pr for fix #12": the word is followed by a number, so it may describe rather than name the branch
+      if (/\b(?:for|from)\s+$/i.test(m[1])) return /\d/.test(rest) ? `?${w}` : w;
+      // "merge pr main": a bare word may be a branch or say something else: withheld (`gh pr merge <PR>`), never dropped
+      return `?${w}`;
+    }
+  }
+  const hash = text.match(/(?:^|\s)#(\d{1,12})(?=[\s.,!?;:]|$)/);
+  if (hash && PR_HASH_LEAD.test(text.slice(0, hash.index + hash[0].indexOf('#')))) return hash[1];
+  // 'merge the "feature/login" pull request': an explicitly quoted value is the target
+  if (ex.quoted.length) return ex.quoted[0];
+  // named but not readable: a number anywhere ("merge the 2 open prs", "merge pr in 2 minutes"), or a marked word or a
+  // quote after "pr" ("merge pr bob's", "merge pr feature/x's", "merge pr in repo v2"): withheld
+  const p = text.match(PR_WORD);
+  const after = p ? text.slice(p.index + p[0].length) : '';
+  if (ex.numbers?.length || /\d/.test(text) || /[/_#'"`„“”’]|\w[.-]\w/.test(after) || PR_BRANCH_NAMED.test(after) || PR_QUALIFIED.test(after)) return '?';
+  return null;
+}
+// "--repo a/b", "-R a/b", "in (the) repo(sitory) a/b", "in the a/b repo"; "in the other repo", "in another repository": named,
+// not readable ("this repo", "the current repository" are the working directory's)
+const PR_REPO_OPT = /(?:^|\s)(?:--repo(?:=|\s+|$)|-R(?:=|\s*))(\S*)/;
+const PR_REPO = /\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(?:github\s+)?(?:repo|repository|repozytorium)\s+(\S+)|\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(\S+(?:\s+\S+)?)\s+(?:github\s+)?(?:repo|repository)\b|\b(?:w|z)\s+repozytorium\s+(\S+)/i;
+// "this repo", "the repo", "my current repo", "our own repository": the working directory's
+const PR_REPO_HERE = /^(?:the|a|an|this|current|same|our|my|local|own|tym|tego|bieżącym|biezacym)(?:\s+(?:current|same|local|own))?$/i;
+// "org/repo#7": a repository and a pull request in one word
+const PR_REPO_HASH = /(?:^|\s)((?:https:\/\/)?(?:[\w-]+(?:\.[\w-]+)+\/)?[\w.-]+\/[\w.-]+)#(\d{1,12})(?=[\s.,!?;:]|$)/;
+// "merge pr 7 in other/repo", "of org/repo", "on github.com/org/repo", "at https://github.com/org/repo": a repository
+// without the word "repo" (a value gh -R takes); right after "pr for" / "pr from" / … the word is the branch selector
+const PR_REPO_PREP = /(?:^|\s)(in|of|on|from|for|at|to)\s+(?:the\s+)?(?:github\s+)?(\S+)/gi;
+const PR_SELECTOR_SPOT = /\b(?:pull[\s-]+requests?|pr|prs)\s+(?:(?:for|of|on|from|branch|number|no\.?|nr\.?|(?:the|a|my|our)(?=\s+branch\b))\s+)*$/i;
+const repoValue = (w) => w.replace(/[.,!?;:]+$/, '').replace(/^["'`]|["'`]$/g, '').replace(/^https:\/\/(?=github\.com\/)/i, '').replace(/(?:\.git)?\/?$/, '');
+/** The repository a gh pr request names: { repo (a value, or `?` when it is not readable), rest (the text without it), pr } or null. */
+function prRepo(text) {
+  const cut = (i, len, put = ' ') => (text.slice(0, i) + put + text.slice(i + len)).replace(/\s+/g, ' ').trim();
+  const h = text.match(PR_REPO_HASH);
+  if (h && RAW_OK.repo(repoValue(h[1]))) {
+    const at = h.index + h[0].indexOf(h[1]);
+    return { repo: repoValue(h[1]), rest: cut(at, h[1].length + 1 + h[2].length, ` #${h[2]} `), pr: h[2] };
+  }
+  const m = text.match(PR_REPO_OPT) || text.match(PR_REPO);
+  if (!m) {
+    for (const p of text.matchAll(PR_REPO_PREP)) {
+      const w = repoValue(p[2]);
+      if (!RAW_OK.repo(w)) continue;
+      const host = w.split('/').length === 3;
+      // "merge pr from feature/x", "view the pr for fix/a": the branch the pull request is for
+      if (!host && /^(?:of|on|from|for)$/i.test(p[1]) && PR_SELECTOR_SPOT.test(text.slice(0, p.index + p[0].indexOf(p[1])))) continue;
+      return { repo: w, rest: cut(p.index, p[0].length) };
+    }
+    return null;
+  }
+  const w = repoValue(m[1] ?? m[2] ?? m[3] ?? '');
+  if (m[2] != null && PR_REPO_HERE.test(w)) return null;
+  const rest = (text.slice(0, m.index) + ' ' + text.slice(m.index + m[0].length)).replace(/\s+/g, ' ').trim();
+  return { repo: RAW_OK.repo(w) ? w : '?', rest };
+}
 const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
 const PLACEHOLDER = (name) => `<${name.toUpperCase()}>`;
 
 // sed needs regex-escaped search text and &,\,/ escaped replacement
-const sedEscapeOld = (s) => s.replace(/[\\/.*^$[\]]/g, '\\$&');
+// (a newline would end the s command: written as \n, which never matches inside one line)
+const sedEscapeOld = (s) => s.replace(/[\\/.*^$[\]]/g, '\\$&').replace(/\n/g, '\\n');
 const sedEscapeNew = (s) => s.replace(/[\\/&]/g, '\\$&').replace(/\n/g, '\\n');
 
 /** Recompute derived slots after values were merged/overridden (tagger, history rules). */
@@ -40,9 +161,24 @@ export function finalizeSlots(intent, v) {
 export function resolveSlots(intent, ex) {
   const v = {};
   const has = (k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
-  const textual = ['pattern', 'message', 'text', 'name', 'old', 'branch', 'service', 'container', 'pkg', 'cmd', 'user']
+  const textual = ['pattern', 'message', 'text', 'name', 'old', 'branch', 'service', 'container', 'pkg', 'cmd', 'user', 'script']
     .some((k) => k in intent.slots) || ['base64_encode', 'base64_decode', 'replace_text', 'find_by_name'].includes(intent.id);
   const paths = [...(textual ? ex.paths : ex.pathsWithQuoted)];
+  // "grep for ~/foo in src": the path-like word right after the search verb is the pattern, the other
+  // path is where to search (only when there is one: otherwise the single path is the search root)
+  let pathPattern = null;
+  if (has('pattern') && !ex.quoted.length && paths.length >= 2) {
+    const m = foldKeepLength(String(ex.text)).toLowerCase().match(/(?:^|\s)(?:grep|search|look|find|szukaj|wyszukaj|poszukaj|znajdz)\s+(?:for\s+|(?:the\s+)?(?:text|string|pattern|word)\s+)?(\S+)/);
+    const at = m ? m.index + m[0].length - m[1].length : -1;
+    const word = at >= 0 ? String(ex.text).slice(at, at + m[1].length) : null;
+    if (word != null && paths.includes(word)) { pathPattern = word; paths.splice(paths.indexOf(word), 1); }
+  }
+  // "on the disk" / "na (całym) dysku" is a search scope, never the object of a changing command
+  // ("usuń folder cache na dysku" is not `rm -r /`), and a folder the user names wins over it
+  if (ex.rootPhrase && paths.includes('/') && !/(^|\s)["']?\/["']?(?=[\s,.;:!?]|$)/.test(ex.text) &&
+      ((intent.risk !== 'safe' && !/^find \{path\}/.test(String(intent.template))) || (has('path') && pickDir(ex)))) {
+    paths.splice(paths.indexOf('/'), 1);
+  }
 
   // archive-type paths (compress/extract)
   const isArchive = (p) => /\.(tar\.gz|tgz|tar|zip|tar\.bz2|tar\.xz|gz)$/i.test(p) && !/^(tar\.gz|tar|tgz|zip|gz)$/i.test(p);
@@ -91,12 +227,38 @@ export function resolveSlots(intent, ex) {
   }
   if (has('port') && !v.port && ex.numbers?.length) v.port = ex.numbers.find((n) => n >= 20 && n < 65536);
   if (ex.mode && has('mode')) v.mode = ex.mode;
+  // line range: "lines 10-20", "od 10 do 20", "10 to 20", "from line 5 through 9"; else the first two numbers
+  if (has('start')) {
+    const m = String(ex.text).match(/(?<![\w.])(\d{1,9})\s*(?:-|–|—|\.\.|,|:|to|do|through|thru|until|till|and|i)\s*(?:line\s+|linii\s+|linia\s+)?(\d{1,9})(?![\w.])/i);
+    const [a, b] = m ? [+m[1], +m[2]] : (ex.numbers || []).slice(0, 2);
+    if (a > 0 && b > 0) { v.start = Math.min(a, b); v.end = Math.max(a, b); }
+    delete v.count;
+  }
+  if (has('num')) {
+    const n = ex.pid ?? ex.numbers?.find((x) => x > 0) ?? ex.count;
+    if (n != null) v.num = n;
+    delete v.count;
+  }
+  if (has('pr')) {
+    // "merge pr 45 in repository other/repo", "… --repo other/repo": the repository is kept (`--repo`), an unreadable one
+    // ("in the other repo", "in repo v2") withheld, never dropped; gh needs a pull request named with it
+    const rq = has('repo') ? prRepo(String(ex.text)) : null;
+    if (rq) v.repo = rq.repo;
+    // the pull request the user names: a URL or a branch is kept as it is (validation withholds an odd one), never
+    // dropped for a bare `gh pr merge`, which acts on the current branch's pull request
+    const sel = prSelector(rq ? { ...ex, text: rq.rest, numbers: (rq.rest.match(/\d+/g) || []).map(Number), quoted: ex.quoted.filter((q) => rq.rest.includes(q)) } : ex);
+    if (rq?.pr != null) v.pr = rq.pr;
+    else if (sel != null) v.pr = String(sel).replace(/^#(?=\d)/, '');
+    else if (rq) v.pr = '?';
+    delete v.count;
+  }
   if (ex.ext) v.glob = `*.${ex.ext}`;
   if (ex.urls.length) v.url = ex.urls[0];
   else if (has('url') && ex.hosts.length) v.url = /^\w+:\/\//.test(ex.hosts[0]) ? ex.hosts[0] : `https://${ex.hosts[0]}`;
 
-  for (const k of ['name', 'service', 'container', 'pkg', 'cmd', 'var', 'branch', 'user', 'pattern', 'host', 'target', 'message']) {
-    if (has(k)) {
+  if (pathPattern != null) v.pattern = pathPattern;
+  for (const k of ['name', 'service', 'container', 'pkg', 'cmd', 'script', 'var', 'branch', 'user', 'pattern', 'host', 'target', 'message']) {
+    if (has(k) && v[k] == null) {
       const val = pickArg(k, ex);
       if (val != null && val !== '') v[k] = val;
     }
@@ -143,7 +305,7 @@ function renderValue(name, raw, values, quote) {
   let val = values[name];
   if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
   if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
-  return quote(val);
+  return quote(val, { tilde: PATH_SLOTS.has(name), name });
 }
 
 const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;
@@ -152,7 +314,7 @@ const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|d
  * Fill a template. Returns { command, missing[] }.
  * `values` = resolved slots merged over intent defaults.
  */
-export function render(template, values, required = [], quote = shQuote) {
+export function render(template, values, required = [], quote = shQuote, keepOptional = []) {
   const missing = [];
   const isSlot = (name) => name in values || required.includes(name) || SLOT_NAMES.test(name);
   // Single pass over the template: every {slot} and «optional segment» is substituted exactly once and
@@ -163,6 +325,9 @@ export function render(template, values, required = [], quote = shQuote) {
       const r = seg.replace(/\{(\w+)(!raw)?\}/g, (m2, n2, raw2) => {
         if (!ok) return m2;
         const val = renderValue(n2, !!raw2, values, quote);
+        // an operand withheld on purpose (keepOptional: an invalid operand, an unresolved history value) keeps its
+        // placeholder: the optional part is not silently dropped (`npm install <PKG>`, never `npm install`)
+        if (val == null && keepOptional.includes(n2)) { missing.push(n2); return PLACEHOLDER(n2); }
         if (val == null) { ok = false; return m2; }
         return val;
       });
@@ -209,7 +374,7 @@ export const envFromPlatform = (platform = process.platform) => ({
  *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
  * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}
  */
-export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given } = {}) {
+export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [], keepOptional = [] } = {}) {
   const intent = BY_ID[intentId];
   if (!intent) throw new Error(`unknown intent ${intentId}`);
   const e = env || envFromPlatform(platform);
@@ -218,8 +383,14 @@ export function buildCommand(intentId, text, { platform = process.platform, env,
   const values = {};
   for (const [k, d] of Object.entries(defaults)) if (d != null) values[k] = d;
   Object.assign(values, resolved);
+  // blank: slots withheld on purpose (refused reference, ambiguous path): no default stands in for them
+  for (const k of blank) if (resolved[k] == null) delete values[k];
+  // the filesystem root ("whole disk", "na całym dysku") is the system drive for Windows shells
+  if (e.os === 'win32' && (e.shell === 'powershell' || e.shell === 'cmd')) {
+    for (const k of PATH_SLOTS) if (values[k] === '/') values[k] = 'C:\\';
+  }
   deriveSlots(values);
-  const required = Object.entries(intent.slots).filter(([, d]) => d == null).map(([k]) => k);
+  const required = [...new Set([...Object.entries(intent.slots).filter(([, d]) => d == null).map(([k]) => k), ...blank.filter((k) => !(k in values))])];
 
   const choice = chooseTemplate(intent, e);
   const base = {
@@ -229,20 +400,38 @@ export function buildCommand(intentId, text, { platform = process.platform, env,
   if (choice.gap) {
     return { ...base, command: null, gap: choice.gap, risk: intent.risk, warnings: [], critical: false, missing: [] };
   }
-  const quote = quoteForKind(choice.kind, choice.wrapPosix);
+  const baseQuote = quoteForKind(choice.kind, choice.wrapPosix);
   const tpl = choice.tpl;
+  const pwshNative = choice.kind === 'pwsh' && !choice.wrapPosix;
+  const nativeSlots = pwshNative ? pwshNativeSlots(tpl) : new Set();
+  const quote = !pwshNative ? baseQuote : (v, o = {}) => {
+    // function templates: every value is checked (the target program is not known statically)
+    if ((typeof tpl === 'function' || nativeSlots.has(o.name)) && unsafeNativePwshArg(v)) {
+      throw new UnquotableError(`value ${JSON.stringify(String(v))} cannot be passed to a native program safely by PowerShell < 7.3 (embedded " or trailing \\)`);
+    }
+    return baseQuote(v, o);
+  };
   let command;
   let missing = [];
   try {
     if (typeof tpl === 'function') {
-      const q = (s) => (/^-/.test(String(s)) ? quote('./' + s) : quote(s));
       const vals = { ...values };
       for (const r of required) if (!(r in vals)) { missing.push(r); vals[r] = PLACEHOLDER(r); }
+      // only path slots may get a ./ prefix; any other value starting with - would be read as an
+      // option (printf -n, findstr /?, taskkill ...): it is left as a placeholder instead
+      for (const [k, v] of Object.entries(vals)) {
+        if (!PATH_SLOTS.has(k) && !RAW_OK[k] && typeof v === 'string' && /^-/.test(v)) { missing.push(k); vals[k] = PLACEHOLDER(k); }
+      }
+      const pathVals = new Set([...PATH_SLOTS].filter((k) => vals[k] != null).map((k) => String(vals[k])));
+      const q = (s) => {
+        const isPath = pathVals.has(String(s));
+        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { tilde: isPath });
+      };
       // catalog functions take the OS string, variant functions a ctx object
       command = tpl(vals, q, tpl === intent.template || tpl === intent.darwin ? e.os : e);
       if (/<TEXT>/.test(command)) missing.push('text');
     } else {
-      ({ command, missing } = render(tpl, values, required, quote));
+      ({ command, missing } = render(tpl, values, required, quote, keepOptional.filter((k) => blank.includes(k) && !(k in values))));
       missing = missing.map((m) => DERIVED_REQUIRED[m] || m);
     }
   } catch (err) {

exec
/bin/bash -lc 'node --test test/' in /workspace/tellsh
exec
/bin/bash -lc "cat src/shellwords.js; nl -ba src/danger.js | sed -n '1,245p'" in /workspace/tellsh
 succeeded in 0ms:
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
     1	// Dangerous-pattern checker. Runs on every final command (including user-edited ones)
     2	// and can only ever escalate risk, never lower it.
     3	//
     4	// Regex rules run on the command text after `git`/`docker` global options are removed
     5	// (`git -C /repo -c x=y reset --hard` is checked as `git reset --hard`). Structural rules
     6	// (rm, kill, Remove-Item, rd/del) tokenize each simple command so long options, quoted targets
     7	// and `--` are understood.
     8	
     9	const RANK = { safe: 0, medium: 1, high: 2 };
    10	export const maxRisk = (a, b) => (RANK[b] > RANK[a] ? b : a);
    11	
    12	// ---------------------------------------------------------------------------------------------
    13	// light tokenizer: simple commands separated by ; & | && || ( ) and newlines, words unquoted
    14	// (POSIX '…' "…" \x and PowerShell `x). Good enough for danger checks, not a full shell parser.
    15	
    16	// PowerShell also treats the typographic quotes as quote characters (about_Quoting_Rules)
    17	const PS_SQ = /['\u2018\u2019\u201A\u201B]/;
    18	const PS_DQ = /["\u201C\u201D\u201E]/;
    19	
    20	// winPaths: backslash is never an escape (cmd.exe / PowerShell paths such as "C:\"), and the
    21	// PowerShell typographic quotes ‘…’ “…” quote like ' and "
    22	export function simpleCommands(cmd, { winPaths = false } = {}) {
    23	  const out = [];
    24	  let words = [];
    25	  let w = null;
    26	  const flushWord = () => { if (w != null) { words.push(w); w = null; } };
    27	  const flushCmd = () => { flushWord(); if (words.length) out.push(words); words = []; };
    28	  const s = String(cmd);
    29	  const isSq = (c) => (winPaths ? PS_SQ.test(c) : c === "'");
    30	  const isDq = (c) => (winPaths ? PS_DQ.test(c) : c === '"');
    31	  for (let i = 0; i < s.length; i++) {
    32	    const c = s[i];
    33	    if (isSq(c)) {
    34	      let j = i + 1;
    35	      while (j < s.length && !isSq(s[j])) j++;
    36	      const end = j;
    37	      w = (w ?? '') + s.slice(i + 1, end);
    38	      i = end;
    39	    } else if (isDq(c)) {
    40	      let v = '';
    41	      let j = i + 1;
    42	      for (; j < s.length && !isDq(s[j]); j++) {
    43	        if (((!winPaths && s[j] === '\\' && /[$`"\\\n]/.test(s[j + 1])) || s[j] === '`') && j + 1 < s.length) v += s[++j]; else v += s[j];
    44	      }
    45	      w = (w ?? '') + v;
    46	      i = j;
    47	    } else if (!winPaths && c === '\\' && i + 1 < s.length && !/[A-Za-z0-9_.%$~*]/.test(s[i + 1])) {
    48	      w = (w ?? '') + s[++i]; // POSIX escape (keeps Windows paths like C:\Users intact)
    49	    } else if ((c === '{' || c === '}') && w == null && (i + 1 >= s.length || /\s/.test(s[i + 1]))) {
    50	      flushCmd(); // standalone { } = command group / script block
    51	    } else if (/\s/.test(c)) {
    52	      if (c === '\n') flushCmd(); else flushWord();
    53	    } else if (/[;&|()]/.test(c)) {
    54	      flushCmd();
    55	    } else {
    56	      w = (w ?? '') + c;
    57	    }
    58	  }
    59	  flushCmd();
    60	  return out;
    61	}
    62	
    63	// strip wrappers that run their argument as the command (sudo, timeout N, chroot DIR, env A=b, ...)
    64	// options of each wrapper that take a separate value
    65	const WRAPPER_OPTARG = {
    66	  sudo: /^-[ugpCDhrtTUR]$|^--(?:user|group|prompt|close-from|chdir|chroot|host|role|type|other-user|command-timeout)$/,
    67	  doas: /^-[uC]$/,
    68	  nice: /^-n$|^--adjustment$/,
    69	  ionice: /^-[cnpPu]$|^--(?:class|classdata|pid|pgid|uid)$/,
    70	  xargs: /^-[IdEnLPsa]$|^--(?:arg-file|delimiter|max-args|max-procs|max-chars|replace|eof)$/,
    71	  timeout: /^-[sk]$|^--(?:signal|kill-after)$/,
    72	  chroot: /^--(?:userspec|groups)$/,
    73	  stdbuf: /^-[ioe]$|^--(?:input|output|error)$/,
    74	  env: /^-[uCS]$|^--(?:unset|chdir|split-string)$/,
    75	  time: /^-[fo]$|^--(?:format|output)$/,
    76	  exec: /^-a$/,
    77	  unshare: /^-[SGRwl]$|^--(?:setuid|setgid|root|wd|map-user|map-group|propagation|setgroups)$/,
    78	  watch: /^-[nq]$|^--(?:interval|equexit)$/,
    79	  nsenter: /^-[tSGrw]$|^--(?:target|setuid|setgid|root|wd)$/,
    80	  setpriv: /^--(?:reuid|regid|groups|inh-caps|ambient-caps|bounding-set|securebits|pdeathsig|selinux-label|apparmor-profile)$/,
    81	  strace: /^-[eoopsuPIEXbS]$/,
    82	  ltrace: /^-[eoopsuPnS]$/,
    83	  flock: /^-[wEc]$|^--(?:timeout|wait|conflict-exit-code|command)$/,
    84	  taskset: /^-[c]$/,
    85	  'systemd-run': /^-[upEH]$|^--(?:unit|property|setenv|host|machine|description|slice|uid|gid|working-directory|on-calendar|on-active)$/,
    86	  runuser: /^-[ugl]$|^--(?:user|group|login)$/,
    87	  pkexec: /^--user$/,
    88	  run0: /^-[ugD]$|^--(?:user|group|chdir|unit|property|description|slice|nice|setenv|background|machine|shell-prompt-prefix|area)$/,
    89	  chrt: /^-[TPD]$|^--(?:sched-runtime|sched-period|sched-deadline)$/,
    90	  cgexec: /^-g$/,
    91	  torsocks: /^-[uapP]$|^--(?:user|pass|address|port)$/,
    92	};
    93	// Command strings given as an option value are checked as commands of their own. Any program:
    94	// `-c STR`, `--command STR`, `--command=STR` (`flock -c "rm -rf /" LOCK`, `script -c "…"`, `find … -exec sh -c "…"`);
    95	// shells, su and runuser also take -c inside a cluster (`bash -lc "…"`, `su -lc "…"`); env -S splits its string.
    96	const CMD_STRING_ANY = /^(?:-c|--command|--session-command)$/;
    97	const CMD_STRING_CLUSTER = /^-[a-zA-Z]*c$/;
    98	const SHELLS = /^(?:ba|z|da|k|fi|c|tc|a|mk|r)?sh$|^busybox$/;
    99	const PRIVILEGED = new Set(['sudo', 'doas', 'su', 'runuser', 'pkexec', 'run0', 'sudoedit']);
   100	// programs whose whole job is to run a command (string): a payload that depends on the shell state cannot be checked
   101	const RUNNERS = new Set(['su', 'runuser', 'flock', 'script', 'eval', 'env', 'watch', 'tmux', 'screen', 'ssh', 'xargs', 'parallel', 'sudo', 'doas',
   102	  'pkexec', 'run0', 'nohup', 'setsid', 'timeout', 'iex', 'invoke-expression', 'cmd', 'pwsh', 'powershell', 'start-process', 'sem']);
   103	const WRAPPERS = new Set(['sudo', 'doas', 'run0', 'command', 'builtin', 'exec', 'nohup', 'time', 'nice', 'ionice', 'then', 'do', 'else', '&', 'busybox', 'toybox', 'xargs', 'timeout', 'chroot', 'stdbuf', 'env', 'setsid', 'unbuffer', 'caffeinate',
   104	  'unshare', 'watch', 'nsenter', 'setpriv', 'strace', 'ltrace', 'flock', 'taskset', 'systemd-run', 'runuser', 'firejail', 'proot', 'fakeroot',
   105	  'pkexec', 'chrt', 'cgexec', 'eatmydata', 'torsocks', 'catchsegv', 'proxychains', 'proxychains4', 'tsocks', 'valgrind', 'faketime', 'ts',
   106	  'chronic', 'nocache', 'trickle', 'numactl', 'schedtool', 'cpulimit', 'prlimit', 'sg', 'newgrp', 'su', 'parallel', 'sem', 'tmux', 'screen',
   107	  'script', 'xvfb-run', 'dbus-launch', 'dbus-run-session', 'expect', 'gdb', 'ssh-agent', 'sshpass', 'with-lock-ex', 'lckdo', 'daemonize', 'start-stop-daemon']);
   108	// programs that run the command at the end of their arguments without being a plain wrapper
   109	const SUFFIX_RUNNERS = new Set(['ssh', 'mosh', 'kubectl', 'docker', 'podman', 'lxc', 'incus', 'machinectl', 'distrobox', 'toolbox', 'flatpak', 'nix-shell', 'firejail', 'bwrap']);
   110	
   111	// programs whose arguments are data, never a command they run (`grep -r rm src`, `man rm`, `echo rm -rf /`)
   112	const DATA_ARGS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'sed', 'awk', 'gawk', 'mawk', 'echo', 'printf', 'man', 'which', 'whereis',
   113	  'type', 'whatis', 'apropos', 'help', 'info', 'tldr', 'git', 'cat', 'less', 'more', 'head', 'tail', 'ls', 'find', 'locate', 'tellsh', 'alias',
   114	  'history', 'fc', 'complete', 'compgen', 'hash', 'test', '[', '[[', 'true', 'false', 'printenv', 'set', 'unset', 'export', 'declare', 'local',
   115	  'readonly', 'trap', 'write-host', 'write-output', 'get-help', 'get-command', 'select-string', 'sls', 'findstr', 'wc', 'sort', 'uniq', 'cut',
   116	  'tr', 'diff', 'cmp', 'file', 'stat', 'du', 'df', 'tree', 'jq', 'yq', 'xxd', 'od', 'hexdump', 'strings', 'mkdir', 'touch', 'cd', 'pushd']);
   117	// programs that destroy or change things: after an unknown program they may be the command it runs (`mywrap rm -rf /`)
   118	const DANGER_HEADS = /^(?:rm|rmdir|unlink|shred|wipe|wipefs|mkfs(?:\.\w+)?|mke2fs|dd|truncate|kill|pkill|killall|chmod|chown|chgrp|mv|cp|rsync|find|tar|tee|sh|bash|zsh|dash|ksh|fish|eval|shutdown|reboot|halt|poweroff|crontab|iptables|remove-item|ri|del|erase|rd|format|diskpart|stop-process|format-volume|clear-disk)$/i;
   119	
   120	/** Collect `-c STR` style payloads of one simple command into `inner` (`unsure` when a runner's payload cannot be read). */
   121	function payloads(w, inner, flags) {
   122	  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
   123	  if (PRIVILEGED.has(h)) flags.privileged = true;
   124	  // a payload of a program that runs commands (or of `sh -c` inside other arguments: `find … -exec sh -c "…"`)
   125	  // must be readable; `-c` of any other program (`grep -c "$PAT"`) is still checked, without that requirement
   126	  const add = (v, i) => {
   127	    if (v == null) return;
   128	    const prev = String(w[i - 1] ?? '').replace(/^.*[\\/]/, '').toLowerCase();
   129	    const runner = RUNNERS.has(h) || SHELLS.test(h) || SHELLS.test(prev) || /^--(?:command|session-command|split-string)/.test(String(w[i] ?? ''));
   130	    if (!runner) { (flags.lenient ??= []).push(String(v)); return; }
   131	    inner.push(String(v));
   132	    if (/[$`]|^\s*$/.test(String(v))) flags.unsure = `${SHELLS.test(prev) ? prev : h} runs a command string that depends on the shell state (${String(v).slice(0, 40)}); it cannot be checked`;
   133	  };
   134	  for (let i = 1; i < w.length; i++) {
   135	    const x = String(w[i]);
   136	    if (x === '--' && !SHELLS.test(h)) continue;
   137	    const eq = x.match(/^(--(?:command|session-command|split-string))=(.*)$/s);
   138	    if (eq) { add(eq[2], i); continue; }
   139	    if (h === 'pwsh' || h === 'powershell') {
   140	      if (/^-(?:e|ec|en|enc\w*|encodedcommand)$/i.test(x)) { flags.unsure = `${h} -EncodedCommand cannot be checked`; i++; continue; }
   141	      if (/^-(?:c|co\w*|command)$/i.test(x)) { add(w.slice(i + 1).join(' '), i); break; }
   142	      continue;
   143	    }
   144	    if (h === 'cmd' && /^\/[ck]$/i.test(x)) { add(w.slice(i + 1).join(' '), i); break; }
   145	    if (h === 'env' && (x === '-S' || x === '--split-string')) { add(w[i + 1], i); i++; continue; }
   146	    if (CMD_STRING_ANY.test(x) || ((SHELLS.test(h) || h === 'su' || h === 'runuser') && CMD_STRING_CLUSTER.test(x))) {
   147	      // sh -c 'cmd' arg0 args: only the string is the command
   148	      add(w[i + 1], i);
   149	      // its $0, $1, "$@" are the words after it (`sh -c 'rm -rf "$1"' _ /`): also checked with them filled in
   150	      if (SHELLS.test(h) && w[i + 1] != null && w.length > i + 2) inner.push(withPositional(String(w[i + 1]), w.slice(i + 2).map(String)));
   151	      i++;
   152	    }
   153	  }
   154	  if (h === 'eval' || h === 'iex' || h === 'invoke-expression') add(w.slice(1).join(' '), 0);
   155	}
   156	
   157	const sq = (x) => `'${x.replace(/'/g, "'\\''")}'`;
   158	/** `sh -c STR arg0 args…`: STR with $0…$9, ${N}, "$@", $@ and $* replaced by the (quoted) arguments. */
   159	function withPositional(str, args) {
   160	  const all = args.slice(1).map(sq).join(' ');
   161	  return str.replace(/"\$@"|"\$\*"|\$@|\$\*/g, all).replace(/"\$\{?(\d)\}?"|\$\{?(\d)\}?/g, (m, a, b) => sq(args[+(a ?? b)] ?? ''));
   162	}
   163	
   164	/** The command a wrapper chain runs. `inner` collects command strings given as option values (`su -c "…"`). */
   165	export function commandWords(words, inner = [], flags = {}) {
   166	  let w = words;
   167	  for (;;) {
   168	    while (w.length && /^\w+=/.test(w[0])) w = w.slice(1);
   169	    const h = (w[0] || '').replace(/^.*[\\/]/, '').toLowerCase();
   170	    payloads(w, inner, flags);
   171	    if (!WRAPPERS.has(h)) return w;
   172	    w = w.slice(1);
   173	    const optArg = WRAPPER_OPTARG[h];
   174	    while (w.length && /^-/.test(w[0])) {
   175	      const o = w[0];
   176	      w = w.slice(1);
   177	      if (o === '--') break;
   178	      if (optArg && optArg.test(o)) w = w.slice(1);
   179	    }
   180	    if (h === 'env') while (w.length && /^\w+=/.test(w[0])) w = w.slice(1);
   181	    if (h === 'timeout' && w.length) w = w.slice(1); // DURATION
   182	    if (h === 'chroot' && w.length) w = w.slice(1); // NEWROOT
   183	    if (h === 'flock' && w.length) w = w.slice(1); // LOCKFILE
   184	    if (h === 'taskset' && w.length && /^(?:0x)?[\da-f,-]+$/i.test(w[0])) w = w.slice(1); // MASK (without -c: always one)
   185	    if (h === 'chrt' && w.length && /^\d+$/.test(w[0])) w = w.slice(1); // PRIORITY
   186	  }
   187	}
   188	
   189	/**
   190	 * Every command a simple command may run: the wrapper chain as parsed by commandWords, and, because wrapper
   191	 * options are not always understood (`sudo -iu root rm …`, `nice --adjustment=5 rm …`), the command starting
   192	 * at every later non-option word of a wrapper / remote runner (`ssh host rm -rf /`, `docker exec ct rm …`).
   193	 * The checks only ever escalate, so reading too many candidates is safe; missing one is not.
   194	 */
   195	export function commandChains(words, inner, flags) {
   196	  const out = [];
   197	  const push = (w) => { if (w.length && !out.some((o) => o.length === w.length && o.every((x, i) => x === w[i]))) out.push(w); };
   198	  push(commandWords(words, inner, flags));
   199	  const lead = words.findIndex((x) => !/^\w+=/.test(x));
   200	  const h = lead >= 0 ? String(words[lead]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase() : '';
   201	  const remote = SUFFIX_RUNNERS.has(h) && (!['docker', 'podman', 'kubectl', 'lxc', 'incus'].includes(h) || words.some((x) => ['exec', 'run', 'debug', 'create'].includes(x)));
   202	  // an unknown program followed by a destructive command (`mywrap rm -rf /`, `catchsegv2 dd …`): it may run it
   203	  if (h && !WRAPPERS.has(h) && !remote && !DATA_ARGS.has(h)) {
   204	    for (let j = lead + 1; j < words.length - 1; j++) if (DANGER_HEADS.test(String(words[j]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, ''))) push(commandWords(words.slice(j), inner, flags));
   205	  }
   206	  if (WRAPPERS.has(h) || remote) {
   207	    for (let j = lead + 1; j < words.length; j++) {
   208	      if (/^-|^\w+=/.test(words[j])) continue;
   209	      const w = commandWords(words.slice(j), inner, flags);
   210	      push(w);
   211	      // a lone quoted string with spaces is a command (`tmux new "rm -rf /"`, `ssh host "rm -rf /"`)
   212	      if (w.length === 1 && /\s/.test(w[0])) inner.push(w[0]);
   213	    }
   214	  }
   215	  return out;
   216	}
   217	
   218	// Lexically normalise a path for the danger checks: `//`, `/./`, a trailing `/.` and `/..` collapse
   219	// (`rm -rf /.`, `rm -rf //`, `rm -r /etc/../`), so they are compared as the directory they name.
   220	// Only absolute, ~ and $HOME paths; a `..` above the home prefix is kept as is.
   221	export function normTarget(t) {
   222	  const s = String(t).trim();
   223	  const m = s.match(/^(\/|~(?=\/|$)|\$\{?HOME\}?(?=\/|$))(.*)$/s);
   224	  if (!m) return s;
   225	  const root = m[1] === '/';
   226	  const parts = [];
   227	  for (const p of m[2].split('/')) {
   228	    if (p === '' || p === '.') continue;
   229	    if (p === '..' && parts.length && parts[parts.length - 1] !== '..') { parts.pop(); continue; }
   230	    if (p === '..' && root) continue;
   231	    parts.push(p);
   232	  }
   233	  const prefix = root ? '' : m[1];
   234	  return parts.length ? prefix + '/' + parts.join('/') : (root ? '/' : prefix);
   235	}
   236	
   237	// system directories (and their direct children), user homes and key dot-directories: a recursive
   238	// delete or a move of any of these is critical
   239	const SYS_CRIT = /^(?:\/\*?|(?:~|\$\{?HOME\}?)(?:\/\*|\/\.(?:ssh|gnupg|config|local)(?:\/\*)?)?|\/(?:bin|boot|dev|etc|home|lib\w*|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private)(?:\/\*)?|\/(?:bin|boot|etc|home|lib\w*|sbin|usr|System|Users|Library|private)\/[^/*]+(?:\/\*)?|\/var\/(?:lib|db|spool|log|mail|backups)(?:\/\*)?|\/usr\/local\/[^/*]+(?:\/\*)?)$/;
   240	const sysCrit = (t) => SYS_CRIT.test(normTarget(t));
   241	
   242	const POSIX_CRIT_TARGET = /^(?:\/+|\/+\*|~\/*|~\/+\*|\$\{?HOME\}?\/*|\$\{?HOME\}?\/+\*|\*|\.\/*|\.\/+\*|\.\.\/*|\.\.\/+\*|\.\*|\/+(?:bin|boot|dev|etc|home|lib|lib32|lib64|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private)\/*\*?)$/;
   243	
   244	function rmCheck(words, hit) {
   245	  let recursive = false;

 exited 1 in 6290ms:
TAP version 13
# Subtest: /workspace/tellsh/test/cli.test.js
not ok 1 - /workspace/tellsh/test/cli.test.js
  ---
  duration_ms: 2875.887797
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
  duration_ms: 549.154573
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 3 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 222.608959
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 4 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 225.674044
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 5 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 249.478943
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 6 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 206.73407
  ...
# Subtest: /workspace/tellsh/test/pipeline.test.js
not ok 7 - /workspace/tellsh/test/pipeline.test.js
  ---
  duration_ms: 390.760685
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
  duration_ms: 1268.577743
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
  duration_ms: 639.816254
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
  duration_ms: 967.316968
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
  duration_ms: 567.876705
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
  duration_ms: 388.430233
  ...
# Subtest: /workspace/tellsh/test/regressions14.test.js
ok 13 - /workspace/tellsh/test/regressions14.test.js
  ---
  duration_ms: 398.943992
  ...
# Subtest: /workspace/tellsh/test/regressions15.test.js
ok 14 - /workspace/tellsh/test/regressions15.test.js
  ---
  duration_ms: 493.642295
  ...
# Subtest: /workspace/tellsh/test/regressions16.test.js
ok 15 - /workspace/tellsh/test/regressions16.test.js
  ---
  duration_ms: 476.990116
  ...
# Subtest: /workspace/tellsh/test/regressions17.test.js
ok 16 - /workspace/tellsh/test/regressions17.test.js
  ---
  duration_ms: 502.481701
  ...
# Subtest: /workspace/tellsh/test/regressions18.test.js
ok 17 - /workspace/tellsh/test/regressions18.test.js
  ---
  duration_ms: 587.552408
  ...
# Subtest: /workspace/tellsh/test/regressions19.test.js
ok 18 - /workspace/tellsh/test/regressions19.test.js
  ---
  duration_ms: 660.669448
  ...
# Subtest: /workspace/tellsh/test/regressions2.test.js
not ok 19 - /workspace/tellsh/test/regressions2.test.js
  ---
  duration_ms: 936.381051
  location: '/workspace/tellsh/test/regressions2.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions20.test.js
ok 20 - /workspace/tellsh/test/regressions20.test.js
  ---
  duration_ms: 669.508273
  ...
# Subtest: /workspace/tellsh/test/regressions21.test.js
ok 21 - /workspace/tellsh/test/regressions21.test.js
  ---
  duration_ms: 554.293393
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 22 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 356.685453
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 23 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 506.106444
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 24 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 433.272861
  ...
# Subtest: /workspace/tellsh/test/regressions4.test.js
not ok 25 - /workspace/tellsh/test/regressions4.test.js
  ---
  duration_ms: 1282.221627
  location: '/workspace/tellsh/test/regressions4.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions5.test.js
ok 26 - /workspace/tellsh/test/regressions5.test.js
  ---
  duration_ms: 863.707853
  ...
# Subtest: /workspace/tellsh/test/regressions6.test.js
ok 27 - /workspace/tellsh/test/regressions6.test.js
  ---
  duration_ms: 842.735838
  ...
# Subtest: /workspace/tellsh/test/regressions7.test.js
ok 28 - /workspace/tellsh/test/regressions7.test.js
  ---
  duration_ms: 486.377809
  ...
# Subtest: /workspace/tellsh/test/regressions8.test.js
not ok 29 - /workspace/tellsh/test/regressions8.test.js
  ---
  duration_ms: 687.287636
  location: '/workspace/tellsh/test/regressions8.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions9.test.js
not ok 30 - /workspace/tellsh/test/regressions9.test.js
  ---
  duration_ms: 889.872127
  location: '/workspace/tellsh/test/regressions9.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 31 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 3730.004227
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/slot-cases.js
ok 32 - /workspace/tellsh/test/slot-cases.js
  ---
  duration_ms: 110.224591
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 33 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 217.964638
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 34 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 248.549597
  location: '/workspace/tellsh/test/templates.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..34
# tests 34
# suites 0
# pass 22
# fail 12
# cancelled 0
# skipped 0
# todo 0
# duration_ms 6285.172176

exec
/bin/bash -lc "rg -n '"'^export|''^function|''^const [A-Z]'"' src/history.js; cat scripts/hybrid/export_data.js; cat scripts/hybrid/train_a_dev.sh" in /workspace/tellsh
 succeeded in 0ms:
14:export { isAmbiguous };
19:export function historyCandidates(shell, env = process.env, os = process.platform) {
38:function readTail(path, maxBytes = 32768) {
52:function unmetafy(buf) {
61:export function parseHistory(text, kind = 'bash', { partial = false } = {}) {
88:export function loadHistory({ shell = 'bash', file, n = 2, env = process.env, os = process.platform } = {}) {
112:const PS_CMDLET = /^[A-Za-z]+-[A-Za-z]+$/;
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
232:function destEnts(srcs, dst, ents) {
243:const VALUE_OPTS = {
259:function parseArgs(args, valueOpts = new Set()) {
279:function unwrap(w) {
287:const CD_HEADS = new Set(['cd', 'pushd', 'popd', 'chdir', 'set-location', 'sl', 'push-location', 'pop-location']);
289:export const isRelativePath = (v) => {
293:const PATH_SLOT_KEYS = ['path', 'file', 'src', 'dst', 'dest', 'archive'];
295:function staleRelative(ents, slots) {
301:function staleRepo(ents, slots) {
306:const REDIR_TARGET_OP = /^\d*(?:[<>]{1,2}[&|]?|&>>?)$/;
307:const REDIR_DUP_OP = /^\d*[<>]+&[\d-]+$/;
310:function psNative(head, args, ents, setIntent) {
350:function entsFromSlots(intent, slots, ents) {
370:const TELLSH_LINE = /^(?:npx\s+(?:-y\s+)?|node\s+)?(?:\S*[\\/])?tellsh(?:\.js)?(?:\s+(.*))?$/s;
373:const TELLSH_VALUE_OPTS = new Set(['--shell', '--os', '--platform', '--top', '--threshold']);
379:export function tellshQuery(line, kind = 'posix') {
385:export function tellshArgs(line, kind = 'posix') {
411:export function analyzeCommand(line, classify, kind = 'posix') {
596:const FS_LISTERS = new Set(['ls', 'tree', 'dir', 'gci', 'get-childitem', 'll', 'la', 'find', 'fd', 'fdfind', 'locate', 'mlocate', 'plocate',
598:const FS_SEARCHERS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'select-string', 'sls', 'findstr']);
599:const PROC_LISTERS = new Set(['ps', 'top', 'htop', 'btop', 'atop', 'pgrep', 'pidof', 'pstree', 'get-process', 'gps', 'tasklist']);
601:const GLOBAL_VALUE_OPTS = {
609:const SCOPE_OPTS = {
618:const SCOPE_ENTS = { git: ['branch'], docker: ['container'], podman: ['container'], gh: ['pr', 'branch'] };
619:const SCOPE_ENV = /^(?:GIT_DIR|GIT_WORK_TREE|GIT_NAMESPACE|DOCKER_HOST|DOCKER_CONTEXT|DOCKER_CONFIG|CONTAINER_HOST|CONTAINER_CONNECTION|GH_REPO|GH_HOST)=/;
621:function unsetScopeVars(rw, setEnvCall = false) {
630:function scopedElsewhere(w, raw, exported = new Set()) {
644:const WRAPPER_CWD = {
656:const CWD_WRAPPERS = new Set(['pkexec']);
657:const WRAPPER_ROOT = {
663:const ROOT_WRAPPERS = new Set(['chroot', 'proot', 'firejail', 'bwrap', 'systemd-nspawn']);
666:const NS_WRAPPERS = new Set(['nsenter', 'unshare']);
669:const WRAPPER_HOST = {
675:const HOST_WRAPPERS = new Set(['machinectl']);
679:const PROP_WRAPPERS = new Set(['systemd-run', 'run0']);
681:const PROP_OPT = /^(?:-[tPqGdSr]*p|--property)$/;
682:const PROP_ATTACHED = /^(?:-[tPqGdSr]*p|--property=)(.+)$/;
683:const PROP_CWD = /^WorkingDirectory=/i;
684:const PROP_ROOT = /^(?:RootDirectory|RootImage|RootEphemeral|MountImages|ExtensionImages|ExtensionDirectories|BindPaths|BindReadOnlyPaths|TemporaryFileSystem|PrivateTmp|PrivateMounts|MountAPIVFS|PrivatePIDs|PrivateNetwork|NetworkNamespacePath|IPCNamespacePath|PrivateUsers|JoinsNamespaceOf|PrivateIPC|PrivateDevices)=|^ProtectHome=tmpfs\b/i;
689:function wrapperScope(w, raw) {
711:function markScoped(o) {
715:function afterGlobals(head, args) {
723:function listedBySegment(w, pipedIn, k) {
747:const LIST_INTENT = { docker_ps: ['container'], docker_ps_all: ['container'], docker_stats: ['container'], list_services: ['service'],
749:const LIST_FAMILY = { ls: ['file', 'dir'], find: ['file', 'dir'], grep: ['file', 'dir'], du: ['file', 'dir'], ps: ['pid', 'proc'], ss: ['port', 'pid', 'proc'] };
754:const FILTER_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag', 'findstr', 'select-string', 'sls', 'where-object', 'where', '?']);
755:const GREP_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag']);
765:function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
922:const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url', 'pr'];
924:const GH_PR_SELECTS = new Set(['view', 'checkout', 'co', 'merge', 'close', 'reopen', 'diff', 'checks', 'review', 'ready', 'edit', 'comment']);
925:const GH_PR_VALUE_OPTS = new Set(['-R', '--repo', '--json', '-q', '--jq', '-t', '--template', '--title', '-b', '--body', '-F',
945:export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
978:export function cwdFlags(cwd) {
989:export function ctxFeatures(ctx) {
1003:const SAME_RES = [
1015:const EXPLICIT_SAME = [SAME_RES[0], SAME_RES[3], SAME_RES[4], SAME_RES[6]];
1019:const PRONOUN_EN = /\b(it|its|that|this|them|those|these|the same one)\b/;
1020:const PRONOUN_WORD = /^(it|its|that|this|them|those|these|one|again|there|here|tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym|to|force|forced|forcibly|sila|sile|silowo|recursive\w*|rekurencyjn\w*|please|prosze|too|also|tez|rowniez)$/;
1022:const PLURAL = /(?:^|[^a-z])(them|those|these|je|te|tamte|ich|nimi)(?=$|[^a-z])/;
1023:const PRONOUN_PL = /(?:^|\s)(tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym)(?=\s|$|[?!.,])|(?:^|\s)to(?=\s*[?!.]*$|\s+(?:co|ktor\w*|tam))/;
1027:const LOCATIVE = new RegExp([
1038:export const hasLocative = (q) => LOCATIVE.test(fold(q));
1041:const CONTENTS = new RegExp([
1050:const NOUN_TYPE = [
1065:const FORCE = /\b(force\w*|forcibly|-9|sigkill|na sile|sila|silowo|brutaln\w*)\b/;
1066:const VERBS = [
1088:const SLOT_FROM_ENT = {
1094:const NOT_REF = /\b(?:that|which|this)\s+(?:are|is|was|were|have|has|had|(?:contain|match|end|start|begin|use|take|listen|run|belong|need)(?:s|es|ed|d|ing)?|running|using|taking|ran|took|do|does|did|can|could|will|would|should|i|you|we|they)\b|\b(?:this|that|last|next)\s+(?:week|month|year|day|morning|evening|afternoon|night|time|hour|minute)s?\b/g;
1096:export const hasPronoun = (q) => PRONOUN_EN.test(refText(q)) || PRONOUN_PL.test(refText(q));
1099:export function sameFor(q) {
1109:function retarget(intent, arg) {
1133:export function resolveReference(query, ctx) {
1228:function locativeRef(fq, ctx) {
1248:export function changeGuard(type, value, fq, ctx) {
1274:const HINTED_NOUN = /\b(?:that|this|those|these|the|ten|ta|te|tamten|tamta|tamte)\s+([a-z0-9][\w.-]*)\s+(?:folders?|director(?:y|ies)|dirs?|files?|branch(?:es)?|containers?|services?|process(?:es)?|katalog\w*|folder\w*|plik\w*|kontener\w*|uslug\w*|galaz\w*|galez\w*)\b/g;
1276:const NOT_HINT = /^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back|list\w*|wylistuj\w*|check|sprawdz\w*|wipe|nuke|purge|destroy|clear|clean\w*|wyczysc\w*|drop|what|which|where|about|with|from|into|then|also|again|teraz|jeszcze|whatever|everything|anything|something|thing|stuff|still|there|here|tutaj|tamto|wszystko|cokolwiek|whole|entire|completely|cale|calym|listening|running|working|executable|wykonywaln\w*|contents?|zawartosc\w*|entries|inside|wewnatrz|siedzi|srodku|please|prosze|again|ponownie|znowu|forcefully|recursively|rekurencyjnie|permanently|trwale|names?|nazw\w*|only|tylko|same|samo|thing|merged|zmergowan\w*|scalon\w*|current|biezac\w*|aktualn\w*|obecn\w*|previous|poprzedni\w*|ostatni\w*|last|other|inn\w*|empty|pust\w*|temporary|tymczasow\w*|local|lokaln\w*|remote|zdaln\w*|stopped|zatrzyman\w*|created|utworzon\w*|newly|nowo|nowy|nowa|nowe|nowym|whole|cal\w*|samym|given|mentioned|wspomnian\w*|above|powyzsz\w*|broken|zepsut\w*|failed|failing|nieudan\w*|old\w*|star\w*)$/;
1281:export function entityForSlot(slot, ctx) {
1293:const SAME_BUT = [/^\s*(?:and\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?,?\s+but\s+(.+)$/, /^\s*(?:a\s+|i\s+)?(?:to\s+)?samo,?\s+ale\s+(.+)$/,
1296:export function sameBut(query, ctx) {
1306:function intentUses(intent, ent) {
1310:function pickEnt(intent, ent, ctx) {
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

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- scripts/gen_data.js scripts/teacher.js' in /workspace/tellsh
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
 
diff --git a/scripts/teacher.js b/scripts/teacher.js
index cadac4a..3c4990b 100644
--- a/scripts/teacher.js
+++ b/scripts/teacher.js
@@ -1,172 +1,361 @@
 #!/usr/bin/env node
-// Optional build-time teacher: verify a SAMPLE of generated training labels with TypeSafe Jev
-// (https://docs.typesafe.ai, POST /v1/systemone, model jev-latest). Never used at runtime.
+// Build-time teacher: TypeSafe Jev (https://docs.typesafe.ai, POST /v1/systemone, model jev-latest).
+// Never used at runtime. The API key is read from the environment only; it is never printed or logged.
 //
-//   TYPESAFE_API_KEY=... node scripts/teacher.js [--calls 300] [--seed 5]
+//   TYPESAFE_API_KEY=... node scripts/teacher.js verify   # (a) every training row: intent + risk
+//   TYPESAFE_API_KEY=... node scripts/teacher.js label    # (b) label/filter new paraphrase candidates
+//   TYPESAFE_API_KEY=... node scripts/teacher.js mine     # (c) hard negatives between confusable intents
+//   node scripts/teacher.js report                        # EVAL.md teacher section from the artifacts
 //
-// Per sampled training row, ONE call asks (questions are evaluated in parallel by the API):
-//   intent  choice   gold intent vs the two closest alternatives from our cascade (+ "none of these")
-//   correct noul     the rendered bash command does what the request asks
-//   risk    choice   safe / medium / high — compared with our final risk (catalog risk + danger.js)
-//   span_i  noul     up to 3 silver slot spans ("'~/Pobrane' is the directory/file path")
-// Disagreements are written to data/teacher/review.jsonl for manual inspection; decisions taken after
-// inspection live in data/teacher/decisions.jsonl and are applied by scripts/gen_data.js.
-// The API key is read from the environment only; it is never printed or logged.
+// Independence: the intent question shows ONLY the request (and the user's shell); never our label, the
+// rendered command or anything derived from the label. The options are the label plus the cascade's
+// closest alternatives plus known confusable intents plus "none of these", shuffled, so the label is
+// one of 4-6 plausible options. The risk question is asked about the request alone. Because the label is
+// always among the options, "agreement" is a consistency check, not an independent accuracy estimate.
+// Options come from --options-model (default model/model.bin; sha256 recorded in each summary), so pin
+// that file to rerun with identical prompts and cache keys. Failed calls are counted, never treated as a
+// rejection. Held-out texts and their near-duplicates (scripts/lib/heldout.js) are never sent.
+// Several rows are packed into one call (one question per row and aspect; Jev evaluates every
+// question in isolation against the shared state), responses are cached in build/jev_cache.jsonl, and
+// every network call is counted in data/teacher/ledger.json.
 import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
 import { join } from 'node:path';
 import { fileURLToPath } from 'node:url';
-import { BY_ID } from '../src/catalog.js';
-import { FAMILY_OF } from '../src/tools.js';
-import { buildCommand } from '../src/fill.js';
+import { BY_ID, INTENTS } from '../src/catalog.js';
 import { cascade } from '../src/cascade.js';
-import { silverSpans, mulberry32 } from './lib/silver.js';
+import { envFeatures } from '../src/env.js';
+import { normalize } from '../src/features.js';
+import { mulberry32 } from './lib/silver.js';
+import { ask, pool, stats, recordLedger, LEDGER, PRICE_PER_MTOK, MODEL } from './lib/jev.js';
 import { updateSection } from './report.js';
+import { CONFUSABLE, CONTRAST_RULES } from './lib/confusable.js';
+import { exclusionIndex } from './lib/heldout.js';
+import { parseModel, DEFAULT_MODEL } from '../src/model.js';
+import { createHash } from 'node:crypto';
 
 const ROOT = fileURLToPath(new URL('..', import.meta.url));
+const TDIR = join(ROOT, 'data', 'teacher');
+const BDIR = join(ROOT, 'build', 'teacher');
 const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=')[1] : d; };
-const MAX_CALLS = Math.min(300, +arg('calls', 300));
-const PRICE_PER_MTOK = 0.042; // USD per million input tokens (jev-1.13, docs.typesafe.ai/models); output tokens are free
-const ENDPOINT = 'https://api.typesafe.ai/v1/systemone';
-const KEY = process.env.TYPESAFE_API_KEY;
-
 const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
-const TYPE_DESC = {
-  PATH: 'a file or directory path (or a named place like the home or Downloads folder)', SIZE: 'a file size', EXT: 'a file extension / file type',
-  PORT: 'a network port number', TIME: 'a time window or age', NAME: 'the name of a process, service, container, package or command',
-  NUM: 'a count (how many results/lines)', URL: 'a URL', HOST: 'a host name, IP address or user@host', BRANCH: 'a git branch name',
-  PATTERN: 'the text to search for (or the text to be replaced)', REPL: 'the replacement text', USER: 'a user name', MODE: 'file permission bits',
-  MSG: 'a commit message', VAR: 'an environment variable name', PID: 'a process id', TEXT: 'the text to encode/decode',
-};
-const RISK_DESC = {
-  safe: 'read-only: only shows information, changes nothing',
-  medium: 'changes files, settings, services or remote state, but in a recoverable way',
+const writeJsonl = (p, rows) => writeFileSync(p, rows.map((r) => JSON.stringify(r)).join('\n') + (rows.length ? '\n' : ''));
+const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f)).map((r) => ({ ...r, file: f }))) : []);
+
+const STATE = 'Requests that users typed (in Polish or English) into a command-line assistant which turns each request into ONE shell command ' +
+  'for the named shell. Each question quotes one request.';
+const SHELL_NAME = { bash: 'bash', zsh: 'zsh', sh: 'POSIX sh', powershell: 'PowerShell', fish: 'fish', cmd: 'Windows cmd.exe' };
+const RISK = {
+  safe: 'read-only: only shows information',
+  medium: 'changes files, settings or remote state in a recoverable way',
   high: 'deletes data, kills processes, discards work or is hard to undo',
 };
+const RANK = { safe: 0, medium: 1, high: 2 };
 
-async function ask(state, questions) {
-  const r = await fetch(ENDPOINT, {
-    method: 'POST',
-    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
-    body: JSON.stringify({ model: 'jev-latest', state, questions }),
-  });
-  const j = await r.json().catch(() => ({}));
-  if (!r.ok) throw new Error(`HTTP ${r.status}`);
-  return j;
+// The cascade that proposes the alternative options. Prompts (and so cache keys) depend on it: pin it
+// with --options-model=FILE to rerun with the same questions; its sha256 is recorded in every summary.
+const OPTIONS_MODEL_PATH = arg('options-model', DEFAULT_MODEL);
+let optionsModel = null;
+let optionsModelSha = null;
+function getOptionsModel() {
+  if (!optionsModel) {
+    const buf = readFileSync(OPTIONS_MODEL_PATH);
+    optionsModelSha = createHash('sha256').update(buf).digest('hex');
+    optionsModel = parseModel(buf);
+  }
+  return optionsModel;
 }
 
-async function main() {
-  const reportOnly = process.argv.includes('--report-only');
-  if (reportOnly) {
-    const meta = JSON.parse(readFileSync(join(ROOT, 'build', 'teacher_meta.json'), 'utf8'));
-    return summarize(readJsonl(join(ROOT, 'build', 'teacher_results.jsonl')), meta);
-  }
-  if (!KEY) {
-    console.log('teacher: TYPESAFE_API_KEY not set — skipped');
-    updateSection('teacher', '## Teacher verification (TypeSafe Jev)\n\nSkipped: `TYPESAFE_API_KEY` not set at build time.');
-    return;
-  }
-  const rng = mulberry32(+arg('seed', 5));
-  const rows = [...readdirSync(join(ROOT, 'data', 'intents')).sort().flatMap((f) => readJsonl(join(ROOT, 'data', 'intents', f))),
-    ...readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl'))];
-  // stratified sample: shuffle, then round-robin over intents
-  const byIntent = {};
-  for (const r of rows.sort(() => rng() - 0.5)) (byIntent[r.intent] ??= []).push(r);
-  const sample = [];
-  for (let round = 0; sample.length < MAX_CALLS && round < 10; round++) {
-    for (const id of Object.keys(byIntent).sort(() => rng() - 0.5)) {
-      if (sample.length >= MAX_CALLS) break;
-      if (byIntent[id][round]) sample.push(byIntent[id][round]);
-    }
+/** Options for the intent question: label + closest cascade alternatives + confusable intents, shuffled. */
+function intentOptions(text, label, shell, os, rng, k = 3) {
+  const c = cascade(text, { model: getOptionsModel(), extras: envFeatures({ shell: shell || 'bash', os: os || 'linux' }), top: 8 });
+  const alts = c.top.map((t) => t.intent).filter((i) => i && i !== label);
+  const conf = (CONFUSABLE[label] || []).filter((i) => i !== label);
+  const opts = [...new Set([label, ...conf.slice(0, 2), ...alts])].slice(0, k + 1 + Math.min(1, conf.length));
+  for (let i = opts.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [opts[i], opts[j]] = [opts[j], opts[i]]; }
+  return { opts, model: c.intent, modelP: c.confidence };
+}
+const criteriaOf = (opts) => Object.fromEntries([...opts.map((i) => [i, BY_ID[i].description]), ['none', 'none of these / something else']]);
+const intentQ = (text, shell, opts) => ({
+  type: 'choice',
+  instructions: { question: 'Which action does this request ask the assistant to do?', shell: SHELL_NAME[shell] || 'bash', request: text },
+  criteria: criteriaOf(opts),
+});
+const riskQ = (text) => ({
+  type: 'choice',
+  instructions: { question: 'How risky is it to carry out this request on the user\'s machine?', request: text },
+  criteria: RISK,
+});
+
+/** Ask about many items, `per` items per call. item -> { qs: {suffix: question} }; returns answers per item. */
+async function askPacked(items, per, label) {
+  const calls = [];
+  for (let i = 0; i < items.length; i += per) {
+    const group = items.slice(i, i + per);
+    calls.push(async () => {
+      const questions = {};
+      group.forEach((it, j) => { for (const [k, q] of Object.entries(it.qs)) questions[`${k}_${j}`] = q; });
+      const r = await ask(STATE, questions);
+      return group.map((_, j) => Object.fromEntries(Object.keys(group[j].qs).map((k) => [k, r.answers[`${k}_${j}`]])));
+    });
   }
-  const results = [];
-  let calls = 0;
-  let inTok = 0;
-  let failed = 0;
   const t0 = Date.now();
-  const work = sample.map((r) => async () => {
-    const env = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
-    const b = buildCommand(r.intent, r.text, { env });
-    const c = cascade(r.text, { extras: ['shell=bash', 'os=linux'], top: 4 });
-    const alts = c.top.map((t) => t.intent).filter((i) => i !== r.intent).slice(0, 2);
-    const opts = [r.intent, ...alts].sort(() => rng() - 0.5);
-    const criteria = Object.fromEntries(opts.map((i) => [i, BY_ID[i].description]));
-    criteria.none = 'none of these';
-    const { spans } = silverSpans(r.text, r.intent);
-    const questions = {
-      intent: { type: 'choice', instructions: 'Which action does the user request? (The request may be in Polish or English.)', criteria },
-      correct: { type: 'noul', instructions: 'The shell command does what the request asks for (values the request does not mention may use sensible defaults)' },
-      risk: { type: 'choice', instructions: 'How risky is running the shell command on a user machine', criteria: RISK_DESC },
+  const res = await pool(calls, +arg('concurrency', 16), (d, n) => console.log(`  ${label}: ${d}/${n} calls (${stats.calls} network, ${stats.cached} cached, ${stats.inTok} tok, ${Math.round((Date.now() - t0) / 1000)} s)`));
+  const out = [];
+  res.forEach((r, ci) => {
+    const n = Math.min(per, items.length - ci * per);
+    for (let j = 0; j < n; j++) out.push(r?.error ? null : r[j]);
+  });
+  return out;
+}
+
+/**
+ * The exclusion index of gen_data.js (scripts/lib/heldout.js exclusionIndex): held-out texts incl. near-duplicates
+ * and contrastive rewrites, and texts that mention an eval-only slot value. Nothing it excludes is sent to Jev.
+ */
+const heldOutSet = () => exclusionIndex(ROOT);
+
+/**
+ * Training rows filtered as gen_data.js filters them: held-out texts (and their near-duplicates) are never
+ * sent to the teacher, and rows dropped in data/teacher/decisions.jsonl are not mined from.
+ */
+function trainingRows(held = heldOutSet()) {
+  const dropped = new Set(readJsonl(join(TDIR, 'decisions.jsonl')).filter((d) => d.text && d.action === 'drop').map((d) => normalize(d.text)));
+  return [...readDir(join(ROOT, 'data', 'intents')).map((r) => ({ ...r, src: `intents/${r.file}` })),
+    ...readJsonl(join(ROOT, 'data', 'train.jsonl')).map((r) => ({ ...r, src: 'train.jsonl' })),
+    ...readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell/train.jsonl' }))]
+    .filter((r) => !held.has(r.text) && !dropped.has(normalize(r.text)));
+}
+
+// ---------------------------------------------------------------------------------------------
+// (a) verify every training row
+async function verify() {
+  const rng = mulberry32(+arg('seed', 5));
+  const rows = trainingRows().slice(0, +arg('limit', 1e9));
+  const items = rows.map((r) => {
+    const o = intentOptions(r.text, r.intent, r.shell, r.os, rng);
+    return { r, o, qs: { i: intentQ(r.text, r.shell, o.opts), k: riskQ(r.text) } };
+  });
+  console.log(`teacher verify: ${rows.length} training rows, ${+arg('per', 3)} per call`);
+  const ans = await askPacked(items, +arg('per', 3), 'verify');
+  mkdirSync(BDIR, { recursive: true });
+  const res = items.map((it, j) => {
+    const a = ans[j];
+    if (!a) return { text: it.r.text, intent: it.r.intent, src: it.r.src, failed: true };
+    return {
+      text: it.r.text, intent: it.r.intent, lang: it.r.lang, shell: it.r.shell || '', src: it.r.src, opts: it.o.opts, model: it.o.model,
+      t_intent: a.i?.choice, t_conf: a.i?.confidence, t_p: a.i?.probabilities?.[it.r.intent] ?? null,
+      t_risk: a.k?.choice, t_risk_conf: a.k?.confidence, risk: BY_ID[it.r.intent].risk,
     };
-    spans.slice(0, 3).forEach((s, i) => {
-      questions[`span_${i}`] = { type: 'noul', instructions: `In the request, "${r.text.slice(s.start, s.end)}" is ${TYPE_DESC[s.type]}` };
-    });
-    try {
-      const j = await ask({ request: r.text, shell: 'bash on Linux', command: b.command }, questions);
-      calls++;
-      inTok += j.usage?.input_tokens || 0;
-      const a = j.answers || {};
-      results.push({
-        text: r.text, intent: r.intent, lang: r.lang, command: b.command, risk: b.risk,
-        t_intent: a.intent?.choice, t_intent_conf: a.intent?.confidence, t_correct: a.correct?.noul,
-        t_risk: a.risk?.choice, t_risk_conf: a.risk?.confidence,
-        spans: spans.slice(0, 3).map((s, i) => ({ type: s.type, text: r.text.slice(s.start, s.end), p: a[`span_${i}`]?.noul })),
-      });
-    } catch (e) {
-      failed++;
-      if (failed <= 3) console.log(`teacher: call failed (${e.message})`);
-    }
   });
-  // small concurrency, well under the documented rate limits
-  for (let i = 0; i < work.length; i += 6) await Promise.all(work.slice(i, i + 6).map((f) => f()));
-  const meta = { calls, failed, inTok, seconds: Math.round((Date.now() - t0) / 1000), date: new Date().toISOString().slice(0, 10) };
-  mkdirSync(join(ROOT, 'build'), { recursive: true });
-  writeFileSync(join(ROOT, 'build', 'teacher_meta.json'), JSON.stringify(meta));
-  writeFileSync(join(ROOT, 'build', 'teacher_results.jsonl'), results.map((r) => JSON.stringify(r)).join('\n') + '\n');
-  summarize(results, meta);
+  writeJsonl(join(BDIR, 'verify.jsonl'), res);
+  summarizeVerify(res);
+  recordLedger('verify');
 }
 
-function summarize(results, { calls, failed, inTok, seconds }) {
-  const RANK = { safe: 0, medium: 1, high: 2 };
-  const review = [];
-  let intentAgree = 0; let correctOk = 0; let riskAgree = 0; let riskHigher = 0; let spanN = 0; let spanOk = 0;
-  for (const r of results) {
-    const reasons = [];
-    if (r.t_intent === r.intent) intentAgree++;
-    else if ((r.t_intent_conf ?? 0) >= 0.5) reasons.push(`teacher intent ${r.t_intent} (${r.t_intent_conf})`);
-    if ((r.t_correct ?? 0) >= 0.5) correctOk++; else if ((r.t_correct ?? 1) < 0.3) reasons.push(`command judged wrong (${r.t_correct})`);
-    if (r.t_risk === r.risk) riskAgree++;
-    if (RANK[r.t_risk] > RANK[r.risk] && (r.t_risk_conf ?? 0) >= 0.5) { riskHigher++; reasons.push(`teacher risk ${r.t_risk} > ours ${r.risk}`); }
-    for (const s of r.spans) { spanN++; if ((s.p ?? 0) >= 0.5) spanOk++; else if ((s.p ?? 1) < 0.3) reasons.push(`span ${s.type} "${s.text}" rejected (${s.p})`); }
-    if (reasons.length) review.push({ text: r.text, intent: r.intent, command: r.command, reasons });
+function summarizeVerify(res) {
+  const ok = res.filter((r) => !r.failed);
+  const agree = ok.filter((r) => r.t_intent === r.intent);
+  // flagged: the teacher prefers another option (or none) with confidence >= 0.6 and gives our label p < 0.3
+  const flagged = ok.filter((r) => r.t_intent !== r.intent && (r.t_conf ?? 0) >= 0.6 && (r.t_p ?? 0) < 0.3);
+  const perIntent = {};
+  for (const r of ok) {
+    const p = (perIntent[r.intent] ??= { n: 0, agree: 0, riskHigher: 0, riskLower: 0, risk: r.risk, teacherRisk: {} });
+    p.n++;
+    if (r.t_intent === r.intent) p.agree++;
+    p.teacherRisk[r.t_risk] = (p.teacherRisk[r.t_risk] || 0) + 1;
+    if ((r.t_risk_conf ?? 0) >= 0.6 && RANK[r.t_risk] > RANK[r.risk]) p.riskHigher++;
+    if ((r.t_risk_conf ?? 0) >= 0.6 && RANK[r.t_risk] < RANK[r.risk]) p.riskLower++;
   }
-  mkdirSync(join(ROOT, 'data', 'teacher'), { recursive: true });
-  writeFileSync(join(ROOT, 'data', 'teacher', 'review.jsonl'), review.map((r) => JSON.stringify(r)).join('\n') + '\n');
-  const spend = (inTok / 1e6) * PRICE_PER_MTOK;
-  const n = results.length;
-  const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
-  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl'));
-  const md = `## Teacher verification (TypeSafe Jev, build time only)
+  // risk: an intent is flagged when the teacher rates the majority of its rows differently with confidence
+  const riskFlags = Object.entries(perIntent).filter(([, p]) => p.riskHigher / p.n >= 0.5 || p.riskLower / p.n >= 0.5)
+    .map(([id, p]) => ({ intent: id, ours: p.risk, teacher: Object.entries(p.teacherRisk).sort((a, b) => b[1] - a[1])[0][0], share: +(Math.max(p.riskHigher, p.riskLower) / p.n).toFixed(2), n: p.n }));
+  const summary = {
+    rows: res.length, answered: ok.length, failed: res.length - ok.length, optionsModelSha256: optionsModelSha,
+    intentAgree: agree.length, flagged: flagged.length,
+    riskAgree: ok.filter((r) => r.t_risk === r.risk).length,
+    riskFlags,
+    worstIntents: Object.entries(perIntent).map(([k, p]) => [k, +(p.agree / p.n).toFixed(3), p.n]).sort((a, b) => a[1] - b[1]).slice(0, 10),
+  };
+  mkdirSync(TDIR, { recursive: true });
+  writeFileSync(join(TDIR, 'verify_summary.json'), JSON.stringify(summary, null, 1) + '\n');
+  writeJsonl(join(TDIR, 'review.jsonl'), flagged.map((r) => ({ text: r.text, intent: r.intent, src: r.src, teacher: r.t_intent, conf: r.t_conf, p_ours: r.t_p, opts: r.opts })));
+  console.log(`verify: ${ok.length}/${res.length} answered; intent agree ${agree.length} (${(100 * agree.length / ok.length).toFixed(1)}%); ` +
+    `${flagged.length} flagged -> data/teacher/review.jsonl; risk agree ${(100 * summary.riskAgree / ok.length).toFixed(1)}%; ${riskFlags.length} intents with a risk disagreement`);
+}
 
-Sampled **${n}** training rows (stratified over intents, EN+PL, incl. shell-phrased rows) and made **${calls} API calls**
-(${failed} failed) to \`jev-latest\`${seconds ? ` in ${seconds} s` : ''}: ${inTok} input tokens ≈ **$${spend.toFixed(4)}**
-(at $${PRICE_PER_MTOK}/Mtok input, output free). Each call asked: intent (choice among the gold label and our two closest
-alternatives), "the rendered command does what is asked" (noul), risk (choice) and up to 3 silver slot spans (noul).
+// ---------------------------------------------------------------------------------------------
+// (b) label / filter new paraphrase candidates (data/candidates/*.jsonl) -> data/intents/g06_teacher.jsonl
+async function label() {
+  const rng = mulberry32(+arg('seed', 7));
+  const held = heldOutSet();
+  const have = new Set(trainingRows().filter((r) => !/^g0[67]_/.test(r.file || '')).map((r) => normalize(r.text)));
+  const seen = new Set();
+  const cands = readDir(join(ROOT, 'data', 'candidates')).filter((r) => {
+    if (!r.intent) return false;
+    const n = normalize(r.text);
+    if (!BY_ID[r.intent] || held.has(r.text) || have.has(n) || seen.has(n)) return false;
+    seen.add(n);
+    return true;
+  });
+  const items = cands.map((r) => { const o = intentOptions(r.text, r.intent, r.shell, r.os, rng); return { r, o, qs: { i: intentQ(r.text, r.shell, o.opts) } }; });
+  console.log(`teacher label: ${cands.length} new candidates (after dedup against training and held-out sets)`);
+  const ans = await askPacked(items, +arg('per', 4), 'label');
+  const accepted = [];
+  const rejected = [];
+  let failed = 0;
+  items.forEach((it, j) => {
+    const a = ans[j]?.i;
+    if (!a) { failed++; return; } // a failed call is no answer, not a rejection
+    const p = a?.probabilities?.[it.r.intent] ?? 0;
+    const row = { text: it.r.text, intent: it.r.intent, lang: it.r.lang, ...(it.r.shell ? { shell: it.r.shell, os: it.r.os } : {}) };
+    // accept when the teacher picks the proposed intent with p >= 0.6
+    if (a && a.choice === it.r.intent && p >= 0.6) accepted.push({ ...row, src: 'teacher', hard: it.o.model !== it.r.intent });
+    else rejected.push({ ...row, teacher: a?.choice ?? null, conf: a?.confidence ?? null, p_ours: p, opts: it.o.opts, model: it.o.model });
+  });
+  writeJsonl(join(ROOT, 'data', 'intents', 'g06_teacher.jsonl'), accepted.map(({ hard, ...r }) => r));
+  writeJsonl(join(TDIR, 'label_rejected.jsonl'), rejected);
+  // out-of-domain candidates (data/candidates/ood_*.jsonl): keep only what the teacher agrees is not a shell request
+  const oodC = readDir(join(ROOT, 'data', 'candidates')).filter((r) => !r.intent && r.text && /^ood/.test(r.file));
+  const oodHave = new Set(readJsonl(join(ROOT, 'data', 'ood.jsonl')).map((r) => normalize(r.text)));
+  const oodItems = oodC.filter((r) => { const n = normalize(r.text); if (held.has(r.text) || oodHave.has(n) || seen.has(n)) return false; seen.add(n); return true; })
+    .map((r) => ({ r, qs: { o: { type: 'noul', instructions: { question: 'Is this a request to do something on the computer that a shell command (bash, PowerShell, ...) could carry out — find, list, show, change, delete, kill, install, check something?', request: r.text } } } }));
+  const oodAns = await askPacked(oodItems, +arg('per', 4), 'label-ood');
+  const oodAcc = [];
+  const oodRej = [];
+  oodItems.forEach((it, j) => { const p = oodAns[j]?.o?.noul; if (p == null) { failed++; return; } (p < 0.3 ? oodAcc : oodRej).push({ text: it.r.text, lang: it.r.lang, p }); });
+  writeJsonl(join(ROOT, 'data', 'ood_teacher.jsonl'), oodAcc.map(({ text, lang }) => ({ text, lang })));
+  writeJsonl(join(TDIR, 'ood_rejected.jsonl'), oodRej);
+  const hard = accepted.filter((r) => r.hard).length;
+  const s = { candidates: cands.length, accepted: accepted.length, rejected: rejected.length, failed, optionsModelSha256: optionsModelSha, modelDisagreedOnAccepted: hard,
+    ood: { candidates: oodItems.length, accepted: oodAcc.length, rejected: oodRej.length },
+    byLang: Object.fromEntries(['en', 'pl'].map((l) => [l, accepted.filter((r) => r.lang === l).length])),
+    byShell: accepted.reduce((m, r) => ((m[r.shell || 'bash'] = (m[r.shell || 'bash'] || 0) + 1), m), {}) };
+  writeFileSync(join(TDIR, 'label_summary.json'), JSON.stringify(s, null, 1) + '\n');
+  console.log(`label: accepted ${accepted.length}/${cands.length} (${hard} the current model got wrong), rejected ${rejected.length} -> data/teacher/label_rejected.jsonl`);
+  recordLedger('label');
+}
 
-| check | agreement |
-|---|---|
-| intent label = teacher choice | ${pct(intentAgree, n)} |
-| command judged correct (noul ≥ 0.5) | ${pct(correctOk, n)} |
-| risk level identical | ${pct(riskAgree, n)} (teacher rated higher with conf ≥ 0.5: ${riskHigher}) |
-| silver slot spans accepted (noul ≥ 0.5) | ${pct(spanOk, spanN)} of ${spanN} |
+// ---------------------------------------------------------------------------------------------
+// (c) hard negatives: contrastive rewrites of training rows across confusable intents
+async function mine() {
+  const rng = mulberry32(+arg('seed', 11));
+  const held = heldOutSet();
+  const rows = trainingRows().filter((r) => !/^g07_/.test(r.file || ''));
+  const have = new Set(rows.map((r) => normalize(r.text)));
+  const cands = [];
+  const seen = new Set();
+  for (const rule of CONTRAST_RULES) {
+    const src = rows.filter((r) => r.intent === rule.from && (!rule.lang || r.lang === rule.lang));
+    let made = 0;
+    for (const r of src.sort(() => rng() - 0.5)) {
+      if (made >= (rule.max || 40)) break;
+      if (!rule.re.test(r.text)) continue;
+      const text = r.text.replace(rule.re, rule.to);
+      const n = normalize(text);
+      if (text === r.text || rule.bad?.test(text) || held.has(text) || have.has(n) || seen.has(n)) continue;
+      seen.add(n);
+      cands.push({ text, intent: rule.target, lang: r.lang, shell: r.shell, os: r.os, from: r.intent, orig: r.text });
+      made++;
+    }
+  }
+  // plus: training rows of confusable intents the current model gets wrong or nearly wrong (margin < 0.2)
+  const hardRows = [];
+  for (const r of rows) {
+    if (!CONFUSABLE[r.intent]) continue;
+    const c = cascade(r.text, { model: getOptionsModel(), extras: envFeatures({ shell: r.shell || 'bash', os: r.os || 'linux' }), top: 2 });
+    const margin = c.top[0]?.intent === r.intent ? (c.top[0].p - (c.top[1]?.p ?? 0)) : -1;
+    if (margin < 0.2) hardRows.push({ ...r, margin });
+  }
+  const items = cands.map((r) => { const o = intentOptions(r.text, r.intent, r.shell, r.os, rng); if (!o.opts.includes(r.from)) o.opts.push(r.from); return { r, o, qs: { i: intentQ(r.text, r.shell, o.opts) } }; });
+  console.log(`teacher mine: ${cands.length} contrastive rewrites from ${CONTRAST_RULES.length} rules; ${hardRows.length} low-margin training rows`);
+  const ans = await askPacked(items, +arg('per', 4), 'mine');
+  const accepted = [];
+  const rejected = [];
+  let failed = 0;
+  items.forEach((it, j) => {
+    const a = ans[j]?.i;
+    if (!a) { failed++; return; } // a failed call is no answer, not a rejection
+    const p = a?.probabilities?.[it.r.intent] ?? 0;
+    const row = { text: it.r.text, intent: it.r.intent, lang: it.r.lang, ...(it.r.shell ? { shell: it.r.shell, os: it.r.os } : {}) };
+    if (a && a.choice === it.r.intent && p >= 0.6) accepted.push({ ...row, src: 'hardneg' });
+    else rejected.push({ ...row, from: it.r.from, orig: it.r.orig, teacher: a?.choice ?? null, conf: a?.confidence ?? null });
+  });
+  // low-margin rows are re-weighted (duplicated once) in training if the teacher already confirmed them in verify
+  const verified = new Map(readJsonl(join(BDIR, 'verify.jsonl')).map((r) => [normalize(r.text) + '|' + r.intent, r]));
+  const boost = hardRows.filter((r) => verified.get(normalize(r.text) + '|' + r.intent)?.t_intent === r.intent)
+    .map((r) => ({ text: r.text, intent: r.intent, lang: r.lang, ...(r.shell ? { shell: r.shell, os: r.os } : {}), src: 'hardneg-boost' }));
+  writeJsonl(join(ROOT, 'data', 'intents', 'g07_hardneg.jsonl'), accepted);
+  writeJsonl(join(TDIR, 'hardneg_rejected.jsonl'), rejected);
+  writeJsonl(join(TDIR, 'hardneg_boost.jsonl'), boost);
+  const s = { rewrites: cands.length, accepted: accepted.length, rejected: rejected.length, failed, optionsModelSha256: optionsModelSha, lowMarginRows: hardRows.length, boosted: boost.length,
+    byPair: accepted.reduce((m, r) => ((m[r.intent] = (m[r.intent] || 0) + 1), m), {}) };
+  writeFileSync(join(TDIR, 'hardneg_summary.json'), JSON.stringify(s, null, 1) + '\n');
+  console.log(`mine: accepted ${accepted.length}/${cands.length} rewrites; ${boost.length} teacher-confirmed low-margin rows boosted`);
+  recordLedger('mine');
+}
 
-${review.length} rows flagged → \`data/teacher/review.jsonl\`. After manual inspection (\`data/teacher/decisions.jsonl\`):
-* intent labels: no disagreement, **0 training rows dropped or relabelled**;
-* risk: **${decisions.filter((d) => d.action === 'relabel' && d.field === 'risk').length} intents relabelled safe → medium** (${decisions.filter((d) => d.action === 'relabel' && d.field === 'risk').map((d) => d.intent).join(', ')}) — they overwrite files or change the git working tree;
-  ${decisions.filter((d) => d.action === 'keep' && d.field === 'risk').length} kept safe where the teacher was stricter than our definition (${decisions.filter((d) => d.action === 'keep' && d.field === 'risk').map((d) => d.intent).join(', ')});
-* "command wrong" flags were slot-extraction bugs, not label errors (Windows \`C:\\\` paths, \`plik X.b64\` for base64, Polish inflection
-  \`javy\` → \`java\`, filler words taken as values); fixed in \`src/slots.js\` / \`src/tagger.js\` (${decisions.filter((d) => d.action === 'keep' && d.field === 'label').length} rows kept).`;
-  updateSection('teacher', md);
-  console.log(`teacher: ${calls} calls, ${inTok} input tokens ≈ $${spend.toFixed(4)}; intent agree ${pct(intentAgree, n)}, correct ${pct(correctOk, n)}, risk agree ${pct(riskAgree, n)}, spans ${pct(spanOk, spanN)}; ${review.length} flagged`);
+// ---------------------------------------------------------------------------------------------
+function report() {
+  const L = existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, 'utf8')) : null;
+  if (!L) { updateSection('teacher', '## Teacher (TypeSafe Jev)\n\nNot run: no `data/teacher/ledger.json`.'); return; }
+  const J = (f) => (existsSync(join(TDIR, f)) ? JSON.parse(readFileSync(join(TDIR, f), 'utf8')) : null);
+  const V = J('verify_summary.json');
+  const LB = J('label_summary.json');
+  const HN = J('hardneg_summary.json');
+  const decisions = readJsonl(join(TDIR, 'decisions.jsonl'));
+  const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
+  const usd = (t) => `$${((t / 1e6) * PRICE_PER_MTOK).toFixed(4)}`;
+  const count = (pred) => decisions.filter(pred).length;
+  const lines = [];
+  lines.push('## Teacher (TypeSafe Jev, build time only)');
+  lines.push('');
+  lines.push(`All calls to \`${MODEL}\` ($${L.pricePerMtok}/Mtok input, output free), counted by \`scripts/lib/jev.js\` in \`data/teacher/ledger.json\` ` +
+    '(every request sent, including failed and retried ones; cache hits are free and not counted). Several rows are packed per call; every row gets its own question(s), and the intent ' +
+    'question shows only the request and shell — never our label or a command rendered from it.');
+  lines.push('');
+  lines.push('| task | calls | failed | input tokens | spend |');
+  lines.push('|---|---|---|---|---|');
+  for (const [k, t] of Object.entries(L.tasks)) lines.push(`| ${k} | ${t.calls} | ${t.failed} | ${t.inTok} | ${usd(t.inTok)} |`);
+  lines.push(`| **total** | **${L.total.calls}** | ${L.total.failed} | ${L.total.inTok} | **$${L.total.usd.toFixed(4)}** |`);
+  lines.push('');
+  if (V) {
+    lines.push(`**(a) Verification of every training row** (${V.rows} rows; ${V.answered} answered): teacher intent = our label for **${pct(V.intentAgree, V.answered)}** ` +
+      '(not an independent accuracy: the options always contain our label plus the cascade\'s own top guesses, so this is agreement among 4-6 plausible choices); ' +
+      `${V.flagged} rows flagged (teacher prefers another option with confidence ≥ 0.6 and gives our label p < 0.3) → \`data/teacher/review.jsonl\`. ` +
+      (V.heldOutSent ? `This run predates the held-out filter: ${V.heldOutSent} of the rows sent were held-out texts or near-duplicates of one (none of them is in the training data of the shipped model; \`teacher.js\` no longer sends them). ` : '') +
+      `Risk (asked about the request alone): identical to the catalog risk for ${pct(V.riskAgree, V.answered)} of rows; ${V.riskFlags.length} intents where the teacher rates most rows differently ` +
+      `(${V.riskFlags.map((f) => `${f.intent} ${f.ours}→${f.teacher}`).join(', ') || 'none'}).`);
+    lines.push('');
+    lines.push(`After manual inspection (\`data/teacher/decisions.jsonl\`, ${decisions.length} decisions): ` +
+      `**${count((d) => d.text && d.action === 'drop')} rows dropped**, **${count((d) => d.text && d.action === 'relabel')} rows relabelled**, ` +
+      `${count((d) => d.text && d.action === 'keep')} flagged rows kept (teacher wrong or request genuinely ambiguous); risk: ` +
+      `${count((d) => d.field === 'risk' && d.action === 'relabel')} intents relabelled (${decisions.filter((d) => d.field === 'risk' && d.action === 'relabel').map((d) => `${d.intent} ${d.from}→${d.to}`).join(', ') || 'none'}), ` +
+      `${count((d) => d.field === 'risk' && d.action === 'keep')} kept.`);
+    lines.push('');
+  }
+  if (LB) {
+    lines.push(`**(b) New paraphrases**: ${LB.candidates} candidates (PL+EN, bash/zsh/sh/PowerShell/fish/cmd, written for v0.3; deduplicated against training and every held-out set) ` +
+      `labelled by the teacher; **${LB.accepted} accepted** (teacher picks the proposed intent with p ≥ 0.6; EN ${LB.byLang.en}, PL ${LB.byLang.pl}; ` +
+      `shells ${Object.entries(LB.byShell).map(([k, v]) => `${k} ${v}`).join(', ')}), ${LB.rejected} rejected → \`data/teacher/label_rejected.jsonl\`. ` +
+      `${LB.modelDisagreedOnAccepted} of the accepted rows were misclassified by the v0.2 model. ` +
+      (LB.ood ? `Out-of-domain candidates: ${LB.ood.candidates}, **${LB.ood.accepted} kept** (teacher p(shell request) < 0.3) → \`data/ood_teacher.jsonl\`.` : '') +
+      (LB.heldOutLeaksRemoved ? ` ${LB.heldOutLeaksRemoved.accepted} accepted paraphrases and ${LB.heldOutLeaksRemoved.ood} out-of-domain rows were later removed as near-duplicates of held-out texts.` : ''));
+    lines.push('');
+  }
+  if (HN) {
+    lines.push(`**(c) Hard negatives**: ${HN.rewrites} contrastive rewrites of training rows across confusable intents (e.g. "symlinks" → "broken symlinks", "push" → "pull", ` +
+      `"process" → "service"); **${HN.accepted} confirmed** by the teacher and added (${Object.entries(HN.byPair).map(([k, v]) => `${k} ${v}`).join(', ')}); ` +
+      `${HN.boosted} low-margin training rows of confusable intents (confirmed in (a)) are given double weight.` +
+      (HN.heldOutLeaksRemoved ? ` ${HN.heldOutLeaksRemoved.rewrites} confirmed rewrites and ${HN.heldOutLeaksRemoved.boosted} boosted rows were later removed because they were ` +
+        'held-out texts, near-duplicates of one, or one-word rewrites of one (`scripts/lib/heldout.js`).' : ''));
+  }
+  updateSection('teacher', lines.join('\n'));
+  console.log(`teacher report: ${L.total.calls} calls, ${L.total.inTok} input tokens, $${L.total.usd}`);
 }
 
-main().catch((e) => { console.log(`teacher: failed (${e.message}) — skipped`); process.exitCode = 0; });
+const cmd = process.argv[2];
+const run = { verify, label, mine, report }[cmd];
+if (!run) { console.log('usage: node scripts/teacher.js verify|label|mine|report'); process.exit(2); }
+if (cmd !== 'report' && !process.env.TYPESAFE_API_KEY) { console.log('teacher: TYPESAFE_API_KEY not set — skipped'); process.exit(0); }
+await run();
+if (cmd !== 'report') console.log(`teacher ${cmd}: ${stats.calls} network calls (${stats.failed} failed, ${stats.retries} retries), ${stats.cached} cache hits, ${stats.inTok} input tokens ≈ $${((stats.inTok / 1e6) * PRICE_PER_MTOK).toFixed(4)}`);

exec
/bin/bash -lc "sed -n '379,595p' src/history.js" in /workspace/tellsh
 succeeded in 0ms:
export function tellshQuery(line, kind = 'posix') {
  const a = tellshArgs(line, kind);
  return a == null || a === false ? a : a.text;
}

/** tellshQuery with the quoted arguments joinArgs could not classify: -> { text, unclear } | null | false */
export function tellshArgs(line, kind = 'posix') {
  const t = String(line).trim();
  const tm = t.match(TELLSH_LINE);
  if (!tm) return null;
  const w = wordsOf(tm[1] || '', lineKind(t, kind), { literalTilde: false });
  if (!w) return tm[1] ? false : { text: '', unclear: [] };
  const words = [];
  for (let i = 0; i < w.length; i++) {
    if (TELLSH_VALUE_OPTS.has(w[i])) { i++; continue; }
    if (!/^-/.test(w[i])) words.push(rawOf(w[i]));
  }
  if (!words.length) return { text: '', unclear: [] };
  return joinArgs(words) ?? false;
}

/**
 * Analyse one history line. `classify(query)` handles previous `tellsh <query>` lines.
 * kind: 'posix' | 'pwsh' (PowerShell history; Verb-Noun lines are always read as PowerShell).
 * Segments of a compound line (`a; b`, `a && b`, `a | b`) are read in order and later ones win: the
 * entities of `cat old.txt; cat new.txt` are those of `cat new.txt`. Redirection targets (`> out.txt`)
 * are files the line wrote. A `cd` makes every earlier working-directory-relative path ambiguous.
 * `at` gives each entity type the index of the segment it came from (later segment = newer), and
 * `searchDir` marks a `dir` entity that is only the root of a search (`find /var/log -name '*.gz'`,
 * `grep -rl TODO src`): the results live inside it, so it must never be a destructive target.
 * -> { line, intent, slots, ents, at, searchDir?, ambiguous, cd?, scoped?, fromTellsh?, opaque? }  (scoped: see scopedElsewhere)
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
  const exportedScope = new Set(); // tools (git, docker, podman, gh) an `export VAR=…` earlier in the line pointed elsewhere
  const exportAt = {}; // tool -> index of the segment that exported (or removed) its scope variable
  let setEnvCall = false;
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
    // (`$env:GH_REPO="a/b"` is one word); the values earlier segments named for that tool name things of the old scope
    const rw = raw.map((x) => String(rawOf(x)));
    const exported = /^(?:export|declare|typeset|set)$/.test(rw[0]) ? rw.slice(1).filter((x) => SCOPE_ENV.test(x))
      : /^\$env:\w+(?:=.*)?$/i.test(rw[0]) && SCOPE_ENV.test(rw[0].slice(5).replace(/=.*$/, '') + '=') ? [rw[0].slice(5)] : [];
    // `unset GH_REPO`, `export -n GH_REPO`, `Remove-Item Env:GH_REPO`, `[Environment]::SetEnvironmentVariable('GH_REPO', $null)`:
    // a scope inherited from outside the line is dropped, so the values earlier segments named are of that other scope too
    // (later segments run in the scope tellsh runs in, so they are not marked)
    const removed = unsetScopeVars(rw, setEnvCall);
    setEnvCall = /SetEnvironmentVariable$/i.test(rw[rw.length - 1] ?? ''); // the call's arguments are the next segment
    for (const x of [...exported, ...removed]) {
      const tool = scopeTool(x);
      if (exported.includes(x)) exportedScope.add(tool);
      for (const t of SCOPE_ENTS[tool]) if (ents[t] != null && !isAmbiguous(ents[t])) ents[t] = AMB + rawOf(ents[t]);
      exportAt[tool] = segIdx;
    }
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
    if (scoped || Object.keys(exportAt).length) { slots = { ...slots }; markScoped(slots); }
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
    // `gh pr view 45; export GH_REPO=other/repo`: the pull request is one of the old repository
    for (const [tool, i] of Object.entries(exportAt)) if (segIntentAt < i) for (const t of SCOPE_ENTS[tool]) if (slots[t] != null && !isAmbiguous(slots[t])) slots[t] = AMB + rawOf(slots[t]);
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

exec
/bin/bash -lc 'node test/pipeline.test.js' in /workspace/tellsh
 exited 1 in 171ms:
TAP version 13
# Subtest: stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
ok 1 - stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
  ---
  duration_ms: 7.625807
  ...
# Subtest: PowerShell vocabulary maps to the same tool family
ok 2 - PowerShell vocabulary maps to the same tool family
  ---
  duration_ms: 2.322815
  ...
# Subtest: tagger: tool-conditioned BIO spans, only tags valid for the tool
ok 3 - tagger: tool-conditioned BIO spans, only tags valid for the tool
  ---
  duration_ms: 15.668438
  ...
# Subtest: slot merge: tagger primary, regex fills misses and replaces invalid values
ok 4 - slot merge: tagger primary, regex fills misses and replaces invalid values
  ---
  duration_ms: 6.869404
  ...
# Subtest: end-to-end bash + PowerShell + BSD
ok 5 - end-to-end bash + PowerShell + BSD
  ---
  duration_ms: 36.955513
  ...
# Subtest: history: pronouns, "same for", container/service/pid references (EN + PL)
ok 6 - history: pronouns, "same for", container/service/pid references (EN + PL)
  ---
  duration_ms: 51.176403
  ...
# Subtest: history is optional: without it a pronoun request gets a hint, never a guessed value
ok 7 - history is optional: without it a pronoun request gets a hint, never a guessed value
  ---
  duration_ms: 1.167863
  ...
# Subtest: history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
ok 8 - history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
  ---
  duration_ms: 0.596683
  ...
# Subtest: loadHistory reads only the tail of HISTFILE and returns the last n commands
not ok 9 - loadHistory reads only the tail of HISTFILE and returns the last n commands
  ---
  duration_ms: 0.870433
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
  duration_ms: 0.78499
  ...
# Subtest: second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
ok 11 - second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
  ---
  duration_ms: 9.107517
  ...
# Subtest: out-of-domain requests are rejected (also by the composer)
ok 12 - out-of-domain requests are rejected (also by the composer)
  ---
  duration_ms: 1.014518
  ...
# Subtest: env detection and overrides
ok 13 - env detection and overrides
  ---
  duration_ms: 0.563593
  ...
1..13
# tests 13
# suites 0
# pass 12
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 147.764075

exec
/bin/bash -lc 'cat scripts/hybrid/train_a_dev.sh; cat scripts/hybrid/train_lm_gpu.py; cat scripts/hybrid/prune_vocab.py' in /workspace/tellsh
 succeeded in 0ms:
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

codex
The test suite completed, but several files failed because their fixtures require writes to `/tmp`, which is read-only here. I’m separating those environmental failures from code defects and continuing with in-memory probes and source review.
exec
/bin/bash -lc "sed -n '765,978p' src/history.js; sed -n '1133,1273p' src/history.js" in /workspace/tellsh
 succeeded in 0ms:
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
    // the current branch's, another repository's (-R / --repo) or several operands: none can be read (an older
    // selector of the line is replaced: `gh pr view 45; gh pr view` is about the current branch's pull request)
    const { pos, opts } = parseArgs(args.slice(args.indexOf(nonFlags[1]) + 1), GH_PR_VALUE_OPTS);
    const repo = opts['-R'] ?? opts['--repo'];
    if (pos.length === 1 && repo == null && !isAmbiguous(pos[0])) e.pr = rawOf(pos[0]);
    else e.pr = AMB + (pos.length ? pos.map(rawOf).join(' ') : 'the current branch');
  } else if (head === 'gh' && nonFlags[0] === 'pr') {
    // `gh pr list`, `gh pr status`, `gh pr create`: several pull requests, or one with no number yet
    e.pr = AMB + w.map(rawOf).join(' ');
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
    // operands: not a chmod mode, a chown owner, or a count (`head -n 5 a.txt`); a script and its arguments
    // (`python3 script.py data.csv`) are several operands: "delete it" may mean either
    let ops = nonFlags.filter((a) => !/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$|^\d+$/.test(a));
    if (['chown'].includes(head)) ops = ops.slice(1);
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

const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url', 'pr'];
// gh pr subcommands whose operand selects one pull request, and the options of those that take a value
const GH_PR_SELECTS = new Set(['view', 'checkout', 'co', 'merge', 'close', 'reopen', 'diff', 'checks', 'review', 'ready', 'edit', 'comment']);
const GH_PR_VALUE_OPTS = new Set(['-R', '--repo', '--json', '-q', '--jq', '-t', '--template', '--title', '-b', '--body', '-F',
  '--body-file', '--subject', '-A', '--author-email', '--match-head-commit', '-B', '--base', '--branch', '--add-assignee',
  '--remove-assignee', '-l', '--add-label', '--remove-label', '-m', '--milestone', '-p', '--add-project', '--remove-project',
  '--add-reviewer', '--remove-reviewer', '--color']);
// (`view -c` is --comments, `review -c` / `-a` are --comment / --approve, `comment -e` is --editor: switches, no value)

/**
 * Build the context object from history commands (oldest first). Only the single most recent command is a
 * reference target ("delete it", "same for /var", "there" always mean the previous command, never an older one);
 * the running `tellsh <query>` line itself, which some shells write before it runs, is dropped first.
 * kind: 'posix' | 'pwsh' (default: `cmds.kind` as set by loadHistory, else posix)
 * -> { n, line, ents: {type: value}, entOrder, refOrder, searchRoots, listedDirs, last: {intent, slots, ambiguous, skipped, scoped},
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
  // history file before it executes: the current `tellsh <query>` call is not the previous command. bash writes it
  // only afterwards, so there an identical last line is an earlier call (`cmds.shell` as set by loadHistory)
  if (query != null && list.length && cmds.shell !== 'bash') {
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
  const last = a.intent ? { intent: a.intent, slots: a.slots, ambiguous: !!a.ambiguous, skipped: !!a.intentStale, scoped: !!a.scoped } : null;
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

exec
/bin/bash -lc "git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/history.js | sed -n '1,160p'; cat src/compose.js" in /workspace/tellsh
 succeeded in 0ms:
diff --git a/src/history.js b/src/history.js
index 1beb1e0..fd6a446 100644
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
@@ -93,7 +94,7 @@ export function loadHistory({ shell = 'bash', file, n = 10, env = process.env, o
       const { buf, partial } = readTail(path);
       const text = (kind === 'zsh' ? unmetafy(buf) : buf).toString('utf8');
       const cmds = parseHistory(text, kind, { partial });
-      if (cmds.length) return Object.assign(cmds.slice(-n), { kind: kind === 'pwsh' ? 'pwsh' : 'posix' });
+      if (cmds.length) return Object.assign(cmds.slice(-n), { kind: kind === 'pwsh' ? 'pwsh' : 'posix', shell: kind });
     } catch { /* unreadable: no context */ }
   }
   return [];
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
@@ -220,6 +224,88 @@ function psArgs(args) {
 
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
+/** Mark a pull request / branch as ambiguous (after a cd): it names one only in the repository of the working directory. */
+function staleRepo(ents, slots) {
+  for (const o of [ents, slots || {}]) for (const t of ['pr', 'branch']) if (o[t] != null && !isAmbiguous(o[t])) o[t] = AMB + rawOf(o[t]);
+}
+
+// output/input redirection operator words (splitCommand keepRedirects): `>`, `2>>`, `&>`, `>|`, `<`, `>&`
+const REDIR_TARGET_OP = /^\d*(?:[<>]{1,2}[&|]?|&>>?)$/;
+const REDIR_DUP_OP = /^\d*[<>]+&[\d-]+$/;
+
 /** PowerShell native commands. Returns true when the head was recognised. */
 function psNative(head, args, ents, setIntent) {
   const kind = PS_NATIVE[head];
@@ -228,9 +314,21 @@ function psNative(head, args, ents, setIntent) {
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
import { splitCommand, rawOf } from './shellwords.js';

const fold = (s) => ' ' + foldKeepLength(String(s)).toLowerCase().replace(/[^a-z0-9.*/~+-]+/g, ' ') + ' ';
// trigger matching ignores file names and paths ("words.txt" must not trigger wc -w, "tree.md" not --forest)
const PATHISH = /(?:^|\s)(?:[~.]?\/\S*|\S+\/\S*|[\w-]+\.[A-Za-z0-9]{1,6}|\*\.\w+)(?=\s|$|[,;!?])/g;
const foldReq = (s) => fold(String(s).replace(PATHISH, ' '));

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
      F('-newer', ['newer than', 'nowsze niz', 'nowszych niz', 'nowszy niz'], { value: 'newer' }),
      F('-print0', ['null separated', 'print0']),
      F('-executable', ['executable', 'wykonywaln']),
      F('-user', ['owned by', 'belonging to', 'of user', 'nalezace do', 'uzytkownika', 'wlasciciel'], { value: 'user' }),
      F('-name', ['named', 'called', 'nazwan', 'o nazwie', 'nazywaj'], { value: 'fname' }),
    ],
  },
  grep: {
    head: 'grep', args: ['pattern', 'path'],
    flags: [
      F('-i', ['case insensitive', 'case-insensitive', 'ignore case', 'ignoring case', 'any case', 'regardless of case', 'bez wzgledu na wielkosc', 'wielkosc liter', 'wielkosci liter', 'bez rozrozniania', 'ignoruj wielkosc', 'niezaleznie od wielkosci']),
      F('-n', ['line number', 'numbers of lines', 'with numbers', 'numerami linii', 'numer linii', 'numery linii', 'numerem linii', 'z numerami']),
      F('-r', ['recursive', 'subdirector', 'all files in', 'rekurenc', 'podkatalog', 'w calym katalogu', 'w katalogu$']),
      F('-l', ['only file names', 'only filenames', 'file names only', 'which files', 'list files', 'names of files', 'tylko nazwy plikow', 'nazwy plikow', 'ktore pliki'], { group: 'out' }),
      F('-c', ['count', 'how many lines', 'number of matching', 'ile linii', 'policz', 'zlicz', 'liczba', 'ile razy', 'trafien'], { group: 'out' }),
      F('-v', ['invert', 'not containing', "don't contain", 'do not contain', 'not matching', 'excluding', 'which are not', 'that are not', 'nie zawieraj', 'bez slowa', 'ktore nie', 'odwroc dopasowan']),
      F('-w', ['whole word', 'exact word', 'full word', 'cale slowo', 'calych slow', 'jako slowo']),
      F('-o', ['only the match', 'only matching', 'just the match', 'tylko dopasowan', 'samo dopasowan']),
      F('-E', ['regex', 'extended', 'regular expression', 'wyrazenie regularn']),
      F('-A', ['lines after', 'after each match', 'after every match', 'linii po', 'linie po', 'po kazdym'], { value: 'ctx' }),
      F('-B', ['lines before', 'before each match', 'before every match', 'linii przed', 'linie przed', 'przed kazdym'], { value: 'ctx' }),
      F('-C', ['context', 'around each match', 'around every match', 'kontekst', 'wokol'], { value: 'ctx' }),
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
      F('-t', [], { value: 'fstype', detect: /\s(ext[234]|xfs|btrfs|tmpfs|nfs4?|vfat|ntfs|zfs|apfs|overlay|squashfs)\s/ }),
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
      F('<', ['without filename', 'without the filename', 'without file name', 'no filename', 'just the number', 'only the number', 'bez nazwy pliku', 'sama liczba', 'tylko liczb']),
    ],
  },
  git: {
    head: 'git', sub: {
      log: { triggers: ['log', 'history', 'commits', 'historia', 'historie', 'commity', 'commitow'], args: [],
        flags: [
          F('--oneline', ['one line', 'oneline', 'compact', 'short', 'jednej linii', 'jedna linia', 'w skrocie', 'zwiezl']),
          F('--graph', ['graph', 'tree', 'graf', 'drzew']),
          F('-n', ['last', 'latest', 'recent', 'ostatni'], { value: 'count' }),
          F('--author', ['by author', 'author', 'autor', 'from user', 'commits by', 'commity od', 'commity uzytkownika'], { value: 'author' }),
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
          F('-q', ['only ids', 'ids only', 'just ids', 'only the ids', 'only their ids', 'quiet', 'tylko id', 'tylko ich id', 'same id', 'identyfikator']),
          F('-s', ['size', 'sizes', 'rozmiar']),
          F("--format '{{.Names}}'", ['only names', 'only their names', 'names only', 'just the names', 'tylko nazwy', 'tylko ich nazwy', 'same nazwy']),
          F('--no-trunc', ['full', 'not truncated', 'no trunc', 'untruncated', 'pelne', 'nieobciet', 'bez obcinania']),
          F('-l', ['latest', 'last created', 'most recent', 'ostatnio utworzony', 'najnowszy']),
          F('-n', ['last', 'ostatnie'], { value: 'count' }),
        ] },
      images: { triggers: ['image', 'obraz'], args: [],
        flags: [
          F('-a', ['all', 'intermediate', 'wszystkie', 'posrednie']),
          F('-q', ['only ids', 'ids only', 'just ids', 'only their ids', 'quiet', 'tylko id', 'tylko ich id', 'same id', 'identyfikator']),
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
  const scored = spec.flags.map((f) => ({ ...f, score: f.always || f.implied || f.compress ? 1 : f.detect?.test(fq) ? 1.2 : triggerScore(fq, f.triggers) + tldrScore(fq, tl[f.flag]) }))
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
  const fq = foldReq(query);
  const spec = TOOLS[tn];
  const subs = spec.sub ? Object.entries(spec.sub) : [[null, spec]];
  const out = [];
  for (const [sub, fspec] of subs) {
    for (const f of selectFlags(fq, fspec, spec.head, sub)) if (!f.always && !f.implied && !f.compress) out.push((sub ? sub + ' ' : '') + f.flag);
  }
  return out;
}

/** First `$(`, `${`, `$((`, backtick, `<(` or `>(` that the shell would expand (i.e. not inside '…'), or null. */
function expansionOutsideSingleQuotes(cmd) {
  const s = String(cmd);
  let dq = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '\\') { i++; continue; }
    if (c === "'" && !dq) { const j = s.indexOf("'", i + 1); if (j < 0) return 'an unterminated quote'; i = j; continue; }
    if (c === '"') { dq = !dq; continue; }
    if (c === '`') return 'a backtick';
    if (c === '$' && /[({]/.test(s[i + 1] || '')) return s.slice(i, i + 2);
    if (!dq && (c === '<' || c === '>') && s[i + 1] === '(') return s.slice(i, i + 2);
  }
  return null;
}

/**
 * Validate a composed command: every option must come from the tool vocabulary, every operand that could be
 * read as an option is rejected (values are checked after shell unquoting, so a quoted '--use-compress-program=…'
 * is caught too; anything after `--` is an operand), value flags need an operand, and POSIX syntax via `bash -n`.
 */
export function validateComposed(cmd, toolName, sub) {
  const spec = TOOLS[toolName];
  const fl = sub ? spec.sub[sub].flags : spec.flags;
  const vocab = new Set(fl.flatMap((f) => f.flag.split(' ')[0]));
  if (spec.filters) for (const x of ['-name', '-iname', '-mtime', '-mmin', '-size', '-type', '-maxdepth', '-empty', '-newer', '-print0', '-user']) vocab.add(x);
  const needsArg = new Set(fl.filter((f) => f.value && !f.flag.startsWith('--')).map((f) => f.flag));
  if (spec.filters) for (const x of ['-name', '-iname', '-mtime', '-mmin', '-size', '-type', '-maxdepth', '-newer', '-user']) needsArg.add(x);
  const subst = expansionOutsideSingleQuotes(cmd);
  if (subst) return { ok: false, error: `contains ${subst} (command substitution / expansion is never composed)` };
  const r = splitCommand(cmd, 'posix', { keepRedirects: true });
  if (!r.ok || r.segments.length !== 1) return { ok: false, error: 'not a single simple command' };
  const words = r.segments[0].words.map(rawOf);
  let ddash = false;
  for (let i = sub ? 2 : 1; i < words.length; i++) {
    const w = words[i];
    if (ddash) continue;
    if (w === '--') { ddash = true; continue; }
    if (w === '<') { i++; continue; } // stdin redirect (wc < file)
    if (needsArg.has(w)) {
      const next = words[i + 1];
      if (next == null || (/^-/.test(next) && !/^[-+]\d/.test(next))) return { ok: false, error: `${w} needs an operand` };
      i++;
      continue;
    }
    if (!/^-/.test(w)) continue;
    const base = w.replace(/=.*$/, '');
    if (!vocab.has(w) && !vocab.has(base) && !/^-\d+$/.test(w)) return { ok: false, error: `${w} is not an option in the ${toolName} vocabulary` };
  }
  // a NUL byte cannot be passed to bash (spawnSync throws) and is never part of a command argument
  if (/\0/.test(cmd)) return { ok: false, error: 'contains a NUL byte' };
  const sx = spawnSync('bash', ['-n', '-c', cmd], { encoding: 'utf8', timeout: 2000 });
  if (sx.error) return { ok: true, syntax: 'skipped (bash not found)' };
  if (sx.status !== 0) return { ok: false, error: `bash -n: ${sx.stderr.trim()}` };
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
  const fq = foldReq(query);
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
  // non-path values (grep patterns, names, refs, separators, globs) are always quoted literally: a
  // leading ~ stays a literal `~` and never expands to the home directory
  const q = (v) => shQuote(v, { tilde: false });
  // operands: a path starting with - gets ./ (never an option); other values starting with - are refused
  const qp = (p) => shQuote(/^-/.test(String(p)) ? `./${p}` : p);
  const word = (v) => (v == null || /^-/.test(String(v)) ? null : v);
  // a number written right next to one of the flag's trigger words ("last 5", "ostatnie 10", "5 lines after")
  const numNear = (f) => {
    for (const t of f?.triggers || []) {
      const w = foldKeepLength(t.replace(/\$$/, '')).toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const m = fq.match(new RegExp(`\\s${w}\\w*\\s+(\\d{1,6})\\s`)) || fq.match(new RegExp(`\\s(\\d{1,6})\\s+${w}`));
      if (m) return m[1];
    }
    return null;
  };
  const valueOf = (kind, f) => {
    switch (kind) {
      case 'count': { const n = numNear(f); return n ?? (ex.count != null ? String(ex.count) : null); }
      case 'ctx': { const n = numNear(f) ?? fq.match(/\s(\d{1,3})\s+(?:lines?|linie|linii|wiersz\w*)\s/)?.[1]; return n ?? (ex.count != null ? String(ex.count) : null); }
      case 'depth': return ex.count != null && ex.count <= 20 ? String(ex.count) : '1';
      case 'name': return word(nameOf?.('NAME') || null);
      case 'since': return ex.duration?.since ? q(ex.duration.since) : null;
      case 'dest': return ex.paths[1] ? qp(ex.paths[1]) : null;
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
      case 'newer': return newerRef ? qp(newerRef) : null;
      case 'fstype': { const m = fq.match(/\b(ext[234]|xfs|btrfs|tmpfs|nfs4?|vfat|ntfs|zfs|apfs|overlay|squashfs)\b/); return m ? m[1] : null; }
      case 'fname': {
        const m = query.match(/(?:named|called|nazwan\w*|o nazwie|nazywaj\w* si[eę])\s+["']?([\w.*?-]+)/i);
        const v = word(m ? m[1] : nameOf?.('NAME'));
        return v ? q(v) : null;
      }
      case 'user': {
        // "owned by (user) bob", "of user postgres", "należące do użytkownika ola"; skip filler words
        const NOTUSER = /^(and|or|the|a|with|of|in|i|oraz|z|w|user|users|uzytkownik\w*|użytkownik\w*|command|commands|process\w*|proces\w*)$/i;
        for (const m of query.matchAll(/(?:user|owned by|belonging to|u[zż]ytkownik\w*|w[lł]a[sś]ciciel\w*|nale[zż][aą]ce do)\s+(?:(?:the\s+)?(?:user|u[zż]ytkownik\w*)\s+)?([a-z_][\w-]*)/gi)) {
          if (!NOTUSER.test(m[1])) return word(m[1]);
        }
        return word(nameOf?.('USER') || null);
      }
      case 'author': {
        // "commits by alice", "by author bob", "autor: jan", "commity od ola"
        const NOTAUTHOR = /^(and|or|the|a|an|me|author|autor\w*|user|uzytkownik\w*|użytkownik\w*|date|time|size|name|day|week|month|year|data|daty|dat[aey]|last|latest|ostatni\w*)$/i;
        for (const m of query.matchAll(/(?:\bauthor|\bautor\w*|\bcommits? by|\bby|\bfrom user|\bcommity od|\bod u[zż]ytkownika)\s*:?\s+(?:(?:the\s+)?(?:author|autor\w*|user|u[zż]ytkownik\w*)\s+)?["']?([A-Za-z_][\w.@+-]*)/gi)) {
          if (!NOTAUTHOR.test(m[1])) { const v = word(m[1]); if (v) return q(v); }
        }
        const n = word(nameOf?.('USER') || null);
        return n ? q(n) : null;
      }
      default: return null;
    }
  };
  // find -newer FILE: the reference file is the operand of -newer, never the search root
  const newerRef = tn === 'find' ? (() => {
    const m = query.match(/(?:newer than|nowsze? niż|nowsze? niz|nowszych niż|nowszych niz|nowszy niż|nowszy niz)\s+["'„]?([^\s"'”]+)/i);
    return m ? (ex.paths.find((p) => p === m[1] || m[1].startsWith(p)) || m[1]) : null;
  })() : null;
  // head/tail: bytes (-c) replace the implied line count
  if (flags.some((f) => f.flag === '-c' && !f.implied) && ['head', 'tail'].includes(tn)) flags.splice(0, flags.length, ...flags.filter((f) => !f.implied));
  const used = [];
  const archive = ex.paths.find((x) => /\.(tar(\.\w+)?|tgz|tbz2?|txz)$/.test(x));
  for (const f of flags) {
    if (f.compress) { if (archive && f.compress.test(archive)) { parts.push(f.flag); used.push(f.flag); } continue; }
    if (f.value) {
      const v = valueOf(f.value, f);
      if (v == null) continue;
      if (f.flag.startsWith('--')) parts.push(`${f.flag}=${v}`);
      else parts.push(f.flag, v);
    } else if ((f.flag === '-f' && tn === 'tar') || f.flag === '<') {
      if (f.flag === '<') used.push(f.flag);
      continue; // added with the archive / file below
    } else parts.push(f.flag);
    used.push(f.flag);
  }
  // tool-specific arguments
  const fnameV = flags.some((f) => f.value === 'fname') ? valueOf('fname')?.replace(/^'|'$/g, '') : null;
  const paths = ex.paths.filter((p) => p !== newerRef && p !== fnameV);
  if (tn === 'find') {
    parts.splice(1, 0, qp(paths[0] || '.'));
    if (ex.ext && !used.includes('-name')) parts.push(used.includes('-iname') ? '-iname' : '-name', q(`*.${ex.ext}`));
    if (ex.duration) parts.push(ex.duration.age.split(' ')[0], ex.duration.age.split(' ')[1]);
    if (ex.size) parts.push('-size', (/\b(smaller|less|under|below|mniejsz|ponizej)\b/.test(fq) ? '-' : '+') + ex.size);
    // move -maxdepth right after the path (find warns otherwise)
    const i = parts.indexOf('-maxdepth');
    if (i > 2) { const v = parts.splice(i, 2); parts.splice(2, 0, ...v); }
  } else if (tn === 'grep') {
    let pat = patternOf?.() ?? null;
    // "search for ~/foo in src": the word right after "search for" is the pattern even when it looks
    // like a path (it must not become a search path, and ~ must stay literal)
    const lead = query.match(/(?:search(?:ing)? for|look(?:ing)? for|grep(?: for)?|szukaj|wyszukaj)\s+(["'„]?)([^\s"'”]+)\1/i)?.[2];
    if (lead && paths.includes(lead)) pat = lead;
    if (!pat) return null;
    if (ex.ext && used.includes('-r')) parts.push(`--include=${q(`*.${ex.ext}`)}`);
    parts.push('--', q(pat));
    // the pattern is never also a search path (`search for ~/foo in src` -> grep -- '~/foo' src)
    const searchPaths = paths.filter((x) => x !== pat && x !== String(pat).trim());
    if (searchPaths.length) parts.push(...searchPaths.map(qp));
    else if (used.includes('-r')) parts.push('.');
  } else if (tn === 'tar') {
    const arch = paths.find((x) => /\.(tar(\.\w+)?|tgz|tbz2?|txz)$/.test(x));
    if (!arch) return null;
    parts.push('-f', qp(arch));
    const rest = paths.filter((x) => x !== arch && !(used.includes('-C') && x === paths[1]));
    if (used.includes('-c')) parts.push('--', ...(rest.length ? rest : ['.']).map(qp));
  } else if (tn === 'chmod') {
    if (!ex.mode || !paths.length) return null;
    parts.push(ex.mode, '--', ...paths.map(qp));
  } else if (tn === 'curl') {
    const url = ex.urls?.[0] || (ex.hosts?.[0] ? `https://${ex.hosts[0]}` : null);
    if (!url || /^-/.test(url)) return null;
    parts.push(q(url));
  } else if ((fspec.args || []).includes('ref')) {
    const ref = nameOf?.('BRANCH') || query.match(/(?:against|compared to|vs\.?|w stosunku do|wzgl[eę]dem|do)\s+([\w./-]+)\s*$/i)?.[1];
    if (word(ref)) parts.push(q(ref));
    else if (paths.length) parts.push('--', ...paths.map(qp));
  } else if ((fspec.args || []).includes('path') || (fspec.args || []).includes('file')) {
    if (used.includes('<')) {
      if (!paths.length) return null;
      parts.push('<', qp(paths[0]));
    } else if (paths.length) parts.push(...paths.slice(0, 2).map(qp));
    else if ((fspec.args || []).includes('file') && !['ls', 'du', 'df'].includes(tn)) return null;
  }
  const command = parts.join(' ');
  const validation = validateComposed(command, tn, sub);
  if (!validation.ok) return { command, tool: tn, sub, flags: used, invalid: validation.error, experimental: true };
  const d = checkDanger(command, 'medium');
  const triggered = flags.filter((f) => !f.always && !f.implied && !f.compress).map((f) => f.flag).filter((f) => used.includes(f));
  return { command, tool: tn, sub, flags: used, triggered, risk: maxRisk('medium', d.risk), warnings: d.warnings, critical: d.critical, validation, experimental: true };
}

exec
/bin/bash -lc "rg -n 'prun|blind|vocab' HYBRID.md | head -45; sed -n '1,170p' scripts/hybrid/train_encoder.py; cat src/rerank/tokenizer.js" in /workspace/tellsh
 succeeded in 0ms:
15:* **Real usage was the blind spot.** On held-out real requests (2957 EN/PL rows; command groups never seen in training),
26:  shell-phrased requests (96.4 → 95.2%), 0.5 pt on the hybrid blind set; A+B is unchanged or better everywhere
27:  (`data/eval` 96.7 → 96.7%, shell 98.8 → 98.2%, both blind sets 99.2 / 99.3%). End-to-end exact command on relexicalised
29:* **Out-of-domain**: chit-chat rejection is ~unchanged (A 94.6 → 92.4% on `data/ood_eval`, blind OOD 100%/98.4%).
49:  ~1 pt (real usage A+B 88.8 → 88.3%, blind OOD rejection 98.4 → 96.9%, relex e2e 86.8 → 85.4%). **C-ft was trained on
62:  98.5 → 98.2%, hybrid blind 99.4 → 99.2%, v0.4 devtools 97.9 → 97.6%; OOD rejection unchanged. A+B defers more often
109:  pools). C rows without an LM score are skipped (blind e2e n=193/194). Latency was measured on a shared, loaded box.
136:| hybrid blind | A v0.3 | 641 | 99.2% | **98.9%** | 98.2% | 99.7% | 100.0% | 98.9% | – |
137:| hybrid blind | A v0.4 | 641 | 98.8% | **98.4%** | 97.9% | 99.0% | 99.8% | 98.6% | – |
138:| hybrid blind | A+B v0.3 | 641 | 99.4% | **98.8%** | 98.5% | 99.0% | 100.0% | 98.8% | 10.8% |
139:| hybrid blind | A+B v0.4 | 641 | 99.4% | **99.2%** | 98.5% | 100.0% | 100.0% | 99.2% | 12.0% |
140:| hybrid blind | A+B-safe v0.3 | 641 | 99.4% | **98.8%** | 98.5% | 99.0% | 100.0% | 98.8% | 10.8% |
141:| hybrid blind | A+B-safe v0.4 | 641 | 99.2% | **99.1%** | 98.2% | 100.0% | 99.8% | 99.2% | 12.0% |
142:| hybrid blind | B alone v0.3 | 641 | 95.8% | **89.4%** | 89.7% | 89.0% | 100.0% | 89.4% | 100.0% |
143:| hybrid blind | B alone v0.4 | 641 | 97.7% | **95.9%** | 96.1% | 95.8% | 100.0% | 95.9% | 100.0% |
144:| hybrid blind | A+C-ft v0.3 | 641 | 99.7% | **99.4%** | 99.4% | 99.4% | 100.0% | 99.4% | 10.8% |
145:| hybrid blind | A+C-ft v0.4 | 641 | 99.7% | **99.2%** | 99.1% | 99.4% | 100.0% | 99.2% | 12.0% |
146:| v0.3 blind | A v0.3 | 844 | 99.2% | **98.5%** | 97.9% | 99.0% | 99.4% | 99.0% | – |
147:| v0.3 blind | A v0.4 | 844 | 99.4% | **98.3%** | 97.7% | 99.0% | 99.2% | 99.2% | – |
148:| v0.3 blind | A+B v0.3 | 844 | 99.4% | **99.1%** | 99.1% | 99.0% | 100.0% | 99.1% | 12.2% |
149:| v0.3 blind | A+B v0.4 | 844 | 99.6% | **99.3%** | 99.1% | 99.5% | 100.0% | 99.3% | 12.2% |
150:| v0.3 blind | A+B-safe v0.3 | 844 | 99.3% | **98.7%** | 98.4% | 99.0% | 99.4% | 99.3% | 12.2% |
151:| v0.3 blind | A+B-safe v0.4 | 844 | 99.4% | **98.5%** | 98.2% | 98.8% | 99.2% | 99.3% | 12.2% |
152:| v0.3 blind | B alone v0.3 | 844 | 97.2% | **91.4%** | 91.2% | 91.5% | 100.0% | 91.4% | 100.0% |
153:| v0.3 blind | B alone v0.4 | 844 | 98.5% | **95.4%** | 94.7% | 96.1% | 99.9% | 95.5% | 100.0% |
154:| v0.3 blind | A+C-ft v0.3 | 844 | 99.5% | **99.3%** | 99.5% | 99.0% | 100.0% | 99.3% | 12.2% |
155:| v0.3 blind | A+C-ft v0.4 | 844 | 99.8% | **99.5%** | 99.5% | 99.5% | 100.0% | 99.5% | 12.2% |
214:| system | `data/ood_eval` | hybrid blind OOD | v0.3 blind OOD | real out-of-catalog tasks |
229:| system | relex `data/eval` | hybrid blind | v0.3 blind e2e | v0.4 devtools |
244:| system | data/eval as bash | data/eval as zsh | data/eval as sh | data/eval as powershell | data/eval as fish | data/eval as cmd | blind (hybrid) bash / zsh / pwsh | devtools bash / zsh / pwsh |
274:  otherwise a 6-layer, PL+EN-vocabulary-pruned multilingual-e5-small (26.7 MB int8 ONNX, ~3.5 ms on one core) re-ranks
276:  on relexicalised `data/eval` from 82.8% to **87.7%**; on the noisy private real-history set from 48.5% to 67.1%. On the new blind set it stays the same (98.8% → 98.9%; A is already near the ceiling there).
281:  A **LoRA fine-tune on CPU** (800 × 8 examples, ~55 min) makes it the most accurate re-ranker (A+C-ft **97.1%** on `data/eval`, 99.1% on blind).
292:| **B** | `intfloat/multilingual-e5-small`, vocabulary pruned to PL+EN pieces (250k -> 36k), bottom 6 of 12 layers, fine-tuned as joint tool (55) + intent (149) classifier + BIO slot tagger (37 labels); int8 ONNX | `onnxruntime-node` (or `-web`), own SentencePiece-Unigram tokenizer in JS (`src/rerank/tokenizer.js`, 12 364/12 364 sequences identical to HF) | 26.7 MB (21.7 MB .tgz) |
305:* **New blind set** `data/hybrid/blind/` (681 rows: 331 EN, 310 PL, 40 OOD; bash/zsh/sh/PowerShell/fish/cmd with matching OS,
309:  queries such as "install htop"); B/C training drops them, and the "blind, novel texts only" rows (527) exclude every
310:  blind text that occurs in any training file.
357:| blind (all) | A cascade (v0.2) | 641 | 98.9% | **98.8%** | 98.5% | 99.0% | 99.8% | 98.9% | – |
358:| blind (all) | B encoder alone | 641 | 95.8% | **89.4%** | 89.7% | 89.0% | 100.0% | 89.4% | 100.0% |
359:| blind (all) | A+B hybrid | 641 | 99.4% | **98.9%** | 98.8% | 99.0% | 100.0% | 98.9% | 14.7% |
360:| blind (all) | A+B safe (no rescue) | 641 | 99.4% | **98.8%** | 98.8% | 98.7% | 99.8% | 98.9% | 14.7% |
361:| blind (all) | C LM rerank alone | 63 | 92.1% | **77.8%** | 91.2% | 62.1% | 100.0% | 77.8% | 100.0% |
362:| blind (all) | A+C hybrid | 641 | 99.5% | **99.4%** | 99.1% | 99.7% | 100.0% | 99.4% | 14.7% |
363:| blind (all) | A+C safe (no rescue) | 641 | 99.5% | **99.2%** | 99.1% | 99.4% | 99.8% | 99.4% | 14.7% |
364:| blind (all) | C-ft LM rerank alone (LoRA) | 63 | 100.0% | **98.4%** | 100.0% | 96.6% | 100.0% | 98.4% | 100.0% |
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
/bin/bash -lc "sed -n '1,210p' scripts/gen_data.js" in /workspace/tellsh
 succeeded in 0ms:
#!/usr/bin/env node
// Build featurised training data for scripts/train.py (all features computed by src/features.js, so
// training and runtime share one implementation). Writes build/cls.jsonl, build/tag.jsonl, build/meta.json.
//
//   classifier rows: {y: family, i: intent|"", f: [[idx, val], ...], w, g: source, lang, gid}
//   tagger rows:     {tool, f: [[idx, ...] per token], y: [BIO label per token], gid}
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { INTENTS } from '../src/catalog.js';
import { FAMILIES, FAMILY_OF, NONE, TAG_TYPES } from '../src/tools.js';
import { vectorize, normalize, tagTokens, tagFeatures } from '../src/features.js';
import { ctxFeatures } from '../src/history.js';
import { silverSpans, relex, bioLabels, mulberry32 } from './lib/silver.js';
import { exclusionIndex } from './lib/heldout.js';
import { readReal, realTrain } from './real/real_rows.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
export const DIM = 1 << 18;
export const TAG_DIM = 1 << 18;
const args = process.argv.slice(2);
const SEED = +(args.find((a) => a.startsWith('--seed='))?.slice(7) || 13);
const rng = mulberry32(SEED);
const pick = (arr) => arr[Math.floor(rng() * arr.length)];

const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l, i) => {
  try { return JSON.parse(l); } catch (e) { throw new Error(`${p}:${i + 1}: ${e.message}`); }
}) : []);
const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);

// ---------- environment / context sampling ----------
const SHELL_P = [['bash', 0.35], ['zsh', 0.25], ['sh', 0.07], ['powershell', 0.18], ['fish', 0.08], ['cmd', 0.07]];
function sampleEnv(shell) {
  let s = shell;
  if (!s) { let r = rng(); for (const [k, p] of SHELL_P) { if ((r -= p) <= 0) { s = k; break; } } s ??= 'bash'; }
  let os;
  if (s === 'cmd') os = 'win32';
  else if (s === 'powershell') os = rng() < 0.7 ? 'win32' : rng() < 0.5 ? 'linux' : 'darwin';
  else if (s === 'zsh') os = rng() < 0.6 ? 'darwin' : 'linux';
  else os = rng() < 0.7 ? 'linux' : 'darwin';
  return [`shell=${s}`, `os=${os}`];
}
const ENT_FAMILY = { container: 'docker', service: 'systemctl', pid: 'ps', proc: 'ps', port: 'ss', file: 'cat', dir: 'ls', branch: 'git', host: 'ping', url: 'curl' };
const ENTS = Object.keys(ENT_FAMILY);
function randomCtx(main) {
  const types = [...new Set([main ?? pick(ENTS), ...ENTS.filter(() => rng() < 0.15)])];
  const fam = rng() < 0.7 ? ENT_FAMILY[types[0]] : pick(Object.keys(FAMILIES));
  return ctxFeatures({ entOrder: types, last: { intent: FAMILIES[fam][0] }, cwdFlags: rng() < 0.3 ? ['git'] : [] });
}

// ---------- typo augmentation ----------
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

// ---------- anaphora (history reference) samples ----------
const ANAPHORA = {
  kill: { en: ['kill it', 'kill that', 'kill that process', 'terminate it', 'kill it now', 'kill this one', 'end that process', 'just kill it'],
    pl: ['zabij go', 'zabij to', 'ubij go', 'zabij ten proces', 'zakończ go', 'ubij ten proces', 'zabij tamten', 'ubij to'],
    map: { pid: 'kill_by_pid', proc: 'kill_by_name', port: 'kill_by_port', container: 'docker_stop' } },
  logs: { en: ['show its logs', 'logs of that container', 'show logs for it', 'logs of it', 'tail its logs', "show that service's logs", 'what did it log'],
    pl: ['pokaż jego logi', 'logi tego kontenera', 'pokaż logi tego', 'logi tej usługi', 'pokaż z niego logi', 'logi z tego', 'co tam loguje'],
    map: { container: 'docker_logs', service: 'journal_service' } },
  restart: { en: ['restart it', 'restart that service', 'restart that', 'reload it', 'bounce it'],
    pl: ['zrestartuj go', 'zrestartuj tę usługę', 'zrestartuj to', 'uruchom go ponownie', 'przeładuj to'],
    map: { service: 'service_restart' } },
  stop: { en: ['stop it', 'stop that', 'stop that container', 'stop this service', 'shut it down'],
    pl: ['zatrzymaj go', 'zatrzymaj to', 'zatrzymaj ten kontener', 'zatrzymaj tę usługę', 'wyłącz to'],
    map: { container: 'docker_stop', service: 'service_stop', pid: 'kill_by_pid', proc: 'kill_by_name' } },
  start: { en: ['start it', 'start that service', 'start it again'], pl: ['uruchom go', 'wystartuj tę usługę', 'włącz to'],
    map: { service: 'service_start' } },
  delete: { en: ['delete it', 'remove that', 'remove that file', 'delete this', 'rm it', 'get rid of it', 'delete that branch', 'delete that folder'],
    pl: ['usuń to', 'usuń go', 'skasuj to', 'usuń ten plik', 'wywal to', 'skasuj tę gałąź', 'usuń ten folder', 'usuń tamto'],
    map: { file: 'delete_file', dir: 'delete_dir', branch: 'git_delete_branch' } },
  enter: { en: ['open a shell in it', 'exec into it', 'enter that container'], pl: ['wejdź do niego', 'wejdź do tego kontenera', 'otwórz w nim shell'],
    map: { container: 'docker_exec' } },
  switch: { en: ['switch to it', 'checkout that branch', 'go to that branch'], pl: ['przełącz się na nią', 'przejdź na tę gałąź', 'checkout na to'],
    map: { branch: 'git_switch_branch' } },
  status: { en: ['status of it', "what's its status", 'is it running'], pl: ['jaki ma status', 'status tego', 'czy to działa'],
    map: { service: 'service_status' } },
  size: { en: ['how big is it', 'size of that', "what's its size"], pl: ['ile to zajmuje', 'jaki ma rozmiar', 'ile waży ten folder'],
    map: { dir: 'dir_size', file: 'file_stat' } },
  show: { en: ['show it', 'open it', 'print it', 'cat that file', 'display that'], pl: ['pokaż go', 'pokaż to', 'wyświetl ten plik', 'otwórz to', 'wypisz to'],
    map: { file: 'cat_file', dir: 'list_files' } },
  ping: { en: ['ping it', 'ping that host'], pl: ['pingnij go', 'spinguj ten serwer'], map: { host: 'ping_host' } },
  connect: { en: ['ssh into it', 'connect to it'], pl: ['połącz się z nim', 'zaloguj się na niego'], map: { host: 'ssh_connect' } },
};

// ---------------------------------------------------------------------------------------------
function main() {
  const outDir = join(ROOT, 'build');
  mkdirSync(outDir, { recursive: true });
  const ids = new Set(INTENTS.map((i) => i.id));

  // held-out texts (never trained on), with filler-word near-duplicates and contrastive rewrites, and
  // eval-only slot values (scripts/lib/silver.js EVAL_POOLS): the same index teacher.js uses (scripts/lib/heldout.js)
  // private real-usage rows (scripts/real/prepare_real.js; build/real/, never committed): the train split is used for
  // training, the eval split is held out like every other eval set. --no-real trains on public data only.
  const real = args.includes('--no-real') ? [] : readReal(ROOT);
  const excl = exclusionIndex(ROOT);
  const heldOut = excl.heldOut;
  const evalValRe = { test: excl.evalValue };
  const leaks = excl.has;

  const intentRows = [...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'train.jsonl'))]
    .map((r) => ({ ...r, src: 'intents' }));
  const shellRows = readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell' }));
  const realRows = realTrain(real, ids);
  for (const r of [...intentRows, ...shellRows]) if (!ids.has(r.intent)) throw new Error(`unknown intent ${r.intent}: ${r.text}`);
  const publicCount = intentRows.length + shellRows.length;

  // teacher review decisions (data/teacher/decisions.jsonl): drop or relabel individual training rows
  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl')).filter((d) => d.text && d.field !== 'risk');
  const decide = new Map(decisions.map((d) => [normalize(d.text), d]));
  let dropped = 0;
  let droppedEvalValue = 0;
  let droppedDerived = 0;
  let teacherDropped = 0;
  const seen = new Set();
  const base = [];
  for (const r0 of [...intentRows, ...shellRows, ...realRows]) {
    const n = normalize(r0.text);
    if (heldOut.has(r0.text)) { dropped++; continue; }
    if (evalValRe.test(r0.text)) { droppedEvalValue++; continue; }
    const d = decide.get(n);
    if (d?.action === 'drop') { teacherDropped++; continue; }
    const r = d?.action === 'relabel' && d.intent ? { ...r0, intent: d.intent } : r0;
    const key = n + '|' + r.intent + '|' + (r.shell || '');
    if (seen.has(key)) continue;
    seen.add(key);
    base.push(r);
  }

  const cls = createWriteStream(join(outDir, 'cls.jsonl'));
  const tag = createWriteStream(join(outDir, 'tag.jsonl'));
  const counts = { cls: 0, tag: 0, bySrc: {} };
  let gid = 0;
  // every emitted example (incl. typo / relexicalised copies and anaphora phrases) is checked against the
  // held-out texts and eval-only values, not just the base rows
  const emit = (text, family, intent, extras, w, g, lang, group) => {
    if (leaks(text)) { droppedDerived++; return; }
    const f = [...vectorize(text, DIM, extras).entries()].sort((a, b) => a[0] - b[0]).map(([k, v]) => [k, +v.toFixed(6)]);
    cls.write(JSON.stringify({ y: family, i: intent || '', f, w, g, lang: lang || '', gid: group }) + '\n');
    counts.cls++;
    counts.bySrc[g] = (counts.bySrc[g] || 0) + 1;
  };
  const emitTag = (text, spans, tool, group) => {
    if (leaks(text)) { droppedDerived++; return; }
    const toks = tagTokens(text);
    if (!toks.length) return;
    const y = bioLabels(toks, spans);
    tag.write(JSON.stringify({ tool, f: tagFeatures(toks, tool, TAG_DIM), y, gid: group }) + '\n');
    counts.tag++;
  };

  // teacher-confirmed low-margin rows of confusable intents (scripts/teacher.js mine) get a second copy
  const boost = new Set(readJsonl(join(ROOT, 'data', 'teacher', 'hardneg_boost.jsonl')).map((r) => normalize(r.text) + '|' + r.intent));
  let nBoost = 0;

  // 1. intent paraphrases (+ typo copy, + relexicalised copy), random env, some ctx noise
  for (const r of base) {
    const g = gid++;
    const fam = FAMILY_OF[r.intent];
    const env = () => (r.shell ? [`shell=${r.shell}`, `os=${r.os || 'linux'}`] : sampleEnv());
    const ctx = () => (rng() < 0.25 ? randomCtx() : []);
    // real-usage rows: LLM-written requests with noisy labels -> half weight, and no tagger rows (their regex silver
    // spans are unreliable: long paths, backticks, command fragments)
    const w = r.src === 'real' ? 0.5 : 1;
    emit(r.text, fam, r.intent, [...env(), ...ctx()], w, r.src, r.lang, g);
    if (boost.has(normalize(r.text) + '|' + r.intent)) { emit(r.text, fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g); nBoost++; }
    emit(typo(r.text), fam, r.intent, [...env(), ...ctx()], w, r.src, r.lang, g);
    if (r.src === 'real') continue;
    const { spans } = silverSpans(r.text, r.intent);
    emitTag(r.text, spans, fam, g);
    for (let k = 0; k < 2; k++) {
      const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'train' });
      emitTag(rx.text, rx.spans, fam, g);
      if (k === 0 && rx.text !== r.text) emit(rx.text, fam, r.intent, [...env(), ...ctx()], 0.5, r.src, r.lang, g);
    }
  }

  // filtered training corpus for scripts/build_triggers.js (same exclusions and teacher decisions)
  writeFileSync(join(outDir, 'train_rows.jsonl'), base.filter((r) => r.src !== 'real').map((r) => JSON.stringify({ text: r.text, intent: r.intent, lang: r.lang, shell: r.shell || '' })).join('\n') + '\n');

  // 2. history anaphora: pronoun requests whose intent depends on ctx_ features
  let nAna = 0;
  for (const [, v] of Object.entries(ANAPHORA)) {
    for (const [ent, intent] of Object.entries(v.map)) {
      for (const lang of ['en', 'pl']) {
        for (const text of v[lang]) {
          const g = gid++; // the three context variants of one phrase share a calibration group
          for (let k = 0; k < 3; k++) {
            emit(text, FAMILY_OF[intent], intent, [...sampleEnv(), ...randomCtx(ent)], 1, 'ctx', lang, g);
            if (k === 0) emitTag(text, [], FAMILY_OF[intent], g);
            nAna++;
          }
        }
      }
    }
  }

  // 3. tldr descriptions (CC-BY-4.0): stage-1 tool labels only, capped per family/lang

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for (const q of ['merge pr #45','merge pr 45 in https://github.com/org/repo','merge pr 45 and 46','merge the pr with label urgent','merge the pr assigned to alice','merge the pr on branch main','merge pr #45 after tests pass','merge pr #45 without deleting the branch','show lines 10-20 of report2024.txt']) { const r=suggest(q,{env,compose:'off'}); console.log(JSON.stringify({q,intent:r.intent,command:r.command,missing:r.missing,understood:r.understood,slots:r.slots})); }
for (const h of ['pgrep -u alice -x node','env -u HOME cat ~/a.txt','systemctl --user status nginx','cp a.txt backup.d','git branch --contains main','gh pr view 45 --repo=a/b','cd /tmp && (cd /srv); cat x.txt']) { const q = h.startsWith('pgrep') ? 'kill it' : h.startsWith('systemctl') ? 'restart it' : h.startsWith('gh') ? 'merge that pr' : 'delete it'; const r=suggest(q,{env,compose:'off',history:[h]});console.log(JSON.stringify({h,q,command:r.command,missing:r.missing,context:r.context})); }
JS" in /workspace/tellsh
 succeeded in 137ms:
{"q":"merge pr #45","intent":"gh_pr_merge","command":"gh pr merge 45","missing":[],"understood":true,"slots":{"pr":"45"}}
{"q":"merge pr 45 in https://github.com/org/repo","intent":"gh_pr_merge","command":"gh pr merge 45 --repo github.com/org/repo","missing":[],"understood":true,"slots":{"repo":"github.com/org/repo","pr":"45","url":"https://github.com/org/repo"}}
{"q":"merge pr 45 and 46","intent":"gh_pr_merge","command":"gh pr merge 45","missing":[],"understood":true,"slots":{"pr":"45"}}
{"q":"merge the pr with label urgent","intent":"gh_pr_merge","command":"gh pr merge","missing":[],"understood":true,"slots":{}}
{"q":"merge the pr assigned to alice","intent":"gh_pr_merge","command":"gh pr merge <PR>","missing":["pr"],"understood":true,"slots":{}}
{"q":"merge the pr on branch main","intent":"gh_pr_merge","command":"gh pr merge main","missing":[],"understood":true,"slots":{"pr":"main"}}
{"q":"merge pr #45 after tests pass","intent":"gh_pr_merge","command":"gh pr merge 45","missing":[],"understood":true,"slots":{"pr":"45"}}
{"q":"merge pr #45 without deleting the branch","intent":"gh_pr_merge","command":"gh pr merge 45","missing":[],"understood":true,"slots":{"pr":"45"}}
{"q":"show lines 10-20 of report2024.txt","intent":"print_line_range","command":"sed -n '10,20p' report2024.txt","missing":[],"understood":true,"slots":{"file":"report2024.txt","start":10,"end":20}}
{"h":"pgrep -u alice -x node","q":"kill it","command":"pkill -f node","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"proc\" from history = node"}}
{"h":"env -u HOME cat ~/a.txt","q":"delete it","command":"rm ~/a.txt","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = ~/a.txt"}}
{"h":"systemctl --user status nginx","q":"restart it","command":"sudo systemctl restart nginx","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"service\" from history = nginx"}}
{"h":"cp a.txt backup.d","q":"delete it","command":"rm backup.d","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = backup.d"}}
{"h":"git branch --contains main","q":"delete it","command":"git branch -d main","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"branch\" from history = main"}}
{"h":"gh pr view 45 --repo=a/b","q":"merge that pr","command":"gh pr merge <PR>","missing":["pr"],"context":{"used":true,"commands":1,"rule":"refused","note":"the latest pr in history (45) cannot be read unambiguously; not guessing"}}
{"h":"cd /tmp && (cd /srv); cat x.txt","q":"delete it","command":"rm x.txt","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = x.txt"}}

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/slots.js src/tagger.js src/model.js src/catalog.js src/variants.js' in /workspace/tellsh
 succeeded in 0ms:
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
diff --git a/src/slots.js b/src/slots.js
index fb80f79..8274f16 100644
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
@@ -412,6 +462,15 @@ function nextAfter(words, triggers, { skip = STOP, accept = /^[\w@.:/+-]+$/ } =
 }
 
 // original-case token from the original text matching a folded word
+// "install requests==2.32.0 with pip": the package word with its version constraint / extras is the whole requirement
+// (never the bare name, an unrestricted install); validation withholds one that is not a requirement
+function withConstraint(text, w) {
+  const t = String(text).split(/\s+/).map((x) => x.replace(/^["'(]+|["').!?]+$/g, '')).find((x) => x.length > w.length && x.toLowerCase().startsWith(String(w).toLowerCase()) && /^[=<>~!@^[]/.test(x.slice(w.length)));
+  if (t == null) return w;
+  // `django>=4,<5`: the comma-separated rest of the specifier
+  const m = String(text).match(new RegExp(`(?:^|\\s)(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:,[=<>~!][^\\s,]*)*)`));
+  return (m ? m[1] : t).replace(/[.!?]+$/, '');
+}
 function original(text, folded) {
   const toks = text.split(/[\s,;!?()"']+/);
   return toks.find((t) => foldKeepLength(t).replace(/[.:]+$/, '') === folded) || folded;
@@ -423,8 +482,9 @@ const TRIG = {
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
@@ -432,11 +492,18 @@ const TRIG = {
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
@@ -449,15 +516,16 @@ function taggedArg(slot, ex) {
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
@@ -492,6 +560,27 @@ export function pickArg(slot, ex) {
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
+    // "install typescript@^5.4 with npm": a versioned requirement right after the install verb is the package
+    const req = text.match(/(?:^|\s)(?:install|add|zainstaluj|instaluj|doinstaluj)\s+(?:(?:the\s+)?(?:package|pakiet)\s+)?([A-Za-z][\w.-]*(?:\[[^\]\s]*\])?[=<>~!@^]\S*)/i);
+    if (req) return withConstraint(text, req[1].replace(/[=<>~!@^[].*$/s, ''));
+    for (const w of words) if (vocab.has(w) && !PKG_SKIP.has(w)) return withConstraint(text, original(text, w));
+    const r = nextAfter(words, TRIG.pkg, { skip: new Set([...STOP, ...PKG_SKIP]), accept: /^@?[\w.+-]+(?:\/[\w.+-]+)?(?:[=@<>~]=?[\w.*-]+)?$/ });
+    if (r) return withConstraint(text, original(text, r.word));
+    const i = words.findIndex((w, k) => vocab.has(w) && !/^(install|i|add|uninstall|zainstaluj|instaluj)$/.test(words[k + 1] || ''));
+    return i >= 0 ? withConstraint(text, original(text, words[i])) : null;
+  }
   if (vocab) {
     for (const w of words) if (vocab.has(w)) return original(text, w);
     // Polish inflection of a known name: "procesy javy" -> java, "logi nginxa" -> nginx, "chroma" -> chrome
@@ -504,8 +593,16 @@ export function pickArg(slot, ex) {
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
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
for(const q of ['pip install requests==2.32.0','install requests==2.32.0 with pip','pip install django>=4,<5','pip install requests[socks]','npm install lodash@"'^4.17.21'"','npm install --save-dev typescript','install typescript as a dev dependency','npm run test:unit','npm run deploy --dry-run','show help for tool.exe','merge the pr with label urgent','merge the pr for issue login','merge pr #45 or #46','merge the pull request with title fix login','merge the pull request by alice']){const r=suggest(q,{shell:'bash',os:'linux',compose:'off'}); console.log(JSON.stringify({q,intent:r.intent,command:r.command,missing:r.missing,sources:r.slotSources}));}
JS" in /workspace/tellsh
 succeeded in 121ms:
{"q":"pip install requests==2.32.0","intent":"pip_install","command":"python3 -m pip install requests==2.32.0","missing":[],"sources":{"pkg":"regex"}}
{"q":"install requests==2.32.0 with pip","intent":"pip_install","command":"python3 -m pip install requests==2.32.0","missing":[],"sources":{"pkg":"regex"}}
{"q":"pip install django>=4,<5","intent":"pip_install","command":"python3 -m pip install 'django>=4,<5'","missing":[],"sources":{"count":"regex","pkg":"regex"}}
{"q":"pip install requests[socks]","intent":"pip_install","command":"python3 -m pip install 'requests[socks]'","missing":[],"sources":{"pkg":"regex"}}
{"q":"npm install lodash@^4.17.21","intent":"npm_install","command":"npm install 'lodash@^4.17.21'","missing":[],"sources":{"pkg":"regex"}}
{"q":"npm install --save-dev typescript","intent":"npm_install","command":"npm install typescript","missing":[],"sources":{"pkg":"regex","glob":"regex"}}
{"q":"install typescript as a dev dependency","intent":"npm_install","command":"npm install typescript","missing":[],"sources":{"pkg":"tagger","glob":"regex"}}
{"q":"npm run test:unit","intent":"npm_run_script","command":"npm run test:unit","missing":[],"sources":{"script":"tagger"}}
{"q":"npm run deploy --dry-run","intent":"npm_run_script","command":"npm run deploy","missing":[],"sources":{"script":"regex"}}
{"q":"show help for tool.exe","intent":"cli_help","command":"tool.exe --help","missing":[],"sources":{"cmd":"tagger"}}
{"q":"merge the pr with label urgent","intent":"gh_pr_merge","command":"gh pr merge","missing":[],"sources":{}}
{"q":"merge the pr for issue login","intent":"gh_pr_merge","command":"gh pr merge <PR>","missing":["pr"],"sources":{}}
{"q":"merge pr #45 or #46","intent":"gh_pr_merge","command":"gh pr merge 45","missing":[],"sources":{"pr":"tagger"}}
{"q":"merge the pull request with title fix login","intent":"gh_pr_merge","command":"gh pr merge","missing":[],"sources":{}}
{"q":"merge the pull request by alice","intent":"gh_pr_merge","command":"gh pr merge <PR>","missing":["pr"],"sources":{}}

exec
/bin/bash -lc "sed -n '723,750p' src/history.js; sed -n '1,125p' scripts/real/prepare_real.js; sed -n '1,115p' scripts/lib/jev.js; cat scripts/real/group.js; cat scripts/real/group_leak.js" in /workspace/tellsh
 succeeded in 0ms:
function listedBySegment(w, pipedIn, k) {
  const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
  const nonFlags = afterGlobals(head, w.slice(1)).filter((a) => !/^-/.test(a));
  // `du -sh DIR` is the size of DIR itself; `du DIR` / `du -d 1 DIR` lists what is inside
  if (head === 'du' && w.slice(1).some((a) => /^-[a-zA-Z]*s|^--summarize$/.test(a)) && !nonFlags.some(isGlob)) return [];
  if (FS_LISTERS.has(head)) return ['file', 'dir'];
  // grep reading a pipe filters what an earlier stage printed; reading files it lists matches
  if (FS_SEARCHERS.has(head)) return pipedIn ? [] : ['file', 'dir'];
  if (PROC_LISTERS.has(head)) return ['pid', 'proc'];
  if (['ss', 'netstat', 'lsof', 'fuser', 'get-nettcpconnection'].includes(head)) return ['port', 'pid', 'proc'];
  if (head === 'docker' || head === 'podman') {
    const sub = nonFlags.slice(0, 2).join(' ');
    return /^(?:ps|stats|container (?:ls|list|ps)|compose ps|top)\b/.test(sub) ? ['container'] : [];
  }
  if (head === 'systemctl') return !nonFlags.length || /^list-/.test(nonFlags[0]) || w.includes('--failed') ? ['service'] : [];
  if (head === 'service') return w.includes('--status-all') ? ['service'] : [];
  if (head === 'get-service' || head === 'gsv') return psArgs(w.slice(1)).pos.length || /-(?:name|displayname)\b/i.test(w.join(' ')) ? [] : ['service'];
  if (head === 'git') {
    const sub = nonFlags[0];
    if (sub === 'branch') return nonFlags.length === 1 && !w.some((a) => /^-(?:d|D|m|M|c|C|-delete|-move|-copy)$/.test(a)) ? ['branch'] : [];
    if (['grep', 'ls-files', 'status', 'clean'].includes(sub)) return ['file', 'dir'];
  }
  return [];
}
const LIST_INTENT = { docker_ps: ['container'], docker_ps_all: ['container'], docker_stats: ['container'], list_services: ['service'],
  failed_services: ['service'], git_branches: ['branch'], git_status: ['file', 'dir'] };
const LIST_FAMILY = { ls: ['file', 'dir'], find: ['file', 'dir'], grep: ['file', 'dir'], du: ['file', 'dir'], ps: ['pid', 'proc'], ss: ['port', 'pid', 'proc'] };
/** Entity types a catalog intent prints many values of (for previous `tellsh <query>` lines). */
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
// `--group v04` (default) reproduces the split the shipped model was trained on; its skeleton keeps up to two lower-case
// words after the head, so operands leak into it (`npm install express` / `npm install react` are two groups). On that
// split 552 of the 2957 labelled eval rows share a --group structural skeleton (per-tool subcommand depth, operands
// masked) with a train row; A scores 84.6% on them vs 83.5% on the rest (scripts/real/group_leak.js,
// HYBRID.md#v04-real-usage). The next retrain should use `--group structural`.
//
// Usage: node scripts/real/prepare_real.js [--data <dataset.jsonl>] [--eval-frac 0.25] [--group v04|structural]
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { BY_ID } from '../../src/catalog.js';
import { strip, group } from './group.js';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const SRC = arg('--data', process.env.TELLSH_REAL_DATA || '/workspace/tellsh-data/dataset.jsonl');
const EVAL_FRAC = +arg('--eval-frac', 0.25);
const GROUP = arg('--group', 'v04');
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
function newIntentOf(cmd) {
  const c = strip(cmd);
  for (const [id, re] of NEW) if (re.test(c)) return id;
  return null;
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
  cmds.push({ cmd, intent, shell, os, group: group(cmd, GROUP), seed, src: r.source_type,
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
// Command groups for the real-usage train / eval split (scripts/real/prepare_real.js): a value-masked command skeleton,
// head + subcommands + sorted flags + number of operands, so `gh pr view 12 --repo a/b` and `gh pr view 40 --repo c/d`
// are one group.
export const strip = (c) => c.trim().replace(/^(?:sudo |npx (?:-y )?|env \w+=\S+ )+/, '');

// subcommand levels per tool for the structural grouping (`gh pr merge`, `docker compose up`, `npm install`; `cat`: none)
const SUBCOMMAND_DEPTH = { git: 1, docker: 2, podman: 2, kubectl: 1, gh: 2, npm: 1, pnpm: 1, yarn: 1, bun: 1, pip: 1, pip3: 1, cargo: 1,
  go: 1, systemctl: 1, apt: 1, 'apt-get': 1, brew: 1, dnf: 1, yum: 1, conda: 1, helm: 1, terraform: 1, aws: 2, gcloud: 3, az: 2,
  wrangler: 2, snap: 1, rustup: 1, poetry: 1, uv: 1, nmcli: 2, ip: 2, launchctl: 1, defaults: 1, flatpak: 1, pm2: 1, supabase: 2, vercel: 1 };

/**
 * mode 'v04' (the split the shipped model was trained on): up to two lower-case words after the head, so operands
 * (`npm install express` / `cat alpha`) stay in the skeleton; 'structural': only the tool's own subcommand levels.
 */
export function group(cmd, mode = 'v04') {
  const w = strip(cmd).split(/\s+/);
  const head = [w[0]];
  let i = 1;
  const depth = mode === 'structural' ? SUBCOMMAND_DEPTH[w[0]] ?? 0 : 2;
  while (i < w.length && head.length <= depth && /^[a-z][a-z-]*$/.test(w[i])) head.push(w[i++]);
  const flags = new Set();
  let ops = 0;
  for (; i < w.length; i++) {
    if (/^-{1,2}[A-Za-z][\w-]*/.test(w[i])) flags.add(w[i].replace(/=.*/, ''));
    else if (!/^[|;&]/.test(w[i])) ops++;
  }
  return `${head.join(' ')} ${[...flags].sort().join(' ')} #${Math.min(ops, 3)}`;
}
#!/usr/bin/env node
// How much the v04 command-group split leaks across train / eval: labelled eval rows whose structural skeleton
// (scripts/real/group.js, operands masked) also occurs in the train split, and model A's intent accuracy (cascade top-1)
// on the leaked and the clean rows. Reads the PRIVATE build/real/rows.jsonl; prints aggregate counts only.
//   node scripts/real/group_leak.js
import { fileURLToPath } from 'node:url';
import { readReal } from './real_rows.js';
import { group } from './group.js';
import { cascade } from '../../src/cascade.js';
import { envFeatures } from '../../src/env.js';

const rows = readReal(fileURLToPath(new URL('../..', import.meta.url)));
if (!rows.length) { console.error('group_leak: no build/real/rows.jsonl'); process.exit(1); }
const train = new Set(rows.filter((r) => r.split === 'train').map((r) => group(r.cmd, 'structural')));
const ev = rows.filter((r) => r.split === 'eval' && r.intent);
const leaked = ev.filter((r) => train.has(group(r.cmd, 'structural')));
const clean = ev.filter((r) => !train.has(group(r.cmd, 'structural')));
const acc = (rs) => {
  const ok = rs.filter((r) => cascade(r.text, { extras: envFeatures({ shell: r.shell, os: r.os }) }).intent === r.intent).length;
  return { n: rs.length, ok, pct: +(100 * ok / (rs.length || 1)).toFixed(1) };
};
console.log(JSON.stringify({ evalLabelled: ev.length, leaked: leaked.length, A: { all: acc(ev), leaked: acc(leaked), clean: acc(clean) } }, null, 1));

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
for(const q of ['wrangler deploy --dry-run','do a dry run of wrangler deploy','preview a Cloudflare Worker deployment without publishing','npm run deploy -- --dry-run','run the deploy script in dry run mode','deploy worker to staging','merge the pull request with title fix login','merge the pr with label urgent']) {const r=suggest(q,{shell:'bash',os:'linux'});console.log(JSON.stringify({q,intent:r.intent,command:r.command,understood:r.understood,missing:r.missing,risk:r.risk,method:r.method}));}
JS" in /workspace/tellsh
 succeeded in 102ms:
{"q":"wrangler deploy --dry-run","intent":"wrangler_deploy","command":"npx wrangler deploy","understood":true,"missing":[],"risk":"medium","method":"catalog"}
{"q":"do a dry run of wrangler deploy","intent":"wrangler_deploy","command":"npx wrangler deploy","understood":true,"missing":[],"risk":"medium","method":"catalog"}
{"q":"preview a Cloudflare Worker deployment without publishing","intent":"wrangler_deploy","command":"npx wrangler deploy","understood":true,"missing":[],"risk":"medium","method":"catalog"}
{"q":"npm run deploy -- --dry-run","intent":"npm_run_script","command":"npm run deploy","understood":true,"missing":[],"risk":"medium","method":"catalog"}
{"q":"run the deploy script in dry run mode","intent":"npm_run_script","command":"npm run deploy","understood":true,"missing":[],"risk":"medium","method":"catalog"}
{"q":"deploy worker to staging","intent":"wrangler_deploy","command":"npx wrangler deploy","understood":true,"missing":[],"risk":"medium","method":"catalog"}
{"q":"merge the pull request with title fix login","intent":"gh_pr_merge","command":"gh pr merge","understood":true,"missing":[],"risk":"medium","method":"catalog"}
{"q":"merge the pr with label urgent","intent":"gh_pr_merge","command":"gh pr merge","understood":true,"missing":[],"risk":"medium","method":"catalog"}

exec
/bin/bash -lc "rg -n 'dry.run|with label|with title|prun.*eval|vocab.*eval' test src HYBRID.md README.md review/fix19-log.md; sed -n '1,140p' scripts/hybrid/export_encoder.py; sed -n '260,285p' src/pipeline.js" in /workspace/tellsh
 succeeded in 0ms:
README.md:49:  -n, --dry-run        print the command only, never run it
README.md:53:      --json           machine-readable output (implies --dry-run)
test/regressions9.test.js:38:  assert.equal(cliJson('--dry-run', 'delete folder', '/tmp/x').command, 'rm -r /tmp/x');
test/regressions9.test.js:57:  for (const h of [['cat secret.txt', 'tellsh show it delete it'], ['cat /tmp/important.txt', 'tellsh --dry-run "delete it from /tmp/scratch"']]) {
test/regressions8.test.js:70:    const out = cli(['--dry-run', `--history=${f}`, '--shell', 'bash', '--os', 'linux', 'delete', 'it']);
src/cli.js:26:  -n, --dry-run     print the command only, never run it
src/cli.js:30:      --json        machine-readable output (implies --dry-run)
src/cli.js:60:    else if (a === '-n' || a === '--dry-run') o.dryRun = true;
test/regressions4.test.js:195:  const r = spawnSync(process.execPath, ['bin/tellsh.js', '--dry-run', `--history=${hist}`, 'same', 'for', '/srv/current'], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/cli.test.js:24:test('--json dry-run (EN)', () => {
test/cli.test.js:34:test('--json dry-run (PL)', () => {
test/cli.test.js:42:test('dry-run prints command and never executes', () => {
test/compose.test.js:48:  const r = spawnSync('sh', ['-c', 'node bin/tellsh.js --dry-run show disk usage | head -c 1 >/dev/null; echo $?'], { encoding: 'utf8' });
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

codex
I’ve reproduced two unsafe translations: a Wrangler dry-run request becomes a deployment command, and a pull request identified by its title or label becomes a merge of the current branch’s PR. I’m checking the exact source locations and finishing the training-path review.
exec
/bin/bash -lc "sed -n '180,345p' scripts/train.py; sed -n '1,155p' scripts/hybrid/eval_hybrid.js; cat scripts/hybrid/sets.js; cat scripts/hybrid/fetch_model.js" in /workspace/tellsh
 succeeded in 0ms:
    ap.add_argument('--ood-holdout', type=float, default=0.35)
    ap.add_argument('--seed', type=int, default=13)
    ap.add_argument('--out', default=DEFAULT_OUT)
    args = ap.parse_args()
    t0 = time.time()
    meta = json.load(open(os.path.join(BUILD, 'meta.json')))
    dim, tag_dim = meta['dim'], meta['tagDim']
    rows, X = load_cls(dim)
    log(f'{len(rows)} classifier rows, {X.nnz} nnz')
    keep_int = lambda n: 1500 + 250 * n  # noqa: E731
    fam_intents = meta['intentsByFamily']

    # ---------------- calibration on a group-wise holdout ----------------
    rng = np.random.default_rng(args.seed)
    gids = np.array([r['gid'] for r in rows])
    ug = np.unique(gids)
    ho_g = set(rng.choice(ug, int(len(ug) * args.holdout), replace=False).tolist())
    # out-of-domain groups drive both thresholds: hold out a larger share of them (--ood-holdout) so the
    # compose threshold is not calibrated on a few dozen rows
    ood_g = np.unique([r['gid'] for r in rows if r['g'] == 'ood'])
    ho_g -= set(ood_g.tolist())
    ho_g |= set(rng.choice(ood_g, int(len(ood_g) * args.ood_holdout), replace=False).tolist()) if len(ood_g) else set()
    is_ho = np.array([g in ho_g for g in gids])
    # evaluate on the original (non-augmented) sentence of each group only: first row of the group
    first = np.zeros(len(rows), bool)
    seen = set()
    for i, g in enumerate(gids):
        if g not in seen:
            first[i] = True
            seen.add(g)
    tr_idx = np.flatnonzero(~is_ho)
    ho_idx = np.flatnonzero(is_ho & first)
    tool_s, int_s = train_all(rows, X, meta, tr_idx, args.C, args.keep_tool, keep_int, '[split] ')
    Xho = X[ho_idx]
    p_tool = tool_s['model'].proba(Xho)
    res = cascade_scores(p_tool, tool_s['labels'], {f: m['model'] for f, m in int_s.items()}, Xho, fam_intents)
    gold_i = [rows[i]['i'] for i in ho_idx]
    gold_t = [rows[i]['y'] for i in ho_idx]
    # thresholds are calibrated on curated rows only: the real-usage rows (g == 'real') carry noisy LLM labels, and
    # their "errors" would push the accept threshold up (they still train the models)
    src = [rows[i]['g'] for i in ho_idx]
    ind = np.array([g != '__none__' and gi != '' and s != 'real' for g, gi, s in zip(gold_t, gold_i, src)])
    oodm = np.array([g == '__none__' for g in gold_t])
    score = np.array([r[1] for r in res])
    correct = np.array([r[0] == gi for r, gi in zip(res, gold_i)])
    t1 = np.array([r[3] == g for r, g in zip(res, gold_t)])
    t3 = np.array([g in r[4] for r, g in zip(res, gold_t)])
    log(f'[split] holdout: intent acc={correct[ind].mean():.4f} tool top1={t1[ind].mean():.4f} top3={t3[ind].mean():.4f} '
        f'(n={ind.sum()}, ood n={oodm.sum()})')
    best_t, best_s = 0.0, -1
    for t in np.arange(0.02, 0.6, 0.005):
        keep_c = (score[ind & correct] >= t).mean()
        rej_w = (score[ind & ~correct] < t).mean() if (ind & ~correct).any() else 1.0
        rej_o = (score[oodm] < t).mean() if oodm.any() else 0.0
        if keep_c < 0.97:
            continue
        s = keep_c + 0.5 * rej_o + 0.25 * rej_w
        if s > best_s:
            best_t, best_s = float(t), s
    if best_s < 0:
        # no threshold keeps >= 97% of the correct answers: never fall back to "accept everything";
        # take the highest threshold that still keeps >= 90%, else a conservative default
        ok = [float(t) for t in np.arange(0.02, 0.6, 0.005) if (score[ind & correct] >= t).mean() >= 0.90]
        best_t = max(ok) if ok else 0.3
        log(f'WARNING: no accept threshold keeps 97% of correct answers; using {best_t:.3f}')
    # compose threshold: stage-1 top tool probability (non-__none__) that lets <=5% of OOD through
    top_nn = np.array([r[2] if r[3] != '__none__' else 0.0 for r in res])
    cands = [t for t in np.arange(0.1, 0.95, 0.01) if (top_nn[oodm] >= t).mean() <= 0.05] if oodm.any() else [0.5]
    compose_t = float(cands[0]) if cands else 0.9
    log(f'calibration rows: {int(ind.sum())} in-domain, {int(oodm.sum())} out-of-domain')
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
        z -= z.max()
        e = np.exp(z)
        return e / e.sum()

    fx = {'cls': [], 'tag': []}
    # never a private real-usage row (hashed n-grams of its text): curated rows only
    pub = [r for r in rows if r['g'] != 'real']
    step = max(1, len(pub) // 30)
    for r in pub[::step][:30]:
        p = q_proba('tool', r['f'])
        fx['cls'].append({'model': 'tool', 'f': r['f'], 'top': [[header['models']['tool']['labels'][i], float(p[i])] for i in np.argsort(-p)[:3]]})
        fam = r['y']
        if 'intent:' + fam in blobs:
            p = q_proba('intent:' + fam, r['f'])
            labels = header['models']['intent:' + fam]['labels']
            fx['cls'].append({'model': 'intent:' + fam, 'f': r['f'], 'top': [[labels[i], float(p[i])] for i in np.argsort(-p)[:2]]})
    for s in seqs[::max(1, len(seqs) // 10)][:10]:
        for f in s['f'][:3]:
            p = q_proba('tagger', [(k, 1.0) for k in sorted(set(f))])
            fx['tag'].append({'f': sorted(set(f)), 'top': [[header['models']['tagger']['labels'][i], float(p[i])] for i in np.argsort(-p)[:2]]})
    # the fixture belongs to the shipped model: written next to any other --out file, never over the test fixture
    shipped = os.path.abspath(args.out) == os.path.abspath(DEFAULT_OUT)
    parity = os.path.join(ROOT, 'test', 'fixtures', 'parity.json') if shipped else os.path.splitext(args.out)[0] + '.parity.json'
    with open(parity, 'w', encoding='utf-8') as f:
        json.dump(fx, f)
    log(f'wrote {os.path.relpath(parity, ROOT)}; done in {time.time() - t0:.0f}s')


if __name__ == '__main__':
    main()
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
// Install the hybrid encoder bundle once into ~/.cache/tellsh/enc-v2 (afterwards tellsh works fully offline).
//   node scripts/hybrid/fetch_model.js --from <dir>          copy a local bundle (e.g. hybrid/models/enc)
//   node scripts/hybrid/fetch_model.js --from <https-url>    download <url>/manifest.json and the files it lists
// Every file is verified against manifest.json (sha256). Write a manifest for a bundle:  --manifest <dir>
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { BUNDLE } from '../../src/rerank/encoder.js';

const argv = process.argv.slice(2);
const opt = (k) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : null; };
const sha = (buf) => createHash('sha256').update(buf).digest('hex');
const FILES = ['encoder.int8.onnx', 'vocab.json', 'labels.json'];

if (opt('manifest')) {
  const d = opt('manifest');
  const files = Object.fromEntries(FILES.map((f) => [f, sha(readFileSync(join(d, f)))]));
  writeFileSync(join(d, 'manifest.json'), JSON.stringify({ bundle: BUNDLE, files }, null, 1));
  console.log(`wrote ${join(d, 'manifest.json')}`);
  process.exit(0);
}
const from = opt('from');
if (!from) { console.error('usage: fetch_model.js --from <dir|https-url> | --manifest <dir>'); process.exit(2); }
const dest = opt('to') || join(homedir(), '.cache', 'tellsh', BUNDLE);
const get = async (name) => {
  if (/^https:\/\//.test(from)) {
    const r = await fetch(`${from.replace(/\/$/, '')}/${name}`);
    if (!r.ok) throw new Error(`${name}: HTTP ${r.status}`);
    return Buffer.from(await r.arrayBuffer());
  }
  return readFileSync(join(from, name));
};
const manifest = JSON.parse((await get('manifest.json')).toString('utf8'));
// the manifest comes from the same place as the files, so its names are not trusted: exactly the bundle's own file
// names (never `../../.bashrc` or an absolute path), each with a sha256
const names = Object.keys(manifest?.files || {});
if (names.length !== FILES.length || !FILES.every((f) => names.includes(f)) ||
    !FILES.every((f) => /^[0-9a-f]{64}$/.test(String(manifest.files[f])))) {
  console.error(`fetch_model: manifest.json must list exactly ${FILES.join(', ')} with sha256 checksums (got: ${names.join(', ') || 'none'})`);
  process.exit(1);
}
// everything is downloaded and verified before anything is written
const bufs = {};
for (const f of FILES) {
  bufs[f] = await get(f);
  if (sha(bufs[f]) !== manifest.files[f]) throw new Error(`${f}: sha256 mismatch`);
}
mkdirSync(dest, { recursive: true });
for (const f of FILES) {
  writeFileSync(join(dest, f + '.part'), bufs[f]);
  renameSync(join(dest, f + '.part'), join(dest, f));
}
writeFileSync(join(dest, 'manifest.json'), JSON.stringify({ bundle: manifest.bundle, files: Object.fromEntries(FILES.map((f) => [f, manifest.files[f]])) }, null, 1));
console.log(`installed ${BUNDLE} -> ${dest} (${readdirSync(dest).join(', ')})`);

exec
/bin/bash -lc "nl -ba src/fill.js | sed -n '40,111p'; nl -ba src/catalog.js | sed -n '255,288p'; git status --short" in /workspace/tellsh
 succeeded in 0ms:
    40	// an unmarked word (no digit, '/', '-', '_', '.', '#') names a branch only after "branch", "for" or "from" ("merge pr from bob");
    41	// otherwise it is withheld (the `?` fails validation)
    42	const PR_MARKED = /[\d/_.#-]/;
    43	// an abbreviation ("merge pr e.g. main", "merge pr w/o checks") or a host ("merge pr on github.com") is not a branch
    44	const PR_ABBREV = /^(?:e\.g|i\.e|w\/o|w\/|etc|vs|cf|a\.k\.a|n\/a|b\/c)$/i;
    45	const PR_HOST = /^(?:[\w-]+\.)+(?:com|org|net|io|dev|app|co|me)$/i;
    46	// a number names the pull request only right after "pr" / "pull request" (`pr 45`, `pr #45`, `pr number 45`) or as `#45`
    47	const PR_NUMBER_LEAD = /^(?:(?:number|no\.?|nr\.?)\s+)*$/i;
    48	const PR_WORD = /\b(?:pull[\s-]+requests?|pr|prs)\b/i;
    49	// an issue, ticket or bug is not the pull request ("merge pr for issue #45", "merge the pull request for ticket 3")
    50	const PR_ISSUE = /^(?:issues?|tickets?|bugs?)$/i;
    51	// a number followed by a unit is an amount, not the pull request ("merge pr 2 days old", "merge pr 3 times")
    52	const PR_UNIT_AFTER = /^\s+(?:secs?|seconds?|mins?|minutes?|hours?|hrs?|days?|weeks?|months?|years?|times?|ago|old|more|approvals?|reviews?|reviewers?|commits?|files?|lines?|changes?|comments?|checks?)\b/i;
    53	// `#45` alone names the pull request only as the first word after the verb ("merge #45", "squash merge #45", "please
    54	// close #7"); one in another clause ("the pr that closes #12", "merge the pr, see #99") is withheld
    55	const PR_HASH_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit)\s+)+$/i;
    56	// "merge the pull request by alice", "merge the pr from yesterday", "the pr that fixes login", "the pr opened last week": a
    57	// pull request picked out by who or when, which is not the current branch's (withheld)
    58	const PR_QUALIFIED = /^\s*(?:(?:by|from|since|before|after|about|titled|named|called|that|which|who|whose|where|od|autorstwa)\b|(?:\S+\s+)?(?:opened|created|authored|submitted|raised|written|made|sent|pushed|filed)\b)|\b(?:yesterday|today|tonight|tomorrow|ago|last\s+(?:week|month|year|night|friday|monday|tuesday|wednesday|thursday|saturday|sunday)|wczoraj\w*|dzisiaj|dzi[sś])\b/i;
    59	// "merge pr from the feature branch", "for my branch bob": a branch is named, but not one the parser read
    60	const PR_BRANCH_NAMED = /\b(?:for|of|on|from)\s+(?:\S+\s+){0,2}branch\b/i;
    61	/**
    62	 * The pull request the user names (quoted: kept as written, validation withholds an odd one), else null (`gh pr merge`
    63	 * acts on the current branch's pull request). A number elsewhere in the request ("merge pr with 2 approvals", "merge the
    64	 * 2 open prs") is never the pull request; a request that names something the parser cannot read (`bob's`, `in repo v2`)
    65	 * is withheld (`?`, shown as `<PR>`), never a bare `gh pr merge`.
    66	 */
    67	function prSelector(ex) {
    68	  if (ex.urls[0] != null) return ex.urls[0];
    69	  const text = String(ex.text);
    70	  const m = text.match(PR_SELECTOR);
    71	  if (m) {
    72	    const quoted = m[2] ?? m[3] ?? m[4] ?? m[5];
    73	    if (quoted != null) return quoted || '?'; // `""`: named but empty, withheld
    74	    if (m[7] != null) return '?'; // an unclosed / odd quote: withheld
    75	    const w = m[6];
    76	    const branch = /\bbranch\s+$/i.test(m[1]);
    77	    // "merge my pr from 2 days ago", "view pr for 3 days": a number after a connective is not the pull request
    78	    if (PR_ISSUE.test(w)) return '?';
    79	    const rest = text.slice(m.index + m[0].length);
    80	    if (/^#?\d+$/.test(w) && PR_UNIT_AFTER.test(rest)) return '?';
    81	    if (/^\d+$/.test(w)) return branch || PR_NUMBER_LEAD.test(m[1]) ? w : '?';
    82	    // "merge the pr for #12": the pull request for issue 12, or pull request 12
    83	    if (/^#\d+$/.test(w) && !PR_NUMBER_LEAD.test(m[1])) return '?';
    84	    if (PR_ABBREV.test(w) || (PR_HOST.test(w) && !branch)) return '?';
    85	    if (PR_MARKED.test(w)) return w;
    86	    // "merge pr for branch status": after "branch" any word is the selector, a describing one is withheld
    87	    if (branch) return PR_NOT_SELECTOR.test(w) ? `?${w}` : w;
    88	    if (!PR_NOT_SELECTOR.test(w)) {
    89	      // "merge pr for fix #12": the word is followed by a number, so it may describe rather than name the branch
    90	      if (/\b(?:for|from)\s+$/i.test(m[1])) return /\d/.test(rest) ? `?${w}` : w;
    91	      // "merge pr main": a bare word may be a branch or say something else: withheld (`gh pr merge <PR>`), never dropped
    92	      return `?${w}`;
    93	    }
    94	  }
    95	  const hash = text.match(/(?:^|\s)#(\d{1,12})(?=[\s.,!?;:]|$)/);
    96	  if (hash && PR_HASH_LEAD.test(text.slice(0, hash.index + hash[0].indexOf('#')))) return hash[1];
    97	  // 'merge the "feature/login" pull request': an explicitly quoted value is the target
    98	  if (ex.quoted.length) return ex.quoted[0];
    99	  // named but not readable: a number anywhere ("merge the 2 open prs", "merge pr in 2 minutes"), or a marked word or a
   100	  // quote after "pr" ("merge pr bob's", "merge pr feature/x's", "merge pr in repo v2"): withheld
   101	  const p = text.match(PR_WORD);
   102	  const after = p ? text.slice(p.index + p[0].length) : '';
   103	  if (ex.numbers?.length || /\d/.test(text) || /[/_#'"`„“”’]|\w[.-]\w/.test(after) || PR_BRANCH_NAMED.test(after) || PR_QUALIFIED.test(after)) return '?';
   104	  return null;
   105	}
   106	// "--repo a/b", "-R a/b", "in (the) repo(sitory) a/b", "in the a/b repo"; "in the other repo", "in another repository": named,
   107	// not readable ("this repo", "the current repository" are the working directory's)
   108	const PR_REPO_OPT = /(?:^|\s)(?:--repo(?:=|\s+|$)|-R(?:=|\s*))(\S*)/;
   109	const PR_REPO = /\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(?:github\s+)?(?:repo|repository|repozytorium)\s+(\S+)|\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(\S+(?:\s+\S+)?)\s+(?:github\s+)?(?:repo|repository)\b|\b(?:w|z)\s+repozytorium\s+(\S+)/i;
   110	// "this repo", "the repo", "my current repo", "our own repository": the working directory's
   111	const PR_REPO_HERE = /^(?:the|a|an|this|current|same|our|my|local|own|tym|tego|bieżącym|biezacym)(?:\s+(?:current|same|local|own))?$/i;
   255	  T('docker_compose_down', 'Stop docker compose services', 'docker compose down', {}, 'medium'),
   256	
   257	  // ---------- developer tools (v0.4, from real command usage) ----------
   258	  // project scripts and installs run arbitrary package code: medium
   259	  T('npm_run_script', 'Run a package.json script with npm (npm run dev/build/test)', 'npm run {script}', { script: null }, 'medium'),
   260	  T('npm_install', 'Install the project dependencies (or one package) with npm', 'npm install«{pkg}»', {}, 'medium'),
   261	  T('npm_install_global', 'Install an npm package globally', 'npm install -g {pkg}', { pkg: null }, 'medium',
   262	    { notes: 'may need sudo when the global prefix is not user-writable' }),
   263	  T('pip_install', 'Install a Python package with pip', 'python3 -m pip install {pkg}', { pkg: null }, 'medium'),
   264	  T('activate_venv', 'Activate a Python virtual environment', '. {path}/bin/activate', { path: '.venv' }, 'medium',
   265	    { notes: 'run it in your own shell: activating from tellsh only affects a subshell that exits right away' }),
   266	  T('tool_version', 'Show the installed version of a command-line tool', '{cmd} --version', { cmd: null }),
   267	  T('cli_help', 'Show the built-in help (--help) of a command', '{cmd} --help', { cmd: null }),
   268	
   269	  // ---------- Cloudflare wrangler ----------
   270	  T('wrangler_deploy', 'Deploy a Cloudflare Worker with wrangler', 'npx wrangler deploy', {}, 'medium'),
   271	  // npx prefers a project-local wrangler binary, so every npx wrangler command may run project code (and wrangler dev
   272	  // runs the configured build command): medium, like npm_run_script, never auto-run with --yes
   273	  T('wrangler_dev', 'Run a Cloudflare Worker locally (wrangler dev)', 'npx wrangler dev', {}, 'medium'),
   274	  T('wrangler_tail', 'Stream live logs of a deployed Cloudflare Worker', 'npx wrangler tail', {}, 'medium'),
   275	  T('wrangler_secret_put', 'Set a secret (environment variable) on a Cloudflare Worker', 'npx wrangler secret put {var!raw}',
   276	    { var: null }, 'medium', { notes: 'wrangler prompts for the value, so it never lands in shell history' }),
   277	  T('wrangler_login', 'Log in to Cloudflare with wrangler', 'npx wrangler login', {}, 'medium'),
   278	  T('wrangler_whoami', 'Show which Cloudflare account wrangler is logged in as', 'npx wrangler whoami', {}, 'medium'),
   279	
   280	  // ---------- GitHub CLI ----------
   281	  T('gh_auth_status', 'Show GitHub CLI login status', 'gh auth status', {}),
   282	  T('gh_auth_login', 'Log in to GitHub with the gh CLI', 'gh auth login', {}),
   283	  T('gh_pr_list', 'List pull requests of the repository', 'gh pr list', {}),
   284	  T('gh_pr_view', 'Show a pull request', 'gh pr view«{pr!raw}»«--repo {repo!raw}»', {}),
   285	  T('gh_pr_create', 'Create a pull request from the current branch', 'gh pr create --fill', {}, 'medium'),
   286	  T('gh_pr_checks', 'Show CI check status of a pull request', 'gh pr checks«{pr!raw}»«--repo {repo!raw}»', {}),
   287	  T('gh_pr_merge', 'Merge a pull request', 'gh pr merge«{pr!raw}»«--repo {repo!raw}»', {}, 'medium'),
   288	  T('gh_run_list', 'List recent GitHub Actions workflow runs', 'gh run list', {}),
?? review/r20-claude.md
?? review/r20-codex.md

exec
/bin/bash -lc "sed -n '303,328p' HYBRID.md; rg -n 'prun|vocab' HYBRID.md | tail -16; cat scripts/build_triggers.js | head -100" in /workspace/tellsh
 succeeded in 0ms:
  (336 shell-phrased), relexicalised `data/eval` for end-to-end exact commands (1326, held-out value pools, same seed as
  `scripts/eval.js`), `data/slots/gold` (208), `data/history/eval` (48), `data/ood_eval` (92).
* **New blind set** `data/hybrid/blind/` (681 rows: 331 EN, 310 PL, 40 OOD; bash/zsh/sh/PowerShell/fish/cmd with matching OS,
  Windows paths, typos, Polish without diacritics, slang, gold slot spans). Written by a separate agent that saw only
  the intent catalog (ids, descriptions, templates), **before any model result was looked at**; never used for training,
  calibration or any modelling decision. 59 of its texts turned out to also occur in A's training data (short generic
  queries such as "install htop"); B/C training drops them, and the "blind, novel texts only" rows (527) exclude every
  blind text that occurs in any training file.
* **Private real-history set** (`/workspace/tellsh-data`, not committed, aggregate numbers only): 6865 PL/EN paraphrases of
  real shell-history commands whose catalog intent was assigned by an LLM pipeline (labels not human-verified; many
  rows are short or literal command-like texts). Treat as a noisy robustness signal.
* **Calibration on training data only.** A 10% group-wise *dev split* of the training sentences (`export_data.js`, hash of
  the normalised text) is never used to fit B or C. Because the shipped A was trained on those sentences, a shadow
  **A_dev** (`scripts/hybrid/train_a_dev.sh`: identical pipeline minus the dev split) provides honest cascade scores on
  dev; tau / k / alpha / accept / none / keepNone are grid-searched there (objective: decision accuracy = correct intent,
  or rejection for out-of-domain) and the resulting policy is applied to the shipped A.
* *Disclosure:* the first calibration ignored OOD (only 48 of 2669 dev rows) and the first held-out run showed the
  rerankers answering almost every OOD request (A+B 47.8%, A+C 0% rejection on `data/ood_eval`). Two OOD safeguards were
  then added to the *procedure* (dev OOD rejection may not drop more than ~2 rows below A_dev's; option to keep A's
  rejection when stage 1 says `__none__`), plus the "safe" variants. No other change was informed by held-out results.
* **Rejections stay rejections.** A re-ranked rejection (B's pNone ≥ `none`, or pX below `accept`) sets the decision's
  top tool to `__none__`, so the pipeline's low-confidence flag composer never answers in its place (the evals here run
  with the composer off; `test/regressions13.test.js` covers the shipped path with it on).
* **C cost control:** C was scored (Python, same prompts/weights) on every row A would defer at tau <= 0.9 plus a 10%
  uniform sample (for "C alone"); calibration of A+C is restricted to tau <= 0.9. "C alone" rows are therefore smaller
  samples (n shown).
274:  otherwise a 6-layer, PL+EN-vocabulary-pruned multilingual-e5-small (26.7 MB int8 ONNX, ~3.5 ms on one core) re-ranks
292:| **B** | `intfloat/multilingual-e5-small`, vocabulary pruned to PL+EN pieces (250k -> 36k), bottom 6 of 12 layers, fine-tuned as joint tool (55) + intent (149) classifier + BIO slot tagger (37 labels); int8 ONNX | `onnxruntime-node` (or `-web`), own SentencePiece-Unigram tokenizer in JS (`src/rerank/tokenizer.js`, 12 364/12 364 sequences identical to HF) | 26.7 MB (21.7 MB .tgz) |
496:B bundle files: encoder.int8.onnx 26.7 MB, export_report.json 0.0 MB, labels.json 0.0 MB, manifest.json 0.0 MB, vocab.json 0.7 MB.
514:| B bundle (tellsh-model-enc): encoder.int8.onnx + vocab.json | 26.72 + 0.73 MB (21.7 MB .tgz) |
515:| B params: e5-small 117.6M -> PL+EN vocab 250002 -> 36357 pieces 35.6M -> 6 layers 25M | |
550:(smoke test) / 3.5 ms (bench). 4-bit weights shrink it to 16 MB but lose 2 points. Pruning the vocabulary to Polish+English pieces
604:python3 scripts/hybrid/prune_vocab.py                      # PL+EN vocabulary pruning of multilingual-e5-small
#!/usr/bin/env node
// Derive weak NL triggers for composer flags from tldr-pages flag descriptions (data/tldr/flags.jsonl,
// CC-BY-4.0). For every (head [sub], flag) in the composer vocabulary keep the stems that are most
// specific to that flag relative to the tool's other flags. Output: model/tldr_triggers.json (small).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { TOOLS } from '../src/compose.js';
import { foldKeepLength } from '../src/slots.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const src = `${ROOT}data/tldr/flags.jsonl`;
if (!existsSync(src)) { console.error('no data/tldr/flags.jsonl (run scripts/tldr_ingest.py)'); process.exit(1); }
const rows = readFileSync(src, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const STOP = new Set(('the a an of in on to for and or with by from all show list display given specific current ' +
  'file files directory directories using use into only each its their this that which when what are is be as ' +
  'dla oraz albo jest lub ktore ktory tylko wszystkie plik pliki katalog katalogu').split(' '));
const stems = (t) => foldKeepLength(t).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/)
  .filter((w) => w.length > 2 && !STOP.has(w)).map((w) => w.slice(0, 5));

const out = {};
for (const [tn, spec] of Object.entries(TOOLS)) {
  const variants = spec.sub ? Object.entries(spec.sub).map(([s, v]) => [`${spec.head} ${s}`, v.flags, s]) : [[spec.head, spec.flags, null]];
  for (const [key, flags, sub] of variants) {
    const mine = rows.filter((r) => r.head === spec.head && (sub ? r.sub === sub : true));
    const vocab = new Set(flags.map((f) => f.flag.split(' ')[0]));
    const byFlag = {};
    const total = {};
    for (const r of mine) {
      const f = r.flag;
      const long = r.long;
      const k = vocab.has(f) ? f : vocab.has(long) ? long : null;
      for (const s of new Set(stems(r.text))) {
        total[s] = (total[s] || 0) + 1;
        if (k) (byFlag[k] ??= {})[s] = (byFlag[k][s] || 0) + 1;
      }
    }
    const entry = {};
    for (const [flag, counts] of Object.entries(byFlag)) {
      const ranked = Object.entries(counts).map(([s, c]) => [s, c / total[s] * Math.log(1 + c)])
        .filter(([, sc]) => sc > 0.3).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([s]) => s);
      if (ranked.length) entry[flag] = ranked;
    }
    if (Object.keys(entry).length) out[key] = entry;
  }
}
writeFileSync(`${ROOT}model/tldr_triggers.json`, JSON.stringify(out));

// "explained" flags: triggers that fire on >= 5% of an intent's own training paraphrases are part of what that
// intent means ("hidden" for hidden_files, "kernel" for dmesg) and must not make the composer replace it.
const { triggeredFlags } = await import('../src/compose.js');
const { FAMILY_OF } = await import('../src/tools.js');
// read the FILTERED corpus written by gen_data.js (held-out collisions, eval-only values and teacher drops removed)
const trainFile = `${ROOT}build/train_rows.jsonl`;
if (!existsSync(trainFile)) { console.error('no build/train_rows.jsonl (run scripts/gen_data.js first)'); process.exit(1); }
const train = readFileSync(trainFile, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const counts = {};
const totals = {};
for (const r of train) {
  totals[r.intent] = (totals[r.intent] || 0) + 1;
  for (const f of new Set(triggeredFlags(r.text, FAMILY_OF[r.intent]))) ((counts[r.intent] ??= {})[f] = (counts[r.intent][f] || 0) + 1);
}
const explained = {};
for (const [intent, c] of Object.entries(counts)) {
  const fl = Object.entries(c).filter(([, n]) => n / totals[intent] >= 0.05).map(([f]) => f).sort();
  if (fl.length) explained[intent] = fl;
}
writeFileSync(`${ROOT}model/compose_explained.json`, JSON.stringify(explained));
console.log(`model/compose_explained.json: ${Object.keys(explained).length} intents, e.g. hidden_files=${JSON.stringify(explained.hidden_files)} dmesg=${JSON.stringify(explained.dmesg)}`);
console.log(`model/tldr_triggers.json: ${Object.keys(out).length} tools, ${Object.values(out).reduce((a, e) => a + Object.keys(e).length, 0)} flags`);
console.log(JSON.stringify(out.ls), JSON.stringify(out['git log']));

exec
/bin/bash -lc "sed -n '245,580p' src/danger.js" in /workspace/tellsh
 succeeded in 0ms:
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

codex
- **MAJOR — [src/catalog.js:270](/workspace/tellsh/src/catalog.js:270): Deployment constraints are silently discarded.** `suggest('do a dry run of wrangler deploy')` returns `npx wrangler deploy`, understood and complete. Likewise, `deploy worker to staging` loses its environment. Confirming these suggestions can publish to the default deployment target. Preserve these constraints or reject requests the template cannot represent.

- **MAJOR — [src/fill.js:103](/workspace/tellsh/src/fill.js:103): Unresolved PR descriptions default to the current branch’s PR.** Both `merge the pr with label urgent` and `merge the pull request with title fix login` produce bare `gh pr merge` with no missing slots. These qualifiers bypass `PR_QUALIFIED`, so `prSelector()` returns `null` instead of withholding the selector. This can merge an unrelated PR; return `<PR>` or reject unresolved descriptive selectors.

Reproduced both through the default pipeline without executing generated commands. Full-suite validation was limited by read-only fixture failures. No files changed.

VERDICT: REQUEST_CHANGES
tokens used
175,113
- **MAJOR — [src/catalog.js:270](/workspace/tellsh/src/catalog.js:270): Deployment constraints are silently discarded.** `suggest('do a dry run of wrangler deploy')` returns `npx wrangler deploy`, understood and complete. Likewise, `deploy worker to staging` loses its environment. Confirming these suggestions can publish to the default deployment target. Preserve these constraints or reject requests the template cannot represent.

- **MAJOR — [src/fill.js:103](/workspace/tellsh/src/fill.js:103): Unresolved PR descriptions default to the current branch’s PR.** Both `merge the pr with label urgent` and `merge the pull request with title fix login` produce bare `gh pr merge` with no missing slots. These qualifiers bypass `PR_QUALIFIED`, so `prSelector()` returns `null` instead of withholding the selector. This can merge an unrelated PR; return `<PR>` or reject unresolved descriptive selectors.

Reproduced both through the default pipeline without executing generated commands. Full-suite validation was limited by read-only fixture failures. No files changed.

VERDICT: REQUEST_CHANGES
