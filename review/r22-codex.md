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
session id: 01a12a31-db7a-7a82-aded-a48260694881
--------
user
Re-review of tellsh (git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD; runtime src/ bin/, training scripts). History refs are intentionally limited to 1 line back. Read-only. Findings with severity and file:line. End with exactly one line that is either VERDICT: APPROVE (no blocker/major) or VERDICT: REQUEST_CHANGES.
codex
I’ll review the diff, then trace the affected runtime and training paths for correctness. I’ll keep the review read-only and report actionable findings with severity and file locations.
exec
/bin/bash -lc "pwd && rg --files -g 'AGENTS.md' -g 'package.json' -g '*train*' -g '*test*' -g '*spec*' -g 'README*' -g '*requirements*' -g 'pyproject.toml' -g 'Cargo.toml' -g 'go.mod'" in /workspace/tellsh
 succeeded in 0ms:
/workspace/tellsh
scripts/hybrid/train_lm_gpu.py
scripts/hybrid/train_a_dev.sh
scripts/hybrid/train_encoder.py
scripts/train.py
package.json
hybrid/package/tellsh-model-enc/README.md
hybrid/package/tellsh-model-enc/package.json
test/slots.test.js
test/templates.test.js
README.md
test/regressions22.test.js
test/regressions6.test.js
test/regressions21.test.js
test/regressions14.test.js
test/regressions3-render.test.js
test/regressions20.test.js
test/regressions19.test.js
test/regressions9.test.js
test/regressions13.test.js
test/regressions18.test.js
test/regressions.test.js
test/regressions23.test.js
test/devtools.test.js
test/regressions5.test.js
test/parity.test.js
test/regressions16.test.js
test/shells.test.js
test/regressions7.test.js
test/hybrid.test.js
test/regressions3-history.test.js
test/regressions17.test.js
test/pipeline.test.js
test/danger.test.js
test/regressions2.test.js
test/regressions8.test.js
test/regressions15.test.js
test/regressions4.test.js
test/cli.test.js
test/regressions3.test.js
test/compose.test.js
test/regressions12.test.js
test/regressions10.test.js
test/regressions11.test.js
data/tldr/README.md
data/shell/train.jsonl

exec
/bin/bash -lc 'git status --short && git diff --stat 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD && git diff --name-status 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD' in /workspace/tellsh
 succeeded in 27ms:
?? review/r22-claude.md
?? review/r22-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   543 +-
 HYBRID.md                                    |   617 ++
 README.md                                    |   180 +-
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
 review/.f20done                              |     0
 review/.f21done                              |     0
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
 review/fix20-log.md                          |    27 +
 review/fix21-log.md                          |    26 +
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
 review/r20-claude.md                         |    64 +
 review/r20-codex.md                          | 10016 ++++++++++++++++++++++
 review/r21-claude.md                         |    55 +
 review/r21-codex.md                          |  8028 ++++++++++++++++++
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
 src/catalog.js                               |    40 +
 src/cli.js                                   |    48 +-
 src/compose.js                               |   180 +-
 src/danger.js                                |   491 +-
 src/fill.js                                  |   293 +-
 src/history.js                               |  1026 ++-
 src/model.js                                 |    22 +-
 src/pipeline.js                              |   475 +-
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
 test/regressions22.test.js                   |    98 +
 test/regressions23.test.js                   |   101 +
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
 232 files changed, 236267 insertions(+), 807 deletions(-)
M	.gitignore
M	EVAL.md
A	HYBRID.md
M	README.md
M	bin/tellsh.js
A	data/blind/compose.jsonl
A	data/blind/e2e.jsonl
A	data/blind/history.jsonl
A	data/blind/intents.jsonl
A	data/blind/ood.jsonl
A	data/candidates/ood_new.jsonl
A	data/candidates/paraA.jsonl
A	data/candidates/paraB.jsonl
A	data/eval_baseline_v0.2.json
A	data/eval_v04/devtools.jsonl
M	data/history/eval.jsonl
A	data/hybrid/blind/blind_en.jsonl
A	data/hybrid/blind/blind_ood.jsonl
A	data/hybrid/blind/blind_pl.jsonl
A	data/intents/g06_teacher.jsonl
A	data/intents/g07_hardneg.jsonl
A	data/intents/g08_devtools.jsonl
A	data/ood_teacher.jsonl
M	data/teacher/decisions.jsonl
A	data/teacher/hardneg_boost.jsonl
A	data/teacher/hardneg_rejected.jsonl
A	data/teacher/hardneg_summary.json
A	data/teacher/label_rejected.jsonl
A	data/teacher/label_summary.json
A	data/teacher/ledger.json
A	data/teacher/ood_rejected.jsonl
M	data/teacher/review.jsonl
A	data/teacher/verify_summary.json
A	hybrid/package/tellsh-model-enc/README.md
A	hybrid/package/tellsh-model-enc/package.json
A	hybrid/results/bench.json
A	hybrid/results/enc_export_report.json
A	hybrid/results/policy.json
A	hybrid/results/policy_ft.json
A	hybrid/results/prune_report.json
A	hybrid/results/quant.json
A	hybrid/results/results.json
A	hybrid/results/results_ft.json
A	hybrid/results/sizes.json
A	hybrid/results/v04_after.json
A	hybrid/results/v04_after_ft.json
A	hybrid/results/v04_before.json
A	hybrid/results/v04_before_ft.json
A	hybrid/results/v04_bench_after.json
A	hybrid/results/v04_bench_after_real.json
A	hybrid/results/v04_bench_before.json
A	hybrid/results/v04_bench_before_real.json
A	hybrid/results/v04_enc_export_report.json
A	hybrid/results/v04_policy.json
A	hybrid/results/v04_policy_ft.json
A	hybrid/results/v04_real_stats.json
A	hybrid/results/zeroshot.jsonl
M	model/compose_explained.json
M	model/model.bin
M	package.json
A	review/.f10done
A	review/.f11done
A	review/.f12done
A	review/.f13done
A	review/.f14done
A	review/.f15done
A	review/.f16done
A	review/.f17done
A	review/.f18done
A	review/.f19done
A	review/.f1done
A	review/.f20done
A	review/.f21done
A	review/.f4bdone
A	review/.f5done
A	review/.f8done
A	review/.f9done
A	review/.h1done
A	review/.hdone
A	review/.r1done
A	review/.r2done
A	review/.r3done
A	review/.r4done
A	review/.r5done
A	review/.r6done
A	review/STATUS
A	review/fix1-log.md
A	review/fix10-log.md
A	review/fix11-log.md
A	review/fix12-log.md
A	review/fix13-log.md
A	review/fix14-log.md
A	review/fix15-log.md
A	review/fix16-log.md
A	review/fix17-log.md
A	review/fix18-log.md
A	review/fix19-log.md
A	review/fix2-log.md
A	review/fix20-log.md
A	review/fix21-log.md
A	review/fix3-log.md
A	review/fix4-log.md
A	review/fix4b-log.md
A	review/fix5-log.md
A	review/fix7-log.md
A	review/fix8-log.md
A	review/fix9-log.md
A	review/hybrid-log.md
A	review/r1-claude.md
A	review/r1-codex.md
A	review/r10-claude.md
A	review/r10-codex.md
A	review/r11-claude.md
A	review/r11-codex.md
A	review/r12-claude.md
A	review/r12-codex.md
A	review/r13-claude.md
A	review/r13-codex.md
A	review/r14-claude.md
A	review/r14-codex.md
A	review/r15-claude.md
A	review/r15-codex.md
A	review/r16-claude.md
A	review/r16-codex.md
A	review/r17-claude.md
A	review/r17-codex.md
A	review/r18-claude.md
A	review/r18-codex.md
A	review/r19-claude.md
A	review/r19-codex.md
A	review/r2-claude.md
A	review/r2-codex.md
A	review/r20-claude.md
A	review/r20-codex.md
A	review/r21-claude.md
A	review/r21-codex.md
A	review/r3-claude.md
A	review/r3-codex.md
A	review/r4-claude.md
A	review/r4-codex.md
A	review/r5-claude.md
A	review/r5-codex.md
A	review/r6-claude.md
A	review/r6-codex.md
A	review/r7-claude.md
A	review/r7-codex.md
A	review/r8-claude.md
A	review/r8-codex.md
A	review/r9-claude.md
A	review/r9-codex.md
M	scripts/bench.js
M	scripts/build_triggers.js
M	scripts/check_variants.js
A	scripts/compare.js
M	scripts/eval.js
M	scripts/gen_data.js
A	scripts/hybrid/bench_hybrid.js
A	scripts/hybrid/cold_query.js
A	scripts/hybrid/dump_cascade.js
A	scripts/hybrid/eval_hybrid.js
A	scripts/hybrid/export_data.js
A	scripts/hybrid/export_encoder.py
A	scripts/hybrid/fetch_model.js
A	scripts/hybrid/lm_rerank.py
A	scripts/hybrid/prune_vocab.py
A	scripts/hybrid/report_hybrid.js
A	scripts/hybrid/sets.js
A	scripts/hybrid/train_a_dev.sh
A	scripts/hybrid/train_encoder.py
A	scripts/hybrid/train_lm_gpu.py
M	scripts/lib/cmdnorm.js
A	scripts/lib/confusable.js
A	scripts/lib/heldout.js
A	scripts/lib/jev.js
M	scripts/lib/silver.js
A	scripts/real/group.js
A	scripts/real/group_leak.js
A	scripts/real/prepare_real.js
A	scripts/real/real_rows.js
A	scripts/real/report_v04.js
M	scripts/report.js
M	scripts/teacher.js
M	scripts/tldr_ingest.py
M	scripts/train.py
M	src/catalog.js
M	src/cli.js
M	src/compose.js
M	src/danger.js
M	src/fill.js
M	src/history.js
M	src/model.js
M	src/pipeline.js
M	src/render.js
A	src/rerank/encoder.js
A	src/rerank/hybrid.js
A	src/rerank/tokenizer.js
M	src/shellwords.js
M	src/slots.js
M	src/tagger.js
M	src/tools.js
M	src/variants.js
A	test/compose.test.js
A	test/devtools.test.js
M	test/fixtures/parity.json
A	test/hybrid.test.js
M	test/pipeline.test.js
M	test/regressions.test.js
A	test/regressions10.test.js
A	test/regressions11.test.js
A	test/regressions12.test.js
A	test/regressions13.test.js
A	test/regressions14.test.js
A	test/regressions15.test.js
A	test/regressions16.test.js
A	test/regressions17.test.js
A	test/regressions18.test.js
A	test/regressions19.test.js
A	test/regressions2.test.js
A	test/regressions20.test.js
A	test/regressions21.test.js
A	test/regressions22.test.js
A	test/regressions23.test.js
A	test/regressions3-history.test.js
A	test/regressions3-render.test.js
A	test/regressions3.test.js
A	test/regressions4.test.js
A	test/regressions5.test.js
A	test/regressions6.test.js
A	test/regressions7.test.js
A	test/regressions8.test.js
A	test/regressions9.test.js
M	test/shells.test.js

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/pipeline.js src/cli.js bin/tellsh.js src/model.js' in /workspace/tellsh
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
diff --git a/src/pipeline.js b/src/pipeline.js
index c5430f7..6fea6da 100644
--- a/src/pipeline.js
+++ b/src/pipeline.js
@@ -9,13 +9,15 @@
 import { getModel } from './model.js';
 import { cascade } from './cascade.js';
 import { tag, exFromSpans } from './tagger.js';
-import { extractSlots, pickArg } from './slots.js';
+import { extractSlots, pickArg, isOptionWord, foldKeepLength } from './slots.js';
 import { resolveSlots, buildCommand, finalizeSlots, RAW_OK } from './fill.js';
 import { BY_ID } from './catalog.js';
 import { FAMILY_OF, NONE } from './tools.js';
 import { detectEnv, envFeatures } from './env.js';
-import { buildContext, resolveReference, hasPronoun, cwdFlags, sameBut, entityForSlot, isAmbiguous } from './history.js';
+import { buildContext, resolveReference, hasPronoun, hasLocative, cwdFlags, sameBut, entityForSlot, isAmbiguous } from './history.js';
+import { AMB } from './shellwords.js';
 import { compose } from './compose.js';
+import { checkDanger } from './danger.js';
 import { readFileSync } from 'node:fs';
 
 let EXPLAINED = null;
@@ -32,17 +34,79 @@ const PRONOUN_VALUE = /^(it|its|that|this|them|those|one|again|back|there|here|t
 
 // Non-path values must never start with `-` (they would become options: `ssh -oProxyCommand=…`,
 // `curl -o/path`); paths get a ./ prefix at render time instead.
+const FUNCTION_WORD = /^(?:the|a|an|of|for|to|in|on|at|by|with|from|into|onto|up|out|it|its|this|that|these|those|and|or|then|is|my|me|your|there|same|inside|w|we|z|ze|na|do|od|dla|o|i|oraz|jest|mi|moim|tym|ten|ta|to|tej|tam|stamtąd|stamtad|tamże|tamze|samym|samego)$/i;
+// "folder out" / "plik w": a word that is normally a function word names the item when it directly follows the
+// noun and ends the request (or is followed by a word that cannot start a location: "folder out sorted by size")
+const NAME_NOUN = { path: String.raw`folder|directory|dir|katalog\w*|podkatalog\w*`, file: String.raw`file|plik\w*` };
+const NAME_NEXT = /^(?:sorted|sort|sorting|recursively|recursive|please|now|force|forcibly|forcefully|posortowan\w*|rekurencyjnie|prosze|teraz)$/i;
+function namedStopWord(text, k) {
+  const m = String(text).match(new RegExp(String.raw`(?:^|\s)(?:${NAME_NOUN[k]})\s+(\S+)(?:\s+(\S+))?`, 'i'));
+  if (!m || !FUNCTION_WORD.test(m[1]) || (m[2] != null && !NAME_NEXT.test(m[2]))) return null;
+  if (m[2] == null && m.index + m[0].length !== String(text).trimEnd().length) return null;
+  return m[1];
+}
+// "list files in the", "list files in out", "pokaż pliki w": the request names a location but its object is only
+// function words. The path is withheld (placeholder), never silently replaced by the catalog default `.`.
+const LOC_WORD = /^(?:in|inside|within|under|of|from|at|on|into|w|we|z|ze|na|do|od|pod|dla)$/i;
+const LOC_NOUN = /^(?:folder\w*|directory|directories|dir|dirs|katalog\w*|podkatalog\w*|files?|plik\w*)$/i;
+function danglingLocation(text) {
+  const words = String(text).trim().replace(/[?!.,;:]+$/, '').split(/\s+/).filter(Boolean);
+  while (words.length && NAME_NEXT.test(words[words.length - 1])) words.pop();
+  const last = words.length - 1;
+  if (last < 1 || !FUNCTION_WORD.test(words[last])) return false;
+  if (LOC_WORD.test(words[last])) return true;
+  for (let j = last - 1; j >= 0; j--) {
+    if (LOC_WORD.test(words[j])) return true;
+    if (!FUNCTION_WORD.test(words[j]) && !LOC_NOUN.test(words[j])) return false;
+  }
+  return false;
+}
+// a reference in destination position: "to it", "into that folder", "do niego", "there"
+const REF_DST = /(?:^|\s)(?:to|into|onto|inside|in|do|na|w|we|pod)\s+(?:(?:the|that|this|those|these|same|ten|ta|tego|tamtego|tym|tamtym|tamten)\s+)?(?:(?:folder\w*|directory|dir|katalog\w*|location|place|miejsc\w*)(?=\s|$|[?!.,])|(?:it|that|this|them|there|tego|niego|nim|tym|tam|tamtego|tamten)(?=\s|$|[?!.,]))|(?:^|\s)(?:there|tam)(?=\s|$|[?!.,])/;
+/** `v` appears in `text` right after a destination word ("to /tmp/old", "into backup", "do /tmp/old"). */
+function afterDestWord(text, v) {
+  const t = foldKeepLength(String(text)).toLowerCase();
+  const fv = foldKeepLength(v).toLowerCase();
+  for (let i = t.indexOf(fv); i >= 0; i = t.indexOf(fv, i + 1)) {
+    if (/(?:^|\s)(?:to|into|onto|in|inside|do|na|w|we|pod|->|=>)\s+(?:the\s+|a\s+)?(?:(?:folder|directory|dir|katalog\w*|folderu|location)\s+)?["'“„]?$/.test(t.slice(0, i))) return true;
+  }
+  return false;
+}
 const WORDISH = (v) => /^(?!-)[\w@.:+-]{1,64}$/.test(v);
 const VALID_SLOT = {
-  path: (v) => typeof v === 'string' && v.length < 256 && !/[\n\0\u0001]/.test(v) && /[\w~./]/.test(v),
-  name: WORDISH, service: WORDISH, container: WORDISH, pkg: WORDISH, cmd: WORDISH,
+  // a bare function word ("on", "the", "w") is a tagging error, never a file or directory to act on
+  path: (v) => typeof v === 'string' && v.length < 256 && !/[\n\0\u0001]/.test(v) && /[\w~./]/.test(v) && !FUNCTION_WORD.test(v),
+  name: WORDISH, service: WORDISH, container: WORDISH, cmd: WORDISH,
+  // npm scoped packages (`@types/node`, `@scope/pkg@1.2`) have one slash after the scope
+  // pip requirements with a version constraint (`requests==2.32.0`, `django>=4,<5`, `uvicorn[standard]~=0.30`) or extras alone
+  // (`requests[socks]`)
+  pkg: (v) => WORDISH(v) || /^@[\w.-]{1,64}\/[\w.-]{1,64}(?:@[\w.^~<>=*-]{1,32})?$/.test(v) ||
+    /^[A-Za-z][\w.-]{0,63}(?:\[[\w.,-]{1,64}\])?(?:(?:===?|[<>!~]=|[<>])[\w.*+!-]{1,32})(?:,(?:===?|[<>!~]=|[<>])[\w.*+!-]{1,32}){0,3}$/.test(v) ||
+    /^[A-Za-z][\w.-]{0,63}@[\^~]?[\w.*-]{1,32}$/.test(v) || /^[A-Za-z][\w.-]{0,63}\[[\w.,-]{1,64}\]$/.test(v),
   branch: (v) => /^(?!-)[\w./-]{1,100}$/.test(v), user: (v) => /^[a-z_][\w.-]{0,31}$/i.test(v),
   glob: (v) => /^\*\.[\w]{1,8}$/.test(v),
   url: (v) => v.length < 2048 && (/^(?:https?|ftp|ftps|ssh|git|file):\/\/[^\s/?#]*[^\s]*$/i.test(v) || /^(?!-)[\w.-]+@[\w.-]+:[^\s]+$/.test(v)),
+  pr: (v) => RAW_OK.pr(v), repo: (v) => RAW_OK.repo(v), wenv: (v) => RAW_OK.wenv(v), dryrun: (v) => RAW_OK.dryrun(v),
   host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
   pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
+  old: (v) => v.length > 0 && v.length < 300 && !/[\n\r\0]/.test(v), new: (v) => v.length < 300 && !/[\n\r\0]/.test(v),
 };
-for (const k of ['file', 'src', 'dst', 'dest', 'archive']) VALID_SLOT[k] = VALID_SLOT.path;
+const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
+// "that pr", "this pull request", "the same pr", Polish "zmerguj to pr": a pull request named by reference (English "merge
+// changes to pr" is not one)
+const PR_REFERENCE = /\b(?:that|this|its|the\s+same|the\s+previous|the\s+last|ten|tego|tamten)\s+(?:\w+\s+)?(?:prs?|pull[\s-]+requests?)\b|(?:^\s*|(?:^|\s)(?:zmerguj|scal|poka[zż]|zobacz|otw[oó]rz|zamknij|sprawd[zź]|wy[sś]wietl|zatwierd[zź]|zaakceptuj|przejrzyj)\S*\s+)to\s+(?:prs?|pull[\s-]+requests?)\b/i;
+// "the other pr", "the latest pr", "my last pull request", "the most recent pr": a pull request picked out among several, which
+// neither the current branch's pull request nor the one of the previous command is (withheld, also with history)
+const PR_PICKED = /\b(?:(?:the|a|an|my|our|your|his|her|their|some|any)\s+)?(?:other|another|latest|newest|most\s+recent|recent|oldest|older|newer|earlier|next|first|second|third|new|old|pending|approved|remaining|(?:(?:my|our|your|his|her|their)\s+)(?:last|previous|prior)|inn[yaeoy]\w*|ostatni\w*|najnowsz\w*|poprzedni\w*|kolejn\w*|nastepn\w*|następn\w*|starsz\w*)\s+(?:(?:open|opened|draft|merged|github)\s+)?(?:prs?|pull[\s-]+requests?)\b/i;
+const PR_CLOSE = /(?:^|[\s,;])(?:close|closing|shut|reject|decline|abandon|cancel|zamkn\S*)(?=[\s.,!?;:]|$)/i;
+// "merge and close pr 45": a merge the request asks for; "close pr 45 without merge", "do not merge pr 45", "unmerge pr 45":
+// one it does not (a negation within the two words before it, or a prefix that undoes it)
+const MERGE_WORD = /(?:^|[^\w-])((?:un|de)?merg\w*|(?:roz)?scal\w*)/gi;
+const MERGE_NEGATION = /(?:\b(?:not|no|never|without|nor|instead\s+of|rather\s+than|nie|bez)|n't|\bdont|\bundo(?:\s+the)?|\brevert(?:\s+the)?|\bcofnij)\s+(?:\S+\s+){0,2}$/i;
+const mergeAsked = (q) => [...String(q).matchAll(MERGE_WORD)].some((m) => !/^(?:un|de|roz)/i.test(m[1]) && !MERGE_NEGATION.test(q.slice(0, m.index + m[0].length - m[1].length)));
+// slots naming the one thing a command acts on, other than a path (not free text: pattern, message, glob, ...)
+const OPERAND_SLOT_NAMES = new Set(['name', 'service', 'container', 'pkg', 'host', 'target', 'branch', 'user', 'script', 'url', 'pid']);
+for (const k of PATH_SLOT_NAMES) if (k !== 'path') VALID_SLOT[k] = VALID_SLOT.path;
 export function validSlot(k, v) {
   if (v == null || v === '') return false;
   if (isAmbiguous(v)) return false;
@@ -52,31 +116,108 @@ export function validSlot(k, v) {
 }
 /** Values recovered from history go through the same validation as classifier/regex values. */
 const validHistorySlots = (slots) => Object.fromEntries(Object.entries(slots || {}).filter(([k, v]) => ['namepat', 'sedexpr'].includes(k) || validSlot(k, v)));
+/** History slots that failed validation (too long, a newline, ...): withheld as placeholders, never the catalog default. */
+const invalidHistorySlots = (slots) => Object.keys(slots || {}).filter((k) => !['namepat', 'sedexpr'].includes(k) && slots[k] != null && !validSlot(k, slots[k]));
 
 /**
  * Slot resolution: tagger is primary, regex is fallback + validator.
  * -> { slots, sources: {slot: 'tagger'|'regex'}, spans }
  */
-export function resolveWithTagger(intentId, text, { model = getModel(), tool, mode = 'merge' } = {}) {
+export function resolveWithTagger(intentId, text, { model = getModel(), tool, mode = 'merge', tagger } = {}) {
   const intent = BY_ID[intentId];
   const exR = extractSlots(text);
   const rR = resolveSlots(intent, exR);
   if (mode === 'regex') return { slots: rR, sources: Object.fromEntries(Object.keys(rR).map((k) => [k, 'regex'])), spans: [] };
-  const t = tag(text, tool || FAMILY_OF[intentId], model);
+  // tagger: optional external slot tagger (hybrid encoder, src/rerank/) -> { spans }
+  const t = tagger ? tagger(text, tool || FAMILY_OF[intentId]) : tag(text, tool || FAMILY_OF[intentId], model);
   const exT = exFromSpans(text, t.spans);
   const rT = resolveSlots(intent, exT);
   if (rT.archive && !exT.paths.includes(rT.archive)) delete rT.archive; // derived default, not a tagged value
   if (mode === 'tagger') return { slots: rT, sources: Object.fromEntries(Object.keys(rT).map((k) => [k, 'tagger'])), spans: t.spans };
   const slots = {};
   const sources = {};
+  // a regex path that is only part of a tagged path word the tagger could not represent exactly
+  // (or a named location inside it) must not stand in for it: the slot stays empty (placeholder)
+  const partOfRejected = (v) => exT.rejectedPaths?.some((ch) => exR.spans.some((s) => s.type === 'PATH' && s.value === v && s.start < ch.end && ch.start < s.end && text.slice(s.start, s.end) !== ch.text));
   for (const k of new Set([...Object.keys(rT), ...Object.keys(rR)])) {
     if (k === 'namepat' || k === 'sedexpr') continue; // derived, recomputed below
-    if (validSlot(k, rT[k])) { slots[k] = rT[k]; sources[k] = 'tagger'; } else if (rR[k] != null && (validSlot(k, rR[k]) || !VALID_SLOT[k])) { slots[k] = rR[k]; sources[k] = 'regex'; }
+    if (validSlot(k, rT[k])) { slots[k] = rT[k]; sources[k] = 'tagger'; } else if (rR[k] != null && (validSlot(k, rR[k]) || !VALID_SLOT[k]) && !(PATH_SLOT_NAMES.has(k) && partOfRejected(rR[k]))) { slots[k] = rR[k]; sources[k] = 'regex'; }
+  }
+  // "delete the folder out", "du of folder out sorted by size": a stop word right after the noun is its name
+  for (const k of ['path', 'file']) {
+    if (!usesSlot(intent, k) || slots[k] != null) continue;
+    const v = namedStopWord(text, k);
+    if (v != null) { slots[k] = v; sources[k] = 'regex'; }
+    break;
+  }
+  // a path the tagger or regex read but that was rejected (a bare function word: "in the", "of it"; a name with a
+  // newline; part of a path the tagger could not represent), a location whose object is only function words, or a
+  // place named only by reference ("there", "tam", "in the same folder"): withheld, so the command shows a
+  // placeholder instead of the default `.`
+  // with a place reference the location is "there", never a word the request names ("remove the logs in there")
+  if (hasLocative(text) && slots.path != null && usesSlot(intent, 'path') && !usesSlot(intent, 'dst')) { delete slots.path; delete sources.path; }
+  const withheld = [];
+  for (const k of ['path', 'file']) {
+    if (!usesSlot(intent, k) || slots[k] != null) continue;
+    const rejected = [rT[k], rR[k]].some((v) => typeof v === 'string' && v !== '' && !validSlot(k, v)) || exT.rejectedPaths?.length > 0;
+    if (rejected || danglingLocation(text) || hasLocative(text)) withheld.push(k);
+    break;
+  }
+  // an operand the request names but that is not a valid value (`npm install @types/node;rm`): placeholder, never
+  // silently dropped from an optional part of the template (`npm install`)
+  const invalidOperands = [];
+  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr', 'repo', 'wenv']) {
+    if (!usesSlot(intent, k) || slots[k] != null || withheld.includes(k)) continue;
+    if ([rT[k], rR[k]].some((v) => typeof v === 'string' && v !== '' && !validSlot(k, v))) { withheld.push(k); invalidOperands.push(k); }
   }
   finalizeSlots(intent, slots);
-  return { slots, sources, spans: t.spans };
+  return { slots, sources, spans: t.spans, withheld, invalidOperands };
+}
+
+/** Explicit paths the request names (`/tmp/x`, `~/a`, `./b`, `"C:\\x"`, quoted names with a slash), in order, distinct. */
+function explicitPaths(text) {
+  const ex = extractSlots(text);
+  return (ex.pathsWithQuoted || []).filter((p) => typeof p === 'string' && !/[*?]/.test(p) && !/^\w+:\/\//.test(p) &&
+    (/^(?:~|\.{0,2}\/|[A-Za-z]:[\\/])/.test(p) || (ex.quoted.includes(p) && /[\\/]/.test(p))));
 }
 
+/** Every occurrence of `v` in `text` is inside backticks or `$(…)`: the value is the output of a command, not a name. */
+function insideSubstitution(text, v) {
+  if (!v) return false;
+  let found = false;
+  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) {
+    found = true;
+    const before = text.slice(0, i);
+    const ticks = (before.match(/`/g) || []).length % 2 === 1;
+    const open = before.lastIndexOf('$(');
+    const paren = open >= 0 && !before.slice(open).includes(')');
+    if (!ticks && !paren) return false;
+  }
+  return found;
+}
+
+/** `v` occurs in `text` only directly followed by punctuation that trimPathPunct removed (`/tmp/x!`). */
+function trailingPunctAfter(text, v) {
+  const at = [];
+  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) at.push(text.slice(i + v.length));
+  return at.length > 0 && at.every((after) => /^[.,;:!?)]+(?=\s|$)/.test(after));
+}
+
+/**
+ * `v` was read from a quoted string of the request that ends in a backslash while the same quote
+ * character appears again later (`"a\" -e evil"`): the user may have meant \" as an escaped quote,
+ * so where the text ends is unclear.
+ */
+function cutAtEscapedQuote(text, v) {
+  if (typeof v !== 'string' || !v.endsWith('\\')) return false;
+  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) {
+    const after = text.slice(i + v.length);
+    if (/^["'”`]/.test(after) && after.slice(1).includes(after[0] === '”' ? '"' : after[0])) return true;
+  }
+  return false;
+}
+const TEXT_SLOT_NAMES = ['pattern', 'message', 'text', 'name', 'old', 'new', 'service', 'container', 'pkg', 'cmd', 'branch', 'user'];
+
 const usesSlot = (intent, k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
 
 function flagTokens(cmd) {
@@ -90,22 +231,35 @@ function flagTokens(cmd) {
 }
 
 /** Second pass input: paths, numbers, ... from the merged extraction for the composer. */
-function composeInput(text, model, tool) {
+function composeInput(text, model, tool, unclear = []) {
   const ex = extractSlots(text);
   const t = tag(text, tool, model);
   const exT = exFromSpans(text, t.spans);
   const merged = { ...ex };
   if (exT.paths.length) merged.paths = exT.paths;
+  // paths followed by sentence punctuation (`/tmp/data!`): fine for a read-only command, but a composed
+  // command that changes something is never aimed at them (see blocksAmbiguous)
+  // the same for a path that is the output of a command (`on \`pwd\``, `$(pwd)`): the catalog withholds it too
+  // and a quoted argument that may be words of the request (joinArgs)
+  const amb = [...(merged.paths || []).filter((p) => trailingPunctAfter(text, p) || insideSubstitution(text, String(p))), ...unclear];
   for (const k of ['count', 'size', 'duration', 'ext', 'mode']) if (exT[k] != null) merged[k] = exT[k];
-  const pattern = () => exT.tagged.PATTERN?.[0] ?? ex.quoted[0] ?? pickArg('pattern', ex) ?? null;
+  const pattern = () => { const p = exT.tagged.PATTERN?.find((x) => !isOptionWord(x)) ?? ex.quoted[0] ?? pickArg('pattern', ex) ?? null; return cutAtEscapedQuote(text, p) ? null : p; };
   const nameOf = (type) => exT.tagged[type]?.[0] ?? null;
-  return { ex: merged, pattern, nameOf };
+  return { ex: merged, pattern, nameOf, ambiguousPaths: amb };
 }
+/**
+ * A composed command that changes something and uses a path whose end is unclear (`chmod -R 777 /tmp/data!`).
+ * Composed commands always carry at least medium risk, so "changes something" is: a writing tool (chmod,
+ * tar) or anything the danger checker flags on its own (find -delete, git/docker subcommands, ...).
+ */
+const WRITING_TOOLS = new Set(['chmod', 'tar']);
+const blocksAmbiguous = (comp, amb) => !!comp && !comp.invalid && amb.some((p) => comp.command.includes(p)) &&
+  (WRITING_TOOLS.has(comp.tool) || checkDanger(comp.command, 'safe').risk !== 'safe');
 
 /**
  * Pure function used by the CLI, eval and tests.
  * opts: { shell, os, env, history: string[] (commands, oldest first), cwd, threshold, top, compose: 'auto'|'force'|'off',
- *         slotMode: 'merge'|'tagger'|'regex', model }
+ *         slotMode: 'merge'|'tagger'|'regex', model, rerank, rerankTop (candidates the rerank hook sees; default top) }
  */
 export function suggest(query, opts = {}) {
   const model = opts.model || getModel();
@@ -113,17 +267,26 @@ export function suggest(query, opts = {}) {
   const top = opts.top ?? 3;
   const thr = opts.threshold ?? model.thresholds.accept;
   const composeMode = opts.compose || 'auto';
+  // a NUL byte cannot be part of any command argument (and marks ambiguous values internally)
+  if (/\0/.test(String(query))) {
+    return { query, shell: env.shell, os: env.os, coreutils: env.coreutils, threshold: thr, context: { used: false }, understood: false, method: 'none',
+      confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: 'the request contains a NUL byte' };
+  }
 
   // ---- context (history + cwd), in memory only ----
   let ctx = null;
   if (opts.history?.length) {
-    const quick = (q) => {
-      const c = cascade(q, { model, extras: envFeatures(env) });
-      if (c.confidence < thr) return null;
-      return { intent: c.intent, slots: resolveWithTagger(c.intent, q, { model, tool: c.tool }).slots };
+    // an earlier `tellsh <query>`: what that request produced on its own (no history, no composer). Slots it left as
+    // placeholders (refused, ambiguous, rejected) are ambiguous values here, never the catalog default or a guess.
+    const quick = (q, unclearArgs) => {
+      const r = suggest(q, { model, env, threshold: thr, compose: 'off', unclearArgs });
+      if (!r.understood || !r.intent || r.method !== 'catalog') return null;
+      const slots = { ...(r.slots || {}) };
+      for (const k of r.missing || []) slots[k] = AMB + `<${k}>`;
+      return { intent: r.intent, slots };
     };
     const kind = opts.historyKind || opts.history.kind || (env.shell === 'powershell' ? 'pwsh' : 'posix');
-    ctx = buildContext(opts.history, { classify: quick, cwd: opts.cwd, kind });
+    ctx = buildContext(opts.history, { classify: quick, cwd: opts.cwd, kind, query });
   }
   const ctxFeats = ctx ? ctx.features : (opts.cwd ? cwdFlags(opts.cwd).map((c) => 'ctx_cwd=' + c) : []);
   const extras = [...envFeatures(env), ...ctxFeats];
@@ -134,29 +297,68 @@ export function suggest(query, opts = {}) {
 
   // ---- rule: "same for X" reuses the previous intent with one slot replaced ----
   if (ref?.rule === 'same-for') {
-    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], validHistorySlots(ref.slots)) });
-    return { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
+    const slots = validHistorySlots(ref.slots);
+    // a value that fails validation (a 300-character path, ...) is a placeholder, never `find .`
+    const blank = invalidHistorySlots(ref.slots);
+    // the new path ends in sentence punctuation (`same for /tmp/data!`): placeholder, as for any request
+    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null && BY_ID[ref.intent].risk !== 'safe' && trailingPunctAfter(query, slots[ref.changed])) {
+      blank.push(ref.changed);
+      delete slots[ref.changed];
+    }
+    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank, keepOptional: blank });
+    const res = { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
+    const punct = blank.filter((k) => !invalidHistorySlots(ref.slots).includes(k));
+    if (punct.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${punct.join(', ')}); quote the path`];
+    if (punct.length < blank.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: it is not a valid value (${blank.filter((k) => !punct.includes(k)).join(', ')})`];
+    return res;
+  }
+  // ---- the reference cannot be resolved at all ("what about this", an older command to replay) ----
+  if (ref?.rule === 'refused' && ref.stop) {
+    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: ref.note };
   }
 
   const sb = ctx && !ref ? sameBut(query, ctx) : null;
-  const c = cascade(query, { model, extras, top, restrictTool: sb ? FAMILY_OF[sb.lastIntent] : undefined });
-  const candidates = c.top.map((t) => ({ intent: t.intent, tool: t.tool, p: +t.p.toFixed(4), description: BY_ID[t.intent]?.description }));
+  // a request about the entries of the referenced directory does not use the history at all: its intent is read
+  // without the history features (they favour `delete_dir` for "delete log files in this folder")
+  // rerankTop: the re-ranker's own candidate count (A+B uses 5); independent of how many candidates are displayed
+  const c0 = cascade(query, { model, extras: ref?.contents ? envFeatures(env) : extras, top: Math.max(top, opts.rerankTop || 0), restrictTool: sb ? FAMILY_OF[sb.lastIntent] : undefined });
+  // rerank: optional hybrid hook (src/rerank/hybrid.js); history rules keep the linear cascade's decision
+  const c = opts.rerank && !sb && !ref ? opts.rerank(c0, { thr }) : c0;
+  const candidates = c.top.slice(0, Math.max(1, top)).map((t) => ({ intent: t.intent, tool: t.tool, p: +t.p.toFixed(4), description: BY_ID[t.intent]?.description }));
   const tools = c.tools.map((t) => ({ tool: t.tool, p: +t.p.toFixed(4) }));
   let intent = c.intent;
   let confidence = c.confidence;
   let method = 'catalog';
   if ((ref?.rule === 'pronoun' || ref?.rule === 'refused') && ref.intent) { intent = ref.intent; method = 'history-rule'; confidence = Math.max(confidence, thr); }
   if (sb) { method = 'history-rule'; confidence = Math.max(confidence, thr); context.rule = 'same-but'; context.note = `modifies previous ${sb.lastIntent}`; }
+  // "same but force" after `rm -r old; ls newdir`: the command it would modify is not the previous one
+  if (sb?.skipped && (BY_ID[sb.lastIntent].risk !== 'safe' || BY_ID[intent].risk !== 'safe')) {
+    context.rule = 'refused';
+    context.note = `the newest command that tellsh can modify (${sb.lastIntent}) is not the previous command; not guessing`;
+    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
+  }
+  // "same for api" after `docker --context prod logs web`: repeated here it would run against the default daemon
+  if (sb?.scoped) {
+    context.rule = 'refused';
+    context.note = `the previous command (${sb.lastIntent}) ran against another repository, directory or daemon (-C, --context, -H, ...); not guessing`;
+    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
+  }
   const out = { ...base, confidence: +confidence.toFixed(4), tool: FAMILY_OF[intent] || c.tool, tools, candidates };
 
   const tryCompose = (reason) => {
     if (composeMode === 'off') return null;
-    if (env.shell === 'powershell' || env.shell === 'cmd') return null; // composer vocabulary is POSIX-only
+    // a place reference ("list files there", "tam") has no composer operand: never `find .` in its place
+    if (hasLocative(query) && composeMode !== 'force') return null;
+    // composer vocabulary and quoting are POSIX-only (fish treats \\ and \' as escapes inside single quotes)
+    if (env.shell === 'powershell' || env.shell === 'cmd' || env.shell === 'fish') return null;
     const capable = c.tools.filter((t) => t.tool !== NONE);
     if (c.topTool === NONE && composeMode !== 'force') return null;
-    const ci = composeInput(query, model, capable[0]?.tool);
+    const ci = composeInput(query, model, capable[0]?.tool, opts.unclearArgs);
     const r = compose(query, capable, ci.ex, { patternOf: ci.pattern, nameOf: ci.nameOf });
     if (!r || r.invalid) return r?.invalid ? { invalid: r.invalid, command: r.command } : null;
+    if (blocksAmbiguous(r, ci.ambiguousPaths)) return null;
+    // a value with a line break (`"/tmp/a\nb"`) is never composed into a command: the catalog withholds it too
+    if (/[\r\n]/.test(r.command)) return null;
     // calibrated gate: confident stage-1 tool, or strong flag evidence (>= 2 triggered flags) for a likely tool
     const pOf = capable.find((t) => t.tool === r.tool)?.p ?? 0;
     if (composeMode !== 'force' && !(c.topToolP >= model.thresholds.compose || (r.triggered.length >= 2 && pOf >= 0.2))) return null;
@@ -169,73 +371,264 @@ export function suggest(query, opts = {}) {
     const comp = tryCompose('low confidence');
     if (comp && !comp.invalid) return comp;
     const hint = hasPronoun(query) && !ctx ? 'this looks like a reference to an earlier command; try --history' : null;
+    // "move it there" with history: an object and a place reference at once is refused, not reported as resolved
+    if (ctx && hasPronoun(query) && hasLocative(query)) {
+      context.rule = 'refused';
+      context.note = 'the request names both an object ("it") and a place ("there") from the previous command; not guessing which is which';
+      return { ...out, understood: false, method: 'history-rule', hint: context.note, composeError: comp?.invalid || null };
+    }
     return { ...out, understood: false, method: 'none', hint, composeError: comp?.invalid || null };
   }
+  // "close that pr", "close pr 45": the catalog has no command that closes a pull request; the opposite one (`gh pr create`)
+  // or another one (`gh pr view 45`) is never suggested in its place
+  // "close pr 45 and delete branch", "close pr 45 without merge": refused for gh_pr_merge too, unless the request also asks
+  // for the merge ("merge and close pr 45"); "do not merge pr 45", "unmerge pr 45": never `gh pr merge 45`
+  const closes = PR_CLOSE.test(query);
+  const merges = intent === 'gh_pr_merge' && mergeAsked(query);
+  // "revert pr 45": not `gh pr view 45` either
+  if (intent?.startsWith('gh_pr_') && /\brevert\w*\b/i.test(query) && !merges) {
+    return { ...out, understood: false, method: 'none', hint: 'reverting a pull request is not supported (gh pr revert <PR>)' };
+  }
+  if (intent?.startsWith('gh_pr_') && ((closes && !merges) || (intent === 'gh_pr_merge' && !merges && [...query.matchAll(MERGE_WORD)].length))) {
+    const hint = closes ? 'closing a pull request is not supported (gh pr close <PR>)' : 'the request does not ask for a merge (it negates or undoes one); not suggesting gh pr merge';
+    return { ...out, understood: false, method: 'none', hint };
+  }
 
-  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode });
+  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode, tagger: opts.tagger });
   const slots = r.slots;
+  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
+  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
+  const ambiguousPaths = [];
+  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
+  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
+  const blank = new Set(r.withheld || []);
+  // withheld operands whose optional part keeps its placeholder: an invalid operand, a history value that is ambiguous or
+  // invalid (`gh pr merge <PR>` for "same but merge" after `tellsh merge pr nightly`, never the current branch's pull request)
+  const keep = new Set(r.invalidOperands);
+  if (BY_ID[intent].risk !== 'safe') {
+    for (const k of Object.keys(slots)) {
+      if (PATH_SLOT_NAMES.has(k) && r.sources[k] !== 'history' && trailingPunctAfter(query, slots[k])) { ambiguousPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
+    }
+    if (ambiguousPaths.length) finalizeSlots(BY_ID[intent], slots);
+  }
+  // a changing command whose path is the output of a command (`in \`pwd\``, `$(pwd)`), or a request that names more
+  // explicit paths than the command takes (`in /tmp/x and /tmp/y`: only one would be used): placeholder + warning
+  const unclearPaths = [];
+  if (BY_ID[intent].risk !== 'safe') {
+    const explicit = explicitPaths(query);
+    const nPathSlots = [...PATH_SLOT_NAMES].filter((k) => usesSlot(BY_ID[intent], k)).length;
+    const dropped = explicit.filter((p) => !Object.values(slots).some((v) => String(v) === p));
+    const tooMany = explicit.length > nPathSlots && dropped.length > 0;
+    // `in $(pwd)`: the location is the output of a command, so an empty path slot is withheld too (never `.`)
+    if (/\$\(|`/.test(query)) for (const k of ['path', 'file']) if (usesSlot(BY_ID[intent], k) && slots[k] == null && !unclearPaths.length) { unclearPaths.push(`${k}=?`); blank.add(k); }
+    for (const k of Object.keys(slots)) {
+      if (!PATH_SLOT_NAMES.has(k) || r.sources[k] === 'history') continue;
+      const sub = insideSubstitution(query, String(slots[k]));
+      if (sub || tooMany) { unclearPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
+    }
+    if (tooMany) for (const k of PATH_SLOT_NAMES) if (usesSlot(BY_ID[intent], k) && slots[k] == null) blank.add(k);
+    if (unclearPaths.length || tooMany) finalizeSlots(BY_ID[intent], slots);
+    if (tooMany && !unclearPaths.length) unclearPaths.push(dropped.join(', '));
+    if (tooMany) unclearPaths.tooMany = true;
+  }
+  // `tellsh delete folder "my data"`: a quoted argument that may be a name or words of the request (see joinArgs). A
+  // changing command never takes it (or a part of it) as its path or other operand (process, service, container,
+  // package, ...): placeholder + warning
+  const unclearArgs = [];
+  if (BY_ID[intent].risk !== 'safe' && opts.unclearArgs?.length) {
+    const words = (x) => String(x).toLowerCase().split(/\s+/).filter(Boolean);
+    const partOf = (v, u) => { const a = words(u); const b = words(v); return b.length > 0 && a.some((_, i) => b.every((w, j) => a[i + j] === w)); };
+    for (const k of Object.keys(slots)) {
+      if (!(PATH_SLOT_NAMES.has(k) || OPERAND_SLOT_NAMES.has(k)) || r.sources[k] === 'history') continue;
+      const u = opts.unclearArgs.find((x) => partOf(slots[k], x));
+      if (u != null) { unclearArgs.push(`${k}=${u}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
+    }
+    if (unclearArgs.length) finalizeSlots(BY_ID[intent], slots);
+  }
+  const ambiguousText = [];
+  for (const k of TEXT_SLOT_NAMES) {
+    if (slots[k] != null && cutAtEscapedQuote(query, slots[k])) { ambiguousText.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
+  }
+  if (ambiguousText.length) { delete slots.sedexpr; delete slots.namepat; finalizeSlots(BY_ID[intent], slots); }
+  // "move it to /tmp/old", "copy them to /backup": the reference is the source, so the one path the request
+  // names is the destination (never `mv /tmp/old <DST>`). "copy notes.txt to it / into that folder / there":
+  // the reference is the destination and the named path the source (never `cp -ri /backup notes.txt`).
+  const itR = BY_ID[intent];
+  const fq = foldKeepLength(query).toLowerCase();
+  const twoPaths = usesSlot(itR, 'src') && usesSlot(itR, 'dst');
+  const isRef = ref?.rule === 'pronoun' || ref?.rule === 'refused';
+  const locative = hasLocative(query);
+  // "move it there": an object reference and a place reference at once. Which history value is the source and
+  // which the destination cannot be told from one previous command (`cd /tmp/x; cat a.txt`): both are withheld.
+  const bothRefs = twoPaths && locative && hasPronoun(query);
+  const refDst = !bothRefs && twoPaths && isRef && REF_DST.test(fq);
+  // the slots the reference fills (pronoun) or leaves empty (refused / guarded)
+  const refFill = refDst ? (ref.fill ? { dst: Object.values(ref.fill)[0] } : {}) : ref?.fill || {};
+  if (bothRefs) {
+    for (const k of Object.keys(slots)) if (PATH_SLOT_NAMES.has(k)) { delete slots[k]; delete r.sources[k]; }
+    for (const k of PATH_SLOT_NAMES) if (usesSlot(itR, k)) blank.add(k);
+    finalizeSlots(itR, slots);
+    if (ctx) { context.rule = 'refused'; context.note = 'the request names both what to move and where ("it" … "there"); not guessing which is which'; }
+    method = ctx ? 'history-rule' : method;
+  } else if (refDst) {
+    if (slots.src == null && slots.dst != null && !PRONOUN_VALUE.test(String(slots.dst))) { slots.src = slots.dst; r.sources.src = r.sources.dst; }
+    delete slots.dst; delete r.sources.dst;
+    if (slots.src != null && PRONOUN_VALUE.test(String(slots.src))) { delete slots.src; delete r.sources.src; }
+    if (ref.rule === 'refused') blank.add('dst');
+  } else if (isRef && twoPaths && slots.src != null && slots.dst == null &&
+      !PRONOUN_VALUE.test(String(slots.src)) && (ref.fill?.src != null || ref.blank?.includes('src'))) {
+    slots.dst = slots.src; r.sources.dst = r.sources.src;
+    delete slots.src; delete r.sources.src;
+    if (ref.rule === 'refused' || ref.guarded) blank.add('src');
+  }
+  // "move them to /tmp/old" with nothing resolved for "them" (no history, an unrelated history, ...): the one named
+  // path follows "to"/"into"/"do", so it is the destination; the source stays a placeholder (never `mv /tmp/old <DST>`)
+  if (!bothRefs && twoPaths && slots.src != null && slots.dst == null && !refDst && afterDestWord(query, String(slots.src))) {
+    slots.dst = slots.src; r.sources.dst = r.sources.src;
+    delete slots.src; delete r.sources.src;
+    blank.add('src');
+  }
+  // values that are only the words of a refused or guarded reference: a pronoun, or the `.` the tagger reads for
+  // "this folder" / "that directory" (never `rm -r .` for "delete all log files in this folder")
+  const refWordsOnly = () => {
+    for (const k of Object.keys(slots)) {
+      if (PRONOUN_VALUE.test(String(slots[k])) || (PATH_SLOT_NAMES.has(k) && slots[k] === '.' && !/(?:^|\s)\.(?:\s|$)/.test(query))) { delete slots[k]; delete r.sources[k]; }
+    }
+  };
   if (ref?.rule === 'refused') {
-    // the reference points at something we cannot read safely: leave the slot empty (placeholder)
-    for (const k of Object.keys(slots)) if (PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
+    // the reference points at something we cannot read safely: leave the slot empty (placeholder); a pull request stays
+    // `<PR>` even then (left out, `gh pr merge` would act on the current branch's)
+    refWordsOnly();
+    for (const k of refDst ? [] : ref.blank || []) if (slots[k] == null && usesSlot(BY_ID[intent], k)) { blank.add(k); if (!ref.blanket || k === 'pr') keep.add(k); }
     finalizeSlots(BY_ID[intent], slots);
     method = 'history-rule';
   }
-  if (ref?.rule === 'pronoun') {
+  // "remove the logs there", "delete notes.txt there": a place reference never names the object of a changing
+  // command (`rm -r DIR`, `mv DIR …`); only the location a search-and-change runs in (`find DIR … -delete`). Any path
+  // the request names is relative to the wrong directory, so every path slot is withheld (with or without history).
+  if (locative && !refDst && !bothRefs && BY_ID[intent].risk !== 'safe' && FAMILY_OF[intent] !== 'find' && [...PATH_SLOT_NAMES].some((k) => usesSlot(BY_ID[intent], k))) {
+    for (const k of Object.keys(slots)) if (PATH_SLOT_NAMES.has(k)) { delete slots[k]; delete r.sources[k]; }
+    for (const k of PATH_SLOT_NAMES) if (usesSlot(BY_ID[intent], k)) blank.add(k);
+    finalizeSlots(BY_ID[intent], slots);
+    if (ctx) {
+      context.rule = 'refused';
+      context.note = `"there" names a place, not what ${intent} would change; not guessing`;
+      method = 'history-rule';
+    }
+  } else if (ref?.rule === 'pronoun' && ref.guarded && BY_ID[intent].risk !== 'safe') {
+    // the value must not be changed (search root, listed directory, ...; see changeGuard) and the classifier
+    // picked a modifying intent: refuse
+    refWordsOnly();
+    // (a pull request keeps its `<PR>`: left out, `gh pr merge` would act on the current branch's)
+    for (const k of Object.keys(refFill)) if (slots[k] == null && usesSlot(BY_ID[intent], k)) { blank.add(k); if (k === 'pr') keep.add(k); }
+    finalizeSlots(BY_ID[intent], slots);
+    context.rule = 'refused';
+    context.note = ref.guardNote;
+    method = 'history-rule';
+  } else if (ref?.rule === 'pronoun') {
     const it = BY_ID[intent];
-    for (const [k, v] of Object.entries(ref.fill)) {
-      if (!validSlot(k, v)) { if (slots[k] != null && PRONOUN_VALUE.test(String(slots[k]))) delete slots[k]; continue; }
+    for (const [k, v] of Object.entries(refFill)) {
+      // a pull request the request names but that cannot be read ("merge the pr that fixes login", `that pr "bob's"`): the
+      // request means that one, not the history's, so it stays withheld (as without history)
+      if (k === 'pr' && r.invalidOperands.includes(k)) { if (usesSlot(it, k)) { blank.add(k); keep.add(k); } continue; }
+      if (!validSlot(k, v)) {
+        // the referenced value cannot be used (too long, a newline, ...): placeholder, never the catalog default
+        if (slots[k] != null && PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
+        if (slots[k] == null && usesSlot(it, k)) { blank.add(k); keep.add(k); }
+        continue;
+      }
       // the referenced value wins unless the request spells out its own value literally ("kill 4242")
       const literal = slots[k] != null && !PRONOUN_VALUE.test(String(slots[k])) && new RegExp(`(^|[^\\w])${String(slots[k]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^\\w])`, 'i').test(query);
       if (usesSlot(it, k) && (!literal || (k === 'path' && slots[k] === '.'))) { slots[k] = v; r.sources[k] = 'history'; }
     }
+    // the chosen command does not take the referenced value: do not claim it was used
+    if (!Object.values(r.sources).includes('history')) { context.rule = null; context.note = `the ${ref.ent} from history does not fit ${intent}; not used`; }
     finalizeSlots(it, slots);
     method = 'history-rule';
   }
   if (sb) {
     const it = BY_ID[intent];
     for (const [k, v] of Object.entries(validHistorySlots(sb.lastSlots))) {
-      if (usesSlot(it, k) && slots[k] == null && !['namepat', 'sedexpr'].includes(k)) { slots[k] = v; r.sources[k] = 'history'; }
+      if (usesSlot(it, k) && slots[k] == null && !blank.has(k) && !['namepat', 'sedexpr'].includes(k)) { slots[k] = v; r.sources[k] = 'history'; }
     }
+    // a slot of the previous command that depends on the shell state (`find "$DIR" …`) or is not a valid value
+    // (a 300-character path): placeholder, not `.`
+    const withheld = [...(sb.blank || []), ...invalidHistorySlots(sb.lastSlots)].filter((k) => usesSlot(it, k) && slots[k] == null && !['namepat', 'sedexpr'].includes(k));
+    for (const k of withheld) { blank.add(k); keep.add(k); }
+    if (withheld.length) { context.rule = 'refused'; context.note = `previous ${sb.lastIntent} has ${withheld.join(', ')} that depends on the shell state or is not a valid value; not guessing`; }
     finalizeSlots(it, slots);
   }
-  let b = buildCommand(intent, query, { env, resolved: slots });
-  // implicit reference: a required slot is still missing and the history has a value of that type
-  if (ctx && b.missing.length && ref?.rule !== 'refused') {
+  // "merge the other pr", "merge my last pr": not the previous command's pull request either, unless the request names one;
+  // "merge that pr in repo a/b": the previous command's pull request was one of the working directory's repository
+  if (usesSlot(BY_ID[intent], 'pr') && (slots.pr == null || r.sources.pr === 'history') && (PR_PICKED.test(query) || (r.sources.pr === 'history' && slots.repo != null))) {
+    delete slots.pr; delete r.sources.pr;
+    blank.add('pr'); keep.add('pr');
+    context.rule = ctx ? 'refused' : context.rule;
+    if (ctx) context.note = 'the request means a pull request (another one, or one in another repository) the history does not name; not guessing';
+  }
+  // "merge that pr" with no history to read it from: the pull request is withheld, never the current branch's
+  if (!ref && slots.pr == null && usesSlot(BY_ID[intent], 'pr') && PR_REFERENCE.test(query)) {
+    blank.add('pr'); keep.add('pr');
+    if (ctx) { context.rule = 'refused'; context.note = 'the request refers to a pull request the history does not name; not guessing'; }
+  }
+  let b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: [...keep] });
+  // implicit reference: a required slot is still missing and the history has a value of that type.
+  // Only for safe intents: a destructive command ("delete the folder") is never aimed at a history
+  // value without an explicit reference word ("delete it"), which goes through resolveReference.
+  if (ctx && b.missing.length && ref?.rule !== 'refused' && BY_ID[intent].risk === 'safe' && b.risk === 'safe') {
     const filled = [];
     for (const m of b.missing) {
-      const e = entityForSlot(m, ctx) || (ctx.last?.slots?.[m] != null ? { ent: m, value: ctx.last.slots[m] } : null);
-      if (e && validSlot(m, e.value)) { slots[m] = e.value; r.sources[m] = 'history'; filled.push(`${m}=${e.value}`); }
+      if (r.withheld?.includes(m)) continue; // "list files in the": not a reference to history either
+      const e = entityForSlot(m, ctx);
+      // an ambiguous newest value blocks the fill; ctx.last is consulted only when no entity type applies
+      const v = e ? (e.ambiguous ? null : e.value) : (ctx.last?.slots?.[m] ?? null);
+      if (v != null && validSlot(m, v)) { slots[m] = v; r.sources[m] = 'history'; filled.push(`${m}=${v}`); }
     }
     if (filled.length) {
       finalizeSlots(BY_ID[intent], slots);
-      b = buildCommand(intent, query, { env, resolved: slots });
+      b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: [...keep] });
+      method = 'history-rule'; // history-derived: never auto-run by --yes
       context.rule ??= 'implicit';
       context.note = [context.note, `filled from history: ${filled.join(', ')}`].filter(Boolean).join('; ');
     }
   }
+  if (Object.values(r.sources).includes('history')) method = 'history-rule';
   const res = { ...out, understood: true, method, ...b, slotSources: r.sources, spans: r.spans.map((s) => ({ type: s.type, text: s.text })) };
+  if (ambiguousText.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: unclear where the quoted text ends (\\" may be an escaped quote) (${ambiguousText.join(', ')})`];
+  if (ambiguousPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${ambiguousPaths.join(', ')}); quote the path`];
+  if (unclearArgs.length) res.warnings = [...(res.warnings || []), `${unclearArgs.every((x) => PATH_SLOT_NAMES.has(x.split('=')[0])) ? 'path' : 'value'} left as a placeholder: unclear whether the quoted argument is a name or part of the request (${unclearArgs.join(', ')}); pass the whole request as one quoted argument`];
+  if (unclearPaths.length) {
+    res.warnings = [...(res.warnings || []), unclearPaths.tooMany
+      ? `path left as a placeholder: the request names more paths than ${intent} takes (${explicitPaths(query).join(', ')}); run it once per path`
+      : `path left as a placeholder: it is the output of a command substitution (${unclearPaths.join(', ')})`];
+  }
   if (method === 'catalog' && ctx == null && hasPronoun(query) && b.missing.length) res.hint = 'this looks like a reference to an earlier command; try --history';
 
   // ---- second pass on modifier mismatch: the request asks for flags the catalog command lacks ----
   //   same tool: >= 1 triggered flag not in the catalog command; another stage-1 tool: >= 2 triggered flags
-  if (method === 'catalog' && composeMode !== 'off' && b.command && env.shell !== 'powershell' && env.shell !== 'cmd') {
+  // a slot the catalog withheld on purpose (command substitution, a rejected or unclear path, ...) is never filled by the
+  // composer: the catalog command with its placeholder is the answer
+  if (method === 'catalog' && composeMode !== 'off' && b.command && !blank.size && !['powershell', 'cmd', 'fish'].includes(env.shell)) {
     const fam = FAMILY_OF[intent];
-    const ci = composeInput(query, model, fam);
+    const ci = composeInput(query, model, fam, opts.unclearArgs);
     const opt = { patternOf: ci.pattern, nameOf: ci.nameOf };
     const have = flagTokens(b.command);
     const expl = new Set(explained()[intent] || []);
     const unexplained = (cmp) => cmp.triggered.filter((f) => !expl.has((cmp.sub ? cmp.sub + ' ' : '') + f));
     let comp = compose(query, [{ tool: fam, p: 1 }], ci.ex, opt);
+    if (blocksAmbiguous(comp, ci.ambiguousPaths)) comp = null;
     // same tool: the composed command must keep the catalog command's head (+ git/docker subcommand)
     const sameHead = comp && !comp.invalid && headOf(comp.command) === headOf(b.command);
     let extra = sameHead ? unexplained(comp).filter((f) => [...flagTokens(f)].some((x) => !have.has(x))) : [];
     if (!extra.length) {
       const others = c.tools.filter((t) => t.tool !== NONE && t.p >= 0.05);
-      const alt = compose(query, others.length ? others : [{ tool: fam, p: 1 }], ci.ex, opt);
+      let alt = compose(query, others.length ? others : [{ tool: fam, p: 1 }], ci.ex, opt);
+      if (blocksAmbiguous(alt, ci.ambiguousPaths)) alt = null;
       const ux = alt && !alt.invalid && headOf(alt.command) !== headOf(b.command) ? unexplained(alt) : [];
       if (ux.length >= 2) { comp = alt; extra = ux; }
     }
-    if (comp && !comp.invalid && comp.command !== b.command) {
+    // a value with a line break is never composed into a command (the catalog rejects it as a path)
+    if (comp && !comp.invalid && comp.command !== b.command && !/[\r\n]/.test(comp.command)) {
       if (extra.length >= 1 || composeMode === 'force') {
         return { ...res, method: 'composed', experimental: true, reason: `request asks for ${extra.join(' ')} not in the catalog command`,
           catalogCommand: b.command, description: `composed ${comp.tool}${comp.sub ? ' ' + comp.sub : ''} command (experimental)`,

exec
/bin/bash -lc 'for p in /AGENTS.md /workspace/AGENTS.md /workspace/tellsh/AGENTS.md; do if [ -f "$p" ]; then cat "$p"; fi; done; cat package.json; wc -l src/*.js src/rerank/*.js scripts/hybrid/* scripts/train.py; cat test/regressions23.test.js' in /workspace/tellsh
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
     45 src/cascade.js
    294 src/catalog.js
     20 src/classifier.js
    258 src/cli.js
    547 src/compose.js
    672 src/danger.js
     93 src/env.js
    173 src/features.js
    535 src/fill.js
   1313 src/history.js
     86 src/model.js
    641 src/pipeline.js
    180 src/render.js
    240 src/shellwords.js
    634 src/slots.js
    212 src/tagger.js
    118 src/tools.js
    648 src/variants.js
    152 src/rerank/encoder.js
    112 src/rerank/hybrid.js
     92 src/rerank/tokenizer.js
      0 scripts/hybrid/__pycache__
wc: scripts/hybrid/__pycache__: Is a directory
     74 scripts/hybrid/bench_hybrid.js
     12 scripts/hybrid/cold_query.js
     37 scripts/hybrid/dump_cascade.js
    351 scripts/hybrid/eval_hybrid.js
    144 scripts/hybrid/export_data.js
    110 scripts/hybrid/export_encoder.py
     56 scripts/hybrid/fetch_model.js
    267 scripts/hybrid/lm_rerank.py
    124 scripts/hybrid/prune_vocab.py
    159 scripts/hybrid/report_hybrid.js
     49 scripts/hybrid/sets.js
     34 scripts/hybrid/train_a_dev.sh
    167 scripts/hybrid/train_encoder.py
    106 scripts/hybrid/train_lm_gpu.py
    345 scripts/train.py
   9100 total
// Regression tests for round 22: the round-21 findings (review/r21-claude.md, review/r21-codex.md). wrangler deploy never
// makes up an environment ("worker env", "with env vars", "for testing") and keeps a custom one whole ("staging-eu",
// "preview2"); a word before "pr" picks out a pull request also without a determiner ("merge dependabot pr", "merge alice's
// pr"); a quoted label / title is not the pull request; a negated dry run is a real deploy; English "to pr" is not a
// reference; "the pr in question" is withheld.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

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

test('major: "X env" never makes up an environment name', () => {
  for (const env of SHELLS) {
    for (const q of ['deploy worker env', 'deploy worker with env vars', 'deploy worker with environment variables',
      'deploy worker using env file', 'deploy worker, my environment is set']) {
      withheld(run(q, null, env), 'npx wrangler deploy --env <WENV>', 'wenv', `${env.shell}: ${q}`);
    }
    const cases = {
      'deploy worker environment staging.': 'npx wrangler deploy --env staging',
      'deploy worker env staging': 'npx wrangler deploy --env staging',
      'deploy worker to staging env': 'npx wrangler deploy --env staging',
      'deploy worker to the production environment': 'npx wrangler deploy --env production',
      'deploy worker to env called foo': 'npx wrangler deploy --env foo',
      // "for" does not name the environment
      'deploy worker for testing': 'npx wrangler deploy',
      'deploy worker for the qa team': 'npx wrangler deploy',
      'deploy worker to cloudflare': 'npx wrangler deploy',
    };
    for (const [q, cmd] of Object.entries(cases)) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
  }
});

test('major: a custom environment name is kept whole', () => {
  for (const env of SHELLS) {
    const cases = {
      'deploy worker to staging-eu': 'npx wrangler deploy --env staging-eu',
      'deploy worker to preview2': 'npx wrangler deploy --env preview2',
      'deploy worker to customer-a': 'npx wrangler deploy --env customer-a',
      'deploy worker to the staging-eu environment': 'npx wrangler deploy --env staging-eu',
      'deploy worker in 2-3 minutes': 'npx wrangler deploy',
    };
    for (const [q, cmd] of Object.entries(cases)) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
  }
});

test('major: a word before "pr" picks out a pull request also without a determiner', () => {
  const qs = ['merge dependabot pr', 'merge renovate pr', 'merge docs pr', 'merge draft pr', 'merge open pr', "merge alice's pr",
    'merge alices pr', 'merge dependabot pull request', 'show checks for dependabot pr'];
  for (const env of SHELLS) {
    for (const q of qs) {
      for (const h of [null, ['gh pr view 45']]) {
        const r = run(q, h, env);
        assert.match(r.command, /^gh pr \w+ <PR>$/, `${env.shell}: ${q} after ${h}`);
        assert.deepEqual(r.missing, ['pr'], `${env.shell}: ${q} after ${h}`);
      }
    }
    for (const q of ['merge pr', 'merge my pr', 'squash merge pr', 'squash and merge my pr', 'approve and merge pr', 'please merge pr now',
      'can you merge the pr']) {
      exact(run(q, null, env), 'gh pr merge', `${env.shell}: ${q}`);
    }
    exact(run('merge that pr', ['gh pr view 45'], env), 'gh pr merge 45', env.shell);
    exact(run('show checks for that pr', ['gh pr view 45'], env), 'gh pr checks 45', env.shell);
  }
});

test('major: a quoted label or title is not the pull request', () => {
  for (const env of SHELLS) {
    for (const q of ['merge the pr with label "urgent"', 'merge the pr with title "fix-login"', 'merge the pr titled "fix-login"',
      'merge the pr by "alice"']) {
      for (const h of [null, ['gh pr view 45']]) withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
    exact(run('merge the "feature/login" pull request', null, env), 'gh pr merge feature/login', env.shell);
  }
});

test('minor: a negated dry run is a real deploy', () => {
  exact(run('deploy the worker, not a dry run'), 'npx wrangler deploy');
  exact(run('deploy worker to production without dry run'), 'npx wrangler deploy --env production');
  exact(run('deploy the worker to staging dry run'), 'npx wrangler deploy --dry-run --env staging');
});

test('minor: English "to pr" is not a reference; "the pr in question" is withheld', () => {
  const h = ['gh pr view 45'];
  withheld(run('merge changes to pr', h), 'gh pr merge <PR>', 'pr');
  assert.notEqual(run('check out to pr', h).command, 'gh pr checks 45');
  assert.notEqual(run('view diff to pr', h).command, 'gh pr view 45');
  exact(run('zmerguj to pr', h), 'gh pr merge 45');
  for (const x of [null, h]) withheld(run('merge the pr in question', x), 'gh pr merge <PR>', 'pr');
});

exec
/bin/bash -lc 'cat scripts/hybrid/train_encoder.py scripts/hybrid/export_encoder.py scripts/hybrid/train_lm_gpu.py scripts/hybrid/train_a_dev.sh' in /workspace/tellsh
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
/bin/bash -lc 'cat src/rerank/hybrid.js src/rerank/encoder.js src/rerank/tokenizer.js' in /workspace/tellsh
exec
/bin/bash -lc "sed -n '1,310p' src/pipeline.js" in /workspace/tellsh
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
  pr: (v) => RAW_OK.pr(v), repo: (v) => RAW_OK.repo(v), wenv: (v) => RAW_OK.wenv(v), dryrun: (v) => RAW_OK.dryrun(v),
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
  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr', 'repo', 'wenv']) {
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

exec
/bin/bash -lc "cat test/cli.test.js test/hybrid.test.js; sed -n '1,190p' src/fill.js" in /workspace/tellsh
 succeeded in 0ms:
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BIN = fileURLToPath(new URL('../bin/tellsh.js', import.meta.url));
const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });

test('--version', () => {
  const r = run('--version');
  assert.equal(r.status, 0);
  assert.equal(r.stdout.trim(), JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version);
});

test('--help', () => {
  const r = run('--help');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /Usage: tellsh/);
});

test('--json dry-run (EN)', () => {
  const r = run('--json', 'show', 'the', '5', 'largest', 'files', 'in', '/var/log');
  assert.equal(r.status, 0, r.stderr);
  const j = JSON.parse(r.stdout);
  assert.equal(j.intent, 'largest_files');
  assert.equal(j.risk, 'safe');
  assert.match(j.command, /head -n 5/);
  assert.match(j.command, /find \/var\/log/);
});

test('--json dry-run (PL)', () => {
  const r = run('--json', 'zabij proces na porcie 8080');
  const j = JSON.parse(r.stdout);
  assert.equal(j.intent, 'kill_by_port');
  assert.equal(j.risk, 'high');
  assert.match(j.command, /8080/);
});

test('dry-run prints command and never executes', () => {
  const r = run('-n', 'usuń plik important.txt');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /\$ rm important\.txt/);
  assert.match(r.stdout, /risk: high/);
});

test('non-TTY without --yes only prints', () => {
  const r = run('print', 'working', 'directory');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /\$ pwd/);
  assert.equal(r.stdout.trim().split('\n').filter((l) => l.startsWith('/')).length, 0);
});

test('--yes runs safe commands and passes exit code', () => {
  const r = run('--yes', 'print', 'working', 'directory');
  assert.equal(r.status, 0);
  assert.ok(r.stdout.includes(process.cwd()));
});

test('--yes refuses non-safe commands', () => {
  const r = run('--yes', 'delete', 'file', 'nothing-here.txt');
  assert.equal(r.status, 4);
  assert.match(r.stdout, /only auto-runs safe/);
});

test('unknown request -> I don\'t understand + candidates, exit 3', () => {
  const r = run('write me a poem about the sea');
  assert.equal(r.status, 3);
  assert.match(r.stdout, /I don't understand/);
  assert.match(r.stdout, /Did you mean/);
});

test('--platform darwin (alias of --os)', () => {
  const j = JSON.parse(run('--json', '--shell', 'bash', '--platform', 'darwin', 'how much ram is free').stdout);
  assert.equal(j.command, 'vm_stat');
});

test('--shell powershell / cmd / fish render natively; gaps exit 5', () => {
  const ps = JSON.parse(run('--json', '--shell', 'powershell', '--os', 'win32', 'kill process notepad').stdout);
  assert.match(ps.command, /Stop-Process/);
  assert.equal(ps.risk, 'high');
  const cmd = JSON.parse(run('--json', '--shell', 'cmd', 'show my ip address').stdout);
  assert.equal(cmd.os, 'win32');
  assert.match(cmd.command, /ipconfig/);
  const gap = run('--shell', 'cmd', 'make deploy.sh executable');
  assert.equal(gap.status, 5);
  assert.match(gap.stdout, /No cmd rendering/);
  assert.equal(run('--shell', 'tcsh', 'ls').status, 2);
});

test('--history=FILE resolves references and never echoes the history', () => {
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-cli-'));
  try {
    const f = join(dir, 'hist');
    writeFileSync(f, 'echo SECRET_TOKEN=abc123\ncat notes.txt\n');
    const r = run('--json', '--shell', 'bash', `--history=${f}`, 'delete', 'it');
    const j = JSON.parse(r.stdout);
    assert.equal(j.command, 'rm notes.txt');
    assert.equal(j.context.used, true);
    assert.ok(!r.stdout.includes('SECRET_TOKEN') && !r.stderr.includes('SECRET_TOKEN'));
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('composed commands are labelled experimental and refused by --yes', () => {
  const r = run('--shell', 'bash', '-n', 'list files sorted by modification time, oldest first, with details');
  assert.match(r.stdout, /composed \(experimental\)/);
  const y = run('--shell', 'bash', '--yes', 'list files sorted by modification time, oldest first, with details');
  assert.equal(y.status, 4);
});
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggestHybrid, rerank, POLICY } from '../src/rerank/hybrid.js';
import { NONE } from '../src/tools.js';

const env = { shell: 'bash', os: 'linux' };
// fake encoder: puts all mass on one intent, so the re-ranked decision is fully determined by the policy
const fake = (intent, pNone = 0) => ({ infer: async () => ({ intents: { [intent]: 0.99 }, pNone, tagger: undefined }) });

test('confident cascade answers alone (encoder never called)', async () => {
  let called = false;
  const enc = { infer: async () => { called = true; return { intents: {}, pNone: 0 }; } };
  const r = await suggestHybrid('show git status', { env, encoder: enc });
  assert.equal(r.intent, 'git_status');
  assert.equal(r.hybrid.deferred, false);
  assert.equal(called, false);
});

test('rerank only picks among the cascade top-k', () => {
  const c = { confidence: 0.5, topTool: 'fs', intent: 'a', tool: 'fs', tools: [], top: [{ intent: 'a', p: 0.5 }, { intent: 'b', p: 0.3 }] };
  const r = rerank(c, { b: 0.9, zzz: 0.99 }, POLICY['A+B'], { thr: 0.3 });
  assert.equal(r.intent, 'b');
  assert.ok(r.reranked);
});

test('keepNone keeps the cascade rejection; safe never rescues', () => {
  const none = { confidence: 0.1, topTool: NONE, intent: 'a', tool: 'fs', tools: [], top: [{ intent: 'a', p: 0.1 }] };
  assert.equal(rerank(none, { a: 0.99 }, POLICY['A+B'], { thr: 0.3 }), none);
  const low = { ...none, topTool: 'fs' };
  assert.equal(rerank(low, { a: 0.99 }, POLICY['A+B-safe'], { thr: 0.3 }), low);
  // encoder says "not a shell request" -> rejection
  assert.ok(rerank(low, { a: 0.99 }, POLICY['A+B'], { thr: 0.3, pNone: 0.9 }).confidence < 0.3);
});

test('re-ranked dangerous answers keep the danger checks of the normal pipeline', async () => {
  const r = await suggestHybrid('get rid of everything in /', { env, encoder: fake('delete_dir') });
  assert.equal(r.intent, 'delete_dir');
  assert.equal(r.risk, 'high');
  assert.equal(r.critical, true);
  assert.equal(r.hybrid.deferred, true);
});

test('missing encoder falls back to the cascade', async () => {
  const r = await suggestHybrid('zrób coś z plikami chyba', { env });
  assert.ok(r.hybrid.unavailable === 'encoder' || r.hybrid.deferred === false);
});
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
  dryrun: (v) => v === '--dry-run',
  // a wrangler environment name (wrangler.toml [env.NAME])
  wenv: (v) => /^[A-Za-z0-9][\w-]{0,62}$/.test(String(v)),
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
const PR_DET_NEUTRAL = /^(?:current|own|one|same|previous|last|prior|single|github|gh|pull|this|that|the|my|our|bieżący\w*|biezacy\w*|obecn\w*|aktualn\w*|mój|moj\w*|nasz\w*|sw[oó]j|swoj\w*|ten|tego)$/i;
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
// "merge ten pr" (Polish "this"), "merge that one pr": a number word that is a demonstrative, not a number
const PR_DEM_NUMBER = /\b(?:ten|(?:that|this|which|the)\s+one)\s+(?:\S+\s+)?(?:prs?|pull[\s-]+requests?)\b/gi;
// "merge pr from the feature branch", "for my branch bob": a branch is named, but not one the parser read
const PR_BRANCH_NAMED = /\b(?:for|of|on|from)\s+(?:\S+\s+){0,2}branch\b/i;
// wrangler deploy: "dry run", "--dry-run", "na sucho", "without (actually) deploying/publishing" (wrangler deploy --dry-run);
// "not a dry run", "without dry run", "skip the dry run": a real deploy, no flag
const WR_DRY = /\bdry[\s-]*run\b|\bna\s+sucho\b|\bwithout\s+(?:actually\s+)?(?:deploying|publishing|uploading)\b|\b(?:don'?t|do\s+not)\s+actually\s+(?:deploy|publish|upload)\b|\bbez\s+(?:faktycznego\s+)?(?:wdra[zż]ania|publikowania|deployu?)\b/i;
const WR_DRY_NOT = /\b(?:not|no|without|skip|skipping|nie|bez)\s+(?:a\s+|the\s+|any\s+)?dry[\s-]*run\b|\b(?:don'?t|do\s+not)\s+(?:do\s+)?(?:a\s+|the\s+)?dry[\s-]*run\b/i;
// the environment: "--env staging", "-e staging", "env staging", "to the staging environment", "to staging", "na produkcję";
// a name is taken only when it is a known one ("staging", "prod", ...) or a marked one ("staging-eu", "preview2", "qa_1"),
// as a whole word: "worker env", "with env vars", "env file", "my environment is set" never make up `--env worker/with/is`
// (the environment is withheld, `<WENV>`); a plain unknown word after "to" ("to cloudflare") is not an environment
const WR_ENV_OPT = /(?:^|\s)(?:--env|-e)(?:=|\s+)(\S+)/i;
const WR_ENV_AFTER = /\b(?:env|environment|środowisk\w*|srodowisk\w*)\s+(called\s+|named\s+|o\s+nazwie\s+)?(\S+)/gi;
const WR_ENV_BEFORE = /(?:^|\s)(\S+)\s+(?:env|environment)\b/gi;
const WR_ENV_PREP = /\b(to|on|in|into|na|do|w)\s+(?:the\s+|my\s+|our\s+)?(\S+)/gi;
const WR_ENV_KNOWN = /^(?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)$/i;
const WR_ENV_ANY = /\b(?:env|environment|środowisk\w*|srodowisk\w*|produkcj\w*|staging\w*)\b/i;
const wrEnvWord = (w) => String(w).replace(/[.,!?;:]+$/, '');
// a marked name: letters with a digit, '-' or '_' ("staging-eu", "preview2"), not "2-3" or "src/worker.js"
const wrEnvMarked = (w) => RAW_OK.wenv(w) && /[A-Za-z]/.test(w) && /[\d_-]/.test(w);
/** The wrangler environment a deploy request names: a name, `?` (named, not readable) or null (the default). */
function wranglerEnv(t) {
  const o = t.match(WR_ENV_OPT);
  if (o) { const w = wrEnvWord(o[1]); return RAW_OK.wenv(w) ? w : '?'; }
  for (const m of t.matchAll(WR_ENV_AFTER)) {
    const w = wrEnvWord(m[2]);
    if (WR_ENV_KNOWN.test(w) || wrEnvMarked(w) || (m[1] && RAW_OK.wenv(w))) return w;
  }
  for (const m of t.matchAll(WR_ENV_BEFORE)) {
    if (WR_ENV_KNOWN.test(m[1]) || wrEnvMarked(m[1])) return m[1];
  }
  for (const m of t.matchAll(WR_ENV_PREP)) {
    const w = wrEnvWord(m[2]);
    if (WR_ENV_KNOWN.test(w) || (/^(?:to|into|na|do)$/i.test(m[1]) && wrEnvMarked(w))) return w;
  }
  return WR_ENV_ANY.test(t) ? '?' : null;
}
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
  if (PR_DESCRIBED.test(after)) return '?';
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

exec
/bin/bash -lc 'cat scripts/hybrid/train_encoder.py scripts/hybrid/export_encoder.py' in /workspace/tellsh
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

codex
I’m checking how the new validation interacts with command rendering, history resolution, and training data. I’ll use small read-only probes to verify any suspected failures.
exec
/bin/bash -lc 'cat scripts/hybrid/export_data.js scripts/hybrid/train_lm_gpu.py scripts/hybrid/train_a_dev.sh' in /workspace/tellsh
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
/bin/bash -lc "rg -n 'write|mkdir|unlink|spawn|exec|tmpdir|mkdtemp' test/*.test.js; sed -n '1,190p' src/pipeline.js" in /workspace/tellsh
 succeeded in 0ms:
test/regressions12.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions12.test.js:73:    const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', ...q.split(' ')],
test/cli.test.js:3:import { spawnSync } from 'node:child_process';
test/cli.test.js:5:import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/cli.test.js:6:import { tmpdir } from 'node:os';
test/cli.test.js:10:const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/cli.test.js:42:test('dry-run prints command and never executes', () => {
test/cli.test.js:69:  const r = run('write me a poem about the sea');
test/cli.test.js:87:  const gap = run('--shell', 'cmd', 'make deploy.sh executable');
test/cli.test.js:94:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-cli-'));
test/cli.test.js:97:    writeFileSync(f, 'echo SECRET_TOKEN=abc123\ncat notes.txt\n');
test/regressions2.test.js:6:import { spawnSync } from 'node:child_process';
test/regressions2.test.js:8:import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
test/regressions2.test.js:9:import { tmpdir } from 'node:os';
test/regressions2.test.js:25:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions2.test.js:107:  assert.equal(checkDanger('find / -xdev -type f -exec du -h {} +').risk, 'safe');
test/regressions2.test.js:171:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r2-'));
test/regressions2.test.js:174:    writeFileSync(hf, 'cat secret.txt\n');
test/regressions2.test.js:311:  hdr.writeUInt32LE(buf.length * 2, 4);
test/regressions10.test.js:4:// several operands; bash does not write the running call to its history first; system files written by dd, cp,
test/regressions10.test.js:9:import { spawnSync } from 'node:child_process';
test/regressions10.test.js:22:const cliJson = (...words) => JSON.parse(spawnSync(process.execPath, [BIN, '--json', '--shell', 'bash', '--os', 'linux', ...words],
test/regressions10.test.js:96:test('nit: bash does not write the running call first, so an identical last tellsh line is the previous command', () => {
test/regressions10.test.js:99:  // zsh / fish / PSReadLine write it first: the line is this call, the previous command is the one before it
test/regressions10.test.js:133:  // the lines the script rewrites exist in gen_data.js, and the script fails when a rewrite did not happen
test/regressions10.test.js:142:  // the rewrite applied to gen_data.js produces the expected line
test/regressions10.test.js:143:  const sed = spawnSync('sh', ['-c', `sed -n -e "s#^  const leaks = excl.has;\\$#  const leaks = (t) => excl.has(t) || isDevText(t);#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
test/regressions4.test.js:188:  const { spawnSync } = await import('node:child_process');
test/regressions4.test.js:189:  const { mkdtempSync, writeFileSync } = await import('node:fs');
test/regressions4.test.js:190:  const { tmpdir } = await import('node:os');
test/regressions4.test.js:192:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r4-'));
test/regressions4.test.js:194:  writeFileSync(hist, 'rm -r old\nls newdir\n');
test/regressions4.test.js:195:  const r = spawnSync(process.execPath, ['bin/tellsh.js', '--dry-run', `--history=${hist}`, 'same', 'for', '/srv/current'], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/regressions.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/regressions.test.js:7:import { mkdtempSync, writeFileSync, readFileSync, rmSync, chmodSync } from 'node:fs';
test/regressions.test.js:8:import { tmpdir } from 'node:os';
test/regressions.test.js:23:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions.test.js:27:const tmp = () => mkdtempSync(join(tmpdir(), 'tellsh-reg-'));
test/regressions.test.js:37:  const out = execFileSync('bash', ['-c', render("printf '[%s]' {file}«{dest}»", v).command], { encoding: 'utf8' });
test/regressions.test.js:52:    assert.equal(spawnSync('bash', ['-n', '-c', command]).status, 0, command);
test/regressions.test.js:58:test('CLI: the reported injection payloads stay quoted (bash) and never execute', () => {
test/regressions.test.js:175:  const out = execFileSync('sh', ['-c', `printf 'h1 ./a\\nh1 ./b\\nh2 ./c\\nh3 ./d\\nh3 ./e\\nh3 ./f\\n' | ${awk}`], { encoding: 'utf8' });
test/regressions.test.js:185:// pwsh parse check must never execute the checked source
test/regressions.test.js:192:    writeFileSync(fake, `#!/bin/sh\nprintf '%s\\n' "$@" > '${out}'\nprintf '%s' "$TELLSH_PARSE_SRC" > '${out}.src'\nexit 0\n`);
test/regressions.test.js:279:    writeFileSync(join(dir, 'notes.txt'), 'hello\n');
test/regressions.test.js:280:    writeFileSync(f, 'ls\ncat notes.txt\n');
test/templates.test.js:3:import { execFileSync } from 'node:child_process';
test/templates.test.js:8:const roundTrip = (s) => execFileSync('bash', ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' });
test/regressions3-history.test.js:40:  assert.equal(run('delete it', ['cat old.txt; mkdir newdir']).command, 'rm -r newdir');
test/regressions3-history.test.js:42:  assert.equal(run('delete it', ['mkdir olddir; cat new.txt']).command, 'rm new.txt');
test/regressions3-history.test.js:60:  assert.equal(run('remove it', ['mkdir /srv/remove-backups', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:61:  assert.equal(run('delete it', ['mkdir /srv/delete-me', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:64:  assert.equal(run('usuń to', ['mkdir /srv/usun-stare', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:68:  const old = run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']);
test/regressions3-render.test.js:49:    'sudo -u root rm -rf /', 'doas rm -rf /', 'nohup rm -rf ~', 'time -p rm -rf ~', 'exec rm -rf /boot', 'command rm -rf $HOME', 'setsid rm -rf /']) {
test/shells.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/shells.test.js:12:const has = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
test/shells.test.js:51:      const res = spawnSync(checker, args, { encoding: 'utf8' });
test/shells.test.js:65:    if (has('fish')) { const res = spawnSync('fish', ['-n', '-c', r.command]); if (res.status !== 0) bad.push(it.id); }
test/shells.test.js:112:    for (const sh of ['bash', 'sh']) assert.equal(execFileSync(sh, ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' }), s);
test/regressions11.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions11.test.js:33:  const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', 'start', 'wrangler', 'dev'],
test/regressions11.test.js:84:  const sed = spawnSync('sh', ['-c', `DEV_TEXTS=/x.json; sed -n -e "s#^import { ctxFeatures } from '../src/history.js';#&\\nconst _devIndex = new Set(JSON.parse(readFileSync('$DEV_TEXTS', 'utf8')));#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
test/regressions9.test.js:4:// "move it there" is refused; the composer never fills a withheld slot; the encoder bundle installer only writes its
test/regressions9.test.js:9:import { spawnSync } from 'node:child_process';
test/regressions9.test.js:10:import { mkdtempSync, mkdirSync, writeFileSync, readdirSync, existsSync, rmSync } from 'node:fs';
test/regressions9.test.js:12:import { tmpdir } from 'node:os';
test/regressions9.test.js:29:const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/regressions9.test.js:66:  for (const h of ['touch a.txt b.txt', 'rm -i a.txt b.txt', 'cat a.txt b.txt', 'mkdir /tmp/a /tmp/b']) {
test/regressions9.test.js:81:  for (const c of ['rm /etc/passwd', 'rm -f /etc/shadow', 'sudo rm -- /boot/vmlinuz', 'unlink /etc/hosts', 'sed -i d /etc/passwd',
test/regressions9.test.js:131:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r8-'));
test/regressions9.test.js:134:  const fetch = (from, to) => spawnSync(process.execPath, [join(ROOT, 'scripts/hybrid/fetch_model.js'), '--from', from, '--to', to], { encoding: 'utf8' });
test/regressions9.test.js:137:    mkdirSync(src, { recursive: true });
test/regressions9.test.js:138:    for (const f of FILES) writeFileSync(join(src, f), f);
test/regressions9.test.js:139:    writeFileSync(join(dir, 'src', 'evil'), 'payload');
test/regressions9.test.js:143:      writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files: { ...files, ...extra } }));
test/regressions9.test.js:152:    writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files: { ...files, 'vocab.json': sha(Buffer.from('other')) } }));
test/regressions9.test.js:156:    writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files }));
test/regressions8.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions8.test.js:9:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/regressions8.test.js:10:import { tmpdir } from 'node:os';
test/regressions8.test.js:22:const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/regressions8.test.js:53:  const ctx = buildContext(['cat a.txt', 'docker logs web', 'mkdir /tmp/b']);
test/regressions8.test.js:65:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r7-'));
test/regressions8.test.js:68:    writeFileSync(f, 'cat old.txt\nls\ncat new.txt\n');
test/regressions8.test.js:107:  const c = run('delete it', [`mkdir ${long}`]);
test/regressions8.test.js:194:test('minor: a NUL byte never reaches spawnSync', () => {
test/regressions21.test.js:24:test('major: history never overwrites a pull request the request names but cannot read', () => {
test/regressions6.test.js:42:  assert.equal(run('make it executable', ['ls scripts']).command, 'chmod +x <FILE>');
test/regressions6.test.js:45:  assert.equal(run('delete it', ['mkdir /tmp/new']).command, 'rm -r /tmp/new');
test/regressions6.test.js:78:  refused(run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']), '<PATH>', 'hint');
test/regressions6.test.js:81:  const ctx = buildContext(['mkdir /a', 'mkdir /b']);
test/regressions6.test.js:99:    'env -S "rm -rf /"', 'tmux new "rm -rf /"', 'ssh host rm -rf /', 'ssh -p 22 host "rm -rf /"', 'docker exec ct rm -rf /', 'parallel rm -rf ::: /',
test/regressions6.test.js:100:    'find . -exec sh -c "rm -rf /" \;', 'sudo -iu root rm -rf /', 'sudo --preserve-env=PATH rm -rf /', 'nice --adjustment=5 rm -rf /',
test/regressions6.test.js:104:    'runuser -l root -c "rm -rf /"', 'pkexec --user root rm -rf /', 'chrt -f 99 rm -rf /', 'cgexec -g cpu:x rm -rf /', 'torsocks rm -rf /',
test/regressions6.test.js:112:    'powershell -EncodedCommand AAAA', 'iwr x | iex', '$(which rm) -rf /tmp/x', 'find . -exec sh -c "rm \\"$1\\"" _ {} \;']) {
test/regressions6.test.js:118:  for (const c of ['su - bob', 'sudo -u bob ls', 'pkexec ls', 'runuser -u bob ls']) assert.notEqual(checkDanger(c).risk, 'safe', c);
test/regressions6.test.js:121:    'docker exec -it web sh', 'tar -czvf a.tgz dir', 'nohup node server.js &', 'timeout 5 ping -c 3 x.org',
test/regressions6.test.js:122:    'nice -n 10 make', 'watch -n 1 df -h', 'xargs -n1 echo', 'ls | shuf', 'ls | sha256sum', 'tmux new -s work', 'kubectl exec -it pod -- ls /']) {
test/regressions6.test.js:157:  assert.equal(run('copy notes.txt to it', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
test/regressions6.test.js:158:  assert.equal(run('skopiuj notes.txt do niego', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
test/regressions6.test.js:159:  assert.equal(run('move report.pdf into that folder', ['mkdir /srv/x']).command, 'mv -i report.pdf /srv/x');
test/regressions5.test.js:109:  assert.equal(run('move it to /tmp/old', ['mkdir /tmp/build']).command, 'mv -i /tmp/build /tmp/old');
test/regressions5.test.js:124:    'su --command="rm -rf /"', 'runuser root -c "rm -rf /"', 'runuser -u root -- rm -rf /', 'pkexec rm -rf /', 'pkexec --user root rm -rf /',
test/regressions5.test.js:125:    'chrt 10 rm -rf /', 'chrt -f 10 rm -rf /', 'cgexec -g cpu:x rm -rf /', 'eatmydata rm -rf /', 'torsocks rm -rf /', 'torsocks -P 9050 rm -rf /', 'catchsegv rm -rf /']) {
test/regressions5.test.js:130:  for (const c of ['flock /tmp/l echo hi', 'cgexec -g cpu:x ls', 'chrt -p 1234']) assert.equal(checkDanger(c, 'safe').risk, 'safe', c);
test/regressions7.test.js:6:// interpreter code, non-recursive chmod/chown of /, writes onto raw disks and destructive commands after unknown programs.
test/regressions7.test.js:73:  assert.equal(run('copy notes.txt to it', ['mkdir /tmp/n']).command, 'cp -ri notes.txt /tmp/n');
test/regressions7.test.js:125:test('danger: inline interpreter code, chmod/chown of /, raw disk writes, unknown wrappers (claude r5 minor 5)', () => {
test/regressions13.test.js:1:// Regression tests for round 12: the round-11 findings (review/r11-claude.md, review/r11-codex.md). `pkexec` always
test/regressions13.test.js:19:test('major: pkexec and run0 --chdir / --user run elsewhere: relative history values are ambiguous', () => {
test/regressions13.test.js:20:  for (const h of ['pkexec cat notes.txt', 'pkexec --user bob cat notes.txt', 'pkexec --disable-internal-agent cat notes.txt',
test/regressions13.test.js:21:    'nohup pkexec cat notes.txt', 'run0 --chdir=/srv cat notes.txt', 'run0 -D /srv cat notes.txt', 'run0 -D/srv cat notes.txt',
test/regressions13.test.js:30:  assert.equal(run('delete it', ['pkexec cat /tmp/abs.txt']).command, 'rm /tmp/abs.txt');
test/pipeline.test.js:4:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/pipeline.test.js:5:import { tmpdir } from 'node:os';
test/pipeline.test.js:52:  assert.equal(S('pokaż 5 największych plików w ~/Pobrane').command, 'find ~/Pobrane -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 5');
test/pipeline.test.js:93:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-hist-'));
test/pipeline.test.js:96:    writeFileSync(f, Array.from({ length: 50 }, (_, i) => `: 17000000${i}:0;echo ${i}`).join('\n') + '\n');
test/pipeline.test.js:123:  for (const q of ['write me a poem about the sea', 'jaka jest pogoda w krakowie', 'tell me a joke']) assert.equal(S(q).understood, false, q);
test/compose.test.js:47:  const { spawnSync } = await import('node:child_process');
test/compose.test.js:48:  const r = spawnSync('sh', ['-c', 'node bin/tellsh.js --dry-run show disk usage | head -c 1 >/dev/null; echo $?'], { encoding: 'utf8' });
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
  pr: (v) => RAW_OK.pr(v), repo: (v) => RAW_OK.repo(v), wenv: (v) => RAW_OK.wenv(v), dryrun: (v) => RAW_OK.dryrun(v),
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
  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr', 'repo', 'wenv']) {
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

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/catalog.js src/variants.js src/render.js scripts/train.py scripts/gen_data.js' in /workspace/tellsh
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
diff --git a/src/catalog.js b/src/catalog.js
index f98833f..2c55d92 100644
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
@@ -249,6 +253,42 @@ export const INTENTS = [
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
+  // a dry run ("do a dry run of wrangler deploy") and an environment ("deploy worker to staging") are kept, never dropped
+  // for a deploy to the default target
+  T('wrangler_deploy', 'Deploy a Cloudflare Worker with wrangler', 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»', {}, 'medium'),
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
diff --git a/src/variants.js b/src/variants.js
index 4a171b3..0e08998 100644
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
+  wrangler_deploy: { pwsh: 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»', cmd: 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»' },
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
/bin/bash -lc "sed -n '210,535p' src/fill.js" in /workspace/tellsh
 succeeded in 0ms:
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
  if (has('pr')) {
    // "merge pr 45 in repository other/repo", "… --repo other/repo": the repository is kept (`--repo`), an unreadable one
    // ("in the other repo", "in repo v2") withheld, never dropped; gh needs a pull request named with it
    const rq = has('repo') ? prRepo(String(ex.text)) : null;
    if (rq) v.repo = rq.repo;
    // the pull request the user names: a URL or a branch is kept as it is (validation withholds an odd one), never
    // dropped for a bare `gh pr merge`, which acts on the current branch's pull request
    const sel = prSelector(rq ? { ...ex, text: rq.rest, numbers: (rq.rest.match(/\d+/g) || []).map(Number), quoted: ex.quoted.filter((q) => rq.rest.includes(q)) } : ex);
    if (rq?.pr != null) v.pr = rq.pr;
    else if (sel != null) v.pr = String(sel).replace(/^#(?=\d)/, '');
    else if (rq) v.pr = '?';
    delete v.count;
  }
  if (has('wenv')) {
    const t = String(ex.text);
    if (WR_DRY.test(t) && !WR_DRY_NOT.test(t)) v.dryrun = '--dry-run';
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

exec
/bin/bash -lc "rg -n 'writeFile|mkdir|mkdtemp|rmSync|unlink|execFile|spawnSync' test/*.test.js; cat test/devtools.test.js; sed -n '260,420p' src/pipeline.js" in /workspace/tellsh
 succeeded in 0ms:
test/regressions12.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions12.test.js:73:    const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', ...q.split(' ')],
test/compose.test.js:47:  const { spawnSync } = await import('node:child_process');
test/compose.test.js:48:  const r = spawnSync('sh', ['-c', 'node bin/tellsh.js --dry-run show disk usage | head -c 1 >/dev/null; echo $?'], { encoding: 'utf8' });
test/regressions2.test.js:6:import { spawnSync } from 'node:child_process';
test/regressions2.test.js:8:import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
test/regressions2.test.js:25:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions2.test.js:171:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r2-'));
test/regressions2.test.js:174:    writeFileSync(hf, 'cat secret.txt\n');
test/regressions2.test.js:178:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions4.test.js:188:  const { spawnSync } = await import('node:child_process');
test/regressions4.test.js:189:  const { mkdtempSync, writeFileSync } = await import('node:fs');
test/regressions4.test.js:192:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r4-'));
test/regressions4.test.js:194:  writeFileSync(hist, 'rm -r old\nls newdir\n');
test/regressions4.test.js:195:  const r = spawnSync(process.execPath, ['bin/tellsh.js', '--dry-run', `--history=${hist}`, 'same', 'for', '/srv/current'], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/templates.test.js:3:import { execFileSync } from 'node:child_process';
test/templates.test.js:8:const roundTrip = (s) => execFileSync('bash', ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' });
test/regressions11.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions11.test.js:33:  const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', 'start', 'wrangler', 'dev'],
test/regressions11.test.js:84:  const sed = spawnSync('sh', ['-c', `DEV_TEXTS=/x.json; sed -n -e "s#^import { ctxFeatures } from '../src/history.js';#&\\nconst _devIndex = new Set(JSON.parse(readFileSync('$DEV_TEXTS', 'utf8')));#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
test/shells.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/shells.test.js:12:const has = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
test/shells.test.js:51:      const res = spawnSync(checker, args, { encoding: 'utf8' });
test/shells.test.js:65:    if (has('fish')) { const res = spawnSync('fish', ['-n', '-c', r.command]); if (res.status !== 0) bad.push(it.id); }
test/shells.test.js:112:    for (const sh of ['bash', 'sh']) assert.equal(execFileSync(sh, ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' }), s);
test/cli.test.js:3:import { spawnSync } from 'node:child_process';
test/cli.test.js:5:import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/cli.test.js:10:const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/cli.test.js:94:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-cli-'));
test/cli.test.js:97:    writeFileSync(f, 'echo SECRET_TOKEN=abc123\ncat notes.txt\n');
test/cli.test.js:103:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions10.test.js:9:import { spawnSync } from 'node:child_process';
test/regressions10.test.js:22:const cliJson = (...words) => JSON.parse(spawnSync(process.execPath, [BIN, '--json', '--shell', 'bash', '--os', 'linux', ...words],
test/regressions10.test.js:143:  const sed = spawnSync('sh', ['-c', `sed -n -e "s#^  const leaks = excl.has;\\$#  const leaks = (t) => excl.has(t) || isDevText(t);#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
test/regressions3-history.test.js:40:  assert.equal(run('delete it', ['cat old.txt; mkdir newdir']).command, 'rm -r newdir');
test/regressions3-history.test.js:42:  assert.equal(run('delete it', ['mkdir olddir; cat new.txt']).command, 'rm new.txt');
test/regressions3-history.test.js:60:  assert.equal(run('remove it', ['mkdir /srv/remove-backups', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:61:  assert.equal(run('delete it', ['mkdir /srv/delete-me', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:64:  assert.equal(run('usuń to', ['mkdir /srv/usun-stare', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:68:  const old = run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']);
test/regressions8.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions8.test.js:9:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/regressions8.test.js:22:const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/regressions8.test.js:53:  const ctx = buildContext(['cat a.txt', 'docker logs web', 'mkdir /tmp/b']);
test/regressions8.test.js:65:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r7-'));
test/regressions8.test.js:68:    writeFileSync(f, 'cat old.txt\nls\ncat new.txt\n');
test/regressions8.test.js:72:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions8.test.js:107:  const c = run('delete it', [`mkdir ${long}`]);
test/regressions8.test.js:194:test('minor: a NUL byte never reaches spawnSync', () => {
test/regressions7.test.js:73:  assert.equal(run('copy notes.txt to it', ['mkdir /tmp/n']).command, 'cp -ri notes.txt /tmp/n');
test/regressions7.test.js:127:    `awk 'BEGIN{system("rm -rf /")}'`, `node -e "require('fs').rmSync('/',{recursive:true})"`, 'chmod 000 /', 'chmod 000 /etc',
test/regressions9.test.js:9:import { spawnSync } from 'node:child_process';
test/regressions9.test.js:10:import { mkdtempSync, mkdirSync, writeFileSync, readdirSync, existsSync, rmSync } from 'node:fs';
test/regressions9.test.js:29:const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/regressions9.test.js:66:  for (const h of ['touch a.txt b.txt', 'rm -i a.txt b.txt', 'cat a.txt b.txt', 'mkdir /tmp/a /tmp/b']) {
test/regressions9.test.js:81:  for (const c of ['rm /etc/passwd', 'rm -f /etc/shadow', 'sudo rm -- /boot/vmlinuz', 'unlink /etc/hosts', 'sed -i d /etc/passwd',
test/regressions9.test.js:131:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r8-'));
test/regressions9.test.js:134:  const fetch = (from, to) => spawnSync(process.execPath, [join(ROOT, 'scripts/hybrid/fetch_model.js'), '--from', from, '--to', to], { encoding: 'utf8' });
test/regressions9.test.js:137:    mkdirSync(src, { recursive: true });
test/regressions9.test.js:138:    for (const f of FILES) writeFileSync(join(src, f), f);
test/regressions9.test.js:139:    writeFileSync(join(dir, 'src', 'evil'), 'payload');
test/regressions9.test.js:143:      writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files: { ...files, ...extra } }));
test/regressions9.test.js:152:    writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files: { ...files, 'vocab.json': sha(Buffer.from('other')) } }));
test/regressions9.test.js:156:    writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files }));
test/regressions9.test.js:160:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions6.test.js:45:  assert.equal(run('delete it', ['mkdir /tmp/new']).command, 'rm -r /tmp/new');
test/regressions6.test.js:78:  refused(run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']), '<PATH>', 'hint');
test/regressions6.test.js:81:  const ctx = buildContext(['mkdir /a', 'mkdir /b']);
test/regressions6.test.js:157:  assert.equal(run('copy notes.txt to it', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
test/regressions6.test.js:158:  assert.equal(run('skopiuj notes.txt do niego', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
test/regressions6.test.js:159:  assert.equal(run('move report.pdf into that folder', ['mkdir /srv/x']).command, 'mv -i report.pdf /srv/x');
test/regressions5.test.js:109:  assert.equal(run('move it to /tmp/old', ['mkdir /tmp/build']).command, 'mv -i /tmp/build /tmp/old');
test/pipeline.test.js:4:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/pipeline.test.js:93:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-hist-'));
test/pipeline.test.js:96:    writeFileSync(f, Array.from({ length: 50 }, (_, i) => `: 17000000${i}:0;echo ${i}`).join('\n') + '\n');
test/pipeline.test.js:100:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/regressions.test.js:7:import { mkdtempSync, writeFileSync, readFileSync, rmSync, chmodSync } from 'node:fs';
test/regressions.test.js:23:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions.test.js:27:const tmp = () => mkdtempSync(join(tmpdir(), 'tellsh-reg-'));
test/regressions.test.js:37:  const out = execFileSync('bash', ['-c', render("printf '[%s]' {file}«{dest}»", v).command], { encoding: 'utf8' });
test/regressions.test.js:52:    assert.equal(spawnSync('bash', ['-n', '-c', command]).status, 0, command);
test/regressions.test.js:66:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:175:  const out = execFileSync('sh', ['-c', `printf 'h1 ./a\\nh1 ./b\\nh2 ./c\\nh3 ./d\\nh3 ./e\\nh3 ./f\\n' | ${awk}`], { encoding: 'utf8' });
test/regressions.test.js:192:    writeFileSync(fake, `#!/bin/sh\nprintf '%s\\n' "$@" > '${out}'\nprintf '%s' "$TELLSH_PARSE_SRC" > '${out}.src'\nexit 0\n`);
test/regressions.test.js:198:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:279:    writeFileSync(join(dir, 'notes.txt'), 'hello\n');
test/regressions.test.js:280:    writeFileSync(f, 'ls\ncat notes.txt\n');
test/regressions.test.js:286:  } finally { rmSync(dir, { recursive: true, force: true }); }
// v0.4 developer-tool intents: slot extraction (EN/PL), per-shell rendering, risk.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildCommand } from '../src/fill.js';
import { BY_ID } from '../src/catalog.js';
import { FAMILY_OF } from '../src/tools.js';
import { NEW_INTENTS } from '../scripts/hybrid/sets.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const cmd = (id, text, env = BASH) => buildCommand(id, text, { env }).command;

test('every v0.4 intent is in the catalog and a tool family', () => {
  for (const id of NEW_INTENTS) {
    assert.ok(BY_ID[id], id);
    assert.ok(FAMILY_OF[id], id);
  }
});

const CASES = [
  ['npm_run_script', 'run the dev server with npm', 'npm run dev'],
  ['npm_run_script', 'npm run build', 'npm run build'],
  ['npm_run_script', 'odpal skrypt lint', 'npm run lint'],
  ['npm_run_script', 'odpal serwer deweloperski', 'npm run dev'],
  ['npm_run_script', 'odpal testy', 'npm run test'],
  ['npm_run_script', 'run the storybook script', 'npm run storybook'],
  ['npm_run_script', 'run my thing with npm', 'npm run <SCRIPT>'],
  ['npm_run_script', 'run the "test:e2e" script', 'npm run test:e2e'],
  ['npm_install', 'npm install', 'npm install'],
  ['npm_install', 'install axios in this project', 'npm install axios'],
  ['npm_install', 'yarn add zod', 'npm install zod'],
  ['npm_install_global', 'install typescript globally', 'npm install -g typescript'],
  ['npm_install_global', 'zainstaluj globalnie pakiet vercel', 'npm install -g vercel'],
  ['npm_install_global', 'npm i -g @angular/cli', 'npm install -g @angular/cli'],
  ['pip_install', 'pip install requests', 'python3 -m pip install requests'],
  ['pip_install', 'install numpy with pip', 'python3 -m pip install numpy'],
  ['pip_install', 'pip3 install pillow==10.4.0', 'python3 -m pip install pillow==10.4.0'],
  ['tool_version', 'what version of node do I have', 'node --version'],
  ['tool_version', 'jaka mam wersje pythona3? python3', 'python3 --version'],
  ['cli_help', 'show help for wrangler', 'wrangler --help'],
  ['print_line_range', 'show lines 120-180 of src/app.js', "sed -n '120,180p' src/app.js"],
  ['print_line_range', 'pokaż linie od 10 do 25 w config.yaml', "sed -n '10,25p' config.yaml"],
  ['print_line_range', 'lines 40 to 12 of main.py', "sed -n '12,40p' main.py"],
  ['ssh_port_forward', 'forward port 5432 from db.example.com', 'ssh -N -L 5432:localhost:5432 db.example.com'],
  ['ssh_port_forward', 'tunel ssh na port 8080 do ola@10.0.0.5', 'ssh -N -L 8080:localhost:8080 ola@10.0.0.5'],
  ['gh_pr_view', 'show PR 42', 'gh pr view 42'],
  ['gh_pr_view', 'show the current pull request', 'gh pr view'],
  ['gh_pr_checks', 'czy CI przeszło na PR 7', 'gh pr checks 7'],
  ['gh_run_view', 'show workflow run 81234567', 'gh run view 81234567'],
  ['wrangler_secret_put', 'set the API_KEY secret on my worker', 'npx wrangler secret put API_KEY'],
  ['activate_venv', 'activate the venv', '. .venv/bin/activate'],
  ['activate_venv', 'activate the virtualenv in ./env', '. ./env/bin/activate'],
];
for (const [id, text, want] of CASES) {
  test(`${id}: ${text}`, () => assert.equal(cmd(id, text), want));
}

test('installer words are not package names; apt installs keep working', () => {
  assert.equal(cmd('install_package', 'install npm'), 'sudo apt install npm');
  assert.equal(cmd('install_package', 'zainstaluj mi htop'), 'sudo apt install htop');
  assert.equal(cmd('install_package', 'apt install vim'), 'sudo apt install vim');
});

test('per-shell renders of the new intents', () => {
  const R = { script: 'dev', pkg: 'requests', cmd: 'node', start: 10, end: 20, file: 'app.log', port: 5432, target: 'db.example.com', num: 42, pr: 42 };
  const r = (id, env) => buildCommand(id, '', { env, resolved: { ...R } });
  const PS = { shell: 'powershell', os: 'win32' };
  const CMD = { shell: 'cmd', os: 'win32' };
  const FISH = { shell: 'fish', os: 'linux' };
  assert.equal(r('pip_install', PS).command, "py -m pip install 'requests'");
  assert.equal(r('pip_install', CMD).command, 'py -m pip install requests');
  assert.equal(r('tool_version', PS).command, "& 'node' --version");
  assert.equal(r('print_line_range', PS).command, "Get-Content -LiteralPath 'app.log' | Select-Object -Index ((10 - 1)..(20 - 1))");
  assert.equal(r('print_line_range', CMD).command, null);
  assert.match(r('print_line_range', CMD).gap, /cmd\.exe/);
  assert.equal(r('activate_venv', FISH).command, 'source .venv/bin/activate.fish');
  assert.equal(r('activate_venv', PS).command, "& (Join-Path '.venv' 'Scripts/Activate.ps1')");
  assert.equal(r('activate_venv', { shell: 'powershell', os: 'linux' }).command, "& (Join-Path '.venv' 'bin/Activate.ps1')");
  assert.equal(r('activate_venv', CMD).command, 'call .venv\\Scripts\\activate.bat');
  assert.equal(r('gh_pr_view', PS).command, 'gh pr view 42');
});

test('risk: installs, project scripts, deploys, merges and tunnels are never safe', () => {
  for (const id of ['npm_run_script', 'npm_install', 'npm_install_global', 'pip_install', 'activate_venv', 'wrangler_deploy',
    'wrangler_secret_put', 'wrangler_tail', 'wrangler_login', 'wrangler_whoami', 'gh_pr_create', 'gh_pr_merge', 'ssh_port_forward']) assert.notEqual(BY_ID[id].risk, 'safe', id);
  for (const id of ['gh_pr_list', 'gh_auth_status', 'tool_version', 'cli_help', 'print_line_range']) {
    assert.equal(BY_ID[id].risk, 'safe', id);
  }
  // a rendered safe command stays safe (no danger warnings)
  const r = buildCommand('print_line_range', '', { env: BASH, resolved: { file: 'a.txt', start: 1, end: 5 } });
  assert.equal(r.risk, 'safe');
});

test('raw numeric slots never take non-numbers', () => {
  const r = buildCommand('print_line_range', '', { env: BASH, resolved: { file: 'a.txt', start: '1;rm -rf /', end: 5 } });
  assert.doesNotMatch(r.command || '', /rm -rf/);
  const g = buildCommand('gh_pr_view', '', { env: BASH, resolved: { num: '$(id)' } });
  assert.doesNotMatch(g.command || '', /\$\(id\)/);
});
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

exec
/bin/bash -lc "python3 -B - <<'PY'
import ast
p='scripts/hybrid/train_encoder.py'
t=ast.parse(open(p).read())
n=next(n for n in ast.walk(t) if isinstance(n, ast.Assign) and any(isinstance(x,ast.Name) and x.id=='loss' for x in n.targets))
print('loss line:',n.lineno)
print(ast.dump(n.value,indent=2))
PY" in /workspace/tellsh
 succeeded in 0ms:
loss line: 148
BinOp(
  left=BinOp(
    left=Call(
      func=Name(id='ce', ctx=Load()),
      args=[
        Name(id='lt', ctx=Load()),
        Name(id='yt', ctx=Load())]),
    op=Add(),
    right=IfExp(
      test=Call(
        func=Attribute(
          value=Compare(
            left=Name(id='yi', ctx=Load()),
            ops=[
              GtE()],
            comparators=[
              Constant(value=0)]),
          attr='any',
          ctx=Load())),
      body=Call(
        func=Name(id='ce', ctx=Load()),
        args=[
          Name(id='li', ctx=Load()),
          Name(id='yi', ctx=Load())]),
      orelse=Constant(value=0))),
  op=Add(),
  right=BinOp(
    left=Constant(value=0.5),
    op=Mult(),
    right=IfExp(
      test=Call(
        func=Attribute(
          value=Compare(
            left=Name(id='ytag', ctx=Load()),
            ops=[
              GtE()],
            comparators=[
              Constant(value=0)]),
          attr='any',
          ctx=Load())),
      body=Call(
        func=Name(id='ce', ctx=Load()),
        args=[
          Call(
            func=Attribute(
              value=Name(id='lg', ctx=Load()),
              attr='reshape',
              ctx=Load()),
            args=[
              UnaryOp(
                op=USub(),
                operand=Constant(value=1)),
              Subscript(
                value=Attribute(
                  value=Name(id='lg', ctx=Load()),
                  attr='shape',
                  ctx=Load()),
                slice=UnaryOp(
                  op=USub(),
                  operand=Constant(value=1)),
                ctx=Load())]),
          Call(
            func=Attribute(
              value=Name(id='ytag', ctx=Load()),
              attr='reshape',
              ctx=Load()),
            args=[
              UnaryOp(
                op=USub(),
                operand=Constant(value=1))])]),
      orelse=Constant(value=0))))

exec
/bin/bash -lc "sed -n '1,235p' src/danger.js; sed -n '1,190p' src/shellwords.js" in /workspace/tellsh
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

exec
/bin/bash -lc "rg -n '"'^export|''^function|''^const [A-Z]|gh |wrangler|sameFor'"' src/history.js" in /workspace/tellsh
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
484:    // `export GH_REPO=a/b; gh pr view 45`, `$env:DOCKER_HOST = …`: the later commands of the line are scoped as well
580:    // `gh pr view 45; export GH_REPO=other/repo`: the pull request is one of the old repository
596:const FS_LISTERS = new Set(['ls', 'tree', 'dir', 'gci', 'get-childitem', 'll', 'la', 'find', 'fd', 'fdfind', 'locate', 'mlocate', 'plocate',
598:const FS_SEARCHERS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'select-string', 'sls', 'findstr']);
599:const PROC_LISTERS = new Set(['ps', 'top', 'htop', 'btop', 'atop', 'pgrep', 'pidof', 'pstree', 'get-process', 'gps', 'tasklist']);
601:const GLOBAL_VALUE_OPTS = {
609:const SCOPE_OPTS = {
613:  // gh has no global options: GH_REPO / GH_HOST (also exported earlier in the line) point it at another repository
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
833:    // `gh pr view 45`, `gh pr checkout feature/x`, `gh pr merge <url>`: the pull request ("merge that pr"); none named is
835:    // selector of the line is replaced: `gh pr view 45; gh pr view` is about the current branch's pull request)
841:    // `gh pr list`, `gh pr status`, `gh pr create`: several pull requests, or one with no number yet
922:const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url', 'pr'];
923:// gh pr subcommands whose operand selects one pull request, and the options of those that take a value
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
1023:const PRONOUN_PL = /(?:^|\s)(tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym)(?=\s|$|[?!.,])|(?:^|\s)to(?=\s*[?!.]*$|\s+(?:co|ktor\w*|tam)\b)|(?:^\s*|(?:^|\s)(?:zmerguj|scal|pokaz|zobacz|otworz|zamknij|sprawdz|wyswietl|zatwierdz|zaakceptuj|przejrzyj)\S*\s+)to(?=\s+(?:prs?\b|pull[\s-]+requests?\b))/;
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
1135:  const arg = sameFor(query);
1228:function locativeRef(fq, ctx) {
1248:export function changeGuard(type, value, fq, ctx) {
1274:const HINTED_NOUN = /\b(?:that|this|those|these|the|ten|ta|te|tamten|tamta|tamte)\s+([a-z0-9][\w.-]*)\s+(?:folders?|director(?:y|ies)|dirs?|files?|branch(?:es)?|containers?|services?|process(?:es)?|katalog\w*|folder\w*|plik\w*|kontener\w*|uslug\w*|galaz\w*|galez\w*)\b/g;
1276:const NOT_HINT = /^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back|list\w*|wylistuj\w*|check|sprawdz\w*|wipe|nuke|purge|destroy|clear|clean\w*|wyczysc\w*|drop|what|which|where|about|with|from|into|then|also|again|teraz|jeszcze|whatever|everything|anything|something|thing|stuff|still|there|here|tutaj|tamto|wszystko|cokolwiek|whole|entire|completely|cale|calym|listening|running|working|executable|wykonywaln\w*|contents?|zawartosc\w*|entries|inside|wewnatrz|siedzi|srodku|please|prosze|again|ponownie|znowu|forcefully|recursively|rekurencyjnie|permanently|trwale|names?|nazw\w*|only|tylko|same|samo|thing|merged|zmergowan\w*|scalon\w*|current|biezac\w*|aktualn\w*|obecn\w*|previous|poprzedni\w*|ostatni\w*|last|other|inn\w*|empty|pust\w*|temporary|tymczasow\w*|local|lokaln\w*|remote|zdaln\w*|stopped|zatrzyman\w*|created|utworzon\w*|newly|nowo|nowy|nowa|nowe|nowym|whole|cal\w*|samym|given|mentioned|wspomnian\w*|above|powyzsz\w*|broken|zepsut\w*|failed|failing|nieudan\w*|old\w*|star\w*)$/;
1281:export function entityForSlot(slot, ctx) {
1293:const SAME_BUT = [/^\s*(?:and\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?,?\s+but\s+(.+)$/, /^\s*(?:a\s+|i\s+)?(?:to\s+)?samo,?\s+ale\s+(.+)$/,
1296:export function sameBut(query, ctx) {
1306:function intentUses(intent, ent) {
1310:function pickEnt(intent, ent, ctx) {

exec
/bin/bash -lc 'cat scripts/lib/heldout.js scripts/real/real_rows.js scripts/lib/confusable.js scripts/hybrid/prune_vocab.py' in /workspace/tellsh
 succeeded in 0ms:
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
// Confusable intent groups (from the v0.2 eval confusions and the catalog) and contrastive rewrite rules
// used by scripts/teacher.js: the teacher always sees the confusable intents as options, and `mine`
// rewrites training rows of one intent into candidate rows of its neighbour, which the teacher must confirm.
const GROUPS = [
  ['find_symlinks', 'broken_symlinks', 'create_symlink'],
  ['find_process', 'service_status', 'kill_by_name', 'top_cpu'],
  ['git_push', 'git_pull', 'git_clone', 'git_commit'],
  ['empty_files', 'empty_dirs', 'find_by_ext', 'find_smaller_than'],
  ['list_files', 'list_tree', 'hidden_files', 'find_by_ext'],
  ['disk_free', 'block_devices', 'disk_mounts', 'dir_size'],
  ['users_logged_in', 'last_logins', 'whoami'],
  ['show_path', 'which_cmd', 'env_var_get', 'env_vars'],
  ['file_type', 'file_stat'],
  ['listening_ports', 'process_on_port', 'port_check', 'kill_by_port'],
  ['docker_ps', 'docker_ps_all', 'docker_images', 'docker_stats'],
  ['service_restart', 'service_start', 'service_stop', 'service_enable'],
  ['ip_addresses', 'public_ip', 'routes'],
];
export const CONFUSABLE = {};
for (const g of GROUPS) for (const a of g) CONFUSABLE[a] = [...new Set([...(CONFUSABLE[a] || []), ...g.filter((b) => b !== a)])];

// from -> target: regex on the training text of `from`, replacement making it a `target` request;
// `bad`: rewrites matching it read wrong ("push … from origin") and are not generated
// word boundaries that understand Polish letters (\b does not)
const W = (src, tail = true) => new RegExp(`(?<![\\p{L}\\d_])(?:${src})${tail ? '(?![\\p{L}\\d_])' : ''}`, 'iu');
export const CONTRAST_RULES = [
  // symlinks <-> broken symlinks
  { from: 'find_symlinks', target: 'broken_symlinks', lang: 'en', re: W(String.raw`(symbolic links|symlinks|soft links|links)`), to: 'broken $1' },
  { from: 'find_symlinks', target: 'broken_symlinks', lang: 'pl', re: W(String.raw`(dowiązania symboliczne|dowiazania symboliczne|dowiązania|dowiazania|symlinki|linki symboliczne)`), to: 'zepsute $1' },
  { from: 'broken_symlinks', target: 'find_symlinks', lang: 'en', re: W(String.raw`(broken|dangling|dead|orphaned)\s+`, false), to: '' },
  { from: 'broken_symlinks', target: 'find_symlinks', lang: 'pl', re: W(String.raw`(zepsute|martwe|wiszące|wiszace|uszkodzone|niedziałające|niedzialajace)\s+`, false), to: '' },
  // push <-> pull
  { from: 'git_push', target: 'git_pull', lang: 'en', re: W(String.raw`push`), to: 'pull', bad: /\b(to|onto|into)\b/i },
  { from: 'git_pull', target: 'git_push', lang: 'en', re: W(String.raw`pull`), to: 'push', bad: /\bfrom\b/i },
  { from: 'git_push', target: 'git_pull', lang: 'pl', re: W(String.raw`(wypchnij|wypchnąć|wypchnac|wyślij|wyslij|pushnij)`), to: 'ściągnij', bad: /(?<![\p{L}])(na|do)(?![\p{L}])/iu },
  { from: 'git_pull', target: 'git_push', lang: 'pl', re: W(String.raw`(ściągnij|sciagnij|pobierz|zaciągnij|zaciagnij|pullnij)`), to: 'wypchnij', bad: /(?<![\p{L}])(z|ze)(?![\p{L}])/iu },
  // process <-> service
  { from: 'find_process', target: 'service_status', lang: 'en', re: W(String.raw`process(es)?`), to: 'service' },
  { from: 'service_status', target: 'find_process', lang: 'en', re: W(String.raw`(service|daemon|unit)`), to: 'process' },
  { from: 'find_process', target: 'service_status', lang: 'pl', re: W(String.raw`proces(y|u|ów)?`), to: 'usługa' },
  { from: 'service_status', target: 'find_process', lang: 'pl', re: W(String.raw`(usługa|usługi|usługę|serwis)`), to: 'proces' },
  // empty files <-> empty dirs
  { from: 'empty_files', target: 'empty_dirs', lang: 'en', re: W(String.raw`files`), to: 'directories' },
  { from: 'empty_dirs', target: 'empty_files', lang: 'en', re: W(String.raw`(directories|folders|dirs)`), to: 'files' },
  { from: 'empty_files', target: 'empty_dirs', lang: 'pl', re: W(String.raw`pliki`), to: 'katalogi' },
  { from: 'empty_dirs', target: 'empty_files', lang: 'pl', re: W(String.raw`(katalogi|foldery)`), to: 'pliki' },
  // disk free <-> block devices
  { from: 'disk_free', target: 'block_devices', lang: 'en', re: W(String.raw`(free|available) (disk )?space`), to: 'disks and partitions' },
  { from: 'block_devices', target: 'disk_free', lang: 'en', re: W(String.raw`(block devices|disks|drives|partitions)`), to: 'free space on the disks' },
  // logged in <-> last logins
  { from: 'users_logged_in', target: 'last_logins', lang: 'en', re: W(String.raw`(is|are) (currently )?logged in`), to: 'logged in recently' },
  { from: 'users_logged_in', target: 'last_logins', lang: 'pl', re: W(String.raw`jest (teraz )?zalogowany`), to: 'się ostatnio logował' },
  // PATH <-> which
  { from: 'which_cmd', target: 'show_path', lang: 'en', re: W(String.raw`where is ([\w.-]+)( installed)?`), to: 'what directories are in my PATH' },
  // list files <-> hidden files
  { from: 'list_files', target: 'hidden_files', lang: 'en', re: W(String.raw`files`), to: 'hidden files' },
  { from: 'list_files', target: 'hidden_files', lang: 'pl', re: W(String.raw`pliki`), to: 'ukryte pliki' },
  // docker ps <-> ps -a
  { from: 'docker_ps', target: 'docker_ps_all', lang: 'en', re: W(String.raw`(running )?containers`), to: 'all containers, including stopped ones' },
  { from: 'docker_ps', target: 'docker_ps_all', lang: 'pl', re: W(String.raw`(działające |dzialajace )?kontenery`), to: 'wszystkie kontenery, także zatrzymane' },
  // restart <-> stop
  { from: 'service_restart', target: 'service_stop', lang: 'en', re: W(String.raw`restart`), to: 'stop' },
  { from: 'service_stop', target: 'service_restart', lang: 'en', re: W(String.raw`stop`), to: 'restart' },
  { from: 'service_restart', target: 'service_stop', lang: 'pl', re: W(String.raw`zrestartuj`), to: 'zatrzymaj' },
  { from: 'service_stop', target: 'service_restart', lang: 'pl', re: W(String.raw`zatrzymaj`), to: 'zrestartuj' },
];
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
The existing regression tests cover many of the recent fixes. I’m now checking nearby cases: explicitly named deployment environments, pull request selectors, and the hybrid training/export path.
exec
/bin/bash -lc "node --input-type=module - <<'JS'
import {readdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const skip=new Set(['cli.test.js','pipeline.test.js','regressions.test.js','regressions2.test.js','regressions4.test.js','regressions8.test.js','regressions9.test.js']);
const files=readdirSync('test').filter(x=>x.endsWith('.test.js')&&"'!skip.has(x)).map(x=>'"'test/'+x);
const r=spawnSync(process.execPath,['--test',...files],{encoding:'utf8',maxBuffer:8*1024*1024});
console.log(r.stdout.split('\\n').filter((x,i,a)=>x.startsWith('not ok')||x.startsWith('# tests')||x.startsWith('# pass')||x.startsWith('# fail')||x.startsWith('# duration')).join('\\n'));console.log(r.stderr);console.log('exit',r.status,'files',files.length);
JS" in /workspace/tellsh
exec
/bin/bash -lc "rg --files build/hybrid hybrid/models | head -45; sed -n '765,858p' src/history.js; sed -n '1090,1230p' src/history.js" in /workspace/tellsh
 succeeded in 0ms:
hybrid/models/enc-v1-old/vocab.json
hybrid/models/enc-v1-old/export_report.json
hybrid/models/enc-v1-old/manifest.json
hybrid/models/enc-v1-old/labels.json
hybrid/models/enc/vocab.json
hybrid/models/enc/export_report.json
hybrid/models/enc/manifest.json
hybrid/models/enc/labels.json
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
build/hybrid/lm_adev_qwenft_r8leak.jsonl
build/hybrid/cands_ship.jsonl
build/hybrid/results_ft.json
build/hybrid/lm_score_dev_r10.log
build/hybrid/cands_adev.jsonl
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
build/hybrid/meta.json
build/hybrid/dev_texts.json
build/hybrid/policy_ft.json
build/hybrid/train_enc-v04-leak.log
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
  host: ['host', 'target'], url: ['url'], file: ['file', 'src', 'path'], dir: ['path', 'src'], pr: ['pr'],
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

 succeeded in 5759ms:


exit 1 files 28

exec
/bin/bash -lc "node --input-type=module - <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const q of ['deploy worker to staging without publishing','deploy worker to staging without actually deploying','deploy worker to the blue environment','deploy worker to blue env','deploy worker --env=staging','deploy worker with --dry-run=false','deploy worker to development not production','merge pr 45 and 46','merge prs 45 and 46','merge pr from branch main','merge the pr for issue 45','show help for ./script.sh','show version of ./script.sh','npm install foo bar','npm install --ignore-scripts','install requests>=2.0 with pip','print lines 10 through 20 of app2.log']) {
const r=suggest(q,{env});console.log(JSON.stringify({q,intent:r.intent,cmd:r.command,missing:r.missing,risk:r.risk,understood:r.understood,method:r.method}));
}
JS" in /workspace/tellsh
 succeeded in 103ms:
{"q":"deploy worker to staging without publishing","intent":"wrangler_deploy","cmd":"npx wrangler deploy --dry-run --env staging","missing":[],"risk":"medium","understood":true,"method":"catalog"}
{"q":"deploy worker to staging without actually deploying","intent":"wrangler_deploy","cmd":"npx wrangler deploy --dry-run --env staging","missing":[],"risk":"medium","understood":true,"method":"catalog"}
{"q":"deploy worker to the blue environment","intent":"wrangler_deploy","cmd":"npx wrangler deploy --env <WENV>","missing":["wenv"],"risk":"medium","understood":true,"method":"catalog"}
{"q":"deploy worker to blue env","intent":"wrangler_deploy","cmd":"npx wrangler deploy --env <WENV>","missing":["wenv"],"risk":"medium","understood":true,"method":"catalog"}
{"q":"deploy worker --env=staging","intent":"wrangler_deploy","cmd":"npx wrangler deploy --env staging","missing":[],"risk":"medium","understood":true,"method":"catalog"}
{"q":"deploy worker with --dry-run=false","intent":"wrangler_deploy","cmd":"npx wrangler deploy --dry-run","missing":[],"risk":"medium","understood":true,"method":"catalog"}
{"q":"deploy worker to development not production","intent":"wrangler_deploy","cmd":"npx wrangler deploy --env development","missing":[],"risk":"medium","understood":true,"method":"catalog"}
{"q":"merge pr 45 and 46","intent":"gh_pr_merge","cmd":"gh pr merge 45","missing":[],"risk":"medium","understood":true,"method":"catalog"}
{"q":"merge prs 45 and 46","intent":"gh_pr_merge","cmd":"gh pr merge 45","missing":[],"risk":"medium","understood":true,"method":"catalog"}
{"q":"merge pr from branch main","intent":"gh_pr_merge","cmd":"gh pr merge main","missing":[],"risk":"medium","understood":true,"method":"catalog"}
{"q":"merge the pr for issue 45","intent":"gh_pr_merge","cmd":"gh pr merge <PR>","missing":["pr"],"risk":"medium","understood":true,"method":"catalog"}
{"q":"show help for ./script.sh","intent":"cli_help","cmd":"<CMD> --help","missing":["cmd"],"risk":"medium","understood":true,"method":"catalog"}
{"q":"show version of ./script.sh","intent":"tool_version","cmd":"<CMD> --version","missing":["cmd"],"risk":"medium","understood":true,"method":"catalog"}
{"q":"npm install foo bar","intent":"npm_install","cmd":"npm install foo","missing":[],"risk":"medium","understood":true,"method":"catalog"}
{"q":"npm install --ignore-scripts","intent":"npm_install","cmd":"npm install <PKG>","missing":["pkg"],"risk":"medium","understood":true,"method":"catalog"}
{"q":"install requests>=2.0 with pip","intent":"pip_install","cmd":"python3 -m pip install 'requests>=2.0'","missing":[],"risk":"medium","understood":true,"method":"catalog"}
{"q":"print lines 10 through 20 of app2.log","intent":"print_line_range","cmd":"sed -n '10,20p' app2.log","missing":[],"risk":"safe","understood":true,"method":"catalog"}

exec
/bin/bash -lc 'node --test test/regressions23.test.js' in /workspace/tellsh
 succeeded in 369ms:
TAP version 13
# Subtest: /workspace/tellsh/test/regressions23.test.js
ok 1 - /workspace/tellsh/test/regressions23.test.js
  ---
  duration_ms: 379.444826
  ...
1..1
# tests 1
# suites 0
# pass 1
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 384.938224

exec
/bin/bash -lc 'cat scripts/hybrid/lm_rerank.py' in /workspace/tellsh
 succeeded in 0ms:
#!/usr/bin/env python3
"""(C) System-1-style decision model: a tiny causal LM scores A's top-k candidate intents in ONE forward pass.

Prompt lists the candidates as options A..E (catalog descriptions); the next-token logits of the letters give a
distribution over the candidates.  Sub-commands:

  zeroshot  --model ID --set dev --n 300 [--fewshot]      accuracy of picking the gold among the candidates
  train     --model ID --out DIR [--lora] [--steps N]     fine-tune on training rows (letters shuffled), resumable
  score     --model DIR|ID --cands build/hybrid/cands_X.jsonl --out build/hybrid/lm_X.jsonl   letter probs for all rows
  export    --model DIR --out build/hybrid/lm.onnx         ONNX (last-position letter logits only) + int8 quantisation

Candidates come from scripts/hybrid/dump_cascade.js (A's top-k).  For training the gold is forced into the list
(replacing the last candidate if missing) and the order is shuffled so the letter position carries no information.
"""
import argparse, json, math, os, random, sys, time
import torch

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
LETTERS = 'ABCDE'
K = 5
SYSTEM = "You map a user's request to the matching shell-command intent. Reply with a single letter."


def meta():
    return json.load(open(os.path.join(ROOT, 'build/hybrid/meta.json')))


def opt_text(intent, desc):
    return f"{desc} ({intent.replace('_', ' ')})"


def prompt_body(text, shell, os_, cands, desc):
    lines = [f"Request: {text}", f"Shell: {shell} ({os_})", "Options:"]
    for L, c in zip(LETTERS, cands):
        lines.append(f"{L}) {opt_text(c, desc[c])}")
    lines.append("Answer:")
    return '\n'.join(lines)


FEWSHOT = [
    ("pokaż ukryte pliki w ~/projekt", "bash", "linux", ['list_files', 'hidden_files', 'find_by_name', 'list_tree', 'recent_files'], 1),
    ("which process listens on 8080", "zsh", "darwin", ['listening_ports', 'kill_by_port', 'process_on_port', 'port_check', 'find_process'], 2),
]


class Prompter:
    def __init__(self, tok, chat, fewshot=False):
        self.tok, self.chat, self.fewshot = tok, chat, fewshot
        self.desc = meta()['descriptions']
        ids = [tok.encode(L, add_special_tokens=False) for L in LETTERS]
        ids_sp = [tok.encode(' ' + L, add_special_tokens=False) for L in LETTERS]
        self.letter_ids = [i[-1] for i in ids]
        self.letter_ids_sp = [i[-1] for i in ids_sp]

    def __call__(self, text, shell, os_, cands):
        body = prompt_body(text, shell, os_, cands, self.desc)
        if not self.chat:
            return body + ' '  # plain format used for fine-tuning: "Answer: X"
        msgs = [{'role': 'system', 'content': SYSTEM}]
        if self.fewshot:
            for t, s, o, c, g in FEWSHOT:
                msgs += [{'role': 'user', 'content': prompt_body(t, s, o, c, self.desc)}, {'role': 'assistant', 'content': LETTERS[g]}]
        msgs.append({'role': 'user', 'content': body})
        return self.tok.apply_chat_template(msgs, tokenize=False, add_generation_prompt=True)


def candidate_list(row, rng=None, train=False):
    cands = [c['intent'] for c in row['cands'][:K]]
    gold = row.get('intent')
    if train and gold and gold not in cands:
        cands = cands[:K - 1] + [gold]
    if train:
        allints = meta()['intents']
        while len(cands) < K:
            x = rng.choice(allints)
            if x not in cands:
                cands.append(x)
        rng.shuffle(cands)
    return cands


def load(model_id, dtype=torch.float32):
    from transformers import AutoModelForCausalLM, AutoTokenizer
    tok = AutoTokenizer.from_pretrained(model_id)
    m = AutoModelForCausalLM.from_pretrained(model_id, dtype=dtype)
    m.eval()
    return tok, m


@torch.no_grad()
def letter_logits(m, tok, prompts, letter_ids, bs=8):
    tok.padding_side = 'left'
    if tok.pad_token is None:
        tok.pad_token = tok.eos_token
    out = []
    for i in range(0, len(prompts), bs):
        enc = tok(prompts[i:i + bs], return_tensors='pt', padding=True, add_special_tokens=False)
        lg = m(**enc, logits_to_keep=1).logits[:, -1, :]
        out += lg[:, letter_ids].float().tolist()
    return out


def read_cands(path, sets=None):
    rows = [json.loads(l) for l in open(path, encoding='utf-8')]
    return [r for r in rows if sets is None or r['set'] in sets]


def cmd_zeroshot(a):
    tok, m = load(a.model, getattr(torch, a.dtype))
    chat = tok.chat_template is not None and not a.plain
    P = Prompter(tok, chat, a.fewshot)
    rows = [r for r in read_cands(a.cands, {a.set}) if r['intent']]
    random.Random(1).shuffle(rows)
    rows = rows[:a.n]
    rng = random.Random(5)
    lists = [candidate_list(r, rng, train=True) for r in rows]  # gold forced in, shuffled: pure choice accuracy
    prompts = [P(r['text'], r['shell'], r['os'], c) for r, c in zip(rows, lists)]
    ntok = sum(len(tok(p, add_special_tokens=False)['input_ids']) for p in prompts) / len(prompts)
    t0 = time.time()
    best = None
    for name, lid in (('nosp', P.letter_ids), ('sp', P.letter_ids_sp)):
        lg = letter_logits(m, tok, prompts, lid)
        acc = sum(c[max(range(K), key=lambda j: l[j])] == r['intent'] for r, c, l in zip(rows, lists, lg)) / len(rows)
        langs = {}
        for r, c, l in zip(rows, lists, lg):
            langs.setdefault(r['lang'], []).append(c[max(range(K), key=lambda j: l[j])] == r['intent'])
        res = {'model': a.model, 'dtype': a.dtype, 'set': a.set, 'n': len(rows), 'fewshot': a.fewshot, 'chat': chat, 'letters': name, 'acc': round(acc, 4),
               **{f'acc_{k}': round(sum(v) / len(v), 4) for k, v in langs.items()}, 'prompt_tokens': round(ntok, 1),
               'sec_per_row_multithread': round((time.time() - t0) / len(rows), 3)}
        print(json.dumps(res), flush=True)
        t0 = time.time()
        with open(os.path.join(ROOT, 'build/hybrid/zeroshot.jsonl'), 'a') as f:
            f.write(json.dumps(res) + '\n')


def cmd_train(a):
    from transformers import AutoModelForCausalLM, AutoTokenizer
    torch.manual_seed(0)
    tok = AutoTokenizer.from_pretrained(a.model)
    m = AutoModelForCausalLM.from_pretrained(a.model, dtype=torch.float32)
    if a.lora:
        from peft import LoraConfig, get_peft_model
        m = get_peft_model(m, LoraConfig(r=16, lora_alpha=32, lora_dropout=0.05, target_modules=['q_proj', 'k_proj', 'v_proj', 'o_proj', 'gate_proj', 'up_proj', 'down_proj']))
    P = Prompter(tok, chat=False)
    rows = read_cands(a.cands, {'train'})
    rng = random.Random(11)
    rng.shuffle(rows)
    os.makedirs(a.out, exist_ok=True)
    ck = os.path.join(a.out, 'ckpt.pt')
    params = [p for p in m.parameters() if p.requires_grad]
    opt = torch.optim.AdamW(params, lr=a.lr, weight_decay=0.0)
    step = 0
    if os.path.exists(ck):
        st = torch.load(ck, map_location='cpu', weights_only=False)
        m.load_state_dict(st['model'], strict=False); opt.load_state_dict(st['opt']); step = st['step']
        print('resumed', step, flush=True)
    sched = lambda s: min(1.0, (s + 1) / 30) * max(0.05, 1 - s / a.steps)
    m.train()
    t0 = time.time()
    tok.padding_side = 'left'
    if tok.pad_token is None:
        tok.pad_token = tok.eos_token
    lid = torch.tensor(P.letter_ids)
    while step < a.steps:
        batch = [rows[(step * a.bs + j) % len(rows)] for j in range(a.bs)]
        brng = random.Random(1000 + step)
        lists = [candidate_list(r, brng, train=True) for r in batch]
        prompts = [P(r['text'], r['shell'], r['os'], c) for r, c in zip(batch, lists)]
        y = torch.tensor([c.index(r['intent']) for r, c in zip(batch, lists)])
        for g in opt.param_groups:
            g['lr'] = a.lr * sched(step)
        opt.zero_grad()
        # micro-batches (--accum) bound activation memory: fp32 batch-8 backward needs ~8 GB on this model
        mb = math.ceil(a.bs / a.accum)
        tot = 0.0
        for i in range(0, a.bs, mb):
            enc = tok(prompts[i:i + mb], return_tensors='pt', padding=True, pad_to_multiple_of=32, add_special_tokens=False)
            lg = m(**enc, logits_to_keep=1).logits[:, -1, :][:, lid]  # cross-entropy over the 5 letters only
            part = torch.nn.functional.cross_entropy(lg, y[i:i + mb], reduction='sum') / a.bs
            part.backward()
            tot += part.item()
        loss = torch.tensor(tot)
        torch.nn.utils.clip_grad_norm_(params, 1.0); opt.step(); step += 1
        if step % 10 == 0:
            rss = int(open('/proc/self/statm').read().split()[1]) * 4096 / 2**30 if os.path.exists('/proc/self/statm') else 0
            print(f'step {step}/{a.steps} loss {loss.item():.4f} {time.time() - t0:.0f}s rss {rss:.1f}G', flush=True)
        if step % 50 == 0 or step == a.steps:
            sd = {k: v for k, v in m.state_dict().items() if (not a.lora) or 'lora' in k}
            torch.save({'model': sd, 'opt': opt.state_dict(), 'step': step}, ck + '.tmp'); os.replace(ck + '.tmp', ck)
    if a.lora:
        m = m.merge_and_unload()
    m.save_pretrained(os.path.join(a.out, 'final')); tok.save_pretrained(os.path.join(a.out, 'final'))
    print('done', flush=True)


def cmd_score(a):
    tok, m = load(a.model, getattr(torch, a.dtype))
    chat = (tok.chat_template is not None) and not a.plain
    P = Prompter(tok, chat, a.fewshot)
    rows = read_cands(a.cands, set(a.sets.split(',')))
    done = set()
    if os.path.exists(a.out):
        done = {(json.loads(l)['set'], json.loads(l)['i']) for l in open(a.out)}
    # rows A would defer (conf < --max-conf) + a uniform random sample (--sample, fraction) for "C alone"
    def pick(r):
        r['sample'] = random.Random(f"{r['set']}:{r['i']}").random() < a.sample
        return r['conf'] < a.max_conf or r['sample']
    rows = [r for r in rows if (r['set'], r['i']) not in done and pick(r)]
    lid = P.letter_ids if not chat else P.letter_ids
    with open(a.out, 'a') as f:
        for i in range(0, len(rows), 64):
            chunk = rows[i:i + 64]
            lists = [candidate_list(r) for r in chunk]
            lg = letter_logits(m, tok, [P(r['text'], r['shell'], r['os'], c) for r, c in zip(chunk, lists)], lid)
            for r, c, l in zip(chunk, lists, lg):
                f.write(json.dumps({'set': r['set'], 'i': r['i'], 'sample': r['sample'], 'cands': c, 'logits': [round(x, 4) for x in l[:len(c)]]}) + '\n')
            f.flush()
            print(f'{i + len(chunk)}/{len(rows)}', flush=True)


def cmd_export(a):
    from onnxruntime.quantization import quantize_dynamic, QuantType
    tok, m = load(a.model)
    P = Prompter(tok, chat=False)
    lid = torch.tensor(P.letter_ids)

    class Head(torch.nn.Module):
        def __init__(s, m):
            super().__init__(); s.m = m

        def forward(s, input_ids, attention_mask):
            out = s.m(input_ids=input_ids, attention_mask=attention_mask, use_cache=False, logits_to_keep=1).logits
            return out[:, -1, :][:, lid]

    m.config.use_cache = False
    ex = tok(['Request: x\nAnswer: '], return_tensors='pt')
    fp = a.out.replace('.onnx', '.fp32.onnx')
    torch.onnx.export(Head(m), (ex['input_ids'], ex['attention_mask']), fp, input_names=['input_ids', 'attention_mask'],
                      output_names=['letters'], dynamic_axes={'input_ids': {0: 'b', 1: 't'}, 'attention_mask': {0: 'b', 1: 't'}, 'letters': {0: 'b'}},
                      opset_version=17, dynamo=False)
    quantize_dynamic(fp, a.out, weight_type=QuantType.QInt8)
    print('exported', a.out, os.path.getsize(a.out) / 1e6, 'MB')


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('cmd')
    ap.add_argument('--model', default='HuggingFaceTB/SmolLM2-135M-Instruct')
    ap.add_argument('--cands', default=os.path.join(ROOT, 'build/hybrid/cands_ship.jsonl'))
    ap.add_argument('--set', default='dev')
    ap.add_argument('--sets', default='dev,eval,shell,blind')
    ap.add_argument('--n', type=int, default=300)
    ap.add_argument('--fewshot', action='store_true')
    ap.add_argument('--plain', action='store_true')
    ap.add_argument('--lora', action='store_true')
    ap.add_argument('--steps', type=int, default=600)
    ap.add_argument('--bs', type=int, default=8)
    ap.add_argument('--accum', type=int, default=1, help='split each batch into this many micro-batches')
    ap.add_argument('--lr', type=float, default=1e-4)
    ap.add_argument('--threads', type=int, default=2)
    ap.add_argument('--max-conf', type=float, default=2.0)
    ap.add_argument('--sample', type=float, default=1.0)
    ap.add_argument('--dtype', default='float32', help='bfloat16 halves memory (inference)')
    ap.add_argument('--out', default=os.path.join(ROOT, 'build/hybrid/lm'))
    a = ap.parse_args()
    torch.set_num_threads(a.threads)
    {'zeroshot': cmd_zeroshot, 'train': cmd_train, 'score': cmd_score, 'export': cmd_export}[a.cmd](a)

exec
/bin/bash -lc "cat scripts/hybrid/dump_cascade.js scripts/hybrid/sets.js; sed -n '1,170p' scripts/hybrid/eval_hybrid.js; sed -n '1,120p' src/cli.js; sed -n '190,258p' src/cli.js" in /workspace/tellsh
 succeeded in 0ms:
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

exec
/bin/bash -lc "sed -n '398,585p' src/slots.js; sed -n '505,672p' src/danger.js; sed -n '1,110p' src/model.js" in /workspace/tellsh
 succeeded in 0ms:
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
// "install requests==2.32.0 with pip": the package word with its version constraint / extras is the whole requirement
// (never the bare name, an unrestricted install); validation withholds one that is not a requirement
function withConstraint(text, w) {
  const t = String(text).split(/\s+/).map((x) => x.replace(/^["'(]+|["').!?]+$/g, '')).find((x) => x.length > w.length && x.toLowerCase().startsWith(String(w).toLowerCase()) && /^[=<>~!@^[]/.test(x.slice(w.length)));
  if (t == null) return w;
  // `django>=4,<5`: the comma-separated rest of the specifier
  const m = String(text).match(new RegExp(`(?:^|\\s)(${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:,[=<>~!][^\\s,]*)*)`));
  return (m ? m[1] : t).replace(/[.!?]+$/, '');
}
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
    const cmdLike = text.match(/\b(?:npm|pnpm|yarn|bun|pip3?|pipx|uv pip)\s+(?:i|install|add)\s+(?:(?:-[gDU]|--global|--save-dev|--upgrade|--user)\s+)*(@?[\w][\w.@\/=<>~+-]*)(?=\s|$)/i);
    if (cmdLike && !/^-/.test(cmdLike[1])) return cmdLike[1];
    // `npm install @types/node%x`: an operand that is not a package name is returned as it is, so validation rejects it
    // and the command shows a placeholder (never a plain `npm install`)
    const odd = text.match(/\b(?:npm|pnpm|yarn|bun|pip3?|pipx|uv pip)\s+(?:i|install|add)\s+(?:(?:-[gDU]|--global|--save-dev|--upgrade|--user)\s+)*([^\s-]\S*)/i);
    if (odd) return odd[1];
    // an npm scoped package (`@types/node`) is the package wherever it stands ("install @types/node with npm")
    const scoped = text.match(/(?:^|\s)(@[\w.-]+\/[\w.-]+(?:@[\w.^~<>=*-]+)?)(?=\s|$)/);
    if (scoped) return scoped[1];
    // "install typescript@^5.4 with npm": a versioned requirement right after the install verb is the package
    const req = text.match(/(?:^|\s)(?:install|add|zainstaluj|instaluj|doinstaluj)\s+(?:(?:the\s+)?(?:package|pakiet)\s+)?([A-Za-z][\w.-]*(?:\[[^\]\s]*\])?[=<>~!@^]\S*)/i);
    if (req) return withConstraint(text, req[1].replace(/[=<>~!@^[].*$/s, ''));
    for (const w of words) if (vocab.has(w) && !PKG_SKIP.has(w)) return withConstraint(text, original(text, w));
    const r = nextAfter(words, TRIG.pkg, { skip: new Set([...STOP, ...PKG_SKIP]), accept: /^@?[\w.+-]+(?:\/[\w.+-]+)?(?:[=@<>~]=?[\w.*-]+)?$/ });
    if (r) return withConstraint(text, original(text, r.word));
    const i = words.findIndex((w, k) => vocab.has(w) && !/^(install|i|add|uninstall|zainstaluj|instaluj)$/.test(words[k + 1] || ''));
    return i >= 0 ? withConstraint(text, original(text, words[i])) : null;
  }
  if (vocab) {
    for (const w of words) if (vocab.has(w)) return original(text, w);
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
// Model file (TSH2): several sparse int8 linear models in one binary, written by scripts/train.py.
//   'TSH2' | u32 header length | JSON header | per model: u32 rowIds[rows] f32 scale[C] f32 bias[C] i8 W[rows*C] (pad 4)
// Rows are sorted hash indices; lookup is a binary search, so loading needs no Map construction.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const DEFAULT_MODEL = fileURLToPath(new URL('../model/model.bin', import.meta.url));

export function loadModel(path = DEFAULT_MODEL) {
  return parseModel(readFileSync(path), path);
}

/** Parse a TSH2 buffer; every size and offset is checked so a truncated/corrupt file gives a clear error. */
export function parseModel(buf, path = '<buffer>') {
  const bad = (why) => new Error(`bad model file ${path}: ${why}`);
  if (buf.length < 8 || buf.toString('latin1', 0, 4) !== 'TSH2') throw bad('expected TSH2 magic');
  const hlen = buf.readUInt32LE(4);
  if (hlen === 0 || 8 + hlen > buf.length) throw bad(`header length ${hlen} exceeds the file size ${buf.length}`);
  let header;
  try { header = JSON.parse(buf.toString('utf8', 8, 8 + hlen)); } catch (e) { throw bad(`header is not valid JSON (${e.message})`); }
  if (!header || typeof header.models !== 'object' || header.models === null) throw bad('header has no models');
  // copy into a fresh, 4-byte aligned ArrayBuffer so typed-array views are always valid
  const ab = new Uint8Array(buf.subarray(8 + hlen)).buffer;
  const isCount = (n) => Number.isSafeInteger(n) && n >= 0;
  const models = {};
  for (const [name, m] of Object.entries(header.models)) {
    if (!m || !Array.isArray(m.labels) || !m.labels.length) throw bad(`model ${name}: missing labels`);
    if (!isCount(m.rows) || !isCount(m.offset) || m.offset % 4) throw bad(`model ${name}: invalid rows/offset`);
    const C = m.labels.length;
    const need = m.rows * 4 + C * 8 + m.rows * C;
    if (m.offset + need > ab.byteLength) throw bad(`model ${name}: data (${need} bytes at offset ${m.offset}) exceeds the file`);
    let off = m.offset;
    const rowIds = new Uint32Array(ab, off, m.rows); off += m.rows * 4;
    const scale = new Float32Array(ab, off, C); off += C * 4;
    const bias = new Float32Array(ab, off, C); off += C * 4;
    const weights = new Int8Array(ab, off, m.rows * C);
    models[name] = { name, labels: m.labels, classes: C, rowIds, scale, bias, weights };
  }
  return { ...header, models, size: buf.length };
}

let cached = null;
export function getModel() {
  if (!cached) cached = loadModel();
  return cached;
}

function findRow(rowIds, idx) {
  let lo = 0;
  let hi = rowIds.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const v = rowIds[mid];
    if (v === idx) return mid;
    if (v < idx) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}

/** Raw scores (logits) for a sparse input: iterable of [index, value] pairs, or of bare indices (value 1). */
export function logits(m, feats) {
  const { classes: C, rowIds, weights, scale, bias } = m;
  const acc = new Float64Array(C);
  for (const f of feats) {
    const idx = typeof f === 'number' ? f : f[0];
    const val = typeof f === 'number' ? 1 : f[1];
    const r = findRow(rowIds, idx);
    if (r < 0) continue;
    const base = r * C;
    for (let c = 0; c < C; c++) acc[c] += val * weights[base + c];
  }
  for (let c = 0; c < C; c++) acc[c] = acc[c] * scale[c] + bias[c];
  return acc;
}

export function softmax(z) {
  let max = -Infinity;
  for (const v of z) if (v > max) max = v;
  const out = new Float64Array(z.length);
  let sum = 0;
  for (let i = 0; i < z.length; i++) { out[i] = Math.exp(z[i] - max); sum += out[i]; }
  for (let i = 0; i < z.length; i++) out[i] /= sum;
  return out;
}

export const predictProba = (m, feats) => softmax(logits(m, feats));

exec
/bin/bash -lc "sed -n '120,158p' src/cli.js; cat src/env.js; sed -n '585,615p' src/slots.js; cat test/regressions12.test.js" in /workspace/tellsh
 succeeded in 0ms:
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
// Detect the target shell, OS and coreutils flavour (GNU / BSD / busybox). Results are fed to the
// classifiers as `shell=X os=Y` tokens and select the per-shell rendering of the command.
import { existsSync, readFileSync, readlinkSync, realpathSync } from 'node:fs';
import { join, basename, delimiter } from 'node:path';

export const SHELLS = ['bash', 'zsh', 'sh', 'powershell', 'fish', 'cmd'];
export const OSES = ['linux', 'darwin', 'win32'];
export const POSIX_SHELLS = new Set(['bash', 'zsh', 'sh']);

const SHELL_ALIASES = {
  bash: 'bash', zsh: 'zsh', sh: 'sh', dash: 'sh', ash: 'sh', busybox: 'sh', ksh: 'sh', mksh: 'sh',
  pwsh: 'powershell', powershell: 'powershell', 'powershell.exe': 'powershell', 'pwsh.exe': 'powershell', ps: 'powershell',
  fish: 'fish', cmd: 'cmd', 'cmd.exe': 'cmd',
};
export function normShell(s) {
  if (!s) return null;
  return SHELL_ALIASES[basename(String(s)).toLowerCase().replace(/^-/, '')] || null;
}
export function normOs(s) {
  if (!s) return null;
  const v = String(s).toLowerCase();
  if (/^(linux|gnu)/.test(v)) return 'linux';
  if (/^(darwin|mac|macos|osx)/.test(v)) return 'darwin';
  if (/^(win|windows|win32)/.test(v)) return 'win32';
  return null;
}

function parentComm(pid) {
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, 'utf8');
    const m = stat.match(/^\d+ \((.*)\) \S (\d+)/s);
    return m ? { comm: m[1], ppid: +m[2] } : null;
  } catch { return null; }
}

/** Shell that launched us: parent process chain (Linux /proc), PowerShell env heuristic, then $SHELL. */
export function detectShell(env = process.env, os = process.platform) {
  if (env.TELLSH_SHELL) return normShell(env.TELLSH_SHELL) || 'bash';
  if (os === 'linux') {
    let pid = process.ppid;
    for (let i = 0; i < 4 && pid > 1; i++) {
      const p = parentComm(pid);
      if (!p) break;
      const sh = normShell(p.comm);
      if (sh) return sh;
      pid = p.ppid; // e.g. npx / npm / node wrappers
    }
  }
  if (os === 'win32') {
    // PowerShell adds its per-user module dirs to PSModulePath; cmd.exe leaves only the system entry.
    const psm = (env.PSModulePath || '').split(';').filter(Boolean);
    if (psm.length >= 3 || /\\Documents\\(Windows)?PowerShell\\Modules/i.test(env.PSModulePath || '')) return 'powershell';
    if (env.SHELL && normShell(env.SHELL)) return normShell(env.SHELL); // Git Bash / MSYS
    return 'cmd';
  }
  return normShell(env.SHELL) || 'sh';
}

function onPath(name, env = process.env) {
  for (const dir of (env.PATH || '').split(delimiter)) {
    if (dir && existsSync(join(dir, name))) return true;
  }
  return false;
}

/** gnu | bsd | busybox. macOS = BSD unless Homebrew GNU coreutils (gdu/gsort) are installed. */
export function detectCoreutils(os = process.platform, env = process.env) {
  if (env.TELLSH_COREUTILS) return env.TELLSH_COREUTILS;
  if (os === 'darwin') return onPath('gdu', env) && onPath('gsort', env) ? 'gnu' : 'bsd';
  if (os === 'linux') {
    try {
      const ls = ['/bin/ls', '/usr/bin/ls'].find((p) => existsSync(p));
      if (ls) {
        const real = realpathSync(ls);
        if (/busybox/.test(real) || /busybox/.test(readlinkSync(ls, { encoding: 'utf8' }).toString())) return 'busybox';
      }
    } catch { /* not a symlink */ }
    return 'gnu';
  }
  return 'gnu';
}

/** -> { shell, os, coreutils, detected: {shell, os} } honouring --shell / --os overrides */
export function detectEnv({ shell, os } = {}, env = process.env) {
  const realOs = process.platform === 'darwin' || process.platform === 'win32' ? process.platform : 'linux';
  const o = normOs(os) || (normShell(shell) === 'cmd' ? 'win32' : realOs);
  const s = normShell(shell) || (o === realOs ? detectShell(env, realOs) : o === 'win32' ? 'powershell' : 'bash');
  const coreutils = o === realOs ? detectCoreutils(o, env) : o === 'darwin' ? 'bsd' : 'gnu';
  return { shell: s, os: o, coreutils };
}

/** classifier context tokens */
export const envFeatures = (e) => [`shell=${e.shell}`, `os=${e.os}`];
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
    // "dev server" / "serwer deweloperski" -> dev, "tests" / "testy" -> test, "zbuduj" -> build, ...
    for (const [re, name] of SCRIPT_SYNONYMS) if (re.test(ex.rest ?? text)) return name;
    // an unknown name only when the request calls it a script ("run the storybook:ci script", "skrypt deploy-all")
    if (!/\b(scripts?|skrypt\w*|npm run)\b/.test(ex.rest ?? text)) return null;
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
// Regression tests for round 11: the round-10 findings (review/r10-claude.md, review/r10-codex.md). A login shell
// (`sudo -i`, `sudo --login`, `sudo -iu bob`, `runuser -l`) runs in the target user's home and `sudo --chroot` under
// another root, so history values keep that scope; a `cd` inside a `( … )` subshell does not outlast it, so relative
// values after it name files elsewhere (a `{ … }` group runs in the user's shell and stays as it was); every
// `npx wrangler` intent may run a project-local binary, so none is safe (never auto-run with --yes).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { suggest } from '../src/pipeline.js';
import { BY_ID, INTENTS } from '../src/catalog.js';
import { analyzeCommand, isAmbiguous } from '../src/history.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, history) => suggest(q, { env: BASH, ...(history ? { history } : {}) });
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BIN = join(ROOT, 'bin', 'tellsh.js');
const refused = (r, ph, why) => {
  assert.equal(r.context.rule, 'refused', `${why}: ${JSON.stringify(r.context)} -> ${r.command}`);
  assert.ok(r.command == null || r.command.includes(ph), `${why}: ${r.command}`);
};

test('major: sudo -i / --login and runuser -l run in the target home: relative history values are ambiguous', () => {
  for (const h of ['sudo -i cat notes.txt', 'sudo --login cat notes.txt', 'sudo -u bob -i cat notes.txt', 'sudo -iu bob cat notes.txt',
    'sudo -n -i cat notes.txt', 'runuser -l bob cat notes.txt', 'runuser --login bob cat notes.txt', 'time sudo -i cat notes.txt']) {
    refused(run('delete it', [h]), '<FILE>', h);
    const r = run('show it', [h]);
    assert.ok(r.command == null || r.command.includes('<'), `show it after ${h}: ${r.command}`);
    const a = analyzeCommand(h);
    assert.ok(a.ents.file == null || isAmbiguous(a.ents.file), `${h}: ${JSON.stringify(a.ents)}`);
  }
  // absolute paths name the same file from any directory
  assert.equal(run('delete it', ['sudo -i cat /tmp/a.txt']).command, 'rm /tmp/a.txt');
  // plain sudo / sudo -u keep the user's directory
  assert.equal(run('delete it', ['sudo cat notes.txt']).command, 'rm notes.txt');
  assert.equal(run('delete it', ['sudo -u bob cat notes.txt']).command, 'rm notes.txt');
});

test('major: sudo --chroot / -R runs under another root: every history value is ambiguous', () => {
  for (const h of ['sudo --chroot=/srv cat /etc/x', 'sudo --chroot /srv cat /etc/x', 'sudo -R /srv cat /etc/x', 'sudo -R/srv cat notes.txt']) {
    refused(run('delete it', [h]), '<FILE>', h);
    const r = run('show it', [h]);
    assert.ok(r.command == null || r.command.includes('<'), `show it after ${h}: ${r.command}`);
  }
});

test('major: a cd / pushd inside a ( … ) subshell does not outlast it: relative values after it are ambiguous', () => {
  for (const h of ['(cd /repo && cat notes.txt)', '(cd /repo; cat notes.txt)', '( cd /repo && cat notes.txt )', '(cd /repo && touch notes.txt)',
    '(pushd /repo && cat notes.txt)', '(cd /repo && (cat notes.txt))', 'true && (cd /repo && cat notes.txt)']) {
    refused(run('delete it', [h]), '<FILE>', h);
    const r = run('show it', [h]);
    assert.ok(r.command == null || r.command.includes('<'), `show it after ${h}: ${r.command}`);
  }
  // absolute paths are fine; so is a segment after the subshell closed (back in the user's directory)
  assert.equal(run('delete it', ['(cd /repo && cat /tmp/a.txt)']).command, 'rm /tmp/a.txt');
  assert.equal(run('delete it', ['(cd /repo); cat notes.txt']).command, 'rm notes.txt');
  assert.equal(run('delete it', ['(cd /repo && make) && cat notes.txt']).command, 'rm notes.txt');
  // a { … } group and a plain cd run in the user's own shell: the user is now in /repo
  assert.equal(run('delete it', ['{ cd /repo && cat notes.txt; }']).command, 'rm notes.txt');
  assert.equal(run('delete it', ['cd /repo && cat notes.txt']).command, 'rm notes.txt');
});

test('major: every npx wrangler intent is at least medium risk, never auto-run with --yes', () => {
  const ids = INTENTS.filter((t) => /^npx wrangler\b/.test(t.template)).map((t) => t.id);
  for (const id of ['wrangler_tail', 'wrangler_login', 'wrangler_whoami', 'wrangler_dev', 'wrangler_deploy']) assert.ok(ids.includes(id), id);
  for (const id of ids) assert.notEqual(BY_ID[id].risk, 'safe', id);
  for (const [q, id] of [['wrangler whoami', 'wrangler_whoami'], ['stream cloudflare worker logs', 'wrangler_tail'], ['log in to cloudflare with wrangler', 'wrangler_login']]) {
    const r = run(q);
    assert.equal(r.intent, id, q);
    assert.notEqual(r.risk, 'safe', q);
    // nothing can run even if the gate regressed: no npx on PATH
    const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', ...q.split(' ')],
      { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1', PATH: '/nonexistent' } });
    assert.equal(c.status, 4, q + ': ' + c.stdout + c.stderr);
    assert.match(c.stdout, /only auto-runs safe/);
  }
});

exec
/bin/bash -lc 'node --test test/compose.test.js test/devtools.test.js test/hybrid.test.js test/parity.test.js test/slots.test.js test/templates.test.js test/shells.test.js test/regressions3.test.js test/regressions3-history.test.js test/regressions3-render.test.js test/regressions5.test.js test/regressions6.test.js test/regressions7.test.js test/regressions10.test.js test/regressions11.test.js test/regressions12.test.js test/regressions13.test.js test/regressions14.test.js test/regressions15.test.js test/regressions16.test.js test/regressions17.test.js test/regressions18.test.js test/regressions19.test.js test/regressions20.test.js test/regressions21.test.js test/regressions22.test.js test/regressions23.test.js' in /workspace/tellsh
 exited 1 in 5644ms:
TAP version 13
# Subtest: /workspace/tellsh/test/compose.test.js
ok 1 - /workspace/tellsh/test/compose.test.js
  ---
  duration_ms: 644.416943
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 2 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 283.075761
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 3 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 299.814343
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 4 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 229.203477
  ...
# Subtest: /workspace/tellsh/test/regressions10.test.js
not ok 5 - /workspace/tellsh/test/regressions10.test.js
  ---
  duration_ms: 823.020409
  location: '/workspace/tellsh/test/regressions10.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions11.test.js
not ok 6 - /workspace/tellsh/test/regressions11.test.js
  ---
  duration_ms: 1110.894004
  location: '/workspace/tellsh/test/regressions11.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions12.test.js
not ok 7 - /workspace/tellsh/test/regressions12.test.js
  ---
  duration_ms: 760.051347
  location: '/workspace/tellsh/test/regressions12.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions13.test.js
ok 8 - /workspace/tellsh/test/regressions13.test.js
  ---
  duration_ms: 393.388461
  ...
# Subtest: /workspace/tellsh/test/regressions14.test.js
ok 9 - /workspace/tellsh/test/regressions14.test.js
  ---
  duration_ms: 583.274606
  ...
# Subtest: /workspace/tellsh/test/regressions15.test.js
ok 10 - /workspace/tellsh/test/regressions15.test.js
  ---
  duration_ms: 512.631971
  ...
# Subtest: /workspace/tellsh/test/regressions16.test.js
ok 11 - /workspace/tellsh/test/regressions16.test.js
  ---
  duration_ms: 569.659415
  ...
# Subtest: /workspace/tellsh/test/regressions17.test.js
ok 12 - /workspace/tellsh/test/regressions17.test.js
  ---
  duration_ms: 553.57736
  ...
# Subtest: /workspace/tellsh/test/regressions18.test.js
ok 13 - /workspace/tellsh/test/regressions18.test.js
  ---
  duration_ms: 615.239956
  ...
# Subtest: /workspace/tellsh/test/regressions19.test.js
ok 14 - /workspace/tellsh/test/regressions19.test.js
  ---
  duration_ms: 604.074894
  ...
# Subtest: /workspace/tellsh/test/regressions20.test.js
ok 15 - /workspace/tellsh/test/regressions20.test.js
  ---
  duration_ms: 605.310051
  ...
# Subtest: /workspace/tellsh/test/regressions21.test.js
ok 16 - /workspace/tellsh/test/regressions21.test.js
  ---
  duration_ms: 596.171457
  ...
# Subtest: /workspace/tellsh/test/regressions22.test.js
ok 17 - /workspace/tellsh/test/regressions22.test.js
  ---
  duration_ms: 637.038846
  ...
# Subtest: /workspace/tellsh/test/regressions23.test.js
ok 18 - /workspace/tellsh/test/regressions23.test.js
  ---
  duration_ms: 662.307287
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 19 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 421.153886
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 20 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 457.752062
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 21 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 347.73688
  ...
# Subtest: /workspace/tellsh/test/regressions5.test.js
ok 22 - /workspace/tellsh/test/regressions5.test.js
  ---
  duration_ms: 717.356321
  ...
# Subtest: /workspace/tellsh/test/regressions6.test.js
ok 23 - /workspace/tellsh/test/regressions6.test.js
  ---
  duration_ms: 774.575244
  ...
# Subtest: /workspace/tellsh/test/regressions7.test.js
ok 24 - /workspace/tellsh/test/regressions7.test.js
  ---
  duration_ms: 481.109206
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 25 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 3880.047319
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 26 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 247.220253
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 27 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 258.99138
  location: '/workspace/tellsh/test/templates.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..27
# tests 27
# suites 0
# pass 22
# fail 5
# cancelled 0
# skipped 0
# todo 0
# duration_ms 5654.400821

exec
/bin/bash -lc 'node test/regressions10.test.js' in /workspace/tellsh
 exited 1 in 381ms:
TAP version 13
# Subtest: major: a quoted argument mixing request words with a path or file name is unclear, not the path
not ok 1 - major: a quoted argument mixing request words with a path or file name is unclear, not the path
  ---
  duration_ms: 182.583062
  location: '/workspace/tellsh/test/regressions10.test.js:29:1'
  failureType: 'testCodeFailure'
  error: 'Unexpected end of JSON input'
  code: 'ERR_TEST_FAILURE'
  name: 'SyntaxError'
  stack: |-
    JSON.parse (<anonymous>)
    cliJson (file:///workspace/tellsh/test/regressions10.test.js:22:36)
    TestContext.<anonymous> (file:///workspace/tellsh/test/regressions10.test.js:51:15)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    node:internal/test_runner/harness:255:12
    node:internal/process/task_queues:140:7
    AsyncResource.runInAsyncScope (node:async_hooks:206:9)
    AsyncResource.runMicrotask (node:internal/process/task_queues:137:8)
  ...
# Subtest: major: the history copy of such a call is not read as the path
ok 2 - major: the history copy of such a call is not read as the path
  ---
  duration_ms: 69.218324
  ...
# Subtest: major: history values of a command scoped to another repository, directory or daemon are refused
ok 3 - major: history values of a command scoped to another repository, directory or daemon are refused
  ---
  duration_ms: 37.909175
  ...
# Subtest: minor: a script and its arguments are several operands
ok 4 - minor: a script and its arguments are several operands
  ---
  duration_ms: 4.561746
  ...
# Subtest: nit: bash does not write the running call first, so an identical last tellsh line is the previous command
ok 5 - nit: bash does not write the running call first, so an identical last tellsh line is the previous command
  ---
  duration_ms: 4.304059
  ...
# Subtest: minor: dd, cp, install, mv, ln -f, perl -i and chmod 000 onto a system file are critical
ok 6 - minor: dd, cp, install, mv, ln -f, perl -i and chmod 000 onto a system file are critical
  ---
  duration_ms: 3.753059
  ...
# Subtest: minor: an unclear argument blanks every operand slot it contains, not only path slots
ok 7 - minor: an unclear argument blanks every operand slot it contains, not only path slots
  ---
  duration_ms: 6.447001
  ...
# Subtest: major: A_dev excludes the hybrid dev split from every training source (OOD, tldr, anaphora too)
ok 8 - major: A_dev excludes the hybrid dev split from every training source (OOD, tldr, anaphora too)
  ---
  duration_ms: 5.80127
  ...
1..8
# tests 8
# suites 0
# pass 7
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 349.532202

exec
/bin/bash -lc "node --input-type=module - <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const q of ['npm run \"--help\"','run the \"--if-present\" script','npm run test:e2e','npm run deploy:prod','run the test:unit script','run the build:prod script','run the storybook:ci script','run npm script db:migrate','run the dev:staging script','run \"test:e2e\" script','deploy worker without deploying','deploy worker to my custom env blue','deploy worker to blue','deploy worker to env blue','deploy worker to environment blue']){const r=suggest(q,{env});console.log(JSON.stringify({q,cmd:r.command,missing:r.missing,intent:r.intent,risk:r.risk}));}
JS" in /workspace/tellsh
 succeeded in 123ms:
{"q":"npm run \"--help\"","cmd":"npm run --help","missing":[],"intent":"npm_run_script","risk":"medium"}
{"q":"run the \"--if-present\" script","cmd":"npm run --if-present","missing":[],"intent":"npm_run_script","risk":"medium"}
{"q":"npm run test:e2e","cmd":"npm run test:e2e","missing":[],"intent":"npm_run_script","risk":"medium"}
{"q":"npm run deploy:prod","cmd":"npm run deploy:prod","missing":[],"intent":"npm_run_script","risk":"medium"}
{"q":"run the test:unit script","cmd":"npm run test:unit","missing":[],"intent":"npm_run_script","risk":"medium"}
{"q":"run the build:prod script","cmd":"npm run build:prod","missing":[],"intent":"npm_run_script","risk":"medium"}
{"q":"run the storybook:ci script","cmd":"npm run storybook:ci","missing":[],"intent":"npm_run_script","risk":"medium"}
{"q":"run npm script db:migrate","cmd":"npm run db:migrate","missing":[],"intent":"npm_run_script","risk":"medium"}
{"q":"run the dev:staging script","cmd":"npm run dev:staging","missing":[],"intent":"npm_run_script","risk":"medium"}
{"q":"run \"test:e2e\" script","cmd":"npm run test:e2e","missing":[],"intent":"npm_run_script","risk":"medium"}
{"q":"deploy worker without deploying","cmd":"npx wrangler deploy --dry-run","missing":[],"intent":"wrangler_deploy","risk":"medium"}
{"q":"deploy worker to my custom env blue","cmd":"npx wrangler deploy --env <WENV>","missing":["wenv"],"intent":"wrangler_deploy","risk":"medium"}
{"q":"deploy worker to blue","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy","risk":"medium"}
{"q":"deploy worker to env blue","cmd":"npx wrangler deploy --env <WENV>","missing":["wenv"],"intent":"wrangler_deploy","risk":"medium"}
{"q":"deploy worker to environment blue","cmd":"npx wrangler deploy --env <WENV>","missing":["wenv"],"intent":"wrangler_deploy","risk":"medium"}

exec
/bin/bash -lc "sed -n '19,60p' test/regressions10.test.js; sed -n '198,240p' src/shellwords.js; rg -n 'hybrid|blind|prun|policy' HYBRID.md | head -50; sed -n '1,155p' scripts/real/prepare_real.js" in /workspace/tellsh
 succeeded in 0ms:
const run = (q, history, o = {}) => suggest(q, { env: BASH, ...(history ? { history } : {}), ...o });
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BIN = join(ROOT, 'bin', 'tellsh.js');
const cliJson = (...words) => JSON.parse(spawnSync(process.execPath, [BIN, '--json', '--shell', 'bash', '--os', 'linux', ...words],
  { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } }).stdout);
const refused = (r, ph, why) => {
  assert.equal(r.context.rule, 'refused', `${why}: ${JSON.stringify(r.context)} -> ${r.command}`);
  assert.ok(r.command == null || r.command.includes(ph), `${why}: ${r.command}`);
};

test('major: a quoted argument mixing request words with a path or file name is unclear, not the path', () => {
  assert.deepEqual(joinArgs(['delete', 'folder /tmp/x']), { text: 'delete "folder /tmp/x"', unclear: ['folder /tmp/x'] });
  assert.deepEqual(joinArgs(['delete', 'the file notes.txt']), { text: 'delete "the file notes.txt"', unclear: ['the file notes.txt'] });
  assert.deepEqual(joinArgs(['usuń', 'plik raport.pdf']), { text: 'usuń "plik raport.pdf"', unclear: ['plik raport.pdf'] });
  assert.deepEqual(joinArgs(['delete', 'all files in /tmp/x']).unclear, ['all files in /tmp/x']);
  assert.deepEqual(joinArgs(['usuń', 'katalog /tmp/x']).unclear, ['katalog /tmp/x']);
  // the space before the separator: a request word and a path, or a directory with a space? unclear
  assert.deepEqual(joinArgs(['delete', 'my data/a.txt']).unclear, ['my data/a.txt']);
  // genuine names stay values
  for (const v of ['My Notes.txt', 'data/my notes.txt', '/tmp/my data', '~/My Documents', './a b/c.txt']) {
    assert.deepEqual(joinArgs(['delete', v]), { text: `delete "${v}"`, unclear: [] }, v);
  }
  // the first word is still the request
  assert.deepEqual(joinArgs(['delete folder', '/tmp/x']), { text: 'delete folder /tmp/x', unclear: [] });

  const cases = [
    [['delete', 'folder /tmp/x'], '<PATH>', /\/tmp\/x/],
    [['delete', 'the file notes.txt'], '<FILE>', /notes\.txt/],
    [['usuń', 'plik raport.pdf'], '<FILE>', /raport/],
    [['delete', 'all files in /tmp/x'], '<PATH>', /\/tmp\/x/],
  ];
  for (const [args, ph, bad] of cases) {
    const r = cliJson(...args);
    assert.ok(r.command.includes(ph) && !bad.test(r.command), `${args}: ${r.command}`);
    assert.ok(r.warnings.some((w) => /quoted argument is a name or part of the request/.test(w)), `${args}: ${r.warnings}`);
  }
  assert.equal(cliJson('delete', 'My Notes.txt').command, "rm 'My Notes.txt'");
});

test('major: the history copy of such a call is not read as the path', () => {
  for (const h of ['tellsh delete "folder /tmp/x"', 'tellsh delete "the file notes.txt"', "tellsh usuń 'plik raport.pdf'"]) {
    for (const q of ['show it', 'delete it']) {
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
1:# tellsh hybrid: linear cascade + small neural models (v0.3 study, v0.4 real-usage update)
3:Branch `hybrid`. Question: does a real small language model help tellsh at runtime, and which one is worth shipping?
10:models are trained on real usage? v0.3 (= master after merging `hybrid`) vs v0.4 (this update), same scripts, same
15:* **Real usage was the blind spot.** On held-out real requests (2957 EN/PL rows; command groups never seen in training),
26:  shell-phrased requests (96.4 → 95.2%), 0.5 pt on the hybrid blind set; A+B is unchanged or better everywhere
27:  (`data/eval` 96.7 → 96.7%, shell 98.8 → 98.2%, both blind sets 99.2 / 99.3%). End-to-end exact command on relexicalised
29:* **Out-of-domain**: chit-chat rejection is ~unchanged (A 94.6 → 92.4% on `data/ood_eval`, blind OOD 100%/98.4%).
32:  risk of the hybrid and of v0.4: a confident-looking catalog command for a task it does not cover.
35:  request, so the cascade-first hybrid remains the better trade.
36:* **C-ft (Qwen2.5-0.5B LoRA, not retrained for v0.4)** is again no better than B inside the hybrid on real usage
39:  −0.5 pt on the public held-out set) and **A+B as the opt-in `--hybrid`** (enc-v2 bundle; best on real usage,
40:  no public-set regression). Keep `--yes` refusing re-ranked answers. Do not ship C. Before making `--hybrid` the
49:  ~1 pt (real usage A+B 88.8 → 88.3%, blind OOD rejection 98.4 → 96.9%, relex e2e 86.8 → 85.4%). **C-ft was trained on
51:  The runtime now also re-ranks the policy's k = 5 candidates whatever `--top` displays (before, `--top 3` cut it to 3).
62:  98.5 → 98.2%, hybrid blind 99.4 → 99.2%, v0.4 devtools 97.9 → 97.6%; OOD rejection unchanged. A+B defers more often
69:  any dev text and writes `build/hybrid/dev_texts.json`; `train_a_dev.sh` excludes that whole index (11 more base and 94
104:  the v0.3 policies from the hybrid branch. C-ft is the v0.3 LoRA (option descriptions now include the new intents);
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
279:  Its BIO tagger is no better than A's tagger + regex (slot F1 95.2% vs 95.7%), so the hybrid keeps A's slots.
281:  A **LoRA fine-tune on CPU** (800 × 8 examples, ~55 min) makes it the most accurate re-ranker (A+C-ft **97.1%** on `data/eval`, 99.1% on blind).
292:| **B** | `intfloat/multilingual-e5-small`, vocabulary pruned to PL+EN pieces (250k -> 36k), bottom 6 of 12 layers, fine-tuned as joint tool (55) + intent (149) classifier + BIO slot tagger (37 labels); int8 ONNX | `onnxruntime-node` (or `-web`), own SentencePiece-Unigram tokenizer in JS (`src/rerank/tokenizer.js`, 12 364/12 364 sequences identical to HF) | 26.7 MB (21.7 MB .tgz) |
305:* **New blind set** `data/hybrid/blind/` (681 rows: 331 EN, 310 PL, 40 OOD; bash/zsh/sh/PowerShell/fish/cmd with matching OS,
309:  queries such as "install htop"); B/C training drops them, and the "blind, novel texts only" rows (527) exclude every
310:  blind text that occurs in any training file.
316:  **A_dev** (`scripts/hybrid/train_a_dev.sh`: identical pipeline minus the dev split) provides honest cascade scores on
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

exec
/bin/bash -lc "node bin/tellsh.js --json --shell bash --os linux delete 'folder /tmp/x'" in /workspace/tellsh
 succeeded in 59ms:
{
  "query": "delete \"folder /tmp/x\"",
  "shell": "bash",
  "os": "linux",
  "coreutils": "gnu",
  "threshold": 0.375,
  "context": {
    "used": false
  },
  "confidence": 0.9729,
  "tool": "rm",
  "tools": [
    {
      "tool": "rm",
      "p": 0.999
    },
    {
      "tool": "mkdir",
      "p": 0.0007
    },
    {
      "tool": "find",
      "p": 0.0002
    }
  ],
  "candidates": [
    {
      "intent": "delete_dir",
      "tool": "rm",
      "p": 0.9729,
      "description": "Delete a directory recursively"
    },
    {
      "intent": "delete_file",
      "tool": "rm",
      "p": 0.026,
      "description": "Delete a file"
    },
    {
      "intent": "mkdir",
      "tool": "mkdir",
      "p": 0.0007,
      "description": "Create a directory (with parents)"
    }
  ],
  "understood": true,
  "method": "catalog",
  "intent": "delete_dir",
  "description": "Delete a directory recursively",
  "baseRisk": "high",
  "slots": {},
  "notes": null,
  "variant": "posix",
  "command": "rm -r <PATH>",
  "risk": "high",
  "warnings": [
    "rm deletes files permanently (no trash)",
    "path left as a placeholder: unclear whether the quoted argument is a name or part of the request (path=folder /tmp/x); pass the whole request as one quoted argument"
  ],
  "critical": false,
  "missing": [
    "path"
  ],
  "slotSources": {},
  "spans": [
    {
      "type": "PATH",
      "text": "folder /tmp/x"
    }
  ]
}

exec
/bin/bash -lc 'node test/templates.test.js' in /workspace/tellsh
 exited 1 in 96ms:
TAP version 13
# Subtest: shQuote round-trips nasty strings through bash
not ok 1 - shQuote round-trips nasty strings through bash
  ---
  duration_ms: 6.564151
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
  duration_ms: 0.316926
  ...
# Subtest: raw slots are validated, never injected
ok 3 - raw slots are validated, never injected
  ---
  duration_ms: 1.312606
  ...
# Subtest: optional segments are dropped when slot missing
ok 4 - optional segments are dropped when slot missing
  ---
  duration_ms: 0.280591
  ...
# Subtest: non-slot braces are left alone
ok 5 - non-slot braces are left alone
  ---
  duration_ms: 0.299376
  ...
# Subtest: every intent renders on linux and darwin without throwing, with valid risk
ok 6 - every intent renders on linux and darwin without throwing, with valid risk
  ---
  duration_ms: 67.149799
  ...
# Subtest: darwin variants differ where commands differ
ok 7 - darwin variants differ where commands differ
  ---
  duration_ms: 1.3813
  ...
# Subtest: injection attempt in a filename stays a single quoted argument
ok 8 - injection attempt in a filename stays a single quoted argument
  ---
  duration_ms: 0.440066
  ...
1..8
# tests 8
# suites 0
# pass 7
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 89.842993

codex
The read-only checks passed for 22 test files. Five files hit subprocess restrictions (`EPERM`), which I’m checking separately from code failures. I also found a possible case where quoting a deployment environment causes it to be dropped; I’m verifying the resulting command.
exec
/bin/bash -lc "node --input-type=module - <<'JS'
import {suggest} from './src/pipeline.js';
for(const shell of ['bash','powershell','cmd']) for(const q of ['deploy worker to \"production\"',\"deploy worker to 'prod'\",'deploy worker to \"preview2\"','deploy worker to "'`customer-a`'"','deploy worker to \"staging-eu\"','deploy worker to production','deploy worker to preview2','deploy worker to customer-a']) {
const r=suggest(q,{shell,os:shell==='bash'?'linux':'win32'});console.log(JSON.stringify({shell,q,cmd:r.command,missing:r.missing,intent:r.intent}));}
JS" in /workspace/tellsh
 succeeded in 106ms:
{"shell":"bash","q":"deploy worker to \"production\"","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy"}
{"shell":"bash","q":"deploy worker to 'prod'","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy"}
{"shell":"bash","q":"deploy worker to \"preview2\"","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy"}
{"shell":"bash","q":"deploy worker to `customer-a`","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy"}
{"shell":"bash","q":"deploy worker to \"staging-eu\"","cmd":"npx wrangler deploy --env <WENV>","missing":["wenv"],"intent":"wrangler_deploy"}
{"shell":"bash","q":"deploy worker to production","cmd":"npx wrangler deploy --env production","missing":[],"intent":"wrangler_deploy"}
{"shell":"bash","q":"deploy worker to preview2","cmd":"npx wrangler deploy --env preview2","missing":[],"intent":"wrangler_deploy"}
{"shell":"bash","q":"deploy worker to customer-a","cmd":"npx wrangler deploy --env customer-a","missing":[],"intent":"wrangler_deploy"}
{"shell":"powershell","q":"deploy worker to \"production\"","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy"}
{"shell":"powershell","q":"deploy worker to 'prod'","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy"}
{"shell":"powershell","q":"deploy worker to \"preview2\"","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy"}
{"shell":"powershell","q":"deploy worker to `customer-a`","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy"}
{"shell":"powershell","q":"deploy worker to \"staging-eu\"","cmd":"npx wrangler deploy --env <WENV>","missing":["wenv"],"intent":"wrangler_deploy"}
{"shell":"powershell","q":"deploy worker to production","cmd":"npx wrangler deploy --env production","missing":[],"intent":"wrangler_deploy"}
{"shell":"powershell","q":"deploy worker to preview2","cmd":"npx wrangler deploy --env preview2","missing":[],"intent":"wrangler_deploy"}
{"shell":"powershell","q":"deploy worker to customer-a","cmd":"npx wrangler deploy --env customer-a","missing":[],"intent":"wrangler_deploy"}
{"shell":"cmd","q":"deploy worker to \"production\"","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy"}
{"shell":"cmd","q":"deploy worker to 'prod'","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy"}
{"shell":"cmd","q":"deploy worker to \"preview2\"","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy"}
{"shell":"cmd","q":"deploy worker to `customer-a`","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy"}
{"shell":"cmd","q":"deploy worker to \"staging-eu\"","cmd":"npx wrangler deploy --env <WENV>","missing":["wenv"],"intent":"wrangler_deploy"}
{"shell":"cmd","q":"deploy worker to production","cmd":"npx wrangler deploy --env production","missing":[],"intent":"wrangler_deploy"}
{"shell":"cmd","q":"deploy worker to preview2","cmd":"npx wrangler deploy --env preview2","missing":[],"intent":"wrangler_deploy"}
{"shell":"cmd","q":"deploy worker to customer-a","cmd":"npx wrangler deploy --env customer-a","missing":[],"intent":"wrangler_deploy"}

exec
/bin/bash -lc "python3 -B - <<'PY'
import json
p='build/hybrid/e5-pruned/tokenizer.json'
x=json.load(open(p))
print('vocab',len(x['model']['vocab']),'added_tokens',x.get('added_tokens'))
print('pretokenizer',x.get('pre_tokenizer'),'normalizer',x.get('normalizer'))
PY" in /workspace/tellsh
 succeeded in 0ms:
vocab 36357 added_tokens [{'id': 0, 'content': '<s>', 'single_word': False, 'lstrip': False, 'rstrip': False, 'normalized': False, 'special': True}, {'id': 1, 'content': '<pad>', 'single_word': False, 'lstrip': False, 'rstrip': False, 'normalized': False, 'special': True}, {'id': 2, 'content': '</s>', 'single_word': False, 'lstrip': False, 'rstrip': False, 'normalized': False, 'special': True}, {'id': 3, 'content': '<unk>', 'single_word': False, 'lstrip': False, 'rstrip': False, 'normalized': False, 'special': True}, {'id': 36357, 'content': '<mask>', 'single_word': False, 'lstrip': False, 'rstrip': False, 'normalized': False, 'special': True}]
pretokenizer {'type': 'Sequence', 'pretokenizers': [{'type': 'WhitespaceSplit'}, {'type': 'Metaspace', 'replacement': '▁', 'prepend_scheme': 'always', 'split': True}]} normalizer {'type': 'Precompiled', 'precompiled_charsmap': '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gAkAAIRlAAD9GwCAzNAHAMzwBwAFHACAkYkAAMxMBgDNBAYAzHAGAM10BgDMQAcAmy0PAMyoBwDNrAcAhg0AAIdVDwCEQQ8ACQsAgIIBDACDVQ8AgDUBAIHZAQCkDACAj+kAAIztAACSDACA3R0AgIv1AACIbQ8AiQ0AAA8LAIC0CwCAgiUAAE0MAICBQQAAUwwAgBUeAIANHgCAJR4AgB0eAIAtHgCABR4AgIApAACBKQAA/AsAgA0cAICEeQAAFRwAgIFNAQCAoQEAGAsAgKP9DwDMOAIAzUgDAB0cAICBWQAAzXwCAMykDQAkCwCAWQwAgKjJDwCHOQAA1wkAgImhDwADCwCAkREAAJ4MAIDaCQCAmQsAgF8MAICAuQ8AgbkPANUdAICDjQ8A9gsAgCUcAICEBQAALRwAgB4LAIA1HACAKgsAgIGdDwCHIQAAh7UPAMyoAgDN6AIAzLQMAM3cDACmzQAAp8UAAE0cAICPgQ8AjIkPAKPlAAAwCwCAPRwAgDwLAICxyQAAhwUAAFUcAIBFHACAhz0AAF0cAIBxDACANgsAgKMFDwCB+QAAzKgDAGUcAIBICwCAjEkAAKPxAABtHACAdwwAgEILAICnlQAAfRwAgHUcAIDMrAMAzcgAAN0JAICHaQAA4AkAgIG9AACCeQAA4wkAgIe5AQBOCwCAkaUAAIEdAACdHACAVAsAgIgFAAClHACAm5EAAFoLAIDmCQCAjJEBANILAIDGCwCAwAsAgMwLAICDRQAAgrkBAIG5AQCApQEAPR4AgIZxAABgCwCAhEkAAIsVAACKPQAAiTkAAIhFAACP+QAAZgsAgLoLAICMBQAAp1EBAKZJAQBlDACAsHkAAKNZAQCMqQAAgKkAAIGpAACBlQAAgJUAAK1xAQBrDACAogsAgISNAABNHgCARR4AgKMhAABdHgCAVR4AgGUeAICBbQAAgG0AALEFAQCkOQAANR4AgIUcAIBsCwCAqAUAAJUcAICNHACArQkAAMywAQCBvQMAgL0DAIPNAwCtHACAtRwAgL0cAIDMvAEAzYQBAInpAwDMHAEAgdkCAIDFAgDNOAEAzDwBAMxoAgDNRAIAg00AAMUcAICH2QAAhy0AAIBFAACBEQAAggUAAHILAIDVHACAzRwAgN0cAIDMOAIAiBUAAIjhAACAbQAAgTkAAMyEAgDNUAEA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vBkBAL0ZAQC+fQEAv3UBAKPtAQCeOwCAojsAgKY7AICqOwCApu0BAKXtAQCuOwCAq3kBAKpxAQCyOwCAtjsAgK85AQCuMQEArVUBAKxVAQC6OwCAvjsAgMI7AIDGOwCAyjsAgOGsAQDOOwCA42AGANI7AIDWOwCA2jsAgO9UBgDeOwCA4jsAgL60GgDmOwCA6jsAgO47AICGaBwAh4wDAPI7AID2OwCA+jsAgP47AICAOQAAgTkAAIIFAAACPACACjwAgA48AIASPACAFjwAgKgdAwCpQQMAqkEDAKtBAwCsQQMArUkDAK5xAwCvcQMAhCAdABo8AIAePACAIjwAgCY8AIAqPACALjwAgDI8AIC46QAAufUAALr9AAC78QAAvJEAAL2RAAC+iQAAv4kAALDhAACx4QAAsuEAALPhAAC04QAAte0AALbZAAC32QAA4wwHAOEgBwDhMAEA4wgHADY8AIA6PACAPjwAgEI8AIBGPACASjwAgE48AIBSPACA75gHAFY8AIBaPACA74gHALOJAgBePACAYjwAgL6AGgBmPACAtokCALWJAgBqPACAu2UBALplAQBuPACAcjwAgL9pAQC+ZQEAvXUBALx1AQC3PQYAtj0GALU9BgC0IQYAszUGALI1BgCxAQYAsAkGAL9ZBgC+UQYAvVkGALxNBgC7bQYAunkGALlxBgC4eQYAgJ0AAIGtAACCpQAAejwAgH48AICCPACAhjwAgIo8AICvcQYArmkGAK1tBgCsbQYAq4EGAKqZBgCpkQYAqJkGAAY8AIB2PACAjjwAgKPFHQCSPACApcUdAKbFHQCWPACAhgADAIdkAwCqKR4AqykeAKw5HgCtOR4ArikeAK8lHgCzOR4AmjwAgJ48AICiPACApjwAgLb9HgC1/R4AqjwAgLvZHgC60R4ArjwAgLI8AIC/aR8AvmEfAL1pHwC8wR4AqPEeAKnxHgCq8R4Aq/EeAKw1HgCtPR4ArjUeAK8tHgC2PACAujwAgL48AIDCPACAxjwAgMo8AIDOPACA0jwAgLjlHwC57R8AuuUfALv5HwC86R8AvZEfAL6RHwC/jR8AsFUeALFdHgCyVR4As/0fALTlHwC17R8AtuUfALfdHwCjeR8A1jwAgNo8AIDePACA4jwAgKa9HwClvR8A5jwAgKuZHwCqkR8AhogAAIdMAQCvKR4AriEeAK0pHgCsgR8AgEkAAIFJAACCWQAAs5keAOo8AIC1iR4AtlEBAO48AIDyPACA9jwAgLotAQC7JQEAvD0BAL0lAQC+JQEAvxUBAKhNHgCpVR4Aql0eAKtVHgCsTR4ArZ0BAK6JAQCvgQEAhKwBAPo8AID+PACAAj0AgAY9AIAKPQCADj0AgBI9AIC4ZQEAuW0BALplAQC7fQEAvGUBAL1tAQC+ZQEAv9kAALClAQCxrQEAsqUBALO9AQC0rQEAtZ0BALaVAQC3XQEAo9UdABY9AIAaPQCAHj0AgCI9AICmHQIApcUdACY9AICraQIAqmECACo9AIAuPQCAr1kCAK5pAgCtaQIArHECADI9AIA2PQCAOj0AgD49AIBCPQCARj0AgEo9AIBOPQCAgDkAAIE5AACCBQAAUj0AgFo9AIBePQCAh0ADAIZcBACETAQAYj0AgGY9AICEBAUA4yABAGo9AIDhqAEAbj0AgO+UGgByPQCAdj0AgHo9AIB+PQCAgj0AgIY9AICKPQCAs6EDAI49AICSPQCAlj0AgJo9AIC2fQMAtX0DAJ49AIC7WQMAulEDAKI9AICmPQCAv/0AAL79AAC9/QAAvEEDAKhRAgCpWQIAqmkCAKtpAgCstQIArb0CAK61AgCvrQIAhKgHAKo9AICuPQCAsj0AgIKpAAC2PQCAgKkAAIGpAAC4aQEAuWkBALoJAQC7CQEAvBkBAL0ZAQC+CQEAvwkBALDVAgCx3QIAstUCALNpAQC0eQEAtXkBALZpAQC3YQEA4bgBAOHUHwDjOB8A4wwbALo9AIC+PQCAwj0AgMo9AIDOPQCA0j0AgNY9AIDaPQCAvjwJAN49AIDvhBsA74QbAKOhAgDiPQCAhugEAIe8BQDmPQCApn0CAKV9AgDqPQCAq1kCAKpRAgDuPQCA8j0AgK/9AQCu/QEArf0BAKxBAgCzhQYAxj0AgPY9AID6PQCA/j0AgLaJBgC1jQYAAj4AgLuRBgC6iQYABj4AgAo+AIC/9QYAvokGAL2BBgC8iQYADj4AgBI+AIAWPgCAGj4AgB4+AIAiPgCAJj4AgO+EHQAqPgCA4QAEAC4+AIDj/AQAgBEAAIEdAACCBQAAMj4AgKjxBgCp8QYAqg0GAKsFBgCsBQYArQkGAK49BgCvNQYANj4AgDo+AICGiAAAhxADAD4+AIBCPgCA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GkUAgB5FAIAiRQCAJkUAgIANAACBFQAAgh0AACpFAIAuRQCAMkUAgIR4AQC+FAAA4xQPADpFAIDh4A0AhAADAIawBACHFAMAPkUAgEJFAIBGRQCASkUAgE5FAIBSRQCA78APAFZFAIBaRQCAXkUAgGJFAIBmRQCAakUAgLNtAwBuRQCAtX0DALZ1AwByRQCAdkUAgHpFAIC6UQMAu1EDALz1AwC9/QMAvukDAL/hAwB+RQCAgkUAgIZFAICKRQCAjkUAgJJFAICWRQCAmkUAgKhxAgCpeQIAqokDAKuJAwCsmQMArZkDAK6JAwCviQMAsPkDALH5AwCyTQMAs0UDALRBAwC1SQMAtnEDALdxAwC4IQMAuSEDALohAwC7IQMAvCEDAL0hAwC+IQMAvyEDAICdAQCBEQAAghEAAIQEBQDvFAAAnkUAgKJFAIC+EAUA48gAAKpFAIDh0AEArkUAgLJFAIC2RQCAukUAgL5FAICqeQIAq3kCAIboBACHYAUArsECAK/JAgCs3QIArdUCAMJFAICjRQIAxkUAgMpFAICmXQIAzkUAgNJFAIClVQIA1kUAgNpFAIDeRQCA4kUAgOZFAIDqRQCA7kUAgO+EDgC+rAQA4dAOAPJFAIDjFAEA9kUAgPpFAID+RQCAAkYAgLPdAQAGRgCACkYAgA5GAIASRgCAtv0BALX9AQAaRgCAu90BALrdAQCE4AQAHkYAgL+hAQC+vQEAvb0BALy9AQCoBQYAqR0GAKoVBgCrLQYArDUGAK09BgCuNQYArykGAKZFAICC9QcAgeUHAIDlBwAWRgCAIkYAgIYcAACHsAMAuCUGALnFBgC6zQYAu8UGALzdBgC9xQYAvs0GAL/FBgCwWQYAsVkGALIpBgCzKQYAtDkGALUlBgC2JQYAtx0GAKOdBgAmRgCAKkYAgC5GAIAyRgCApr0GAKW9BgA2RgCAq50GAKqdBgA6RgCAPkYAgK/hBgCu/QYArf0GAKz9BgBCRgCAs/UHAEZGAIBKRgCAtu0HAE5GAIBSRgCAteUHALqNBwC7kQcAVkYAgFpGAIC+dQcAv30HALyBBwC9fQcAqCUGAKkpBgCqOQYAqzkGAKwpBgCtKQYArnkGAK91BgBeRgCAYkYAgGZGAIBqRgCAbkYAgHJGAIB2RgCAekYAgLjVBgC53QYAuuEGALv9BgC85QYAve0GAL7lBgC/mQYAsA0GALERBgCyEQYAs+0GALT1BgC1/QYAtvUGALftBgCjsQYAgi0AAIEVAACAsQAANkUAgKapBgCloQYAfkYAgKvVBgCqyQYAgkYAgL5oAQCvOQYArjEGAK05BgCsxQYAikYAgLPxAQCGaAAAh3wBALZdAQCORgCAkkYAgLVVAQC6SQEAu0kBAJZGAICaRgCAvj0BAL8hAQC8OQEAvTUBAJ5GAICiRgCAhAQDAL6AHACmRgCA4RwGAKpGAIDjAAYAvwguAK5GAICyRgCA78gHALZGAIC6RgCAvkYAgMJGAIDGRgCAykYAgKN9AgDORgCApdkCANJGAIDWRgCAptECANpGAIDeRgCAq8UCAKrFAgCtuQIArLUCAK+tAgCusQIAqW0FAKhZBQCrDQIAqrkCAK0dAgCsHQIArwUCAK4NAgC+aB0A4kYAgOZGAIDqRgCAgB0AAIEJAACCmQEA7kYAgLnhAwC4KQIAu+EDALrpAwC94QMAvPkDAL/hAwC+6QMAsU0CALBNAgCzIQIAsi0CALUlAgC0OQIAtxECALYlAgCowQIAqdECAKrRAgCr5QIArP0CAK0VAQCuHQEArw0BAPJGAID6RgCA/kYAgAJHAIAGRwCACkcAgA5HAIASRwCAuAUBALkJAQC6HQEAuxUBALwxAQC9MQEAvv0BAL/1AQCweQEAsUEBALJBAQCzXQEAtEUBALVNAQC2RQEAtz0BAIagHQCHxB0AFkcAgO/YAAAaRwCAHkcAgCJHAIDvxAYAhGwcAOH0BgAmRwCA47AGACpHAIDhlAEALkcAgONEBgCzGQIAMkcAgDZHAIA6RwCAhewsALbVAQC1NQIAPkcAgLvFAQC6/QEAQkcAgEZHAIC/yQEAvsEBAL3JAQC81QEAo9kdAPZGAIBKRwCATkcAgFJHAICmFR4ApfUdAFZHAICrBR4Aqj0eAFpHAIBeRwCArwkeAK4BHgCtCR4ArBUeAIBpAACBaQAAggUAAGJHAIBmRwCAakcAgIcQAwCGfAMAbkcAgHJHAIB2RwCAekcAgH5HAICCRwCAhkcAgIpHAICopR8Aqa0fAKqlHwCrvR8ArKUfAK2tHwCupR8ArxUfAI5HAICSRwCAlkcAgJpHAICeRwCAokcAgKZHAICqRwCAuA0fALkZHwC6IR8AuyEfALzZAAC92QAAvskAAL/BAACwcR8AsXEfALJxHwCzRR8AtEEfALVNHwC2PR8AtzUfALMtHgCuRwCAskcAgLZHAIC6RwCAti0eALUtHgC+RwCAu7UeALq1HgDCRwCAxkcAgL+JHgC+hR4AvZEeALylHgCCKQAAo2keAIAdAACBFQAApmkeAMpHAIDORwCApWkeAKrxHgCr8R4A0kcAgITgAQCuwR4Ar80eAKzhHgCt1R4AqNUBAKnlAQCq7QEAq+UBAKz9AQCt5QEAru0BAK/lAQC+oAEAhkYAgNZHAIDaRwCAhhAAAId0AQDeRwCA4kcAgLh9AQC5wQAAusEAALvBAAC8wQAAvckAAL7xAAC/8QAAsJ0BALFFAQCyTQEAs0UBALRdAQC1RQEAtk0BALdFAQDmRwCA6kcAgO5HAIDyRwCA9kcAgO80AgDv7B4A+kcAgOHwHQDj4AIA4zAeAOGEAQD+RwCAAkgAgAZIAIAKSACAsyUCAJQAAAAOSACAEkgAgBZIAIC2JQIAtTUCABpIAIC7wQIAuhkCAB5IAIAiSACAv8ECAL7ZAgC90QIAvNkCACZIAIAqSACALkgAgKPpAgAySACApfkCAKbpAgA2SACAOkgAgD5IAICq1QIAqw0CAKwVAgCtHQIArhUCAK8NAgCAYQAAgWEAAIIFAABCSACASkgAgIQABAC+FAQATkgAgIbABACHUAMAUkgAgFZIAIBaSACAXkgAgGJIAIBmSACAqK0CAKm9AgCqtQIAqw0BAKwVAQCtHQEArhUBAK8NAQCE7AQAakgAgG5IAIBySACAdkgAgHpIAIB+SACAgkgAgLgdAQC5LQEAuiUBALvNAQC81QEAvd0BAL7JAQC/wQEAsH0BALFVAQCyXQEAs1UBALRNAQC1PQEAtjUBALctAQDhGB4AhkgAgOM4HgCKSACAjkgAgJJIAICWSACAmkgAgJ5IAICiSACAvmAEAKZIAICBdQAAgHUAAO/gHwCCbQAAqkgAgK5IAICG6AQAh3wFALJIAIDhkAEAukgAgOOgAAC+SACAwkgAgMZIAIDvtAAAykgAgM5IAIDSSACA1kgAgLUFBgBGSACAtkgAgLYFBgDaSACA3kgAgLOlBQDiSACAvRkGALwRBgC/YQYAvhEGAOZIAIDqSACAuwkGALohBgCj/QUA7kgAgPJIAID2SACA+kgAgKZdBgClXQYA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sY0CALKFAgCzbQEAtHkBALV5AQC2aQEAt2kBAIYgBACHCAUAYksAgGZLAIBqSwCAbksAgHJLAIDvXAAAhOwEAOFcDgB2SwCA44wOAHpLAIB+SwCAgksAgIZLAICjVQIAiksAgI5LAICSSwCAlksAgKYdAgClHQIAmksAgKsJAgCqOQIAnksAgKJLAICv/QEArv0BAK35AQCsEQIAqGkGAKlpBgCqeQYAq3kGAKxpBgCtaQYArp0GAK+VBgBWSwCApksAgKpLAICuSwCAsksAgLZLAIC6SwCAvksAgLj1BgC5+QYAuo0GALuFBgC8nQYAvYUGAL6FBgC/tQYAsO0GALH1BgCy/QYAs/UGALTtBgC10QYAttEGALfRBgCz8QYAghUAAIG1AACAtQAAwksAgLbpBgC14QYAvtQDALsxBgC6KQYAxksAgMpLAIC/FQYAvikGAL0hBgC8KQYAzksAgKO1BgCGyAAAh8gAAKatBgDSSwCA1ksAgKWlBgCqbQYAq3UGANpLAIDeSwCArm0GAK9RBgCsbQYArWUGAKg1BgCpOQYAqoEGAKuBBgCsgQYArYEGAK6BBgCvtQYA4ksAgOZLAIDqSwCA7ksAgPJLAID2SwCA+ksAgP5LAIC4nQYAua0GALqlBgC7aQEAvHkBAL15AQC+aQEAv2kBALDRBgCx0QYAstEGALPRBgC0tQYAtb0GALa1BgC3rQYAswkGAAJMAIAGTACACkwAgA5MAIC2AQYAtQkGABJMAIC7FQYAuhUGABZMAIAaTACAv3kGAL5xBgC9BQYAvAUGAB5MAICjTQYAIkwAgOZKAICmRQYAJkwAgCpMAIClTQYAqlEGAKtRBgAuTACAMkwAgK41BgCvPQYArEEGAK1BBgCB6QMAgN0DAISIAwCC4QMAhrA8AIeIAgC+VAMAOkwAgD5MAIBCTACARkwAgEpMAIBOTACAUkwAgFZMAIBaTACA4/AGAF5MAIDhMAYAhAA8AGJMAIBmTACAakwAgG5MAIByTACAhTQ9AHZMAIB6TACA77AHAH5MAICCTACAhkwAgIpMAICOTACAkkwAgL7EPACWTACAgp0BAIGdAQCAnQEAqA0CAKllAgCqfQIAq3UCAKxZAgCtWQIArpkDAK+ZAwCw6QMAsekDALL5AwCz+QMAtOkDALXpAwC2XQMAt1UDALhtAwC5dQMA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t/0eALO5HgBeUgCAYlIAgGZSAIBqUgCAtsUeALXVHgBuUgCAu8EeALr5HgByUgCAdlIAgL/FHgC+2R4AvdEeALzZHgB6UgCAo/0eAH5SAICCUgCApoEeAIZSAICKUgCApZEeAKq9HgCrhR4AjlIAgJJSAICunR4Ar4EeAKydHgCtlR4AqCkeAKkpHgCqVR4Aq20eAKx1HgCtfR4ArnUeAK9pHgCWUgCAmlIAgJ5SAICiUgCAplIAgKpSAICuUgCAslIAgLjpHgC59R4Auv0eALv1HgC87R4AvZEeAL6RHgC/kR4AsB0eALHlHgCy7R4As+UeALT9HgC15R4Atu0eALflHgCz3R4AtlIAgLpSAIC+UgCAwlIAgLb9HgC1/R4AhFgBALshHgC62R4AvigAAMpSAIC/IR4AvjkeAL0xHgC8OR4AgU0AAIBNAACjlR4Agl0AAKW1HgDGUgCAzlIAgKa1HgB2UQCA0lIAgKtpHgCqkR4ArXkeAKxxHgCvaR4ArnEeAIYABACHRAMAs4ECANZSAIC1gQIA2lIAgN5SAIC2gQIAiAAAAOJSAIC74QIAuu0CAL3lAgC8+QIAv9ECAL7lAgDmUgCA6lIAgIREAwC+jAMA4UgCAO5SAIDjAAIA7/wfAPJSAIDhPB4A79wCAONgHwD2UgCA+lIAgP5SAIACUwCAqQUCAKixAgCrBQIAqgUCAK0NAgCsBQIArzUCAK41AgCEbAUABlMAgApTAIAOUwCAElMAgBZTAIAaUwCAHlMAgLnpAwC44QMAu/kDALrhAwC96QMAvOEDAL9dAwC+4QMAsSkCALAlAgCzPQIAsiECALUZAgC0LQIAt9kDALYRAgAiUwCAJlMAgCpTAICjhQMALlMAgKWFAwCmhQMAMlMAgDpTAIA+UwCAqukDAKvlAwCs/QMAreEDAK7hAwCv1QMAgEkAAIFVAACCVQAAo6kCAL6YBAClQQEApkEBAEJTAICG4AUAh+AFAKotAQCrOQEArBEBAK0FAQCuDQEArwUBAEZTAIBKUwCATlMAgO/cAABSUwCAVlMAgFpTAIDviB4AhCwHAOHsHgBeUwCA4xweAGJTAIDhlAEAZlMAgOMwAACzJQIAhWDmAGpTAIBuUwCAclMAgLbNAQC1zQEAdlMAgLu1AQC6oQEAelMAgH5TAIC/iQEAvoEBAL2JAQC8nQEA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qoECAKuBAgCsgQIArYECAK6FAgCvHQEAAlYAgAZWAIAKVgCADlYAgBJWAIAWVgCAGlYAgIS4BQC4dQEAuX0BALp1AQC7CQEAvBkBAL0ZAQC+CQEAvwEBALBlAQCxbQEAsmUBALN9AQC0aQEAtV0BALZVAQC3TQEAHlYAgCJWAIAmVgCAKlYAgC5WAIAyVgCA7zQAAO/ADgDhXA4A4UwPAOOUAADjnA4ANlYAgIJlAACBfQAAgH0AADpWAIA+VgCAvsQHALNFAgBCVgCAtUUCALZNAgBKVgCAhkAGAIeQBAC67QEAu+UBALz9AQC95QEAvuEBAL/VAQCflQgAngUIAJ3dDQCcPQwAmzEMAJr1DQCZ7RAAmD0QAJfVEQCWsRUAlQUUAJTlFQCTtRkAkjEYAJE5GACQDRwAj2EcANZVAICz1QYATlYAgLX9BgBGVgCAUlYAgLaRBgBWVgCAWlYAgLuVBgC6lQYAvVUHALxVBwC/VQcAvlUHAF5WAIBiVgCAqo0GAKuFBgCsnQYArYUGAK6BBgCvtQYAhKgAAGZWAIBqVgCAoyUFAG5WAIClJQUApi0FAHJWAIB2VgCAelYAgH5WAICCVgCAhlYAgIpWAICOVgCAklYAgJZWAICaVgCAnlYAgKJWAICjqQUAotEEAKHZBACgZQUAgiEdAIM1HQCmVgCAqlYAgIaVGACH3RQAhBkZAIUZGQCKDRUAi7EUAK5WAICyVgCAjsURAI/VDACMzRAAjR0RAJJhDQCTdQ0AvkwAALpWAICWxQkAl80EAJSNDACVXQkAmkEFAJtBBQCGyP8Ah0wAAIFZAACAeQAAnCEEAIJRAAChxQEAvlYAgKMB/ACi2QEApRX9AKS1/QCnufkApgH4AKkJ+AColfkAqwX1AKqt9QCtsfEArAHwAK8d8ACurfEAseHtALAB7ACzAegAsv3sALVd6QC09ekAwlYAgMZWAIDKVgCAzlYAgNJWAIDWVgCA2lYAgN5WAIDiVgCA5lYAgKiNBACplQQAqpUEAKulBACsvQQArdkEAK75BACv8QQAhGz8AOpWAIDuVgCA8lYAgPZWAID6VgCA/lYAgAJXAIC4eQUAucUFALrNBQC7xQUAvN0FAL3FBQC+zQUAv+0FALCZBACxmQQAskkFALNJBQC0WQUAtVkFALZJBQC3SQUAox0EAL7M/AAGVwCAClcAgA5XAICmWQQApTUEABJXAICrXQQAql0EABZXAIAaVwCAr50FAK6dBQCtnQUArJ0FAB5XAICznQIAIlcAgCpXAIC2UQIALlcAgDJXAIC1uQIAukkCALtVAgCGSP0Ah8D8AL41AgC/PQIAvEUCAL09AgCo3QQAqUkDAKpRAwCrbQMArHUDAK2VAwCunQMAr7kDAICNAQCB5QEAguEBADZXAIA6VwCAPlcAgEJXAIBGVwCAuJUDALmdAwC6lQMAu60DALy1AwC9vQMAvrUDAL9VAgCwyQMAsdUDALLVAwCzrQMAtLUDALW9AwC2tQMAt60DAEpXAIBOVwCAo9EDAFJXAICl9QMAVlcAgFpXAICmHQMAXlcAgGJXAICrGQMAqgUDAK1xAwCsCQMAr3EDAK55AwDhKAcAZlcAgOPkBgBqVwCA4SgGAG5XAIDjaAEAclcAgHZXAIB6VwCA71gAAH5XAICCVwCAhlcAgO/IBgCKVwCAqE39AKmB/QCq0f0Aq9H9AKzx/QCt8f0ArvH9AK/x/QAmVwCAghEAAIEZAACA0f8AjlcAgJJXAICEdAMAvnQDALh1/gC5ff4AunX+ALvF/gC83f4AvcX+AL7F/gC/9f4AsJH9ALGR/QCykf0As5H9ALRV/gC1Xf4AtlX+ALdN/gCzWf0AllcAgIasAACHRAMAmlcAgLZx/QC1ef0AnlcAgLtV/QC6Vf0AolcAgKZXAIC/mf4AvpH+AL1F/QC8Rf0AqlcAgKMd/QCuVwCAslcAgKY1/QC2VwCAulcAgKU9/QCqEf0AqxH9AL5XAIDCVwCArtX+AK/d/gCsAf0ArQH9AKjN/wCp0f8AqtH/AKsh/gCsIf4ArSH+AK4h/gCvIf4AxlcAgMpXAIDOVwCA0lcAgNZXAIDaVwCA3lcAgOJXAIC4jf4AuZH+ALqV/gC7rf4AvLX+AL25/gC+qf4Av6n+ALDh/gCx4f4AsuX+ALP5/gC06f4AtdX+ALbd/gC3uf4As1n/AOZXAIC2VgCA6lcAgO5XAIC2of4Atan+APJXAIC7Jf4AuiX+APZXAID6VwCAvxH+AL4t/gC9Lf4AvDH+AIIZAACjHf8AgGUAAIEZAACm5f4A/lcAgAJYAICl7f4AqmH+AKth/gCEZAEAviAAAK5p/gCvVf4ArHX+AK1p/gAKWACA4zT+AA5YAIDhfP0AhrAEAIcIAwASWACAFlgAgBpYAIAeWACAhCQDAIQkBAAiWACA70j+ACZYAIAqWACAs+kCAC5YAIC+RAQAvkAFADJYAIC2nQIAtZkCADZYAIC7iQIAur0CADpYAIA+WACAv1kDAL5RAwC9WQMAvJECAKkdAgCoFQIAqyUCAKolAgCtWQIArFUCAK9NAgCuUQIAvmQGAEJYAIBGWACASlgAgE5YAIBSWACAVlgAgFpYAIC5+QMAuPEDALtNAwC68QMAvUEDALxZAwC/cQMAvkEDALEJAgCwPQIAs8kDALIBAgC12QMAtNEDALfJAwC20QMA4ZABAF5YAIDj8AAAYlgAgGZYAICCPQAAgT0AAIA9AABqWACAblgAgHJYAIB6WACAflgAgIJYAIDvLAAAhlgAgKPpAwCKWACAhugEAIdgBQCOWACApp0DAKWZAwCSWACAq4kDAKq9AwCWWACAmlgAgK9ZAgCuUQIArVkCAKyRAwCeWACAolgAgKZYAICqWACArlgAgLJYAIC2WACA71gBAISgBADhVP8AulgAgOOEAQC+WACAwlgAgMZYAIDKWACAs9kBAM5YAICFzBkA0lgAgNZYAIC28QEAtfkBANpYAIC7pQEAutkBAN5YAIDiWACAv50BAL6dAQC9pQEAvK0BAKgBBgCpDQYAqhEGAKsRBgCsMQYArTEGAK4pBgCvJQYAdlgAgILJBwCBwQcAgPEHAOZYAIDqWACAhhwAAIf8AwC47QYAufUGALr9BgC79QYAvO0GAL1RBwC+VQcAv00HALBdBgCxIQYAsjkGALMxBgC0GQYAtRkGALbdBgC31QYAo5kGAO5YAIDyWACA9lgAgPpYAICmsQYApbkGAP5YAICr5QYAqpkGAAJZAIAGWQCAr90GAK7dBgCt5QYArO0GAApZAICz8QcADlkAgBJZAIC2gQcAFlkAgBpZAIC1mQcAuo0HALtlBwAeWQCAIlkAgL59BwC/ZQcAvH0HAL11BwCoLQYAqTUGAKo9BgCrMQYArFUGAK1FBgCuRQYAr3UGACZZAIAqWQCALlkAgDJZAIA2WQCAOlkAgD5ZAIBCWQCAuOkGALn1BgC6/QYAu/UGALztBgC9kQYAvpUGAL+NBgCwDQYAseUGALLtBgCz5QYAtP0GALXlBgC27QYAt+UGAKO1BgBGWQCASlkAgE5ZAIBSWQCApsUGAKXdBgAGWACAqyEGAKrJBgBWWQCAWlkAgK8hBgCuOQYArTEGAKw5BgCASQAAgUkAAIJZAACzRQEAXlkAgLVFAQC2RQEAYlkAgIZAAACHZAAAuikBALslAQC8PQEAvSEBAL4hAQC/FQEAZlkAgGpZAICEBAMAvgAMAOMoBgDv4AIA4RAGAG5ZAIDvkAYA4zwCAHJZAIDh1AEAdlkAgHpZAIB+WQCAglkAgIZZAICKWQCAo8ECAI5ZAIClwQIAklkAgJZZAICmwQIAmlkAgJ5ZAICroQIAqq0CAK2lAgCsuQIAr5ECAK6lAgCpBQIAqLECAKsFAgCqBQIArQ0CAKwFAgCvNQIArjUCAISoDACiWQCAplkAgKpZAICuWQCAslkAgLZZAIC6WQCAuekDALjhAwC7+QMAuuEDAL3pAwC84QMAv10DAL7hAwCxKQIAsCUCALM9AgCyIQIAtRkCALQtAgC32QMAthECAKitAgCp1QIAqtUCAKsNAQCsFQEArQkBAK4xAQCvLQEAvlkAgMJZAIDKWQCAzlkAgNJZAIDWWQCA2lkAgN5ZAIC4IQEAuSEBALrtAQC75QEAvP0BAL3lAQC+7QEAv+UBALBVAQCxXQEAslUBALMtAQC0NQEAtTkBALYtAQC3JQEAgD0BAIGlAACCrQAA79QHAOJZAIDmWQCA6lkAgO8oBwC+LAwA4fQGAO5ZAIDjkAcA8lkAgOGUAQD2WQCA4wwGALMdAgD6WQCAh0QNAIZMDQD+WQCAtskBALXdAQACWgCAu9kBALrRAQAGWgCACloAgL+9AQC+sQEAvbkBALzBAQDGWQCADloAgBJaAIAWWgCAGloAgB5aAIAiWgCAJloAgKgJDwCpCQ8AqhkPAKsZDwCsCQ8ArQkPAK6pDwCvqQ8AsNkPALHtDwCy+Q8As/UPALSVDwC1hQ8AtoUPALe1DwC4jQ8AuWEAALphAAC7YQAAvGEAAL1hAAC+YQAAv2EAAKNdDQCCLQAAgRUAAIAdAAAqWgCApokOAKWdDgAuWgCAq5kOAKqRDgAyWgCANloAgK/9DgCu8Q4ArfkOAKyBDgA6WgCAs/UPAIboAwCHvAMAtu0PAD5aAIBCWgCAteUPALp5DwC7TQ8ARloAgEpaAIC+NQ8AvyUPALxJDwC9RQ8AozEOAE5aAIBSWgCAVloAgFpaAICmKQ4ApSEOAF5aAICriQ4Aqr0OAGJaAIBmWgCAr+EOAK7xDgCtgQ4ArI0OAGpaAIBuWgCAcloAgHZaAIB6WgCAfloAgIJaAICGWgCAiloAgI5aAICSWgCAlloAgIANAACB1QAAgt0AAJpaAICoQQEAqVEBAKpRAQCrZQEArH0BAK2RAACukQAAr5EAAJ5aAICiWgCAhGQBAL5kAQCGkAEAh4QAAKpaAICuWgCAuJEAALmRAAC6kQAAu5EAALyxAAC9sQAAvrEAAL+xAACw8QAAsfkAALLBAACzwQAAtLEAALWxAAC2sQAAt7EAALPZAgCyWgCAvnADAL5EBAC2WgCAthEDALX1AgC6WgCAuz0DALo1AwC+WgCAwloAgL91AwC+dQMAvRUDALwVAwDGWgCAo50CAMpaAIDOWgCAplUDANJaAIDWWgCApbECAKpxAwCreQMA2loAgN5aAICuMQMArzEDAKxRAwCtUQMAqDkDAKk5AwCqjQAAq50AAKyNAACtvQAArrUAAK/dAADiWgCA5loAgOpaAIDuWgCA8loAgPZaAID6WgCA/loAgLhpAAC5aQAAunkAALt5AAC8aQAAvWkAAL7ZAQC/2QEAsKkAALGpAACyvQAAs7UAALSZAAC1mQAAtlkAALdZAAACWwCABlsAgApbAIAOWwCA70QAABJbAICGmAUAh+QCAOOYAACEqAIA4fgBABpbAICAOQAAgTkAAIItAAAeWwCAs0UBACJbAIAmWwCAKlsAgC5bAIC2fQEAtUUBADJbAIC7LQEAui0BADZbAIA6WwCAvx0BAL4dAQC9IQEAvCkBAD5bAIDhUA4AQlsAgOM8DwBGWwCASlsAgE5bAIBSWwCAVlsAgFpbAIDjAAAAXlsAgGJbAIBmWwCAhPQFAO/kDgCuqQEAr6kBAKydAQCtlQEAqpkBAKuZAQBqWwCAblsAgKbJAQByWwCAdlsAgKXxAQCC/QcAo/EBAID9BwCB9QcAFlsAgHpbAIB+WwCAglsAgIZbAICKWwCAhrgDAIeQAwCoDQcAqRkHAKptBwCrZQcArH0HAK1lBwCuZQcAr1UHALAtBwCxxQcAssEHALPdBwC0xQcAtc0HALbFBwC3/QcAuMUHALnJBwC62QcAu9kHALypBwC9qQcAvp0HAL+VBwCzxQcAjlsAgJJbAICWWwCAmlsAgLbFBwC11QcAnlsAgLshBwC6yQcAolsAgKZbAIC/KQcAviEHAL0pBwC8NQcAqlsAgKOBBwCuWwCAslsAgKaBBwC2WwCAulsAgKWRBwCqjQcAq2UHAL5bAIDCWwCArmUHAK9tBwCscQcArW0HAKgVAQCpgQEAqoEBAKuBAQCsgQEArYkBAK6xAQCvsQEAxlsAgMpbAIDOWwCA0lsAgNZbAIDaWwCA3lsAgOJbAIC4ZQAAuW0AALplAAC7fQAAvGUAAL1tAAC+ZQAAv90AALChAQCxrQEAsqUBALO5AQC0qQEAtZ0BALaVAQC3XQAA5lsAgIIdAACBHQAAgB0AAOpbAIDuWwCA8lsAgL5YAQCErAIA9lsAgIcIAQCGjAEA+lsAgKZaAID+WwCAAlwAgLNJAQAGXACAClwAgA5cAIASXACAtkkBALVJAQAWXACAuykBALolAQAaXACAHlwAgL8ZAQC+LQEAvS0BALwxAQC+2AMAIlwAgO/4BgAmXACAKlwAgC5cAIDv4AIAMlwAgOGUAQA2XACA43QCADpcAIDhmAUAPlwAgOMMBwBCXACARlwAgEpcAICjwQIAhIwDAKXBAgBOXACAUlwAgKbBAgBWXACAWlwAgKuhAgCqrQIAraUCAKy5AgCvkQIArqUCAKgxAwCpPQMAqjUDAKtJAwCsWQMArVkDAK5JAwCvQQMAgMUAAIEJAACCGQAAXlwAgGJcAIBqXACAh2wDAIYcHAC47QAAufEAALr1AAC7jQAAvJUAAL2BAAC+gQAAv70AALAJAwCxCQMAsu0AALPhAAC04QAAteEAALblAAC32QAAblwAgHJcAIB2XACAs7ECAHpcAIC13QIAttUCAH5cAICCXACAhlwAgLrBAgC7wQIAvDUBAL05AQC+KQEAvykBAKaNAgCKXACAjlwAgKWFAgCSXACAo+kCAJZcAICaXACArnEBAK9xAQCsbQEArWEBAKqZAgCrmQIAnlwAgKJcAICmXACA4YQGAKpcAIDjJAYArlwAgOGUAQCyXACA4ywAAL7oHQC2XACAulwAgO/IAACE/B0AvvAcAL5cAIDvSAcAwlwAgMZcAIDKXACAzlwAgIEdAACAHQAA0lwAgIIFAACGQBwAh8QcANpcAIDeXACA4lwAgOZcAIDqXACA7lwAgKi1HgCpBR8Aqg0fAKsFHwCsAR8ArQkfAK45HwCvOR8A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rmU+AK1xPgCsAT4A0mIAgNZiAIDaYgCA3mIAgOJiAIDmYgCA6mIAgO5iAICAOQAAgTkAAIIFAADyYgCAvrgBAIS4AQD6YgCA/mIAgKitAgCp1QIAqtUCAKstAwCsNQMArT0DAK41AwCvLQMAAmMAgAZjAIAKYwCADmMAgBJjAIAWYwCAGmMAgB5jAIC46QMAuekDALqJAwC7iQMAvJkDAL2ZAwC+iQMAv4kDALBVAwCxXQMAslUDALPpAwC0+QMAtfkDALbpAwC34QMAs10CACJjAICGKAQAh8wDACZjAIC2vQMAtb0DACpjAIC7mQMAupEDAC5jAIAyYwCAvz0DAL49AwC9PQMAvIEDAIUAFACjGQIANmMAgDpjAICm+QMAPmMAgEJjAICl+QMAqtUDAKvdAwBGYwCASmMAgK55AwCveQMArMUDAK15AwDjVD4A4dw/AOHQPgDjPD4ATmMAgO8cAABSYwCAVmMAgFpjAIDjwAAAXmMAgOHUAQDvYD4AYmMAgGpjAIDvRD8AgGEAAIFtAACCfQAAhAAFAIbwBACHnAUAvhAFAG5jAIByYwCAdmMAgHpjAIB+YwCAgmMAgIZjAICKYwCAjmMAgLiJPQC5iT0Aupk9ALuRPQC8uT0Avbk9AL7RPQC/0T0AsAU+ALENPgCyBT4Asx0+ALQFPgC1DT4AtgU+ALe5PQConT4Aqa0+AKqlPgCrvT4ArKU+AK2tPgCupT4Ar30+AISsBAC+rAQAkmMAgJZjAICaYwCAnmMAgKJjAICmYwCAqPkFAKn5BQCqKQYAqykGAKw5BgCtOQYArikGAK8pBgBmYwCAqmMAgK5jAICyYwCAtmMAgLpjAIC+YwCAwmMAgLiNBgC5kQYAupEGALulBgC8vQYAvUUHAL5BBwC/QQcAsFkGALFZBgCy7QYAs/0GALTtBgC13QYAttUGALe1BgCzoQYAxmMAgMpjAIDOYwCA0mMAgLa5BgC1sQYA2mMAgLudBgC6nQYA1mMAgPZiAIC/GQYAvikGAL0pBgC8OQYAglEAAKPlBgCAQQAAgUEAAKb9BgDeYwCA4mMAgKX1BgCq2QYAq9kGAIZIAACHbAAArm0GAK9dBgCsfQYArW0GAKg5BgCpWQYAqmkGAKtpBgCseQYArXkGAK5pBgCvaQYA5mMAgOpjAIDuYwCA8mMAgPZjAID6YwCA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uNEGALnZBgC64QYAu+EGALyRBgC9nQYAvpUGAL+JBgCwSQYAsUkGALJdBgCzVQYAtE0GALXxBgC28QYAt/EGALDhBwCx4QcAsgkHALMJBwC0GQcAtRkHALYJBwC3CQcAuDkHALkNBwC6GQcAuxkHALwJBwC9CQcAvn0HAL9xBwCCZgCAlmUAgIZmAICKZgCAjmYAgJJmAICWZgCAmmYAgKjxBwCpxQcAqsEHAKvdBwCsyQcArb0HAK6pBwCvoQcAsykGAJ5mAICiZgCApmYAgKpmAIC2XQYAtSEGAK5mAIC7RQYAukUGALJmAIC2ZgCAv70GAL69BgC9vQYAvL0GALpmAICjbQYAvmYAgMJmAICmGQYAxmYAgMpmAIClZQYAqgEGAKsBBgDOZgCA0mYAgK75BgCv+QYArPkGAK35BgCobQYAqbEBAKpJAQCrRQEArF0BAK1FAQCuTQEAr0UBANZmAICCHQAAgR0AAIAdAADaZgCA3mYAgOJmAIC+VAEAuIEAALmNAAC6hQAAu5kAALyJAAC9vQAAvrUAAL99AACwPQEAseEAALLhAACz4QAAtOEAALXpAAC20QAAt9EAALsFAwC62QIAhiwCAIcsAwC/DQMAvgUDAL0VAwC8FQMAs+ECAOpmAIDuZgCAhCwDAPJmAIC25QIAtfUCAPZmAICqnQIAq0EDAPpmAID+ZgCArkEDAK9JAwCsUQMArVEDAAJnAICjpQIABmcAgApnAICmoQIADmcAgBJnAIClsQIAqakAAKihAACrtQAAqr0AAK3dAACs3QAAr/EAAK79AAC+LBwAFmcAgBpnAIAeZwCAImcAgCZnAIAqZwCALmcAgLl9AAC4fQAAu80BALrNAQC93QEAvN0BAL/NAQC+zQEAsZUAALCJAACzTQAAspUAALVdAAC0XQAAt00AALZNAAAyZwCANmcAgDpnAIA+ZwCAQmcAgEZnAIBKZwCATmcAgIA5AACBOQAAggUAAFJnAIBaZwCAXmcAgIf4AgCGfB0A4bgEAL7IHADjQAYAYmcAgGZnAIBqZwCAbmcAgHJnAIB2ZwCAemcAgH5nAICCZwCAhmcAgIpnAIDvsAcAjmcAgJJnAICWZwCAmmcAgO/IAACeZwCAomcAgKZnAIDvQAYAqmcAgOH8BgCuZwCA4xwGALJnAIDhlAEAtmcAgONkBgCAEQAAgRkAAIIpAACz/QEAumcAgLWdAQC2lQEAvmcAgMJnAICEbB0AuoUBALuZAQC8iQEAvVEBAL5RAQC/UQEAozEeAFZnAIDGZwCAymcAgM5nAICmWR4ApVEeANJnAICrVR4AqkkeAIYIAwCHbAMAr50eAK6dHgCtnR4ArEUeANZnAICzCR8A2mcAgN5nAIC2CR8A4mcAgOZnAIC1CR8AugUfALsNHwDqZwCA7mcAgL4FHwC/CR8AvBUfAL0NHwCw5R8Ase0fALLlHwCz/R8AtOUfALXpHwC2GR8AtxkfALgpHwC5NR8Auj0fALs1HwC8ER8AvR0fAL4JHwC/BR8A8mcAgPZnAIDmZgCA+mcAgP5nAIACaACABmgAgApoAICo0R8AqdEfAKqlHwCrvR8ArKUfAK2tHwCupR8Ar50fAKNNHgAOaACAEmgAgBZoAIAaaACApk0eAKVNHgAeaACAq0keAKpBHgAiaACAJmgAgK9NHgCuQR4ArUkeAKxRHgCADQAAgRUAAIIdAAAqaACALmgAgDJoAICEtAEAvrQBAL/oAQA6aACAhkgHAIc0AACEvAYAPmgAgEJoAIC+tAYAqI0BAKmVAQCqlQEAq80BAKzZAQCt2QEArs0BAK/FAQBGaACASmgAgE5oAIBSaACAVmgAgFpoAIBeaACAYmgAgLgdAQC5wQAAusEAALvBAAC8wQAAvckAAL7xAAC/8QAAsIkBALGJAQCyKQEAsykBALQ9AQC1JQEAti0BALclAQC7bQIAum0CAGZoAIBqaACAv8ECAL7ZAgC93QIAvN0CALM9AgBuaACAcmgAgHZoAICE/AYAtnkCALVxAgB6aACAqikCAKspAgB+aACAgmgAgK6dAgCvhQIArJkCAK2ZAgCGaACAo3kCAIpoAICOaACApj0CAJJoAICWaACApTUCAIJtJwCDjSoAhqgFAIdsAwCGmS4Ah80vAIQRLgCFmS4AiiESAIspEgCaaACAnmgAgI6RFgCPHRYAjBESAI0RFgCScRoAk+UaAKJoAIDvlHYAlvEeAJflHgCUSRoAlRkeAJopAgCb4QIAqmgAgK5oAICyaACA4SASAJzxAgDjIBYAnyEfAJ7BHwCdmRsAnC0bAJuhGwCavRcAmTkXAJixFwCXiRMAlqkTAJWpEwCUdS4AkzkvAJIxLwCRsS8AkDUrAI+tJgDjeB8A0gAAAOFcHwCCmQEAtmgAgIDxAQCB8QEAvqgHALpoAIC+aACAwmgAgIS8BgDvLB8AxmgAgMpoAIDhpB4A48wAAON8HgDhvAEAzmgAgNJoAIDWaACAhJwGANpoAIC+bAYA3mgAgOJoAIDmaACA7xAAAO8EHgDqaACA7mgAgPJoAID2aACA+mgAgP5oAIACaQCABmkAgAppAICAPQAAgQkAAILJBwAOaQCAo/kDAKLxAwChMQMAoM0fALBJcQCxAXwAsgl8ALMhfQC0AXgAtRV4ADZoAICmaACAEmkAgL4oDgCGDAAAh4wDABZpAIAaaQCAHmkAgCJpAIAmaQCAoV0AAKJVAACjfQAApAEMAKUVDACm9QwApwEIAKghCACpxQgAqgF0AKsJdACsAXQArR11AK55cACveXAAqOUFAKnxBQCq8QUAqy0FAKw1BQCtPQUArjUFAK8tBQAqaQCALmkAgDJpAIA2aQCAOmkAgD5pAIBCaQCARmkAgLj9BgC5jQYAuoUGALutBgC8uQYAvbkGAL6tBgC/pQYAsFUFALFdBQCyVQUAs+UGALT9BgC10QYAttEGALfRBgCzeQQASmkAgE5pAIBSaQCAVmkAgLa9BAC1vQQAWmkAgLuZBAC6kQQAXmkAgGJpAIC/FQcAvjkHAL0xBwC8gQQAZmkAgKM9BABqaQCAbmkAgKb5BAByaQCAdmkAgKX5BACq1QQAq90EAHppAIB+aQCArn0HAK9RBwCsxQQArXUHAKhpBwCpaQcAqnkHAKvZBgCs9QYArf0GAK71BgCv5QYAgMkAAIHJAACCBQAAgmkAgIZwDwCHNAAAimkAgI5pAIC4fQYAuQUGALoNBgC7BQYAvB0GAL0FBgC+DQYAvwUGALCdBgCxdQYAsn0GALN1BgC0UQYAtV0GALZVBgC3TQYAs/EEAJJpAICWaQCAmmkAgJ5pAIC2fQUAtX0FAKJpAIC7sQUAulkFAKZpAICqaQCAv5kFAL6VBQC9oQUAvKkFAK5pAICjtQQAsmkAgLZpAICmOQUAumkAgL5pAIClOQUAqh0FAKv1BQDCaQCAxmkAgK7RBQCv3QUArO0FAK3lBQCpuQIAqLECAKvJAgCqsQIArTUCAKw1AgCvNQIArjUCAMppAIDOaQCA0mkAgNZpAIDaaQCA3mkAgOJpAIDmaQCAuekDALjZAwC7iQMAuuEDAL2dAwC8nQMAv4EDAL6JAwCxVQIAsFUCALNVAgCyVQIAtfkDALTxAwC36QMAtvEDALM9AwDqaQCA7mkAgPJpAID6aQCAtrEDALW5AwD+aQCAu5UDALqVAwCGiAwAh6ANAL85AgC+MQIAvYUDALyFAwACagCAo3kDAAZqAIAKagCApvUDAA5qAIASagCApf0DAKrRAwCr0QMAFmoAgBpqAICudQIAr30CAKzBAwCtwQMAgIUAAIGNAACChQAA79AGAOOwBwDj9AQA4QgHAOHsBADvOAYA7yAEAL6kDAAeagCAImoAgOGEAQAmagCA49wGACpqAIAuagCAhMANALPJAQAyagCAtdkBALbJAQA2agCAOmoAgD5qAIC6xQEAu60BALy5AQC9uQEAvq0BAL+lAQCwLQ4AsUUOALJBDgCzQQ4AtEUOALVNDgC2cQ4At3EOALiBDgC5gQ4AuoEOALuBDgC8gQ4AvYEOAL6BDgC/gQ4A9mkAgEJqAIBGagCASmoAgIZpAIBOagCAUmoAgFZqAICo2Q0AqdkNAKptDgCrZQ4ArH0OAK1lDgCuZQ4Ar1UOAKOFDgCCLQAAgRUAAIAdAABaagCApoUOAKWVDgBeagCAq+EOAKqJDgBiagCAZmoAgK/pDgCu4Q4ArfUOAKz1DgBqagCAs4UPAIZoAACHHAMAtoUPAG5qAIByagCAtZEPALqNDwC7SQ8AdmoAgHpqAIC+MQ8AvzEPALxJDwC9RQ8AqBEOAKkZDgCqSQ4Aq0UOAKxdDgCtQQ4ArkEOAK91DgB+agCAgmoAgIZqAICKagCAjmoAgJJqAICWagCAmmoAgLihDgC5oQ4Aug0BALsFAQC8HQEAvQEBAL4BAQC/AQEAsA0OALHJDgCy2Q4As9UOALSxDgC1sQ4AtqkOALehDgCjwQ4AnmoAgKJqAICmagCAqmoAgKbBDgCl1Q4ArmoAgKsNDgCqyQ4AsmoAgLZqAICvdQ4ArnUOAK0BDgCsDQ4AumoAgL5qAIDCagCAxmoAgIANAACBNQAAgj0AAMpqAIDOagCA0moAgISEAQC+hAEAhjAHAIf4AADaagCA3moAgKjBAgCp0QIAqtECAKvlAgCs/QIArTUDAK49AwCvNQMA4moAgOZqAIDqagCA7moAgPJqAID2agCA+moAgP5qAIC40QMAudkDALrhAwC74QMAvJEDAL2RAwC+kQMAv5EDALBNAwCxVQMAsl0DALNVAwC0TQMAtfEDALbxAwC38QMAu7EDALqpAwACawCAvoQDAL8VAwC+qQMAvaEDALypAwCzeQIABmsAgAprAIAOawCAEmsAgLaVAwC1VQIAFmsAgKrtAwCr9QMAGmsAgB5rAICu7QMAr1EDAKztAwCt5QMAImsAgKM9AgAmawCAKmsAgKbRAwAuawCAMmsAgKURAgA2awCAgiEAAIEVAACAFQAA7wQAAISUAgA6awCAPmsAgOPYAABCawCA4fgBAEprAIBOawCAUmsAgFZrAIBaawCAhmAFAIcIBQBeawCAs20BAGJrAIC1fQEAtnUBAGZrAIBqawCAbmsAgLpRAQC7UQEAvPkBAL3RAQC+0QEAv9EBAHJrAICjpQEAdmsAgHprAICmvQEAfmsAgIJrAICltQEAqpkBAKuZAQCGawCAimsAgK4ZAQCvGQEArDEBAK0ZAQCOawCA4fQOAJJrAIDjFA4A9AAAAOF8DACWawCA41AKAJprAICeawCAviAEAO8wDQCiawCApmsAgIQ0BADvrA4AsDkGALE5BgCygQYAs6kGALS5BgC1uQYAtqkGALehBgC46QYAuekGALrJBgC7xQYAvN0GAL3BBgC+wQYAvz0HAEZrAICCHQAAgR0AAIAdAACqawCArmsAgLJrAIDWagCAqJkFAKmZBQCqSQYAq0kGAKxZBgCtWQYArkkGAK9JBgCorQcAqbUHAKq9BwCrtQcArK0HAK3dBwCuyQcAr8EHALZrAIC6awCAhogDAIcQAwC+awCAwmsAgMZrAIDKawCAuG0HALkFBwC6AQcAuxUHALwxBwC9MQcAvikHAL8pBwCwgQcAsYEHALJpBwCzZQcAtH0HALVhBwC2YQcAt1UHALM1BgDOawCA0msAgNZrAIDaawCAtl0GALUlBgDeawCAu0UGALpFBgDiawCA5msAgL+lBgC+uQYAvbEGALy9BgDqawCAo3EGAO5rAIDyawCAphkGAPZrAID6awCApWEGAKoBBgCrAQYA/msAgAJsAICu/QYAr+EGAKz5BgCt9QYAqCUBAKk1AQCqPQEAqzUBAKwtAQCtkQAArpEAAK+RAAAGbACACmwAgA5sAIASbACAFmwAgIK9AwCBvQMAgL0DALiZAAC5rQAAuqUAALttAAC8dQAAvX0AAL51AAC/bQAAsPEAALH5AACywQAAs8EAALSxAAC1vQAAtrUAALepAAAabACAHmwAgCJsAICEgAIAvhwCACpsAICG+HwAh8wCAISsAwAubACAMmwAgDZsAIA6bACAPmwAgEJsAIBGbACAs/UCAEpsAIBObACAkgAAAFJsAIC2UQMAteUCAFZsAIC7fQMAunUDAFpsAIBebACAvzkDAL41AwC9VQMAvFUDAKM1AgBibACAZmwAgGpsAIBubACAppEDAKUlAgBybACAq70DAKq1AwB2bACAemwAgK/5AwCu9QMArZUDAKyVAwC+wAMAfmwAgIJsAICGbACAgA0AAIE1AACCPQAAimwAgI5sAICSbACAhsh8AIcAAwCabACAnmwAgKJsAICmbACAqmwAgK5sAICybACAtmwAgLpsAIC+bACAwmwAgO/0AwCE7HwA4ZQBAMZsAIDjMAMAymwAgM5sAIDSbACA1mwAgLNpAQDabACA3mwAgOJsAIDmbACAtmEBALVpAQDqbACAuykBALohAQDubACA8mwAgL8dAQC+HQEAvSUBALwtAQD2bACA+mwAgP5sAICjpQEAAm0AgKWlAQCmrQEAvlR8AIaAfACH7HwAqu0BAKvlAQCs4QEArekBAK7RAQCv0QEACm0AgOGcBgCEBH8A4yQGAOPUBgAObQCA4TAEABJtAIDvlAcAgnUAAIFhAACAaQAAFm0AgBptAIAebQCA7+wGALiNfgC5lX4AupV+ALulfgC8vX4AvdF+AL7RfgC/0X4AsGV+ALFtfgCyeX4As3F+ALRZfgC1WX4Atr1+ALe1fgCoVX4AqWF+AKphfgCrYX4ArGF+AK1hfgCuYX4Ar2F+ACJtAICWbACAJmwAgCZtAIAGbQCAKm0AgC5tAIAybQCAqHF+AKlxfgCqcX4Aq3F+AKyRfwCtkX8ArpF/AK+RfwA2bQCAOm0AgD5tAIBCbQCARm0AgEptAIBObQCAUm0AgLiFfwC5jX8AuoV/ALudfwC8jX8Avb1/AL61fwC/XX8AsPF/ALHxfwCy8X8As8V/ALTBfwC1wX8AtsF/ALfBfwCz+X8AVm0AgFptAIBebQCAYm0AgLYRfgC1GX4AZm0AgLs1fgC6NX4Aam0AgG5tAIC/BX4AvgV+AL0RfgC8JX4AghUAAKO9fwCAYQAAgWEAAKZVfgBybQCAvpABAKVdfgCqcX4Aq3F+AHZtAIB6bQCArkF+AK9BfgCsYX4ArVV+AKhBfgCpUX4AqlV+AKt9fgCsZX4ArW1+AK75AQCv8QEAhgAAAIc0AQB+bQCAgm0AgIZtAICKbQCAjm0AgJJtAIC4dQEAuX0BALp1AQC7yQAAvNkAAL3ZAAC+yQAAv8EAALCVAQCxnQEAspUBALNNAQC0VQEAtV0BALZVAQC3TQEAs919AJZtAICabQCAnm0AgKJtAIC27X0Ate19AKZtAIC7WQIAulECAKptAICubQCAv5kCAL6RAgC9mQIAvEECALJtAICjmX0Atm0AgLptAICmqX0Avm0AgMJtAIClqX0AqhUCAKsdAgDGbQCAym0AgK7VAgCv3QIArAUCAK3dAgDObQCA0m0AgNZtAIDabQCAgB0AAIEJAACCOQAA3m0AgOJtAIC+AAQA6m0AgO5tAIDybQCA9m0AgPptAID+bQCAhIwDAAJuAICHCAMAhuwEAAZuAIDviAIACm4AgA5uAICEbAQA4zQCABJuAIDhVAEAFm4AgBpuAIAebgCAIm4AgKhtAgCprQIAqqUCAKu9AgCspQIAra0CAK6lAgCvGQEAvqwEACZuAIAqbgCALm4AgDJuAIA2bgCAOm4AgD5uAIC4DQEAuREBALoRAQC7JQEAvD0BAL3VAQC+3QEAv9UBALBpAQCxaQEAsnkBALNxAQC0WQEAtVkBALY5AQC3NQEAsy0CAEJuAIBGbgCASm4AgE5uAIC2LQIAtS0CAFJuAIC7rQEAuq0BAFpuAIBebgCAv50BAL6dAQC9pQEAvK0BAIBNAACBVQAAglUAAO9sAABibgCA7+x/AO+8fgBmbgCA4RB/AOPUfwDj2H4A4ex/AGpuAIDhTH4Abm4AgOMkfgDmbQCAVm4AgKsFBgCqBQYArQ0GAKwFBgCvNQYArjUGAIYAAwCHKAMAo4UFAHJuAIClhQUAdm4AgHpuAICmhQUAs/EGAH5uAICCbgCAhm4AgIpuAIC26QYAteEGAI5uAIC7vQYAur0GAJJuAICWbgCAv4kGAL6BBgC9iQYAvJUGAKgpBgCpKQYAqjkGAKs5BgCsKQYArSkGAK5dBgCvTQYAmm4AgJ5uAICibgCApm4AgKpuAICubgCAsm4AgLZuAIC46QcAuekHALr5BwC7+QcAvOkHAL3pBwC+XQcAv1UHALA5BgCxOQYAsgEGALMdBgC0BQYAtQ0GALYFBgC32QcAo7EHAIItAACBFQAAgB0AALpuAICmqQcApaEHAL5uAICr/QcAqv0HAMJuAICEpAIAr8kHAK7BBwCtyQcArNUHAL7MAQCzlQYAxm4AgMpuAIC2qQYAzm4AgNJuAIC1rQYAulkBALshAQCGyAAAhwwBAL4hAQC/KQEAvDEBAL0xAQCoKQYAqSkGAKpZBgCrUQYArGEGAK1tBgCutQEAr6kBAITgAQDWbgCA2m4AgN5uAIDibgCA5m4AgOpuAIDubgCAuGEBALlhAQC6YQEAu2EBALxhAQC9YQEAvmEBAL9hAQCw2QEAsaEBALKhAQCzoQEAtKEBALWpAQC2kQEAt5EBAKPRBQDybgCA9m4AgPpuAID+bgCApu0FAKXpBQACbwCAq2UCAKodAgAGbwCACm8AgK9tAgCuZQIArXUCAKx1AgAObwCAEm8AgBZvAIAabwCAHm8AgCJvAIAmbwCAKm8AgIA9AACBCQAAghkAAC5vAIAybwCAOm8AgL48AwA+bwCAhgAMAIcUAwBCbwCAs9UDAEZvAIC1PQMAtjUDAEpvAIBObwCAv4wKALoRAwC7EQMAvLUAAL29AAC+tQAAv60AAFJvAIDjdAEAVm8AgOG8AQBabwCAXm8AgGJvAIBmbwCAam8AgG5vAIBybwCAdm8AgHpvAIDvdAIAfm8AgIJvAICoTQIAqVECAKpRAgCrqQIArLkCAK25AgCuqQIAr6kCAIRsDQCGbwCAim8AgI5vAICSbwCAlm8AgJpvAIC+dA0AuG0BALkFAQC6DQEAuwUBALwdAQC9BQEAvg0BAL8FAQCw2QIAsdkCALJtAQCzZQEAtH0BALVlAQC2ZQEAt1UBAOG4AQDhUAcA47QAAON8BwCAqQAAgQkAAII5AACebwCAom8AgKpvAICubwCAsm8AgO4AAAC2bwCA7wAAAO9kBgCGYAwAh+QMAKORAgC6bwCApXkCAL5vAIDCbwCApnECAMZvAIDKbwCAq1UCAKpVAgCt+QEArPEBAK/pAQCu8QEApm8AgDZvAIDObwCA0m8AgNZvAIDabwCA3m8AgOJvAICoVQ4AqVkOAKqhDgCrvQ4ArK0OAK2VDgCu+Q4Ar/UOALCRDgCxkQ4AspEOALORDgC0sQ4AtbEOALaxDgC3sQ4AuJEOALmdDgC6lQ4Au0kPALxZDwC9WQ8AvkkPAL9JDwCzCQ4A5m8AgOpvAIDubwCA8m8AgLY1DgC1BQ4A9m8AgLt1DgC6dQ4A+m8AgP5vAIC/VQ4AvlUOAL1lDgC8ZQ4AAnAAgKNNDgAGcACACnAAgKZxDgAOcACAEnAAgKVBDgCqMQ4AqzEOAISkAwC+pAMArhEOAK8RDgCsIQ4ArSEOAKilDgCprQ4AqqUOAKu5DgCs3Q4ArcEOAK7BDgCv/Q4AgO0BAIHxAQCC8QEAFnAAgIaQAQCHtAEAGnAAgB5wAIC4yQEAuckBALrZAQC70QEAvPkBAL35AQC+mQEAv5UBALCFDgCxbQEAsmUBALN9AQC0ZQEAtW0BALZlAQC3+QEAsy0OACJwAIAmcACAKnAAgC5wAIC2QQ4AtVUOADJwAIC7qQEAukEOADZwAIA6cACAv6kBAL6hAQC9qQEAvLEBAD5wAICjaQ4AQnAAgEZwAICmBQ4ASnAAgE5wAIClEQ4AqgUOAKvtAQBScACAVnAAgK7lAQCv7QEArPUBAK3tAQCoOQMAqTkDAKqNAwCrhQMArJ0DAK2FAwCuhQMAr7UDAFpwAIBecACAYnAAgGZwAIBqcACAbnAAgHJwAIB2cACAuGEAALlhAAC6YQAAu2EAALxhAAC9YQAAvmEAAL9hAACwzQMAsaUDALKhAwCzoQMAtKUDALWtAwC2kQMAt5EDAIANAACBEQAAghEAAHpwAIDv9AIAfnAAgIJwAIC+HAMA4xQCAISIAgDhgAEAinAAgI5wAICScACAh8gDAIY8BAC7AQMAumkDAJZwAICacACAvwkDAL4BAwC9FQMAvBUDALNlAwCecACAonAAgKZwAICqcACAtmUDALV1AwCucACAsnAAgLZwAIC6cACAo4kCAL5wAIClmQIApokCAMJwAICELAIAxnAAgKqFAgCr7QIArPkCAK35AgCu7QIAr+UCAMpwAIDOcACAvkQFAIRMBQDScACA1nAAgNpwAIDecACA4nAAgOZwAIDqcACA7nAAgIAZAACBGQAAggUAAPJwAIDhGA8A4VwOAOO4DgDjdAEA+nAAgP5wAIACcQCABnEAgIYABACHZAUACnEAgA5xAIAScQCAFnEAgO98DgDvqAEAs3UBABpxAIAecQCAInEAgCZxAIC2MQEAtRUBACpxAIC7HQEAuhUBAC5xAIAycQCAv+EAAL79AAC9/QAAvP0AAPZwAIA2cQCAOnEAgD5xAICGcACAQnEAgEZxAIBKcQCAqI0GAKmVBgCqnQYAq+UGAKz9BgCt0QYArtEGAK/RBgCwsQYAsbkGALJJBwCzSQcAtFkHALVFBwC2RQcAt3kHALghBwC5IQcAujkHALs5BwC8KQcAvSkHAL4ZBwC/GQcAozUGAE5xAIBScQCAVnEAgFpxAICmcQYApVUGAF5xAICrXQYAqlUGAGJxAIC+oAMAr6EHAK69BwCtvQcArL0HAIBRAACBWQAAgmEAALNVBwCF9AAAtX0HALZ1BwBmcQCAhgAcAIfkAQC6LQcAuyUHALw9BwC9JQcAviUHAL8VBwCokQYAqZEGAKqRBgCrkQYArLkGAK25BgCuqQYAr6kGAGpxAIBucQCAcnEAgHZxAICiIQEAozUBAKA5BQChEQQAuEkBALlJAQC6XQEAu1UBALxNAQC90QEAvtEBAL/RAQCwpQYAsa0GALKlBgCzvQYAtK0GALWdBgC2lQYAt3kBAKMZBgCPnXkAenEAgH5xAICCcQCApjkGAKUxBgCGcQCAq2kGAKphBgCKcQCAjnEAgK9ZBgCuaQYArWkGAKxxBgCeiQgAn8EFAJzJCQCdyQkAmqENAJu9DACYsQ0AmbkNAJahcQCXRXEAlEV1AJWxcQCSoXUAk7V1AJDleQCRzXkAil1yAItFcgCScQCAvoAcAI51DgCPZQ4AjLlyAI11DgCCOXoAgzl6AJZxAICacQCAhnF2AIeZdgCECXoAhW12AJptBwCbVQIAnnEAgKJxAICmcQCA4ZAAAJxZAgDjCBoAkgkPAJNlCgCqcQCA7zgWAJZ1BgCXdQYAlH0KAJU1CwCpjRYAqIUWAKsBEACqMRYArXESAKy1EgCvuS4ArgEsAKF9AgCucQCAo6EeAKKpHgClsRoApPUfAKflGwCmsRoAhMwDAIRMHACycQCAtnEAgLpxAIC+cQCAwnEAgMZxAICxASgAsNkuALONKgCy6SoAtfUmALQBJACEcB0AynEAgID9AQCBFQAAgh0AAL6AHADOcQCA0nEAgIe4AgCGPB0A2nEAgN5xAIDicQCA5nEAgOpxAIDucQCA8nEAgPZxAID6cQCA/nEAgAJyAIAGcgCA44ADAApyAIDhoAEADnIAgO+UAwAScgCAFnIAgBpyAIAecgCAInIAgCZyAIAqcgCALnIAgOE8BgAycgCA49AGADZyAIDhMAcAOnIAgOOsBgCAOQAAgRUAAIIdAADvHAYAPnIAgEJyAIC+uB8A7+gBALPpAgBKcgCAh8QcAIbsHABOcgCAtlkCALVRAgBScgCAu00CALpNAgBWcgCAWnIAgL+5AQC+2QEAvdEBALz1AQCjKR0A1nEAgEZyAIBecgCAYnIAgKaZHQClkR0AZnIAgKuNHQCqjR0AanIAgG5yAICveR4ArhkeAK0RHgCsNR4AcnIAgLNtHwB2cgCAenIAgLZlHwB+cgCAgnIAgLVtHwC6IR8AuyEfAIZyAICKcgCAviUfAL8pHwC8MR8AvTEfAKihHwCpoR8AqqEfAKuhHwCsoR8AraEfAK6hHwCvoR8AjnIAgJJyAICWcgCAmnIAgJ5yAICicgCApnIAgKpyAIC4rR8AubUfALq9HwC7tR8AvK0fAL1VHwC+UR8Av00fALChHwCxoR8AsqEfALOhHwC0pR8AtakfALadHwC3lR8AoykeAIIZAACBGQAAgLEBAK5yAICmIR4ApSkeALJyAICrZR4AqmUeAIaIAACH/AEAr20eAK5hHgCtdR4ArHUeALZyAICzmR4AunIAgL5yAIC2XQEAwnIAgMZyAIC1sR4AukkBALtJAQDKcgCAznIAgL49AQC/IQEAvDkBAL01AQCoRR4AqVUeAKpVHgCrZR4ArH0eAK2ZAQCuiQEAr4EBAISsAADScgCA1nIAgNpyAIDecgCA4nIAgOZyAIDqcgCAuK0BALllAQC6bQEAu2UBALx9AQC9ZQEAvm0BAL9lAQCwyQEAsckBALKpAQCzpQEAtL0BALWhAQC2oQEAt5UBALhpHAC5oRwAusEcALvBHAC8wRwAvcEcAL7BHAC/wRwAsIkfALGJHwCyIRwAswUcALQdHAC1fRwAtnUcALdtHACoYR8AqWEfAKphHwCrYR8ArNkfAK3ZHwCuyR8Ar8EfAO5yAIDycgCA9nIAgPpyAID+cgCAAnMAgAZzAIAKcwCADnMAgBJzAIC+AAQAo1EdABZzAICleR0AppUCABpzAIAecwCAInMAgKqBAgCrgQIArPECAK39AgCu9QIAr+kCACpzAIDh9AEALnMAgON8AQCATQAAgXUAAIJ9AAAycwCAhsAEAIekBAA2cwCAOnMAgD5zAIBCcwCARnMAgO+MAgCoSQIAqUkCAKpdAgCrVQIArHkCAK15AgCuvQIAr7UCAISgBQBKcwCATnMAgFJzAIC+vAQAVnMAgFpzAIBecwCAuC0BALk1AQC6PQEAuzUBALwtAQC91QEAvt0BAL/NAQCwzQIAsdUCALLdAgCz1QIAtM0CALUVAQC2HQEAtxUBAOGEHgDjbB8A41wfAOFYHgBicwCAZnMAgGpzAIBucwCAcnMAgHZzAIB6cwCAfnMAgOkAAADv9B4A70weAIJzAICzlQIAhnMAgIpzAICOcwCAknMAgLa5AgC1sQIAmnMAgLtRAgC6SQIAhsgEAIesBAC/kQEAvkkCAL1BAgC8SQIAJnMAgKNRBQCecwCAlnMAgKZ9BQCicwCApnMAgKV1BQCqjQUAq5UFAKpzAICucwCAro0FAK9VBgCsjQUArYUFAICJBwCBiQcAgpkHALORBgCycwCAtbkGALapBgC2cwCAunMAgL5zAIC6TQcAu0UHALxdBwC9QQcAvkEHAL9BBwCoQQYAqU0GAKpVBgCrZQYArH0GAK1lBgCubQYAr2UGAMJzAIDGcwCAynMAgM5zAIDScwCA1nMAgNpzAIDecwCAuFkHALlZBwC6aQcAu2kHALx5BwC9eQcAvmUHAL8ZBwCwxQcAsc0HALLFBwCz2QcAtMkHALXJBwC2aQcAt2kHAKPdBwDicwCA5nMAgOpzAIDucwCApuUHAKX1BwDycwCAqwkGAKoBBgD2cwCA+nMAgK8NBgCuDQYArQ0GAKwRBgCAbQAAgQkAAIIZAAD+cwCAAnQAgISYAQC+kAEABnQAgIbAAACH5AEACnQAgA50AIASdACAFnQAgBp0AIAedACAqF0GAKmNAQCqnQEAq5UBAKy5AQCtuQEArskBAK/BAQCEoAAAInQAgCZ0AIAqdACALnQAgDJ0AIA2dACAOnQAgLh5AQC5eQEAus0AALvFAAC83QAAvcUAAL7FAAC/9QAAsIEBALGBAQCySQEAs0kBALRZAQC1WQEAtkkBALdJAQCzFQIAPnQAgEJ0AIBGdACASnQAgLY5AgC1MQIATnQAgLtFAgC6RQIAUnQAgFZ0AIC/nQIAvp0CAL2dAgC8nQIAhXw+AKNRAgBadACAXnQAgKZ9AgBidACAZnQAgKV1AgCqAQIAqwECAGp0AIBudACArtkCAK/ZAgCs2QIArdkCAIDpAACB6QAAggUAAHJ0AIC+AAwAenQAgIeoAwCGvAwAfnQAgIJ0AICGdACAinQAgI50AICSdACAlnQAgJp0AICedACAonQAgKZ0AICqdACA42ABAK50AIDhoAEAsnQAgO+IAgC2dACAunQAgL50AIDCdACAxnQAgMp0AIDOdACAqGkCAKlpAgCqeQIAq3kCAKxpAgCtaQIArr0CAK+1AgC+rAwA0nQAgNZ0AIDadACAgB0AAIEJAACCqQAA3nQAgLhRAQC5WQEAumEBALthAQC8GQEAvRkBAL4NAQC/BQEAsM0CALHVAgCy3QIAs9UCALTNAgC1cQEAtnEBALdxAQDjxAAA4XwHAOF4BgDjvAYA4nQAgIQYDQCGuAwAhzwNAL4sDwDqdACA7nQAgPJ0AIDvEAAA9nQAgPp0AIDvdAYA/nQAgAJ1AIAGdQCAs70CAAp1AIC1rQIAtqUCAA51AIASdQCAFnUAgLpFAgC7XQIAvEUCAL1NAgC+RQIAv/kBAHZ0AIClfQ0ApnUNAOZ0AIAadQCAHnUAgCJ1AICjbQ0ArJUNAK2dDQCulQ0ArykOACZ1AIAqdQCAqpUNAKuNDQCz5Q4ALnUAgDJ1AIA2dQCAOnUAgLblDgC19Q4APnUAgLuhDgC62Q4AQnUAgEZ1AIC/pQ4AvrkOAL2xDgC8uQ4AqBUOAKklDgCqLQ4AqyUOAKw9DgCtJQ4Ari0OAK8lDgCADQAAgRUAAIIdAABKdQCATnUAgFJ1AICEMAMAVnUAgLgpDgC5KQ4AujkOALs5DgC8KQ4AvSkOAL79DwC/9Q8AsF0OALElDgCyLQ4AsyUOALQ9DgC1IQ4AtiUOALcZDgCjpQ8AWnUAgIYoAQCHTAEAXnUAgKalDwCltQ8AYnUAgKvhDwCqmQ8AZnUAgGp1AICv5Q8ArvkPAK3xDwCs+Q8AbnUAgLPpDgBydQCAdnUAgLaRDgB6dQCAfnUAgLXlDgC6sQ4Au7kOAIJ1AICGdQCAvmEBAL9hAQC8mQ4AvZkOAKglDgCpLQ4AqiUOAKs5DgCsKQ4ArVUOAK5dDgCvVQ4AinUAgI51AICSdQCAlnUAgJp1AICedQCAonUAgKZ1AIC49QEAuYEBALqBAQC7gQEAvIEBAL2JAQC+sQEAv7EBALAxDgCxOQ4AsgkOALMJDgC04QEAteEBALbhAQC3zQEAo60NAKp1AICudQCAsnUAgLZ1AICm1Q0ApaENALp1AICr/Q0AqvUNAL51AIDCdQCAryUCAK4lAgCt3Q0ArN0NAIBdAACBbQAAgmUAALNRAwC+nAMAtXkDALYZAwDKdQCAhOACAM51AIC6PQMAuzUDALwZAwC9GQMAvtkDAL/ZAwCohQMAqZUDAKqVAwCrpQMArL0DAK3VAwCu0QMAr9EDAIYABACHNAMAv6AzANJ1AIDWdQCA2nUAgN51AIDidQCAuHEDALlxAwC6cQMAu3EDALzVAAC93QAAvtUAAL/NAACwtQMAsb0DALKBAwCzgQMAtFEDALVRAwC2UQMAt1EDAO+oAwDmdQCA6nUAgO51AICEHAIA8nUAgPZ1AID6dQCAviwFAP51AIACdgCABnYAgONAAwAKdgCA4SgAAA52AICjXQIAEnYAgBZ2AIAadgCAHnYAgKYVAgCldQIAInYAgKs5AgCqMQIAJnYAgCp2AICv1QIArtUCAK0VAgCsFQIA4ygBAOEADwDhCA4A4wgOAID9AACBCQAAgjkAAC52AIAydgCAOnYAgD52AIBCdgCA7+gOAEZ2AIBKdgCA72QOALNtAQBOdgCAhugEAIcMBQBSdgCAtm0BALVtAQBWdgCAu+0AALrtAABadgCAXnYAgL/VAAC+6QAAveEAALzpAACoXQYAqWEGAKqlBgCrvQYArKUGAK2tBgCupQYArxkHADZ2AIBidgCAZnYAgGp2AIBudgCAcnYAgHZ2AIB6dgCAuHUHALl5BwC6DQcAuwUHALwdBwC9BQcAvgUHAL81BwCwaQcAsWkHALJ9BwCzdQcAtG0HALVRBwC2UQcAt1EHAKMtBgB+dgCAgnYAgIZ2AICKdgCApi0GAKUtBgCOdgCAq60HAKqtBwCSdgCAlnYAgK+VBwCuqQcAraEHAKypBwCADQAAgRUAAIIdAACadgCAnnYAgKJ2AICEVAMAvlwAAKZ2AICqdgCAhugAAIdMAwCudgCAsnYAgLZ2AIC6dgCAvnYAgOMEBADCdgCA4bQFAMZ2AIDKdgCAznYAgNJ2AIDWdgCA2nYAgN52AIDidgCA5nYAgO/sBADqdgCA7nYAgLPtBgDydgCA9nYAgPp2AID+dgCAtpEGALXhBgACdwCAu40GALqNBgAGdwCACncAgL9BAQC+WQEAvVEBALxZAQCoJQYAqS0GAKolBgCrOQYArCkGAK1RBgCuSQYAr0EGAIDNAACBCQAAghkAAA53AIASdwCAhCwBAL40AAAadwCAuP0BALlBAQC6QQEAu0EBALxBAQC9SQEAvnEBAL9xAQCwCQYAsQkGALLNAQCzxQEAtN0BALXFAQC2zQEAt8UBAIagPACHRAMAHncAgKOhBQAidwCApa0FAKbdBQAmdwCAKncAgL4oPACqwQUAq8EFAKwVAgCtHQIArhUCAK8NAgC2QQMALncAgDJ3AIC1sQIANncAgLOhAgA6dwCAPncAgL5FAwC/TQMAvHUDAL1NAwC6ZQMAu20DAEJ3AIBGdwCASncAgE53AIDGdQCAUncAgFZ3AIBadwCAXncAgGJ3AICoRQIAqVUCAKpdAgCrVQIArE0CAK21AwCusQMAr60DALDVAwCx3QMAstUDALPtAwC09QMAtf0DALb1AwC37QMAuNkDALnZAwC6rQMAu6UDALy9AwC9pQMAvqUDAL+VAwCj9QMAZncAgGp3AIBudwCAcncAgKYVAgCl5QMAdncAgKs5AgCqMQIAencAgH53AICvGQIArhECAK0ZAgCsIQIAgGkAAIFpAACCBQAAgncAgIp3AICOdwCAkncAgO8cAACEbAIA4ZQBAJZ3AIDjyAAAmncAgJ53AICGWDwAh1A9AKJ3AICmdwCAqncAgISEPQCudwCAsncAgLZ3AIDvuAEAvmw8AOF0BgC6dwCA42QBAL53AIDCdwCAxncAgMp3AICz0QEAzncAgNJ3AIDWdwCA2ncAgLaRAQC1+QEA3ncAgLu9AQC6vQEA4ncAgOZ3AIC/dQEAvnUBAL2FAQC8hQEAqL09AKkNPgCqGT4AqxE+AKwxPgCtUT4ArlE+AK9NPgCGdwCAgh0AAIEdAACAHQAA6ncAgO53AIDydwCA9ncAgLjVPgC53T4AutU+ALtJPwC8WT8AvVk/AL5JPwC/QT8AsDk+ALE5PgCyET4AsxE+ALTxPgC18T4AtvU+ALftPgCjkT4A+ncAgIYoAACHwAMA/ncAgKbRPgCluT4AAngAgKv9PgCq/T4ABngAgAp4AICvNT4ArjU+AK3FPgCsxT4ADngAgLOdPwASeACAFngAgLalPwAaeACAHngAgLWtPwC6aT8Au3U/ACJ4AIAmeACAvlk/AL9FPwC8bT8A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IoUAgOH8AQBWgwCAJoUAgO/IBgAqhQCALoUAgDKFAICzjQMANoUAgLWNAwA6hQCAPoUAgLa1AwBChQCARoUAgLtBAwC6SQMAvUEDALxZAwC/QQMAvkkDAKNFDACmhACAFoUAgEqFAIBOhQCApn0MAKVFDABShQCAq4kMAKqBDABWhQCAWoUAgK+JDACugQwArYkMAKyRDACAFQ8AgR0PAIIhDwCzIQ4AXoUAgLUhDgC2JQ4AYoUAgGaFAIBqhQCAusEOALvBDgC8wQ4AvcEOAL7BDgC/wQ4AqK0OAKntDgCq5Q4Aq/0OAKzlDgCt6Q4ArjkOAK85DgBuhQCAcoUAgHaFAIB6hQCAgB0AAIEJAACCvQEAfoUAgLjNDwC51Q8AutUPALvlDwC8/Q8AvZUPAL6RDwC/kQ8AsEkOALFJDgCyWQ4As1kOALRJDgC1SQ4Atv0PALf1DwCjbQ8AgoUAgL6EAQCKhQCAjoUAgKZpDwClbQ8AkoUAgKuNDwCqjQ8AhogAAIdsAQCvjQ8Aro0PAK2NDwCsjQ8AloUAgLPtDgCahQCAnoUAgLaRDgCihQCApoUAgLXhDgC6tQ4Au70OAKqFAICuhQCAvn0BAL9lAQC8mQ4AvZkOAKgRDgCpJQ4AqiEOAKs5DgCsLQ4ArVUOAK5dDgCvUQ4AhKgAALKFAIC2hQCAuoUAgL6FAIDChQCAxoUAgMqFAIC47QEAuZUBALqVAQC7rQEAvLUBAL11AQC+fQEAv3UBALA1DgCxPQ4AsgkOALMJDgC0/QEAteUBALblAQC31QEAo6kNAM6FAIDShQCA1oUAgNqFAICm1Q0ApaUNAN6FAICr+Q0AqvENAOKFAIDmhQCAryECAK45AgCt3Q0ArN0NAIANAACBFQAAgh0AAOqFAIDuhQCA8oUAgIeQAwCGfAQAvuwEAPqFAID+hQCAAoYAgAaGAIAKhgCADoYAgBKGAICyLQ4AszUOALAtDgCxJQ4Ati0OALedDwC0LQ4AtSUOALq9DwC7jQ8AuKUPALm9DwC+LQ8AvxUPALyVDwC9JQ8AFoYAgBqGAIAehgCAIoYAgCaGAIAqhgCALoYAgDKGAICqpQ4Aq7UOAKjFDgCp3Q4Arp0OAK9VDgCspQ4ArZUOAKgNAgCpFQIAqhUCAKtNAgCsWQIArVkCAK5NAgCvRQIAhKgFADaGAIA6hgCA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mogAgJ6IAIC+cAMAgGkAAIFpAACCeQAAhAAEAIbwBACHdAMAoogAgO8MHwCmiACA4aweAKqIAIDj8B4ArogAgLKIAIC2iACAuogAgL6IAIDCiACAxogAgMqIAIDvVAIAzogAgNKIAIDWiACA46QCANqIAIDhgAEA3ogAgOKIAIDmiACA6ogAgO6IAICzRQMA8ogAgPaIAID6iACA/ogAgLZFAwC1VQMAAokAgLshAwC6SQMAvqAEAAqJAIC/KQMAviEDAL01AwC8OQMAqDkCAKk5AgCqjQIAq4UCAKydAgCthQIAroUCAK+1AgCA7QEAgfUBAIL1AQAOiQCAhpAEAIcEBQASiQCAFokAgLhFAQC5TQEAukUBALtdAQC8SQEAvUkBAL55AQC/eQEAsM0CALGlAgCyrQIAs6ECALSlAgC1rQIAtp0CALd9AQAaiQCAHokAgCKJAIAmiQCAKokAgC6JAIAyiQCA74gBAITsBADhVB4ANokAgONUAQA6iQCAPokAgEKJAIBGiQCAo0UCAEqJAIBOiQCAUokAgFaJAICmRQIApVUCAFqJAICrIQIAqkkCAF6JAIBiiQCArykCAK4hAgCtNQIArDkCAKg1BgCpPQYAqlEGAKttBgCseQYArWUGAK5tBgCvZQYABokAgGaJAIBqiQCAbokAgIAZAACBGQAAggUAAHKJAIC45QYAuekGALr5BgC7+QYAvOkGAL3pBgC+nQYAv5UGALAdBgCx5QYAsu0GALPlBgC0/QYAteEGALbhBgC34QYAs9kGAL7QAwB2iQCAeokAgH6JAIC25QYAtfEGAIKJAIC7IQYAutkGAIaYAACHeAMAvyUGAL45BgC9MQYAvDkGAIaJAICjnQYAiokAgI6JAICmoQYAkokAgJaJAICltQYAqp0GAKtlBgCaiQCAnokAgK59BgCvYQYArH0GAK11BgCo7QcAqSkGAKoxBgCrMQYArJEGAK2RBgCukQYAr5EGAKKJAICmiQCAqokAgK6JAICyiQCAtokAgLqJAIC+iQCAuIUGALmNBgC6hQYAu50GALyNBgC9vQYAvrUGAL95AQCw8QYAsfEGALLxBgCzxQYAtMEGALXBBgC2wQYAt8EGALO5BgDCiQCAxokAgMqJAIDOiQCAthEGALUZBgDSiQCAuzUGALo1BgDWiQCA2okAgL8FBgC+BQYAvREGALwlBgClQQYA3okAgOKJAICmSQYAgRUAAIB5AACj4QYAghUAAK1JBgCsfQYAr10GAK5dBgCENAEAlogAgKttBgCqbQYAvswDAOqJAICzlQIA7okAgLXZAgDyiQCA9okAgLbRAgCGgAwAhzgDALvFAgC6xQIAvRUDALwVAwC/FQMAvhUDAPqJAID+iQCA71gGAIRAAwACigCABooAgAqKAIAOigCAEooAgBaKAIAaigCAHooAgOE4BgAiigCA4yQGAL5wDACsSQIArUkCAK5dAgCvVQIAqB0CAKkFAgCqBQIAq10CAISoDAAmigCAKooAgC6KAIC+vA0AMooAgDaKAIA6igCAvE0DAL1VAwC+VQMAv2UDALjpAwC56QMAul0DALtVAwC0yQMAtckDALbZAwC32QMAsBkCALEZAgCy2QMAs9kDAD6KAIDj5AAAQooAgOG8AQBGigCAgj0AAIE9AACAPQAASooAgE6KAIBSigCAWooAgF6KAIDvzAMAYooAgGaKAICj3QMAaooAgIboDACHYA0AbooAgKaZAwClkQMAcooAgKuNAwCqjQMAdooAgHqKAICvXQIArl0CAK1dAgCsXQIAfooAgIKKAICGigCAiooAgI6KAICSigCAlooAgO/gAQCEvAwA4YwGAJqKAIDjHAYAnooAgKKKAICmigCAqooAgLPVAQCuigCAsooAgLaKAIC6igCAtpEBALWZAQC+igCAu70BALq9AQDCigCAyooAgL+dAQC+nQEAvZ0BALydAQCoBQ4AqQkOAKodDgCrFQ4ArFEOAK1RDgCuSQ4Ar0kOAFaKAICCzQ8AgfUPAID9DwDGigCAzooAgIYcAACHsAMAuOkOALnpDgC6/Q4Au/UOALztDgC9VQ8AvlEPAL9NDwCwOQ4AsTkOALIJDgCzCQ4AtBkOALUZDgC2DQ4At9kOAKOVDgDSigCA1ooAgNqKAIDeigCAptEOAKXZDgDiigCAq/0OAKr9DgDmigCA6ooAgK/dDgCu3Q4Ard0OAKzdDgDuigCAs/0PAPKKAID2igCAtoEPAPqKAID+igCAtZkPALqNDwC7ZQ8AAosAgAaLAIC+fQ8Av2UPALx9DwC9dQ8AqC0OAKk1DgCqMQ4AqzEOAKxVDgCtRQ4ArkUOAK91DgAKiwCADosAgBKLAIAWiwCAGosAgB6LAIAiiwCAJosAgLjpDgC59Q4Auv0OALv1DgC87Q4AvZEOAL6RDgC/kQ4AsA0OALHlDgCy7Q4As+UOALT9DgC15Q4Atu0OALflDgCjuQ4Agi0AAIEVAACAHQAAKosAgKbFDgCl3Q4ALosAgKshDgCqyQ4AMosAgL4sAQCvIQ4ArjkOAK0xDgCsOQ4AOosAgLZVAQC1RQEANosAgLNVAQA+iwCAhngAAIdcAAC/OQEAvjEBAL0lAQC8JQEAuzEBALpZAQDmiQCAQosAgEaLAIBKiwCAhAQDAKOJAgBOiwCApZkCAKaJAgBSiwCAvyg5AFaLAICqhQIAq+0CAKz5AgCt+QIAru0CAK/lAgDjWAIA78AOAOGIAQBaiwCAXosAgGKLAIBmiwCAaosAgG6LAIByiwCAdosAgHqLAIDvKAIA4ygOAH6LAIDhRA4AqbUCAKhpDQCrAQIAqgkCAK0BAgCsGQIArzECAK4BAgC+AAQAgosAgIaLAICKiwCAjosAgJKLAICWiwCAmosAgLnlAwC45QMAu+UDALrlAwC95QMAvOUDAL/lAwC+5QMAsSECALBJAgCzJQIAsiUCALUpAgC0IQIAtxUCALYVAgCowQIAqdECAKr1AgCrDQEArBUBAK0FAQCuBQEArzkBAJ6LAICiiwCAqosAgK6LAICyiwCAtosAgLqLAIC+iwCAuC0BALk9AQC67QEAu+UBALz9AQC95QEAvu0BAL/lAQCwLQEAsTUBALI9AQCzNQEAtC0BALUVAQC2HQEAtxUBAIA9AQCBpQAAgq0AAO/YAACGsAUAh9gFAMKLAIDv1A8AhGwEAOH0DgDGiwCA4xwPAMqLAIDhlAEAzosAgOMMDgCzPQIA0osAgNaLAIDaiwCA3osAgLbFAQC13QEA4osAgLuxAQC6qQEA5osAgOqLAIC/kQEAvqkBAL2hAQC8qQEAposAgO6LAICqRQYAq10GAKxFBgCtTQYArkUGAK99BgDyiwCA9osAgPqLAICj0QUA/osAgKUxBgCmKQYAAowAgAaMAICCHQAAgR0AAIAdAAAKjACADowAgBKMAIC+lAMAFowAgBqMAICGSAMAh8wDAB6MAIAijACAJowAgCqMAICoqQcAqakHAKq5BwCruQcArKkHAK2pBwCuAQcArzUHAC6MAIAyjACANowAgDqMAIA+jACAQowAgEaMAIBKjACAuC0HALnBAAC66QAAu+kAALz5AAC95QAAvuUAAL+dAACwUQcAsV0HALItBwCzJQcAtD0HALUlBwC2JQcAtxUHALMxBgBOjACAUowAgFaMAIBajACAtikGALUhBgBejACAu5kGALqVBgBijACAZowAgL/hBgC++QYAvfEGALz5BgBqjACAo3UGAG6MAIByjACApm0GAHaMAIB6jACApWUGAKrRBgCr3QYAfowAgIKMAICuvQYAr6UGAKy9BgCttQYAqOUBAKn1AQCq/QEAq/UBAKztAQCtNQEArj0BAK81AQCA+QAAgc0AAILFAACEYAEAvngBAIqMAICHrAAAhpABALjRAAC52QAAuuEAALvhAAC8kQAAvZ0AAL6VAAC/iQAAsE0BALFVAQCyXQEAs1UBALRNAQC18QAAtvEAALfxAACzdQIAjowAgJKMAICWjACAmowAgLa1AgC1ZQIAnowAgLuRAgC6iQIAoowAgKaMAIC/NQMAvokCAL2BAgC8iQIAqowAgKMxAgCujACAhMADAKbxAgCyjACAtowAgKUhAgCqzQIAq9UCALqMAIC+jACArs0CAK9xAwCszQIArcUCAKuNAACqjQAAqY0AAKg5AwCvvQAArr0AAK2FAACsjQAAqgAAAKsAAADCjACAxowAgMqMAIDOjACA0owAgNaMAIC7fQAAun0AALl9AAC4fQAAv90BAL7dAQC93QEAvN0BALO5AACysQAAsaEAALCtAAC3XQAAtl0AALWVAAC0lQAA2owAgN6MAIDijACA5owAgIE1AACADQAA6owAgII1AAC+rD0A7owAgPKMAICFaD0A+owAgP6MAICGODwAh8ACALNJAQACjQCA0AAAAAaNAIAKjQCAtkkBALVJAQAOjQCAuykBALolAQASjQCAFo0AgL8dAQC+HQEAvSEBALwpAQDjNDYA4QwGAOGwAgDjPAYAGo0AgB6NAIAijQCAJo0AgIQsPwC+oD8AKo0AgC6NAIDvfDcAMo0AgDaNAIDvGAEAOo0AgD6NAICGaD4Ah8w/AEKNAIBGjQCASo0AgO+UAABOjQCA4ZQBAFKNAIDjUAAAVo0AgILpPwCB6T8AgPE/AKMJPgCPASQA9owAgFqNAIBejQCApgk+AKUJPgBijQCAq2k+AKplPgBmjQCAao0AgK9dPgCuXT4ArWE+AKxpPgCeYTgA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vY0CAL69AgC/fQMAsFkCALFZAgCy7QIAs+UCALT9AgC15QIAtuUCALfVAgCjUQUAEpIAgBaSAIAakgCAHpIAgKZ5BQClcQUAIpIAgKudAgCqnQIAJpIAgCqSAICvIQIArjkCAK0xAgCsOQIAghEAAC6SAICAZQAAgQkAADKSAIC+mAMAOpIAgD6SAICEJAMAQpIAgIdoAwCGjBwARpIAgEqSAIBOkgCAUpIAgFaSAIBakgCAs6ECAITAHAC10QIAXpIAgGKSAIC21QIAZpIAgGqSAIC7wQIAuvUCAL0RAQC82QIAvxEBAL4ZAQBukgCAcpIAgHaSAIB6kgCAfpIAgIKSAICGkgCA77gGAIqSAIDhnAQAjpIAgON0BgCSkgCAlpIAgJqSAICekgCAgPkAAIH5AACCBQAAopIAgL5YHACEWB8A71wAAO9ABgDhkAEA4fwGAOM8AADjdAYAqpIAgK6SAICGmBwAh/QcAKNpAgC+DB8AspIAgLaSAIC6kgCAph0CAKUZAgC+kgCAqwkCAKo9AgDCkgCAxpIAgK/ZAQCu0QEArdkBAKwRAgCokR0AqZkdAKqhHQCroR0ArNEdAK3dHQCu1R0Ar8kdADaSAICmkgCAypIAgM6SAIDSkgCA1pIAgNqSAIDekgCAuHkeALl5HgC6zR4Au8UeALzdHgC9xR4AvsUeAL/1HgCwuR0AsY0dALKFHQCzTR4AtFUeALVdHgC2VR4At0keALjNHwC51R8Aut0fALvVHwC88R8Avf0fAL7pHwC/6R8AsKUfALGxHwCysR8As40fALSVHwC19R8Atv0fALf1HwCoGR4AqRkeAKotHgCrPR4ArCUeAK0tHgCuJR4Ar90fAOKSAIDmkgCA6pIAgO6SAIDykgCAxpEAgPaSAID6kgCAs+UfAP6SAIACkwCABpMAgAqTAIC27R8Ate0fAA6TAIC7NR4AuiEeABKTAIAWkwCAv3EeAL4RHgC9GR4AvCUeAIJpAACjoR8AgFkAAIFRAACmqR8AGpMAgB6TAIClqR8AqmUeAKtxHgCGAAQAh+wBAK5VHgCvNR4ArGEeAK1dHgCoMR4AqTEeAKpBHgCrQR4ArEEeAK1JHgCucR4Ar3EeACKTAIAmkwCAKpMAgC6TAIAykwCANpMAgDqTAIA+kwCAuCkBALkpAQC6OQEAuzUBALwtAQC90QAA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qnkOAKshDgC2lQCAupUAgK4hDgCvKQ4ArDEOAK0xDgCoYQ4AqXUOAKp9DgCrdQ4ArG0OAK31DgCu/Q4Ar/UOAIaAAQCHpAEAvpUAgMKVAIDGlQCAypUAgM6VAIDSlQCAuHUBALl9AQC6dQEAu8kBALzdAQC9xQEAvsUBAL/1AQCwjQ4AsZUOALKdDgCzkQ4AtFUBALVdAQC2VQEAt00BALP1DgDWlQCA2pUAgN6VAIDilQCAtnUOALXlDgDmlQCAu1EOALpJDgDqlQCA7pUAgL+ZAQC+kQEAvUUOALxJDgDylQCAo7EOAPaVAID6lQCApjEOAP6VAIAClgCApaEOAKoNDgCrFQ4ABpYAgAqWAICu1QEAr90BAKwNDgCtAQ4AqO0CAKktAwCqJQMAqz0DAKwlAwCtLQMAriUDAK+ZAwAOlgCAEpYAgBaWAIAalgCAHpYAgCKWAIC+dAIAKpYAgLiNAwC5kQMAupEDALulAwC8vQMAvXUAAL59AAC/dQAAsOkDALHpAwCy+QMAs/EDALTZAwC12QMAtrkDALe1AwCArQAAgbUAAIK9AACzoQMALpYAgLWhAwC2oQMAMpYAgITgAgA2lgCAuiEDALshAwC8IQMAvSkDAL4RAwC/EQMAo+0DAIXABACFtG8AOpYAgD6WAICm7QMApe0DAEKWAICrbQMAqm0DAIZIBQCHbAMAr10DAK5dAwCtZQMArG0DAEaWAIDjAA4A71hsAOG0DwBKlgCATpYAgFKWAIBWlgCAoakDAKD9DwCjwQMAog0DAOHgAwDv4A8A4+QDAFqWAIBelgCAYpYAgIQEBAC+BAQAZpYAgO+UAwBqlgCAbpYAgHKWAIDj1AMAdpYAgOFUAAB6lgCAfpYAgIKWAICGlgCAgA0AAIEVAACCHQAAipYAgI6WAICSlgCAj5EbAO+cDgCE4AcA4dQOAJqWAIDj8A4AnpYAgKKWAICGGAcAh5AEAJnlFwCY5RcAm+kLAJo5CwCd/QoAnPELAJ9VDwCeXQ8AkSkfAJDNGwCTJR8Aks0fAJXREwCUKRMAlxkXAJZ1EwCM4RAAjSUQAI4tEACP+QwAJpYAgJaWAICKORQAi5UUAITpGACFBRgAhuUYAIfxFACmlgCAqpYAgIIxHACDFRwAnKkEAK6WAICylgCAtpYAgLqWAIC+lgCAmtEEAJt9BACUTQ0AleUIAJblCACXtQgAwpYAgMaWAICSWQwAk1kMAKGRAADKlgCAowF8AKKZAACluXwApJF8AKeZeACm4X0AqYF5AKiheACriXQAqgF0AK0BcACsWXQAr4VwAK6dcACx4WwAsAFsALMBaACyHWwAtfVoALT1aADOlgCA0pYAgNaWAIDalgCA3pYAgOKWAIDmlgCA6pYAgO6WAIDylgCAqD0HAKmVBwCqlQcAq6kHAKzdBwCtxQcArsUHAK8dBgD2lgCAgh0AAIEdAACAHQAA+pYAgP6WAIAClwCAvmABALgZBgC5GQYAuikGALslBgC8IQYAvSEGAL4hBgC/IQYAsHEGALFxBgCycQYAs3EGALRNBgC1NQYAtj0GALctBgCzHQcACpcAgIYoAACHqAAADpcAgLZFBwC1VQcAEpcAgLu1BgC6tQYAFpcAgBqXAIC/8QYAvokGAL2lBgC8pQYAHpcAgKNZBwAilwCAJpcAgKYBBwAqlwCALpcAgKURBwCq8QYAq/EGADKXAIA2lwCArs0GAK+1BgCs4QYAreEGAKipBQCptQUAqr0FAKs9AgCsJQIArVECAK5RAgCvUQIAOpcAgD6XAIBClwCARpcAgIQ8AwBKlwCATpcAgFKXAIC4pQIAua0CALqlAgC7vQIAvKUCAL2tAgC+pQIAv30DALAxAgCxMQIAshkCALMZAgC09QIAta0CALalAgC3nQIAVpcAgFqXAIBelwCAszkFAGKXAIC1oQIAtt0CAGaXAIBqlwCAbpcAgLr5AgC7+QIAvMECAL3BAgC+PQIAv2UCAHKXAICmgQIApf0CAHqXAICjZQUAvlh8AIbYfACHnHwArzkCAK5hAgCtnQIArJ0CAKulAgCqpQIAfpcAgIKXAICohQIAqZUCAKqVAgCrpQIArL0CAK3VAgCu0QIAr9ECAIGFAQCAhQEAhpcAgILtAQCKlwCAjpcAgJKXAICWlwCAuHUBALl9AQC6dQEAu80BALzVAQC93QEAvskBAL/BAQCwtQIAsb0CALKBAgCzgQIAtFEBALVRAQC2UQEAt1EBAJqXAICelwCAopcAgKaXAIDhMAYA4WQHAOMoBgDjxAYAhCB9AKqXAIDvbAAA7xgGAK6XAICylwCAtpcAgLqXAICzXQIAvkh8AL6XAIDClwCAxpcAgLYVAgC1dQIAypcAgLs5AgC6MQIAzpcAgNKXAIC/1QEAvtUBAL0VAgC8FQIAo519AHaXAIDWlwCA2pcAgN6XAICm1X0ApbV9AOKXAICr+X0AqvF9AOaXAIDqlwCArxV+AK4VfgCt1X0ArNV9AIBNAACBVQAAglUAALOxfgDulwCAtWV/ALZtfwDylwCAhkADAIcEAwC66X8Au+l/ALz5fwC9+X8Avt1/AL/NfwD2lwCA+pcAgAaXAID+lwCAApgAgAaYAIAKmACADpgAgKhtfgCpXX4AqlV+AKuFfwCsgX8ArYF/AK6BfwCvgX8AsEF/ALFBfwCyQX8As0F/ALR1fwC1ZX8Atm1/ALdlfwC4XX8AuS1/ALolfwC7PX8AvC1/AL0dfwC+FX8Av/UAAKP9fwASmACAFpgAgBqYAIAemACApiF+AKUpfgAimACAq6V+AKqlfgAmmACAKpgAgK+BfgCukX4ArbV+AKy1fgAumACAMpgAgDaYAIA6mACAPpgAgEKYAIBGmACASpgAgIA9AACBCQAAghkAAE6YAIBSmACAhLgBAL6wAQBWmACAqK0BAKnVAQCq1QEAqw0BAKwVAQCtGQEArgkBAK8JAQCGAAQAhwQBAFqYAIBemACAYpgAgGaYAIBqmACAbpgAgLjtAAC5hQAAuo0AALuFAAC8nQAAvYUAAL6NAAC/hQAAsHkBALF5AQCy7QAAs+UAALT9AAC15QAAtuUAALfVAACzXQIAcpgAgHaYAIB6mACAfpgAgLaZAgC1nQIAgpgAgLu9AgC6vQIAhpgAgIqYAIC/IQMAvjkDAL0xAwC8OQMAvigDAKMZAgCOmACAkpgAgKbdAgCWmACAmpgAgKXZAgCq+QIAq/kCAJ6YAICimACArn0DAK9lAwCsfQMArXUDAL7IBACmmACAqpgAgL7EBQCumACAspgAgLaYAIC6mACAgD0AAIEJAACCGQAAvpgAgMKYAICEOAMAypgAgM6YAIDveAIA0pgAgIZIBACHVAMA1pgAgNqYAIDemACA4pgAgOaYAIDqmACA7pgAgPKYAIDjVAIA9pgAgOFAAQD6mACA/pgAgOMkfwACmQCA4Zx8AAaZAIAKmQCADpkAgBKZAICEbAUAFpkAgBqZAIAemQCAIpkAgO8YfwAmmQCAKpkAgLPxAgAumQCAMpkAgDqZAIA+mQCAtukCALXhAgBCmQCAu3EBALppAQCHoAUAhswEAL85AQC+WQEAvVEBALxhAQDhQH8ARpkAgOM4fgCEwAQAgtkAAO8UAACApQAAgdkAAEqZAIDjwAAATpkAgOHUAQBSmQCAVpkAgO+EfgBamQCAqs0BAKvVAQBemQCAYpkAgK79AQCvnQEArMUBAK31AQBmmQCAo1UCAGqZAIBumQCApk0CAHKZAIB2mQCApUUCAMaYAIA2mQCAepkAgH6ZAICCmQCAhpkAgIqZAICOmQCAqJkGAKmZBgCq7QYAq/0GAKzlBgCt7QYAruUGAK/dBgCwpQYAsa0GALKlBgCzuQYAtK0GALVVBwC2UQcAt00HALh1BwC5fQcAunUHALtJBwC8WQcAvVkHAL5JBwC/RQcAs0UGAJKZAICWmQCAmpkAgJ6ZAIC2TQYAtU0GAKKZAIC7SQYAukEGAIYIAACHjAAAv7EHAL5JBgC9TQYAvFEGAIJdAACjAQYAgEUAAIFdAACmCQYAqpkAgK6ZAIClCQYAqgUGAKsNBgCymQCAtpkAgK4NBgCv9QcArBUGAK0JBgCoTQYAqVUGAKpVBgCriQYArLEGAK29BgCuqQYAr6kGAKaZAIC6mQCAvpkAgMKZAIDGmQCAypkAgM6ZAIDSmQCAuEkBALlJAQC6WQEAu1kBALxJAQC9SQEAvt0BAL/VAQCw3QYAsa0GALKlBgCzjQYAtJkGALWZBgC2jQYAt4UGALPdBgDWmQCA2pkAgN6ZAIDimQCAtj0GALU5BgDmmQCAu2kGALoZBgDqmQCA7pkAgL9dBgC+XQYAvVkGALxxBgDymQCAo5kGAPaZAID6mQCApnkGAP6ZAIACmgCApX0GAKpdBgCrLQYABpoAgAqaAICuGQYArxkGAKw1BgCtHQYAqNUCAKndAgCq4QIAq+ECAKw1AwCtPQMArjUDAK8tAwCAzQMAgQkAAIIZAAAOmgCAEpoAgIQYAgC+dAMAGpoAgLjpAwC56QMAuokDALuFAwC8nQMAvYEDAL6BAwC/tQMAsFUDALFdAwCyVQMAs+kDALT5AwC1+QMAtukDALfhAwCGIAwAhxADAB6aAIAimgCAJpoAgCqaAIAumgCA71wCADKaAIDhFAAANpoAgOOIAgC++AwAOpoAgD6aAIBCmgCAu/kDALrxAwC+gA0ARpoAgL9dAwC+XQMAvV0DALzhAwCzCQIASpoAgE6aAIBSmgCAVpoAgLbdAwC13QMAWpoAgKipBgCpqQYAqrkGAKu5BgCsqQYArakGAK4dBQCvFQUAXpoAgGKaAIBmmgCAapoAgG6aAIBymgCAdpoAgHqaAIC4GQUAuS0FALolBQC7yQUAvNkFAL3FBQC+zQUAv8UFALBtBQCxdQUAsnUFALNFBQC0XQUAtT0FALY1BQC3KQUA4fQGAOFUBwDjFAYA47wGAIEJAACAqQAAfpoAgII5AACE7A0AgpoAgIeIDACGDAwAipoAgI6aAIDvzAcA78QHAKMpAwCSmgCAlpoAgJqaAICemgCApv0CAKX9AgCimgCAq9kCAKrRAgCmmgCAqpoAgK99AgCufQIArX0CAKzBAgCoPQ4AqY0OAKqFDgCrnQ4ArIUOAK2NDgCuuQ4Ar7UOAIaaAICumgCAspoAgLaaAIC6mgCAvpoAgMKaAIDGmgCAuL0OALllDwC6bQ8Au2UPALx9DwC9ZQ8Avm0PAL9lDwCw1Q4Asd0OALLVDgCzoQ4AtJUOALWdDgC2lQ4At40OALMNDgDKmgCAzpoAgNKaAIDWmgCAtg0OALUNDgDamgCAuxkOALoRDgDemgCAFpoAgL9ZDgC+UQ4AvXUOALwBDgDimgCAo0kOAOaaAIDqmgCApkkOAO6aAIDymgCApUkOAKpVDgCrXQ4AhKQDAPaaAICuFQ4Arx0OAKxFDgCtMQ4AqLEOAKmxDgCqzQ4Aq8UOAKzdDgCtxQ4ArsUOAK/1DgCA7QEAgfEBAILxAQD6mgCAhpABAIe0AQD+mgCAApsAgLjFAQC5zQEAusUBALvdAQC8zQEAvf0BAL6ZAQC/lQEAsI0OALFBAQCyQQEAs0EBALRBAQC1QQEAtkEBALdBAQCzRQ4ABpsAgAqbAIAOmwCAEpsAgLZFDgC1VQ4AFpsAgLuFAQC6SQ4AGpsAgB6bAIC/hQEAvoUBAL2VAQC8lQEAIpsAgKMBDgAmmwCAKpsAgKYBDgAumwCAMpsAgKURDgCqDQ4Aq8EBADabAIA6mwCArsEBAK/BAQCs0QEArdEBAKgtAwCpPQMAqjUDAKuJAwCsmQMArZkDAK6JAwCvgQMAPpsAgEKbAIBGmwCASpsAgE6bAIBSmwCAVpsAgFqbAIC4rQMAuWUAALptAAC7ZQAAvH0AAL1lAAC+bQAAv2UAALDJAwCxyQMAsqkDALOlAwC0vQMAtaEDALahAwC3lQMAgL0AAIEJAACCGQAAXpsAgGKbAIC+2AMAapsAgG6bAICErAIAcpsAgIfoAwCGDAQAdpsAgHqbAIB+mwCAgpsAgLP9AwCGmwCAipsAgI6bAICSmwCAtlkDALVRAwCWmwCAu00DALpNAwCamwCAnpsAgL8lAwC+OQMAvTEDALw9AwCimwCAppsAgKqbAICumwCA71gPALKbAIC2mwCAupsAgOOQDgC+mwCA4bAPAMKbAIDGmwCAypsAgM6bAIDSmwCAgHUAAIF9AACCdQAAhBgFAO88AwDamwCAvhQFAN6bAIDj0AMA4psAgOFAAADmmwCAhtAEAIdYBQDqmwCA7psAgPKbAID2mwCA+psAgP6bAIACnACABpwAgAqcAIDvrA8AhOwEAOEQDgAOnACA41QBABKcAIAWnACAGpwAgB6cAICj/QIAIpwAgCacAIAqnACALpwAgKZZAgClUQIAMpwAgKtNAgCqTQIANpwAgDqcAICvJQIArjkCAK0xAgCsPQIAqJkGAKmZBgCqrQYAq70GAKylBgCtrQYArqUGAK/ZBgDWmwCAghEAAIEZAACAwQcAPpwAgEKcAIC+cAMARpwAgLhJBwC5SQcAul0HALtVBwC8TQcAvXEHAL51BwC/bQcAsKkGALGpBgCyuQYAs7EGALSZBgC1mQYAtnkHALd5BwC1NQYASpwAgE6cAIC2NQYAhjAAAIdcAwCzPQYAUpwAgL19BgC8dQYAv0UGAL5FBgBmmwCAVpwAgLt1BgC6dQYAo2UGAFqcAIBenACAYpwAgGacAICmbQYApW0GAGqcAICrLQYAqi0GAG6cAIBynACArx0GAK4dBgCtJQYArC0GAKhVBgCpWQYAqm0GAKthBgCsaQYArWkGAK6ZBgCvmQYAdpwAgHqcAIB+nACAgpwAgIacAICKnACAjpwAgJKcAIC4+QYAufkGALqNBgC7hQYAvJ0GAL2FBgC+hQYAv7UGALDpBgCx6QYAsvkGALP5BgC06QYAtd0GALbJBgC3yQYAs+UGAJacAICanACAnpwAgKKcAIC26QYAteEGAKacAIC7LQYAui0GAKqcAICunACAvxkGAL4tBgC9LQYAvC0GAIIVAACjoQYAgGEAAIFhAACmrQYAspwAgL6QAQClpQYAqmkGAKtpBgCEpAEAupwAgK5pBgCvXQYArGkGAK1pBgCohQIAqY0CAKqVAgCruQIArNUCAK3dAgCu1QIAr80CAIaAHACHZAMAvpwAgL5gAwDCnACAxpwAgMqcAIDOnACAuHUDALl9AwC6dQMAu8kDALzZAwC92QMAvskDAL/BAwCwvQIAsY0CALKFAgCzTQMAtFUDALVdAwC2VQMAt00DALMdAgDSnACAhAgDANacAIDanACAtl0CALVdAgDenACAu0kCALp5AgDinACA5pwAgL+ZAwC+kQMAvZkDALxRAgCwAAAAo1kCAOqcAIDunACAphkCAPKcAID2nACApRkCAKo9AgCrDQIA+pwAgP6cAICu1QMAr90DAKwVAgCt3QMAAp0AgAadAIAKnQCA76wGAA6dAIASnQCAFp0AgBqdAIC+6BwAHp0AgCKdAIAqnQCALp0AgOGABwAynQCA42AGAIBdAACBYQAAgmEAALN9AQA2nQCAtW0BALZlAQA6nQCAhiAdAIdYHQC6+QEAu/EBALzZAQC92QEAvrEBAL+xAQDvoAAAPp0AgEKdAIBGnQCASp0AgE6dAIBSnQCA71wBAIRsHADhzAYAVp0AgOMcBgDjSAAAWp0AgOEwAQBenQCAo/EBAGKdAICFABQAZp0AgGqdAICm6QEApeEBAG6dAICrfQEAqnUBAHKdAIB2nQCArz0BAK49AQCtVQEArFUBAKjtHQCpLR4AqjkeAKs5HgCsKR4ArSkeAK6dHgCvkR4AJp0AgHqdAIB+nQCAgp0AgIadAICC+QAAgfEAAID9AAC4qR4AuakeALpJHwC7SR8AvFkfAL1FHwC+TR8Av0UfALDxHgCx+R4AssEeALPBHgC0uR4AtbkeALatHgC3pR4AsBEfALERHwCyER8AsyUfALQlHwC1KR8Atl0fALdRHwC4cR8AuXkfALpBHwC7QR8AvJUAAL2dAAC+lQAAv40AAIqdAIC2nACAjp0AgJKdAICWnQCAmp0AgIb4AwCH0AAAqM0fAKnVHwCq0R8Aq70fAKytHwCtcR8ArnEfAK9xHwCzOR4Anp0AgKKdAICmnQCAqp0AgLaRHgC1RR4Arp0AgLu1HgC6tR4Asp0AgLadAIC/jR4AvoEeAL2RHgC8pR4Aup0AgKN9HgC+nQCAwp0AgKbVHgDGnQCAyp0AgKUBHgCq8R4Aq/EeAM6dAIDSnQCArsUeAK/JHgCs4R4A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gqIAgIaiAICKogCAjqIAgO9EBgCSogCA4dQGAJaiAIDjDAcAmqIAgJ6iAICiogCApqIAgLP1AQCqogCArqIAgLKiAIC2ogCAtkUBALXlAQC6ogCAuzEBALopAQC+ogCAwqIAgL8dAQC+HQEAvRkBALwlAQCoLT4AqTU+AKo9PgCrNT4ArC0+AK2FPgCuhT4Ar7k+AGaiAIDGogCAyqIAgM6iAICAGQAAgRkAAIIFAADSogCAuLk+ALm5PgC6ST8Au0k/ALxZPwC9WT8Avk0/AL9BPwCwrT4AsbU+ALKxPgCzjT4AtJk+ALWZPgC2iT4At4k+AKO1PgCEjAIA1qIAgNqiAIDeogCApgU+AKWlPgDiogCAq3E+AKppPgCGCAAAh2gDAK9dPgCuXT4ArVk+AKxlPgDmogCAs5E/AOqiAIDuogCAtlk/APKiAID2ogCAtbk/ALp1PwC7fT8A+qIAgP6iAIC+QT8Av0E/ALxZPwC9VT8AsJU+ALGdPgCyqT4As6U+ALShPgC1oT4AtqE+ALehPgC45T4Aue0+ALrlPgC7/T4AvO0+AL3dPgC+1T4AvxkBAAKjAIAGowCACqMAgA6jAIASowCA9qEAgBajAIAaowCAqF0+AKkhPgCqPT4AqzU+AKwVPgCt/T4ArvU+AK/tPgCj1T4AHqMAgCKjAIAmowCAKqMAgKYdPgCl/T4ALqMAgKs5PgCqMT4AMqMAgDajAICvBT4ArgU+AK0RPgCsHT4AgREAAIANAAA6owCAghkAAD6jAIBCowCAhJQBAL4QAACGQAcAhwABAEqjAIBOowCAUqMAgFajAIBaowCAXqMAgKiNAgCplQIAqpUCAKvNAgCs2QIArdkCAK7NAgCvxQIAYqMAgGajAIBqowCAbqMAgIwAAAByowCAdqMAgHqjAIC4HQMAucEDALrBAwC7wQMAvMEDAL3JAwC+8QMAv/EDALCJAgCxiQIAsikDALMpAwC0OQMAtTkDALYpAwC3JQMAsx0CAH6jAICCowCAhqMAgIqjAIC2WQIAtVECAI6jAIC7TQIAuk0CAJKjAICWowCAv/0DAL79AwC9/QMAvP0DAJqjAICeowCAoqMAgKajAIDhDD4AqqMAgOOoPwCuowCAgT0AAIAxAADvUD8Agh0AALKjAIC++AQAhhgFAIdMAwCEDAIA48wAALqjAIDhvAEA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tUkCACKmAIC7hQIAuoUCACamAIAqpgCAv4UCAL6FAgC9lQIAvJUCAIU8GgCjVQIALqYAgDKmAICmDQIANqYAgDqmAIClDQIAqsECAKvBAgA+pgCAQqYAgK7BAgCvwQIArNECAK3RAgCCGQAARqYAgIAZAACBGQAASqYAgE6mAIBSpgCAWqYAgL4ABABepgCAYqYAgGamAIBqpgCAbqYAgHKmAIB2pgCA7+gOAHqmAICG6AQAh1ADAH6mAICCpgCA74ACAIamAIDhlAEAiqYAgONYAQCOpgCA4wAOAJKmAIDhaA0AlqYAgKhxAgCpcQIAqnECAKupAgCsuQIArbkCAK6pAgCvqQIAhKwFAJqmAICepgCAoqYAgKamAICqpgCArqYAgLKmAIC4bQEAuQ0BALoFAQC7GQEAvAkBAL09AQC+NQEAv9kBALDZAgCx2QIAsm0BALNlAQC0fQEAtWUBALZlAQC3VQEA4WAPAOP0AADjHA4A4bwBALamAICCOQAAgTEAAIA9AAC6pgCAvigEAL6mAIDCpgCAvjwHAO8QAADv0A4AyqYAgIbgBACHyAQAzqYAgLO1AgDSpgCAtX0CALZ1AgDWpgCA2qYAgN6mAIC6UQIAu1ECALz1AQC9/QEAvvUBAL/tAQBWpgCAxqYAgKqxBQCrsQUArBUGAK0dBgCuFQYArw0GAOKmAIDmpgCA6qYAgKNVBQDupgCApZ0FAKaVBQDypgCAs+kGAPamAID6pgCA/qYAgAKnAIC24QYAtekGAAanAIC7sQYAuqEGAAqnAIAOpwCAv50GAL6RBgC9pQYAvKkGAKgdBgCpIQYAqiEGAKshBgCsIQYArSEGAK4hBgCvIQYAEqcAgBanAIAapwCAHqcAgCKnAIAmpwCAKqcAgC6nAIC45QcAue0HALrlBwC7/QcAvOUHAL3tBwC+5QcAv00HALAlBgCxNQYAsj0GALMxBgC0FQYAtRkGALYNBgC3AQYAo6kHAIIVAACBtQEAgLUBADKnAICmoQcApakHADanAICr8QcAquEHAISgAgA6pwCAr90HAK7RBwCt5QcArOkHAD6nAICzlQYAhugAAIcYAQC2tQYAQqcAgEanAIC1vQYAukkBALtVAQBKpwCATqcAgL45AQC/OQEAvEUBAL05AQCoPQYAqU0GAKpZBgCrUQYArHEGAK1xBgCuuQEAr7kBAISsAQBSpwCAVqcAgFqnAIBepwCAYqcAgGanAIBqpwCAuKkBALmpAQC6aQEAu2kBALx5AQC9eQEAvmkBAL9pAQCwyQEAsdUBALLVAQCzqQEAtLkBALW5AQC2qQEAt6EBAKPRBQBupwCAcqcAgHanAIB6pwCApvEFAKX5BQB+pwCAqxECAKoNAgCCpwCAhqcAgK99AgCufQIArX0CAKwBAgCKpwCAjqcAgJKnAICWpwCAgTEAAIANAACapwCAgjkAAJ6nAICipwCAviQDAKqnAICupwCAsqcAgIbYHACHTAMAtqcAgLqnAIC+pwCAhMAcAOMgAQDCpwCA4cgBAManAIDvMAIAyqcAgM6nAIDSpwCA1qcAgNqnAIDepwCA4qcAgLOVAwDmpwCA6qcAgO6nAIDypwCAtrkDALWxAwD2pwCAu1EDALpJAwD6pwCA/qcAgL/1AAC+SQMAvUEDALxJAwCoLQIAqUUCAKpdAgCrVQIArHkCAK15AgCuvQIAr7UCAL5oHQACqACABqgAgAqoAICAHQAAgQkAAIKpAAAOqACAuFEBALlZAQC6YQEAu2EBALwRAQC9EQEAvhEBAL8RAQCwzQIAsdUCALLdAgCz1QIAtM0CALVxAQC2cQEAt3EBAOFYBgDhVAcA47AAAOO8BgASqACAGqgAgIYYHACHVB0AHqgAgCKoAIAmqACAKqgAgL74HAAuqACA7/AGAO/gBgCjlQIAMqgAgDaoAIA6qACAPqgAgKa5AgClsQIAQqgAgKtRAgCqSQIARqgAgEqoAICv9QEArkkCAK1BAgCsSQIAqG0eAKl1HgCqfR4Aq40eAKyVHgCtnR4Aro0eAK+BHgAWqACATqgAgFKoAIBWqACAWqgAgF6oAIBiqACAZqgAgLiJHgC5iR4AupkeALuRHgC8uR4AvbkeAL59HwC/dR8AsMUeALHNHgCyxR4As90eALTFHgC1zR4AtsUeALe5HgCz9R4AaqgAgG6oAIByqACAdqgAgLYdHgC1HR4AeqgAgLsJHgC6AR4AfqgAgIKoAIC/CR4AvgEeAL0JHgC8ER4Agm0AAKOxHgCAVQAAgWUAAKZZHgCEmAMAv9ABAKVZHgCqRR4Aq00eAIYABACHmAEArkUeAK9NHgCsVR4ArU0eAIqoAICOqACAhCQAAJKoAICWqACAmqgAgKanAICGqACA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5qsAgIR0BwDqqwCA72gBAO6rAIDyqwCApXkCAKbNAQD2qwCAgCEAAIEhAACC3QcAo2kCAKzJAQCtyQEArqEBAK+hAQD6qwCA/qsAgKrpAQCr4QEAlqsAgAKsAIC+QAIABqwAgIYwAwCHMAMACqwAgA6sAICoOQcAqTkHAKoNBwCrHQcArAUHAK0NBwCuBQcAr3kHALAJBwCxCQcAshkHALMRBwC0OQcAtTkHALbdBwC3yQcAuPkHALn5BwC6zQcAu8EHALzFBwC9yQcAvrkHAL+xBwCzpQcAEqwAgBasAIAarACAHqwAgLatBwC1rQcAIqwAgLvtBwC67QcAJqwAgCqsAIC/3QcAvt0HAL3lBwC87QcALqwAgKPhBwAyrACANqwAgKbpBwA6rACAPqwAgKXpBwCqqQcAq6kHAEKsAIBGrACArpkHAK+ZBwCsqQcAraEHAEqsAIBOrACAUqwAgFasAIBarACAXqwAgGKsAIBmrACAgREAAIANAABqrACAghkAAG6sAIByrACAvuQBAHasAICG4AAAhxgBAHqsAIB+rACAgqwAgIasAICKrACA77AEAI6sAIDh1AYAkqwAgONcBACWrACAmqwAgJ6sAICirACAqJkBAKmZAQCqDQEAqwUBAKwdAQCtBQEArgUBAK81AQCEiAEApqwAgKqsAICurACAsqwAgLasAIC6rACAvqwAgLjBAAC5wQAAusEAALvBAAC8wQAAvcEAAL7BAAC/wQAAsE0BALElAQCyIQEAsyEBALQlAQC1LQEAthEBALcRAQDCrACAxqwAgLONAgDKrACAtZ0CAM6sAIDSrACAto0CANasAIDarACAu+kCALqBAgC9/QIAvP0CAL/hAgC+6QIA3qwAgKbVAgClxQIAvggDAKPVAgCCLQAAgRkAAIB5AACvuQIArrECAK2lAgCspQIAq7ECAKrZAgDirACA6qwAgO80AgDurACAhxgDAIYs/ADyrACA9qwAgPqsAID+rACAAq0AgAatAIAKrQCADq0AgOMAAQASrQCA4eABABatAIC6tQMAu70DABqtAIAerQCAvnkDAL95AwC8pQMAvXkDACarAICztQMAIq0AgCatAIC2kQMAKq0AgC6tAIC1pQMAqEkCAKlJAgCqWQIAq1kCAKxJAgCtdQIArnECAK9tAgC+aP0AvqT/ADKtAIA2rQCA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s1kGAA2yAIARsgCAFbIAgBmyAIC2ZQYAtXUGAB2yAIC7KQYAuiEGACGyAIAlsgCAvxUGAL4VBgC9JQYAvC0GAKOZBgCPmfwAKbIAgDGyAIA1sgCApqUGAKW1BgA5sgCAq+kGAKrhBgCGKB8Ah5wAAK/VBgCu1QYAreUGAKztBgCebQkAn30HAJwNCwCd7QkAmvENAJs5DQCY5fAAmQ0PAJbh8QCX6fEAlMX1AJUN8wCSHfcAk/H1AJD9+QCR7fkAgh3/AIMB+gA9sgCAQbIAgIYV9gCHOfYAhAn6AIXx9ACKwfAAiyXyAEWyAIBJsgCAjuEMAI8VDgCMNfIAjQHzAJKtDgCTgQgATbIAgFGyAICW6QQAl3UGAJR5CgCV8QoAmtEGAJvJAABVsgCAWbIAgIEdAwCAHQMAnFkCAIL1AwCrARAAqpUWAKmNFgCojRYAr5UuAK4BLACt/RIArJkSAKOlHgCipR4AoY0CAN2wAICnGRoAppUaAKUBGACknR8AXbIAgGGyAIBlsgCAabIAgG2yAIBxsgCAdbIAgHmyAICz5SoAsuUqALGtLwCw5S4AfbIAgIGyAIC1ASQAtBEqAKgpAwCpNQMAqj0DAKs1AwCsLQMArbUDAK69AwCvtQMAhbIAgImyAICNsgCAkbIAgIAdAACBCQAAgrkAAJWyAIC4TQIAuV0CALptAgC7CQIAvBkCAL0ZAgC+CQIAvwECALDNAwCx1QMAst0DALPVAwC0zQMAtXUCALZ9AgC3dQIAmbIAgITIHQChsgCAvgwfAKWyAICpsgCA70gGAO9YBwDhWAYA4ZgGAOOUAQDjAAYAhhAcAId8HQC+9B4ArbIAgLGyAIC2ZQMAtfUDALWyAICz5QMAubIAgL2yAIDBsgCAv+ECAL5ZAwC9UQMAvFkDALtBAwC6WQMAxbIAgMmyAIAtsgCAnbIAgM2yAIDRsgCA1bIAgNmyAIDdsgCA4bIAgKitHQCptR0AqrUdAKslHgCsPR4ArR0eAK4VHgCvdR4AsA0eALEtHgCyJR4As40eALSVHgC1nR4AtpUeALeNHgC4tR4Aub0eALq1HgC7nR4AvIUeAL1VHwC+XR8Av1UfALMdHQDlsgCA6bIAgO2yAIDxsgCAtr0eALWVHgD1sgCAu8keALrpHgD5sgCA/bIAgL95HgC+cR4AvXkeALzRHgCCKQAA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vPkBAL35AQC+mQEAv5UBALAFAQCxDQEAsgUBALMdAQC0BQEAtQ0BALYFAQC3+QEA4WQPAOGcDwDjFA4A49QPAJ22AIDhPA4AobYAgOPkAAC+rAQApbYAgKm2AIDvDAAArbYAgLG2AIDvYA4A77QPALW2AIC5tgCAhEQEALNhAgC9tgCAtWECALZhAgDBtgCAxbYAgMm2AIC6jQEAu4UBALydAQC9hQEAvo0BAL+FAQCjrQUAjbYAgM22AIDRtgCA1bYAgKatBQClrQUA2bYAgKtJBgCqQQYA3bYAgOG2AICvSQYArkEGAK1JBgCsUQYA5bYAgOm2AIDttgCA8bYAgIAdAACBCQAAgjkAAPW2AID5tgCA/bYAgIbIAACHIAMAAbcAgAW3AIAJtwCADbcAgKhtBgCptQcAqr0HAKsdBwCsCQcArTEHAK4xBwCvLQcAhKgDABG3AIAVtwCAGbcAgB23AIAhtwCAJbcAgCm3AIC4zQAAudUAALrVAAC75QAAvP0AAL2VAAC+nQAAv5UAALBVBwCxJQcAsi0HALM9BwC0LQcAtRUHALYdBwC39QAALbcAgOG8BgAxtwCA4/QFADW3AIA5twCAPbcAgEG3AIBFtwCASbcAgE23AIBRtwCAVbcAgFm3AIBdtwCA7+gEALN1BgCCLQAAgRUAAIAdAABhtwCAtvEGALXBBgBltwCAu6EGALrRBgBptwCAvmwBAL+RBgC+qQYAvakGALy5BgCjtQYAcbcAgIYoAACHTAEAdbcAgKYxBgClAQYAebcAgKthBgCqEQYAfbcAgIG3AICvUQYArmkGAK1pBgCseQYAhbcAgLO9AQCJtwCAjbcAgLZ5AQCRtwCAlbcAgLV5AQC6VQEAu10BAJm3AICdtwCAvvkAAL/lAAC8RQEAvf0AAKhxAgCpcQIAqnECAKtxAgCstQIArb0CAK61AgCvrQIAhOw8AKG3AICltwCAqbcAgK23AICxtwCAtbcAgLm3AIC4XQMAuWUDALptAwC7ZQMAvH0DAL1lAwC+bQMAv2UDALDVAgCx3QIAstUCALNtAwC0eQMAtWUDALZtAwC3ZQMAHbYAgL23AIDBtwCAo/UCAMW3AIClMQIApjECAMm3AIDNtwCA0bcAgKodAgCrFQIArA0CAK21AwCusQMAr60DAIBlAACBCQAAghkAANW3AIDZtwCA4bcAgL4QPADltwCAhsA8AIcgAwDptwCA7bcAgPG3AID1twCA+bcAgP23AICohQIAqZUCAKqVAgCrpQIArL0CAK3VAgCu0QIAr9ECAAG4AIAFuACACbgAgA24AIARuACAFbgAgBm4AIAduACAuHUBALl9AQC6dQEAu8kBALzZAQC9xQEAvsUBAL/9AQCwtQIAsb0CALKBAgCzgQIAtFUBALVdAQC2VQEAt00BAOGkBgAhuACA41AGAL6APACEHDwAvoA/ACW4AIApuACALbgAgDG4AIA1uACAObgAgD24AIBBuACA7+AGAEW4AICBfQAAgHEAAEm4AICCBQAAUbgAgFW4AIDvTAAAWbgAgOGQAQBduACA41gBAGG4AIBluACAabgAgIZYPwCH/DwAs509AN23AIBNuACAbbgAgHG4AIC21T0AtbU9AHW4AIC7+T0AuvE9AHm4AIB9uACAvxk+AL4RPgC91T0AvNU9AIG4AICj2T0AhbgAgIm4AICmkT0AjbgAgJG4AICl8T0AqrU9AKu9PQCVuACAmbgAgK5VPgCvXT4ArJE9AK2RPQCoVT4AqVk+AKphPgCrYT4ArGE+AK1hPgCuYT4Ar2E+AISoAwCduACAobgAgKW4AICpuACArbgAgLG4AIC1uACAuEU/ALldPwC6VT8Au20/ALx1PwC9fT8AvnU/AL9tPwCwwT8AscE/ALLBPwCzwT8AtME/ALXBPwC2wT8At8E/AIC5AQCBuQEAggUAALm4AIDhgD4AwbgAgOMoPQDFuACAhoAAAIcEAQDvCD0AybgAgM24AIDRuACA1bgAgNm4AICzqT8AvbgAgN24AIDhuACA5bgAgLahPwC1qT8A6bgAgLtFPgC6RT4A7bgAgPG4AIC/RT4AvkU+AL1VPgC8VT4Ao2k/APW4AID5uACA/bgAgAG5AICmYT8ApWk/AAW5AICrhT4AqoU+AAm5AIANuQCAr4U+AK6FPgCtlT4ArJU+ABG5AICzGT4AFbkAgBm5AIC2IT4AHbkAgCG5AIC1MT4AuvEBALv5AQAluQCAKbkAgL6xAQC/vQEAvNEBAL3RAQCo0T0AqdE9AKrVPQCr6T0ArP09AK3lPQCu7T0ArxECAID5AwCBzQMAgsUDAIQkAwC+AAQAMbkAgIesAwCGvAQAuBkCALktAgC6JQIAu+kCALz5AgC9+QIA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eLsAgOE0AgB8uwCA4zQBAIC7AIDjCAwAhLsAgOEIDQChoQEAiLsAgKMJBQCibQMApc0EAKQRBQCnHRkAph0ZAKmhHQCoORkAq+kcAKqpHQCtkREArAEQAK8BFACuUREAsfkVALDlFQCz6WkAsgFoALUBbAC0eWkAjLsAgJC7AICUuwCAmLsAgJy7AICguwCAowkDAKIZDQCh/Q0AoP0NAIIlJgCDBToApLsAgKi7AICGqTwAhzU+AIQdOgCFPTsAiok+AIslMgCsuwCAsLsAgI6xNACPMTYAjD0yAI0tMgCSJTYAk9EIAIREAwC+wAQAlhULAJdVDgCUXQoAlVUKAJplDgCbiQ4AtLsAgLi7AIC8uwCAwLsAgJyBAADEuwCAuLUCALm9AgC6tQIAuwkCALwZAgC9GQIAvgkCAL8BAgCwdQ0AsX0NALJJDQCzSQ0AtJUCALWdAgC2lQIAt40CAKi9DQCpUQ0AqlUNAKtpDQCsfQ0ArWUNAK5tDQCvEQ0AZLsAgILtAQCBHQAAgB0AAMi7AIDMuwCAfboAgL5wBQCznQwAhIwFANC7AIDYuwCA3LsAgLalDAC1tQwA4LsAgLv5DAC68QwAhigFAIcgBQC/GQMAvhEDAL3dDAC83QwA5LsAgKPZDADouwCA7LsAgKbhDADwuwCA9LsAgKXxDACqtQwAq70MAPi7AID8uwCArlUDAK9dAwCsmQwArZkMAAC8AIAEvACACLwAgAy8AIAQvACAFLwAgBi8AIDvvAEAHLwAgOF8DgAgvACA41ABACS8AIAovACALLwAgDC8AICzlQIANLwAgDi8AIA8vACAQLwAgLa9AgC1uQIASLwAgLs5AgC6YQIAhsgEAIesBAC/GQIAvhECAL0ZAgC8IQIAo1UFAILVBwCBxQcAgMUHAEy8AICmfQUApXkFAFC8AICr+QUAqqEFAFS8AIBYvACAr9kFAK7RBQCt2QUArOEFAFy8AICzWQcAYLwAgGS8AIC2HQcAaLwAgGy8AIC1FQcAugkHALsJBwBwvACAdLwAgL75BwC/+QcAvPkHAL35BwDUuwCARLwAgHi8AIB8vACAgLwAgIS8AICIvACAjLwAgKitBwCptQcAqrUHAKvtBwCs+QcArfkHAK7tBwCv5QcAsKkHALGpBwCySQcAs0kHALRZBwC1WQcAtkkHALdJBwC4eQcAuUUHALpBBwC7XQcAvEUHAL1NBwC+RQcAvzkHAKMdBgCQvACAlLwAgJi8AICcvACAplkGAKVRBgCgvACAq00GAKpNBgCkvACAqLwAgK+9BgCuvQYArb0GAKy9BgCAbQAAgQkAAIIZAACsvACAsLwAgISYAQC+kAEAtLwAgIYAHACHxAEAuLwAgLy8AIDAvACAxLwAgMi8AIDMvACAqF0GAKmVAQCqlQEAq6UBAKy9AQCt1QEArtEBAK/RAQDQvACA1LwAgNi8AIDcvACA4LwAgOS8AIDovACA7LwAgLhZAQC5WQEAus0AALvFAAC83QAAvcUAAL7FAAC/9QAAsLUBALG9AQCygQEAs4EBALR5AQC1eQEAtmkBALdpAQCzHQIA8LwAgPS8AIC+gBwA+LwAgLZVAgC1NQIA/LwAgLt5AgC6cQIAAL0AgAS9AIC/vQIAvr0CAL1VAgC8VQIACL0AgKNZAgAMvQCAEL0AgKYRAgAUvQCAGL0AgKVxAgCqNQIAqz0CABy9AIAgvQCArvkCAK/5AgCsEQIArRECACi9AIAsvQCAvgQdAL4AHgAwvQCANL0AgDi9AIA8vQCAgPkAAIHNAACCxQAAhCADAIawHACHlAMAQL0AgES9AIBIvQCATL0AgFC9AIBUvQCA42wCAFi9AIDhoAEAXL0AgO8UAgBgvQCAZL0AgGi9AIBsvQCAcL0AgHS9AIB4vQCA4fAGAOE0BgDjTAAA4xgGAHy9AICAvQCAhL0AgIi9AICAPQAAgQkAAIIZAACMvQCAkL0AgIS8HQDvmAAA7zgHALMxAgDRAAAAh9gdAIZsHACYvQCAtikCALUhAgCcvQCAu80CALrNAgCgvQCApL0AgL/NAgC+zQIAvc0CALzNAgCyXQYAs2UGALANBgCxVQYAtn0GALedBQC0fQYAtXUGALqNBQC7zQUAuKUFALmFBQC+xQUAv8kFALzVBQC9zQUAqL0AgKy9AICwvQCAtL0AgLi9AIC8vQCAwL0AgMS9AICqtQYAq70GAKgBBwCpvQYAroEGAK+NBgCsmQYArZUGAKNxHQDIvQCAzL0AgNC9AIDUvQCApmkdAKVhHQDYvQCAq40dAKqNHQDcvQCA4L0AgK+NHQCujR0ArY0dAKyNHQDkvQCAs9UeAOi9AIDsvQCAts0eAPC9AID0vQCAtcUeALqhHgC7oR4A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s5EOAPDFAID0xQCAtqUOAPjFAID8xQCAta0OALrhDgC74Q4AAMYAgATGAIC+6Q4Av9UOALz1DgC96Q4Ao6UKAAjGAIAMxgCAEMYAgBTGAICmzQ0Apc0NABjGAICrbQwAqm0MABzGAIAgxgCArz0MAK49DACtVQwArFUMAKgJDgCpCQ4Aqh0OAKsVDgCsIQ4ArSEOAK4hDgCvIQ4AJMYAgCjGAIAsxgCAMMYAgDTGAIA4xgCAPMYAgEDGAIC4zQEAudUBALrdAQC71QEAvM0BAL1RAQC+UQEAv1EBALAhDgCxIQ4AsiUOALM5DgC0KQ4AtRUOALYdDgC39QEARMYAgEjGAIBMxgCAo5kNAFDGAIClpQ0Apq0NAL7cAgCE7AMAWMYAgKrpDQCr6Q0ArP0NAK3hDQCu4Q0Ar90NAIBFAACBTQAAglkAAKNFAwBcxgCApUEDAKZBAwBgxgCAhsAEAIcAAwCqLQMAqyUDAKw9AwCtJQMAriUDAK8VAwCoWQIAqYUDAKqBAwCrgQMArIUDAK2NAwCusQMAr7EDAGTGAIBoxgCAbMYAgHDGAIB0xgCAeMYAgHzGAICAxgCAuGUDALltAwC6ZQMAu30DALxlAwC9bQMAvmUDAL/dAACwpQMAsa0DALKlAwCzvQMAtK0DALWdAwC2lQMAt10DALMJAgCExgCAiMYAgIzGAICQxgCAtg0CALUNAgCUxgCAu2kCALphAgCYxgCAnMYAgL9ZAgC+aQIAvWkCALxxAgCgxgCApMYAgKjGAICsxgCA4aABALDGAIDjaAMAtMYAgIEVAACAFQAA74wDAIIVAAC4xgCAvMYAgMDGAIC+cAUA4RgOAOGUDwDjOA8A49QPAISUAgDIxgCAzMYAgNDGAIDUxgCA2MYAgNzGAIDgxgCA5MYAgOjGAIDv7AEA7/gPAIZgBACHBAUAs5UBAITMBQC1dQEA7MYAgPDGAIC2dQEA9MYAgPjGAIC7UQEAulkBAL31AAC8SQEAv/UAAL71AACoJQYAqVUGAKpVBgCrrQYArLUGAK29BgCutQYAr60GAMTGAID8xgCAAMcAgATHAIAIxwCADMcAgBDHAIAUxwCAuGkHALlpBwC6CQcAuwkHALwZBwC9GQcAvg0HAL8BBwCw1QYAsd0GALLVBgCzaQcAtHkHALV5BwC2aQcAt2EHAKPdBgAYxwCAHMcAgCDHAIAkxwCApj0GAKU9BgAoxwCAqxkGAKoRBgAsxwCAMMcAgK+9BwCuvQcArb0HAKwBBgCAXQAAgW0AAIJlAACzUQcAvtgDALVxBwC2cQcANMcAgIbgAACHFAMAul0HALs5BwC8KQcAvRUHAL4dBwC/2QAAqJUGAKmdBgCqlQYAq60GAKy1BgCtvQYArrUGAK+tBgA4xwCAPMcAgEDHAIBExwCASMcAgEzHAIBQxwCAVMcAgLhxAQC5cQEAunEBALtxAQC81QEAvd0BAL7VAQC/zQEAsNUGALGxBgCysQYAs40GALSVBgC1UQEAtlEBALdRAQBYxwCAoxkGAFzHAIBgxwCApjkGAFTGAIBkxwCApTkGAKoVBgCrcQYAaMcAgGzHAICuVQYAr5EBAKxhBgCtXQYAcMcAgHTHAIB4xwCAfMcAgIDHAICExwCAiMcAgIzHAICQxwCAlMcAgJjHAICcxwCAgBkAAIEZAACCBQAAoMcAgISAAgC+gAMAhwwDAIasHADhaAYAqMcAgOOYBwCsxwCAsMcAgLTHAIDvrAcAuMcAgLzHAIDAxwCAxMcAgMjHAIDMxwCA0McAgNTHAICzZQMA2McAgLVlAwC2bQMA3McAgODHAIDkxwCAuukDALvlAwC8/QMAve0DAL7RAwC/0QMA6McAgOzHAIDwxwCA9McAgPjHAID8xwCAAMgAgATIAICogQMAqYEDAKqBAwCrgQMArIEDAK2BAwCugQMAr4EDALBBAwCxTQMAskUDALNVAwC0eQMAtXkDALYZAwC3GQMAuCkDALkpAwC6OQMAuzkDALwpAwC9KQMAvhkDAL8ZAwCBGQAAgBEAAKMhAgCCLQAApSECAAjIAIAMyACApikCABDIAIAYyACAq6ECAKqtAgCtqQIArLkCAK+VAgCulQIAhEwCAL5IHQCHZB0AhuwcAONAAwAcyACA4aABACDIAIDvnAMAJMgAgCjIAIAsyACAMMgAgDTIAIA4yACAPMgAgEDIAIBEyACASMgAgEzIAIBQyACAVMgAgFjIAIDvtAEAhKgdAOF8BgBcyACA43AGAGDIAIBkyACAaMgAgGzIAICz4QEAcMgAgHTIAIB4yACAfMgAgLblAQC19QEAgMgAgLuhAQC62QEAvuQcAIjIAIC/rQEAvqUBAL2xAQC8uQEAqBUeAKkZHgCqKR4AqykeAKw9HgCtJR4Ari0eAK8lHgAUyACAgvkfAIH5HwCA4R8AhMgAgIzIAICGHAAAh7ADALjBHgC5wR4AusEeALvBHgC8wR4AvcEeAL7BHgC/wR4AsF0eALElHgCyLR4AsyUeALQhHgC1KR4AthkeALcZHgCjoR4AkMgAgJTIAICYyACAnMgAgKalHgCltR4AoMgAgKvhHgCqmR4ApMgAgKjIAICv7R4AruUeAK3xHgCs+R4ArMgAgLOZHwCwyACAtMgAgLa9HwC4yACAvMgAgLW1HwC6mR8Au5kfAMDIAIDEyACAvnkfAL95HwC8eR8AvXkfAKglHgCpUR4AqlUeAKtpHgCseR4ArXkeAK5pHgCvaR4AyMgAgMzIAIDQyACA1MgAgNjIAIDcyACA4MgAgOTIAIC42R4Aue0eALr5HgC7+R4AvOkeAL3pHgC+nR4Av5UeALAZHgCxGR4AsukeALPpHgC0+R4AtfkeALbpHgC36R4Ao90eAIIpAACBFQAAgB0AAOjIAICm+R4ApfEeAOzIAICr3R4Aqt0eAKTHAIDwyACArz0eAK49HgCtPR4ArD0eAITIAgCzQQEAvgwBAPjIAIC2QQEA/MgAgADJAIC1UQEAuk0BALslAQCGSAAAh1ABAL4lAQC/LQEAvDEBAL0xAQAEyQCACMkAgIQEAwC+gAQADMkAgO+oHwAQyQCAFMkAgL8oMQDjdB8AGMkAgOE4HgAcyQCAIMkAgCTJAIAoyQCALMkAgDDJAICjzQIANMkAgKXdAgA4yQCAPMkAgKbNAgBAyQCARMkAgKupAgCqwQIArb0CAKy9AgCvoQIArqkCAKm1AgCoaR0AqwECAKoJAgCtAQIArBkCAK8xAgCuAQIAhGwFAEjJAIBMyQCAUMkAgFTJAICCnQEAgZ0BAICdAQC55QMAuOUDALvlAwC65QMAveUDALzlAwC/5QMAvuUDALEhAgCwSQIAsyUCALIlAgC1KQIAtCECALcVAgC2FQIAqM0CAKnRAgCq0QIAqw0BAKwVAQCtBQEArgEBAK8BAQBYyQCAXMkAgGDJAIBoyQCAvvgEAGzJAIBwyQCAdMkAgLgVAQC5HQEAuikBALspAQC89QEAvf0BAL71AQC/7QEAsEkBALFVAQCyXQEAs1UBALRNAQC1NQEAtj0BALcxAQCGoAUAh8gFAHjJAIDvvAAA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t6EFALa9BQC1vQUAtL0FAKu9BgCqvQYAqb0GAKi9BgCvfQYArn0GAK19BgCsfQYAJNMAgCjTAIAs0wCAMNMAgDTTAIA40wCAPNMAgEDTAICo7R0AqS0eAKoxHgCrMR4ArJUeAK2dHgCulR4Ar40eAATTAIBE0wCASNMAgEzTAIBQ0wCAVNMAgFjTAIBc0wCAuKkeALmpHgC6XR8Au1EfALxxHwC9cR8AvnUfAL9pHwCw/R4Asc0eALLFHgCzrR4AtLkeALW5HgC2rR4At6UeALO5HgBg0wCAZNMAgGjTAICU0gCAth0eALUdHgBs0wCAuwkeALo5HgBw0wCAhOADAL99HgC+fR4AvXkeALwRHgCCaQAAo/0eAIBFAACBUQAAplkeAL6cAwB00wCApVkeAKp9HgCrTR4AhkgAAIdsAACuOR4ArzkeAKxVHgCtPR4AqF0eAKltHgCqZR4Aq30eAKxlHgCtbR4ArmUeAK/9HgB40wCAfNMAgIDTAICE0wCAiNMAgIzTAICQ0wCAlNMAgLhpAQC5aQEAunkBALt5AQC8aQEAvWkBAL7dAQC/1QEAsIUeALGNHgCyhR4As50eALSFHgC1jR4AtoUeALdZAQCz7R4AmNMAgJzTAICg0wCApNMAgLbtHgC17R4AqNMAgLtJHgC6QR4ArNMAgLDTAIC/SR4AvkEeAL1JHgC8UR4AtNMAgKOpHgC40wCAvNMAgKapHgDA0wCAxNMAgKWpHgCqBR4Aqw0eAMjTAIDM0wCArgUeAK8NHgCsFR4ArQ0eAKghAwCpIQMAqiEDAKshAwCsIQMArSEDAK4hAwCvIQMA0NMAgNTTAIDY0wCAvmACANzTAIDg0wCA6NMAgOzTAIC4iQMAuYkDALqdAwC7lQMAvLkDAL25AwC+eQAAv3kAALDlAwCx7QMAsuUDALP9AwC07QMAtd0DALbVAwC3vQMAgKkAAIG1AACCvQAAs6UDAPDTAIC1pQMAtq0DAPTTAICE4AIA+NMAgLotAwC7JQMAvD0DAL0lAwC+JQMAvxUDAKPpAwD80wCAhmgEAIeAAwAA1ACApuEDAKXpAwAE1ACAq2kDAKphAwAI1ACADNQAgK9ZAwCuaQMArWkDAKxxAwAQ1ACAFNQAgBjUAIAc1ACAINQAgOE8HwAk1ACA40AeACjUAIAs1ACAMNQAgO+MHgA01ACAONQAgDzUAIBA1ACARNQAgIIlAACBEQAAgB0AAEjUAIDj5AMATNQAgOGsAQBQ1ACA77ADAIRkAgC+YAUAhtAEAIdEBQBY1ACAXNQAgGDUAIBk1ACAaNQAgGzUAIBw1ACAdNQAgHjUAIDvsAEAhKQFAOHcHgB81ACA4xABAIDUAICE1ACAiNQAgIzUAICzUQEAkNQAgJTUAICY1ACAnNQAgLYRAQC1fQEAoNQAgLsNAQC6DQEApNQAgKjUAIC//QAAvv0AAL39AAC8/QAAqDkGAKk5BgCqmQYAq5EGAKy1BgCt0QYArskGAK/BBgBU1ACArNQAgLDUAIC01ACAgA0AAIGxAACCsQAAuNQAgLhhBwC5YQcAumEHALt9BwC8ZQcAvW0HAL5lBwC/HQcAsIkGALGJBgCyaQcAs2kHALR5BwC1eQcAtmkHALdlBwCjEQYAvNQAgMDUAIC+gAMAxNQAgKZRBgClPQYAyNQAgKtNBgCqTQYAhggAAId8AwCvvQcArr0HAK29BwCsvQcAzNQAgNDUAICzSQcA1NQAgLVZBwDY1ACA3NQAgLZRBwDg1ACA5NMAgLtBBwC6dQcAvUUHALxFBwC/RQcAvkUHAKh5BgCpeQYAqokGAKuJBgCsmQYArZkGAK6JBgCviQYA5NQAgOjUAIDs1ACA8NQAgPTUAID41ACA/NQAgADVAIC4jQYAuZUGALqVBgC7pQYAvL0GAL1xAQC+cQEAv3EBALD5BgCxzQYAstkGALPZBgC0yQYAtckGALa9BgC3tQYAowEGAATVAIAI1QCADNUAgBDVAICmGQYApREGABTVAICrCQYAqj0GABjVAIAc1QCArw0GAK4NBgCtDQYArA0GACDVAIAk1QCAKNUAgCzVAICAGQAAgRkAAIIFAAAw1QCAhKwBAL6sAQCH6AAAhkwPADjVAIA81QCAQNUAgETVAIConQIAqcUCAKrNAgCrwQIArMUCAK3NAgCu+QIArz0DAEjVAIBM1QCAUNUAgFTVAIC+PAwAWNUAgFzVAIBg1QCAuMkDALnJAwC62QMAu9EDALz5AwC9+QMAvpkDAL+ZAwCwRQMAsU0DALJFAwCzXQMAtEUDALVNAwC2RQMAt/kDALNFAgBk1QCAaNUAgGzVAIBw1QCAtk0CALVNAgB01QCAu4kDALqBAwB41QCAfNUAgL+JAwC+gQMAvYkDALyRAwCA1QCAowECAITVAICI1QCApgkCAIzVAICQ1QCApQkCAKrFAwCrzQMAlNUAgJjVAICuxQMAr80DAKzVAwCtzQMAgO0BAIEVAACCEQAAhAACAJzVAIDhpAEAoNUAgOPsAACo1QCArNUAgLDVAIDvMAAAtNUAgLjVAIC81QCAwNUAgIbgDACH9AIAxNUAgMjVAIDM1QCA0NUAgO/MBgDU1QCA4bAHANjVAIDjEAYA3NUAgODVAIDk1QCA6NUAgOzVAIDw1QCA9NUAgPjVAID81QCAANYAgATWAIAI1gCA7+gBAIUYDwDhzAYADNYAgOMcBgCAKQAAgR0AAIIFAAAQ1gCAszkCAITMDQCGaA8Ah/wMAOHQ0gO28QEAtfkBABjWAIC72QEAutEBAL7kDAAc1gCAv30BAL59AQC9fQEAvMEBAKjxDQCp8Q0AqvENAKvxDQCsMQ4ArTEOAK4xDgCvMQ4ApNUAgBTWAIAg1gCAJNYAgCjWAIAs1gCAMNYAgDTWAIC46Q4AuekOALqJDgC7hQ4AvJ0OAL2BDgC+gQ4Av7UOALBVDgCxXQ4AslUOALPpDgC0+Q4AtfkOALbpDgC34Q4Ao3kNADjWAIA81gCAQNYAgETWAICmsQ4ApbkOAEjWAICrmQ4AqpEOAEzWAIBQ1gCArz0OAK49DgCtPQ4ArIEOAFTWAICz7Q8AWNYAgFzWAIC26Q8AYNYAgGTWAIC16Q8Auq0PALu1DwA01QCAaNYAgL6VDwC/mQ8AvK0PAL2hDwCoIQ4AqSEOAKohDgCrPQ4ArCUOAK0tDgCuJQ4Ar1UOAGzWAIBw1gCAdNYAgHjWAICAHQAAgQkAAIK9AAB81gCAuDkOALk5DgC6yQ4Au8kOALzZDgC92Q4AvskOAL/JDgCwLQ4AsTUOALI9DgCzMQ4AtBUOALUZDgC2CQ4AtwkOAKOpDgCA1gCAhIACAL6AAQCFAAQApq0OAKWtDgCI1gCAq/EOAKrpDgCGKAcAhxgAAK/dDgCu0Q4AreUOAKzpDgCM1gCAs+0BAJDWAICU1gCAtuUBAJjWAICc1gCAte0BALplAQC7bQEAoNYAgKTWAIC+bQEAv10BALx1AQC9bQEAqN0NAKnpDQCqIQIAqyECAKwhAgCtIQIAriECAK8hAgCo1gCArNYAgLDWAIC01gCAohECAKMRAgCgqQ4AodUCALiJAgC5iQIAup0CALuVAgC8vQIAvXUDAL59AwC/dQMAsOUCALHtAgCy5QIAs/0CALTtAgC13QIAttUCALe9AgCjqQIAj8UaALjWAIC81gCAwNYAgKahAgClqQIAxNYAgKspAgCqIQIAyNYAgMzWAICvGQIArikCAK0pAgCsMQIAniUOAJ/lDgCc6QoAnRUKAJpFFgCbRQoAmFkWAJlRFgCWcRIAl4ETAJRVEgCV7RIAktEeAJPZHgCQtRoAkVUeAISpHwCFJR8AhiUfAIexEwDQ1gCA1NYAgIJZGwCDURsAjEUSAI2lFwCOpRcAj7kXAIA5+wHY1gCAijkTAIutEwCUmQsAlaEPAJZpDwCX3Q8A3NYAgO+cDwCSyQsAk30LAJxFAwDjeA4A4NYAgOGYDADk1gCAhHgCAJqRAwCbXQMA4QQAAL6IBQDj3OoD6NYAgOzWAIDw1gCA7+wAAO+MDgDhcA4A4fwOAOMwAADjeA4AgSEAAIA5AADvtO0DgikAALMJAgD41gCAhmgEAIcsBQD81gCAtg0CALUNAgAA1wCAu8UBALrFAQAE1wCACNcAgL99AQC+fQEAvdUBALzVAQCE1gCA9NYAgAzXAIAQ1wCAFNcAgBjXAIAc1wCAINcAgKi9BQCp5QUAquEFAKvhBQCs5QUAre0FAK7RBQCv0QUAsGEGALFhBgCyYQYAs2EGALTZBgC12QYAtskGALfBBgC4yQYAuckGALp5BwC7eQcAvEUHAL0lBwC+EQcAvw0HAKNJBQAk1wCAKNcAgCzXAIAw1wCApk0FAKVNBQA01wCAq4UGAKqFBgA41wCAPNcAgK89BgCuPQYArZUGAKyVBgBA1wCARNcAgEjXAIBM1wCAUNcAgFTXAIBY1wCAXNcAgIA5AACBOQAAggUAAGDXAIC+uAMAhLgDAGjXAIBs1wCAqMUGAKnVBgCq1QYAq+UGAKz9BgCtHQEArhUBAK8NAQBk1wCAcNcAgIaIAQCHHAEAdNcAgHjXAIB81wCAgNcAgLjpAQC56QEAuokBALuJAQC8mQEAvZkBAL6JAQC/iQEAsHUBALF9AQCydQEAs+kBALT5AQC1+QEAtukBALfhAQCzXQYAhNcAgIjXAICM1wCAhLwBALadAQC1dQYAkNcAgLu5AQC6sQEAlNcAgJjXAIC/PQEAvj0BAL09AQC8oQEA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gNwAgLYVAgC1dQIAhNwAgLs5AgC6MQIAiNwAgIzcAIC/2QEAvtEBAL0VAgC8FQIAo50FADTcAICQ3ACAlNwAgJjcAICm1QUApbUFAJzcAICr+QUAqvEFAKDcAICk3ACArxkGAK4RBgCt1QUArNUFAIBRAACBWQAAgmEAALOVBgCo3ACAtXEHALZxBwCs3ACAhkADAIdUAwC67QcAu+UHALzlBwC97QcAvtEHAL/NBwCw3ACAtNwAgLjcAIC83ACAwNwAgMTcAIDvQAQAyNwAgOEwBwDM3ACA45QEANDcAIDU3ACA2NwAgNzcAIDg3ACAoxkGAOTcAIDo3ACA7NwAgPDcAICm/QcApf0HAPTcAICraQcAqmEHAPjcAID83ACAr0EHAK5dBwCtYQcArGkHAKjNBwCp0QcAqtEHAKstBgCsNQYArT0GAK41BgCvnQYAAN0AgATdAIAI3QCADN0AgIAZAACBGQAAggUAABDdAIC4iQYAuYkGALqZBgC7kQYAvLkGAL25BgC+UQEAv1EBALDlBgCx7QYAsv0GALP1BgC02QYAtcUGALbBBgC3uQYAqNEBAKnZAQCqCQEAqwkBAKwZAQCtGQEArgkBAK8JAQCEYAEAvnwBAIeoAACGjAEAGN0AgBzdAIAg3QCAJN0AgLgJAQC5CQEAuhkBALsRAQC8OQEAvTkBAL75AAC/+QAAsH0BALFBAQCyRQEAs10BALRFAQC1TQEAtkUBALc5AQAo3QCALN0AgDDdAICzjQIANN0AgLWdAgC2lQIAON0AgDzdAIBA3QCAurUCALuJAgC8nQIAvYUCAL6NAgC/hQIAps0CAETdAIBI3QCApcUCAEzdAICj1QIAUN0AgFTdAICu1QIAr90CAKzFAgCt3QIAqu0CAKvRAgCE9AMAWN0AgKgxAwCpMQMAqjEDAKsxAwCskQAArZEAAK6RAACvjQAAXN0AgGDdAIBk3QCAaN0AgGzdAIBw3QCAdN0AgHjdAIC4vQAAuWUAALptAAC7ZQAAvH0AAL1lAAC+bQAAv2UAALD9AACxxQAAss0AALOpAAC0uQAAtaUAALahAAC3oQAAgL0BAIEJAACCGQAAfN0AgIDdAIC+WAIAhxQdAIacHQCEbB0AxNsAgIjdAICM3QCAvrwcAJDdAICU3QCAmN0AgLP5AgCc3QCAoN0AgKTdAICo3QCA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gQkAAIIdAABM4gCA4cgGAFDiAIDjSAQAVOIAgKO1BgBY4gCAhigAAIdAAQBc4gCAptkGAKXRBgBg4gCAqyEGAKrNBgBk4gCAaOIAgK8pBgCuIQYArSkGAKw1BgBs4gCAs70BAHDiAIB04gCAtnkBAHjiAIB84gCAtXkBALpVAQC7XQEAgOIAgITiAIC++QAAv/kAALxFAQC9+QAAqHECAKlxAgCqcQIAq3ECAKy1AgCtvQIArrUCAK+tAgC+rDwAiOIAgIziAICQ4gCAlOIAgJjiAICc4gCAoOIAgLhpAwC5aQMAugkDALsJAwC8HQMAvQUDAL4NAwC/BQMAsNUCALHdAgCy1QIAs2kDALR5AwC1eQMAtmkDALdhAwCk4gCAqOIAgKziAICj9QIAsOIAgKUxAgCmMQIAtOIAgLjiAIC84gCAqh0CAKsVAgCsDQIArbEDAK6xAwCvsQMA7xgCAIIVAACBbQAAgG0AAMDiAIDI4gCAhvg8AIcYAwDM4gCA0OIAgNTiAIDY4gCA42wHAAThAIDhaAEA3OIAgKiFAgCplQIAqpUCAKulAgCsvQIArdUCAK7RAgCv0QIA4OIAgOTiAIDo4gCA7OIAgPDiAID04gCA+OIAgPziAIC4dQEAuX0BALp1AQC7zQEAvNUBAL3dAQC+yQEAv8EBALC1AgCxvQIAsoECALOBAgC0VQEAtV0BALZVAQC3TQEA4bQGAADjAIDj9AYABOMAgIQYPQAI4wCADOMAgBDjAIAU4wCAGOMAgBzjAIAg4wCAJOMAgCjjAIDvWAYALOMAgIF9AACAcQAAMOMAgIIFAAA44wCAPOMAgO+AAQC+VDwA4ZABAEDjAIDjfAYAROMAgEjjAIBM4wCAhtg8AIf0PACjnT0AxOIAgDTjAIBQ4wCAVOMAgKbVPQCltT0AWOMAgKv5PQCq8T0AXOMAgGDjAICvGT4ArhE+AK3VPQCs1T0AZOMAgLOhPgBo4wCAbOMAgLatPgBw4wCAdOMAgLWxPgC6ST8Au0k/AHjjAIB84wCAvkk/AL9JPwC8ST8AvUk/AKhVPgCpZT4Aqm0+AKtlPgCsfT4ArWk+AK65PwCvuT8AgOMAgITjAICI4wCAjOMAgJDjAICU4wCAmOMAgJzjAIC4VT8AuV0/ALpVPwC7bT8AvHU/AL19PwC+dT8Av20/ALDJPwCxyT8A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rjUCAK1VAgCsVQIAPOcAgEDnAIBE5wCASOcAgEznAIBQ5wCAVOcAgO/4AQC+bAQA4YAOAFjnAIDjFAEAXOcAgGDnAIBk5wCAaOcAgGznAIBw5wCAdOcAgLPdAQB45wCAtf0BALb1AQB85wCAgOcAgITnAIC6sQEAu4UBALydAQC9NQEAvj0BAL81AQCpBQYAqLkFAKsVBgCqHQYArT0GAKw9BgCvTQYArl0GACTnAICCHQAAgR0AAIAdAACI5wCAjOcAgJDnAICU5wCAuUEHALidBgC7QQcAukkHAL1FBwC8WQcAv0UHAL5FBwCxCQYAsD0GALOpBgCyAQYAtbkGALSxBgC3rQYAtrEGAKORBgCEjAIAhigAAIfAAwCY5wCAprkGAKWxBgCc5wCAq8kGAKr9BgCg5wCApOcAgK95BgCucQYArXkGAKzRBgCo5wCAs5kHAKznAICw5wCAtlEHALTnAIC45wCAtbEHALptBwC7dQcAvOcAgMDnAIC+WQcAv0UHALxtBwC9ZQcAxOcAgMjnAIDM5wCA0OcAgNTnAIDY5wCA3OcAgO+oBQDg5wCA4TQFAOTnAIDjdAUA6OcAgOznAIDw5wCA9OcAgKMdBgCCLQAAgRUAAIAdAAD45wCAptUGAKU1BgD85wCAq/EGAKrpBgAA6ACAhCgBAK/BBgCu3QYAreEGAKzpBgCoxQYAqdUGAKrVBgCr5QYArP0GAK0VBgCuHQYArxUGAL7sAQAI6ACAhggAAIcgAAAM6ACAEOgAgBToAIAY6ACAuH0GALkFBgC6DQYAuwUGALwBBgC9CQYAvjkGAL85BgCwbQYAsXUGALJ9BgCzdQYAtFkGALVFBgC2TQYAt0UGAKiRAgCpmQIAqqECAKuhAgCs0QIArd0CAK7VAgCvyQIAHOgAgCDoAIAk6ACAvyweACjoAIAs6ACAMOgAgDToAIC4VQMAuV0DALppAwC7ZQMAvGEDAL1hAwC+YQMAv2EDALC5AgCxjQIAsoUCALNtAwC0dQMAtX0DALZ1AwC3bQMAOOgAgDzoAICzIQIAQOgAgLVRAgCEiAMAROgAgLZVAgC05gCAvigcALtBAgC6dQIAvbEDALxZAgC/sQMAvrkDAKNpAgBI6ACATOgAgFDoAIBU6ACAph0CAKUZAgBY6ACAqwkCAKo9AgBc6ACAYOgAgK/5AwCu8QMA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hLkHAIW5BwCG2QcAh9kHAIjpBwCJ6QcAivkHAIv5BwCM6QcAjekHAI7RBwCP0QcAkLEHAJGxBwCSSQEAk0kBAJRZAQCVWQEAlkkBAJdJAQCYeQEAmXkBAJpJAQCbSQEAnFkBAJ1ZAQCeSQEAn0kBAKC5AQChuQEAoskBAKPJAQCk2QEApdkBAKbJAQCnyQEAqPkBAKn5AQCqyQEAq8kBAKzZAQCt2QEArskBAK/JAQCwuQEAsbkBALJJAQCzSQEAtFkBALVZAQC2SQEAt0kBALh5AQC5eQEAukkBALtJAQC8WQEAvVkBAL5JAQC/SQEA0jEAgNYxAIDaMQCAkjIAgNoyAIDmMgCA6jIAgO4yAIDyMgCA+jIAgP4yAIASMwCALjMAgDYzAIB2MwCAejMAgIIzAICGMwCAjjMAgJIzAIC2MwCAujMAgNYzAIDaMwCA3jMAgOIzAID2MwCAGjQAgB40AIAiNACARjQAgIY0AICKNACAqjQAgLo0AIDCNACA4jQAgAY1AIBKNQCAUjUAgGY1AIByNQCAejUAgII1AICGNQCAijUAgKI1AICmNQCAwjUAgMo1AIDSNQCA1jUAgOI1AIDqNQCA7jUAgPI1AID6NQCA/jUAgJ42AICyNgCAnoUMAOY2AIDqNgCA8jYAgIC5AwCBuQMAgskDAIPJAwCE2QMAhdkDAIbJAwCHyQMAiPkDAIn5AwCKyQMAi8kDAIzZAwCN2QMAjs0DAI/FAwCQvQMAkQEMAJJJDgCTSQ4AlFkOAJVZDgCWSQ4Al0kOAJh5DgCZeQ4AmkkOAJtJDgCcWQ4AnVkOAJ5JDgCfSQ4AoLkOAKG5DgCiyQ4Ao8kOAKTZDgCl2Q4ApskOAKfJDgCo+Q4AqfkOAKrJDgCryQ4ArNkOAK3ZDgCuyQ4Ar8kOALC5DgCxuQ4AskkOALNJDgC0WQ4AtVkOALZJDgC3SQ4AuHkOALl5DgC6SQ4Au0kOALxZDgC9WQ4AvkkOAL9JDgC8eQQAvXkEAL6JBAC/nQQAuHUEALl9BAC6aQQAu2kEALRxBAC1cQQAtnEEALdxBACwcQQAsXEEALJxBACzcQQArGkEAK1pBACucQQAr3EEAKhBBACpQQQAqkEEAKtBBACknQUApWEEAKZhBACnYQQAoJ0FAKGFBQCijQUAo4UFAJxdBQCdZQUAnm0FAJ9lBQCYXQUA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NAYAgEsGAIBoBgCAfwYAgJYGAIDdAwCA9gMAgA8EAIASBwCAQQgAgD4IAIA/BwCAOSQAgHIkAICjJACAyCQAgLkmAIDEJgCAyCYAgMwmAIDQJgCALygAgG4oAICWKACAmigAgL8oAIDHKACA4ygAgPUoAID5KACA/SgAgLrp0wAVKQCAMCkAgEspAIA9JACASiQAgFckAIBkJACAdiQAgIMkAICVJACApyQAgLckAIDMJACA1iQAgOQkAIDuJACA+yQAgAwlAIAWJQCAbyUAgHYlAIAkJQCAgBkDAIEZAwCCKQMAgykDAIQ5AwCFOQMAhikDAIcpAwCIGQMAiRkDAIppAwCLaQMAjHkDAI15AwCOaQMAj2kDAJAZAwCRGQMAkgEEAJMtAwCUNQMAlVUGAJZdBgCXVQYAmG0GAJl1BgCafQYAm3UGAJxtBgCdNQYAnj0GAJ81BgCgzQYAodUGAKLdBgCj1QYApPkDAKX5AwCm6QMAp+kDAKjZAwCp+QYAqikGAKspBgCsOQYArTkGAK7FAwCvPQMAsEUDALFNAwCyRQMAs10DALRFAwC1TQMAtkUDALd9AwC4SQMAuUkDALpZAwC7fQYAvGUGAL1tBgC+ZQYAgCUAgKkVDwCoAQ8Aq00PAKpNDwCtRQ8ArEUPAK+hDQCuqQ0AoXULAKBhCwCj7QsAoqkLAKXlCwCk5QsApzkPAKZZCAC5oQ0AuJkNALuhDQC6qQ0AvaENALy5DQAxJQCAvqkNALGhDQCw2Q0As6ENALKpDQC1oQ0AtLkNALehDQC2qQ0AOCUAgEglAIBbJQCAsiUAgLwlAICRJQCAoSUAgNAlAICB7Q0AgO0NAIP9DQCC/Q0Ahe0NAITtDQCH2Q0AhiEYAJlNDQCYTQ0Am1ENAJpdDQCdeQ0AnHUNAJ9pDQCecQ0AkYkNAJCBDQCTmQ0AkoENAJWJDQCUgQ0Al30NAJaBDQDgJACAICUAgI0lAIDMJQCA3iUAgAgmAIAtJgCAQiYAgPAlAID6JQCADCYAgBkmAIAxJgCATiYAgFgmAIB2JgCASiYAgGYmAIBuJgCAgCYAgIwmAICUJgCAoyYAgN4mAICcJgCAsiYAgKcmAIC9JgCA1CYAgOImAIABJwCAEScAgBsnAIBPJwCAkicAgOcnAIBPKQCAXSkAgGEpAIBlKQCA8CYAgC4nAIA+JwCASCcAgCMnAIBTJwCAYycAgH4nAIBwJwCAlicAgMInAIDJJwCApicAgNMnAIDdJwCAtCcAgBgoAIAKKACA6ycAgCUoAIDyJwCA/CcAgDMoAIBAKACASigAgFQoAIBeKACAcigAgH8oAICGKACAnigAgKUoAICyKACAyygAgNUoAIDnKACAASkAgA4pAIAZKQCAIykAgDQpAIA7KQCAUykAgMMDAIDmBACAhQUAgNgFAIATBgCAOQYAgFAGAIBtBgCAhAYAgJsGAIDjAwCA/AMAgBUEAIAoBACAOwQAgE4EAIBhBACAdAQAgIcEAICaBACAAAUAgA8FAIAeBQCALQUAgDwFAIBjCACAJAgAgMEGAID8BwCAHQkAgOMoEwAzCQCAKggAgC0IAIAxCACAJAcAgNwuAIDKMACA2S0AgLswAIBFMQCAJwkAgO/sEwAGCQCA3A0AgM8IAICDCACAMQcAgEwHAID8BgCACggAgJQIAIAqCQCACQkAgOANAIDsDQCA2wgAgJkIAIAVBwCAhggAgFUHAID/BgCApgcAgJEkAIDwDQCA4ggAgCcIAICcCACAWAgAgBUJAID0DQCA5QgAgBQIAICfCACA6AgAgBcIAIDJCACAoggAgOwIAIAbCACAzAgAgKYIAID3CACA/QgAgIgHAICKCACAWQcAgAMHAIA9CQCAQQkAgEkJAIA2CQCAGAkAgPgNAID0CACALQkAgAwJAIDkDQCA0ggAgI4IAIBdBwCAMAkAgA8JAIDoDQCA1QgAgJEIAIBgBwCArQgAgGMHAIDjSBIA4xQSAOP4EwDjuBMA4+wSAOOgEgDjbBIA43gSAO/ADQDv2A0A73QSAO9QEgDvqBIA79wSAO8oEwDvIBMA6QcAgMwGAIAOCACAEQgAgNgGAIDUBgCAIQgAgAcHAIBnCACADAcAgHYIAIA0BwCANwcAgKoIAIC2CACAuQgAgOPYEADjoBAA46AQAON0EQDjNBAA4wgQAOPkEADj9BAA77wQAO/gEADvzBAA7zgQAO8QEADvcBAA73AQAO9MEADjhBMA4+gTAOMwEADjEBAA42ATAONAEwDjpBMA47QTAO/IEwDvtBMA75gTAO98EwDvXBMA70wTAO8UEwDv6BAAgO08AIH1PACC/TwAg/U8AITtPACFFT0Ahh09AIcVPQCILT0AiTU9AIo9PQCLNT0AjC09AI0VPQCOHT0AjxU9AJBtPQCRdT0Akn09AJN1PQCUbT0AlRU9AJYdPQCXFT0AmC09AJk1PQCaPT0AmzU9AJwtPQCdFT0Anh09AJ8VPQCg7T0AofU9AKL9PQCj9T0ApO09AKUVPQCmHT0ApxU9AKgtPQCpNT0Aqj09AKs1PQCsLT0ArRU9AK4dPQCvFT0AsG09ALF1PQCyfT0As3U9ALRtPQC1FT0AthE9ALcRPQC4MT0AuTE9ALoxPQC7MT0AvBE9AL0RPQC+ET0AvxE9AIDxPACB/TwAgvU8AIMNPwCEFT8AhR0/AIYVPwCHDT8AiDU/AIk9PwCKNT8Aiw0/AIwVPwCNHT8AjhU/AI8NPwCQdT8AkX0/AJJ1PwCTDT8AlBU/AJUZPwCWCT8Alwk/AJg5PwCZOT8Amgk/AJsJPwCcGT8AnRk/AJ4JPwCfCT8AoPk/AKH5PwCiCT8Aowk/AKQZPwClGT8Apgk/AKcJPwCoOT8AqTk/AKoJPwCrCT8ArBk/AK0ZPwCuCT8Arwk/ALB5PwCxeT8Asgk/ALMJPwC0GT8AtRk/ALYJPwC3CT8AuDk/ALk5PwC6CT8Auwk/ALwZPwC9GT8Avgk/AL8JPwCA+TwAgfk8AIJJPQCDST0AhFk9AIVZPQCGST0Ah0k9AIh5PQCJeT0Aikk9AItJPQCMWT0AjVk9AI5JPQCPST0AkDk9AJE5PQCSAQQAk00GAJRVBgCVXQYAllUGAJdNBgCYdQYAmX0GAJp1BgCbTQYAnFUGAJ1dBgCeVQYAn00GAKC1BgChvQYAorUGAKPNBgCk1QYApd0GAKbVBgCnzQYAqPUGAKn9BgCq9QYAq80GAKzVBgCt3QYArtUGAK/NBgCwtQYAsb0GALK1BgCzTQYAtFUGALVdBgC2VQYAt00GALh1BgC5fQYAunUGALtNBgC8VQYAvV0GAL5VBgC/TQYArH0/AK2lPwCurT8Ar6U/AKh9PwCpZT8Aqm0/AKtlPwCkHT8ApUU/AKZNPwCnRT8AoB0/AKEFPwCiDT8AowU/ALydPwC9pT8Avq0/AL+lPwC4nT8AuYU/ALqNPwC7hT8AtN0/ALWlPwC2rT8At6U/ALDdPwCxxT8Ass0/ALPFPwCMZToAjW06AI5lOgCPfToAiEU6AIlNOgCKRToAi306AIRlOgCFbToAhmU6AId9OgCABToAgQ06AIIFOgCDfToAnF04AJ3lPwCe7T8An+U/AJhdOACZRTgAmk04AJtFOACUuTgAlWU4AJZtOACXZTgAkAU6AJENOgCSBToAkwE5AMAIAIDYCACA3ggAgPAIAIB2BwCAIgkAgHkHAICBBwCAVAkAgJ0HAIDLBwCAvQcAgMQGAIDcBACAewUAgM4FAIAJBgCALwYAgEYGAIBjBgCAegYAgJEGAIDXAwCA8AMAgAkEAIAiBACANQQAgEgEAIBbBACAbgQAgIEEAICUBACA+gQAgAkFAIAYBQCAJwUAgDYFAIBFBQCATgUAgFcFAIBgBQCAaQUAgJUFAICeBQCAXQgAgFYOAIBZDgCAOjoAgKwKAIAVCwCANjoAgD46AICcGQAAnRkAAJ45AACfOQAA4wwAgEI6AIB6NwCA8TAAgKI3AIBaMgCAxSoAgLksAICaMDUA7C0AgB0tAIDoLQCA1y8AgJ+ENQDSMwCAnUQpAGI1AICaNgCA1jYAgAo3AIAeOACAdjEAgAIyAICuMgCARjMAgGI2AIBGOACAcjkAgOkqAICNLACAijEAgNIyAICWNgCAwjkAgJQuAIB6MgCAhjYAgBo3AIALMACAvjUAgLSAGgC1hBkAtojmALeM5ACwABwAsZQeALIAGACznBsAvADsAL2k7wC+qO4Av6TtALgA4AC5tOMAurjiALu84QCkwAAApQAMAKbIDgCnAAgA4jYAgAcvAIAFMQCArXwDAKwAEACt5BMArugSAK9gEQCo8AoAqRwJAKr4FgCr/BQAGjIAgB4zAIAqOACAKSsAgMErAIAtLACAczAAgIIxAIDOMgCA8jMAgI42AICmNgCAyjcAgO44AICiOQCAvjkAgC40AIBuNACAvAgAgCY1AIBGNgCAejgAgE43AIChLQCAIy8AgN40AICeNQCAAjMAgDY0AICaNwCA5jgAgJ0tAIBwLgCAejEAgC4yAIBiMgCAFjUAgD41AICmOACAKSwAgJwAAACqNQCAzSsAgMkrAICaNACAKjUAgF42AICuOACAajcAgA8wAIBaNwCA0SoAgEQuAIB7LwCAMjMAgLIzAIBNLACAPjQAgDkrAIBfLwCAsSoAgO4xAICLMACAEjUAgIDpAwCB6QMAgjkvAIP9AwCE5QMAhe0DAIblAwCHfS4AiEEuAIkhAgCKeS8AiyUCAIw9AgCNJQIAjiECAI8dAgCQZQIAkW0CAJJlAgCTfQIAlGUCAJVtAgCWZQIAlx0CAJglAgCZLQIAmiUCAJs9AgCcJQIAnS0CAJ4lAgCfHQIAoOUCAKHtAgCi5QIAo/0CAKTlAgCl7QIApuUCAKdNAgCodQIAqX0CAKqpAQCrqQEArLkBAK25AQCuqQEAr6kBALDZAQCx2QEAsukBALPpAQC0eSIAtf0BALb1AQC37QEAuNUBALndAQC61QEAu60BALy1AQC9uQEAvqkBAL+pAQChLACAjS0AgP4zAIBmNgCAPjcAgLoxAIDmMQCAHzAAgB42AIA/MACArjMAgAUrAICBKwCAxSsAgFYxAID+NACA9jUAgEo3AIBaOACANSwAgOksAIAXLwCApzAAgH4yAIBCNACAljgAgHo5AIDOOQCA5jkAgOkwAICmMQCA7jcAgOMuAIC/LwCA2y8AgGswAIBuMgCAujIAgGozAICONACAMjUAgJY1AIDeNwCAbjYAgAY4AIB+OACA6SsAgBUsAID9LACAqjIAgPY2AIADLwCAcy8AgDcwAICyMQCA2jQAgCYzAIAVKwCAWS0AgKguAIB/LwCAQjMAgF4zAIBuNQCAgFEBAIEBKgCCXQEAg1UBAIRNAQCFdQEAhn0BAId1AQCITQEAiVUBAIqdKwCLWQEAjEkBAI1JAQCOuQEAj7kBAJDJAQCRyQEAktkBAJPZAQCUyQEAlckBAJb5AQCX+QEAmMkBAJnJAQCa2QEAm9kBAJzJAQCdyQEAnrkBAJ+5AQCgSQEAoZUBAKJFAQCjXQEApEUBAKVNAQCmRQEAp30BAKhFAQCpTQEAqnkPAKtBAQCsQQEArUEBAK5BAQCvQQEAsMEDALHBAwCywQMAs8EDALTBAwC1wQMAtsEDALfBAwC4wQMAucEDALrBAwC7wQMAvMEDAL3BAwC+wQMAv8kMAI41AIBiOACA4jgAgPI4AIAuOQCALSsAgII0AIBOOACAyjgAgJcvAIDxKgCAUSsAgEguAIBoLgCAlzAAgMYyAIDOMwCAejYAgBo4AIDZMACAojgAgA0sAIAlMQCAMTEAgBIyAIBKMgCATjMAgKozAIAqNACADjUAgDo5AIDrLwCAsjgAgEErAICMLgCAMjIAgOI3AIBPLwCAny8AgDkxAIC6OACA8SsAgNksAIB4LgCAwjAAgBUxAIBiMQCA9jEAgEozAIC+MwCAWjUAgPo2AIAGNwCA1jgAgF0sAIBOMgCA3SwAgMoyAIBuMwCAijYAgL44AICqOQCA0jkAgC0xAICxOSMAsBEDALMVAwCyFQMAtTUDALQ1AwC3NQMAtjUDALkVAwC4FQMAuxUDALoVAwC9dQMAvHUDAL91AwC+dQMAoZkNAKCRDQCjqQ0AopENAKW5DQCksQ0Ap6kNAKaxDQCpmQ0AqJENAKtpAwCqkQ0ArXkDAKxxAwCvaQMArnEDAJEZDQCQEQ0Aky0NAJIRDQCVPQ0AlD0NAJctDQCWLQ0AmR0NAJgdDQCbbQ0Amm0NAJ15DQCcgQ4An2kNAJ5xDQCBmQ0AgAkjAIOpDQCCkQ0AhbkNAISxDQCHqQ0AhrENAImZDQCIkQ0Ai2kNAIqRDQCNeQ0AjHENAI9pDQCOcQ0AKjIAgMY1AIDGNACA6jQAgBozAICiMgCAZjcAgA0rAIAuNgCA9SsAgOUrAIDzLgCAEzAAgPY0AIA0LgCABjIAgOUwAIDqNwCAqjgAgA8vAIBhKwCANS0AgIktAIDVMACA0SsAgCIzAIDmMwCASjQAgGY0AIBqNACAfjQAgPo4AIDuNACAkjYAgFY3AIAKOACANjgAgE45AIBSOQCAVjkAgLo5AIAuOACAxjgAgDErAIBVKwCAaSsAgCUsAIAxLACAcSwAgCUtAIBBLQCASS0AgIUtAICRLQCAdC4AgIsvAICzLwCAuy8AgJH4EADTLwCAfzAAgK8wAIDdMACAWjEAgIApAQCBKQEAgjkBAIM5AQCEKQEAhSkBAIZZAQCHWQEAiNkoAIltAQCKKSUAi2EBAIxhAQCNYQEAHjIAgDoyAICQGQEAajIAgJIVAQC+MgCA3jIAgJU1AQCWPQEAlzUBAJgNAQCZFQEAmh0BAJsVAQCcDQEAnfUBAJ7dKABSMwCAoAUBADI0AICiAQEAVjQAgFI0AIClGQEApgkBAFo0AIBeNACAdjQAgKo9AQCrNQEArC0BAK0VAQCuHQEArxUBALBtAQCxdQEAsn0BALN1AQC0bQEAtRUBALYdAQC3FQEAuC0BALk1AQC6PQEAuzUBALzZLgC9KQEAvhkBAL8ZAQC6eR4Au3keALjNAgC5eR4AvpUeAL+dHgC8QQIAvZ0eALJ9HgCzRR4AsH0eALF1HgC2XR4At0UeALRdHgC1VR4AqgUeAKsNHgCodR4AqQ0eAHo0AICeNACArBUeAK0NHgCiSR4Ao0keAKBJHgChSR4ApkkeAKf5AgCkSR4ApUkeAJqNHgCblR4AmI0eAJmFHgCeiR4An4keAJyNHgCdhR4AkgUDAJP1AACQCQMAkY05AJaxHgCXFQYAlO0AAJUBHACKvQMAi0EDAIiFAwCJnQMAjkEDAI9JAwCMyTkAjVEDAIIVAgCDHQIAgAUCAIEdAgCGzQMAh7EDAIQFAgCFxQMAs/kFALLxBQCx+QUAsOEFALeZKgC2EQMAtRkDALThBQC7NQMAujUDALklAwC4JQMAvxUDAL4VAwC9JQMAvCUDAKP9BQCi/QUAof0FAKD9BQCnnQUApp0FAKWdBQCknQUAq7kFAKqxBQCpJScAqL0FAK+ZBQCukQUArZkFAKyhBQCTAQUAkvkFAJF1OQCQ9QUAlwEFAJYZBQCVEQUAlBkFAJt5CQCaOQUAmTEFAJg5BQCfHQUAnh0FAJ0dBQCcHQUAg4kFAIKBBQCBiQUAgPEFAIeFBQCGhQUAhZUFAISBJgCLhQUAioUFAIm1BQCItQUAj4UFAI6FBQCNlQUAjJUFAM40AIA6NQCAQjUAgFY1AIB+NQCAzjUAgAI2AIBqNgCAEjcAgCo3AIBeNwCAYjcAgKY3AICqNwCAAjgAgNo4AIAeOQCANjkAgIMvAICQ6gCA5jUAgLkqAIC9KwCAfSsAgCUrAIBlKwCAkSsAgCEsAIA9LACAES0AgCEtAIA9LQCAmS0AgOQtAIDwLQCADC4AgBwuAIALLwCAEy8AgEMvAIBjLwCAky8AgKsvAICbLwCAry8AgO8vAIBHMACAUzAAgFswAICDMACACTEAgB0xAIBeMgCAVjIAgIYyAIAWNACA4jIAgBYzAIBiMwCAfjMAgKIzAIDGMwCAyjMAgOozAICAjQEAgZUBAIKdAQCDlQEAhI0BAIW1AQCGvQEAh7UBAIiNAQCJwR0AipkBAIvBHQCMhQEAjY0BAI6FAQCP/QEAkIUBAJEZHQCSkRQAk4UBAJSdAQCViTIAlk0ZAJc9GwCYsQEAmbEBAJotHACbtQEAnD0cAJ2pAQCemQEAn5kBAKDlHQChbQEAomUBAKN9AQCkZQEApW0BAKbxHQCnYQEAqKEDAKmhAwCqoQMAq6EDAKyhAwCttQEArq0DAK+lAwCwYRkAsdkDALLZAQCz7QMAtPUDALX9AwC29QMAt+0DALjFAQC50QMAumEdALvVAwC82QEAvT0XAL7FAwC/0QEA+jMAgA40AIAKNACAOjQAgLY0AIDmNACAHjUAgE41AIAyNgCAWjYAgM42AIAWNwCAIjcAgEI3AIBGNwCAUjcAgG43AIDmNwCAFjgAgEo4AIBqOACAtjgAgA45AIAqOQCAijkAgCfqAIAi6gCAVOoAgOEpAIAJKgCADSoAgNbqAIAD6wCAe+sAgBY6AIAmOgCARwgAgFIIAIBVCACASggAgE4IAIBXCQCA8Q4AgOIOAIDnDgCA9g4AgOwOAICyNACASw8AgMoPAICBDwCALw8AgFoPAIBnDwCAbw8AgJ0PAIDCDwCAuA8AgL0PAICqDwCAsQ8AgP4OAIADDwCACA8AgIBBAQCBMQMAgk0BAINFAQCEXQEAhUUBAIZNAQCHIQMAiF0fAIl9AQCKaQMAi3EBAIx1AwCNVQEAjlk6AI9ZAQCQKQEAkSkBAJI5AQCTOQEAlCkBAJUpAQCW2QEAl9kBAJjpAQCZ6QEAFQ8AgCIPAIAqDwCAMg8AgDwPAIBBDwCARg8AgFAPAIBVDwCAXQ8AgGoPAIByDwCAdw8AgHwPAICEDwCAiQ8AgJMPAICYDwCAoA8AgKUPAIDFDwCANw8AgBoPAIBiDwCAjg8AgA0PAIDdFgCA5hYAgOkWAIDvFgCA4xYAgOwWAIDgFgCAExcAgBYXAID1FgCA8hYAgPgWAICAmQcAgZkHAPsWAICDrQcAhLUHAAQXAICGsQcAh7EHAIiRBwCJkQcAipEHAIuRBwCM8QcAjfEHAI7xBwCP8QcAkJEHAJGVBwCSnQcAk5kHAJSFBwCVgQcAloEHAJeFBwCYuQcAmb0HAJq1BwCbsQcAnK0HAJ2pBwCemQcAn50HAKBhBwChZQcAom0HAKNpBwCkdQcApXEHAKZxBwCndQcAqEkHAKlNBwCqRQcAq0EHAKxdBwCtWQcArkkHAK9NBwCwMQcAsTUHALI9BwCzOQcAtCUHALUhBwC2IQcAtyUHALgZBwC5HQcAuhUHALsRBwC8DQcAvQkHAL7xAAC/9QAAgAkBAIENAQCCHQEAgxkBAITZAACF3QAAhtUAAIfRAACI8QAAifUAAIr9AACL+QAAjOkAAI3tAACO5QAAj+EAAJCdAACRmQAAkq0AAJOpAACUtQAAlbEAAJaxAACXtQAAmIkAAJmNAACahQAAm4EAAJydAACdmQAAnokAAJ+NAACgdQAAoXEAAKJ9AACjeQAApGlQAqVtUAKmYQAAp2UAAKhZAACpXQAAqlUAAKtRAACsTQAArUkAAK49AwCvOQMAsClQArEtUAIBFwCABxcAgP4WAIANFwCAChcAgBkXAIDZXFICHxcAgCUXAIAiFwCAKBcAgCsXAIA0FwCALhcAgKOhAACipQAAoZEAAKCVAACntQAAprEAAKW9AACkuQAAq40AAKqJAACpgQAAqIUAAK+FAACugQAArYkAAKyNAACz/QAAsvkAALHxAACw9QAAt5kAALadAAC1nQAAtJkAALutAAC6qQAAuaUAALilAAC/ZQEAvmEBAL1tAQC8aQEAHBcAgFcXAIBAFwCAPRcAgEgXAIBOFwCAOhcAgNksUQJLFwCAVBcAgHkWAIDhDwCAMRAAgA4QAIAiEACAHRAAgJNBAAAnEACALBAAgBMQAICXWQAAllUAAJVZAACUXQAAm3EAAJppAACZZQAAmGUAAJ9lAACeYQAAnTFTApxtAAC4gQQAuYEEALqBBAC7gQQAvIEEAFEXAIC+jQQA5g8AgLDdBQCxTQQAskUEALNdBAC0RQQAtU0EALZFBADrDwCAqKEFAKntQQCqrQUAq6UFAKy9BQCtpQUArq0FAK+lBQCgqQUAoZFBAKKpQACjoQUApKEFAKWhBQCmoQUAp6EFAP8PAIAYEACAWBAAgF0QAIBpEACAnVUFAH8QAICfWQUAjhAAgJMQAICeEACAkwUFAJQdBQCVBQUAlg0FAJcFBQC4EACAyxAAgO8QAIAhEQCAJhEAgC4RAIA9EQCATBEAgIBxBQCBcQUAgnEFAINxBQCEUQUAhVEFAIZdBQBREQCAWREAgHwRAICjEQCArxEAgM8RAIDUEQCA2REAgBMSAIAmEgCAMhIAgEoSAIDEEgCAGhMAgDMTAIA4EwCASxMAgFwTAIBuEwCAcxMAgJoTAICiEwCAtxMAgN4TAIDjEwCAPRQAgEIUAIBHFACAUxQAgF8UAIBkFACAbBQAgHgUAICSFACAlxQAgJ8UAICkFACAqRQAgK4UAICzFACAuBQAgMsUAIDQFACA7BQAgAYVAIAgFQCALBUAgEQVAIBJFQCAVhUAgHcVAICaFQCAtBUAgMAVAIDFFQCAzRUAgO4VAIAIFgCAFxYAgDQWAIA5FgCAQRYAgEYWAIBZFgCAXhYAgICtAQCBtQEAgr0BAIO1AQCErQEAhdUBAIbdAQCH1QEAiO0BAIn1AQCK/QEAi/UBAIztAQCN1QEAjt0BAI/VAQCQrQEAkbUBAJK9AQCTtQEAlK0BAJVVAwCWXQMAl1UDAJhtAwCZdQMAmn0DAJt1AwCcbQMAnVUDAJ5dAwCfVQMAoK0DAKG1AwCivQMAo7UDAKStAwCl1QMAphkOAKfZAwCobQ8AqSEOAKrhAwCr4QMArCkOAK3lAwCuGQ4ArxkOALCVAwCxnQMAsgEOALORAwC0HQ4AtQUOALa5AwC3uQMAuDkOALmNAwC6NQ4AuxEOALyBAQC9gQEAvnkBAL95AQCEFgCAkBYAgJwWAICrFgCAyBYAgM0WAIDuEQCA/xEAgHwWAICBAACAiwAAgJUAAICfAACAqQAAgLMAAID1DwCA+g8AgAQQAIB1EACAehAAgIQQAIDlEACA6hAAgBcRAIAzEQCAOBEAgEIRAIBRFQCADRYAgBIWAIAqFgCAoRYAgKYWAIC+FgCA8A8AgAkQAICJEACAHBEAgNcSAIA/FQCALxYAgGMWAIDDFgCARxEAgGQSAICfEgCAshIAgBEUAIAdFACAKRQAgI0TAICSEwCA0RMAgNYTAID9EwCAAhQAgGkSAIBuEgCAtxIAgLwSAIDCEQCAxxEAgJYRAICbEQCApD0DAKVFAwCmTQMAp0UDAKA9AwChJQMAoi0DAKMlAwCsfQMArUUDAK5NAwCvRQMAqH0DAKllAwCqbQMAq2UDALQ9AwC1xQMAts0DALfFAwCwPQMAsSUDALItAwCzJQMAvP0DAL3FAwC+zQMAv8UDALj9AwC55QMAuu0DALvlAwCEBQwAhQ0MAIYFDACHHQwAgI0MAIGpDACCGQwAg1ENAIxhDACNYQwAjmEMAI9hDACIKQwAiRUMAIodDACLFQwAlD0MAJXFAwCWzQMAl8UDAJABDACRAQwAkgEMAJMBDACc/QMAncUDAJ7NAwCfxQMAmP0DAJnlAwCa7QMAm+UDAIBpBACBaQQAgnEEAINxBACEnQQAhYUEAIaNBACHhQQAiL0EAImNBACKhQQAi50EAIyFBACNqQYAjvkEAI/5BACQiQQAkYkEAJKRBACTkQQAlLEEAJWxBACW+QYAl60EAJiVBACZwQYAmmkGAJtpBgCceQYAnXkGAJ7RBgCf/QsAoA0GAKEdCwCiGQYAo0ULAKQFBgClTQsApjUGAKe1BACoEQYAqREGAKoRBgCrNQQArC0EAK0BBACuXQQArx0GALDNBgCxbQYAsnUGALMNBgC0FQYAtR0GALYVBgC3DQYAuDUGALk9BgC6NQYAuw0GALwVBgC9HQYAvhUGAL8NBgCA9QcAgf0HAIL1BwCD9QAAhO0AAIURAwCGEQMAhxEDAIgxAwCJMQMAijEDAIsxAwCMhQcAjRUDAI4dAwCPFQMAkG0DAJGNBwCShQcAk50HAJSFBwCVjQcAloUHAJe9BwCYhQcAmY0HAJqFBwCbnQcAnIUHAJ2NBwCehQcAn4UAAKB9AAChgQMAooEDAKOBAwCkgQMApYEDAKaBAwCngQMAqBUHAKmFAwCqjQMAq4UDAKydAwCtoQMArqEDAK+hAwCwdQcAsXUHALJxBwCzhQUAtM0FALX1BQC2/QUAt8kDALj5AwC5+QMAuqEFALuhBQC8wQMAvcUDAN4RAIDjEQCAhJz7ACYTAIArEwCAYRMAgGYTAIB2EgCAghIAgJUSAICaEgCARRIAgNwSAIBXEwCASxAAgKMQAIC9EACAxBAAgJB1AACRfQAAknEAAJNxAACUAfwAlVX+AJZd/gCXVf4AmG3+AJlp/gCaef4Am3n+AJxp/gCdaf4Anln+AJ9Z/gCgpf4Aoa3+AKKl/gCjof4ApKH+AKWl/gCmrf4Ap6X+AKiZ/gCpmf4Aqun+AKvt/gCs9f4ArfH+AK7x/gCv8f4AsI3+ALGV/gCymf4As5n+ALSJ/gC1if4Atrn+ALe9/gC4hf4AuY3+ALqF/gC7nf4AvIX+AL2B/gC+gf4Av4H+AKbZCACnBQcApMEIAKWZBQCi0QgAo9EIAKCJBQChtQgArgEHAK8BBwCsMQcArTEHAKo9BwCrJQcAqD0HAKk1BwC2fQcAtwUHALR9BwC1dQcAsskFALNlBwCwcQcAsXEHAL4BBwC/AQcAvDEHAL0xBwC6IQcAuyEHALg9BwC5MQcAhjkHAIc5BwCELQcAhTkHAIINBwCDNQcAgBEHAIEFBwCOSQcAj0kHAIxNBwCN1QUAisEFAIvBBQCI1QUAiXEHAJbVBQCX2QgAlE0FAJXdBQCSUQUAk9kFAJD5BQCRoQUAnnEIAJ99CACcYQgAnWEIAJpxCACbeQUAmMUIAJl1BQD0EACA+xAAgAIRAICBEQCAuxEAgLQRAIArEgCAGBIAgB8SAIBWEgCATxIAgF0SAIDJEgCAHxMAgIcSAIB7EgCApBIAgKsSAIA9EwCAUBMAgHgTAIB/EwCAhhMAgKcTAIC8EwCAwxMAgOgTAID2EwCA7xMAgEwUAIB9FACAhBQAgAsVAIAZFQCAEhUAgPEUAIAlFQCAMRUAgHwVAICDFQCAkxUAgFsVAIBpFQCAnxUAgKYVAIBiFQCASxYAgFIWAIDzFQCA+hUAgNkVAIDgFQCAIxYAgBwWAICwFgCAbhAAgLEQAICqEACA3hAAgNcQAIAQEQCACREAgI8RAIBeEQCAgIEBAIGBAQCCgQEAg4EBAISdAQCFhQEAhokBAIeJAQCItQEAib0BAIq1AQCLjQEAjJUBAI2dAQCOlQEAj40BAIgRAIA3EgCAkv0BAJP1AQCU7QEAlZUBAJadAQCXlQEAmKkBAJmpAQCauQEAm7kBAJypAQCdrQEAnqUBAJ+dAQCgZQEAoW0BAKJlAQCjfQEApGUBAKVtAQCmZQEAp90AAKjlAACppQMAqq0DAKulAwCsvQMAraUDAK6tAwCvpQMAsN0DALHlAwCy7QMAs+UDALSpAQC1VQEAtvUDALftAwC41QMAud0DALrVAwC7rQMAvM0DAL3BAwC+vQMAv7UDANASAICOEgCARBMAgP8UAIA4FQCAlRYAgIkWAIC3FgCAuRUAgIsUAIABFgCAyhMAgMQUAIDSFQCArRUAgPgUAIC9FACAZREAgKgRAIBwFQCA0BAAgFgUAIBiEACAPhIAgOcVAIATEwCAcRQAgEIQAIA5EACAihUAgOESAID2EQCArhMAgGsWAIDqEgCA8RIAgGwRAIAEEgCApgMAgA0jAIARIwCAoAYAgMcAAIC1BgCAqyMAgK8jAIC5IQCAtSEAgOMHAIB7CQCAfwkAgEEjAICnIwCANSMAgDkjAIAdIwCAISMAgCUjAIApIwCALSMAgDEjAIDbBwCA3wcAgNEAAICATQEAgVEBAIJRAQCDTQEAhE0DAIUhAwCGRQEAh30BANcAAICiAwCAqAMAgN0HAIDTAACA1QAAgL0GAIB5AACABxQAgH0AAICHAACAkQAAgAwUAICbAACAGBQAgKUAAIAkFACArwAAgDAUAIC5AACANRQAgM8PAIBVEACAmBAAgJsQAIArEQCAVhEAgKARAIDMEQCA6BEAgOsRAIDzEQCADRIAgBASAIBzEgCAwRIAgDATAIBrEwCAlxMAgJ8TAICwpQEAsa0BALKlAQCzvQEAtKUBALWtAQC2pQEAt10BALhlAQC5bQEAumUBALt9AQC8ZQEA2xMAgDoUAIBpFACAgAW5AIHhBgCC4QYAg+EGAIThBgCoBgCAswYAgIfpBgCI2QYAifmxAIr1sQCL8bEAjO2xAI31BgCO+QYAj/0GAJDZBgCR2QYAkvWxAJwUAICUiZIClfEGAJb1BgCX9QYAmNkGAJnVsgCa3bIAm6kGAJy5BgCduQYAnqkGAJ+BBgCgoQcAoaEHAKIhsgCjpQcApIUAAKWNAACmQbMA1RQAgKiNBwCplQcAqp0HAKuVBwBOFQCAyhUAgDYQAIA+FgCAsP0HALGFBwCyjQcAaBYAgLSZBwCBFgCAtpUHALeNBwC4tQcAub0HALq1BwC7jQcAvJUHAL2dBwC+lQcAv40HAIB1BgCBlaACgpmgAoOZoAKEhaAChb2gAoaxoAKHhaACiLmgAomRoAKKnaACi5mgAoyFoAKNjQEAjoEBAI9FBgCQOQYAkT0GAJIxBgCTMQYAlC0GAJXVBgCW2QYAl90GAJjhBgCZ4QYAmu0GAJvpBgCc9QYAnf0GAJ7xBgCf9QYAoAkGAKEJBgCiBQYAowEGAKQdBgClBQYApgkGAKcNBgCoMQYAqTEGAKo9BgCrNQYArCkGAK0pBgCuJQYArx0GALBhBgCxYQYAsm0GALNpBgC0dQYAtX0GALZxBgC3dQYAuEkGALlJBgC6RQYAu0EGALxdBgC9RQYAvkkGAL9NBgCAsQUAgbEFAIK9BQCDuQUAhKUFAIWtBQCGoQUAh6UFAIiZBQCJmQUAipUFAIuRBQCMjQUAjcEFAI7NBQCPyQUAkLUFAJG9BQCSsQUAk7UFAJSpBQCVqQUAlqUFAJehBQCYnQUAmSkCAJolAgCbIQIAnD0CAJ3pAgCe5QIAn+ECAKAdAgChNQIAojkCAKM9AgCkIQIApSECAKYtAgCnKQIAqBUCAKkZAgCqFQIAqxECAKwNAgCteQIArnUCAK8V8ACwafAAsRECALIdAgCzGQIAtAUCALUhAAC2LQAAtyUAALgZAAC54QEAuu0BALvlAQC8+QEA2BQAgN0UAIC/9YYCp2kNAOIUAIDnFACAzwAAgNkAAICzAwCA4QcAgH0JAID7IgCAzNSFAszghQL/IgCAgSkAgDUkAIBuJACAjSQAgLyZBQC9mQUAvqkFAL+ZvAC4mQUAuZkFALqJBQC7iQUAtKEFALXVsQC23bEAt6kFALCxsgCxzQUAssUFALO9BQCfJACAxCQAgMMoAIDfKACA8SgAgIgmAICFKQCAaSkAgCkkAIAtJACA2WSgAoEJAIDZUKAChAkAgI0JAICKCQCAhwkAgOwhAIDvIgCA9CEAgJhlBQCZEbIA/CEAgNkwoAKUOZEClU0FAJZFBQCXXQUAkGkFAJFpBQCSWQUAk1kFAID9vACB1ZwCgmW8AIPFvACEkbwAhZ28AIalvACHjbwAiK2TAonlvACKKZACi7W8AIwRkAKNlbwAji2wAI/FnAKQ6bwAkcHIAJJBkAKT8Z0ClNW8AJXlvACW4bwAl02QAphlkAKZfZACmrm8AJupCgCcbQ8Anb0KAPMiAICfXQ8AoK0PAKElCgCibQoAo2UKAKQNCgClpQ8ApgXUAKepDwComQ8AqZkPAKopDwCrKQ8ArDkPAK05DwCuKQ8ArykPALBZDwCxndEAspXRALOF1gC0sdEAtbHRALbZ1AC32dQAuOnUALnp1AC6+dQAu/nUALzp1AC96dQAvrnUAL+51ACASdUAgUnVAIJZ1QCDWdUAhEnVAIV90ACGddAAh23QAIhV0ACJXdAAinXVAIut1QCMtdUAjb3VAI611QCPQdAAkMHQAJHB0ACSwdAAk8HQAJTB0ACVwdAAlsHQAJfB0ACYwdAAmc3QAJrF0ACb3dAAnOHVAJ3pDgCe2Q4An9kOAKDV2wChwdkAotnZAKPB2QCkxdkApc3ZAKbF2QCnGdkAqGHZAKlh2QCqydkAq8nZAKzZ2QCt2dkArs3ZAK/B2QCwCdkAsRXZALId2QCzrdoAtB3ZALWx2gC2wdwAt93dALjl3QC59d0Auv3dALut3QC8td0AvaXdAL6t3QDwIQCAgvHaAIPx2gD3IgCA5OgAgIYR2ACHEdgAhOHaAIXh2gCKKdgAiynYAK9AEwClKNoAjinYAI8p2ACMKdgAjSnYAJJh2ACTYdgA6egAgO7oAICWZdgAl23YAJR12ACVbdgAml3YAJst2ADz6ACA8FwCALEw3wCR8AIAnCnYALLQAwCiOQ0Ao1GeAqAlDQChOQ0AplUNAIS8AgCkJQ0ApV0NAKptDQCrAQQAqGENAKlRAwCuuQAAp3UAAKxhDQCtxQIA+OgAgIfMAwDwVAIAzFC6AJHYBACb9NsAkRgCAJk02wCddAQAvh0AAJ9gBQCejAUAjOwCAI2sBAD96ACAvfWKAqghvwCpLb8Aqi2/AKs9vwCsKb8ArVW/AK5RvwCvTb8AoBkIAKGlvQCiIb8AozGzAKQ9vwClJb8Apg2zAKclvwC46bMAuc3LALppswC7uQkAvH0IAL2tCQC+QQwAv50JALA5vwCxhb0Asgm/ALPtywC0Gb8AtQW/ALbtswC3Bb8AiDG9AIkxvQCKrQgAiyW9AIwJCQCNvQgAjiW+AI+JDAAC6QCAgQ0JAIKlDACDUQkAhIEIAIWBCACGmQgAh60MAJhhvQCZYb0Amm0JAJsVnQKcxQ8AnQ28AJ7BDwCfcQkAkBW+AJERnwKSNZ8Ckw2fApQJvgCVCb4AlnG9AJdxvQCCuAQAl6UHALnEAwDwWAIAkUwCAJLIAgCErAQAsD0AAAzpAIAH6QCAvQUAABHpAIDwTAIAuhEAAJEkAgCN5AQAkqwCAJasAgC4uAMAudADAJb4AgCvDQAAFukAgPB4AgCRXAIAlrACAK8FAAAb6QCAIOkAgCnpAIAy6QCAP+kAgIX4AwBM6QCAh4ADAIbAAgBZ6QCAZukAgHPpAICW6QCAuzkAAHzpAICf6QCAiekAgL8dAAC+HQAAvR0AALwhAACVwB0AlMQfAJfIGgCWABgAkSAAAJDUAQCT2B4AkgAcAJ3gEgCcABAAn+gRAJ7sEwCZ8BkAmPQbAJv4FwCaABQAnnEBAJ9xAQCABQAArOkAgM0KAICwDACAXg0AgGQNAIBqDQCAdg0AgHkNAIB8DQCAfw0AgIINAICRDQCAlw0AgJoNAICdDQCAICIAgMcNAIDWDQCA/A0AgP8NAIAODgCAEQ4AgB0OAIAYIgCAMg4AgDUOAIDXFgCAEBcAgNoWAIC4ACwAuYwvALqILgC6AwCAhpwXAMx4vACEmC0AhVwXALcDAIDKAwCAiAAoAIksFADtBACAjAUAgN8FAIAaBgCAQAYAgFcGAIB0BgCAiwYAgDgBAIA8AQCAQAEAgEQBAIBIAQCATAEAgKR9AQBQAQCAonUBAKNlAQCggQEAoYEBALxxugC9kbYAvnG6AL+ltgC48bgAuXW6ALqZzgC7dboAtGG6ALVtugC2eboAt3W6ALAZugCxEboAsgm6ALMFugCsUboArXG2AK5RugCvbboAqNG4AKldugCqRbYAq1G6AKRxlgKlYZYCpnGWAqe9ugCgzZsCofG6AKLJugCjxboAnHmaAp0tugCeDc4An4WWApgJugCZtZYCmjm6AJuJtgCUMboA+CEAgJZpugCXrZYCkHm6AJE1ugCSMboAkwG6AIxJzgCN5bYAjhmaAo+hugCIoboAiUG2AIqhugCLdbYAhAG4AIWFugCGac4Ah4W6AICxugCBvboAgqm6AIOlugCAgbkAgQ27AIIVtwCDAbsAhAG7AIUhtwCGAbsAhz27AIgJuwCJAbsAihm7AIsVuwCMcbsAjX27AI5puwCPZbsAkKG5AJEluwCSyc8AkyW7AJQhuwCVwbcAliG7AJf1twCY6c8AmUW3AJq5mwKbAbsAnLm7AJ31uwCe8bsAn8G7AKARuwChCZQCokm7AKONlwKkCbsApbWXAqY5uwCnibcAqFmbAqkNuwCqLc8Aq6WXAqwNmgKtMbsArgm7AK8FuwCw0ZcCscGXArLRlwKzHbsAtFG5ALXduwC2xbcAt9G7ALjxuwC50bcAuvG7ALvNuwC82bsAvdG7AL7JuwC/xbsAgJmkAIEliAKCqaQAgxmoAFsNAICFvaQAhp3QAIcViAKInYUCiaGkAIqZpACLlaQAjCGIAo0xiAKOIYgCj+2kAJDBpgCRTaQAklWoAJNBpACUQaQAlWGoAJZBpACXfaQAmEmkAJlBpACaWaQAm1WkAJwxpACdPaQAnimkAJ8lpACgYaYAoeWkAKIJ0ACj5aQApOGkAKUBqACm4aQApzWoAKgp0ACphagAqnmEAqvBpACseaQArTWkAK4xpACvAaQAsFGkALFJiwKyCaQAs82IArRJpAC19YgCtnmkALfJqAC4GYQCuU2kALpt0AC75YgCvE2FAr1xpAC+SaQAv0WkAIARiQKBAYkCghGJAoPdpQCEkacAhR2lAFQBAICHEaUAiDGlAIkRqQCKMaUAWAEAgFwBAICNEaUAjgmlAI8FpQCQAaUAkQ2lAJIZpQCTFaUAlLGnAGABAICW2dEAlzWlAJgRpQCZ8akAmhGlAJvFqQCc+dEAZAEAgJ6phQKfEaUAoEmlAKEFpQCiAaUAozGlAKQBpQClGYoCplmlAKediQKoOaUAqYWJAqoJpQCruakArEmFAq0dpQCuPdEAr7WJArB9hAKxQaUAsnmlALN1pQC0wYkCtdGJArbBiQK3DaUAuGGnALntpQBoAQCAu+GlALzhpQC9wakAvuGlAGwBAIC3baYAttWGArUpqgC0hdIAs7mqALJtpgCxjaoAsG2mAL8higK+5aYAvaWJAnABAIC7jaYAdAEAgLm5pgC49aYAeAEAgKZ1pgClbaYAfAEAgIABAICiTaYAhAEAgIgBAICvCaYAruXSAIwBAICsjaQAqymmAKolpgCpMaYAkAEAgJc5pgCWNaYAlQ2mAJQxhwKTmYoCkhHSAJExpgCQZYYCn62mAJ65qgCUAQCAnC2kAJthpgCarYoCmb2KApitigKHfaYAhk2mAIVJpgCEBaYAg72mAIIFhgKB+aoAgFXSAI/1qgCORaYAjcmKAox1pgCL8YoCijWmAIl1iQKIbaYAgCmnAIEhpwCCOacAgzWnAIRRpwCYAQCAhkmnAJwBAIDMSIkCzYiJAoqp0wCLRacAjEGnAI2hqwCOQacAj5WrAJDJ0wBFIwCAkpmHApMhpwCUmacAldWnAJbRpwCX4acAmPGnAJnpiAKaqacAm22LApzppwCdVYsCntmnAJ9pqwCgeYcCoS2nAKIN0wCjhYsCpC2GAqURpwCmKacApyWnAKixiwKpoYsCqrGLAqt9pwCsMaUArb2nAK6lqwCvsacAsNGnALHxqwCy0acAs+2nALT5pwC18acAtumnALflpwC4oacAua2nALq5pwC7tacAvBGlAL2VpwC+edMAv5WnAICRoACBiY8CgsmgAIMNjAKEiaAAhTWMAoa5oACHCawAiNmAAomNoACKrdQAiyWMAoyNgQKNsaAAjomgAI+FoACQUYwCkUGMApJRjAKTnaAAlNGiAJVdoACWRawAl1GgAJhxoACZUawAmnGgAJtNoACcWaAAnVGgAJ5JoACfRaAAoMGgAKHNoACi2aAAo9WgAKRxogCl9aAAphnUAKf1oACo0aAAqTGsAKrRoACrBawArDnUAK2VrACuaYACr9GgALAJoACxRaAAskGgALNxoAC0QaAAtVmPArYZoAC33YwCuHmgALnFjAK6SaAAu/msALwJgAK9XaAAvn3UAL/1jAKAvYACgYGhAIK5oQCDtaEAhAGNAoURjQKGAY0Ch82hAIihowCJLaEAijWtAIshoQCMIaEAjQGtAI4hoQCPHaEAkGmhAJFhoQCSeaEAk3WhAJQRoQCVHaEAlgmhAJcFoQCYgaMAmQWhAJrp1QCbBaEAnAGhAJ3hrQCeAaEAn9WtAKAJ1QChpa0AolmBAqPhoQCkWaEApRWhAKYRoQCnIaEAqDGhAKkpjgKqaaEAq62NAqwpoQCtlY0CrhmhAK+prQCwOYECsW2hALJN1QCzxY0CtG2AArVRoQC2aaEAt2WhALjxjQK54Y0CuvGNArs9oQC8caMAvf2hAL7lrQC/8aEAs2miALKF1gCxaaIAsO2gALe5rgC2baIAtY2uALRtogC7TaIAuvWCArkJrgC4pdYAv42iAL69ogC9uaIAvPWiAKNNogCiWa4AoUGiAKDNoACncaIApk2iAKVtrgCkTaIAq1miAKpVogCpTaIAqEWiAK8pogCuJaIArTGiAKw9ogCTla4AkiWiAJGpjgKQFaIAl5mOApYR1gCVMaIAlGWCApsZogCaFaIAmS2iAJgRgwKfYaIAnq2OAp29jgKcrY4Cg2muAIK9ogCBXa4AgL2iAIe9ogCGBYIChfmuAIRV1gCLXaIAim2iAIlpogCIJaIAj/GOAo41ogCNdY0CjG2iAIARowCBMa8AghGjAIMtowCEOaMAhTGjAIYpowCHJaMAiGGjAIltowCKeaMAi3WjAIzRoQCNVaMAjrnXAI9VowCQMaMAkdGvAJIxowCT5a8AlNnXAJV1rwCWiYMClzGjAJipowCZ5aMAmuGjAJvRowCc4aMAnfmMAp65owCffY8CoBmjAKGljwKiKaMAo5mvAKRpgwKlPaMAph3XAKeVjwKoHYICqSGjAKoZowCrFaMArKGPAq2xjwKuoY8Cr22jALBBoQCxzaMAstWvALPBowC0waMAteGvALbBowC3/aMAuMmjALnBowC62aMAu9WjALyxowC9vaMAvqmjAL+lowBnDQCA0QYAgG0NAIDIBwCAcw0AgA8HAICFDQCAlAcAgIsNAICaBwCAuA0AgH0HAIDKDQCAxQcAgAIOAIBPBwCAFA4AgFIHAIAgDgCAkB0AAOEGAIAPJACA4iUAgCguAICtLACAyS0AgKpVAACrKQAAMjcAgAErAIDGMACAsjIAgAEsAIBTLwCAmSsAgJ8wAIDtKwCAGjUAgI43AICtLQCA5SwAgGYyAIADMACALzAAgA44AIAjMACA+y8AgHI0AICAIa4AgaWsAIJJ2ACDpawAhKGsAIVBoACGoawAh3WgAIhp2ACJxaAAiv0AAIsxxgCM7QAAjdEAAI7VAACPyQAAgCmhAIFNFACCIQEAg+G4AoQ5qgCFOaoAhhG9AodRFACIEQEAidW4AorNrQCLLbsCjGEUAI3ZjQKObRQAj2UUAJB5AQCRubgCkkm9ApNFuwKUDRQAlTUUAJYZAQCXqbgCmF2qAJkBFACaIQEAmwUUAJx5vQKdhbgCnnm7Ap+JuAKggb0CoXm4AqKZCQCjlRQApFmuAKWJFACmmQEAp70UAKipAQCpvbsCqrkBAKuJFACsmRQArZkUAK6JFACviRQAsNkBALEJrgCy6QEAs9W7ArTNuwK17RQAtpW8ArfhFAC4oRQAuaEUALrBoQC7pRQAvNkBAL0ZuAK+0aoAv9GqAL9FFwC+RRcAvTUXALxBvwK7KRcAugm4ArkBuAK4PQIAt+2tALY9AgC1HRcAtB0XALMdFwCyHRcAsR0XALAtAgCvWbgCrk0CAK1pFwCsTQIAq00XAKqdrQCpQRcAqE0KAK40AIDRLACApX0XAKR9FwCjoa4Aom2CAqF9ggKgbYICnzmuAJ41rgCdDa4AnDGPApuZggKaEdoAmTGuAJhljgKXtaIAlgWuAJWJggKUNa4Ak7GCApJ1rgCRNYECkC2uAI99rgCOTa4AjUmuAIwFrgCLva4AigWOAon5ogCIVdoAh0miAIadrgCFfaIAhJ2uAIOZrgCCddoAgZmuAIAdrADMqIQCzUyGAswguQLNTLkCzECOAkYyAIDMmIUCzTyEAswQgwLNUIMCzKCDAs2MgwLMMIACzSSAAswYgALNhIACmjMAgAUsAIAxLQCAiSMAgE0jAIBXIwCAayMAgJMjAIB1IwCAnSMAgGEjAIB/IwCAzPC5As2EuQLMULgCzay7AoDNAACB1QAAgt0AAIPVAACEzQAAhfUAAIb9AACH9QAAiM0AAFcvAIDBLACA1SoAgM0qAIDdKgCAuekAgCErAICQZQAAkW0AAKiIKgA1KwCAPSsAgEUrAIBJKwCATSsAgKIAMACjzDMAoOg9AKHsPACm8DYAp/QoAKQANACl/DUAgFERAIHpiAKCXREAg1URAIQpBACF6b0Chhm4AocVvgKIfREAiUURAIppBACL2b0CjA2vAI1REQCOcQQAj1URAJBJuAKRtb0Ckkm+ApO5vQKUUbgClam9ApZJDACXRREAmKmrAJl5EQCaaQQAm00RAJx5BACdbb4CnmkEAJ9ZEQCgqREAoakRAKK5EQCjuREApIkEAKVZqwCmuQQAp4W+Aqi9vgKpnREAquW5AquREQCs8REArfERAK6RpACv9REAsOkEALEpvQKy4a8As+GvALTZuAK1mREAtukEALctvQK4BagAueW+Arq5EQC7AYgCvKURAL2tEQC+wQQAvwG9AoABuQKBDb8CglUQAINtEACEUQUAheG8AoYlrgCHeRAAiGkFAIlNEACKIbkCi928AowxvwKNwbwCjjm5Ao/BvAKQUQ0AkV0QAJKBqgCTURAAlFEFAJV1EACWUQUAl0W/AphxBQCZQRAAmkEQAJtBEACcQRAAnUEQAJ5hBQCfsaoAoKEFAKGdvwKilb8Co7UQAKTduAKlqRAAptkQAKfZEACoiaUAqe0QAKqBBQCrQbwCrJmuAK2ZrgCusbkCr/EQALDxBQCxNbwCsi2pALPNvwK0gRAAtTmJAraNEAC3hRAAuNkFALkZvAK66bkCu+W/ArytEAC9lRAAvrkFAL8JvAK5La0AuC2tALtFEwC6BboCveG/ArwlBgC/GbwCvvmqALEdEwCwabsCs20TALJtEwC1eRMAtB2mALfVvwK2FQYAqXUTAKh1EwCrhakAqlUGAK1JvAKsdQYAr2ETAK5BvAKhQRMAoGUGAKNxvAKiZQYApVUTAKRlBgCnVRMAplUTAJl1vwKYhbwCm3W/ApqNugKdiRMAnIUOAJ+FEwCeVakAkVW/ApDlBgCTzRMAkpGtAJXZEwCU/QYAl0m/Apa1ugKJmRMAiJETAIs1vwKK9QYAjdm8AozVugKPuRMAjoETAIGtEwCA7boCgxm/AoLdBgCF8bwChBGqAIcVigKGrRMAgD2sAIFhEgCCQQcAg2USAIQZuwKF5b4Chhm9AofpvgKIIbsCidm+AopFEgCLXRIAjSkAgM3pAICOzaoAj8mLApCdiwKRpYsCkrGqAJOxqgCU2akAldmpAJb5qQCX+akAmJWqAJmRiwKatYsCm42LApyJqgCdiaoAnvGpAJ/xqQCgIakAoSGpAKJ9qgCjeYsCpE2LAqV1iwKmYaoAp2GqAKgpqQCpKakAqgmpAKsJqQCsRaoArUGLAq5liwKvXYsCsDmqALE5qgCyQakAs0GpALRxqQC1cakAti2qALcpiwK4PYsCuQWLAroRqgC7EaoAvHmpAL15qQC+WakAv1mpAIKJIwBtKwCAcSsAgI0rAIC+6QCAh5kjAJEpAIB5KwCAyOkAgIu5JACpKwCAifkkAI6VIwCPiSMAsSsAgI2JJACSvSMAESsAgLkrAICR4SMAo+sAgJfFIwCU8SMA4SsAgJkpAICbkSMA+SsAgJndIwD9KwCAnwktAAksAICdjdUAogkjAJ0pAIBBLACAofUjAEUsAICnGSMApCUkAG0sAICq7SQAeSwAgKgdIwCpeSQArhUjAK8JIwCsCSQArQkkALI9IwCJLACAsDEjALFhIwC2VSMAt0UjALRxIwC1XSMAulkjALsRIwCRLACAuV0jAL6JLQCVLACAvI0tANzpAICAuSUAgX0iAIKBIgCDmSIAhK0lAIXZJQCGuSIAh5EiAIiVIgCJ8SUAljIAgIuxJQCMgSUAjYElAI6dIgCPgSIAkLkiAJHpIgCStSIAk9EiAJT5IgCV1SIAlt0iAJfNIgCY+SIAmdUiAJrRIgCbmSIAqSwAgLEsAIDh6QCAvSwAgGUAAACh/SIAogEiAKMZIgDFLACApVklAKY5IgCnESIAqBUiAKlxJQDNLACAqzElAKwBJQCtASUArh0iAK8BIgCwOSIAsWkiALI1IgCzUSIAtHkiALVVIgC2XSIAt00iALh5IgC5VSIAulEiALsZIgD1LACA4SwAgO0sAIDxLACAgI0vAIGlLwCCrS8Ag70vAISlLwCFrS8AhqUvAIfdLwCI5S8Aie0vAIrlLwD5LACAAS0AgAUtAIANLQCAFS0AgJCRLwCRkS8AkpEvAJORLwCUsS8AlbEvAJa1LwCXRTMAmE0zAJlVMwCaPTMAmxkzAJyZMwCdiTMAnlUwAJ9JMACgwTAAockwAKLZMACj1TAApM0wAKX9MACm5TAApzUwAKi1MQCpuTEAqu0xAKuxmgCs0ZYArbE6AK61OgAZLQCAsEGUALHNlgCy1ZoAs8GWALTBlgC14ZoAtsGWALf9lgC4yZYAucGWALrZlgC71ZYAvLGWAL29lgC+qZYAv6WWAMUAAAChfSAAooEgACktAICkrScALS0AgDktAICnkSAAXS0AgKnxJwCqZScAq7EnAKyBJwCtgScArp0gAK+BIACwuSAAsekgALK1IABhLQCAtPkgALXVIAC23SAAt80gAEUtAIC51SAATS0AgLuZIACpLQCAcS0AgHUtAIB5LQCAgDknAIH9IACCASAAgxkgAG0tAICFWScAhjkgAIcRIACIFSAAiXEnAIrlJwCLMScAjAEnAI0BJwCOHSAAjwEgAJA5IACRaSAAkjUgAJNRIACUeSAAlVUgAJZdIACXTSAAmHkgAJlVIACaUSAAmxkgAJyFLgCdBdYAnoEuAJ+BLgCArT8AgbU/AIK9PwCDtT8AhK0/AIW5yACG1T8Ah80/AIj1PwCJ/T8AipnIAIvxPwCMATsAjQE7AI6NyACPOQQAkEkEAJFJBACSWQQAk1UEAJRNBACV3TwAlnkEAJd1BACYWQQAmSEEAJohBACbNdQAnCEEAJ3Z5gCeJQQAnx0EAKDpBACh9QQAos0/AKP1BACkFQQApfnUAKYhyACnIcgAqNHUAKktBACqOQQAq03CAKwtBACtdcgArh0EAK95BACwKQQAsTEEALI9BACzOQQAtC0EALX9BQC2qQUAt6kFALiZBQC5mQUAunkFALtFBQC8AQUAvQEFAL4BBQC/AQUAgC0HAIE1BwCCPQcAgzUHAIQtBwCFqQcAhqUHAIdl1QCILQYAiTEGAIoxBgCLDQYAjPnJAI15BgCOWQYAj1UGAJBpyQCRNQYAkj0GAJM1BgCULQYAlcUGAJZdAwCXVQMAmG0DAJl1AwCafQMAm3UDAJxtAwCdET0AnlkDAJ9ZAwCgqQMAoakDAKK5AwCjuQMApKkDAKWpAwCm2QMAp9kDAKjpAwCp6QMAqvkDAKv9AwCs5QMAre0DAK7lAwCvbcMAsKEDALGhAwCyoQMAs6EDALShAwC1zeYAtq0DALelAwC4yeYAuZkDALppAwC7aQMAvHkDAL15AwC+aQMAv2kDAIAAAACBLQCAfS0AgJUtAIDm6QCAsS0AgLUtAIC9LQCA0S0AgPQtAIDr6QCA8OkAgAAuAIAELgCACC4AgPwtAIAQLgCAoSkAgKUpAIAYLgCAIC4AgPXpAIA8LgCAQC4AgEwuAID66QCAVC4AgFguAIA3LwCAqSkAgGwuAICILgCAhC4AgATqAICQLgCACeoAgJwuAICYLgCAoC4AgLAuAIC0LgCArSkAgMQuAIDMLgCA0C4AgNQuAICxKQCADuoAgLUpAID3LgCA+y4AgP8uAIDV6wCAGOoAgNo1AIAvLwCAuSkAgDvqAIAN6wCAPy8AgEcvAIC9KQCAWy8AgGsvAICqIfQAq7U/AKilPwCpzecArkXwAK+hPwCsSfAArTH0AKJl4gCjvT8AoLk/AKG5PwCmlT8Ap50/AKSlPwClnT8Augk8AG8vAIC4CTwAuQk8AHcvAICHLwCAxSkAgMEpAICy3T8AswU9ALBN7wCx1T8Atn3wALe55AC0HT0AtWk8AB3qAICPLwCAoy8AgKcvAIC3LwCAyy8AgMMvAIDHLwCAgrX7AM8vAICA/T8AgfU/AOMvAIDnLwCA/y8AgAcwAICavT8Am/3NAJi9PwCZtT8Anlk/AJ9ZPwCcWT8AnVk/AJKBPwCTaekAkHnkAJGxPwCWgT8Al4H0AJQh5wCVmT8AFzAAgCswAIAs6gCAJzAAgBswAIAzMACAOzAAgE8wAIAx6gCAVzAAgEoAAABLMACAQzAAgMkpAIBfMACAZzAAgG8wAIBjMACAzSkAgIcwAIA26gCAszAAgPUwAIDRMACA2SkAgNUpAIDRKQCAnSsAgKErAID5MACA4TAAgK41AIA9KgCADTEAgCExAIAZMQCAT+oAgN0pAIA1MQCAKTEAgFIxAIBZ6gCAXjEAgD0xAIBmMQCAajEAgG4xAIByMQCAfjEAgF7qAICGMQCA5SkAgJIxAIBj6gCAljEAgOkpAICiMQCArjEAgL4xAIBo6gCA/+kAgG3qAIDeMQCAcuoAgLgJAQC5CQEAuhkBALsZAQC8CQEAvQkBAL45AQC/OQEAsM3FALE1zACymQ4As5kOALSJDgC1iQ4AtjkBALc5AQCo6dkAqckOAKrZDgCrqcUArMUOAK3NDgCuxQ4Ar/kOAKA1DgChPQ4AojUOAKOxxQCk8Q4ApfEOAKbxDgCn8Q4AmGkPAJlpDwCaeQ8Am3kPAJxpDwCdaQ8Ant0OAJ/NDgCQ+eoAkXEPAJJ9DwCTdQ8AlG0PAJVpDwCWWQ8Al1kPAIh5DwCJeQ8AigkPAIsJDwCMGQ8AjRkPAI4NzACPDQ8AgHkPAIF5DwCCSQ8Ag0kPAIRZDwCFWQ8AhkkPAIdJDwCKUQIAi1ECAIj5xgCJQQIAjnECAI/txgCMQQIAjUECAIIVAgCDHQIAgAUCAIEdAgCGdQIAh30CAIQFAgCFfQIAmsUCAJvNAgCYkc8AmYXaAJ7FAgCfzQIAnNUCAJ3NAgCSDQIAkxUCAJANAgCRBQIAlg0CAJf1AgCUDQIAlQUCAKo9AgCrRQIAqD0CAKk1AgCuXQIAr0UCAKxdAgCtVQIAol3GAKMBAgCgNQIAoQ0CAKYBAgCnxdgApBECAKURAgC6OQIAuzkCALg5AgC5OQIAvtkBAL/ZAQC82QEAvdkBALI9AgCzBQIAsD0CALE1AgC2GQIAtxkCALQdAgC16cIA6jEAgPIxAIDiMQCA/jEAgA4yAIAWMgCAIjIAgCYyAIB36gCACjIAgD4yAIBCMgCA7SkAgFIyAIB86gCANjIAgHIyAICB6gCAhuoAgHYyAICKMgCAgjIAgPEpAICOMgCAnjIAgJoyAICmMgCAw+kAgLYyAICL6gCAwjIAgJXqAIDWMgCA9jIAgJrqAIAKMwCADjMAgJ/qAICk6gCAKjMAgDozAID1KQCAPjMAgPkpAIBWMwCAWjMAgGYzAIByMwCA/SkAgIozAICp6gCApjMAgK7qAIAT6gCAwjMAgLPqAIC4AAAAuOoAgL3qAIABKgCABSoAgMfqAIDC6gCAzOoAgIAB3gCB8QcAgvEHAIPxBwCEFQIAhR0CAIYVAgCHEQIAiCXeAIld3gCKOQIAizkCAIwpAgCNKQIAjhkCAI99ygCQTd4AkWECAJJhAgCT7cEAlH0CAJVlAgCWIcAAl2kCAJhZAgCZMcIAmlUCAJstAgCcNQIAnT0CAJ4xAgCfMQIAoNECAKHRAgCi0QIAo9ECAKTxAgCl8QIApvECAKfxAgCo0QIAqdECAKrRAgCr0QIArDECAK0xAgCuMQIArzECALBRAgCxUQIAslECALNRAgC0cQIAtXECALZxAgC3cQIAuFECALlRAgC6+dwAu1UCALxNAgC9NQIAvj0CAL81AgC+7QYAv/UGALztBgC95QYAuskGALvJBgC4xcsAuckGALbtBgC39QYAtO0GALXlBgCyjQYAs/UGALDR3QCxhQYArvEGAK/xBgCs5QYAreEGAKr1BgCr/QYAqMUGAKn9BgCm9QYAp/0GAKTlBgCl/QYAovUGAKP9BgCg+QYAoZ3dAJ75BgCf+QYAnPkGAJ35BgCa+QYAm/kGAJj5BgCZ+QYAlvkGAJf5BgCUcd0AlfkGAJL9BgCT5QYAkP0GAJH1BgCO/QYAj4UGAIz9BgCN9QYAiuEGAIsB3QCI8QYAifEGAIbBBgCHwQYAhPEGAIXxBgCCkccAg+EGAIDpBgCBxcAAgAAAANHqAIACNACABjQAgBI0AIARKgCAFSoAgNvqAIAmNACAGSoAgODqAIDl6gCA6uoAgJY0AIAdKgCAojQAgKY0AIDv6gCA9OoAgL40AIAhKgCA+eoAgNI0AIDWNACAJSoAgP7qAIDyNACAKSoAgAI1AID6NACACjUAgAjrAIAiNQCALSoAgC41AIA2NQCARjUAgDEqAIAS6wCAF+sAgDUqAIAc6wCAXjUAgCHrAIBqNQCAdjUAgCbrAIAr6wCAkjUAgDDrAICaNQCAQOoAgDkqAICyNQCAtjUAgEEqAIC6NQCAFC4AgDXrAIA66wCAReoAgErqAIDeNQCA9jcAgIDNAQCB1QEAgt0BAIPVAQCEzQEAhfUBAIb9AQCH9QEAiM0BAInVAQCK3QEAi/UJAIzJAQCNyQEAjgEcAI89HwCQRR8AkU0fAJJFHwCTXR8AlEUfAJVNHwCWRR8Al30fAJhBxwCZQR8AmkEfAJtBHwCcQR8AnUEfAJ5BHwCfYd8AoL0fAKHFHwCizR8Ao8UfAKTdHwClxR8Aps0fAKfFHwCo/R8AqcUfAKrNHwCrxR8ArN0fAK3FHwCuzR8Ar8UfALC9HwCxRR8Ask0fALNFHwC0/ckAtVkfALZJHwC3SR8AuHkfALl5HwC6SR8Au8XdALxVHwC9XR8AvlUfAL9NHwAKNgCABjYAgA42AIAZLACAEjYAgBY2AIAaNgCAIjYAgD/rAIAmNgCAOjYAgD42AIAqNgCAQjYAgFY2AIA2NgCASjYAgE42AIBSNgCAROsAgE7rAIBJ6wCASSoAgHI2AIB2NgCAfjYAgGLrAICCNgCAU+sAgE0qAIBRKgCAWOsAgF3rAIBVKgCAojYAgKo2AICuNgCAujYAgLY2AIDCNgCAvjYAgMY2AIDKNgCA0jYAgFkqAIDaNgCA3jYAgF0qAIDuNgCAZ+sAgP42AIACNwCAYSoAgA43AICVKQCAbOsAgHHrAIBlKgCAaSoAgDo3AIB26wCAkjcAgJY3AICuNwCAgLUBAIG9AQCCtQEAg80BAITt9ACF0QEAhtEBAIfRAQCI8QEAifEBAIrxAQCL8QEAjNEBAI3RAQCO0QEAj9EBAJB9wwCRBcMAkl35AJO9AQCUpQEAla0BAJalAQCXXQMAmGUDAJltAwCaZQMAm30DAJxlAwCdbQMAnmUDAJ85wwCgoQMAoaEDAKKhAwCjoQMApKEDAKWhAwCmoQMAp6EDAKjhAwCp4QMAquEDAKvhAwCs4QMAreEDAK7hAwCv4QMAsKEDALGhAwCyoQMAs6EDALShAwC1oQMAtqEDALehAwC4YQMAuWEDALphAwC7YQMAvGEDAL1hAwC+pcMAv6HDALo3AICA6wCA0ukAgMY3AIDCNwCAzjcAgNfpAIDaNwCAhesAgIrrAIAmOACAMjgAgDo4AICP6wCAPjgAgGY4AIByOACAdjgAgG44AICCOACAhjgAgJTrAICSOACAbSoAgJo4AICZ6wCAcSoAgNI4AICkLgCA6jgAgJ7rAICo6wCAdSoAgHkqAIASOQCAresAgH0qAICy6wCAMjkAgLfrAIBKOQCAgSoAgFo5AIBmOQCAbjkAgHY5AICFKgCAvOsAgKY5AICyOQCAiSoAgI0qAIC2OQCAwesAgJEqAIDG6wCAy+sAgNDrAICVKgCA9jkAgPo5AIACOgCACjoAgNrrAICQ1QEAkd0BAJLVAQCT7QEAlPUBAJXB+wCW8QEAl/n7AJjNAQCZ1QEAmt0BAJvVAQCcyfsAnckBAEUqAICPAAAAgNkBAIHZAQCC6QEAg+kBAIT5AQCF+QEAhukBAIfpAQCI2QEAidkBAIoJwQCLrQEAjLUBAI29AQCOtQEAj60BAKAAAAChAAAAogAAAKMAAACkAAAApQAAAKYAAACnAAAAqAAAAKkAAACqAAAAqwAAAKwAAACtAAAArgAAAK8AAACwAAAAsQAAALIAAACzAAAAtAAAALUAAAC2AAAAtwAAALgAAAC5AAAAugAAALsAAAC8AAAAvQAAAL4AAAC/AAAAACAAIMyBACDMgwAgzIQAIMyFACDMhgAgzIcAIMyIACDMiMyAACDMiMyBACDMiM2CACDMigAgzIsAIMyTACDMk8yAACDMk8yBACDMk82CACDMlAAgzJTMgAAgzJTMgQAgzJTNggAgzKcAIMyoACDMswAgzYIAIM2FACDZiwAg2YwAINmM2ZEAINmNACDZjdmRACDZjgAg2Y7ZkQAg2Y8AINmP2ZEAINmQACDZkNmRACDZkQAg2ZHZsAAg2ZIAIOOCmQAg44KaACEAISEAIT8AIgAjACQAJQAmACcAKAAoMSkAKDEwKQAoMTEpACgxMikAKDEzKQAoMTQpACgxNSkAKDE2KQAoMTcpACgxOCkAKDE5KQAoMikAKDIwKQAoMykAKDQpACg1KQAoNikAKDcpACg4KQAoOSkAKEEpAChCKQAoQykAKEQpAChFKQAoRikAKEcpAChIKQAoSSkAKEopAChLKQAoTCkAKE0pAChOKQAoTykAKFApAChRKQAoUikAKFMpAChUKQAoVSkAKFYpAChXKQAoWCkAKFkpAChaKQAoYSkAKGIpAChjKQAoZCkAKGUpAChmKQAoZykAKGgpAChpKQAoaikAKGspAChsKQAobSkAKG4pAChvKQAocCkAKHEpAChyKQAocykAKHQpACh1KQAodikAKHcpACh4KQAoeSkAKHopACjhhIApACjhhIIpACjhhIMpACjhhIUpACjhhIYpACjhhIcpACjhhIkpACjhhIspACjhhIwpACjhhI4pACjhhI8pACjhhJApACjhhJEpACjhhJIpACjkuIApACjkuIMpACjkuIkpACjkuZ0pACjkuowpACjkupQpACjku6MpACjkvIEpACjkvJEpACjlhaspACjlha0pACjlirQpACjljYEpACjljZQpACjlkI0pACjlkbwpACjlm5spACjlnJ8pACjlraYpACjml6UpACjmnIgpACjmnIkpACjmnKgpACjmoKopACjmsLQpACjngaspACjnibkpACjnm6MpACjnpL4pACjnpZ0pACjnpa0pACjoh6opACjoh7MpACjosqEpACjos4cpACjph5EpACjqsIApACjrgpgpACjri6QpACjrnbwpACjrp4gpACjrsJQpACjsgqwpACjslYQpACjsmKTsoIQpACjsmKTtm4QpACjsnpApACjso7wpACjssKgpACjsubQpACjtg4ApACjtjIwpACjtlZgpACkAKgArACwALQAuAC4uAC4uLgAvADAAMCwAMC4AMOKBhDMAMOeCuQAxADEsADEuADEwADEwLgAxMOaXpQAxMOaciAAxMOeCuQAxMQAxMS4AMTHml6UAMTHmnIgAMTHngrkAMTIAMTIuADEy5pelADEy5pyIADEy54K5ADEzADEzLgAxM+aXpQAxM+eCuQAxNAAxNC4AMTTml6UAMTTngrkAMTUAMTUuADE15pelADE154K5ADE2ADE2LgAxNuaXpQAxNueCuQAxNwAxNy4AMTfml6UAMTfngrkAMTgAMTguADE45pelADE454K5ADE5ADE5LgAxOeaXpQAxOeeCuQAx4oGEADHigYQxMAAx4oGEMgAx4oGEMwAx4oGENAAx4oGENQAx4oGENgAx4oGENwAx4oGEOAAx4oGEOQAx5pelADHmnIgAMeeCuQAyADIsADIuADIwADIwLgAyMOaXpQAyMOeCuQAyMQAyMeaXpQAyMeeCuQAyMgAyMuaXpQAyMueCuQAyMwAyM+aXpQAyM+eCuQAyNAAyNOaXpQAyNOeCuQAyNQAyNeaXpQAyNgAyNuaXpQAyNwAyN+aXpQAyOAAyOOaXpQAyOQAyOeaXpQAy4oGEMwAy4oGENQAy5pelADLmnIgAMueCuQAzADMsADMuADMwADMw5pelADMxADMx5pelADMyADMzADM0ADM1ADM2ADM3ADM4ADM5ADPigYQ0ADPigYQ1ADPigYQ4ADPml6UAM+aciAAz54K5ADQANCwANC4ANDAANDEANDIANDMANDQANDUANDYANDcANDgANDkANOKBhDUANOaXpQA05pyIADTngrkANQA1LAA1LgA1MAA14oGENgA14oGEOAA15pelADXmnIgANeeCuQA2ADYsADYuADbml6UANuaciAA254K5ADcANywANy4AN+KBhDgAN+aXpQA35pyIADfngrkAOAA4LAA4LgA45pelADjmnIgAOOeCuQA5ADksADkuADnml6UAOeaciAA554K5ADoAOjo9ADsAPAA9AD09AD09PQA+AD8APyEAPz8AQABBAEFVAEHiiJVtAEIAQnEAQwBDRABDby4AQ+KIlWtnAEQAREoARFoARHoARMW9AETFvgBFAEYARkFYAEcAR0IAR0h6AEdQYQBHeQBIAEhQAEhWAEhnAEh6AEkASUkASUlJAElKAElVAElWAElYAEoASwBLQgBLSwBLTQBMAExKAExURABMagBMwrcATQBNQgBNQwBNRABNSHoATVBhAE1WAE1XAE3OqQBOAE5KAE5qAE5vAE8AUABQSABQUE0AUFBWAFBSAFBURQBQYQBRAFIAUnMAUwBTRABTTQBTUwBTdgBUAFRFTABUSHoAVE0AVQBWAFZJAFZJSQBWSUlJAFbiiJVtAFcAV0MAV1oAV2IAWABYSQBYSUkAWQBaAFsAXABdAF4AXwBgAGEAYS5tLgBhL2MAYS9zAGHKvgBiAGJhcgBjAGMvbwBjL3UAY2FsAGNjAGNkAGNtAGNtMgBjbTMAZABkQgBkYQBkbABkbQBkbTIAZG0zAGR6AGTFvgBlAGVWAGVyZwBmAGZmAGZmaQBmZmwAZmkAZmwAZm0AZwBnYWwAaABoUGEAaGEAaQBpaQBpaWkAaWoAaW4AaXYAaXgAagBrAGtBAGtIegBrUGEAa1YAa1cAa2NhbABrZwBrbABrbQBrbTIAa20zAGt0AGvOqQBsAGxqAGxtAGxuAGxvZwBseABswrcAbQBtMgBtMwBtQQBtVgBtVwBtYgBtZwBtaWwAbWwAbW0AbW0yAG1tMwBtb2wAbXMAbeKIlXMAbeKIlXMyAG4AbkEAbkYAblYAblcAbmoAbm0AbnMAbwBvVgBwAHAubS4AcEEAcEYAcFYAcFcAcGMAcHMAcQByAHJhZAByYWTiiJVzAHJhZOKIlXMyAHMAc3IAc3QAdAB1AHYAdmkAdmlpAHZpaWkAdwB4AHhpAHhpaQB5AHoAewB8AH0AwqIAwqMAwqUAwqYAwqwAwrBDAMKwRgDCtwDDgADDgQDDggDDgwDDhADDhQDDhgDDhwDDiADDiQDDigDDiwDDjADDjQDDjgDDjwDDkQDDkgDDkwDDlADDlQDDlgDDmQDDmgDDmwDDnADDnQDDoADDoQDDogDDowDDpADDpQDDpwDDqADDqQDDqgDDqwDDrADDrQDDrgDDrwDDsADDsQDDsgDDswDDtADDtQDDtgDDuQDDugDDuwDDvADDvQDDvwDEgADEgQDEggDEgwDEhADEhQDEhgDEhwDEiADEiQDEigDEiwDEjADEjQDEjgDEjwDEkgDEkwDElADElQDElgDElwDEmADEmQDEmgDEmwDEnADEnQDEngDEnwDEoADEoQDEogDEowDEpADEpQDEpgDEpwDEqADEqQDEqgDEqwDErADErQDErgDErwDEsADEsQDEtADEtQDEtgDEtwDEuQDEugDEuwDEvADEvQDEvgDFgwDFhADFhQDFhgDFhwDFiADFiwDFjADFjQDFjgDFjwDFkADFkQDFkwDFlADFlQDFlgDFlwDFmADFmQDFmgDFmwDFnADFnQDFngDFnwDFoADFoQDFogDFowDFpADFpQDFqADFqQDFqgDFqwDFrADFrQDFrgDFrwDFsADFsQDFsgDFswDFtADFtQDFtgDFtwDFuADFuQDFugDFuwDFvADFvQDFvgDGjgDGkADGoADGoQDGqwDGrwDGsADHjQDHjgDHjwDHkADHkQDHkgDHkwDHlADHlQDHlgDHlwDHmADHmQDHmgDHmwDHnADHngDHnwDHoADHoQDHogDHowDHpgDHpwDHqADHqQDHqgDHqwDHrADHrQDHrgDHrwDHsADHtADHtQDHuADHuQDHugDHuwDHvADHvQDHvgDHvwDIgADIgQDIggDIgwDIhADIhQDIhgDIhwDIiADIiQDIigDIiwDIjADIjQDIjgDIjwDIkADIkQDIkgDIkwDIlADIlQDIlgDIlwDImADImQDImgDImwDIngDInwDIogDIpgDIpwDIqADIqQDIqgDIqwDIrADIrQDIrgDIrwDIsADIsQDIsgDIswDItwDJkADJkQDJkgDJlADJlQDJmQDJmwDJnADJnwDJoQDJowDJpQDJpgDJqADJqQDJqgDJqwDJrQDJrwDJsADJsQDJsgDJswDJtADJtQDJuADJuQDJuwDKgQDKggDKgwDKiQDKigDKiwDKjADKkADKkQDKkgDKlQDKnQDKnwDKuQDKvG4AzIAAzIEAzIjMgQDMkwDOhgDOiADOiQDOigDOjADOjgDOjwDOkADOkQDOkgDOkwDOlADOlQDOlgDOlwDOmADOmQDOmgDOmwDOnADOnQDOngDOnwDOoADOoQDOowDOpADOpQDOpgDOpwDOqADOqQDOqgDOqwDOrADOrQDOrgDOrwDOsADOsQDOsgDOswDOtADOtQDOtgDOtwDOuADOuQDOugDOuwDOvADOvEEAzrxGAM68VgDOvFcAzrxnAM68bADOvG0AzrxzAM69AM6+AM6/AM+AAM+BAM+CAM+DAM+EAM+FAM+GAM+HAM+IAM+JAM+KAM+LAM+MAM+NAM+OAM+cAM+dANCAANCBANCDANCHANCMANCNANCOANCZANC5ANC9ANGKANGMANGQANGRANGTANGXANGcANGdANGeANG2ANG3ANOBANOCANOQANORANOSANOTANOWANOXANOaANObANOcANOdANOeANOfANOiANOjANOkANOlANOmANOnANOqANOrANOsANOtANOuANOvANOwANOxANOyANOzANO0ANO1ANO4ANO5ANWl1oIA1bTVpQDVtNWrANW01a0A1bTVtgDVvtW2ANeQANeQ1rcA15DWuADXkNa8ANeQ15wA15EA15HWvADXkda/ANeSANeS1rwA15MA15PWvADXlADXlNa8ANeV1rkA15XWvADXlta8ANeY1rwA15nWtADXmda8ANea1rwA15sA15vWvADXm9a/ANecANec1rwA150A157WvADXoNa8ANeh1rwA16IA16PWvADXpNa8ANek1r8A16bWvADXp9a8ANeoANeo1rwA16nWvADXqda814EA16nWvNeCANep14EA16nXggDXqgDXqta8ANey1rcA2KEA2KIA2KMA2KQA2KUA2KYA2KbYpwDYptisANim2K0A2KbYrgDYptixANim2LIA2KbZhQDYptmGANim2YcA2KbZiADYptmJANim2YoA2KbbhgDYptuHANim24gA2KbbkADYptuVANinANin2YPYqNixANin2YTZhNmHANin2YsA2KfZtADYqADYqNisANio2K0A2KjYrdmKANio2K4A2KjYrtmKANio2LEA2KjYsgDYqNmFANio2YYA2KjZhwDYqNmJANio2YoA2KkA2KoA2KrYrADYqtis2YUA2KrYrNmJANiq2KzZigDYqtitANiq2K3YrADYqtit2YUA2KrYrgDYqtiu2YUA2KrYrtmJANiq2K7ZigDYqtixANiq2LIA2KrZhQDYqtmF2KwA2KrZhditANiq2YXYrgDYqtmF2YkA2KrZhdmKANiq2YYA2KrZhwDYqtmJANiq2YoA2KsA2KvYrADYq9ixANir2LIA2KvZhQDYq9mGANir2YcA2KvZiQDYq9mKANisANis2K0A2KzYrdmJANis2K3ZigDYrNmEINis2YTYp9mE2YcA2KzZhQDYrNmF2K0A2KzZhdmJANis2YXZigDYrNmJANis2YoA2K0A2K3YrADYrdis2YoA2K3ZhQDYrdmF2YkA2K3ZhdmKANit2YkA2K3ZigDYrgDYrtisANiu2K0A2K7ZhQDYrtmJANiu2YoA2K8A2LAA2LDZsADYsQDYsdiz2YjZhADYsdmwANix24zYp9mEANiyANizANiz2KwA2LPYrNitANiz2KzZiQDYs9itANiz2K3YrADYs9iuANiz2K7ZiQDYs9iu2YoA2LPYsQDYs9mFANiz2YXYrADYs9mF2K0A2LPZhdmFANiz2YcA2LPZiQDYs9mKANi0ANi02KwA2LTYrNmKANi02K0A2LTYrdmFANi02K3ZigDYtNiuANi02LEA2LTZhQDYtNmF2K4A2LTZhdmFANi02YcA2LTZiQDYtNmKANi1ANi12K0A2LXYrditANi12K3ZigDYtdiuANi12LEA2LXZhNi52YUA2LXZhNmJANi12YTZiSDYp9mE2YTZhyDYudmE2YrZhyDZiNiz2YTZhQDYtdmE25IA2LXZhQDYtdmF2YUA2LXZiQDYtdmKANi2ANi22KwA2LbYrQDYttit2YkA2LbYrdmKANi22K4A2LbYrtmFANi22LEA2LbZhQDYttmJANi22YoA2LcA2LfYrQDYt9mFANi32YXYrQDYt9mF2YUA2LfZhdmKANi32YkA2LfZigDYuADYuNmFANi5ANi52KwA2LnYrNmFANi52YTZitmHANi52YUA2LnZhdmFANi52YXZiQDYudmF2YoA2LnZiQDYudmKANi6ANi62KwA2LrZhQDYutmF2YUA2LrZhdmJANi62YXZigDYutmJANi62YoA2YDZiwDZgNmOANmA2Y7ZkQDZgNmPANmA2Y/ZkQDZgNmQANmA2ZDZkQDZgNmRANmA2ZIA2YEA2YHYrADZgditANmB2K4A2YHYrtmFANmB2YUA2YHZhdmKANmB2YkA2YHZigDZggDZgtitANmC2YTbkgDZgtmFANmC2YXYrQDZgtmF2YUA2YLZhdmKANmC2YkA2YLZigDZgwDZg9inANmD2KwA2YPYrQDZg9iuANmD2YQA2YPZhQDZg9mF2YUA2YPZhdmKANmD2YkA2YPZigDZhADZhNiiANmE2KMA2YTYpQDZhNinANmE2KwA2YTYrNisANmE2KzZhQDZhNis2YoA2YTYrQDZhNit2YUA2YTYrdmJANmE2K3ZigDZhNiuANmE2K7ZhQDZhNmFANmE2YXYrQDZhNmF2YoA2YTZhwDZhNmJANmE2YoA2YUA2YXYpwDZhdisANmF2KzYrQDZhdis2K4A2YXYrNmFANmF2KzZigDZhditANmF2K3YrADZhdit2YUA2YXYrdmF2K8A2YXYrdmKANmF2K4A2YXYrtisANmF2K7ZhQDZhdiu2YoA2YXZhQDZhdmF2YoA2YXZiQDZhdmKANmGANmG2KwA2YbYrNitANmG2KzZhQDZhtis2YkA2YbYrNmKANmG2K0A2YbYrdmFANmG2K3ZiQDZhtit2YoA2YbYrgDZhtixANmG2LIA2YbZhQDZhtmF2YkA2YbZhdmKANmG2YYA2YbZhwDZhtmJANmG2YoA2YcA2YfYrADZh9mFANmH2YXYrADZh9mF2YUA2YfZiQDZh9mKANmH2bAA2YgA2YjYs9mE2YUA2YjZtADZiQDZidmwANmKANmK2KwA2YrYrNmKANmK2K0A2YrYrdmKANmK2K4A2YrYsQDZitiyANmK2YUA2YrZhdmFANmK2YXZigDZitmGANmK2YcA2YrZiQDZitmKANmK2bQA2a4A2a8A2bEA2bkA2boA2bsA2b4A2b8A2oAA2oMA2oQA2oYA2ocA2ogA2owA2o0A2o4A2pEA2pgA2qEA2qQA2qYA2qkA2q0A2q8A2rEA2rMA2roA2rsA2r4A24AA24EA24IA24UA24YA24cA24fZtADbiADbiQDbiwDbjADbkADbkgDbkwDgpJXgpLwA4KSW4KS8AOCkl+CkvADgpJzgpLwA4KSh4KS8AOCkouCkvADgpKkA4KSr4KS8AOCkr+CkvADgpLEA4KS0AOCmoeCmvADgpqLgprwA4Kav4Ka8AOCniwDgp4wA4KiW4Ki8AOCol+CovADgqJzgqLwA4Kir4Ki8AOCosuCovADgqLjgqLwA4Kyh4Ky8AOCsouCsvADgrYgA4K2LAOCtjADgrpQA4K+KAOCviwDgr4wA4LGIAOCzgADgs4cA4LOIAOCzigDgs4sA4LWKAOC1iwDgtYwA4LeaAOC3nADgt50A4LeeAOC5jeC4sgDguqvgupkA4Lqr4LqhAOC7jeC6sgDgvIsA4L2A4L61AOC9guC+twDgvYzgvrcA4L2R4L63AOC9luC+twDgvZvgvrcA4L2x4L2yAOC9seC9tADgvbHgvoAA4L6Q4L61AOC+kuC+twDgvpzgvrcA4L6h4L63AOC+puC+twDgvqvgvrcA4L6y4L2x4L6AAOC+suC+gADgvrPgvbHgvoAA4L6z4L6AAOGApgDhg5wA4YSAAOGEgQDhhIIA4YSDAOGEhADhhIUA4YSGAOGEhwDhhIgA4YSJAOGEigDhhIsA4YSMAOGEjQDhhI4A4YSPAOGEkADhhJEA4YSSAOGElADhhJUA4YSaAOGEnADhhJ0A4YSeAOGEoADhhKEA4YSiAOGEowDhhKcA4YSpAOGEqwDhhKwA4YStAOGErgDhhK8A4YSyAOGEtgDhhYAA4YWHAOGFjADhhZcA4YWYAOGFmQDhhaAA4YWhAOGFogDhhaMA4YWkAOGFpQDhhaYA4YWnAOGFqADhhakA4YWqAOGFqwDhhawA4YWtAOGFrgDhha8A4YWwAOGFsQDhhbIA4YWzAOGFtADhhbUA4YaEAOGGhQDhhogA4YaRAOGGkgDhhpQA4YaeAOGGoQDhhqoA4YasAOGGrQDhhrAA4YaxAOGGsgDhhrMA4Ya0AOGGtQDhh4cA4YeIAOGHjADhh44A4YeTAOGHlwDhh5kA4YedAOGHnwDhh7EA4YeyAOGshgDhrIgA4ayKAOGsjADhrI4A4aySAOGsuwDhrL0A4a2AAOGtgQDhrYMA4bSCAOG0lgDhtJcA4bScAOG0nQDhtKUA4bW7AOG2hQDhuIAA4biBAOG4ggDhuIMA4biEAOG4hQDhuIYA4biHAOG4iADhuIkA4biKAOG4iwDhuIwA4biNAOG4jgDhuI8A4biQAOG4kQDhuJIA4biTAOG4lADhuJUA4biWAOG4lwDhuJgA4biZAOG4mgDhuJsA4bicAOG4nQDhuJ4A4bifAOG4oADhuKEA4biiAOG4owDhuKQA4bilAOG4pgDhuKcA4bioAOG4qQDhuKoA4birAOG4rADhuK0A4biuAOG4rwDhuLAA4bixAOG4sgDhuLMA4bi0AOG4tQDhuLYA4bi3AOG4uADhuLkA4bi6AOG4uwDhuLwA4bi9AOG4vgDhuL8A4bmAAOG5gQDhuYIA4bmDAOG5hADhuYUA4bmGAOG5hwDhuYgA4bmJAOG5igDhuYsA4bmMAOG5jQDhuY4A4bmPAOG5kADhuZEA4bmSAOG5kwDhuZQA4bmVAOG5lgDhuZcA4bmYAOG5mQDhuZoA4bmbAOG5nADhuZ0A4bmeAOG5nwDhuaAA4bmhAOG5ogDhuaMA4bmkAOG5pQDhuaYA4bmnAOG5qADhuakA4bmqAOG5qwDhuawA4bmtAOG5rgDhua8A4bmwAOG5sQDhubIA4bmzAOG5tADhubUA4bm2AOG5twDhubgA4bm5AOG5ugDhubsA4bm8AOG5vQDhub4A4bm/AOG6gADhuoEA4bqCAOG6gwDhuoQA4bqFAOG6hgDhuocA4bqIAOG6iQDhuooA4bqLAOG6jADhuo0A4bqOAOG6jwDhupAA4bqRAOG6kgDhupMA4bqUAOG6lQDhupYA4bqXAOG6mADhupkA4bqgAOG6oQDhuqIA4bqjAOG6pADhuqUA4bqmAOG6pwDhuqgA4bqpAOG6qgDhuqsA4bqsAOG6rQDhuq4A4bqvAOG6sADhurEA4bqyAOG6swDhurQA4bq1AOG6tgDhurcA4bq4AOG6uQDhuroA4bq7AOG6vADhur0A4bq+AOG6vwDhu4AA4buBAOG7ggDhu4MA4buEAOG7hQDhu4YA4buHAOG7iADhu4kA4buKAOG7iwDhu4wA4buNAOG7jgDhu48A4buQAOG7kQDhu5IA4buTAOG7lADhu5UA4buWAOG7lwDhu5gA4buZAOG7mgDhu5sA4bucAOG7nQDhu54A4bufAOG7oADhu6EA4buiAOG7owDhu6QA4bulAOG7pgDhu6cA4buoAOG7qQDhu6oA4burAOG7rADhu60A4buuAOG7rwDhu7AA4buxAOG7sgDhu7MA4bu0AOG7tQDhu7YA4bu3AOG7uADhu7kA4byAAOG8gQDhvIIA4byDAOG8hADhvIUA4byGAOG8hwDhvIgA4byJAOG8igDhvIsA4byMAOG8jQDhvI4A4byPAOG8kADhvJEA4bySAOG8kwDhvJQA4byVAOG8mADhvJkA4byaAOG8mwDhvJwA4bydAOG8oADhvKEA4byiAOG8owDhvKQA4bylAOG8pgDhvKcA4byoAOG8qQDhvKoA4byrAOG8rADhvK0A4byuAOG8rwDhvLAA4byxAOG8sgDhvLMA4by0AOG8tQDhvLYA4by3AOG8uADhvLkA4by6AOG8uwDhvLwA4by9AOG8vgDhvL8A4b2AAOG9gQDhvYIA4b2DAOG9hADhvYUA4b2IAOG9iQDhvYoA4b2LAOG9jADhvY0A4b2QAOG9kQDhvZIA4b2TAOG9lADhvZUA4b2WAOG9lwDhvZkA4b2bAOG9nQDhvZ8A4b2gAOG9oQDhvaIA4b2jAOG9pADhvaUA4b2mAOG9pwDhvagA4b2pAOG9qgDhvasA4b2sAOG9rQDhva4A4b2vAOG9sADhvbIA4b20AOG9tgDhvbgA4b26AOG9vADhvoAA4b6BAOG+ggDhvoMA4b6EAOG+hQDhvoYA4b6HAOG+iADhvokA4b6KAOG+iwDhvowA4b6NAOG+jgDhvo8A4b6QAOG+kQDhvpIA4b6TAOG+lADhvpUA4b6WAOG+lwDhvpgA4b6ZAOG+mgDhvpsA4b6cAOG+nQDhvp4A4b6fAOG+oADhvqEA4b6iAOG+owDhvqQA4b6lAOG+pgDhvqcA4b6oAOG+qQDhvqoA4b6rAOG+rADhvq0A4b6uAOG+rwDhvrAA4b6xAOG+sgDhvrMA4b60AOG+tgDhvrcA4b64AOG+uQDhvroA4b68AOG/ggDhv4MA4b+EAOG/hgDhv4cA4b+IAOG/igDhv4wA4b+QAOG/kQDhv5IA4b+WAOG/lwDhv5gA4b+ZAOG/mgDhv6AA4b+hAOG/ogDhv6QA4b+lAOG/pgDhv6cA4b+oAOG/qQDhv6oA4b+sAOG/sgDhv7MA4b+0AOG/tgDhv7cA4b+4AOG/ugDhv7wA4oCQAOKAkwDigJQA4oCy4oCyAOKAsuKAsuKAsgDigLLigLLigLLigLIA4oC14oC1AOKAteKAteKAtQDigqkA4oaQAOKGkQDihpIA4oaTAOKGmgDihpsA4oauAOKHjQDih44A4oePAOKIggDiiIQA4oiHAOKIiQDiiIwA4oiRAOKIkgDiiKQA4oimAOKIq+KIqwDiiKviiKviiKsA4oir4oir4oir4oirAOKIruKIrgDiiK7iiK7iiK4A4omBAOKJhADiiYcA4omJAOKJoADiiaIA4omtAOKJrgDiia8A4omwAOKJsQDiibQA4om1AOKJuADiibkA4oqAAOKKgQDiioQA4oqFAOKKiADiiokA4oqsAOKKrQDiiq4A4oqvAOKLoADii6EA4ouiAOKLowDii6oA4ourAOKLrADii60A4pSCAOKWoADil4sA4qaFAOKmhgDiq53MuADitaEA44CBAOOAggDjgIgA44CJAOOAigDjgIsA44CMAOOAjQDjgI4A44CPAOOAkADjgJEA44CSAOOAlADjgJRT44CVAOOAlOS4ieOAlQDjgJTkuozjgJUA44CU5Yud44CVAOOAlOWuieOAlQDjgJTmiZPjgJUA44CU5pWX44CVAOOAlOacrOOAlQDjgJTngrnjgJUA44CU55uX44CVAOOAlQDjgJYA44CXAOOBjADjgY4A44GQAOOBkgDjgZQA44GWAOOBmADjgZoA44GcAOOBngDjgaAA44GiAOOBpQDjgacA44GpAOOBsADjgbEA44GzAOOBtADjgbYA44G3AOOBuQDjgboA44G744GLAOOBvADjgb0A44KI44KKAOOClADjgpkA44KaAOOCngDjgqEA44KiAOOCouODkeODvOODiADjgqLjg6vjg5XjgqEA44Ki44Oz44Oa44KiAOOCouODvOODqwDjgqMA44KkAOOCpOODi+ODs+OCsADjgqTjg7Pjg4EA44KlAOOCpgDjgqbjgqnjg7MA44KnAOOCqADjgqjjgrnjgq/jg7zjg4kA44Ko44O844Kr44O8AOOCqQDjgqoA44Kq44Oz44K5AOOCquODvOODoADjgqsA44Kr44Kk44OqAOOCq+ODqeODg+ODiADjgqvjg63jg6rjg7wA44KsAOOCrOODreODswDjgqzjg7Pjg54A44KtAOOCreODpeODquODvADjgq3jg60A44Kt44Ot44Kw44Op44OgAOOCreODreODoeODvOODiOODqwDjgq3jg63jg6/jg4Pjg4gA44KuAOOCruOCrADjgq7jg4vjg7wA44Ku44Or44OA44O8AOOCrwDjgq/jg6vjgrzjgqTjg60A44Kv44Ot44O844ONAOOCsADjgrDjg6njg6AA44Kw44Op44Og44OI44OzAOOCsQDjgrHjg7zjgrkA44KyAOOCswDjgrPjgrMA44Kz44OIAOOCs+ODq+ODigDjgrPjg7zjg50A44K0AOOCtQDjgrXjgqTjgq/jg6sA44K144Oz44OB44O844OgAOOCtgDjgrcA44K344Oq44Oz44KwAOOCuADjgrkA44K6AOOCuwDjgrvjg7Pjg4EA44K744Oz44OIAOOCvADjgr0A44K+AOOCvwDjg4AA44OA44O844K5AOODgQDjg4IA44ODAOODhADjg4UA44OGAOODhwDjg4fjgrcA44OIAOODiOODswDjg4kA44OJ44OrAOODigDjg4rjg44A44OLAOODjADjg40A44OOAOODjuODg+ODiADjg48A44OP44Kk44OEAOODkADjg5Djg7zjg6zjg6sA44ORAOODkeODvOOCu+ODs+ODiADjg5Hjg7zjg4QA44OSAOODkwDjg5Pjg6sA44OUAOODlOOCouOCueODiOODqwDjg5Tjgq/jg6sA44OU44KzAOODlQDjg5XjgqHjg6njg4Pjg4kA44OV44Kj44O844OIAOODleODqeODswDjg5YA44OW44OD44K344Kn44OrAOODlwDjg5gA44OY44Kv44K/44O844OrAOODmOODq+ODhADjg5kA44OZ44O844K/AOODmgDjg5rjgr0A44Oa44OL44OSAOODmuODs+OCuQDjg5rjg7zjgrgA44ObAOODm+ODswDjg5vjg7zjg6sA44Ob44O844OzAOODnADjg5zjg6vjg4gA44OdAOODneOCpOODs+ODiADjg53jg7Pjg4kA44OeAOODnuOCpOOCr+ODrQDjg57jgqTjg6sA44Oe44OD44OPAOODnuODq+OCrwDjg57jg7Pjgrfjg6fjg7MA44OfAOODn+OCr+ODreODswDjg5/jg6oA44Of44Oq44OQ44O844OrAOODoADjg6EA44Oh44KsAOODoeOCrOODiOODswDjg6Hjg7zjg4jjg6sA44OiAOODowDjg6QA44Ok44O844OJAOODpOODvOODqwDjg6UA44OmAOODpuOCouODswDjg6cA44OoAOODqQDjg6oA44Oq44OD44OI44OrAOODquODqQDjg6sA44Or44OU44O8AOODq+ODvOODluODqwDjg6wA44Os44OgAOODrOODs+ODiOOCsuODswDjg60A44OvAOODr+ODg+ODiADjg7AA44OxAOODsgDjg7MA44O0AOODtwDjg7gA44O5AOODugDjg7sA44O8AOODvgDjkp4A45K5AOOSuwDjk58A45SVAOObrgDjm7wA456BAOOgrwDjoaIA46G8AOOjhwDjo6MA46ScAOOkugDjqK4A46msAOOrpADjrIgA46yZAOOtiQDjrp0A47CYAOOxjgDjtLMA47aWAOO6rADjurgA47ybAOO/vADkgIgA5ICYAOSAuQDkgYYA5IKWAOSDowDkhK8A5IiCAOSIpwDkiqAA5IyBAOSMtADkjZkA5I+VAOSPmQDkkIsA5JGrAOSUqwDklZ0A5JWhAOSVqwDkl5cA5Je5AOSYtQDkmr4A5JuHAOSmlQDkp6YA5KmuAOSptgDkqrIA5KyzAOSvjgDks44A5LOtAOSzuADktZYA5LiAAOS4gQDkuIMA5LiJAOS4igDkuIsA5LiNAOS4mQDkuKYA5Lio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jQDmr5QA5q+bAOawjwDmsJQA5rC0AOaxjgDmsacA5rKIAOayvwDms4wA5rONAOazpQDms6gA5rSWAOa0mwDmtJ4A5rS0AOa0vgDmtYEA5rWpAOa1qgDmtbcA5rW4AOa2hQDmt4sA5reaAOa3qgDmt7kA5riaAOa4rwDmua4A5rqAAOa6nADmuroA5ruHAOa7iwDmu5EA5rubAOa8jwDmvJQA5ryiAOa8owDmva4A5r+GAOa/qwDmv74A54CbAOeAngDngLkA54GKAOeBqwDngbAA54G3AOeBvQDngpkA54KtAOeDiADng5kA54ShAOeFhQDnhYkA54WuAOeGnADnh44A54eQAOeIkADniJsA54ioAOeIqgDniKsA54i1AOeItgDniLsA54i/AOeJhwDniZAA54mZAOeJmwDniaIA54m5AOeKgADnipUA54qsAOeKrwDni4AA54u8AOeMqgDnjbUA5426AOeOhADnjocA546JAOeOiwDnjqUA546yAOePngDnkIYA55CJAOeQogDnkYcA55GcAOeRqQDnkbEA55KFAOeSiQDnkpgA55OKAOeTnADnk6YA55SGAOeUmADnlJ8A55SkAOeUqADnlLAA55SyAOeUswDnlLcA55S7AOeUvgDnlZkA55WlAOeVsADnlosA55aSAOeXogDnmJAA55idAOeYnwDnmYIA55mpAOeZtgDnmb0A55quAOeavwDnm4oA55ubAOebowDnm6cA55uuAOebtADnnIEA55yeAOecnwDnnYAA552KAOeeiwDnnqcA55+bAOefogDnn7MA56GOAOehqwDnoowA56KRAOejigDno4wA56O7AOekqgDnpLoA56S8AOekvgDnpYgA56WJAOelkADnpZYA56WdAOelngDnpaUA56W/AOemgQDnpo0A56aOAOemjwDnpq4A56a4AOemvgDnp4oA56eYAOenqwDnqJwA56mAAOepigDnqY8A56m0AOepugDnqoEA56qxAOeriwDnq64A56u5AOesoADnro8A56+AAOevhgDnr4kA57C+AOexoADnsbMA57G7AOeykgDnsr4A57OSAOezlgDns6MA57OnAOezqADns7gA57SAAOe0kADntKIA57SvAOe1ggDntZsA57WjAOe2oADntr4A57eHAOe3tADnuIIA57iJAOe4twDnuYEA57mFAOe8tgDnvL4A572RAOe9sgDnvbkA5726AOe+hQDnvooA576VAOe+mgDnvr0A57+6AOiAgQDogIUA6ICMAOiAkgDogLMA6IGGAOiBoADoga8A6IGwAOiBvgDogb8A6IKJAOiCiwDogq0A6IKyAOiEgwDohL4A6IeYAOiHowDoh6gA6IeqAOiHrQDoh7MA6Ie8AOiIgQDoiIQA6IiMAOiImADoiJsA6IifAOiJrgDoia8A6ImyAOiJuADoibkA6IqLAOiKkQDoip0A6IqxAOiKswDoir0A6IulAOiLpgDojJ0A6IyjAOiMtgDojZIA6I2TAOiNowDojq0A6I69AOiPiQDoj4oA6I+MAOiPnADoj6cA6I+vAOiPsQDokL0A6JGJAOiRlwDok64A6JOxAOiTswDok7wA6JSWAOiVpADol40A6Je6AOiYhgDomJIA6JitAOiYvwDomY0A6JmQAOiZnADomacA6JmpAOiZqwDomogA6JqpAOibogDonI4A6JyoAOidqwDonbkA6J6GAOieugDon6EA6KCBAOignwDooYAA6KGMAOihoADooaMA6KOCAOijjwDoo5cA6KOeAOijoQDoo7gA6KO6AOikkADopYEA6KWkAOilvgDopoYA6KaLAOimlgDop5IA6KejAOiogADoqqAA6KqqAOiqvwDoq4sA6KuSAOirlgDoq60A6Ku4AOirvgDorIEA6Ky5AOitmADoroAA6K6KAOiwtwDosYYA6LGIAOixlQDosbgA6LKdAOiyoQDosqkA6LKrAOizgQDos4IA6LOHAOiziADos5MA6LSIAOi0mwDotaQA6LWwAOi1twDotrMA6La8AOi3iwDot68A6LewAOi6qwDou4oA6LuUAOi8pgDovKoA6Ly4AOi8uwDovaIA6L6bAOi+ngDovrAA6L61AOi+tgDpgKMA6YC4AOmBigDpgakA6YGyAOmBvADpgo8A6YKRAOmClADpg44A6YOeAOmDsQDpg70A6YSRAOmEmwDphYkA6YWqAOmGmQDphrQA6YeGAOmHjADph48A6YeRAOmItADpiLgA6Ym2AOmJvADpi5cA6YuYAOmMhADpjYoA6Y+5AOmQlQDplbcA6ZaAAOmWiwDplq0A6Za3AOmYnADpmK4A6ZmLAOmZjQDpmbUA6Zm4AOmZvADpmoYA6ZqjAOmatgDpmrcA6Zq4AOmauQDpm4MA6ZuiAOmbowDpm6gA6Zu2AOmbtwDpnKMA6ZyyAOmdiADpnZEA6Z2WAOmdngDpnaIA6Z2pAOmfiwDpn5sA6Z+gAOmfrQDpn7MA6Z+/AOmggQDpoIUA6aCLAOmgmADpoKkA6aC7AOmhngDpoqgA6aObAOmjnwDpo6IA6aOvAOmjvADppKgA6aSpAOmmlgDpppkA6aanAOmmrADpp4IA6aexAOmnvgDpqaoA6aqoAOmrmADpq58A6aySAOmspQDprK8A6ayyAOmsvADprZoA6a2vAOmxgADpsZcA6bOlAOmzvQDptacA6ba0AOm3ugDpuJ4A6bm1AOm5vwDpupcA6bqfAOm6pQDpursA6buDAOm7jQDpu44A6buRAOm7uQDpu70A6bu+AOm8hQDpvI4A6byPAOm8kwDpvJYA6bygAOm8uwDpvYMA6b2KAOm9kgDpvo0A6b6OAOm+nADpvp8A6b6gAOqcpwDqna8A6qy3AOqtkgDqsIAA6rCBAOqwggDqsIMA6rCEAOqwhQDqsIYA6rCHAOqwiADqsIkA6rCKAOqwiwDqsIwA6rCNAOqwjgDqsI8A6rCQAOqwkQDqsJIA6rCTAOqwlADqsJUA6rCWAOqwlwDqsJgA6rCZAOqwmgDqsJsA6rCcAOqwnQDqsJ4A6rCfAOqwoADqsKEA6rCiAOqwowDqsKQA6rClAOqwpgDqsKcA6rCoAOqwqQDqsKoA6rCrAOqwrADqsK0A6rCuAOqwrwDqsLAA6rCxAOqwsgDqsLMA6rC0AOqwtQDqsLYA6rC3AOqwuADqsLkA6rC6AOqwuwDqsLwA6rC9AOqwvgDqsL8A6rGAAOqxgQDqsYIA6rGDAOqxhADqsYUA6rGGAOqxhwDqsYgA6rGJAOqxigDqsYsA6rGMAOqxjQDqsY4A6rGPAOqxkADqsZEA6rGSAOqxkwDqsZQA6rGVAOqxlgDqsZcA6rGYAOqxmQDqsZoA6rGbAOqxnADqsZ0A6rGeAOqxnwDqsaAA6rGhAOqxogDqsaMA6rGkAOqxpQDqsaYA6rGnAOqxqADqsakA6rGqAOqxqwDqsawA6rGtAOqxrgDqsa8A6rGwAOqxsQDqsbIA6rGzAOqxtADqsbUA6rG2AOqxtwDqsbgA6rG5AOqxugDqsbsA6rG8AOqxvQDqsb4A6rG/AOqygADqsoEA6rKCAOqygwDqsoQA6rKFAOqyhgDqsocA6rKIAOqyiQDqsooA6rKLAOqyjADqso0A6rKOAOqyjwDqspAA6rKRAOqykgDqspMA6rKUAOqylQDqspYA6rKXAOqymADqspkA6rKaAOqymwDqspwA6rKdAOqyngDqsp8A6rKgAOqyoQDqsqIA6rKjAOqypADqsqUA6rKmAOqypwDqsqgA6rKpAOqyqgDqsqsA6rKsAOqyrQDqsq4A6rKvAOqysADqsrEA6rKyAOqyswDqsrQA6rK1AOqytgDqsrcA6rK4AOqyuQDqsroA6rK7AOqyvADqsr0A6rK+AOqyvwDqs4AA6rOBAOqzggDqs4MA6rOEAOqzhQDqs4YA6rOHAOqziADqs4kA6rOKAOqziwDqs4wA6rONAOqzjgDqs48A6rOQAOqzkQDqs5IA6rOTAOqzlADqs5UA6rOWAOqzlwDqs5gA6rOZAOqzmgDqs5sA6rOcAOqznQDqs54A6rOfAOqzoADqs6EA6rOiAOqzowDqs6QA6rOlAOqzpgDqs6cA6rOoAOqzqQDqs6oA6rOrAOqzrADqs60A6rOuAOqzrwDqs7AA6rOxAOqzsgDqs7MA6rO0AOqztQDqs7YA6rO3AOqzuADqs7kA6rO6AOqzuwDqs7wA6rO9AOqzvgDqs78A6rSAAOq0gQDqtIIA6rSDAOq0hADqtIUA6rSGAOq0hwDqtIgA6rSJAOq0igDqtIsA6rSMAOq0jQDqtI4A6rSPAOq0kADqtJEA6rSSAOq0kwDqtJQA6rSVAOq0lgDqtJcA6rSYAOq0mQDqtJoA6rSbAOq0nADqtJ0A6rSeAOq0nwDqtKAA6rShAOq0ogDqtKMA6rSkAOq0pQDqtKYA6rSnAOq0qADqtKkA6rSqAOq0qwDqtKwA6rStAOq0rgDqtK8A6rSwAOq0sQDqtLIA6rSzAOq0tADqtLUA6rS2AOq0twDqtLgA6rS5AOq0ugDqtLsA6rS8AOq0vQDqtL4A6rS/AOq1gADqtYEA6rWCAOq1gwDqtYQA6rWFAOq1hgDqtYcA6rWIAOq1iQDqtYoA6rWLAOq1jADqtY0A6rWOAOq1jwDqtZAA6rWRAOq1kgDqtZMA6rWUAOq1lQDqtZYA6rWXAOq1mADqtZkA6rWaAOq1mwDqtZwA6rWdAOq1ngDqtZ8A6rWgAOq1oQDqtaIA6rWjAOq1pADqtaUA6rWmAOq1pwDqtagA6rWpAOq1qgDqtasA6rWsAOq1rQDqta4A6rWvAOq1sADqtbEA6rWyAOq1swDqtbQA6rW1AOq1tgDqtbcA6rW4AOq1uQDqtboA6rW7AOq1vADqtb0A6rW+AOq1vwDqtoAA6raBAOq2ggDqtoMA6raEAOq2hQDqtoYA6raHAOq2iADqtokA6raKAOq2iwDqtowA6raNAOq2jgDqto8A6raQAOq2kQDqtpIA6raTAOq2lADqtpUA6raWAOq2lwDqtpgA6raZAOq2mgDqtpsA6racAOq2nQDqtp4A6rafAOq2oADqtqEA6raiAOq2owDqtqQA6ralAOq2pgDqtqcA6raoAOq2qQDqtqoA6rarAOq2rADqtq0A6rauAOq2rwDqtrAA6raxAOq2sgDqtrMA6ra0AOq2tQDqtrYA6ra3AOq2uADqtrkA6ra6AOq2uwDqtrwA6ra9AOq2vgDqtr8A6reAAOq3gQDqt4IA6reDAOq3hADqt4UA6reGAOq3hwDqt4gA6reJAOq3igDqt4sA6reMAOq3jQDqt44A6rePAOq3kADqt5EA6reSAOq3kwDqt5QA6reVAOq3lgDqt5cA6reYAOq3mQDqt5oA6rebAOq3nADqt50A6reeAOq3nwDqt6AA6rehAOq3ogDqt6MA6rekAOq3pQDqt6YA6renAOq3qADqt6kA6reqAOq3qwDqt6wA6retAOq3rgDqt68A6rewAOq3sQDqt7IA6rezAOq3tADqt7UA6re2AOq3twDqt7gA6re5AOq3ugDqt7sA6re8AOq3vQDqt74A6re/AOq4gADquIEA6riCAOq4gwDquIQA6riFAOq4hgDquIcA6riIAOq4iQDquIoA6riLAOq4jADquI0A6riOAOq4jwDquJAA6riRAOq4kgDquJMA6riUAOq4lQDquJYA6riXAOq4mADquJkA6riaAOq4mwDquJwA6ridAOq4ngDquJ8A6rigAOq4oQDquKIA6rijAOq4pADquKUA6rimAOq4pwDquKgA6ripAOq4qgDquKsA6risAOq4rQDquK4A6rivAOq4sADquLEA6riyAOq4swDquLQA6ri1AOq4tgDquLcA6ri4AOq4uQDquLoA6ri7AOq4vADquL0A6ri+AOq4vwDquYAA6rmBAOq5ggDquYMA6rmEAOq5hQDquYYA6rmHAOq5iADquYkA6rmKAOq5iwDquYwA6rmNAOq5jgDquY8A6rmQAOq5kQDquZIA6rmTAOq5lADquZUA6rmWAOq5lwDquZgA6rmZAOq5mgDquZsA6rmcAOq5nQDquZ4A6rmfAOq5oADquaEA6rmiAOq5owDquaQA6rmlAOq5pgDquacA6rmoAOq5qQDquaoA6rmrAOq5rADqua0A6rmuAOq5rwDqubAA6rmxAOq5sgDqubMA6rm0AOq5tQDqubYA6rm3AOq5uADqubkA6rm6AOq5uwDqubwA6rm9AOq5vgDqub8A6rqAAOq6gQDquoIA6rqDAOq6hADquoUA6rqGAOq6hwDquogA6rqJAOq6igDquosA6rqMAOq6jQDquo4A6rqPAOq6kADqupEA6rqSAOq6kwDqupQA6rqVAOq6lgDqupcA6rqYAOq6mQDqupoA6rqbAOq6nADqup0A6rqeAOq6nwDquqAA6rqhAOq6ogDquqMA6rqkAOq6pQDquqYA6rqnAOq6qADquqkA6rqqAOq6qwDquqwA6rqtAOq6rgDquq8A6rqwAOq6sQDqurIA6rqzAOq6tADqurUA6rq2AOq6twDqurgA6rq5AOq6ugDqursA6rq8AOq6vQDqur4A6rq/AOq7gADqu4EA6ruCAOq7gwDqu4QA6ruFAOq7hgDqu4cA6ruIAOq7iQDqu4oA6ruLAOq7jADqu40A6ruOAOq7jwDqu5AA6ruRAOq7kgDqu5MA6ruUAOq7lQDqu5YA6ruXAOq7mADqu5kA6ruaAOq7mwDqu5wA6rudAOq7ngDqu58A6rugAOq7oQDqu6IA6rujAOq7pADqu6UA6rumAOq7pwDqu6gA6rupAOq7qgDqu6sA6rusAOq7rQDqu64A6ruvAOq7sADqu7EA6ruyAOq7swDqu7QA6ru1AOq7tgDqu7cA6ru4AOq7uQDqu7oA6ru7AOq7vADqu70A6ru+AOq7vwDqvIAA6ryBAOq8ggDqvIMA6ryEAOq8hQDqvIYA6ryHAOq8iADqvIkA6ryKAOq8iwDqvIwA6ryNAOq8jgDqvI8A6ryQAOq8kQDqvJIA6ryTAOq8lADqvJUA6ryWAOq8lwDqvJgA6ryZAOq8mgDqvJsA6rycAOq8nQDqvJ4A6ryfAOq8oADqvKEA6ryiAOq8owDqvKQA6rylAOq8pgDqvKcA6ryoAOq8qQDqvKoA6ryrAOq8rADqvK0A6ryuAOq8rwDqvLAA6ryxAOq8sgDqvLMA6ry0AOq8tQDqvLYA6ry3AOq8uADqvLkA6ry6AOq8uwDqvLwA6ry9AOq8vgDqvL8A6r2AAOq9gQDqvYIA6r2DAOq9hADqvYUA6r2GAOq9hwDqvYgA6r2JAOq9igDqvYsA6r2MAOq9jQDqvY4A6r2PAOq9kADqvZEA6r2SAOq9kwDqvZQA6r2VAOq9lgDqvZcA6r2YAOq9mQDqvZoA6r2bAOq9nADqvZ0A6r2eAOq9nwDqvaAA6r2hAOq9ogDqvaMA6r2kAOq9pQDqvaYA6r2nAOq9qADqvakA6r2qAOq9qwDqvawA6r2tAOq9rgDqva8A6r2wAOq9sQDqvbIA6r2zAOq9tADqvbUA6r22AOq9twDqvbgA6r25AOq9ugDqvbsA6r28AOq9vQDqvb4A6r2/AOq+gADqvoEA6r6CAOq+gwDqvoQA6r6FAOq+hgDqvocA6r6IAOq+iQDqvooA6r6LAOq+jADqvo0A6r6OAOq+jwDqvpAA6r6RAOq+kgDqvpMA6r6UAOq+lQDqvpYA6r6XAOq+mADqvpkA6r6aAOq+mwDqvpwA6r6dAOq+ngDqvp8A6r6gAOq+oQDqvqIA6r6jAOq+pADqvqUA6r6mAOq+pwDqvqgA6r6pAOq+qgDqvqsA6r6sAOq+rQDqvq4A6r6vAOq+sADqvrEA6r6yAOq+swDqvrQA6r61AOq+tgDqvrcA6r64AOq+uQDqvroA6r67AOq+vADqvr0A6r6+AOq+vwDqv4AA6r+BAOq/ggDqv4MA6r+EAOq/hQDqv4YA6r+HAOq/iADqv4kA6r+KAOq/iwDqv4wA6r+NAOq/jgDqv48A6r+QAOq/kQDqv5IA6r+TAOq/lADqv5UA6r+WAOq/lwDqv5gA6r+ZAOq/mgDqv5sA6r+cAOq/nQDqv54A6r+fAOq/oADqv6EA6r+iAOq/owDqv6QA6r+lAOq/pgDqv6cA6r+oAOq/qQDqv6oA6r+rAOq/rADqv60A6r+uAOq/rwDqv7AA6r+xAOq/sgDqv7MA6r+0AOq/tQDqv7YA6r+3AOq/uADqv7kA6r+6AOq/uwDqv7wA6r+9AOq/vgDqv78A64CAAOuAgQDrgIIA64CDAOuAhADrgIUA64CGAOuAhwDrgIgA64CJAOuAigDrgIsA64CMAOuAjQDrgI4A64CPAOuAkADrgJEA64CSAOuAkwDrgJQA64CVAOuAlgDrgJcA64CYAOuAmQDrgJoA64CbAOuAnADrgJ0A64CeAOuAnwDrgKAA64ChAOuAogDrgKMA64CkAOuApQDrgKYA64CnAOuAqADrgKkA64CqAOuAqwDrgKwA64CtAOuArgDrgK8A64CwAOuAsQDrgLIA64CzAOuAtADrgLUA64C2AOuAtwDrgLgA64C5AOuAugDrgLsA64C8AOuAvQDrgL4A64C/AOuBgADrgYEA64GCAOuBgwDrgYQA64GFAOuBhgDrgYcA64GIAOuBiQDrgYoA64GLAOuBjADrgY0A64GOAOuBjwDrgZAA64GRAOuBkgDrgZMA64GUAOuBlQDrgZYA64GXAOuBmADrgZkA64GaAOuBmwDrgZwA64GdAOuBngDrgZ8A64GgAOuBoQDrgaIA64GjAOuBpADrgaUA64GmAOuBpwDrgagA64GpAOuBqgDrgasA64GsAOuBrQDrga4A64GvAOuBsADrgbEA64GyAOuBswDrgbQA64G1AOuBtgDrgbcA64G4AOuBuQDrgboA64G7AOuBvADrgb0A64G+AOuBvwDrgoAA64KBAOuCggDrgoMA64KEAOuChQDrgoYA64KHAOuCiADrgokA64KKAOuCiwDrgowA64KNAOuCjgDrgo8A64KQAOuCkQDrgpIA64KTAOuClADrgpUA64KWAOuClwDrgpgA64KZAOuCmgDrgpsA64KcAOuCnQDrgp4A64KfAOuCoADrgqEA64KiAOuCowDrgqQA64KlAOuCpgDrgqcA64KoAOuCqQDrgqoA64KrAOuCrADrgq0A64KuAOuCrwDrgrAA64KxAOuCsgDrgrMA64K0AOuCtQDrgrYA64K3AOuCuADrgrkA64K6AOuCuwDrgrwA64K9AOuCvgDrgr8A64OAAOuDgQDrg4IA64ODAOuDhADrg4UA64OGAOuDhwDrg4gA64OJAOuDigDrg4sA64OMAOuDjQDrg44A64OPAOuDkADrg5EA64OSAOuDkwDrg5QA64OVAOuDlgDrg5cA64OYAOuDmQDrg5oA64ObAOuDnADrg50A64OeAOuDnwDrg6AA64OhAOuDogDrg6MA64OkAOuDpQDrg6YA64OnAOuDqADrg6kA64OqAOuDqwDrg6wA64OtAOuDrgDrg68A64OwAOuDsQDrg7IA64OzAOuDtADrg7UA64O2AOuDtwDrg7gA64O5AOuDugDrg7sA64O8AOuDvQDrg74A64O/AOuEgADrhIEA64SCAOuEgwDrhIQA64SFAOuEhgDrhIcA64SIAOuEiQDrhIoA64SLAOuEjADrhI0A64SOAOuEjwDrhJAA64SRAOuEkgDrhJMA64SUAOuElQDrhJYA64SXAOuEmADrhJkA64SaAOuEmwDrhJwA64SdAOuEngDrhJ8A64SgAOuEoQDrhKIA64SjAOuEpADrhKUA64SmAOuEpwDrhKgA64SpAOuEqgDrhKsA64SsAOuErQDrhK4A64SvAOuEsADrhLEA64SyAOuEswDrhLQA64S1AOuEtgDrhLcA64S4AOuEuQDrhLoA64S7AOuEvADrhL0A64S+AOuEvwDrhYAA64WBAOuFggDrhYMA64WEAOuFhQDrhYYA64WHAOuFiADrhYkA64WKAOuFiwDrhYwA64WNAOuFjgDrhY8A64WQAOuFkQDrhZIA64WTAOuFlADrhZUA64WWAOuFlwDrhZgA64WZAOuFmgDrhZsA64WcAOuFnQDrhZ4A64WfAOuFoADrhaEA64WiAOuFowDrhaQA64WlAOuFpgDrhacA64WoAOuFqQDrhaoA64WrAOuFrADrha0A64WuAOuFrwDrhbAA64WxAOuFsgDrhbMA64W0AOuFtQDrhbYA64W3AOuFuADrhbkA64W6AOuFuwDrhbwA64W9AOuFvgDrhb8A64aAAOuGgQDrhoIA64aDAOuGhADrhoUA64aGAOuGhwDrhogA64aJAOuGigDrhosA64aMAOuGjQDrho4A64aPAOuGkADrhpEA64aSAOuGkwDrhpQA64aVAOuGlgDrhpcA64aYAOuGmQDrhpoA64abAOuGnADrhp0A64aeAOuGnwDrhqAA64ahAOuGogDrhqMA64akAOuGpQDrhqYA64anAOuGqADrhqkA64aqAOuGqwDrhqwA64atAOuGrgDrhq8A64awAOuGsQDrhrIA64azAOuGtADrhrUA64a2AOuGtwDrhrgA64a5AOuGugDrhrsA64a8AOuGvQDrhr4A64a/AOuHgADrh4EA64eCAOuHgwDrh4QA64eFAOuHhgDrh4cA64eIAOuHiQDrh4oA64eLAOuHjADrh40A64eOAOuHjwDrh5AA64eRAOuHkgDrh5MA64eUAOuHlQDrh5YA64eXAOuHmADrh5kA64eaAOuHmwDrh5wA64edAOuHngDrh58A64egAOuHoQDrh6IA64ejAOuHpADrh6UA64emAOuHpwDrh6gA64epAOuHqgDrh6sA64esAOuHrQDrh64A64evAOuHsADrh7EA64eyAOuHswDrh7QA64e1AOuHtgDrh7cA64e4AOuHuQDrh7oA64e7AOuHvADrh70A64e+AOuHvwDriIAA64iBAOuIggDriIMA64iEAOuIhQDriIYA64iHAOuIiADriIkA64iKAOuIiwDriIwA64iNAOuIjgDriI8A64iQAOuIkQDriJIA64iTAOuIlADriJUA64iWAOuIlwDriJgA64iZAOuImgDriJsA64icAOuInQDriJ4A64ifAOuIoADriKEA64iiAOuIowDriKQA64ilAOuIpgDriKcA64ioAOuIqQDriKoA64irAOuIrADriK0A64iuAOuIrwDriLAA64ixAOuIsgDriLMA64i0AOuItQDriLYA64i3AOuIuADriLkA64i6AOuIuwDriLwA64i9AOuIvgDriL8A64mAAOuJgQDriYIA64mDAOuJhADriYUA64mGAOuJhwDriYgA64mJAOuJigDriYsA64mMAOuJjQDriY4A64mPAOuJkADriZEA64mSAOuJkwDriZQA64mVAOuJlgDriZcA64mYAOuJmQDriZoA64mbAOuJnADriZ0A64meAOuJnwDriaAA64mhAOuJogDriaMA64mkAOuJpQDriaYA64mnAOuJqADriakA64mqAOuJqwDriawA64mtAOuJrgDria8A64mwAOuJsQDribIA64mzAOuJtADribUA64m2AOuJtwDribgA64m5AOuJugDribsA64m8AOuJvQDrib4A64m/AOuKgADrioEA64qCAOuKgwDrioQA64qFAOuKhgDriocA64qIAOuKiQDriooA64qLAOuKjADrio0A64qOAOuKjwDripAA64qRAOuKkgDripMA64qUAOuKlQDripYA64qXAOuKmADripkA64qaAOuKmwDripwA64qdAOuKngDrip8A64qgAOuKoQDriqIA64qjAOuKpADriqUA64qmAOuKpwDriqgA64qpAOuKqgDriqsA64qsAOuKrQDriq4A64qvAOuKsADrirEA64qyAOuKswDrirQA64q1AOuKtgDrircA64q4AOuKuQDriroA64q7AOuKvADrir0A64q+AOuKvwDri4AA64uBAOuLggDri4MA64uEAOuLhQDri4YA64uHAOuLiADri4kA64uKAOuLiwDri4wA64uNAOuLjgDri48A64uQAOuLkQDri5IA64uTAOuLlADri5UA64uWAOuLlwDri5gA64uZAOuLmgDri5sA64ucAOuLnQDri54A64ufAOuLoADri6EA64uiAOuLowDri6QA64ulAOuLpgDri6cA64uoAOuLqQDri6oA64urAOuLrADri60A64uuAOuLrwDri7AA64uxAOuLsgDri7MA64u0AOuLtQDri7YA64u3AOuLuADri7kA64u6AOuLuwDri7wA64u9AOuLvgDri78A64yAAOuMgQDrjIIA64yDAOuMhADrjIUA64yGAOuMhwDrjIgA64yJAOuMigDrjIsA64yMAOuMjQDrjI4A64yPAOuMkADrjJEA64ySAOuMkwDrjJQA64yVAOuMlgDrjJcA64yYAOuMmQDrjJoA64ybAOuMnADrjJ0A64yeAOuMnwDrjKAA64yhAOuMogDrjKMA64ykAOuMpQDrjKYA64ynAOuMqADrjKkA64yqAOuMqwDrjKwA64ytAOuMrgDrjK8A64ywAOuMsQDrjLIA64yzAOuMtADrjLUA64y2AOuMtwDrjLgA64y5AOuMugDrjLsA64y8AOuMvQDrjL4A64y/AOuNgADrjYEA642CAOuNgwDrjYQA642FAOuNhgDrjYcA642IAOuNiQDrjYoA642LAOuNjADrjY0A642OAOuNjwDrjZAA642RAOuNkgDrjZMA642UAOuNlQDrjZYA642XAOuNmADrjZkA642aAOuNmwDrjZwA642dAOuNngDrjZ8A642gAOuNoQDrjaIA642jAOuNpADrjaUA642mAOuNpwDrjagA642pAOuNqgDrjasA642sAOuNrQDrja4A642vAOuNsADrjbEA642yAOuNswDrjbQA6421AOuNtgDrjbcA6424AOuNuQDrjboA6427AOuNvADrjb0A642+AOuNvwDrjoAA646BAOuOggDrjoMA646EAOuOhQDrjoYA646HAOuOiADrjokA646KAOuOiwDrjowA646NAOuOjgDrjo8A646QAOuOkQDrjpIA646TAOuOlADrjpUA646WAOuOlwDrjpgA646ZAOuOmgDrjpsA646cAOuOnQDrjp4A646fAOuOoADrjqEA646iAOuOowDrjqQA646lAOuOpgDrjqcA646oAOuOqQDrjqoA646rAOuOrADrjq0A646uAOuOrwDrjrAA646xAOuOsgDrjrMA6460AOuOtQDrjrYA6463AOuOuADrjrkA6466AOuOuwDrjrwA6469AOuOvgDrjr8A64+AAOuPgQDrj4IA64+DAOuPhADrj4UA64+GAOuPhwDrj4gA64+JAOuPigDrj4sA64+MAOuPjQDrj44A64+PAOuPkADrj5EA64+SAOuPkwDrj5QA64+VAOuPlgDrj5cA64+YAOuPmQDrj5oA64+bAOuPnADrj50A64+eAOuPnwDrj6AA64+hAOuPogDrj6MA64+kAOuPpQDrj6YA64+nAOuPqADrj6kA64+qAOuPqwDrj6wA64+tAOuPrgDrj68A64+wAOuPsQDrj7IA64+zAOuPtADrj7UA64+2AOuPtwDrj7gA64+5AOuPugDrj7sA64+8AOuPvQDrj74A64+/AOuQgADrkIEA65CCAOuQgwDrkIQA65CFAOuQhgDrkIcA65CIAOuQiQDrkIoA65CLAOuQjADrkI0A65COAOuQjwDrkJAA65CRAOuQkgDrkJMA65CUAOuQlQDrkJYA65CXAOuQmADrkJkA65CaAOuQmwDrkJwA65CdAOuQngDrkJ8A65CgAOuQoQDrkKIA65CjAOuQpADrkKUA65CmAOuQpwDrkKgA65CpAOuQqgDrkKsA65CsAOuQrQDrkK4A65CvAOuQsADrkLEA65CyAOuQswDrkLQA65C1AOuQtgDrkLcA65C4AOuQuQDrkLoA65C7AOuQvADrkL0A65C+AOuQvwDrkYAA65GBAOuRggDrkYMA65GEAOuRhQDrkYYA65GHAOuRiADrkYkA65GKAOuRiwDrkYwA65GNAOuRjgDrkY8A65GQAOuRkQDrkZIA65GTAOuRlADrkZUA65GWAOuRlwDrkZgA65GZAOuRmgDrkZsA65GcAOuRnQDrkZ4A65GfAOuRoADrkaEA65GiAOuRowDrkaQA65GlAOuRpgDrkacA65GoAOuRqQDrkaoA65GrAOuRrADrka0A65GuAOuRrwDrkbAA65GxAOuRsgDrkbMA65G0AOuRtQDrkbYA65G3AOuRuADrkbkA65G6AOuRuwDrkbwA65G9AOuRvgDrkb8A65KAAOuSgQDrkoIA65KDAOuShADrkoUA65KGAOuShwDrkogA65KJAOuSigDrkosA65KMAOuSjQDrko4A65KPAOuSkADrkpEA65KSAOuSkwDrkpQA65KVAOuSlgDrkpcA65KYAOuSmQDrkpoA65KbAOuSnADrkp0A65KeAOuSnwDrkqAA65KhAOuSogDrkqMA65KkAOuSpQDrkqYA65KnAOuSqADrkqkA65KqAOuSqwDrkqwA65KtAOuSrgDrkq8A65KwAOuSsQDrkrIA65KzAOuStADrkrUA65K2AOuStwDrkrgA65K5AOuSugDrkrsA65K8AOuSvQDrkr4A65K/AOuTgADrk4EA65OCAOuTgwDrk4QA65OFAOuThgDrk4cA65OIAOuTiQDrk4oA65OLAOuTjADrk40A65OOAOuTjwDrk5AA65ORAOuTkgDrk5MA65OUAOuTlQDrk5YA65OXAOuTmADrk5kA65OaAOuTmwDrk5wA65OdAOuTngDrk58A65OgAOuToQDrk6IA65OjAOuTpADrk6UA65OmAOuTpwDrk6gA65OpAOuTqgDrk6sA65OsAOuTrQDrk64A65OvAOuTsADrk7EA65OyAOuTswDrk7QA65O1AOuTtgDrk7cA65O4AOuTuQDrk7oA65O7AOuTvADrk70A65O+AOuTvwDrlIAA65SBAOuUggDrlIMA65SEAOuUhQDrlIYA65SHAOuUiADrlIkA65SKAOuUiwDrlIwA65SNAOuUjgDrlI8A65SQAOuUkQDrlJIA65STAOuUlADrlJUA65SWAOuUlwDrlJgA65SZAOuUmgDrlJsA65ScAOuUnQDrlJ4A65SfAOuUoADrlKEA65SiAOuUowDrlKQA65SlAOuUpgDrlKcA65SoAOuUqQDrlKoA65SrAOuUrADrlK0A65SuAOuUrwDrlLAA65SxAOuUsgDrlLMA65S0AOuUtQDrlLYA65S3AOuUuADrlLkA65S6AOuUuwDrlLwA65S9AOuUvgDrlL8A65WAAOuVgQDrlYIA65WDAOuVhADrlYUA65WGAOuVhwDrlYgA65WJAOuVigDrlYsA65WMAOuVjQDrlY4A65WPAOuVkADrlZEA65WSAOuVkwDrlZQA65WVAOuVlgDrlZcA65WYAOuVmQDrlZoA65WbAOuVnADrlZ0A65WeAOuVnwDrlaAA65WhAOuVogDrlaMA65WkAOuVpQDrlaYA65WnAOuVqADrlakA65WqAOuVqwDrlawA65WtAOuVrgDrla8A65WwAOuVsQDrlbIA65WzAOuVtADrlbUA65W2AOuVtwDrlbgA65W5AOuVugDrlbsA65W8AOuVvQDrlb4A65W/AOuWgADrloEA65aCAOuWgwDrloQA65aFAOuWhgDrlocA65aIAOuWiQDrlooA65aLAOuWjADrlo0A65aOAOuWjwDrlpAA65aRAOuWkgDrlpMA65aUAOuWlQDrlpYA65aXAOuWmADrlpkA65aaAOuWmwDrlpwA65adAOuWngDrlp8A65agAOuWoQDrlqIA65ajAOuWpADrlqUA65amAOuWpwDrlqgA65apAOuWqgDrlqsA65asAOuWrQDrlq4A65avAOuWsADrlrEA65ayAOuWswDrlrQA65a1AOuWtgDrlrcA65a4AOuWuQDrlroA65a7AOuWvADrlr0A65a+AOuWvwDrl4AA65eBAOuXggDrl4MA65eEAOuXhQDrl4YA65eHAOuXiADrl4kA65eKAOuXiwDrl4wA65eNAOuXjgDrl48A65eQAOuXkQDrl5IA65eTAOuXlADrl5UA65eWAOuXlwDrl5gA65eZAOuXmgDrl5sA65ecAOuXnQDrl54A65efAOuXoADrl6EA65eiAOuXowDrl6QA65elAOuXpgDrl6cA65eoAOuXqQDrl6oA65erAOuXrADrl60A65euAOuXrwDrl7AA65exAOuXsgDrl7MA65e0AOuXtQDrl7YA65e3AOuXuADrl7kA65e6AOuXuwDrl7wA65e9AOuXvgDrl78A65iAAOuYgQDrmIIA65iDAOuYhADrmIUA65iGAOuYhwDrmIgA65iJAOuYigDrmIsA65iMAOuYjQDrmI4A65iPAOuYkADrmJEA65iSAOuYkwDrmJQA65iVAOuYlgDrmJcA65iYAOuYmQDrmJoA65ibAOuYnADrmJ0A65ieAOuYnwDrmKAA65ihAOuYogDrmKMA65ikAOuYpQDrmKYA65inAOuYqADrmKkA65iqAOuYqwDrmKwA65itAOuYrgDrmK8A65iwAOuYsQDrmLIA65izAOuYtADrmLUA65i2AOuYtwDrmLgA65i5AOuYugDrmLsA65i8AOuYvQDrmL4A65i/AOuZgADrmYEA65mCAOuZgwDrmYQA65mFAOuZhgDrmYcA65mIAOuZiQDrmYoA65mLAOuZjADrmY0A65mOAOuZjwDrmZAA65mRAOuZkgDrmZMA65mUAOuZlQDrmZYA65mXAOuZmADrmZkA65maAOuZmwDrmZwA65mdAOuZngDrmZ8A65mgAOuZoQDrmaIA65mjAOuZpADrmaUA65mmAOuZpwDrmagA65mpAOuZqgDrmasA65msAOuZrQDrma4A65mvAOuZsADrmbEA65myAOuZswDrmbQA65m1AOuZtgDrmbcA65m4AOuZuQDrmboA65m7AOuZvADrmb0A65m+AOuZvwDrmoAA65qBAOuaggDrmoMA65qEAOuahQDrmoYA65qHAOuaiADrmokA65qKAOuaiwDrmowA65qNAOuajgDrmo8A65qQAOuakQDrmpIA65qTAOualADrmpUA65qWAOualwDrmpgA65qZAOuamgDrmpsA65qcAOuanQDrmp4A65qfAOuaoADrmqEA65qiAOuaowDrmqQA65qlAOuapgDrmqcA65qoAOuaqQDrmqoA65qrAOuarADrmq0A65quAOuarwDrmrAA65qxAOuasgDrmrMA65q0AOuatQDrmrYA65q3AOuauADrmrkA65q6AOuauwDrmrwA65q9AOuavgDrmr8A65uAAOubgQDrm4IA65uDAOubhADrm4UA65uGAOubhwDrm4gA65uJAOubigDrm4sA65uMAOubjQDrm44A65uPAOubkADrm5EA65uSAOubkwDrm5QA65uVAOublgDrm5cA65uYAOubmQDrm5oA65ubAOubnADrm50A65ueAOubnwDrm6AA65uhAOubogDrm6MA65ukAOubpQDrm6YA65unAOubqADrm6kA65uqAOubqwDrm6wA65utAOubrgDrm68A65uwAOubsQDrm7IA65uzAOubtADrm7UA65u2AOubtwDrm7gA65u5AOubugDrm7sA65u8AOubvQDrm74A65u/AOucgADrnIEA65yCAOucgwDrnIQA65yFAOuchgDrnIcA65yIAOuciQDrnIoA65yLAOucjADrnI0A65yOAOucjwDrnJAA65yRAOuckgDrnJMA65yUAOuclQDrnJYA65yXAOucmADrnJkA65yaAOucmwDrnJwA65ydAOucngDrnJ8A65ygAOucoQDrnKIA65yjAOucpADrnKUA65ymAOucpwDrnKgA65ypAOucqgDrnKsA65ysAOucrQDrnK4A65yvAOucsADrnLEA65yyAOucswDrnLQA65y1AOuctgDrnLcA65y4AOucuQDrnLoA65y7AOucvADrnL0A65y+AOucvwDrnYAA652BAOudggDrnYMA652EAOudhQDrnYYA652HAOudiADrnYkA652KAOudiwDrnYwA652NAOudjgDrnY8A652QAOudkQDrnZIA652TAOudlADrnZUA652WAOudlwDrnZgA652ZAOudmgDrnZsA652cAOudnQDrnZ4A652fAOudoADrnaEA652iAOudowDrnaQA652lAOudpgDrnacA652oAOudqQDrnaoA652rAOudrADrna0A652uAOudrwDrnbAA652xAOudsgDrnbMA6520AOudtQDrnbYA6523AOuduADrnbkA6526AOuduwDrnbwA6529AOudvgDrnb8A656AAOuegQDrnoIA656DAOuehADrnoUA656GAOuehwDrnogA656JAOueigDrnosA656MAOuejQDrno4A656PAOuekADrnpEA656SAOuekwDrnpQA656VAOuelgDrnpcA656YAOuemQDrnpoA656bAOuenADrnp0A656eAOuenwDrnqAA656hAOueogDrnqMA656kAOuepQDrnqYA656nAOueqADrnqkA656qAOueqwDrnqwA656tAOuergDrnq8A656wAOuesQDrnrIA656zAOuetADrnrUA6562AOuetwDrnrgA6565AOueugDrnrsA6568AOuevQDrnr4A656/AOufgADrn4EA65+CAOufgwDrn4QA65+FAOufhgDrn4cA65+IAOufiQDrn4oA65+LAOufjADrn40A65+OAOufjwDrn5AA65+RAOufkgDrn5MA65+UAOuflQDrn5YA65+XAOufmADrn5kA65+aAOufmwDrn5wA65+dAOufngDrn58A65+gAOufoQDrn6IA65+jAOufpADrn6UA65+mAOufpwDrn6gA65+pAOufqgDrn6sA65+sAOufrQDrn64A65+vAOufsADrn7EA65+yAOufswDrn7QA65+1AOuftgDrn7cA65+4AOufuQDrn7oA65+7AOufvADrn70A65++AOufvwDroIAA66CBAOugggDroIMA66CEAOughQDroIYA66CHAOugiADroIkA66CKAOugiwDroIwA66CNAOugjgDroI8A66CQAOugkQDroJIA66CTAOuglADroJUA66CWAOuglwDroJgA66CZAOugmgDroJsA66CcAOugnQDroJ4A66CfAOugoADroKEA66CiAOugowDroKQA66ClAOugpgDroKcA66CoAOugqQDroKoA66CrAOugrADroK0A66CuAOugrwDroLAA66CxAOugsgDroLMA66C0AOugtQDroLYA66C3AOuguADroLkA66C6AOuguwDroLwA66C9AOugvgDroL8A66GAAOuhgQDroYIA66GDAOuhhADroYUA66GGAOuhhwDroYgA66GJAOuhigDroYsA66GMAOuhjQDroY4A66GPAOuhkADroZEA66GSAOuhkwDroZQA66GVAOuhlgDroZcA66GYAOuhmQDroZoA66GbAOuhnADroZ0A66GeAOuhnwDroaAA66GhAOuhogDroaMA66GkAOuhpQDroaYA66GnAOuhqADroakA66GqAOuhqwDroawA66GtAOuhrgDroa8A66GwAOuhsQDrobIA66GzAOuhtADrobUA66G2AOuhtwDrobgA66G5AOuhugDrobsA66G8AOuhvQDrob4A66G/AOuigADrooEA66KCAOuigwDrooQA66KFAOuihgDroocA66KIAOuiiQDroooA66KLAOuijADroo0A66KOAOuijwDropAA66KRAOuikgDropMA66KUAOuilQDropYA66KXAOuimADropkA66KaAOuimwDropwA66KdAOuingDrop8A66KgAOuioQDroqIA66KjAOuipADroqUA66KmAOuipwDroqgA66KpAOuiqgDroqsA66KsAOuirQDroq4A66KvAOuisADrorEA66KyAOuiswDrorQA66K1AOuitgDrorcA66K4AOuiuQDroroA66K7AOuivADror0A66K+AOuivwDro4AA66OBAOujggDro4MA66OEAOujhQDro4YA66OHAOujiADro4kA66OKAOujiwDro4wA66ONAOujjgDro48A66OQAOujkQDro5IA66OTAOujlADro5UA66OWAOujlwDro5gA66OZAOujmgDro5sA66OcAOujnQDro54A66OfAOujoADro6EA66OiAOujowDro6QA66OlAOujpgDro6cA66OoAOujqQDro6oA66OrAOujrADro60A66OuAOujrwDro7AA66OxAOujsgDro7MA66O0AOujtQDro7YA66O3AOujuADro7kA66O6AOujuwDro7wA66O9AOujvgDro78A66SAAOukgQDrpIIA66SDAOukhADrpIUA66SGAOukhwDrpIgA66SJAOukigDrpIsA66SMAOukjQDrpI4A66SPAOukkADrpJEA66SSAOukkwDrpJQA66SVAOuklgDrpJcA66SYAOukmQDrpJoA66SbAOuknADrpJ0A66SeAOuknwDrpKAA66ShAOukogDrpKMA66SkAOukpQDrpKYA66SnAOukqADrpKkA66SqAOukqwDrpKwA66StAOukrgDrpK8A66SwAOuksQDrpLIA66SzAOuktADrpLUA66S2AOuktwDrpLgA66S5AOukugDrpLsA66S8AOukvQDrpL4A66S/AOulgADrpYEA66WCAOulgwDrpYQA66WFAOulhgDrpYcA66WIAOuliQDrpYoA66WLAOuljADrpY0A66WOAOuljwDrpZAA66WRAOulkgDrpZMA66WUAOullQDrpZYA66WXAOulmADrpZkA66WaAOulmwDrpZwA66WdAOulngDrpZ8A66WgAOuloQDrpaIA66WjAOulpADrpaUA66WmAOulpwDrpagA66WpAOulqgDrpasA66WsAOulrQDrpa4A66WvAOulsADrpbEA66WyAOulswDrpbQA66W1AOultgDrpbcA66W4AOuluQDrpboA66W7AOulvADrpb0A66W+AOulvwDrpoAA66aBAOumggDrpoMA66aEAOumhQDrpoYA66aHAOumiADrpokA66aKAOumiwDrpowA66aNAOumjgDrpo8A66aQAOumkQDrppIA66aTAOumlADrppUA66aWAOumlwDrppgA66aZAOummgDrppsA66acAOumnQDrpp4A66afAOumoADrpqEA66aiAOumowDrpqQA66alAOumpgDrpqcA66aoAOumqQDrpqoA66arAOumrADrpq0A66auAOumrwDrprAA66axAOumsgDrprMA66a0AOumtQDrprYA66a3AOumuADrprkA66a6AOumuwDrprwA66a9AOumvgDrpr8A66eAAOungQDrp4IA66eDAOunhADrp4UA66eGAOunhwDrp4gA66eJAOunigDrp4sA66eMAOunjQDrp44A66ePAOunkADrp5EA66eSAOunkwDrp5QA66eVAOunlgDrp5cA66eYAOunmQDrp5oA66ebAOunnADrp50A66eeAOunnwDrp6AA66ehAOunogDrp6MA66ekAOunpQDrp6YA66enAOunqADrp6kA66eqAOunqwDrp6wA66etAOunrgDrp68A66ewAOunsQDrp7IA66ezAOuntADrp7UA66e2AOuntwDrp7gA66e5AOunugDrp7sA66e8AOunvQDrp74A66e/AOuogADrqIEA66iCAOuogwDrqIQA66iFAOuohgDrqIcA66iIAOuoiQDrqIoA66iLAOuojADrqI0A66iOAOuojwDrqJAA66iRAOuokgDrqJMA66iUAOuolQDrqJYA66iXAOuomADrqJkA66iaAOuomwDrqJwA66idAOuongDrqJ8A66igAOuooQDrqKIA66ijAOuopADrqKUA66imAOuopwDrqKgA66ipAOuoqgDrqKsA66isAOuorQDrqK4A66ivAOuosADrqLEA66iyAOuoswDrqLQA66i1AOuotgDrqLcA66i4AOuouQDrqLoA66i7AOuovADrqL0A66i+AOuovwDrqYAA66mBAOupggDrqYMA66mEAOuphQDrqYYA66mHAOupiADrqYkA66mKAOupiwDrqYwA66mNAOupjgDrqY8A66mQAOupkQDrqZIA66mTAOuplADrqZUA66mWAOuplwDrqZgA66mZAOupmgDrqZsA66mcAOupnQDrqZ4A66mfAOupoADrqaEA66miAOupowDrqaQA66mlAOuppgDrqacA66moAOupqQDrqaoA66mrAOuprADrqa0A66muAOuprwDrqbAA66mxAOupsgDrqbMA66m0AOuptQDrqbYA66m3AOupuADrqbkA66m6AOupuwDrqbwA66m9AOupvgDrqb8A66qAAOuqgQDrqoIA66qDAOuqhADrqoUA66qGAOuqhwDrqogA66qJAOuqigDrqosA66qMAOuqjQDrqo4A66qPAOuqkADrqpEA66qSAOuqkwDrqpQA66qVAOuqlgDrqpcA66qYAOuqmQDrqpoA66qbAOuqnADrqp0A66qeAOuqnwDrqqAA66qhAOuqogDrqqMA66qkAOuqpQDrqqYA66qnAOuqqADrqqkA66qqAOuqqwDrqqwA66qtAOuqrgDrqq8A66qwAOuqsQDrqrIA66qzAOuqtADrqrUA66q2AOuqtwDrqrgA66q5AOuqugDrqrsA66q8AOuqvQDrqr4A66q/AOurgADrq4EA66uCAOurgwDrq4QA66uFAOurhgDrq4cA66uIAOuriQDrq4oA66uLAOurjADrq40A66uOAOurjwDrq5AA66uRAOurkgDrq5MA66uUAOurlQDrq5YA66uXAOurmADrq5kA66uaAOurmwDrq5wA66udAOurngDrq58A66ugAOuroQDrq6IA66ujAOurpADrq6UA66umAOurpwDrq6gA66upAOurqgDrq6sA66usAOurrQDrq64A66uvAOursADrq7EA66uyAOurswDrq7QA66u1AOurtgDrq7cA66u4AOuruQDrq7oA66u7AOurvADrq70A66u+AOurvwDrrIAA66yBAOusggDrrIMA66yEAOushQDrrIYA66yHAOusiADrrIkA66yKAOusiwDrrIwA66yNAOusjgDrrI8A66yQAOuskQDrrJIA66yTAOuslADrrJUA66yWAOuslwDrrJgA66yZAOusmgDrrJsA66ycAOusnQDrrJ4A66yfAOusoADrrKEA66yiAOusowDrrKQA66ylAOuspgDrrKcA66yoAOusqQDrrKoA66yrAOusrADrrK0A66yuAOusrwDrrLAA66yxAOussgDrrLMA66y0AOustQDrrLYA66y3AOusuADrrLkA66y6AOusuwDrrLwA66y9AOusvgDrrL8A662AAOutgQDrrYIA662DAOuthADrrYUA662GAOuthwDrrYgA662JAOutigDrrYsA662MAOutjQDrrY4A662PAOutkADrrZEA662SAOutkwDrrZQA662VAOutlgDrrZcA662YAOutmQDrrZoA662bAOutnADrrZ0A662eAOutnwDrraAA662hAOutogDrraMA662kAOutpQDrraYA662nAOutqADrrakA662qAOutqwDrrawA662tAOutrgDrra8A662wAOutsQDrrbIA662zAOuttADrrbUA6622AOuttwDrrbgA6625AOutugDrrbsA6628AOutvQDrrb4A662/AOuugADrroEA666CAOuugwDrroQA666FAOuuhgDrrocA666IAOuuiQDrrooA666LAOuujADrro0A666OAOuujwDrrpAA666RAOuukgDrrpMA666UAOuulQDrrpYA666XAOuumADrrpkA666aAOuumwDrrpwA666dAOuungDrrp8A666gAOuuoQDrrqIA666jAOuupADrrqUA666mAOuupwDrrqgA666pAOuuqgDrrqsA666sAOuurQDrrq4A666vAOuusADrrrEA666yAOuuswDrrrQA6661AOuutgDrrrcA6664AOuuuQDrrroA6667AOuuvADrrr0A666+AOuuvwDrr4AA66+BAOuvggDrr4MA66+EAOuvhQDrr4YA66+HAOuviADrr4kA66+KAOuviwDrr4wA66+NAOuvjgDrr48A66+QAOuvkQDrr5IA66+TAOuvlADrr5UA66+WAOuvlwDrr5gA66+ZAOuvmgDrr5sA66+cAOuvnQDrr54A66+fAOuvoADrr6EA66+iAOuvowDrr6QA66+lAOuvpgDrr6cA66+oAOuvqQDrr6oA66+rAOuvrADrr60A66+uAOuvrwDrr7AA66+xAOuvsgDrr7MA66+0AOuvtQDrr7YA66+3AOuvuADrr7kA66+6AOuvuwDrr7wA66+9AOuvvgDrr78A67CAAOuwgQDrsIIA67CDAOuwhADrsIUA67CGAOuwhwDrsIgA67CJAOuwigDrsIsA67CMAOuwjQDrsI4A67CPAOuwkADrsJEA67CSAOuwkwDrsJQA67CVAOuwlgDrsJcA67CYAOuwmQDrsJoA67CbAOuwnADrsJ0A67CeAOuwnwDrsKAA67ChAOuwogDrsKMA67CkAOuwpQDrsKYA67CnAOuwqADrsKkA67CqAOuwqwDrsKwA67CtAOuwrgDrsK8A67CwAOuwsQDrsLIA67CzAOuwtADrsLUA67C2AOuwtwDrsLgA67C5AOuwugDrsLsA67C8AOuwvQDrsL4A67C/AOuxgADrsYEA67GCAOuxgwDrsYQA67GFAOuxhgDrsYcA67GIAOuxiQDrsYoA67GLAOuxjADrsY0A67GOAOuxjwDrsZAA67GRAOuxkgDrsZMA67GUAOuxlQDrsZYA67GXAOuxmADrsZkA67GaAOuxmwDrsZwA67GdAOuxngDrsZ8A67GgAOuxoQDrsaIA67GjAOuxpADrsaUA67GmAOuxpwDrsagA67GpAOuxqgDrsasA67GsAOuxrQDrsa4A67GvAOuxsADrsbEA67GyAOuxswDrsbQA67G1AOuxtgDrsbcA67G4AOuxuQDrsboA67G7AOuxvADrsb0A67G+AOuxvwDrsoAA67KBAOuyggDrsoMA67KEAOuyhQDrsoYA67KHAOuyiADrsokA67KKAOuyiwDrsowA67KNAOuyjgDrso8A67KQAOuykQDrspIA67KTAOuylADrspUA67KWAOuylwDrspgA67KZAOuymgDrspsA67KcAOuynQDrsp4A67KfAOuyoADrsqEA67KiAOuyowDrsqQA67KlAOuypgDrsqcA67KoAOuyqQDrsqoA67KrAOuyrADrsq0A67KuAOuyrwDrsrAA67KxAOuysgDrsrMA67K0AOuytQDrsrYA67K3AOuyuADrsrkA67K6AOuyuwDrsrwA67K9AOuyvgDrsr8A67OAAOuzgQDrs4IA67ODAOuzhADrs4UA67OGAOuzhwDrs4gA67OJAOuzigDrs4sA67OMAOuzjQDrs44A67OPAOuzkADrs5EA67OSAOuzkwDrs5QA67OVAOuzlgDrs5cA67OYAOuzmQDrs5oA67ObAOuznADrs50A67OeAOuznwDrs6AA67OhAOuzogDrs6MA67OkAOuzpQDrs6YA67OnAOuzqADrs6kA67OqAOuzqwDrs6wA67OtAOuzrgDrs68A67OwAOuzsQDrs7IA67OzAOuztADrs7UA67O2AOuztwDrs7gA67O5AOuzugDrs7sA67O8AOuzvQDrs74A67O/AOu0gADrtIEA67SCAOu0gwDrtIQA67SFAOu0hgDrtIcA67SIAOu0iQDrtIoA67SLAOu0jADrtI0A67SOAOu0jwDrtJAA67SRAOu0kgDrtJMA67SUAOu0lQDrtJYA67SXAOu0mADrtJkA67SaAOu0mwDrtJwA67SdAOu0ngDrtJ8A67SgAOu0oQDrtKIA67SjAOu0pADrtKUA67SmAOu0pwDrtKgA67SpAOu0qgDrtKsA67SsAOu0rQDrtK4A67SvAOu0sADrtLEA67SyAOu0swDrtLQA67S1AOu0tgDrtLcA67S4AOu0uQDrtLoA67S7AOu0vADrtL0A67S+AOu0vwDrtYAA67WBAOu1ggDrtYMA67WEAOu1hQDrtYYA67WHAOu1iADrtYkA67WKAOu1iwDrtYwA67WNAOu1jgDrtY8A67WQAOu1kQDrtZIA67WTAOu1lADrtZUA67WWAOu1lwDrtZgA67WZAOu1mgDrtZsA67WcAOu1nQDrtZ4A67WfAOu1oADrtaEA67WiAOu1owDrtaQA67WlAOu1pgDrtacA67WoAOu1qQDrtaoA67WrAOu1rADrta0A67WuAOu1rwDrtbAA67WxAOu1sgDrtbMA67W0AOu1tQDrtbYA67W3AOu1uADrtbkA67W6AOu1uwDrtbwA67W9AOu1vgDrtb8A67aAAOu2gQDrtoIA67aDAOu2hADrtoUA67aGAOu2hwDrtogA67aJAOu2igDrtosA67aMAOu2jQDrto4A67aPAOu2kADrtpEA67aSAOu2kwDrtpQA67aVAOu2lgDrtpcA67aYAOu2mQDrtpoA67abAOu2nADrtp0A67aeAOu2nwDrtqAA67ahAOu2ogDrtqMA67akAOu2pQDrtqYA67anAOu2qADrtqkA67aqAOu2qwDrtqwA67atAOu2rgDrtq8A67awAOu2sQDrtrIA67azAOu2tADrtrUA67a2AOu2twDrtrgA67a5AOu2ugDrtrsA67a8AOu2vQDrtr4A67a/AOu3gADrt4EA67eCAOu3gwDrt4QA67eFAOu3hgDrt4cA67eIAOu3iQDrt4oA67eLAOu3jADrt40A67eOAOu3jwDrt5AA67eRAOu3kgDrt5MA67eUAOu3lQDrt5YA67eXAOu3mADrt5kA67eaAOu3mwDrt5wA67edAOu3ngDrt58A67egAOu3oQDrt6IA67ejAOu3pADrt6UA67emAOu3pwDrt6gA67epAOu3qgDrt6sA67esAOu3rQDrt64A67evAOu3sADrt7EA67eyAOu3swDrt7QA67e1AOu3tgDrt7cA67e4AOu3uQDrt7oA67e7AOu3vADrt70A67e+AOu3vwDruIAA67iBAOu4ggDruIMA67iEAOu4hQDruIYA67iHAOu4iADruIkA67iKAOu4iwDruIwA67iNAOu4jgDruI8A67iQAOu4kQDruJIA67iTAOu4lADruJUA67iWAOu4lwDruJgA67iZAOu4mgDruJsA67icAOu4nQDruJ4A67ifAOu4oADruKEA67iiAOu4owDruKQA67ilAOu4pgDruKcA67ioAOu4qQDruKoA67irAOu4rADruK0A67iuAOu4rwDruLAA67ixAOu4sgDruLMA67i0AOu4tQDruLYA67i3AOu4uADruLkA67i6AOu4uwDruLwA67i9AOu4vgDruL8A67mAAOu5gQDruYIA67mDAOu5hADruYUA67mGAOu5hwDruYgA67mJAOu5igDruYsA67mMAOu5jQDruY4A67mPAOu5kADruZEA67mSAOu5kwDruZQA67mVAOu5lgDruZcA67mYAOu5mQDruZoA67mbAOu5nADruZ0A67meAOu5nwDruaAA67mhAOu5ogDruaMA67mkAOu5pQDruaYA67mnAOu5qADruakA67mqAOu5qwDruawA67mtAOu5rgDrua8A67mwAOu5sQDrubIA67mzAOu5tADrubUA67m2AOu5twDrubgA67m5AOu5ugDrubsA67m8AOu5vQDrub4A67m/AOu6gADruoEA67qCAOu6gwDruoQA67qFAOu6hgDruocA67qIAOu6iQDruooA67qLAOu6jADruo0A67qOAOu6jwDrupAA67qRAOu6kgDrupMA67qUAOu6lQDrupYA67qXAOu6mADrupkA67qaAOu6mwDrupwA67qdAOu6ngDrup8A67qgAOu6oQDruqIA67qjAOu6pADruqUA67qmAOu6pwDruqgA67qpAOu6qgDruqsA67qsAOu6rQDruq4A67qvAOu6sADrurEA67qyAOu6swDrurQA67q1AOu6tgDrurcA67q4AOu6uQDruroA67q7AOu6vADrur0A67q+AOu6vwDru4AA67uBAOu7ggDru4MA67uEAOu7hQDru4YA67uHAOu7iADru4kA67uKAOu7iwDru4wA67uNAOu7jgDru48A67uQAOu7kQDru5IA67uTAOu7lADru5UA67uWAOu7lwDru5gA67uZAOu7mgDru5sA67ucAOu7nQDru54A67ufAOu7oADru6EA67uiAOu7owDru6QA67ulAOu7pgDru6cA67uoAOu7qQDru6oA67urAOu7rADru60A67uuAOu7rwDru7AA67uxAOu7sgDru7MA67u0AOu7tQDru7YA67u3AOu7uADru7kA67u6AOu7uwDru7wA67u9AOu7vgDru78A67yAAOu8gQDrvIIA67yDAOu8hADrvIUA67yGAOu8hwDrvIgA67yJAOu8igDrvIsA67yMAOu8jQDrvI4A67yPAOu8kADrvJEA67ySAOu8kwDrvJQA67yVAOu8lgDrvJcA67yYAOu8mQDrvJoA67ybAOu8nADrvJ0A67yeAOu8nwDrvKAA67yhAOu8ogDrvKMA67ykAOu8pQDrvKYA67ynAOu8qADrvKkA67yqAOu8qwDrvKwA67ytAOu8rgDrvK8A67ywAOu8sQDrvLIA67yzAOu8tADrvLUA67y2AOu8twDrvLgA67y5AOu8ugDrvLsA67y8AOu8vQDrvL4A67y/AOu9gADrvYEA672CAOu9gwDrvYQA672FAOu9hgDrvYcA672IAOu9iQDrvYoA672LAOu9jADrvY0A672OAOu9jwDrvZAA672RAOu9kgDrvZMA672UAOu9lQDrvZYA672XAOu9mADrvZkA672aAOu9mwDrvZwA672dAOu9ngDrvZ8A672gAOu9oQDrvaIA672jAOu9pADrvaUA672mAOu9pwDrvagA672pAOu9qgDrvasA672sAOu9rQDrva4A672vAOu9sADrvbEA672yAOu9swDrvbQA6721AOu9tgDrvbcA6724AOu9uQDrvboA6727AOu9vADrvb0A672+AOu9vwDrvoAA676BAOu+ggDrvoMA676EAOu+hQDrvoYA676HAOu+iADrvokA676KAOu+iwDrvowA676NAOu+jgDrvo8A676QAOu+kQDrvpIA676TAOu+lADrvpUA676WAOu+lwDrvpgA676ZAOu+mgDrvpsA676cAOu+nQDrvp4A676fAOu+oADrvqEA676iAOu+owDrvqQA676lAOu+pgDrvqcA676oAOu+qQDrvqoA676rAOu+rADrvq0A676uAOu+rwDrvrAA676xAOu+sgDrvrMA6760AOu+tQDrvrYA6763AOu+uADrvrkA6766AOu+uwDrvrwA6769AOu+vgDrvr8A67+AAOu/gQDrv4IA67+DAOu/hADrv4UA67+GAOu/hwDrv4gA67+JAOu/igDrv4sA67+MAOu/jQDrv44A67+PAOu/kADrv5EA67+SAOu/kwDrv5QA67+VAOu/lgDrv5cA67+YAOu/mQDrv5oA67+bAOu/nADrv50A67+eAOu/nwDrv6AA67+hAOu/ogDrv6MA67+kAOu/pQDrv6YA67+nAOu/qADrv6kA67+qAOu/qwDrv6wA67+tAOu/rgDrv68A67+wAOu/sQDrv7IA67+zAOu/tADrv7UA67+2AOu/twDrv7gA67+5AOu/ugDrv7sA67+8AOu/vQDrv74A67+/AOyAgADsgIEA7ICCAOyAgwDsgIQA7ICFAOyAhgDsgIcA7ICIAOyAiQDsgIoA7ICLAOyAjADsgI0A7ICOAOyAjwDsgJAA7ICRAOyAkgDsgJMA7ICUAOyAlQDsgJYA7ICXAOyAmADsgJkA7ICaAOyAmwDsgJwA7ICdAOyAngDsgJ8A7ICgAOyAoQDsgKIA7ICjAOyApADsgKUA7ICmAOyApwDsgKgA7ICpAOyAqgDsgKsA7ICsAOyArQDsgK4A7ICvAOyAsADsgLEA7ICyAOyAswDsgLQA7IC1AOyAtgDsgLcA7IC4AOyAuQDsgLoA7IC7AOyAvADsgL0A7IC+AOyAvwDsgYAA7IGBAOyBggDsgYMA7IGEAOyBhQDsgYYA7IGHAOyBiADsgYkA7IGKAOyBiwDsgYwA7IGNAOyBjgDsgY8A7IGQAOyBkQDsgZIA7IGTAOyBlADsgZUA7IGWAOyBlwDsgZgA7IGZAOyBmgDsgZsA7IGcAOyBnQDsgZ4A7IGfAOyBoADsgaEA7IGiAOyBowDsgaQA7IGlAOyBpgDsgacA7IGoAOyBqQDsgaoA7IGrAOyBrADsga0A7IGuAOyBrwDsgbAA7IGxAOyBsgDsgbMA7IG0AOyBtQDsgbYA7IG3AOyBuADsgbkA7IG6AOyBuwDsgbwA7IG9AOyBvgDsgb8A7IKAAOyCgQDsgoIA7IKDAOyChADsgoUA7IKGAOyChwDsgogA7IKJAOyCigDsgosA7IKMAOyCjQDsgo4A7IKPAOyCkADsgpEA7IKSAOyCkwDsgpQA7IKVAOyClgDsgpcA7IKYAOyCmQDsgpoA7IKbAOyCnADsgp0A7IKeAOyCnwDsgqAA7IKhAOyCogDsgqMA7IKkAOyCpQDsgqYA7IKnAOyCqADsgqkA7IKqAOyCqwDsgqwA7IKtAOyCrgDsgq8A7IKwAOyCsQDsgrIA7IKzAOyCtADsgrUA7IK2AOyCtwDsgrgA7IK5AOyCugDsgrsA7IK8AOyCvQDsgr4A7IK/AOyDgADsg4EA7IOCAOyDgwDsg4QA7IOFAOyDhgDsg4cA7IOIAOyDiQDsg4oA7IOLAOyDjADsg40A7IOOAOyDjwDsg5AA7IORAOyDkgDsg5MA7IOUAOyDlQDsg5YA7IOXAOyDmADsg5kA7IOaAOyDmwDsg5wA7IOdAOyDngDsg58A7IOgAOyDoQDsg6IA7IOjAOyDpADsg6UA7IOmAOyDpwDsg6gA7IOpAOyDqgDsg6sA7IOsAOyDrQDsg64A7IOvAOyDsADsg7EA7IOyAOyDswDsg7QA7IO1AOyDtgDsg7cA7IO4AOyDuQDsg7oA7IO7AOyDvADsg70A7IO+AOyDvwDshIAA7ISBAOyEggDshIMA7ISEAOyEhQDshIYA7ISHAOyEiADshIkA7ISKAOyEiwDshIwA7ISNAOyEjgDshI8A7ISQAOyEkQDshJIA7ISTAOyElADshJUA7ISWAOyElwDshJgA7ISZAOyEmgDshJsA7IScAOyEnQDshJ4A7ISfAOyEoADshKEA7ISiAOyEowDshKQA7ISlAOyEpgDshKcA7ISoAOyEqQDshKoA7ISrAOyErADshK0A7ISuAOyErwDshLAA7ISxAOyEsgDshLMA7IS0AOyEtQDshLYA7IS3AOyEuADshLkA7IS6AOyEuwDshLwA7IS9AOyEvgDshL8A7IWAAOyFgQDshYIA7IWDAOyFhADshYUA7IWGAOyFhwDshYgA7IWJAOyFigDshYsA7IWMAOyFjQDshY4A7IWPAOyFkADshZEA7IWSAOyFkwDshZQA7IWVAOyFlgDshZcA7IWYAOyFmQDshZoA7IWbAOyFnADshZ0A7IWeAOyFnwDshaAA7IWhAOyFogDshaMA7IWkAOyFpQDshaYA7IWnAOyFqADshakA7IWqAOyFqwDshawA7IWtAOyFrgDsha8A7IWwAOyFsQDshbIA7IWzAOyFtADshbUA7IW2AOyFtwDshbgA7IW5AOyFugDshbsA7IW8AOyFvQDshb4A7IW/AOyGgADshoEA7IaCAOyGgwDshoQA7IaFAOyGhgDshocA7IaIAOyGiQDshooA7IaLAOyGjADsho0A7IaOAOyGjwDshpAA7IaRAOyGkgDshpMA7IaUAOyGlQDshpYA7IaXAOyGmADshpkA7IaaAOyGmwDshpwA7IadAOyGngDshp8A7IagAOyGoQDshqIA7IajAOyGpADshqUA7IamAOyGpwDshqgA7IapAOyGqgDshqsA7IasAOyGrQDshq4A7IavAOyGsADshrEA7IayAOyGswDshrQA7Ia1AOyGtgDshrcA7Ia4AOyGuQDshroA7Ia7AOyGvADshr0A7Ia+AOyGvwDsh4AA7IeBAOyHggDsh4MA7IeEAOyHhQDsh4YA7IeHAOyHiADsh4kA7IeKAOyHiwDsh4wA7IeNAOyHjgDsh48A7IeQAOyHkQDsh5IA7IeTAOyHlADsh5UA7IeWAOyHlwDsh5gA7IeZAOyHmgDsh5sA7IecAOyHnQDsh54A7IefAOyHoADsh6EA7IeiAOyHowDsh6QA7IelAOyHpgDsh6cA7IeoAOyHqQDsh6oA7IerAOyHrADsh60A7IeuAOyHrwDsh7AA7IexAOyHsgDsh7MA7Ie0AOyHtQDsh7YA7Ie3AOyHuADsh7kA7Ie6AOyHuwDsh7wA7Ie9AOyHvgDsh78A7IiAAOyIgQDsiIIA7IiDAOyIhADsiIUA7IiGAOyIhwDsiIgA7IiJAOyIigDsiIsA7IiMAOyIjQDsiI4A7IiPAOyIkADsiJEA7IiSAOyIkwDsiJQA7IiVAOyIlgDsiJcA7IiYAOyImQDsiJoA7IibAOyInADsiJ0A7IieAOyInwDsiKAA7IihAOyIogDsiKMA7IikAOyIpQDsiKYA7IinAOyIqADsiKkA7IiqAOyIqwDsiKwA7IitAOyIrgDsiK8A7IiwAOyIsQDsiLIA7IizAOyItADsiLUA7Ii2AOyItwDsiLgA7Ii5AOyIugDsiLsA7Ii8AOyIvQDsiL4A7Ii/AOyJgADsiYEA7ImCAOyJgwDsiYQA7ImFAOyJhgDsiYcA7ImIAOyJiQDsiYoA7ImLAOyJjADsiY0A7ImOAOyJjwDsiZAA7ImRAOyJkgDsiZMA7ImUAOyJlQDsiZYA7ImXAOyJmADsiZkA7ImaAOyJmwDsiZwA7ImdAOyJngDsiZ8A7ImgAOyJoQDsiaIA7ImjAOyJpADsiaUA7ImmAOyJpwDsiagA7ImpAOyJqgDsiasA7ImsAOyJrQDsia4A7ImvAOyJsADsibEA7ImyAOyJswDsibQA7Im1AOyJtgDsibcA7Im4AOyJuQDsiboA7Im7AOyJvADsib0A7Im+AOyJvwDsioAA7IqBAOyKggDsioMA7IqEAOyKhQDsioYA7IqHAOyKiADsiokA7IqKAOyKiwDsiowA7IqNAOyKjgDsio8A7IqQAOyKkQDsipIA7IqTAOyKlADsipUA7IqWAOyKlwDsipgA7IqZAOyKmgDsipsA7IqcAOyKnQDsip4A7IqfAOyKoADsiqEA7IqiAOyKowDsiqQA7IqlAOyKpgDsiqcA7IqoAOyKqQDsiqoA7IqrAOyKrADsiq0A7IquAOyKrwDsirAA7IqxAOyKsgDsirMA7Iq0AOyKtQDsirYA7Iq3AOyKuADsirkA7Iq6AOyKuwDsirwA7Iq9AOyKvgDsir8A7IuAAOyLgQDsi4IA7IuDAOyLhADsi4UA7IuGAOyLhwDsi4gA7IuJAOyLigDsi4sA7IuMAOyLjQDsi44A7IuPAOyLkADsi5EA7IuSAOyLkwDsi5QA7IuVAOyLlgDsi5cA7IuYAOyLmQDsi5oA7IubAOyLnADsi50A7IueAOyLnwDsi6AA7IuhAOyLogDsi6MA7IukAOyLpQDsi6YA7IunAOyLqADsi6kA7IuqAOyLqwDsi6wA7IutAOyLrgDsi68A7IuwAOyLsQDsi7IA7IuzAOyLtADsi7UA7Iu2AOyLtwDsi7gA7Iu5AOyLugDsi7sA7Iu8AOyLvQDsi74A7Iu/AOyMgADsjIEA7IyCAOyMgwDsjIQA7IyFAOyMhgDsjIcA7IyIAOyMiQDsjIoA7IyLAOyMjADsjI0A7IyOAOyMjwDsjJAA7IyRAOyMkgDsjJMA7IyUAOyMlQDsjJYA7IyXAOyMmADsjJkA7IyaAOyMmwDsjJwA7IydAOyMngDsjJ8A7IygAOyMoQDsjKIA7IyjAOyMpADsjKUA7IymAOyMpwDsjKgA7IypAOyMqgDsjKsA7IysAOyMrQDsjK4A7IyvAOyMsADsjLEA7IyyAOyMswDsjLQA7Iy1AOyMtgDsjLcA7Iy4AOyMuQDsjLoA7Iy7AOyMvADsjL0A7Iy+AOyMvwDsjYAA7I2BAOyNggDsjYMA7I2EAOyNhQDsjYYA7I2HAOyNiADsjYkA7I2KAOyNiwDsjYwA7I2NAOyNjgDsjY8A7I2QAOyNkQDsjZIA7I2TAOyNlADsjZUA7I2WAOyNlwDsjZgA7I2ZAOyNmgDsjZsA7I2cAOyNnQDsjZ4A7I2fAOyNoADsjaEA7I2iAOyNowDsjaQA7I2lAOyNpgDsjacA7I2oAOyNqQDsjaoA7I2rAOyNrADsja0A7I2uAOyNrwDsjbAA7I2xAOyNsgDsjbMA7I20AOyNtQDsjbYA7I23AOyNuADsjbkA7I26AOyNuwDsjbwA7I29AOyNvgDsjb8A7I6AAOyOgQDsjoIA7I6DAOyOhADsjoUA7I6GAOyOhwDsjogA7I6JAOyOigDsjosA7I6MAOyOjQDsjo4A7I6PAOyOkADsjpEA7I6SAOyOkwDsjpQA7I6VAOyOlgDsjpcA7I6YAOyOmQDsjpoA7I6bAOyOnADsjp0A7I6eAOyOnwDsjqAA7I6hAOyOogDsjqMA7I6kAOyOpQDsjqYA7I6nAOyOqADsjqkA7I6qAOyOqwDsjqwA7I6tAOyOrgDsjq8A7I6wAOyOsQDsjrIA7I6zAOyOtADsjrUA7I62AOyOtwDsjrgA7I65AOyOugDsjrsA7I68AOyOvQDsjr4A7I6/AOyPgADsj4EA7I+CAOyPgwDsj4QA7I+FAOyPhgDsj4cA7I+IAOyPiQDsj4oA7I+LAOyPjADsj40A7I+OAOyPjwDsj5AA7I+RAOyPkgDsj5MA7I+UAOyPlQDsj5YA7I+XAOyPmADsj5kA7I+aAOyPmwDsj5wA7I+dAOyPngDsj58A7I+gAOyPoQDsj6IA7I+jAOyPpADsj6UA7I+mAOyPpwDsj6gA7I+pAOyPqgDsj6sA7I+sAOyPrQDsj64A7I+vAOyPsADsj7EA7I+yAOyPswDsj7QA7I+1AOyPtgDsj7cA7I+4AOyPuQDsj7oA7I+7AOyPvADsj70A7I++AOyPvwDskIAA7JCBAOyQggDskIMA7JCEAOyQhQDskIYA7JCHAOyQiADskIkA7JCKAOyQiwDskIwA7JCNAOyQjgDskI8A7JCQAOyQkQDskJIA7JCTAOyQlADskJUA7JCWAOyQlwDskJgA7JCZAOyQmgDskJsA7JCcAOyQnQDskJ4A7JCfAOyQoADskKEA7JCiAOyQowDskKQA7JClAOyQpgDskKcA7JCoAOyQqQDskKoA7JCrAOyQrADskK0A7JCuAOyQrwDskLAA7JCxAOyQsgDskLMA7JC0AOyQtQDskLYA7JC3AOyQuADskLkA7JC6AOyQuwDskLwA7JC9AOyQvgDskL8A7JGAAOyRgQDskYIA7JGDAOyRhADskYUA7JGGAOyRhwDskYgA7JGJAOyRigDskYsA7JGMAOyRjQDskY4A7JGPAOyRkADskZEA7JGSAOyRkwDskZQA7JGVAOyRlgDskZcA7JGYAOyRmQDskZoA7JGbAOyRnADskZ0A7JGeAOyRnwDskaAA7JGhAOyRogDskaMA7JGkAOyRpQDskaYA7JGnAOyRqADskakA7JGqAOyRqwDskawA7JGtAOyRrgDska8A7JGwAOyRsQDskbIA7JGzAOyRtADskbUA7JG2AOyRtwDskbgA7JG5AOyRugDskbsA7JG8AOyRvQDskb4A7JG/AOySgADskoEA7JKCAOySgwDskoQA7JKFAOyShgDskocA7JKIAOySiQDskooA7JKLAOySjADsko0A7JKOAOySjwDskpAA7JKRAOySkgDskpMA7JKUAOySlQDskpYA7JKXAOySmADskpkA7JKaAOySmwDskpwA7JKdAOySngDskp8A7JKgAOySoQDskqIA7JKjAOySpADskqUA7JKmAOySpwDskqgA7JKpAOySqgDskqsA7JKsAOySrQDskq4A7JKvAOySsADskrEA7JKyAOySswDskrQA7JK1AOyStgDskrcA7JK4AOySuQDskroA7JK7AOySvADskr0A7JK+AOySvwDsk4AA7JOBAOyTggDsk4MA7JOEAOyThQDsk4YA7JOHAOyTiADsk4kA7JOKAOyTiwDsk4wA7JONAOyTjgDsk48A7JOQAOyTkQDsk5IA7JOTAOyTlADsk5UA7JOWAOyTlwDsk5gA7JOZAOyTmgDsk5sA7JOcAOyTnQDsk54A7JOfAOyToADsk6EA7JOiAOyTowDsk6QA7JOlAOyTpgDsk6cA7JOoAOyTqQDsk6oA7JOrAOyTrADsk60A7JOuAOyTrwDsk7AA7JOxAOyTsgDsk7MA7JO0AOyTtQDsk7YA7JO3AOyTuADsk7kA7JO6AOyTuwDsk7wA7JO9AOyTvgDsk78A7JSAAOyUgQDslIIA7JSDAOyUhADslIUA7JSGAOyUhwDslIgA7JSJAOyUigDslIsA7JSMAOyUjQDslI4A7JSPAOyUkADslJEA7JSSAOyUkwDslJQA7JSVAOyUlgDslJcA7JSYAOyUmQDslJoA7JSbAOyUnADslJ0A7JSeAOyUnwDslKAA7JShAOyUogDslKMA7JSkAOyUpQDslKYA7JSnAOyUqADslKkA7JSqAOyUqwDslKwA7JStAOyUrgDslK8A7JSwAOyUsQDslLIA7JSzAOyUtADslLUA7JS2AOyUtwDslLgA7JS5AOyUugDslLsA7JS8AOyUvQDslL4A7JS/AOyVgADslYEA7JWCAOyVgwDslYQA7JWFAOyVhgDslYcA7JWIAOyViQDslYoA7JWLAOyVjADslY0A7JWOAOyVjwDslZAA7JWRAOyVkgDslZMA7JWUAOyVlQDslZYA7JWXAOyVmADslZkA7JWaAOyVmwDslZwA7JWdAOyVngDslZ8A7JWgAOyVoQDslaIA7JWjAOyVpADslaUA7JWmAOyVpwDslagA7JWpAOyVqgDslasA7JWsAOyVrQDsla4A7JWvAOyVsADslbEA7JWyAOyVswDslbQA7JW1AOyVtgDslbcA7JW4AOyVuQDslboA7JW7AOyVvADslb0A7JW+AOyVvwDsloAA7JaBAOyWggDsloMA7JaEAOyWhQDsloYA7JaHAOyWiADslokA7JaKAOyWiwDslowA7JaNAOyWjgDslo8A7JaQAOyWkQDslpIA7JaTAOyWlADslpUA7JaWAOyWlwDslpgA7JaZAOyWmgDslpsA7JacAOyWnQDslp4A7JafAOyWoADslqEA7JaiAOyWowDslqQA7JalAOyWpgDslqcA7JaoAOyWqQDslqoA7JarAOyWrADslq0A7JauAOyWrwDslrAA7JaxAOyWsgDslrMA7Ja0AOyWtQDslrYA7Ja3AOyWuADslrkA7Ja6AOyWuwDslrwA7Ja9AOyWvgDslr8A7JeAAOyXgQDsl4IA7JeDAOyXhADsl4UA7JeGAOyXhwDsl4gA7JeJAOyXigDsl4sA7JeMAOyXjQDsl44A7JePAOyXkADsl5EA7JeSAOyXkwDsl5QA7JeVAOyXlgDsl5cA7JeYAOyXmQDsl5oA7JebAOyXnADsl50A7JeeAOyXnwDsl6AA7JehAOyXogDsl6MA7JekAOyXpQDsl6YA7JenAOyXqADsl6kA7JeqAOyXqwDsl6wA7JetAOyXrgDsl68A7JewAOyXsQDsl7IA7JezAOyXtADsl7UA7Je2AOyXtwDsl7gA7Je5AOyXugDsl7sA7Je8AOyXvQDsl74A7Je/AOyYgADsmIEA7JiCAOyYgwDsmIQA7JiFAOyYhgDsmIcA7JiIAOyYiQDsmIoA7JiLAOyYjADsmI0A7JiOAOyYjwDsmJAA7JiRAOyYkgDsmJMA7JiUAOyYlQDsmJYA7JiXAOyYmADsmJkA7JiaAOyYmwDsmJwA7JidAOyYngDsmJ8A7JigAOyYoQDsmKIA7JijAOyYpADsmKUA7JimAOyYpwDsmKgA7JipAOyYqgDsmKsA7JisAOyYrQDsmK4A7JivAOyYsADsmLEA7JiyAOyYswDsmLQA7Ji1AOyYtgDsmLcA7Ji4AOyYuQDsmLoA7Ji7AOyYvADsmL0A7Ji+AOyYvwDsmYAA7JmBAOyZggDsmYMA7JmEAOyZhQDsmYYA7JmHAOyZiADsmYkA7JmKAOyZiwDsmYwA7JmNAOyZjgDsmY8A7JmQAOyZkQDsmZIA7JmTAOyZlADsmZUA7JmWAOyZlwDsmZgA7JmZAOyZmgDsmZsA7JmcAOyZnQDsmZ4A7JmfAOyZoADsmaEA7JmiAOyZowDsmaQA7JmlAOyZpgDsmacA7JmoAOyZqQDsmaoA7JmrAOyZrADsma0A7JmuAOyZrwDsmbAA7JmxAOyZsgDsmbMA7Jm0AOyZtQDsmbYA7Jm3AOyZuADsmbkA7Jm6AOyZuwDsmbwA7Jm9AOyZvgDsmb8A7JqAAOyagQDsmoIA7JqDAOyahADsmoUA7JqGAOyahwDsmogA7JqJAOyaigDsmosA7JqMAOyajQDsmo4A7JqPAOyakADsmpEA7JqSAOyakwDsmpQA7JqVAOyalgDsmpcA7JqYAOyamQDsmpoA7JqbAOyanADsmp0A7JqeAOyanwDsmqAA7JqhAOyaogDsmqMA7JqkAOyapQDsmqYA7JqnAOyaqADsmqkA7JqqAOyaqwDsmqwA7JqtAOyargDsmq8A7JqwAOyasQDsmrIA7JqzAOyatADsmrUA7Jq2AOyatwDsmrgA7Jq5AOyaugDsmrsA7Jq8AOyavQDsmr4A7Jq/AOybgADsm4EA7JuCAOybgwDsm4QA7JuFAOybhgDsm4cA7JuIAOybiQDsm4oA7JuLAOybjADsm40A7JuOAOybjwDsm5AA7JuRAOybkgDsm5MA7JuUAOyblQDsm5YA7JuXAOybmADsm5kA7JuaAOybmwDsm5wA7JudAOybngDsm58A7JugAOyboQDsm6IA7JujAOybpADsm6UA7JumAOybpwDsm6gA7JupAOybqgDsm6sA7JusAOybrQDsm64A7JuvAOybsADsm7EA7JuyAOybswDsm7QA7Ju1AOybtgDsm7cA7Ju4AOybuQDsm7oA7Ju7AOybvADsm70A7Ju+AOybvwDsnIAA7JyBAOycggDsnIMA7JyEAOychQDsnIYA7JyHAOyciADsnIkA7JyKAOyciwDsnIwA7JyNAOycjgDsnI8A7JyQAOyckQDsnJIA7JyTAOyclADsnJUA7JyWAOyclwDsnJgA7JyZAOycmgDsnJsA7JycAOycnQDsnJ4A7JyfAOycoADsnKEA7JyiAOycowDsnKQA7JylAOycpgDsnKcA7JyoAOycqQDsnKoA7JyrAOycrADsnK0A7JyuAOycrwDsnLAA7JyxAOycsgDsnLMA7Jy0AOyctQDsnLYA7Jy3AOycuADsnLkA7Jy6AOycuwDsnLwA7Jy9AOycvgDsnL8A7J2AAOydgQDsnYIA7J2DAOydhADsnYUA7J2GAOydhwDsnYgA7J2JAOydigDsnYsA7J2MAOydjQDsnY4A7J2PAOydkADsnZEA7J2SAOydkwDsnZQA7J2VAOydlgDsnZcA7J2YAOydmQDsnZoA7J2bAOydnADsnZ0A7J2eAOydnwDsnaAA7J2hAOydogDsnaMA7J2kAOydpQDsnaYA7J2nAOydqADsnakA7J2qAOydqwDsnawA7J2tAOydrgDsna8A7J2wAOydsQDsnbIA7J2zAOydtADsnbUA7J22AOydtwDsnbgA7J25AOydugDsnbsA7J28AOydvQDsnb4A7J2/AOyegADsnoEA7J6CAOyegwDsnoQA7J6FAOyehgDsnocA7J6IAOyeiQDsnooA7J6LAOyejADsno0A7J6OAOyejwDsnpAA7J6RAOyekgDsnpMA7J6UAOyelQDsnpYA7J6XAOyemADsnpkA7J6aAOyemwDsnpwA7J6dAOyengDsnp8A7J6gAOyeoQDsnqIA7J6jAOyepADsnqUA7J6mAOyepwDsnqgA7J6pAOyeqgDsnqsA7J6sAOyerQDsnq4A7J6vAOyesADsnrEA7J6yAOyeswDsnrQA7J61AOyetgDsnrcA7J64AOyeuQDsnroA7J67AOyevADsnr0A7J6+AOyevwDsn4AA7J+BAOyfggDsn4MA7J+EAOyfhQDsn4YA7J+HAOyfiADsn4kA7J+KAOyfiwDsn4wA7J+NAOyfjgDsn48A7J+QAOyfkQDsn5IA7J+TAOyflADsn5UA7J+WAOyflwDsn5gA7J+ZAOyfmgDsn5sA7J+cAOyfnQDsn54A7J+fAOyfoADsn6EA7J+iAOyfowDsn6QA7J+lAOyfpgDsn6cA7J+oAOyfqQDsn6oA7J+rAOyfrADsn60A7J+uAOyfrwDsn7AA7J+xAOyfsgDsn7MA7J+0AOyftQDsn7YA7J+3AOyfuADsn7kA7J+6AOyfuwDsn7wA7J+9AOyfvgDsn78A7KCAAOyggQDsoIIA7KCDAOyghADsoIUA7KCGAOyghwDsoIgA7KCJAOygigDsoIsA7KCMAOygjQDsoI4A7KCPAOygkADsoJEA7KCSAOygkwDsoJQA7KCVAOyglgDsoJcA7KCYAOygmQDsoJoA7KCbAOygnADsoJ0A7KCeAOygnwDsoKAA7KChAOygogDsoKMA7KCkAOygpQDsoKYA7KCnAOygqADsoKkA7KCqAOygqwDsoKwA7KCtAOygrgDsoK8A7KCwAOygsQDsoLIA7KCzAOygtADsoLUA7KC2AOygtwDsoLgA7KC5AOygugDsoLsA7KC8AOygvQDsoL4A7KC/AOyhgADsoYEA7KGCAOyhgwDsoYQA7KGFAOyhhgDsoYcA7KGIAOyhiQDsoYoA7KGLAOyhjADsoY0A7KGOAOyhjwDsoZAA7KGRAOyhkgDsoZMA7KGUAOyhlQDsoZYA7KGXAOyhmADsoZkA7KGaAOyhmwDsoZwA7KGdAOyhngDsoZ8A7KGgAOyhoQDsoaIA7KGjAOyhpADsoaUA7KGmAOyhpwDsoagA7KGpAOyhqgDsoasA7KGsAOyhrQDsoa4A7KGvAOyhsADsobEA7KGyAOyhswDsobQA7KG1AOyhtgDsobcA7KG4AOyhuQDsoboA7KG7AOyhvADsob0A7KG+AOyhvwDsooAA7KKBAOyiggDsooMA7KKEAOyihQDsooYA7KKHAOyiiADsookA7KKKAOyiiwDsoowA7KKNAOyijgDsoo8A7KKQAOyikQDsopIA7KKTAOyilADsopUA7KKWAOyilwDsopgA7KKZAOyimgDsopsA7KKcAOyinQDsop4A7KKfAOyioADsoqEA7KKiAOyiowDsoqQA7KKlAOyipgDsoqcA7KKoAOyiqQDsoqoA7KKrAOyirADsoq0A7KKuAOyirwDsorAA7KKxAOyisgDsorMA7KK0AOyitQDsorYA7KK3AOyiuADsorkA7KK6AOyiuwDsorwA7KK9AOyivgDsor8A7KOAAOyjgQDso4IA7KODAOyjhADso4UA7KOGAOyjhwDso4gA7KOJAOyjigDso4sA7KOMAOyjjQDso44A7KOPAOyjkADso5EA7KOSAOyjkwDso5QA7KOVAOyjlgDso5cA7KOYAOyjmQDso5oA7KObAOyjnADso50A7KOeAOyjnwDso6AA7KOhAOyjogDso6MA7KOkAOyjpQDso6YA7KOnAOyjqADso6kA7KOqAOyjqwDso6wA7KOtAOyjrgDso68A7KOwAOyjsQDso7IA7KOzAOyjtADso7UA7KO2AOyjtwDso7gA7KO5AOyjugDso7sA7KO8AOyjvOydmADso70A7KO+AOyjvwDspIAA7KSBAOykggDspIMA7KSEAOykhQDspIYA7KSHAOykiADspIkA7KSKAOykiwDspIwA7KSNAOykjgDspI8A7KSQAOykkQDspJIA7KSTAOyklADspJUA7KSWAOyklwDspJgA7KSZAOykmgDspJsA7KScAOyknQDspJ4A7KSfAOykoADspKEA7KSiAOykowDspKQA7KSlAOykpgDspKcA7KSoAOykqQDspKoA7KSrAOykrADspK0A7KSuAOykrwDspLAA7KSxAOyksgDspLMA7KS0AOyktQDspLYA7KS3AOykuADspLkA7KS6AOykuwDspLwA7KS9AOykvgDspL8A7KWAAOylgQDspYIA7KWDAOylhADspYUA7KWGAOylhwDspYgA7KWJAOyligDspYsA7KWMAOyljQDspY4A7KWPAOylkADspZEA7KWSAOylkwDspZQA7KWVAOyllgDspZcA7KWYAOylmQDspZoA7KWbAOylnADspZ0A7KWeAOylnwDspaAA7KWhAOylogDspaMA7KWkAOylpQDspaYA7KWnAOylqADspakA7KWqAOylqwDspawA7KWtAOylrgDspa8A7KWwAOylsQDspbIA7KWzAOyltADspbUA7KW2AOyltwDspbgA7KW5AOylugDspbsA7KW8AOylvQDspb4A7KW/AOymgADspoEA7KaCAOymgwDspoQA7KaFAOymhgDspocA7KaIAOymiQDspooA7KaLAOymjADspo0A7KaOAOymjwDsppAA7KaRAOymkgDsppMA7KaUAOymlQDsppYA7KaXAOymmADsppkA7KaaAOymmwDsppwA7KadAOymngDspp8A7KagAOymoQDspqIA7KajAOympADspqUA7KamAOympwDspqgA7KapAOymqgDspqsA7KasAOymrQDspq4A7KavAOymsADsprEA7KayAOymswDsprQA7Ka1AOymtgDsprcA7Ka4AOymuQDsproA7Ka7AOymvADspr0A7Ka+AOymvwDsp4AA7KeBAOynggDsp4MA7KeEAOynhQDsp4YA7KeHAOyniADsp4kA7KeKAOyniwDsp4wA7KeNAOynjgDsp48A7KeQAOynkQDsp5IA7KeTAOynlADsp5UA7KeWAOynlwDsp5gA7KeZAOynmgDsp5sA7KecAOynnQDsp54A7KefAOynoADsp6EA7KeiAOynowDsp6QA7KelAOynpgDsp6cA7KeoAOynqQDsp6oA7KerAOynrADsp60A7KeuAOynrwDsp7AA7KexAOynsgDsp7MA7Ke0AOyntQDsp7YA7Ke3AOynuADsp7kA7Ke6AOynuwDsp7wA7Ke9AOynvgDsp78A7KiAAOyogQDsqIIA7KiDAOyohADsqIUA7KiGAOyohwDsqIgA7KiJAOyoigDsqIsA7KiMAOyojQDsqI4A7KiPAOyokADsqJEA7KiSAOyokwDsqJQA7KiVAOyolgDsqJcA7KiYAOyomQDsqJoA7KibAOyonADsqJ0A7KieAOyonwDsqKAA7KihAOyoogDsqKMA7KikAOyopQDsqKYA7KinAOyoqADsqKkA7KiqAOyoqwDsqKwA7KitAOyorgDsqK8A7KiwAOyosQDsqLIA7KizAOyotADsqLUA7Ki2AOyotwDsqLgA7Ki5AOyougDsqLsA7Ki8AOyovQDsqL4A7Ki/AOypgADsqYEA7KmCAOypgwDsqYQA7KmFAOyphgDsqYcA7KmIAOypiQDsqYoA7KmLAOypjADsqY0A7KmOAOypjwDsqZAA7KmRAOypkgDsqZMA7KmUAOyplQDsqZYA7KmXAOypmADsqZkA7KmaAOypmwDsqZwA7KmdAOypngDsqZ8A7KmgAOypoQDsqaIA7KmjAOyppADsqaUA7KmmAOyppwDsqagA7KmpAOypqgDsqasA7KmsAOyprQDsqa4A7KmvAOypsADsqbEA7KmyAOypswDsqbQA7Km1AOyptgDsqbcA7Km4AOypuQDsqboA7Km7AOypvADsqb0A7Km+AOypvwDsqoAA7KqBAOyqggDsqoMA7KqEAOyqhQDsqoYA7KqHAOyqiADsqokA7KqKAOyqiwDsqowA7KqNAOyqjgDsqo8A7KqQAOyqkQDsqpIA7KqTAOyqlADsqpUA7KqWAOyqlwDsqpgA7KqZAOyqmgDsqpsA7KqcAOyqnQDsqp4A7KqfAOyqoADsqqEA7KqiAOyqowDsqqQA7KqlAOyqpgDsqqcA7KqoAOyqqQDsqqoA7KqrAOyqrADsqq0A7KquAOyqrwDsqrAA7KqxAOyqsgDsqrMA7Kq0AOyqtQDsqrYA7Kq3AOyquADsqrkA7Kq6AOyquwDsqrwA7Kq9AOyqvgDsqr8A7KuAAOyrgQDsq4IA7KuDAOyrhADsq4UA7KuGAOyrhwDsq4gA7KuJAOyrigDsq4sA7KuMAOyrjQDsq44A7KuPAOyrkADsq5EA7KuSAOyrkwDsq5QA7KuVAOyrlgDsq5cA7KuYAOyrmQDsq5oA7KubAOyrnADsq50A7KueAOyrnwDsq6AA7KuhAOyrogDsq6MA7KukAOyrpQDsq6YA7KunAOyrqADsq6kA7KuqAOyrqwDsq6wA7KutAOyrrgDsq68A7KuwAOyrsQDsq7IA7KuzAOyrtADsq7UA7Ku2AOyrtwDsq7gA7Ku5AOyrugDsq7sA7Ku8AOyrvQDsq74A7Ku/AOysgADsrIEA7KyCAOysgwDsrIQA7KyFAOyshgDsrIcA7KyIAOysiQDsrIoA7KyLAOysjADsrI0A7KyOAOysjwDsrJAA7KyRAOyskgDsrJMA7KyUAOyslQDsrJYA7KyXAOysmADsrJkA7KyaAOysmwDsrJwA7KydAOysngDsrJ8A7KygAOysoQDsrKIA7KyjAOyspADsrKUA7KymAOyspwDsrKgA7KypAOysqgDsrKsA7KysAOysrQDsrK4A7KyvAOyssADsrLEA7KyyAOysswDsrLQA7Ky1AOystgDsrLcA7Ky4AOysuQDsrLoA7Ky7AOysvADsrL0A7Ky+AOysvwDsrYAA7K2BAOytggDsrYMA7K2EAOythQDsrYYA7K2HAOytiADsrYkA7K2KAOytiwDsrYwA7K2NAOytjgDsrY8A7K2QAOytkQDsrZIA7K2TAOytlADsrZUA7K2WAOytlwDsrZgA7K2ZAOytmgDsrZsA7K2cAOytnQDsrZ4A7K2fAOytoADsraEA7K2iAOytowDsraQA7K2lAOytpgDsracA7K2oAOytqQDsraoA7K2rAOytrADsra0A7K2uAOytrwDsrbAA7K2xAOytsgDsrbMA7K20AOyttQDsrbYA7K23AOytuADsrbkA7K26AOytuwDsrbwA7K29AOytvgDsrb8A7K6AAOyugQDsroIA7K6DAOyuhADsroUA7K6GAOyuhwDsrogA7K6JAOyuigDsrosA7K6MAOyujQDsro4A7K6PAOyukADsrpEA7K6SAOyukwDsrpQA7K6VAOyulgDsrpcA7K6YAOyumQDsrpoA7K6bAOyunADsrp0A7K6eAOyunwDsrqAA7K6hAOyuogDsrqMA7K6kAOyupQDsrqYA7K6nAOyuqADsrqkA7K6qAOyuqwDsrqwA7K6tAOyurgDsrq8A7K6wAOyusQDsrrIA7K6zAOyutADsrrUA7K62AOyutwDsrrgA7K65AOyuugDsrrsA7K68AOyuvQDsrr4A7K6/AOyvgADsr4EA7K+CAOyvgwDsr4QA7K+FAOyvhgDsr4cA7K+IAOyviQDsr4oA7K+LAOyvjADsr40A7K+OAOyvjwDsr5AA7K+RAOyvkgDsr5MA7K+UAOyvlQDsr5YA7K+XAOyvmADsr5kA7K+aAOyvmwDsr5wA7K+dAOyvngDsr58A7K+gAOyvoQDsr6IA7K+jAOyvpADsr6UA7K+mAOyvpwDsr6gA7K+pAOyvqgDsr6sA7K+sAOyvrQDsr64A7K+vAOyvsADsr7EA7K+yAOyvswDsr7QA7K+1AOyvtgDsr7cA7K+4AOyvuQDsr7oA7K+7AOyvvADsr70A7K++AOyvvwDssIAA7LCBAOywggDssIMA7LCEAOywhQDssIYA7LCHAOywiADssIkA7LCKAOywiwDssIwA7LCNAOywjgDssI8A7LCQAOywkQDssJIA7LCTAOywlADssJUA7LCWAOywlwDssJgA7LCZAOywmgDssJsA7LCcAOywnQDssJ4A7LCfAOywoADssKEA7LCiAOywowDssKQA7LClAOywpgDssKcA7LCoAOywqQDssKoA7LCrAOywrADssK0A7LCuAOywrwDssLAA7LCxAOywsgDssLMA7LC0AOywtQDssLYA7LC3AOywuADssLjqs6AA7LC5AOywugDssLsA7LC8AOywvQDssL4A7LC/AOyxgADssYEA7LGCAOyxgwDssYQA7LGFAOyxhgDssYcA7LGIAOyxiQDssYoA7LGLAOyxjADssY0A7LGOAOyxjwDssZAA7LGRAOyxkgDssZMA7LGUAOyxlQDssZYA7LGXAOyxmADssZkA7LGaAOyxmwDssZwA7LGdAOyxngDssZ8A7LGgAOyxoQDssaIA7LGjAOyxpADssaUA7LGmAOyxpwDssagA7LGpAOyxqgDssasA7LGsAOyxrQDssa4A7LGvAOyxsADssbEA7LGyAOyxswDssbQA7LG1AOyxtgDssbcA7LG4AOyxuQDssboA7LG7AOyxvADssb0A7LG+AOyxvwDssoAA7LKBAOyyggDssoMA7LKEAOyyhQDssoYA7LKHAOyyiADssokA7LKKAOyyiwDssowA7LKNAOyyjgDsso8A7LKQAOyykQDsspIA7LKTAOyylADsspUA7LKWAOyylwDsspgA7LKZAOyymgDsspsA7LKcAOyynQDssp4A7LKfAOyyoADssqEA7LKiAOyyowDssqQA7LKlAOyypgDssqcA7LKoAOyyqQDssqoA7LKrAOyyrADssq0A7LKuAOyyrwDssrAA7LKxAOyysgDssrMA7LK0AOyytQDssrYA7LK3AOyyuADssrkA7LK6AOyyuwDssrwA7LK9AOyyvgDssr8A7LOAAOyzgQDss4IA7LODAOyzhADss4UA7LOGAOyzhwDss4gA7LOJAOyzigDss4sA7LOMAOyzjQDss44A7LOPAOyzkADss5EA7LOSAOyzkwDss5QA7LOVAOyzlgDss5cA7LOYAOyzmQDss5oA7LObAOyznADss50A7LOeAOyznwDss6AA7LOhAOyzogDss6MA7LOkAOyzpQDss6YA7LOnAOyzqADss6kA7LOqAOyzqwDss6wA7LOtAOyzrgDss68A7LOwAOyzsQDss7IA7LOzAOyztADss7UA7LO2AOyztwDss7gA7LO5AOyzugDss7sA7LO8AOyzvQDss74A7LO/AOy0gADstIEA7LSCAOy0gwDstIQA7LSFAOy0hgDstIcA7LSIAOy0iQDstIoA7LSLAOy0jADstI0A7LSOAOy0jwDstJAA7LSRAOy0kgDstJMA7LSUAOy0lQDstJYA7LSXAOy0mADstJkA7LSaAOy0mwDstJwA7LSdAOy0ngDstJ8A7LSgAOy0oQDstKIA7LSjAOy0pADstKUA7LSmAOy0pwDstKgA7LSpAOy0qgDstKsA7LSsAOy0rQDstK4A7LSvAOy0sADstLEA7LSyAOy0swDstLQA7LS1AOy0tgDstLcA7LS4AOy0uQDstLoA7LS7AOy0vADstL0A7LS+AOy0vwDstYAA7LWBAOy1ggDstYMA7LWEAOy1hQDstYYA7LWHAOy1iADstYkA7LWKAOy1iwDstYwA7LWNAOy1jgDstY8A7LWQAOy1kQDstZIA7LWTAOy1lADstZUA7LWWAOy1lwDstZgA7LWZAOy1mgDstZsA7LWcAOy1nQDstZ4A7LWfAOy1oADstaEA7LWiAOy1owDstaQA7LWlAOy1pgDstacA7LWoAOy1qQDstaoA7LWrAOy1rADsta0A7LWuAOy1rwDstbAA7LWxAOy1sgDstbMA7LW0AOy1tQDstbYA7LW3AOy1uADstbkA7LW6AOy1uwDstbwA7LW9AOy1vgDstb8A7LaAAOy2gQDstoIA7LaDAOy2hADstoUA7LaGAOy2hwDstogA7LaJAOy2igDstosA7LaMAOy2jQDsto4A7LaPAOy2kADstpEA7LaSAOy2kwDstpQA7LaVAOy2lgDstpcA7LaYAOy2mQDstpoA7LabAOy2nADstp0A7LaeAOy2nwDstqAA7LahAOy2ogDstqMA7LakAOy2pQDstqYA7LanAOy2qADstqkA7LaqAOy2qwDstqwA7LatAOy2rgDstq8A7LawAOy2sQDstrIA7LazAOy2tADstrUA7La2AOy2twDstrgA7La5AOy2ugDstrsA7La8AOy2vQDstr4A7La/AOy3gADst4EA7LeCAOy3gwDst4QA7LeFAOy3hgDst4cA7LeIAOy3iQDst4oA7LeLAOy3jADst40A7LeOAOy3jwDst5AA7LeRAOy3kgDst5MA7LeUAOy3lQDst5YA7LeXAOy3mADst5kA7LeaAOy3mwDst5wA7LedAOy3ngDst58A7LegAOy3oQDst6IA7LejAOy3pADst6UA7LemAOy3pwDst6gA7LepAOy3qgDst6sA7LesAOy3rQDst64A7LevAOy3sADst7EA7LeyAOy3swDst7QA7Le1AOy3tgDst7cA7Le4AOy3uQDst7oA7Le7AOy3vADst70A7Le+AOy3vwDsuIAA7LiBAOy4ggDsuIMA7LiEAOy4hQDsuIYA7LiHAOy4iADsuIkA7LiKAOy4iwDsuIwA7LiNAOy4jgDsuI8A7LiQAOy4kQDsuJIA7LiTAOy4lADsuJUA7LiWAOy4lwDsuJgA7LiZAOy4mgDsuJsA7LicAOy4nQDsuJ4A7LifAOy4oADsuKEA7LiiAOy4owDsuKQA7LilAOy4pgDsuKcA7LioAOy4qQDsuKoA7LirAOy4rADsuK0A7LiuAOy4rwDsuLAA7LixAOy4sgDsuLMA7Li0AOy4tQDsuLYA7Li3AOy4uADsuLkA7Li6AOy4uwDsuLwA7Li9AOy4vgDsuL8A7LmAAOy5gQDsuYIA7LmDAOy5hADsuYUA7LmGAOy5hwDsuYgA7LmJAOy5igDsuYsA7LmMAOy5jQDsuY4A7LmPAOy5kADsuZEA7LmSAOy5kwDsuZQA7LmVAOy5lgDsuZcA7LmYAOy5mQDsuZoA7LmbAOy5nADsuZ0A7LmeAOy5nwDsuaAA7LmhAOy5ogDsuaMA7LmkAOy5pQDsuaYA7LmnAOy5qADsuakA7LmqAOy5qwDsuawA7LmtAOy5rgDsua8A7LmwAOy5sQDsubIA7LmzAOy5tADsubUA7Lm2AOy5twDsubgA7Lm5AOy5ugDsubsA7Lm8AOy5vQDsub4A7Lm/AOy6gADsuoEA7LqCAOy6gwDsuoQA7LqFAOy6hgDsuocA7LqIAOy6iQDsuooA7LqLAOy6jADsuo0A7LqOAOy6jwDsupAA7LqRAOy6kgDsupMA7LqUAOy6lQDsupYA7LqXAOy6mADsupkA7LqaAOy6mwDsupwA7LqdAOy6ngDsup8A7LqgAOy6oQDsuqIA7LqjAOy6pADsuqUA7LqmAOy6pwDsuqgA7LqpAOy6qgDsuqsA7LqsAOy6rQDsuq4A7LqvAOy6sADsurEA7LqyAOy6swDsurQA7Lq1AOy6tgDsurcA7Lq4AOy6uQDsuroA7Lq7AOy6vADsur0A7Lq+AOy6vwDsu4AA7LuBAOy7ggDsu4MA7LuEAOy7hQDsu4YA7LuHAOy7iADsu4kA7LuKAOy7iwDsu4wA7LuNAOy7jgDsu48A7LuQAOy7kQDsu5IA7LuTAOy7lADsu5UA7LuWAOy7lwDsu5gA7LuZAOy7mgDsu5sA7LucAOy7nQDsu54A7LufAOy7oADsu6EA7LuiAOy7owDsu6QA7LulAOy7pgDsu6cA7LuoAOy7qQDsu6oA7LurAOy7rADsu60A7LuuAOy7rwDsu7AA7LuxAOy7sgDsu7MA7Lu0AOy7tQDsu7YA7Lu3AOy7uADsu7kA7Lu6AOy7uwDsu7wA7Lu9AOy7vgDsu78A7LyAAOy8gQDsvIIA7LyDAOy8hADsvIUA7LyGAOy8hwDsvIgA7LyJAOy8igDsvIsA7LyMAOy8jQDsvI4A7LyPAOy8kADsvJEA7LySAOy8kwDsvJQA7LyVAOy8lgDsvJcA7LyYAOy8mQDsvJoA7LybAOy8nADsvJ0A7LyeAOy8nwDsvKAA7LyhAOy8ogDsvKMA7LykAOy8pQDsvKYA7LynAOy8qADsvKkA7LyqAOy8qwDsvKwA7LytAOy8rgDsvK8A7LywAOy8sQDsvLIA7LyzAOy8tADsvLUA7Ly2AOy8twDsvLgA7Ly5AOy8ugDsvLsA7Ly8AOy8vQDsvL4A7Ly/AOy9gADsvYEA7L2CAOy9gwDsvYQA7L2FAOy9hgDsvYcA7L2IAOy9iQDsvYoA7L2LAOy9jADsvY0A7L2OAOy9jwDsvZAA7L2RAOy9kgDsvZMA7L2UAOy9lQDsvZYA7L2XAOy9mADsvZkA7L2aAOy9mwDsvZwA7L2dAOy9ngDsvZ8A7L2gAOy9oQDsvaIA7L2jAOy9pADsvaUA7L2mAOy9pwDsvagA7L2pAOy9qgDsvasA7L2sAOy9rQDsva4A7L2vAOy9sADsvbEA7L2yAOy9swDsvbQA7L21AOy9tgDsvbcA7L24AOy9uQDsvboA7L27AOy9vADsvb0A7L2+AOy9vwDsvoAA7L6BAOy+ggDsvoMA7L6EAOy+hQDsvoYA7L6HAOy+iADsvokA7L6KAOy+iwDsvowA7L6NAOy+jgDsvo8A7L6QAOy+kQDsvpIA7L6TAOy+lADsvpUA7L6WAOy+lwDsvpgA7L6ZAOy+mgDsvpsA7L6cAOy+nQDsvp4A7L6fAOy+oADsvqEA7L6iAOy+owDsvqQA7L6lAOy+pgDsvqcA7L6oAOy+qQDsvqoA7L6rAOy+rADsvq0A7L6uAOy+rwDsvrAA7L6xAOy+sgDsvrMA7L60AOy+tQDsvrYA7L63AOy+uADsvrkA7L66AOy+uwDsvrwA7L69AOy+vgDsvr8A7L+AAOy/gQDsv4IA7L+DAOy/hADsv4UA7L+GAOy/hwDsv4gA7L+JAOy/igDsv4sA7L+MAOy/jQDsv44A7L+PAOy/kADsv5EA7L+SAOy/kwDsv5QA7L+VAOy/lgDsv5cA7L+YAOy/mQDsv5oA7L+bAOy/nADsv50A7L+eAOy/nwDsv6AA7L+hAOy/ogDsv6MA7L+kAOy/pQDsv6YA7L+nAOy/qADsv6kA7L+qAOy/qwDsv6wA7L+tAOy/rgDsv68A7L+wAOy/sQDsv7IA7L+zAOy/tADsv7UA7L+2AOy/twDsv7gA7L+5AOy/ugDsv7sA7L+8AOy/vQDsv74A7L+/AO2AgADtgIEA7YCCAO2AgwDtgIQA7YCFAO2AhgDtgIcA7YCIAO2AiQDtgIoA7YCLAO2AjADtgI0A7YCOAO2AjwDtgJAA7YCRAO2AkgDtgJMA7YCUAO2AlQDtgJYA7YCXAO2AmADtgJkA7YCaAO2AmwDtgJwA7YCdAO2AngDtgJ8A7YCgAO2AoQDtgKIA7YCjAO2ApADtgKUA7YCmAO2ApwDtgKgA7YCpAO2AqgDtgKsA7YCsAO2ArQDtgK4A7YCvAO2AsADtgLEA7YCyAO2AswDtgLQA7YC1AO2AtgDtgLcA7YC4AO2AuQDtgLoA7YC7AO2AvADtgL0A7YC+AO2AvwDtgYAA7YGBAO2BggDtgYMA7YGEAO2BhQDtgYYA7YGHAO2BiADtgYkA7YGKAO2BiwDtgYwA7YGNAO2BjgDtgY8A7YGQAO2BkQDtgZIA7YGTAO2BlADtgZUA7YGWAO2BlwDtgZgA7YGZAO2BmgDtgZsA7YGcAO2BnQDtgZ4A7YGfAO2BoADtgaEA7YGiAO2BowDtgaQA7YGlAO2BpgDtgacA7YGoAO2BqQDtgaoA7YGrAO2BrADtga0A7YGuAO2BrwDtgbAA7YGxAO2BsgDtgbMA7YG0AO2BtQDtgbYA7YG3AO2BuADtgbkA7YG6AO2BuwDtgbwA7YG9AO2BvgDtgb8A7YKAAO2CgQDtgoIA7YKDAO2ChADtgoUA7YKGAO2ChwDtgogA7YKJAO2CigDtgosA7YKMAO2CjQDtgo4A7YKPAO2CkADtgpEA7YKSAO2CkwDtgpQA7YKVAO2ClgDtgpcA7YKYAO2CmQDtgpoA7YKbAO2CnADtgp0A7YKeAO2CnwDtgqAA7YKhAO2CogDtgqMA7YKkAO2CpQDtgqYA7YKnAO2CqADtgqkA7YKqAO2CqwDtgqwA7YKtAO2CrgDtgq8A7YKwAO2CsQDtgrIA7YKzAO2CtADtgrUA7YK2AO2CtwDtgrgA7YK5AO2CugDtgrsA7YK8AO2CvQDtgr4A7YK/AO2DgADtg4EA7YOCAO2DgwDtg4QA7YOFAO2DhgDtg4cA7YOIAO2DiQDtg4oA7YOLAO2DjADtg40A7YOOAO2DjwDtg5AA7YORAO2DkgDtg5MA7YOUAO2DlQDtg5YA7YOXAO2DmADtg5kA7YOaAO2DmwDtg5wA7YOdAO2DngDtg58A7YOgAO2DoQDtg6IA7YOjAO2DpADtg6UA7YOmAO2DpwDtg6gA7YOpAO2DqgDtg6sA7YOsAO2DrQDtg64A7YOvAO2DsADtg7EA7YOyAO2DswDtg7QA7YO1AO2DtgDtg7cA7YO4AO2DuQDtg7oA7YO7AO2DvADtg70A7YO+AO2DvwDthIAA7YSBAO2EggDthIMA7YSEAO2EhQDthIYA7YSHAO2EiADthIkA7YSKAO2EiwDthIwA7YSNAO2EjgDthI8A7YSQAO2EkQDthJIA7YSTAO2ElADthJUA7YSWAO2ElwDthJgA7YSZAO2EmgDthJsA7YScAO2EnQDthJ4A7YSfAO2EoADthKEA7YSiAO2EowDthKQA7YSlAO2EpgDthKcA7YSoAO2EqQDthKoA7YSrAO2ErADthK0A7YSuAO2ErwDthLAA7YSxAO2EsgDthLMA7YS0AO2EtQDthLYA7YS3AO2EuADthLkA7YS6AO2EuwDthLwA7YS9AO2EvgDthL8A7YWAAO2FgQDthYIA7YWDAO2FhADthYUA7YWGAO2FhwDthYgA7YWJAO2FigDthYsA7YWMAO2FjQDthY4A7YWPAO2FkADthZEA7YWSAO2FkwDthZQA7YWVAO2FlgDthZcA7YWYAO2FmQDthZoA7YWbAO2FnADthZ0A7YWeAO2FnwDthaAA7YWhAO2FogDthaMA7YWkAO2FpQDthaYA7YWnAO2FqADthakA7YWqAO2FqwDthawA7YWtAO2FrgDtha8A7YWwAO2FsQDthbIA7YWzAO2FtADthbUA7YW2AO2FtwDthbgA7YW5AO2FugDthbsA7YW8AO2FvQDthb4A7YW/AO2GgADthoEA7YaCAO2GgwDthoQA7YaFAO2GhgDthocA7YaIAO2GiQDthooA7YaLAO2GjADtho0A7YaOAO2GjwDthpAA7YaRAO2GkgDthpMA7YaUAO2GlQDthpYA7YaXAO2GmADthpkA7YaaAO2GmwDthpwA7YadAO2GngDthp8A7YagAO2GoQDthqIA7YajAO2GpADthqUA7YamAO2GpwDthqgA7YapAO2GqgDthqsA7YasAO2GrQDthq4A7YavAO2GsADthrEA7YayAO2GswDthrQA7Ya1AO2GtgDthrcA7Ya4AO2GuQDthroA7Ya7AO2GvADthr0A7Ya+AO2GvwDth4AA7YeBAO2HggDth4MA7YeEAO2HhQDth4YA7YeHAO2HiADth4kA7YeKAO2HiwDth4wA7YeNAO2HjgDth48A7YeQAO2HkQDth5IA7YeTAO2HlADth5UA7YeWAO2HlwDth5gA7YeZAO2HmgDth5sA7YecAO2HnQDth54A7YefAO2HoADth6EA7YeiAO2HowDth6QA7YelAO2HpgDth6cA7YeoAO2HqQDth6oA7YerAO2HrADth60A7YeuAO2HrwDth7AA7YexAO2HsgDth7MA7Ye0AO2HtQDth7YA7Ye3AO2HuADth7kA7Ye6AO2HuwDth7wA7Ye9AO2HvgDth78A7YiAAO2IgQDtiIIA7YiDAO2IhADtiIUA7YiGAO2IhwDtiIgA7YiJAO2IigDtiIsA7YiMAO2IjQDtiI4A7YiPAO2IkADtiJEA7YiSAO2IkwDtiJQA7YiVAO2IlgDtiJcA7YiYAO2ImQDtiJoA7YibAO2InADtiJ0A7YieAO2InwDtiKAA7YihAO2IogDtiKMA7YikAO2IpQDtiKYA7YinAO2IqADtiKkA7YiqAO2IqwDtiKwA7YitAO2IrgDtiK8A7YiwAO2IsQDtiLIA7YizAO2ItADtiLUA7Yi2AO2ItwDtiLgA7Yi5AO2IugDtiLsA7Yi8AO2IvQDtiL4A7Yi/AO2JgADtiYEA7YmCAO2JgwDtiYQA7YmFAO2JhgDtiYcA7YmIAO2JiQDtiYoA7YmLAO2JjADtiY0A7YmOAO2JjwDtiZAA7YmRAO2JkgDtiZMA7YmUAO2JlQDtiZYA7YmXAO2JmADtiZkA7YmaAO2JmwDtiZwA7YmdAO2JngDtiZ8A7YmgAO2JoQDtiaIA7YmjAO2JpADtiaUA7YmmAO2JpwDtiagA7YmpAO2JqgDtiasA7YmsAO2JrQDtia4A7YmvAO2JsADtibEA7YmyAO2JswDtibQA7Ym1AO2JtgDtibcA7Ym4AO2JuQDtiboA7Ym7AO2JvADtib0A7Ym+AO2JvwDtioAA7YqBAO2KggDtioMA7YqEAO2KhQDtioYA7YqHAO2KiADtiokA7YqKAO2KiwDtiowA7YqNAO2KjgDtio8A7YqQAO2KkQDtipIA7YqTAO2KlADtipUA7YqWAO2KlwDtipgA7YqZAO2KmgDtipsA7YqcAO2KnQDtip4A7YqfAO2KoADtiqEA7YqiAO2KowDtiqQA7YqlAO2KpgDtiqcA7YqoAO2KqQDtiqoA7YqrAO2KrADtiq0A7YquAO2KrwDtirAA7YqxAO2KsgDtirMA7Yq0AO2KtQDtirYA7Yq3AO2KuADtirkA7Yq6AO2KuwDtirwA7Yq9AO2KvgDtir8A7YuAAO2LgQDti4IA7YuDAO2LhADti4UA7YuGAO2LhwDti4gA7YuJAO2LigDti4sA7YuMAO2LjQDti44A7YuPAO2LkADti5EA7YuSAO2LkwDti5QA7YuVAO2LlgDti5cA7YuYAO2LmQDti5oA7YubAO2LnADti50A7YueAO2LnwDti6AA7YuhAO2LogDti6MA7YukAO2LpQDti6YA7YunAO2LqADti6kA7YuqAO2LqwDti6wA7YutAO2LrgDti68A7YuwAO2LsQDti7IA7YuzAO2LtADti7UA7Yu2AO2LtwDti7gA7Yu5AO2LugDti7sA7Yu8AO2LvQDti74A7Yu/AO2MgADtjIEA7YyCAO2MgwDtjIQA7YyFAO2MhgDtjIcA7YyIAO2MiQDtjIoA7YyLAO2MjADtjI0A7YyOAO2MjwDtjJAA7YyRAO2MkgDtjJMA7YyUAO2MlQDtjJYA7YyXAO2MmADtjJkA7YyaAO2MmwDtjJwA7YydAO2MngDtjJ8A7YygAO2MoQDtjKIA7YyjAO2MpADtjKUA7YymAO2MpwDtjKgA7YypAO2MqgDtjKsA7YysAO2MrQDtjK4A7YyvAO2MsADtjLEA7YyyAO2MswDtjLQA7Yy1AO2MtgDtjLcA7Yy4AO2MuQDtjLoA7Yy7AO2MvADtjL0A7Yy+AO2MvwDtjYAA7Y2BAO2NggDtjYMA7Y2EAO2NhQDtjYYA7Y2HAO2NiADtjYkA7Y2KAO2NiwDtjYwA7Y2NAO2NjgDtjY8A7Y2QAO2NkQDtjZIA7Y2TAO2NlADtjZUA7Y2WAO2NlwDtjZgA7Y2ZAO2NmgDtjZsA7Y2cAO2NnQDtjZ4A7Y2fAO2NoADtjaEA7Y2iAO2NowDtjaQA7Y2lAO2NpgDtjacA7Y2oAO2NqQDtjaoA7Y2rAO2NrADtja0A7Y2uAO2NrwDtjbAA7Y2xAO2NsgDtjbMA7Y20AO2NtQDtjbYA7Y23AO2NuADtjbkA7Y26AO2NuwDtjbwA7Y29AO2NvgDtjb8A7Y6AAO2OgQDtjoIA7Y6DAO2OhADtjoUA7Y6GAO2OhwDtjogA7Y6JAO2OigDtjosA7Y6MAO2OjQDtjo4A7Y6PAO2OkADtjpEA7Y6SAO2OkwDtjpQA7Y6VAO2OlgDtjpcA7Y6YAO2OmQDtjpoA7Y6bAO2OnADtjp0A7Y6eAO2OnwDtjqAA7Y6hAO2OogDtjqMA7Y6kAO2OpQDtjqYA7Y6nAO2OqADtjqkA7Y6qAO2OqwDtjqwA7Y6tAO2OrgDtjq8A7Y6wAO2OsQDtjrIA7Y6zAO2OtADtjrUA7Y62AO2OtwDtjrgA7Y65AO2OugDtjrsA7Y68AO2OvQDtjr4A7Y6/AO2PgADtj4EA7Y+CAO2PgwDtj4QA7Y+FAO2PhgDtj4cA7Y+IAO2PiQDtj4oA7Y+LAO2PjADtj40A7Y+OAO2PjwDtj5AA7Y+RAO2PkgDtj5MA7Y+UAO2PlQDtj5YA7Y+XAO2PmADtj5kA7Y+aAO2PmwDtj5wA7Y+dAO2PngDtj58A7Y+gAO2PoQDtj6IA7Y+jAO2PpADtj6UA7Y+mAO2PpwDtj6gA7Y+pAO2PqgDtj6sA7Y+sAO2PrQDtj64A7Y+vAO2PsADtj7EA7Y+yAO2PswDtj7QA7Y+1AO2PtgDtj7cA7Y+4AO2PuQDtj7oA7Y+7AO2PvADtj70A7Y++AO2PvwDtkIAA7ZCBAO2QggDtkIMA7ZCEAO2QhQDtkIYA7ZCHAO2QiADtkIkA7ZCKAO2QiwDtkIwA7ZCNAO2QjgDtkI8A7ZCQAO2QkQDtkJIA7ZCTAO2QlADtkJUA7ZCWAO2QlwDtkJgA7ZCZAO2QmgDtkJsA7ZCcAO2QnQDtkJ4A7ZCfAO2QoADtkKEA7ZCiAO2QowDtkKQA7ZClAO2QpgDtkKcA7ZCoAO2QqQDtkKoA7ZCrAO2QrADtkK0A7ZCuAO2QrwDtkLAA7ZCxAO2QsgDtkLMA7ZC0AO2QtQDtkLYA7ZC3AO2QuADtkLkA7ZC6AO2QuwDtkLwA7ZC9AO2QvgDtkL8A7ZGAAO2RgQDtkYIA7ZGDAO2RhADtkYUA7ZGGAO2RhwDtkYgA7ZGJAO2RigDtkYsA7ZGMAO2RjQDtkY4A7ZGPAO2RkADtkZEA7ZGSAO2RkwDtkZQA7ZGVAO2RlgDtkZcA7ZGYAO2RmQDtkZoA7ZGbAO2RnADtkZ0A7ZGeAO2RnwDtkaAA7ZGhAO2RogDtkaMA7ZGkAO2RpQDtkaYA7ZGnAO2RqADtkakA7ZGqAO2RqwDtkawA7ZGtAO2RrgDtka8A7ZGwAO2RsQDtkbIA7ZGzAO2RtADtkbUA7ZG2AO2RtwDtkbgA7ZG5AO2RugDtkbsA7ZG8AO2RvQDtkb4A7ZG/AO2SgADtkoEA7ZKCAO2SgwDtkoQA7ZKFAO2ShgDtkocA7ZKIAO2SiQDtkooA7ZKLAO2SjADtko0A7ZKOAO2SjwDtkpAA7ZKRAO2SkgDtkpMA7ZKUAO2SlQDtkpYA7ZKXAO2SmADtkpkA7ZKaAO2SmwDtkpwA7ZKdAO2SngDtkp8A7ZKgAO2SoQDtkqIA7ZKjAO2SpADtkqUA7ZKmAO2SpwDtkqgA7ZKpAO2SqgDtkqsA7ZKsAO2SrQDtkq4A7ZKvAO2SsADtkrEA7ZKyAO2SswDtkrQA7ZK1AO2StgDtkrcA7ZK4AO2SuQDtkroA7ZK7AO2SvADtkr0A7ZK+AO2SvwDtk4AA7ZOBAO2TggDtk4MA7ZOEAO2ThQDtk4YA7ZOHAO2TiADtk4kA7ZOKAO2TiwDtk4wA7ZONAO2TjgDtk48A7ZOQAO2TkQDtk5IA7ZOTAO2TlADtk5UA7ZOWAO2TlwDtk5gA7ZOZAO2TmgDtk5sA7ZOcAO2TnQDtk54A7ZOfAO2ToADtk6EA7ZOiAO2TowDtk6QA7ZOlAO2TpgDtk6cA7ZOoAO2TqQDtk6oA7ZOrAO2TrADtk60A7ZOuAO2TrwDtk7AA7ZOxAO2TsgDtk7MA7ZO0AO2TtQDtk7YA7ZO3AO2TuADtk7kA7ZO6AO2TuwDtk7wA7ZO9AO2TvgDtk78A7ZSAAO2UgQDtlIIA7ZSDAO2UhADtlIUA7ZSGAO2UhwDtlIgA7ZSJAO2UigDtlIsA7ZSMAO2UjQDtlI4A7ZSPAO2UkADtlJEA7ZSSAO2UkwDtlJQA7ZSVAO2UlgDtlJcA7ZSYAO2UmQDtlJoA7ZSbAO2UnADtlJ0A7ZSeAO2UnwDtlKAA7ZShAO2UogDtlKMA7ZSkAO2UpQDtlKYA7ZSnAO2UqADtlKkA7ZSqAO2UqwDtlKwA7ZStAO2UrgDtlK8A7ZSwAO2UsQDtlLIA7ZSzAO2UtADtlLUA7ZS2AO2UtwDtlLgA7ZS5AO2UugDtlLsA7ZS8AO2UvQDtlL4A7ZS/AO2VgADtlYEA7ZWCAO2VgwDtlYQA7ZWFAO2VhgDtlYcA7ZWIAO2ViQDtlYoA7ZWLAO2VjADtlY0A7ZWOAO2VjwDtlZAA7ZWRAO2VkgDtlZMA7ZWUAO2VlQDtlZYA7ZWXAO2VmADtlZkA7ZWaAO2VmwDtlZwA7ZWdAO2VngDtlZ8A7ZWgAO2VoQDtlaIA7ZWjAO2VpADtlaUA7ZWmAO2VpwDtlagA7ZWpAO2VqgDtlasA7ZWsAO2VrQDtla4A7ZWvAO2VsADtlbEA7ZWyAO2VswDtlbQA7ZW1AO2VtgDtlbcA7ZW4AO2VuQDtlboA7ZW7AO2VvADtlb0A7ZW+AO2VvwDtloAA7ZaBAO2WggDtloMA7ZaEAO2WhQDtloYA7ZaHAO2WiADtlokA7ZaKAO2WiwDtlowA7ZaNAO2WjgDtlo8A7ZaQAO2WkQDtlpIA7ZaTAO2WlADtlpUA7ZaWAO2WlwDtlpgA7ZaZAO2WmgDtlpsA7ZacAO2WnQDtlp4A7ZafAO2WoADtlqEA7ZaiAO2WowDtlqQA7ZalAO2WpgDtlqcA7ZaoAO2WqQDtlqoA7ZarAO2WrADtlq0A7ZauAO2WrwDtlrAA7ZaxAO2WsgDtlrMA7Za0AO2WtQDtlrYA7Za3AO2WuADtlrkA7Za6AO2WuwDtlrwA7Za9AO2WvgDtlr8A7ZeAAO2XgQDtl4IA7ZeDAO2XhADtl4UA7ZeGAO2XhwDtl4gA7ZeJAO2XigDtl4sA7ZeMAO2XjQDtl44A7ZePAO2XkADtl5EA7ZeSAO2XkwDtl5QA7ZeVAO2XlgDtl5cA7ZeYAO2XmQDtl5oA7ZebAO2XnADtl50A7ZeeAO2XnwDtl6AA7ZehAO2XogDtl6MA7ZekAO2XpQDtl6YA7ZenAO2XqADtl6kA7ZeqAO2XqwDtl6wA7ZetAO2XrgDtl68A7ZewAO2XsQDtl7IA7ZezAO2XtADtl7UA7Ze2AO2XtwDtl7gA7Ze5AO2XugDtl7sA7Ze8AO2XvQDtl74A7Ze/AO2YgADtmIEA7ZiCAO2YgwDtmIQA7ZiFAO2YhgDtmIcA7ZiIAO2YiQDtmIoA7ZiLAO2YjADtmI0A7ZiOAO2YjwDtmJAA7ZiRAO2YkgDtmJMA7ZiUAO2YlQDtmJYA7ZiXAO2YmADtmJkA7ZiaAO2YmwDtmJwA7ZidAO2YngDtmJ8A7ZigAO2YoQDtmKIA7ZijAO2YpADtmKUA7ZimAO2YpwDtmKgA7ZipAO2YqgDtmKsA7ZisAO2YrQDtmK4A7ZivAO2YsADtmLEA7ZiyAO2YswDtmLQA7Zi1AO2YtgDtmLcA7Zi4AO2YuQDtmLoA7Zi7AO2YvADtmL0A7Zi+AO2YvwDtmYAA7ZmBAO2ZggDtmYMA7ZmEAO2ZhQDtmYYA7ZmHAO2ZiADtmYkA7ZmKAO2ZiwDtmYwA7ZmNAO2ZjgDtmY8A7ZmQAO2ZkQDtmZIA7ZmTAO2ZlADtmZUA7ZmWAO2ZlwDtmZgA7ZmZAO2ZmgDtmZsA7ZmcAO2ZnQDtmZ4A7ZmfAO2ZoADtmaEA7ZmiAO2ZowDtmaQA7ZmlAO2ZpgDtmacA7ZmoAO2ZqQDtmaoA7ZmrAO2ZrADtma0A7ZmuAO2ZrwDtmbAA7ZmxAO2ZsgDtmbMA7Zm0AO2ZtQDtmbYA7Zm3AO2ZuADtmbkA7Zm6AO2ZuwDtmbwA7Zm9AO2ZvgDtmb8A7ZqAAO2agQDtmoIA7ZqDAO2ahADtmoUA7ZqGAO2ahwDtmogA7ZqJAO2aigDtmosA7ZqMAO2ajQDtmo4A7ZqPAO2akADtmpEA7ZqSAO2akwDtmpQA7ZqVAO2algDtmpcA7ZqYAO2amQDtmpoA7ZqbAO2anADtmp0A7ZqeAO2anwDtmqAA7ZqhAO2aogDtmqMA7ZqkAO2apQDtmqYA7ZqnAO2aqADtmqkA7ZqqAO2aqwDtmqwA7ZqtAO2argDtmq8A7ZqwAO2asQDtmrIA7ZqzAO2atADtmrUA7Zq2AO2atwDtmrgA7Zq5AO2augDtmrsA7Zq8AO2avQDtmr4A7Zq/AO2bgADtm4EA7ZuCAO2bgwDtm4QA7ZuFAO2bhgDtm4cA7ZuIAO2biQDtm4oA7ZuLAO2bjADtm40A7ZuOAO2bjwDtm5AA7ZuRAO2bkgDtm5MA7ZuUAO2blQDtm5YA7ZuXAO2bmADtm5kA7ZuaAO2bmwDtm5wA7ZudAO2bngDtm58A7ZugAO2boQDtm6IA7ZujAO2bpADtm6UA7ZumAO2bpwDtm6gA7ZupAO2bqgDtm6sA7ZusAO2brQDtm64A7ZuvAO2bsADtm7EA7ZuyAO2bswDtm7QA7Zu1AO2btgDtm7cA7Zu4AO2buQDtm7oA7Zu7AO2bvADtm70A7Zu+AO2bvwDtnIAA7ZyBAO2cggDtnIMA7ZyEAO2chQDtnIYA7ZyHAO2ciADtnIkA7ZyKAO2ciwDtnIwA7ZyNAO2cjgDtnI8A7ZyQAO2ckQDtnJIA7ZyTAO2clADtnJUA7ZyWAO2clwDtnJgA7ZyZAO2cmgDtnJsA7ZycAO2cnQDtnJ4A7ZyfAO2coADtnKEA7ZyiAO2cowDtnKQA7ZylAO2cpgDtnKcA7ZyoAO2cqQDtnKoA7ZyrAO2crADtnK0A7ZyuAO2crwDtnLAA7ZyxAO2csgDtnLMA7Zy0AO2ctQDtnLYA7Zy3AO2cuADtnLkA7Zy6AO2cuwDtnLwA7Zy9AO2cvgDtnL8A7Z2AAO2dgQDtnYIA7Z2DAO2dhADtnYUA7Z2GAO2dhwDtnYgA7Z2JAO2digDtnYsA7Z2MAO2djQDtnY4A7Z2PAO2dkADtnZEA7Z2SAO2dkwDtnZQA7Z2VAO2dlgDtnZcA7Z2YAO2dmQDtnZoA7Z2bAO2dnADtnZ0A7Z2eAO2dnwDtnaAA7Z2hAO2dogDtnaMA7Z2kAO2dpQDtnaYA7Z2nAO2dqADtnakA7Z2qAO2dqwDtnawA7Z2tAO2drgDtna8A7Z2wAO2dsQDtnbIA7Z2zAO2dtADtnbUA7Z22AO2dtwDtnbgA7Z25AO2dugDtnbsA7Z28AO2dvQDtnb4A7Z2/AO2egADtnoEA7Z6CAO2egwDtnoQA7Z6FAO2ehgDtnocA7Z6IAO2eiQDtnooA7Z6LAO2ejADtno0A7Z6OAO2ejwDtnpAA7Z6RAO2ekgDtnpMA7Z6UAO2elQDtnpYA7Z6XAO2emADtnpkA7Z6aAO2emwDtnpwA7Z6dAO2engDtnp8A7Z6gAO2eoQDtnqIA7Z6jAPCRgpoA8JGCnADwkYKrAPCRhK4A8JGErwDwkY2LAPCRjYwA8JGSuwDwkZK8APCRkr4A8JGWugDwkZa7APCdhZfwnYWlAPCdhZjwnYWlAPCdhZjwnYWl8J2FrgDwnYWY8J2FpfCdha8A8J2FmPCdhaXwnYWwAPCdhZjwnYWl8J2FsQDwnYWY8J2FpfCdhbIA8J2GufCdhaUA8J2GufCdhaXwnYWuAPCdhrnwnYWl8J2FrwDwnYa68J2FpQDwnYa68J2FpfCdha4A8J2GuvCdhaXwnYWvAPCghKIA8KCUnADwoJSlAPCglYsA8KCYugDwoKCEAPCgo54A8KCorADwoK2jAPChk6QA8KGaqADwoZuqAPChp4gA8KGsmADwobSLAPCht6QA8KG3pgDwooaDAPCihp8A8KKMsQDwopuUAPCioYQA8KKhigDwoqyMAPCir7EA8KOAigDwo4q4APCjjZ8A8KOOkwDwo46cAPCjj4MA8KOPlQDwo5GtAPCjmqMA8KOipwDwo6qNAPCjq7oA8KOyvADwo7SeAPCju5EA8KO9ngDwo76OAPCkiaMA8KSLrgDwpI6rAPCkmIgA8KSctQDwpKCUAPCksLYA8KSykgDwpL6hAPCkvrgA8KWBhADwpYOyAPClg7MA8KWEmQDwpYSzAPCliYkA8KWQnQDwpZimAPClmpoA8KWbhQDwpaW8APClqqcA8KWuqwDwpbKAAPCls5AA8KW+hgDwpoeaAPCmiKgA8KaJhwDwpouZAPCmjL4A8KaTmgDwppSjAPCmlqgA8KaepwDwpp61APCmrLwA8KawtgDwprOVAPCmtasA8Ka8rADwpr6xAPCng5IA8KePigDwp5mnAPCnoq4A8KelpgDwp7KoAPCnu5MA8Ke8rwDwqJeSAPCol60A8KicrgDwqK+6APCotbcA8KmFhQDwqYefAPCpiJoA8KmQigDwqZKWAPCplrYA8KmssADwqoOOAPCqhIUA8KqIjgDwqoqRAPCqjpIA8KqYgAA='}

exec
/bin/bash -lc "nl -ba src/fill.js | sed -n '113,144p'; nl -ba src/rerank/hybrid.js | sed -n '63,93p'; git diff --check 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src bin scripts; git status --short" in /workspace/tellsh
 succeeded in 0ms:
   113	    const w = wrEnvWord(m[2]);
   114	    if (WR_ENV_KNOWN.test(w) || wrEnvMarked(w) || (m[1] && RAW_OK.wenv(w))) return w;
   115	  }
   116	  for (const m of t.matchAll(WR_ENV_BEFORE)) {
   117	    if (WR_ENV_KNOWN.test(m[1]) || wrEnvMarked(m[1])) return m[1];
   118	  }
   119	  for (const m of t.matchAll(WR_ENV_PREP)) {
   120	    const w = wrEnvWord(m[2]);
   121	    if (WR_ENV_KNOWN.test(w) || (/^(?:to|into|na|do)$/i.test(m[1]) && wrEnvMarked(w))) return w;
   122	  }
   123	  return WR_ENV_ANY.test(t) ? '?' : null;
   124	}
   125	/**
   126	 * The pull request the user names (quoted: kept as written, validation withholds an odd one), else null (`gh pr merge`
   127	 * acts on the current branch's pull request). A number elsewhere in the request ("merge pr with 2 approvals", "merge the
   128	 * 2 open prs") is never the pull request; a request that names something the parser cannot read (`bob's`, `in repo v2`)
   129	 * is withheld (`?`, shown as `<PR>`), never a bare `gh pr merge`.
   130	 */
   131	function prSelector(ex) {
   132	  if (ex.urls[0] != null) return ex.urls[0];
   133	  const text = String(ex.text);
   134	  const m = text.match(PR_SELECTOR);
   135	  if (m) {
   136	    const quoted = m[2] ?? m[3] ?? m[4] ?? m[5];
   137	    if (quoted != null) return quoted || '?'; // `""`: named but empty, withheld
   138	    if (m[7] != null) return '?'; // an unclosed / odd quote: withheld
   139	    const w = m[6];
   140	    const branch = /\bbranch\s+$/i.test(m[1]);
   141	    // "merge my pr from 2 days ago", "view pr for 3 days": a number after a connective is not the pull request
   142	    if (PR_ISSUE.test(w)) return '?';
   143	    const rest = text.slice(m.index + m[0].length);
   144	    if (/^#?\d+$/.test(w) && PR_UNIT_AFTER.test(rest)) return '?';
    63	 *        lm: async (text, env, candidateIntents) -> {intent: p}, policy }
    64	 * -> suggest() result + { hybrid: { system, deferred, model, ms } }
    65	 */
    66	export async function suggestHybrid(query, opts = {}) {
    67	  const system = opts.system || 'A+B';
    68	  const env = opts.env || detectEnv({ shell: opts.shell, os: opts.os });
    69	  const base = { ...opts, env };
    70	  if (system === 'A') return { ...suggest(query, base), hybrid: { system, deferred: false } };
    71	  const P = { ...POLICY[system], ...(opts.policy || {}) };
    72	  // the policy's k candidates are re-ranked whatever --top displays (k = 0: B alone, no cascade candidates needed)
    73	  base.rerankTop = P.k;
    74	  let seen = null;
    75	  const first = suggest(query, { ...base, rerank: (c) => { seen = c; return c; } });
    76	  if (!seen || seen.confidence >= P.tau) return { ...first, hybrid: { system, deferred: false } };
    77	  const t0 = performance.now();
    78	  let pX; let pNone = 0; let tagger;
    79	  if (/B/.test(system)) {
    80	    if (!opts.encoder) return { ...first, hybrid: { system, deferred: false, unavailable: 'encoder' } };
    81	    const b = await opts.encoder.infer(query, env);
    82	    pX = b.intents;
    83	    pNone = b.pNone;
    84	    if (P.tagger === 'B') tagger = b.tagger;
    85	  } else {
    86	    if (!opts.lm) return { ...first, hybrid: { system, deferred: false, unavailable: 'lm' } };
    87	    pX = await opts.lm(query, env, seen.top.slice(0, P.k).map((t) => t.intent));
    88	    if (!pX) return { ...first, hybrid: { system, deferred: true, unavailable: 'lm' } };
    89	  }
    90	  const ms = performance.now() - t0;
    91	  const res = suggest(query, { ...base, tagger, rerank: (c, { thr }) => rerank(c, pX, P, { thr, pNone }) });
    92	  return { ...res, hybrid: { system, deferred: true, ms, pNone } };
    93	}
?? review/r22-claude.md
?? review/r22-codex.md

exec
/bin/bash -lc "node --input-type=module - <<'JS'
import {suggest} from './src/pipeline.js';
import {suggestHybrid} from './src/rerank/hybrid.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for (const q of ['deploy worker to prod-eu without --dry-run','deploy worker to production for a dry run only','deploy worker to preview2 as a dry run','deploy worker to \"qa\" dry run','merge pr number 45 from branch feature/x','merge PR #12, not #13','merge pr #12 instead of #13','merge pr #12 but do not merge it','merge pr \"feature/foo\" in \"org/repo\"']){const r=suggest(q,{env});console.log(JSON.stringify({q,cmd:r.command,missing:r.missing,intent:r.intent}));}
let calls=0; const r=await suggestHybrid('tell me a joke',{env,system:'A+B-safe',encoder:{infer:async()=>{calls++;return{intents:{git_status:1},pNone:0}}}});console.log('safe OOD',r.understood,r.hybrid,calls);
JS" in /workspace/tellsh
 succeeded in 142ms:
{"q":"deploy worker to prod-eu without --dry-run","cmd":"npx wrangler deploy --dry-run --env prod-eu","missing":[],"intent":"wrangler_deploy"}
{"q":"deploy worker to production for a dry run only","cmd":"npx wrangler deploy --dry-run --env production","missing":[],"intent":"wrangler_deploy"}
{"q":"deploy worker to preview2 as a dry run","cmd":"npx wrangler deploy --dry-run --env preview2","missing":[],"intent":"wrangler_deploy"}
{"q":"deploy worker to \"qa\" dry run","cmd":"npx wrangler deploy --dry-run","missing":[],"intent":"wrangler_deploy"}
{"q":"merge pr number 45 from branch feature/x","cmd":"gh pr merge 45","missing":[],"intent":"gh_pr_merge"}
{"q":"merge PR #12, not #13","cmd":"gh pr merge 12","missing":[],"intent":"gh_pr_merge"}
{"q":"merge pr #12 instead of #13","cmd":"gh pr merge 12","missing":[],"intent":"gh_pr_merge"}
{"q":"merge pr #12 but do not merge it","cmd":"gh pr merge 12","missing":[],"intent":"gh_pr_merge"}
{"q":"merge pr \"feature/foo\" in \"org/repo\"","cmd":"gh pr merge feature/foo --repo org/repo","missing":[],"intent":"gh_pr_merge"}
safe OOD false {
  system: 'A+B-safe',
  deferred: true,
  ms: 0.051233999999993785,
  pNone: 0
} 1

exec
/bin/bash -lc "node bin/tellsh.js --dry-run --shell bash 'deploy worker to \"preview2\"'" in /workspace/tellsh
 succeeded in 76ms:
$ npx wrangler deploy
  wrangler_deploy · bash/linux · risk: medium · confidence: 99%

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/compose.js src/tagger.js scripts/lib/silver.js scripts/teacher.js' in /workspace/tellsh
 succeeded in 0ms:
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
/bin/bash -lc "node --input-type=module - <<'JS'
import {suggest} from './src/pipeline.js';
for(const q of ['merge the pr that depends on https://github.com/acme/app/pull/12','merge the pr that replaces https://github.com/acme/app/pull/12','merge the pr that depends on pr 12','merge pr 45 after https://github.com/acme/app/pull/12','merge https://github.com/acme/app/pull/45']) {
const r=suggest(q,{shell:'bash',os:'linux'});console.log(JSON.stringify({q,intent:r.intent,cmd:r.command,missing:r.missing,understood:r.understood}));}
JS" in /workspace/tellsh
 succeeded in 200ms:
{"q":"merge the pr that depends on https://github.com/acme/app/pull/12","intent":"gh_pr_merge","cmd":"gh pr merge https://github.com/acme/app/pull/12","missing":[],"understood":true}
{"q":"merge the pr that replaces https://github.com/acme/app/pull/12","intent":"gh_pr_merge","cmd":"gh pr merge https://github.com/acme/app/pull/12","missing":[],"understood":true}
{"q":"merge the pr that depends on pr 12","intent":"gh_pr_merge","cmd":"gh pr merge <PR>","missing":["pr"],"understood":true}
{"q":"merge pr 45 after https://github.com/acme/app/pull/12","intent":"gh_pr_merge","cmd":"gh pr merge 45","missing":[],"understood":true}
{"q":"merge https://github.com/acme/app/pull/45","intent":"git_clone","cmd":"git clone https://github.com/acme/app/pull/45","missing":[],"understood":true}

exec
/bin/bash -lc "sed -n '130,170p' src/fill.js; sed -n '90,110p' src/fill.js; rg -n 'depends|replaces|ex.urls|qualified' test/regressions*test.js" in /workspace/tellsh
 succeeded in 0ms:
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
const PR_BRANCH_NAMED = /\b(?:for|of|on|from)\s+(?:\S+\s+){0,2}branch\b/i;
// wrangler deploy: "dry run", "--dry-run", "na sucho", "without (actually) deploying/publishing" (wrangler deploy --dry-run);
// "not a dry run", "without dry run", "skip the dry run": a real deploy, no flag
const WR_DRY = /\bdry[\s-]*run\b|\bna\s+sucho\b|\bwithout\s+(?:actually\s+)?(?:deploying|publishing|uploading)\b|\b(?:don'?t|do\s+not)\s+actually\s+(?:deploy|publish|upload)\b|\bbez\s+(?:faktycznego\s+)?(?:wdra[zż]ania|publikowania|deployu?)\b/i;
const WR_DRY_NOT = /\b(?:not|no|without|skip|skipping|nie|bez)\s+(?:a\s+|the\s+|any\s+)?dry[\s-]*run\b|\b(?:don'?t|do\s+not)\s+(?:do\s+)?(?:a\s+|the\s+)?dry[\s-]*run\b/i;
// the environment: "--env staging", "-e staging", "env staging", "to the staging environment", "to staging", "na produkcję";
// a name is taken only when it is a known one ("staging", "prod", ...) or a marked one ("staging-eu", "preview2", "qa_1"),
// as a whole word: "worker env", "with env vars", "env file", "my environment is set" never make up `--env worker/with/is`
// (the environment is withheld, `<WENV>`); a plain unknown word after "to" ("to cloudflare") is not an environment
const WR_ENV_OPT = /(?:^|\s)(?:--env|-e)(?:=|\s+)(\S+)/i;
const WR_ENV_AFTER = /\b(?:env|environment|środowisk\w*|srodowisk\w*)\s+(called\s+|named\s+|o\s+nazwie\s+)?(\S+)/gi;
const WR_ENV_BEFORE = /(?:^|\s)(\S+)\s+(?:env|environment)\b/gi;
const WR_ENV_PREP = /\b(to|on|in|into|na|do|w)\s+(?:the\s+|my\s+|our\s+)?(\S+)/gi;
const WR_ENV_KNOWN = /^(?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)$/i;
const WR_ENV_ANY = /\b(?:env|environment|środowisk\w*|srodowisk\w*|produkcj\w*|staging\w*)\b/i;
const wrEnvWord = (w) => String(w).replace(/[.,!?;:]+$/, '');
// a marked name: letters with a digit, '-' or '_' ("staging-eu", "preview2"), not "2-3" or "src/worker.js"
const wrEnvMarked = (w) => RAW_OK.wenv(w) && /[A-Za-z]/.test(w) && /[\d_-]/.test(w);
/** The wrangler environment a deploy request names: a name, `?` (named, not readable) or null (the default). */
function wranglerEnv(t) {
  const o = t.match(WR_ENV_OPT);
test/regressions20.test.js:85:test('major: a later `gh pr view` / `gh pr list` replaces an earlier pull request selector', () => {
test/regressions5.test.js:23:test('blocker: "same but" never replaces an ambiguous previous path with `.`', () => {

codex
- **Major — [src/fill.js:119](/workspace/tellsh/src/fill.js:119): Quoted deployment environments silently disappear.** `deploy worker to "preview2"` produces `npx wrangler deploy` with no missing slots; unquoted `preview2` correctly produces `--env preview2`. Reproduced for Bash, PowerShell, and cmd. This targets the default deployment instead of the requested environment. Decode quoted names before validation, or retain a missing-environment placeholder.

- **Major — [src/fill.js:132](/workspace/tellsh/src/fill.js:132): A related PR’s URL becomes the merge target.** `merge the pr that depends on https://github.com/acme/app/pull/12` produces `gh pr merge https://github.com/acme/app/pull/12` with no missing slots. The unconditional URL return bypasses the qualified-request checks and selects the dependency itself. Accept URLs only when they identify the requested PR; otherwise withhold the selector.

Both reproduced with read-only probes. Subprocess `EPERM` errors limited regression testing; training scripts were inspected without running training.

VERDICT: REQUEST_CHANGES
tokens used
183,161
- **Major — [src/fill.js:119](/workspace/tellsh/src/fill.js:119): Quoted deployment environments silently disappear.** `deploy worker to "preview2"` produces `npx wrangler deploy` with no missing slots; unquoted `preview2` correctly produces `--env preview2`. Reproduced for Bash, PowerShell, and cmd. This targets the default deployment instead of the requested environment. Decode quoted names before validation, or retain a missing-environment placeholder.

- **Major — [src/fill.js:132](/workspace/tellsh/src/fill.js:132): A related PR’s URL becomes the merge target.** `merge the pr that depends on https://github.com/acme/app/pull/12` produces `gh pr merge https://github.com/acme/app/pull/12` with no missing slots. The unconditional URL return bypasses the qualified-request checks and selects the dependency itself. Accept URLs only when they identify the requested PR; otherwise withhold the selector.

Both reproduced with read-only probes. Subprocess `EPERM` errors limited regression testing; training scripts were inspected without running training.

VERDICT: REQUEST_CHANGES
