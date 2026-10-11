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
session id: 01a12a49-7dac-79d3-b160-f67b9f4638ba
--------
user
Re-review of tellsh (git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD; runtime src/ bin/, training scripts). History refs are intentionally limited to 1 line back. Read-only. Findings with severity and file:line. End with exactly one line that is either VERDICT: APPROVE (no blocker/major) or VERDICT: REQUEST_CHANGES.
codex
I’ll review the diff and affected runtime and training code, then report actionable findings with severity and file locations.
exec
/bin/bash -lc "pwd && rg --files -g 'AGENTS.md' -g '*train*' -g 'package.json' -g 'pyproject.toml' -g 'Cargo.toml' -g 'go.mod'" in /workspace/tellsh
 succeeded in 0ms:
/workspace/tellsh
package.json
data/shell/train.jsonl
scripts/hybrid/train_lm_gpu.py
scripts/hybrid/train_a_dev.sh
scripts/hybrid/train_encoder.py
scripts/train.py
hybrid/package/tellsh-model-enc/package.json

exec
/bin/bash -lc 'git status --short && git diff --stat 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD && git diff --name-only 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD' in /workspace/tellsh
 succeeded in 11ms:
?? review/r23-claude.md
?? review/r23-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   551 +-
 HYBRID.md                                    |   617 ++
 README.md                                    |   182 +-
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
 review/r22-claude.md                         |    72 +
 review/r22-codex.md                          |  9835 ++++++++++++++++++++++
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
 src/fill.js                                  |   339 +-
 src/history.js                               |  1026 ++-
 src/model.js                                 |    22 +-
 src/pipeline.js                              |   481 +-
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
 test/regressions23.test.js                   |    98 +
 test/regressions24.test.js                   |   116 +
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
 237 files changed, 246376 insertions(+), 806 deletions(-)
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
review/.f20done
review/.f21done
review/.f22done
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
review/fix20-log.md
review/fix21-log.md
review/fix22-log.md
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
review/r20-claude.md
review/r20-codex.md
review/r21-claude.md
review/r21-codex.md
review/r22-claude.md
review/r22-codex.md
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
test/regressions22.test.js
test/regressions23.test.js
test/regressions24.test.js
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
/bin/bash -lc 'cat scripts/train.py scripts/hybrid/train_encoder.py scripts/hybrid/train_lm_gpu.py scripts/hybrid/train_a_dev.sh' in /workspace/tellsh
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

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/pipeline.js src/cli.js bin/tellsh.js' in /workspace/tellsh
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
diff --git a/src/pipeline.js b/src/pipeline.js
index c5430f7..93a5dfe 100644
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
@@ -32,17 +34,81 @@ const PRONOUN_VALUE = /^(it|its|that|this|them|those|one|again|back|there|here|t
 
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
+const PR_CREATE_WORD = /(?<![\p{L}\d_])(?:create|creating|new|make|submit|raise|file|send|draft|utw[oó]rz\p{L}*|stw[oó]rz\p{L}*|now[yaeią]\p{L}*|za[lł][oó][zż]\p{L}*|wy[sś]lij\p{L}*)(?![\p{L}\d_])/iu;
+const PR_NOT_CREATE = /(?<![\p{L}\d_])(?:approve\w*|accept\w*|lgtm|zatwierd[zź]\w*|zaakceptuj\w*|akceptuj\w*)(?![\p{L}\d_])|\b(?:in|on|w)\s+(?:the\s+|a\s+)?(?:web|browser|przegl[aą]dar\w*)\b/iu;
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
@@ -52,31 +118,108 @@ export function validSlot(k, v) {
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
 }
 
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
@@ -90,22 +233,35 @@ function flagTokens(cmd) {
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
@@ -113,17 +269,26 @@ export function suggest(query, opts = {}) {
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
@@ -134,29 +299,68 @@ export function suggest(query, opts = {}) {
 
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
@@ -169,73 +373,268 @@ export function suggest(query, opts = {}) {
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
+  // "approve pr", "open pr in web": approving or viewing a pull request, never `gh pr create` (which publishes a new one)
+  if (intent === 'gh_pr_create' && !PR_CREATE_WORD.test(query) && PR_NOT_CREATE.test(query)) {
+    return { ...out, understood: false, method: 'none', hint: 'approving or opening an existing pull request is not supported (gh pr review --approve <PR>, gh pr view --web <PR>); not suggesting gh pr create' };
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
/bin/bash -lc 'ls -la /workspace && rg --files src bin scripts test | head -100 && cat package.json' in /workspace/tellsh
 succeeded in 0ms:
total 19472
drwxr-xr-x  1 box    box      49152 Oct 11 11:24 .
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
drwxr-xr-x  2 box    box      24576 Oct 11 10:20 agent-tools
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
drwxr-xr-x  2 box    box      36864 Oct 11 09:22 lumencraft-monitor
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
drwxr-xr-x  2 box    box       4096 Oct 11 11:25 ops
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
drwxr-xr-x  4 box    box       4096 Oct 11 09:10 scan-2026-10-11-0906
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
-rw-r--r--  1 box    box          0 Oct 11 11:24 tellsh-close.log
-rwxr-xr-x  1 box    box       1894 Oct 11 11:24 tellsh-close.sh
drwx------  4 box    box       4096 Oct 10 11:13 tellsh-data
drwxr-xr-x 11 box    box       4096 Oct 10 11:30 tellsh-hybrid
-rw-r--r--  1 box    box       2846 Oct 10 10:25 tellsh-hybrid-spec.md
-rw-r--r--  1 box    box       4568 Oct 10 14:02 tellsh-hybrid.log
-rw-r--r--  1 box    box        767 Oct 10 12:29 tellsh-loop.log
-rwxr-xr-x  1 box    box       4269 Oct 10 10:15 tellsh-loop.sh
-rwxr-xr-x  1 box    box       3382 Oct 11 07:41 tellsh-loop10.sh
-rwxr-xr-x  1 box    box       3812 Oct 11 08:00 tellsh-loop11.sh
-rwxr-xr-x  1 box    box       4043 Oct 11 08:26 tellsh-loop12.sh
-rwxr-xr-x  1 box    box       3760 Oct 11 08:59 tellsh-loop13.sh
-rwxr-xr-x  1 box    box       4013 Oct 11 09:26 tellsh-loop14.sh
-rwxr-xr-x  1 box    box       3366 Oct 11 10:01 tellsh-loop15.sh
-rwxr-xr-x  1 box    box       3704 Oct 11 10:31 tellsh-loop16.sh
-rwxr-xr-x  1 box    box       4088 Oct 11 10:56 tellsh-loop17.sh
-rwxr-xr-x  1 box    box       3889 Oct 11 11:22 tellsh-loop18.sh
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
drwxr-xr-x  5 box    box       4096 Oct 11 10:10 wearfits-growth-pages
drwxr-xr-x  4 box    box       4096 Oct 11 10:10 wearfits-pages-proxy
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
test/regressions24.test.js
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
scripts/real/group.js
scripts/real/group_leak.js
scripts/real/real_rows.js
scripts/real/prepare_real.js
scripts/real/report_v04.js
scripts/check_variants.js
scripts/eval.js
scripts/tldr_ingest.py
bin/tellsh.js
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

exec
/bin/bash -lc 'for f in /AGENTS.md /workspace/AGENTS.md /workspace/tellsh/AGENTS.md; do if [ -f "$f" ]; then cat "$f"; fi; done; cat src/pipeline.js' in /workspace/tellsh
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
const PR_CREATE_WORD = /(?<![\p{L}\d_])(?:create|creating|new|make|submit|raise|file|send|draft|utw[oó]rz\p{L}*|stw[oó]rz\p{L}*|now[yaeią]\p{L}*|za[lł][oó][zż]\p{L}*|wy[sś]lij\p{L}*)(?![\p{L}\d_])/iu;
const PR_NOT_CREATE = /(?<![\p{L}\d_])(?:approve\w*|accept\w*|lgtm|zatwierd[zź]\w*|zaakceptuj\w*|akceptuj\w*)(?![\p{L}\d_])|\b(?:in|on|w)\s+(?:the\s+|a\s+)?(?:web|browser|przegl[aą]dar\w*)\b/iu;
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
  // "approve pr", "open pr in web": approving or viewing a pull request, never `gh pr create` (which publishes a new one)
  if (intent === 'gh_pr_create' && !PR_CREATE_WORD.test(query) && PR_NOT_CREATE.test(query)) {
    return { ...out, understood: false, method: 'none', hint: 'approving or opening an existing pull request is not supported (gh pr review --approve <PR>, gh pr view --web <PR>); not suggesting gh pr create' };
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
});
mkdirSync(join(ROOT, 'build', 'real'), { recursive: true });
writeFileSync(join(ROOT, 'build', 'real', 'rows.jsonl'), final.map((r) => JSON.stringify(r)).join('\n') + '\n');
writeFileSync(join(ROOT, 'build', 'real', 'stats.json'), JSON.stringify(st, null, 1));
console.log(JSON.stringify({ commands: st.commands, rows: st.rows, train: st.train, eval: st.eval, labels: st.labels, groups: st.groups }));

exec
/bin/bash -lc 'cat src/render.js src/rerank/hybrid.js src/rerank/encoder.js src/rerank/tokenizer.js' in /workspace/tellsh
exec
/bin/bash -lc 'cat src/cli.js bin/tellsh.js' in /workspace/tellsh
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
#!/usr/bin/env node
import { main } from '../src/cli.js';

// `tellsh … | head -1`: a closed pipe is not an error
for (const s of [process.stdout, process.stderr]) s.on('error', (e) => { if (e.code === 'EPIPE') process.exit(process.exitCode ?? 0); throw e; });

main().then((code) => { process.exitCode = code; }, (err) => {
  console.error(`tellsh: ${err?.stack || err}`);
  process.exitCode = 1;
});

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

codex
The diff adds substantial history, quoting, and hybrid-model logic. I’m checking the paths that select operands or permit execution, alongside training-data exclusions and model/runtime consistency.
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
/bin/bash -lc "cat test/regressions24.test.js review/fix22-log.md && rg -n 'write|mkdir|unlink|rmSync|execSync|spawn' test" in /workspace/tellsh
 succeeded in 0ms:
// Regression tests for round 23: the round-22 findings (review/r22-claude.md, review/r22-codex.md). After "for" only a
// strong environment name is taken ("for production", "for qa"), a weak one ("for testing", "for the qa team") is
// withheld, and a request for prod / qa is never dropped to the default target; a quoted environment is decoded, never
// dropped; a selector after "pr" ("merge pr for the login fix", "merge pr: fix login") is withheld like one before it; a
// URL of a related pull request is not the merge target; "approve pr" / "open pr in web" are not `gh pr create`.
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

test('major: after "for" a strong environment is taken, a weak one is withheld, never made up or dropped', () => {
  for (const env of SHELLS) {
    const cases = {
      'deploy worker for production': 'production', 'publish worker for prod': 'prod', 'deploy worker for qa': 'qa',
      'deploy worker for uat': 'uat', 'deploy worker for canary': 'canary', 'deploy worker for preview': 'preview',
      'deploy worker for staging': 'staging', 'deploy worker for the sandbox': 'sandbox', 'deploy worker for prod now': 'prod',
      'deploy worker for production.': 'production',
    };
    for (const [q, e] of Object.entries(cases)) exact(run(q, null, env), `npx wrangler deploy --env ${e}`, `${env.shell}: ${q}`);
    for (const q of ['deploy worker for testing', 'deploy worker for test', 'deploy worker for dev', 'deploy worker for beta',
      'deploy worker for the qa team', 'deploy worker for prod users', 'deploy worker for staging-eu']) {
      withheld(run(q, null, env), 'npx wrangler deploy --env <WENV>', 'wenv', `${env.shell}: ${q}`);
    }
    // a word after "for" that is not an environment name leaves the default target
    for (const q of ['deploy worker for real', 'deploy worker for a customer']) exact(run(q, null, env), 'npx wrangler deploy', `${env.shell}: ${q}`);
  }
});

test('major: a quoted environment is decoded, never dropped', () => {
  for (const env of SHELLS) {
    const cases = {
      'deploy worker to "preview2"': 'npx wrangler deploy --env preview2',
      "deploy worker to 'staging'": 'npx wrangler deploy --env staging',
      'deploy worker to “prod-eu”': 'npx wrangler deploy --env prod-eu',
      'deploy worker env "staging-eu"': 'npx wrangler deploy --env staging-eu',
      'deploy worker --env "qa"': 'npx wrangler deploy --env qa',
      'deploy worker env=staging': 'npx wrangler deploy --env staging',
    };
    for (const [q, cmd] of Object.entries(cases)) exact(run(q, null, env), cmd, `${env.shell}: ${q}`);
    for (const q of ['deploy worker to "my env"', "deploy worker to 'cloudflare'", "deploy worker env 'staging eu'"]) {
      withheld(run(q, null, env), 'npx wrangler deploy --env <WENV>', 'wenv', `${env.shell}: ${q}`);
    }
  }
});

test('minor: a marked word after a preposition is an environment only with a known name in it', () => {
  exact(run('deploy worker to staging-eu'), 'npx wrangler deploy --env staging-eu');
  exact(run('deploy worker to qa_1'), 'npx wrangler deploy --env qa_1');
  for (const q of ['deploy worker to v2', 'deploy to the worker-2 script', 'deploy worker to customer-a']) {
    withheld(run(q), 'npx wrangler deploy --env <WENV>', 'wenv', q);
  }
});

test('minor: a dry run asked for after a negated one is still a dry run', () => {
  exact(run('deploy worker without a dry run first? no, do a dry run'), 'npx wrangler deploy --dry-run');
  exact(run('deploy worker, not just a dry run'), 'npx wrangler deploy --dry-run');
  exact(run('deploy the worker, not a dry run'), 'npx wrangler deploy');
});

test('major: a selector after "pr" is withheld, never a bare `gh pr merge`', () => {
  const qs = ['merge pr for the login fix', 'merge pr for the issue', 'merge pr: fix login', 'merge pr with dependabot',
    'merge pr of my colleague', 'merge pr in docs', 'merge pr - fix login', 'merge pr dependabot', 'merge pr renovate',
    'merge pr docs', 'merge pr draft', 'merge pr open', "merge pr dependabot's", "merge pr of alice's", 'merge pr about the login fix'];
  for (const env of SHELLS) {
    for (const q of qs) {
      for (const h of [null, ['gh pr view 45']]) withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
    for (const q of ['merge pr', 'merge pr now', 'merge pr on github', 'merge pr in this repo', 'merge pr with squash',
      'merge pr for review', 'merge pr with --squash', 'merge pr in the browser']) {
      exact(run(q, null, env), 'gh pr merge', `${env.shell}: ${q}`);
    }
    exact(run('merge pr for main', null, env), 'gh pr merge main', env.shell);
    exact(run('merge pr for branch fix-1', null, env), 'gh pr merge fix-1', env.shell);
  }
});

test('minor: "current branch pr", "the branch pr" are the current branch\'s', () => {
  for (const q of ['merge current branch pr', 'merge the branch pr', "merge branch's pr"]) {
    for (const h of [null, ['gh pr view 45']]) exact(run(q, h), 'gh pr merge', `${q} after ${h}`);
  }
  withheld(run('merge feature branch pr'), 'gh pr merge <PR>', 'pr');
});

test('major: the URL of a related pull request is not the merge target', () => {
  const url = 'https://github.com/acme/app/pull/12';
  for (const env of SHELLS) {
    for (const q of [`merge the pr that depends on ${url}`, `merge the pr blocked by ${url}`, `merge the pr after ${url}`]) {
      for (const h of [null, ['gh pr view 45']]) withheld(run(q, h, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q} after ${h}`);
    }
    exact(run(`merge pr ${url}`, null, env), `gh pr merge ${url}`, env.shell);
    exact(run(`view the pull request at ${url}`, null, env), `gh pr view ${url}`, env.shell);
  }
});

test('minor: "approve pr" and "open pr in web" are never `gh pr create`', () => {
  for (const [q, h] of [['approve pr'], ['open pr in web'], ['approve that pr', ['gh pr view 45']], ['zatwierdź pr']]) {
    const r = run(q, h);
    assert.notEqual(r.command, 'gh pr create --fill', q);
    assert.equal(r.understood, false, q);
  }
  exact(run('create a pr'), 'gh pr create --fill');
  exact(run('open a new pr'), 'gh pr create --fill');
});
I fixed all four round-22 Major findings and committed them as `79bc63c` (not pushed). All 381 tests pass. The eval scores are the same as before, and I reran bench and updated the timings in `EVAL.md`.

**Major fixes (`src/fill.js`):**
1. **Environment after "for":**
   - A strong name is now the environment: "deploy worker for production" gives `--env production`. The same goes for prod, qa, uat, canary, preview, sandbox, staging and stage.
   - A weak name withholds as `--env <WENV>`: "for testing", "for test", "for dev" and "for beta". "for the qa team" and "for prod users" also withhold, because a noun follows the name.
   - I added `production`, `prod`, `qa` and the other strong names to the "any environment mentioned" check. A prod or qa deploy is no longer silently dropped to the top-level environment.
   - Unrelated words like "for real" and "for a customer" still give a bare deploy.
2. **A selector after "pr" now withholds** as `gh pr merge <PR>`, with or without the history line. Examples are "merge pr for the login fix", "merge pr: fix login", "merge pr with dependabot", "merge pr of my colleague" and "merge pr in docs". "merge pr dependabot/renovate/docs/draft/open" was already withheld and now has tests. Neutral wordings still give a bare `gh pr merge`: "on github", "with squash", "in this repo", "for review" and "in the browser".
3. **Quoted environments are decoded:** `deploy worker to "preview2"` gives `--env preview2`, and curly quotes work too. A quoted value that can't be read or isn't a known environment withholds `<WENV>`: `"my env"`, `'cloudflare'`, `'staging eu'`.
4. **Related PR URLs:** a URL is the merge target only when a verb, a determiner or "pr" comes right before it. "merge the pr that depends on <url>" now gives `<PR>`, also with history. "merge pr <url>" and "view the pull request at <url>" are unchanged.

**Minor fixes:**
- "deploy worker env=staging" is now read as `--env staging`.
- After a preposition, a marked word only counts as an environment if it contains a known name, like "staging-eu" or "qa_1". So "to v2" and "to the worker-2 script" now withhold `<WENV>`.
- "do a dry run" later in a request is kept even when an earlier phrase said "without a dry run".
- "merge current branch pr", "merge the branch pr" and "merge branch's pr" give a plain `gh pr merge` again.
- "approve pr", "open pr in web" and "zatwierdź pr" are refused instead of creating a PR with `gh pr create --fill`. This change is in `src/pipeline.js`.

**Changed behaviour you should know about:**
- Two expectations in `test/regressions23.test.js` contradicted your new rules, so I changed them. "for testing" and "for the qa team" now withhold instead of giving a bare deploy. "to customer-a" now withholds instead of `--env customer-a`, which is the cost of the "to v2" fix.
- "merge pr for dependabot" and "merge pr for login" still treat the word as a branch name (`gh pr merge dependabot`). That's older behaviour Claude listed as related, not a Major. It doesn't give a bare merge, and existing tests depend on "for main" and "from bob" working this way.

The new tests are in `test/regressions24.test.js`. `README.md` and `EVAL.md` (a new Round 23 note) are updated. `review/fix22-log.md` was empty and untracked, so I left it out of the commit.

Three connectors (Cloudflare Developer Platform, Home and cnvs.app) still need to be authorized in your claude.ai connector settings before they can be used. This task didn't need them.
test/regressions6.test.js:45:  assert.equal(run('delete it', ['mkdir /tmp/new']).command, 'rm -r /tmp/new');
test/regressions6.test.js:78:  refused(run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']), '<PATH>', 'hint');
test/regressions6.test.js:81:  const ctx = buildContext(['mkdir /a', 'mkdir /b']);
test/regressions6.test.js:157:  assert.equal(run('copy notes.txt to it', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
test/regressions6.test.js:158:  assert.equal(run('skopiuj notes.txt do niego', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
test/regressions6.test.js:159:  assert.equal(run('move report.pdf into that folder', ['mkdir /srv/x']).command, 'mv -i report.pdf /srv/x');
test/regressions7.test.js:6:// interpreter code, non-recursive chmod/chown of /, writes onto raw disks and destructive commands after unknown programs.
test/regressions7.test.js:73:  assert.equal(run('copy notes.txt to it', ['mkdir /tmp/n']).command, 'cp -ri notes.txt /tmp/n');
test/regressions7.test.js:125:test('danger: inline interpreter code, chmod/chown of /, raw disk writes, unknown wrappers (claude r5 minor 5)', () => {
test/regressions7.test.js:127:    `awk 'BEGIN{system("rm -rf /")}'`, `node -e "require('fs').rmSync('/',{recursive:true})"`, 'chmod 000 /', 'chmod 000 /etc',
test/regressions4.test.js:188:  const { spawnSync } = await import('node:child_process');
test/regressions4.test.js:189:  const { mkdtempSync, writeFileSync } = await import('node:fs');
test/regressions4.test.js:194:  writeFileSync(hist, 'rm -r old\nls newdir\n');
test/regressions4.test.js:195:  const r = spawnSync(process.execPath, ['bin/tellsh.js', '--dry-run', `--history=${hist}`, 'same', 'for', '/srv/current'], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/regressions21.test.js:24:test('major: history never overwrites a pull request the request names but cannot read', () => {
test/regressions3-history.test.js:40:  assert.equal(run('delete it', ['cat old.txt; mkdir newdir']).command, 'rm -r newdir');
test/regressions3-history.test.js:42:  assert.equal(run('delete it', ['mkdir olddir; cat new.txt']).command, 'rm new.txt');
test/regressions3-history.test.js:60:  assert.equal(run('remove it', ['mkdir /srv/remove-backups', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:61:  assert.equal(run('delete it', ['mkdir /srv/delete-me', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:64:  assert.equal(run('usuń to', ['mkdir /srv/usun-stare', 'mkdir /srv/current']).command, 'rm -r /srv/current');
test/regressions3-history.test.js:68:  const old = run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']);
test/cli.test.js:3:import { spawnSync } from 'node:child_process';
test/cli.test.js:5:import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/cli.test.js:10:const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/cli.test.js:69:  const r = run('write me a poem about the sea');
test/cli.test.js:97:    writeFileSync(f, 'echo SECRET_TOKEN=abc123\ncat notes.txt\n');
test/cli.test.js:103:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/slot-cases.js:57:  ['mkdir', 'create folder src/components/ui', 'mkdir -p src/components/ui'],
test/pipeline.test.js:4:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/pipeline.test.js:96:    writeFileSync(f, Array.from({ length: 50 }, (_, i) => `: 17000000${i}:0;echo ${i}`).join('\n') + '\n');
test/pipeline.test.js:100:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/pipeline.test.js:123:  for (const q of ['write me a poem about the sea', 'jaka jest pogoda w krakowie', 'tell me a joke']) assert.equal(S(q).understood, false, q);
test/compose.test.js:47:  const { spawnSync } = await import('node:child_process');
test/compose.test.js:48:  const r = spawnSync('sh', ['-c', 'node bin/tellsh.js --dry-run show disk usage | head -c 1 >/dev/null; echo $?'], { encoding: 'utf8' });
test/regressions12.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions12.test.js:73:    const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', ...q.split(' ')],
test/regressions2.test.js:6:import { spawnSync } from 'node:child_process';
test/regressions2.test.js:8:import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
test/regressions2.test.js:25:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions2.test.js:174:    writeFileSync(hf, 'cat secret.txt\n');
test/regressions2.test.js:178:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions2.test.js:311:  hdr.writeUInt32LE(buf.length * 2, 4);
test/regressions9.test.js:4:// "move it there" is refused; the composer never fills a withheld slot; the encoder bundle installer only writes its
test/regressions9.test.js:9:import { spawnSync } from 'node:child_process';
test/regressions9.test.js:10:import { mkdtempSync, mkdirSync, writeFileSync, readdirSync, existsSync, rmSync } from 'node:fs';
test/regressions9.test.js:29:const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/regressions9.test.js:66:  for (const h of ['touch a.txt b.txt', 'rm -i a.txt b.txt', 'cat a.txt b.txt', 'mkdir /tmp/a /tmp/b']) {
test/regressions9.test.js:81:  for (const c of ['rm /etc/passwd', 'rm -f /etc/shadow', 'sudo rm -- /boot/vmlinuz', 'unlink /etc/hosts', 'sed -i d /etc/passwd',
test/regressions9.test.js:134:  const fetch = (from, to) => spawnSync(process.execPath, [join(ROOT, 'scripts/hybrid/fetch_model.js'), '--from', from, '--to', to], { encoding: 'utf8' });
test/regressions9.test.js:137:    mkdirSync(src, { recursive: true });
test/regressions9.test.js:138:    for (const f of FILES) writeFileSync(join(src, f), f);
test/regressions9.test.js:139:    writeFileSync(join(dir, 'src', 'evil'), 'payload');
test/regressions9.test.js:143:      writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files: { ...files, ...extra } }));
test/regressions9.test.js:152:    writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files: { ...files, 'vocab.json': sha(Buffer.from('other')) } }));
test/regressions9.test.js:156:    writeFileSync(join(src, 'manifest.json'), JSON.stringify({ bundle: 'enc-v2', files }));
test/regressions9.test.js:160:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions8.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions8.test.js:9:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/regressions8.test.js:22:const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/regressions8.test.js:53:  const ctx = buildContext(['cat a.txt', 'docker logs web', 'mkdir /tmp/b']);
test/regressions8.test.js:68:    writeFileSync(f, 'cat old.txt\nls\ncat new.txt\n');
test/regressions8.test.js:72:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions8.test.js:107:  const c = run('delete it', [`mkdir ${long}`]);
test/regressions8.test.js:194:test('minor: a NUL byte never reaches spawnSync', () => {
test/regressions10.test.js:4:// several operands; bash does not write the running call to its history first; system files written by dd, cp,
test/regressions10.test.js:9:import { spawnSync } from 'node:child_process';
test/regressions10.test.js:22:const cliJson = (...words) => JSON.parse(spawnSync(process.execPath, [BIN, '--json', '--shell', 'bash', '--os', 'linux', ...words],
test/regressions10.test.js:96:test('nit: bash does not write the running call first, so an identical last tellsh line is the previous command', () => {
test/regressions10.test.js:99:  // zsh / fish / PSReadLine write it first: the line is this call, the previous command is the one before it
test/regressions10.test.js:133:  // the lines the script rewrites exist in gen_data.js, and the script fails when a rewrite did not happen
test/regressions10.test.js:142:  // the rewrite applied to gen_data.js produces the expected line
test/regressions10.test.js:143:  const sed = spawnSync('sh', ['-c', `sed -n -e "s#^  const leaks = excl.has;\\$#  const leaks = (t) => excl.has(t) || isDevText(t);#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
test/regressions11.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions11.test.js:33:  const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', 'start', 'wrangler', 'dev'],
test/regressions11.test.js:84:  const sed = spawnSync('sh', ['-c', `DEV_TEXTS=/x.json; sed -n -e "s#^import { ctxFeatures } from '../src/history.js';#&\\nconst _devIndex = new Set(JSON.parse(readFileSync('$DEV_TEXTS', 'utf8')));#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
test/regressions5.test.js:109:  assert.equal(run('move it to /tmp/old', ['mkdir /tmp/build']).command, 'mv -i /tmp/build /tmp/old');
test/shells.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/shells.test.js:12:const has = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
test/shells.test.js:51:      const res = spawnSync(checker, args, { encoding: 'utf8' });
test/shells.test.js:65:    if (has('fish')) { const res = spawnSync('fish', ['-n', '-c', r.command]); if (res.status !== 0) bad.push(it.id); }
test/regressions.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/regressions.test.js:7:import { mkdtempSync, writeFileSync, readFileSync, rmSync, chmodSync } from 'node:fs';
test/regressions.test.js:23:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions.test.js:52:    assert.equal(spawnSync('bash', ['-n', '-c', command]).status, 0, command);
test/regressions.test.js:66:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:192:    writeFileSync(fake, `#!/bin/sh\nprintf '%s\\n' "$@" > '${out}'\nprintf '%s' "$TELLSH_PARSE_SRC" > '${out}.src'\nexit 0\n`);
test/regressions.test.js:198:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:279:    writeFileSync(join(dir, 'notes.txt'), 'hello\n');
test/regressions.test.js:280:    writeFileSync(f, 'ls\ncat notes.txt\n');
test/regressions.test.js:286:  } finally { rmSync(dir, { recursive: true, force: true }); }

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/fill.js' in /workspace/tellsh
 succeeded in 0ms:
diff --git a/src/fill.js b/src/fill.js
index f9849d0..2048f55 100644
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
 
@@ -19,13 +19,251 @@ export const RAW_OK = {
   var: (v) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(String(v)),
   minutes: (v) => /^\d{1,7}$/.test(String(v)),
   sizeBytes: (v) => /^\d{1,16}$/.test(String(v)),
+  start: (v) => /^\d{1,9}$/.test(String(v)) && +v > 0,
+  end: (v) => /^\d{1,9}$/.test(String(v)) && +v > 0,
+  num: (v) => /^\d{1,12}$/.test(String(v)),
+  // a repository as gh -R takes it: [HOST/]OWNER/REPO
+  dryrun: (v) => v === '--dry-run',
+  // a wrangler environment name (wrangler.toml [env.NAME])
+  wenv: (v) => /^[A-Za-z0-9][\w-]{0,62}$/.test(String(v)),
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
+const PR_URL_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|and|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit|the|this|that|a|pull|requests?|pr|prs|at|is|zmerguj\w*|scal\w*|poka[zż]\w*|zobacz\w*|otw[oó]rz\w*|zamknij\w*|sprawd[zź]\w*)[\s:,]+)*$/i;
+// "merge ten pr" (Polish "this"), "merge that one pr": a number word that is a demonstrative, not a number
+const PR_DEM_NUMBER = /\b(?:ten|(?:that|this|which|the)\s+one)\s+(?:\S+\s+)?(?:prs?|pull[\s-]+requests?)\b/gi;
+// "merge pr from the feature branch", "for my branch bob": a branch is named, but not one the parser read
+const PR_BRANCH_NAMED = /\b(?:for|of|on|from)\s+(?:\S+\s+){0,2}branch\b/i;
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
+}
+/**
+ * The pull request the user names (quoted: kept as written, validation withholds an odd one), else null (`gh pr merge`
+ * acts on the current branch's pull request). A number elsewhere in the request ("merge pr with 2 approvals", "merge the
+ * 2 open prs") is never the pull request; a request that names something the parser cannot read (`bob's`, `in repo v2`)
+ * is withheld (`?`, shown as `<PR>`), never a bare `gh pr merge`.
+ */
+function prSelector(ex) {
+  const text = String(ex.text);
+  if (ex.urls[0] != null) {
+    // "merge pr <url>", "merge <url>", "view the pull request at <url>": the URL is the pull request; "the pr that depends
+    // on <url>" names a related one (withheld, never the URL's)
+    const at = text.indexOf(ex.urls[0]);
+    return at < 0 || PR_URL_LEAD.test(text.slice(0, at)) ? ex.urls[0] : '?';
+  }
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
+      if (/\b(?:for|from)\s+$/i.test(m[1])) return /\d/.test(rest) || PR_WHEN.test(w) ? `?${w}` : w;
+      // "merge pr main": a bare word may be a branch or say something else: withheld (`gh pr merge <PR>`), never dropped
+      return `?${w}`;
+    }
+  }
+  const hash = text.match(/(?:^|\s)#(\d{1,12})(?=[\s.,!?;:]|$)/);
+  if (hash && PR_HASH_LEAD.test(text.slice(0, hash.index + hash[0].indexOf('#')))) return hash[1];
+  const p = text.match(PR_WORD);
+  const after = p ? text.slice(p.index + p[0].length) : '';
+  const before = p ? text.slice(0, p.index) : '';
+  // 'merge the pr with label "urgent"', 'the pr titled "fix"': a quoted description, not the pull request (withheld)
+  if (ex.quoted.length && (PR_DESCRIBED.test(after) || PR_QUALIFIED.test(after))) return '?';
+  // 'merge the "feature/login" pull request': an explicitly quoted value is the target
+  if (ex.quoted.length) return ex.quoted[0];
+  // named but not readable: a number anywhere ("merge the 2 open prs", "merge pr in 2 minutes"), or a marked word or a
+  // quote after "pr" ("merge pr bob's", "merge pr feature/x's", "merge pr in repo v2"): withheld
+  const det = before.match(PR_DET_WORD);
+  if (PR_ANAPHOR.test(before) || (det && det[1].trim().split(/\s+/).some((x) => !PR_DET_NEUTRAL.test(x))) || (p && prWordBefore(before))) return '?';
+  if (PR_DESCRIBED.test(after) || prPickedAfter(after)) return '?';
+  const numbers = !/\d/.test(text) && (ex.numbers?.length ?? 0) <= [...text.matchAll(PR_DEM_NUMBER)].length ? [] : ex.numbers || [];
+  if (numbers.length || /\d/.test(text) || /[/_#'"`„“”’]|\w[.-]\w/.test(after) || PR_BRANCH_NAMED.test(after) || PR_QUALIFIED.test(after)) return '?';
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
@@ -40,9 +278,24 @@ export function finalizeSlots(intent, v) {
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
@@ -91,12 +344,45 @@ export function resolveSlots(intent, ex) {
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
+  if (has('wenv')) {
+    const t = String(ex.text);
+    if (wranglerDry(t)) v.dryrun = '--dry-run';
+    // an environment named but not readable ("to the env called 'a b'", "worker env") is withheld, never the default target
+    const w = wranglerEnv(t);
+    if (w != null) v.wenv = w;
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
@@ -143,7 +429,7 @@ function renderValue(name, raw, values, quote) {
   let val = values[name];
   if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
   if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
-  return quote(val);
+  return quote(val, { tilde: PATH_SLOTS.has(name), name });
 }
 
 const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;
@@ -152,7 +438,7 @@ const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|d
  * Fill a template. Returns { command, missing[] }.
  * `values` = resolved slots merged over intent defaults.
  */
-export function render(template, values, required = [], quote = shQuote) {
+export function render(template, values, required = [], quote = shQuote, keepOptional = []) {
   const missing = [];
   const isSlot = (name) => name in values || required.includes(name) || SLOT_NAMES.test(name);
   // Single pass over the template: every {slot} and «optional segment» is substituted exactly once and
@@ -163,6 +449,9 @@ export function render(template, values, required = [], quote = shQuote) {
       const r = seg.replace(/\{(\w+)(!raw)?\}/g, (m2, n2, raw2) => {
         if (!ok) return m2;
         const val = renderValue(n2, !!raw2, values, quote);
+        // an operand withheld on purpose (keepOptional: an invalid operand, an unresolved history value) keeps its
+        // placeholder: the optional part is not silently dropped (`npm install <PKG>`, never `npm install`)
+        if (val == null && keepOptional.includes(n2)) { missing.push(n2); return PLACEHOLDER(n2); }
         if (val == null) { ok = false; return m2; }
         return val;
       });
@@ -209,7 +498,7 @@ export const envFromPlatform = (platform = process.platform) => ({
  *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
  * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}
  */
-export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given } = {}) {
+export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [], keepOptional = [] } = {}) {
   const intent = BY_ID[intentId];
   if (!intent) throw new Error(`unknown intent ${intentId}`);
   const e = env || envFromPlatform(platform);
@@ -218,8 +507,14 @@ export function buildCommand(intentId, text, { platform = process.platform, env,
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
@@ -229,20 +524,38 @@ export function buildCommand(intentId, text, { platform = process.platform, env,
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
/bin/bash -lc "sed -n '290,370p' src/pipeline.js; cat src/shellwords.js; sed -n '1,220p' src/history.js" in /workspace/tellsh
 succeeded in 0ms:
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

exec
/bin/bash -lc 'cat src/danger.js' in /workspace/tellsh
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

exec
/bin/bash -lc 'cat scripts/gen_data.js' in /workspace/tellsh
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
  const tldr = readJsonl(join(ROOT, 'data', 'tldr', 'tools.jsonl'));
  const cap = {};
  let nT = 0;
  for (const r of tldr.sort(() => rng() - 0.5)) {
    if (!FAMILIES[r.tool] || !r.text || r.text.length < 8) continue;
    if (leaks(r.text)) continue;
    const key = r.tool + r.lang;
    if ((cap[key] = (cap[key] || 0) + 1) > (r.lang === 'pl' ? 60 : 80)) continue;
    const win = /^windows\//.test(r.page || '');
    emit(r.text, r.tool, '', win ? ['shell=powershell', 'os=win32'] : sampleEnv(), 0.5, 'tldr', r.lang, gid++);
    nT++;
  }

  // 4. out-of-domain -> __none__
  const ood = [...readJsonl(join(ROOT, 'data', 'ood.jsonl')), ...readJsonl(join(ROOT, 'data', 'ood_teacher.jsonl'))];
  for (const r of ood) {
    if (leaks(r.text)) continue;
    const g = gid++;
    emit(r.text, NONE, '', sampleEnv(), 1, 'ood', r.lang, g);
    emit(typo(r.text), NONE, '', [...sampleEnv(), ...(rng() < 0.25 ? randomCtx() : [])], 1, 'ood', r.lang, g);
  }

  cls.end();
  tag.end();
  const tagLabels = ['O', ...TAG_TYPES.flatMap((t) => [`B-${t}`, `I-${t}`])];
  const meta = {
    dim: DIM, tagDim: TAG_DIM, seed: SEED,
    families: [...Object.keys(FAMILIES), NONE],
    intentsByFamily: FAMILIES,
    tagLabels,
    counts: { ...counts, base: base.length, public: publicCount, real: realRows.length, realUsed: base.filter((r) => r.src === 'real').length, droppedHeldOut: dropped, droppedEvalValue, droppedDerived, teacherDropped, boosted: nBoost, anaphora: nAna, tldr: nT, ood: ood.length },
  };
  writeFileSync(join(outDir, 'meta.json'), JSON.stringify(meta, null, 1));
  console.log(`gen_data: ${base.length} base sentences (${dropped} dropped: collide with held-out sets; ${droppedEvalValue} mention an eval-only value; ` +
    `${droppedDerived} derived rows dropped), ` +
    `${counts.cls} classifier rows ${JSON.stringify(counts.bySrc)}, ${counts.tag} tagger sequences, ${nT} tldr rows, ${nAna} anaphora rows`);
}

main();

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/catalog.js src/variants.js src/slots.js src/tagger.js src/model.js; cat scripts/hybrid/export_encoder.py' in /workspace/tellsh
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
/bin/bash -lc "nl -ba src/danger.js | sed -n '120,310p'" in /workspace/tellsh
 succeeded in 0ms:
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
   246	  let force = false;
   247	  let noPreserve = false;
   248	  const targets = [];
   249	  let opts = true;
   250	  for (const a of words.slice(1)) {
   251	    if (opts && a === '--') { opts = false; continue; }
   252	    if (opts && /^--/.test(a)) {
   253	      if (a === '--recursive') recursive = true;
   254	      else if (a === '--force') force = true;
   255	      else if (a === '--no-preserve-root') noPreserve = true;
   256	      continue;
   257	    }
   258	    if (opts && /^-[a-zA-Z]+$/.test(a)) {
   259	      if (/[rR]/.test(a)) recursive = true;
   260	      if (/f/.test(a)) force = true;
   261	      continue;
   262	    }
   263	    targets.push(a);
   264	  }
   265	  hit('high', 'rm deletes files permanently (no trash)');
   266	  if (noPreserve) hit('high', 'rm --no-preserve-root', true);
   267	  if (recursive && force) hit('high', 'rm -rf deletes without asking');
   268	  if (recursive && targets.some((t) => POSIX_CRIT_TARGET.test(t.trim()) || PS_CRIT_TARGET.test(t.trim()) || sysCrit(t))) hit('high', 'recursive rm on /, ~, * or . — would wipe everything', true);
   269	  if (targets.some((t) => /(?:^|[\\/])\.\.(?:[\\/]|$)/.test(t))) hit('high', 'path contains .. (refers to a parent directory)');
   270	}
   271	
   272	// a file under /etc, /boot, /usr, /bin, /sbin, /lib*: deleting, overwriting or editing it in place can make the system
   273	// unbootable or lock everyone out (`rm /etc/passwd`, `sed -i d /etc/passwd`, `tee /etc/passwd < /dev/null`), the same as
   274	// `> /etc/passwd` or `truncate -s0 /etc/passwd`
   275	const SYS_FILE = /^\/+(?:etc|boot|usr|bin|sbin|lib\w*)\/+[^/]/;
   276	const sysFile = (t) => SYS_FILE.test(normTarget(t));
   277	// rm/unlink/shred of a system file; sed -i / perl -i on one; tee (not -a), dd of=, cp/install/mv/ln -f onto one; chmod 000 on one
   278	function sysFileWriteCheck(w, head, hit) {
   279	  const a = w.slice(1);
   280	  if (head === 'dd') {
   281	    if (a.some((x) => /^of=/.test(x) && sysFile(x.slice(3)))) hit('high', 'overwrites a system file', true);
   282	  } else if (head === 'cp' || head === 'mv' || head === 'install' || (head === 'ln' && a.some((x) => /^-[a-zA-Z]*f/.test(x) || x === '--force'))) {
   283	    // the destination: -t DIR / --target-directory=DIR (a file inside it), else the last operand unless it names a
   284	    // directory by its form (`cp x.service /etc/systemd/system/`: adds a file)
   285	    const ti = a.findIndex((x) => x === '-t' || x === '--target-directory');
   286	    const td = ti >= 0 ? a[ti + 1] : a.find((x) => /^--target-directory=/.test(x))?.slice(19);
   287	    if (td != null) return;
   288	    const pos = positional(a);
   289	    const dst = pos.length >= 2 ? pos[pos.length - 1] : null;
   290	    if (dst != null && !/[\\/]$/.test(dst) && sysFile(dst)) hit('high', 'overwrites a system file or directory', true);
   291	  } else if (/^(?:perl|ruby)[\d.]*$/.test(head)) {
   292	    if (a.some((x) => /^-[a-zA-Z]*i/.test(x)) && positional(a).some(sysFile)) hit('high', 'edits a system file in place', true);
   293	  } else if (head === 'chmod') {
   294	    // no permissions at all (`chmod 000 /etc/passwd`, `chmod a= …`): nobody can read it, logins stop working
   295	    const pos = positional(a);
   296	    if (/^0*$|^[ugoa]*=$|^a?-rwx$/.test(pos[0] ?? 'x') && pos.slice(1).some(sysFile)) hit('high', 'removes every permission from a system file', true);
   297	  } else if (head === 'rm' || head === 'unlink') {
   298	    if (positional(a).some(sysFile)) hit('high', 'deletes a system file', true);
   299	  } else if (head === 'sed') {
   300	    if (!a.some((x) => /^-[a-zA-Z]*i/.test(x) || /^--in-place/.test(x))) return;
   301	    // the script is the first positional unless given with -e/-f; every later positional is a file
   302	    const pos = [];
   303	    let script = !a.some((x) => /^-[a-zA-Z]*[ef]$|^--(?:expression|file)(?:=|$)/.test(x));
   304	    let opts = true;
   305	    for (let i = 0; i < a.length; i++) {
   306	      const x = a[i];
   307	      if (opts && x === '--') { opts = false; continue; }
   308	      if (opts && /^-[a-zA-Z]*[ef]$|^--(?:expression|file)$/.test(x)) { i++; continue; }
   309	      if (opts && /^-./.test(x)) continue;
   310	      if (script) { script = false; continue; }

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- scripts/train.py src/model.js src/catalog.js' in /workspace/tellsh
 succeeded in 0ms:
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

exec
/bin/bash -lc 'node --test test/parity.test.js test/danger.test.js test/templates.test.js test/hybrid.test.js test/devtools.test.js test/regressions13.test.js test/regressions14.test.js test/regressions15.test.js test/regressions16.test.js test/regressions17.test.js test/regressions18.test.js test/regressions19.test.js test/regressions20.test.js test/regressions21.test.js test/regressions22.test.js test/regressions23.test.js test/regressions24.test.js' in /workspace/tellsh
exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
for(const q of ['deploy worker in preview2','deploy worker on qa_1','deploy worker for preview2','deploy worker to testing-eu','deploy worker in testing-eu','deploy worker to staging and do not publish','merge pr 12 and 13','merge pr 12 not 13','merge pr not 12','deploy worker --env=','deploy worker --env staging --dry-run','view pr 45 in https://github.com/acme/app','merge pr 45 in https://github.com/acme/app','merge pr 12 if checks pass','set worker secret API_KEY in staging']) {
const r=suggest(q,{shell:'bash',os:'linux'}); console.log(JSON.stringify({q,cmd:r.command,missing:r.missing,intent:r.intent,method:r.method,risk:r.risk}));}
JS" in /workspace/tellsh
 exited 1 in 1284ms:
TAP version 13
# Subtest: /workspace/tellsh/test/danger.test.js
ok 1 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 193.037482
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 2 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 290.858697
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 3 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 250.234917
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 4 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 177.261596
  ...
# Subtest: /workspace/tellsh/test/regressions13.test.js
ok 5 - /workspace/tellsh/test/regressions13.test.js
  ---
  duration_ms: 383.243446
  ...
# Subtest: /workspace/tellsh/test/regressions14.test.js
ok 6 - /workspace/tellsh/test/regressions14.test.js
  ---
  duration_ms: 454.178506
  ...
# Subtest: /workspace/tellsh/test/regressions15.test.js
ok 7 - /workspace/tellsh/test/regressions15.test.js
  ---
  duration_ms: 540.394368
  ...
# Subtest: /workspace/tellsh/test/regressions16.test.js
ok 8 - /workspace/tellsh/test/regressions16.test.js
  ---
  duration_ms: 502.310391
  ...
# Subtest: /workspace/tellsh/test/regressions17.test.js
ok 9 - /workspace/tellsh/test/regressions17.test.js
  ---
  duration_ms: 446.319917
  ...
# Subtest: /workspace/tellsh/test/regressions18.test.js
ok 10 - /workspace/tellsh/test/regressions18.test.js
  ---
  duration_ms: 576.772741
  ...
# Subtest: /workspace/tellsh/test/regressions19.test.js
ok 11 - /workspace/tellsh/test/regressions19.test.js
  ---
  duration_ms: 710.182989
  ...
# Subtest: /workspace/tellsh/test/regressions20.test.js
ok 12 - /workspace/tellsh/test/regressions20.test.js
  ---
  duration_ms: 611.43876
  ...
# Subtest: /workspace/tellsh/test/regressions21.test.js
ok 13 - /workspace/tellsh/test/regressions21.test.js
  ---
  duration_ms: 520.063533
  ...
# Subtest: /workspace/tellsh/test/regressions22.test.js
ok 14 - /workspace/tellsh/test/regressions22.test.js
  ---
  duration_ms: 638.403305
  ...
# Subtest: /workspace/tellsh/test/regressions23.test.js
ok 15 - /workspace/tellsh/test/regressions23.test.js
  ---
  duration_ms: 646.45719
  ...
# Subtest: /workspace/tellsh/test/regressions24.test.js
ok 16 - /workspace/tellsh/test/regressions24.test.js
  ---
  duration_ms: 574.043798
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 17 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 296.195135
  location: '/workspace/tellsh/test/templates.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..17
# tests 17
# suites 0
# pass 16
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 1292.219405

 succeeded in 125ms:
{"q":"deploy worker in preview2","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy","method":"catalog","risk":"medium"}
{"q":"deploy worker on qa_1","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy","method":"catalog","risk":"medium"}
{"q":"deploy worker for preview2","cmd":"npx wrangler deploy --env <WENV>","missing":["wenv"],"intent":"wrangler_deploy","method":"catalog","risk":"medium"}
{"q":"deploy worker to testing-eu","cmd":"npx wrangler deploy --env testing-eu","missing":[],"intent":"wrangler_deploy","method":"catalog","risk":"medium"}
{"q":"deploy worker in testing-eu","cmd":"npx wrangler deploy","missing":[],"intent":"wrangler_deploy","method":"catalog","risk":"medium"}
{"q":"deploy worker to staging and do not publish","cmd":"npx wrangler deploy --env staging","missing":[],"intent":"wrangler_deploy","method":"catalog","risk":"medium"}
{"q":"merge pr 12 and 13","cmd":"gh pr merge 12","missing":[],"intent":"gh_pr_merge","method":"catalog","risk":"medium"}
{"q":"merge pr 12 not 13","cmd":"gh pr merge 12","missing":[],"intent":"gh_pr_merge","method":"catalog","risk":"medium"}
{"q":"merge pr not 12","cmd":"gh pr merge <PR>","missing":["pr"],"intent":"gh_pr_merge","method":"catalog","risk":"medium"}
{"q":"deploy worker --env=","cmd":"npx wrangler deploy --env <WENV>","missing":["wenv"],"intent":"wrangler_deploy","method":"catalog","risk":"medium"}
{"q":"deploy worker --env staging --dry-run","cmd":"npx wrangler deploy --dry-run --env staging","missing":[],"intent":"wrangler_deploy","method":"catalog","risk":"medium"}
{"q":"view pr 45 in https://github.com/acme/app","cmd":"gh pr view 45 --repo github.com/acme/app","missing":[],"intent":"gh_pr_view","method":"catalog","risk":"safe"}
{"q":"merge pr 45 in https://github.com/acme/app","cmd":"gh pr merge 45 --repo github.com/acme/app","missing":[],"intent":"gh_pr_merge","method":"catalog","risk":"medium"}
{"q":"merge pr 12 if checks pass","cmd":"gh pr merge 12","missing":[],"intent":"gh_pr_merge","method":"catalog","risk":"medium"}
{"q":"set worker secret API_KEY in staging","cmd":"npx wrangler secret put API_KEY","missing":[],"intent":"wrangler_secret_put","method":"catalog","risk":"medium"}

codex
The selected regression tests are passing so far. Direct suggestion probes found an uncovered deployment case: “deploy worker in preview2” produces a complete command for the default environment. I’m checking related scope handling and confirming which findings have a clear impact.
exec
/bin/bash -lc "rg -n 'scop|lastLine|buildContext|sameBut|resolveReference|gh|pr:' src/history.js" in /workspace/tellsh
 succeeded in 0ms:
121:// PowerShell string cannot end right before another quote (`''''` is one string, not two).
242:// options that take a value, per command (so `kill -s 9 4242` or `pkill nginx -u bob` pick the right word)
409: * -> { line, intent, slots, ents, at, searchDir?, ambiguous, cd?, scoped?, fromTellsh?, opaque? }  (scoped: see scopedElsewhere)
445:  let scoped = false;
446:  const exportedScope = new Set(); // tools (git, docker, podman, gh) an `export VAR=…` earlier in the line pointed elsewhere
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
580:    // `gh pr view 45; export GH_REPO=other/repo`: the pull request is one of the old repository
588:    ...(intentStale ? { intentStale: true } : {}), ...(scoped ? { scoped: true } : {}), listed,
613:  // gh has no global options: GH_REPO / GH_HOST (also exported earlier in the line) point it at another repository
614:  gh: /^-R|^--repo(?:=|$)/,
616:// the tool an exported variable scopes, and the values that tool's commands name
617:const scopeTool = (x) => (/^GIT_/.test(x) ? 'git' : /^DOCKER_/.test(x) ? 'docker' : /^CONTAINER_/.test(x) ? 'podman' : 'gh');
618:const SCOPE_ENTS = { git: ['branch'], docker: ['container'], podman: ['container'], gh: ['pr', 'branch'] };
620:/** The scope variables a segment removes (`unset`, `export -n`, `Remove-Item Env:…`, `SetEnvironmentVariable(…)`), as `NAME=`. */
630:function scopedElsewhere(w, raw, exported = new Set()) {
691:  let scope = null;
698:      if (PROP_CWD.test(p)) scope = 'cwd';
703:    if (CWD_WRAPPERS.has(h)) { scope = 'cwd'; continue; }
706:    if (WRAPPER_CWD[cur]?.test(x)) scope = 'cwd';
708:  return scope;
710:/** The values of a scoped command (scopedElsewhere) as ambiguous: they name things in another repository / daemon. */
832:  } else if (head === 'gh' && nonFlags[0] === 'pr' && GH_PR_SELECTS.has(nonFlags[1])) {
833:    // `gh pr view 45`, `gh pr checkout feature/x`, `gh pr merge <url>`: the pull request ("merge that pr"); none named is
835:    // selector of the line is replaced: `gh pr view 45; gh pr view` is about the current branch's pull request)
840:  } else if (head === 'gh' && nonFlags[0] === 'pr') {
841:    // `gh pr list`, `gh pr status`, `gh pr create`: several pull requests, or one with no number yet
923:// gh pr subcommands whose operand selects one pull request, and the options of those that take a value
936: * -> { n, line, ents: {type: value}, entOrder, refOrder, searchRoots, listedDirs, last: {intent, slots, ambiguous, skipped, scoped},
945:export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
966:  const last = a.intent ? { intent: a.intent, slots: a.slots, ambiguous: !!a.ambiguous, skipped: !!a.intentStale, scoped: !!a.scoped } : null;
1090:  host: ['host', 'target'], url: ['url'], file: ['file', 'src', 'path'], dir: ['path', 'src'], pr: ['pr'],
1094:const NOT_REF = /\b(?:that|which|this)\s+(?:are|is|was|were|have|has|had|(?:contain|match|end|start|begin|use|take|listen|run|belong|need)(?:s|es|ed|d|ing)?|running|using|taking|ran|took|do|does|did|can|could|will|would|should|i|you|we|they)\b|\b(?:this|that|last|next)\s+(?:week|month|year|day|morning|evening|afternoon|night|time|hour|minute)s?\b/g;
1133:export function resolveReference(query, ctx) {
1147:    if (rt && ctx.last.scoped) {
1296:export function sameBut(query, ctx) {
1302:  for (const re of SAME_BUT) if (re.test(fq)) return { lastIntent: ctx.last.intent, lastSlots, blank, skipped: !!ctx.last.skipped, scoped: !!ctx.last.scoped };

exec
/bin/bash -lc "nl -ba src/danger.js | sed -n '420,650p'" in /workspace/tellsh
 succeeded in 0ms:
   420	          if (/^-(?:filter|include|exclude|depth|attributes)$/i.test(a[k])) { k++; continue; }
   421	          if (!/^-/.test(a[k])) targets.push(a[k]);
   422	        }
   423	        rootList = rec && targets.some(critTarget);
   424	      }
   425	      if (!rootList) continue;
   426	      const del = segs.slice(i + 1).some((s) => {
   427	        const h = (s[0] || '').replace(/^.*[\\/]/, '').toLowerCase();
   428	        return PS_REMOVE.test(h) || (h === 'xargs' && s.some((x) => /^(?:\S*\/)?(?:rm|shred)$/.test(x)));
   429	      });
   430	      if (del) hit('high', 'bulk deletion under /, ~ or a drive root', true);
   431	    }
   432	  }
   433	}
   434	
   435	// chmod/chown/chgrp -R on /, ~, * ... (options may come in any order: chmod -R -v 777 ~); without -R on /, ~ or a
   436	// system directory (`chmod 000 /`, `chmod 000 /etc`, `chown nobody /`): the system stops working
   437	function permCheck(w, hit) {
   438	  const a = w.slice(1);
   439	  const targets = positional(a).slice(1);
   440	  if (!a.some((x) => /^-[a-zA-Z]*R[a-zA-Z]*$/.test(x) || x === '--recursive')) {
   441	    if (targets.some((t) => TOP_DIR.test(normTarget(t)) || /^[A-Za-z]:[\\/]*$/.test(String(t).trim()))) hit('high', 'permission/owner change on / or a system directory', true);
   442	    else if (targets.some((t) => SYS_PATH.test(normTarget(t)) || /^(?:~|\$\{?HOME\}?)$/.test(normTarget(t)))) hit('high', 'changes permissions/owner of a system file or the home directory');
   443	    return;
   444	  }
   445	  if (targets.some(critTarget)) hit('high', 'recursive permission/owner change on /, ~ or *', true);
   446	}
   447	
   448	// / and the top-level system directories themselves
   449	const TOP_DIR = /^(?:\/|\/(?:bin|boot|dev|etc|home|lib\w*|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private))$/;
   450	// whole disk devices (writing to them destroys the filesystem on them)
   451	const RAW_DISK = /^\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk|rdisk|md|dm-|mapper\/|loop)\w*/;
   452	// tee/cp/install/sponge/pv … onto a whole disk device (`cat x | sudo tee /dev/sda`)
   453	function rawDiskWriteCheck(w, hit) {
   454	  if (positional(w.slice(1)).some((x) => RAW_DISK.test(normTarget(x)))) hit('high', 'writes onto a raw disk device', true);
   455	}
   456	
   457	// Interpreters running inline code (`python3 -c`, `perl -e`, `ruby -e`, `node -e`, `php -r`, awk programs that call
   458	// system()): the code is not shell and cannot be checked, so it is high. Its string literals are checked as commands
   459	// (`system("rm -rf /")`) and file-deleting calls on /, ~ or a system directory (`shutil.rmtree('/')`) are critical.
   460	const INTERP_CODE = [
   461	  [/^(?:python[\d.]*|pypy[\d.]*)$/, /^-[a-zA-Z]*c$/],
   462	  [/^perl[\d.]*$/, /^-[a-zA-Z]*[eE]$/],
   463	  [/^(?:ruby|jruby)[\d.]*$/, /^-[a-zA-Z]*e$/],
   464	  [/^(?:node|nodejs|bun)$/, /^(?:-e|-p|-pe|--eval|--print)$/],
   465	  [/^php[\d.]*$/, /^-r$/],
   466	  [/^(?:lua[\d.]*|luajit|julia|rscript|osascript|tclsh)$/, /^-e$/],
   467	];
   468	const AWK = /^(?:awk|gawk|mawk|nawk|busybox-awk)$/;
   469	const DELETE_CALL = /\b(?:rmtree|rm_rf|rm_r|rmdir|removedirs|rmSync|rmdirSync|unlink(?:Sync)?|remove|rm|delete|chmod|chown|chmodSync|chownSync)\s*\(?\s*(?:path\s*=\s*)?[rb]?['"]([^'"]*)['"]/g;
   470	function inlineCode(w) {
   471	  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
   472	  if (AWK.test(h)) {
   473	    const a = w.slice(1);
   474	    for (let i = 0; i < a.length; i++) {
   475	      if (/^-[Fvf]$/.test(a[i])) { if (a[i] === '-f') return null; i++; continue; }
   476	      if (/^-/.test(a[i])) continue;
   477	      return /\bsystem\s*\(|\|\s*getline|\b(?:print|printf)\b[^;}]*(?:>|\|)/.test(a[i]) ? { h, code: a[i] } : null;
   478	    }
   479	    return null;
   480	  }
   481	  if (h === 'deno' && w[1] === 'eval') return { h, code: w.slice(2).join(' ') };
   482	  const it = INTERP_CODE.find(([re]) => re.test(h));
   483	  if (!it) return null;
   484	  const i = w.findIndex((x, j) => j > 0 && it[1].test(x));
   485	  return i > 0 && w[i + 1] != null ? { h, code: String(w[i + 1]) } : null;
   486	}
   487	function interpCheck(w, hit) {
   488	  const ic = inlineCode(w);
   489	  if (!ic) return;
   490	  hit('high', `${ic.h} runs inline code; it cannot be checked`);
   491	  codeCheck(ic, hit);
   492	}
   493	const INTERP_HEAD = /^(?:python[\d.]*|pypy[\d.]*|perl[\d.]*|(?:j?ruby)[\d.]*|node|nodejs|bun|deno|php[\d.]*|lua[\d.]*|luajit|julia|rscript|osascript|tclsh|awk|gawk|mawk|nawk)$/;
   494	/**
   495	 * Code fed to a shell or an interpreter on stdin by a here-string or heredoc (`bash <<< 'rm -rf /'`,
   496	 * `python3 - <<< "import os; os.system('rm -rf /')"`, `python3 <<EOF`): a shell's here-string is checked as a
   497	 * command; interpreter code is high (cannot be checked) and its literals / delete calls are checked as for `-c`.
   498	 */
   499	function stdinCodeCheck(w, hit, inner) {
   500	  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
   501	  const shell = SHELLS.test(h);
   502	  if (!shell && !INTERP_HEAD.test(h)) return;
   503	  const hs = w.indexOf('<<<');
   504	  if (hs >= 0) {
   505	    const code = String(w[hs + 1] ?? '');
   506	    if (shell) { inner.push(code); return; }
   507	    hit('high', `${h} runs code from a here-string; it cannot be checked`);
   508	    codeCheck({ h, code }, hit);
   509	    return;
   510	  }
   511	  if (w.some((x) => /^<<-?\S/.test(String(x)) || x === '<<' || x === '<<-')) hit('high', `${h} runs a heredoc script; it cannot be checked`);
   512	}
   513	function codeCheck(ic, hit) {
   514	  const lits = [];
   515	  for (const m of ic.code.matchAll(/'([^']*)'|"([^"]*)"|`([^`]*)`|\bqq?\s*([{(\[])([^})\]]*)[})\]]/g)) lits.push(m[1] ?? m[2] ?? m[3] ?? m[5]);
   516	  for (const c of lits) {
   517	    if (!c || !c.trim()) continue;
   518	    const d = checkDanger(c, 'safe', { lenient: true });
   519	    for (const m of d.warnings) hit(d.risk, m, d.critical);
   520	  }
   521	  for (const m of ic.code.matchAll(DELETE_CALL)) if (critTarget(m[1]) || SYS_PATH.test(normTarget(m[1]))) hit('high', `${ic.h} code deletes or changes /, ~ or a system directory`, true);
   522	}
   523	
   524	// tar -x … -C / (or --directory=/): extracting over the root or home directory
   525	function tarCheck(w, hit) {
   526	  const a = w.slice(1);
   527	  const extract = a.some((x) => /^-[a-zA-Z]*x/.test(x) || x === '--extract' || x === '--get') || /^[a-wyzA-Z]*x[a-zA-Z]*$/.test(a[0] || '');
   528	  if (!extract) return;
   529	  const dirs = [];
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

exec
/bin/bash -lc "sed -n '390,595p' src/history.js; sed -n '936,987p' src/history.js; sed -n '1125,1210p' src/history.js" in /workspace/tellsh
 succeeded in 0ms:
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

exec
/bin/bash -lc 'cat scripts/hybrid/prune_vocab.py scripts/hybrid/lm_rerank.py' in /workspace/tellsh
 succeeded in 0ms:
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
/bin/bash -lc "cat scripts/hybrid/dump_cascade.js scripts/hybrid/sets.js; rg -n 'lm_rerank.py train|CPU|gold|empty|unlabel|labelled|labeled|vocab|prun' HYBRID.md | head -70; rg --files build/hybrid | head -40; cat test/hybrid.test.js" in /workspace/tellsh
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
4:Everything below was measured on one shared 8-vCPU box (Xeon Sapphire Rapids, heavily loaded by other jobs during the
16:  v0.3 A got **31.6%** of intents right (54.5% on intents the catalog already had); A+B 38.5%. 42% of the labelled
59:  recomputed for the new A_dev candidates (2644 dev rows, bf16 on CPU, same LoRA; the model itself was not retrained) and
91:  `scripts/real/group.js`) 552 of the 2957 labelled eval rows share a group with a train row. A's intent accuracy (cascade
177:Real-usage data: 3242 unique generic, verified commands (private; 838 labelled by a command pattern for the v0.4 intents, 928 by the dataset's catalog intent, 1476 out of catalog; 170 compound commands such as `sleep 30; cp …` dropped). Each command has up to 3 EN + 3 PL LLM-written requests. Split by command group (value-masked command skeleton; 360 of 1301 groups held out): train 7608 labelled rows (A/B use at most 120 per intent and language), eval 2957 labelled rows (1478 EN / 1479 PL; 1242 on v0.4 intents; 251 literal commands) + 2213 out-of-catalog rows.
274:  otherwise a 6-layer, PL+EN-vocabulary-pruned multilingual-e5-small (26.7 MB int8 ONNX, ~3.5 ms on one core) re-ranks
281:  A **LoRA fine-tune on CPU** (800 × 8 examples, ~55 min) makes it the most accurate re-ranker (A+C-ft **97.1%** on `data/eval`, 99.1% on blind).
292:| **B** | `intfloat/multilingual-e5-small`, vocabulary pruned to PL+EN pieces (250k -> 36k), bottom 6 of 12 layers, fine-tuned as joint tool (55) + intent (149) classifier + BIO slot tagger (37 labels); int8 ONNX | `onnxruntime-node` (or `-web`), own SentencePiece-Unigram tokenizer in JS (`src/rerank/tokenizer.js`, 12 364/12 364 sequences identical to HF) | 26.7 MB (21.7 MB .tgz) |
293:| **C** | System-1 decision model: Qwen2.5-0.5B-Instruct scores A's top-k candidates in **one forward pass** (prompt lists options A..E with catalog descriptions; next-token logits of the letters). Few-shot (2 examples, no training) and **C-ft** (LoRA r=16 fine-tuned on CPU, 800 steps × 8, plain prompt) | llama.cpp GGUF q8_0 (1 thread) | 531 MB |
304:  `scripts/eval.js`), `data/slots/gold` (208), `data/history/eval` (48), `data/ood_eval` (92).
306:  Windows paths, typos, Polish without diacritics, slang, gold slot spans). Written by a separate agent that saw only
414:### Slots (stage 3, gold intent given)
418:| `data/slots/gold` (208) | A tagger + regex (shipped) | 94.9% | 96.4% | **95.7%** | 95.9% | 95.4% |
419:| `data/slots/gold` (208) | A tagger only | 98.9% | 90.0% | **94.2%** | 95.0% | 93.4% |
420:| `data/slots/gold` (208) | B tagger + regex | 94.3% | 96.1% | **95.2%** | 96.5% | 93.8% |
421:| `data/slots/gold` (208) | B tagger only | 98.5% | 84.8% | **91.1%** | 93.2% | 89.0% |
459:### C: zero-/few-shot choice accuracy (gold forced among 5 shuffled candidates, 100 dev rows)
496:B bundle files: encoder.int8.onnx 26.7 MB, export_report.json 0.0 MB, labels.json 0.0 MB, manifest.json 0.0 MB, vocab.json 0.7 MB.
514:| B bundle (tellsh-model-enc): encoder.int8.onnx + vocab.json | 26.72 + 0.73 MB (21.7 MB .tgz) |
515:| B params: e5-small 117.6M -> PL+EN vocab 250002 -> 36357 pieces 35.6M -> 6 layers 25M | |
518:| C: Qwen2.5-0.5B GGUF | q8_0 531 MB, Q4_K_M 398 MB (+ llama.cpp CPU build 17.8 MB) |
541:**C.** One forward pass over a ~100-token prompt is cheap for a GPU but not for one CPU core: 0.24 s with q8_0 (AMX int8
542:helps a lot; Q4_K_M is 4× slower on this CPU), plus 1.4 s to load 531 MB. Zero-shot quality is too low (65%, Polish 59%).
550:(smoke test) / 3.5 ms (bench). 4-bit weights shrink it to 16 MB but lose 2 points. Pruning the vocabulary to Polish+English pieces
558:**Caveats.** The machine was shared and heavily loaded (load average 30–65 on 8 vCPUs) during all runs, so absolute
574:   label real-history / unlabelled requests with A+C-ft and distil into B (and A's training data) for v0.4. That should
604:python3 scripts/hybrid/prune_vocab.py                      # PL+EN vocabulary pruning of multilingual-e5-small
605:python3 scripts/hybrid/train_encoder.py --layers 6 --epochs 2.5   # B (resumable; ~1.2 h on 2 busy CPU threads)
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
build/hybrid/meta.json
build/hybrid/dev_texts.json
build/hybrid/policy_ft.json
build/hybrid/train_enc-v04-leak.log
build/hybrid/eval_after.log
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

exec
/bin/bash -lc "nl -ba src/danger.js | sed -n '650,705p'; nl -ba src/render.js | sed -n '100,250p'; git status --short" in /workspace/tellsh
 succeeded in 0ms:
   650	    interpCheck(w, hit);
   651	    stdinCodeCheck(w, hit, inner);
   652	    if (head === 'git' && w[1] === 'rm') hit('high', 'rm deletes files permanently (no trash)');
   653	    sysFileWriteCheck(w, head, hit);
   654	   }
   655	  }
   656	  if (flags.unsure) hit('high', flags.unsure);
   657	  if (flags.privileged) hit('medium', 'runs with root privileges');
   658	  // `-c` values of other programs: checked as commands, but a name like "$PAT" is not a command name there
   659	  for (const c of new Set(flags.lenient || [])) {
   660	    if (!c.trim() || inner.includes(c)) continue;
   661	    const d = checkDanger(c, 'safe', { lenient: true });
   662	    for (const m of d.warnings) hit(d.risk, m, d.critical);
   663	  }
   664	  pipelineDeleteCheck(text, hit);
   665	  for (const c of new Set(inner)) {
   666	    if (c === command || !c.trim()) continue;
   667	    const d = checkDanger(c);
   668	    for (const m of d.warnings) hit(d.risk, m, d.critical);
   669	  }
   670	  for (const [re, r, msg, crit] of RULES) if (re.test(text)) hit(r, msg, crit);
   671	  return { risk, warnings, critical };
   672	}
   100	/**
   101	 * Function templates for cmd.exe: a value starting with `/` is refused only where it is an argument of
   102	 * its own. Glued to a switch (`findstr /c:${q(pattern)}`) it cannot be read as one, so it is kept.
   103	 */
   104	function cmdTemplate(fn) {
   105	  if (!cmdTemplates.has(fn)) {
   106	    cmdTemplates.set(fn, (vals, q, ctx) => {
   107	      const held = [];
   108	      const q2 = (v, o) => {
   109	        try { return q(v, o); } catch (err) {
   110	          if (!(err instanceof SwitchValueError)) throw err;
   111	          held.push({ v, err });
   112	          return `\uE000${held.length - 1}\uE001`;
   113	        }
   114	      };
   115	      const out = fn(vals, q2, ctx);
   116	      return out.replace(CMD_HOLD, (m, i, at) => {
   117	        const h = held[+i];
   118	        if (!/\/\w+:$/.test(out.slice(0, at))) throw h.err;
   119	        return cmdQuote(h.v, { tilde: false, attached: true });
   120	      });
   121	    });
   122	  }
   123	  return cmdTemplates.get(fn);
   124	}
   125	
   126	/**
   127	 * -> { tpl, kind: 'posix'|'fish'|'pwsh'|'cmd', variant, wrapPosix?: boolean, gap?: string }
   128	 * wrapPosix: render the POSIX template and wrap it as `bash -c '...'` (PowerShell on unix).
   129	 */
   130	export function chooseTemplate(intent, env) {
   131	  const v = VARIANTS[intent.id] || {};
   132	  const shell = env.shell;
   133	  if (shell === 'fish') {
   134	    if (v.fish) return { tpl: v.fish, kind: 'fish', variant: 'fish' };
   135	    return { ...posixTemplate(intent, env), kind: 'fish' };
   136	  }
   137	  if (shell === 'powershell') {
   138	    const p = v.pwsh;
   139	    const win = env.os === 'win32';
   140	    const t = p == null ? null : typeof p === 'string' || typeof p === 'function' ? p : win ? p.win : p.unix;
   141	    if (t) return { tpl: t, kind: 'pwsh', variant: 'pwsh' };
   142	    if (!win) return { ...posixTemplate(intent, env), kind: 'pwsh', wrapPosix: true };
   143	    return { tpl: null, kind: 'pwsh', gap: v.gaps?.pwsh || 'no PowerShell equivalent on Windows yet' };
   144	  }
   145	  if (shell === 'cmd') {
   146	    if (v.cmd) return { tpl: typeof v.cmd === 'function' ? cmdTemplate(v.cmd) : v.cmd, kind: 'cmd', variant: 'cmd' };
   147	    return { tpl: null, kind: 'cmd', gap: v.gaps?.cmd || 'no cmd.exe equivalent yet (try PowerShell)' };
   148	  }
   149	  return { ...posixTemplate(intent, env), kind: 'posix' };
   150	}
   151	
   152	/**
   153	 * PowerShell 5.1 and pwsh < 7.3 ("Legacy" native argument passing) build a native program's command
   154	 * line by wrapping arguments with spaces in "..." without escaping embedded `"` (and a trailing `\`
   155	 * then escapes the closing quote); empty arguments are dropped. `\"` would be right for Legacy but
   156	 * wrong for 7.3+ (Standard/Windows), so no escaping is correct for both: values like that are refused
   157	 * for native programs (git, tar, curl.exe, ssh, ...) and the intent is reported as a gap. Cmdlets and
   158	 * .NET expressions receive the single-quoted literal unchanged and are not affected.
   159	 */
   160	export const unsafeNativePwshArg = (v) => { const s = String(v); return s === '' || s.includes('"') || (/\s/.test(s) && /\\$/.test(s)); };
   161	const PS_KEYWORDS = new Set(['if', 'elseif', 'else', 'foreach', 'for', 'while', 'do', 'switch', 'return', 'try', 'catch', 'finally']);
   162	/** Slots of a PowerShell string template that are arguments of a native program (not a cmdlet/expression). */
   163	export function pwshNativeSlots(tpl) {
   164	  const out = new Set();
   165	  if (typeof tpl !== 'string') return out;
   166	  // Placeholders are masked first (same length, so indices still line up): the `{` of an earlier
   167	  // slot must not be taken for a script-block brace, which made that placeholder look like the
   168	  // command head and skipped every later slot (`tar -czvf {archive} {path}`, `scp {target}:{dst}`).
   169	  const masked = tpl.replace(/\{(\w+)(!raw)?\}/g, (m) => '\u0001'.repeat(m.length)).replace(/[«»]/g, ' ');
   170	  for (const m of tpl.matchAll(/\{(\w+)(!raw)?\}/g)) {
   171	    if (m[2]) continue;
   172	    const seg = masked.slice(0, m.index).split(/[;|{}(]/).pop();
   173	    // the first word of the segment that is not (part of) a placeholder
   174	    const head = seg.trim().split(/\s+/).find((w) => w && !/\u0001/.test(w)) || '';
   175	    if (/^[A-Za-z][\w.-]*$/.test(head) && !/^[A-Za-z]+-[A-Za-z]+$/.test(head) && !PS_KEYWORDS.has(head.toLowerCase())) out.add(m[1]);
   176	  }
   177	  return out;
   178	}
   179	
   180	export const quoteForKind =(kind, wrapPosix) => (wrapPosix ? shQuote : { posix: shQuote, fish: fishQuote, pwsh: psQuote, cmd: cmdQuote }[kind]);
?? review/r23-claude.md
?? review/r23-codex.md

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

exec
/bin/bash -lc "nl -ba scripts/train.py | sed -n '40,175p'; nl -ba scripts/hybrid/train_encoder.py | sed -n '105,168p'" in /workspace/tellsh
 succeeded in 0ms:
    40	
    41	def load_cls(dim):
    42	    rows = [json.loads(l) for l in open(os.path.join(BUILD, 'cls.jsonl'), encoding='utf-8')]
    43	    indptr, indices, data = [0], [], []
    44	    for r in rows:
    45	        for k, v in r['f']:
    46	            indices.append(k)
    47	            data.append(v)
    48	        indptr.append(len(indices))
    49	    X = sparse.csr_matrix((np.array(data), np.array(indices), np.array(indptr)), shape=(len(rows), dim))
    50	    return rows, X
    51	
    52	
    53	def load_tag(dim):
    54	    seqs = [json.loads(l) for l in open(os.path.join(BUILD, 'tag.jsonl'), encoding='utf-8')]
    55	    indptr, indices, ys, gids, seq_of = [0], [], [], [], []
    56	    for si, s in enumerate(seqs):
    57	        for f, y in zip(s['f'], s['y']):
    58	            indices.extend(sorted(set(f)))
    59	            indptr.append(len(indices))
    60	            ys.append(y)
    61	            gids.append(s['gid'])
    62	            seq_of.append(si)
    63	    X = sparse.csr_matrix((np.ones(len(indices)), np.array(indices), np.array(indptr)), shape=(len(ys), dim))
    64	    return seqs, X, np.array(ys), np.array(gids), np.array(seq_of)
    65	
    66	
    67	# ---------------------------------------------------------------------------------------------
    68	# model helpers
    69	
    70	class Compact:
    71	    """LogisticRegression fitted on the non-empty columns only; exposes full-width coef."""
    72	
    73	    def __init__(self, clf, cols, dim, labels):
    74	        self.clf, self.cols, self.labels = clf, cols, list(labels)
    75	        self.coef = np.zeros((len(self.labels), dim))
    76	        if len(self.labels) == 2 and clf.coef_.shape[0] == 1:  # binary: expand to 2 classes
    77	            self.coef[1, cols] = clf.coef_[0] / 2
    78	            self.coef[0, cols] = -clf.coef_[0] / 2
    79	            self.bias = np.array([-clf.intercept_[0] / 2, clf.intercept_[0] / 2])
    80	        else:
    81	            self.coef[:, cols] = clf.coef_
    82	            self.bias = clf.intercept_.copy()
    83	
    84	    def proba(self, X):
    85	        z = X @ self.coef.T + self.bias
    86	        z -= z.max(1, keepdims=True)
    87	        e = np.exp(z)
    88	        return e / e.sum(1, keepdims=True)
    89	
    90	
    91	def fit(X, y, C, w=None, max_iter=1000):
    92	    cols = np.flatnonzero(np.asarray((X != 0).sum(0)).ravel())
    93	    labels = sorted(set(y))
    94	    clf = LogisticRegression(C=C, max_iter=max_iter, tol=1e-4)
    95	    clf.fit(X[:, cols], y, sample_weight=w)
    96	    assert list(clf.classes_) == labels
    97	    return Compact(clf, cols, X.shape[1], labels)
    98	
    99	
   100	def prune_refit(X, y, C, keep, w=None):
   101	    """Fit, keep the `keep` feature rows with the largest weight norm, refit on those rows only."""
   102	    m = fit(X, y, C, w)
   103	    norms = np.sqrt((m.coef ** 2).sum(0))
   104	    used = np.flatnonzero(norms > 0)
   105	    k = min(keep, len(used))
   106	    rows = np.sort(used[np.argsort(-norms[used])[:k]])
   107	    mask = np.zeros(X.shape[1], bool)
   108	    mask[rows] = True
   109	    Xr = X.multiply(mask[None, :]).tocsr() if k < len(used) else X
   110	    m2 = fit(Xr, y, C, w)
   111	    W = m2.coef[:, rows].T  # (rows, classes)
   112	    return {'labels': m2.labels, 'rows': rows, 'W': W, 'b': m2.bias, 'model': m2}
   113	
   114	
   115	def quantize(W):
   116	    scale = np.abs(W).max(axis=0) / 127.0
   117	    scale[scale == 0] = 1.0
   118	    Q = np.clip(np.round(W / scale), -127, 127).astype(np.int8)
   119	    return Q, scale.astype(np.float32)
   120	
   121	
   122	# ---------------------------------------------------------------------------------------------
   123	# cascade
   124	
   125	def cascade_scores(p_tool, tool_labels, intent_models, X, fam_intents, k=3):
   126	    """For each row: best (intent, score, tool_p, tool) using top-k tools; score = p(tool)*p(intent|tool)."""
   127	    out = []
   128	    none = tool_labels.index('__none__') if '__none__' in tool_labels else -1
   129	    cache = {}
   130	    for fam, m in intent_models.items():
   131	        cache[fam] = m.proba(X)
   132	    for r in range(X.shape[0]):
   133	        order = np.argsort(-p_tool[r])
   134	        best = (None, 0.0, 0.0, None)
   135	        cand = [t for t in order if t != none][:k]
   136	        for t in cand:
   137	            fam = tool_labels[t]
   138	            pt = p_tool[r, t]
   139	            if fam in cache:
   140	                pi = cache[fam][r]
   141	                j = int(np.argmax(pi))
   142	                s, intent = pt * pi[j], intent_models[fam].labels[j]
   143	            else:
   144	                s, intent = pt, fam_intents[fam][0]
   145	            if s > best[1]:
   146	                best = (intent, s, pt, fam)
   147	        top_tool = tool_labels[order[0]]
   148	        out.append((best[0], best[1], p_tool[r, order[0]], top_tool, [tool_labels[t] for t in cand]))
   149	    return out
   150	
   151	
   152	def train_all(rows, X, meta, idx, C, keep_tool, keep_int, log_prefix=''):
   153	    """Train tool + intent models on row subset idx."""
   154	    y_tool = np.array([rows[i]['y'] for i in idx])
   155	    w = np.array([rows[i]['w'] for i in idx], dtype=float)
   156	    Xs = X[idx]
   157	    t0 = time.time()
   158	    tool = prune_refit(Xs, y_tool, C, keep_tool, w)
   159	    log(f'{log_prefix}tool model: {len(tool["labels"])} classes, {len(tool["rows"])} rows ({time.time() - t0:.0f}s)')
   160	    intents = {}
   161	    for fam, ids in meta['intentsByFamily'].items():
   162	        if len(ids) < 2:
   163	            continue
   164	        sub = [i for i in idx if rows[i]['y'] == fam and rows[i]['i']]
   165	        ys = np.array([rows[i]['i'] for i in sub])
   166	        if len(set(ys)) < 2:
   167	            continue
   168	        intents[fam] = prune_refit(X[sub], ys, C, keep_int(len(ids)), np.array([rows[i]['w'] for i in sub], dtype=float))
   169	    log(f'{log_prefix}intent models: {len(intents)} families ({time.time() - t0:.0f}s)')
   170	    return tool, intents
   171	
   172	
   173	def main():
   174	    ap = argparse.ArgumentParser()
   175	    ap.add_argument('--C', type=float, default=30.0)
   105	    torch.set_num_threads(a.threads)
   106	    random.seed(a.seed)
   107	    torch.manual_seed(a.seed)
   108	    meta = json.load(open(os.path.join(ROOT, 'build/hybrid/meta.json')))
   109	    rows = [json.loads(l) for l in open(os.path.join(ROOT, 'build/hybrid/train.jsonl'), encoding='utf-8')]
   110	    rows = [r for r in rows if a.all or r['split'] == 'train']
   111	    tok = AutoTokenizer.from_pretrained(a.base)
   112	    data = encode(tok, rows, meta)
   113	    model = Joint(a.base, len(meta['tools']), len(meta['intents']), len(meta['tagLabels']), a.layers)
   114	    head_params = [p for n, p in model.named_parameters() if not n.startswith('enc.')]
   115	    enc_params = [p for n, p in model.named_parameters() if n.startswith('enc.')]
   116	    opt = torch.optim.AdamW([{'params': enc_params, 'lr': a.lr}, {'params': head_params, 'lr': a.lr * 10}], weight_decay=0.01)
   117	    steps_per_epoch = math.ceil(len(data) / a.bs)
   118	    total = int(steps_per_epoch * a.epochs)
   119	    warm = int(0.06 * total)
   120	    sched = torch.optim.lr_scheduler.LambdaLR(opt, lambda s: min(1, (s + 1) / max(1, warm)) * max(0.0, (total - s) / max(1, total - warm)))
   121	    os.makedirs(a.out, exist_ok=True)
   122	    ck = os.path.join(a.out, 'ckpt.pt')
   123	    step = 0
   124	    if os.path.exists(ck):
   125	        st = torch.load(ck, map_location='cpu', weights_only=False)
   126	        model.load_state_dict(st['model']); opt.load_state_dict(st['opt']); sched.load_state_dict(st['sched']); step = st['step']
   127	        print(f'resumed at step {step}/{total}', flush=True)
   128	    ce = nn.CrossEntropyLoss(ignore_index=-100)
   129	    pad = tok.pad_token_id
   130	    t0 = time.time()
   131	    model.train()
   132	    while step < total:
   133	        ep = step // steps_per_epoch
   134	        order = list(range(len(data)))
   135	        random.Random(a.seed + ep).shuffle(order)
   136	        # length-bucketed batches for speed
   137	        chunks = [order[i:i + a.bs * 50] for i in range(0, len(order), a.bs * 50)]
   138	        batches = []
   139	        for c in chunks:
   140	            c = sorted(c, key=lambda i: len(data[i]['ids']))
   141	            batches += [c[i:i + a.bs] for i in range(0, len(c), a.bs)]
   142	        random.Random(a.seed + 1000 + ep).shuffle(batches)
   143	        for bi in range(step - ep * steps_per_epoch, len(batches)):
   144	            if step >= total:
   145	                break
   146	            ids, att, yt, yi, ytag = collate([data[i] for i in batches[bi]], pad)
   147	            lt, li, lg = model(ids, att)
   148	            loss = ce(lt, yt) + (ce(li, yi) if (yi >= 0).any() else 0) + 0.5 * (ce(lg.reshape(-1, lg.shape[-1]), ytag.reshape(-1)) if (ytag >= 0).any() else 0)
   149	            opt.zero_grad()
   150	            loss.backward()
   151	            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
   152	            opt.step(); sched.step(); step += 1
   153	            if step % 50 == 0:
   154	                el = time.time() - t0
   155	                print(f'step {step}/{total} ep {ep} loss {loss.item():.4f} {el:.0f}s', flush=True)
   156	            if step % a.ckpt_every == 0 or step == total or bi == len(batches) - 1:
   157	                torch.save({'model': model.state_dict(), 'opt': opt.state_dict(), 'sched': sched.state_dict(), 'step': step}, ck + '.tmp')
   158	                os.replace(ck + '.tmp', ck)
   159	    model.eval()
   160	    torch.save(model.state_dict(), os.path.join(a.out, 'final.pt'))
   161	    tok.save_pretrained(a.out)
   162	    json.dump({'base': a.base, 'layers': a.layers, 'epochs': a.epochs, 'rows': len(data), 'all': a.all, 'meta': meta}, open(os.path.join(a.out, 'train_info.json'), 'w'))
   163	    print('done', flush=True)
   164	
   165	
   166	if __name__ == '__main__':
   167	    main()

exec
/bin/bash -lc "rg -n 'urls|URL|HOST' src/slots.js | head -40; nl -ba src/fill.js | sed -n '126,240p'; sed -n '271,292p' src/pipeline.js; sed -n '370,392p' src/pipeline.js; sed -n '597,642p' README.md" in /workspace/tellsh
 succeeded in 0ms:
198: * @returns object with: quoted[], urls[], hosts[], target, paths[], count, size, duration, port, pid, mode,
204:  const out = { text, quoted: [], urls: [], hosts: [], paths: [], numbers: [], spans: [] };
229:  // 2. URLs and git remotes
232:    out.urls.push(u);
233:    mark('URL', m.index, m.index + u.length, u);
242:    mark('HOST', m.index, m.index + v.length, v);
247:    mark('HOST', m.index, m.index + m[1].length, m[1]);
269:          mark('HOST', start, start + raw.length, raw);
285:    mark('HOST', m.index, m.index + m[0].length, out.hosts[out.hosts.length - 1]);
308:    if (m && !/^(PID|CPU|RAM|GPU|USB|DNS|IP|URL|HTTP|HTTPS|SSH|TCP|UDP|OS|PDF|JSON|CSV|MD5|SHA|SHA256|GB|MB|KB|TB|II|PL|EN|README|TODO|FIXME|ERROR|WARN|INFO|DEBUG|HEAD|API|SQL|AWS|GCP)$/.test(m[1])) {
   126	// "qa_1"); another ("to v2", "to the worker-2 script") is withheld, never made up
   127	const WR_ENV_STEM = /^(?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)(?=[\d_-])|[\d_-](?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)$/i;
   128	// a quoted value is decoded (its quotes are not part of the name); a word loses the punctuation after it
   129	const wrEnvWord = (w) => {
   130	  const s = String(w);
   131	  return /^["'`„“”]/.test(s) && s.length > 1 && /["'`“”]$/.test(s) ? s.slice(1, -1) : s.replace(/[.,!?;:]+$/, '');
   132	};
   133	const wrQuoted = (w) => /^["'`„“”]/.test(String(w));
   134	// a marked name: letters with a digit, '-' or '_' ("staging-eu", "preview2"), not "2-3" or "src/worker.js"
   135	const wrEnvMarked = (w) => RAW_OK.wenv(w) && /[A-Za-z]/.test(w) && /[\d_-]/.test(w);
   136	/** The wrangler environment a deploy request names: a name, `?` (named, not readable) or null (the default). */
   137	function wranglerEnv(t) {
   138	  const o = t.match(WR_ENV_OPT);
   139	  if (o) { const w = wrEnvWord(o[1]); return RAW_OK.wenv(w) ? w : '?'; }
   140	  for (const m of t.matchAll(WR_ENV_AFTER)) {
   141	    const w = wrEnvWord(m[2]);
   142	    if (WR_ENV_KNOWN.test(w) || wrEnvMarked(w) || ((m[1] || wrQuoted(m[2])) && RAW_OK.wenv(w))) return w;
   143	    if (wrQuoted(m[2])) return '?';
   144	  }
   145	  for (const m of t.matchAll(WR_ENV_BEFORE)) {
   146	    if (WR_ENV_KNOWN.test(m[1]) || wrEnvMarked(m[1])) return m[1];
   147	  }
   148	  for (const m of t.matchAll(WR_ENV_PREP)) {
   149	    const prep = m[1].toLowerCase();
   150	    const w = wrEnvWord(m[2]);
   151	    const q = wrQuoted(m[2]);
   152	    if (prep === 'for' || prep === 'dla') {
   153	      if (WR_ENV_STRONG.test(w) && (!m[3] || WR_ENV_END.test(m[3]) || /^[.,!?;:]/.test(m[2].slice(w.length)))) return w;
   154	      if (WR_ENV_KNOWN.test(w) || wrEnvMarked(w) || q) return '?';
   155	      continue;
   156	    }
   157	    if (WR_ENV_KNOWN.test(w)) return w;
   158	    if (/^(?:to|into|na|do)$/.test(prep)) {
   159	      if (wrEnvMarked(w)) return WR_ENV_STEM.test(w) ? w : '?';
   160	      // 'to "my env"', 'to "cloudflare"': another quoted value is withheld, never dropped
   161	      if (q) return '?';
   162	    }
   163	  }
   164	  return WR_ENV_ANY.test(t) ? '?' : null;
   165	}
   166	/**
   167	 * The pull request the user names (quoted: kept as written, validation withholds an odd one), else null (`gh pr merge`
   168	 * acts on the current branch's pull request). A number elsewhere in the request ("merge pr with 2 approvals", "merge the
   169	 * 2 open prs") is never the pull request; a request that names something the parser cannot read (`bob's`, `in repo v2`)
   170	 * is withheld (`?`, shown as `<PR>`), never a bare `gh pr merge`.
   171	 */
   172	function prSelector(ex) {
   173	  const text = String(ex.text);
   174	  if (ex.urls[0] != null) {
   175	    // "merge pr <url>", "merge <url>", "view the pull request at <url>": the URL is the pull request; "the pr that depends
   176	    // on <url>" names a related one (withheld, never the URL's)
   177	    const at = text.indexOf(ex.urls[0]);
   178	    return at < 0 || PR_URL_LEAD.test(text.slice(0, at)) ? ex.urls[0] : '?';
   179	  }
   180	  const m = text.match(PR_SELECTOR);
   181	  if (m) {
   182	    const quoted = m[2] ?? m[3] ?? m[4] ?? m[5];
   183	    if (quoted != null) return quoted || '?'; // `""`: named but empty, withheld
   184	    if (m[7] != null) return '?'; // an unclosed / odd quote: withheld
   185	    const w = m[6];
   186	    const branch = /\bbranch\s+$/i.test(m[1]);
   187	    // "merge my pr from 2 days ago", "view pr for 3 days": a number after a connective is not the pull request
   188	    if (PR_ISSUE.test(w)) return '?';
   189	    const rest = text.slice(m.index + m[0].length);
   190	    if (/^#?\d+$/.test(w) && PR_UNIT_AFTER.test(rest)) return '?';
   191	    if (/^\d+$/.test(w)) return branch || PR_NUMBER_LEAD.test(m[1]) ? w : '?';
   192	    // "merge the pr for #12": the pull request for issue 12, or pull request 12
   193	    if (/^#\d+$/.test(w) && !PR_NUMBER_LEAD.test(m[1])) return '?';
   194	    if (PR_ABBREV.test(w) || (PR_HOST.test(w) && !branch)) return '?';
   195	    if (PR_MARKED.test(w)) return w;
   196	    // "merge pr for branch status": after "branch" any word is the selector, a describing one is withheld
   197	    if (branch) return PR_NOT_SELECTOR.test(w) ? `?${w}` : w;
   198	    if (!PR_NOT_SELECTOR.test(w)) {
   199	      // "merge pr for fix #12": the word is followed by a number, so it may describe rather than name the branch
   200	      if (/\b(?:for|from)\s+$/i.test(m[1])) return /\d/.test(rest) || PR_WHEN.test(w) ? `?${w}` : w;
   201	      // "merge pr main": a bare word may be a branch or say something else: withheld (`gh pr merge <PR>`), never dropped
   202	      return `?${w}`;
   203	    }
   204	  }
   205	  const hash = text.match(/(?:^|\s)#(\d{1,12})(?=[\s.,!?;:]|$)/);
   206	  if (hash && PR_HASH_LEAD.test(text.slice(0, hash.index + hash[0].indexOf('#')))) return hash[1];
   207	  const p = text.match(PR_WORD);
   208	  const after = p ? text.slice(p.index + p[0].length) : '';
   209	  const before = p ? text.slice(0, p.index) : '';
   210	  // 'merge the pr with label "urgent"', 'the pr titled "fix"': a quoted description, not the pull request (withheld)
   211	  if (ex.quoted.length && (PR_DESCRIBED.test(after) || PR_QUALIFIED.test(after))) return '?';
   212	  // 'merge the "feature/login" pull request': an explicitly quoted value is the target
   213	  if (ex.quoted.length) return ex.quoted[0];
   214	  // named but not readable: a number anywhere ("merge the 2 open prs", "merge pr in 2 minutes"), or a marked word or a
   215	  // quote after "pr" ("merge pr bob's", "merge pr feature/x's", "merge pr in repo v2"): withheld
   216	  const det = before.match(PR_DET_WORD);
   217	  if (PR_ANAPHOR.test(before) || (det && det[1].trim().split(/\s+/).some((x) => !PR_DET_NEUTRAL.test(x))) || (p && prWordBefore(before))) return '?';
   218	  if (PR_DESCRIBED.test(after) || prPickedAfter(after)) return '?';
   219	  const numbers = !/\d/.test(text) && (ex.numbers?.length ?? 0) <= [...text.matchAll(PR_DEM_NUMBER)].length ? [] : ex.numbers || [];
   220	  if (numbers.length || /\d/.test(text) || /[/_#'"`„“”’]|\w[.-]\w/.test(after) || PR_BRANCH_NAMED.test(after) || PR_QUALIFIED.test(after)) return '?';
   221	  return null;
   222	}
   223	// "--repo a/b", "-R a/b", "in (the) repo(sitory) a/b", "in the a/b repo"; "in the other repo", "in another repository": named,
   224	// not readable ("this repo", "the current repository" are the working directory's)
   225	const PR_REPO_OPT = /(?:^|\s)(?:--repo(?:=|\s+|$)|-R(?:=|\s*))(\S*)/;
   226	const PR_REPO = /\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(?:github\s+)?(?:repo|repository|repozytorium)\s+(\S+)|\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(\S+(?:\s+\S+)?)\s+(?:github\s+)?(?:repo|repository)\b|\b(?:w|z)\s+repozytorium\s+(\S+)/i;
   227	// "this repo", "the repo", "my current repo", "our own repository": the working directory's
   228	const PR_REPO_HERE = /^(?:the|a|an|this|current|same|our|my|local|own|tym|tego|bieżącym|biezacym)(?:\s+(?:current|same|local|own))?$/i;
   229	// "org/repo#7": a repository and a pull request in one word
   230	const PR_REPO_HASH = /(?:^|\s)((?:https:\/\/)?(?:[\w-]+(?:\.[\w-]+)+\/)?[\w.-]+\/[\w.-]+)#(\d{1,12})(?=[\s.,!?;:]|$)/;
   231	// "merge pr 7 in other/repo", "of org/repo", "on github.com/org/repo", "at https://github.com/org/repo": a repository
   232	// without the word "repo" (a value gh -R takes); right after "pr for" / "pr from" / … the word is the branch selector
   233	const PR_REPO_PREP = /(?:^|\s)(in|of|on|from|for|at|to)\s+(?:the\s+)?(?:github\s+)?(\S+)/gi;
   234	const PR_SELECTOR_SPOT = /\b(?:pull[\s-]+requests?|pr|prs)\s+(?:(?:for|of|on|from|branch|number|no\.?|nr\.?|(?:the|a|my|our)(?=\s+branch\b))\s+)*$/i;
   235	const repoValue = (w) => w.replace(/[.,!?;:]+$/, '').replace(/^["'`]|["'`]$/g, '').replace(/^https:\/\/(?=github\.com\/)/i, '').replace(/(?:\.git)?\/?$/, '');
   236	/** The repository a gh pr request names: { repo (a value, or `?` when it is not readable), rest (the text without it), pr } or null. */
   237	function prRepo(text) {
   238	  const cut = (i, len, put = ' ') => (text.slice(0, i) + put + text.slice(i + len)).replace(/\s+/g, ' ').trim();
   239	  const h = text.match(PR_REPO_HASH);
   240	  if (h && RAW_OK.repo(repoValue(h[1]))) {
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

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest,resolveWithTagger} from './src/pipeline.js';
import {extractSlots} from './src/slots.js';
const qs = ['merge pr 45 in repo \"https://github.com/acme/app\"','merge pr 45 --repo https://github.com/acme/app','deploy worker on preview2','deploy worker in qa_1','deploy worker to \"qa_1\"','deploy worker env customer','deploy worker --env prod --env staging','set worker secret API_KEY in staging','set worker secret API_KEY --env staging','create a pr in repo acme/app','show pr checks for 45','merge pr 45 without merging it','dry-run merge pr 45','deploy worker but do not deploy','merge pr 45 from https://github.com/acme/app/pull/12'];
for (const q of qs) {const r = suggest(q,{shell:'bash',os:'linux'}); console.log(JSON.stringify({q,cmd:r.command,missing:r.missing,risk:r.risk,method:r.method,conf:r.confidence}));}
console.log(extractSlots('merge pr 45 --repo https://github.com/acme/app').urls)
JS" in /workspace/tellsh
 succeeded in 113ms:
{"q":"merge pr 45 in repo \"https://github.com/acme/app\"","cmd":"gh pr merge 45 --repo github.com/acme/app","missing":[],"risk":"medium","method":"catalog","conf":0.9081}
{"q":"merge pr 45 --repo https://github.com/acme/app","cmd":"gh pr merge 45 --repo github.com/acme/app","missing":[],"risk":"medium","method":"catalog","conf":0.9081}
{"q":"deploy worker on preview2","cmd":"npx wrangler deploy","missing":[],"risk":"medium","method":"catalog","conf":0.9867}
{"q":"deploy worker in qa_1","cmd":"npx wrangler deploy","missing":[],"risk":"medium","method":"catalog","conf":0.9865}
{"q":"deploy worker to \"qa_1\"","cmd":"npx wrangler deploy --env qa_1","missing":[],"risk":"medium","method":"catalog","conf":0.9962}
{"q":"deploy worker env customer","cmd":"npx wrangler deploy --env <WENV>","missing":["wenv"],"risk":"medium","method":"catalog","conf":0.9833}
{"q":"deploy worker --env prod --env staging","cmd":"npx wrangler deploy --env prod","missing":[],"risk":"medium","method":"catalog","conf":0.9135}
{"q":"set worker secret API_KEY in staging","cmd":"npx wrangler secret put API_KEY","missing":[],"risk":"medium","method":"catalog","conf":0.9965}
{"q":"set worker secret API_KEY --env staging","cmd":"npx wrangler secret put API_KEY","missing":[],"risk":"medium","method":"catalog","conf":0.998}
{"q":"create a pr in repo acme/app","cmd":"gh pr create --fill","missing":[],"risk":"medium","method":"catalog","conf":0.9628}
{"q":"show pr checks for 45","cmd":"gh pr checks <PR>","missing":["pr"],"risk":"safe","method":"catalog","conf":0.9993}
{"q":"merge pr 45 without merging it","cmd":"gh pr merge 45","missing":[],"risk":"medium","method":"catalog","conf":0.9988}
{"q":"dry-run merge pr 45","cmd":"gh pr merge 45","missing":[],"risk":"medium","method":"catalog","conf":0.9932}
{"q":"deploy worker but do not deploy","cmd":"npx wrangler deploy","missing":[],"risk":"medium","method":"catalog","conf":0.998}
{"q":"merge pr 45 from https://github.com/acme/app/pull/12","cmd":"gh pr merge 45","missing":[],"risk":"medium","method":"catalog","conf":0.9245}
[ 'https://github.com/acme/app' ]

exec
/bin/bash -lc "rg -n 'SCRIPT_SYNONYMS|script' src/slots.js | tail -25; sed -n '430,490p' src/slots.js; node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
for (const q of ['run npm script deploy:staging','npm run test:integration','run the test:integration script','npm run build:dev','npm run prebuild','npm run restart','run script test-ci','install react-dom with npm','pip install -r requirements.txt','install python packages from requirements.txt','npm ci','activate venv /tmp/myenv']) {let r=suggest(q,{shell:'bash',os:'linux'});console.log(JSON.stringify({q,cmd:r.command,intent:r.intent,missing:r.missing,slots:r.slots}));}
JS" in /workspace/tellsh
 succeeded in 122ms:
45:  python: 'py', pythona: 'py', pythonowe: 'py', javascript: 'js', javascriptowe: 'js', typescript: 'ts',
46:  typescriptowe: 'ts', markdown: 'md', markdownowe: 'md', tekstowe: 'txt', tekstowych: 'txt', tekstowy: 'txt',
56:const FILE_WORDS = /\b(files?|plik\w*|scripts?|skrypt\w*|sources?|zrodl\w*|documents?|dokument\w*)\b/;
75:// package.json script names and command-line tools people ask about (npm run X, X --version, X --help)
83:const SCRIPT_SYNONYMS = [
90:// words between the install verb and the package name ("install globally the typescript package with npm")
486:  script: set('run uruchom odpal odpalic puść pusc wykonaj execute script skrypt skryptu skrypty npm'),
506:const TAG_OF = { name: 'NAME', service: 'NAME', container: 'NAME', pkg: 'NAME', cmd: 'NAME', script: 'NAME', branch: 'BRANCH',
527:    : slot === 'script' ? KNOWN_SCRIPTS : slot === 'cmd' ? KNOWN_TOOLS : null;
528:  if (['pattern', 'message', 'text', 'name', 'service', 'container', 'pkg', 'cmd', 'branch', 'user', 'script'].includes(slot) && quoted.length) {
564:    // "pip install requests", "npm i -g typescript": the installer is not the package, unless nothing else is named
575:    // "install typescript@^5.4 with npm": a versioned requirement right after the install verb is the package
596:  if (slot === 'script') {
598:    for (const [re, name] of SCRIPT_SYNONYMS) if (re.test(ex.rest ?? text)) return name;
599:    // an unknown name only when the request calls it a script ("run the storybook:ci script", "skrypt deploy-all")
600:    if (!/\b(scripts?|skrypt\w*|npm run)\b/.test(ex.rest ?? text)) return null;
601:    const r = nextAfter(words, TRIG.script, { skip: new Set([...STOP, 'npm', 'script', 'skrypt', 'skryptu', 'the']), accept: /^[\w:.-]+$/ });
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
{"q":"run npm script deploy:staging","cmd":"npm run deploy:staging","intent":"npm_run_script","missing":[],"slots":{"script":"deploy:staging"}}
{"q":"npm run test:integration","cmd":"npm run test:integration","intent":"npm_run_script","missing":[],"slots":{"script":"test:integration"}}
{"q":"run the test:integration script","cmd":"npm run test:integration","intent":"npm_run_script","missing":[],"slots":{"script":"test:integration"}}
{"q":"npm run build:dev","cmd":"npm run build:dev","intent":"npm_run_script","missing":[],"slots":{"script":"build:dev"}}
{"q":"npm run prebuild","cmd":"npm run prebuild","intent":"npm_run_script","missing":[],"slots":{"script":"prebuild"}}
{"q":"npm run restart","cmd":"npm run <SCRIPT>","intent":"npm_run_script","missing":["script"],"slots":{}}
{"q":"run script test-ci","cmd":"npm run test-ci","intent":"npm_run_script","missing":[],"slots":{"script":"test-ci"}}
{"q":"install react-dom with npm","cmd":"npm install react-dom","intent":"npm_install","missing":[],"slots":{"pkg":"react-dom"}}
{"q":"pip install -r requirements.txt","cmd":"python3 -m pip install <PKG>","intent":"pip_install","missing":["pkg"],"slots":{}}
{"q":"install python packages from requirements.txt","cmd":"python3 -m pip install python","intent":"pip_install","missing":[],"slots":{"pkg":"python","glob":"*.py"}}
{"q":"npm ci","cmd":"npm install npm","intent":"npm_install","missing":[],"slots":{"pkg":"npm"}}
{"q":"activate venv /tmp/myenv","cmd":". /tmp/myenv/bin/activate","intent":"activate_venv","missing":[],"slots":{"path":"/tmp/myenv"}}

exec
/bin/bash -lc 'node --test test/regressions3-history.test.js test/regressions3-render.test.js test/slots.test.js test/compose.test.js test/shells.test.js' in /workspace/tellsh
 exited 1 in 3747ms:
TAP version 13
# Subtest: /workspace/tellsh/test/compose.test.js
ok 1 - /workspace/tellsh/test/compose.test.js
  ---
  duration_ms: 444.904138
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 2 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 289.340843
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 3 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 305.12683
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 4 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 3751.413867
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 5 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 238.171402
  ...
1..5
# tests 5
# suites 0
# pass 4
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 3766.005771

exec
/bin/bash -lc "rg -n 'scope|wrangler|limitations|limit|history|dry.run|literal|unsupported|gh pr|npm ci' README.md | tail -80; nl -ba src/catalog.js | sed -n '257,296p'; sed -n '1,140p' test/devtools.test.js" in /workspace/tellsh
 succeeded in 0ms:
22:$ tellsh --history logi tego kontenera
25:  ↺ from history: "container" from history = web
49:  -n, --dry-run        print the command only, never run it
51:                       history-resolved, composed, incomplete or medium/high-risk ones)
52:  -e, --explain        tool/intent scores, slots and where each slot came from (tagger/regex/history)
53:      --json           machine-readable output (implies --dry-run)
56:      --history[=FILE] resolve "it", "that container", "same for /var" from the previous command
78: request ─► normalise │  ctx: history entities + cwd (--history, in memory only)                 │
81:   │   history rules ──────────────► "same for X" / "delete it" / "same but …" (deterministic)
108:  `__none__`, and synthetic history anaphora with `ctx_` features. **Tagger data** is generated by delexicalising every
126:| fish | best effort | POSIX template with fish quoting + fish overrides (`string join \n $PATH`, history, …); not syntax-checked (fish not installed in CI) |
138:(`sed -n 'N,Mp'`, `Get-Content … -Index` in PowerShell), SSH local port forwarding, Cloudflare `wrangler`
139:(deploy, dev, tail, secret put, login, whoami; a dry run and an environment are kept, `do a dry run of wrangler deploy` ->
140:`npx wrangler deploy --dry-run`, `deploy worker to staging` -> `npx wrangler deploy --env staging`, `for production` ->
143:gives `--env <WENV>`) and the GitHub CLI (`gh auth`, `gh pr list/view/create/checks/merge`,
144:`gh run list/view`; a pull request the request names, by number, URL or branch, is passed on: `gh pr merge
145:feature/login`, also quoted, `merge pull request "feature/login"`, never a bare `gh pr merge` for the current branch's
146:pull request; a word that may not be a branch, `merge pr main`, gives `gh pr merge <PR>`, while `feature/apply` or
148:`merge pr for issue #45` and `merge the pr that closes #12` give `gh pr merge <PR>`; so do a pull request picked out by
152:https://github.com/o/r/pull/12`); plain `merge the pr`, `merge pr on github` stay `gh pr merge`); "merge that pr" after `gh pr view 45`
153:gives `gh pr merge 45`, after any other command, a trailing `cd` or under `GH_REPO` `gh pr merge <PR>`; `merge the other pr`
154:or `merge my last pr` give `gh pr merge <PR>`; a named repository is kept, `merge pr 45 in repo a/b` -> `gh pr merge 45 --repo a/b`). A package version constraint is kept
155:(`install requests==2.32.0 with pip` -> `python3 -m pip install requests==2.32.0`). Installs, project scripts (also every `npx wrangler` command: `npx` prefers a project-local binary,
156:and `wrangler dev` runs the project's build command), deploys, merges, secrets and tunnels are `medium` risk, so `--yes`
170:`--history` (or `TELLSH_HISTORY=1`) reads the **tail** (last 32 KB) of `$HISTFILE` / `~/.bash_history` /
171:`~/.zsh_history` (extended format and zsh metafication handled) / fish history / PSReadLine
172:`ConsoleHost_history.txt`, keeps the last 2 lines **in memory for this one request** and never prints, logs or
217:withheld too, with or without history, and without a usable directory the place stays `<PATH>`, never `.`. ("is there
224:after "to"/"into"/"do" ("move them to /tmp/old", with or without history) is the destination and the source stays
226:path is the source. A quoted `'~/x'` from history stays the literal directory `./~/x`.
236:Gap: bash appends to `~/.bash_history` only when the shell exits unless you set `PROMPT_COMMAND='history -a'`
264:  programs calling `system()`; their string literals are checked as commands and `shutil.rmtree('/')`-style calls on
284:  Values taken from history pass the same validation.
285:* `--yes` only runs `safe` commands that come straight from the catalog: never history-resolved, composed, incomplete
303:| history references, exact command (53 EN+PL; only the previous command is a target) | **92.5%** (dev set, blind first run 60.4%) · v0.3 blind set (79): 82.3% (2 gold rows changed for the one-line rule, see EVAL.md) |
328:npm test                         # node:test — parity, cascade, tagger, history, composer, per-shell syntax, CLI
338:`data/eval` (held out), `data/shell/{train,eval}.jsonl` (shell-tagged), `data/history/eval.jsonl`,
352:* History: bash writes history late (see above); references are resolved to the most recent matching entity, there is no
353:  multi-turn memory of tellsh's own suggestions beyond the history file.
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
   270	  // a dry run ("do a dry run of wrangler deploy") and an environment ("deploy worker to staging") are kept, never dropped
   271	  // for a deploy to the default target
   272	  T('wrangler_deploy', 'Deploy a Cloudflare Worker with wrangler', 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»', {}, 'medium'),
   273	  // npx prefers a project-local wrangler binary, so every npx wrangler command may run project code (and wrangler dev
   274	  // runs the configured build command): medium, like npm_run_script, never auto-run with --yes
   275	  T('wrangler_dev', 'Run a Cloudflare Worker locally (wrangler dev)', 'npx wrangler dev', {}, 'medium'),
   276	  T('wrangler_tail', 'Stream live logs of a deployed Cloudflare Worker', 'npx wrangler tail', {}, 'medium'),
   277	  T('wrangler_secret_put', 'Set a secret (environment variable) on a Cloudflare Worker', 'npx wrangler secret put {var!raw}',
   278	    { var: null }, 'medium', { notes: 'wrangler prompts for the value, so it never lands in shell history' }),
   279	  T('wrangler_login', 'Log in to Cloudflare with wrangler', 'npx wrangler login', {}, 'medium'),
   280	  T('wrangler_whoami', 'Show which Cloudflare account wrangler is logged in as', 'npx wrangler whoami', {}, 'medium'),
   281	
   282	  // ---------- GitHub CLI ----------
   283	  T('gh_auth_status', 'Show GitHub CLI login status', 'gh auth status', {}),
   284	  T('gh_auth_login', 'Log in to GitHub with the gh CLI', 'gh auth login', {}),
   285	  T('gh_pr_list', 'List pull requests of the repository', 'gh pr list', {}),
   286	  T('gh_pr_view', 'Show a pull request', 'gh pr view«{pr!raw}»«--repo {repo!raw}»', {}),
   287	  T('gh_pr_create', 'Create a pull request from the current branch', 'gh pr create --fill', {}, 'medium'),
   288	  T('gh_pr_checks', 'Show CI check status of a pull request', 'gh pr checks«{pr!raw}»«--repo {repo!raw}»', {}),
   289	  T('gh_pr_merge', 'Merge a pull request', 'gh pr merge«{pr!raw}»«--repo {repo!raw}»', {}, 'medium'),
   290	  T('gh_run_list', 'List recent GitHub Actions workflow runs', 'gh run list', {}),
   291	  T('gh_run_view', 'Show a GitHub Actions run (and its failed logs)', 'gh run view«{num!raw}»', {}),
   292	];
   293	
   294	export const BY_ID = Object.fromEntries(INTENTS.map((i) => [i.id, i]));
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

exec
/bin/bash -lc 'cat test/shells.test.js; node test/shells.test.js' in /workspace/tellsh
 exited 1 in 3610ms:
// Every intent renders for every shell; POSIX renders are syntax-checked with `bash -n` / `sh -n`
// (also busybox sh if present); fish / PowerShell renders are parsed only when those shells are installed.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync, execFileSync } from 'node:child_process';
import { INTENTS } from '../src/catalog.js';
import { buildCommand } from '../src/fill.js';
import { shQuote, fishQuote, psQuote, cmdQuote } from '../src/render.js';
import { VARIANTS } from '../src/variants.js';
import { pwshParses } from '../scripts/lib/pwsh_parse.js';

const has = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
// nasty-but-valid values for every slot (quotes, spaces, $, &, globs)
const SAMPLE = {
  path: '/tmp/my dir', file: "it's.txt", src: 'a b.txt', dst: '/tmp/x', dest: '/tmp/out', archive: 'out.tar.gz', name: 'node',
  service: 'nginx', container: 'web', pkg: 'htop', cmd: 'git', var: 'HOME', branch: 'feature/x', user: 'www-data',
  pattern: "a'b $x", host: 'example.com', target: 'root@example.com', message: 'fix "quotes" & $HOME', url: 'https://x.org/a?b=1&c',
  port: 8080, pid: 4242, mode: '755', old: 'a/b', new: 'c&d', text: 'hello world', glob: '*.pdf', age: '-mtime -3', size: '100M',
  count: 5, days: 30, since: '3 days ago', depth: 2, start: 10, end: 20, num: 42, pr: 42, script: 'build:prod',
};
function sampleFor(intent) {
  const v = {};
  const names = new Set(Object.keys(intent.slots));
  for (const t of [intent.template, intent.darwin, ...Object.values(VARIANTS[intent.id] || {})]) {
    if (typeof t === 'string') for (const m of t.matchAll(/\{(\w+)/g)) names.add(m[1]);
    else if (t && typeof t === 'object') for (const s of Object.values(t)) if (typeof s === 'string') for (const m of s.matchAll(/\{(\w+)/g)) names.add(m[1]);
  }
  for (const n of names) if (SAMPLE[n] != null) v[n] = SAMPLE[n];
  if (intent.id === 'replace_text') v.sedexpr = 's/a\\/b/c\\&d/g';
  if (intent.id === 'find_by_name') v.namepat = '*my file*';
  if (intent.id.startsWith('base64')) v.text = SAMPLE.text;
  if (intent.id === 'list_archive') v.file = 'out.tar.gz';
  return v;
}

const POSIX_ENVS = [
  ['bash/linux', { shell: 'bash', os: 'linux', coreutils: 'gnu' }, 'bash'],
  ['zsh/darwin BSD', { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, 'bash'],
  ['zsh/darwin GNU', { shell: 'zsh', os: 'darwin', coreutils: 'gnu' }, 'bash'],
  ['sh/linux (dash)', { shell: 'sh', os: 'linux', coreutils: 'gnu' }, 'sh'],
  ['sh/busybox', { shell: 'sh', os: 'linux', coreutils: 'busybox' }, has('busybox') ? 'busybox' : 'sh'],
];
for (const [label, env, checker] of POSIX_ENVS) {
  test(`${label}: every intent renders and passes ${checker} -n`, () => {
    const bad = [];
    for (const it of INTENTS) {
      const r = buildCommand(it.id, '', { env, resolved: sampleFor(it) });
      assert.ok(r.command, `${it.id}: no command`);
      assert.deepEqual(r.missing, [], `${it.id}: missing ${r.missing}`);
      const args = checker === 'busybox' ? ['sh', '-n', '-c', r.command] : ['-n', '-c', r.command];
      const res = spawnSync(checker, args, { encoding: 'utf8' });
      if (res.status !== 0) bad.push(`${it.id}: ${r.command}\n    ${res.stderr.trim()}`);
    }
    assert.deepEqual(bad, []);
  });
}

test('fish: every intent renders (fish -n when installed)', (t) => {
  const env = { shell: 'fish', os: 'linux', coreutils: 'gnu' };
  const bad = [];
  for (const it of INTENTS) {
    const r = buildCommand(it.id, '', { env, resolved: sampleFor(it) });
    assert.ok(r.command, it.id);
    assert.ok(!/\$\{|\$\(/.test(r.command), `${it.id}: POSIX-only expansion in fish render: ${r.command}`);
    if (has('fish')) { const res = spawnSync('fish', ['-n', '-c', r.command]); if (res.status !== 0) bad.push(it.id); }
  }
  if (!has('fish')) t.diagnostic('fish not installed: syntax check skipped');
  assert.deepEqual(bad, []);
});

for (const os of ['win32', 'linux']) {
  test(`PowerShell/${os}: every intent renders or reports a gap (parser check when pwsh is installed)`, (t) => {
    const env = { shell: 'powershell', os, coreutils: 'gnu' };
    let gaps = 0;
    const bad = [];
    for (const it of INTENTS) {
      const r = buildCommand(it.id, '', { env, resolved: sampleFor(it) });
      // the sample message contains `"`, which legacy PowerShell cannot pass to a native program (git): refused by design
      if (r.gap && /PowerShell < 7\.3/.test(r.gap)) continue;
      if (r.gap) { gaps++; continue; }
      assert.ok(r.command, it.id);
      // cheap structural lint: balanced quotes/brackets, no bash-only expansions outside bash -c
      if (!/^bash -c /.test(r.command)) {
        const s = r.command.replace(/'(?:[^']|'')*'/g, "''").replace(/"(?:`.|[^"`])*"/g, '""');
        for (const [o, c] of [['{', '}'], ['(', ')'], ['[', ']']]) assert.equal(s.split(o).length, s.split(c).length, `${it.id}: unbalanced ${o}${c}: ${r.command}`);
        assert.ok(!/\$\{\w+:-/.test(s), `${it.id}: POSIX expansion in PowerShell: ${r.command}`);
      }
      if (has('pwsh')) {
        if (pwshParses(r.command) !== true) bad.push(it.id);
      }
    }
    if (!has('pwsh')) t.diagnostic(`pwsh not installed: parser check skipped (${gaps} gaps)`);
    assert.ok(gaps <= (os === 'win32' ? 5 : 0), `too many PowerShell gaps on ${os}: ${gaps}`);
    assert.deepEqual(bad, []);
  });
}

test('cmd: best-effort coverage is reported, gaps carry a reason', () => {
  const env = { shell: 'cmd', os: 'win32', coreutils: 'gnu' };
  let ok = 0;
  for (const it of INTENTS) {
    // Windows paths: a value starting with / is a cmd.exe switch and is refused by design
    const s = Object.fromEntries(Object.entries(sampleFor(it)).map(([k, v]) => [k, typeof v === 'string' && v.startsWith('/') ? 'C:' + v.replace(/\//g, '\\') : v]));
    const r = buildCommand(it.id, '', { env, resolved: s });
    if (r.gap) assert.ok(r.gap.length > 5, it.id); else ok++;
  }
  assert.ok(ok >= 100, `cmd renders: ${ok}`);
});

test('quoting round-trips through bash and sh', () => {
  for (const s of ["it's", 'a b', '$(rm -rf ~)', '`id`', '"; ls', '*.log', 'ąę żółw', '\\', '-rf']) {
    for (const sh of ['bash', 'sh']) assert.equal(execFileSync(sh, ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' }), s);
  }
});

test('fish / PowerShell / cmd quoting rules', () => {
  assert.equal(fishQuote("it's"), "'it\\'s'");
  assert.equal(fishQuote('a\\b c'), "'a\\\\b c'");
  assert.equal(fishQuote('~/my dir'), "~/'my dir'");
  assert.equal(psQuote("it's"), "'it''s'");
  assert.equal(psQuote('$(evil)'), "'$(evil)'");
  assert.equal(psQuote('~/Pobrane'), '"$HOME/Pobrane"');
  assert.equal(psQuote('~/$x'), '"$HOME/`$x"');
  assert.throws(() => cmdQuote('a "b"'), /cmd.exe/);
  assert.throws(() => cmdQuote('%PATH%'), /cmd.exe/);
  assert.equal(cmdQuote('a b'), '"a b"');
  assert.equal(cmdQuote('~/Downloads'), '%USERPROFILE%\\Downloads');
});

test('per-shell variants: intent shared, rendering differs', () => {
  const q = { path: '/var', count: 5 };
  assert.match(buildCommand('largest_dirs', '', { env: { shell: 'bash', os: 'linux', coreutils: 'gnu' }, resolved: q }).command, /^du -h -d 1 \/var .*sort -rh/);
  assert.match(buildCommand('largest_dirs', '', { env: { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, resolved: q }).command, /^du -k -d 1 \/var .*sort -rn/);
  assert.match(buildCommand('largest_dirs', '', { env: { shell: 'zsh', os: 'darwin', coreutils: 'gnu' }, resolved: q }).command, /gsort -rh/);
  assert.match(buildCommand('largest_dirs', '', { env: { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, resolved: q }).command, /^Get-ChildItem/);
  assert.match(buildCommand('replace_text', 'replace a with b in f.txt', { env: { shell: 'zsh', os: 'darwin', coreutils: 'bsd' } }).command, /^sed -i '' /);
  assert.equal(buildCommand('show_path', '', { env: { shell: 'fish', os: 'linux', coreutils: 'gnu' } }).command, 'string join \\n $PATH');
  // PowerShell on Linux without a native variant runs the POSIX command through bash -c
  const r = buildCommand('journal_errors', '', { env: { shell: 'powershell', os: 'linux', coreutils: 'gnu' } });
  assert.ok(/^bash -c '/.test(r.command) || /journalctl/.test(r.command), r.command);
});
TAP version 13
# Subtest: bash/linux: every intent renders and passes bash -n
ok 1 - bash/linux: every intent renders and passes bash -n
  ---
  duration_ms: 501.101289
  ...
# Subtest: zsh/darwin BSD: every intent renders and passes bash -n
ok 2 - zsh/darwin BSD: every intent renders and passes bash -n
  ---
  duration_ms: 492.503087
  ...
# Subtest: zsh/darwin GNU: every intent renders and passes bash -n
ok 3 - zsh/darwin GNU: every intent renders and passes bash -n
  ---
  duration_ms: 453.782118
  ...
# Subtest: sh/linux (dash): every intent renders and passes sh -n
ok 4 - sh/linux (dash): every intent renders and passes sh -n
  ---
  duration_ms: 379.684064
  ...
# Subtest: sh/busybox: every intent renders and passes busybox -n
ok 5 - sh/busybox: every intent renders and passes busybox -n
  ---
  duration_ms: 399.624312
  ...
# Subtest: fish: every intent renders (fish -n when installed)
ok 6 - fish: every intent renders (fish -n when installed)
  ---
  duration_ms: 447.746521
  ...
# fish not installed: syntax check skipped
# Subtest: PowerShell/win32: every intent renders or reports a gap (parser check when pwsh is installed)
ok 7 - PowerShell/win32: every intent renders or reports a gap (parser check when pwsh is installed)
  ---
  duration_ms: 446.891469
  ...
# pwsh not installed: parser check skipped (3 gaps)
# Subtest: PowerShell/linux: every intent renders or reports a gap (parser check when pwsh is installed)
ok 8 - PowerShell/linux: every intent renders or reports a gap (parser check when pwsh is installed)
  ---
  duration_ms: 421.831509
  ...
# pwsh not installed: parser check skipped (0 gaps)
# Subtest: cmd: best-effort coverage is reported, gaps carry a reason
ok 9 - cmd: best-effort coverage is reported, gaps carry a reason
  ---
  duration_ms: 10.255387
  ...
# Subtest: quoting round-trips through bash and sh
not ok 10 - quoting round-trips through bash and sh
  ---
  duration_ms: 4.374403
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
  duration_ms: 1.169323
  ...
# Subtest: per-shell variants: intent shared, rendering differs
ok 12 - per-shell variants: intent shared, rendering differs
  ---
  duration_ms: 11.02667
  ...
1..12
# tests 12
# suites 0
# pass 11
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 3587.734648

exec
/bin/bash -lc "node --version; type node; cat scripts/lib/pwsh_parse.js; rg --files -g '*lock*' -g '*requirements*' -g '*.toml' -g 'AGENTS.md' src bin scripts" in /workspace/tellsh
 exited 1 in 0ms:
v20.19.2
node is hashed (/usr/bin/node)
// PowerShell syntax check that never executes the checked source: the source is passed in an
// environment variable and only handed to the parser. (Anything placed after `-Command <script>`
// would be appended to the script and run.)
import { spawnSync } from 'node:child_process';

export const PWSH_PARSE_SCRIPT = '$e=$null;[void][System.Management.Automation.Language.Parser]::ParseInput($env:TELLSH_PARSE_SRC,[ref]$null,[ref]$e);if($e.Count){exit 1}';

/** -> true (parses), false (syntax errors), null (pwsh could not be started) */
export function pwshParses(src, { bin = 'pwsh', env = process.env } = {}) {
  const r = spawnSync(bin, ['-NoProfile', '-NonInteractive', '-Command', PWSH_PARSE_SCRIPT], { env: { ...env, TELLSH_PARSE_SRC: src }, encoding: 'utf8' });
  if (r.error) return null;
  return r.status === 0;
}

codex
I confirmed that secret updates also discard an explicit environment: “set worker secret API_KEY --env staging” targets the default Worker. The shell-rendering checks passed except for one quoting round-trip test blocked by the sandbox (`spawnSync bash EPERM`); I’m treating that as a validation limitation.
exec
/bin/bash -lc "sed -n '410,435p' src/fill.js; sed -n '519,550p' src/slots.js; nl -ba scripts/real/prepare_real.js | sed -n '46,67p'; nl -ba src/slots.js | sed -n '562,587p'; sed -n '346,360p' README.md" in /workspace/tellsh
 succeeded in 0ms:
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
   586	    // Polish inflection of a known name: "procesy javy" -> java, "logi nginxa" -> nginx, "chroma" -> chrome
   587	    for (const w of words) { const d = deinflect(w, vocab); if (d) return d; }
## Known gaps

* fish / cmd renders are not syntax-checked here (no fish/pwsh in CI); PowerShell variants are hand-written and only
  linted structurally — `pwsh` parser checks run automatically where `pwsh` is installed.
* zsh is validated with `bash -n` (no zsh in CI); zsh-only behaviour (e.g. `NOMATCH` on unquoted globs) is avoided by quoting.
* busybox: variants are based on Debian's busybox applet set; Alpine builds may differ.
* History: bash writes history late (see above); references are resolved to the most recent matching entity, there is no
  multi-turn memory of tellsh's own suggestions beyond the history file.
* Composer: closed vocabulary, POSIX only, no pipelines, no `--format`/`-o` style arguments; it is a safety net, not a generator.
* Negation is only read for pull request merges (`do not merge pr 45` is refused); elsewhere it is not (`do not delete
  a.txt` still suggests `rm a.txt`). Always read the command before running it.
* The real-usage split's command groups keep some operands (`npm install express` ≠ `npm install react`): 552 of 2957
  eval rows share an operand-masked skeleton with train; A scores ~1 pt higher on those, ~0.2 pt overall
  ([HYBRID.md](HYBRID.md#v04-real-usage)).
* Slot F1 gold set is small (208 requests); relexicalised end-to-end numbers use silver spans for unreplaced values.

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const qs=['deploy worker in preview2','deploy worker on qa_1','set worker secret API_KEY --env staging','set worker secret API_KEY in staging','npm ci','do a clean install with npm','clean install dependencies with npm','create a pull request in repo acme/app'];
for(const shell of ['bash','powershell','cmd']) for(const q of qs){const r=suggest(q,{shell,os:shell==='bash'?'linux':'win32'});console.log(JSON.stringify({shell,q,command:r.command,missing:r.missing,understood:r.understood,method:r.method}));}
JS" in /workspace/tellsh
 succeeded in 95ms:
{"shell":"bash","q":"deploy worker in preview2","command":"npx wrangler deploy","missing":[],"understood":true,"method":"catalog"}
{"shell":"bash","q":"deploy worker on qa_1","command":"npx wrangler deploy","missing":[],"understood":true,"method":"catalog"}
{"shell":"bash","q":"set worker secret API_KEY --env staging","command":"npx wrangler secret put API_KEY","missing":[],"understood":true,"method":"catalog"}
{"shell":"bash","q":"set worker secret API_KEY in staging","command":"npx wrangler secret put API_KEY","missing":[],"understood":true,"method":"catalog"}
{"shell":"bash","q":"npm ci","command":"npm install npm","missing":[],"understood":true,"method":"catalog"}
{"shell":"bash","q":"do a clean install with npm","command":"npm install npm","missing":[],"understood":true,"method":"catalog"}
{"shell":"bash","q":"clean install dependencies with npm","command":"npm install dependencies","missing":[],"understood":true,"method":"catalog"}
{"shell":"bash","q":"create a pull request in repo acme/app","command":"gh pr create --fill","missing":[],"understood":true,"method":"catalog"}
{"shell":"powershell","q":"deploy worker in preview2","command":"npx wrangler deploy","missing":[],"understood":true,"method":"catalog"}
{"shell":"powershell","q":"deploy worker on qa_1","command":"npx wrangler deploy","missing":[],"understood":true,"method":"catalog"}
{"shell":"powershell","q":"set worker secret API_KEY --env staging","command":"npx wrangler secret put API_KEY","missing":[],"understood":true,"method":"catalog"}
{"shell":"powershell","q":"set worker secret API_KEY in staging","command":"npx wrangler secret put API_KEY","missing":[],"understood":true,"method":"catalog"}
{"shell":"powershell","q":"npm ci","command":"npm install 'npm'","missing":[],"understood":true,"method":"catalog"}
{"shell":"powershell","q":"do a clean install with npm","command":"npm install 'npm'","missing":[],"understood":true,"method":"catalog"}
{"shell":"powershell","q":"clean install dependencies with npm","command":"npm install 'dependencies'","missing":[],"understood":true,"method":"catalog"}
{"shell":"powershell","q":"create a pull request in repo acme/app","command":"gh pr create --fill","missing":[],"understood":true,"method":"catalog"}
{"shell":"cmd","q":"deploy worker in preview2","command":"npx wrangler deploy","missing":[],"understood":true,"method":"catalog"}
{"shell":"cmd","q":"deploy worker on qa_1","command":"npx wrangler deploy","missing":[],"understood":true,"method":"catalog"}
{"shell":"cmd","q":"set worker secret API_KEY --env staging","command":"npx wrangler secret put API_KEY","missing":[],"understood":true,"method":"catalog"}
{"shell":"cmd","q":"set worker secret API_KEY in staging","command":"npx wrangler secret put API_KEY","missing":[],"understood":true,"method":"catalog"}
{"shell":"cmd","q":"npm ci","command":"npm install npm","missing":[],"understood":true,"method":"catalog"}
{"shell":"cmd","q":"do a clean install with npm","command":"npm install npm","missing":[],"understood":true,"method":"catalog"}
{"shell":"cmd","q":"clean install dependencies with npm","command":"npm install dependencies","missing":[],"understood":true,"method":"catalog"}
{"shell":"cmd","q":"create a pull request in repo acme/app","command":"gh pr create --fill","missing":[],"understood":true,"method":"catalog"}

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest,resolveWithTagger} from './src/pipeline.js';
import {buildCommand} from './src/fill.js';
const qs=['install dependencies with npm','install project dependencies','install npm dependencies','install the dependencies with npm','install the project dependencies with npm','clean install dependencies with npm','do a clean install with npm','npm ci'];
for(const q of qs){const r=suggest(q,{shell:'bash',os:'linux'});console.log(JSON.stringify({q,command:r.command,intent:r.intent,src:r.slotSources,conf:r.confidence,regex:buildCommand('npm_install',q).command,slots:resolveWithTagger('npm_install',q)}));}
JS" in /workspace/tellsh
 succeeded in 115ms:
{"q":"install dependencies with npm","command":"npm install dependencies","intent":"npm_install","src":{"pkg":"tagger"},"conf":0.9968,"regex":"npm install dependencies","slots":{"slots":{"pkg":"dependencies"},"sources":{"pkg":"tagger"},"spans":[{"type":"NAME","start":8,"end":20,"text":"dependencies"}],"withheld":[],"invalidOperands":[]}}
{"q":"install project dependencies","command":"npm install project","intent":"npm_install","src":{"pkg":"regex"},"conf":0.9991,"regex":"npm install project","slots":{"slots":{"pkg":"project"},"sources":{"pkg":"regex"},"spans":[],"withheld":[],"invalidOperands":[]}}
{"q":"install npm dependencies","command":"npm install npm","intent":"npm_install","src":{"pkg":"tagger"},"conf":0.996,"regex":"npm install dependencies","slots":{"slots":{"pkg":"npm"},"sources":{"pkg":"tagger"},"spans":[{"type":"NAME","start":8,"end":11,"text":"npm"},{"type":"NAME","start":12,"end":24,"text":"dependencies"}],"withheld":[],"invalidOperands":[]}}
{"q":"install the dependencies with npm","command":"npm install dependencies","intent":"npm_install","src":{"pkg":"tagger"},"conf":0.9968,"regex":"npm install dependencies","slots":{"slots":{"pkg":"dependencies"},"sources":{"pkg":"tagger"},"spans":[{"type":"NAME","start":12,"end":24,"text":"dependencies"}],"withheld":[],"invalidOperands":[]}}
{"q":"install the project dependencies with npm","command":"npm install project","intent":"npm_install","src":{"pkg":"regex"},"conf":0.9996,"regex":"npm install project","slots":{"slots":{"pkg":"project"},"sources":{"pkg":"regex"},"spans":[],"withheld":[],"invalidOperands":[]}}
{"q":"clean install dependencies with npm","command":"npm install dependencies","intent":"npm_install","src":{"pkg":"tagger"},"conf":0.9949,"regex":"npm install dependencies","slots":{"slots":{"pkg":"dependencies"},"sources":{"pkg":"tagger"},"spans":[{"type":"NAME","start":14,"end":26,"text":"dependencies"}],"withheld":[],"invalidOperands":[]}}
{"q":"do a clean install with npm","command":"npm install npm","intent":"npm_install","src":{"pkg":"tagger"},"conf":0.9391,"regex":"npm install npm","slots":{"slots":{"pkg":"npm"},"sources":{"pkg":"tagger"},"spans":[{"type":"NAME","start":24,"end":27,"text":"npm"}],"withheld":[],"invalidOperands":[]}}
{"q":"npm ci","command":"npm install npm","intent":"npm_install","src":{"pkg":"regex"},"conf":0.9797,"regex":"npm install npm","slots":{"slots":{"pkg":"npm"},"sources":{"pkg":"regex"},"spans":[],"withheld":[],"invalidOperands":[]}}

exec
/bin/bash -lc "rg -n 'dependencies|dependenc|zalezn' src/slots.js | head -30; nl -ba src/slots.js | sed -n '68,106p'; git diff --check 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src bin scripts" in /workspace/tellsh
 succeeded in 0ms:
    68	  'memcached rabbitmq-server supervisor openvpn wireguard caddy traefik ntp chronyd chrony nodered pm2 gunicorn ' +
    69	  'celery minio vault consul nomad zabbix-agent netdata cockpit').split(' '));
    70	const KNOWN_PKGS = new Set(('htop curl wget git vim nano tmux jq nodejs npm python3 python3-pip pip docker docker.io ' +
    71	  'ffmpeg tree ncdu neofetch zsh fish build-essential gcc make cmake openssl openssh-server net-tools nmap ' +
    72	  'traceroute dnsutils whois unzip zip p7zip ripgrep fd-find bat fzf golang rustc ruby php sqlite3 postgresql ' +
    73	  'redis nginx apache2 mc lm-sensors iotop iftop nethogs rsync gnupg imagemagick').split(' '));
    74	
    75	// package.json script names and command-line tools people ask about (npm run X, X --version, X --help)
    76	const KNOWN_SCRIPTS = new Set(('dev start build test lint typecheck type-check preview serve watch format e2e deploy ' +
    77	  'storybook coverage clean release prepare check bench docs generate migrate seed test:unit test:e2e build:prod').split(' '));
    78	const KNOWN_TOOLS = new Set(('node nodejs npm npx pnpm yarn bun deno python python3 pip pip3 uv poetry pytest git gh docker ' +
    79	  'kubectl helm terraform ansible go rustc cargo rustup java javac mvn gradle kotlin ruby gem perl php composer ' +
    80	  'dotnet gcc g++ clang cmake make ffmpeg curl wget jq yq tmux vim nvim code wrangler vercel netlify heroku modal ' +
    81	  'gcloud aws az firebase flyctl supabase claude codex ollama openssl sqlite3 psql mysql redis-cli nginx tsc eslint ' +
    82	  'prettier vite webpack brew apt rsync ssh zsh bash fish pwsh powershell').split(' '));
    83	const SCRIPT_SYNONYMS = [
    84	  [/\b(dev|development|developerski\w*|deweloperski\w*|devserver)\b/, 'dev'],
    85	  [/\b(tests?|testy|testow|testami|unit tests?)\b/, 'test'],
    86	  [/\b(build|zbuduj\w*|zbudowa\w*|budowanie|zbuildu\w*|buildu|builda)\b/, 'build'],
    87	  [/\b(lint\w*|linter\w*)\b/, 'lint'],
    88	  [/\b(typecheck|type-check|sprawdzanie typow|type check)\b/, 'typecheck'],
    89	];
    90	// words between the install verb and the package name ("install globally the typescript package with npm")
    91	const PKG_SKIP = new Set(('globally globalnie global -g --global system-wide systemowo package pakiet pakietu paczke paczka ' +
    92	  'paczki module modul modulu library biblioteke biblioteka biblioteki lib npm pip pip3 python python3 via using przez ' +
    93	  'uzywajac z za pomoca pomoca the a an with from w do for dla mi sobie').split(' '));
    94	
    95	// words that are never a slot value
    96	const STOP = new Set(('the a an all any every some my me mi this that these those of for to in on at by with from ' +
    97	  'named called name nazwie nazwa nazwany nazwana o process processes proces procesy procesu procesow program ' +
    98	  'programu app aplikacje aplikacja aplikacji service services usluga usluge uslugi uslug serwis serwisu daemon demon ' +
    99	  'demona unit container kontener kontenera kontenerze kontenerow kontenery package pakiet pakietu paczke paczka ' +
   100	  'branch brancha branchu gałąź galaz galezi galezia new nowy nowa nowej nowego nowa nowa nowym local lokalny ' +
   101	  'lokalna lokalnej please prosze pls plz wszystkie wszystko wszystkich running uruchomiony dzialajacy dzialajace ' +
   102	  'force forcibly silowo sile -9 now teraz natychmiast is jest czy mam have i do na w we z ze ze od dla jak how ' +
   103	  'which what co gdzie where file plik pliku files pliki command komenda komendy polecenie polecenia called ' +
   104	  'zmienna zmiennej variable env value wartosc wartość and i oraz then logs logi logow status restart start stop ' +
   105	  'kill zabij ubij show pokaz pokaż sprawdz sprawdź check list lista via using uzywajac it its it\'s up out into ' +
   106	  'się sie mnie mi tego ten ta to tej tym user uzytkownik uzytkownika owner wlasciciel host server serwer serwera ' +

exec
/bin/bash -lc "node --input-type=module <<'JS'
import assert from 'node:assert/strict';
import {suggest} from './src/pipeline.js';
const cases=[
 ['deploy worker in preview2','npx wrangler deploy'],
 ['set worker secret API_KEY --env staging','npx wrangler secret put API_KEY'],
 ['install the project dependencies with npm','npm install project'],
 ['create a pull request in repo acme/app','gh pr create --fill'],
];
for(const [q,command] of cases){const r=suggest(q,{shell:'bash',os:'linux'});assert.equal(r.command,command);assert.equal(r.understood,true);assert.deepEqual(r.missing,[]);console.log(JSON.stringify({query:q,command:r.command,method:r.method,risk:r.risk,missing:r.missing}));}
JS" in /workspace/tellsh
 succeeded in 90ms:
{"query":"deploy worker in preview2","command":"npx wrangler deploy","method":"catalog","risk":"medium","missing":[]}
{"query":"set worker secret API_KEY --env staging","command":"npx wrangler secret put API_KEY","method":"catalog","risk":"medium","missing":[]}
{"query":"install the project dependencies with npm","command":"npm install project","method":"catalog","risk":"medium","missing":[]}
{"query":"create a pull request in repo acme/app","command":"gh pr create --fill","method":"catalog","risk":"medium","missing":[]}

exec
/bin/bash -lc 'git status --short' in /workspace/tellsh
 succeeded in 0ms:
?? review/r23-claude.md
?? review/r23-codex.md

codex
- **Major — [src/fill.js:158](/workspace/tellsh/src/fill.js:158): Deployment environments disappear after “in/on.”** `deploy worker in preview2` and `deploy worker on qa_1` produce `npx wrangler deploy`, with no missing slots. Marked environment names are handled only after selected prepositions, allowing deployment to the default target. Preserve the environment or withhold it.

- **Major — [src/catalog.js:277](/workspace/tellsh/src/catalog.js:277): Secret updates discard environment selection.** `set worker secret API_KEY --env staging` produces `npx wrangler secret put API_KEY`, targeting the default Worker instead. Add environment handling to this intent and its shell variants, or reject scoped requests.

- **Major — [src/slots.js:579](/workspace/tellsh/src/slots.js:579): Dependency-install requests invent package names.** `install the project dependencies with npm` produces `npm install project`; `install dependencies with npm` produces `npm install dependencies`. Both are complete suggestions that install an unintended package. Recognize project-dependency requests before accepting either regex or tagger package values.

- **Major — [src/catalog.js:287](/workspace/tellsh/src/catalog.js:287): PR creation drops the requested repository.** `create a pull request in repo acme/app` produces `gh pr create --fill`, with no missing slots. This can publish against the current repository instead. Preserve the repository selection or refuse the unsupported request.

All four were reproduced without executing generated commands. POSIX syntax checks passed; one shell quoting test was blocked by sandbox `EPERM`. No files changed.

VERDICT: REQUEST_CHANGES
tokens used
184,340
- **Major — [src/fill.js:158](/workspace/tellsh/src/fill.js:158): Deployment environments disappear after “in/on.”** `deploy worker in preview2` and `deploy worker on qa_1` produce `npx wrangler deploy`, with no missing slots. Marked environment names are handled only after selected prepositions, allowing deployment to the default target. Preserve the environment or withhold it.

- **Major — [src/catalog.js:277](/workspace/tellsh/src/catalog.js:277): Secret updates discard environment selection.** `set worker secret API_KEY --env staging` produces `npx wrangler secret put API_KEY`, targeting the default Worker instead. Add environment handling to this intent and its shell variants, or reject scoped requests.

- **Major — [src/slots.js:579](/workspace/tellsh/src/slots.js:579): Dependency-install requests invent package names.** `install the project dependencies with npm` produces `npm install project`; `install dependencies with npm` produces `npm install dependencies`. Both are complete suggestions that install an unintended package. Recognize project-dependency requests before accepting either regex or tagger package values.

- **Major — [src/catalog.js:287](/workspace/tellsh/src/catalog.js:287): PR creation drops the requested repository.** `create a pull request in repo acme/app` produces `gh pr create --fill`, with no missing slots. This can publish against the current repository instead. Preserve the repository selection or refuse the unsupported request.

All four were reproduced without executing generated commands. POSIX syntax checks passed; one shell quoting test was blocked by sandbox `EPERM`. No files changed.

VERDICT: REQUEST_CHANGES
