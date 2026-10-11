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
session id: 01a12a1b-f3fa-71b0-b317-4b4c96f38bcb
--------
user
Re-review of tellsh (git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD; runtime src/ bin/, training scripts). History refs are intentionally limited to 1 line back. Read-only. Findings with severity and file:line. End with exactly one line that is either VERDICT: APPROVE (no blocker/major) or VERDICT: REQUEST_CHANGES.
codex
I’ll review the diff and affected runtime and training paths, keeping the review read-only and within the available history.

exec
/bin/bash -lc "pwd && rg --files -g AGENTS.md -g '"'!node_modules'"' -g '"'!vendor'"' && git status --short && git diff --stat 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD" in /workspace/tellsh
 exited 1 in 0ms:
/workspace/tellsh

exec
/bin/bash -lc 'for p in /AGENTS.md /workspace/AGENTS.md /workspace/tellsh/AGENTS.md; do if test -f "$p"; then cat "$p"; fi; done' in /workspace/tellsh
 succeeded in 0ms:
exec
/bin/bash -lc "rg --files -g '"'!node_modules'"' -g '"'!vendor'"'" in /workspace/tellsh
 succeeded in 0ms:
LICENSE
test/regressions22.test.js
test/regressions6.test.js
test/regressions21.test.js
test/regressions14.test.js
test/slot-cases.js
test/regressions3-render.test.js
test/regressions20.test.js
test/regressions19.test.js
test/regressions9.test.js
test/regressions13.test.js
test/fixtures/parity.json
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
review/r1-codex.md
review/r19-claude.md
review/r6-codex.md
review/r20-codex.md
review/fix13-log.md
review/fix9-log.md
review/r5-codex.md
review/fix4-log.md
review/fix19-log.md
review/r18-claude.md
review/r4-claude.md
review/fix18-log.md
review/r9-codex.md
review/r11-codex.md
review/r19-codex.md
review/STATUS
review/fix8-log.md
review/r13-codex.md
review/r20-claude.md
review/r10-claude.md
review/fix17-log.md
review/r11-claude.md
review/r2-claude.md
review/fix11-log.md
review/fix7-log.md
review/r13-claude.md
review/fix5-log.md
review/r1-claude.md
review/fix3-log.md
review/r8-codex.md
review/r9-claude.md
review/r2-codex.md
review/r17-claude.md
review/r17-codex.md
review/r21-codex.md
review/r16-claude.md
review/r7-codex.md
review/fix15-log.md
review/r8-claude.md
review/r12-claude.md
review/r7-claude.md
review/r12-codex.md
review/r14-claude.md
review/r5-claude.md
review/fix12-log.md
review/fix14-log.md
review/r4-codex.md
review/r14-codex.md
review/hybrid-log.md
review/fix2-log.md
review/r3-claude.md
review/r18-codex.md
review/r6-claude.md
review/r21-claude.md
review/r15-codex.md
review/fix16-log.md
review/fix20-log.md
review/fix10-log.md
review/fix4b-log.md
review/r15-claude.md
review/r10-codex.md
review/r16-codex.md
review/r3-codex.md
review/fix1-log.md
scripts/compare.js
scripts/gen_data.js
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
scripts/hybrid/train_a_dev.sh
scripts/hybrid/train_encoder.py
scripts/lib/silver.js
scripts/lib/cmdnorm.js
scripts/lib/pwsh_parse.js
scripts/lib/jev.js
scripts/lib/confusable.js
scripts/lib/heldout.js
scripts/train.py
scripts/teacher.js
scripts/report.js
scripts/build_triggers.js
scripts/bench.js
package.json
bin/tellsh.js
EVAL.md
HYBRID.md
scripts/eval.js
scripts/tldr_ingest.py
DATA_LICENSES.md
scripts/check_variants.js
scripts/real/report_v04.js
scripts/real/group.js
scripts/real/group_leak.js
scripts/real/real_rows.js
scripts/real/prepare_real.js

exec
/bin/bash -lc 'git status --short && git diff --stat 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD' in /workspace/tellsh
 succeeded in 0ms:
?? review/r21-claude.md
?? review/r21-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   543 +-
 HYBRID.md                                    |   617 ++
 README.md                                    |   178 +-
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
 src/fill.js                                  |   253 +-
 src/history.js                               |  1026 ++-
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
 test/regressions22.test.js                   |    98 +
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
 227 files changed, 228014 insertions(+), 807 deletions(-)

exec
/bin/bash -lc 'cat review/fix20-log.md && cat test/regressions22.test.js && cat test/regressions21.test.js' in /workspace/tellsh
 succeeded in 0ms:
I fixed all three Major findings from round 20 and committed them as `b04a93c` (not pushed). All 367 tests pass. The eval scores didn't change, and bench was re-run.

**1. A PR picked out by a word before "pr" (`src/fill.js`)** — none of these give a bare `gh pr merge` any more:
- "merge the dependabot / renovate / docs / draft / green / big / above / open pr", "merge said pr" and "merge the aforementioned / mentioned pr" now give `gh pr merge <PR>` with `missing=['pr']`. With history `gh pr view 45` they still give `<PR>`, so "merge the above pr" and "merge said pr" no longer skip the history.
- "merge the pr with label urgent" and "merge the pull request with title fix login" (plus "labeled …" and the Polish "z etykietą …") are withheld the same way.
- "merge the pr", "merge pr", "merge the current pr", "merge my pr" and "merge the github pr" still give bare `gh pr merge`.
- "zmerguj to pr" is now treated like "that pr": it gives `gh pr merge 45` with that history, and `<PR>` without history.

**2. wrangler deploy dropping a dry run or environment (`src/catalog.js`, `src/variants.js`)** — the template is now `npx wrangler deploy«--dry-run»«--env NAME»` on bash, pwsh and cmd:
- "do a dry run of wrangler deploy" → `npx wrangler deploy --dry-run`
- "deploy worker to staging" → `npx wrangler deploy --env staging`
- An environment that can't be read, like "to my env" or "na produkcję", gives `--env <WENV>` rather than the default target.

**Minors fixed:**
- A time word after "from" or "for" is no longer read as a branch name: "from last week", "from monday", "from before" and "from previously" all give `<PR>`. Branch names still work: "from bob" → `bob` and "for main" → `main`.
- The Polish "ten pr" regression is fixed. "ten" and "that one" were being read as the numbers 10 and 1, so "merge ten pr", "zmerguj ten pull request" and "merge that one pr" give `gh pr merge 45` again after `gh pr view 45`.

**Left as is:**
- "merge the pr for login" still gives `gh pr merge login`. A word after "for" or "from" can't be told apart from a branch name, and "from bob" → `bob` is a deliberate tested behaviour.
- The other Minors (`SetEnvironmentVariable` spacing, `rm Env:` in bash) and the nits are untouched.
- On cmd, "scal ten pr" is classified as `gh pr create --fill`. It already did this before my change, so it's a classifier problem rather than this fix; the new test only checks that phrase on bash.

The tests are in `test/regressions22.test.js`, and the README now describes the new gh pr and wrangler behaviour.

No git identity is configured on this machine, so I set your existing author name and email for this one commit only, without changing the git config. I didn't touch the empty untracked `review/fix20-log.md`.

The Cloudflare, Home and cnvs.app connectors need authorizing in your claude.ai connector settings before they can be used; none of them were needed here.
// Regression tests for round 21: the round-20 findings (review/r20-claude.md, review/r20-codex.md). A pull request picked
// out by a word before "pr" ("the dependabot pr", "said pr", "the above pr") or by a label / title ("the pr with label
// urgent") is withheld, never a bare `gh pr merge` (the current branch's), also with history; a when-word after "from" /
// "for" is not a branch; Polish "ten pr" / "that one pr" read the history again; wrangler deploy keeps a dry run and an
// environment instead of deploying to the default target.
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

test('major: a pull request picked out by a word before "pr" is withheld, with or without history', () => {
  const qs = ['merge the dependabot pr', 'merge the renovate pr', 'merge the docs pr', 'merge the draft pr', 'merge the green pr',
    'merge the big pr', 'merge the above pr', 'merge said pr', 'merge the aforementioned pr', 'merge the mentioned pr',
    'merge the dependabot pull request', 'merge the open pr'];
  for (const env of SHELLS) {
    for (const q of qs) {
      for (const h of [null, ['gh pr view 45']]) withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
    // nothing between the determiner and "pr", or a word that keeps the current branch's: still bare
    for (const q of ['merge the pr', 'merge pr', 'merge the current pr', 'merge my pr', 'merge the github pr', 'merge the pull request']) {
      exact(run(q, null, env), 'gh pr merge', `${env.shell}: ${q}`);
    }
  }
});

test('major: Polish "to pr" is a reference: the history\'s pull request, else withheld', () => {
  for (const env of SHELLS) {
    withheld(run('zmerguj to pr', null, env), 'gh pr merge <PR>', 'pr', env.shell);
    exact(run('zmerguj to pr', ['gh pr view 45'], env), 'gh pr merge 45', env.shell);
  }
});

test('major: a pull request picked out by a label or a title is withheld', () => {
  for (const env of SHELLS) {
    for (const q of ['merge the pr with label urgent', 'merge the pull request with title fix login', 'merge the pr with the label bug',
      'merge the pr labeled urgent', 'zmerguj pr z etykietą pilne']) {
      for (const h of [null, ['gh pr view 45']]) withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
  }
});

test('minor: a when-word after "from" / "for" is not a branch', () => {
  for (const q of ['merge the pr from last week', 'merge the pr from monday', 'merge the pr from before', 'merge the pr from ages ago',
    'merge the pr from previously']) {
    for (const h of [null, ['gh pr view 45']]) withheld(run(q, h), 'gh pr merge <PR>', 'pr', `${q} after ${h}`);
  }
  withheld(run('view that pr from before'), 'gh pr view <PR>', 'pr');
  // a branch after "from" / "for" is still read
  exact(run('merge pull request from bob'), 'gh pr merge bob');
  exact(run('merge pr for main'), 'gh pr merge main');
});

test('minor: Polish "ten pr" and "that one pr" read the history again', () => {
  for (const env of SHELLS) {
    // ("scal ten pr" on cmd is classified as gh_pr_create before any slot is read: a known classifier gap, checked on bash)
    for (const q of [...(env === BASH ? ['scal ten pr'] : []), 'merge ten pr', 'zmerguj ten pr', 'zmerguj ten pull request', 'merge that one pr', 'merge this one pr', 'zmerguj tego pr']) {
      exact(run(q, ['gh pr view 45'], env), 'gh pr merge 45', `${env.shell}: ${q}`);
      withheld(run(q, null, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
    }
    // a real number is still not read as the history's
    withheld(run('merge the 2 open prs', ['gh pr view 45'], env), 'gh pr merge <PR>', 'pr', env.shell);
  }
});

test('major: wrangler deploy keeps a dry run and an environment', () => {
  for (const env of SHELLS) {
    const cases = {
      'do a dry run of wrangler deploy': 'npx wrangler deploy --dry-run',
      'wrangler deploy --dry-run': 'npx wrangler deploy --dry-run',
      'wdróż workera na sucho': 'npx wrangler deploy --dry-run',
      'deploy worker to staging': 'npx wrangler deploy --env staging',
      'deploy worker to the staging environment': 'npx wrangler deploy --env staging',
      'wrangler deploy --env staging': 'npx wrangler deploy --env staging',
      'deploy worker to env qa1': 'npx wrangler deploy --env qa1',
      'deploy the worker to staging dry run': 'npx wrangler deploy --dry-run --env staging',
      'deploy the worker': 'npx wrangler deploy',
      'wrangler deploy': 'npx wrangler deploy',
    };
    for (const [q, cmd] of Object.entries(cases)) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
    // an environment named but not readable: withheld, never the default target
    for (const q of ['deploy worker to my env', 'wdróż workera na produkcję', 'deploy worker to env \'a b\'']) {
      withheld(run(q, null, env), 'npx wrangler deploy --env <WENV>', 'wenv', `${env.shell}: ${q}`);
    }
  }
});
// Regression tests for round 20: the round-19 findings (review/r19-codex.md). With history, a pull request the request
// names but that cannot be read ("the pr that fixes login", `that pr "bob's"`) stays withheld, as without history; a
// scope variable removed after `gh pr view N` (`unset GH_REPO`, `Remove-Item Env:GH_REPO`, ...) makes N ambiguous; the
// structural command grouping masks operands.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { group } from '../scripts/real/group.js';

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

test('major: history never overwrites a pull request the request names but cannot read', () => {
  for (const env of SHELLS) {
    for (const q of ['merge the pr that fixes login', 'merge that pr "bob\'s"', 'merge the pr by alice', 'merge that pr from yesterday', 'merge that pr main']) {
      for (const h of [null, ['gh pr view 45'], ['gh pr merge 45'], ['gh pr checks 45']]) {
        withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
      }
    }
    // a reference with nothing else named still reads the history
    exact(run('merge that pr', ['gh pr view 45'], env), 'gh pr merge 45', env.shell);
    // a pull request the request names readably wins over the history's
    exact(run('merge pr 7', ['gh pr view 45'], env), 'gh pr merge 7', env.shell);
  }
});

test('major: removing a repository scope after `gh pr view N` makes N ambiguous', () => {
  const lines = {
    bash: ['gh pr view 45; unset GH_REPO', 'gh pr view 45 && unset GH_HOST', 'gh pr view 45; unset -v GH_REPO', 'gh pr view 45; export -n GH_REPO',
      'gh pr view 45; unset FOO GH_REPO', 'gh pr view 45; export GH_REPO=a/b'],
    pwsh: ['gh pr view 45; Remove-Item Env:GH_REPO', 'gh pr view 45; Remove-Item -Path Env:\\GH_REPO', 'gh pr view 45; rm env:GH_HOST',
      'gh pr view 45; [Environment]::SetEnvironmentVariable("GH_REPO", $null)', 'gh pr view 45; $env:GH_REPO=$null'],
    cmd: ['gh pr view 45 & set GH_REPO=', 'gh pr view 45 && set GH_HOST='],
  };
  for (const env of SHELLS) {
    for (const h of lines[env.shell]) {
      for (const q of ['merge that pr', 'merge that pull request']) withheld(run(q, [h], env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
  }
  // the scope is dropped before the pull request is named: it is one of the repository tellsh runs in
  exact(run('merge that pr', ['unset GH_REPO; gh pr view 45']), 'gh pr merge 45');
  exact(run('merge that pr', ['Remove-Item Env:GH_REPO; gh pr view 45'], PWSH), 'gh pr merge 45');
  // an unrelated variable changes nothing
  exact(run('merge that pr', ['gh pr view 45; unset FOO']), 'gh pr merge 45');
  exact(run('merge that pr', ['gh pr view 45; Remove-Item Env:FOO'], PWSH), 'gh pr merge 45');
});

test('minor: the structural command grouping masks operands, the v04 one reproduces the shipped split', () => {
  for (const [a, b] of [['npm install express', 'npm install react'], ['cat alpha', 'cat beta'], ['git checkout feat', 'git checkout main'],
    ['gh pr view 12 --repo a/b', 'gh pr view 40 --repo c/d'], ['docker compose up web', 'docker compose up db'], ['sudo apt install curl', 'apt install jq']]) {
    assert.equal(group(a, 'structural'), group(b, 'structural'), `${a} / ${b}`);
  }
  for (const [a, b] of [['gh pr view 12', 'gh pr merge 12'], ['git checkout feat', 'git branch feat'], ['npm install express', 'npm install -g express'],
    ['docker compose up', 'docker compose down']]) {
    assert.notEqual(group(a, 'structural'), group(b, 'structural'), `${a} / ${b}`);
  }
  assert.notEqual(group('npm install express'), group('npm install react'));
  assert.equal(group('gh pr view 12 --repo a/b'), 'gh pr view --repo #2');
});

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- scripts/train.py scripts/hybrid/train_encoder.py scripts/hybrid/train_lm_gpu.py scripts/hybrid/train_a_dev.sh scripts/hybrid/export_data.js scripts/lib/heldout.js' in /workspace/tellsh
exec
/bin/bash -lc 'cat package.json && git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- bin/ src/cli.js src/pipeline.js' in /workspace/tellsh
 succeeded in 0ms:
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
diff --git a/scripts/hybrid/train_a_dev.sh b/scripts/hybrid/train_a_dev.sh
new file mode 100755
index 0000000..da9ab38
--- /dev/null
+++ b/scripts/hybrid/train_a_dev.sh
@@ -0,0 +1,34 @@
+#!/bin/sh
+# Retrain the linear cascade (A) WITHOUT the hybrid dev split (scripts/hybrid/export_data.js isDev), so that the
+# hybrid thresholds (when to defer from A to B/C) are calibrated on sentences A has never seen.
+# Builds a shadow tree build/adev/ (src, data symlinked; gen_data/train copied with one extra filter) and writes
+# build/adev/model/model.bin. The shipped model/model.bin is not touched.
+set -e
+ROOT=$(cd "$(dirname "$0")/../.." && pwd)
+T=$ROOT/build/adev
+mkdir -p $T/scripts/lib $T/model $T/build
+ln -sfn $ROOT/src $T/src
+ln -sfn $ROOT/data $T/data
+# private real-usage rows (if present) and the real/ loader
+mkdir -p $T/scripts/real && cp $ROOT/scripts/real/*.js $T/scripts/real/
+[ -d $ROOT/build/real ] && ln -sfn $ROOT/build/real $T/build/real
+# test/ is copied, not symlinked: train.py writes test/fixtures/parity.json
+mkdir -p $T/test/fixtures && cp $ROOT/test/*.js $T/test/
+cp $ROOT/scripts/lib/*.js $T/scripts/lib/
+cp $ROOT/scripts/train.py $T/scripts/train.py
+cp $ROOT/model/*.json $T/model/
+# gen_data: additionally drop every dev-split sentence (same hash as export_data.js) AND every text of the complete
+# exported dev split (its typo / relexicalised copies hash anywhere: build/hybrid/dev_texts.json from export_data.js),
+# from every training source: the base intent rows, and through leaks() (which every emitted row and the tldr /
+# out-of-domain loaders check) the OOD, tldr and anaphora rows (an OOD dev sentence is skipped with its typo copy)
+DEV_TEXTS=$ROOT/build/hybrid/dev_texts.json
+[ -f $DEV_TEXTS ] || { echo "train_a_dev: $DEV_TEXTS missing; run node scripts/hybrid/export_data.js first" >&2; exit 1; }
+sed -e "s#if (heldOut.has(r0.text)) { dropped++; continue; }#if (heldOut.has(r0.text) || isDevText(r0.text)) { dropped++; continue; }#" \
+    -e "s#^  const leaks = excl.has;\$#  const leaks = (t) => excl.has(t) || isDevText(t);#" \
+    -e "s#^import { ctxFeatures } from '../src/history.js';#&\nimport { fnv1a as _fnv } from '../src/features.js';\nconst _devIndex = new Set(JSON.parse(readFileSync('$DEV_TEXTS', 'utf8')));\nconst isDevText = (t) => _fnv('dev:' + normalize(t)) % 10 === 0 || _devIndex.has(normalize(t));#" \
+    $ROOT/scripts/gen_data.js > $T/scripts/gen_data.js
+# every substitution must have happened (the import alone is not enough)
+grep -q 'heldOut.has(r0.text) || isDevText' $T/scripts/gen_data.js
+grep -q 'const leaks = (t) => excl.has(t) || isDevText(t);' $T/scripts/gen_data.js
+grep -q '_devIndex.has(normalize(t))' $T/scripts/gen_data.js
+cd $T && node scripts/gen_data.js && python3 scripts/train.py --out $T/model/model.bin
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
index c5430f7..9a9502b 100644
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
@@ -32,17 +34,78 @@ const PRONOUN_VALUE = /^(it|its|that|this|them|those|one|again|back|there|here|t
 
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
+// "that pr", "this pull request", "the same pr": a pull request named by reference
+const PR_REFERENCE = /\b(?:that|this|its|the\s+same|the\s+previous|the\s+last|ten|tego|tamten)\s+(?:\w+\s+)?(?:prs?|pull[\s-]+requests?)\b|\bto\s+(?:prs?|pull[\s-]+requests?)\b/i;
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
@@ -52,31 +115,108 @@ export function validSlot(k, v) {
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
@@ -90,22 +230,35 @@ function flagTokens(cmd) {
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
@@ -113,17 +266,26 @@ export function suggest(query, opts = {}) {
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
@@ -134,29 +296,68 @@ export function suggest(query, opts = {}) {
 
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
@@ -169,73 +370,264 @@ export function suggest(query, opts = {}) {
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
/bin/bash -lc 'cat review/fix20-log.md && cat test/regressions22.test.js && cat test/regressions21.test.js' in /workspace/tellsh
 succeeded in 0ms:
I fixed all three Major findings from round 20 and committed them as `b04a93c` (not pushed). All 367 tests pass. The eval scores didn't change, and bench was re-run.

**1. A PR picked out by a word before "pr" (`src/fill.js`)** — none of these give a bare `gh pr merge` any more:
- "merge the dependabot / renovate / docs / draft / green / big / above / open pr", "merge said pr" and "merge the aforementioned / mentioned pr" now give `gh pr merge <PR>` with `missing=['pr']`. With history `gh pr view 45` they still give `<PR>`, so "merge the above pr" and "merge said pr" no longer skip the history.
- "merge the pr with label urgent" and "merge the pull request with title fix login" (plus "labeled …" and the Polish "z etykietą …") are withheld the same way.
- "merge the pr", "merge pr", "merge the current pr", "merge my pr" and "merge the github pr" still give bare `gh pr merge`.
- "zmerguj to pr" is now treated like "that pr": it gives `gh pr merge 45` with that history, and `<PR>` without history.

**2. wrangler deploy dropping a dry run or environment (`src/catalog.js`, `src/variants.js`)** — the template is now `npx wrangler deploy«--dry-run»«--env NAME»` on bash, pwsh and cmd:
- "do a dry run of wrangler deploy" → `npx wrangler deploy --dry-run`
- "deploy worker to staging" → `npx wrangler deploy --env staging`
- An environment that can't be read, like "to my env" or "na produkcję", gives `--env <WENV>` rather than the default target.

**Minors fixed:**
- A time word after "from" or "for" is no longer read as a branch name: "from last week", "from monday", "from before" and "from previously" all give `<PR>`. Branch names still work: "from bob" → `bob` and "for main" → `main`.
- The Polish "ten pr" regression is fixed. "ten" and "that one" were being read as the numbers 10 and 1, so "merge ten pr", "zmerguj ten pull request" and "merge that one pr" give `gh pr merge 45` again after `gh pr view 45`.

**Left as is:**
- "merge the pr for login" still gives `gh pr merge login`. A word after "for" or "from" can't be told apart from a branch name, and "from bob" → `bob` is a deliberate tested behaviour.
- The other Minors (`SetEnvironmentVariable` spacing, `rm Env:` in bash) and the nits are untouched.
- On cmd, "scal ten pr" is classified as `gh pr create --fill`. It already did this before my change, so it's a classifier problem rather than this fix; the new test only checks that phrase on bash.

The tests are in `test/regressions22.test.js`, and the README now describes the new gh pr and wrangler behaviour.

No git identity is configured on this machine, so I set your existing author name and email for this one commit only, without changing the git config. I didn't touch the empty untracked `review/fix20-log.md`.

The Cloudflare, Home and cnvs.app connectors need authorizing in your claude.ai connector settings before they can be used; none of them were needed here.
// Regression tests for round 21: the round-20 findings (review/r20-claude.md, review/r20-codex.md). A pull request picked
// out by a word before "pr" ("the dependabot pr", "said pr", "the above pr") or by a label / title ("the pr with label
// urgent") is withheld, never a bare `gh pr merge` (the current branch's), also with history; a when-word after "from" /
// "for" is not a branch; Polish "ten pr" / "that one pr" read the history again; wrangler deploy keeps a dry run and an
// environment instead of deploying to the default target.
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

test('major: a pull request picked out by a word before "pr" is withheld, with or without history', () => {
  const qs = ['merge the dependabot pr', 'merge the renovate pr', 'merge the docs pr', 'merge the draft pr', 'merge the green pr',
    'merge the big pr', 'merge the above pr', 'merge said pr', 'merge the aforementioned pr', 'merge the mentioned pr',
    'merge the dependabot pull request', 'merge the open pr'];
  for (const env of SHELLS) {
    for (const q of qs) {
      for (const h of [null, ['gh pr view 45']]) withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
    // nothing between the determiner and "pr", or a word that keeps the current branch's: still bare
    for (const q of ['merge the pr', 'merge pr', 'merge the current pr', 'merge my pr', 'merge the github pr', 'merge the pull request']) {
      exact(run(q, null, env), 'gh pr merge', `${env.shell}: ${q}`);
    }
  }
});

test('major: Polish "to pr" is a reference: the history\'s pull request, else withheld', () => {
  for (const env of SHELLS) {
    withheld(run('zmerguj to pr', null, env), 'gh pr merge <PR>', 'pr', env.shell);
    exact(run('zmerguj to pr', ['gh pr view 45'], env), 'gh pr merge 45', env.shell);
  }
});

test('major: a pull request picked out by a label or a title is withheld', () => {
  for (const env of SHELLS) {
    for (const q of ['merge the pr with label urgent', 'merge the pull request with title fix login', 'merge the pr with the label bug',
      'merge the pr labeled urgent', 'zmerguj pr z etykietą pilne']) {
      for (const h of [null, ['gh pr view 45']]) withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
  }
});

test('minor: a when-word after "from" / "for" is not a branch', () => {
  for (const q of ['merge the pr from last week', 'merge the pr from monday', 'merge the pr from before', 'merge the pr from ages ago',
    'merge the pr from previously']) {
    for (const h of [null, ['gh pr view 45']]) withheld(run(q, h), 'gh pr merge <PR>', 'pr', `${q} after ${h}`);
  }
  withheld(run('view that pr from before'), 'gh pr view <PR>', 'pr');
  // a branch after "from" / "for" is still read
  exact(run('merge pull request from bob'), 'gh pr merge bob');
  exact(run('merge pr for main'), 'gh pr merge main');
});

test('minor: Polish "ten pr" and "that one pr" read the history again', () => {
  for (const env of SHELLS) {
    // ("scal ten pr" on cmd is classified as gh_pr_create before any slot is read: a known classifier gap, checked on bash)
    for (const q of [...(env === BASH ? ['scal ten pr'] : []), 'merge ten pr', 'zmerguj ten pr', 'zmerguj ten pull request', 'merge that one pr', 'merge this one pr', 'zmerguj tego pr']) {
      exact(run(q, ['gh pr view 45'], env), 'gh pr merge 45', `${env.shell}: ${q}`);
      withheld(run(q, null, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
    }
    // a real number is still not read as the history's
    withheld(run('merge the 2 open prs', ['gh pr view 45'], env), 'gh pr merge <PR>', 'pr', env.shell);
  }
});

test('major: wrangler deploy keeps a dry run and an environment', () => {
  for (const env of SHELLS) {
    const cases = {
      'do a dry run of wrangler deploy': 'npx wrangler deploy --dry-run',
      'wrangler deploy --dry-run': 'npx wrangler deploy --dry-run',
      'wdróż workera na sucho': 'npx wrangler deploy --dry-run',
      'deploy worker to staging': 'npx wrangler deploy --env staging',
      'deploy worker to the staging environment': 'npx wrangler deploy --env staging',
      'wrangler deploy --env staging': 'npx wrangler deploy --env staging',
      'deploy worker to env qa1': 'npx wrangler deploy --env qa1',
      'deploy the worker to staging dry run': 'npx wrangler deploy --dry-run --env staging',
      'deploy the worker': 'npx wrangler deploy',
      'wrangler deploy': 'npx wrangler deploy',
    };
    for (const [q, cmd] of Object.entries(cases)) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
    // an environment named but not readable: withheld, never the default target
    for (const q of ['deploy worker to my env', 'wdróż workera na produkcję', 'deploy worker to env \'a b\'']) {
      withheld(run(q, null, env), 'npx wrangler deploy --env <WENV>', 'wenv', `${env.shell}: ${q}`);
    }
  }
});
// Regression tests for round 20: the round-19 findings (review/r19-codex.md). With history, a pull request the request
// names but that cannot be read ("the pr that fixes login", `that pr "bob's"`) stays withheld, as without history; a
// scope variable removed after `gh pr view N` (`unset GH_REPO`, `Remove-Item Env:GH_REPO`, ...) makes N ambiguous; the
// structural command grouping masks operands.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { group } from '../scripts/real/group.js';

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

test('major: history never overwrites a pull request the request names but cannot read', () => {
  for (const env of SHELLS) {
    for (const q of ['merge the pr that fixes login', 'merge that pr "bob\'s"', 'merge the pr by alice', 'merge that pr from yesterday', 'merge that pr main']) {
      for (const h of [null, ['gh pr view 45'], ['gh pr merge 45'], ['gh pr checks 45']]) {
        withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
      }
    }
    // a reference with nothing else named still reads the history
    exact(run('merge that pr', ['gh pr view 45'], env), 'gh pr merge 45', env.shell);
    // a pull request the request names readably wins over the history's
    exact(run('merge pr 7', ['gh pr view 45'], env), 'gh pr merge 7', env.shell);
  }
});

test('major: removing a repository scope after `gh pr view N` makes N ambiguous', () => {
  const lines = {
    bash: ['gh pr view 45; unset GH_REPO', 'gh pr view 45 && unset GH_HOST', 'gh pr view 45; unset -v GH_REPO', 'gh pr view 45; export -n GH_REPO',
      'gh pr view 45; unset FOO GH_REPO', 'gh pr view 45; export GH_REPO=a/b'],
    pwsh: ['gh pr view 45; Remove-Item Env:GH_REPO', 'gh pr view 45; Remove-Item -Path Env:\\GH_REPO', 'gh pr view 45; rm env:GH_HOST',
      'gh pr view 45; [Environment]::SetEnvironmentVariable("GH_REPO", $null)', 'gh pr view 45; $env:GH_REPO=$null'],
    cmd: ['gh pr view 45 & set GH_REPO=', 'gh pr view 45 && set GH_HOST='],
  };
  for (const env of SHELLS) {
    for (const h of lines[env.shell]) {
      for (const q of ['merge that pr', 'merge that pull request']) withheld(run(q, [h], env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
  }
  // the scope is dropped before the pull request is named: it is one of the repository tellsh runs in
  exact(run('merge that pr', ['unset GH_REPO; gh pr view 45']), 'gh pr merge 45');
  exact(run('merge that pr', ['Remove-Item Env:GH_REPO; gh pr view 45'], PWSH), 'gh pr merge 45');
  // an unrelated variable changes nothing
  exact(run('merge that pr', ['gh pr view 45; unset FOO']), 'gh pr merge 45');
  exact(run('merge that pr', ['gh pr view 45; Remove-Item Env:FOO'], PWSH), 'gh pr merge 45');
});

test('minor: the structural command grouping masks operands, the v04 one reproduces the shipped split', () => {
  for (const [a, b] of [['npm install express', 'npm install react'], ['cat alpha', 'cat beta'], ['git checkout feat', 'git checkout main'],
    ['gh pr view 12 --repo a/b', 'gh pr view 40 --repo c/d'], ['docker compose up web', 'docker compose up db'], ['sudo apt install curl', 'apt install jq']]) {
    assert.equal(group(a, 'structural'), group(b, 'structural'), `${a} / ${b}`);
  }
  for (const [a, b] of [['gh pr view 12', 'gh pr merge 12'], ['git checkout feat', 'git branch feat'], ['npm install express', 'npm install -g express'],
    ['docker compose up', 'docker compose down']]) {
    assert.notEqual(group(a, 'structural'), group(b, 'structural'), `${a} / ${b}`);
  }
  assert.notEqual(group('npm install express'), group('npm install react'));
  assert.equal(group('gh pr view 12 --repo a/b'), 'gh pr view --repo #2');
});

exec
/bin/bash -lc 'node --test test/' in /workspace/tellsh
exec
/bin/bash -lc "nl -ba src/pipeline.js | sed -n '100,390p'" in /workspace/tellsh
 succeeded in 0ms:
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
   168	  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr', 'repo', 'wenv']) {
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

 exited 1 in 6018ms:
TAP version 13
# Subtest: /workspace/tellsh/test/cli.test.js
not ok 1 - /workspace/tellsh/test/cli.test.js
  ---
  duration_ms: 2723.971507
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
  duration_ms: 434.596275
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 3 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 197.63756
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 4 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 231.534334
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 5 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 235.34643
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 6 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 170.811479
  ...
# Subtest: /workspace/tellsh/test/pipeline.test.js
not ok 7 - /workspace/tellsh/test/pipeline.test.js
  ---
  duration_ms: 361.047948
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
  duration_ms: 1020.590339
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
  duration_ms: 562.566264
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
  duration_ms: 896.689965
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
  duration_ms: 551.084528
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
  duration_ms: 321.542821
  ...
# Subtest: /workspace/tellsh/test/regressions14.test.js
ok 13 - /workspace/tellsh/test/regressions14.test.js
  ---
  duration_ms: 368.248203
  ...
# Subtest: /workspace/tellsh/test/regressions15.test.js
ok 14 - /workspace/tellsh/test/regressions15.test.js
  ---
  duration_ms: 546.583482
  ...
# Subtest: /workspace/tellsh/test/regressions16.test.js
ok 15 - /workspace/tellsh/test/regressions16.test.js
  ---
  duration_ms: 530.732181
  ...
# Subtest: /workspace/tellsh/test/regressions17.test.js
ok 16 - /workspace/tellsh/test/regressions17.test.js
  ---
  duration_ms: 584.990401
  ...
# Subtest: /workspace/tellsh/test/regressions18.test.js
ok 17 - /workspace/tellsh/test/regressions18.test.js
  ---
  duration_ms: 671.96268
  ...
# Subtest: /workspace/tellsh/test/regressions19.test.js
ok 18 - /workspace/tellsh/test/regressions19.test.js
  ---
  duration_ms: 627.152592
  ...
# Subtest: /workspace/tellsh/test/regressions2.test.js
not ok 19 - /workspace/tellsh/test/regressions2.test.js
  ---
  duration_ms: 846.920821
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
  duration_ms: 586.721277
  ...
# Subtest: /workspace/tellsh/test/regressions21.test.js
ok 21 - /workspace/tellsh/test/regressions21.test.js
  ---
  duration_ms: 536.87453
  ...
# Subtest: /workspace/tellsh/test/regressions22.test.js
ok 22 - /workspace/tellsh/test/regressions22.test.js
  ---
  duration_ms: 639.461506
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 23 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 376.01146
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 24 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 366.002042
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 25 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 362.670896
  ...
# Subtest: /workspace/tellsh/test/regressions4.test.js
not ok 26 - /workspace/tellsh/test/regressions4.test.js
  ---
  duration_ms: 1133.004038
  location: '/workspace/tellsh/test/regressions4.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions5.test.js
ok 27 - /workspace/tellsh/test/regressions5.test.js
  ---
  duration_ms: 700.517185
  ...
# Subtest: /workspace/tellsh/test/regressions6.test.js
ok 28 - /workspace/tellsh/test/regressions6.test.js
  ---
  duration_ms: 741.628092
  ...
# Subtest: /workspace/tellsh/test/regressions7.test.js
ok 29 - /workspace/tellsh/test/regressions7.test.js
  ---
  duration_ms: 456.03145
  ...
# Subtest: /workspace/tellsh/test/regressions8.test.js
not ok 30 - /workspace/tellsh/test/regressions8.test.js
  ---
  duration_ms: 605.725482
  location: '/workspace/tellsh/test/regressions8.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions9.test.js
not ok 31 - /workspace/tellsh/test/regressions9.test.js
  ---
  duration_ms: 842.609466
  location: '/workspace/tellsh/test/regressions9.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 32 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 3493.436138
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/slot-cases.js
ok 33 - /workspace/tellsh/test/slot-cases.js
  ---
  duration_ms: 105.128385
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 34 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 224.669559
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 35 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 214.094006
  location: '/workspace/tellsh/test/templates.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..35
# tests 35
# suites 0
# pass 23
# fail 12
# cancelled 0
# skipped 0
# todo 0
# duration_ms 6010.039688

exec
/bin/bash -lc "nl -ba src/pipeline.js | sed -n '390,710p'" in /workspace/tellsh
 succeeded in 0ms:
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

codex
I’m tracing how the new checks handle ambiguous targets and deployment modifiers. I’ll also check the training data split for leakage; the test suite is running now.

exec
/bin/bash -lc "nl -ba src/fill.js | sed -n '1,280p'" in /workspace/tellsh
 succeeded in 0ms:
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
    25	  // a repository as gh -R takes it: [HOST/]OWNER/REPO
    26	  dryrun: (v) => v === '--dry-run',
    27	  // a wrangler environment name (wrangler.toml [env.NAME])
    28	  wenv: (v) => /^[A-Za-z0-9][\w-]{0,62}$/.test(String(v)),
    29	  repo: (v) => /^(?:(?!-)[\w-]+(?:\.[\w-]+)+\/)?(?!-)[\w-][\w.-]{0,99}\/(?!-)[\w-][\w.-]{0,99}$/.test(String(v)) && !/\.\./.test(String(v)),
    30	  // a pull request as gh selects it: number, URL or head branch
    31	  pr: (v) => (/^\d+$/.test(String(v)) ? /^[1-9]\d{0,11}$/.test(String(v)) : /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/pull\/\d{1,12}\/?$/.test(String(v)) || /^(?![-.])(?!.*\.\.)[\w./-]{1,100}$/.test(String(v))),
    32	};
    33	
    34	// "merge pull request feature/login", "view the pr for branch fix-1", "pr #45", 'merge pull request "feature/login"'
    35	// (a quoted value ends at its matching quote, `“”„` being one family: "bob's-fix" is one value; a quote with no matching
    36	// close, `'it''s'`, is m[7] and withheld)
    37	const PR_SELECTOR = /\b(?:pull[\s-]+requests?|pr|prs)\s+((?:(?:for|of|on|from|branch|number|no\.?|nr\.?|(?:the|a|my|our)(?=\s+branch\b))\s+)*)(?:(?:"([^"]*)"|'([^']*)'|`([^`]*)`|[„“”]([^„“”"]*)[“”])(?=[\s.,!?;:]|$)|(#?[^\s"'`„“”]+?)[.,!?]?(?=\s|$)|(["'`„“”]))/i;
    38	// a function or describing word after "pull request" is not a selector ("merge the pull request and …", "merge pr now",
    39	// "check pr status", "view pull request on github", "merge pr by bob", "merge pull request quickly", "view pr from yesterday",
    40	// "close pr for issue 45"); only checked for an unmarked word (`feature/apply`, `fix-reply`, `#12-only` are selectors);
    41	// another unmarked word, `nightly`, is withheld
    42	const PR_NOT_SELECTOR = /^(?:the|a|an|this|that|it|its|my|our|your|their|me|us|you|him|her|them|and|or|then|now|please|pls|into|to|with|without|in|at|by|is|was|which|again|request|requests|status|state|checks?|details?|info|summary|description|diff|changes|comments?|github|gh|web|browser|online|here|there|today|yesterday|tomorrow|earlier|later|review|fork|upstream|fast|asap|already|first|too|also|quickly|immediately|directly|safely|manually|automatically|finally|only|just|really|simply|properly|carefully|right|soon|instantly|issues?|tickets?|bugs?)$/i;
    43	// an unmarked word (no digit, '/', '-', '_', '.', '#') names a branch only after "branch", "for" or "from" ("merge pr from bob");
    44	// otherwise it is withheld (the `?` fails validation)
    45	const PR_MARKED = /[\d/_.#-]/;
    46	// an abbreviation ("merge pr e.g. main", "merge pr w/o checks") or a host ("merge pr on github.com") is not a branch
    47	const PR_ABBREV = /^(?:e\.g|i\.e|w\/o|w\/|etc|vs|cf|a\.k\.a|n\/a|b\/c)$/i;
    48	const PR_HOST = /^(?:[\w-]+\.)+(?:com|org|net|io|dev|app|co|me)$/i;
    49	// a number names the pull request only right after "pr" / "pull request" (`pr 45`, `pr #45`, `pr number 45`) or as `#45`
    50	const PR_NUMBER_LEAD = /^(?:(?:number|no\.?|nr\.?)\s+)*$/i;
    51	const PR_WORD = /\b(?:pull[\s-]+requests?|pr|prs)\b/i;
    52	// an issue, ticket or bug is not the pull request ("merge pr for issue #45", "merge the pull request for ticket 3")
    53	const PR_ISSUE = /^(?:issues?|tickets?|bugs?)$/i;
    54	// a number followed by a unit is an amount, not the pull request ("merge pr 2 days old", "merge pr 3 times")
    55	const PR_UNIT_AFTER = /^\s+(?:secs?|seconds?|mins?|minutes?|hours?|hrs?|days?|weeks?|months?|years?|times?|ago|old|more|approvals?|reviews?|reviewers?|commits?|files?|lines?|changes?|comments?|checks?)\b/i;
    56	// `#45` alone names the pull request only as the first word after the verb ("merge #45", "squash merge #45", "please
    57	// close #7"); one in another clause ("the pr that closes #12", "merge the pr, see #99") is withheld
    58	const PR_HASH_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit)\s+)+$/i;
    59	// "merge the pull request by alice", "merge the pr from yesterday", "the pr that fixes login", "the pr opened last week": a
    60	// pull request picked out by who or when, which is not the current branch's (withheld)
    61	const PR_QUALIFIED = /^\s*(?:(?:by|from|since|before|after|about|titled|named|called|that|which|who|whose|where|od|autorstwa)\b|(?:\S+\s+)?(?:opened|created|authored|submitted|raised|written|made|sent|pushed|filed)\b)|\b(?:yesterday|today|tonight|tomorrow|ago|last\s+(?:week|month|year|night|friday|monday|tuesday|wednesday|thursday|saturday|sunday)|wczoraj\w*|dzisiaj|dzi[sś])\b/i;
    62	// "merge the pr with label urgent", "the pull request with title fix login", "z etykietą pilne": picked out by a label,
    63	// title, author, ... (withheld)
    64	const PR_DESCRIBED = /^\s*(?:with|having|z|o)\s+(?:the\s+|a\s+)?(?:labels?|title|titled|name|tags?|authors?|assignees?|milestone|description|text|keywords?|words?|subject|commits?|etykiet\w*|tytu\w*|nazw\w*|autor\w*)\b|^\s*(?:labell?ed|tagged|assigned|mentioning|containing|regarding|concerning|touching|fixing|adding|removing|updating|changing)\b/i;
    65	// "merge the pr from last week", "from monday", "view that pr from before": after "for" / "from" a word saying when is
    66	// not a branch (withheld)
    67	const PR_WHEN = /^(?:last|this|next|past|previous|previously|before|earlier|ages|recently|lately|week|month|year|morning|afternoon|evening|night|weekend|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun|january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec|ago|wczoraj\w*|dzisiaj|przedwczoraj|zesz\w*|poprzedni\w*|wcze\w*)$/i;
    68	// "merge the dependabot pr", "the docs pr", "said pr", "the above pr", "zmerguj to pr": a word between a determiner and
    69	// "pr" (or an anaphoric one) picks out a pull request the parser cannot read (withheld, also with history); "the current
    70	// pr", "my own pr", "that one pr", "the same pr", "the last pr" (a reference) stay as they are
    71	const PR_DET_WORD = /(?:^|\s)(?:the|a|an|my|our|your|his|her|their|this|that|these|those|its|ten|tego|ta|tamten|to)\s+((?:\S+\s+){1,3})$/i;
    72	const PR_DET_NEUTRAL = /^(?:current|own|one|same|previous|last|prior|single|github|gh|pull|this|that|the|my|our|bieżący\w*|biezacy\w*|obecn\w*|aktualn\w*|mój|moj\w*|nasz\w*|sw[oó]j|swoj\w*|ten|tego)$/i;
    73	const PR_ANAPHOR = /(?:^|\s)(?:said|above|aforementioned|abovementioned|above-mentioned|mentioned|referenced|aforesaid|forementioned|wspomnian\w*|powy[zż]sz\w*|ww\.?)\s+(?:\S+\s+)?$/i;
    74	// "merge ten pr" (Polish "this"), "merge that one pr": a number word that is a demonstrative, not a number
    75	const PR_DEM_NUMBER = /\b(?:ten|(?:that|this|which|the)\s+one)\s+(?:\S+\s+)?(?:prs?|pull[\s-]+requests?)\b/gi;
    76	// "merge pr from the feature branch", "for my branch bob": a branch is named, but not one the parser read
    77	const PR_BRANCH_NAMED = /\b(?:for|of|on|from)\s+(?:\S+\s+){0,2}branch\b/i;
    78	// wrangler deploy: "dry run", "--dry-run", "na sucho", "without (actually) deploying/publishing" (wrangler deploy --dry-run)
    79	const WR_DRY = /\bdry[\s-]*run\b|\bna\s+sucho\b|\bwithout\s+(?:actually\s+)?(?:deploying|publishing|uploading)\b|\b(?:don'?t|do\s+not)\s+actually\s+(?:deploy|publish|upload)\b|\bbez\s+(?:faktycznego\s+)?(?:wdra[zż]ania|publikowania|deployu?)\b/i;
    80	// the environment: "--env staging", "-e staging", "env staging", "to the staging environment", "to staging", "na produkcję"
    81	const WR_ENV_OPT = /(?:^|\s)(?:--env|-e)(?:=|\s+)(\S+)/i;
    82	const WR_ENV_WORD = /\b(?:env|environment|środowisk\w*|srodowisk\w*)\s+(?:called\s+|named\s+|o\s+nazwie\s+)?(?!to\b|for\b|the\b|called\b|named\b)([A-Za-z0-9][\w-]*\S*)|\b(?!(?:to|my|our|your|the|a|an|this|that|its|on|in|for|into|of|na|do|w)\b)([A-Za-z0-9][\w-]*)\s+(?:env|environment)\b/i;
    83	const WR_ENV_KNOWN = /\b(?:to|on|in|into|for|na|do|w)\s+(?:the\s+|my\s+|our\s+)?(staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)\b/i;
    84	const WR_ENV_ANY = /\b(?:env|environment|środowisk\w*|srodowisk\w*|produkcj\w*|staging\w*)\b/i;
    85	/**
    86	 * The pull request the user names (quoted: kept as written, validation withholds an odd one), else null (`gh pr merge`
    87	 * acts on the current branch's pull request). A number elsewhere in the request ("merge pr with 2 approvals", "merge the
    88	 * 2 open prs") is never the pull request; a request that names something the parser cannot read (`bob's`, `in repo v2`)
    89	 * is withheld (`?`, shown as `<PR>`), never a bare `gh pr merge`.
    90	 */
    91	function prSelector(ex) {
    92	  if (ex.urls[0] != null) return ex.urls[0];
    93	  const text = String(ex.text);
    94	  const m = text.match(PR_SELECTOR);
    95	  if (m) {
    96	    const quoted = m[2] ?? m[3] ?? m[4] ?? m[5];
    97	    if (quoted != null) return quoted || '?'; // `""`: named but empty, withheld
    98	    if (m[7] != null) return '?'; // an unclosed / odd quote: withheld
    99	    const w = m[6];
   100	    const branch = /\bbranch\s+$/i.test(m[1]);
   101	    // "merge my pr from 2 days ago", "view pr for 3 days": a number after a connective is not the pull request
   102	    if (PR_ISSUE.test(w)) return '?';
   103	    const rest = text.slice(m.index + m[0].length);
   104	    if (/^#?\d+$/.test(w) && PR_UNIT_AFTER.test(rest)) return '?';
   105	    if (/^\d+$/.test(w)) return branch || PR_NUMBER_LEAD.test(m[1]) ? w : '?';
   106	    // "merge the pr for #12": the pull request for issue 12, or pull request 12
   107	    if (/^#\d+$/.test(w) && !PR_NUMBER_LEAD.test(m[1])) return '?';
   108	    if (PR_ABBREV.test(w) || (PR_HOST.test(w) && !branch)) return '?';
   109	    if (PR_MARKED.test(w)) return w;
   110	    // "merge pr for branch status": after "branch" any word is the selector, a describing one is withheld
   111	    if (branch) return PR_NOT_SELECTOR.test(w) ? `?${w}` : w;
   112	    if (!PR_NOT_SELECTOR.test(w)) {
   113	      // "merge pr for fix #12": the word is followed by a number, so it may describe rather than name the branch
   114	      if (/\b(?:for|from)\s+$/i.test(m[1])) return /\d/.test(rest) || PR_WHEN.test(w) ? `?${w}` : w;
   115	      // "merge pr main": a bare word may be a branch or say something else: withheld (`gh pr merge <PR>`), never dropped
   116	      return `?${w}`;
   117	    }
   118	  }
   119	  const hash = text.match(/(?:^|\s)#(\d{1,12})(?=[\s.,!?;:]|$)/);
   120	  if (hash && PR_HASH_LEAD.test(text.slice(0, hash.index + hash[0].indexOf('#')))) return hash[1];
   121	  // 'merge the "feature/login" pull request': an explicitly quoted value is the target
   122	  if (ex.quoted.length) return ex.quoted[0];
   123	  // named but not readable: a number anywhere ("merge the 2 open prs", "merge pr in 2 minutes"), or a marked word or a
   124	  // quote after "pr" ("merge pr bob's", "merge pr feature/x's", "merge pr in repo v2"): withheld
   125	  const p = text.match(PR_WORD);
   126	  const after = p ? text.slice(p.index + p[0].length) : '';
   127	  const before = p ? text.slice(0, p.index) : '';
   128	  const det = before.match(PR_DET_WORD);
   129	  if (PR_ANAPHOR.test(before) || (det && det[1].trim().split(/\s+/).some((x) => !PR_DET_NEUTRAL.test(x)))) return '?';
   130	  if (PR_DESCRIBED.test(after)) return '?';
   131	  const numbers = !/\d/.test(text) && (ex.numbers?.length ?? 0) <= [...text.matchAll(PR_DEM_NUMBER)].length ? [] : ex.numbers || [];
   132	  if (numbers.length || /\d/.test(text) || /[/_#'"`„“”’]|\w[.-]\w/.test(after) || PR_BRANCH_NAMED.test(after) || PR_QUALIFIED.test(after)) return '?';
   133	  return null;
   134	}
   135	// "--repo a/b", "-R a/b", "in (the) repo(sitory) a/b", "in the a/b repo"; "in the other repo", "in another repository": named,
   136	// not readable ("this repo", "the current repository" are the working directory's)
   137	const PR_REPO_OPT = /(?:^|\s)(?:--repo(?:=|\s+|$)|-R(?:=|\s*))(\S*)/;
   138	const PR_REPO = /\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(?:github\s+)?(?:repo|repository|repozytorium)\s+(\S+)|\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(\S+(?:\s+\S+)?)\s+(?:github\s+)?(?:repo|repository)\b|\b(?:w|z)\s+repozytorium\s+(\S+)/i;
   139	// "this repo", "the repo", "my current repo", "our own repository": the working directory's
   140	const PR_REPO_HERE = /^(?:the|a|an|this|current|same|our|my|local|own|tym|tego|bieżącym|biezacym)(?:\s+(?:current|same|local|own))?$/i;
   141	// "org/repo#7": a repository and a pull request in one word
   142	const PR_REPO_HASH = /(?:^|\s)((?:https:\/\/)?(?:[\w-]+(?:\.[\w-]+)+\/)?[\w.-]+\/[\w.-]+)#(\d{1,12})(?=[\s.,!?;:]|$)/;
   143	// "merge pr 7 in other/repo", "of org/repo", "on github.com/org/repo", "at https://github.com/org/repo": a repository
   144	// without the word "repo" (a value gh -R takes); right after "pr for" / "pr from" / … the word is the branch selector
   145	const PR_REPO_PREP = /(?:^|\s)(in|of|on|from|for|at|to)\s+(?:the\s+)?(?:github\s+)?(\S+)/gi;
   146	const PR_SELECTOR_SPOT = /\b(?:pull[\s-]+requests?|pr|prs)\s+(?:(?:for|of|on|from|branch|number|no\.?|nr\.?|(?:the|a|my|our)(?=\s+branch\b))\s+)*$/i;
   147	const repoValue = (w) => w.replace(/[.,!?;:]+$/, '').replace(/^["'`]|["'`]$/g, '').replace(/^https:\/\/(?=github\.com\/)/i, '').replace(/(?:\.git)?\/?$/, '');
   148	/** The repository a gh pr request names: { repo (a value, or `?` when it is not readable), rest (the text without it), pr } or null. */
   149	function prRepo(text) {
   150	  const cut = (i, len, put = ' ') => (text.slice(0, i) + put + text.slice(i + len)).replace(/\s+/g, ' ').trim();
   151	  const h = text.match(PR_REPO_HASH);
   152	  if (h && RAW_OK.repo(repoValue(h[1]))) {
   153	    const at = h.index + h[0].indexOf(h[1]);
   154	    return { repo: repoValue(h[1]), rest: cut(at, h[1].length + 1 + h[2].length, ` #${h[2]} `), pr: h[2] };
   155	  }
   156	  const m = text.match(PR_REPO_OPT) || text.match(PR_REPO);
   157	  if (!m) {
   158	    for (const p of text.matchAll(PR_REPO_PREP)) {
   159	      const w = repoValue(p[2]);
   160	      if (!RAW_OK.repo(w)) continue;
   161	      const host = w.split('/').length === 3;
   162	      // "merge pr from feature/x", "view the pr for fix/a": the branch the pull request is for
   163	      if (!host && /^(?:of|on|from|for)$/i.test(p[1]) && PR_SELECTOR_SPOT.test(text.slice(0, p.index + p[0].indexOf(p[1])))) continue;
   164	      return { repo: w, rest: cut(p.index, p[0].length) };
   165	    }
   166	    return null;
   167	  }
   168	  const w = repoValue(m[1] ?? m[2] ?? m[3] ?? '');
   169	  if (m[2] != null && PR_REPO_HERE.test(w)) return null;
   170	  const rest = (text.slice(0, m.index) + ' ' + text.slice(m.index + m[0].length)).replace(/\s+/g, ' ').trim();
   171	  return { repo: RAW_OK.repo(w) ? w : '?', rest };
   172	}
   173	const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
   174	const PLACEHOLDER = (name) => `<${name.toUpperCase()}>`;
   175	
   176	// sed needs regex-escaped search text and &,\,/ escaped replacement
   177	// (a newline would end the s command: written as \n, which never matches inside one line)
   178	const sedEscapeOld = (s) => s.replace(/[\\/.*^$[\]]/g, '\\$&').replace(/\n/g, '\\n');
   179	const sedEscapeNew = (s) => s.replace(/[\\/&]/g, '\\$&').replace(/\n/g, '\\n');
   180	
   181	/** Recompute derived slots after values were merged/overridden (tagger, history rules). */
   182	export function finalizeSlots(intent, v) {
   183	  if (v.ext != null && v.glob == null) v.glob = `*.${v.ext}`;
   184	  if (intent.id === 'find_by_name' && v.name) v.namepat = /[*?]/.test(v.name) || /\.\w+$/.test(v.name) ? v.name : `*${v.name}*`;
   185	  if (intent.id === 'replace_text' && v.old != null && v.new != null) v.sedexpr = `s/${sedEscapeOld(v.old)}/${sedEscapeNew(v.new)}/g`;
   186	  return v;
   187	}
   188	
   189	/** Resolve the values an intent can use from the generic extraction. */
   190	export function resolveSlots(intent, ex) {
   191	  const v = {};
   192	  const has = (k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
   193	  const textual = ['pattern', 'message', 'text', 'name', 'old', 'branch', 'service', 'container', 'pkg', 'cmd', 'user', 'script']
   194	    .some((k) => k in intent.slots) || ['base64_encode', 'base64_decode', 'replace_text', 'find_by_name'].includes(intent.id);
   195	  const paths = [...(textual ? ex.paths : ex.pathsWithQuoted)];
   196	  // "grep for ~/foo in src": the path-like word right after the search verb is the pattern, the other
   197	  // path is where to search (only when there is one: otherwise the single path is the search root)
   198	  let pathPattern = null;
   199	  if (has('pattern') && !ex.quoted.length && paths.length >= 2) {
   200	    const m = foldKeepLength(String(ex.text)).toLowerCase().match(/(?:^|\s)(?:grep|search|look|find|szukaj|wyszukaj|poszukaj|znajdz)\s+(?:for\s+|(?:the\s+)?(?:text|string|pattern|word)\s+)?(\S+)/);
   201	    const at = m ? m.index + m[0].length - m[1].length : -1;
   202	    const word = at >= 0 ? String(ex.text).slice(at, at + m[1].length) : null;
   203	    if (word != null && paths.includes(word)) { pathPattern = word; paths.splice(paths.indexOf(word), 1); }
   204	  }
   205	  // "on the disk" / "na (całym) dysku" is a search scope, never the object of a changing command
   206	  // ("usuń folder cache na dysku" is not `rm -r /`), and a folder the user names wins over it
   207	  if (ex.rootPhrase && paths.includes('/') && !/(^|\s)["']?\/["']?(?=[\s,.;:!?]|$)/.test(ex.text) &&
   208	      ((intent.risk !== 'safe' && !/^find \{path\}/.test(String(intent.template))) || (has('path') && pickDir(ex)))) {
   209	    paths.splice(paths.indexOf('/'), 1);
   210	  }
   211	
   212	  // archive-type paths (compress/extract)
   213	  const isArchive = (p) => /\.(tar\.gz|tgz|tar|zip|tar\.bz2|tar\.xz|gz)$/i.test(p) && !/^(tar\.gz|tar|tgz|zip|gz)$/i.test(p);
   214	  if (has('archive')) {
   215	    const a = paths.find(isArchive);
   216	    if (a) { v.archive = a; paths.splice(paths.indexOf(a), 1); }
   217	  }
   218	  if (has('src') || has('dst')) {
   219	    if (paths[0]) v.src = paths[0];
   220	    if (paths[1]) v.dst = paths[1];
   221	    else if (paths[0]) {
   222	      const d = pickDest(ex);
   223	      if (d && d !== paths[0]) v.dst = d;
   224	    }
   225	  }
   226	  if (has('file')) {
   227	    const f = paths.find((p) => /\.[A-Za-z0-9]+$/.test(p) || p.includes('/')) || paths[0];
   228	    if (f) v.file = f;
   229	    if (has('dest') && paths.length > 1) v.dest = paths.find((p) => p !== f);
   230	  }
   231	  if (has('path') && paths.length) {
   232	    v.path = paths[0];
   233	  } else if (has('path') && !['find_by_name', 'chown'].includes(intent.id)) {
   234	    const d = pickDir(ex);
   235	    if (d) v.path = d;
   236	  }
   237	  if (has('archive') && !v.archive) {
   238	    const base = (v.path || '.').replace(/\/+$/, '').split('/').pop();
   239	    const ext = intent.id === 'compress_zip' ? '.zip' : '.tar.gz';
   240	    v.archive = (!base || base === '.' || base === '..' || base === '~') ? `archive${ext}` : `${base}${ext}`;
   241	  }
   242	  if (ex.count != null) v.count = ex.count;
   243	  if (has('depth') && ex.count != null && ex.count <= 10) v.depth = ex.count;
   244	  if (ex.size) v.size = ex.size;
   245	  if (ex.duration) {
   246	    v.age = ex.duration.age;
   247	    v.days = ex.duration.days;
   248	    v.since = ex.duration.since;
   249	  } else if (has('days') && ex.count != null) {
   250	    v.days = ex.count;
   251	  }
   252	  if (ex.port) v.port = ex.port;
   253	  if (has('pid')) {
   254	    if (ex.pid) v.pid = ex.pid;
   255	    else if (ex.numbers?.length) v.pid = ex.numbers.find((n) => n > 1);
   256	  }
   257	  if (has('port') && !v.port && ex.numbers?.length) v.port = ex.numbers.find((n) => n >= 20 && n < 65536);
   258	  if (ex.mode && has('mode')) v.mode = ex.mode;
   259	  // line range: "lines 10-20", "od 10 do 20", "10 to 20", "from line 5 through 9"; else the first two numbers
   260	  if (has('start')) {
   261	    const m = String(ex.text).match(/(?<![\w.])(\d{1,9})\s*(?:-|–|—|\.\.|,|:|to|do|through|thru|until|till|and|i)\s*(?:line\s+|linii\s+|linia\s+)?(\d{1,9})(?![\w.])/i);
   262	    const [a, b] = m ? [+m[1], +m[2]] : (ex.numbers || []).slice(0, 2);
   263	    if (a > 0 && b > 0) { v.start = Math.min(a, b); v.end = Math.max(a, b); }
   264	    delete v.count;
   265	  }
   266	  if (has('num')) {
   267	    const n = ex.pid ?? ex.numbers?.find((x) => x > 0) ?? ex.count;
   268	    if (n != null) v.num = n;
   269	    delete v.count;
   270	  }
   271	  if (has('pr')) {
   272	    // "merge pr 45 in repository other/repo", "… --repo other/repo": the repository is kept (`--repo`), an unreadable one
   273	    // ("in the other repo", "in repo v2") withheld, never dropped; gh needs a pull request named with it
   274	    const rq = has('repo') ? prRepo(String(ex.text)) : null;
   275	    if (rq) v.repo = rq.repo;
   276	    // the pull request the user names: a URL or a branch is kept as it is (validation withholds an odd one), never
   277	    // dropped for a bare `gh pr merge`, which acts on the current branch's pull request
   278	    const sel = prSelector(rq ? { ...ex, text: rq.rest, numbers: (rq.rest.match(/\d+/g) || []).map(Number), quoted: ex.quoted.filter((q) => rq.rest.includes(q)) } : ex);
   279	    if (rq?.pr != null) v.pr = rq.pr;
   280	    else if (sel != null) v.pr = String(sel).replace(/^#(?=\d)/, '');

exec
/bin/bash -lc 'nl -ba src/rerank/hybrid.js && nl -ba src/rerank/encoder.js' in /workspace/tellsh
 succeeded in 0ms:
     1	// Hybrid policy: the linear cascade (A) answers when it is confident; otherwise a neural model re-ranks A's top-k.
     2	//
     3	//   A conf >= tau                      -> A (fast path, ~0.3 ms)
     4	//   A stage 1 says __none__ (keepNone)  -> keep A's rejection
     5	//   else  B (encoder) / C (tiny LM)    -> score_i = alpha*log pA_i + (1-alpha)*log pX_i over A's top-k candidates
     6	//                                         answer if pX(best) >= accept and pX(__none__) < none (B only), else reject
     7	//
     8	// suggestHybrid() wraps pipeline.suggest(): it runs the cheap pipeline first and only computes the neural model when
     9	// the cascade asks for help, then re-runs the pipeline with the re-ranked decision (history rules are never re-ranked).
    10	import { suggest } from '../pipeline.js';
    11	import { detectEnv } from '../env.js';
    12	import { FAMILY_OF, NONE } from '../tools.js';
    13	
    14	// calibrated on the training dev split (scripts/hybrid/eval_hybrid.js --calibrate); see HYBRID.md
    15	export const POLICY = {
    16	  // v0.4 (enc-v2 retrained without held-out augmented rows, recalibrated with an A_dev that excludes the dev split
    17	  // from every training source, OOD included); with the OOD-leaking A_dev A+B had tau 0.8, alpha 0.75; the first v0.4
    18	  // encoder had tau 0.9, alpha 0.5, none 0.3 (both); v0.3 had none: 0.5 and k: 5 for the safe variant
    19	  'A+B': { tau: 0.9, k: 5, alpha: 0.5, accept: 0, none: 0.5, keepNone: true, tagger: 'A' },
    20	  'A+B-safe': { tau: 0.9, k: 3, alpha: 0.5, accept: 0, none: 0.5, rescue: false, tagger: 'A' },
    21	  // A+C: C-ft rescored for the leak-free A_dev's candidates (before: tau 0.9)
    22	  'A+C': { tau: 0.8, k: 5, alpha: 0.75, accept: 0, keepNone: true },
    23	  'A+C-safe': { tau: 0.8, k: 5, alpha: 0.75, accept: 0, rescue: false },
    24	  B: { tau: Infinity, k: 0, alpha: 0, accept: 0, none: 0.3, keepNone: true, tagger: 'B' },
    25	  C: { tau: Infinity, k: 3, alpha: 0, accept: 0, keepNone: true },
    26	};
    27	
    28	const LOG = (p) => Math.log(Math.max(p, 1e-6));
    29	
    30	/**
    31	 * Re-rank a cascade result with model probabilities. pX: {intent: p} over (a superset of) the candidates;
    32	 * k = 0 means "all intents pX knows" (B alone). Returns a cascade-shaped object; `confidence` is pushed above/below
    33	 * the pipeline's accept threshold according to the policy's own accept rule.
    34	 */
    35	export function rerank(c, pX, P, { thr, pNone = 0 } = {}) {
    36	  if (c.confidence >= P.tau) return c;
    37	  // keepNone: the cascade's stage 1 says "not a shell request" -> keep its rejection (OOD safety)
    38	  if (P.keepNone && c.topTool === NONE && c.confidence < thr) return c;
    39	  // safe (rescue: false): only re-rank requests A answers anyway; A's rejections stay rejections
    40	  if (P.rescue === false && c.confidence < thr) return c;
    41	  const pa = Object.fromEntries(c.top.map((t) => [t.intent, t.p]));
    42	  const cands = P.k > 0 ? c.top.slice(0, P.k).map((t) => t.intent) : Object.keys(pX);
    43	  let best = null;
    44	  let bestS = -Infinity;
    45	  for (const i of cands) {
    46	    const s = P.alpha * LOG(pa[i] ?? 0) + (1 - P.alpha) * LOG(pX[i] ?? 0);
    47	    if (s > bestS) { bestS = s; best = i; }
    48	  }
    49	  if (!best) return c;
    50	  const px = pX[best] ?? 0;
    51	  const ok = px >= P.accept && pNone < (P.none ?? 1);
    52	  const conf = ok ? Math.max(thr, px) : Math.min(thr - 1e-6, px);
    53	  const tool = FAMILY_OF[best];
    54	  const top = [{ intent: best, tool, p: conf, pTool: pa[best] ?? 0, pIntent: px }, ...c.top.filter((t) => t.intent !== best)];
    55	  // an explicit model rejection (pNone >= none, or pX below accept) stays a rejection through the whole pipeline:
    56	  // topTool __none__ keeps the low-confidence composer from answering in its place
    57	  if (!ok) return { ...c, intent: best, tool, confidence: conf, top, reranked: true, topTool: NONE, rejected: true };
    58	  return { ...c, intent: best, tool, confidence: conf, top, reranked: true, topTool: tool };
    59	}
    60	
    61	/**
    62	 * opts: suggest() options + { system: 'A'|'B'|'C'|'A+B'|'A+C', encoder (src/rerank/encoder.js Encoder),
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
    94	
    95	/** CLI entry: A+B with the encoder loaded lazily (only when the cascade defers); falls back to A when the optional
    96	 *  runtime or model bundle is missing (result.hybrid.unavailable says why). */
    97	let ENC = null;
    98	export async function suggestLazy(query, opts = {}) {
    99	  const encoder = { infer: async (t, env) => {
   100	    if (ENC === null) { const { Encoder } = await import('./encoder.js'); ENC = (await Encoder.load({ threads: 1 })) || false; }
   101	    if (!ENC) throw Object.assign(new Error('unavailable'), { unavailable: true });
   102	    return ENC.infer(t, env);
   103	  } };
   104	  try {
   105	    return await suggestHybrid(query, { ...opts, system: opts.system || 'A+B', encoder });
   106	  } catch (e) {
   107	    if (!e.unavailable) throw e;
   108	    return { ...suggest(query, opts), hybrid: { system: 'A', deferred: false, unavailable: 'encoder (install onnxruntime-node + tellsh-model-enc)' } };
   109	  }
   110	}
   111	
   112	export { NONE };
     1	// (B) Hybrid encoder runtime: pruned multilingual-e5 (int8 ONNX) -> tool / intent distributions + BIO slot spans.
     2	// Optional: onnxruntime is lazy-loaded (onnxruntime-node, else onnxruntime-web/WASM) and the model bundle is looked up
     3	// in $TELLSH_MODEL_DIR, ~/.cache/tellsh/enc-v2, the `tellsh-model-enc` package, or hybrid/models/enc (development).
     4	// Nothing here touches the network: the bundle has to be installed once (scripts/hybrid/fetch_model.js or npm).
     5	import { readFileSync, existsSync } from 'node:fs';
     6	import { join } from 'node:path';
     7	import { homedir } from 'node:os';
     8	import { fileURLToPath } from 'node:url';
     9	import { createRequire } from 'node:module';
    10	import { UnigramTokenizer } from './tokenizer.js';
    11	import { allowedTags } from '../tagger.js';
    12	
    13	const require = createRequire(import.meta.url);
    14	export const BUNDLE = 'enc-v2'; // v0.4 labels (173 intents); enc-v1 was the v0.3 bundle (149)
    15	
    16	export function findModelDir(explicit) {
    17	  const cands = [explicit, process.env.TELLSH_MODEL_DIR, join(homedir(), '.cache', 'tellsh', BUNDLE)];
    18	  try { cands.push(join(require.resolve('tellsh-model-enc/package.json'), '..')); } catch { /* not installed */ }
    19	  cands.push(fileURLToPath(new URL('../../hybrid/models/enc', import.meta.url)));
    20	  return cands.find((d) => d && existsSync(join(d, 'encoder.int8.onnx')) && existsSync(join(d, 'vocab.json'))) || null;
    21	}
    22	
    23	async function loadOrt(prefer) {
    24	  const order = prefer === 'web' ? ['onnxruntime-web', 'onnxruntime-node'] : ['onnxruntime-node', 'onnxruntime-web'];
    25	  for (const m of order) {
    26	    try { const ort = await import(m); return { ort: ort.default ?? ort, name: m }; } catch { /* try next */ }
    27	  }
    28	  return null;
    29	}
    30	
    31	const softmax = (a) => { const m = Math.max(...a); const e = a.map((v) => Math.exp(v - m)); const s = e.reduce((x, y) => x + y, 0); return e.map((v) => v / s); };
    32	
    33	export class Encoder {
    34	  static async load({ dir, ort: prefer, threads = 1 } = {}) {
    35	    const d = findModelDir(dir);
    36	    if (!d) return null;
    37	    const rt = await loadOrt(prefer);
    38	    if (!rt) return null;
    39	    const t0 = performance.now();
    40	    const v = JSON.parse(readFileSync(join(d, 'vocab.json'), 'utf8'));
    41	    const labels = JSON.parse(readFileSync(join(d, 'labels.json'), 'utf8'));
    42	    const tok = new UnigramTokenizer({ vocab: v.pieces.map((p, i) => [p, v.scores[i]]), unkId: v.unk });
    43	    if (rt.name === 'onnxruntime-web' && rt.ort.env?.wasm) rt.ort.env.wasm.numThreads = threads;
    44	    const opts = { executionProviders: [rt.name === 'onnxruntime-web' ? 'wasm' : 'cpu'], intraOpNumThreads: threads, interOpNumThreads: 1, graphOptimizationLevel: 'all' };
    45	    const model = rt.name === 'onnxruntime-web' ? readFileSync(join(d, 'encoder.int8.onnx')) : join(d, 'encoder.int8.onnx');
    46	    const session = await rt.ort.InferenceSession.create(model, opts);
    47	    const e = new Encoder(rt, session, tok, labels, d);
    48	    e.loadMs = performance.now() - t0;
    49	    return e;
    50	  }
    51	
    52	  constructor(rt, session, tok, labels, dir) {
    53	    Object.assign(this, { ort: rt.ort, runtime: rt.name, session, tok, labels, dir });
    54	    this.T = labels.tagLabels;
    55	    this.cache = new Map();
    56	  }
    57	
    58	  /** -> { tools: {tool: p}, intents: {intent: p}, topIntent, topTool, pNone, tagger(text, tool) -> {spans} } */
    59	  async infer(text, env = {}) {
    60	    const key = `${env.shell}|${env.os}|${text}`;
    61	    if (this.cache.has(key)) return this.cache.get(key);
    62	    const ctx = this.labels.context.replace('{shell}', env.shell || 'bash').replace('{os}', env.os || 'linux');
    63	    const enc = this.tok.encodePair(text, ctx, this.labels.maxLen);
    64	    const n = enc.ids.length;
    65	    const T = this.ort.Tensor;
    66	    const feeds = { input_ids: new T('int64', BigInt64Array.from(enc.ids, BigInt), [1, n]), attention_mask: new T('int64', new BigInt64Array(n).fill(1n), [1, n]) };
    67	    const out = await this.session.run(feeds);
    68	    const pt = softmax(Array.from(out.tool.data));
    69	    const pi = softmax(Array.from(out.intent.data));
    70	    const tools = Object.fromEntries(this.labels.tools.map((t, i) => [t, pt[i]]));
    71	    const intents = Object.fromEntries(this.labels.intents.map((t, i) => [t, pi[i]]));
    72	    const C = this.T.length;
    73	    const tagLogits = [];
    74	    for (let j = 0; j < enc.nA; j++) tagLogits.push(Array.from(out.tags.data.subarray((j + 1) * C, (j + 2) * C)));
    75	    const res = {
    76	      tools, intents,
    77	      topTool: this.labels.tools[pt.indexOf(Math.max(...pt))],
    78	      topIntent: this.labels.intents[pi.indexOf(Math.max(...pi))],
    79	      pNone: tools.__none__ ?? 0,
    80	      tagger: (t, tool) => ({ spans: decodeSpans(t, enc.tokens, tagLogits, this.T, tool) }),
    81	    };
    82	    if (this.cache.size > 256) this.cache.clear();
    83	    this.cache.set(key, res);
    84	    return res;
    85	  }
    86	}
    87	
    88	/** Constrained Viterbi over sub-word BIO logits (tags allowed for the tool; I-X only after B-X/I-X), then spans
    89	 *  widened to whole words (sub-word pieces of one word belong to one span). */
    90	export function decodeSpans(text, toks, logits, L, tool) {
    91	  const n = toks.length;
    92	  if (!n) return [];
    93	  const allowed = allowedTags(tool);
    94	  const ok = L.map((l) => l === 'O' || allowed.has(l.slice(2)));
    95	  const C = L.length;
    96	  const sc = logits.map((z) => {
    97	    let m = -Infinity;
    98	    for (let c = 0; c < C; c++) if (ok[c] && z[c] > m) m = z[c];
    99	    let s = 0;
   100	    for (let c = 0; c < C; c++) if (ok[c]) s += Math.exp(z[c] - m);
   101	    const lse = m + Math.log(s);
   102	    return z.map((v, c) => (ok[c] ? v - lse : -Infinity));
   103	  });
   104	  const follow = (p, c) => !L[c].startsWith('I-') || (p >= 0 && L[p] !== 'O' && L[p].slice(2) === L[c].slice(2));
   105	  const dp = sc.map(() => new Float64Array(C).fill(-Infinity));
   106	  const bp = sc.map(() => new Int16Array(C).fill(-1));
   107	  for (let c = 0; c < C; c++) if (follow(-1, c)) dp[0][c] = sc[0][c];
   108	  for (let i = 1; i < n; i++) {
   109	    for (let c = 0; c < C; c++) {
   110	      if (sc[i][c] === -Infinity) continue;
   111	      let best = -Infinity; let arg = -1;
   112	      for (let p = 0; p < C; p++) if (dp[i - 1][p] > best && follow(p, c)) { best = dp[i - 1][p]; arg = p; }
   113	      if (arg >= 0) { dp[i][c] = best + sc[i][c]; bp[i][c] = arg; }
   114	    }
   115	  }
   116	  let last = 0;
   117	  for (let c = 1; c < C; c++) if (dp[n - 1][c] > dp[n - 1][last]) last = c;
   118	  const path = new Array(n);
   119	  path[n - 1] = last;
   120	  for (let i = n - 1; i > 0; i--) path[i - 1] = Math.max(0, bp[i][path[i]]);
   121	  const spans = [];
   122	  let cur = null;
   123	  path.forEach((c, i) => {
   124	    const l = L[c];
   125	    const t = toks[i];
   126	    if (l === 'O') { cur = null; return; }
   127	    if (l.startsWith('B-') || !cur || cur.type !== l.slice(2)) { cur = { type: l.slice(2), start: t.start, end: t.end }; spans.push(cur); } else cur.end = t.end;
   128	  });
   129	  // widen to word boundaries, trim trailing punctuation, merge spans that now overlap
   130	  const out = [];
   131	  for (const s of spans) {
   132	    let a = s.start; let b = s.end;
   133	    while (a > 0 && !/\s/.test(text[a - 1])) a--;
   134	    while (b < text.length && !/\s/.test(text[b])) b++;
   135	    let w = text.slice(a, b);
   136	    const lead = w.match(/^["'„“`(]+/)?.[0].length || 0;
   137	    const trail = w.match(/["'”`),.;:!?]+$/)?.[0].length || 0;
   138	    const quoted = lead > 0 && /["'„“`]/.test(w[0]);
   139	    if (!quoted) { a += lead; b -= trail; } else {
   140	      // quoted value: the whole quoted string (may contain spaces)
   141	      const q = w[0] === '„' ? '”' : w[0];
   142	      const close = text.indexOf(q === '“' ? '”' : q, a + 1);
   143	      if (close > a) b = close + 1;
   144	    }
   145	    if (b <= a) continue;
   146	    const prev = out[out.length - 1];
   147	    if (prev && a < prev.end) { if (prev.type === s.type) prev.end = Math.max(prev.end, b); continue; }
   148	    out.push({ type: s.type, start: a, end: b, quoted });
   149	  }
   150	  for (const s of out) s.text = text.slice(s.start, s.end);
   151	  return out;
   152	}

exec
/bin/bash -lc "nl -ba src/fill.js | sed -n '270,470p'" in /workspace/tellsh
 succeeded in 0ms:
   270	  }
   271	  if (has('pr')) {
   272	    // "merge pr 45 in repository other/repo", "… --repo other/repo": the repository is kept (`--repo`), an unreadable one
   273	    // ("in the other repo", "in repo v2") withheld, never dropped; gh needs a pull request named with it
   274	    const rq = has('repo') ? prRepo(String(ex.text)) : null;
   275	    if (rq) v.repo = rq.repo;
   276	    // the pull request the user names: a URL or a branch is kept as it is (validation withholds an odd one), never
   277	    // dropped for a bare `gh pr merge`, which acts on the current branch's pull request
   278	    const sel = prSelector(rq ? { ...ex, text: rq.rest, numbers: (rq.rest.match(/\d+/g) || []).map(Number), quoted: ex.quoted.filter((q) => rq.rest.includes(q)) } : ex);
   279	    if (rq?.pr != null) v.pr = rq.pr;
   280	    else if (sel != null) v.pr = String(sel).replace(/^#(?=\d)/, '');
   281	    else if (rq) v.pr = '?';
   282	    delete v.count;
   283	  }
   284	  if (has('wenv')) {
   285	    const t = String(ex.text);
   286	    if (WR_DRY.test(t)) v.dryrun = '--dry-run';
   287	    const m = t.match(WR_ENV_OPT) || t.match(WR_ENV_WORD) || t.match(WR_ENV_KNOWN);
   288	    // an environment named but not readable ("to the env called 'a b'") is withheld, never the default target
   289	    const w = m ? String(m[1] ?? m[2]).replace(/[.,!?;:]+$/, '') : null;
   290	    if (w != null) v.wenv = RAW_OK.wenv(w) ? w : '?';
   291	    else if (WR_ENV_ANY.test(t)) v.wenv = '?';
   292	  }
   293	  if (ex.ext) v.glob = `*.${ex.ext}`;
   294	  if (ex.urls.length) v.url = ex.urls[0];
   295	  else if (has('url') && ex.hosts.length) v.url = /^\w+:\/\//.test(ex.hosts[0]) ? ex.hosts[0] : `https://${ex.hosts[0]}`;
   296	
   297	  if (pathPattern != null) v.pattern = pathPattern;
   298	  for (const k of ['name', 'service', 'container', 'pkg', 'cmd', 'script', 'var', 'branch', 'user', 'pattern', 'host', 'target', 'message']) {
   299	    if (has(k) && v[k] == null) {
   300	      const val = pickArg(k, ex);
   301	      if (val != null && val !== '') v[k] = val;
   302	    }
   303	  }
   304	  if (intent.id === 'base64_encode' || intent.id === 'base64_decode') {
   305	    const t = pickArg('text', ex);
   306	    const fileWord = /\b(plik\w*|files?)\s+\S+\.\w+/i.test(ex.text);
   307	    if (ex.quoted.length) v.text = ex.quoted[0];
   308	    else if (paths.length && fileWord) v.file = paths[0];
   309	    else if (paths.length && !(t && t.includes(' '))) v.file = paths[0];
   310	    else if (t) v.text = t;
   311	  }
   312	  if (intent.id === 'find_by_name') {
   313	    let name = v.name ?? (ex.quoted[0] || paths.find((p) => !p.includes('/') && p !== '.' && p !== '~'));
   314	    if (!name) {
   315	      const w = ex.rest.match(/\b(?:named|called|name|nazwie|nazwa|nazwany|nazywa sie|nazywajacy sie|plik|file|pliku)\s+(?:o\s+)?(?:nazwie\s+)?([\w.*-]+)/);
   316	      if (w && !/^(o|the|a|nazwie|named|called)$/.test(w[1])) name = w[1];
   317	    }
   318	    if (name) {
   319	      v.name = name;
   320	      v.namepat = /[*?]/.test(name) || /\.\w+$/.test(name) ? name : `*${name}*`;
   321	      if (v.path === name) v.path = paths.find((p) => p !== name);
   322	    }
   323	  }
   324	  if (intent.id === 'replace_text') {
   325	    let [o, n] = ex.taggerOnly ? [ex.tagged.PATTERN?.[0], ex.tagged.REPL?.[0]] : ex.quoted;
   326	    if (!ex.taggerOnly && (o == null || n == null)) {
   327	      const m = ex.text.match(/(?:replace|substitute|change|swap|zamie[nń]|zmie[nń]|podmie[nń]|zast[aą]p)\s+(?:all\s+|every\s+|wszystkie\s+|ka[zż]de\s+)?(?:occurrences of\s+|wyst[aą]pienia\s+)?(?:word\s+|s[lł]owo\s+|text\s+|tekst\s+|string\s+)?["'„]?([^\s"'”]+)["'”]?\s+(?:with|to|for|into|by|na|->|=>)\s+["'„]?([^\s"'”]+)["'”]?/i);
   328	      if (m) { o = o ?? m[1]; n = n ?? m[2]; }
   329	    }
   330	    if (o != null) v.old = o;
   331	    if (n != null) v.new = n;
   332	    if (o != null && n != null) v.sedexpr = `s/${sedEscapeOld(o)}/${sedEscapeNew(n)}/g`;
   333	    // the file is the path that is not one of the replaced words
   334	    if (v.file && (v.file === o || v.file === n)) v.file = paths.find((p) => p !== o && p !== n);
   335	  }
   336	  if (intent.id === 'chown' && v.user && v.path === v.user) delete v.path;
   337	  for (const k of Object.keys(v)) if (v[k] === undefined) delete v[k];
   338	  return v;
   339	}
   340	
   341	function renderValue(name, raw, values, quote) {
   342	  if (!(name in values)) return null;
   343	  let val = values[name];
   344	  if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
   345	  if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
   346	  return quote(val, { tilde: PATH_SLOTS.has(name), name });
   347	}
   348	
   349	const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;
   350	
   351	/**
   352	 * Fill a template. Returns { command, missing[] }.
   353	 * `values` = resolved slots merged over intent defaults.
   354	 */
   355	export function render(template, values, required = [], quote = shQuote, keepOptional = []) {
   356	  const missing = [];
   357	  const isSlot = (name) => name in values || required.includes(name) || SLOT_NAMES.test(name);
   358	  // Single pass over the template: every {slot} and «optional segment» is substituted exactly once and
   359	  // inserted values are never scanned again (a value containing "{file}" must stay inert text).
   360	  const out = template.replace(/«([^»]*)»|\{(\w+)(!raw)?\}/g, (m, seg, name, raw) => {
   361	    if (seg != null) {
   362	      let ok = true;
   363	      const r = seg.replace(/\{(\w+)(!raw)?\}/g, (m2, n2, raw2) => {
   364	        if (!ok) return m2;
   365	        const val = renderValue(n2, !!raw2, values, quote);
   366	        // an operand withheld on purpose (keepOptional: an invalid operand, an unresolved history value) keeps its
   367	        // placeholder: the optional part is not silently dropped (`npm install <PKG>`, never `npm install`)
   368	        if (val == null && keepOptional.includes(n2)) { missing.push(n2); return PLACEHOLDER(n2); }
   369	        if (val == null) { ok = false; return m2; }
   370	        return val;
   371	      });
   372	      return ok ? (/^\s/.test(r) ? r : ' ' + r) : '';
   373	    }
   374	    if (!isSlot(name)) return m; // not a slot (e.g. awk braces, %{http_code}, PowerShell script blocks)
   375	    const val = renderValue(name, !!raw, values, quote);
   376	    if (val == null) {
   377	      missing.push(name);
   378	      return PLACEHOLDER(name);
   379	    }
   380	    return val;
   381	  });
   382	  return { command: out, missing };
   383	}
   384	
   385	const DERIVED_REQUIRED = { namepat: 'name', glob: 'ext', sedexpr: 'old' };
   386	
   387	const SIZE_MULT = { c: 1, k: 1024, M: 1024 ** 2, G: 1024 ** 3 };
   388	/** Slots derived from others so every shell can use the unit it needs (find: -mmin/-size, PowerShell: minutes/bytes). */
   389	export function deriveSlots(v) {
   390	  if (v.glob && v.ext == null) { const m = String(v.glob).match(/^\*\.([\w]+)$/); if (m) v.ext = m[1]; }
   391	  if (v.minutes == null && v.age) {
   392	    const m = String(v.age).match(/^-m(min|time) -(\d+)$/);
   393	    if (m) v.minutes = m[1] === 'min' ? +m[2] : +m[2] * 1440;
   394	  }
   395	  if (v.sizeBytes == null && v.size != null) {
   396	    const m = String(v.size).match(/^(\d+)([ckMG]?)$/);
   397	    if (m) v.sizeBytes = +m[1] * (SIZE_MULT[m[2]] ?? 512);
   398	  }
   399	  return v;
   400	}
   401	
   402	/** env from the legacy `platform` option */
   403	export const envFromPlatform = (platform = process.platform) => ({
   404	  shell: 'bash',
   405	  os: platform === 'darwin' ? 'darwin' : platform === 'win32' ? 'win32' : 'linux',
   406	  coreutils: platform === 'darwin' ? 'bsd' : 'gnu',
   407	});
   408	
   409	/**
   410	 * Build a full suggestion for an intent and query.
   411	 *   env: { shell, os, coreutils } (default: bash on `platform`)
   412	 *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
   413	 * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}
   414	 */
   415	export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [], keepOptional = [] } = {}) {
   416	  const intent = BY_ID[intentId];
   417	  if (!intent) throw new Error(`unknown intent ${intentId}`);
   418	  const e = env || envFromPlatform(platform);
   419	  const resolved = given || resolveSlots(intent, extracted || extractSlots(text));
   420	  const defaults = { ...intent.slots, ...(e.os === 'darwin' ? intent.darwinDefaults : {}) };
   421	  const values = {};
   422	  for (const [k, d] of Object.entries(defaults)) if (d != null) values[k] = d;
   423	  Object.assign(values, resolved);
   424	  // blank: slots withheld on purpose (refused reference, ambiguous path): no default stands in for them
   425	  for (const k of blank) if (resolved[k] == null) delete values[k];
   426	  // the filesystem root ("whole disk", "na całym dysku") is the system drive for Windows shells
   427	  if (e.os === 'win32' && (e.shell === 'powershell' || e.shell === 'cmd')) {
   428	    for (const k of PATH_SLOTS) if (values[k] === '/') values[k] = 'C:\\';
   429	  }
   430	  deriveSlots(values);
   431	  const required = [...new Set([...Object.entries(intent.slots).filter(([, d]) => d == null).map(([k]) => k), ...blank.filter((k) => !(k in values))])];
   432	
   433	  const choice = chooseTemplate(intent, e);
   434	  const base = {
   435	    intent: intent.id, description: intent.description, baseRisk: intent.risk, slots: resolved,
   436	    notes: intent.notes || null, shell: e.shell, os: e.os, variant: choice.variant || null,
   437	  };
   438	  if (choice.gap) {
   439	    return { ...base, command: null, gap: choice.gap, risk: intent.risk, warnings: [], critical: false, missing: [] };
   440	  }
   441	  const baseQuote = quoteForKind(choice.kind, choice.wrapPosix);
   442	  const tpl = choice.tpl;
   443	  const pwshNative = choice.kind === 'pwsh' && !choice.wrapPosix;
   444	  const nativeSlots = pwshNative ? pwshNativeSlots(tpl) : new Set();
   445	  const quote = !pwshNative ? baseQuote : (v, o = {}) => {
   446	    // function templates: every value is checked (the target program is not known statically)
   447	    if ((typeof tpl === 'function' || nativeSlots.has(o.name)) && unsafeNativePwshArg(v)) {
   448	      throw new UnquotableError(`value ${JSON.stringify(String(v))} cannot be passed to a native program safely by PowerShell < 7.3 (embedded " or trailing \\)`);
   449	    }
   450	    return baseQuote(v, o);
   451	  };
   452	  let command;
   453	  let missing = [];
   454	  try {
   455	    if (typeof tpl === 'function') {
   456	      const vals = { ...values };
   457	      for (const r of required) if (!(r in vals)) { missing.push(r); vals[r] = PLACEHOLDER(r); }
   458	      // only path slots may get a ./ prefix; any other value starting with - would be read as an
   459	      // option (printf -n, findstr /?, taskkill ...): it is left as a placeholder instead
   460	      for (const [k, v] of Object.entries(vals)) {
   461	        if (!PATH_SLOTS.has(k) && !RAW_OK[k] && typeof v === 'string' && /^-/.test(v)) { missing.push(k); vals[k] = PLACEHOLDER(k); }
   462	      }
   463	      const pathVals = new Set([...PATH_SLOTS].filter((k) => vals[k] != null).map((k) => String(vals[k])));
   464	      const q = (s) => {
   465	        const isPath = pathVals.has(String(s));
   466	        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { tilde: isPath });
   467	      };
   468	      // catalog functions take the OS string, variant functions a ctx object
   469	      command = tpl(vals, q, tpl === intent.template || tpl === intent.darwin ? e.os : e);
   470	      if (/<TEXT>/.test(command)) missing.push('text');

exec
/bin/bash -lc 'node test/pipeline.test.js' in /workspace/tellsh
 exited 1 in 257ms:
TAP version 13
# Subtest: stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
ok 1 - stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
  ---
  duration_ms: 9.127997
  ...
# Subtest: PowerShell vocabulary maps to the same tool family
ok 2 - PowerShell vocabulary maps to the same tool family
  ---
  duration_ms: 2.815696
  ...
# Subtest: tagger: tool-conditioned BIO spans, only tags valid for the tool
ok 3 - tagger: tool-conditioned BIO spans, only tags valid for the tool
  ---
  duration_ms: 12.35396
  ...
# Subtest: slot merge: tagger primary, regex fills misses and replaces invalid values
ok 4 - slot merge: tagger primary, regex fills misses and replaces invalid values
  ---
  duration_ms: 7.486435
  ...
# Subtest: end-to-end bash + PowerShell + BSD
ok 5 - end-to-end bash + PowerShell + BSD
  ---
  duration_ms: 44.047286
  ...
# Subtest: history: pronouns, "same for", container/service/pid references (EN + PL)
ok 6 - history: pronouns, "same for", container/service/pid references (EN + PL)
  ---
  duration_ms: 58.088642
  ...
# Subtest: history is optional: without it a pronoun request gets a hint, never a guessed value
ok 7 - history is optional: without it a pronoun request gets a hint, never a guessed value
  ---
  duration_ms: 1.298437
  ...
# Subtest: history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
ok 8 - history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
  ---
  duration_ms: 0.713432
  ...
# Subtest: loadHistory reads only the tail of HISTFILE and returns the last n commands
not ok 9 - loadHistory reads only the tail of HISTFILE and returns the last n commands
  ---
  duration_ms: 1.036168
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
  duration_ms: 0.747715
  ...
# Subtest: second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
ok 11 - second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
  ---
  duration_ms: 12.290982
  ...
# Subtest: out-of-domain requests are rejected (also by the composer)
ok 12 - out-of-domain requests are rejected (also by the composer)
  ---
  duration_ms: 2.777482
  ...
# Subtest: env detection and overrides
ok 13 - env detection and overrides
  ---
  duration_ms: 1.985163
  ...
1..13
# tests 13
# suites 0
# pass 12
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 209.43796

exec
/bin/bash -lc 'nl -ba scripts/hybrid/export_data.js && cat scripts/hybrid/train_a_dev.sh && nl -ba scripts/hybrid/sets.js' in /workspace/tellsh
 succeeded in 0ms:
     1	#!/usr/bin/env node
     2	// Export raw-text training data for the hybrid neural models (B: encoder, C: LM reranker).
     3	// Mirrors scripts/gen_data.js (same sources, same held-out filter, same teacher decisions, same silver spans and
     4	// relexicalisation) but writes text + char-offset spans instead of hashed features.
     5	//
     6	//   build/hybrid/train.jsonl  {text, tool, intent, lang, shell, os, spans:[[type,start,end]], gid, src, split}
     7	//     split = 'dev' for ~10% of the base sentence groups (all copies of a sentence stay on one side); dev rows are
     8	//     never used to fit B/C and serve to calibrate the hybrid thresholds.
     9	//   build/hybrid/meta.json    {tools, intents, intentTool, tagLabels}
    10	//   build/hybrid/dev_texts.json  every normalized dev text (train rows with one of these texts are dropped)
    11	import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
    12	import { join } from 'node:path';
    13	import { fileURLToPath, pathToFileURL } from 'node:url';
    14	import { INTENTS } from '../../src/catalog.js';
    15	import { FAMILIES, FAMILY_OF, NONE, TAG_TYPES } from '../../src/tools.js';
    16	import { normalize, fnv1a } from '../../src/features.js';
    17	import { silverSpans, relex, mulberry32 } from '../lib/silver.js';
    18	import { exclusionIndex } from '../lib/heldout.js';
    19	import { readReal, realTrain } from '../real/real_rows.js';
    20	
    21	const ROOT = fileURLToPath(new URL('../..', import.meta.url));
    22	const OUT = join(ROOT, 'build', 'hybrid');
    23	const rng = mulberry32(29);
    24	const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
    25	const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);
    26	
    27	const SHELL_P = [['bash', 0.35], ['zsh', 0.25], ['sh', 0.07], ['powershell', 0.18], ['fish', 0.08], ['cmd', 0.07]];
    28	function sampleEnv() {
    29	  let s = 'bash';
    30	  let r = rng();
    31	  for (const [k, p] of SHELL_P) { if ((r -= p) <= 0) { s = k; break; } }
    32	  let os;
    33	  if (s === 'cmd') os = 'win32';
    34	  else if (s === 'powershell') os = rng() < 0.7 ? 'win32' : rng() < 0.5 ? 'linux' : 'darwin';
    35	  else if (s === 'zsh') os = rng() < 0.6 ? 'darwin' : 'linux';
    36	  else os = rng() < 0.7 ? 'linux' : 'darwin';
    37	  return { shell: s, os };
    38	}
    39	function typo(text) {
    40	  const chars = [...text];
    41	  const idxs = chars.map((c, i) => (/\p{L}/u.test(c) ? i : -1)).filter((i) => i >= 0);
    42	  if (idxs.length < 4) return text;
    43	  const i = idxs[1 + Math.floor(rng() * (idxs.length - 2))];
    44	  const op = rng();
    45	  if (op < 0.4) chars.splice(i, 1);
    46	  else if (op < 0.8 && /\p{L}/u.test(chars[i + 1] || '')) [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
    47	  else chars.splice(i, 0, chars[i]);
    48	  return chars.join('');
    49	}
    50	// typo() shifts offsets, so only the clean / relexicalised copies carry spans
    51	export const isDev = (text) => fnv1a('dev:' + normalize(text)) % 10 === 0;
    52	
    53	/**
    54	 * The row sink: every emitted row is checked against the held-out index, not only the originals. A typo or
    55	 * relexicalised copy can be exactly a held-out text ("kill all node processes", "koniec pliku /var/log/syslog").
    56	 */
    57	export function heldOutFilter(heldOut) {
    58	  const out = { rows: [], dropped: 0 };
    59	  out.push = (o) => { if (heldOut.has(o.text)) out.dropped++; else out.rows.push(o); };
    60	  return out;
    61	}
    62	
    63	function main() {
    64	  mkdirSync(OUT, { recursive: true });
    65	  const ids = new Set(INTENTS.map((i) => i.id));
    66	  // the same held-out index as gen_data.js (eval / blind sets, near-duplicates, eval-only values, real-usage eval split)
    67	  const real = process.argv.includes('--no-real') ? [] : readReal(ROOT);
    68	  const excl = exclusionIndex(ROOT);
    69	  const heldOut = { has: (n) => excl.has(n) };
    70	  const intentRows = [...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'train.jsonl'))].map((r) => ({ ...r, src: 'intents' }));
    71	  const shellRows = readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell' }));
    72	  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl')).filter((d) => d.text && d.field !== 'risk');
    73	  const decide = new Map(decisions.map((d) => [normalize(d.text), d]));
    74	  const seen = new Set();
    75	  const base = [];
    76	  const realRows = realTrain(real, ids);
    77	  for (const r0 of [...intentRows, ...shellRows, ...realRows]) {
    78	    if (!ids.has(r0.intent)) throw new Error(`unknown intent ${r0.intent}`);
    79	    const n = normalize(r0.text);
    80	    if (heldOut.has(r0.text)) continue;
    81	    const d = decide.get(n);
    82	    if (d?.action === 'drop') continue;
    83	    const r = d?.action === 'relabel' && d.intent ? { ...r0, intent: d.intent } : r0;
    84	    const key = n + '|' + r.intent + '|' + (r.shell || '');
    85	    if (seen.has(key)) continue;
    86	    seen.add(key);
    87	    base.push(r);
    88	  }
    89	  const out = heldOutFilter(heldOut);
    90	  const { rows, push } = out;
    91	  let gid = 0;
    92	  for (const r of base) {
    93	    const g = gid++;
    94	    const tool = FAMILY_OF[r.intent];
    95	    const split = isDev(r.text) ? 'dev' : 'train';
    96	    const env = () => (r.shell ? { shell: r.shell, os: r.os || 'linux' } : sampleEnv());
    97	    const { spans } = silverSpans(r.text, r.intent);
    98	    const sp = (s) => s.map((x) => [x.type, x.start, x.end]);
    99	    push({ text: r.text, tool, intent: r.intent, lang: r.lang, ...env(), spans: sp(spans), gid: g, src: r.src, split, kind: 'orig' });
   100	    push({ text: typo(r.text), tool, intent: r.intent, lang: r.lang, ...env(), spans: null, gid: g, src: r.src, split, kind: 'typo' });
   101	    for (let k = 0; k < 2; k++) {
   102	      const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'train' });
   103	      if (rx.text !== r.text) push({ text: rx.text, tool, intent: r.intent, lang: r.lang, ...env(), spans: sp(rx.spans), gid: g, src: r.src, split, kind: 'relex' });
   104	    }
   105	  }
   106	  // tldr descriptions: tool label only (intent ''), capped per family/lang as in gen_data
   107	  const tldr = readJsonl(join(ROOT, 'data', 'tldr', 'tools.jsonl'));
   108	  const cap = {};
   109	  for (const r of tldr.sort(() => rng() - 0.5)) {
   110	    if (!FAMILIES[r.tool] || !r.text || r.text.length < 8 || heldOut.has(r.text)) continue;
   111	    const key = r.tool + r.lang;
   112	    if ((cap[key] = (cap[key] || 0) + 1) > (r.lang === 'pl' ? 60 : 80)) continue;
   113	    const win = /^windows\//.test(r.page || '');
   114	    push({ text: r.text, tool: r.tool, intent: '', lang: r.lang, ...(win ? { shell: 'powershell', os: 'win32' } : sampleEnv()), spans: null, gid: gid++, src: 'tldr', split: isDev(r.text) ? 'dev' : 'train', kind: 'orig' });
   115	  }
   116	  for (const r of readJsonl(join(ROOT, 'data', 'ood.jsonl'))) {
   117	    if (heldOut.has(r.text)) continue;
   118	    const g = gid++;
   119	    const split = isDev(r.text) ? 'dev' : 'train';
   120	    push({ text: r.text, tool: NONE, intent: '', lang: r.lang, ...sampleEnv(), spans: [], gid: g, src: 'ood', split, kind: 'orig' });
   121	    push({ text: typo(r.text), tool: NONE, intent: '', lang: r.lang, ...sampleEnv(), spans: [], gid: g, src: 'ood', split, kind: 'typo' });
   122	  }
   123	  // a typo / relexicalised copy (or another source's sentence) on the train side can be exactly a dev text
   124	  // ("policz pliki w /var/log"): the dev split must stay unseen, so such train rows are dropped
   125	  const devTexts = new Set(rows.filter((r) => r.split === 'dev').map((r) => normalize(r.text)));
   126	  const before = rows.length;
   127	  rows.splice(0, rows.length, ...rows.filter((r) => r.split === 'dev' || !devTexts.has(normalize(r.text))));
   128	  writeFileSync(join(OUT, 'train.jsonl'), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
   129	  // the complete dev-text index (every emitted dev row, not only texts whose own hash is dev): train_a_dev.sh
   130	  // excludes it from A_dev's training data
   131	  writeFileSync(join(OUT, 'dev_texts.json'), JSON.stringify([...devTexts].sort()));
   132	  const meta = {
   133	    tools: [...Object.keys(FAMILIES), NONE],
   134	    intents: INTENTS.map((i) => i.id),
   135	    intentTool: Object.fromEntries(INTENTS.map((i) => [i.id, FAMILY_OF[i.id]])),
   136	    descriptions: Object.fromEntries(INTENTS.map((i) => [i.id, i.description])),
   137	    tagLabels: ['O', ...TAG_TYPES.flatMap((t) => [`B-${t}`, `I-${t}`])],
   138	  };
   139	  writeFileSync(join(OUT, 'meta.json'), JSON.stringify(meta, null, 1));
   140	  const c = (f) => rows.filter(f).length;
   141	  console.log(`export_data: ${out.dropped} augmented rows dropped (held-out texts), ${before - rows.length} train rows dropped (dev texts)`);
   142	  console.log(`export_data: ${base.length} base (${base.filter((r) => r.src === 'real').length} real), ${rows.length} rows (train ${c((r) => r.split === 'train')}, dev ${c((r) => r.split === 'dev')}), tldr ${c((r) => r.src === 'tldr')}, ood ${c((r) => r.src === 'ood')}`);
   143	}
   144	if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
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
     1	// Evaluation sets shared by scripts/hybrid/dump_cascade.js (A's top-k for the Python rerankers) and eval_hybrid.js.
     2	// Every set is a list of {text, intent|null, lang, shell, os, ...}. The real-usage sets come from the PRIVATE
     3	// build/real/rows.jsonl (scripts/real/prepare_real.js) and are empty when it is missing.
     4	import { readFileSync, readdirSync, existsSync } from 'node:fs';
     5	import { join } from 'node:path';
     6	import { silverSpans, relex, mulberry32 } from '../lib/silver.js';
     7	
     8	const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
     9	const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);
    10	
    11	// intents added in v0.4 (from real command usage)
    12	export const NEW_INTENTS = new Set(['print_line_range', 'ssh_port_forward', 'npm_run_script', 'npm_install', 'npm_install_global',
    13	  'pip_install', 'activate_venv', 'tool_version', 'cli_help', 'wrangler_deploy', 'wrangler_dev', 'wrangler_tail',
    14	  'wrangler_secret_put', 'wrangler_login', 'wrangler_whoami', 'gh_auth_status', 'gh_auth_login', 'gh_pr_list', 'gh_pr_view',
    15	  'gh_pr_create', 'gh_pr_checks', 'gh_pr_merge', 'gh_run_list', 'gh_run_view']);
    16	
    17	// their tool families (lets the v0.3 code, which does not know them, be scored on stage 1 too)
    18	export const NEW_FAMILY = Object.fromEntries([...NEW_INTENTS].map((i) => [i,
    19	  i === 'print_line_range' ? 'head' : i === 'ssh_port_forward' ? 'ssh' : /^npm_/.test(i) ? 'npm' : /^(pip_install|activate_venv)$/.test(i) ? 'python'
    20	    : /^(tool_version|cli_help)$/.test(i) ? 'cli' : i.split('_')[0]]));
    21	
    22	export function evalSets(ROOT) {
    23	  const real = readJsonl(join(ROOT, 'build/real/rows.jsonl')).filter((r) => r.split === 'eval');
    24	  const v04 = readDir(join(ROOT, 'data/eval_v04'));
    25	  return {
    26	    eval: () => readDir(join(ROOT, 'data/eval')).map((r) => ({ ...r, shell: 'bash', os: 'linux' })),
    27	    shell: () => readJsonl(join(ROOT, 'data/shell/eval.jsonl')),
    28	    blind: () => readDir(join(ROOT, 'data/hybrid/blind')).filter((r) => r.intent),
    29	    blind_ood: () => readDir(join(ROOT, 'data/hybrid/blind')).filter((r) => !r.intent),
    30	    blind3: () => readJsonl(join(ROOT, 'data/blind/intents.jsonl')),
    31	    blind3_ood: () => readJsonl(join(ROOT, 'data/blind/ood.jsonl')),
    32	    ood: () => readJsonl(join(ROOT, 'data/ood_eval.jsonl')),
    33	    devtools: () => v04.filter((r) => r.intent),
    34	    real: () => real.filter((r) => r.intent),
    35	    real_ooc: () => real.filter((r) => !r.intent),
    36	    // relexicalised data/eval: same construction and seed as scripts/eval.js section 4
    37	    relex: () => {
    38	      const rng = mulberry32(7);
    39	      const out = [];
    40	      for (const r of readDir(join(ROOT, 'data/eval'))) {
    41	        const { spans } = silverSpans(r.text, r.intent);
    42	        if (!spans.length) continue;
    43	        const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'eval', keepProb: 0 });
    44	        out.push({ text: rx.text, intent: r.intent, lang: r.lang, shell: 'bash', os: 'linux' });
    45	      }
    46	      return out;
    47	    },
    48	  };
    49	}

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for (const q of ['deploy worker to staging-eu','deploy worker to preview2','deploy worker to qa-blue','deploy worker to customer-a','deploy worker to production-eu environment','wrangler deploy -e','wrangler deploy --env','wrangler deploy --env=','deploy worker without deploying','deploy worker but do not deploy','merge the pr with label \"urgent\"','merge the pr with title \"fix-login\"','merge the pr from branch \"main\"','merge the dependabot pr #7','merge pr 7 and pr 8']) {const r=suggest(q,{env}); console.log(JSON.stringify({q,command:r.command,intent:r.intent,missing:r.missing,risk:r.risk,method:r.method}));}
JS" in /workspace/tellsh
 succeeded in 100ms:
{"q":"deploy worker to staging-eu","command":"npx wrangler deploy --env staging","intent":"wrangler_deploy","missing":[],"risk":"medium","method":"catalog"}
{"q":"deploy worker to preview2","command":"npx wrangler deploy","intent":"wrangler_deploy","missing":[],"risk":"medium","method":"catalog"}
{"q":"deploy worker to qa-blue","command":"npx wrangler deploy --env qa","intent":"wrangler_deploy","missing":[],"risk":"medium","method":"catalog"}
{"q":"deploy worker to customer-a","command":"npx wrangler deploy","intent":"wrangler_deploy","missing":[],"risk":"medium","method":"catalog"}
{"q":"deploy worker to production-eu environment","command":"npx wrangler deploy --env production-eu","intent":"wrangler_deploy","missing":[],"risk":"medium","method":"catalog"}
{"q":"wrangler deploy -e","command":"npx wrangler deploy","intent":"wrangler_deploy","missing":[],"risk":"medium","method":"catalog"}
{"q":"wrangler deploy --env","command":"npx wrangler deploy --env <WENV>","intent":"wrangler_deploy","missing":["wenv"],"risk":"medium","method":"catalog"}
{"q":"wrangler deploy --env=","command":"npx wrangler deploy --env <WENV>","intent":"wrangler_deploy","missing":["wenv"],"risk":"medium","method":"catalog"}
{"q":"deploy worker without deploying","command":"npx wrangler deploy --dry-run","intent":"wrangler_deploy","missing":[],"risk":"medium","method":"catalog"}
{"q":"deploy worker but do not deploy","command":"npx wrangler deploy","intent":"wrangler_deploy","missing":[],"risk":"medium","method":"catalog"}
{"q":"merge the pr with label \"urgent\"","command":"gh pr merge urgent","intent":"gh_pr_merge","missing":[],"risk":"medium","method":"catalog"}
{"q":"merge the pr with title \"fix-login\"","command":"gh pr merge fix-login","intent":"gh_pr_merge","missing":[],"risk":"medium","method":"catalog"}
{"q":"merge the pr from branch \"main\"","command":"gh pr merge main","intent":"gh_pr_merge","missing":[],"risk":"medium","method":"catalog"}
{"q":"merge the dependabot pr #7","command":"gh pr merge 7","intent":"gh_pr_merge","missing":[],"risk":"medium","method":"catalog"}
{"q":"merge pr 7 and pr 8","command":"gh pr merge 7","intent":"gh_pr_merge","missing":[],"risk":"medium","method":"catalog"}

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/catalog.js src/variants.js src/render.js src/shellwords.js' in /workspace/tellsh
 succeeded in 0ms:
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
/bin/bash -lc "nl -ba src/danger.js | sed -n '1,230p'" in /workspace/tellsh
 succeeded in 0ms:
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

codex
I reproduced two target-selection problems: quoted PR labels or titles become branch selectors, and custom Wrangler environment names can be truncated or dropped. Several tests also hit the read-only filesystem restriction; I’m separating those failures from code defects.

exec
/bin/bash -lc "nl -ba scripts/gen_data.js | sed -n '125,295p' && nl -ba scripts/hybrid/train_encoder.py | sed -n '1,100p'" in /workspace/tellsh
 succeeded in 0ms:
   125	  let droppedDerived = 0;
   126	  let teacherDropped = 0;
   127	  const seen = new Set();
   128	  const base = [];
   129	  for (const r0 of [...intentRows, ...shellRows, ...realRows]) {
   130	    const n = normalize(r0.text);
   131	    if (heldOut.has(r0.text)) { dropped++; continue; }
   132	    if (evalValRe.test(r0.text)) { droppedEvalValue++; continue; }
   133	    const d = decide.get(n);
   134	    if (d?.action === 'drop') { teacherDropped++; continue; }
   135	    const r = d?.action === 'relabel' && d.intent ? { ...r0, intent: d.intent } : r0;
   136	    const key = n + '|' + r.intent + '|' + (r.shell || '');
   137	    if (seen.has(key)) continue;
   138	    seen.add(key);
   139	    base.push(r);
   140	  }
   141	
   142	  const cls = createWriteStream(join(outDir, 'cls.jsonl'));
   143	  const tag = createWriteStream(join(outDir, 'tag.jsonl'));
   144	  const counts = { cls: 0, tag: 0, bySrc: {} };
   145	  let gid = 0;
   146	  // every emitted example (incl. typo / relexicalised copies and anaphora phrases) is checked against the
   147	  // held-out texts and eval-only values, not just the base rows
   148	  const emit = (text, family, intent, extras, w, g, lang, group) => {
   149	    if (leaks(text)) { droppedDerived++; return; }
   150	    const f = [...vectorize(text, DIM, extras).entries()].sort((a, b) => a[0] - b[0]).map(([k, v]) => [k, +v.toFixed(6)]);
   151	    cls.write(JSON.stringify({ y: family, i: intent || '', f, w, g, lang: lang || '', gid: group }) + '\n');
   152	    counts.cls++;
   153	    counts.bySrc[g] = (counts.bySrc[g] || 0) + 1;
   154	  };
   155	  const emitTag = (text, spans, tool, group) => {
   156	    if (leaks(text)) { droppedDerived++; return; }
   157	    const toks = tagTokens(text);
   158	    if (!toks.length) return;
   159	    const y = bioLabels(toks, spans);
   160	    tag.write(JSON.stringify({ tool, f: tagFeatures(toks, tool, TAG_DIM), y, gid: group }) + '\n');
   161	    counts.tag++;
   162	  };
   163	
   164	  // teacher-confirmed low-margin rows of confusable intents (scripts/teacher.js mine) get a second copy
   165	  const boost = new Set(readJsonl(join(ROOT, 'data', 'teacher', 'hardneg_boost.jsonl')).map((r) => normalize(r.text) + '|' + r.intent));
   166	  let nBoost = 0;
   167	
   168	  // 1. intent paraphrases (+ typo copy, + relexicalised copy), random env, some ctx noise
   169	  for (const r of base) {
   170	    const g = gid++;
   171	    const fam = FAMILY_OF[r.intent];
   172	    const env = () => (r.shell ? [`shell=${r.shell}`, `os=${r.os || 'linux'}`] : sampleEnv());
   173	    const ctx = () => (rng() < 0.25 ? randomCtx() : []);
   174	    // real-usage rows: LLM-written requests with noisy labels -> half weight, and no tagger rows (their regex silver
   175	    // spans are unreliable: long paths, backticks, command fragments)
   176	    const w = r.src === 'real' ? 0.5 : 1;
   177	    emit(r.text, fam, r.intent, [...env(), ...ctx()], w, r.src, r.lang, g);
   178	    if (boost.has(normalize(r.text) + '|' + r.intent)) { emit(r.text, fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g); nBoost++; }
   179	    emit(typo(r.text), fam, r.intent, [...env(), ...ctx()], w, r.src, r.lang, g);
   180	    if (r.src === 'real') continue;
   181	    const { spans } = silverSpans(r.text, r.intent);
   182	    emitTag(r.text, spans, fam, g);
   183	    for (let k = 0; k < 2; k++) {
   184	      const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'train' });
   185	      emitTag(rx.text, rx.spans, fam, g);
   186	      if (k === 0 && rx.text !== r.text) emit(rx.text, fam, r.intent, [...env(), ...ctx()], 0.5, r.src, r.lang, g);
   187	    }
   188	  }
   189	
   190	  // filtered training corpus for scripts/build_triggers.js (same exclusions and teacher decisions)
   191	  writeFileSync(join(outDir, 'train_rows.jsonl'), base.filter((r) => r.src !== 'real').map((r) => JSON.stringify({ text: r.text, intent: r.intent, lang: r.lang, shell: r.shell || '' })).join('\n') + '\n');
   192	
   193	  // 2. history anaphora: pronoun requests whose intent depends on ctx_ features
   194	  let nAna = 0;
   195	  for (const [, v] of Object.entries(ANAPHORA)) {
   196	    for (const [ent, intent] of Object.entries(v.map)) {
   197	      for (const lang of ['en', 'pl']) {
   198	        for (const text of v[lang]) {
   199	          const g = gid++; // the three context variants of one phrase share a calibration group
   200	          for (let k = 0; k < 3; k++) {
   201	            emit(text, FAMILY_OF[intent], intent, [...sampleEnv(), ...randomCtx(ent)], 1, 'ctx', lang, g);
   202	            if (k === 0) emitTag(text, [], FAMILY_OF[intent], g);
   203	            nAna++;
   204	          }
   205	        }
   206	      }
   207	    }
   208	  }
   209	
   210	  // 3. tldr descriptions (CC-BY-4.0): stage-1 tool labels only, capped per family/lang
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
   235	  const tagLabels = ['O', ...TAG_TYPES.flatMap((t) => [`B-${t}`, `I-${t}`])];
   236	  const meta = {
   237	    dim: DIM, tagDim: TAG_DIM, seed: SEED,
   238	    families: [...Object.keys(FAMILIES), NONE],
   239	    intentsByFamily: FAMILIES,
   240	    tagLabels,
   241	    counts: { ...counts, base: base.length, public: publicCount, real: realRows.length, realUsed: base.filter((r) => r.src === 'real').length, droppedHeldOut: dropped, droppedEvalValue, droppedDerived, teacherDropped, boosted: nBoost, anaphora: nAna, tldr: nT, ood: ood.length },
   242	  };
   243	  writeFileSync(join(outDir, 'meta.json'), JSON.stringify(meta, null, 1));
   244	  console.log(`gen_data: ${base.length} base sentences (${dropped} dropped: collide with held-out sets; ${droppedEvalValue} mention an eval-only value; ` +
   245	    `${droppedDerived} derived rows dropped), ` +
   246	    `${counts.cls} classifier rows ${JSON.stringify(counts.bySrc)}, ${counts.tag} tagger sequences, ${nT} tldr rows, ${nAna} anaphora rows`);
   247	}
   248	
   249	main();
     1	#!/usr/bin/env python3
     2	"""(B) Fine-tune the vocab-pruned multilingual-e5-small as a joint tool + intent classifier with a BIO slot-tagger head.
     3	
     4	Input:  build/hybrid/train.jsonl, build/hybrid/meta.json (node scripts/hybrid/export_data.js)
     5	        build/hybrid/e5-pruned/ (python3 scripts/hybrid/prune_vocab.py)
     6	Model:  <s> request </s></s> "bash linux" </s>  ->  mean-pooled encoder -> tool head (55) + intent head (149)
     7	                                                   per-token -> BIO head (37 labels; only request tokens are labelled)
     8	Rows with intent '' (tldr descriptions, OOD) train the tool head only; typo copies carry no spans (tag loss masked).
     9	Only split=='train' rows are used; split=='dev' is kept for threshold calibration.
    10	Resumable: a checkpoint (model + optimizer + step) is written every --ckpt-every steps and at each epoch end.
    11	
    12	Usage: python3 scripts/hybrid/train_encoder.py [--layers 6] [--epochs 2.5] [--threads 2] [--out build/hybrid/enc]
    13	"""
    14	import argparse, json, math, os, random, time
    15	import torch
    16	import torch.nn as nn
    17	from transformers import AutoModel, AutoTokenizer
    18	
    19	ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    20	
    21	
    22	class Joint(nn.Module):
    23	    def __init__(self, base, n_tool, n_intent, n_tag, layers=None):
    24	        super().__init__()
    25	        self.enc = AutoModel.from_pretrained(base) if isinstance(base, str) else base
    26	        if layers and layers < len(self.enc.encoder.layer):  # keep the bottom `layers` transformer blocks
    27	            self.enc.encoder.layer = self.enc.encoder.layer[:layers]
    28	            self.enc.config.num_hidden_layers = layers
    29	        h = self.enc.config.hidden_size
    30	        self.drop = nn.Dropout(0.1)
    31	        self.tool = nn.Linear(h, n_tool)
    32	        self.intent = nn.Linear(h, n_intent)
    33	        self.tag = nn.Linear(h, n_tag)
    34	
    35	    def forward(self, input_ids, attention_mask):
    36	        hs = self.enc(input_ids=input_ids, attention_mask=attention_mask).last_hidden_state
    37	        m = attention_mask.unsqueeze(-1).to(hs.dtype)
    38	        pooled = (hs * m).sum(1) / m.sum(1).clamp(min=1)
    39	        pooled = self.drop(pooled)
    40	        return self.tool(pooled), self.intent(pooled), self.tag(self.drop(hs))
    41	
    42	
    43	def ctx_str(r):
    44	    return f"{r.get('shell') or 'bash'} {r.get('os') or 'linux'}"
    45	
    46	
    47	def encode(tok, rows, meta, max_len=64):
    48	    tl = {t: i for i, t in enumerate(meta['tools'])}
    49	    il = {t: i for i, t in enumerate(meta['intents'])}
    50	    gl = {t: i for i, t in enumerate(meta['tagLabels'])}
    51	    enc = tok([r['text'] for r in rows], [ctx_str(r) for r in rows], truncation='only_first', max_length=max_len,
    52	              return_offsets_mapping=True)
    53	    out = []
    54	    for k, r in enumerate(rows):
    55	        ids = enc['input_ids'][k]
    56	        offs = enc['offset_mapping'][k]
    57	        seq = enc.sequence_ids(k)
    58	        tags = [-100] * len(ids)
    59	        if r.get('spans') is not None:
    60	            prev_span = None
    61	            for j, (s, e) in enumerate(offs):
    62	                if seq[j] != 0 or e <= s:
    63	                    continue
    64	                lab = 'O'
    65	                cur = None
    66	                for si, (typ, a, b) in enumerate(r['spans']):
    67	                    # XLM-R offsets may include the leading space of a word piece
    68	                    ss = s + (1 if r['text'][s:s + 1] == ' ' else 0)
    69	                    if min(e, b) - max(ss, a) > 0:
    70	                        cur = si
    71	                        lab = ('I-' if prev_span == si else 'B-') + typ
    72	                        break
    73	                tags[j] = gl[lab]
    74	                prev_span = cur
    75	        out.append({'ids': ids, 'tool': tl[r['tool']], 'intent': il.get(r['intent'], -100) if r['intent'] else -100, 'tags': tags})
    76	    return out
    77	
    78	
    79	def collate(batch, pad_id):
    80	    L = max(len(b['ids']) for b in batch)
    81	    ids = torch.full((len(batch), L), pad_id, dtype=torch.long)
    82	    att = torch.zeros((len(batch), L), dtype=torch.long)
    83	    tags = torch.full((len(batch), L), -100, dtype=torch.long)
    84	    for i, b in enumerate(batch):
    85	        n = len(b['ids'])
    86	        ids[i, :n] = torch.tensor(b['ids'])
    87	        att[i, :n] = 1
    88	        tags[i, :n] = torch.tensor(b['tags'])
    89	    return ids, att, torch.tensor([b['tool'] for b in batch]), torch.tensor([b['intent'] for b in batch]), tags
    90	
    91	
    92	def main():
    93	    ap = argparse.ArgumentParser()
    94	    ap.add_argument('--base', default=os.path.join(ROOT, 'build/hybrid/e5-pruned'))
    95	    ap.add_argument('--out', default=os.path.join(ROOT, 'build/hybrid/enc'))
    96	    ap.add_argument('--epochs', type=float, default=4)
    97	    ap.add_argument('--bs', type=int, default=32)
    98	    ap.add_argument('--lr', type=float, default=8e-5)
    99	    ap.add_argument('--threads', type=int, default=4)
   100	    ap.add_argument('--ckpt-every', type=int, default=500)

exec
/bin/bash -lc "nl -ba src/history.js | sed -n '1,180p' && rg -n 'scope|buildContext|resolveReference|wrangler|gh_pr|sameBut' src/history.js" in /workspace/tellsh
 succeeded in 0ms:
     1	// Shell-history context for reference resolution ("delete it", "to samo dla /var", "logs of that container").
     2	// Only the tail of the history file is read, kept in memory for this one request, and never logged
     3	// or written anywhere.
     4	import { openSync, readSync, fstatSync, closeSync, existsSync } from 'node:fs';
     5	import { homedir } from 'node:os';
     6	import { join } from 'node:path';
     7	import { INTENTS, BY_ID } from './catalog.js';
     8	import { FAMILY_OF } from './tools.js';
     9	import { extractSlots, foldKeepLength, isStopWord } from './slots.js';
    10	import { VARIANTS } from './variants.js';
    11	import { splitCommand, wordsOf, decodeWord, AMB, isAmbiguous, isExpansion, isGlob, rawOf, joinArgs } from './shellwords.js';
    12	import { commandWords, commandChains } from './danger.js';
    13	
    14	export { isAmbiguous };
    15	
    16	// ---------------------------------------------------------------------------------------------
    17	// reading
    18	
    19	export function historyCandidates(shell, env = process.env, os = process.platform) {
    20	  const home = env.HOME || env.USERPROFILE || homedir();
    21	  const ps = os === 'win32'
    22	    ? join(env.APPDATA || join(home, 'AppData', 'Roaming'), 'Microsoft', 'Windows', 'PowerShell', 'PSReadLine', 'ConsoleHost_history.txt')
    23	    : join(env.XDG_DATA_HOME || join(home, '.local', 'share'), 'powershell', 'PSReadLine', 'ConsoleHost_history.txt');
    24	  const fish = join(env.XDG_DATA_HOME || join(home, '.local', 'share'), 'fish', 'fish_history');
    25	  const byShell = {
    26	    zsh: [['zsh', env.HISTFILE], ['zsh', join(home, '.zsh_history')], ['zsh', join(home, '.zhistory')]],
    27	    bash: [['bash', env.HISTFILE], ['bash', join(home, '.bash_history')]],
    28	    sh: [['bash', env.HISTFILE], ['bash', join(home, '.sh_history')], ['bash', join(home, '.ash_history')], ['bash', join(home, '.bash_history')]],
    29	    fish: [['fish', fish]],
    30	    powershell: [['pwsh', ps]],
    31	    cmd: [],
    32	  };
    33	  const order = [...(byShell[shell] || []), ...byShell.bash, ...byShell.zsh];
    34	  const seen = new Set();
    35	  return order.filter(([, p]) => p && !seen.has(p) && seen.add(p));
    36	}
    37	
    38	function readTail(path, maxBytes = 32768) {
    39	  const fd = openSync(path, 'r');
    40	  try {
    41	    const size = fstatSync(fd).size;
    42	    const len = Math.min(size, maxBytes);
    43	    const buf = Buffer.alloc(len);
    44	    readSync(fd, buf, 0, len, size - len);
    45	    return { buf, partial: size > len };
    46	  } finally {
    47	    closeSync(fd);
    48	  }
    49	}
    50	
    51	// zsh "metafies" bytes >= 0x83: Meta (0x83) followed by byte ^ 0x20
    52	function unmetafy(buf) {
    53	  const out = [];
    54	  for (let i = 0; i < buf.length; i++) {
    55	    if (buf[i] === 0x83 && i + 1 < buf.length) { out.push(buf[++i] ^ 0x20); } else out.push(buf[i]);
    56	  }
    57	  return Buffer.from(out);
    58	}
    59	
    60	/** Parse raw history text into commands (oldest first). kind: bash | zsh | fish | pwsh */
    61	export function parseHistory(text, kind = 'bash', { partial = false } = {}) {
    62	  let lines = text.split(/\r?\n/);
    63	  if (partial) lines = lines.slice(1); // first line may be cut in the middle
    64	  const cmds = [];
    65	  if (kind === 'fish') {
    66	    for (const l of lines) {
    67	      const m = l.match(/^- cmd: (.*)$/);
    68	      if (m) cmds.push(m[1].replace(/\\n/g, '\n').replace(/\\\\/g, '\\'));
    69	    }
    70	    return cmds;
    71	  }
    72	  let cur = null;
    73	  for (let l of lines) {
    74	    if (kind === 'bash' && /^#\d{9,}$/.test(l)) continue; // HISTTIMEFORMAT timestamps
    75	    if (kind === 'zsh' && cur === null) l = l.replace(/^: \d+:\d+;/, ''); // extended history
    76	    const cont = kind === 'pwsh' ? /`$/.test(l) : /\\$/.test(l);
    77	    const body = cont ? l.slice(0, -1) : l;
    78	    cur = cur === null ? body : cur + '\n' + body;
    79	    if (!cont) {
    80	      if (cur.trim()) cmds.push(cur.trim());
    81	      cur = null;
    82	    }
    83	  }
    84	  return cmds;
    85	}
    86	
    87	/** Last `n` commands from the user's history file (or from `file`; default 2: the previous command and the running `tellsh` line some shells write first). Returns [] when unavailable. */
    88	export function loadHistory({ shell = 'bash', file, n = 2, env = process.env, os = process.platform } = {}) {
    89	  const cands = file ? [[/zsh/.test(file) ? 'zsh' : /fish/.test(file) ? 'fish' : /PSReadLine/i.test(file) ? 'pwsh' : 'bash', file]]
    90	    : historyCandidates(shell, env, os);
    91	  for (const [kind, path] of cands) {
    92	    try {
    93	      if (!existsSync(path)) continue;
    94	      const { buf, partial } = readTail(path);
    95	      const text = (kind === 'zsh' ? unmetafy(buf) : buf).toString('utf8');
    96	      const cmds = parseHistory(text, kind, { partial });
    97	      if (cmds.length) return Object.assign(cmds.slice(-n), { kind: kind === 'pwsh' ? 'pwsh' : 'posix', shell: kind });
    98	    } catch { /* unreadable: no context */ }
    99	  }
   100	  return [];
   101	}
   102	
   103	// ---------------------------------------------------------------------------------------------
   104	// entities from commands
   105	//
   106	// Values are decoded with a shell-aware tokenizer (src/shellwords.js): quotes, escapes (a\ b.txt),
   107	// separators inside quotes, PowerShell '' / ` escapes. A value that depends on shell state ($VAR,
   108	// $(..), unquoted globs) or a line that cannot be interpreted becomes an *ambiguous* entity: it
   109	// still shadows older values of the same type, and a reference to it is refused instead of being
   110	// resolved to a stale or guessed target.
   111	
   112	const PS_CMDLET = /^[A-Za-z]+-[A-Za-z]+$/;
   113	const lineKind = (line, kind) => (kind === 'pwsh' || PS_CMDLET.test(String(line).trim().split(/\s/)[0]) ? 'pwsh' : 'posix');
   114	const PATHLIKE = /(?:^|\s)['"]?[~.\w-]*[\\/][\w.-]|\.\w{1,5}(?:['"]?\s|['"]?$)/;
   115	const GLOB_SLOTS = new Set(['namepat', 'glob', 'pattern', 'sedexpr', 'old', 'new', 'text', 'message']);
   116	
   117	// template inversion: catalog/variant template -> regex that recovers intent + slot values from a command
   118	const BT = '`';
   119	// The alternatives must never overlap, or matching a long run of \\ or '' against a template that
   120	// does not fit backtracks exponentially: a backslash is only ever consumed by `\\.`, and a quoted
   121	// PowerShell string cannot end right before another quote (`''''` is one string, not two).
   122	const WORD_RE = {
   123	  posix: String.raw`((?:'[^']*'|"(?:\\.|[^"\\])*"|\\.|[^\s'"\\;&|<>()])+)`,
   124	  pwsh: `((?:['‘-‛](?:[^'‘-‛]|['‘-‛]{2})*['‘-‛](?!['‘-‛])|["“-„](?:${BT}.|["“-„]{2}|[^"“-„${BT}])*["“-„](?!["“-„])|${BT}.|[^\\s'"‘-„${BT};|(){}<>])+)`,
   125	};
   126	let INV = null;
   127	function inverters() {
   128	  if (INV) return INV;
   129	  INV = [];
   130	  const add = (id, tpl) => {
   131	    if (typeof tpl !== 'string') return;
   132	    const names = [];
   133	    const raws = [];
   134	    const src = { posix: '', pwsh: '' };
   135	    for (const part of tpl.split(/(«[^»]*»)/)) {
   136	      const opt = part.startsWith('«');
   137	      const body = opt ? part.slice(1, -1) : part;
   138	      const rx = { posix: '', pwsh: '' };
   139	      for (const piece of body.split(/(\{\w+(?:!raw)?\})/)) {
   140	        const m = piece.match(/^\{(\w+)(!raw)?\}$/);
   141	        for (const k of ['posix', 'pwsh']) {
   142	          if (m) rx[k] += !m[2] ? WORD_RE[k] : m[1] === 'age' ? '(-m(?:min|time) -\\d+)' : '([\\w.+=-]+)';
   143	          else rx[k] += piece.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
   144	        }
   145	        if (m) { names.push(m[1]); raws.push(!!m[2]); }
   146	      }
   147	      for (const k of ['posix', 'pwsh']) src[k] += opt ? `(?: ${rx[k]})?` : rx[k];
   148	    }
   149	    try { INV.push({ id, re: { posix: new RegExp(`^${src.posix}$`), pwsh: new RegExp(`^${src.pwsh}$`) }, names, raws }); } catch { /* skip */ }
   150	  };
   151	  for (const it of INTENTS) {
   152	    add(it.id, it.template);
   153	    add(it.id, it.darwin);
   154	    const v = VARIANTS[it.id] || {};
   155	    for (const k of ['bsd', 'gnuMac', 'busybox', 'zsh', 'fish']) add(it.id, v[k]);
   156	    if (v.pwsh) for (const t of typeof v.pwsh === 'object' ? [v.pwsh.win, v.pwsh.unix] : [v.pwsh]) add(it.id, t);
   157	  }
   158	  return INV;
   159	}
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
409: * -> { line, intent, slots, ents, at, searchDir?, ambiguous, cd?, scoped?, fromTellsh?, opaque? }  (scoped: see scopedElsewhere)
445:  let scoped = false;
447:  const exportAt = {}; // tool -> index of the segment that exported (or removed) its scope variable
484:    // `export GH_REPO=a/b; gh pr view 45`, `$env:DOCKER_HOST = …`: the later commands of the line are scoped as well
485:    // (`$env:GH_REPO="a/b"` is one word); the values earlier segments named for that tool name things of the old scope
490:    // a scope inherited from outside the line is dropped, so the values earlier segments named are of that other scope too
491:    // (later segments run in the scope tellsh runs in, so they are not marked)
495:      const tool = scopeTool(x);
503:    if (w.length && scopedElsewhere(w, raw, exportedScope)) {
504:      scoped = true;
513:      scoped = true;
565:    if (scoped || Object.keys(exportAt).length) { slots = { ...slots }; markScoped(slots); }
588:    ...(intentStale ? { intentStale: true } : {}), ...(scoped ? { scoped: true } : {}), listed,
616:// the tool an exported variable scopes, and the values that tool's commands name
617:const scopeTool = (x) => (/^GIT_/.test(x) ? 'git' : /^DOCKER_/.test(x) ? 'docker' : /^CONTAINER_/.test(x) ? 'podman' : 'gh');
620:/** The scope variables a segment removes (`unset`, `export -n`, `Remove-Item Env:…`, `SetEnvironmentVariable(…)`), as `NAME=`. */
630:function scopedElsewhere(w, raw, exported = new Set()) {
691:  let scope = null;
698:      if (PROP_CWD.test(p)) scope = 'cwd';
703:    if (CWD_WRAPPERS.has(h)) { scope = 'cwd'; continue; }
706:    if (WRAPPER_CWD[cur]?.test(x)) scope = 'cwd';
708:  return scope;
710:/** The values of a scoped command (scopedElsewhere) as ambiguous: they name things in another repository / daemon. */
936: * -> { n, line, ents: {type: value}, entOrder, refOrder, searchRoots, listedDirs, last: {intent, slots, ambiguous, skipped, scoped},
945:export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
966:  const last = a.intent ? { intent: a.intent, slots: a.slots, ambiguous: !!a.ambiguous, skipped: !!a.intentStale, scoped: !!a.scoped } : null;
1133:export function resolveReference(query, ctx) {
1147:    if (rt && ctx.last.scoped) {
1296:export function sameBut(query, ctx) {
1302:  for (const re of SAME_BUT) if (re.test(fq)) return { lastIntent: ctx.last.intent, lastSlots, blank, skipped: !!ctx.last.skipped, scoped: !!ctx.last.scoped };

exec
/bin/bash -lc "nl -ba src/history.js | sed -n '405,595p'" in /workspace/tellsh
 succeeded in 0ms:
   405	 * are files the line wrote. A `cd` makes every earlier working-directory-relative path ambiguous.
   406	 * `at` gives each entity type the index of the segment it came from (later segment = newer), and
   407	 * `searchDir` marks a `dir` entity that is only the root of a search (`find /var/log -name '*.gz'`,
   408	 * `grep -rl TODO src`): the results live inside it, so it must never be a destructive target.
   409	 * -> { line, intent, slots, ents, at, searchDir?, ambiguous, cd?, scoped?, fromTellsh?, opaque? }  (scoped: see scopedElsewhere)
   410	 */
   411	export function analyzeCommand(line, classify, kind = 'posix') {
   412	  let ents = {};
   413	  let intent = null;
   414	  let slots = {};
   415	  let ambiguous = false;
   416	  const t = line.trim();
   417	  const k = lineKind(t, kind);
   418	  if (TELLSH_LINE.test(t)) {
   419	    const qa = tellshArgs(t, k);
   420	    // a request that cannot be read back: it may have named any file or directory
   421	    if (qa === false) return { line: t, intent, slots, ents: { file: AMB + t, dir: AMB + t }, at: {}, listed: { file: 0, dir: 0 }, opaque: true, fromTellsh: true, ambiguous: true };
   422	    const q = qa?.text;
   423	    const r = q && classify ? classify(q, qa.unclear) : null;
   424	    if (r?.intent) { intent = r.intent; slots = { ...(r.slots || {}) }; entsFromSlots(intent, slots, ents); }
   425	    // `tellsh list directory /tmp/build`: like `ls /tmp/build`, the user saw the entries of the directory
   426	    const sr = isSearchRoot(intent, slots, ents);
   427	    const ld = !sr && ents.dir != null && (FAMILY_OF[intent] === 'ls' || intent === 'largest_dirs');
   428	    const listed = Object.fromEntries(listedByIntent(intent).map((x) => [x, 0]));
   429	    return { line: t, intent, slots, ents, at: {}, listed, ...(sr ? { searchDir: true } : {}), ...(ld ? { listDir: true } : {}), fromTellsh: true, ambiguous };
   430	  }
   431	  const split = splitCommand(t, k, { keepRedirects: true });
   432	  if (!split.ok) {
   433	    // cannot interpret the line (unterminated quote, heredoc, ...): it may name any file or directory,
   434	    // so older file/dir values must not be picked up by "it"
   435	    ents.file = AMB + t;
   436	    ents.dir = AMB + t;
   437	    return { line: t, intent, slots, ents, at: {}, listed: { file: 0, dir: 0 }, opaque: true, ambiguous: true };
   438	  }
   439	  const inv = invert(t, k);
   440	  let segIntent = null;
   441	  let segSlots = {};
   442	  let segIntentAt = -1;
   443	  let intentStale = false;
   444	  let cdAt = -1;
   445	  let scoped = false;
   446	  const exportedScope = new Set(); // tools (git, docker, podman, gh) an `export VAR=…` earlier in the line pointed elsewhere
   447	  const exportAt = {}; // tool -> index of the segment that exported (or removed) its scope variable
   448	  let setEnvCall = false;
   449	  let wrapCwd = false;
   450	  const subCds = new Set(); // ids of `( … )` subshells in which a cd ran (posix)
   451	  let searchDir = false;
   452	  let listDir = false;
   453	  const at = {};
   454	  const listed = {}; // entity type -> index of the newest segment that listed values of that type
   455	  // segments from..to-1 are connected by pipes only
   456	  const samePipe = (from, to) => from >= 0 && split.segments.slice(from, to).every((s) => s.sep === '|');
   457	  const firstWord = (s) => unwrap(s.words.filter((x) => !REDIR_TARGET_OP.test(x) && !REDIR_DUP_OP.test(x)))[0];
   458	  split.segments.forEach(({ words, subs }, segIdx) => {
   459	    const e = {};
   460	    const setIntent = (id, s) => { segIntent = id; segSlots = s; segIntentAt = segIdx; };
   461	    // redirections: the target is a file the command wrote (or read); it is not an argument
   462	    let w = [];
   463	    let redirTarget = null;
   464	    for (let i = 0; i < words.length; i++) {
   465	      const x = words[i];
   466	      if (REDIR_DUP_OP.test(x)) continue;
   467	      if (REDIR_TARGET_OP.test(x)) {
   468	        const target = words[i + 1];
   469	        i++;
   470	        if (target != null && !/^\/dev\/(?:null|stdout|stderr|tty)$|^(?:\$null|NUL)$/i.test(rawOf(target))) redirTarget = target;
   471	        continue;
   472	      }
   473	      w.push(x);
   474	    }
   475	    // wrappers (`sudo -u root ls`, `env ls`, `command ls`, `nice -n 5 ls`, `timeout 5 ps aux`): the command they run
   476	    const raw = w;
   477	    w = unwrap(w);
   478	    // a wrapper whose options could not be read: what ran is unknown, so it may have printed or named anything
   479	    if (!w.length || (w !== raw && /^-/.test(w[0]))) {
   480	      e.file = AMB + raw.join(' '); e.dir = AMB + raw.join(' ');
   481	      for (const x of ENT_TYPES) listed[x] = segIdx;
   482	      w = [];
   483	    }
   484	    // `export GH_REPO=a/b; gh pr view 45`, `$env:DOCKER_HOST = …`: the later commands of the line are scoped as well
   485	    // (`$env:GH_REPO="a/b"` is one word); the values earlier segments named for that tool name things of the old scope
   486	    const rw = raw.map((x) => String(rawOf(x)));
   487	    const exported = /^(?:export|declare|typeset|set)$/.test(rw[0]) ? rw.slice(1).filter((x) => SCOPE_ENV.test(x))
   488	      : /^\$env:\w+(?:=.*)?$/i.test(rw[0]) && SCOPE_ENV.test(rw[0].slice(5).replace(/=.*$/, '') + '=') ? [rw[0].slice(5)] : [];
   489	    // `unset GH_REPO`, `export -n GH_REPO`, `Remove-Item Env:GH_REPO`, `[Environment]::SetEnvironmentVariable('GH_REPO', $null)`:
   490	    // a scope inherited from outside the line is dropped, so the values earlier segments named are of that other scope too
   491	    // (later segments run in the scope tellsh runs in, so they are not marked)
   492	    const removed = unsetScopeVars(rw, setEnvCall);
   493	    setEnvCall = /SetEnvironmentVariable$/i.test(rw[rw.length - 1] ?? ''); // the call's arguments are the next segment
   494	    for (const x of [...exported, ...removed]) {
   495	      const tool = scopeTool(x);
   496	      if (exported.includes(x)) exportedScope.add(tool);
   497	      for (const t of SCOPE_ENTS[tool]) if (ents[t] != null && !isAmbiguous(ents[t])) ents[t] = AMB + rawOf(ents[t]);
   498	      exportAt[tool] = segIdx;
   499	    }
   500	    if (w.length) segmentEnts(w, e, setIntent, split, k, segIdx, firstWord);
   501	    // `git -C /repo blame notes.txt`, `docker --context prod logs web`: "delete it" / "stop it" here would hit a
   502	    // different file / container than the one the command used (never resolved, never repeated)
   503	    if (w.length && scopedElsewhere(w, raw, exportedScope)) {
   504	      scoped = true;
   505	      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x])) e[x] = AMB + rawOf(e[x]);
   506	      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; markScoped(segSlots); }
   507	    }
   508	    // `env -C /repo cat notes.txt`, `sudo -D /repo …`: relative values name files in that directory, not here;
   509	    // `chroot /srv cat /etc/x`: every value names something under the other root
   510	    const ws = w.length && w !== raw ? wrapperScope(w, raw) : null;
   511	    const subCd = k === 'posix' && !!subs?.some((id) => subCds.has(id));
   512	    if (ws === 'root') {
   513	      scoped = true;
   514	      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x])) e[x] = AMB + rawOf(e[x]);
   515	      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; markScoped(segSlots); }
   516	    } else if (ws === 'cwd' || subCd) {
   517	      // also `(cd /repo && cat notes.txt)`: the cd only lasts inside the subshell, so relative values name files
   518	      // there, while "delete it" runs here
   519	      wrapCwd = true;
   520	      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x]) && isRelativePath(e[x])) e[x] = AMB + rawOf(e[x]);
   521	      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; staleRelative({}, segSlots); }
   522	    }
   523	    // `(cd /repo && echo hi > notes.txt)`: the redirection opened notes.txt in /repo, not here (a wrapper's
   524	    // redirection, `sudo -D /repo cat a > out.txt`, is opened by the calling shell, so it stays)
   525	    if (redirTarget != null) e.file = subCd && !isAmbiguous(redirTarget) && isRelativePath(redirTarget) ? AMB + rawOf(redirTarget) : redirTarget;
   526	    const pipedIn = segIdx > 0 && split.segments[segIdx - 1].sep === '|';
   527	    if (w.length && !isAmbiguous(w[0])) for (const x of listedBySegment(w, pipedIn, k)) listed[x] = segIdx;
   528	    // every command the wrapper chain may run (also when its options are misread): a listing anywhere in it counts
   529	    if (w !== raw) for (const c of commandChains(raw, [], {})) if (c.length && !isAmbiguous(c[0])) for (const x of listedBySegment(c, pipedIn, k)) listed[x] = segIdx;
   530	    // a listing piped into anything (`ls DIR | sort | grep pdf`, `ls -S DIR | head -1`, `gci DIR | Select-Object
   531	    // -First 1`): what the user saw is a selection of the entries inside DIR, never DIR itself
   532	    const piped = split.segments[segIdx].sep.startsWith('|') && !split.segments[segIdx].sep.startsWith('||');
   533	    if (e.listDir && piped) { e.searchDir = true; delete e.listDir; }
   534	    if (e.listCwd) {
   535	      const how = piped ? 'search' : e.listCwd;
   536	      // `cd DIR && ls | grep pdf`: the listing is of DIR
   537	      if (cdAt >= 0 && at.dir === cdAt) { if (how === 'search') { searchDir = true; listDir = false; } else if (!searchDir) listDir = true; }
   538	      delete e.listCwd;
   539	    }
   540	    const head = w.length && !isAmbiguous(w[0]) ? w[0].replace(/^.*[\\/]/, '').toLowerCase() : '';
   541	    if (CD_HEADS.has(head)) {
   542	      // the working directory changes: earlier relative paths (and a relative cd target) are stale
   543	      cdAt = segIdx;
   544	      if (k === 'posix' && subs) subCds.add(subs[subs.length - 1]);
   545	      staleRelative(ents, null);
   546	      staleRepo(ents, null);
   547	      const target = w.slice(1).filter((a) => !/^-/.test(a))[0];
   548	      if (target != null && !isAmbiguous(target) && !isRelativePath(target) && target !== '-') e.dir = target;
   549	      else e.dir = AMB + (target ?? '-');
   550	      delete e.file;
   551	    }
   552	    if (e.dir !== undefined) { searchDir = !!e.searchDir; listDir = !!e.listDir; }
   553	    // `ls ~/Downloads | grep pdf`, `gci DIR | Where-Object …`: the listed directory was filtered, so what
   554	    // the user saw are entries inside it
   555	    // (any later stage of the same pipeline, not only the next one)
   556	    else if (segIdx > 0 && at.dir != null && at.dir < segIdx && samePipe(at.dir, segIdx) && FILTER_HEADS.has(head)) searchDir = true;
   557	    delete e.searchDir;
   558	    delete e.listDir;
   559	    for (const key of Object.keys(e)) at[key] = segIdx;
   560	    Object.assign(ents, e); // later segments supersede earlier ones
   561	  });
   562	  if (inv && cdAt < 0) {
   563	    // the whole line is a catalog/variant command: its slots are the most precise reading
   564	    intent = inv.intent; slots = inv.slots; ambiguous = inv.ambiguous;
   565	    if (scoped || Object.keys(exportAt).length) { slots = { ...slots }; markScoped(slots); }
   566	    if (wrapCwd) { slots = { ...slots }; staleRelative({}, slots); }
   567	    const ie = {};
   568	    entsFromSlots(intent, slots, ie);
   569	    for (const key of Object.keys(ie)) at[key] = split.segments.length;
   570	    if (ie.dir !== undefined) {
   571	      // a piped/filtered listing found above stays a search root even when the line is a catalog command
   572	      const piped = searchDir && String(ie.dir) === String(ents.dir);
   573	      searchDir = isSearchRoot(intent, slots, ie) || piped;
   574	      listDir = !searchDir && (['ls', 'find'].includes(FAMILY_OF[intent]) || intent === 'largest_dirs');
   575	    }
   576	    ents = { ...ents, ...ie };
   577	  } else if (segIntent) {
   578	    intent = segIntent; slots = { ...segSlots };
   579	    if (segIntentAt < cdAt) { staleRelative({}, slots); staleRepo({}, slots); }
   580	    // `gh pr view 45; export GH_REPO=other/repo`: the pull request is one of the old repository
   581	    for (const [tool, i] of Object.entries(exportAt)) if (segIntentAt < i) for (const t of SCOPE_ENTS[tool]) if (slots[t] != null && !isAmbiguous(slots[t])) slots[t] = AMB + rawOf(slots[t]);
   582	    // `kill 1111; ls newdir`: another command ran after the one tellsh could repeat
   583	    if (split.segments.slice(segIntentAt, -1).some((s) => s.sep !== '|')) intentStale = true;
   584	  }
   585	  if (Object.values(slots).some(isAmbiguous)) ambiguous = true;
   586	  return { line: t, intent, slots, ents, at, ambiguous, ...(searchDir && ents.dir != null ? { searchDir: true } : {}),
   587	    ...(listDir && !searchDir && ents.dir != null ? { listDir: true } : {}), ...(cdAt >= 0 ? { cd: true } : {}),
   588	    ...(intentStale ? { intentStale: true } : {}), ...(scoped ? { scoped: true } : {}), listed,
   589	    // the dir is the `cd` target (`cdFollowed`: another segment ran after the cd)
   590	    ...(cdAt >= 0 && at.dir === cdAt ? { cdDir: true, cdFollowed: cdAt < split.segments.length - 1 } : {}) };
   591	}
   592	
   593	// Listings: commands that print many values of an entity type (`ls`, `find`, `ps aux`, `docker ps`, `git branch`).
   594	// After one, "it"/"them" may mean any of the printed values, so an older value of that type is not a safe
   595	// target for a changing command.

exec
/bin/bash -lc "nl -ba scripts/real/prepare_real.js | sed -n '1,185p' && nl -ba scripts/real/real_rows.js" in /workspace/tellsh
 succeeded in 0ms:
     1	#!/usr/bin/env node
     2	// Real-usage data (PRIVATE, never committed): turn the real-command dataset into labelled request rows and a
     3	// train / eval split held out by COMMAND GROUP. Writes only under build/real/ (gitignored):
     4	//   build/real/rows.jsonl   {text, intent|null, lang, shell, os, group, split: train|eval, cmd, literal, src}
     5	//   build/real/stats.json   aggregate counts only (safe to quote in docs)
     6	//
     7	// Input: $TELLSH_REAL_DATA or /workspace/tellsh-data/dataset.jsonl; one row per unique (redacted) command with
     8	// 3 EN + 3 PL LLM-written request descriptions. Only `generic` + `verified` rows are used; the `tool` field is
     9	// ignored (noisy). Labels:
    10	//   1. the command matches one of the v0.4 developer-tool patterns below (deterministic, checked on the command)
    11	//   2. else the dataset's `intent_or_null`, when it is a catalog intent
    12	//   3. else null: a real shell task outside the catalog ("out-of-catalog"; eval only: should be rejected/composed)
    13	// Command group: head + subcommands + sorted flags + number of operands, with every value masked, so
    14	// `gh pr view 12 --repo a/b` and `gh pr view 40 --repo c/d` are one group. Per label, whole groups go to eval
    15	// until >= 25% of that label's commands are held out (labels with one group stay in train).
    16	//
    17	// `--group v04` (default) reproduces the split the shipped model was trained on; its skeleton keeps up to two lower-case
    18	// words after the head, so operands leak into it (`npm install express` / `npm install react` are two groups). On that
    19	// split 552 of the 2957 labelled eval rows share a --group structural skeleton (per-tool subcommand depth, operands
    20	// masked) with a train row; A scores 84.6% on them vs 83.5% on the rest (scripts/real/group_leak.js,
    21	// HYBRID.md#v04-real-usage). The next retrain should use `--group structural`.
    22	//
    23	// Usage: node scripts/real/prepare_real.js [--data <dataset.jsonl>] [--eval-frac 0.25] [--group v04|structural]
    24	import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
    25	import { createHash } from 'node:crypto';
    26	import { fileURLToPath } from 'node:url';
    27	import { join } from 'node:path';
    28	import { BY_ID } from '../../src/catalog.js';
    29	import { strip, group } from './group.js';
    30	
    31	const ROOT = fileURLToPath(new URL('../..', import.meta.url));
    32	const args = process.argv.slice(2);
    33	const arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
    34	const SRC = arg('--data', process.env.TELLSH_REAL_DATA || '/workspace/tellsh-data/dataset.jsonl');
    35	const EVAL_FRAC = +arg('--eval-frac', 0.25);
    36	const GROUP = arg('--group', 'v04');
    37	if (!existsSync(SRC)) { console.error(`prepare_real: no dataset at ${SRC}`); process.exit(1); }
    38	
    39	// v0.4 intents: label = the command itself (sudo / npx / env prefixes stripped)
    40	const NEW = [
    41	  ['wrangler_deploy', /^wrangler (deploy|publish)\b/],
    42	  ['wrangler_dev', /^wrangler dev\b/],
    43	  ['wrangler_tail', /^wrangler tail\b(?!.*--help)/],
    44	  ['wrangler_secret_put', /^wrangler secret put\b/],
    45	  ['wrangler_login', /^wrangler login\b/],
    46	  ['wrangler_whoami', /^wrangler whoami\b/],
    47	  ['gh_auth_status', /^gh auth status\b/],
    48	  ['gh_auth_login', /^gh auth login\b/],
    49	  ['gh_pr_list', /^gh pr list\b/],
    50	  ['gh_pr_view', /^gh pr view\b/],
    51	  ['gh_pr_create', /^gh pr create\b/],
    52	  ['gh_pr_checks', /^gh pr checks\b/],
    53	  ['gh_pr_merge', /^gh pr merge\b/],
    54	  ['gh_run_list', /^gh run list\b/],
    55	  ['gh_run_view', /^gh run view\b/],
    56	  ['npm_install_global', /^npm (i|install)\b.*\s(-g|--global)\b/],
    57	  ['npm_install', /^npm (i|install|ci)\b(?!.*\s(-g|--global)\b)/],
    58	  ['npm_run_script', /^npm(?: --prefix \S+)? (?:run(?:-script)? [\w:.-]+|test|start|t)(?:\s|$)/],
    59	  ['pip_install', /^(?:pip3?|python3?(?:\.\d+)? -m pip) install\b(?!.*\s-(?:r|e)\b)/],
    60	  ['activate_venv', /^(?:source|\.) \S*\/bin\/activate(?:\.fish)?\s*$|\\Scripts\\activate(?:\.bat|\.ps1)?\s*$/i],
    61	  ['ssh_port_forward', /^ssh\b.*\s-\w*L\s?\d+:/],
    62	  ['print_line_range', /^(?:nl -ba \S+ \| )?sed -n ['"]?\d+,\d+p['"]?(?: \S+)?$/],
    63	  ['tool_version', /^[\w.-]+ (?:--version|-v|-V|version)$/],
    64	  ['cli_help', /^[\w.-]+(?: [a-z][\w-]*){0,2} (?:--help|-h|help)$/],
    65	];
    66	const COMPOUND = /^(sleep|cd|for|while|if|echo|printf|bash|sh|zsh|pwd|export|time|timeout|-n|until|then|do)$/;
    67	function newIntentOf(cmd) {
    68	  const c = strip(cmd);
    69	  for (const [id, re] of NEW) if (re.test(c)) return id;
    70	  return null;
    71	}
    72	
    73	// redaction placeholders -> plausible values (same value in the command and its descriptions)
    74	const USERS = ['alex', 'kasia', 'dev', 'mike', 'ola', 'jan', 'sam', 'deploy'];
    75	const h = (s) => createHash('sha256').update(s).digest();
    76	function fill(s, seed) {
    77	  return s.replace(/<USER>/g, USERS[seed[0] % USERS.length]).replace(/<EMAIL>/g, 'someone@example.com')
    78	    .replace(/<HEX>/g, seed.toString('hex').slice(0, 12)).replace(/<(PASSWORD|SECRET)>/g, 'xxxxxx');
    79	}
    80	
    81	const rows = readFileSync(SRC, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
    82	const st = { commands: 0, skippedNotGeneric: 0, skippedUnverified: 0, byLabelSource: { pattern: 0, dataset: 0, outOfCatalog: 0 }, relabelled: 0, droppedCompound: 0 };
    83	const cmds = [];
    84	for (const r of rows) {
    85	  if (!r.generic) { st.skippedNotGeneric++; continue; }
    86	  if (!r.verified || !r.descriptions_en?.length) { st.skippedUnverified++; continue; }
    87	  const seed = h(r.cmd_redacted);
    88	  const cmd = fill(r.cmd_redacted, seed);
    89	  let intent = newIntentOf(cmd);
    90	  if (intent) { st.byLabelSource.pattern++; if (r.intent_or_null && r.intent_or_null !== intent) st.relabelled++; }
    91	  else if (r.intent_or_null && BY_ID[r.intent_or_null]) {
    92	    // `sleep 30; cp …`, `cd x && cat …`, `for …`: a compound command is not one catalog intent (dataset label dropped)
    93	    const head = strip(cmd).split(/[\s;]+/)[0];
    94	    if (COMPOUND.test(head) && !(head === 'echo' && ['env_var_get', 'show_path'].includes(r.intent_or_null))) { st.droppedCompound++; continue; }
    95	    intent = r.intent_or_null; st.byLabelSource.dataset++;
    96	  }
    97	  else { intent = null; st.byLabelSource.outOfCatalog++; }
    98	  const shell = r.shell === 'powershell' ? 'powershell' : r.shell || 'bash';
    99	  const os = r.os === 'windows' ? 'win32' : r.os || 'linux';
   100	  cmds.push({ cmd, intent, shell, os, group: group(cmd, GROUP), seed, src: r.source_type,
   101	    texts: [...r.descriptions_en.map((t) => [t, 'en']), ...r.descriptions_pl.map((t) => [t, 'pl'])] });
   102	  st.commands++;
   103	}
   104	
   105	// group-wise split, per label (null = out-of-catalog counts as one label)
   106	const byLabel = new Map();
   107	for (const c of cmds) {
   108	  const k = c.intent || '__ooc__';
   109	  if (!byLabel.has(k)) byLabel.set(k, new Map());
   110	  const g = byLabel.get(k);
   111	  g.set(c.group, (g.get(c.group) || 0) + 1);
   112	}
   113	const evalGroups = new Set();
   114	for (const [label, groups] of byLabel) {
   115	  if (groups.size < 2) continue;
   116	  const total = [...groups.values()].reduce((a, b) => a + b, 0);
   117	  const order = [...groups.keys()].sort((a, b) => h(label + a).compare(h(label + b)));
   118	  let n = 0;
   119	  for (const g of order) {
   120	    if (n >= EVAL_FRAC * total) break;
   121	    if (n + groups.get(g) > 0.5 * total) continue; // never hold out more than half of a label
   122	    evalGroups.add(label + '\u0000' + g);
   123	    n += groups.get(g);
   124	  }
   125	}
   126	
   127	const out = [];
   128	const norm = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
   129	for (const c of cmds) {
   130	  const split = evalGroups.has((c.intent || '__ooc__') + '\u0000' + c.group) ? 'eval' : 'train';
   131	  for (const [t, lang] of c.texts) {
   132	    if (!t || t.length > 300) continue;
   133	    const text = fill(t, c.seed);
   134	    out.push({ text, intent: c.intent, lang, shell: c.shell, os: c.os, group: c.group, split, cmd: c.cmd,
   135	      literal: norm(text) === norm(c.cmd), src: c.src });
   136	  }
   137	}
   138	// a text that occurs in both splits (short generic descriptions) is held out: dropped from train
   139	const evalTexts = new Set(out.filter((r) => r.split === 'eval').map((r) => norm(r.text)));
   140	const final = out.filter((r) => r.split === 'eval' || !evalTexts.has(norm(r.text)));
   141	st.droppedTrainTextInEval = out.length - final.length;
   142	
   143	const cnt = (f) => final.filter(f).length;
   144	Object.assign(st, {
   145	  rows: final.length,
   146	  train: { rows: cnt((r) => r.split === 'train' && r.intent), oocRows: cnt((r) => r.split === 'train' && !r.intent) },
   147	  eval: { rows: cnt((r) => r.split === 'eval' && r.intent), oocRows: cnt((r) => r.split === 'eval' && !r.intent),
   148	    en: cnt((r) => r.split === 'eval' && r.intent && r.lang === 'en'), pl: cnt((r) => r.split === 'eval' && r.intent && r.lang === 'pl'),
   149	    literal: cnt((r) => r.split === 'eval' && r.intent && r.literal),
   150	    newIntents: cnt((r) => r.split === 'eval' && r.intent && NEW.some(([id]) => id === r.intent)),
   151	    byShell: Object.fromEntries(['bash', 'zsh', 'powershell'].map((s) => [s, cnt((r) => r.split === 'eval' && r.intent && r.shell === s)])) },
   152	  labels: { train: new Set(final.filter((r) => r.split === 'train' && r.intent).map((r) => r.intent)).size,
   153	    eval: new Set(final.filter((r) => r.split === 'eval' && r.intent).map((r) => r.intent)).size },
   154	  groups: { total: new Set(cmds.map((c) => c.group)).size, eval: evalGroups.size },
   155	  perNewIntent: Object.fromEntries(NEW.map(([id]) => [id, { train: cnt((r) => r.intent === id && r.split === 'train'), eval: cnt((r) => r.intent === id && r.split === 'eval') }])),
   156	});
   157	mkdirSync(join(ROOT, 'build', 'real'), { recursive: true });
   158	writeFileSync(join(ROOT, 'build', 'real', 'rows.jsonl'), final.map((r) => JSON.stringify(r)).join('\n') + '\n');
   159	writeFileSync(join(ROOT, 'build', 'real', 'stats.json'), JSON.stringify(st, null, 1));
   160	console.log(JSON.stringify({ commands: st.commands, rows: st.rows, train: st.train, eval: st.eval, labels: st.labels, groups: st.groups }));
     1	// Shared loader for the private real-usage rows (build/real/rows.jsonl from scripts/real/prepare_real.js).
     2	// gen_data.js (A) and hybrid/export_data.js (B) take the SAME capped training subset; every eval-split text is
     3	// held out from both. Missing file (no private data) -> no rows.
     4	import { readFileSync, existsSync } from 'node:fs';
     5	import { join } from 'node:path';
     6	import { fnv1a } from '../../src/features.js';
     7	
     8	// at most CAP rows per intent and language (sed -n line ranges alone are ~2500 rows), chosen by a text hash
     9	export const CAP = 120;
    10	
    11	export function readReal(root) {
    12	  const p = join(root, 'build', 'real', 'rows.jsonl');
    13	  return existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)) : [];
    14	}
    15	
    16	export const realEvalTexts = (rows) => rows.filter((r) => r.split === 'eval').map((r) => r.text);
    17	
    18	/** Labelled train-split rows, capped -> [{text, intent, lang, shell, os, src: 'real'}] */
    19	export function realTrain(rows, ids, cap = CAP) {
    20	  const n = {};
    21	  return rows.filter((r) => r.split === 'train' && r.intent && ids.has(r.intent))
    22	    .map((r) => ({ r, k: fnv1a('real:' + r.text) })).sort((a, b) => a.k - b.k).map(({ r }) => r)
    23	    .filter((r) => (n[r.intent + r.lang] = (n[r.intent + r.lang] || 0) + 1) <= cap)
    24	    .map((r) => ({ text: r.text, intent: r.intent, lang: r.lang, shell: r.shell, os: r.os, src: 'real' }));
    25	}

exec
/bin/bash -lc "cat test/templates.test.js && nl -ba src/cli.js | sed -n '185,290p' && nl -ba src/danger.js | sed -n '530,655p'" in /workspace/tellsh
 succeeded in 0ms:
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
   185	    console.log(JSON.stringify(s, null, 2));
   186	    return s.understood ? 0 : 3;
   187	  }
   188	  if (!s.understood && s.context?.rule === 'refused') {
   189	    // a history reference that cannot be resolved safely: nothing to suggest
   190	    console.log(`Cannot resolve "${query}" from history: ${s.hint || s.context.note || 'not guessing'}.`);
   191	    console.log(C.dim('Name the target explicitly.'));
   192	    return 3;
   193	  }
   194	  if (!s.understood) {
   195	    console.log(`I don't understand "${query}" (confidence ${(s.confidence * 100).toFixed(0)}% < ${(s.threshold * 100).toFixed(0)}%).`);
   196	    console.log('Did you mean:');
   197	    for (const c of s.candidates) console.log(`  - ${c.intent}: ${c.description} ${C.dim(`(${(c.p * 100).toFixed(1)}%)`)}`);
   198	    if (s.hint) console.log(C.dim(`hint: ${s.hint}`));
   199	    console.log(C.dim('Try rephrasing, or use --threshold to lower the bar.'));
   200	    return 3;
   201	  }
   202	  if (s.gap) {
   203	    console.log(`No ${s.shell} rendering for "${s.intent}" on ${s.os}: ${s.gap}.`);
   204	    console.log(C.dim(`Try --shell bash (or another shell) to see the command.`));
   205	    return 5;
   206	  }
   207	
   208	  printSuggestion(s, opts);
   209	  if (opts.dryRun) return 0;
   210	
   211	  const interactive = process.stdin.isTTY && process.stdout.isTTY;
   212	  const shellName = s.shell;
   213	  if (opts.yes) {
   214	    const fromHistory = Object.values(s.slotSources || {}).includes('history');
   215	    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog' || fromHistory || s.hybrid?.deferred) {
   216	      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' || fromHistory ? 'resolved from history' : s.missing.length ? 'incomplete' : s.hybrid?.deferred ? 're-ranked by the neural fallback' : s.risk;
   217	      console.log(C.yellow(`  --yes only auto-runs safe catalog commands; this one is ${why}. Not running.`));
   218	      return 4;
   219	    }
   220	    return runShell(s.command, shellName);
   221	  }
   222	  if (!interactive) return 0; // print-only when piped
   223	
   224	  let command = s.command;
   225	  let risk = s.risk;
   226	  let critical = s.critical;
   227	  let incomplete = s.missing.length > 0;
   228	  const strict = () => risk === 'high' || s.method === 'composed';
   229	  for (;;) {
   230	    const rl = createInterface({ input: process.stdin, output: process.stdout });
   231	    const prompt = strict()
   232	      ? `${risk === 'high' ? C.red('High risk.') : C.yellow('Experimental.')} Type "yes" to run, e to edit, anything else aborts: `
   233	      : incomplete ? 'e edit · n abort: ' : '[Enter] run · e edit · n abort: ';
   234	    const ans = (await ask(rl, prompt)).trim().toLowerCase();
   235	    rl.close();
   236	    if (ans === 'e' || ans === 'edit') {
   237	      command = (await editLine(command)).trim();
   238	      if (!command) return 130;
   239	      const d = checkDanger(command, s.baseRisk);
   240	      risk = maxRisk(s.baseRisk, d.risk);
   241	      critical = d.critical;
   242	      incomplete = /<[A-Z_]+>/.test(command);
   243	      process.stdout.write(C.dim('  risk: ') + riskColor(risk)(risk) + '\n');
   244	      for (const w of d.warnings) process.stdout.write(riskColor(risk)(`  ! ${w}`) + '\n');
   245	      continue;
   246	    }
   247	    if (incomplete) { if (ans === '' ) continue; return 130; }
   248	    const go = strict() ? ans === 'yes' || ans === 'tak' : ans === '' || ans === 'y' || ans === 'yes' || ans === 't' || ans === 'tak';
   249	    if (!go) { console.log('aborted'); return 130; }
   250	    if (critical) {
   251	      const rl2 = createInterface({ input: process.stdin, output: process.stdout });
   252	      const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
   253	      rl2.close();
   254	      if (a2 !== command) { console.log('aborted'); return 130; }
   255	    }
   256	    return runShell(command, shellName);
   257	  }
   258	}
   530	  a.forEach((x, i) => {
   531	    if (x === '-C' || x === '--directory') dirs.push(a[i + 1] ?? '');
   532	    else if (/^-C./.test(x)) dirs.push(x.slice(2));
   533	    else if (/^--directory=/.test(x)) dirs.push(x.slice(12));
   534	  });
   535	  if (dirs.some(critTarget)) hit('high', 'extracts an archive over /, ~ or a drive root', true);
   536	}
   537	
   538	// docker run -v /:/host …: the container gets the host's whole filesystem (read-write unless :ro)
   539	function dockerCheck(w, hit) {
   540	  const a = w.slice(1);
   541	  if (!a.includes('run') && !a.includes('create')) return;
   542	  const vols = [];
   543	  a.forEach((x, i) => {
   544	    if (x === '-v' || x === '--volume' || x === '--mount') vols.push(a[i + 1] || '');
   545	    else if (/^(?:-v=?|--volume=|--mount=)/.test(x)) vols.push(x.replace(/^(?:-v=?|--volume=|--mount=)/, ''));
   546	    else if (/^-[a-zA-Z]*v$/.test(x)) vols.push(a[i + 1] || ''); // -itv /:/h
   547	  });
   548	  for (const v of vols) {
   549	    const host = v.split(':')[0];
   550	    const src = (v.match(/(?:^|,)(?:source|src)=([^,]*)/) || [])[1];
   551	    const root = (v.includes(':') && normTarget(host) === '/') || (src != null && normTarget(src) === '/');
   552	    if (root) hit('high', 'mounts the host root filesystem into a container', !/:ro(?:,|$)|(?:^|,)(?:readonly|ro)(?:=true|=1)?(?:,|$)/.test(v));
   553	  }
   554	}
   555	
   556	// [regex, risk, message, critical]
   557	const RULES = [
   558	  [/\bmkfs(?:\.\w+)?\b|\bmke2fs\b|\bwipefs\b/, 'high', 'formats a filesystem', true],
   559	  [/\bdd\b[^|;&]*\bof=\/dev\//, 'high', 'dd writing to a raw device', true],
   560	  [/>\s*\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk)\w*/, 'high', 'redirect onto a raw disk device', true],
   561	  [/\b(?:chmod|chown|chgrp)\s+(?:\S+\s+)*(?:-[a-zA-Z]*R[a-zA-Z]*|--recursive)\s+(?:\S+\s+)*['"]?\/['"]?(?:\s|$|\*)/, 'high', 'recursive permission/owner change on /', true],
   562	  [/\bchmod\s+(?:-\S+\s+)*0?777\b/, 'medium', 'chmod 777 makes files world-writable'],
   563	  [/:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:/, 'high', 'fork bomb', true],
   564	  [/\b(?:curl|wget|fetch)\b[^|;]*\|\s*(?:sudo\s+)?(?:\S*\/)?(?:ba|z|da|k|fi)?sh\b/, 'high', 'pipes a download straight into a shell'],
   565	  [/(?:\b(?:ba|z|da|k|fi)?sh\b|\bsource\b|\beval\b|(?:^|[;&|(]\s*)\.)\s[^|;&]*(?:<\(|\$\(|`)\s*(?:sudo\s+)?(?:curl|wget|fetch)\b/, 'high', 'runs a downloaded script'],
   566	  [/\bsudo\b|\bdoas\b/, 'medium', 'runs with root privileges'],
   567	  // text piped into a shell runs as a script whose content is not known here
   568	  [/\|\s*(?:(?:sudo|doas)\s+(?:-\S+\s+)*)?(?:\S*\/)?(?:ba|z|da|k|fi|c|tc|a|mk)?sh\b(?!\s+-[a-zA-Z]*c\b)(?![\w.-])/, 'high', 'runs piped text as a shell script'],
   569	  [/\|\s*(?:iex|Invoke-Expression)\b/i, 'high', 'runs piped text as a PowerShell script'],
   570	  [/\bfind\b.*\s-delete\b|\bfind\b.*-exec(?:dir)?\s+(?:\S*\/)?rm\b|\bxargs\s+(?:-\S+\s+)*(?:\S*\/)?rm\b/, 'high', 'bulk deletion via find/xargs'],
   571	  [/\bgit\s+push\b[^;&|]*\s(?:--force(?:-with-lease|-if-includes)?\b|-[a-zA-Z]*f\b|\+[^\s:]*(?::\S*)?|--mirror\b)/, 'high', 'force-push rewrites remote history'],
   572	  [/\bgit\s+push\b[^;&|]*\s(?:--delete\b|-d\b|:\S)/, 'high', 'deletes a remote branch'],
   573	  [/\bgit\s+reset\b[^;&|]*\s--(?:hard|merge|keep)\b|\bgit\s+clean\b[^;&|]*\s(?:-[a-zA-Z]*f|--force\b)|\bgit\s+restore\b|\bgit\s+checkout\b[^;&|]*\s(?:--\s|-f\b|--force\b|\.(?:\s|$))|\bgit\s+switch\b[^;&|]*\s(?:-f\b|--force\b|--discard-changes\b)/, 'high', 'discards uncommitted work'],
   574	  [/\bgit\s+branch\b[^;&|]*\s(?:-D\b|-[a-zA-Z]*d[a-zA-Z]*f|--delete\s+--force|--force\s+--delete)/, 'high', 'force-deletes a branch'],
   575	  [/\bgit\s+stash\s+(?:drop|clear)\b/, 'high', 'deletes stashed changes'],
   576	  [/\bdocker\s+(?:system|volume|image|container|network|builder)\s+prune\b|\bdocker\s+(?:rmi?|container\s+rm|image\s+rm|volume\s+rm)\b/, 'high', 'deletes docker data'],
   577	  [/\b(?:shutdown|reboot|halt|poweroff)\b|\binit\s+[06]\b/, 'high', 'shuts down / reboots the machine'],
   578	  [/\b(?:pkill|killall)\b|\bdocker\s+kill\b/, 'high', 'terminates processes'],
   579	  [/\b(?:shred|wipe|blkdiscard|truncate)\b[^|;&]*\s['"]?\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk|md|dm-|mapper\/|loop)\w*/, 'high', 'destroys a whole disk device', true],
   580	  [/\b(?:shred|truncate)\b[^|;&]*\s['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'destroys the contents of a system file', true],
   581	  [/\b(?:shred|truncate)\b/, 'high', 'destroys file contents'],
   582	  [/\biptables\s+-F\b|\bufw\s+disable\b/, 'high', 'drops firewall rules'],
   583	  [/\bmv\s+\S+\s+\/dev\/null\b/, 'high', 'moves a file into /dev/null (deletes it)', true],
   584	  // redirections: N>, N>>, &>, >|, >> onto system files; any other file write is medium
   585	  [/(?:^|[^>])(?:\d*|&)>(?!>)\|?\s*['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'overwrites a system file', true],
   586	  [/(?:\d*|&)>>\|?\s*['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'appends to a system file'],
   587	  // text piped into an interpreter with no script runs it as code (`curl … | python3`, `cat x | perl -`)
   588	  [/\|\s*(?:(?:sudo|doas)\s+(?:-\S+\s+)*)?(?:\S*\/)?(?:python[\d.]*|perl[\d.]*|ruby|node|php[\d.]*)(?:\s+-)?\s*(?:$|[;&|)])/, 'high', 'runs piped text as a script'],
   589	  [/(?:^|[^<>=-])(?:\d+|&)?>>?\|?(?!&|>)\s*(?!['"]?\/dev\/(?:null|stdout|stderr)\b)['"]?[^\s&|;)]/, 'medium', 'redirect writes to a file'],
   590	  [/\btee\b/, 'medium', 'tee writes to a file'],
   591	  [/\bsed\s+(?:-\S+\s+)*(?:-i|--in-place)\b/, 'medium', 'edits files in place'],
   592	  [/\bcrontab\s+-r\b/, 'high', 'removes all cron jobs', true],
   593	  // PowerShell
   594	  [/\bRemove-Item\b|\bClear-Content\b/i, 'high', 'deletes files permanently'],
   595	  [/\bStop-Process\b|\bspps\b|\btaskkill\b/i, 'high', 'terminates processes'],
   596	  [/\bFormat-Volume\b|\bClear-Disk\b|\bInitialize-Disk\b|(?:^|[;&|(]\s*)format\s+[a-z]:/i, 'high', 'formats a disk', true],
   597	  [/\b(?:Stop|Restart)-Computer\b|\bshutdown(?:\.exe)?\s+\/[srp]\b/i, 'high', 'shuts down / reboots the machine'],
   598	  [/\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|curl|wget)\b[^|;]*\|\s*(?:iex|Invoke-Expression)\b/i, 'high', 'pipes a download straight into PowerShell'],
   599	  [/\b(?:iex|Invoke-Expression)\b[^|;]*\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|curl|wget|DownloadString|DownloadData|Net\.WebClient)\b|\[scriptblock\]::Create\([^;]*\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|DownloadString)\b/i, 'high', 'runs a downloaded script'],
   600	  [/\bSet-ExecutionPolicy\b|\bStart-Process\b.*-Verb\s+RunAs/i, 'medium', 'changes security policy / elevates'],
   601	  [/\b(?:Stop|Restart|Start|Set)-Service\b/i, 'medium', 'changes a service'],
   602	  [/\b(?:Set-Content|Out-File|Add-Content|Rename-Item|Move-Item|Copy-Item|New-Item|Set-Acl|Compress-Archive|Expand-Archive)\b/i, 'medium', 'modifies files'],
   603	  [/\bdocker\s+stop\b/, 'medium', 'stops containers'],
   604	];
   605	
   606	// `git -C dir -c k=v --no-pager reset` -> `git reset`; `docker --context x -H h rm` -> `docker rm`
   607	const OPTVAL = String.raw`(?:'[^']*'|"[^"]*"|[^\s;&|'"])+`;
   608	const GIT_GLOBALS = new RegExp(String.raw`\bgit((?:\s+(?:(?:-C|-c|--git-dir|--work-tree|--namespace|--super-prefix|--config-env|--exec-path)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
   609	const DOCKER_GLOBALS = new RegExp(String.raw`\bdocker((?:\s+(?:(?:-H|--host|-c|--context|--config|-l|--log-level|--tls\w*)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
   610	export function normalizeGlobals(command) {
   611	  return String(command).replace(GIT_GLOBALS, 'git').replace(DOCKER_GLOBALS, 'docker');
   612	}
   613	
   614	/** @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}} */
   615	export function checkDanger(command, baseRisk = 'safe', { lenient = false } = {}) {
   616	  let risk = baseRisk;
   617	  const warnings = [];
   618	  let critical = false;
   619	  const hit = (r, msg, crit) => {
   620	    risk = maxRisk(risk, r);
   621	    if (!warnings.includes(msg)) warnings.push(msg);
   622	    if (crit) critical = true;
   623	  };
   624	  const text = normalizeGlobals(command);
   625	  const inner = [];
   626	  const flags = {};
   627	  // structural checks run on both readings of backslashes (POSIX escapes / Windows path separators)
   628	  for (const words of [...simpleCommands(text), ...simpleCommands(text, { winPaths: true })]) {
   629	   for (const w of commandChains(words, inner, flags)) {
   630	    const head = w[0].replace(/^.*[\\/]/, '');
   631	    const lower = head.toLowerCase().replace(/\.exe$/, '');
   632	    // a lone string with spaces is a command handed to another program ('…' | bash)
   633	    if (w.length === 1 && /\s/.test(w[0])) inner.push(w[0]);
   634	    // the program itself depends on the shell state (`$CMD -rf /`, `$(which rm) -rf /`, `& $tool`): unknown
   635	    if (!lenient && /^[$`]/.test(head)) hit('high', 'runs a command whose name depends on the shell state; it cannot be checked');
   636	    if (head === 'rm' || head === 'unlink') rmCheck(w, hit);
   637	    else if (head === 'kill') killCheck(w, hit);
   638	    else if (/^(?:rd|rmdir|del|erase)$/i.test(head)) {
   639	      const a = w.slice(1);
   640	      if (!a.some((x) => /^\/[a-z]$/i.test(x)) && a.some((x) => /^-\w/.test(x))) removeItemCheck(w, hit);
   641	      else cmdDelCheck(w, hit);
   642	    } else if (PS_REMOVE.test(lower)) removeItemCheck(w, hit);
   643	    else if (head === 'find') findCheck(w, hit);
   644	    else if (head === 'rsync') rsyncCheck(w, hit);
   645	    else if (['cp', 'mv', 'install', 'ln'].includes(head)) copyCheck(w, hit);
   646	    else if (['chmod', 'chown', 'chgrp'].includes(head)) permCheck(w, hit);
   647	    else if (head === 'tar' || head === 'bsdtar' || head === 'gtar') tarCheck(w, hit);
   648	    else if (head === 'docker' || head === 'podman') dockerCheck(w, hit);
   649	    if (['tee', 'cp', 'install', 'sponge', 'pv', 'mv', 'ln'].includes(lower)) rawDiskWriteCheck(w, hit);
   650	    interpCheck(w, hit);
   651	    stdinCodeCheck(w, hit, inner);
   652	    if (head === 'git' && w[1] === 'rm') hit('high', 'rm deletes files permanently (no trash)');
   653	    sysFileWriteCheck(w, head, hit);
   654	   }
   655	  }

exec
/bin/bash -lc "nl -ba scripts/hybrid/prune_vocab.py | sed -n '1,150p' && nl -ba scripts/hybrid/export_encoder.py | sed -n '1,140p'" in /workspace/tellsh
 succeeded in 0ms:
     1	#!/usr/bin/env python3
     2	"""Prune the 250k-piece XLM-R SentencePiece (Unigram) vocabulary of multilingual-e5-small to the pieces PL+EN text needs.
     3	
     4	Kept pieces = specials + every piece produced when tokenising
     5	  * all tellsh training/eval texts (build/hybrid/train.jsonl, data/**.jsonl text fields, tldr descriptions),
     6	  * the 80k most frequent English and Polish words (wordfreq), lower-case, Capitalised and (PL) with diacritics folded,
     7	  * every single printable ASCII / Polish character (fallback so any input still segments without <unk>).
     8	The pruned model segments any text with the remaining pieces via the same Unigram Viterbi (scores unchanged), and the
     9	embedding matrix is sliced to the kept ids.  Writes build/hybrid/e5-pruned/ (HF model dir) + vocab report.
    10	
    11	Usage: python3 scripts/hybrid/prune_vocab.py [--base intfloat/multilingual-e5-small] [--words 80000]
    12	"""
    13	import argparse, glob, json, os, sys, unicodedata
    14	import torch
    15	from transformers import AutoTokenizer, AutoModel, PreTrainedTokenizerFast
    16	
    17	ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    18	
    19	
    20	def fold(s):
    21	    s = s.replace('ł', 'l').replace('Ł', 'L')
    22	    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')
    23	
    24	
    25	def corpus_texts():
    26	    texts = []
    27	    for l in open(os.path.join(ROOT, 'build/hybrid/train.jsonl'), encoding='utf-8'):
    28	        texts.append(json.loads(l)['text'])
    29	    for f in glob.glob(os.path.join(ROOT, 'data/**/*.jsonl'), recursive=True):
    30	        if '/hybrid/blind/' in f:
    31	            continue  # blind eval: never used for any modelling decision
    32	        for l in open(f, encoding='utf-8'):
    33	            l = l.strip()
    34	            if not l:
    35	                continue
    36	            r = json.loads(l)
    37	            for k in ('text', 'query'):
    38	                if isinstance(r.get(k), str):
    39	                    texts.append(r[k])
    40	            for h in r.get('history', []) or []:
    41	                texts.append(h)
    42	    return texts
    43	
    44	
    45	def main():
    46	    ap = argparse.ArgumentParser()
    47	    ap.add_argument('--base', default='intfloat/multilingual-e5-small')
    48	    ap.add_argument('--words', type=int, default=80000)
    49	    ap.add_argument('--out', default=os.path.join(ROOT, 'build/hybrid/e5-pruned'))
    50	    a = ap.parse_args()
    51	    from wordfreq import top_n_list
    52	    tok = AutoTokenizer.from_pretrained(a.base)
    53	    fast = tok.backend_tokenizer if hasattr(tok, 'backend_tokenizer') else tok._tokenizer
    54	    spec = json.loads(fast.to_str())
    55	    vocab = spec['model']['vocab']
    56	    texts = corpus_texts()
    57	    words = []
    58	    for lang in ('en', 'pl'):
    59	        for w in top_n_list(lang, a.words):
    60	            words += [w, w.capitalize()]
    61	            if lang == 'pl':
    62	                words += [fold(w)]
    63	    chars = [chr(c) for c in range(33, 127)] + list('ąćęłńóśźżĄĆĘŁŃÓŚŹŻ„”“’–—…«»€£§°×')
    64	    keep = set(range(4))  # <s> <pad> </s> <unk>
    65	    for batch_start in range(0, len(texts) + len(words), 4096):
    66	        chunk = (texts + words)[batch_start:batch_start + 4096]
    67	        for enc in fast.encode_batch(chunk, add_special_tokens=False):
    68	            keep.update(enc.ids)
    69	    piece_id = {p: i for i, (p, _) in enumerate(vocab)}
    70	    for c in chars:
    71	        for p in (c, '▁' + c):
    72	            if p in piece_id:
    73	                keep.add(piece_id[p])
    74	    keep.add(piece_id['▁'])
    75	    kept = sorted(keep)
    76	    old2new = {o: n for n, o in enumerate(kept)}
    77	    spec['model']['vocab'] = [vocab[o] for o in kept]
    78	    spec['model']['unk_id'] = old2new[spec['model']['unk_id']]
    79	    for at in spec.get('added_tokens', []):
    80	        at['id'] = old2new.get(at['id'], at['id'])
    81	    # post-processor references special token ids
    82	    def remap(o):
    83	        if isinstance(o, dict):
    84	            for k, v in o.items():
    85	                if k == 'ids' and isinstance(v, list):
    86	                    o[k] = [old2new.get(x, x) for x in v]
    87	                elif k == 'id' and isinstance(v, int):
    88	                    o[k] = old2new.get(v, v)
    89	                else:
    90	                    remap(v)
    91	        elif isinstance(o, list):
    92	            for v in o:
    93	                remap(v)
    94	    remap(spec.get('post_processor'))
    95	    os.makedirs(a.out, exist_ok=True)
    96	    with open(os.path.join(a.out, 'tokenizer.json'), 'w', encoding='utf-8') as f:
    97	        json.dump(spec, f, ensure_ascii=False)
    98	    newtok = PreTrainedTokenizerFast(tokenizer_file=os.path.join(a.out, 'tokenizer.json'), bos_token='<s>', eos_token='</s>',
    99	                                     unk_token='<unk>', pad_token='<pad>', cls_token='<s>', sep_token='</s>', mask_token='<unk>')
   100	    newtok.save_pretrained(a.out)
   101	    model = AutoModel.from_pretrained(a.base)
   102	    emb = model.get_input_embeddings().weight.data
   103	    new = torch.nn.Embedding(len(kept), emb.shape[1], padding_idx=old2new[1])
   104	    new.weight.data = emb[kept].clone()
   105	    model.set_input_embeddings(new)
   106	    model.config.vocab_size = len(kept)
   107	    model.config.pad_token_id = old2new[1]
   108	    model.save_pretrained(a.out)
   109	    # parity: pruned segmentation vs original on the corpus texts
   110	    diff = 0
   111	    for t in texts:
   112	        o = [vocab[i][0] for i in fast.encode(t, add_special_tokens=False).ids]
   113	        n = newtok.convert_ids_to_tokens(newtok(t, add_special_tokens=False)['input_ids'])
   114	        diff += o != n
   115	    params = sum(p.numel() for p in model.parameters())
   116	    rep = {'base': a.base, 'vocab_before': len(vocab), 'vocab_after': len(kept), 'params_after': params,
   117	           'emb_params_before': int(emb.numel()), 'emb_params_after': int(new.weight.numel()),
   118	           'corpus_texts': len(texts), 'segmentation_diff_on_corpus': diff}
   119	    json.dump(rep, open(os.path.join(a.out, 'prune_report.json'), 'w'), indent=1)
   120	    print(rep)
   121	
   122	
   123	if __name__ == '__main__':
   124	    main()
     1	#!/usr/bin/env python3
     2	"""Export the joint encoder (B) to ONNX + int8 (dynamic quantisation) and write the runtime bundle:
     3	
     4	  hybrid/models/enc/
     5	    encoder.int8.onnx   inputs input_ids/attention_mask [b,t] int64 -> tool [b,55], intent [b,149], tags [b,t,37]
     6	    vocab.json          {"pieces": [...], "scores": [...], "unk": 3}  (pruned SentencePiece Unigram vocabulary)
     7	    labels.json         tools / intents / tagLabels, context format, max length
     8	  Also checks ONNX fp32 / int8 against PyTorch on dev sentences (argmax agreement).
     9	
    10	Usage: python3 scripts/hybrid/export_encoder.py [--ckpt build/hybrid/enc/final.pt] [--out hybrid/models/enc]
    11	"""
    12	import argparse, json, os, sys
    13	import numpy as np
    14	import torch
    15	
    16	ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    17	sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    18	from train_encoder import Joint, ctx_str  # noqa: E402
    19	
    20	
    21	def main():
    22	    ap = argparse.ArgumentParser()
    23	    ap.add_argument('--enc', default=os.path.join(ROOT, 'build/hybrid/enc'))
    24	    ap.add_argument('--ckpt', default=None)
    25	    ap.add_argument('--out', default=os.path.join(ROOT, 'hybrid/models/enc'))
    26	    ap.add_argument('--layers', type=int, default=None)
    27	    ap.add_argument('--per-channel', action='store_true')
    28	    ap.add_argument('--fp32-heads', action='store_true')
    29	    ap.add_argument('--wq', type=int, default=0, help='weight-only quantisation bits (8 or 4) instead of dynamic int8')
    30	    ap.add_argument('--block', type=int, default=32)
    31	    ap.add_argument('--acc-level', type=int, default=None, help='MatMulNBits accuracy_level (4 = int8 compute)')
    32	    ap.add_argument('--gather', action='store_true', help='also quantise the embedding Gather (smaller file)')
    33	    a = ap.parse_args()
    34	    from transformers import AutoTokenizer
    35	    from onnxruntime.quantization import quantize_dynamic, QuantType
    36	    import onnxruntime as ort
    37	    ti = os.path.join(a.enc, 'train_info.json')
    38	    info = json.load(open(ti)) if os.path.exists(ti) else {  # exporting a mid-training checkpoint
    39	        'meta': json.load(open(os.path.join(ROOT, 'build/hybrid/meta.json'))), 'base': os.path.join(ROOT, 'build/hybrid/e5-pruned'), 'layers': 6}
    40	    meta = info['meta']
    41	    base = info['base']
    42	    tok = AutoTokenizer.from_pretrained(base)
    43	    model = Joint(base, len(meta['tools']), len(meta['intents']), len(meta['tagLabels']), a.layers or info.get('layers'))
    44	    sd = torch.load(a.ckpt or os.path.join(a.enc, 'final.pt'), map_location='cpu', weights_only=False)
    45	    model.load_state_dict(sd.get('model', sd))
    46	    model.eval()
    47	    os.makedirs(a.out, exist_ok=True)
    48	    fp = os.path.join(a.out, 'encoder.fp32.onnx')
    49	    q = os.path.join(a.out, 'encoder.int8.onnx')
    50	    ex = tok(['pokaż największe pliki'], ['bash linux'], return_tensors='pt')
    51	    torch.onnx.export(model, (ex['input_ids'], ex['attention_mask']), fp, input_names=['input_ids', 'attention_mask'],
    52	                      output_names=['tool', 'intent', 'tags'],
    53	                      dynamic_axes={'input_ids': {0: 'b', 1: 't'}, 'attention_mask': {0: 'b', 1: 't'}, 'tool': {0: 'b'}, 'intent': {0: 'b'}, 'tags': {0: 'b', 1: 't'}},
    54	                      opset_version=17, dynamo=False)
    55	    ops = ['MatMul', 'Gather'] if a.gather else ['MatMul']
    56	    import onnx
    57	    g = onnx.load(fp).graph
    58	    # the output heads are tiny; keeping them fp32 removes most of the int8 argmax flips
    59	    excl = [n.name for n in g.node if n.op_type in ('MatMul', 'Gemm') and any(h in n.name for h in ('/tool/', '/intent/', '/tag/'))] if a.fp32_heads else []
    60	    if a.wq:
    61	        # weight-only block quantisation (MatMulNBits / GatherBlockQuantized): activations stay fp32
    62	        from onnxruntime.quantization.matmul_nbits_quantizer import MatMulNBitsQuantizer
    63	        wq = MatMulNBitsQuantizer(onnx.load(fp), bits=a.wq, block_size=a.block, is_symmetric=True, accuracy_level=a.acc_level,
    64	                                  op_types_to_quantize=('MatMul',), nodes_to_exclude=excl)
    65	        wq.process()
    66	        tmp = q + '.mm.onnx'
    67	        wq.model.save_model_to_file(tmp if a.gather else q, use_external_data_format=False)
    68	        if a.gather:  # embedding table: plain int8 (a lookup, no activation quantisation involved)
    69	            quantize_dynamic(tmp, q, weight_type=QuantType.QInt8, op_types_to_quantize=['Gather'], per_channel=False)
    70	            os.remove(tmp)
    71	    else:
    72	        quantize_dynamic(fp, q, weight_type=QuantType.QInt8, op_types_to_quantize=ops, per_channel=a.per_channel, nodes_to_exclude=excl)
    73	    spec = json.load(open(os.path.join(base, 'tokenizer.json'), encoding='utf-8'))
    74	    vocab = spec['model']['vocab']
    75	    json.dump({'pieces': [p for p, _ in vocab], 'scores': [round(s, 5) for _, s in vocab], 'unk': spec['model']['unk_id']},
    76	              open(os.path.join(a.out, 'vocab.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    77	    json.dump({'tools': meta['tools'], 'intents': meta['intents'], 'tagLabels': meta['tagLabels'], 'maxLen': 64,
    78	               'context': '{shell} {os}', 'layers': info.get('layers'), 'version': 1},
    79	              open(os.path.join(a.out, 'labels.json'), 'w'), indent=1)
    80	    # parity on dev rows
    81	    rows = [json.loads(l) for l in open(os.path.join(ROOT, 'build/hybrid/train.jsonl'), encoding='utf-8')]
    82	    rows = [r for r in rows if r['split'] == 'dev'][:600]
    83	    sess = {k: ort.InferenceSession(p, providers=['CPUExecutionProvider']) for k, p in (('fp32', fp), ('int8', q))}
    84	    agree = {'fp32': [0, 0], 'int8': [0, 0]}
    85	    acc = {'pt': 0, 'fp32': 0, 'int8': 0}
    86	    il = {t: i for i, t in enumerate(meta['intents'])}
    87	    rows = [r for r in rows if r['intent']]
    88	    for r in rows:
    89	        e = tok([r['text']], [ctx_str(r)], return_tensors='pt', truncation='only_first', max_length=64)
    90	        with torch.no_grad():
    91	            pt = model(e['input_ids'], e['attention_mask'])
    92	        feed = {'input_ids': e['input_ids'].numpy(), 'attention_mask': e['attention_mask'].numpy()}
    93	        acc['pt'] += int(int(pt[1].argmax()) == il[r['intent']])
    94	        for k, s in sess.items():
    95	            o = s.run(None, feed)
    96	            acc[k] += int(int(np.argmax(o[1])) == il[r['intent']])
    97	            agree[k][0] += int(np.argmax(o[1]) == int(pt[1].argmax()))
    98	            agree[k][1] += int(np.argmax(o[0]) == int(pt[0].argmax()))
    99	    rep = {'fp32_mb': round(os.path.getsize(fp) / 1e6, 2), 'int8_mb': round(os.path.getsize(q) / 1e6, 2),
   100	           'vocab_json_mb': round(os.path.getsize(os.path.join(a.out, 'vocab.json')) / 1e6, 2),
   101	           'intent_argmax_agree_fp32': agree['fp32'][0] / len(rows), 'intent_argmax_agree_int8': agree['int8'][0] / len(rows),
   102	           'tool_argmax_agree_int8': agree['int8'][1] / len(rows), 'n': len(rows), 'gather_quantized': a.gather, 'per_channel': a.per_channel, 'fp32_heads': a.fp32_heads, 'wq': a.wq, 'block': a.block, 'acc_level': a.acc_level,
   103	           'dev_intent_acc': {k: round(v / len(rows), 4) for k, v in acc.items()}}
   104	    json.dump(rep, open(os.path.join(a.out, 'export_report.json'), 'w'), indent=1)
   105	    os.remove(fp) if not os.environ.get('KEEP_FP32') else None
   106	    print(rep)
   107	
   108	
   109	if __name__ == '__main__':
   110	    main()

exec
/bin/bash -lc 'node test/templates.test.js' in /workspace/tellsh
 exited 1 in 110ms:
TAP version 13
# Subtest: shQuote round-trips nasty strings through bash
not ok 1 - shQuote round-trips nasty strings through bash
  ---
  duration_ms: 6.145138
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
  duration_ms: 0.260901
  ...
# Subtest: raw slots are validated, never injected
ok 3 - raw slots are validated, never injected
  ---
  duration_ms: 1.342042
  ...
# Subtest: optional segments are dropped when slot missing
ok 4 - optional segments are dropped when slot missing
  ---
  duration_ms: 0.35519
  ...
# Subtest: non-slot braces are left alone
ok 5 - non-slot braces are left alone
  ---
  duration_ms: 0.340534
  ...
# Subtest: every intent renders on linux and darwin without throwing, with valid risk
ok 6 - every intent renders on linux and darwin without throwing, with valid risk
  ---
  duration_ms: 73.598302
  ...
# Subtest: darwin variants differ where commands differ
ok 7 - darwin variants differ where commands differ
  ---
  duration_ms: 1.60899
  ...
# Subtest: injection attempt in a filename stays a single quoted argument
ok 8 - injection attempt in a filename stays a single quoted argument
  ---
  duration_ms: 0.529043
  ...
1..8
# tests 8
# suites 0
# pass 7
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 97.212761

exec
/bin/bash -lc "nl -ba scripts/lib/jev.js && nl -ba scripts/hybrid/lm_rerank.py | sed -n '1,120p' && nl -ba src/rerank/tokenizer.js" in /workspace/tellsh
 succeeded in 0ms:
     1	// TypeSafe Jev client for build-time teacher scripts: on-disk cache, bounded concurrency, retry with
     2	// exponential backoff (429/529/5xx/network), and a call/token ledger. The API key is read from the
     3	// environment only and never printed or logged. Never used at runtime.
     4	import { readFileSync, appendFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
     5	import { createHash } from 'node:crypto';
     6	import { dirname, join } from 'node:path';
     7	import { fileURLToPath } from 'node:url';
     8	
     9	const ROOT = fileURLToPath(new URL('../..', import.meta.url));
    10	export const ENDPOINT = 'https://api.typesafe.ai/v1/systemone';
    11	export const MODEL = 'jev-latest';
    12	export const PRICE_PER_MTOK = 0.042; // USD per million input tokens (docs.typesafe.ai/models); output tokens are free
    13	const CACHE = join(ROOT, 'build', 'jev_cache.jsonl');
    14	export const LEDGER = join(ROOT, 'data', 'teacher', 'ledger.json');
    15	
    16	let cache = null;
    17	function loadCache() {
    18	  if (cache) return cache;
    19	  cache = new Map();
    20	  if (existsSync(CACHE)) {
    21	    for (const l of readFileSync(CACHE, 'utf8').split('\n')) {
    22	      if (!l.trim()) continue;
    23	      try { const { k, v } = JSON.parse(l); cache.set(k, v); } catch { /* torn line */ }
    24	    }
    25	  }
    26	  return cache;
    27	}
    28	export const keyOf = (state, questions) => createHash('sha256').update(JSON.stringify([MODEL, state, questions])).digest('hex');
    29	
    30	export const stats = { calls: 0, cached: 0, failed: 0, retries: 0, inTok: 0 };
    31	
    32	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    33	
    34	/** One evaluation (state + typed questions). Cached by request content; retried with backoff. */
    35	export async function ask(state, questions, { retries = 6 } = {}) {
    36	  const k = keyOf(state, questions);
    37	  const c = loadCache();
    38	  if (c.has(k)) { stats.cached++; return c.get(k); }
    39	  const KEY = process.env.TYPESAFE_API_KEY;
    40	  if (!KEY) throw new Error('TYPESAFE_API_KEY not set');
    41	  let delay = 500;
    42	  for (let attempt = 0; ; attempt++) {
    43	    let status = 0;
    44	    // every request sent counts as a network call (also the ones that fail and are retried)
    45	    stats.calls++;
    46	    try {
    47	      const r = await fetch(ENDPOINT, {
    48	        method: 'POST',
    49	        headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    50	        body: JSON.stringify({ model: MODEL, state, questions }),
    51	        signal: AbortSignal.timeout(60000),
    52	      });
    53	      status = r.status;
    54	      const j = await r.json().catch(() => null);
    55	      if (r.ok && j?.answers) {
    56	        stats.inTok += j.usage?.input_tokens || 0;
    57	        const v = { answers: j.answers, usage: j.usage };
    58	        c.set(k, v);
    59	        mkdirSync(dirname(CACHE), { recursive: true });
    60	        appendFileSync(CACHE, JSON.stringify({ k, v }) + '\n');
    61	        return v;
    62	      }
    63	      if (r.ok || (status >= 400 && status < 500 && status !== 429 && status !== 408)) {
    64	        stats.failed++;
    65	        throw Object.assign(new Error(`HTTP ${status}`), { fatal: true });
    66	      }
    67	      const ra = +r.headers.get('retry-after');
    68	      if (ra > 0) delay = Math.max(delay, ra * 1000);
    69	    } catch (e) {
    70	      if (e.fatal) throw e;
    71	    }
    72	    if (attempt >= retries) { stats.failed++; throw new Error(`gave up after ${retries} retries (last status ${status || 'network'})`); }
    73	    stats.retries++;
    74	    await sleep(delay + Math.random() * delay * 0.3);
    75	    delay = Math.min(delay * 2, 30000);
    76	  }
    77	}
    78	
    79	/** Run async thunks with bounded concurrency. */
    80	export async function pool(thunks, n = 12, onProgress) {
    81	  const out = new Array(thunks.length);
    82	  let i = 0;
    83	  let done = 0;
    84	  const worker = async () => {
    85	    while (i < thunks.length) {
    86	      const j = i++;
    87	      try { out[j] = await thunks[j](); } catch (e) { out[j] = { error: e.message }; }
    88	      if (onProgress && ++done % 200 === 0) onProgress(done, thunks.length);
    89	    }
    90	  };
    91	  await Promise.all(Array.from({ length: n }, worker));
    92	  return out;
    93	}
    94	
    95	/** Add this run's network calls/tokens to the committed ledger (per task) and return the totals. */
    96	export function recordLedger(task) {
    97	  const L = existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, 'utf8')) : { model: MODEL, pricePerMtok: PRICE_PER_MTOK, tasks: {} };
    98	  const t = (L.tasks[task] ??= { calls: 0, failed: 0, retries: 0, inTok: 0, runs: 0 });
    99	  t.calls += stats.calls; t.failed += stats.failed; t.retries += stats.retries; t.inTok += stats.inTok; t.runs++;
   100	  const tot = Object.values(L.tasks).reduce((a, x) => ({ calls: a.calls + x.calls, failed: a.failed + x.failed, inTok: a.inTok + x.inTok }), { calls: 0, failed: 0, inTok: 0 });
   101	  L.total = { ...tot, usd: +((tot.inTok / 1e6) * PRICE_PER_MTOK).toFixed(5) };
   102	  mkdirSync(dirname(LEDGER), { recursive: true });
   103	  writeFileSync(LEDGER, JSON.stringify(L, null, 1) + '\n');
   104	  return L;
   105	}
     1	#!/usr/bin/env python3
     2	"""(C) System-1-style decision model: a tiny causal LM scores A's top-k candidate intents in ONE forward pass.
     3	
     4	Prompt lists the candidates as options A..E (catalog descriptions); the next-token logits of the letters give a
     5	distribution over the candidates.  Sub-commands:
     6	
     7	  zeroshot  --model ID --set dev --n 300 [--fewshot]      accuracy of picking the gold among the candidates
     8	  train     --model ID --out DIR [--lora] [--steps N]     fine-tune on training rows (letters shuffled), resumable
     9	  score     --model DIR|ID --cands build/hybrid/cands_X.jsonl --out build/hybrid/lm_X.jsonl   letter probs for all rows
    10	  export    --model DIR --out build/hybrid/lm.onnx         ONNX (last-position letter logits only) + int8 quantisation
    11	
    12	Candidates come from scripts/hybrid/dump_cascade.js (A's top-k).  For training the gold is forced into the list
    13	(replacing the last candidate if missing) and the order is shuffled so the letter position carries no information.
    14	"""
    15	import argparse, json, math, os, random, sys, time
    16	import torch
    17	
    18	ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    19	LETTERS = 'ABCDE'
    20	K = 5
    21	SYSTEM = "You map a user's request to the matching shell-command intent. Reply with a single letter."
    22	
    23	
    24	def meta():
    25	    return json.load(open(os.path.join(ROOT, 'build/hybrid/meta.json')))
    26	
    27	
    28	def opt_text(intent, desc):
    29	    return f"{desc} ({intent.replace('_', ' ')})"
    30	
    31	
    32	def prompt_body(text, shell, os_, cands, desc):
    33	    lines = [f"Request: {text}", f"Shell: {shell} ({os_})", "Options:"]
    34	    for L, c in zip(LETTERS, cands):
    35	        lines.append(f"{L}) {opt_text(c, desc[c])}")
    36	    lines.append("Answer:")
    37	    return '\n'.join(lines)
    38	
    39	
    40	FEWSHOT = [
    41	    ("pokaż ukryte pliki w ~/projekt", "bash", "linux", ['list_files', 'hidden_files', 'find_by_name', 'list_tree', 'recent_files'], 1),
    42	    ("which process listens on 8080", "zsh", "darwin", ['listening_ports', 'kill_by_port', 'process_on_port', 'port_check', 'find_process'], 2),
    43	]
    44	
    45	
    46	class Prompter:
    47	    def __init__(self, tok, chat, fewshot=False):
    48	        self.tok, self.chat, self.fewshot = tok, chat, fewshot
    49	        self.desc = meta()['descriptions']
    50	        ids = [tok.encode(L, add_special_tokens=False) for L in LETTERS]
    51	        ids_sp = [tok.encode(' ' + L, add_special_tokens=False) for L in LETTERS]
    52	        self.letter_ids = [i[-1] for i in ids]
    53	        self.letter_ids_sp = [i[-1] for i in ids_sp]
    54	
    55	    def __call__(self, text, shell, os_, cands):
    56	        body = prompt_body(text, shell, os_, cands, self.desc)
    57	        if not self.chat:
    58	            return body + ' '  # plain format used for fine-tuning: "Answer: X"
    59	        msgs = [{'role': 'system', 'content': SYSTEM}]
    60	        if self.fewshot:
    61	            for t, s, o, c, g in FEWSHOT:
    62	                msgs += [{'role': 'user', 'content': prompt_body(t, s, o, c, self.desc)}, {'role': 'assistant', 'content': LETTERS[g]}]
    63	        msgs.append({'role': 'user', 'content': body})
    64	        return self.tok.apply_chat_template(msgs, tokenize=False, add_generation_prompt=True)
    65	
    66	
    67	def candidate_list(row, rng=None, train=False):
    68	    cands = [c['intent'] for c in row['cands'][:K]]
    69	    gold = row.get('intent')
    70	    if train and gold and gold not in cands:
    71	        cands = cands[:K - 1] + [gold]
    72	    if train:
    73	        allints = meta()['intents']
    74	        while len(cands) < K:
    75	            x = rng.choice(allints)
    76	            if x not in cands:
    77	                cands.append(x)
    78	        rng.shuffle(cands)
    79	    return cands
    80	
    81	
    82	def load(model_id, dtype=torch.float32):
    83	    from transformers import AutoModelForCausalLM, AutoTokenizer
    84	    tok = AutoTokenizer.from_pretrained(model_id)
    85	    m = AutoModelForCausalLM.from_pretrained(model_id, dtype=dtype)
    86	    m.eval()
    87	    return tok, m
    88	
    89	
    90	@torch.no_grad()
    91	def letter_logits(m, tok, prompts, letter_ids, bs=8):
    92	    tok.padding_side = 'left'
    93	    if tok.pad_token is None:
    94	        tok.pad_token = tok.eos_token
    95	    out = []
    96	    for i in range(0, len(prompts), bs):
    97	        enc = tok(prompts[i:i + bs], return_tensors='pt', padding=True, add_special_tokens=False)
    98	        lg = m(**enc, logits_to_keep=1).logits[:, -1, :]
    99	        out += lg[:, letter_ids].float().tolist()
   100	    return out
   101	
   102	
   103	def read_cands(path, sets=None):
   104	    rows = [json.loads(l) for l in open(path, encoding='utf-8')]
   105	    return [r for r in rows if sets is None or r['set'] in sets]
   106	
   107	
   108	def cmd_zeroshot(a):
   109	    tok, m = load(a.model, getattr(torch, a.dtype))
   110	    chat = tok.chat_template is not None and not a.plain
   111	    P = Prompter(tok, chat, a.fewshot)
   112	    rows = [r for r in read_cands(a.cands, {a.set}) if r['intent']]
   113	    random.Random(1).shuffle(rows)
   114	    rows = rows[:a.n]
   115	    rng = random.Random(5)
   116	    lists = [candidate_list(r, rng, train=True) for r in rows]  # gold forced in, shuffled: pure choice accuracy
   117	    prompts = [P(r['text'], r['shell'], r['os'], c) for r, c in zip(rows, lists)]
   118	    ntok = sum(len(tok(p, add_special_tokens=False)['input_ids']) for p in prompts) / len(prompts)
   119	    t0 = time.time()
   120	    best = None
     1	// SentencePiece-Unigram tokenizer (XLM-R style) for the hybrid encoder, no dependencies.
     2	// Reproduces HF `tokenizers` for the pruned multilingual-e5 vocabulary: NFKC normalisation, whitespace split,
     3	// '▁' prepended to every word, Viterbi over piece log-probabilities, unknown characters -> <unk> (consecutive
     4	// unknowns fused), offsets into the original string.
     5	const UNK_PENALTY = 10;
     6	
     7	export class UnigramTokenizer {
     8	  /** vocab: [[piece, score], ...] in id order; unkId; special ids */
     9	  constructor({ vocab, unkId = 3, bos = 0, eos = 2, pad = 1 }) {
    10	    this.pieces = new Map();
    11	    this.maxLen = 1;
    12	    let min = Infinity;
    13	    vocab.forEach(([p, s], i) => {
    14	      if (i <= 3) return; // specials are never produced by segmentation
    15	      this.pieces.set(p, [i, s]);
    16	      const n = [...p].length;
    17	      if (n > this.maxLen) this.maxLen = n;
    18	      if (s < min) min = s;
    19	    });
    20	    this.unkScore = min - UNK_PENALTY;
    21	    Object.assign(this, { unkId, bos, eos, pad, size: vocab.length });
    22	  }
    23	
    24	  /** segment one word ('▁' + word) -> [{id, start, end}] with offsets in code points of the piece string */
    25	  segment(word) {
    26	    const chars = [...word];
    27	    const n = chars.length;
    28	    const best = new Float64Array(n + 1).fill(-Infinity);
    29	    const from = new Int32Array(n + 1).fill(-1);
    30	    const tokId = new Int32Array(n + 1).fill(-1);
    31	    best[0] = 0;
    32	    for (let i = 0; i < n; i++) {
    33	      if (best[i] === -Infinity) continue;
    34	      let s = '';
    35	      let hit = false;
    36	      for (let j = i; j < Math.min(n, i + this.maxLen); j++) {
    37	        s += chars[j];
    38	        const e = this.pieces.get(s);
    39	        if (e) {
    40	          if (j === i) hit = true;
    41	          const v = best[i] + e[1];
    42	          if (v > best[j + 1]) { best[j + 1] = v; from[j + 1] = i; tokId[j + 1] = e[0]; }
    43	        }
    44	      }
    45	      if (!hit) { // single unknown character
    46	        const v = best[i] + this.unkScore;
    47	        if (v > best[i + 1]) { best[i + 1] = v; from[i + 1] = i; tokId[i + 1] = this.unkId; }
    48	      }
    49	    }
    50	    const out = [];
    51	    for (let k = n; k > 0; k = from[k]) out.push({ id: tokId[k], start: from[k], end: k });
    52	    out.reverse();
    53	    const fused = [];
    54	    for (const t of out) {
    55	      const last = fused[fused.length - 1];
    56	      if (last && last.id === this.unkId && t.id === this.unkId) last.end = t.end; else fused.push(t);
    57	    }
    58	    return fused;
    59	  }
    60	
    61	  /** -> [{id, start, end}] offsets are UTF-16 indices into `text` (the '▁' of a word maps to the word start) */
    62	  tokenize(text) {
    63	    const out = [];
    64	    const re = /\S+/gu;
    65	    let m;
    66	    while ((m = re.exec(text))) {
    67	      const raw = m[0];
    68	      const norm = raw.normalize('NFKC');
    69	      const same = norm === raw;
    70	      const cps = [...norm];
    71	      // code point index -> UTF-16 offset in raw (only exact when NFKC did not change the word)
    72	      const cu = [0];
    73	      for (const c of cps) cu.push(cu[cu.length - 1] + c.length);
    74	      for (const p of this.segment('▁' + norm.replace(/\s+/g, '▁'))) {
    75	        const s = Math.max(0, p.start - 1);
    76	        const e = Math.max(0, p.end - 1);
    77	        out.push({ id: p.id, start: m.index + (same ? cu[s] : 0), end: m.index + (same ? cu[e] : raw.length) });
    78	      }
    79	    }
    80	    return out;
    81	  }
    82	
    83	  /** XLM-R pair encoding: <s> A </s></s> B </s>; A truncated to fit maxLen. -> {ids, offsets (A only), nA} */
    84	  encodePair(a, b, maxLen = 64) {
    85	    const ta = this.tokenize(a);
    86	    const tb = this.tokenize(b);
    87	    const room = Math.max(1, maxLen - tb.length - 4);
    88	    const A = ta.slice(0, room);
    89	    const ids = [this.bos, ...A.map((t) => t.id), this.eos, this.eos, ...tb.map((t) => t.id), this.eos];
    90	    return { ids, tokens: A, nA: A.length };
    91	  }
    92	}

exec
/bin/bash -lc "nl -ba src/compose.js | sed -n '1,245p'" in /workspace/tellsh
 succeeded in 0ms:
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

exec
/bin/bash -lc "nl -ba src/history.js | sed -n '930,993p;1125,1215p' && git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/model.js src/tagger.js" in /workspace/tellsh
 succeeded in 0ms:
   930	
   931	/**
   932	 * Build the context object from history commands (oldest first). Only the single most recent command is a
   933	 * reference target ("delete it", "same for /var", "there" always mean the previous command, never an older one);
   934	 * the running `tellsh <query>` line itself, which some shells write before it runs, is dropped first.
   935	 * kind: 'posix' | 'pwsh' (default: `cmds.kind` as set by loadHistory, else posix)
   936	 * -> { n, line, ents: {type: value}, entOrder, refOrder, searchRoots, listedDirs, last: {intent, slots, ambiguous, skipped, scoped},
   937	 *      pos, listing, cdDir, features }
   938	 *    values that could not be read unambiguously are kept as AMB-prefixed strings (see isAmbiguous).
   939	 *    Within the line (`cat old.txt; ls newdir`) later segments win: pos gives the segment of each value, and refOrder
   940	 *    ranks types by it (entOrder, which feeds the classifiers' ctx_ features, ranks by type only). searchRoots: the dir
   941	 *    is a find/grep root or a filtered/piped listing; listedDirs: a plain listing. last.skipped: a later segment of the
   942	 *    line ran after the repeatable command. listing: the segment of the newest listing of each entity type ({ seg });
   943	 *    cdDir: the dir is a `cd` target ({ value, followed }). changeGuard() uses these.
   944	 */
   945	export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
   946	  const k = kind || cmds.kind || 'posix';
   947	  const list = [...cmds];
   948	  // zsh (share_history / inc_append_history), fish and PSReadLine write the running line to the
   949	  // history file before it executes: the current `tellsh <query>` call is not the previous command. bash writes it
   950	  // only afterwards, so there an identical last line is an earlier call (`cmds.shell` as set by loadHistory)
   951	  if (query != null && list.length && cmds.shell !== 'bash') {
   952	    const norm = (x) => String(x).trim().replace(/\s+/g, ' ');
   953	    const q = tellshQuery(list[list.length - 1], k);
   954	    // exact match only: an earlier `tellsh` line whose text merely contains the query is the previous command
   955	    if (q != null && q !== false && norm(q) === norm(query)) list.pop();
   956	  }
   957	  const line = list.length ? list[list.length - 1] : null;
   958	  const a = line != null ? analyzeCommand(line, classify, k) : { ents: {}, at: {}, listed: {}, slots: {} };
   959	  const ents = {};
   960	  for (const t of ENT_TYPES) if (a.ents[t] != null) ents[t] = a.ents[t];
   961	  const pos = Object.fromEntries(Object.keys(ents).map((t) => [t, a.at?.[t] ?? 0]));
   962	  const dir = ents.dir != null ? String(ents.dir) : null;
   963	  const searchRoots = new Set(dir != null && a.searchDir ? [dir] : []);
   964	  const listedDirs = new Set(dir != null && a.listDir ? [dir] : []);
   965	  const listing = Object.fromEntries(Object.entries(a.listed || {}).map(([t, seg]) => [t, { seg }]));
   966	  const last = a.intent ? { intent: a.intent, slots: a.slots, ambiguous: !!a.ambiguous, skipped: !!a.intentStale, scoped: !!a.scoped } : null;
   967	  const current = a.ents.current && !isAmbiguous(a.ents.current) ? a.ents.current : null;
   968	  const cdDir = a.cdDir && dir != null ? { value: dir, followed: !!a.cdFollowed } : null;
   969	  const byType = (x, y) => ENT_TYPES.indexOf(x) - ENT_TYPES.indexOf(y);
   970	  const entOrder = Object.keys(ents).sort(byType);
   971	  const refOrder = Object.keys(ents).sort((x, y) => pos[y] - pos[x] || byType(x, y));
   972	  const ctx = { n: line != null ? 1 : 0, line, ents, currentBranch: current, entOrder, refOrder, searchRoots, listedDirs, last,
   973	    cwdFlags: cwdFlags(cwd), pos, listing, cdDir };
   974	  ctx.features = ctxFeatures(ctx);
   975	  return ctx;
   976	}
   977	
   978	export function cwdFlags(cwd) {
   979	  if (!cwd) return [];
   980	  const f = [];
   981	  try {
   982	    if (existsSync(join(cwd, '.git'))) f.push('git');
   983	    if (['docker-compose.yml', 'docker-compose.yaml', 'compose.yml', 'compose.yaml'].some((n) => existsSync(join(cwd, n)))) f.push('compose');
   984	  } catch { /* ignore */ }
   985	  return f;
   986	}
   987	
   988	/** ctx_ tokens fed to the classifiers (same function is used by scripts/gen_data.js). */
   989	export function ctxFeatures(ctx) {
   990	  const f = [];
   991	  // (a pull request is not a feature the model was trained with)
   992	  const order = (ctx.entOrder || []).filter((k) => k !== 'pr');
   993	  if (order[0]) f.push('ctx_last=' + order[0]);
  1125	}
  1126	
  1127	/**
  1128	 * Deterministic resolution. Returns null, or
  1129	 *   { rule: 'same-for', intent, slots, note }   (full override, slots to merge over the previous ones)
  1130	 *   { rule: 'pronoun', intent|null, fill: {slot: value}, ent, note }
  1131	 *   { rule: 'refused', intent|null, ent?, note }  (the referenced value is ambiguous: nothing is filled)
  1132	 */
  1133	export function resolveReference(query, ctx) {
  1134	  if (!ctx || !ctx.n) return null;
  1135	  const arg = sameFor(query);
  1136	  if (arg && ctx.last) {
  1137	    const rt = retarget(ctx.last.intent, arg);
  1138	    // "what about this": no new argument at all, nothing to retarget
  1139	    if (!rt && !arg.trim().split(/\s+/).some((w) => !PRONOUN_WORD.test(fold(w)) && !isStopWord(fold(w)))) {
  1140	      return { rule: 'refused', intent: null, stop: true, note: `"${arg}" does not name a new target for the previous ${ctx.last.intent}; not guessing` };
  1141	    }
  1142	    // any newer line ran after it: replaying the older changing command for a new target is a guess
  1143	    if (rt && ctx.last.skipped && BY_ID[ctx.last.intent].risk !== 'safe') {
  1144	      return { rule: 'refused', intent: null, stop: true, note: `the newest command that tellsh can repeat (${ctx.last.intent}) is not the previous command; not guessing` };
  1145	    }
  1146	    // "same for api" after `docker --context prod logs web`: here it would run against another daemon / repository
  1147	    if (rt && ctx.last.scoped) {
  1148	      return { rule: 'refused', intent: null, stop: true, note: `the previous command (${ctx.last.intent}) ran against another repository, directory or daemon (-C, --context, -H, ...); not guessing` };
  1149	    }
  1150	    // "same for /srv/x" after `git status`: the previous command has no slot for it; not a new request either
  1151	    if (!rt && EXPLICIT_SAME.some((re) => re.test(fold(query)))) {
  1152	      return { rule: 'refused', intent: null, stop: true, note: `the previous command (${ctx.last.intent}) has nothing that "${arg}" could replace; not guessing` };
  1153	    }
  1154	    if (rt) {
  1155	      const slots = { ...ctx.last.slots, [rt.slot]: rt.value };
  1156	      const amb = Object.entries(slots).find(([, v]) => isAmbiguous(v));
  1157	      if (amb) return { rule: 'refused', intent: ctx.last.intent, blank: [amb[0]], note: `previous ${ctx.last.intent} has ${amb[0]}=${rawOf(amb[1])}, which depends on the shell state; not guessing` };
  1158	      if (rt.slot === 'ext') delete slots.glob;
  1159	      if (rt.slot === 'name') delete slots.namepat;
  1160	      return { rule: 'same-for', intent: ctx.last.intent, slots, changed: rt.slot, note: `same as previous ${ctx.last.intent} with ${rt.slot}=${rt.value}` };
  1161	    }
  1162	  }
  1163	  // "same for X", "same but …" when the previous command is not one tellsh can repeat (`ls newdir`, `clear`)
  1164	  if (!ctx.last && (EXPLICIT_SAME.some((re) => re.test(fold(query))) || SAME_BUT.some((re) => re.test(fold(query))))) {
  1165	    return { rule: 'refused', intent: null, stop: true, note: 'the previous command is not one tellsh can repeat; not guessing' };
  1166	  }
  1167	  if (!hasPronoun(query) && hasLocative(query)) return locativeRef(fold(query), ctx);
  1168	  if (!hasPronoun(query)) return null;
  1169	  // which entity does the pronoun point at? noun hint first ("that container"), else the newest in the line
  1170	  const fq = fold(query);
  1171	  const order = ctx.refOrder || ctx.entOrder;
  1172	  let types = null;
  1173	  const named = [];
  1174	  // several types for one noun ("that process": pid or name): the one from the later segment wins
  1175	  for (const [re, ts] of NOUN_TYPE) if (re.test(fq)) { named.push(...ts); types = ts.filter((t) => ctx.ents[t] != null).sort((a, b) => order.indexOf(a) - order.indexOf(b)); if (types.length) break; }
  1176	  // "delete that branch" after a command without a branch: refuse instead of using another type's value
  1177	  if (named.length && !types?.length) {
  1178	    return { rule: 'refused', intent: null, ent: named[0], blank: [...new Set(named.flatMap((t) => SLOT_FROM_ENT[t] || []))], note: `the previous command names no ${named[0]}; not guessing` };
  1179	  }
  1180	  // "delete it" after `ls`, `clear`, `make`: nothing in the previous command it could mean (blanket: every slot type is
  1181	  // withheld, an optional one is simply left out: "push it" after `git commit` is `git push`)
  1182	  if (!ctx.entOrder.length) {
  1183	    const listed = Object.keys(ctx.listing || {});
  1184	    return { rule: 'refused', intent: null, blanket: true, blank: [...new Set(Object.values(SLOT_FROM_ENT).flat())],
  1185	      note: listed.length ? `the previous command listed ${listed.join('/')} values; the reference may mean any of them; not guessing`
  1186	        : 'the previous command names nothing the reference could mean; not guessing' };
  1187	  }
  1188	  const ent = (types && types.length ? types : order)[0];
  1189	  if (!ent) return null;
  1190	  let intent = null;
  1191	  let verb = null;
  1192	  for (const [name, re, table] of VERBS) {
  1193	    if (re.test(fq)) {
  1194	      const pick = table[ent] || (!types && order.map((e) => table[e]).find(Boolean));
  1195	      if (pick) { intent = pick; verb = name; break; }
  1196	    }
  1197	  }
  1198	  const finalEnt = intent ? (Object.entries(SLOT_FROM_ENT).find(([e]) => ctx.ents[e] != null && intentUses(intent, e)) ? pickEnt(intent, ent, ctx) : ent) : ent;
  1199	  const value = chooseValue(finalEnt, ctx);
  1200	  if (value == null || isAmbiguous(value)) {
  1201	    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: `the latest ${finalEnt} in history (${rawOf(value ?? '?')}) cannot be read unambiguously; not guessing` };
  1202	  }
  1203	  // a value that is fine to show but not to change (search root, listed directory, older value, ...)
  1204	  const guardNote = changeGuard(finalEnt, value, fq, ctx);
  1205	  // "delete that branch" after `git checkout main`: the checked-out branch is never the one to delete
  1206	  if (intent === 'git_delete_branch' && ctx.currentBranch != null && String(ctx.currentBranch) === String(value)) {
  1207	    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: `${rawOf(value)} is the checked-out branch (the previous command switched to it); not guessing` };
  1208	  }
  1209	  if (guardNote && intent && BY_ID[intent].risk !== 'safe') {
  1210	    // "delete all log files in this folder": the request is about entries inside the directory, so the verb's
  1211	    // directory intent (`rm -r`) is not what was asked; the classifier's intent stays (`find <PATH> … -delete`)
  1212	    const contents = finalEnt === 'dir' && CONTENTS.test(fq);
  1213	    return { rule: 'refused', intent: contents ? null : intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: guardNote, ...(contents ? { contents: true } : {}) };
  1214	  }
  1215	  if (intent === 'kill_by_name' && FORCE.test(fq)) intent = 'kill_force';
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
/bin/bash -lc "node --input-type=module <<'JS'
import assert from 'node:assert/strict';
import { suggest } from './src/pipeline.js';
for (const shell of ['bash','powershell','cmd']) {
  const env={shell,os:shell==='bash'?'linux':'win32',coreutils:'gnu'};
  for (const history of [undefined,['gh pr view 45']]) {
    for (const [q,command] of [['merge the pr with label \"urgent\"','gh pr merge urgent'],['merge the pr with title \"fix-login\"','gh pr merge fix-login']]) {
      const r=suggest(q,{env,history}); assert.equal(r.command,command); assert.deepEqual(r.missing,[]);
      console.log(JSON.stringify({shell,history:"'!!history,q,command:r.command,missing:r.missing}));
    }
  }
  for (const [q,command] of [['"'deploy worker to staging-eu','npx wrangler deploy --env staging'],['deploy worker to preview2','npx wrangler deploy'],['deploy worker to customer-a','npx wrangler deploy']]) {
    const r=suggest(q,{env}); assert.equal(r.command,command); assert.deepEqual(r.missing,[]);
    console.log(JSON.stringify({shell,q,command:r.command,missing:r.missing}));
  }
}
JS" in /workspace/tellsh
 succeeded in 150ms:
{"shell":"bash","history":false,"q":"merge the pr with label \"urgent\"","command":"gh pr merge urgent","missing":[]}
{"shell":"bash","history":false,"q":"merge the pr with title \"fix-login\"","command":"gh pr merge fix-login","missing":[]}
{"shell":"bash","history":true,"q":"merge the pr with label \"urgent\"","command":"gh pr merge urgent","missing":[]}
{"shell":"bash","history":true,"q":"merge the pr with title \"fix-login\"","command":"gh pr merge fix-login","missing":[]}
{"shell":"bash","q":"deploy worker to staging-eu","command":"npx wrangler deploy --env staging","missing":[]}
{"shell":"bash","q":"deploy worker to preview2","command":"npx wrangler deploy","missing":[]}
{"shell":"bash","q":"deploy worker to customer-a","command":"npx wrangler deploy","missing":[]}
{"shell":"powershell","history":false,"q":"merge the pr with label \"urgent\"","command":"gh pr merge urgent","missing":[]}
{"shell":"powershell","history":false,"q":"merge the pr with title \"fix-login\"","command":"gh pr merge fix-login","missing":[]}
{"shell":"powershell","history":true,"q":"merge the pr with label \"urgent\"","command":"gh pr merge urgent","missing":[]}
{"shell":"powershell","history":true,"q":"merge the pr with title \"fix-login\"","command":"gh pr merge fix-login","missing":[]}
{"shell":"powershell","q":"deploy worker to staging-eu","command":"npx wrangler deploy --env staging","missing":[]}
{"shell":"powershell","q":"deploy worker to preview2","command":"npx wrangler deploy","missing":[]}
{"shell":"powershell","q":"deploy worker to customer-a","command":"npx wrangler deploy","missing":[]}
{"shell":"cmd","history":false,"q":"merge the pr with label \"urgent\"","command":"gh pr merge urgent","missing":[]}
{"shell":"cmd","history":false,"q":"merge the pr with title \"fix-login\"","command":"gh pr merge fix-login","missing":[]}
{"shell":"cmd","history":true,"q":"merge the pr with label \"urgent\"","command":"gh pr merge urgent","missing":[]}
{"shell":"cmd","history":true,"q":"merge the pr with title \"fix-login\"","command":"gh pr merge fix-login","missing":[]}
{"shell":"cmd","q":"deploy worker to staging-eu","command":"npx wrangler deploy --env staging","missing":[]}
{"shell":"cmd","q":"deploy worker to preview2","command":"npx wrangler deploy","missing":[]}
{"shell":"cmd","q":"deploy worker to customer-a","command":"npx wrangler deploy","missing":[]}

exec
/bin/bash -lc 'git diff --check 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src bin scripts && git status --short' in /workspace/tellsh
 succeeded in 0ms:
?? review/r21-claude.md
?? review/r21-codex.md

codex
- **Major — [src/fill.js:122](/workspace/tellsh/src/fill.js:122): Quoted PR descriptions become merge targets.** `merge the pr with label "urgent"` produces `gh pr merge urgent`; `merge the pr with title "fix-login"` produces `gh pr merge fix-login`. Both have `missing: []`, including after history `gh pr view 45`. The quoted-value fallback returns before the descriptive-selector guard, potentially merging an unrelated branch’s PR. Check descriptive qualifiers before accepting a quoted selector.

- **Major — [src/fill.js:83](/workspace/tellsh/src/fill.js:83): Custom deployment environments are truncated or dropped.** `deploy worker to staging-eu` produces `npx wrangler deploy --env staging`; `deploy worker to preview2` and `deploy worker to customer-a` produce bare `npx wrangler deploy`. All have `missing: []`. The known-name regex accepts prefixes before hyphens, while unrecognized targets bypass withholding. Preserve the complete environment name or require `<WENV>` instead of deploying elsewhere.

Both findings reproduced across bash, PowerShell, and cmd. Full-suite validation was limited by sandbox `EROFS` and subprocess `EPERM` failures. No files changed.

VERDICT: REQUEST_CHANGES
tokens used
153,281
- **Major — [src/fill.js:122](/workspace/tellsh/src/fill.js:122): Quoted PR descriptions become merge targets.** `merge the pr with label "urgent"` produces `gh pr merge urgent`; `merge the pr with title "fix-login"` produces `gh pr merge fix-login`. Both have `missing: []`, including after history `gh pr view 45`. The quoted-value fallback returns before the descriptive-selector guard, potentially merging an unrelated branch’s PR. Check descriptive qualifiers before accepting a quoted selector.

- **Major — [src/fill.js:83](/workspace/tellsh/src/fill.js:83): Custom deployment environments are truncated or dropped.** `deploy worker to staging-eu` produces `npx wrangler deploy --env staging`; `deploy worker to preview2` and `deploy worker to customer-a` produce bare `npx wrangler deploy`. All have `missing: []`. The known-name regex accepts prefixes before hyphens, while unrecognized targets bypass withholding. Preserve the complete environment name or require `<WENV>` instead of deploying elsewhere.

Both findings reproduced across bash, PowerShell, and cmd. Full-suite validation was limited by sandbox `EROFS` and subprocess `EPERM` failures. No files changed.

VERDICT: REQUEST_CHANGES
