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
session id: 01a126d2-a942-7c70-81cd-cd79e8e279f9
--------
user
Re-review of tellsh (git diff 0d87457..HEAD; runtime src/ bin/, training scripts). History refs are now intentionally limited to 1 line back. Read-only. Findings with severity and file:line. End with exactly one line 'VERDICT: APPROVE' (no blocker/major) or 'VERDICT: REQUEST_CHANGES'.
codex
I’ll review the diff and affected runtime and training paths, treating the one-line history limit as intentional. I’ll keep the review read-only and report actionable findings with severity and file:line references.
exec
/bin/bash -lc "pwd && rg --files -g 'AGENTS.md' -g '*train*' -g 'package.json' -g 'pyproject.toml' -g 'Cargo.toml' -g 'go.mod' -g 'README*' -g '*test*' -g '"'!node_modules'"' -g '"'!vendor'"'" in /workspace/tellsh
 succeeded in 0ms:
/workspace/tellsh
test/regressions6.test.js
test/regressions3-render.test.js
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
test/slots.test.js
test/templates.test.js
README.md
data/shell/train.jsonl
data/tldr/README.md
package.json
scripts/hybrid/train_lm_gpu.py
scripts/hybrid/train_a_dev.sh
scripts/hybrid/train_encoder.py
scripts/train.py
hybrid/package/tellsh-model-enc/README.md
hybrid/package/tellsh-model-enc/package.json

exec
/bin/bash -lc 'git status --short && git diff --stat 0d87457..HEAD && git diff --name-only 0d87457..HEAD' in /workspace/tellsh
 succeeded in 0ms:
?? review/.h1done
?? review/r7-claude.md
?? review/r7-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   400 +-
 HYBRID.md                                    |   570 ++
 README.md                                    |   138 +-
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
 hybrid/results/v04_bench_after.json          |    76 +
 hybrid/results/v04_bench_after_real.json     |    76 +
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
 review/fix7-log.md                           |    43 +
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
 scripts/bench.js                             |     2 +-
 scripts/build_triggers.js                    |     8 +-
 scripts/check_variants.js                    |     5 +-
 scripts/compare.js                           |    59 +
 scripts/eval.js                              |   314 +-
 scripts/gen_data.js                          |    62 +-
 scripts/hybrid/bench_hybrid.js               |    74 +
 scripts/hybrid/cold_query.js                 |    12 +
 scripts/hybrid/dump_cascade.js               |    37 +
 scripts/hybrid/eval_hybrid.js                |   351 +
 scripts/hybrid/export_data.js                |   124 +
 scripts/hybrid/export_encoder.py             |   110 +
 scripts/hybrid/fetch_model.js                |    44 +
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
 src/cli.js                                   |    46 +-
 src/compose.js                               |   180 +-
 src/danger.js                                |   441 +-
 src/fill.js                                  |    78 +-
 src/history.js                               |   804 +-
 src/model.js                                 |    22 +-
 src/pipeline.js                              |   361 +-
 src/render.js                                |    96 +-
 src/rerank/encoder.js                        |   152 +
 src/rerank/hybrid.js                         |   104 +
 src/rerank/tokenizer.js                      |    92 +
 src/shellwords.js                            |    61 +-
 src/slots.js                                 |   100 +-
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
 test/regressions3-history.test.js            |    86 +
 test/regressions3-render.test.js             |   148 +
 test/regressions3.test.js                    |    46 +
 test/regressions4.test.js                    |   199 +
 test/regressions5.test.js                    |   144 +
 test/regressions6.test.js                    |   169 +
 test/regressions7.test.js                    |   143 +
 test/regressions8.test.js                    |   200 +
 test/shells.test.js                          |     8 +-
 156 files changed, 92380 insertions(+), 789 deletions(-)
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
test/shells.test.js

exec
/bin/bash -lc 'git diff 0d87457..HEAD -- src/pipeline.js src/cli.js bin/tellsh.js src/model.js' in /workspace/tellsh
exec
/bin/bash -lc 'cat review/fix7-log.md; cat test/regressions8.test.js; cat src/rerank/hybrid.js src/rerank/encoder.js src/rerank/tokenizer.js' in /workspace/tellsh
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
index c4f433c..fec013c 100644
--- a/src/cli.js
+++ b/src/cli.js
@@ -8,6 +8,8 @@ import { suggest as pipelineSuggest } from './pipeline.js';
 import { checkDanger, maxRisk } from './danger.js';
 import { detectEnv, normShell, normOs } from './env.js';
 import { loadHistory } from './history.js';
+import { joinWords } from './shellwords.js';
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
@@ -145,16 +158,22 @@ export async function main(argv = process.argv.slice(2)) {
   const opts = parseArgs(argv);
   if (opts.version) { console.log(pkg.version); return 0; }
   if (opts.help || !opts.words.length) { console.log(HELP); return opts.help ? 0 : 2; }
-  const query = opts.words.join(' ');
+  if (opts.badThreshold != null) { console.error(`tellsh: --threshold needs a number between 0 and 1 (got "${opts.badThreshold}")`); return 2; }
+  // the shell removed the quotes: a word with spaces is quoted again so "/tmp/a b" stays one path
+  const query = joinWords(opts.words);
+  if (query == null) { console.error('tellsh: an argument contains spaces and both kinds of quotes; it cannot be read as one value'); return 2; }
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
+    const so = { top: opts.top, threshold: opts.threshold, env, history, cwd: process.cwd(), compose: opts.compose };
+    s = opts.hybrid ? await suggestLazy(query, { ...so, system: process.env.TELLSH_HYBRID === 'safe' ? 'A+B-safe' : 'A+B' }) : pipelineSuggest(query, so);
   } catch (e) {
     console.error(`tellsh: ${e.message}`);
     return 1;
@@ -164,6 +183,12 @@ export async function main(argv = process.argv.slice(2)) {
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
@@ -184,8 +209,9 @@ export async function main(argv = process.argv.slice(2)) {
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
index c5430f7..694d07c 100644
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
@@ -32,17 +34,58 @@ const PRONOUN_VALUE = /^(it|its|that|this|them|those|one|again|back|there|here|t
 
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
+  // a bare function word ("on", "the", "w") is a tagging error, never a file or directory to act on
+  path: (v) => typeof v === 'string' && v.length < 256 && !/[\n\0\u0001]/.test(v) && /[\w~./]/.test(v) && !FUNCTION_WORD.test(v),
   name: WORDISH, service: WORDISH, container: WORDISH, pkg: WORDISH, cmd: WORDISH,
   branch: (v) => /^(?!-)[\w./-]{1,100}$/.test(v), user: (v) => /^[a-z_][\w.-]{0,31}$/i.test(v),
   glob: (v) => /^\*\.[\w]{1,8}$/.test(v),
   url: (v) => v.length < 2048 && (/^(?:https?|ftp|ftps|ssh|git|file):\/\/[^\s/?#]*[^\s]*$/i.test(v) || /^(?!-)[\w.-]+@[\w.-]+:[^\s]+$/.test(v)),
   host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
   pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
+  old: (v) => v.length > 0 && v.length < 300 && !/[\n\r\0]/.test(v), new: (v) => v.length < 300 && !/[\n\r\0]/.test(v),
 };
-for (const k of ['file', 'src', 'dst', 'dest', 'archive']) VALID_SLOT[k] = VALID_SLOT.path;
+const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
+for (const k of PATH_SLOT_NAMES) if (k !== 'path') VALID_SLOT[k] = VALID_SLOT.path;
 export function validSlot(k, v) {
   if (v == null || v === '') return false;
   if (isAmbiguous(v)) return false;
@@ -52,31 +95,101 @@ export function validSlot(k, v) {
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
   }
   finalizeSlots(intent, slots);
-  return { slots, sources, spans: t.spans };
+  return { slots, sources, spans: t.spans, withheld };
 }
 
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
+}
+const TEXT_SLOT_NAMES = ['pattern', 'message', 'text', 'name', 'old', 'new', 'service', 'container', 'pkg', 'cmd', 'branch', 'user'];
+
 const usesSlot = (intent, k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
 
 function flagTokens(cmd) {
@@ -96,11 +209,22 @@ function composeInput(text, model, tool) {
   const exT = exFromSpans(text, t.spans);
   const merged = { ...ex };
   if (exT.paths.length) merged.paths = exT.paths;
+  // paths followed by sentence punctuation (`/tmp/data!`): fine for a read-only command, but a composed
+  // command that changes something is never aimed at them (see blocksAmbiguous)
+  const amb = (merged.paths || []).filter((p) => trailingPunctAfter(text, p));
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
@@ -113,17 +237,26 @@ export function suggest(query, opts = {}) {
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
+    // an earlier `tellsh <query>`: what that request produced on its own (no history, no composer). Slots it left as
+    // placeholders (refused, ambiguous, rejected) are ambiguous values here, never the catalog default or a guess.
     const quick = (q) => {
-      const c = cascade(q, { model, extras: envFeatures(env) });
-      if (c.confidence < thr) return null;
-      return { intent: c.intent, slots: resolveWithTagger(c.intent, q, { model, tool: c.tool }).slots };
+      const r = suggest(q, { model, env, threshold: thr, compose: 'off' });
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
@@ -134,12 +267,32 @@ export function suggest(query, opts = {}) {
 
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
+  // a request about the entries of the referenced directory does not use the history at all: its intent is read
+  // without the history features (they favour `delete_dir` for "delete log files in this folder")
+  const c0 = cascade(query, { model, extras: ref?.contents ? envFeatures(env) : extras, top, restrictTool: sb ? FAMILY_OF[sb.lastIntent] : undefined });
+  // rerank: optional hybrid hook (src/rerank/hybrid.js); history rules keep the linear cascade's decision
+  const c = opts.rerank && !sb && !ref ? opts.rerank(c0, { thr }) : c0;
   const candidates = c.top.map((t) => ({ intent: t.intent, tool: t.tool, p: +t.p.toFixed(4), description: BY_ID[t.intent]?.description }));
   const tools = c.tools.map((t) => ({ tool: t.tool, p: +t.p.toFixed(4) }));
   let intent = c.intent;
@@ -147,16 +300,28 @@ export function suggest(query, opts = {}) {
   let method = 'catalog';
   if ((ref?.rule === 'pronoun' || ref?.rule === 'refused') && ref.intent) { intent = ref.intent; method = 'history-rule'; confidence = Math.max(confidence, thr); }
   if (sb) { method = 'history-rule'; confidence = Math.max(confidence, thr); context.rule = 'same-but'; context.note = `modifies previous ${sb.lastIntent}`; }
+  // "same but force" after `rm -r old; ls newdir`: the command it would modify is not the previous one
+  if (sb?.skipped && (BY_ID[sb.lastIntent].risk !== 'safe' || BY_ID[intent].risk !== 'safe')) {
+    context.rule = 'refused';
+    context.note = `the newest command that tellsh can modify (${sb.lastIntent}) is not the previous command; not guessing`;
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
     const ci = composeInput(query, model, capable[0]?.tool);
     const r = compose(query, capable, ci.ex, { patternOf: ci.pattern, nameOf: ci.nameOf });
     if (!r || r.invalid) return r?.invalid ? { invalid: r.invalid, command: r.command } : null;
+    if (blocksAmbiguous(r, ci.ambiguousPaths)) return null;
+    // a value with a line break (`"/tmp/a\nb"`) is never composed into a command: the catalog withholds it too
+    if (/[\r\n]/.test(r.command)) return null;
     // calibrated gate: confident stage-1 tool, or strong flag evidence (>= 2 triggered flags) for a likely tool
     const pOf = capable.find((t) => t.tool === r.tool)?.p ?? 0;
     if (composeMode !== 'force' && !(c.topToolP >= model.thresholds.compose || (r.triggered.length >= 2 && pOf >= 0.2))) return null;
@@ -172,53 +337,183 @@ export function suggest(query, opts = {}) {
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
+  let b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank] });
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
+      b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank] });
+      method = 'history-rule'; // history-derived: never auto-run by --yes
       context.rule ??= 'implicit';
       context.note = [context.note, `filled from history: ${filled.join(', ')}`].filter(Boolean).join('; ');
     }
   }
+  if (Object.values(r.sources).includes('history')) method = 'history-rule';
   const res = { ...out, understood: true, method, ...b, slotSources: r.sources, spans: r.spans.map((s) => ({ type: s.type, text: s.text })) };
+  if (ambiguousText.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: unclear where the quoted text ends (\\" may be an escaped quote) (${ambiguousText.join(', ')})`];
+  if (ambiguousPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${ambiguousPaths.join(', ')}); quote the path`];
+  if (unclearPaths.length) {
+    res.warnings = [...(res.warnings || []), unclearPaths.tooMany
+      ? `path left as a placeholder: the request names more paths than ${intent} takes (${explicitPaths(query).join(', ')}); run it once per path`
+      : `path left as a placeholder: it is the output of a command substitution (${unclearPaths.join(', ')})`];
+  }
   if (method === 'catalog' && ctx == null && hasPronoun(query) && b.missing.length) res.hint = 'this looks like a reference to an earlier command; try --history';
 
   // ---- second pass on modifier mismatch: the request asks for flags the catalog command lacks ----
   //   same tool: >= 1 triggered flag not in the catalog command; another stage-1 tool: >= 2 triggered flags
-  if (method === 'catalog' && composeMode !== 'off' && b.command && env.shell !== 'powershell' && env.shell !== 'cmd') {
+  if (method === 'catalog' && composeMode !== 'off' && b.command && !['powershell', 'cmd', 'fish'].includes(env.shell)) {
     const fam = FAMILY_OF[intent];
     const ci = composeInput(query, model, fam);
     const opt = { patternOf: ci.pattern, nameOf: ci.nameOf };
@@ -226,12 +521,14 @@ export function suggest(query, opts = {}) {
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

 succeeded in 0ms:
History references now use only the previous command, and every open finding in `review/r6-claude.md` and `review/r6-codex.md` is fixed. Everything is committed as `142fa6f` on `master`. All 295 tests pass, eval and bench were re-run, and nothing was pushed or published.

**One line of history**
- `buildContext` (`src/history.js`) reads only the most recent command. It first drops the current `tellsh` call, which zsh, fish and PowerShell write to the history file before it runs. The CLI now reads 2 lines instead of 10.
- All the logic that compared or combined older lines is gone. Rules within one compound line (`cat a.txt; ls`, `cd X && make`) still work.
- If the previous command has nothing of the needed type ("delete it" after `ls`), or can't be read, the reference is refused: you get a placeholder and a note, never an older value. "same for X" or "same but …" after a command that can't be repeated is refused the same way.
- Destructive requests still need confirmation. "delete that branch" is refused when the previous command checked that branch out. "delete that backups folder" is refused when the previous command named a different folder.

**Review findings fixed**
- **Blocker, both reviews:** a quoted path with a space is no longer cut. `tellsh delete folder "/tmp/a b"` gives `rm -r '/tmp/a b'`, both from the command line and from an earlier `tellsh` line in history. A request passed as one quoted argument is used as is.
- **Blocker, codex:** a history value that fails validation (e.g. a 265-character path) becomes a placeholder, never `find .`.
- **Major:** "delete all log files in this folder" with a refused reference now gives `find <PATH> … -delete`, never `rm -r .`.
- **Major:** "in the previous folder", "in the last directory", "the directory I listed" and "w poprzednim katalogu" are now treated like "there". A file named next to "there" ("delete notes.txt there") becomes a placeholder, with or without history.
- **Major, codex:** `git -C /tmp status` and `docker --context prod ps` count as listings again.
- **Minor:**
  - "its contents", "what is in it" and "usuń jego zawartość" no longer target the directory itself.
  - "move it there" is refused.
  - A request naming more paths than the command takes, or a path inside `` `…` `` or `$(…)`, gets a placeholder and a warning.
  - The danger checker now catches here-strings and heredocs, `sh -c 'rm -rf "$1"' _ /`, and truncating or overwriting system files (now critical).
  - A NUL byte in the request no longer crashes `suggest()`.

**Data, eval and docs**
- I changed 3 gold rows where the expected answer referenced an older line:
  - dev: "start it again" → `sudo systemctl start <SERVICE>`
  - blind: "push it" → `git push`
  - blind: "delete that branch" → `git branch -d <BRANCH>`
- I added 5 dev rows checking that an older line is never used. Their queries were already in the held-out set, so training data is unaffected.

| History eval | Before | After |
|---|---|---|
| Dev set | 91.7% (48 rows) | **92.5%** (53 rows) |
| Blind set | 79.7% | **82.3%** |

Both rows gained on the blind set come from rule changes, not the gold edits. All other eval numbers are unchanged. In the bench, the history case went from 1.6 to 0.74 ms. EVAL.md, the README history section, the CLI help and `review/fix7-log.md` are updated.

Things to check:
- **Blind set edits:** I edited 2 gold rows in a set described as "never used for tuning". EVAL.md lists each change, but you may prefer to keep those rows untouched.
- **"push it" after `git commit`:** it gives `git push`, which pushes the current branch, rather than a `<BRANCH>` placeholder. I judged that the right answer; say if you'd rather have the placeholder.
- **Training data vs `build/`:** regenerating the training data gives 43,564 classifier rows against 43,574 in the shipped model. HEAD without my changes gives the same 43,564, so this predates the round. It is probably the private real-usage data differing on this machine. I restored `build/` and did not retrain.
- **Commit identity:** git had no identity configured, so I committed as `lksrz <lukasz@wearfits.com>`, matching earlier commits, without changing git config.
- **Uncommitted files:** `review/STATUS` and `review/.hdone` look like review-tool markers, so I left them out.
edates this round, `build/` was restored, the model was not retrained.
- Bench re-run (EVAL.md): cold p50 177 ms, warm 0.40 ms, history case 0.74 ms (was 1.6 ms).
// Regression tests for round 7: history references read only the single most recent command, and the round-6
// findings (review/r6-claude.md, review/r6-codex.md): quoted paths with spaces keep their boundaries, invalid history
// values and refused references never fall back to `.`, more place references, "its contents", global options of
// git/docker before a listing, "move it there", several paths for one slot, command substitution, danger-checker gaps
// (here-strings, `sh -c … _ /`, truncating system files) and NUL bytes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { suggest } from '../src/pipeline.js';
import { checkDanger } from '../src/danger.js';
import { buildContext, tellshQuery, loadHistory } from '../src/history.js';
import { joinWords } from '../src/shellwords.js';
import { validateComposed } from '../src/compose.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, history) => suggest(q, { env: BASH, ...(history ? { history } : {}) });
const BIN = fileURLToPath(new URL('../bin/tellsh.js', import.meta.url));
const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
const refused = (r, ph, why) => {
  assert.equal(r.context.rule, 'refused', `${why}: ${JSON.stringify(r.context)} -> ${r.command}`);
  assert.ok(r.command == null || r.command.includes(ph), `${why}: ${r.command}`);
};

test('only the most recent history line is a reference target', () => {
  // the value two lines back is never used, for reads or changes
  for (const [q, h, ph] of [
    ['delete it', ['cat notes.txt', 'ls'], '<FILE>'],
    ['show it', ['cat notes.txt', 'pwd'], '<'],
    ['logs of that container', ['docker run -d --name web nginx', 'git status'], '<CONTAINER>'],
    ['restart that service', ['systemctl status nginx', 'uptime'], '<SERVICE>'],
    ['delete that branch', ['git checkout -b feature/x', 'git log -n 3'], '<BRANCH>'],
    ['kill it', ['pgrep worker', 'echo done'], '<'],
  ]) {
    const r = run(q, h);
    refused(r, ph, `${q} after ${JSON.stringify(h)}`);
    assert.ok(!/notes|web|nginx|feature|worker/.test(r.command ?? ''), `${q}: ${r.command}`);
  }
  // the previous command itself is used
  assert.equal(run('delete it', ['ls', 'cat notes.txt']).command, 'rm notes.txt');
  assert.equal(run('logs of that container', ['git status', 'docker run -d --name web nginx']).command, 'docker logs --tail 100 -f web');
  // "same for" / "same but" repeat only the previous command
  for (const q of ['same for /var', 'same but only file names', 'to samo dla /var']) {
    const r = run(q, ['du -sh /home', 'ls']);
    assert.equal(r.command, null, q);
    assert.equal(r.context.rule, 'refused', q);
  }
  assert.equal(run('same for /var', ['ls', 'du -sh /home']).command, 'du -sh /var');
  // the context holds one line
  const ctx = buildContext(['cat a.txt', 'docker logs web', 'mkdir /tmp/b']);
  assert.equal(ctx.n, 1);
  assert.deepEqual(ctx.ents, { dir: '/tmp/b' });
  assert.equal(buildContext([]).n, 0);
});

test('the running tellsh call is dropped once, then the previous command is the target', () => {
  assert.equal(run('delete it', ['cat a.txt', 'tellsh --history delete it']).command, 'rm a.txt');
  // the same request run twice: the earlier call is the previous command (and names nothing)
  const r = run('delete it', ['cat a.txt', 'tellsh delete it', 'tellsh delete it']);
  assert.ok(!/a\.txt/.test(r.command ?? ''), r.command);
  // the CLI reads the last two lines only
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r7-'));
  try {
    const f = join(dir, 'hist');
    writeFileSync(f, 'cat old.txt\nls\ncat new.txt\n');
    assert.deepEqual([...loadHistory({ file: f })], ['ls', 'cat new.txt']);
    const out = cli(['--dry-run', `--history=${f}`, '--shell', 'bash', '--os', 'linux', 'delete', 'it']);
    assert.match(out.stdout, /\$ rm new\.txt/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('blocker: a quoted path with a space keeps its boundaries (CLI argv and earlier tellsh lines)', () => {
  assert.equal(joinWords(['delete', 'folder', '/tmp/a b']), 'delete folder "/tmp/a b"');
  assert.equal(joinWords(['delete folder /tmp/x']), 'delete folder /tmp/x'); // one argument: the whole request
  assert.equal(joinWords(['x', `a "b" 'c'`]), null);
  const d = cli(['--json', '--shell', 'bash', '--os', 'linux', 'delete', 'folder', '/tmp/a b']);
  assert.equal(JSON.parse(d.stdout).command, "rm -r '/tmp/a b'");
  const f = cli(['--json', '--shell', 'bash', '--os', 'linux', 'delete', 'all', 'log', 'files', 'in', '/tmp/my logs']);
  assert.equal(JSON.parse(f.stdout).command, "find '/tmp/my logs' -type f -iname '*.log' -delete");
  // a whole request in one argument is unchanged
  assert.equal(JSON.parse(cli(['--json', '--shell', 'bash', '--os', 'linux', 'zabij proces na porcie 8080']).stdout).command, 'lsof -ti tcp:8080 -sTCP:LISTEN | xargs -r kill');
  // history: the tellsh line is read with its quoting
  assert.equal(tellshQuery('tellsh show folder "/tmp/my data"'), 'show folder "/tmp/my data"');
  assert.equal(tellshQuery("tellsh --shell bash delete folder '/tmp/a b'"), 'delete folder "/tmp/a b"');
  assert.equal(tellshQuery(`tellsh x "a \\"b\\" 'c'"`), false);
  for (const [h, q, exp] of [
    ['tellsh show folder "/tmp/my data"', 'delete it', "rm -r '/tmp/my data'"],
    ['tellsh delete folder "/tmp/a b"', 'delete it', "rm -r '/tmp/a b'"],
    ['tellsh delete all log files in "/tmp/a b"', 'same for txt', "find '/tmp/a b' -type f -iname '*.txt' -delete"],
  ]) assert.equal(run(q, [h]).command, exp, `${q} after ${h}`);
  // an earlier request that cannot be read back is a refusal, never a guess
  const u = run('delete it', [`tellsh x "a \\"b\\" 'c'"`]);
  refused(u, '<', 'unreadable tellsh line');
});

test('blocker: an invalid history value is a placeholder, never the default `.`', () => {
  const long = '/srv/' + 'segment/'.repeat(32) + 'logs';
  const a = run(`same for ${long}`, ['find /srv/old -type f -iname "*.log" -delete']);
  assert.equal(a.command, "find <PATH> -type f -iname '*.log' -delete");
  assert.ok(a.missing.includes('path'));
  const b = run('same but delete txt files', [`find ${long} -type f -iname "*.log" -delete`]);
  assert.equal(b.command, "find <PATH> -type f -iname '*.txt' -delete");
  assert.equal(b.context.rule, 'refused');
  const c = run('delete it', [`mkdir ${long}`]);
  assert.ok(!/\s\.$/.test(c.command) && c.command.includes('<PATH>'), c.command);
});

test('major: a refused reference never leaves `rm -r .`; a request about entries keeps its intent', () => {
  for (const h of [['ls /var/log'], ['cd /tmp/x; make']]) {
    for (const q of ['delete all log files in this folder', 'delete log files in this folder']) {
      const r = run(q, h);
      refused(r, '<PATH>', `${q} after ${h}`);
      assert.match(r.command, /^find <PATH> /, r.command);
    }
  }
  // without history the request is about the working directory
  assert.equal(run('delete all log files in this folder').command, "find . -type f -iname '*.log' -delete");
});

test('major: other wordings of the previous directory are place references', () => {
  for (const q of ['delete all log files in the previous folder', 'delete all log files in the last directory',
    'delete all log files in the directory I listed', 'usuń pliki log w poprzednim katalogu']) {
    const listed = run(q, ['ls /var/log']);
    refused(listed, '<PATH>', `${q} after ls`);
    assert.ok(!/poprzednim|\s\.\s/.test(listed.command), listed.command);
    const none = run(q);
    assert.ok(none.command.includes('<PATH>') && !/\s\.\s|poprzednim/.test(none.command), `${q}: ${none.command}`);
  }
  assert.equal(run('delete all log files in the previous folder', ['cd /tmp/x']).command, "find /tmp/x -type f -iname '*.log' -delete");
  // a path named next to a place word is withheld, with or without history
  for (const h of [undefined, ['cd /tmp/x']]) assert.equal(run('delete notes.txt there', h).command, 'rm <FILE>');
  // not references
  assert.equal(run('show the last modified files').command.includes('<PATH>'), false);
});

test('major: global options of git/docker do not hide a listing in the line', () => {
  refused(run('delete it', ['cat old.txt; git -C /tmp status']), '<FILE>', 'git -C');
  refused(run('stop it', ['docker logs old; docker --context prod ps']), '<CONTAINER>', 'docker --context');
  refused(run('stop it', ['docker logs old; docker -H tcp://h:2375 ps']), '<CONTAINER>', 'docker -H');
  assert.equal(run('stop it', ['docker --context prod logs web']).command, 'docker stop web');
  assert.equal(run('delete that branch', ['git -C /srv/app merge feature/x']).command, 'git branch -d feature/x');
});

test('minor: "its contents", "what is in it", "usuń jego zawartość" are not the directory', () => {
  for (const q of ['delete its contents', 'delete what is in it', 'usuń jego zawartość', 'remove the contents of it', 'delete its files']) {
    const r = run(q, ['cd /tmp/build']);
    refused(r, '<PATH>', q);
    assert.ok(!(r.command ?? '').includes('/tmp/build'), `${q}: ${r.command}`);
  }
  assert.equal(run('delete it', ['cd /tmp/build']).command, 'rm -r /tmp/build');
});

test('minor: "move it there" names both ends by reference and is refused', () => {
  for (const q of ['move it there', 'move that file there', 'copy it to the previous folder']) {
    const r = run(q, ['cd /tmp/x; cat a.txt']);
    assert.ok(r.command == null || (!/a\.txt|\/tmp\/x/.test(r.command) && r.command.includes('<')), `${q}: ${r.command}`);
  }
  assert.equal(run('copy notes.txt there', ['cd /tmp/x']).command, 'cp -ri notes.txt /tmp/x');
});

test('minor: several paths for one slot and command substitution are placeholders', () => {
  const m = run('delete all log files in "/tmp/x" and "/tmp/y"');
  assert.equal(m.command, "find <PATH> -type f -iname '*.log' -delete");
  assert.ok(m.warnings.some((w) => /more paths/.test(w)), m.warnings.join('; '));
  assert.equal(run('delete all log files in /tmp/x and /tmp/y').command, "find <PATH> -type f -iname '*.log' -delete");
  for (const q of ['delete all log files in `pwd`', 'delete all log files in $(pwd)']) {
    const r = run(q);
    assert.ok(r.command.includes('<PATH>') && !/\bpwd\b/.test(r.command), `${q}: ${r.command}`);
  }
  // unchanged: one path, two-path commands, reads
  assert.equal(run('move /tmp/a.txt to /tmp/b.txt').command, 'mv -i /tmp/a.txt /tmp/b.txt');
  assert.equal(run('delete all log files in /tmp/x').command, "find /tmp/x -type f -iname '*.log' -delete");
});

test('minor: danger checker: here-strings, sh -c with positional arguments, truncating system files', () => {
  for (const c of [`python3 - <<< "import os; os.system('rm -rf /')"`, "bash <<< 'rm -rf /'", `sh -c 'rm -rf "$1"' _ /`,
    `bash -c 'rm -rf $1' x /etc`, 'truncate -s0 /etc/passwd', '> /etc/passwd', 'echo x > /etc/shadow', ': > /boot/grub/grub.cfg']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', c);
    assert.ok(d.critical, `${c}: ${d.warnings.join('; ')}`);
  }
  for (const c of ['python3 <<EOF\nprint(1)\nEOF', 'perl - <<< "print 1"', 'curl -s https://x.example/a.py | python3', 'echo x >> /etc/hosts', 'truncate -s0 app.log']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', c);
    assert.ok(!d.critical, `${c}: ${d.warnings.join('; ')}`);
  }
  for (const c of ['cat a.json | python3 -m json.tool', 'grep x <<< "rm -rf /"', 'echo hi 2>/dev/null']) assert.equal(checkDanger(c).risk, 'safe', c);
});

test('minor: a NUL byte never reaches spawnSync', () => {
  for (const q of ['change permissions recursively to 777 on "/tmp/a\0b"', 'list files sorted by size in "/tmp/a\0b"', 'delete it\0']) {
    const r = suggest(q, { env: BASH });
    assert.equal(r.understood, false, q);
    assert.equal(r.command, null);
  }
  assert.equal(validateComposed('ls /tmp/a\0b', 'ls').ok, false);
});
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
  // v0.4 (enc-v2, recalibrated with the v0.4 A_dev); v0.3 had none: 0.5 and k: 5 for the safe variant
  'A+B': { tau: 0.9, k: 5, alpha: 0.5, accept: 0, none: 0.3, keepNone: true, tagger: 'A' },
  'A+B-safe': { tau: 0.9, k: 3, alpha: 0.5, accept: 0, none: 0.3, rescue: false, tagger: 'A' },
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
/bin/bash -lc 'for f in /AGENTS.md /workspace/AGENTS.md /workspace/tellsh/AGENTS.md; do if test -f "$f"; then cat "$f"; fi; done; cat package.json; git log -8 --oneline' in /workspace/tellsh
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
a816a06 history limited to 1 back + r6 fixes
142fa6f history: only the most recent command is a reference target; fix review round 6
afc7081 hybrid merge + real-usage data
0d3ff84 v0.4: before/after evaluation (A, A+B, A+C-ft) on held-out, blind, devtools and real-usage splits; docs
18988bc v0.4: B (enc-v2) retrained with the v0.4 intents and the real-usage train split; A+B recalibrated
31707e4 v0.4: 24 developer-tool intents from real usage; A retrained with a private real-usage split
42aee65 Merge branch 'hybrid': opt-in A+B neural re-ranker (--hybrid), study scripts and results
c9ec3b9 review status

exec
/bin/bash -lc 'cat src/history.js' in /workspace/tellsh
exec
/bin/bash -lc 'cat src/pipeline.js' in /workspace/tellsh
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
import { splitCommand, wordsOf, decodeWord, AMB, isAmbiguous, isExpansion, isGlob, rawOf, joinWords } from './shellwords.js';
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
  const t = String(line).trim();
  const tm = t.match(TELLSH_LINE);
  if (!tm) return null;
  const w = wordsOf(tm[1] || '', lineKind(t, kind), { literalTilde: false });
  if (!w) return tm[1] ? false : '';
  const words = [];
  for (let i = 0; i < w.length; i++) {
    if (TELLSH_VALUE_OPTS.has(w[i])) { i++; continue; }
    if (!/^-/.test(w[i])) words.push(rawOf(w[i]));
  }
  const q = joinWords(words);
  return q == null ? false : q;
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
 * -> { line, intent, slots, ents, at, searchDir?, ambiguous, cd?, fromTellsh?, opaque? }
 */
export function analyzeCommand(line, classify, kind = 'posix') {
  let ents = {};
  let intent = null;
  let slots = {};
  let ambiguous = false;
  const t = line.trim();
  const k = lineKind(t, kind);
  if (TELLSH_LINE.test(t)) {
    const q = tellshQuery(t, k);
    // a request that cannot be read back: it may have named any file or directory
    if (q === false) return { line: t, intent, slots, ents: { file: AMB + t, dir: AMB + t }, at: {}, listed: { file: 0, dir: 0 }, opaque: true, fromTellsh: true, ambiguous: true };
    const r = q && classify ? classify(q) : null;
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
    const p = nonFlags[nonFlags.length - 1];
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
    const p = nonFlags.filter((a) => !/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(a)).pop();
    if (p) e[/\/$/.test(p) ? 'dir' : 'file'] = p;
  } else if (DIR_HEADS.has(head)) {
    // find ROOT -name ...: the search root; other heads: the last directory argument (`ls /a /b` -> /b)
    // (find's root is the operands before its first expression word: `find -name "*.o"` has none)
    const p = head === 'find' ? args.slice(0, (args.findIndex((a) => /^[-(!]/.test(a)) + 1 || args.length + 1) - 1)[0] : nonFlags.filter((a) => !isGlob(a)).pop();
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
    if (q != null && (norm(q) === norm(query) || norm(list[list.length - 1]).includes(norm(query)))) list.pop();
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
  name: WORDISH, service: WORDISH, container: WORDISH, pkg: WORDISH, cmd: WORDISH,
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
  finalizeSlots(intent, slots);
  return { slots, sources, spans: t.spans, withheld };
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
function composeInput(text, model, tool) {
  const ex = extractSlots(text);
  const t = tag(text, tool, model);
  const exT = exFromSpans(text, t.spans);
  const merged = { ...ex };
  if (exT.paths.length) merged.paths = exT.paths;
  // paths followed by sentence punctuation (`/tmp/data!`): fine for a read-only command, but a composed
  // command that changes something is never aimed at them (see blocksAmbiguous)
  const amb = (merged.paths || []).filter((p) => trailingPunctAfter(text, p));
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
 *         slotMode: 'merge'|'tagger'|'regex', model }
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
    const quick = (q) => {
      const r = suggest(q, { model, env, threshold: thr, compose: 'off' });
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
  const c0 = cascade(query, { model, extras: ref?.contents ? envFeatures(env) : extras, top, restrictTool: sb ? FAMILY_OF[sb.lastIntent] : undefined });
  // rerank: optional hybrid hook (src/rerank/hybrid.js); history rules keep the linear cascade's decision
  const c = opts.rerank && !sb && !ref ? opts.rerank(c0, { thr }) : c0;
  const candidates = c.top.map((t) => ({ intent: t.intent, tool: t.tool, p: +t.p.toFixed(4), description: BY_ID[t.intent]?.description }));
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
    const ci = composeInput(query, model, capable[0]?.tool);
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
  let b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank] });
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
      b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank] });
      method = 'history-rule'; // history-derived: never auto-run by --yes
      context.rule ??= 'implicit';
      context.note = [context.note, `filled from history: ${filled.join(', ')}`].filter(Boolean).join('; ');
    }
  }
  if (Object.values(r.sources).includes('history')) method = 'history-rule';
  const res = { ...out, understood: true, method, ...b, slotSources: r.sources, spans: r.spans.map((s) => ({ type: s.type, text: s.text })) };
  if (ambiguousText.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: unclear where the quoted text ends (\\" may be an escaped quote) (${ambiguousText.join(', ')})`];
  if (ambiguousPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${ambiguousPaths.join(', ')}); quote the path`];
  if (unclearPaths.length) {
    res.warnings = [...(res.warnings || []), unclearPaths.tooMany
      ? `path left as a placeholder: the request names more paths than ${intent} takes (${explicitPaths(query).join(', ')}); run it once per path`
      : `path left as a placeholder: it is the output of a command substitution (${unclearPaths.join(', ')})`];
  }
  if (method === 'catalog' && ctx == null && hasPronoun(query) && b.missing.length) res.hint = 'this looks like a reference to an earlier command; try --history';

  // ---- second pass on modifier mismatch: the request asks for flags the catalog command lacks ----
  //   same tool: >= 1 triggered flag not in the catalog command; another stage-1 tool: >= 2 triggered flags
  if (method === 'catalog' && composeMode !== 'off' && b.command && !['powershell', 'cmd', 'fish'].includes(env.shell)) {
    const fam = FAMILY_OF[intent];
    const ci = composeInput(query, model, fam);
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
    if (comp && !comp.invalid && comp.command !== b.command) {
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
/bin/bash -lc 'git diff 0d87457..HEAD -- scripts/train.py scripts/gen_data.js scripts/lib/heldout.js scripts/lib/silver.js scripts/hybrid/export_data.js scripts/hybrid/train_encoder.py scripts/hybrid/train_lm_gpu.py scripts/hybrid/train_a_dev.sh' in /workspace/tellsh
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
index 0000000..c705e8f
--- /dev/null
+++ b/scripts/hybrid/export_data.js
@@ -0,0 +1,124 @@
+#!/usr/bin/env node
+// Export raw-text training data for the hybrid neural models (B: encoder, C: LM reranker).
+// Mirrors scripts/gen_data.js (same sources, same held-out filter, same teacher decisions, same silver spans and
+// relexicalisation) but writes text + char-offset spans instead of hashed features.
+//
+//   build/hybrid/train.jsonl  {text, tool, intent, lang, shell, os, spans:[[type,start,end]], gid, src, split}
+//     split = 'dev' for ~10% of the base sentence groups (all copies of a sentence stay on one side); dev rows are
+//     never used to fit B/C and serve to calibrate the hybrid thresholds.
+//   build/hybrid/meta.json    {tools, intents, intentTool, tagLabels}
+import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
+import { join } from 'node:path';
+import { fileURLToPath } from 'node:url';
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
+  const rows = [];
+  let gid = 0;
+  const push = (o) => rows.push(o);
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
+  writeFileSync(join(OUT, 'train.jsonl'), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
+  const meta = {
+    tools: [...Object.keys(FAMILIES), NONE],
+    intents: INTENTS.map((i) => i.id),
+    intentTool: Object.fromEntries(INTENTS.map((i) => [i.id, FAMILY_OF[i.id]])),
+    descriptions: Object.fromEntries(INTENTS.map((i) => [i.id, i.description])),
+    tagLabels: ['O', ...TAG_TYPES.flatMap((t) => [`B-${t}`, `I-${t}`])],
+  };
+  writeFileSync(join(OUT, 'meta.json'), JSON.stringify(meta, null, 1));
+  const c = (f) => rows.filter(f).length;
+  console.log(`export_data: ${base.length} base (${base.filter((r) => r.src === 'real').length} real), ${rows.length} rows (train ${c((r) => r.split === 'train')}, dev ${c((r) => r.split === 'dev')}), tldr ${c((r) => r.src === 'tldr')}, ood ${c((r) => r.src === 'ood')}`);
+}
+main();
diff --git a/scripts/hybrid/train_a_dev.sh b/scripts/hybrid/train_a_dev.sh
new file mode 100755
index 0000000..89d1580
--- /dev/null
+++ b/scripts/hybrid/train_a_dev.sh
@@ -0,0 +1,26 @@
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
+# gen_data: additionally drop every dev-split sentence (same hash as export_data.js)
+sed -e "s#if (heldOut.has(r0.text)) { dropped++; continue; }#if (heldOut.has(r0.text) || isDevText(r0.text)) { dropped++; continue; }#" \
+    -e "s#^import { ctxFeatures } from '../src/history.js';#&\nimport { fnv1a as _fnv } from '../src/features.js';\nconst isDevText = (t) => _fnv('dev:' + normalize(t)) % 10 === 0;#" \
+    $ROOT/scripts/gen_data.js > $T/scripts/gen_data.js
+# both substitutions must have happened (the import alone is not enough)
+grep -q 'heldOut.has(r0.text) || isDevText' $T/scripts/gen_data.js
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
index 0000000..4fddc1f
--- /dev/null
+++ b/scripts/hybrid/train_lm_gpu.py
@@ -0,0 +1,103 @@
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
+        for i in range(0, len(train) - a.bs + 1, a.bs):
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
/bin/bash -lc 'node --test test/' in /workspace/tellsh
exec
/bin/bash -lc "nl -ba src/pipeline.js | sed -n '315,570p'" in /workspace/tellsh
 succeeded in 0ms:
   315	    // composer vocabulary and quoting are POSIX-only (fish treats \\ and \' as escapes inside single quotes)
   316	    if (env.shell === 'powershell' || env.shell === 'cmd' || env.shell === 'fish') return null;
   317	    const capable = c.tools.filter((t) => t.tool !== NONE);
   318	    if (c.topTool === NONE && composeMode !== 'force') return null;
   319	    const ci = composeInput(query, model, capable[0]?.tool);
   320	    const r = compose(query, capable, ci.ex, { patternOf: ci.pattern, nameOf: ci.nameOf });
   321	    if (!r || r.invalid) return r?.invalid ? { invalid: r.invalid, command: r.command } : null;
   322	    if (blocksAmbiguous(r, ci.ambiguousPaths)) return null;
   323	    // a value with a line break (`"/tmp/a\nb"`) is never composed into a command: the catalog withholds it too
   324	    if (/[\r\n]/.test(r.command)) return null;
   325	    // calibrated gate: confident stage-1 tool, or strong flag evidence (>= 2 triggered flags) for a likely tool
   326	    const pOf = capable.find((t) => t.tool === r.tool)?.p ?? 0;
   327	    if (composeMode !== 'force' && !(c.topToolP >= model.thresholds.compose || (r.triggered.length >= 2 && pOf >= 0.2))) return null;
   328	    return { ...out, understood: true, method: 'composed', experimental: true, reason, intent: null, description: `composed ${r.tool}${r.sub ? ' ' + r.sub : ''} command (experimental)`,
   329	      command: r.command, risk: r.risk, baseRisk: 'medium', warnings: r.warnings, critical: r.critical, missing: [], slots: {}, notes: null,
   330	      composed: { tool: r.tool, sub: r.sub, flags: r.flags, validation: r.validation } };
   331	  };
   332	
   333	  if (confidence < thr && method === 'catalog') {
   334	    const comp = tryCompose('low confidence');
   335	    if (comp && !comp.invalid) return comp;
   336	    const hint = hasPronoun(query) && !ctx ? 'this looks like a reference to an earlier command; try --history' : null;
   337	    return { ...out, understood: false, method: 'none', hint, composeError: comp?.invalid || null };
   338	  }
   339	
   340	  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode, tagger: opts.tagger });
   341	  const slots = r.slots;
   342	  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
   343	  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
   344	  const ambiguousPaths = [];
   345	  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
   346	  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
   347	  const blank = new Set(r.withheld || []);
   348	  if (BY_ID[intent].risk !== 'safe') {
   349	    for (const k of Object.keys(slots)) {
   350	      if (PATH_SLOT_NAMES.has(k) && r.sources[k] !== 'history' && trailingPunctAfter(query, slots[k])) { ambiguousPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   351	    }
   352	    if (ambiguousPaths.length) finalizeSlots(BY_ID[intent], slots);
   353	  }
   354	  // a changing command whose path is the output of a command (`in \`pwd\``, `$(pwd)`), or a request that names more
   355	  // explicit paths than the command takes (`in /tmp/x and /tmp/y`: only one would be used): placeholder + warning
   356	  const unclearPaths = [];
   357	  if (BY_ID[intent].risk !== 'safe') {
   358	    const explicit = explicitPaths(query);
   359	    const nPathSlots = [...PATH_SLOT_NAMES].filter((k) => usesSlot(BY_ID[intent], k)).length;
   360	    const dropped = explicit.filter((p) => !Object.values(slots).some((v) => String(v) === p));
   361	    const tooMany = explicit.length > nPathSlots && dropped.length > 0;
   362	    // `in $(pwd)`: the location is the output of a command, so an empty path slot is withheld too (never `.`)
   363	    if (/\$\(|`/.test(query)) for (const k of ['path', 'file']) if (usesSlot(BY_ID[intent], k) && slots[k] == null && !unclearPaths.length) { unclearPaths.push(`${k}=?`); blank.add(k); }
   364	    for (const k of Object.keys(slots)) {
   365	      if (!PATH_SLOT_NAMES.has(k) || r.sources[k] === 'history') continue;
   366	      const sub = insideSubstitution(query, String(slots[k]));
   367	      if (sub || tooMany) { unclearPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   368	    }
   369	    if (tooMany) for (const k of PATH_SLOT_NAMES) if (usesSlot(BY_ID[intent], k) && slots[k] == null) blank.add(k);
   370	    if (unclearPaths.length || tooMany) finalizeSlots(BY_ID[intent], slots);
   371	    if (tooMany && !unclearPaths.length) unclearPaths.push(dropped.join(', '));
   372	    if (tooMany) unclearPaths.tooMany = true;
   373	  }
   374	  const ambiguousText = [];
   375	  for (const k of TEXT_SLOT_NAMES) {
   376	    if (slots[k] != null && cutAtEscapedQuote(query, slots[k])) { ambiguousText.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   377	  }
   378	  if (ambiguousText.length) { delete slots.sedexpr; delete slots.namepat; finalizeSlots(BY_ID[intent], slots); }
   379	  // "move it to /tmp/old", "copy them to /backup": the reference is the source, so the one path the request
   380	  // names is the destination (never `mv /tmp/old <DST>`). "copy notes.txt to it / into that folder / there":
   381	  // the reference is the destination and the named path the source (never `cp -ri /backup notes.txt`).
   382	  const itR = BY_ID[intent];
   383	  const fq = foldKeepLength(query).toLowerCase();
   384	  const twoPaths = usesSlot(itR, 'src') && usesSlot(itR, 'dst');
   385	  const isRef = ref?.rule === 'pronoun' || ref?.rule === 'refused';
   386	  const locative = hasLocative(query);
   387	  // "move it there": an object reference and a place reference at once. Which history value is the source and
   388	  // which the destination cannot be told from one previous command (`cd /tmp/x; cat a.txt`): both are withheld.
   389	  const bothRefs = twoPaths && locative && hasPronoun(query);
   390	  const refDst = !bothRefs && twoPaths && isRef && REF_DST.test(fq);
   391	  // the slots the reference fills (pronoun) or leaves empty (refused / guarded)
   392	  const refFill = refDst ? (ref.fill ? { dst: Object.values(ref.fill)[0] } : {}) : ref?.fill || {};
   393	  if (bothRefs) {
   394	    for (const k of Object.keys(slots)) if (PATH_SLOT_NAMES.has(k)) { delete slots[k]; delete r.sources[k]; }
   395	    for (const k of PATH_SLOT_NAMES) if (usesSlot(itR, k)) blank.add(k);
   396	    finalizeSlots(itR, slots);
   397	    if (ctx) { context.rule = 'refused'; context.note = 'the request names both what to move and where ("it" … "there"); not guessing which is which'; }
   398	    method = ctx ? 'history-rule' : method;
   399	  } else if (refDst) {
   400	    if (slots.src == null && slots.dst != null && !PRONOUN_VALUE.test(String(slots.dst))) { slots.src = slots.dst; r.sources.src = r.sources.dst; }
   401	    delete slots.dst; delete r.sources.dst;
   402	    if (slots.src != null && PRONOUN_VALUE.test(String(slots.src))) { delete slots.src; delete r.sources.src; }
   403	    if (ref.rule === 'refused') blank.add('dst');
   404	  } else if (isRef && twoPaths && slots.src != null && slots.dst == null &&
   405	      !PRONOUN_VALUE.test(String(slots.src)) && (ref.fill?.src != null || ref.blank?.includes('src'))) {
   406	    slots.dst = slots.src; r.sources.dst = r.sources.src;
   407	    delete slots.src; delete r.sources.src;
   408	    if (ref.rule === 'refused' || ref.guarded) blank.add('src');
   409	  }
   410	  // "move them to /tmp/old" with nothing resolved for "them" (no history, an unrelated history, ...): the one named
   411	  // path follows "to"/"into"/"do", so it is the destination; the source stays a placeholder (never `mv /tmp/old <DST>`)
   412	  if (!bothRefs && twoPaths && slots.src != null && slots.dst == null && !refDst && afterDestWord(query, String(slots.src))) {
   413	    slots.dst = slots.src; r.sources.dst = r.sources.src;
   414	    delete slots.src; delete r.sources.src;
   415	    blank.add('src');
   416	  }
   417	  // values that are only the words of a refused or guarded reference: a pronoun, or the `.` the tagger reads for
   418	  // "this folder" / "that directory" (never `rm -r .` for "delete all log files in this folder")
   419	  const refWordsOnly = () => {
   420	    for (const k of Object.keys(slots)) {
   421	      if (PRONOUN_VALUE.test(String(slots[k])) || (PATH_SLOT_NAMES.has(k) && slots[k] === '.' && !/(?:^|\s)\.(?:\s|$)/.test(query))) { delete slots[k]; delete r.sources[k]; }
   422	    }
   423	  };
   424	  if (ref?.rule === 'refused') {
   425	    // the reference points at something we cannot read safely: leave the slot empty (placeholder)
   426	    refWordsOnly();
   427	    for (const k of refDst ? [] : ref.blank || []) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
   428	    finalizeSlots(BY_ID[intent], slots);
   429	    method = 'history-rule';
   430	  }
   431	  // "remove the logs there", "delete notes.txt there": a place reference never names the object of a changing
   432	  // command (`rm -r DIR`, `mv DIR …`); only the location a search-and-change runs in (`find DIR … -delete`). Any path
   433	  // the request names is relative to the wrong directory, so every path slot is withheld (with or without history).
   434	  if (locative && !refDst && !bothRefs && BY_ID[intent].risk !== 'safe' && FAMILY_OF[intent] !== 'find' && [...PATH_SLOT_NAMES].some((k) => usesSlot(BY_ID[intent], k))) {
   435	    for (const k of Object.keys(slots)) if (PATH_SLOT_NAMES.has(k)) { delete slots[k]; delete r.sources[k]; }
   436	    for (const k of PATH_SLOT_NAMES) if (usesSlot(BY_ID[intent], k)) blank.add(k);
   437	    finalizeSlots(BY_ID[intent], slots);
   438	    if (ctx) {
   439	      context.rule = 'refused';
   440	      context.note = `"there" names a place, not what ${intent} would change; not guessing`;
   441	      method = 'history-rule';
   442	    }
   443	  } else if (ref?.rule === 'pronoun' && ref.guarded && BY_ID[intent].risk !== 'safe') {
   444	    // the value must not be changed (search root, listed directory, ...; see changeGuard) and the classifier
   445	    // picked a modifying intent: refuse
   446	    refWordsOnly();
   447	    for (const k of Object.keys(refFill)) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
   448	    finalizeSlots(BY_ID[intent], slots);
   449	    context.rule = 'refused';
   450	    context.note = ref.guardNote;
   451	    method = 'history-rule';
   452	  } else if (ref?.rule === 'pronoun') {
   453	    const it = BY_ID[intent];
   454	    for (const [k, v] of Object.entries(refFill)) {
   455	      if (!validSlot(k, v)) {
   456	        // the referenced value cannot be used (too long, a newline, ...): placeholder, never the catalog default
   457	        if (slots[k] != null && PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
   458	        if (slots[k] == null && usesSlot(it, k)) blank.add(k);
   459	        continue;
   460	      }
   461	      // the referenced value wins unless the request spells out its own value literally ("kill 4242")
   462	      const literal = slots[k] != null && !PRONOUN_VALUE.test(String(slots[k])) && new RegExp(`(^|[^\\w])${String(slots[k]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^\\w])`, 'i').test(query);
   463	      if (usesSlot(it, k) && (!literal || (k === 'path' && slots[k] === '.'))) { slots[k] = v; r.sources[k] = 'history'; }
   464	    }
   465	    // the chosen command does not take the referenced value: do not claim it was used
   466	    if (!Object.values(r.sources).includes('history')) { context.rule = null; context.note = `the ${ref.ent} from history does not fit ${intent}; not used`; }
   467	    finalizeSlots(it, slots);
   468	    method = 'history-rule';
   469	  }
   470	  if (sb) {
   471	    const it = BY_ID[intent];
   472	    for (const [k, v] of Object.entries(validHistorySlots(sb.lastSlots))) {
   473	      if (usesSlot(it, k) && slots[k] == null && !blank.has(k) && !['namepat', 'sedexpr'].includes(k)) { slots[k] = v; r.sources[k] = 'history'; }
   474	    }
   475	    // a slot of the previous command that depends on the shell state (`find "$DIR" …`) or is not a valid value
   476	    // (a 300-character path): placeholder, not `.`
   477	    const withheld = [...(sb.blank || []), ...invalidHistorySlots(sb.lastSlots)].filter((k) => usesSlot(it, k) && slots[k] == null && !['namepat', 'sedexpr'].includes(k));
   478	    for (const k of withheld) blank.add(k);
   479	    if (withheld.length) { context.rule = 'refused'; context.note = `previous ${sb.lastIntent} has ${withheld.join(', ')} that depends on the shell state or is not a valid value; not guessing`; }
   480	    finalizeSlots(it, slots);
   481	  }
   482	  let b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank] });
   483	  // implicit reference: a required slot is still missing and the history has a value of that type.
   484	  // Only for safe intents: a destructive command ("delete the folder") is never aimed at a history
   485	  // value without an explicit reference word ("delete it"), which goes through resolveReference.
   486	  if (ctx && b.missing.length && ref?.rule !== 'refused' && BY_ID[intent].risk === 'safe' && b.risk === 'safe') {
   487	    const filled = [];
   488	    for (const m of b.missing) {
   489	      if (r.withheld?.includes(m)) continue; // "list files in the": not a reference to history either
   490	      const e = entityForSlot(m, ctx);
   491	      // an ambiguous newest value blocks the fill; ctx.last is consulted only when no entity type applies
   492	      const v = e ? (e.ambiguous ? null : e.value) : (ctx.last?.slots?.[m] ?? null);
   493	      if (v != null && validSlot(m, v)) { slots[m] = v; r.sources[m] = 'history'; filled.push(`${m}=${v}`); }
   494	    }
   495	    if (filled.length) {
   496	      finalizeSlots(BY_ID[intent], slots);
   497	      b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank] });
   498	      method = 'history-rule'; // history-derived: never auto-run by --yes
   499	      context.rule ??= 'implicit';
   500	      context.note = [context.note, `filled from history: ${filled.join(', ')}`].filter(Boolean).join('; ');
   501	    }
   502	  }
   503	  if (Object.values(r.sources).includes('history')) method = 'history-rule';
   504	  const res = { ...out, understood: true, method, ...b, slotSources: r.sources, spans: r.spans.map((s) => ({ type: s.type, text: s.text })) };
   505	  if (ambiguousText.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: unclear where the quoted text ends (\\" may be an escaped quote) (${ambiguousText.join(', ')})`];
   506	  if (ambiguousPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${ambiguousPaths.join(', ')}); quote the path`];
   507	  if (unclearPaths.length) {
   508	    res.warnings = [...(res.warnings || []), unclearPaths.tooMany
   509	      ? `path left as a placeholder: the request names more paths than ${intent} takes (${explicitPaths(query).join(', ')}); run it once per path`
   510	      : `path left as a placeholder: it is the output of a command substitution (${unclearPaths.join(', ')})`];
   511	  }
   512	  if (method === 'catalog' && ctx == null && hasPronoun(query) && b.missing.length) res.hint = 'this looks like a reference to an earlier command; try --history';
   513	
   514	  // ---- second pass on modifier mismatch: the request asks for flags the catalog command lacks ----
   515	  //   same tool: >= 1 triggered flag not in the catalog command; another stage-1 tool: >= 2 triggered flags
   516	  if (method === 'catalog' && composeMode !== 'off' && b.command && !['powershell', 'cmd', 'fish'].includes(env.shell)) {
   517	    const fam = FAMILY_OF[intent];
   518	    const ci = composeInput(query, model, fam);
   519	    const opt = { patternOf: ci.pattern, nameOf: ci.nameOf };
   520	    const have = flagTokens(b.command);
   521	    const expl = new Set(explained()[intent] || []);
   522	    const unexplained = (cmp) => cmp.triggered.filter((f) => !expl.has((cmp.sub ? cmp.sub + ' ' : '') + f));
   523	    let comp = compose(query, [{ tool: fam, p: 1 }], ci.ex, opt);
   524	    if (blocksAmbiguous(comp, ci.ambiguousPaths)) comp = null;
   525	    // same tool: the composed command must keep the catalog command's head (+ git/docker subcommand)
   526	    const sameHead = comp && !comp.invalid && headOf(comp.command) === headOf(b.command);
   527	    let extra = sameHead ? unexplained(comp).filter((f) => [...flagTokens(f)].some((x) => !have.has(x))) : [];
   528	    if (!extra.length) {
   529	      const others = c.tools.filter((t) => t.tool !== NONE && t.p >= 0.05);
   530	      let alt = compose(query, others.length ? others : [{ tool: fam, p: 1 }], ci.ex, opt);
   531	      if (blocksAmbiguous(alt, ci.ambiguousPaths)) alt = null;
   532	      const ux = alt && !alt.invalid && headOf(alt.command) !== headOf(b.command) ? unexplained(alt) : [];
   533	      if (ux.length >= 2) { comp = alt; extra = ux; }
   534	    }
   535	    if (comp && !comp.invalid && comp.command !== b.command) {
   536	      if (extra.length >= 1 || composeMode === 'force') {
   537	        return { ...res, method: 'composed', experimental: true, reason: `request asks for ${extra.join(' ')} not in the catalog command`,
   538	          catalogCommand: b.command, description: `composed ${comp.tool}${comp.sub ? ' ' + comp.sub : ''} command (experimental)`,
   539	          command: comp.command, risk: comp.risk, baseRisk: 'medium', warnings: comp.warnings, critical: comp.critical, missing: [],
   540	          composed: { tool: comp.tool, sub: comp.sub, flags: comp.flags, validation: comp.validation } };
   541	      }
   542	    }
   543	  }
   544	  return res;
   545	}

exec
/bin/bash -lc "rg -n '"'^(export |function |const [A-Z_]+)'"' src/history.js src/danger.js src/render.js src/compose.js; cat review/fix7-log.md" in /workspace/tellsh
 succeeded in 0ms:
src/compose.js:17:const PATHISH = /(?:^|\s)(?:[~.]?\/\S*|\S+\/\S*|[\w-]+\.[A-Za-z0-9]{1,6}|\*\.\w+)(?=\s|$|[,;!?])/g;
src/compose.js:22:const F = (flag, triggers, extra = {}) => ({ flag, triggers, ...extra });
src/compose.js:24:export const TOOLS = {
src/compose.js:257:function tldrTriggers() {
src/compose.js:263:const FAMILY_TOOL = { ls: 'ls', find: 'find', grep: 'grep', du: 'du', df: 'df', ps: 'ps', tar: 'tar', sort: 'sort',
src/compose.js:265:export const composerTools = () => Object.keys(FAMILY_TOOL);
src/compose.js:267:function triggerScore(fq, triggers) {
src/compose.js:277:const STOP = new Set('the a an of in on to for and or with by from all show list display me my files file plik pliki w z na do i oraz pokaz wyswietl'.split(' '));
src/compose.js:278:function tldrScore(fq, stems) {
src/compose.js:286:function selectFlags(fq, spec, head, sub) {
src/compose.js:301:export function triggeredFlags(query, toolFamily) {
src/compose.js:315:function expansionOutsideSingleQuotes(cmd) {
src/compose.js:335:export function validateComposed(cmd, toolName, sub) {
src/compose.js:378:export function compose(query, tools, ex, { patternOf, nameOf } = {}) {
src/danger.js:9:const RANK = { safe: 0, medium: 1, high: 2 };
src/danger.js:10:export const maxRisk = (a, b) => (RANK[b] > RANK[a] ? b : a);
src/danger.js:17:const PS_SQ = /['\u2018\u2019\u201A\u201B]/;
src/danger.js:18:const PS_DQ = /["\u201C\u201D\u201E]/;
src/danger.js:22:export function simpleCommands(cmd, { winPaths = false } = {}) {
src/danger.js:65:const WRAPPER_OPTARG = {
src/danger.js:95:const CMD_STRING_ANY = /^(?:-c|--command|--session-command)$/;
src/danger.js:96:const CMD_STRING_CLUSTER = /^-[a-zA-Z]*c$/;
src/danger.js:97:const SHELLS = /^(?:ba|z|da|k|fi|c|tc|a|mk|r)?sh$|^busybox$/;
src/danger.js:98:const PRIVILEGED = new Set(['sudo', 'doas', 'su', 'runuser', 'pkexec', 'run0', 'sudoedit']);
src/danger.js:100:const RUNNERS = new Set(['su', 'runuser', 'flock', 'script', 'eval', 'env', 'watch', 'tmux', 'screen', 'ssh', 'xargs', 'parallel', 'sudo', 'doas',
src/danger.js:102:const WRAPPERS = new Set(['sudo', 'doas', 'run0', 'command', 'builtin', 'exec', 'nohup', 'time', 'nice', 'ionice', 'then', 'do', 'else', '&', 'busybox', 'toybox', 'xargs', 'timeout', 'chroot', 'stdbuf', 'env', 'setsid', 'unbuffer', 'caffeinate',
src/danger.js:108:const SUFFIX_RUNNERS = new Set(['ssh', 'mosh', 'kubectl', 'docker', 'podman', 'lxc', 'incus', 'machinectl', 'distrobox', 'toolbox', 'flatpak', 'nix-shell', 'firejail', 'bwrap']);
src/danger.js:111:const DATA_ARGS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'sed', 'awk', 'gawk', 'mawk', 'echo', 'printf', 'man', 'which', 'whereis',
src/danger.js:117:const DANGER_HEADS = /^(?:rm|rmdir|unlink|shred|wipe|wipefs|mkfs(?:\.\w+)?|mke2fs|dd|truncate|kill|pkill|killall|chmod|chown|chgrp|mv|cp|rsync|find|tar|tee|sh|bash|zsh|dash|ksh|fish|eval|shutdown|reboot|halt|poweroff|crontab|iptables|remove-item|ri|del|erase|rd|format|diskpart|stop-process|format-volume|clear-disk)$/i;
src/danger.js:120:function payloads(w, inner, flags) {
src/danger.js:158:function withPositional(str, args) {
src/danger.js:164:export function commandWords(words, inner = [], flags = {}) {
src/danger.js:194:export function commandChains(words, inner, flags) {
src/danger.js:220:export function normTarget(t) {
src/danger.js:238:const SYS_CRIT = /^(?:\/\*?|(?:~|\$\{?HOME\}?)(?:\/\*|\/\.(?:ssh|gnupg|config|local)(?:\/\*)?)?|\/(?:bin|boot|dev|etc|home|lib\w*|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private)(?:\/\*)?|\/(?:bin|boot|etc|home|lib\w*|sbin|usr|System|Users|Library|private)\/[^/*]+(?:\/\*)?|\/var\/(?:lib|db|spool|log|mail|backups)(?:\/\*)?|\/usr\/local\/[^/*]+(?:\/\*)?)$/;
src/danger.js:241:const POSIX_CRIT_TARGET = /^(?:\/+|\/+\*|~\/*|~\/+\*|\$\{?HOME\}?\/*|\$\{?HOME\}?\/+\*|\*|\.\/*|\.\/+\*|\.\.\/*|\.\.\/+\*|\.\*|\/+(?:bin|boot|dev|etc|home|lib|lib32|lib64|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private)\/*\*?)$/;
src/danger.js:243:function rmCheck(words, hit) {
src/danger.js:272:function killCheck(words, hit) {
src/danger.js:282:const PS_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*\*?|[\\/]+\*?|\*|~[\\/]*\*?|\$(?:HOME|env:USERPROFILE|env:HOMEDRIVE|env:SystemDrive|env:SystemRoot|env:windir|\{env:USERPROFILE\})[\\/]*\*?|[A-Za-z]:[\\/]+(?:Windows|Users|Program Files(?: \(x86\))?|ProgramData)[\\/]*\*?)$/i;
src/danger.js:283:const PS_REMOVE = /^(?:remove-item|ri|rm|del|erase|rd|rmdir)$/i;
src/danger.js:286:function removeItemCheck(words, hit) {
src/danger.js:302:const CMD_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*\*?(?:\.\*)?|[\\/]+\*?|\*(?:\.\*)?|%(?:USERPROFILE|HOMEDRIVE|HOMEPATH|SystemDrive|SystemRoot|windir)%[\\/]*\*?(?:\.\*)?)$/i;
src/danger.js:305:function cmdDelCheck(words, hit) {
src/danger.js:314:const SYS_PATH = /^\/+(?:etc|boot|bin|sbin|usr|lib\w*|dev|proc|sys)(?:\/|$)/;
src/danger.js:315:const NULL_SRC = /^\/dev\/(?:null|zero|u?random)$/;
src/danger.js:322:function findCheck(w, hit) {
src/danger.js:331:function rsyncCheck(w, hit) {
src/danger.js:340:function copyCheck(w, hit) {
src/danger.js:354:const LISTERS = /^(?:get-childitem|gci|dir|ls|get-item|gi)$/i;
src/danger.js:356:function pipelineDeleteCheck(text, hit) {
src/danger.js:388:function permCheck(w, hit) {
src/danger.js:400:const TOP_DIR = /^(?:\/|\/(?:bin|boot|dev|etc|home|lib\w*|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private))$/;
src/danger.js:402:const RAW_DISK = /^\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk|rdisk|md|dm-|mapper\/|loop)\w*/;
src/danger.js:404:function rawDiskWriteCheck(w, hit) {
src/danger.js:411:const INTERP_CODE = [
src/danger.js:419:const AWK = /^(?:awk|gawk|mawk|nawk|busybox-awk)$/;
src/danger.js:420:const DELETE_CALL = /\b(?:rmtree|rm_rf|rm_r|rmdir|removedirs|rmSync|rmdirSync|unlink(?:Sync)?|remove|rm|delete|chmod|chown|chmodSync|chownSync)\s*\(?\s*(?:path\s*=\s*)?[rb]?['"]([^'"]*)['"]/g;
src/danger.js:421:function inlineCode(w) {
src/danger.js:438:function interpCheck(w, hit) {
src/danger.js:444:const INTERP_HEAD = /^(?:python[\d.]*|pypy[\d.]*|perl[\d.]*|(?:j?ruby)[\d.]*|node|nodejs|bun|deno|php[\d.]*|lua[\d.]*|luajit|julia|rscript|osascript|tclsh|awk|gawk|mawk|nawk)$/;
src/danger.js:450:function stdinCodeCheck(w, hit, inner) {
src/danger.js:464:function codeCheck(ic, hit) {
src/danger.js:476:function tarCheck(w, hit) {
src/danger.js:490:function dockerCheck(w, hit) {
src/danger.js:508:const RULES = [
src/danger.js:558:const OPTVAL = String.raw`(?:'[^']*'|"[^"]*"|[^\s;&|'"])+`;
src/danger.js:559:const GIT_GLOBALS = new RegExp(String.raw`\bgit((?:\s+(?:(?:-C|-c|--git-dir|--work-tree|--namespace|--super-prefix|--config-env|--exec-path)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
src/danger.js:560:const DOCKER_GLOBALS = new RegExp(String.raw`\bdocker((?:\s+(?:(?:-H|--host|-c|--context|--config|-l|--log-level|--tls\w*)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
src/danger.js:561:export function normalizeGlobals(command) {
src/danger.js:566:export function checkDanger(command, baseRisk = 'safe', { lenient = false } = {}) {
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
src/history.js:232:function destEnts(srcs, dst, ents) {
src/history.js:243:const VALUE_OPTS = {
src/history.js:259:function parseArgs(args, valueOpts = new Set()) {
src/history.js:279:function unwrap(w) {
src/history.js:287:const CD_HEADS = new Set(['cd', 'pushd', 'popd', 'chdir', 'set-location', 'sl', 'push-location', 'pop-location']);
src/history.js:289:export const isRelativePath = (v) => {
src/history.js:293:const PATH_SLOT_KEYS = ['path', 'file', 'src', 'dst', 'dest', 'archive'];
src/history.js:295:function staleRelative(ents, slots) {
src/history.js:301:const REDIR_TARGET_OP = /^\d*(?:[<>]{1,2}[&|]?|&>>?)$/;
src/history.js:302:const REDIR_DUP_OP = /^\d*[<>]+&[\d-]+$/;
src/history.js:305:function psNative(head, args, ents, setIntent) {
src/history.js:345:function entsFromSlots(intent, slots, ents) {
src/history.js:364:const TELLSH_LINE = /^(?:npx\s+(?:-y\s+)?|node\s+)?(?:\S*[\\/])?tellsh(?:\.js)?(?:\s+(.*))?$/s;
src/history.js:367:const TELLSH_VALUE_OPTS = new Set(['--shell', '--os', '--platform', '--top', '--threshold']);
src/history.js:373:export function tellshQuery(line, kind = 'posix') {
src/history.js:399:export function analyzeCommand(line, classify, kind = 'posix') {
src/history.js:531:const FS_LISTERS = new Set(['ls', 'tree', 'dir', 'gci', 'get-childitem', 'll', 'la', 'find', 'fd', 'fdfind', 'locate', 'mlocate', 'plocate',
src/history.js:533:const FS_SEARCHERS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'select-string', 'sls', 'findstr']);
src/history.js:534:const PROC_LISTERS = new Set(['ps', 'top', 'htop', 'btop', 'atop', 'pgrep', 'pidof', 'pstree', 'get-process', 'gps', 'tasklist']);
src/history.js:536:const GLOBAL_VALUE_OPTS = {
src/history.js:543:function afterGlobals(head, args) {
src/history.js:551:function listedBySegment(w, pipedIn, k) {
src/history.js:575:const LIST_INTENT = { docker_ps: ['container'], docker_ps_all: ['container'], docker_stats: ['container'], list_services: ['service'],
src/history.js:577:const LIST_FAMILY = { ls: ['file', 'dir'], find: ['file', 'dir'], grep: ['file', 'dir'], du: ['file', 'dir'], ps: ['pid', 'proc'], ss: ['port', 'pid', 'proc'] };
src/history.js:582:const FILTER_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag', 'findstr', 'select-string', 'sls', 'where-object', 'where', '?']);
src/history.js:583:const GREP_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag']);
src/history.js:589:function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
src/history.js:731:const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];
src/history.js:747:export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
src/history.js:778:export function cwdFlags(cwd) {
src/history.js:789:export function ctxFeatures(ctx) {
src/history.js:801:const SAME_RES = [
src/history.js:813:const EXPLICIT_SAME = [SAME_RES[0], SAME_RES[3], SAME_RES[4], SAME_RES[6]];
src/history.js:817:const PRONOUN_EN = /\b(it|its|that|this|them|those|these|the same one)\b/;
src/history.js:818:const PRONOUN_WORD = /^(it|its|that|this|them|those|these|one|again|there|here|tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym|to|force|forced|forcibly|sila|sile|silowo|recursive\w*|rekurencyjn\w*|please|prosze|too|also|tez|rowniez)$/;
src/history.js:820:const PLURAL = /(?:^|[^a-z])(them|those|these|je|te|tamte|ich|nimi)(?=$|[^a-z])/;
src/history.js:821:const PRONOUN_PL = /(?:^|\s)(tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym)(?=\s|$|[?!.,])|(?:^|\s)to(?=\s*[?!.]*$|\s+(?:co|ktor\w*|tam))/;
src/history.js:825:const LOCATIVE = new RegExp([
src/history.js:836:export const hasLocative = (q) => LOCATIVE.test(fold(q));
src/history.js:839:const CONTENTS = new RegExp([
src/history.js:848:const NOUN_TYPE = [
src/history.js:862:const FORCE = /\b(force\w*|forcibly|-9|sigkill|na sile|sila|silowo|brutaln\w*)\b/;
src/history.js:863:const VERBS = [
src/history.js:885:const SLOT_FROM_ENT = {
src/history.js:891:const NOT_REF = /\b(?:that|which|this)\s+(?:are|is|was|were|have|has|had|(?:contain|match|end|start|begin|use|take|listen|run|belong|need)(?:s|es|ed|d|ing)?|running|using|taking|ran|took|do|does|did|can|could|will|would|should|i|you|we|they)\b|\b(?:this|that|last|next)\s+(?:week|month|year|day|morning|evening|afternoon|night|time|hour|minute)s?\b/g;
src/history.js:893:export const hasPronoun = (q) => PRONOUN_EN.test(refText(q)) || PRONOUN_PL.test(refText(q));
src/history.js:896:export function sameFor(q) {
src/history.js:906:function retarget(intent, arg) {
src/history.js:930:export function resolveReference(query, ctx) {
src/history.js:1020:function locativeRef(fq, ctx) {
src/history.js:1040:export function changeGuard(type, value, fq, ctx) {
src/history.js:1064:const HINTED_NOUN = /\b(?:that|this|those|these|the|ten|ta|te|tamten|tamta|tamte)\s+([a-z0-9][\w.-]*)\s+(?:folders?|director(?:y|ies)|dirs?|files?|branch(?:es)?|containers?|services?|process(?:es)?|katalog\w*|folder\w*|plik\w*|kontener\w*|uslug\w*|galaz\w*|galez\w*)\b/g;
src/history.js:1066:const NOT_HINT = /^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back|list\w*|wylistuj\w*|check|sprawdz\w*|wipe|nuke|purge|destroy|clear|clean\w*|wyczysc\w*|drop|what|which|where|about|with|from|into|then|also|again|teraz|jeszcze|whatever|everything|anything|something|thing|stuff|still|there|here|tutaj|tamto|wszystko|cokolwiek|whole|entire|completely|cale|calym|listening|running|working|executable|wykonywaln\w*|contents?|zawartosc\w*|entries|inside|wewnatrz|siedzi|srodku|please|prosze|again|ponownie|znowu|forcefully|recursively|rekurencyjnie|permanently|trwale|names?|nazw\w*|only|tylko|same|samo|thing|merged|zmergowan\w*|scalon\w*|current|biezac\w*|aktualn\w*|obecn\w*|previous|poprzedni\w*|ostatni\w*|last|other|inn\w*|empty|pust\w*|temporary|tymczasow\w*|local|lokaln\w*|remote|zdaln\w*|stopped|zatrzyman\w*|created|utworzon\w*|newly|nowo|nowy|nowa|nowe|nowym|whole|cal\w*|samym|given|mentioned|wspomnian\w*|above|powyzsz\w*|broken|zepsut\w*|failed|failing|nieudan\w*|old\w*|star\w*)$/;
src/history.js:1071:export function entityForSlot(slot, ctx) {
src/history.js:1083:const SAME_BUT = [/^\s*(?:and\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?,?\s+but\s+(.+)$/, /^\s*(?:a\s+|i\s+)?(?:to\s+)?samo,?\s+ale\s+(.+)$/,
src/history.js:1086:export function sameBut(query, ctx) {
src/history.js:1096:function intentUses(intent, ent) {
src/history.js:1100:function pickEnt(intent, ent, ctx) {
History references now use only the previous command, and every open finding in `review/r6-claude.md` and `review/r6-codex.md` is fixed. Everything is committed as `142fa6f` on `master`. All 295 tests pass, eval and bench were re-run, and nothing was pushed or published.

**One line of history**
- `buildContext` (`src/history.js`) reads only the most recent command. It first drops the current `tellsh` call, which zsh, fish and PowerShell write to the history file before it runs. The CLI now reads 2 lines instead of 10.
- All the logic that compared or combined older lines is gone. Rules within one compound line (`cat a.txt; ls`, `cd X && make`) still work.
- If the previous command has nothing of the needed type ("delete it" after `ls`), or can't be read, the reference is refused: you get a placeholder and a note, never an older value. "same for X" or "same but …" after a command that can't be repeated is refused the same way.
- Destructive requests still need confirmation. "delete that branch" is refused when the previous command checked that branch out. "delete that backups folder" is refused when the previous command named a different folder.

**Review findings fixed**
- **Blocker, both reviews:** a quoted path with a space is no longer cut. `tellsh delete folder "/tmp/a b"` gives `rm -r '/tmp/a b'`, both from the command line and from an earlier `tellsh` line in history. A request passed as one quoted argument is used as is.
- **Blocker, codex:** a history value that fails validation (e.g. a 265-character path) becomes a placeholder, never `find .`.
- **Major:** "delete all log files in this folder" with a refused reference now gives `find <PATH> … -delete`, never `rm -r .`.
- **Major:** "in the previous folder", "in the last directory", "the directory I listed" and "w poprzednim katalogu" are now treated like "there". A file named next to "there" ("delete notes.txt there") becomes a placeholder, with or without history.
- **Major, codex:** `git -C /tmp status` and `docker --context prod ps` count as listings again.
- **Minor:**
  - "its contents", "what is in it" and "usuń jego zawartość" no longer target the directory itself.
  - "move it there" is refused.
  - A request naming more paths than the command takes, or a path inside `` `…` `` or `$(…)`, gets a placeholder and a warning.
  - The danger checker now catches here-strings and heredocs, `sh -c 'rm -rf "$1"' _ /`, and truncating or overwriting system files (now critical).
  - A NUL byte in the request no longer crashes `suggest()`.

**Data, eval and docs**
- I changed 3 gold rows where the expected answer referenced an older line:
  - dev: "start it again" → `sudo systemctl start <SERVICE>`
  - blind: "push it" → `git push`
  - blind: "delete that branch" → `git branch -d <BRANCH>`
- I added 5 dev rows checking that an older line is never used. Their queries were already in the held-out set, so training data is unaffected.

| History eval | Before | After |
|---|---|---|
| Dev set | 91.7% (48 rows) | **92.5%** (53 rows) |
| Blind set | 79.7% | **82.3%** |

Both rows gained on the blind set come from rule changes, not the gold edits. All other eval numbers are unchanged. In the bench, the history case went from 1.6 to 0.74 ms. EVAL.md, the README history section, the CLI help and `review/fix7-log.md` are updated.

Things to check:
- **Blind set edits:** I edited 2 gold rows in a set described as "never used for tuning". EVAL.md lists each change, but you may prefer to keep those rows untouched.
- **"push it" after `git commit`:** it gives `git push`, which pushes the current branch, rather than a `<BRANCH>` placeholder. I judged that the right answer; say if you'd rather have the placeholder.
- **Training data vs `build/`:** regenerating the training data gives 43,564 classifier rows against 43,574 in the shipped model. HEAD without my changes gives the same 43,564, so this predates the round. It is probably the private real-usage data differing on this machine. I restored `build/` and did not retrain.
- **Commit identity:** git had no identity configured, so I committed as `lksrz <lukasz@wearfits.com>`, matching earlier commits, without changing git config.
- **Uncommitted files:** `review/STATUS` and `review/.hdone` look like review-tool markers, so I left them out.
edates this round, `build/` was restored, the model was not retrained.
- Bench re-run (EVAL.md): cold p50 177 ms, warm 0.40 ms, history case 0.74 ms (was 1.6 ms).

 exited 1 in 5073ms:
TAP version 13
# Subtest: /workspace/tellsh/test/cli.test.js
not ok 1 - /workspace/tellsh/test/cli.test.js
  ---
  duration_ms: 2593.229623
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
  duration_ms: 538.962065
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 3 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 212.333311
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 4 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 287.797323
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 5 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 306.341311
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 6 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 253.352019
  ...
# Subtest: /workspace/tellsh/test/pipeline.test.js
not ok 7 - /workspace/tellsh/test/pipeline.test.js
  ---
  duration_ms: 397.568439
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
  duration_ms: 1104.389225
  location: '/workspace/tellsh/test/regressions.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions2.test.js
not ok 9 - /workspace/tellsh/test/regressions2.test.js
  ---
  duration_ms: 811.946872
  location: '/workspace/tellsh/test/regressions2.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 10 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 340.455832
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 11 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 348.175425
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 12 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 397.042877
  ...
# Subtest: /workspace/tellsh/test/regressions4.test.js
not ok 13 - /workspace/tellsh/test/regressions4.test.js
  ---
  duration_ms: 1264.596478
  location: '/workspace/tellsh/test/regressions4.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions5.test.js
ok 14 - /workspace/tellsh/test/regressions5.test.js
  ---
  duration_ms: 808.635065
  ...
# Subtest: /workspace/tellsh/test/regressions6.test.js
ok 15 - /workspace/tellsh/test/regressions6.test.js
  ---
  duration_ms: 855.892389
  ...
# Subtest: /workspace/tellsh/test/regressions7.test.js
ok 16 - /workspace/tellsh/test/regressions7.test.js
  ---
  duration_ms: 565.653911
  ...
# Subtest: /workspace/tellsh/test/regressions8.test.js
not ok 17 - /workspace/tellsh/test/regressions8.test.js
  ---
  duration_ms: 718.513625
  location: '/workspace/tellsh/test/regressions8.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 18 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 3710.210302
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/slot-cases.js
ok 19 - /workspace/tellsh/test/slot-cases.js
  ---
  duration_ms: 105.933214
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 20 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 220.581913
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 21 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 292.475695
  location: '/workspace/tellsh/test/templates.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..21
# tests 21
# suites 0
# pass 13
# fail 8
# cancelled 0
# skipped 0
# todo 0
# duration_ms 5043.833081

codex
I’m tracing history resolution, slot validation, and the composer fallback to check whether they preserve withheld targets. The test suite is running; I’m also inspecting the training split and model export scripts.
exec
/bin/bash -lc "nl -ba src/history.js | sed -n '360,535p'; nl -ba src/history.js | sed -n '589,780p'" in /workspace/tellsh
 succeeded in 0ms:
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
   374	  const t = String(line).trim();
   375	  const tm = t.match(TELLSH_LINE);
   376	  if (!tm) return null;
   377	  const w = wordsOf(tm[1] || '', lineKind(t, kind), { literalTilde: false });
   378	  if (!w) return tm[1] ? false : '';
   379	  const words = [];
   380	  for (let i = 0; i < w.length; i++) {
   381	    if (TELLSH_VALUE_OPTS.has(w[i])) { i++; continue; }
   382	    if (!/^-/.test(w[i])) words.push(rawOf(w[i]));
   383	  }
   384	  const q = joinWords(words);
   385	  return q == null ? false : q;
   386	}
   387	
   388	/**
   389	 * Analyse one history line. `classify(query)` handles previous `tellsh <query>` lines.
   390	 * kind: 'posix' | 'pwsh' (PowerShell history; Verb-Noun lines are always read as PowerShell).
   391	 * Segments of a compound line (`a; b`, `a && b`, `a | b`) are read in order and later ones win: the
   392	 * entities of `cat old.txt; cat new.txt` are those of `cat new.txt`. Redirection targets (`> out.txt`)
   393	 * are files the line wrote. A `cd` makes every earlier working-directory-relative path ambiguous.
   394	 * `at` gives each entity type the index of the segment it came from (later segment = newer), and
   395	 * `searchDir` marks a `dir` entity that is only the root of a search (`find /var/log -name '*.gz'`,
   396	 * `grep -rl TODO src`): the results live inside it, so it must never be a destructive target.
   397	 * -> { line, intent, slots, ents, at, searchDir?, ambiguous, cd?, fromTellsh?, opaque? }
   398	 */
   399	export function analyzeCommand(line, classify, kind = 'posix') {
   400	  let ents = {};
   401	  let intent = null;
   402	  let slots = {};
   403	  let ambiguous = false;
   404	  const t = line.trim();
   405	  const k = lineKind(t, kind);
   406	  if (TELLSH_LINE.test(t)) {
   407	    const q = tellshQuery(t, k);
   408	    // a request that cannot be read back: it may have named any file or directory
   409	    if (q === false) return { line: t, intent, slots, ents: { file: AMB + t, dir: AMB + t }, at: {}, listed: { file: 0, dir: 0 }, opaque: true, fromTellsh: true, ambiguous: true };
   410	    const r = q && classify ? classify(q) : null;
   411	    if (r?.intent) { intent = r.intent; slots = { ...(r.slots || {}) }; entsFromSlots(intent, slots, ents); }
   412	    // `tellsh list directory /tmp/build`: like `ls /tmp/build`, the user saw the entries of the directory
   413	    const sr = isSearchRoot(intent, slots, ents);
   414	    const ld = !sr && ents.dir != null && (FAMILY_OF[intent] === 'ls' || intent === 'largest_dirs');
   415	    const listed = Object.fromEntries(listedByIntent(intent).map((x) => [x, 0]));
   416	    return { line: t, intent, slots, ents, at: {}, listed, ...(sr ? { searchDir: true } : {}), ...(ld ? { listDir: true } : {}), fromTellsh: true, ambiguous };
   417	  }
   418	  const split = splitCommand(t, k, { keepRedirects: true });
   419	  if (!split.ok) {
   420	    // cannot interpret the line (unterminated quote, heredoc, ...): it may name any file or directory,
   421	    // so older file/dir values must not be picked up by "it"
   422	    ents.file = AMB + t;
   423	    ents.dir = AMB + t;
   424	    return { line: t, intent, slots, ents, at: {}, listed: { file: 0, dir: 0 }, opaque: true, ambiguous: true };
   425	  }
   426	  const inv = invert(t, k);
   427	  let segIntent = null;
   428	  let segSlots = {};
   429	  let segIntentAt = -1;
   430	  let intentStale = false;
   431	  let cdAt = -1;
   432	  let searchDir = false;
   433	  let listDir = false;
   434	  const at = {};
   435	  const listed = {}; // entity type -> index of the newest segment that listed values of that type
   436	  // segments from..to-1 are connected by pipes only
   437	  const samePipe = (from, to) => from >= 0 && split.segments.slice(from, to).every((s) => s.sep === '|');
   438	  const firstWord = (s) => unwrap(s.words.filter((x) => !REDIR_TARGET_OP.test(x) && !REDIR_DUP_OP.test(x)))[0];
   439	  split.segments.forEach(({ words }, segIdx) => {
   440	    const e = {};
   441	    const setIntent = (id, s) => { segIntent = id; segSlots = s; segIntentAt = segIdx; };
   442	    // redirections: the target is a file the command wrote (or read); it is not an argument
   443	    let w = [];
   444	    let redirTarget = null;
   445	    for (let i = 0; i < words.length; i++) {
   446	      const x = words[i];
   447	      if (REDIR_DUP_OP.test(x)) continue;
   448	      if (REDIR_TARGET_OP.test(x)) {
   449	        const target = words[i + 1];
   450	        i++;
   451	        if (target != null && !/^\/dev\/(?:null|stdout|stderr|tty)$|^(?:\$null|NUL)$/i.test(rawOf(target))) redirTarget = target;
   452	        continue;
   453	      }
   454	      w.push(x);
   455	    }
   456	    // wrappers (`sudo -u root ls`, `env ls`, `command ls`, `nice -n 5 ls`, `timeout 5 ps aux`): the command they run
   457	    const raw = w;
   458	    w = unwrap(w);
   459	    // a wrapper whose options could not be read: what ran is unknown, so it may have printed or named anything
   460	    if (!w.length || (w !== raw && /^-/.test(w[0]))) {
   461	      e.file = AMB + raw.join(' '); e.dir = AMB + raw.join(' ');
   462	      for (const x of ENT_TYPES) listed[x] = segIdx;
   463	      w = [];
   464	    }
   465	    if (w.length) segmentEnts(w, e, setIntent, split, k, segIdx, firstWord);
   466	    if (redirTarget != null) e.file = redirTarget;
   467	    const pipedIn = segIdx > 0 && split.segments[segIdx - 1].sep === '|';
   468	    if (w.length && !isAmbiguous(w[0])) for (const x of listedBySegment(w, pipedIn, k)) listed[x] = segIdx;
   469	    // every command the wrapper chain may run (also when its options are misread): a listing anywhere in it counts
   470	    if (w !== raw) for (const c of commandChains(raw, [], {})) if (c.length && !isAmbiguous(c[0])) for (const x of listedBySegment(c, pipedIn, k)) listed[x] = segIdx;
   471	    // a listing piped into anything (`ls DIR | sort | grep pdf`, `ls -S DIR | head -1`, `gci DIR | Select-Object
   472	    // -First 1`): what the user saw is a selection of the entries inside DIR, never DIR itself
   473	    const piped = split.segments[segIdx].sep.startsWith('|') && !split.segments[segIdx].sep.startsWith('||');
   474	    if (e.listDir && piped) { e.searchDir = true; delete e.listDir; }
   475	    if (e.listCwd) {
   476	      const how = piped ? 'search' : e.listCwd;
   477	      // `cd DIR && ls | grep pdf`: the listing is of DIR
   478	      if (cdAt >= 0 && at.dir === cdAt) { if (how === 'search') { searchDir = true; listDir = false; } else if (!searchDir) listDir = true; }
   479	      delete e.listCwd;
   480	    }
   481	    const head = w.length && !isAmbiguous(w[0]) ? w[0].replace(/^.*[\\/]/, '').toLowerCase() : '';
   482	    if (CD_HEADS.has(head)) {
   483	      // the working directory changes: earlier relative paths (and a relative cd target) are stale
   484	      cdAt = segIdx;
   485	      staleRelative(ents, null);
   486	      const target = w.slice(1).filter((a) => !/^-/.test(a))[0];
   487	      if (target != null && !isAmbiguous(target) && !isRelativePath(target) && target !== '-') e.dir = target;
   488	      else e.dir = AMB + (target ?? '-');
   489	      delete e.file;
   490	    }
   491	    if (e.dir !== undefined) { searchDir = !!e.searchDir; listDir = !!e.listDir; }
   492	    // `ls ~/Downloads | grep pdf`, `gci DIR | Where-Object …`: the listed directory was filtered, so what
   493	    // the user saw are entries inside it
   494	    // (any later stage of the same pipeline, not only the next one)
   495	    else if (segIdx > 0 && at.dir != null && at.dir < segIdx && samePipe(at.dir, segIdx) && FILTER_HEADS.has(head)) searchDir = true;
   496	    delete e.searchDir;
   497	    delete e.listDir;
   498	    for (const key of Object.keys(e)) at[key] = segIdx;
   499	    Object.assign(ents, e); // later segments supersede earlier ones
   500	  });
   501	  if (inv && cdAt < 0) {
   502	    // the whole line is a catalog/variant command: its slots are the most precise reading
   503	    intent = inv.intent; slots = inv.slots; ambiguous = inv.ambiguous;
   504	    const ie = {};
   505	    entsFromSlots(intent, slots, ie);
   506	    for (const key of Object.keys(ie)) at[key] = split.segments.length;
   507	    if (ie.dir !== undefined) {
   508	      // a piped/filtered listing found above stays a search root even when the line is a catalog command
   509	      const piped = searchDir && String(ie.dir) === String(ents.dir);
   510	      searchDir = isSearchRoot(intent, slots, ie) || piped;
   511	      listDir = !searchDir && (['ls', 'find'].includes(FAMILY_OF[intent]) || intent === 'largest_dirs');
   512	    }
   513	    ents = { ...ents, ...ie };
   514	  } else if (segIntent) {
   515	    intent = segIntent; slots = { ...segSlots };
   516	    if (segIntentAt < cdAt) staleRelative({}, slots);
   517	    // `kill 1111; ls newdir`: another command ran after the one tellsh could repeat
   518	    if (split.segments.slice(segIntentAt, -1).some((s) => s.sep !== '|')) intentStale = true;
   519	  }
   520	  if (Object.values(slots).some(isAmbiguous)) ambiguous = true;
   521	  return { line: t, intent, slots, ents, at, ambiguous, ...(searchDir && ents.dir != null ? { searchDir: true } : {}),
   522	    ...(listDir && !searchDir && ents.dir != null ? { listDir: true } : {}), ...(cdAt >= 0 ? { cd: true } : {}),
   523	    ...(intentStale ? { intentStale: true } : {}), listed,
   524	    // the dir is the `cd` target (`cdFollowed`: another segment ran after the cd)
   525	    ...(cdAt >= 0 && at.dir === cdAt ? { cdDir: true, cdFollowed: cdAt < split.segments.length - 1 } : {}) };
   526	}
   527	
   528	// Listings: commands that print many values of an entity type (`ls`, `find`, `ps aux`, `docker ps`, `git branch`).
   529	// After one, "it"/"them" may mean any of the printed values, so an older value of that type is not a safe
   530	// target for a changing command.
   531	const FS_LISTERS = new Set(['ls', 'tree', 'dir', 'gci', 'get-childitem', 'll', 'la', 'find', 'fd', 'fdfind', 'locate', 'mlocate', 'plocate',
   532	  'du', 'ncdu', 'exa', 'eza', 'lsd', 'vdir']);
   533	const FS_SEARCHERS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'select-string', 'sls', 'findstr']);
   534	const PROC_LISTERS = new Set(['ps', 'top', 'htop', 'btop', 'atop', 'pgrep', 'pidof', 'pstree', 'get-process', 'gps', 'tasklist']);
   535	// global options that take a value, before the subcommand (`git -C /tmp status`, `docker --context prod ps`)
   589	function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
   590	  if (isAmbiguous(w[0])) {
   591	    if (w.slice(1).some((a) => PATHLIKE.test(rawOf(a)))) { e.file = AMB + w.join(' '); e.dir = AMB + w.join(' '); }
   592	    return;
   593	  }
   594	  const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '');
   595	  const args = afterGlobals(head, w.slice(1));
   596	  const nonFlags = args.filter((a) => !/^-/.test(a));
   597	  if (CD_HEADS.has(head.toLowerCase())) return; // handled by the caller
   598	  if ((k === 'pwsh' || PS_CMDLET.test(head)) && psNative(head.toLowerCase(), args, e, setIntent)) return;
   599	  if (head === 'docker') {
   600	    const sub = nonFlags[0];
   601	    if (sub === 'run') {
   602	      const i = args.indexOf('--name');
   603	      if (i >= 0 && args[i + 1]) e.container ??= args[i + 1];
   604	      const nm = args.find((a) => a.startsWith('--name='));
   605	      if (nm) e.container ??= nm.slice(7);
   606	    } else if (DOCKER_CT.has(sub)) {
   607	      const rest = args.slice(args.indexOf(sub) + 1);
   608	      for (let i = 0; i < rest.length; i++) {
   609	        if (DOCKER_VAL_FLAGS.has(rest[i])) { i++; continue; }
   610	        if (/^-/.test(rest[i])) continue;
   611	        e.container ??= rest[i];
   612	        break;
   613	      }
   614	      if (DOCKER_INTENT[sub] && e.container != null) setIntent(DOCKER_INTENT[sub], { container: e.container });
   615	    }
   616	  } else if (head === 'systemctl' || head === 'service') {
   617	    const svc = head === 'systemctl' ? nonFlags[1] : nonFlags[0];
   618	    const verb = head === 'systemctl' ? nonFlags[0] : nonFlags[1];
   619	    if (svc) e.service ??= svc.replace(/\.service$/, '');
   620	    if (SYSTEMCTL_INTENT[verb] && svc) setIntent(SYSTEMCTL_INTENT[verb], { service: e.service });
   621	  } else if (head === 'journalctl') {
   622	    const i = args.findIndex((a) => a === '-u' || a === '--unit');
   623	    if (i >= 0 && args[i + 1]) { e.service ??= args[i + 1].replace(/\.service$/, ''); setIntent('journal_service', { service: e.service }); }
   624	  } else if (head === 'kill') {
   625	    const { pos } = parseArgs(args, VALUE_OPTS.kill);
   626	    if (pos.length === 1 && /^\d+$/.test(pos[0])) { e.pid = pos[0]; setIntent('kill_by_pid', { pid: pos[0] }); }
   627	    else if (pos.length) e.pid = AMB + pos.map(rawOf).join(' '); // several PIDs or a job spec: not one process
   628	  } else if (['pkill', 'killall', 'pgrep', 'pidof'].includes(head)) {
   629	    const { pos } = parseArgs(args, VALUE_OPTS[head]);
   630	    if (pos.length === 1) e.proc = pos[0];
   631	    else if (pos.length > 1) e.proc = AMB + pos.map(rawOf).join(' ');
   632	    if (head === 'pgrep' && pos.length === 1) setIntent('find_process', { name: pos[0] });
   633	  } else if ((head === 'ps' || head === 'top' || head === 'htop') && args.some((a) => /^-\w*p$/.test(a))) {
   634	    const i = args.findIndex((a) => /^-\w*p$/.test(a));
   635	    const pid = (args[i + 1] || '').split(',')[0];
   636	    if (/^\d+$/.test(pid)) e.pid = pid;
   637	  } else if ((head === 'grep' || head === 'egrep') && split.segments.some((s, j) => j < segIdx && firstWord(s) === 'ps')) {
   638	    // ps aux | grep -v grep | grep node: the process is the pattern of a non-inverted grep
   639	    const { pos, opts, flags } = parseArgs(args, VALUE_OPTS.grep);
   640	    const inverted = flags.some((f) => /^-[a-zA-Z]*v/.test(f) || f === '--invert-match');
   641	    const pat = opts['-e'] ?? opts['--regexp'] ?? pos[0];
   642	    if (!inverted && pat != null) e.proc = pat;
   643	  } else if (GREP_HEADS.has(head) && nonFlags[0]) {
   644	    const { pos, opts, flags } = parseArgs(args, VALUE_OPTS[head] || VALUE_OPTS.grep);
   645	    const pat = opts['-e'] ?? opts['--regexp'] ?? pos[0];
   646	    const path = opts['-e'] != null || opts['--regexp'] != null ? pos[0] : pos[1];
   647	    if (pat != null) setIntent(flags.some((a) => /^-\w*l/.test(a)) ? 'grep_files_containing' : 'grep_text', { pattern: rawOf(pat), ...(path != null ? { path } : {}) });
   648	    if (path != null) {
   649	      const t = typeByExt(path);
   650	      e[t] = path;
   651	      if (t === 'dir') e.searchDir = true; // searched directory: the matches are inside it
   652	    }
   653	  } else if (head === 'lsof' || head === 'ss' || head === 'netstat' || head === 'fuser') {
   654	    const pm = args.map(rawOf).join(' ').match(/(?::|tcp:|udp:|sport = :)(\d{2,5})\b/);
   655	    if (pm) { e.port = pm[1]; setIntent('process_on_port', { port: pm[1] }); }
   656	  } else if (head === 'git') {
   657	    const sub = nonFlags[0];
   658	    const rest = args.slice(args.indexOf(sub) + 1);
   659	    if (sub === 'grep') {
   660	      // git grep [-l] PATTERN [DIR]: a search, its directory argument is only where it looked
   661	      const { pos, opts } = parseArgs(rest, VALUE_OPTS.grep);
   662	      const path = opts['-e'] != null ? pos[0] : pos[1];
   663	      if (path != null) { const t = typeByExt(path); e[t] = path; if (t === 'dir') e.searchDir = true; }
   664	      return;
   665	    }
   666	    if (sub === 'checkout' || sub === 'switch') {
   667	      const { pos, opts, after } = parseArgs(rest, VALUE_OPTS[sub]);
   668	      const created = opts['-b'] ?? opts['-B'] ?? opts['-c'] ?? opts['-C'] ?? opts['--create'] ?? opts['--force-create'] ?? opts['--orphan'];
   669	      if (after) {
   670	        // git checkout [<tree-ish>] -- <file>...: restores files, it does not switch branches
   671	        if (after.length) e.file = after.length === 1 ? after[0] : AMB + after.map(rawOf).join(' ');
   672	        return;
   673	      }
   674	      const b = created ?? pos[0];
   675	      if (b != null && b !== '.' && b !== '-' && !isAmbiguous(b) && !String(b).startsWith('-')) {
   676	        e.branch = b;
   677	        e.current = b;
   678	        if (created != null) e.created = b;
   679	      }
   680	    } else if (['merge', 'rebase'].includes(sub) || (sub === 'branch' && nonFlags[1])) {
   681	      const b = nonFlags[nonFlags.length - 1];
   682	      if (b && b !== sub && b !== '.' && !isGlob(b) && !b.startsWith('-')) e.branch = b;
   683	    } else if (sub === 'push' && nonFlags.length >= 2) e.branch = nonFlags[nonFlags.length - 1];
   684	    else if (sub === 'clone' && nonFlags[1]) e.url = nonFlags[1];
   685	    else if (['add', 'diff', 'blame', 'restore', 'rm', 'log'].includes(sub) && nonFlags[1] && nonFlags[1] !== '.') e.file = nonFlags[nonFlags.length - 1];
   686	  } else if (['ssh', 'ping', 'dig', 'nslookup', 'traceroute', 'mtr', 'host', 'telnet', 'nc'].includes(head)) {
   687	    const h = nonFlags.find((a) => /[\w-]+\.[\w.-]+|^[\w-]+@/.test(a)) || nonFlags[0];
   688	    if (h) e.host = h;
   689	  } else if (['curl', 'wget', 'http'].includes(head)) {
   690	    const u = args.find((a) => /^https?:\/\//.test(a));
   691	    if (u) {
   692	      e.url = u;
   693	      const base = u.replace(/[?#].*$/, '').split('/').pop();
   694	      const saves = head === 'wget' || args.some((a) => /^-\w*O/.test(a));
   695	      if (saves && /\.\w{1,5}$/.test(base)) e.file = base;
   696	    }
   697	  } else if (head === 'rm' || head === 'trash' || head === 'rmdir') {
   698	    const p = nonFlags[nonFlags.length - 1];
   699	    if (p) e[args.some((a) => /^-\w*r/i.test(a)) || head === 'rmdir' ? 'dir' : 'file'] = p;
   700	  } else if (head === 'cp' || head === 'mv' || head === 'ln') {
   701	    const { pos, opts } = parseArgs(args, VALUE_OPTS[head]);
   702	    const tdir = opts['-t'] ?? opts['--target-directory'];
   703	    if (tdir != null) destEnts(pos.length === 1 ? pos : [...pos, ''], String(tdir) + '/', e);
   704	    else if (pos.length >= 2) destEnts(pos.slice(0, -1), pos[pos.length - 1], e);
   705	  } else if (head === 'tar' || head === 'zip') {
   706	    const a = nonFlags.find((x) => /\.(tar(\.\w+)?|tgz|zip)$/.test(x));
   707	    if (a) e.file = a;
   708	  } else if (FILE_HEADS.has(head)) {
   709	    const p = nonFlags.filter((a) => !/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(a)).pop();
   710	    if (p) e[/\/$/.test(p) ? 'dir' : 'file'] = p;
   711	  } else if (DIR_HEADS.has(head)) {
   712	    // find ROOT -name ...: the search root; other heads: the last directory argument (`ls /a /b` -> /b)
   713	    // (find's root is the operands before its first expression word: `find -name "*.o"` has none)
   714	    const p = head === 'find' ? args.slice(0, (args.findIndex((a) => /^[-(!]/.test(a)) + 1 || args.length + 1) - 1)[0] : nonFlags.filter((a) => !isGlob(a)).pop();
   715	    if (p) {
   716	      e.dir = p;
   717	      if (head === 'find') e.searchDir = true;
   718	      // `du DIR` / `du -d 1 DIR | sort -rh` lists the entries of DIR (`du -sh DIR` is DIR itself)
   719	      else if (['ls', 'tree', 'ncdu'].includes(head) || (head === 'du' && !args.some((a) => /^-[a-zA-Z]*s|^--summarize$/.test(a)))) e.listDir = true;
   720	    }
   721	    // `ls`, `ls *.pdf`: the working directory (a glob selects some of its entries)
   722	    else if (['ls', 'tree'].includes(head)) e.listCwd = nonFlags.some(isGlob) ? 'search' : 'list';
   723	  } else if (!INERT_HEADS.has(head.toLowerCase())) {
   724	    // unknown command (or unknown cmdlet) naming a path: we cannot tell what it did with it, so an
   725	    // older file/dir must not be picked up by "it"
   726	    const p = nonFlags.find((a) => PATHLIKE.test(rawOf(a)) && !/^\w+:\/\//.test(rawOf(a)));
   727	    if (p) e[typeByExt(p)] = AMB + rawOf(p);
   728	  }
   729	}
   730	
   731	const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];
   732	
   733	/**
   734	 * Build the context object from history commands (oldest first). Only the single most recent command is a
   735	 * reference target ("delete it", "same for /var", "there" always mean the previous command, never an older one);
   736	 * the running `tellsh <query>` line itself, which some shells write before it runs, is dropped first.
   737	 * kind: 'posix' | 'pwsh' (default: `cmds.kind` as set by loadHistory, else posix)
   738	 * -> { n, line, ents: {type: value}, entOrder, refOrder, searchRoots, listedDirs, last: {intent, slots, ambiguous, skipped},
   739	 *      pos, listing, cdDir, features }
   740	 *    values that could not be read unambiguously are kept as AMB-prefixed strings (see isAmbiguous).
   741	 *    Within the line (`cat old.txt; ls newdir`) later segments win: pos gives the segment of each value, and refOrder
   742	 *    ranks types by it (entOrder, which feeds the classifiers' ctx_ features, ranks by type only). searchRoots: the dir
   743	 *    is a find/grep root or a filtered/piped listing; listedDirs: a plain listing. last.skipped: a later segment of the
   744	 *    line ran after the repeatable command. listing: the segment of the newest listing of each entity type ({ seg });
   745	 *    cdDir: the dir is a `cd` target ({ value, followed }). changeGuard() uses these.
   746	 */
   747	export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
   748	  const k = kind || cmds.kind || 'posix';
   749	  const list = [...cmds];
   750	  // zsh (share_history / inc_append_history), fish and PSReadLine write the running line to the
   751	  // history file before it executes: the current `tellsh <query>` call is not the previous command
   752	  if (query != null && list.length) {
   753	    const norm = (x) => String(x).trim().replace(/\s+/g, ' ');
   754	    const q = tellshQuery(list[list.length - 1], k);
   755	    if (q != null && (norm(q) === norm(query) || norm(list[list.length - 1]).includes(norm(query)))) list.pop();
   756	  }
   757	  const line = list.length ? list[list.length - 1] : null;
   758	  const a = line != null ? analyzeCommand(line, classify, k) : { ents: {}, at: {}, listed: {}, slots: {} };
   759	  const ents = {};
   760	  for (const t of ENT_TYPES) if (a.ents[t] != null) ents[t] = a.ents[t];
   761	  const pos = Object.fromEntries(Object.keys(ents).map((t) => [t, a.at?.[t] ?? 0]));
   762	  const dir = ents.dir != null ? String(ents.dir) : null;
   763	  const searchRoots = new Set(dir != null && a.searchDir ? [dir] : []);
   764	  const listedDirs = new Set(dir != null && a.listDir ? [dir] : []);
   765	  const listing = Object.fromEntries(Object.entries(a.listed || {}).map(([t, seg]) => [t, { seg }]));
   766	  const last = a.intent ? { intent: a.intent, slots: a.slots, ambiguous: !!a.ambiguous, skipped: !!a.intentStale } : null;
   767	  const current = a.ents.current && !isAmbiguous(a.ents.current) ? a.ents.current : null;
   768	  const cdDir = a.cdDir && dir != null ? { value: dir, followed: !!a.cdFollowed } : null;
   769	  const byType = (x, y) => ENT_TYPES.indexOf(x) - ENT_TYPES.indexOf(y);
   770	  const entOrder = Object.keys(ents).sort(byType);
   771	  const refOrder = Object.keys(ents).sort((x, y) => pos[y] - pos[x] || byType(x, y));
   772	  const ctx = { n: line != null ? 1 : 0, line, ents, currentBranch: current, entOrder, refOrder, searchRoots, listedDirs, last,
   773	    cwdFlags: cwdFlags(cwd), pos, listing, cdDir };
   774	  ctx.features = ctxFeatures(ctx);
   775	  return ctx;
   776	}
   777	
   778	export function cwdFlags(cwd) {
   779	  if (!cwd) return [];
   780	  const f = [];

exec
/bin/bash -lc 'git diff 0d87457..HEAD -- src/fill.js src/render.js src/shellwords.js src/catalog.js src/variants.js' in /workspace/tellsh
 succeeded in 0ms:
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
diff --git a/src/fill.js b/src/fill.js
index f9849d0..5eff4bb 100644
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
@@ -209,7 +241,7 @@ export const envFromPlatform = (platform = process.platform) => ({
  *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
  * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}
  */
-export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given } = {}) {
+export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [] } = {}) {
   const intent = BY_ID[intentId];
   if (!intent) throw new Error(`unknown intent ${intentId}`);
   const e = env || envFromPlatform(platform);
@@ -218,8 +250,14 @@ export function buildCommand(intentId, text, { platform = process.platform, env,
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
@@ -229,15 +267,33 @@ export function buildCommand(intentId, text, { platform = process.platform, env,
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
index b20a84a..ca70eab 100644
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
@@ -30,14 +44,18 @@ export function splitCommand(line, kind = 'posix', { keepRedirects = false } = {
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
   const flushSeg = (sep = '') => { flushWord(); if (words.length) segments.push({ words, raw: raws, sep }); else if (sep && segments.length) segments[segments.length - 1].sep += sep; words = []; raws = []; };
   const fail = () => ({ ok: false, segments: [] });
@@ -45,6 +63,7 @@ export function splitCommand(line, kind = 'posix', { keepRedirects = false } = {
   for (let i = 0; i < s.length; i++) {
     const c = s[i];
     const start = i;
+    if (w == null && (ps ? PS_SQ.test(c) || PS_DQ.test(c) : c === "'" || c === '"' || c === '\\')) quoted0 = true;
     if (ps ? PS_SQ.test(c) : c === "'") {
       // single-quoted literal; PowerShell doubles any single-quote character to escape it
       let v = '';
@@ -82,11 +101,21 @@ export function splitCommand(line, kind = 'posix', { keepRedirects = false } = {
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
@@ -126,6 +155,8 @@ export function splitCommand(line, kind = 'posix', { keepRedirects = false } = {
         amb = true;
       }
       if (!ps && c === '`') amb = true;
+      // ~user, ~+, ~-: expanded by the shell to a directory we cannot know
+      if (!ps && c === '~' && w == null && i + 1 < s.length && !/[\/\s;|&)]/.test(s[i + 1])) amb = true;
       if (/[*?[]/.test(c)) glob = true;
       if (!ps && c === '{' && /^\{[^}\s]*,[^}\s]*\}/.test(s.slice(i))) amb = true; // brace expansion
       w = (w ?? '') + c;
@@ -138,8 +169,8 @@ export function splitCommand(line, kind = 'posix', { keepRedirects = false } = {
 }
 
 /** All words of a single simple command (no separators), or null if the text is not exactly one word list. */
-export function wordsOf(line, kind = 'posix') {
-  const r = splitCommand(line, kind);
+export function wordsOf(line, kind = 'posix', opts = {}) {
+  const r = splitCommand(line, kind, opts);
   if (!r.ok || r.segments.length !== 1) return null;
   return r.segments[0].words;
 }
@@ -149,3 +180,23 @@ export function decodeWord(text, kind = 'posix') {
   const w = wordsOf(text, kind);
   return w && w.length === 1 ? w[0] : null;
 }
+
+/**
+ * Join already-split words (argv, or the words of a `tellsh …` history line) back into request text without
+ * losing their boundaries: among several words, one with whitespace is a quoted value and is quoted again
+ * (`delete folder "/tmp/a b"`), so the slot extractor reads it as one value, never `/tmp/a`. A single word is the
+ * whole request (`tellsh "delete folder /tmp/x"`) and is used as it is. null when a word with whitespace contains
+ * both quote characters (cannot be re-quoted for the extractor).
+ */
+export function joinWords(words) {
+  if (words.length === 1) return String(words[0]);
+  const out = [];
+  for (const w of words) {
+    const s = String(w);
+    if (!/\s/.test(s)) { out.push(s); continue; }
+    if (!s.includes('"')) out.push(`"${s}"`);
+    else if (!s.includes("'")) out.push(`'${s}'`);
+    else return null;
+  }
+  return out.join(' ');
+}
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
/bin/bash -lc 'node test/regressions8.test.js' in /workspace/tellsh
 exited 1 in 648ms:
TAP version 13
# Subtest: only the most recent history line is a reference target
ok 1 - only the most recent history line is a reference target
  ---
  duration_ms: 98.940048
  ...
# Subtest: the running tellsh call is dropped once, then the previous command is the target
not ok 2 - the running tellsh call is dropped once, then the previous command is the target
  ---
  duration_ms: 4.315606
  location: '/workspace/tellsh/test/regressions8.test.js:59:1'
  failureType: 'testCodeFailure'
  error: "EROFS: read-only file system, mkdtemp '/tmp/tellsh-r7-XXXXXX'"
  code: 'EROFS'
  stack: |-
    mkdtempSync (node:fs:3005:18)
    TestContext.<anonymous> (file:///workspace/tellsh/test/regressions8.test.js:65:15)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: blocker: a quoted path with a space keeps its boundaries (CLI argv and earlier tellsh lines)
not ok 3 - blocker: a quoted path with a space keeps its boundaries (CLI argv and earlier tellsh lines)
  ---
  duration_ms: 238.367618
  location: '/workspace/tellsh/test/regressions8.test.js:75:1'
  failureType: 'testCodeFailure'
  error: 'Unexpected end of JSON input'
  code: 'ERR_TEST_FAILURE'
  name: 'SyntaxError'
  stack: |-
    JSON.parse (<anonymous>)
    TestContext.<anonymous> (file:///workspace/tellsh/test/regressions8.test.js:80:21)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: blocker: an invalid history value is a placeholder, never the default `.`
ok 4 - blocker: an invalid history value is a placeholder, never the default `.`
  ---
  duration_ms: 10.478557
  ...
# Subtest: major: a refused reference never leaves `rm -r .`; a request about entries keeps its intent
ok 5 - major: a refused reference never leaves `rm -r .`; a request about entries keeps its intent
  ---
  duration_ms: 24.208813
  ...
# Subtest: major: other wordings of the previous directory are place references
ok 6 - major: other wordings of the previous directory are place references
  ---
  duration_ms: 64.737891
  ...
# Subtest: major: global options of git/docker do not hide a listing in the line
ok 7 - major: global options of git/docker do not hide a listing in the line
  ---
  duration_ms: 4.382992
  ...
# Subtest: minor: "its contents", "what is in it", "usuń jego zawartość" are not the directory
ok 8 - minor: "its contents", "what is in it", "usuń jego zawartość" are not the directory
  ---
  duration_ms: 5.562293
  ...
# Subtest: minor: "move it there" names both ends by reference and is refused
ok 9 - minor: "move it there" names both ends by reference and is refused
  ---
  duration_ms: 6.354942
  ...
# Subtest: minor: several paths for one slot and command substitution are placeholders
ok 10 - minor: several paths for one slot and command substitution are placeholders
  ---
  duration_ms: 50.658269
  ...
# Subtest: minor: danger checker: here-strings, sh -c with positional arguments, truncating system files
ok 11 - minor: danger checker: here-strings, sh -c with positional arguments, truncating system files
  ---
  duration_ms: 2.809935
  ...
# Subtest: minor: a NUL byte never reaches spawnSync
ok 12 - minor: a NUL byte never reaches spawnSync
  ---
  duration_ms: 0.373
  ...
1..12
# tests 12
# suites 0
# pass 10
# fail 2
# cancelled 0
# skipped 0
# todo 0
# duration_ms 562.675701

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const q of ['change permissions recursively to 777 on /tmp/x and /tmp/y','delete all log files in /tmp/x and /tmp/y recursively','delete all log files in "'`pwd` recursively'"','change permissions recursively to 777 on "'`pwd`'"','change permissions recursively to 777 in the previous folder','delete all log files in /tmp/x and /tmp/y','delete all log files in "'$(pwd)'"']){const r=suggest(q,{env});console.log(JSON.stringify({q,method:r.method,intent:r.intent,command:r.command,missing:r.missing,risk:r.risk,warnings:r.warnings}));}
JS" in /workspace/tellsh
 succeeded in 142ms:
{"q":"change permissions recursively to 777 on /tmp/x and /tmp/y","method":"composed","intent":"chmod","command":"chmod -R 777 -- /tmp/x /tmp/y","missing":[],"risk":"medium","warnings":["chmod 777 makes files world-writable"]}
{"q":"delete all log files in /tmp/x and /tmp/y recursively","method":"catalog","intent":"delete_by_ext","command":"find <PATH> -type f -iname '*.log' -delete","missing":["path"],"risk":"high","warnings":["bulk deletion via find/xargs","redirect writes to a file","path left as a placeholder: the request names more paths than delete_by_ext takes (/tmp/x, /tmp/y); run it once per path"]}
{"q":"delete all log files in `pwd` recursively","method":"catalog","intent":"delete_by_ext","command":"find <PATH> -type f -iname '*.log' -delete","missing":["path"],"risk":"high","warnings":["bulk deletion via find/xargs","redirect writes to a file","path left as a placeholder: it is the output of a command substitution (path=pwd)"]}
{"q":"change permissions recursively to 777 on `pwd`","method":"composed","intent":"chmod","command":"chmod -R 777 -- pwd","missing":[],"risk":"medium","warnings":["chmod 777 makes files world-writable"]}
{"q":"change permissions recursively to 777 in the previous folder","method":"catalog","intent":"chmod","command":"chmod 777 <FILE>","missing":["file"],"risk":"medium","warnings":["chmod 777 makes files world-writable"]}
{"q":"delete all log files in /tmp/x and /tmp/y","method":"catalog","intent":"delete_by_ext","command":"find <PATH> -type f -iname '*.log' -delete","missing":["path"],"risk":"high","warnings":["bulk deletion via find/xargs","redirect writes to a file","path left as a placeholder: the request names more paths than delete_by_ext takes (/tmp/x, /tmp/y); run it once per path"]}
{"q":"delete all log files in $(pwd)","method":"catalog","intent":"delete_by_ext","command":"find <PATH> -type f -iname '*.log' -delete","missing":["path"],"risk":"high","warnings":["bulk deletion via find/xargs","redirect writes to a file","path left as a placeholder: it is the output of a command substitution (path=?)"]}

exec
/bin/bash -lc 'cat scripts/hybrid/export_data.js scripts/hybrid/train_encoder.py scripts/hybrid/train_a_dev.sh' in /workspace/tellsh
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
import { fileURLToPath } from 'node:url';
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
  const rows = [];
  let gid = 0;
  const push = (o) => rows.push(o);
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
  console.log(`export_data: ${base.length} base (${base.filter((r) => r.src === 'real').length} real), ${rows.length} rows (train ${c((r) => r.split === 'train')}, dev ${c((r) => r.split === 'dev')}), tldr ${c((r) => r.src === 'tldr')}, ood ${c((r) => r.src === 'ood')}`);
}
main();
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

exec
/bin/bash -lc "nl -ba scripts/gen_data.js | sed -n '1,290p'; nl -ba src/history.js | sed -n '731,778p'; nl -ba src/history.js | sed -n '930,1064p'" in /workspace/tellsh
 succeeded in 0ms:
     1	#!/usr/bin/env node
     2	// Build featurised training data for scripts/train.py (all features computed by src/features.js, so
     3	// training and runtime share one implementation). Writes build/cls.jsonl, build/tag.jsonl, build/meta.json.
     4	//
     5	//   classifier rows: {y: family, i: intent|"", f: [[idx, val], ...], w, g: source, lang, gid}
     6	//   tagger rows:     {tool, f: [[idx, ...] per token], y: [BIO label per token], gid}
     7	import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, createWriteStream } from 'node:fs';
     8	import { join } from 'node:path';
     9	import { fileURLToPath } from 'node:url';
    10	import { INTENTS } from '../src/catalog.js';
    11	import { FAMILIES, FAMILY_OF, NONE, TAG_TYPES } from '../src/tools.js';
    12	import { vectorize, normalize, tagTokens, tagFeatures } from '../src/features.js';
    13	import { ctxFeatures } from '../src/history.js';
    14	import { silverSpans, relex, bioLabels, mulberry32 } from './lib/silver.js';
    15	import { exclusionIndex } from './lib/heldout.js';
    16	import { readReal, realTrain } from './real/real_rows.js';
    17	
    18	const ROOT = fileURLToPath(new URL('..', import.meta.url));
    19	export const DIM = 1 << 18;
    20	export const TAG_DIM = 1 << 18;
    21	const args = process.argv.slice(2);
    22	const SEED = +(args.find((a) => a.startsWith('--seed='))?.slice(7) || 13);
    23	const rng = mulberry32(SEED);
    24	const pick = (arr) => arr[Math.floor(rng() * arr.length)];
    25	
    26	const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l, i) => {
    27	  try { return JSON.parse(l); } catch (e) { throw new Error(`${p}:${i + 1}: ${e.message}`); }
    28	}) : []);
    29	const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);
    30	
    31	// ---------- environment / context sampling ----------
    32	const SHELL_P = [['bash', 0.35], ['zsh', 0.25], ['sh', 0.07], ['powershell', 0.18], ['fish', 0.08], ['cmd', 0.07]];
    33	function sampleEnv(shell) {
    34	  let s = shell;
    35	  if (!s) { let r = rng(); for (const [k, p] of SHELL_P) { if ((r -= p) <= 0) { s = k; break; } } s ??= 'bash'; }
    36	  let os;
    37	  if (s === 'cmd') os = 'win32';
    38	  else if (s === 'powershell') os = rng() < 0.7 ? 'win32' : rng() < 0.5 ? 'linux' : 'darwin';
    39	  else if (s === 'zsh') os = rng() < 0.6 ? 'darwin' : 'linux';
    40	  else os = rng() < 0.7 ? 'linux' : 'darwin';
    41	  return [`shell=${s}`, `os=${os}`];
    42	}
    43	const ENT_FAMILY = { container: 'docker', service: 'systemctl', pid: 'ps', proc: 'ps', port: 'ss', file: 'cat', dir: 'ls', branch: 'git', host: 'ping', url: 'curl' };
    44	const ENTS = Object.keys(ENT_FAMILY);
    45	function randomCtx(main) {
    46	  const types = [...new Set([main ?? pick(ENTS), ...ENTS.filter(() => rng() < 0.15)])];
    47	  const fam = rng() < 0.7 ? ENT_FAMILY[types[0]] : pick(Object.keys(FAMILIES));
    48	  return ctxFeatures({ entOrder: types, last: { intent: FAMILIES[fam][0] }, cwdFlags: rng() < 0.3 ? ['git'] : [] });
    49	}
    50	
    51	// ---------- typo augmentation ----------
    52	function typo(text) {
    53	  const chars = [...text];
    54	  const idxs = chars.map((c, i) => (/\p{L}/u.test(c) ? i : -1)).filter((i) => i >= 0);
    55	  if (idxs.length < 4) return text;
    56	  const i = idxs[1 + Math.floor(rng() * (idxs.length - 2))];
    57	  const op = rng();
    58	  if (op < 0.4) chars.splice(i, 1);
    59	  else if (op < 0.8 && /\p{L}/u.test(chars[i + 1] || '')) [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
    60	  else chars.splice(i, 0, chars[i]);
    61	  return chars.join('');
    62	}
    63	
    64	// ---------- anaphora (history reference) samples ----------
    65	const ANAPHORA = {
    66	  kill: { en: ['kill it', 'kill that', 'kill that process', 'terminate it', 'kill it now', 'kill this one', 'end that process', 'just kill it'],
    67	    pl: ['zabij go', 'zabij to', 'ubij go', 'zabij ten proces', 'zakończ go', 'ubij ten proces', 'zabij tamten', 'ubij to'],
    68	    map: { pid: 'kill_by_pid', proc: 'kill_by_name', port: 'kill_by_port', container: 'docker_stop' } },
    69	  logs: { en: ['show its logs', 'logs of that container', 'show logs for it', 'logs of it', 'tail its logs', "show that service's logs", 'what did it log'],
    70	    pl: ['pokaż jego logi', 'logi tego kontenera', 'pokaż logi tego', 'logi tej usługi', 'pokaż z niego logi', 'logi z tego', 'co tam loguje'],
    71	    map: { container: 'docker_logs', service: 'journal_service' } },
    72	  restart: { en: ['restart it', 'restart that service', 'restart that', 'reload it', 'bounce it'],
    73	    pl: ['zrestartuj go', 'zrestartuj tę usługę', 'zrestartuj to', 'uruchom go ponownie', 'przeładuj to'],
    74	    map: { service: 'service_restart' } },
    75	  stop: { en: ['stop it', 'stop that', 'stop that container', 'stop this service', 'shut it down'],
    76	    pl: ['zatrzymaj go', 'zatrzymaj to', 'zatrzymaj ten kontener', 'zatrzymaj tę usługę', 'wyłącz to'],
    77	    map: { container: 'docker_stop', service: 'service_stop', pid: 'kill_by_pid', proc: 'kill_by_name' } },
    78	  start: { en: ['start it', 'start that service', 'start it again'], pl: ['uruchom go', 'wystartuj tę usługę', 'włącz to'],
    79	    map: { service: 'service_start' } },
    80	  delete: { en: ['delete it', 'remove that', 'remove that file', 'delete this', 'rm it', 'get rid of it', 'delete that branch', 'delete that folder'],
    81	    pl: ['usuń to', 'usuń go', 'skasuj to', 'usuń ten plik', 'wywal to', 'skasuj tę gałąź', 'usuń ten folder', 'usuń tamto'],
    82	    map: { file: 'delete_file', dir: 'delete_dir', branch: 'git_delete_branch' } },
    83	  enter: { en: ['open a shell in it', 'exec into it', 'enter that container'], pl: ['wejdź do niego', 'wejdź do tego kontenera', 'otwórz w nim shell'],
    84	    map: { container: 'docker_exec' } },
    85	  switch: { en: ['switch to it', 'checkout that branch', 'go to that branch'], pl: ['przełącz się na nią', 'przejdź na tę gałąź', 'checkout na to'],
    86	    map: { branch: 'git_switch_branch' } },
    87	  status: { en: ['status of it', "what's its status", 'is it running'], pl: ['jaki ma status', 'status tego', 'czy to działa'],
    88	    map: { service: 'service_status' } },
    89	  size: { en: ['how big is it', 'size of that', "what's its size"], pl: ['ile to zajmuje', 'jaki ma rozmiar', 'ile waży ten folder'],
    90	    map: { dir: 'dir_size', file: 'file_stat' } },
    91	  show: { en: ['show it', 'open it', 'print it', 'cat that file', 'display that'], pl: ['pokaż go', 'pokaż to', 'wyświetl ten plik', 'otwórz to', 'wypisz to'],
    92	    map: { file: 'cat_file', dir: 'list_files' } },
    93	  ping: { en: ['ping it', 'ping that host'], pl: ['pingnij go', 'spinguj ten serwer'], map: { host: 'ping_host' } },
    94	  connect: { en: ['ssh into it', 'connect to it'], pl: ['połącz się z nim', 'zaloguj się na niego'], map: { host: 'ssh_connect' } },
    95	};
    96	
    97	// ---------------------------------------------------------------------------------------------
    98	function main() {
    99	  const outDir = join(ROOT, 'build');
   100	  mkdirSync(outDir, { recursive: true });
   101	  const ids = new Set(INTENTS.map((i) => i.id));
   102	
   103	  // held-out texts (never trained on), with filler-word near-duplicates and contrastive rewrites, and
   104	  // eval-only slot values (scripts/lib/silver.js EVAL_POOLS): the same index teacher.js uses (scripts/lib/heldout.js)
   105	  // private real-usage rows (scripts/real/prepare_real.js; build/real/, never committed): the train split is used for
   106	  // training, the eval split is held out like every other eval set. --no-real trains on public data only.
   107	  const real = args.includes('--no-real') ? [] : readReal(ROOT);
   108	  const excl = exclusionIndex(ROOT);
   109	  const heldOut = excl.heldOut;
   110	  const evalValRe = { test: excl.evalValue };
   111	  const leaks = excl.has;
   112	
   113	  const intentRows = [...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'train.jsonl'))]
   114	    .map((r) => ({ ...r, src: 'intents' }));
   115	  const shellRows = readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell' }));
   116	  const realRows = realTrain(real, ids);
   117	  for (const r of [...intentRows, ...shellRows]) if (!ids.has(r.intent)) throw new Error(`unknown intent ${r.intent}: ${r.text}`);
   118	  const publicCount = intentRows.length + shellRows.length;
   119	
   120	  // teacher review decisions (data/teacher/decisions.jsonl): drop or relabel individual training rows
   121	  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl')).filter((d) => d.text && d.field !== 'risk');
   122	  const decide = new Map(decisions.map((d) => [normalize(d.text), d]));
   123	  let dropped = 0;
   124	  let droppedEvalValue = 0;
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
   731	const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];
   732	
   733	/**
   734	 * Build the context object from history commands (oldest first). Only the single most recent command is a
   735	 * reference target ("delete it", "same for /var", "there" always mean the previous command, never an older one);
   736	 * the running `tellsh <query>` line itself, which some shells write before it runs, is dropped first.
   737	 * kind: 'posix' | 'pwsh' (default: `cmds.kind` as set by loadHistory, else posix)
   738	 * -> { n, line, ents: {type: value}, entOrder, refOrder, searchRoots, listedDirs, last: {intent, slots, ambiguous, skipped},
   739	 *      pos, listing, cdDir, features }
   740	 *    values that could not be read unambiguously are kept as AMB-prefixed strings (see isAmbiguous).
   741	 *    Within the line (`cat old.txt; ls newdir`) later segments win: pos gives the segment of each value, and refOrder
   742	 *    ranks types by it (entOrder, which feeds the classifiers' ctx_ features, ranks by type only). searchRoots: the dir
   743	 *    is a find/grep root or a filtered/piped listing; listedDirs: a plain listing. last.skipped: a later segment of the
   744	 *    line ran after the repeatable command. listing: the segment of the newest listing of each entity type ({ seg });
   745	 *    cdDir: the dir is a `cd` target ({ value, followed }). changeGuard() uses these.
   746	 */
   747	export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
   748	  const k = kind || cmds.kind || 'posix';
   749	  const list = [...cmds];
   750	  // zsh (share_history / inc_append_history), fish and PSReadLine write the running line to the
   751	  // history file before it executes: the current `tellsh <query>` call is not the previous command
   752	  if (query != null && list.length) {
   753	    const norm = (x) => String(x).trim().replace(/\s+/g, ' ');
   754	    const q = tellshQuery(list[list.length - 1], k);
   755	    if (q != null && (norm(q) === norm(query) || norm(list[list.length - 1]).includes(norm(query)))) list.pop();
   756	  }
   757	  const line = list.length ? list[list.length - 1] : null;
   758	  const a = line != null ? analyzeCommand(line, classify, k) : { ents: {}, at: {}, listed: {}, slots: {} };
   759	  const ents = {};
   760	  for (const t of ENT_TYPES) if (a.ents[t] != null) ents[t] = a.ents[t];
   761	  const pos = Object.fromEntries(Object.keys(ents).map((t) => [t, a.at?.[t] ?? 0]));
   762	  const dir = ents.dir != null ? String(ents.dir) : null;
   763	  const searchRoots = new Set(dir != null && a.searchDir ? [dir] : []);
   764	  const listedDirs = new Set(dir != null && a.listDir ? [dir] : []);
   765	  const listing = Object.fromEntries(Object.entries(a.listed || {}).map(([t, seg]) => [t, { seg }]));
   766	  const last = a.intent ? { intent: a.intent, slots: a.slots, ambiguous: !!a.ambiguous, skipped: !!a.intentStale } : null;
   767	  const current = a.ents.current && !isAmbiguous(a.ents.current) ? a.ents.current : null;
   768	  const cdDir = a.cdDir && dir != null ? { value: dir, followed: !!a.cdFollowed } : null;
   769	  const byType = (x, y) => ENT_TYPES.indexOf(x) - ENT_TYPES.indexOf(y);
   770	  const entOrder = Object.keys(ents).sort(byType);
   771	  const refOrder = Object.keys(ents).sort((x, y) => pos[y] - pos[x] || byType(x, y));
   772	  const ctx = { n: line != null ? 1 : 0, line, ents, currentBranch: current, entOrder, refOrder, searchRoots, listedDirs, last,
   773	    cwdFlags: cwdFlags(cwd), pos, listing, cdDir };
   774	  ctx.features = ctxFeatures(ctx);
   775	  return ctx;
   776	}
   777	
   778	export function cwdFlags(cwd) {
   930	export function resolveReference(query, ctx) {
   931	  if (!ctx || !ctx.n) return null;
   932	  const arg = sameFor(query);
   933	  if (arg && ctx.last) {
   934	    const rt = retarget(ctx.last.intent, arg);
   935	    // "what about this": no new argument at all, nothing to retarget
   936	    if (!rt && !arg.trim().split(/\s+/).some((w) => !PRONOUN_WORD.test(fold(w)) && !isStopWord(fold(w)))) {
   937	      return { rule: 'refused', intent: null, stop: true, note: `"${arg}" does not name a new target for the previous ${ctx.last.intent}; not guessing` };
   938	    }
   939	    // any newer line ran after it: replaying the older changing command for a new target is a guess
   940	    if (rt && ctx.last.skipped && BY_ID[ctx.last.intent].risk !== 'safe') {
   941	      return { rule: 'refused', intent: null, stop: true, note: `the newest command that tellsh can repeat (${ctx.last.intent}) is not the previous command; not guessing` };
   942	    }
   943	    // "same for /srv/x" after `git status`: the previous command has no slot for it; not a new request either
   944	    if (!rt && EXPLICIT_SAME.some((re) => re.test(fold(query)))) {
   945	      return { rule: 'refused', intent: null, stop: true, note: `the previous command (${ctx.last.intent}) has nothing that "${arg}" could replace; not guessing` };
   946	    }
   947	    if (rt) {
   948	      const slots = { ...ctx.last.slots, [rt.slot]: rt.value };
   949	      const amb = Object.entries(slots).find(([, v]) => isAmbiguous(v));
   950	      if (amb) return { rule: 'refused', intent: ctx.last.intent, blank: [amb[0]], note: `previous ${ctx.last.intent} has ${amb[0]}=${rawOf(amb[1])}, which depends on the shell state; not guessing` };
   951	      if (rt.slot === 'ext') delete slots.glob;
   952	      if (rt.slot === 'name') delete slots.namepat;
   953	      return { rule: 'same-for', intent: ctx.last.intent, slots, changed: rt.slot, note: `same as previous ${ctx.last.intent} with ${rt.slot}=${rt.value}` };
   954	    }
   955	  }
   956	  // "same for X", "same but …" when the previous command is not one tellsh can repeat (`ls newdir`, `clear`)
   957	  if (!ctx.last && (EXPLICIT_SAME.some((re) => re.test(fold(query))) || SAME_BUT.some((re) => re.test(fold(query))))) {
   958	    return { rule: 'refused', intent: null, stop: true, note: 'the previous command is not one tellsh can repeat; not guessing' };
   959	  }
   960	  if (!hasPronoun(query) && hasLocative(query)) return locativeRef(fold(query), ctx);
   961	  if (!hasPronoun(query)) return null;
   962	  // which entity does the pronoun point at? noun hint first ("that container"), else the newest in the line
   963	  const fq = fold(query);
   964	  const order = ctx.refOrder || ctx.entOrder;
   965	  let types = null;
   966	  const named = [];
   967	  // several types for one noun ("that process": pid or name): the one from the later segment wins
   968	  for (const [re, ts] of NOUN_TYPE) if (re.test(fq)) { named.push(...ts); types = ts.filter((t) => ctx.ents[t] != null).sort((a, b) => order.indexOf(a) - order.indexOf(b)); if (types.length) break; }
   969	  // "delete that branch" after a command without a branch: refuse instead of using another type's value
   970	  if (named.length && !types?.length) {
   971	    return { rule: 'refused', intent: null, ent: named[0], blank: [...new Set(named.flatMap((t) => SLOT_FROM_ENT[t] || []))], note: `the previous command names no ${named[0]}; not guessing` };
   972	  }
   973	  // "delete it" after `ls`, `clear`, `make`: nothing in the previous command it could mean
   974	  if (!ctx.entOrder.length) {
   975	    const listed = Object.keys(ctx.listing || {});
   976	    return { rule: 'refused', intent: null, blank: [...new Set(Object.values(SLOT_FROM_ENT).flat())],
   977	      note: listed.length ? `the previous command listed ${listed.join('/')} values; the reference may mean any of them; not guessing`
   978	        : 'the previous command names nothing the reference could mean; not guessing' };
   979	  }
   980	  const ent = (types && types.length ? types : order)[0];
   981	  if (!ent) return null;
   982	  let intent = null;
   983	  let verb = null;
   984	  for (const [name, re, table] of VERBS) {
   985	    if (re.test(fq)) {
   986	      const pick = table[ent] || (!types && order.map((e) => table[e]).find(Boolean));
   987	      if (pick) { intent = pick; verb = name; break; }
   988	    }
   989	  }
   990	  const finalEnt = intent ? (Object.entries(SLOT_FROM_ENT).find(([e]) => ctx.ents[e] != null && intentUses(intent, e)) ? pickEnt(intent, ent, ctx) : ent) : ent;
   991	  const value = chooseValue(finalEnt, ctx);
   992	  if (value == null || isAmbiguous(value)) {
   993	    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: `the latest ${finalEnt} in history (${rawOf(value ?? '?')}) cannot be read unambiguously; not guessing` };
   994	  }
   995	  // a value that is fine to show but not to change (search root, listed directory, older value, ...)
   996	  const guardNote = changeGuard(finalEnt, value, fq, ctx);
   997	  // "delete that branch" after `git checkout main`: the checked-out branch is never the one to delete
   998	  if (intent === 'git_delete_branch' && ctx.currentBranch != null && String(ctx.currentBranch) === String(value)) {
   999	    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: `${rawOf(value)} is the checked-out branch (the previous command switched to it); not guessing` };
  1000	  }
  1001	  if (guardNote && intent && BY_ID[intent].risk !== 'safe') {
  1002	    // "delete all log files in this folder": the request is about entries inside the directory, so the verb's
  1003	    // directory intent (`rm -r`) is not what was asked; the classifier's intent stays (`find <PATH> … -delete`)
  1004	    const contents = finalEnt === 'dir' && CONTENTS.test(fq);
  1005	    return { rule: 'refused', intent: contents ? null : intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: guardNote, ...(contents ? { contents: true } : {}) };
  1006	  }
  1007	  if (intent === 'kill_by_name' && FORCE.test(fq)) intent = 'kill_force';
  1008	  if (intent === 'extract_targz' && /\.zip$/i.test(value)) intent = 'extract_zip';
  1009	  const fill = {};
  1010	  for (const s of SLOT_FROM_ENT[finalEnt] || []) fill[s] = value;
  1011	  // guarded: the caller must not use the value for a non-safe intent it picks itself
  1012	  return { rule: 'pronoun', intent, fill, ent: finalEnt, ...(guardNote ? { guarded: true, guardNote } : {}), note: `"${finalEnt}" from history = ${value}` };
  1013	}
  1014	
  1015	/**
  1016	 * "there", "tam", "in the same folder": the newest directory of the history, as the place a command runs in
  1017	 * (`find {path} …`, `ls {path}`). It never names the object of a command (`rm -r`, `mv`): `locative` tells the caller.
  1018	 * Refused when there is no directory, it cannot be read, or a newer file is the newest location-like value.
  1019	 */
  1020	function locativeRef(fq, ctx) {
  1021	  const v = ctx.ents.dir;
  1022	  const base = { intent: null, ent: 'dir', blank: ['path', 'dest'], locative: true };
  1023	  if (v == null) return { rule: 'refused', ...base, note: 'the request refers to a place ("there"), but the previous command names no directory; not guessing' };
  1024	  if (isAmbiguous(v)) return { rule: 'refused', ...base, note: `the directory of the previous command (${rawOf(v)}) cannot be read unambiguously; not guessing` };
  1025	  // `cd /tmp/x; cat a.txt`: a file came after the directory in the previous command
  1026	  const fileNewer = ctx.ents.file != null && (ctx.pos.file ?? 0) >= (ctx.pos.dir ?? 0);
  1027	  if (fileNewer) return { rule: 'refused', ...base, note: `the previous command also names a file (${rawOf(ctx.ents.file)}), so "there" is unclear; not guessing` };
  1028	  const guardNote = changeGuard('dir', v, fq, ctx);
  1029	  return { rule: 'pronoun', ...base, fill: { path: String(v) }, ...(guardNote ? { guarded: true, guardNote } : {}), note: `"dir" from history = ${v}` };
  1030	}
  1031	
  1032	/**
  1033	 * Why `value` (of entity type `type`, from the previous command) must not be the target of a changing command
  1034	 * (rm, mv, cp, kill, chmod, git branch -d, ...), or null:
  1035	 *   - the request is about the entries inside a directory ("delete everything in it", "its contents");
  1036	 *   - a find/grep search root or a listed directory (`ls /tmp/build`): the user saw entries inside it;
  1037	 *   - a later segment of the command listed values of the type (`cat a.txt; ls`, `pgrep foo | xargs ps`, `docker ps`);
  1038	 *   - the directory of a `cd` after which other commands ran (`cd /tmp/build; make`, `cd /tmp/build && rg TODO`);
  1039	 */
  1040	export function changeGuard(type, value, fq, ctx) {
  1041	  const v = String(value);
  1042	  if (type === 'dir' && CONTENTS.test(fq)) return `the request is about the entries inside ${v}, not ${v} itself; not guessing`;
  1043	  if (type === 'dir' && ctx.searchRoots?.has(v)) return `the directory of the previous command (${v}) is where a search ran, not what it found; not guessing`;
  1044	  if (type === 'dir' && ctx.listedDirs?.has(v)) {
  1045	    const pl = PLURAL.exec(fq);
  1046	    return pl ? `"${pl[1]}" are the entries listed in ${v}, not the directory; not guessing`
  1047	      : `${v} was listed: the reference may mean the directory or one of its entries; not guessing`;
  1048	  }
  1049	  const L = ctx.listing?.[type];
  1050	  if (L && L.seg > (ctx.pos?.[type] ?? 0)) {
  1051	    return `the previous command listed ${type === 'dir' || type === 'file' ? 'files' : `${type} values`}, so the reference may mean one of them, not ${v}; not guessing`;
  1052	  }
  1053	  if (type === 'dir' && ctx.cdDir?.value === v && ctx.cdDir.followed) return `${v} is the working directory of a cd after which other commands ran; not guessing`;
  1054	  // "delete that backups folder" after `mkdir /srv/current`: the request names something else
  1055	  const hints = [...fq.matchAll(HINTED_NOUN)].map((m) => m[1]).filter(isHintWord);
  1056	  if (hints.length && !hints.some((w) => foldKeepLength(v).toLowerCase().includes(w))) return `the request names "${hints.join(' ')}", which is not part of ${v}; not guessing`;
  1057	  return null;
  1058	}
  1059	
  1060	/** The value of an entity type in the previous command (ambiguous values are returned as they are, and refused). */
  1061	const chooseValue = (type, ctx) => ctx.ents[type];
  1062	
  1063	// a word naming which one between a reference and its noun ("that backups folder", "ten folder backups" is not read)
  1064	const HINTED_NOUN = /\b(?:that|this|those|these|the|ten|ta|te|tamten|tamta|tamte)\s+([a-z0-9][\w.-]*)\s+(?:folders?|director(?:y|ies)|dirs?|files?|branch(?:es)?|containers?|services?|process(?:es)?|katalog\w*|folder\w*|plik\w*|kontener\w*|uslug\w*|galaz\w*|galez\w*)\b/g;

exec
/bin/bash -lc "nl -ba src/fill.js | sed -n '1,330p'" in /workspace/tellsh
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
   187	export function render(template, values, required = [], quote = shQuote) {
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
   198	        if (val == null) { ok = false; return m2; }
   199	        return val;
   200	      });
   201	      return ok ? (/^\s/.test(r) ? r : ' ' + r) : '';
   202	    }
   203	    if (!isSlot(name)) return m; // not a slot (e.g. awk braces, %{http_code}, PowerShell script blocks)
   204	    const val = renderValue(name, !!raw, values, quote);
   205	    if (val == null) {
   206	      missing.push(name);
   207	      return PLACEHOLDER(name);
   208	    }
   209	    return val;
   210	  });
   211	  return { command: out, missing };
   212	}
   213	
   214	const DERIVED_REQUIRED = { namepat: 'name', glob: 'ext', sedexpr: 'old' };
   215	
   216	const SIZE_MULT = { c: 1, k: 1024, M: 1024 ** 2, G: 1024 ** 3 };
   217	/** Slots derived from others so every shell can use the unit it needs (find: -mmin/-size, PowerShell: minutes/bytes). */
   218	export function deriveSlots(v) {
   219	  if (v.glob && v.ext == null) { const m = String(v.glob).match(/^\*\.([\w]+)$/); if (m) v.ext = m[1]; }
   220	  if (v.minutes == null && v.age) {
   221	    const m = String(v.age).match(/^-m(min|time) -(\d+)$/);
   222	    if (m) v.minutes = m[1] === 'min' ? +m[2] : +m[2] * 1440;
   223	  }
   224	  if (v.sizeBytes == null && v.size != null) {
   225	    const m = String(v.size).match(/^(\d+)([ckMG]?)$/);
   226	    if (m) v.sizeBytes = +m[1] * (SIZE_MULT[m[2]] ?? 512);
   227	  }
   228	  return v;
   229	}
   230	
   231	/** env from the legacy `platform` option */
   232	export const envFromPlatform = (platform = process.platform) => ({
   233	  shell: 'bash',
   234	  os: platform === 'darwin' ? 'darwin' : platform === 'win32' ? 'win32' : 'linux',
   235	  coreutils: platform === 'darwin' ? 'bsd' : 'gnu',
   236	});
   237	
   238	/**
   239	 * Build a full suggestion for an intent and query.
   240	 *   env: { shell, os, coreutils } (default: bash on `platform`)
   241	 *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
   242	 * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}
   243	 */
   244	export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [] } = {}) {
   245	  const intent = BY_ID[intentId];
   246	  if (!intent) throw new Error(`unknown intent ${intentId}`);
   247	  const e = env || envFromPlatform(platform);
   248	  const resolved = given || resolveSlots(intent, extracted || extractSlots(text));
   249	  const defaults = { ...intent.slots, ...(e.os === 'darwin' ? intent.darwinDefaults : {}) };
   250	  const values = {};
   251	  for (const [k, d] of Object.entries(defaults)) if (d != null) values[k] = d;
   252	  Object.assign(values, resolved);
   253	  // blank: slots withheld on purpose (refused reference, ambiguous path): no default stands in for them
   254	  for (const k of blank) if (resolved[k] == null) delete values[k];
   255	  // the filesystem root ("whole disk", "na całym dysku") is the system drive for Windows shells
   256	  if (e.os === 'win32' && (e.shell === 'powershell' || e.shell === 'cmd')) {
   257	    for (const k of PATH_SLOTS) if (values[k] === '/') values[k] = 'C:\\';
   258	  }
   259	  deriveSlots(values);
   260	  const required = [...new Set([...Object.entries(intent.slots).filter(([, d]) => d == null).map(([k]) => k), ...blank.filter((k) => !(k in values))])];
   261	
   262	  const choice = chooseTemplate(intent, e);
   263	  const base = {
   264	    intent: intent.id, description: intent.description, baseRisk: intent.risk, slots: resolved,
   265	    notes: intent.notes || null, shell: e.shell, os: e.os, variant: choice.variant || null,
   266	  };
   267	  if (choice.gap) {
   268	    return { ...base, command: null, gap: choice.gap, risk: intent.risk, warnings: [], critical: false, missing: [] };
   269	  }
   270	  const baseQuote = quoteForKind(choice.kind, choice.wrapPosix);
   271	  const tpl = choice.tpl;
   272	  const pwshNative = choice.kind === 'pwsh' && !choice.wrapPosix;
   273	  const nativeSlots = pwshNative ? pwshNativeSlots(tpl) : new Set();
   274	  const quote = !pwshNative ? baseQuote : (v, o = {}) => {
   275	    // function templates: every value is checked (the target program is not known statically)
   276	    if ((typeof tpl === 'function' || nativeSlots.has(o.name)) && unsafeNativePwshArg(v)) {
   277	      throw new UnquotableError(`value ${JSON.stringify(String(v))} cannot be passed to a native program safely by PowerShell < 7.3 (embedded " or trailing \\)`);
   278	    }
   279	    return baseQuote(v, o);
   280	  };
   281	  let command;
   282	  let missing = [];
   283	  try {
   284	    if (typeof tpl === 'function') {
   285	      const vals = { ...values };
   286	      for (const r of required) if (!(r in vals)) { missing.push(r); vals[r] = PLACEHOLDER(r); }
   287	      // only path slots may get a ./ prefix; any other value starting with - would be read as an
   288	      // option (printf -n, findstr /?, taskkill ...): it is left as a placeholder instead
   289	      for (const [k, v] of Object.entries(vals)) {
   290	        if (!PATH_SLOTS.has(k) && !RAW_OK[k] && typeof v === 'string' && /^-/.test(v)) { missing.push(k); vals[k] = PLACEHOLDER(k); }
   291	      }
   292	      const pathVals = new Set([...PATH_SLOTS].filter((k) => vals[k] != null).map((k) => String(vals[k])));
   293	      const q = (s) => {
   294	        const isPath = pathVals.has(String(s));
   295	        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { tilde: isPath });
   296	      };
   297	      // catalog functions take the OS string, variant functions a ctx object
   298	      command = tpl(vals, q, tpl === intent.template || tpl === intent.darwin ? e.os : e);
   299	      if (/<TEXT>/.test(command)) missing.push('text');
   300	    } else {
   301	      ({ command, missing } = render(tpl, values, required, quote));
   302	      missing = missing.map((m) => DERIVED_REQUIRED[m] || m);
   303	    }
   304	  } catch (err) {
   305	    if (!(err instanceof UnquotableError)) throw err;
   306	    return { ...base, command: null, gap: err.message, risk: intent.risk, warnings: [], critical: false, missing: [] };
   307	  }
   308	  if (choice.wrapPosix) {
   309	    // PowerShell < 7.3 drops embedded double quotes when passing arguments to native programs, so a
   310	    // POSIX command containing `"` is fed to bash on stdin instead of as a -c argument.
   311	    if (command.includes('"')) { command = psQuote(command) + ' | bash'; base.variant = 'piped to bash (no native PowerShell variant)'; }
   312	    else { command = 'bash -c ' + psQuote(command); base.variant = 'bash -c (no native PowerShell variant)'; }
   313	  }
   314	  missing = [...new Set(missing)];
   315	  const danger = checkDanger(command, intent.risk);
   316	  return {
   317	    ...base,
   318	    command,
   319	    risk: maxRisk(intent.risk, danger.risk),
   320	    warnings: danger.warnings,
   321	    critical: danger.critical,
   322	    missing,
   323	  };
   324	}

exec
/bin/bash -lc "rg --files build/hybrid | head -25; sed -n '930,1063p' src/history.js; sed -n '1,120p' src/danger.js; sed -n '566,680p' src/danger.js" in /workspace/tellsh
 succeeded in 0ms:
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
build/hybrid/results_v04a.json
build/hybrid/enc/final.pt
build/hybrid/enc/ckpt.pt
build/hybrid/enc/tokenizer.json
build/hybrid/enc/train_info.json
build/hybrid/enc/tokenizer_config.json
build/hybrid/eval_after.log
build/hybrid/meta.json
build/hybrid/policy_ft.json
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
  // "delete that backups folder" after `mkdir /srv/current`: the request names something else
  const hints = [...fq.matchAll(HINTED_NOUN)].map((m) => m[1]).filter(isHintWord);
  if (hints.length && !hints.some((w) => foldKeepLength(v).toLowerCase().includes(w))) return `the request names "${hints.join(' ')}", which is not part of ${v}; not guessing`;
  return null;
}

/** The value of an entity type in the previous command (ambiguous values are returned as they are, and refused). */
const chooseValue = (type, ctx) => ctx.ents[type];

// a word naming which one between a reference and its noun ("that backups folder", "ten folder backups" is not read)
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
/bin/bash -lc 'git diff 0d87457..HEAD -- src/catalog.js src/slots.js src/tagger.js' in /workspace/tellsh
 succeeded in 0ms:
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
diff --git a/src/slots.js b/src/slots.js
index fb80f79..7042344 100644
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
@@ -492,6 +551,17 @@ export function pickArg(slot, ex) {
     if (m && !/^(base64|to|this|it|in)\b/i.test(m[1])) return m[1].trim();
     return null;
   }
+  if (slot === 'pkg') {
+    // "pip install requests", "npm i -g typescript": the installer is not the package, unless nothing else is named
+    // ("install npm"); a tool word right before the install verb is always the installer ("npm install")
+    const cmdLike = text.match(/\b(?:npm|pnpm|yarn|bun|pip3?|pipx|uv pip)\s+(?:i|install|add)\s+(?:(?:-[gDU]|--global|--save-dev|--upgrade|--user)\s+)*(@?[\w][\w.@\/=<>~+-]*)/i);
+    if (cmdLike && !/^-/.test(cmdLike[1])) return cmdLike[1];
+    for (const w of words) if (vocab.has(w) && !PKG_SKIP.has(w)) return original(text, w);
+    const r = nextAfter(words, TRIG.pkg, { skip: new Set([...STOP, ...PKG_SKIP]), accept: /^@?[\w.+-]+(?:\/[\w.+-]+)?(?:[=@<>~]=?[\w.*-]+)?$/ });
+    if (r) return original(text, r.word);
+    const i = words.findIndex((w, k) => vocab.has(w) && !/^(install|i|add|uninstall|zainstaluj|instaluj)$/.test(words[k + 1] || ''));
+    return i >= 0 ? original(text, words[i]) : null;
+  }
   if (vocab) {
     for (const w of words) if (vocab.has(w)) return original(text, w);
     // Polish inflection of a known name: "procesy javy" -> java, "logi nginxa" -> nginx, "chroma" -> chrome
@@ -504,8 +574,16 @@ export function pickArg(slot, ex) {
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

codex
I reproduced a composer path that restores a target the catalog withheld: a recursive chmod request containing `` `pwd` `` becomes a command against the literal file `pwd`. I’m checking for the same bypass with other invalid targets.

The test run has sandbox-related failures, including attempts to create temporary files on the read-only filesystem. I’ll distinguish those from confirmed code defects.
exec
/bin/bash -lc "node --input-type=module <<'JS'
import {readFileSync} from 'node:fs';
import {exclusionIndex,heldOutTexts,nearKey} from './scripts/lib/heldout.js';
import {normalize} from './src/features.js';
const ix=exclusionIndex(process.cwd());
const rows=readFileSync('build/hybrid/train.jsonl','utf8').trim().split('\\n').map(JSON.parse);
const leaked=rows.filter(r=>r.split==='train'&&ix.has(r.text));
const pub=leaked.filter(r=>r.src"'!=='"'real');
console.log('rows',rows.length,'training leaks',leaked.length,'public',pub.length);
for(const r of pub.slice(0,15)){const match=heldOutTexts(process.cwd()).find(t=>normalize(t)===normalize(r.text)||nearKey(t)===nearKey(r.text));console.log(JSON.stringify({text:r.text,kind:r.kind,intent:r.intent,match}));}
JS" in /workspace/tellsh
 succeeded in 2055ms:
rows 54057 training leaks 126 public 100
{"text":"find files older than 20 days","kind":"typo","intent":"find_older_than","match":"find files older than 30 days"}
{"text":"pokaż pierwsze 19 linii data.csv","kind":"relex","intent":"head_file","match":"pokaż pierwsze 10 linii data.csv"}
{"text":"koniec pliku /var/log/syslog","kind":"relex","intent":"tail_file","match":"koniec pliku /var/log/syslog"}
{"text":"pokaz caly plik requirements.txt","kind":"relex","intent":"cat_file","match":"pokaz caly plik requirements.txt"}
{"text":"decompress archive.tar.gz","kind":"relex","intent":"extract_targz","match":"decompress archive.tar.gz here"}
{"text":"rozpakuj backup.tar.gz tutaj","kind":"relex","intent":"extract_targz","match":"rozpakuj backup.tar.gz"}
{"text":"rozpakuj zdjecia.zip","kind":"relex","intent":"extract_zip","match":"rozpakuj zdjecia.zip"}
{"text":"kill all node processes","kind":"relex","intent":"kill_by_name","match":"kill all node processes"}
{"text":"terminate firefox","kind":"relex","intent":"kill_by_name","match":"terminate firefox"}
{"text":"show last 9 logins","kind":"relex","intent":"last_logins","match":"show the last 5 logins"}
{"text":"ostanie logowania","kind":"typo","intent":"last_logins","match":"ostanie logowania"}
{"text":"pokaż 17 ostatnich logowań","kind":"relex","intent":"last_logins","match":"pokaż 15 ostatnich logowań"}
{"text":"czy nginx działa","kind":"relex","intent":"service_status","match":"czy nginx działa"}
{"text":"restart redis please","kind":"relex","intent":"service_restart"}
{"text":"can you restart apache2","kind":"relex","intent":"service_restart","match":"can you restart apache2?"}

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
const qs=['change permissions recursively to 777 on "'$(pwd)'"','change permissions recursively to 777 on \"/tmp/a\\nb\"','change permissions recursively to 777 on \"/tmp/'+ 'x'.repeat(270)+'\"','change permissions recursively to 777 on /tmp/x"'!'"','compress "'`pwd` recursively to backup.tar.gz'"','delete empty directories in "'`pwd`'"','delete log files in "'`pwd` older than 7 days'"','delete log files older than 7 days in /tmp/x and /tmp/y'];
for(const q of qs){const r=suggest(q,{env});console.log(JSON.stringify({q,method:r.method,command:r.command,missing:r.missing}));}
JS" in /workspace/tellsh
 succeeded in 198ms:
{"q":"change permissions recursively to 777 on $(pwd)","method":"catalog","command":"chmod 777 <FILE>","missing":["file"]}
{"q":"change permissions recursively to 777 on \"/tmp/a\nb\"","method":"composed","command":"chmod -R 777 -- '/tmp/a\nb'","missing":[]}
{"q":"change permissions recursively to 777 on \"/tmp/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\"","method":"composed","command":"chmod -R 777 -- /tmp/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx","missing":[]}
{"q":"change permissions recursively to 777 on /tmp/x!","method":"catalog","command":"chmod 777 <FILE>","missing":["file"]}
{"q":"compress `pwd` recursively to backup.tar.gz","method":"catalog","command":"tar -czvf backup.tar.gz <PATH>","missing":["path"]}
{"q":"delete empty directories in `pwd`","method":"catalog","command":"find pwd -type d -empty","missing":[]}
{"q":"delete log files in `pwd` older than 7 days","method":"catalog","command":"find pwd -type f -mtime +7 -iname '*.log'","missing":[]}
{"q":"delete log files older than 7 days in /tmp/x and /tmp/y","method":"catalog","command":"find /tmp/x -type f -mtime +7 -iname '*.log'","missing":[]}

exec
/bin/bash -lc 'git diff 0d87457..HEAD -- src/catalog.js; cat scripts/hybrid/export_encoder.py; cat scripts/hybrid/prune_vocab.py' in /workspace/tellsh
 succeeded in 0ms:
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
/bin/bash -lc "sed -n '120,245p' src/danger.js; sed -n '566,655p' src/danger.js; sed -n '158,260p' src/cli.js" in /workspace/tellsh
 succeeded in 0ms:
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
  const opts = parseArgs(argv);
  if (opts.version) { console.log(pkg.version); return 0; }
  if (opts.help || !opts.words.length) { console.log(HELP); return opts.help ? 0 : 2; }
  if (opts.badThreshold != null) { console.error(`tellsh: --threshold needs a number between 0 and 1 (got "${opts.badThreshold}")`); return 2; }
  // the shell removed the quotes: a word with spaces is quoted again so "/tmp/a b" stays one path
  const query = joinWords(opts.words);
  if (query == null) { console.error('tellsh: an argument contains spaces and both kinds of quotes; it cannot be read as one value'); return 2; }
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
    const so = { top: opts.top, threshold: opts.threshold, env, history, cwd: process.cwd(), compose: opts.compose };
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

exec
/bin/bash -lc "cat scripts/hybrid/sets.js; sed -n '1,170p' scripts/hybrid/eval_hybrid.js; sed -n '1,180p' scripts/real/prepare_real.js; cat scripts/real/real_rows.js" in /workspace/tellsh
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

exec
/bin/bash -lc "git show 0d87457:src/history.js | sed -n '285,375p'; nl -ba src/rerank/hybrid.js | sed -n '50,100p'; cat src/cascade.js; sed -n '335,460p' src/compose.js" in /workspace/tellsh
 succeeded in 0ms:
    const r = q && classify ? classify(q) : null;
    if (r?.intent) { intent = r.intent; slots = r.slots || {}; entsFromSlots(intent, slots, ents); }
    return { line: t, intent, slots, ents, fromTellsh: true, ambiguous };
  }
  const split = splitCommand(t, k);
  if (!split.ok) {
    // cannot interpret the line (unterminated quote, heredoc, ...): it may name any file or directory,
    // so older file/dir values must not be picked up by "it"
    ents.file = AMB + t;
    ents.dir = AMB + t;
    return { line: t, intent, slots, ents, opaque: true, ambiguous: true };
  }
  const inv = invert(t, k);
  if (inv) { intent = inv.intent; slots = inv.slots; ambiguous = inv.ambiguous; entsFromSlots(intent, slots, ents); }
  const setIntent = (id, s) => { if (!intent) { intent = id; slots = s; } };
  for (const { words } of split.segments) {
    let w = words;
    while (w.length && (w[0] === 'sudo' || /^\w+=/.test(w[0]))) w = w.slice(1);
    if (!w.length) continue;
    if (isAmbiguous(w[0])) {
      if (w.slice(1).some((a) => PATHLIKE.test(rawOf(a)))) { ents.file ??= AMB + t; ents.dir ??= AMB + t; }
      continue;
    }
    const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '');
    const args = w.slice(1);
    const nonFlags = args.filter((a) => !/^-/.test(a));
    if ((k === 'pwsh' || PS_CMDLET.test(head)) && psNative(head.toLowerCase(), args, ents, setIntent)) continue;
    if (head === 'docker') {
      const sub = nonFlags[0];
      if (sub === 'run') {
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
    50	  const tool = FAMILY_OF[best];
    51	  const top = [{ intent: best, tool, p: conf, pTool: pa[best] ?? 0, pIntent: px }, ...c.top.filter((t) => t.intent !== best)];
    52	  return { ...c, intent: best, tool, confidence: conf, top, reranked: true, topTool: ok ? tool : c.topTool };
    53	}
    54	
    55	/**
    56	 * opts: suggest() options + { system: 'A'|'B'|'C'|'A+B'|'A+C', encoder (src/rerank/encoder.js Encoder),
    57	 *        lm: async (text, env, candidateIntents) -> {intent: p}, policy }
    58	 * -> suggest() result + { hybrid: { system, deferred, model, ms } }
    59	 */
    60	export async function suggestHybrid(query, opts = {}) {
    61	  const system = opts.system || 'A+B';
    62	  const env = opts.env || detectEnv({ shell: opts.shell, os: opts.os });
    63	  const base = { ...opts, env };
    64	  if (system === 'A') return { ...suggest(query, base), hybrid: { system, deferred: false } };
    65	  const P = { ...POLICY[system], ...(opts.policy || {}) };
    66	  let seen = null;
    67	  const first = suggest(query, { ...base, rerank: (c) => { seen = c; return c; } });
    68	  if (!seen || seen.confidence >= P.tau) return { ...first, hybrid: { system, deferred: false } };
    69	  const t0 = performance.now();
    70	  let pX; let pNone = 0; let tagger;
    71	  if (/B/.test(system)) {
    72	    if (!opts.encoder) return { ...first, hybrid: { system, deferred: false, unavailable: 'encoder' } };
    73	    const b = await opts.encoder.infer(query, env);
    74	    pX = b.intents;
    75	    pNone = b.pNone;
    76	    if (P.tagger === 'B') tagger = b.tagger;
    77	  } else {
    78	    if (!opts.lm) return { ...first, hybrid: { system, deferred: false, unavailable: 'lm' } };
    79	    pX = await opts.lm(query, env, seen.top.slice(0, P.k).map((t) => t.intent));
    80	    if (!pX) return { ...first, hybrid: { system, deferred: true, unavailable: 'lm' } };
    81	  }
    82	  const ms = performance.now() - t0;
    83	  const res = suggest(query, { ...base, tagger, rerank: (c, { thr }) => rerank(c, pX, P, { thr, pNone }) });
    84	  return { ...res, hybrid: { system, deferred: true, ms, pNone } };
    85	}
    86	
    87	/** CLI entry: A+B with the encoder loaded lazily (only when the cascade defers); falls back to A when the optional
    88	 *  runtime or model bundle is missing (result.hybrid.unavailable says why). */
    89	let ENC = null;
    90	export async function suggestLazy(query, opts = {}) {
    91	  const encoder = { infer: async (t, env) => {
    92	    if (ENC === null) { const { Encoder } = await import('./encoder.js'); ENC = (await Encoder.load({ threads: 1 })) || false; }
    93	    if (!ENC) throw Object.assign(new Error('unavailable'), { unavailable: true });
    94	    return ENC.infer(t, env);
    95	  } };
    96	  try {
    97	    return await suggestHybrid(query, { ...opts, system: opts.system || 'A+B', encoder });
    98	  } catch (e) {
    99	    if (!e.unavailable) throw e;
   100	    return { ...suggest(query, opts), hybrid: { system: 'A', deferred: false, unavailable: 'encoder (install onnxruntime-node + tellsh-model-enc)' } };
// Stages 1+2 of the cascade.
//   stage 1: p(tool | request, shell/os/ctx tokens)          -> top-k tool families (k = 3)
//   stage 2: p(intent | request, tool) inside each candidate -> score = p(tool) * p(intent | tool)
// The best score over all candidate tools wins, so a stage-1 mistake ranked 2nd/3rd can still be recovered.
import { getModel, predictProba } from './model.js';
import { vectorize } from './features.js';
import { NONE } from './tools.js';

/**
 * -> { intent, tool, confidence, top: [{intent, tool, p, pTool, pIntent}], tools: [{tool, p}],
 *      topTool, topToolP, pNone }
 */
export function cascade(text, { model = getModel(), extras = [], k = 3, top = 3, restrictTool } = {}) {
  const feats = [...vectorize(text, model.dim, extras)];
  const tm = model.models.tool;
  const pt = predictProba(tm, feats);
  const order = Array.from(pt.keys()).sort((a, b) => pt[b] - pt[a]);
  const noneIdx = tm.labels.indexOf(NONE);
  // restrictTool: stage 2 only inside one family (history "same but ..." refers to the previous tool)
  if (restrictTool) { const i = tm.labels.indexOf(restrictTool); pt[i] = 1; order.splice(order.indexOf(i), 1); order.unshift(i); }
  const cands = restrictTool ? [tm.labels.indexOf(restrictTool)] : order.filter((i) => i !== noneIdx).slice(0, k);
  const scored = [];
  for (const i of cands) {
    const fam = tm.labels[i];
    const im = model.models['intent:' + fam];
    if (im) {
      const pi = predictProba(im, feats);
      im.labels.forEach((l, j) => scored.push({ intent: l, tool: fam, p: pt[i] * pi[j], pTool: pt[i], pIntent: pi[j] }));
    } else {
      for (const l of model.intentsByFamily[fam] || []) scored.push({ intent: l, tool: fam, p: pt[i], pTool: pt[i], pIntent: 1 });
    }
  }
  scored.sort((a, b) => b.p - a.p);
  const best = scored[0] || { intent: null, tool: null, p: 0 };
  return {
    intent: best.intent,
    tool: best.tool,
    confidence: best.p,
    top: scored.slice(0, Math.max(1, top)),
    tools: order.slice(0, k).map((i) => ({ tool: tm.labels[i], p: pt[i] })),
    topTool: tm.labels[order[0]],
    topToolP: pt[order[0]],
    pNone: noneIdx >= 0 ? pt[noneIdx] : 0,
  };
}
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

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {readFileSync} from 'node:fs';
import {exclusionIndex} from './scripts/lib/heldout.js';
import {pathToFileURL} from 'node:url';
const root=process.cwd(), ix=exclusionIndex(root);
let src=readFileSync('scripts/hybrid/export_data.js','utf8');
src=src.replace('mkdirSync, writeFileSync','mkdirSync as unusedMkdir, writeFileSync as unusedWrite');
src=src.replace(\"const ROOT = fileURLToPath(new URL('../..', import.meta.url));\","'`const ROOT = ${JSON.stringify(root)}; const mkdirSync = () => {}; const writeFileSync = (p,s) => { if(p.endsWith('"'train.jsonl')) globalThis.reviewRows=s.trim().split('\\\\n').map(JSON.parse); };"'`);
src=src.replace(/from '"'(["'^'"']+)'/g,(m,p)=>p.startsWith('.')?"'`from '"'"'${new URL(p,pathToFileURL(root+'"'/scripts/hybrid/export_data.js')).href}'"'`:m);
await import('"'data:text/javascript;base64,'+Buffer.from(src).toString('base64'));
const leaks=globalThis.reviewRows.filter(r=>r.split==='train'&&ix.has(r.text));
console.log(JSON.stringify({generated:globalThis.reviewRows.length,trainingLeaks:leaks.length,publicLeaks:leaks.filter(r=>r.src"'!=='"'real').length,examples:leaks.filter(r=>r.src"'!=='"'real').slice(0,8).map(({text,kind})=>({text,kind}))}));
JS" in /workspace/tellsh
 succeeded in 2382ms:
export_data: 17124 base (4260 real), 54055 rows (train 48692, dev 5363), tldr 1700, ood 398
{"generated":54055,"trainingLeaks":132,"publicLeaks":104,"examples":[{"text":"find files older than 20 days","kind":"typo"},{"text":"pokaż pierwsze 19 linii data.csv","kind":"relex"},{"text":"koniec pliku /var/log/syslog","kind":"relex"},{"text":"pokaz caly plik requirements.txt","kind":"relex"},{"text":"decompress archive.tar.gz","kind":"relex"},{"text":"rozpakuj backup.tar.gz tutaj","kind":"relex"},{"text":"rozpakuj zdjecia.zip","kind":"relex"},{"text":"kill all node processes","kind":"relex"}]}

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggestHybrid} from './src/rerank/hybrid.js';
import {cascade} from './src/cascade.js';
import {envFeatures} from './src/env.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const q of ['show big files','restart the app','show container information']){
 const c=cascade(q,{extras:envFeatures(env),top:5});
 console.log(q,c.confidence,c.top.map(t=>t.intent));
 if(c.top[4]){const encoder={infer:async()=>({intents:{[c.top[4].intent]:1},pNone:0})};
 for(const top of [undefined,5]) {const r=await suggestHybrid(q,{env,top,encoder,compose:'off'});console.log(JSON.stringify({top,intent:r.intent,command:r.command,hybrid:r.hybrid}));}}
}
JS" in /workspace/tellsh
 succeeded in 92ms:
show big files 0.3296860324092627 [
  'hidden_files',
  'find_larger_than',
  'largest_files',
  'empty_files',
  'recent_files'
]
{"intent":"hidden_files","command":"find . -maxdepth 1 -name '.*'","hybrid":{"system":"A+B","deferred":true,"ms":0.05732199999999921,"pNone":0}}
{"top":5,"intent":"recent_files","command":"find . -type f -printf '%T@ %TY-%Tm-%Td %TH:%TM %p\\n' 2>/dev/null | sort -rn | head -n 10 | cut -d' ' -f2-","hybrid":{"system":"A+B","deferred":true,"ms":0.017035000000021228,"pNone":0}}
restart the app 0.9925468734149825 [
  'service_restart',
  'npm_run_script',
  'uptime',
  'npm_install',
  'service_enable'
]
{"intent":"service_restart","command":"sudo systemctl restart <SERVICE>","hybrid":{"system":"A+B","deferred":false}}
{"top":5,"intent":"service_restart","command":"sudo systemctl restart <SERVICE>","hybrid":{"system":"A+B","deferred":false}}
show container information 0.4249597497709018 [
  'docker_stats',
  'docker_ps_all',
  'docker_ps',
  'docker_logs',
  'docker_exec'
]
{"intent":"docker_stats","command":"docker stats --no-stream","hybrid":{"system":"A+B","deferred":true,"ms":0.016942000000000235,"pNone":0}}
{"top":5,"intent":"docker_exec","command":"docker exec -it information sh","hybrid":{"system":"A+B","deferred":true,"ms":0.007660000000015543,"pNone":0}}

exec
/bin/bash -lc "sed -n '1,120p' test/hybrid.test.js; nl -ba scripts/hybrid/export_data.js | sed -n '70,116p'; git show 0d87457:src/history.js | rg -n -A26 'function buildContext'; cat scripts/hybrid/fetch_model.js" in /workspace/tellsh
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
    70	    const d = decide.get(n);
    71	    if (d?.action === 'drop') continue;
    72	    const r = d?.action === 'relabel' && d.intent ? { ...r0, intent: d.intent } : r0;
    73	    const key = n + '|' + r.intent + '|' + (r.shell || '');
    74	    if (seen.has(key)) continue;
    75	    seen.add(key);
    76	    base.push(r);
    77	  }
    78	  const rows = [];
    79	  let gid = 0;
    80	  const push = (o) => rows.push(o);
    81	  for (const r of base) {
    82	    const g = gid++;
    83	    const tool = FAMILY_OF[r.intent];
    84	    const split = isDev(r.text) ? 'dev' : 'train';
    85	    const env = () => (r.shell ? { shell: r.shell, os: r.os || 'linux' } : sampleEnv());
    86	    const { spans } = silverSpans(r.text, r.intent);
    87	    const sp = (s) => s.map((x) => [x.type, x.start, x.end]);
    88	    push({ text: r.text, tool, intent: r.intent, lang: r.lang, ...env(), spans: sp(spans), gid: g, src: r.src, split, kind: 'orig' });
    89	    push({ text: typo(r.text), tool, intent: r.intent, lang: r.lang, ...env(), spans: null, gid: g, src: r.src, split, kind: 'typo' });
    90	    for (let k = 0; k < 2; k++) {
    91	      const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'train' });
    92	      if (rx.text !== r.text) push({ text: rx.text, tool, intent: r.intent, lang: r.lang, ...env(), spans: sp(rx.spans), gid: g, src: r.src, split, kind: 'relex' });
    93	    }
    94	  }
    95	  // tldr descriptions: tool label only (intent ''), capped per family/lang as in gen_data
    96	  const tldr = readJsonl(join(ROOT, 'data', 'tldr', 'tools.jsonl'));
    97	  const cap = {};
    98	  for (const r of tldr.sort(() => rng() - 0.5)) {
    99	    if (!FAMILIES[r.tool] || !r.text || r.text.length < 8 || heldOut.has(r.text)) continue;
   100	    const key = r.tool + r.lang;
   101	    if ((cap[key] = (cap[key] || 0) + 1) > (r.lang === 'pl' ? 60 : 80)) continue;
   102	    const win = /^windows\//.test(r.page || '');
   103	    push({ text: r.text, tool: r.tool, intent: '', lang: r.lang, ...(win ? { shell: 'powershell', os: 'win32' } : sampleEnv()), spans: null, gid: gid++, src: 'tldr', split: isDev(r.text) ? 'dev' : 'train', kind: 'orig' });
   104	  }
   105	  for (const r of readJsonl(join(ROOT, 'data', 'ood.jsonl'))) {
   106	    if (heldOut.has(r.text)) continue;
   107	    const g = gid++;
   108	    const split = isDev(r.text) ? 'dev' : 'train';
   109	    push({ text: r.text, tool: NONE, intent: '', lang: r.lang, ...sampleEnv(), spans: [], gid: g, src: 'ood', split, kind: 'orig' });
   110	    push({ text: typo(r.text), tool: NONE, intent: '', lang: r.lang, ...sampleEnv(), spans: [], gid: g, src: 'ood', split, kind: 'typo' });
   111	  }
   112	  writeFileSync(join(OUT, 'train.jsonl'), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
   113	  const meta = {
   114	    tools: [...Object.keys(FAMILIES), NONE],
   115	    intents: INTENTS.map((i) => i.id),
   116	    intentTool: Object.fromEntries(INTENTS.map((i) => [i.id, FAMILY_OF[i.id]])),
418:export function buildContext(cmds, { classify, cwd, kind } = {}) {
419-  const k = kind || cmds.kind || 'posix';
420-  const ents = {};
421-  const all = {};
422-  const recency = {};
423-  let last = null;
424-  let current = null;
425-  const recent = [...cmds].reverse();
426-  recent.forEach((line, i) => {
427-    const a = analyzeCommand(line, classify, k);
428-    if (!last && a.intent) last = { intent: a.intent, slots: a.slots, age: i, ambiguous: !!a.ambiguous };
429-    if (current == null && a.ents.current && !isAmbiguous(a.ents.current)) current = a.ents.current;
430-    for (const t of ENT_TYPES) {
431-      if (a.ents[t] == null) continue;
432-      if (ents[t] == null) { ents[t] = a.ents[t]; recency[t] = i; }
433-      (all[t] ??= []).includes(String(a.ents[t])) || all[t].push(String(a.ents[t]));
434-    }
435-  });
436-  const entOrder = Object.keys(ents).sort((a, b) => recency[a] - recency[b] || ENT_TYPES.indexOf(a) - ENT_TYPES.indexOf(b));
437-  const ctx = { n: cmds.length, ents, all, currentBranch: current, entOrder, last, cwdFlags: cwdFlags(cwd) };
438-  ctx.features = ctxFeatures(ctx);
439-  return ctx;
440-}
441-
442-export function cwdFlags(cwd) {
443-  if (!cwd) return [];
444-  const f = [];
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
mkdirSync(dest, { recursive: true });
for (const [f, want] of Object.entries(manifest.files)) {
  const buf = await get(f);
  if (sha(buf) !== want) throw new Error(`${f}: sha256 mismatch`);
  writeFileSync(join(dest, f + '.part'), buf);
  renameSync(join(dest, f + '.part'), join(dest, f));
}
writeFileSync(join(dest, 'manifest.json'), JSON.stringify(manifest, null, 1));
console.log(`installed ${BUNDLE} -> ${dest} (${readdirSync(dest).join(', ')})`);

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
import {buildContext,tellshQuery} from './src/history.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const hist of [ ['cat /tmp/important.txt','tellsh --dry-run \"delete it from /tmp/scratch\"'],['cat /tmp/important.txt','tellsh --dry-run \"show me how to delete it\"'],['cat /tmp/important.txt','tellsh --dry-run \"delete it\"']]) {const r=suggest('delete it',{env,history:hist,compose:'off'});console.log(JSON.stringify({history:hist,parsed:tellshQuery(hist[1]),chosen:buildContext(hist,{query:'delete it'}).line,command:r.command,context:r.context}));}
JS" in /workspace/tellsh
 succeeded in 152ms:
{"history":["cat /tmp/important.txt","tellsh --dry-run \"delete it from /tmp/scratch\""],"parsed":"delete it from /tmp/scratch","chosen":"cat /tmp/important.txt","command":"rm /tmp/important.txt","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = /tmp/important.txt"}}
{"history":["cat /tmp/important.txt","tellsh --dry-run \"show me how to delete it\""],"parsed":"show me how to delete it","chosen":"cat /tmp/important.txt","command":"rm /tmp/important.txt","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = /tmp/important.txt"}}
{"history":["cat /tmp/important.txt","tellsh --dry-run \"delete it\""],"parsed":"delete it","chosen":"cat /tmp/important.txt","command":"rm /tmp/important.txt","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = /tmp/important.txt"}}

exec
/bin/bash -lc "nl -ba src/render.js | sed -n '10,100p'; sed -n '1,90p' test/cli.test.js; node bin/tellsh.js --json --shell bash --os linux list files" in /workspace/tellsh
 succeeded in 58ms:
    10	import { VARIANTS } from './variants.js';
    11	
    12	// never a leading `=`: zsh expands `=word` to the path of command `word`
    13	const SAFE_POSIX = /^[A-Za-z0-9_\/.,:@%+-][A-Za-z0-9_\/.,:@%+=-]*$/;
    14	
    15	// Every quote function takes { tilde }: true (default) only for path slots, where a leading ~ means
    16	// the home directory; any other value (grep pattern, commit message, sed text) stays a literal `~`.
    17	
    18	/** POSIX shell quoting. Keeps a leading ~/ of a path unquoted so tilde expansion still works. */
    19	export function shQuote(value, { tilde: expand = true } = {}) {
    20	  const s = String(value);
    21	  if (s === '') return "''";
    22	  const tilde = expand && s.match(/^~(\/|$)(.*)$/s);
    23	  if (tilde) return '~' + tilde[1] + (tilde[2] ? shQuote(tilde[2]) : '');
    24	  if (SAFE_POSIX.test(s) && !s.startsWith('~')) return s;
    25	  return "'" + s.replace(/'/g, `'\\''`) + "'";
    26	}
    27	
    28	/** fish: inside single quotes only \\ and \' are escapes. */
    29	export function fishQuote(value, { tilde: expand = true } = {}) {
    30	  const s = String(value);
    31	  if (s === '') return "''";
    32	  const tilde = expand && s.match(/^~(\/|$)(.*)$/s);
    33	  if (tilde) return '~' + tilde[1] + (tilde[2] ? fishQuote(tilde[2]) : '');
    34	  if (/^[A-Za-z0-9_\/.,:@+-][A-Za-z0-9_\/.,:@+=-]*$/.test(s)) return s;
    35	  return "'" + s.replace(/[\\']/g, '\\$&') + "'";
    36	}
    37	
    38	// PowerShell treats the typographic quotes as quote characters too (about_Quoting_Rules):
    39	// single: ' ‘ ’ ‚ ‛   double: " “ ” „
    40	const PS_SQ = /['\u2018\u2019\u201A\u201B]/g;
    41	const PS_DQ_SPECIAL = /[`$"\u201C\u201D\u201E]/g;
    42	
    43	/**
    44	 * PowerShell: always a single-quoted literal (each single-quote character doubled), so the value is a
    45	 * string both as a command argument and inside an expression (.Replace('a', 'b'), -match 'x').
    46	 * ~ becomes $HOME in a double-quoted string.
    47	 */
    48	export function psQuote(value, { tilde: expand = true } = {}) {
    49	  const s = String(value);
    50	  const tilde = expand && s.match(/^~(?:[/\\](.*))?$/s);
    51	  if (tilde) {
    52	    if (!tilde[1]) return '$HOME';
    53	    return '"$HOME/' + tilde[1].replace(PS_DQ_SPECIAL, '`$&') + '"';
    54	  }
    55	  return "'" + s.replace(PS_SQ, '$&$&') + "'";
    56	}
    57	
    58	export class UnquotableError extends Error {}
    59	/** A cmd.exe value starting with `/`: refused only where it stands alone as an argument (see cmdTemplate). */
    60	export class SwitchValueError extends UnquotableError {}
    61	
    62	/**
    63	 * cmd.exe (best effort): double quotes, ~ -> %USERPROFILE%. cmd expands %VAR% (and !VAR! with delayed
    64	 * expansion) even inside double quotes and has no escape for `"` inside them, so values containing
    65	 * % ! " or control characters are refused (the intent is reported as a gap for cmd).
    66	 */
    67	export function cmdQuote(value, { tilde: expand = true, attached = false } = {}) {
    68	  let s = String(value);
    69	  const home = expand && /^~(?=[/\\]|$)/.test(s);
    70	  if (home) s = '%USERPROFILE%' + s.slice(1);
    71	  const body = home ? s.slice('%USERPROFILE%'.length) : s;
    72	  if (/[%!"\r\n\0]/.test(body)) throw new UnquotableError(`value ${JSON.stringify(String(value))} cannot be quoted safely for cmd.exe`);
    73	  // cmd built-ins read /x as a switch even when quoted ("delete directory /q" -> rmdir /s /q); a value
    74	  // glued to a switch (findstr /c:{pattern}) is not an argument of its own and is fine
    75	  if (/^\//.test(s) && !attached) throw new SwitchValueError(`value ${JSON.stringify(String(value))} starts with / and would be read as a cmd.exe switch`);
    76	  // Windows paths: / -> \ (an unquoted foo/q could be read as foo /q by built-ins); other values that
    77	  // contain / are double-quoted
    78	  if (expand || /^[A-Za-z]:|%USERPROFILE%/.test(s)) s = s.replace(/\//g, '\\');
    79	  if (/^[A-Za-z0-9_\\.:@+=%-]+$/.test(s)) return s;
    80	  return '"' + s + '"';
    81	}
    82	
    83	export const QUOTE = { bash: shQuote, zsh: shQuote, sh: shQuote, fish: fishQuote, powershell: psQuote, cmd: cmdQuote };
    84	
    85	function posixTemplate(intent, env) {
    86	  const v = VARIANTS[intent.id] || {};
    87	  if (env.shell === 'zsh' && v.zsh) return { tpl: v.zsh, variant: 'zsh' };
    88	  if (env.os === 'darwin') {
    89	    if (env.coreutils === 'gnu' && v.gnuMac) return { tpl: v.gnuMac, variant: 'gnuMac' };
    90	    if (v.bsd) return { tpl: v.bsd, variant: 'bsd' };
    91	    if (intent.darwin) return { tpl: intent.darwin, variant: 'darwin' };
    92	    return { tpl: intent.template, variant: 'posix' };
    93	  }
    94	  if (env.coreutils === 'busybox' && v.busybox) return { tpl: v.busybox, variant: 'busybox' };
    95	  return { tpl: intent.template, variant: 'posix' };
    96	}
    97	
    98	const CMD_HOLD = /\uE000(\d+)\uE001/g;
    99	const cmdTemplates = new WeakMap();
   100	/**
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
{
  "query": "list files",
  "shell": "bash",
  "os": "linux",
  "coreutils": "gnu",
  "threshold": 0.375,
  "context": {
    "used": false
  },
  "confidence": 0.9605,
  "tool": "ls",
  "tools": [
    {
      "tool": "ls",
      "p": 0.9605
    },
    {
      "tool": "find",
      "p": 0.0143
    },
    {
      "tool": "tar",
      "p": 0.0119
    }
  ],
  "candidates": [
    {
      "intent": "list_files",
      "tool": "ls",
      "p": 0.9605,
      "description": "List files in a directory with details"
    },
    {
      "intent": "list_archive",
      "tool": "tar",
      "p": 0.0119,
      "description": "List contents of an archive (tar/zip)"
    },
    {
      "intent": "empty_files",
      "tool": "find",
      "p": 0.0095,
      "description": "Find empty files"
    }
  ],
  "understood": true,
  "method": "catalog",
  "intent": "list_files",
  "description": "List files in a directory with details",
  "baseRisk": "safe",
  "slots": {},
  "notes": null,
  "variant": "posix",
  "command": "ls -lah .",
  "risk": "safe",
  "warnings": [],
  "critical": false,
  "missing": [],
  "slotSources": {},
  "spans": []
}

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const q of ['npm install @types/node','install @types/node with npm','pip install requests==2.32.3','npm install react@19','npm run --if-present','run npm script \"--if-present\"','merge pull request 123','merge PR #123','show lines 5 to 9 in /tmp/log.txt']) {const r=suggest(q,{env,compose:'off'});console.log(JSON.stringify({q,intent:r.intent,command:r.command,slots:r.slots,missing:r.missing}));}
JS" in /workspace/tellsh
 succeeded in 114ms:
{"q":"npm install @types/node","intent":"npm_install","command":"npm install","slots":{},"missing":[]}
{"q":"install @types/node with npm","intent":"npm_install","command":"npm install npm","slots":{"pkg":"npm"},"missing":[]}
{"q":"pip install requests==2.32.3","intent":"pip_install","command":"python3 -m pip install <PKG>","slots":{},"missing":["pkg"]}
{"q":"npm install react@19","intent":"npm_install","command":"npm install react@19","slots":{"pkg":"react@19"},"missing":[]}
{"q":"npm run --if-present","intent":"npm_run_script","command":"npm run --if-present","slots":{"script":"--if-present"},"missing":[]}
{"q":"run npm script \"--if-present\"","intent":"npm_run_script","command":"npm run --if-present","slots":{"script":"--if-present"},"missing":[]}
{"q":"merge pull request 123","intent":"gh_pr_merge","command":"gh pr merge 123","slots":{"num":123},"missing":[]}
{"q":"merge PR #123","intent":"gh_pr_merge","command":"gh pr merge 123","slots":{"num":123},"missing":[]}
{"q":"show lines 5 to 9 in /tmp/log.txt","intent":"print_line_range","command":"sed -n '5,9p' /tmp/log.txt","slots":{"file":"/tmp/log.txt","start":5,"end":9},"missing":[]}

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {Encoder} from './src/rerank/encoder.js';
const e=await Encoder.load({threads:1});
console.log(e?{runtime:e.runtime,dir:e.dir}:'unavailable');
if(e){const {suggestHybrid}=await import('./src/rerank/hybrid.js'); const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const q of ['show big files','show container information','list recently changed files','show branches that are merged','show disk stats']) {const b=await e.infer(q,env); const a=await suggestHybrid(q,{env,encoder:e,compose:'off'}), c=await suggestHybrid(q,{env,encoder:e,compose:'off',top:5}); console.log(JSON.stringify({q,intent3:a.intent,intent5:c.intent,encoder:b.topIntent,deferred:a.hybrid.deferred}));}}
JS" in /workspace/tellsh
 succeeded in 460ms:
[0;93m2026-10-10 19:20:58.088405996 [W:onnxruntime:onnxruntime-node, telemetry.cc:800 operator()] Failed to persist telemetry device ID; using an in-memory identifier[m
{
  runtime: 'onnxruntime-node',
  dir: '/workspace/tellsh/hybrid/models/enc'
}
{"q":"show big files","intent3":"largest_files","intent5":"largest_files","encoder":"largest_files","deferred":true}
{"q":"show container information","intent3":"docker_stats","intent5":"docker_stats","encoder":"docker_stats","deferred":true}
{"q":"list recently changed files","intent3":"recent_files","intent5":"recent_files","encoder":"recent_files","deferred":true}
{"q":"show branches that are merged","intent3":"git_branches","intent5":"git_branches","encoder":"git_branches","deferred":false}
{"q":"show disk stats","intent3":"disk_free","intent5":"disk_free","encoder":"block_devices","deferred":true}

codex
I’ve confirmed two more issues: the current-call filter can discard a different previous `tellsh` request and expose an older history line, and hybrid training augmentation reintroduces held-out examples. I reproduced the training leakage with output writes redirected to memory.

I’m now checking whether the hybrid candidate count and new package/script slots behave as documented.
exec
/bin/bash -lc "node --input-type=module <<'JS'
import {readFileSync,readdirSync} from 'node:fs';
import {Encoder} from './src/rerank/encoder.js';
import {suggestHybrid} from './src/rerank/hybrid.js';
import {cascade} from './src/cascade.js';
import {envFeatures} from './src/env.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'}, e=await Encoder.load({threads:1});
let n=0,found=0;
const rows=readdirSync('data/eval').filter(f=>f.endsWith('.jsonl')).flatMap(f=>readFileSync('data/eval/'+f,'utf8').trim().split('\\n').map(JSON.parse));
for(const row of rows){const c=cascade(row.text,{extras:envFeatures(env),top:5}); if(c.confidence>=.9||"'!c.top.slice(3).some(t=>t.intent===row.intent)) continue;
 const a=await suggestHybrid(row.text,{env,encoder:e,compose:'"'off'});const b=await suggestHybrid(row.text,{env,encoder:e,compose:'off',top:5});n++;
 if(a.intent"'!==b.intent){console.log(JSON.stringify({q:row.text,gold:row.intent,defaultCommand:a.command,top5Command:b.command,rank:c.top.findIndex(t=>t.intent===row.intent)+1}));if(++found>=4)break;}}
console.log({checked:n,found});
JS' in /workspace/tellsh
 succeeded in 711ms:
[0;93m2026-10-10 19:21:15.985091030 [W:onnxruntime:onnxruntime-node, telemetry.cc:800 operator()] Failed to persist telemetry device ID; using an in-memory identifier[m
{"q":"co jest w .env?","gold":"cat_file","defaultCommand":"ls -lah .env","top5Command":"cat <FILE>","rank":4}
{"q":"clnoe https://github.com/sharkdp/bat","gold":"git_clone","defaultCommand":"curl -fLO https://github.com/sharkdp/bat","top5Command":"git clone https://github.com/sharkdp/bat","rank":4}
{ checked: 7, found: 2 }

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const q of ['run npm script \"--prefix=/tmp/other\"','run npm script \"--script-shell=/tmp/runme\"','npm run \"--help\"','npm install \"@types/node\"','install package \"@types/node\" with npm']){const r=suggest(q,{env}); console.log(JSON.stringify({q,intent:r.intent,command:r.command,missing:r.missing,risk:r.risk}));}
JS" in /workspace/tellsh
 succeeded in 119ms:
{"q":"run npm script \"--prefix=/tmp/other\"","intent":"npm_run_script","command":"npm run --prefix=/tmp/other","missing":[],"risk":"medium"}
{"q":"run npm script \"--script-shell=/tmp/runme\"","intent":"npm_run_script","command":"npm run --script-shell=/tmp/runme","missing":[],"risk":"medium"}
{"q":"npm run \"--help\"","intent":"npm_run_script","command":"npm run --help","missing":[],"risk":"medium"}
{"q":"npm install \"@types/node\"","intent":"npm_install","command":"npm install","missing":[],"risk":"medium"}
{"q":"install package \"@types/node\" with npm","intent":"npm_install","command":"npm install","missing":[],"risk":"medium"}

exec
/bin/bash -lc "git diff --check 0d87457..HEAD -- src bin scripts; git status --short; nl -ba src/pipeline.js | sed -n '290,315p'; nl -ba scripts/hybrid/fetch_model.js | sed -n '25,45p'" in /workspace/tellsh
 succeeded in 0ms:
?? review/.h1done
?? review/r7-claude.md
?? review/r7-codex.md
   290	  const sb = ctx && !ref ? sameBut(query, ctx) : null;
   291	  // a request about the entries of the referenced directory does not use the history at all: its intent is read
   292	  // without the history features (they favour `delete_dir` for "delete log files in this folder")
   293	  const c0 = cascade(query, { model, extras: ref?.contents ? envFeatures(env) : extras, top, restrictTool: sb ? FAMILY_OF[sb.lastIntent] : undefined });
   294	  // rerank: optional hybrid hook (src/rerank/hybrid.js); history rules keep the linear cascade's decision
   295	  const c = opts.rerank && !sb && !ref ? opts.rerank(c0, { thr }) : c0;
   296	  const candidates = c.top.map((t) => ({ intent: t.intent, tool: t.tool, p: +t.p.toFixed(4), description: BY_ID[t.intent]?.description }));
   297	  const tools = c.tools.map((t) => ({ tool: t.tool, p: +t.p.toFixed(4) }));
   298	  let intent = c.intent;
   299	  let confidence = c.confidence;
   300	  let method = 'catalog';
   301	  if ((ref?.rule === 'pronoun' || ref?.rule === 'refused') && ref.intent) { intent = ref.intent; method = 'history-rule'; confidence = Math.max(confidence, thr); }
   302	  if (sb) { method = 'history-rule'; confidence = Math.max(confidence, thr); context.rule = 'same-but'; context.note = `modifies previous ${sb.lastIntent}`; }
   303	  // "same but force" after `rm -r old; ls newdir`: the command it would modify is not the previous one
   304	  if (sb?.skipped && (BY_ID[sb.lastIntent].risk !== 'safe' || BY_ID[intent].risk !== 'safe')) {
   305	    context.rule = 'refused';
   306	    context.note = `the newest command that tellsh can modify (${sb.lastIntent}) is not the previous command; not guessing`;
   307	    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
   308	  }
   309	  const out = { ...base, confidence: +confidence.toFixed(4), tool: FAMILY_OF[intent] || c.tool, tools, candidates };
   310	
   311	  const tryCompose = (reason) => {
   312	    if (composeMode === 'off') return null;
   313	    // a place reference ("list files there", "tam") has no composer operand: never `find .` in its place
   314	    if (hasLocative(query) && composeMode !== 'force') return null;
   315	    // composer vocabulary and quoting are POSIX-only (fish treats \\ and \' as escapes inside single quotes)
    25	if (!from) { console.error('usage: fetch_model.js --from <dir|https-url> | --manifest <dir>'); process.exit(2); }
    26	const dest = opt('to') || join(homedir(), '.cache', 'tellsh', BUNDLE);
    27	const get = async (name) => {
    28	  if (/^https:\/\//.test(from)) {
    29	    const r = await fetch(`${from.replace(/\/$/, '')}/${name}`);
    30	    if (!r.ok) throw new Error(`${name}: HTTP ${r.status}`);
    31	    return Buffer.from(await r.arrayBuffer());
    32	  }
    33	  return readFileSync(join(from, name));
    34	};
    35	const manifest = JSON.parse((await get('manifest.json')).toString('utf8'));
    36	mkdirSync(dest, { recursive: true });
    37	for (const [f, want] of Object.entries(manifest.files)) {
    38	  const buf = await get(f);
    39	  if (sha(buf) !== want) throw new Error(`${f}: sha256 mismatch`);
    40	  writeFileSync(join(dest, f + '.part'), buf);
    41	  renameSync(join(dest, f + '.part'), join(dest, f));
    42	}
    43	writeFileSync(join(dest, 'manifest.json'), JSON.stringify(manifest, null, 1));
    44	console.log(`installed ${BUNDLE} -> ${dest} (${readdirSync(dest).join(', ')})`);

exec
/bin/bash -lc 'node test/pipeline.test.js' in /workspace/tellsh
 exited 1 in 256ms:
TAP version 13
# Subtest: stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
ok 1 - stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
  ---
  duration_ms: 15.709738
  ...
# Subtest: PowerShell vocabulary maps to the same tool family
ok 2 - PowerShell vocabulary maps to the same tool family
  ---
  duration_ms: 2.958167
  ...
# Subtest: tagger: tool-conditioned BIO spans, only tags valid for the tool
ok 3 - tagger: tool-conditioned BIO spans, only tags valid for the tool
  ---
  duration_ms: 17.429838
  ...
# Subtest: slot merge: tagger primary, regex fills misses and replaces invalid values
ok 4 - slot merge: tagger primary, regex fills misses and replaces invalid values
  ---
  duration_ms: 8.609572
  ...
# Subtest: end-to-end bash + PowerShell + BSD
ok 5 - end-to-end bash + PowerShell + BSD
  ---
  duration_ms: 44.040846
  ...
# Subtest: history: pronouns, "same for", container/service/pid references (EN + PL)
ok 6 - history: pronouns, "same for", container/service/pid references (EN + PL)
  ---
  duration_ms: 59.444251
  ...
# Subtest: history is optional: without it a pronoun request gets a hint, never a guessed value
ok 7 - history is optional: without it a pronoun request gets a hint, never a guessed value
  ---
  duration_ms: 1.278845
  ...
# Subtest: history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
ok 8 - history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
  ---
  duration_ms: 0.660163
  ...
# Subtest: loadHistory reads only the tail of HISTFILE and returns the last n commands
not ok 9 - loadHistory reads only the tail of HISTFILE and returns the last n commands
  ---
  duration_ms: 1.077421
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
  duration_ms: 0.656506
  ...
# Subtest: second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
ok 11 - second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
  ---
  duration_ms: 10.669251
  ...
# Subtest: out-of-domain requests are rejected (also by the composer)
ok 12 - out-of-domain requests are rejected (also by the composer)
  ---
  duration_ms: 3.696686
  ...
# Subtest: env detection and overrides
ok 13 - env detection and overrides
  ---
  duration_ms: 0.79911
  ...
1..13
# tests 13
# suites 0
# pass 12
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 185.232325

exec
/bin/bash -lc 'node --test test/compose.test.js test/danger.test.js test/devtools.test.js test/hybrid.test.js test/parity.test.js test/regressions3-history.test.js test/regressions3-render.test.js test/regressions3.test.js test/regressions5.test.js test/regressions6.test.js test/regressions7.test.js test/slots.test.js' in /workspace/tellsh
 succeeded in 1049ms:
TAP version 13
# Subtest: /workspace/tellsh/test/compose.test.js
ok 1 - /workspace/tellsh/test/compose.test.js
  ---
  duration_ms: 496.839809
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 2 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 263.875687
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 3 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 264.34161
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 4 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 289.267698
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 5 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 223.82702
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 6 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 351.253359
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 7 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 380.401251
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 8 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 328.892142
  ...
# Subtest: /workspace/tellsh/test/regressions5.test.js
ok 9 - /workspace/tellsh/test/regressions5.test.js
  ---
  duration_ms: 658.271167
  ...
# Subtest: /workspace/tellsh/test/regressions6.test.js
ok 10 - /workspace/tellsh/test/regressions6.test.js
  ---
  duration_ms: 763.106613
  ...
# Subtest: /workspace/tellsh/test/regressions7.test.js
ok 11 - /workspace/tellsh/test/regressions7.test.js
  ---
  duration_ms: 479.458965
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 12 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 241.88133
  ...
1..12
# tests 12
# suites 0
# pass 12
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 1043.31091

exec
/bin/bash -lc "nl -ba src/pipeline.js | sed -n '76,99p'; nl -ba src/pipeline.js | sed -n '515,540p'; rg -n 'koniec pliku /var/log/syslog|pokaz caly plik requirements.txt|kill all node processes' data/eval data/blind data/hybrid/blind test/slot-cases.js; nl -ba src/rerank/hybrid.js | sed -n '29,42p'" in /workspace/tellsh
 succeeded in 0ms:
    76	const VALID_SLOT = {
    77	  // a bare function word ("on", "the", "w") is a tagging error, never a file or directory to act on
    78	  path: (v) => typeof v === 'string' && v.length < 256 && !/[\n\0\u0001]/.test(v) && /[\w~./]/.test(v) && !FUNCTION_WORD.test(v),
    79	  name: WORDISH, service: WORDISH, container: WORDISH, pkg: WORDISH, cmd: WORDISH,
    80	  branch: (v) => /^(?!-)[\w./-]{1,100}$/.test(v), user: (v) => /^[a-z_][\w.-]{0,31}$/i.test(v),
    81	  glob: (v) => /^\*\.[\w]{1,8}$/.test(v),
    82	  url: (v) => v.length < 2048 && (/^(?:https?|ftp|ftps|ssh|git|file):\/\/[^\s/?#]*[^\s]*$/i.test(v) || /^(?!-)[\w.-]+@[\w.-]+:[^\s]+$/.test(v)),
    83	  host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
    84	  pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
    85	  old: (v) => v.length > 0 && v.length < 300 && !/[\n\r\0]/.test(v), new: (v) => v.length < 300 && !/[\n\r\0]/.test(v),
    86	};
    87	const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
    88	for (const k of PATH_SLOT_NAMES) if (k !== 'path') VALID_SLOT[k] = VALID_SLOT.path;
    89	export function validSlot(k, v) {
    90	  if (v == null || v === '') return false;
    91	  if (isAmbiguous(v)) return false;
    92	  if (RAW_OK[k]) return RAW_OK[k](v);
    93	  if (VALID_SLOT[k]) return VALID_SLOT[k](String(v));
    94	  return String(v).length < 300 && !/\0/.test(String(v));
    95	}
    96	/** Values recovered from history go through the same validation as classifier/regex values. */
    97	const validHistorySlots = (slots) => Object.fromEntries(Object.entries(slots || {}).filter(([k, v]) => ['namepat', 'sedexpr'].includes(k) || validSlot(k, v)));
    98	/** History slots that failed validation (too long, a newline, ...): withheld as placeholders, never the catalog default. */
    99	const invalidHistorySlots = (slots) => Object.keys(slots || {}).filter((k) => !['namepat', 'sedexpr'].includes(k) && slots[k] != null && !validSlot(k, slots[k]));
   515	  //   same tool: >= 1 triggered flag not in the catalog command; another stage-1 tool: >= 2 triggered flags
   516	  if (method === 'catalog' && composeMode !== 'off' && b.command && !['powershell', 'cmd', 'fish'].includes(env.shell)) {
   517	    const fam = FAMILY_OF[intent];
   518	    const ci = composeInput(query, model, fam);
   519	    const opt = { patternOf: ci.pattern, nameOf: ci.nameOf };
   520	    const have = flagTokens(b.command);
   521	    const expl = new Set(explained()[intent] || []);
   522	    const unexplained = (cmp) => cmp.triggered.filter((f) => !expl.has((cmp.sub ? cmp.sub + ' ' : '') + f));
   523	    let comp = compose(query, [{ tool: fam, p: 1 }], ci.ex, opt);
   524	    if (blocksAmbiguous(comp, ci.ambiguousPaths)) comp = null;
   525	    // same tool: the composed command must keep the catalog command's head (+ git/docker subcommand)
   526	    const sameHead = comp && !comp.invalid && headOf(comp.command) === headOf(b.command);
   527	    let extra = sameHead ? unexplained(comp).filter((f) => [...flagTokens(f)].some((x) => !have.has(x))) : [];
   528	    if (!extra.length) {
   529	      const others = c.tools.filter((t) => t.tool !== NONE && t.p >= 0.05);
   530	      let alt = compose(query, others.length ? others : [{ tool: fam, p: 1 }], ci.ex, opt);
   531	      if (blocksAmbiguous(alt, ci.ambiguousPaths)) alt = null;
   532	      const ux = alt && !alt.invalid && headOf(alt.command) !== headOf(b.command) ? unexplained(alt) : [];
   533	      if (ux.length >= 2) { comp = alt; extra = ux; }
   534	    }
   535	    if (comp && !comp.invalid && comp.command !== b.command) {
   536	      if (extra.length >= 1 || composeMode === 'force') {
   537	        return { ...res, method: 'composed', experimental: true, reason: `request asks for ${extra.join(' ')} not in the catalog command`,
   538	          catalogCommand: b.command, description: `composed ${comp.tool}${comp.sub ? ' ' + comp.sub : ''} command (experimental)`,
   539	          command: comp.command, risk: comp.risk, baseRisk: 'medium', warnings: comp.warnings, critical: comp.critical, missing: [],
   540	          composed: { tool: comp.tool, sub: comp.sub, flags: comp.flags, validation: comp.validation } };
data/hybrid/blind/blind_en.jsonl:148:{"text": "kill all node processes", "intent": "kill_by_name", "lang": "en", "shell": "zsh", "os": "darwin", "spans": [["NAME", "node"]]}
data/eval/e00.jsonl:474:{"text": "koniec pliku /var/log/syslog", "intent": "tail_file", "lang": "pl"}
data/eval/e00.jsonl:511:{"text": "pokaz caly plik requirements.txt", "intent": "cat_file", "lang": "pl"}
data/eval/e01.jsonl:241:{"text": "kill all node processes", "intent": "kill_by_name", "lang": "en"}
    29	 * k = 0 means "all intents pX knows" (B alone). Returns a cascade-shaped object; `confidence` is pushed above/below
    30	 * the pipeline's accept threshold according to the policy's own accept rule.
    31	 */
    32	export function rerank(c, pX, P, { thr, pNone = 0 } = {}) {
    33	  if (c.confidence >= P.tau) return c;
    34	  // keepNone: the cascade's stage 1 says "not a shell request" -> keep its rejection (OOD safety)
    35	  if (P.keepNone && c.topTool === NONE && c.confidence < thr) return c;
    36	  // safe (rescue: false): only re-rank requests A answers anyway; A's rejections stay rejections
    37	  if (P.rescue === false && c.confidence < thr) return c;
    38	  const pa = Object.fromEntries(c.top.map((t) => [t.intent, t.p]));
    39	  const cands = P.k > 0 ? c.top.slice(0, P.k).map((t) => t.intent) : Object.keys(pX);
    40	  let best = null;
    41	  let bestS = -Infinity;
    42	  for (const i of cands) {

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
const payload=Buffer.from('review-only payload');
const manifest={files:{'../../../.bashrc':createHash('sha256').update(payload).digest('hex')}};
let src=readFileSync('scripts/hybrid/fetch_model.js','utf8');
src=src.replace(\"import { readFileSync, writeFileSync, mkdirSync, readdirSync, renameSync } from 'node:fs';\","'`const readFileSync = () => {}; const writeFileSync = (p) => console.log('"'would-write', p); const mkdirSync = () => {}; const readdirSync = () => []; const renameSync = (a,b) => console.log('would-rename', a, b);"'`);
src=src.replace("const argv = process.argv.slice(2);", "const argv = ['"'--from','https://example.invalid/model','--to','/home/example/.cache/tellsh/enc-v2'];\");
src=src.replace(\"const manifest = JSON.parse((await get('manifest.json')).toString('utf8'));\","'`const manifest = ${JSON.stringify(manifest)};`);
src=src.replace('"'const buf = await get(f);',"'`const buf = Buffer.from(${JSON.stringify(payload.toString())});`);
src=src.replace("'"'../../src/rerank/encoder.js'\",JSON.stringify(pathToFileURL(process.cwd()+'/src/rerank/encoder.js').href));
await import('data:text/javascript;base64,'+Buffer.from(src).toString('base64'));
JS" in /workspace/tellsh
 succeeded in 85ms:
would-write /home/example/.bashrc.part
would-rename /home/example/.bashrc.part /home/example/.bashrc
would-write /home/example/.cache/tellsh/enc-v2/manifest.json
installed enc-v2 -> /home/example/.cache/tellsh/enc-v2 ()

codex
1. **Major — [src/history.js:755](/workspace/tellsh/src/history.js:755): The current-call filter can expose history older than one line.** It drops a previous `tellsh` invocation when its text merely contains the current query. With history `['cat /tmp/important.txt', 'tellsh --dry-run "delete it from /tmp/scratch"']`, requesting `delete it` produces `rm /tmp/important.txt`. Require a positively identified current invocation; substring matching discards a distinct previous command.

2. **Major — [src/pipeline.js:518](/workspace/tellsh/src/pipeline.js:518): Composer fallback restores rejected targets.** With default options, ``change permissions recursively to 777 on `pwd` `` produces `chmod -R 777 -- pwd`, although the catalog correctly withholds that target. A quoted path containing a newline also bypasses validation here. Carry withheld slots into composition and apply the same validation before clearing `missing`.

3. **Major — [scripts/hybrid/fetch_model.js:37](/workspace/tellsh/scripts/hybrid/fetch_model.js:37): Downloaded manifests can overwrite files outside the bundle directory.** Manifest filenames are joined directly to the destination. An entry named `../../../.bashrc` escapes the default cache directory; its accompanying checksum does not prevent this because the same manifest supplies it. A mocked, read-only reproduction confirmed the overwrite paths. Restrict entries to the expected bundle filenames.

4. **Major — [scripts/hybrid/export_data.js:80](/workspace/tellsh/scripts/hybrid/export_data.js:80): Augmentation reintroduces held-out training examples.** Only original rows pass through the exclusion filter; typo and relexicalized copies bypass it. Running the current exporter entirely in memory produced 104 public training rows rejected by `exclusionIndex`, including exact held-out texts `kill all node processes` and `koniec pliku /var/log/syslog`. Filter every emitted row, then retrain and reevaluate affected models.

5. **Major — [src/rerank/hybrid.js:67](/workspace/tellsh/src/rerank/hybrid.js:67): Display count changes hybrid inference.** The pipeline supplies only the default three candidates despite the A+B policy requiring five. With the installed encoder, `clnoe https://github.com/sharkdp/bat` produces `curl -fLO …` by default but `git clone …` with `top: 5`. Request the policy’s candidate count internally and truncate only displayed results.

6. **Minor — [src/catalog.js:260](/workspace/tellsh/src/catalog.js:260): Scoped npm packages silently disappear.** `npm install @types/node` produces plain `npm install`, with no missing slots. Extraction recognizes the package, but `pkg` validation rejects `/`, and the optional operand vanishes. Accept scoped package syntax or explicitly withhold invalid requested operands.

Twelve selected test files passed. The full suite did not pass in this environment; observed failures included read-only temporary-file creation and subprocess-output failures. No files were changed.

VERDICT: REQUEST_CHANGES
tokens used
152,900
1. **Major — [src/history.js:755](/workspace/tellsh/src/history.js:755): The current-call filter can expose history older than one line.** It drops a previous `tellsh` invocation when its text merely contains the current query. With history `['cat /tmp/important.txt', 'tellsh --dry-run "delete it from /tmp/scratch"']`, requesting `delete it` produces `rm /tmp/important.txt`. Require a positively identified current invocation; substring matching discards a distinct previous command.

2. **Major — [src/pipeline.js:518](/workspace/tellsh/src/pipeline.js:518): Composer fallback restores rejected targets.** With default options, ``change permissions recursively to 777 on `pwd` `` produces `chmod -R 777 -- pwd`, although the catalog correctly withholds that target. A quoted path containing a newline also bypasses validation here. Carry withheld slots into composition and apply the same validation before clearing `missing`.

3. **Major — [scripts/hybrid/fetch_model.js:37](/workspace/tellsh/scripts/hybrid/fetch_model.js:37): Downloaded manifests can overwrite files outside the bundle directory.** Manifest filenames are joined directly to the destination. An entry named `../../../.bashrc` escapes the default cache directory; its accompanying checksum does not prevent this because the same manifest supplies it. A mocked, read-only reproduction confirmed the overwrite paths. Restrict entries to the expected bundle filenames.

4. **Major — [scripts/hybrid/export_data.js:80](/workspace/tellsh/scripts/hybrid/export_data.js:80): Augmentation reintroduces held-out training examples.** Only original rows pass through the exclusion filter; typo and relexicalized copies bypass it. Running the current exporter entirely in memory produced 104 public training rows rejected by `exclusionIndex`, including exact held-out texts `kill all node processes` and `koniec pliku /var/log/syslog`. Filter every emitted row, then retrain and reevaluate affected models.

5. **Major — [src/rerank/hybrid.js:67](/workspace/tellsh/src/rerank/hybrid.js:67): Display count changes hybrid inference.** The pipeline supplies only the default three candidates despite the A+B policy requiring five. With the installed encoder, `clnoe https://github.com/sharkdp/bat` produces `curl -fLO …` by default but `git clone …` with `top: 5`. Request the policy’s candidate count internally and truncate only displayed results.

6. **Minor — [src/catalog.js:260](/workspace/tellsh/src/catalog.js:260): Scoped npm packages silently disappear.** `npm install @types/node` produces plain `npm install`, with no missing slots. Extraction recognizes the package, but `pkg` validation rejects `/`, and the optional operand vanishes. Accept scoped package syntax or explicitly withhold invalid requested operands.

Twelve selected test files passed. The full suite did not pass in this environment; observed failures included read-only temporary-file creation and subprocess-output failures. No files were changed.

VERDICT: REQUEST_CHANGES
