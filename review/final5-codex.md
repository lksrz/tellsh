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
session id: 01a12b1e-093a-75e2-a970-5ec467e9a0a5
--------
user
Final review of tellsh v0.3 (git diff 0d87457..HEAD). Accepted design: uncertain args -> placeholder; risk allowlist. Report only blocker/major bugs (unsafe command marked safe, wrong target silently). Read-only. End with exactly one line 'VERDICT: APPROVE' or 'VERDICT: REQUEST_CHANGES'.
codex
I’ll review the diff and relevant code paths for unsafe commands marked safe or silently incorrect targets, using the accepted placeholder and risk-allowlist design.
exec
/bin/bash -lc "pwd; rg --files -g 'AGENTS.md' -g '*test*' -g 'pyproject.toml' -g 'README*' -g 'package.json'; git status --short; git diff --stat 0d87457..HEAD" in /workspace/tellsh
 succeeded in 60ms:
/workspace/tellsh
test/regressions22.test.js
test/regressions28.test.js
test/regressions6.test.js
test/regressions21.test.js
test/regressions14.test.js
test/regressions3-render.test.js
test/regressions20.test.js
test/regressions19.test.js
test/regressions9.test.js
test/regressions26.test.js
test/regressions13.test.js
test/regressions18.test.js
test/regressions.test.js
test/regressions23.test.js
test/devtools.test.js
test/regressions5.test.js
test/parity.test.js
test/regressions16.test.js
test/shells.test.js
test/regressions27.test.js
test/regressions7.test.js
test/hybrid.test.js
test/regressions3-history.test.js
test/regressions17.test.js
test/pipeline.test.js
test/regressions25.test.js
test/danger.test.js
test/regressions2.test.js
test/regressions8.test.js
test/regressions24.test.js
test/regressions29.test.js
test/regressions15.test.js
test/allowlist.test.js
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
data/tldr/README.md
hybrid/package/tellsh-model-enc/README.md
hybrid/package/tellsh-model-enc/package.json
package.json
?? review/final5-claude.md
?? review/final5-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   740 +-
 HYBRID.md                                    |   617 +
 README.md                                    |   312 +-
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
 review/final-claude.md                       |    46 +
 review/final-codex.md                        |  6239 ++++++++++
 review/final2-claude.md                      |    35 +
 review/final2-codex.md                       | 16282 ++++++++++++++++++++++++
 review/final3-claude.md                      |    31 +
 review/final3-codex.md                       |  7788 ++++++++++++
 review/final4-claude.md                      |    49 +
 review/final4-codex.md                       | 16482 +++++++++++++++++++++++++
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
 src/fill.js                                  |   797 +-
 src/guards.js                                |   105 +
 src/history.js                               |  1028 +-
 src/model.js                                 |    22 +-
 src/pipeline.js                              |   685 +-
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
 test/regressions29.test.js                   |   182 +
 test/regressions3-history.test.js            |    87 +
 test/regressions3-render.test.js             |   151 +
 test/regressions3.test.js                    |    46 +
 test/regressions4.test.js                    |   204 +
 test/regressions5.test.js                    |   148 +
 test/regressions6.test.js                    |   174 +
 test/regressions7.test.js                    |   147 +
 test/regressions8.test.js                    |   204 +
 test/regressions9.test.js                    |   200 +
 test/shells.test.js                          |     8 +-
 263 files changed, 308036 insertions(+), 848 deletions(-)

exec
/bin/bash -lc 'for p in /AGENTS.md /workspace/AGENTS.md /workspace/tellsh/AGENTS.md; do if [ -f "$p" ]; then cat "$p"; fi; done; cat package.json; cat src/danger.js' in /workspace/tellsh
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
/bin/bash -lc 'cat src/fill.js' in /workspace/tellsh
 succeeded in 0ms:
// Turn (intent, slots) into a concrete, safely-quoted command for the target shell.
import { BY_ID } from './catalog.js';
import { extractSlots, pickArg, pickDest, pickDir, foldKeepLength, isStopWord } from './slots.js';
import { checkDanger, maxRisk, plainSlotValue } from './danger.js';
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
  gh_run_list: SEL_WORDS(`list listing recent recently latest last all show workflow workflows run runs action actions ci pipeline pipelines
    build builds job jobs history happened happen* recently fail* failed failing passed przeszl* padl* ostatni* wszystkie uruchomien* przebieg* runy runow workflowy workflowow akcj* histori*
    wylistuj* listuj* lista liste buildow`),
  gh_run_view: SEL_WORDS(`view details logs log output failed failing failure why workflow run runa runie action ci pipeline build job
    szczegol* logi`),
  gh_auth_status: SEL_WORDS(`auth authenticated authentication logged log login signed sign status who account whoami am which user
    zalogowan* konto konta koncie kim kto jestem uwierzytelnien* logowani* token valid wazn* expired wygasl* session sesj*
    authorized autoryzacj* loguje credentials dane still nadal`),
  gh_auth_login: SEL_WORDS(`not nie auth authenticate authentication log login sign signin zaloguj* zalogowac logowani* konto account
    uwierzytelnij* autoryzuj* kont* konc* connect podlacz* polacz* link authorize re-authenticate re-login again ponownie setup configure skonfiguruj* konfiguracj*`),
  wrangler_deploy: SEL_WORDS(`depl* redeploy publish* ship push release upload go wdroz* zdeployuj* deployuj* opublikuj* wypchnij*
    wrzuc* wgraj* make roll rollout wypusc* wydaj* pusc* code kod kodu version wersj* new nowa nowy najnowsz* latest fresh swiez*
    changed changes zmienilem zmian* after po`),
  wrangler_dev: SEL_WORDS(`dev develop development locally local server serve start preview mode lokaln* serwer* uruchom* odpal*
    tryb* developersk* deweloper* localhos* 127.0.0.1 machine maszyn* depl* pusc* przetest* spin launch fire boot try test przetestuj* emul* serwuj* hot reload* odpal*`),
  wrangler_tail: SEL_WORDS(`thrown right now teraz tail* logs log live stream* realtime real-time watch follow logi logow zywo strumien*
    podglad* sledz* obserwuj* rzeczywist* czasie biezaco monitor* errors bledy exceptions wyjatki console.log requests requesty
    happen* happening debug* output wdrozon* wyjscie zdebug* print* wypisuj* feed attach podepnij* podlacz* deployed zdeployowan* dzialajac* running`),
  wrangler_secret_put: SEL_WORDS(`new nowy nowa nowe push wypchnij* secret secrets set put add store save update change create rotate register encrypted configure sekret*
    ustaw* dodaj* zapisz* zmien* zaktualizuj* zaszyfrowan* zarejestruj* zrotuj* utworz* jako value variable called named nazwie`),
  wrangler_login: SEL_WORDS(`not nie kont* konc* podlacz* login log sign signin re-login authenticate re-authenticate authentication auth authorize account konto kontem
    zaloguj* zalogowac logowani* autoryz* uwierzytelni* polacz* connect browser przegladarce first najpierw ponownie again`),
  wrangler_whoami: SEL_WORDS(`whoami who account logged log signed status which user am konto konta koncie zalogowan* kim kto jestem
    identity tozsamosc* id identyfikator* email mail maila whose czyje* active aktywn* uses using uzywa* uzywam`),
};
// words that pick one pull request / run / target out of several ("the latest pr", "the draft pr", "the failing run"):
// explained only for the intents that list them (gh_pr_list "open prs", gh_run_list "recent runs"), never by the family
const SEL_PICKERS = new Set(('latest last recent recently newest new old older oldest first second third next previous prior other another ' +
  'approved pending draft failing failed fail passing passed pass green red open opened closed merged ready big small ' +
  'ostatni ostatnie ostatniego najnowszy najnowsze nowy nowa nowe stary inny inne poprzedni kolejny otwarte otwartych').split(' '));
const selFamilyAll = {};
for (const [id, v] of Object.entries(SEL_INTENT)) {
  const f = id.split('_')[0];
  const all = (selFamilyAll[f] ??= { words: new Set(), stems: [] });
  // a negation ("not logged in" for a login) is explained only for the intent that lists it, never family-wide
  for (const w of v.words) if (!SEL_PICKERS.has(w) && !/^(?:not|nie|never|without|bez)$/.test(w)) all.words.add(w);
  all.stems.push(...v.stems.filter((x) => !SEL_PICKERS.has(x)));
}
// the slot that takes the placeholder when a request has words the vocabulary does not explain
const SEL_SLOT = { gh_pr_merge: 'pr', gh_pr_view: 'pr', gh_pr_checks: 'pr', gh_run_view: 'num' };
export const hasSelectorRule = (intentId) => /^(?:gh|wrangler)_/.test(intentId);
// "for issue #3", "for ticket 12", "the pr that fixes #12": a number of another kind, explained as not the pull request
const SEL_OTHER_NUMBER = /\b(?:issues?|tickets?|bugs?|zgloszeni\w*|fix(?:es)?|closes|resolves|naprawia\w*|zamyka\w*)\s+#?\d+\b/g;
const SEL_ENV_PREP = /^(?:to|on|in|into|for|na|do|w|dla|env|environment|srodowisk\w*|called|named|nazwie)$/;
const SEL_NEGATION = /^(?:not|never|don't|dont|nor|except|excluding|without|instead|rather|nie|bez|oprocz|poza|zamiast)$/;
const SEL_DET = /^(?:the|a|an|my|our|this|that)$/;
/**
 * The words of a gh / wrangler request the vocabulary and the read values do not explain, each with the word before it
 * ([] : nothing unexplained).
 */
export function selectorResidue(intentId, text, values = {}) {
  if (!hasSelectorRule(intentId)) return [];
  const fam = SEL_FAMILY[intentId.split('_')[0]];
  const own = SEL_INTENT[intentId];
  let t = foldKeepLength(String(text)).toLowerCase();
  // values that were read, and the option / phrase forms they come in, are explained
  for (const k of ['pr', 'repo', 'wenv', 'var', 'num', 'url']) {
    const val = values[k];
    if (val == null || String(val).startsWith('?')) continue;
    const s = foldKeepLength(String(val)).toLowerCase();
    // the value as a whole word: `prod` does not explain `prodprod`, `4` does not explain `44`
    t = t.replace(new RegExp(`(?<![\\w-])${s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`, 'g'), ' ');
  }
  if (/^wrangler_/.test(intentId)) t = t.replace(WR_DRY_NOT, ' ').replace(WR_DRY, ' ');
  if (values.delbranch) t = t.replace(PR_DELETE_BRANCH, ' ');
  t = t.replace(/(?:^|\s)(?:--env|-e|--repo|-r|env=|--repo=|--env=)(?=\s|$)/g, ' ')
    .replace(/(?:^|\s)(?:https?:\/\/|github\.com\/)(?=\s|$)/g, ' ')
    .replace(/\b(?:number|numer|nr|no\.|num)(?=\s|$)/g, ' ')
    .replace(/\benv(?:ironment)?\s+var(?:iable)?s?\b|\bzmienn\w*(?:\s+srodowiskow\w*)?|\bsrodowiskow\w*/g, ' ')
    .replace(/\b(?:the\s+)?command\s+line\b|\bz\s+linii\s+komend\b/g, ' ');
  if (/^gh_pr_/.test(intentId) && values.pr != null && !String(values.pr).startsWith('?')) t = t.replace(SEL_OTHER_NUMBER, ' ');
  const out = [];
  let prev = '';
  for (let w of t.split(/[\s,;!?()]+|:(?!\/\/)/)) {
    w = w.replace(/^[#"'`„“”.]+|["'`„“”.]+$/g, '').replace(/'s$/, '');
    if (!w || /^[-–—]+$/.test(w)) continue;
    // "merge pr with --squash": an option word the intent knows (gh asks for the merge method itself)
    const famAll = selFamilyAll[intentId.split('_')[0]];
    if (selHas(SEL_COMMON, w) || selHas(fam, w) || (!SEL_PICKERS.has(w) && famAll && selHas(famAll, w)) || (own && selHas(own, w.replace(/^--(?=[a-z])/, '')))) {
      if (!SEL_DET.test(w)) prev = w;
      continue;
    }
    out.push({ w, prev });
    prev = w;
  }
  return out;
}
const SEL_EXPLICIT = { pr: (v) => /^\d+$|^https?:\/\//.test(v), num: (v) => /^\d+$/.test(v), wenv: (v) => RAW_OK.wenv(v) };
const selEnvish = (r) => /[a-z]/.test(r.w) && (SEL_ENV_PREP.test(r.prev) || WR_ENV_KNOWN.test(r.w) || WR_ENV_STEM.test(r.w) || /^(?:prod|produkc|staging|stage)/.test(r.w));
/**
 * gh / wrangler selector rule: the slot to withhold (`?`, a placeholder the user fills) for the words of a request
 * nothing explains, or null. An explicit value that was read (pull request 45, a URL, `--env staging`) stays unless an
 * unexplained word competes with it (another number, another environment); otherwise the intent's selector is withheld:
 * the pull request (`<PR>`), the run (`<NUM>`), the environment (`<WENV>`, for a word placed as one) or the rest of the
 * request (`<ARGS>`).
 */
export function selectorWithhold(intentId, text, values = {}) {
  // a selector already withheld ("merge pr bob's", "my environment is set") already has its placeholder
  if (['pr', 'num', 'wenv', 'repo'].some((k) => String(values[k] ?? '').startsWith('?'))) return null;
  const res = selectorResidue(intentId, text, values);
  if (!res.length) return null;
  // "merge pr 42 in acme/app or other/repo": another repository beside the one read is a competing target, whatever else
  // the request names (an explicit pull request included)
  if (values.repo != null && res.some((r) => RAW_OK.repo(repoValue(r.w)))) return 'repo';
  const main = SEL_SLOT[intentId];
  if (main && main !== 'wenv') {
    const v = values[main];
    if (v != null && SEL_EXPLICIT[main](String(v)) && !res.some((r) => /^\d+$|^https?:/.test(r.w))) return null;
    return main;
  }
  if (/^wrangler_/.test(intentId)) {
    // "deploy worker but not to production", "don't deploy to prod": an environment the request excludes is never the
    // target (also when one was read)
    const negated = res.some((r) => SEL_NEGATION.test(r.w));
    if (negated && (values.wenv != null || res.some(selEnvish) || WR_ENV_ANY.test(text))) return 'wenv';
    // an explicit environment stays; the words nothing explains (`--config other.toml`) are withheld beside it, never dropped
    return res.some(selEnvish) ? 'wenv' : 'args';
  }
  return 'args';
}
// npm install: words that name the project's dependencies (or the tool), never a package to add
const NPM_NOT_PKG = new Set(('dependencies dependency dependecies dependancies deps dep zaleznosci zaleznosc project projekt projektu ' +
  'packages package pakiety paczki modules module moduly node_modules node npm ci clean czysta czysty everything all wszystko ' +
  'package.json lockfile lock repo repository it this them')
  .split(' '));
const NPM_INSTALL_VERB = /^(?:install|instal|add|i|zainstaluj|instaluj|doinstaluj|dodaj|pobierz|get|reinstall)$/;
// "npm ci", "a clean install", "czysta instalacja": npm ci (installs exactly the lockfile)
const NPM_CI = /(?:^|\s)npm\s+ci(?=\s|$)|\bclean[\s-]+install\w*|\bczyst\w*\s+instalacj\w*/i;
/**
 * npm install: "install the project dependencies" is `npm install` (no package); a package word the request does not
 * pick out clearly ("add express to the project with npm" read as `npm`) is the word right after the install verb, or
 * withheld (`npm install <PKG>`), never made up from "dependencies", "project" or "npm".
 */
function npmInstallTarget(text, v) {
  const f = foldKeepLength(text).toLowerCase();
  if (NPM_CI.test(f) && (v.pkg == null || NPM_NOT_PKG.has(String(v.pkg).toLowerCase()))) { delete v.pkg; v.npmverb = 'ci'; return; }
  const p0 = foldKeepLength(String(v.pkg ?? '')).toLowerCase();
  if (v.pkg == null || !(NPM_NOT_PKG.has(p0) || isStopWord(p0))) return;
  const words = f.split(/[\s,;!?()]+/).map((w) => w.replace(/^["'`]+|["'`.:]+$/g, '')).filter(Boolean);
  const named = words.filter((w) => !NPM_NOT_PKG.has(w) && !NPM_INSTALL_VERB.test(w) && !isStopWord(w) &&
    !/^(?:the|a|an|my|our|for|from|with|via|using|to|into|in|of|this|these|please|pls|i|just|cloned|z|ze|do|dla|przez|w|mojego|tego|tym|ten|naszego)$/.test(w));
  delete v.pkg;
  if (!named.length) return;
  const at = words.findIndex((w) => w === named[0]);
  const prev = words.slice(0, at).filter((w) => !/^(?:the|a|an|package|pakiet|paczke)$/.test(w)).pop();
  v.pkg = named.length === 1 && NPM_INSTALL_VERB.test(prev || '') ? text.split(/\s+/).find((w) => foldKeepLength(w).toLowerCase().replace(/[.,!?;:]+$/, '') === named[0])?.replace(/[.,!?;:]+$/, '') ?? '?' : '?';
}

/**
 * The pull request the user names (quoted: kept as written, validation withholds an odd one), else null (`gh pr merge`
 * acts on the current branch's pull request). A number elsewhere in the request ("merge pr with 2 approvals", "merge the
 * 2 open prs") is never the pull request; a request that names something the parser cannot read (`bob's`, `in repo v2`)
 * is withheld (`?`, shown as `<PR>`), never a bare `gh pr merge`.
 */
function prSelector(ex) {
  const text = String(ex.text);
  if (ex.urls[0] != null) {
    // "merge pr <url>", "merge <url>", "view the pull request at <url>": the URL is the pull request; "the pr that depends
    // on <url>" names a related one (withheld, never the URL's)
    const at = text.indexOf(ex.urls[0]);
    return at < 0 || PR_URL_LEAD.test(text.slice(0, at)) ? ex.urls[0] : '?';
  }
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
  if (PR_DESCRIBED.test(after) || prPickedAfter(after)) return '?';
  const numbers = !/\d/.test(text) && (ex.numbers?.length ?? 0) <= [...text.matchAll(PR_DEM_NUMBER)].length ? [] : ex.numbers || [];
  if (numbers.length || /\d/.test(text) || /[/_#'"`„“”’]|\w[.-]\w/.test(after) || PR_BRANCH_NAMED.test(after) || PR_QUALIFIED.test(after)) return '?';
  return null;
}
// "--repo a/b", "-R a/b", "in (the) repo(sitory) a/b", "in the a/b repo"; "in the other repo", "in another repository": named,
// not readable ("this repo", "the current repository" are the working directory's)
const PR_REPO_OPT = /(?:^|\s)(?:--repo(?:=|\s+|$)|-R(?:=|\s*))(\S*)/;
const PR_REPO = /\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(?:github\s+)?(?:repo|repository|repozytorium|project)\s+(\S+)|\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(\S+(?:\s+\S+)?)\s+(?:github\s+)?(?:repo|repository)\b|\b(?:w|z)\s+(?:repozytorium|projek\w*)\s+(\S+)/i;
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
// every repository a request names in a readable form: options (`--repo a/b`, `-R a/b`), `a/b#7`, a pull request URL,
// "in repo a/b"
const PR_URL_REPO = /(?:https?:\/\/)?github\.com\/([\w.-]+\/[\w.-]+)\/pull\/\d+/gi;
const repoKey = (w) => w.toLowerCase().replace(/^github\.com\//, '');
function repoMentions(text) {
  const out = new Set();
  for (const re of [PR_REPO_OPT, PR_REPO_HASH, PR_URL_REPO, PR_REPO]) {
    for (const m of text.matchAll(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'))) {
      const w = repoValue(m[1] ?? m[2] ?? m[3] ?? '');
      if (RAW_OK.repo(w)) out.add(repoKey(w));
    }
  }
  return out;
}
function prRepo(text) {
  const cut = (i, len, put = ' ') => (text.slice(0, i) + put + text.slice(i + len)).replace(/\s+/g, ' ').trim();
  const h = text.match(PR_REPO_HASH);
  if (h && RAW_OK.repo(repoValue(h[1]))) {
    const at = h.index + h[0].indexOf(h[1]);
    return { repo: repoValue(h[1]), rest: cut(at, h[1].length + 1 + h[2].length, ` #${h[2]} `), pr: h[2] };
  }
  const m = text.match(PR_REPO_OPT) || text.match(PR_REPO);
  if (!m) {
    for (const p of text.matchAll(PR_REPO_PREP)) {
      const w = repoValue(p[2]);
      if (!RAW_OK.repo(w)) continue;
      const host = w.split('/').length === 3;
      // "merge pr from feature/x", "view the pr for fix/a": the branch the pull request is for
      if (!host && /^(?:of|on|from|for)$/i.test(p[1]) && PR_SELECTOR_SPOT.test(text.slice(0, p.index + p[0].indexOf(p[1])))) continue;
      return { repo: w, rest: cut(p.index, p[0].length) };
    }
    return null;
  }
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

// ssh tunnel (v0.3 close5): "forward local port 8080 to remote port 5432 on db.example.com", "-L 8080:db.internal:5432 via
// bastion", "forward 8080 to db.internal:5432 through bastion": both ends are kept, never `-L 8080:localhost:8080`. A remote
// port the request names but that cannot be told apart from the local one (two bare numbers) is withheld (`<RPORT>`).
const TUNNEL_WORD = /^(?:ssh|tunnel|tunel\w*|tunnels|port\w*|forward\w*|przekier\w*|local|remote|lokaln\w*|zdaln\w*|server|serwer\w*|host|localhost)$/i;
const PORT_N = String.raw`(\d{1,5})(?![\w.:])`;
function tunnelEnds(text, v) {
  const t = foldKeepLength(text).toLowerCase();
  const L = t.match(/(?:^|\s)-l\s*(\d{1,5}):([\w.-]+|\[[0-9a-f:.]+\]):(\d{1,5})(?=\s|$)/);
  if (L) {
    const at = t.indexOf(L[0]) + L[0].indexOf(L[2]);
    v.port = +L[1]; v.rhost = text.slice(at, at + L[2].length); v.rport = +L[3];
    // the ssh server is a host outside the -L spec ("-L 8080:db.internal:5432 bastion"), never the far host
    const rest = (text.slice(0, t.indexOf(L[0])) + ' ' + text.slice(t.indexOf(L[0]) + L[0].length)).split(/\s+/).map((w) => w.replace(/[,;!?]+$/, ''));
    const server = rest.filter((w) => /^(?!-)[\w.@-]+$/.test(w) && /[.@]/.test(w)).pop() ?? rest.filter((w) => /^[a-z][\w-]*$/i.test(w) && !TUNNEL_WORD.test(w) && !isStopWord(w.toLowerCase())).pop();
    if (server) v.target = server; else delete v.target;
    return;
  }
  const local = t.match(new RegExp(String.raw`(?:local|lokaln\w*)\s+(?:port\w*\s+)?` + PORT_N));
  const remote = t.match(new RegExp(String.raw`(?:remote|zdaln\w*|destination|docelow\w*|target)\s+(?:port\w*\s+)?` + PORT_N));
  // a far host other than the ssh server: HOST:PORT next to another host the connection goes through
  const hp = [...text.matchAll(/(?:^|\s)((?!-)[A-Za-z0-9][\w.-]*):(\d{1,5})(?=[\s,.;!?]|$)/g)];
  const via = /(?:^|\s)(?:via|through|thru|over|using|przez|poprzez|on|na|from|z|ze)\s+(?:the\s+)?(?:(?:server|host|bastion|jump\s*host|serwer\w*)\s+)?([\w.@-]+)/i;
  if (local) v.port = +local[1];
  if (remote) v.rport = +remote[1];
  if (hp.length === 1) {
    const [, h, p] = hp[0];
    const other = [...text.matchAll(new RegExp(via.source, 'gi'))].map((m) => m[1].replace(/[.,;!?]+$/, '')).find((x) => x !== h && /[.@]|^[a-z][\w-]*$/i.test(x) && x !== 'ssh');
    if (other && v.target !== other && v.target != null && String(v.target).startsWith(h)) v.target = other;
    if (other) { v.rhost = h; v.target = other; } else if (v.target == null || String(v.target).startsWith(h + ':') || v.target === h) v.target = h;
    v.rport = +p;
    if (!local && v.port === +p) {
      // the only number is the remote one: the local port is not named
      const nums = [...t.matchAll(/(?<![\w.:])(\d{1,5})(?![\w.:])/g)].map((m) => +m[1]);
      if (nums.length) v.port = nums[0]; else delete v.port;
    }
  } else if (hp.length > 1) v.rport = '?';
  if (v.target != null && /:/.test(String(v.target)) && !/@/.test(String(v.target))) v.target = String(v.target).replace(/:\d+$/, '');
  // "ssh tunnel … on web1": a word of the request ("tunnel") is never the server
  if (v.target != null && TUNNEL_WORD.test(String(v.target))) {
    const m = [...text.matchAll(new RegExp(via.source, 'gi'))].map((x) => x[1].replace(/[.,;!?]+$/, '')).find((x) => !TUNNEL_WORD.test(x) && !/^\d+$/.test(x));
    if (m) v.target = m; else delete v.target;
  }
  if (remote == null && hp.length === 0) {
    // "forward 8080 to 5432 on db": two different bare port numbers; which is which is not said with local / remote
    const nums = [...t.matchAll(/(?<![\w.:])(\d{1,5})(?![\w.:])/g)].map((m) => +m[1]).filter((n) => n > 0 && n < 65536);
    if (new Set(nums).size > 1) {
      const ab = t.match(new RegExp(String.raw`(?<![\w.:])(\d{1,5})\s+(?:to|into|na|do|->)\s+(?:(?:the\s+)?port\w*\s+)?` + PORT_N));
      if (local) v.rport = nums.find((n) => n !== +local[1]);
      else if (ab) { v.port = +ab[1]; v.rport = +ab[2]; } else v.rport = '?';
    }
  }
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
    // "--repo a/b or --repo c/d", a pull request URL of a/b with `--repo c/d`: competing repositories are withheld
    if (rq && rq.repo !== '?' && [...repoMentions(String(ex.text))].some((r) => r !== repoKey(rq.repo))) v.repo = '?';
    // the pull request the user names: a URL or a branch is kept as it is (validation withholds an odd one), never
    // dropped for a bare `gh pr merge`, which acts on the current branch's pull request
    // a literal gh command ("gh pr view 42"): its subcommand word is not a selector
    const lit = (t) => String(t).replace(/^(\s*(?:\S+\s+)?)gh\s+pr\s+(?:view|merge|checks)(?=\s|$)/i, '$1pr');
    const sel = prSelector(rq ? { ...ex, text: lit(rq.rest), numbers: (rq.rest.match(/\d+/g) || []).map(Number), quoted: ex.quoted.filter((q) => rq.rest.includes(q)) } : { ...ex, text: lit(ex.text) });
    if (rq?.pr != null) v.pr = rq.pr;
    else if (sel != null) v.pr = String(sel).replace(/^#(?=\d)/, '');
    else if (rq) v.pr = '?';
    delete v.count;
  }
  // "create a pull request in repo acme/app", "list prs of other/repo": the repository is kept (`--repo`) or withheld
  if (has('repo') && !has('pr')) {
    const rq = prRepo(String(ex.text));
    if (rq) v.repo = rq.repo;
    if (rq && rq.repo !== '?' && [...repoMentions(String(ex.text))].some((r) => r !== repoKey(rq.repo))) v.repo = '?';
  }
  // "merge pr 45 and delete the branch": gh pr merge --delete-branch
  // "… and don't delete the branch", "nie usuwaj brancha", "keep the branch, do not remove it": a negated delete is no flag
  if (intent.id === 'gh_pr_merge') {
    const f = foldKeepLength(String(ex.text)).toLowerCase();
    if ([...f.matchAll(PR_DELETE_BRANCH)].some((m) => !PR_DELETE_NEGATED.test(f.slice(0, m.index + m[0].search(/delete|remove|usun/))))) v.delbranch = '--delete-branch';
  }
  if (has('wenv')) {
    const t = String(ex.text);
    if (wranglerDry(t)) v.dryrun = '--dry-run';
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
  if (intent.id === 'npm_install') npmInstallTarget(String(ex.text), v);
  // gh / wrangler: a word the request has that neither the vocabulary nor a read value explains withholds the selector
  if (hasSelectorRule(intent.id)) {
    const k = selectorWithhold(intent.id, String(ex.text), v);
    if (k && has(k)) v[k] = '?';
  }
  if (intent.id === 'ssh_port_forward') tunnelEnds(String(ex.text), v);
  scopeSlots(intent.id, String(ex.text), v, has);
  for (const k of contestedSlots(intent.id, String(ex.text), v)) if (has(k)) v[k] = '?';
  for (const k of Object.keys(v)) if (v[k] === undefined) delete v[k];
  return v;
}

// ---------------------------------------------------------------------------------------------
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
// pr 42 but not in repo acme/app", "deploy to prod, not staging", "zainstaluj axios albo lodash"), or names two candidate
// values for ("--env prod --env prodprod"), is withheld as a placeholder the user fills, never one of the candidates.
const CONTESTED = (id) => (hasSelectorRule(id) ? ['pr', 'num', 'wenv', 'repo', 'var'] : /^(?:npm_install|npm_install_global|pip_install)$/.test(id) ? ['pkg'] : id === 'npm_run_script' ? ['script'] : []);
// an alternative looks both ways ("4 or 44"); a negation at what follows it ("not in repo a/b", "nie na staging")
const SEL_ALT = /^(?:or|either|vs|versus|instead|rather|albo|lub|zamiast|ewentualnie|badz)$/;
const SEL_NEG = /^(?:not|never|nor|don't|dont|except|excluding|exclude|without|nie|oprocz|poza|bez|wykluczajac)$|n't$/;
// a negation that describes a state ("what went wrong" = "co poszło nie tak", "not working", "nie przeszedł"), not a selector
const SEL_NEG_STATE = /^(?:tak|dziala\w*|przeszl\w*|przeszedl|przechodz\w*|poszlo|wyszlo|work\w*|pass\w*|ok|okay|right|sure|good|green|zielon\w*)$/;
// a word that ends a clause (the alternative / negation does not reach past it)
const SEL_CLAUSE_END = /^(?:and|then|i|oraz|potem|so)$/;
// a number of something else ("issue 12", "2 approvals", "in 5 minutes"), not a candidate pull request / run
const SEL_NUM_OTHER_BEFORE = /^(?:issues?|tickets?|bugs?|zgloszeni\w*|fix(?:es)?|closes|resolves|line|lines|linii|top|last|first)$/;
const SEL_NUM_UNIT_AFTER = /^(?:secs?|seconds?|mins?|minutes?|minut\w*|hours?|hrs?|godzin\w*|days?|dni|dzien|weeks?|tygodn\w*|months?|miesi\w*|years?|lat\w*|times?|razy|ago|temu|old|more|approvals?|reviews?|reviewers?|commits?|files?|lines?|changes?|comments?|checks?)$/;
const SEL_ENV_ALIAS = (w) => (/^(?:prod|production|produkc\w*)$/.test(w) ? 'prod' : /^(?:staging|stage|stagingu|stagingowe\w*)$/.test(w) ? 'staging' : w);
const tokenClean = (w) => w.replace(/^[("'`„“”]+|[)"'`“”.,!?;:]+$/g, '');
/** The selector slots of a request that are contested (an alternative, a negation, two candidates): withheld (`?`). */
export function contestedSlots(intentId, text, values = {}) {
  // a slot already withheld (`?`) still takes the alternative / negation next to its candidates
  const slots = CONTESTED(intentId).filter((k) => values[k] != null);
  if (!slots.some((k) => !String(values[k]).startsWith('?'))) return [];
  const raw = foldKeepLength(String(text)).toLowerCase().split(/\s+/).filter(Boolean);
  const words = raw.map(tokenClean);
  const ends = raw.map((w, i) => /[.,;!?:]$/.test(w) || SEL_CLAUSE_END.test(words[i]));
  // the candidate values of a slot, by token index
  const candidates = (k) => {
    const out = new Map();
    const v = foldKeepLength(String(values[k])).toLowerCase();
    words.forEach((w, i) => {
      const bare = w.replace(/^#(?=\d)/, '');
      if (bare === v || (k === 'repo' && RAW_OK.repo(repoValue(w)) && repoKey(repoValue(w)) === repoKey(v))) out.set(i, k === 'repo' ? repoKey(v) : v);
      if ((k === 'pr' || k === 'num') && /^\d{1,12}$/.test(bare) && !SEL_NUM_OTHER_BEFORE.test(words[i - 1] ?? '') && !SEL_NUM_UNIT_AFTER.test(words[i + 1] ?? '')) out.set(i, bare);
      if (k === 'pr') { const u = w.match(/\/pull\/(\d{1,12})\/?$/); if (u) out.set(i, /^\d+$/.test(v) ? u[1] : w); }
      if (k === 'repo' && /\//.test(w) && RAW_OK.repo(repoValue(w)) && (/^(?:--repo|-r|repo|repository|repozytorium|in|of|on|from|at|to|w|z)$/.test(words[i - 1] ?? '') || /^--repo=/.test(w))) out.set(i, repoKey(repoValue(w.replace(/^--repo=/, ''))));
      if (k === 'wenv') {
        const opt = w.match(/^(?:--env|env)=(.+)$/);
        if (opt) out.set(i, SEL_ENV_ALIAS(opt[1]));
        else if (/^(?:--env|-e)$/.test(words[i - 1] ?? '') && RAW_OK.wenv(w)) out.set(i, SEL_ENV_ALIAS(w));
        else if (WR_ENV_STRONG.test(w) || /^produkc/.test(w)) out.set(i, SEL_ENV_ALIAS(w));
        if (out.get(i) === SEL_ENV_ALIAS(v) || w === v) out.set(i, SEL_ENV_ALIAS(v));
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

exec
/bin/bash -lc 'git diff 0d87457..HEAD -- src/pipeline.js' in /workspace/tellsh
exec
/bin/bash -lc 'cat test/regressions29.test.js; cat src/render.js; cat src/guards.js' in /workspace/tellsh
 succeeded in 0ms:
// Regression tests for the v0.3 final4 review (review/final4-claude.md, review/final4-codex.md):
//  (1) a negation or exclusion ("except", "but not", "oprócz", "bez", "not 1234", "don't delete") is never ignored: the
//      command expresses it, a placeholder stands for it, or the request is refused (src/guards.js)
//  (2) removing a package (uninstall / remove / odinstaluj) never becomes the install command
//  (3) an operand is never the tool or noun word ("stop docker container web" -> `docker stop web`)
//  (4) move / copy: source and destination are read on each side of "to" / "do" / "na"; an unclear side is a placeholder
//  (5) history "same for <spaced path>" keeps the whole path
//  (6) a quoted --workspace value is one value; pip --target is kept; ssh -L keeps the remote host and port
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'fish', os: 'linux', coreutils: 'gnu' },
  { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, { shell: 'cmd', os: 'win32', coreutils: 'gnu' }];
const run = (q, env = BASH, history) => suggest(q, { env, history });
const refused = (r, q) => {
  assert.equal(r.command ?? null, null, `${q}: ${r.command}`);
  assert.equal(r.understood, false, q);
};

// ---------- (1) negation / exclusion ----------
test('final4-claude major 2: an excluded process is never killed (or killed alone)', () => {
  for (const env of SHELLS) {
    for (const q of ['kill python except pid 1234', 'kill all python processes except pid 1234', 'kill all python processes except 1234',
      'kill every python process but not 1234', 'zabij wszystkie procesy python oprócz 1234', 'kill python not 1234',
      'kill all node processes except 4242', "kill python, but don't kill 1234", 'kill 1234 and not 5678']) {
      refused(run(q, env), `${env.shell}: ${q}`);
    }
  }
  // the excluded value is left alone and nothing else is acted on: kept
  assert.equal(run('kill process 1234 not 5678').command, 'kill 1234');
  assert.equal(run('delete a.txt not b.txt').command, 'rm a.txt');
});

test('an exclusion a changing command cannot express is refused; a prohibition of the request too', () => {
  for (const q of ['delete all log files except today', 'rm everything but notes.txt', 'delete all files except notes.txt',
    'delete all files other than notes.txt', 'usuń pliki *.log z wyjątkiem app.log', 'remove all .log files without app.log',
    'delete branches except main', 'stop all services except ssh', 'stop all containers except db', 'remove all docker images except nginx',
    'delete everything in /tmp/x except a.txt', 'compress /srv/app excluding node_modules', 'delete log files older than 7 days but not in /var/log/keep',
    "don't delete a.txt", 'do not kill 1234', 'never remove /tmp/x', 'nie usuwaj a.txt', 'nie restartuj nginx', "stop nginx, don't restart it"]) {
    refused(run(q), q);
  }
  // a read-only command that would show what the request excludes
  refused(run('list files except .txt'), 'list files except .txt');
  // a negation that describes a manner, a state or a part of the request the command leaves out is not an exclusion
  const kept = {
    'delete /tmp/x without asking': 'rm /tmp/x',
    'usuń /tmp/x bez pytania': 'rm /tmp/x',
    'find files not modified in 30 days': 'find . -type f -mtime +30',
    'czy ktoś poza mną jest teraz zalogowany': 'who',
    'what did i change but not stage yet': 'git diff',
    "merge pr 42 and don't delete the branch": 'gh pr merge 42',
    'install nginx without recommends': 'sudo apt install nginx',
  };
  for (const [q, cmd] of Object.entries(kept)) assert.equal(run(q).command, cmd, q);
  // a placeholder already stands for the excluded part (close3 selectors): kept
  assert.equal(run('merge pr 42 but not in repo acme/app').command, 'gh pr merge 42 --repo <REPO>');
  assert.equal(run("don't deploy worker to prod").command, 'npx wrangler deploy --env <WENV>');
});

test('a negation word is never the operand ("kill the process that is not responding" is not `pkill -f not`)', () => {
  const r = run('kill the process that is not responding');
  assert.ok(!/(?:^|\s)'?not'?(?:\s|$)/.test(String(r.command)), r.command);
});

// ---------- (2) uninstall is never install ----------
test('final4-claude major 3: removing a package is never the install command (contrastive)', () => {
  for (const env of SHELLS) {
    for (const q of ['uninstall nginx', 'uninstall package nginx', 'remove package nginx', 'odinstaluj nginx', 'usuń pakiet nginx',
      'apt remove nginx', 'brew uninstall wget', 'pip uninstall requests', 'uninstall requests with pip', 'npm uninstall lodash', 'npm rm lodash']) {
      const r = run(q, env);
      assert.ok(!/(?:^|\s)(?:install|i|add)(?:\s|$)/.test(String(r.command)) || /uninstall|remove|purge/.test(String(r.command)), `${env.shell}: ${q}: ${r.command}`);
    }
  }
  // the same requests without the removal word still install
  const install = {
    'install nginx': 'sudo apt install nginx',
    'install package nginx': 'sudo apt install nginx',
    'zainstaluj nginx': 'sudo apt install nginx',
    'pip install requests': 'python3 -m pip install requests',
    'install requests with pip': 'python3 -m pip install requests',
    'npm install': 'npm install',
  };
  for (const [q, cmd] of Object.entries(install)) assert.equal(run(q).command, cmd, q);
  // an injected `;rm` inside a package name is not a removal request (it is withheld as before)
  assert.equal(run('install requests==2.32.0;rm with pip').command, 'python3 -m pip install <PKG>');
});

// ---------- (3) the noun is never the operand ----------
test('final4-claude major 3: "stop docker container web" is `docker stop web`', () => {
  const cases = {
    'stop docker container web': 'docker stop web',
    'docker stop container web': 'docker stop web',
    'stop docker web': 'docker stop web',
    'zatrzymaj kontener docker web': 'docker stop web',
    'show logs of docker container web': 'docker logs --tail 100 -f web',
    'docker logs nginx': 'docker logs --tail 100 -f nginx',
    'docker exec -it api-server sh': 'docker exec -it api-server sh',
    'stop container web': 'docker stop web',
    // no name at all: placeholder, never `docker stop docker`
    'stop the docker container': 'docker stop <CONTAINER>',
    'docker stop': 'docker stop <CONTAINER>',
    'put eslint in the global npm packages': 'npm install -g eslint',
    'instal pytest via pip': 'python3 -m pip install pytest',
  };
  for (const [q, cmd] of Object.entries(cases)) assert.equal(run(q).command, cmd, q);
});

// ---------- (4) move / copy ----------
test('final4-claude major 1: move / copy / rename keep the stated destination; an unclear source is a placeholder', () => {
  const cases = {
    'rename /tmp/my file.txt to /tmp/new.txt': 'mv -i <SRC> /tmp/new.txt',
    'move /tmp/my file.txt to /tmp/dir': 'mv -i <SRC> /tmp/dir',
    'copy /tmp/my file.txt to /tmp/dir': 'cp -ri <SRC> /tmp/dir',
    'przenieś /tmp/my file.txt do /tmp/dir': 'mv -i <SRC> /tmp/dir',
    'move report.txt notes.txt to /tmp/dir': 'mv -i <SRC> /tmp/dir',
    'rename my notes.txt to notes.txt': 'mv -i <SRC> notes.txt',
    // clear sides
    "move '/tmp/my file.txt' to /tmp/dir": "mv -i '/tmp/my file.txt' /tmp/dir",
    "copy '/tmp/my file.txt' to '/tmp/new dir'": "cp -ri '/tmp/my file.txt' '/tmp/new dir'",
    'move /tmp/old notes to /tmp/archive': "mv -i '/tmp/old notes' /tmp/archive",
    'copy a.txt to ~/My Docs': "cp -ri a.txt ~/'My Docs'",
    'rename the folder build to build_old': 'mv -i build build_old',
    'change the name of index.htm to index.html': 'mv -i index.htm index.html',
    'zmień nazwę a.txt na b.txt': 'mv -i a.txt b.txt',
    'skopiuj plik env.example do .env.local': 'cp -ri env.example .env.local',
    'mv draft.md into the archive folder': 'mv -i draft.md archive',
    'move it to /tmp/old': 'mv -i <SRC> /tmp/old',
  };
  for (const [q, cmd] of Object.entries(cases)) assert.equal(run(q).command, cmd, q);
  const r = run('rename /tmp/my file.txt to /tmp/new.txt');
  assert.deepEqual(r.missing, ['src']);
  assert.ok(r.warnings.some((w) => /unclear which words name the source/.test(w)), r.warnings.join('; '));
});

// ---------- (5) history ----------
test('final4-codex major: "same for <spaced path>" keeps the whole path', () => {
  const h = ['rm -r /tmp/old'];
  assert.equal(run('same for ~/Old Projects', BASH, h).command, "rm -r ~/'Old Projects'");
  assert.equal(run("same for ~/'Old Projects'", BASH, h).command, "rm -r ~/'Old Projects'");
  assert.equal(run('same for ~/Old Projects please', BASH, h).command, "rm -r ~/'Old Projects'");
  assert.equal(run('same for /tmp/new', BASH, h).command, 'rm -r /tmp/new');
  const amb = run('same for /tmp/a.txt b.txt', BASH, h);
  assert.equal(amb.command, 'rm -r <PATH>');
  assert.deepEqual(amb.missing, ['path']);
  assert.equal(run('same for /srv/my app', BASH, ['du -sh /var/log']).command, "du -sh '/srv/my app'");
});

// ---------- (6) scope values, pip target, ssh tunnel ----------
test('final4-codex major: a quoted --workspace value is one value', () => {
  assert.equal(run('run npm deploy --workspace "staging app"').command, "npm run deploy --workspace 'staging app'");
  assert.equal(run('run npm deploy --workspace="staging app"').command, "npm run deploy --workspace 'staging app'");
  assert.equal(run('run npm deploy --workspace staging').command, 'npm run deploy --workspace staging');
  assert.equal(run('npm install lodash -w packages/api').command, 'npm install lodash --workspace packages/api');
});

test('final4-codex major: pip --target is kept', () => {
  assert.equal(run('install requests with pip --target /tmp/packages').command, 'python3 -m pip install requests --target /tmp/packages');
  assert.equal(run('pip install requests -t /tmp/pkgs').command, 'python3 -m pip install requests --target /tmp/pkgs');
  assert.equal(run('pip install requests --target="/tmp/my pkgs"').command, "python3 -m pip install requests --target '/tmp/my pkgs'");
  const r = run('install requests with pip --target /tmp/packages');
  assert.equal(r.risk, 'medium');
  assert.deepEqual(r.missing, []);
});

test('final4-codex major: ssh -L keeps the remote host and port', () => {
  const cases = {
    'forward local port 8080 to remote port 5432 on db.example.com over ssh': 'ssh -N -L 8080:localhost:5432 db.example.com',
    'przekieruj lokalny port 8080 na zdalny port 5432 na serwerze db.example.com': 'ssh -N -L 8080:localhost:5432 db.example.com',
    'forward local 8080 to db.internal:5432 via bastion.example.com': 'ssh -N -L 8080:db.internal:5432 bastion.example.com',
    'ssh tunnel -L 8080:db.internal:5432 bastion': 'ssh -N -L 8080:db.internal:5432 bastion',
    'forward 8080 to 5432 on db.example.com over ssh': 'ssh -N -L 8080:localhost:5432 db.example.com',
    'ssh tunnel local port 9000 remote port 80 on web1': 'ssh -N -L 9000:localhost:80 web1',
    // the same port on both ends when only one is named
    'forward port 5432 from db.example.com': 'ssh -N -L 5432:localhost:5432 db.example.com',
    'forward port 8080 to db.example.com over ssh': 'ssh -N -L 8080:localhost:8080 db.example.com',
    // two bare ports, neither said to be local or remote: the remote one is withheld
    'ssh tunnel ports 8080 5432 on db.example.com': 'ssh -N -L 8080:localhost:<RPORT> db.example.com',
  };
  for (const [q, cmd] of Object.entries(cases)) assert.equal(run(q).command, cmd, q);
});
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
// Release guards (v0.3 close5): checks on a finished suggestion that turn a command contradicting the request into a refusal.
//
//   negation / exclusion: "kill all python processes except 1234", "don't delete a.txt", "usuń pliki oprócz app.log",
//     "remove all .log files without app.log": the exclusion is never ignored. A command that cannot express it (no
//     --exclude, ! -name, grep -v, ...) is not suggested; the request is refused with a hint.
//   opposite action: "uninstall nginx", "odinstaluj nginx", "pip uninstall requests" is never `apt install` / `pip install`.
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
    const held = res.missing?.length > 0 && (v == null || !cmdHas(res.command, v));
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

/** A suggestion that contradicts its request becomes a refusal with a hint. */
export function releaseGuards(query, res) {
  const hint = uninstallIssue(query, res) || negationIssue(query, res);
  if (!hint) return res;
  const { shell, os, coreutils, threshold, context, confidence, tool, tools, candidates } = res;
  return { query, shell, os, coreutils, threshold, context, confidence, tool, tools, candidates, understood: false, method: 'none', command: null, missing: [], hint, refusedIntent: res.intent ?? null };
}

 succeeded in 0ms:
diff --git a/src/pipeline.js b/src/pipeline.js
index c5430f7..9792290 100644
--- a/src/pipeline.js
+++ b/src/pipeline.js
@@ -9,13 +9,16 @@
 import { getModel } from './model.js';
 import { cascade } from './cascade.js';
 import { tag, exFromSpans } from './tagger.js';
-import { extractSlots, pickArg } from './slots.js';
+import { extractSlots, pickArg, isOptionWord, foldKeepLength, isStopWord } from './slots.js';
 import { resolveSlots, buildCommand, finalizeSlots, RAW_OK } from './fill.js';
 import { BY_ID } from './catalog.js';
 import { FAMILY_OF, NONE } from './tools.js';
 import { detectEnv, envFeatures } from './env.js';
-import { buildContext, resolveReference, hasPronoun, cwdFlags, sameBut, entityForSlot, isAmbiguous } from './history.js';
+import { buildContext, resolveReference, hasPronoun, hasLocative, cwdFlags, sameBut, entityForSlot, isAmbiguous } from './history.js';
+import { AMB } from './shellwords.js';
 import { compose } from './compose.js';
+import { assessCommand, maxRisk } from './danger.js';
+import { releaseGuards } from './guards.js';
 import { readFileSync } from 'node:fs';
 
 let EXPLAINED = null;
@@ -32,51 +35,324 @@ const PRONOUN_VALUE = /^(it|its|that|this|them|those|one|again|back|there|here|t
 
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
+  args: () => false, scope: () => false, workspace: (v) => RAW_OK.workspace(v), pr: (v) => RAW_OK.pr(v), repo: (v) => RAW_OK.repo(v), wenv: (v) => RAW_OK.wenv(v), dryrun: (v) => RAW_OK.dryrun(v), delbranch: (v) => RAW_OK.delbranch(v), npmverb: (v) => RAW_OK.npmverb(v),
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
+const PR_NOT_CREATE = /(?<![\p{L}\d_])(?:approve\w*|accept\w*|lgtm|reopen\w*|re-open\w*|ready|undraft\w*|convert\w*|mark\w*|oznacz\w*|otw[oó]rz\s+ponownie|zatwierd[zź]\w*|zaakceptuj\w*|akceptuj\w*)(?![\p{L}\d_])|\b(?:in|on|w)\s+(?:the\s+|a\s+)?(?:web|browser|przegl[aą]dar\w*)\b/iu;
+// a pull request URL (GitHub or GitHub Enterprise)
+const PR_URL = /\bhttps:\/\/[\w.-]+\/[\w.-]+\/[\w.-]+\/pull\/\d+\b/i;
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
+  // a negation word is never the thing a command acts on ("kill the process that is not responding" is not `pkill -f not`)
+  if (OPERAND_SLOT_NAMES.has(k) && /^(?:not|no|never|nie|bez|without|except|but|oprocz|oprócz|poza|ani)$/i.test(String(v))) return false;
   if (isAmbiguous(v)) return false;
   if (RAW_OK[k]) return RAW_OK[k](v);
   if (VALID_SLOT[k]) return VALID_SLOT[k](String(v));
-  return String(v).length < 300 && !/\0/.test(String(v));
+  // `?…` marks a value that was named but withheld (fill.js): a placeholder, never rendered as `'?'`
+  return String(v).length < 300 && !/\0/.test(String(v)) && !String(v).startsWith('?');
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
+    if (validSlot(k, rT[k])) { slots[k] = rT[k]; sources[k] = 'tagger'; } else if (rR[k] != null && (validSlot(k, rR[k]) || (!VALID_SLOT[k] && !String(rR[k]).startsWith('?'))) && !(PATH_SLOT_NAMES.has(k) && partOfRejected(rR[k]))) { slots[k] = rR[k]; sources[k] = 'regex'; }
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
+  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr', 'repo', 'wenv', 'num', 'args', 'scope', 'workspace', 'piptarget', 'rport', 'rhost', 'script']) {
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
+// Unquoted paths with spaces (v0.3 close4): `delete the folder ~/Old Projects` names `~/Old Projects`, never `~/Old`. The
+// words after a path up to the end of its span (the end of the request, a connector such as "to", a modifier such as
+// "recursively", a noun such as "files") are part of its name; when that end is unclear (another file name, a number or
+// another value, a name that already has an extension: `/tmp/a.txt b.txt`) the path is withheld as a placeholder.
+const PATH_END = /^(?:to|into|o|u|a|przy|nad|pod|przed|za|ku|onto|in|inside|within|under|on|at|from|with|without|and|or|then|as|by|for|than|but|except|excluding|not|nie|nic|ani|nigdy|instead|via|using|if|when|where|which|that|who|so|w|we|z|ze|do|na|i|oraz|lub|albo|potem|jako|po|bez|niz|oprocz|poza|zamiast|ktore|ktory|ktora|gdzie|older|newer|larger|bigger|smaller|greater|less|more|modified|changed|created|edited|named|called|containing|matching|sorted|sort|sorting|recursively|recursive|please|pls|now|force|forcibly|forcefully|here|there|everywhere|only|first|last|top|including|showing|show|it|its|permanently|completely|entirely|fully|safely|quickly|immediately|again|also|too|instead|trwale|calkowicie|calkiem|natychmiast|ponownie|tez|rowniez|starsz\w*|nowsz\w*|wieksz\w*|mniejsz\w*|zmienion\w*|zmodyfikowan\w*|nazwie|nazwan\w*|zawierajac\w*|posortowan\w*|rekurencyjnie|prosze|teraz|tylko|tutaj|tam|wszedzie|folder\w*|director(?:y|ies)|dirs?|katalog\w*|podkatalog\w*|files?|plik\w*|archive|archiwum|environments?|srodowisk\w*)$/i;
+const PATH_EXT = /\.[A-Za-z][A-Za-z0-9]{0,4}$/;
+/**
+ * The words that follow an unquoted path value in the request before the end of its span:
+ * null (nothing follows, or the value is quoted / not found), { value } (the whole name) or { ambiguous: true }.
+ */
+// words of the request around a path, never part of its name ("node_modules is the largest", "/etc razem z podkatalogami")
+const REQUEST_WORD = /^(?:is|are|was|were|be|been|being|am|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|don't|doesn't|didn't|won't|can't|does|do|did|has|have|had|will|would|can|could|should|must|may|might|contain|contains|reference|references|use|uses|used|take|takes|taking|eat|eats|eating|weigh|weighs|occupy|occupies|hold|holds|need|needs|get|gets|got|look|looks|appear|appears|exist|exists|mention|mentions|say|says|shows|lists|total|altogether|overall|combined|together|right|correct|ok|okay|thanks|thank|you|jest|sa|byl|byla|bylo|byly|bedzie|beda|ma|maja|mial|miala|mialy|zawiera|zawieraja|zajmuje|zajmuja|wazy|waza|razem|lacznie|wedlug|wg|ile|czy|sie|odwoluje|odwoluja|uzywa|uzywaja|uzywan\w*|edytowan\w*|zmienian\w*|dzieki|dziekuje|executable|runnable|readable|writable|writeable|inplace|in-place|point|points|one|level|levels|deep|human|wykonywaln\w*|uruchamialn\w*|uzytkownikowi|uzytkownika|wlasciciel\w*|kompresj\w*)$/i;
+/**
+ * The words that follow an unquoted path value `v` in the request before the end of its span: null (nothing follows, the
+ * value is quoted or not found, or only words of the request follow), { value } (the whole name) or { ambiguous: true }.
+ * `used`: the values of the other slots (a following path that is one ends the span). `strict`: a changing command, where
+ * name words followed by words of the request (`/srv/my app is …`) are ambiguous; a read-only one keeps the first reading
+ * and only takes an explicit path to the end of a run of name words.
+ */
+export function pathTail(text, v, spans = [], { used = [], strict = true } = {}) {
+  if (typeof v !== 'string' || !v || /\s/.test(v) || REQUEST_WORD.test(foldKeepLength(v).toLowerCase())) return null;
+  const other = spans.filter((sp) => sp.type !== 'PATH' && sp.start != null);
+  for (let i = text.indexOf(v); i >= 0; i = text.indexOf(v, i + 1)) {
+    if (i > 0 && !/\s/.test(text[i - 1])) continue; // part of a word, or quoted
+    if (!/^[ \t]+\S/.test(text.slice(i + v.length))) return null;
+    const words = [];
+    let ambiguous = false;
+    let fileNext = false;
+    let end = i + v.length;
+    const re = /\S+/g;
+    re.lastIndex = i + v.length;
+    for (let m = re.exec(text); m; m = re.exec(text)) {
+      const at = m.index;
+      const w = m[0];
+      const bare = w.replace(/[.,;:!?)]+$/, '');
+      const fold = foldKeepLength(bare).toLowerCase();
+      // another value of the request (a number, a size, a time, a name) after name words: where the name ends is unclear
+      if (other.some((sp) => at < sp.end && sp.start < at + w.length) || /^\d/.test(bare)) { if (words.length) ambiguous = true; break; }
+      if (!bare || PATH_END.test(fold) || /^[-–—"'„“`(]/.test(w)) break;
+      // (the stop-word list names nouns too, `app`, `service`: only a read-only command stops at them)
+      if (REQUEST_WORD.test(fold) || (!strict && isStopWord(fold))) { if (words.length) ambiguous = true; break; }
+      if (/[\\/~$`*?]/.test(bare) || PATH_EXT.test(bare)) {
+        // a second path: the next operand (`cp /tmp/a /tmp/b`), or a name the command would drop (`rm /tmp/a.txt b.txt`)
+        if (!used.includes(bare) || words.length) { ambiguous = true; fileNext = true; words.push(bare); }
+        break;
+      }
+      // a plain word that is the value of another slot (`chown … ~/x kwartet` with user kwartet) ends the name
+      if (used.includes(bare)) break;
+      words.push(bare);
+      end = at + bare.length;
+      if (bare !== w) break; // sentence punctuation ends the span
+    }
+    if (!words.length) return null;
+    // a name with an extension is whole: plain words after it are the request's (`make script.sh executable`); only another
+    // file name right after it is unclear (`rm /tmp/a.txt b.txt`)
+    if (PATH_EXT.test(v)) return strict && fileNext && words.length === 1 ? { ambiguous: true, words } : null;
+    if (ambiguous) return strict ? { ambiguous: true, words } : null;
+    // a read-only command: only an explicit path that ends the request (`list files in ~/Old Projects`)
+    if (!strict && (!/[\\/~]/.test(v) || /\S/.test(text.slice(end).replace(/^[.!?]+/, '')))) return null;
+    return { value: v + text.slice(i + v.length, end), words };
+  }
+  return null;
+}
+
+// Source and destination of a two-path command (v0.3 close5): the request is split at its one connector ("to", "into",
+// "do", "na", "as", "jako") before the paths are read, so `rename /tmp/my file.txt to /tmp/new.txt` never becomes
+// `mv /tmp/my file.txt` (the third word silently dropped). Each side gives one value, the whole spaced name, or (when where
+// it ends is unclear: `/tmp/my file.txt`, `report.txt notes.txt`) null, a placeholder.
+// (not `ln -s`: "link to X" names the link's target, the first operand)
+const TWO_PATH_INTENTS = new Set(['copy', 'move_rename']);
+const DST_FILLER = /^(?:the|a|an|my|our|folder\w*|director(?:y|ies)|dir|katalog\w*|location|place|file|plik\w*|moj\w*)$/i;
+function splitTwoPaths(query, slots) {
+  const q = String(query);
+  const masked = foldKeepLength(q).toLowerCase().replace(/(["'])(?:(?!\1).)*\1/g, (m) => 'x'.repeat(m.length));
+  const cons = [...masked.matchAll(/\s(?:to|into|onto|as|do|na|jako|->|=>)\s/g)];
+  if (cons.length !== 1) return null;
+  const L = q.slice(0, cons[0].index);
+  const R = q.slice(cons[0].index + cons[0][0].length);
+  const vals = [slots.src, slots.dst].filter((v) => typeof v === 'string' && v !== '');
+  // the first slot value on a side ("…/tmp/my…" before "file.txt"); quoted values are whole names
+  // (a whole word: `build` is not the start of `build_old`)
+  const wordAt = (side, v) => { for (let i = side.indexOf(v); i >= 0; i = side.indexOf(v, i + 1)) if ((i === 0 || /[\s"'„“`]/.test(side[i - 1])) && /^(?:$|[\s"'”`.,;:!?)])/.test(side.slice(i + v.length))) return i; return -1; };
+  const anchor = (side) => vals.map((v) => ({ v, i: wordAt(side, v) })).filter((x) => x.i >= 0).sort((a, b) => a.i - b.i || b.v.length - a.v.length)[0]?.v ?? null;
+  const read = (side, v) => {
+    if (v == null) return { v: null, found: false };
+    const t = pathTail(side, v, [], { strict: true });
+    if (!t) return { v, found: true };
+    return t.value != null && validSlot('src', t.value) ? { v: t.value, found: true } : { v: null, found: true, words: [v, ...t.words].join(' ') };
+  };
+  const src = read(L, anchor(L));
+  let dv = anchor(R);
+  if (dv == null) {
+    const first = R.trim().split(/\s+/).find((w) => !DST_FILLER.test(w)) ?? '';
+    const bare = first.replace(/[.,;:!?)]+$/, '');
+    if (bare && !FUNCTION_WORD.test(bare) && !PRONOUN_VALUE.test(bare) && !/^["'„“`]/.test(bare)) dv = bare;
+  }
+  const dst = read(R, dv);
+  if (!src.found && !dst.found) return null;
+  // "move it to /tmp/old": a side without a value of its own never takes the other side's ("mv /tmp/old /tmp/old")
+  if (!src.found && slots.src != null && slots.src === dst.v) return { src: { v: null, found: true, quiet: true }, dst };
+  // "rename my notes.txt to notes.txt": the same name on both sides; the source is unclear ("my notes.txt"?)
+  if (src.v != null && src.v === dst.v) return { src: { v: null, found: true, words: L.trim() }, dst };
+  return { src, dst };
 }
 
+// An operand that is the noun of the request (v0.3 close5): "stop docker container web" names the container `web`, never
+// `docker`. A value that is the tool or the noun itself is replaced by the word after the last such noun, or withheld.
+const NOUN_VALUE = {
+  container: /^(?:docker|dockera|podman|containers?|kontener\w*)$/i,
+  service: /^(?:services?|systemd|systemctl|uslug\w*|usług\w*|serwis\w*|daemon|unit)$/i,
+  pkg: /^(?:packages?|pakiet\w*|apt|apt-get|pip3?|npm|brew|dnf|yum)$/i,
+  name: /^(?:process(?:es)?|proces\w*)$/i,
+};
+const NOUN_SKIP = /^(?:the|a|an|named|called|o|nazwie|nazwan\w*|id)$/i;
+const NOUN_VERB = /^(?:stop|start|restart|run|show|list|ls|ps|logs?|remove|rm|kill|exec|status|enable|disable|reload|install|inspect|zatrzymaj|uruchom|zrestartuj|restartuj|usu[nń]|zabij|poka[zż]|wy[sś]wietl|zainstaluj|w[lł][aą]cz|wy[lł][aą]cz|logi)$/i;
+function nounOperand(k, v, query) {
+  const words = String(query).trim().split(/\s+/).map((w) => w.replace(/[.,;:!?]+$/, ''));
+  let last = -1;
+  words.forEach((w, i) => { if (NOUN_VALUE[k].test(w)) last = i; });
+  // past the request's own words after it: "docker logs nginx", "docker exec -it api-server sh", "docker exec do api-server"
+  let i = last + 1;
+  while (i < words.length && (NOUN_SKIP.test(words[i]) || NOUN_VERB.test(words[i]) || FUNCTION_WORD.test(words[i]) || /^-/.test(words[i]))) i++;
+  // nothing after it: the word right after the opening verb ("put eslint in the global npm packages", "instal pytest via pip")
+  const c = words[i] ?? (words.length > 2 && !NOUN_VALUE[k].test(words[0]) && !FUNCTION_WORD.test(words[1]) && !NOUN_VERB.test(words[1]) && !NOUN_SKIP.test(words[1]) && !isStopWord(foldKeepLength(words[1]).toLowerCase()) ? words[1] : null);
+  return c != null && !NOUN_VALUE[k].test(c) && validSlot(k, c) ? c : null;
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
@@ -90,40 +366,83 @@ function flagTokens(cmd) {
 }
 
 /** Second pass input: paths, numbers, ... from the merged extraction for the composer. */
-function composeInput(text, model, tool) {
+function composeInput(text, model, tool, unclear = [], grown = {}) {
   const ex = extractSlots(text);
   const t = tag(text, tool, model);
   const exT = exFromSpans(text, t.spans);
   const merged = { ...ex };
   if (exT.paths.length) merged.paths = exT.paths;
+  // a path the catalog read to the end of its name (`/srv/my` -> `/srv/my app`): the composer takes the whole name too
+  if (merged.paths) merged.paths = merged.paths.map((p) => grown[p] ?? p);
+  // paths followed by sentence punctuation (`/tmp/data!`): fine for a read-only command, but a composed
+  // command that changes something is never aimed at them (see blocksAmbiguous)
+  // the same for a path that is the output of a command (`on \`pwd\``, `$(pwd)`): the catalog withholds it too
+  // and a quoted argument that may be words of the request (joinArgs)
+  const amb = [...(merged.paths || []).filter((p) => trailingPunctAfter(text, p) || insideSubstitution(text, String(p))), ...unclear];
+  // an unquoted path that more words may follow (`/srv/my app`): a composed command that changes something never takes its
+  // first word alone (see blocksAmbiguous)
+  amb.tails = (merged.paths || []).filter((p) => pathTail(text, p, t.spans) != null);
   for (const k of ['count', 'size', 'duration', 'ext', 'mode']) if (exT[k] != null) merged[k] = exT[k];
-  const pattern = () => exT.tagged.PATTERN?.[0] ?? ex.quoted[0] ?? pickArg('pattern', ex) ?? null;
+  const pattern = () => { const p = exT.tagged.PATTERN?.find((x) => !isOptionWord(x)) ?? ex.quoted[0] ?? pickArg('pattern', ex) ?? null; return cutAtEscapedQuote(text, p) ? null : p; };
   const nameOf = (type) => exT.tagged[type]?.[0] ?? null;
-  return { ex: merged, pattern, nameOf };
+  return { ex: merged, pattern, nameOf, ambiguousPaths: amb };
 }
+/**
+ * A composed command that changes something and uses a path whose end is unclear (`chmod -R 777 /tmp/data!`).
+ * Composed commands are always high (the trust rule), so "changes something" is judged by the parser: a writing tool (chmod,
+ * tar) or anything the danger checker flags on its own (find -delete, git/docker subcommands, ...).
+ */
+const WRITING_TOOLS = new Set(['chmod', 'tar']);
+const blocksAmbiguous = (comp, amb) => !!comp && !comp.invalid && ((amb.some((p) => comp.command.includes(p)) &&
+  (WRITING_TOOLS.has(comp.tool) || assessCommand(comp.command, 'safe').risk !== 'safe')) ||
+  // a path whose name may go on: judged by the deny rules alone (a read-only `find /tmp -user bob` is not blocked)
+  ((amb.tails || []).some((p) => comp.command.includes(p)) &&
+  (WRITING_TOOLS.has(comp.tool) || assessCommand(comp.command, 'safe', { allowlist: { off: true } }).risk !== 'safe')));
 
 /**
  * Pure function used by the CLI, eval and tests.
  * opts: { shell, os, env, history: string[] (commands, oldest first), cwd, threshold, top, compose: 'auto'|'force'|'off',
- *         slotMode: 'merge'|'tagger'|'regex', model }
+ *         slotMode: 'merge'|'tagger'|'regex', model, rerank, rerankTop (candidates the rerank hook sees; default top) }
  */
 export function suggest(query, opts = {}) {
+  // a command that contradicts the request (ignores "except" / "don't", installs for "uninstall") is refused (guards.js)
+  return releaseGuards(query, replayFloor(suggestOnce(query, opts)));
+}
+
+// the trust rule (danger.js): a command resolved from history (a reference, "same but …", a value from an earlier
+// command) is a replay, not a fresh render of what the request says: at least high, never auto-run
+const REPLAY = 'resolved from history (a replay of an earlier command, not a fresh catalog render); needs an explicit yes';
+function replayFloor(s) {
+  if (!s?.command || s.method !== 'history-rule' || s.risk === 'high') return s;
+  return { ...s, risk: maxRisk(s.risk, 'high'), warnings: [REPLAY, ...(s.warnings || [])] };
+}
+
+function suggestOnce(query, opts = {}) {
   const model = opts.model || getModel();
   const env = opts.env || detectEnv({ shell: opts.shell, os: opts.os });
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
@@ -134,29 +453,84 @@ export function suggest(query, opts = {}) {
 
   // ---- rule: "same for X" reuses the previous intent with one slot replaced ----
   if (ref?.rule === 'same-for') {
-    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], validHistorySlots(ref.slots)) });
-    return { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
+    const slots = validHistorySlots(ref.slots);
+    // a value that fails validation (a 300-character path, ...) is a placeholder, never `find .`
+    const blank = invalidHistorySlots(ref.slots);
+    // `same for ~/Old Projects`, `same for ~/'Old Projects'`: the whole new name, or a placeholder when where it ends is
+    // unclear (`same for /tmp/a.txt b.txt`; the words after "same for" are the target, so a read-only command reads them
+    // strictly too); never its first word (`rm -r ~/Old`) or the part before a quote (`rm -r ~/`)
+    let cutHistory = null;
+    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null) {
+      const v = String(slots[ref.changed]);
+      const a = String(ref.arg ?? '').trim();
+      const q = a.match(/^([^\s"']*)(["'])([^"']+)\2([^\s"']*)$/);
+      const whole = /["']/.test(a) ? (q ? q[1] + q[3] + q[4] : null)
+        : (() => { const t = pathTail(query, v, [], { strict: true }); return t ? t.value ?? null : v; })();
+      if (whole != null && validSlot(ref.changed, whole)) slots[ref.changed] = whole;
+      else { cutHistory = `${ref.changed}=${a}`; blank.push(ref.changed); delete slots[ref.changed]; }
+    }
+    // the new path ends in sentence punctuation (`same for /tmp/data!`): placeholder, as for any request
+    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null && BY_ID[ref.intent].risk !== 'safe' && trailingPunctAfter(query, slots[ref.changed])) {
+      blank.push(ref.changed);
+      delete slots[ref.changed];
+    }
+    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank, keepOptional: blank });
+    const res = { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
+    const punct = blank.filter((k) => !invalidHistorySlots(ref.slots).includes(k) && !(cutHistory && k === ref.changed));
+    if (cutHistory) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear where the new name ends (${cutHistory}); quote the path`];
+    if (punct.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${punct.join(', ')}); quote the path`];
+    if (punct.length + (cutHistory ? 1 : 0) < blank.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: it is not a valid value (${blank.filter((k) => !punct.includes(k) && !(cutHistory && k === ref.changed)).join(', ')})`];
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
+  // "merge https://github.com/o/r/pull/3": a merge of a pull request URL is never `git clone` of it
+  if (intent === 'git_clone' && !sb && !ref && PR_URL.test(query) && mergeAsked(query)) intent = 'gh_pr_merge';
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
@@ -169,73 +543,300 @@ export function suggest(query, opts = {}) {
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
+    return { ...out, understood: false, method: 'none', hint: 'approving, reopening, marking ready or opening an existing pull request is not supported (gh pr review --approve <PR>, gh pr reopen <PR>, gh pr ready <PR>, gh pr view --web <PR>); not suggesting gh pr create' };
+  }
+  if (intent?.startsWith('gh_pr_') && ((closes && !merges) || (intent === 'gh_pr_merge' && !merges && [...query.matchAll(MERGE_WORD)].length))) {
+    const hint = closes ? 'closing a pull request is not supported (gh pr close <PR>)' : 'the request does not ask for a merge (it negates or undoes one); not suggesting gh pr merge';
+    return { ...out, understood: false, method: 'none', hint };
+  }
 
-  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode });
+  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode, tagger: opts.tagger });
   const slots = r.slots;
+  // "stop docker container web": the operand is never the tool or noun word (`docker stop docker`)
+  const nounBlank = [];
+  for (const k of Object.keys(NOUN_VALUE)) {
+    if (slots[k] == null || !NOUN_VALUE[k].test(String(slots[k]))) continue;
+    const c = nounOperand(k, String(slots[k]), query);
+    if (c != null) slots[k] = c; else { delete slots[k]; delete r.sources[k]; nounBlank.push(k); }
+  }
+  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
+  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
+  const ambiguousPaths = [];
+  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
+  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
+  const blank = new Set([...(r.withheld || []), ...nounBlank]);
+  // withheld operands whose optional part keeps its placeholder: an invalid operand, a history value that is ambiguous or
+  // invalid (`gh pr merge <PR>` for "same but merge" after `tellsh merge pr nightly`, never the current branch's pull request)
+  const keep = new Set([...r.invalidOperands, ...nounBlank]);
+  // an unquoted path followed by more words of its name (`~/Old Projects`): the whole name, or a placeholder when where it
+  // ends is unclear; never the first word alone
+  const cutPaths = [];
+  const grown = {};
+  for (const k of Object.keys(slots)) {
+    if (!PATH_SLOT_NAMES.has(k) || r.sources[k] === 'history') continue;
+    const t = pathTail(query, slots[k], r.spans, { used: Object.entries(slots).filter(([j]) => j !== k).map(([, x]) => String(x)), strict: BY_ID[intent].risk !== 'safe' });
+    if (!t) continue;
+    if (t.value != null && validSlot(k, t.value)) { grown[slots[k]] = t.value; slots[k] = t.value; continue; }
+    cutPaths.push(`${k}=${slots[k]} ${t.words.join(' ')}`); delete slots[k]; delete r.sources[k]; blank.add(k); keep.add(k);
+  }
+  if (cutPaths.length) finalizeSlots(BY_ID[intent], slots);
+  if (BY_ID[intent].risk !== 'safe') {
+    for (const k of Object.keys(slots)) {
+      if (PATH_SLOT_NAMES.has(k) && r.sources[k] !== 'history' && trailingPunctAfter(query, slots[k])) { ambiguousPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
+    }
+    if (ambiguousPaths.length) finalizeSlots(BY_ID[intent], slots);
+  }
+  // `rename /tmp/my file.txt to /tmp/new.txt`, `move report.txt notes.txt to /tmp/dir`: the source is what precedes "to",
+  // the destination what follows it; an unclear side is a placeholder + warning, never another word of the request
+  const splitPaths = [];
+  if (TWO_PATH_INTENTS.has(intent) && !ref && !sb && !hasLocative(query)) {
+    const sp = splitTwoPaths(query, slots);
+    for (const [k, side] of sp ? [['src', sp.src], ['dst', sp.dst]] : []) {
+      if (!side.found || r.sources[k] === 'history') continue;
+      if (side.v == null) { if (!side.quiet) splitPaths.push(`${k}=${side.words}`); delete slots[k]; delete r.sources[k]; blank.add(k); keep.add(k); } else if (slots[k] !== side.v) { slots[k] = side.v; r.sources[k] = 'regex'; }
+    }
+    if (sp) finalizeSlots(BY_ID[intent], slots);
+  }
+  // a changing command whose path is the output of a command (`in \`pwd\``, `$(pwd)`), or a request that names more
+  // explicit paths than the command takes (`in /tmp/x and /tmp/y`: only one would be used): placeholder + warning
+  const unclearPaths = [];
+  if (BY_ID[intent].risk !== 'safe') {
+    const explicit = explicitPaths(query);
+    const nPathSlots = [...PATH_SLOT_NAMES].filter((k) => usesSlot(BY_ID[intent], k)).length;
+    const dropped = explicit.filter((p) => !Object.values(slots).some((v) => String(v) === p || String(v).startsWith(p + ' ')));
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
+  if (splitPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear which words name the ${splitPaths.map((x) => x.split('=')[0] === 'src' ? 'source' : 'destination').join(' and ')} (${splitPaths.join(', ')}); quote each path`];
+  if (cutPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear where the unquoted name ends (${cutPaths.join(', ')}); quote the path`];
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
+    const ci = composeInput(query, model, fam, opts.unclearArgs, grown);
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
/bin/bash -lc "rg -n '"'^export|''^function|''^const [A-Z_]+|risk:'"' src/fill.js src/pipeline.js; cat test/regressions29.test.js" in /workspace/tellsh
 succeeded in 0ms:
src/pipeline.js:34:const PRONOUN_VALUE = /^(it|its|that|this|them|those|one|again|back|there|here|to|tego|ten|tę|te|ta|tą|tej|tym|go|je|ją|ja|jego|jej|niego|nią|nia|nim|niej|mu|tamten|tamtego|tamto|ponownie|znowu)$/i;
src/pipeline.js:38:const FUNCTION_WORD = /^(?:the|a|an|of|for|to|in|on|at|by|with|from|into|onto|up|out|it|its|this|that|these|those|and|or|then|is|my|me|your|there|same|inside|w|we|z|ze|na|do|od|dla|o|i|oraz|jest|mi|moim|tym|ten|ta|to|tej|tam|stamtąd|stamtad|tamże|tamze|samym|samego)$/i;
src/pipeline.js:41:const NAME_NOUN = { path: String.raw`folder|directory|dir|katalog\w*|podkatalog\w*`, file: String.raw`file|plik\w*` };
src/pipeline.js:42:const NAME_NEXT = /^(?:sorted|sort|sorting|recursively|recursive|please|now|force|forcibly|forcefully|posortowan\w*|rekurencyjnie|prosze|teraz)$/i;
src/pipeline.js:43:function namedStopWord(text, k) {
src/pipeline.js:51:const LOC_WORD = /^(?:in|inside|within|under|of|from|at|on|into|w|we|z|ze|na|do|od|pod|dla)$/i;
src/pipeline.js:52:const LOC_NOUN = /^(?:folder\w*|directory|directories|dir|dirs|katalog\w*|podkatalog\w*|files?|plik\w*)$/i;
src/pipeline.js:53:function danglingLocation(text) {
src/pipeline.js:66:const REF_DST = /(?:^|\s)(?:to|into|onto|inside|in|do|na|w|we|pod)\s+(?:(?:the|that|this|those|these|same|ten|ta|tego|tamtego|tym|tamtym|tamten)\s+)?(?:(?:folder\w*|directory|dir|katalog\w*|location|place|miejsc\w*)(?=\s|$|[?!.,])|(?:it|that|this|them|there|tego|niego|nim|tym|tam|tamtego|tamten)(?=\s|$|[?!.,]))|(?:^|\s)(?:there|tam)(?=\s|$|[?!.,])/;
src/pipeline.js:68:function afterDestWord(text, v) {
src/pipeline.js:76:const WORDISH = (v) => /^(?!-)[\w@.:+-]{1,64}$/.test(v);
src/pipeline.js:77:const VALID_SLOT = {
src/pipeline.js:95:const PATH_SLOT_NAMES = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
src/pipeline.js:98:const PR_REFERENCE = /\b(?:that|this|its|the\s+same|the\s+previous|the\s+last|ten|tego|tamten)\s+(?:\w+\s+)?(?:prs?|pull[\s-]+requests?)\b|(?:^\s*|(?:^|\s)(?:zmerguj|scal|poka[zż]|zobacz|otw[oó]rz|zamknij|sprawd[zź]|wy[sś]wietl|zatwierd[zź]|zaakceptuj|przejrzyj)\S*\s+)to\s+(?:prs?|pull[\s-]+requests?)\b/i;
src/pipeline.js:101:const PR_PICKED = /\b(?:(?:the|a|an|my|our|your|his|her|their|some|any)\s+)?(?:other|another|latest|newest|most\s+recent|recent|oldest|older|newer|earlier|next|first|second|third|new|old|pending|approved|remaining|(?:(?:my|our|your|his|her|their)\s+)(?:last|previous|prior)|inn[yaeoy]\w*|ostatni\w*|najnowsz\w*|poprzedni\w*|kolejn\w*|nastepn\w*|następn\w*|starsz\w*)\s+(?:(?:open|opened|draft|merged|github)\s+)?(?:prs?|pull[\s-]+requests?)\b/i;
src/pipeline.js:102:const PR_CREATE_WORD = /(?<![\p{L}\d_])(?:create|creating|new|make|submit|raise|file|send|draft|utw[oó]rz\p{L}*|stw[oó]rz\p{L}*|now[yaeią]\p{L}*|za[lł][oó][zż]\p{L}*|wy[sś]lij\p{L}*)(?![\p{L}\d_])/iu;
src/pipeline.js:103:const PR_NOT_CREATE = /(?<![\p{L}\d_])(?:approve\w*|accept\w*|lgtm|reopen\w*|re-open\w*|ready|undraft\w*|convert\w*|mark\w*|oznacz\w*|otw[oó]rz\s+ponownie|zatwierd[zź]\w*|zaakceptuj\w*|akceptuj\w*)(?![\p{L}\d_])|\b(?:in|on|w)\s+(?:the\s+|a\s+)?(?:web|browser|przegl[aą]dar\w*)\b/iu;
src/pipeline.js:105:const PR_URL = /\bhttps:\/\/[\w.-]+\/[\w.-]+\/[\w.-]+\/pull\/\d+\b/i;
src/pipeline.js:106:const PR_CLOSE = /(?:^|[\s,;])(?:close|closing|shut|reject|decline|abandon|cancel|zamkn\S*)(?=[\s.,!?;:]|$)/i;
src/pipeline.js:109:const MERGE_WORD = /(?:^|[^\w-])((?:un|de)?merg\w*|(?:roz)?scal\w*)/gi;
src/pipeline.js:110:const MERGE_NEGATION = /(?:\b(?:not|no|never|without|nor|instead\s+of|rather\s+than|nie|bez)|n't|\bdont|\bundo(?:\s+the)?|\brevert(?:\s+the)?|\bcofnij)\s+(?:\S+\s+){0,2}$/i;
src/pipeline.js:113:const OPERAND_SLOT_NAMES = new Set(['name', 'service', 'container', 'pkg', 'host', 'target', 'branch', 'user', 'script', 'url', 'pid']);
src/pipeline.js:115:export function validSlot(k, v) {
src/pipeline.js:134:export function resolveWithTagger(intentId, text, { model = getModel(), tool, mode = 'merge', tagger } = {}) {
src/pipeline.js:186:function explicitPaths(text) {
src/pipeline.js:193:function insideSubstitution(text, v) {
src/pipeline.js:211:const PATH_END = /^(?:to|into|o|u|a|przy|nad|pod|przed|za|ku|onto|in|inside|within|under|on|at|from|with|without|and|or|then|as|by|for|than|but|except|excluding|not|nie|nic|ani|nigdy|instead|via|using|if|when|where|which|that|who|so|w|we|z|ze|do|na|i|oraz|lub|albo|potem|jako|po|bez|niz|oprocz|poza|zamiast|ktore|ktory|ktora|gdzie|older|newer|larger|bigger|smaller|greater|less|more|modified|changed|created|edited|named|called|containing|matching|sorted|sort|sorting|recursively|recursive|please|pls|now|force|forcibly|forcefully|here|there|everywhere|only|first|last|top|including|showing|show|it|its|permanently|completely|entirely|fully|safely|quickly|immediately|again|also|too|instead|trwale|calkowicie|calkiem|natychmiast|ponownie|tez|rowniez|starsz\w*|nowsz\w*|wieksz\w*|mniejsz\w*|zmienion\w*|zmodyfikowan\w*|nazwie|nazwan\w*|zawierajac\w*|posortowan\w*|rekurencyjnie|prosze|teraz|tylko|tutaj|tam|wszedzie|folder\w*|director(?:y|ies)|dirs?|katalog\w*|podkatalog\w*|files?|plik\w*|archive|archiwum|environments?|srodowisk\w*)$/i;
src/pipeline.js:212:const PATH_EXT = /\.[A-Za-z][A-Za-z0-9]{0,4}$/;
src/pipeline.js:218:const REQUEST_WORD = /^(?:is|are|was|were|be|been|being|am|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|don't|doesn't|didn't|won't|can't|does|do|did|has|have|had|will|would|can|could|should|must|may|might|contain|contains|reference|references|use|uses|used|take|takes|taking|eat|eats|eating|weigh|weighs|occupy|occupies|hold|holds|need|needs|get|gets|got|look|looks|appear|appears|exist|exists|mention|mentions|say|says|shows|lists|total|altogether|overall|combined|together|right|correct|ok|okay|thanks|thank|you|jest|sa|byl|byla|bylo|byly|bedzie|beda|ma|maja|mial|miala|mialy|zawiera|zawieraja|zajmuje|zajmuja|wazy|waza|razem|lacznie|wedlug|wg|ile|czy|sie|odwoluje|odwoluja|uzywa|uzywaja|uzywan\w*|edytowan\w*|zmienian\w*|dzieki|dziekuje|executable|runnable|readable|writable|writeable|inplace|in-place|point|points|one|level|levels|deep|human|wykonywaln\w*|uruchamialn\w*|uzytkownikowi|uzytkownika|wlasciciel\w*|kompresj\w*)$/i;
src/pipeline.js:226:export function pathTail(text, v, spans = [], { used = [], strict = true } = {}) {
src/pipeline.js:276:const TWO_PATH_INTENTS = new Set(['copy', 'move_rename']);
src/pipeline.js:277:const DST_FILLER = /^(?:the|a|an|my|our|folder\w*|director(?:y|ies)|dir|katalog\w*|location|place|file|plik\w*|moj\w*)$/i;
src/pipeline.js:278:function splitTwoPaths(query, slots) {
src/pipeline.js:314:const NOUN_VALUE = {
src/pipeline.js:320:const NOUN_SKIP = /^(?:the|a|an|named|called|o|nazwie|nazwan\w*|id)$/i;
src/pipeline.js:321:const NOUN_VERB = /^(?:stop|start|restart|run|show|list|ls|ps|logs?|remove|rm|kill|exec|status|enable|disable|reload|install|inspect|zatrzymaj|uruchom|zrestartuj|restartuj|usu[nń]|zabij|poka[zż]|wy[sś]wietl|zainstaluj|w[lł][aą]cz|wy[lł][aą]cz|logi)$/i;
src/pipeline.js:322:function nounOperand(k, v, query) {
src/pipeline.js:335:function trailingPunctAfter(text, v) {
src/pipeline.js:346:function cutAtEscapedQuote(text, v) {
src/pipeline.js:354:const TEXT_SLOT_NAMES = ['pattern', 'message', 'text', 'name', 'old', 'new', 'service', 'container', 'pkg', 'cmd', 'branch', 'user'];
src/pipeline.js:358:function flagTokens(cmd) {
src/pipeline.js:369:function composeInput(text, model, tool, unclear = [], grown = {}) {
src/pipeline.js:395:const WRITING_TOOLS = new Set(['chmod', 'tar']);
src/pipeline.js:407:export function suggest(query, opts = {}) {
src/pipeline.js:414:const REPLAY = 'resolved from history (a replay of an earlier command, not a fresh catalog render); needs an explicit yes';
src/pipeline.js:415:function replayFloor(s) {
src/pipeline.js:417:  return { ...s, risk: maxRisk(s.risk, 'high'), warnings: [REPLAY, ...(s.warnings || [])] };
src/pipeline.js:420:function suggestOnce(query, opts = {}) {
src/pipeline.js:538:      command: r.command, risk: r.risk, baseRisk: 'medium', warnings: r.warnings, critical: r.critical, missing: [], slots: {}, notes: null,
src/pipeline.js:843:          command: comp.command, risk: comp.risk, baseRisk: 'medium', warnings: comp.warnings, critical: comp.critical, missing: [],
src/fill.js:7:export { shQuote };
src/fill.js:10:export const RAW_OK = {
src/fill.js:50:const PR_SELECTOR = /\b(?:pull[\s-]+requests?|pr|prs)\s+((?:(?:for|of|on|from|branch|number|no\.?|nr\.?|(?:the|a|my|our)(?=\s+branch\b))\s+)*)(?:(?:"([^"]*)"|'([^']*)'|`([^`]*)`|[„“”]([^„“”"]*)[“”])(?=[\s.,!?;:]|$)|(#?[^\s"'`„“”]+?)[.,!?]?(?=\s|$)|(["'`„“”]))/i;
src/fill.js:55:const PR_NOT_SELECTOR = /^(?:the|a|an|this|that|it|its|my|our|your|their|me|us|you|him|her|them|and|or|then|now|please|pls|into|to|with|without|in|at|by|is|was|which|again|request|requests|status|state|checks?|details?|info|summary|description|diff|changes|comments?|github|gh|web|browser|online|here|there|today|yesterday|tomorrow|earlier|later|review|fork|upstream|fast|asap|already|first|too|also|quickly|immediately|directly|safely|manually|automatically|finally|only|just|really|simply|properly|carefully|right|soon|instantly|issues?|tickets?|bugs?)$/i;
src/fill.js:58:const PR_MARKED = /[\d/_.#-]/;
src/fill.js:60:const PR_ABBREV = /^(?:e\.g|i\.e|w\/o|w\/|etc|vs|cf|a\.k\.a|n\/a|b\/c)$/i;
src/fill.js:61:const PR_HOST = /^(?:[\w-]+\.)+(?:com|org|net|io|dev|app|co|me)$/i;
src/fill.js:63:const PR_NUMBER_LEAD = /^(?:(?:number|no\.?|nr\.?)\s+)*$/i;
src/fill.js:64:const PR_WORD = /\b(?:pull[\s-]+requests?|pr|prs)\b/i;
src/fill.js:66:const PR_ISSUE = /^(?:issues?|tickets?|bugs?)$/i;
src/fill.js:68:const PR_UNIT_AFTER = /^\s+(?:secs?|seconds?|mins?|minutes?|hours?|hrs?|days?|weeks?|months?|years?|times?|ago|old|more|approvals?|reviews?|reviewers?|commits?|files?|lines?|changes?|comments?|checks?)\b/i;
src/fill.js:71:const PR_HASH_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit)\s+)+$/i;
src/fill.js:74:const PR_QUALIFIED = /^\s*(?:in\s+question\b|(?:by|from|since|before|after|about|titled|named|called|that|which|who|whose|where|od|autorstwa)\b|(?:\S+\s+)?(?:opened|created|authored|submitted|raised|written|made|sent|pushed|filed)\b)|\b(?:yesterday|today|tonight|tomorrow|ago|last\s+(?:week|month|year|night|friday|monday|tuesday|wednesday|thursday|saturday|sunday)|wczoraj\w*|dzisiaj|dzi[sś])\b/i;
src/fill.js:77:const PR_DESCRIBED = /^\s*(?:with|having|z|o)\s+(?:the\s+|a\s+)?(?:labels?|title|titled|name|tags?|authors?|assignees?|milestone|description|text|keywords?|words?|subject|commits?|etykiet\w*|tytu\w*|nazw\w*|autor\w*)\b|^\s*(?:labell?ed|tagged|assigned|mentioning|containing|regarding|concerning|touching|fixing|adding|removing|updating|changing)\b/i;
src/fill.js:80:const PR_WHEN = /^(?:last|this|next|past|previous|previously|before|earlier|ages|recently|lately|week|month|year|morning|afternoon|evening|night|weekend|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun|january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec|ago|wczoraj\w*|dzisiaj|przedwczoraj|zesz\w*|poprzedni\w*|wcze\w*)$/i;
src/fill.js:84:const PR_DET_WORD = /(?:^|\s)(?:the|a|an|my|our|your|his|her|their|this|that|these|those|its|ten|tego|ta|tamten|to)\s+((?:\S+\s+){1,3})$/i;
src/fill.js:85:const PR_DET_NEUTRAL = /^(?:current|branch|branch's|branch’s|own|one|same|previous|last|prior|single|github|gh|pull|this|that|the|my|our|bieżący\w*|biezacy\w*|obecn\w*|aktualn\w*|mój|moj\w*|nasz\w*|sw[oó]j|swoj\w*|ten|tego)$/i;
src/fill.js:86:const PR_ANAPHOR = /(?:^|\s)(?:said|above|aforementioned|abovementioned|above-mentioned|mentioned|referenced|aforesaid|forementioned|wspomnian\w*|powy[zż]sz\w*|ww\.?)\s+(?:\S+\s+)?$/i;
src/fill.js:89:const PR_VERB = /^(?:merge|squash|rebase|land|ship|accept|view|show|open|display|see|check|checkout|diff|review|approve|close|reopen|edit|ready|comment|list|get|fetch|print|describe|zmerguj\w*|scal\w*|poka[zż]\w*|zobacz\w*|otw[oó]rz\w*|zamknij\w*|sprawd[zź]\w*|wy[sś]wietl\w*|zatwierd[zź]\w*|zaakceptuj\w*|przejrzyj\w*)$/i;
src/fill.js:90:const PR_FILLER = /^(?:please|pls|now|then|just|and|also|out|up|go|ahead|to|it|tamten|that|this|ten|tego|gh|github|pull|i|you|can|could|would|will|let's|lets|me|us|want|need|prosz[eę]|teraz|i|oraz|a)$/i;
src/fill.js:92:const PR_STATE = /^(?:open|ready|review|close)$/i;
src/fill.js:93:function prWordBefore(before) {
src/fill.js:103:const PR_AFTER_PICK = /^\s*(?::\s*|[-–—]\s+|\s(?:for|of|with|in|on|from|about|regarding|re|dla|z|w|od)\s+)(?:(?:the|a|an|my|our|your|his|her|their|its|this|that)\s+)*([^\s.,!?;:]*)/i;
src/fill.js:104:const PR_AFTER_NEUTRAL = /^(?:$|-\S*|github|gh|web|browser|online|cli|terminal|here|this|current|same|local|repo|repository|squash|squashing|rebase|rebasing|merge|merging|auto|automerge|auto-merge|admin|review|me|us|it|now|please|pls|main|master|default|teraz|prosz[eę]|githubie|przegl[aą]darce)$/i;
src/fill.js:110:const PR_URL_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|and|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit|the|this|that|a|pull|requests?|pr|prs|at|is|me|you|can|could|would|i|want|to|url|link|[(]|zmerguj\w*|scal\w*|poka[zż]\w*|zobacz\w*|otw[oó]rz\w*|zamknij\w*|sprawd[zź]\w*)[\s:,]+)*[(<]?$/i;
src/fill.js:112:const PR_DEM_NUMBER = /\b(?:ten|(?:that|this|which|the)\s+one)\s+(?:\S+\s+)?(?:prs?|pull[\s-]+requests?)\b/gi;
src/fill.js:114:const PR_BRANCH_NAMED = /\b(?:for|of|on|from)\s+(?:\S+\s+){0,2}branch\b/i;
src/fill.js:116:const PR_DELETE_BRANCH = /\b(?:and\s+)?(?:delete|remove|usun)\s+(?:the\s+|its\s+|that\s+|tego\s+|ten\s+|t[ea]\s+)?(?:(?:local\s+and\s+remote|remote|head|feature)\s+)?(?:branch|branche?a?|galaz|galez)\b(?:\s+(?:after(?:wards)?|too|as\s+well|potem|tez))?/g;
src/fill.js:117:const PR_DELETE_NEGATED = /(?:\b(?:not|no|never|without|nor|nie|bez)|n't|\bdont)\s+(?:\S+\s+){0,1}$/;
src/fill.js:121:const WR_DRY = /\bdry[\s-]*run\b|\bna\s+sucho\b|\bwithout\s+(?:actually\s+)?(?:deploying|publishing|uploading)\b|\b(?:don'?t|do\s+not)\s+actually\s+(?:deploy|publish|upload)\b|\bbez\s+(?:faktycznego\s+)?(?:wdra[zż]ania|publikowania|deployu?)\b/i;
src/fill.js:122:const WR_DRY_NOT = /\b(?:not|no|without|skip|skipping|nie|bez)\s+(?:a\s+|the\s+|any\s+)?dry[\s-]*run\b|\b(?:don'?t|do\s+not)\s+(?:do\s+)?(?:a\s+|the\s+)?dry[\s-]*run\b/gi;
src/fill.js:129:const WR_Q = `(?:"[^"]*"|'[^']*'|\`[^\`]*\`|[„“”][^„“”"]*[“”]|\\S+)`;
src/fill.js:130:const WR_ENV_OPT = new RegExp(`(?:^|\\s)(?:--env|-e|env)(?:=|(?<!\\benv)\\s+)(${WR_Q})`, 'i');
src/fill.js:131:const WR_ENV_AFTER = new RegExp(`\\b(?:env|environment|środowisk\\w*|srodowisk\\w*)\\s+(called\\s+|named\\s+|o\\s+nazwie\\s+)?(${WR_Q})`, 'gi');
src/fill.js:132:const WR_ENV_BEFORE = /(?:^|\s)(\S+)\s+(?:env|environment)\b/gi;
src/fill.js:133:const WR_ENV_PREP = new RegExp(`\\b(to|on|in|into|for|na|do|w|dla)\\s+(?:the\\s+|my\\s+|our\\s+)?(${WR_Q})(\\s+\\S+)?`, 'gi');
src/fill.js:134:const WR_ENV_KNOWN = /^(?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)$/i;
src/fill.js:137:const WR_ENV_STRONG = /^(?:production|prod|staging|stage|qa|uat|canary|preview|sandbox)$/i;
src/fill.js:139:const WR_ENV_END = /^\s+(?:and|then|now|please|pls|too|also|again|today|asap|with|using|via|without|from|but|so|env|environment)$/i;
src/fill.js:140:const WR_ENV_ANY = /\b(?:env|environment|środowisk\w*|srodowisk\w*|produkcj\w*|staging\w*|production|prod|stage|qa|uat|canary|sandbox)\b/i;
src/fill.js:143:const WR_ENV_STEM = /^(?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)(?=[\d_-])|[\d_-](?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)$/i;
src/fill.js:153:function wranglerEnv(t) {
src/fill.js:189:const SEL_WORDS = (s) => {
src/fill.js:194:const SEL_COMMON = SEL_WORDS(`
src/fill.js:211:const SEL_FAMILY = {
src/fill.js:218:const SEL_INTENT = {
src/fill.js:257:const SEL_PICKERS = new Set(('latest last recent recently newest new old older oldest first second third next previous prior other another ' +
src/fill.js:269:const SEL_SLOT = { gh_pr_merge: 'pr', gh_pr_view: 'pr', gh_pr_checks: 'pr', gh_run_view: 'num' };
src/fill.js:270:export const hasSelectorRule = (intentId) => /^(?:gh|wrangler)_/.test(intentId);
src/fill.js:272:const SEL_OTHER_NUMBER = /\b(?:issues?|tickets?|bugs?|zgloszeni\w*|fix(?:es)?|closes|resolves|naprawia\w*|zamyka\w*)\s+#?\d+\b/g;
src/fill.js:273:const SEL_ENV_PREP = /^(?:to|on|in|into|for|na|do|w|dla|env|environment|srodowisk\w*|called|named|nazwie)$/;
src/fill.js:274:const SEL_NEGATION = /^(?:not|never|don't|dont|nor|except|excluding|without|instead|rather|nie|bez|oprocz|poza|zamiast)$/;
src/fill.js:275:const SEL_DET = /^(?:the|a|an|my|our|this|that)$/;
src/fill.js:280:export function selectorResidue(intentId, text, values = {}) {
src/fill.js:317:const SEL_EXPLICIT = { pr: (v) => /^\d+$|^https?:\/\//.test(v), num: (v) => /^\d+$/.test(v), wenv: (v) => RAW_OK.wenv(v) };
src/fill.js:326:export function selectorWithhold(intentId, text, values = {}) {
src/fill.js:351:const NPM_NOT_PKG = new Set(('dependencies dependency dependecies dependancies deps dep zaleznosci zaleznosc project projekt projektu ' +
src/fill.js:355:const NPM_INSTALL_VERB = /^(?:install|instal|add|i|zainstaluj|instaluj|doinstaluj|dodaj|pobierz|get|reinstall)$/;
src/fill.js:357:const NPM_CI = /(?:^|\s)npm\s+ci(?=\s|$)|\bclean[\s-]+install\w*|\bczyst\w*\s+instalacj\w*/i;
src/fill.js:363:function npmInstallTarget(text, v) {
src/fill.js:384:function prSelector(ex) {
src/fill.js:437:const PR_REPO_OPT = /(?:^|\s)(?:--repo(?:=|\s+|$)|-R(?:=|\s*))(\S*)/;
src/fill.js:438:const PR_REPO = /\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(?:github\s+)?(?:repo|repository|repozytorium|project)\s+(\S+)|\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(\S+(?:\s+\S+)?)\s+(?:github\s+)?(?:repo|repository)\b|\b(?:w|z)\s+(?:repozytorium|projek\w*)\s+(\S+)/i;
src/fill.js:440:const PR_REPO_HERE = /^(?:the|a|an|this|current|same|our|my|local|own|tym|tego|bieżącym|biezacym)(?:\s+(?:current|same|local|own))?$/i;
src/fill.js:442:const PR_REPO_HASH = /(?:^|\s)((?:https:\/\/)?(?:[\w-]+(?:\.[\w-]+)+\/)?[\w.-]+\/[\w.-]+)#(\d{1,12})(?=[\s.,!?;:]|$)/;
src/fill.js:445:const PR_REPO_PREP = /(?:^|\s)(in|of|on|from|for|at|to)\s+(?:the\s+)?(?:github\s+)?(\S+)/gi;
src/fill.js:446:const PR_SELECTOR_SPOT = /\b(?:pull[\s-]+requests?|pr|prs)\s+(?:(?:for|of|on|from|branch|number|no\.?|nr\.?|(?:the|a|my|our)(?=\s+branch\b))\s+)*$/i;
src/fill.js:451:const PR_URL_REPO = /(?:https?:\/\/)?github\.com\/([\w.-]+\/[\w.-]+)\/pull\/\d+/gi;
src/fill.js:453:function repoMentions(text) {
src/fill.js:463:function prRepo(text) {
src/fill.js:487:const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
src/fill.js:488:const PLACEHOLDER = (name) => `<${name.toUpperCase()}>`;
src/fill.js:496:export function finalizeSlots(intent, v) {
src/fill.js:506:const TUNNEL_WORD = /^(?:ssh|tunnel|tunel\w*|tunnels|port\w*|forward\w*|przekier\w*|local|remote|lokaln\w*|zdaln\w*|server|serwer\w*|host|localhost)$/i;
src/fill.js:507:const PORT_N = String.raw`(\d{1,5})(?![\w.:])`;
src/fill.js:508:function tunnelEnds(text, v) {
src/fill.js:557:export function resolveSlots(intent, ex) {
src/fill.js:736:const SCOPE_FAMILIES = /^(?:npm_|pip_install$|gh_|wrangler_)/;
src/fill.js:737:const SCOPE_KIND = {
src/fill.js:743:const SCOPE_SHORT = { '-w': /^npm_/, '-r': /^gh_/, '-e': /^wrangler_/, '-c': /^wrangler_/, '-t': /^pip_/ };
src/fill.js:745:const SCOPE_OPT = /(?:^|\s)(--workspaces?|--ws|--filter|--repo|--env|--config|--prefix|--cwd|--dir|--project|--target|-[wRect])(?:=(?:"([^"]*)"|'([^']*)'|(\S*))|\s+(?:"([^"]*)"|'([^']*)'|(?!-)([^\s,;!?]+))|(?=[\s,;!?]|$))/g;
src/fill.js:747:const SCOPE_PHRASE = /(?:^|\s)(?:in|for|of|on|from|within|inside|under|at|w|we|dla|z)\s+(?:the\s+|a\s+)?(workspace|project|projek\w*|repo|repository|repozytori\w*|env|environment|srodowisk\w*|config|configuration|konfiguracj\w*)\s+(?!-)([^\s,;!?]+)/g;
src/fill.js:748:const SCOPE_PHRASE_KIND = (w) => /^(?:workspace)$/.test(w) ? 'workspace' : /^(?:repo|repository|repozytori)/.test(w) ? 'repo'
src/fill.js:750:const SCOPE_NOT_VALUE = /^(?:the|a|an|this|that|current|same|my|our|own|local|default|root|here|it|tym|tego|bieżącym|biezacym|obecnym|moim|naszym)$/i;
src/fill.js:752:export function scopeMentions(intentId, text) {
src/fill.js:772:function scopeSlots(intentId, text, v, has) {
src/fill.js:810:const CONTESTED = (id) => (hasSelectorRule(id) ? ['pr', 'num', 'wenv', 'repo', 'var'] : /^(?:npm_install|npm_install_global|pip_install)$/.test(id) ? ['pkg'] : id === 'npm_run_script' ? ['script'] : []);
src/fill.js:812:const SEL_ALT = /^(?:or|either|vs|versus|instead|rather|albo|lub|zamiast|ewentualnie|badz)$/;
src/fill.js:813:const SEL_NEG = /^(?:not|never|nor|don't|dont|except|excluding|exclude|without|nie|oprocz|poza|bez|wykluczajac)$|n't$/;
src/fill.js:815:const SEL_NEG_STATE = /^(?:tak|dziala\w*|przeszl\w*|przeszedl|przechodz\w*|poszlo|wyszlo|work\w*|pass\w*|ok|okay|right|sure|good|green|zielon\w*)$/;
src/fill.js:817:const SEL_CLAUSE_END = /^(?:and|then|i|oraz|potem|so)$/;
src/fill.js:819:const SEL_NUM_OTHER_BEFORE = /^(?:issues?|tickets?|bugs?|zgloszeni\w*|fix(?:es)?|closes|resolves|line|lines|linii|top|last|first)$/;
src/fill.js:820:const SEL_NUM_UNIT_AFTER = /^(?:secs?|seconds?|mins?|minutes?|minut\w*|hours?|hrs?|godzin\w*|days?|dni|dzien|weeks?|tygodn\w*|months?|miesi\w*|years?|lat\w*|times?|razy|ago|temu|old|more|approvals?|reviews?|reviewers?|commits?|files?|lines?|changes?|comments?|checks?)$/;
src/fill.js:821:const SEL_ENV_ALIAS = (w) => (/^(?:prod|production|produkc\w*)$/.test(w) ? 'prod' : /^(?:staging|stage|stagingu|stagingowe\w*)$/.test(w) ? 'staging' : w);
src/fill.js:824:export function contestedSlots(intentId, text, values = {}) {
src/fill.js:871:function renderValue(name, raw, values, quote) {
src/fill.js:879:const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|rport|rhost|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;
src/fill.js:885:export function render(template, values, required = [], quote = shQuote, keepOptional = []) {
src/fill.js:915:const DERIVED_REQUIRED = { namepat: 'name', glob: 'ext', sedexpr: 'old' };
src/fill.js:917:const SIZE_MULT = { c: 1, k: 1024, M: 1024 ** 2, G: 1024 ** 3 };
src/fill.js:919:export function deriveSlots(v) {
src/fill.js:935:export const envFromPlatform = (platform = process.platform) => ({
src/fill.js:947:export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [], keepOptional = [] } = {}) {
src/fill.js:973:    return { ...base, command: null, gap: choice.gap, risk: intent.risk, warnings: [], critical: false, missing: [] };
src/fill.js:1011:    return { ...base, command: null, gap: err.message, risk: intent.risk, warnings: [], critical: false, missing: [] };
src/fill.js:1028:    risk: maxRisk(intent.risk, danger.risk),
// Regression tests for the v0.3 final4 review (review/final4-claude.md, review/final4-codex.md):
//  (1) a negation or exclusion ("except", "but not", "oprócz", "bez", "not 1234", "don't delete") is never ignored: the
//      command expresses it, a placeholder stands for it, or the request is refused (src/guards.js)
//  (2) removing a package (uninstall / remove / odinstaluj) never becomes the install command
//  (3) an operand is never the tool or noun word ("stop docker container web" -> `docker stop web`)
//  (4) move / copy: source and destination are read on each side of "to" / "do" / "na"; an unclear side is a placeholder
//  (5) history "same for <spaced path>" keeps the whole path
//  (6) a quoted --workspace value is one value; pip --target is kept; ssh -L keeps the remote host and port
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'fish', os: 'linux', coreutils: 'gnu' },
  { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, { shell: 'cmd', os: 'win32', coreutils: 'gnu' }];
const run = (q, env = BASH, history) => suggest(q, { env, history });
const refused = (r, q) => {
  assert.equal(r.command ?? null, null, `${q}: ${r.command}`);
  assert.equal(r.understood, false, q);
};

// ---------- (1) negation / exclusion ----------
test('final4-claude major 2: an excluded process is never killed (or killed alone)', () => {
  for (const env of SHELLS) {
    for (const q of ['kill python except pid 1234', 'kill all python processes except pid 1234', 'kill all python processes except 1234',
      'kill every python process but not 1234', 'zabij wszystkie procesy python oprócz 1234', 'kill python not 1234',
      'kill all node processes except 4242', "kill python, but don't kill 1234", 'kill 1234 and not 5678']) {
      refused(run(q, env), `${env.shell}: ${q}`);
    }
  }
  // the excluded value is left alone and nothing else is acted on: kept
  assert.equal(run('kill process 1234 not 5678').command, 'kill 1234');
  assert.equal(run('delete a.txt not b.txt').command, 'rm a.txt');
});

test('an exclusion a changing command cannot express is refused; a prohibition of the request too', () => {
  for (const q of ['delete all log files except today', 'rm everything but notes.txt', 'delete all files except notes.txt',
    'delete all files other than notes.txt', 'usuń pliki *.log z wyjątkiem app.log', 'remove all .log files without app.log',
    'delete branches except main', 'stop all services except ssh', 'stop all containers except db', 'remove all docker images except nginx',
    'delete everything in /tmp/x except a.txt', 'compress /srv/app excluding node_modules', 'delete log files older than 7 days but not in /var/log/keep',
    "don't delete a.txt", 'do not kill 1234', 'never remove /tmp/x', 'nie usuwaj a.txt', 'nie restartuj nginx', "stop nginx, don't restart it"]) {
    refused(run(q), q);
  }
  // a read-only command that would show what the request excludes
  refused(run('list files except .txt'), 'list files except .txt');
  // a negation that describes a manner, a state or a part of the request the command leaves out is not an exclusion
  const kept = {
    'delete /tmp/x without asking': 'rm /tmp/x',
    'usuń /tmp/x bez pytania': 'rm /tmp/x',
    'find files not modified in 30 days': 'find . -type f -mtime +30',
    'czy ktoś poza mną jest teraz zalogowany': 'who',
    'what did i change but not stage yet': 'git diff',
    "merge pr 42 and don't delete the branch": 'gh pr merge 42',
    'install nginx without recommends': 'sudo apt install nginx',
  };
  for (const [q, cmd] of Object.entries(kept)) assert.equal(run(q).command, cmd, q);
  // a placeholder already stands for the excluded part (close3 selectors): kept
  assert.equal(run('merge pr 42 but not in repo acme/app').command, 'gh pr merge 42 --repo <REPO>');
  assert.equal(run("don't deploy worker to prod").command, 'npx wrangler deploy --env <WENV>');
});

test('a negation word is never the operand ("kill the process that is not responding" is not `pkill -f not`)', () => {
  const r = run('kill the process that is not responding');
  assert.ok(!/(?:^|\s)'?not'?(?:\s|$)/.test(String(r.command)), r.command);
});

// ---------- (2) uninstall is never install ----------
test('final4-claude major 3: removing a package is never the install command (contrastive)', () => {
  for (const env of SHELLS) {
    for (const q of ['uninstall nginx', 'uninstall package nginx', 'remove package nginx', 'odinstaluj nginx', 'usuń pakiet nginx',
      'apt remove nginx', 'brew uninstall wget', 'pip uninstall requests', 'uninstall requests with pip', 'npm uninstall lodash', 'npm rm lodash']) {
      const r = run(q, env);
      assert.ok(!/(?:^|\s)(?:install|i|add)(?:\s|$)/.test(String(r.command)) || /uninstall|remove|purge/.test(String(r.command)), `${env.shell}: ${q}: ${r.command}`);
    }
  }
  // the same requests without the removal word still install
  const install = {
    'install nginx': 'sudo apt install nginx',
    'install package nginx': 'sudo apt install nginx',
    'zainstaluj nginx': 'sudo apt install nginx',
    'pip install requests': 'python3 -m pip install requests',
    'install requests with pip': 'python3 -m pip install requests',
    'npm install': 'npm install',
  };
  for (const [q, cmd] of Object.entries(install)) assert.equal(run(q).command, cmd, q);
  // an injected `;rm` inside a package name is not a removal request (it is withheld as before)
  assert.equal(run('install requests==2.32.0;rm with pip').command, 'python3 -m pip install <PKG>');
});

// ---------- (3) the noun is never the operand ----------
test('final4-claude major 3: "stop docker container web" is `docker stop web`', () => {
  const cases = {
    'stop docker container web': 'docker stop web',
    'docker stop container web': 'docker stop web',
    'stop docker web': 'docker stop web',
    'zatrzymaj kontener docker web': 'docker stop web',
    'show logs of docker container web': 'docker logs --tail 100 -f web',
    'docker logs nginx': 'docker logs --tail 100 -f nginx',
    'docker exec -it api-server sh': 'docker exec -it api-server sh',
    'stop container web': 'docker stop web',
    // no name at all: placeholder, never `docker stop docker`
    'stop the docker container': 'docker stop <CONTAINER>',
    'docker stop': 'docker stop <CONTAINER>',
    'put eslint in the global npm packages': 'npm install -g eslint',
    'instal pytest via pip': 'python3 -m pip install pytest',
  };
  for (const [q, cmd] of Object.entries(cases)) assert.equal(run(q).command, cmd, q);
});

// ---------- (4) move / copy ----------
test('final4-claude major 1: move / copy / rename keep the stated destination; an unclear source is a placeholder', () => {
  const cases = {
    'rename /tmp/my file.txt to /tmp/new.txt': 'mv -i <SRC> /tmp/new.txt',
    'move /tmp/my file.txt to /tmp/dir': 'mv -i <SRC> /tmp/dir',
    'copy /tmp/my file.txt to /tmp/dir': 'cp -ri <SRC> /tmp/dir',
    'przenieś /tmp/my file.txt do /tmp/dir': 'mv -i <SRC> /tmp/dir',
    'move report.txt notes.txt to /tmp/dir': 'mv -i <SRC> /tmp/dir',
    'rename my notes.txt to notes.txt': 'mv -i <SRC> notes.txt',
    // clear sides
    "move '/tmp/my file.txt' to /tmp/dir": "mv -i '/tmp/my file.txt' /tmp/dir",
    "copy '/tmp/my file.txt' to '/tmp/new dir'": "cp -ri '/tmp/my file.txt' '/tmp/new dir'",
    'move /tmp/old notes to /tmp/archive': "mv -i '/tmp/old notes' /tmp/archive",
    'copy a.txt to ~/My Docs': "cp -ri a.txt ~/'My Docs'",
    'rename the folder build to build_old': 'mv -i build build_old',
    'change the name of index.htm to index.html': 'mv -i index.htm index.html',
    'zmień nazwę a.txt na b.txt': 'mv -i a.txt b.txt',
    'skopiuj plik env.example do .env.local': 'cp -ri env.example .env.local',
    'mv draft.md into the archive folder': 'mv -i draft.md archive',
    'move it to /tmp/old': 'mv -i <SRC> /tmp/old',
  };
  for (const [q, cmd] of Object.entries(cases)) assert.equal(run(q).command, cmd, q);
  const r = run('rename /tmp/my file.txt to /tmp/new.txt');
  assert.deepEqual(r.missing, ['src']);
  assert.ok(r.warnings.some((w) => /unclear which words name the source/.test(w)), r.warnings.join('; '));
});

// ---------- (5) history ----------
test('final4-codex major: "same for <spaced path>" keeps the whole path', () => {
  const h = ['rm -r /tmp/old'];
  assert.equal(run('same for ~/Old Projects', BASH, h).command, "rm -r ~/'Old Projects'");
  assert.equal(run("same for ~/'Old Projects'", BASH, h).command, "rm -r ~/'Old Projects'");
  assert.equal(run('same for ~/Old Projects please', BASH, h).command, "rm -r ~/'Old Projects'");
  assert.equal(run('same for /tmp/new', BASH, h).command, 'rm -r /tmp/new');
  const amb = run('same for /tmp/a.txt b.txt', BASH, h);
  assert.equal(amb.command, 'rm -r <PATH>');
  assert.deepEqual(amb.missing, ['path']);
  assert.equal(run('same for /srv/my app', BASH, ['du -sh /var/log']).command, "du -sh '/srv/my app'");
});

// ---------- (6) scope values, pip target, ssh tunnel ----------
test('final4-codex major: a quoted --workspace value is one value', () => {
  assert.equal(run('run npm deploy --workspace "staging app"').command, "npm run deploy --workspace 'staging app'");
  assert.equal(run('run npm deploy --workspace="staging app"').command, "npm run deploy --workspace 'staging app'");
  assert.equal(run('run npm deploy --workspace staging').command, 'npm run deploy --workspace staging');
  assert.equal(run('npm install lodash -w packages/api').command, 'npm install lodash --workspace packages/api');
});

test('final4-codex major: pip --target is kept', () => {
  assert.equal(run('install requests with pip --target /tmp/packages').command, 'python3 -m pip install requests --target /tmp/packages');
  assert.equal(run('pip install requests -t /tmp/pkgs').command, 'python3 -m pip install requests --target /tmp/pkgs');
  assert.equal(run('pip install requests --target="/tmp/my pkgs"').command, "python3 -m pip install requests --target '/tmp/my pkgs'");
  const r = run('install requests with pip --target /tmp/packages');
  assert.equal(r.risk, 'medium');
  assert.deepEqual(r.missing, []);
});

test('final4-codex major: ssh -L keeps the remote host and port', () => {
  const cases = {
    'forward local port 8080 to remote port 5432 on db.example.com over ssh': 'ssh -N -L 8080:localhost:5432 db.example.com',
    'przekieruj lokalny port 8080 na zdalny port 5432 na serwerze db.example.com': 'ssh -N -L 8080:localhost:5432 db.example.com',
    'forward local 8080 to db.internal:5432 via bastion.example.com': 'ssh -N -L 8080:db.internal:5432 bastion.example.com',
    'ssh tunnel -L 8080:db.internal:5432 bastion': 'ssh -N -L 8080:db.internal:5432 bastion',
    'forward 8080 to 5432 on db.example.com over ssh': 'ssh -N -L 8080:localhost:5432 db.example.com',
    'ssh tunnel local port 9000 remote port 80 on web1': 'ssh -N -L 9000:localhost:80 web1',
    // the same port on both ends when only one is named
    'forward port 5432 from db.example.com': 'ssh -N -L 5432:localhost:5432 db.example.com',
    'forward port 8080 to db.example.com over ssh': 'ssh -N -L 8080:localhost:8080 db.example.com',
    // two bare ports, neither said to be local or remote: the remote one is withheld
    'ssh tunnel ports 8080 5432 on db.example.com': 'ssh -N -L 8080:localhost:<RPORT> db.example.com',
  };
  for (const [q, cmd] of Object.entries(cases)) assert.equal(run(q).command, cmd, q);
});

codex
The code requires an exact catalog render with plain slot values before it can mark a command safe. I’m checking that boundary and whether argument extraction preserves explicitly named targets.
exec
/bin/bash -lc "sed -n '870,1045p' src/fill.js; sed -n '420,580p' src/pipeline.js" in /workspace/tellsh
 succeeded in 0ms:

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
function suggestOnce(query, opts = {}) {
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
    // `same for ~/Old Projects`, `same for ~/'Old Projects'`: the whole new name, or a placeholder when where it ends is
    // unclear (`same for /tmp/a.txt b.txt`; the words after "same for" are the target, so a read-only command reads them
    // strictly too); never its first word (`rm -r ~/Old`) or the part before a quote (`rm -r ~/`)
    let cutHistory = null;
    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null) {
      const v = String(slots[ref.changed]);
      const a = String(ref.arg ?? '').trim();
      const q = a.match(/^([^\s"']*)(["'])([^"']+)\2([^\s"']*)$/);
      const whole = /["']/.test(a) ? (q ? q[1] + q[3] + q[4] : null)
        : (() => { const t = pathTail(query, v, [], { strict: true }); return t ? t.value ?? null : v; })();
      if (whole != null && validSlot(ref.changed, whole)) slots[ref.changed] = whole;
      else { cutHistory = `${ref.changed}=${a}`; blank.push(ref.changed); delete slots[ref.changed]; }
    }
    // the new path ends in sentence punctuation (`same for /tmp/data!`): placeholder, as for any request
    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null && BY_ID[ref.intent].risk !== 'safe' && trailingPunctAfter(query, slots[ref.changed])) {
      blank.push(ref.changed);
      delete slots[ref.changed];
    }
    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank, keepOptional: blank });
    const res = { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
    const punct = blank.filter((k) => !invalidHistorySlots(ref.slots).includes(k) && !(cutHistory && k === ref.changed));
    if (cutHistory) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear where the new name ends (${cutHistory}); quote the path`];
    if (punct.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${punct.join(', ')}); quote the path`];
    if (punct.length + (cutHistory ? 1 : 0) < blank.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: it is not a valid value (${blank.filter((k) => !punct.includes(k) && !(cutHistory && k === ref.changed)).join(', ')})`];
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
  // "merge https://github.com/o/r/pull/3": a merge of a pull request URL is never `git clone` of it
  if (intent === 'git_clone' && !sb && !ref && PR_URL.test(query) && mergeAsked(query)) intent = 'gh_pr_merge';
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
    return { ...out, understood: false, method: 'none', hint: 'approving, reopening, marking ready or opening an existing pull request is not supported (gh pr review --approve <PR>, gh pr reopen <PR>, gh pr ready <PR>, gh pr view --web <PR>); not suggesting gh pr create' };
  }
  if (intent?.startsWith('gh_pr_') && ((closes && !merges) || (intent === 'gh_pr_merge' && !merges && [...query.matchAll(MERGE_WORD)].length))) {
    const hint = closes ? 'closing a pull request is not supported (gh pr close <PR>)' : 'the request does not ask for a merge (it negates or undoes one); not suggesting gh pr merge';
    return { ...out, understood: false, method: 'none', hint };
  }

  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode, tagger: opts.tagger });
  const slots = r.slots;
  // "stop docker container web": the operand is never the tool or noun word (`docker stop docker`)
  const nounBlank = [];
  for (const k of Object.keys(NOUN_VALUE)) {
    if (slots[k] == null || !NOUN_VALUE[k].test(String(slots[k]))) continue;
    const c = nounOperand(k, String(slots[k]), query);
    if (c != null) slots[k] = c; else { delete slots[k]; delete r.sources[k]; nounBlank.push(k); }

exec
/bin/bash -lc "sed -n '580,870p' src/pipeline.js; sed -n '1,55p' src/fill.js; rg -n \"risk: 'safe'\" src/catalog.js" in /workspace/tellsh
 exited 1 in 0ms:
    if (c != null) slots[k] = c; else { delete slots[k]; delete r.sources[k]; nounBlank.push(k); }
  }
  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
  const ambiguousPaths = [];
  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
  const blank = new Set([...(r.withheld || []), ...nounBlank]);
  // withheld operands whose optional part keeps its placeholder: an invalid operand, a history value that is ambiguous or
  // invalid (`gh pr merge <PR>` for "same but merge" after `tellsh merge pr nightly`, never the current branch's pull request)
  const keep = new Set([...r.invalidOperands, ...nounBlank]);
  // an unquoted path followed by more words of its name (`~/Old Projects`): the whole name, or a placeholder when where it
  // ends is unclear; never the first word alone
  const cutPaths = [];
  const grown = {};
  for (const k of Object.keys(slots)) {
    if (!PATH_SLOT_NAMES.has(k) || r.sources[k] === 'history') continue;
    const t = pathTail(query, slots[k], r.spans, { used: Object.entries(slots).filter(([j]) => j !== k).map(([, x]) => String(x)), strict: BY_ID[intent].risk !== 'safe' });
    if (!t) continue;
    if (t.value != null && validSlot(k, t.value)) { grown[slots[k]] = t.value; slots[k] = t.value; continue; }
    cutPaths.push(`${k}=${slots[k]} ${t.words.join(' ')}`); delete slots[k]; delete r.sources[k]; blank.add(k); keep.add(k);
  }
  if (cutPaths.length) finalizeSlots(BY_ID[intent], slots);
  if (BY_ID[intent].risk !== 'safe') {
    for (const k of Object.keys(slots)) {
      if (PATH_SLOT_NAMES.has(k) && r.sources[k] !== 'history' && trailingPunctAfter(query, slots[k])) { ambiguousPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
    }
    if (ambiguousPaths.length) finalizeSlots(BY_ID[intent], slots);
  }
  // `rename /tmp/my file.txt to /tmp/new.txt`, `move report.txt notes.txt to /tmp/dir`: the source is what precedes "to",
  // the destination what follows it; an unclear side is a placeholder + warning, never another word of the request
  const splitPaths = [];
  if (TWO_PATH_INTENTS.has(intent) && !ref && !sb && !hasLocative(query)) {
    const sp = splitTwoPaths(query, slots);
    for (const [k, side] of sp ? [['src', sp.src], ['dst', sp.dst]] : []) {
      if (!side.found || r.sources[k] === 'history') continue;
      if (side.v == null) { if (!side.quiet) splitPaths.push(`${k}=${side.words}`); delete slots[k]; delete r.sources[k]; blank.add(k); keep.add(k); } else if (slots[k] !== side.v) { slots[k] = side.v; r.sources[k] = 'regex'; }
    }
    if (sp) finalizeSlots(BY_ID[intent], slots);
  }
  // a changing command whose path is the output of a command (`in \`pwd\``, `$(pwd)`), or a request that names more
  // explicit paths than the command takes (`in /tmp/x and /tmp/y`: only one would be used): placeholder + warning
  const unclearPaths = [];
  if (BY_ID[intent].risk !== 'safe') {
    const explicit = explicitPaths(query);
    const nPathSlots = [...PATH_SLOT_NAMES].filter((k) => usesSlot(BY_ID[intent], k)).length;
    const dropped = explicit.filter((p) => !Object.values(slots).some((v) => String(v) === p || String(v).startsWith(p + ' ')));
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
  if (splitPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear which words name the ${splitPaths.map((x) => x.split('=')[0] === 'src' ? 'source' : 'destination').join(' and ')} (${splitPaths.join(', ')}); quote each path`];
  if (cutPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear where the unquoted name ends (${cutPaths.join(', ')}); quote the path`];
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
    const ci = composeInput(query, model, fam, opts.unclearArgs, grown);
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
// Turn (intent, slots) into a concrete, safely-quoted command for the target shell.
import { BY_ID } from './catalog.js';
import { extractSlots, pickArg, pickDest, pickDir, foldKeepLength, isStopWord } from './slots.js';
import { checkDanger, maxRisk, plainSlotValue } from './danger.js';
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

exec
/bin/bash -lc "sed -n '1,180p' src/catalog.js; git diff 0d87457..HEAD -- src/cli.js; rg -n 'writeFile|mkdtemp|mkdir|spawn|execFile' test/*.js" in /workspace/tellsh
 succeeded in 0ms:
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
test/compose.test.js:47:  const { spawnSync } = await import('node:child_process');
test/compose.test.js:48:  const r = spawnSync('sh', ['-c', 'node bin/tellsh.js --dry-run show disk usage | head -c 1 >/dev/null; echo $?'], { encoding: 'utf8' });
test/regressions11.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions11.test.js:33:  const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', 'start', 'wrangler', 'dev'],
test/regressions11.test.js:84:  const sed = spawnSync('sh', ['-c', `DEV_TEXTS=/x.json; sed -n -e "s#^import { ctxFeatures } from '../src/history.js';#&\\nconst _devIndex = new Set(JSON.parse(readFileSync('$DEV_TEXTS', 'utf8')));#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
test/cli.test.js:3:import { spawnSync } from 'node:child_process';
test/cli.test.js:5:import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/cli.test.js:10:const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/cli.test.js:94:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-cli-'));
test/cli.test.js:97:    writeFileSync(f, 'echo SECRET_TOKEN=abc123\ncat notes.txt\n');
test/regressions5.test.js:112:  assert.equal(run('move it to /tmp/old', ['mkdir /tmp/build']).command, 'mv -i /tmp/build /tmp/old');
test/regressions10.test.js:9:import { spawnSync } from 'node:child_process';
test/regressions10.test.js:22:const cliJson = (...words) => JSON.parse(spawnSync(process.execPath, [BIN, '--json', '--shell', 'bash', '--os', 'linux', ...words],
test/regressions10.test.js:143:  const sed = spawnSync('sh', ['-c', `sed -n -e "s#^  const leaks = excl.has;\\$#  const leaks = (t) => excl.has(t) || isDevText(t);#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
test/templates.test.js:3:import { execFileSync } from 'node:child_process';
test/templates.test.js:8:const roundTrip = (s) => execFileSync('bash', ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' });
test/regressions4.test.js:193:  const { spawnSync } = await import('node:child_process');
test/regressions4.test.js:194:  const { mkdtempSync, writeFileSync } = await import('node:fs');
test/regressions4.test.js:197:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r4-'));
test/regressions4.test.js:199:  writeFileSync(hist, 'rm -r old\nls newdir\n');
test/regressions4.test.js:200:  const r = spawnSync(process.execPath, ['bin/tellsh.js', '--dry-run', `--history=${hist}`, 'same', 'for', '/srv/current'], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/pipeline.test.js:4:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/pipeline.test.js:93:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-hist-'));
test/pipeline.test.js:96:    writeFileSync(f, Array.from({ length: 50 }, (_, i) => `: 17000000${i}:0;echo ${i}`).join('\n') + '\n');
test/slot-cases.js:57:  ['mkdir', 'create folder src/components/ui', 'mkdir -p src/components/ui'],
test/regressions.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/regressions.test.js:7:import { mkdtempSync, writeFileSync, readFileSync, rmSync, chmodSync } from 'node:fs';
test/regressions.test.js:26:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions.test.js:30:const tmp = () => mkdtempSync(join(tmpdir(), 'tellsh-reg-'));
test/regressions.test.js:40:  const out = execFileSync('bash', ['-c', render("printf '[%s]' {file}«{dest}»", v).command], { encoding: 'utf8' });
test/regressions.test.js:55:    assert.equal(spawnSync('bash', ['-n', '-c', command]).status, 0, command);
test/regressions.test.js:179:  const out = execFileSync('sh', ['-c', `printf 'h1 ./a\\nh1 ./b\\nh2 ./c\\nh3 ./d\\nh3 ./e\\nh3 ./f\\n' | ${awk}`], { encoding: 'utf8' });
test/regressions.test.js:196:    writeFileSync(fake, `#!/bin/sh\nprintf '%s\\n' "$@" > '${out}'\nprintf '%s' "$TELLSH_PARSE_SRC" > '${out}.src'\nexit 0\n`);
test/regressions.test.js:283:    writeFileSync(join(dir, 'notes.txt'), 'hello\n');
test/regressions.test.js:284:    writeFileSync(f, 'ls\ncat notes.txt\n');
test/shells.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/shells.test.js:12:const has = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
test/shells.test.js:51:      const res = spawnSync(checker, args, { encoding: 'utf8' });
test/shells.test.js:65:    if (has('fish')) { const res = spawnSync('fish', ['-n', '-c', r.command]); if (res.status !== 0) bad.push(it.id); }
test/shells.test.js:112:    for (const sh of ['bash', 'sh']) assert.equal(execFileSync(sh, ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' }), s);
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
test/regressions8.test.js:23:const cli = (args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/regressions8.test.js:54:  const ctx = buildContext(['cat a.txt', 'docker logs web', 'mkdir /tmp/b']);
test/regressions8.test.js:66:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r7-'));
test/regressions8.test.js:69:    writeFileSync(f, 'cat old.txt\nls\ncat new.txt\n');
test/regressions8.test.js:108:  const c = run('delete it', [`mkdir ${long}`]);
test/regressions8.test.js:197:test('minor: a NUL byte never reaches spawnSync', () => {
test/regressions7.test.js:76:  assert.equal(run('copy notes.txt to it', ['mkdir /tmp/n']).command, 'cp -ri notes.txt /tmp/n');
test/regressions12.test.js:8:import { spawnSync } from 'node:child_process';
test/regressions12.test.js:73:    const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', ...q.split(' ')],
test/regressions6.test.js:48:  assert.equal(run('delete it', ['mkdir /tmp/new']).command, 'rm -r /tmp/new');
test/regressions6.test.js:81:  refused(run('delete that backups folder', ['mkdir /srv/remove-backups', 'mkdir /srv/current']), '<PATH>', 'hint');
test/regressions6.test.js:84:  const ctx = buildContext(['mkdir /a', 'mkdir /b']);
test/regressions6.test.js:162:  assert.equal(run('copy notes.txt to it', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
test/regressions6.test.js:163:  assert.equal(run('skopiuj notes.txt do niego', ['mkdir /backup']).command, 'cp -ri notes.txt /backup');
test/regressions6.test.js:164:  assert.equal(run('move report.pdf into that folder', ['mkdir /srv/x']).command, 'mv -i report.pdf /srv/x');
test/regressions2.test.js:6:import { spawnSync } from 'node:child_process';
test/regressions2.test.js:8:import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
test/regressions2.test.js:26:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions2.test.js:172:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r2-'));
test/regressions2.test.js:175:    writeFileSync(hf, 'cat secret.txt\n');

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
const qs=['stop docker container web --context prod','docker --context prod stop web','stop container web on docker context prod','git -C /srv/repo reset hard','git push origin release','push branch release to upstream','delete branch feature/login','delete file /tmp/a and /tmp/b','delete files a.txt and b.txt','delete the file \"foo bar.txt\"','kill process named foo.bar','restart service nginx on host prod','run npm deploy --prefix /srv/app','npm --prefix /srv/app run deploy','pip install requests --prefix /tmp/pkgs','copy a.txt b.txt to backup','change owner of /srv/app to alice','stop docker containers web and db'];
for(const q of qs){let r=suggest(q,{env});console.log(JSON.stringify({q,c:r.command,i:r.intent,r:r.risk,m:r.missing,w:r.warnings}));}
JS" in /workspace/tellsh
 succeeded in 135ms:
{"q":"stop docker container web --context prod","c":"docker stop web","i":"docker_stop","r":"medium","m":[],"w":["stops containers"]}
{"q":"docker --context prod stop web","c":"docker stop prod","i":"docker_stop","r":"medium","m":[],"w":["stops containers"]}
{"q":"stop container web on docker context prod","c":"docker stop context","i":"docker_stop","r":"medium","m":[],"w":["stops containers"]}
{"q":"git -C /srv/repo reset hard","c":"git init","i":"git_init","r":"safe","m":[],"w":[]}
{"q":"git push origin release","c":"git push","i":"git_push","r":"medium","m":[],"w":[]}
{"q":"push branch release to upstream","c":"git push origin release","i":"git_push","r":"medium","m":[],"w":[]}
{"q":"delete branch feature/login","c":"git branch -d feature/login","i":"git_delete_branch","r":"medium","m":[],"w":[]}
{"q":"delete file /tmp/a and /tmp/b","c":"rm <FILE>","i":"delete_file","r":"high","m":["file"],"w":["rm deletes files permanently (no trash)","path left as a placeholder: the request names more paths than delete_file takes (/tmp/a, /tmp/b); run it once per path"]}
{"q":"delete files a.txt and b.txt","c":"rm a.txt","i":"delete_file","r":"high","m":[],"w":["rm deletes files permanently (no trash)"]}
{"q":"delete the file \"foo bar.txt\"","c":"rm 'foo bar.txt'","i":"delete_file","r":"high","m":[],"w":["rm deletes files permanently (no trash)"]}
{"q":"kill process named foo.bar","c":"pkill -f foo.bar","i":"kill_by_name","r":"high","m":[],"w":["terminates processes"]}
{"q":"restart service nginx on host prod","c":"sudo systemctl restart nginx","i":"service_restart","r":"high","m":[],"w":["runs with root privileges","runs another command through a wrapper (sudo); only commands on the allowlist are trusted"]}
{"q":"run npm deploy --prefix /srv/app","c":"npm run deploy <SCOPE>","i":"npm_run_script","r":"medium","m":["scope"],"w":["path left as a placeholder: the request names more paths than npm_run_script takes (/srv/app); run it once per path"]}
{"q":"npm --prefix /srv/app run deploy","c":"npm run deploy <SCOPE>","i":"npm_run_script","r":"medium","m":["scope"],"w":["path left as a placeholder: the request names more paths than npm_run_script takes (/srv/app); run it once per path"]}
{"q":"pip install requests --prefix /tmp/pkgs","c":"python3 -m pip install requests <SCOPE>","i":"pip_install","r":"medium","m":["scope"],"w":["path left as a placeholder: the request names more paths than pip_install takes (/tmp/pkgs); run it once per path"]}
{"q":"copy a.txt b.txt to backup","c":"cp -ri <SRC> backup","i":"copy","r":"medium","m":["src"],"w":["redirect writes to a file","path left as a placeholder: unclear which words name the source (src=a.txt b.txt); quote each path"]}
{"q":"change owner of /srv/app to alice","c":"sudo chown -R alice /srv/app","i":"chown","r":"high","m":[],"w":["runs with root privileges","runs another command through a wrapper (sudo); only commands on the allowlist are trusted"]}
{"q":"stop docker containers web and db","c":"docker stop web","i":"docker_stop","r":"medium","m":[],"w":["stops containers"]}

exec
/bin/bash -lc "git diff 0d87457..HEAD -- src/catalog.js src/slots.js; sed -n '420,700p' src/fill.js" in /workspace/tellsh
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
diff --git a/src/slots.js b/src/slots.js
index fb80f79..684566a 100644
--- a/src/slots.js
+++ b/src/slots.js
@@ -72,6 +72,26 @@ const KNOWN_PKGS = new Set(('htop curl wget git vim nano tmux jq nodejs npm pyth
   'traceroute dnsutils whois unzip zip p7zip ripgrep fd-find bat fzf golang rustc ruby php sqlite3 postgresql ' +
   'redis nginx apache2 mc lm-sensors iotop iftop nethogs rsync gnupg imagemagick').split(' '));
 
+// package.json script names and command-line tools people ask about (npm run X, X --version, X --help)
+const KNOWN_SCRIPTS = new Set(('dev start build test lint typecheck type-check preview serve watch format e2e deploy ' +
+  'storybook coverage clean release prepare check bench docs generate migrate seed test:unit test:e2e build:prod').split(' '));
+export const KNOWN_TOOLS = new Set(('node nodejs npm npx pnpm yarn bun deno python python3 pip pip3 uv poetry pytest git gh docker ' +
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
  if (PR_DESCRIBED.test(after) || prPickedAfter(after)) return '?';
  const numbers = !/\d/.test(text) && (ex.numbers?.length ?? 0) <= [...text.matchAll(PR_DEM_NUMBER)].length ? [] : ex.numbers || [];
  if (numbers.length || /\d/.test(text) || /[/_#'"`„“”’]|\w[.-]\w/.test(after) || PR_BRANCH_NAMED.test(after) || PR_QUALIFIED.test(after)) return '?';
  return null;
}
// "--repo a/b", "-R a/b", "in (the) repo(sitory) a/b", "in the a/b repo"; "in the other repo", "in another repository": named,
// not readable ("this repo", "the current repository" are the working directory's)
const PR_REPO_OPT = /(?:^|\s)(?:--repo(?:=|\s+|$)|-R(?:=|\s*))(\S*)/;
const PR_REPO = /\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(?:github\s+)?(?:repo|repository|repozytorium|project)\s+(\S+)|\b(?:in|of|on|from|for|at|to)\s+(?:the\s+|a\s+)?(\S+(?:\s+\S+)?)\s+(?:github\s+)?(?:repo|repository)\b|\b(?:w|z)\s+(?:repozytorium|projek\w*)\s+(\S+)/i;
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
// every repository a request names in a readable form: options (`--repo a/b`, `-R a/b`), `a/b#7`, a pull request URL,
// "in repo a/b"
const PR_URL_REPO = /(?:https?:\/\/)?github\.com\/([\w.-]+\/[\w.-]+)\/pull\/\d+/gi;
const repoKey = (w) => w.toLowerCase().replace(/^github\.com\//, '');
function repoMentions(text) {
  const out = new Set();
  for (const re of [PR_REPO_OPT, PR_REPO_HASH, PR_URL_REPO, PR_REPO]) {
    for (const m of text.matchAll(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'))) {
      const w = repoValue(m[1] ?? m[2] ?? m[3] ?? '');
      if (RAW_OK.repo(w)) out.add(repoKey(w));
    }
  }
  return out;
}
function prRepo(text) {
  const cut = (i, len, put = ' ') => (text.slice(0, i) + put + text.slice(i + len)).replace(/\s+/g, ' ').trim();
  const h = text.match(PR_REPO_HASH);
  if (h && RAW_OK.repo(repoValue(h[1]))) {
    const at = h.index + h[0].indexOf(h[1]);
    return { repo: repoValue(h[1]), rest: cut(at, h[1].length + 1 + h[2].length, ` #${h[2]} `), pr: h[2] };
  }
  const m = text.match(PR_REPO_OPT) || text.match(PR_REPO);
  if (!m) {
    for (const p of text.matchAll(PR_REPO_PREP)) {
      const w = repoValue(p[2]);
      if (!RAW_OK.repo(w)) continue;
      const host = w.split('/').length === 3;
      // "merge pr from feature/x", "view the pr for fix/a": the branch the pull request is for
      if (!host && /^(?:of|on|from|for)$/i.test(p[1]) && PR_SELECTOR_SPOT.test(text.slice(0, p.index + p[0].indexOf(p[1])))) continue;
      return { repo: w, rest: cut(p.index, p[0].length) };
    }
    return null;
  }
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

// ssh tunnel (v0.3 close5): "forward local port 8080 to remote port 5432 on db.example.com", "-L 8080:db.internal:5432 via
// bastion", "forward 8080 to db.internal:5432 through bastion": both ends are kept, never `-L 8080:localhost:8080`. A remote
// port the request names but that cannot be told apart from the local one (two bare numbers) is withheld (`<RPORT>`).
const TUNNEL_WORD = /^(?:ssh|tunnel|tunel\w*|tunnels|port\w*|forward\w*|przekier\w*|local|remote|lokaln\w*|zdaln\w*|server|serwer\w*|host|localhost)$/i;
const PORT_N = String.raw`(\d{1,5})(?![\w.:])`;
function tunnelEnds(text, v) {
  const t = foldKeepLength(text).toLowerCase();
  const L = t.match(/(?:^|\s)-l\s*(\d{1,5}):([\w.-]+|\[[0-9a-f:.]+\]):(\d{1,5})(?=\s|$)/);
  if (L) {
    const at = t.indexOf(L[0]) + L[0].indexOf(L[2]);
    v.port = +L[1]; v.rhost = text.slice(at, at + L[2].length); v.rport = +L[3];
    // the ssh server is a host outside the -L spec ("-L 8080:db.internal:5432 bastion"), never the far host
    const rest = (text.slice(0, t.indexOf(L[0])) + ' ' + text.slice(t.indexOf(L[0]) + L[0].length)).split(/\s+/).map((w) => w.replace(/[,;!?]+$/, ''));
    const server = rest.filter((w) => /^(?!-)[\w.@-]+$/.test(w) && /[.@]/.test(w)).pop() ?? rest.filter((w) => /^[a-z][\w-]*$/i.test(w) && !TUNNEL_WORD.test(w) && !isStopWord(w.toLowerCase())).pop();
    if (server) v.target = server; else delete v.target;
    return;
  }
  const local = t.match(new RegExp(String.raw`(?:local|lokaln\w*)\s+(?:port\w*\s+)?` + PORT_N));
  const remote = t.match(new RegExp(String.raw`(?:remote|zdaln\w*|destination|docelow\w*|target)\s+(?:port\w*\s+)?` + PORT_N));
  // a far host other than the ssh server: HOST:PORT next to another host the connection goes through
  const hp = [...text.matchAll(/(?:^|\s)((?!-)[A-Za-z0-9][\w.-]*):(\d{1,5})(?=[\s,.;!?]|$)/g)];
  const via = /(?:^|\s)(?:via|through|thru|over|using|przez|poprzez|on|na|from|z|ze)\s+(?:the\s+)?(?:(?:server|host|bastion|jump\s*host|serwer\w*)\s+)?([\w.@-]+)/i;
  if (local) v.port = +local[1];
  if (remote) v.rport = +remote[1];
  if (hp.length === 1) {
    const [, h, p] = hp[0];
    const other = [...text.matchAll(new RegExp(via.source, 'gi'))].map((m) => m[1].replace(/[.,;!?]+$/, '')).find((x) => x !== h && /[.@]|^[a-z][\w-]*$/i.test(x) && x !== 'ssh');
    if (other && v.target !== other && v.target != null && String(v.target).startsWith(h)) v.target = other;
    if (other) { v.rhost = h; v.target = other; } else if (v.target == null || String(v.target).startsWith(h + ':') || v.target === h) v.target = h;
    v.rport = +p;
    if (!local && v.port === +p) {
      // the only number is the remote one: the local port is not named
      const nums = [...t.matchAll(/(?<![\w.:])(\d{1,5})(?![\w.:])/g)].map((m) => +m[1]);
      if (nums.length) v.port = nums[0]; else delete v.port;
    }
  } else if (hp.length > 1) v.rport = '?';
  if (v.target != null && /:/.test(String(v.target)) && !/@/.test(String(v.target))) v.target = String(v.target).replace(/:\d+$/, '');
  // "ssh tunnel … on web1": a word of the request ("tunnel") is never the server
  if (v.target != null && TUNNEL_WORD.test(String(v.target))) {
    const m = [...text.matchAll(new RegExp(via.source, 'gi'))].map((x) => x[1].replace(/[.,;!?]+$/, '')).find((x) => !TUNNEL_WORD.test(x) && !/^\d+$/.test(x));
    if (m) v.target = m; else delete v.target;
  }
  if (remote == null && hp.length === 0) {
    // "forward 8080 to 5432 on db": two different bare port numbers; which is which is not said with local / remote
    const nums = [...t.matchAll(/(?<![\w.:])(\d{1,5})(?![\w.:])/g)].map((m) => +m[1]).filter((n) => n > 0 && n < 65536);
    if (new Set(nums).size > 1) {
      const ab = t.match(new RegExp(String.raw`(?<![\w.:])(\d{1,5})\s+(?:to|into|na|do|->)\s+(?:(?:the\s+)?port\w*\s+)?` + PORT_N));
      if (local) v.rport = nums.find((n) => n !== +local[1]);
      else if (ab) { v.port = +ab[1]; v.rport = +ab[2]; } else v.rport = '?';
    }
  }
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
    // "--repo a/b or --repo c/d", a pull request URL of a/b with `--repo c/d`: competing repositories are withheld
    if (rq && rq.repo !== '?' && [...repoMentions(String(ex.text))].some((r) => r !== repoKey(rq.repo))) v.repo = '?';
    // the pull request the user names: a URL or a branch is kept as it is (validation withholds an odd one), never
    // dropped for a bare `gh pr merge`, which acts on the current branch's pull request
    // a literal gh command ("gh pr view 42"): its subcommand word is not a selector
    const lit = (t) => String(t).replace(/^(\s*(?:\S+\s+)?)gh\s+pr\s+(?:view|merge|checks)(?=\s|$)/i, '$1pr');
    const sel = prSelector(rq ? { ...ex, text: lit(rq.rest), numbers: (rq.rest.match(/\d+/g) || []).map(Number), quoted: ex.quoted.filter((q) => rq.rest.includes(q)) } : { ...ex, text: lit(ex.text) });
    if (rq?.pr != null) v.pr = rq.pr;
    else if (sel != null) v.pr = String(sel).replace(/^#(?=\d)/, '');
    else if (rq) v.pr = '?';
    delete v.count;
  }
  // "create a pull request in repo acme/app", "list prs of other/repo": the repository is kept (`--repo`) or withheld
  if (has('repo') && !has('pr')) {
    const rq = prRepo(String(ex.text));
    if (rq) v.repo = rq.repo;
    if (rq && rq.repo !== '?' && [...repoMentions(String(ex.text))].some((r) => r !== repoKey(rq.repo))) v.repo = '?';
  }
  // "merge pr 45 and delete the branch": gh pr merge --delete-branch
  // "… and don't delete the branch", "nie usuwaj brancha", "keep the branch, do not remove it": a negated delete is no flag
  if (intent.id === 'gh_pr_merge') {
    const f = foldKeepLength(String(ex.text)).toLowerCase();
    if ([...f.matchAll(PR_DELETE_BRANCH)].some((m) => !PR_DELETE_NEGATED.test(f.slice(0, m.index + m[0].search(/delete|remove|usun/))))) v.delbranch = '--delete-branch';
  }
  if (has('wenv')) {
    const t = String(ex.text);
    if (wranglerDry(t)) v.dryrun = '--dry-run';
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

exec
/bin/bash -lc 'node --test test/danger.test.js test/allowlist.test.js test/regressions13.test.js test/regressions14.test.js test/regressions15.test.js test/regressions16.test.js test/regressions17.test.js test/regressions18.test.js test/regressions19.test.js test/regressions20.test.js test/regressions21.test.js test/regressions22.test.js test/regressions23.test.js test/regressions24.test.js test/regressions25.test.js test/regressions26.test.js test/regressions27.test.js test/regressions28.test.js test/regressions29.test.js' in /workspace/tellsh
 succeeded in 1998ms:
TAP version 13
# Subtest: /workspace/tellsh/test/allowlist.test.js
ok 1 - /workspace/tellsh/test/allowlist.test.js
  ---
  duration_ms: 1116.796355
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 2 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 269.885825
  ...
# Subtest: /workspace/tellsh/test/regressions13.test.js
ok 3 - /workspace/tellsh/test/regressions13.test.js
  ---
  duration_ms: 510.113178
  ...
# Subtest: /workspace/tellsh/test/regressions14.test.js
ok 4 - /workspace/tellsh/test/regressions14.test.js
  ---
  duration_ms: 512.332254
  ...
# Subtest: /workspace/tellsh/test/regressions15.test.js
ok 5 - /workspace/tellsh/test/regressions15.test.js
  ---
  duration_ms: 524.658987
  ...
# Subtest: /workspace/tellsh/test/regressions16.test.js
ok 6 - /workspace/tellsh/test/regressions16.test.js
  ---
  duration_ms: 537.391572
  ...
# Subtest: /workspace/tellsh/test/regressions17.test.js
ok 7 - /workspace/tellsh/test/regressions17.test.js
  ---
  duration_ms: 529.686522
  ...
# Subtest: /workspace/tellsh/test/regressions18.test.js
ok 8 - /workspace/tellsh/test/regressions18.test.js
  ---
  duration_ms: 641.408092
  ...
# Subtest: /workspace/tellsh/test/regressions19.test.js
ok 9 - /workspace/tellsh/test/regressions19.test.js
  ---
  duration_ms: 788.976987
  ...
# Subtest: /workspace/tellsh/test/regressions20.test.js
ok 10 - /workspace/tellsh/test/regressions20.test.js
  ---
  duration_ms: 754.363069
  ...
# Subtest: /workspace/tellsh/test/regressions21.test.js
ok 11 - /workspace/tellsh/test/regressions21.test.js
  ---
  duration_ms: 624.925566
  ...
# Subtest: /workspace/tellsh/test/regressions22.test.js
ok 12 - /workspace/tellsh/test/regressions22.test.js
  ---
  duration_ms: 712.248082
  ...
# Subtest: /workspace/tellsh/test/regressions23.test.js
ok 13 - /workspace/tellsh/test/regressions23.test.js
  ---
  duration_ms: 776.673461
  ...
# Subtest: /workspace/tellsh/test/regressions24.test.js
ok 14 - /workspace/tellsh/test/regressions24.test.js
  ---
  duration_ms: 808.839776
  ...
# Subtest: /workspace/tellsh/test/regressions25.test.js
ok 15 - /workspace/tellsh/test/regressions25.test.js
  ---
  duration_ms: 704.612371
  ...
# Subtest: /workspace/tellsh/test/regressions26.test.js
ok 16 - /workspace/tellsh/test/regressions26.test.js
  ---
  duration_ms: 386.218189
  ...
# Subtest: /workspace/tellsh/test/regressions27.test.js
ok 17 - /workspace/tellsh/test/regressions27.test.js
  ---
  duration_ms: 578.653195
  ...
# Subtest: /workspace/tellsh/test/regressions28.test.js
ok 18 - /workspace/tellsh/test/regressions28.test.js
  ---
  duration_ms: 562.385257
  ...
# Subtest: /workspace/tellsh/test/regressions29.test.js
ok 19 - /workspace/tellsh/test/regressions29.test.js
  ---
  duration_ms: 694.422065
  ...
1..19
# tests 19
# suites 0
# pass 19
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 2007.70313

codex
I reproduced a target-selection failure: a Docker request naming `--context prod` drops the context and produces a command against the default daemon. I’m checking related scope handling and running the read-only regression tests.
exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
const qs=['pip install requests --target /tmp/my packages','install requests with pip --target ~/Python Packages','pip install requests --target /tmp/first --target /tmp/second','run npm deploy --workspace api --workspace web','run npm deploy --workspace api and web','run npm deploy --workspaces','run npm deploy -w api -w web','merge pr 42 --repo acme/app --repo other/app','ssh tunnel -L 127.0.0.1:8080:db.internal:5432 bastion','ssh tunnel -L 8080:db.internal:5432 user@bastion -p 2222','forward local port 8080 to port 5432 on db.internal via bastion.example.com','forward local port 8080 to remote port 5432 on db.internal via bastion.example.com','show lines 10 to 20 of a.txt','run npm build:prod','npm run test:unit','run npm script test:integration','deploy worker --name staging','deploy worker --config staging.toml','merge pr 42 in repo \"acme/app\"'];
for(const q of qs){let r=suggest(q,{env});console.log(JSON.stringify({q,c:r.command,i:r.intent,r:r.risk,m:r.missing,w:r.warnings}));}
JS" in /workspace/tellsh
 succeeded in 145ms:
{"q":"pip install requests --target /tmp/my packages","c":"python3 -m pip install requests --target /tmp/my","i":"pip_install","r":"medium","m":[],"w":[]}
{"q":"install requests with pip --target ~/Python Packages","c":"python3 -m pip install requests --target '~/Python'","i":"pip_install","r":"medium","m":[],"w":[]}
{"q":"pip install requests --target /tmp/first --target /tmp/second","c":"python3 -m pip install requests --target <PIPTARGET>","i":"pip_install","r":"medium","m":["piptarget"],"w":["path left as a placeholder: the request names more paths than pip_install takes (/tmp/first, /tmp/second); run it once per path"]}
{"q":"run npm deploy --workspace api --workspace web","c":"npm run deploy --workspace <WORKSPACE>","i":"npm_run_script","r":"medium","m":["workspace"],"w":[]}
{"q":"run npm deploy --workspace api and web","c":"npm run deploy --workspace api","i":"npm_run_script","r":"medium","m":[],"w":[]}
{"q":"run npm deploy --workspaces","c":"npm run deploy --workspace <WORKSPACE>","i":"npm_run_script","r":"medium","m":["workspace"],"w":[]}
{"q":"run npm deploy -w api -w web","c":"npm run deploy --workspace <WORKSPACE>","i":"npm_run_script","r":"medium","m":["workspace"],"w":[]}
{"q":"merge pr 42 --repo acme/app --repo other/app","c":"gh pr merge 42 --repo <REPO>","i":"gh_pr_merge","r":"medium","m":["repo"],"w":[]}
{"q":"ssh tunnel -L 127.0.0.1:8080:db.internal:5432 bastion","c":"ssh -N -L 8080:localhost:8080 127.0.0.1","i":"ssh_port_forward","r":"medium","m":[],"w":[]}
{"q":"ssh tunnel -L 8080:db.internal:5432 user@bastion -p 2222","c":"ssh -N -L 8080:db.internal:5432 user@bastion","i":"ssh_port_forward","r":"medium","m":[],"w":[]}
{"q":"forward local port 8080 to port 5432 on db.internal via bastion.example.com","c":"nc -zv db.internal 8080","i":"port_check","r":"safe","m":[],"w":[]}
{"q":"forward local port 8080 to remote port 5432 on db.internal via bastion.example.com","c":"nc -zv db.internal 8080","i":"port_check","r":"safe","m":[],"w":[]}
{"q":"show lines 10 to 20 of a.txt","c":"sed -n '10,20p' a.txt","i":"print_line_range","r":"safe","m":[],"w":[]}
{"q":"run npm build:prod","c":"npm run build:prod","i":"npm_run_script","r":"medium","m":[],"w":[]}
{"q":"npm run test:unit","c":"npm run test:unit","i":"npm_run_script","r":"medium","m":[],"w":[]}
{"q":"run npm script test:integration","c":"npm run test:integration","i":"npm_run_script","r":"medium","m":[],"w":[]}
{"q":"deploy worker --name staging","c":"npx wrangler deploy --env <WENV>","i":"wrangler_deploy","r":"medium","m":["wenv"],"w":[]}
{"q":"deploy worker --config staging.toml","c":"npx wrangler deploy --env <WENV> <ARGS>","i":"wrangler_deploy","r":"medium","m":["wenv","args"],"w":["redirect writes to a file"]}
{"q":"merge pr 42 in repo \"acme/app\"","c":"gh pr merge 42 --repo acme/app","i":"gh_pr_merge","r":"medium","m":[],"w":[]}

exec
/bin/bash -lc "sed -n '490,620p' src/danger.js; sed -n '120,310p' src/fill.js; sed -n '710,810p' src/fill.js" in /workspace/tellsh
 succeeded in 0ms:
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
  gh_run_list: SEL_WORDS(`list listing recent recently latest last all show workflow workflows run runs action actions ci pipeline pipelines
    build builds job jobs history happened happen* recently fail* failed failing passed przeszl* padl* ostatni* wszystkie uruchomien* przebieg* runy runow workflowy workflowow akcj* histori*
    wylistuj* listuj* lista liste buildow`),
  gh_run_view: SEL_WORDS(`view details logs log output failed failing failure why workflow run runa runie action ci pipeline build job
    szczegol* logi`),
  gh_auth_status: SEL_WORDS(`auth authenticated authentication logged log login signed sign status who account whoami am which user
    zalogowan* konto konta koncie kim kto jestem uwierzytelnien* logowani* token valid wazn* expired wygasl* session sesj*
    authorized autoryzacj* loguje credentials dane still nadal`),
  gh_auth_login: SEL_WORDS(`not nie auth authenticate authentication log login sign signin zaloguj* zalogowac logowani* konto account
    uwierzytelnij* autoryzuj* kont* konc* connect podlacz* polacz* link authorize re-authenticate re-login again ponownie setup configure skonfiguruj* konfiguracj*`),
  wrangler_deploy: SEL_WORDS(`depl* redeploy publish* ship push release upload go wdroz* zdeployuj* deployuj* opublikuj* wypchnij*
    wrzuc* wgraj* make roll rollout wypusc* wydaj* pusc* code kod kodu version wersj* new nowa nowy najnowsz* latest fresh swiez*
    changed changes zmienilem zmian* after po`),
  wrangler_dev: SEL_WORDS(`dev develop development locally local server serve start preview mode lokaln* serwer* uruchom* odpal*
    tryb* developersk* deweloper* localhos* 127.0.0.1 machine maszyn* depl* pusc* przetest* spin launch fire boot try test przetestuj* emul* serwuj* hot reload* odpal*`),
  wrangler_tail: SEL_WORDS(`thrown right now teraz tail* logs log live stream* realtime real-time watch follow logi logow zywo strumien*
    podglad* sledz* obserwuj* rzeczywist* czasie biezaco monitor* errors bledy exceptions wyjatki console.log requests requesty
    happen* happening debug* output wdrozon* wyjscie zdebug* print* wypisuj* feed attach podepnij* podlacz* deployed zdeployowan* dzialajac* running`),
  wrangler_secret_put: SEL_WORDS(`new nowy nowa nowe push wypchnij* secret secrets set put add store save update change create rotate register encrypted configure sekret*
    ustaw* dodaj* zapisz* zmien* zaktualizuj* zaszyfrowan* zarejestruj* zrotuj* utworz* jako value variable called named nazwie`),
  wrangler_login: SEL_WORDS(`not nie kont* konc* podlacz* login log sign signin re-login authenticate re-authenticate authentication auth authorize account konto kontem
    zaloguj* zalogowac logowani* autoryz* uwierzytelni* polacz* connect browser przegladarce first najpierw ponownie again`),
  wrangler_whoami: SEL_WORDS(`whoami who account logged log signed status which user am konto konta koncie zalogowan* kim kto jestem
    identity tozsamosc* id identyfikator* email mail maila whose czyje* active aktywn* uses using uzywa* uzywam`),
};
// words that pick one pull request / run / target out of several ("the latest pr", "the draft pr", "the failing run"):
// explained only for the intents that list them (gh_pr_list "open prs", gh_run_list "recent runs"), never by the family
const SEL_PICKERS = new Set(('latest last recent recently newest new old older oldest first second third next previous prior other another ' +
  'approved pending draft failing failed fail passing passed pass green red open opened closed merged ready big small ' +
  'ostatni ostatnie ostatniego najnowszy najnowsze nowy nowa nowe stary inny inne poprzedni kolejny otwarte otwartych').split(' '));
const selFamilyAll = {};
for (const [id, v] of Object.entries(SEL_INTENT)) {
  const f = id.split('_')[0];
  const all = (selFamilyAll[f] ??= { words: new Set(), stems: [] });
  // a negation ("not logged in" for a login) is explained only for the intent that lists it, never family-wide
  for (const w of v.words) if (!SEL_PICKERS.has(w) && !/^(?:not|nie|never|without|bez)$/.test(w)) all.words.add(w);
  all.stems.push(...v.stems.filter((x) => !SEL_PICKERS.has(x)));
}
// the slot that takes the placeholder when a request has words the vocabulary does not explain
const SEL_SLOT = { gh_pr_merge: 'pr', gh_pr_view: 'pr', gh_pr_checks: 'pr', gh_run_view: 'num' };
export const hasSelectorRule = (intentId) => /^(?:gh|wrangler)_/.test(intentId);
// "for issue #3", "for ticket 12", "the pr that fixes #12": a number of another kind, explained as not the pull request
const SEL_OTHER_NUMBER = /\b(?:issues?|tickets?|bugs?|zgloszeni\w*|fix(?:es)?|closes|resolves|naprawia\w*|zamyka\w*)\s+#?\d+\b/g;
const SEL_ENV_PREP = /^(?:to|on|in|into|for|na|do|w|dla|env|environment|srodowisk\w*|called|named|nazwie)$/;
const SEL_NEGATION = /^(?:not|never|don't|dont|nor|except|excluding|without|instead|rather|nie|bez|oprocz|poza|zamiast)$/;
const SEL_DET = /^(?:the|a|an|my|our|this|that)$/;
/**
 * The words of a gh / wrangler request the vocabulary and the read values do not explain, each with the word before it
 * ([] : nothing unexplained).
 */
export function selectorResidue(intentId, text, values = {}) {
  if (!hasSelectorRule(intentId)) return [];
  const fam = SEL_FAMILY[intentId.split('_')[0]];
  const own = SEL_INTENT[intentId];
  let t = foldKeepLength(String(text)).toLowerCase();
  // values that were read, and the option / phrase forms they come in, are explained
  for (const k of ['pr', 'repo', 'wenv', 'var', 'num', 'url']) {
    const val = values[k];
    if (val == null || String(val).startsWith('?')) continue;
    const s = foldKeepLength(String(val)).toLowerCase();
    // the value as a whole word: `prod` does not explain `prodprod`, `4` does not explain `44`
    t = t.replace(new RegExp(`(?<![\\w-])${s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w-])`, 'g'), ' ');
  }
  if (/^wrangler_/.test(intentId)) t = t.replace(WR_DRY_NOT, ' ').replace(WR_DRY, ' ');
  if (values.delbranch) t = t.replace(PR_DELETE_BRANCH, ' ');
  t = t.replace(/(?:^|\s)(?:--env|-e|--repo|-r|env=|--repo=|--env=)(?=\s|$)/g, ' ')
    .replace(/(?:^|\s)(?:https?:\/\/|github\.com\/)(?=\s|$)/g, ' ')
    .replace(/\b(?:number|numer|nr|no\.|num)(?=\s|$)/g, ' ')
    .replace(/\benv(?:ironment)?\s+var(?:iable)?s?\b|\bzmienn\w*(?:\s+srodowiskow\w*)?|\bsrodowiskow\w*/g, ' ')
    .replace(/\b(?:the\s+)?command\s+line\b|\bz\s+linii\s+komend\b/g, ' ');
  if (/^gh_pr_/.test(intentId) && values.pr != null && !String(values.pr).startsWith('?')) t = t.replace(SEL_OTHER_NUMBER, ' ');
  const out = [];
  let prev = '';
  for (let w of t.split(/[\s,;!?()]+|:(?!\/\/)/)) {
    w = w.replace(/^[#"'`„“”.]+|["'`„“”.]+$/g, '').replace(/'s$/, '');
    if (!w || /^[-–—]+$/.test(w)) continue;
    // "merge pr with --squash": an option word the intent knows (gh asks for the merge method itself)
    const famAll = selFamilyAll[intentId.split('_')[0]];
    if (selHas(SEL_COMMON, w) || selHas(fam, w) || (!SEL_PICKERS.has(w) && famAll && selHas(famAll, w)) || (own && selHas(own, w.replace(/^--(?=[a-z])/, '')))) {
      if (!SEL_DET.test(w)) prev = w;
      continue;
    }
    if (o != null) v.old = o;
    if (n != null) v.new = n;
    if (o != null && n != null) v.sedexpr = `s/${sedEscapeOld(o)}/${sedEscapeNew(n)}/g`;
    // the file is the path that is not one of the replaced words
    if (v.file && (v.file === o || v.file === n)) v.file = paths.find((p) => p !== o && p !== n);
  }
  if (intent.id === 'chown' && v.user && v.path === v.user) delete v.path;
  if (intent.id === 'npm_install') npmInstallTarget(String(ex.text), v);
  // gh / wrangler: a word the request has that neither the vocabulary nor a read value explains withholds the selector
  if (hasSelectorRule(intent.id)) {
    const k = selectorWithhold(intent.id, String(ex.text), v);
    if (k && has(k)) v[k] = '?';
  }
  if (intent.id === 'ssh_port_forward') tunnelEnds(String(ex.text), v);
  scopeSlots(intent.id, String(ex.text), v, has);
  for (const k of contestedSlots(intent.id, String(ex.text), v)) if (has(k)) v[k] = '?';
  for (const k of Object.keys(v)) if (v[k] === undefined) delete v[k];
  return v;
}

// ---------------------------------------------------------------------------------------------
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
// pr 42 but not in repo acme/app", "deploy to prod, not staging", "zainstaluj axios albo lodash"), or names two candidate
// values for ("--env prod --env prodprod"), is withheld as a placeholder the user fills, never one of the candidates.
const CONTESTED = (id) => (hasSelectorRule(id) ? ['pr', 'num', 'wenv', 'repo', 'var'] : /^(?:npm_install|npm_install_global|pip_install)$/.test(id) ? ['pkg'] : id === 'npm_run_script' ? ['script'] : []);

exec
/bin/bash -lc "python3 - <<'PY'
import inspect
try:
 from pip._internal.commands.install import InstallCommand
 s = inspect.getsource(InstallCommand)
 lines=s.splitlines()
 for i,l in enumerate(lines):
  if 'target_dir' in l and ('abspath' in l or 'expanduser' in l or 'options.target_dir =' in l):
   print('\\n'.join(lines[max(0,i-2):i+3]))
except ImportError as e: print(e)
PY
node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const q of ['pip install requests --target ~/packages','pip install requests --target \"/tmp/my packages\"','pip install requests --target \"/tmp/packages \"','ssh tunnel -L 127.0.0.1:8080:db.internal:5432 user@bastion.example.com','ssh tunnel -L [::1]:8080:db.internal:5432 bastion','ssh tunnel -L 8080:db.internal:5432 bastion','forward local port 8080 to remote port 5432 on db.internal via bastion.example.com over ssh']) {
 const r=suggest(q,{env}); console.log(JSON.stringify({q,command:r.command,intent:r.intent,missing:r.missing,risk:r.risk,warnings:r.warnings,confidence:r.confidence}));
}
JS
nl -ba src/fill.js | sed -n '493,548p'; nl -ba src/fill.js | sed -n '739,795p'" in /workspace/tellsh
 succeeded in 505ms:
        if options.target_dir:
            options.ignore_installed = True
            options.target_dir = os.path.abspath(options.target_dir)
            if (
                # fmt: off
{"q":"pip install requests --target ~/packages","command":"python3 -m pip install requests --target '~/packages'","intent":"pip_install","missing":[],"risk":"medium","warnings":[],"confidence":0.8387}
{"q":"pip install requests --target \"/tmp/my packages\"","command":"python3 -m pip install requests --target '/tmp/my packages'","intent":"pip_install","missing":[],"risk":"medium","warnings":[],"confidence":0.8746}
{"q":"pip install requests --target \"/tmp/packages \"","command":"python3 -m pip install requests --target /tmp/packages","intent":"pip_install","missing":[],"risk":"medium","warnings":["path left as a placeholder: the request names more paths than pip_install takes (/tmp/packages ); run it once per path"],"confidence":0.8387}
{"q":"ssh tunnel -L 127.0.0.1:8080:db.internal:5432 user@bastion.example.com","command":"ssh -N -L 8080:localhost:8080 user@bastion.example.com","intent":"ssh_port_forward","missing":[],"risk":"medium","warnings":[],"confidence":0.8701}
{"q":"ssh tunnel -L [::1]:8080:db.internal:5432 bastion","command":"ssh -N -L 5432:localhost:5432 db.internal","intent":"ssh_port_forward","missing":[],"risk":"medium","warnings":[],"confidence":0.9925}
{"q":"ssh tunnel -L 8080:db.internal:5432 bastion","command":"ssh -N -L 8080:db.internal:5432 bastion","intent":"ssh_port_forward","missing":[],"risk":"medium","warnings":[],"confidence":0.9938}
{"q":"forward local port 8080 to remote port 5432 on db.internal via bastion.example.com over ssh","command":"ssh -N -L 8080:localhost:5432 db.internal","intent":"ssh_port_forward","missing":[],"risk":"medium","warnings":[],"confidence":0.978}
   493	const sedEscapeNew = (s) => s.replace(/[\\/&]/g, '\\$&').replace(/\n/g, '\\n');
   494	
   495	/** Recompute derived slots after values were merged/overridden (tagger, history rules). */
   496	export function finalizeSlots(intent, v) {
   497	  if (v.ext != null && v.glob == null) v.glob = `*.${v.ext}`;
   498	  if (intent.id === 'find_by_name' && v.name) v.namepat = /[*?]/.test(v.name) || /\.\w+$/.test(v.name) ? v.name : `*${v.name}*`;
   499	  if (intent.id === 'replace_text' && v.old != null && v.new != null) v.sedexpr = `s/${sedEscapeOld(v.old)}/${sedEscapeNew(v.new)}/g`;
   500	  return v;
   501	}
   502	
   503	// ssh tunnel (v0.3 close5): "forward local port 8080 to remote port 5432 on db.example.com", "-L 8080:db.internal:5432 via
   504	// bastion", "forward 8080 to db.internal:5432 through bastion": both ends are kept, never `-L 8080:localhost:8080`. A remote
   505	// port the request names but that cannot be told apart from the local one (two bare numbers) is withheld (`<RPORT>`).
   506	const TUNNEL_WORD = /^(?:ssh|tunnel|tunel\w*|tunnels|port\w*|forward\w*|przekier\w*|local|remote|lokaln\w*|zdaln\w*|server|serwer\w*|host|localhost)$/i;
   507	const PORT_N = String.raw`(\d{1,5})(?![\w.:])`;
   508	function tunnelEnds(text, v) {
   509	  const t = foldKeepLength(text).toLowerCase();
   510	  const L = t.match(/(?:^|\s)-l\s*(\d{1,5}):([\w.-]+|\[[0-9a-f:.]+\]):(\d{1,5})(?=\s|$)/);
   511	  if (L) {
   512	    const at = t.indexOf(L[0]) + L[0].indexOf(L[2]);
   513	    v.port = +L[1]; v.rhost = text.slice(at, at + L[2].length); v.rport = +L[3];
   514	    // the ssh server is a host outside the -L spec ("-L 8080:db.internal:5432 bastion"), never the far host
   515	    const rest = (text.slice(0, t.indexOf(L[0])) + ' ' + text.slice(t.indexOf(L[0]) + L[0].length)).split(/\s+/).map((w) => w.replace(/[,;!?]+$/, ''));
   516	    const server = rest.filter((w) => /^(?!-)[\w.@-]+$/.test(w) && /[.@]/.test(w)).pop() ?? rest.filter((w) => /^[a-z][\w-]*$/i.test(w) && !TUNNEL_WORD.test(w) && !isStopWord(w.toLowerCase())).pop();
   517	    if (server) v.target = server; else delete v.target;
   518	    return;
   519	  }
   520	  const local = t.match(new RegExp(String.raw`(?:local|lokaln\w*)\s+(?:port\w*\s+)?` + PORT_N));
   521	  const remote = t.match(new RegExp(String.raw`(?:remote|zdaln\w*|destination|docelow\w*|target)\s+(?:port\w*\s+)?` + PORT_N));
   522	  // a far host other than the ssh server: HOST:PORT next to another host the connection goes through
   523	  const hp = [...text.matchAll(/(?:^|\s)((?!-)[A-Za-z0-9][\w.-]*):(\d{1,5})(?=[\s,.;!?]|$)/g)];
   524	  const via = /(?:^|\s)(?:via|through|thru|over|using|przez|poprzez|on|na|from|z|ze)\s+(?:the\s+)?(?:(?:server|host|bastion|jump\s*host|serwer\w*)\s+)?([\w.@-]+)/i;
   525	  if (local) v.port = +local[1];
   526	  if (remote) v.rport = +remote[1];
   527	  if (hp.length === 1) {
   528	    const [, h, p] = hp[0];
   529	    const other = [...text.matchAll(new RegExp(via.source, 'gi'))].map((m) => m[1].replace(/[.,;!?]+$/, '')).find((x) => x !== h && /[.@]|^[a-z][\w-]*$/i.test(x) && x !== 'ssh');
   530	    if (other && v.target !== other && v.target != null && String(v.target).startsWith(h)) v.target = other;
   531	    if (other) { v.rhost = h; v.target = other; } else if (v.target == null || String(v.target).startsWith(h + ':') || v.target === h) v.target = h;
   532	    v.rport = +p;
   533	    if (!local && v.port === +p) {
   534	      // the only number is the remote one: the local port is not named
   535	      const nums = [...t.matchAll(/(?<![\w.:])(\d{1,5})(?![\w.:])/g)].map((m) => +m[1]);
   536	      if (nums.length) v.port = nums[0]; else delete v.port;
   537	    }
   538	  } else if (hp.length > 1) v.rport = '?';
   539	  if (v.target != null && /:/.test(String(v.target)) && !/@/.test(String(v.target))) v.target = String(v.target).replace(/:\d+$/, '');
   540	  // "ssh tunnel … on web1": a word of the request ("tunnel") is never the server
   541	  if (v.target != null && TUNNEL_WORD.test(String(v.target))) {
   542	    const m = [...text.matchAll(new RegExp(via.source, 'gi'))].map((x) => x[1].replace(/[.,;!?]+$/, '')).find((x) => !TUNNEL_WORD.test(x) && !/^\d+$/.test(x));
   543	    if (m) v.target = m; else delete v.target;
   544	  }
   545	  if (remote == null && hp.length === 0) {
   546	    // "forward 8080 to 5432 on db": two different bare port numbers; which is which is not said with local / remote
   547	    const nums = [...t.matchAll(/(?<![\w.:])(\d{1,5})(?![\w.:])/g)].map((m) => +m[1]).filter((n) => n > 0 && n < 65536);
   548	    if (new Set(nums).size > 1) {
   739	  '--repo': 'repo', '-r': 'repo', '--env': 'env', '-e': 'env', '--config': 'config', '-c': 'config',
   740	  '--prefix': 'dir', '--cwd': 'dir', '--dir': 'dir', '-c-dir': 'dir', '--project': 'project', '--target': 'target', '-t': 'target',
   741	};
   742	// short forms are options of one tool only: npm -w, gh -R, wrangler -e / -c
   743	const SCOPE_SHORT = { '-w': /^npm_/, '-r': /^gh_/, '-e': /^wrangler_/, '-c': /^wrangler_/, '-t': /^pip_/ };
   744	// a quoted value is one value (`--workspace "staging app"`), never its first word
   745	const SCOPE_OPT = /(?:^|\s)(--workspaces?|--ws|--filter|--repo|--env|--config|--prefix|--cwd|--dir|--project|--target|-[wRect])(?:=(?:"([^"]*)"|'([^']*)'|(\S*))|\s+(?:"([^"]*)"|'([^']*)'|(?!-)([^\s,;!?]+))|(?=[\s,;!?]|$))/g;
   746	// "in workspace api", "for the project acme/app", "w projekcie api", "in the staging environment" is read by wranglerEnv
   747	const SCOPE_PHRASE = /(?:^|\s)(?:in|for|of|on|from|within|inside|under|at|w|we|dla|z)\s+(?:the\s+|a\s+)?(workspace|project|projek\w*|repo|repository|repozytori\w*|env|environment|srodowisk\w*|config|configuration|konfiguracj\w*)\s+(?!-)([^\s,;!?]+)/g;
   748	const SCOPE_PHRASE_KIND = (w) => /^(?:workspace)$/.test(w) ? 'workspace' : /^(?:repo|repository|repozytori)/.test(w) ? 'repo'
   749	  : /^(?:env|environment|srodowisk)/.test(w) ? 'env' : /^(?:config|configuration|konfiguracj)/.test(w) ? 'config' : 'project';
   750	const SCOPE_NOT_VALUE = /^(?:the|a|an|this|that|current|same|my|our|own|local|default|root|here|it|tym|tego|bieżącym|biezacym|obecnym|moim|naszym)$/i;
   751	/** The scopes a request names: [{ kind, value (null: named without a readable value) }]. */
   752	export function scopeMentions(intentId, text) {
   753	  const out = [];
   754	  const t = String(text);
   755	  for (const m of t.matchAll(SCOPE_OPT)) {
   756	    const opt = m[1].length === 2 ? m[1].toLowerCase() : m[1];
   757	    if (SCOPE_SHORT[opt] && !SCOPE_SHORT[opt].test(intentId)) continue;
   758	    const quoted = m[2] ?? m[3] ?? m[5] ?? m[6];
   759	    const raw = quoted ?? m[4] ?? m[7] ?? null;
   760	    out.push({ kind: SCOPE_KIND[opt], value: quoted != null ? quoted.trim() || null : raw ? raw.replace(/[.,!?;:]+$/, '').replace(/^["'`]|["'`]$/g, '') || null : null, at: m.index });
   761	  }
   762	  const f = foldKeepLength(t).toLowerCase();
   763	  for (const m of f.matchAll(SCOPE_PHRASE)) {
   764	    const at = m.index + m[0].length - m[2].length;
   765	    const value = t.slice(at, at + m[2].length).replace(/[.,!?;:]+$/, '').replace(/^["'`]|["'`]$/g, '');
   766	    // "w projekcie na macu", "in the project with npm": a function word is no scope value
   767	    if (SCOPE_NOT_VALUE.test(value) || isStopWord(value) || /^(?:on|onto|under|over|via|using|w|we|z|ze|na|do|od|po|przez|pod|nad)$/i.test(value)) continue;
   768	    out.push({ kind: SCOPE_PHRASE_KIND(m[1]), value: value || null, at });
   769	  }
   770	  return out;
   771	}
   772	function scopeSlots(intentId, text, v, has) {
   773	  if (!SCOPE_FAMILIES.test(intentId)) return;
   774	  const unexpressed = [];
   775	  const seen = {};
   776	  for (const s of scopeMentions(intentId, text)) {
   777	    // gh: a project is the repository; the repository and a wrangler environment are read by prRepo / wranglerEnv
   778	    const kind = s.kind === 'project' && /^gh_/.test(intentId) ? 'repo' : s.kind;
   779	    if (kind === 'repo' && has('repo')) { if (v.repo == null) v.repo = s.value != null && RAW_OK.repo(s.value) ? s.value : '?'; continue; }
   780	    if (kind === 'env' && has('wenv')) { if (v.wenv == null) v.wenv = s.value != null && RAW_OK.wenv(s.value) ? s.value : '?'; continue; }
   781	    if (kind === 'workspace' && has('workspace')) {
   782	      const w = s.value != null && RAW_OK.workspace(s.value) ? s.value : '?';
   783	      // two different workspaces: neither is guessed
   784	      v.workspace = seen.workspace != null && seen.workspace !== w ? '?' : w;
   785	      seen.workspace = w;
   786	      // a workspace value is not the script / package ("run npm --workspace api" is not `npm run api`)
   787	      for (const k of ['script', 'pkg']) if (s.value != null && v[k] === s.value) v[k] = '?';
   788	      continue;
   789	    }
   790	    // pip --target DIR: where the package is installed, kept (`python3 -m pip install requests --target /tmp/packages`)
   791	    if (kind === 'target' && has('piptarget')) {
   792	      const d = s.value != null && RAW_OK.piptarget(s.value) ? s.value : '?';
   793	      v.piptarget = seen.piptarget != null && seen.piptarget !== d ? '?' : d;
   794	      seen.piptarget = d;
   795	      if (s.value != null && v.pkg === s.value) v.pkg = '?';

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const q of ['run npm deploy in workspace \"staging app\"','run npm deploy in workspace \"api prod\"','run npm deploy --workspace=api','run npm deploy -wapi','run npm deploy --workspace staging --workspace prod --workspace prod','pip install requests -t/tmp/pkgs','pip install requests --target=/tmp/my','npm install lodash --workspace api --workspace prod --workspace prod','deploy worker --env staging --env prod --env prod']){
let r=suggest(q,{env});console.log(JSON.stringify({q,c:r.command,m:r.missing,w:r.warnings,r:r.risk}));}
JS" in /workspace/tellsh
 succeeded in 205ms:
{"q":"run npm deploy in workspace \"staging app\"","c":"npm run deploy --workspace staging","m":[],"w":[],"r":"medium"}
{"q":"run npm deploy in workspace \"api prod\"","c":"npm run deploy --workspace api","m":[],"w":[],"r":"medium"}
{"q":"run npm deploy --workspace=api","c":"npm run deploy --workspace api","m":[],"w":[],"r":"medium"}
{"q":"run npm deploy -wapi","c":"npm run deploy","m":[],"w":[],"r":"medium"}
{"q":"run npm deploy --workspace staging --workspace prod --workspace prod","c":"npm run deploy --workspace prod","m":[],"w":[],"r":"medium"}
{"q":"pip install requests -t/tmp/pkgs","c":"python3 -m pip install requests","m":[],"w":[],"r":"medium"}
{"q":"pip install requests --target=/tmp/my","c":"python3 -m pip install requests --target /tmp/my","m":[],"w":[],"r":"medium"}
{"q":"npm install lodash --workspace api --workspace prod --workspace prod","c":"npm install lodash --workspace prod","m":[],"w":[],"r":"medium"}
{"q":"deploy worker --env staging --env prod --env prod","c":"npx wrangler deploy --env <WENV>","m":["wenv"],"w":[],"r":"medium"}

codex
The selected regression tests passed. I also confirmed failures in the new code: attached scope options are dropped, quoted workspace names can be shortened, some SSH tunnel endpoints are replaced, and pip target paths lose home-directory expansion. These produce complete commands rather than placeholders.
exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for (const q of ['pip install requests -t/tmp/pkgs','run npm deploy in workspace \"staging app\"','ssh tunnel -L 127.0.0.1:8080:db.internal:5432 user@bastion.example.com','pip install requests --target ~/packages']) {
 const r=suggest(q,{env});
 console.log(JSON.stringify({query:q,command:r.command,method:r.method,missing:r.missing,warnings:r.warnings,risk:r.risk}));
}
JS
python3 - <<'PY'
from pip._internal.commands import create_command
cmd = create_command('install')
options, args = cmd.parse_args(['requests', '-t/tmp/pkgs'])
print({'pip_parsed_target': options.target_dir, 'args': args})
PY
nl -ba src/fill.js | sed -n '483,489p'; nl -ba src/fill.js | sed -n '868,879p'; git status --short" in /workspace/tellsh
 succeeded in 397ms:
{"query":"pip install requests -t/tmp/pkgs","command":"python3 -m pip install requests","method":"catalog","missing":[],"warnings":[],"risk":"medium"}
{"query":"run npm deploy in workspace \"staging app\"","command":"npm run deploy --workspace staging","method":"catalog","missing":[],"warnings":[],"risk":"medium"}
{"query":"ssh tunnel -L 127.0.0.1:8080:db.internal:5432 user@bastion.example.com","command":"ssh -N -L 8080:localhost:8080 user@bastion.example.com","method":"catalog","missing":[],"warnings":[],"risk":"medium"}
{"query":"pip install requests --target ~/packages","command":"python3 -m pip install requests --target '~/packages'","method":"catalog","missing":[],"warnings":[],"risk":"medium"}
{'pip_parsed_target': '/tmp/pkgs', 'args': ['requests']}
   483	  if (m[2] != null && PR_REPO_HERE.test(w)) return null;
   484	  const rest = (text.slice(0, m.index) + ' ' + text.slice(m.index + m[0].length)).replace(/\s+/g, ' ').trim();
   485	  return { repo: RAW_OK.repo(w) ? w : '?', rest };
   486	}
   487	const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
   488	const PLACEHOLDER = (name) => `<${name.toUpperCase()}>`;
   489	
   868	  return [...out].filter((k) => !String(values[k]).startsWith('?'));
   869	}
   870	
   871	function renderValue(name, raw, values, quote) {
   872	  if (!(name in values)) return null;
   873	  let val = values[name];
   874	  if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
   875	  if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
   876	  return quote(val, { tilde: PATH_SLOTS.has(name), name });
   877	}
   878	
   879	const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|rport|rhost|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;
?? review/final5-claude.md
?? review/final5-codex.md

codex
1. **Major — Attached pip targets are silently dropped** ([fill.js:745](/workspace/tellsh/src/fill.js:745)). `pip install requests -t/tmp/pkgs` produces `python3 -m pip install requests`, installing into the active Python environment instead of `/tmp/pkgs`. Pip accepts this attached option syntax; preserve it or emit a placeholder.

2. **Major — Quoted workspace names are truncated** ([fill.js:747](/workspace/tellsh/src/fill.js:747)). `run npm deploy in workspace "staging app"` produces `npm run deploy --workspace staging`. This can execute deployment in a different workspace. The phrase parser must preserve the complete quoted value or withhold it.

3. **Major — SSH bind-address syntax changes the destination** ([fill.js:510](/workspace/tellsh/src/fill.js:510)). `ssh tunnel -L 127.0.0.1:8080:db.internal:5432 user@bastion.example.com` produces `ssh -N -L 8080:localhost:8080 user@bastion.example.com`. The parser misses the four-part forwarding specification and substitutes a different remote host and port. Unsupported forms must produce placeholders.

4. **Major — Pip targets lose home-directory expansion** ([fill.js:791](/workspace/tellsh/src/fill.js:791)). `pip install requests --target ~/packages` produces `python3 -m pip install requests --target '~/packages'`. Because `piptarget` is not treated as a path slot, the quoted tilde remains literal; pip resolves it beneath the working directory instead of the user’s home.

All four reproductions return complete catalog commands with empty `missing` and `warnings` arrays.

VERDICT: REQUEST_CHANGES
tokens used
110,749
1. **Major — Attached pip targets are silently dropped** ([fill.js:745](/workspace/tellsh/src/fill.js:745)). `pip install requests -t/tmp/pkgs` produces `python3 -m pip install requests`, installing into the active Python environment instead of `/tmp/pkgs`. Pip accepts this attached option syntax; preserve it or emit a placeholder.

2. **Major — Quoted workspace names are truncated** ([fill.js:747](/workspace/tellsh/src/fill.js:747)). `run npm deploy in workspace "staging app"` produces `npm run deploy --workspace staging`. This can execute deployment in a different workspace. The phrase parser must preserve the complete quoted value or withhold it.

3. **Major — SSH bind-address syntax changes the destination** ([fill.js:510](/workspace/tellsh/src/fill.js:510)). `ssh tunnel -L 127.0.0.1:8080:db.internal:5432 user@bastion.example.com` produces `ssh -N -L 8080:localhost:8080 user@bastion.example.com`. The parser misses the four-part forwarding specification and substitutes a different remote host and port. Unsupported forms must produce placeholders.

4. **Major — Pip targets lose home-directory expansion** ([fill.js:791](/workspace/tellsh/src/fill.js:791)). `pip install requests --target ~/packages` produces `python3 -m pip install requests --target '~/packages'`. Because `piptarget` is not treated as a path slot, the quoted tilde remains literal; pip resolves it beneath the working directory instead of the user’s home.

All four reproductions return complete catalog commands with empty `missing` and `warnings` arrays.

VERDICT: REQUEST_CHANGES
