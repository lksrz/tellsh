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
session id: 01a12a65-98b9-79a3-bfa4-4c2fdc004373
--------
user
Final review of tellsh v0.3 (git diff 0d87457..HEAD). Design rules accepted: uncertain args -> placeholder; risk allowlist. Report only blocker/major bugs that violate these (unsafe execution, wrong target silently). Read-only. End with exactly one line 'VERDICT: APPROVE' or 'VERDICT: REQUEST_CHANGES'.
codex
I’ll review the diff and execution paths for blocker or major bugs involving unsafe execution or silently wrong targets, using the accepted placeholder and risk-allowlist rules.
exec
/bin/bash -lc "pwd; rg --files -g AGENTS.md -g '"'!node_modules'"' -g '"'!vendor'"'; git status --short; git diff --stat 0d87457..HEAD" in /workspace/tellsh
 succeeded in 13ms:
/workspace/tellsh
?? review/final-claude.md
?? review/final-codex.md
 .gitignore                                   |    11 +
 EVAL.md                                      |   589 +-
 HYBRID.md                                    |   617 ++
 README.md                                    |   232 +-
 bin/tellsh.js                                |     3 +
 data/blind/compose.jsonl                     |    58 +
 data/blind/e2e.jsonl                         |   207 +
 data/blind/history.jsonl                     |    79 +
 data/blind/intents.jsonl                     |   844 ++
 data/blind/ood.jsonl                         |    64 +
 data/candidates/ood_new.jsonl                |   464 +
 data/candidates/paraA.jsonl                  |  1329 +++
 data/candidates/paraB.jsonl                  |  1220 +++
 data/eval_baseline_v0.2.json                 |    56 +
 data/eval_v04/devtools.jsonl                 |   424 +
 data/history/eval.jsonl                      |     7 +-
 data/hybrid/blind/blind_en.jsonl             |   331 +
 data/hybrid/blind/blind_ood.jsonl            |    40 +
 data/hybrid/blind/blind_pl.jsonl             |   310 +
 data/intents/g06_teacher.jsonl               |  1911 ++++
 data/intents/g07_hardneg.jsonl               |   463 +
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
 hybrid/results/results.json                  |  2905 ++++++
 hybrid/results/results_ft.json               |  1630 ++++
 hybrid/results/sizes.json                    |    21 +
 hybrid/results/v04_after.json                |  2996 +++++++
 hybrid/results/v04_after_ft.json             |  2945 ++++++
 hybrid/results/v04_before.json               |  2996 +++++++
 hybrid/results/v04_before_ft.json            |  2913 ++++++
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
 review/r1-codex.md                           |  9854 +++++++++++++++++++++
 review/r10-claude.md                         |    49 +
 review/r10-codex.md                          |  8707 ++++++++++++++++++
 review/r11-claude.md                         |    53 +
 review/r11-codex.md                          |  9592 ++++++++++++++++++++
 review/r12-claude.md                         |    37 +
 review/r12-codex.md                          | 10887 +++++++++++++++++++++++
 review/r13-claude.md                         |    37 +
 review/r13-codex.md                          |  7148 +++++++++++++++
 review/r14-claude.md                         |    34 +
 review/r14-codex.md                          |  9586 ++++++++++++++++++++
 review/r15-claude.md                         |    35 +
 review/r15-codex.md                          |  9479 ++++++++++++++++++++
 review/r16-claude.md                         |    39 +
 review/r16-codex.md                          |  9975 +++++++++++++++++++++
 review/r17-claude.md                         |    35 +
 review/r17-codex.md                          | 11097 +++++++++++++++++++++++
 review/r18-claude.md                         |    48 +
 review/r18-codex.md                          |  7397 ++++++++++++++++
 review/r19-claude.md                         |    45 +
 review/r19-codex.md                          |  8667 ++++++++++++++++++
 review/r2-claude.md                          |    84 +
 review/r2-codex.md                           |  8616 ++++++++++++++++++
 review/r20-claude.md                         |    64 +
 review/r20-codex.md                          | 10016 +++++++++++++++++++++
 review/r21-claude.md                         |    55 +
 review/r21-codex.md                          |  8028 +++++++++++++++++
 review/r22-claude.md                         |    72 +
 review/r22-codex.md                          |  9835 +++++++++++++++++++++
 review/r23-claude.md                         |    48 +
 review/r23-codex.md                          | 11782 +++++++++++++++++++++++++
 review/r3-claude.md                          |    63 +
 review/r3-codex.md                           |  8281 +++++++++++++++++
 review/r4-claude.md                          |    57 +
 review/r4-codex.md                           |  9505 ++++++++++++++++++++
 review/r5-claude.md                          |    46 +
 review/r5-codex.md                           |  9090 +++++++++++++++++++
 review/r6-claude.md                          |    60 +
 review/r6-codex.md                           | 10443 ++++++++++++++++++++++
 review/r7-claude.md                          |    48 +
 review/r7-codex.md                           | 10037 +++++++++++++++++++++
 review/r8-claude.md                          |    54 +
 review/r8-codex.md                           |  9340 ++++++++++++++++++++
 review/r9-claude.md                          |    53 +
 review/r9-codex.md                           | 10346 ++++++++++++++++++++++
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
 scripts/lib/allowlist_table.js               |    60 +
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
 src/allowlist-data.js                        |   340 +
 src/catalog.js                               |    40 +
 src/cli.js                                   |    48 +-
 src/compose.js                               |   184 +-
 src/danger.js                                |   608 +-
 src/fill.js                                  |   554 +-
 src/history.js                               |  1026 ++-
 src/model.js                                 |    22 +-
 src/pipeline.js                              |   485 +-
 src/render.js                                |    96 +-
 src/rerank/encoder.js                        |   152 +
 src/rerank/hybrid.js                         |   112 +
 src/rerank/tokenizer.js                      |    92 +
 src/shellwords.js                            |   101 +-
 src/slots.js                                 |   119 +-
 src/tagger.js                                |    55 +-
 src/tools.js                                 |    12 +-
 src/variants.js                              |    37 +
 test/allowlist.test.js                       |     9 +
 test/compose.test.js                         |    50 +
 test/danger.test.js                          |     6 +-
 test/devtools.test.js                        |    98 +
 test/fixtures/parity.json                    |     2 +-
 test/hybrid.test.js                          |    46 +
 test/pipeline.test.js                        |     8 +-
 test/regressions.test.js                     |    12 +-
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
 test/regressions2.test.js                    |   325 +
 test/regressions20.test.js                   |   117 +
 test/regressions21.test.js                   |    70 +
 test/regressions22.test.js                   |    98 +
 test/regressions23.test.js                   |   101 +
 test/regressions24.test.js                   |   121 +
 test/regressions25.test.js                   |   163 +
 test/regressions3-history.test.js            |    87 +
 test/regressions3-render.test.js             |   150 +
 test/regressions3.test.js                    |    46 +
 test/regressions4.test.js                    |   201 +
 test/regressions5.test.js                    |   147 +
 test/regressions6.test.js                    |   171 +
 test/regressions7.test.js                    |   145 +
 test/regressions8.test.js                    |   201 +
 test/regressions9.test.js                    |   200 +
 test/shells.test.js                          |     8 +-
 246 files changed, 259288 insertions(+), 817 deletions(-)

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

import { ALLOW } from './allowlist-data.js';

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
const baseName = (w) => String(w).replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();

/**
 * The shape of one simple command: { head, key (head + known subcommand words), flags, assign, rest }.
 * `known(key)` says whether a longer key exists (checking); without it the subcommand words are taken up to SUB_DEPTH
 * (building the allowlist from rendered templates, where `literal(w)` tells a template word from an inserted value).
 */
export function commandShape(words, { known, literal = () => true } = {}) {
  let i = 0;
  const assign = [];
  while (i < words.length && /^[A-Za-z_]\w*=/.test(words[i])) assign.push(words[i++]);
  const head = baseName(words[i] ?? '');
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
// a piece of a PowerShell expression the tokenizer splits off (`$_.Length -gt 1MB`, `.Count`, `-Force`, `[math]::Round`):
// not a program (a `$`-named program is high risk by the rule above)
export const FRAGMENT = /^(?:[$@[(,*{}<%]|-|\d|\.[\w.:])|,$/;

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
  for (let words of [...simpleCommands(command), ...simpleCommands(command, { winPaths: true })]) {
    while (words.length && KEYWORDS.has(String(words[0]).toLowerCase())) words = words.slice(1);
    if (!words.length || FRAGMENT.test(String(words[0]))) continue;
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

/** @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}} */
export function checkDanger(command, baseRisk = 'safe', { lenient = false, allowlist = null } = {}) {
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
    // the allowlist judges the command as written (a wrapper around a payload is already high); payloads get the deny rules
    const d = checkDanger(c, 'safe', { allowlist: { off: true } });
    for (const m of d.warnings) hit(d.risk, m, d.critical);
  }
  for (const [re, r, msg, crit] of RULES) if (re.test(text)) hit(r, msg, crit);
  if (!lenient && !allowlist?.off) for (const m of allowlistProblems(command, { extra: allowlist?.extra })) hit('high', m);
  return { risk, warnings, critical };
}

exec
/bin/bash -lc 'cat package.json; cat src/cli.js; cat src/pipeline.js' in /workspace/tellsh
exec
/bin/bash -lc 'git diff 0d87457..HEAD -- src/render.js src/shellwords.js src/slots.js src/tagger.js; cat review/close-fix.md; cat review/fix22-log.md' in /workspace/tellsh
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
  args: () => false, pr: (v) => RAW_OK.pr(v), repo: (v) => RAW_OK.repo(v), wenv: (v) => RAW_OK.wenv(v), dryrun: (v) => RAW_OK.dryrun(v), delbranch: (v) => RAW_OK.delbranch(v), npmverb: (v) => RAW_OK.npmverb(v),
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
  for (const k of ['pkg', 'name', 'service', 'container', 'cmd', 'branch', 'user', 'pr', 'repo', 'wenv', 'num', 'args']) {
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

 succeeded in 0ms:
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
Both rules are in and committed as `d1e2850` on `master`. Nothing was pushed or published, and no secrets were printed. All 392 tests pass, `npm run eval` sections are unchanged, and bench was rerun.

**Rule 1: placeholders for gh and wrangler**
- Every word in a gh/wrangler request must be a command word, a filler word, a shell name, or part of a value tellsh read with confidence. Anything else turns into a placeholder you fill in (`<PR>`, `<WENV>`, `<NUM>` or `<ARGS>`), never a guess and never a bare command.
- A value you typed explicitly (PR 45, a URL, `--env staging`) is kept unless a second value competes with it, as in "merge pr 45 or 46".
- An environment you exclude never becomes the target: "deploy worker but not to production" gives `--env <WENV>`.
- This fixes the four open majors in `review/r23-codex.md`:
  - "deploy worker in preview2" now gives `--env <WENV>`.
  - "set worker secret API_KEY --env staging" now keeps `--env staging`.
  - "install the project dependencies with npm" now gives `npm install`.
  - "create a pull request in repo acme/app" now gives `--repo acme/app`.
- Along the way, `--env` was added to `wrangler dev`, `tail` and `secret put`, `--repo` to `gh pr create`, `gh pr list`, `gh run list` and `gh run view`, and `--delete-branch` to merges. "npm ci" and "a clean install" now give `npm ci`.
- Several r23 minors are fixed too:
  - "show me the pr at <url>"-style lead-ins now keep the URL.
  - "reopen pr" and "mark pr as ready" are refused instead of creating a PR.
  - "merge <pr url>" now gives `gh pr merge` instead of `git clone`.
  - A typed `gh pr view 42` keeps its number.

**Rule 2: the danger checker is now an allowlist**
- Only commands, subcommands and flags that the catalog itself produces, for every shell, count as known. That list is generated by `scripts/build_allowlist.js` into `src/allowlist-data.js`, and a test fails if it goes stale.
- Any wrapper, any `FOO=1 cmd` prefix, and any unknown program, subcommand or flag is high risk and needs an explicit "yes". The old deny rules still run on top.
- **sudo now counts as a wrapper, as you specified.** 27 catalog commands that go through sudo moved from medium to high, mostly service start/stop, `apt install`, `chown` and `dmesg`. That's one line to change if you'd rather exempt plain sudo.
- Old tests that asserted commands outside the catalog were "safe" now check the deny rules alone. A separate test checks that every catalog command passes the allowlist, apart from its sudo, `bash -c` and `xargs` wrappers.

**Measured effect**
- Dev-tools eval exact matches went from 288 to 294 out of 324.
- Three of those rows now differ from their expected answer. "show live logs from the worker in production" now gives `npx wrangler tail --env production`, and the two Polish production phrasings give `--env <WENV>`. In all three the expected command has no `--env`.
- The cost is placeholders: of the 1,097 gh/wrangler phrasings in the training and eval data, 103 now end in a placeholder, up from 57. Harmless wordings with an unlisted word, like "run the worker on localhost:8787", now need you to fill or delete `<ARGS>`.
- Composed commands stay medium (43 of 43).
- Warm latency p50 went from 0.409 ms to 0.421 ms.
- I couldn't rerun the v0.4 section of EVAL.md, because it needs the private real-usage data and the neural encoder.

**Known limits** is a new section in both README and EVAL.md. It covers the hand-written vocabulary, options the commands still can't express (`--draft`, `--base`, `--label`, `--squash`, …), the fact that rule 1 only covers gh, wrangler and `npm install`, and that safe edits using flags tellsh never produces are flagged high.

The commit is authored as `lksrz <lukasz@wearfits.com>` to match the repo history. This machine has no git identity configured, so I passed it for this one commit without changing any config. `review/close-fix.md` was empty and untracked, so I left it out, as earlier rounds did.

Three connectors (Cloudflare Developer Platform, Home, cnvs.app) still need authorizing in your claude.ai connector settings before they can be used; this task didn't need them.
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

import { ALLOW } from './allowlist-data.js';

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
const baseName = (w) => String(w).replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();

/**
 * The shape of one simple command: { head, key (head + known subcommand words), flags, assign, rest }.
 * `known(key)` says whether a longer key exists (checking); without it the subcommand words are taken up to SUB_DEPTH
 * (building the allowlist from rendered templates, where `literal(w)` tells a template word from an inserted value).
 */
export function commandShape(words, { known, literal = () => true } = {}) {
  let i = 0;
  const assign = [];
  while (i < words.length && /^[A-Za-z_]\w*=/.test(words[i])) assign.push(words[i++]);
  const head = baseName(words[i] ?? '');
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
// a piece of a PowerShell expression the tokenizer splits off (`$_.Length -gt 1MB`, `.Count`, `-Force`, `[math]::Round`):
// not a program (a `$`-named program is high risk by the rule above)
export const FRAGMENT = /^(?:[$@[(,*{}<%]|-|\d|\.[\w.:])|,$/;

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
  for (let words of [...simpleCommands(command), ...simpleCommands(command, { winPaths: true })]) {
    while (words.length && KEYWORDS.has(String(words[0]).toLowerCase())) words = words.slice(1);
    if (!words.length || FRAGMENT.test(String(words[0]))) continue;
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

/** @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}} */
export function checkDanger(command, baseRisk = 'safe', { lenient = false, allowlist = null } = {}) {
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
    // the allowlist judges the command as written (a wrapper around a payload is already high); payloads get the deny rules
    const d = checkDanger(c, 'safe', { allowlist: { off: true } });
    for (const m of d.warnings) hit(d.risk, m, d.critical);
  }
  for (const [re, r, msg, crit] of RULES) if (re.test(text)) hit(r, msg, crit);
  if (!lenient && !allowlist?.off) for (const m of allowlistProblems(command, { extra: allowlist?.extra })) hit('high', m);
  return { risk, warnings, critical };
}

exec
/bin/bash -lc 'cat test/regressions25.test.js; cat scripts/lib/allowlist_table.js; cat test/allowlist.test.js' in /workspace/tellsh
 succeeded in 0ms:
// Regression tests for round 24 (v0.3 close): the round-23 findings (review/r23-codex.md, review/r23-claude.md), fixed by
// two design rules instead of more special cases.
//  (1) gh / wrangler selector rule: a request is read against a closed vocabulary; a word that neither the vocabulary nor
//      a value that was read explains (descriptive, quoted, uncertain) withholds the selector as a placeholder the user
//      fills (`<PR>`, `<WENV>`, `<NUM>`, `<ARGS>`), never a guess and never a bare command.
//  (2) the danger checker is an allowlist: only the commands / subcommands / flags the catalog renders are trusted; any
//      wrapper, environment assignment, unknown program, subcommand or flag is high risk (confirmation needed).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { checkDanger, allowlistProblems } from '../src/danger.js';

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

test('major: an environment after "in" / "on" is withheld, never dropped for the default target', () => {
  for (const env of SHELLS) {
    for (const q of ['deploy worker in preview2', 'deploy worker on qa_1', 'deploy the worker in customer-a', 'deploy worker on the eu cluster']) {
      withheld(run(q, null, env), 'npx wrangler deploy --env <WENV>', 'wenv', `${env.shell}: ${q}`);
    }
    // read environments stay as they were
    exact(run('deploy worker to staging', null, env), 'npx wrangler deploy --env staging', env.shell);
    exact(run('deploy worker to preview2', null, env), 'npx wrangler deploy --env preview2', env.shell);
    exact(run('deploy the worker', null, env), 'npx wrangler deploy', env.shell);
  }
});

test('major: a secret update keeps the environment it names (or withholds it)', () => {
  for (const env of SHELLS) {
    for (const q of ['set worker secret API_KEY --env staging', 'set worker secret API_KEY for staging', 'put secret API_KEY on the staging environment']) {
      exact(run(q, null, env), 'npx wrangler secret put API_KEY --env staging', `${env.shell}: ${q}`);
    }
    withheld(run('set worker secret API_KEY in preview2', null, env), 'npx wrangler secret put API_KEY --env <WENV>', 'wenv', env.shell);
    exact(run('set the API_KEY secret on the worker', null, env), 'npx wrangler secret put API_KEY', env.shell);
  }
  // the other wrangler commands take --env too
  exact(run('tail worker logs for production'), 'npx wrangler tail --env production');
});

test('major: a dependency install never makes up a package name', () => {
  for (const env of SHELLS) {
    for (const q of ['install the project dependencies with npm', 'install dependencies with npm', 'install npm dependencies',
      'npm install the deps for this repo', 'zainstaluj zaleznosci projektu', 'install dependencies from package.json']) {
      exact(run(q, null, env), 'npm install', `${env.shell}: ${q}`);
    }
    for (const q of ['npm ci', 'do a clean install with npm']) exact(run(q, null, env), 'npm ci', `${env.shell}: ${q}`);
    exact(run('add express to the project with npm', null, env), 'npm install express', env.shell);
    exact(run('install lodash via npm', null, env), 'npm install lodash', env.shell);
  }
});

test('major: pr creation keeps the repository (or withholds it); anything else it cannot express is a placeholder', () => {
  for (const env of SHELLS) {
    exact(run('create a pull request in repo acme/app', null, env), 'gh pr create --fill --repo acme/app', env.shell);
    withheld(run('create a pull request in the other repo', null, env), 'gh pr create --fill --repo <REPO>', 'repo', env.shell);
    for (const q of ['create a pr into develop', 'create a draft pr', 'create a pr with reviewer bob']) {
      withheld(run(q, null, env), 'gh pr create --fill <ARGS>', 'args', `${env.shell}: ${q}`);
    }
    exact(run('create a pull request', null, env), 'gh pr create --fill', env.shell);
  }
});

test('rule 1: descriptive, picked-out or unknown selectors are placeholders for every gh / wrangler command', () => {
  for (const env of SHELLS) {
    for (const [q, cmd, slot] of [
      ['merge the pr about auth', 'gh pr merge <PR>', 'pr'],
      ['merge the pr from the payments team', 'gh pr merge <PR>', 'pr'],
      ['view the pr bob opened', 'gh pr view <PR>', 'pr'],
      ['show checks of the flaky pr', 'gh pr checks <PR>', 'pr'],
      ['list prs with label bug', 'gh pr list <ARGS>', 'args'],
      ['list closed prs', 'gh pr list <ARGS>', 'args'],
      ['deploy worker in 2-3 minutes', 'npx wrangler deploy <ARGS>', 'args'],
    ]) withheld(run(q, null, env), cmd, slot, `${env.shell}: ${q}`);
    // explicit selectors stay; a word that only describes the command does not withhold them
    exact(run('merge pr 42', null, env), 'gh pr merge 42', env.shell);
    exact(run('merge pr 45 in repo acme/app', null, env), 'gh pr merge 45 --repo acme/app', env.shell);
    exact(run('merge pr 45 and delete the branch', null, env), 'gh pr merge 45 --delete-branch', env.shell);
    exact(run('list open prs', null, env), 'gh pr list', env.shell);
    exact(run('merge pr 42 in PowerShell', null, env), 'gh pr merge 42', env.shell);
  }
  // a second number competes with an explicit one: withheld
  withheld(run('merge pr 45 or 46'), 'gh pr merge <PR>', 'pr');
});

test('rule 1: an environment the request excludes is never the target', () => {
  for (const env of SHELLS) {
    for (const q of ['deploy worker but not to production', 'deploy worker, not to prod', "don't deploy worker to prod",
      'deploy worker to staging, not production', 'wdróż workera ale nie na produkcję']) {
      withheld(run(q, null, env), 'npx wrangler deploy --env <WENV>', 'wenv', `${env.shell}: ${q}`);
    }
  }
  // a negated dry run is still a plain deploy
  exact(run('deploy worker without a dry run'), 'npx wrangler deploy');
  exact(run('deploy the worker, not a dry run'), 'npx wrangler deploy');
});

test('minor (r23): url lead-ins, reopen / ready, merge <url>', () => {
  const url = 'https://github.com/acme/app/pull/12';
  exact(run(`show me the pr at ${url}`), `gh pr view ${url}`);
  exact(run(`can you merge the pr at ${url}`), `gh pr merge ${url}`);
  exact(run(`merge the pr (${url})`), `gh pr merge ${url}`);
  exact(run(`merge pr, url: ${url}`), `gh pr merge ${url}`);
  withheld(run(`merge the pr that depends on ${url}`), 'gh pr merge <PR>', 'pr');
  for (const q of [`merge ${url}`, `squash merge ${url}`, `i want to merge ${url}`]) exact(run(q), `gh pr merge ${url}`, q);
  for (const q of ['reopen pr', 'mark pr as ready']) {
    const r = run(q);
    assert.notEqual(r.command, 'gh pr create --fill', q);
    assert.equal(r.understood, false, q);
  }
});

test('rule 2: wrappers, assignments, unknown programs, subcommands and flags are high risk', () => {
  for (const c of ['sudo ls', 'timeout 5 ls', 'env FOO=1 ls', 'nohup node server.js', 'xargs -n1 echo', 'bash -c "ls"', 'FOO=1 ls',
    'mywrap ls', 'cowsay hi', 'git filter-branch', 'npx cowsay', 'npx wrangler delete', 'gh pr close 3', 'docker compose rm -f',
    'gh pr merge 12 --admin', 'git push --force-with-lease', 'rm -P f', 'ls --hyperlink=always', 'ssh host uptime', 'git -C /x status']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', `${c}: ${d.warnings.join('; ')}`);
    assert.ok(allowlistProblems(c).length > 0, c);
  }
  // known commands and flags: no allowlist problem (option clusters and attached numbers included)
  for (const c of ['ls -la', 'ls -lah /tmp', 'git status', 'git push origin main', 'tail -n5 f.txt', 'gh pr merge 12 --repo a/b --delete-branch',
    'npx wrangler deploy --dry-run --env staging', 'docker compose up -d', 'env | sort', 'ssh -N -L 8080:localhost:8080 example.com',
    'find /tmp -type f -iname "*.log" -mtime -3', 'grep -rn --include="*.js" -- TODO src', 'npm ci', 'node --version']) {
    assert.deepEqual(allowlistProblems(c), [], c);
  }
  // the allowlist only escalates: a deny rule still fires on a known command
  assert.equal(checkDanger('rm -rf /').critical, true);
});

test('rule 2: every catalog command is on the allowlist (only its sudo, bash -c and xargs wrappers escalate)', async () => {
  const { INTENTS } = await import('../src/catalog.js');
  const { buildCommand } = await import('../src/fill.js');
  const V = { path: 'dir', file: 'f.txt', src: 'a.txt', dst: 'b.txt', dest: 'd', archive: 'x.tar.gz', count: 5, depth: 2, size: '10M',
    age: '-mtime -3', days: 3, port: 8080, pid: 1234, mode: '755', var: 'FOO', name: 'foo', service: 'nginx', container: 'web', pkg: 'htop',
    cmd: 'node', branch: 'dev', user: 'bob', pattern: 'err', host: 'example.com', target: 'example.com', message: 'msg', url: 'https://x.org/r.git',
    text: 'hi', ext: 'log', old: 'a', new: 'b', start: 1, end: 5, num: 7, pr: '12', repo: 'a/b', wenv: 'staging', dryrun: '--dry-run', script: 'dev' };
  const bad = [];
  for (const it of INTENTS) {
    for (const env of [BASH, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'fish', os: 'linux' }, { shell: 'powershell', os: 'win32' }, { shell: 'cmd', os: 'win32' }]) {
      const r = buildCommand(it.id, '', { env, resolved: { ...V } });
      if (!r.command) continue;
      const p = allowlistProblems(r.command).filter((m) => !/^runs another command through a wrapper \((?:sudo|bash|xargs)\)/.test(m));
      if (p.length) bad.push(`${it.id}/${env.shell}: ${r.command} -> ${p.join('; ')}`);
    }
  }
  assert.deepEqual(bad, []);
});

test('a literal gh command keeps its pull request (the subcommand word is not a selector)', () => {
  for (const [q, cmd] of [['gh pr view 42', 'gh pr view 42'], ['gh pr merge 118', 'gh pr merge 118'], ['odpal gh pr merge 118', 'gh pr merge 118'],
    ['gh pr checks 7', 'gh pr checks 7'], ['gh pr view', 'gh pr view'], ['gh pr merge', 'gh pr merge']]) exact(run(q), cmd, q);
});
// The allowlist table (see scripts/build_allowlist.js): every catalog intent rendered for every shell with marked values,
// tokenised like the danger checker reads commands.
import { INTENTS } from '../../src/catalog.js';
import { buildCommand } from '../../src/fill.js';
import { simpleCommands, commandShape, SUB_DEPTH, KEYWORDS, FRAGMENT } from '../../src/danger.js';
import { KNOWN_TOOLS } from '../../src/slots.js';

const V = { path: 'zqdir', file: 'zqf.txt', src: 'zqa.txt', dst: 'zqb.txt', dest: 'zqd', archive: 'zqx.tar.gz', count: 5, depth: 2, size: '10M',
  age: '-mtime -3', days: 3, since: '3 days ago', port: 8080, pid: 1234, mode: '755', var: 'ZQVAR', name: 'zqname', service: 'zqsvc',
  container: 'zqctr', pkg: 'zqpkg', cmd: 'zqcmd', branch: 'zqbranch', user: 'zquser', pattern: 'zqpat', host: 'zqhost.example',
  target: 'zqhost.example', message: 'zqmsg', url: 'https://zq.example/r.git', text: 'zqtext', ext: 'log', old: 'zqold', new: 'zqnew',
  start: 1, end: 5, num: 7, pr: '12', repo: 'zqo/zqr', wenv: 'zqenv', dryrun: '--dry-run', delbranch: '--delete-branch', script: 'zqscript',
  glob: '*.log', minutes: 5, sizeBytes: 1000 };
const ENVS = [
  { shell: 'bash', os: 'linux', coreutils: 'gnu' }, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'bash', os: 'darwin', coreutils: 'bsd' },
  { shell: 'sh', os: 'linux', coreutils: 'gnu' }, { shell: 'fish', os: 'linux', coreutils: 'gnu' }, { shell: 'fish', os: 'darwin', coreutils: 'bsd' },
  { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, { shell: 'powershell', os: 'linux', coreutils: 'gnu' }, { shell: 'powershell', os: 'darwin', coreutils: 'bsd' },
  { shell: 'cmd', os: 'win32', coreutils: 'gnu' },
];
const literal = (w) => !/zq/i.test(w);

export function allowlistTable() {
  const table = {};
  const put = (key, flag) => { const s = (table[key] ??= new Set()); if (flag != null) s.add(flag); };
  for (const it of INTENTS) {
    for (const env of ENVS) {
      // with every optional value and with none, so both forms of each template are seen
      for (const resolved of [{ ...V }, { ...V, npmverb: 'ci' }, {}]) {
        let r;
        try { r = buildCommand(it.id, '', { env, resolved }); } catch { continue; }
        if (!r.command) continue;
        for (const words of [...simpleCommands(r.command), ...simpleCommands(r.command, { winPaths: true })]) {
          let w = words;
          while (w.length && KEYWORDS.has(String(w[0]).toLowerCase())) w = w.slice(1);
          if (!w.length || FRAGMENT.test(String(w[0])) || !literal(w[0])) continue; // `{cmd} --version`: the program is a value (below)
          const sh = commandShape(w, { literal });
          put(sh.key);
          if ((SUB_DEPTH[sh.head] ?? 0) > 0 && sh.key === sh.head && sh.rest.length) put(sh.key, '*sub');
          for (const f of sh.flags) {
            const k = flagKeyOf(sh.head, f);
            put(sh.key, k);
            // a cluster of single-letter options also allows each letter (`ls -lah` -> -l, -a, -h)
            if (/^-[A-Za-z]{2,5}$/.test(f) && sh.head !== 'find' && !/^[a-z]+-[a-z]+$/.test(sh.head)) for (const c of f.slice(1)) put(sh.key, `-${c}`);
          }
        }
      }
    }
  }
  // tool_version / cli_help: `{cmd} --version`, `{cmd} --help` for the tools the request vocabulary knows
  for (const t of KNOWN_TOOLS) { put(t, '--version'); put(t, '--help'); }
  return Object.fromEntries(Object.entries(table).map(([k, s]) => [k, [...s].sort()]));
}
// the same normalisation as the checker (src/danger.js flagKey)
function flagKeyOf(head, f) {
  let x = String(f);
  if (/^--[^=]+=/.test(x)) x = x.replace(/=.*$/s, '=');
  else if (/^\/[A-Za-z?]{1,2}:/.test(x)) x = x.replace(/:.*$/s, ':');
  else if (/^-[A-Za-z]\d+$/.test(x)) x = x.replace(/\d+$/, '#');
  return /^[a-z]+-[a-z]+$/.test(head) ? x.toLowerCase() : x;
}
// The allowlist of the danger checker (src/allowlist-data.js) is generated from the catalog: it must match the templates.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ALLOW } from '../src/allowlist-data.js';
import { allowlistTable } from '../scripts/lib/allowlist_table.js';

test('src/allowlist-data.js is up to date with the catalog (node scripts/build_allowlist.js)', () => {
  assert.deepEqual(ALLOW, allowlistTable());
});

exec
/bin/bash -lc "rg -n 'gh|wrangler|WENV|unknown|uncertain|ARGS' src/fill.js src/pipeline.js; sed -n '1,250p' src/fill.js" in /workspace/tellsh
 succeeded in 0ms:
src/pipeline.js:66:/** `v` appears in `text` right after a destination word ("to /tmp/old", "into backup", "do /tmp/old"). */
src/pipeline.js:121:/** Values recovered from history go through the same validation as classifier/regex values. */
src/pipeline.js:150:  // "delete the folder out", "du of folder out sorted by size": a stop word right after the noun is its name
src/pipeline.js:339:  if (intent === 'git_clone' && !sb && !ref && PR_URL.test(query) && mergeAsked(query)) intent = 'gh_pr_merge';
src/pipeline.js:388:  // "close that pr", "close pr 45": the catalog has no command that closes a pull request; the opposite one (`gh pr create`)
src/pipeline.js:389:  // or another one (`gh pr view 45`) is never suggested in its place
src/pipeline.js:390:  // "close pr 45 and delete branch", "close pr 45 without merge": refused for gh_pr_merge too, unless the request also asks
src/pipeline.js:391:  // for the merge ("merge and close pr 45"); "do not merge pr 45", "unmerge pr 45": never `gh pr merge 45`
src/pipeline.js:393:  const merges = intent === 'gh_pr_merge' && mergeAsked(query);
src/pipeline.js:394:  // "revert pr 45": not `gh pr view 45` either
src/pipeline.js:395:  if (intent?.startsWith('gh_pr_') && /\brevert\w*\b/i.test(query) && !merges) {
src/pipeline.js:396:    return { ...out, understood: false, method: 'none', hint: 'reverting a pull request is not supported (gh pr revert <PR>)' };
src/pipeline.js:398:  // "approve pr", "open pr in web": approving or viewing a pull request, never `gh pr create` (which publishes a new one)
src/pipeline.js:399:  if (intent === 'gh_pr_create' && !PR_CREATE_WORD.test(query) && PR_NOT_CREATE.test(query)) {
src/pipeline.js:400:    return { ...out, understood: false, method: 'none', hint: 'approving, reopening, marking ready or opening an existing pull request is not supported (gh pr review --approve <PR>, gh pr reopen <PR>, gh pr ready <PR>, gh pr view --web <PR>); not suggesting gh pr create' };
src/pipeline.js:402:  if (intent?.startsWith('gh_pr_') && ((closes && !merges) || (intent === 'gh_pr_merge' && !merges && [...query.matchAll(MERGE_WORD)].length))) {
src/pipeline.js:403:    const hint = closes ? 'closing a pull request is not supported (gh pr close <PR>)' : 'the request does not ask for a merge (it negates or undoes one); not suggesting gh pr merge';
src/pipeline.js:416:  // invalid (`gh pr merge <PR>` for "same but merge" after `tellsh merge pr nightly`, never the current branch's pull request)
src/pipeline.js:510:    // `<PR>` even then (left out, `gh pr merge` would act on the current branch's)
src/pipeline.js:532:    // (a pull request keeps its `<PR>`: left out, `gh pr merge` would act on the current branch's)
src/pipeline.js:587:  // value without an explicit reference word ("delete it"), which goes through resolveReference.
src/fill.js:25:  // a repository as gh -R takes it: [HOST/]OWNER/REPO
src/fill.js:29:  // a wrangler environment name (wrangler.toml [env.NAME])
src/fill.js:31:  // a part of a gh / wrangler request the command does not express: always the user's to fill (`<ARGS>`)
src/fill.js:34:  // a pull request as gh selects it: number, URL or head branch
src/fill.js:45:// another unmarked word, `nightly`, is withheld
src/fill.js:46:const PR_NOT_SELECTOR = /^(?:the|a|an|this|that|it|its|my|our|your|their|me|us|you|him|her|them|and|or|then|now|please|pls|into|to|with|without|in|at|by|is|was|which|again|request|requests|status|state|checks?|details?|info|summary|description|diff|changes|comments?|github|gh|web|browser|online|here|there|today|yesterday|tomorrow|earlier|later|review|fork|upstream|fast|asap|already|first|too|also|quickly|immediately|directly|safely|manually|automatically|finally|only|just|really|simply|properly|carefully|right|soon|instantly|issues?|tickets?|bugs?)$/i;
src/fill.js:53:// a number names the pull request only right after "pr" / "pull request" (`pr 45`, `pr #45`, `pr number 45`) or as `#45`
src/fill.js:65:const PR_QUALIFIED = /^\s*(?:in\s+question\b|(?:by|from|since|before|after|about|titled|named|called|that|which|who|whose|where|od|autorstwa)\b|(?:\S+\s+)?(?:opened|created|authored|submitted|raised|written|made|sent|pushed|filed)\b)|\b(?:yesterday|today|tonight|tomorrow|ago|last\s+(?:week|month|year|night|friday|monday|tuesday|wednesday|thursday|saturday|sunday)|wczoraj\w*|dzisiaj|dzi[sś])\b/i;
src/fill.js:71:const PR_WHEN = /^(?:last|this|next|past|previous|previously|before|earlier|ages|recently|lately|week|month|year|morning|afternoon|evening|night|weekend|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun|january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec|ago|wczoraj\w*|dzisiaj|przedwczoraj|zesz\w*|poprzedni\w*|wcze\w*)$/i;
src/fill.js:76:const PR_DET_NEUTRAL = /^(?:current|branch|branch's|branch’s|own|one|same|previous|last|prior|single|github|gh|pull|this|that|the|my|our|bieżący\w*|biezacy\w*|obecn\w*|aktualn\w*|mój|moj\w*|nasz\w*|sw[oó]j|swoj\w*|ten|tego)$/i;
src/fill.js:81:const PR_FILLER = /^(?:please|pls|now|then|just|and|also|out|up|go|ahead|to|it|tamten|that|this|ten|tego|gh|github|pull|i|you|can|could|would|will|let's|lets|me|us|want|need|prosz[eę]|teraz|i|oraz|a)$/i;
src/fill.js:95:const PR_AFTER_NEUTRAL = /^(?:$|-\S*|github|gh|web|browser|online|cli|terminal|here|this|current|same|local|repo|repository|squash|squashing|rebase|rebasing|merge|merging|auto|automerge|auto-merge|admin|review|me|us|it|now|please|pls|main|master|default|teraz|prosz[eę]|githubie|przegl[aą]darce)$/i;
src/fill.js:109:// wrangler deploy: "dry run", "--dry-run", "na sucho", "without (actually) deploying/publishing" (wrangler deploy --dry-run);
src/fill.js:114:const wranglerDry = (t) => WR_DRY.test(t.replace(WR_DRY_NOT, ' '));
src/fill.js:118:// file", "my environment is set" never make up `--env worker/with/is` (the environment is withheld, `<WENV>`); a plain
src/fill.js:119:// unknown word after "to" ("to cloudflare") is not an environment
src/fill.js:143:/** The wrangler environment a deploy request names: a name, `?` (named, not readable) or null (the default). */
src/fill.js:144:function wranglerEnv(t) {
src/fill.js:174:// gh / wrangler selector rule (v0.3): a request is read against a closed vocabulary. Every word must be a command word of
src/fill.js:178:// (`gh pr merge <PR>`, `npx wrangler deploy --env <WENV>`, `gh pr create --fill <ARGS>`), never guessed and never dropped
src/fill.js:187:  to on in into onto for from of at with by via using through over up out as
src/fill.js:191:  right away asap today actually real really properly correctly give get tell print read see show display
src/fill.js:203:  gh: SEL_WORDS(`project projekt* scopes scope scope'y token valid details szczegol* uwierzytelnion* authenticated logged zalogowan* stan setup flow tool narzedzi* credentials danymi dane konfiguracj* first-time pierwsza feature ficzer messages message description opis* commit* pushed wypchnalem wypchnij* turn zamien* tests testy pass przechodza zacznij pracy wrzuc* queue kolejce outstanding enumerate wymien* lately succeed* ran today dzis few kilka overview executions status statusem najnowszych runow odpalily wylistowac gh github* git hub
src/fill.js:207:  wrangler: SEL_WORDS(`project projekt* zdeploy* session sesj* instance instancj* function funkcj* log* authenticated configured skonfigurowan* oauth browser przegladar* expired wygasl* valid wazn* details szczegol* using uzywa* uzywam account* konta konto koncie organizac* org tozsamosc* aktualn* say env environment environments srodowisk* called named nazwie npx wrangler* cloudflare* cf worker workers worker's workera workerze workerem workerow workerowi`),
src/fill.js:210:  gh_pr_merge: SEL_WORDS(`merge* land squash squash-merge squashing rebase rebasing auto automerge auto-merge admin
src/fill.js:213:  gh_pr_view: SEL_WORDS(`view details detail info information diff description summary web browser online przegladarce przegladarka
src/fill.js:215:  gh_pr_checks: SEL_WORDS(`tests test build builds passing passed failing failed pass fail green red results result
src/fill.js:218:  gh_pr_create: SEL_WORDS(`create creating make new submit raise file send open put start propose utworz* stworz* zaloz* wystaw*
src/fill.js:220:  gh_pr_list: SEL_WORDS(`pry list listing all open opened pending show which there any lista liste wylistuj* listuj* wszystkie otwarte otwartych`),
src/fill.js:221:  gh_run_list: SEL_WORDS(`list listing recent recently latest last all show workflow workflows run runs action actions ci pipeline pipelines
src/fill.js:224:  gh_run_view: SEL_WORDS(`view details logs log output failed failing failure why workflow run runa runie action ci pipeline build job
src/fill.js:226:  gh_auth_status: SEL_WORDS(`auth authenticated authentication logged log login signed sign status who account whoami am which user
src/fill.js:229:  gh_auth_login: SEL_WORDS(`not nie auth authenticate authentication log login sign signin zaloguj* zalogowac logowani* konto account
src/fill.js:231:  wrangler_deploy: SEL_WORDS(`depl* redeploy publish* ship push release upload go wdroz* zdeployuj* deployuj* opublikuj* wypchnij*
src/fill.js:234:  wrangler_dev: SEL_WORDS(`dev develop development locally local server serve start preview mode lokaln* serwer* uruchom* odpal*
src/fill.js:236:  wrangler_tail: SEL_WORDS(`thrown right now teraz tail* logs log live stream* realtime real-time watch follow logi logow zywo strumien*
src/fill.js:239:  wrangler_secret_put: SEL_WORDS(`new nowy nowa nowe push wypchnij* secret secrets set put add store save update change create rotate register encrypted configure sekret*
src/fill.js:241:  wrangler_login: SEL_WORDS(`not nie kont* konc* podlacz* login log sign signin re-login authenticate re-authenticate authentication auth authorize account konto kontem
src/fill.js:243:  wrangler_whoami: SEL_WORDS(`whoami who account logged log signed status which user am konto konta koncie zalogowan* kim kto jestem
src/fill.js:247:// explained only for the intents that list them (gh_pr_list "open prs", gh_run_list "recent runs"), never by the family
src/fill.js:260:const SEL_SLOT = { gh_pr_merge: 'pr', gh_pr_view: 'pr', gh_pr_checks: 'pr', gh_run_view: 'num' };
src/fill.js:261:export const hasSelectorRule = (intentId) => /^(?:gh|wrangler)_/.test(intentId);
src/fill.js:268: * The words of a gh / wrangler request the vocabulary and the read values do not explain, each with the word before it
src/fill.js:283:  if (/^wrangler_/.test(intentId)) t = t.replace(WR_DRY_NOT, ' ').replace(WR_DRY, ' ');
src/fill.js:290:  if (/^gh_pr_/.test(intentId) && values.pr != null && !String(values.pr).startsWith('?')) t = t.replace(SEL_OTHER_NUMBER, ' ');
src/fill.js:296:    // "merge pr with --squash": an option word the intent knows (gh asks for the merge method itself)
src/fill.js:310: * gh / wrangler selector rule: the slot to withhold (`?`, a placeholder the user fills) for the words of a request
src/fill.js:313: * the pull request (`<PR>`), the run (`<NUM>`), the environment (`<WENV>`, for a word placed as one) or the rest of the
src/fill.js:314: * request (`<ARGS>`).
src/fill.js:327:  if (/^wrangler_/.test(intentId)) {
src/fill.js:348: * pick out clearly ("add express to the project with npm" read as `npm`) is the word right after the install verb, or
src/fill.js:367: * The pull request the user names (quoted: kept as written, validation withholds an odd one), else null (`gh pr merge`
src/fill.js:370: * is withheld (`?`, shown as `<PR>`), never a bare `gh pr merge`.
src/fill.js:401:      // "merge pr main": a bare word may be a branch or say something else: withheld (`gh pr merge <PR>`), never dropped
src/fill.js:432:// without the word "repo" (a value gh -R takes); right after "pr for" / "pr from" / … the word is the branch selector
src/fill.js:436:/** The repository a gh pr request names: { repo (a value, or `?` when it is not readable), rest (the text without it), pr } or null. */
src/fill.js:484:  // "grep for ~/foo in src": the path-like word right after the search verb is the pattern, the other
src/fill.js:547:  // line range: "lines 10-20", "od 10 do 20", "10 to 20", "from line 5 through 9"; else the first two numbers
src/fill.js:549:    const m = String(ex.text).match(/(?<![\w.])(\d{1,9})\s*(?:-|–|—|\.\.|,|:|to|do|through|thru|until|till|and|i)\s*(?:line\s+|linii\s+|linia\s+)?(\d{1,9})(?![\w.])/i);
src/fill.js:561:    // ("in the other repo", "in repo v2") withheld, never dropped; gh needs a pull request named with it
src/fill.js:565:    // dropped for a bare `gh pr merge`, which acts on the current branch's pull request
src/fill.js:566:    // a literal gh command ("gh pr view 42"): its subcommand word is not a selector
src/fill.js:567:    const lit = (t) => String(t).replace(/^(\s*(?:\S+\s+)?)gh\s+pr\s+(?:view|merge|checks)(?=\s|$)/i, '$1pr');
src/fill.js:579:  // "merge pr 45 and delete the branch": gh pr merge --delete-branch
src/fill.js:580:  if (intent.id === 'gh_pr_merge' && PR_DELETE_BRANCH_TEST.test(foldKeepLength(String(ex.text)).toLowerCase())) v.delbranch = '--delete-branch';
src/fill.js:583:    if (wranglerDry(t)) v.dryrun = '--dry-run';
src/fill.js:585:    const w = wranglerEnv(t);
src/fill.js:633:  // gh / wrangler: a word the request has that neither the vocabulary nor a read value explains withholds the selector
src/fill.js:718:  if (!intent) throw new Error(`unknown intent ${intentId}`);
// Turn (intent, slots) into a concrete, safely-quoted command for the target shell.
import { BY_ID } from './catalog.js';
import { extractSlots, pickArg, pickDest, pickDir, foldKeepLength, isStopWord } from './slots.js';
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
  delbranch: (v) => v === '--delete-branch',
  npmverb: (v) => v === 'install' || v === 'ci',
  // a wrangler environment name (wrangler.toml [env.NAME])
  wenv: (v) => /^[A-Za-z0-9][\w-]{0,62}$/.test(String(v)),
  // a part of a gh / wrangler request the command does not express: always the user's to fill (`<ARGS>`)
  args: () => false,
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
const PR_DELETE_BRANCH_TEST = new RegExp(PR_DELETE_BRANCH.source);
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

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {checkDanger} from './src/danger.js';
for (const c of ['echo \""'$(unknown-program)"'"','cat \""'$(touch /tmp/tellsh-allowlist-probe)"'"','echo "'`unknown-program`'"','echo "'$(unknown-program)'"','time unknown-program','.hidden-program','123unknown-program','git stash something-unknown','npx wrangler secret delete KEY']) console.log(JSON.stringify({c,...checkDanger(c)}));
JS" in /workspace/tellsh
 succeeded in 17ms:
{"c":"echo \"$(unknown-program)\"","risk":"safe","warnings":[],"critical":false}
{"c":"cat \"$(touch /tmp/tellsh-allowlist-probe)\"","risk":"safe","warnings":[],"critical":false}
{"c":"echo `unknown-program`","risk":"safe","warnings":[],"critical":false}
{"c":"echo $(unknown-program)","risk":"high","warnings":["unknown command (unknown-program); not on the allowlist"],"critical":false}
{"c":"time unknown-program","risk":"high","warnings":["unknown command (unknown-program); not on the allowlist"],"critical":false}
{"c":".hidden-program","risk":"safe","warnings":[],"critical":false}
{"c":"123unknown-program","risk":"safe","warnings":[],"critical":false}
{"c":"git stash something-unknown","risk":"safe","warnings":[],"critical":false}
{"c":"npx wrangler secret delete KEY","risk":"high","warnings":["unknown subcommand (npx wrangler secret delete); not on the allowlist"],"critical":false}

codex
The allowlist appears to miss commands inside quoted substitutions. I’ll verify that against the CLI’s confirmation logic and check gh/wrangler target selection for silent changes to the requested target.
exec
/bin/bash -lc "sed -n '250,470p' src/fill.js; sed -n '365,425p' src/danger.js; sed -n '650,805p' src/danger.js" in /workspace/tellsh
exec
/bin/bash -lc "sed -n '300,445p' src/pipeline.js; sed -n '470,645p' src/pipeline.js; cat src/render.js" in /workspace/tellsh
 succeeded in 0ms:
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
    t = t.split(s).join(' ');
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
    const envish = res.some(selEnvish);
    if (values.wenv != null && RAW_OK.wenv(values.wenv) && !envish) return null;
    return envish ? 'wenv' : 'args';
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
  while (i < words.length && /^[A-Za-z_]\w*=/.test(words[i])) assign.push(words[i++]);
  const head = baseName(words[i] ?? '');
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
// a piece of a PowerShell expression the tokenizer splits off (`$_.Length -gt 1MB`, `.Count`, `-Force`, `[math]::Round`):
// not a program (a `$`-named program is high risk by the rule above)
export const FRAGMENT = /^(?:[$@[(,*{}<%]|-|\d|\.[\w.:])|,$/;

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
  for (let words of [...simpleCommands(command), ...simpleCommands(command, { winPaths: true })]) {
    while (words.length && KEYWORDS.has(String(words[0]).toLowerCase())) words = words.slice(1);
    if (!words.length || FRAGMENT.test(String(words[0]))) continue;
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

/** @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}} */
export function checkDanger(command, baseRisk = 'safe', { lenient = false, allowlist = null } = {}) {
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
    // the allowlist judges the command as written (a wrapper around a payload is already high); payloads get the deny rules
    const d = checkDanger(c, 'safe', { allowlist: { off: true } });
    for (const m of d.warnings) hit(d.risk, m, d.critical);
  }
  for (const [re, r, msg, crit] of RULES) if (re.test(text)) hit(r, msg, crit);
  if (!lenient && !allowlist?.off) for (const m of allowlistProblems(command, { extra: allowlist?.extra })) hit('high', m);
  return { risk, warnings, critical };
}

 succeeded in 0ms:
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
/bin/bash -lc 'npm test' in /workspace/tellsh
 exited 1 in 7131ms:

> tellsh@0.3.0 test
> node --test test/

TAP version 13
# Subtest: /workspace/tellsh/test/allowlist.test.js
ok 1 - /workspace/tellsh/test/allowlist.test.js
  ---
  duration_ms: 858.905031
  ...
# Subtest: /workspace/tellsh/test/cli.test.js
not ok 2 - /workspace/tellsh/test/cli.test.js
  ---
  duration_ms: 2900.179672
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
  duration_ms: 506.084486
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 4 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 203.742814
  ...
# Subtest: /workspace/tellsh/test/devtools.test.js
ok 5 - /workspace/tellsh/test/devtools.test.js
  ---
  duration_ms: 326.196891
  ...
# Subtest: /workspace/tellsh/test/hybrid.test.js
ok 6 - /workspace/tellsh/test/hybrid.test.js
  ---
  duration_ms: 243.769267
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 7 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 154.212911
  ...
# Subtest: /workspace/tellsh/test/pipeline.test.js
not ok 8 - /workspace/tellsh/test/pipeline.test.js
  ---
  duration_ms: 408.86951
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
  duration_ms: 1192.997685
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
  duration_ms: 610.468639
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
  duration_ms: 1023.604108
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
  duration_ms: 577.307356
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
  duration_ms: 336.971247
  ...
# Subtest: /workspace/tellsh/test/regressions14.test.js
ok 14 - /workspace/tellsh/test/regressions14.test.js
  ---
  duration_ms: 399.363889
  ...
# Subtest: /workspace/tellsh/test/regressions15.test.js
ok 15 - /workspace/tellsh/test/regressions15.test.js
  ---
  duration_ms: 455.014539
  ...
# Subtest: /workspace/tellsh/test/regressions16.test.js
ok 16 - /workspace/tellsh/test/regressions16.test.js
  ---
  duration_ms: 406.926067
  ...
# Subtest: /workspace/tellsh/test/regressions17.test.js
ok 17 - /workspace/tellsh/test/regressions17.test.js
  ---
  duration_ms: 444.065199
  ...
# Subtest: /workspace/tellsh/test/regressions18.test.js
ok 18 - /workspace/tellsh/test/regressions18.test.js
  ---
  duration_ms: 511.696267
  ...
# Subtest: /workspace/tellsh/test/regressions19.test.js
ok 19 - /workspace/tellsh/test/regressions19.test.js
  ---
  duration_ms: 620.803757
  ...
# Subtest: /workspace/tellsh/test/regressions2.test.js
not ok 20 - /workspace/tellsh/test/regressions2.test.js
  ---
  duration_ms: 847.504036
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
  duration_ms: 648.261144
  ...
# Subtest: /workspace/tellsh/test/regressions21.test.js
ok 22 - /workspace/tellsh/test/regressions21.test.js
  ---
  duration_ms: 482.851216
  ...
# Subtest: /workspace/tellsh/test/regressions22.test.js
ok 23 - /workspace/tellsh/test/regressions22.test.js
  ---
  duration_ms: 645.843236
  ...
# Subtest: /workspace/tellsh/test/regressions23.test.js
ok 24 - /workspace/tellsh/test/regressions23.test.js
  ---
  duration_ms: 673.307022
  ...
# Subtest: /workspace/tellsh/test/regressions24.test.js
ok 25 - /workspace/tellsh/test/regressions24.test.js
  ---
  duration_ms: 661.515037
  ...
# Subtest: /workspace/tellsh/test/regressions25.test.js
ok 26 - /workspace/tellsh/test/regressions25.test.js
  ---
  duration_ms: 771.336064
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 27 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 425.264943
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 28 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 391.19301
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 29 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 407.960628
  ...
# Subtest: /workspace/tellsh/test/regressions4.test.js
not ok 30 - /workspace/tellsh/test/regressions4.test.js
  ---
  duration_ms: 1172.687901
  location: '/workspace/tellsh/test/regressions4.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions5.test.js
ok 31 - /workspace/tellsh/test/regressions5.test.js
  ---
  duration_ms: 811.603845
  ...
# Subtest: /workspace/tellsh/test/regressions6.test.js
ok 32 - /workspace/tellsh/test/regressions6.test.js
  ---
  duration_ms: 813.765963
  ...
# Subtest: /workspace/tellsh/test/regressions7.test.js
ok 33 - /workspace/tellsh/test/regressions7.test.js
  ---
  duration_ms: 459.605723
  ...
# Subtest: /workspace/tellsh/test/regressions8.test.js
not ok 34 - /workspace/tellsh/test/regressions8.test.js
  ---
  duration_ms: 701.595904
  location: '/workspace/tellsh/test/regressions8.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/regressions9.test.js
not ok 35 - /workspace/tellsh/test/regressions9.test.js
  ---
  duration_ms: 977.740664
  location: '/workspace/tellsh/test/regressions9.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 36 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 3804.220736
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/slot-cases.js
ok 37 - /workspace/tellsh/test/slot-cases.js
  ---
  duration_ms: 126.901235
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 38 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 250.178752
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 39 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 262.264025
  location: '/workspace/tellsh/test/templates.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..39
# tests 39
# suites 0
# pass 27
# fail 12
# cancelled 0
# skipped 0
# todo 0
# duration_ms 6722.064795

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
import {checkDanger} from './src/danger.js';
const qs=['deploy worker to prod or production','deploy worker to dev or development','deploy worker to staging or prod','deploy worker to staging and production','deploy worker to production or prod','deploy worker --env prod or production','merge pr 42 in repo acme/app or other/repo','merge pr 42 in repo acme/app and other/repo','merge pr 42 in repo acme/app, not other/repo','merge pr 42 in repo acme/app but not in repo acme/app','merge pr 42 in repo acme/app --repo other/repo','set worker secret API_KEY or SECRET_KEY --env staging','deploy worker to staging using config other.toml','deploy worker to staging --name other-worker','merge pr 42 from feature/wrong','merge pr 42 or feature/other','create a pr from main','create a pr to main'];
for(const q of qs){const s=suggest(q,{shell:'bash',os:'linux'}); console.log(JSON.stringify({q,understood:s.understood,intent:s.intent,command:s.command,missing:s.missing,risk:s.risk}));}
for(const c of ['bash evil.sh','python3 evil.py','node evil.js','git -- status','gh pr -- close 3','npx -- cowsay','tar cf archive.tar foo','time ls']) console.log(JSON.stringify({c,...checkDanger(c)}));
JS" in /workspace/tellsh
 succeeded in 188ms:
{"q":"deploy worker to prod or production","understood":true,"intent":"wrangler_deploy","command":"npx wrangler deploy --env <WENV>","missing":["wenv"],"risk":"medium"}
{"q":"deploy worker to dev or development","understood":true,"intent":"wrangler_dev","command":"npx wrangler dev --env <WENV>","missing":["wenv"],"risk":"medium"}
{"q":"deploy worker to staging or prod","understood":true,"intent":"wrangler_deploy","command":"npx wrangler deploy --env <WENV>","missing":["wenv"],"risk":"medium"}
{"q":"deploy worker to staging and production","understood":true,"intent":"wrangler_deploy","command":"npx wrangler deploy --env <WENV>","missing":["wenv"],"risk":"medium"}
{"q":"deploy worker to production or prod","understood":true,"intent":"wrangler_deploy","command":"npx wrangler deploy --env <WENV>","missing":["wenv"],"risk":"medium"}
{"q":"deploy worker --env prod or production","understood":true,"intent":"wrangler_deploy","command":"npx wrangler deploy --env prod","missing":[],"risk":"medium"}
{"q":"merge pr 42 in repo acme/app or other/repo","understood":true,"intent":"gh_pr_merge","command":"gh pr merge 42 --repo acme/app","missing":[],"risk":"medium"}
{"q":"merge pr 42 in repo acme/app and other/repo","understood":true,"intent":"gh_pr_merge","command":"gh pr merge 42 --repo acme/app","missing":[],"risk":"medium"}
{"q":"merge pr 42 in repo acme/app, not other/repo","understood":true,"intent":"gh_pr_merge","command":"gh pr merge 42 --repo acme/app","missing":[],"risk":"medium"}
{"q":"merge pr 42 in repo acme/app but not in repo acme/app","understood":true,"intent":"gh_pr_merge","command":"gh pr merge 42 --repo acme/app","missing":[],"risk":"medium"}
{"q":"merge pr 42 in repo acme/app --repo other/repo","understood":true,"intent":"gh_pr_merge","command":"gh pr merge 42 --repo other/repo","missing":[],"risk":"medium"}
{"q":"set worker secret API_KEY or SECRET_KEY --env staging","understood":true,"intent":"wrangler_secret_put","command":"npx wrangler secret put API_KEY --env staging","missing":[],"risk":"medium"}
{"q":"deploy worker to staging using config other.toml","understood":true,"intent":"wrangler_deploy","command":"npx wrangler deploy --env staging","missing":[],"risk":"medium"}
{"q":"deploy worker to staging --name other-worker","understood":true,"intent":"wrangler_deploy","command":"npx wrangler deploy --env <WENV>","missing":["wenv"],"risk":"medium"}
{"q":"merge pr 42 from feature/wrong","understood":true,"intent":"gh_pr_merge","command":"gh pr merge 42 --repo feature/wrong","missing":[],"risk":"medium"}
{"q":"merge pr 42 or feature/other","understood":true,"intent":"gh_pr_merge","command":"gh pr merge 42","missing":[],"risk":"medium"}
{"q":"create a pr from main","understood":true,"intent":"gh_pr_create","command":"gh pr create --fill","missing":[],"risk":"medium"}
{"q":"create a pr to main","understood":true,"intent":"gh_pr_create","command":"gh pr create --fill","missing":[],"risk":"medium"}
{"c":"bash evil.sh","risk":"safe","warnings":[],"critical":false}
{"c":"python3 evil.py","risk":"safe","warnings":[],"critical":false}
{"c":"node evil.js","risk":"safe","warnings":[],"critical":false}
{"c":"git -- status","risk":"high","warnings":["unknown subcommand (git status); not on the allowlist"],"critical":false}
{"c":"gh pr -- close 3","risk":"high","warnings":["unknown subcommand (gh pr close); not on the allowlist"],"critical":false}
{"c":"npx -- cowsay","risk":"high","warnings":["unknown subcommand (npx cowsay); not on the allowlist"],"critical":false}
{"c":"tar cf archive.tar foo","risk":"safe","warnings":[],"critical":false}
{"c":"time ls","risk":"safe","warnings":[],"critical":false}

exec
/bin/bash -lc "rg -n '"'^function interpCheck|''^function interpreter|INTERP|function buildCommand|selectorWithhold|selectorResidue|wranglerEnv|prRepo'"' src/danger.js src/fill.js; sed -n '430,489p' src/danger.js; sed -n '585,665p' src/fill.js; sed -n '1,110p' README.md; sed -n '780,1010p' src/fill.js" in /workspace/tellsh
 succeeded in 0ms:
src/fill.js:144:function wranglerEnv(t) {
src/fill.js:271:export function selectorResidue(intentId, text, values = {}) {
src/fill.js:316:export function selectorWithhold(intentId, text, values = {}) {
src/fill.js:319:  const res = selectorResidue(intentId, text, values);
src/fill.js:437:function prRepo(text) {
src/fill.js:562:    const rq = has('repo') ? prRepo(String(ex.text)) : null;
src/fill.js:576:    const rq = prRepo(String(ex.text));
src/fill.js:585:    const w = wranglerEnv(t);
src/fill.js:635:    const k = selectorWithhold(intent.id, String(ex.text), v);
src/fill.js:716:export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [], keepOptional = [] } = {}) {
src/danger.js:462:const INTERP_CODE = [
src/danger.js:484:  const it = INTERP_CODE.find(([re]) => re.test(h));
src/danger.js:489:function interpCheck(w, hit) {
src/danger.js:495:const INTERP_HEAD = /^(?:python[\d.]*|pypy[\d.]*|perl[\d.]*|(?:j?ruby)[\d.]*|node|nodejs|bun|deno|php[\d.]*|lua[\d.]*|luajit|julia|rscript|osascript|tclsh|awk|gawk|mawk|nawk)$/;
src/danger.js:504:  if (!shell && !INTERP_HEAD.test(h)) return;
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
# tellsh

**Say what you want in Polish or English, get the shell command — for bash, zsh, sh, PowerShell (fish and cmd
best effort).** Fully offline, zero runtime dependencies, no generative model at runtime: a fast "System 1" reflex.
A cascade of tiny linear models picks the **tool**, then the **intent**, then tags the **slots** (paths, sizes,
ports, names, …); a vetted, safely quoted template is rendered for *your* shell and OS. Requests outside the
catalog fall back to an experimental flag composer that is always clearly marked and never auto-runs.

```console
$ tellsh pokaż 5 największych plików w '~/Pobrane'
$ find ~/Pobrane -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 5
  largest_files · bash/linux · risk: safe · confidence: 99%

PS> tellsh pokaż 5 największych plików w '~/Pobrane'
PS> Get-ChildItem -LiteralPath "$HOME/Pobrane" -File -Recurse -Force -ErrorAction SilentlyContinue | Sort-Object Length -Descending | Select-Object -First 5 -Property Length, FullName
  largest_files · powershell/win32 · risk: safe · confidence: 99%

$ tellsh show the 3 largest folders in /var            # macOS, BSD userland: no `sort -h`
$ du -k -d 1 /var 2>/dev/null | sort -rn | head -n 3

$ docker run -d --name web nginx
$ tellsh --history logi tego kontenera
$ docker logs --tail 100 -f web
  docker_logs · bash/linux · risk: safe · confidence: 94%
  ↺ from history: "container" from history = web

$ tellsh list files sorted by modification time, oldest first, with details
$ ls -l -t -r
  composed (experimental) ls · bash/linux · risk: medium · confidence: 100%
  ~ assembled from a flag vocabulary (request asks for -t -r not in the catalog command); check it carefully
Experimental. Type "yes" to run, e to edit, anything else aborts:
```

## Install

```bash
npm i -g tellsh        # then: tellsh <request...>
npx tellsh df          # one-off, no install
```

Node ≥ 18, no dependencies, no network after install (except for intents that use the network themselves).
Offline install: `npm pack` → copy `tellsh-0.2.0.tgz` (~1.1 MB) → `npm i -g ./tellsh-0.2.0.tgz`.

## Usage

```
tellsh [options] <request...>

  -n, --dry-run        print the command only, never run it
  -y, --yes            run without prompting (only risk=safe commands straight from the catalog; never
                       history-resolved, composed, incomplete or medium/high-risk ones)
  -e, --explain        tool/intent scores, slots and where each slot came from (tagger/regex/history)
      --json           machine-readable output (implies --dry-run)
      --shell <s>      bash | zsh | sh | powershell | fish | cmd   (default: detected)
      --os <o>         linux | darwin | win32                      (default: this machine; --platform = alias)
      --history[=FILE] resolve "it", "that container", "same for /var" from the previous command
      --compose / --no-compose   force / disable the experimental composer
      --top <k>, --threshold <p>, -v/--version, -h/--help
```

At the prompt: **Enter** runs, **e** edits (prefilled readline), **n** aborts. High-risk and composed commands need
`yes`; catastrophic patterns (`rm -rf /`, `mkfs`, `Format-Volume`, …) need the whole command retyped. The command
runs in the target shell (`$SHELL -c`, `fish -c`, `pwsh -NoProfile -Command`, `cmd /d /s /c`). Without a TTY tellsh
only prints. Exit codes: command's own · `0` printed · `2` usage · `3` not understood · `4` `--yes` refused ·
`5` no rendering for this shell · `130` aborted.

Quoting: the whole request may be one argument (`tellsh "delete folder /tmp/x"`). Among several arguments, one with a
space is a value when it starts like a path (`tellsh delete folder "/tmp/a b"`) or, after the first argument, looks
like a file name (`"My Notes.txt"`, `"data/my notes.txt"`), and request text when it comes first
(`tellsh "delete folder" /tmp/x`). Anything else is unclear: `tellsh delete folder "my data"`, and arguments that mix
request words with a path (`delete "folder /tmp/x"`, `delete "the file notes.txt"`, `usuń "plik raport.pdf"`, a space
before the first `/`). A changing command leaves that path (or name) as a placeholder, with a warning.

## How it works

```
                      ┌──────────── env: shell / OS / coreutils (GNU, BSD, busybox) ─────────────┐
 request ─► normalise │  ctx: history entities + cwd (--history, in memory only)                 │
   │                  └───────── tokens  shell=zsh os=darwin ctx_last=container ctx_tool=docker ─┘
   │                                              │ (classifier features)
   │   history rules ──────────────► "same for X" / "delete it" / "same but …" (deterministic)
   ▼                                              ▼
 STAGE 1  tool family  p(tool)  ── top-3 ──►  STAGE 2  intent per tool  p(intent | tool)
 (55 classes incl. __none__;                   score = p(tool) · p(intent | tool), best over the 3 tools
  PowerShell/cmd verbs → same family)          (recovers stage-1 mistakes)
   │                                              │
   │                         score < threshold ───┼──► SECOND PASS: flag composer (experimental)
   │                         or ≥1 unexplained    │    head from stage-1 tools · flags from NL triggers
   │                         modifier             │    (+ tldr stems) · bash -n + allowed-flag check
   ▼                                              ▼    · risk ≥ medium · explicit "yes"
 STAGE 3  BIO slot tagger (tool = input feature, only the tool's slot types are candidates,
          constrained Viterbi)  ──► typed spans ──► validate ──► regex extractor fills misses / replaces
          invalid values  ──► template for (shell, OS, coreutils) ──► per-shell quoting
          ──► danger checker (POSIX + PowerShell + cmd patterns, escalate only) ──► confirm ──► run
```

* **Features** (`src/features.js`, the single implementation used both by `scripts/gen_data.js` for training and at
  runtime): stemmed word uni/bigrams, character 3–5-grams, plus context tokens `shell=…`, `os=…`, `ctx_…`, all hashed
  (FNV-1a, 2^18). Tagger features per token: word, stem, shape, prefix/suffix, ±2 neighbours, quote/path/number
  cues, gazetteers (process/service names, extensions, units), and the tool family (alone and crossed with the word).
* **Models** (`scripts/train.py`, scikit-learn at build time only): multinomial logistic regression for the tool model,
  one per family with >1 intent (30), and a token-level BIO model (27 labels: `PATH SIZE EXT PORT TIME NAME NUM URL HOST
  BRANCH PATTERN REPL USER MODE MSG VAR PID TEXT`). Top-K feature rows by weight norm are kept, models are refit on
  them and quantised to int8; everything ships in one `model/model.bin` (**~2.7 MB**, loaded with a binary-searched row
  index in a few ms). Thresholds (accept, compose) are calibrated on a group-wise holdout + out-of-domain data.
* **Training data** (`scripts/gen_data.js`): ~9.3k EN/PL paraphrases (+ typo copies), ~1k shell-phrased requests
  (cmdlets, `dir /s`, Windows paths, …), 1.7k tldr-pages descriptions (stage 1 only), out-of-domain chit-chat as
  `__none__`, and synthetic history anaphora with `ctx_` features. **Tagger data** is generated by delexicalising every
  paraphrase with the gold intent's slots (silver spans from the regex extractor) and re-filling the spans with values
  from pools — 28k tagged sequences. Eval values come from separate held-out pools.
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
/bin/bash -lc "nl -ba src/fill.js | sed -n '278,342p'; nl -ba src/danger.js | sed -n '32,56p'; nl -ba src/danger.js | sed -n '688,746p'; nl -ba src/cli.js | sed -n '262,294p'; rg -n 'Known limits|known limits|allowlist|selector|squash|--base' README.md" in /workspace/tellsh
 succeeded in 0ms:
   278	    const val = values[k];
   279	    if (val == null || String(val).startsWith('?')) continue;
   280	    const s = foldKeepLength(String(val)).toLowerCase();
   281	    t = t.split(s).join(' ');
   282	  }
   283	  if (/^wrangler_/.test(intentId)) t = t.replace(WR_DRY_NOT, ' ').replace(WR_DRY, ' ');
   284	  if (values.delbranch) t = t.replace(PR_DELETE_BRANCH, ' ');
   285	  t = t.replace(/(?:^|\s)(?:--env|-e|--repo|-r|env=|--repo=|--env=)(?=\s|$)/g, ' ')
   286	    .replace(/(?:^|\s)(?:https?:\/\/|github\.com\/)(?=\s|$)/g, ' ')
   287	    .replace(/\b(?:number|numer|nr|no\.|num)(?=\s|$)/g, ' ')
   288	    .replace(/\benv(?:ironment)?\s+var(?:iable)?s?\b|\bzmienn\w*(?:\s+srodowiskow\w*)?|\bsrodowiskow\w*/g, ' ')
   289	    .replace(/\b(?:the\s+)?command\s+line\b|\bz\s+linii\s+komend\b/g, ' ');
   290	  if (/^gh_pr_/.test(intentId) && values.pr != null && !String(values.pr).startsWith('?')) t = t.replace(SEL_OTHER_NUMBER, ' ');
   291	  const out = [];
   292	  let prev = '';
   293	  for (let w of t.split(/[\s,;!?()]+|:(?!\/\/)/)) {
   294	    w = w.replace(/^[#"'`„“”.]+|["'`„“”.]+$/g, '').replace(/'s$/, '');
   295	    if (!w || /^[-–—]+$/.test(w)) continue;
   296	    // "merge pr with --squash": an option word the intent knows (gh asks for the merge method itself)
   297	    const famAll = selFamilyAll[intentId.split('_')[0]];
   298	    if (selHas(SEL_COMMON, w) || selHas(fam, w) || (!SEL_PICKERS.has(w) && famAll && selHas(famAll, w)) || (own && selHas(own, w.replace(/^--(?=[a-z])/, '')))) {
   299	      if (!SEL_DET.test(w)) prev = w;
   300	      continue;
   301	    }
   302	    out.push({ w, prev });
   303	    prev = w;
   304	  }
   305	  return out;
   306	}
   307	const SEL_EXPLICIT = { pr: (v) => /^\d+$|^https?:\/\//.test(v), num: (v) => /^\d+$/.test(v), wenv: (v) => RAW_OK.wenv(v) };
   308	const selEnvish = (r) => /[a-z]/.test(r.w) && (SEL_ENV_PREP.test(r.prev) || WR_ENV_KNOWN.test(r.w) || WR_ENV_STEM.test(r.w) || /^(?:prod|produkc|staging|stage)/.test(r.w));
   309	/**
   310	 * gh / wrangler selector rule: the slot to withhold (`?`, a placeholder the user fills) for the words of a request
   311	 * nothing explains, or null. An explicit value that was read (pull request 45, a URL, `--env staging`) stays unless an
   312	 * unexplained word competes with it (another number, another environment); otherwise the intent's selector is withheld:
   313	 * the pull request (`<PR>`), the run (`<NUM>`), the environment (`<WENV>`, for a word placed as one) or the rest of the
   314	 * request (`<ARGS>`).
   315	 */
   316	export function selectorWithhold(intentId, text, values = {}) {
   317	  // a selector already withheld ("merge pr bob's", "my environment is set") already has its placeholder
   318	  if (['pr', 'num', 'wenv', 'repo'].some((k) => String(values[k] ?? '').startsWith('?'))) return null;
   319	  const res = selectorResidue(intentId, text, values);
   320	  if (!res.length) return null;
   321	  const main = SEL_SLOT[intentId];
   322	  if (main && main !== 'wenv') {
   323	    const v = values[main];
   324	    if (v != null && SEL_EXPLICIT[main](String(v)) && !res.some((r) => /^\d+$|^https?:/.test(r.w))) return null;
   325	    return main;
   326	  }
   327	  if (/^wrangler_/.test(intentId)) {
   328	    // "deploy worker but not to production", "don't deploy to prod": an environment the request excludes is never the
   329	    // target (also when one was read)
   330	    const negated = res.some((r) => SEL_NEGATION.test(r.w));
   331	    if (negated && (values.wenv != null || res.some(selEnvish) || WR_ENV_ANY.test(text))) return 'wenv';
   332	    const envish = res.some(selEnvish);
   333	    if (values.wenv != null && RAW_OK.wenv(values.wenv) && !envish) return null;
   334	    return envish ? 'wenv' : 'args';
   335	  }
   336	  return 'args';
   337	}
   338	// npm install: words that name the project's dependencies (or the tool), never a package to add
   339	const NPM_NOT_PKG = new Set(('dependencies dependency dependecies dependancies deps dep zaleznosci zaleznosc project projekt projektu ' +
   340	  'packages package pakiety paczki modules module moduly node_modules node npm ci clean czysta czysty everything all wszystko ' +
   341	  'package.json lockfile lock repo repository it this them')
   342	  .split(' '));
    32	  const isDq = (c) => (winPaths ? PS_DQ.test(c) : c === '"');
    33	  for (let i = 0; i < s.length; i++) {
    34	    const c = s[i];
    35	    if (isSq(c)) {
    36	      let j = i + 1;
    37	      while (j < s.length && !isSq(s[j])) j++;
    38	      const end = j;
    39	      w = (w ?? '') + s.slice(i + 1, end);
    40	      i = end;
    41	    } else if (isDq(c)) {
    42	      let v = '';
    43	      let j = i + 1;
    44	      for (; j < s.length && !isDq(s[j]); j++) {
    45	        if (((!winPaths && s[j] === '\\' && /[$`"\\\n]/.test(s[j + 1])) || s[j] === '`') && j + 1 < s.length) v += s[++j]; else v += s[j];
    46	      }
    47	      w = (w ?? '') + v;
    48	      i = j;
    49	    } else if (!winPaths && c === '\\' && i + 1 < s.length && !/[A-Za-z0-9_.%$~*]/.test(s[i + 1])) {
    50	      w = (w ?? '') + s[++i]; // POSIX escape (keeps Windows paths like C:\Users intact)
    51	    } else if ((c === '{' || c === '}') && w == null && (i + 1 >= s.length || /\s/.test(s[i + 1]))) {
    52	      flushCmd(); // standalone { } = command group / script block
    53	    } else if (/\s/.test(c)) {
    54	      if (c === '\n') flushCmd(); else flushWord();
    55	    } else if (/[;&|()]/.test(c)) {
    56	      flushCmd();
   688	  const keyFlags = (k) => (extra?.[k] ? [...(table[k] || []), ...extra[k].map((f) => flagKey(k.split(' ')[0], f))] : table[k]);
   689	  PREFIXES ??= new Set(Object.keys(ALLOW).flatMap((k) => k.split(' ').slice(1).map((_, i, a) => k.split(' ').slice(0, i + 1).join(' '))));
   690	  const prefix = (k) => PREFIXES.has(k) || (extra && Object.keys(extra).some((e) => e.startsWith(k + ' ')));
   691	  const out = [];
   692	  const seen = new Set();
   693	  const add = (m) => { if (!seen.has(m)) { seen.add(m); out.push(m); } };
   694	  for (let words of [...simpleCommands(command), ...simpleCommands(command, { winPaths: true })]) {
   695	    while (words.length && KEYWORDS.has(String(words[0]).toLowerCase())) words = words.slice(1);
   696	    if (!words.length || FRAGMENT.test(String(words[0]))) continue;
   697	    const sh = commandShape(words, { known: (k) => keyFlags(k) != null || prefix(k) });
   698	    if (sh.assign.length) add(`sets environment variables for the command (${sh.assign.map((a) => a.split('=')[0]).join(', ')}); not on the allowlist`);
   699	    if (!sh.head) continue;
   700	    // a wrapper with an operand runs it (`sudo rm x`, `timeout 5 ls`, `bash -c "…"`); alone it is a program (`env | sort`)
   701	    if (((WRAPPERS.has(sh.head) || RUNNERS.has(sh.head)) && sh.head !== 'ssh' && sh.rest.length) || (SHELLS.test(sh.head) && sh.flags.some((f) => /^-[a-z]*c[a-z]*$/i.test(f)))) {
   702	      add(`runs another command through a wrapper (${sh.head}); only commands on the allowlist are trusted`);
   703	      continue;
   704	    }
   705	    if (sh.head === 'ssh' && sshOperands(words) > 1) {
   706	      add('runs a remote command over ssh; not on the allowlist');
   707	      continue;
   708	    }
   709	    const allowed = keyFlags(sh.key);
   710	    if (allowed == null && prefix(sh.key)) { add(`unknown subcommand (${[sh.key, ...sh.rest.slice(0, 1)].join(' ')}); not on the allowlist`); continue; }
   711	    if (allowed == null) { add(`unknown command (${sh.key}); not on the allowlist`); continue; }
   712	    if ((SUB_DEPTH[sh.head] ?? 0) > 0 && sh.key === sh.head && sh.rest.length && !allowed.includes('*sub')) {
   713	      add(`unknown subcommand (${sh.head} ${sh.rest[0]}); not on the allowlist`);
   714	      continue;
   715	    }
   716	    for (const f of sh.flags) {
   717	      const k = flagKey(sh.head, f);
   718	      if (allowed.includes(k) || (/^-[A-Za-z]#$/.test(k) && allowed.includes(k.slice(0, 2)))) continue;
   719	      // a cluster of known single-letter options (`ls -la` when -l and -a are known)
   720	      if (/^-[A-Za-z]{2,}$/.test(f) && !PWSH_CMDLET.test(sh.head) && [...f.slice(1)].every((c) => allowed.includes(`-${c}`))) continue;
   721	      add(`unknown option ${f} for ${sh.key}; not on the allowlist`);
   722	    }
   723	  }
   724	  return out;
   725	}
   726	
   727	/** @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}} */
   728	export function checkDanger(command, baseRisk = 'safe', { lenient = false, allowlist = null } = {}) {
   729	  let risk = baseRisk;
   730	  const warnings = [];
   731	  let critical = false;
   732	  const hit = (r, msg, crit) => {
   733	    risk = maxRisk(risk, r);
   734	    if (!warnings.includes(msg)) warnings.push(msg);
   735	    if (crit) critical = true;
   736	  };
   737	  const text = normalizeGlobals(command);
   738	  const inner = [];
   739	  const flags = {};
   740	  // structural checks run on both readings of backslashes (POSIX escapes / Windows path separators)
   741	  for (const words of [...simpleCommands(text), ...simpleCommands(text, { winPaths: true })]) {
   742	   for (const w of commandChains(words, inner, flags)) {
   743	    const head = w[0].replace(/^.*[\\/]/, '');
   744	    const lower = head.toLowerCase().replace(/\.exe$/, '');
   745	    // a lone string with spaces is a command handed to another program ('…' | bash)
   746	    if (w.length === 1 && /\s/.test(w[0])) inner.push(w[0]);
161:word that nothing explains — a description, a picked-out item, a quoted or uncertain name — withholds the selector
269:  (`src/allowlist-data.js`, generated from every catalog template for every shell by `scripts/build_allowlist.js`; a test
292:  without `-a`, `dd of=`, `cp`/`install`/`mv`/`ln -f` onto it, `chmod 000`). Switching user (`su`, `runuser`, `pkexec`) is at least medium, like `sudo` (high by the allowlist). It
369:## Known limits
371:* **The selector rule trades recall for safety.** Its vocabulary is closed and hand-written (English and Polish): a
375:  not render (`--draft`, `--base`, `--label`, `--state`, `--squash`, `--port`, `--hostname`) are never added: their
376:  requests get `<ARGS>`. Words the vocabulary does list are trusted, so a selector hidden in one of them (e.g.
378:* The selector rule covers gh and wrangler only (plus `npm install` dependency words). Other intents still read their
382:* **The allowlist knows only what the catalog renders.** A perfectly safe command you type or edit with a flag tellsh
385:  by the allowlist (a `$`-named program stays high by the deny rules). Payload strings of a runner (`forfiles /c "…"`,
388:  native variant, and `… | xargs kill`) is high risk by the allowlist; the deny rules alone would call most of them medium.

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
import {checkDanger} from './src/danger.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for (const q of ['deploy worker --env staging --config other.toml','deploy worker to staging using config other.toml','deploy worker --env staging with worker named billing','set worker secret API_KEY or SECRET_KEY --env staging','create a pr into main','create a pull request into master','create a pr from feature','create a pr with base main','merge pr 42 in repo acme/app or other/repo','merge pr 42 --repo acme/app or --repo other/repo']) {const s=suggest(q,{env});console.log(JSON.stringify({q,intent:s.intent,understood:s.understood,command:s.command,missing:s.missing}));}
for(const c of ['echo \""'$(cowsay hi)"'"','echo "'`cowsay hi`'"','7z x a.7z -o/tmp','.hidden --erase','git bisect start','docker compose down'])console.log(JSON.stringify({c,...checkDanger(c)}));
JS" in /workspace/tellsh
 succeeded in 122ms:
{"q":"deploy worker --env staging --config other.toml","intent":"wrangler_deploy","understood":true,"command":"npx wrangler deploy --env staging","missing":[]}
{"q":"deploy worker to staging using config other.toml","intent":"wrangler_deploy","understood":true,"command":"npx wrangler deploy --env staging","missing":[]}
{"q":"deploy worker --env staging with worker named billing","intent":"wrangler_deploy","understood":true,"command":"npx wrangler deploy --env <WENV>","missing":["wenv"]}
{"q":"set worker secret API_KEY or SECRET_KEY --env staging","intent":"wrangler_secret_put","understood":true,"command":"npx wrangler secret put API_KEY --env staging","missing":[]}
{"q":"create a pr into main","intent":"gh_pr_create","understood":true,"command":"gh pr create --fill","missing":[]}
{"q":"create a pull request into master","intent":"gh_pr_create","understood":true,"command":"gh pr create --fill","missing":[]}
{"q":"create a pr from feature","intent":"gh_pr_create","understood":true,"command":"gh pr create --fill","missing":[]}
{"q":"create a pr with base main","intent":"gh_pr_create","understood":true,"command":"gh pr create --fill","missing":[]}
{"q":"merge pr 42 in repo acme/app or other/repo","intent":"gh_pr_merge","understood":true,"command":"gh pr merge 42 --repo acme/app","missing":[]}
{"q":"merge pr 42 --repo acme/app or --repo other/repo","intent":"gh_pr_merge","understood":true,"command":"gh pr merge 42 --repo acme/app","missing":[]}
{"c":"echo \"$(cowsay hi)\"","risk":"safe","warnings":[],"critical":false}
{"c":"echo `cowsay hi`","risk":"safe","warnings":[],"critical":false}
{"c":"7z x a.7z -o/tmp","risk":"safe","warnings":[],"critical":false}
{"c":".hidden --erase","risk":"safe","warnings":[],"critical":false}
{"c":"git bisect start","risk":"high","warnings":["unknown subcommand (git bisect); not on the allowlist"],"critical":false}
{"c":"docker compose down","risk":"safe","warnings":[],"critical":false}

exec
/bin/bash -lc "sed -n '369,390p' README.md; git diff 0d87457..HEAD -- src/danger.js | tail -n 200; sed -n '245,285p' src/cli.js" in /workspace/tellsh
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
* `<ARGS>` and `<WENV>` are placeholders, not values: tellsh never runs an incomplete command; edit it (`e`) first.
* **The allowlist knows only what the catalog renders.** A perfectly safe command you type or edit with a flag tellsh
  never emits (`ls --color=never`, `git log --stat`) is reported as high risk and needs `yes`. PowerShell expressions
  are tokenized with the same light tokenizer: parts of an expression (`$_.Length -gt 1MB`, `.Count`) are not judged
  by the allowlist (a `$`-named program stays high by the deny rules). Payload strings of a runner (`forfiles /c "…"`,
  `bash -c '…'`) are checked by the deny rules; the wrapper itself already makes the command high.
* **sudo is a wrapper.** Every `sudo` catalog command (and the `bash -c` fallback for PowerShell on Linux/macOS without a
  native variant, and `… | xargs kill`) is high risk by the allowlist; the deny rules alone would call most of them medium.
* fish / cmd renders are not syntax-checked here (no fish/pwsh in CI); PowerShell variants are hand-written and only
  linted structurally — `pwsh` parser checks run automatically where `pwsh` is installed.
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
@@ -191,8 +613,119 @@ export function normalizeGlobals(command) {
   return String(command).replace(GIT_GLOBALS, 'git').replace(DOCKER_GLOBALS, 'docker');
 }
 
+// ---------------------------------------------------------------------------------------------
+// Allowlist (v0.3): only the commands and flags tellsh knows are safe. The known set is what the catalog itself renders
+// for every shell (src/allowlist-data.js, generated by scripts/build_allowlist.js and checked by a test). Any wrapper
+// (sudo, env, timeout, xargs, nohup, bash -c, ...), an environment assignment in front of a command, a program the set
+// does not have, a subcommand of a multi-command tool it does not have (`git filter-branch`, `npx cowsay`) or a flag it
+// does not have for that command (`gh pr merge --admin`, `rm -P`) makes the command high risk: it is shown with the
+// reason and needs an explicit confirmation. The deny rules above still run; the allowlist only ever escalates.
+
+// tools whose first words name a subcommand (`git push`, `docker compose up`, `npx wrangler deploy`, `gh pr merge`)
+export const SUB_DEPTH = { git: 1, docker: 2, podman: 2, npm: 1, npx: 3, pnpm: 1, yarn: 1, gh: 2, systemctl: 1, apt: 1, 'apt-get': 1,
+  dnf: 1, yum: 1, brew: 1, winget: 1, pip: 1, pip3: 1, kubectl: 1, wrangler: 2, timedatectl: 1, journalctl: 0, launchctl: 1,
+  certutil: 0, python3: 0, py: 0 };
+const PWSH_CMDLET = /^[a-z]+-[a-z]+$/;
+// `-w32`, `-n5`: an option with its number attached is the option
+const flagKey = (head, f) => {
+  let x = String(f);
+  if (/^--[^=]+=/.test(x)) x = x.replace(/=.*$/s, '=');
+  else if (/^\/[A-Za-z?]{1,2}:/.test(x)) x = x.replace(/:.*$/s, ':');
+  else if (/^-[A-Za-z]\d+$/.test(x)) x = x.replace(/\d+$/, '#');
+  return PWSH_CMDLET.test(head) ? x.toLowerCase() : x;
+};
+// a word that is an option: -x, --long, -Param (PowerShell), /x (cmd.exe, short: never a path like /tmp); `-3`, `-10M`
+// (find -mtime -3) and `-` (stdin) are values
+const isFlag = (w) => /^-(?!\d)[^\s]/.test(w) && w !== '--' || /^\/[A-Za-z?]{1,2}(?::\S*)?$/.test(w) || /^\/[+-]\w*$/.test(w);
+const baseName = (w) => String(w).replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
+
+/**
+ * The shape of one simple command: { head, key (head + known subcommand words), flags, assign, rest }.
+ * `known(key)` says whether a longer key exists (checking); without it the subcommand words are taken up to SUB_DEPTH
+ * (building the allowlist from rendered templates, where `literal(w)` tells a template word from an inserted value).
+ */
+export function commandShape(words, { known, literal = () => true } = {}) {
+  let i = 0;
+  const assign = [];
+  while (i < words.length && /^[A-Za-z_]\w*=/.test(words[i])) assign.push(words[i++]);
+  const head = baseName(words[i] ?? '');
+  let key = head;
+  let j = i + 1;
+  const depth = SUB_DEPTH[head] ?? 0;
+  for (let d = 0; d < depth && j < words.length; d++) {
+    const w = String(words[j]);
+    if (isFlag(w) || /^\d+$/.test(w) || !literal(w)) break;
+    const next = `${key} ${w.toLowerCase()}`;
+    if (known && !known(next)) break;
+    key = next;
+    j++;
+  }
+  const flags = [];
+  const rest = [];
+  let opts = true;
+  for (; j < words.length; j++) {
+    const w = String(words[j]);
+    if (opts && w === '--') { opts = false; continue; }
+    if (opts && isFlag(w)) flags.push(w); else rest.push(w);
+  }
+  return { head, key, flags, assign, rest };
+}
+
+// ssh: host plus a remote command (`ssh host rm -rf /`) runs that command; options with a value are not operands
+const SSH_OPTARG = /^-[BbcDEeFIiJLlmOoPpQRSWw]$/;
+const sshOperands = (words) => { let n = 0; for (let k = 1; k < words.length; k++) { if (SSH_OPTARG.test(words[k])) k++; else if (!/^-/.test(words[k])) n++; } return n; };
+// shell keywords in front of a command (`… do taskkill`, `else New-Item …`, `& 'node'`): syntax, not a wrapper
+export const KEYWORDS = new Set(['then', 'do', 'else', 'elif', '&', '!', 'time']);
+// a piece of a PowerShell expression the tokenizer splits off (`$_.Length -gt 1MB`, `.Count`, `-Force`, `[math]::Round`):
+// not a program (a `$`-named program is high risk by the rule above)
+export const FRAGMENT = /^(?:[$@[(,*{}<%]|-|\d|\.[\w.:])|,$/;
+
+let PREFIXES = null;
+/** Problems the allowlist finds in a command ([] when every simple command, subcommand and flag is known). */
+export function allowlistProblems(command, { extra = null } = {}) {
+  const table = ALLOW;
+  // extra: { key: flags } a caller vouches for (the composer's validated tool vocabulary), added to the table's
+  const keyFlags = (k) => (extra?.[k] ? [...(table[k] || []), ...extra[k].map((f) => flagKey(k.split(' ')[0], f))] : table[k]);
+  PREFIXES ??= new Set(Object.keys(ALLOW).flatMap((k) => k.split(' ').slice(1).map((_, i, a) => k.split(' ').slice(0, i + 1).join(' '))));
+  const prefix = (k) => PREFIXES.has(k) || (extra && Object.keys(extra).some((e) => e.startsWith(k + ' ')));
+  const out = [];
+  const seen = new Set();
+  const add = (m) => { if (!seen.has(m)) { seen.add(m); out.push(m); } };
+  for (let words of [...simpleCommands(command), ...simpleCommands(command, { winPaths: true })]) {
+    while (words.length && KEYWORDS.has(String(words[0]).toLowerCase())) words = words.slice(1);
+    if (!words.length || FRAGMENT.test(String(words[0]))) continue;
+    const sh = commandShape(words, { known: (k) => keyFlags(k) != null || prefix(k) });
+    if (sh.assign.length) add(`sets environment variables for the command (${sh.assign.map((a) => a.split('=')[0]).join(', ')}); not on the allowlist`);
+    if (!sh.head) continue;
+    // a wrapper with an operand runs it (`sudo rm x`, `timeout 5 ls`, `bash -c "…"`); alone it is a program (`env | sort`)
+    if (((WRAPPERS.has(sh.head) || RUNNERS.has(sh.head)) && sh.head !== 'ssh' && sh.rest.length) || (SHELLS.test(sh.head) && sh.flags.some((f) => /^-[a-z]*c[a-z]*$/i.test(f)))) {
+      add(`runs another command through a wrapper (${sh.head}); only commands on the allowlist are trusted`);
+      continue;
+    }
+    if (sh.head === 'ssh' && sshOperands(words) > 1) {
+      add('runs a remote command over ssh; not on the allowlist');
+      continue;
+    }
+    const allowed = keyFlags(sh.key);
+    if (allowed == null && prefix(sh.key)) { add(`unknown subcommand (${[sh.key, ...sh.rest.slice(0, 1)].join(' ')}); not on the allowlist`); continue; }
+    if (allowed == null) { add(`unknown command (${sh.key}); not on the allowlist`); continue; }
+    if ((SUB_DEPTH[sh.head] ?? 0) > 0 && sh.key === sh.head && sh.rest.length && !allowed.includes('*sub')) {
+      add(`unknown subcommand (${sh.head} ${sh.rest[0]}); not on the allowlist`);
+      continue;
+    }
+    for (const f of sh.flags) {
+      const k = flagKey(sh.head, f);
+      if (allowed.includes(k) || (/^-[A-Za-z]#$/.test(k) && allowed.includes(k.slice(0, 2)))) continue;
+      // a cluster of known single-letter options (`ls -la` when -l and -a are known)
+      if (/^-[A-Za-z]{2,}$/.test(f) && !PWSH_CMDLET.test(sh.head) && [...f.slice(1)].every((c) => allowed.includes(`-${c}`))) continue;
+      add(`unknown option ${f} for ${sh.key}; not on the allowlist`);
+    }
+  }
+  return out;
+}
+
 /** @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}} */
-export function checkDanger(command, baseRisk = 'safe') {
+export function checkDanger(command, baseRisk = 'safe', { lenient = false, allowlist = null } = {}) {
   let risk = baseRisk;
   const warnings = [];
   let critical = false;
@@ -203,19 +736,16 @@ export function checkDanger(command, baseRisk = 'safe') {
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
@@ -223,13 +753,35 @@ export function checkDanger(command, baseRisk = 'safe') {
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
-    const d = checkDanger(c);
+  pipelineDeleteCheck(text, hit);
+  for (const c of new Set(inner)) {
+    if (c === command || !c.trim()) continue;
+    // the allowlist judges the command as written (a wrapper around a payload is already high); payloads get the deny rules
+    const d = checkDanger(c, 'safe', { allowlist: { off: true } });
     for (const m of d.warnings) hit(d.risk, m, d.critical);
   }
   for (const [re, r, msg, crit] of RULES) if (re.test(text)) hit(r, msg, crit);
+  if (!lenient && !allowlist?.off) for (const m of allowlistProblems(command, { extra: allowlist?.extra })) hit('high', m);
   return { risk, warnings, critical };
 }
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
/bin/bash -lc 'node test/pipeline.test.js' in /workspace/tellsh
 exited 1 in 201ms:
TAP version 13
# Subtest: stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
ok 1 - stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
  ---
  duration_ms: 12.474877
  ...
# Subtest: PowerShell vocabulary maps to the same tool family
ok 2 - PowerShell vocabulary maps to the same tool family
  ---
  duration_ms: 1.348966
  ...
# Subtest: tagger: tool-conditioned BIO spans, only tags valid for the tool
ok 3 - tagger: tool-conditioned BIO spans, only tags valid for the tool
  ---
  duration_ms: 11.903527
  ...
# Subtest: slot merge: tagger primary, regex fills misses and replaces invalid values
ok 4 - slot merge: tagger primary, regex fills misses and replaces invalid values
  ---
  duration_ms: 7.96791
  ...
# Subtest: end-to-end bash + PowerShell + BSD
ok 5 - end-to-end bash + PowerShell + BSD
  ---
  duration_ms: 40.65853
  ...
# Subtest: history: pronouns, "same for", container/service/pid references (EN + PL)
ok 6 - history: pronouns, "same for", container/service/pid references (EN + PL)
  ---
  duration_ms: 56.672229
  ...
# Subtest: history is optional: without it a pronoun request gets a hint, never a guessed value
ok 7 - history is optional: without it a pronoun request gets a hint, never a guessed value
  ---
  duration_ms: 1.400542
  ...
# Subtest: history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
ok 8 - history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
  ---
  duration_ms: 0.584488
  ...
# Subtest: loadHistory reads only the tail of HISTFILE and returns the last n commands
not ok 9 - loadHistory reads only the tail of HISTFILE and returns the last n commands
  ---
  duration_ms: 0.900207
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
  duration_ms: 0.665351
  ...
# Subtest: second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
ok 11 - second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
  ---
  duration_ms: 8.554336
  ...
# Subtest: out-of-domain requests are rejected (also by the composer)
ok 12 - out-of-domain requests are rejected (also by the composer)
  ---
  duration_ms: 0.948579
  ...
# Subtest: env detection and overrides
ok 13 - env detection and overrides
  ---
  duration_ms: 0.56757
  ...
1..13
# tests 13
# suites 0
# pass 12
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 161.459399

codex
I reproduced two allowlist bypasses and a target-selection failure: an explicit PR number or environment can cause competing repository, secret, or config arguments to be silently discarded. The relevant regression tests pass, but they don’t cover these cases. The full suite could not pass in this read-only environment; the failure I inspected was an attempted temporary-file write.
codex
- **Major — Command substitutions bypass the allowlist.** [danger.js:694](/workspace/tellsh/src/danger.js:694): `checkDanger('echo "$(unknown-program)"')` returns `safe` without warnings; backtick substitutions also bypass checking. Editing a safe suggestion to this command permits execution with Enter. Check substituted commands or escalate unreadable substitutions to high risk.

- **Major — Real executable names are skipped as expression fragments.** [danger.js:696](/workspace/tellsh/src/danger.js:696): `7z x a.7z -o/tmp` and `.hidden --erase` both return `safe`, bypassing checks for unknown programs and flags. Restrict fragment exemptions to verified expression contexts.

- **Major — An explicit environment suppresses unresolved deployment arguments.** [fill.js:333](/workspace/tellsh/src/fill.js:333): `deploy worker --env staging --config other.toml` produces `npx wrangler deploy --env staging` with `missing: []`. Silently dropping the requested configuration can deploy a different worker. Preserve the environment and withhold the unresolved arguments as `<ARGS>`.

- **Major — An explicit PR number suppresses competing repositories.** [fill.js:324](/workspace/tellsh/src/fill.js:324): `merge pr 42 --repo acme/app or --repo other/repo` produces `gh pr merge 42 --repo acme/app` with `missing: []`. It silently chooses one repository despite an uncertain target. Repository ambiguity must produce a placeholder independently of the PR number.

VERDICT: REQUEST_CHANGES
tokens used
86,723
- **Major — Command substitutions bypass the allowlist.** [danger.js:694](/workspace/tellsh/src/danger.js:694): `checkDanger('echo "$(unknown-program)"')` returns `safe` without warnings; backtick substitutions also bypass checking. Editing a safe suggestion to this command permits execution with Enter. Check substituted commands or escalate unreadable substitutions to high risk.

- **Major — Real executable names are skipped as expression fragments.** [danger.js:696](/workspace/tellsh/src/danger.js:696): `7z x a.7z -o/tmp` and `.hidden --erase` both return `safe`, bypassing checks for unknown programs and flags. Restrict fragment exemptions to verified expression contexts.

- **Major — An explicit environment suppresses unresolved deployment arguments.** [fill.js:333](/workspace/tellsh/src/fill.js:333): `deploy worker --env staging --config other.toml` produces `npx wrangler deploy --env staging` with `missing: []`. Silently dropping the requested configuration can deploy a different worker. Preserve the environment and withhold the unresolved arguments as `<ARGS>`.

- **Major — An explicit PR number suppresses competing repositories.** [fill.js:324](/workspace/tellsh/src/fill.js:324): `merge pr 42 --repo acme/app or --repo other/repo` produces `gh pr merge 42 --repo acme/app` with `missing: []`. It silently chooses one repository despite an uncertain target. Repository ambiguity must produce a placeholder independently of the PR number.

VERDICT: REQUEST_CHANGES
