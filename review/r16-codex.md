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
session id: 01a12992-a10f-7803-bbb5-6f7ba4a5b4e4
--------
user
Re-review of tellsh (git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD; runtime src/ bin/, training scripts). History refs are intentionally limited to 1 line back. Read-only. Findings with severity and file:line. End with exactly one line that is either VERDICT: APPROVE (no blocker/major) or VERDICT: REQUEST_CHANGES.
codex
I’ll review the diff and relevant runtime and training code, then report actionable findings with severity and file/line references.
exec
/bin/bash -lc "pwd; rg --files -g 'AGENTS.md' -g '"'!node_modules'"' -g '"'!vendor'"'; git status --short; git diff --stat 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD" in /workspace/tellsh
 succeeded in 0ms:
/workspace/tellsh
?? review/r16-claude.md
?? review/r16-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   500 +-
 HYBRID.md                                    |   610 ++
 README.md                                    |   167 +-
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
 src/fill.js                                  |   151 +-
 src/history.js                               |   951 ++-
 src/model.js                                 |    22 +-
 src/pipeline.js                              |   429 +-
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
 200 files changed, 179726 insertions(+), 801 deletions(-)

exec
/bin/bash -lc 'cat package.json; git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/cli.js src/pipeline.js src/rerank/hybrid.js src/rerank/encoder.js src/rerank/tokenizer.js bin/tellsh.js' in /workspace/tellsh
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
index c5430f7..1f54dc2 100644
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
@@ -32,17 +34,67 @@ const PRONOUN_VALUE = /^(it|its|that|this|them|those|one|again|back|there|here|t
 
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
+// slots naming the one thing a command acts on, other than a path (not free text: pattern, message, glob, ...)
+const OPERAND_SLOT_NAMES = new Set(['name', 'service', 'container', 'pkg', 'host', 'target', 'branch', 'user', 'script', 'url', 'pid']);
+for (const k of PATH_SLOT_NAMES) if (k !== 'path') VALID_SLOT[k] = VALID_SLOT.path;
 export function validSlot(k, v) {
   if (v == null || v === '') return false;
   if (isAmbiguous(v)) return false;
@@ -52,31 +104,108 @@ export function validSlot(k, v) {
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
@@ -90,22 +219,35 @@ function flagTokens(cmd) {
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
@@ -113,17 +255,26 @@ export function suggest(query, opts = {}) {
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
@@ -134,29 +285,68 @@ export function suggest(query, opts = {}) {
 
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
@@ -169,73 +359,232 @@ export function suggest(query, opts = {}) {
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
diff --git a/src/rerank/encoder.js b/src/rerank/encoder.js
new file mode 100644
index 0000000..5803dc0
--- /dev/null
+++ b/src/rerank/encoder.js
@@ -0,0 +1,152 @@
+// (B) Hybrid encoder runtime: pruned multilingual-e5 (int8 ONNX) -> tool / intent distributions + BIO slot spans.
+// Optional: onnxruntime is lazy-loaded (onnxruntime-node, else onnxruntime-web/WASM) and the model bundle is looked up
+// in $TELLSH_MODEL_DIR, ~/.cache/tellsh/enc-v2, the `tellsh-model-enc` package, or hybrid/models/enc (development).
+// Nothing here touches the network: the bundle has to be installed once (scripts/hybrid/fetch_model.js or npm).
+import { readFileSync, existsSync } from 'node:fs';
+import { join } from 'node:path';
+import { homedir } from 'node:os';
+import { fileURLToPath } from 'node:url';
+import { createRequire } from 'node:module';
+import { UnigramTokenizer } from './tokenizer.js';
+import { allowedTags } from '../tagger.js';
+
+const require = createRequire(import.meta.url);
+export const BUNDLE = 'enc-v2'; // v0.4 labels (173 intents); enc-v1 was the v0.3 bundle (149)
+
+export function findModelDir(explicit) {
+  const cands = [explicit, process.env.TELLSH_MODEL_DIR, join(homedir(), '.cache', 'tellsh', BUNDLE)];
+  try { cands.push(join(require.resolve('tellsh-model-enc/package.json'), '..')); } catch { /* not installed */ }
+  cands.push(fileURLToPath(new URL('../../hybrid/models/enc', import.meta.url)));
+  return cands.find((d) => d && existsSync(join(d, 'encoder.int8.onnx')) && existsSync(join(d, 'vocab.json'))) || null;
+}
+
+async function loadOrt(prefer) {
+  const order = prefer === 'web' ? ['onnxruntime-web', 'onnxruntime-node'] : ['onnxruntime-node', 'onnxruntime-web'];
+  for (const m of order) {
+    try { const ort = await import(m); return { ort: ort.default ?? ort, name: m }; } catch { /* try next */ }
+  }
+  return null;
+}
+
+const softmax = (a) => { const m = Math.max(...a); const e = a.map((v) => Math.exp(v - m)); const s = e.reduce((x, y) => x + y, 0); return e.map((v) => v / s); };
+
+export class Encoder {
+  static async load({ dir, ort: prefer, threads = 1 } = {}) {
+    const d = findModelDir(dir);
+    if (!d) return null;
+    const rt = await loadOrt(prefer);
+    if (!rt) return null;
+    const t0 = performance.now();
+    const v = JSON.parse(readFileSync(join(d, 'vocab.json'), 'utf8'));
+    const labels = JSON.parse(readFileSync(join(d, 'labels.json'), 'utf8'));
+    const tok = new UnigramTokenizer({ vocab: v.pieces.map((p, i) => [p, v.scores[i]]), unkId: v.unk });
+    if (rt.name === 'onnxruntime-web' && rt.ort.env?.wasm) rt.ort.env.wasm.numThreads = threads;
+    const opts = { executionProviders: [rt.name === 'onnxruntime-web' ? 'wasm' : 'cpu'], intraOpNumThreads: threads, interOpNumThreads: 1, graphOptimizationLevel: 'all' };
+    const model = rt.name === 'onnxruntime-web' ? readFileSync(join(d, 'encoder.int8.onnx')) : join(d, 'encoder.int8.onnx');
+    const session = await rt.ort.InferenceSession.create(model, opts);
+    const e = new Encoder(rt, session, tok, labels, d);
+    e.loadMs = performance.now() - t0;
+    return e;
+  }
+
+  constructor(rt, session, tok, labels, dir) {
+    Object.assign(this, { ort: rt.ort, runtime: rt.name, session, tok, labels, dir });
+    this.T = labels.tagLabels;
+    this.cache = new Map();
+  }
+
+  /** -> { tools: {tool: p}, intents: {intent: p}, topIntent, topTool, pNone, tagger(text, tool) -> {spans} } */
+  async infer(text, env = {}) {
+    const key = `${env.shell}|${env.os}|${text}`;
+    if (this.cache.has(key)) return this.cache.get(key);
+    const ctx = this.labels.context.replace('{shell}', env.shell || 'bash').replace('{os}', env.os || 'linux');
+    const enc = this.tok.encodePair(text, ctx, this.labels.maxLen);
+    const n = enc.ids.length;
+    const T = this.ort.Tensor;
+    const feeds = { input_ids: new T('int64', BigInt64Array.from(enc.ids, BigInt), [1, n]), attention_mask: new T('int64', new BigInt64Array(n).fill(1n), [1, n]) };
+    const out = await this.session.run(feeds);
+    const pt = softmax(Array.from(out.tool.data));
+    const pi = softmax(Array.from(out.intent.data));
+    const tools = Object.fromEntries(this.labels.tools.map((t, i) => [t, pt[i]]));
+    const intents = Object.fromEntries(this.labels.intents.map((t, i) => [t, pi[i]]));
+    const C = this.T.length;
+    const tagLogits = [];
+    for (let j = 0; j < enc.nA; j++) tagLogits.push(Array.from(out.tags.data.subarray((j + 1) * C, (j + 2) * C)));
+    const res = {
+      tools, intents,
+      topTool: this.labels.tools[pt.indexOf(Math.max(...pt))],
+      topIntent: this.labels.intents[pi.indexOf(Math.max(...pi))],
+      pNone: tools.__none__ ?? 0,
+      tagger: (t, tool) => ({ spans: decodeSpans(t, enc.tokens, tagLogits, this.T, tool) }),
+    };
+    if (this.cache.size > 256) this.cache.clear();
+    this.cache.set(key, res);
+    return res;
+  }
+}
+
+/** Constrained Viterbi over sub-word BIO logits (tags allowed for the tool; I-X only after B-X/I-X), then spans
+ *  widened to whole words (sub-word pieces of one word belong to one span). */
+export function decodeSpans(text, toks, logits, L, tool) {
+  const n = toks.length;
+  if (!n) return [];
+  const allowed = allowedTags(tool);
+  const ok = L.map((l) => l === 'O' || allowed.has(l.slice(2)));
+  const C = L.length;
+  const sc = logits.map((z) => {
+    let m = -Infinity;
+    for (let c = 0; c < C; c++) if (ok[c] && z[c] > m) m = z[c];
+    let s = 0;
+    for (let c = 0; c < C; c++) if (ok[c]) s += Math.exp(z[c] - m);
+    const lse = m + Math.log(s);
+    return z.map((v, c) => (ok[c] ? v - lse : -Infinity));
+  });
+  const follow = (p, c) => !L[c].startsWith('I-') || (p >= 0 && L[p] !== 'O' && L[p].slice(2) === L[c].slice(2));
+  const dp = sc.map(() => new Float64Array(C).fill(-Infinity));
+  const bp = sc.map(() => new Int16Array(C).fill(-1));
+  for (let c = 0; c < C; c++) if (follow(-1, c)) dp[0][c] = sc[0][c];
+  for (let i = 1; i < n; i++) {
+    for (let c = 0; c < C; c++) {
+      if (sc[i][c] === -Infinity) continue;
+      let best = -Infinity; let arg = -1;
+      for (let p = 0; p < C; p++) if (dp[i - 1][p] > best && follow(p, c)) { best = dp[i - 1][p]; arg = p; }
+      if (arg >= 0) { dp[i][c] = best + sc[i][c]; bp[i][c] = arg; }
+    }
+  }
+  let last = 0;
+  for (let c = 1; c < C; c++) if (dp[n - 1][c] > dp[n - 1][last]) last = c;
+  const path = new Array(n);
+  path[n - 1] = last;
+  for (let i = n - 1; i > 0; i--) path[i - 1] = Math.max(0, bp[i][path[i]]);
+  const spans = [];
+  let cur = null;
+  path.forEach((c, i) => {
+    const l = L[c];
+    const t = toks[i];
+    if (l === 'O') { cur = null; return; }
+    if (l.startsWith('B-') || !cur || cur.type !== l.slice(2)) { cur = { type: l.slice(2), start: t.start, end: t.end }; spans.push(cur); } else cur.end = t.end;
+  });
+  // widen to word boundaries, trim trailing punctuation, merge spans that now overlap
+  const out = [];
+  for (const s of spans) {
+    let a = s.start; let b = s.end;
+    while (a > 0 && !/\s/.test(text[a - 1])) a--;
+    while (b < text.length && !/\s/.test(text[b])) b++;
+    let w = text.slice(a, b);
+    const lead = w.match(/^["'„“`(]+/)?.[0].length || 0;
+    const trail = w.match(/["'”`),.;:!?]+$/)?.[0].length || 0;
+    const quoted = lead > 0 && /["'„“`]/.test(w[0]);
+    if (!quoted) { a += lead; b -= trail; } else {
+      // quoted value: the whole quoted string (may contain spaces)
+      const q = w[0] === '„' ? '”' : w[0];
+      const close = text.indexOf(q === '“' ? '”' : q, a + 1);
+      if (close > a) b = close + 1;
+    }
+    if (b <= a) continue;
+    const prev = out[out.length - 1];
+    if (prev && a < prev.end) { if (prev.type === s.type) prev.end = Math.max(prev.end, b); continue; }
+    out.push({ type: s.type, start: a, end: b, quoted });
+  }
+  for (const s of out) s.text = text.slice(s.start, s.end);
+  return out;
+}
diff --git a/src/rerank/hybrid.js b/src/rerank/hybrid.js
new file mode 100644
index 0000000..3d3731f
--- /dev/null
+++ b/src/rerank/hybrid.js
@@ -0,0 +1,112 @@
+// Hybrid policy: the linear cascade (A) answers when it is confident; otherwise a neural model re-ranks A's top-k.
+//
+//   A conf >= tau                      -> A (fast path, ~0.3 ms)
+//   A stage 1 says __none__ (keepNone)  -> keep A's rejection
+//   else  B (encoder) / C (tiny LM)    -> score_i = alpha*log pA_i + (1-alpha)*log pX_i over A's top-k candidates
+//                                         answer if pX(best) >= accept and pX(__none__) < none (B only), else reject
+//
+// suggestHybrid() wraps pipeline.suggest(): it runs the cheap pipeline first and only computes the neural model when
+// the cascade asks for help, then re-runs the pipeline with the re-ranked decision (history rules are never re-ranked).
+import { suggest } from '../pipeline.js';
+import { detectEnv } from '../env.js';
+import { FAMILY_OF, NONE } from '../tools.js';
+
+// calibrated on the training dev split (scripts/hybrid/eval_hybrid.js --calibrate); see HYBRID.md
+export const POLICY = {
+  // v0.4 (enc-v2 retrained without held-out augmented rows, recalibrated with an A_dev that excludes the dev split
+  // from every training source, OOD included); with the OOD-leaking A_dev A+B had tau 0.8, alpha 0.75; the first v0.4
+  // encoder had tau 0.9, alpha 0.5, none 0.3 (both); v0.3 had none: 0.5 and k: 5 for the safe variant
+  'A+B': { tau: 0.9, k: 5, alpha: 0.5, accept: 0, none: 0.5, keepNone: true, tagger: 'A' },
+  'A+B-safe': { tau: 0.9, k: 3, alpha: 0.5, accept: 0, none: 0.5, rescue: false, tagger: 'A' },
+  // A+C: C-ft rescored for the leak-free A_dev's candidates (before: tau 0.9)
+  'A+C': { tau: 0.8, k: 5, alpha: 0.75, accept: 0, keepNone: true },
+  'A+C-safe': { tau: 0.8, k: 5, alpha: 0.75, accept: 0, rescue: false },
+  B: { tau: Infinity, k: 0, alpha: 0, accept: 0, none: 0.3, keepNone: true, tagger: 'B' },
+  C: { tau: Infinity, k: 3, alpha: 0, accept: 0, keepNone: true },
+};
+
+const LOG = (p) => Math.log(Math.max(p, 1e-6));
+
+/**
+ * Re-rank a cascade result with model probabilities. pX: {intent: p} over (a superset of) the candidates;
+ * k = 0 means "all intents pX knows" (B alone). Returns a cascade-shaped object; `confidence` is pushed above/below
+ * the pipeline's accept threshold according to the policy's own accept rule.
+ */
+export function rerank(c, pX, P, { thr, pNone = 0 } = {}) {
+  if (c.confidence >= P.tau) return c;
+  // keepNone: the cascade's stage 1 says "not a shell request" -> keep its rejection (OOD safety)
+  if (P.keepNone && c.topTool === NONE && c.confidence < thr) return c;
+  // safe (rescue: false): only re-rank requests A answers anyway; A's rejections stay rejections
+  if (P.rescue === false && c.confidence < thr) return c;
+  const pa = Object.fromEntries(c.top.map((t) => [t.intent, t.p]));
+  const cands = P.k > 0 ? c.top.slice(0, P.k).map((t) => t.intent) : Object.keys(pX);
+  let best = null;
+  let bestS = -Infinity;
+  for (const i of cands) {
+    const s = P.alpha * LOG(pa[i] ?? 0) + (1 - P.alpha) * LOG(pX[i] ?? 0);
+    if (s > bestS) { bestS = s; best = i; }
+  }
+  if (!best) return c;
+  const px = pX[best] ?? 0;
+  const ok = px >= P.accept && pNone < (P.none ?? 1);
+  const conf = ok ? Math.max(thr, px) : Math.min(thr - 1e-6, px);
+  const tool = FAMILY_OF[best];
+  const top = [{ intent: best, tool, p: conf, pTool: pa[best] ?? 0, pIntent: px }, ...c.top.filter((t) => t.intent !== best)];
+  // an explicit model rejection (pNone >= none, or pX below accept) stays a rejection through the whole pipeline:
+  // topTool __none__ keeps the low-confidence composer from answering in its place
+  if (!ok) return { ...c, intent: best, tool, confidence: conf, top, reranked: true, topTool: NONE, rejected: true };
+  return { ...c, intent: best, tool, confidence: conf, top, reranked: true, topTool: tool };
+}
+
+/**
+ * opts: suggest() options + { system: 'A'|'B'|'C'|'A+B'|'A+C', encoder (src/rerank/encoder.js Encoder),
+ *        lm: async (text, env, candidateIntents) -> {intent: p}, policy }
+ * -> suggest() result + { hybrid: { system, deferred, model, ms } }
+ */
+export async function suggestHybrid(query, opts = {}) {
+  const system = opts.system || 'A+B';
+  const env = opts.env || detectEnv({ shell: opts.shell, os: opts.os });
+  const base = { ...opts, env };
+  if (system === 'A') return { ...suggest(query, base), hybrid: { system, deferred: false } };
+  const P = { ...POLICY[system], ...(opts.policy || {}) };
+  // the policy's k candidates are re-ranked whatever --top displays (k = 0: B alone, no cascade candidates needed)
+  base.rerankTop = P.k;
+  let seen = null;
+  const first = suggest(query, { ...base, rerank: (c) => { seen = c; return c; } });
+  if (!seen || seen.confidence >= P.tau) return { ...first, hybrid: { system, deferred: false } };
+  const t0 = performance.now();
+  let pX; let pNone = 0; let tagger;
+  if (/B/.test(system)) {
+    if (!opts.encoder) return { ...first, hybrid: { system, deferred: false, unavailable: 'encoder' } };
+    const b = await opts.encoder.infer(query, env);
+    pX = b.intents;
+    pNone = b.pNone;
+    if (P.tagger === 'B') tagger = b.tagger;
+  } else {
+    if (!opts.lm) return { ...first, hybrid: { system, deferred: false, unavailable: 'lm' } };
+    pX = await opts.lm(query, env, seen.top.slice(0, P.k).map((t) => t.intent));
+    if (!pX) return { ...first, hybrid: { system, deferred: true, unavailable: 'lm' } };
+  }
+  const ms = performance.now() - t0;
+  const res = suggest(query, { ...base, tagger, rerank: (c, { thr }) => rerank(c, pX, P, { thr, pNone }) });
+  return { ...res, hybrid: { system, deferred: true, ms, pNone } };
+}
+
+/** CLI entry: A+B with the encoder loaded lazily (only when the cascade defers); falls back to A when the optional
+ *  runtime or model bundle is missing (result.hybrid.unavailable says why). */
+let ENC = null;
+export async function suggestLazy(query, opts = {}) {
+  const encoder = { infer: async (t, env) => {
+    if (ENC === null) { const { Encoder } = await import('./encoder.js'); ENC = (await Encoder.load({ threads: 1 })) || false; }
+    if (!ENC) throw Object.assign(new Error('unavailable'), { unavailable: true });
+    return ENC.infer(t, env);
+  } };
+  try {
+    return await suggestHybrid(query, { ...opts, system: opts.system || 'A+B', encoder });
+  } catch (e) {
+    if (!e.unavailable) throw e;
+    return { ...suggest(query, opts), hybrid: { system: 'A', deferred: false, unavailable: 'encoder (install onnxruntime-node + tellsh-model-enc)' } };
+  }
+}
+
+export { NONE };
diff --git a/src/rerank/tokenizer.js b/src/rerank/tokenizer.js
new file mode 100644
index 0000000..c0e33a8
--- /dev/null
+++ b/src/rerank/tokenizer.js
@@ -0,0 +1,92 @@
+// SentencePiece-Unigram tokenizer (XLM-R style) for the hybrid encoder, no dependencies.
+// Reproduces HF `tokenizers` for the pruned multilingual-e5 vocabulary: NFKC normalisation, whitespace split,
+// '▁' prepended to every word, Viterbi over piece log-probabilities, unknown characters -> <unk> (consecutive
+// unknowns fused), offsets into the original string.
+const UNK_PENALTY = 10;
+
+export class UnigramTokenizer {
+  /** vocab: [[piece, score], ...] in id order; unkId; special ids */
+  constructor({ vocab, unkId = 3, bos = 0, eos = 2, pad = 1 }) {
+    this.pieces = new Map();
+    this.maxLen = 1;
+    let min = Infinity;
+    vocab.forEach(([p, s], i) => {
+      if (i <= 3) return; // specials are never produced by segmentation
+      this.pieces.set(p, [i, s]);
+      const n = [...p].length;
+      if (n > this.maxLen) this.maxLen = n;
+      if (s < min) min = s;
+    });
+    this.unkScore = min - UNK_PENALTY;
+    Object.assign(this, { unkId, bos, eos, pad, size: vocab.length });
+  }
+
+  /** segment one word ('▁' + word) -> [{id, start, end}] with offsets in code points of the piece string */
+  segment(word) {
+    const chars = [...word];
+    const n = chars.length;
+    const best = new Float64Array(n + 1).fill(-Infinity);
+    const from = new Int32Array(n + 1).fill(-1);
+    const tokId = new Int32Array(n + 1).fill(-1);
+    best[0] = 0;
+    for (let i = 0; i < n; i++) {
+      if (best[i] === -Infinity) continue;
+      let s = '';
+      let hit = false;
+      for (let j = i; j < Math.min(n, i + this.maxLen); j++) {
+        s += chars[j];
+        const e = this.pieces.get(s);
+        if (e) {
+          if (j === i) hit = true;
+          const v = best[i] + e[1];
+          if (v > best[j + 1]) { best[j + 1] = v; from[j + 1] = i; tokId[j + 1] = e[0]; }
+        }
+      }
+      if (!hit) { // single unknown character
+        const v = best[i] + this.unkScore;
+        if (v > best[i + 1]) { best[i + 1] = v; from[i + 1] = i; tokId[i + 1] = this.unkId; }
+      }
+    }
+    const out = [];
+    for (let k = n; k > 0; k = from[k]) out.push({ id: tokId[k], start: from[k], end: k });
+    out.reverse();
+    const fused = [];
+    for (const t of out) {
+      const last = fused[fused.length - 1];
+      if (last && last.id === this.unkId && t.id === this.unkId) last.end = t.end; else fused.push(t);
+    }
+    return fused;
+  }
+
+  /** -> [{id, start, end}] offsets are UTF-16 indices into `text` (the '▁' of a word maps to the word start) */
+  tokenize(text) {
+    const out = [];
+    const re = /\S+/gu;
+    let m;
+    while ((m = re.exec(text))) {
+      const raw = m[0];
+      const norm = raw.normalize('NFKC');
+      const same = norm === raw;
+      const cps = [...norm];
+      // code point index -> UTF-16 offset in raw (only exact when NFKC did not change the word)
+      const cu = [0];
+      for (const c of cps) cu.push(cu[cu.length - 1] + c.length);
+      for (const p of this.segment('▁' + norm.replace(/\s+/g, '▁'))) {
+        const s = Math.max(0, p.start - 1);
+        const e = Math.max(0, p.end - 1);
+        out.push({ id: p.id, start: m.index + (same ? cu[s] : 0), end: m.index + (same ? cu[e] : raw.length) });
+      }
+    }
+    return out;
+  }
+
+  /** XLM-R pair encoding: <s> A </s></s> B </s>; A truncated to fit maxLen. -> {ids, offsets (A only), nA} */
+  encodePair(a, b, maxLen = 64) {
+    const ta = this.tokenize(a);
+    const tb = this.tokenize(b);
+    const room = Math.max(1, maxLen - tb.length - 4);
+    const A = ta.slice(0, room);
+    const ids = [this.bos, ...A.map((t) => t.id), this.eos, this.eos, ...tb.map((t) => t.id), this.eos];
+    return { ids, tokens: A, nA: A.length };
+  }
+}

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
  pr: (v) => RAW_OK.pr(v),
  host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
  pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
  old: (v) => v.length > 0 && v.length < 300 && !/[\n\r\0]/.test(v), new: (v) => v.length < 300 && !/[\n\r\0]/.test(v),
};
const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
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
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- scripts/train.py scripts/gen_data.js scripts/lib/heldout.js scripts/lib/silver.js scripts/hybrid/train_encoder.py scripts/hybrid/train_lm_gpu.py scripts/hybrid/export_data.js' in /workspace/tellsh
exec
/bin/bash -lc 'cat review/fix15-log.md; cat test/regressions17.test.js; cat review/r15-claude.md; rg --files scripts src | sort' in /workspace/tellsh
 succeeded in 0ms:
All three Major findings from r15 are fixed and committed as `060ab50` on `master` (not pushed). All 341 tests pass, the eval numbers didn't change, and I reran the bench and updated its table.

**1. Stray numbers no longer pick the PR** (`src/fill.js`)
- I removed the fallback that used any number in the text as the PR.
- A number now counts only in `pr 45`, `pr #45`, `pr number 45`, `pr no. 7` or `#45`.
- All five of your cases now give `gh pr merge <PR>` with `pr` reported missing. `view pr for 3 days` gives `gh pr view <PR>`.
- A number after a word like "from" or "for" is now withheld (`pr from 2 days ago`), unless it comes after "branch".

**2. A PR that's named but can't be parsed is withheld, never a bare merge** (`src/fill.js`)
- `merge pr feature/x's`, `it's-fix`, `bob's`, `bob’s` (curly apostrophe) and `in repo v2` all give `gh pr merge <PR>`.
- When nothing is named (`merge pr`, `merge the pr`, `merge pr now`, `merge pr for review`), it still gives bare `gh pr merge`, as before.

**3. History replay keeps the placeholder it holds back** (`src/pipeline.js`)
- `same but merge` after `tellsh merge pr nightly` now gives `gh pr merge <PR>` with `missing:['pr']`.
- `same for foo/bar` after `npm install lodash` now gives `npm install <PKG>`.
- My first, broader version of this fix broke one case in the blind history eval: `push it` after `git commit` became `git push origin <BRANCH>` instead of `git push`. So the placeholder is now kept only when history held back a real value (unclear or invalid). It is not kept when the previous command has nothing "it" could mean. With that, the history eval matches its old results exactly.

**Cheap Minors, also done:**
- Clustered `systemd-run -tp WorkingDirectory=…` and `-tpWorkingDirectory=…` are now recognised.
- `PrivateIPC=`, `PrivateDevices=` and `ProtectHome=tmpfs` now make history paths ambiguous. `ProtectHome=read-only` still lets them resolve.
- `e.g.`, `w/o` and other abbreviations, a host like `on github.com`, and `for issue 45` are now withheld as `<PR>` instead of being used as the selector.

**Side effect to know about:** if a request names a PR and no selector parses, any digit anywhere in it now means `<PR>`. For example, `merge pr to main in python3 repo` is withheld. That errs on the safe side, but it may ask for a PR more often than strictly needed.

The new tests are in `test/regressions17.test.js` and cover bash, pwsh and cmd. `EVAL.md` has a Round 16 note and the `gh` paragraph in `README.md` now explains the number rule.

**Not addressed:**
- Codex's Minor about `scripts/real/prepare_real.js`: command grouping treats package names as subcommands, so `npm install lodash` and `npm install express` can land in different train/eval splits.
- The intent Minors that fix14 also left alone (`checkout pr 5`, `close the last 3 prs`, `merge prs 1 and 2`).
- `review/fix15-log.md` was already there, empty and untracked. I left it alone.
// Regression tests for round 16: the round-15 findings (review/r15-claude.md, review/r15-codex.md). A number elsewhere
// in the request is never the pull request to merge (only `pr 45`, `pr #45`, `pr number 45`, `#45`); a request that names
// a pull request the parser cannot read (`bob's`, `in repo v2`) is withheld as `<PR>`, never a bare `gh pr merge`; an
// optional operand withheld by history replay keeps its placeholder; clustered / root-changing systemd-run properties.
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

test('major: a number that is not next to "pr" is never the pull request', () => {
  for (const env of SHELLS) {
    for (const q of ['merge pr with 2 approvals', 'merge my pr from 2 days ago', 'merge the pr in 2 minutes', 'merge the 2 open prs',
      'merge pr with squash and delete 1 branch']) withheld(run(q, null, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
    for (const [q, cmd] of Object.entries({ 'merge pr 45': 'gh pr merge 45', 'merge pr #45': 'gh pr merge 45',
      'merge pr number 45': 'gh pr merge 45', 'merge #45': 'gh pr merge 45', 'merge pull request 45': 'gh pr merge 45',
      'merge pr no. 7': 'gh pr merge 7', 'merge pull request #12 now': 'gh pr merge 12', 'show checks for pr 12': 'gh pr checks 12' })) {
      const r = run(q, null, env);
      assert.equal(r.command, cmd, `${env.shell}: ${q}`);
      assert.deepEqual(r.missing, [], `${env.shell}: ${q}`);
    }
  }
  withheld(run('view pr for 3 days'), 'gh pr view <PR>', 'pr');
});

test('major: a named pull request that does not parse is withheld, never a bare merge', () => {
  for (const env of SHELLS) {
    for (const q of ["merge pr feature/x's", "merge pr it's-fix", "merge pr bob's", 'merge pr bob’s', 'merge pr in repo v2']) {
      withheld(run(q, null, env), 'gh pr merge <PR>', 'pr', `${env.shell}: ${q}`);
    }
  }
  // nothing named: the current branch's pull request, as before
  for (const q of ['merge pr', 'merge the pr', 'merge pr now', 'merge pr for review']) assert.equal(run(q).command, 'gh pr merge', q);
});

test('major: history replay keeps the placeholder of an optional operand it withholds', () => {
  for (const env of SHELLS) {
    const r = run('same but merge', ['tellsh merge pr nightly'], env);
    withheld(r, 'gh pr merge <PR>', 'pr', env.shell);
    assert.equal(r.understood, true);
  }
  withheld(run('same for foo/bar', ['npm install lodash']), 'npm install <PKG>', 'pkg');
  // a valid value still replays
  assert.equal(run('same but merge', ['tellsh merge pr 45']).command, 'gh pr merge 45');
  assert.equal(run('same for express', ['npm install lodash']).command, 'npm install express');
});

test('minor: abbreviations, hosts and issues are not pull request selectors', () => {
  for (const q of ['merge pr e.g. main', 'merge pr w/o checks', 'merge pr on github.com']) withheld(run(q), 'gh pr merge <PR>', 'pr', q);
  withheld(run('close pr for issue 45'), 'gh pr view <PR>', 'pr');
});

test('minor: clustered -p and more root-changing systemd-run properties keep history paths ambiguous', () => {
  for (const h of ['systemd-run -tp WorkingDirectory=/srv cat notes.txt', 'systemd-run -tpWorkingDirectory=/srv cat notes.txt',
    'systemd-run -p ProtectHome=tmpfs cat /home/u/a.txt', 'systemd-run -p PrivateDevices=yes cat /etc/example.conf',
    'systemd-run -p PrivateIPC=yes cat /etc/example.conf']) assert.equal(run('delete it', [h]).command, 'rm <FILE>', h);
  for (const [h, cmd] of Object.entries({ 'systemd-run -t cat notes.txt': 'rm notes.txt',
    'systemd-run -p ProtectHome=read-only cat /home/u/a.txt': 'rm /home/u/a.txt' })) assert.equal(run('delete it', [h]).command, cmd, h);
});
I'm requesting changes. The round-14 fixes work, but two `gh pr merge` paths in `src/fill.js` still merge the wrong pull request without asking. Both bugs were already there before round 14 (I confirmed this against `e42e051`) and both are inside the reviewed range.

All 336 tests pass. The round-14 targets behave as described: marked selectors are kept, quotes have to match, and `systemd-run`/`run0` `-p`/`--property` with `WorkingDirectory=` or the root-changing properties make history values ambiguous. I checked this read-only by calling `suggest()` directly.

## Major

**M1 — `src/fill.js:164-166`: any number in the request becomes the PR number for a merge.**
When `prSelector()` finds no selector, `v.pr` falls back to `ex.numbers.find(x > 0)`, which is any number anywhere in the text. That number then fills `<PR>` with nothing reported missing, so the user gets a merge of an unrelated PR:
- `merge pr with 2 approvals` → `gh pr merge 2`
- `merge my pr from 2 days ago` → `gh pr merge 2`
- `merge the pr in 2 minutes` → `gh pr merge 2`
- `merge the 2 open prs` → `gh pr merge 2`
- `merge pr with squash and delete 1 branch` → `gh pr merge 1`
- `view pr for 3 days` → `gh pr view 3` (harmless here, but the same mechanism)

Suggested fix: use the number only when it sits right next to "pr"/"pull request" (`pr 45`, `pr #45`, `pr number 45`, `#45`). Otherwise withhold it as `<PR>`.

**M2 — `src/fill.js:32` (`PR_SELECTOR`): a named selector containing an apostrophe is dropped, giving a bare `gh pr merge`.**
The unquoted branch of the pattern excludes `'`. So `feature/x's` neither matches as a selector nor reaches the "unclosed quote" branch, `prSelector` returns `null`, and the command comes out bare. That is the "never a bare `gh pr merge`" rule from the round-14 major and the comment at `fill.js:161-162`:
- `merge pr feature/x's` → `gh pr merge`
- `merge pr it's-fix` → `gh pr merge`
- `merge pr bob's` → `gh pr merge`
- `merge pr in repo v2` → `gh pr merge` (a describing word followed by a marked word is also dropped)

Suggested fix: when the text names a pull request but no selector can be parsed, return `'?'` so it shows as `<PR>`, instead of returning `null`.

## Minor

- **`src/history.js:637,649`:** clustered short options aren't recognised. `systemd-run -tp WorkingDirectory=/srv cat notes.txt` then "delete it" → `rm notes.txt`; it should be `rm <FILE>`.
- **`src/history.js:639`:** `PROP_ROOT` misses `PrivateIPC=`, `ProtectHome=tmpfs` and `PrivateDevices=`. For example, `systemd-run -p ProtectHome=tmpfs cat /home/u/a.txt` → `rm /home/u/a.txt`. These are rare.
- **`src/fill.js:32`:** an abbreviation is taken as the selector: `merge pr e.g. main` → `gh pr merge e.g`. `merge pr w/o checks` → `gh pr merge w/o`; this one fails safely because the branch doesn't exist.
- **`src/fill.js:32`:** a word after `on`/`for` is taken as the target: `merge pr on github.com` → `gh pr merge github.com`, and `close pr for issue 45` → `gh pr view issue`.
- **Intent, carried over and deliberately left alone in fix14:** `checkout pr 5` → `gh pr checks 5`; `close the last 3 prs` → `gh run view 3`; `merge prs 1 and 2` merges only 1.

VERDICT: REQUEST_CHANGES
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
scripts/lib/pwsh_parse.js
scripts/lib/silver.js
scripts/real/prepare_real.js
scripts/real/real_rows.js
scripts/real/report_v04.js
scripts/report.js
scripts/teacher.js
scripts/tldr_ingest.py
scripts/train.py
src/cascade.js
src/catalog.js
src/classifier.js
src/cli.js
src/compose.js
src/danger.js
src/env.js
src/features.js
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
    25	  // a pull request as gh selects it: number, URL or head branch
    26	  pr: (v) => /^\d{1,12}$|^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/pull\/\d{1,12}\/?$/.test(String(v)) || /^(?![-.])(?!.*\.\.)[\w./-]{1,100}$/.test(String(v)),
    27	};
    28	
    29	// "merge pull request feature/login", "view the pr for branch fix-1", "pr #45", 'merge pull request "feature/login"'
    30	// (a quoted value ends at its matching quote, `“”„` being one family: "bob's-fix" is one value; a quote with no matching
    31	// close, `'it''s'`, is m[7] and withheld)
    32	const PR_SELECTOR = /\b(?:pull[\s-]+requests?|pr|prs)\s+((?:(?:for|of|on|from|branch|number|no\.?|nr\.?)\s+)*)(?:(?:"([^"]*)"|'([^']*)'|`([^`]*)`|[„“”]([^„“”"]*)[“”])(?=[\s.,!?;:]|$)|(#?[^\s"'`„“”]+?)[.,!?]?(?=\s|$)|(["'`„“”]))/i;
    33	// a function or describing word after "pull request" is not a selector ("merge the pull request and …", "merge pr now",
    34	// "check pr status", "view pull request on github", "merge pr by bob", "merge pull request quickly", "view pr from yesterday",
    35	// "close pr for issue 45"); only checked for an unmarked word (`feature/apply`, `fix-reply`, `#12-only` are selectors);
    36	// another unmarked word, `nightly`, is withheld
    37	const PR_NOT_SELECTOR = /^(?:the|a|an|this|that|it|its|my|our|your|their|me|us|you|him|her|them|and|or|then|now|please|pls|into|to|with|without|in|at|by|is|was|which|again|request|requests|status|state|checks?|details?|info|summary|description|diff|changes|comments?|github|gh|web|browser|online|here|there|today|yesterday|tomorrow|earlier|later|review|fork|upstream|fast|asap|already|first|too|also|quickly|immediately|directly|safely|manually|automatically|finally|only|just|really|simply|properly|carefully|right|soon|instantly|issues?|tickets?|bugs?)$/i;
    38	// an unmarked word (no digit, '/', '-', '_', '.', '#') names a branch only after "branch", "for" or "from" ("merge pr from bob");
    39	// otherwise it is withheld (the `?` fails validation)
    40	const PR_MARKED = /[\d/_.#-]/;
    41	// an abbreviation ("merge pr e.g. main", "merge pr w/o checks") or a host ("merge pr on github.com") is not a branch
    42	const PR_ABBREV = /^(?:e\.g|i\.e|w\/o|w\/|etc|vs|cf|a\.k\.a|n\/a|b\/c)$/i;
    43	const PR_HOST = /^(?:[\w-]+\.)+(?:com|org|net|io|dev|app|co|me)$/i;
    44	// a number names the pull request only right after "pr" / "pull request" (`pr 45`, `pr #45`, `pr number 45`) or as `#45`
    45	const PR_NUMBER_LEAD = /^(?:(?:number|no\.?|nr\.?)\s+)*$/i;
    46	const PR_WORD = /\b(?:pull[\s-]+requests?|pr|prs)\b/i;
    47	/**
    48	 * The pull request the user names (quoted: kept as written, validation withholds an odd one), else null (`gh pr merge`
    49	 * acts on the current branch's pull request). A number elsewhere in the request ("merge pr with 2 approvals", "merge the
    50	 * 2 open prs") is never the pull request; a request that names something the parser cannot read (`bob's`, `in repo v2`)
    51	 * is withheld (`?`, shown as `<PR>`), never a bare `gh pr merge`.
    52	 */
    53	function prSelector(ex) {
    54	  if (ex.urls[0] != null) return ex.urls[0];
    55	  const text = String(ex.text);
    56	  const m = text.match(PR_SELECTOR);
    57	  if (m) {
    58	    const quoted = m[2] ?? m[3] ?? m[4] ?? m[5];
    59	    if (quoted != null) return quoted || '?'; // `""`: named but empty, withheld
    60	    if (m[7] != null) return '?'; // an unclosed / odd quote: withheld
    61	    const w = m[6];
    62	    const branch = /\bbranch\s+$/i.test(m[1]);
    63	    // "merge my pr from 2 days ago", "view pr for 3 days": a number after a connective is not the pull request
    64	    if (/^\d+$/.test(w)) return branch || PR_NUMBER_LEAD.test(m[1]) ? w : '?';
    65	    if (PR_ABBREV.test(w) || (PR_HOST.test(w) && !branch)) return '?';
    66	    if (PR_MARKED.test(w)) return w;
    67	    // "merge pr for branch status": after "branch" any word is the selector, a describing one is withheld
    68	    if (branch) return PR_NOT_SELECTOR.test(w) ? `?${w}` : w;
    69	    if (!PR_NOT_SELECTOR.test(w)) {
    70	      if (/\b(?:for|from)\s+$/i.test(m[1])) return w;
    71	      // "merge pr main": a bare word may be a branch or say something else: withheld (`gh pr merge <PR>`), never dropped
    72	      return `?${w}`;
    73	    }
    74	  }
    75	  const hash = text.match(/(?:^|\s)#(\d{1,12})(?=[\s.,!?;:]|$)/);
    76	  if (hash) return hash[1];
    77	  // 'merge the "feature/login" pull request': an explicitly quoted value is the target
    78	  if (ex.quoted.length) return ex.quoted[0];
    79	  // named but not readable: a number anywhere ("merge the 2 open prs", "merge pr in 2 minutes"), or a marked word or a
    80	  // quote after "pr" ("merge pr bob's", "merge pr feature/x's", "merge pr in repo v2"): withheld
    81	  const p = text.match(PR_WORD);
    82	  const after = p ? text.slice(p.index + p[0].length) : '';
    83	  if (ex.numbers?.length || /\d/.test(text) || /[/_#'"`„“”’]|\w[.-]\w/.test(after)) return '?';
    84	  return null;
    85	}
    86	const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
    87	const PLACEHOLDER = (name) => `<${name.toUpperCase()}>`;
    88	
    89	// sed needs regex-escaped search text and &,\,/ escaped replacement
    90	// (a newline would end the s command: written as \n, which never matches inside one line)
    91	const sedEscapeOld = (s) => s.replace(/[\\/.*^$[\]]/g, '\\$&').replace(/\n/g, '\\n');
    92	const sedEscapeNew = (s) => s.replace(/[\\/&]/g, '\\$&').replace(/\n/g, '\\n');
    93	
    94	/** Recompute derived slots after values were merged/overridden (tagger, history rules). */
    95	export function finalizeSlots(intent, v) {
    96	  if (v.ext != null && v.glob == null) v.glob = `*.${v.ext}`;
    97	  if (intent.id === 'find_by_name' && v.name) v.namepat = /[*?]/.test(v.name) || /\.\w+$/.test(v.name) ? v.name : `*${v.name}*`;
    98	  if (intent.id === 'replace_text' && v.old != null && v.new != null) v.sedexpr = `s/${sedEscapeOld(v.old)}/${sedEscapeNew(v.new)}/g`;
    99	  return v;
   100	}
   101	
   102	/** Resolve the values an intent can use from the generic extraction. */
   103	export function resolveSlots(intent, ex) {
   104	  const v = {};
   105	  const has = (k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
   106	  const textual = ['pattern', 'message', 'text', 'name', 'old', 'branch', 'service', 'container', 'pkg', 'cmd', 'user', 'script']
   107	    .some((k) => k in intent.slots) || ['base64_encode', 'base64_decode', 'replace_text', 'find_by_name'].includes(intent.id);
   108	  const paths = [...(textual ? ex.paths : ex.pathsWithQuoted)];
   109	  // "grep for ~/foo in src": the path-like word right after the search verb is the pattern, the other
   110	  // path is where to search (only when there is one: otherwise the single path is the search root)
   111	  let pathPattern = null;
   112	  if (has('pattern') && !ex.quoted.length && paths.length >= 2) {
   113	    const m = foldKeepLength(String(ex.text)).toLowerCase().match(/(?:^|\s)(?:grep|search|look|find|szukaj|wyszukaj|poszukaj|znajdz)\s+(?:for\s+|(?:the\s+)?(?:text|string|pattern|word)\s+)?(\S+)/);
   114	    const at = m ? m.index + m[0].length - m[1].length : -1;
   115	    const word = at >= 0 ? String(ex.text).slice(at, at + m[1].length) : null;
   116	    if (word != null && paths.includes(word)) { pathPattern = word; paths.splice(paths.indexOf(word), 1); }
   117	  }
   118	  // "on the disk" / "na (całym) dysku" is a search scope, never the object of a changing command
   119	  // ("usuń folder cache na dysku" is not `rm -r /`), and a folder the user names wins over it
   120	  if (ex.rootPhrase && paths.includes('/') && !/(^|\s)["']?\/["']?(?=[\s,.;:!?]|$)/.test(ex.text) &&
   121	      ((intent.risk !== 'safe' && !/^find \{path\}/.test(String(intent.template))) || (has('path') && pickDir(ex)))) {
   122	    paths.splice(paths.indexOf('/'), 1);
   123	  }
   124	
   125	  // archive-type paths (compress/extract)
   126	  const isArchive = (p) => /\.(tar\.gz|tgz|tar|zip|tar\.bz2|tar\.xz|gz)$/i.test(p) && !/^(tar\.gz|tar|tgz|zip|gz)$/i.test(p);
   127	  if (has('archive')) {
   128	    const a = paths.find(isArchive);
   129	    if (a) { v.archive = a; paths.splice(paths.indexOf(a), 1); }
   130	  }
   131	  if (has('src') || has('dst')) {
   132	    if (paths[0]) v.src = paths[0];
   133	    if (paths[1]) v.dst = paths[1];
   134	    else if (paths[0]) {
   135	      const d = pickDest(ex);
   136	      if (d && d !== paths[0]) v.dst = d;
   137	    }
   138	  }
   139	  if (has('file')) {
   140	    const f = paths.find((p) => /\.[A-Za-z0-9]+$/.test(p) || p.includes('/')) || paths[0];
   141	    if (f) v.file = f;
   142	    if (has('dest') && paths.length > 1) v.dest = paths.find((p) => p !== f);
   143	  }
   144	  if (has('path') && paths.length) {
   145	    v.path = paths[0];
   146	  } else if (has('path') && !['find_by_name', 'chown'].includes(intent.id)) {
   147	    const d = pickDir(ex);
   148	    if (d) v.path = d;
   149	  }
   150	  if (has('archive') && !v.archive) {
   151	    const base = (v.path || '.').replace(/\/+$/, '').split('/').pop();
   152	    const ext = intent.id === 'compress_zip' ? '.zip' : '.tar.gz';
   153	    v.archive = (!base || base === '.' || base === '..' || base === '~') ? `archive${ext}` : `${base}${ext}`;
   154	  }
   155	  if (ex.count != null) v.count = ex.count;
   156	  if (has('depth') && ex.count != null && ex.count <= 10) v.depth = ex.count;
   157	  if (ex.size) v.size = ex.size;
   158	  if (ex.duration) {
   159	    v.age = ex.duration.age;
   160	    v.days = ex.duration.days;
   161	    v.since = ex.duration.since;
   162	  } else if (has('days') && ex.count != null) {
   163	    v.days = ex.count;
   164	  }
   165	  if (ex.port) v.port = ex.port;
   166	  if (has('pid')) {
   167	    if (ex.pid) v.pid = ex.pid;
   168	    else if (ex.numbers?.length) v.pid = ex.numbers.find((n) => n > 1);
   169	  }
   170	  if (has('port') && !v.port && ex.numbers?.length) v.port = ex.numbers.find((n) => n >= 20 && n < 65536);
   171	  if (ex.mode && has('mode')) v.mode = ex.mode;
   172	  // line range: "lines 10-20", "od 10 do 20", "10 to 20", "from line 5 through 9"; else the first two numbers
   173	  if (has('start')) {
   174	    const m = String(ex.text).match(/(?<![\w.])(\d{1,9})\s*(?:-|–|—|\.\.|,|:|to|do|through|thru|until|till|and|i)\s*(?:line\s+|linii\s+|linia\s+)?(\d{1,9})(?![\w.])/i);
   175	    const [a, b] = m ? [+m[1], +m[2]] : (ex.numbers || []).slice(0, 2);
   176	    if (a > 0 && b > 0) { v.start = Math.min(a, b); v.end = Math.max(a, b); }
   177	    delete v.count;
   178	  }
   179	  if (has('num')) {
   180	    const n = ex.pid ?? ex.numbers?.find((x) => x > 0) ?? ex.count;
   181	    if (n != null) v.num = n;
   182	    delete v.count;
   183	  }
   184	  if (has('pr')) {
   185	    // the pull request the user names: a URL or a branch is kept as it is (validation withholds an odd one), never
   186	    // dropped for a bare `gh pr merge`, which acts on the current branch's pull request
   187	    const sel = prSelector(ex);
   188	    if (sel != null) v.pr = String(sel).replace(/^#(?=\d)/, '');
   189	    delete v.count;
   190	  }
   191	  if (ex.ext) v.glob = `*.${ex.ext}`;
   192	  if (ex.urls.length) v.url = ex.urls[0];
   193	  else if (has('url') && ex.hosts.length) v.url = /^\w+:\/\//.test(ex.hosts[0]) ? ex.hosts[0] : `https://${ex.hosts[0]}`;
   194	
   195	  if (pathPattern != null) v.pattern = pathPattern;
   196	  for (const k of ['name', 'service', 'container', 'pkg', 'cmd', 'script', 'var', 'branch', 'user', 'pattern', 'host', 'target', 'message']) {
   197	    if (has(k) && v[k] == null) {
   198	      const val = pickArg(k, ex);
   199	      if (val != null && val !== '') v[k] = val;
   200	    }
   201	  }
   202	  if (intent.id === 'base64_encode' || intent.id === 'base64_decode') {
   203	    const t = pickArg('text', ex);
   204	    const fileWord = /\b(plik\w*|files?)\s+\S+\.\w+/i.test(ex.text);
   205	    if (ex.quoted.length) v.text = ex.quoted[0];
   206	    else if (paths.length && fileWord) v.file = paths[0];
   207	    else if (paths.length && !(t && t.includes(' '))) v.file = paths[0];
   208	    else if (t) v.text = t;
   209	  }
   210	  if (intent.id === 'find_by_name') {
   211	    let name = v.name ?? (ex.quoted[0] || paths.find((p) => !p.includes('/') && p !== '.' && p !== '~'));
   212	    if (!name) {
   213	      const w = ex.rest.match(/\b(?:named|called|name|nazwie|nazwa|nazwany|nazywa sie|nazywajacy sie|plik|file|pliku)\s+(?:o\s+)?(?:nazwie\s+)?([\w.*-]+)/);
   214	      if (w && !/^(o|the|a|nazwie|named|called)$/.test(w[1])) name = w[1];
   215	    }
   216	    if (name) {
   217	      v.name = name;
   218	      v.namepat = /[*?]/.test(name) || /\.\w+$/.test(name) ? name : `*${name}*`;
   219	      if (v.path === name) v.path = paths.find((p) => p !== name);
   220	    }
   221	  }
   222	  if (intent.id === 'replace_text') {
   223	    let [o, n] = ex.taggerOnly ? [ex.tagged.PATTERN?.[0], ex.tagged.REPL?.[0]] : ex.quoted;
   224	    if (!ex.taggerOnly && (o == null || n == null)) {
   225	      const m = ex.text.match(/(?:replace|substitute|change|swap|zamie[nń]|zmie[nń]|podmie[nń]|zast[aą]p)\s+(?:all\s+|every\s+|wszystkie\s+|ka[zż]de\s+)?(?:occurrences of\s+|wyst[aą]pienia\s+)?(?:word\s+|s[lł]owo\s+|text\s+|tekst\s+|string\s+)?["'„]?([^\s"'”]+)["'”]?\s+(?:with|to|for|into|by|na|->|=>)\s+["'„]?([^\s"'”]+)["'”]?/i);
   226	      if (m) { o = o ?? m[1]; n = n ?? m[2]; }
   227	    }
   228	    if (o != null) v.old = o;
   229	    if (n != null) v.new = n;
   230	    if (o != null && n != null) v.sedexpr = `s/${sedEscapeOld(o)}/${sedEscapeNew(n)}/g`;
   231	    // the file is the path that is not one of the replaced words
   232	    if (v.file && (v.file === o || v.file === n)) v.file = paths.find((p) => p !== o && p !== n);
   233	  }
   234	  if (intent.id === 'chown' && v.user && v.path === v.user) delete v.path;
   235	  for (const k of Object.keys(v)) if (v[k] === undefined) delete v[k];
   236	  return v;
   237	}
   238	
   239	function renderValue(name, raw, values, quote) {
   240	  if (!(name in values)) return null;
   241	  let val = values[name];
   242	  if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
   243	  if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
   244	  return quote(val, { tilde: PATH_SLOTS.has(name), name });
   245	}
   246	
   247	const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;
   248	
   249	/**
   250	 * Fill a template. Returns { command, missing[] }.
   251	 * `values` = resolved slots merged over intent defaults.
   252	 */
   253	export function render(template, values, required = [], quote = shQuote, keepOptional = []) {
   254	  const missing = [];
   255	  const isSlot = (name) => name in values || required.includes(name) || SLOT_NAMES.test(name);
   256	  // Single pass over the template: every {slot} and «optional segment» is substituted exactly once and
   257	  // inserted values are never scanned again (a value containing "{file}" must stay inert text).
   258	  const out = template.replace(/«([^»]*)»|\{(\w+)(!raw)?\}/g, (m, seg, name, raw) => {
   259	    if (seg != null) {
   260	      let ok = true;
   261	      const r = seg.replace(/\{(\w+)(!raw)?\}/g, (m2, n2, raw2) => {
   262	        if (!ok) return m2;
   263	        const val = renderValue(n2, !!raw2, values, quote);
   264	        // an operand withheld on purpose (keepOptional: an invalid operand, an unresolved history value) keeps its
   265	        // placeholder: the optional part is not silently dropped (`npm install <PKG>`, never `npm install`)
   266	        if (val == null && keepOptional.includes(n2)) { missing.push(n2); return PLACEHOLDER(n2); }
   267	        if (val == null) { ok = false; return m2; }
   268	        return val;
   269	      });
   270	      return ok ? (/^\s/.test(r) ? r : ' ' + r) : '';
   271	    }
   272	    if (!isSlot(name)) return m; // not a slot (e.g. awk braces, %{http_code}, PowerShell script blocks)
   273	    const val = renderValue(name, !!raw, values, quote);
   274	    if (val == null) {
   275	      missing.push(name);
   276	      return PLACEHOLDER(name);
   277	    }
   278	    return val;
   279	  });
   280	  return { command: out, missing };

codex
I’m checking the latest operand and history fixes alongside the broader runtime and training changes. The test suite is running; I’ll also probe behavior the regression tests may not cover.
 exited 1 in 6337ms:
TAP version 13
# Subtest: /workspace/tellsh/test/cli.test.js
not ok 1 - /workspace/tellsh/test/cli.test.js
  ---
  duration_ms: 2629.702391
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
  duration_ms: 516.840453
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 3 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 187.732989
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 4 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 229.83085
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 5 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 265.893799
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 6 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 187.030731
  ...
# Subtest: /workspace/tellsh/test/pipeline.test.js
not ok 7 - /workspace/tellsh/test/pipeline.test.js
  ---
  duration_ms: 363.061513
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
  duration_ms: 1127.682613
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
  duration_ms: 554.213691
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
  duration_ms: 884.18569
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
  duration_ms: 483.446807
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
  duration_ms: 338.771697
  ...
# Subtest: /workspace/tellsh/test/regressions14.test.js
ok 13 - /workspace/tellsh/test/regressions14.test.js
  ---
  duration_ms: 402.74825
  ...
# Subtest: /workspace/tellsh/test/regressions15.test.js
ok 14 - /workspace/tellsh/test/regressions15.test.js
  ---
  duration_ms: 525.183545
  ...
# Subtest: /workspace/tellsh/test/regressions16.test.js
ok 15 - /workspace/tellsh/test/regressions16.test.js
  ---
  duration_ms: 498.287649
  ...
# Subtest: /workspace/tellsh/test/regressions17.test.js
ok 16 - /workspace/tellsh/test/regressions17.test.js
  ---
  duration_ms: 565.547191
  ...
# Subtest: /workspace/tellsh/test/regressions2.test.js
not ok 17 - /workspace/tellsh/test/regressions2.test.js
  ---
  duration_ms: 788.424175
  location: '/workspace/tellsh/test/regressions2.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 18 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 324.873381
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 19 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 392.373074
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 20 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 325.643362
  ...
# Subtest: /workspace/tellsh/test/regressions4.test.js
not ok 21 - /workspace/tellsh/test/regressions4.test.js
  ---
  duration_ms: 1155.726341
  location: '/workspace/tellsh/test/regressions4.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions5.test.js
ok 22 - /workspace/tellsh/test/regressions5.test.js
  ---
  duration_ms: 797.479689
  ...
# Subtest: /workspace/tellsh/test/regressions6.test.js
ok 23 - /workspace/tellsh/test/regressions6.test.js
  ---
  duration_ms: 894.877721
  ...
# Subtest: /workspace/tellsh/test/regressions7.test.js
ok 24 - /workspace/tellsh/test/regressions7.test.js
  ---
  duration_ms: 502.657898
  ...
# Subtest: /workspace/tellsh/test/regressions8.test.js
not ok 25 - /workspace/tellsh/test/regressions8.test.js
  ---
  duration_ms: 787.809059
  location: '/workspace/tellsh/test/regressions8.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions9.test.js
not ok 26 - /workspace/tellsh/test/regressions9.test.js
  ---
  duration_ms: 955.887322
  location: '/workspace/tellsh/test/regressions9.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 27 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 4248.600275
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/slot-cases.js
ok 28 - /workspace/tellsh/test/slot-cases.js
  ---
  duration_ms: 112.755308
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 29 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 265.128802
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 30 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 292.196396
  location: '/workspace/tellsh/test/templates.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..30
# tests 30
# suites 0
# pass 18
# fail 12
# cancelled 0
# skipped 0
# todo 0
# duration_ms 6337.554833

exec
/bin/bash -lc "nl -ba src/pipeline.js | sed -n '110,355p'" in /workspace/tellsh
 succeeded in 0ms:
   110	/**
   111	 * Slot resolution: tagger is primary, regex is fallback + validator.
   112	 * -> { slots, sources: {slot: 'tagger'|'regex'}, spans }
   113	 */
   114	export function resolveWithTagger(intentId, text, { model = getModel(), tool, mode = 'merge', tagger } = {}) {
   115	  const intent = BY_ID[intentId];
   116	  const exR = extractSlots(text);
   117	  const rR = resolveSlots(intent, exR);
   118	  if (mode === 'regex') return { slots: rR, sources: Object.fromEntries(Object.keys(rR).map((k) => [k, 'regex'])), spans: [] };
   119	  // tagger: optional external slot tagger (hybrid encoder, src/rerank/) -> { spans }
   120	  const t = tagger ? tagger(text, tool || FAMILY_OF[intentId]) : tag(text, tool || FAMILY_OF[intentId], model);
   121	  const exT = exFromSpans(text, t.spans);
   122	  const rT = resolveSlots(intent, exT);
   123	  if (rT.archive && !exT.paths.includes(rT.archive)) delete rT.archive; // derived default, not a tagged value
   124	  if (mode === 'tagger') return { slots: rT, sources: Object.fromEntries(Object.keys(rT).map((k) => [k, 'tagger'])), spans: t.spans };
   125	  const slots = {};
   126	  const sources = {};
   127	  // a regex path that is only part of a tagged path word the tagger could not represent exactly
   128	  // (or a named location inside it) must not stand in for it: the slot stays empty (placeholder)
   129	  const partOfRejected = (v) => exT.rejectedPaths?.some((ch) => exR.spans.some((s) => s.type === 'PATH' && s.value === v && s.start < ch.end && ch.start < s.end && text.slice(s.start, s.end) !== ch.text));
   130	  for (const k of new Set([...Object.keys(rT), ...Object.keys(rR)])) {
   131	    if (k === 'namepat' || k === 'sedexpr') continue; // derived, recomputed below
   132	    if (validSlot(k, rT[k])) { slots[k] = rT[k]; sources[k] = 'tagger'; } else if (rR[k] != null && (validSlot(k, rR[k]) || !VALID_SLOT[k]) && !(PATH_SLOT_NAMES.has(k) && partOfRejected(rR[k]))) { slots[k] = rR[k]; sources[k] = 'regex'; }
   133	  }
   134	  // "delete the folder out", "du of folder out sorted by size": a stop word right after the noun is its name
   135	  for (const k of ['path', 'file']) {
   136	    if (!usesSlot(intent, k) || slots[k] != null) continue;
   137	    const v = namedStopWord(text, k);
   138	    if (v != null) { slots[k] = v; sources[k] = 'regex'; }
   139	    break;
   140	  }
   141	  // a path the tagger or regex read but that was rejected (a bare function word: "in the", "of it"; a name with a
   142	  // newline; part of a path the tagger could not represent), a location whose object is only function words, or a
   143	  // place named only by reference ("there", "tam", "in the same folder"): withheld, so the command shows a
   144	  // placeholder instead of the default `.`
   145	  // with a place reference the location is "there", never a word the request names ("remove the logs in there")
   146	  if (hasLocative(text) && slots.path != null && usesSlot(intent, 'path') && !usesSlot(intent, 'dst')) { delete slots.path; delete sources.path; }
   147	  const withheld = [];
   148	  for (const k of ['path', 'file']) {
   149	    if (!usesSlot(intent, k) || slots[k] != null) continue;
   150	    const rejected = [rT[k], rR[k]].some((v) => typeof v === 'string' && v !== '' && !validSlot(k, v)) || exT.rejectedPaths?.length > 0;
   151	    if (rejected || danglingLocation(text) || hasLocative(text)) withheld.push(k);
   152	    break;
   153	  }
   154	  // an operand the request names but that is not a valid value (`npm install @types/node;rm`): placeholder, never
   155	  // silently dropped from an optional part of the template (`npm install`)
   156	  const invalidOperands = [];
   157	  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr']) {
   158	    if (!usesSlot(intent, k) || slots[k] != null || withheld.includes(k)) continue;
   159	    if ([rT[k], rR[k]].some((v) => typeof v === 'string' && v !== '' && !validSlot(k, v))) { withheld.push(k); invalidOperands.push(k); }
   160	  }
   161	  finalizeSlots(intent, slots);
   162	  return { slots, sources, spans: t.spans, withheld, invalidOperands };
   163	}
   164	
   165	/** Explicit paths the request names (`/tmp/x`, `~/a`, `./b`, `"C:\\x"`, quoted names with a slash), in order, distinct. */
   166	function explicitPaths(text) {
   167	  const ex = extractSlots(text);
   168	  return (ex.pathsWithQuoted || []).filter((p) => typeof p === 'string' && !/[*?]/.test(p) && !/^\w+:\/\//.test(p) &&
   169	    (/^(?:~|\.{0,2}\/|[A-Za-z]:[\\/])/.test(p) || (ex.quoted.includes(p) && /[\\/]/.test(p))));
   170	}
   171	
   172	/** Every occurrence of `v` in `text` is inside backticks or `$(…)`: the value is the output of a command, not a name. */
   173	function insideSubstitution(text, v) {
   174	  if (!v) return false;
   175	  let found = false;
   176	  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) {
   177	    found = true;
   178	    const before = text.slice(0, i);
   179	    const ticks = (before.match(/`/g) || []).length % 2 === 1;
   180	    const open = before.lastIndexOf('$(');
   181	    const paren = open >= 0 && !before.slice(open).includes(')');
   182	    if (!ticks && !paren) return false;
   183	  }
   184	  return found;
   185	}
   186	
   187	/** `v` occurs in `text` only directly followed by punctuation that trimPathPunct removed (`/tmp/x!`). */
   188	function trailingPunctAfter(text, v) {
   189	  const at = [];
   190	  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) at.push(text.slice(i + v.length));
   191	  return at.length > 0 && at.every((after) => /^[.,;:!?)]+(?=\s|$)/.test(after));
   192	}
   193	
   194	/**
   195	 * `v` was read from a quoted string of the request that ends in a backslash while the same quote
   196	 * character appears again later (`"a\" -e evil"`): the user may have meant \" as an escaped quote,
   197	 * so where the text ends is unclear.
   198	 */
   199	function cutAtEscapedQuote(text, v) {
   200	  if (typeof v !== 'string' || !v.endsWith('\\')) return false;
   201	  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) {
   202	    const after = text.slice(i + v.length);
   203	    if (/^["'”`]/.test(after) && after.slice(1).includes(after[0] === '”' ? '"' : after[0])) return true;
   204	  }
   205	  return false;
   206	}
   207	const TEXT_SLOT_NAMES = ['pattern', 'message', 'text', 'name', 'old', 'new', 'service', 'container', 'pkg', 'cmd', 'branch', 'user'];
   208	
   209	const usesSlot = (intent, k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
   210	
   211	function flagTokens(cmd) {
   212	  const set = new Set();
   213	  for (const w of String(cmd).split(/\s+/)) {
   214	    if (/^-[A-Za-z]+$/.test(w) && !w.startsWith('--')) for (const c of w.slice(1)) set.add('-' + c);
   215	    else if (/^-/.test(w)) set.add(w.replace(/=.*$/, ''));
   216	    else if (/^[a-z]{3}$/.test(w)) set.add(w); // ps aux
   217	  }
   218	  return set;
   219	}
   220	
   221	/** Second pass input: paths, numbers, ... from the merged extraction for the composer. */
   222	function composeInput(text, model, tool, unclear = []) {
   223	  const ex = extractSlots(text);
   224	  const t = tag(text, tool, model);
   225	  const exT = exFromSpans(text, t.spans);
   226	  const merged = { ...ex };
   227	  if (exT.paths.length) merged.paths = exT.paths;
   228	  // paths followed by sentence punctuation (`/tmp/data!`): fine for a read-only command, but a composed
   229	  // command that changes something is never aimed at them (see blocksAmbiguous)
   230	  // the same for a path that is the output of a command (`on \`pwd\``, `$(pwd)`): the catalog withholds it too
   231	  // and a quoted argument that may be words of the request (joinArgs)
   232	  const amb = [...(merged.paths || []).filter((p) => trailingPunctAfter(text, p) || insideSubstitution(text, String(p))), ...unclear];
   233	  for (const k of ['count', 'size', 'duration', 'ext', 'mode']) if (exT[k] != null) merged[k] = exT[k];
   234	  const pattern = () => { const p = exT.tagged.PATTERN?.find((x) => !isOptionWord(x)) ?? ex.quoted[0] ?? pickArg('pattern', ex) ?? null; return cutAtEscapedQuote(text, p) ? null : p; };
   235	  const nameOf = (type) => exT.tagged[type]?.[0] ?? null;
   236	  return { ex: merged, pattern, nameOf, ambiguousPaths: amb };
   237	}
   238	/**
   239	 * A composed command that changes something and uses a path whose end is unclear (`chmod -R 777 /tmp/data!`).
   240	 * Composed commands always carry at least medium risk, so "changes something" is: a writing tool (chmod,
   241	 * tar) or anything the danger checker flags on its own (find -delete, git/docker subcommands, ...).
   242	 */
   243	const WRITING_TOOLS = new Set(['chmod', 'tar']);
   244	const blocksAmbiguous = (comp, amb) => !!comp && !comp.invalid && amb.some((p) => comp.command.includes(p)) &&
   245	  (WRITING_TOOLS.has(comp.tool) || checkDanger(comp.command, 'safe').risk !== 'safe');
   246	
   247	/**
   248	 * Pure function used by the CLI, eval and tests.
   249	 * opts: { shell, os, env, history: string[] (commands, oldest first), cwd, threshold, top, compose: 'auto'|'force'|'off',
   250	 *         slotMode: 'merge'|'tagger'|'regex', model, rerank, rerankTop (candidates the rerank hook sees; default top) }
   251	 */
   252	export function suggest(query, opts = {}) {
   253	  const model = opts.model || getModel();
   254	  const env = opts.env || detectEnv({ shell: opts.shell, os: opts.os });
   255	  const top = opts.top ?? 3;
   256	  const thr = opts.threshold ?? model.thresholds.accept;
   257	  const composeMode = opts.compose || 'auto';
   258	  // a NUL byte cannot be part of any command argument (and marks ambiguous values internally)
   259	  if (/\0/.test(String(query))) {
   260	    return { query, shell: env.shell, os: env.os, coreutils: env.coreutils, threshold: thr, context: { used: false }, understood: false, method: 'none',
   261	      confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: 'the request contains a NUL byte' };
   262	  }
   263	
   264	  // ---- context (history + cwd), in memory only ----
   265	  let ctx = null;
   266	  if (opts.history?.length) {
   267	    // an earlier `tellsh <query>`: what that request produced on its own (no history, no composer). Slots it left as
   268	    // placeholders (refused, ambiguous, rejected) are ambiguous values here, never the catalog default or a guess.
   269	    const quick = (q, unclearArgs) => {
   270	      const r = suggest(q, { model, env, threshold: thr, compose: 'off', unclearArgs });
   271	      if (!r.understood || !r.intent || r.method !== 'catalog') return null;
   272	      const slots = { ...(r.slots || {}) };
   273	      for (const k of r.missing || []) slots[k] = AMB + `<${k}>`;
   274	      return { intent: r.intent, slots };
   275	    };
   276	    const kind = opts.historyKind || opts.history.kind || (env.shell === 'powershell' ? 'pwsh' : 'posix');
   277	    ctx = buildContext(opts.history, { classify: quick, cwd: opts.cwd, kind, query });
   278	  }
   279	  const ctxFeats = ctx ? ctx.features : (opts.cwd ? cwdFlags(opts.cwd).map((c) => 'ctx_cwd=' + c) : []);
   280	  const extras = [...envFeatures(env), ...ctxFeats];
   281	  const ref = ctx ? resolveReference(query, ctx) : null;
   282	  const context = ctx ? { used: true, commands: ctx.n, rule: ref?.rule || null, note: ref?.note || null } : { used: false };
   283	
   284	  const base = { query, shell: env.shell, os: env.os, coreutils: env.coreutils, threshold: thr, context };
   285	
   286	  // ---- rule: "same for X" reuses the previous intent with one slot replaced ----
   287	  if (ref?.rule === 'same-for') {
   288	    const slots = validHistorySlots(ref.slots);
   289	    // a value that fails validation (a 300-character path, ...) is a placeholder, never `find .`
   290	    const blank = invalidHistorySlots(ref.slots);
   291	    // the new path ends in sentence punctuation (`same for /tmp/data!`): placeholder, as for any request
   292	    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null && BY_ID[ref.intent].risk !== 'safe' && trailingPunctAfter(query, slots[ref.changed])) {
   293	      blank.push(ref.changed);
   294	      delete slots[ref.changed];
   295	    }
   296	    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank, keepOptional: blank });
   297	    const res = { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
   298	    const punct = blank.filter((k) => !invalidHistorySlots(ref.slots).includes(k));
   299	    if (punct.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${punct.join(', ')}); quote the path`];
   300	    if (punct.length < blank.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: it is not a valid value (${blank.filter((k) => !punct.includes(k)).join(', ')})`];
   301	    return res;
   302	  }
   303	  // ---- the reference cannot be resolved at all ("what about this", an older command to replay) ----
   304	  if (ref?.rule === 'refused' && ref.stop) {
   305	    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: ref.note };
   306	  }
   307	
   308	  const sb = ctx && !ref ? sameBut(query, ctx) : null;
   309	  // a request about the entries of the referenced directory does not use the history at all: its intent is read
   310	  // without the history features (they favour `delete_dir` for "delete log files in this folder")
   311	  // rerankTop: the re-ranker's own candidate count (A+B uses 5); independent of how many candidates are displayed
   312	  const c0 = cascade(query, { model, extras: ref?.contents ? envFeatures(env) : extras, top: Math.max(top, opts.rerankTop || 0), restrictTool: sb ? FAMILY_OF[sb.lastIntent] : undefined });
   313	  // rerank: optional hybrid hook (src/rerank/hybrid.js); history rules keep the linear cascade's decision
   314	  const c = opts.rerank && !sb && !ref ? opts.rerank(c0, { thr }) : c0;
   315	  const candidates = c.top.slice(0, Math.max(1, top)).map((t) => ({ intent: t.intent, tool: t.tool, p: +t.p.toFixed(4), description: BY_ID[t.intent]?.description }));
   316	  const tools = c.tools.map((t) => ({ tool: t.tool, p: +t.p.toFixed(4) }));
   317	  let intent = c.intent;
   318	  let confidence = c.confidence;
   319	  let method = 'catalog';
   320	  if ((ref?.rule === 'pronoun' || ref?.rule === 'refused') && ref.intent) { intent = ref.intent; method = 'history-rule'; confidence = Math.max(confidence, thr); }
   321	  if (sb) { method = 'history-rule'; confidence = Math.max(confidence, thr); context.rule = 'same-but'; context.note = `modifies previous ${sb.lastIntent}`; }
   322	  // "same but force" after `rm -r old; ls newdir`: the command it would modify is not the previous one
   323	  if (sb?.skipped && (BY_ID[sb.lastIntent].risk !== 'safe' || BY_ID[intent].risk !== 'safe')) {
   324	    context.rule = 'refused';
   325	    context.note = `the newest command that tellsh can modify (${sb.lastIntent}) is not the previous command; not guessing`;
   326	    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
   327	  }
   328	  // "same for api" after `docker --context prod logs web`: repeated here it would run against the default daemon
   329	  if (sb?.scoped) {
   330	    context.rule = 'refused';
   331	    context.note = `the previous command (${sb.lastIntent}) ran against another repository, directory or daemon (-C, --context, -H, ...); not guessing`;
   332	    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
   333	  }
   334	  const out = { ...base, confidence: +confidence.toFixed(4), tool: FAMILY_OF[intent] || c.tool, tools, candidates };
   335	
   336	  const tryCompose = (reason) => {
   337	    if (composeMode === 'off') return null;
   338	    // a place reference ("list files there", "tam") has no composer operand: never `find .` in its place
   339	    if (hasLocative(query) && composeMode !== 'force') return null;
   340	    // composer vocabulary and quoting are POSIX-only (fish treats \\ and \' as escapes inside single quotes)
   341	    if (env.shell === 'powershell' || env.shell === 'cmd' || env.shell === 'fish') return null;
   342	    const capable = c.tools.filter((t) => t.tool !== NONE);
   343	    if (c.topTool === NONE && composeMode !== 'force') return null;
   344	    const ci = composeInput(query, model, capable[0]?.tool, opts.unclearArgs);
   345	    const r = compose(query, capable, ci.ex, { patternOf: ci.pattern, nameOf: ci.nameOf });
   346	    if (!r || r.invalid) return r?.invalid ? { invalid: r.invalid, command: r.command } : null;
   347	    if (blocksAmbiguous(r, ci.ambiguousPaths)) return null;
   348	    // a value with a line break (`"/tmp/a\nb"`) is never composed into a command: the catalog withholds it too
   349	    if (/[\r\n]/.test(r.command)) return null;
   350	    // calibrated gate: confident stage-1 tool, or strong flag evidence (>= 2 triggered flags) for a likely tool
   351	    const pOf = capable.find((t) => t.tool === r.tool)?.p ?? 0;
   352	    if (composeMode !== 'force' && !(c.topToolP >= model.thresholds.compose || (r.triggered.length >= 2 && pOf >= 0.2))) return null;
   353	    return { ...out, understood: true, method: 'composed', experimental: true, reason, intent: null, description: `composed ${r.tool}${r.sub ? ' ' + r.sub : ''} command (experimental)`,
   354	      command: r.command, risk: r.risk, baseRisk: 'medium', warnings: r.warnings, critical: r.critical, missing: [], slots: {}, notes: null,
   355	      composed: { tool: r.tool, sub: r.sub, flags: r.flags, validation: r.validation } };

exec
/bin/bash -lc "nl -ba src/render.js | sed -n '1,320p'; git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/compose.js" in /workspace/tellsh
 succeeded in 0ms:
     1	// Per-shell rendering: pick the template variant for (shell, os, coreutils) and quote slot values
     2	// for that shell. Intent and slots are shared across shells; only the rendered command differs.
     3	//
     4	// Precedence
     5	//   bash/zsh/sh  linux: busybox (if busybox userland) ?? template
     6	//                darwin: gnuMac (GNU coreutils present) ?? bsd ?? catalog darwin ?? template
     7	//   fish         fish ?? the POSIX choice above (fish quoting)
     8	//   powershell   pwsh (string | {win, unix}); no unix variant -> `bash -c '<posix>'`; no win variant -> gap
     9	//   cmd          cmd ?? gap
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

exec
/bin/bash -lc "nl -ba src/pipeline.js | sed -n '355,640p'" in /workspace/tellsh
 succeeded in 0ms:
   355	      composed: { tool: r.tool, sub: r.sub, flags: r.flags, validation: r.validation } };
   356	  };
   357	
   358	  if (confidence < thr && method === 'catalog') {
   359	    const comp = tryCompose('low confidence');
   360	    if (comp && !comp.invalid) return comp;
   361	    const hint = hasPronoun(query) && !ctx ? 'this looks like a reference to an earlier command; try --history' : null;
   362	    // "move it there" with history: an object and a place reference at once is refused, not reported as resolved
   363	    if (ctx && hasPronoun(query) && hasLocative(query)) {
   364	      context.rule = 'refused';
   365	      context.note = 'the request names both an object ("it") and a place ("there") from the previous command; not guessing which is which';
   366	      return { ...out, understood: false, method: 'history-rule', hint: context.note, composeError: comp?.invalid || null };
   367	    }
   368	    return { ...out, understood: false, method: 'none', hint, composeError: comp?.invalid || null };
   369	  }
   370	
   371	  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode, tagger: opts.tagger });
   372	  const slots = r.slots;
   373	  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
   374	  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
   375	  const ambiguousPaths = [];
   376	  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
   377	  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
   378	  const blank = new Set(r.withheld || []);
   379	  // withheld operands whose optional part keeps its placeholder: an invalid operand, a history value that is ambiguous or
   380	  // invalid (`gh pr merge <PR>` for "same but merge" after `tellsh merge pr nightly`, never the current branch's pull request)
   381	  const keep = new Set(r.invalidOperands);
   382	  if (BY_ID[intent].risk !== 'safe') {
   383	    for (const k of Object.keys(slots)) {
   384	      if (PATH_SLOT_NAMES.has(k) && r.sources[k] !== 'history' && trailingPunctAfter(query, slots[k])) { ambiguousPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   385	    }
   386	    if (ambiguousPaths.length) finalizeSlots(BY_ID[intent], slots);
   387	  }
   388	  // a changing command whose path is the output of a command (`in \`pwd\``, `$(pwd)`), or a request that names more
   389	  // explicit paths than the command takes (`in /tmp/x and /tmp/y`: only one would be used): placeholder + warning
   390	  const unclearPaths = [];
   391	  if (BY_ID[intent].risk !== 'safe') {
   392	    const explicit = explicitPaths(query);
   393	    const nPathSlots = [...PATH_SLOT_NAMES].filter((k) => usesSlot(BY_ID[intent], k)).length;
   394	    const dropped = explicit.filter((p) => !Object.values(slots).some((v) => String(v) === p));
   395	    const tooMany = explicit.length > nPathSlots && dropped.length > 0;
   396	    // `in $(pwd)`: the location is the output of a command, so an empty path slot is withheld too (never `.`)
   397	    if (/\$\(|`/.test(query)) for (const k of ['path', 'file']) if (usesSlot(BY_ID[intent], k) && slots[k] == null && !unclearPaths.length) { unclearPaths.push(`${k}=?`); blank.add(k); }
   398	    for (const k of Object.keys(slots)) {
   399	      if (!PATH_SLOT_NAMES.has(k) || r.sources[k] === 'history') continue;
   400	      const sub = insideSubstitution(query, String(slots[k]));
   401	      if (sub || tooMany) { unclearPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   402	    }
   403	    if (tooMany) for (const k of PATH_SLOT_NAMES) if (usesSlot(BY_ID[intent], k) && slots[k] == null) blank.add(k);
   404	    if (unclearPaths.length || tooMany) finalizeSlots(BY_ID[intent], slots);
   405	    if (tooMany && !unclearPaths.length) unclearPaths.push(dropped.join(', '));
   406	    if (tooMany) unclearPaths.tooMany = true;
   407	  }
   408	  // `tellsh delete folder "my data"`: a quoted argument that may be a name or words of the request (see joinArgs). A
   409	  // changing command never takes it (or a part of it) as its path or other operand (process, service, container,
   410	  // package, ...): placeholder + warning
   411	  const unclearArgs = [];
   412	  if (BY_ID[intent].risk !== 'safe' && opts.unclearArgs?.length) {
   413	    const words = (x) => String(x).toLowerCase().split(/\s+/).filter(Boolean);
   414	    const partOf = (v, u) => { const a = words(u); const b = words(v); return b.length > 0 && a.some((_, i) => b.every((w, j) => a[i + j] === w)); };
   415	    for (const k of Object.keys(slots)) {
   416	      if (!(PATH_SLOT_NAMES.has(k) || OPERAND_SLOT_NAMES.has(k)) || r.sources[k] === 'history') continue;
   417	      const u = opts.unclearArgs.find((x) => partOf(slots[k], x));
   418	      if (u != null) { unclearArgs.push(`${k}=${u}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   419	    }
   420	    if (unclearArgs.length) finalizeSlots(BY_ID[intent], slots);
   421	  }
   422	  const ambiguousText = [];
   423	  for (const k of TEXT_SLOT_NAMES) {
   424	    if (slots[k] != null && cutAtEscapedQuote(query, slots[k])) { ambiguousText.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   425	  }
   426	  if (ambiguousText.length) { delete slots.sedexpr; delete slots.namepat; finalizeSlots(BY_ID[intent], slots); }
   427	  // "move it to /tmp/old", "copy them to /backup": the reference is the source, so the one path the request
   428	  // names is the destination (never `mv /tmp/old <DST>`). "copy notes.txt to it / into that folder / there":
   429	  // the reference is the destination and the named path the source (never `cp -ri /backup notes.txt`).
   430	  const itR = BY_ID[intent];
   431	  const fq = foldKeepLength(query).toLowerCase();
   432	  const twoPaths = usesSlot(itR, 'src') && usesSlot(itR, 'dst');
   433	  const isRef = ref?.rule === 'pronoun' || ref?.rule === 'refused';
   434	  const locative = hasLocative(query);
   435	  // "move it there": an object reference and a place reference at once. Which history value is the source and
   436	  // which the destination cannot be told from one previous command (`cd /tmp/x; cat a.txt`): both are withheld.
   437	  const bothRefs = twoPaths && locative && hasPronoun(query);
   438	  const refDst = !bothRefs && twoPaths && isRef && REF_DST.test(fq);
   439	  // the slots the reference fills (pronoun) or leaves empty (refused / guarded)
   440	  const refFill = refDst ? (ref.fill ? { dst: Object.values(ref.fill)[0] } : {}) : ref?.fill || {};
   441	  if (bothRefs) {
   442	    for (const k of Object.keys(slots)) if (PATH_SLOT_NAMES.has(k)) { delete slots[k]; delete r.sources[k]; }
   443	    for (const k of PATH_SLOT_NAMES) if (usesSlot(itR, k)) blank.add(k);
   444	    finalizeSlots(itR, slots);
   445	    if (ctx) { context.rule = 'refused'; context.note = 'the request names both what to move and where ("it" … "there"); not guessing which is which'; }
   446	    method = ctx ? 'history-rule' : method;
   447	  } else if (refDst) {
   448	    if (slots.src == null && slots.dst != null && !PRONOUN_VALUE.test(String(slots.dst))) { slots.src = slots.dst; r.sources.src = r.sources.dst; }
   449	    delete slots.dst; delete r.sources.dst;
   450	    if (slots.src != null && PRONOUN_VALUE.test(String(slots.src))) { delete slots.src; delete r.sources.src; }
   451	    if (ref.rule === 'refused') blank.add('dst');
   452	  } else if (isRef && twoPaths && slots.src != null && slots.dst == null &&
   453	      !PRONOUN_VALUE.test(String(slots.src)) && (ref.fill?.src != null || ref.blank?.includes('src'))) {
   454	    slots.dst = slots.src; r.sources.dst = r.sources.src;
   455	    delete slots.src; delete r.sources.src;
   456	    if (ref.rule === 'refused' || ref.guarded) blank.add('src');
   457	  }
   458	  // "move them to /tmp/old" with nothing resolved for "them" (no history, an unrelated history, ...): the one named
   459	  // path follows "to"/"into"/"do", so it is the destination; the source stays a placeholder (never `mv /tmp/old <DST>`)
   460	  if (!bothRefs && twoPaths && slots.src != null && slots.dst == null && !refDst && afterDestWord(query, String(slots.src))) {
   461	    slots.dst = slots.src; r.sources.dst = r.sources.src;
   462	    delete slots.src; delete r.sources.src;
   463	    blank.add('src');
   464	  }
   465	  // values that are only the words of a refused or guarded reference: a pronoun, or the `.` the tagger reads for
   466	  // "this folder" / "that directory" (never `rm -r .` for "delete all log files in this folder")
   467	  const refWordsOnly = () => {
   468	    for (const k of Object.keys(slots)) {
   469	      if (PRONOUN_VALUE.test(String(slots[k])) || (PATH_SLOT_NAMES.has(k) && slots[k] === '.' && !/(?:^|\s)\.(?:\s|$)/.test(query))) { delete slots[k]; delete r.sources[k]; }
   470	    }
   471	  };
   472	  if (ref?.rule === 'refused') {
   473	    // the reference points at something we cannot read safely: leave the slot empty (placeholder)
   474	    refWordsOnly();
   475	    for (const k of refDst ? [] : ref.blank || []) if (slots[k] == null && usesSlot(BY_ID[intent], k)) { blank.add(k); if (!ref.blanket) keep.add(k); }
   476	    finalizeSlots(BY_ID[intent], slots);
   477	    method = 'history-rule';
   478	  }
   479	  // "remove the logs there", "delete notes.txt there": a place reference never names the object of a changing
   480	  // command (`rm -r DIR`, `mv DIR …`); only the location a search-and-change runs in (`find DIR … -delete`). Any path
   481	  // the request names is relative to the wrong directory, so every path slot is withheld (with or without history).
   482	  if (locative && !refDst && !bothRefs && BY_ID[intent].risk !== 'safe' && FAMILY_OF[intent] !== 'find' && [...PATH_SLOT_NAMES].some((k) => usesSlot(BY_ID[intent], k))) {
   483	    for (const k of Object.keys(slots)) if (PATH_SLOT_NAMES.has(k)) { delete slots[k]; delete r.sources[k]; }
   484	    for (const k of PATH_SLOT_NAMES) if (usesSlot(BY_ID[intent], k)) blank.add(k);
   485	    finalizeSlots(BY_ID[intent], slots);
   486	    if (ctx) {
   487	      context.rule = 'refused';
   488	      context.note = `"there" names a place, not what ${intent} would change; not guessing`;
   489	      method = 'history-rule';
   490	    }
   491	  } else if (ref?.rule === 'pronoun' && ref.guarded && BY_ID[intent].risk !== 'safe') {
   492	    // the value must not be changed (search root, listed directory, ...; see changeGuard) and the classifier
   493	    // picked a modifying intent: refuse
   494	    refWordsOnly();
   495	    for (const k of Object.keys(refFill)) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
   496	    finalizeSlots(BY_ID[intent], slots);
   497	    context.rule = 'refused';
   498	    context.note = ref.guardNote;
   499	    method = 'history-rule';
   500	  } else if (ref?.rule === 'pronoun') {
   501	    const it = BY_ID[intent];
   502	    for (const [k, v] of Object.entries(refFill)) {
   503	      if (!validSlot(k, v)) {
   504	        // the referenced value cannot be used (too long, a newline, ...): placeholder, never the catalog default
   505	        if (slots[k] != null && PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
   506	        if (slots[k] == null && usesSlot(it, k)) { blank.add(k); keep.add(k); }
   507	        continue;
   508	      }
   509	      // the referenced value wins unless the request spells out its own value literally ("kill 4242")
   510	      const literal = slots[k] != null && !PRONOUN_VALUE.test(String(slots[k])) && new RegExp(`(^|[^\\w])${String(slots[k]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^\\w])`, 'i').test(query);
   511	      if (usesSlot(it, k) && (!literal || (k === 'path' && slots[k] === '.'))) { slots[k] = v; r.sources[k] = 'history'; }
   512	    }
   513	    // the chosen command does not take the referenced value: do not claim it was used
   514	    if (!Object.values(r.sources).includes('history')) { context.rule = null; context.note = `the ${ref.ent} from history does not fit ${intent}; not used`; }
   515	    finalizeSlots(it, slots);
   516	    method = 'history-rule';
   517	  }
   518	  if (sb) {
   519	    const it = BY_ID[intent];
   520	    for (const [k, v] of Object.entries(validHistorySlots(sb.lastSlots))) {
   521	      if (usesSlot(it, k) && slots[k] == null && !blank.has(k) && !['namepat', 'sedexpr'].includes(k)) { slots[k] = v; r.sources[k] = 'history'; }
   522	    }
   523	    // a slot of the previous command that depends on the shell state (`find "$DIR" …`) or is not a valid value
   524	    // (a 300-character path): placeholder, not `.`
   525	    const withheld = [...(sb.blank || []), ...invalidHistorySlots(sb.lastSlots)].filter((k) => usesSlot(it, k) && slots[k] == null && !['namepat', 'sedexpr'].includes(k));
   526	    for (const k of withheld) { blank.add(k); keep.add(k); }
   527	    if (withheld.length) { context.rule = 'refused'; context.note = `previous ${sb.lastIntent} has ${withheld.join(', ')} that depends on the shell state or is not a valid value; not guessing`; }
   528	    finalizeSlots(it, slots);
   529	  }
   530	  let b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: [...keep] });
   531	  // implicit reference: a required slot is still missing and the history has a value of that type.
   532	  // Only for safe intents: a destructive command ("delete the folder") is never aimed at a history
   533	  // value without an explicit reference word ("delete it"), which goes through resolveReference.
   534	  if (ctx && b.missing.length && ref?.rule !== 'refused' && BY_ID[intent].risk === 'safe' && b.risk === 'safe') {
   535	    const filled = [];
   536	    for (const m of b.missing) {
   537	      if (r.withheld?.includes(m)) continue; // "list files in the": not a reference to history either
   538	      const e = entityForSlot(m, ctx);
   539	      // an ambiguous newest value blocks the fill; ctx.last is consulted only when no entity type applies
   540	      const v = e ? (e.ambiguous ? null : e.value) : (ctx.last?.slots?.[m] ?? null);
   541	      if (v != null && validSlot(m, v)) { slots[m] = v; r.sources[m] = 'history'; filled.push(`${m}=${v}`); }
   542	    }
   543	    if (filled.length) {
   544	      finalizeSlots(BY_ID[intent], slots);
   545	      b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: [...keep] });
   546	      method = 'history-rule'; // history-derived: never auto-run by --yes
   547	      context.rule ??= 'implicit';
   548	      context.note = [context.note, `filled from history: ${filled.join(', ')}`].filter(Boolean).join('; ');
   549	    }
   550	  }
   551	  if (Object.values(r.sources).includes('history')) method = 'history-rule';
   552	  const res = { ...out, understood: true, method, ...b, slotSources: r.sources, spans: r.spans.map((s) => ({ type: s.type, text: s.text })) };
   553	  if (ambiguousText.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: unclear where the quoted text ends (\\" may be an escaped quote) (${ambiguousText.join(', ')})`];
   554	  if (ambiguousPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${ambiguousPaths.join(', ')}); quote the path`];
   555	  if (unclearArgs.length) res.warnings = [...(res.warnings || []), `${unclearArgs.every((x) => PATH_SLOT_NAMES.has(x.split('=')[0])) ? 'path' : 'value'} left as a placeholder: unclear whether the quoted argument is a name or part of the request (${unclearArgs.join(', ')}); pass the whole request as one quoted argument`];
   556	  if (unclearPaths.length) {
   557	    res.warnings = [...(res.warnings || []), unclearPaths.tooMany
   558	      ? `path left as a placeholder: the request names more paths than ${intent} takes (${explicitPaths(query).join(', ')}); run it once per path`
   559	      : `path left as a placeholder: it is the output of a command substitution (${unclearPaths.join(', ')})`];
   560	  }
   561	  if (method === 'catalog' && ctx == null && hasPronoun(query) && b.missing.length) res.hint = 'this looks like a reference to an earlier command; try --history';
   562	
   563	  // ---- second pass on modifier mismatch: the request asks for flags the catalog command lacks ----
   564	  //   same tool: >= 1 triggered flag not in the catalog command; another stage-1 tool: >= 2 triggered flags
   565	  // a slot the catalog withheld on purpose (command substitution, a rejected or unclear path, ...) is never filled by the
   566	  // composer: the catalog command with its placeholder is the answer
   567	  if (method === 'catalog' && composeMode !== 'off' && b.command && !blank.size && !['powershell', 'cmd', 'fish'].includes(env.shell)) {
   568	    const fam = FAMILY_OF[intent];
   569	    const ci = composeInput(query, model, fam, opts.unclearArgs);
   570	    const opt = { patternOf: ci.pattern, nameOf: ci.nameOf };
   571	    const have = flagTokens(b.command);
   572	    const expl = new Set(explained()[intent] || []);
   573	    const unexplained = (cmp) => cmp.triggered.filter((f) => !expl.has((cmp.sub ? cmp.sub + ' ' : '') + f));
   574	    let comp = compose(query, [{ tool: fam, p: 1 }], ci.ex, opt);
   575	    if (blocksAmbiguous(comp, ci.ambiguousPaths)) comp = null;
   576	    // same tool: the composed command must keep the catalog command's head (+ git/docker subcommand)
   577	    const sameHead = comp && !comp.invalid && headOf(comp.command) === headOf(b.command);
   578	    let extra = sameHead ? unexplained(comp).filter((f) => [...flagTokens(f)].some((x) => !have.has(x))) : [];
   579	    if (!extra.length) {
   580	      const others = c.tools.filter((t) => t.tool !== NONE && t.p >= 0.05);
   581	      let alt = compose(query, others.length ? others : [{ tool: fam, p: 1 }], ci.ex, opt);
   582	      if (blocksAmbiguous(alt, ci.ambiguousPaths)) alt = null;
   583	      const ux = alt && !alt.invalid && headOf(alt.command) !== headOf(b.command) ? unexplained(alt) : [];
   584	      if (ux.length >= 2) { comp = alt; extra = ux; }
   585	    }
   586	    // a value with a line break is never composed into a command (the catalog rejects it as a path)
   587	    if (comp && !comp.invalid && comp.command !== b.command && !/[\r\n]/.test(comp.command)) {
   588	      if (extra.length >= 1 || composeMode === 'force') {
   589	        return { ...res, method: 'composed', experimental: true, reason: `request asks for ${extra.join(' ')} not in the catalog command`,
   590	          catalogCommand: b.command, description: `composed ${comp.tool}${comp.sub ? ' ' + comp.sub : ''} command (experimental)`,
   591	          command: comp.command, risk: comp.risk, baseRisk: 'medium', warnings: comp.warnings, critical: comp.critical, missing: [],
   592	          composed: { tool: comp.tool, sub: comp.sub, flags: comp.flags, validation: comp.validation } };
   593	      }
   594	    }
   595	  }
   596	  return res;
   597	}

exec
/bin/bash -lc 'cat scripts/hybrid/export_data.js; cat scripts/hybrid/train_encoder.py; cat scripts/hybrid/train_a_dev.sh' in /workspace/tellsh
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
/bin/bash -lc "rg -n '"'^(export )?(function|const [A-Z_]+)|scoped|scope|chdir'"' src/history.js" in /workspace/tellsh
 succeeded in 0ms:
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
198:  'set-location': 'dir', sl: 'dir', chdir: 'dir', 'push-location': 'dir', 'get-childitem': 'dir', gci: 'dir', dir: 'dir',
205:const PS_SERVICE_INTENT = { 'stop-service': 'service_stop', 'start-service': 'service_start', 'restart-service': 'service_restart', 'get-service': 'service_status' };
206:const PS_VALUE_PARAMS = new Set(['path', 'literalpath', 'lp', 'pspath', 'name', 'id', 'processname', 'computername', 'targetname', 'uri', 'destination',
210:function psArgs(args) {
232:function destEnts(srcs, dst, ents) {
243:const VALUE_OPTS = {
259:function parseArgs(args, valueOpts = new Set()) {
279:function unwrap(w) {
287:const CD_HEADS = new Set(['cd', 'pushd', 'popd', 'chdir', 'set-location', 'sl', 'push-location', 'pop-location']);
293:const PATH_SLOT_KEYS = ['path', 'file', 'src', 'dst', 'dest', 'archive'];
295:function staleRelative(ents, slots) {
301:const REDIR_TARGET_OP = /^\d*(?:[<>]{1,2}[&|]?|&>>?)$/;
302:const REDIR_DUP_OP = /^\d*[<>]+&[\d-]+$/;
305:function psNative(head, args, ents, setIntent) {
316:      if (!['set-location', 'sl', 'chdir', 'push-location'].includes(head) &&
318:      else if (!['set-location', 'sl', 'chdir', 'push-location'].includes(head)) ents.listDir = true;
321:  else if (kind === 'dir' && !['set-location', 'sl', 'chdir', 'push-location'].includes(head)) {
345:function entsFromSlots(intent, slots, ents) {
364:const TELLSH_LINE = /^(?:npx\s+(?:-y\s+)?|node\s+)?(?:\S*[\\/])?tellsh(?:\.js)?(?:\s+(.*))?$/s;
367:const TELLSH_VALUE_OPTS = new Set(['--shell', '--os', '--platform', '--top', '--threshold']);
373:export function tellshQuery(line, kind = 'posix') {
379:export function tellshArgs(line, kind = 'posix') {
403: * -> { line, intent, slots, ents, at, searchDir?, ambiguous, cd?, scoped?, fromTellsh?, opaque? }  (scoped: see scopedElsewhere)
405:export function analyzeCommand(line, classify, kind = 'posix') {
439:  let scoped = false;
478:    if (w.length && scopedElsewhere(w, raw)) {
479:      scoped = true;
488:      scoped = true;
539:    if (scoped) { slots = { ...slots }; markScoped(slots); }
560:    ...(intentStale ? { intentStale: true } : {}), ...(scoped ? { scoped: true } : {}), listed,
568:const FS_LISTERS = new Set(['ls', 'tree', 'dir', 'gci', 'get-childitem', 'll', 'la', 'find', 'fd', 'fdfind', 'locate', 'mlocate', 'plocate',
570:const FS_SEARCHERS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'select-string', 'sls', 'findstr']);
571:const PROC_LISTERS = new Set(['ps', 'top', 'htop', 'btop', 'atop', 'pgrep', 'pidof', 'pstree', 'get-process', 'gps', 'tasklist']);
573:const GLOBAL_VALUE_OPTS = {
581:const SCOPE_OPTS = {
586:const SCOPE_ENV = /^(?:GIT_DIR|GIT_WORK_TREE|GIT_NAMESPACE|DOCKER_HOST|DOCKER_CONTEXT|DOCKER_CONFIG|CONTAINER_HOST|CONTAINER_CONNECTION)=/;
588:function scopedElsewhere(w, raw) {
601:const WRAPPER_CWD = {
602:  env: /^-[a-zA-Z0-9]*C|^--chdir(?:=|$)/,
603:  sudo: /^-[a-zA-Z]*[Di]|^--(?:chdir|login)(?:=|$)/,
609:  'start-stop-daemon': /^-d|^--chdir(?:=|$)/,
610:  run0: /^-[a-zA-Z]*[Dui]|^--(?:chdir|user|via-shell|login)(?:=|$)/,
613:const CWD_WRAPPERS = new Set(['pkexec']);
614:const WRAPPER_ROOT = {
620:const ROOT_WRAPPERS = new Set(['chroot', 'proot', 'firejail', 'bwrap', 'systemd-nspawn']);
623:const NS_WRAPPERS = new Set(['nsenter', 'unshare']);
626:const WRAPPER_HOST = {
632:const HOST_WRAPPERS = new Set(['machinectl']);
636:const PROP_WRAPPERS = new Set(['systemd-run', 'run0']);
637:const PROP_OPT = /^(?:-[tPqGdSr]*p|--property)$/;
638:const PROP_ATTACHED = /^(?:-[tPqGdSr]*p|--property=)(.+)$/;
639:const PROP_CWD = /^WorkingDirectory=/i;
640:const PROP_ROOT = /^(?:RootDirectory|RootImage|RootEphemeral|MountImages|ExtensionImages|ExtensionDirectories|BindPaths|BindReadOnlyPaths|TemporaryFileSystem|PrivateTmp|PrivateMounts|MountAPIVFS|PrivatePIDs|PrivateNetwork|NetworkNamespacePath|IPCNamespacePath|PrivateUsers|JoinsNamespaceOf|PrivateIPC|PrivateDevices)=|^ProtectHome=tmpfs\b/i;
645:function wrapperScope(w, raw) {
647:  let scope = null;
654:      if (PROP_CWD.test(p)) scope = 'cwd';
659:    if (CWD_WRAPPERS.has(h)) { scope = 'cwd'; continue; }
662:    if (WRAPPER_CWD[cur]?.test(x)) scope = 'cwd';
664:  return scope;
666:/** The values of a scoped command (scopedElsewhere) as ambiguous: they name things in another repository / daemon. */
667:function markScoped(o) {
671:function afterGlobals(head, args) {
679:function listedBySegment(w, pipedIn, k) {
703:const LIST_INTENT = { docker_ps: ['container'], docker_ps_all: ['container'], docker_stats: ['container'], list_services: ['service'],
705:const LIST_FAMILY = { ls: ['file', 'dir'], find: ['file', 'dir'], grep: ['file', 'dir'], du: ['file', 'dir'], ps: ['pid', 'proc'], ss: ['port', 'pid', 'proc'] };
710:const FILTER_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag', 'findstr', 'select-string', 'sls', 'where-object', 'where', '?']);
711:const GREP_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag']);
721:function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
867:const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];
874: * -> { n, line, ents: {type: value}, entOrder, refOrder, searchRoots, listedDirs, last: {intent, slots, ambiguous, skipped, scoped},
883:export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
904:  const last = a.intent ? { intent: a.intent, slots: a.slots, ambiguous: !!a.ambiguous, skipped: !!a.intentStale, scoped: !!a.scoped } : null;
916:export function cwdFlags(cwd) {
927:export function ctxFeatures(ctx) {
939:const SAME_RES = [
951:const EXPLICIT_SAME = [SAME_RES[0], SAME_RES[3], SAME_RES[4], SAME_RES[6]];
955:const PRONOUN_EN = /\b(it|its|that|this|them|those|these|the same one)\b/;
956:const PRONOUN_WORD = /^(it|its|that|this|them|those|these|one|again|there|here|tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym|to|force|forced|forcibly|sila|sile|silowo|recursive\w*|rekurencyjn\w*|please|prosze|too|also|tez|rowniez)$/;
958:const PLURAL = /(?:^|[^a-z])(them|those|these|je|te|tamte|ich|nimi)(?=$|[^a-z])/;
959:const PRONOUN_PL = /(?:^|\s)(tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym)(?=\s|$|[?!.,])|(?:^|\s)to(?=\s*[?!.]*$|\s+(?:co|ktor\w*|tam))/;
963:const LOCATIVE = new RegExp([
977:const CONTENTS = new RegExp([
986:const NOUN_TYPE = [
1000:const FORCE = /\b(force\w*|forcibly|-9|sigkill|na sile|sila|silowo|brutaln\w*)\b/;
1001:const VERBS = [
1023:const SLOT_FROM_ENT = {
1029:const NOT_REF = /\b(?:that|which|this)\s+(?:are|is|was|were|have|has|had|(?:contain|match|end|start|begin|use|take|listen|run|belong|need)(?:s|es|ed|d|ing)?|running|using|taking|ran|took|do|does|did|can|could|will|would|should|i|you|we|they)\b|\b(?:this|that|last|next)\s+(?:week|month|year|day|morning|evening|afternoon|night|time|hour|minute)s?\b/g;
1034:export function sameFor(q) {
1044:function retarget(intent, arg) {
1068:export function resolveReference(query, ctx) {
1082:    if (rt && ctx.last.scoped) {
1163:function locativeRef(fq, ctx) {
1183:export function changeGuard(type, value, fq, ctx) {
1209:const HINTED_NOUN = /\b(?:that|this|those|these|the|ten|ta|te|tamten|tamta|tamte)\s+([a-z0-9][\w.-]*)\s+(?:folders?|director(?:y|ies)|dirs?|files?|branch(?:es)?|containers?|services?|process(?:es)?|katalog\w*|folder\w*|plik\w*|kontener\w*|uslug\w*|galaz\w*|galez\w*)\b/g;
1211:const NOT_HINT = /^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back|list\w*|wylistuj\w*|check|sprawdz\w*|wipe|nuke|purge|destroy|clear|clean\w*|wyczysc\w*|drop|what|which|where|about|with|from|into|then|also|again|teraz|jeszcze|whatever|everything|anything|something|thing|stuff|still|there|here|tutaj|tamto|wszystko|cokolwiek|whole|entire|completely|cale|calym|listening|running|working|executable|wykonywaln\w*|contents?|zawartosc\w*|entries|inside|wewnatrz|siedzi|srodku|please|prosze|again|ponownie|znowu|forcefully|recursively|rekurencyjnie|permanently|trwale|names?|nazw\w*|only|tylko|same|samo|thing|merged|zmergowan\w*|scalon\w*|current|biezac\w*|aktualn\w*|obecn\w*|previous|poprzedni\w*|ostatni\w*|last|other|inn\w*|empty|pust\w*|temporary|tymczasow\w*|local|lokaln\w*|remote|zdaln\w*|stopped|zatrzyman\w*|created|utworzon\w*|newly|nowo|nowy|nowa|nowe|nowym|whole|cal\w*|samym|given|mentioned|wspomnian\w*|above|powyzsz\w*|broken|zepsut\w*|failed|failing|nieudan\w*|old\w*|star\w*)$/;
1216:export function entityForSlot(slot, ctx) {
1228:const SAME_BUT = [/^\s*(?:and\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?,?\s+but\s+(.+)$/, /^\s*(?:a\s+|i\s+)?(?:to\s+)?samo,?\s+ale\s+(.+)$/,
1231:export function sameBut(query, ctx) {
1237:  for (const re of SAME_BUT) if (re.test(fq)) return { lastIntent: ctx.last.intent, lastSlots, blank, skipped: !!ctx.last.skipped, scoped: !!ctx.last.scoped };
1241:function intentUses(intent, ent) {
1245:function pickEnt(intent, ent, ctx) {

exec
/bin/bash -lc "cat src/render.js; nl -ba src/fill.js | sed -n '280,455p'; nl -ba src/cli.js | sed -n '90,275p'" in /workspace/tellsh
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
   280	  return { command: out, missing };
   281	}
   282	
   283	const DERIVED_REQUIRED = { namepat: 'name', glob: 'ext', sedexpr: 'old' };
   284	
   285	const SIZE_MULT = { c: 1, k: 1024, M: 1024 ** 2, G: 1024 ** 3 };
   286	/** Slots derived from others so every shell can use the unit it needs (find: -mmin/-size, PowerShell: minutes/bytes). */
   287	export function deriveSlots(v) {
   288	  if (v.glob && v.ext == null) { const m = String(v.glob).match(/^\*\.([\w]+)$/); if (m) v.ext = m[1]; }
   289	  if (v.minutes == null && v.age) {
   290	    const m = String(v.age).match(/^-m(min|time) -(\d+)$/);
   291	    if (m) v.minutes = m[1] === 'min' ? +m[2] : +m[2] * 1440;
   292	  }
   293	  if (v.sizeBytes == null && v.size != null) {
   294	    const m = String(v.size).match(/^(\d+)([ckMG]?)$/);
   295	    if (m) v.sizeBytes = +m[1] * (SIZE_MULT[m[2]] ?? 512);
   296	  }
   297	  return v;
   298	}
   299	
   300	/** env from the legacy `platform` option */
   301	export const envFromPlatform = (platform = process.platform) => ({
   302	  shell: 'bash',
   303	  os: platform === 'darwin' ? 'darwin' : platform === 'win32' ? 'win32' : 'linux',
   304	  coreutils: platform === 'darwin' ? 'bsd' : 'gnu',
   305	});
   306	
   307	/**
   308	 * Build a full suggestion for an intent and query.
   309	 *   env: { shell, os, coreutils } (default: bash on `platform`)
   310	 *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
   311	 * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}
   312	 */
   313	export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [], keepOptional = [] } = {}) {
   314	  const intent = BY_ID[intentId];
   315	  if (!intent) throw new Error(`unknown intent ${intentId}`);
   316	  const e = env || envFromPlatform(platform);
   317	  const resolved = given || resolveSlots(intent, extracted || extractSlots(text));
   318	  const defaults = { ...intent.slots, ...(e.os === 'darwin' ? intent.darwinDefaults : {}) };
   319	  const values = {};
   320	  for (const [k, d] of Object.entries(defaults)) if (d != null) values[k] = d;
   321	  Object.assign(values, resolved);
   322	  // blank: slots withheld on purpose (refused reference, ambiguous path): no default stands in for them
   323	  for (const k of blank) if (resolved[k] == null) delete values[k];
   324	  // the filesystem root ("whole disk", "na całym dysku") is the system drive for Windows shells
   325	  if (e.os === 'win32' && (e.shell === 'powershell' || e.shell === 'cmd')) {
   326	    for (const k of PATH_SLOTS) if (values[k] === '/') values[k] = 'C:\\';
   327	  }
   328	  deriveSlots(values);
   329	  const required = [...new Set([...Object.entries(intent.slots).filter(([, d]) => d == null).map(([k]) => k), ...blank.filter((k) => !(k in values))])];
   330	
   331	  const choice = chooseTemplate(intent, e);
   332	  const base = {
   333	    intent: intent.id, description: intent.description, baseRisk: intent.risk, slots: resolved,
   334	    notes: intent.notes || null, shell: e.shell, os: e.os, variant: choice.variant || null,
   335	  };
   336	  if (choice.gap) {
   337	    return { ...base, command: null, gap: choice.gap, risk: intent.risk, warnings: [], critical: false, missing: [] };
   338	  }
   339	  const baseQuote = quoteForKind(choice.kind, choice.wrapPosix);
   340	  const tpl = choice.tpl;
   341	  const pwshNative = choice.kind === 'pwsh' && !choice.wrapPosix;
   342	  const nativeSlots = pwshNative ? pwshNativeSlots(tpl) : new Set();
   343	  const quote = !pwshNative ? baseQuote : (v, o = {}) => {
   344	    // function templates: every value is checked (the target program is not known statically)
   345	    if ((typeof tpl === 'function' || nativeSlots.has(o.name)) && unsafeNativePwshArg(v)) {
   346	      throw new UnquotableError(`value ${JSON.stringify(String(v))} cannot be passed to a native program safely by PowerShell < 7.3 (embedded " or trailing \\)`);
   347	    }
   348	    return baseQuote(v, o);
   349	  };
   350	  let command;
   351	  let missing = [];
   352	  try {
   353	    if (typeof tpl === 'function') {
   354	      const vals = { ...values };
   355	      for (const r of required) if (!(r in vals)) { missing.push(r); vals[r] = PLACEHOLDER(r); }
   356	      // only path slots may get a ./ prefix; any other value starting with - would be read as an
   357	      // option (printf -n, findstr /?, taskkill ...): it is left as a placeholder instead
   358	      for (const [k, v] of Object.entries(vals)) {
   359	        if (!PATH_SLOTS.has(k) && !RAW_OK[k] && typeof v === 'string' && /^-/.test(v)) { missing.push(k); vals[k] = PLACEHOLDER(k); }
   360	      }
   361	      const pathVals = new Set([...PATH_SLOTS].filter((k) => vals[k] != null).map((k) => String(vals[k])));
   362	      const q = (s) => {
   363	        const isPath = pathVals.has(String(s));
   364	        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { tilde: isPath });
   365	      };
   366	      // catalog functions take the OS string, variant functions a ctx object
   367	      command = tpl(vals, q, tpl === intent.template || tpl === intent.darwin ? e.os : e);
   368	      if (/<TEXT>/.test(command)) missing.push('text');
   369	    } else {
   370	      ({ command, missing } = render(tpl, values, required, quote, keepOptional.filter((k) => blank.includes(k) && !(k in values))));
   371	      missing = missing.map((m) => DERIVED_REQUIRED[m] || m);
   372	    }
   373	  } catch (err) {
   374	    if (!(err instanceof UnquotableError)) throw err;
   375	    return { ...base, command: null, gap: err.message, risk: intent.risk, warnings: [], critical: false, missing: [] };
   376	  }
   377	  if (choice.wrapPosix) {
   378	    // PowerShell < 7.3 drops embedded double quotes when passing arguments to native programs, so a
   379	    // POSIX command containing `"` is fed to bash on stdin instead of as a -c argument.
   380	    if (command.includes('"')) { command = psQuote(command) + ' | bash'; base.variant = 'piped to bash (no native PowerShell variant)'; }
   381	    else { command = 'bash -c ' + psQuote(command); base.variant = 'bash -c (no native PowerShell variant)'; }
   382	  }
   383	  missing = [...new Set(missing)];
   384	  const danger = checkDanger(command, intent.risk);
   385	  return {
   386	    ...base,
   387	    command,
   388	    risk: maxRisk(intent.risk, danger.risk),
   389	    warnings: danger.warnings,
   390	    critical: danger.critical,
   391	    missing,
   392	  };
   393	}
    90	export function suggest(query, { top = 3, threshold, platform, shell, os, history, cwd, compose } = {}) {
    91	  return pipelineSuggest(query, { top, threshold, shell, os: os || platform, history, cwd, compose });
    92	}
    93	
    94	function ask(rl, q) {
    95	  return new Promise((res) => rl.question(q, res));
    96	}
    97	
    98	function editLine(initial) {
    99	  return new Promise((res) => {
   100	    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
   101	    rl.question(C.cyan('edit> '), (ans) => { rl.close(); res(ans); });
   102	    rl.write(initial);
   103	  });
   104	}
   105	
   106	function hasBin(name) {
   107	  const r = spawnSync(process.platform === 'win32' ? 'where' : 'which', [name], { stdio: 'ignore' });
   108	  return r.status === 0;
   109	}
   110	
   111	/** Run with the target shell: $SHELL/bash/zsh/sh -c, fish -c, pwsh -NoProfile -Command, cmd /d /s /c. */
   112	export function shellInvocation(command, shell) {
   113	  if (shell === 'powershell') {
   114	    const bin = hasBin('pwsh') ? 'pwsh' : 'powershell';
   115	    return [bin, ['-NoProfile', '-Command', command]];
   116	  }
   117	  // with /s, cmd strips the first and last `"` of everything after /c: wrap the command in one more
   118	  // pair so a command that itself starts/ends with a quote ("C:\Program Files\x.exe" ...) survives
   119	  if (shell === 'cmd') return ['cmd.exe', ['/d', '/s', '/c', `"${command}"`]];
   120	  if (shell === 'fish') return ['fish', ['-c', command]];
   121	  const envShell = process.env.SHELL && normShell(process.env.SHELL) === shell ? process.env.SHELL : null;
   122	  return [envShell || shell || 'bash', ['-c', command]];
   123	}
   124	
   125	export function runShell(command, shellName = normShell(process.env.SHELL) || 'bash') {
   126	  const [shell, args] = shellInvocation(command, shellName);
   127	  return new Promise((res) => {
   128	    const child = spawn(shell, args, { stdio: 'inherit', windowsVerbatimArguments: shell === 'cmd.exe' });
   129	    child.on('error', (e) => { console.error(`tellsh: cannot start ${shell}: ${e.message}`); res(127); });
   130	    child.on('exit', (code, sig) => res(code ?? (sig ? 128 + (osConstants.signals[sig] ?? 1) : 1)));
   131	  });
   132	}
   133	
   134	const PROMPT = { powershell: 'PS> ', cmd: '> ', fish: '> ' };
   135	function printSuggestion(s, opts) {
   136	  const out = process.stdout;
   137	  out.write(`${C.bold((PROMPT[s.shell] || '$ ') + s.command)}\n`);
   138	  const conf = `${(s.confidence * 100).toFixed(0)}%`;
   139	  const label = s.method === 'composed' ? C.yellow('composed (experimental)') + C.dim(` ${s.composed.tool}${s.composed.sub ? ' ' + s.composed.sub : ''}`) : s.intent;
   140	  out.write(C.dim('  ') + label + C.dim(` · ${s.shell}/${s.os} · risk: `) + riskColor(s.risk)(s.risk) + C.dim(` · confidence: ${conf}`) + '\n');
   141	  if (s.method === 'composed') out.write(C.yellow(`  ~ assembled from a flag vocabulary (${s.reason}); check it carefully`) + '\n');
   142	  if (s.context?.note) out.write(C.cyan(`  ↺ from history: ${s.context.note}`) + '\n');
   143	  for (const w of s.warnings) out.write(riskColor(s.risk)(`  ! ${w}`) + '\n');
   144	  if (s.missing.length) out.write(C.yellow(`  ? missing: ${s.missing.join(', ')} — edit the command (e) before running`) + '\n');
   145	  if (s.hint) out.write(C.dim(`  hint: ${s.hint}`) + '\n');
   146	  if (s.notes) out.write(C.dim(`  note: ${s.notes}`) + '\n');
   147	  if (opts.explain) {
   148	    if (s.description) out.write(C.dim(`  ${s.description}`) + '\n');
   149	    if (s.variant) out.write(C.dim(`  rendering: ${s.variant}`) + '\n');
   150	    if (s.catalogCommand) out.write(C.dim(`  catalog command was: ${s.catalogCommand}`) + '\n');
   151	    out.write(C.dim(`  slots: ${JSON.stringify(s.slots)}${s.slotSources ? ' via ' + JSON.stringify(s.slotSources) : ''}`) + '\n');
   152	    out.write(C.dim('  tools: ' + s.tools.map((t) => `${t.tool} ${(t.p * 100).toFixed(1)}%`).join(', ')) + '\n');
   153	    out.write(C.dim('  candidates: ' + s.candidates.map((c) => `${c.intent} ${(c.p * 100).toFixed(1)}%`).join(', ')) + '\n');
   154	  }
   155	}
   156	
   157	export async function main(argv = process.argv.slice(2)) {
   158	  const opts = parseArgs(argv);
   159	  if (opts.version) { console.log(pkg.version); return 0; }
   160	  if (opts.help || !opts.words.length) { console.log(HELP); return opts.help ? 0 : 2; }
   161	  if (opts.badThreshold != null) { console.error(`tellsh: --threshold needs a number between 0 and 1 (got "${opts.badThreshold}")`); return 2; }
   162	  // the shell removed the quotes: a word with spaces is quoted again so "/tmp/a b" stays one path ("delete folder" as
   163	  // the first of several arguments is request text; a quoted argument that is neither is unclear: see joinArgs)
   164	  const joined = joinArgs(opts.words);
   165	  const query = joined?.text;
   166	  if (joined == null) { console.error('tellsh: an argument contains spaces and both kinds of quotes; it cannot be read as one value'); return 2; }
   167	  if (opts.shell && !normShell(opts.shell)) { console.error(`tellsh: unknown shell "${opts.shell}" (bash|zsh|sh|powershell|fish|cmd)`); return 2; }
   168	  if (opts.os && !normOs(opts.os)) { console.error(`tellsh: unknown OS "${opts.os}" (linux|darwin|win32)`); return 2; }
   169	  let s;
   170	  try {
   171	    getModel();
   172	    const env = detectEnv({ shell: opts.shell, os: opts.os });
   173	    // history is read only when asked for, kept in memory for this call, never printed or stored. Only the previous
   174	    // command is a reference target; the line before it is read too because some shells (zsh, fish, PSReadLine)
   175	    // write this `tellsh …` call to the file before it runs, and buildContext drops it.
   176	    const history = opts.history ? loadHistory({ shell: env.shell, file: opts.historyFile, n: 2 }) : undefined;
   177	    const so = { top: opts.top, threshold: opts.threshold, env, history, cwd: process.cwd(), compose: opts.compose, unclearArgs: joined.unclear };
   178	    s = opts.hybrid ? await suggestLazy(query, { ...so, system: process.env.TELLSH_HYBRID === 'safe' ? 'A+B-safe' : 'A+B' }) : pipelineSuggest(query, so);
   179	  } catch (e) {
   180	    console.error(`tellsh: ${e.message}`);
   181	    return 1;
   182	  }
   183	
   184	  if (opts.json) {
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

exec
/bin/bash -lc 'node test/pipeline.test.js; node test/cli.test.js' in /workspace/tellsh
 exited 1 in 2542ms:
TAP version 13
# Subtest: stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
ok 1 - stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
  ---
  duration_ms: 9.520796
  ...
# Subtest: PowerShell vocabulary maps to the same tool family
ok 2 - PowerShell vocabulary maps to the same tool family
  ---
  duration_ms: 2.538761
  ...
# Subtest: tagger: tool-conditioned BIO spans, only tags valid for the tool
ok 3 - tagger: tool-conditioned BIO spans, only tags valid for the tool
  ---
  duration_ms: 13.332042
  ...
# Subtest: slot merge: tagger primary, regex fills misses and replaces invalid values
ok 4 - slot merge: tagger primary, regex fills misses and replaces invalid values
  ---
  duration_ms: 8.340317
  ...
# Subtest: end-to-end bash + PowerShell + BSD
ok 5 - end-to-end bash + PowerShell + BSD
  ---
  duration_ms: 42.742261
  ...
# Subtest: history: pronouns, "same for", container/service/pid references (EN + PL)
ok 6 - history: pronouns, "same for", container/service/pid references (EN + PL)
  ---
  duration_ms: 64.394829
  ...
# Subtest: history is optional: without it a pronoun request gets a hint, never a guessed value
ok 7 - history is optional: without it a pronoun request gets a hint, never a guessed value
  ---
  duration_ms: 1.278442
  ...
# Subtest: history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
ok 8 - history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
  ---
  duration_ms: 0.732767
  ...
# Subtest: loadHistory reads only the tail of HISTFILE and returns the last n commands
not ok 9 - loadHistory reads only the tail of HISTFILE and returns the last n commands
  ---
  duration_ms: 0.916021
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
  duration_ms: 0.735531
  ...
# Subtest: second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
ok 11 - second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
  ---
  duration_ms: 50.906289
  ...
# Subtest: out-of-domain requests are rejected (also by the composer)
ok 12 - out-of-domain requests are rejected (also by the composer)
  ---
  duration_ms: 1.596333
  ...
# Subtest: env detection and overrides
ok 13 - env detection and overrides
  ---
  duration_ms: 0.653145
  ...
1..13
# tests 13
# suites 0
# pass 12
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 217.522391
TAP version 13
# Subtest: --version
not ok 1 - --version
  ---
  duration_ms: 163.511818
  location: '/workspace/tellsh/test/cli.test.js:12:1'
  failureType: 'testCodeFailure'
  error: |-
    Expected values to be strictly equal:
    
    '' !== '0.3.0'
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected: '0.3.0'
  actual: ''
  operator: 'strictEqual'
  stack: |-
    TestContext.<anonymous> (file:///workspace/tellsh/test/cli.test.js:15:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    node:internal/test_runner/harness:255:12
    node:internal/process/task_queues:140:7
    AsyncResource.runInAsyncScope (node:async_hooks:206:9)
    AsyncResource.runMicrotask (node:internal/process/task_queues:137:8)
  ...
# Subtest: --help
not ok 2 - --help
  ---
  duration_ms: 137.279677
  location: '/workspace/tellsh/test/cli.test.js:18:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /Usage: tellsh/. Input:
    
    ''
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: ''
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (file:///workspace/tellsh/test/cli.test.js:21:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: --json dry-run (EN)
not ok 3 - --json dry-run (EN)
  ---
  duration_ms: 204.74915
  location: '/workspace/tellsh/test/cli.test.js:24:1'
  failureType: 'testCodeFailure'
  error: 'Unexpected end of JSON input'
  code: 'ERR_TEST_FAILURE'
  name: 'SyntaxError'
  stack: |-
    JSON.parse (<anonymous>)
    TestContext.<anonymous> (file:///workspace/tellsh/test/cli.test.js:27:18)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: --json dry-run (PL)
not ok 4 - --json dry-run (PL)
  ---
  duration_ms: 176.31242
  location: '/workspace/tellsh/test/cli.test.js:34:1'
  failureType: 'testCodeFailure'
  error: 'Unexpected end of JSON input'
  code: 'ERR_TEST_FAILURE'
  name: 'SyntaxError'
  stack: |-
    JSON.parse (<anonymous>)
    TestContext.<anonymous> (file:///workspace/tellsh/test/cli.test.js:36:18)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: dry-run prints command and never executes
not ok 5 - dry-run prints command and never executes
  ---
  duration_ms: 204.058588
  location: '/workspace/tellsh/test/cli.test.js:42:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /\$ rm important\.txt/. Input:
    
    ''
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: ''
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (file:///workspace/tellsh/test/cli.test.js:45:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: non-TTY without --yes only prints
not ok 6 - non-TTY without --yes only prints
  ---
  duration_ms: 188.793381
  location: '/workspace/tellsh/test/cli.test.js:49:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /\$ pwd/. Input:
    
    ''
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: ''
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (file:///workspace/tellsh/test/cli.test.js:52:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: --yes runs safe commands and passes exit code
ok 7 - --yes runs safe commands and passes exit code
  ---
  duration_ms: 180.039359
  ...
# Subtest: --yes refuses non-safe commands
not ok 8 - --yes refuses non-safe commands
  ---
  duration_ms: 192.63769
  location: '/workspace/tellsh/test/cli.test.js:62:1'
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
    TestContext.<anonymous> (file:///workspace/tellsh/test/cli.test.js:65:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: unknown request -> I don't understand + candidates, exit 3
not ok 9 - unknown request -> I don't understand + candidates, exit 3
  ---
  duration_ms: 155.53037
  location: '/workspace/tellsh/test/cli.test.js:68:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /I don't understand/. Input:
    
    ''
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: ''
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (file:///workspace/tellsh/test/cli.test.js:71:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: --platform darwin (alias of --os)
not ok 10 - --platform darwin (alias of --os)
  ---
  duration_ms: 167.817969
  location: '/workspace/tellsh/test/cli.test.js:75:1'
  failureType: 'testCodeFailure'
  error: 'Unexpected end of JSON input'
  code: 'ERR_TEST_FAILURE'
  name: 'SyntaxError'
  stack: |-
    JSON.parse (<anonymous>)
    TestContext.<anonymous> (file:///workspace/tellsh/test/cli.test.js:76:18)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: --shell powershell / cmd / fish render natively; gaps exit 5
not ok 11 - --shell powershell / cmd / fish render natively; gaps exit 5
  ---
  duration_ms: 174.511808
  location: '/workspace/tellsh/test/cli.test.js:80:1'
  failureType: 'testCodeFailure'
  error: 'Unexpected end of JSON input'
  code: 'ERR_TEST_FAILURE'
  name: 'SyntaxError'
  stack: |-
    JSON.parse (<anonymous>)
    TestContext.<anonymous> (file:///workspace/tellsh/test/cli.test.js:81:19)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: --history=FILE resolves references and never echoes the history
not ok 12 - --history=FILE resolves references and never echoes the history
  ---
  duration_ms: 0.723088
  location: '/workspace/tellsh/test/cli.test.js:93:1'
  failureType: 'testCodeFailure'
  error: "EROFS: read-only file system, mkdtemp '/tmp/tellsh-cli-XXXXXX'"
  code: 'EROFS'
  stack: |-
    mkdtempSync (node:fs:3005:18)
    TestContext.<anonymous> (file:///workspace/tellsh/test/cli.test.js:94:15)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: composed commands are labelled experimental and refused by --yes
not ok 13 - composed commands are labelled experimental and refused by --yes
  ---
  duration_ms: 190.298969
  location: '/workspace/tellsh/test/cli.test.js:106:1'
  failureType: 'testCodeFailure'
  error: |-
    The input did not match the regular expression /composed \(experimental\)/. Input:
    
    ''
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected:
  actual: ''
  operator: 'match'
  stack: |-
    TestContext.<anonymous> (file:///workspace/tellsh/test/cli.test.js:108:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
1..13
# tests 13
# suites 0
# pass 1
# fail 12
# cancelled 0
# skipped 0
# todo 0
# duration_ms 2152.737475

exec
/bin/bash -lc "nl -ba src/history.js | sed -n '365,565p'; nl -ba src/history.js | sed -n '573,671p'" in /workspace/tellsh
 succeeded in 0ms:
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
   440	  let wrapCwd = false;
   441	  const subCds = new Set(); // ids of `( … )` subshells in which a cd ran (posix)
   442	  let searchDir = false;
   443	  let listDir = false;
   444	  const at = {};
   445	  const listed = {}; // entity type -> index of the newest segment that listed values of that type
   446	  // segments from..to-1 are connected by pipes only
   447	  const samePipe = (from, to) => from >= 0 && split.segments.slice(from, to).every((s) => s.sep === '|');
   448	  const firstWord = (s) => unwrap(s.words.filter((x) => !REDIR_TARGET_OP.test(x) && !REDIR_DUP_OP.test(x)))[0];
   449	  split.segments.forEach(({ words, subs }, segIdx) => {
   450	    const e = {};
   451	    const setIntent = (id, s) => { segIntent = id; segSlots = s; segIntentAt = segIdx; };
   452	    // redirections: the target is a file the command wrote (or read); it is not an argument
   453	    let w = [];
   454	    let redirTarget = null;
   455	    for (let i = 0; i < words.length; i++) {
   456	      const x = words[i];
   457	      if (REDIR_DUP_OP.test(x)) continue;
   458	      if (REDIR_TARGET_OP.test(x)) {
   459	        const target = words[i + 1];
   460	        i++;
   461	        if (target != null && !/^\/dev\/(?:null|stdout|stderr|tty)$|^(?:\$null|NUL)$/i.test(rawOf(target))) redirTarget = target;
   462	        continue;
   463	      }
   464	      w.push(x);
   465	    }
   466	    // wrappers (`sudo -u root ls`, `env ls`, `command ls`, `nice -n 5 ls`, `timeout 5 ps aux`): the command they run
   467	    const raw = w;
   468	    w = unwrap(w);
   469	    // a wrapper whose options could not be read: what ran is unknown, so it may have printed or named anything
   470	    if (!w.length || (w !== raw && /^-/.test(w[0]))) {
   471	      e.file = AMB + raw.join(' '); e.dir = AMB + raw.join(' ');
   472	      for (const x of ENT_TYPES) listed[x] = segIdx;
   473	      w = [];
   474	    }
   475	    if (w.length) segmentEnts(w, e, setIntent, split, k, segIdx, firstWord);
   476	    // `git -C /repo blame notes.txt`, `docker --context prod logs web`: "delete it" / "stop it" here would hit a
   477	    // different file / container than the one the command used (never resolved, never repeated)
   478	    if (w.length && scopedElsewhere(w, raw)) {
   479	      scoped = true;
   480	      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x])) e[x] = AMB + rawOf(e[x]);
   481	      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; markScoped(segSlots); }
   482	    }
   483	    // `env -C /repo cat notes.txt`, `sudo -D /repo …`: relative values name files in that directory, not here;
   484	    // `chroot /srv cat /etc/x`: every value names something under the other root
   485	    const ws = w.length && w !== raw ? wrapperScope(w, raw) : null;
   486	    const subCd = k === 'posix' && !!subs?.some((id) => subCds.has(id));
   487	    if (ws === 'root') {
   488	      scoped = true;
   489	      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x])) e[x] = AMB + rawOf(e[x]);
   490	      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; markScoped(segSlots); }
   491	    } else if (ws === 'cwd' || subCd) {
   492	      // also `(cd /repo && cat notes.txt)`: the cd only lasts inside the subshell, so relative values name files
   493	      // there, while "delete it" runs here
   494	      wrapCwd = true;
   495	      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x]) && isRelativePath(e[x])) e[x] = AMB + rawOf(e[x]);
   496	      if (segIntentAt === segIdx) { segSlots = { ...segSlots }; staleRelative({}, segSlots); }
   497	    }
   498	    // `(cd /repo && echo hi > notes.txt)`: the redirection opened notes.txt in /repo, not here (a wrapper's
   499	    // redirection, `sudo -D /repo cat a > out.txt`, is opened by the calling shell, so it stays)
   500	    if (redirTarget != null) e.file = subCd && !isAmbiguous(redirTarget) && isRelativePath(redirTarget) ? AMB + rawOf(redirTarget) : redirTarget;
   501	    const pipedIn = segIdx > 0 && split.segments[segIdx - 1].sep === '|';
   502	    if (w.length && !isAmbiguous(w[0])) for (const x of listedBySegment(w, pipedIn, k)) listed[x] = segIdx;
   503	    // every command the wrapper chain may run (also when its options are misread): a listing anywhere in it counts
   504	    if (w !== raw) for (const c of commandChains(raw, [], {})) if (c.length && !isAmbiguous(c[0])) for (const x of listedBySegment(c, pipedIn, k)) listed[x] = segIdx;
   505	    // a listing piped into anything (`ls DIR | sort | grep pdf`, `ls -S DIR | head -1`, `gci DIR | Select-Object
   506	    // -First 1`): what the user saw is a selection of the entries inside DIR, never DIR itself
   507	    const piped = split.segments[segIdx].sep.startsWith('|') && !split.segments[segIdx].sep.startsWith('||');
   508	    if (e.listDir && piped) { e.searchDir = true; delete e.listDir; }
   509	    if (e.listCwd) {
   510	      const how = piped ? 'search' : e.listCwd;
   511	      // `cd DIR && ls | grep pdf`: the listing is of DIR
   512	      if (cdAt >= 0 && at.dir === cdAt) { if (how === 'search') { searchDir = true; listDir = false; } else if (!searchDir) listDir = true; }
   513	      delete e.listCwd;
   514	    }
   515	    const head = w.length && !isAmbiguous(w[0]) ? w[0].replace(/^.*[\\/]/, '').toLowerCase() : '';
   516	    if (CD_HEADS.has(head)) {
   517	      // the working directory changes: earlier relative paths (and a relative cd target) are stale
   518	      cdAt = segIdx;
   519	      if (k === 'posix' && subs) subCds.add(subs[subs.length - 1]);
   520	      staleRelative(ents, null);
   521	      const target = w.slice(1).filter((a) => !/^-/.test(a))[0];
   522	      if (target != null && !isAmbiguous(target) && !isRelativePath(target) && target !== '-') e.dir = target;
   523	      else e.dir = AMB + (target ?? '-');
   524	      delete e.file;
   525	    }
   526	    if (e.dir !== undefined) { searchDir = !!e.searchDir; listDir = !!e.listDir; }
   527	    // `ls ~/Downloads | grep pdf`, `gci DIR | Where-Object …`: the listed directory was filtered, so what
   528	    // the user saw are entries inside it
   529	    // (any later stage of the same pipeline, not only the next one)
   530	    else if (segIdx > 0 && at.dir != null && at.dir < segIdx && samePipe(at.dir, segIdx) && FILTER_HEADS.has(head)) searchDir = true;
   531	    delete e.searchDir;
   532	    delete e.listDir;
   533	    for (const key of Object.keys(e)) at[key] = segIdx;
   534	    Object.assign(ents, e); // later segments supersede earlier ones
   535	  });
   536	  if (inv && cdAt < 0) {
   537	    // the whole line is a catalog/variant command: its slots are the most precise reading
   538	    intent = inv.intent; slots = inv.slots; ambiguous = inv.ambiguous;
   539	    if (scoped) { slots = { ...slots }; markScoped(slots); }
   540	    if (wrapCwd) { slots = { ...slots }; staleRelative({}, slots); }
   541	    const ie = {};
   542	    entsFromSlots(intent, slots, ie);
   543	    for (const key of Object.keys(ie)) at[key] = split.segments.length;
   544	    if (ie.dir !== undefined) {
   545	      // a piped/filtered listing found above stays a search root even when the line is a catalog command
   546	      const piped = searchDir && String(ie.dir) === String(ents.dir);
   547	      searchDir = isSearchRoot(intent, slots, ie) || piped;
   548	      listDir = !searchDir && (['ls', 'find'].includes(FAMILY_OF[intent]) || intent === 'largest_dirs');
   549	    }
   550	    ents = { ...ents, ...ie };
   551	  } else if (segIntent) {
   552	    intent = segIntent; slots = { ...segSlots };
   553	    if (segIntentAt < cdAt) staleRelative({}, slots);
   554	    // `kill 1111; ls newdir`: another command ran after the one tellsh could repeat
   555	    if (split.segments.slice(segIntentAt, -1).some((s) => s.sep !== '|')) intentStale = true;
   556	  }
   557	  if (Object.values(slots).some(isAmbiguous)) ambiguous = true;
   558	  return { line: t, intent, slots, ents, at, ambiguous, ...(searchDir && ents.dir != null ? { searchDir: true } : {}),
   559	    ...(listDir && !searchDir && ents.dir != null ? { listDir: true } : {}), ...(cdAt >= 0 ? { cd: true } : {}),
   560	    ...(intentStale ? { intentStale: true } : {}), ...(scoped ? { scoped: true } : {}), listed,
   561	    // the dir is the `cd` target (`cdFollowed`: another segment ran after the cd)
   562	    ...(cdAt >= 0 && at.dir === cdAt ? { cdDir: true, cdFollowed: cdAt < split.segments.length - 1 } : {}) };
   563	}
   564	
   565	// Listings: commands that print many values of an entity type (`ls`, `find`, `ps aux`, `docker ps`, `git branch`).
   573	const GLOBAL_VALUE_OPTS = {
   574	  git: new Set(['-C', '-c', '--git-dir', '--work-tree', '--namespace', '--super-prefix', '--config-env']),
   575	  docker: new Set(['-H', '--host', '-c', '--context', '--config', '-l', '--log-level', '--tlscacert', '--tlscert', '--tlskey']),
   576	  podman: new Set(['-c', '--connection', '--url', '--identity', '--root', '--runroot', '--cgroup-manager', '--log-level', '--storage-driver',
   577	    '--module', '--events-backend', '--network-cmd-path', '--tmpdir', '--volumepath', '--imagestore', '--hooks-dir', '--conmon', '--runtime', '--ssh']),
   578	};
   579	// global options / environment that point git, docker or podman at another repository, directory or daemon
   580	// (a short option may carry its value attached: `git -C/repo`, `docker -Htcp://prod:2375`, `podman -cprod`)
   581	const SCOPE_OPTS = {
   582	  git: /^-C|^--(?:git-dir|work-tree|namespace)(?:=|$)/,
   583	  docker: /^-[Hc]|^--(?:host|context|config)(?:=|$)/,
   584	  podman: /^-c|^--(?:connection|url|root|runroot|identity|ssh)(?:=|$)/,
   585	};
   586	const SCOPE_ENV = /^(?:GIT_DIR|GIT_WORK_TREE|GIT_NAMESPACE|DOCKER_HOST|DOCKER_CONTEXT|DOCKER_CONFIG|CONTAINER_HOST|CONTAINER_CONNECTION)=/;
   587	/** `git -C /repo …`, `docker --context prod …`, `DOCKER_HOST=… docker …` (w: the unwrapped words, raw: before unwrap). */
   588	function scopedElsewhere(w, raw) {
   589	  if (isAmbiguous(w[0])) return false;
   590	  const head = String(w[0]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
   591	  const re = SCOPE_OPTS[head];
   592	  if (!re) return false;
   593	  if (raw.slice(0, raw.length - w.length).some((x) => SCOPE_ENV.test(String(x)))) return true;
   594	  const args = w.slice(1);
   595	  return args.slice(0, args.length - afterGlobals(head, args).length).some((a) => re.test(String(a)));
   596	}
   597	// wrapper options that run the command in another working directory (`env -C /repo`, `sudo -D /repo`, also with the
   598	// value attached or in a cluster) or under another root (`chroot /srv`, `unshare --root=/srv`, `nsenter -r`)
   599	// login shells start in the target user's home (`sudo -i`, `sudo -iu bob`, `sudo --login`, `runuser -l`, `su -`);
   600	// `run0 --user=bob` runs in bob's home (also `-i`, the target's login shell, in newer systemd)
   601	const WRAPPER_CWD = {
   602	  env: /^-[a-zA-Z0-9]*C|^--chdir(?:=|$)/,
   603	  sudo: /^-[a-zA-Z]*[Di]|^--(?:chdir|login)(?:=|$)/,
   604	  runuser: /^-[a-zA-Z]*l|^--login(?:=|$)/,
   605	  su: /^-$|^-[a-zA-Z]*l|^--login(?:=|$)/,
   606	  unshare: /^-w|^--wd(?:=|$)/,
   607	  nsenter: /^-w|^--wd(?:=|$)/,
   608	  'systemd-run': /^--working-directory(?:=|$)/,
   609	  'start-stop-daemon': /^-d|^--chdir(?:=|$)/,
   610	  run0: /^-[a-zA-Z]*[Dui]|^--(?:chdir|user|via-shell|login)(?:=|$)/,
   611	};
   612	// wrappers that always change to another directory: pkexec runs every command in the target user's home
   613	const CWD_WRAPPERS = new Set(['pkexec']);
   614	const WRAPPER_ROOT = {
   615	  sudo: /^-[a-zA-Z]*R|^--chroot(?:=|$)/,
   616	  unshare: /^-R|^--root(?:=|$)/,
   617	  nsenter: /^-r|^--root(?:=|$)/,
   618	  'start-stop-daemon': /^-r|^--chroot(?:=|$)/,
   619	};
   620	const ROOT_WRAPPERS = new Set(['chroot', 'proot', 'firejail', 'bwrap', 'systemd-nspawn']);
   621	// namespace wrappers: the command saw another PID / network / mount namespace (`nsenter -t 1234 -p ps -p 42`,
   622	// `unshare -n ss -ltn`), so a pid, port, process or path it named is not the one "kill it" would hit here
   623	const NS_WRAPPERS = new Set(['nsenter', 'unshare']);
   624	// wrapper options that run the command on another machine / host (`systemd-run --machine=web ps -p 42`,
   625	// `systemd-run -H user@host …`, `run0 --machine=web …`, `sudo --host=web …`): like a namespace, nothing it named is here
   626	const WRAPPER_HOST = {
   627	  'systemd-run': /^-[a-zA-Z]*[MH]|^--(?:machine|host)(?:=|$)/,
   628	  run0: /^-[a-zA-Z]*M|^--machine(?:=|$)/,
   629	  sudo: /^-[a-zA-Z]*h|^--host(?:=|$)/,
   630	};
   631	// wrappers that always run the command on another machine / container (`machinectl shell web ps -p 42`)
   632	const HOST_WRAPPERS = new Set(['machinectl']);
   633	// unit properties (`systemd-run -p WorkingDirectory=/srv …`, `-pX=…`, `--property=X=…`, `--property X=…`, clustered after
   634	// flags that take no value `-tp X=…` / `-tpX=…`, also run0) that run the command in another directory ('cwd') or under
   635	// another root / mounts / namespaces ('root')
   636	const PROP_WRAPPERS = new Set(['systemd-run', 'run0']);
   637	const PROP_OPT = /^(?:-[tPqGdSr]*p|--property)$/;
   638	const PROP_ATTACHED = /^(?:-[tPqGdSr]*p|--property=)(.+)$/;
   639	const PROP_CWD = /^WorkingDirectory=/i;
   640	const PROP_ROOT = /^(?:RootDirectory|RootImage|RootEphemeral|MountImages|ExtensionImages|ExtensionDirectories|BindPaths|BindReadOnlyPaths|TemporaryFileSystem|PrivateTmp|PrivateMounts|MountAPIVFS|PrivatePIDs|PrivateNetwork|NetworkNamespacePath|IPCNamespacePath|PrivateUsers|JoinsNamespaceOf|PrivateIPC|PrivateDevices)=|^ProtectHome=tmpfs\b/i;
   641	/**
   642	 * 'root' when a wrapper in the removed prefix of `raw` (before the unwrapped words `w`) runs the command under another
   643	 * root (every path names something else), 'cwd' when it runs it in another working directory (relative paths do).
   644	 */
   645	function wrapperScope(w, raw) {
   646	  let cur = null;
   647	  let scope = null;
   648	  let prop = false;
   649	  for (const x of raw.slice(0, raw.length - w.length).map((v) => String(rawOf(v)))) {
   650	    const p = prop ? x : PROP_WRAPPERS.has(cur) ? x.match(PROP_ATTACHED)?.[1] : null;
   651	    prop = PROP_WRAPPERS.has(cur) && PROP_OPT.test(x);
   652	    if (p != null) {
   653	      if (PROP_ROOT.test(p)) return 'root';
   654	      if (PROP_CWD.test(p)) scope = 'cwd';
   655	      continue;
   656	    }
   657	    const h = x.replace(/^.*[\\/]/, '').toLowerCase();
   658	    if (ROOT_WRAPPERS.has(h) || NS_WRAPPERS.has(h) || HOST_WRAPPERS.has(h)) return 'root';
   659	    if (CWD_WRAPPERS.has(h)) { scope = 'cwd'; continue; }
   660	    if (!x.startsWith('-')) { if (WRAPPER_CWD[h] || WRAPPER_ROOT[h] || WRAPPER_HOST[h]) cur = h; continue; }
   661	    if (WRAPPER_ROOT[cur]?.test(x) || WRAPPER_HOST[cur]?.test(x)) return 'root';
   662	    if (WRAPPER_CWD[cur]?.test(x)) scope = 'cwd';
   663	  }
   664	  return scope;
   665	}
   666	/** The values of a scoped command (scopedElsewhere) as ambiguous: they name things in another repository / daemon. */
   667	function markScoped(o) {
   668	  for (const x of Object.keys(o)) if (o[x] != null && typeof o[x] !== 'boolean' && !isAmbiguous(o[x])) o[x] = AMB + rawOf(o[x]);
   669	}
   670	/** The arguments after the global options of git/docker/podman (`git -C /tmp status` -> ['status']); other heads: unchanged. */
   671	function afterGlobals(head, args) {

exec
/bin/bash -lc "node bin/tellsh.js --version; node --input-type=module <<'JS'
import { spawnSync } from 'node:child_process';
const r=spawnSync(process.execPath,['bin/tellsh.js','--version'],{encoding:'utf8'}); console.log({status:r.status,error:r.error,stdout:r.stdout,stderr:r.stderr});
const x=spawnSync(process.execPath,['-e','console.log(\"hello\")'],{encoding:'utf8'});console.log({status:x.status,error:x.error,stdout:x.stdout,stderr:x.stderr});
JS" in /workspace/tellsh
 succeeded in 377ms:
0.3.0
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
    spawnargs: [ 'bin/tellsh.js', '--version' ]
  },
  stdout: '',
  stderr: ''
}
{
  status: 0,
  error: Error: spawnSync /usr/bin/node EPERM
      at Object.spawnSync (node:internal/child_process:1123:20)
      at spawnSync (node:child_process:877:24)
      at file:///workspace/tellsh/[eval1]:3:9
      at ModuleJob.run (node:internal/modules/esm/module_job:263:25)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
      at async ModuleLoader.eval (node:internal/modules/esm/loader:217:24)
      at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {
    errno: -1,
    code: 'EPERM',
    syscall: 'spawnSync /usr/bin/node',
    path: '/usr/bin/node',
    spawnargs: [ '-e', 'console.log("hello")' ]
  },
  stdout: '',
  stderr: ''
}

exec
/bin/bash -lc 'cat scripts/real/prepare_real.js; cat scripts/hybrid/prune_vocab.py; cat scripts/hybrid/export_encoder.py' in /workspace/tellsh
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

codex
The suite hit environment limits: tests that create temporary files fail with `EROFS`, and subprocess-based checks hit `EPERM`. Direct CLI and in-memory checks work, so I’m using those to verify findings.
exec
/bin/bash -lc "node --input-type=module <<'JS'
import { suggest } from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for (const q of ['merge the pull request from the branch release','merge pr from the branch main','merge pr for the branch develop','merge pr from branch main','merge pr with branch main','merge pr from the branch feature/login','merge pr on the main branch','merge pr for the current branch','merge pr from my fork','merge pr from alice','merge pr from yesterday','merge pr from 2 days ago','merge pr #12-only']) {
const r=suggest(q,{env}); console.log(JSON.stringify({q,command:r.command,intent:r.intent,missing:r.missing,confidence:r.confidence,understood:r.understood}));
}
JS" in /workspace/tellsh
 succeeded in 129ms:
{"q":"merge the pull request from the branch release","command":"gh pr merge","intent":"gh_pr_merge","missing":[],"confidence":0.9636,"understood":true}
{"q":"merge pr from the branch main","command":"gh pr merge","intent":"gh_pr_merge","missing":[],"confidence":0.9918,"understood":true}
{"q":"merge pr for the branch develop","command":"gh pr merge","intent":"gh_pr_merge","missing":[],"confidence":0.9241,"understood":true}
{"q":"merge pr from branch main","command":"gh pr merge main","intent":"gh_pr_merge","missing":[],"confidence":0.9912,"understood":true}
{"q":"merge pr with branch main","command":"gh pr merge","intent":"gh_pr_merge","missing":[],"confidence":0.9928,"understood":true}
{"q":"merge pr from the branch feature/login","command":"gh pr merge <PR>","intent":"gh_pr_merge","missing":["pr"],"confidence":0.9842,"understood":true}
{"q":"merge pr on the main branch","command":"gh pr merge","intent":"gh_pr_merge","missing":[],"confidence":0.9887,"understood":true}
{"q":"merge pr for the current branch","command":"gh pr merge","intent":"gh_pr_merge","missing":[],"confidence":0.9871,"understood":true}
{"q":"merge pr from my fork","command":"gh pr merge","intent":"gh_pr_merge","missing":[],"confidence":0.9908,"understood":true}
{"q":"merge pr from alice","command":"gh pr merge alice","intent":"gh_pr_merge","missing":[],"confidence":0.9949,"understood":true}
{"q":"merge pr from yesterday","command":"gh pr merge","intent":"gh_pr_merge","missing":[],"confidence":0.9869,"understood":true}
{"q":"merge pr from 2 days ago","command":"gh pr merge <PR>","intent":"gh_pr_merge","missing":["pr"],"confidence":0.9955,"understood":true}
{"q":"merge pr #12-only","command":"gh pr merge 12-only","intent":"gh_pr_merge","missing":[],"confidence":0.9967,"understood":true}

exec
/bin/bash -lc "nl -ba src/history.js | sed -n '721,915p'; cat src/shellwords.js" in /workspace/tellsh
 succeeded in 0ms:
   721	function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
   722	  if (isAmbiguous(w[0])) {
   723	    if (w.slice(1).some((a) => PATHLIKE.test(rawOf(a)))) { e.file = AMB + w.join(' '); e.dir = AMB + w.join(' '); }
   724	    return;
   725	  }
   726	  const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '');
   727	  const args = afterGlobals(head, w.slice(1));
   728	  const nonFlags = args.filter((a) => !/^-/.test(a));
   729	  if (CD_HEADS.has(head.toLowerCase())) return; // handled by the caller
   730	  if ((k === 'pwsh' || PS_CMDLET.test(head)) && psNative(head.toLowerCase(), args, e, setIntent)) return;
   731	  if (head === 'docker') {
   732	    const sub = nonFlags[0];
   733	    if (sub === 'run') {
   734	      const i = args.indexOf('--name');
   735	      if (i >= 0 && args[i + 1]) e.container ??= args[i + 1];
   736	      const nm = args.find((a) => a.startsWith('--name='));
   737	      if (nm) e.container ??= nm.slice(7);
   738	    } else if (DOCKER_CT.has(sub)) {
   739	      const rest = args.slice(args.indexOf(sub) + 1);
   740	      for (let i = 0; i < rest.length; i++) {
   741	        if (DOCKER_VAL_FLAGS.has(rest[i])) { i++; continue; }
   742	        if (/^-/.test(rest[i])) continue;
   743	        e.container ??= rest[i];
   744	        break;
   745	      }
   746	      if (DOCKER_INTENT[sub] && e.container != null) setIntent(DOCKER_INTENT[sub], { container: e.container });
   747	    }
   748	  } else if (head === 'systemctl' || head === 'service') {
   749	    const svc = head === 'systemctl' ? nonFlags[1] : nonFlags[0];
   750	    const verb = head === 'systemctl' ? nonFlags[0] : nonFlags[1];
   751	    if (svc) e.service ??= svc.replace(/\.service$/, '');
   752	    if (SYSTEMCTL_INTENT[verb] && svc) setIntent(SYSTEMCTL_INTENT[verb], { service: e.service });
   753	  } else if (head === 'journalctl') {
   754	    const i = args.findIndex((a) => a === '-u' || a === '--unit');
   755	    if (i >= 0 && args[i + 1]) { e.service ??= args[i + 1].replace(/\.service$/, ''); setIntent('journal_service', { service: e.service }); }
   756	  } else if (head === 'kill') {
   757	    const { pos } = parseArgs(args, VALUE_OPTS.kill);
   758	    if (pos.length === 1 && /^\d+$/.test(pos[0])) { e.pid = pos[0]; setIntent('kill_by_pid', { pid: pos[0] }); }
   759	    else if (pos.length) e.pid = AMB + pos.map(rawOf).join(' '); // several PIDs or a job spec: not one process
   760	  } else if (['pkill', 'killall', 'pgrep', 'pidof'].includes(head)) {
   761	    const { pos } = parseArgs(args, VALUE_OPTS[head]);
   762	    if (pos.length === 1) e.proc = pos[0];
   763	    else if (pos.length > 1) e.proc = AMB + pos.map(rawOf).join(' ');
   764	    if (head === 'pgrep' && pos.length === 1) setIntent('find_process', { name: pos[0] });
   765	  } else if ((head === 'ps' || head === 'top' || head === 'htop') && args.some((a) => /^-\w*p$/.test(a))) {
   766	    const i = args.findIndex((a) => /^-\w*p$/.test(a));
   767	    const pid = (args[i + 1] || '').split(',')[0];
   768	    if (/^\d+$/.test(pid)) e.pid = pid;
   769	  } else if ((head === 'grep' || head === 'egrep') && split.segments.some((s, j) => j < segIdx && firstWord(s) === 'ps')) {
   770	    // ps aux | grep -v grep | grep node: the process is the pattern of a non-inverted grep
   771	    const { pos, opts, flags } = parseArgs(args, VALUE_OPTS.grep);
   772	    const inverted = flags.some((f) => /^-[a-zA-Z]*v/.test(f) || f === '--invert-match');
   773	    const pat = opts['-e'] ?? opts['--regexp'] ?? pos[0];
   774	    if (!inverted && pat != null) e.proc = pat;
   775	  } else if (GREP_HEADS.has(head) && nonFlags[0]) {
   776	    const { pos, opts, flags } = parseArgs(args, VALUE_OPTS[head] || VALUE_OPTS.grep);
   777	    const pat = opts['-e'] ?? opts['--regexp'] ?? pos[0];
   778	    const path = opts['-e'] != null || opts['--regexp'] != null ? pos[0] : pos[1];
   779	    if (pat != null) setIntent(flags.some((a) => /^-\w*l/.test(a)) ? 'grep_files_containing' : 'grep_text', { pattern: rawOf(pat), ...(path != null ? { path } : {}) });
   780	    if (path != null) {
   781	      const t = typeByExt(path);
   782	      e[t] = path;
   783	      if (t === 'dir') e.searchDir = true; // searched directory: the matches are inside it
   784	    }
   785	  } else if (head === 'lsof' || head === 'ss' || head === 'netstat' || head === 'fuser') {
   786	    const pm = args.map(rawOf).join(' ').match(/(?::|tcp:|udp:|sport = :)(\d{2,5})\b/);
   787	    if (pm) { e.port = pm[1]; setIntent('process_on_port', { port: pm[1] }); }
   788	  } else if (head === 'git') {
   789	    const sub = nonFlags[0];
   790	    const rest = args.slice(args.indexOf(sub) + 1);
   791	    if (sub === 'grep') {
   792	      // git grep [-l] PATTERN [DIR]: a search, its directory argument is only where it looked
   793	      const { pos, opts } = parseArgs(rest, VALUE_OPTS.grep);
   794	      const path = opts['-e'] != null ? pos[0] : pos[1];
   795	      if (path != null) { const t = typeByExt(path); e[t] = path; if (t === 'dir') e.searchDir = true; }
   796	      return;
   797	    }
   798	    if (sub === 'checkout' || sub === 'switch') {
   799	      const { pos, opts, after } = parseArgs(rest, VALUE_OPTS[sub]);
   800	      const created = opts['-b'] ?? opts['-B'] ?? opts['-c'] ?? opts['-C'] ?? opts['--create'] ?? opts['--force-create'] ?? opts['--orphan'];
   801	      if (after) {
   802	        // git checkout [<tree-ish>] -- <file>...: restores files, it does not switch branches
   803	        if (after.length) e.file = after.length === 1 ? after[0] : AMB + after.map(rawOf).join(' ');
   804	        return;
   805	      }
   806	      const b = created ?? pos[0];
   807	      if (b != null && b !== '.' && b !== '-' && !isAmbiguous(b) && !String(b).startsWith('-')) {
   808	        e.branch = b;
   809	        e.current = b;
   810	        if (created != null) e.created = b;
   811	      }
   812	    } else if (['merge', 'rebase'].includes(sub) || (sub === 'branch' && nonFlags[1])) {
   813	      const b = nonFlags[nonFlags.length - 1];
   814	      if (b && b !== sub && b !== '.' && !isGlob(b) && !b.startsWith('-')) e.branch = b;
   815	    } else if (sub === 'push' && nonFlags.length >= 2) e.branch = nonFlags[nonFlags.length - 1];
   816	    else if (sub === 'clone' && nonFlags[1]) e.url = nonFlags[1];
   817	    else if (['add', 'diff', 'blame', 'restore', 'rm', 'log'].includes(sub) && nonFlags[1] && nonFlags[1] !== '.') e.file = nonFlags[nonFlags.length - 1];
   818	  } else if (['ssh', 'ping', 'dig', 'nslookup', 'traceroute', 'mtr', 'host', 'telnet', 'nc'].includes(head)) {
   819	    const h = nonFlags.find((a) => /[\w-]+\.[\w.-]+|^[\w-]+@/.test(a)) || nonFlags[0];
   820	    if (h) e.host = h;
   821	  } else if (['curl', 'wget', 'http'].includes(head)) {
   822	    const u = args.find((a) => /^https?:\/\//.test(a));
   823	    if (u) {
   824	      e.url = u;
   825	      const base = u.replace(/[?#].*$/, '').split('/').pop();
   826	      const saves = head === 'wget' || args.some((a) => /^-\w*O/.test(a));
   827	      if (saves && /\.\w{1,5}$/.test(base)) e.file = base;
   828	    }
   829	  } else if (head === 'rm' || head === 'trash' || head === 'rmdir') {
   830	    const p = oneOf(nonFlags);
   831	    if (p) e[args.some((a) => /^-\w*r/i.test(a)) || head === 'rmdir' ? 'dir' : 'file'] = p;
   832	  } else if (head === 'cp' || head === 'mv' || head === 'ln') {
   833	    const { pos, opts } = parseArgs(args, VALUE_OPTS[head]);
   834	    const tdir = opts['-t'] ?? opts['--target-directory'];
   835	    if (tdir != null) destEnts(pos.length === 1 ? pos : [...pos, ''], String(tdir) + '/', e);
   836	    else if (pos.length >= 2) destEnts(pos.slice(0, -1), pos[pos.length - 1], e);
   837	  } else if (head === 'tar' || head === 'zip') {
   838	    const a = nonFlags.find((x) => /\.(tar(\.\w+)?|tgz|zip)$/.test(x));
   839	    if (a) e.file = a;
   840	  } else if (FILE_HEADS.has(head)) {
   841	    // operands: not a chmod mode, a chown owner, or a count (`head -n 5 a.txt`); a script and its arguments
   842	    // (`python3 script.py data.csv`) are several operands: "delete it" may mean either
   843	    let ops = nonFlags.filter((a) => !/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$|^\d+$/.test(a));
   844	    if (['chown'].includes(head)) ops = ops.slice(1);
   845	    const p = oneOf(ops);
   846	    if (p) e[/\/$/.test(rawOf(p)) ? 'dir' : 'file'] = p;
   847	  } else if (DIR_HEADS.has(head)) {
   848	    // find ROOT -name ...: the search root; other heads: the one directory argument (`ls /a /b`: ambiguous)
   849	    // (find's root is the operands before its first expression word: `find -name "*.o"` has none)
   850	    const p = head === 'find' ? args.slice(0, (args.findIndex((a) => /^[-(!]/.test(a)) + 1 || args.length + 1) - 1)[0] : oneOf(nonFlags.filter((a) => !isGlob(a) && !/^\d+$/.test(a)));
   851	    if (p) {
   852	      e.dir = p;
   853	      if (head === 'find') e.searchDir = true;
   854	      // `du DIR` / `du -d 1 DIR | sort -rh` lists the entries of DIR (`du -sh DIR` is DIR itself)
   855	      else if (['ls', 'tree', 'ncdu'].includes(head) || (head === 'du' && !args.some((a) => /^-[a-zA-Z]*s|^--summarize$/.test(a)))) e.listDir = true;
   856	    }
   857	    // `ls`, `ls *.pdf`: the working directory (a glob selects some of its entries)
   858	    else if (['ls', 'tree'].includes(head)) e.listCwd = nonFlags.some(isGlob) ? 'search' : 'list';
   859	  } else if (!INERT_HEADS.has(head.toLowerCase())) {
   860	    // unknown command (or unknown cmdlet) naming a path: we cannot tell what it did with it, so an
   861	    // older file/dir must not be picked up by "it"
   862	    const p = nonFlags.find((a) => PATHLIKE.test(rawOf(a)) && !/^\w+:\/\//.test(rawOf(a)));
   863	    if (p) e[typeByExt(p)] = AMB + rawOf(p);
   864	  }
   865	}
   866	
   867	const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];
   868	
   869	/**
   870	 * Build the context object from history commands (oldest first). Only the single most recent command is a
   871	 * reference target ("delete it", "same for /var", "there" always mean the previous command, never an older one);
   872	 * the running `tellsh <query>` line itself, which some shells write before it runs, is dropped first.
   873	 * kind: 'posix' | 'pwsh' (default: `cmds.kind` as set by loadHistory, else posix)
   874	 * -> { n, line, ents: {type: value}, entOrder, refOrder, searchRoots, listedDirs, last: {intent, slots, ambiguous, skipped, scoped},
   875	 *      pos, listing, cdDir, features }
   876	 *    values that could not be read unambiguously are kept as AMB-prefixed strings (see isAmbiguous).
   877	 *    Within the line (`cat old.txt; ls newdir`) later segments win: pos gives the segment of each value, and refOrder
   878	 *    ranks types by it (entOrder, which feeds the classifiers' ctx_ features, ranks by type only). searchRoots: the dir
   879	 *    is a find/grep root or a filtered/piped listing; listedDirs: a plain listing. last.skipped: a later segment of the
   880	 *    line ran after the repeatable command. listing: the segment of the newest listing of each entity type ({ seg });
   881	 *    cdDir: the dir is a `cd` target ({ value, followed }). changeGuard() uses these.
   882	 */
   883	export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
   884	  const k = kind || cmds.kind || 'posix';
   885	  const list = [...cmds];
   886	  // zsh (share_history / inc_append_history), fish and PSReadLine write the running line to the
   887	  // history file before it executes: the current `tellsh <query>` call is not the previous command. bash writes it
   888	  // only afterwards, so there an identical last line is an earlier call (`cmds.shell` as set by loadHistory)
   889	  if (query != null && list.length && cmds.shell !== 'bash') {
   890	    const norm = (x) => String(x).trim().replace(/\s+/g, ' ');
   891	    const q = tellshQuery(list[list.length - 1], k);
   892	    // exact match only: an earlier `tellsh` line whose text merely contains the query is the previous command
   893	    if (q != null && q !== false && norm(q) === norm(query)) list.pop();
   894	  }
   895	  const line = list.length ? list[list.length - 1] : null;
   896	  const a = line != null ? analyzeCommand(line, classify, k) : { ents: {}, at: {}, listed: {}, slots: {} };
   897	  const ents = {};
   898	  for (const t of ENT_TYPES) if (a.ents[t] != null) ents[t] = a.ents[t];
   899	  const pos = Object.fromEntries(Object.keys(ents).map((t) => [t, a.at?.[t] ?? 0]));
   900	  const dir = ents.dir != null ? String(ents.dir) : null;
   901	  const searchRoots = new Set(dir != null && a.searchDir ? [dir] : []);
   902	  const listedDirs = new Set(dir != null && a.listDir ? [dir] : []);
   903	  const listing = Object.fromEntries(Object.entries(a.listed || {}).map(([t, seg]) => [t, { seg }]));
   904	  const last = a.intent ? { intent: a.intent, slots: a.slots, ambiguous: !!a.ambiguous, skipped: !!a.intentStale, scoped: !!a.scoped } : null;
   905	  const current = a.ents.current && !isAmbiguous(a.ents.current) ? a.ents.current : null;
   906	  const cdDir = a.cdDir && dir != null ? { value: dir, followed: !!a.cdFollowed } : null;
   907	  const byType = (x, y) => ENT_TYPES.indexOf(x) - ENT_TYPES.indexOf(y);
   908	  const entOrder = Object.keys(ents).sort(byType);
   909	  const refOrder = Object.keys(ents).sort((x, y) => pos[y] - pos[x] || byType(x, y));
   910	  const ctx = { n: line != null ? 1 : 0, line, ents, currentBranch: current, entOrder, refOrder, searchRoots, listedDirs, last,
   911	    cwdFlags: cwdFlags(cwd), pos, listing, cdDir };
   912	  ctx.features = ctxFeatures(ctx);
   913	  return ctx;
   914	}
   915	
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
/bin/bash -lc "nl -ba src/danger.js | sed -n '1,225p'" in /workspace/tellsh
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

exec
/bin/bash -lc "nl -ba src/danger.js | sed -n '225,535p'" in /workspace/tellsh
 succeeded in 0ms:
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
   311	      pos.push(x);
   312	    }
   313	    if (pos.some(sysFile)) hit('high', 'edits a system file in place', true);
   314	  } else if (head === 'tee') {
   315	    const t = positional(a).filter(sysFile);
   316	    if (t.length) hit('high', a.some((x) => /^-[a-zA-Z]*a/.test(x) || x === '--append') ? 'appends to a system file' : 'overwrites a system file', !a.some((x) => /^-[a-zA-Z]*a/.test(x) || x === '--append'));
   317	  }
   318	}
   319	
   320	// kill [-SIG | -s SIG | -n NUM | --signal SIG] [--] pid...   (pid 1 / -1 = init / every process)
   321	function killCheck(words, hit) {
   322	  hit('high', 'terminates processes');
   323	  const a = words.slice(1);
   324	  let i = 0;
   325	  if (a[i] === '-s' || a[i] === '-n' || a[i] === '--signal') i += 2;
   326	  else if (a[i] && /^-/.test(a[i]) && a[i] !== '--' && a[i] !== '-l' && a[i] !== '-L') i += 1;
   327	  if (a[i] === '--') i++;
   328	  if (a.slice(i).some((p) => /^-?1$/.test(p))) hit('high', 'kill -1 / PID 1 kills everything', true);
   329	}
   330	
   331	const PS_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*\*?|[\\/]+\*?|\*|~[\\/]*\*?|\$(?:HOME|env:USERPROFILE|env:HOMEDRIVE|env:SystemDrive|env:SystemRoot|env:windir|\{env:USERPROFILE\})[\\/]*\*?|[A-Za-z]:[\\/]+(?:Windows|Users|Program Files(?: \(x86\))?|ProgramData)[\\/]*\*?)$/i;
   332	const PS_REMOVE = /^(?:remove-item|ri|rm|del|erase|rd|rmdir)$/i;
   333	
   334	// Remove-Item and its aliases (PowerShell parameter names may be abbreviated: -r, -Rec, -lp, ...)
   335	function removeItemCheck(words, hit) {
   336	  const a = words.slice(1);
   337	  if (a.some((x) => /^\/[sq]$/i.test(x))) return; // cmd.exe syntax, see cmdDelCheck
   338	  hit('high', 'deletes files permanently');
   339	  const isParam = (x, name, min = 2) => /^-\w/.test(x) && x.length - 1 >= Math.min(min, name.length) && name.startsWith(x.slice(1).replace(/:.*$/, '').toLowerCase());
   340	  const recurse = a.some((x) => isParam(x, 'recurse', 1));
   341	  const targets = [];
   342	  for (let i = 0; i < a.length; i++) {
   343	    const x = a[i];
   344	    if (isParam(x, 'path', 1) || isParam(x, 'literalpath', 1) || /^-(?:lp|pspath)$/i.test(x)) { if (a[i + 1] != null) targets.push(...a[++i].split(',')); continue; }
   345	    if (/^-/.test(x)) { if (/^-(?:include|exclude|filter|credential|stream)/i.test(x)) i++; continue; }
   346	    targets.push(...x.split(','));
   347	  }
   348	  if (recurse && targets.some((t) => PS_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive Remove-Item on a drive root, home or *', true);
   349	}
   350	
   351	const CMD_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*\*?(?:\.\*)?|[\\/]+\*?|\*(?:\.\*)?|%(?:USERPROFILE|HOMEDRIVE|HOMEPATH|SystemDrive|SystemRoot|windir)%[\\/]*\*?(?:\.\*)?)$/i;
   352	
   353	// cmd.exe rd/rmdir/del/erase (also reached from PowerShell aliases with cmd-style switches)
   354	function cmdDelCheck(words, hit) {
   355	  hit('high', 'deletes files permanently');
   356	  const a = words.slice(1);
   357	  const recursive = a.some((x) => /^\/s$/i.test(x));
   358	  if (recursive && a.filter((x) => !/^\/\w$/.test(x)).some((t) => CMD_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive delete of a drive root or home', true);
   359	}
   360	
   361	// /, ~, $HOME, system directories, drive roots (not the relative ., .., * that rm -r also treats as critical)
   362	const critTarget = (t) => { const s = String(t).trim(); return ((POSIX_CRIT_TARGET.test(s) || PS_CRIT_TARGET.test(s)) && !/^(?:\.{1,2}\/*\*?|\*|\.\*|\.\/+\*)$/.test(s)) || sysCrit(s); };
   363	const SYS_PATH = /^\/+(?:etc|boot|bin|sbin|usr|lib\w*|dev|proc|sys)(?:\/|$)/;
   364	const NULL_SRC = /^\/dev\/(?:null|zero|u?random)$/;
   365	const positional = (args) => { const out = []; let opts = true; for (const a of args) { if (opts && a === '--') { opts = false; continue; } if (opts && /^-./.test(a)) continue; out.push(a); } return out; };
   366	
   367	// find's own leading options (-H -L -P -O3 -D debugopts) come before the starting points
   368	const findArgs = (w) => { let a = w.slice(1); for (;;) { if (/^-[HLP]$|^-O\d*$/.test(a[0] || '')) a = a.slice(1); else if (a[0] === '-D') a = a.slice(2); else return a; } };
   369	
   370	// find ROOT... -delete / -exec rm: bulk deletion; critical on /, ~, C:\ ...
   371	function findCheck(w, hit) {
   372	  const a = findArgs(w);
   373	  const roots = [];
   374	  for (const x of a) { if (/^[-(!]/.test(x)) break; roots.push(x); }
   375	  const del = a.includes('-delete') || a.some((x, i) => /^-(?:exec|execdir|ok|okdir)$/.test(x) && /^(?:\S*\/)?(?:rm|shred|unlink)$/.test(a[i + 1] || ''));
   376	  if (del && roots.some(critTarget)) hit('high', 'bulk deletion under /, ~ or a drive root', true);
   377	}
   378	
   379	// rsync --delete … DEST: makes DEST identical to the source, deleting everything else in it
   380	function rsyncCheck(w, hit) {
   381	  const a = w.slice(1);
   382	  if (!a.some((x) => /^--(?:delete|del$|remove-source-files)/.test(x))) return;
   383	  hit('high', 'rsync --delete removes files in the destination');
   384	  const pos = positional(a);
   385	  if (pos.length && critTarget(pos[pos.length - 1])) hit('high', 'rsync --delete onto /, ~ or a drive root', true);
   386	}
   387	
   388	// cp/mv/install/ln onto system files; /dev/null (or zero/random) copied over a file destroys it
   389	function copyCheck(w, hit) {
   390	  const pos = positional(w.slice(1));
   391	  if (pos.length < 2) return;
   392	  const dst = pos[pos.length - 1];
   393	  const srcs = pos.slice(0, -1);
   394	  if (SYS_PATH.test(normTarget(dst)) || normTarget(dst) === '/') hit('high', 'overwrites a system file or directory');
   395	  // moving /etc, /usr, ~ ... away is as destructive as deleting them
   396	  if (w[0].replace(/^.*[\\/]/, '') === 'mv') {
   397	    if (srcs.some(critTarget)) hit('high', 'moves a system or home directory away', true);
   398	    else if (srcs.some((x) => SYS_PATH.test(normTarget(x)))) hit('high', 'moves a system file');
   399	  }
   400	  if (srcs.some((s) => NULL_SRC.test(s)) && !/^\/dev\//.test(dst)) hit('high', `overwrites ${dst} with ${srcs.find((s) => NULL_SRC.test(s))}`, SYS_PATH.test(dst));
   401	}
   402	
   403	const LISTERS = /^(?:get-childitem|gci|dir|ls|get-item|gi)$/i;
   404	// `Get-ChildItem C:\ -Recurse … | Remove-Item`, `find / … | xargs rm`: listing a root, deleting the results
   405	function pipelineDeleteCheck(text, hit) {
   406	  for (const stmt of String(text).split(/[;\n]|&&|\|\|/)) {
   407	    const segs = stmt.split('|').map((p) => commandWords(simpleCommands(p, { winPaths: true })[0] || []));
   408	    for (let i = 0; i < segs.length - 1; i++) {
   409	      const w = segs[i];
   410	      if (!w.length) continue;
   411	      const head = w[0].replace(/^.*[\\/]/, '').toLowerCase();
   412	      let rootList = false;
   413	      if (head === 'find') { const roots = []; for (const x of findArgs(w)) { if (/^[-(!]/.test(x)) break; roots.push(x); } rootList = roots.some(critTarget); }
   414	      else if (LISTERS.test(head)) {
   415	        const a = w.slice(1);
   416	        const rec = a.some((x) => /^-r(?:e(?:c(?:u(?:r(?:s(?:e)?)?)?)?)?)?$/i.test(x)) || head === 'ls' && a.some((x) => /^-[a-zA-Z]*R/.test(x));
   417	        const targets = [];
   418	        for (let k = 0; k < a.length; k++) {
   419	          if (/^-(?:path|literalpath|lp|pspath)$/i.test(a[k])) { if (a[k + 1] != null) targets.push(a[++k]); continue; }
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

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/catalog.js src/variants.js src/slots.js src/tagger.js scripts/gen_data.js' in /workspace/tellsh
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
/bin/bash -lc "node --input-type=module <<'JS'
import { suggest } from './src/pipeline.js';
import { joinArgs } from './src/shellwords.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const words of [['npm','install','lodash with npm'], ['install','lodash with npm'], ['git','push','branch main'],['merge','pr','branch main'],['merge','pr','feature/foo bar'], ['npm','install','express lodash'], ['delete','branch','my branch']]) {
 const j=joinArgs(words); const r=suggest(j.text,{env,unclearArgs:j.unclear}); console.log(JSON.stringify({words,j,cmd:r.command,missing:r.missing,warnings:r.warnings,slots:r.slots}));
}
JS" in /workspace/tellsh
 succeeded in 72ms:
{"words":["npm","install","lodash with npm"],"j":{"text":"npm install \"lodash with npm\"","unclear":["lodash with npm"]},"cmd":"npm install <PKG>","missing":["pkg"],"warnings":[],"slots":{}}
{"words":["install","lodash with npm"],"j":{"text":"install \"lodash with npm\"","unclear":["lodash with npm"]},"cmd":"npm install <PKG>","missing":["pkg"],"warnings":[],"slots":{}}
{"words":["git","push","branch main"],"j":{"text":"git push \"branch main\"","unclear":["branch main"]},"cmd":"git push origin <BRANCH>","missing":["branch"],"warnings":[],"slots":{}}
{"words":["merge","pr","branch main"],"j":{"text":"merge pr \"branch main\"","unclear":["branch main"]},"cmd":"gh pr merge <PR>","missing":["pr"],"warnings":[],"slots":{}}
{"words":["merge","pr","feature/foo bar"],"j":{"text":"merge pr \"feature/foo bar\"","unclear":[]},"cmd":"gh pr merge <PR>","missing":["pr"],"warnings":["path left as a placeholder: the request names more paths than gh_pr_merge takes (feature/foo bar); run it once per path"],"slots":{}}
{"words":["npm","install","express lodash"],"j":{"text":"npm install \"express lodash\"","unclear":["express lodash"]},"cmd":"npm install <PKG>","missing":["pkg"],"warnings":[],"slots":{}}
{"words":["delete","branch","my branch"],"j":{"text":"delete branch \"my branch\"","unclear":["my branch"]},"cmd":"git branch -d <BRANCH>","missing":["branch"],"warnings":[],"slots":{}}

exec
/bin/bash -lc "cat scripts/hybrid/sets.js; sed -n '1,225p' scripts/hybrid/eval_hybrid.js; cat scripts/hybrid/fetch_model.js; git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- scripts/gen_data.js" in /workspace/tellsh
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
  const S = { n: 0, filled: 0, found: 0, exact: 0 };
  for (const r of realRows) {
    const env = envOf(r);
    const s = await run(sys, r.text, env);
    if (/C/.test(sys) && s.hybrid?.deferred && !LM.has(key(r.text, env))) continue;
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
 

exec
/bin/bash -lc "git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/history.js | sed -n '1,210p'; nl -ba scripts/real/prepare_real.js | sed -n '63,84p'; nl -ba scripts/hybrid/prune_vocab.py | sed -n '27,49p'; rg -n 'prun|blind|vocab' HYBRID.md | head -25" in /workspace/tellsh
 succeeded in 0ms:
diff --git a/src/history.js b/src/history.js
index 1beb1e0..3b05775 100644
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
@@ -263,178 +356,559 @@ function entsFromSlots(intent, slots, ents) {
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
15:* **Real usage was the blind spot.** On held-out real requests (2957 EN/PL rows; command groups never seen in training),
26:  shell-phrased requests (96.4 → 95.2%), 0.5 pt on the hybrid blind set; A+B is unchanged or better everywhere
27:  (`data/eval` 96.7 → 96.7%, shell 98.8 → 98.2%, both blind sets 99.2 / 99.3%). End-to-end exact command on relexicalised
29:* **Out-of-domain**: chit-chat rejection is ~unchanged (A 94.6 → 92.4% on `data/ood_eval`, blind OOD 100%/98.4%).
49:  ~1 pt (real usage A+B 88.8 → 88.3%, blind OOD rejection 98.4 → 96.9%, relex e2e 86.8 → 85.4%). **C-ft was trained on
62:  98.5 → 98.2%, hybrid blind 99.4 → 99.2%, v0.4 devtools 97.9 → 97.6%; OOD rejection unchanged. A+B defers more often
102:  pools). C rows without an LM score are skipped (blind e2e n=193/194). Latency was measured on a shared, loaded box.
129:| hybrid blind | A v0.3 | 641 | 99.2% | **98.9%** | 98.2% | 99.7% | 100.0% | 98.9% | – |
130:| hybrid blind | A v0.4 | 641 | 98.8% | **98.4%** | 97.9% | 99.0% | 99.8% | 98.6% | – |
131:| hybrid blind | A+B v0.3 | 641 | 99.4% | **98.8%** | 98.5% | 99.0% | 100.0% | 98.8% | 10.8% |
132:| hybrid blind | A+B v0.4 | 641 | 99.4% | **99.2%** | 98.5% | 100.0% | 100.0% | 99.2% | 12.0% |
133:| hybrid blind | A+B-safe v0.3 | 641 | 99.4% | **98.8%** | 98.5% | 99.0% | 100.0% | 98.8% | 10.8% |
134:| hybrid blind | A+B-safe v0.4 | 641 | 99.2% | **99.1%** | 98.2% | 100.0% | 99.8% | 99.2% | 12.0% |
135:| hybrid blind | B alone v0.3 | 641 | 95.8% | **89.4%** | 89.7% | 89.0% | 100.0% | 89.4% | 100.0% |
136:| hybrid blind | B alone v0.4 | 641 | 97.7% | **95.9%** | 96.1% | 95.8% | 100.0% | 95.9% | 100.0% |
137:| hybrid blind | A+C-ft v0.3 | 641 | 99.7% | **99.4%** | 99.4% | 99.4% | 100.0% | 99.4% | 10.8% |
138:| hybrid blind | A+C-ft v0.4 | 641 | 99.7% | **99.2%** | 99.1% | 99.4% | 100.0% | 99.2% | 12.0% |
139:| v0.3 blind | A v0.3 | 844 | 99.2% | **98.5%** | 97.9% | 99.0% | 99.4% | 99.0% | – |
140:| v0.3 blind | A v0.4 | 844 | 99.4% | **98.3%** | 97.7% | 99.0% | 99.2% | 99.2% | – |
141:| v0.3 blind | A+B v0.3 | 844 | 99.4% | **99.1%** | 99.1% | 99.0% | 100.0% | 99.1% | 12.2% |
142:| v0.3 blind | A+B v0.4 | 844 | 99.6% | **99.3%** | 99.1% | 99.5% | 100.0% | 99.3% | 12.2% |
143:| v0.3 blind | A+B-safe v0.3 | 844 | 99.3% | **98.7%** | 98.4% | 99.0% | 99.4% | 99.3% | 12.2% |
144:| v0.3 blind | A+B-safe v0.4 | 844 | 99.4% | **98.5%** | 98.2% | 98.8% | 99.2% | 99.3% | 12.2% |
145:| v0.3 blind | B alone v0.3 | 844 | 97.2% | **91.4%** | 91.2% | 91.5% | 100.0% | 91.4% | 100.0% |
146:| v0.3 blind | B alone v0.4 | 844 | 98.5% | **95.4%** | 94.7% | 96.1% | 99.9% | 95.5% | 100.0% |

exec
/bin/bash -lc "node --input-type=module <<'JS'
import { suggest } from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const [h,q] of [['git diff HEAD~1','delete it'], ['git log -1 --oneline','delete it'], ['git show HEAD:src/index.js','delete it'], ['git checkout foo.txt','delete it'], ['docker logs web','stop it'],['docker inspect web db','stop it'],['systemctl status --host=prod nginx','restart it'],['systemctl -H prod status nginx','restart it'], ['npm --prefix /srv/app install lodash','same for express'],['gh pr view 12 --repo org/other','same but merge'],['tellsh --dry-run \"merge pr from the branch main\"','same but merge']]) {const r=suggest(q,{env,history:[h]});console.log(JSON.stringify({h,q,cmd:r.command,missing:r.missing,context:r.context,intent:r.intent}));}
JS" in /workspace/tellsh
 succeeded in 120ms:
{"h":"git diff HEAD~1","q":"delete it","cmd":"rm 'HEAD~1'","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = HEAD~1"},"intent":"delete_file"}
{"h":"git log -1 --oneline","q":"delete it","cmd":"rm <FILE>","missing":["file"],"context":{"used":true,"commands":1,"rule":"refused","note":"the previous command names nothing the reference could mean; not guessing"},"intent":"delete_file"}
{"h":"git show HEAD:src/index.js","q":"delete it","cmd":"rm <FILE>","missing":["file"],"context":{"used":true,"commands":1,"rule":"refused","note":"the previous command names nothing the reference could mean; not guessing"},"intent":"delete_file"}
{"h":"git checkout foo.txt","q":"delete it","cmd":"git branch -d <BRANCH>","missing":["branch"],"context":{"used":true,"commands":1,"rule":"refused","note":"foo.txt is the checked-out branch (the previous command switched to it); not guessing"},"intent":"git_delete_branch"}
{"h":"docker logs web","q":"stop it","cmd":"docker stop web","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"container\" from history = web"},"intent":"docker_stop"}
{"h":"docker inspect web db","q":"stop it","cmd":"docker stop web","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"container\" from history = web"},"intent":"docker_stop"}
{"h":"systemctl status --host=prod nginx","q":"restart it","cmd":"sudo systemctl restart nginx","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"service\" from history = nginx"},"intent":"service_restart"}
{"h":"systemctl -H prod status nginx","q":"restart it","cmd":"sudo systemctl restart status","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"service\" from history = status"},"intent":"service_restart"}
{"h":"npm --prefix /srv/app install lodash","q":"same for express","cmd":null,"missing":[],"context":{"used":true,"commands":1,"rule":"refused","note":"the previous command is not one tellsh can repeat; not guessing"}}
{"h":"gh pr view 12 --repo org/other","q":"same but merge","cmd":null,"missing":[],"context":{"used":true,"commands":1,"rule":"refused","note":"the previous command is not one tellsh can repeat; not guessing"}}
{"h":"tellsh --dry-run \"merge pr from the branch main\"","q":"same but merge","cmd":"gh pr merge","missing":[],"context":{"used":true,"commands":1,"rule":"same-but","note":"modifies previous gh_pr_merge"},"intent":"gh_pr_merge"}

exec
/bin/bash -lc "git show 0d87457cb7740ec6fa99db260b63b35cfdbb751c:src/history.js | sed -n '280,430p'; cat test/regressions16.test.js; cat scripts/lib/jev.js; sed -n '1,180p' scripts/teacher.js" in /workspace/tellsh
 succeeded in 0ms:
  const k = lineKind(t, kind);
  const tm = t.match(/^(?:npx\s+(?:-y\s+)?)?tellsh\s+(.*)$/s);
  if (tm) {
    const w = wordsOf(tm[1], k);
    const q = w ? w.filter((x) => !/^-/.test(x)).map(rawOf).join(' ') : '';
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
// Regression tests for round 15: the round-14 findings (review/r14-claude.md, review/r14-codex.md). An explicit pull
// request selector (`feature/apply`, `hotfix/weekly`, `#12-only`, `from feature-only`) is kept, never dropped by the
// describing-word list; a describing word after "branch" is withheld; a quoted target ends at its matching quote;
// values a command saw under `systemd-run -p WorkingDirectory=…` / `-p RootDirectory=…` stay ambiguous.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'pwsh', os: 'windows' }, { shell: 'cmd', os: 'windows' }];
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });

test('major: an explicit branch selector ending in a describing word is kept', () => {
  const kept = {
    'merge pr feature/apply': 'gh pr merge feature/apply', 'merge pull request fix-reply': 'gh pr merge fix-reply',
    'merge pr hotfix/weekly': 'gh pr merge hotfix/weekly', 'merge pull request release/monthly': 'gh pr merge release/monthly',
    'view pr fix/assembly': 'gh pr view fix/assembly', 'merge pr #12-only': 'gh pr merge 12-only',
    'merge pull request from feature-only': 'gh pr merge feature-only', 'merge pr from nightly': 'gh pr merge nightly',
  };
  for (const env of SHELLS) {
    for (const [q, cmd] of Object.entries(kept)) {
      const r = run(q, null, env);
      assert.equal(r.command, cmd, `${env.shell}: ${q}`);
      assert.deepEqual(r.missing, [], `${env.shell}: ${q}`);
    }
    // named but unclear: withheld, never a bare `gh pr merge`
    for (const q of ['merge pull request for branch status', 'merge pr nightly', 'merge pull request "bob\'s fix"', "merge pr 'it''s'"]) {
      const r = run(q, null, env);
      assert.equal(r.command, 'gh pr merge <PR>', `${env.shell}: ${q}`);
      assert.deepEqual(r.missing, ['pr'], `${env.shell}: ${q}`);
    }
  }
});

test('minor: a quoted target ends at its matching quote; time / review words are not targets', () => {
  // the apostrophe no longer cuts the value ("bob"): the whole value fails validation and is withheld
  for (const q of ['merge pull request "bob\'s-fix"', 'merge pull request "don\'t-merge-yet"']) {
    assert.equal(run(q).command, 'gh pr merge <PR>', q);
  }
  assert.equal(run('merge pull request “feature/x”').command, 'gh pr merge feature/x');
  for (const [q, cmd] of Object.entries({ 'view pr from yesterday': 'gh pr view', 'merge pr for review': 'gh pr merge',
    'merge pr from fork': 'gh pr merge', 'merge pull request quickly': 'gh pr merge' })) assert.equal(run(q).command, cmd, q);
});

test('major: systemd-run unit properties that move the filesystem keep history paths ambiguous', () => {
  for (const h of ['systemd-run -p WorkingDirectory=/srv cat notes.txt', 'systemd-run --property=WorkingDirectory=/srv cat notes.txt',
    'systemd-run --property WorkingDirectory=/srv cat notes.txt', 'systemd-run -pWorkingDirectory=/srv cat notes.txt',
    'systemd-run -p RootDirectory=/srv cat /etc/example.conf', 'systemd-run --property=RootDirectory=/srv cat /etc/example.conf',
    'sudo systemd-run -p BindPaths=/a:/etc cat /etc/example.conf', 'run0 --property=RootDirectory=/srv cat /etc/example.conf']) {
    const r = run('delete it', [h]);
    assert.equal(r.command, 'rm <FILE>', h);
  }
  assert.equal(run('kill it', ['systemd-run -p PrivatePIDs=yes ps -p 42']).command, 'kill <PID>');
  // other properties, and an absolute path under another working directory, still resolve
  assert.equal(run('delete it', ['systemd-run -p Nice=5 cat notes.txt']).command, 'rm notes.txt');
  assert.equal(run('delete it', ['systemd-run -p WorkingDirectory=/srv cat /etc/example.conf']).command, 'rm /etc/example.conf');
  assert.equal(run('kill it', ['systemd-run -p Nice=5 ps -p 42']).command, 'kill 42');
});
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

codex
I confirmed a remaining PR-target bug: `merge pr from the branch main` produces bare `gh pr merge` with no missing operand. That targets the current branch’s PR despite the named branch. I’m finishing the training-split checks and verifying the source locations.
exec
/bin/bash -lc "git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/catalog.js; nl -ba src/fill.js | sed -n '283,352p'; cat scripts/real/real_rows.js; cat test/hybrid.test.js" in /workspace/tellsh
 succeeded in 0ms:
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
   283	const DERIVED_REQUIRED = { namepat: 'name', glob: 'ext', sedexpr: 'old' };
   284	
   285	const SIZE_MULT = { c: 1, k: 1024, M: 1024 ** 2, G: 1024 ** 3 };
   286	/** Slots derived from others so every shell can use the unit it needs (find: -mmin/-size, PowerShell: minutes/bytes). */
   287	export function deriveSlots(v) {
   288	  if (v.glob && v.ext == null) { const m = String(v.glob).match(/^\*\.([\w]+)$/); if (m) v.ext = m[1]; }
   289	  if (v.minutes == null && v.age) {
   290	    const m = String(v.age).match(/^-m(min|time) -(\d+)$/);
   291	    if (m) v.minutes = m[1] === 'min' ? +m[2] : +m[2] * 1440;
   292	  }
   293	  if (v.sizeBytes == null && v.size != null) {
   294	    const m = String(v.size).match(/^(\d+)([ckMG]?)$/);
   295	    if (m) v.sizeBytes = +m[1] * (SIZE_MULT[m[2]] ?? 512);
   296	  }
   297	  return v;
   298	}
   299	
   300	/** env from the legacy `platform` option */
   301	export const envFromPlatform = (platform = process.platform) => ({
   302	  shell: 'bash',
   303	  os: platform === 'darwin' ? 'darwin' : platform === 'win32' ? 'win32' : 'linux',
   304	  coreutils: platform === 'darwin' ? 'bsd' : 'gnu',
   305	});
   306	
   307	/**
   308	 * Build a full suggestion for an intent and query.
   309	 *   env: { shell, os, coreutils } (default: bash on `platform`)
   310	 *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
   311	 * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}
   312	 */
   313	export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [], keepOptional = [] } = {}) {
   314	  const intent = BY_ID[intentId];
   315	  if (!intent) throw new Error(`unknown intent ${intentId}`);
   316	  const e = env || envFromPlatform(platform);
   317	  const resolved = given || resolveSlots(intent, extracted || extractSlots(text));
   318	  const defaults = { ...intent.slots, ...(e.os === 'darwin' ? intent.darwinDefaults : {}) };
   319	  const values = {};
   320	  for (const [k, d] of Object.entries(defaults)) if (d != null) values[k] = d;
   321	  Object.assign(values, resolved);
   322	  // blank: slots withheld on purpose (refused reference, ambiguous path): no default stands in for them
   323	  for (const k of blank) if (resolved[k] == null) delete values[k];
   324	  // the filesystem root ("whole disk", "na całym dysku") is the system drive for Windows shells
   325	  if (e.os === 'win32' && (e.shell === 'powershell' || e.shell === 'cmd')) {
   326	    for (const k of PATH_SLOTS) if (values[k] === '/') values[k] = 'C:\\';
   327	  }
   328	  deriveSlots(values);
   329	  const required = [...new Set([...Object.entries(intent.slots).filter(([, d]) => d == null).map(([k]) => k), ...blank.filter((k) => !(k in values))])];
   330	
   331	  const choice = chooseTemplate(intent, e);
   332	  const base = {
   333	    intent: intent.id, description: intent.description, baseRisk: intent.risk, slots: resolved,
   334	    notes: intent.notes || null, shell: e.shell, os: e.os, variant: choice.variant || null,
   335	  };
   336	  if (choice.gap) {
   337	    return { ...base, command: null, gap: choice.gap, risk: intent.risk, warnings: [], critical: false, missing: [] };
   338	  }
   339	  const baseQuote = quoteForKind(choice.kind, choice.wrapPosix);
   340	  const tpl = choice.tpl;
   341	  const pwshNative = choice.kind === 'pwsh' && !choice.wrapPosix;
   342	  const nativeSlots = pwshNative ? pwshNativeSlots(tpl) : new Set();
   343	  const quote = !pwshNative ? baseQuote : (v, o = {}) => {
   344	    // function templates: every value is checked (the target program is not known statically)
   345	    if ((typeof tpl === 'function' || nativeSlots.has(o.name)) && unsafeNativePwshArg(v)) {
   346	      throw new UnquotableError(`value ${JSON.stringify(String(v))} cannot be passed to a native program safely by PowerShell < 7.3 (embedded " or trailing \\)`);
   347	    }
   348	    return baseQuote(v, o);
   349	  };
   350	  let command;
   351	  let missing = [];
   352	  try {
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
/bin/bash -lc "node --input-type=module <<'JS'
import assert from 'node:assert/strict';
import {suggest} from './src/pipeline.js';
for(const env of [{shell:'bash',os:'linux',coreutils:'gnu'},{shell:'powershell',os:'win32',coreutils:'gnu'},{shell:'cmd',os:'win32',coreutils:'gnu'}]) {
 for(const query of ['merge pr from the branch main','merge the pull request from the branch release','merge pr for the branch develop']) {
  const r=suggest(query,{env});
  assert.equal(r.command,'gh pr merge'); assert.deepEqual(r.missing,[]);
  console.log(JSON.stringify({shell:env.shell,query,command:r.command,missing:r.missing}));
 }
}
JS" in /workspace/tellsh
 succeeded in 84ms:
{"shell":"bash","query":"merge pr from the branch main","command":"gh pr merge","missing":[]}
{"shell":"bash","query":"merge the pull request from the branch release","command":"gh pr merge","missing":[]}
{"shell":"bash","query":"merge pr for the branch develop","command":"gh pr merge","missing":[]}
{"shell":"powershell","query":"merge pr from the branch main","command":"gh pr merge","missing":[]}
{"shell":"powershell","query":"merge the pull request from the branch release","command":"gh pr merge","missing":[]}
{"shell":"powershell","query":"merge pr for the branch develop","command":"gh pr merge","missing":[]}
{"shell":"cmd","query":"merge pr from the branch main","command":"gh pr merge","missing":[]}
{"shell":"cmd","query":"merge the pull request from the branch release","command":"gh pr merge","missing":[]}
{"shell":"cmd","query":"merge pr for the branch develop","command":"gh pr merge","missing":[]}

exec
/bin/bash -lc "node test/regressions16.test.js; node test/regressions17.test.js; node --input-type=module <<'JS'
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const source = readFileSync('scripts/real/prepare_real.js','utf8');
const strip = source.match(/"'^const strip = .*;$/m)[0];
const group = source.slice(source.indexOf('"'function group(cmd)'),source.indexOf('// redaction placeholders'));
const fn = runInNewContext("'`${strip}'"\\n"'${group}'"\\ngroup"'`);
for(const cmd of ['"'npm install lodash','npm install express','pip install requests','pip install flask','gh pr view 12 --repo a/b','gh pr view 40 --repo c/d']) console.log(JSON.stringify({cmd,group:fn(cmd)}));
JS
 git status --short" in /workspace/tellsh
 succeeded in 802ms:
TAP version 13
# Subtest: major: an explicit branch selector ending in a describing word is kept
ok 1 - major: an explicit branch selector ending in a describing word is kept
  ---
  duration_ms: 109.589533
  ...
# Subtest: minor: a quoted target ends at its matching quote; time / review words are not targets
ok 2 - minor: a quoted target ends at its matching quote; time / review words are not targets
  ---
  duration_ms: 20.470565
  ...
# Subtest: major: systemd-run unit properties that move the filesystem keep history paths ambiguous
ok 3 - major: systemd-run unit properties that move the filesystem keep history paths ambiguous
  ---
  duration_ms: 100.028524
  ...
1..3
# tests 3
# suites 0
# pass 3
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 247.978064
TAP version 13
# Subtest: major: a number that is not next to "pr" is never the pull request
ok 1 - major: a number that is not next to "pr" is never the pull request
  ---
  duration_ms: 91.837009
  ...
# Subtest: major: a named pull request that does not parse is withheld, never a bare merge
ok 2 - major: a named pull request that does not parse is withheld, never a bare merge
  ---
  duration_ms: 19.700392
  ...
# Subtest: major: history replay keeps the placeholder of an optional operand it withholds
ok 3 - major: history replay keeps the placeholder of an optional operand it withholds
  ---
  duration_ms: 43.480057
  ...
# Subtest: minor: abbreviations, hosts and issues are not pull request selectors
ok 4 - minor: abbreviations, hosts and issues are not pull request selectors
  ---
  duration_ms: 3.431708
  ...
# Subtest: minor: clustered -p and more root-changing systemd-run properties keep history paths ambiguous
ok 5 - minor: clustered -p and more root-changing systemd-run properties keep history paths ambiguous
  ---
  duration_ms: 40.995418
  ...
1..5
# tests 5
# suites 0
# pass 5
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 218.990305
{"cmd":"npm install lodash","group":"npm install lodash  #0"}
{"cmd":"npm install express","group":"npm install express  #0"}
{"cmd":"pip install requests","group":"pip install requests  #0"}
{"cmd":"pip install flask","group":"pip install flask  #0"}
{"cmd":"gh pr view 12 --repo a/b","group":"gh pr view --repo #2"}
{"cmd":"gh pr view 40 --repo c/d","group":"gh pr view --repo #2"}
?? review/r16-claude.md
?? review/r16-codex.md

codex
- **Major — [src/fill.js:83](/workspace/tellsh/src/fill.js:83): Named PR branches still disappear.** `merge pr from the branch main`, `merge pr for the branch develop`, and `merge the pull request from the branch release` all produce `gh pr merge` with `missing: []`. Confirmed for bash, PowerShell, and cmd. The parser stops at “the”; the fallback only withholds names containing digits or punctuation. Consequently, confirming the suggestion can merge the current branch’s PR instead. Parse the complete branch phrase or preserve `<PR>` when the named target cannot be resolved.

- **Minor — [scripts/real/prepare_real.js:71](/workspace/tellsh/scripts/real/prepare_real.js:71): Command grouping still retains operand values.** `npm install lodash` and `npm install express` receive different groups because package names are consumed as subcommands. Equivalent command structures can therefore cross the train/eval boundary, weakening the claimed holdout by command structure. Recognize subcommands per tool and mask the remaining operands.

All eight tests in `regressions16` and `regressions17` pass. Full-suite verification was limited by sandbox `EROFS` and subprocess `EPERM` failures. No files changed.

VERDICT: REQUEST_CHANGES
tokens used
165,522
- **Major — [src/fill.js:83](/workspace/tellsh/src/fill.js:83): Named PR branches still disappear.** `merge pr from the branch main`, `merge pr for the branch develop`, and `merge the pull request from the branch release` all produce `gh pr merge` with `missing: []`. Confirmed for bash, PowerShell, and cmd. The parser stops at “the”; the fallback only withholds names containing digits or punctuation. Consequently, confirming the suggestion can merge the current branch’s PR instead. Parse the complete branch phrase or preserve `<PR>` when the named target cannot be resolved.

- **Minor — [scripts/real/prepare_real.js:71](/workspace/tellsh/scripts/real/prepare_real.js:71): Command grouping still retains operand values.** `npm install lodash` and `npm install express` receive different groups because package names are consumed as subcommands. Equivalent command structures can therefore cross the train/eval boundary, weakening the claimed holdout by command structure. Recognize subcommands per tool and mask the remaining operands.

All eight tests in `regressions16` and `regressions17` pass. Full-suite verification was limited by sandbox `EROFS` and subprocess `EPERM` failures. No files changed.

VERDICT: REQUEST_CHANGES
