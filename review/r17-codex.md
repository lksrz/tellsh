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
session id: 01a129a8-bb69-7d23-a57f-cce7f372189f
--------
user
Re-review of tellsh (git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD; runtime src/ bin/, training scripts). History refs are intentionally limited to 1 line back. Read-only. Findings with severity and file:line. End with exactly one line that is either VERDICT: APPROVE (no blocker/major) or VERDICT: REQUEST_CHANGES.
codex
I’ll review the diff, trace the affected runtime and training paths, and report actionable findings with severity and file:line references. I’ll keep the review read-only and use only the specified history range.
exec
/bin/bash -lc "pwd && rg --files -g 'AGENTS.md' -g '*train*' -g 'package.json' -g 'pyproject.toml' -g 'Cargo.toml' -g 'go.mod' -g 'requirements*' -g 'Makefile' -g 'README*' -g '*test*' -g '*spec*' && git status --short && git diff --stat 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD" in /workspace/tellsh
 succeeded in 0ms:
/workspace/tellsh
test/regressions6.test.js
test/regressions14.test.js
test/regressions3-render.test.js
test/regressions9.test.js
test/regressions13.test.js
test/regressions18.test.js
test/regressions.test.js
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
test/slots.test.js
test/templates.test.js
README.md
package.json
data/shell/train.jsonl
data/tldr/README.md
scripts/train.py
hybrid/package/tellsh-model-enc/README.md
hybrid/package/tellsh-model-enc/package.json
scripts/hybrid/train_a_dev.sh
scripts/hybrid/train_encoder.py
scripts/hybrid/train_lm_gpu.py
?? review/r17-claude.md
?? review/r17-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   510 +-
 HYBRID.md                                    |   610 ++
 README.md                                    |   168 +-
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
 review/r10-codex.md                          |  8707 ++++++++++++++++++++
 review/r11-claude.md                         |    53 +
 review/r11-codex.md                          |  9592 ++++++++++++++++++++++
 review/r12-claude.md                         |    37 +
 review/r12-codex.md                          | 10887 +++++++++++++++++++++++++
 review/r13-claude.md                         |    37 +
 review/r13-codex.md                          |  7148 ++++++++++++++++
 review/r14-claude.md                         |    34 +
 review/r14-codex.md                          |  9586 ++++++++++++++++++++++
 review/r15-claude.md                         |    35 +
 review/r15-codex.md                          |  9479 +++++++++++++++++++++
 review/r16-claude.md                         |    39 +
 review/r16-codex.md                          |  9975 ++++++++++++++++++++++
 review/r2-claude.md                          |    84 +
 review/r2-codex.md                           |  8616 +++++++++++++++++++
 review/r3-claude.md                          |    63 +
 review/r3-codex.md                           |  8281 +++++++++++++++++++
 review/r4-claude.md                          |    57 +
 review/r4-codex.md                           |  9505 +++++++++++++++++++++
 review/r5-claude.md                          |    46 +
 review/r5-codex.md                           |  9090 +++++++++++++++++++++
 review/r6-claude.md                          |    60 +
 review/r6-codex.md                           | 10443 ++++++++++++++++++++++++
 review/r7-claude.md                          |    48 +
 review/r7-codex.md                           | 10037 +++++++++++++++++++++++
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
 src/fill.js                                  |   166 +-
 src/history.js                               |   977 ++-
 src/model.js                                 |    22 +-
 src/pipeline.js                              |   436 +-
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
 test/regressions17.test.js                   |    65 +
 test/regressions18.test.js                   |    61 +
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
 205 files changed, 189881 insertions(+), 805 deletions(-)

exec
/bin/bash -lc 'ls -la /workspace && rg --files src bin scripts && cat package.json && cat test/regressions18.test.js && cat review/fix16-log.md' in /workspace/tellsh
 succeeded in 0ms:
total 19440
drwxr-xr-x  1 box    box      49152 Oct 11 08:26 .
drwxr-xr-x  1 nobody nogroup   4096 Oct 10 02:52 ..
drwxr-xr-x  2 box    box      40960 Oct 10 02:27 .playwright-mcp
drwxr-xr-x  5 box    box       4096 Oct 10 13:55 .venv-wf
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 2dynamic-www
drwxr-xr-x  7 box    box       4096 Oct 10 02:29 2dynamic-www-repo
-rw-r--r--  1 box    box      15350 Oct 10 02:23 Lumencraft-Community-Solutions-Guide.md
-rw-r--r--  1 box    box     201338 Oct 10 02:29 Zaswiadczenie-o-posiadaniu-rachunku.pdf
-rw-r--r--  1 box    box       1186 Oct 10 02:25 _ar_abort_state.json
-rw-r--r--  1 box    box      13084 Oct 10 02:25 _ar_before_raw.json
-rw-r--r--  1 box    box        557 Oct 10 02:25 _ar_correction_plan.json
drwxr-xr-x  2 box    box      24576 Oct 11 08:19 agent-tools
drwxr-xr-x  2 box    box       4096 Oct 11 01:02 aic-agent-upgrade
-rw-r--r--  1 box    box       1138 Oct 10 02:23 aic-apply-harness-grok.py
drwxr-xr-x  5 box    box       4096 Oct 10 02:29 aic-box-wording-2026-10-08
-rw-r--r--  1 box    box       1815 Oct 10 02:29 aic-checkout-diagnosis-2026-10-08.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:14 aic-ci-audit-2026-10-06
drwxr-xr-x 11 box    box       4096 Oct 10 02:29 aic-deploy-2026-09-24
drwxr-xr-x  5 box    box       4096 Oct 10 02:29 aic-funnel-2026-10-08
drwxr-xr-x  2 box    box       4096 Oct 10 02:21 aic-glama-commit
drwxr-xr-x  2 box    box       4096 Oct 10 02:22 aic-growth-2026-09-07
drwxr-xr-x  3 box    box       4096 Oct 10 02:23 aic-growth-2026-09-21
drwxr-xr-x  5 box    box       4096 Oct 10 02:24 aic-growth-2026-09-23
drwxr-xr-x  3 box    box       4096 Oct 10 02:14 aic-growth-2026-09-24
drwxr-xr-x 12 box    box       4096 Oct 10 02:25 aic-growth-2026-09-25
drwxr-xr-x  3 box    box       4096 Oct 10 02:14 aic-growth-2026-09-28
drwxr-xr-x 11 box    box       4096 Oct 10 02:25 aic-growth-2026-09-28-morning
drwxr-xr-x  3 box    box       4096 Oct 10 02:14 aic-growth-2026-09-29
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 aic-growth-2026-09-30
drwxr-xr-x  3 box    box       4096 Oct 10 02:14 aic-growth-2026-10-01-morning
drwxr-xr-x  3 box    box       4096 Oct 10 02:27 aic-growth-2026-10-02
drwxr-xr-x  3 box    box       4096 Oct 10 02:27 aic-growth-2026-10-04
drwxr-xr-x  3 box    box       4096 Oct 10 02:14 aic-growth-2026-10-05-morning
drwxr-xr-x  3 box    box       4096 Oct 10 02:27 aic-growth-2026-10-05-whip-b
drwxr-xr-x  4 box    box       4096 Oct 10 02:27 aic-growth-2026-10-06-morning
drwxr-xr-x  4 box    box       4096 Oct 10 02:28 aic-growth-2026-10-07-morning
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 aic-growth-2026-10-08-morning
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 aic-gsc-2026-10-05
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 aic-home-messaging-2026-10-07
drwxr-xr-x  3 box    box       4096 Oct 10 02:27 aic-pr87-review
drwxr-xr-x  4 box    box       4096 Oct 10 02:23 aic-pr93
drwxr-xr-x  4 box    box       4096 Oct 10 02:23 aic-pr94
-rw-r--r--  1 box    box       5697 Oct 10 02:25 aic-probe-2026-09-28.txt
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 aic-scrape
drwxr-xr-x  2 box    box       4096 Oct 10 02:21 aic-submit
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 aic-support-2026-09-27-glama-test-profile
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 aic-support-2026-09-27-glama-unhealthy
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 aic-support-2026-09-27-mirror-pat
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 aic-support-2026-09-27-windows-installer
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 aic-support-2026-10-09-farid
drwxr-xr-x  3 box    box       4096 Oct 10 02:14 aic-windsurf
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 aic-with-cursor-check
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 aic-with-tailscale-2026-10-08
drwxr-xr-x 12 box    box       4096 Oct 10 13:06 aicommander
drwxr-xr-x 11 box    box       4096 Oct 10 02:27 aicommander-osv
drwxr-xr-x  4 box    box       4096 Oct 10 02:25 ar-metering
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 armcp-564
drwxr-xr-x  4 box    box       4096 Oct 10 02:21 awesome-mcp-servers
drwxr-xr-x  3 box    box       4096 Oct 10 02:23 bb-review
-rw-r--r--  1 box    box       1618 Oct 10 02:22 bd_live_commercial.err
-rw-r--r--  1 box    box      61433 Oct 10 02:22 bd_live_commercial.json
-rw-r--r--  1 box    box      14293 Oct 10 02:22 bd_live_commercial.py
drwxr-xr-x  9 box    box       4096 Oct 10 02:29 blog-migration-2026-10-07
drwxr-xr-x  5 box    box       4096 Oct 10 02:29 blog-migration-2026-10-08
-rw-r--r--  1 box    box       8000 Oct 10 02:23 bybit-b64-part-aa
-rw-r--r--  1 box    box       8000 Oct 10 02:23 bybit-b64-part-ab
-rw-r--r--  1 box    box       5448 Oct 10 02:23 bybit-b64-part-ac
-rw-r--r--  1 box    box      76145 Oct 10 02:23 bybit-files.json
-rw-r--r--  1 box    box      25000 Oct 10 02:23 bybit-json-part-aa
-rw-r--r--  1 box    box      25000 Oct 10 02:23 bybit-json-part-ab
-rw-r--r--  1 box    box      25000 Oct 10 02:23 bybit-json-part-ac
-rw-r--r--  1 box    box       1145 Oct 10 02:23 bybit-json-part-ad
drwxr-xr-x  4 box    box       4096 Oct 10 02:23 bybit-live-build
-rw-r--r--  1 box    box      21448 Oct 10 02:23 bybit-live-build.b64
-rw-r--r--  1 box    box      16085 Oct 10 02:23 bybit-live-build.tgz
-rw-r--r--  1 box    box     189908 Oct 10 02:23 c_pdzixu3.json
-rw-r--r--  1 box    box     189908 Oct 10 02:23 c_pdzkcsb.json
-rw-r--r--  1 box    box     189908 Oct 10 02:23 c_pdzr0c9.json
-rw-r--r--  1 box    box     189908 Oct 10 02:23 c_pe1286k.json
-rw-r--r--  1 box    box     189908 Oct 10 02:23 c_pe14svs.json
-rw-r--r--  1 box    box     189908 Oct 10 02:23 c_pe17al2.json
drwxr-xr-x 12 box    box       4096 Oct 10 02:14 catchup-2026-10-01
-rw-r--r--  1 box    box        445 Oct 10 02:27 cf-auth-login.log
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 cf-cost-guard-fix-2026-10-09
-rw-r--r--  1 box    box       3840 Oct 10 02:21 cf-health-2026-09-01.md
-rwxr-xr-x  1 box    box        144 Oct 10 02:15 check-clis.sh
-rw-r--r--  1 box    box        127 Oct 10 02:21 check_pg.py
-rw-r--r--  1 box    box       2597 Oct 10 02:27 ci-fix-aicommander-osv-2026-10-07.md
-rw-r--r--  1 box    box       2233 Oct 10 02:27 ci-fixes-maxcv-hours-2026-10-06.md
-rw-r--r--  1 box    box       1870 Oct 10 02:27 ci-fixes-planets-freesign-2026-10-06.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 ci-review-logs
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-4h-2026-10-01-1701
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-ambush
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-arena
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-asteroids
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-bank
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-boosters
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-bounty
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-callsign
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-cargo
drwxr-xr-x  2 box    box       4096 Oct 10 02:24 clashroids-clip-landing
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 clashroids-comms
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-controls
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-convoy
drwxr-xr-x  2 box    box       4096 Oct 10 02:24 clashroids-curator-kit
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-dogfight
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-domination
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-drone
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 clashroids-energy
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-escort
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-extract
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-faq
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-fleet
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-fortress
-rw-r--r--  1 box    box     162809 Oct 10 02:22 clashroids-game.png
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 clashroids-gamepad
drwxr-xr-x  2 box    box       4096 Oct 10 14:09 clashroids-growth
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-hangar
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-heist
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-hex
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-hotbar
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-hotkeys
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-intercept
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-invite
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-leaderboard
drwxr-xr-x  2 box    box       4096 Oct 10 02:24 clashroids-media-kit
-rw-r--r--  1 box    box     690896 Oct 10 02:21 clashroids-menu-steam-badge-full.png
-rw-r--r--  1 box    box       3209 Oct 10 02:21 clashroids-menu-steam-badge-new.png
-rw-r--r--  1 box    box     431459 Oct 10 02:21 clashroids-menu-steam-badge.png
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-mines
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-mining
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 clashroids-mobile
drwxr-xr-x  2 box    box       4096 Oct 10 02:24 clashroids-modes
drwxr-xr-x  5 box    box       4096 Oct 10 14:09 clashroids-pages-proxy
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 clashroids-points
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-powerups
drwxr-xr-x  2 box    box       4096 Oct 10 02:24 clashroids-quickstart
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-radar
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-raid
drwxr-xr-x  2 box    box       4096 Oct 10 02:28 clashroids-rank
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-recontest
-rw-r--r--  1 box    box       2400 Oct 10 02:21 clashroids-reddit-ads.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-respawn
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-revenge
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 clashroids-roadmap
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 clashroids-rounds
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-salvage
-rw-r--r--  1 box    box       2211 Oct 10 02:21 clashroids-scout-discord-rest.csv
-rw-r--r--  1 box    box       6086 Oct 10 02:21 clashroids-scout-mylist.csv
-rw-r--r--  1 box    box       1825 Oct 10 02:21 clashroids-scout-wave1-emails.csv
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-scrap
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 clashroids-share-hub
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-shields
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-ships
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-skins
-rw-r--r--  1 box    box       6815 Oct 10 02:21 clashroids-steam-0.91.md
-rw-r--r--  1 box    box       1844 Oct 10 02:21 clashroids-steam-announcement.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 clashroids-streak
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 clashroids-team-clash
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-tips
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-turrets
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-unlock
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-victory
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 clashroids-warp
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 clashroids-wishlist-landing
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 clashroids-wormhole
-rw-r--r--  1 box    box     601727 Oct 10 02:21 clashroids_cover.jpg
-rw-r--r--  1 box    box       3604 Oct 10 02:21 clashroids_menu.png
-rw-r--r--  1 box    box      27608 Oct 10 02:15 cli-inventory.txt
-rw-r--r--  1 box    box         19 Oct 10 02:14 cli_names.txt
-rw-r--r--  1 box    box     373707 Oct 10 02:25 community-main.js
-rw-r--r--  1 box    box       1613 Oct 10 02:23 context-check-2026-09-17-0959.json
-rw-r--r--  1 box    box        881 Oct 10 02:23 context-check-2026-09-17-1359.json
-rw-r--r--  1 box    box       1077 Oct 10 02:23 context-check-2026-09-17-1759.json
-rw-r--r--  1 box    box       2178 Oct 10 02:23 context-check-2026-09-18-0959-sigalor.json
-rw-r--r--  1 box    box       2171 Oct 10 02:23 context-check-2026-09-18-0959.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 context-check-2026-09-18-1359
-rw-r--r--  1 box    box       2413 Oct 10 02:23 context-check-2026-09-18-1359.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 context-check-2026-09-18-1759
-rw-r--r--  1 box    box       3295 Oct 10 02:23 context-check-2026-09-18-1759.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 context-check-2026-09-21-0959
-rw-r--r--  1 box    box       4599 Oct 10 02:23 context-check-2026-09-21-0959.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 context-check-2026-09-21-1359
-rw-r--r--  1 box    box       3446 Oct 10 02:23 context-check-2026-09-21-1359-browser.json
-rw-r--r--  1 box    box       2872 Oct 10 02:23 context-check-2026-09-21-1359.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 context-check-2026-09-21-1759
-rw-r--r--  1 box    box       3362 Oct 10 02:23 context-check-2026-09-21-1759.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 context-check-2026-09-22-0959
-rw-r--r--  1 box    box       3372 Oct 10 02:23 context-check-2026-09-22-0959.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 context-check-2026-09-22-1359
drwxr-xr-x  2 box    box       4096 Oct 10 02:24 context-check-2026-09-22-1759
drwxr-xr-x  2 box    box       4096 Oct 10 02:24 context-check-2026-09-23-0959
-rw-r--r--  1 box    box       7374 Oct 10 02:24 context-check-2026-09-23-0959.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:24 context-check-2026-09-23-1359
-rw-r--r--  1 box    box      13869 Oct 10 02:24 context-check-2026-09-23-1359.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-23-1759
-rw-r--r--  1 box    box      16119 Oct 10 02:24 context-check-2026-09-23-1759.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-24-0959
-rw-r--r--  1 box    box      16459 Oct 10 02:25 context-check-2026-09-24-0959.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-24-1359
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-24-1759
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-25-0959
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-25-1359
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-25-1759
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-28-0959
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-28-1359
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-28-1759
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-29-0959
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-29-1359
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-29-1759
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-30-0959
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 context-check-2026-09-30-1359
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 context-check-2026-09-30-1759
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 context-check-2026-10-01-0959
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 context-check-2026-10-01-1359
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 context-check-2026-10-01-1759
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 context-check-2026-10-02-0959
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 context-check-2026-10-02-1359
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 context-check-2026-10-02-1759
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 context-check-2026-10-05-0959
-rwxr-xr-x  1 box    box        238 Oct 10 02:15 cpinv.sh
-rw-r--r--  1 box    box      26421 Oct 10 02:21 cr.html
-rw-r--r--  1 box    box       1456 Oct 10 02:22 crm-inspection-4h-2026-09-07.json
-rw-r--r--  1 box    box       1520 Oct 10 02:23 crm-inspection-4h-2026-09-08-1659.json
-rw-r--r--  1 box    box       1843 Oct 10 02:23 crm-inspection-4h-2026-09-08.json
-rw-r--r--  1 box    box       1375 Oct 10 02:22 crm-inspection-after-removals.json
-rw-r--r--  1 box    box       2986 Oct 10 02:22 crm-removals-plan.json
-rw-r--r--  1 box    box       1152 Oct 10 02:22 crm-removals-plan.md
-rw-r--r--  1 box    box        165 Oct 10 02:22 crm-robots-body.txt
-rw-r--r--  1 box    box       9408 Oct 10 02:22 crm-wearfits-gsc.json
-rw-r--r--  1 box    box        592 Oct 10 02:22 crm-wearfits-robots-draft.txt
drwxr-xr-x 10 box    box       4096 Oct 10 02:29 ct-landing-2026-10-08
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 ct-landing-review-2026-10-08
-rw-r--r--  1 box    box       1167 Oct 10 02:23 cuero_uninstall_reason.json
-rw-r--r--  1 box    box      30411 Oct 10 02:15 demand-live-pages.json
-rw-r--r--  1 box    box      94056 Oct 10 02:15 demand-no-clicks.json
-rw-r--r--  1 box    box      26396 Oct 10 02:15 demand-no-clicks.md
drwxr-xr-x  5 box    box       4096 Oct 10 02:15 deploys
-rw-r--r--  1 box    box      21879 Oct 10 02:29 dk.json
-rwxr-xr-x  1 box    box       1205 Oct 10 02:15 do_install.sh
-rw-r--r--  1 box    box     244647 Oct 10 02:29 dokument-bez-hasla.pdf
-rw-r--r--  1 box    box       4654 Oct 10 02:15 domain-repo-map.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:21 downloads
-rwxr-xr-x  1 box    box        757 Oct 10 02:15 ensure-aicommander-agent.sh
-rw-r--r--  1 box    box        154 Oct 10 02:21 epoch.py
-rw-r--r--  1 box    box         33 Oct 10 02:23 ev-Follow.json
-rw-r--r--  1 box    box         33 Oct 10 02:23 ev-Peek.json
-rw-r--r--  1 box    box         33 Oct 10 02:23 ev-Split.json
-rw-r--r--  1 box    box         33 Oct 10 02:23 ev-Stats.json
-rw-r--r--  1 box    box      42506 Oct 10 02:25 ev-list.json
-rw-r--r--  1 box    box      60833 Oct 10 02:25 eventcomments.html
-rw-r--r--  1 box    box       2209 Oct 10 02:21 explore_saas.py
-rw-r--r--  1 box    box       2209 Oct 10 02:21 explore_saas2.py
-rw-r--r--  1 box    box       2165 Oct 10 02:21 explore_saas3.py
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 exports
-rw-r--r--  1 box    box        942 Oct 10 02:21 f2.py
-rw-r--r--  1 box    box        703 Oct 10 02:21 f3.py
-rw-r--r--  1 box    box       1165 Oct 10 02:21 f4.py
-rw-r--r--  1 box    box       1837 Oct 10 02:21 f5.py
-rw-r--r--  1 box    box       7799 Oct 10 02:27 fails.tsv
drwxr-xr-x  6 box    box       4096 Oct 10 02:15 faktury
-rw-r--r--  1 box    box      35340 Oct 10 02:22 fbx-operational-raw.b64
-rw-r--r--  1 box    box      35377 Oct 10 02:22 fbx-operational-raw.json
-rw-r--r--  1 box    box       4690 Oct 10 02:22 fbx-operational.ics
-rw-r--r--  1 box    box       1106 Oct 10 02:21 fetch.py
-rw-r--r--  1 box    box      17814 Oct 10 02:21 fetch_gsc.py
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 file-cmds
drwxr-xr-x  5 box    box       4096 Oct 10 02:29 fittingbox-glb-2026-10-08
-rw-r--r--  1 box    box       3205 Oct 10 02:21 fly-health-2026-09-01.md
-rw-r--r--  1 box    box      34876 Oct 10 02:27 fly_logs.txt
-rw-r--r--  1 box    box       2528 Oct 10 02:27 fly_out.txt
-rw-r--r--  1 box    box      71205 Oct 10 02:29 forum.html
drwxr-xr-x 12 box    box       4096 Oct 10 02:27 freesign
drwxr-xr-x 11 box    box       4096 Oct 10 02:29 funnel-ship-2026-10-08
drwxr-xr-x  9 box    box       4096 Oct 10 02:29 ga4-conv-2026-10-08
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 ga4-conversions-2026-10-08
-rw-r--r--  1 box    box      17286 Oct 10 02:23 ga4-gsc-2026-09-11.json
-rw-r--r--  1 box    box      10985 Oct 10 02:23 ga4_gsc_2026_09_10.py
-rw-r--r--  1 box    box      10971 Oct 10 02:22 ga4_gsc_daily.py
-rw-r--r--  1 box    box       6858 Oct 10 02:22 ga4_gsc_mon_sep7.py
-rw-r--r--  1 box    box       2530 Oct 10 02:22 ga4_gsc_pulse.py
drwxr-xr-x 13 box    box       4096 Oct 10 02:29 ga4fix-genai-app
-rw-r--r--  1 box    box         16 Oct 10 02:21 gcloud-login.holdpid
-rw-r--r--  1 box    box       1109 Oct 10 02:21 gcloud-login.out
-rwxr-xr-x  1 box    box        163 Oct 10 02:21 gcloud_device_login.sh
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 gcp-billing
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 gcpbill
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 genai-banana-ab-2026-10-07
-rw-r--r--  1 box    box      11726 Oct 10 02:28 genai-banana-vs-flash-2026-10-07.md
drwxr-xr-x  2 box    box       4096 Oct 10 17:32 genai-key-rotation-2026-10-10
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 gh-actions-audit
-rw-r--r--  1 box    box       7999 Oct 10 02:29 gh-actions-burn-lksrz-2026-10-07.md
drwxr-xr-x  5 box    box       4096 Oct 10 02:23 gh-actions-throttle-2026-10-07
-rw-r--r--  1 box    box       3460 Oct 10 02:29 gh-actions-throttle-2026-10-07.md
-rw-r--r--  1 box    box       2942 Oct 10 02:27 gh-ci-status-2026-10-07.md
-rw-r--r--  1 box    box       3395 Oct 10 02:22 gh-detail.py
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 gh-health
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 gh-health-2026-10-01
-rw-r--r--  1 box    box       1895 Oct 10 02:22 gh-health-scan.py
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 ghhealth
-rw-r--r--  1 box    box       4358 Oct 10 02:27 github-ci-red-2026-10-06.md
-rw-r--r--  1 box    box       3462 Oct 10 02:21 github-daily-health-2026-08-31.txt
-rw-r--r--  1 box    box       1947 Oct 10 02:23 github-daily-health-2026-09-15.txt
-rw-r--r--  1 box    box       2075 Oct 10 02:23 github-daily-health-2026-09-17.txt
-rw-r--r--  1 box    box       3051 Oct 10 02:27 github-daily-health-2026-10-01.txt
-rw-r--r--  1 box    box        136 Oct 10 02:21 glama.json
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 gnl
-rw-r--r--  1 box    box        669 Oct 10 02:22 grab.js
-rw-r--r--  1 box    box        528 Oct 10 02:22 grab2.js
drwxr-xr-x  3 box    box       4096 Oct 10 02:23 growth-2026-09-21
drwxr-xr-x  3 box    box       4096 Oct 10 02:24 growth-2026-09-22
drwxr-xr-x  5 box    box       4096 Oct 10 02:24 growth-2026-09-23
drwxr-xr-x  7 box    box       4096 Oct 10 02:25 growth-2026-09-24
drwxr-xr-x  7 box    box       4096 Oct 10 02:25 growth-2026-09-25
drwxr-xr-x  7 box    box       4096 Oct 10 02:25 growth-2026-09-28
drwxr-xr-x  7 box    box       4096 Oct 10 02:25 growth-2026-09-29
drwxr-xr-x  7 box    box       4096 Oct 10 02:26 growth-2026-09-30
drwxr-xr-x  7 box    box       4096 Oct 10 02:27 growth-2026-10-01
drwxr-xr-x  7 box    box       4096 Oct 10 02:27 growth-2026-10-02
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 growth-2026-10-05
drwxr-xr-x  7 box    box       4096 Oct 10 02:27 growth-2026-10-06
drwxr-xr-x  6 box    box       4096 Oct 10 02:29 growth-2026-10-07
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 growth-2026-10-08
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 growth-config
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 growth-reorg-2026-10-09
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 growth-reviews
drwxr-xr-x  8 box    box       4096 Oct 10 02:29 growth-runs
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 growth-tools
-rw-r--r--  1 box    box     272920 Oct 10 02:15 gsc-four-sites-by-impressions.json
-rw-r--r--  1 box    box      61263 Oct 10 02:15 gsc-four-sites-raw.json
-rw-r--r--  1 box    box      16849 Oct 10 02:15 gsc-page-queries-by-imp.json
-rw-r--r--  1 box    box      26898 Oct 10 02:15 gsc-page-queries.json
-rw-r--r--  1 box    box      60669 Oct 10 02:15 gsc-portfolio.json
-rw-r--r--  1 box    box       7640 Oct 10 02:15 gsc-portfolio.md
-rw-r--r--  1 box    box       3001 Oct 10 02:21 gsc_daily.py
-rw-r--r--  1 box    box       4982 Oct 10 02:22 gsc_full_sep2.py
-rw-r--r--  1 box    box       2470 Oct 10 02:14 gsc_relist.py
-rw-r--r--  1 box    box       2979 Oct 10 02:22 gsc_sep2.py
-rw-r--r--  1 box    box       5261 Oct 10 02:21 gsc_thu.py
drwxr-xr-x  2 box    box       4096 Oct 10 02:21 h1-probe
-rw-r--r--  1 box    box       4761 Oct 10 02:22 hakoun-0809-invite.ics
-rw-r--r--  1 box    box        561 Oct 10 02:22 hakoun-0809-rsvp-accepted.ics
-rw-r--r--  1 box    box       4761 Oct 10 02:22 hakoun-invite.ics
-rw-r--r--  1 box    box         12 Oct 10 02:21 hello.py
drwxr-xr-x  4 box    box       4096 Oct 10 02:22 hf-cache
-rw-r--r--  1 box    box       1640 Oct 10 02:23 hn_scan.py
-rw-r--r--  1 box    box       1871 Oct 10 02:23 hn_scan2.py
-rw-r--r--  1 box    box       1406 Oct 10 02:23 hn_scan3.py
-rw-r--r--  1 box    box      10591 Oct 10 02:23 hot-hooks-dryrun-2026-09-18.json
drwxr-xr-x 10 box    box       4096 Oct 10 02:27 hours
-rw-r--r--  1 box    box       1789 Oct 10 02:27 hours-ci-fix-notes.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 infra-gsc-2026-10-05
-rw-r--r--  1 box    box        465 Oct 10 02:23 install-bybit-live.sh
-rw-r--r--  1 box    box        319 Oct 10 02:14 inv_list.py
-rw-r--r--  1 box    box       4340 Oct 10 02:22 invite.ics
-rw-r--r--  1 box    box       2219 Oct 10 02:21 jhealth.py
-rw-r--r--  1 box    box       2977 Oct 10 02:22 joverlap.py
-rw-r--r--  1 box    box       1411 Oct 10 02:22 jpeek.py
-rw-r--r--  1 box    box       1550 Oct 10 02:22 jpeek2.py
-rw-r--r--  1 box    box        170 Oct 10 02:21 jstat.py
-rw-r--r--  1 box    box       9068 Oct 10 02:21 july-1x-vs-3x-now.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:21 july-aug20-scan
-rw-r--r--  1 box    box       9983 Oct 10 02:21 july-aug20-scan.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:21 july-backlog
-rw-r--r--  1 box    box       7202 Oct 10 02:23 july-cover-shannon-results.json
-rw-r--r--  1 box    box      12239 Oct 10 02:23 july-cover-shannon.md
-rw-r--r--  1 box    box       3186 Oct 10 02:21 july-deploy-2026-08-20.md
-rw-r--r--  1 box    box       4422 Oct 10 02:22 july-dry-1x-hygiene.py
-rw-r--r--  1 box    box       4145 Oct 10 02:22 july-dry-parity-diag.md
-rw-r--r--  1 box    box       9999 Oct 10 02:21 july-dry-vs-1x-overlap.md
-rw-r--r--  1 box    box       3051 Oct 10 02:21 july-dual-track-plan.md
-rw-r--r--  1 box    box      23035 Oct 10 02:21 july-eu-spot-venues.md
-rw-r--r--  1 box    box       2138 Oct 10 02:23 july-financedatabase-install.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:21 july-gate-carry
-rw-r--r--  1 box    box       9731 Oct 10 02:21 july-gate-carry-report.md
-rw-r--r--  1 box    box      24466 Oct 10 02:21 july-h1-delisting-probe.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:21 july-h14
drwxr-xr-x  2 box    box       4096 Oct 10 02:21 july-h2-5m
-rw-r--r--  1 box    box      12404 Oct 10 02:21 july-h2-5m-report.md
-rw-r--r--  1 box    box      14046 Oct 10 02:21 july-h3-overhang-probe.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:21 july-h5-h6
-rw-r--r--  1 box    box      11510 Oct 10 02:21 july-h5-h6-report.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:21 july-hl-bybit
-rw-r--r--  1 box    box      19291 Oct 10 02:21 july-hl-bybit-report.md
-rw-r--r--  1 box    box       1547 Oct 10 02:23 july-hl-usdc-2026-09-09.md
-rw-r--r--  1 box    box      12716 Oct 10 02:21 july-idea-batch.md
-rw-r--r--  1 box    box      14050 Oct 10 02:21 july-idea-batch2.md
-rw-r--r--  1 box    box       2121 Oct 10 02:21 july-live-1000-checklist.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:21 july-maker-probe
-rw-r--r--  1 box    box      15934 Oct 10 02:21 july-maker-probe.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:23 july-ml-conservative-reprobe
-rw-r--r--  1 box    box      22896 Oct 10 02:23 july-ml-conservative-reprobe-metrics.json
-rw-r--r--  1 box    box       5368 Oct 10 02:23 july-ml-conservative-reprobe.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:23 july-ml-large-sample-probe
-rw-r--r--  1 box    box       4406 Oct 10 02:23 july-ml-large-sample-probe.md
-rw-r--r--  1 box    box       5907 Oct 10 02:23 july-ml-mtf4h-ceiling.md
-rw-r--r--  1 box    box       5373 Oct 10 02:23 july-ml-research-ceiling.md
drwxr-xr-x  8 box    box       4096 Oct 10 02:23 july-ml-strength
-rw-r--r--  1 box    box       5946 Oct 10 02:23 july-ml-strength-batch.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 july-ml-strength10
-rw-r--r--  1 box    box        218 Oct 10 02:23 july-ml-strength10-batch.md
drwxr-xr-x  7 box    box       4096 Oct 10 02:29 july-ml-strength2
-rw-r--r--  1 box    box       6191 Oct 10 02:23 july-ml-strength2-batch.md
drwxr-xr-x  8 box    box       4096 Oct 10 02:29 july-ml-strength3
-rw-r--r--  1 box    box       5508 Oct 10 02:23 july-ml-strength3-batch.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 july-ml-strength4
-rw-r--r--  1 box    box       3318 Oct 10 02:23 july-ml-strength4-batch.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 july-ml-strength5
-rw-r--r--  1 box    box       1765 Oct 10 02:23 july-ml-strength5-batch.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 july-ml-strength6
-rw-r--r--  1 box    box        649 Oct 10 02:23 july-ml-strength6-batch.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 july-ml-strength7
-rw-r--r--  1 box    box        311 Oct 10 02:23 july-ml-strength7-batch.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 july-ml-strength8
-rw-r--r--  1 box    box        254 Oct 10 02:23 july-ml-strength8-batch.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 july-ml-strength9
-rw-r--r--  1 box    box        215 Oct 10 02:23 july-ml-strength9-batch.md
drwxr-xr-x  6 box    box       4096 Oct 10 02:23 july-ml-w7a-dry
drwxr-xr-x  4 box    box       4096 Oct 10 02:23 july-ml-wave2
-rw-r--r--  1 box    box       4080 Oct 10 02:23 july-ml-wave2-batch.md
drwxr-xr-x  4 box    box       4096 Oct 10 02:23 july-ml-wave3
-rw-r--r--  1 box    box       3042 Oct 10 02:23 july-ml-wave3-batch.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:23 july-ml-wave3b
-rw-r--r--  1 box    box       3109 Oct 10 02:23 july-ml-wave3b-batch.md
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 july-ml-wave4
-rw-r--r--  1 box    box       2462 Oct 10 02:23 july-ml-wave4-batch.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:23 july-ml-wave4b
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 july-ml-wave5
-rw-r--r--  1 box    box       1509 Oct 10 02:23 july-ml-wave5-batch.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:23 july-ml-wave6
-rw-r--r--  1 box    box       1523 Oct 10 02:23 july-ml-wave6-batch.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:23 july-ml-wave7
-rw-r--r--  1 box    box        799 Oct 10 02:23 july-ml-wave7-batch.md
-rw-r--r--  1 box    box        773 Oct 10 02:23 july-ml-wave8-batch.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:23 july-ml-wave9
-rw-r--r--  1 box    box       4138 Oct 10 02:23 july-ml-wave9-batch.md
drwxr-xr-x  4 box    box       4096 Oct 10 02:23 july-ml-xdelta
-rw-r--r--  1 box    box      12251 Oct 10 02:21 july-regime-filter.md
-rw-r--r--  1 box    box       1118 Oct 10 02:21 july-shadow-dryrun.md
-rw-r--r--  1 box    box       3171 Oct 10 02:22 july-status-2026-09-07.md
drwxr-xr-x  4 box    box       4096 Oct 10 02:21 july-study
drwxr-xr-x  2 box    box       4096 Oct 10 02:22 july-timesfm25
-rw-r--r--  1 box    box       7996 Oct 10 02:22 july-timesfm25-quantiles.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:22 july-timesfm3
-rw-r--r--  1 box    box       9577 Oct 10 02:22 july-timesfm3-quantiles.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 july-w7a-docs-handoff
-rw-r--r--  1 box    box       3001 Oct 10 02:23 july-w7a-dry-status.md
drwxr-xr-x  4 box    box       4096 Oct 10 02:21 july-xs-mom
-rw-r--r--  1 box    box      11231 Oct 10 02:21 july-xs-momentum.md
-rw-r--r--  1 box    box       5388 Oct 10 02:23 july_hygiene_4h.py
-rw-r--r--  1 box    box       7187 Oct 10 02:23 july_morning_health.py
drwxr-xr-x  3 box    box       4096 Oct 10 02:21 karta-wedkarska
-rw-r--r--  1 box    box     921563 Oct 10 02:21 karta-wedkarska.zip
-rw-r--r--  1 box    box        320 Oct 10 02:24 keepalive-browser-status.txt
-rw-r--r--  1 box    box        407 Oct 10 02:25 keepalive-cli-status.txt
-rw-r--r--  1 box    box        158 Oct 10 02:25 keepalive-last-run.txt
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 klingdocs
-rw-r--r--  1 box    box      42334 Oct 10 02:23 lc-adj.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 lc-check-2026-09-14-1757
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 lc-check-2026-09-16-0907
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 lc-check-2026-09-18-1428
-rw-r--r--  1 box    box      71275 Oct 10 02:23 lc-discussions.html
-rw-r--r--  1 box    box         77 Oct 10 02:23 lc-ev-fu.json
-rw-r--r--  1 box    box         33 Oct 10 02:23 lc-event.json
-rw-r--r--  1 box    box         20 Oct 10 02:23 lc-events-v2.json
-rw-r--r--  1 box    box      42795 Oct 10 02:23 lc-events.json
-rw-r--r--  1 box    box         95 Oct 10 02:23 lc-followup-event.json
-rw-r--r--  1 box    box         95 Oct 10 02:23 lc-followup-event2.json
-rw-r--r--  1 box    box      44597 Oct 10 02:23 lc-followup-now.html
-rw-r--r--  1 box    box      71207 Oct 10 02:23 lc-forum-now.html
-rw-r--r--  1 box    box     532433 Oct 10 02:23 lc-forum-posts.json
-rw-r--r--  1 box    box     300447 Oct 10 02:23 lc-forum-qa.json
-rw-r--r--  1 box    box      20754 Oct 10 02:23 lc-forum-selected.json
-rw-r--r--  1 box    box      51581 Oct 10 02:23 lc-forum-topics.json
-rw-r--r--  1 box    box      71207 Oct 10 02:23 lc-forum2.html
-rw-r--r--  1 box    box          0 Oct 10 02:15 lc-fu-comments.html
-rw-r--r--  1 box    box          0 Oct 10 02:15 lc-fu-comments2.html
-rw-r--r--  1 box    box      77716 Oct 10 02:23 lc-guides.html
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 lc-monitor
-rw-r--r--  1 box    box       3794 Oct 10 02:23 lc-news-now.json
-rw-r--r--  1 box    box     518023 Oct 10 02:23 lc-news-page.html
-rw-r--r--  1 box    box      46313 Oct 10 02:23 lc-news-view.html
-rw-r--r--  1 box    box       5932 Oct 10 02:23 lc-news.json
-rw-r--r--  1 box    box         20 Oct 10 02:23 lc-peek-comments.html
-rw-r--r--  1 box    box      45404 Oct 10 02:23 lc-peek-now.html
-rw-r--r--  1 box    box     414371 Oct 10 02:23 lc-qa-summary.txt
-rw-r--r--  1 box    box      61048 Oct 10 02:23 lc-sample-thread.html
-rw-r--r--  1 box    box       9772 Oct 10 02:23 lc-steam-guides.json
-rw-r--r--  1 box    box     174087 Oct 10 02:23 lc-store.html
-rw-r--r--  1 box    box      51144 Oct 10 02:23 lc-t-2026.html
-rw-r--r--  1 box    box      56525 Oct 10 02:23 lc-t-demolish.html
-rw-r--r--  1 box    box      45358 Oct 10 02:23 lc-view-follow.html
-rw-r--r--  1 box    box      46469 Oct 10 02:23 lc-view-peek.html
-rw-r--r--  1 box    box      42375 Oct 10 02:23 lc-view-split.html
-rw-r--r--  1 box    box      44168 Oct 10 02:23 lc-view-stats.html
-rw-r--r--  1 box    box       2424 Oct 10 02:21 list.txt
-rw-r--r--  1 box    box     164017 Oct 10 02:15 live-sites.json
-rw-r--r--  1 box    box      12670 Oct 10 02:15 live-sites.md
-rw-r--r--  1 box    box      10159 Oct 10 02:23 live_ga4_gsc_2026_09_17.json
-rw-r--r--  1 box    box       7961 Oct 10 02:23 live_ga4_gsc_2026_09_17.py
-rw-r--r--  1 box    box      52668 Oct 10 02:21 llms-full.txt
-rw-r--r--  1 box    box      45441 Oct 10 02:21 llms.txt
-rw-r--r--  1 box    box       1475 Oct 10 02:21 lookup_adida.py
-rw-r--r--  1 box    box       1683 Oct 10 02:21 lookup_bolormaa.py
-rw-r--r--  1 box    box        872 Oct 10 02:21 lookup_dias.py
-rw-r--r--  1 box    box        785 Oct 10 02:21 lookup_dias2.py
-rw-r--r--  1 box    box       2028 Oct 10 02:27 lookup_f0ebcp.py
-rw-r--r--  1 box    box       1234 Oct 10 02:21 lookup_install_now.py
-rw-r--r--  1 box    box        782 Oct 10 02:21 lookup_user.py
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 lumen-check
-rw-r--r--  1 box    box      68955 Oct 10 02:23 lumencraft-ann.html
-rw-r--r--  1 box    box      69561 Oct 10 02:23 lumencraft-disc0.html
-rw-r--r--  1 box    box      69545 Oct 10 02:23 lumencraft-discussions.html
-rw-r--r--  1 box    box         77 Oct 10 02:23 lumencraft-event-alt.json
-rw-r--r--  1 box    box         77 Oct 10 02:23 lumencraft-event.json
-rw-r--r--  1 box    box         95 Oct 10 02:23 lumencraft-event2.json
-rw-r--r--  1 box    box          0 Oct 10 02:15 lumencraft-events-page.json
drwxr-xr-x  2 box    box      36864 Oct 10 09:21 lumencraft-monitor
-rw-r--r--  1 box    box     516200 Oct 10 02:23 lumencraft-news-hub.html
-rw-r--r--  1 box    box      45068 Oct 10 02:23 lumencraft-news-view.html
-rw-r--r--  1 box    box      32278 Oct 10 02:23 lumencraft-news-view2.html
-rw-r--r--  1 box    box      29497 Oct 10 02:23 lumencraft-news.json
-rw-r--r--  1 box    box       5221 Oct 10 02:23 lumencraft-snapshot-2026-09-09.json
-rw-r--r--  1 box    box        766 Oct 10 02:23 lumencraft-snapshot-2026-09-10-1428.json
-rw-r--r--  1 box    box       1345 Oct 10 02:23 lumencraft-snapshot-2026-09-14-1757.json
-rw-r--r--  1 box    box       1752 Oct 10 02:23 lumencraft-snapshot-2026-09-16-0907.json
-rw-r--r--  1 box    box       1299 Oct 10 02:23 lumencraft-snapshot-2026-09-21-1413.json
drwxr-xr-x 10 box    box       4096 Oct 10 02:27 maxcv
drwxr-xr-x  7 box    box       4096 Oct 10 02:23 maxcv-fix
drwxr-xr-x 12 box    box       4096 Oct 10 02:23 maxcv-job-html
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 mbank-docs
drwxr-xr-x 10 box    box       4096 Oct 10 02:29 mcpfinder
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 mcpfinder-2026-10-01
-rw-r--r--  1 box    box         57 Oct 10 02:21 mcpso-submit.md
-rw-r--r--  1 box    box          5 Oct 10 02:20 mcpso-test.txt
drwxr-xr-x  7 box    box       4096 Oct 10 02:29 monetization-cnvs-freesign-whenmeet-2026-10-08
-rw-r--r--  1 box    box       9140 Oct 10 02:23 morning-pulse-2026-09-18.json
-rw-r--r--  1 box    box       8072 Oct 10 02:25 morning-pulse-2026-09-24.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 morning-pulse-2026-09-25
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 morning-pulse-2026-09-28
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 morning-pulse-2026-09-29
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 morning-pulse-2026-09-30
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 morning-pulse-2026-10-01
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 morning-pulse-2026-10-02
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 morning-pulse-2026-10-05
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 morning-pulse-2026-10-06
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 morning-pulse-2026-10-07
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 morning-pulse-2026-10-08
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 morning-pulse-2026-10-09
-rw-r--r--  1 box    box       2152 Oct 10 02:24 morning-pulse-shopify-2026-09-23.json
-rw-r--r--  1 box    box      16558 Oct 10 02:22 morning-pulse-shopify.json
-rw-r--r--  1 box    box        707 Oct 10 02:24 morning-pulse-traffic-2026-09-23.json
-rw-r--r--  1 box    box       7238 Oct 10 02:22 morning-pulse-traffic.json
-rw-r--r--  1 box    box       8593 Oct 10 02:24 morning-pulse-wfsdb-2026-09-23.txt
-rw-r--r--  1 box    box       6895 Oct 10 02:22 morning-pulse-wfsdb.json
-rw-r--r--  1 box    box       8532 Oct 10 02:24 morning_pulse_traffic_2026_09_23.py
drwxr-xr-x 16 box    box       4096 Oct 10 12:20 multigpt
-rw-r--r--  1 box    box      16758 Oct 10 02:29 multigpt-images-api-plan-2026-10-07.md
-rw-r--r--  1 box    box       9909 Oct 10 02:29 multigpt-muse-image-2026-10-07.md
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 multigpt-muse-test-2026-10-07
-rw-r--r--  1 box    box        405 Oct 10 02:21 nav.js
-rw-r--r--  1 box    box        402 Oct 10 02:22 nav2.js
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 node-v22.14.0-linux-x64
drwxr-xr-x  5 box    box       4096 Oct 10 02:29 node-v24.21.0-linux-x64
drwxr-xr-x 18 box    box       4096 Oct 10 02:29 nodejs-server-fix
drwxr-xr-x 18 box    box       4096 Oct 10 02:29 nodejs-server-zf
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 nrf-refund
drwxr-xr-x  2 box    box       4096 Oct 11 08:24 ops
-rw-r--r--  1 box    box        275 Oct 10 02:15 ovh-mx.txt
-rw-r--r--  1 box    box      33336 Oct 10 02:23 part-aa.b64
-rw-r--r--  1 box    box       2459 Oct 10 02:22 partner2_out.txt
-rw-r--r--  1 box    box       1889 Oct 10 02:21 partner_cuero.py
-rw-r--r--  1 box    box       4945 Oct 10 02:21 partner_daily.py
-rw-r--r--  1 box    box       1450 Oct 10 02:21 partner_events.py
-rw-r--r--  1 box    box       3019 Oct 10 02:21 partner_fri.py
-rw-r--r--  1 box    box       9541 Oct 10 02:22 partner_fri_sep4.py
-rw-r--r--  1 box    box       4438 Oct 10 02:21 partner_mon.py
-rw-r--r--  1 box    box      11428 Oct 10 02:23 partner_mon_sep14.py
-rw-r--r--  1 box    box      10678 Oct 10 02:22 partner_mon_sep7.py
-rw-r--r--  1 box    box      18702 Oct 10 02:23 partner_pulse_2026-09-10.json
-rw-r--r--  1 box    box       3151 Oct 10 02:21 partner_thu.py
-rw-r--r--  1 box    box       1741 Oct 10 02:21 partner_tue.py
-rw-r--r--  1 box    box       3201 Oct 10 02:21 partner_wed.py
-rw-r--r--  1 box    box      13384 Oct 10 02:22 partner_wed_sep2.py
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 pgvenv
-rw-r--r--  1 box    box      13200 Oct 10 02:15 plai-geo.md
-rw-r--r--  1 box    box      23605 Oct 10 02:15 plai-gsc-extra.json
-rw-r--r--  1 box    box      19086 Oct 10 02:15 plai-llms-full-draft.txt
-rw-r--r--  1 box    box       6251 Oct 10 02:15 plai-llms.txt
-rw-r--r--  1 box    box      11791 Oct 10 02:15 plai-page-inventory.json
-rw-r--r--  1 box    box       2805 Oct 10 02:15 plai-sitemap.xml
drwxr-xr-x 17 box    box       4096 Oct 10 02:27 planets
drwxr-xr-x  2 box    box       4096 Oct 10 02:24 planets-seo
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 portfolio-funnel-2026-10-08
-rw-r--r--  1 box    box      36266 Oct 10 02:14 project-inventory.json
-rw-r--r--  1 box    box      62297 Oct 10 02:23 pulse-2026-09-08.json
-rw-r--r--  1 box    box       2603 Oct 10 02:23 pulse-2026-09-09-traffic-check.json
-rw-r--r--  1 box    box      34620 Oct 10 02:23 pulse-2026-09-09.json
-rw-r--r--  1 box    box      11848 Oct 10 02:23 pulse-2026-09-09.py
-rw-r--r--  1 box    box       6647 Oct 10 02:23 pulse-ga4-gsc-2026-09-10.txt
-rw-r--r--  1 box    box       6647 Oct 10 02:23 pulse-ga4-gsc-morning-rerun.txt
-rw-r--r--  1 box    box      20560 Oct 10 02:22 pulse-ga4gsc-2026-09-07.json
-rw-r--r--  1 box    box       5747 Oct 10 02:22 pulse-gmail-2026-09-02.json
-rw-r--r--  1 box    box      13796 Oct 10 02:22 pulse-saas-2026-09-02.json
-rw-r--r--  1 box    box       5335 Oct 10 02:22 pulse-saas-2026-09-02.txt
-rw-r--r--  1 box    box       6331 Oct 10 02:22 pulse-saas-2026-09-04.json
-rw-r--r--  1 box    box       9172 Oct 10 02:22 pulse-saas-2026-09-07.json
-rw-r--r--  1 box    box       8652 Oct 10 02:23 pulse-saas-2026-09-10.json
-rw-r--r--  1 box    box       8343 Oct 10 02:22 pulse-shopify-2026-09-02.json
-rw-r--r--  1 box    box       4781 Oct 10 02:22 pulse-shopify-2026-09-03.json
-rw-r--r--  1 box    box       1701 Oct 10 02:22 pulse-shopify-2026-09-04.json
-rw-r--r--  1 box    box       3619 Oct 10 02:22 pulse-shopify-2026-09-07.json
-rw-r--r--  1 box    box        697 Oct 10 02:23 pulse-shopify-2026-09-10.json
-rw-r--r--  1 box    box       5650 Oct 10 02:23 pulse-shopify-2026-09-14.json
-rw-r--r--  1 box    box       4903 Oct 10 02:23 pulse-shopify-2026-09-15.json
-rw-r--r--  1 box    box        134 Oct 10 02:23 pulse-shopify.json
-rw-r--r--  1 box    box      11039 Oct 10 02:22 pulse-traffic-2026-09-02.json
-rw-r--r--  1 box    box       1252 Oct 10 02:22 pulse-traffic-2026-09-04.txt
-rw-r--r--  1 box    box       7619 Oct 10 02:22 pulse_traffic_sep2.py
-rwxr-xr-x  1 box    box        178 Oct 10 02:15 put.sh
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 pw2d
-rw-r--r--  1 box    box       7684 Oct 10 02:21 query_saas.py
-rw-r--r--  1 box    box       5276 Oct 10 02:21 query_shopify_partner.py
-rw-r--r--  1 box    box       5334 Oct 10 02:21 query_shopify_partner2.py
-rw-r--r--  1 box    box       2300 Oct 10 02:21 query_snaps.py
-rw-r--r--  1 box    box       2974 Oct 10 02:21 query_utm.py
-rw-r--r--  1 box    box        212 Oct 10 02:29 r2-cors-wearfits-dev-test.json
-rw-------  1 box    box        567 Oct 10 02:29 r2-dev-creds-2026-10-08.env
-rw-r--r--  1 box    box       6385 Oct 10 02:27 r_1wx2cvk.xml
-rw-r--r--  1 box    box          0 Oct 10 02:15 r_1wxkjac.xml
-rw-r--r--  1 box    box          0 Oct 10 02:15 r_1wxvqvd.xml
-rw-r--r--  1 box    box       4426 Oct 10 02:27 r_1wy406l.xml
-rw-r--r--  1 box    box          0 Oct 10 02:15 rd.xml
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 reddit-ban-check-2026-10-07
-rw-r--r--  1 box    box      16106 Oct 10 02:23 remote-append-0.py
-rw-r--r--  1 box    box      16106 Oct 10 02:23 remote-append-1.py
-rw-r--r--  1 box    box      11002 Oct 10 02:23 remote-append-2.py
-rw-r--r--  1 box    box       8089 Oct 10 02:23 remote-append-aa.sh
-rw-r--r--  1 box    box       8089 Oct 10 02:23 remote-append-ab.sh
-rw-r--r--  1 box    box       5537 Oct 10 02:23 remote-append-ac.sh
-rw-r--r--  1 box    box        358 Oct 10 02:23 remote-install-bybit.py
-rw-r--r--  1 box    box      13202 Oct 10 02:29 repos.json
-rw-r--r--  1 box    box       5957 Oct 10 02:27 repos.txt
-rw-r--r--  1 box    box       4196 Oct 10 02:21 res.json
-rw-r--r--  1 box    box       5692 Oct 10 02:21 res2.json
-rw-r--r--  1 box    box         83 Oct 10 02:29 review-codex.txt
-rw-r--r--  1 box    box       9143 Oct 10 02:22 routine.txt
-rw-r--r--  1 box    box      34865 Oct 10 02:21 rows.json
-rw-r--r--  1 box    box        561 Oct 10 02:22 rsvp-accepted.ics
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 rubikon
-rw-r--r--  1 box    box      16865 Oct 10 02:22 rubikon-About.jsx
-rw-r--r--  1 box    box      12684 Oct 10 02:27 rubikon-build.log
-rw-r--r--  1 box    box      34712 Oct 10 02:27 rubikon-build2.log
drwxr-xr-x  6 box    box       4096 Oct 10 02:22 rubikon-deploy
-rw-r--r--  1 box    box      22181 Oct 10 02:22 rubikon-o-nas.html
drwxr-xr-x  5 box    box       4096 Oct 10 02:22 rubikon-web-deploy
-rwxr-xr-x  1 box    box         77 Oct 10 02:21 run-claude.sh
-rw-r--r--  1 box    box       1218 Oct 10 02:14 run_api.py
-rw-r--r--  1 box    box         99 Oct 10 02:14 run_vers.sh
-rw-r--r--  1 box    box      41922 Oct 10 02:29 runs.jsonl
-rw-r--r--  1 box    box      17791 Oct 10 02:27 runs.txt
drwxr-xr-x  9 box    box       4096 Oct 11 01:02 s1
drwxr-xr-x  3 box    box       4096 Oct 11 01:02 s2
drwxr-xr-x  4 box    box       4096 Oct 11 01:02 s3
drwxr-xr-x  9 box    box       4096 Oct 10 15:29 s4
drwxr-xr-x 10 box    box       4096 Oct 10 02:24 saas-core
drwxr-xr-x  2 box    box       4096 Oct 10 02:24 saas-core-analysis
drwxr-xr-x  2 box    box       4096 Oct 10 02:24 saas-core-seo
-rw-r--r--  1 box    box          0 Oct 10 02:15 saas-old.html
drwxr-xr-x  2 box    box       4096 Oct 10 02:22 saas-sales-2026-09-07
-rw-r--r--  1 box    box      13905 Oct 10 02:21 saas-shopify-funnel.md
-rw-r--r--  1 box    box      17885 Oct 10 02:21 saas-shopify-traffic-ga4-gsc.md
-rw-r--r--  1 box    box          0 Oct 10 02:15 saas-thread.json
-rw-r--r--  1 box    box          2 Oct 10 02:14 saas_account_providers.json
-rw-r--r--  1 box    box        291 Oct 10 02:21 saas_last_active_source.json
-rw-r--r--  1 box    box       2850 Oct 10 02:21 saas_paying.json
-rw-r--r--  1 box    box      14280 Oct 10 02:21 saas_shopify_active.json
-rw-r--r--  1 box    box        355 Oct 10 02:21 saas_shopify_class_counts.json
-rw-r--r--  1 box    box      19102 Oct 10 02:21 saas_shopify_snapshots.json
-rw-r--r--  1 box    box       2866 Oct 10 02:21 saas_signup_samples.json
-rw-r--r--  1 box    box        497 Oct 10 02:21 saas_signups_by_day.json
-rw-r--r--  1 box    box       1665 Oct 10 02:21 saas_usage_14d.json
-rw-r--r--  1 box    box       2969 Oct 10 02:21 saas_user_columns.json
-rw-r--r--  1 box    box      13306 Oct 10 02:21 saas_visit_history_samples.json
-rw-r--r--  1 box    box         16 Oct 10 02:22 sand-egress-proxy
-rw-r--r--  1 box    box       1218 Oct 10 02:14 sc.py
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 scan-2026-09-15-1500
-rw-r--r--  1 box    box       1882 Oct 10 02:23 scan-2026-09-15-1500-hn.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 scan-2026-09-15-1900
-rw-r--r--  1 box    box         49 Oct 10 02:23 scan-2026-09-16-0700-hn.json
-rw-r--r--  1 box    box        336 Oct 10 02:23 scan-2026-09-16-0700.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 scan-2026-09-16-1500
-rw-r--r--  1 box    box      27763 Oct 10 02:23 scan-2026-09-16-1500-hn.json
-rw-r--r--  1 box    box       2925 Oct 10 02:23 scan-2026-09-17-0700-browser.json
-rw-r--r--  1 box    box         72 Oct 10 02:23 scan-2026-09-17-0700-hn.json
-rw-r--r--  1 box    box        339 Oct 10 02:23 scan-2026-09-17-0700.json
-rw-r--r--  1 box    box       1773 Oct 10 02:23 scan-2026-09-17-1100-browser.json
-rw-r--r--  1 box    box      19750 Oct 10 02:23 scan-2026-09-17-1100-hn.json
-rw-r--r--  1 box    box        653 Oct 10 02:23 scan-2026-09-17-1100-reddit-api.json
-rw-r--r--  1 box    box       1034 Oct 10 02:23 scan-2026-09-17-1100.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 scan-2026-09-17-1500
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 scan-2026-09-17-1900
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 scan-2026-09-18-0700
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 scan-2026-09-18-1100
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 scan-2026-09-18-1500
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 scan-2026-09-18-1900
drwxr-xr-x  3 box    box       4096 Oct 10 02:23 scan-2026-09-21-0700
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 scan-2026-09-21-1100
drwxr-xr-x  4 box    box       4096 Oct 10 02:23 scan-2026-09-21-1500
drwxr-xr-x  2 box    box      12288 Oct 10 02:23 scan-2026-09-21-1900
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 scan-2026-09-22-0700
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 scan-2026-09-22-1100
drwxr-xr-x  5 box    box       4096 Oct 10 02:23 scan-2026-09-22-1500
drwxr-xr-x  4 box    box       4096 Oct 10 02:24 scan-2026-09-22-1900
drwxr-xr-x  4 box    box       4096 Oct 10 02:24 scan-2026-09-23-0700
drwxr-xr-x  4 box    box       4096 Oct 10 02:24 scan-2026-09-23-1100
drwxr-xr-x  6 box    box       4096 Oct 10 02:24 scan-2026-09-23-1507
drwxr-xr-x  6 box    box       4096 Oct 10 02:29 scan-2026-09-23-1907
drwxr-xr-x  4 box    box       4096 Oct 10 02:24 scan-2026-09-23-afternoon
drwxr-xr-x  4 box    box       4096 Oct 10 02:25 scan-2026-09-24-0707
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-24-1107
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-24-1507
drwxr-xr-x  6 box    box       4096 Oct 10 02:25 scan-2026-09-24-1907
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-25-0707
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-25-1107
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-25-1507
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-25-1907
drwxr-xr-x  6 box    box       4096 Oct 10 02:25 scan-2026-09-28-0707
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-28-1107
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-28-1507
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-28-1907
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-29-0707
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-29-1107
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-29-1507
drwxr-xr-x  6 box    box       4096 Oct 10 02:25 scan-2026-09-29-1907
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-30-0707
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-30-1107
drwxr-xr-x  5 box    box       4096 Oct 10 02:25 scan-2026-09-30-1507
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 scan-2026-09-30-1907
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 scan-2026-10-01-0707
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 scan-2026-10-01-1107
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 scan-2026-10-01-1507
drwxr-xr-x  5 box    box       4096 Oct 10 02:27 scan-2026-10-01-1555-catchup
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 scan-2026-10-01-1759-catchup
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 scan-2026-10-01-1907
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 scan-2026-10-02-0707
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 scan-2026-10-02-1107
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 scan-2026-10-02-1507
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 scan-2026-10-02-1754-catchup
drwxr-xr-x  6 box    box       4096 Oct 10 02:27 scan-2026-10-02-1907
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 scan-2026-10-05-0707
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 scan-2026-10-05-1101-whipB
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 scan-2026-10-05-1107
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 scan-2026-10-05-1507
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 scan-2026-10-05-1907
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 scan-2026-10-06-0707
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 scan-2026-10-06-1107
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 scan-2026-10-06-1507
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 scan-2026-10-06-1907
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 scan-2026-10-07-0707
drwxr-xr-x  2 box    box       4096 Oct 10 02:28 scan-2026-10-07-1107
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 scan-2026-10-07-1507
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 scan-2026-10-07-1907
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 scan-2026-10-08-0707
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 scan-2026-10-08-1107
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 scan-2026-10-08-1507
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 scan-2026-10-08-1907
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 scan-2026-10-09-0707
drwxr-xr-x  3 box    box       4096 Oct 10 02:29 scan-2026-10-09-1003
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 scan-2026-10-09-1211
drwxr-xr-x  5 box    box       4096 Oct 10 02:29 scan-2026-10-09-1637
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 scan-2026-10-09-1826
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 scan-2026-10-09-2005
drwxr-xr-x  4 box    box       4096 Oct 10 09:13 scan-2026-10-10-0909
drwxr-xr-x  4 box    box       4096 Oct 10 12:05 scan-2026-10-10-1201
drwxr-xr-x  4 box    box       4096 Oct 10 15:04 scan-2026-10-10-1501
drwxr-xr-x  4 box    box       4096 Oct 10 18:06 scan-2026-10-10-1802
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 secret-rotation-2026-10-09
drwxr-xr-x  3 box    box       4096 Oct 10 02:22 seo-301-marketing-4xx
-rw-r--r--  1 box    box        944 Oct 10 02:22 seo-quickwin-sitemap-ping-2026-09-07.json
drwxr-xr-x 40 box    box       4096 Oct 10 02:29 seo-reviews
drwxr-xr-x  4 box    box       4096 Oct 10 02:27 seo-ship-2026-10-05
drwxr-xr-x  3 box    box       4096 Oct 10 02:28 seo-ship-2026-10-07
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 seo-ship-2026-10-08
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 seo-ship-2026-10-09
-rw-r--r--  1 box    box        277 Oct 10 02:23 shopify-saas-daily-2026-09-11.json
-rw-r--r--  1 box    box      29658 Oct 10 02:23 shopify-saas-daily-2026-09-14.json
-rw-r--r--  1 box    box      32421 Oct 10 02:23 shopify-saas-daily-2026-09-15.json
-rw-r--r--  1 box    box        144 Oct 10 02:23 shopify-saas-daily-2026-09-16.err
-rw-r--r--  1 box    box      32915 Oct 10 02:23 shopify-saas-daily-2026-09-16.json
-rw-r--r--  1 box    box       3215 Oct 10 02:23 shopify-saas-daily-2026-09-16.summary.txt
-rw-r--r--  1 box    box      33723 Oct 10 02:23 shopify-saas-daily-2026-09-17.json
-rw-r--r--  1 box    box        144 Oct 10 02:23 shopify-saas-daily-2026-09-18.err
-rw-r--r--  1 box    box      33234 Oct 10 02:23 shopify-saas-daily-2026-09-18.json
-rw-r--r--  1 box    box       3394 Oct 10 02:23 shopify-saas-daily-2026-09-18.summary.txt
-rw-r--r--  1 box    box        228 Oct 10 02:23 shopify-saas-daily-2026-09-21.err
-rw-r--r--  1 box    box      40702 Oct 10 02:23 shopify-saas-daily-2026-09-21.json
-rw-r--r--  1 box    box       6219 Oct 10 02:23 shopify-saas-daily-2026-09-21.md
-rw-r--r--  1 box    box        228 Oct 10 02:23 shopify-saas-daily-2026-09-22.err
-rw-r--r--  1 box    box      34959 Oct 10 02:23 shopify-saas-daily-2026-09-22.json
-rw-r--r--  1 box    box       4840 Oct 10 02:23 shopify-saas-daily-2026-09-22.md
-rw-r--r--  1 box    box        228 Oct 10 02:24 shopify-saas-daily-2026-09-23.err
-rw-r--r--  1 box    box      33173 Oct 10 02:24 shopify-saas-daily-2026-09-23.json
-rw-r--r--  1 box    box       4717 Oct 10 02:24 shopify-saas-daily-2026-09-23.md
-rw-r--r--  1 box    box        228 Oct 10 02:25 shopify-saas-daily-2026-09-24.err
-rw-r--r--  1 box    box      34147 Oct 10 02:25 shopify-saas-daily-2026-09-24.json
-rw-r--r--  1 box    box       4846 Oct 10 02:25 shopify-saas-daily-2026-09-24.md
-rw-r--r--  1 box    box        698 Oct 10 02:25 shopify-saas-daily-2026-09-24.run.log
-rw-r--r--  1 box    box      35137 Oct 10 02:25 shopify-saas-daily-2026-09-25.json
-rw-r--r--  1 box    box       5024 Oct 10 02:25 shopify-saas-daily-2026-09-25.md
-rw-r--r--  1 box    box        769 Oct 10 02:25 shopify-saas-daily-2026-09-25.run.log
-rw-r--r--  1 box    box      39313 Oct 10 02:25 shopify-saas-daily-2026-09-28.json
-rw-r--r--  1 box    box       6011 Oct 10 02:25 shopify-saas-daily-2026-09-28.md
-rw-r--r--  1 box    box        228 Oct 10 02:25 shopify-saas-daily-2026-09-28.run.log
-rw-r--r--  1 box    box        552 Oct 10 02:25 shopify-saas-daily-2026-09-28.summary.txt
-rw-r--r--  1 box    box      35644 Oct 10 02:25 shopify-saas-daily-2026-09-29.json
-rw-r--r--  1 box    box       5287 Oct 10 02:25 shopify-saas-daily-2026-09-29.md
-rw-r--r--  1 box    box        228 Oct 10 02:25 shopify-saas-daily-2026-09-29.run.log
-rw-r--r--  1 box    box        892 Oct 10 02:25 shopify-saas-daily-2026-09-29.summary.txt
-rw-r--r--  1 box    box        228 Oct 10 02:25 shopify-saas-daily-2026-09-30.err
-rw-r--r--  1 box    box      43026 Oct 10 02:25 shopify-saas-daily-2026-09-30.json
-rw-r--r--  1 box    box       6668 Oct 10 02:25 shopify-saas-daily-2026-09-30.md
-rw-r--r--  1 box    box       1243 Oct 10 02:25 shopify-saas-daily-2026-09-30.summary.txt
-rw-r--r--  1 box    box      40104 Oct 10 02:27 shopify-saas-daily-2026-10-01.json
-rw-r--r--  1 box    box       6056 Oct 10 02:27 shopify-saas-daily-2026-10-01.md
-rw-r--r--  1 box    box        228 Oct 10 02:27 shopify-saas-daily-2026-10-01.run.log
-rw-r--r--  1 box    box        969 Oct 10 02:27 shopify-saas-daily-2026-10-01.summary.txt
-rw-r--r--  1 box    box        316 Oct 10 02:27 shopify-saas-daily-2026-10-02.err
-rw-r--r--  1 box    box      41082 Oct 10 02:27 shopify-saas-daily-2026-10-02.json
-rw-r--r--  1 box    box       5680 Oct 10 02:27 shopify-saas-daily-2026-10-02.md
-rw-r--r--  1 box    box        540 Oct 10 02:27 shopify-saas-daily-2026-10-02.stdout.txt
-rw-r--r--  1 box    box        540 Oct 10 02:27 shopify-saas-daily-2026-10-02.summary.txt
-rw-r--r--  1 box    box        316 Oct 10 02:27 shopify-saas-daily-2026-10-05.err
-rw-r--r--  1 box    box      52155 Oct 10 02:27 shopify-saas-daily-2026-10-05.json
-rw-r--r--  1 box    box       7389 Oct 10 02:27 shopify-saas-daily-2026-10-05.md
-rw-r--r--  1 box    box        548 Oct 10 02:27 shopify-saas-daily-2026-10-05.summary.txt
-rw-r--r--  1 box    box        318 Oct 10 02:27 shopify-saas-daily-2026-10-06.err
-rw-r--r--  1 box    box      40482 Oct 10 02:27 shopify-saas-daily-2026-10-06.json
-rw-r--r--  1 box    box       5922 Oct 10 02:27 shopify-saas-daily-2026-10-06.md
-rw-r--r--  1 box    box        614 Oct 10 02:27 shopify-saas-daily-2026-10-06.stdout.txt
-rw-r--r--  1 box    box        614 Oct 10 02:27 shopify-saas-daily-2026-10-06.summary.txt
-rw-r--r--  1 box    box        316 Oct 10 02:29 shopify-saas-daily-2026-10-08.err
-rw-r--r--  1 box    box      32485 Oct 10 02:29 shopify-saas-daily-2026-10-08.json
-rw-r--r--  1 box    box       4685 Oct 10 02:29 shopify-saas-daily-2026-10-08.md
-rw-r--r--  1 box    box        540 Oct 10 02:29 shopify-saas-daily-2026-10-08.stdout.txt
-rw-r--r--  1 box    box        540 Oct 10 02:29 shopify-saas-daily-2026-10-08.summary.txt
-rw-r--r--  1 box    box        318 Oct 10 02:29 shopify-saas-daily-2026-10-09.err
-rw-r--r--  1 box    box      41534 Oct 10 02:29 shopify-saas-daily-2026-10-09.json
-rw-r--r--  1 box    box       5702 Oct 10 02:29 shopify-saas-daily-2026-10-09.md
-rw-r--r--  1 box    box        627 Oct 10 02:29 shopify-saas-daily-2026-10-09.stdout.txt
-rw-r--r--  1 box    box        627 Oct 10 02:29 shopify-saas-daily-2026-10-09.summary.txt
-rw-r--r--  1 box    box       7824 Oct 10 02:21 shopify_partner_funnel.json
-rw-r--r--  1 box    box      16149 Oct 10 02:23 shopify_saas_daily_2026_09_15.py
-rw-r--r--  1 box    box      16161 Oct 10 02:23 shopify_saas_daily_2026_09_16.py
-rw-r--r--  1 box    box      16161 Oct 10 02:23 shopify_saas_daily_2026_09_17.py
-rw-r--r--  1 box    box      16164 Oct 10 02:23 shopify_saas_daily_2026_09_18.py
-rw-r--r--  1 box    box      26506 Oct 10 02:23 shopify_saas_daily_2026_09_21.py
-rw-r--r--  1 box    box      26445 Oct 10 02:23 shopify_saas_daily_2026_09_22.py
-rw-r--r--  1 box    box      26445 Oct 10 02:24 shopify_saas_daily_2026_09_23.py
-rw-r--r--  1 box    box      26450 Oct 10 02:25 shopify_saas_daily_2026_09_24.py
-rw-r--r--  1 box    box      26448 Oct 10 02:25 shopify_saas_daily_2026_09_25.py
-rw-r--r--  1 box    box      26510 Oct 10 02:25 shopify_saas_daily_2026_09_28.py
-rw-r--r--  1 box    box      26477 Oct 10 02:25 shopify_saas_daily_2026_09_29.py
-rw-r--r--  1 box    box      27222 Oct 10 02:25 shopify_saas_daily_2026_09_30.py
-rw-r--r--  1 box    box      27224 Oct 10 02:27 shopify_saas_daily_2026_10_01.py
-rw-r--r--  1 box    box      28595 Oct 10 02:27 shopify_saas_daily_2026_10_02.py
-rw-r--r--  1 box    box      28629 Oct 10 02:27 shopify_saas_daily_2026_10_05.py
-rw-r--r--  1 box    box      28595 Oct 10 02:27 shopify_saas_daily_2026_10_06.py
-rw-r--r--  1 box    box      28592 Oct 10 02:29 shopify_saas_daily_2026_10_08.py
-rw-r--r--  1 box    box      28592 Oct 10 02:29 shopify_saas_daily_2026_10_09.py
-rw-r--r--  1 box    box       4222 Oct 10 02:21 sitemap.xml
-rw-r--r--  1 box    box      43242 Oct 10 02:21 skill.md
-rw-r--r--  1 box    box       7625 Oct 10 02:27 sm-aicommander.dev.xml
-rw-r--r--  1 box    box       4336 Oct 10 02:27 sm-clashroids.com.xml
-rw-r--r--  1 box    box       3992 Oct 10 02:27 sm-plai.chat.xml
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 sm-scan
-rw-r--r--  1 box    box        322 Oct 10 02:22 sm-wearfits.com.xml
-rw-r--r--  1 box    box      63574 Oct 10 02:25 steam-announce.html
-rw-r--r--  1 box    box          0 Oct 10 02:15 steam-comments.json
-rw-r--r--  1 box    box          0 Oct 10 02:15 steam-comments2
-rw-r--r--  1 box    box      71275 Oct 10 02:23 steam-forum-1713810.html
-rw-r--r--  1 box    box      71275 Oct 10 02:25 steam-forum.html
-rw-r--r--  1 box    box      71291 Oct 10 02:25 steam-forum0.html
-rw-r--r--  1 box    box     516838 Oct 10 02:25 steam-hub.html
-rw-r--r--  1 box    box      75564 Oct 10 02:23 steam-news-1713810.json
-rw-r--r--  1 box    box       7271 Oct 10 02:23 steam-news-api.json
-rw-r--r--  1 box    box     518178 Oct 10 02:23 steam-news-page-1713810.html
-rw-r--r--  1 box    box      43122 Oct 10 02:25 steam-news-post.html
-rw-r--r--  1 box    box      29385 Oct 10 02:25 steam-news.html
-rw-r--r--  1 box    box      59185 Oct 10 02:25 steam-news.rss
-rw-r--r--  1 box    box      13609 Oct 10 02:23 steam-reviews-1713810.json
-rw-r--r--  1 box    box      84892 Oct 10 02:25 steam-reviews-all.html
-rw-r--r--  1 box    box      86843 Oct 10 02:25 steam-reviews.html
-rw-r--r--  1 box    box     182461 Oct 10 02:25 steam-store.html
drwxr-xr-x  2 box    box      12288 Oct 10 02:25 steam1713810
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 steam1713810-20260924-1410
drwxr-xr-x  2 box    box       4096 Oct 10 02:25 steam1713810-20260926-0912
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 stripe-pm-audit-2026-10-08
-rw-r--r--  1 box    box      11057 Oct 10 10:40 system1-classifier-plan.md
-rw-r--r--  1 box    box       1171 Oct 10 02:27 t.xml
-rw-r--r--  1 box    box         15 Oct 10 02:21 t2.py
-rw-r--r--  1 box    box      54532 Oct 10 02:22 tail.txt
drwxr-xr-x 14 box    box       4096 Oct 11 08:31 tellsh
drwxr-xr-x 12 box    box       4096 Oct 10 16:39 tellsh-before
-rw-r--r--  1 box    box       3884 Oct 10 07:27 tellsh-claude.log
-rw-r--r--  1 box    box       4389 Oct 10 08:21 tellsh-claude2.log
-rw-r--r--  1 box    box       2942 Oct 10 08:43 tellsh-claude3.log
drwx------  4 box    box       4096 Oct 10 11:13 tellsh-data
drwxr-xr-x 11 box    box       4096 Oct 10 11:30 tellsh-hybrid
-rw-r--r--  1 box    box       2846 Oct 10 10:25 tellsh-hybrid-spec.md
-rw-r--r--  1 box    box       4568 Oct 10 14:02 tellsh-hybrid.log
-rw-r--r--  1 box    box        767 Oct 10 12:29 tellsh-loop.log
-rwxr-xr-x  1 box    box       4269 Oct 10 10:15 tellsh-loop.sh
-rwxr-xr-x  1 box    box       3382 Oct 11 07:41 tellsh-loop10.sh
-rwxr-xr-x  1 box    box       3812 Oct 11 08:00 tellsh-loop11.sh
-rwxr-xr-x  1 box    box       4043 Oct 11 08:26 tellsh-loop12.sh
-rw-r--r--  1 box    box        628 Oct 10 18:59 tellsh-loop2.log
-rwxr-xr-x  1 box    box       4179 Oct 10 15:52 tellsh-loop2.sh
-rw-r--r--  1 box    box        382 Oct 10 19:59 tellsh-loop3.log
-rwxr-xr-x  1 box    box       2391 Oct 10 17:56 tellsh-loop3.sh
-rw-r--r--  1 box    box        461 Oct 10 21:36 tellsh-loop4.log
-rwxr-xr-x  1 box    box       2802 Oct 10 21:34 tellsh-loop4.sh
-rwxr-xr-x  1 box    box       2678 Oct 10 21:34 tellsh-loop4.sh.bak
-rw-r--r--  1 box    box        191 Oct 10 22:31 tellsh-loop5.log
-rwxr-xr-x  1 box    box       2767 Oct 10 21:55 tellsh-loop5.sh
-rwxr-xr-x  1 box    box       2838 Oct 10 22:54 tellsh-loop6.sh
-rwxr-xr-x  1 box    box       3029 Oct 11 01:06 tellsh-loop7.sh
-rwxr-xr-x  1 box    box       3190 Oct 11 05:07 tellsh-loop8.sh
-rwxr-xr-x  1 box    box       3103 Oct 11 07:30 tellsh-loop9.sh
-rw-r--r--  1 box    box       5447 Oct 10 08:25 tellsh-rev-claude.txt
-rw-r--r--  1 box    box     354607 Oct 10 08:26 tellsh-rev-codex.txt
-rw-r--r--  1 box    box          0 Oct 10 08:43 tellsh-rev2-claude.txt
-rw-r--r--  1 box    box         39 Oct 10 08:43 tellsh-rev2-codex.txt
-rw-r--r--  1 box    box       4485 Oct 10 06:51 tellsh-spec.md
-rw-r--r--  1 box    box       4515 Oct 10 07:05 tellsh-spec2.md
-rw-r--r--  1 box    box       1426 Oct 10 07:27 tellsh-v01-eval.txt
-rw-r--r--  1 box    box          6 Oct 10 02:14 test_write.txt
-rw-r--r--  1 box    box      71293 Oct 10 02:25 topic.html
-rw-r--r--  1 box    box      59692 Oct 10 02:25 topic2.html
drwxr-xr-x 22 box    box       4096 Oct 10 02:24 trader-w7a
drwxr-xr-x  8 box    box       4096 Oct 10 02:29 tryon-drive-2026-10-08
drwxr-xr-x  8 box    box       4096 Oct 10 02:27 tryonapi
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 tryonapi-smoke
-rw-r--r--  1 box    box       2405 Oct 10 02:29 ts.json
drwxr-xr-x  2 box    box       4096 Oct 10 02:21 uploads
-rw-r--r--  1 box    box         82 Oct 10 02:14 url1.txt
-rw-r--r--  1 box    box      11840 Oct 10 02:22 usermsgs.txt
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 venv-gdown
drwxr-xr-x  4 box    box       4096 Oct 10 02:29 venv-lc
drwxr-xr-x  5 box    box       4096 Oct 10 02:29 venv-timesfm25
-rwxr-xr-x  1 box    box        233 Oct 10 02:14 verify_clis.sh
drwxr-xr-x  4 box    box       4096 Oct 10 10:05 w7a
drwxr-xr-x  4 box    box       4096 Oct 10 12:02 w7a-audit
drwxr-xr-x  2 box    box       4096 Oct 10 02:27 w7a-diag
-rw-r--r--  1 box    box       3538 Oct 10 10:05 w7a-dry-live-decision.md
-rw-r--r--  1 box    box       5308 Oct 10 02:27 w7a-memory-leak-findings.md
-rw-r--r--  1 box    box       2408 Oct 10 12:14 w7a-stalefix-audit.md
-rw-r--r--  1 box    box        564 Oct 10 02:21 watch.js
-rw-r--r--  1 box    box        554 Oct 10 02:21 watch.log
-rw-r--r--  1 box    box       1254 Oct 10 02:22 wearfits-301-infra-verify.json
-rw-r--r--  1 box    box       3009 Oct 10 02:22 wearfits-301-verify.json
-rw-r--r--  1 box    box       2247 Oct 10 02:22 wearfits-301-www-verify.json
-rw-r--r--  1 box    box       4043 Oct 10 02:22 wearfits-4xx.json
-rw-r--r--  1 box    box       1632 Oct 10 02:22 wearfits-4xx.md
drwxr-xr-x  3 box    box       4096 Oct 10 02:24 wearfits-autofit
-rw-r--r--  1 box    box      24966 Oct 10 02:22 wearfits-check-raw.json
-rw-r--r--  1 box    box      93127 Oct 10 02:15 wearfits-ctr.json
-rw-r--r--  1 box    box      33822 Oct 10 02:15 wearfits-ctr.md
drwxr-xr-x 18 box    box       4096 Oct 10 19:02 wearfits-genai-api
drwxr-xr-x 15 box    box       4096 Oct 10 02:29 wearfits-genai-app
drwxr-xr-x  3 box    box       4096 Oct 10 02:27 wearfits-growth-pages
drwxr-xr-x  3 box    box       4096 Oct 10 02:27 wearfits-pages-proxy
drwxr-xr-x  2 box    box       4096 Oct 10 02:22 wearfits-sitemaps
drwxr-xr-x 13 box    box       4096 Oct 10 02:27 wearfits-size-app
-rw-r--r--  1 box    box        740 Oct 10 02:25 wearfits-tempe-usage-correction-2026-09-23-residual.sql
-rw-r--r--  1 box    box       2634 Oct 10 02:25 wearfits-tempe-usage-correction-2026-09-23.json
-rw-r--r--  1 box    box       3925 Oct 10 02:25 wearfits-tempe-usage-correction-2026-09-23.sql
-rw-r--r--  1 box    box       4508 Oct 10 02:22 wearfits-urls-all.txt
-rw-r--r--  1 box    box       4455 Oct 10 02:22 wearfits-urls-sitemap.txt
-rw-r--r--  1 box    box      11002 Oct 10 02:21 wearfits_pulse.py
drwxr-xr-x 16 box    box       4096 Oct 10 02:28 website2026-retailers
drwxr-xr-x  3 box    box       4096 Oct 10 10:51 wf-nightly-2026-10-10
-rw-r--r--  1 box    box       2554 Oct 10 02:21 wf_cmp.py
-rw-r--r--  1 box    box       8168 Oct 10 02:21 wf_pulse_adc.py
-rw-r--r--  1 box    box       5164 Oct 10 02:23 wfsdb-out-2026-09-11.txt
-rw-r--r--  1 box    box       2727 Oct 10 02:22 wfsdb_daily.py
-rw-r--r--  1 box    box       5604 Oct 10 02:22 wfsdb_fri_sep4.py
-rw-r--r--  1 box    box       2867 Oct 10 02:21 wfsdb_mon.py
-rw-r--r--  1 box    box       2619 Oct 10 02:21 wfsdb_pulse.py
-rw-r--r--  1 box    box       6496 Oct 10 02:21 wfsdb_thu.py
-rw-r--r--  1 box    box       2932 Oct 10 02:21 wfsdb_tue.py
-rw-r--r--  1 box    box       2616 Oct 10 02:22 wfsdb_tue_signups.py
-rw-r--r--  1 box    box       5764 Oct 10 02:21 wfsdb_wed.py
drwxr-xr-x 12 box    box       4096 Oct 10 02:27 whiteboard
drwxr-xr-x  2 box    box       4096 Oct 10 02:23 with-cursor-ship
-rw-r--r--  1 box    box       3317 Oct 10 02:14 write_map.py
-rw-r--r--  1 box    box     171246 Oct 10 02:29 x-aicommander-reply-check-2026-10-07-1400.png
drwxr-xr-x  2 box    box       4096 Oct 10 02:29 x-hourly
-rw-r--r--  1 box    box        219 Oct 10 02:27 x-reply-cua-2026-10-04.txt
-rw-r--r--  1 box    box     153583 Oct 10 02:27 x-spencer450-reply-2026-10-07.png
-rw-r--r--  1 box    box          0 Oct 10 02:15 x_comments_1wuuzy1_.rss_limit_200.xml
-rw-r--r--  1 box    box       4363 Oct 10 02:27 x_comments_1wx2cpr_.rss_limit_100.xml
-rw-r--r--  1 box    box          0 Oct 10 02:15 x_comments_1wxkjac_.rss_limit_100.xml
-rw-r--r--  1 box    box          0 Oct 10 02:15 x_comments_1wxvqvd_.rss_limit_100.xml
-rw-r--r--  1 box    box          0 Oct 10 02:15 x_user_lksrz_comments_.rss_limit_25.xml
-rw-r--r--  1 box    box      25158 Oct 10 02:23 xfer-aa.py
-rw-r--r--  1 box    box      25158 Oct 10 02:23 xfer-ab.py
-rw-r--r--  1 box    box      25158 Oct 10 02:23 xfer-ac.py
-rw-r--r--  1 box    box       1303 Oct 10 02:23 xfer-ad.py
-rw-r--r--  1 box    box        358 Oct 10 02:23 xfer-install.py
-rw-r--r--  1 box    box     268452 Oct 10 02:29 zasw.b64
drwxr-xr-x  7 box    box       4096 Oct 10 02:25 zf-requeue
-rw-r--r--  1 box    box        474 Oct 10 02:15 zones.json
-rw-r--r--  1 box    box        728 Oct 10 02:14 zones.py
scripts/compare.js
bin/tellsh.js
scripts/gen_data.js
src/tagger.js
src/tools.js
src/render.js
src/danger.js
src/variants.js
src/compose.js
src/cli.js
src/shellwords.js
src/features.js
src/classifier.js
src/pipeline.js
src/catalog.js
src/cascade.js
src/env.js
src/fill.js
src/history.js
src/model.js
src/slots.js
src/rerank/tokenizer.js
src/rerank/hybrid.js
src/rerank/encoder.js
scripts/hybrid/train_a_dev.sh
scripts/hybrid/train_encoder.py
scripts/build_triggers.js
scripts/bench.js
scripts/hybrid/export_encoder.py
scripts/hybrid/sets.js
scripts/hybrid/dump_cascade.js
scripts/hybrid/bench_hybrid.js
scripts/hybrid/export_data.js
scripts/hybrid/fetch_model.js
scripts/hybrid/prune_vocab.py
scripts/hybrid/cold_query.js
scripts/hybrid/report_hybrid.js
scripts/hybrid/train_lm_gpu.py
scripts/hybrid/lm_rerank.py
scripts/hybrid/eval_hybrid.js
scripts/eval.js
scripts/tldr_ingest.py
scripts/check_variants.js
scripts/teacher.js
scripts/report.js
scripts/train.py
scripts/real/real_rows.js
scripts/real/prepare_real.js
scripts/real/report_v04.js
scripts/lib/heldout.js
scripts/lib/pwsh_parse.js
scripts/lib/jev.js
scripts/lib/confusable.js
scripts/lib/cmdnorm.js
scripts/lib/silver.js
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
// Regression tests for round 17: the round-16 findings (review/r16-claude.md, review/r16-codex.md). An issue, ticket or
// bug number is never the pull request to merge, and `#45` alone names it only right after the verb; "merge that pr"
// reads the pull request of a previous `gh pr view/checkout N` or is withheld, never the current branch's; a branch
// named as "from the branch main" is read, an unreadable one withheld.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'pwsh', os: 'windows' }, { shell: 'cmd', os: 'windows' }];
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });
const withheld = (r, cmd, slot, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual(r.missing, [slot], msg);
};
const exact = (r, cmd, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual(r.missing, [], msg);
};

test('major: an issue number or a #N in another clause is never the pull request', () => {
  for (const env of SHELLS) {
    for (const q of ['merge pr for issue #45', 'squash merge the pr for issue #8', 'merge the pr in issue #4', 'merge the pr that closes #12',
      'merge pr which fixes #12', 'merge the pr, see #99', 'merge the pull request for ticket #3', 'merge pr for bug #3',
      'merge the pr for #12', 'merge pr for fix #12', 'merge pr for issue 45']) withheld(run(q, null, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
    for (const [q, cmd] of Object.entries({ 'merge #45': 'gh pr merge 45', 'squash merge #45': 'gh pr merge 45', 'please merge #45': 'gh pr merge 45',
      'merge pr #45': 'gh pr merge 45', 'merge pull request #12 now': 'gh pr merge 12', 'merge #45 for issue #3': 'gh pr merge 45',
      'merge pr number 45': 'gh pr merge 45' })) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
  }
});

test('major: "merge that pr" uses the pull request of the previous gh pr command or is withheld', () => {
  for (const env of SHELLS) {
    exact(run('merge that pr', ['gh pr view 45'], env), 'gh pr merge 45', env.shell);
    exact(run('merge this pull request', ['gh pr checkout 45'], env), 'gh pr merge 45', env.shell);
    exact(run('merge that pr', ['gh pr view feature/x'], env), 'gh pr merge feature/x', env.shell);
    for (const h of [['git checkout feat'], ['cat a.txt'], ['ls'], ['gh pr list'], ['gh pr view'], ['gh pr view 12 --repo a/b'], ['gh pr view 1 2'], null]) {
      for (const q of ['merge that pr', 'merge this pull request']) withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
  }
  exact(run('show checks for that pr', ['gh pr view 45']), 'gh pr checks 45');
  // nothing referred to: the current branch's pull request, as before
  for (const q of ['merge pr', 'merge the pr']) exact(run(q, ['gh pr view 45']), 'gh pr merge', q);
  // a pull request in history does not change what the model sees
  assert.equal(run('git status', ['gh pr view 45']).command, 'git status');
});

test('major: a branch named as "from the branch X" is read, an unreadable one is withheld', () => {
  for (const env of SHELLS) {
    for (const [q, cmd] of Object.entries({ 'merge pr from the branch main': 'gh pr merge main', 'merge pr for the branch develop': 'gh pr merge develop',
      'merge the pull request from the branch release': 'gh pr merge release', 'merge pr from my branch foo': 'gh pr merge foo',
      'merge pr from branch main': 'gh pr merge main' })) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
    for (const q of ['merge pr from the feature branch', 'merge pr from the branch']) withheld(run(q, null, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
  }
  exact(run('merge pr and delete the branch'), 'gh pr merge');
});

test('minor: an amount after "pr" and a zero or zero-padded number are not pull requests', () => {
  for (const q of ['merge pr 2 days old', 'merge pr 3 times', 'merge pr 0', 'merge pr 007']) withheld(run(q), 'gh pr merge <PR>', 'pr', q);
  exact(run('merge pr 12'), 'gh pr merge 12');
});
All three Major findings from r16 (the Claude and Codex reviews) are fixed and committed as `72c64cc` on `master`. Nothing was pushed. All 345 tests pass, including 4 new ones in `test/regressions18.test.js` that check bash, PowerShell and cmd. The eval numbers didn't change and the bench was rerun.

**1. Issue numbers and `#N` (`src/fill.js`)**
- When the word after "pr" is issue, ticket or bug, the PR is withheld as `<PR>`.
- A bare `#N` is accepted only right after the verb (`merge #45`, `squash merge #45`) or right after "pr" (`merge pr #45`).
- All four cases you listed, and the ones from the review, now give `gh pr merge <PR>`: `merge pr for issue #45`, `squash merge the pr for issue #8`, `merge the pr that closes #12`, `merge the pr, see #99`, `merge the pr in issue #4`, `merge the pull request for ticket #3`, `merge the pr for #12`, `merge pr for fix #12`.

**2. "merge that pr" (`src/history.js`, `src/pipeline.js`)**
- A previous `gh pr view/checkout/merge/… N|branch|url` now gives the PR. After `gh pr view 45`, `merge that pr` → `gh pr merge 45`; after `gh pr checkout 45`, `merge this pull request` → `gh pr merge 45`.
- After unrelated history (`git checkout feat`, `cat a.txt`, `ls`, `gh pr list`), it gives `gh pr merge <PR>`. The same happens after `gh pr view` with no number, after one with `--repo`, and with no history at all. All of these used to give a bare `gh pr merge`.
- The PR from history is not passed to the model as an input, so its predictions are unchanged.

**3. Named branch phrases (`src/fill.js`)**
- `merge pr from the branch main` → `gh pr merge main`, `merge pr for the branch develop` → `gh pr merge develop`, `merge the pull request from the branch release` → `gh pr merge release`.
- A branch phrase it can't read, like `merge pr from the feature branch`, gives `<PR>` instead of a bare merge.

**Minor findings fixed:** `merge pr 2 days old`, `merge pr 3 times`, `pr 0` and `pr 007` are now withheld. I also added a comment to the systemd-run option pattern in `history.js` pointing to the man page.

**Not fixed:**
- The Codex finding that `prepare_real.js` groups commands by their operands. Changing it would change the train/eval split, so it isn't a quick fix.
- The carried-over intent findings: `uninstall it` and `checkout pr 7` → `gh pr checks 7`.
- `merge PR 1e3` still passes, because `1e3` is a valid branch name.
- An older bug that wasn't in either review: after `git checkout feat`, `merge it` suggests `git branch -d feat`. This was already the behaviour before this round. Git would refuse to delete the branch you're on, but it is the wrong suggestion.

I added a "Round 17" note to `EVAL.md` and updated the bench table, and updated the PR section of `README.md`. This machine had no git identity set, so I made the commit as the repo's existing author (lksrz) for that one command only; the git config is unchanged. `review/fix16-log.md` is still untracked.

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/pipeline.js src/cli.js bin/tellsh.js scripts/train.py scripts/hybrid/train_encoder.py scripts/hybrid/train_lm_gpu.py' in /workspace/tellsh
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
diff --git a/scripts/hybrid/train_lm_gpu.py b/scripts/hybrid/train_lm_gpu.py
new file mode 100644
index 0000000..53d1fd3
--- /dev/null
+++ b/scripts/hybrid/train_lm_gpu.py
@@ -0,0 +1,106 @@
+#!/usr/bin/env python3
+"""(C) GPU fine-tuning of the option-letter reranker (ready to run; CPU training on the dev box was too slow).
+
+Trains Qwen2.5-0.5B-Instruct (default; any HF causal LM works) to answer the A..E option prompt of
+scripts/hybrid/lm_rerank.py: cross-entropy on the 5 letter logits at the last position only (one forward pass,
+exactly what runs at inference).  LoRA (r=16, all linear layers) in bf16, then merged.
+
+Inputs (create on the dev box, copy to the GPU machine together with this repo):
+  node scripts/hybrid/export_data.js && node scripts/hybrid/dump_cascade.js --tag=ship
+  -> build/hybrid/meta.json, build/hybrid/cands_ship.jsonl   (rows with set=='train' are used; 'dev' for validation)
+
+Run (single GPU, ~15-30 min on an A10/L4 for 3 epochs of ~15.7k rows):
+  pip install torch transformers peft accelerate
+  python3 scripts/hybrid/train_lm_gpu.py --model Qwen/Qwen2.5-0.5B-Instruct --epochs 3 --out build/hybrid/lm-qwen05
+Then on the dev box:
+  python3 scripts/hybrid/lm_rerank.py score --model build/hybrid/lm-qwen05/final --plain --cands build/hybrid/cands_ship.jsonl ...
+  python3 /path/to/llama.cpp/convert_hf_to_gguf.py build/hybrid/lm-qwen05/final --outtype q8_0   (CPU runtime)
+"""
+import argparse, json, math, os, random, sys, time
+import torch
+
+sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
+from lm_rerank import Prompter, candidate_list, read_cands, ROOT  # noqa: E402
+
+
+def main():
+    ap = argparse.ArgumentParser()
+    ap.add_argument('--model', default='Qwen/Qwen2.5-0.5B-Instruct')
+    ap.add_argument('--cands', default=os.path.join(ROOT, 'build/hybrid/cands_ship.jsonl'))
+    ap.add_argument('--out', default=os.path.join(ROOT, 'build/hybrid/lm-qwen05'))
+    ap.add_argument('--epochs', type=float, default=3)
+    ap.add_argument('--bs', type=int, default=32)
+    ap.add_argument('--lr', type=float, default=2e-4)
+    ap.add_argument('--full', action='store_true', help='full fine-tune instead of LoRA')
+    a = ap.parse_args()
+    from transformers import AutoModelForCausalLM, AutoTokenizer
+    dev = 'cuda' if torch.cuda.is_available() else 'cpu'
+    torch.manual_seed(0)
+    tok = AutoTokenizer.from_pretrained(a.model)
+    tok.padding_side = 'left'
+    if tok.pad_token is None:
+        tok.pad_token = tok.eos_token
+    m = AutoModelForCausalLM.from_pretrained(a.model, dtype=torch.bfloat16).to(dev)
+    if not a.full:
+        from peft import LoraConfig, get_peft_model
+        m = get_peft_model(m, LoraConfig(r=16, lora_alpha=32, lora_dropout=0.05,
+                                         target_modules=['q_proj', 'k_proj', 'v_proj', 'o_proj', 'gate_proj', 'up_proj', 'down_proj']))
+        m.print_trainable_parameters()
+    P = Prompter(tok, chat=False)
+    lid = torch.tensor(P.letter_ids, device=dev)
+    train = [r for r in read_cands(a.cands, {'train'}) if r['intent']]
+    val = [r for r in read_cands(a.cands, {'dev'}) if r['intent']][:1000]
+    if not train:
+        raise SystemExit('no labeled train rows in ' + a.cands)
+    steps = int(math.ceil(len(train) / a.bs) * a.epochs)
+    params = [p for p in m.parameters() if p.requires_grad]
+    opt = torch.optim.AdamW(params, lr=a.lr, weight_decay=0.0)
+    sched = torch.optim.lr_scheduler.LambdaLR(opt, lambda s: min(1, (s + 1) / 50) * max(0.0, 1 - s / steps))
+
+    def batch_logits(rows, rng, train_mode):
+        lists = [candidate_list(r, rng, train=True) for r in rows]
+        enc = tok([P(r['text'], r['shell'], r['os'], c) for r, c in zip(rows, lists)], return_tensors='pt', padding=True,
+                  add_special_tokens=False).to(dev)
+        lg = m(**enc, logits_to_keep=1).logits[:, -1, :][:, lid].float()
+        y = torch.tensor([c.index(r['intent']) for r, c in zip(rows, lists)], device=dev)
+        return lg, y
+
+    @torch.no_grad()
+    def evaluate():
+        m.eval()
+        ok = 0
+        rng = random.Random(5)
+        for i in range(0, len(val), a.bs):
+            lg, y = batch_logits(val[i:i + a.bs], rng, False)
+            ok += (lg.argmax(-1) == y).sum().item()
+        m.train()
+        return ok / max(1, len(val))
+
+    print('zero-shot choice accuracy on dev:', evaluate(), flush=True)
+    rng = random.Random(11)
+    step = 0
+    t0 = time.time()
+    m.train()
+    while step < steps:
+        random.Random(step).shuffle(train)
+        # the last, partial batch too: with fewer rows than --bs a full-batch-only loop never advances `step`
+        for i in range(0, len(train), a.bs):
+            lg, y = batch_logits(train[i:i + a.bs], rng, True)
+            loss = torch.nn.functional.cross_entropy(lg, y)
+            opt.zero_grad(); loss.backward(); torch.nn.utils.clip_grad_norm_(params, 1.0); opt.step(); sched.step(); step += 1
+            if step % 50 == 0:
+                print(f'step {step}/{steps} loss {loss.item():.4f} {time.time() - t0:.0f}s', flush=True)
+            if step % 500 == 0:
+                print('dev choice accuracy:', evaluate(), flush=True)
+            if step >= steps:
+                break
+    print('final dev choice accuracy:', evaluate(), flush=True)
+    if not a.full:
+        m = m.merge_and_unload()
+    os.makedirs(a.out, exist_ok=True)
+    m.save_pretrained(os.path.join(a.out, 'final'))
+    tok.save_pretrained(os.path.join(a.out, 'final'))
+
+
+if __name__ == '__main__':
+    main()
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
diff --git a/src/pipeline.js b/src/pipeline.js
index c5430f7..5cd6425 100644
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
@@ -32,17 +34,69 @@ const PRONOUN_VALUE = /^(it|its|that|this|them|those|one|again|back|there|here|t
 
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
+  pr: (v) => RAW_OK.pr(v),
   host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
   pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
+  old: (v) => v.length > 0 && v.length < 300 && !/[\n\r\0]/.test(v), new: (v) => v.length < 300 && !/[\n\r\0]/.test(v),
 };
-for (const k of ['file', 'src', 'dst', 'dest', 'archive']) VALID_SLOT[k] = VALID_SLOT.path;
+const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
+// "that pr", "this pull request", "the same pr": a pull request named by reference
+const PR_REFERENCE = /\b(?:that|this|its|the\s+same|the\s+previous|the\s+last|ten|tego|tamten)\s+(?:\w+\s+)?(?:prs?|pull[\s-]+requests?)\b/i;
+// slots naming the one thing a command acts on, other than a path (not free text: pattern, message, glob, ...)
+const OPERAND_SLOT_NAMES = new Set(['name', 'service', 'container', 'pkg', 'host', 'target', 'branch', 'user', 'script', 'url', 'pid']);
+for (const k of PATH_SLOT_NAMES) if (k !== 'path') VALID_SLOT[k] = VALID_SLOT.path;
 export function validSlot(k, v) {
   if (v == null || v === '') return false;
   if (isAmbiguous(v)) return false;
@@ -52,30 +106,107 @@ export function validSlot(k, v) {
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
+  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr']) {
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
+}
+
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
 }
+const TEXT_SLOT_NAMES = ['pattern', 'message', 'text', 'name', 'old', 'new', 'service', 'container', 'pkg', 'cmd', 'branch', 'user'];
 
 const usesSlot = (intent, k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
 
@@ -90,22 +221,35 @@ function flagTokens(cmd) {
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
@@ -113,17 +257,26 @@ export function suggest(query, opts = {}) {
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
@@ -134,29 +287,68 @@ export function suggest(query, opts = {}) {
 
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
@@ -169,73 +361,237 @@ export function suggest(query, opts = {}) {
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
     // the reference points at something we cannot read safely: leave the slot empty (placeholder)
-    for (const k of Object.keys(slots)) if (PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
+    refWordsOnly();
+    for (const k of refDst ? [] : ref.blank || []) if (slots[k] == null && usesSlot(BY_ID[intent], k)) { blank.add(k); if (!ref.blanket) keep.add(k); }
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
+    for (const k of Object.keys(refFill)) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
+    finalizeSlots(BY_ID[intent], slots);
+    context.rule = 'refused';
+    context.note = ref.guardNote;
+    method = 'history-rule';
+  } else if (ref?.rule === 'pronoun') {
     const it = BY_ID[intent];
-    for (const [k, v] of Object.entries(ref.fill)) {
-      if (!validSlot(k, v)) { if (slots[k] != null && PRONOUN_VALUE.test(String(slots[k]))) delete slots[k]; continue; }
+    for (const [k, v] of Object.entries(refFill)) {
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
/bin/bash -lc 'cat src/rerank/hybrid.js src/rerank/encoder.js src/rerank/tokenizer.js' in /workspace/tellsh
exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/cli.js bin/tellsh.js scripts/train.py scripts/gen_data.js' in /workspace/tellsh
exec
/bin/bash -lc 'cat scripts/hybrid/train_encoder.py scripts/hybrid/train_lm_gpu.py scripts/hybrid/export_encoder.py scripts/hybrid/train_a_dev.sh' in /workspace/tellsh
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
/bin/bash -lc 'for f in /AGENTS.md /workspace/AGENTS.md /workspace/tellsh/AGENTS.md; do if [ -f "$f" ]; then cat "$f"; fi; done; rg --files -g AGENTS.md src bin scripts test; cat test/regressions18.test.js; cat review/fix16-log.md' in /workspace/tellsh
 succeeded in 0ms:
// Regression tests for round 17: the round-16 findings (review/r16-claude.md, review/r16-codex.md). An issue, ticket or
// bug number is never the pull request to merge, and `#45` alone names it only right after the verb; "merge that pr"
// reads the pull request of a previous `gh pr view/checkout N` or is withheld, never the current branch's; a branch
// named as "from the branch main" is read, an unreadable one withheld.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'pwsh', os: 'windows' }, { shell: 'cmd', os: 'windows' }];
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });
const withheld = (r, cmd, slot, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual(r.missing, [slot], msg);
};
const exact = (r, cmd, msg) => {
  assert.equal(r.command, cmd, msg);
  assert.deepEqual(r.missing, [], msg);
};

test('major: an issue number or a #N in another clause is never the pull request', () => {
  for (const env of SHELLS) {
    for (const q of ['merge pr for issue #45', 'squash merge the pr for issue #8', 'merge the pr in issue #4', 'merge the pr that closes #12',
      'merge pr which fixes #12', 'merge the pr, see #99', 'merge the pull request for ticket #3', 'merge pr for bug #3',
      'merge the pr for #12', 'merge pr for fix #12', 'merge pr for issue 45']) withheld(run(q, null, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
    for (const [q, cmd] of Object.entries({ 'merge #45': 'gh pr merge 45', 'squash merge #45': 'gh pr merge 45', 'please merge #45': 'gh pr merge 45',
      'merge pr #45': 'gh pr merge 45', 'merge pull request #12 now': 'gh pr merge 12', 'merge #45 for issue #3': 'gh pr merge 45',
      'merge pr number 45': 'gh pr merge 45' })) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
  }
});

test('major: "merge that pr" uses the pull request of the previous gh pr command or is withheld', () => {
  for (const env of SHELLS) {
    exact(run('merge that pr', ['gh pr view 45'], env), 'gh pr merge 45', env.shell);
    exact(run('merge this pull request', ['gh pr checkout 45'], env), 'gh pr merge 45', env.shell);
    exact(run('merge that pr', ['gh pr view feature/x'], env), 'gh pr merge feature/x', env.shell);
    for (const h of [['git checkout feat'], ['cat a.txt'], ['ls'], ['gh pr list'], ['gh pr view'], ['gh pr view 12 --repo a/b'], ['gh pr view 1 2'], null]) {
      for (const q of ['merge that pr', 'merge this pull request']) withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
  }
  exact(run('show checks for that pr', ['gh pr view 45']), 'gh pr checks 45');
  // nothing referred to: the current branch's pull request, as before
  for (const q of ['merge pr', 'merge the pr']) exact(run(q, ['gh pr view 45']), 'gh pr merge', q);
  // a pull request in history does not change what the model sees
  assert.equal(run('git status', ['gh pr view 45']).command, 'git status');
});

test('major: a branch named as "from the branch X" is read, an unreadable one is withheld', () => {
  for (const env of SHELLS) {
    for (const [q, cmd] of Object.entries({ 'merge pr from the branch main': 'gh pr merge main', 'merge pr for the branch develop': 'gh pr merge develop',
      'merge the pull request from the branch release': 'gh pr merge release', 'merge pr from my branch foo': 'gh pr merge foo',
      'merge pr from branch main': 'gh pr merge main' })) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
    for (const q of ['merge pr from the feature branch', 'merge pr from the branch']) withheld(run(q, null, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
  }
  exact(run('merge pr and delete the branch'), 'gh pr merge');
});

test('minor: an amount after "pr" and a zero or zero-padded number are not pull requests', () => {
  for (const q of ['merge pr 2 days old', 'merge pr 3 times', 'merge pr 0', 'merge pr 007']) withheld(run(q), 'gh pr merge <PR>', 'pr', q);
  exact(run('merge pr 12'), 'gh pr merge 12');
});
All three Major findings from r16 (the Claude and Codex reviews) are fixed and committed as `72c64cc` on `master`. Nothing was pushed. All 345 tests pass, including 4 new ones in `test/regressions18.test.js` that check bash, PowerShell and cmd. The eval numbers didn't change and the bench was rerun.

**1. Issue numbers and `#N` (`src/fill.js`)**
- When the word after "pr" is issue, ticket or bug, the PR is withheld as `<PR>`.
- A bare `#N` is accepted only right after the verb (`merge #45`, `squash merge #45`) or right after "pr" (`merge pr #45`).
- All four cases you listed, and the ones from the review, now give `gh pr merge <PR>`: `merge pr for issue #45`, `squash merge the pr for issue #8`, `merge the pr that closes #12`, `merge the pr, see #99`, `merge the pr in issue #4`, `merge the pull request for ticket #3`, `merge the pr for #12`, `merge pr for fix #12`.

**2. "merge that pr" (`src/history.js`, `src/pipeline.js`)**
- A previous `gh pr view/checkout/merge/… N|branch|url` now gives the PR. After `gh pr view 45`, `merge that pr` → `gh pr merge 45`; after `gh pr checkout 45`, `merge this pull request` → `gh pr merge 45`.
- After unrelated history (`git checkout feat`, `cat a.txt`, `ls`, `gh pr list`), it gives `gh pr merge <PR>`. The same happens after `gh pr view` with no number, after one with `--repo`, and with no history at all. All of these used to give a bare `gh pr merge`.
- The PR from history is not passed to the model as an input, so its predictions are unchanged.

**3. Named branch phrases (`src/fill.js`)**
- `merge pr from the branch main` → `gh pr merge main`, `merge pr for the branch develop` → `gh pr merge develop`, `merge the pull request from the branch release` → `gh pr merge release`.
- A branch phrase it can't read, like `merge pr from the feature branch`, gives `<PR>` instead of a bare merge.

**Minor findings fixed:** `merge pr 2 days old`, `merge pr 3 times`, `pr 0` and `pr 007` are now withheld. I also added a comment to the systemd-run option pattern in `history.js` pointing to the man page.

**Not fixed:**
- The Codex finding that `prepare_real.js` groups commands by their operands. Changing it would change the train/eval split, so it isn't a quick fix.
- The carried-over intent findings: `uninstall it` and `checkout pr 7` → `gh pr checks 7`.
- `merge PR 1e3` still passes, because `1e3` is a valid branch name.
- An older bug that wasn't in either review: after `git checkout feat`, `merge it` suggests `git branch -d feat`. This was already the behaviour before this round. Git would refuse to delete the branch you're on, but it is the wrong suggestion.

I added a "Round 17" note to `EVAL.md` and updated the bench table, and updated the PR section of `README.md`. This machine had no git identity set, so I made the commit as the repo's existing author (lksrz) for that one command only; the git config is unchanged. `review/fix16-log.md` is still untracked.

exec
/bin/bash -lc 'cat scripts/hybrid/train_encoder.py scripts/hybrid/train_lm_gpu.py scripts/hybrid/train_a_dev.sh' in /workspace/tellsh
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

codex
The diff includes substantial history-resolution changes and an optional neural fallback. I’m checking how both affect target selection and execution gating, alongside the training split and calibration logic.
exec
/bin/bash -lc 'cat src/pipeline.js' in /workspace/tellsh
exec
/bin/bash -lc 'cat scripts/hybrid/export_data.js scripts/lib/heldout.js scripts/real/prepare_real.js' in /workspace/tellsh
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
  pr: (v) => RAW_OK.pr(v),
  host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
  pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
  old: (v) => v.length > 0 && v.length < 300 && !/[\n\r\0]/.test(v), new: (v) => v.length < 300 && !/[\n\r\0]/.test(v),
};
const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
// "that pr", "this pull request", "the same pr": a pull request named by reference
const PR_REFERENCE = /\b(?:that|this|its|the\s+same|the\s+previous|the\s+last|ten|tego|tamten)\s+(?:\w+\s+)?(?:prs?|pull[\s-]+requests?)\b/i;
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
  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr']) {
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
/bin/bash -lc "rg -n 'writeFile|mkdir|mkdtemp|execSync|spawnSync|unlink|rmSync' test; cat src/render.js; cat src/variants.js; cat src/model.js" in /workspace/tellsh
 succeeded in 0ms:
test/regressions6.test.js:45:  assert.equal(run('delete it', ['mkdir /tmp/new']).command, 'rm -r /tmp/new');
test/regressions6.test.js:78:  refused(run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']), '<PATH>', 'hint');
test/regressions6.test.js:81:  const ctx = buildContext(['mkdir /a', 'mkdir /b']);
test/regressions6.test.js:157:  assert.equal(run('copy notes.txt to it', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
test/regressions6.test.js:158:  assert.equal(run('skopiuj notes.txt do niego', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
test/regressions6.test.js:159:  assert.equal(run('move report.pdf into that folder', ['mkdir /srv/x']).command, 'mv -i report.pdf /srv/x');
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
test/regressions11.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions11.test.js:33:  const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', 'start', 'wrangler', 'dev'],
test/regressions11.test.js:84:  const sed = spawnSync('sh', ['-c', `DEV_TEXTS=/x.json; sed -n -e "s#^import { ctxFeatures } from '../src/history.js';#&\\nconst _devIndex = new Set(JSON.parse(readFileSync('$DEV_TEXTS', 'utf8')));#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
test/slot-cases.js:57:  ['mkdir', 'create folder src/components/ui', 'mkdir -p src/components/ui'],
test/regressions3-history.test.js:40:  assert.equal(run('delete it', ['cat old.txt; mkdir newdir']).command, 'rm -r newdir');
test/regressions3-history.test.js:42:  assert.equal(run('delete it', ['mkdir olddir; cat new.txt']).command, 'rm new.txt');
test/regressions3-history.test.js:60:  assert.equal(run('remove it', ['mkdir /srv/remove-backups', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:61:  assert.equal(run('delete it', ['mkdir /srv/delete-me', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:64:  assert.equal(run('usuń to', ['mkdir /srv/usun-stare', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:68:  const old = run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']);
test/regressions5.test.js:109:  assert.equal(run('move it to /tmp/old', ['mkdir /tmp/build']).command, 'mv -i /tmp/build /tmp/old');
test/compose.test.js:47:  const { spawnSync } = await import('node:child_process');
test/compose.test.js:48:  const r = spawnSync('sh', ['-c', 'node bin/tellsh.js --dry-run show disk usage | head -c 1 >/dev/null; echo $?'], { encoding: 'utf8' });
test/regressions4.test.js:188:  const { spawnSync } = await import('node:child_process');
test/regressions4.test.js:189:  const { mkdtempSync, writeFileSync } = await import('node:fs');
test/regressions4.test.js:192:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r4-'));
test/regressions4.test.js:194:  writeFileSync(hist, 'rm -r old\nls newdir\n');
test/regressions4.test.js:195:  const r = spawnSync(process.execPath, ['bin/tellsh.js', '--dry-run', `--history=${hist}`, 'same', 'for', '/srv/current'], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/regressions12.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions12.test.js:73:    const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', ...q.split(' ')],
test/shells.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/shells.test.js:12:const has = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
test/shells.test.js:51:      const res = spawnSync(checker, args, { encoding: 'utf8' });
test/shells.test.js:65:    if (has('fish')) { const res = spawnSync('fish', ['-n', '-c', r.command]); if (res.status !== 0) bad.push(it.id); }
test/cli.test.js:3:import { spawnSync } from 'node:child_process';
test/cli.test.js:5:import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/cli.test.js:10:const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/cli.test.js:94:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-cli-'));
test/cli.test.js:97:    writeFileSync(f, 'echo SECRET_TOKEN=abc123\ncat notes.txt\n');
test/cli.test.js:103:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/pipeline.test.js:4:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/pipeline.test.js:93:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-hist-'));
test/pipeline.test.js:96:    writeFileSync(f, Array.from({ length: 50 }, (_, i) => `: 17000000${i}:0;echo ${i}`).join('\n') + '\n');
test/pipeline.test.js:100:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions10.test.js:9:import { spawnSync } from 'node:child_process';
test/regressions10.test.js:22:const cliJson = (...words) => JSON.parse(spawnSync(process.execPath, [BIN, '--json', '--shell', 'bash', '--os', 'linux', ...words],
test/regressions10.test.js:143:  const sed = spawnSync('sh', ['-c', `sed -n -e "s#^  const leaks = excl.has;\\$#  const leaks = (t) => excl.has(t) || isDevText(t);#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
test/regressions7.test.js:73:  assert.equal(run('copy notes.txt to it', ['mkdir /tmp/n']).command, 'cp -ri notes.txt /tmp/n');
test/regressions7.test.js:127:    `awk 'BEGIN{system("rm -rf /")}'`, `node -e "require('fs').rmSync('/',{recursive:true})"`, 'chmod 000 /', 'chmod 000 /etc',
test/regressions8.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions8.test.js:9:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/regressions8.test.js:22:const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/regressions8.test.js:53:  const ctx = buildContext(['cat a.txt', 'docker logs web', 'mkdir /tmp/b']);
test/regressions8.test.js:65:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r7-'));
test/regressions8.test.js:68:    writeFileSync(f, 'cat old.txt\nls\ncat new.txt\n');
test/regressions8.test.js:72:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions8.test.js:107:  const c = run('delete it', [`mkdir ${long}`]);
test/regressions8.test.js:194:test('minor: a NUL byte never reaches spawnSync', () => {
test/regressions2.test.js:6:import { spawnSync } from 'node:child_process';
test/regressions2.test.js:8:import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
test/regressions2.test.js:25:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions2.test.js:171:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r2-'));
test/regressions2.test.js:174:    writeFileSync(hf, 'cat secret.txt\n');
test/regressions2.test.js:178:  } finally { rmSync(dir, { recursive: true, force: true }); }
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
// Per-shell / per-OS template variants (see src/render.js for precedence). Keys are intent ids from src/catalog.js.
//
// Keys per intent (all optional):
//   bsd      macOS/BSD userland (bash/zsh/sh on macOS without GNU coreutils), used before catalog `darwin`
//   gnuMac   macOS + Homebrew GNU coreutils (g-prefixed: gdu, gsort, gmd5sum, guniq, ...)
//   zsh      zsh only (bash/sh keep the POSIX choice)
//   busybox  BusyBox userland (Alpine etc.) - only where the GNU template uses flags/tools busybox lacks
//   fish     fish 3.x - only where the POSIX template is not valid fish
//   pwsh     PowerShell: a string (all OSes) or { win, unix }. A missing `unix` means the renderer falls back
//            to `bash -c '<posix command>'` (used where Linux and macOS natives differ). A missing `win`
//            is a Windows gap and is explained in gaps.pwsh ("Windows: ...").
//   cmd      cmd.exe, best effort
//   gaps     { shell: reason } when a shell/OS has no reasonable equivalent
//
// Template syntax is the catalog one ({slot}, {slot!raw}, «optional»). Function templates get
// (s, q, ctx) with ctx = { os, shell, coreutils }; `q` quotes for the target shell.
// PowerShell variants avoid `&&`/`||` (5.1 compat) and aliases, use -LiteralPath for user paths and
// never add -Force to destructive cmdlets unless the POSIX template forces too. Derived slots:
// ext (bare extension), minutes (time window in minutes), sizeBytes (size in bytes).

// Recursive file listing used by many PowerShell variants (-Force = include hidden files, like find).
const PS_FILES = 'Get-ChildItem -LiteralPath {path} -File -Recurse -Force -ErrorAction SilentlyContinue';
const PS_ALL = 'Get-ChildItem -LiteralPath {path} -Recurse -Force -ErrorAction SilentlyContinue';
const PS_FULLNAME = 'Select-Object -ExpandProperty FullName';
const PS_PROC_MATCH = 'Get-Process | Where-Object { $_.ProcessName -match {name} -or $_.CommandLine -match {name} }';
const PS_OS = 'Get-CimInstance -ClassName Win32_OperatingSystem';
const isWin = (ctx) => (ctx && ctx.os) === 'win32';

export const VARIANTS = {
  // ---------- files & disk ----------
  largest_files: {
    bsd: 'find {path} -xdev -type f -exec du -k {} + 2>/dev/null | sort -rn | head -n {count!raw}',
    gnuMac: 'find {path} -xdev -type f -exec du -h {} + 2>/dev/null | gsort -rh | head -n {count!raw}',
    pwsh: `${PS_FILES} | Sort-Object Length -Descending | Select-Object -First {count!raw} -Property Length, FullName`,
    gaps: { cmd: 'cmd.exe cannot sort files by size across subdirectories' },
  },
  largest_dirs: {
    bsd: 'du -k -d 1 {path} 2>/dev/null | sort -rn | head -n {count!raw}',
    gnuMac: 'gdu -h -d 1 {path} 2>/dev/null | gsort -rh | head -n {count!raw}',
    pwsh: "Get-ChildItem -LiteralPath {path} -Directory -Force | ForEach-Object { [pscustomobject]@{ Size = (Get-ChildItem -LiteralPath $_.FullName -File -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum; Path = $_.FullName } } | Sort-Object Size -Descending | Select-Object -First {count!raw}",
    gaps: { cmd: 'cmd.exe cannot sum and sort directory sizes' },
  },
  disk_free: {
    pwsh: { win: 'Get-PSDrive -PSProvider FileSystem', unix: 'df -h' },
    cmd: 'fsutil volume diskfree C:',
  },
  dir_size: {
    pwsh: `${PS_FILES} | Measure-Object -Property Length -Sum | Select-Object Count, Sum, @{ Name = 'MB'; Expression = { [math]::Round($_.Sum / 1MB, 1) } }`,
    cmd: 'dir /s /a {path}',
  },
  find_by_name: {
    pwsh: `${PS_ALL} | Where-Object Name -Like {namepat} | ${PS_FULLNAME}`,
    cmd: 'where /r {path} {namepat}',
  },
  find_by_ext: {
    pwsh: `${PS_FILES} | Where-Object Name -Like {glob}«| Where-Object LastWriteTime -GT (Get-Date).AddMinutes(-{minutes!raw})» | ${PS_FULLNAME}`,
    cmd: 'where /r {path} {glob}',
  },
  find_recent: {
    pwsh: `${PS_FILES} | Where-Object LastWriteTime -GT (Get-Date).AddMinutes(-{minutes!raw})«| Where-Object Name -Like {glob}» | ${PS_FULLNAME}`,
    gaps: { cmd: 'forfiles only filters by whole days, not by an arbitrary time window' },
  },
  find_older_than: {
    pwsh: `${PS_FILES} | Where-Object LastWriteTime -LT (Get-Date).AddDays(-{days!raw})«| Where-Object Name -Like {glob}» | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s /d -{days!raw}«/m {glob}» /c "cmd /c if @isdir==FALSE echo @path"',
  },
  find_larger_than: {
    busybox: 'find {path} -type f -size +{sizeBytes!raw}c«-iname {glob}» -exec ls -lh {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Where-Object Length -GT {sizeBytes!raw} | Select-Object Length, LastWriteTime, FullName`,
    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize GTR {sizeBytes!raw} echo @path @fsize"',
  },
  find_smaller_than: {
    busybox: 'find {path} -type f -size -{sizeBytes!raw}c«-iname {glob}»',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Where-Object Length -LT {sizeBytes!raw} | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize LSS {sizeBytes!raw} echo @path"',
  },
  grep_text: {
    busybox: 'find {path} -type f«-iname {glob}» -exec grep -Hn -- {pattern} {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -Pattern {pattern}`,
    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /n /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
  },
  grep_files_containing: {
    busybox: 'find {path} -type f«-iname {glob}» -exec grep -l -- {pattern} {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -List -Pattern {pattern} | Select-Object -ExpandProperty Path`,
    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /m /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
  },
  count_lines: {
    pwsh: '@(Get-Content -LiteralPath {file}).Count',
    cmd: 'find /c /v "" {file}',
  },
  count_lines_code: {
    pwsh: `(${PS_FILES} | Where-Object Name -Like {glob} | Get-Content | Measure-Object).Count`,
    gaps: { cmd: 'no reliable way to concatenate files recursively and count lines in cmd.exe' },
  },
  count_files: {
    pwsh: `(${PS_FILES}«| Where-Object Name -Like {glob}» | Measure-Object).Count`,
    cmd: (s, q) => `where /r ${q(s.path ?? '.')} ${s.glob ? q(s.glob) : '*'} | find /c /v ""`,
  },
  count_words: {
    pwsh: '(Get-Content -LiteralPath {file} -Raw | Measure-Object -Word).Words',
    gaps: { cmd: 'cmd.exe has no word counter' },
  },
  sort_uniq: {
    pwsh: 'Get-Content -LiteralPath {file} | Group-Object -NoElement -CaseSensitive | Sort-Object Count -Descending | Select-Object -First {count!raw}',
    gaps: { cmd: 'cmd.exe has no uniq/group-by equivalent' },
  },
  recent_files: {
    busybox: "find {path} -type f -exec stat -c '%Y %y %n' {} + 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-",
    pwsh: `${PS_FILES} | Sort-Object LastWriteTime -Descending | Select-Object -First {count!raw} -Property LastWriteTime, FullName`,
    gaps: { cmd: 'dir /o-d sorts only within each directory, not recursively' },
  },
  empty_files: {
    pwsh: `${PS_FILES} | Where-Object Length -EQ 0 | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s /c "cmd /c if @isdir==FALSE if @fsize==0 echo @path"',
  },
  empty_dirs: {
    pwsh: `Get-ChildItem -LiteralPath {path} -Directory -Recurse -Force -ErrorAction SilentlyContinue | Where-Object { -not (Get-ChildItem -LiteralPath $_.FullName -Force | Select-Object -First 1) } | ${PS_FULLNAME}`,
    gaps: { cmd: 'cmd.exe cannot test directories for emptiness recursively' },
  },
  duplicate_files: {
    gnuMac: 'find {path} -type f -exec gmd5sum {} + | gsort | guniq -w32 -dD',
    busybox: "find {path} -type f -exec md5sum {} + | sort | awk '{ k = substr($0, 1, 32) } k == p { if (!shown) print last; print; shown = 1; next } { p = k; last = $0; shown = 0 }'",
    pwsh: `${PS_FILES} | Get-FileHash -Algorithm MD5 | Group-Object -Property Hash | Where-Object Count -GT 1 | ForEach-Object Group | Select-Object Hash, Path`,
    gaps: { cmd: 'cmd.exe cannot hash and group files' },
  },
  find_symlinks: {
    busybox: 'find {path} -type l -exec ls -l {} +',
    pwsh: `${PS_ALL} | Where-Object LinkType -EQ 'SymbolicLink' | Select-Object FullName, Target`,
    cmd: 'dir /s /al {path}',
  },
  broken_symlinks: {
    busybox: 'find -L {path} -type l',
    pwsh: `${PS_ALL} | Where-Object { $_.LinkType -eq 'SymbolicLink' -and -not (Test-Path -LiteralPath ([System.IO.Path]::Combine((Split-Path -LiteralPath $_.FullName -Parent), [string]$_.Target))) } | ${PS_FULLNAME}`,
    gaps: { cmd: 'cmd.exe cannot check symlink targets' },
  },
  list_files: {
    pwsh: 'Get-ChildItem -LiteralPath {path} -Force',
    cmd: 'dir /a {path}',
  },
  list_tree: {
    pwsh: String.raw`Get-ChildItem -LiteralPath {path} -Recurse -Depth ({depth!raw} - 1) -Force -ErrorAction SilentlyContinue | Where-Object FullName -NotMatch '[\\/]\.git([\\/]|$)' | Sort-Object FullName | ` + PS_FULLNAME,
    gaps: { cmd: 'tree has no depth limit' },
  },
  hidden_files: {
    pwsh: "Get-ChildItem -LiteralPath {path} -Force | Where-Object { $_.Name -like '.*' -or $_.Attributes -band [System.IO.FileAttributes]::Hidden }",
    cmd: 'dir /a:h {path}',
  },
  file_type: {
    // Windows has no content sniffing like file(1); show what the filesystem knows instead.
    pwsh: { win: 'Get-Item -LiteralPath {file} -Force | Select-Object Name, Extension, Length, Attributes, LinkType', unix: 'file {file}' },
    gaps: { cmd: 'no file(1) equivalent on Windows' },
  },
  file_stat: {
    pwsh: 'Get-Item -LiteralPath {file} -Force | Format-List FullName, Mode, Length, CreationTime, LastWriteTime, LastAccessTime',
    cmd: 'dir /a /q {file}',
  },
  head_file: {
    pwsh: 'Get-Content -LiteralPath {file} -TotalCount {count!raw}',
    gaps: { cmd: 'cmd.exe has no head equivalent' },
  },
  tail_file: {
    pwsh: 'Get-Content -LiteralPath {file} -Tail {count!raw}',
    gaps: { cmd: 'cmd.exe has no tail equivalent' },
  },
  tail_follow: {
    pwsh: 'Get-Content -LiteralPath {file} -Tail 10 -Wait',
    gaps: { cmd: 'cmd.exe cannot follow a file' },
  },
  cat_file: {
    pwsh: 'Get-Content -LiteralPath {file}',
    cmd: 'type {file}',
  },
  print_line_range: {
    pwsh: 'Get-Content -LiteralPath {file} | Select-Object -Index (({start!raw} - 1)..({end!raw} - 1))',
    gaps: { cmd: 'cmd.exe has no command that prints a line range of a file' },
  },
  compress_targz: {
    pwsh: 'tar -czvf {archive} {path}', // tar.exe ships with Windows 10 1803+
    cmd: 'tar -czvf {archive} {path}',
  },
  extract_targz: {
    pwsh: 'tar -xzvf {file}«-C {dest}»',
    cmd: 'tar -xzvf {file}«-C {dest}»',
  },
  compress_zip: {
    pwsh: 'Compress-Archive -LiteralPath {path} -DestinationPath {archive}',
    cmd: 'tar -a -c -f {archive} {path}', // bsdtar picks zip format from the .zip suffix
  },
  extract_zip: {
    pwsh: (s, q) => `Expand-Archive -LiteralPath ${q(s.file)} -DestinationPath ${s.dest ? q(s.dest) : '.'}`,
    cmd: 'tar -xf {file}«-C {dest}»',
  },
  list_archive: {
    // bsdtar on Windows lists zip archives too; GNU tar on Linux does not.
    pwsh: (s, q, ctx) => (!isWin(ctx) && /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file)}` : `tar -tvf ${q(s.file)}`),
    cmd: 'tar -tvf {file}',
  },
  chmod: {
    pwsh: { unix: 'chmod {mode!raw} {file}' },
    gaps: { pwsh: 'Windows: no POSIX permission bits (use icacls)', cmd: 'no POSIX permission bits (use icacls)' },
  },
  make_executable: {
    pwsh: { unix: 'chmod +x {file}' },
    gaps: { pwsh: 'Windows: no executable bit (determined by file extension)', cmd: 'no executable bit (determined by file extension)' },
  },
  chown: {
    pwsh: { win: 'icacls {path} /setowner {user} /T', unix: 'sudo chown -R {user} {path}' },
    cmd: 'icacls {path} /setowner {user} /T',
  },
  copy: {
    // -Confirm keeps cp -i's "ask before overwriting" safety (Copy-Item overwrites silently).
    pwsh: 'Copy-Item -LiteralPath {src} -Destination {dst} -Recurse -Confirm',
    cmd: 'copy /-y {src} {dst}',
  },
  move_rename: {
    // Move-Item refuses to overwrite an existing file without -Force, which matches mv -i's safety.
    pwsh: 'Move-Item -LiteralPath {src} -Destination {dst}',
    cmd: 'move /-y {src} {dst}',
  },
  delete_file: {
    pwsh: 'Remove-Item -LiteralPath {file}',
    cmd: 'del {file}',
  },
  delete_dir: {
    pwsh: 'Remove-Item -LiteralPath {path} -Recurse',
    cmd: 'rmdir /s {path}',
  },
  delete_by_ext: {
    busybox: 'find {path} -type f -iname {glob} -exec rm {} +',
    pwsh: `${PS_FILES} | Where-Object Name -Like {glob} | Remove-Item`,
    cmd: 'pushd {path} && (del /s {glob} & popd)',
  },
  mkdir: {
    // -Force on a directory only means "create parents, do not fail if it exists" (mkdir -p).
    pwsh: 'New-Item -ItemType Directory -Force -Path {path}',
    cmd: 'mkdir {path}',
  },
  touch_file: {
    pwsh: 'if (Test-Path -LiteralPath {file}) { (Get-Item -LiteralPath {file}).LastWriteTime = Get-Date } else { New-Item -ItemType File -Path {file} }',
    cmd: 'type nul >> {file}',
  },
  current_dir: {
    pwsh: 'Get-Location',
    cmd: 'cd',
  },
  create_symlink: {
    pwsh: 'New-Item -ItemType SymbolicLink -Path {dst} -Target {src}',
    cmd: 'mklink {dst} {src}',
  },
  diff_files: {
    pwsh: {
      win: 'Compare-Object -ReferenceObject (Get-Content -LiteralPath {src}) -DifferenceObject (Get-Content -LiteralPath {dst})',
      unix: 'diff -u {src} {dst}',
    },
    cmd: 'fc {src} {dst}',
  },
  replace_text: {
    pwsh: '(Get-Content -LiteralPath {file} -Raw).Replace({old}, {new}) | Set-Content -LiteralPath {file} -NoNewline',
    gaps: { cmd: 'cmd.exe has no in-place text replacement' },
  },
  disk_mounts: {
    busybox: 'mount',
    pwsh: { win: 'Get-Volume' },
    cmd: 'mountvol',
  },
  block_devices: {
    busybox: 'cat /proc/partitions',
    pwsh: { win: 'Get-Partition' },
    gaps: { cmd: 'wmic is deprecated/removed and diskpart needs admin' },
  },
  hash_sha256: {
    pwsh: 'Get-FileHash -LiteralPath {file} -Algorithm SHA256',
    cmd: 'certutil -hashfile {file} SHA256',
  },
  hash_md5: {
    pwsh: 'Get-FileHash -LiteralPath {file} -Algorithm MD5',
    cmd: 'certutil -hashfile {file} MD5',
  },
  base64_encode: {
    pwsh: (s, q) => (s.file
      ? `[Convert]::ToBase64String([System.IO.File]::ReadAllBytes((Resolve-Path -LiteralPath ${q(s.file)}).ProviderPath))`
      : `[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(${q(s.text ?? '<TEXT>')}))`),
    gaps: { cmd: 'certutil -encode writes to a file with PEM headers, not to stdout' },
  },
  base64_decode: {
    pwsh: (s, q) => (s.file
      ? `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String((Get-Content -LiteralPath ${q(s.file)} -Raw)))`
      : `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(${q(s.text ?? '<TEXT>')}))`),
    gaps: { cmd: 'certutil -decode writes to a file, not to stdout' },
  },

  // ---------- processes ----------
  top_cpu: {
    busybox: 'top -b -n 1 | head -n $(({count!raw} + 4))',
    pwsh: 'Get-Process | Sort-Object CPU -Descending | Select-Object -First {count!raw}',
    gaps: { cmd: 'tasklist cannot sort by CPU usage' },
  },
  top_mem: {
    busybox: 'ps -o pid,user,rss,vsz,args | sort -k3 -rh | head -n {count!raw}',
    pwsh: 'Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First {count!raw}',
    cmd: 'tasklist | sort /r /+65', // Mem Usage column is right-aligned starting at column 65
  },
  find_process: {
    pwsh: `${PS_PROC_MATCH} | Select-Object Id, ProcessName, CommandLine`,
    cmd: 'tasklist | findstr /i {name}',
  },
  kill_by_name: {
    pwsh: { win: `${PS_PROC_MATCH} | Stop-Process`, unix: 'pkill -f {name}' },
    cmd: (s, q) => `taskkill /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`)}`,
  },
  kill_force: {
    pwsh: { win: `${PS_PROC_MATCH} | Stop-Process -Force`, unix: 'pkill -9 -f {name}' },
    cmd: (s, q) => `taskkill /f /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`)}`,
  },
  kill_by_pid: {
    // `kill` is an alias of Stop-Process (SIGKILL on Unix) in PowerShell; call the real binary for SIGTERM.
    pwsh: { win: 'Stop-Process -Id {pid!raw}', unix: '/bin/kill {pid!raw}' },
    cmd: 'taskkill /pid {pid!raw}',
  },
  kill_by_port: {
    busybox: 'fuser -k -TERM {port!raw}/tcp',
    pwsh: { win: 'Get-NetTCPConnection -LocalPort {port!raw} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ }' },
    cmd: 'for /f "tokens=5" %p in (\'netstat -ano ^| findstr /r /c:":{port!raw} .*LISTENING"\') do taskkill /pid %p',
  },
  listening_ports: {
    busybox: 'netstat -tulpn',
    pwsh: { win: 'Get-NetTCPConnection -State Listen | Sort-Object LocalPort' },
    cmd: 'netstat -ano | findstr LISTENING',
  },
  process_on_port: {
    busybox: "netstat -tulpn | grep ':{port!raw} '",
    pwsh: { win: "Get-NetTCPConnection -LocalPort {port!raw} -State Listen -ErrorAction SilentlyContinue | Select-Object LocalAddress, LocalPort, State, OwningProcess, @{ Name = 'Process'; Expression = { (Get-Process -Id $_.OwningProcess).ProcessName } }" },
    cmd: 'netstat -ano | findstr :{port!raw}',
  },
  established_connections: {
    busybox: 'netstat -tun | grep ESTABLISHED',
    pwsh: { win: 'Get-NetTCPConnection -State Established' },
    cmd: 'netstat -an | findstr ESTABLISHED',
  },
  process_tree: {
    busybox: 'ps -o pid,ppid,user,args',
    pwsh: { win: 'Get-CimInstance -ClassName Win32_Process | Sort-Object ParentProcessId | Select-Object ProcessId, ParentProcessId, Name' },
    gaps: { cmd: 'tasklist has no parent PID (wmic is deprecated)' },
  },

  // ---------- system ----------
  system_info: {
    pwsh: { win: `${PS_OS} | Select-Object CSName, Caption, Version, BuildNumber, OSArchitecture`, unix: 'uname -a' },
    cmd: 'systeminfo',
  },
  os_release: {
    pwsh: { win: `${PS_OS} | Select-Object Caption, Version, BuildNumber` },
    cmd: 'ver',
  },
  kernel_version: {
    pwsh: { win: '[System.Environment]::OSVersion.Version', unix: 'uname -r' },
    cmd: 'ver',
  },
  memory_usage: {
    pwsh: { win: `${PS_OS} | Select-Object @{ Name = 'TotalGB'; Expression = { [math]::Round($_.TotalVisibleMemorySize / 1MB, 1) } }, @{ Name = 'FreeGB'; Expression = { [math]::Round($_.FreePhysicalMemory / 1MB, 1) } }` },
    cmd: 'systeminfo | findstr /c:"Physical Memory"',
  },
  cpu_info: {
    busybox: 'cat /proc/cpuinfo',
    pwsh: { win: 'Get-CimInstance -ClassName Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors, MaxClockSpeed' },
    cmd: 'echo %PROCESSOR_IDENTIFIER% & echo %NUMBER_OF_PROCESSORS%',
  },
  cpu_cores: {
    pwsh: '[System.Environment]::ProcessorCount',
    cmd: 'echo %NUMBER_OF_PROCESSORS%',
  },
  uptime: {
    pwsh: { win: `(Get-Date) - (${PS_OS}).LastBootUpTime`, unix: 'uptime' },
    cmd: 'systeminfo | findstr /c:"Boot Time"',
  },
  hostname: {
    pwsh: 'hostname',
    cmd: 'hostname',
  },
  whoami: {
    pwsh: 'whoami',
    cmd: 'whoami',
  },
  users_logged_in: {
    pwsh: { win: 'Get-CimInstance -ClassName Win32_ComputerSystem | Select-Object UserName', unix: 'who' },
    cmd: 'query user',
  },
  last_logins: {
    bsd: 'last | head -n {count!raw}',
    busybox: 'last | head -n {count!raw}',
    pwsh: { win: "Get-WinEvent -FilterHashtable @{ LogName = 'Security'; Id = 4624 } -MaxEvents {count!raw}", unix: 'last -n {count!raw}' },
    gaps: { cmd: 'logon events need wevtutil with an XPath query on the Security log (admin)' },
  },
  env_vars: {
    pwsh: 'Get-ChildItem -Path Env: | Sort-Object Name',
    cmd: 'set',
  },
  env_var_get: {
    pwsh: '$env:{var!raw}',
    cmd: 'echo %{var!raw}%',
  },
  which_cmd: {
    pwsh: 'Get-Command -Name {cmd} -CommandType Application -All | Select-Object -ExpandProperty Source',
    cmd: 'where {cmd}',
  },
  show_path: {
    fish: 'string join \\n $PATH',
    pwsh: '$env:PATH -split [System.IO.Path]::PathSeparator',
    cmd: 'echo %PATH:;=&echo.%',
  },
  history_search: {
    zsh: 'grep -ai -- {pattern} "${HISTFILE:-$HOME/.zsh_history}"',
    busybox: 'grep -i -- {pattern} "${HISTFILE:-$HOME/.ash_history}"',
    fish: 'history search --contains -- {pattern}',
    pwsh: 'Select-String -LiteralPath (Get-PSReadLineOption).HistorySavePath -Pattern {pattern}',
    cmd: 'doskey /history | findstr /i /c:{pattern}',
  },
  date_time: {
    pwsh: 'Get-Date',
    cmd: 'echo %DATE% %TIME%',
  },
  timezone: {
    pwsh: 'Get-TimeZone',
    cmd: 'tzutil /g',
  },
  calendar: {
    pwsh: { unix: 'cal' },
    gaps: { pwsh: 'Windows: no built-in calendar command', cmd: 'no built-in calendar command' },
  },
  cron_list: {
    pwsh: { win: "Get-ScheduledTask -TaskPath '\\'", unix: 'crontab -l' },
    cmd: 'schtasks /query',
  },
  cron_edit: {
    pwsh: { win: 'taskschd.msc', unix: 'crontab -e' },
    cmd: 'taskschd.msc',
  },
  journal_service: {
    pwsh: { win: "Get-WinEvent -FilterHashtable @{ LogName = 'System'; ProviderName = 'Service Control Manager' } -MaxEvents 1000 -ErrorAction SilentlyContinue | Where-Object Message -Like ('*' + {service} + '*')«| Where-Object TimeCreated -GT (Get-Date).AddMinutes(-{minutes!raw})» | Select-Object -First {count!raw}" },
    gaps: { cmd: 'wevtutil cannot filter events by message text' },
  },
  journal_errors: {
    pwsh: { win: `Get-WinEvent -FilterHashtable @{ LogName = 'System'; Level = 1, 2; StartTime = (${PS_OS}).LastBootUpTime } -MaxEvents {count!raw} -ErrorAction SilentlyContinue` },
    cmd: 'wevtutil qe System /q:"*[System[(Level=1 or Level=2)]]" /c:{count!raw} /rd:true /f:text',
  },
  service_status: {
    pwsh: { win: 'Get-Service -Name {service}' },
    cmd: 'sc query {service}',
  },
  service_restart: {
    pwsh: { win: 'Restart-Service -Name {service}' },
    cmd: 'net stop {service} && net start {service}',
  },
  service_stop: {
    pwsh: { win: 'Stop-Service -Name {service}' },
    cmd: 'net stop {service}',
  },
  service_start: {
    pwsh: { win: 'Start-Service -Name {service}' },
    cmd: 'net start {service}',
  },
  service_enable: {
    bsd: 'brew services start {service}',
    pwsh: { win: 'Set-Service -Name {service} -StartupType Automatic; Start-Service -Name {service}' },
    cmd: 'sc config {service} start= auto && net start {service}',
  },
  list_services: {
    pwsh: { win: "Get-Service | Where-Object Status -EQ 'Running'" },
    cmd: 'net start',
  },
  failed_services: {
    bsd: "launchctl list | awk 'NR == 1 || ($2 != \"0\" && $2 != \"-\")'",
    pwsh: { win: "Get-CimInstance -ClassName Win32_Service -Filter \"StartMode='Auto' AND State<>'Running'\" | Select-Object Name, State, ExitCode" },
    gaps: { cmd: 'sc query cannot filter by start mode' },
  },
  dmesg: {
    pwsh: { win: 'Get-WinEvent -LogName System -MaxEvents {count!raw}', unix: 'sudo dmesg | tail -n {count!raw}' },
    cmd: 'wevtutil qe System /c:{count!raw} /rd:true /f:text',
  },
  battery: {
    fish: (s, q, ctx) => ((ctx && ctx.os) === 'darwin'
      ? 'pmset -g batt'
      : 'set -l b /sys/class/power_supply/BAT*/capacity; if test (count $b) -gt 0; cat $b; else; upower -i (upower -e | grep -m1 BAT); end'),
    pwsh: { win: 'Get-CimInstance -ClassName Win32_Battery | Select-Object Name, EstimatedChargeRemaining, BatteryStatus' },
    gaps: { cmd: 'powercfg /batteryreport only writes an HTML report' },
  },
  temperature: {
    pwsh: { win: "Get-CimInstance -Namespace root/WMI -ClassName MSAcpi_ThermalZoneTemperature | Select-Object InstanceName, @{ Name = 'Celsius'; Expression = { $_.CurrentTemperature / 10 - 273.15 } }" },
    gaps: { cmd: 'no temperature sensors access from cmd.exe' },
  },
  gpu_info: {
    pwsh: { win: 'Get-CimInstance -ClassName Win32_VideoController | Select-Object Name, DriverVersion, AdapterRAM' },
    gaps: { cmd: 'wmic is deprecated; dxdiag only writes a report file' },
  },
  usb_devices: {
    pwsh: { win: "Get-PnpDevice -PresentOnly | Where-Object InstanceId -Like 'USB*'" },
    gaps: { cmd: 'no reliable USB device listing in cmd.exe (pnputil output varies by build)' },
  },
  install_package: {
    pwsh: { win: 'winget install {pkg}' },
    cmd: 'winget install {pkg}',
  },
  package_installed: {
    pwsh: { win: 'winget list {pkg}' },
    cmd: 'winget list {pkg}',
  },
  system_update: {
    pwsh: { win: 'winget upgrade --all' },
    cmd: 'winget upgrade --all',
  },

  // ---------- network ----------
  ip_addresses: {
    busybox: 'ip -o addr show',
    pwsh: { win: 'Get-NetIPAddress | Select-Object InterfaceAlias, AddressFamily, IPAddress, PrefixLength' },
    cmd: 'ipconfig',
  },
  public_ip: {
    pwsh: "Invoke-RestMethod -Uri 'https://ifconfig.me/ip'",
    cmd: 'curl -s https://ifconfig.me & echo.',
  },
  ping_host: {
    pwsh: 'Test-Connection -ComputerName {host} -Count {count!raw}',
    cmd: 'ping -n {count!raw} {host}',
  },
  dns_lookup: {
    busybox: 'nslookup {host}',
    pwsh: { win: 'Resolve-DnsName -Name {host}', unix: 'dig +short {host}' },
    cmd: 'nslookup {host}',
  },
  traceroute: {
    pwsh: { win: 'Test-NetConnection -ComputerName {host} -TraceRoute', unix: 'traceroute {host}' },
    cmd: 'tracert {host}',
  },
  routes: {
    pwsh: { win: 'Get-NetRoute' },
    cmd: 'route print',
  },
  port_check: {
    busybox: 'nc -w 3 {host} {port!raw} </dev/null && echo open || echo closed',
    pwsh: { win: 'Test-NetConnection -ComputerName {host} -Port {port!raw}', unix: 'nc -zv {host} {port!raw}' },
    gaps: { cmd: 'no TCP port probe in cmd.exe (telnet client is not installed by default)' },
  },
  curl_headers: {
    // Windows PowerShell 5.1 aliases curl to Invoke-WebRequest, so call curl.exe explicitly.
    pwsh: { win: 'curl.exe -sI {url}', unix: 'curl -sI {url}' },
    cmd: 'curl -sI {url}',
  },
  http_status: {
    pwsh: { win: "curl.exe -s -o NUL -w '%{http_code}\\n' {url}", unix: "curl -s -o /dev/null -w '%{http_code}\\n' {url}" },
    cmd: 'curl -s -o NUL -w "%{http_code}\\n" {url}',
  },
  download_file: {
    pwsh: { win: 'curl.exe -fLO {url}', unix: 'curl -fLO {url}' },
    cmd: 'curl -fLO {url}',
  },
  ssh_connect: {
    pwsh: 'ssh {target}',
    cmd: 'ssh {target}',
  },
  ssh_port_forward: {
    pwsh: 'ssh -N -L {port!raw}:localhost:{port!raw} {target}', // OpenSSH client ships with Windows 10 1809+
    cmd: 'ssh -N -L {port!raw}:localhost:{port!raw} {target}',
  },

  // ---------- git ----------
  git_status: { pwsh: 'git status', cmd: 'git status' },
  git_log: {
    pwsh: 'git log --oneline --graph --decorate -n {count!raw}',
    cmd: 'git log --oneline --graph --decorate -n {count!raw}',
  },
  git_diff: {
    // a bare `--` can be swallowed by PowerShell before reaching native commands; quote it
    pwsh: "git diff«'--' {file}»",
    cmd: 'git diff«-- {file}»',
  },
  git_diff_staged: { pwsh: 'git diff --staged', cmd: 'git diff --staged' },
  git_branches: { pwsh: 'git branch -a', cmd: 'git branch -a' },
  git_current_branch: { pwsh: 'git branch --show-current', cmd: 'git branch --show-current' },
  git_new_branch: { pwsh: 'git checkout -b {branch}', cmd: 'git checkout -b {branch}' },
  git_switch_branch: { pwsh: 'git checkout {branch}', cmd: 'git checkout {branch}' },
  git_delete_branch: { pwsh: 'git branch -d {branch}', cmd: 'git branch -d {branch}' },
  git_undo_commit: { pwsh: 'git reset --soft HEAD~1', cmd: 'git reset --soft HEAD~1' },
  git_discard_changes: { pwsh: 'git restore«{file}»', cmd: 'git restore«{file}»' },
  git_stash: { pwsh: 'git stash', cmd: 'git stash' },
  git_stash_pop: { pwsh: 'git stash pop', cmd: 'git stash pop' },
  git_pull: { pwsh: 'git pull', cmd: 'git pull' },
  git_push: { pwsh: 'git push«origin {branch}»', cmd: 'git push«origin {branch}»' },
  git_clone: { pwsh: 'git clone {url}', cmd: 'git clone {url}' },
  git_add_all: { pwsh: 'git add -A', cmd: 'git add -A' },
  git_commit: {
    // `&&` needs PowerShell 7+; this form also works in Windows PowerShell 5.1
    pwsh: 'git add -A; if ($LASTEXITCODE -eq 0) { git commit -m {message} }',
    cmd: 'git add -A && git commit -m {message}',
  },
  git_remote: { pwsh: 'git remote -v', cmd: 'git remote -v' },
  git_blame: { pwsh: 'git blame {file}', cmd: 'git blame {file}' },
  git_init: { pwsh: 'git init', cmd: 'git init' },

  // ---------- docker ----------
  docker_ps: { pwsh: 'docker ps', cmd: 'docker ps' },
  docker_ps_all: { pwsh: 'docker ps -a', cmd: 'docker ps -a' },
  docker_logs: {
    pwsh: 'docker logs --tail {count!raw} -f {container}',
    cmd: 'docker logs --tail {count!raw} -f {container}',
  },
  docker_images: { pwsh: 'docker images', cmd: 'docker images' },
  docker_stop: { pwsh: 'docker stop {container}', cmd: 'docker stop {container}' },
  docker_stop_all: {
    fish: 'docker stop (docker ps -q)',
    pwsh: 'docker stop (docker ps -q)',
    cmd: "for /f %i in ('docker ps -q') do docker stop %i",
  },
  docker_prune: { pwsh: 'docker system prune -a', cmd: 'docker system prune -a' },
  docker_exec: { pwsh: 'docker exec -it {container} sh', cmd: 'docker exec -it {container} sh' },
  docker_stats: { pwsh: 'docker stats --no-stream', cmd: 'docker stats --no-stream' },
  docker_compose_up: { pwsh: 'docker compose up -d', cmd: 'docker compose up -d' },
  docker_compose_down: { pwsh: 'docker compose down', cmd: 'docker compose down' },

  // ---------- developer tools (v0.4) ----------
  // npm / npx / gh / ssh are the same native programs in PowerShell and cmd.exe
  npm_run_script: { pwsh: 'npm run {script}', cmd: 'npm run {script}' },
  npm_install: { pwsh: 'npm install«{pkg}»', cmd: 'npm install«{pkg}»' },
  npm_install_global: { pwsh: 'npm install -g {pkg}', cmd: 'npm install -g {pkg}' },
  pip_install: { pwsh: { win: 'py -m pip install {pkg}', unix: 'python3 -m pip install {pkg}' }, cmd: 'py -m pip install {pkg}' },
  tool_version: { pwsh: '& {cmd} --version', cmd: '{cmd} --version' },
  cli_help: { pwsh: '& {cmd} --help', cmd: '{cmd} --help' },
  wrangler_deploy: { pwsh: 'npx wrangler deploy', cmd: 'npx wrangler deploy' },
  wrangler_dev: { pwsh: 'npx wrangler dev', cmd: 'npx wrangler dev' },
  wrangler_tail: { pwsh: 'npx wrangler tail', cmd: 'npx wrangler tail' },
  wrangler_secret_put: { pwsh: 'npx wrangler secret put {var!raw}', cmd: 'npx wrangler secret put {var!raw}' },
  wrangler_login: { pwsh: 'npx wrangler login', cmd: 'npx wrangler login' },
  wrangler_whoami: { pwsh: 'npx wrangler whoami', cmd: 'npx wrangler whoami' },
  gh_auth_status: { pwsh: 'gh auth status', cmd: 'gh auth status' },
  gh_auth_login: { pwsh: 'gh auth login', cmd: 'gh auth login' },
  gh_pr_list: { pwsh: 'gh pr list', cmd: 'gh pr list' },
  gh_pr_view: { pwsh: 'gh pr view«{pr!raw}»', cmd: 'gh pr view«{pr!raw}»' },
  gh_pr_create: { pwsh: 'gh pr create --fill', cmd: 'gh pr create --fill' },
  gh_pr_checks: { pwsh: 'gh pr checks«{pr!raw}»', cmd: 'gh pr checks«{pr!raw}»' },
  gh_pr_merge: { pwsh: 'gh pr merge«{pr!raw}»', cmd: 'gh pr merge«{pr!raw}»' },
  gh_run_list: { pwsh: 'gh run list', cmd: 'gh run list' },
  gh_run_view: { pwsh: 'gh run view«{num!raw}»', cmd: 'gh run view«{num!raw}»' },
  activate_venv: {
    fish: 'source {path}/bin/activate.fish',
    pwsh: { win: "& (Join-Path {path} 'Scripts/Activate.ps1')", unix: "& (Join-Path {path} 'bin/Activate.ps1')" },
    cmd: 'call {path}\\Scripts\\activate.bat',
  },
};
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
/bin/bash -lc "rg -n 'writeFile|mkdir|mkdtemp|execSync|spawnSync|unlink|rmSync' test; sed -n '270,370p' src/pipeline.js; cat src/render.js" in /workspace/tellsh
 succeeded in 0ms:
test/regressions6.test.js:45:  assert.equal(run('delete it', ['mkdir /tmp/new']).command, 'rm -r /tmp/new');
test/regressions6.test.js:78:  refused(run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']), '<PATH>', 'hint');
test/regressions6.test.js:81:  const ctx = buildContext(['mkdir /a', 'mkdir /b']);
test/regressions6.test.js:157:  assert.equal(run('copy notes.txt to it', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
test/regressions6.test.js:158:  assert.equal(run('skopiuj notes.txt do niego', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
test/regressions6.test.js:159:  assert.equal(run('move report.pdf into that folder', ['mkdir /srv/x']).command, 'mv -i report.pdf /srv/x');
test/slot-cases.js:57:  ['mkdir', 'create folder src/components/ui', 'mkdir -p src/components/ui'],
test/regressions3-history.test.js:40:  assert.equal(run('delete it', ['cat old.txt; mkdir newdir']).command, 'rm -r newdir');
test/regressions3-history.test.js:42:  assert.equal(run('delete it', ['mkdir olddir; cat new.txt']).command, 'rm new.txt');
test/regressions3-history.test.js:60:  assert.equal(run('remove it', ['mkdir /srv/remove-backups', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:61:  assert.equal(run('delete it', ['mkdir /srv/delete-me', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:64:  assert.equal(run('usuń to', ['mkdir /srv/usun-stare', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:68:  const old = run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']);
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
test/pipeline.test.js:4:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/pipeline.test.js:93:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-hist-'));
test/pipeline.test.js:96:    writeFileSync(f, Array.from({ length: 50 }, (_, i) => `: 17000000${i}:0;echo ${i}`).join('\n') + '\n');
test/pipeline.test.js:100:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions5.test.js:109:  assert.equal(run('move it to /tmp/old', ['mkdir /tmp/build']).command, 'mv -i /tmp/build /tmp/old');
test/regressions2.test.js:6:import { spawnSync } from 'node:child_process';
test/regressions2.test.js:8:import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
test/regressions2.test.js:25:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions2.test.js:171:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r2-'));
test/regressions2.test.js:174:    writeFileSync(hf, 'cat secret.txt\n');
test/regressions2.test.js:178:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions8.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions8.test.js:9:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/regressions8.test.js:22:const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/regressions8.test.js:53:  const ctx = buildContext(['cat a.txt', 'docker logs web', 'mkdir /tmp/b']);
test/regressions8.test.js:65:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r7-'));
test/regressions8.test.js:68:    writeFileSync(f, 'cat old.txt\nls\ncat new.txt\n');
test/regressions8.test.js:72:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions8.test.js:107:  const c = run('delete it', [`mkdir ${long}`]);
test/regressions8.test.js:194:test('minor: a NUL byte never reaches spawnSync', () => {
test/shells.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/shells.test.js:12:const has = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
test/shells.test.js:51:      const res = spawnSync(checker, args, { encoding: 'utf8' });
test/shells.test.js:65:    if (has('fish')) { const res = spawnSync('fish', ['-n', '-c', r.command]); if (res.status !== 0) bad.push(it.id); }
test/regressions4.test.js:188:  const { spawnSync } = await import('node:child_process');
test/regressions4.test.js:189:  const { mkdtempSync, writeFileSync } = await import('node:fs');
test/regressions4.test.js:192:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r4-'));
test/regressions4.test.js:194:  writeFileSync(hist, 'rm -r old\nls newdir\n');
test/regressions4.test.js:195:  const r = spawnSync(process.execPath, ['bin/tellsh.js', '--dry-run', `--history=${hist}`, 'same', 'for', '/srv/current'], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
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
test/regressions7.test.js:73:  assert.equal(run('copy notes.txt to it', ['mkdir /tmp/n']).command, 'cp -ri notes.txt /tmp/n');
test/regressions7.test.js:127:    `awk 'BEGIN{system("rm -rf /")}'`, `node -e "require('fs').rmSync('/',{recursive:true})"`, 'chmod 000 /', 'chmod 000 /etc',
test/regressions10.test.js:9:import { spawnSync } from 'node:child_process';
test/regressions10.test.js:22:const cliJson = (...words) => JSON.parse(spawnSync(process.execPath, [BIN, '--json', '--shell', 'bash', '--os', 'linux', ...words],
test/regressions10.test.js:143:  const sed = spawnSync('sh', ['-c', `sed -n -e "s#^  const leaks = excl.has;\\$#  const leaks = (t) => excl.has(t) || isDevText(t);#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
test/cli.test.js:3:import { spawnSync } from 'node:child_process';
test/cli.test.js:5:import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/cli.test.js:10:const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/cli.test.js:94:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-cli-'));
test/cli.test.js:97:    writeFileSync(f, 'echo SECRET_TOKEN=abc123\ncat notes.txt\n');
test/cli.test.js:103:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions11.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions11.test.js:33:  const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', 'start', 'wrangler', 'dev'],
test/regressions11.test.js:84:  const sed = spawnSync('sh', ['-c', `DEV_TEXTS=/x.json; sed -n -e "s#^import { ctxFeatures } from '../src/history.js';#&\\nconst _devIndex = new Set(JSON.parse(readFileSync('$DEV_TEXTS', 'utf8')));#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
test/compose.test.js:47:  const { spawnSync } = await import('node:child_process');
test/compose.test.js:48:  const r = spawnSync('sh', ['-c', 'node bin/tellsh.js --dry-run show disk usage | head -c 1 >/dev/null; echo $?'], { encoding: 'utf8' });
test/regressions12.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions12.test.js:73:    const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', ...q.split(' ')],
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
/bin/bash -lc "rg -n '"'^export|''^function|''^const [A-Z_]+|gh|same-for|same for'"' src/history.js; cat src/fill.js" in /workspace/tellsh
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
121:// PowerShell string cannot end right before another quote (`''''` is one string, not two).
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
242:// options that take a value, per command (so `kill -s 9 4242` or `pkill nginx -u bob` pick the right word)
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
365:const TELLSH_LINE = /^(?:npx\s+(?:-y\s+)?|node\s+)?(?:\S*[\\/])?tellsh(?:\.js)?(?:\s+(.*))?$/s;
368:const TELLSH_VALUE_OPTS = new Set(['--shell', '--os', '--platform', '--top', '--threshold']);
374:export function tellshQuery(line, kind = 'posix') {
380:export function tellshArgs(line, kind = 'posix') {
406:export function analyzeCommand(line, classify, kind = 'posix') {
569:const FS_LISTERS = new Set(['ls', 'tree', 'dir', 'gci', 'get-childitem', 'll', 'la', 'find', 'fd', 'fdfind', 'locate', 'mlocate', 'plocate',
571:const FS_SEARCHERS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'select-string', 'sls', 'findstr']);
572:const PROC_LISTERS = new Set(['ps', 'top', 'htop', 'btop', 'atop', 'pgrep', 'pidof', 'pstree', 'get-process', 'gps', 'tasklist']);
574:const GLOBAL_VALUE_OPTS = {
582:const SCOPE_OPTS = {
587:const SCOPE_ENV = /^(?:GIT_DIR|GIT_WORK_TREE|GIT_NAMESPACE|DOCKER_HOST|DOCKER_CONTEXT|DOCKER_CONFIG|CONTAINER_HOST|CONTAINER_CONNECTION)=/;
589:function scopedElsewhere(w, raw) {
602:const WRAPPER_CWD = {
614:const CWD_WRAPPERS = new Set(['pkexec']);
615:const WRAPPER_ROOT = {
621:const ROOT_WRAPPERS = new Set(['chroot', 'proot', 'firejail', 'bwrap', 'systemd-nspawn']);
624:const NS_WRAPPERS = new Set(['nsenter', 'unshare']);
627:const WRAPPER_HOST = {
633:const HOST_WRAPPERS = new Set(['machinectl']);
637:const PROP_WRAPPERS = new Set(['systemd-run', 'run0']);
639:const PROP_OPT = /^(?:-[tPqGdSr]*p|--property)$/;
640:const PROP_ATTACHED = /^(?:-[tPqGdSr]*p|--property=)(.+)$/;
641:const PROP_CWD = /^WorkingDirectory=/i;
642:const PROP_ROOT = /^(?:RootDirectory|RootImage|RootEphemeral|MountImages|ExtensionImages|ExtensionDirectories|BindPaths|BindReadOnlyPaths|TemporaryFileSystem|PrivateTmp|PrivateMounts|MountAPIVFS|PrivatePIDs|PrivateNetwork|NetworkNamespacePath|IPCNamespacePath|PrivateUsers|JoinsNamespaceOf|PrivateIPC|PrivateDevices)=|^ProtectHome=tmpfs\b/i;
647:function wrapperScope(w, raw) {
669:function markScoped(o) {
673:function afterGlobals(head, args) {
681:function listedBySegment(w, pipedIn, k) {
705:const LIST_INTENT = { docker_ps: ['container'], docker_ps_all: ['container'], docker_stats: ['container'], list_services: ['service'],
707:const LIST_FAMILY = { ls: ['file', 'dir'], find: ['file', 'dir'], grep: ['file', 'dir'], du: ['file', 'dir'], ps: ['pid', 'proc'], ss: ['port', 'pid', 'proc'] };
712:const FILTER_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag', 'findstr', 'select-string', 'sls', 'where-object', 'where', '?']);
713:const GREP_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag']);
723:function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
790:  } else if (head === 'gh' && nonFlags[0] === 'pr' && GH_PR_SELECTS.has(nonFlags[1])) {
791:    // `gh pr view 45`, `gh pr checkout feature/x`, `gh pr merge <url>`: the pull request ("merge that pr"); none named is
876:const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url', 'pr'];
877:// gh pr subcommands whose operand selects one pull request, and the options of those that take a value
878:const GH_PR_SELECTS = new Set(['view', 'checkout', 'co', 'merge', 'close', 'reopen', 'diff', 'checks', 'review', 'ready', 'edit', 'comment']);
879:const GH_PR_VALUE_OPTS = new Set(['-R', '--repo', '--json', '-q', '--jq', '-t', '--template', '--title', '-b', '--body', '-F',
886: * reference target ("delete it", "same for /var", "there" always mean the previous command, never an older one);
898:export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
931:export function cwdFlags(cwd) {
942:export function ctxFeatures(ctx) {
956:const SAME_RES = [
968:const EXPLICIT_SAME = [SAME_RES[0], SAME_RES[3], SAME_RES[4], SAME_RES[6]];
972:const PRONOUN_EN = /\b(it|its|that|this|them|those|these|the same one)\b/;
973:const PRONOUN_WORD = /^(it|its|that|this|them|those|these|one|again|there|here|tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym|to|force|forced|forcibly|sila|sile|silowo|recursive\w*|rekurencyjn\w*|please|prosze|too|also|tez|rowniez)$/;
975:const PLURAL = /(?:^|[^a-z])(them|those|these|je|te|tamte|ich|nimi)(?=$|[^a-z])/;
976:const PRONOUN_PL = /(?:^|\s)(tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym)(?=\s|$|[?!.,])|(?:^|\s)to(?=\s*[?!.]*$|\s+(?:co|ktor\w*|tam))/;
980:const LOCATIVE = new RegExp([
991:export const hasLocative = (q) => LOCATIVE.test(fold(q));
994:const CONTENTS = new RegExp([
1003:const NOUN_TYPE = [
1018:const FORCE = /\b(force\w*|forcibly|-9|sigkill|na sile|sila|silowo|brutaln\w*)\b/;
1019:const VERBS = [
1041:const SLOT_FROM_ENT = {
1047:const NOT_REF = /\b(?:that|which|this)\s+(?:are|is|was|were|have|has|had|(?:contain|match|end|start|begin|use|take|listen|run|belong|need)(?:s|es|ed|d|ing)?|running|using|taking|ran|took|do|does|did|can|could|will|would|should|i|you|we|they)\b|\b(?:this|that|last|next)\s+(?:week|month|year|day|morning|evening|afternoon|night|time|hour|minute)s?\b/g;
1049:export const hasPronoun = (q) => PRONOUN_EN.test(refText(q)) || PRONOUN_PL.test(refText(q));
1051:/** "same for X": returns the new argument text or null. */
1052:export function sameFor(q) {
1062:function retarget(intent, arg) {
1082: *   { rule: 'same-for', intent, slots, note }   (full override, slots to merge over the previous ones)
1086:export function resolveReference(query, ctx) {
1099:    // "same for api" after `docker --context prod logs web`: here it would run against another daemon / repository
1103:    // "same for /srv/x" after `git status`: the previous command has no slot for it; not a new request either
1113:      return { rule: 'same-for', intent: ctx.last.intent, slots, changed: rt.slot, note: `same as previous ${ctx.last.intent} with ${rt.slot}=${rt.value}` };
1116:  // "same for X", "same but …" when the previous command is not one tellsh can repeat (`ls newdir`, `clear`)
1181:function locativeRef(fq, ctx) {
1201:export function changeGuard(type, value, fq, ctx) {
1227:const HINTED_NOUN = /\b(?:that|this|those|these|the|ten|ta|te|tamten|tamta|tamte)\s+([a-z0-9][\w.-]*)\s+(?:folders?|director(?:y|ies)|dirs?|files?|branch(?:es)?|containers?|services?|process(?:es)?|katalog\w*|folder\w*|plik\w*|kontener\w*|uslug\w*|galaz\w*|galez\w*)\b/g;
1229:const NOT_HINT = /^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back|list\w*|wylistuj\w*|check|sprawdz\w*|wipe|nuke|purge|destroy|clear|clean\w*|wyczysc\w*|drop|what|which|where|about|with|from|into|then|also|again|teraz|jeszcze|whatever|everything|anything|something|thing|stuff|still|there|here|tutaj|tamto|wszystko|cokolwiek|whole|entire|completely|cale|calym|listening|running|working|executable|wykonywaln\w*|contents?|zawartosc\w*|entries|inside|wewnatrz|siedzi|srodku|please|prosze|again|ponownie|znowu|forcefully|recursively|rekurencyjnie|permanently|trwale|names?|nazw\w*|only|tylko|same|samo|thing|merged|zmergowan\w*|scalon\w*|current|biezac\w*|aktualn\w*|obecn\w*|previous|poprzedni\w*|ostatni\w*|last|other|inn\w*|empty|pust\w*|temporary|tymczasow\w*|local|lokaln\w*|remote|zdaln\w*|stopped|zatrzyman\w*|created|utworzon\w*|newly|nowo|nowy|nowa|nowe|nowym|whole|cal\w*|samym|given|mentioned|wspomnian\w*|above|powyzsz\w*|broken|zepsut\w*|failed|failing|nieudan\w*|old\w*|star\w*)$/;
1234:export function entityForSlot(slot, ctx) {
1246:const SAME_BUT = [/^\s*(?:and\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?,?\s+but\s+(.+)$/, /^\s*(?:a\s+|i\s+)?(?:to\s+)?samo,?\s+ale\s+(.+)$/,
1249:export function sameBut(query, ctx) {
1259:function intentUses(intent, ent) {
1263:function pickEnt(intent, ent, ctx) {
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
    // the pull request the user names: a URL or a branch is kept as it is (validation withholds an odd one), never
    // dropped for a bare `gh pr merge`, which acts on the current branch's pull request
    const sel = prSelector(ex);
    if (sel != null) v.pr = String(sel).replace(/^#(?=\d)/, '');
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
/bin/bash -lc "node --input-type=module <<'JS'
import {readdirSync,readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const files=readdirSync('test').filter(f=>f.endsWith('.test.js')&&"'!/'"\\b(?:mkdtempSync|writeFileSync|mkdirSync|chmodSync)\\b/.test(readFileSync('test/'+f,'utf8'))).map(f=>'test/'+f);
console.log('Read-only test files:',files.join(' '));
const r=spawnSync(process.execPath,['--test',...files],{encoding:'utf8'});
console.log(r.stdout.split('\\n').filter((s,i,a)=>/"'^not ok|''^# (tests|suites|pass|fail|cancelled|skipped|duration)/.test(s)||a.slice(Math.max(0,i-3),i).some(x=>/''^not ok/.test(x))).join('"'\\n'));
console.log(r.stderr);process.exitCode=r.status;
JS" in /workspace/tellsh
exec
/bin/bash -lc "sed -n '723,807p' src/history.js; sed -n '1047,1182p' src/history.js; cat scripts/hybrid/prune_vocab.py scripts/hybrid/export_encoder.py" in /workspace/tellsh
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

 exited 1 in 4996ms:
Read-only test files: test/compose.test.js test/danger.test.js test/devtools.test.js test/hybrid.test.js test/parity.test.js test/regressions10.test.js test/regressions11.test.js test/regressions12.test.js test/regressions13.test.js test/regressions14.test.js test/regressions15.test.js test/regressions16.test.js test/regressions17.test.js test/regressions18.test.js test/regressions3-history.test.js test/regressions3-render.test.js test/regressions3.test.js test/regressions5.test.js test/regressions6.test.js test/regressions7.test.js test/shells.test.js test/slots.test.js test/templates.test.js



exec
/bin/bash -lc "node --input-type=module <<'JS'
import {readdirSync,readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const files=readdirSync('test').filter(f=>f.endsWith('.test.js')&&"'!/'"\\b(?:mkdtempSync|writeFileSync|mkdirSync|chmodSync)\\b/.test(readFileSync('test/'+f,'utf8'))).map(f=>'test/'+f);
const r=spawnSync(process.execPath,['--test',...files],{encoding:'utf8'});
console.log(r.stdout.split('\\n').filter((s,i,a)=>/"'^not ok|''^# (tests|suites|pass|fail|cancelled|skipped|duration)/.test(s)||a.slice(Math.max(0,i-3),i).some(x=>/''^not ok/.test(x))).join('"'\\n'));
console.log(r.stderr);process.exitCode=r.status;
JS" in /workspace/tellsh
exec
/bin/bash -lc "sed -n '406,568p' src/history.js; sed -n '574,603p' src/history.js; sed -n '898,931p' src/history.js; cat src/rerank/tokenizer.js" in /workspace/tellsh
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
  let scoped = false;
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
    if (w.length) segmentEnts(w, e, setIntent, split, k, segIdx, firstWord);
    // `git -C /repo blame notes.txt`, `docker --context prod logs web`: "delete it" / "stop it" here would hit a
    // different file / container than the one the command used (never resolved, never repeated)
    if (w.length && scopedElsewhere(w, raw)) {
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
    if (segIntentAt < cdAt) staleRelative({}, slots);
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
};
const SCOPE_ENV = /^(?:GIT_DIR|GIT_WORK_TREE|GIT_NAMESPACE|DOCKER_HOST|DOCKER_CONTEXT|DOCKER_CONFIG|CONTAINER_HOST|CONTAINER_CONNECTION)=/;
/** `git -C /repo …`, `docker --context prod …`, `DOCKER_HOST=… docker …` (w: the unwrapped words, raw: before unwrap). */
function scopedElsewhere(w, raw) {
  if (isAmbiguous(w[0])) return false;
  const head = String(w[0]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
  const re = SCOPE_OPTS[head];
  if (!re) return false;
  if (raw.slice(0, raw.length - w.length).some((x) => SCOPE_ENV.test(String(x)))) return true;
  const args = w.slice(1);
  return args.slice(0, args.length - afterGlobals(head, args).length).some((a) => re.test(String(a)));
}
// wrapper options that run the command in another working directory (`env -C /repo`, `sudo -D /repo`, also with the
// value attached or in a cluster) or under another root (`chroot /srv`, `unshare --root=/srv`, `nsenter -r`)
// login shells start in the target user's home (`sudo -i`, `sudo -iu bob`, `sudo --login`, `runuser -l`, `su -`);
// `run0 --user=bob` runs in bob's home (also `-i`, the target's login shell, in newer systemd)
const WRAPPER_CWD = {
  env: /^-[a-zA-Z0-9]*C|^--chdir(?:=|$)/,
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

 exited 1 in 5159ms:
codex
The latest PR-selector regression cases appear covered. I’m now checking whether history commands that target another repository or host retain that scope, and whether replay requests preserve all explicit targets.
exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
const cases=[
['merge that pr','GH_REPO=other/repo gh pr view 45'],
['merge that pr','gh -R other/repo pr view 45'],
['merge that pr','gh pr view 45 -Rother/repo'],
['merge that pr','env GH_REPO=other/repo gh pr view 45'],
['same for /tmp/a and /tmp/b','rm -r /tmp/old'],
['same for "'$(cat /tmp/path)'"','rm -r /tmp/old'],
['same for "'`cat /tmp/path`'"','rm -r /tmp/old'],
['stop it','systemctl --host prod status nginx'],
['stop it','docker stop web db'],
['merge pr 45 in repo other/repo',null],
['merge pr #45 except #45',null],
];
for(const [q,h] of cases){const r=suggest(q,{env,history:h?[h]:undefined});console.log(JSON.stringify({q,h,intent:r.intent,command:r.command,missing:r.missing,context:r.context,method:r.method}));}
JS" in /workspace/tellsh
 succeeded in 141ms:
{"q":"merge that pr","h":"GH_REPO=other/repo gh pr view 45","intent":"gh_pr_merge","command":"gh pr merge 45","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"},"method":"history-rule"}
{"q":"merge that pr","h":"gh -R other/repo pr view 45","intent":"gh_pr_merge","command":"gh pr merge <PR>","missing":["pr"],"context":{"used":true,"commands":1,"rule":"refused","note":"the previous command names no pr; not guessing"},"method":"history-rule"}
{"q":"merge that pr","h":"gh pr view 45 -Rother/repo","intent":"gh_pr_merge","command":"gh pr merge <PR>","missing":["pr"],"context":{"used":true,"commands":1,"rule":"refused","note":"the latest pr in history (45) cannot be read unambiguously; not guessing"},"method":"history-rule"}
{"q":"merge that pr","h":"env GH_REPO=other/repo gh pr view 45","intent":"gh_pr_merge","command":"gh pr merge 45","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"},"method":"history-rule"}
{"q":"same for /tmp/a and /tmp/b","h":"rm -r /tmp/old","intent":"delete_dir","command":"rm -r /tmp/a","missing":[],"context":{"used":true,"commands":1,"rule":"same-for","note":"same as previous delete_dir with path=/tmp/a"},"method":"history-rule"}
{"q":"same for $(cat /tmp/path)","h":"rm -r /tmp/old","intent":"delete_dir","command":"rm -r <PATH>","missing":["path"],"context":{"used":true,"commands":1,"rule":"same-for","note":"same as previous delete_dir with path=/tmp/path"},"method":"history-rule"}
{"q":"same for `cat /tmp/path`","h":"rm -r /tmp/old","command":null,"missing":[],"context":{"used":true,"commands":1,"rule":"refused","note":"the previous command (delete_dir) has nothing that \"`cat /tmp/path`\" could replace; not guessing"},"method":"history-rule"}
{"q":"stop it","h":"systemctl --host prod status nginx","intent":"service_stop","command":"sudo systemctl stop status","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"service\" from history = status"},"method":"history-rule"}
{"q":"stop it","h":"docker stop web db","intent":"docker_stop","command":"docker stop web","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"container\" from history = web"},"method":"history-rule"}
{"q":"merge pr 45 in repo other/repo","h":null,"intent":"gh_pr_merge","command":"gh pr merge 45","missing":[],"context":{"used":false},"method":"catalog"}
{"q":"merge pr #45 except #45","h":null,"intent":"gh_pr_merge","command":"gh pr merge 45","missing":[],"context":{"used":false},"method":"catalog"}

exec
/bin/bash -lc "git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/history.js | rg -n 'retarget|GH_PR|scopedElsewhere|systemctl|same-for|same for'" in /workspace/tellsh
 succeeded in 0ms:
213:+ * -> { line, intent, slots, ents, at, searchDir?, ambiguous, cd?, scoped?, fromTellsh?, opaque? }  (scoped: see scopedElsewhere)
307:+    if (w.length && scopedElsewhere(w, raw)) {
417:+function scopedElsewhere(w, raw) {
517:+/** The values of a scoped command (scopedElsewhere) as ambiguous: they name things in another repository / daemon. */
544:+  if (head === 'systemctl') return !nonFlags.length || /^list-/.test(nonFlags[0]) || w.includes('--failed') ? ['service'] : [];
597:-    } else if (head === 'systemctl' || head === 'service') {
598:-      const svc = head === 'systemctl' ? nonFlags[1] : nonFlags[0];
599:-      const verb = head === 'systemctl' ? nonFlags[0] : nonFlags[1];
624:+  } else if (head === 'systemctl' || head === 'service') {
625:+    const svc = head === 'systemctl' ? nonFlags[1] : nonFlags[0];
626:+    const verb = head === 'systemctl' ? nonFlags[0] : nonFlags[1];
664:+  } else if (head === 'gh' && nonFlags[0] === 'pr' && GH_PR_SELECTS.has(nonFlags[1])) {
667:+    const { pos, opts } = parseArgs(args.slice(args.indexOf(nonFlags[1]) + 1), GH_PR_VALUE_OPTS);
802:+const GH_PR_SELECTS = new Set(['view', 'checkout', 'co', 'merge', 'close', 'reopen', 'diff', 'checks', 'review', 'ready', 'edit', 'comment']);
803:+const GH_PR_VALUE_OPTS = new Set(['-R', '--repo', '--json', '-q', '--jq', '-t', '--template', '--title', '-b', '--body', '-F',
811:+ * reference target ("delete it", "same for /var", "there" always mean the previous command, never an older one);
958: /** "same for X": returns the new argument text or null. */
960:@@ -545,6 +1071,8 @@ function retarget(intent, arg) {
972:     const rt = retarget(ctx.last.intent, arg);
973:+    // "what about this": no new argument at all, nothing to retarget
981:+    // "same for api" after `docker --context prod logs web`: here it would run against another daemon / repository
985:+    // "same for /srv/x" after `git status`: the previous command has no slot for it; not a new request either
996:-      return { rule: 'same-for', intent: ctx.last.intent, slots, note: `same as previous ${ctx.last.intent} with ${rt.slot}=${rt.value}` };
997:+      return { rule: 'same-for', intent: ctx.last.intent, slots, changed: rt.slot, note: `same as previous ${ctx.last.intent} with ${rt.slot}=${rt.value}` };
1002:+  // "same for X", "same but …" when the previous command is not one tellsh can repeat (`ls newdir`, `clear`)

exec
/bin/bash -lc 'node --test test/regressions18.test.js' in /workspace/tellsh
 succeeded in 460ms:
TAP version 13
# Subtest: /workspace/tellsh/test/regressions18.test.js
ok 1 - /workspace/tellsh/test/regressions18.test.js
  ---
  duration_ms: 421.672855
  ...
1..1
# tests 1
# suites 0
# pass 1
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 429.53113

exec
/bin/bash -lc 'cat test/hybrid.test.js; git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/catalog.js src/variants.js src/danger.js' in /workspace/tellsh
 succeeded in 0ms:
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
diff --git a/src/catalog.js b/src/catalog.js
index f98833f..f7ea390 100644
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
+  T('gh_pr_view', 'Show a pull request', 'gh pr view«{pr!raw}»', {}),
+  T('gh_pr_create', 'Create a pull request from the current branch', 'gh pr create --fill', {}, 'medium'),
+  T('gh_pr_checks', 'Show CI check status of a pull request', 'gh pr checks«{pr!raw}»', {}),
+  T('gh_pr_merge', 'Merge a pull request', 'gh pr merge«{pr!raw}»', {}, 'medium'),
+  T('gh_run_list', 'List recent GitHub Actions workflow runs', 'gh run list', {}),
+  T('gh_run_view', 'Show a GitHub Actions run (and its failed logs)', 'gh run view«{num!raw}»', {}),
 ];
 
 export const BY_ID = Object.fromEntries(INTENTS.map((i) => [i.id, i]));
diff --git a/src/danger.js b/src/danger.js
index 76ea854..bde8a79 100644
--- a/src/danger.js
+++ b/src/danger.js
@@ -13,9 +13,12 @@ export const maxRisk = (a, b) => (RANK[b] > RANK[a] ? b : a);
 // light tokenizer: simple commands separated by ; & | && || ( ) and newlines, words unquoted
 // (POSIX '…' "…" \x and PowerShell `x). Good enough for danger checks, not a full shell parser.
 
-const QUOTE_CHARS = /['"\u2018\u2019\u201A\u201B\u201C\u201D\u201E]/g;
+// PowerShell also treats the typographic quotes as quote characters (about_Quoting_Rules)
+const PS_SQ = /['\u2018\u2019\u201A\u201B]/;
+const PS_DQ = /["\u201C\u201D\u201E]/;
 
-// winPaths: backslash is never an escape (cmd.exe / PowerShell paths such as "C:\")
+// winPaths: backslash is never an escape (cmd.exe / PowerShell paths such as "C:\"), and the
+// PowerShell typographic quotes ‘…’ “…” quote like ' and "
 export function simpleCommands(cmd, { winPaths = false } = {}) {
   const out = [];
   let words = [];
@@ -23,17 +26,20 @@ export function simpleCommands(cmd, { winPaths = false } = {}) {
   const flushWord = () => { if (w != null) { words.push(w); w = null; } };
   const flushCmd = () => { flushWord(); if (words.length) out.push(words); words = []; };
   const s = String(cmd);
+  const isSq = (c) => (winPaths ? PS_SQ.test(c) : c === "'");
+  const isDq = (c) => (winPaths ? PS_DQ.test(c) : c === '"');
   for (let i = 0; i < s.length; i++) {
     const c = s[i];
-    if (c === "'") {
-      const j = s.indexOf("'", i + 1);
-      const end = j < 0 ? s.length : j;
+    if (isSq(c)) {
+      let j = i + 1;
+      while (j < s.length && !isSq(s[j])) j++;
+      const end = j;
       w = (w ?? '') + s.slice(i + 1, end);
       i = end;
-    } else if (c === '"') {
+    } else if (isDq(c)) {
       let v = '';
       let j = i + 1;
-      for (; j < s.length && s[j] !== '"'; j++) {
+      for (; j < s.length && !isDq(s[j]); j++) {
         if (((!winPaths && s[j] === '\\' && /[$`"\\\n]/.test(s[j + 1])) || s[j] === '`') && j + 1 < s.length) v += s[++j]; else v += s[j];
       }
       w = (w ?? '') + v;
@@ -54,23 +60,185 @@ export function simpleCommands(cmd, { winPaths = false } = {}) {
   return out;
 }
 
-// strip wrappers that run their argument as the command
-function commandWords(words) {
+// strip wrappers that run their argument as the command (sudo, timeout N, chroot DIR, env A=b, ...)
+// options of each wrapper that take a separate value
+const WRAPPER_OPTARG = {
+  sudo: /^-[ugpCDhrtTUR]$|^--(?:user|group|prompt|close-from|chdir|chroot|host|role|type|other-user|command-timeout)$/,
+  doas: /^-[uC]$/,
+  nice: /^-n$|^--adjustment$/,
+  ionice: /^-[cnpPu]$|^--(?:class|classdata|pid|pgid|uid)$/,
+  xargs: /^-[IdEnLPsa]$|^--(?:arg-file|delimiter|max-args|max-procs|max-chars|replace|eof)$/,
+  timeout: /^-[sk]$|^--(?:signal|kill-after)$/,
+  chroot: /^--(?:userspec|groups)$/,
+  stdbuf: /^-[ioe]$|^--(?:input|output|error)$/,
+  env: /^-[uCS]$|^--(?:unset|chdir|split-string)$/,
+  time: /^-[fo]$|^--(?:format|output)$/,
+  exec: /^-a$/,
+  unshare: /^-[SGRwl]$|^--(?:setuid|setgid|root|wd|map-user|map-group|propagation|setgroups)$/,
+  watch: /^-[nq]$|^--(?:interval|equexit)$/,
+  nsenter: /^-[tSGrw]$|^--(?:target|setuid|setgid|root|wd)$/,
+  setpriv: /^--(?:reuid|regid|groups|inh-caps|ambient-caps|bounding-set|securebits|pdeathsig|selinux-label|apparmor-profile)$/,
+  strace: /^-[eoopsuPIEXbS]$/,
+  ltrace: /^-[eoopsuPnS]$/,
+  flock: /^-[wEc]$|^--(?:timeout|wait|conflict-exit-code|command)$/,
+  taskset: /^-[c]$/,
+  'systemd-run': /^-[upEH]$|^--(?:unit|property|setenv|host|machine|description|slice|uid|gid|working-directory|on-calendar|on-active)$/,
+  runuser: /^-[ugl]$|^--(?:user|group|login)$/,
+  pkexec: /^--user$/,
+  run0: /^-[ugD]$|^--(?:user|group|chdir|unit|property|description|slice|nice|setenv|background|machine|shell-prompt-prefix|area)$/,
+  chrt: /^-[TPD]$|^--(?:sched-runtime|sched-period|sched-deadline)$/,
+  cgexec: /^-g$/,
+  torsocks: /^-[uapP]$|^--(?:user|pass|address|port)$/,
+};
+// Command strings given as an option value are checked as commands of their own. Any program:
+// `-c STR`, `--command STR`, `--command=STR` (`flock -c "rm -rf /" LOCK`, `script -c "…"`, `find … -exec sh -c "…"`);
+// shells, su and runuser also take -c inside a cluster (`bash -lc "…"`, `su -lc "…"`); env -S splits its string.
+const CMD_STRING_ANY = /^(?:-c|--command|--session-command)$/;
+const CMD_STRING_CLUSTER = /^-[a-zA-Z]*c$/;
+const SHELLS = /^(?:ba|z|da|k|fi|c|tc|a|mk|r)?sh$|^busybox$/;
+const PRIVILEGED = new Set(['sudo', 'doas', 'su', 'runuser', 'pkexec', 'run0', 'sudoedit']);
+// programs whose whole job is to run a command (string): a payload that depends on the shell state cannot be checked
+const RUNNERS = new Set(['su', 'runuser', 'flock', 'script', 'eval', 'env', 'watch', 'tmux', 'screen', 'ssh', 'xargs', 'parallel', 'sudo', 'doas',
+  'pkexec', 'run0', 'nohup', 'setsid', 'timeout', 'iex', 'invoke-expression', 'cmd', 'pwsh', 'powershell', 'start-process', 'sem']);
+const WRAPPERS = new Set(['sudo', 'doas', 'run0', 'command', 'builtin', 'exec', 'nohup', 'time', 'nice', 'ionice', 'then', 'do', 'else', '&', 'busybox', 'toybox', 'xargs', 'timeout', 'chroot', 'stdbuf', 'env', 'setsid', 'unbuffer', 'caffeinate',
+  'unshare', 'watch', 'nsenter', 'setpriv', 'strace', 'ltrace', 'flock', 'taskset', 'systemd-run', 'runuser', 'firejail', 'proot', 'fakeroot',
+  'pkexec', 'chrt', 'cgexec', 'eatmydata', 'torsocks', 'catchsegv', 'proxychains', 'proxychains4', 'tsocks', 'valgrind', 'faketime', 'ts',
+  'chronic', 'nocache', 'trickle', 'numactl', 'schedtool', 'cpulimit', 'prlimit', 'sg', 'newgrp', 'su', 'parallel', 'sem', 'tmux', 'screen',
+  'script', 'xvfb-run', 'dbus-launch', 'dbus-run-session', 'expect', 'gdb', 'ssh-agent', 'sshpass', 'with-lock-ex', 'lckdo', 'daemonize', 'start-stop-daemon']);
+// programs that run the command at the end of their arguments without being a plain wrapper
+const SUFFIX_RUNNERS = new Set(['ssh', 'mosh', 'kubectl', 'docker', 'podman', 'lxc', 'incus', 'machinectl', 'distrobox', 'toolbox', 'flatpak', 'nix-shell', 'firejail', 'bwrap']);
+
+// programs whose arguments are data, never a command they run (`grep -r rm src`, `man rm`, `echo rm -rf /`)
+const DATA_ARGS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'sed', 'awk', 'gawk', 'mawk', 'echo', 'printf', 'man', 'which', 'whereis',
+  'type', 'whatis', 'apropos', 'help', 'info', 'tldr', 'git', 'cat', 'less', 'more', 'head', 'tail', 'ls', 'find', 'locate', 'tellsh', 'alias',
+  'history', 'fc', 'complete', 'compgen', 'hash', 'test', '[', '[[', 'true', 'false', 'printenv', 'set', 'unset', 'export', 'declare', 'local',
+  'readonly', 'trap', 'write-host', 'write-output', 'get-help', 'get-command', 'select-string', 'sls', 'findstr', 'wc', 'sort', 'uniq', 'cut',
+  'tr', 'diff', 'cmp', 'file', 'stat', 'du', 'df', 'tree', 'jq', 'yq', 'xxd', 'od', 'hexdump', 'strings', 'mkdir', 'touch', 'cd', 'pushd']);
+// programs that destroy or change things: after an unknown program they may be the command it runs (`mywrap rm -rf /`)
+const DANGER_HEADS = /^(?:rm|rmdir|unlink|shred|wipe|wipefs|mkfs(?:\.\w+)?|mke2fs|dd|truncate|kill|pkill|killall|chmod|chown|chgrp|mv|cp|rsync|find|tar|tee|sh|bash|zsh|dash|ksh|fish|eval|shutdown|reboot|halt|poweroff|crontab|iptables|remove-item|ri|del|erase|rd|format|diskpart|stop-process|format-volume|clear-disk)$/i;
+
+/** Collect `-c STR` style payloads of one simple command into `inner` (`unsure` when a runner's payload cannot be read). */
+function payloads(w, inner, flags) {
+  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
+  if (PRIVILEGED.has(h)) flags.privileged = true;
+  // a payload of a program that runs commands (or of `sh -c` inside other arguments: `find … -exec sh -c "…"`)
+  // must be readable; `-c` of any other program (`grep -c "$PAT"`) is still checked, without that requirement
+  const add = (v, i) => {
+    if (v == null) return;
+    const prev = String(w[i - 1] ?? '').replace(/^.*[\\/]/, '').toLowerCase();
+    const runner = RUNNERS.has(h) || SHELLS.test(h) || SHELLS.test(prev) || /^--(?:command|session-command|split-string)/.test(String(w[i] ?? ''));
+    if (!runner) { (flags.lenient ??= []).push(String(v)); return; }
+    inner.push(String(v));
+    if (/[$`]|^\s*$/.test(String(v))) flags.unsure = `${SHELLS.test(prev) ? prev : h} runs a command string that depends on the shell state (${String(v).slice(0, 40)}); it cannot be checked`;
+  };
+  for (let i = 1; i < w.length; i++) {
+    const x = String(w[i]);
+    if (x === '--' && !SHELLS.test(h)) continue;
+    const eq = x.match(/^(--(?:command|session-command|split-string))=(.*)$/s);
+    if (eq) { add(eq[2], i); continue; }
+    if (h === 'pwsh' || h === 'powershell') {
+      if (/^-(?:e|ec|en|enc\w*|encodedcommand)$/i.test(x)) { flags.unsure = `${h} -EncodedCommand cannot be checked`; i++; continue; }
+      if (/^-(?:c|co\w*|command)$/i.test(x)) { add(w.slice(i + 1).join(' '), i); break; }
+      continue;
+    }
+    if (h === 'cmd' && /^\/[ck]$/i.test(x)) { add(w.slice(i + 1).join(' '), i); break; }
+    if (h === 'env' && (x === '-S' || x === '--split-string')) { add(w[i + 1], i); i++; continue; }
+    if (CMD_STRING_ANY.test(x) || ((SHELLS.test(h) || h === 'su' || h === 'runuser') && CMD_STRING_CLUSTER.test(x))) {
+      // sh -c 'cmd' arg0 args: only the string is the command
+      add(w[i + 1], i);
+      // its $0, $1, "$@" are the words after it (`sh -c 'rm -rf "$1"' _ /`): also checked with them filled in
+      if (SHELLS.test(h) && w[i + 1] != null && w.length > i + 2) inner.push(withPositional(String(w[i + 1]), w.slice(i + 2).map(String)));
+      i++;
+    }
+  }
+  if (h === 'eval' || h === 'iex' || h === 'invoke-expression') add(w.slice(1).join(' '), 0);
+}
+
+const sq = (x) => `'${x.replace(/'/g, "'\\''")}'`;
+/** `sh -c STR arg0 args…`: STR with $0…$9, ${N}, "$@", $@ and $* replaced by the (quoted) arguments. */
+function withPositional(str, args) {
+  const all = args.slice(1).map(sq).join(' ');
+  return str.replace(/"\$@"|"\$\*"|\$@|\$\*/g, all).replace(/"\$\{?(\d)\}?"|\$\{?(\d)\}?/g, (m, a, b) => sq(args[+(a ?? b)] ?? ''));
+}
+
+/** The command a wrapper chain runs. `inner` collects command strings given as option values (`su -c "…"`). */
+export function commandWords(words, inner = [], flags = {}) {
   let w = words;
   for (;;) {
     while (w.length && /^\w+=/.test(w[0])) w = w.slice(1);
     const h = (w[0] || '').replace(/^.*[\\/]/, '').toLowerCase();
-    if (['sudo', 'doas', 'command', 'builtin', 'exec', 'nohup', 'time', 'nice', 'ionice', 'then', 'do', 'else', '&'].includes(h)) {
+    payloads(w, inner, flags);
+    if (!WRAPPERS.has(h)) return w;
+    w = w.slice(1);
+    const optArg = WRAPPER_OPTARG[h];
+    while (w.length && /^-/.test(w[0])) {
+      const o = w[0];
       w = w.slice(1);
-      while (w.length && /^-/.test(w[0])) w = w.slice(1 + (/^-[ugnc]$/.test(w[0]) ? 1 : 0));
-      continue;
+      if (o === '--') break;
+      if (optArg && optArg.test(o)) w = w.slice(1);
     }
-    if (h === 'xargs') { w = w.slice(1); while (w.length && /^-/.test(w[0])) w = w.slice(1 + (/^-[IdEnLPs]$/.test(w[0]) ? 1 : 0)); continue; }
-    if (h === 'env') { w = w.slice(1); while (w.length && (/^-/.test(w[0]) || /^\w+=/.test(w[0]))) w = w.slice(1); continue; }
-    return w;
+    if (h === 'env') while (w.length && /^\w+=/.test(w[0])) w = w.slice(1);
+    if (h === 'timeout' && w.length) w = w.slice(1); // DURATION
+    if (h === 'chroot' && w.length) w = w.slice(1); // NEWROOT
+    if (h === 'flock' && w.length) w = w.slice(1); // LOCKFILE
+    if (h === 'taskset' && w.length && /^(?:0x)?[\da-f,-]+$/i.test(w[0])) w = w.slice(1); // MASK (without -c: always one)
+    if (h === 'chrt' && w.length && /^\d+$/.test(w[0])) w = w.slice(1); // PRIORITY
   }
 }
 
+/**
+ * Every command a simple command may run: the wrapper chain as parsed by commandWords, and, because wrapper
+ * options are not always understood (`sudo -iu root rm …`, `nice --adjustment=5 rm …`), the command starting
+ * at every later non-option word of a wrapper / remote runner (`ssh host rm -rf /`, `docker exec ct rm …`).
+ * The checks only ever escalate, so reading too many candidates is safe; missing one is not.
+ */
+export function commandChains(words, inner, flags) {
+  const out = [];
+  const push = (w) => { if (w.length && !out.some((o) => o.length === w.length && o.every((x, i) => x === w[i]))) out.push(w); };
+  push(commandWords(words, inner, flags));
+  const lead = words.findIndex((x) => !/^\w+=/.test(x));
+  const h = lead >= 0 ? String(words[lead]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase() : '';
+  const remote = SUFFIX_RUNNERS.has(h) && (!['docker', 'podman', 'kubectl', 'lxc', 'incus'].includes(h) || words.some((x) => ['exec', 'run', 'debug', 'create'].includes(x)));
+  // an unknown program followed by a destructive command (`mywrap rm -rf /`, `catchsegv2 dd …`): it may run it
+  if (h && !WRAPPERS.has(h) && !remote && !DATA_ARGS.has(h)) {
+    for (let j = lead + 1; j < words.length - 1; j++) if (DANGER_HEADS.test(String(words[j]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, ''))) push(commandWords(words.slice(j), inner, flags));
+  }
+  if (WRAPPERS.has(h) || remote) {
+    for (let j = lead + 1; j < words.length; j++) {
+      if (/^-|^\w+=/.test(words[j])) continue;
+      const w = commandWords(words.slice(j), inner, flags);
+      push(w);
+      // a lone quoted string with spaces is a command (`tmux new "rm -rf /"`, `ssh host "rm -rf /"`)
+      if (w.length === 1 && /\s/.test(w[0])) inner.push(w[0]);
+    }
+  }
+  return out;
+}
+
+// Lexically normalise a path for the danger checks: `//`, `/./`, a trailing `/.` and `/..` collapse
+// (`rm -rf /.`, `rm -rf //`, `rm -r /etc/../`), so they are compared as the directory they name.
+// Only absolute, ~ and $HOME paths; a `..` above the home prefix is kept as is.
+export function normTarget(t) {
+  const s = String(t).trim();
+  const m = s.match(/^(\/|~(?=\/|$)|\$\{?HOME\}?(?=\/|$))(.*)$/s);
+  if (!m) return s;
+  const root = m[1] === '/';
+  const parts = [];
+  for (const p of m[2].split('/')) {
+    if (p === '' || p === '.') continue;
+    if (p === '..' && parts.length && parts[parts.length - 1] !== '..') { parts.pop(); continue; }
+    if (p === '..' && root) continue;
+    parts.push(p);
+  }
+  const prefix = root ? '' : m[1];
+  return parts.length ? prefix + '/' + parts.join('/') : (root ? '/' : prefix);
+}
+
+// system directories (and their direct children), user homes and key dot-directories: a recursive
+// delete or a move of any of these is critical
+const SYS_CRIT = /^(?:\/\*?|(?:~|\$\{?HOME\}?)(?:\/\*|\/\.(?:ssh|gnupg|config|local)(?:\/\*)?)?|\/(?:bin|boot|dev|etc|home|lib\w*|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private)(?:\/\*)?|\/(?:bin|boot|etc|home|lib\w*|sbin|usr|System|Users|Library|private)\/[^/*]+(?:\/\*)?|\/var\/(?:lib|db|spool|log|mail|backups)(?:\/\*)?|\/usr\/local\/[^/*]+(?:\/\*)?)$/;
+const sysCrit = (t) => SYS_CRIT.test(normTarget(t));
+
 const POSIX_CRIT_TARGET = /^(?:\/+|\/+\*|~\/*|~\/+\*|\$\{?HOME\}?\/*|\$\{?HOME\}?\/+\*|\*|\.\/*|\.\/+\*|\.\.\/*|\.\.\/+\*|\.\*|\/+(?:bin|boot|dev|etc|home|lib|lib32|lib64|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private)\/*\*?)$/;
 
 function rmCheck(words, hit) {
@@ -97,7 +265,56 @@ function rmCheck(words, hit) {
   hit('high', 'rm deletes files permanently (no trash)');
   if (noPreserve) hit('high', 'rm --no-preserve-root', true);
   if (recursive && force) hit('high', 'rm -rf deletes without asking');
-  if (recursive && targets.some((t) => POSIX_CRIT_TARGET.test(t.trim()) || PS_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive rm on /, ~, * or . — would wipe everything', true);
+  if (recursive && targets.some((t) => POSIX_CRIT_TARGET.test(t.trim()) || PS_CRIT_TARGET.test(t.trim()) || sysCrit(t))) hit('high', 'recursive rm on /, ~, * or . — would wipe everything', true);
+  if (targets.some((t) => /(?:^|[\\/])\.\.(?:[\\/]|$)/.test(t))) hit('high', 'path contains .. (refers to a parent directory)');
+}
+
+// a file under /etc, /boot, /usr, /bin, /sbin, /lib*: deleting, overwriting or editing it in place can make the system
+// unbootable or lock everyone out (`rm /etc/passwd`, `sed -i d /etc/passwd`, `tee /etc/passwd < /dev/null`), the same as
+// `> /etc/passwd` or `truncate -s0 /etc/passwd`
+const SYS_FILE = /^\/+(?:etc|boot|usr|bin|sbin|lib\w*)\/+[^/]/;
+const sysFile = (t) => SYS_FILE.test(normTarget(t));
+// rm/unlink/shred of a system file; sed -i / perl -i on one; tee (not -a), dd of=, cp/install/mv/ln -f onto one; chmod 000 on one
+function sysFileWriteCheck(w, head, hit) {
+  const a = w.slice(1);
+  if (head === 'dd') {
+    if (a.some((x) => /^of=/.test(x) && sysFile(x.slice(3)))) hit('high', 'overwrites a system file', true);
+  } else if (head === 'cp' || head === 'mv' || head === 'install' || (head === 'ln' && a.some((x) => /^-[a-zA-Z]*f/.test(x) || x === '--force'))) {
+    // the destination: -t DIR / --target-directory=DIR (a file inside it), else the last operand unless it names a
+    // directory by its form (`cp x.service /etc/systemd/system/`: adds a file)
+    const ti = a.findIndex((x) => x === '-t' || x === '--target-directory');
+    const td = ti >= 0 ? a[ti + 1] : a.find((x) => /^--target-directory=/.test(x))?.slice(19);
+    if (td != null) return;
+    const pos = positional(a);
+    const dst = pos.length >= 2 ? pos[pos.length - 1] : null;
+    if (dst != null && !/[\\/]$/.test(dst) && sysFile(dst)) hit('high', 'overwrites a system file or directory', true);
+  } else if (/^(?:perl|ruby)[\d.]*$/.test(head)) {
+    if (a.some((x) => /^-[a-zA-Z]*i/.test(x)) && positional(a).some(sysFile)) hit('high', 'edits a system file in place', true);
+  } else if (head === 'chmod') {
+    // no permissions at all (`chmod 000 /etc/passwd`, `chmod a= …`): nobody can read it, logins stop working
+    const pos = positional(a);
+    if (/^0*$|^[ugoa]*=$|^a?-rwx$/.test(pos[0] ?? 'x') && pos.slice(1).some(sysFile)) hit('high', 'removes every permission from a system file', true);
+  } else if (head === 'rm' || head === 'unlink') {
+    if (positional(a).some(sysFile)) hit('high', 'deletes a system file', true);
+  } else if (head === 'sed') {
+    if (!a.some((x) => /^-[a-zA-Z]*i/.test(x) || /^--in-place/.test(x))) return;
+    // the script is the first positional unless given with -e/-f; every later positional is a file
+    const pos = [];
+    let script = !a.some((x) => /^-[a-zA-Z]*[ef]$|^--(?:expression|file)(?:=|$)/.test(x));
+    let opts = true;
+    for (let i = 0; i < a.length; i++) {
+      const x = a[i];
+      if (opts && x === '--') { opts = false; continue; }
+      if (opts && /^-[a-zA-Z]*[ef]$|^--(?:expression|file)$/.test(x)) { i++; continue; }
+      if (opts && /^-./.test(x)) continue;
+      if (script) { script = false; continue; }
+      pos.push(x);
+    }
+    if (pos.some(sysFile)) hit('high', 'edits a system file in place', true);
+  } else if (head === 'tee') {
+    const t = positional(a).filter(sysFile);
+    if (t.length) hit('high', a.some((x) => /^-[a-zA-Z]*a/.test(x) || x === '--append') ? 'appends to a system file' : 'overwrites a system file', !a.some((x) => /^-[a-zA-Z]*a/.test(x) || x === '--append'));
+  }
 }
 
 // kill [-SIG | -s SIG | -n NUM | --signal SIG] [--] pid...   (pid 1 / -1 = init / every process)
@@ -141,6 +358,201 @@ function cmdDelCheck(words, hit) {
   if (recursive && a.filter((x) => !/^\/\w$/.test(x)).some((t) => CMD_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive delete of a drive root or home', true);
 }
 
+// /, ~, $HOME, system directories, drive roots (not the relative ., .., * that rm -r also treats as critical)
+const critTarget = (t) => { const s = String(t).trim(); return ((POSIX_CRIT_TARGET.test(s) || PS_CRIT_TARGET.test(s)) && !/^(?:\.{1,2}\/*\*?|\*|\.\*|\.\/+\*)$/.test(s)) || sysCrit(s); };
+const SYS_PATH = /^\/+(?:etc|boot|bin|sbin|usr|lib\w*|dev|proc|sys)(?:\/|$)/;
+const NULL_SRC = /^\/dev\/(?:null|zero|u?random)$/;
+const positional = (args) => { const out = []; let opts = true; for (const a of args) { if (opts && a === '--') { opts = false; continue; } if (opts && /^-./.test(a)) continue; out.push(a); } return out; };
+
+// find's own leading options (-H -L -P -O3 -D debugopts) come before the starting points
+const findArgs = (w) => { let a = w.slice(1); for (;;) { if (/^-[HLP]$|^-O\d*$/.test(a[0] || '')) a = a.slice(1); else if (a[0] === '-D') a = a.slice(2); else return a; } };
+
+// find ROOT... -delete / -exec rm: bulk deletion; critical on /, ~, C:\ ...
+function findCheck(w, hit) {
+  const a = findArgs(w);
+  const roots = [];
+  for (const x of a) { if (/^[-(!]/.test(x)) break; roots.push(x); }
+  const del = a.includes('-delete') || a.some((x, i) => /^-(?:exec|execdir|ok|okdir)$/.test(x) && /^(?:\S*\/)?(?:rm|shred|unlink)$/.test(a[i + 1] || ''));
+  if (del && roots.some(critTarget)) hit('high', 'bulk deletion under /, ~ or a drive root', true);
+}
+
+// rsync --delete … DEST: makes DEST identical to the source, deleting everything else in it
+function rsyncCheck(w, hit) {
+  const a = w.slice(1);
+  if (!a.some((x) => /^--(?:delete|del$|remove-source-files)/.test(x))) return;
+  hit('high', 'rsync --delete removes files in the destination');
+  const pos = positional(a);
+  if (pos.length && critTarget(pos[pos.length - 1])) hit('high', 'rsync --delete onto /, ~ or a drive root', true);
+}
+
+// cp/mv/install/ln onto system files; /dev/null (or zero/random) copied over a file destroys it
+function copyCheck(w, hit) {
+  const pos = positional(w.slice(1));
+  if (pos.length < 2) return;
+  const dst = pos[pos.length - 1];
+  const srcs = pos.slice(0, -1);
+  if (SYS_PATH.test(normTarget(dst)) || normTarget(dst) === '/') hit('high', 'overwrites a system file or directory');
+  // moving /etc, /usr, ~ ... away is as destructive as deleting them
+  if (w[0].replace(/^.*[\\/]/, '') === 'mv') {
+    if (srcs.some(critTarget)) hit('high', 'moves a system or home directory away', true);
+    else if (srcs.some((x) => SYS_PATH.test(normTarget(x)))) hit('high', 'moves a system file');
+  }
+  if (srcs.some((s) => NULL_SRC.test(s)) && !/^\/dev\//.test(dst)) hit('high', `overwrites ${dst} with ${srcs.find((s) => NULL_SRC.test(s))}`, SYS_PATH.test(dst));
+}
+
+const LISTERS = /^(?:get-childitem|gci|dir|ls|get-item|gi)$/i;
+// `Get-ChildItem C:\ -Recurse … | Remove-Item`, `find / … | xargs rm`: listing a root, deleting the results
+function pipelineDeleteCheck(text, hit) {
+  for (const stmt of String(text).split(/[;\n]|&&|\|\|/)) {
+    const segs = stmt.split('|').map((p) => commandWords(simpleCommands(p, { winPaths: true })[0] || []));
+    for (let i = 0; i < segs.length - 1; i++) {
+      const w = segs[i];
+      if (!w.length) continue;
+      const head = w[0].replace(/^.*[\\/]/, '').toLowerCase();
+      let rootList = false;
+      if (head === 'find') { const roots = []; for (const x of findArgs(w)) { if (/^[-(!]/.test(x)) break; roots.push(x); } rootList = roots.some(critTarget); }
+      else if (LISTERS.test(head)) {
+        const a = w.slice(1);
+        const rec = a.some((x) => /^-r(?:e(?:c(?:u(?:r(?:s(?:e)?)?)?)?)?)?$/i.test(x)) || head === 'ls' && a.some((x) => /^-[a-zA-Z]*R/.test(x));
+        const targets = [];
+        for (let k = 0; k < a.length; k++) {
+          if (/^-(?:path|literalpath|lp|pspath)$/i.test(a[k])) { if (a[k + 1] != null) targets.push(a[++k]); continue; }
+          if (/^-(?:filter|include|exclude|depth|attributes)$/i.test(a[k])) { k++; continue; }
+          if (!/^-/.test(a[k])) targets.push(a[k]);
+        }
+        rootList = rec && targets.some(critTarget);
+      }
+      if (!rootList) continue;
+      const del = segs.slice(i + 1).some((s) => {
+        const h = (s[0] || '').replace(/^.*[\\/]/, '').toLowerCase();
+        return PS_REMOVE.test(h) || (h === 'xargs' && s.some((x) => /^(?:\S*\/)?(?:rm|shred)$/.test(x)));
+      });
+      if (del) hit('high', 'bulk deletion under /, ~ or a drive root', true);
+    }
+  }
+}
+
+// chmod/chown/chgrp -R on /, ~, * ... (options may come in any order: chmod -R -v 777 ~); without -R on /, ~ or a
+// system directory (`chmod 000 /`, `chmod 000 /etc`, `chown nobody /`): the system stops working
+function permCheck(w, hit) {
+  const a = w.slice(1);
+  const targets = positional(a).slice(1);
+  if (!a.some((x) => /^-[a-zA-Z]*R[a-zA-Z]*$/.test(x) || x === '--recursive')) {
+    if (targets.some((t) => TOP_DIR.test(normTarget(t)) || /^[A-Za-z]:[\\/]*$/.test(String(t).trim()))) hit('high', 'permission/owner change on / or a system directory', true);
+    else if (targets.some((t) => SYS_PATH.test(normTarget(t)) || /^(?:~|\$\{?HOME\}?)$/.test(normTarget(t)))) hit('high', 'changes permissions/owner of a system file or the home directory');
+    return;
+  }
+  if (targets.some(critTarget)) hit('high', 'recursive permission/owner change on /, ~ or *', true);
+}
+
+// / and the top-level system directories themselves
+const TOP_DIR = /^(?:\/|\/(?:bin|boot|dev|etc|home|lib\w*|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private))$/;
+// whole disk devices (writing to them destroys the filesystem on them)
+const RAW_DISK = /^\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk|rdisk|md|dm-|mapper\/|loop)\w*/;
+// tee/cp/install/sponge/pv … onto a whole disk device (`cat x | sudo tee /dev/sda`)
+function rawDiskWriteCheck(w, hit) {
+  if (positional(w.slice(1)).some((x) => RAW_DISK.test(normTarget(x)))) hit('high', 'writes onto a raw disk device', true);
+}
+
+// Interpreters running inline code (`python3 -c`, `perl -e`, `ruby -e`, `node -e`, `php -r`, awk programs that call
+// system()): the code is not shell and cannot be checked, so it is high. Its string literals are checked as commands
+// (`system("rm -rf /")`) and file-deleting calls on /, ~ or a system directory (`shutil.rmtree('/')`) are critical.
+const INTERP_CODE = [
+  [/^(?:python[\d.]*|pypy[\d.]*)$/, /^-[a-zA-Z]*c$/],
+  [/^perl[\d.]*$/, /^-[a-zA-Z]*[eE]$/],
+  [/^(?:ruby|jruby)[\d.]*$/, /^-[a-zA-Z]*e$/],
+  [/^(?:node|nodejs|bun)$/, /^(?:-e|-p|-pe|--eval|--print)$/],
+  [/^php[\d.]*$/, /^-r$/],
+  [/^(?:lua[\d.]*|luajit|julia|rscript|osascript|tclsh)$/, /^-e$/],
+];
+const AWK = /^(?:awk|gawk|mawk|nawk|busybox-awk)$/;
+const DELETE_CALL = /\b(?:rmtree|rm_rf|rm_r|rmdir|removedirs|rmSync|rmdirSync|unlink(?:Sync)?|remove|rm|delete|chmod|chown|chmodSync|chownSync)\s*\(?\s*(?:path\s*=\s*)?[rb]?['"]([^'"]*)['"]/g;
+function inlineCode(w) {
+  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
+  if (AWK.test(h)) {
+    const a = w.slice(1);
+    for (let i = 0; i < a.length; i++) {
+      if (/^-[Fvf]$/.test(a[i])) { if (a[i] === '-f') return null; i++; continue; }
+      if (/^-/.test(a[i])) continue;
+      return /\bsystem\s*\(|\|\s*getline|\b(?:print|printf)\b[^;}]*(?:>|\|)/.test(a[i]) ? { h, code: a[i] } : null;
+    }
+    return null;
+  }
+  if (h === 'deno' && w[1] === 'eval') return { h, code: w.slice(2).join(' ') };
+  const it = INTERP_CODE.find(([re]) => re.test(h));
+  if (!it) return null;
+  const i = w.findIndex((x, j) => j > 0 && it[1].test(x));
+  return i > 0 && w[i + 1] != null ? { h, code: String(w[i + 1]) } : null;
+}
+function interpCheck(w, hit) {
+  const ic = inlineCode(w);
+  if (!ic) return;
+  hit('high', `${ic.h} runs inline code; it cannot be checked`);
+  codeCheck(ic, hit);
+}
+const INTERP_HEAD = /^(?:python[\d.]*|pypy[\d.]*|perl[\d.]*|(?:j?ruby)[\d.]*|node|nodejs|bun|deno|php[\d.]*|lua[\d.]*|luajit|julia|rscript|osascript|tclsh|awk|gawk|mawk|nawk)$/;
+/**
+ * Code fed to a shell or an interpreter on stdin by a here-string or heredoc (`bash <<< 'rm -rf /'`,
+ * `python3 - <<< "import os; os.system('rm -rf /')"`, `python3 <<EOF`): a shell's here-string is checked as a
+ * command; interpreter code is high (cannot be checked) and its literals / delete calls are checked as for `-c`.
+ */
+function stdinCodeCheck(w, hit, inner) {
+  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
+  const shell = SHELLS.test(h);
+  if (!shell && !INTERP_HEAD.test(h)) return;
+  const hs = w.indexOf('<<<');
+  if (hs >= 0) {
+    const code = String(w[hs + 1] ?? '');
+    if (shell) { inner.push(code); return; }
+    hit('high', `${h} runs code from a here-string; it cannot be checked`);
+    codeCheck({ h, code }, hit);
+    return;
+  }
+  if (w.some((x) => /^<<-?\S/.test(String(x)) || x === '<<' || x === '<<-')) hit('high', `${h} runs a heredoc script; it cannot be checked`);
+}
+function codeCheck(ic, hit) {
+  const lits = [];
+  for (const m of ic.code.matchAll(/'([^']*)'|"([^"]*)"|`([^`]*)`|\bqq?\s*([{(\[])([^})\]]*)[})\]]/g)) lits.push(m[1] ?? m[2] ?? m[3] ?? m[5]);
+  for (const c of lits) {
+    if (!c || !c.trim()) continue;
+    const d = checkDanger(c, 'safe', { lenient: true });
+    for (const m of d.warnings) hit(d.risk, m, d.critical);
+  }
+  for (const m of ic.code.matchAll(DELETE_CALL)) if (critTarget(m[1]) || SYS_PATH.test(normTarget(m[1]))) hit('high', `${ic.h} code deletes or changes /, ~ or a system directory`, true);
+}
+
+// tar -x … -C / (or --directory=/): extracting over the root or home directory
+function tarCheck(w, hit) {
+  const a = w.slice(1);
+  const extract = a.some((x) => /^-[a-zA-Z]*x/.test(x) || x === '--extract' || x === '--get') || /^[a-wyzA-Z]*x[a-zA-Z]*$/.test(a[0] || '');
+  if (!extract) return;
+  const dirs = [];
+  a.forEach((x, i) => {
+    if (x === '-C' || x === '--directory') dirs.push(a[i + 1] ?? '');
+    else if (/^-C./.test(x)) dirs.push(x.slice(2));
+    else if (/^--directory=/.test(x)) dirs.push(x.slice(12));
+  });
+  if (dirs.some(critTarget)) hit('high', 'extracts an archive over /, ~ or a drive root', true);
+}
+
+// docker run -v /:/host …: the container gets the host's whole filesystem (read-write unless :ro)
+function dockerCheck(w, hit) {
+  const a = w.slice(1);
+  if (!a.includes('run') && !a.includes('create')) return;
+  const vols = [];
+  a.forEach((x, i) => {
+    if (x === '-v' || x === '--volume' || x === '--mount') vols.push(a[i + 1] || '');
+    else if (/^(?:-v=?|--volume=|--mount=)/.test(x)) vols.push(x.replace(/^(?:-v=?|--volume=|--mount=)/, ''));
+    else if (/^-[a-zA-Z]*v$/.test(x)) vols.push(a[i + 1] || ''); // -itv /:/h
+  });
+  for (const v of vols) {
+    const host = v.split(':')[0];
+    const src = (v.match(/(?:^|,)(?:source|src)=([^,]*)/) || [])[1];
+    const root = (v.includes(':') && normTarget(host) === '/') || (src != null && normTarget(src) === '/');
+    if (root) hit('high', 'mounts the host root filesystem into a container', !/:ro(?:,|$)|(?:^|,)(?:readonly|ro)(?:=true|=1)?(?:,|$)/.test(v));
+  }
+}
+
 // [regex, risk, message, critical]
 const RULES = [
   [/\bmkfs(?:\.\w+)?\b|\bmke2fs\b|\bwipefs\b/, 'high', 'formats a filesystem', true],
@@ -152,6 +564,9 @@ const RULES = [
   [/\b(?:curl|wget|fetch)\b[^|;]*\|\s*(?:sudo\s+)?(?:\S*\/)?(?:ba|z|da|k|fi)?sh\b/, 'high', 'pipes a download straight into a shell'],
   [/(?:\b(?:ba|z|da|k|fi)?sh\b|\bsource\b|\beval\b|(?:^|[;&|(]\s*)\.)\s[^|;&]*(?:<\(|\$\(|`)\s*(?:sudo\s+)?(?:curl|wget|fetch)\b/, 'high', 'runs a downloaded script'],
   [/\bsudo\b|\bdoas\b/, 'medium', 'runs with root privileges'],
+  // text piped into a shell runs as a script whose content is not known here
+  [/\|\s*(?:(?:sudo|doas)\s+(?:-\S+\s+)*)?(?:\S*\/)?(?:ba|z|da|k|fi|c|tc|a|mk)?sh\b(?!\s+-[a-zA-Z]*c\b)(?![\w.-])/, 'high', 'runs piped text as a shell script'],
+  [/\|\s*(?:iex|Invoke-Expression)\b/i, 'high', 'runs piped text as a PowerShell script'],
   [/\bfind\b.*\s-delete\b|\bfind\b.*-exec(?:dir)?\s+(?:\S*\/)?rm\b|\bxargs\s+(?:-\S+\s+)*(?:\S*\/)?rm\b/, 'high', 'bulk deletion via find/xargs'],
   [/\bgit\s+push\b[^;&|]*\s(?:--force(?:-with-lease|-if-includes)?\b|-[a-zA-Z]*f\b|\+[^\s:]*(?::\S*)?|--mirror\b)/, 'high', 'force-push rewrites remote history'],
   [/\bgit\s+push\b[^;&|]*\s(?:--delete\b|-d\b|:\S)/, 'high', 'deletes a remote branch'],
@@ -161,11 +576,16 @@ const RULES = [
   [/\bdocker\s+(?:system|volume|image|container|network|builder)\s+prune\b|\bdocker\s+(?:rmi?|container\s+rm|image\s+rm|volume\s+rm)\b/, 'high', 'deletes docker data'],
   [/\b(?:shutdown|reboot|halt|poweroff)\b|\binit\s+[06]\b/, 'high', 'shuts down / reboots the machine'],
   [/\b(?:pkill|killall)\b|\bdocker\s+kill\b/, 'high', 'terminates processes'],
+  [/\b(?:shred|wipe|blkdiscard|truncate)\b[^|;&]*\s['"]?\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk|md|dm-|mapper\/|loop)\w*/, 'high', 'destroys a whole disk device', true],
+  [/\b(?:shred|truncate)\b[^|;&]*\s['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'destroys the contents of a system file', true],
   [/\b(?:shred|truncate)\b/, 'high', 'destroys file contents'],
   [/\biptables\s+-F\b|\bufw\s+disable\b/, 'high', 'drops firewall rules'],
   [/\bmv\s+\S+\s+\/dev\/null\b/, 'high', 'moves a file into /dev/null (deletes it)', true],
   // redirections: N>, N>>, &>, >|, >> onto system files; any other file write is medium
-  [/(?:\d*|&)>>?\|?\s*['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'overwrites a system file'],
+  [/(?:^|[^>])(?:\d*|&)>(?!>)\|?\s*['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'overwrites a system file', true],
+  [/(?:\d*|&)>>\|?\s*['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'appends to a system file'],
+  // text piped into an interpreter with no script runs it as code (`curl … | python3`, `cat x | perl -`)
+  [/\|\s*(?:(?:sudo|doas)\s+(?:-\S+\s+)*)?(?:\S*\/)?(?:python[\d.]*|perl[\d.]*|ruby|node|php[\d.]*)(?:\s+-)?\s*(?:$|[;&|)])/, 'high', 'runs piped text as a script'],
   [/(?:^|[^<>=-])(?:\d+|&)?>>?\|?(?!&|>)\s*(?!['"]?\/dev\/(?:null|stdout|stderr)\b)['"]?[^\s&|;)]/, 'medium', 'redirect writes to a file'],
   [/\btee\b/, 'medium', 'tee writes to a file'],
   [/\bsed\s+(?:-\S+\s+)*(?:-i|--in-place)\b/, 'medium', 'edits files in place'],
@@ -192,7 +612,7 @@ export function normalizeGlobals(command) {
 }
 
 /** @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}} */
-export function checkDanger(command, baseRisk = 'safe') {
+export function checkDanger(command, baseRisk = 'safe', { lenient = false } = {}) {
   let risk = baseRisk;
   const warnings = [];
   let critical = false;
@@ -203,19 +623,16 @@ export function checkDanger(command, baseRisk = 'safe') {
   };
   const text = normalizeGlobals(command);
   const inner = [];
+  const flags = {};
   // structural checks run on both readings of backslashes (POSIX escapes / Windows path separators)
   for (const words of [...simpleCommands(text), ...simpleCommands(text, { winPaths: true })]) {
-    const w = commandWords(words);
-    if (!w.length) continue;
+   for (const w of commandChains(words, inner, flags)) {
     const head = w[0].replace(/^.*[\\/]/, '');
     const lower = head.toLowerCase().replace(/\.exe$/, '');
     // a lone string with spaces is a command handed to another program ('…' | bash)
     if (w.length === 1 && /\s/.test(w[0])) inner.push(w[0]);
-    // shells / eval run their argument as a command: check it too
-    if (/^(?:ba|z|da|k|fi|c)?sh$|^(?:pwsh|powershell|cmd)$/.test(lower)) {
-      const i = w.findIndex((x, k) => k > 0 && /^(?:-c|-Command|-Co\w*|\/c|\/k)$/i.test(x));
-      if (i > 0 && w[i + 1] != null) inner.push(w.slice(i + 1).join(' '));
-    } else if (lower === 'eval' || lower === 'iex' || lower === 'invoke-expression') inner.push(w.slice(1).join(' '));
+    // the program itself depends on the shell state (`$CMD -rf /`, `$(which rm) -rf /`, `& $tool`): unknown
+    if (!lenient && /^[$`]/.test(head)) hit('high', 'runs a command whose name depends on the shell state; it cannot be checked');
     if (head === 'rm' || head === 'unlink') rmCheck(w, hit);
     else if (head === 'kill') killCheck(w, hit);
     else if (/^(?:rd|rmdir|del|erase)$/i.test(head)) {
@@ -223,10 +640,30 @@ export function checkDanger(command, baseRisk = 'safe') {
       if (!a.some((x) => /^\/[a-z]$/i.test(x)) && a.some((x) => /^-\w/.test(x))) removeItemCheck(w, hit);
       else cmdDelCheck(w, hit);
     } else if (PS_REMOVE.test(lower)) removeItemCheck(w, hit);
+    else if (head === 'find') findCheck(w, hit);
+    else if (head === 'rsync') rsyncCheck(w, hit);
+    else if (['cp', 'mv', 'install', 'ln'].includes(head)) copyCheck(w, hit);
+    else if (['chmod', 'chown', 'chgrp'].includes(head)) permCheck(w, hit);
+    else if (head === 'tar' || head === 'bsdtar' || head === 'gtar') tarCheck(w, hit);
+    else if (head === 'docker' || head === 'podman') dockerCheck(w, hit);
+    if (['tee', 'cp', 'install', 'sponge', 'pv', 'mv', 'ln'].includes(lower)) rawDiskWriteCheck(w, hit);
+    interpCheck(w, hit);
+    stdinCodeCheck(w, hit, inner);
     if (head === 'git' && w[1] === 'rm') hit('high', 'rm deletes files permanently (no trash)');
+    sysFileWriteCheck(w, head, hit);
+   }
+  }
+  if (flags.unsure) hit('high', flags.unsure);
+  if (flags.privileged) hit('medium', 'runs with root privileges');
+  // `-c` values of other programs: checked as commands, but a name like "$PAT" is not a command name there
+  for (const c of new Set(flags.lenient || [])) {
+    if (!c.trim() || inner.includes(c)) continue;
+    const d = checkDanger(c, 'safe', { lenient: true });
+    for (const m of d.warnings) hit(d.risk, m, d.critical);
   }
-  for (const c of inner) {
-    if (c === command) continue;
+  pipelineDeleteCheck(text, hit);
+  for (const c of new Set(inner)) {
+    if (c === command || !c.trim()) continue;
     const d = checkDanger(c);
     for (const m of d.warnings) hit(d.risk, m, d.critical);
   }
diff --git a/src/variants.js b/src/variants.js
index 4a171b3..ac463c2 100644
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
+  gh_pr_view: { pwsh: 'gh pr view«{pr!raw}»', cmd: 'gh pr view«{pr!raw}»' },
+  gh_pr_create: { pwsh: 'gh pr create --fill', cmd: 'gh pr create --fill' },
+  gh_pr_checks: { pwsh: 'gh pr checks«{pr!raw}»', cmd: 'gh pr checks«{pr!raw}»' },
+  gh_pr_merge: { pwsh: 'gh pr merge«{pr!raw}»', cmd: 'gh pr merge«{pr!raw}»' },
+  gh_run_list: { pwsh: 'gh run list', cmd: 'gh run list' },
+  gh_run_view: { pwsh: 'gh run view«{num!raw}»', cmd: 'gh run view«{num!raw}»' },
+  activate_venv: {
+    fish: 'source {path}/bin/activate.fish',
+    pwsh: { win: "& (Join-Path {path} 'Scripts/Activate.ps1')", unix: "& (Join-Path {path} 'bin/Activate.ps1')" },
+    cmd: 'call {path}\\Scripts\\activate.bat',
+  },
 };

exec
/bin/bash -lc 'node --test test/compose.test.js test/danger.test.js test/devtools.test.js test/hybrid.test.js test/parity.test.js test/regressions10.test.js test/regressions11.test.js test/regressions12.test.js test/regressions13.test.js test/regressions14.test.js test/regressions15.test.js test/regressions16.test.js test/regressions17.test.js test/regressions18.test.js test/regressions3-history.test.js test/regressions3-render.test.js test/regressions3.test.js test/regressions5.test.js test/regressions6.test.js test/regressions7.test.js test/shells.test.js test/slots.test.js test/templates.test.js' in /workspace/tellsh
exec
/bin/bash -lc 'cat src/compose.js' in /workspace/tellsh
 succeeded in 0ms:
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

 exited 1 in 5043ms:
TAP version 13
# Subtest: /workspace/tellsh/test/compose.test.js
ok 1 - /workspace/tellsh/test/compose.test.js
  ---
  duration_ms: 539.162352
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 2 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 238.750894
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 3 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 292.855439
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 4 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 287.119441
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 5 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 178.22453
  ...
# Subtest: /workspace/tellsh/test/regressions10.test.js
not ok 6 - /workspace/tellsh/test/regressions10.test.js
  ---
  duration_ms: 668.830058
  location: '/workspace/tellsh/test/regressions10.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions11.test.js
not ok 7 - /workspace/tellsh/test/regressions11.test.js
  ---
  duration_ms: 939.328865
  location: '/workspace/tellsh/test/regressions11.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions12.test.js
not ok 8 - /workspace/tellsh/test/regressions12.test.js
  ---
  duration_ms: 647.572441
  location: '/workspace/tellsh/test/regressions12.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions13.test.js
ok 9 - /workspace/tellsh/test/regressions13.test.js
  ---
  duration_ms: 396.898208
  ...
# Subtest: /workspace/tellsh/test/regressions14.test.js
ok 10 - /workspace/tellsh/test/regressions14.test.js
  ---
  duration_ms: 379.393243
  ...
# Subtest: /workspace/tellsh/test/regressions15.test.js
ok 11 - /workspace/tellsh/test/regressions15.test.js
  ---
  duration_ms: 406.771965
  ...
# Subtest: /workspace/tellsh/test/regressions16.test.js
ok 12 - /workspace/tellsh/test/regressions16.test.js
  ---
  duration_ms: 424.018736
  ...
# Subtest: /workspace/tellsh/test/regressions17.test.js
ok 13 - /workspace/tellsh/test/regressions17.test.js
  ---
  duration_ms: 413.54063
  ...
# Subtest: /workspace/tellsh/test/regressions18.test.js
ok 14 - /workspace/tellsh/test/regressions18.test.js
  ---
  duration_ms: 478.406691
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 15 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 313.963085
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 16 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 375.733101
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 17 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 337.417802
  ...
# Subtest: /workspace/tellsh/test/regressions5.test.js
ok 18 - /workspace/tellsh/test/regressions5.test.js
  ---
  duration_ms: 671.931278
  ...
# Subtest: /workspace/tellsh/test/regressions6.test.js
ok 19 - /workspace/tellsh/test/regressions6.test.js
  ---
  duration_ms: 726.798779
  ...
# Subtest: /workspace/tellsh/test/regressions7.test.js
ok 20 - /workspace/tellsh/test/regressions7.test.js
  ---
  duration_ms: 382.324628
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 21 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 3966.4596
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 22 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 256.481823
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 23 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 246.571938
  location: '/workspace/tellsh/test/templates.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..23
# tests 23
# suites 0
# pass 18
# fail 5
# cancelled 0
# skipped 0
# todo 0
# duration_ms 5031.570342

exec
/bin/bash -lc "node test/regressions10.test.js; node -p 'JSON.stringify({version:process.version,nodeOptions:process.env.NODE_OPTIONS,testContext:process.env.NODE_TEST_CONTEXT})'" in /workspace/tellsh
 succeeded in 468ms:
TAP version 13
# Subtest: major: a quoted argument mixing request words with a path or file name is unclear, not the path
not ok 1 - major: a quoted argument mixing request words with a path or file name is unclear, not the path
  ---
  duration_ms: 179.073967
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
  duration_ms: 62.375452
  ...
# Subtest: major: history values of a command scoped to another repository, directory or daemon are refused
ok 3 - major: history values of a command scoped to another repository, directory or daemon are refused
  ---
  duration_ms: 38.732379
  ...
# Subtest: minor: a script and its arguments are several operands
ok 4 - minor: a script and its arguments are several operands
  ---
  duration_ms: 4.531898
  ...
# Subtest: nit: bash does not write the running call first, so an identical last tellsh line is the previous command
ok 5 - nit: bash does not write the running call first, so an identical last tellsh line is the previous command
  ---
  duration_ms: 4.360076
  ...
# Subtest: minor: dd, cp, install, mv, ln -f, perl -i and chmod 000 onto a system file are critical
ok 6 - minor: dd, cp, install, mv, ln -f, perl -i and chmod 000 onto a system file are critical
  ---
  duration_ms: 3.128652
  ...
# Subtest: minor: an unclear argument blanks every operand slot it contains, not only path slots
ok 7 - minor: an unclear argument blanks every operand slot it contains, not only path slots
  ---
  duration_ms: 6.328393
  ...
# Subtest: major: A_dev excludes the hybrid dev split from every training source (OOD, tldr, anaphora too)
ok 8 - major: A_dev excludes the hybrid dev split from every training source (OOD, tldr, anaphora too)
  ---
  duration_ms: 5.106367
  ...
1..8
# tests 8
# suites 0
# pass 7
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 341.040416
{"version":"v20.19.2"}

exec
/bin/bash -lc "sed -n '1,160p' test/regressions10.test.js; sed -n '1,110p' test/regressions11.test.js; sed -n '1,90p' test/regressions12.test.js" in /workspace/tellsh
 succeeded in 0ms:
// Regression tests for round 9: the round-8 findings (review/r8-claude.md, review/r8-codex.md). A quoted argument
// after the first that mixes request words with a path or file name is unclear, not a path; history values of
// `git -C` / `docker --context` commands belong to another repository / daemon; a script and its arguments are
// several operands; bash does not write the running call to its history first; system files written by dd, cp,
// install, mv, ln -f, perl -i or chmod 000 are critical; unclear arguments are checked against every operand slot;
// the A_dev calibration model excludes the hybrid dev split from every training source.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { suggest } from '../src/pipeline.js';
import { checkDanger } from '../src/danger.js';
import { joinArgs } from '../src/shellwords.js';
import { analyzeCommand, isAmbiguous } from '../src/history.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
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
      const r = run(q, [h]);
      assert.ok(!/folder|the file|plik/.test(r.command ?? ''), `${q} after ${h}: ${r.command}`);
    }
  }
  assert.equal(run('delete it', ['tellsh show "My Notes.txt"']).command, "rm 'My Notes.txt'");
});

test('major: history values of a command scoped to another repository, directory or daemon are refused', () => {
  refused(run('delete it', ['git -C /repo blame notes.txt']), '<FILE>', 'git -C blame');
  refused(run('delete it', ['git --work-tree=/srv/app diff a.txt']), '<FILE>', 'git --work-tree=');
  refused(run('stop it', ['docker --context production logs web']), '<CONTAINER>', 'docker --context');
  refused(run('stop it', ['docker -H tcp://prod:2375 logs web']), '<CONTAINER>', 'docker -H');
  refused(run('stop it', ['DOCKER_HOST=tcp://prod:2375 docker logs web']), '<CONTAINER>', 'DOCKER_HOST=');
  // and the command is not repeated without its scope
  for (const q of ['do it again', 'same for api']) {
    const r = run(q, ['docker --context production logs web']);
    assert.ok(!/^docker (?:logs|stop)\b/.test(r.command ?? '') || r.command.includes('<'), `${q}: ${r.command}`);
  }
  const a = analyzeCommand('docker --context production logs web');
  assert.ok(isAmbiguous(a.ents.container) && (a.intent == null || a.ambiguous), JSON.stringify(a));
  // without a scope option nothing changes
  assert.equal(run('delete it', ['git blame notes.txt']).command, 'rm notes.txt');
  assert.equal(run('stop it', ['docker logs web']).command, 'docker stop web');
  assert.equal(run('stop it', ['docker --debug logs web']).command, 'docker stop web');
});

test('minor: a script and its arguments are several operands', () => {
  for (const h of ['python3 script.py data.csv', 'node build.js out/', 'bash deploy.sh prod.env']) {
    const r = run('delete it', [h]);
    assert.ok(r.command == null || r.command.includes('<'), `${h}: ${r.command}`);
  }
  assert.equal(run('delete it', ['python3 script.py']).command, 'rm script.py');
  assert.equal(run('delete it', ['node build.js --watch']).command, 'rm build.js');
});

test('nit: bash does not write the running call first, so an identical last tellsh line is the previous command', () => {
  const h = (shell) => Object.assign(['cat secret.txt', 'tellsh delete it'], { kind: 'posix', shell });
  assert.ok(!/secret/.test(run('delete it', h('bash')).command ?? ''), 'bash');
  // zsh / fish / PSReadLine write it first: the line is this call, the previous command is the one before it
  assert.equal(run('delete it', h('zsh')).command, 'rm secret.txt');
  assert.equal(run('delete it', h('fish')).command, 'rm secret.txt');
});

test('minor: dd, cp, install, mv, ln -f, perl -i and chmod 000 onto a system file are critical', () => {
  for (const c of ['dd if=/dev/zero of=/etc/passwd', 'sudo dd if=x of=/boot/vmlinuz', 'cp /tmp/x /etc/passwd', 'install -m 644 x /etc/passwd',
    'sudo mv /tmp/x /etc/shadow', 'ln -sf /tmp/x /etc/passwd', 'perl -pi -e s/a/b/ /etc/passwd', 'perl -i.bak -pe 1 /etc/fstab', 'chmod 000 /etc/passwd',
    'sudo sh -c "cp x /etc/passwd"']) {
    const d = checkDanger(c);
    assert.ok(d.critical && d.risk === 'high', `${c}: ${JSON.stringify(d)}`);
  }
  // reading a system file, copying into a system directory, ordinary dd / chmod: not critical
  for (const c of ['cp /etc/passwd /tmp/x', 'sudo cp x.service /etc/systemd/system/', 'dd if=a.iso of=out.img', 'chmod 644 /etc/hosts',
    'ln -s /etc/passwd x', 'perl -pi -e s/a/b/ notes.txt', 'cp -t /etc/nginx a.conf']) {
    assert.ok(!checkDanger(c).critical, c);
  }
});

test('minor: an unclear argument blanks every operand slot it contains, not only path slots', () => {
  const r = run('stop service nginx', null, { unclearArgs: ['nginx please'] });
  assert.ok(r.command.includes('<SERVICE>') && !/nginx/.test(r.command), r.command);
  assert.ok(r.warnings.some((w) => /^value left as a placeholder/.test(w)), r.warnings.join('; '));
  const c = run('stop container web', null, { unclearArgs: ['web now'] });
  assert.ok(c.command.includes('<CONTAINER>'), c.command);
  // text slots (a commit message) are not operands
  assert.ok(/fix the bug/.test(run('commit "fix the bug"', null, { unclearArgs: ['fix the bug'] }).command));
  // unrelated unclear arguments change nothing
  assert.equal(run('stop service nginx', null, { unclearArgs: ['my data'] }).command, 'sudo systemctl stop nginx');
});

test('major: A_dev excludes the hybrid dev split from every training source (OOD, tldr, anaphora too)', () => {
  const sh = readFileSync(join(ROOT, 'scripts/hybrid/train_a_dev.sh'), 'utf8');
  const gen = readFileSync(join(ROOT, 'scripts/gen_data.js'), 'utf8');
  // the lines the script rewrites exist in gen_data.js, and the script fails when a rewrite did not happen
  assert.ok(gen.includes('if (heldOut.has(r0.text)) { dropped++; continue; }'));
  assert.ok(/^ {2}const leaks = excl\.has;$/m.test(gen));
  assert.ok(gen.includes("import { ctxFeatures } from '../src/history.js';"));
  assert.ok(sh.includes("grep -q 'const leaks = (t) => excl.has(t) || isDevText(t);'"));
  // every source goes through leaks(): the OOD and tldr loaders and every emitted row
  for (const re of [/for \(const r of ood\) \{\s*if \(leaks\(r\.text\)\) continue;/, /if \(leaks\(r\.text\)\) continue;\s*const key = r\.tool/, /const emit = [^\n]*\n\s*if \(leaks\(text\)\)/]) {
    assert.ok(re.test(gen), String(re));
  }
  // the rewrite applied to gen_data.js produces the expected line
  const sed = spawnSync('sh', ['-c', `sed -n -e "s#^  const leaks = excl.has;\\$#  const leaks = (t) => excl.has(t) || isDevText(t);#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
  assert.equal(sed.stdout.trim(), 'const leaks = (t) => excl.has(t) || isDevText(t);');
});
// Regression tests for round 10: the round-9 findings (review/r9-codex.md). `wrangler dev` runs the project's build
// command, so it is not safe (never auto-run with --yes); attached short-option values (`git -C/repo`,
// `docker -Htcp://…`) scope a history command like the separate form; a wrapper that changes the working directory
// (`env -C`, `sudo -D`) or the root (`chroot`) keeps that scope; the hybrid export drops train rows equal to a dev
// text and A_dev excludes the complete exported dev split.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { suggest } from '../src/pipeline.js';
import { BY_ID } from '../src/catalog.js';
import { analyzeCommand, isAmbiguous } from '../src/history.js';
import { normalize } from '../src/features.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, history) => suggest(q, { env: BASH, ...(history ? { history } : {}) });
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BIN = join(ROOT, 'bin', 'tellsh.js');
const refused = (r, ph, why) => {
  assert.equal(r.context.rule, 'refused', `${why}: ${JSON.stringify(r.context)} -> ${r.command}`);
  assert.ok(r.command == null || r.command.includes(ph), `${why}: ${r.command}`);
};

test('major: wrangler dev runs project build commands: medium risk, never auto-run with --yes', () => {
  assert.equal(BY_ID.wrangler_dev.risk, 'medium');
  assert.equal(BY_ID.wrangler_dev.risk, BY_ID.npm_run_script.risk);
  const r = run('start wrangler dev');
  assert.equal(r.intent, 'wrangler_dev');
  assert.notEqual(r.risk, 'safe');
  // nothing can run even if the gate regressed: no npx on PATH
  const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', 'start', 'wrangler', 'dev'],
    { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1', PATH: '/nonexistent' } });
  assert.equal(c.status, 4, c.stdout + c.stderr);
  assert.match(c.stdout, /only auto-runs safe/);
});

test('major: attached short-option values scope a history command like the separate form', () => {
  refused(run('delete it', ['git -C/repo blame notes.txt']), '<FILE>', 'git -C/repo');
  refused(run('stop it', ['docker -Htcp://prod:2375 logs web']), '<CONTAINER>', 'docker -Htcp://');
  refused(run('stop it', ['docker -cprod logs web']), '<CONTAINER>', 'docker -cprod');
  refused(run('stop it', ['docker --host=tcp://prod:2375 logs web']), '<CONTAINER>', 'docker --host=');
  for (const h of ['git -C/repo blame notes.txt', 'docker -Htcp://prod:2375 logs web']) {
    const a = analyzeCommand(h);
    assert.ok(a.scoped, h);
    assert.ok(Object.values(a.ents).every((v) => v == null || isAmbiguous(v)), `${h}: ${JSON.stringify(a.ents)}`);
    for (const q of ['do it again', 'show it']) {
      const r = run(q, [h]);
      assert.ok(r.command == null || r.command.includes('<'), `${q} after ${h}: ${r.command}`);
    }
  }
  // git -c (config) is not a scope, attached or not; neither is a plain docker flag
  assert.equal(run('delete it', ['git -ccolor.ui=false blame notes.txt']).command, 'rm notes.txt');
  assert.equal(run('delete it', ['git -c color.ui=false blame notes.txt']).command, 'rm notes.txt');
  assert.equal(run('stop it', ['docker -D logs web']).command, 'docker stop web');
});

test('major: a wrapper that changes the working directory or root keeps that scope', () => {
  for (const h of ['env -C /repo cat notes.txt', 'sudo -D /repo cat notes.txt', 'env --chdir=/repo cat notes.txt', 'env -C/repo cat notes.txt',
    'sudo -D/repo cat notes.txt', 'sudo --chdir /repo cat notes.txt', 'sudo -u root -D /repo cat notes.txt', 'env -i -C /repo cat notes.txt',
    'nice -n 5 env -C /repo cat notes.txt', 'unshare --wd=/repo cat notes.txt', 'systemd-run --working-directory=/repo cat notes.txt']) {
    for (const q of ['delete it', 'show it']) refused(run(q, [h]), '<FILE>', `${q} after ${h}`);
  }
  // an absolute path names the same file from any directory
  assert.equal(run('delete it', ['env -C /repo cat /tmp/abs.txt']).command, 'rm /tmp/abs.txt');
  // another root: every path names something else
  for (const h of ['chroot /srv cat /etc/x', 'sudo chroot /srv cat notes.txt', 'unshare -R /srv cat /etc/x', 'nsenter --root=/srv cat /etc/x']) {
    refused(run('delete it', [h]), '<FILE>', h);
  }
  // wrappers that keep the directory change nothing
  for (const h of ['sudo -u root cat notes.txt', 'nice -n 5 cat notes.txt', 'env FOO=1 cat notes.txt', 'env -i cat notes.txt', 'doas -C /etc/doas.conf cat notes.txt']) {
    assert.equal(run('delete it', [h]).command, 'rm notes.txt', h);
  }
});

test('minor: hybrid export drops train rows equal to a dev text; A_dev excludes the complete dev split', () => {
  const ex = readFileSync(join(ROOT, 'scripts/hybrid/export_data.js'), 'utf8');
  assert.ok(ex.includes("r.split === 'dev' || !devTexts.has(normalize(r.text))"));
  assert.ok(ex.includes("'dev_texts.json'"));
  const sh = readFileSync(join(ROOT, 'scripts/hybrid/train_a_dev.sh'), 'utf8');
  assert.ok(sh.includes("grep -q '_devIndex.has(normalize(t))'"));
  // the rewritten import line parses and uses the dev index
  const sed = spawnSync('sh', ['-c', `DEV_TEXTS=/x.json; sed -n -e "s#^import { ctxFeatures } from '../src/history.js';#&\\nconst _devIndex = new Set(JSON.parse(readFileSync('$DEV_TEXTS', 'utf8')));#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
  assert.match(sed.stdout, /const _devIndex = new Set\(JSON\.parse\(readFileSync\('\/x\.json', 'utf8'\)\)\);/);
  // when the export exists, no train row has a dev text
  const p = join(ROOT, 'build/hybrid/train.jsonl');
  let rows;
  try { rows = readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)); } catch { return; }
  const dev = new Set(rows.filter((r) => r.split === 'dev').map((r) => normalize(r.text)));
  assert.equal(rows.filter((r) => r.split === 'train' && dev.has(normalize(r.text))).length, 0);
});
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
/bin/bash -lc "node bin/tellsh.js --json --shell bash --os linux delete 'folder /tmp/x'; cat bin/tellsh.js; node test/templates.test.js" in /workspace/tellsh
exec
/bin/bash -lc 'node test/shells.test.js' in /workspace/tellsh
exec
/bin/bash -lc 'node test/regressions11.test.js; node test/regressions12.test.js' in /workspace/tellsh
 exited 1 in 271ms:
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
#!/usr/bin/env node
import { main } from '../src/cli.js';

// `tellsh … | head -1`: a closed pipe is not an error
for (const s of [process.stdout, process.stderr]) s.on('error', (e) => { if (e.code === 'EPIPE') process.exit(process.exitCode ?? 0); throw e; });

main().then((code) => { process.exitCode = code; }, (err) => {
  console.error(`tellsh: ${err?.stack || err}`);
  process.exitCode = 1;
});
TAP version 13
# Subtest: shQuote round-trips nasty strings through bash
not ok 1 - shQuote round-trips nasty strings through bash
  ---
  duration_ms: 5.764649
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
  duration_ms: 0.460793
  ...
# Subtest: raw slots are validated, never injected
ok 3 - raw slots are validated, never injected
  ---
  duration_ms: 1.41437
  ...
# Subtest: optional segments are dropped when slot missing
ok 4 - optional segments are dropped when slot missing
  ---
  duration_ms: 0.31048
  ...
# Subtest: non-slot braces are left alone
ok 5 - non-slot braces are left alone
  ---
  duration_ms: 0.314154
  ...
# Subtest: every intent renders on linux and darwin without throwing, with valid risk
ok 6 - every intent renders on linux and darwin without throwing, with valid risk
  ---
  duration_ms: 62.95972
  ...
# Subtest: darwin variants differ where commands differ
ok 7 - darwin variants differ where commands differ
  ---
  duration_ms: 1.383756
  ...
# Subtest: injection attempt in a filename stays a single quoted argument
ok 8 - injection attempt in a filename stays a single quoted argument
  ---
  duration_ms: 0.416981
  ...
1..8
# tests 8
# suites 0
# pass 7
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 86.575349

 exited 1 in 1123ms:
TAP version 13
# Subtest: major: wrangler dev runs project build commands: medium risk, never auto-run with --yes
not ok 1 - major: wrangler dev runs project build commands: medium risk, never auto-run with --yes
  ---
  duration_ms: 215.535225
  location: '/workspace/tellsh/test/regressions11.test.js:26:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /only auto-runs safe/. Input:
    
    ''
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: ''
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (file:///workspace/tellsh/test/regressions11.test.js:36:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    node:internal/test_runner/harness:255:12
    node:internal/process/task_queues:140:7
    AsyncResource.runInAsyncScope (node:async_hooks:206:9)
    AsyncResource.runMicrotask (node:internal/process/task_queues:137:8)
  ...
# Subtest: major: attached short-option values scope a history command like the separate form
ok 2 - major: attached short-option values scope a history command like the separate form
  ---
  duration_ms: 59.727149
  ...
# Subtest: major: a wrapper that changes the working directory or root keeps that scope
ok 3 - major: a wrapper that changes the working directory or root keeps that scope
  ---
  duration_ms: 53.052709
  ...
# Subtest: minor: hybrid export drops train rows equal to a dev text; A_dev excludes the complete dev split
ok 4 - minor: hybrid export drops train rows equal to a dev text; A_dev excludes the complete dev split
  ---
  duration_ms: 260.245696
  ...
1..4
# tests 4
# suites 0
# pass 3
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 601.729451
TAP version 13
# Subtest: major: sudo -i / --login and runuser -l run in the target home: relative history values are ambiguous
ok 1 - major: sudo -i / --login and runuser -l run in the target home: relative history values are ambiguous
  ---
  duration_ms: 92.301354
  ...
# Subtest: major: sudo --chroot / -R runs under another root: every history value is ambiguous
ok 2 - major: sudo --chroot / -R runs under another root: every history value is ambiguous
  ---
  duration_ms: 6.943998
  ...
# Subtest: major: a cd / pushd inside a ( … ) subshell does not outlast it: relative values after it are ambiguous
ok 3 - major: a cd / pushd inside a ( … ) subshell does not outlast it: relative values after it are ambiguous
  ---
  duration_ms: 14.076793
  ...
# Subtest: major: every npx wrangler intent is at least medium risk, never auto-run with --yes
not ok 4 - major: every npx wrangler intent is at least medium risk, never auto-run with --yes
  ---
  duration_ms: 181.888904
  location: '/workspace/tellsh/test/regressions12.test.js:64:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /only auto-runs safe/. Input:
    
    ''
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: ''
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (file:///workspace/tellsh/test/regressions12.test.js:76:12)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
1..4
# tests 4
# suites 0
# pass 3
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 307.621435

 exited 1 in 3714ms:
TAP version 13
# Subtest: bash/linux: every intent renders and passes bash -n
ok 1 - bash/linux: every intent renders and passes bash -n
  ---
  duration_ms: 517.077802
  ...
# Subtest: zsh/darwin BSD: every intent renders and passes bash -n
ok 2 - zsh/darwin BSD: every intent renders and passes bash -n
  ---
  duration_ms: 496.886364
  ...
# Subtest: zsh/darwin GNU: every intent renders and passes bash -n
ok 3 - zsh/darwin GNU: every intent renders and passes bash -n
  ---
  duration_ms: 508.310454
  ...
# Subtest: sh/linux (dash): every intent renders and passes sh -n
ok 4 - sh/linux (dash): every intent renders and passes sh -n
  ---
  duration_ms: 405.515013
  ...
# Subtest: sh/busybox: every intent renders and passes busybox -n
ok 5 - sh/busybox: every intent renders and passes busybox -n
  ---
  duration_ms: 430.982674
  ...
# Subtest: fish: every intent renders (fish -n when installed)
ok 6 - fish: every intent renders (fish -n when installed)
  ---
  duration_ms: 438.073913
  ...
# fish not installed: syntax check skipped
# Subtest: PowerShell/win32: every intent renders or reports a gap (parser check when pwsh is installed)
ok 7 - PowerShell/win32: every intent renders or reports a gap (parser check when pwsh is installed)
  ---
  duration_ms: 424.454362
  ...
# pwsh not installed: parser check skipped (3 gaps)
# Subtest: PowerShell/linux: every intent renders or reports a gap (parser check when pwsh is installed)
ok 8 - PowerShell/linux: every intent renders or reports a gap (parser check when pwsh is installed)
  ---
  duration_ms: 429.478063
  ...
# pwsh not installed: parser check skipped (0 gaps)
# Subtest: cmd: best-effort coverage is reported, gaps carry a reason
ok 9 - cmd: best-effort coverage is reported, gaps carry a reason
  ---
  duration_ms: 12.554422
  ...
# Subtest: quoting round-trips through bash and sh
not ok 10 - quoting round-trips through bash and sh
  ---
  duration_ms: 4.179474
  location: '/workspace/tellsh/test/shells.test.js:110:1'
  failureType: 'testCodeFailure'
  error: 'spawnSync bash EPERM'
  code: 'EPERM'
  stack: |-
    Object.spawnSync (node:internal/child_process:1123:20)
    spawnSync (node:child_process:877:24)
    execFileSync (node:child_process:920:15)
    TestContext.<anonymous> (file:///workspace/tellsh/test/shells.test.js:112:51)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: fish / PowerShell / cmd quoting rules
ok 11 - fish / PowerShell / cmd quoting rules
  ---
  duration_ms: 0.809124
  ...
# Subtest: per-shell variants: intent shared, rendering differs
ok 12 - per-shell variants: intent shared, rendering differs
  ---
  duration_ms: 11.21309
  ...
1..12
# tests 12
# suites 0
# pass 11
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 3702.253046

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const [q,h] of [
['merge that pr','gh pr view 45 --repo other/repo'],
['merge that pr','GH_REPO=other/repo gh pr view 45'],
['merge that pr','(cd /other/repo && gh pr view 45)'],
['merge that pr','env -C /other/repo gh pr view 45'],
['merge that pr','GH_HOST=git.enterprise.local gh pr view 45'],
['merge pr 45 in other/repo',null],
['merge pr 45 in repository other/repo',null],
['merge pr 45 --repo other/repo',null],
['same for "'$(cat /tmp/path )'"','rm -r /tmp/old'],
['same for /tmp/a except /tmp/a/keep','rm -r /tmp/old'],
['same for /tmp/a and /tmp/b','rm -r /tmp/old'],
['delete folders /tmp/a and /tmp/b',null]
]){let r=suggest(q,{env,history:h?[h]:undefined});console.log(JSON.stringify({q,h,command:r.command,missing:r.missing,risk:r.risk,method:r.method,context:r.context}));}
JS" in /workspace/tellsh
 succeeded in 187ms:
{"q":"merge that pr","h":"gh pr view 45 --repo other/repo","command":"gh pr merge <PR>","missing":["pr"],"risk":"medium","method":"history-rule","context":{"used":true,"commands":1,"rule":"refused","note":"the latest pr in history (45) cannot be read unambiguously; not guessing"}}
{"q":"merge that pr","h":"GH_REPO=other/repo gh pr view 45","command":"gh pr merge 45","missing":[],"risk":"medium","method":"history-rule","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge that pr","h":"(cd /other/repo && gh pr view 45)","command":"gh pr merge <PR>","missing":["pr"],"risk":"medium","method":"history-rule","context":{"used":true,"commands":1,"rule":"refused","note":"the latest pr in history (45) cannot be read unambiguously; not guessing"}}
{"q":"merge that pr","h":"env -C /other/repo gh pr view 45","command":"gh pr merge <PR>","missing":["pr"],"risk":"medium","method":"history-rule","context":{"used":true,"commands":1,"rule":"refused","note":"the latest pr in history (45) cannot be read unambiguously; not guessing"}}
{"q":"merge that pr","h":"GH_HOST=git.enterprise.local gh pr view 45","command":"gh pr merge 45","missing":[],"risk":"medium","method":"history-rule","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pr\" from history = 45"}}
{"q":"merge pr 45 in other/repo","h":null,"command":"gh pr merge 45","missing":[],"risk":"medium","method":"catalog","context":{"used":false}}
{"q":"merge pr 45 in repository other/repo","h":null,"command":"gh pr merge 45","missing":[],"risk":"medium","method":"catalog","context":{"used":false}}
{"q":"merge pr 45 --repo other/repo","h":null,"command":"gh pr merge 45","missing":[],"risk":"medium","method":"catalog","context":{"used":false}}
{"q":"same for $(cat /tmp/path )","h":"rm -r /tmp/old","command":"rm -r /tmp/path","missing":[],"risk":"high","method":"history-rule","context":{"used":true,"commands":1,"rule":"same-for","note":"same as previous delete_dir with path=/tmp/path"}}
{"q":"same for /tmp/a except /tmp/a/keep","h":"rm -r /tmp/old","command":"rm -r /tmp/a","missing":[],"risk":"high","method":"history-rule","context":{"used":true,"commands":1,"rule":"same-for","note":"same as previous delete_dir with path=/tmp/a"}}
{"q":"same for /tmp/a and /tmp/b","h":"rm -r /tmp/old","command":"rm -r /tmp/a","missing":[],"risk":"high","method":"history-rule","context":{"used":true,"commands":1,"rule":"same-for","note":"same as previous delete_dir with path=/tmp/a"}}
{"q":"delete folders /tmp/a and /tmp/b","h":null,"command":"rm -r <PATH>","missing":["path"],"risk":"high","method":"catalog","context":{"used":false}}

exec
/bin/bash -lc "nl -ba src/history.js | sed -n '788,801p'; nl -ba src/pipeline.js | sed -n '288,307p'; nl -ba src/fill.js | sed -n '65,105p'; nl -ba scripts/real/prepare_real.js | sed -n '68,85p'; cat src/cli.js | tail -90; cat scripts/real/real_rows.js" in /workspace/tellsh
 succeeded in 0ms:
   788	    const pm = args.map(rawOf).join(' ').match(/(?::|tcp:|udp:|sport = :)(\d{2,5})\b/);
   789	    if (pm) { e.port = pm[1]; setIntent('process_on_port', { port: pm[1] }); }
   790	  } else if (head === 'gh' && nonFlags[0] === 'pr' && GH_PR_SELECTS.has(nonFlags[1])) {
   791	    // `gh pr view 45`, `gh pr checkout feature/x`, `gh pr merge <url>`: the pull request ("merge that pr"); none named is
   792	    // the current branch's (left out); another repository's (-R / --repo) or several operands cannot be read
   793	    const { pos, opts } = parseArgs(args.slice(args.indexOf(nonFlags[1]) + 1), GH_PR_VALUE_OPTS);
   794	    const repo = opts['-R'] ?? opts['--repo'];
   795	    if (pos.length === 1 && repo == null && !isAmbiguous(pos[0])) e.pr = rawOf(pos[0]);
   796	    else if (pos.length) e.pr = AMB + pos.map(rawOf).join(' ');
   797	  } else if (head === 'git') {
   798	    const sub = nonFlags[0];
   799	    const rest = args.slice(args.indexOf(sub) + 1);
   800	    if (sub === 'grep') {
   801	      // git grep [-l] PATTERN [DIR]: a search, its directory argument is only where it looked
   288	  // ---- rule: "same for X" reuses the previous intent with one slot replaced ----
   289	  if (ref?.rule === 'same-for') {
   290	    const slots = validHistorySlots(ref.slots);
   291	    // a value that fails validation (a 300-character path, ...) is a placeholder, never `find .`
   292	    const blank = invalidHistorySlots(ref.slots);
   293	    // the new path ends in sentence punctuation (`same for /tmp/data!`): placeholder, as for any request
   294	    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null && BY_ID[ref.intent].risk !== 'safe' && trailingPunctAfter(query, slots[ref.changed])) {
   295	      blank.push(ref.changed);
   296	      delete slots[ref.changed];
   297	    }
   298	    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank, keepOptional: blank });
   299	    const res = { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
   300	    const punct = blank.filter((k) => !invalidHistorySlots(ref.slots).includes(k));
   301	    if (punct.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${punct.join(', ')}); quote the path`];
   302	    if (punct.length < blank.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: it is not a valid value (${blank.filter((k) => !punct.includes(k)).join(', ')})`];
   303	    return res;
   304	  }
   305	  // ---- the reference cannot be resolved at all ("what about this", an older command to replay) ----
   306	  if (ref?.rule === 'refused' && ref.stop) {
   307	    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: ref.note };
    65	  const m = text.match(PR_SELECTOR);
    66	  if (m) {
    67	    const quoted = m[2] ?? m[3] ?? m[4] ?? m[5];
    68	    if (quoted != null) return quoted || '?'; // `""`: named but empty, withheld
    69	    if (m[7] != null) return '?'; // an unclosed / odd quote: withheld
    70	    const w = m[6];
    71	    const branch = /\bbranch\s+$/i.test(m[1]);
    72	    // "merge my pr from 2 days ago", "view pr for 3 days": a number after a connective is not the pull request
    73	    if (PR_ISSUE.test(w)) return '?';
    74	    const rest = text.slice(m.index + m[0].length);
    75	    if (/^#?\d+$/.test(w) && PR_UNIT_AFTER.test(rest)) return '?';
    76	    if (/^\d+$/.test(w)) return branch || PR_NUMBER_LEAD.test(m[1]) ? w : '?';
    77	    // "merge the pr for #12": the pull request for issue 12, or pull request 12
    78	    if (/^#\d+$/.test(w) && !PR_NUMBER_LEAD.test(m[1])) return '?';
    79	    if (PR_ABBREV.test(w) || (PR_HOST.test(w) && !branch)) return '?';
    80	    if (PR_MARKED.test(w)) return w;
    81	    // "merge pr for branch status": after "branch" any word is the selector, a describing one is withheld
    82	    if (branch) return PR_NOT_SELECTOR.test(w) ? `?${w}` : w;
    83	    if (!PR_NOT_SELECTOR.test(w)) {
    84	      // "merge pr for fix #12": the word is followed by a number, so it may describe rather than name the branch
    85	      if (/\b(?:for|from)\s+$/i.test(m[1])) return /\d/.test(rest) ? `?${w}` : w;
    86	      // "merge pr main": a bare word may be a branch or say something else: withheld (`gh pr merge <PR>`), never dropped
    87	      return `?${w}`;
    88	    }
    89	  }
    90	  const hash = text.match(/(?:^|\s)#(\d{1,12})(?=[\s.,!?;:]|$)/);
    91	  if (hash && PR_HASH_LEAD.test(text.slice(0, hash.index + hash[0].indexOf('#')))) return hash[1];
    92	  // 'merge the "feature/login" pull request': an explicitly quoted value is the target
    93	  if (ex.quoted.length) return ex.quoted[0];
    94	  // named but not readable: a number anywhere ("merge the 2 open prs", "merge pr in 2 minutes"), or a marked word or a
    95	  // quote after "pr" ("merge pr bob's", "merge pr feature/x's", "merge pr in repo v2"): withheld
    96	  const p = text.match(PR_WORD);
    97	  const after = p ? text.slice(p.index + p[0].length) : '';
    98	  if (ex.numbers?.length || /\d/.test(text) || /[/_#'"`„“”’]|\w[.-]\w/.test(after) || PR_BRANCH_NAMED.test(after)) return '?';
    99	  return null;
   100	}
   101	const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
   102	const PLACEHOLDER = (name) => `<${name.toUpperCase()}>`;
   103	
   104	// sed needs regex-escaped search text and &,\,/ escaped replacement
   105	// (a newline would end the s command: written as \n, which never matches inside one line)
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

codex
I reproduced two repository-scope problems: a PR reference from history loses `GH_REPO`, and an explicit merge request drops the named repository. Both produce a complete `gh pr merge 45` command in the current repository. The test run also encountered subprocess restrictions, so it does not establish a full pass.
exec
/bin/bash -lc "cat review/r16-claude.md; sed -n '1,120p' src/model.js; sed -n '1,130p' scripts/hybrid/eval_hybrid.js; sed -n '1,135p' scripts/gen_data.js" in /workspace/tellsh
 succeeded in 0ms:
I'm requesting changes. The round-15 fixes do what they say: a stray number no longer becomes the pull request, an unparsable selector shows as `<PR>`, history replay keeps the placeholder, and clustered `-tp` is handled. All 341 tests pass. But two paths still hand out a ready-to-run `gh pr merge` aimed at the wrong pull request, which is the problem the last two rounds set out to remove.

I tested by calling `suggest()` directly. To compare against `7eb2ca7` I added a temporary git worktree under `/tmp` and removed it afterwards. No tracked files were changed.

## Major

**M1 — `src/fill.js:75` (the new `#N` fallback): an issue number becomes the PR to merge.**
- **Cause:** fix15 added `issues?` to `PR_NOT_SELECTOR` (`fill.js:36`), so `for issue` no longer matches as a selector. The request then falls through to the new fallback, which takes any `#N` anywhere in the text. It also catches `#N` in a later clause.
- **Examples:** each comes out as a complete command with `missing=[]`:
  - `merge pr for issue #45` → `gh pr merge 45`
  - `squash merge the pr for issue #8` → `gh pr merge 8`
  - `merge the pr in issue #4` → `gh pr merge 4`
  - `merge the pr that closes #12` → `gh pr merge 12`
  - `merge pr which fixes #12` → `gh pr merge 12`
  - `merge the pr, see #99` → `gh pr merge 99`
- **Inconsistency:** this is the exact case the round-16 test withholds (`close pr for issue 45` → `<PR>`), and only the `#` spelling slips through. `merge pr fixing issue #7` is correctly withheld.
- **Suggested fix:**
  - When the selector match lands on an issue/ticket/bug word, return `'?'` instead of falling through.
  - Accept a bare `#N` only if it is the first token after the verb or right after "pr", not anywhere in the text.

**M2 — `src/history.js:1115-1119` with `src/pipeline.js:475`: "merge that pr" gives a bare `gh pr merge`, i.e. the current branch's PR.**
- **Examples:**
  - after `gh pr view 45` → `merge that pr` → `gh pr merge`, `missing=[]`, with the note "previous command names nothing … not guessing"
  - after `gh pr checkout 45` → `merge this pull request` → `gh pr merge`
  - after `git checkout feat` → `merge that pr` → `gh pr merge` (note: "branch … does not fit; not used")
  - after `cat a.txt` → `merge that pr` → `gh pr merge`
- **Why it's wrong:** the user explicitly points at a pull request, and the history parser doesn't extract one from `gh pr view/checkout N`. The new `blanket: true` flag then drops the optional `{pr}` on purpose, so the "not guessing" refusal turns into a confident merge of a different PR.
- **Status:** this was already the behaviour before fix15 (checked against `7eb2ca7`). fix15's `blanket` path now makes it the intended outcome, and it breaks the "never a bare `gh pr merge` when a PR is named" rule.
- **Suggested fix:** when the reference words name an entity the intent uses ("that pr", "that branch"), add it to `keep` even when the refusal is blanket. Separately, extract `pr` entities from `gh pr <verb> N|branch|url`.

## Minor
- **`src/fill.js:50`, the `pr` immediately followed by a number rule:**
  - `merge pr 2 days old` → `gh pr merge 2`; `merge pr 3 times` → `gh pr merge 3`.
  - `merge pr 0`, `merge pr 007` and `merge PR 1e3` pass as-is. These fail safely in `gh`, but validation could reject `0` and non-integers.
- **`src/fill.js:32`:** `merge the pr for #12` → `12` and `merge pr for fix #12` → `gh pr merge fix`. Either "for" names the target or it doesn't; these two give contradictory results.
- **Intent, carried over:** after `npm install lodash`, `same but uninstall` → `npm install lodash` (the opposite action) and `uninstall it` → `python3 -m pip install <PKG>`. Also still open: `checkout pr 7` → `gh pr checks 7`; `merge pr 12 and 13` / `merge pr #12 and #13` merge only 12.
- **`src/history.js:637` (`PROP_OPT`):** the cluster class `[tPqGdSr]` is hand-maintained. Other valueless `systemd-run` flags such as `--user` are long options, so this is fine for now, but a comment pointing to the systemd-run man page would stop it drifting.

VERDICT: REQUEST_CHANGES
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

exec
/bin/bash -lc 'git status --short; git diff --check 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src bin scripts' in /workspace/tellsh
 succeeded in 0ms:
?? review/r17-claude.md
?? review/r17-codex.md

exec
/bin/bash -lc 'gh help environment' in /workspace/tellsh
 succeeded in 0ms:
`GH_TOKEN`, `GITHUB_TOKEN` (in order of precedence): an authentication token that will be used when
a command targets either `github.com` or a subdomain of `ghe.com`. Setting this avoids being prompted to
authenticate and takes precedence over previously stored credentials.

`GH_ENTERPRISE_TOKEN`, `GITHUB_ENTERPRISE_TOKEN` (in order of precedence): an authentication
token that will be used when a command targets a GitHub Enterprise Server host.

`GH_HOST`: specify the GitHub hostname for commands where a hostname has not been provided, or
cannot be inferred from the context of a local Git repository. If this host was previously
authenticated with, the stored credentials will be used. Otherwise, setting `GH_TOKEN` or
`GH_ENTERPRISE_TOKEN` is required, depending on the targeted host.

`GH_REPO`: specify the GitHub repository in the `[HOST/]OWNER/REPO` format for commands
that otherwise operate on a local repository.

`GH_EDITOR`, `GIT_EDITOR`, `VISUAL`, `EDITOR` (in order of precedence): the editor tool to use
for authoring text.

`GH_BROWSER`, `BROWSER` (in order of precedence): the web browser to use for opening links.

`GH_DEBUG`: set to a truthy value to enable verbose output on standard error. Set to `api`
to additionally log details of HTTP traffic.

`DEBUG` (deprecated): set to `1`, `true`, or `yes` to enable verbose output on standard
error.

`GH_PAGER`, `PAGER` (in order of precedence): a terminal paging program to send standard output
to, e.g. `less`.

`GLAMOUR_STYLE`: the style to use for rendering Markdown. See
<https://github.com/charmbracelet/glamour#styles>

`NO_COLOR`: set to any value to avoid printing ANSI escape sequences for color output.

`CLICOLOR`: set to `0` to disable printing ANSI colors in output.

`CLICOLOR_FORCE`: set to a value other than `0` to keep ANSI colors in output
even when the output is piped.

`GH_COLOR_LABELS`: set to any value to display labels using their RGB hex color codes in terminals that
support truecolor.

`GH_ACCESSIBLE_COLORS` (preview): set to a truthy value to use customizable, 4-bit accessible colors.

`GH_FORCE_TTY`: set to any value to force terminal-style output even when the output is
redirected. When the value is a number, it is interpreted as the number of columns
available in the viewport. When the value is a percentage, it will be applied against
the number of columns available in the current viewport.

`GH_NO_UPDATE_NOTIFIER`: set to any value to disable GitHub CLI update notifications.
When any command is executed, gh checks for new versions once every 24 hours.
If a newer version was found, an upgrade notice is displayed on standard error.

`GH_NO_EXTENSION_UPDATE_NOTIFIER`: set to any value to disable GitHub CLI extension update notifications.
When an extension is executed, gh checks for new versions for the executed extension once every 24 hours.
If a newer version was found, an upgrade notice is displayed on standard error.

`GH_CONFIG_DIR`: the directory where gh will store configuration files. If not specified,
the default value will be one of the following paths (in order of precedence):
  - `$XDG_CONFIG_HOME/gh` (if `$XDG_CONFIG_HOME` is set),
  - `$AppData/GitHub CLI` (on Windows if `$AppData` is set), or
  - `$HOME/.config/gh`.

`GH_PROMPT_DISABLED`: set to any value to disable interactive prompting in the terminal.

`GH_PATH`: set the path to the gh executable, useful for when gh can not properly determine
its own path such as in the cygwin terminal.

`GH_MDWIDTH`: default maximum width for markdown render wrapping.  The max width of lines
wrapped on the terminal will be taken as the lesser of the terminal width, this value, or 120 if
not specified.  This value is used, for example, with `pr view` subcommand.

`GH_ACCESSIBLE_PROMPTER` (preview): set to a truthy value to enable prompts that are
more compatible with speech synthesis and braille screen readers.

`GH_TELEMETRY`: set to `log` to print telemetry data to standard error instead of sending it.
Set to `false` or `0` to disable telemetry. Takes precedence over `DO_NOT_TRACK`.

`DO_NOT_TRACK`: set to `true` or `1` to disable telemetry. Ignored when
`GH_TELEMETRY` is set, which takes precedence.

`GH_SPINNER_DISABLED`: set to a truthy value to replace the spinner animation with
a textual progress indicator.

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {readFileSync,existsSync} from 'node:fs';
const src=readFileSync('scripts/real/prepare_real.js','utf8');
const body=src.slice(src.indexOf('function group(cmd)'),src.indexOf('// redaction placeholders'));
const group=Function('strip',body+'\\nreturn group;')(s=>s.trim().replace(/"'^(?:sudo |npx (?:-y )?|env '"\\w+=\\S+ )+/,''));
for(const c of ['npm install express','npm install react','pip install requests','pip install flask','systemctl restart nginx','systemctl restart apache'])console.log(c,'=>',group(c));
const p='build/real/rows.jsonl';
if(existsSync(p)){
const rows=readFileSync(p,'utf8').trim().split('\\n').map(JSON.parse);
const by=new Map();
for(const r of rows){let key;if(r.intent==='npm_install')key='npm_install';else if(r.intent==='pip_install')key='pip_install';else continue;const v=by.get(key)||{train:0,eval:0,groups:new Set()};v[r.split]++;v.groups.add(r.group);by.set(key,v);}
console.log('aggregate actual split',JSON.stringify([...by].map(([k,v])=>[k,{train:v.train,eval:v.eval,groups:v.groups.size}])));
}
JS" in /workspace/tellsh
 succeeded in 63ms:
npm install express => npm install express  #0
npm install react => npm install react  #0
pip install requests => pip install requests  #0
pip install flask => pip install flask  #0
systemctl restart nginx => systemctl restart nginx  #0
systemctl restart apache => systemctl restart apache  #0
aggregate actual split [["npm_install",{"train":96,"eval":36,"groups":16}],["pip_install",{"train":186,"eval":66,"groups":35}]]

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {readFileSync} from 'node:fs';
const rows=readFileSync('build/real/rows.jsonl','utf8').trim().split('\\n').map(JSON.parse);
for(const [label,re] of [['npm_install',/"'^npm (?:install|i) [a-z][a-z-]*$/],['"'pip_install',/"'^pip(?:3)? install [a-z][a-z-]*$/]]) {
const out={train:new Set(),eval:new Set()};
for(const r of rows)if(r.intent===label&&re.test(r.cmd))out[r.split].add(r.cmd);
console.log(label,'"'single bare package, no flags:',JSON.stringify({trainCommands:out.train.size,evalCommands:out.eval.size}));
}
JS" in /workspace/tellsh
 succeeded in 70ms:
npm_install single bare package, no flags: {"trainCommands":3,"evalCommands":1}
pip_install single bare package, no flags: {"trainCommands":10,"evalCommands":4}

exec
/bin/bash -lc "git show 0d87457cb7740ec6fa99db260b63b35cfdbb751c:src/pipeline.js | sed -n '101,138p'; nl -ba src/catalog.js | sed -n '280,290p'; nl -ba scripts/real/prepare_real.js | sed -n '114,142p'" in /workspace/tellsh
 succeeded in 0ms:
  const nameOf = (type) => exT.tagged[type]?.[0] ?? null;
  return { ex: merged, pattern, nameOf };
}

/**
 * Pure function used by the CLI, eval and tests.
 * opts: { shell, os, env, history: string[] (commands, oldest first), cwd, threshold, top, compose: 'auto'|'force'|'off',
 *         slotMode: 'merge'|'tagger'|'regex', model }
 */
export function suggest(query, opts = {}) {
  const model = opts.model || getModel();
  const env = opts.env || detectEnv({ shell: opts.shell, os: opts.os });
  const top = opts.top ?? 3;
  const thr = opts.threshold ?? model.thresholds.accept;
  const composeMode = opts.compose || 'auto';

  // ---- context (history + cwd), in memory only ----
  let ctx = null;
  if (opts.history?.length) {
    const quick = (q) => {
      const c = cascade(q, { model, extras: envFeatures(env) });
      if (c.confidence < thr) return null;
      return { intent: c.intent, slots: resolveWithTagger(c.intent, q, { model, tool: c.tool }).slots };
    };
    const kind = opts.historyKind || opts.history.kind || (env.shell === 'powershell' ? 'pwsh' : 'posix');
    ctx = buildContext(opts.history, { classify: quick, cwd: opts.cwd, kind });
  }
  const ctxFeats = ctx ? ctx.features : (opts.cwd ? cwdFlags(opts.cwd).map((c) => 'ctx_cwd=' + c) : []);
  const extras = [...envFeatures(env), ...ctxFeats];
  const ref = ctx ? resolveReference(query, ctx) : null;
  const context = ctx ? { used: true, commands: ctx.n, rule: ref?.rule || null, note: ref?.note || null } : { used: false };

  const base = { query, shell: env.shell, os: env.os, coreutils: env.coreutils, threshold: thr, context };

  // ---- rule: "same for X" reuses the previous intent with one slot replaced ----
  if (ref?.rule === 'same-for') {
    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], validHistorySlots(ref.slots)) });
    return { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
   280	  // ---------- GitHub CLI ----------
   281	  T('gh_auth_status', 'Show GitHub CLI login status', 'gh auth status', {}),
   282	  T('gh_auth_login', 'Log in to GitHub with the gh CLI', 'gh auth login', {}),
   283	  T('gh_pr_list', 'List pull requests of the repository', 'gh pr list', {}),
   284	  T('gh_pr_view', 'Show a pull request', 'gh pr view«{pr!raw}»', {}),
   285	  T('gh_pr_create', 'Create a pull request from the current branch', 'gh pr create --fill', {}, 'medium'),
   286	  T('gh_pr_checks', 'Show CI check status of a pull request', 'gh pr checks«{pr!raw}»', {}),
   287	  T('gh_pr_merge', 'Merge a pull request', 'gh pr merge«{pr!raw}»', {}, 'medium'),
   288	  T('gh_run_list', 'List recent GitHub Actions workflow runs', 'gh run list', {}),
   289	  T('gh_run_view', 'Show a GitHub Actions run (and its failed logs)', 'gh run view«{num!raw}»', {}),
   290	];
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

codex
- **Major — [src/history.js:793](/workspace/tellsh/src/history.js:793): PR history loses repository scope.** After `GH_REPO=other/repo gh pr view 45`, requesting `merge that pr` produces `gh pr merge 45`, with `missing=[]`. The assignment applied only to the previous command, so this can merge PR 45 in the wrong repository. Treat repository-scoping environment assignments like `--repo`: preserve the scope or withhold the selector.

- **Major — [src/fill.js:76](/workspace/tellsh/src/fill.js:76): Explicit repository qualifiers are silently discarded.** `merge pr 45 in repository other/repo` and `merge pr 45 --repo other/repo` both produce complete `gh pr merge 45` commands. The selector returns before validating the remaining qualification. Preserve the requested repository or return an incomplete suggestion.

- **Minor — [scripts/real/prepare_real.js:71](/workspace/tellsh/scripts/real/prepare_real.js:71): Training groups still include operand values.** `npm install express` and `npm install react` receive different groups because package names become “subcommands.” The existing dataset consequently splits identical command structures across training and evaluation: plain single-package npm installs have three training commands and one evaluation command. This defeats the documented command-structure holdout. Recognize actual subcommands before masking operands and regenerate the split.

Read-only validation: 18 of 23 selected test files passed; five failed with subprocess/output issues, including `spawnSync bash EPERM`. The runtime findings above were reproduced directly through `suggest()`. No files changed.

VERDICT: REQUEST_CHANGES
tokens used
149,395
- **Major — [src/history.js:793](/workspace/tellsh/src/history.js:793): PR history loses repository scope.** After `GH_REPO=other/repo gh pr view 45`, requesting `merge that pr` produces `gh pr merge 45`, with `missing=[]`. The assignment applied only to the previous command, so this can merge PR 45 in the wrong repository. Treat repository-scoping environment assignments like `--repo`: preserve the scope or withhold the selector.

- **Major — [src/fill.js:76](/workspace/tellsh/src/fill.js:76): Explicit repository qualifiers are silently discarded.** `merge pr 45 in repository other/repo` and `merge pr 45 --repo other/repo` both produce complete `gh pr merge 45` commands. The selector returns before validating the remaining qualification. Preserve the requested repository or return an incomplete suggestion.

- **Minor — [scripts/real/prepare_real.js:71](/workspace/tellsh/scripts/real/prepare_real.js:71): Training groups still include operand values.** `npm install express` and `npm install react` receive different groups because package names become “subcommands.” The existing dataset consequently splits identical command structures across training and evaluation: plain single-package npm installs have three training commands and one evaluation command. This defeats the documented command-structure holdout. Recognize actual subcommands before masking operands and regenerate the split.

Read-only validation: 18 of 23 selected test files passed; five failed with subprocess/output issues, including `spawnSync bash EPERM`. The runtime findings above were reproduced directly through `suggest()`. No files changed.

VERDICT: REQUEST_CHANGES
