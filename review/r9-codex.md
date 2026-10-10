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
session id: 01a1274e-97b8-7e12-bbf7-196bd387f592
--------
user
Re-review of tellsh (git diff 0d87457..HEAD; runtime src/ bin/, training scripts). History refs are intentionally limited to 1 line back. Read-only. Findings with severity and file:line. End with exactly one line 'VERDICT: APPROVE' (no blocker/major) or 'VERDICT: REQUEST_CHANGES'.
codex
I’ll review the diff and affected runtime and training paths, keeping everything read-only, and report actionable findings with severity and file references.
exec
/bin/bash -lc "pwd && rg --files -g 'AGENTS.md' -g '"'!node_modules'"' -g '"'!vendor'"' && git status --short && git diff --stat 0d87457..HEAD" in /workspace/tellsh
 exited 1 in 0ms:
/workspace/tellsh

exec
/bin/bash -lc "rg --files -g '"'!node_modules'"' -g '"'!vendor'"' -g '"'!package-lock.json'"' -g '"'!uv.lock'"' | head -150; for p in /AGENTS.md /workspace/AGENTS.md /workspace/tellsh/AGENTS.md; do if [ -f \""'$p" ]; then cat "$p"; fi; done' in /workspace/tellsh
 succeeded in 0ms:
LICENSE
test/regressions6.test.js
test/slot-cases.js
test/regressions3-render.test.js
test/regressions9.test.js
test/fixtures/parity.json
test/regressions.test.js
test/devtools.test.js
test/regressions5.test.js
test/parity.test.js
test/shells.test.js
test/regressions7.test.js
test/hybrid.test.js
test/regressions3-history.test.js
test/pipeline.test.js
test/danger.test.js
test/regressions2.test.js
test/regressions8.test.js
test/regressions4.test.js
test/cli.test.js
test/regressions3.test.js
test/compose.test.js
test/regressions10.test.js
test/slots.test.js
test/templates.test.js
README.md
data/eval_v04/devtools.jsonl
data/ood_eval.jsonl
data/intents/g06_teacher.jsonl
data/intents/g05.jsonl
data/intents/g00.jsonl
data/intents/g03.jsonl
data/intents/g08_devtools.jsonl
data/intents/g01.jsonl
data/intents/g04.jsonl
data/intents/g02.jsonl
data/intents/g07_hardneg.jsonl
data/blind/history.jsonl
data/blind/ood.jsonl
data/blind/compose.jsonl
data/blind/e2e.jsonl
data/blind/intents.jsonl
data/teacher/ood_rejected.jsonl
data/teacher/decisions.jsonl
data/teacher/hardneg_rejected.jsonl
data/teacher/hardneg_boost.jsonl
data/teacher/label_summary.json
data/teacher/ledger.json
data/teacher/hardneg_summary.json
data/teacher/verify_summary.json
data/teacher/review.jsonl
data/teacher/label_rejected.jsonl
data/compose/eval.jsonl
data/shell/train.jsonl
data/shell/eval.jsonl
data/hybrid/blind/blind_en.jsonl
data/hybrid/blind/blind_pl.jsonl
data/hybrid/blind/blind_ood.jsonl
data/ood.jsonl
data/eval_baseline_v0.2.json
data/history/eval.jsonl
data/tldr/README.md
data/tldr/tools.jsonl
data/tldr/flags.jsonl
data/eval/e00.jsonl
data/eval/e01.jsonl
data/eval/e02.jsonl
data/slots/gold.jsonl
data/ood_teacher.jsonl
data/candidates/paraA.jsonl
data/candidates/paraB.jsonl
data/candidates/ood_new.jsonl
model/compose_explained.json
model/model.bin
model/tldr_triggers.json
hybrid/results/quant.json
hybrid/results/enc_export_report.json
hybrid/results/bench.json
hybrid/results/policy.json
hybrid/results/v04_bench_before.json
hybrid/results/v04_before.json
hybrid/results/v04_real_stats.json
hybrid/results/sizes.json
hybrid/results/prune_report.json
hybrid/results/results.json
hybrid/results/zeroshot.jsonl
hybrid/results/v04_after_ft.json
hybrid/results/v04_policy.json
hybrid/results/v04_bench_before_real.json
hybrid/results/results_ft.json
hybrid/results/v04_after.json
hybrid/results/v04_enc_export_report.json
hybrid/results/v04_before_ft.json
hybrid/results/v04_bench_after_real.json
hybrid/results/v04_bench_after.json
hybrid/results/policy_ft.json
hybrid/results/v04_policy_ft.json
hybrid/package/tellsh-model-enc/README.md
hybrid/package/tellsh-model-enc/package.json
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
src/tagger.js
src/tools.js
src/render.js
src/danger.js
src/variants.js
src/compose.js
src/cli.js
src/rerank/tokenizer.js
src/rerank/hybrid.js
src/rerank/encoder.js
bin/tellsh.js
HYBRID.md
EVAL.md
review/r1-codex.md
review/r6-codex.md
review/r5-codex.md
review/fix4-log.md
review/r4-claude.md
review/r9-codex.md
review/STATUS
review/fix8-log.md
review/r2-claude.md
review/fix7-log.md
review/fix5-log.md
review/r1-claude.md
review/fix3-log.md
review/r8-codex.md
review/r9-claude.md
review/r2-codex.md
review/r7-codex.md
review/r8-claude.md
review/r7-claude.md
review/r5-claude.md
review/r4-codex.md
review/hybrid-log.md
review/r6-claude.md
review/fix2-log.md
review/fix4b-log.md
review/r3-claude.md
review/r3-codex.md

exec
/bin/bash -lc 'git status --short; git diff --stat 0d87457..HEAD; git diff --name-only 0d87457..HEAD' in /workspace/tellsh
 succeeded in 0ms:
?? review/r9-claude.md
?? review/r9-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   428 +-
 HYBRID.md                                    |   596 ++
 README.md                                    |   152 +-
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
 review/.f1done                               |     0
 review/.f4bdone                              |     0
 review/.f5done                               |     0
 review/.f8done                               |     0
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
 review/fix8-log.md                           |    48 +
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
 review/r8-claude.md                          |    54 +
 review/r8-codex.md                           |  9340 ++++++++++++++++++++++
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
 scripts/hybrid/train_a_dev.sh                |    30 +
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
 src/danger.js                                |   490 +-
 src/fill.js                                  |    85 +-
 src/history.js                               |   861 +-
 src/model.js                                 |    22 +-
 src/pipeline.js                              |   421 +-
 src/render.js                                |    96 +-
 src/rerank/encoder.js                        |   152 +
 src/rerank/hybrid.js                         |   109 +
 src/rerank/tokenizer.js                      |    92 +
 src/shellwords.js                            |    93 +-
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
 test/regressions10.test.js                   |   145 +
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
 165 files changed, 112648 insertions(+), 801 deletions(-)
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
review/.f8done
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
review/fix8-log.md
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
review/r8-claude.md
review/r8-codex.md
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
/bin/bash -lc 'git diff 0d87457..HEAD -- src/pipeline.js src/cli.js bin/tellsh.js src/model.js src/fill.js src/render.js' in /workspace/tellsh
exec
/bin/bash -lc 'cat package.json; cat review/fix8-log.md; cat review/r8-claude.md; cat test/regressions10.test.js' in /workspace/tellsh
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
I've fixed every finding in `review/r8-claude.md` and `review/r8-codex.md`, each with regression tests, and committed it all as `07ea182` on `master`. All 314 tests pass, and nothing was pushed or published. History still reads only the previous command.

**The Major you singled out: quoted arguments**
- After the first argument, an argument with a space is now a value only if:
  - it starts like a path (`"/tmp/my data"`), or
  - it looks like a file name, its first word isn't a request word, and every space comes after the last `/` (`"My Notes.txt"`, `"data/my notes.txt"`).
- Everything else gets a placeholder plus a warning, including the history copy:
  - `delete "folder /tmp/x"` → `rm -r <PATH>`
  - `delete "the file notes.txt"` → `rm <FILE>`
  - `usuń "plik raport.pdf"` → `rm <FILE>`
  - `delete "all files in /tmp/x"` → `find <PATH> …`
  - `delete "My Notes.txt"` stays `rm 'My Notes.txt'`.
- **Side effect:** `delete "my data/a.txt"` is now unclear too, because the space comes before the `/`. That follows your rule, but it was a value before.

**The two Majors from codex**
- **Commands aimed at another repo or daemon:** after `git -C /repo blame notes.txt`, `docker --context prod logs web`, `docker -H …` or `DOCKER_HOST=…`, "delete it", "stop it" and "same for api" are refused. Two older tests that expected `docker stop web` and `git branch -d feature/x` in that situation now expect a refusal.
- **Calibration leak:** the shadow model used to calibrate the hybrid (A_dev) now excludes the dev split from every training source, including the out-of-domain, tldr and anaphora rows.
  - Before, all 23 out-of-domain dev sentences were in A_dev's training data; now none are. The shipped model's data still contains all 23, as it should.
  - I rebuilt A_dev and recalibrated A+B. Its threshold moved from 0.8 to 0.9 and its mixing weight from 0.75 to 0.5.

**Minor findings**
- After `python3 script.py data.csv`, "delete it" gives a placeholder; the script and its argument both count as operands.
- With bash history, an identical last `tellsh` line is no longer dropped, since bash writes the call only after it runs.
- `dd of=`, `cp`/`install`/`mv`/`ln -f` onto a system file, `perl -i` on one and `chmod 000` of one are now critical. Copying into a system directory (`cp x.service /etc/systemd/system/`) and plain `chmod 644` are not.
- A quoted unclear argument now also blanks name, service, container and package slots. In practice these slots never take such values yet, so this is defensive and tested directly.

**Results**
- **Main model (A):** unchanged. The eval output is identical (history dev set 92.5%).
- **Hybrid A+B:**

| | Before | After |
|---|---|---|
| Real usage | 88.3% | 88.8% |
| End-to-end exact command (relexicalised `data/eval`) | 85.4% | 86.3% |
| `data/eval` | 96.8% | 96.7% |
| Shell-phrased eval | 98.5% | 98.2% |
| v0.4 devtools set | 97.9% | 97.6% |
| Out-of-domain rejection | unchanged | unchanged |

  The reviewer's typo example `clnoe https://github.com/sharkdp/bat` gives `git clone` again.
- EVAL.md, HYBRID.md (including the reproduce steps), README and the results files are updated.

**Things to check**
- **Hybrid is slower on real usage:** A+B now hands more requests to the encoder (42% of real-usage rows, up from 31%). Warm p50 goes from 1.3 to 7.2 ms, cold from 240 to 401 ms.
- **The tiny-LM reranker (C) was rescored, not retrained.** Its scores were tied to the old A_dev, so I recomputed them on CPU with the same model. Matching the original run needed `--dtype bfloat16`; scores still differ slightly from the old ones because of batch padding. A+C moved from 0.9 to 0.8 and now covers every dev row. C isn't shipped.
- **The A bench ran on a noisier machine:** bare `node` startup went from 83 to 112 ms. tellsh's own cold overhead is unchanged at about 93 ms, and README shows the new numbers.
- **Not covered:** podman containers were never read from history, so the podman part of the scope fix has no visible effect yet.
- **Commit identity:** git has no identity configured, so I committed as `lksrz <lukasz@wearfits.com>`, matching earlier commits. The untracked `review/fix8-log.md` was left out.
# tellsh round 8 re-review (`0d87457..HEAD`, at `f4bff45`)

All 306 tests pass. I ran about 55 extra cases against the CLI, `suggest()` and `checkDanger()`. Nothing in the repo was changed; my scratch files are in `/tmp`.

**Round 7 findings: all fixed.**
- **Quoted request text as the first argument:** `tellsh "delete folder" /tmp/x` gives `rm -r /tmp/x`, and `"usuń katalog" build` gives `rm -r build`.
- **Unclear quoted argument:** `delete folder "my data"` gives `rm -r <PATH>` with a warning.
- **Current call matched too loosely:** the `tellsh show it delete it` case no longer reads two lines back.
- **Several operands:** `touch a.txt b.txt` or `mkdir -p /tmp/a /tmp/b`, then "delete them", gives a placeholder.
- **`cat a.txt; cd /srv`, then "delete it":** refused.
- **"move it there":** refused with a note.
- **System files:** `rm`, `unlink`, `shred`, `sed -i`/`--in-place=` and `tee` (without `-a`) on `/etc/passwd` are critical, including through `sudo sh -c`.
- **npm packages:** scoped packages are kept, and `@types/node;rm` gives `<PKG>`.

**One-line history:** apart from the nit in finding 4, no value from two lines back was used.

## Findings

### Major
1. **A quoted argument that mixes request words with a path or file name still becomes one path** (`src/shellwords.js:187`, `:208`).
   - After the first argument, any argument containing a space plus a `/` or a `.ext` is treated as one value. That happens even when most of it is request text:
     - `tellsh delete "folder /tmp/x"` gives `rm -r 'folder /tmp/x'`.
     - `tellsh delete "the file notes.txt"` gives `rm 'the file notes.txt'`.
     - `tellsh usuń "plik raport.pdf"` gives `rm 'plik raport.pdf'`.
     - `tellsh delete "all files in /tmp/x"` gives `find 'all files in /tmp/x' -type f -iname <GLOB> -delete`.
   - The history copy reads it the same way: `tellsh delete "folder /tmp/x"` in history, then "show it", gives `ls -lah 'folder /tmp/x'`.
   - These are complete, high-risk commands with no placeholder or warning, so they are the same kind of problem as the round 7 Major, in a case that fix doesn't cover. In practice the joined path rarely exists, so the command usually just fails.
   - **Suggested fix:** treat an argument after the first as a value only when it starts like a path (`PATH_START`). Mark it unclear, so it becomes a placeholder plus a warning, when it has `PATH_FORM` but its first word is a stop word or request word (the, all, file, folder, plik, katalog, …), or when the space comes before the `/`.
   - **Tests to add:** `["delete", "folder /tmp/x"]`, `["delete", "the file notes.txt"]`, and `["delete", "My Notes.txt"]` (this one should stay a value).

### Minor
2. **Only the script counts as "it" after running a script** (`src/history.js:723`).
   - After `python3 script.py data.csv`, "delete it" gives `rm script.py`.
   - "It" could just as well mean the data file. With more than one operand this should go through `oneOf`, giving a placeholder, the same as `touch a b`.
3. **The danger checker is still inconsistent on system files** (`src/danger.js:277`, `sysFileWriteCheck`). This was already true at the base commit, and these commands are only reachable by editing at the confirm prompt.
   - `dd if=/dev/zero of=/etc/passwd` is rated **safe**, and `sudo dd … of=/boot/vmlinuz` only medium.
   - `cp /tmp/x /etc/passwd`, `install … /etc/passwd`, `perl -pi -e … /etc/passwd` and `chmod 000 /etc/passwd` are high but not critical, while `tee /etc/passwd` is critical.
   - **Suggested fix:** add `dd of=`, plus `cp`, `install` and `mv` with a system-file destination, to `sysFileWriteCheck`.
4. **Nit: an identical earlier `tellsh` call is dropped as if it were the running one** (`src/history.js:771`).
   - In bash the running command isn't written to the history file first. With history `['cat secret.txt', 'tellsh delete it']`, running `tellsh delete it` again drops the earlier call and resolves to `rm secret.txt`, two lines back.
   - Mostly harmless, since the same request on the same history means the same thing. But dropping the last line could be limited to shells that write the call before it runs (zsh, fish, PSReadLine), since `env.shell` is known.
5. **An unclear argument is only checked against path slots** (`src/pipeline.js`, the `unclearArgs` loop).
   - `tellsh kill process "node server"` happens to give `pkill -f <NAME>`. But a `name`, `service` or `container` slot taken from part of an unclear argument isn't blanked, which only works because these values can't contain spaces.
   - Worth applying the same `partOf` check to the other non-safe operand slots.

### Training, data and eval
- `export_data.js` now filters every emitted row against the held-out index, and B was retrained.
- C (the tiny-LM reranker) is still trained on the leaky data. HYBRID.md says so, and C isn't shipped, so that's acceptable.
- `fetch_model.js` now checks that the manifest lists exactly the bundle files with checksums, and verifies everything before writing anything. That looks correct.
- The `rerankTop` change makes A+B independent of `--top`. Shown candidates are cut back to `top`.

The verdict is REQUEST_CHANGES because of the Major finding.

VERDICT: REQUEST_CHANGES
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
diff --git a/src/fill.js b/src/fill.js
index f9849d0..3d6238c 100644
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
 
@@ -19,13 +19,17 @@ export const RAW_OK = {
   var: (v) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(String(v)),
   minutes: (v) => /^\d{1,7}$/.test(String(v)),
   sizeBytes: (v) => /^\d{1,16}$/.test(String(v)),
+  start: (v) => /^\d{1,9}$/.test(String(v)) && +v > 0,
+  end: (v) => /^\d{1,9}$/.test(String(v)) && +v > 0,
+  num: (v) => /^\d{1,12}$/.test(String(v)),
 };
 
 const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
 const PLACEHOLDER = (name) => `<${name.toUpperCase()}>`;
 
 // sed needs regex-escaped search text and &,\,/ escaped replacement
-const sedEscapeOld = (s) => s.replace(/[\\/.*^$[\]]/g, '\\$&');
+// (a newline would end the s command: written as \n, which never matches inside one line)
+const sedEscapeOld = (s) => s.replace(/[\\/.*^$[\]]/g, '\\$&').replace(/\n/g, '\\n');
 const sedEscapeNew = (s) => s.replace(/[\\/&]/g, '\\$&').replace(/\n/g, '\\n');
 
 /** Recompute derived slots after values were merged/overridden (tagger, history rules). */
@@ -40,9 +44,24 @@ export function finalizeSlots(intent, v) {
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
@@ -91,12 +110,25 @@ export function resolveSlots(intent, ex) {
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
@@ -143,7 +175,7 @@ function renderValue(name, raw, values, quote) {
   let val = values[name];
   if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
   if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
-  return quote(val);
+  return quote(val, { tilde: PATH_SLOTS.has(name), name });
 }
 
 const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;
@@ -152,7 +184,7 @@ const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|d
  * Fill a template. Returns { command, missing[] }.
  * `values` = resolved slots merged over intent defaults.
  */
-export function render(template, values, required = [], quote = shQuote) {
+export function render(template, values, required = [], quote = shQuote, keepOptional = []) {
   const missing = [];
   const isSlot = (name) => name in values || required.includes(name) || SLOT_NAMES.test(name);
   // Single pass over the template: every {slot} and «optional segment» is substituted exactly once and
@@ -163,6 +195,9 @@ export function render(template, values, required = [], quote = shQuote) {
       const r = seg.replace(/\{(\w+)(!raw)?\}/g, (m2, n2, raw2) => {
         if (!ok) return m2;
         const val = renderValue(n2, !!raw2, values, quote);
+        // an operand the request named but that is not valid (keepOptional) keeps its placeholder: the optional part
+        // is not silently dropped (`npm install <PKG>`, never `npm install`)
+        if (val == null && keepOptional.includes(n2)) { missing.push(n2); return PLACEHOLDER(n2); }
         if (val == null) { ok = false; return m2; }
         return val;
       });
@@ -209,7 +244,7 @@ export const envFromPlatform = (platform = process.platform) => ({
  *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
  * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}
  */
-export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given } = {}) {
+export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [], keepOptional = [] } = {}) {
   const intent = BY_ID[intentId];
   if (!intent) throw new Error(`unknown intent ${intentId}`);
   const e = env || envFromPlatform(platform);
@@ -218,8 +253,14 @@ export function buildCommand(intentId, text, { platform = process.platform, env,
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
@@ -229,20 +270,38 @@ export function buildCommand(intentId, text, { platform = process.platform, env,
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
index c5430f7..3488e5e 100644
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
@@ -32,17 +34,62 @@ const PRONOUN_VALUE = /^(it|its|that|this|them|those|one|again|back|there|here|t
 
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
+  pkg: (v) => WORDISH(v) || /^@[\w.-]{1,64}\/[\w.-]{1,64}(?:@[\w.^~<>=*-]{1,32})?$/.test(v),
   branch: (v) => /^(?!-)[\w./-]{1,100}$/.test(v), user: (v) => /^[a-z_][\w.-]{0,31}$/i.test(v),
   glob: (v) => /^\*\.[\w]{1,8}$/.test(v),
   url: (v) => v.length < 2048 && (/^(?:https?|ftp|ftps|ssh|git|file):\/\/[^\s/?#]*[^\s]*$/i.test(v) || /^(?!-)[\w.-]+@[\w.-]+:[^\s]+$/.test(v)),
   host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
   pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
+  old: (v) => v.length > 0 && v.length < 300 && !/[\n\r\0]/.test(v), new: (v) => v.length < 300 && !/[\n\r\0]/.test(v),
 };
-for (const k of ['file', 'src', 'dst', 'dest', 'archive']) VALID_SLOT[k] = VALID_SLOT.path;
+const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
+// slots naming the one thing a command acts on, other than a path (not free text: pattern, message, glob, ...)
+const OPERAND_SLOT_NAMES = new Set(['name', 'service', 'container', 'pkg', 'host', 'target', 'branch', 'user', 'script', 'url', 'pid']);
+for (const k of PATH_SLOT_NAMES) if (k !== 'path') VALID_SLOT[k] = VALID_SLOT.path;
 export function validSlot(k, v) {
   if (v == null || v === '') return false;
   if (isAmbiguous(v)) return false;
@@ -52,31 +99,108 @@ export function validSlot(k, v) {
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
+  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user']) {
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
@@ -90,22 +214,35 @@ function flagTokens(cmd) {
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
@@ -113,17 +250,26 @@ export function suggest(query, opts = {}) {
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
@@ -134,29 +280,68 @@ export function suggest(query, opts = {}) {
 
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
+    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank });
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
@@ -169,73 +354,229 @@ export function suggest(query, opts = {}) {
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
+    for (const k of refDst ? [] : ref.blank || []) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
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
+        if (slots[k] == null && usesSlot(it, k)) blank.add(k);
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
+    for (const k of withheld) blank.add(k);
+    if (withheld.length) { context.rule = 'refused'; context.note = `previous ${sb.lastIntent} has ${withheld.join(', ')} that depends on the shell state or is not a valid value; not guessing`; }
     finalizeSlots(it, slots);
   }
-  let b = buildCommand(intent, query, { env, resolved: slots });
-  // implicit reference: a required slot is still missing and the history has a value of that type
-  if (ctx && b.missing.length && ref?.rule !== 'refused') {
+  let b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: r.invalidOperands });
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
+      b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: r.invalidOperands });
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

exec
/bin/bash -lc 'cat src/cli.js; cat src/rerank/hybrid.js; cat src/rerank/encoder.js; cat src/rerank/tokenizer.js' in /workspace/tellsh
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
/bin/bash -lc 'cat src/history.js' in /workspace/tellsh
 succeeded in 0ms:
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
      if (cmds.length) return Object.assign(cmds.slice(-n), { kind: kind === 'pwsh' ? 'pwsh' : 'posix', shell: kind });
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

// template inversion: catalog/variant template -> regex that recovers intent + slot values from a command
const BT = '`';
// The alternatives must never overlap, or matching a long run of \\ or '' against a template that
// does not fit backtracks exponentially: a backslash is only ever consumed by `\\.`, and a quoted
// PowerShell string cannot end right before another quote (`''''` is one string, not two).
const WORD_RE = {
  posix: String.raw`((?:'[^']*'|"(?:\\.|[^"\\])*"|\\.|[^\s'"\\;&|<>()])+)`,
  pwsh: `((?:['‘-‛](?:[^'‘-‛]|['‘-‛]{2})*['‘-‛](?!['‘-‛])|["“-„](?:${BT}.|["“-„]{2}|[^"“-„${BT}])*["“-„](?!["“-„])|${BT}.|[^\\s'"‘-„${BT};|(){}<>])+)`,
};
let INV = null;
function inverters() {
  if (INV) return INV;
  INV = [];
  const add = (id, tpl) => {
    if (typeof tpl !== 'string') return;
    const names = [];
    const raws = [];
    const src = { posix: '', pwsh: '' };
    for (const part of tpl.split(/(«[^»]*»)/)) {
      const opt = part.startsWith('«');
      const body = opt ? part.slice(1, -1) : part;
      const rx = { posix: '', pwsh: '' };
      for (const piece of body.split(/(\{\w+(?:!raw)?\})/)) {
        const m = piece.match(/^\{(\w+)(!raw)?\}$/);
        for (const k of ['posix', 'pwsh']) {
          if (m) rx[k] += !m[2] ? WORD_RE[k] : m[1] === 'age' ? '(-m(?:min|time) -\\d+)' : '([\\w.+=-]+)';
          else rx[k] += piece.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        if (m) { names.push(m[1]); raws.push(!!m[2]); }
      }
      for (const k of ['posix', 'pwsh']) src[k] += opt ? `(?: ${rx[k]})?` : rx[k];
    }
    try { INV.push({ id, re: { posix: new RegExp(`^${src.posix}$`), pwsh: new RegExp(`^${src.pwsh}$`) }, names, raws }); } catch { /* skip */ }
  };
  for (const it of INTENTS) {
    add(it.id, it.template);
    add(it.id, it.darwin);
    const v = VARIANTS[it.id] || {};
    for (const k of ['bsd', 'gnuMac', 'busybox', 'zsh', 'fish']) add(it.id, v[k]);
    if (v.pwsh) for (const t of typeof v.pwsh === 'object' ? [v.pwsh.win, v.pwsh.unix] : [v.pwsh]) add(it.id, t);
  }
  return INV;
}

function invert(cmd, kind = 'posix') {
  for (const { id, re, names, raws } of inverters()) {
    const m = cmd.match(re[kind]);
    if (!m) continue;
    const slots = {};
    let ambiguous = false;
    names.forEach((n, i) => {
      const rv = m[i + 1];
      if (rv == null) return;
      if (raws[i]) { slots[n] = rv; return; }
      const v = decodeWord(rv, kind);
      if (v == null || isExpansion(v) || (isGlob(v) && !GLOB_SLOTS.has(n))) { ambiguous = true; slots[n] = AMB + rv; return; }
      slots[n] = rawOf(v);
    });
    if (slots.namepat && !slots.name && !isAmbiguous(slots.namepat)) slots.name = slots.namepat.replace(/^\*|\*$/g, '');
    return { intent: id, slots, ambiguous };
  }
  return null;
}

const FILE_HEADS = new Set(['cat', 'less', 'more', 'head', 'tail', 'vim', 'vi', 'nvim', 'nano', 'code', 'stat', 'file', 'wc',
  'sha256sum', 'md5sum', 'shasum', 'md5', 'touch', 'open', 'bat', 'chmod', 'chown', 'source', 'python', 'python3', 'node', 'bash', 'sh', 'unzip', 'gzip', 'gunzip', 'xdg-open']);
const DIR_HEADS = new Set(['cd', 'ls', 'du', 'find', 'tree', 'mkdir', 'rmdir', 'pushd', 'ncdu']);
// heads whose arguments are never file references (no stale-reference invalidation for them)
const INERT_HEADS = new Set(['echo', 'printf', 'man', 'which', 'whereis', 'type', 'history', 'clear', 'exit', 'export', 'alias', 'unalias',
  'npm', 'npx', 'yarn', 'pnpm', 'make', 'cargo', 'go', 'pip', 'pip3', 'apt', 'apt-get', 'brew', 'tellsh', 'true', 'false', 'date', 'sleep',
  'write-host', 'write-output', 'get-help', 'get-command', 'set-psreadlineoption', 'clear-host', 'cls']);
const DOCKER_CT = new Set(['logs', 'exec', 'stop', 'start', 'restart', 'rm', 'inspect', 'attach', 'kill', 'top', 'port', 'pause', 'unpause']);
const DOCKER_VAL_FLAGS = new Set(['--tail', '-n', '--since', '--until', '-e', '--env', '-u', '--user', '-w', '--workdir', '-t', '--time', '-s', '--signal']);
const DOCKER_INTENT = { logs: 'docker_logs', stop: 'docker_stop', exec: 'docker_exec' };
const SYSTEMCTL_INTENT = { status: 'service_status', restart: 'service_restart', stop: 'service_stop', start: 'service_start', enable: 'service_enable' };

// PowerShell cmdlets and their aliases -> what their target argument is
const PS_NATIVE = {
  'get-content': 'file', gc: 'file', type: 'file', 'get-filehash': 'file', 'select-string': 'file', 'expand-archive': 'file', 'set-content': 'file', 'add-content': 'file', 'out-file': 'file',
  'get-item': 'path', gi: 'path', 'get-itemproperty': 'path', 'invoke-item': 'path', ii: 'path', 'rename-item': 'path', rni: 'path', 'test-path': 'path',
  'remove-item': 'remove', ri: 'remove', del: 'remove', erase: 'remove', rd: 'remove',
  'set-location': 'dir', sl: 'dir', chdir: 'dir', 'push-location': 'dir', 'get-childitem': 'dir', gci: 'dir', dir: 'dir',
  'copy-item': 'copy', cpi: 'copy', copy: 'copy', 'move-item': 'copy', mi: 'copy', move: 'copy', 'new-item': 'new', ni: 'new',
  'stop-process': 'proc', spps: 'proc', 'get-process': 'proc', gps: 'proc',
  'stop-service': 'service', 'start-service': 'service', 'restart-service': 'service', 'get-service': 'service', gsv: 'service', 'set-service': 'service',
  'test-connection': 'host', 'test-netconnection': 'host', 'resolve-dnsname': 'host',
  'invoke-webrequest': 'url', iwr: 'url', 'invoke-restmethod': 'url', irm: 'url',
};
const PS_SERVICE_INTENT = { 'stop-service': 'service_stop', 'start-service': 'service_start', 'restart-service': 'service_restart', 'get-service': 'service_status' };
const PS_VALUE_PARAMS = new Set(['path', 'literalpath', 'lp', 'pspath', 'name', 'id', 'processname', 'computername', 'targetname', 'uri', 'destination',
  'destinationpath', 'totalcount', 'tail', 'head', 'first', 'last', 'encoding', 'filter', 'include', 'exclude', 'itemtype', 'type', 'algorithm', 'value',
  'newname', 'pattern', 'count', 'depth', 'outfile', 'method', 'erroraction', 'ea', 'port', 'delimiter', 'readcount', 'stream', 'credential', 'displayname']);

function psArgs(args) {
  const named = {};
  const pos = [];
  const sw = new Set();
  for (let i = 0; i < args.length; i++) {
    const m = String(args[i]).match(/^-([A-Za-z]\w*)(?::(.+))?$/);
    if (!m) { pos.push(args[i]); continue; }
    const p = m[1].toLowerCase();
    if (m[2] != null) named[p] = m[2];
    else if (PS_VALUE_PARAMS.has(p) && args[i + 1] != null) named[p] = args[++i];
    else sw.add(p);
  }
  return { named, pos, sw };
}

const typeByExt = (p) => (/\.\w{1,5}$/.test(rawOf(p)) ? 'file' : 'dir');

/**
 * mv/cp/ln (Move-Item/Copy-Item) SRC... DST: "it" afterwards is the moved/copied item, which is DST
 * itself only when DST names the new file (`mv a.txt b.txt`). When DST is a directory the item now
 * lives somewhere inside it, so neither DST nor SRC is a safe "it": both types become ambiguous.
 */
function destEnts(srcs, dst, ents) {
  const d = rawOf(dst);
  if (!isAmbiguous(dst) && srcs.length === 1 && typeByExt(srcs[0]) === 'file' && typeByExt(d) === 'file' && !/[\\/]$/.test(d)) {
    ents.file ??= dst;
    return;
  }
  ents.file ??= AMB + d;
  ents.dir ??= AMB + d;
}

// options that take a value, per command (so `kill -s 9 4242` or `pkill nginx -u bob` pick the right word)
const VALUE_OPTS = {
  kill: new Set(['-s', '-n', '--signal']),
  pkill: new Set(['-u', '-U', '-g', '-G', '-P', '-s', '-t', '-F', '--signal', '--euid', '--uid', '--group', '--pgroup', '--parent', '--session', '--terminal', '--pidfile', '--ns', '--nslist']),
  killall: new Set(['-u', '--user', '-s', '--signal', '-o', '--older-than', '-y', '--younger-than', '-n', '--ns', '-Z', '--context']),
  pidof: new Set(['-o', '--omit-pid']),
  grep: new Set(['-e', '--regexp', '-f', '--file', '-m', '--max-count', '-A', '-B', '-C', '--include', '--exclude', '--exclude-dir', '--label', '--color', '-d', '-D']),
  checkout: new Set(['-b', '-B', '--orphan', '--conflict', '--pathspec-from-file']),
  switch: new Set(['-c', '-C', '--create', '--force-create', '--orphan', '--conflict']),
  mv: new Set(['-t', '--target-directory', '-S', '--suffix']),
};
VALUE_OPTS.pgrep = VALUE_OPTS.pkill;
VALUE_OPTS.cp = VALUE_OPTS.mv;
VALUE_OPTS.ln = VALUE_OPTS.mv;
VALUE_OPTS.rg = VALUE_OPTS.grep;

/** -> { pos: positional args, opts: {opt: value}, flags: [options without value], after: args after `--` } */
function parseArgs(args, valueOpts = new Set()) {
  const pos = [];
  const opts = {};
  const flags = [];
  let after = null;
  for (let i = 0; i < args.length; i++) {
    const a = String(args[i]);
    if (a === '--') { after = args.slice(i + 1); pos.push(...after); break; }
    if (/^--[^=]+=/.test(a)) { opts[a.replace(/=.*$/s, '')] = a.slice(a.indexOf('=') + 1); continue; }
    if (valueOpts.has(a)) { opts[a] = args[i + 1]; i++; continue; }
    // attached short value: -uroot, -tDIR
    if (/^-[A-Za-z]./.test(a) && valueOpts.has(a.slice(0, 2)) && !/^--/.test(a)) { opts[a.slice(0, 2)] = a.slice(2); continue; }
    if (/^-./.test(a)) { flags.push(a); continue; }
    pos.push(args[i]);
  }
  return { pos, opts, flags, after };
}

// VAR=x prefixes and wrapper commands (sudo -u root, env, command, nice -n 5, timeout 5, ...) removed: the command that runs.
// Returns `w` itself when there is nothing to remove.
function unwrap(w) {
  let i = 0;
  while (i < w.length && /^\w+=/.test(w[i])) i++;
  if (i < w.length && isAmbiguous(w[i])) return i ? w.slice(i) : w;
  const r = commandWords(w.map(String));
  return r.length === w.length ? w : w.slice(w.length - r.length);
}

const CD_HEADS = new Set(['cd', 'pushd', 'popd', 'chdir', 'set-location', 'sl', 'push-location', 'pop-location']);
// a path that depends on the working directory (stale once the directory changes)
export const isRelativePath = (v) => {
  const s = rawOf(String(v));
  return !/^(?:[~/\\]|[A-Za-z]:[\\/]|\$HOME\b|\$\{HOME\}|\$env:|%USERPROFILE%)/i.test(s);
};
const PATH_SLOT_KEYS = ['path', 'file', 'src', 'dst', 'dest', 'archive'];
/** Mark working-directory-relative file/dir values as ambiguous (the cwd changed after they were used). */
function staleRelative(ents, slots) {
  for (const t of ['file', 'dir']) if (ents[t] != null && !isAmbiguous(ents[t]) && isRelativePath(ents[t])) ents[t] = AMB + ents[t];
  if (slots) for (const k of PATH_SLOT_KEYS) if (slots[k] != null && !isAmbiguous(slots[k]) && isRelativePath(slots[k])) slots[k] = AMB + slots[k];
}

// output/input redirection operator words (splitCommand keepRedirects): `>`, `2>>`, `&>`, `>|`, `<`, `>&`
const REDIR_TARGET_OP = /^\d*(?:[<>]{1,2}[&|]?|&>>?)$/;
const REDIR_DUP_OP = /^\d*[<>]+&[\d-]+$/;

/** PowerShell native commands. Returns true when the head was recognised. */
function psNative(head, args, ents, setIntent) {
  const kind = PS_NATIVE[head];
  if (!kind) return false;
  const { named, pos, sw } = psArgs(args);
  const path = named.literalpath ?? named.lp ?? named.path ?? named.pspath ?? pos[0];
  if (kind === 'file' && path != null) ents.file ??= path;
  else if (kind === 'path' && path != null) ents[typeByExt(path)] ??= path;
  else if (kind === 'dir' && path != null) {
    if (ents.dir == null) {
      ents.dir = path;
      // Get-ChildItem DIR -Filter/-Include/-Exclude/-Recurse (or DIR *.tmp): the matches live inside DIR
      if (!['set-location', 'sl', 'chdir', 'push-location'].includes(head) &&
          (named.filter != null || named.include != null || named.exclude != null || pos[1] != null || [...sw].some((x) => x.length >= 2 && 'recurse'.startsWith(x)))) ents.searchDir = true;
      else if (!['set-location', 'sl', 'chdir', 'push-location'].includes(head)) ents.listDir = true;
    }
  }
  else if (kind === 'dir' && !['set-location', 'sl', 'chdir', 'push-location'].includes(head)) {
    // Get-ChildItem without a path lists the working directory
    ents.listCwd = named.filter != null || named.include != null || named.exclude != null || [...sw].some((x) => x.length >= 2 && 'recurse'.startsWith(x)) ? 'search' : 'list';
  }
  else if (kind === 'remove' && path != null) ents[[...sw].some((s) => 'recurse'.startsWith(s)) ? 'dir' : typeByExt(path)] ??= path;
  else if (kind === 'copy') { const d = named.destination ?? pos[1]; if (d != null) destEnts(path != null ? String(path).split(',') : [], d, ents); }
  else if (kind === 'new' && path != null) ents[/^dir/i.test(named.itemtype ?? named.type ?? '') ? 'dir' : 'file'] ??= path;
  else if (kind === 'proc') {
    const id = named.id ?? (pos[0] != null && /^\d+$/.test(pos[0]) ? pos[0] : null);
    const nm = named.name ?? named.processname ?? (id == null ? pos[0] : null);
    if (id != null) ents.pid ??= String(id).split(',')[0];
    if (nm != null) ents.proc ??= nm;
  } else if (kind === 'service') {
    const s = named.name ?? named.displayname ?? pos[0];
    if (s != null) { ents.service ??= s; if (PS_SERVICE_INTENT[head]) setIntent(PS_SERVICE_INTENT[head], { service: s }); }
  } else if (kind === 'host') { const h = named.computername ?? named.targetname ?? pos[0]; if (h != null) ents.host ??= h; }
  else if (kind === 'url') {
    const u = named.uri ?? pos[0];
    if (u != null) ents.url ??= u;
    if (named.outfile != null) ents.file ??= named.outfile;
  }
  return true;
}

function entsFromSlots(intent, slots, ents) {
  const fam = FAMILY_OF[intent];
  const put = (k, v) => { if (v != null && v !== '' && !/^<\w+>$/.test(String(v))) ents[k] ??= String(v); };
  if (slots.container) put('container', slots.container);
  if (slots.service) put('service', slots.service);
  if (slots.name && fam !== 'find') put('proc', slots.name);
  if (/^\d+$/.test(String(slots.pid ?? ''))) put('pid', slots.pid);
  if (slots.port) put('port', slots.port);
  if (slots.branch) put('branch', slots.branch);
  if (slots.host) put('host', slots.host);
  if (slots.target) put('host', slots.target);
  if (slots.url) put('url', slots.url);
  if (slots.file) put('file', slots.file);
  if (slots.archive) put('file', slots.archive);
  if (slots.dst && !isAmbiguous(slots.dst)) destEnts(slots.src != null ? [slots.src] : [], slots.dst, ents);
  if (slots.path && slots.path !== '.') put(['delete_dir', 'mkdir', 'dir_size', 'largest_dirs', 'list_files'].includes(intent) || fam === 'find' ? 'dir' : /\.\w{1,5}$/.test(slots.path) ? 'file' : 'dir', slots.path);
}

// the tellsh CLI itself (installed, via npx, or `node bin/tellsh.js`)
const TELLSH_LINE = /^(?:npx\s+(?:-y\s+)?|node\s+)?(?:\S*[\\/])?tellsh(?:\.js)?(?:\s+(.*))?$/s;

// tellsh options that take a separate value (`--shell bash`): the value is not part of the request
const TELLSH_VALUE_OPTS = new Set(['--shell', '--os', '--platform', '--top', '--threshold']);
/**
 * The request text of a `tellsh ...` history line (options removed), or null if the line is not a tellsh call.
 * Words keep their boundaries (`tellsh delete folder "/tmp/a b"` -> `delete folder "/tmp/a b"`); false when the
 * line cannot be read back as one request (a word with spaces and both quote characters, unparseable quoting).
 */
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
    // `git -C /repo blame notes.txt`, `docker --context prod logs web`: "delete it" / "stop it" here would hit a
    // different file / container than the one the command used (never resolved, never repeated)
    if (w.length && scopedElsewhere(w, raw)) {
      scoped = true;
      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x])) e[x] = AMB + rawOf(e[x]);
      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; markScoped(segSlots); }
    }
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
    if (scoped) { slots = { ...slots }; markScoped(slots); }
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
const SCOPE_OPTS = {
  git: /^(?:-C|--git-dir|--work-tree|--namespace)(?:=|$)/,
  docker: /^(?:-H|--host|-c|--context|--config)(?:=|$)/,
  podman: /^(?:-c|--connection|--url|--root|--runroot|--identity|--ssh)(?:=|$)/,
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
/** The values of a scoped command (scopedElsewhere) as ambiguous: they name things in another repository / daemon. */
function markScoped(o) {
  for (const x of Object.keys(o)) if (o[x] != null && typeof o[x] !== 'boolean' && !isAmbiguous(o[x])) o[x] = AMB + rawOf(o[x]);
}
/** The arguments after the global options of git/docker/podman (`git -C /tmp status` -> ['status']); other heads: unchanged. */
function afterGlobals(head, args) {
  const vo = GLOBAL_VALUE_OPTS[head];
  if (!vo) return args;
  let i = 0;
  while (i < args.length && /^-/.test(args[i]) && args[i] !== '--') i += vo.has(args[i]) ? 2 : 1;
  if (args[i] === '--') i++;
  return args.slice(i);
}
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
const listedByIntent = (intent) => (intent ? LIST_INTENT[intent] || LIST_FAMILY[FAMILY_OF[intent]] || [] : []);

// pipeline stages that filter the entries of a listing piped into them
const FILTER_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag', 'findstr', 'select-string', 'sls', 'where-object', 'where', '?']);
const GREP_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag']);

// find/grep catalog intents: their path slot is where the search ran, not what it found
const isSearchRoot = (intent, slots, ents) => ents.dir != null && ['find', 'grep'].includes(FAMILY_OF[intent]) && String(ents.dir) === String(slots.path);

// the one operand of a command, or (several files: `touch a.txt b.txt`, `rm a b`) an ambiguous value: "delete them"
// or "delete it" may mean any or all of them, never just the last one
const oneOf = (ops) => (ops.length > 1 ? AMB + ops.map(rawOf).join(' ') : ops[0]);

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

const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];

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
  for (const re of SAME_BUT) if (re.test(fq)) return { lastIntent: ctx.last.intent, lastSlots, blank, skipped: !!ctx.last.skipped, scoped: !!ctx.last.scoped };
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
/bin/bash -lc 'cat scripts/train.py; cat scripts/hybrid/train_a_dev.sh; cat scripts/lib/heldout.js; cat scripts/hybrid/export_data.js; cat scripts/hybrid/train_encoder.py' in /workspace/tellsh
 succeeded in 0ms:
#!/usr/bin/env python3
"""Train the tellsh v0.2 cascade and export model/model.bin (TSH2).

Input: build/cls.jsonl, build/tag.jsonl, build/meta.json written by `node scripts/gen_data.js`
(features are computed in JS by src/features.js -- the same code used at runtime).

Models (all multinomial logistic regression, int8-quantised, top-K feature rows kept):
  tool          stage 1: request -> tool family (+ __none__ for non-shell requests)
  intent:<fam>  stage 2: request -> intent, one model per family with >1 intent
  tagger        stage 3: token -> BIO slot label (tool is an input feature)

Thresholds are calibrated on a group-wise holdout (all copies of a sentence stay on one side):
  accept   cascade score p(tool) * p(intent|tool) needed to answer from the catalog
  compose  stage-1 tool probability needed to try the experimental composer instead

Usage: python3 scripts/train.py [--keep-tool 20000] [--C 30] [--tagC 2]
"""
import argparse
import json
import os
import struct
import sys
import time

import numpy as np
from scipy import sparse
from sklearn.linear_model import LogisticRegression

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, 'build')
DEFAULT_OUT = os.path.join(ROOT, 'model', 'model.bin')


def log(*a):
    print(*a, flush=True)


# ---------------------------------------------------------------------------------------------
# loading

def load_cls(dim):
    rows = [json.loads(l) for l in open(os.path.join(BUILD, 'cls.jsonl'), encoding='utf-8')]
    indptr, indices, data = [0], [], []
    for r in rows:
        for k, v in r['f']:
            indices.append(k)
            data.append(v)
        indptr.append(len(indices))
    X = sparse.csr_matrix((np.array(data), np.array(indices), np.array(indptr)), shape=(len(rows), dim))
    return rows, X


def load_tag(dim):
    seqs = [json.loads(l) for l in open(os.path.join(BUILD, 'tag.jsonl'), encoding='utf-8')]
    indptr, indices, ys, gids, seq_of = [0], [], [], [], []
    for si, s in enumerate(seqs):
        for f, y in zip(s['f'], s['y']):
            indices.extend(sorted(set(f)))
            indptr.append(len(indices))
            ys.append(y)
            gids.append(s['gid'])
            seq_of.append(si)
    X = sparse.csr_matrix((np.ones(len(indices)), np.array(indices), np.array(indptr)), shape=(len(ys), dim))
    return seqs, X, np.array(ys), np.array(gids), np.array(seq_of)


# ---------------------------------------------------------------------------------------------
# model helpers

class Compact:
    """LogisticRegression fitted on the non-empty columns only; exposes full-width coef."""

    def __init__(self, clf, cols, dim, labels):
        self.clf, self.cols, self.labels = clf, cols, list(labels)
        self.coef = np.zeros((len(self.labels), dim))
        if len(self.labels) == 2 and clf.coef_.shape[0] == 1:  # binary: expand to 2 classes
            self.coef[1, cols] = clf.coef_[0] / 2
            self.coef[0, cols] = -clf.coef_[0] / 2
            self.bias = np.array([-clf.intercept_[0] / 2, clf.intercept_[0] / 2])
        else:
            self.coef[:, cols] = clf.coef_
            self.bias = clf.intercept_.copy()

    def proba(self, X):
        z = X @ self.coef.T + self.bias
        z -= z.max(1, keepdims=True)
        e = np.exp(z)
        return e / e.sum(1, keepdims=True)


def fit(X, y, C, w=None, max_iter=1000):
    cols = np.flatnonzero(np.asarray((X != 0).sum(0)).ravel())
    labels = sorted(set(y))
    clf = LogisticRegression(C=C, max_iter=max_iter, tol=1e-4)
    clf.fit(X[:, cols], y, sample_weight=w)
    assert list(clf.classes_) == labels
    return Compact(clf, cols, X.shape[1], labels)


def prune_refit(X, y, C, keep, w=None):
    """Fit, keep the `keep` feature rows with the largest weight norm, refit on those rows only."""
    m = fit(X, y, C, w)
    norms = np.sqrt((m.coef ** 2).sum(0))
    used = np.flatnonzero(norms > 0)
    k = min(keep, len(used))
    rows = np.sort(used[np.argsort(-norms[used])[:k]])
    mask = np.zeros(X.shape[1], bool)
    mask[rows] = True
    Xr = X.multiply(mask[None, :]).tocsr() if k < len(used) else X
    m2 = fit(Xr, y, C, w)
    W = m2.coef[:, rows].T  # (rows, classes)
    return {'labels': m2.labels, 'rows': rows, 'W': W, 'b': m2.bias, 'model': m2}


def quantize(W):
    scale = np.abs(W).max(axis=0) / 127.0
    scale[scale == 0] = 1.0
    Q = np.clip(np.round(W / scale), -127, 127).astype(np.int8)
    return Q, scale.astype(np.float32)


# ---------------------------------------------------------------------------------------------
# cascade

def cascade_scores(p_tool, tool_labels, intent_models, X, fam_intents, k=3):
    """For each row: best (intent, score, tool_p, tool) using top-k tools; score = p(tool)*p(intent|tool)."""
    out = []
    none = tool_labels.index('__none__') if '__none__' in tool_labels else -1
    cache = {}
    for fam, m in intent_models.items():
        cache[fam] = m.proba(X)
    for r in range(X.shape[0]):
        order = np.argsort(-p_tool[r])
        best = (None, 0.0, 0.0, None)
        cand = [t for t in order if t != none][:k]
        for t in cand:
            fam = tool_labels[t]
            pt = p_tool[r, t]
            if fam in cache:
                pi = cache[fam][r]
                j = int(np.argmax(pi))
                s, intent = pt * pi[j], intent_models[fam].labels[j]
            else:
                s, intent = pt, fam_intents[fam][0]
            if s > best[1]:
                best = (intent, s, pt, fam)
        top_tool = tool_labels[order[0]]
        out.append((best[0], best[1], p_tool[r, order[0]], top_tool, [tool_labels[t] for t in cand]))
    return out


def train_all(rows, X, meta, idx, C, keep_tool, keep_int, log_prefix=''):
    """Train tool + intent models on row subset idx."""
    y_tool = np.array([rows[i]['y'] for i in idx])
    w = np.array([rows[i]['w'] for i in idx], dtype=float)
    Xs = X[idx]
    t0 = time.time()
    tool = prune_refit(Xs, y_tool, C, keep_tool, w)
    log(f'{log_prefix}tool model: {len(tool["labels"])} classes, {len(tool["rows"])} rows ({time.time() - t0:.0f}s)')
    intents = {}
    for fam, ids in meta['intentsByFamily'].items():
        if len(ids) < 2:
            continue
        sub = [i for i in idx if rows[i]['y'] == fam and rows[i]['i']]
        ys = np.array([rows[i]['i'] for i in sub])
        if len(set(ys)) < 2:
            continue
        intents[fam] = prune_refit(X[sub], ys, C, keep_int(len(ids)), np.array([rows[i]['w'] for i in sub], dtype=float))
    log(f'{log_prefix}intent models: {len(intents)} families ({time.time() - t0:.0f}s)')
    return tool, intents


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--C', type=float, default=30.0)
    ap.add_argument('--tagC', type=float, default=2.0)
    ap.add_argument('--keep-tool', type=int, default=20000)
    ap.add_argument('--keep-tag', type=int, default=24000)
    ap.add_argument('--holdout', type=float, default=0.15)
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
# gen_data: additionally drop every dev-split sentence (same hash as export_data.js), from every training source: the
# base intent rows, and through leaks() (which every emitted row and the tldr / out-of-domain loaders check) the OOD,
# tldr and anaphora rows (an OOD dev sentence is skipped with its typo copy)
sed -e "s#if (heldOut.has(r0.text)) { dropped++; continue; }#if (heldOut.has(r0.text) || isDevText(r0.text)) { dropped++; continue; }#" \
    -e "s#^  const leaks = excl.has;\$#  const leaks = (t) => excl.has(t) || isDevText(t);#" \
    -e "s#^import { ctxFeatures } from '../src/history.js';#&\nimport { fnv1a as _fnv } from '../src/features.js';\nconst isDevText = (t) => _fnv('dev:' + normalize(t)) % 10 === 0;#" \
    $ROOT/scripts/gen_data.js > $T/scripts/gen_data.js
# every substitution must have happened (the import alone is not enough)
grep -q 'heldOut.has(r0.text) || isDevText' $T/scripts/gen_data.js
grep -q 'const leaks = (t) => excl.has(t) || isDevText(t);' $T/scripts/gen_data.js
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
/bin/bash -lc 'node --test test/' in /workspace/tellsh
codex
I’m checking the earlier fixes and the paths around them, especially history target selection, command rendering, and training-data separation. The test suite is running; I’m also using targeted read-only reproductions.
exec
/bin/bash -lc "nl -ba src/history.js | sed -n '160,440p'" in /workspace/tellsh
 succeeded in 0ms:
   160	
   161	function invert(cmd, kind = 'posix') {
   162	  for (const { id, re, names, raws } of inverters()) {
   163	    const m = cmd.match(re[kind]);
   164	    if (!m) continue;
   165	    const slots = {};
   166	    let ambiguous = false;
   167	    names.forEach((n, i) => {
   168	      const rv = m[i + 1];
   169	      if (rv == null) return;
   170	      if (raws[i]) { slots[n] = rv; return; }
   171	      const v = decodeWord(rv, kind);
   172	      if (v == null || isExpansion(v) || (isGlob(v) && !GLOB_SLOTS.has(n))) { ambiguous = true; slots[n] = AMB + rv; return; }
   173	      slots[n] = rawOf(v);
   174	    });
   175	    if (slots.namepat && !slots.name && !isAmbiguous(slots.namepat)) slots.name = slots.namepat.replace(/^\*|\*$/g, '');
   176	    return { intent: id, slots, ambiguous };
   177	  }
   178	  return null;
   179	}
   180	
   181	const FILE_HEADS = new Set(['cat', 'less', 'more', 'head', 'tail', 'vim', 'vi', 'nvim', 'nano', 'code', 'stat', 'file', 'wc',
   182	  'sha256sum', 'md5sum', 'shasum', 'md5', 'touch', 'open', 'bat', 'chmod', 'chown', 'source', 'python', 'python3', 'node', 'bash', 'sh', 'unzip', 'gzip', 'gunzip', 'xdg-open']);
   183	const DIR_HEADS = new Set(['cd', 'ls', 'du', 'find', 'tree', 'mkdir', 'rmdir', 'pushd', 'ncdu']);
   184	// heads whose arguments are never file references (no stale-reference invalidation for them)
   185	const INERT_HEADS = new Set(['echo', 'printf', 'man', 'which', 'whereis', 'type', 'history', 'clear', 'exit', 'export', 'alias', 'unalias',
   186	  'npm', 'npx', 'yarn', 'pnpm', 'make', 'cargo', 'go', 'pip', 'pip3', 'apt', 'apt-get', 'brew', 'tellsh', 'true', 'false', 'date', 'sleep',
   187	  'write-host', 'write-output', 'get-help', 'get-command', 'set-psreadlineoption', 'clear-host', 'cls']);
   188	const DOCKER_CT = new Set(['logs', 'exec', 'stop', 'start', 'restart', 'rm', 'inspect', 'attach', 'kill', 'top', 'port', 'pause', 'unpause']);
   189	const DOCKER_VAL_FLAGS = new Set(['--tail', '-n', '--since', '--until', '-e', '--env', '-u', '--user', '-w', '--workdir', '-t', '--time', '-s', '--signal']);
   190	const DOCKER_INTENT = { logs: 'docker_logs', stop: 'docker_stop', exec: 'docker_exec' };
   191	const SYSTEMCTL_INTENT = { status: 'service_status', restart: 'service_restart', stop: 'service_stop', start: 'service_start', enable: 'service_enable' };
   192	
   193	// PowerShell cmdlets and their aliases -> what their target argument is
   194	const PS_NATIVE = {
   195	  'get-content': 'file', gc: 'file', type: 'file', 'get-filehash': 'file', 'select-string': 'file', 'expand-archive': 'file', 'set-content': 'file', 'add-content': 'file', 'out-file': 'file',
   196	  'get-item': 'path', gi: 'path', 'get-itemproperty': 'path', 'invoke-item': 'path', ii: 'path', 'rename-item': 'path', rni: 'path', 'test-path': 'path',
   197	  'remove-item': 'remove', ri: 'remove', del: 'remove', erase: 'remove', rd: 'remove',
   198	  'set-location': 'dir', sl: 'dir', chdir: 'dir', 'push-location': 'dir', 'get-childitem': 'dir', gci: 'dir', dir: 'dir',
   199	  'copy-item': 'copy', cpi: 'copy', copy: 'copy', 'move-item': 'copy', mi: 'copy', move: 'copy', 'new-item': 'new', ni: 'new',
   200	  'stop-process': 'proc', spps: 'proc', 'get-process': 'proc', gps: 'proc',
   201	  'stop-service': 'service', 'start-service': 'service', 'restart-service': 'service', 'get-service': 'service', gsv: 'service', 'set-service': 'service',
   202	  'test-connection': 'host', 'test-netconnection': 'host', 'resolve-dnsname': 'host',
   203	  'invoke-webrequest': 'url', iwr: 'url', 'invoke-restmethod': 'url', irm: 'url',
   204	};
   205	const PS_SERVICE_INTENT = { 'stop-service': 'service_stop', 'start-service': 'service_start', 'restart-service': 'service_restart', 'get-service': 'service_status' };
   206	const PS_VALUE_PARAMS = new Set(['path', 'literalpath', 'lp', 'pspath', 'name', 'id', 'processname', 'computername', 'targetname', 'uri', 'destination',
   207	  'destinationpath', 'totalcount', 'tail', 'head', 'first', 'last', 'encoding', 'filter', 'include', 'exclude', 'itemtype', 'type', 'algorithm', 'value',
   208	  'newname', 'pattern', 'count', 'depth', 'outfile', 'method', 'erroraction', 'ea', 'port', 'delimiter', 'readcount', 'stream', 'credential', 'displayname']);
   209	
   210	function psArgs(args) {
   211	  const named = {};
   212	  const pos = [];
   213	  const sw = new Set();
   214	  for (let i = 0; i < args.length; i++) {
   215	    const m = String(args[i]).match(/^-([A-Za-z]\w*)(?::(.+))?$/);
   216	    if (!m) { pos.push(args[i]); continue; }
   217	    const p = m[1].toLowerCase();
   218	    if (m[2] != null) named[p] = m[2];
   219	    else if (PS_VALUE_PARAMS.has(p) && args[i + 1] != null) named[p] = args[++i];
   220	    else sw.add(p);
   221	  }
   222	  return { named, pos, sw };
   223	}
   224	
   225	const typeByExt = (p) => (/\.\w{1,5}$/.test(rawOf(p)) ? 'file' : 'dir');
   226	
   227	/**
   228	 * mv/cp/ln (Move-Item/Copy-Item) SRC... DST: "it" afterwards is the moved/copied item, which is DST
   229	 * itself only when DST names the new file (`mv a.txt b.txt`). When DST is a directory the item now
   230	 * lives somewhere inside it, so neither DST nor SRC is a safe "it": both types become ambiguous.
   231	 */
   232	function destEnts(srcs, dst, ents) {
   233	  const d = rawOf(dst);
   234	  if (!isAmbiguous(dst) && srcs.length === 1 && typeByExt(srcs[0]) === 'file' && typeByExt(d) === 'file' && !/[\\/]$/.test(d)) {
   235	    ents.file ??= dst;
   236	    return;
   237	  }
   238	  ents.file ??= AMB + d;
   239	  ents.dir ??= AMB + d;
   240	}
   241	
   242	// options that take a value, per command (so `kill -s 9 4242` or `pkill nginx -u bob` pick the right word)
   243	const VALUE_OPTS = {
   244	  kill: new Set(['-s', '-n', '--signal']),
   245	  pkill: new Set(['-u', '-U', '-g', '-G', '-P', '-s', '-t', '-F', '--signal', '--euid', '--uid', '--group', '--pgroup', '--parent', '--session', '--terminal', '--pidfile', '--ns', '--nslist']),
   246	  killall: new Set(['-u', '--user', '-s', '--signal', '-o', '--older-than', '-y', '--younger-than', '-n', '--ns', '-Z', '--context']),
   247	  pidof: new Set(['-o', '--omit-pid']),
   248	  grep: new Set(['-e', '--regexp', '-f', '--file', '-m', '--max-count', '-A', '-B', '-C', '--include', '--exclude', '--exclude-dir', '--label', '--color', '-d', '-D']),
   249	  checkout: new Set(['-b', '-B', '--orphan', '--conflict', '--pathspec-from-file']),
   250	  switch: new Set(['-c', '-C', '--create', '--force-create', '--orphan', '--conflict']),
   251	  mv: new Set(['-t', '--target-directory', '-S', '--suffix']),
   252	};
   253	VALUE_OPTS.pgrep = VALUE_OPTS.pkill;
   254	VALUE_OPTS.cp = VALUE_OPTS.mv;
   255	VALUE_OPTS.ln = VALUE_OPTS.mv;
   256	VALUE_OPTS.rg = VALUE_OPTS.grep;
   257	
   258	/** -> { pos: positional args, opts: {opt: value}, flags: [options without value], after: args after `--` } */
   259	function parseArgs(args, valueOpts = new Set()) {
   260	  const pos = [];
   261	  const opts = {};
   262	  const flags = [];
   263	  let after = null;
   264	  for (let i = 0; i < args.length; i++) {
   265	    const a = String(args[i]);
   266	    if (a === '--') { after = args.slice(i + 1); pos.push(...after); break; }
   267	    if (/^--[^=]+=/.test(a)) { opts[a.replace(/=.*$/s, '')] = a.slice(a.indexOf('=') + 1); continue; }
   268	    if (valueOpts.has(a)) { opts[a] = args[i + 1]; i++; continue; }
   269	    // attached short value: -uroot, -tDIR
   270	    if (/^-[A-Za-z]./.test(a) && valueOpts.has(a.slice(0, 2)) && !/^--/.test(a)) { opts[a.slice(0, 2)] = a.slice(2); continue; }
   271	    if (/^-./.test(a)) { flags.push(a); continue; }
   272	    pos.push(args[i]);
   273	  }
   274	  return { pos, opts, flags, after };
   275	}
   276	
   277	// VAR=x prefixes and wrapper commands (sudo -u root, env, command, nice -n 5, timeout 5, ...) removed: the command that runs.
   278	// Returns `w` itself when there is nothing to remove.
   279	function unwrap(w) {
   280	  let i = 0;
   281	  while (i < w.length && /^\w+=/.test(w[i])) i++;
   282	  if (i < w.length && isAmbiguous(w[i])) return i ? w.slice(i) : w;
   283	  const r = commandWords(w.map(String));
   284	  return r.length === w.length ? w : w.slice(w.length - r.length);
   285	}
   286	
   287	const CD_HEADS = new Set(['cd', 'pushd', 'popd', 'chdir', 'set-location', 'sl', 'push-location', 'pop-location']);
   288	// a path that depends on the working directory (stale once the directory changes)
   289	export const isRelativePath = (v) => {
   290	  const s = rawOf(String(v));
   291	  return !/^(?:[~/\\]|[A-Za-z]:[\\/]|\$HOME\b|\$\{HOME\}|\$env:|%USERPROFILE%)/i.test(s);
   292	};
   293	const PATH_SLOT_KEYS = ['path', 'file', 'src', 'dst', 'dest', 'archive'];
   294	/** Mark working-directory-relative file/dir values as ambiguous (the cwd changed after they were used). */
   295	function staleRelative(ents, slots) {
   296	  for (const t of ['file', 'dir']) if (ents[t] != null && !isAmbiguous(ents[t]) && isRelativePath(ents[t])) ents[t] = AMB + ents[t];
   297	  if (slots) for (const k of PATH_SLOT_KEYS) if (slots[k] != null && !isAmbiguous(slots[k]) && isRelativePath(slots[k])) slots[k] = AMB + slots[k];
   298	}
   299	
   300	// output/input redirection operator words (splitCommand keepRedirects): `>`, `2>>`, `&>`, `>|`, `<`, `>&`
   301	const REDIR_TARGET_OP = /^\d*(?:[<>]{1,2}[&|]?|&>>?)$/;
   302	const REDIR_DUP_OP = /^\d*[<>]+&[\d-]+$/;
   303	
   304	/** PowerShell native commands. Returns true when the head was recognised. */
   305	function psNative(head, args, ents, setIntent) {
   306	  const kind = PS_NATIVE[head];
   307	  if (!kind) return false;
   308	  const { named, pos, sw } = psArgs(args);
   309	  const path = named.literalpath ?? named.lp ?? named.path ?? named.pspath ?? pos[0];
   310	  if (kind === 'file' && path != null) ents.file ??= path;
   311	  else if (kind === 'path' && path != null) ents[typeByExt(path)] ??= path;
   312	  else if (kind === 'dir' && path != null) {
   313	    if (ents.dir == null) {
   314	      ents.dir = path;
   315	      // Get-ChildItem DIR -Filter/-Include/-Exclude/-Recurse (or DIR *.tmp): the matches live inside DIR
   316	      if (!['set-location', 'sl', 'chdir', 'push-location'].includes(head) &&
   317	          (named.filter != null || named.include != null || named.exclude != null || pos[1] != null || [...sw].some((x) => x.length >= 2 && 'recurse'.startsWith(x)))) ents.searchDir = true;
   318	      else if (!['set-location', 'sl', 'chdir', 'push-location'].includes(head)) ents.listDir = true;
   319	    }
   320	  }
   321	  else if (kind === 'dir' && !['set-location', 'sl', 'chdir', 'push-location'].includes(head)) {
   322	    // Get-ChildItem without a path lists the working directory
   323	    ents.listCwd = named.filter != null || named.include != null || named.exclude != null || [...sw].some((x) => x.length >= 2 && 'recurse'.startsWith(x)) ? 'search' : 'list';
   324	  }
   325	  else if (kind === 'remove' && path != null) ents[[...sw].some((s) => 'recurse'.startsWith(s)) ? 'dir' : typeByExt(path)] ??= path;
   326	  else if (kind === 'copy') { const d = named.destination ?? pos[1]; if (d != null) destEnts(path != null ? String(path).split(',') : [], d, ents); }
   327	  else if (kind === 'new' && path != null) ents[/^dir/i.test(named.itemtype ?? named.type ?? '') ? 'dir' : 'file'] ??= path;
   328	  else if (kind === 'proc') {
   329	    const id = named.id ?? (pos[0] != null && /^\d+$/.test(pos[0]) ? pos[0] : null);
   330	    const nm = named.name ?? named.processname ?? (id == null ? pos[0] : null);
   331	    if (id != null) ents.pid ??= String(id).split(',')[0];
   332	    if (nm != null) ents.proc ??= nm;
   333	  } else if (kind === 'service') {
   334	    const s = named.name ?? named.displayname ?? pos[0];
   335	    if (s != null) { ents.service ??= s; if (PS_SERVICE_INTENT[head]) setIntent(PS_SERVICE_INTENT[head], { service: s }); }
   336	  } else if (kind === 'host') { const h = named.computername ?? named.targetname ?? pos[0]; if (h != null) ents.host ??= h; }
   337	  else if (kind === 'url') {
   338	    const u = named.uri ?? pos[0];
   339	    if (u != null) ents.url ??= u;
   340	    if (named.outfile != null) ents.file ??= named.outfile;
   341	  }
   342	  return true;
   343	}
   344	
   345	function entsFromSlots(intent, slots, ents) {
   346	  const fam = FAMILY_OF[intent];
   347	  const put = (k, v) => { if (v != null && v !== '' && !/^<\w+>$/.test(String(v))) ents[k] ??= String(v); };
   348	  if (slots.container) put('container', slots.container);
   349	  if (slots.service) put('service', slots.service);
   350	  if (slots.name && fam !== 'find') put('proc', slots.name);
   351	  if (/^\d+$/.test(String(slots.pid ?? ''))) put('pid', slots.pid);
   352	  if (slots.port) put('port', slots.port);
   353	  if (slots.branch) put('branch', slots.branch);
   354	  if (slots.host) put('host', slots.host);
   355	  if (slots.target) put('host', slots.target);
   356	  if (slots.url) put('url', slots.url);
   357	  if (slots.file) put('file', slots.file);
   358	  if (slots.archive) put('file', slots.archive);
   359	  if (slots.dst && !isAmbiguous(slots.dst)) destEnts(slots.src != null ? [slots.src] : [], slots.dst, ents);
   360	  if (slots.path && slots.path !== '.') put(['delete_dir', 'mkdir', 'dir_size', 'largest_dirs', 'list_files'].includes(intent) || fam === 'find' ? 'dir' : /\.\w{1,5}$/.test(slots.path) ? 'file' : 'dir', slots.path);
   361	}
   362	
   363	// the tellsh CLI itself (installed, via npx, or `node bin/tellsh.js`)
   364	const TELLSH_LINE = /^(?:npx\s+(?:-y\s+)?|node\s+)?(?:\S*[\\/])?tellsh(?:\.js)?(?:\s+(.*))?$/s;
   365	
   366	// tellsh options that take a separate value (`--shell bash`): the value is not part of the request
   367	const TELLSH_VALUE_OPTS = new Set(['--shell', '--os', '--platform', '--top', '--threshold']);
   368	/**
   369	 * The request text of a `tellsh ...` history line (options removed), or null if the line is not a tellsh call.
   370	 * Words keep their boundaries (`tellsh delete folder "/tmp/a b"` -> `delete folder "/tmp/a b"`); false when the
   371	 * line cannot be read back as one request (a word with spaces and both quote characters, unparseable quoting).
   372	 */
   373	export function tellshQuery(line, kind = 'posix') {
   374	  const a = tellshArgs(line, kind);
   375	  return a == null || a === false ? a : a.text;
   376	}
   377	
   378	/** tellshQuery with the quoted arguments joinArgs could not classify: -> { text, unclear } | null | false */
   379	export function tellshArgs(line, kind = 'posix') {
   380	  const t = String(line).trim();
   381	  const tm = t.match(TELLSH_LINE);
   382	  if (!tm) return null;
   383	  const w = wordsOf(tm[1] || '', lineKind(t, kind), { literalTilde: false });
   384	  if (!w) return tm[1] ? false : { text: '', unclear: [] };
   385	  const words = [];
   386	  for (let i = 0; i < w.length; i++) {
   387	    if (TELLSH_VALUE_OPTS.has(w[i])) { i++; continue; }
   388	    if (!/^-/.test(w[i])) words.push(rawOf(w[i]));
   389	  }
   390	  if (!words.length) return { text: '', unclear: [] };
   391	  return joinArgs(words) ?? false;
   392	}
   393	
   394	/**
   395	 * Analyse one history line. `classify(query)` handles previous `tellsh <query>` lines.
   396	 * kind: 'posix' | 'pwsh' (PowerShell history; Verb-Noun lines are always read as PowerShell).
   397	 * Segments of a compound line (`a; b`, `a && b`, `a | b`) are read in order and later ones win: the
   398	 * entities of `cat old.txt; cat new.txt` are those of `cat new.txt`. Redirection targets (`> out.txt`)
   399	 * are files the line wrote. A `cd` makes every earlier working-directory-relative path ambiguous.
   400	 * `at` gives each entity type the index of the segment it came from (later segment = newer), and
   401	 * `searchDir` marks a `dir` entity that is only the root of a search (`find /var/log -name '*.gz'`,
   402	 * `grep -rl TODO src`): the results live inside it, so it must never be a destructive target.
   403	 * -> { line, intent, slots, ents, at, searchDir?, ambiguous, cd?, scoped?, fromTellsh?, opaque? }  (scoped: see scopedElsewhere)
   404	 */
   405	export function analyzeCommand(line, classify, kind = 'posix') {
   406	  let ents = {};
   407	  let intent = null;
   408	  let slots = {};
   409	  let ambiguous = false;
   410	  const t = line.trim();
   411	  const k = lineKind(t, kind);
   412	  if (TELLSH_LINE.test(t)) {
   413	    const qa = tellshArgs(t, k);
   414	    // a request that cannot be read back: it may have named any file or directory
   415	    if (qa === false) return { line: t, intent, slots, ents: { file: AMB + t, dir: AMB + t }, at: {}, listed: { file: 0, dir: 0 }, opaque: true, fromTellsh: true, ambiguous: true };
   416	    const q = qa?.text;
   417	    const r = q && classify ? classify(q, qa.unclear) : null;
   418	    if (r?.intent) { intent = r.intent; slots = { ...(r.slots || {}) }; entsFromSlots(intent, slots, ents); }
   419	    // `tellsh list directory /tmp/build`: like `ls /tmp/build`, the user saw the entries of the directory
   420	    const sr = isSearchRoot(intent, slots, ents);
   421	    const ld = !sr && ents.dir != null && (FAMILY_OF[intent] === 'ls' || intent === 'largest_dirs');
   422	    const listed = Object.fromEntries(listedByIntent(intent).map((x) => [x, 0]));
   423	    return { line: t, intent, slots, ents, at: {}, listed, ...(sr ? { searchDir: true } : {}), ...(ld ? { listDir: true } : {}), fromTellsh: true, ambiguous };
   424	  }
   425	  const split = splitCommand(t, k, { keepRedirects: true });
   426	  if (!split.ok) {
   427	    // cannot interpret the line (unterminated quote, heredoc, ...): it may name any file or directory,
   428	    // so older file/dir values must not be picked up by "it"
   429	    ents.file = AMB + t;
   430	    ents.dir = AMB + t;
   431	    return { line: t, intent, slots, ents, at: {}, listed: { file: 0, dir: 0 }, opaque: true, ambiguous: true };
   432	  }
   433	  const inv = invert(t, k);
   434	  let segIntent = null;
   435	  let segSlots = {};
   436	  let segIntentAt = -1;
   437	  let intentStale = false;
   438	  let cdAt = -1;
   439	  let scoped = false;
   440	  let searchDir = false;

 exited 1 in 5778ms:
TAP version 13
# Subtest: /workspace/tellsh/test/cli.test.js
not ok 1 - /workspace/tellsh/test/cli.test.js
  ---
  duration_ms: 3189.968935
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
  duration_ms: 653.222403
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 3 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 199.782014
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 4 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 236.975724
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 5 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 238.571904
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 6 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 185.156575
  ...
# Subtest: /workspace/tellsh/test/pipeline.test.js
not ok 7 - /workspace/tellsh/test/pipeline.test.js
  ---
  duration_ms: 391.378056
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
  duration_ms: 1462.902679
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
  duration_ms: 1029.540476
  location: '/workspace/tellsh/test/regressions10.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions2.test.js
not ok 10 - /workspace/tellsh/test/regressions2.test.js
  ---
  duration_ms: 1094.236476
  location: '/workspace/tellsh/test/regressions2.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 11 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 650.608077
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 12 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 682.587559
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 13 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 515.88291
  ...
# Subtest: /workspace/tellsh/test/regressions4.test.js
not ok 14 - /workspace/tellsh/test/regressions4.test.js
  ---
  duration_ms: 1258.683087
  location: '/workspace/tellsh/test/regressions4.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions5.test.js
ok 15 - /workspace/tellsh/test/regressions5.test.js
  ---
  duration_ms: 949.204037
  ...
# Subtest: /workspace/tellsh/test/regressions6.test.js
ok 16 - /workspace/tellsh/test/regressions6.test.js
  ---
  duration_ms: 884.114882
  ...
# Subtest: /workspace/tellsh/test/regressions7.test.js
ok 17 - /workspace/tellsh/test/regressions7.test.js
  ---
  duration_ms: 447.371803
  ...
# Subtest: /workspace/tellsh/test/regressions8.test.js
not ok 18 - /workspace/tellsh/test/regressions8.test.js
  ---
  duration_ms: 720.46372
  location: '/workspace/tellsh/test/regressions8.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions9.test.js
not ok 19 - /workspace/tellsh/test/regressions9.test.js
  ---
  duration_ms: 1113.497443
  location: '/workspace/tellsh/test/regressions9.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 20 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 3992.48688
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/slot-cases.js
ok 21 - /workspace/tellsh/test/slot-cases.js
  ---
  duration_ms: 108.474486
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 22 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 241.552736
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 23 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 324.767337
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
# pass 13
# fail 10
# cancelled 0
# skipped 0
# todo 0
# duration_ms 5684.095167

exec
/bin/bash -lc "nl -ba src/history.js | sed -n '440,860p'" in /workspace/tellsh
 succeeded in 0ms:
   440	  let searchDir = false;
   441	  let listDir = false;
   442	  const at = {};
   443	  const listed = {}; // entity type -> index of the newest segment that listed values of that type
   444	  // segments from..to-1 are connected by pipes only
   445	  const samePipe = (from, to) => from >= 0 && split.segments.slice(from, to).every((s) => s.sep === '|');
   446	  const firstWord = (s) => unwrap(s.words.filter((x) => !REDIR_TARGET_OP.test(x) && !REDIR_DUP_OP.test(x)))[0];
   447	  split.segments.forEach(({ words }, segIdx) => {
   448	    const e = {};
   449	    const setIntent = (id, s) => { segIntent = id; segSlots = s; segIntentAt = segIdx; };
   450	    // redirections: the target is a file the command wrote (or read); it is not an argument
   451	    let w = [];
   452	    let redirTarget = null;
   453	    for (let i = 0; i < words.length; i++) {
   454	      const x = words[i];
   455	      if (REDIR_DUP_OP.test(x)) continue;
   456	      if (REDIR_TARGET_OP.test(x)) {
   457	        const target = words[i + 1];
   458	        i++;
   459	        if (target != null && !/^\/dev\/(?:null|stdout|stderr|tty)$|^(?:\$null|NUL)$/i.test(rawOf(target))) redirTarget = target;
   460	        continue;
   461	      }
   462	      w.push(x);
   463	    }
   464	    // wrappers (`sudo -u root ls`, `env ls`, `command ls`, `nice -n 5 ls`, `timeout 5 ps aux`): the command they run
   465	    const raw = w;
   466	    w = unwrap(w);
   467	    // a wrapper whose options could not be read: what ran is unknown, so it may have printed or named anything
   468	    if (!w.length || (w !== raw && /^-/.test(w[0]))) {
   469	      e.file = AMB + raw.join(' '); e.dir = AMB + raw.join(' ');
   470	      for (const x of ENT_TYPES) listed[x] = segIdx;
   471	      w = [];
   472	    }
   473	    if (w.length) segmentEnts(w, e, setIntent, split, k, segIdx, firstWord);
   474	    // `git -C /repo blame notes.txt`, `docker --context prod logs web`: "delete it" / "stop it" here would hit a
   475	    // different file / container than the one the command used (never resolved, never repeated)
   476	    if (w.length && scopedElsewhere(w, raw)) {
   477	      scoped = true;
   478	      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x])) e[x] = AMB + rawOf(e[x]);
   479	      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; markScoped(segSlots); }
   480	    }
   481	    if (redirTarget != null) e.file = redirTarget;
   482	    const pipedIn = segIdx > 0 && split.segments[segIdx - 1].sep === '|';
   483	    if (w.length && !isAmbiguous(w[0])) for (const x of listedBySegment(w, pipedIn, k)) listed[x] = segIdx;
   484	    // every command the wrapper chain may run (also when its options are misread): a listing anywhere in it counts
   485	    if (w !== raw) for (const c of commandChains(raw, [], {})) if (c.length && !isAmbiguous(c[0])) for (const x of listedBySegment(c, pipedIn, k)) listed[x] = segIdx;
   486	    // a listing piped into anything (`ls DIR | sort | grep pdf`, `ls -S DIR | head -1`, `gci DIR | Select-Object
   487	    // -First 1`): what the user saw is a selection of the entries inside DIR, never DIR itself
   488	    const piped = split.segments[segIdx].sep.startsWith('|') && !split.segments[segIdx].sep.startsWith('||');
   489	    if (e.listDir && piped) { e.searchDir = true; delete e.listDir; }
   490	    if (e.listCwd) {
   491	      const how = piped ? 'search' : e.listCwd;
   492	      // `cd DIR && ls | grep pdf`: the listing is of DIR
   493	      if (cdAt >= 0 && at.dir === cdAt) { if (how === 'search') { searchDir = true; listDir = false; } else if (!searchDir) listDir = true; }
   494	      delete e.listCwd;
   495	    }
   496	    const head = w.length && !isAmbiguous(w[0]) ? w[0].replace(/^.*[\\/]/, '').toLowerCase() : '';
   497	    if (CD_HEADS.has(head)) {
   498	      // the working directory changes: earlier relative paths (and a relative cd target) are stale
   499	      cdAt = segIdx;
   500	      staleRelative(ents, null);
   501	      const target = w.slice(1).filter((a) => !/^-/.test(a))[0];
   502	      if (target != null && !isAmbiguous(target) && !isRelativePath(target) && target !== '-') e.dir = target;
   503	      else e.dir = AMB + (target ?? '-');
   504	      delete e.file;
   505	    }
   506	    if (e.dir !== undefined) { searchDir = !!e.searchDir; listDir = !!e.listDir; }
   507	    // `ls ~/Downloads | grep pdf`, `gci DIR | Where-Object …`: the listed directory was filtered, so what
   508	    // the user saw are entries inside it
   509	    // (any later stage of the same pipeline, not only the next one)
   510	    else if (segIdx > 0 && at.dir != null && at.dir < segIdx && samePipe(at.dir, segIdx) && FILTER_HEADS.has(head)) searchDir = true;
   511	    delete e.searchDir;
   512	    delete e.listDir;
   513	    for (const key of Object.keys(e)) at[key] = segIdx;
   514	    Object.assign(ents, e); // later segments supersede earlier ones
   515	  });
   516	  if (inv && cdAt < 0) {
   517	    // the whole line is a catalog/variant command: its slots are the most precise reading
   518	    intent = inv.intent; slots = inv.slots; ambiguous = inv.ambiguous;
   519	    if (scoped) { slots = { ...slots }; markScoped(slots); }
   520	    const ie = {};
   521	    entsFromSlots(intent, slots, ie);
   522	    for (const key of Object.keys(ie)) at[key] = split.segments.length;
   523	    if (ie.dir !== undefined) {
   524	      // a piped/filtered listing found above stays a search root even when the line is a catalog command
   525	      const piped = searchDir && String(ie.dir) === String(ents.dir);
   526	      searchDir = isSearchRoot(intent, slots, ie) || piped;
   527	      listDir = !searchDir && (['ls', 'find'].includes(FAMILY_OF[intent]) || intent === 'largest_dirs');
   528	    }
   529	    ents = { ...ents, ...ie };
   530	  } else if (segIntent) {
   531	    intent = segIntent; slots = { ...segSlots };
   532	    if (segIntentAt < cdAt) staleRelative({}, slots);
   533	    // `kill 1111; ls newdir`: another command ran after the one tellsh could repeat
   534	    if (split.segments.slice(segIntentAt, -1).some((s) => s.sep !== '|')) intentStale = true;
   535	  }
   536	  if (Object.values(slots).some(isAmbiguous)) ambiguous = true;
   537	  return { line: t, intent, slots, ents, at, ambiguous, ...(searchDir && ents.dir != null ? { searchDir: true } : {}),
   538	    ...(listDir && !searchDir && ents.dir != null ? { listDir: true } : {}), ...(cdAt >= 0 ? { cd: true } : {}),
   539	    ...(intentStale ? { intentStale: true } : {}), ...(scoped ? { scoped: true } : {}), listed,
   540	    // the dir is the `cd` target (`cdFollowed`: another segment ran after the cd)
   541	    ...(cdAt >= 0 && at.dir === cdAt ? { cdDir: true, cdFollowed: cdAt < split.segments.length - 1 } : {}) };
   542	}
   543	
   544	// Listings: commands that print many values of an entity type (`ls`, `find`, `ps aux`, `docker ps`, `git branch`).
   545	// After one, "it"/"them" may mean any of the printed values, so an older value of that type is not a safe
   546	// target for a changing command.
   547	const FS_LISTERS = new Set(['ls', 'tree', 'dir', 'gci', 'get-childitem', 'll', 'la', 'find', 'fd', 'fdfind', 'locate', 'mlocate', 'plocate',
   548	  'du', 'ncdu', 'exa', 'eza', 'lsd', 'vdir']);
   549	const FS_SEARCHERS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'select-string', 'sls', 'findstr']);
   550	const PROC_LISTERS = new Set(['ps', 'top', 'htop', 'btop', 'atop', 'pgrep', 'pidof', 'pstree', 'get-process', 'gps', 'tasklist']);
   551	// global options that take a value, before the subcommand (`git -C /tmp status`, `docker --context prod ps`)
   552	const GLOBAL_VALUE_OPTS = {
   553	  git: new Set(['-C', '-c', '--git-dir', '--work-tree', '--namespace', '--super-prefix', '--config-env']),
   554	  docker: new Set(['-H', '--host', '-c', '--context', '--config', '-l', '--log-level', '--tlscacert', '--tlscert', '--tlskey']),
   555	  podman: new Set(['-c', '--connection', '--url', '--identity', '--root', '--runroot', '--cgroup-manager', '--log-level', '--storage-driver',
   556	    '--module', '--events-backend', '--network-cmd-path', '--tmpdir', '--volumepath', '--imagestore', '--hooks-dir', '--conmon', '--runtime', '--ssh']),
   557	};
   558	// global options / environment that point git, docker or podman at another repository, directory or daemon
   559	const SCOPE_OPTS = {
   560	  git: /^(?:-C|--git-dir|--work-tree|--namespace)(?:=|$)/,
   561	  docker: /^(?:-H|--host|-c|--context|--config)(?:=|$)/,
   562	  podman: /^(?:-c|--connection|--url|--root|--runroot|--identity|--ssh)(?:=|$)/,
   563	};
   564	const SCOPE_ENV = /^(?:GIT_DIR|GIT_WORK_TREE|GIT_NAMESPACE|DOCKER_HOST|DOCKER_CONTEXT|DOCKER_CONFIG|CONTAINER_HOST|CONTAINER_CONNECTION)=/;
   565	/** `git -C /repo …`, `docker --context prod …`, `DOCKER_HOST=… docker …` (w: the unwrapped words, raw: before unwrap). */
   566	function scopedElsewhere(w, raw) {
   567	  if (isAmbiguous(w[0])) return false;
   568	  const head = String(w[0]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
   569	  const re = SCOPE_OPTS[head];
   570	  if (!re) return false;
   571	  if (raw.slice(0, raw.length - w.length).some((x) => SCOPE_ENV.test(String(x)))) return true;
   572	  const args = w.slice(1);
   573	  return args.slice(0, args.length - afterGlobals(head, args).length).some((a) => re.test(String(a)));
   574	}
   575	/** The values of a scoped command (scopedElsewhere) as ambiguous: they name things in another repository / daemon. */
   576	function markScoped(o) {
   577	  for (const x of Object.keys(o)) if (o[x] != null && typeof o[x] !== 'boolean' && !isAmbiguous(o[x])) o[x] = AMB + rawOf(o[x]);
   578	}
   579	/** The arguments after the global options of git/docker/podman (`git -C /tmp status` -> ['status']); other heads: unchanged. */
   580	function afterGlobals(head, args) {
   581	  const vo = GLOBAL_VALUE_OPTS[head];
   582	  if (!vo) return args;
   583	  let i = 0;
   584	  while (i < args.length && /^-/.test(args[i]) && args[i] !== '--') i += vo.has(args[i]) ? 2 : 1;
   585	  if (args[i] === '--') i++;
   586	  return args.slice(i);
   587	}
   588	function listedBySegment(w, pipedIn, k) {
   589	  const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
   590	  const nonFlags = afterGlobals(head, w.slice(1)).filter((a) => !/^-/.test(a));
   591	  // `du -sh DIR` is the size of DIR itself; `du DIR` / `du -d 1 DIR` lists what is inside
   592	  if (head === 'du' && w.slice(1).some((a) => /^-[a-zA-Z]*s|^--summarize$/.test(a)) && !nonFlags.some(isGlob)) return [];
   593	  if (FS_LISTERS.has(head)) return ['file', 'dir'];
   594	  // grep reading a pipe filters what an earlier stage printed; reading files it lists matches
   595	  if (FS_SEARCHERS.has(head)) return pipedIn ? [] : ['file', 'dir'];
   596	  if (PROC_LISTERS.has(head)) return ['pid', 'proc'];
   597	  if (['ss', 'netstat', 'lsof', 'fuser', 'get-nettcpconnection'].includes(head)) return ['port', 'pid', 'proc'];
   598	  if (head === 'docker' || head === 'podman') {
   599	    const sub = nonFlags.slice(0, 2).join(' ');
   600	    return /^(?:ps|stats|container (?:ls|list|ps)|compose ps|top)\b/.test(sub) ? ['container'] : [];
   601	  }
   602	  if (head === 'systemctl') return !nonFlags.length || /^list-/.test(nonFlags[0]) || w.includes('--failed') ? ['service'] : [];
   603	  if (head === 'service') return w.includes('--status-all') ? ['service'] : [];
   604	  if (head === 'get-service' || head === 'gsv') return psArgs(w.slice(1)).pos.length || /-(?:name|displayname)\b/i.test(w.join(' ')) ? [] : ['service'];
   605	  if (head === 'git') {
   606	    const sub = nonFlags[0];
   607	    if (sub === 'branch') return nonFlags.length === 1 && !w.some((a) => /^-(?:d|D|m|M|c|C|-delete|-move|-copy)$/.test(a)) ? ['branch'] : [];
   608	    if (['grep', 'ls-files', 'status', 'clean'].includes(sub)) return ['file', 'dir'];
   609	  }
   610	  return [];
   611	}
   612	const LIST_INTENT = { docker_ps: ['container'], docker_ps_all: ['container'], docker_stats: ['container'], list_services: ['service'],
   613	  failed_services: ['service'], git_branches: ['branch'], git_status: ['file', 'dir'] };
   614	const LIST_FAMILY = { ls: ['file', 'dir'], find: ['file', 'dir'], grep: ['file', 'dir'], du: ['file', 'dir'], ps: ['pid', 'proc'], ss: ['port', 'pid', 'proc'] };
   615	/** Entity types a catalog intent prints many values of (for previous `tellsh <query>` lines). */
   616	const listedByIntent = (intent) => (intent ? LIST_INTENT[intent] || LIST_FAMILY[FAMILY_OF[intent]] || [] : []);
   617	
   618	// pipeline stages that filter the entries of a listing piped into them
   619	const FILTER_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag', 'findstr', 'select-string', 'sls', 'where-object', 'where', '?']);
   620	const GREP_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag']);
   621	
   622	// find/grep catalog intents: their path slot is where the search ran, not what it found
   623	const isSearchRoot = (intent, slots, ents) => ents.dir != null && ['find', 'grep'].includes(FAMILY_OF[intent]) && String(ents.dir) === String(slots.path);
   624	
   625	// the one operand of a command, or (several files: `touch a.txt b.txt`, `rm a b`) an ambiguous value: "delete them"
   626	// or "delete it" may mean any or all of them, never just the last one
   627	const oneOf = (ops) => (ops.length > 1 ? AMB + ops.map(rawOf).join(' ') : ops[0]);
   628	
   629	/** Entities of one simple command `w` (sudo/VAR= removed) into `e`. */
   630	function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
   631	  if (isAmbiguous(w[0])) {
   632	    if (w.slice(1).some((a) => PATHLIKE.test(rawOf(a)))) { e.file = AMB + w.join(' '); e.dir = AMB + w.join(' '); }
   633	    return;
   634	  }
   635	  const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '');
   636	  const args = afterGlobals(head, w.slice(1));
   637	  const nonFlags = args.filter((a) => !/^-/.test(a));
   638	  if (CD_HEADS.has(head.toLowerCase())) return; // handled by the caller
   639	  if ((k === 'pwsh' || PS_CMDLET.test(head)) && psNative(head.toLowerCase(), args, e, setIntent)) return;
   640	  if (head === 'docker') {
   641	    const sub = nonFlags[0];
   642	    if (sub === 'run') {
   643	      const i = args.indexOf('--name');
   644	      if (i >= 0 && args[i + 1]) e.container ??= args[i + 1];
   645	      const nm = args.find((a) => a.startsWith('--name='));
   646	      if (nm) e.container ??= nm.slice(7);
   647	    } else if (DOCKER_CT.has(sub)) {
   648	      const rest = args.slice(args.indexOf(sub) + 1);
   649	      for (let i = 0; i < rest.length; i++) {
   650	        if (DOCKER_VAL_FLAGS.has(rest[i])) { i++; continue; }
   651	        if (/^-/.test(rest[i])) continue;
   652	        e.container ??= rest[i];
   653	        break;
   654	      }
   655	      if (DOCKER_INTENT[sub] && e.container != null) setIntent(DOCKER_INTENT[sub], { container: e.container });
   656	    }
   657	  } else if (head === 'systemctl' || head === 'service') {
   658	    const svc = head === 'systemctl' ? nonFlags[1] : nonFlags[0];
   659	    const verb = head === 'systemctl' ? nonFlags[0] : nonFlags[1];
   660	    if (svc) e.service ??= svc.replace(/\.service$/, '');
   661	    if (SYSTEMCTL_INTENT[verb] && svc) setIntent(SYSTEMCTL_INTENT[verb], { service: e.service });
   662	  } else if (head === 'journalctl') {
   663	    const i = args.findIndex((a) => a === '-u' || a === '--unit');
   664	    if (i >= 0 && args[i + 1]) { e.service ??= args[i + 1].replace(/\.service$/, ''); setIntent('journal_service', { service: e.service }); }
   665	  } else if (head === 'kill') {
   666	    const { pos } = parseArgs(args, VALUE_OPTS.kill);
   667	    if (pos.length === 1 && /^\d+$/.test(pos[0])) { e.pid = pos[0]; setIntent('kill_by_pid', { pid: pos[0] }); }
   668	    else if (pos.length) e.pid = AMB + pos.map(rawOf).join(' '); // several PIDs or a job spec: not one process
   669	  } else if (['pkill', 'killall', 'pgrep', 'pidof'].includes(head)) {
   670	    const { pos } = parseArgs(args, VALUE_OPTS[head]);
   671	    if (pos.length === 1) e.proc = pos[0];
   672	    else if (pos.length > 1) e.proc = AMB + pos.map(rawOf).join(' ');
   673	    if (head === 'pgrep' && pos.length === 1) setIntent('find_process', { name: pos[0] });
   674	  } else if ((head === 'ps' || head === 'top' || head === 'htop') && args.some((a) => /^-\w*p$/.test(a))) {
   675	    const i = args.findIndex((a) => /^-\w*p$/.test(a));
   676	    const pid = (args[i + 1] || '').split(',')[0];
   677	    if (/^\d+$/.test(pid)) e.pid = pid;
   678	  } else if ((head === 'grep' || head === 'egrep') && split.segments.some((s, j) => j < segIdx && firstWord(s) === 'ps')) {
   679	    // ps aux | grep -v grep | grep node: the process is the pattern of a non-inverted grep
   680	    const { pos, opts, flags } = parseArgs(args, VALUE_OPTS.grep);
   681	    const inverted = flags.some((f) => /^-[a-zA-Z]*v/.test(f) || f === '--invert-match');
   682	    const pat = opts['-e'] ?? opts['--regexp'] ?? pos[0];
   683	    if (!inverted && pat != null) e.proc = pat;
   684	  } else if (GREP_HEADS.has(head) && nonFlags[0]) {
   685	    const { pos, opts, flags } = parseArgs(args, VALUE_OPTS[head] || VALUE_OPTS.grep);
   686	    const pat = opts['-e'] ?? opts['--regexp'] ?? pos[0];
   687	    const path = opts['-e'] != null || opts['--regexp'] != null ? pos[0] : pos[1];
   688	    if (pat != null) setIntent(flags.some((a) => /^-\w*l/.test(a)) ? 'grep_files_containing' : 'grep_text', { pattern: rawOf(pat), ...(path != null ? { path } : {}) });
   689	    if (path != null) {
   690	      const t = typeByExt(path);
   691	      e[t] = path;
   692	      if (t === 'dir') e.searchDir = true; // searched directory: the matches are inside it
   693	    }
   694	  } else if (head === 'lsof' || head === 'ss' || head === 'netstat' || head === 'fuser') {
   695	    const pm = args.map(rawOf).join(' ').match(/(?::|tcp:|udp:|sport = :)(\d{2,5})\b/);
   696	    if (pm) { e.port = pm[1]; setIntent('process_on_port', { port: pm[1] }); }
   697	  } else if (head === 'git') {
   698	    const sub = nonFlags[0];
   699	    const rest = args.slice(args.indexOf(sub) + 1);
   700	    if (sub === 'grep') {
   701	      // git grep [-l] PATTERN [DIR]: a search, its directory argument is only where it looked
   702	      const { pos, opts } = parseArgs(rest, VALUE_OPTS.grep);
   703	      const path = opts['-e'] != null ? pos[0] : pos[1];
   704	      if (path != null) { const t = typeByExt(path); e[t] = path; if (t === 'dir') e.searchDir = true; }
   705	      return;
   706	    }
   707	    if (sub === 'checkout' || sub === 'switch') {
   708	      const { pos, opts, after } = parseArgs(rest, VALUE_OPTS[sub]);
   709	      const created = opts['-b'] ?? opts['-B'] ?? opts['-c'] ?? opts['-C'] ?? opts['--create'] ?? opts['--force-create'] ?? opts['--orphan'];
   710	      if (after) {
   711	        // git checkout [<tree-ish>] -- <file>...: restores files, it does not switch branches
   712	        if (after.length) e.file = after.length === 1 ? after[0] : AMB + after.map(rawOf).join(' ');
   713	        return;
   714	      }
   715	      const b = created ?? pos[0];
   716	      if (b != null && b !== '.' && b !== '-' && !isAmbiguous(b) && !String(b).startsWith('-')) {
   717	        e.branch = b;
   718	        e.current = b;
   719	        if (created != null) e.created = b;
   720	      }
   721	    } else if (['merge', 'rebase'].includes(sub) || (sub === 'branch' && nonFlags[1])) {
   722	      const b = nonFlags[nonFlags.length - 1];
   723	      if (b && b !== sub && b !== '.' && !isGlob(b) && !b.startsWith('-')) e.branch = b;
   724	    } else if (sub === 'push' && nonFlags.length >= 2) e.branch = nonFlags[nonFlags.length - 1];
   725	    else if (sub === 'clone' && nonFlags[1]) e.url = nonFlags[1];
   726	    else if (['add', 'diff', 'blame', 'restore', 'rm', 'log'].includes(sub) && nonFlags[1] && nonFlags[1] !== '.') e.file = nonFlags[nonFlags.length - 1];
   727	  } else if (['ssh', 'ping', 'dig', 'nslookup', 'traceroute', 'mtr', 'host', 'telnet', 'nc'].includes(head)) {
   728	    const h = nonFlags.find((a) => /[\w-]+\.[\w.-]+|^[\w-]+@/.test(a)) || nonFlags[0];
   729	    if (h) e.host = h;
   730	  } else if (['curl', 'wget', 'http'].includes(head)) {
   731	    const u = args.find((a) => /^https?:\/\//.test(a));
   732	    if (u) {
   733	      e.url = u;
   734	      const base = u.replace(/[?#].*$/, '').split('/').pop();
   735	      const saves = head === 'wget' || args.some((a) => /^-\w*O/.test(a));
   736	      if (saves && /\.\w{1,5}$/.test(base)) e.file = base;
   737	    }
   738	  } else if (head === 'rm' || head === 'trash' || head === 'rmdir') {
   739	    const p = oneOf(nonFlags);
   740	    if (p) e[args.some((a) => /^-\w*r/i.test(a)) || head === 'rmdir' ? 'dir' : 'file'] = p;
   741	  } else if (head === 'cp' || head === 'mv' || head === 'ln') {
   742	    const { pos, opts } = parseArgs(args, VALUE_OPTS[head]);
   743	    const tdir = opts['-t'] ?? opts['--target-directory'];
   744	    if (tdir != null) destEnts(pos.length === 1 ? pos : [...pos, ''], String(tdir) + '/', e);
   745	    else if (pos.length >= 2) destEnts(pos.slice(0, -1), pos[pos.length - 1], e);
   746	  } else if (head === 'tar' || head === 'zip') {
   747	    const a = nonFlags.find((x) => /\.(tar(\.\w+)?|tgz|zip)$/.test(x));
   748	    if (a) e.file = a;
   749	  } else if (FILE_HEADS.has(head)) {
   750	    // operands: not a chmod mode, a chown owner, or a count (`head -n 5 a.txt`); a script and its arguments
   751	    // (`python3 script.py data.csv`) are several operands: "delete it" may mean either
   752	    let ops = nonFlags.filter((a) => !/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$|^\d+$/.test(a));
   753	    if (['chown'].includes(head)) ops = ops.slice(1);
   754	    const p = oneOf(ops);
   755	    if (p) e[/\/$/.test(rawOf(p)) ? 'dir' : 'file'] = p;
   756	  } else if (DIR_HEADS.has(head)) {
   757	    // find ROOT -name ...: the search root; other heads: the one directory argument (`ls /a /b`: ambiguous)
   758	    // (find's root is the operands before its first expression word: `find -name "*.o"` has none)
   759	    const p = head === 'find' ? args.slice(0, (args.findIndex((a) => /^[-(!]/.test(a)) + 1 || args.length + 1) - 1)[0] : oneOf(nonFlags.filter((a) => !isGlob(a) && !/^\d+$/.test(a)));
   760	    if (p) {
   761	      e.dir = p;
   762	      if (head === 'find') e.searchDir = true;
   763	      // `du DIR` / `du -d 1 DIR | sort -rh` lists the entries of DIR (`du -sh DIR` is DIR itself)
   764	      else if (['ls', 'tree', 'ncdu'].includes(head) || (head === 'du' && !args.some((a) => /^-[a-zA-Z]*s|^--summarize$/.test(a)))) e.listDir = true;
   765	    }
   766	    // `ls`, `ls *.pdf`: the working directory (a glob selects some of its entries)
   767	    else if (['ls', 'tree'].includes(head)) e.listCwd = nonFlags.some(isGlob) ? 'search' : 'list';
   768	  } else if (!INERT_HEADS.has(head.toLowerCase())) {
   769	    // unknown command (or unknown cmdlet) naming a path: we cannot tell what it did with it, so an
   770	    // older file/dir must not be picked up by "it"
   771	    const p = nonFlags.find((a) => PATHLIKE.test(rawOf(a)) && !/^\w+:\/\//.test(rawOf(a)));
   772	    if (p) e[typeByExt(p)] = AMB + rawOf(p);
   773	  }
   774	}
   775	
   776	const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];
   777	
   778	/**
   779	 * Build the context object from history commands (oldest first). Only the single most recent command is a
   780	 * reference target ("delete it", "same for /var", "there" always mean the previous command, never an older one);
   781	 * the running `tellsh <query>` line itself, which some shells write before it runs, is dropped first.
   782	 * kind: 'posix' | 'pwsh' (default: `cmds.kind` as set by loadHistory, else posix)
   783	 * -> { n, line, ents: {type: value}, entOrder, refOrder, searchRoots, listedDirs, last: {intent, slots, ambiguous, skipped, scoped},
   784	 *      pos, listing, cdDir, features }
   785	 *    values that could not be read unambiguously are kept as AMB-prefixed strings (see isAmbiguous).
   786	 *    Within the line (`cat old.txt; ls newdir`) later segments win: pos gives the segment of each value, and refOrder
   787	 *    ranks types by it (entOrder, which feeds the classifiers' ctx_ features, ranks by type only). searchRoots: the dir
   788	 *    is a find/grep root or a filtered/piped listing; listedDirs: a plain listing. last.skipped: a later segment of the
   789	 *    line ran after the repeatable command. listing: the segment of the newest listing of each entity type ({ seg });
   790	 *    cdDir: the dir is a `cd` target ({ value, followed }). changeGuard() uses these.
   791	 */
   792	export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
   793	  const k = kind || cmds.kind || 'posix';
   794	  const list = [...cmds];
   795	  // zsh (share_history / inc_append_history), fish and PSReadLine write the running line to the
   796	  // history file before it executes: the current `tellsh <query>` call is not the previous command. bash writes it
   797	  // only afterwards, so there an identical last line is an earlier call (`cmds.shell` as set by loadHistory)
   798	  if (query != null && list.length && cmds.shell !== 'bash') {
   799	    const norm = (x) => String(x).trim().replace(/\s+/g, ' ');
   800	    const q = tellshQuery(list[list.length - 1], k);
   801	    // exact match only: an earlier `tellsh` line whose text merely contains the query is the previous command
   802	    if (q != null && q !== false && norm(q) === norm(query)) list.pop();
   803	  }
   804	  const line = list.length ? list[list.length - 1] : null;
   805	  const a = line != null ? analyzeCommand(line, classify, k) : { ents: {}, at: {}, listed: {}, slots: {} };
   806	  const ents = {};
   807	  for (const t of ENT_TYPES) if (a.ents[t] != null) ents[t] = a.ents[t];
   808	  const pos = Object.fromEntries(Object.keys(ents).map((t) => [t, a.at?.[t] ?? 0]));
   809	  const dir = ents.dir != null ? String(ents.dir) : null;
   810	  const searchRoots = new Set(dir != null && a.searchDir ? [dir] : []);
   811	  const listedDirs = new Set(dir != null && a.listDir ? [dir] : []);
   812	  const listing = Object.fromEntries(Object.entries(a.listed || {}).map(([t, seg]) => [t, { seg }]));
   813	  const last = a.intent ? { intent: a.intent, slots: a.slots, ambiguous: !!a.ambiguous, skipped: !!a.intentStale, scoped: !!a.scoped } : null;
   814	  const current = a.ents.current && !isAmbiguous(a.ents.current) ? a.ents.current : null;
   815	  const cdDir = a.cdDir && dir != null ? { value: dir, followed: !!a.cdFollowed } : null;
   816	  const byType = (x, y) => ENT_TYPES.indexOf(x) - ENT_TYPES.indexOf(y);
   817	  const entOrder = Object.keys(ents).sort(byType);
   818	  const refOrder = Object.keys(ents).sort((x, y) => pos[y] - pos[x] || byType(x, y));
   819	  const ctx = { n: line != null ? 1 : 0, line, ents, currentBranch: current, entOrder, refOrder, searchRoots, listedDirs, last,
   820	    cwdFlags: cwdFlags(cwd), pos, listing, cdDir };
   821	  ctx.features = ctxFeatures(ctx);
   822	  return ctx;
   823	}
   824	
   825	export function cwdFlags(cwd) {
   826	  if (!cwd) return [];
   827	  const f = [];
   828	  try {
   829	    if (existsSync(join(cwd, '.git'))) f.push('git');
   830	    if (['docker-compose.yml', 'docker-compose.yaml', 'compose.yml', 'compose.yaml'].some((n) => existsSync(join(cwd, n)))) f.push('compose');
   831	  } catch { /* ignore */ }
   832	  return f;
   833	}
   834	
   835	/** ctx_ tokens fed to the classifiers (same function is used by scripts/gen_data.js). */
   836	export function ctxFeatures(ctx) {
   837	  const f = [];
   838	  if (ctx.entOrder?.[0]) f.push('ctx_last=' + ctx.entOrder[0]);
   839	  for (const k of ctx.entOrder || []) f.push('ctx_has=' + k);
   840	  if (ctx.last?.intent) f.push('ctx_tool=' + FAMILY_OF[ctx.last.intent]);
   841	  for (const c of ctx.cwdFlags || []) f.push('ctx_cwd=' + c);
   842	  return f;
   843	}
   844	
   845	// ---------------------------------------------------------------------------------------------
   846	// deterministic coreference rules
   847	
   848	const SAME_RES = [
   849	  /^\s*(?:and\s+|now\s+)?(?:do\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?(?:\s+but)?\s+(?:for|in|on|with|to|at)\s+(.+?)\s*[?!.]*$/i,
   850	  /^\s*(?:now|again|and)\s+(?:for|in|on|with)\s+(.+?)\s*[?!.]*$/i,
   851	  /^\s*(?:what|how)\s+about\s+(.+?)\s*[?!.]*$/i,
   852	  /^\s*(?:repeat|do it again|run it again)\s+(?:for|in|on|with)\s+(.+?)\s*[?!.]*$/i,
   853	  /^\s*(?:a\s+|i\s+)?(?:teraz\s+)?(?:to\s+)?samo\s+(?:dla|w|we|na|z|do|ale\s+dla|ale\s+w)\s+(.+?)\s*[?!.]*$/i,
   854	  /^\s*(?:a|i)\s+(?:teraz\s+)?(?:dla|w|we|na)\s+(.+?)\s*[?!.]*$/i,
   855	  /^\s*(?:tak samo|analogicznie|powt[oó]rz)\s+(?:dla|w|we|na)\s+(.+?)\s*[?!.]*$/i,
   856	  /^\s*(?:a\s+)?co\s+z\s+(.+?)\s*[?!.]*$/i,
   857	];
   858	
   859	// the forms that can only mean "repeat the previous command" (not "what about X" / "a w X")
   860	const EXPLICIT_SAME = [SAME_RES[0], SAME_RES[3], SAME_RES[4], SAME_RES[6]];

exec
/bin/bash -lc 'cat scripts/hybrid/export_data.js; cat scripts/lib/heldout.js; git diff 0d87457..HEAD -- scripts/gen_data.js; cat scripts/hybrid/train_lm_gpu.py' in /workspace/tellsh
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
/bin/bash -lc "node --input-type=module <<'EOF'
import {suggest} from './src/pipeline.js';
import {analyzeCommand} from './src/history.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const [h,q] of [['git -C/repo blame notes.txt','delete it'],['docker -Htcp://prod:2375 logs web','stop it'],['docker -cproduction logs web','stop it'],['systemctl --user status dbus','stop it'],['docker stop web api','stop it'],['git diff a.txt b.txt','delete them'],['ps -p 1111,2222','kill them'],['cat a.txt b.txt','delete them'],['git -c core.worktree=/repo blame notes.txt','delete it']]) { const r=suggest(q,{env,history:[h]});console.log(JSON.stringify({h,q,cmd:r.command,intent:r.intent,context:r.context,analysis:analyzeCommand(h)})); }
EOF" in /workspace/tellsh
 succeeded in 117ms:
{"h":"git -C/repo blame notes.txt","q":"delete it","cmd":"rm notes.txt","intent":"delete_file","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = notes.txt"},"analysis":{"line":"git -C/repo blame notes.txt","intent":null,"slots":{},"ents":{"file":"notes.txt"},"at":{"file":0},"ambiguous":false,"listed":{}}}
{"h":"docker -Htcp://prod:2375 logs web","q":"stop it","cmd":"docker stop web","intent":"docker_stop","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"container\" from history = web"},"analysis":{"line":"docker -Htcp://prod:2375 logs web","intent":"docker_logs","slots":{"container":"web"},"ents":{"container":"web"},"at":{"container":0},"ambiguous":false,"listed":{}}}
{"h":"docker -cproduction logs web","q":"stop it","cmd":"docker stop web","intent":"docker_stop","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"container\" from history = web"},"analysis":{"line":"docker -cproduction logs web","intent":"docker_logs","slots":{"container":"web"},"ents":{"container":"web"},"at":{"container":0},"ambiguous":false,"listed":{}}}
{"h":"systemctl --user status dbus","q":"stop it","cmd":"sudo systemctl stop dbus","intent":"service_stop","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"service\" from history = dbus"},"analysis":{"line":"systemctl --user status dbus","intent":"service_status","slots":{"service":"dbus"},"ents":{"service":"dbus"},"at":{"service":0},"ambiguous":false,"listed":{}}}
{"h":"docker stop web api","q":"stop it","cmd":"docker stop web","intent":"docker_stop","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"container\" from history = web"},"analysis":{"line":"docker stop web api","intent":"docker_stop","slots":{"container":"web"},"ents":{"container":"web"},"at":{"container":0},"ambiguous":false,"listed":{}}}
{"h":"git diff a.txt b.txt","q":"delete them","cmd":"rm b.txt","intent":"delete_file","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = b.txt"},"analysis":{"line":"git diff a.txt b.txt","intent":null,"slots":{},"ents":{"file":"b.txt"},"at":{"file":0},"ambiguous":false,"listed":{}}}
{"h":"ps -p 1111,2222","q":"kill them","cmd":"kill 1111","intent":"kill_by_pid","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pid\" from history = 1111"},"analysis":{"line":"ps -p 1111,2222","intent":null,"slots":{},"ents":{"pid":"1111"},"at":{"pid":0},"ambiguous":false,"listed":{"pid":0,"proc":0}}}
{"h":"cat a.txt b.txt","q":"delete them","cmd":"rm <FILE>","intent":"delete_file","context":{"used":true,"commands":1,"rule":"refused","note":"the latest file in history (a.txt b.txt) cannot be read unambiguously; not guessing"},"analysis":{"line":"cat a.txt b.txt","intent":null,"slots":{},"ents":{"file":"\u0000a.txt b.txt"},"at":{"file":0},"ambiguous":false,"listed":{}}}
{"h":"git -c core.worktree=/repo blame notes.txt","q":"delete it","cmd":"rm notes.txt","intent":"delete_file","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = notes.txt"},"analysis":{"line":"git -c core.worktree=/repo blame notes.txt","intent":null,"slots":{},"ents":{"file":"notes.txt"},"at":{"file":0},"ambiguous":false,"listed":{}}}

exec
/bin/bash -lc "nl -ba src/pipeline.js | sed -n '1,260p'; cat src/fill.js" in /workspace/tellsh
exec
/bin/bash -lc 'cat scripts/hybrid/train_encoder.py; cat scripts/hybrid/prune_vocab.py; cat scripts/hybrid/export_encoder.py' in /workspace/tellsh
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
    81	  pkg: (v) => WORDISH(v) || /^@[\w.-]{1,64}\/[\w.-]{1,64}(?:@[\w.^~<>=*-]{1,32})?$/.test(v),
    82	  branch: (v) => /^(?!-)[\w./-]{1,100}$/.test(v), user: (v) => /^[a-z_][\w.-]{0,31}$/i.test(v),
    83	  glob: (v) => /^\*\.[\w]{1,8}$/.test(v),
    84	  url: (v) => v.length < 2048 && (/^(?:https?|ftp|ftps|ssh|git|file):\/\/[^\s/?#]*[^\s]*$/i.test(v) || /^(?!-)[\w.-]+@[\w.-]+:[^\s]+$/.test(v)),
    85	  host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
    86	  pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
    87	  old: (v) => v.length > 0 && v.length < 300 && !/[\n\r\0]/.test(v), new: (v) => v.length < 300 && !/[\n\r\0]/.test(v),
    88	};
    89	const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
    90	// slots naming the one thing a command acts on, other than a path (not free text: pattern, message, glob, ...)
    91	const OPERAND_SLOT_NAMES = new Set(['name', 'service', 'container', 'pkg', 'host', 'target', 'branch', 'user', 'script', 'url', 'pid']);
    92	for (const k of PATH_SLOT_NAMES) if (k !== 'path') VALID_SLOT[k] = VALID_SLOT.path;
    93	export function validSlot(k, v) {
    94	  if (v == null || v === '') return false;
    95	  if (isAmbiguous(v)) return false;
    96	  if (RAW_OK[k]) return RAW_OK[k](v);
    97	  if (VALID_SLOT[k]) return VALID_SLOT[k](String(v));
    98	  return String(v).length < 300 && !/\0/.test(String(v));
    99	}
   100	/** Values recovered from history go through the same validation as classifier/regex values. */
   101	const validHistorySlots = (slots) => Object.fromEntries(Object.entries(slots || {}).filter(([k, v]) => ['namepat', 'sedexpr'].includes(k) || validSlot(k, v)));
   102	/** History slots that failed validation (too long, a newline, ...): withheld as placeholders, never the catalog default. */
   103	const invalidHistorySlots = (slots) => Object.keys(slots || {}).filter((k) => !['namepat', 'sedexpr'].includes(k) && slots[k] != null && !validSlot(k, slots[k]));
   104	
   105	/**
   106	 * Slot resolution: tagger is primary, regex is fallback + validator.
   107	 * -> { slots, sources: {slot: 'tagger'|'regex'}, spans }
   108	 */
   109	export function resolveWithTagger(intentId, text, { model = getModel(), tool, mode = 'merge', tagger } = {}) {
   110	  const intent = BY_ID[intentId];
   111	  const exR = extractSlots(text);
   112	  const rR = resolveSlots(intent, exR);
   113	  if (mode === 'regex') return { slots: rR, sources: Object.fromEntries(Object.keys(rR).map((k) => [k, 'regex'])), spans: [] };
   114	  // tagger: optional external slot tagger (hybrid encoder, src/rerank/) -> { spans }
   115	  const t = tagger ? tagger(text, tool || FAMILY_OF[intentId]) : tag(text, tool || FAMILY_OF[intentId], model);
   116	  const exT = exFromSpans(text, t.spans);
   117	  const rT = resolveSlots(intent, exT);
   118	  if (rT.archive && !exT.paths.includes(rT.archive)) delete rT.archive; // derived default, not a tagged value
   119	  if (mode === 'tagger') return { slots: rT, sources: Object.fromEntries(Object.keys(rT).map((k) => [k, 'tagger'])), spans: t.spans };
   120	  const slots = {};
   121	  const sources = {};
   122	  // a regex path that is only part of a tagged path word the tagger could not represent exactly
   123	  // (or a named location inside it) must not stand in for it: the slot stays empty (placeholder)
   124	  const partOfRejected = (v) => exT.rejectedPaths?.some((ch) => exR.spans.some((s) => s.type === 'PATH' && s.value === v && s.start < ch.end && ch.start < s.end && text.slice(s.start, s.end) !== ch.text));
   125	  for (const k of new Set([...Object.keys(rT), ...Object.keys(rR)])) {
   126	    if (k === 'namepat' || k === 'sedexpr') continue; // derived, recomputed below
   127	    if (validSlot(k, rT[k])) { slots[k] = rT[k]; sources[k] = 'tagger'; } else if (rR[k] != null && (validSlot(k, rR[k]) || !VALID_SLOT[k]) && !(PATH_SLOT_NAMES.has(k) && partOfRejected(rR[k]))) { slots[k] = rR[k]; sources[k] = 'regex'; }
   128	  }
   129	  // "delete the folder out", "du of folder out sorted by size": a stop word right after the noun is its name
   130	  for (const k of ['path', 'file']) {
   131	    if (!usesSlot(intent, k) || slots[k] != null) continue;
   132	    const v = namedStopWord(text, k);
   133	    if (v != null) { slots[k] = v; sources[k] = 'regex'; }
   134	    break;
   135	  }
   136	  // a path the tagger or regex read but that was rejected (a bare function word: "in the", "of it"; a name with a
   137	  // newline; part of a path the tagger could not represent), a location whose object is only function words, or a
   138	  // place named only by reference ("there", "tam", "in the same folder"): withheld, so the command shows a
   139	  // placeholder instead of the default `.`
   140	  // with a place reference the location is "there", never a word the request names ("remove the logs in there")
   141	  if (hasLocative(text) && slots.path != null && usesSlot(intent, 'path') && !usesSlot(intent, 'dst')) { delete slots.path; delete sources.path; }
   142	  const withheld = [];
   143	  for (const k of ['path', 'file']) {
   144	    if (!usesSlot(intent, k) || slots[k] != null) continue;
   145	    const rejected = [rT[k], rR[k]].some((v) => typeof v === 'string' && v !== '' && !validSlot(k, v)) || exT.rejectedPaths?.length > 0;
   146	    if (rejected || danglingLocation(text) || hasLocative(text)) withheld.push(k);
   147	    break;
   148	  }
   149	  // an operand the request names but that is not a valid value (`npm install @types/node;rm`): placeholder, never
   150	  // silently dropped from an optional part of the template (`npm install`)
   151	  const invalidOperands = [];
   152	  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user']) {
   153	    if (!usesSlot(intent, k) || slots[k] != null || withheld.includes(k)) continue;
   154	    if ([rT[k], rR[k]].some((v) => typeof v === 'string' && v !== '' && !validSlot(k, v))) { withheld.push(k); invalidOperands.push(k); }
   155	  }
   156	  finalizeSlots(intent, slots);
   157	  return { slots, sources, spans: t.spans, withheld, invalidOperands };
   158	}
   159	
   160	/** Explicit paths the request names (`/tmp/x`, `~/a`, `./b`, `"C:\\x"`, quoted names with a slash), in order, distinct. */
   161	function explicitPaths(text) {
   162	  const ex = extractSlots(text);
   163	  return (ex.pathsWithQuoted || []).filter((p) => typeof p === 'string' && !/[*?]/.test(p) && !/^\w+:\/\//.test(p) &&
   164	    (/^(?:~|\.{0,2}\/|[A-Za-z]:[\\/])/.test(p) || (ex.quoted.includes(p) && /[\\/]/.test(p))));
   165	}
   166	
   167	/** Every occurrence of `v` in `text` is inside backticks or `$(…)`: the value is the output of a command, not a name. */
   168	function insideSubstitution(text, v) {
   169	  if (!v) return false;
   170	  let found = false;
   171	  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) {
   172	    found = true;
   173	    const before = text.slice(0, i);
   174	    const ticks = (before.match(/`/g) || []).length % 2 === 1;
   175	    const open = before.lastIndexOf('$(');
   176	    const paren = open >= 0 && !before.slice(open).includes(')');
   177	    if (!ticks && !paren) return false;
   178	  }
   179	  return found;
   180	}
   181	
   182	/** `v` occurs in `text` only directly followed by punctuation that trimPathPunct removed (`/tmp/x!`). */
   183	function trailingPunctAfter(text, v) {
   184	  const at = [];
   185	  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) at.push(text.slice(i + v.length));
   186	  return at.length > 0 && at.every((after) => /^[.,;:!?)]+(?=\s|$)/.test(after));
   187	}
   188	
   189	/**
   190	 * `v` was read from a quoted string of the request that ends in a backslash while the same quote
   191	 * character appears again later (`"a\" -e evil"`): the user may have meant \" as an escaped quote,
   192	 * so where the text ends is unclear.
   193	 */
   194	function cutAtEscapedQuote(text, v) {
   195	  if (typeof v !== 'string' || !v.endsWith('\\')) return false;
   196	  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) {
   197	    const after = text.slice(i + v.length);
   198	    if (/^["'”`]/.test(after) && after.slice(1).includes(after[0] === '”' ? '"' : after[0])) return true;
   199	  }
   200	  return false;
   201	}
   202	const TEXT_SLOT_NAMES = ['pattern', 'message', 'text', 'name', 'old', 'new', 'service', 'container', 'pkg', 'cmd', 'branch', 'user'];
   203	
   204	const usesSlot = (intent, k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
   205	
   206	function flagTokens(cmd) {
   207	  const set = new Set();
   208	  for (const w of String(cmd).split(/\s+/)) {
   209	    if (/^-[A-Za-z]+$/.test(w) && !w.startsWith('--')) for (const c of w.slice(1)) set.add('-' + c);
   210	    else if (/^-/.test(w)) set.add(w.replace(/=.*$/, ''));
   211	    else if (/^[a-z]{3}$/.test(w)) set.add(w); // ps aux
   212	  }
   213	  return set;
   214	}
   215	
   216	/** Second pass input: paths, numbers, ... from the merged extraction for the composer. */
   217	function composeInput(text, model, tool, unclear = []) {
   218	  const ex = extractSlots(text);
   219	  const t = tag(text, tool, model);
   220	  const exT = exFromSpans(text, t.spans);
   221	  const merged = { ...ex };
   222	  if (exT.paths.length) merged.paths = exT.paths;
   223	  // paths followed by sentence punctuation (`/tmp/data!`): fine for a read-only command, but a composed
   224	  // command that changes something is never aimed at them (see blocksAmbiguous)
   225	  // the same for a path that is the output of a command (`on \`pwd\``, `$(pwd)`): the catalog withholds it too
   226	  // and a quoted argument that may be words of the request (joinArgs)
   227	  const amb = [...(merged.paths || []).filter((p) => trailingPunctAfter(text, p) || insideSubstitution(text, String(p))), ...unclear];
   228	  for (const k of ['count', 'size', 'duration', 'ext', 'mode']) if (exT[k] != null) merged[k] = exT[k];
   229	  const pattern = () => { const p = exT.tagged.PATTERN?.find((x) => !isOptionWord(x)) ?? ex.quoted[0] ?? pickArg('pattern', ex) ?? null; return cutAtEscapedQuote(text, p) ? null : p; };
   230	  const nameOf = (type) => exT.tagged[type]?.[0] ?? null;
   231	  return { ex: merged, pattern, nameOf, ambiguousPaths: amb };
   232	}
   233	/**
   234	 * A composed command that changes something and uses a path whose end is unclear (`chmod -R 777 /tmp/data!`).
   235	 * Composed commands always carry at least medium risk, so "changes something" is: a writing tool (chmod,
   236	 * tar) or anything the danger checker flags on its own (find -delete, git/docker subcommands, ...).
   237	 */
   238	const WRITING_TOOLS = new Set(['chmod', 'tar']);
   239	const blocksAmbiguous = (comp, amb) => !!comp && !comp.invalid && amb.some((p) => comp.command.includes(p)) &&
   240	  (WRITING_TOOLS.has(comp.tool) || checkDanger(comp.command, 'safe').risk !== 'safe');
   241	
   242	/**
   243	 * Pure function used by the CLI, eval and tests.
   244	 * opts: { shell, os, env, history: string[] (commands, oldest first), cwd, threshold, top, compose: 'auto'|'force'|'off',
   245	 *         slotMode: 'merge'|'tagger'|'regex', model, rerank, rerankTop (candidates the rerank hook sees; default top) }
   246	 */
   247	export function suggest(query, opts = {}) {
   248	  const model = opts.model || getModel();
   249	  const env = opts.env || detectEnv({ shell: opts.shell, os: opts.os });
   250	  const top = opts.top ?? 3;
   251	  const thr = opts.threshold ?? model.thresholds.accept;
   252	  const composeMode = opts.compose || 'auto';
   253	  // a NUL byte cannot be part of any command argument (and marks ambiguous values internally)
   254	  if (/\0/.test(String(query))) {
   255	    return { query, shell: env.shell, os: env.os, coreutils: env.coreutils, threshold: thr, context: { used: false }, understood: false, method: 'none',
   256	      confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: 'the request contains a NUL byte' };
   257	  }
   258	
   259	  // ---- context (history + cwd), in memory only ----
   260	  let ctx = null;
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

exec
/bin/bash -lc 'node test/regressions10.test.js' in /workspace/tellsh
 exited 1 in 428ms:
TAP version 13
# Subtest: major: a quoted argument mixing request words with a path or file name is unclear, not the path
not ok 1 - major: a quoted argument mixing request words with a path or file name is unclear, not the path
  ---
  duration_ms: 193.309281
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
  duration_ms: 86.99142
  ...
# Subtest: major: history values of a command scoped to another repository, directory or daemon are refused
ok 3 - major: history values of a command scoped to another repository, directory or daemon are refused
  ---
  duration_ms: 39.427697
  ...
# Subtest: minor: a script and its arguments are several operands
ok 4 - minor: a script and its arguments are several operands
  ---
  duration_ms: 4.78402
  ...
# Subtest: nit: bash does not write the running call first, so an identical last tellsh line is the previous command
ok 5 - nit: bash does not write the running call first, so an identical last tellsh line is the previous command
  ---
  duration_ms: 5.113788
  ...
# Subtest: minor: dd, cp, install, mv, ln -f, perl -i and chmod 000 onto a system file are critical
ok 6 - minor: dd, cp, install, mv, ln -f, perl -i and chmod 000 onto a system file are critical
  ---
  duration_ms: 3.372171
  ...
# Subtest: minor: an unclear argument blanks every operand slot it contains, not only path slots
ok 7 - minor: an unclear argument blanks every operand slot it contains, not only path slots
  ---
  duration_ms: 6.507325
  ...
# Subtest: major: A_dev excludes the hybrid dev split from every training source (OOD, tldr, anaphora too)
ok 8 - major: A_dev excludes the hybrid dev split from every training source (OOD, tldr, anaphora too)
  ---
  duration_ms: 5.601282
  ...
1..8
# tests 8
# suites 0
# pass 7
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 377.603802

exec
/bin/bash -lc "cat bin/tellsh.js; node bin/tellsh.js --json --shell bash --os linux delete 'folder /tmp/x'; node --input-type=module <<'EOF'
import {spawnSync} from 'node:child_process';
const r=spawnSync(process.execPath,['bin/tellsh.js','--json','--shell','bash','--os','linux','delete','folder /tmp/x'],{encoding:'utf8'}); console.log({status:r.status,error:r.error,stdout:r.stdout,stderr:r.stderr});
EOF" in /workspace/tellsh
 succeeded in 395ms:
#!/usr/bin/env node
import { main } from '../src/cli.js';

// `tellsh … | head -1`: a closed pipe is not an error
for (const s of [process.stdout, process.stderr]) s.on('error', (e) => { if (e.code === 'EPIPE') process.exit(process.exitCode ?? 0); throw e; });

main().then((code) => { process.exitCode = code; }, (err) => {
  console.error(`tellsh: ${err?.stack || err}`);
  process.exitCode = 1;
});
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
{
  status: 0,
  error: Error: spawnSync /usr/bin/node EPERM
      at Object.spawnSync (node:internal/child_process:1123:20)
      at spawnSync (node:child_process:877:24)
      at file:///workspace/tellsh/[eval1]:2:9
      at ModuleJob.run (node:internal/modules/esm/module_job:263:25)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
      at async ModuleLoader.eval (node:internal/modules/esm/loader:217:24)
      at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {
    errno: -1,
    code: 'EPERM',
    syscall: 'spawnSync /usr/bin/node',
    path: '/usr/bin/node',
    spawnargs: [
      'bin/tellsh.js',
      '--json',
      '--shell',
      'bash',
      '--os',
      'linux',
      'delete',
      'folder /tmp/x'
    ]
  },
  stdout: '',
  stderr: ''
}

exec
/bin/bash -lc "cat src/fill.js; nl -ba src/compose.js | sed -n '1,360p'" in /workspace/tellsh
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
     1	// Second pass (experimental): compose a command from a closed vocabulary when no catalog intent fits.
     2	//   1. command head = a tool from stage 1 (top-3), restricted to tools that have a flag vocabulary
     3	//   2. per tool, every flag has natural-language triggers (EN + PL, matched on folded stems) plus
     4	//      weak evidence from tldr-pages flag descriptions; flags whose trigger score >= 1 are selected
     5	//   3. slot values (paths, patterns, numbers, ...) come from the tagger/regex extraction
     6	//   4. validation: only flags from the tool's vocabulary, then `bash -n` syntax check
     7	// Composed commands are always at least medium risk and must be confirmed explicitly (never --yes).
     8	import { spawnSync } from 'node:child_process';
     9	import { readFileSync } from 'node:fs';
    10	import { foldKeepLength } from './slots.js';
    11	import { shQuote } from './render.js';
    12	import { checkDanger, maxRisk } from './danger.js';
    13	import { splitCommand, rawOf } from './shellwords.js';
    14	
    15	const fold = (s) => ' ' + foldKeepLength(String(s)).toLowerCase().replace(/[^a-z0-9.*/~+-]+/g, ' ') + ' ';
    16	// trigger matching ignores file names and paths ("words.txt" must not trigger wc -w, "tree.md" not --forest)
    17	const PATHISH = /(?:^|\s)(?:[~.]?\/\S*|\S+\/\S*|[\w-]+\.[A-Za-z0-9]{1,6}|\*\.\w+)(?=\s|$|[,;!?])/g;
    18	const foldReq = (s) => fold(String(s).replace(PATHISH, ' '));
    19	
    20	// trigger syntax: plain words/phrases are matched as stem prefixes at a word start ("szczegol" matches
    21	// "szczegolami"); a trailing "$" requires a whole word.
    22	const F = (flag, triggers, extra = {}) => ({ flag, triggers, ...extra });
    23	
    24	export const TOOLS = {
    25	  ls: {
    26	    head: 'ls', args: ['path'],
    27	    flags: [
    28	      F('-l', ['long', 'detail', 'details', 'permission', 'with size', 'owner', 'full info', 'szczegol', 'dlug', 'uprawnien', 'wlasciciel']),
    29	      F('-a', ['hidden', 'all files', 'dotfile', 'dot file', 'including hidden', 'ukryt', 'wszystkie pliki', 'z kropk']),
    30	      F('-t', ['by time', 'by date', 'modification time', 'modified time', 'newest', 'most recent', 'latest first', 'by modif', 'wg czasu', 'wedlug czasu', 'po czasie', 'wg daty', 'wedlug daty', 'po dacie', 'najnowsz', 'czasu modyfikacji', 'daty modyfikacji'], { group: 'sort' }),
    31	      F('-S', ['by size', 'largest first', 'biggest first', 'size order', 'sorted by size', 'wg rozmiaru', 'wedlug rozmiaru', 'po rozmiarze', 'najwieksze najpierw', 'od najwiekszego'], { group: 'sort' }),
    32	      F('-r', ['reverse', 'oldest first', 'ascending', 'smallest first', 'odwrot', 'najstarsz', 'rosnac', 'od najmniejsz', 'od najstarsz']),
    33	      F('-h', ['human', 'readable size', 'kb mb', 'czyteln', 'ludzk']),
    34	      F('-R', ['recursive', 'subdirector', 'subfolder', 'rekurenc', 'podkatalog', 'podfolder']),
    35	      F('-1', ['one per line', 'per line', 'single column', 'one column', 'jeden na linie', 'po jednym', 'w jednej kolumnie', 'jedna kolumna']),
    36	      F('-d', ['directory itself', 'not its contents', 'not the contents', 'sam katalog', 'nie zawartosc']),
    37	      F('-i', ['inode', 'i-wezl', 'i-node']),
    38	      F('-U', ['unsorted', 'no sorting', 'without sorting', 'directory order', 'bez sortowania', 'nieposortowan']),
    39	    ],
    40	  },
    41	  find: {
    42	    head: 'find', args: ['path'], filters: true,
    43	    flags: [
    44	      F('-type f', ['files$', 'file$', 'pliki$', 'plikow$', 'plik$', 'only files', 'tylko pliki'], { group: 'type' }),
    45	      F('-type d', ['director', 'folder', 'katalog', 'dirs$'], { group: 'type' }),
    46	      F('-type l', ['symlink', 'symbolic link', 'dowiazan', 'link symbol'], { group: 'type' }),
    47	      F('-empty', ['empty', 'pust']),
    48	      F('-maxdepth', ['depth', 'levels deep', 'level', 'not recursive', 'top level only', 'glebok', 'poziom', 'bez podkatalog'], { value: 'depth' }),
    49	      F('-iname', ['case insensitive', 'ignore case', 'ignoring case', 'bez wzgledu na wielkosc', 'wielkosc liter']),
    50	      F('-newer', ['newer than', 'nowsze niz', 'nowszych niz', 'nowszy niz'], { value: 'newer' }),
    51	      F('-print0', ['null separated', 'print0']),
    52	      F('-executable', ['executable', 'wykonywaln']),
    53	      F('-user', ['owned by', 'belonging to', 'of user', 'nalezace do', 'uzytkownika', 'wlasciciel'], { value: 'user' }),
    54	      F('-name', ['named', 'called', 'nazwan', 'o nazwie', 'nazywaj'], { value: 'fname' }),
    55	    ],
    56	  },
    57	  grep: {
    58	    head: 'grep', args: ['pattern', 'path'],
    59	    flags: [
    60	      F('-i', ['case insensitive', 'case-insensitive', 'ignore case', 'ignoring case', 'any case', 'regardless of case', 'bez wzgledu na wielkosc', 'wielkosc liter', 'wielkosci liter', 'bez rozrozniania', 'ignoruj wielkosc', 'niezaleznie od wielkosci']),
    61	      F('-n', ['line number', 'numbers of lines', 'with numbers', 'numerami linii', 'numer linii', 'numery linii', 'numerem linii', 'z numerami']),
    62	      F('-r', ['recursive', 'subdirector', 'all files in', 'rekurenc', 'podkatalog', 'w calym katalogu', 'w katalogu$']),
    63	      F('-l', ['only file names', 'only filenames', 'file names only', 'which files', 'list files', 'names of files', 'tylko nazwy plikow', 'nazwy plikow', 'ktore pliki'], { group: 'out' }),
    64	      F('-c', ['count', 'how many lines', 'number of matching', 'ile linii', 'policz', 'zlicz', 'liczba', 'ile razy', 'trafien'], { group: 'out' }),
    65	      F('-v', ['invert', 'not containing', "don't contain", 'do not contain', 'not matching', 'excluding', 'which are not', 'that are not', 'nie zawieraj', 'bez slowa', 'ktore nie', 'odwroc dopasowan']),
    66	      F('-w', ['whole word', 'exact word', 'full word', 'cale slowo', 'calych slow', 'jako slowo']),
    67	      F('-o', ['only the match', 'only matching', 'just the match', 'tylko dopasowan', 'samo dopasowan']),
    68	      F('-E', ['regex', 'extended', 'regular expression', 'wyrazenie regularn']),
    69	      F('-A', ['lines after', 'after each match', 'after every match', 'linii po', 'linie po', 'po kazdym'], { value: 'ctx' }),
    70	      F('-B', ['lines before', 'before each match', 'before every match', 'linii przed', 'linie przed', 'przed kazdym'], { value: 'ctx' }),
    71	      F('-C', ['context', 'around each match', 'around every match', 'kontekst', 'wokol'], { value: 'ctx' }),
    72	      F('-h', ['without filename', 'no filename', 'without file name', 'bez nazw plikow', 'bez nazwy pliku']),
    73	    ],
    74	  },
    75	  du: {
    76	    head: 'du', args: ['path'],
    77	    flags: [
    78	      F('-s', ['total', 'summary', 'summar', 'only the total', 'one number', 'lacznie', 'laczny', 'suma', 'podsumow', 'calkowit']),
    79	      F('-h', ['human', 'readable', 'czyteln', 'ludzk'], { group: 'unit' }),
    80	      F('-m', ['megabyte', 'in mb', 'megabajt', 'w mb'], { group: 'unit' }),
    81	      F('-k', ['kilobyte', 'in kb', 'kilobajt', 'w kb'], { group: 'unit' }),
    82	      F('-a', ['all files', 'every file', 'files too', 'including files', 'kazdy plik', 'wszystkie pliki', 'takze pliki', 'rowniez pliki']),
    83	      F('-c', ['grand total', 'total at the end', 'suma na koncu', 'podsumowanie na koncu']),
    84	      F('-d', ['depth', 'level', 'levels', 'each subdirectory', 'every subdirectory', 'glebok', 'poziom', 'kazdego podkatalogu'], { value: 'depth' }),
    85	      F('-x', ['one filesystem', 'same filesystem', 'jeden system plikow', 'tym samym systemie plikow']),
    86	    ],
    87	  },
    88	  df: {
    89	    head: 'df', args: ['path'],
    90	    flags: [
    91	      F('-h', ['human', 'readable', 'gb', 'czyteln', 'ludzk']),
    92	      F('-t', [], { value: 'fstype', detect: /\s(ext[234]|xfs|btrfs|tmpfs|nfs4?|vfat|ntfs|zfs|apfs|overlay|squashfs)\s/ }),
    93	      F('-T', ['with type', 'filesystem type', 'types', 'z typem', 'typy system', 'typ systemu']),
    94	      F('-i', ['inode', 'i-node']),
    95	      F('-l', ['local only', 'only local', 'tylko lokaln']),
    96	    ],
    97	  },
    98	  ps: {
    99	    head: 'ps', args: [],
   100	    flags: [
   101	      F('aux', ['all processes', 'every process', 'all users', 'with users', 'wszystkie procesy', 'kazdy proces', 'wszystkich uzytkownik'], { group: 'sel' }),
   102	      F('-ef', ['full format', 'full listing', 'ppid', 'parent', 'pelny format', 'rodzic'], { group: 'sel' }),
   103	      F('--forest', ['tree', 'forest', 'hierarch', 'drzew']),
   104	      F('--sort=-%mem', ['by memory', 'by mem', 'by ram', 'most memory', 'wg pamieci', 'wedlug pamieci', 'po pamieci', 'najwiecej pamieci', 'wg ram'], { group: 'sort' }),
   105	      F('--sort=-%cpu', ['by cpu', 'most cpu', 'wg cpu', 'wedlug cpu', 'po cpu', 'procesora'], { group: 'sort' }),
   106	      F('-u', ['owned by', 'of user', 'for user', 'uzytkownika', 'nalezace do'], { value: 'user' }),
   107	    ],
   108	  },
   109	  tar: {
   110	    head: 'tar', args: ['archive', 'path'],
   111	    flags: [
   112	      F('-c', ['create', 'pack', 'compress', 'archive', 'utworz', 'spakuj', 'stworz', 'zrob archiwum', 'skompresuj'], { group: 'op' }),
   113	      F('-x', ['extract', 'unpack', 'decompress', 'rozpakuj', 'wypakuj', 'rozpakowac', 'wypakowac'], { group: 'op' }),
   114	      F('-t', ['list', 'contents', 'what is in', "what's in", 'show files in', 'zawartosc', 'wylistuj', 'co jest w', 'lista plikow'], { group: 'op' }),
   115	      F('-z', [], { compress: /\.(tar\.gz|tgz)$/ }),
   116	      F('-j', [], { compress: /\.(tar\.bz2|tbz2?)$/ }),
   117	      F('-J', [], { compress: /\.(tar\.xz|txz)$/ }),
   118	      F('-v', ['verbose', 'verbosely', 'show progress', 'szczegol', 'gadatliw', 'pokazuj pliki']),
   119	      F('-f', [], { always: true }),
   120	      F('-C', ['into', 'to directory', 'do katalogu', 'do folderu', 'w katalogu docelowym'], { value: 'dest' }),
   121	    ],
   122	  },
   123	  sort: {
   124	    head: 'sort', args: ['file'],
   125	    flags: [
   126	      F('-r', ['reverse', 'descending', 'largest first', 'highest first', 'malejaco', 'odwrot', 'od najwieksz']),
   127	      F('-n', ['numeric', 'numerically', 'as numbers', 'numeryczn', 'liczbowo', 'jak liczby']),
   128	      F('-h', ['human readable', 'human-readable', 'sizes like', 'czytelne rozmiary']),
   129	      F('-u', ['unique', 'deduplicate', 'without duplicates', 'remove duplicates', 'unikal', 'bez duplikat', 'usun duplikat']),
   130	      F('-f', ['ignore case', 'case insensitive', 'bez wzgledu na wielkosc']),
   131	      F('-t', ['separated by', 'delimiter', 'separator', 'oddzielon', 'rozdzielon'], { value: 'sep' }),
   132	      F('-k', ['column', 'field', 'kolumn', 'pole', 'polu'], { value: 'column' }),
   133	    ],
   134	  },
   135	  head: {
   136	    head: 'head', args: ['file'],
   137	    flags: [F('-c', ['bytes', 'bajt'], { value: 'count' }), F('-n', [], { value: 'count', implied: true })],
   138	  },
   139	  tail: {
   140	    head: 'tail', args: ['file'],
   141	    flags: [
   142	      F('-c', ['bytes', 'bajt'], { value: 'count' }),
   143	      F('-n', [], { value: 'lines', implied: true }),
   144	      F('-f', ['follow', 'live', 'watch', 'as it grows', 'na biezaco', 'na zywo', 'sledz', 'obserwuj']),
   145	    ],
   146	  },
   147	  wc: {
   148	    head: 'wc', args: ['file'],
   149	    flags: [
   150	      F('-l', ['lines', 'line count', 'linii', 'linie', 'wierszy']),
   151	      F('-w', ['words', 'word count', 'slow', 'wyrazow']),
   152	      F('-c', ['bytes', 'bajt']),
   153	      F('-m', ['characters', 'chars', 'znakow', 'znaki']),
   154	      F('<', ['without filename', 'without the filename', 'without file name', 'no filename', 'just the number', 'only the number', 'bez nazwy pliku', 'sama liczba', 'tylko liczb']),
   155	    ],
   156	  },
   157	  git: {
   158	    head: 'git', sub: {
   159	      log: { triggers: ['log', 'history', 'commits', 'historia', 'historie', 'commity', 'commitow'], args: [],
   160	        flags: [
   161	          F('--oneline', ['one line', 'oneline', 'compact', 'short', 'jednej linii', 'jedna linia', 'w skrocie', 'zwiezl']),
   162	          F('--graph', ['graph', 'tree', 'graf', 'drzew']),
   163	          F('-n', ['last', 'latest', 'recent', 'ostatni'], { value: 'count' }),
   164	          F('--author', ['by author', 'author', 'autor', 'from user', 'commits by', 'commity od', 'commity uzytkownika'], { value: 'author' }),
   165	          F('--stat', ['stat', 'changed files', 'files changed', 'statyst', 'zmienione pliki']),
   166	          F('-p', ['patch', 'with diff', 'with changes', 'z diffem', 'ze zmianami']),
   167	          F('--all', ['all branches', 'wszystkich galezi', 'wszystkie galezie']),
   168	          F('--decorate', ['decorate', 'with refs', 'tags and branches']),
   169	          F('--reverse', ['oldest first', 'reverse', 'chronolog', 'od najstarsz']),
   170	          F('--merges', ['only merges', 'merge commits', 'tylko merge']),
   171	          F('--no-merges', ['without merges', 'no merges', 'bez merge']),
   172	        ] },
   173	      branch: { triggers: ['branch', 'branches', 'galez', 'galezi', 'branche', 'branchy'], args: [],
   174	        flags: [
   175	          F('-a', ['all', 'including remote', 'wszystkie', 'z zdalnymi', 'lacznie ze zdalnymi'], { group: 'sel' }),
   176	          F('-r', ['remote only', 'only remote', 'remote branches', 'tylko zdalne', 'zdalne galezie'], { group: 'sel' }),
   177	          F('-v', ['verbose', 'last commit', 'with commit', 'ostatnim commitem', 'z commitem', 'szczegol']),
   178	          F('--merged', ['merged', 'zmergowane', 'scalone']),
   179	          F('--no-merged', ['not merged', 'unmerged', 'niezmergowane', 'nie scalone', 'niescalone']),
   180	        ] },
   181	      diff: { triggers: ['diff', 'changes', 'changed', 'difference', 'zmiany', 'zmienion', 'roznice', 'roznica'], args: ['ref'],
   182	        flags: [
   183	          F('--staged', ['staged', 'cached', 'index', 'w indeksie', 'staged', 'dodane']),
   184	          F('--stat', ['stat', 'summary', 'which files', 'statyst', 'podsumow', 'ktore pliki']),
   185	          F('--name-only', ['names only', 'only names', 'file names', 'tylko nazwy', 'nazwy plikow']),
   186	          F('-w', ['ignore whitespace', 'ignoring whitespace', 'bez bialych znakow', 'ignoruj biale']),
   187	          F('--word-diff', ['word diff', 'by word', 'per word', 'slowami', 'po slowach']),
   188	        ] },
   189	      status: { triggers: ['status', 'stan'], args: [],
   190	        flags: [F('-s', ['short', 'compact', 'krotk', 'zwiezl']), F('-b', ['branch', 'galez'])] },
   191	    },
   192	  },
   193	  docker: {
   194	    head: 'docker', sub: {
   195	      ps: { triggers: ['container', 'kontener', 'ps$', 'running'], args: [],
   196	        flags: [
   197	          F('-a', ['all', 'stopped', 'including stopped', 'wszystkie', 'zatrzymane']),
   198	          F('-q', ['only ids', 'ids only', 'just ids', 'only the ids', 'only their ids', 'quiet', 'tylko id', 'tylko ich id', 'same id', 'identyfikator']),
   199	          F('-s', ['size', 'sizes', 'rozmiar']),
   200	          F("--format '{{.Names}}'", ['only names', 'only their names', 'names only', 'just the names', 'tylko nazwy', 'tylko ich nazwy', 'same nazwy']),
   201	          F('--no-trunc', ['full', 'not truncated', 'no trunc', 'untruncated', 'pelne', 'nieobciet', 'bez obcinania']),
   202	          F('-l', ['latest', 'last created', 'most recent', 'ostatnio utworzony', 'najnowszy']),
   203	          F('-n', ['last', 'ostatnie'], { value: 'count' }),
   204	        ] },
   205	      images: { triggers: ['image', 'obraz'], args: [],
   206	        flags: [
   207	          F('-a', ['all', 'intermediate', 'wszystkie', 'posrednie']),
   208	          F('-q', ['only ids', 'ids only', 'just ids', 'only their ids', 'quiet', 'tylko id', 'tylko ich id', 'same id', 'identyfikator']),
   209	          F('--no-trunc', ['full', 'not truncated', 'pelne', 'bez obcinania']),
   210	          F('--digests', ['digest', 'skrot']),
   211	        ] },
   212	    },
   213	  },
   214	  ss: {
   215	    head: 'ss', args: [],
   216	    flags: [
   217	      F('-t', ['tcp']), F('-u', ['udp']), F('-l', ['listening', 'listen', 'nasluch']),
   218	      F('-n', ['numeric', 'numbers', "don't resolve", 'no dns', 'numerycz', 'bez rozwiazywania']),
   219	      F('-p', ['process', 'pid', 'program', 'proces']), F('-a', ['all', 'wszystkie']),
   220	      F('-s', ['summary', 'statistics', 'podsumow', 'statyst']),
   221	    ],
   222	  },
   223	  journalctl: {
   224	    head: 'journalctl', args: [],
   225	    flags: [
   226	      F('-u', ['service', 'unit', 'uslug', 'serwis'], { value: 'name' }),
   227	      F('-f', ['follow', 'live', 'na biezaco', 'na zywo', 'sledz']),
   228	      F('-n', ['last', 'lines', 'ostatni', 'linii'], { value: 'count' }),
   229	      F('-b', ['this boot', 'current boot', 'since boot', 'od startu', 'od uruchomienia', 'biezacego rozruchu']),
   230	      F('-k', ['kernel', 'jadr']),
   231	      F('-r', ['reverse', 'newest first', 'odwrot', 'najnowsze najpierw']),
   232	      F('-p err', ['error', 'errors', 'bled', 'bledy']),
   233	      F('--since', ['since', 'last', 'from', 'od', 'ostatni'], { value: 'since' }),
   234	      F('--no-pager', [], { always: true }),
   235	    ],
   236	  },
   237	  curl: {
   238	    head: 'curl', args: ['url'],
   239	    flags: [
   240	      F('-I', ['headers', 'head request', 'naglowk'], { group: 'm' }),
   241	      F('-L', ['follow redirect', 'redirects', 'przekierowan']),
   242	      F('-s', ['silent', 'quiet', 'cicho', 'bez paska']),
   243	      F('-O', ['download', 'save', 'pobierz', 'zapisz'], { group: 'out' }),
   244	      F('-v', ['verbose', 'debug', 'szczegol']),
   245	      F('-k', ['insecure', 'ignore certificate', 'self-signed', 'bez weryfikacji', 'ignoruj certyfikat']),
   246	      F('--compressed', ['compressed', 'gzip', 'kompresj']),
   247	    ],
   248	  },
   249	  chmod: {
   250	    head: 'chmod', args: ['mode', 'path'],
   251	    flags: [F('-R', ['recursive', 'recursively', 'everything inside', 'rekurenc', 'wszystko w srodku', 'cal']), F('-v', ['verbose', 'szczegol'])],
   252	  },
   253	};
   254	
   255	// tldr-derived weak triggers: { head: { flag: [stems] } } (CC-BY-4.0 tldr-pages, see DATA_LICENSES.md)
   256	let TLDR = null;
   257	function tldrTriggers() {
   258	  if (TLDR) return TLDR;
   259	  try { TLDR = JSON.parse(readFileSync(new URL('../model/tldr_triggers.json', import.meta.url), 'utf8')); } catch { TLDR = {}; }
   260	  return TLDR;
   261	}
   262	
   263	const FAMILY_TOOL = { ls: 'ls', find: 'find', grep: 'grep', du: 'du', df: 'df', ps: 'ps', tar: 'tar', sort: 'sort',
   264	  head: 'head', tail: 'tail', wc: 'wc', git: 'git', docker: 'docker', ss: 'ss', journalctl: 'journalctl', curl: 'curl', chmod: 'chmod' };
   265	export const composerTools = () => Object.keys(FAMILY_TOOL);
   266	
   267	function triggerScore(fq, triggers) {
   268	  let best = 0;
   269	  for (const t of triggers) {
   270	    const whole = t.endsWith('$');
   271	    const w = foldKeepLength(whole ? t.slice(0, -1) : t).toLowerCase();
   272	    const re = new RegExp(`\\s${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${whole ? '\\s' : ''}`);
   273	    if (re.test(fq)) best = Math.max(best, 1 + Math.min(w.length, 20) / 100);
   274	  }
   275	  return best;
   276	}
   277	const STOP = new Set('the a an of in on to for and or with by from all show list display me my files file plik pliki w z na do i oraz pokaz wyswietl'.split(' '));
   278	function tldrScore(fq, stems) {
   279	  if (!stems?.length) return 0;
   280	  const toks = new Set(fq.trim().split(/\s+/).filter((t) => t.length > 2 && !STOP.has(t)).map((t) => t.slice(0, 5)));
   281	  let hit = 0;
   282	  for (const s of stems) if (toks.has(s)) hit++;
   283	  return hit >= 2 ? 0.5 * hit : 0;
   284	}
   285	
   286	function selectFlags(fq, spec, head, sub) {
   287	  const tl = tldrTriggers()[head + (sub ? ' ' + sub : '')] || {};
   288	  const scored = spec.flags.map((f) => ({ ...f, score: f.always || f.implied || f.compress ? 1 : f.detect?.test(fq) ? 1.2 : triggerScore(fq, f.triggers) + tldrScore(fq, tl[f.flag]) }))
   289	    .filter((f) => f.score >= 1);
   290	  // one flag per exclusive group (highest score, then earliest in vocabulary)
   291	  const out = [];
   292	  const groups = new Set();
   293	  for (const f of scored.sort((a, b) => b.score - a.score)) {
   294	    if (f.group) { if (groups.has(f.group)) continue; groups.add(f.group); }
   295	    out.push(f);
   296	  }
   297	  return out.sort((a, b) => spec.flags.indexOf(spec.flags.find((x) => x.flag === a.flag)) - spec.flags.indexOf(spec.flags.find((x) => x.flag === b.flag)));
   298	}
   299	
   300	/** Flags whose triggers fire for this request with `toolFamily`'s vocabulary (used to build the explained-flags table). */
   301	export function triggeredFlags(query, toolFamily) {
   302	  const tn = FAMILY_TOOL[toolFamily];
   303	  if (!tn) return [];
   304	  const fq = foldReq(query);
   305	  const spec = TOOLS[tn];
   306	  const subs = spec.sub ? Object.entries(spec.sub) : [[null, spec]];
   307	  const out = [];
   308	  for (const [sub, fspec] of subs) {
   309	    for (const f of selectFlags(fq, fspec, spec.head, sub)) if (!f.always && !f.implied && !f.compress) out.push((sub ? sub + ' ' : '') + f.flag);
   310	  }
   311	  return out;
   312	}
   313	
   314	/** First `$(`, `${`, `$((`, backtick, `<(` or `>(` that the shell would expand (i.e. not inside '…'), or null. */
   315	function expansionOutsideSingleQuotes(cmd) {
   316	  const s = String(cmd);
   317	  let dq = false;
   318	  for (let i = 0; i < s.length; i++) {
   319	    const c = s[i];
   320	    if (c === '\\') { i++; continue; }
   321	    if (c === "'" && !dq) { const j = s.indexOf("'", i + 1); if (j < 0) return 'an unterminated quote'; i = j; continue; }
   322	    if (c === '"') { dq = !dq; continue; }
   323	    if (c === '`') return 'a backtick';
   324	    if (c === '$' && /[({]/.test(s[i + 1] || '')) return s.slice(i, i + 2);
   325	    if (!dq && (c === '<' || c === '>') && s[i + 1] === '(') return s.slice(i, i + 2);
   326	  }
   327	  return null;
   328	}
   329	
   330	/**
   331	 * Validate a composed command: every option must come from the tool vocabulary, every operand that could be
   332	 * read as an option is rejected (values are checked after shell unquoting, so a quoted '--use-compress-program=…'
   333	 * is caught too; anything after `--` is an operand), value flags need an operand, and POSIX syntax via `bash -n`.
   334	 */
   335	export function validateComposed(cmd, toolName, sub) {
   336	  const spec = TOOLS[toolName];
   337	  const fl = sub ? spec.sub[sub].flags : spec.flags;
   338	  const vocab = new Set(fl.flatMap((f) => f.flag.split(' ')[0]));
   339	  if (spec.filters) for (const x of ['-name', '-iname', '-mtime', '-mmin', '-size', '-type', '-maxdepth', '-empty', '-newer', '-print0', '-user']) vocab.add(x);
   340	  const needsArg = new Set(fl.filter((f) => f.value && !f.flag.startsWith('--')).map((f) => f.flag));
   341	  if (spec.filters) for (const x of ['-name', '-iname', '-mtime', '-mmin', '-size', '-type', '-maxdepth', '-newer', '-user']) needsArg.add(x);
   342	  const subst = expansionOutsideSingleQuotes(cmd);
   343	  if (subst) return { ok: false, error: `contains ${subst} (command substitution / expansion is never composed)` };
   344	  const r = splitCommand(cmd, 'posix', { keepRedirects: true });
   345	  if (!r.ok || r.segments.length !== 1) return { ok: false, error: 'not a single simple command' };
   346	  const words = r.segments[0].words.map(rawOf);
   347	  let ddash = false;
   348	  for (let i = sub ? 2 : 1; i < words.length; i++) {
   349	    const w = words[i];
   350	    if (ddash) continue;
   351	    if (w === '--') { ddash = true; continue; }
   352	    if (w === '<') { i++; continue; } // stdin redirect (wc < file)
   353	    if (needsArg.has(w)) {
   354	      const next = words[i + 1];
   355	      if (next == null || (/^-/.test(next) && !/^[-+]\d/.test(next))) return { ok: false, error: `${w} needs an operand` };
   356	      i++;
   357	      continue;
   358	    }
   359	    if (!/^-/.test(w)) continue;
   360	    const base = w.replace(/=.*$/, '');

exec
/bin/bash -lc "git diff 0d87457..HEAD -- src/history.js | sed -n '1,240p'; cat src/shellwords.js" in /workspace/tellsh
 succeeded in 0ms:
diff --git a/src/history.js b/src/history.js
index 1beb1e0..f8fce62 100644
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
@@ -263,178 +356,468 @@ function entsFromSlots(intent, slots, ents) {
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
+ * -> { line, intent, slots, ents, at, searchDir?, ambiguous, cd?, scoped?, fromTellsh?, opaque? }  (scoped: see scopedElsewhere)
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
+    const qa = tellshArgs(t, k);
+    // a request that cannot be read back: it may have named any file or directory
+    if (qa === false) return { line: t, intent, slots, ents: { file: AMB + t, dir: AMB + t }, at: {}, listed: { file: 0, dir: 0 }, opaque: true, fromTellsh: true, ambiguous: true };
+    const q = qa?.text;
+    const r = q && classify ? classify(q, qa.unclear) : null;
+    if (r?.intent) { intent = r.intent; slots = { ...(r.slots || {}) }; entsFromSlots(intent, slots, ents); }
+    // `tellsh list directory /tmp/build`: like `ls /tmp/build`, the user saw the entries of the directory
+    const sr = isSearchRoot(intent, slots, ents);
+    const ld = !sr && ents.dir != null && (FAMILY_OF[intent] === 'ls' || intent === 'largest_dirs');
+    const listed = Object.fromEntries(listedByIntent(intent).map((x) => [x, 0]));
+    return { line: t, intent, slots, ents, at: {}, listed, ...(sr ? { searchDir: true } : {}), ...(ld ? { listDir: true } : {}), fromTellsh: true, ambiguous };
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
/bin/bash -lc "cat scripts/hybrid/sets.js; cat scripts/hybrid/dump_cascade.js; sed -n '1,220p' scripts/hybrid/eval_hybrid.js; cat scripts/hybrid/fetch_model.js" in /workspace/tellsh
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
      const ks = ['all', r.lang, 'sh:' + env.shell, NEW_INTENTS.has(r.intent) ? 'new' : 'old'];
      if (r.literal !== undefined) ks.push(r.literal ? 'lit' : 'nat');
      for (const k of ks) {
        bump(k, 'n');
        if ((s.tool || FAMILY_OF[s.intent]) === famOf(r.intent)) bump(k, 'tool');
        if (s.understood && s.intent === r.intent) bump(k, 'intent');
        if (s.understood) { bump(k, 'ans'); if (s.intent === r.intent) bump(k, 'ansOk'); }
        if (s.hybrid?.deferred) bump(k, 'deferred');
      }
    }
    R[name][sys] = S;
  }
}
async function oodSet(name, rows) {
  R[name] = {};
  for (const sys of active) {
    let rej = 0; let n = 0;
    for (const r of rows) {
      const env = envOf(r);
      if (sys === 'C' && !LM_SAMPLE.has(key(r.text, env))) continue;
      const s = await run(sys, r.text, env);
      if (/C/.test(sys) && s.hybrid?.deferred && !LM.has(key(r.text, env))) continue;
      n++; if (!s.understood) rej++;
    }
    R[name][sys] = { n, rej };
  }
}
const SETS = [['eval', evalRows], ['shell', shellEval], ['blind', blind], ['blind_novel', blind.filter((r) => r.novel)],
  ['blind3', SET.blind3()], ['devtools', SET.devtools()]];
if (realRows.length) SETS.push(['real', realRows]);
for (const [n, rows] of SETS) { await clsSet(n, rows); console.error(`cls ${n} done ${((Date.now() - t0) / 1000).toFixed(0)}s`); }
await oodSet('ood', oodEval);
await oodSet('blind_ood', blindOod);
await oodSet('blind3_ood', SET.blind3_ood());
if (realOoc.length) await oodSet('real_ooc', realOoc);

// 1b. real usage, stage 3: slot values of correctly classified requests that occur in the real command, and exact
// (normalised) equality with the real command (real commands often carry extra flags, so this is a lower bound)
R.realSlots = {};
for (const sys of active.filter((x) => x !== 'C')) {
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

codex
I reproduced a gap in the scope guard: attached options such as `git -C/repo` and `docker -Htcp://prod:2375` still resolve to destructive commands in the current local scope. The full suite hit sandbox `EPERM` errors in subprocess-based tests, so I’m separating those failures from product findings.
exec
/bin/bash -lc "rg --files -uu build hybrid/models | head -60; nl -ba src/fill.js | sed -n '1,280p'; nl -ba src/pipeline.js | sed -n '252,405p'" in /workspace/tellsh
 succeeded in 0ms:
hybrid/models/enc-v1-old/vocab.json
hybrid/models/enc-v1-old/encoder.int8.onnx
hybrid/models/enc-v1-old/export_report.json
hybrid/models/enc-v1-old/manifest.json
hybrid/models/enc-v1-old/labels.json
hybrid/models/enc/vocab.json
hybrid/models/enc/encoder.int8.onnx
hybrid/models/enc/export_report.json
hybrid/models/enc/manifest.json
hybrid/models/enc/labels.json
build/eval_summary.json
build/teacher_results.jsonl
build/eval_npm.log
build/cls.jsonl
build/model_v04b.bin
build/bench_npm.log
build/jev_cache.jsonl
build/teacher/verify.jsonl
build/teacher_meta.json
build/adev.log
build/train_rows.jsonl
build/meta.json
build/eval_r9.log
build/adev_model_r8_before.bin
build/hybrid/run_enc.sh
build/hybrid/policy.json
build/hybrid/train_enc.log
build/hybrid/results_v04c.json
build/hybrid/results_v04b.json
build/hybrid/lm_ship_qwenft.jsonl
build/real/stats.json
build/real/rows.jsonl
build/hybrid/results_v04a.json
build/hybrid/results.json
build/hybrid/eval_after_ft.log
build/hybrid/lm_adev_qwenft.jsonl
build/hybrid/train.jsonl
build/hybrid/lm_score_dev.log
build/hybrid/lm_score_after.log
build/train_a.log
build/model_before.bin
build/model_v04a.bin
build/bench_r9.log
build/tag.jsonl
build/hybrid/meta.json
build/hybrid/policy_ft.json
build/hybrid/train_enc-v04-leak.log
build/adev/build/tag.jsonl
build/adev/test/regressions6.test.js
build/adev/build/train_rows.jsonl
build/adev/test/slot-cases.js
build/adev/build/meta.json
build/adev/test/regressions3-render.test.js
build/adev/build/cls.jsonl
build/adev/test/regressions9.test.js
build/adev/model/compose_explained.json
build/adev/test/danger.test.js
build/adev/model/model.bin
build/adev/test/regressions2.test.js
build/adev/model/tldr_triggers.json
     1	// Turn (intent, slots) into a concrete, safely-quoted command for the target shell.
     2	import { BY_ID } from './catalog.js';
     3	import { extractSlots, pickArg, pickDest, pickDir, foldKeepLength } from './slots.js';
     4	import { checkDanger, maxRisk } from './danger.js';
     5	import { shQuote, psQuote, chooseTemplate, quoteForKind, UnquotableError, pwshNativeSlots, unsafeNativePwshArg } from './render.js';
     6	
     7	export { shQuote };
     8	
     9	// Validators for slots that are inserted raw ({slot!raw}).
    10	export const RAW_OK = {
    11	  count: (v) => /^\d{1,6}$/.test(String(v)),
    12	  depth: (v) => /^\d{1,2}$/.test(String(v)),
    13	  days: (v) => /^\d{1,5}$/.test(String(v)),
    14	  pid: (v) => /^\d{1,7}$/.test(String(v)),
    15	  port: (v) => /^\d{1,5}$/.test(String(v)) && +v > 0 && +v < 65536,
    16	  size: (v) => /^\d+[ckMG]?$/.test(String(v)),
    17	  age: (v) => /^-m(?:min|time) -\d+$/.test(String(v)),
    18	  mode: (v) => /^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(String(v)),
    19	  var: (v) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(String(v)),
    20	  minutes: (v) => /^\d{1,7}$/.test(String(v)),
    21	  sizeBytes: (v) => /^\d{1,16}$/.test(String(v)),
    22	  start: (v) => /^\d{1,9}$/.test(String(v)) && +v > 0,
    23	  end: (v) => /^\d{1,9}$/.test(String(v)) && +v > 0,
    24	  num: (v) => /^\d{1,12}$/.test(String(v)),
    25	};
    26	
    27	const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
    28	const PLACEHOLDER = (name) => `<${name.toUpperCase()}>`;
    29	
    30	// sed needs regex-escaped search text and &,\,/ escaped replacement
    31	// (a newline would end the s command: written as \n, which never matches inside one line)
    32	const sedEscapeOld = (s) => s.replace(/[\\/.*^$[\]]/g, '\\$&').replace(/\n/g, '\\n');
    33	const sedEscapeNew = (s) => s.replace(/[\\/&]/g, '\\$&').replace(/\n/g, '\\n');
    34	
    35	/** Recompute derived slots after values were merged/overridden (tagger, history rules). */
    36	export function finalizeSlots(intent, v) {
    37	  if (v.ext != null && v.glob == null) v.glob = `*.${v.ext}`;
    38	  if (intent.id === 'find_by_name' && v.name) v.namepat = /[*?]/.test(v.name) || /\.\w+$/.test(v.name) ? v.name : `*${v.name}*`;
    39	  if (intent.id === 'replace_text' && v.old != null && v.new != null) v.sedexpr = `s/${sedEscapeOld(v.old)}/${sedEscapeNew(v.new)}/g`;
    40	  return v;
    41	}
    42	
    43	/** Resolve the values an intent can use from the generic extraction. */
    44	export function resolveSlots(intent, ex) {
    45	  const v = {};
    46	  const has = (k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
    47	  const textual = ['pattern', 'message', 'text', 'name', 'old', 'branch', 'service', 'container', 'pkg', 'cmd', 'user', 'script']
    48	    .some((k) => k in intent.slots) || ['base64_encode', 'base64_decode', 'replace_text', 'find_by_name'].includes(intent.id);
    49	  const paths = [...(textual ? ex.paths : ex.pathsWithQuoted)];
    50	  // "grep for ~/foo in src": the path-like word right after the search verb is the pattern, the other
    51	  // path is where to search (only when there is one: otherwise the single path is the search root)
    52	  let pathPattern = null;
    53	  if (has('pattern') && !ex.quoted.length && paths.length >= 2) {
    54	    const m = foldKeepLength(String(ex.text)).toLowerCase().match(/(?:^|\s)(?:grep|search|look|find|szukaj|wyszukaj|poszukaj|znajdz)\s+(?:for\s+|(?:the\s+)?(?:text|string|pattern|word)\s+)?(\S+)/);
    55	    const at = m ? m.index + m[0].length - m[1].length : -1;
    56	    const word = at >= 0 ? String(ex.text).slice(at, at + m[1].length) : null;
    57	    if (word != null && paths.includes(word)) { pathPattern = word; paths.splice(paths.indexOf(word), 1); }
    58	  }
    59	  // "on the disk" / "na (całym) dysku" is a search scope, never the object of a changing command
    60	  // ("usuń folder cache na dysku" is not `rm -r /`), and a folder the user names wins over it
    61	  if (ex.rootPhrase && paths.includes('/') && !/(^|\s)["']?\/["']?(?=[\s,.;:!?]|$)/.test(ex.text) &&
    62	      ((intent.risk !== 'safe' && !/^find \{path\}/.test(String(intent.template))) || (has('path') && pickDir(ex)))) {
    63	    paths.splice(paths.indexOf('/'), 1);
    64	  }
    65	
    66	  // archive-type paths (compress/extract)
    67	  const isArchive = (p) => /\.(tar\.gz|tgz|tar|zip|tar\.bz2|tar\.xz|gz)$/i.test(p) && !/^(tar\.gz|tar|tgz|zip|gz)$/i.test(p);
    68	  if (has('archive')) {
    69	    const a = paths.find(isArchive);
    70	    if (a) { v.archive = a; paths.splice(paths.indexOf(a), 1); }
    71	  }
    72	  if (has('src') || has('dst')) {
    73	    if (paths[0]) v.src = paths[0];
    74	    if (paths[1]) v.dst = paths[1];
    75	    else if (paths[0]) {
    76	      const d = pickDest(ex);
    77	      if (d && d !== paths[0]) v.dst = d;
    78	    }
    79	  }
    80	  if (has('file')) {
    81	    const f = paths.find((p) => /\.[A-Za-z0-9]+$/.test(p) || p.includes('/')) || paths[0];
    82	    if (f) v.file = f;
    83	    if (has('dest') && paths.length > 1) v.dest = paths.find((p) => p !== f);
    84	  }
    85	  if (has('path') && paths.length) {
    86	    v.path = paths[0];
    87	  } else if (has('path') && !['find_by_name', 'chown'].includes(intent.id)) {
    88	    const d = pickDir(ex);
    89	    if (d) v.path = d;
    90	  }
    91	  if (has('archive') && !v.archive) {
    92	    const base = (v.path || '.').replace(/\/+$/, '').split('/').pop();
    93	    const ext = intent.id === 'compress_zip' ? '.zip' : '.tar.gz';
    94	    v.archive = (!base || base === '.' || base === '..' || base === '~') ? `archive${ext}` : `${base}${ext}`;
    95	  }
    96	  if (ex.count != null) v.count = ex.count;
    97	  if (has('depth') && ex.count != null && ex.count <= 10) v.depth = ex.count;
    98	  if (ex.size) v.size = ex.size;
    99	  if (ex.duration) {
   100	    v.age = ex.duration.age;
   101	    v.days = ex.duration.days;
   102	    v.since = ex.duration.since;
   103	  } else if (has('days') && ex.count != null) {
   104	    v.days = ex.count;
   105	  }
   106	  if (ex.port) v.port = ex.port;
   107	  if (has('pid')) {
   108	    if (ex.pid) v.pid = ex.pid;
   109	    else if (ex.numbers?.length) v.pid = ex.numbers.find((n) => n > 1);
   110	  }
   111	  if (has('port') && !v.port && ex.numbers?.length) v.port = ex.numbers.find((n) => n >= 20 && n < 65536);
   112	  if (ex.mode && has('mode')) v.mode = ex.mode;
   113	  // line range: "lines 10-20", "od 10 do 20", "10 to 20", "from line 5 through 9"; else the first two numbers
   114	  if (has('start')) {
   115	    const m = String(ex.text).match(/(?<![\w.])(\d{1,9})\s*(?:-|–|—|\.\.|,|:|to|do|through|thru|until|till|and|i)\s*(?:line\s+|linii\s+|linia\s+)?(\d{1,9})(?![\w.])/i);
   116	    const [a, b] = m ? [+m[1], +m[2]] : (ex.numbers || []).slice(0, 2);
   117	    if (a > 0 && b > 0) { v.start = Math.min(a, b); v.end = Math.max(a, b); }
   118	    delete v.count;
   119	  }
   120	  if (has('num')) {
   121	    const n = ex.pid ?? ex.numbers?.find((x) => x > 0) ?? ex.count;
   122	    if (n != null) v.num = n;
   123	    delete v.count;
   124	  }
   125	  if (ex.ext) v.glob = `*.${ex.ext}`;
   126	  if (ex.urls.length) v.url = ex.urls[0];
   127	  else if (has('url') && ex.hosts.length) v.url = /^\w+:\/\//.test(ex.hosts[0]) ? ex.hosts[0] : `https://${ex.hosts[0]}`;
   128	
   129	  if (pathPattern != null) v.pattern = pathPattern;
   130	  for (const k of ['name', 'service', 'container', 'pkg', 'cmd', 'script', 'var', 'branch', 'user', 'pattern', 'host', 'target', 'message']) {
   131	    if (has(k) && v[k] == null) {
   132	      const val = pickArg(k, ex);
   133	      if (val != null && val !== '') v[k] = val;
   134	    }
   135	  }
   136	  if (intent.id === 'base64_encode' || intent.id === 'base64_decode') {
   137	    const t = pickArg('text', ex);
   138	    const fileWord = /\b(plik\w*|files?)\s+\S+\.\w+/i.test(ex.text);
   139	    if (ex.quoted.length) v.text = ex.quoted[0];
   140	    else if (paths.length && fileWord) v.file = paths[0];
   141	    else if (paths.length && !(t && t.includes(' '))) v.file = paths[0];
   142	    else if (t) v.text = t;
   143	  }
   144	  if (intent.id === 'find_by_name') {
   145	    let name = v.name ?? (ex.quoted[0] || paths.find((p) => !p.includes('/') && p !== '.' && p !== '~'));
   146	    if (!name) {
   147	      const w = ex.rest.match(/\b(?:named|called|name|nazwie|nazwa|nazwany|nazywa sie|nazywajacy sie|plik|file|pliku)\s+(?:o\s+)?(?:nazwie\s+)?([\w.*-]+)/);
   148	      if (w && !/^(o|the|a|nazwie|named|called)$/.test(w[1])) name = w[1];
   149	    }
   150	    if (name) {
   151	      v.name = name;
   152	      v.namepat = /[*?]/.test(name) || /\.\w+$/.test(name) ? name : `*${name}*`;
   153	      if (v.path === name) v.path = paths.find((p) => p !== name);
   154	    }
   155	  }
   156	  if (intent.id === 'replace_text') {
   157	    let [o, n] = ex.taggerOnly ? [ex.tagged.PATTERN?.[0], ex.tagged.REPL?.[0]] : ex.quoted;
   158	    if (!ex.taggerOnly && (o == null || n == null)) {
   159	      const m = ex.text.match(/(?:replace|substitute|change|swap|zamie[nń]|zmie[nń]|podmie[nń]|zast[aą]p)\s+(?:all\s+|every\s+|wszystkie\s+|ka[zż]de\s+)?(?:occurrences of\s+|wyst[aą]pienia\s+)?(?:word\s+|s[lł]owo\s+|text\s+|tekst\s+|string\s+)?["'„]?([^\s"'”]+)["'”]?\s+(?:with|to|for|into|by|na|->|=>)\s+["'„]?([^\s"'”]+)["'”]?/i);
   160	      if (m) { o = o ?? m[1]; n = n ?? m[2]; }
   161	    }
   162	    if (o != null) v.old = o;
   163	    if (n != null) v.new = n;
   164	    if (o != null && n != null) v.sedexpr = `s/${sedEscapeOld(o)}/${sedEscapeNew(n)}/g`;
   165	    // the file is the path that is not one of the replaced words
   166	    if (v.file && (v.file === o || v.file === n)) v.file = paths.find((p) => p !== o && p !== n);
   167	  }
   168	  if (intent.id === 'chown' && v.user && v.path === v.user) delete v.path;
   169	  for (const k of Object.keys(v)) if (v[k] === undefined) delete v[k];
   170	  return v;
   171	}
   172	
   173	function renderValue(name, raw, values, quote) {
   174	  if (!(name in values)) return null;
   175	  let val = values[name];
   176	  if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
   177	  if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
   178	  return quote(val, { tilde: PATH_SLOTS.has(name), name });
   179	}
   180	
   181	const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;
   182	
   183	/**
   184	 * Fill a template. Returns { command, missing[] }.
   185	 * `values` = resolved slots merged over intent defaults.
   186	 */
   187	export function render(template, values, required = [], quote = shQuote, keepOptional = []) {
   188	  const missing = [];
   189	  const isSlot = (name) => name in values || required.includes(name) || SLOT_NAMES.test(name);
   190	  // Single pass over the template: every {slot} and «optional segment» is substituted exactly once and
   191	  // inserted values are never scanned again (a value containing "{file}" must stay inert text).
   192	  const out = template.replace(/«([^»]*)»|\{(\w+)(!raw)?\}/g, (m, seg, name, raw) => {
   193	    if (seg != null) {
   194	      let ok = true;
   195	      const r = seg.replace(/\{(\w+)(!raw)?\}/g, (m2, n2, raw2) => {
   196	        if (!ok) return m2;
   197	        const val = renderValue(n2, !!raw2, values, quote);
   198	        // an operand the request named but that is not valid (keepOptional) keeps its placeholder: the optional part
   199	        // is not silently dropped (`npm install <PKG>`, never `npm install`)
   200	        if (val == null && keepOptional.includes(n2)) { missing.push(n2); return PLACEHOLDER(n2); }
   201	        if (val == null) { ok = false; return m2; }
   202	        return val;
   203	      });
   204	      return ok ? (/^\s/.test(r) ? r : ' ' + r) : '';
   205	    }
   206	    if (!isSlot(name)) return m; // not a slot (e.g. awk braces, %{http_code}, PowerShell script blocks)
   207	    const val = renderValue(name, !!raw, values, quote);
   208	    if (val == null) {
   209	      missing.push(name);
   210	      return PLACEHOLDER(name);
   211	    }
   212	    return val;
   213	  });
   214	  return { command: out, missing };
   215	}
   216	
   217	const DERIVED_REQUIRED = { namepat: 'name', glob: 'ext', sedexpr: 'old' };
   218	
   219	const SIZE_MULT = { c: 1, k: 1024, M: 1024 ** 2, G: 1024 ** 3 };
   220	/** Slots derived from others so every shell can use the unit it needs (find: -mmin/-size, PowerShell: minutes/bytes). */
   221	export function deriveSlots(v) {
   222	  if (v.glob && v.ext == null) { const m = String(v.glob).match(/^\*\.([\w]+)$/); if (m) v.ext = m[1]; }
   223	  if (v.minutes == null && v.age) {
   224	    const m = String(v.age).match(/^-m(min|time) -(\d+)$/);
   225	    if (m) v.minutes = m[1] === 'min' ? +m[2] : +m[2] * 1440;
   226	  }
   227	  if (v.sizeBytes == null && v.size != null) {
   228	    const m = String(v.size).match(/^(\d+)([ckMG]?)$/);
   229	    if (m) v.sizeBytes = +m[1] * (SIZE_MULT[m[2]] ?? 512);
   230	  }
   231	  return v;
   232	}
   233	
   234	/** env from the legacy `platform` option */
   235	export const envFromPlatform = (platform = process.platform) => ({
   236	  shell: 'bash',
   237	  os: platform === 'darwin' ? 'darwin' : platform === 'win32' ? 'win32' : 'linux',
   238	  coreutils: platform === 'darwin' ? 'bsd' : 'gnu',
   239	});
   240	
   241	/**
   242	 * Build a full suggestion for an intent and query.
   243	 *   env: { shell, os, coreutils } (default: bash on `platform`)
   244	 *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
   245	 * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}
   246	 */
   247	export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [], keepOptional = [] } = {}) {
   248	  const intent = BY_ID[intentId];
   249	  if (!intent) throw new Error(`unknown intent ${intentId}`);
   250	  const e = env || envFromPlatform(platform);
   251	  const resolved = given || resolveSlots(intent, extracted || extractSlots(text));
   252	  const defaults = { ...intent.slots, ...(e.os === 'darwin' ? intent.darwinDefaults : {}) };
   253	  const values = {};
   254	  for (const [k, d] of Object.entries(defaults)) if (d != null) values[k] = d;
   255	  Object.assign(values, resolved);
   256	  // blank: slots withheld on purpose (refused reference, ambiguous path): no default stands in for them
   257	  for (const k of blank) if (resolved[k] == null) delete values[k];
   258	  // the filesystem root ("whole disk", "na całym dysku") is the system drive for Windows shells
   259	  if (e.os === 'win32' && (e.shell === 'powershell' || e.shell === 'cmd')) {
   260	    for (const k of PATH_SLOTS) if (values[k] === '/') values[k] = 'C:\\';
   261	  }
   262	  deriveSlots(values);
   263	  const required = [...new Set([...Object.entries(intent.slots).filter(([, d]) => d == null).map(([k]) => k), ...blank.filter((k) => !(k in values))])];
   264	
   265	  const choice = chooseTemplate(intent, e);
   266	  const base = {
   267	    intent: intent.id, description: intent.description, baseRisk: intent.risk, slots: resolved,
   268	    notes: intent.notes || null, shell: e.shell, os: e.os, variant: choice.variant || null,
   269	  };
   270	  if (choice.gap) {
   271	    return { ...base, command: null, gap: choice.gap, risk: intent.risk, warnings: [], critical: false, missing: [] };
   272	  }
   273	  const baseQuote = quoteForKind(choice.kind, choice.wrapPosix);
   274	  const tpl = choice.tpl;
   275	  const pwshNative = choice.kind === 'pwsh' && !choice.wrapPosix;
   276	  const nativeSlots = pwshNative ? pwshNativeSlots(tpl) : new Set();
   277	  const quote = !pwshNative ? baseQuote : (v, o = {}) => {
   278	    // function templates: every value is checked (the target program is not known statically)
   279	    if ((typeof tpl === 'function' || nativeSlots.has(o.name)) && unsafeNativePwshArg(v)) {
   280	      throw new UnquotableError(`value ${JSON.stringify(String(v))} cannot be passed to a native program safely by PowerShell < 7.3 (embedded " or trailing \\)`);
   252	  const composeMode = opts.compose || 'auto';
   253	  // a NUL byte cannot be part of any command argument (and marks ambiguous values internally)
   254	  if (/\0/.test(String(query))) {
   255	    return { query, shell: env.shell, os: env.os, coreutils: env.coreutils, threshold: thr, context: { used: false }, understood: false, method: 'none',
   256	      confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: 'the request contains a NUL byte' };
   257	  }
   258	
   259	  // ---- context (history + cwd), in memory only ----
   260	  let ctx = null;
   261	  if (opts.history?.length) {
   262	    // an earlier `tellsh <query>`: what that request produced on its own (no history, no composer). Slots it left as
   263	    // placeholders (refused, ambiguous, rejected) are ambiguous values here, never the catalog default or a guess.
   264	    const quick = (q, unclearArgs) => {
   265	      const r = suggest(q, { model, env, threshold: thr, compose: 'off', unclearArgs });
   266	      if (!r.understood || !r.intent || r.method !== 'catalog') return null;
   267	      const slots = { ...(r.slots || {}) };
   268	      for (const k of r.missing || []) slots[k] = AMB + `<${k}>`;
   269	      return { intent: r.intent, slots };
   270	    };
   271	    const kind = opts.historyKind || opts.history.kind || (env.shell === 'powershell' ? 'pwsh' : 'posix');
   272	    ctx = buildContext(opts.history, { classify: quick, cwd: opts.cwd, kind, query });
   273	  }
   274	  const ctxFeats = ctx ? ctx.features : (opts.cwd ? cwdFlags(opts.cwd).map((c) => 'ctx_cwd=' + c) : []);
   275	  const extras = [...envFeatures(env), ...ctxFeats];
   276	  const ref = ctx ? resolveReference(query, ctx) : null;
   277	  const context = ctx ? { used: true, commands: ctx.n, rule: ref?.rule || null, note: ref?.note || null } : { used: false };
   278	
   279	  const base = { query, shell: env.shell, os: env.os, coreutils: env.coreutils, threshold: thr, context };
   280	
   281	  // ---- rule: "same for X" reuses the previous intent with one slot replaced ----
   282	  if (ref?.rule === 'same-for') {
   283	    const slots = validHistorySlots(ref.slots);
   284	    // a value that fails validation (a 300-character path, ...) is a placeholder, never `find .`
   285	    const blank = invalidHistorySlots(ref.slots);
   286	    // the new path ends in sentence punctuation (`same for /tmp/data!`): placeholder, as for any request
   287	    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null && BY_ID[ref.intent].risk !== 'safe' && trailingPunctAfter(query, slots[ref.changed])) {
   288	      blank.push(ref.changed);
   289	      delete slots[ref.changed];
   290	    }
   291	    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank });
   292	    const res = { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
   293	    const punct = blank.filter((k) => !invalidHistorySlots(ref.slots).includes(k));
   294	    if (punct.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${punct.join(', ')}); quote the path`];
   295	    if (punct.length < blank.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: it is not a valid value (${blank.filter((k) => !punct.includes(k)).join(', ')})`];
   296	    return res;
   297	  }
   298	  // ---- the reference cannot be resolved at all ("what about this", an older command to replay) ----
   299	  if (ref?.rule === 'refused' && ref.stop) {
   300	    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: ref.note };
   301	  }
   302	
   303	  const sb = ctx && !ref ? sameBut(query, ctx) : null;
   304	  // a request about the entries of the referenced directory does not use the history at all: its intent is read
   305	  // without the history features (they favour `delete_dir` for "delete log files in this folder")
   306	  // rerankTop: the re-ranker's own candidate count (A+B uses 5); independent of how many candidates are displayed
   307	  const c0 = cascade(query, { model, extras: ref?.contents ? envFeatures(env) : extras, top: Math.max(top, opts.rerankTop || 0), restrictTool: sb ? FAMILY_OF[sb.lastIntent] : undefined });
   308	  // rerank: optional hybrid hook (src/rerank/hybrid.js); history rules keep the linear cascade's decision
   309	  const c = opts.rerank && !sb && !ref ? opts.rerank(c0, { thr }) : c0;
   310	  const candidates = c.top.slice(0, Math.max(1, top)).map((t) => ({ intent: t.intent, tool: t.tool, p: +t.p.toFixed(4), description: BY_ID[t.intent]?.description }));
   311	  const tools = c.tools.map((t) => ({ tool: t.tool, p: +t.p.toFixed(4) }));
   312	  let intent = c.intent;
   313	  let confidence = c.confidence;
   314	  let method = 'catalog';
   315	  if ((ref?.rule === 'pronoun' || ref?.rule === 'refused') && ref.intent) { intent = ref.intent; method = 'history-rule'; confidence = Math.max(confidence, thr); }
   316	  if (sb) { method = 'history-rule'; confidence = Math.max(confidence, thr); context.rule = 'same-but'; context.note = `modifies previous ${sb.lastIntent}`; }
   317	  // "same but force" after `rm -r old; ls newdir`: the command it would modify is not the previous one
   318	  if (sb?.skipped && (BY_ID[sb.lastIntent].risk !== 'safe' || BY_ID[intent].risk !== 'safe')) {
   319	    context.rule = 'refused';
   320	    context.note = `the newest command that tellsh can modify (${sb.lastIntent}) is not the previous command; not guessing`;
   321	    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
   322	  }
   323	  // "same for api" after `docker --context prod logs web`: repeated here it would run against the default daemon
   324	  if (sb?.scoped) {
   325	    context.rule = 'refused';
   326	    context.note = `the previous command (${sb.lastIntent}) ran against another repository, directory or daemon (-C, --context, -H, ...); not guessing`;
   327	    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
   328	  }
   329	  const out = { ...base, confidence: +confidence.toFixed(4), tool: FAMILY_OF[intent] || c.tool, tools, candidates };
   330	
   331	  const tryCompose = (reason) => {
   332	    if (composeMode === 'off') return null;
   333	    // a place reference ("list files there", "tam") has no composer operand: never `find .` in its place
   334	    if (hasLocative(query) && composeMode !== 'force') return null;
   335	    // composer vocabulary and quoting are POSIX-only (fish treats \\ and \' as escapes inside single quotes)
   336	    if (env.shell === 'powershell' || env.shell === 'cmd' || env.shell === 'fish') return null;
   337	    const capable = c.tools.filter((t) => t.tool !== NONE);
   338	    if (c.topTool === NONE && composeMode !== 'force') return null;
   339	    const ci = composeInput(query, model, capable[0]?.tool, opts.unclearArgs);
   340	    const r = compose(query, capable, ci.ex, { patternOf: ci.pattern, nameOf: ci.nameOf });
   341	    if (!r || r.invalid) return r?.invalid ? { invalid: r.invalid, command: r.command } : null;
   342	    if (blocksAmbiguous(r, ci.ambiguousPaths)) return null;
   343	    // a value with a line break (`"/tmp/a\nb"`) is never composed into a command: the catalog withholds it too
   344	    if (/[\r\n]/.test(r.command)) return null;
   345	    // calibrated gate: confident stage-1 tool, or strong flag evidence (>= 2 triggered flags) for a likely tool
   346	    const pOf = capable.find((t) => t.tool === r.tool)?.p ?? 0;
   347	    if (composeMode !== 'force' && !(c.topToolP >= model.thresholds.compose || (r.triggered.length >= 2 && pOf >= 0.2))) return null;
   348	    return { ...out, understood: true, method: 'composed', experimental: true, reason, intent: null, description: `composed ${r.tool}${r.sub ? ' ' + r.sub : ''} command (experimental)`,
   349	      command: r.command, risk: r.risk, baseRisk: 'medium', warnings: r.warnings, critical: r.critical, missing: [], slots: {}, notes: null,
   350	      composed: { tool: r.tool, sub: r.sub, flags: r.flags, validation: r.validation } };
   351	  };
   352	
   353	  if (confidence < thr && method === 'catalog') {
   354	    const comp = tryCompose('low confidence');
   355	    if (comp && !comp.invalid) return comp;
   356	    const hint = hasPronoun(query) && !ctx ? 'this looks like a reference to an earlier command; try --history' : null;
   357	    // "move it there" with history: an object and a place reference at once is refused, not reported as resolved
   358	    if (ctx && hasPronoun(query) && hasLocative(query)) {
   359	      context.rule = 'refused';
   360	      context.note = 'the request names both an object ("it") and a place ("there") from the previous command; not guessing which is which';
   361	      return { ...out, understood: false, method: 'history-rule', hint: context.note, composeError: comp?.invalid || null };
   362	    }
   363	    return { ...out, understood: false, method: 'none', hint, composeError: comp?.invalid || null };
   364	  }
   365	
   366	  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode, tagger: opts.tagger });
   367	  const slots = r.slots;
   368	  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
   369	  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
   370	  const ambiguousPaths = [];
   371	  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
   372	  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
   373	  const blank = new Set(r.withheld || []);
   374	  if (BY_ID[intent].risk !== 'safe') {
   375	    for (const k of Object.keys(slots)) {
   376	      if (PATH_SLOT_NAMES.has(k) && r.sources[k] !== 'history' && trailingPunctAfter(query, slots[k])) { ambiguousPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   377	    }
   378	    if (ambiguousPaths.length) finalizeSlots(BY_ID[intent], slots);
   379	  }
   380	  // a changing command whose path is the output of a command (`in \`pwd\``, `$(pwd)`), or a request that names more
   381	  // explicit paths than the command takes (`in /tmp/x and /tmp/y`: only one would be used): placeholder + warning
   382	  const unclearPaths = [];
   383	  if (BY_ID[intent].risk !== 'safe') {
   384	    const explicit = explicitPaths(query);
   385	    const nPathSlots = [...PATH_SLOT_NAMES].filter((k) => usesSlot(BY_ID[intent], k)).length;
   386	    const dropped = explicit.filter((p) => !Object.values(slots).some((v) => String(v) === p));
   387	    const tooMany = explicit.length > nPathSlots && dropped.length > 0;
   388	    // `in $(pwd)`: the location is the output of a command, so an empty path slot is withheld too (never `.`)
   389	    if (/\$\(|`/.test(query)) for (const k of ['path', 'file']) if (usesSlot(BY_ID[intent], k) && slots[k] == null && !unclearPaths.length) { unclearPaths.push(`${k}=?`); blank.add(k); }
   390	    for (const k of Object.keys(slots)) {
   391	      if (!PATH_SLOT_NAMES.has(k) || r.sources[k] === 'history') continue;
   392	      const sub = insideSubstitution(query, String(slots[k]));
   393	      if (sub || tooMany) { unclearPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   394	    }
   395	    if (tooMany) for (const k of PATH_SLOT_NAMES) if (usesSlot(BY_ID[intent], k) && slots[k] == null) blank.add(k);
   396	    if (unclearPaths.length || tooMany) finalizeSlots(BY_ID[intent], slots);
   397	    if (tooMany && !unclearPaths.length) unclearPaths.push(dropped.join(', '));
   398	    if (tooMany) unclearPaths.tooMany = true;
   399	  }
   400	  // `tellsh delete folder "my data"`: a quoted argument that may be a name or words of the request (see joinArgs). A
   401	  // changing command never takes it (or a part of it) as its path or other operand (process, service, container,
   402	  // package, ...): placeholder + warning
   403	  const unclearArgs = [];
   404	  if (BY_ID[intent].risk !== 'safe' && opts.unclearArgs?.length) {
   405	    const words = (x) => String(x).toLowerCase().split(/\s+/).filter(Boolean);

exec
/bin/bash -lc "node --input-type=module <<'EOF'
import {readFileSync} from 'node:fs';
import {normalize} from './src/features.js';
const rs=readFileSync('build/hybrid/train.jsonl','utf8').trim().split('\\n').map(JSON.parse);
const tr=new Map(rs.filter(r=>r.split==='train').map(r=>[normalize(r.text),r]));
const dev=rs.filter(r=>r.split==='dev'); const overlap=dev.filter(r=>tr.has(normalize(r.text)));
console.log(JSON.stringify({train:rs.length-dev.length,dev:dev.length,overlap:overlap.length,byKind:Object.fromEntries(['orig','typo','relex'].map(k=>[k,overlap.filter(r=>r.kind===k).length])),examples:overlap.filter(r=>r.src"'!=='"'real').slice(0,12).map(r=>({dev:{text:r.text,kind:r.kind,gid:r.gid},train:(({text,kind,gid})=>({text,kind,gid}))(tr.get(normalize(r.text)))}))},null,2));
EOF" in /workspace/tellsh
 succeeded in 278ms:
{
  "train": 48553,
  "dev": 5356,
  "overlap": 83,
  "byKind": {
    "orig": 11,
    "typo": 0,
    "relex": 72
  },
  "examples": [
    {
      "dev": {
        "text": "policz pliki w /var/log",
        "kind": "orig",
        "gid": 856
      },
      "train": {
        "text": "policz pliki w /var/log",
        "kind": "relex",
        "gid": 8413
      }
    },
    {
      "dev": {
        "text": "policz slowa w app.log",
        "kind": "relex",
        "gid": 928
      },
      "train": {
        "text": "policz słowa w app.log",
        "kind": "relex",
        "gid": 937
      }
    },
    {
      "dev": {
        "text": "ile słów jest w pliku docker-compose.yml",
        "kind": "relex",
        "gid": 932
      },
      "train": {
        "text": "ile słów jest w pliku docker-compose.yml",
        "kind": "relex",
        "gid": 923
      }
    },
    {
      "dev": {
        "text": "pokaz symlinki w /opt/app",
        "kind": "relex",
        "gid": 1273
      },
      "train": {
        "text": "pokaż symlinki w /opt/app",
        "kind": "relex",
        "gid": 8503
      }
    },
    {
      "dev": {
        "text": "first 20 lines of /var/log/syslog",
        "kind": "orig",
        "gid": 1639
      },
      "train": {
        "text": "first 25 lines of /var/log/syslog",
        "kind": "relex",
        "gid": 1662
      }
    },
    {
      "dev": {
        "text": "first 8 lines of /var/log/syslog",
        "kind": "relex",
        "gid": 1639
      },
      "train": {
        "text": "first 25 lines of /var/log/syslog",
        "kind": "relex",
        "gid": 1662
      }
    },
    {
      "dev": {
        "text": "print the first 40 lines of raport_2024.pdf",
        "kind": "relex",
        "gid": 1664
      },
      "train": {
        "text": "Print the first 220 lines of raport_2024.pdf",
        "kind": "relex",
        "gid": 13322
      }
    },
    {
      "dev": {
        "text": "last 19 lines of wyniki_final.xlsx",
        "kind": "relex",
        "gid": 1721
      },
      "train": {
        "text": "last 12 lines of wyniki_final.xlsx",
        "kind": "relex",
        "gid": 1719
      }
    },
    {
      "dev": {
        "text": "ostatnie 50 linii /var/log/syslog",
        "kind": "orig",
        "gid": 1725
      },
      "train": {
        "text": "ostatnie 3 linii /var/log/syslog",
        "kind": "relex",
        "gid": 1742
      }
    },
    {
      "dev": {
        "text": "ostatnie 29 linii build",
        "kind": "relex",
        "gid": 1725
      },
      "train": {
        "text": "ostatnie 23 linii build",
        "kind": "relex",
        "gid": 12845
      }
    },
    {
      "dev": {
        "text": "ostatnie 26 linii /var/log/syslog",
        "kind": "relex",
        "gid": 1725
      },
      "train": {
        "text": "ostatnie 3 linii /var/log/syslog",
        "kind": "relex",
        "gid": 1742
      }
    },
    {
      "dev": {
        "text": "zawartość archiwum release.tar.gz",
        "kind": "relex",
        "gid": 2137
      },
      "train": {
        "text": "zawartość archiwum release.tar.gz",
        "kind": "relex",
        "gid": 2148
      }
    }
  ]
}

exec
/bin/bash -lc "sed -n '1,130p' src/features.js; sed -n '15,70p' scripts/gen_data.js; nl -ba src/shellwords.js | sed -n '160,248p'; nl -ba src/fill.js | sed -n '275,330p'; git diff 0d87457..HEAD -- src/catalog.js src/variants.js" in /workspace/tellsh
 succeeded in 0ms:
// Feature extraction for all models. This is the single source of truth: scripts/gen_data.js uses
// these same functions to featurise the training data that scripts/train.py fits, so training and
// inference can never drift apart (test/parity.test.js checks the exported weights reproduce Python).
import { KNOWN_EXT, KNOWN_PROCS, KNOWN_SERVICES, foldKeepLength } from './slots.js';

export const STEM_LEN = 5;
export const CHAR_MIN = 3;
export const CHAR_MAX = 5;

// lowercase, fold Polish/Latin diacritics, digits -> 0, keep [a-z0-9] tokens
export function normalize(text) {
  let s = String(text).toLowerCase().replace(/ł/g, 'l');
  s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  s = s.replace(/[0-9]+/g, '0');
  s = s.replace(/[^a-z0-9]+/g, ' ').trim();
  return s;
}

export function tokenize(text) {
  const s = normalize(text);
  return s ? s.split(' ') : [];
}

const stem = (t) => (t.length > STEM_LEN ? t.slice(0, STEM_LEN) : t);

// FNV-1a 32-bit over UTF-16 code units (feature names are ASCII after normalisation)
export function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i) & 0xff;
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Returns { words, chars } — feature names before hashing.
export function featureNames(text) {
  const toks = tokenize(text);
  const words = [];
  const chars = [];
  const stems = toks.map(stem);
  for (let i = 0; i < stems.length; i++) {
    words.push('w:' + stems[i]);
    if (i + 1 < stems.length) words.push('b:' + stems[i] + '_' + stems[i + 1]);
  }
  for (const t of toks) {
    const p = ' ' + t + ' ';
    for (let n = CHAR_MIN; n <= CHAR_MAX; n++) {
      for (let i = 0; i + n <= p.length; i++) chars.push('c:' + p.slice(i, i + n));
    }
  }
  return { words, chars };
}

/**
 * Sparse classifier vector: Map<hashIndex, value>. Blocks (words, chars, extras) are counted then
 * L2-normalised separately. `extras` are context tokens such as `shell=bash`, `os=linux`,
 * `ctx_tool=docker` (shell/OS/history features).
 */
export function vectorize(text, dim, extras = []) {
  const { words, chars } = featureNames(text);
  const out = new Map();
  const blocks = [words, chars];
  if (extras.length) blocks.push(extras.map((e) => 'x:' + e));
  for (const block of blocks) {
    const counts = new Map();
    for (const f of block) {
      const idx = fnv1a(f) % dim;
      counts.set(idx, (counts.get(idx) || 0) + 1);
    }
    let norm = 0;
    for (const v of counts.values()) norm += v * v;
    norm = Math.sqrt(norm) || 1;
    for (const [k, v] of counts) out.set(k, (out.get(k) || 0) + v / norm);
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// Token-level features for the BIO slot tagger.

const QUOTE_CHARS = `"'„“”\``;

/**
 * Split text into tokens with character offsets. Whitespace separates tokens; quote characters,
 * brackets and sentence punctuation at token edges become their own tokens; a trailing "." is
 * split off unless the token is a path-like "." / ".." / "x.y".
 */
export function tagTokens(text) {
  const toks = [];
  const re = /\S+/g;
  let m;
  while ((m = re.exec(text))) {
    let s = m.index;
    let w = m[0];
    const pre = [];
    const post = [];
    // peel leading punctuation/quotes
    while (w.length > 1 && /^[(\[{,;!?"'„“”`]/.test(w)) { pre.push([s, w[0]]); s++; w = w.slice(1); }
    // peel trailing punctuation/quotes and sentence dots
    for (;;) {
      if (w.length > 1 && /[)\]},;:!?"'„“”`]$/.test(w)) { post.unshift([s + w.length - 1, w.slice(-1)]); w = w.slice(0, -1); continue; }
      if (w.length > 1 && /\.$/.test(w) && !/^\.+$/.test(w) && !/\.\.$/.test(w)) { post.unshift([s + w.length - 1, '.']); w = w.slice(0, -1); continue; }
      break;
    }
    for (const [i, c] of pre) toks.push({ text: c, start: i, end: i + 1 });
    toks.push({ text: w, start: s, end: s + w.length });
    for (const [i, c] of post) toks.push({ text: c, start: i, end: i + 1 });
  }
  return toks;
}

const fold = (w) => foldKeepLength(w).toLowerCase();
function shape(w) {
  let s = '';
  for (const ch of w) {
    const c = /\p{Lu}/u.test(ch) ? 'X' : /\p{Ll}/u.test(ch) ? 'x' : /\d/.test(ch) ? 'd' : ch;
    if (s[s.length - 1] !== c || !/[Xxd]/.test(c)) s += c;
  }
  return s.slice(0, 8);
}
const NUM_WORD = /^(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|dozen|jeden|jedna|dwa|dwie|trzy|cztery|piec|pieciu|szesc|siedem|osiem|dziewiec|dziesiec|dziesieciu|pietnascie|dwadziescia|\w+nascie|\w+nastu)$/;
const TIME_UNIT = /^(min\w*|minut\w*|godz\w*|hours?|hrs?|h|dni|dnia|dzien|days?|dob\w*|tydzien|tygodni\w*|weeks?|miesi\w*|months?|lat|rok\w*|years?|ago|temu|yesterday|wczoraj\w*|today|dzis\w*)$/;
const SIZE_UNIT = /^(\d+([.,]\d+)?)?(k|m|g|t)i?b?$|^(kb|mb|gb|tb|bytes?|bajt\w*|mega\w*|giga\w*|kilo\w*)$/;
const LOC_WORD = /^(home|domow\w*|downloads?|pobran\w*|desktop|pulpi\w*|documents|dokument\w*|root|current|biezac\w*|here|tutaj|tu|everywhere|wszedzie|katalog\w*|folder\w*|directory|dir)$/;

/** Feature names for token i (binary features). `tool` is the stage-2 family (input feature). */
export function tokenFeatureNames(toks, i, tool) {
  const w = toks[i].text;
  const lw = fold(w);
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
   160	      if (/[*?[]/.test(c)) glob = true;
   161	      if (!ps && c === '{' && /^\{[^}\s]*,[^}\s]*\}/.test(s.slice(i))) amb = true; // brace expansion
   162	      w = (w ?? '') + c;
   163	    }
   164	    if (w != null) raw += s.slice(start, i + 1);
   165	  }
   166	  flushSeg();
   167	  if (dropNext) return fail();
   168	  return { ok: true, segments };
   169	}
   170	
   171	/** All words of a single simple command (no separators), or null if the text is not exactly one word list. */
   172	export function wordsOf(line, kind = 'posix', opts = {}) {
   173	  const r = splitCommand(line, kind, opts);
   174	  if (!r.ok || r.segments.length !== 1) return null;
   175	  return r.segments[0].words;
   176	}
   177	
   178	/** Decode one shell word (as written in a command) to its literal value; null if it is not exactly one word. */
   179	export function decodeWord(text, kind = 'posix') {
   180	  const w = wordsOf(text, kind);
   181	  return w && w.length === 1 ? w[0] : null;
   182	}
   183	
   184	// a word that is a path by its form: /x, ~/x, ./x, ../x, C:\x, \\server
   185	const PATH_START = /^(?:~(?:[\\/]|$)|\.{1,2}[\\/]|[\\/]|[A-Za-z]:[\\/])/;
   186	// a word that contains a path separator or ends in a file extension ("My Notes.txt", "/tmp/a b")
   187	const PATH_FORM = /[\\/]|\.[A-Za-z0-9]{1,8}$/;
   188	// first words that make a multi-word argument read as part of the request, not a name ("the file notes.txt",
   189	// "folder /tmp/x", "plik raport.pdf", "all files in /tmp/x"); compared without diacritics ("usuń" -> "usun")
   190	const REQUEST_WORDS = new Set(('the all every each any some this that these those of in on at from to into with for ' +
   191	  'file files folder folders directory directories dir dirs document documents ' +
   192	  'delete remove erase rm show list display print open edit view read move copy rename find search make create ' +
   193	  'ten ta to te tego tej wszystkie wszystko kazdy kazda w we z ze na do od dla ' +
   194	  'plik pliki pliku plikow plikiem folderu folderze folderow katalog katalogi katalogu katalogow katalogiem dokument dokumenty ' +
   195	  'usun skasuj wykasuj kasuj pokaz wyswietl otworz edytuj przenies skopiuj kopiuj zmien znajdz szukaj utworz stworz').split(' '));
   196	const fold = (w) => w.normalize('NFD').replace(/\p{M}/gu, '').replace(/[łŁ]/g, 'l').toLowerCase();
   197	
   198	/**
   199	 * Join already-split words (argv, or the words of a `tellsh …` history line) back into request text without
   200	 * losing their boundaries. A single word is the whole request (`tellsh "delete folder /tmp/x"`) and is used as it is.
   201	 * Among several words, one with whitespace is
   202	 *   - a value, quoted again so the slot extractor reads it as one value (never `/tmp/a`), when it starts like a path
   203	 *     (`delete folder "/tmp/a b"`), or, after the first word, has the form of a file name whose first word is not a
   204	 *     request word and whose spaces are all after the last separator (`delete "My Notes.txt"`);
   205	 *   - request text, joined unquoted, when it is the first word and not a path (`tellsh "delete folder" /tmp/x`);
   206	 *   - unclear otherwise (`tellsh delete folder "my data"`, `delete "folder /tmp/x"`, `delete "the file notes.txt"`:
   207	 *     a name, or words of the request?): quoted, and listed in `unclear` so a changing command leaves that path as
   208	 *     a placeholder.
   209	 * -> { text, unclear: string[] }, or null when a word with whitespace contains both quote characters (cannot be
   210	 *    re-quoted for the extractor).
   211	 */
   212	export function joinArgs(words) {
   213	  if (words.length === 1) return { text: String(words[0]), unclear: [] };
   214	  const out = [];
   215	  const unclear = [];
   216	  for (let i = 0; i < words.length; i++) {
   217	    const s = String(words[i]);
   218	    if (!/\s/.test(s)) { out.push(s); continue; }
   219	    const sep = s.search(/[\\/]/);
   220	    const nameLike = i > 0 && PATH_FORM.test(s) && !REQUEST_WORDS.has(fold(s.trim().split(/\s+/)[0])) && (sep < 0 || s.search(/\s/) > sep);
   221	    const value = PATH_START.test(s) || nameLike;
   222	    if (!value && i === 0) { out.push(s); continue; }
   223	    if (!value) unclear.push(s);
   224	    if (!s.includes('"')) out.push(`"${s}"`);
   225	    else if (!s.includes("'")) out.push(`'${s}'`);
   226	    else return null;
   227	  }
   228	  return { text: out.join(' '), unclear };
   229	}
   230	
   231	/** joinArgs(words).text, or null. */
   232	export function joinWords(words) {
   233	  return joinArgs(words)?.text ?? null;
   234	}
   275	  const pwshNative = choice.kind === 'pwsh' && !choice.wrapPosix;
   276	  const nativeSlots = pwshNative ? pwshNativeSlots(tpl) : new Set();
   277	  const quote = !pwshNative ? baseQuote : (v, o = {}) => {
   278	    // function templates: every value is checked (the target program is not known statically)
   279	    if ((typeof tpl === 'function' || nativeSlots.has(o.name)) && unsafeNativePwshArg(v)) {
   280	      throw new UnquotableError(`value ${JSON.stringify(String(v))} cannot be passed to a native program safely by PowerShell < 7.3 (embedded " or trailing \\)`);
   281	    }
   282	    return baseQuote(v, o);
   283	  };
   284	  let command;
   285	  let missing = [];
   286	  try {
   287	    if (typeof tpl === 'function') {
   288	      const vals = { ...values };
   289	      for (const r of required) if (!(r in vals)) { missing.push(r); vals[r] = PLACEHOLDER(r); }
   290	      // only path slots may get a ./ prefix; any other value starting with - would be read as an
   291	      // option (printf -n, findstr /?, taskkill ...): it is left as a placeholder instead
   292	      for (const [k, v] of Object.entries(vals)) {
   293	        if (!PATH_SLOTS.has(k) && !RAW_OK[k] && typeof v === 'string' && /^-/.test(v)) { missing.push(k); vals[k] = PLACEHOLDER(k); }
   294	      }
   295	      const pathVals = new Set([...PATH_SLOTS].filter((k) => vals[k] != null).map((k) => String(vals[k])));
   296	      const q = (s) => {
   297	        const isPath = pathVals.has(String(s));
   298	        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { tilde: isPath });
   299	      };
   300	      // catalog functions take the OS string, variant functions a ctx object
   301	      command = tpl(vals, q, tpl === intent.template || tpl === intent.darwin ? e.os : e);
   302	      if (/<TEXT>/.test(command)) missing.push('text');
   303	    } else {
   304	      ({ command, missing } = render(tpl, values, required, quote, keepOptional.filter((k) => blank.includes(k) && !(k in values))));
   305	      missing = missing.map((m) => DERIVED_REQUIRED[m] || m);
   306	    }
   307	  } catch (err) {
   308	    if (!(err instanceof UnquotableError)) throw err;
   309	    return { ...base, command: null, gap: err.message, risk: intent.risk, warnings: [], critical: false, missing: [] };
   310	  }
   311	  if (choice.wrapPosix) {
   312	    // PowerShell < 7.3 drops embedded double quotes when passing arguments to native programs, so a
   313	    // POSIX command containing `"` is fed to bash on stdin instead of as a -c argument.
   314	    if (command.includes('"')) { command = psQuote(command) + ' | bash'; base.variant = 'piped to bash (no native PowerShell variant)'; }
   315	    else { command = 'bash -c ' + psQuote(command); base.variant = 'bash -c (no native PowerShell variant)'; }
   316	  }
   317	  missing = [...new Set(missing)];
   318	  const danger = checkDanger(command, intent.risk);
   319	  return {
   320	    ...base,
   321	    command,
   322	    risk: maxRisk(intent.risk, danger.risk),
   323	    warnings: danger.warnings,
   324	    critical: danger.critical,
   325	    missing,
   326	  };
   327	}
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
/bin/bash -lc "rg -n 'npx|wrangler|npm|call|cmd.exe|script' src/danger.js src/slots.js; cat test/devtools.test.js; git show 0d87457:src/history.js | sed -n '315,450p'; nl -ba scripts/hybrid/export_data.js | sed -n '83,111p'" in /workspace/tellsh
 succeeded in 0ms:
src/danger.js:20:// winPaths: backslash is never an escape (cmd.exe / PowerShell paths such as "C:\"), and the
src/danger.js:50:      flushCmd(); // standalone { } = command group / script block
src/danger.js:85:  'systemd-run': /^-[upEH]$|^--(?:unit|property|setenv|host|machine|description|slice|uid|gid|working-directory|on-calendar|on-active)$/,
src/danger.js:93:// `-c STR`, `--command STR`, `--command=STR` (`flock -c "rm -rf /" LOCK`, `script -c "…"`, `find … -exec sh -c "…"`);
src/danger.js:100:const RUNNERS = new Set(['su', 'runuser', 'flock', 'script', 'eval', 'env', 'watch', 'tmux', 'screen', 'ssh', 'xargs', 'parallel', 'sudo', 'doas',
src/danger.js:106:  'script', 'xvfb-run', 'dbus-launch', 'dbus-run-session', 'expect', 'gdb', 'ssh-agent', 'sshpass', 'with-lock-ex', 'lckdo', 'daemonize', 'start-stop-daemon']);
src/danger.js:217:// Lexically normalise a path for the danger checks: `//`, `/./`, a trailing `/.` and `/..` collapse
src/danger.js:300:    // the script is the first positional unless given with -e/-f; every later positional is a file
src/danger.js:302:    let script = !a.some((x) => /^-[a-zA-Z]*[ef]$|^--(?:expression|file)(?:=|$)/.test(x));
src/danger.js:309:      if (script) { script = false; continue; }
src/danger.js:336:  if (a.some((x) => /^\/[sq]$/i.test(x))) return; // cmd.exe syntax, see cmdDelCheck
src/danger.js:352:// cmd.exe rd/rmdir/del/erase (also reached from PowerShell aliases with cmd-style switches)
src/danger.js:456:// Interpreters running inline code (`python3 -c`, `perl -e`, `ruby -e`, `node -e`, `php -r`, awk programs that call
src/danger.js:458:// (`system("rm -rf /")`) and file-deleting calls on /, ~ or a system directory (`shutil.rmtree('/')`) are critical.
src/danger.js:465:  [/^(?:lua[\d.]*|luajit|julia|rscript|osascript|tclsh)$/, /^-e$/],
src/danger.js:492:const INTERP_HEAD = /^(?:python[\d.]*|pypy[\d.]*|perl[\d.]*|(?:j?ruby)[\d.]*|node|nodejs|bun|deno|php[\d.]*|lua[\d.]*|luajit|julia|rscript|osascript|tclsh|awk|gawk|mawk|nawk)$/;
src/danger.js:496: * command; interpreter code is high (cannot be checked) and its literals / delete calls are checked as for `-c`.
src/danger.js:510:  if (w.some((x) => /^<<-?\S/.test(String(x)) || x === '<<' || x === '<<-')) hit('high', `${h} runs a heredoc script; it cannot be checked`);
src/danger.js:564:  [/(?:\b(?:ba|z|da|k|fi)?sh\b|\bsource\b|\beval\b|(?:^|[;&|(]\s*)\.)\s[^|;&]*(?:<\(|\$\(|`)\s*(?:sudo\s+)?(?:curl|wget|fetch)\b/, 'high', 'runs a downloaded script'],
src/danger.js:566:  // text piped into a shell runs as a script whose content is not known here
src/danger.js:567:  [/\|\s*(?:(?:sudo|doas)\s+(?:-\S+\s+)*)?(?:\S*\/)?(?:ba|z|da|k|fi|c|tc|a|mk)?sh\b(?!\s+-[a-zA-Z]*c\b)(?![\w.-])/, 'high', 'runs piped text as a shell script'],
src/danger.js:568:  [/\|\s*(?:iex|Invoke-Expression)\b/i, 'high', 'runs piped text as a PowerShell script'],
src/danger.js:586:  // text piped into an interpreter with no script runs it as code (`curl … | python3`, `cat x | perl -`)
src/danger.js:587:  [/\|\s*(?:(?:sudo|doas)\s+(?:-\S+\s+)*)?(?:\S*\/)?(?:python[\d.]*|perl[\d.]*|ruby|node|php[\d.]*)(?:\s+-)?\s*(?:$|[;&|)])/, 'high', 'runs piped text as a script'],
src/danger.js:598:  [/\b(?:iex|Invoke-Expression)\b[^|;]*\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|curl|wget|DownloadString|DownloadData|Net\.WebClient)\b|\[scriptblock\]::Create\([^;]*\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|DownloadString)\b/i, 'high', 'runs a downloaded script'],
src/slots.js:45:  python: 'py', pythona: 'py', pythonowe: 'py', javascript: 'js', javascriptowe: 'js', typescript: 'ts',
src/slots.js:46:  typescriptowe: 'ts', markdown: 'md', markdownowe: 'md', tekstowe: 'txt', tekstowych: 'txt', tekstowy: 'txt',
src/slots.js:56:const FILE_WORDS = /\b(files?|plik\w*|scripts?|skrypt\w*|sources?|zrodl\w*|documents?|dokument\w*)\b/;
src/slots.js:60:  'vim nvim emacs zoom teams discord steam electron npm yarn webpack vite deno bun kubelet containerd jenkins tomcat ' +
src/slots.js:70:const KNOWN_PKGS = new Set(('htop curl wget git vim nano tmux jq nodejs npm python3 python3-pip pip docker docker.io ' +
src/slots.js:75:// package.json script names and command-line tools people ask about (npm run X, X --version, X --help)
src/slots.js:78:const KNOWN_TOOLS = new Set(('node nodejs npm npx pnpm yarn bun deno python python3 pip pip3 uv poetry pytest git gh docker ' +
src/slots.js:80:  'dotnet gcc g++ clang cmake make ffmpeg curl wget jq yq tmux vim nvim code wrangler vercel netlify heroku modal ' +
src/slots.js:90:// words between the install verb and the package name ("install globally the typescript package with npm")
src/slots.js:92:  'paczki module modul modulu library biblioteke biblioteka biblioteki lib npm pip pip3 python python3 via using przez ' +
src/slots.js:97:  'named called name nazwie nazwa nazwany nazwana o process processes proces procesy procesu procesow program ' +
src/slots.js:103:  'which what co gdzie where file plik pliku files pliki command komenda komendy polecenie polecenia called ' +
src/slots.js:472:  name: set('kill killall pkill zabij ubij zakoncz zakończ terminate stop end zamknij close proces procesu procesy procesow process processes named called nazwie pgrep find znajdz szukaj running dziala działa ubic zabic zabić'),
src/slots.js:477:  script: set('run uruchom odpal odpalic puść pusc wykonaj execute script skrypt skryptu skrypty npm'),
src/slots.js:479:  branch: set('branch branchu brancha branchem branche galaz galezi galezia checkout switch przelacz przelaczyc przejdz -b called named nazwie na to do delete usun skasuj'),
src/slots.js:495:const BRANCH_STRONG = set('branch branchu brancha branchem galaz galezi galezia -b checkout switch named called nazwie');
src/slots.js:497:const TAG_OF = { name: 'NAME', service: 'NAME', container: 'NAME', pkg: 'NAME', cmd: 'NAME', script: 'NAME', branch: 'BRANCH',
src/slots.js:518:    : slot === 'script' ? KNOWN_SCRIPTS : slot === 'cmd' ? KNOWN_TOOLS : null;
src/slots.js:519:  if (['pattern', 'message', 'text', 'name', 'service', 'container', 'pkg', 'cmd', 'branch', 'user', 'script'].includes(slot) && quoted.length) {
src/slots.js:555:    // "pip install requests", "npm i -g typescript": the installer is not the package, unless nothing else is named
src/slots.js:556:    // ("install npm"); a tool word right before the install verb is always the installer ("npm install")
src/slots.js:557:    const cmdLike = text.match(/\b(?:npm|pnpm|yarn|bun|pip3?|pipx|uv pip)\s+(?:i|install|add)\s+(?:(?:-[gDU]|--global|--save-dev|--upgrade|--user)\s+)*(@?[\w][\w.@\/=<>~+-]*)(?=\s|$)/i);
src/slots.js:559:    // `npm install @types/node%x`: an operand that is not a package name is returned as it is, so validation rejects it
src/slots.js:560:    // and the command shows a placeholder (never a plain `npm install`)
src/slots.js:561:    const odd = text.match(/\b(?:npm|pnpm|yarn|bun|pip3?|pipx|uv pip)\s+(?:i|install|add)\s+(?:(?:-[gDU]|--global|--save-dev|--upgrade|--user)\s+)*([^\s-]\S*)/i);
src/slots.js:563:    // an npm scoped package (`@types/node`) is the package wherever it stands ("install @types/node with npm")
src/slots.js:584:  if (slot === 'script') {
src/slots.js:587:    // an unknown name only when the request calls it a script ("run the storybook:ci script", "skrypt deploy-all")
src/slots.js:588:    if (!/\b(scripts?|skrypt\w*|npm run)\b/.test(ex.rest ?? text)) return null;
src/slots.js:589:    const r = nextAfter(words, TRIG.script, { skip: new Set([...STOP, 'npm', 'script', 'skrypt', 'skryptu', 'the']), accept: /^[\w:.-]+$/ });
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
  const R = { script: 'dev', pkg: 'requests', cmd: 'node', start: 10, end: 20, file: 'app.log', port: 5432, target: 'db.example.com', num: 42 };
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
    'wrangler_secret_put', 'gh_pr_create', 'gh_pr_merge', 'ssh_port_forward']) assert.notEqual(BY_ID[id].risk, 'safe', id);
  for (const id of ['gh_pr_list', 'gh_auth_status', 'tool_version', 'cli_help', 'print_line_range', 'wrangler_tail']) {
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
        const i = args.indexOf('--name');
        if (i >= 0 && args[i + 1]) ents.container ??= args[i + 1];
        const nm = args.find((a) => a.startsWith('--name='));
        if (nm) ents.container ??= nm.slice(7);
      } else if (DOCKER_CT.has(sub)) {
        const rest = args.slice(args.indexOf(sub) + 1);
        for (let i = 0; i < rest.length; i++) {
          if (DOCKER_VAL_FLAGS.has(rest[i])) { i++; continue; }
          if (/^-/.test(rest[i])) continue;
          ents.container ??= rest[i];
          break;
        }
        intent ??= DOCKER_INTENT[sub] || null;
        if (intent) slots = { container: ents.container, ...slots };
      }
    } else if (head === 'systemctl' || head === 'service') {
      const svc = head === 'systemctl' ? nonFlags[1] : nonFlags[0];
      const verb = head === 'systemctl' ? nonFlags[0] : nonFlags[1];
      if (svc) ents.service ??= svc.replace(/\.service$/, '');
      if (!intent && SYSTEMCTL_INTENT[verb] && svc) { intent = SYSTEMCTL_INTENT[verb]; slots = { service: ents.service }; }
    } else if (head === 'journalctl') {
      const i = args.findIndex((a) => a === '-u' || a === '--unit');
      if (i >= 0 && args[i + 1]) { ents.service ??= args[i + 1].replace(/\.service$/, ''); intent ??= 'journal_service'; }
    } else if (head === 'kill') {
      const pid = nonFlags.find((a) => /^\d+$/.test(a));
      if (pid) { ents.pid ??= pid; if (!intent) { intent = 'kill_by_pid'; slots = { pid }; } }
    } else if (['pkill', 'killall', 'pgrep', 'pidof'].includes(head)) {
      if (nonFlags[0]) ents.proc ??= nonFlags[nonFlags.length - 1];
      if (!intent && head === 'pgrep') { intent = 'find_process'; slots = { name: ents.proc }; }
    } else if ((head === 'ps' || head === 'top' || head === 'htop') && args.some((a) => /^-\w*p$/.test(a))) {
      const i = args.findIndex((a) => /^-\w*p$/.test(a));
      const pid = (args[i + 1] || '').split(',')[0];
      if (/^\d+$/.test(pid)) ents.pid ??= pid;
    } else if (head === 'grep' && split.segments.some((s) => s.words[0] === 'ps')) {
      if (nonFlags[0]) ents.proc ??= nonFlags[0];
    } else if ((head === 'grep' || head === 'rg') && nonFlags[0]) {
      const path = nonFlags[1];
      if (!intent) {
        intent = args.some((a) => /^-\w*l/.test(a)) ? 'grep_files_containing' : 'grep_text';
        slots = { pattern: rawOf(nonFlags[0]), ...(path ? { path } : {}) };
      }
      if (path) ents[typeByExt(path)] ??= path;
    } else if (head === 'lsof' || head === 'ss' || head === 'netstat' || head === 'fuser') {
      const pm = args.map(rawOf).join(' ').match(/(?::|tcp:|udp:|sport = :)(\d{2,5})\b/);
      if (pm) { ents.port ??= pm[1]; if (!intent) { intent = 'process_on_port'; slots = { port: pm[1] }; } }
    } else if (head === 'git') {
      const sub = nonFlags[0];
      if (['checkout', 'switch', 'merge', 'rebase'].includes(sub) || (sub === 'branch' && nonFlags[1])) {
        const b = nonFlags[nonFlags.length - 1];
        const creates = args.some((a) => ['-b', '-B', '-c', '-C'].includes(a));
        if (b && b !== sub && b !== '.' && !isGlob(b) && !b.startsWith('-')) {
          ents.branch ??= b;
          if ((sub === 'checkout' || sub === 'switch')) ents.current ??= b;
          if (creates) ents.created ??= b;
        }
      } else if (sub === 'push' && nonFlags.length >= 2) ents.branch ??= nonFlags[nonFlags.length - 1];
      else if (sub === 'clone' && nonFlags[1]) ents.url ??= nonFlags[1];
      else if (['add', 'diff', 'blame', 'restore', 'rm', 'log'].includes(sub) && nonFlags[1] && nonFlags[1] !== '.') ents.file ??= nonFlags[nonFlags.length - 1];
    } else if (['ssh', 'ping', 'dig', 'nslookup', 'traceroute', 'mtr', 'host', 'telnet', 'nc'].includes(head)) {
      const h = nonFlags.find((a) => /[\w-]+\.[\w.-]+|^[\w-]+@/.test(a)) || nonFlags[0];
      if (h) ents.host ??= h;
    } else if (['curl', 'wget', 'http'].includes(head)) {
      const u = args.find((a) => /^https?:\/\//.test(a));
      if (u) {
        ents.url ??= u;
        const base = u.replace(/[?#].*$/, '').split('/').pop();
        const saves = head === 'wget' || args.some((a) => /^-\w*O/.test(a));
        if (saves && /\.\w{1,5}$/.test(base)) ents.file ??= base;
      }
    } else if (head === 'rm' || head === 'trash' || head === 'rmdir') {
      const p = nonFlags[nonFlags.length - 1];
      if (p) ents[args.some((a) => /^-\w*r/i.test(a)) || head === 'rmdir' ? 'dir' : 'file'] ??= p;
    } else if (head === 'cp' || head === 'mv' || head === 'ln') {
      const p = nonFlags[nonFlags.length - 1];
      if (p) ents[typeByExt(p)] ??= p;
    } else if (head === 'tar' || head === 'zip') {
      const a = nonFlags.find((x) => /\.(tar(\.\w+)?|tgz|zip)$/.test(x));
      if (a) ents.file ??= a;
    } else if (FILE_HEADS.has(head)) {
      const p = nonFlags.filter((a) => !/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(a)).pop();
      if (p) ents[/\/$/.test(p) ? 'dir' : 'file'] ??= p;
    } else if (DIR_HEADS.has(head)) {
      const p = head === 'find' ? nonFlags[0] : nonFlags.find((a) => !isGlob(a));
      if (p) ents.dir ??= p;
    } else if (!INERT_HEADS.has(head.toLowerCase())) {
      // unknown command (or unknown cmdlet) naming a path: we cannot tell what it did with it, so an
      // older file/dir must not be picked up by "it"
      const p = nonFlags.find((a) => PATHLIKE.test(rawOf(a)) && !/^\w+:\/\//.test(rawOf(a)));
      if (p) ents[typeByExt(p)] ??= AMB + rawOf(p);
    }
  }
  if (Object.values(slots).some(isAmbiguous)) ambiguous = true;
  return { line: t, intent, slots, ents, ambiguous };
}

const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];

/**
 * Build the context object from history commands (oldest first).
 * kind: 'posix' | 'pwsh' (default: `cmds.kind` as set by loadHistory, else posix)
 * -> { n, ents: {type: value}, entOrder: [types by recency], last: {intent, slots, ambiguous}, features: [...] }
 *    values that could not be read unambiguously are kept as AMB-prefixed strings (see isAmbiguous)
 */
export function buildContext(cmds, { classify, cwd, kind } = {}) {
  const k = kind || cmds.kind || 'posix';
  const ents = {};
  const all = {};
  const recency = {};
  let last = null;
  let current = null;
  const recent = [...cmds].reverse();
  recent.forEach((line, i) => {
    const a = analyzeCommand(line, classify, k);
    if (!last && a.intent) last = { intent: a.intent, slots: a.slots, age: i, ambiguous: !!a.ambiguous };
    if (current == null && a.ents.current && !isAmbiguous(a.ents.current)) current = a.ents.current;
    for (const t of ENT_TYPES) {
      if (a.ents[t] == null) continue;
      if (ents[t] == null) { ents[t] = a.ents[t]; recency[t] = i; }
      (all[t] ??= []).includes(String(a.ents[t])) || all[t].push(String(a.ents[t]));
    }
  });
  const entOrder = Object.keys(ents).sort((a, b) => recency[a] - recency[b] || ENT_TYPES.indexOf(a) - ENT_TYPES.indexOf(b));
  const ctx = { n: cmds.length, ents, all, currentBranch: current, entOrder, last, cwdFlags: cwdFlags(cwd) };
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
    83	    const key = n + '|' + r.intent + '|' + (r.shell || '');
    84	    if (seen.has(key)) continue;
    85	    seen.add(key);
    86	    base.push(r);
    87	  }
    88	  const out = heldOutFilter(heldOut);
    89	  const { rows, push } = out;
    90	  let gid = 0;
    91	  for (const r of base) {
    92	    const g = gid++;
    93	    const tool = FAMILY_OF[r.intent];
    94	    const split = isDev(r.text) ? 'dev' : 'train';
    95	    const env = () => (r.shell ? { shell: r.shell, os: r.os || 'linux' } : sampleEnv());
    96	    const { spans } = silverSpans(r.text, r.intent);
    97	    const sp = (s) => s.map((x) => [x.type, x.start, x.end]);
    98	    push({ text: r.text, tool, intent: r.intent, lang: r.lang, ...env(), spans: sp(spans), gid: g, src: r.src, split, kind: 'orig' });
    99	    push({ text: typo(r.text), tool, intent: r.intent, lang: r.lang, ...env(), spans: null, gid: g, src: r.src, split, kind: 'typo' });
   100	    for (let k = 0; k < 2; k++) {
   101	      const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'train' });
   102	      if (rx.text !== r.text) push({ text: rx.text, tool, intent: r.intent, lang: r.lang, ...env(), spans: sp(rx.spans), gid: g, src: r.src, split, kind: 'relex' });
   103	    }
   104	  }
   105	  // tldr descriptions: tool label only (intent ''), capped per family/lang as in gen_data
   106	  const tldr = readJsonl(join(ROOT, 'data', 'tldr', 'tools.jsonl'));
   107	  const cap = {};
   108	  for (const r of tldr.sort(() => rng() - 0.5)) {
   109	    if (!FAMILIES[r.tool] || !r.text || r.text.length < 8 || heldOut.has(r.text)) continue;
   110	    const key = r.tool + r.lang;
   111	    if ((cap[key] = (cap[key] || 0) + 1) > (r.lang === 'pl' ? 60 : 80)) continue;

exec
/bin/bash -lc "node --input-type=module <<'EOF'
import {suggest} from './src/pipeline.js';
import {readFileSync} from 'node:fs';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const q of ['start wrangler dev','run wrangler dev','wrangler dev','log in to cloudflare','show cloudflare account']) { const r=suggest(q,{env}); console.log({q,cmd:r.command,risk:r.risk,method:r.method,missing:r.missing}); }
for(const [h,q] of [['env -C /repo cat notes.txt','delete it'],['sudo -D /repo cat notes.txt','delete it'],['git -C/repo blame notes.txt','same for /tmp/file.txt'],['docker -Htcp://prod:2375 logs web','same for api'],['tellsh show \""'$DIR/notes.txt"'"','delete it'],['tellsh -- show -danger.txt','delete it']]) { const r=suggest(q,{env,history:[h]}); console.log({h,q,cmd:r.command,ctx:r.context}); }
const rs=readFileSync('build/hybrid/train.jsonl','utf8').trim().split('\\n').map(JSON.parse);
const tr=new Set(rs.filter(r=>r.split==='train').map(r=>r.text)); const overlap=rs.filter(r=>r.split==='dev'&&tr.has(r.text));console.log({exactOverlap:overlap.length,publicExamples:overlap.filter(r=>r.src"'!=='"'real').slice(0,8).map(({text,kind})=>({text,kind}))});
EOF" in /workspace/tellsh
 succeeded in 360ms:
{
  q: 'start wrangler dev',
  cmd: 'npx wrangler dev',
  risk: 'safe',
  method: 'catalog',
  missing: []
}
{
  q: 'run wrangler dev',
  cmd: 'npx wrangler dev',
  risk: 'safe',
  method: 'catalog',
  missing: []
}
{
  q: 'wrangler dev',
  cmd: 'npx wrangler dev',
  risk: 'safe',
  method: 'catalog',
  missing: []
}
{
  q: 'log in to cloudflare',
  cmd: 'npx wrangler login',
  risk: 'safe',
  method: 'catalog',
  missing: []
}
{
  q: 'show cloudflare account',
  cmd: 'npx wrangler whoami',
  risk: 'safe',
  method: 'catalog',
  missing: []
}
{
  h: 'env -C /repo cat notes.txt',
  q: 'delete it',
  cmd: 'rm notes.txt',
  ctx: {
    used: true,
    commands: 1,
    rule: 'pronoun',
    note: '"file" from history = notes.txt'
  }
}
{
  h: 'sudo -D /repo cat notes.txt',
  q: 'delete it',
  cmd: 'rm notes.txt',
  ctx: {
    used: true,
    commands: 1,
    rule: 'pronoun',
    note: '"file" from history = notes.txt'
  }
}
{
  h: 'git -C/repo blame notes.txt',
  q: 'same for /tmp/file.txt',
  cmd: null,
  ctx: {
    used: true,
    commands: 1,
    rule: 'refused',
    note: 'the previous command is not one tellsh can repeat; not guessing'
  }
}
{
  h: 'docker -Htcp://prod:2375 logs web',
  q: 'same for api',
  cmd: 'docker logs --tail 100 -f api',
  ctx: {
    used: true,
    commands: 1,
    rule: 'same-for',
    note: 'same as previous docker_logs with container=api'
  }
}
{
  h: 'tellsh show "$DIR/notes.txt"',
  q: 'delete it',
  cmd: "rm '$DIR/notes.txt'",
  ctx: {
    used: true,
    commands: 1,
    rule: 'pronoun',
    note: '"file" from history = $DIR/notes.txt'
  }
}
{
  h: 'tellsh -- show -danger.txt',
  q: 'delete it',
  cmd: 'rm <FILE>',
  ctx: {
    used: true,
    commands: 1,
    rule: 'refused',
    note: 'the previous command names nothing the reference could mean; not guessing'
  }
}
{
  exactOverlap: 54,
  publicExamples: [
    { text: 'policz pliki w /var/log', kind: 'orig' },
    { text: 'ile słów jest w pliku docker-compose.yml', kind: 'relex' },
    { text: 'zawartość archiwum release.tar.gz', kind: 'relex' },
    { text: 'skasuj plik Makefile', kind: 'relex' },
    { text: 'rozpakuj src.tgz', kind: 'relex' },
    { text: 'create folder ./src', kind: 'relex' },
    { text: 'zrestartuj cups', kind: 'relex' },
    { text: 'zrestartuj jenkins', kind: 'relex' }
  ]
}

web search: 
web search: site.developers.cloudflare.com workers custom builds wrangler dev build command ...
exec
/bin/bash -lc "node --input-type=module <<'EOF'
import {readFileSync,createReadStream} from 'node:fs';
import {createInterface} from 'node:readline';
import {vectorize,fnv1a} from './src/features.js';
import {FAMILIES} from './src/tools.js';
const rs=readFileSync('build/hybrid/train.jsonl','utf8').trim().split('\\n').map(JSON.parse).filter(r=>r.split==='dev');
const ent=['container','service','pid','proc','port','file','dir','branch','host','url'];
const extra=[...['bash','zsh','sh','powershell','fish','cmd'].map(x=>'shell='+x),...['linux','darwin','win32'].map(x=>'os='+x),...ent.flatMap(x=>['ctx_last='+x,'ctx_has='+x]),...Object.keys(FAMILIES).map(x=>'ctx_tool='+x),'ctx_cwd=git','ctx_cwd=compose'];
const excluded=new Set(extra.map(x=>fnv1a('x:'+x)%(1<<18)));
const key=f=>JSON.stringify(f.filter(([k])=>"'!excluded.has(k)).sort((a,b)=>a[0]-b[0]).map(([k,v])=>[k,+v.toFixed(6)]));
const devkeys=new Map();rs.forEach(r=>{const k=key([...vectorize(r.text,1<<18)]); if(!devkeys.has(k))devkeys.set(k,[]);devkeys.get(k).push(r);});
const hits=new Set(); const groups={};
for await(const l of createInterface({input:createReadStream('"'build/adev/build/cls.jsonl'),crlfDelay:Infinity})){const r=JSON.parse(l);const k=key(r.f); if(devkeys.has(k)){hits.add(k);groups[r.g]=(groups[r.g]||0)+1;}}
const overlaps=[...hits].flatMap(k=>devkeys.get(k));
console.log(JSON.stringify({devRows:rs.length,overlap:overlaps.length,byKind:Object.fromEntries(['orig','typo','relex'].map(k=>[k,overlaps.filter(r=>r.kind===k).length])),sources:groups,examples:overlaps.filter(r=>r.src"'!=='"'real').slice(0,8).map(({text,kind})=>({text,kind}))},null,2));
EOF" in /workspace/tellsh
 succeeded in 3379ms:
{
  "devRows": 5356,
  "overlap": 28,
  "byKind": {
    "orig": 0,
    "typo": 0,
    "relex": 28
  },
  "sources": {
    "intents": 31,
    "shell": 2
  },
  "examples": [
    {
      "text": "ile plików jest w /opt/app",
      "kind": "relex"
    },
    {
      "text": "most recent files in build",
      "kind": "relex"
    },
    {
      "text": "list hidden files in ./tests",
      "kind": "relex"
    },
    {
      "text": "sledz Dockerfile",
      "kind": "relex"
    },
    {
      "text": "zawartość archiwum logs-2024.tgz",
      "kind": "relex"
    },
    {
      "text": "usun plik app.log",
      "kind": "relex"
    },
    {
      "text": "stwórz pusty plik ~/projects",
      "kind": "relex"
    },
    {
      "text": "logi usługi haproxy",
      "kind": "relex"
    }
  ]
}

web search: 
exec
/bin/bash -lc "nl -ba src/catalog.js | sed -n '254,278p'; nl -ba src/danger.js | sed -n '73,95p'; nl -ba scripts/hybrid/train_a_dev.sh | sed -n '16,30p'; git status --short" in /workspace/tellsh
 succeeded in 0ms:
   254	  T('docker_compose_up', 'Start docker compose services', 'docker compose up -d', {}, 'medium'),
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
   271	  T('wrangler_dev', 'Run a Cloudflare Worker locally (wrangler dev)', 'npx wrangler dev', {}),
   272	  T('wrangler_tail', 'Stream live logs of a deployed Cloudflare Worker', 'npx wrangler tail', {}),
   273	  T('wrangler_secret_put', 'Set a secret (environment variable) on a Cloudflare Worker', 'npx wrangler secret put {var!raw}',
   274	    { var: null }, 'medium', { notes: 'wrangler prompts for the value, so it never lands in shell history' }),
   275	  T('wrangler_login', 'Log in to Cloudflare with wrangler', 'npx wrangler login', {}),
   276	  T('wrangler_whoami', 'Show which Cloudflare account wrangler is logged in as', 'npx wrangler whoami', {}),
   277	
   278	  // ---------- GitHub CLI ----------
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
    88	  chrt: /^-[TPD]$|^--(?:sched-runtime|sched-period|sched-deadline)$/,
    89	  cgexec: /^-g$/,
    90	  torsocks: /^-[uapP]$|^--(?:user|pass|address|port)$/,
    91	};
    92	// Command strings given as an option value are checked as commands of their own. Any program:
    93	// `-c STR`, `--command STR`, `--command=STR` (`flock -c "rm -rf /" LOCK`, `script -c "…"`, `find … -exec sh -c "…"`);
    94	// shells, su and runuser also take -c inside a cluster (`bash -lc "…"`, `su -lc "…"`); env -S splits its string.
    95	const CMD_STRING_ANY = /^(?:-c|--command|--session-command)$/;
    16	mkdir -p $T/test/fixtures && cp $ROOT/test/*.js $T/test/
    17	cp $ROOT/scripts/lib/*.js $T/scripts/lib/
    18	cp $ROOT/scripts/train.py $T/scripts/train.py
    19	cp $ROOT/model/*.json $T/model/
    20	# gen_data: additionally drop every dev-split sentence (same hash as export_data.js), from every training source: the
    21	# base intent rows, and through leaks() (which every emitted row and the tldr / out-of-domain loaders check) the OOD,
    22	# tldr and anaphora rows (an OOD dev sentence is skipped with its typo copy)
    23	sed -e "s#if (heldOut.has(r0.text)) { dropped++; continue; }#if (heldOut.has(r0.text) || isDevText(r0.text)) { dropped++; continue; }#" \
    24	    -e "s#^  const leaks = excl.has;\$#  const leaks = (t) => excl.has(t) || isDevText(t);#" \
    25	    -e "s#^import { ctxFeatures } from '../src/history.js';#&\nimport { fnv1a as _fnv } from '../src/features.js';\nconst isDevText = (t) => _fnv('dev:' + normalize(t)) % 10 === 0;#" \
    26	    $ROOT/scripts/gen_data.js > $T/scripts/gen_data.js
    27	# every substitution must have happened (the import alone is not enough)
    28	grep -q 'heldOut.has(r0.text) || isDevText' $T/scripts/gen_data.js
    29	grep -q 'const leaks = (t) => excl.has(t) || isDevText(t);' $T/scripts/gen_data.js
    30	cd $T && node scripts/gen_data.js && python3 scripts/train.py --out $T/model/model.bin
?? review/r9-claude.md
?? review/r9-codex.md

web search: https://developers.cloudflare.com/workers/wrangler/custom-builds/
codex
Two more checks found issues: directory-changing wrappers also lose their scope during history parsing, and `wrangler dev` is marked safe despite running configured build commands. Training-data checks found 54 exact texts shared between the encoder’s train and dev splits, plus 28 dev relexicalizations whose text features appear in A_dev training.
web search: 
exec
/bin/bash -lc "node --input-type=module <<'EOF'
import cp from 'node:child_process';
import {syncBuiltinESMExports} from 'node:module';
import {EventEmitter} from 'node:events';
cp.spawn=(bin,args)=>{console.log('CAPTURED_ONLY',JSON.stringify({bin,args})); const child=new EventEmitter(); process.nextTick(()=>child.emit('exit',0,null)); return child;};
syncBuiltinESMExports();
const {main}=await import('./src/cli.js');
console.log('EXIT',await main(['--yes','--shell','bash','--os','linux','start','wrangler','dev']));
EOF" in /workspace/tellsh
 succeeded in 74ms:
$ npx wrangler dev
  wrangler_dev · bash/linux · risk: safe · confidence: 99%
CAPTURED_ONLY {"bin":"bash","args":["-c","npx wrangler dev"]}
EXIT 0

web search: 'This command will be run' in https://developers.cloudflare.com/workers/wrangler/custom-builds/
codex
1. **Major — `wrangler dev` bypasses the project-code confirmation gate.** [src/catalog.js:271](/workspace/tellsh/src/catalog.js:271) defaults this intent to `safe`. `tellsh --yes start wrangler dev` reaches execution of `npx wrangler dev` without confirmation; verified with execution mocked. Wrangler runs arbitrary configured build commands during `dev` ([Cloudflare documentation](https://developers.cloudflare.com/workers/wrangler/custom-builds/)). Mark this intent at least `medium`, consistently with `npm_run_script`.

2. **Major — Attached scope options bypass the history guard.** [src/history.js:560](/workspace/tellsh/src/history.js:560) requires `=` or end-of-word after short options, missing valid attached values. Reproductions: `git -C/repo blame notes.txt` → “delete it” → `rm notes.txt`; `docker -Htcp://prod:2375 logs web` → “stop it” → `docker stop web`. These target the current directory/default daemon instead of the referenced scope. Recognize attached short-option values before resolving or repeating commands.

3. **Major — Unwrapping discards working-directory changes.** [src/history.js:466](/workspace/tellsh/src/history.js:466) strips wrappers without retaining their directory scope. Both `env -C /repo cat notes.txt` and `sudo -D /repo cat notes.txt`, followed by “delete it”, produce `rm notes.txt` in tellsh’s current directory. Preserve wrapper scope or mark relative operands ambiguous before extracting entities.

4. **Minor — Augmentation still leaks calibration examples into training.** [scripts/hybrid/export_data.js:102](/workspace/tellsh/scripts/hybrid/export_data.js:102) assigns augmented rows their original sentence’s split without checking collisions across splits. Existing artifacts contain 54 dev rows with byte-identical training text, including `policz pliki w /var/log`. Additionally, [scripts/hybrid/train_a_dev.sh:24](/workspace/tellsh/scripts/hybrid/train_a_dev.sh:24) filters by each emitted text’s hash rather than the complete exported dev set; 28 dev relexicalizations match A_dev training text features after removing context features. Exclude the complete dev-text index from training, then rebuild and recalibrate.

Review remained read-only. Full-suite validation was limited by sandbox `spawnSync EPERM` failures; targeted reproductions above succeeded.

VERDICT: REQUEST_CHANGES
tokens used
161,985
1. **Major — `wrangler dev` bypasses the project-code confirmation gate.** [src/catalog.js:271](/workspace/tellsh/src/catalog.js:271) defaults this intent to `safe`. `tellsh --yes start wrangler dev` reaches execution of `npx wrangler dev` without confirmation; verified with execution mocked. Wrangler runs arbitrary configured build commands during `dev` ([Cloudflare documentation](https://developers.cloudflare.com/workers/wrangler/custom-builds/)). Mark this intent at least `medium`, consistently with `npm_run_script`.

2. **Major — Attached scope options bypass the history guard.** [src/history.js:560](/workspace/tellsh/src/history.js:560) requires `=` or end-of-word after short options, missing valid attached values. Reproductions: `git -C/repo blame notes.txt` → “delete it” → `rm notes.txt`; `docker -Htcp://prod:2375 logs web` → “stop it” → `docker stop web`. These target the current directory/default daemon instead of the referenced scope. Recognize attached short-option values before resolving or repeating commands.

3. **Major — Unwrapping discards working-directory changes.** [src/history.js:466](/workspace/tellsh/src/history.js:466) strips wrappers without retaining their directory scope. Both `env -C /repo cat notes.txt` and `sudo -D /repo cat notes.txt`, followed by “delete it”, produce `rm notes.txt` in tellsh’s current directory. Preserve wrapper scope or mark relative operands ambiguous before extracting entities.

4. **Minor — Augmentation still leaks calibration examples into training.** [scripts/hybrid/export_data.js:102](/workspace/tellsh/scripts/hybrid/export_data.js:102) assigns augmented rows their original sentence’s split without checking collisions across splits. Existing artifacts contain 54 dev rows with byte-identical training text, including `policz pliki w /var/log`. Additionally, [scripts/hybrid/train_a_dev.sh:24](/workspace/tellsh/scripts/hybrid/train_a_dev.sh:24) filters by each emitted text’s hash rather than the complete exported dev set; 28 dev relexicalizations match A_dev training text features after removing context features. Exclude the complete dev-text index from training, then rebuild and recalibrate.

Review remained read-only. Full-suite validation was limited by sandbox `spawnSync EPERM` failures; targeted reproductions above succeeded.

VERDICT: REQUEST_CHANGES
