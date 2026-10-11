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
session id: 01a12b31-5239-7391-90bb-972ba866236b
--------
user
Final review of tellsh v0.3 (git diff 0d87457..HEAD). Accepted design: uncertain args -> placeholder; risk allowlist. Report only blocker/major bugs where tellsh would run a destructive or wrong-target command without the user seeing it, or the risk rating is too low. Slot-detail inaccuracies already listed in Known limits are NOT blockers. Read-only. End with exactly one line 'VERDICT: APPROVE' or 'VERDICT: REQUEST_CHANGES'.
codex
I’ll review the diff and trace command validation and risk rating, using the accepted design and Known limits to filter findings.
exec
/bin/bash -lc "pwd && rg --files -g AGENTS.md -g '*Known*' -g '*known*' -g 'README*' -g 'pyproject.toml' -g 'package.json' && git status --short && git diff --stat 0d87457..HEAD" in /workspace/tellsh
 succeeded in 61ms:
/workspace/tellsh
package.json
README.md
data/tldr/README.md
hybrid/package/tellsh-model-enc/README.md
hybrid/package/tellsh-model-enc/package.json
?? review/final6-claude.md
?? review/final6-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   781 +-
 HYBRID.md                                    |   617 +
 README.md                                    |   326 +-
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
 review/close4-fix.md                         |    36 +
 review/close5-fix.md                         |    33 +
 review/close6-fix.md                         |    33 +
 review/final-claude.md                       |    46 +
 review/final-codex.md                        |  6239 ++++++++++
 review/final2-claude.md                      |    35 +
 review/final2-codex.md                       | 16282 ++++++++++++++++++++++++
 review/final3-claude.md                      |    31 +
 review/final3-codex.md                       |  7788 ++++++++++++
 review/final4-claude.md                      |    49 +
 review/final4-codex.md                       | 16482 +++++++++++++++++++++++++
 review/final5-claude.md                      |    46 +
 review/final5-codex.md                       |  6624 ++++++++++
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
 review/r11-codex.md                          |  9592 ++++++++++++++
 review/r12-claude.md                         |    37 +
 review/r12-codex.md                          | 10887 ++++++++++++++++
 review/r13-claude.md                         |    37 +
 review/r13-codex.md                          |  7148 +++++++++++
 review/r14-claude.md                         |    34 +
 review/r14-codex.md                          |  9586 ++++++++++++++
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
 review/r4-codex.md                           |  9505 ++++++++++++++
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
 src/catalog.js                               |    43 +-
 src/cli.js                                   |    91 +-
 src/compose.js                               |   186 +-
 src/danger.js                                |   784 +-
 src/fill.js                                  |   804 +-
 src/guards.js                                |   158 +
 src/history.js                               |  1028 +-
 src/model.js                                 |    22 +-
 src/pipeline.js                              |   686 +-
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
 test/regressions28.test.js                   |   194 +
 test/regressions29.test.js                   |   186 +
 test/regressions3-history.test.js            |    87 +
 test/regressions3-render.test.js             |   151 +
 test/regressions3.test.js                    |    46 +
 test/regressions30.test.js                   |   110 +
 test/regressions4.test.js                    |   204 +
 test/regressions5.test.js                    |   148 +
 test/regressions6.test.js                    |   174 +
 test/regressions7.test.js                    |   147 +
 test/regressions8.test.js                    |   204 +
 test/regressions9.test.js                    |   200 +
 test/shells.test.js                          |     8 +-
 267 files changed, 314968 insertions(+), 849 deletions(-)

exec
/bin/bash -lc "find .. -name AGENTS.md -print; cat package.json; rg -n 'Known limits|known limits' README.md; git diff 0d87457..HEAD -- src/cli.js src/render.js bin/tellsh.js" in /workspace/tellsh
 succeeded in 1105ms:
../ar-metering/saas/AGENTS.md
../ar-metering/nodejs-server/AGENTS.md
../gh-actions-throttle-2026-10-07/repos/multigpt/AGENTS.md
../gh-actions-throttle-2026-10-07/repos/saas/AGENTS.md
../gh-actions-throttle-2026-10-07/repos/nodejs-server-sparse/AGENTS.md
../gh-actions-throttle-2026-10-07/repos/planets/AGENTS.md
../ct-landing-2026-10-08/AGENTS.md
../monetization-cnvs-freesign-whenmeet-2026-10-08/repos/whiteboard/AGENTS.md
../whiteboard/AGENTS.md
../multigpt/AGENTS.md
../funnel-ship-2026-10-08/mg-plugand/AGENTS.md
../funnel-ship-2026-10-08/mg-plai/AGENTS.md
../funnel-ship-2026-10-08/mg-plus/AGENTS.md
../ga4fix-genai-app/AGENTS.md
../catchup-2026-10-01/multigpt/AGENTS.md
../catchup-2026-10-01/whiteboard-seo/AGENTS.md
../rubikon/web/public/AGENTS.md
../rubikon-deploy/web/public/AGENTS.md
../wearfits-genai-api/AGENTS.md
../seo-ship-2026-10-05/planets/AGENTS.md
../website2026-retailers/AGENTS.md
../rubikon-web-deploy/web/public/AGENTS.md
../wf-nightly-2026-10-10/repo/AGENTS.md
../nodejs-server-zf/AGENTS.md
../zf-requeue/shopify-wearfits/AGENTS.md
../zf-requeue/wearfits-genai-app/AGENTS.md
../ga4-conv-2026-10-08/repos/whiteboard/AGENTS.md
../ga4-conv-2026-10-08/repos/f1pl/f1pl-web/public/data/AGENTS.md
../ga4-conv-2026-10-08/repos/rubikon/web/public/AGENTS.md
../nodejs-server-fix/AGENTS.md
../planets/AGENTS.md
../wearfits-genai-app/AGENTS.md
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
416:## Known limits
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
index c4f433c..c0432fb 100644
--- a/src/cli.js
+++ b/src/cli.js
@@ -8,6 +8,8 @@ import { suggest as pipelineSuggest } from './pipeline.js';
 import { checkDanger, maxRisk } from './danger.js';
 import { detectEnv, normShell, normOs } from './env.js';
 import { loadHistory } from './history.js';
+import { joinArgs } from './shellwords.js';
+import { suggestLazy } from './rerank/hybrid.js';
 
 const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
 
@@ -28,17 +30,21 @@ Options:
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
   -h, --help        this help
 
-At the prompt: [Enter] run · e edit · n abort. High-risk and composed (experimental) commands
-require typing "yes". Without a TTY (piped), tellsh only prints the command unless --yes is given.`;
+At the prompt: [Enter] runs a safe command · e edit · n abort. Medium-risk commands never run on a
+plain Enter: type "y". High-risk and composed (experimental) commands require typing "yes". Without a TTY
+(piped), tellsh only prints the command unless --yes is given.`;
 
 const C = process.stdout.isTTY && !process.env.NO_COLOR
   ? { dim: (s) => `\x1b[2m${s}\x1b[0m`, bold: (s) => `\x1b[1m${s}\x1b[0m`, red: (s) => `\x1b[31m${s}\x1b[0m`,
@@ -48,7 +54,7 @@ const riskColor = (r) => (r === 'high' ? C.red : r === 'medium' ? C.yellow : C.g
 
 export function parseArgs(argv) {
   const o = { dryRun: false, yes: false, explain: false, json: false, top: 3, words: [], threshold: undefined, shell: undefined, os: undefined,
-    history: process.env.TELLSH_HISTORY === '1', historyFile: undefined, compose: 'auto' };
+    history: process.env.TELLSH_HISTORY === '1', historyFile: undefined, compose: 'auto', hybrid: ['1', 'safe'].includes(process.env.TELLSH_HYBRID) };
   for (let i = 0; i < argv.length; i++) {
     const a = argv[i];
     if (a === '--') { o.words.push(...argv.slice(i + 1)); break; }
@@ -58,7 +64,11 @@ export function parseArgs(argv) {
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
@@ -68,6 +78,8 @@ export function parseArgs(argv) {
     else if (a === '--no-history') o.history = false;
     else if (a === '--compose') o.compose = 'force';
     else if (a === '--no-compose') o.compose = 'off';
+    else if (a === '--hybrid') o.hybrid = true;
+    else if (a === '--no-hybrid') o.hybrid = false;
     else if (a === '-v' || a === '--version') o.version = true;
     else if (a === '-h' || a === '--help') o.help = true;
     else o.words.push(a);
@@ -103,7 +115,9 @@ export function shellInvocation(command, shell) {
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
@@ -141,20 +155,46 @@ function printSuggestion(s, opts) {
   }
 }
 
+/**
+ * The prompt and the answer a command needs at its risk: safe runs on Enter (or y/yes); medium never runs on a plain
+ * Enter, it needs an explicit "y"; high and composed (experimental) need the word "yes". `tak`/`t` are the Polish forms.
+ * -> { prompt, accepts(answer) }
+ */
+export function confirmRule(risk, { composed = false, incomplete = false } = {}) {
+  const ans = (a) => String(a ?? '').trim().toLowerCase();
+  // a placeholder is left: it is edited first, never run as is
+  if (incomplete) return { prompt: 'e edit · n abort: ', accepts: () => false };
+  // an unknown rating is treated as high
+  if (composed || (risk !== 'safe' && risk !== 'medium')) {
+    return { prompt: `${risk === 'high' ? C.red('High risk.') : C.yellow('Experimental.')} Type "yes" to run, e to edit, anything else aborts: `,
+      accepts: (a) => ['yes', 'tak'].includes(ans(a)) };
+  }
+  if (risk === 'medium') return { prompt: `${C.yellow('Medium risk.')} Type y to run, e to edit, anything else aborts: `, accepts: (a) => ['y', 'yes', 't', 'tak'].includes(ans(a)) };
+  return { prompt: '[Enter] run · e edit · n abort: ', accepts: (a) => ['', 'y', 'yes', 't', 'tak'].includes(ans(a)) };
+}
+
 export async function main(argv = process.argv.slice(2)) {
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
@@ -164,6 +204,17 @@ export async function main(argv = process.argv.slice(2)) {
     console.log(JSON.stringify(s, null, 2));
     return s.understood ? 0 : 3;
   }
+  if (!s.understood && s.context?.rule === 'refused') {
+    // a history reference that cannot be resolved safely: nothing to suggest
+    console.log(`Cannot resolve "${query}" from history: ${s.hint || s.context.note || 'not guessing'}.`);
+    console.log(C.dim('Name the target explicitly.'));
+    return 3;
+  }
+  if (!s.understood && s.hint && s.confidence >= s.threshold) {
+    // understood, but the only command the catalog has would contradict the request ("uninstall", "except 1234", "close pr")
+    console.log(`Not suggesting a command for "${query}": ${s.hint}.`);
+    return 3;
+  }
   if (!s.understood) {
     console.log(`I don't understand "${query}" (confidence ${(s.confidence * 100).toFixed(0)}% < ${(s.threshold * 100).toFixed(0)}%).`);
     console.log('Did you mean:');
@@ -184,8 +235,9 @@ export async function main(argv = process.argv.slice(2)) {
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
@@ -197,18 +249,16 @@ export async function main(argv = process.argv.slice(2)) {
   let risk = s.risk;
   let critical = s.critical;
   let incomplete = s.missing.length > 0;
-  const strict = () => risk === 'high' || s.method === 'composed';
   for (;;) {
+    const rule = confirmRule(risk, { composed: s.method === 'composed', incomplete });
     const rl = createInterface({ input: process.stdin, output: process.stdout });
-    const prompt = strict()
-      ? `${risk === 'high' ? C.red('High risk.') : C.yellow('Experimental.')} Type "yes" to run, e to edit, anything else aborts: `
-      : incomplete ? 'e edit · n abort: ' : '[Enter] run · e edit · n abort: ';
-    const ans = (await ask(rl, prompt)).trim().toLowerCase();
+    const ans = (await ask(rl, rule.prompt)).trim().toLowerCase();
     rl.close();
     if (ans === 'e' || ans === 'edit') {
       command = (await editLine(command)).trim();
       if (!command) return 130;
-      const d = checkDanger(command, s.baseRisk);
+      // unchanged: the suggestion as rated; any change is a user edit, at least high (danger.js trust rule)
+      const d = command === s.command ? { risk: s.risk, warnings: s.warnings, critical: s.critical } : checkDanger(command, s.baseRisk);
       risk = maxRisk(s.baseRisk, d.risk);
       critical = d.critical;
       incomplete = /<[A-Z_]+>/.test(command);
@@ -216,9 +266,8 @@ export async function main(argv = process.argv.slice(2)) {
       for (const w of d.warnings) process.stdout.write(riskColor(risk)(`  ! ${w}`) + '\n');
       continue;
     }
-    if (incomplete) { if (ans === '' ) continue; return 130; }
-    const go = strict() ? ans === 'yes' || ans === 'tak' : ans === '' || ans === 'y' || ans === 'yes' || ans === 't' || ans === 'tak';
-    if (!go) { console.log('aborted'); return 130; }
+    if (incomplete) { if (ans === '') continue; return 130; }
+    if (!rule.accepts(ans)) { console.log('aborted'); return 130; }
     if (critical) {
       const rl2 = createInterface({ input: process.stdin, output: process.stdout });
       const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
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
/bin/bash -lc "sed -n '416,485p' README.md; cat src/danger.js" in /workspace/tellsh
 succeeded in 0ms:
## Known limits

* **The selector rule trades recall for safety.** Its vocabulary is closed and hand-written (English and Polish): a
  harmless paraphrase with a word it does not list (`deploy the api worker to cloudflare`, `run the worker on
  localhost:8787`) gets a placeholder (`<ARGS>`, `<WENV>`) you have to fill or delete. On the 1097 gh / wrangler
  phrasings of the training and dev-tools eval data, 103 now end in a placeholder (57 before). Options the commands do
  not render (`--draft`, `--base`, `--label`, `--state`, `--squash`, `--port`, `--hostname`) are never added: their
  requests get `<ARGS>`. Words the vocabulary does list are trusted, so a selector hidden in one of them (e.g.
  "merge the pr into main" reads "main" as the merge base, not as a pull request) is not caught.
* The selector rule covers gh and wrangler only (plus `npm install` dependency words). Other intents still read their
  slots with the per-slot parsers: a descriptive word can still become a value there (`install the testing library`
  -> `python3 -m pip install testing`). Read the command before running it.
* `<ARGS>`, `<WENV>` and `<SCOPE>` are placeholders, not values: tellsh never runs an incomplete command; edit it (`e`) first.
* **Unquoted paths with spaces are read with word lists (close4).** Request words that are not on the lists can become
  part of a name (`delete folder /tmp/build output` -> `rm -r '/tmp/build output'`, a name that most likely does not
  exist), and a noun right after a path ends it (`extract a.tar.gz to /tmp/my dir` -> `-C /tmp/my`). A name with an
  extension is taken as whole (`rm /tmp/notes.txt` for `… notes.txt permanently`). Quote paths with spaces.
* **Scope options are read for npm, pip, gh and wrangler only**, from `--workspace` / `--repo` / `--env` / `--config` /
  `--prefix` / `--filter` / `--cwd` / `--project` (plus `-w` npm, `-R` gh, `-e` / `-c` wrangler) and "in workspace /
  repo / project / environment / config X"; other phrasings of a scope (`for the api package`) are not seen.
* **The trust rule is deliberately blunt.** Every edit, however harmless (`ls -la` -> `ls -l`), every history replay
  (`same for /var`, `count lines in it`) and every composed command is high and needs `yes`; a safe request with an
  unusual value (a file name with a quote, `$` or `&`, a grep pattern starting with `-`) is high too.
* **The allowlist knows only what the catalog renders.** A command you type or edit with a flag tellsh never emits
  (`ls --color=never`, `git log --stat`) gets an extra "unknown option" reason. PowerShell expressions
  are tokenized with the same light tokenizer: parts of an expression (`$_.Length -gt 1MB`, `.Count`) are not judged
  by the allowlist (a `$`-named program stays high by the deny rules). Payload strings of a runner (`forfiles /c "…"`,
  `bash -c '…'`) are checked by the deny rules; the wrapper itself already makes the command high.
* **sudo is a wrapper.** Every `sudo` catalog command (and the `bash -c` fallback for PowerShell on Linux/macOS without a
  native variant, and `… | xargs kill`) is high risk by the allowlist; the deny rules alone would call most of them medium.
* fish / cmd renders are not syntax-checked here (no fish/pwsh in CI); PowerShell variants are hand-written and only
  linted structurally — `pwsh` parser checks run automatically where `pwsh` is installed.
* zsh is validated with `bash -n` (no zsh in CI); zsh-only behaviour (e.g. `NOMATCH` on unquoted globs) is avoided by quoting.
* busybox: variants are based on Debian's busybox applet set; Alpine builds may differ.
* History: bash writes history late (see above); references are resolved to the most recent matching entity, there is no
  multi-turn memory of tellsh's own suggestions beyond the history file.
* Composer: closed vocabulary, POSIX only, no pipelines, no `--format`/`-o` style arguments; it is a safety net, not a generator.
* **Negation and exclusion are read with word lists (close5).** "except", "other than", "but not", "oprócz", "z
  wyjątkiem", a value after "not" / "without" / "bez", and "don't / never / nie <verb>" are never ignored: the command
  expresses the exclusion, a placeholder stands for it, or tellsh refuses (`kill all python processes except 1234`,
  `don't delete a.txt`, `uninstall nginx` are refused: there is no exclusion pipeline and no package-removal command in the
  catalog yet). A phrasing outside the lists can still be missed; a Polish prohibition later in a request is only caught
  when the command's action is named in English (`stop nginx, don't restart it`).
* **Two-path commands (close5).** mv / cp read the source before "to" / "do" / "na" and the destination after it. An
  unquoted source that may be one name with a space or several files (`move /tmp/my file.txt to /tmp/dir`, `move a.txt
  b.txt to /tmp/dir`) is a `<SRC>` placeholder: quote each path. `ln -s` is not split this way.
* **Misread requests** (the classifier, not slot filling) can still produce a plausible command without a warning, e.g.
  `forward port 3000 to db.example.com:5432` is a near tie between an ssh tunnel and `nc -zv db.example.com 3000`. Read
  the command before running it.
* **Release v0.3: open review findings** (details in [EVAL.md](EVAL.md#known-limits-release-v03-open-review-findings-not-fixed)).
  These give a complete command with no warning:
  - attached pip target is dropped: `pip install requests -t/tmp/pkgs` -> `python3 -m pip install requests` (write `-t /tmp/pkgs`);
  - a quoted workspace with a space after "in workspace" is cut: `run npm deploy in workspace "staging app"` ->
    `--workspace staging` (`--workspace "staging app"` is kept whole);
  - ssh `-L` with a bind address (4-part spec): `-L 127.0.0.1:8080:db.internal:5432` -> `-L 8080:localhost:8080` (only
    `-L PORT:HOST:PORT` is read);
  - `~` in a pip target is quoted literally: `--target ~/packages` -> `--target '~/packages'` (use an absolute path; `$HOME/…` is quoted too);
  - two bare PIDs for one slot: `kill 1234 5678` -> `kill 5678`;
  - some composer flags are no longer explained for their intents (`pull all branches` -> `git branch -a`; read-only);
  - `kill 1234` is read as `pkill -9 -f <NAME>` (a placeholder; `kill pid 1234` -> `kill 1234`).
* **Extract and protected PIDs (close6).** An extract / untar / unpack / rozpakuj request never becomes `tar -c` / `zip`
  (the composer keeps `tar -x…`, a guard refuses otherwise), and a PID after keep / leave / spare / except / zostaw / nie
  ruszaj is never the kill target (the other PID, else `<PID>`). Both read closed English / Polish word lists.
* The real-usage split's command groups keep some operands (`npm install express` ≠ `npm install react`): 552 of 2957
  eval rows share an operand-masked skeleton with train; A scores ~1 pt higher on those, ~0.2 pt overall
  ([HYBRID.md](HYBRID.md#v04-real-usage)).
* Slot F1 gold set is small (208 requests); relexicalised end-to-end numbers use silver spans for unreplaced values.

## License

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
// tools that load and run code of the project they start in (conftest.py, package.json scripts, a Makefile, build.rs,
// a project-local binary for npx, .yarnrc's yarnPath, ...), also for --help/--version: at least medium, never auto-run.
// Package managers and go only for a subcommand (`npm run …`, `go test`), interpreters only for a script or module
// (`node app.js`, `python3 -m x`); their bare --help/--version is the tool's own.
const PROJECT_TOOL = /^(?:pytest|py\.test|npx|pnpx|bunx|make|gmake|cargo|wrangler|tox|nox|gradlew?|mvnw?|rake|just|yarn)$/;
// package managers and project runners: with a subcommand (`npm run …`, `poetry run …`, `bundle exec …`)
const PROJECT_PM = /^(?:npm|pnpm|bun|deno|poetry|pipenv|pdm|hatch|uv|rye|bundle)$/;
const PROJECT_GO_INFO = /^(?:version|help|env)$/;
function projectCodeCheck(w, flags) {
  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.(?:exe|cmd|bat)$/i, '').toLowerCase();
  const pos = w.slice(1).filter((x) => !/^-/.test(String(x)));
  let runs = PROJECT_TOOL.test(h);
  if (PROJECT_PM.test(h)) runs = pos.some((x) => !/^(?:help|version)$/.test(x));
  else if (h === 'go') runs = pos.length > 0 && !PROJECT_GO_INFO.test(pos[0]);
  else if (INTERP_HEAD.test(h) && !/awk$/.test(h)) runs = pos.length > 0 || w.slice(1).some((x) => /^-m/.test(String(x)));
  if (runs) flags.projectCode ??= h;
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
    projectCodeCheck(w, flags);
    stdinCodeCheck(w, hit, inner);
    if (head === 'git' && w[1] === 'rm') hit('high', 'rm deletes files permanently (no trash)');
    sysFileWriteCheck(w, head, hit);
   }
  }
  if (flags.unsure) hit('high', flags.unsure);
  if (flags.privileged) hit('medium', 'runs with root privileges');
  // said only where it raises the rating (`pytest --help`); `npm run build` is medium already
  if (flags.projectCode && risk === 'safe') hit('medium', `${flags.projectCode} runs code from the project it is started in (conftest.py, package scripts, a Makefile, build scripts, ...), even for --help`);
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
/bin/bash -lc "cat src/guards.js; sed -n '1,230p' src/fill.js; sed -n '1,200p' src/catalog.js" in /workspace/tellsh
 succeeded in 0ms:
// Release guards (v0.3 close5): checks on a finished suggestion that turn a command contradicting the request into a refusal.
//
//   negation / exclusion: "kill all python processes except 1234", "don't delete a.txt", "usuń pliki oprócz app.log",
//     "remove all .log files without app.log": the exclusion is never ignored. A command that cannot express it (no
//     --exclude, ! -name, grep -v, ...) is not suggested; the request is refused with a hint.
//   opposite action: "uninstall nginx", "odinstaluj nginx", "pip uninstall requests" is never `apt install` / `pip install`.
//   extract: "extract archive.tar.gz", "untar …", "rozpakuj …" is never `tar -c` / `zip` (which would overwrite the archive).
//   protected PID: "kill 1234 but keep 5678", "zabij 1234, nie ruszaj 5678" never kills 5678.
import { foldKeepLength } from './slots.js';

// exclusion words that always exclude something ("except", "other than", "oprócz", "z wyjątkiem", "everything but")
const EXCLUDE = /(?:^|[\s,;(])(?:except(?:\s+for)?|excepting|excluding|exclude|other\s+than|apart\s+from|aside\s+from|besides|save\s+for|but\s+not|(?:everything|all|anything|any|every\s+\S+|wszystko|wszystkie)\s+but|oprocz|procz|poza|z\s+wyjatkiem|za\s+wyjatkiem|wyjawszy|wykluczajac|pomijajac|omijajac)(?=[\s,;:]|$)\s*(.*)$/i;
// negation words that exclude only when a value follows them ("not 1234", "without app.log", "bez /tmp/x", "don't kill
// 1234"); otherwise they describe a manner ("without asking", "bez potwierdzenia", "not modified in 10 days")
const NEGATE_WORD = /(?:^|[\s,;(])(?:not|nor|never|without|nie|bez|ani|don'?t|do\s+not)(?=[\s,;:]|$)\s*(.*)$/i;
// words between an exclusion word and its value ("except pid 1234", "oprócz pliku app.log", "but not the file x")
const FILLER = /^(?:the|a|an|for|of|in|inside|from|on|at|under|within|w|we|na|do|pod|its|their|his|her|my|jego|jej|ich|pid|pids|process\w*|proces\w*|file|files|plik\w*|folder\w*|director(?:y|ies)|dir|katalog\w*|containers?|kontener\w*|services?|uslug\w*|package\w*|pakiet\w*|branch\w*|galez\w*|galaz\w*|images?|obraz\w*|those|these|that|this|one|ones|ten|ta|tego|tej|tych|numer\w*|number|nr|id|with|z|ze|named|called|o|nazwie)$/;
// a value: a number, a path, a file name with an extension, a glob, a quoted string
const VALUE = /^(?:\d+|[~./*][^\s]*|\S*[/\\]\S*|[\w@-]+\.[A-Za-z0-9]{1,5}|["'`„“].*)$/;
// the command expresses an exclusion
const EXPRESSED = /--exclude\b|--ignore\b|(?:^|\s)!\s+-|\s-not\s|\bgrep\s+(?:-\w*v|--invert-match)\b|-prune\b|\s-Exclude\b|-notlike\b|-notmatch\b/;
// a command that acts on a set (every matching process / file / container / package), not on the values it names
const SET_ACTING = /\b(?:pkill|killall)\b|\bfind\b.*\s-(?:delete|exec)\b|\$\(|\bxargs\b|\bprune\b|\brm\s+-\w*r|\bRemove-Item\b.*-Recurse|\|\s*Stop-Process\b|\btaskkill\b.*\/IM\b|\bdocker\s+(?:rm|stop|kill)\b.*\s-a\b/i;
const UNIVERSAL = /(?:^|\s)(?:all|every|everything|each|any|wszystk\w*|kazd\w*|cal[aey]\w*)(?=\s|$)/;
// action verbs a negation may stand before
const ACTION = String.raw`(?:delete|remove|rm|erase|wipe|purge|kill|terminate|stop|restart|reload|shut\w*|reboot|install|uninstall|upgrade|update|move|mv|rename|copy|cp|overwrite|push|pull|merge|deploy|drop|reset|clean|prune|format|chmod|chown|change|touch|run|start|create|make|commit|checkout|switch|enable|disable|truncate|empty|usuw\w*|usun\w*|kasuj\w*|skasuj\w*|wywal\w*|zabij\w*|ubij\w*|zatrzym\w*|restartuj\w*|zrestartuj\w*|przeladuj\w*|instaluj\w*|zainstaluj\w*|aktualizuj\w*|przeno\w*|przenies\w*|kopiuj\w*|skopiuj\w*|nadpis\w*|wypych\w*|wypchnij\w*|scal\w*|zmerguj\w*|resetuj\w*|czysc\w*|wyczysc\w*|formatuj\w*|zmieni\w*|zmien\w*|urucham\w*|uruchom\w*|odpal\w*|wylacz\w*|wlacz\w*|tworz\w*|utworz\w*|commituj\w*|zacommituj\w*)`;
// a prohibition of the whole request: "don't delete a.txt", "never remove /tmp/x", "nie usuwaj a.txt" (a negated action verb
// opening it). A prohibition later in the request ("merge pr 42 and don't delete the branch") negates a part of it: see NEGATE_WORD.
const PROHIBIT = new RegExp(String.raw`^\s*(?:(?:please|pls|prosze)\s+)?(?:don'?t|do\s+not|never|nie)\s+(?:(?:please|ever|prosze|wolno)\s+)?${ACTION}(?=[\s,;:.!?]|$)`, 'i');

// an English verb a request forbids -> the command words that perform it
const NEGATED_ACTION = {
  delete: ['rm', '-delete', 'delete', 'Remove-Item', 'del', 'rmdir'], remove: ['rm', '-delete', 'remove', 'uninstall', 'Remove-Item', 'del', 'rmdir', 'prune'],
  kill: ['kill', 'pkill', 'killall', 'Stop-Process', 'taskkill'], stop: ['stop', 'Stop-Service', 'Stop-Process'], restart: ['restart', 'Restart-Service'],
  start: ['start', 'Start-Service'], install: ['install'], uninstall: ['uninstall', 'remove', 'purge'], move: ['mv', 'Move-Item', 'move'],
  rename: ['mv', 'Rename-Item', 'ren'], copy: ['cp', 'Copy-Item', 'copy'], overwrite: ['-f', '--force'], push: ['push'], merge: ['merge'],
  deploy: ['deploy'], reset: ['reset'], prune: ['prune'], reboot: ['reboot'], chmod: ['chmod'], chown: ['chown'], commit: ['commit'],
};
const ACTION_WORD = new RegExp(String.raw`^${ACTION}$`, 'i');
const cleanTok = (w) => w.replace(/[),.;:!?]+$/, '');
/** The words after an exclusion word, past its filler words: the first one, or null. */
function excludedValue(rest, { verb = false } = {}) {
  const words = String(rest).trim().split(/\s+/).filter(Boolean).map(cleanTok);
  let i = verb && words.length && ACTION_WORD.test(foldKeepLength(words[0]).toLowerCase()) ? 1 : 0;
  while (i < words.length && i < 3 && FILLER.test(words[i].toLowerCase())) i++;
  return words[i] ?? null;
}
const cmdHas = (cmd, v) => {
  const bare = String(v).replace(/^["'`„“]+|["'`”]+$/g, '');
  return bare !== '' && String(cmd).split(/[\s'"=:]+/).some((t) => t === bare || t.replace(/^\.\//, '') === bare.replace(/^\.\//, ''));
};

/** Why the command contradicts a negation or exclusion in the request, or null. */
export function negationIssue(query, res) {
  if (!res?.command) return null;
  const q = String(query);
  const f = foldKeepLength(q).toLowerCase();
  const changing = res.risk !== 'safe';
  // ("don't deploy worker to prod" -> `--env <WENV>`: the placeholder is the user's to fill)
  if (changing && PROHIBIT.test(f) && !res.missing?.length) return `the request says not to do it (${f.match(PROHIBIT)[0].trim()}); not suggesting a command that does`;
  // "stop nginx, don't restart it": the action the request forbids is the command's own (a placeholder is the user's to fill:
  // "don't deploy worker to prod" -> `--env <WENV>`)
  for (const m of f.matchAll(/(?:^|[\s,;(])(?:don'?t|do\s+not|never)\s+(\w+)/g)) {
    const acts = NEGATED_ACTION[m[1]];
    if (changing && acts && !res.missing?.length && String(res.command).split(/\s+/).some((w) => acts.includes(w))) return `the request says not to ${m[1]}; not suggesting a command that does`;
  }
  if (EXPRESSED.test(res.command)) return null;
  const ex = f.match(EXCLUDE);
  if (ex) {
    const v = excludedValue(q.slice(q.length - ex[1].length));
    // a placeholder stands for the excluded part ("merge pr 42 but not in repo acme/app" -> `--repo <REPO>`): the user fills it
    // (an excluded PID left out as `kill <PID>` is no stand-in: "kill python except 1234" stays refused)
    const held = res.missing?.length > 0 && (v == null || !cmdHas(res.command, v)) && !(res.missing.includes('pid') && /^\d+$/.test(cleanTok(String(v))));
    // a read-only command only when a value is excluded ("list files except .txt"; "czy ktoś poza mną" is no exclusion)
    if (!held && (changing || (v != null && (VALUE.test(v) || cmdHas(res.command, v))))) {
      return `the request excludes something (${q.slice(ex.index, ex.index + ex[0].length - ex[1].length).trim()} ${v ?? ''}) that ${res.intent || 'the command'} cannot leave out; not suggesting a command that would include it`;
    }
  }
  if (!changing) return null;
  for (let s = f, m = s.match(NEGATE_WORD); m; s = m[1], m = s.match(NEGATE_WORD)) {
    const v = excludedValue(q.slice(q.length - m[1].length), { verb: true });
    if (v == null || !VALUE.test(v)) continue;
    // "kill process 1234 not 5678" -> `kill 1234` leaves 5678 alone; `pkill -f python` or `kill 5678` does not
    if (cmdHas(res.command, v) || SET_ACTING.test(res.command) || UNIVERSAL.test(f)) {
      return `the request excludes ${v} (${m[0].trim().split(/\s+/)[0]} ${v}), which ${res.intent || 'the command'} cannot leave out; not suggesting a command that would include it`;
    }
  }
  return null;
}

// removing a package: never the install command
const UNINSTALL = /(?:^|[\s,(])(?:uninstall\w*|un-install\w*|deinstall\w*|remove|removing|rm|purge|erase|delete|drop|get\s+rid\s+of|odinstaluj\w*|deinstaluj\w*|usun\w*|usuw\w*|wyrzuc\w*|wywal\w*|skasuj\w*|pozbadz\s+sie)(?=[\s,;:.!?]|$)/i;
const INSTALLS = (res) => /install/.test(res.intent || '') || /(?:^|\s)(?:install|i|add)(?=\s|$)/.test(String(res.command).replace(/^sudo\s+/, '').split(/\s*[|;&]/)[0]);
/** The request removes a package but the command installs one. */
export function uninstallIssue(query, res) {
  if (!res?.command || !INSTALLS(res)) return null;
  const f = foldKeepLength(String(query)).toLowerCase();
  if (!UNINSTALL.test(f)) return null;
  return 'removing a package is not supported (apt remove <PKG>, pip uninstall <PKG>, npm uninstall <PKG>); not suggesting the install command';
}

// unpacking an archive: never a command that creates or rewrites one
const EXTRACT = /(?:^|[\s,(])(?:extract|extracting|untar\w*|unpack\w*|unzip\w*|decompress\w*|uncompress\w*|gunzip|rozpakuj\w*|rozpakow\w*|wypakuj\w*|wypakow\w*|dekompres\w*)(?=[\s,;:.!?]|$)/i;
/** The command creates, appends to or rewrites an archive (`tar -c`, `tar czf`, `--create`, `zip`, `7z a`, `gzip`). */
export function createsArchive(cmd) {
  for (const seg of String(cmd ?? '').split(/\s*(?:\|\|?|;|&&)\s*/)) {
    const w = seg.trim().replace(/^(?:sudo\s+)+/, '').split(/\s+/);
    const head = (w[0] || '').split('/').pop().toLowerCase();
    if (/^(?:g|bsd)?tar$/.test(head)) {
      const args = w.slice(1);
      if (args.some((a) => /^--(?:create|append|update|catenate|concatenate)\b/.test(a))) return true;
      // a short option cluster (`-czf`; `-C dir` is the directory option, not a mode), or the old-style first word (`czf`)
      if (args.some((a) => /^-(?!-)[A-Za-z]*[cruA]/.test(a)) || /^[A-Za-z]*[cruA][A-Za-z]*$/.test(args[0] || '')) return true;
    }
    if (/^(?:zip|7z|7za|7zr)$/.test(head) && (head === 'zip' || /^a$|^u$|^d$/.test(w[1] || ''))) return true;
    if (/^(?:gzip|bzip2|xz|zstd|lz4)$/.test(head) && !w.slice(1).some((a) => /^-[A-Za-z]*d|^--decompress$/.test(a))) return true;
    if (/^Compress-Archive$/i.test(head)) return true;
  }
  return false;
}
/** The request unpacks an archive but the command creates or rewrites one. */
export function extractIssue(query, res) {
  if (!res?.command || !createsArchive(res.command)) return null;
  const f = foldKeepLength(String(query)).toLowerCase();
  if (!EXTRACT.test(f) && !/^extract_/.test(res.intent || '')) return null;
  return 'the request unpacks an archive; not suggesting a command that creates or overwrites one (tar -xzvf <FILE>, unzip <FILE>)';
}

// words that protect a number from a kill: "keep 5678", "leave 5678 running", "spare 5678", "zostaw 5678", "nie ruszaj 5678",
// "except 5678", "but not 5678", "oprócz 5678"
const PROTECT = /(?:^|[\s,;(])(?:keep(?:ing)?|leave|leaving|spare|sparing|preserve|save|not|except(?:\s+for)?|excluding|without|other\s+than|apart\s+from|besides|zostaw\w*|pozostaw\w*|oszczedz\w*|nie\s+(?:ruszaj\w*|zabijaj\w*|ubijaj\w*|zatrzymuj\w*|kasuj\w*)|oprocz|procz|poza|z\s+wyjatkiem|bez)(?=[\s,;:]|$)((?:\s+(?:the|a|an|for|process\w*|proces\w*|pid|pids|id|nr|numer\w*|number|alone|alive|running|przy|zyciu|w|spokoju|i|and|or|lub|,))*)\s+(\d+)\b/gi;
/** The numbers a request protects from a kill ("kill 1234 but keep 5678" -> [5678]); and/or lists are followed. */
export function protectedNumbers(text) {
  const f = foldKeepLength(String(text ?? '')).toLowerCase();
  const out = new Set();
  for (const m of f.matchAll(PROTECT)) {
    out.add(+m[2]);
    // "keep 5678 and 9012", "zostaw 5678, 9012 i 3456"
    const tail = f.slice(m.index + m[0].length).match(/^(?:\s*(?:,|and|or|i|lub|oraz)\s*\d+\b)+/);
    if (tail) for (const n of tail[0].match(/\d+/g)) out.add(+n);
  }
  return [...out];
}
const KILLS = /(?:^|[\s|;&])(?:sudo\s+)?(?:kill|pkill|killall|Stop-Process|taskkill|fuser)(?=\s|$)/i;
/** A kill command that targets a number the request protects. */
export function protectedIssue(query, res) {
  if (!res?.command || !(KILLS.test(res.command) || /^kill_/.test(res.intent || ''))) return null;
  const hit = protectedNumbers(query).find((n) => cmdHas(res.command, String(n)));
  return hit == null ? null : `the request protects ${hit}; not suggesting a command that would kill it`;
}

/** A suggestion that contradicts its request becomes a refusal with a hint. */
export function releaseGuards(query, res) {
  const hint = uninstallIssue(query, res) || extractIssue(query, res) || protectedIssue(query, res) || negationIssue(query, res);
  if (!hint) return res;
  const { shell, os, coreutils, threshold, context, confidence, tool, tools, candidates } = res;
  return { query, shell, os, coreutils, threshold, context, confidence, tool, tools, candidates, understood: false, method: 'none', command: null, missing: [], hint, refusedIntent: res.intent ?? null };
}
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
// Intent catalog: every command tellsh knows how to produce.
//
// Template syntax (see src/fill.js):
//   {slot}       value is shell-quoted
//   {slot!raw}   value inserted verbatim (only for validated slots: numbers, ports, find size/age flags)
//   «...»        optional segment, dropped if any slot inside it is missing
// `slots` maps slot name -> default value; `null` means required (a <PLACEHOLDER> is shown).
// `darwin` overrides the template on macOS. `risk` is safe | medium | high (src/danger.js may escalate).
// v0.2: archive create/extract, git stash/pull/checkout/clone raised safe -> medium after the teacher review
// (they overwrite files or change the working tree; data/teacher/decisions.jsonl).

const T = (id, description, template, slots, risk = 'safe', extra = {}) =>
  ({ id, description, template, slots, risk, ...extra });

export const INTENTS = [
  // ---------- files & disk ----------
  T('largest_files', 'Show the largest files under a directory',
    'find {path} -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n {count!raw}',
    { path: '.', count: 10 }),
  T('largest_dirs', 'Show the largest subdirectories of a directory',
    'du -h -d 1 {path} 2>/dev/null | sort -rh | head -n {count!raw}',
    { path: '.', count: 10 }),
  T('disk_free', 'Show free/used disk space per filesystem', 'df -h', {}),
  T('dir_size', 'Show total size of a directory', 'du -sh {path}', { path: '.' }),
  T('find_by_name', 'Find files by (part of) name',
    'find {path} -iname {namepat}', { path: '.', name: null }),
  T('find_by_ext', 'Find files with a given extension',
    'find {path} -type f -iname {glob}«{age!raw}»', { path: '.', ext: null }),
  T('find_recent', 'Find files modified within a time window',
    'find {path} -type f {age!raw}«-iname {glob}»', { path: '.', age: '-mtime -1' }),
  T('find_older_than', 'Find files older than N days',
    'find {path} -type f -mtime +{days!raw}«-iname {glob}»', { path: '.', days: 30 }),
  T('find_larger_than', 'Find files bigger than a size',
    'find {path} -type f -size +{size!raw}«-iname {glob}» -exec ls -lh {} +', { path: '.', size: '100M' }),
  T('find_smaller_than', 'Find files smaller than a size',
    'find {path} -type f -size -{size!raw}«-iname {glob}»', { path: '.', size: '1k' }),
  T('grep_text', 'Search for text recursively in files',
    'grep -rn«--include={glob}» -- {pattern} {path}', { path: '.', pattern: null }),
  T('grep_files_containing', 'List files that contain a text',
    'grep -rl«--include={glob}» -- {pattern} {path}', { path: '.', pattern: null }),
  T('count_lines', 'Count lines in a file', 'wc -l {file}', { file: null }),
  T('count_lines_code', 'Count total lines in all files of a type',
    'find {path} -type f -iname {glob} -exec cat {} + | wc -l', { path: '.', ext: null }),
  T('count_files', 'Count files in a directory (recursive)',
    'find {path} -type f«-iname {glob}» | wc -l', { path: '.' }),
  T('count_words', 'Count words in a file', 'wc -w {file}', { file: null }),
  T('sort_uniq', 'Most frequent lines in a file (sort | uniq -c)',
    'sort {file} | uniq -c | sort -rn | head -n {count!raw}', { file: null, count: 10 }),
  T('recent_files', 'List most recently modified files',
    "find {path} -type f -printf '%T@ %TY-%Tm-%Td %TH:%TM %p\\n' 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-",
    { path: '.', count: 10 },
    'safe', { darwin: "find {path} -type f -exec stat -f '%m %Sm %N' -t '%Y-%m-%d %H:%M' {} + 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-" }),
  T('empty_files', 'Find empty files', 'find {path} -type f -empty', { path: '.' }),
  T('empty_dirs', 'Find empty directories', 'find {path} -type d -empty', { path: '.' }),
  T('duplicate_files', 'Find duplicate files by content hash',
    'find {path} -type f -exec md5sum {} + | sort | uniq -w32 -dD',
    { path: '.' }, 'safe',
    // sorted `hash path` lines: print every member of a group, including the first one
    { darwin: "find {path} -type f -exec md5 -r {} + | sort | awk '$1 == p { if (!shown) print last; print; shown = 1; next } { p = $1; last = $0; shown = 0 }'" }),
  T('find_symlinks', 'List symbolic links', 'find {path} -type l -ls', { path: '.' }),
  T('broken_symlinks', 'Find broken symbolic links', 'find {path} -xtype l',
    { path: '.' }, 'safe', { darwin: 'find -L {path} -type l' }),
  T('list_files', 'List files in a directory with details', 'ls -lah {path}', { path: '.' }),
  T('list_tree', 'Show directory tree (2 levels)',
    "find {path} -maxdepth {depth!raw} -not -path '*/.git/*' | sort", { path: '.', depth: 2 }),
  T('hidden_files', 'List hidden files (dotfiles)',
    "find {path} -maxdepth 1 -name '.*'", { path: '.' }),
  T('file_type', 'Detect a file type', 'file {file}', { file: null }),
  T('file_stat', 'Show file metadata (size, permissions, times)', 'stat {file}', { file: null }),
  T('head_file', 'Show first lines of a file', 'head -n {count!raw} {file}', { file: null, count: 10 }),
  T('tail_file', 'Show last lines of a file', 'tail -n {count!raw} {file}', { file: null, count: 10 }),
  T('tail_follow', 'Follow a (log) file live', 'tail -f {file}',
    { file: '/var/log/syslog' }, 'safe', { darwinDefaults: { file: '/var/log/system.log' } }),
  T('cat_file', 'Print a file contents', 'cat {file}', { file: null }),
  T('print_line_range', 'Show a range of lines of a file (lines N to M)',
    "sed -n '{start!raw},{end!raw}p' {file}", { file: null, start: null, end: null }),
  T('compress_targz', 'Compress a directory/file into tar.gz',
    'tar -czvf {archive} {path}', { path: '.', archive: null }, 'medium'),
  T('extract_targz', 'Extract a tar.gz archive', 'tar -xzvf {file}«-C {dest}»', { file: null }, 'medium'),
  T('compress_zip', 'Compress into a zip archive', 'zip -r {archive} {path}', { path: '.', archive: null }, 'medium'),
  T('extract_zip', 'Extract a zip archive', 'unzip {file}«-d {dest}»', { file: null }, 'medium'),
  T('list_archive', 'List contents of an archive (tar/zip)',
    (s, q) => /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file)}` : `tar -tvf ${q(s.file)}`,
    { file: null }),
  T('chmod', 'Change file permissions', 'chmod {mode!raw} {file}', { file: null, mode: null }, 'medium'),
  T('make_executable', 'Make a file executable', 'chmod +x {file}', { file: null }, 'medium'),
  T('chown', 'Change file owner', 'sudo chown -R {user} {path}', { path: null, user: null }, 'medium'),
  T('copy', 'Copy files or directories', 'cp -ri {src} {dst}', { src: null, dst: null }, 'medium'),
  T('move_rename', 'Move or rename a file', 'mv -i {src} {dst}', { src: null, dst: null }, 'medium'),
  T('delete_file', 'Delete a file', 'rm {file}', { file: null }, 'high'),
  T('delete_dir', 'Delete a directory recursively', 'rm -r {path}', { path: null }, 'high'),
  T('delete_by_ext', 'Delete all files with an extension',
    'find {path} -type f -iname {glob} -delete', { path: '.', ext: null }, 'high'),
  T('mkdir', 'Create a directory (with parents)', 'mkdir -p {path}', { path: null }),
  T('touch_file', 'Create an empty file', 'touch {file}', { file: null }),
  T('current_dir', 'Print current working directory', 'pwd', {}),
  T('create_symlink', 'Create a symbolic link', 'ln -s {src} {dst}', { src: null, dst: null }, 'medium'),
  T('diff_files', 'Compare two files', 'diff -u {src} {dst}', { src: null, dst: null }),
  T('replace_text', 'Replace text in a file with sed (in place)',
    'sed -i {sedexpr} {file}', { file: null, old: null, new: null }, 'medium',
    { darwin: "sed -i '' {sedexpr} {file}" }),
  T('disk_mounts', 'Show mounted filesystems', 'findmnt', {}, 'safe', { darwin: 'mount' }),
  T('block_devices', 'List disks and partitions', 'lsblk', {}, 'safe', { darwin: 'diskutil list' }),
  T('hash_sha256', 'Compute SHA-256 checksum', 'sha256sum {file}', { file: null }, 'safe',
    { darwin: 'shasum -a 256 {file}' }),
  T('hash_md5', 'Compute MD5 checksum', 'md5sum {file}', { file: null }, 'safe', { darwin: 'md5 {file}' }),
  T('base64_encode', 'Base64-encode text or a file',
    // macOS base64 takes no positional file operand: it needs -i FILE
    (s, q, os) => s.file ? (os === 'darwin' ? `base64 -i ${q(s.file)}` : `base64 ${q(s.file)}`) : `printf '%s' ${q(s.text ?? '<TEXT>')} | base64`,
    {}),
  T('base64_decode', 'Decode base64 text or a file',
    (s, q, os) => {
      const d = os === 'darwin' ? 'base64 -D' : 'base64 -d';
      return s.file ? `${d} ${os === 'darwin' ? '-i ' : ''}${q(s.file)}` : `printf '%s' ${q(s.text ?? '<TEXT>')} | ${d}`;
    }, {}),

  // ---------- processes ----------
  T('top_cpu', 'Processes using the most CPU', 'ps aux --sort=-%cpu | head -n {count!raw}',
    { count: 10 }, 'safe', { darwin: 'ps aux -r | head -n {count!raw}' }),
  T('top_mem', 'Processes using the most memory', 'ps aux --sort=-%mem | head -n {count!raw}',
    { count: 10 }, 'safe', { darwin: 'ps aux -m | head -n {count!raw}' }),
  T('find_process', 'Find a running process by name', 'pgrep -af {name}',
    { name: null }, 'safe', { darwin: 'pgrep -lf {name}' }),
  T('kill_by_name', 'Kill processes by name', 'pkill -f {name}', { name: null }, 'high'),
  T('kill_force', 'Force-kill (SIGKILL) processes by name', 'pkill -9 -f {name}', { name: null }, 'high'),
  T('kill_by_pid', 'Kill a process by PID', 'kill {pid!raw}', { pid: null }, 'high'),
  T('kill_by_port', 'Kill the process listening on a port',
    // -sTCP:LISTEN: only the server; plain `-i tcp:PORT` also matches clients connected to that port
    'lsof -ti tcp:{port!raw} -sTCP:LISTEN | xargs -r kill', { port: null }, 'high',
    { darwin: 'lsof -ti tcp:{port!raw} -sTCP:LISTEN | xargs kill', notes: 'needs lsof' }),
  T('listening_ports', 'Show listening ports', 'ss -tulpn', {}, 'safe',
    { darwin: 'lsof -iTCP -sTCP:LISTEN -n -P' }),
  T('process_on_port', 'Which process is using a port', "ss -ltnup 'sport = :{port!raw}'",
    { port: null }, 'safe', { darwin: 'lsof -nP -i :{port!raw}' }),
  T('established_connections', 'Show established network connections', 'ss -tun state established',
    {}, 'safe', { darwin: 'netstat -an | grep ESTABLISHED' }),
  T('process_tree', 'Show process tree', 'ps -ef --forest', {}, 'safe', { darwin: 'ps -ef' }),

  // ---------- system ----------
  T('system_info', 'General system information', 'uname -a', {}),
  T('os_release', 'Show OS distribution/version', 'cat /etc/os-release', {}, 'safe', { darwin: 'sw_vers' }),
  T('kernel_version', 'Show kernel version', 'uname -r', {}),
  T('memory_usage', 'Show RAM usage', 'free -h', {}, 'safe', { darwin: 'vm_stat' }),
  T('cpu_info', 'Show CPU model and details', 'lscpu', {}, 'safe',
    { darwin: 'sysctl -n machdep.cpu.brand_string; sysctl hw.ncpu' }),
  T('cpu_cores', 'Number of CPU cores', 'nproc', {}, 'safe', { darwin: 'sysctl -n hw.ncpu' }),
  T('uptime', 'Uptime and load average', 'uptime', {}),
  T('hostname', 'Show the machine hostname', 'hostname', {}),
  T('whoami', 'Show current user name', 'whoami', {}),
  T('users_logged_in', 'Show logged-in users', 'who', {}),
  T('last_logins', 'Show recent logins', 'last -n {count!raw}', { count: 10 }),
  T('env_vars', 'List environment variables', 'env | sort', {}),
  T('env_var_get', 'Show the value of an environment variable', 'printenv {var!raw}', { var: null }),
  T('which_cmd', 'Locate a command executable', 'which -a {cmd}', { cmd: null }),
  T('show_path', 'Show PATH entries one per line', "echo \"$PATH\" | tr ':' '\\n'", {}),
  T('history_search', 'Search shell history',
    'grep -ai -- {pattern} "${HISTFILE:-$HOME/.bash_history}"', { pattern: null }, 'safe',
    { notes: 'reads the history file (the history builtin is empty in a subshell, and HISTFILE is not exported to it)' }),
  T('date_time', 'Show current date and time', 'date', {}),
  T('timezone', 'Show the system time zone',
    'timedatectl show -p Timezone --value 2>/dev/null || cat /etc/timezone', {}, 'safe',
    { darwin: "readlink /etc/localtime | sed 's#.*/zoneinfo/##'" }),
  T('calendar', 'Show a calendar', 'cal', {}),
  T('cron_list', 'List cron jobs of the current user', 'crontab -l', {}),
  T('cron_edit', 'Edit cron jobs', 'crontab -e', {}, 'medium'),
  T('journal_service', 'Show logs of a systemd service',
    'journalctl -u {service} -n {count!raw} --no-pager«--since {since}»', { service: null, count: 50 }, 'safe',
    { darwin: 'log show --style compact --last 1h | grep -i {service}', notes: 'journalctl is Linux/systemd only' }),
  T('journal_errors', 'Show system error logs', 'journalctl -p err -b --no-pager | tail -n {count!raw}',
    { count: 50 }, 'safe', { darwin: 'log show --style compact --last 1h --predicate \'messageType == error\' | tail -n {count!raw}' }),
  T('service_status', 'Show status of a service', 'systemctl status {service} --no-pager',
    { service: null }, 'safe', { darwin: 'launchctl list | grep -i {service}' }),
  T('service_restart', 'Restart a service', 'sudo systemctl restart {service}', { service: null }, 'medium',
    { darwin: 'brew services restart {service}' }),
  T('service_stop', 'Stop a service', 'sudo systemctl stop {service}', { service: null }, 'medium',
    { darwin: 'brew services stop {service}' }),
  T('service_start', 'Start a service', 'sudo systemctl start {service}', { service: null }, 'medium',
    { darwin: 'brew services start {service}' }),
  T('service_enable', 'Enable a service at boot', 'sudo systemctl enable --now {service}', { service: null }, 'medium'),
  T('list_services', 'List running services', 'systemctl list-units --type=service --state=running --no-pager',
    {}, 'safe', { darwin: 'launchctl list' }),
  T('failed_services', 'List failed services', 'systemctl --failed --no-pager', {}),
  T('dmesg', 'Kernel messages (dmesg)', 'sudo dmesg | tail -n {count!raw}', { count: 50 }),
  T('battery', 'Battery level/status',
    'cat /sys/class/power_supply/BAT*/capacity 2>/dev/null || upower -i /org/freedesktop/UPower/devices/DisplayDevice',
    {}, 'safe', { darwin: 'pmset -g batt' }),
  T('temperature', 'CPU temperature sensors', 'sensors', {}, 'safe',
    { darwin: 'sudo powermetrics --samplers smc -n 1 | grep -i temp', notes: 'needs lm-sensors on Linux' }),
  T('gpu_info', 'Show GPU information', "lspci | grep -iE 'vga|3d|display'", {}, 'safe',
    { darwin: 'system_profiler SPDisplaysDataType' }),
  T('usb_devices', 'List USB devices', 'lsusb', {}, 'safe', { darwin: 'system_profiler SPUSBDataType' }),
  T('install_package', 'Install a package', 'sudo apt install {pkg}', { pkg: null }, 'medium',
    { darwin: 'brew install {pkg}' }),
  T('package_installed', 'Check whether a package is installed', 'dpkg -l | grep -i -- {pkg}',
    { pkg: null }, 'safe', { darwin: 'brew list | grep -i -- {pkg}' }),
  T('system_update', 'Update system packages', 'sudo apt update && sudo apt upgrade', {}, 'medium',
    { darwin: 'brew update && brew upgrade' }),

  // ---------- network ----------
  T('ip_addresses', 'Show local IP addresses', 'ip -brief address', {}, 'safe',

exec
/bin/bash -lc "sed -n '850,1110p' src/fill.js; sed -n '230,390p' src/catalog.js; sed -n '1,210p' src/pipeline.js" in /workspace/tellsh
 succeeded in 0ms:
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
  return { command: out, missing };
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
  T('git_discard_changes', 'Discard all uncommitted changes', 'git restore«{file}»', { file: '.' }, 'high'),
  T('git_stash', 'Stash current changes', 'git stash', {}, 'medium'),
  T('git_stash_pop', 'Restore stashed changes', 'git stash pop', {}, 'medium'),
  T('git_pull', 'Pull from remote', 'git pull', {}, 'medium'),
  T('git_push', 'Push to remote', 'git push«origin {branch}»', {}, 'medium'),
  T('git_clone', 'Clone a repository', 'git clone {url}', { url: null }, 'medium'),
  T('git_add_all', 'Stage all changes', 'git add -A', {}),
  T('git_commit', 'Commit all changes with a message', 'git add -A && git commit -m {message}',
    { message: null }, 'medium'),
  T('git_remote', 'Show git remotes', 'git remote -v', {}),
  T('git_blame', 'Show who changed each line of a file', 'git blame {file}', { file: null }),
  T('git_init', 'Initialize a git repository', 'git init', {}),

  // ---------- docker ----------
  T('docker_ps', 'List running containers', 'docker ps', {}),
  T('docker_ps_all', 'List all containers including stopped', 'docker ps -a', {}),
  T('docker_logs', 'Show logs of a container', 'docker logs --tail {count!raw} -f {container}',
    { container: null, count: 100 }),
  T('docker_images', 'List docker images', 'docker images', {}),
  T('docker_stop', 'Stop a container', 'docker stop {container}', { container: null }, 'medium'),
  T('docker_stop_all', 'Stop all running containers', 'docker stop $(docker ps -q)', {}, 'high'),
  T('docker_prune', 'Remove unused docker data', 'docker system prune -a', {}, 'high'),
  T('docker_exec', 'Open a shell inside a container', 'docker exec -it {container} sh',
    { container: null }, 'medium'),
  T('docker_stats', 'Container resource usage', 'docker stats --no-stream', {}),
  T('docker_compose_up', 'Start docker compose services', 'docker compose up -d', {}, 'medium'),
  T('docker_compose_down', 'Stop docker compose services', 'docker compose down', {}, 'medium'),

  // ---------- developer tools (v0.4, from real command usage) ----------
  // project scripts and installs run arbitrary package code: medium
  T('npm_run_script', 'Run a package.json script with npm (npm run dev/build/test)', 'npm run {script}«--workspace {workspace}»«{scope!raw}»', { script: null }, 'medium'),
  T('npm_install', 'Install the project dependencies (or one package) with npm', 'npm {npmverb!raw}«{pkg}»«--workspace {workspace}»«{scope!raw}»', { npmverb: 'install' }, 'medium'),
  T('npm_install_global', 'Install an npm package globally', 'npm install -g {pkg}«{scope!raw}»', { pkg: null }, 'medium',
    { notes: 'may need sudo when the global prefix is not user-writable' }),
  T('pip_install', 'Install a Python package with pip', 'python3 -m pip install {pkg}«--target {piptarget}»«{scope!raw}»', { pkg: null }, 'medium'),
  T('activate_venv', 'Activate a Python virtual environment', '. {path}/bin/activate', { path: '.venv' }, 'medium',
    { notes: 'run it in your own shell: activating from tellsh only affects a subshell that exits right away' }),
  T('tool_version', 'Show the installed version of a command-line tool', '{cmd} --version', { cmd: null }),
  T('cli_help', 'Show the built-in help (--help) of a command', '{cmd} --help', { cmd: null }),

  // ---------- Cloudflare wrangler ----------
  // a dry run ("do a dry run of wrangler deploy") and an environment ("deploy worker to staging") are kept, never dropped
  // for a deploy to the default target
  T('wrangler_deploy', 'Deploy a Cloudflare Worker with wrangler', 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»«{args!raw}»', {}, 'medium'),
  // npx prefers a project-local wrangler binary, so every npx wrangler command may run project code (and wrangler dev
  // runs the configured build command): medium, like npm_run_script, never auto-run with --yes
  T('wrangler_dev', 'Run a Cloudflare Worker locally (wrangler dev)', 'npx wrangler dev«--env {wenv!raw}»«{args!raw}»', {}, 'medium'),
  T('wrangler_tail', 'Stream live logs of a deployed Cloudflare Worker', 'npx wrangler tail«--env {wenv!raw}»«{args!raw}»', {}, 'medium'),
  T('wrangler_secret_put', 'Set a secret (environment variable) on a Cloudflare Worker', 'npx wrangler secret put {var!raw}«--env {wenv!raw}»«{args!raw}»',
    { var: null }, 'medium', { notes: 'wrangler prompts for the value, so it never lands in shell history' }),
  T('wrangler_login', 'Log in to Cloudflare with wrangler', 'npx wrangler login«{args!raw}»', {}, 'medium'),
  T('wrangler_whoami', 'Show which Cloudflare account wrangler is logged in as', 'npx wrangler whoami«{args!raw}»', {}, 'medium'),

  // ---------- GitHub CLI ----------
  T('gh_auth_status', 'Show GitHub CLI login status', 'gh auth status«{args!raw}»', {}),
  T('gh_auth_login', 'Log in to GitHub with the gh CLI', 'gh auth login«{args!raw}»', {}),
  T('gh_pr_list', 'List pull requests of the repository', 'gh pr list«--repo {repo!raw}»«{args!raw}»', {}),
  T('gh_pr_view', 'Show a pull request', 'gh pr view«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»', {}),
  T('gh_pr_create', 'Create a pull request from the current branch', 'gh pr create --fill«--repo {repo!raw}»«{args!raw}»', {}, 'medium'),
  T('gh_pr_checks', 'Show CI check status of a pull request', 'gh pr checks«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»', {}),
  T('gh_pr_merge', 'Merge a pull request', 'gh pr merge«{pr!raw}»«--repo {repo!raw}»«{delbranch!raw}»«{scope!raw}»', {}, 'medium'),
  T('gh_run_list', 'List recent GitHub Actions workflow runs', 'gh run list«--repo {repo!raw}»«{args!raw}»', {}),
  T('gh_run_view', 'Show a GitHub Actions run (and its failed logs)', 'gh run view«{num!raw}»«--repo {repo!raw}»«{scope!raw}»', {}),
];

export const BY_ID = Object.fromEntries(INTENTS.map((i) => [i.id, i]));
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
import { extractSlots, pickArg, isOptionWord, foldKeepLength, isStopWord } from './slots.js';
import { resolveSlots, buildCommand, finalizeSlots, RAW_OK } from './fill.js';
import { BY_ID } from './catalog.js';
import { FAMILY_OF, NONE } from './tools.js';
import { detectEnv, envFeatures } from './env.js';
import { buildContext, resolveReference, hasPronoun, hasLocative, cwdFlags, sameBut, entityForSlot, isAmbiguous } from './history.js';
import { AMB } from './shellwords.js';
import { compose } from './compose.js';
import { assessCommand, maxRisk } from './danger.js';
import { releaseGuards, createsArchive } from './guards.js';
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
  args: () => false, scope: () => false, workspace: (v) => RAW_OK.workspace(v), pr: (v) => RAW_OK.pr(v), repo: (v) => RAW_OK.repo(v), wenv: (v) => RAW_OK.wenv(v), dryrun: (v) => RAW_OK.dryrun(v), delbranch: (v) => RAW_OK.delbranch(v), npmverb: (v) => RAW_OK.npmverb(v),
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
  // a negation word is never the thing a command acts on ("kill the process that is not responding" is not `pkill -f not`)
  if (OPERAND_SLOT_NAMES.has(k) && /^(?:not|no|never|nie|bez|without|except|but|oprocz|oprócz|poza|ani)$/i.test(String(v))) return false;
  if (isAmbiguous(v)) return false;
  if (RAW_OK[k]) return RAW_OK[k](v);
  if (VALID_SLOT[k]) return VALID_SLOT[k](String(v));
  // `?…` marks a value that was named but withheld (fill.js): a placeholder, never rendered as `'?'`
  return String(v).length < 300 && !/\0/.test(String(v)) && !String(v).startsWith('?');
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
  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr', 'repo', 'wenv', 'num', 'args', 'scope', 'workspace', 'piptarget', 'rport', 'rhost', 'script']) {
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

// Unquoted paths with spaces (v0.3 close4): `delete the folder ~/Old Projects` names `~/Old Projects`, never `~/Old`. The
// words after a path up to the end of its span (the end of the request, a connector such as "to", a modifier such as
// "recursively", a noun such as "files") are part of its name; when that end is unclear (another file name, a number or
// another value, a name that already has an extension: `/tmp/a.txt b.txt`) the path is withheld as a placeholder.

codex
The execution gate appears to block incomplete suggestions and require confirmation for elevated risks. I’m now checking whether rendering or command semantics can make the displayed command misleading or leave a risky command rated too low.
exec
/bin/bash -lc 'node --test test/' in /workspace/tellsh
exec
/bin/bash -lc "git diff 0d87457..HEAD -- src/catalog.js src/variants.js; rg -n 'function |export |checkDanger|assessCommand|risk|warning' src/history.js src/pipeline.js src/compose.js src/danger.js" in /workspace/tellsh
 succeeded in 0ms:
diff --git a/src/catalog.js b/src/catalog.js
index f98833f..42ab7d3 100644
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
@@ -210,6 +212,9 @@ export const INTENTS = [
     "curl -s -o /dev/null -w '%{http_code}\\n' {url}", { url: null }),
   T('download_file', 'Download a file from a URL', 'curl -fLO {url}', { url: null }, 'medium'),
   T('ssh_connect', 'Connect to a server over SSH', 'ssh {target}', { target: null }, 'medium'),
+  // rhost / rport: the far end of the tunnel as the server sees it (default: the same port on the server itself)
+  T('ssh_port_forward', 'Forward a local port to a port on (or behind) a server over SSH (tunnel)',
+    'ssh -N -L {port!raw}:{rhost!raw}:{rport!raw} {target}', { port: null, target: null, rhost: 'localhost' }, 'medium'),
 
   // ---------- git ----------
   T('git_status', 'Show git working tree status', 'git status', {}),
@@ -249,6 +254,42 @@ export const INTENTS = [
   T('docker_stats', 'Container resource usage', 'docker stats --no-stream', {}),
   T('docker_compose_up', 'Start docker compose services', 'docker compose up -d', {}, 'medium'),
   T('docker_compose_down', 'Stop docker compose services', 'docker compose down', {}, 'medium'),
+
+  // ---------- developer tools (v0.4, from real command usage) ----------
+  // project scripts and installs run arbitrary package code: medium
+  T('npm_run_script', 'Run a package.json script with npm (npm run dev/build/test)', 'npm run {script}«--workspace {workspace}»«{scope!raw}»', { script: null }, 'medium'),
+  T('npm_install', 'Install the project dependencies (or one package) with npm', 'npm {npmverb!raw}«{pkg}»«--workspace {workspace}»«{scope!raw}»', { npmverb: 'install' }, 'medium'),
+  T('npm_install_global', 'Install an npm package globally', 'npm install -g {pkg}«{scope!raw}»', { pkg: null }, 'medium',
+    { notes: 'may need sudo when the global prefix is not user-writable' }),
+  T('pip_install', 'Install a Python package with pip', 'python3 -m pip install {pkg}«--target {piptarget}»«{scope!raw}»', { pkg: null }, 'medium'),
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
+  T('gh_pr_view', 'Show a pull request', 'gh pr view«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»', {}),
+  T('gh_pr_create', 'Create a pull request from the current branch', 'gh pr create --fill«--repo {repo!raw}»«{args!raw}»', {}, 'medium'),
+  T('gh_pr_checks', 'Show CI check status of a pull request', 'gh pr checks«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»', {}),
+  T('gh_pr_merge', 'Merge a pull request', 'gh pr merge«{pr!raw}»«--repo {repo!raw}»«{delbranch!raw}»«{scope!raw}»', {}, 'medium'),
+  T('gh_run_list', 'List recent GitHub Actions workflow runs', 'gh run list«--repo {repo!raw}»«{args!raw}»', {}),
+  T('gh_run_view', 'Show a GitHub Actions run (and its failed logs)', 'gh run view«{num!raw}»«--repo {repo!raw}»«{scope!raw}»', {}),
 ];
 
 export const BY_ID = Object.fromEntries(INTENTS.map((i) => [i.id, i]));
diff --git a/src/variants.js b/src/variants.js
index 4a171b3..af7146e 100644
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
+    pwsh: 'ssh -N -L {port!raw}:{rhost!raw}:{rport!raw} {target}', // OpenSSH client ships with Windows 10 1809+
+    cmd: 'ssh -N -L {port!raw}:{rhost!raw}:{rport!raw} {target}',
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
+  npm_run_script: { pwsh: 'npm run {script}«--workspace {workspace!raw}»«{scope!raw}»', cmd: 'npm run {script}«--workspace {workspace!raw}»«{scope!raw}»' },
+  npm_install: { pwsh: 'npm {npmverb!raw}«{pkg}»«--workspace {workspace!raw}»«{scope!raw}»', cmd: 'npm {npmverb!raw}«{pkg}»«--workspace {workspace!raw}»«{scope!raw}»' },
+  npm_install_global: { pwsh: 'npm install -g {pkg}«{scope!raw}»', cmd: 'npm install -g {pkg}«{scope!raw}»' },
+  pip_install: { pwsh: { win: 'py -m pip install {pkg}«{scope!raw}»', unix: 'python3 -m pip install {pkg}«{scope!raw}»' }, cmd: 'py -m pip install {pkg}«{scope!raw}»' },
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
+  gh_pr_view: { pwsh: 'gh pr view«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»', cmd: 'gh pr view«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»' },
+  gh_pr_create: { pwsh: 'gh pr create --fill«--repo {repo!raw}»«{args!raw}»', cmd: 'gh pr create --fill«--repo {repo!raw}»«{args!raw}»' },
+  gh_pr_checks: { pwsh: 'gh pr checks«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»', cmd: 'gh pr checks«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»' },
+  gh_pr_merge: { pwsh: 'gh pr merge«{pr!raw}»«--repo {repo!raw}»«{delbranch!raw}»«{scope!raw}»', cmd: 'gh pr merge«{pr!raw}»«--repo {repo!raw}»«{delbranch!raw}»«{scope!raw}»' },
+  gh_run_list: { pwsh: 'gh run list«--repo {repo!raw}»«{args!raw}»', cmd: 'gh run list«--repo {repo!raw}»«{args!raw}»' },
+  gh_run_view: { pwsh: 'gh run view«{num!raw}»«--repo {repo!raw}»«{scope!raw}»', cmd: 'gh run view«{num!raw}»«--repo {repo!raw}»«{scope!raw}»' },
+  activate_venv: {
+    fish: 'source {path}/bin/activate.fish',
+    pwsh: { win: "& (Join-Path {path} 'Scripts/Activate.ps1')", unix: "& (Join-Path {path} 'bin/Activate.ps1')" },
+    cmd: 'call {path}\\Scripts\\activate.bat',
+  },
 };
src/danger.js:2:// and can only ever escalate risk, never lower it. Whether a command can be safe at all is the
src/danger.js:3:// trust rule at the end of this file (checkDanger): only tellsh's own catalog renders with plain values.
src/danger.js:13:export const maxRisk = (a, b) => (RANK[b] > RANK[a] ? b : a);
src/danger.js:29:export function simpleCommands(cmd, { winPaths = false } = {}) {
src/danger.js:133:function payloads(w, inner, flags) {
src/danger.js:171:function withPositional(str, args) {
src/danger.js:177:export function commandWords(words, inner = [], flags = {}) {
src/danger.js:207:export function commandChains(words, inner, flags) {
src/danger.js:233:export function normTarget(t) {
src/danger.js:256:function rmCheck(words, hit) {
src/danger.js:290:function sysFileWriteCheck(w, head, hit) {
src/danger.js:334:function sedScripts(a) {
src/danger.js:352:function sedRunsOrWrites(script) {
src/danger.js:388:function sedCheck(w, hit) {
src/danger.js:395:function killCheck(words, hit) {
src/danger.js:409:function removeItemCheck(words, hit) {
src/danger.js:428:function cmdDelCheck(words, hit) {
src/danger.js:445:function findCheck(w, hit) {
src/danger.js:454:function rsyncCheck(w, hit) {
src/danger.js:463:function copyCheck(w, hit) {
src/danger.js:479:function pipelineDeleteCheck(text, hit) {
src/danger.js:511:function permCheck(w, hit) {
src/danger.js:527:function rawDiskWriteCheck(w, hit) {
src/danger.js:544:function inlineCode(w) {
src/danger.js:561:function interpCheck(w, hit) {
src/danger.js:575:function projectCodeCheck(w, flags) {
src/danger.js:590:function stdinCodeCheck(w, hit, inner) {
src/danger.js:604:function codeCheck(ic, hit) {
src/danger.js:609:    const d = assessCommand(c, 'safe', { lenient: true });
src/danger.js:610:    for (const m of d.warnings) hit(d.risk, m, d.critical);
src/danger.js:616:function tarCheck(w, hit) {
src/danger.js:630:function dockerCheck(w, hit) {
src/danger.js:647:// [regex, risk, message, critical]
src/danger.js:701:export function normalizeGlobals(command) {
src/danger.js:710:// does not have for that command (`gh pr merge --admin`, `rm -P`) makes the command high risk: it is shown with the
src/danger.js:714:export const SUB_DEPTH = { git: 1, docker: 2, podman: 2, npm: 1, npx: 3, pnpm: 1, yarn: 1, gh: 2, systemctl: 1, apt: 1, 'apt-get': 1,
src/danger.js:733:export const headKey = (w) => {
src/danger.js:746:export function commandShape(words, { known, literal = () => true } = {}) {
src/danger.js:777:export const KEYWORDS = new Set(['then', 'do', 'else', 'elif', '&', '!', 'time']);
src/danger.js:780:export function substitution(command) {
src/danger.js:802:export function allowlistProblems(command, { extra = null } = {}) {
src/danger.js:848: * a `safe` result here does not make a command safe (see checkDanger).
src/danger.js:849: * @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}}
src/danger.js:851:export function assessCommand(command, baseRisk = 'safe', { lenient = false, allowlist = null } = {}) {
src/danger.js:852:  let risk = baseRisk;
src/danger.js:853:  const warnings = [];
src/danger.js:856:    risk = maxRisk(risk, r);
src/danger.js:857:    if (!warnings.includes(msg)) warnings.push(msg);
src/danger.js:897:  if (flags.projectCode && risk === 'safe') hit('medium', `${flags.projectCode} runs code from the project it is started in (conftest.py, package scripts, a Makefile, build scripts, ...), even for --help`);
src/danger.js:901:    const d = assessCommand(c, 'safe', { lenient: true });
src/danger.js:902:    for (const m of d.warnings) hit(d.risk, m, d.critical);
src/danger.js:908:    const d = assessCommand(c, 'safe', { allowlist: { off: true } });
src/danger.js:909:    for (const m of d.warnings) hit(d.risk, m, d.critical);
src/danger.js:913:  return { risk, warnings, critical };
src/danger.js:918:// intent is risk=safe, with slot values that are plain literals (plainSlotValue). Anything else (composer output, a
src/danger.js:920:// explicit "yes"; --yes never runs it. The parser above only raises risk, never lowers it: it adds the reasons and
src/danger.js:923:export const UNTRUSTED = 'not a catalog command rendered by tellsh with plain values (edited, composed, from history or unknown); it is not checked as safe';
src/danger.js:939:export function plainSlotValue(name, value, { dashOk = false } = {}) {
src/danger.js:950: * The risk of a final command. `rendered`: the caller vouches that `command` is exactly what tellsh rendered from a catalog
src/danger.js:951: * template with plain slot values (fill.js buildCommand); `baseRisk` is then the intent's risk. Without it the command
src/danger.js:953: * @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}}
src/danger.js:955:export function checkDanger(command, baseRisk = 'safe', { rendered = false, allowlist = null } = {}) {
src/danger.js:956:  const d = assessCommand(command, baseRisk, { allowlist });
src/danger.js:957:  if (rendered || d.risk === 'high') return d;
src/danger.js:958:  return { risk: 'high', warnings: [UNTRUSTED, ...d.warnings], critical: d.critical };
src/compose.js:7:// Composed commands are not catalog renders: high risk by the trust rule (danger.js), confirmed explicitly (never --yes).
src/compose.js:12:import { checkDanger, maxRisk } from './danger.js';
src/compose.js:24:export const TOOLS = {
src/compose.js:257:function tldrTriggers() {
src/compose.js:265:export const composerTools = () => Object.keys(FAMILY_TOOL);
src/compose.js:267:function triggerScore(fq, triggers) {
src/compose.js:278:function tldrScore(fq, stems) {
src/compose.js:286:function selectFlags(fq, spec, head, sub) {
src/compose.js:301:export function triggeredFlags(query, toolFamily) {
src/compose.js:315:function expansionOutsideSingleQuotes(cmd) {
src/compose.js:335:export function validateComposed(cmd, toolName, sub) {
src/compose.js:376: * -> null | { command, tool, sub, flags, risk, warnings, validation, experimental: true }
src/compose.js:378:export function compose(query, tools, ex, { patternOf, nameOf } = {}) {
src/compose.js:546:  const d = checkDanger(command, 'medium', { allowlist: { extra: { [[spec.head, sub].filter(Boolean).join(' ')]: parts.join(' ').split(/\s+/).filter((f) => /^-(?!\d)./.test(f)) } } });
src/compose.js:548:  return { command, tool: tn, sub, flags: used, triggered, risk: maxRisk('medium', d.risk), warnings: d.warnings, critical: d.critical, validation, experimental: true };
src/history.js:14:export { isAmbiguous };
src/history.js:19:export function historyCandidates(shell, env = process.env, os = process.platform) {
src/history.js:38:function readTail(path, maxBytes = 32768) {
src/history.js:52:function unmetafy(buf) {
src/history.js:61:export function parseHistory(text, kind = 'bash', { partial = false } = {}) {
src/history.js:88:export function loadHistory({ shell = 'bash', file, n = 2, env = process.env, os = process.platform } = {}) {
src/history.js:127:function inverters() {
src/history.js:163:function invert(cmd, kind = 'posix') {
src/history.js:212:function psArgs(args) {
src/history.js:234:function destEnts(srcs, dst, ents) {
src/history.js:261:function parseArgs(args, valueOpts = new Set()) {
src/history.js:281:function unwrap(w) {
src/history.js:291:export const isRelativePath = (v) => {
src/history.js:297:function staleRelative(ents, slots) {
src/history.js:303:function staleRepo(ents, slots) {
src/history.js:312:function psNative(head, args, ents, setIntent) {
src/history.js:352:function entsFromSlots(intent, slots, ents) {
src/history.js:381:export function tellshQuery(line, kind = 'posix') {
src/history.js:387:export function tellshArgs(line, kind = 'posix') {
src/history.js:413:export function analyzeCommand(line, classify, kind = 'posix') {
src/history.js:448:  const exportedScope = new Set(); // tools (git, docker, podman, gh) an `export VAR=…` earlier in the line pointed elsewhere
src/history.js:486:    // `export GH_REPO=a/b; gh pr view 45`, `$env:DOCKER_HOST = …`: the later commands of the line are scoped as well
src/history.js:491:    // `unset GH_REPO`, `export -n GH_REPO`, `Remove-Item Env:GH_REPO`, `[Environment]::SetEnvironmentVariable('GH_REPO', $null)`:
src/history.js:582:    // `gh pr view 45; export GH_REPO=other/repo`: the pull request is one of the old repository
src/history.js:622:/** The scope variables a segment removes (`unset`, `export -n`, `Remove-Item Env:…`, `SetEnvironmentVariable(…)`), as `NAME=`. */
src/history.js:623:function unsetScopeVars(rw, setEnvCall = false) {
src/history.js:632:function scopedElsewhere(w, raw, exported = new Set()) {
src/history.js:691:function wrapperScope(w, raw) {
src/history.js:713:function markScoped(o) {
src/history.js:717:function afterGlobals(head, args) {
src/history.js:725:function listedBySegment(w, pipedIn, k) {
src/history.js:767:function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
src/history.js:947:export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
src/history.js:980:export function cwdFlags(cwd) {
src/history.js:990:/** ctx_ tokens fed to the classifiers (same function is used by scripts/gen_data.js). */
src/history.js:991:export function ctxFeatures(ctx) {
src/history.js:1040:export const hasLocative = (q) => LOCATIVE.test(fold(q));
src/history.js:1098:export const hasPronoun = (q) => PRONOUN_EN.test(refText(q)) || PRONOUN_PL.test(refText(q));
src/history.js:1101:export function sameFor(q) {
src/history.js:1111:function retarget(intent, arg) {
src/history.js:1135:export function resolveReference(query, ctx) {
src/history.js:1145:    if (rt && ctx.last.skipped && BY_ID[ctx.last.intent].risk !== 'safe') {
src/history.js:1211:  if (guardNote && intent && BY_ID[intent].risk !== 'safe') {
src/history.js:1230:function locativeRef(fq, ctx) {
src/history.js:1250:export function changeGuard(type, value, fq, ctx) {
src/history.js:1283:export function entityForSlot(slot, ctx) {
src/history.js:1298:export function sameBut(query, ctx) {
src/history.js:1308:function intentUses(intent, ent) {
src/history.js:1312:function pickEnt(intent, ent, ctx) {
src/pipeline.js:20:import { assessCommand, maxRisk } from './danger.js';
src/pipeline.js:39:// "folder out" / "plik w": a word that is normally a function word names the item when it directly follows the
src/pipeline.js:43:function namedStopWord(text, k) {
src/pipeline.js:50:// function words. The path is withheld (placeholder), never silently replaced by the catalog default `.`.
src/pipeline.js:53:function danglingLocation(text) {
src/pipeline.js:68:function afterDestWord(text, v) {
src/pipeline.js:78:  // a bare function word ("on", "the", "w") is a tagging error, never a file or directory to act on
src/pipeline.js:115:export function validSlot(k, v) {
src/pipeline.js:134:export function resolveWithTagger(intentId, text, { model = getModel(), tool, mode = 'merge', tagger } = {}) {
src/pipeline.js:161:  // a path the tagger or regex read but that was rejected (a bare function word: "in the", "of it"; a name with a
src/pipeline.js:162:  // newline; part of a path the tagger could not represent), a location whose object is only function words, or a
src/pipeline.js:186:function explicitPaths(text) {
src/pipeline.js:193:function insideSubstitution(text, v) {
src/pipeline.js:226:export function pathTail(text, v, spans = [], { used = [], strict = true } = {}) {
src/pipeline.js:278:function splitTwoPaths(query, slots) {
src/pipeline.js:322:function nounOperand(k, v, query) {
src/pipeline.js:335:function trailingPunctAfter(text, v) {
src/pipeline.js:346:function cutAtEscapedQuote(text, v) {
src/pipeline.js:358:function flagTokens(cmd) {
src/pipeline.js:369:function composeInput(text, model, tool, unclear = [], grown = {}) {
src/pipeline.js:397:  (WRITING_TOOLS.has(comp.tool) || assessCommand(comp.command, 'safe').risk !== 'safe')) ||
src/pipeline.js:400:  (WRITING_TOOLS.has(comp.tool) || assessCommand(comp.command, 'safe', { allowlist: { off: true } }).risk !== 'safe')));
src/pipeline.js:403: * Pure function used by the CLI, eval and tests.
src/pipeline.js:407:export function suggest(query, opts = {}) {
src/pipeline.js:415:function replayFloor(s) {
src/pipeline.js:416:  if (!s?.command || s.method !== 'history-rule' || s.risk === 'high') return s;
src/pipeline.js:417:  return { ...s, risk: maxRisk(s.risk, 'high'), warnings: [REPLAY, ...(s.warnings || [])] };
src/pipeline.js:420:function suggestOnce(query, opts = {}) {
src/pipeline.js:473:    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null && BY_ID[ref.intent].risk !== 'safe' && trailingPunctAfter(query, slots[ref.changed])) {
src/pipeline.js:480:    if (cutHistory) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear where the new name ends (${cutHistory}); quote the path`];
src/pipeline.js:481:    if (punct.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${punct.join(', ')}); quote the path`];
src/pipeline.js:482:    if (punct.length + (cutHistory ? 1 : 0) < blank.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: it is not a valid value (${blank.filter((k) => !punct.includes(k) && !(cutHistory && k === ref.changed)).join(', ')})`];
src/pipeline.js:507:  if (sb?.skipped && (BY_ID[sb.lastIntent].risk !== 'safe' || BY_ID[intent].risk !== 'safe')) {
src/pipeline.js:538:      command: r.command, risk: r.risk, baseRisk: 'medium', warnings: r.warnings, critical: r.critical, missing: [], slots: {}, notes: null,
src/pipeline.js:597:    const t = pathTail(query, slots[k], r.spans, { used: Object.entries(slots).filter(([j]) => j !== k).map(([, x]) => String(x)), strict: BY_ID[intent].risk !== 'safe' });
src/pipeline.js:603:  if (BY_ID[intent].risk !== 'safe') {
src/pipeline.js:610:  // the destination what follows it; an unclear side is a placeholder + warning, never another word of the request
src/pipeline.js:621:  // explicit paths than the command takes (`in /tmp/x and /tmp/y`: only one would be used): placeholder + warning
src/pipeline.js:623:  if (BY_ID[intent].risk !== 'safe') {
src/pipeline.js:642:  // package, ...): placeholder + warning
src/pipeline.js:644:  if (BY_ID[intent].risk !== 'safe' && opts.unclearArgs?.length) {
src/pipeline.js:715:  if (locative && !refDst && !bothRefs && BY_ID[intent].risk !== 'safe' && FAMILY_OF[intent] !== 'find' && [...PATH_SLOT_NAMES].some((k) => usesSlot(BY_ID[intent], k))) {
src/pipeline.js:724:  } else if (ref?.rule === 'pronoun' && ref.guarded && BY_ID[intent].risk !== 'safe') {
src/pipeline.js:784:  if (ctx && b.missing.length && ref?.rule !== 'refused' && BY_ID[intent].risk === 'safe' && b.risk === 'safe') {
src/pipeline.js:803:  if (ambiguousText.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: unclear where the quoted text ends (\\" may be an escaped quote) (${ambiguousText.join(', ')})`];
src/pipeline.js:804:  if (splitPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear which words name the ${splitPaths.map((x) => x.split('=')[0] === 'src' ? 'source' : 'destination').join(' and ')} (${splitPaths.join(', ')}); quote each path`];
src/pipeline.js:805:  if (cutPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear where the unquoted name ends (${cutPaths.join(', ')}); quote the path`];
src/pipeline.js:806:  if (ambiguousPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${ambiguousPaths.join(', ')}); quote the path`];
src/pipeline.js:807:  if (unclearArgs.length) res.warnings = [...(res.warnings || []), `${unclearArgs.every((x) => PATH_SLOT_NAMES.has(x.split('=')[0])) ? 'path' : 'value'} left as a placeholder: unclear whether the quoted argument is a name or part of the request (${unclearArgs.join(', ')}); pass the whole request as one quoted argument`];
src/pipeline.js:809:    res.warnings = [...(res.warnings || []), unclearPaths.tooMany
src/pipeline.js:844:          command: comp.command, risk: comp.risk, baseRisk: 'medium', warnings: comp.warnings, critical: comp.critical, missing: [],

 exited 1 in 8698ms:
TAP version 13
# Subtest: /workspace/tellsh/test/allowlist.test.js
ok 1 - /workspace/tellsh/test/allowlist.test.js
  ---
  duration_ms: 1068.844813
  ...
# Subtest: /workspace/tellsh/test/cli.test.js
not ok 2 - /workspace/tellsh/test/cli.test.js
  ---
  duration_ms: 3702.682837
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
  duration_ms: 598.938736
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 4 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 221.240515
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 5 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 291.304137
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 6 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 324.052023
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 7 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 201.87676
  ...
# Subtest: /workspace/tellsh/test/pipeline.test.js
not ok 8 - /workspace/tellsh/test/pipeline.test.js
  ---
  duration_ms: 550.069391
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
  duration_ms: 1463.843694
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
  duration_ms: 991.422621
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
  duration_ms: 1370.538136
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
  duration_ms: 770.733186
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
  duration_ms: 447.949153
  ...
# Subtest: /workspace/tellsh/test/regressions14.test.js
ok 14 - /workspace/tellsh/test/regressions14.test.js
  ---
  duration_ms: 438.150967
  ...
# Subtest: /workspace/tellsh/test/regressions15.test.js
ok 15 - /workspace/tellsh/test/regressions15.test.js
  ---
  duration_ms: 538.606805
  ...
# Subtest: /workspace/tellsh/test/regressions16.test.js
ok 16 - /workspace/tellsh/test/regressions16.test.js
  ---
  duration_ms: 532.769242
  ...
# Subtest: /workspace/tellsh/test/regressions17.test.js
ok 17 - /workspace/tellsh/test/regressions17.test.js
  ---
  duration_ms: 654.535631
  ...
# Subtest: /workspace/tellsh/test/regressions18.test.js
ok 18 - /workspace/tellsh/test/regressions18.test.js
  ---
  duration_ms: 664.238537
  ...
# Subtest: /workspace/tellsh/test/regressions19.test.js
ok 19 - /workspace/tellsh/test/regressions19.test.js
  ---
  duration_ms: 856.517289
  ...
# Subtest: /workspace/tellsh/test/regressions2.test.js
not ok 20 - /workspace/tellsh/test/regressions2.test.js
  ---
  duration_ms: 1282.941865
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
  duration_ms: 635.932877
  ...
# Subtest: /workspace/tellsh/test/regressions21.test.js
ok 22 - /workspace/tellsh/test/regressions21.test.js
  ---
  duration_ms: 631.570442
  ...
# Subtest: /workspace/tellsh/test/regressions22.test.js
ok 23 - /workspace/tellsh/test/regressions22.test.js
  ---
  duration_ms: 802.220899
  ...
# Subtest: /workspace/tellsh/test/regressions23.test.js
ok 24 - /workspace/tellsh/test/regressions23.test.js
  ---
  duration_ms: 919.503219
  ...
# Subtest: /workspace/tellsh/test/regressions24.test.js
ok 25 - /workspace/tellsh/test/regressions24.test.js
  ---
  duration_ms: 938.622085
  ...
# Subtest: /workspace/tellsh/test/regressions25.test.js
ok 26 - /workspace/tellsh/test/regressions25.test.js
  ---
  duration_ms: 1190.300834
  ...
# Subtest: /workspace/tellsh/test/regressions26.test.js
ok 27 - /workspace/tellsh/test/regressions26.test.js
  ---
  duration_ms: 525.230007
  ...
# Subtest: /workspace/tellsh/test/regressions27.test.js
ok 28 - /workspace/tellsh/test/regressions27.test.js
  ---
  duration_ms: 694.28928
  ...
# Subtest: /workspace/tellsh/test/regressions28.test.js
ok 29 - /workspace/tellsh/test/regressions28.test.js
  ---
  duration_ms: 734.662165
  ...
# Subtest: /workspace/tellsh/test/regressions29.test.js
ok 30 - /workspace/tellsh/test/regressions29.test.js
  ---
  duration_ms: 926.04349
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 31 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 434.103919
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 32 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 531.803697
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 33 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 417.979119
  ...
# Subtest: /workspace/tellsh/test/regressions30.test.js
ok 34 - /workspace/tellsh/test/regressions30.test.js
  ---
  duration_ms: 891.294515
  ...
# Subtest: /workspace/tellsh/test/regressions4.test.js
not ok 35 - /workspace/tellsh/test/regressions4.test.js
  ---
  duration_ms: 1315.77868
  location: '/workspace/tellsh/test/regressions4.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions5.test.js
ok 36 - /workspace/tellsh/test/regressions5.test.js
  ---
  duration_ms: 986.870967
  ...
# Subtest: /workspace/tellsh/test/regressions6.test.js
ok 37 - /workspace/tellsh/test/regressions6.test.js
  ---
  duration_ms: 996.132936
  ...
# Subtest: /workspace/tellsh/test/regressions7.test.js
ok 38 - /workspace/tellsh/test/regressions7.test.js
  ---
  duration_ms: 589.696592
  ...
# Subtest: /workspace/tellsh/test/regressions8.test.js
not ok 39 - /workspace/tellsh/test/regressions8.test.js
  ---
  duration_ms: 803.352358
  location: '/workspace/tellsh/test/regressions8.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions9.test.js
not ok 40 - /workspace/tellsh/test/regressions9.test.js
  ---
  duration_ms: 1111.111984
  location: '/workspace/tellsh/test/regressions9.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 41 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 4266.683317
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/slot-cases.js
ok 42 - /workspace/tellsh/test/slot-cases.js
  ---
  duration_ms: 108.264187
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 43 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 245.098575
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 44 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 338.565371
  location: '/workspace/tellsh/test/templates.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..44
# tests 44
# suites 0
# pass 32
# fail 12
# cancelled 0
# skipped 0
# todo 0
# duration_ms 8693.258647

exec
/bin/bash -lc "sed -n '650,785p' src/pipeline.js; sed -n '275,520p' src/danger.js; sed -n '115,155p' src/cli.js; sed -n '1,130p' src/allowlist-data.js" in /workspace/tellsh
 succeeded in 0ms:
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

exec
/bin/bash -lc "node test/pipeline.test.js; node test/regressions30.test.js; sed -n '1,110p' test/cli.test.js; rg -n 'workspace|piptarget' src/pipeline.js src/fill.js test/regressions*.js" in /workspace/tellsh
 succeeded in 785ms:
TAP version 13
# Subtest: stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
ok 1 - stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
  ---
  duration_ms: 14.074153
  ...
# Subtest: PowerShell vocabulary maps to the same tool family
ok 2 - PowerShell vocabulary maps to the same tool family
  ---
  duration_ms: 1.306342
  ...
# Subtest: tagger: tool-conditioned BIO spans, only tags valid for the tool
ok 3 - tagger: tool-conditioned BIO spans, only tags valid for the tool
  ---
  duration_ms: 13.424771
  ...
# Subtest: slot merge: tagger primary, regex fills misses and replaces invalid values
ok 4 - slot merge: tagger primary, regex fills misses and replaces invalid values
  ---
  duration_ms: 10.570618
  ...
# Subtest: end-to-end bash + PowerShell + BSD
ok 5 - end-to-end bash + PowerShell + BSD
  ---
  duration_ms: 59.179224
  ...
# Subtest: history: pronouns, "same for", container/service/pid references (EN + PL)
ok 6 - history: pronouns, "same for", container/service/pid references (EN + PL)
  ---
  duration_ms: 65.495849
  ...
# Subtest: history is optional: without it a pronoun request gets a hint, never a guessed value
ok 7 - history is optional: without it a pronoun request gets a hint, never a guessed value
  ---
  duration_ms: 1.207068
  ...
# Subtest: history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
ok 8 - history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
  ---
  duration_ms: 0.575914
  ...
# Subtest: loadHistory reads only the tail of HISTFILE and returns the last n commands
not ok 9 - loadHistory reads only the tail of HISTFILE and returns the last n commands
  ---
  duration_ms: 0.834534
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
  duration_ms: 0.737445
  ...
# Subtest: second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
ok 11 - second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
  ---
  duration_ms: 10.064927
  ...
# Subtest: out-of-domain requests are rejected (also by the composer)
ok 12 - out-of-domain requests are rejected (also by the composer)
  ---
  duration_ms: 1.021443
  ...
# Subtest: env detection and overrides
ok 13 - env detection and overrides
  ---
  duration_ms: 0.530741
  ...
1..13
# tests 13
# suites 0
# pass 12
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 196.159282
TAP version 13
# Subtest: final5-claude major 1: extract requests never create or overwrite the archive
ok 1 - final5-claude major 1: extract requests never create or overwrite the archive
  ---
  duration_ms: 259.978041
  ...
# Subtest: final5-claude major 1: createsArchive reads tar / zip / 7z / gzip modes
ok 2 - final5-claude major 1: createsArchive reads tar / zip / 7z / gzip modes
  ---
  duration_ms: 0.508555
  ...
# Subtest: final5-claude major 1: the release guard refuses a create command for an extract request
ok 3 - final5-claude major 1: the release guard refuses a create command for an extract request
  ---
  duration_ms: 1.174315
  ...
# Subtest: final5-claude major 2: a protected PID is never killed
ok 4 - final5-claude major 2: a protected PID is never killed
  ---
  duration_ms: 76.198092
  ...
# Subtest: final5-claude major 2: protectedNumbers and the kill release guard
ok 5 - final5-claude major 2: protectedNumbers and the kill release guard
  ---
  duration_ms: 1.567285
  ...
1..5
# tests 5
# suites 0
# pass 5
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 373.730919
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
src/fill.js:39:  // an npm workspace (`--workspace api`, `-w packages/api`, `@scope/app`, a quoted `"staging app"`; rendered quoted)
src/fill.js:41:  piptarget: (v) => /^(?!-)[^\0\n\r]{1,255}$/.test(String(v)) && /[\w~./]/.test(String(v)),
src/fill.js:42:  workspace: (v) => /^(?![-.])[\w@./-](?:[\w@./ -]{0,98}[\w@./-])?$/.test(String(v)) && !/\.\./.test(String(v)),
src/fill.js:735:// Scope options (v0.3 close4): a dev-tool request that says where its command acts (a workspace, a repository or project, an
src/fill.js:737:// default scope. `npm run deploy --workspace staging` -> `npm run deploy --workspace staging`; `npm run deploy --env prod`
src/fill.js:741:  '--workspace': 'workspace', '-w': 'workspace', '--workspaces': 'workspace', '--ws': 'workspace', '--filter': 'workspace',
src/fill.js:747:// a quoted value is one value (`--workspace "staging app"`), never its first word
src/fill.js:748:const SCOPE_OPT = /(?:^|\s)(--workspaces?|--ws|--filter|--repo|--env|--config|--prefix|--cwd|--dir|--project|--target|-[wRect])(?:=(?:"([^"]*)"|'([^']*)'|(\S*))|\s+(?:"([^"]*)"|'([^']*)'|(?!-)([^\s,;!?]+))|(?=[\s,;!?]|$))/g;
src/fill.js:749:// "in workspace api", "for the project acme/app", "w projekcie api", "in the staging environment" is read by wranglerEnv
src/fill.js:750:const SCOPE_PHRASE = /(?:^|\s)(?:in|for|of|on|from|within|inside|under|at|w|we|dla|z)\s+(?:the\s+|a\s+)?(workspace|project|projek\w*|repo|repository|repozytori\w*|env|environment|srodowisk\w*|config|configuration|konfiguracj\w*)\s+(?!-)([^\s,;!?]+)/g;
src/fill.js:751:const SCOPE_PHRASE_KIND = (w) => /^(?:workspace)$/.test(w) ? 'workspace' : /^(?:repo|repository|repozytori)/.test(w) ? 'repo'
src/fill.js:784:    if (kind === 'workspace' && has('workspace')) {
src/fill.js:785:      const w = s.value != null && RAW_OK.workspace(s.value) ? s.value : '?';
src/fill.js:786:      // two different workspaces: neither is guessed
src/fill.js:787:      v.workspace = seen.workspace != null && seen.workspace !== w ? '?' : w;
src/fill.js:788:      seen.workspace = w;
src/fill.js:789:      // a workspace value is not the script / package ("run npm --workspace api" is not `npm run api`)
src/fill.js:794:    if (kind === 'target' && has('piptarget')) {
src/fill.js:795:      const d = s.value != null && RAW_OK.piptarget(s.value) ? s.value : '?';
src/fill.js:796:      v.piptarget = seen.piptarget != null && seen.piptarget !== d ? '?' : d;
src/fill.js:797:      seen.piptarget = d;
test/regressions29.test.js:8://  (6) a quoted --workspace value is one value; pip --target is kept; ssh -L keeps the remote host and port
test/regressions29.test.js:155:test('final4-codex major: a quoted --workspace value is one value', () => {
test/regressions29.test.js:156:  assert.equal(run('run npm deploy --workspace "staging app"').command, "npm run deploy --workspace 'staging app'");
test/regressions29.test.js:157:  assert.equal(run('run npm deploy --workspace="staging app"').command, "npm run deploy --workspace 'staging app'");
test/regressions29.test.js:158:  assert.equal(run('run npm deploy --workspace staging').command, 'npm run deploy --workspace staging');
test/regressions29.test.js:159:  assert.equal(run('npm install lodash -w packages/api').command, 'npm install lodash --workspace packages/api');
test/regressions28.test.js:8://  (4) scope options (--workspace, --repo / "in project X", --env, --config, --prefix) are kept or placeholdered, never
test/regressions28.test.js:135:test('final3-codex major: an npm workspace is kept, never dropped', () => {
test/regressions28.test.js:137:    const r = run('run npm deploy --workspace staging', env);
test/regressions28.test.js:138:    assert.match(r.command, /^npm run '?deploy'? --workspace staging$/, `${env.shell}: ${r.command}`);
test/regressions28.test.js:141:    ['run npm deploy -w staging', 'npm run deploy --workspace staging'],
test/regressions28.test.js:142:    ['run npm deploy --workspace=staging', 'npm run deploy --workspace staging'],
test/regressions28.test.js:143:    ['run the build script in workspace api', 'npm run build --workspace api'],
test/regressions28.test.js:144:    ['install express in workspace api', 'npm install express --workspace api'],
test/regressions28.test.js:146:  // two workspaces: neither is guessed
test/regressions28.test.js:147:  const two = run('run npm deploy --workspace a --workspace b');
test/regressions28.test.js:148:  assert.equal(two.command, 'npm run deploy --workspace <WORKSPACE>');
test/regressions28.test.js:149:  assert.ok(two.missing.includes('workspace'));
test/regressions28.test.js:150:  // a workspace that is not a readable name
test/regressions28.test.js:151:  assert.ok(run('run npm deploy --workspace ../x').missing.includes('workspace'));
test/regressions28.test.js:183:  assert.deepEqual(scopeMentions('npm_run_script', 'run build -w api').map((s) => s.kind), ['workspace']);
src/pipeline.js:90:  args: () => false, scope: () => false, workspace: (v) => RAW_OK.workspace(v), pr: (v) => RAW_OK.pr(v), repo: (v) => RAW_OK.repo(v), wenv: (v) => RAW_OK.wenv(v), dryrun: (v) => RAW_OK.dryrun(v), delbranch: (v) => RAW_OK.delbranch(v), npmverb: (v) => RAW_OK.npmverb(v),
src/pipeline.js:177:  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr', 'repo', 'wenv', 'num', 'args', 'scope', 'workspace', 'piptarget', 'rport', 'rhost', 'script']) {

exec
/bin/bash -lc "sed -n '175,270p' src/variants.js; sed -n '520,640p' src/danger.js; sed -n '735,810p' src/fill.js; cat src/rerank/hybrid.js; cat src/shellwords.js" in /workspace/tellsh
 succeeded in 0ms:
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
// tools that load and run code of the project they start in (conftest.py, package.json scripts, a Makefile, build.rs,
// a project-local binary for npx, .yarnrc's yarnPath, ...), also for --help/--version: at least medium, never auto-run.
// Package managers and go only for a subcommand (`npm run …`, `go test`), interpreters only for a script or module
// (`node app.js`, `python3 -m x`); their bare --help/--version is the tool's own.
const PROJECT_TOOL = /^(?:pytest|py\.test|npx|pnpx|bunx|make|gmake|cargo|wrangler|tox|nox|gradlew?|mvnw?|rake|just|yarn)$/;
// package managers and project runners: with a subcommand (`npm run …`, `poetry run …`, `bundle exec …`)
const PROJECT_PM = /^(?:npm|pnpm|bun|deno|poetry|pipenv|pdm|hatch|uv|rye|bundle)$/;
const PROJECT_GO_INFO = /^(?:version|help|env)$/;
function projectCodeCheck(w, flags) {
  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.(?:exe|cmd|bat)$/i, '').toLowerCase();
  const pos = w.slice(1).filter((x) => !/^-/.test(String(x)));
  let runs = PROJECT_TOOL.test(h);
  if (PROJECT_PM.test(h)) runs = pos.some((x) => !/^(?:help|version)$/.test(x));
  else if (h === 'go') runs = pos.length > 0 && !PROJECT_GO_INFO.test(pos[0]);
  else if (INTERP_HEAD.test(h) && !/awk$/.test(h)) runs = pos.length > 0 || w.slice(1).some((x) => /^-m/.test(String(x)));
  if (runs) flags.projectCode ??= h;
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
const SCOPE_PHRASE = /(?:^|\s)(?:in|for|of|on|from|within|inside|under|at|w|we|dla|z)\s+(?:the\s+|a\s+)?(workspace|project|projek\w*|repo|repository|repozytori\w*|env|environment|srodowisk\w*|config|configuration|konfiguracj\w*)\s+(?!-)([^\s,;!?]+)/g;
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
    out.push({ kind: SCOPE_KIND[opt], value: quoted != null ? quoted.trim() || null : raw ? raw.replace(/[.,!?;:]+$/, '').replace(/^["'`]|["'`]$/g, '') || null : null, at: m.index });
  }
  const f = foldKeepLength(t).toLowerCase();
  for (const m of f.matchAll(SCOPE_PHRASE)) {
    const at = m.index + m[0].length - m[2].length;
    const value = t.slice(at, at + m[2].length).replace(/[.,!?;:]+$/, '').replace(/^["'`]|["'`]$/g, '');
    // "w projekcie na macu", "in the project with npm": a function word is no scope value
    if (SCOPE_NOT_VALUE.test(value) || isStopWord(value) || /^(?:on|onto|under|over|via|using|w|we|z|ze|na|do|od|po|przez|pod|nad)$/i.test(value)) continue;
    out.push({ kind: SCOPE_PHRASE_KIND(m[1]), value: value || null, at });
  }
  return out;
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
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
for (const shell of ['bash','powershell','cmd']) {
 const env={shell,os:shell==='bash'?'linux':'win32',coreutils:shell==='bash'?'gnu':'windows'};
 for (const query of ['run npm deploy --workspace \"packages/staging app\"','run npm deploy --workspace \"staging --workspace production\"','pip install requests --target C:/temp/packages','pip install requests --target /tmp/packages']) {
  const r=suggest(query,{env});
  console.log(JSON.stringify({shell,query,intent:r.intent,command:r.command,risk:r.risk,missing:r.missing,warnings:r.warnings,understood:r.understood}));
 }
}
JS" in /workspace/tellsh
 succeeded in 130ms:
{"shell":"bash","query":"run npm deploy --workspace \"packages/staging app\"","intent":"npm_run_script","command":"npm run deploy --workspace 'packages/staging app'","risk":"medium","missing":[],"warnings":[],"understood":true}
{"shell":"bash","query":"run npm deploy --workspace \"staging --workspace production\"","intent":"npm_run_script","command":"npm run deploy --workspace 'staging --workspace production'","risk":"medium","missing":[],"warnings":[],"understood":true}
{"shell":"bash","query":"pip install requests --target C:/temp/packages","intent":"pip_install","command":"python3 -m pip install requests --target C:/temp/packages","risk":"medium","missing":[],"warnings":[],"understood":true}
{"shell":"bash","query":"pip install requests --target /tmp/packages","intent":"pip_install","command":"python3 -m pip install requests --target /tmp/packages","risk":"medium","missing":[],"warnings":[],"understood":true}
{"shell":"powershell","query":"run npm deploy --workspace \"packages/staging app\"","intent":"npm_run_script","command":"npm run 'deploy' --workspace packages/staging app","risk":"medium","missing":[],"warnings":[],"understood":true}
{"shell":"powershell","query":"run npm deploy --workspace \"staging --workspace production\"","intent":"npm_run_script","command":"npm run 'deploy' --workspace staging --workspace production","risk":"medium","missing":[],"warnings":[],"understood":true}
{"shell":"powershell","query":"pip install requests --target C:/temp/packages","intent":"pip_install","command":"py -m pip install 'requests'","risk":"medium","missing":[],"warnings":[],"understood":true}
{"shell":"powershell","query":"pip install requests --target /tmp/packages","intent":"pip_install","command":"py -m pip install 'requests'","risk":"medium","missing":[],"warnings":[],"understood":true}
{"shell":"cmd","query":"run npm deploy --workspace \"packages/staging app\"","intent":"npm_run_script","command":"npm run deploy --workspace packages/staging app","risk":"medium","missing":[],"warnings":[],"understood":true}
{"shell":"cmd","query":"run npm deploy --workspace \"staging --workspace production\"","intent":"npm_run_script","command":"npm run deploy --workspace staging --workspace production","risk":"medium","missing":[],"warnings":[],"understood":true}
{"shell":"cmd","query":"pip install requests --target C:/temp/packages","intent":"pip_install","command":"py -m pip install requests","risk":"medium","missing":[],"warnings":[],"understood":true}
{"shell":"cmd","query":"pip install requests --target /tmp/packages","intent":"pip_install","command":"py -m pip install requests","risk":"medium","missing":[],"warnings":[],"understood":true}

codex
I found two shell variant issues: PowerShell/cmd emit quoted npm workspace values without quotes, and omit explicit pip `--target` values. Both produce complete commands with no warning. I’m checking whether the documented limits cover these cases. The test suite was partly blocked by the read-only filesystem; the latest release-guard tests passed.
exec
/bin/bash -lc "rg -n -i 'workspace|pip.*target|target.*pip' EVAL.md README.md; nl -ba src/variants.js | sed -n '615,629p'; command -v npm; rg -n 'workspace.*Array|workspace:|setWorkspaces|class RunScript' /usr/share/nodejs/npm /usr/lib/node_modules/npm /usr/local/lib/node_modules/npm 2>/dev/null" in /workspace/tellsh
 exited 2 in 0ms:
README.md:192:never the default scope: an npm workspace (`--workspace api`, `-w api`, `in workspace api`) is rendered as
README.md:193:`--workspace api`; a repository (`--repo a/b`, `-R a/b`, `in repo a/b`, `in project a/b`) as gh `--repo` (`merge pr 42
README.md:197:A quoted value is one value (`--workspace "staging app"` -> `--workspace 'staging app'`), and pip's install directory is
README.md:198:kept (`pip install requests --target /tmp/packages`, also `-t`) (v0.3 close5).
README.md:433:* **Scope options are read for npm, pip, gh and wrangler only**, from `--workspace` / `--repo` / `--env` / `--config` /
README.md:434:  `--prefix` / `--filter` / `--cwd` / `--project` (plus `-w` npm, `-R` gh, `-e` / `-c` wrangler) and "in workspace /
README.md:467:  - attached pip target is dropped: `pip install requests -t/tmp/pkgs` -> `python3 -m pip install requests` (write `-t /tmp/pkgs`);
README.md:468:  - a quoted workspace with a space after "in workspace" is cut: `run npm deploy in workspace "staging app"` ->
README.md:469:    `--workspace staging` (`--workspace "staging app"` is kept whole);
README.md:472:  - `~` in a pip target is quoted literally: `--target ~/packages` -> `--target '~/packages'` (use an absolute path; `$HOME/…` is quoted too);
EVAL.md:25:* **Attached pip target is dropped** (final5-codex): `pip install requests -t/tmp/pkgs` -> `python3 -m pip install requests`
EVAL.md:27:* **A quoted workspace with a space after "in workspace" is cut** (final5-codex): `run npm deploy in workspace "staging
EVAL.md:28:  app"` -> `npm run deploy --workspace staging`. `--workspace "staging app"` is kept whole.
EVAL.md:32:* **`~` in a pip target is quoted literally** (final5-codex): `pip install requests --target ~/packages` -> `--target
EVAL.md:64:`rm -r ~/Old`; `same for ~/'Old Projects'` was `rm -r ~/`). (6) *Values*: a quoted `--workspace "staging app"` is one value
EVAL.md:65:(rendered quoted); `pip --target DIR` / `-t DIR` is kept; `ssh -L` keeps the remote port and host (`forward local port 8080
EVAL.md:76:| final4 examples (5 mv/cp, 5 kill-except, 2 uninstall, docker, history, workspace, ssh, pip) without a wrong target | 0 / 17 | 17 / 17 |
EVAL.md:112:not run by `--yes`). (4) *Scope options* (`src/fill.js` `scopeSlots`): `--workspace` / `-w` / "in workspace X" is kept as
EVAL.md:113:`npm … --workspace X`; "in project a/b" is a gh repository (`merge pr 42 in project acme/backend` -> `gh pr merge 42
EVAL.md:127:| final3 examples (6 paths, pytest help, npm workspace, gh project) fixed | 0 / 9 | 9 / 9 |
EVAL.md:136:* Scope options are read for npm, pip, gh and wrangler only, from the listed options and "in workspace / repo / project /
   615	  docker_exec: { pwsh: 'docker exec -it {container} sh', cmd: 'docker exec -it {container} sh' },
   616	  docker_stats: { pwsh: 'docker stats --no-stream', cmd: 'docker stats --no-stream' },
   617	  docker_compose_up: { pwsh: 'docker compose up -d', cmd: 'docker compose up -d' },
   618	  docker_compose_down: { pwsh: 'docker compose down', cmd: 'docker compose down' },
   619	
   620	  // ---------- developer tools (v0.4) ----------
   621	  // npm / npx / gh / ssh are the same native programs in PowerShell and cmd.exe
   622	  npm_run_script: { pwsh: 'npm run {script}«--workspace {workspace!raw}»«{scope!raw}»', cmd: 'npm run {script}«--workspace {workspace!raw}»«{scope!raw}»' },
   623	  npm_install: { pwsh: 'npm {npmverb!raw}«{pkg}»«--workspace {workspace!raw}»«{scope!raw}»', cmd: 'npm {npmverb!raw}«{pkg}»«--workspace {workspace!raw}»«{scope!raw}»' },
   624	  npm_install_global: { pwsh: 'npm install -g {pkg}«{scope!raw}»', cmd: 'npm install -g {pkg}«{scope!raw}»' },
   625	  pip_install: { pwsh: { win: 'py -m pip install {pkg}«{scope!raw}»', unix: 'python3 -m pip install {pkg}«{scope!raw}»' }, cmd: 'py -m pip install {pkg}«{scope!raw}»' },
   626	  tool_version: { pwsh: '& {cmd} --version', cmd: '{cmd} --version' },
   627	  cli_help: { pwsh: '& {cmd} --help', cmd: '{cmd} --help' },
   628	  wrangler_deploy: { pwsh: 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»«{args!raw}»', cmd: 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»«{args!raw}»' },
   629	  wrangler_dev: { pwsh: 'npx wrangler dev«--env {wenv!raw}»«{args!raw}»', cmd: 'npx wrangler dev«--env {wenv!raw}»«{args!raw}»' },
/usr/bin/npm
/usr/share/nodejs/npm/lib/base-command.js:107:  async setWorkspaces (filters) {
/usr/share/nodejs/npm/lib/arborist-cmd.js:35:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/package-url-cmd.js:48:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/npm.js:170:    // normally this would be evaluated in base-command#setWorkspaces, see
/usr/share/nodejs/npm/lib/commands/view.js:153:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/commands/version.js:85:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/commands/version.js:125:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/commands/version.js:128:      // setWorkspaces has already parsed package.json so we know it won't error
/usr/share/nodejs/npm/lib/commands/unpublish.js:141:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/commands/run-script.js:30:class RunScript extends BaseCommand {
/usr/share/nodejs/npm/lib/commands/run-script.js:203:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/commands/run-script.js:213:        log.error(`  in workspace: ${pkg._id || pkg.name}`)
/usr/share/nodejs/npm/lib/commands/run-script.js:236:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/commands/query.js:74:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/commands/query.js:87:        const [workspace] = await tree.querySelectorAll(`.workspace:path(${workspacePath})`)
/usr/share/nodejs/npm/lib/commands/publish.js:165:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/commands/pack.js:78:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/commands/pkg.js:53:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/commands/owner.js:86:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/commands/diff.js:71:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/commands/exec.js:80:    await this.setWorkspaces(filters)
/usr/share/nodejs/npm/lib/commands/dist-tag.js:176:    await this.setWorkspaces(filters)

exec
/bin/bash -lc "sed -n '195,221p' /usr/share/nodejs/npm/lib/commands/run-script.js; rg -n -A26 \"define\\('workspace'\" /usr/share/nodejs/npm/lib/utils/config/definitions.js; sed -n '20,43p' EVAL.md; node --input-type=module <<'JS'
import {createRequire} from 'node:module';
import {suggest} from './src/pipeline.js';
const require=createRequire(import.meta.url);
const nopt=require('nopt');
console.log(JSON.stringify(nopt({workspace:[String,Array]}, {}, ['node','npm','run','deploy','--workspace','staging','--workspace','production'],2)));
for(const os of ['linux','win32']) {
 const r=suggest('pip install requests --target /tmp/packages',{env:{shell:'powershell',os,coreutils:os==='linux'?'gnu':'windows'}});
 console.log(JSON.stringify({os,command:r.command,risk:r.risk,missing:r.missing,warnings:r.warnings}));
}
JS" in /workspace/tellsh
 succeeded in 99ms:
    }

    this.npm.output('')
    return allScripts
  }

  async runWorkspaces (args, filters) {
    const res = []
    await this.setWorkspaces(filters)

    for (const workspacePath of this.workspacePaths) {
      const pkg = await rpj(`${workspacePath}/package.json`)
      const runResult = await this.run(args, {
        path: workspacePath,
        pkg,
      }).catch(err => {
        log.error(`Lifecycle script \`${args[0]}\` failed with error:`)
        log.error(err)
        log.error(`  in workspace: ${pkg._id || pkg.name}`)
        log.error(`  at location: ${workspacePath}`)

        const scriptMissing = err.message.startsWith('Missing script')

        // avoids exiting with error code in case there's scripts missing
        // in some workspaces since other scripts might have succeeded
        if (!scriptMissing) {
          process.exitCode = 1
2269:define('workspace', {
2270-  default: [],
2271-  type: [String, Array],
2272-  hint: '<workspace-name>',
2273-  short: 'w',
2274-  envExport: false,
2275-  description: `
2276-    Enable running a command in the context of the configured workspaces of the
2277-    current project while filtering by running only the workspaces defined by
2278-    this configuration option.
2279-
2280-    Valid values for the \`workspace\` config are either:
2281-
2282-    * Workspace names
2283-    * Path to a workspace directory
2284-    * Path to a parent workspace directory (will result in selecting all
2285-      workspaces within that folder)
2286-
2287-    When set for the \`npm init\` command, this may be set to the folder of
2288-    a workspace which does not yet exist, to create the folder and set it
2289-    up as a brand new workspace within the project.
2290-  `,
2291-  flatten: (key, obj, flatOptions) => {
2292-    definitions['user-agent'].flatten('user-agent', obj, flatOptions)
2293-  },
2294-})
2295-

### Known limits (release, v0.3): open review findings not fixed

Shipped with these known; each gives a complete command with no warning, so read the command before running it.

* **Attached pip target is dropped** (final5-codex): `pip install requests -t/tmp/pkgs` -> `python3 -m pip install requests`
  (installs into the active environment). Use `-t /tmp/pkgs` or `--target /tmp/pkgs`.
* **A quoted workspace with a space after "in workspace" is cut** (final5-codex): `run npm deploy in workspace "staging
  app"` -> `npm run deploy --workspace staging`. `--workspace "staging app"` is kept whole.
* **ssh `-L` with a bind address (4-part spec) is misread** (final5-codex): `ssh tunnel -L
  127.0.0.1:8080:db.internal:5432 user@bastion.example.com` -> `ssh -N -L 8080:localhost:8080 user@bastion.example.com`
  (wrong remote host and port). Only `-L PORT:HOST:PORT` is read.
* **`~` in a pip target is quoted literally** (final5-codex): `pip install requests --target ~/packages` -> `--target
  '~/packages'` (a directory named `~` under the working directory). Use an absolute path (`$HOME/…` is quoted literally too).
* **Two bare PIDs, one slot** (final5-claude suggestion, not adopted): `kill 1234 5678` -> `kill 5678` (one of them, no
  placeholder or warning). Name one PID per request.
* **Composer flags lost in the `compose_explained.json` regeneration** (final5-claude): `grep_text` (`-n`), `list_files`
  (`-a`), `git_current_branch` / `git_pull` (`branch -a`), `git_blame` (`diff --staged`) are no longer explained, so a
  request word can switch them to a read-only composed command (`pull all branches` -> `git branch -a`). Read-only only;
  extract intents are protected by the rule above.
* **Classifier misreads with a placeholder**: `kill 1234` -> `pkill -9 -f <NAME>` (kill_force); fill or rephrase
  (`kill pid 1234` -> `kill 1234`).
* **Word lists**: the extract verbs and the PID-protecting words above are closed English / Polish lists; another
  phrasing may not be read as protection
{"workspace":["staging","production"],"argv":{"remain":["run","deploy"],"cooked":["run","deploy","--workspace","staging","--workspace","production"],"original":["run","deploy","--workspace","staging","--workspace","production"]}}
{"os":"linux","command":"python3 -m pip install 'requests'","risk":"medium","missing":[],"warnings":[]}
{"os":"win32","command":"py -m pip install 'requests'","risk":"medium","missing":[],"warnings":[]}

codex
- **Major — npm workspace values become arguments** ([variants.js:622](/workspace/tellsh/src/variants.js:622)). PowerShell/cmd render `{workspace!raw}` despite allowing spaces. `run npm deploy --workspace "staging --workspace production"` becomes `npm run deploy --workspace staging --workspace production`, selecting both workspaces. It remains medium risk with no warning or placeholder. Quote workspace values in both variants.

- **Major — explicit pip destination silently disappears** ([variants.js:625](/workspace/tellsh/src/variants.js:625)). PowerShell/cmd omit `{piptarget}` entirely. `pip install requests --target /tmp/packages` becomes an install into the active Python environment, with no warning or placeholder. Preserve the destination or block execution. Unlike the documented attached `-t/path` limitation, this breaks the documented workaround.

VERDICT: REQUEST_CHANGES
tokens used
99,778
- **Major — npm workspace values become arguments** ([variants.js:622](/workspace/tellsh/src/variants.js:622)). PowerShell/cmd render `{workspace!raw}` despite allowing spaces. `run npm deploy --workspace "staging --workspace production"` becomes `npm run deploy --workspace staging --workspace production`, selecting both workspaces. It remains medium risk with no warning or placeholder. Quote workspace values in both variants.

- **Major — explicit pip destination silently disappears** ([variants.js:625](/workspace/tellsh/src/variants.js:625)). PowerShell/cmd omit `{piptarget}` entirely. `pip install requests --target /tmp/packages` becomes an install into the active Python environment, with no warning or placeholder. Preserve the destination or block execution. Unlike the documented attached `-t/path` limitation, this breaks the documented workaround.

VERDICT: REQUEST_CHANGES
