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
session id: 01a128f3-7559-7373-b219-5b4509c9460f
--------
user
Re-review of tellsh (git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD; runtime src/ bin/, training scripts). History refs are intentionally limited to 1 line back. Read-only. Findings with severity and file:line. End with exactly one line that is either VERDICT: APPROVE (no blocker/major) or VERDICT: REQUEST_CHANGES.
codex
I’ll inspect the diff and trace the affected runtime and training paths, then report actionable findings with severity and file:line references.
exec
/bin/bash -lc "pwd; rg --files -g AGENTS.md -g '"'!node_modules'"' -g '"'!vendor'"'" in /workspace/tellsh
 exited 1 in 0ms:
/workspace/tellsh

exec
/bin/bash -lc 'git status --short; git diff --stat 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD; git log -1 --oneline' in /workspace/tellsh
 succeeded in 0ms:
?? review/r13-claude.md
?? review/r13-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   468 +-
 HYBRID.md                                    |   610 ++
 README.md                                    |   162 +-
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
 src/fill.js                                  |   100 +-
 src/history.js                               |   927 ++-
 src/model.js                                 |    22 +-
 src/pipeline.js                              |   425 +-
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
 185 files changed, 153003 insertions(+), 802 deletions(-)
3d52abc review status: fix12 done marker + log

exec
/bin/bash -lc 'ls -la; cat package.json; cat review/fix12-log.md; cat review/r12-claude.md' in /workspace/tellsh
 succeeded in 0ms:
total 244
drwxr-xr-x 14 box box  4096 Oct 10 21:05 .
drwxr-xr-x  1 box box 49152 Oct 11 05:07 ..
drwxr-xr-x  3 box box  4096 Oct 10 10:57 .claude
drwxr-xr-x  9 box box  4096 Oct 11 05:13 .git
-rw-r--r--  1 box box   371 Oct 10 16:27 .gitignore
-rw-r--r--  1 box box  2528 Oct 10 08:13 DATA_LICENSES.md
-rw-r--r--  1 box box 41246 Oct 11 05:12 EVAL.md
-rw-r--r--  1 box box 52068 Oct 11 01:09 HYBRID.md
-rw-r--r--  1 box box  1062 Oct 10 07:21 LICENSE
-rw-r--r--  1 box box 28500 Oct 11 05:12 README.md
drwxr-xr-x  2 box box  4096 Oct 10 07:20 bin
drwxr-xr-x  6 box box  4096 Oct 10 22:30 build
drwxr-xr-x 15 box box  4096 Oct 10 16:32 data
drwxr-xr-x  5 box box  4096 Oct 10 16:30 hybrid
drwxr-xr-x  2 box box  4096 Oct 10 08:10 model
drwxr-xr-x 29 box box  4096 Oct 10 16:30 node_modules
-rw-r--r--  1 box box  2320 Oct 10 17:47 package.json
drwxr-xr-x  2 box box  4096 Oct 11 05:13 review
drwxr-xr-x  5 box box  4096 Oct 11 05:13 scripts
drwxr-xr-x  3 box box  4096 Oct 11 05:13 src
drwxr-xr-x  3 box box  4096 Oct 11 05:11 test
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
I fixed both Major findings from Codex's round-12 review and both cheap Minors, and committed them as `77b3a9d`. Nothing was pushed or published. All 329 tests pass, and history still reads only the previous line.

**1. A pull request the user names is no longer dropped** (`src/catalog.js`, `src/variants.js`, `src/fill.js`, `src/pipeline.js`)
- `gh pr view`, `gh pr checks` and `gh pr merge` now take the pull request as a number, a `github.com/…/pull/N` URL or a branch name.
  - `merge pull request https://github.com/owner/repo/pull/123` gives `gh pr merge https://github.com/owner/repo/pull/123`.
  - `merge pull request feature/login` gives `gh pr merge feature/login`. The same holds in PowerShell and cmd.
- If the named target isn't a valid number, URL or branch, the command shows a placeholder: `gh pr merge <PR>`. That covers a GitLab URL, `../x`, `foo;rm` and `-rf`.
- A plain `gh pr merge` (the current branch's pull request) now only comes out when no pull request is named, e.g. "merge the pull request".

**2. Commands run in another namespace no longer resolve "kill it"** (`src/history.js`)
- `nsenter` and `unshare` are now handled like `chroot`: every value from that history line is ambiguous.
- After `nsenter -t 1234 -p ps -p 42`, "kill it" is refused with `kill <PID>` instead of giving `kill 42`. The long forms (`--target`/`--pid`), `--net=…`, `-a`, `sudo nsenter …` and `--` behave the same.
- After `nsenter -n lsof -i :8080`, the port is withheld.
- I also checked `ip netns exec`, `docker`/`podman`/`kubectl`/`incus exec`, `lxc-attach`, `machinectl` and `toolbox`. None of them produces a pid or port that "kill it" could use (`docker exec web …` resolves to the container `web`, which is correct).
- Plain `ps -p 42` followed by "kill it" still gives `kill 42`.

**Minors:**
- **Version constraints:** they are now kept. `install requests==2.32.0 with pip` gives `python3 -m pip install requests==2.32.0`, and `django>=4,<5` and `requests[socks]==2.32.0` come out quoted. An invalid one (`requests==2.32.0;rm`) gives `<PKG>`.
  - This also fixed a related bug: `install typescript@^5.4 with npm` used to give `npm install npm`; it now gives `npm install 'typescript@^5.4'`.
- **`train_lm_gpu.py`:** it now trains on the last, partial batch, so a dataset smaller than the batch size no longer loops forever. It also stops with a clear error if there are no training rows. I checked that the file parses but didn't run training, since that needs a GPU.

**Tests, eval, bench, docs:**
- The new tests are in `test/regressions14.test.js`, and all four fail on the old code. Three existing tests needed the new `pr` value added to their fixtures.
- The eval numbers are identical to before. I re-ran the bench and updated it in `EVAL.md`; cold start p50 is 193 ms, up from 169 ms. The warm timings also rose slightly. I didn't investigate this; I assume it's run-to-run machine noise, since the baseline `node -e 0` startup varied too.
- I added a Round 13 note to `EVAL.md` and the new cases to the README.

**Not fixed:**
- **Classifier bug:** `show pull request feature/login` (and `open pull request feature/login`) is classified as creating a pull request and gives `gh pr create --fill`. "View" and "show" with a number route correctly. This is a classifier problem rather than slot filling, so I left it; tell me if you want it fixed.
- **Variant check:** `scripts/check_variants.js` reports one failure, `history_search [zsh] unknown key`. It failed the same way before these changes.

As in round 11, git had no identity set, so I committed as `lksrz <lukasz@wearfits.com>` without changing the git config. The empty `review/fix12-log.md` was already untracked and I left it out of the commit.
The round-11 fixes are correct and I found no new blocker or major. All 325 tests pass (`npm test`). I checked about 40 history lines with "delete it" and ran a handful of `checkDanger` and hybrid cases. The repo was not changed; the scratch script lives in `/tmp/r12p`.

**Round-11 Majors: all fixed**
- **`pkexec`** (`src/history.js:613`, `CWD_WRAPPERS`; `:631`): any `pkexec` prefix now refuses "delete it" and gives `rm <FILE>`. This covers the `/usr/bin/pkexec` path, `--user bob`, a preceding `nohup`, and `sudo pkexec`. Absolute paths still resolve: `pkexec cat /tmp/a` gives `rm /tmp/a`.
- **`run0`** (`src/history.js:610`; `src/danger.js:88`): these are now refused:
  - `-D`, `-D/srv`, `--chdir=` and `--chdir /srv`
  - `-u bob`, `-uroot`, `--user=` and `--user bob`
  - `-i` and `--via-shell`

  Options that don't change the directory still resolve to `rm notes.txt`, which is correct: `--nice=5`, `-g wheel`, `--setenv=`, `--property=`, `--background=`. `checkDanger` rates `run0 -u bob rm -rf /` and `run0 -D / rm -rf *` as `high`.
- **Redirects inside a subshell** (`src/history.js:500`): these are refused:
  - `(cd /repo && echo hi > notes.txt)`
  - the `>notes.txt`, `&>`, `1>`, `>|`, `2>` and `>>` forms
  - a nested `( … )`
  - `exec >`, a trailing `&`, `| cat`
  - `$( … )` and `<( … )`

  These still resolve correctly:
  - `(cd /repo && …) > out.txt` gives `rm out.txt`.
  - `{ cd /repo && echo hi > notes.txt; }` gives `rm notes.txt`.
  - `(cd /repo) ; echo hi > notes.txt` gives `rm notes.txt`.
  - `(cd /repo && echo hi > notes.txt) && cat notes.txt` gives `rm notes.txt`, which is right because the last `cat` runs in the user's own directory.
- **Hybrid rejection** (`src/rerank/hybrid.js:57`): when the encoder rejects, `topTool` is set to `__none__`, and the composer's guard at `src/pipeline.js:338` honours it. The catalog-side composer (`src/pipeline.js:559`) only runs on a confident catalog answer, so a rejected result can't reach it. The A+C policies have no `none` threshold, so they keep their old behaviour. The test with an accepting encoder still answers, so the fix doesn't over-reject.

## Findings

### Minor (carried over, not regressions)
1. **A `bash -c` string becomes one file name:** `bash -c "cd /r && echo > notes.txt"` + "delete it" gives `rm 'cd /r && echo > notes.txt'`. The base commit did the same, and the command just fails rather than deleting the wrong file.
2. **`cp -t /etc a` is rated `safe`** (`src/danger.js:284-289`).
3. **`scripts/hybrid/lm_rerank.py:203`** resumes scoring keyed only by `(set, i)`, with no check that the model, prompt or candidates changed. This only affects training and evaluation.
4. **A quoted argument containing request text becomes one path** (`src/shellwords.js:219-221`), as reported last round.

### Nits
5. **`run0 --user=root cat notes.txt` and `run0 -uroot …` are refused** even though root keeps the user's directory. It only refuses more often than needed (`src/history.js:610`).
6. Still present from last round: shortened `sudo` long options (`--logi`, `--chd`) aren't recognised, and `daemonize` / `start-stop-daemon` without `--chdir` (which run in `/`) aren't scoped.

VERDICT: APPROVE

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/pipeline.js src/cli.js bin/tellsh.js src/rerank' in /workspace/tellsh
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
index c5430f7..75a1a5d 100644
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
@@ -32,17 +34,66 @@ const PRONOUN_VALUE = /^(it|its|that|this|them|those|one|again|back|there|here|t
 
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
+  // pip requirements with a version constraint (`requests==2.32.0`, `django>=4,<5`, `uvicorn[standard]~=0.30`)
+  pkg: (v) => WORDISH(v) || /^@[\w.-]{1,64}\/[\w.-]{1,64}(?:@[\w.^~<>=*-]{1,32})?$/.test(v) ||
+    /^[A-Za-z][\w.-]{0,63}(?:\[[\w.,-]{1,64}\])?(?:(?:===?|[<>!~]=|[<>])[\w.*+!-]{1,32})(?:,(?:===?|[<>!~]=|[<>])[\w.*+!-]{1,32}){0,3}$/.test(v) ||
+    /^[A-Za-z][\w.-]{0,63}@[\^~]?[\w.*-]{1,32}$/.test(v),
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
@@ -52,31 +103,108 @@ export function validSlot(k, v) {
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
@@ -90,22 +218,35 @@ function flagTokens(cmd) {
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
@@ -113,17 +254,26 @@ export function suggest(query, opts = {}) {
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
@@ -134,29 +284,68 @@ export function suggest(query, opts = {}) {
 
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
@@ -169,73 +358,229 @@ export function suggest(query, opts = {}) {
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
  // pip requirements with a version constraint (`requests==2.32.0`, `django>=4,<5`, `uvicorn[standard]~=0.30`)
  pkg: (v) => WORDISH(v) || /^@[\w.-]{1,64}\/[\w.-]{1,64}(?:@[\w.^~<>=*-]{1,32})?$/.test(v) ||
    /^[A-Za-z][\w.-]{0,63}(?:\[[\w.,-]{1,64}\])?(?:(?:===?|[<>!~]=|[<>])[\w.*+!-]{1,32})(?:,(?:===?|[<>!~]=|[<>])[\w.*+!-]{1,32}){0,3}$/.test(v) ||
    /^[A-Za-z][\w.-]{0,63}@[\^~]?[\w.*-]{1,32}$/.test(v),
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
/bin/bash -lc 'cat scripts/train.py; cat scripts/hybrid/train_lm_gpu.py; cat scripts/hybrid/train_encoder.py' in /workspace/tellsh
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
/bin/bash -lc 'npm test' in /workspace/tellsh
exec
/bin/bash -lc "nl -ba src/pipeline.js | sed -n '285,570p'" in /workspace/tellsh
 succeeded in 0ms:
   285	  // ---- rule: "same for X" reuses the previous intent with one slot replaced ----
   286	  if (ref?.rule === 'same-for') {
   287	    const slots = validHistorySlots(ref.slots);
   288	    // a value that fails validation (a 300-character path, ...) is a placeholder, never `find .`
   289	    const blank = invalidHistorySlots(ref.slots);
   290	    // the new path ends in sentence punctuation (`same for /tmp/data!`): placeholder, as for any request
   291	    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null && BY_ID[ref.intent].risk !== 'safe' && trailingPunctAfter(query, slots[ref.changed])) {
   292	      blank.push(ref.changed);
   293	      delete slots[ref.changed];
   294	    }
   295	    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank });
   296	    const res = { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
   297	    const punct = blank.filter((k) => !invalidHistorySlots(ref.slots).includes(k));
   298	    if (punct.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${punct.join(', ')}); quote the path`];
   299	    if (punct.length < blank.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: it is not a valid value (${blank.filter((k) => !punct.includes(k)).join(', ')})`];
   300	    return res;
   301	  }
   302	  // ---- the reference cannot be resolved at all ("what about this", an older command to replay) ----
   303	  if (ref?.rule === 'refused' && ref.stop) {
   304	    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: ref.note };
   305	  }
   306	
   307	  const sb = ctx && !ref ? sameBut(query, ctx) : null;
   308	  // a request about the entries of the referenced directory does not use the history at all: its intent is read
   309	  // without the history features (they favour `delete_dir` for "delete log files in this folder")
   310	  // rerankTop: the re-ranker's own candidate count (A+B uses 5); independent of how many candidates are displayed
   311	  const c0 = cascade(query, { model, extras: ref?.contents ? envFeatures(env) : extras, top: Math.max(top, opts.rerankTop || 0), restrictTool: sb ? FAMILY_OF[sb.lastIntent] : undefined });
   312	  // rerank: optional hybrid hook (src/rerank/hybrid.js); history rules keep the linear cascade's decision
   313	  const c = opts.rerank && !sb && !ref ? opts.rerank(c0, { thr }) : c0;
   314	  const candidates = c.top.slice(0, Math.max(1, top)).map((t) => ({ intent: t.intent, tool: t.tool, p: +t.p.toFixed(4), description: BY_ID[t.intent]?.description }));
   315	  const tools = c.tools.map((t) => ({ tool: t.tool, p: +t.p.toFixed(4) }));
   316	  let intent = c.intent;
   317	  let confidence = c.confidence;
   318	  let method = 'catalog';
   319	  if ((ref?.rule === 'pronoun' || ref?.rule === 'refused') && ref.intent) { intent = ref.intent; method = 'history-rule'; confidence = Math.max(confidence, thr); }
   320	  if (sb) { method = 'history-rule'; confidence = Math.max(confidence, thr); context.rule = 'same-but'; context.note = `modifies previous ${sb.lastIntent}`; }
   321	  // "same but force" after `rm -r old; ls newdir`: the command it would modify is not the previous one
   322	  if (sb?.skipped && (BY_ID[sb.lastIntent].risk !== 'safe' || BY_ID[intent].risk !== 'safe')) {
   323	    context.rule = 'refused';
   324	    context.note = `the newest command that tellsh can modify (${sb.lastIntent}) is not the previous command; not guessing`;
   325	    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
   326	  }
   327	  // "same for api" after `docker --context prod logs web`: repeated here it would run against the default daemon
   328	  if (sb?.scoped) {
   329	    context.rule = 'refused';
   330	    context.note = `the previous command (${sb.lastIntent}) ran against another repository, directory or daemon (-C, --context, -H, ...); not guessing`;
   331	    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
   332	  }
   333	  const out = { ...base, confidence: +confidence.toFixed(4), tool: FAMILY_OF[intent] || c.tool, tools, candidates };
   334	
   335	  const tryCompose = (reason) => {
   336	    if (composeMode === 'off') return null;
   337	    // a place reference ("list files there", "tam") has no composer operand: never `find .` in its place
   338	    if (hasLocative(query) && composeMode !== 'force') return null;
   339	    // composer vocabulary and quoting are POSIX-only (fish treats \\ and \' as escapes inside single quotes)
   340	    if (env.shell === 'powershell' || env.shell === 'cmd' || env.shell === 'fish') return null;
   341	    const capable = c.tools.filter((t) => t.tool !== NONE);
   342	    if (c.topTool === NONE && composeMode !== 'force') return null;
   343	    const ci = composeInput(query, model, capable[0]?.tool, opts.unclearArgs);
   344	    const r = compose(query, capable, ci.ex, { patternOf: ci.pattern, nameOf: ci.nameOf });
   345	    if (!r || r.invalid) return r?.invalid ? { invalid: r.invalid, command: r.command } : null;
   346	    if (blocksAmbiguous(r, ci.ambiguousPaths)) return null;
   347	    // a value with a line break (`"/tmp/a\nb"`) is never composed into a command: the catalog withholds it too
   348	    if (/[\r\n]/.test(r.command)) return null;
   349	    // calibrated gate: confident stage-1 tool, or strong flag evidence (>= 2 triggered flags) for a likely tool
   350	    const pOf = capable.find((t) => t.tool === r.tool)?.p ?? 0;
   351	    if (composeMode !== 'force' && !(c.topToolP >= model.thresholds.compose || (r.triggered.length >= 2 && pOf >= 0.2))) return null;
   352	    return { ...out, understood: true, method: 'composed', experimental: true, reason, intent: null, description: `composed ${r.tool}${r.sub ? ' ' + r.sub : ''} command (experimental)`,
   353	      command: r.command, risk: r.risk, baseRisk: 'medium', warnings: r.warnings, critical: r.critical, missing: [], slots: {}, notes: null,
   354	      composed: { tool: r.tool, sub: r.sub, flags: r.flags, validation: r.validation } };
   355	  };
   356	
   357	  if (confidence < thr && method === 'catalog') {
   358	    const comp = tryCompose('low confidence');
   359	    if (comp && !comp.invalid) return comp;
   360	    const hint = hasPronoun(query) && !ctx ? 'this looks like a reference to an earlier command; try --history' : null;
   361	    // "move it there" with history: an object and a place reference at once is refused, not reported as resolved
   362	    if (ctx && hasPronoun(query) && hasLocative(query)) {
   363	      context.rule = 'refused';
   364	      context.note = 'the request names both an object ("it") and a place ("there") from the previous command; not guessing which is which';
   365	      return { ...out, understood: false, method: 'history-rule', hint: context.note, composeError: comp?.invalid || null };
   366	    }
   367	    return { ...out, understood: false, method: 'none', hint, composeError: comp?.invalid || null };
   368	  }
   369	
   370	  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode, tagger: opts.tagger });
   371	  const slots = r.slots;
   372	  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
   373	  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
   374	  const ambiguousPaths = [];
   375	  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
   376	  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
   377	  const blank = new Set(r.withheld || []);
   378	  if (BY_ID[intent].risk !== 'safe') {
   379	    for (const k of Object.keys(slots)) {
   380	      if (PATH_SLOT_NAMES.has(k) && r.sources[k] !== 'history' && trailingPunctAfter(query, slots[k])) { ambiguousPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   381	    }
   382	    if (ambiguousPaths.length) finalizeSlots(BY_ID[intent], slots);
   383	  }
   384	  // a changing command whose path is the output of a command (`in \`pwd\``, `$(pwd)`), or a request that names more
   385	  // explicit paths than the command takes (`in /tmp/x and /tmp/y`: only one would be used): placeholder + warning
   386	  const unclearPaths = [];
   387	  if (BY_ID[intent].risk !== 'safe') {
   388	    const explicit = explicitPaths(query);
   389	    const nPathSlots = [...PATH_SLOT_NAMES].filter((k) => usesSlot(BY_ID[intent], k)).length;
   390	    const dropped = explicit.filter((p) => !Object.values(slots).some((v) => String(v) === p));
   391	    const tooMany = explicit.length > nPathSlots && dropped.length > 0;
   392	    // `in $(pwd)`: the location is the output of a command, so an empty path slot is withheld too (never `.`)
   393	    if (/\$\(|`/.test(query)) for (const k of ['path', 'file']) if (usesSlot(BY_ID[intent], k) && slots[k] == null && !unclearPaths.length) { unclearPaths.push(`${k}=?`); blank.add(k); }
   394	    for (const k of Object.keys(slots)) {
   395	      if (!PATH_SLOT_NAMES.has(k) || r.sources[k] === 'history') continue;
   396	      const sub = insideSubstitution(query, String(slots[k]));
   397	      if (sub || tooMany) { unclearPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   398	    }
   399	    if (tooMany) for (const k of PATH_SLOT_NAMES) if (usesSlot(BY_ID[intent], k) && slots[k] == null) blank.add(k);
   400	    if (unclearPaths.length || tooMany) finalizeSlots(BY_ID[intent], slots);
   401	    if (tooMany && !unclearPaths.length) unclearPaths.push(dropped.join(', '));
   402	    if (tooMany) unclearPaths.tooMany = true;
   403	  }
   404	  // `tellsh delete folder "my data"`: a quoted argument that may be a name or words of the request (see joinArgs). A
   405	  // changing command never takes it (or a part of it) as its path or other operand (process, service, container,
   406	  // package, ...): placeholder + warning
   407	  const unclearArgs = [];
   408	  if (BY_ID[intent].risk !== 'safe' && opts.unclearArgs?.length) {
   409	    const words = (x) => String(x).toLowerCase().split(/\s+/).filter(Boolean);
   410	    const partOf = (v, u) => { const a = words(u); const b = words(v); return b.length > 0 && a.some((_, i) => b.every((w, j) => a[i + j] === w)); };
   411	    for (const k of Object.keys(slots)) {
   412	      if (!(PATH_SLOT_NAMES.has(k) || OPERAND_SLOT_NAMES.has(k)) || r.sources[k] === 'history') continue;
   413	      const u = opts.unclearArgs.find((x) => partOf(slots[k], x));
   414	      if (u != null) { unclearArgs.push(`${k}=${u}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   415	    }
   416	    if (unclearArgs.length) finalizeSlots(BY_ID[intent], slots);
   417	  }
   418	  const ambiguousText = [];
   419	  for (const k of TEXT_SLOT_NAMES) {
   420	    if (slots[k] != null && cutAtEscapedQuote(query, slots[k])) { ambiguousText.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
   421	  }
   422	  if (ambiguousText.length) { delete slots.sedexpr; delete slots.namepat; finalizeSlots(BY_ID[intent], slots); }
   423	  // "move it to /tmp/old", "copy them to /backup": the reference is the source, so the one path the request
   424	  // names is the destination (never `mv /tmp/old <DST>`). "copy notes.txt to it / into that folder / there":
   425	  // the reference is the destination and the named path the source (never `cp -ri /backup notes.txt`).
   426	  const itR = BY_ID[intent];
   427	  const fq = foldKeepLength(query).toLowerCase();
   428	  const twoPaths = usesSlot(itR, 'src') && usesSlot(itR, 'dst');
   429	  const isRef = ref?.rule === 'pronoun' || ref?.rule === 'refused';
   430	  const locative = hasLocative(query);
   431	  // "move it there": an object reference and a place reference at once. Which history value is the source and
   432	  // which the destination cannot be told from one previous command (`cd /tmp/x; cat a.txt`): both are withheld.
   433	  const bothRefs = twoPaths && locative && hasPronoun(query);
   434	  const refDst = !bothRefs && twoPaths && isRef && REF_DST.test(fq);
   435	  // the slots the reference fills (pronoun) or leaves empty (refused / guarded)
   436	  const refFill = refDst ? (ref.fill ? { dst: Object.values(ref.fill)[0] } : {}) : ref?.fill || {};
   437	  if (bothRefs) {
   438	    for (const k of Object.keys(slots)) if (PATH_SLOT_NAMES.has(k)) { delete slots[k]; delete r.sources[k]; }
   439	    for (const k of PATH_SLOT_NAMES) if (usesSlot(itR, k)) blank.add(k);
   440	    finalizeSlots(itR, slots);
   441	    if (ctx) { context.rule = 'refused'; context.note = 'the request names both what to move and where ("it" … "there"); not guessing which is which'; }
   442	    method = ctx ? 'history-rule' : method;
   443	  } else if (refDst) {
   444	    if (slots.src == null && slots.dst != null && !PRONOUN_VALUE.test(String(slots.dst))) { slots.src = slots.dst; r.sources.src = r.sources.dst; }
   445	    delete slots.dst; delete r.sources.dst;
   446	    if (slots.src != null && PRONOUN_VALUE.test(String(slots.src))) { delete slots.src; delete r.sources.src; }
   447	    if (ref.rule === 'refused') blank.add('dst');
   448	  } else if (isRef && twoPaths && slots.src != null && slots.dst == null &&
   449	      !PRONOUN_VALUE.test(String(slots.src)) && (ref.fill?.src != null || ref.blank?.includes('src'))) {
   450	    slots.dst = slots.src; r.sources.dst = r.sources.src;
   451	    delete slots.src; delete r.sources.src;
   452	    if (ref.rule === 'refused' || ref.guarded) blank.add('src');
   453	  }
   454	  // "move them to /tmp/old" with nothing resolved for "them" (no history, an unrelated history, ...): the one named
   455	  // path follows "to"/"into"/"do", so it is the destination; the source stays a placeholder (never `mv /tmp/old <DST>`)
   456	  if (!bothRefs && twoPaths && slots.src != null && slots.dst == null && !refDst && afterDestWord(query, String(slots.src))) {
   457	    slots.dst = slots.src; r.sources.dst = r.sources.src;
   458	    delete slots.src; delete r.sources.src;
   459	    blank.add('src');
   460	  }
   461	  // values that are only the words of a refused or guarded reference: a pronoun, or the `.` the tagger reads for
   462	  // "this folder" / "that directory" (never `rm -r .` for "delete all log files in this folder")
   463	  const refWordsOnly = () => {
   464	    for (const k of Object.keys(slots)) {
   465	      if (PRONOUN_VALUE.test(String(slots[k])) || (PATH_SLOT_NAMES.has(k) && slots[k] === '.' && !/(?:^|\s)\.(?:\s|$)/.test(query))) { delete slots[k]; delete r.sources[k]; }
   466	    }
   467	  };
   468	  if (ref?.rule === 'refused') {
   469	    // the reference points at something we cannot read safely: leave the slot empty (placeholder)
   470	    refWordsOnly();
   471	    for (const k of refDst ? [] : ref.blank || []) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
   472	    finalizeSlots(BY_ID[intent], slots);
   473	    method = 'history-rule';
   474	  }
   475	  // "remove the logs there", "delete notes.txt there": a place reference never names the object of a changing
   476	  // command (`rm -r DIR`, `mv DIR …`); only the location a search-and-change runs in (`find DIR … -delete`). Any path
   477	  // the request names is relative to the wrong directory, so every path slot is withheld (with or without history).
   478	  if (locative && !refDst && !bothRefs && BY_ID[intent].risk !== 'safe' && FAMILY_OF[intent] !== 'find' && [...PATH_SLOT_NAMES].some((k) => usesSlot(BY_ID[intent], k))) {
   479	    for (const k of Object.keys(slots)) if (PATH_SLOT_NAMES.has(k)) { delete slots[k]; delete r.sources[k]; }
   480	    for (const k of PATH_SLOT_NAMES) if (usesSlot(BY_ID[intent], k)) blank.add(k);
   481	    finalizeSlots(BY_ID[intent], slots);
   482	    if (ctx) {
   483	      context.rule = 'refused';
   484	      context.note = `"there" names a place, not what ${intent} would change; not guessing`;
   485	      method = 'history-rule';
   486	    }
   487	  } else if (ref?.rule === 'pronoun' && ref.guarded && BY_ID[intent].risk !== 'safe') {
   488	    // the value must not be changed (search root, listed directory, ...; see changeGuard) and the classifier
   489	    // picked a modifying intent: refuse
   490	    refWordsOnly();
   491	    for (const k of Object.keys(refFill)) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
   492	    finalizeSlots(BY_ID[intent], slots);
   493	    context.rule = 'refused';
   494	    context.note = ref.guardNote;
   495	    method = 'history-rule';
   496	  } else if (ref?.rule === 'pronoun') {
   497	    const it = BY_ID[intent];
   498	    for (const [k, v] of Object.entries(refFill)) {
   499	      if (!validSlot(k, v)) {
   500	        // the referenced value cannot be used (too long, a newline, ...): placeholder, never the catalog default
   501	        if (slots[k] != null && PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
   502	        if (slots[k] == null && usesSlot(it, k)) blank.add(k);
   503	        continue;
   504	      }
   505	      // the referenced value wins unless the request spells out its own value literally ("kill 4242")
   506	      const literal = slots[k] != null && !PRONOUN_VALUE.test(String(slots[k])) && new RegExp(`(^|[^\\w])${String(slots[k]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^\\w])`, 'i').test(query);
   507	      if (usesSlot(it, k) && (!literal || (k === 'path' && slots[k] === '.'))) { slots[k] = v; r.sources[k] = 'history'; }
   508	    }
   509	    // the chosen command does not take the referenced value: do not claim it was used
   510	    if (!Object.values(r.sources).includes('history')) { context.rule = null; context.note = `the ${ref.ent} from history does not fit ${intent}; not used`; }
   511	    finalizeSlots(it, slots);
   512	    method = 'history-rule';
   513	  }
   514	  if (sb) {
   515	    const it = BY_ID[intent];
   516	    for (const [k, v] of Object.entries(validHistorySlots(sb.lastSlots))) {
   517	      if (usesSlot(it, k) && slots[k] == null && !blank.has(k) && !['namepat', 'sedexpr'].includes(k)) { slots[k] = v; r.sources[k] = 'history'; }
   518	    }
   519	    // a slot of the previous command that depends on the shell state (`find "$DIR" …`) or is not a valid value
   520	    // (a 300-character path): placeholder, not `.`
   521	    const withheld = [...(sb.blank || []), ...invalidHistorySlots(sb.lastSlots)].filter((k) => usesSlot(it, k) && slots[k] == null && !['namepat', 'sedexpr'].includes(k));
   522	    for (const k of withheld) blank.add(k);
   523	    if (withheld.length) { context.rule = 'refused'; context.note = `previous ${sb.lastIntent} has ${withheld.join(', ')} that depends on the shell state or is not a valid value; not guessing`; }
   524	    finalizeSlots(it, slots);
   525	  }
   526	  let b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: r.invalidOperands });
   527	  // implicit reference: a required slot is still missing and the history has a value of that type.
   528	  // Only for safe intents: a destructive command ("delete the folder") is never aimed at a history
   529	  // value without an explicit reference word ("delete it"), which goes through resolveReference.
   530	  if (ctx && b.missing.length && ref?.rule !== 'refused' && BY_ID[intent].risk === 'safe' && b.risk === 'safe') {
   531	    const filled = [];
   532	    for (const m of b.missing) {
   533	      if (r.withheld?.includes(m)) continue; // "list files in the": not a reference to history either
   534	      const e = entityForSlot(m, ctx);
   535	      // an ambiguous newest value blocks the fill; ctx.last is consulted only when no entity type applies
   536	      const v = e ? (e.ambiguous ? null : e.value) : (ctx.last?.slots?.[m] ?? null);
   537	      if (v != null && validSlot(m, v)) { slots[m] = v; r.sources[m] = 'history'; filled.push(`${m}=${v}`); }
   538	    }
   539	    if (filled.length) {
   540	      finalizeSlots(BY_ID[intent], slots);
   541	      b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank], keepOptional: r.invalidOperands });
   542	      method = 'history-rule'; // history-derived: never auto-run by --yes
   543	      context.rule ??= 'implicit';
   544	      context.note = [context.note, `filled from history: ${filled.join(', ')}`].filter(Boolean).join('; ');
   545	    }
   546	  }
   547	  if (Object.values(r.sources).includes('history')) method = 'history-rule';
   548	  const res = { ...out, understood: true, method, ...b, slotSources: r.sources, spans: r.spans.map((s) => ({ type: s.type, text: s.text })) };
   549	  if (ambiguousText.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: unclear where the quoted text ends (\\" may be an escaped quote) (${ambiguousText.join(', ')})`];
   550	  if (ambiguousPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${ambiguousPaths.join(', ')}); quote the path`];
   551	  if (unclearArgs.length) res.warnings = [...(res.warnings || []), `${unclearArgs.every((x) => PATH_SLOT_NAMES.has(x.split('=')[0])) ? 'path' : 'value'} left as a placeholder: unclear whether the quoted argument is a name or part of the request (${unclearArgs.join(', ')}); pass the whole request as one quoted argument`];
   552	  if (unclearPaths.length) {
   553	    res.warnings = [...(res.warnings || []), unclearPaths.tooMany
   554	      ? `path left as a placeholder: the request names more paths than ${intent} takes (${explicitPaths(query).join(', ')}); run it once per path`
   555	      : `path left as a placeholder: it is the output of a command substitution (${unclearPaths.join(', ')})`];
   556	  }
   557	  if (method === 'catalog' && ctx == null && hasPronoun(query) && b.missing.length) res.hint = 'this looks like a reference to an earlier command; try --history';
   558	
   559	  // ---- second pass on modifier mismatch: the request asks for flags the catalog command lacks ----
   560	  //   same tool: >= 1 triggered flag not in the catalog command; another stage-1 tool: >= 2 triggered flags
   561	  // a slot the catalog withheld on purpose (command substitution, a rejected or unclear path, ...) is never filled by the
   562	  // composer: the catalog command with its placeholder is the answer
   563	  if (method === 'catalog' && composeMode !== 'off' && b.command && !blank.size && !['powershell', 'cmd', 'fish'].includes(env.shell)) {
   564	    const fam = FAMILY_OF[intent];
   565	    const ci = composeInput(query, model, fam, opts.unclearArgs);
   566	    const opt = { patternOf: ci.pattern, nameOf: ci.nameOf };
   567	    const have = flagTokens(b.command);
   568	    const expl = new Set(explained()[intent] || []);
   569	    const unexplained = (cmp) => cmp.triggered.filter((f) => !expl.has((cmp.sub ? cmp.sub + ' ' : '') + f));
   570	    let comp = compose(query, [{ tool: fam, p: 1 }], ci.ex, opt);

exec
/bin/bash -lc 'cat src/render.js; cat src/shellwords.js' in /workspace/tellsh
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

 exited 1 in 8849ms:

> tellsh@0.3.0 test
> node --test test/

TAP version 13
# Subtest: /workspace/tellsh/test/cli.test.js
not ok 1 - /workspace/tellsh/test/cli.test.js
  ---
  duration_ms: 5043.467526
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
  duration_ms: 955.663171
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 3 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 643.615397
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 4 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 500.368953
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 5 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 652.684457
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 6 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 260.399468
  ...
# Subtest: /workspace/tellsh/test/pipeline.test.js
not ok 7 - /workspace/tellsh/test/pipeline.test.js
  ---
  duration_ms: 1231.385221
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
  duration_ms: 2093.139824
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
  duration_ms: 1296.197541
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
  duration_ms: 2217.380105
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
  duration_ms: 1446.697043
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
  duration_ms: 735.452944
  ...
# Subtest: /workspace/tellsh/test/regressions14.test.js
ok 13 - /workspace/tellsh/test/regressions14.test.js
  ---
  duration_ms: 859.644782
  ...
# Subtest: /workspace/tellsh/test/regressions2.test.js
not ok 14 - /workspace/tellsh/test/regressions2.test.js
  ---
  duration_ms: 1260.474135
  location: '/workspace/tellsh/test/regressions2.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 15 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 628.162532
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 16 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 809.343177
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 17 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 638.320511
  ...
# Subtest: /workspace/tellsh/test/regressions4.test.js
not ok 18 - /workspace/tellsh/test/regressions4.test.js
  ---
  duration_ms: 1921.835426
  location: '/workspace/tellsh/test/regressions4.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions5.test.js
ok 19 - /workspace/tellsh/test/regressions5.test.js
  ---
  duration_ms: 1375.027285
  ...
# Subtest: /workspace/tellsh/test/regressions6.test.js
ok 20 - /workspace/tellsh/test/regressions6.test.js
  ---
  duration_ms: 1463.270818
  ...
# Subtest: /workspace/tellsh/test/regressions7.test.js
ok 21 - /workspace/tellsh/test/regressions7.test.js
  ---
  duration_ms: 803.124565
  ...
# Subtest: /workspace/tellsh/test/regressions8.test.js
not ok 22 - /workspace/tellsh/test/regressions8.test.js
  ---
  duration_ms: 1008.405691
  location: '/workspace/tellsh/test/regressions8.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions9.test.js
not ok 23 - /workspace/tellsh/test/regressions9.test.js
  ---
  duration_ms: 1719.238486
  location: '/workspace/tellsh/test/regressions9.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 24 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 4557.412233
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/slot-cases.js
ok 25 - /workspace/tellsh/test/slot-cases.js
  ---
  duration_ms: 192.856695
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 26 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 502.722748
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 27 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 490.335059
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
# pass 15
# fail 12
# cancelled 0
# skipped 0
# todo 0
# duration_ms 8241.443784

codex
I’m checking whether the updated safety guards preserve explicit targets and reject ambiguous history references. I’m also reviewing how training data is split and exported. The test suite is still running.
exec
/bin/bash -lc "nl -ba src/history.js | sed -n '430,720p'" in /workspace/tellsh
 succeeded in 0ms:
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
   566	// After one, "it"/"them" may mean any of the printed values, so an older value of that type is not a safe
   567	// target for a changing command.
   568	const FS_LISTERS = new Set(['ls', 'tree', 'dir', 'gci', 'get-childitem', 'll', 'la', 'find', 'fd', 'fdfind', 'locate', 'mlocate', 'plocate',
   569	  'du', 'ncdu', 'exa', 'eza', 'lsd', 'vdir']);
   570	const FS_SEARCHERS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'select-string', 'sls', 'findstr']);
   571	const PROC_LISTERS = new Set(['ps', 'top', 'htop', 'btop', 'atop', 'pgrep', 'pidof', 'pstree', 'get-process', 'gps', 'tasklist']);
   572	// global options that take a value, before the subcommand (`git -C /tmp status`, `docker --context prod ps`)
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
   624	/**
   625	 * 'root' when a wrapper in the removed prefix of `raw` (before the unwrapped words `w`) runs the command under another
   626	 * root (every path names something else), 'cwd' when it runs it in another working directory (relative paths do).
   627	 */
   628	function wrapperScope(w, raw) {
   629	  let cur = null;
   630	  let scope = null;
   631	  for (const x of raw.slice(0, raw.length - w.length).map((v) => String(rawOf(v)))) {
   632	    const h = x.replace(/^.*[\\/]/, '').toLowerCase();
   633	    if (ROOT_WRAPPERS.has(h) || NS_WRAPPERS.has(h)) return 'root';
   634	    if (CWD_WRAPPERS.has(h)) { scope = 'cwd'; continue; }
   635	    if (!x.startsWith('-')) { if (WRAPPER_CWD[h] || WRAPPER_ROOT[h]) cur = h; continue; }
   636	    if (WRAPPER_ROOT[cur]?.test(x)) return 'root';
   637	    if (WRAPPER_CWD[cur]?.test(x)) scope = 'cwd';
   638	  }
   639	  return scope;
   640	}
   641	/** The values of a scoped command (scopedElsewhere) as ambiguous: they name things in another repository / daemon. */
   642	function markScoped(o) {
   643	  for (const x of Object.keys(o)) if (o[x] != null && typeof o[x] !== 'boolean' && !isAmbiguous(o[x])) o[x] = AMB + rawOf(o[x]);
   644	}
   645	/** The arguments after the global options of git/docker/podman (`git -C /tmp status` -> ['status']); other heads: unchanged. */
   646	function afterGlobals(head, args) {
   647	  const vo = GLOBAL_VALUE_OPTS[head];
   648	  if (!vo) return args;
   649	  let i = 0;
   650	  while (i < args.length && /^-/.test(args[i]) && args[i] !== '--') i += vo.has(args[i]) ? 2 : 1;
   651	  if (args[i] === '--') i++;
   652	  return args.slice(i);
   653	}
   654	function listedBySegment(w, pipedIn, k) {
   655	  const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
   656	  const nonFlags = afterGlobals(head, w.slice(1)).filter((a) => !/^-/.test(a));
   657	  // `du -sh DIR` is the size of DIR itself; `du DIR` / `du -d 1 DIR` lists what is inside
   658	  if (head === 'du' && w.slice(1).some((a) => /^-[a-zA-Z]*s|^--summarize$/.test(a)) && !nonFlags.some(isGlob)) return [];
   659	  if (FS_LISTERS.has(head)) return ['file', 'dir'];
   660	  // grep reading a pipe filters what an earlier stage printed; reading files it lists matches
   661	  if (FS_SEARCHERS.has(head)) return pipedIn ? [] : ['file', 'dir'];
   662	  if (PROC_LISTERS.has(head)) return ['pid', 'proc'];
   663	  if (['ss', 'netstat', 'lsof', 'fuser', 'get-nettcpconnection'].includes(head)) return ['port', 'pid', 'proc'];
   664	  if (head === 'docker' || head === 'podman') {
   665	    const sub = nonFlags.slice(0, 2).join(' ');
   666	    return /^(?:ps|stats|container (?:ls|list|ps)|compose ps|top)\b/.test(sub) ? ['container'] : [];
   667	  }
   668	  if (head === 'systemctl') return !nonFlags.length || /^list-/.test(nonFlags[0]) || w.includes('--failed') ? ['service'] : [];
   669	  if (head === 'service') return w.includes('--status-all') ? ['service'] : [];
   670	  if (head === 'get-service' || head === 'gsv') return psArgs(w.slice(1)).pos.length || /-(?:name|displayname)\b/i.test(w.join(' ')) ? [] : ['service'];
   671	  if (head === 'git') {
   672	    const sub = nonFlags[0];
   673	    if (sub === 'branch') return nonFlags.length === 1 && !w.some((a) => /^-(?:d|D|m|M|c|C|-delete|-move|-copy)$/.test(a)) ? ['branch'] : [];
   674	    if (['grep', 'ls-files', 'status', 'clean'].includes(sub)) return ['file', 'dir'];
   675	  }
   676	  return [];
   677	}
   678	const LIST_INTENT = { docker_ps: ['container'], docker_ps_all: ['container'], docker_stats: ['container'], list_services: ['service'],
   679	  failed_services: ['service'], git_branches: ['branch'], git_status: ['file', 'dir'] };
   680	const LIST_FAMILY = { ls: ['file', 'dir'], find: ['file', 'dir'], grep: ['file', 'dir'], du: ['file', 'dir'], ps: ['pid', 'proc'], ss: ['port', 'pid', 'proc'] };
   681	/** Entity types a catalog intent prints many values of (for previous `tellsh <query>` lines). */
   682	const listedByIntent = (intent) => (intent ? LIST_INTENT[intent] || LIST_FAMILY[FAMILY_OF[intent]] || [] : []);
   683	
   684	// pipeline stages that filter the entries of a listing piped into them
   685	const FILTER_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag', 'findstr', 'select-string', 'sls', 'where-object', 'where', '?']);
   686	const GREP_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag']);
   687	
   688	// find/grep catalog intents: their path slot is where the search ran, not what it found
   689	const isSearchRoot = (intent, slots, ents) => ents.dir != null && ['find', 'grep'].includes(FAMILY_OF[intent]) && String(ents.dir) === String(slots.path);
   690	
   691	// the one operand of a command, or (several files: `touch a.txt b.txt`, `rm a b`) an ambiguous value: "delete them"
   692	// or "delete it" may mean any or all of them, never just the last one
   693	const oneOf = (ops) => (ops.length > 1 ? AMB + ops.map(rawOf).join(' ') : ops[0]);
   694	
   695	/** Entities of one simple command `w` (sudo/VAR= removed) into `e`. */
   696	function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
   697	  if (isAmbiguous(w[0])) {
   698	    if (w.slice(1).some((a) => PATHLIKE.test(rawOf(a)))) { e.file = AMB + w.join(' '); e.dir = AMB + w.join(' '); }
   699	    return;
   700	  }
   701	  const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '');
   702	  const args = afterGlobals(head, w.slice(1));
   703	  const nonFlags = args.filter((a) => !/^-/.test(a));
   704	  if (CD_HEADS.has(head.toLowerCase())) return; // handled by the caller
   705	  if ((k === 'pwsh' || PS_CMDLET.test(head)) && psNative(head.toLowerCase(), args, e, setIntent)) return;
   706	  if (head === 'docker') {
   707	    const sub = nonFlags[0];
   708	    if (sub === 'run') {
   709	      const i = args.indexOf('--name');
   710	      if (i >= 0 && args[i + 1]) e.container ??= args[i + 1];
   711	      const nm = args.find((a) => a.startsWith('--name='));
   712	      if (nm) e.container ??= nm.slice(7);
   713	    } else if (DOCKER_CT.has(sub)) {
   714	      const rest = args.slice(args.indexOf(sub) + 1);
   715	      for (let i = 0; i < rest.length; i++) {
   716	        if (DOCKER_VAL_FLAGS.has(rest[i])) { i++; continue; }
   717	        if (/^-/.test(rest[i])) continue;
   718	        e.container ??= rest[i];
   719	        break;
   720	      }

exec
/bin/bash -lc "nl -ba src/history.js | sed -n '696,925p'; nl -ba src/danger.js | sed -n '1,200p'" in /workspace/tellsh
 succeeded in 0ms:
   696	function segmentEnts(w, e, setIntent, split, k, segIdx, firstWord) {
   697	  if (isAmbiguous(w[0])) {
   698	    if (w.slice(1).some((a) => PATHLIKE.test(rawOf(a)))) { e.file = AMB + w.join(' '); e.dir = AMB + w.join(' '); }
   699	    return;
   700	  }
   701	  const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '');
   702	  const args = afterGlobals(head, w.slice(1));
   703	  const nonFlags = args.filter((a) => !/^-/.test(a));
   704	  if (CD_HEADS.has(head.toLowerCase())) return; // handled by the caller
   705	  if ((k === 'pwsh' || PS_CMDLET.test(head)) && psNative(head.toLowerCase(), args, e, setIntent)) return;
   706	  if (head === 'docker') {
   707	    const sub = nonFlags[0];
   708	    if (sub === 'run') {
   709	      const i = args.indexOf('--name');
   710	      if (i >= 0 && args[i + 1]) e.container ??= args[i + 1];
   711	      const nm = args.find((a) => a.startsWith('--name='));
   712	      if (nm) e.container ??= nm.slice(7);
   713	    } else if (DOCKER_CT.has(sub)) {
   714	      const rest = args.slice(args.indexOf(sub) + 1);
   715	      for (let i = 0; i < rest.length; i++) {
   716	        if (DOCKER_VAL_FLAGS.has(rest[i])) { i++; continue; }
   717	        if (/^-/.test(rest[i])) continue;
   718	        e.container ??= rest[i];
   719	        break;
   720	      }
   721	      if (DOCKER_INTENT[sub] && e.container != null) setIntent(DOCKER_INTENT[sub], { container: e.container });
   722	    }
   723	  } else if (head === 'systemctl' || head === 'service') {
   724	    const svc = head === 'systemctl' ? nonFlags[1] : nonFlags[0];
   725	    const verb = head === 'systemctl' ? nonFlags[0] : nonFlags[1];
   726	    if (svc) e.service ??= svc.replace(/\.service$/, '');
   727	    if (SYSTEMCTL_INTENT[verb] && svc) setIntent(SYSTEMCTL_INTENT[verb], { service: e.service });
   728	  } else if (head === 'journalctl') {
   729	    const i = args.findIndex((a) => a === '-u' || a === '--unit');
   730	    if (i >= 0 && args[i + 1]) { e.service ??= args[i + 1].replace(/\.service$/, ''); setIntent('journal_service', { service: e.service }); }
   731	  } else if (head === 'kill') {
   732	    const { pos } = parseArgs(args, VALUE_OPTS.kill);
   733	    if (pos.length === 1 && /^\d+$/.test(pos[0])) { e.pid = pos[0]; setIntent('kill_by_pid', { pid: pos[0] }); }
   734	    else if (pos.length) e.pid = AMB + pos.map(rawOf).join(' '); // several PIDs or a job spec: not one process
   735	  } else if (['pkill', 'killall', 'pgrep', 'pidof'].includes(head)) {
   736	    const { pos } = parseArgs(args, VALUE_OPTS[head]);
   737	    if (pos.length === 1) e.proc = pos[0];
   738	    else if (pos.length > 1) e.proc = AMB + pos.map(rawOf).join(' ');
   739	    if (head === 'pgrep' && pos.length === 1) setIntent('find_process', { name: pos[0] });
   740	  } else if ((head === 'ps' || head === 'top' || head === 'htop') && args.some((a) => /^-\w*p$/.test(a))) {
   741	    const i = args.findIndex((a) => /^-\w*p$/.test(a));
   742	    const pid = (args[i + 1] || '').split(',')[0];
   743	    if (/^\d+$/.test(pid)) e.pid = pid;
   744	  } else if ((head === 'grep' || head === 'egrep') && split.segments.some((s, j) => j < segIdx && firstWord(s) === 'ps')) {
   745	    // ps aux | grep -v grep | grep node: the process is the pattern of a non-inverted grep
   746	    const { pos, opts, flags } = parseArgs(args, VALUE_OPTS.grep);
   747	    const inverted = flags.some((f) => /^-[a-zA-Z]*v/.test(f) || f === '--invert-match');
   748	    const pat = opts['-e'] ?? opts['--regexp'] ?? pos[0];
   749	    if (!inverted && pat != null) e.proc = pat;
   750	  } else if (GREP_HEADS.has(head) && nonFlags[0]) {
   751	    const { pos, opts, flags } = parseArgs(args, VALUE_OPTS[head] || VALUE_OPTS.grep);
   752	    const pat = opts['-e'] ?? opts['--regexp'] ?? pos[0];
   753	    const path = opts['-e'] != null || opts['--regexp'] != null ? pos[0] : pos[1];
   754	    if (pat != null) setIntent(flags.some((a) => /^-\w*l/.test(a)) ? 'grep_files_containing' : 'grep_text', { pattern: rawOf(pat), ...(path != null ? { path } : {}) });
   755	    if (path != null) {
   756	      const t = typeByExt(path);
   757	      e[t] = path;
   758	      if (t === 'dir') e.searchDir = true; // searched directory: the matches are inside it
   759	    }
   760	  } else if (head === 'lsof' || head === 'ss' || head === 'netstat' || head === 'fuser') {
   761	    const pm = args.map(rawOf).join(' ').match(/(?::|tcp:|udp:|sport = :)(\d{2,5})\b/);
   762	    if (pm) { e.port = pm[1]; setIntent('process_on_port', { port: pm[1] }); }
   763	  } else if (head === 'git') {
   764	    const sub = nonFlags[0];
   765	    const rest = args.slice(args.indexOf(sub) + 1);
   766	    if (sub === 'grep') {
   767	      // git grep [-l] PATTERN [DIR]: a search, its directory argument is only where it looked
   768	      const { pos, opts } = parseArgs(rest, VALUE_OPTS.grep);
   769	      const path = opts['-e'] != null ? pos[0] : pos[1];
   770	      if (path != null) { const t = typeByExt(path); e[t] = path; if (t === 'dir') e.searchDir = true; }
   771	      return;
   772	    }
   773	    if (sub === 'checkout' || sub === 'switch') {
   774	      const { pos, opts, after } = parseArgs(rest, VALUE_OPTS[sub]);
   775	      const created = opts['-b'] ?? opts['-B'] ?? opts['-c'] ?? opts['-C'] ?? opts['--create'] ?? opts['--force-create'] ?? opts['--orphan'];
   776	      if (after) {
   777	        // git checkout [<tree-ish>] -- <file>...: restores files, it does not switch branches
   778	        if (after.length) e.file = after.length === 1 ? after[0] : AMB + after.map(rawOf).join(' ');
   779	        return;
   780	      }
   781	      const b = created ?? pos[0];
   782	      if (b != null && b !== '.' && b !== '-' && !isAmbiguous(b) && !String(b).startsWith('-')) {
   783	        e.branch = b;
   784	        e.current = b;
   785	        if (created != null) e.created = b;
   786	      }
   787	    } else if (['merge', 'rebase'].includes(sub) || (sub === 'branch' && nonFlags[1])) {
   788	      const b = nonFlags[nonFlags.length - 1];
   789	      if (b && b !== sub && b !== '.' && !isGlob(b) && !b.startsWith('-')) e.branch = b;
   790	    } else if (sub === 'push' && nonFlags.length >= 2) e.branch = nonFlags[nonFlags.length - 1];
   791	    else if (sub === 'clone' && nonFlags[1]) e.url = nonFlags[1];
   792	    else if (['add', 'diff', 'blame', 'restore', 'rm', 'log'].includes(sub) && nonFlags[1] && nonFlags[1] !== '.') e.file = nonFlags[nonFlags.length - 1];
   793	  } else if (['ssh', 'ping', 'dig', 'nslookup', 'traceroute', 'mtr', 'host', 'telnet', 'nc'].includes(head)) {
   794	    const h = nonFlags.find((a) => /[\w-]+\.[\w.-]+|^[\w-]+@/.test(a)) || nonFlags[0];
   795	    if (h) e.host = h;
   796	  } else if (['curl', 'wget', 'http'].includes(head)) {
   797	    const u = args.find((a) => /^https?:\/\//.test(a));
   798	    if (u) {
   799	      e.url = u;
   800	      const base = u.replace(/[?#].*$/, '').split('/').pop();
   801	      const saves = head === 'wget' || args.some((a) => /^-\w*O/.test(a));
   802	      if (saves && /\.\w{1,5}$/.test(base)) e.file = base;
   803	    }
   804	  } else if (head === 'rm' || head === 'trash' || head === 'rmdir') {
   805	    const p = oneOf(nonFlags);
   806	    if (p) e[args.some((a) => /^-\w*r/i.test(a)) || head === 'rmdir' ? 'dir' : 'file'] = p;
   807	  } else if (head === 'cp' || head === 'mv' || head === 'ln') {
   808	    const { pos, opts } = parseArgs(args, VALUE_OPTS[head]);
   809	    const tdir = opts['-t'] ?? opts['--target-directory'];
   810	    if (tdir != null) destEnts(pos.length === 1 ? pos : [...pos, ''], String(tdir) + '/', e);
   811	    else if (pos.length >= 2) destEnts(pos.slice(0, -1), pos[pos.length - 1], e);
   812	  } else if (head === 'tar' || head === 'zip') {
   813	    const a = nonFlags.find((x) => /\.(tar(\.\w+)?|tgz|zip)$/.test(x));
   814	    if (a) e.file = a;
   815	  } else if (FILE_HEADS.has(head)) {
   816	    // operands: not a chmod mode, a chown owner, or a count (`head -n 5 a.txt`); a script and its arguments
   817	    // (`python3 script.py data.csv`) are several operands: "delete it" may mean either
   818	    let ops = nonFlags.filter((a) => !/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$|^\d+$/.test(a));
   819	    if (['chown'].includes(head)) ops = ops.slice(1);
   820	    const p = oneOf(ops);
   821	    if (p) e[/\/$/.test(rawOf(p)) ? 'dir' : 'file'] = p;
   822	  } else if (DIR_HEADS.has(head)) {
   823	    // find ROOT -name ...: the search root; other heads: the one directory argument (`ls /a /b`: ambiguous)
   824	    // (find's root is the operands before its first expression word: `find -name "*.o"` has none)
   825	    const p = head === 'find' ? args.slice(0, (args.findIndex((a) => /^[-(!]/.test(a)) + 1 || args.length + 1) - 1)[0] : oneOf(nonFlags.filter((a) => !isGlob(a) && !/^\d+$/.test(a)));
   826	    if (p) {
   827	      e.dir = p;
   828	      if (head === 'find') e.searchDir = true;
   829	      // `du DIR` / `du -d 1 DIR | sort -rh` lists the entries of DIR (`du -sh DIR` is DIR itself)
   830	      else if (['ls', 'tree', 'ncdu'].includes(head) || (head === 'du' && !args.some((a) => /^-[a-zA-Z]*s|^--summarize$/.test(a)))) e.listDir = true;
   831	    }
   832	    // `ls`, `ls *.pdf`: the working directory (a glob selects some of its entries)
   833	    else if (['ls', 'tree'].includes(head)) e.listCwd = nonFlags.some(isGlob) ? 'search' : 'list';
   834	  } else if (!INERT_HEADS.has(head.toLowerCase())) {
   835	    // unknown command (or unknown cmdlet) naming a path: we cannot tell what it did with it, so an
   836	    // older file/dir must not be picked up by "it"
   837	    const p = nonFlags.find((a) => PATHLIKE.test(rawOf(a)) && !/^\w+:\/\//.test(rawOf(a)));
   838	    if (p) e[typeByExt(p)] = AMB + rawOf(p);
   839	  }
   840	}
   841	
   842	const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];
   843	
   844	/**
   845	 * Build the context object from history commands (oldest first). Only the single most recent command is a
   846	 * reference target ("delete it", "same for /var", "there" always mean the previous command, never an older one);
   847	 * the running `tellsh <query>` line itself, which some shells write before it runs, is dropped first.
   848	 * kind: 'posix' | 'pwsh' (default: `cmds.kind` as set by loadHistory, else posix)
   849	 * -> { n, line, ents: {type: value}, entOrder, refOrder, searchRoots, listedDirs, last: {intent, slots, ambiguous, skipped, scoped},
   850	 *      pos, listing, cdDir, features }
   851	 *    values that could not be read unambiguously are kept as AMB-prefixed strings (see isAmbiguous).
   852	 *    Within the line (`cat old.txt; ls newdir`) later segments win: pos gives the segment of each value, and refOrder
   853	 *    ranks types by it (entOrder, which feeds the classifiers' ctx_ features, ranks by type only). searchRoots: the dir
   854	 *    is a find/grep root or a filtered/piped listing; listedDirs: a plain listing. last.skipped: a later segment of the
   855	 *    line ran after the repeatable command. listing: the segment of the newest listing of each entity type ({ seg });
   856	 *    cdDir: the dir is a `cd` target ({ value, followed }). changeGuard() uses these.
   857	 */
   858	export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
   859	  const k = kind || cmds.kind || 'posix';
   860	  const list = [...cmds];
   861	  // zsh (share_history / inc_append_history), fish and PSReadLine write the running line to the
   862	  // history file before it executes: the current `tellsh <query>` call is not the previous command. bash writes it
   863	  // only afterwards, so there an identical last line is an earlier call (`cmds.shell` as set by loadHistory)
   864	  if (query != null && list.length && cmds.shell !== 'bash') {
   865	    const norm = (x) => String(x).trim().replace(/\s+/g, ' ');
   866	    const q = tellshQuery(list[list.length - 1], k);
   867	    // exact match only: an earlier `tellsh` line whose text merely contains the query is the previous command
   868	    if (q != null && q !== false && norm(q) === norm(query)) list.pop();
   869	  }
   870	  const line = list.length ? list[list.length - 1] : null;
   871	  const a = line != null ? analyzeCommand(line, classify, k) : { ents: {}, at: {}, listed: {}, slots: {} };
   872	  const ents = {};
   873	  for (const t of ENT_TYPES) if (a.ents[t] != null) ents[t] = a.ents[t];
   874	  const pos = Object.fromEntries(Object.keys(ents).map((t) => [t, a.at?.[t] ?? 0]));
   875	  const dir = ents.dir != null ? String(ents.dir) : null;
   876	  const searchRoots = new Set(dir != null && a.searchDir ? [dir] : []);
   877	  const listedDirs = new Set(dir != null && a.listDir ? [dir] : []);
   878	  const listing = Object.fromEntries(Object.entries(a.listed || {}).map(([t, seg]) => [t, { seg }]));
   879	  const last = a.intent ? { intent: a.intent, slots: a.slots, ambiguous: !!a.ambiguous, skipped: !!a.intentStale, scoped: !!a.scoped } : null;
   880	  const current = a.ents.current && !isAmbiguous(a.ents.current) ? a.ents.current : null;
   881	  const cdDir = a.cdDir && dir != null ? { value: dir, followed: !!a.cdFollowed } : null;
   882	  const byType = (x, y) => ENT_TYPES.indexOf(x) - ENT_TYPES.indexOf(y);
   883	  const entOrder = Object.keys(ents).sort(byType);
   884	  const refOrder = Object.keys(ents).sort((x, y) => pos[y] - pos[x] || byType(x, y));
   885	  const ctx = { n: line != null ? 1 : 0, line, ents, currentBranch: current, entOrder, refOrder, searchRoots, listedDirs, last,
   886	    cwdFlags: cwdFlags(cwd), pos, listing, cdDir };
   887	  ctx.features = ctxFeatures(ctx);
   888	  return ctx;
   889	}
   890	
   891	export function cwdFlags(cwd) {
   892	  if (!cwd) return [];
   893	  const f = [];
   894	  try {
   895	    if (existsSync(join(cwd, '.git'))) f.push('git');
   896	    if (['docker-compose.yml', 'docker-compose.yaml', 'compose.yml', 'compose.yaml'].some((n) => existsSync(join(cwd, n)))) f.push('compose');
   897	  } catch { /* ignore */ }
   898	  return f;
   899	}
   900	
   901	/** ctx_ tokens fed to the classifiers (same function is used by scripts/gen_data.js). */
   902	export function ctxFeatures(ctx) {
   903	  const f = [];
   904	  if (ctx.entOrder?.[0]) f.push('ctx_last=' + ctx.entOrder[0]);
   905	  for (const k of ctx.entOrder || []) f.push('ctx_has=' + k);
   906	  if (ctx.last?.intent) f.push('ctx_tool=' + FAMILY_OF[ctx.last.intent]);
   907	  for (const c of ctx.cwdFlags || []) f.push('ctx_cwd=' + c);
   908	  return f;
   909	}
   910	
   911	// ---------------------------------------------------------------------------------------------
   912	// deterministic coreference rules
   913	
   914	const SAME_RES = [
   915	  /^\s*(?:and\s+|now\s+)?(?:do\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?(?:\s+but)?\s+(?:for|in|on|with|to|at)\s+(.+?)\s*[?!.]*$/i,
   916	  /^\s*(?:now|again|and)\s+(?:for|in|on|with)\s+(.+?)\s*[?!.]*$/i,
   917	  /^\s*(?:what|how)\s+about\s+(.+?)\s*[?!.]*$/i,
   918	  /^\s*(?:repeat|do it again|run it again)\s+(?:for|in|on|with)\s+(.+?)\s*[?!.]*$/i,
   919	  /^\s*(?:a\s+|i\s+)?(?:teraz\s+)?(?:to\s+)?samo\s+(?:dla|w|we|na|z|do|ale\s+dla|ale\s+w)\s+(.+?)\s*[?!.]*$/i,
   920	  /^\s*(?:a|i)\s+(?:teraz\s+)?(?:dla|w|we|na)\s+(.+?)\s*[?!.]*$/i,
   921	  /^\s*(?:tak samo|analogicznie|powt[oó]rz)\s+(?:dla|w|we|na)\s+(.+?)\s*[?!.]*$/i,
   922	  /^\s*(?:a\s+)?co\s+z\s+(.+?)\s*[?!.]*$/i,
   923	];
   924	
   925	// the forms that can only mean "repeat the previous command" (not "what about X" / "a w X")
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

exec
/bin/bash -lc 'node test/pipeline.test.js' in /workspace/tellsh
 exited 1 in 203ms:
TAP version 13
# Subtest: stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
ok 1 - stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
  ---
  duration_ms: 8.550131
  ...
# Subtest: PowerShell vocabulary maps to the same tool family
ok 2 - PowerShell vocabulary maps to the same tool family
  ---
  duration_ms: 2.30191
  ...
# Subtest: tagger: tool-conditioned BIO spans, only tags valid for the tool
ok 3 - tagger: tool-conditioned BIO spans, only tags valid for the tool
  ---
  duration_ms: 16.819638
  ...
# Subtest: slot merge: tagger primary, regex fills misses and replaces invalid values
ok 4 - slot merge: tagger primary, regex fills misses and replaces invalid values
  ---
  duration_ms: 8.830994
  ...
# Subtest: end-to-end bash + PowerShell + BSD
ok 5 - end-to-end bash + PowerShell + BSD
  ---
  duration_ms: 43.874113
  ...
# Subtest: history: pronouns, "same for", container/service/pid references (EN + PL)
ok 6 - history: pronouns, "same for", container/service/pid references (EN + PL)
  ---
  duration_ms: 57.686951
  ...
# Subtest: history is optional: without it a pronoun request gets a hint, never a guessed value
ok 7 - history is optional: without it a pronoun request gets a hint, never a guessed value
  ---
  duration_ms: 1.182762
  ...
# Subtest: history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
ok 8 - history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
  ---
  duration_ms: 0.670338
  ...
# Subtest: loadHistory reads only the tail of HISTFILE and returns the last n commands
not ok 9 - loadHistory reads only the tail of HISTFILE and returns the last n commands
  ---
  duration_ms: 0.889845
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
  duration_ms: 0.664731
  ...
# Subtest: second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
ok 11 - second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
  ---
  duration_ms: 12.361532
  ...
# Subtest: out-of-domain requests are rejected (also by the composer)
ok 12 - out-of-domain requests are rejected (also by the composer)
  ---
  duration_ms: 1.208601
  ...
# Subtest: env detection and overrides
ok 13 - env detection and overrides
  ---
  duration_ms: 0.868272
  ...
1..13
# tests 13
# suites 0
# pass 12
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 175.806511

exec
/bin/bash -lc 'cat scripts/lib/heldout.js; cat scripts/hybrid/export_data.js; cat scripts/hybrid/train_a_dev.sh' in /workspace/tellsh
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
/bin/bash -lc "git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/history.js | rg -n -C 6 'pid =|systemctl|nonFlags\\[nonFlags|curl|wget'; nl -ba src/fill.js | sed -n '1,260p'" in /workspace/tellsh
 succeeded in 0ms:
510-+  if (PROC_LISTERS.has(head)) return ['pid', 'proc'];
511-+  if (['ss', 'netstat', 'lsof', 'fuser', 'get-nettcpconnection'].includes(head)) return ['port', 'pid', 'proc'];
512-+  if (head === 'docker' || head === 'podman') {
513-+    const sub = nonFlags.slice(0, 2).join(' ');
514-+    return /^(?:ps|stats|container (?:ls|list|ps)|compose ps|top)\b/.test(sub) ? ['container'] : [];
515-+  }
516:+  if (head === 'systemctl') return !nonFlags.length || /^list-/.test(nonFlags[0]) || w.includes('--failed') ? ['service'] : [];
517-+  if (head === 'service') return w.includes('--status-all') ? ['service'] : [];
518-+  if (head === 'get-service' || head === 'gsv') return psArgs(w.slice(1)).pos.length || /-(?:name|displayname)\b/i.test(w.join(' ')) ? [] : ['service'];
519-+  if (head === 'git') {
520-+    const sub = nonFlags[0];
521-+    if (sub === 'branch') return nonFlags.length === 1 && !w.some((a) => /^-(?:d|D|m|M|c|C|-delete|-move|-copy)$/.test(a)) ? ['branch'] : [];
522-+    if (['grep', 'ls-files', 'status', 'clean'].includes(sub)) return ['file', 'dir'];
--
563-+      for (let i = 0; i < rest.length; i++) {
564-+        if (DOCKER_VAL_FLAGS.has(rest[i])) { i++; continue; }
565-+        if (/^-/.test(rest[i])) continue;
566-+        e.container ??= rest[i];
567-+        break;
568-       }
569:-    } else if (head === 'systemctl' || head === 'service') {
570:-      const svc = head === 'systemctl' ? nonFlags[1] : nonFlags[0];
571:-      const verb = head === 'systemctl' ? nonFlags[0] : nonFlags[1];
572--      if (svc) ents.service ??= svc.replace(/\.service$/, '');
573--      if (!intent && SYSTEMCTL_INTENT[verb] && svc) { intent = SYSTEMCTL_INTENT[verb]; slots = { service: ents.service }; }
574--    } else if (head === 'journalctl') {
575--      const i = args.findIndex((a) => a === '-u' || a === '--unit');
576--      if (i >= 0 && args[i + 1]) { ents.service ??= args[i + 1].replace(/\.service$/, ''); intent ??= 'journal_service'; }
577--    } else if (head === 'kill') {
578:-      const pid = nonFlags.find((a) => /^\d+$/.test(a));
579--      if (pid) { ents.pid ??= pid; if (!intent) { intent = 'kill_by_pid'; slots = { pid }; } }
580--    } else if (['pkill', 'killall', 'pgrep', 'pidof'].includes(head)) {
581:-      if (nonFlags[0]) ents.proc ??= nonFlags[nonFlags.length - 1];
582--      if (!intent && head === 'pgrep') { intent = 'find_process'; slots = { name: ents.proc }; }
583--    } else if ((head === 'ps' || head === 'top' || head === 'htop') && args.some((a) => /^-\w*p$/.test(a))) {
584--      const i = args.findIndex((a) => /^-\w*p$/.test(a));
585:-      const pid = (args[i + 1] || '').split(',')[0];
586--      if (/^\d+$/.test(pid)) ents.pid ??= pid;
587--    } else if (head === 'grep' && split.segments.some((s) => s.words[0] === 'ps')) {
588--      if (nonFlags[0]) ents.proc ??= nonFlags[0];
589--    } else if ((head === 'grep' || head === 'rg') && nonFlags[0]) {
590--      const path = nonFlags[1];
591--      if (!intent) {
592--        intent = args.some((a) => /^-\w*l/.test(a)) ? 'grep_files_containing' : 'grep_text';
593--        slots = { pattern: rawOf(nonFlags[0]), ...(path ? { path } : {}) };
594-+      if (DOCKER_INTENT[sub] && e.container != null) setIntent(DOCKER_INTENT[sub], { container: e.container });
595-+    }
596:+  } else if (head === 'systemctl' || head === 'service') {
597:+    const svc = head === 'systemctl' ? nonFlags[1] : nonFlags[0];
598:+    const verb = head === 'systemctl' ? nonFlags[0] : nonFlags[1];
599-+    if (svc) e.service ??= svc.replace(/\.service$/, '');
600-+    if (SYSTEMCTL_INTENT[verb] && svc) setIntent(SYSTEMCTL_INTENT[verb], { service: e.service });
601-+  } else if (head === 'journalctl') {
602-+    const i = args.findIndex((a) => a === '-u' || a === '--unit');
603-+    if (i >= 0 && args[i + 1]) { e.service ??= args[i + 1].replace(/\.service$/, ''); setIntent('journal_service', { service: e.service }); }
604-+  } else if (head === 'kill') {
605-+    const { pos } = parseArgs(args, VALUE_OPTS.kill);
606:+    if (pos.length === 1 && /^\d+$/.test(pos[0])) { e.pid = pos[0]; setIntent('kill_by_pid', { pid: pos[0] }); }
607:+    else if (pos.length) e.pid = AMB + pos.map(rawOf).join(' '); // several PIDs or a job spec: not one process
608-+  } else if (['pkill', 'killall', 'pgrep', 'pidof'].includes(head)) {
609-+    const { pos } = parseArgs(args, VALUE_OPTS[head]);
610-+    if (pos.length === 1) e.proc = pos[0];
611-+    else if (pos.length > 1) e.proc = AMB + pos.map(rawOf).join(' ');
612-+    if (head === 'pgrep' && pos.length === 1) setIntent('find_process', { name: pos[0] });
613-+  } else if ((head === 'ps' || head === 'top' || head === 'htop') && args.some((a) => /^-\w*p$/.test(a))) {
614-+    const i = args.findIndex((a) => /^-\w*p$/.test(a));
615:+    const pid = (args[i + 1] || '').split(',')[0];
616:+    if (/^\d+$/.test(pid)) e.pid = pid;
617-+  } else if ((head === 'grep' || head === 'egrep') && split.segments.some((s, j) => j < segIdx && firstWord(s) === 'ps')) {
618-+    // ps aux | grep -v grep | grep node: the process is the pattern of a non-inverted grep
619-+    const { pos, opts, flags } = parseArgs(args, VALUE_OPTS.grep);
620-+    const inverted = flags.some((f) => /^-[a-zA-Z]*v/.test(f) || f === '--invert-match');
621-+    const pat = opts['-e'] ?? opts['--regexp'] ?? pos[0];
622-+    if (!inverted && pat != null) e.proc = pat;
--
655--    } else if (head === 'lsof' || head === 'ss' || head === 'netstat' || head === 'fuser') {
656--      const pm = args.map(rawOf).join(' ').match(/(?::|tcp:|udp:|sport = :)(\d{2,5})\b/);
657--      if (pm) { ents.port ??= pm[1]; if (!intent) { intent = 'process_on_port'; slots = { port: pm[1] }; } }
658--    } else if (head === 'git') {
659--      const sub = nonFlags[0];
660--      if (['checkout', 'switch', 'merge', 'rebase'].includes(sub) || (sub === 'branch' && nonFlags[1])) {
661:-        const b = nonFlags[nonFlags.length - 1];
662--        const creates = args.some((a) => ['-b', '-B', '-c', '-C'].includes(a));
663--        if (b && b !== sub && b !== '.' && !isGlob(b) && !b.startsWith('-')) {
664--          ents.branch ??= b;
665--          if ((sub === 'checkout' || sub === 'switch')) ents.current ??= b;
666--          if (creates) ents.created ??= b;
667--        }
668:-      } else if (sub === 'push' && nonFlags.length >= 2) ents.branch ??= nonFlags[nonFlags.length - 1];
669--      else if (sub === 'clone' && nonFlags[1]) ents.url ??= nonFlags[1];
670:-      else if (['add', 'diff', 'blame', 'restore', 'rm', 'log'].includes(sub) && nonFlags[1] && nonFlags[1] !== '.') ents.file ??= nonFlags[nonFlags.length - 1];
671--    } else if (['ssh', 'ping', 'dig', 'nslookup', 'traceroute', 'mtr', 'host', 'telnet', 'nc'].includes(head)) {
672--      const h = nonFlags.find((a) => /[\w-]+\.[\w.-]+|^[\w-]+@/.test(a)) || nonFlags[0];
673--      if (h) ents.host ??= h;
674:-    } else if (['curl', 'wget', 'http'].includes(head)) {
675--      const u = args.find((a) => /^https?:\/\//.test(a));
676--      if (u) {
677--        ents.url ??= u;
678--        const base = u.replace(/[?#].*$/, '').split('/').pop();
679:-        const saves = head === 'wget' || args.some((a) => /^-\w*O/.test(a));
680--        if (saves && /\.\w{1,5}$/.test(base)) ents.file ??= base;
681-+      const b = created ?? pos[0];
682-+      if (b != null && b !== '.' && b !== '-' && !isAmbiguous(b) && !String(b).startsWith('-')) {
683-+        e.branch = b;
684-+        e.current = b;
685-+        if (created != null) e.created = b;
686-       }
687--    } else if (head === 'rm' || head === 'trash' || head === 'rmdir') {
688:-      const p = nonFlags[nonFlags.length - 1];
689--      if (p) ents[args.some((a) => /^-\w*r/i.test(a)) || head === 'rmdir' ? 'dir' : 'file'] ??= p;
690--    } else if (head === 'cp' || head === 'mv' || head === 'ln') {
691:-      const p = nonFlags[nonFlags.length - 1];
692--      if (p) ents[typeByExt(p)] ??= p;
693--    } else if (head === 'tar' || head === 'zip') {
694--      const a = nonFlags.find((x) => /\.(tar(\.\w+)?|tgz|zip)$/.test(x));
695--      if (a) ents.file ??= a;
696--    } else if (FILE_HEADS.has(head)) {
697--      const p = nonFlags.filter((a) => !/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(a)).pop();
--
702--    } else if (!INERT_HEADS.has(head.toLowerCase())) {
703--      // unknown command (or unknown cmdlet) naming a path: we cannot tell what it did with it, so an
704--      // older file/dir must not be picked up by "it"
705--      const p = nonFlags.find((a) => PATHLIKE.test(rawOf(a)) && !/^\w+:\/\//.test(rawOf(a)));
706--      if (p) ents[typeByExt(p)] ??= AMB + rawOf(p);
707-+    } else if (['merge', 'rebase'].includes(sub) || (sub === 'branch' && nonFlags[1])) {
708:+      const b = nonFlags[nonFlags.length - 1];
709-+      if (b && b !== sub && b !== '.' && !isGlob(b) && !b.startsWith('-')) e.branch = b;
710:+    } else if (sub === 'push' && nonFlags.length >= 2) e.branch = nonFlags[nonFlags.length - 1];
711-+    else if (sub === 'clone' && nonFlags[1]) e.url = nonFlags[1];
712:+    else if (['add', 'diff', 'blame', 'restore', 'rm', 'log'].includes(sub) && nonFlags[1] && nonFlags[1] !== '.') e.file = nonFlags[nonFlags.length - 1];
713-+  } else if (['ssh', 'ping', 'dig', 'nslookup', 'traceroute', 'mtr', 'host', 'telnet', 'nc'].includes(head)) {
714-+    const h = nonFlags.find((a) => /[\w-]+\.[\w.-]+|^[\w-]+@/.test(a)) || nonFlags[0];
715-+    if (h) e.host = h;
716:+  } else if (['curl', 'wget', 'http'].includes(head)) {
717-+    const u = args.find((a) => /^https?:\/\//.test(a));
718-+    if (u) {
719-+      e.url = u;
720-+      const base = u.replace(/[?#].*$/, '').split('/').pop();
721:+      const saves = head === 'wget' || args.some((a) => /^-\w*O/.test(a));
722-+      if (saves && /\.\w{1,5}$/.test(base)) e.file = base;
723-+    }
724-+  } else if (head === 'rm' || head === 'trash' || head === 'rmdir') {
725-+    const p = oneOf(nonFlags);
726-+    if (p) e[args.some((a) => /^-\w*r/i.test(a)) || head === 'rmdir' ? 'dir' : 'file'] = p;
727-+  } else if (head === 'cp' || head === 'mv' || head === 'ln') {
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
    29	// "merge pull request feature/login", "view the pr for branch fix-1", "pr #45"
    30	const PR_SELECTOR = /\b(?:pull[\s-]+requests?|pr|prs)\s+(?:(?:for|of|on|from|branch|number|no\.?|nr\.?)\s+)*(#?[^\s"'`]+?)[.,!?]?(?=\s|$)/i;
    31	// a function word after "pull request" is not a selector ("merge the pull request and …", "merge pr now")
    32	const PR_NOT_SELECTOR = /^(?:the|a|an|this|that|it|its|my|our|and|or|then|now|please|pls|into|to|with|in|at|is|was|which|again|request|requests)$/i;
    33	const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
    34	const PLACEHOLDER = (name) => `<${name.toUpperCase()}>`;
    35	
    36	// sed needs regex-escaped search text and &,\,/ escaped replacement
    37	// (a newline would end the s command: written as \n, which never matches inside one line)
    38	const sedEscapeOld = (s) => s.replace(/[\\/.*^$[\]]/g, '\\$&').replace(/\n/g, '\\n');
    39	const sedEscapeNew = (s) => s.replace(/[\\/&]/g, '\\$&').replace(/\n/g, '\\n');
    40	
    41	/** Recompute derived slots after values were merged/overridden (tagger, history rules). */
    42	export function finalizeSlots(intent, v) {
    43	  if (v.ext != null && v.glob == null) v.glob = `*.${v.ext}`;
    44	  if (intent.id === 'find_by_name' && v.name) v.namepat = /[*?]/.test(v.name) || /\.\w+$/.test(v.name) ? v.name : `*${v.name}*`;
    45	  if (intent.id === 'replace_text' && v.old != null && v.new != null) v.sedexpr = `s/${sedEscapeOld(v.old)}/${sedEscapeNew(v.new)}/g`;
    46	  return v;
    47	}
    48	
    49	/** Resolve the values an intent can use from the generic extraction. */
    50	export function resolveSlots(intent, ex) {
    51	  const v = {};
    52	  const has = (k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
    53	  const textual = ['pattern', 'message', 'text', 'name', 'old', 'branch', 'service', 'container', 'pkg', 'cmd', 'user', 'script']
    54	    .some((k) => k in intent.slots) || ['base64_encode', 'base64_decode', 'replace_text', 'find_by_name'].includes(intent.id);
    55	  const paths = [...(textual ? ex.paths : ex.pathsWithQuoted)];
    56	  // "grep for ~/foo in src": the path-like word right after the search verb is the pattern, the other
    57	  // path is where to search (only when there is one: otherwise the single path is the search root)
    58	  let pathPattern = null;
    59	  if (has('pattern') && !ex.quoted.length && paths.length >= 2) {
    60	    const m = foldKeepLength(String(ex.text)).toLowerCase().match(/(?:^|\s)(?:grep|search|look|find|szukaj|wyszukaj|poszukaj|znajdz)\s+(?:for\s+|(?:the\s+)?(?:text|string|pattern|word)\s+)?(\S+)/);
    61	    const at = m ? m.index + m[0].length - m[1].length : -1;
    62	    const word = at >= 0 ? String(ex.text).slice(at, at + m[1].length) : null;
    63	    if (word != null && paths.includes(word)) { pathPattern = word; paths.splice(paths.indexOf(word), 1); }
    64	  }
    65	  // "on the disk" / "na (całym) dysku" is a search scope, never the object of a changing command
    66	  // ("usuń folder cache na dysku" is not `rm -r /`), and a folder the user names wins over it
    67	  if (ex.rootPhrase && paths.includes('/') && !/(^|\s)["']?\/["']?(?=[\s,.;:!?]|$)/.test(ex.text) &&
    68	      ((intent.risk !== 'safe' && !/^find \{path\}/.test(String(intent.template))) || (has('path') && pickDir(ex)))) {
    69	    paths.splice(paths.indexOf('/'), 1);
    70	  }
    71	
    72	  // archive-type paths (compress/extract)
    73	  const isArchive = (p) => /\.(tar\.gz|tgz|tar|zip|tar\.bz2|tar\.xz|gz)$/i.test(p) && !/^(tar\.gz|tar|tgz|zip|gz)$/i.test(p);
    74	  if (has('archive')) {
    75	    const a = paths.find(isArchive);
    76	    if (a) { v.archive = a; paths.splice(paths.indexOf(a), 1); }
    77	  }
    78	  if (has('src') || has('dst')) {
    79	    if (paths[0]) v.src = paths[0];
    80	    if (paths[1]) v.dst = paths[1];
    81	    else if (paths[0]) {
    82	      const d = pickDest(ex);
    83	      if (d && d !== paths[0]) v.dst = d;
    84	    }
    85	  }
    86	  if (has('file')) {
    87	    const f = paths.find((p) => /\.[A-Za-z0-9]+$/.test(p) || p.includes('/')) || paths[0];
    88	    if (f) v.file = f;
    89	    if (has('dest') && paths.length > 1) v.dest = paths.find((p) => p !== f);
    90	  }
    91	  if (has('path') && paths.length) {
    92	    v.path = paths[0];
    93	  } else if (has('path') && !['find_by_name', 'chown'].includes(intent.id)) {
    94	    const d = pickDir(ex);
    95	    if (d) v.path = d;
    96	  }
    97	  if (has('archive') && !v.archive) {
    98	    const base = (v.path || '.').replace(/\/+$/, '').split('/').pop();
    99	    const ext = intent.id === 'compress_zip' ? '.zip' : '.tar.gz';
   100	    v.archive = (!base || base === '.' || base === '..' || base === '~') ? `archive${ext}` : `${base}${ext}`;
   101	  }
   102	  if (ex.count != null) v.count = ex.count;
   103	  if (has('depth') && ex.count != null && ex.count <= 10) v.depth = ex.count;
   104	  if (ex.size) v.size = ex.size;
   105	  if (ex.duration) {
   106	    v.age = ex.duration.age;
   107	    v.days = ex.duration.days;
   108	    v.since = ex.duration.since;
   109	  } else if (has('days') && ex.count != null) {
   110	    v.days = ex.count;
   111	  }
   112	  if (ex.port) v.port = ex.port;
   113	  if (has('pid')) {
   114	    if (ex.pid) v.pid = ex.pid;
   115	    else if (ex.numbers?.length) v.pid = ex.numbers.find((n) => n > 1);
   116	  }
   117	  if (has('port') && !v.port && ex.numbers?.length) v.port = ex.numbers.find((n) => n >= 20 && n < 65536);
   118	  if (ex.mode && has('mode')) v.mode = ex.mode;
   119	  // line range: "lines 10-20", "od 10 do 20", "10 to 20", "from line 5 through 9"; else the first two numbers
   120	  if (has('start')) {
   121	    const m = String(ex.text).match(/(?<![\w.])(\d{1,9})\s*(?:-|–|—|\.\.|,|:|to|do|through|thru|until|till|and|i)\s*(?:line\s+|linii\s+|linia\s+)?(\d{1,9})(?![\w.])/i);
   122	    const [a, b] = m ? [+m[1], +m[2]] : (ex.numbers || []).slice(0, 2);
   123	    if (a > 0 && b > 0) { v.start = Math.min(a, b); v.end = Math.max(a, b); }
   124	    delete v.count;
   125	  }
   126	  if (has('num')) {
   127	    const n = ex.pid ?? ex.numbers?.find((x) => x > 0) ?? ex.count;
   128	    if (n != null) v.num = n;
   129	    delete v.count;
   130	  }
   131	  if (has('pr')) {
   132	    // the pull request the user names: a URL or a branch is kept as it is (validation withholds an odd one), never
   133	    // dropped for a bare `gh pr merge`, which acts on the current branch's pull request
   134	    const sel = ex.urls[0] ?? String(ex.text).match(PR_SELECTOR)?.[1];
   135	    const n = ex.pid ?? ex.numbers?.find((x) => x > 0) ?? ex.count;
   136	    if (sel != null && !PR_NOT_SELECTOR.test(sel)) v.pr = String(sel).replace(/^#/, '');
   137	    else if (n != null) v.pr = n;
   138	    delete v.count;
   139	  }
   140	  if (ex.ext) v.glob = `*.${ex.ext}`;
   141	  if (ex.urls.length) v.url = ex.urls[0];
   142	  else if (has('url') && ex.hosts.length) v.url = /^\w+:\/\//.test(ex.hosts[0]) ? ex.hosts[0] : `https://${ex.hosts[0]}`;
   143	
   144	  if (pathPattern != null) v.pattern = pathPattern;
   145	  for (const k of ['name', 'service', 'container', 'pkg', 'cmd', 'script', 'var', 'branch', 'user', 'pattern', 'host', 'target', 'message']) {
   146	    if (has(k) && v[k] == null) {
   147	      const val = pickArg(k, ex);
   148	      if (val != null && val !== '') v[k] = val;
   149	    }
   150	  }
   151	  if (intent.id === 'base64_encode' || intent.id === 'base64_decode') {
   152	    const t = pickArg('text', ex);
   153	    const fileWord = /\b(plik\w*|files?)\s+\S+\.\w+/i.test(ex.text);
   154	    if (ex.quoted.length) v.text = ex.quoted[0];
   155	    else if (paths.length && fileWord) v.file = paths[0];
   156	    else if (paths.length && !(t && t.includes(' '))) v.file = paths[0];
   157	    else if (t) v.text = t;
   158	  }
   159	  if (intent.id === 'find_by_name') {
   160	    let name = v.name ?? (ex.quoted[0] || paths.find((p) => !p.includes('/') && p !== '.' && p !== '~'));
   161	    if (!name) {
   162	      const w = ex.rest.match(/\b(?:named|called|name|nazwie|nazwa|nazwany|nazywa sie|nazywajacy sie|plik|file|pliku)\s+(?:o\s+)?(?:nazwie\s+)?([\w.*-]+)/);
   163	      if (w && !/^(o|the|a|nazwie|named|called)$/.test(w[1])) name = w[1];
   164	    }
   165	    if (name) {
   166	      v.name = name;
   167	      v.namepat = /[*?]/.test(name) || /\.\w+$/.test(name) ? name : `*${name}*`;
   168	      if (v.path === name) v.path = paths.find((p) => p !== name);
   169	    }
   170	  }
   171	  if (intent.id === 'replace_text') {
   172	    let [o, n] = ex.taggerOnly ? [ex.tagged.PATTERN?.[0], ex.tagged.REPL?.[0]] : ex.quoted;
   173	    if (!ex.taggerOnly && (o == null || n == null)) {
   174	      const m = ex.text.match(/(?:replace|substitute|change|swap|zamie[nń]|zmie[nń]|podmie[nń]|zast[aą]p)\s+(?:all\s+|every\s+|wszystkie\s+|ka[zż]de\s+)?(?:occurrences of\s+|wyst[aą]pienia\s+)?(?:word\s+|s[lł]owo\s+|text\s+|tekst\s+|string\s+)?["'„]?([^\s"'”]+)["'”]?\s+(?:with|to|for|into|by|na|->|=>)\s+["'„]?([^\s"'”]+)["'”]?/i);
   175	      if (m) { o = o ?? m[1]; n = n ?? m[2]; }
   176	    }
   177	    if (o != null) v.old = o;
   178	    if (n != null) v.new = n;
   179	    if (o != null && n != null) v.sedexpr = `s/${sedEscapeOld(o)}/${sedEscapeNew(n)}/g`;
   180	    // the file is the path that is not one of the replaced words
   181	    if (v.file && (v.file === o || v.file === n)) v.file = paths.find((p) => p !== o && p !== n);
   182	  }
   183	  if (intent.id === 'chown' && v.user && v.path === v.user) delete v.path;
   184	  for (const k of Object.keys(v)) if (v[k] === undefined) delete v[k];
   185	  return v;
   186	}
   187	
   188	function renderValue(name, raw, values, quote) {
   189	  if (!(name in values)) return null;
   190	  let val = values[name];
   191	  if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
   192	  if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
   193	  return quote(val, { tilde: PATH_SLOTS.has(name), name });
   194	}
   195	
   196	const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;
   197	
   198	/**
   199	 * Fill a template. Returns { command, missing[] }.
   200	 * `values` = resolved slots merged over intent defaults.
   201	 */
   202	export function render(template, values, required = [], quote = shQuote, keepOptional = []) {
   203	  const missing = [];
   204	  const isSlot = (name) => name in values || required.includes(name) || SLOT_NAMES.test(name);
   205	  // Single pass over the template: every {slot} and «optional segment» is substituted exactly once and
   206	  // inserted values are never scanned again (a value containing "{file}" must stay inert text).
   207	  const out = template.replace(/«([^»]*)»|\{(\w+)(!raw)?\}/g, (m, seg, name, raw) => {
   208	    if (seg != null) {
   209	      let ok = true;
   210	      const r = seg.replace(/\{(\w+)(!raw)?\}/g, (m2, n2, raw2) => {
   211	        if (!ok) return m2;
   212	        const val = renderValue(n2, !!raw2, values, quote);
   213	        // an operand the request named but that is not valid (keepOptional) keeps its placeholder: the optional part
   214	        // is not silently dropped (`npm install <PKG>`, never `npm install`)
   215	        if (val == null && keepOptional.includes(n2)) { missing.push(n2); return PLACEHOLDER(n2); }
   216	        if (val == null) { ok = false; return m2; }
   217	        return val;
   218	      });
   219	      return ok ? (/^\s/.test(r) ? r : ' ' + r) : '';
   220	    }
   221	    if (!isSlot(name)) return m; // not a slot (e.g. awk braces, %{http_code}, PowerShell script blocks)
   222	    const val = renderValue(name, !!raw, values, quote);
   223	    if (val == null) {
   224	      missing.push(name);
   225	      return PLACEHOLDER(name);
   226	    }
   227	    return val;
   228	  });
   229	  return { command: out, missing };
   230	}
   231	
   232	const DERIVED_REQUIRED = { namepat: 'name', glob: 'ext', sedexpr: 'old' };
   233	
   234	const SIZE_MULT = { c: 1, k: 1024, M: 1024 ** 2, G: 1024 ** 3 };
   235	/** Slots derived from others so every shell can use the unit it needs (find: -mmin/-size, PowerShell: minutes/bytes). */
   236	export function deriveSlots(v) {
   237	  if (v.glob && v.ext == null) { const m = String(v.glob).match(/^\*\.([\w]+)$/); if (m) v.ext = m[1]; }
   238	  if (v.minutes == null && v.age) {
   239	    const m = String(v.age).match(/^-m(min|time) -(\d+)$/);
   240	    if (m) v.minutes = m[1] === 'min' ? +m[2] : +m[2] * 1440;
   241	  }
   242	  if (v.sizeBytes == null && v.size != null) {
   243	    const m = String(v.size).match(/^(\d+)([ckMG]?)$/);
   244	    if (m) v.sizeBytes = +m[1] * (SIZE_MULT[m[2]] ?? 512);
   245	  }
   246	  return v;
   247	}
   248	
   249	/** env from the legacy `platform` option */
   250	export const envFromPlatform = (platform = process.platform) => ({
   251	  shell: 'bash',
   252	  os: platform === 'darwin' ? 'darwin' : platform === 'win32' ? 'win32' : 'linux',
   253	  coreutils: platform === 'darwin' ? 'bsd' : 'gnu',
   254	});
   255	
   256	/**
   257	 * Build a full suggestion for an intent and query.
   258	 *   env: { shell, os, coreutils } (default: bash on `platform`)
   259	 *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
   260	 * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
import {buildContext} from './src/history.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const h of ['systemd-run --machine=web ps -p 42','systemd-run --machine web ps -p 42','run0 --machine=web ps -p 42','sudo --host=prod ps -p 42','sudo -h prod cat /etc/config','systemd-run --property=RootDirectory=/srv cat /etc/config','nsenter -t 1234 -p ps -p 42']){
const q=h.includes('ps -p')?'kill it':'delete it'; const s=suggest(q,{history:[h],env}); console.log(JSON.stringify({h,q,command:s.command,understood:s.understood,missing:s.missing,context:s.context,ents:buildContext([h]).ents}));
}
for(const q of ['show pull request feature/login','open pull request feature/login','view pull request feature/login','merge pull request \"feature/login\"','merge pull request \\'feature/login\\'','merge pull request named feature/login','merge pr for branch feature/login']){let s=suggest(q,{env});console.log(JSON.stringify({q,intent:s.intent,command:s.command,confidence:s.confidence,risk:s.risk,missing:s.missing}));}
JS" in /workspace/tellsh
 succeeded in 181ms:
{"h":"systemd-run --machine=web ps -p 42","q":"kill it","command":"kill 42","understood":true,"missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pid\" from history = 42"},"ents":{"pid":"42"}}
{"h":"systemd-run --machine web ps -p 42","q":"kill it","command":"kill 42","understood":true,"missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pid\" from history = 42"},"ents":{"pid":"42"}}
{"h":"run0 --machine=web ps -p 42","q":"kill it","command":"kill 42","understood":true,"missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pid\" from history = 42"},"ents":{"pid":"42"}}
{"h":"sudo --host=prod ps -p 42","q":"kill it","command":"kill 42","understood":true,"missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"pid\" from history = 42"},"ents":{"pid":"42"}}
{"h":"sudo -h prod cat /etc/config","q":"delete it","command":"rm /etc/config","understood":true,"missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = /etc/config"},"ents":{"file":"/etc/config"}}
{"h":"systemd-run --property=RootDirectory=/srv cat /etc/config","q":"delete it","command":"rm /etc/config","understood":true,"missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = /etc/config"},"ents":{"file":"/etc/config"}}
{"h":"nsenter -t 1234 -p ps -p 42","q":"kill it","command":"kill <PID>","understood":true,"missing":["pid"],"context":{"used":true,"commands":1,"rule":"refused","note":"the latest pid in history (42) cannot be read unambiguously; not guessing"},"ents":{"pid":"\u000042"}}
{"q":"show pull request feature/login","intent":"gh_pr_create","command":"gh pr create --fill","confidence":0.3795,"risk":"medium","missing":[]}
{"q":"open pull request feature/login","intent":"gh_pr_create","command":"gh pr create --fill","confidence":0.8352,"risk":"medium","missing":[]}
{"q":"view pull request feature/login","intent":"gh_pr_create","command":"gh pr create --fill","confidence":0.458,"risk":"medium","missing":[]}
{"q":"merge pull request \"feature/login\"","intent":"gh_pr_merge","command":"gh pr merge","confidence":0.943,"risk":"medium","missing":[]}
{"q":"merge pull request 'feature/login'","intent":"gh_pr_merge","command":"gh pr merge","confidence":0.943,"risk":"medium","missing":[]}
{"q":"merge pull request named feature/login","intent":"gh_pr_merge","command":"gh pr merge named","confidence":0.9158,"risk":"medium","missing":[]}
{"q":"merge pr for branch feature/login","intent":"gh_pr_merge","command":"gh pr merge feature/login","confidence":0.9699,"risk":"medium","missing":[]}

exec
/bin/bash -lc 'git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- scripts/train.py scripts/gen_data.js; cat scripts/hybrid/export_encoder.py' in /workspace/tellsh
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
/bin/bash -lc "git show 0d87457cb7740ec6fa99db260b63b35cfdbb751c:src/history.js | sed -n '185,260p'; cat scripts/real/prepare_real.js; cat scripts/real/real_rows.js" in /workspace/tellsh
 succeeded in 0ms:
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

/** PowerShell native commands. Returns true when the head was recognised. */
function psNative(head, args, ents, setIntent) {
  const kind = PS_NATIVE[head];
  if (!kind) return false;
  const { named, pos, sw } = psArgs(args);
  const path = named.literalpath ?? named.lp ?? named.path ?? named.pspath ?? pos[0];
  if (kind === 'file' && path != null) ents.file ??= path;
  else if (kind === 'path' && path != null) ents[typeByExt(path)] ??= path;
  else if (kind === 'dir' && path != null) ents.dir ??= path;
  else if (kind === 'remove' && path != null) ents[[...sw].some((s) => 'recurse'.startsWith(s)) ? 'dir' : typeByExt(path)] ??= path;
  else if (kind === 'copy') { const d = named.destination ?? pos[1]; if (d != null) ents[typeByExt(d)] ??= d; }
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

codex
Two major issues reproduce: a quoted pull-request branch is dropped, leaving `gh pr merge` to target the current branch, and history from `systemd-run --machine=…` can produce a local `kill` command. The test run also hit filesystem errors because this workspace is read-only; I’m checking for failures unrelated to that restriction.
exec
/bin/bash -lc "node --input-type=module <<'JS'
import {readdirSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
let pass=0,fail=0;
for (const f of readdirSync('test').filter(x=>x.endsWith('.test.js'))) {
 const r=spawnSync(process.execPath,['test/'+f],{encoding:'utf8'}); const o=r.stdout+r.stderr;
 pass += +(o.match(/"'^# pass ('"\\d+)/m)?.[1]||0); fail += +(o.match(/"'^# fail ('"\\d+)/m)?.[1]||0);
 if(r.status) console.log(f, o.split('\\n').filter(x=>/not ok|error:|EROFS|EACCES|expected:|actual:/.test(x)).join('\\n'));
}
console.log({pass,fail});
JS" in /workspace/tellsh
exec
/bin/bash -lc "cat scripts/hybrid/lm_rerank.py | sed -n '1,220p'; cat scripts/hybrid/prune_vocab.py" in /workspace/tellsh
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
/bin/bash -lc "cat scripts/hybrid/dump_cascade.js; cat scripts/hybrid/sets.js; nl -ba scripts/hybrid/lm_rerank.py | sed -n '235,275p'; rg -n 'prune|eval.*vocab|blind' HYBRID.md | head -20; git show 0d87457cb7740ec6fa99db260b63b35cfdbb751c:src/history.js | rg -n -C 4 'unwrap|sudo|const w'" in /workspace/tellsh
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
   235	    m.config.use_cache = False
   236	    ex = tok(['Request: x\nAnswer: '], return_tensors='pt')
   237	    fp = a.out.replace('.onnx', '.fp32.onnx')
   238	    torch.onnx.export(Head(m), (ex['input_ids'], ex['attention_mask']), fp, input_names=['input_ids', 'attention_mask'],
   239	                      output_names=['letters'], dynamic_axes={'input_ids': {0: 'b', 1: 't'}, 'attention_mask': {0: 'b', 1: 't'}, 'letters': {0: 'b'}},
   240	                      opset_version=17, dynamo=False)
   241	    quantize_dynamic(fp, a.out, weight_type=QuantType.QInt8)
   242	    print('exported', a.out, os.path.getsize(a.out) / 1e6, 'MB')
   243	
   244	
   245	if __name__ == '__main__':
   246	    ap = argparse.ArgumentParser()
   247	    ap.add_argument('cmd')
   248	    ap.add_argument('--model', default='HuggingFaceTB/SmolLM2-135M-Instruct')
   249	    ap.add_argument('--cands', default=os.path.join(ROOT, 'build/hybrid/cands_ship.jsonl'))
   250	    ap.add_argument('--set', default='dev')
   251	    ap.add_argument('--sets', default='dev,eval,shell,blind')
   252	    ap.add_argument('--n', type=int, default=300)
   253	    ap.add_argument('--fewshot', action='store_true')
   254	    ap.add_argument('--plain', action='store_true')
   255	    ap.add_argument('--lora', action='store_true')
   256	    ap.add_argument('--steps', type=int, default=600)
   257	    ap.add_argument('--bs', type=int, default=8)
   258	    ap.add_argument('--accum', type=int, default=1, help='split each batch into this many micro-batches')
   259	    ap.add_argument('--lr', type=float, default=1e-4)
   260	    ap.add_argument('--threads', type=int, default=2)
   261	    ap.add_argument('--max-conf', type=float, default=2.0)
   262	    ap.add_argument('--sample', type=float, default=1.0)
   263	    ap.add_argument('--dtype', default='float32', help='bfloat16 halves memory (inference)')
   264	    ap.add_argument('--out', default=os.path.join(ROOT, 'build/hybrid/lm'))
   265	    a = ap.parse_args()
   266	    torch.set_num_threads(a.threads)
   267	    {'zeroshot': cmd_zeroshot, 'train': cmd_train, 'score': cmd_score, 'export': cmd_export}[a.cmd](a)
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
279-  const t = line.trim();
280-  const k = lineKind(t, kind);
281-  const tm = t.match(/^(?:npx\s+(?:-y\s+)?)?tellsh\s+(.*)$/s);
282-  if (tm) {
283:    const w = wordsOf(tm[1], k);
284-    const q = w ? w.filter((x) => !/^-/.test(x)).map(rawOf).join(' ') : '';
285-    const r = q && classify ? classify(q) : null;
286-    if (r?.intent) { intent = r.intent; slots = r.slots || {}; entsFromSlots(intent, slots, ents); }
287-    return { line: t, intent, slots, ents, fromTellsh: true, ambiguous };
--
298-  if (inv) { intent = inv.intent; slots = inv.slots; ambiguous = inv.ambiguous; entsFromSlots(intent, slots, ents); }
299-  const setIntent = (id, s) => { if (!intent) { intent = id; slots = s; } };
300-  for (const { words } of split.segments) {
301-    let w = words;
302:    while (w.length && (w[0] === 'sudo' || /^\w+=/.test(w[0]))) w = w.slice(1);
303-    if (!w.length) continue;
304-    if (isAmbiguous(w[0])) {
305-      if (w.slice(1).some((a) => PATHLIKE.test(rawOf(a)))) { ents.file ??= AMB + t; ents.dir ??= AMB + t; }
306-      continue;
--
542-  if (ex.hosts.length && (has('host') || has('target'))) return { slot: has('host') ? 'host' : 'target', value: ex.target || ex.hosts[0] };
543-  if (ex.urls.length && has('url')) return { slot: 'url', value: ex.urls[0] };
544-  if (ex.ext && has('ext')) return { slot: 'ext', value: ex.ext };
545-  if (ex.count != null && (has('count') || has('pid'))) return { slot: has('pid') ? 'pid' : 'count', value: ex.count };
546:  const word = arg.trim().replace(/^(the|ten|ta|to|kontener\w*|container|service|usług\w*|branch|gałąź|galaz|proces\w*|process)\s+/i, '').trim();
547-  if (!/^[\w@.:/~+-]+$/.test(word)) return null;
548-  for (const k of ['container', 'service', 'name', 'branch', 'pkg', 'host', 'path', 'file']) if (has(k)) return { slot: k, value: word };
549-  return null;
550-}
--
601- * release/2.3) wins; deleting/switching a branch skips the branch that is checked out; else most recent.
602- */
603-function chooseValue(type, fq, ctx, verb) {
604-  let vals = ctx.all?.[type] || (ctx.ents[type] != null ? [String(ctx.ents[type])] : []);
605:  const words = fq.split(/[^a-z0-9]+/).filter((w) => w.length >= 4 && !/^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back)$/.test(w));
606-  const named = vals.find((v) => !isAmbiguous(v) && words.some((w) => foldKeepLength(v).toLowerCase().includes(w)));
607-  if (named) return named;
608-  if (type === 'branch' && (verb === 'delete' || verb === 'switch') && ctx.currentBranch) {
609-    const other = vals.filter((v) => v !== ctx.currentBranch);

 succeeded in 18113ms:
cli.test.js 
pipeline.test.js 
regressions.test.js 
regressions10.test.js 
regressions11.test.js 
regressions12.test.js 
regressions2.test.js 
regressions4.test.js 
regressions8.test.js 
regressions9.test.js 
shells.test.js 
templates.test.js 
{ pass: 0, fail: 0 }

exec
/bin/bash -lc "git diff 0d87457cb7740ec6fa99db260b63b35cfdbb751c..HEAD -- src/catalog.js src/variants.js; sed -n '190,300p' src/cli.js; rg -n 'activat|venv|child|subshell' README.md" in /workspace/tellsh
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
137:(`py -m pip` on Windows), activating a virtualenv (per shell), `<tool> --version` / `--help`, printing a line range
194:    `run0 --user=bob …`) or a `cd` inside a `( … )` subshell (`(cd /repo && cat notes.txt)`, also a redirection there:

exec
/bin/bash -lc "rg -n '\"intent\":\"gh_pr_create\".*(show|view)|\"text\":\"["'^"]*(show|view)[''^"]*".*"intent":"gh_pr_create"'"' data/intents/g08_devtools.jsonl; rg -n 'gh_pr_(create|view)' data/intents/g08_devtools.jsonl | head -10; nl -ba src/compose.js | sed -n '1,220p'" in /workspace/tellsh
 succeeded in 0ms:
1204:{"text": "gh pr view 42", "intent": "gh_pr_view", "lang": "en"}
1205:{"text": "show PR 42", "intent": "gh_pr_view", "lang": "en"}
1206:{"text": "open pull request 117 details", "intent": "gh_pr_view", "lang": "en"}
1207:{"text": "view pull request #8", "intent": "gh_pr_view", "lang": "en"}
1208:{"text": "what's in PR 256?", "intent": "gh_pr_view", "lang": "en"}
1209:{"text": "show the description of PR 73", "intent": "gh_pr_view", "lang": "en"}
1210:{"text": "show my current branch's pull request", "intent": "gh_pr_view", "lang": "en"}
1211:{"text": "view the pr for this branch", "intent": "gh_pr_view", "lang": "en"}
1212:{"text": "details of pull request 1024", "intent": "gh_pr_view", "lang": "en"}
1213:{"text": "gh pr view", "intent": "gh_pr_view", "lang": "en"}
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

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {spawnSync} from 'node:child_process';
const r=spawnSync(process.execPath,['test/pipeline.test.js'],{encoding:'utf8'}); console.log({status:r.status,error:r.error?.message,signal:r.signal,stdout:r.stdout,stderr:r.stderr});
JS" in /workspace/tellsh
 succeeded in 342ms:
{
  status: 1,
  error: 'spawnSync /usr/bin/node EPERM',
  signal: null,
  stdout: '',
  stderr: ''
}

exec
/bin/bash -lc 'systemd-run --help' in /workspace/tellsh
 succeeded in 0ms:
systemd-run [OPTIONS...] COMMAND [ARGUMENTS...]

Run the specified command in a transient scope or service.

  -h --help                       Show this help
     --version                    Show package version
     --no-ask-password            Do not prompt for password
     --user                       Run as user unit
  -H --host=[USER@]HOST           Operate on remote host
  -M --machine=CONTAINER          Operate on local container
     --scope                      Run this as scope rather than service
  -u --unit=UNIT                  Run under the specified unit name
  -p --property=NAME=VALUE        Set service or scope unit property
     --description=TEXT           Description for unit
     --slice=SLICE                Run in the specified slice
     --slice-inherit              Inherit the slice from the caller
     --expand-environment=BOOL    Control expansion of environment variables
     --no-block                   Do not wait until operation finished
  -r --remain-after-exit          Leave service around until explicitly stopped
     --wait                       Wait until service stopped again
     --send-sighup                Send SIGHUP when terminating
     --service-type=TYPE          Service type
     --uid=USER                   Run as system user
     --gid=GROUP                  Run as system group
     --nice=NICE                  Nice level
     --working-directory=PATH     Set working directory
  -d --same-dir                   Inherit working directory from caller
  -E --setenv=NAME[=VALUE]        Set environment variable
  -t --pty                        Run service on pseudo TTY as STDIN/STDOUT/
                                  STDERR
  -P --pipe                       Pass STDIN/STDOUT/STDERR directly to service
  -q --quiet                      Suppress information messages during runtime
     --json=pretty|short|off      Print unit name and invocation id as JSON
  -G --collect                    Unload unit after it ran, even when failed
  -S --shell                      Invoke a $SHELL interactively
     --ignore-failure             Ignore the exit status of the invoked process
     --background=COLOR           Set ANSI color for background

Path options:
     --path-property=NAME=VALUE   Set path unit property

Socket options:
     --socket-property=NAME=VALUE Set socket unit property

Timer options:
     --on-active=SECONDS          Run after SECONDS delay
     --on-boot=SECONDS            Run SECONDS after machine was booted up
     --on-startup=SECONDS         Run SECONDS after systemd activation
     --on-unit-active=SECONDS     Run SECONDS after the last activation
     --on-unit-inactive=SECONDS   Run SECONDS after the last deactivation
     --on-calendar=SPEC           Realtime timer
     --on-timezone-change         Run when the timezone changes
     --on-clock-change            Run when the realtime clock jumps
     --timer-property=NAME=VALUE  Set timer unit property

See the systemd-run(1) man page for details.

exec
/bin/bash -lc "node --input-type=module <<'JS' | rg '"'^(not ok|# tests |# pass |# fail |# duration)|error:|code: .(EROFS|EPERM|EACCES)'"'
import {readdirSync} from 'node:fs';
for (const f of readdirSync('test').filter(x=>x.endsWith('.test.js'))) await import('./test/'+f);
JS" in /workspace/tellsh
exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
import {resolveSlots} from './src/fill.js';
import {extractSlots} from './src/slots.js';
import {BY_ID} from './src/catalog.js';
for (const shell of ['bash','powershell','cmd']) {
 for (const q of ['merge pull request feature/login', 'merge pull request \"feature/login\"', 'merge pull request \"123\"', 'merge pull request \"foo;rm\"']) {
 const s=suggest(q,{env:{shell,os:shell==='bash'?'linux':'win32',coreutils:'gnu'}}); console.log({shell,q,command:s.command,missing:s.missing,slots:resolveSlots(BY_ID.gh_pr_merge,extractSlots(q))});
 }
}
JS" in /workspace/tellsh
 succeeded in 89ms:
{
  shell: 'bash',
  q: 'merge pull request feature/login',
  command: 'gh pr merge feature/login',
  missing: [],
  slots: { pr: 'feature/login' }
}
{
  shell: 'bash',
  q: 'merge pull request "feature/login"',
  command: 'gh pr merge',
  missing: [],
  slots: {}
}
{
  shell: 'bash',
  q: 'merge pull request "123"',
  command: 'gh pr merge 123',
  missing: [],
  slots: {}
}
{
  shell: 'bash',
  q: 'merge pull request "foo;rm"',
  command: 'gh pr merge',
  missing: [],
  slots: {}
}
{
  shell: 'powershell',
  q: 'merge pull request feature/login',
  command: 'gh pr merge feature/login',
  missing: [],
  slots: { pr: 'feature/login' }
}
{
  shell: 'powershell',
  q: 'merge pull request "feature/login"',
  command: 'gh pr merge',
  missing: [],
  slots: {}
}
{
  shell: 'powershell',
  q: 'merge pull request "123"',
  command: 'gh pr merge 123',
  missing: [],
  slots: {}
}
{
  shell: 'powershell',
  q: 'merge pull request "foo;rm"',
  command: 'gh pr merge',
  missing: [],
  slots: {}
}
{
  shell: 'cmd',
  q: 'merge pull request feature/login',
  command: 'gh pr merge feature/login',
  missing: [],
  slots: { pr: 'feature/login' }
}
{
  shell: 'cmd',
  q: 'merge pull request "feature/login"',
  command: 'gh pr merge',
  missing: [],
  slots: {}
}
{
  shell: 'cmd',
  q: 'merge pull request "123"',
  command: 'gh pr merge 123',
  missing: [],
  slots: {}
}
{
  shell: 'cmd',
  q: 'merge pull request "foo;rm"',
  command: 'gh pr merge',
  missing: [],
  slots: {}
}

codex
The quoted-target failure occurs for Bash, PowerShell, and cmd. The history failure comes from stripping the wrapper without retaining its machine or host scope. Test subprocesses are also blocked by the sandbox (`EPERM`), so I can’t claim a clean full-suite run.
 succeeded in 13404ms:
not ok 1 - --version
  error: |-
not ok 2 - --help
  error: |-
not ok 3 - --json dry-run (EN)
  error: 'Unexpected end of JSON input'
not ok 4 - --json dry-run (PL)
  error: 'Unexpected end of JSON input'
not ok 5 - dry-run prints command and never executes
  error: |-
not ok 6 - non-TTY without --yes only prints
  error: |-
not ok 8 - --yes refuses non-safe commands
  error: |-
not ok 9 - unknown request -> I don't understand + candidates, exit 3
  error: |-
not ok 10 - --platform darwin (alias of --os)
  error: 'Unexpected end of JSON input'
not ok 11 - --shell powershell / cmd / fish render natively; gaps exit 5
  error: 'Unexpected end of JSON input'
not ok 12 - --history=FILE resolves references and never echoes the history
  error: "EROFS: read-only file system, mkdtemp '/tmp/tellsh-cli-XXXXXX'"
  code: 'EROFS'
not ok 13 - composed commands are labelled experimental and refused by --yes
  error: |-
not ok 108 - loadHistory reads only the tail of HISTFILE and returns the last n commands
  error: "EROFS: read-only file system, mkdtemp '/tmp/tellsh-hist-XXXXXX'"
  code: 'EROFS'
not ok 113 - render: values are substituted once; a value containing {slot} stays inert
  error: 'spawnSync bash EPERM'
  code: 'EPERM'
not ok 115 - CLI: the reported injection payloads stay quoted (bash) and never execute
  error: 'Unexpected end of JSON input'
not ok 117 - CLI: typographic-quote payloads stay one PowerShell argument (win32 native and bash -c wrapper)
  error: 'Unexpected end of JSON input'
not ok 154 - BSD duplicate finder prints every member of a group, including the first
  error: 'spawnSync sh EPERM'
  code: 'EPERM'
not ok 156 - pwsh parse check passes the source only through an env var, never as a -Command argument
  error: "EROFS: read-only file system, mkdtemp '/tmp/tellsh-reg-XXXXXX'"
  code: 'EROFS'
not ok 165 - --yes only runs safe commands straight from the catalog (not history-resolved ones)
  error: "EROFS: read-only file system, mkdtemp '/tmp/tellsh-reg-XXXXXX'"
  code: 'EROFS'
not ok 171 - major: a quoted argument mixing request words with a path or file name is unclear, not the path
  error: 'Unexpected end of JSON input'
not ok 179 - major: wrangler dev runs project build commands: medium risk, never auto-run with --yes
  error: |-
not ok 186 - major: every npx wrangler intent is at least medium risk, never auto-run with --yes
  error: |-
not ok 206 - history: any history-derived slot marks the result as history (never --yes)
  error: "EROFS: read-only file system, mkdtemp '/tmp/tellsh-r2-XXXXXX'"
  code: 'EROFS'
not ok 216 - --threshold must be a number in [0, 1]
  error: |-
not ok 252 - CLI: an unresolvable history reference says so (exit 3, no command)
  error: "EROFS: read-only file system, mkdtemp '/tmp/tellsh-r4-XXXXXX'"
  code: 'EROFS'
not ok 279 - the running tellsh call is dropped once, then the previous command is the target
  error: "EROFS: read-only file system, mkdtemp '/tmp/tellsh-r7-XXXXXX'"
  code: 'EROFS'
not ok 280 - blocker: a quoted path with a space keeps its boundaries (CLI argv and earlier tellsh lines)
  error: 'Unexpected end of JSON input'
not ok 290 - major: request text passed as several quoted arguments is never the path
  error: 'Unexpected end of JSON input'
not ok 297 - fetch_model installs only the bundle files named in the manifest
  error: "EROFS: read-only file system, mkdtemp '/tmp/tellsh-r8-XXXXXX'"
  code: 'EROFS'
not ok 310 - quoting round-trips through bash and sh
  error: 'spawnSync bash EPERM'
  code: 'EPERM'
not ok 321 - shQuote round-trips nasty strings through bash
  error: 'spawnSync bash EPERM'
  code: 'EPERM'
# tests 328
# pass 297
# fail 31
# duration_ms 13332.705451

exec
/bin/bash -lc "nl -ba src/history.js | sed -n '598,638p'; nl -ba src/fill.js | sed -n '127,139p'; git status --short" in /workspace/tellsh
 succeeded in 0ms:
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
   624	/**
   625	 * 'root' when a wrapper in the removed prefix of `raw` (before the unwrapped words `w`) runs the command under another
   626	 * root (every path names something else), 'cwd' when it runs it in another working directory (relative paths do).
   627	 */
   628	function wrapperScope(w, raw) {
   629	  let cur = null;
   630	  let scope = null;
   631	  for (const x of raw.slice(0, raw.length - w.length).map((v) => String(rawOf(v)))) {
   632	    const h = x.replace(/^.*[\\/]/, '').toLowerCase();
   633	    if (ROOT_WRAPPERS.has(h) || NS_WRAPPERS.has(h)) return 'root';
   634	    if (CWD_WRAPPERS.has(h)) { scope = 'cwd'; continue; }
   635	    if (!x.startsWith('-')) { if (WRAPPER_CWD[h] || WRAPPER_ROOT[h]) cur = h; continue; }
   636	    if (WRAPPER_ROOT[cur]?.test(x)) return 'root';
   637	    if (WRAPPER_CWD[cur]?.test(x)) scope = 'cwd';
   638	  }
   127	    const n = ex.pid ?? ex.numbers?.find((x) => x > 0) ?? ex.count;
   128	    if (n != null) v.num = n;
   129	    delete v.count;
   130	  }
   131	  if (has('pr')) {
   132	    // the pull request the user names: a URL or a branch is kept as it is (validation withholds an odd one), never
   133	    // dropped for a bare `gh pr merge`, which acts on the current branch's pull request
   134	    const sel = ex.urls[0] ?? String(ex.text).match(PR_SELECTOR)?.[1];
   135	    const n = ex.pid ?? ex.numbers?.find((x) => x > 0) ?? ex.count;
   136	    if (sel != null && !PR_NOT_SELECTOR.test(sel)) v.pr = String(sel).replace(/^#/, '');
   137	    else if (n != null) v.pr = n;
   138	    delete v.count;
   139	  }
?? review/r13-claude.md
?? review/r13-codex.md

codex
- **Major — [src/fill.js:134](/workspace/tellsh/src/fill.js:134): Quoted PR targets are silently dropped.** `merge pull request "feature/login"` produces `gh pr merge` with no missing slots, targeting the current branch’s PR instead. Reproduces for Bash, PowerShell, and cmd. Parse quoted selectors and retain a placeholder when an explicitly supplied selector is invalid.

- **Major — [src/history.js:633](/workspace/tellsh/src/history.js:633): Wrapper machine/host scope is lost.** With the single previous line `systemd-run --machine=web ps -p 42`, `kill it` produces local `kill 42`, potentially killing an unrelated host process. `run0 --machine=web` reproduces the same failure. Mark entities from machine/host-scoped wrappers ambiguous, as already done for `nsenter`.

Validation: both findings reproduced through runtime calls. Tests yielded 297 passes; 31 failures involved sandbox restrictions (`EROFS`/`EPERM`). Training scripts received static review; training was not run. No files changed.

VERDICT: REQUEST_CHANGES
tokens used
133,251
- **Major — [src/fill.js:134](/workspace/tellsh/src/fill.js:134): Quoted PR targets are silently dropped.** `merge pull request "feature/login"` produces `gh pr merge` with no missing slots, targeting the current branch’s PR instead. Reproduces for Bash, PowerShell, and cmd. Parse quoted selectors and retain a placeholder when an explicitly supplied selector is invalid.

- **Major — [src/history.js:633](/workspace/tellsh/src/history.js:633): Wrapper machine/host scope is lost.** With the single previous line `systemd-run --machine=web ps -p 42`, `kill it` produces local `kill 42`, potentially killing an unrelated host process. `run0 --machine=web` reproduces the same failure. Mark entities from machine/host-scoped wrappers ambiguous, as already done for `nsenter`.

Validation: both findings reproduced through runtime calls. Tests yielded 297 passes; 31 failures involved sandbox restrictions (`EROFS`/`EPERM`). Training scripts received static review; training was not run. No files changed.

VERDICT: REQUEST_CHANGES
