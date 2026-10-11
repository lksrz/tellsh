Reading additional input from stdin...
OpenAI Codex v0.160.0
--------
workdir: /workspace/tellsh
model: gpt-6.1-sol
provider: openai
approval: never
sandbox: read-only
reasoning effort: xhigh
reasoning summaries: none
session id: 01a12cce-703e-7c43-a144-8e7b4fe600c3
--------
user
Review of tellsh release 0.3.2 (git diff 080b628..HEAD in /workspace/tellsh; mainly src/cli.js prompt, README, CHANGELOG, test/regressions28.test.js). Change: the interactive prompt is now a single raw-mode keypress: Enter runs the command at every risk level (no y/yes), Esc / Ctrl+C / n / q abort, e edits; medium/high/composed/unrated show a colored warning line; incomplete commands never run (Enter opens editor); catastrophic commands still require retyping the full command; --yes unchanged. This UX is an explicit product decision by the owner, do not flag it as a finding by itself; review correctness, terminal handling (raw mode restore, escape sequences, Ctrl+C, paste, non-TTY), safety regressions, docs consistency. Read-only. Findings with severity and file:line. End with exactly one line 'VERDICT: APPROVE' (no blocker/major) or 'VERDICT: REQUEST_CHANGES'.
codex
I’ll review the diff and prompt tests, then check terminal handling, safety gates, and docs consistency within the chosen UX.
exec
/bin/bash -lc 'git diff 080b628..HEAD -- src/cli.js README.md CHANGELOG.md test/regressions28.test.js' in /workspace/tellsh
 succeeded in 0ms:
diff --git a/CHANGELOG.md b/CHANGELOG.md
new file mode 100644
index 0000000..69f1302
--- /dev/null
+++ b/CHANGELOG.md
@@ -0,0 +1,12 @@
+# Changelog
+
+## 0.3.2
+
+**Prompt (UX).** A single keypress: **Enter runs the command at every risk level** (no more `y` / `yes`), **Esc** or
+**Ctrl+C** (also `n` / `q`) aborts, `e` edits. Medium-risk commands show a yellow warning line, high-risk and unrated ones a
+red one, composed (experimental) ones a yellow "experimental" line, before the prompt. Commands that match a catastrophic
+pattern (`rm -rf /`, `mkfs`, `Format-Volume`, …) still have to be typed again in full. An incomplete command (a
+`<PLACEHOLDER>` left) never runs: Enter opens the editor. `--yes` is unchanged (safe catalog commands only).
+
+The model, catalog and templates are unchanged from 0.3.1 (new catalog templates are in progress on
+`feat/templates-catalog` and need a retrain that passes the full test suite).
diff --git a/README.md b/README.md
index 6628c77..2e80b73 100644
--- a/README.md
+++ b/README.md
@@ -28,7 +28,8 @@ $ tellsh list files sorted by modification time, oldest first, with details
 $ ls -l -t -r
   composed (experimental) ls · bash/linux · risk: high · confidence: 100%
   ~ assembled from a flag vocabulary (request asks for -t -r not in the catalog command); check it carefully
-Experimental. Type "yes" to run, e to edit, anything else aborts:
+! High risk: check the command before pressing Enter.
+[Enter] run · e edit · Esc abort
 ```
 
 ## Install
@@ -58,8 +59,9 @@ tellsh [options] <request...>
       --top <k>, --threshold <p>, -v/--version, -h/--help
 ```
 
-At the prompt: **Enter** runs a safe command, **e** edits (prefilled readline), **n** aborts. A medium-risk command never
-runs on a plain Enter: it needs **y**. High-risk and composed commands need `yes`; catastrophic patterns (`rm -rf /`, `mkfs`, `Format-Volume`, …) need the whole command retyped. The command
+At the prompt (a single keypress, since 0.3.2): **Enter** runs the command at every risk level, **e** edits (prefilled
+readline), **Esc** / **Ctrl+C** (or **n**) aborts. Medium- and high-risk and composed commands print a colored warning line
+first, so read it before Enter; catastrophic patterns (`rm -rf /`, `mkfs`, `Format-Volume`, …) need the whole command retyped. The command
 runs in the target shell (`$SHELL -c`, `fish -c`, `pwsh -NoProfile -Command`, `cmd /d /s /c`). Without a TTY tellsh
 only prints. Exit codes: command's own · `0` printed · `2` usage · `3` not understood · `4` `--yes` refused ·
 `5` no rendering for this shell · `130` aborted.
@@ -95,7 +97,7 @@ explicit path to the end of the request (`list files in ~/Old Projects`) and oth
    │                         score < threshold ───┼──► SECOND PASS: flag composer (experimental)
    │                         or ≥1 unexplained    │    head from stage-1 tools · flags from NL triggers
    │                         modifier             │    (+ tldr stems) · bash -n + allowed-flag check
-   ▼                                              ▼    · risk high · explicit "yes"
+   ▼                                              ▼    · risk high · red warning   
  STAGE 3  BIO slot tagger (tool = input feature, only the tool's slot types are candidates,
           constrained Viterbi)  ──► typed spans ──► validate ──► regex extractor fills misses / replaces
           invalid values  ──► template for (shell, OS, coreutils) ──► per-shell quoting
@@ -286,7 +288,7 @@ confident it is a shell task), or when the request asks for a flag the catalog c
 trigger does not occur in ≥5% of that intent's own training paraphrases (`model/compose_explained.json`), so "hidden"
 does not re-route `hidden_files`. Value flags (`-n 5`, `-maxdepth 2`, `-t ext4`, `-k 2 -t ,`, `--since`), tar
 compression from the archive name, `bash -n` and an allowed-flag check validate the result; it is always
-**high risk (the trust rule below), shown as "composed (experimental)", needs an explicit `yes` and is refused by `--yes`**. POSIX shells only.
+**high risk (the trust rule below), shown as "composed (experimental)", shows a warning before Enter and is refused by `--yes`**. POSIX shells only.
 
 ## Safety model
 
@@ -295,7 +297,7 @@ compression from the archive name, `bash -n` and an allowed-flag check validate
   own single quotes are the only ones), no `$`, backticks or `$'…'`, no `;` `|` `&` `<` `>`, no control characters, no
   find action (`-exec`, `-ok`, `-delete`, …), no leading `-` (a path is rendered `./-x`; a raw value must pass its
   validator), and a program slot (`{cmd} --version`) is a plain program name, never a path or `source` / `.` / `eval` /
-  a shell. Everything else is **at least high** and needs an explicit `yes`; `--yes` never runs it: a command you edit
+  a shell. Everything else is **at least high** and shows a red warning before Enter runs it; `--yes` never runs it: a command you edit
   (any change; an unchanged one keeps its rating), a composed command, a command resolved from history (a replay), and
   any typed text with an unknown program (`diskutil …`), construct or sed script. A catalog render of a medium / high
   intent with plain values keeps its intent's risk; with other values it is high. The parser below (deny rules,
@@ -317,11 +319,11 @@ compression from the archive name, `bash -n` and an allowed-flag check validate
   …), an environment assignment in front of a command (`FOO=1 cmd`), an **unknown program** (`mywrap`, `cowsay`), an
   **unknown subcommand** (`git filter-branch`, `npx cowsay`, `gh pr close`) or an **unknown flag** for a known command
   (`gh pr merge --admin`, `git push --force-with-lease`, `rm -P`) makes the command **high** risk, with the reason, so
-  it needs an explicit `yes`. Known option clusters (`ls -la` when `-l` and `-a` are known) and attached numbers
+  it is high (red warning). Known option clusters (`ls -la` when `-l` and `-a` are known) and attached numbers
   (`tail -n5`) count as known. The composer's commands add the flags it validated against its tool vocabulary. Under
   the trust rule it no longer decides whether a typed or edited command is safe (none is); it raises catalog renders
   and adds reasons. Consequence: every catalog command that goes through `sudo` (service start/stop,
-  `apt install`, `chown`, `dmesg`, …) is high and needs `yes`.
+  `apt install`, `chown`, `dmesg`, …) is high (red warning).
 * `src/danger.js` also scans the **final** command — also edited ones — with deny rules, and can only escalate. It tokenizes each simple
   command (quotes, `--`, long options) and checks every command it may run: after a wrapper (`sudo`, `doas`, `su`,
   `runuser`, `pkexec`, `flock`, `nice`, `ionice`, `timeout`, `stdbuf`, `nohup`, `setsid`, `env`, `xargs`, `chrt`, `cgexec`,
@@ -440,7 +442,8 @@ retrain; `npm test && npm run eval`.
   `--prefix` / `--filter` / `--cwd` / `--project` (plus `-w` npm, `-R` gh, `-e` / `-c` wrangler) and "in workspace /
   repo / project / environment / config X"; other phrasings of a scope (`for the api package`) are not seen.
 * **The trust rule is deliberately blunt.** Every edit, however harmless (`ls -la` -> `ls -l`), every history replay
-  (`same for /var`, `count lines in it`) and every composed command is high and needs `yes`; a safe request with an
+  (`same for /var`, `count lines in it`) and every composed command is high and shows the red warning (since 0.3.2
+  Enter runs it; Esc aborts); a safe request with an
   unusual value (a file name with a quote, `$` or `&`, a grep pattern starting with `-`) is high too.
 * **The allowlist knows only what the catalog renders.** A command you type or edit with a flag tellsh never emits
   (`ls --color=never`, `git log --stat`) gets an extra "unknown option" reason. PowerShell expressions
diff --git a/src/cli.js b/src/cli.js
index c0432fb..8f95d23 100644
--- a/src/cli.js
+++ b/src/cli.js
@@ -42,9 +42,10 @@ Options:
   -v, --version     print version
   -h, --help        this help
 
-At the prompt: [Enter] runs a safe command · e edit · n abort. Medium-risk commands never run on a
-plain Enter: type "y". High-risk and composed (experimental) commands require typing "yes". Without a TTY
-(piped), tellsh only prints the command unless --yes is given.`;
+At the prompt: [Enter] runs the command at every risk level · e edit · Esc or Ctrl+C aborts. Medium-
+and high-risk (and composed, experimental) commands show a colored warning first; commands that could
+destroy the system must be typed again. Without a TTY (piped), tellsh only prints the command unless
+--yes is given.`;
 
 const C = process.stdout.isTTY && !process.env.NO_COLOR
   ? { dim: (s) => `\x1b[2m${s}\x1b[0m`, bold: (s) => `\x1b[1m${s}\x1b[0m`, red: (s) => `\x1b[31m${s}\x1b[0m`,
@@ -156,21 +157,52 @@ function printSuggestion(s, opts) {
 }
 
 /**
- * The prompt and the answer a command needs at its risk: safe runs on Enter (or y/yes); medium never runs on a plain
- * Enter, it needs an explicit "y"; high and composed (experimental) need the word "yes". `tak`/`t` are the Polish forms.
- * -> { prompt, accepts(answer) }
+ * The prompt and warning for a command at its risk (0.3.2): [Enter] runs at EVERY risk level, Esc / Ctrl+C / n / q
+ * aborts, e edits. Medium, high, composed (experimental) and unrated commands keep a colored warning line.
+ * An incomplete command (placeholder left) never runs: Enter opens the editor instead.
+ * -> { warning, prompt, decide(key) } where decide returns 'run' | 'edit' | 'abort' | null (ignore the key)
  */
 export function confirmRule(risk, { composed = false, incomplete = false } = {}) {
-  const ans = (a) => String(a ?? '').trim().toLowerCase();
-  // a placeholder is left: it is edited first, never run as is
-  if (incomplete) return { prompt: 'e edit · n abort: ', accepts: () => false };
-  // an unknown rating is treated as high
-  if (composed || (risk !== 'safe' && risk !== 'medium')) {
-    return { prompt: `${risk === 'high' ? C.red('High risk.') : C.yellow('Experimental.')} Type "yes" to run, e to edit, anything else aborts: `,
-      accepts: (a) => ['yes', 'tak'].includes(ans(a)) };
-  }
-  if (risk === 'medium') return { prompt: `${C.yellow('Medium risk.')} Type y to run, e to edit, anything else aborts: `, accepts: (a) => ['y', 'yes', 't', 'tak'].includes(ans(a)) };
-  return { prompt: '[Enter] run · e edit · n abort: ', accepts: (a) => ['', 'y', 'yes', 't', 'tak'].includes(ans(a)) };
+  let warning = null;
+  if (risk === 'high' || (risk !== 'safe' && risk !== 'medium')) warning = C.red('! High risk: check the command before pressing Enter.');
+  else if (composed) warning = C.yellow('! Experimental (composed) command: check it before pressing Enter.');
+  else if (risk === 'medium') warning = C.yellow('! Medium risk: check the command before pressing Enter.');
+  const prompt = incomplete ? '[Enter]/e edit · Esc abort ' : '[Enter] run · e edit · Esc abort ';
+  return { warning, prompt, decide: (key) => decideKey(key, incomplete) };
+}
+
+/** One raw keypress chunk -> action. A lone ESC aborts; longer escape sequences (arrows, F-keys) are ignored. */
+export function decideKey(key, incomplete = false) {
+  const k = String(key ?? '');
+  if (k === '\r' || k === '\n' || k === '\r\n') return incomplete ? 'edit' : 'run';
+  if (k === '\x1b' || k === '\x03' || k === '\x04') return 'abort';
+  const c = k.toLowerCase();
+  if (c === 'e') return 'edit';
+  if (c === 'n' || c === 'q') return 'abort';
+  return null;
+}
+
+/** Wait for a single key in raw mode (no line buffering, no echo). */
+function readKey(rule) {
+  return new Promise((res) => {
+    const input = process.stdin;
+    process.stdout.write(rule.prompt);
+    const wasRaw = input.isRaw;
+    input.setRawMode(true);
+    input.resume();
+    const done = (action) => {
+      input.removeListener('data', onData);
+      input.setRawMode(wasRaw);
+      input.pause();
+      process.stdout.write('\n');
+      res(action);
+    };
+    const onData = (buf) => {
+      const action = rule.decide(buf.toString('utf8'));
+      if (action) done(action);
+    };
+    input.on('data', onData);
+  });
 }
 
 export async function main(argv = process.argv.slice(2)) {
@@ -251,10 +283,9 @@ export async function main(argv = process.argv.slice(2)) {
   let incomplete = s.missing.length > 0;
   for (;;) {
     const rule = confirmRule(risk, { composed: s.method === 'composed', incomplete });
-    const rl = createInterface({ input: process.stdin, output: process.stdout });
-    const ans = (await ask(rl, rule.prompt)).trim().toLowerCase();
-    rl.close();
-    if (ans === 'e' || ans === 'edit') {
+    if (rule.warning) process.stdout.write(rule.warning + '\n');
+    const action = await readKey(rule);
+    if (action === 'edit') {
       command = (await editLine(command)).trim();
       if (!command) return 130;
       // unchanged: the suggestion as rated; any change is a user edit, at least high (danger.js trust rule)
@@ -266,8 +297,7 @@ export async function main(argv = process.argv.slice(2)) {
       for (const w of d.warnings) process.stdout.write(riskColor(risk)(`  ! ${w}`) + '\n');
       continue;
     }
-    if (incomplete) { if (ans === '') continue; return 130; }
-    if (!rule.accepts(ans)) { console.log('aborted'); return 130; }
+    if (action !== 'run' || incomplete) { console.log('aborted'); return 130; }
     if (critical) {
       const rl2 = createInterface({ input: process.stdin, output: process.stdout });
       const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
diff --git a/test/regressions28.test.js b/test/regressions28.test.js
index 529ff60..df596d5 100644
--- a/test/regressions28.test.js
+++ b/test/regressions28.test.js
@@ -89,22 +89,23 @@ test('paths: the one-argument and the several-argument forms agree', () => {
 });
 
 // ---------- (2) prompt ----------
-test('final3-claude major: a medium-risk command never runs on a plain Enter', () => {
-  const med = confirmRule('medium');
-  for (const a of ['', ' ', 'n', 'no', 'x']) assert.equal(med.accepts(a), false, JSON.stringify(a));
-  for (const a of ['y', 'Y', 'yes', 't', 'tak']) assert.equal(med.accepts(a), true, a);
-  assert.match(med.prompt, /Type y to run/);
-  const high = confirmRule('high');
-  for (const a of ['', 'y', 't']) assert.equal(high.accepts(a), false, JSON.stringify(a));
-  for (const a of ['yes', 'YES', 'tak']) assert.equal(high.accepts(a), true, a);
-  // composed (experimental) is like high; an unknown rating too
-  assert.equal(confirmRule('medium', { composed: true }).accepts('y'), false);
-  assert.equal(confirmRule(undefined).accepts(''), false);
-  // safe: Enter runs
-  for (const a of ['', 'y', 'yes']) assert.equal(confirmRule('safe').accepts(a), true, JSON.stringify(a));
-  // incomplete: never runs as is
-  for (const r of ['safe', 'medium', 'high']) assert.equal(confirmRule(r, { incomplete: true }).accepts('yes'), false, r);
-  // the reviewed medium rows need "y"
+test('0.3.2 UX: Enter runs at every risk level, Esc/Ctrl+C abort, medium/high keep a warning', () => {
+  for (const r of ['safe', 'medium', 'high', undefined]) {
+    const rule = confirmRule(r);
+    for (const k of ['\r', '\n']) assert.equal(rule.decide(k), 'run', `${r} ${JSON.stringify(k)}`);
+    for (const k of ['\x1b', '\x03', 'n', 'q']) assert.equal(rule.decide(k), 'abort', `${r} ${JSON.stringify(k)}`);
+    assert.equal(rule.decide('e'), 'edit');
+    // arrows / other keys / typed words are ignored, never run
+    for (const k of ['\x1b[A', 'y', 'yes', 'x', ' ']) assert.equal(rule.decide(k), null, `${r} ${JSON.stringify(k)}`);
+  }
+  assert.equal(confirmRule('safe').warning, null);
+  assert.match(confirmRule('medium').warning, /Medium risk/);
+  assert.match(confirmRule('high').warning, /High risk/);
+  assert.match(confirmRule(undefined).warning, /High risk/);
+  assert.match(confirmRule('safe', { composed: true }).warning, /Experimental/);
+  // incomplete: never runs as is, Enter opens the editor
+  for (const r of ['safe', 'medium', 'high']) assert.equal(confirmRule(r, { incomplete: true }).decide('\r'), 'edit', r);
+  // the reviewed medium rows still carry the medium warning
   for (const q of ['chmod 777 /srv/my app', 'move /tmp/old notes to /tmp/archive']) assert.equal(run(q).risk, 'medium', q);
 });
 

exec
/bin/bash -lc "pwd; git status --short; git diff --stat 080b628..HEAD; rg --files -g AGENTS.md -g package.json -g '*regressions28*' -g '*cli*' -g 'README*' -g 'CHANGELOG*'" in /workspace/tellsh
 succeeded in 0ms:
/workspace/tellsh
?? review/032-r1-claude.md
?? review/032-r1-codex.md
 CHANGELOG.md               | 12 ++++++++
 README.md                  | 21 +++++++------
 package.json               |  2 +-
 src/cli.js                 | 74 ++++++++++++++++++++++++++++++++--------------
 test/regressions28.test.js | 33 +++++++++++----------
 5 files changed, 94 insertions(+), 48 deletions(-)
test/regressions28.test.js
test/cli.test.js
README.md
data/tldr/README.md
CHANGELOG.md
package.json
hybrid/package/tellsh-model-enc/package.json
hybrid/package/tellsh-model-enc/README.md
src/cli.js

exec
/bin/bash -lc 'for f in /AGENTS.md /workspace/AGENTS.md /workspace/tellsh/AGENTS.md; do if [ -f "$f" ]; then cat "$f"; fi; done; rg --files src test | sort; cat package.json' in /workspace/tellsh
 succeeded in 0ms:
src/allowlist-data.js
src/cascade.js
src/catalog.js
src/classifier.js
src/cli.js
src/compose.js
src/danger.js
src/env.js
src/features.js
src/fill.js
src/guards.js
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
test/allowlist.test.js
test/cli.test.js
test/compose.test.js
test/danger.test.js
test/devtools.test.js
test/fixtures/parity.json
test/hybrid.test.js
test/matrix.test.js
test/parity.test.js
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
test/regressions25.test.js
test/regressions26.test.js
test/regressions27.test.js
test/regressions28.test.js
test/regressions29.test.js
test/regressions3-history.test.js
test/regressions3-render.test.js
test/regressions3.test.js
test/regressions30.test.js
test/regressions4.test.js
test/regressions5.test.js
test/regressions6.test.js
test/regressions7.test.js
test/regressions8.test.js
test/regressions9.test.js
test/shells.test.js
test/slot-cases.js
test/slots.test.js
test/templates.test.js
{
  "name": "tellsh",
  "version": "0.3.2",
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
/bin/bash -lc 'nl -ba src/cli.js' in /workspace/tellsh
 succeeded in 0ms:
     1	// tellsh CLI: natural language (PL/EN) -> shell command, confirm, run.
     2	import { spawn, spawnSync } from 'node:child_process';
     3	import { createInterface } from 'node:readline';
     4	import { readFileSync } from 'node:fs';
     5	import { constants as osConstants } from 'node:os';
     6	import { getModel } from './model.js';
     7	import { suggest as pipelineSuggest } from './pipeline.js';
     8	import { checkDanger, maxRisk } from './danger.js';
     9	import { detectEnv, normShell, normOs } from './env.js';
    10	import { loadHistory } from './history.js';
    11	import { joinArgs } from './shellwords.js';
    12	import { suggestLazy } from './rerank/hybrid.js';
    13	
    14	const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    15	
    16	const HELP = `tellsh ${pkg.version} — natural language (Polish/English) -> shell command, fully offline
    17	
    18	Usage: tellsh [options] <request...>
    19	
    20	  tellsh pokaż 10 największych plików w ~/Pobrane
    21	  tellsh what is listening on port 8080
    22	  tellsh --history delete it
    23	  tellsh -n kill node
    24	
    25	Options:
    26	  -n, --dry-run     print the command only, never run it
    27	  -y, --yes         run without prompting (only risk=safe commands straight from the catalog;
    28	                    never history-resolved, composed, incomplete or medium/high-risk ones)
    29	  -e, --explain     show tool/intent scores, slots and their source
    30	      --json        machine-readable output (implies --dry-run)
    31	      --shell <s>   target shell: bash|zsh|sh|powershell|fish|cmd (default: detected)
    32	      --os <o>      target OS: linux|darwin|win32 (default: this machine); --platform is an alias
    33	      --history[=FILE]  use the previous shell command to resolve "it", "same for /var", ...
    34	                    (read in memory only, never stored or logged; also TELLSH_HISTORY=1)
    35	      --no-compose  never fall back to the experimental flag composer
    36	      --compose     force the experimental composer
    37	      --hybrid      when unsure, re-rank with the optional neural model (needs onnxruntime-node and the
    38	                    tellsh-model-enc bundle; see HYBRID.md; also TELLSH_HYBRID=1, or =safe to never
    39	                    turn a rejection into an answer)
    40	      --top <k>     show k candidate intents (default 3)
    41	      --threshold <p>  override confidence threshold
    42	  -v, --version     print version
    43	  -h, --help        this help
    44	
    45	At the prompt: [Enter] runs the command at every risk level · e edit · Esc or Ctrl+C aborts. Medium-
    46	and high-risk (and composed, experimental) commands show a colored warning first; commands that could
    47	destroy the system must be typed again. Without a TTY (piped), tellsh only prints the command unless
    48	--yes is given.`;
    49	
    50	const C = process.stdout.isTTY && !process.env.NO_COLOR
    51	  ? { dim: (s) => `\x1b[2m${s}\x1b[0m`, bold: (s) => `\x1b[1m${s}\x1b[0m`, red: (s) => `\x1b[31m${s}\x1b[0m`,
    52	      yellow: (s) => `\x1b[33m${s}\x1b[0m`, green: (s) => `\x1b[32m${s}\x1b[0m`, cyan: (s) => `\x1b[36m${s}\x1b[0m` }
    53	  : { dim: (s) => s, bold: (s) => s, red: (s) => s, yellow: (s) => s, green: (s) => s, cyan: (s) => s };
    54	const riskColor = (r) => (r === 'high' ? C.red : r === 'medium' ? C.yellow : C.green);
    55	
    56	export function parseArgs(argv) {
    57	  const o = { dryRun: false, yes: false, explain: false, json: false, top: 3, words: [], threshold: undefined, shell: undefined, os: undefined,
    58	    history: process.env.TELLSH_HISTORY === '1', historyFile: undefined, compose: 'auto', hybrid: ['1', 'safe'].includes(process.env.TELLSH_HYBRID) };
    59	  for (let i = 0; i < argv.length; i++) {
    60	    const a = argv[i];
    61	    if (a === '--') { o.words.push(...argv.slice(i + 1)); break; }
    62	    else if (a === '-n' || a === '--dry-run') o.dryRun = true;
    63	    else if (a === '-y' || a === '--yes') o.yes = true;
    64	    else if (a === '-e' || a === '--explain') o.explain = true;
    65	    else if (a === '--json') { o.json = true; o.dryRun = true; }
    66	    else if (a === '--top') o.top = Math.max(1, parseInt(argv[++i], 10) || 3);
    67	    else if (a.startsWith('--top=')) o.top = Math.max(1, parseInt(a.slice(6), 10) || 3);
    68	    else if (a === '--threshold' || a.startsWith('--threshold=')) {
    69	      const v = a === '--threshold' ? argv[++i] : a.slice(12);
    70	      o.threshold = /^\s*(?:\d+(?:\.\d*)?|\.\d+)\s*$/.test(v ?? '') ? Number(v) : NaN;
    71	      if (!(o.threshold >= 0 && o.threshold <= 1)) o.badThreshold = v ?? '';
    72	    }
    73	    else if (a === '--platform' || a === '--os') o.os = argv[++i];
    74	    else if (a.startsWith('--os=') || a.startsWith('--platform=')) o.os = a.split('=')[1];
    75	    else if (a === '--shell') o.shell = argv[++i];
    76	    else if (a.startsWith('--shell=')) o.shell = a.slice(8);
    77	    else if (a === '--history') o.history = true;
    78	    else if (a.startsWith('--history=')) { o.history = true; o.historyFile = a.slice(10); }
    79	    else if (a === '--no-history') o.history = false;
    80	    else if (a === '--compose') o.compose = 'force';
    81	    else if (a === '--no-compose') o.compose = 'off';
    82	    else if (a === '--hybrid') o.hybrid = true;
    83	    else if (a === '--no-hybrid') o.hybrid = false;
    84	    else if (a === '-v' || a === '--version') o.version = true;
    85	    else if (a === '-h' || a === '--help') o.help = true;
    86	    else o.words.push(a);
    87	  }
    88	  return o;
    89	}
    90	
    91	/** Pure function used by the CLI and tests: query -> suggestion object (see src/pipeline.js). */
    92	export function suggest(query, { top = 3, threshold, platform, shell, os, history, cwd, compose } = {}) {
    93	  return pipelineSuggest(query, { top, threshold, shell, os: os || platform, history, cwd, compose });
    94	}
    95	
    96	function ask(rl, q) {
    97	  return new Promise((res) => rl.question(q, res));
    98	}
    99	
   100	function editLine(initial) {
   101	  return new Promise((res) => {
   102	    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
   103	    rl.question(C.cyan('edit> '), (ans) => { rl.close(); res(ans); });
   104	    rl.write(initial);
   105	  });
   106	}
   107	
   108	function hasBin(name) {
   109	  const r = spawnSync(process.platform === 'win32' ? 'where' : 'which', [name], { stdio: 'ignore' });
   110	  return r.status === 0;
   111	}
   112	
   113	/** Run with the target shell: $SHELL/bash/zsh/sh -c, fish -c, pwsh -NoProfile -Command, cmd /d /s /c. */
   114	export function shellInvocation(command, shell) {
   115	  if (shell === 'powershell') {
   116	    const bin = hasBin('pwsh') ? 'pwsh' : 'powershell';
   117	    return [bin, ['-NoProfile', '-Command', command]];
   118	  }
   119	  // with /s, cmd strips the first and last `"` of everything after /c: wrap the command in one more
   120	  // pair so a command that itself starts/ends with a quote ("C:\Program Files\x.exe" ...) survives
   121	  if (shell === 'cmd') return ['cmd.exe', ['/d', '/s', '/c', `"${command}"`]];
   122	  if (shell === 'fish') return ['fish', ['-c', command]];
   123	  const envShell = process.env.SHELL && normShell(process.env.SHELL) === shell ? process.env.SHELL : null;
   124	  return [envShell || shell || 'bash', ['-c', command]];
   125	}
   126	
   127	export function runShell(command, shellName = normShell(process.env.SHELL) || 'bash') {
   128	  const [shell, args] = shellInvocation(command, shellName);
   129	  return new Promise((res) => {
   130	    const child = spawn(shell, args, { stdio: 'inherit', windowsVerbatimArguments: shell === 'cmd.exe' });
   131	    child.on('error', (e) => { console.error(`tellsh: cannot start ${shell}: ${e.message}`); res(127); });
   132	    child.on('exit', (code, sig) => res(code ?? (sig ? 128 + (osConstants.signals[sig] ?? 1) : 1)));
   133	  });
   134	}
   135	
   136	const PROMPT = { powershell: 'PS> ', cmd: '> ', fish: '> ' };
   137	function printSuggestion(s, opts) {
   138	  const out = process.stdout;
   139	  out.write(`${C.bold((PROMPT[s.shell] || '$ ') + s.command)}\n`);
   140	  const conf = `${(s.confidence * 100).toFixed(0)}%`;
   141	  const label = s.method === 'composed' ? C.yellow('composed (experimental)') + C.dim(` ${s.composed.tool}${s.composed.sub ? ' ' + s.composed.sub : ''}`) : s.intent;
   142	  out.write(C.dim('  ') + label + C.dim(` · ${s.shell}/${s.os} · risk: `) + riskColor(s.risk)(s.risk) + C.dim(` · confidence: ${conf}`) + '\n');
   143	  if (s.method === 'composed') out.write(C.yellow(`  ~ assembled from a flag vocabulary (${s.reason}); check it carefully`) + '\n');
   144	  if (s.context?.note) out.write(C.cyan(`  ↺ from history: ${s.context.note}`) + '\n');
   145	  for (const w of s.warnings) out.write(riskColor(s.risk)(`  ! ${w}`) + '\n');
   146	  if (s.missing.length) out.write(C.yellow(`  ? missing: ${s.missing.join(', ')} — edit the command (e) before running`) + '\n');
   147	  if (s.hint) out.write(C.dim(`  hint: ${s.hint}`) + '\n');
   148	  if (s.notes) out.write(C.dim(`  note: ${s.notes}`) + '\n');
   149	  if (opts.explain) {
   150	    if (s.description) out.write(C.dim(`  ${s.description}`) + '\n');
   151	    if (s.variant) out.write(C.dim(`  rendering: ${s.variant}`) + '\n');
   152	    if (s.catalogCommand) out.write(C.dim(`  catalog command was: ${s.catalogCommand}`) + '\n');
   153	    out.write(C.dim(`  slots: ${JSON.stringify(s.slots)}${s.slotSources ? ' via ' + JSON.stringify(s.slotSources) : ''}`) + '\n');
   154	    out.write(C.dim('  tools: ' + s.tools.map((t) => `${t.tool} ${(t.p * 100).toFixed(1)}%`).join(', ')) + '\n');
   155	    out.write(C.dim('  candidates: ' + s.candidates.map((c) => `${c.intent} ${(c.p * 100).toFixed(1)}%`).join(', ')) + '\n');
   156	  }
   157	}
   158	
   159	/**
   160	 * The prompt and warning for a command at its risk (0.3.2): [Enter] runs at EVERY risk level, Esc / Ctrl+C / n / q
   161	 * aborts, e edits. Medium, high, composed (experimental) and unrated commands keep a colored warning line.
   162	 * An incomplete command (placeholder left) never runs: Enter opens the editor instead.
   163	 * -> { warning, prompt, decide(key) } where decide returns 'run' | 'edit' | 'abort' | null (ignore the key)
   164	 */
   165	export function confirmRule(risk, { composed = false, incomplete = false } = {}) {
   166	  let warning = null;
   167	  if (risk === 'high' || (risk !== 'safe' && risk !== 'medium')) warning = C.red('! High risk: check the command before pressing Enter.');
   168	  else if (composed) warning = C.yellow('! Experimental (composed) command: check it before pressing Enter.');
   169	  else if (risk === 'medium') warning = C.yellow('! Medium risk: check the command before pressing Enter.');
   170	  const prompt = incomplete ? '[Enter]/e edit · Esc abort ' : '[Enter] run · e edit · Esc abort ';
   171	  return { warning, prompt, decide: (key) => decideKey(key, incomplete) };
   172	}
   173	
   174	/** One raw keypress chunk -> action. A lone ESC aborts; longer escape sequences (arrows, F-keys) are ignored. */
   175	export function decideKey(key, incomplete = false) {
   176	  const k = String(key ?? '');
   177	  if (k === '\r' || k === '\n' || k === '\r\n') return incomplete ? 'edit' : 'run';
   178	  if (k === '\x1b' || k === '\x03' || k === '\x04') return 'abort';
   179	  const c = k.toLowerCase();
   180	  if (c === 'e') return 'edit';
   181	  if (c === 'n' || c === 'q') return 'abort';
   182	  return null;
   183	}
   184	
   185	/** Wait for a single key in raw mode (no line buffering, no echo). */
   186	function readKey(rule) {
   187	  return new Promise((res) => {
   188	    const input = process.stdin;
   189	    process.stdout.write(rule.prompt);
   190	    const wasRaw = input.isRaw;
   191	    input.setRawMode(true);
   192	    input.resume();
   193	    const done = (action) => {
   194	      input.removeListener('data', onData);
   195	      input.setRawMode(wasRaw);
   196	      input.pause();
   197	      process.stdout.write('\n');
   198	      res(action);
   199	    };
   200	    const onData = (buf) => {
   201	      const action = rule.decide(buf.toString('utf8'));
   202	      if (action) done(action);
   203	    };
   204	    input.on('data', onData);
   205	  });
   206	}
   207	
   208	export async function main(argv = process.argv.slice(2)) {
   209	  const opts = parseArgs(argv);
   210	  if (opts.version) { console.log(pkg.version); return 0; }
   211	  if (opts.help || !opts.words.length) { console.log(HELP); return opts.help ? 0 : 2; }
   212	  if (opts.badThreshold != null) { console.error(`tellsh: --threshold needs a number between 0 and 1 (got "${opts.badThreshold}")`); return 2; }
   213	  // the shell removed the quotes: a word with spaces is quoted again so "/tmp/a b" stays one path ("delete folder" as
   214	  // the first of several arguments is request text; a quoted argument that is neither is unclear: see joinArgs)
   215	  const joined = joinArgs(opts.words);
   216	  const query = joined?.text;
   217	  if (joined == null) { console.error('tellsh: an argument contains spaces and both kinds of quotes; it cannot be read as one value'); return 2; }
   218	  if (opts.shell && !normShell(opts.shell)) { console.error(`tellsh: unknown shell "${opts.shell}" (bash|zsh|sh|powershell|fish|cmd)`); return 2; }
   219	  if (opts.os && !normOs(opts.os)) { console.error(`tellsh: unknown OS "${opts.os}" (linux|darwin|win32)`); return 2; }
   220	  let s;
   221	  try {
   222	    getModel();
   223	    const env = detectEnv({ shell: opts.shell, os: opts.os });
   224	    // history is read only when asked for, kept in memory for this call, never printed or stored. Only the previous
   225	    // command is a reference target; the line before it is read too because some shells (zsh, fish, PSReadLine)
   226	    // write this `tellsh …` call to the file before it runs, and buildContext drops it.
   227	    const history = opts.history ? loadHistory({ shell: env.shell, file: opts.historyFile, n: 2 }) : undefined;
   228	    const so = { top: opts.top, threshold: opts.threshold, env, history, cwd: process.cwd(), compose: opts.compose, unclearArgs: joined.unclear };
   229	    s = opts.hybrid ? await suggestLazy(query, { ...so, system: process.env.TELLSH_HYBRID === 'safe' ? 'A+B-safe' : 'A+B' }) : pipelineSuggest(query, so);
   230	  } catch (e) {
   231	    console.error(`tellsh: ${e.message}`);
   232	    return 1;
   233	  }
   234	
   235	  if (opts.json) {
   236	    console.log(JSON.stringify(s, null, 2));
   237	    return s.understood ? 0 : 3;
   238	  }
   239	  if (!s.understood && s.context?.rule === 'refused') {
   240	    // a history reference that cannot be resolved safely: nothing to suggest
   241	    console.log(`Cannot resolve "${query}" from history: ${s.hint || s.context.note || 'not guessing'}.`);
   242	    console.log(C.dim('Name the target explicitly.'));
   243	    return 3;
   244	  }
   245	  if (!s.understood && s.hint && s.confidence >= s.threshold) {
   246	    // understood, but the only command the catalog has would contradict the request ("uninstall", "except 1234", "close pr")
   247	    console.log(`Not suggesting a command for "${query}": ${s.hint}.`);
   248	    return 3;
   249	  }
   250	  if (!s.understood) {
   251	    console.log(`I don't understand "${query}" (confidence ${(s.confidence * 100).toFixed(0)}% < ${(s.threshold * 100).toFixed(0)}%).`);
   252	    console.log('Did you mean:');
   253	    for (const c of s.candidates) console.log(`  - ${c.intent}: ${c.description} ${C.dim(`(${(c.p * 100).toFixed(1)}%)`)}`);
   254	    if (s.hint) console.log(C.dim(`hint: ${s.hint}`));
   255	    console.log(C.dim('Try rephrasing, or use --threshold to lower the bar.'));
   256	    return 3;
   257	  }
   258	  if (s.gap) {
   259	    console.log(`No ${s.shell} rendering for "${s.intent}" on ${s.os}: ${s.gap}.`);
   260	    console.log(C.dim(`Try --shell bash (or another shell) to see the command.`));
   261	    return 5;
   262	  }
   263	
   264	  printSuggestion(s, opts);
   265	  if (opts.dryRun) return 0;
   266	
   267	  const interactive = process.stdin.isTTY && process.stdout.isTTY;
   268	  const shellName = s.shell;
   269	  if (opts.yes) {
   270	    const fromHistory = Object.values(s.slotSources || {}).includes('history');
   271	    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog' || fromHistory || s.hybrid?.deferred) {
   272	      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' || fromHistory ? 'resolved from history' : s.missing.length ? 'incomplete' : s.hybrid?.deferred ? 're-ranked by the neural fallback' : s.risk;
   273	      console.log(C.yellow(`  --yes only auto-runs safe catalog commands; this one is ${why}. Not running.`));
   274	      return 4;
   275	    }
   276	    return runShell(s.command, shellName);
   277	  }
   278	  if (!interactive) return 0; // print-only when piped
   279	
   280	  let command = s.command;
   281	  let risk = s.risk;
   282	  let critical = s.critical;
   283	  let incomplete = s.missing.length > 0;
   284	  for (;;) {
   285	    const rule = confirmRule(risk, { composed: s.method === 'composed', incomplete });
   286	    if (rule.warning) process.stdout.write(rule.warning + '\n');
   287	    const action = await readKey(rule);
   288	    if (action === 'edit') {
   289	      command = (await editLine(command)).trim();
   290	      if (!command) return 130;
   291	      // unchanged: the suggestion as rated; any change is a user edit, at least high (danger.js trust rule)
   292	      const d = command === s.command ? { risk: s.risk, warnings: s.warnings, critical: s.critical } : checkDanger(command, s.baseRisk);
   293	      risk = maxRisk(s.baseRisk, d.risk);
   294	      critical = d.critical;
   295	      incomplete = /<[A-Z_]+>/.test(command);
   296	      process.stdout.write(C.dim('  risk: ') + riskColor(risk)(risk) + '\n');
   297	      for (const w of d.warnings) process.stdout.write(riskColor(risk)(`  ! ${w}`) + '\n');
   298	      continue;
   299	    }
   300	    if (action !== 'run' || incomplete) { console.log('aborted'); return 130; }
   301	    if (critical) {
   302	      const rl2 = createInterface({ input: process.stdin, output: process.stdout });
   303	      const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
   304	      rl2.close();
   305	      if (a2 !== command) { console.log('aborted'); return 130; }
   306	    }
   307	    return runShell(command, shellName);
   308	  }
   309	}

exec
/bin/bash -lc "cat test/regressions28.test.js; cat test/cli.test.js; git diff 080b628..HEAD -- package.json; rg -n 'confirmRule|decideKey|raw|pty|SIGINT|SIGTERM|editLine|setRawMode|isTTY|--yes|catastrophic|incomplete|full command|Type.y|explicit.*yes' src test README.md CHANGELOG.md" in /workspace/tellsh
 succeeded in 0ms:
// Regression tests for the v0.3 final3 review (review/final3-claude.md, review/final3-codex.md) and the rules that replace
// further parser patches:
//  (1) paths: an unquoted path or name followed by more words of its name (`~/Old Projects`) is taken to the end of its
//      span; when that end is unclear (`/tmp/a.txt b.txt`) the path is a placeholder. Never the first word alone.
//  (2) prompt: a medium-risk command never runs on a plain Enter (it needs "y"); a high-risk one needs "yes".
//  (3) tools that run project code (pytest, npm/yarn/pnpm run, make, cargo, go test/run, python/node scripts, npx,
//      wrangler) are at least medium, also for --help / --version.
//  (4) scope options (--workspace, --repo / "in project X", --env, --config, --prefix) are kept or placeholdered, never
//      dropped.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest, pathTail } from '../src/pipeline.js';
import { assessCommand, checkDanger } from '../src/danger.js';
import { scopeMentions } from '../src/fill.js';
import { confirmRule } from '../src/cli.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'fish', os: 'linux', coreutils: 'gnu' },
  { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, { shell: 'cmd', os: 'win32', coreutils: 'gnu' }];
const run = (q, env = BASH) => suggest(q, { env });

// ---------- (1) paths ----------
test('final3-claude major: an unquoted path with spaces is never cut at its first space', () => {
  const whole = {
    'delete the folder ~/Old Projects': "rm -r ~/'Old Projects'",
    'delete folder /tmp/my data': "rm -r '/tmp/my data'",
    'delete all .log files in /var/log old': "find '/var/log old' -type f -iname '*.log' -delete",
    'chmod 777 /srv/my app': "chmod 777 '/srv/my app'",
    'move /tmp/old notes to /tmp/archive': "mv -i '/tmp/old notes' /tmp/archive",
    // the same for a bare name and for Polish
    'delete the folder Old Projects': "rm -r 'Old Projects'",
    'usuń folder ~/Stare Projekty': "rm -r ~/'Stare Projekty'",
    // a modifier or a connector ends the name
    'delete the folder ~/Old Projects please': "rm -r ~/'Old Projects'",
    'delete the folder ~/Old Projects recursively': "rm -r ~/'Old Projects'",
    'copy ~/My Notes to /tmp/backup': "cp -ri ~/'My Notes' /tmp/backup",
  };
  for (const [q, cmd] of Object.entries(whole)) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.deepEqual(r.missing, [], q);
  }
});

test('final3-claude major: a path whose end is unclear is a placeholder with a warning', () => {
  for (const [q, cmd, k] of [
    ['delete file /tmp/a.txt b.txt', 'rm <FILE>', 'file'],
    ['delete file /tmp/my notes.txt', 'rm <FILE>', 'file'],
    ['copy /tmp/my notes /tmp/b', 'cp -ri <SRC> /tmp/b', 'src'],
  ]) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.ok(r.missing.includes(k), q);
    assert.ok(r.warnings.some((w) => /unclear where the unquoted name ends/.test(w)), `${q}: ${r.warnings.join('; ')}`);
  }
  // ends in sentence punctuation: the existing placeholder (the name may include the `.`)
  const p = run('delete the folder ~/Old Projects.');
  assert.equal(p.command, 'rm -r <PATH>');
});

test('paths: words of the request after a path are not part of its name', () => {
  for (const [q, cmd] of [
    ['make script.sh executable', 'chmod +x script.sh'],
    ['delete file /tmp/notes.txt now', 'rm /tmp/notes.txt'],
    ['delete file /tmp/notes.txt permanently', 'rm /tmp/notes.txt'],
    ['copy /tmp/a /tmp/b', 'cp -ri /tmp/a /tmp/b'],
    ['copy /tmp/a.txt /tmp/b', 'cp -ri /tmp/a.txt /tmp/b'],
    ['list files in ~/Old Projects', "ls -lah ~/'Old Projects'"],
    ['which directory inside node_modules is the largest? show 15', 'du -h -d 1 node_modules 2>/dev/null | sort -rh | head -n 15'],
    ['ile jest plików w /etc razem z podkatalogami', 'find /etc -type f | wc -l'],
    ['utwórz archiwum tar.gz z /etc o nazwie etc.tgz', 'tar -czvf etc.tgz /etc'],
  ]) assert.equal(run(q).command, cmd, q);
  // a withheld path keeps its placeholder in an optional part of the template (never `git restore` of everything)
  assert.equal(pathTail('rm /tmp/a.txt b.txt', '/tmp/a.txt', [], { used: ['b.txt'] }), null);
  assert.deepEqual(pathTail('rm /tmp/a.txt b.txt', '/tmp/a.txt', []), { ambiguous: true, words: ['b.txt'] });
});

test('paths: the composer takes the whole name too, never its first word', () => {
  const r = run('recursively chmod 777 /srv/my app');
  assert.ok(r.command.endsWith("'/srv/my app'"), r.command);
  assert.ok(!/(?:^|\s)\/srv\/my(?:\s|$)/.test(r.command), r.command);
  // a read-only composed command is not blocked by words of the request after its path
  assert.equal(run('find files in /tmp owned by user bob').command, 'find /tmp -type f -user bob');
});

test('paths: the one-argument and the several-argument forms agree', () => {
  // `tellsh delete the folder "~/Old Projects"` is quoted again by joinArgs
  assert.equal(run('delete the folder ~/Old Projects').command, run("delete the folder '~/Old Projects'").command);
});

// ---------- (2) prompt ----------
test('0.3.2 UX: Enter runs at every risk level, Esc/Ctrl+C abort, medium/high keep a warning', () => {
  for (const r of ['safe', 'medium', 'high', undefined]) {
    const rule = confirmRule(r);
    for (const k of ['\r', '\n']) assert.equal(rule.decide(k), 'run', `${r} ${JSON.stringify(k)}`);
    for (const k of ['\x1b', '\x03', 'n', 'q']) assert.equal(rule.decide(k), 'abort', `${r} ${JSON.stringify(k)}`);
    assert.equal(rule.decide('e'), 'edit');
    // arrows / other keys / typed words are ignored, never run
    for (const k of ['\x1b[A', 'y', 'yes', 'x', ' ']) assert.equal(rule.decide(k), null, `${r} ${JSON.stringify(k)}`);
  }
  assert.equal(confirmRule('safe').warning, null);
  assert.match(confirmRule('medium').warning, /Medium risk/);
  assert.match(confirmRule('high').warning, /High risk/);
  assert.match(confirmRule(undefined).warning, /High risk/);
  assert.match(confirmRule('safe', { composed: true }).warning, /Experimental/);
  // incomplete: never runs as is, Enter opens the editor
  for (const r of ['safe', 'medium', 'high']) assert.equal(confirmRule(r, { incomplete: true }).decide('\r'), 'edit', r);
  // the reviewed medium rows still carry the medium warning
  for (const q of ['chmod 777 /srv/my app', 'move /tmp/old notes to /tmp/archive']) assert.equal(run(q).risk, 'medium', q);
});

// ---------- (3) project code ----------
test('final3-codex major: tools that run project code are at least medium, also for --help', () => {
  for (const env of SHELLS) {
    const r = run('show the help for pytest', env);
    assert.equal(r.risk, 'medium', `${env.shell}: ${r.command}`);
    assert.ok(r.warnings.some((w) => /runs code from the project/.test(w)), env.shell);
  }
  for (const c of ['pytest --help', 'pytest --version', 'py.test --help', 'make --help', 'make', 'cargo --version', 'cargo test',
    'go test ./...', 'go run .', 'go generate', 'python3 script.py', 'python -m mypkg', 'node app.js', 'node server.js --help',
    'npx eslint --help', 'npm run build', 'npm run --help', 'npm test', 'yarn dev', 'yarn --version', 'pnpm run build',
    'wrangler --version', 'wrangler dev', 'npx wrangler deploy', 'bun run dev', 'tox --help', 'poetry run pytest', 'uv run x.py', 'bundle exec rake']) {
    assert.notEqual(assessCommand(c).risk, 'safe', c);
    assert.notEqual(checkDanger(c, 'safe', { rendered: true }).risk, 'safe', c);
  }
  // the tool's own --help / --version, without project code: unchanged
  for (const c of ['node --version', 'python3 --version', 'npm --version', 'npm --help', 'pnpm --help', 'go version', 'go help', 'git --help']) {
    assert.equal(checkDanger(c, 'safe', { rendered: true }).risk, 'safe', c);
  }
  for (const q of ['pokaz wersje cargo', 'help for make']) assert.equal(run(q).risk, 'medium', q);
  // a medium intent gets no extra warning (it is medium already)
  assert.ok(!run('run npm deploy').warnings.some((w) => /runs code from the project/.test(w)));
});

// ---------- (4) scope options ----------
test('final3-codex major: an npm workspace is kept, never dropped', () => {
  for (const env of SHELLS) {
    const r = run('run npm deploy --workspace staging', env);
    assert.match(r.command, /^npm run '?deploy'? --workspace staging$/, `${env.shell}: ${r.command}`);
  }
  for (const [q, cmd] of [
    ['run npm deploy -w staging', 'npm run deploy --workspace staging'],
    ['run npm deploy --workspace=staging', 'npm run deploy --workspace staging'],
    ['run the build script in workspace api', 'npm run build --workspace api'],
    ['install express in workspace api', 'npm install express --workspace api'],
  ]) assert.equal(run(q).command, cmd, q);
  // two workspaces: neither is guessed
  const two = run('run npm deploy --workspace a --workspace b');
  assert.equal(two.command, 'npm run deploy --workspace <WORKSPACE>');
  assert.ok(two.missing.includes('workspace'));
  // a workspace that is not a readable name
  assert.ok(run('run npm deploy --workspace ../x').missing.includes('workspace'));
});

test('final3-codex major: a scope npm cannot express is a placeholder, never dropped', () => {
  for (const [q, cmd] of [
    ['run npm deploy --env prod', 'npm run deploy <SCOPE>'],
    ['run npm test in project api', 'npm run test <SCOPE>'],
    ['run tests with npm --prefix api', 'npm run test <SCOPE>'],
    ['run npm build --config x.json', 'npm run build <SCOPE>'],
  ]) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.ok(r.missing.includes('scope'), q);
  }
});

test('final3-codex major: an explicit pull request does not hide an unresolved repository', () => {
  for (const env of SHELLS) assert.equal(run('merge pr 42 in project acme/backend', env).command, 'gh pr merge 42 --repo acme/backend', env.shell);
  for (const [q, cmd] of [
    ['merge pr 42 in project backend', 'gh pr merge 42 --repo <REPO>'],
    ['view pr 42 in project acme/backend', 'gh pr view 42 --repo acme/backend'],
    ['list prs in project acme/backend', 'gh pr list --repo acme/backend'],
    ['merge pr 42 in acme/backend', 'gh pr merge 42 --repo acme/backend'],
    ['merge pr 42 --repo acme/backend', 'gh pr merge 42 --repo acme/backend'],
    // gh has no environment: placeholder
    ['merge pr 42 --env prod', 'gh pr merge 42 <SCOPE>'],
  ]) assert.equal(run(q).command, cmd, q);
  // a wrangler config file is not dropped either
  assert.ok(run('deploy worker --config other.toml').missing.length > 0);
});

test('scope mentions: short options belong to one tool', () => {
  assert.deepEqual(scopeMentions('npm_run_script', 'run build -w api').map((s) => s.kind), ['workspace']);
  assert.deepEqual(scopeMentions('gh_pr_merge', 'merge pr -w api'), []);
  assert.deepEqual(scopeMentions('gh_pr_merge', 'merge pr 4 -R a/b').map((s) => [s.kind, s.value]), [['repo', 'a/b']]);
  // "in this project" is the working directory's
  assert.deepEqual(scopeMentions('npm_run_script', 'run build in this project'), []);
});

test('a contested npm script is a placeholder, never the literal marker', () => {
  const r = run('run npm build or test');
  assert.equal(r.command, 'npm run <SCRIPT>');
  assert.ok(!/'\?'/.test(r.command));
});
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
});
diff --git a/package.json b/package.json
index 5269a12..6ca711e 100644
--- a/package.json
+++ b/package.json
@@ -1,6 +1,6 @@
 {
   "name": "tellsh",
-  "version": "0.3.1",
+  "version": "0.3.2",
   "description": "Offline natural-language (Polish & English) to shell command CLI: tool->intent->slot cascade of tiny linear models + templates for bash/zsh/sh/PowerShell (fish/cmd best effort). No LLM at runtime, zero dependencies.",
   "type": "module",
   "bin": {
src/guards.js:26:const ACTION = String.raw`(?:delete|remove|rm|erase|wipe|purge|kill|terminate|stop|restart|reload|shut\w*|reboot|install|uninstall|upgrade|update|move|mv|rename|copy|cp|overwrite|push|pull|merge|deploy|drop|reset|clean|prune|format|chmod|chown|change|touch|run|start|create|make|commit|checkout|switch|enable|disable|truncate|empty|usuw\w*|usun\w*|kasuj\w*|skasuj\w*|wywal\w*|zabij\w*|ubij\w*|zatrzym\w*|restartuj\w*|zrestartuj\w*|przeladuj\w*|instaluj\w*|zainstaluj\w*|aktualizuj\w*|przeno\w*|przenies\w*|kopiuj\w*|skopiuj\w*|nadpis\w*|wypych\w*|wypchnij\w*|scal\w*|zmerguj\w*|resetuj\w*|czysc\w*|wyczysc\w*|formatuj\w*|zmieni\w*|zmien\w*|urucham\w*|uruchom\w*|odpal\w*|wylacz\w*|wlacz\w*|tworz\w*|utworz\w*|commituj\w*|zacommituj\w*)`;
src/guards.js:29:const PROHIBIT = new RegExp(String.raw`^\s*(?:(?:please|pls|prosze)\s+)?(?:don'?t|do\s+not|never|nie)\s+(?:(?:please|ever|prosze|wolno)\s+)?${ACTION}(?=[\s,;:.!?]|$)`, 'i');
src/guards.js:39:const ACTION_WORD = new RegExp(String.raw`^${ACTION}$`, 'i');
CHANGELOG.md:7:red one, composed (experimental) ones a yellow "experimental" line, before the prompt. Commands that match a catastrophic
CHANGELOG.md:8:pattern (`rm -rf /`, `mkfs`, `Format-Volume`, …) still have to be typed again in full. An incomplete command (a
CHANGELOG.md:9:`<PLACEHOLDER>` left) never runs: Enter opens the editor. `--yes` is unchanged (safe catalog commands only).
src/slots.js:35:const NUM = String.raw`(\d+(?:[.,]\d+)?)`;
src/slots.js:49:  shell: 'sh', bashowe: 'sh', skrypty: 'sh', skryptow: 'sh', yamlowe: 'yaml', jsonowe: 'json', jsonow: 'json',
src/slots.js:88:  [/\b(typecheck|type-check|sprawdzanie typow|type check)\b/, 'typecheck'],
src/slots.js:105:  'kill zabij ubij show pokaz pokaż sprawdz sprawdź check list lista via using uzywajac it its it\'s up out into ' +
src/slots.js:153:const UNIT_RE = String.raw`(minut\w*|mins?|minutes?|m|godzin\w*|godz|hours?|hrs?|h|dni|dnia|dzien|days?|d|dob\w*|tydzien|tygodni\w*|tyg|weeks?|w|miesiac\w*|mies|months?|lat|lata|rok|roku|years?)`;
src/slots.js:260:      const raw = trimPathPunct(text.slice(start, start + m[1].length));
src/slots.js:261:      if (!raw) continue;
src/slots.js:262:      if (/^\d+([.,]\d+)*$/.test(raw)) continue; // version/number
src/slots.js:263:      if (/^\d+(\.\d+)?[kmgt]i?b?$/i.test(raw)) continue; // size like 1.5GB
src/slots.js:264:      if (/^(e\.g|i\.e|np|tj|itp|etc|tar\.gz|tar\.bz2|tar\.xz)$/i.test(raw)) continue;
src/slots.js:265:      if (/^[^/]*\.[a-z]+$/i.test(raw) && !raw.includes('/')) {
src/slots.js:267:        if (/^[a-z0-9-]+(\.[a-z0-9-]+)*\.(com|org|net|io|pl|dev|de|uk|eu|gov|edu|info|co|app|ai|me|cloud|local|lan|internal|xyz|tech|ru|fr|it|es|nl|cz|us|ca)$/i.test(raw)) {
src/slots.js:268:          out.hosts.push(raw);
src/slots.js:269:          mark('HOST', start, start + raw.length, raw);
src/slots.js:273:      if (/:\/\//.test(raw)) continue;
src/slots.js:274:      found.push([start, raw, m[1].length]);
src/slots.js:276:    for (const [start, raw, len] of found.reverse()) {
src/slots.js:277:      spans.push([start, raw]);
src/slots.js:278:      mark('PATH', start, start + raw.length, raw);
src/slots.js:322:    const m = work.match(new RegExp(String.raw`(?:^|\s|[+><])${NUM}\s*(tb|tib|terabajt\w*|terabytes?|gb|gib|gigabajt\w*|gigabytes?|giga|gigs?|g|mb|mib|megabajt\w*|megabytes?|mega|megs?|meg|m|kb|kib|kilobajt\w*|kilobytes?|kilo|k|bajt\w*|bytes?|b)\b(?!\s*(?:dni|days?|godz|hour|minut))`, 'i'));
src/slots.js:333:  const durRe = new RegExp(String.raw`(?:\b(?:last|past|previous|within|in the last|ostatni\w*|poprzedni\w*|minion\w*|older than|starsze? niz|starszych niz|sprzed|ponad|over|more than|od|since|for|przez|z)\s+)?\b${NUM}\s*${UNIT_RE}\b(?:\s+ago|\s+temu)?`);
src/slots.js:486:  script: set('run uruchom odpal odpalic puść pusc wykonaj execute script skrypt skryptu skrypty npm'),
src/shellwords.js:6:// splitCommand(line, kind) -> { ok, segments: [{ words: string[], raw: string[] }] }
src/shellwords.js:8://   words[i]: the literal value, or AMB + raw text when it contains an expansion ($x, $(..), `..`,
src/shellwords.js:9://             {a,b}), or GLOB + raw text when it contains an unquoted * ? [
src/shellwords.js:18:export const rawOf = (w) => (isAmbiguous(w) ? w.slice(1) : w);
src/shellwords.js:42:  let raws = [];
src/shellwords.js:44:  let raw = '';
src/shellwords.js:55:      words.push(amb ? AMB + raw : glob ? GLOB + raw : w);
src/shellwords.js:56:      raws.push(raw);
src/shellwords.js:58:    w = null; raw = ''; amb = false; glob = false; quoted0 = false;
src/shellwords.js:64:  const flushSeg = (sep = '') => { flushWord(); if (words.length) segments.push({ words, raw: raws, sep, ...(subs.length ? { subs: [...subs] } : {}) }); else if (sep && segments.length) segments[segments.length - 1].sep += sep; words = []; raws = []; };
src/shellwords.js:140:      if (w != null && /^\d$/.test(w) && raw === w) { fd = w; w = null; raw = ''; } // fd number
src/shellwords.js:149:        if (keepRedirects) words.push(op), raws.push(op);
src/shellwords.js:154:      if (keepRedirects) { words.push(op); raws.push(op); } else dropNext = true;
src/shellwords.js:160:        if (home) { w = '~'; i += home[0].length - 1; raw += s.slice(start, i + 1); continue; }
src/shellwords.js:170:    if (w != null) raw += s.slice(start, i + 1);
src/tagger.js:176:    const raw = unquote(sp.text.trim());
src/tagger.js:180:        if (sp.quoted) p = raw;
src/tagger.js:192:      case 'NUM': { const n = normNum(raw); if (n != null) { ex.numbers.push(n); ex.count ??= n; } break; }
src/tagger.js:193:      case 'SIZE': { const e = extractSlots(raw); if (e.size) ex.size ??= e.size; break; }
src/tagger.js:194:      case 'TIME': { const e = extractSlots(raw); if (e.duration) ex.duration ??= e.duration; break; }
src/tagger.js:195:      case 'PORT': { const n = +raw.replace(/^:/, ''); if (Number.isInteger(n) && n > 0 && n < 65536) ex.port ??= n; break; }
src/tagger.js:196:      case 'PID': { const n = +raw; if (Number.isInteger(n) && n > 0) ex.pid ??= n; break; }
src/tagger.js:197:      case 'MODE': if (/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(raw)) ex.mode ??= raw; break;
src/tagger.js:198:      case 'EXT': { const e = normExt(raw); if (e) ex.ext ??= e; break; }
src/tagger.js:199:      case 'URL': if (VALID.URL(raw)) { ex.urls.push(raw); } break;
src/tagger.js:200:      case 'HOST': if (VALID.HOST(raw) && !isStopWord(raw)) { ex.hosts.push(raw.includes('@') ? raw.split('@')[1] : raw); if (raw.includes('@')) ex.target ??= raw; } break;
src/tagger.js:202:        if (!VALID.NAME(raw) || isStopWord(raw)) break;
src/tagger.js:203:        const f = foldKeepLength(raw).toLowerCase();
src/tagger.js:204:        push('NAME', KNOWN_PROCS.has(f) || KNOWN_SERVICES.has(f) ? raw : deinflect(f, KNOWN_PROCS) || deinflect(f, KNOWN_SERVICES) || raw);
src/tagger.js:207:      case 'BRANCH': case 'USER': if (VALID[sp.type](raw) && !isStopWord(raw) && !/^(origin|upstream)$/.test(raw)) push(sp.type, raw); break;
src/tagger.js:208:      default: if (VALID[sp.type]?.(raw)) push(sp.type, raw);
src/catalog.js:5://   {slot!raw}   value inserted verbatim (only for validated slots: numbers, ports, find size/age flags)
src/catalog.js:18:    'find {path} -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n {count!raw}',
src/catalog.js:21:    'du -h -d 1 {path} 2>/dev/null | sort -rh | head -n {count!raw}',
src/catalog.js:28:    'find {path} -type f -iname {glob}«{age!raw}»', { path: '.', ext: null }),
src/catalog.js:30:    'find {path} -type f {age!raw}«-iname {glob}»', { path: '.', age: '-mtime -1' }),
src/catalog.js:32:    'find {path} -type f -mtime +{days!raw}«-iname {glob}»', { path: '.', days: 30 }),
src/catalog.js:34:    'find {path} -type f -size +{size!raw}«-iname {glob}» -exec ls -lh {} +', { path: '.', size: '100M' }),
src/catalog.js:36:    'find {path} -type f -size -{size!raw}«-iname {glob}»', { path: '.', size: '1k' }),
src/catalog.js:48:    'sort {file} | uniq -c | sort -rn | head -n {count!raw}', { file: null, count: 10 }),
src/catalog.js:50:    "find {path} -type f -printf '%T@ %TY-%Tm-%Td %TH:%TM %p\\n' 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-",
src/catalog.js:52:    'safe', { darwin: "find {path} -type f -exec stat -f '%m %Sm %N' -t '%Y-%m-%d %H:%M' {} + 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-" }),
src/catalog.js:53:  T('empty_files', 'Find empty files', 'find {path} -type f -empty', { path: '.' }),
src/catalog.js:54:  T('empty_dirs', 'Find empty directories', 'find {path} -type d -empty', { path: '.' }),
src/catalog.js:65:    "find {path} -maxdepth {depth!raw} -not -path '*/.git/*' | sort", { path: '.', depth: 2 }),
src/catalog.js:70:  T('head_file', 'Show first lines of a file', 'head -n {count!raw} {file}', { file: null, count: 10 }),
src/catalog.js:71:  T('tail_file', 'Show last lines of a file', 'tail -n {count!raw} {file}', { file: null, count: 10 }),
src/catalog.js:76:    "sed -n '{start!raw},{end!raw}p' {file}", { file: null, start: null, end: null }),
src/catalog.js:85:  T('chmod', 'Change file permissions', 'chmod {mode!raw} {file}', { file: null, mode: null }, 'medium'),
src/catalog.js:95:  T('touch_file', 'Create an empty file', 'touch {file}', { file: null }),
src/catalog.js:118:  T('top_cpu', 'Processes using the most CPU', 'ps aux --sort=-%cpu | head -n {count!raw}',
src/catalog.js:119:    { count: 10 }, 'safe', { darwin: 'ps aux -r | head -n {count!raw}' }),
src/catalog.js:120:  T('top_mem', 'Processes using the most memory', 'ps aux --sort=-%mem | head -n {count!raw}',
src/catalog.js:121:    { count: 10 }, 'safe', { darwin: 'ps aux -m | head -n {count!raw}' }),
src/catalog.js:126:  T('kill_by_pid', 'Kill a process by PID', 'kill {pid!raw}', { pid: null }, 'high'),
src/catalog.js:129:    'lsof -ti tcp:{port!raw} -sTCP:LISTEN | xargs -r kill', { port: null }, 'high',
src/catalog.js:130:    { darwin: 'lsof -ti tcp:{port!raw} -sTCP:LISTEN | xargs kill', notes: 'needs lsof' }),
src/catalog.js:133:  T('process_on_port', 'Which process is using a port', "ss -ltnup 'sport = :{port!raw}'",
src/catalog.js:134:    { port: null }, 'safe', { darwin: 'lsof -nP -i :{port!raw}' }),
src/catalog.js:151:  T('last_logins', 'Show recent logins', 'last -n {count!raw}', { count: 10 }),
src/catalog.js:153:  T('env_var_get', 'Show the value of an environment variable', 'printenv {var!raw}', { var: null }),
src/catalog.js:158:    { notes: 'reads the history file (the history builtin is empty in a subshell, and HISTFILE is not exported to it)' }),
src/catalog.js:167:    'journalctl -u {service} -n {count!raw} --no-pager«--since {since}»', { service: null, count: 50 }, 'safe',
src/catalog.js:169:  T('journal_errors', 'Show system error logs', 'journalctl -p err -b --no-pager | tail -n {count!raw}',
src/catalog.js:170:    { count: 50 }, 'safe', { darwin: 'log show --style compact --last 1h --predicate \'messageType == error\' | tail -n {count!raw}' }),
src/catalog.js:183:  T('dmesg', 'Kernel messages (dmesg)', 'sudo dmesg | tail -n {count!raw}', { count: 50 }),
src/catalog.js:204:  T('ping_host', 'Ping a host', 'ping -c {count!raw} {host}', { host: null, count: 4 }),
src/catalog.js:209:  T('port_check', 'Check if a remote port is open', 'nc -zv {host} {port!raw}', { host: null, port: null }),
src/catalog.js:217:    'ssh -N -L {port!raw}:{rhost!raw}:{rport!raw} {target}', { port: null, target: null, rhost: 'localhost' }, 'medium'),
src/catalog.js:221:  T('git_log', 'Show recent commits', 'git log --oneline --graph --decorate -n {count!raw}', { count: 10 }),
src/catalog.js:246:  T('docker_logs', 'Show logs of a container', 'docker logs --tail {count!raw} -f {container}',
src/catalog.js:260:  T('npm_run_script', 'Run a package.json script with npm (npm run dev/build/test)', 'npm run {script}«--workspace {workspace}»«{scope!raw}»', { script: null }, 'medium'),
src/catalog.js:261:  T('npm_install', 'Install the project dependencies (or one package) with npm', 'npm {npmverb!raw}«{pkg}»«--workspace {workspace}»«{scope!raw}»', { npmverb: 'install' }, 'medium'),
src/catalog.js:262:  T('npm_install_global', 'Install an npm package globally', 'npm install -g {pkg}«{scope!raw}»', { pkg: null }, 'medium',
src/catalog.js:264:  T('pip_install', 'Install a Python package with pip', 'python3 -m pip install {pkg}«--target {piptarget}»«{scope!raw}»', { pkg: null }, 'medium'),
src/catalog.js:273:  T('wrangler_deploy', 'Deploy a Cloudflare Worker with wrangler', 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»«{args!raw}»', {}, 'medium'),
src/catalog.js:275:  // runs the configured build command): medium, like npm_run_script, never auto-run with --yes
src/catalog.js:276:  T('wrangler_dev', 'Run a Cloudflare Worker locally (wrangler dev)', 'npx wrangler dev«--env {wenv!raw}»«{args!raw}»', {}, 'medium'),
src/catalog.js:277:  T('wrangler_tail', 'Stream live logs of a deployed Cloudflare Worker', 'npx wrangler tail«--env {wenv!raw}»«{args!raw}»', {}, 'medium'),
src/catalog.js:278:  T('wrangler_secret_put', 'Set a secret (environment variable) on a Cloudflare Worker', 'npx wrangler secret put {var!raw}«--env {wenv!raw}»«{args!raw}»',
src/catalog.js:280:  T('wrangler_login', 'Log in to Cloudflare with wrangler', 'npx wrangler login«{args!raw}»', {}, 'medium'),
src/catalog.js:281:  T('wrangler_whoami', 'Show which Cloudflare account wrangler is logged in as', 'npx wrangler whoami«{args!raw}»', {}, 'medium'),
src/catalog.js:284:  T('gh_auth_status', 'Show GitHub CLI login status', 'gh auth status«{args!raw}»', {}),
src/catalog.js:285:  T('gh_auth_login', 'Log in to GitHub with the gh CLI', 'gh auth login«{args!raw}»', {}),
src/catalog.js:286:  T('gh_pr_list', 'List pull requests of the repository', 'gh pr list«--repo {repo!raw}»«{args!raw}»', {}),
src/catalog.js:287:  T('gh_pr_view', 'Show a pull request', 'gh pr view«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»', {}),
src/catalog.js:288:  T('gh_pr_create', 'Create a pull request from the current branch', 'gh pr create --fill«--repo {repo!raw}»«{args!raw}»', {}, 'medium'),
src/catalog.js:289:  T('gh_pr_checks', 'Show CI check status of a pull request', 'gh pr checks«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»', {}),
src/catalog.js:290:  T('gh_pr_merge', 'Merge a pull request', 'gh pr merge«{pr!raw}»«--repo {repo!raw}»«{delbranch!raw}»«{scope!raw}»', {}, 'medium'),
src/catalog.js:291:  T('gh_run_list', 'List recent GitHub Actions workflow runs', 'gh run list«--repo {repo!raw}»«{args!raw}»', {}),
src/catalog.js:292:  T('gh_run_view', 'Show a GitHub Actions run (and its failed logs)', 'gh run view«{num!raw}»«--repo {repo!raw}»«{scope!raw}»', {}),
src/tools.js:8:    'count_files', 'count_lines_code', 'recent_files', 'empty_files', 'empty_dirs', 'duplicate_files',
src/render.js:164: * then escapes the closing quote); empty arguments are dropped. `\"` would be right for Legacy but
src/render.js:178:  const masked = tpl.replace(/\{(\w+)(!raw)?\}/g, (m) => '\u0001'.repeat(m.length)).replace(/[«»]/g, ' ');
src/render.js:179:  for (const m of tpl.matchAll(/\{(\w+)(!raw)?\}/g)) {
src/pipeline.js:41:const NAME_NOUN = { path: String.raw`folder|directory|dir|katalog\w*|podkatalog\w*`, file: String.raw`file|plik\w*` };
src/pipeline.js:44:  const m = String(text).match(new RegExp(String.raw`(?:^|\s)(?:${NAME_NOUN[k]})\s+(\S+)(?:\s+(\S+))?`, 'i'));
src/pipeline.js:98:const PR_REFERENCE = /\b(?:that|this|its|the\s+same|the\s+previous|the\s+last|ten|tego|tamten)\s+(?:\w+\s+)?(?:prs?|pull[\s-]+requests?)\b|(?:^\s*|(?:^|\s)(?:zmerguj|scal|poka[zż]|zobacz|otw[oó]rz|zamknij|sprawd[zź]|wy[sś]wietl|zatwierd[zź]|zaakceptuj|przejrzyj)\S*\s+)to\s+(?:prs?|pull[\s-]+requests?)\b/i;
src/pipeline.js:148:  // (or a named location inside it) must not stand in for it: the slot stays empty (placeholder)
src/pipeline.js:414:const REPLAY = 'resolved from history (a replay of an earlier command, not a fresh catalog render); needs an explicit yes';
src/pipeline.js:583:  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
src/pipeline.js:628:    // `in $(pwd)`: the location is the output of a command, so an empty path slot is withheld too (never `.`)
src/pipeline.js:671:  // the slots the reference fills (pronoun) or leaves empty (refused / guarded)
src/pipeline.js:705:    // the reference points at something we cannot read safely: leave the slot empty (placeholder); a pull request stays
src/pipeline.js:796:      method = 'history-rule'; // history-derived: never auto-run by --yes
src/danger.js:527:function rawDiskWriteCheck(w, hit) {
src/danger.js:528:  if (positional(w.slice(1)).some((x) => RAW_DISK.test(normTarget(x)))) hit('high', 'writes onto a raw disk device', true);
src/danger.js:650:  [/\bdd\b[^|;&]*\bof=\/dev\//, 'high', 'dd writing to a raw device', true],
src/danger.js:651:  [/>\s*\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk)\w*/, 'high', 'redirect onto a raw disk device', true],
src/danger.js:705:const OPTVAL = String.raw`(?:'[^']*'|"[^"]*"|[^\s;&|'"])+`;
src/danger.js:706:const GIT_GLOBALS = new RegExp(String.raw`\bgit((?:\s+(?:(?:-C|-c|--git-dir|--work-tree|--namespace|--super-prefix|--config-env|--exec-path)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
src/danger.js:707:const DOCKER_GLOBALS = new RegExp(String.raw`\bdocker((?:\s+(?:(?:-H|--host|-c|--context|--config|-l|--log-level|--tls\w*)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
src/danger.js:899:    if (['tee', 'cp', 'install', 'sponge', 'pv', 'mv', 'ln'].includes(lower)) rawDiskWriteCheck(w, hit);
src/danger.js:940:// explicit "yes"; --yes never runs it. The parser above only raises risk, never lowers it: it adds the reasons and
src/danger.js:956: * characters or find actions. `dashOk`: a leading `-` is fine (a path rendered as `./-x`, a raw value its validator
src/fill.js:10:// Validators for slots that are inserted raw ({slot!raw}).
src/fill.js:90:const PR_VERB = /^(?:merge|squash|rebase|land|ship|accept|view|show|open|display|see|check|checkout|diff|review|approve|close|reopen|edit|ready|comment|list|get|fetch|print|describe|zmerguj\w*|scal\w*|poka[zż]\w*|zobacz\w*|otw[oó]rz\w*|zamknij\w*|sprawd[zź]\w*|wy[sś]wietl\w*|zatwierd[zź]\w*|zaakceptuj\w*|przejrzyj\w*)$/i;
src/fill.js:111:const PR_URL_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|and|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit|the|this|that|a|pull|requests?|pr|prs|at|is|me|you|can|could|would|i|want|to|url|link|[(]|zmerguj\w*|scal\w*|poka[zż]\w*|zobacz\w*|otw[oó]rz\w*|zamknij\w*|sprawd[zź]\w*)[\s:,]+)*[(<]?$/i;
src/fill.js:207:  uzyj uzywajac pomoca za daj odpal* pokaz* zobacz* sprawdz* wyswietl* wypisz* zerknij smialo dawaj
src/fill.js:209:  same but first one yes no if whether says saying mowi done finished skonczylem gotowe give access dostep* daj* what's whats did does before after przed zanim byl byla bylo byly verify* weryfik* dziala* works working still have has which who ktore ktory ktora jeszcze ma mamy mam powiedz confirm potwierdz* check sprawdzic`);
src/fill.js:273:const SEL_OTHER_NUMBER = /\b(?:issues?|tickets?|bugs?|zgloszeni\w*|fix(?:es)?|closes|resolves|naprawia\w*|zamyka\w*)\s+#?\d+\b/g;
src/fill.js:396:    if (quoted != null) return quoted || '?'; // `""`: named but empty, withheld
src/fill.js:508:const PORT_N = String.raw`(\d{1,5})(?![\w.:])`;
src/fill.js:521:  const local = t.match(new RegExp(String.raw`(?:local|lokaln\w*)\s+(?:port\w*\s+)?` + PORT_N));
src/fill.js:522:  const remote = t.match(new RegExp(String.raw`(?:remote|zdaln\w*|destination|docelow\w*|target)\s+(?:port\w*\s+)?` + PORT_N));
src/fill.js:550:      const ab = t.match(new RegExp(String.raw`(?<![\w.:])(\d{1,5})\s+(?:to|into|na|do|->)\s+(?:(?:the\s+)?port\w*\s+)?` + PORT_N));
src/fill.js:762:    const raw = quoted ?? m[4] ?? m[7] ?? null;
src/fill.js:763:    out.push({ kind: SCOPE_KIND[opt], value: quoted != null ? quoted.trim() || null : raw ? raw.replace(/[.,!?;:]+$/, '').replace(/^["'`]|["'`]$/g, '') || null : null, at: m.index });
src/fill.js:831:  const raw = foldKeepLength(String(text)).toLowerCase().split(/\s+/).filter(Boolean);
src/fill.js:832:  const words = raw.map(tokenClean);
src/fill.js:833:  const ends = raw.map((w, i) => /[.,;!?:]$/.test(w) || SEL_CLAUSE_END.test(words[i]));
src/fill.js:868:    const hit = [...(/[.,;!?:]$/.test(raw[i]) ? [] : nearest(i, 1, 5)), ...(alt ? nearest(i, -1, 3) : [])];
src/fill.js:874:function renderValue(name, raw, values, quote) {
src/fill.js:877:  if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
src/fill.js:893:  const out = template.replace(/«([^»]*)»|\{(\w+)(!raw)?\}/g, (m, seg, name, raw) => {
src/fill.js:896:      const r = seg.replace(/\{(\w+)(!raw)?\}/g, (m2, n2, raw2) => {
src/fill.js:898:        const val = renderValue(n2, !!raw2, values, quote);
src/fill.js:908:    const val = renderValue(name, !!raw, values, quote);
src/fill.js:1027:  const used = typeof tpl === 'function' ? Object.keys(values) : [...String(tpl).matchAll(/\{(\w+)(!raw)?\}/g)].map((m) => m[1]);
test/regressions28.test.js:15:import { confirmRule } from '../src/cli.js';
test/regressions28.test.js:94:    const rule = confirmRule(r);
test/regressions28.test.js:101:  assert.equal(confirmRule('safe').warning, null);
test/regressions28.test.js:102:  assert.match(confirmRule('medium').warning, /Medium risk/);
test/regressions28.test.js:103:  assert.match(confirmRule('high').warning, /High risk/);
test/regressions28.test.js:104:  assert.match(confirmRule(undefined).warning, /High risk/);
test/regressions28.test.js:105:  assert.match(confirmRule('safe', { composed: true }).warning, /Experimental/);
test/regressions28.test.js:106:  // incomplete: never runs as is, Enter opens the editor
test/regressions28.test.js:107:  for (const r of ['safe', 'medium', 'high']) assert.equal(confirmRule(r, { incomplete: true }).decide('\r'), 'edit', r);
src/allowlist-data.js:129:  "find": ["-Hn","-L","-c","-delete","-empty","-exec","-f","-h","-iname","-k","-l","-lh","-ls","-maxdepth","-mtime","-name","-not","-path","-printf","-r","-size","-t","-type","-xdev","-xtype","/c","/v"],
src/allowlist-data.js:149:  "get-content": ["-literalpath","-raw","-tail","-totalcount","-wait"],
src/allowlist-data.js:321:  "set-service": ["-name","-startuptype"],
README.md:51:  -y, --yes            run without prompting (only risk=safe commands straight from the catalog; never
README.md:52:                       history-resolved, composed, incomplete or medium/high-risk ones)
README.md:64:first, so read it before Enter; catastrophic patterns (`rm -rf /`, `mkfs`, `Format-Volume`, …) need the whole command retyped. The command
README.md:66:only prints. Exit codes: command's own · `0` printed · `2` usage · `3` not understood · `4` `--yes` refused ·
README.md:190:and `wrangler dev` runs the project's build command), deploys, merges, secrets and tunnels are `medium` risk, so `--yes`
README.md:208:never auto-run with `--yes`. Details, numbers and the trade-off (fewer rejections of requests outside the catalog):
README.md:291:**high risk (the trust rule below), shown as "composed (experimental)", shows a warning before Enter and is refused by `--yes`**. POSIX shells only.
README.md:298:  find action (`-exec`, `-ok`, `-delete`, …), no leading `-` (a path is rendered `./-x`; a raw value must pass its
README.md:300:  a shell. Everything else is **at least high** and shows a red warning before Enter runs it; `--yes` never runs it: a command you edit
README.md:315:  pytest` is `pytest --help`, medium, and `--yes` does not run it; `node --version`, `npm --help` stay safe.
README.md:357:* `--yes` only runs `safe` commands, i.e. fresh catalog renders with plain values (the trust rule): never
README.md:358:  history-resolved, composed, edited, incomplete or medium/high-risk ones. Non-TTY use prints only.
README.md:436:* `<ARGS>`, `<WENV>` and `<SCOPE>` are placeholders, not values: tellsh never runs an incomplete command; edit it (`e`) first.
src/cli.js:27:  -y, --yes         run without prompting (only risk=safe commands straight from the catalog;
src/cli.js:28:                    never history-resolved, composed, incomplete or medium/high-risk ones)
src/cli.js:48:--yes is given.`;
src/cli.js:50:const C = process.stdout.isTTY && !process.env.NO_COLOR
src/cli.js:63:    else if (a === '-y' || a === '--yes') o.yes = true;
src/cli.js:100:function editLine(initial) {
src/cli.js:162: * An incomplete command (placeholder left) never runs: Enter opens the editor instead.
src/cli.js:165:export function confirmRule(risk, { composed = false, incomplete = false } = {}) {
src/cli.js:170:  const prompt = incomplete ? '[Enter]/e edit · Esc abort ' : '[Enter] run · e edit · Esc abort ';
src/cli.js:171:  return { warning, prompt, decide: (key) => decideKey(key, incomplete) };
src/cli.js:174:/** One raw keypress chunk -> action. A lone ESC aborts; longer escape sequences (arrows, F-keys) are ignored. */
src/cli.js:175:export function decideKey(key, incomplete = false) {
src/cli.js:177:  if (k === '\r' || k === '\n' || k === '\r\n') return incomplete ? 'edit' : 'run';
src/cli.js:185:/** Wait for a single key in raw mode (no line buffering, no echo). */
src/cli.js:191:    input.setRawMode(true);
src/cli.js:195:      input.setRawMode(wasRaw);
src/cli.js:267:  const interactive = process.stdin.isTTY && process.stdout.isTTY;
src/cli.js:272:      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' || fromHistory ? 'resolved from history' : s.missing.length ? 'incomplete' : s.hybrid?.deferred ? 're-ranked by the neural fallback' : s.risk;
src/cli.js:273:      console.log(C.yellow(`  --yes only auto-runs safe catalog commands; this one is ${why}. Not running.`));
src/cli.js:283:  let incomplete = s.missing.length > 0;
src/cli.js:285:    const rule = confirmRule(risk, { composed: s.method === 'composed', incomplete });
src/cli.js:289:      command = (await editLine(command)).trim();
src/cli.js:295:      incomplete = /<[A-Z_]+>/.test(command);
src/cli.js:300:    if (action !== 'run' || incomplete) { console.log('aborted'); return 130; }
src/cli.js:303:      const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
src/rerank/tokenizer.js:67:      const raw = m[0];
src/rerank/tokenizer.js:68:      const norm = raw.normalize('NFKC');
src/rerank/tokenizer.js:69:      const same = norm === raw;
src/rerank/tokenizer.js:71:      // code point index -> UTF-16 offset in raw (only exact when NFKC did not change the word)
src/rerank/tokenizer.js:77:        out.push({ id: p.id, start: m.index + (same ? cu[s] : 0), end: m.index + (same ? cu[e] : raw.length) });
test/slot-cases.js:47:  ['chmod', 'ustaw uprawnienia 644 na config.yml', 'chmod 644 config.yml'],
src/compose.js:7:// Composed commands are not catalog renders: high risk by the trust rule (danger.js), confirmed explicitly (never --yes).
src/compose.js:13:import { splitCommand, rawOf } from './shellwords.js';
src/compose.js:28:      F('-l', ['long', 'detail', 'details', 'permission', 'with size', 'owner', 'full info', 'szczegol', 'dlug', 'uprawnien', 'wlasciciel']),
src/compose.js:47:      F('-empty', ['empty', 'pust']),
src/compose.js:339:  if (spec.filters) for (const x of ['-name', '-iname', '-mtime', '-mmin', '-size', '-type', '-maxdepth', '-empty', '-newer', '-print0', '-user']) vocab.add(x);
src/compose.js:346:  const words = r.segments[0].words.map(rawOf);
test/cli.test.js:49:test('non-TTY without --yes only prints', () => {
test/cli.test.js:56:test('--yes runs safe commands and passes exit code', () => {
test/cli.test.js:57:  const r = run('--yes', 'print', 'working', 'directory');
test/cli.test.js:62:test('--yes refuses non-safe commands', () => {
test/cli.test.js:63:  const r = run('--yes', 'delete', 'file', 'nothing-here.txt');
test/cli.test.js:106:test('composed commands are labelled experimental and refused by --yes', () => {
test/cli.test.js:109:  const y = run('--shell', 'bash', '--yes', 'list files sorted by modification time, oldest first, with details');
test/regressions3-render.test.js:28:  assert.deepEqual([...pwshNativeSlots('docker logs --tail {count!raw} -f {container}')], ['container']);
src/variants.js:15:// Template syntax is the catalog one ({slot}, {slot!raw}, «optional»). Function templates get
src/variants.js:32:    bsd: 'find {path} -xdev -type f -exec du -k {} + 2>/dev/null | sort -rn | head -n {count!raw}',
src/variants.js:33:    gnuMac: 'find {path} -xdev -type f -exec du -h {} + 2>/dev/null | gsort -rh | head -n {count!raw}',
src/variants.js:34:    pwsh: `${PS_FILES} | Sort-Object Length -Descending | Select-Object -First {count!raw} -Property Length, FullName`,
src/variants.js:38:    bsd: 'du -k -d 1 {path} 2>/dev/null | sort -rn | head -n {count!raw}',
src/variants.js:39:    gnuMac: 'gdu -h -d 1 {path} 2>/dev/null | gsort -rh | head -n {count!raw}',
src/variants.js:40:    pwsh: "Get-ChildItem -LiteralPath {path} -Directory -Force | ForEach-Object { [pscustomobject]@{ Size = (Get-ChildItem -LiteralPath $_.FullName -File -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum; Path = $_.FullName } } | Sort-Object Size -Descending | Select-Object -First {count!raw}",
src/variants.js:56:    pwsh: `${PS_FILES} | Where-Object Name -Like {glob}«| Where-Object LastWriteTime -GT (Get-Date).AddMinutes(-{minutes!raw})» | ${PS_FULLNAME}`,
src/variants.js:60:    pwsh: `${PS_FILES} | Where-Object LastWriteTime -GT (Get-Date).AddMinutes(-{minutes!raw})«| Where-Object Name -Like {glob}» | ${PS_FULLNAME}`,
src/variants.js:64:    pwsh: `${PS_FILES} | Where-Object LastWriteTime -LT (Get-Date).AddDays(-{days!raw})«| Where-Object Name -Like {glob}» | ${PS_FULLNAME}`,
src/variants.js:65:    cmd: 'forfiles /p {path} /s /d -{days!raw}«/m {glob}» /c "cmd /c if @isdir==FALSE echo @path"',
src/variants.js:68:    busybox: 'find {path} -type f -size +{sizeBytes!raw}c«-iname {glob}» -exec ls -lh {} +',
src/variants.js:69:    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Where-Object Length -GT {sizeBytes!raw} | Select-Object Length, LastWriteTime, FullName`,
src/variants.js:70:    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize GTR {sizeBytes!raw} echo @path @fsize"',
src/variants.js:73:    busybox: 'find {path} -type f -size -{sizeBytes!raw}c«-iname {glob}»',
src/variants.js:74:    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Where-Object Length -LT {sizeBytes!raw} | ${PS_FULLNAME}`,
src/variants.js:75:    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize LSS {sizeBytes!raw} echo @path"',
src/variants.js:104:    pwsh: 'Get-Content -LiteralPath {file} | Group-Object -NoElement -CaseSensitive | Sort-Object Count -Descending | Select-Object -First {count!raw}',
src/variants.js:108:    busybox: "find {path} -type f -exec stat -c '%Y %y %n' {} + 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-",
src/variants.js:109:    pwsh: `${PS_FILES} | Sort-Object LastWriteTime -Descending | Select-Object -First {count!raw} -Property LastWriteTime, FullName`,
src/variants.js:112:  empty_files: {
src/variants.js:116:  empty_dirs: {
src/variants.js:141:    pwsh: String.raw`Get-ChildItem -LiteralPath {path} -Recurse -Depth ({depth!raw} - 1) -Force -ErrorAction SilentlyContinue | Where-Object FullName -NotMatch '[\\/]\.git([\\/]|$)' | Sort-Object FullName | ` + PS_FULLNAME,
src/variants.js:159:    pwsh: 'Get-Content -LiteralPath {file} -TotalCount {count!raw}',
src/variants.js:163:    pwsh: 'Get-Content -LiteralPath {file} -Tail {count!raw}',
src/variants.js:175:    pwsh: 'Get-Content -LiteralPath {file} | Select-Object -Index (({start!raw} - 1)..({end!raw} - 1))',
src/variants.js:203:    pwsh: { unix: 'chmod {mode!raw} {file}' },
src/variants.js:301:    busybox: 'top -b -n 1 | head -n $(({count!raw} + 4))',
src/variants.js:302:    pwsh: 'Get-Process | Sort-Object CPU -Descending | Select-Object -First {count!raw}',
src/variants.js:306:    busybox: 'ps -o pid,user,rss,vsz,args | sort -k3 -rh | head -n {count!raw}',
src/variants.js:307:    pwsh: 'Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First {count!raw}',
src/variants.js:323:    // `kill` is an alias of Stop-Process (SIGKILL on Unix) in PowerShell; call the real binary for SIGTERM.
src/variants.js:324:    pwsh: { win: 'Stop-Process -Id {pid!raw}', unix: '/bin/kill {pid!raw}' },
src/variants.js:325:    cmd: 'taskkill /pid {pid!raw}',
src/variants.js:328:    busybox: 'fuser -k -TERM {port!raw}/tcp',
src/variants.js:329:    pwsh: { win: 'Get-NetTCPConnection -LocalPort {port!raw} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ }' },
src/variants.js:330:    cmd: 'for /f "tokens=5" %p in (\'netstat -ano ^| findstr /r /c:":{port!raw} .*LISTENING"\') do taskkill /pid %p',
src/variants.js:338:    busybox: "netstat -tulpn | grep ':{port!raw} '",
src/variants.js:339:    pwsh: { win: "Get-NetTCPConnection -LocalPort {port!raw} -State Listen -ErrorAction SilentlyContinue | Select-Object LocalAddress, LocalPort, State, OwningProcess, @{ Name = 'Process'; Expression = { (Get-Process -Id $_.OwningProcess).ProcessName } }" },
src/variants.js:340:    cmd: 'netstat -ano | findstr :{port!raw}',
src/variants.js:396:    bsd: 'last | head -n {count!raw}',
src/variants.js:397:    busybox: 'last | head -n {count!raw}',
src/variants.js:398:    pwsh: { win: "Get-WinEvent -FilterHashtable @{ LogName = 'Security'; Id = 4624 } -MaxEvents {count!raw}", unix: 'last -n {count!raw}' },
src/variants.js:406:    pwsh: '$env:{var!raw}',
src/variants.js:407:    cmd: 'echo %{var!raw}%',
src/variants.js:446:    pwsh: { win: "Get-WinEvent -FilterHashtable @{ LogName = 'System'; ProviderName = 'Service Control Manager' } -MaxEvents 1000 -ErrorAction SilentlyContinue | Where-Object Message -Match ([regex]::Escape({service}))«| Where-Object TimeCreated -GT (Get-Date).AddMinutes(-{minutes!raw})» | Select-Object -First {count!raw}" },
src/variants.js:450:    pwsh: { win: `Get-WinEvent -FilterHashtable @{ LogName = 'System'; Level = 1, 2; StartTime = (${PS_OS}).LastBootUpTime } -MaxEvents {count!raw} -ErrorAction SilentlyContinue` },
src/variants.js:451:    cmd: 'wevtutil qe System /q:"*[System[(Level=1 or Level=2)]]" /c:{count!raw} /rd:true /f:text',
src/variants.js:484:    pwsh: { win: 'Get-WinEvent -LogName System -MaxEvents {count!raw}', unix: 'sudo dmesg | tail -n {count!raw}' },
src/variants.js:485:    cmd: 'wevtutil qe System /c:{count!raw} /rd:true /f:text',
src/variants.js:530:    pwsh: 'Test-Connection -ComputerName {host} -Count {count!raw}',
src/variants.js:531:    cmd: 'ping -n {count!raw} {host}',
src/variants.js:547:    busybox: 'nc -w 3 {host} {port!raw} </dev/null && echo open || echo closed',
src/variants.js:548:    pwsh: { win: 'Test-NetConnection -ComputerName {host} -Port {port!raw}', unix: 'nc -zv {host} {port!raw}' },
src/variants.js:569:    pwsh: 'ssh -N -L {port!raw}:{rhost!raw}:{rport!raw} {target}', // OpenSSH client ships with Windows 10 1809+
src/variants.js:570:    cmd: 'ssh -N -L {port!raw}:{rhost!raw}:{rport!raw} {target}',
src/variants.js:576:    pwsh: 'git log --oneline --graph --decorate -n {count!raw}',
src/variants.js:577:    cmd: 'git log --oneline --graph --decorate -n {count!raw}',
src/variants.js:611:    pwsh: 'docker logs --tail {count!raw} -f {container}',
src/variants.js:612:    cmd: 'docker logs --tail {count!raw} -f {container}',
src/variants.js:629:  npm_run_script: { pwsh: 'npm run {script}«--workspace {workspace!raw}»«{scope!raw}»', cmd: 'npm run {script}«--workspace {workspace!raw}»«{scope!raw}»' },
src/variants.js:630:  npm_install: { pwsh: 'npm {npmverb!raw}«{pkg}»«--workspace {workspace!raw}»«{scope!raw}»', cmd: 'npm {npmverb!raw}«{pkg}»«--workspace {workspace!raw}»«{scope!raw}»' },
src/variants.js:631:  npm_install_global: { pwsh: 'npm install -g {pkg}«{scope!raw}»', cmd: 'npm install -g {pkg}«{scope!raw}»' },
src/variants.js:632:  pip_install: { pwsh: { win: 'py -m pip install {pkg}«{scope!raw}»', unix: 'python3 -m pip install {pkg}«{scope!raw}»' }, cmd: 'py -m pip install {pkg}«{scope!raw}»' },
src/variants.js:635:  wrangler_deploy: { pwsh: 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»«{args!raw}»', cmd: 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»«{args!raw}»' },
src/variants.js:636:  wrangler_dev: { pwsh: 'npx wrangler dev«--env {wenv!raw}»«{args!raw}»', cmd: 'npx wrangler dev«--env {wenv!raw}»«{args!raw}»' },
src/variants.js:637:  wrangler_tail: { pwsh: 'npx wrangler tail«--env {wenv!raw}»«{args!raw}»', cmd: 'npx wrangler tail«--env {wenv!raw}»«{args!raw}»' },
src/variants.js:638:  wrangler_secret_put: { pwsh: 'npx wrangler secret put {var!raw}«--env {wenv!raw}»«{args!raw}»', cmd: 'npx wrangler secret put {var!raw}«--env {wenv!raw}»«{args!raw}»' },
src/variants.js:639:  wrangler_login: { pwsh: 'npx wrangler login«{args!raw}»', cmd: 'npx wrangler login«{args!raw}»' },
src/variants.js:640:  wrangler_whoami: { pwsh: 'npx wrangler whoami«{args!raw}»', cmd: 'npx wrangler whoami«{args!raw}»' },
src/variants.js:641:  gh_auth_status: { pwsh: 'gh auth status«{args!raw}»', cmd: 'gh auth status«{args!raw}»' },
src/variants.js:642:  gh_auth_login: { pwsh: 'gh auth login«{args!raw}»', cmd: 'gh auth login«{args!raw}»' },
src/variants.js:643:  gh_pr_list: { pwsh: 'gh pr list«--repo {repo!raw}»«{args!raw}»', cmd: 'gh pr list«--repo {repo!raw}»«{args!raw}»' },
src/variants.js:644:  gh_pr_view: { pwsh: 'gh pr view«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»', cmd: 'gh pr view«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»' },
src/variants.js:645:  gh_pr_create: { pwsh: 'gh pr create --fill«--repo {repo!raw}»«{args!raw}»', cmd: 'gh pr create --fill«--repo {repo!raw}»«{args!raw}»' },
src/variants.js:646:  gh_pr_checks: { pwsh: 'gh pr checks«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»', cmd: 'gh pr checks«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»' },
src/variants.js:647:  gh_pr_merge: { pwsh: 'gh pr merge«{pr!raw}»«--repo {repo!raw}»«{delbranch!raw}»«{scope!raw}»', cmd: 'gh pr merge«{pr!raw}»«--repo {repo!raw}»«{delbranch!raw}»«{scope!raw}»' },
src/variants.js:648:  gh_run_list: { pwsh: 'gh run list«--repo {repo!raw}»«{args!raw}»', cmd: 'gh run list«--repo {repo!raw}»«{args!raw}»' },
src/variants.js:649:  gh_run_view: { pwsh: 'gh run view«{num!raw}»«--repo {repo!raw}»«{scope!raw}»', cmd: 'gh run view«{num!raw}»«--repo {repo!raw}»«{scope!raw}»' },
src/history.js:11:import { splitCommand, wordsOf, decodeWord, AMB, isAmbiguous, isExpansion, isGlob, rawOf, joinArgs } from './shellwords.js';
src/history.js:60:/** Parse raw history text into commands (oldest first). kind: bash | zsh | fish | pwsh */
src/history.js:123:  posix: String.raw`((?:'[^']*'|"(?:\\.|[^"\\])*"|\\.|[^\s'"\\;&|<>()])+)`,
src/history.js:132:    // `«{scope!raw}»` only ever renders a placeholder: no command has a value there (`gh pr view 1 2` is not pr 1, scope 2)
src/history.js:133:    tpl = tpl.replace(/«\{scope!raw\}»/g, '');
src/history.js:135:    const raws = [];
src/history.js:141:      for (const piece of body.split(/(\{\w+(?:!raw)?\})/)) {
src/history.js:142:        const m = piece.match(/^\{(\w+)(!raw)?\}$/);
src/history.js:147:        if (m) { names.push(m[1]); raws.push(!!m[2]); }
src/history.js:151:    try { INV.push({ id, re: { posix: new RegExp(`^${src.posix}$`), pwsh: new RegExp(`^${src.pwsh}$`) }, names, raws }); } catch { /* skip */ }
src/history.js:164:  for (const { id, re, names, raws } of inverters()) {
src/history.js:172:      if (raws[i]) { slots[n] = rv; return; }
src/history.js:175:      slots[n] = rawOf(v);
src/history.js:227:const typeByExt = (p) => (/\.\w{1,5}$/.test(rawOf(p)) ? 'file' : 'dir');
src/history.js:235:  const d = rawOf(dst);
src/history.js:292:  const s = rawOf(String(v));
src/history.js:304:  for (const o of [ents, slots || {}]) for (const t of ['pr', 'branch']) if (o[t] != null && !isAmbiguous(o[t])) o[t] = AMB + rawOf(o[t]);
src/history.js:396:    if (!/^-/.test(w[i])) words.push(rawOf(w[i]));
src/history.js:472:        if (target != null && !/^\/dev\/(?:null|stdout|stderr|tty)$|^(?:\$null|NUL)$/i.test(rawOf(target))) redirTarget = target;
src/history.js:478:    const raw = w;
src/history.js:481:    if (!w.length || (w !== raw && /^-/.test(w[0]))) {
src/history.js:482:      e.file = AMB + raw.join(' '); e.dir = AMB + raw.join(' ');
src/history.js:488:    const rw = raw.map((x) => String(rawOf(x)));
src/history.js:499:      for (const t of SCOPE_ENTS[tool]) if (ents[t] != null && !isAmbiguous(ents[t])) ents[t] = AMB + rawOf(ents[t]);
src/history.js:505:    if (w.length && scopedElsewhere(w, raw, exportedScope)) {
src/history.js:507:      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x])) e[x] = AMB + rawOf(e[x]);
src/history.js:512:    const ws = w.length && w !== raw ? wrapperScope(w, raw) : null;
src/history.js:516:      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x])) e[x] = AMB + rawOf(e[x]);
src/history.js:522:      for (const x of [...ENT_TYPES, 'current', 'created']) if (e[x] != null && !isAmbiguous(e[x]) && isRelativePath(e[x])) e[x] = AMB + rawOf(e[x]);
src/history.js:527:    if (redirTarget != null) e.file = subCd && !isAmbiguous(redirTarget) && isRelativePath(redirTarget) ? AMB + rawOf(redirTarget) : redirTarget;
src/history.js:531:    if (w !== raw) for (const c of commandChains(raw, [], {})) if (c.length && !isAmbiguous(c[0])) for (const x of listedBySegment(c, pipedIn, k)) listed[x] = segIdx;
src/history.js:583:    for (const [tool, i] of Object.entries(exportAt)) if (segIntentAt < i) for (const t of SCOPE_ENTS[tool]) if (slots[t] != null && !isAmbiguous(slots[t])) slots[t] = AMB + rawOf(slots[t]);
src/history.js:631:/** `git -C /repo …`, `docker --context prod …`, `DOCKER_HOST=… docker …` (w: the unwrapped words, raw: before unwrap). */
src/history.js:632:function scopedElsewhere(w, raw, exported = new Set()) {
src/history.js:638:  if (raw.slice(0, raw.length - w.length).some((x) => SCOPE_ENV.test(String(x)))) return true;
src/history.js:688: * 'root' when a wrapper in the removed prefix of `raw` (before the unwrapped words `w`) runs the command under another
src/history.js:691:function wrapperScope(w, raw) {
src/history.js:695:  for (const x of raw.slice(0, raw.length - w.length).map((v) => String(rawOf(v)))) {
src/history.js:714:  for (const x of Object.keys(o)) if (o[x] != null && typeof o[x] !== 'boolean' && !isAmbiguous(o[x])) o[x] = AMB + rawOf(o[x]);
src/history.js:764:const oneOf = (ops) => (ops.length > 1 ? AMB + ops.map(rawOf).join(' ') : ops[0]);
src/history.js:769:    if (w.slice(1).some((a) => PATHLIKE.test(rawOf(a)))) { e.file = AMB + w.join(' '); e.dir = AMB + w.join(' '); }
src/history.js:805:    else if (pos.length) e.pid = AMB + pos.map(rawOf).join(' '); // several PIDs or a job spec: not one process
src/history.js:809:    else if (pos.length > 1) e.proc = AMB + pos.map(rawOf).join(' ');
src/history.js:825:    if (pat != null) setIntent(flags.some((a) => /^-\w*l/.test(a)) ? 'grep_files_containing' : 'grep_text', { pattern: rawOf(pat), ...(path != null ? { path } : {}) });
src/history.js:832:    const pm = args.map(rawOf).join(' ').match(/(?::|tcp:|udp:|sport = :)(\d{2,5})\b/);
src/history.js:840:    if (pos.length === 1 && repo == null && !isAmbiguous(pos[0])) e.pr = rawOf(pos[0]);
src/history.js:841:    else e.pr = AMB + (pos.length ? pos.map(rawOf).join(' ') : 'the current branch');
src/history.js:844:    e.pr = AMB + w.map(rawOf).join(' ');
src/history.js:860:        if (after.length) e.file = after.length === 1 ? after[0] : AMB + after.map(rawOf).join(' ');
src/history.js:903:    if (p) e[/\/$/.test(rawOf(p)) ? 'dir' : 'file'] = p;
src/history.js:919:    const p = nonFlags.find((a) => PATHLIKE.test(rawOf(a)) && !/^\w+:\/\//.test(rawOf(a)));
src/history.js:920:    if (p) e[typeByExt(p)] = AMB + rawOf(p);
src/history.js:1025:const PRONOUN_PL = /(?:^|\s)(tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym)(?=\s|$|[?!.,])|(?:^|\s)to(?=\s*[?!.]*$|\s+(?:co|ktor\w*|tam)\b)|(?:^\s*|(?:^|\s)(?:zmerguj|scal|pokaz|zobacz|otworz|zamknij|sprawdz|wyswietl|zatwierdz|zaakceptuj|przejrzyj)\S*\s+)to(?=\s+(?:prs?\b|pull[\s-]+requests?\b))/;
src/history.js:1030:  String.raw`(?<!\b(?:is|are|was|were|if|whether|be|still)\s+)\bthere\b(?!\s+(?:is|are|was|were|be|exists?|isn|aren|wasn|weren)\b|'s\b)`,
src/history.js:1031:  String.raw`\binside(?=\s*(?:(?:too|also|as well|please|now|recursively)\s*)*[?!.,]*$)`,
src/history.js:1032:  String.raw`\b(?:the\s+)?same\s+(?:folder|directory|dir|place|location|path|spot|catalog)\b`,
src/history.js:1033:  String.raw`(?:^|\s)(?:tam|stamtad|tamze|tamtedy)(?=\s|$|[?!.,])`,
src/history.js:1034:  String.raw`(?:^|\s)(?:tym\s+samym|tamtym|tego\s+samego|tamtego)\s+(?:folder\w*|katalog\w*|miejsc\w*)`,
src/history.js:1036:  String.raw`\b(?:previous|last|prior|earlier|preceding)\s+(?:folder|directory|dir|place|location|path|catalog)\b`,
src/history.js:1037:  String.raw`\b(?:folder|directory|dir|place|location|path)\s+(?:that\s+|which\s+)?(?:i|we|you)\s+(?:just\s+)?(?:listed|used|searched|opened|visited|(?:was|were)\s+(?:just\s+)?in|went\s+(?:in)?to|cd'?e?d\s+(?:in)?to|changed\s+(?:in)?to|looked\s+(?:at|in|into))\b`,
src/history.js:1038:  String.raw`(?:^|\s)(?:poprzedni\w*|ostatni\w*|wczesniejsz\w*)\s+(?:folder\w*|katalog\w*|miejsc\w*)`,
src/history.js:1044:  String.raw`\b(?:everything|all|anything|contents?|files?|wszystk\w*|wszystko|zawarto\w*|plik\w*)\b.*(?:^|\s)(?:in|inside|within|from|of|w|we|z|ze|wewnatrz)\s+(?:it|that|this|them|there|nim|niej|niego|tym|tamtym|tego|nich)(?=\s|$|[?!.,])`,
src/history.js:1045:  String.raw`\b(?:contents?|entries)\b|\bzawarto\w*`,
src/history.js:1046:  String.raw`\b(?:its|their)\s+(?:files?|items?|subfolders?|subdirectories)\b`,
src/history.js:1047:  String.raw`\bwhat(?:'s|\s+is|\s+was|\s+are)?\s+(?:in|inside|within)\s+(?:it|that|this|there|them)\b`,
src/history.js:1048:  String.raw`(?:^|\s)(?:jego|jej|ich)\s+(?:plik\w*|wszystk\w*|elementy|podkatalog\w*)`,
src/history.js:1049:  String.raw`(?:^|\s)co\s+(?:jest\s+|sa\s+)?(?:w|we|wewnatrz)\s+(?:nim|niej|tym|srodku)(?=\s|$|[?!.,])`,
src/history.js:1159:      if (amb) return { rule: 'refused', intent: ctx.last.intent, blank: [amb[0]], note: `previous ${ctx.last.intent} has ${amb[0]}=${rawOf(amb[1])}, which depends on the shell state; not guessing` };
src/history.js:1203:    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: `the latest ${finalEnt} in history (${rawOf(value ?? '?')}) cannot be read unambiguously; not guessing` };
src/history.js:1209:    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: `${rawOf(value)} is the checked-out branch (the previous command switched to it); not guessing` };
src/history.js:1234:  if (isAmbiguous(v)) return { rule: 'refused', ...base, note: `the directory of the previous command (${rawOf(v)}) cannot be read unambiguously; not guessing` };
src/history.js:1237:  if (fileNewer) return { rule: 'refused', ...base, note: `the previous command also names a file (${rawOf(ctx.ents.file)}), so "there" is unclear; not guessing` };
src/history.js:1265:  if (type === 'dir' && ctx.cdDir?.value === v && ctx.ents.file != null) return `the previous command named a file (${rawOf(ctx.ents.file)}) and then changed to ${v}; the reference is unclear; not guessing`;
src/history.js:1278:const NOT_HINT = /^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back|list\w*|wylistuj\w*|check|sprawdz\w*|wipe|nuke|purge|destroy|clear|clean\w*|wyczysc\w*|drop|what|which|where|about|with|from|into|then|also|again|teraz|jeszcze|whatever|everything|anything|something|thing|stuff|still|there|here|tutaj|tamto|wszystko|cokolwiek|whole|entire|completely|cale|calym|listening|running|working|executable|wykonywaln\w*|contents?|zawartosc\w*|entries|inside|wewnatrz|siedzi|srodku|please|prosze|again|ponownie|znowu|forcefully|recursively|rekurencyjnie|permanently|trwale|names?|nazw\w*|only|tylko|same|samo|thing|merged|zmergowan\w*|scalon\w*|current|biezac\w*|aktualn\w*|obecn\w*|previous|poprzedni\w*|ostatni\w*|last|other|inn\w*|empty|pust\w*|temporary|tymczasow\w*|local|lokaln\w*|remote|zdaln\w*|stopped|zatrzyman\w*|created|utworzon\w*|newly|nowo|nowy|nowa|nowe|nowym|whole|cal\w*|samym|given|mentioned|wspomnian\w*|above|powyzsz\w*|broken|zepsut\w*|failed|failing|nieudan\w*|old\w*|star\w*)$/;
test/regressions11.test.js:2:// command, so it is not safe (never auto-run with --yes); attached short-option values (`git -C/repo`,
test/regressions11.test.js:26:test('major: wrangler dev runs project build commands: medium risk, never auto-run with --yes', () => {
test/regressions11.test.js:33:  const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', 'start', 'wrangler', 'dev'],
test/regressions12.test.js:5:// `npx wrangler` intent may run a project-local binary, so none is safe (never auto-run with --yes).
test/regressions12.test.js:64:test('major: every npx wrangler intent is at least medium risk, never auto-run with --yes', () => {
test/regressions12.test.js:73:    const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', ...q.split(' ')],
test/regressions27.test.js:4://      values; edited, composed, history-replayed and unknown commands are at least high (--yes never runs them). The
test/regressions27.test.js:41:test('final2: every reported command is high risk (never safe) and needs an explicit yes', () => {
test/regressions2.test.js:98:  for (const c of ['busybox rm -rf /', 'rsync -a --delete empty/ /', 'cp /dev/null /etc/passwd', 'docker run -v /:/h alpine rm -rf /h',
test/regressions2.test.js:166:test('history: any history-derived slot marks the result as history (never --yes)', () => {
test/regressions2.test.js:176:    const out = cli(['--yes', `--history=${hf}`, '--shell', 'bash', '--os', 'linux', 'show', 'file', 'contents'], { cwd: dir });
test/regressions2.test.js:322:    const raw = tagFeatures(toks, 'grep', dim);
test/regressions2.test.js:324:    sets.forEach((f, i) => { assert.equal(new Set(f).size, f.length); assert.deepEqual([...new Set(raw[i])].sort(), [...f].sort()); });
test/regressions7.test.js:6:// interpreter code, non-recursive chmod/chown of /, writes onto raw disks and destructive commands after unknown programs.
test/regressions7.test.js:128:test('danger: inline interpreter code, chmod/chown of /, raw disk writes, unknown wrappers (claude r5 minor 5)', () => {
test/templates.test.js:23:test('raw slots are validated, never injected', () => {
test/templates.test.js:24:  const r = render('head -n {count!raw} {file}', { count: '5; rm -rf /', file: 'a' }, ['count']);
test/templates.test.js:45:      assert.ok(!/undefined|(?<!\/dev\/)null|\{\w+(!raw)?\}/.test(r.command.replace(/%\{http_code\}/, '')), `${i.id}/${platform}: ${r.command}`);
test/devtools.test.js:93:test('raw numeric slots never take non-numbers', () => {
test/regressions.test.js:51:    for (const m of it.template.matchAll(/\{(\w+)!raw\}/g)) vals[m[1]] = m[1] === 'age' ? '-mtime -1' : 5;
test/regressions.test.js:67:    const r = cli(['--yes', '--shell', 'bash', 'show git diff for "{file}; printf INJECTED; #"'], { cwd: dir });
test/regressions.test.js:279:test('--yes only runs safe commands straight from the catalog (not history-resolved ones)', () => {
test/regressions.test.js:285:    const r = cli(['--yes', '--shell', 'bash', `--history=${f}`, 'show', 'it'], { cwd: dir });
test/fixtures/parity.json:1:{"cls": [{"model": "tool", "f": [[5537, 0.160128], [7265, 0.160128], [12374, 0.160128], [15825, 0.160128], [21845, 0.160128], [24097, 0.160128], [24123, 0.377964], [24755, 0.160128], [25128, 0.160128], [28898, 0.160128], [32312, 0.160128], [32974, 0.160128], [61443, 0.160128], [61948, 0.160128], [62787, 0.377964], [64263, 0.160128], [69817, 0.160128], [71929, 0.377964], [76173, 0.160128], [90027, 0.160128], [97019, 0.377964], [98127, 0.160128], [98915, 0.160128], [104937, 0.447214], [105599, 0.160128], [115084, 0.160128], [121166, 0.160128], [121363, 0.160128], [134680, 0.160128], [135410, 0.377964], [137222, 0.160128], [138678, 0.160128], [144348, 0.160128], [154622, 0.447214], [161499, 0.377964], [163784, 0.160128], [164285, 0.447214], [166611, 0.447214], [168532, 0.160128], [183729, 0.377964], [194218, 0.160128], [201074, 0.160128], [208670, 0.160128], [215647, 0.160128], [220285, 0.160128], [225745, 0.447214], [228497, 0.160128], [247174, 0.160128], [250253, 0.160128], [251473, 0.160128], [252936, 0.160128]], "top": [["find", 0.9850740528570804], ["du", 0.0047246412725942], ["fileinfo", 0.0023675897850807624]]}, {"model": "intent:find", "f": [[5537, 0.160128], [7265, 0.160128], [12374, 0.160128], [15825, 0.160128], [21845, 0.160128], [24097, 0.160128], [24123, 0.377964], [24755, 0.160128], [25128, 0.160128], [28898, 0.160128], [32312, 0.160128], [32974, 0.160128], [61443, 0.160128], [61948, 0.160128], [62787, 0.377964], [64263, 0.160128], [69817, 0.160128], [71929, 0.377964], [76173, 0.160128], [90027, 0.160128], [97019, 0.377964], [98127, 0.160128], [98915, 0.160128], [104937, 0.447214], [105599, 0.160128], [115084, 0.160128], [121166, 0.160128], [121363, 0.160128], [134680, 0.160128], [135410, 0.377964], [137222, 0.160128], [138678, 0.160128], [144348, 0.160128], [154622, 0.447214], [161499, 0.377964], [163784, 0.160128], [164285, 0.447214], [166611, 0.447214], [168532, 0.160128], [183729, 0.377964], [194218, 0.160128], [201074, 0.160128], [208670, 0.160128], [215647, 0.160128], [220285, 0.160128], [225745, 0.447214], [228497, 0.160128], [247174, 0.160128], [250253, 0.160128], [251473, 0.160128], [252936, 0.160128]], "top": [["largest_files", 0.9991975979590306], ["hidden_files", 0.000269326089158153]]}, {"model": "tool", "f": [[499, 0.158114], [5964, 0.158114], [15921, 0.158114], [28479, 0.158114], [31647, 0.158114], [38174, 0.158114], [40584, 0.707107], [58072, 0.158114], [65476, 0.158114], [71013, 0.158114], [77064, 0.333333], [83511, 0.158114], [86400, 0.158114], [89342, 0.158114], [96956, 0.333333], [99327, 0.158114], [100605, 0.333333], [115093, 0.333333], [118176, 0.158114], [120748, 0.158114], [123860, 0.333333], [136763, 0.333333], [137200, 0.158114], [139772, 0.158114], [140899, 0.158114], [144943, 0.158114], [150383, 0.158114], [153959, 0.158114], [161241, 0.158114], [161344, 0.158114], [163843, 0.158114], [166597, 0.158114], [170145, 0.158114], [173472, 0.158114], [173836, 0.158114], [174879, 0.158114], [175045, 0.158114], [181738, 0.158114], [187129, 0.333333], [191372, 0.158114], [196102, 0.158114], [213082, 0.707107], [215637, 0.158114], [218217, 0.158114], [229047, 0.333333], [234541, 0.158114], [243451, 0.158114], [243481, 0.158114], [247960, 0.333333], [260780, 0.158114], [262134, 0.158114]], "top": [["find", 0.999931921700881], ["diff", 2.0916746172025478e-05], ["grep", 9.575352838769892e-06]]}, {"model": "intent:find", "f": [[499, 0.158114], [5964, 0.158114], [15921, 0.158114], [28479, 0.158114], [31647, 0.158114], [38174, 0.158114], [40584, 0.707107], [58072, 0.158114], [65476, 0.158114], [71013, 0.158114], [77064, 0.333333], [83511, 0.158114], [86400, 0.158114], [89342, 0.158114], [96956, 0.333333], [99327, 0.158114], [100605, 0.333333], [115093, 0.333333], [118176, 0.158114], [120748, 0.158114], [123860, 0.333333], [136763, 0.333333], [137200, 0.158114], [139772, 0.158114], [140899, 0.158114], [144943, 0.158114], [150383, 0.158114], [153959, 0.158114], [161241, 0.158114], [161344, 0.158114], [163843, 0.158114], [166597, 0.158114], [170145, 0.158114], [173472, 0.158114], [173836, 0.158114], [174879, 0.158114], [175045, 0.158114], [181738, 0.158114], [187129, 0.333333], [191372, 0.158114], [196102, 0.158114], [213082, 0.707107], [215637, 0.158114], [218217, 0.158114], [229047, 0.333333], [234541, 0.158114], [243451, 0.158114], [243481, 0.158114], [247960, 0.333333], [260780, 0.158114], [262134, 0.158114]], "top": [["find_older_than", 0.9744448076086728], ["find_larger_than", 0.023670280401836295]]}, {"model": "tool", "f": [[3576, 0.13484], [5537, 0.13484], [5964, 0.13484], [12549, 0.333333], [21227, 0.13484], [27673, 0.13484], [30388, 0.13484], [32471, 0.13484], [41000, 0.13484], [48488, 0.13484], [62322, 0.13484], [62787, 0.707107], [68144, 0.333333], [68160, 0.13484], [70761, 0.333333], [73399, 0.13484], [77403, 0.13484], [78978, 0.13484], [86732, 0.13484], [91576, 0.333333], [94111, 0.13484], [99327, 0.13484], [110118, 0.13484], [115850, 0.13484], [120748, 0.13484], [121363, 0.13484], [123972, 0.13484], [126555, 0.13484], [139181, 0.333333], [139772, 0.13484], [150383, 0.13484], [150938, 0.13484], [151428, 0.13484], [152775, 0.13484], [152840, 0.13484], [154760, 0.333333], [155953, 0.13484], [157843, 0.333333], [166261, 0.13484], [173836, 0.13484], [174073, 0.13484], [174844, 0.13484], [179378, 0.13484], [180148, 0.707107], [183747, 0.13484], [188590, 0.13484], [190230, 0.13484], [190444, 0.13484], [190893, 0.13484], [196235, 0.13484], [201074, 0.13484], [209403, 0.13484], [214840, 0.13484], [218362, 0.333333], [228289, 0.13484], [231356, 0.13484], [232794, 0.333333], [235606, 0.13484], [236473, 0.13484], [237471, 0.13484], [237943, 0.13484], [241309, 0.13484], [246312, 0.13484], [252943, 0.13484], [253653, 0.13484], [254244, 0.13484]], "top": [["find", 0.9919108719051672], ["ls", 0.007552789113310137], ["grep", 0.00023011313765113644]]}, {"model": "intent:find", "f": [[3576, 0.13484], [5537, 0.13484], [5964, 0.13484], [12549, 0.333333], [21227, 0.13484], [27673, 0.13484], [30388, 0.13484], [32471, 0.13484], [41000, 0.13484], [48488, 0.13484], [62322, 0.13484], [62787, 0.707107], [68144, 0.333333], [68160, 0.13484], [70761, 0.333333], [73399, 0.13484], [77403, 0.13484], [78978, 0.13484], [86732, 0.13484], [91576, 0.333333], [94111, 0.13484], [99327, 0.13484], [110118, 0.13484], [115850, 0.13484], [120748, 0.13484], [121363, 0.13484], [123972, 0.13484], [126555, 0.13484], [139181, 0.333333], [139772, 0.13484], [150383, 0.13484], [150938, 0.13484], [151428, 0.13484], [152775, 0.13484], [152840, 0.13484], [154760, 0.333333], [155953, 0.13484], [157843, 0.333333], [166261, 0.13484], [173836, 0.13484], [174073, 0.13484], [174844, 0.13484], [179378, 0.13484], [180148, 0.707107], [183747, 0.13484], [188590, 0.13484], [190230, 0.13484], [190444, 0.13484], [190893, 0.13484], [196235, 0.13484], [201074, 0.13484], [209403, 0.13484], [214840, 0.13484], [218362, 0.333333], [228289, 0.13484], [231356, 0.13484], [232794, 0.333333], [235606, 0.13484], [236473, 0.13484], [237471, 0.13484], [237943, 0.13484], [241309, 0.13484], [246312, 0.13484], [252943, 0.13484], [253653, 0.13484], [254244, 0.13484]], "top": [["count_files", 0.9650160333860569], ["count_lines_code", 0.00598628937134974]]}, {"model": "tool", "f": [[1841, 0.120386], [2301, 0.120386], [5885, 0.301511], [9989, 0.120386], [14177, 0.120386], [14600, 0.120386], [16377, 0.120386], [16618, 0.120386], [17694, 0.120386], [29809, 0.301511], [36241, 0.301511], [37179, 0.120386], [43000, 0.120386], [55433, 0.120386], [57315, 0.120386], [61610, 0.120386], [62503, 0.120386], [65265, 0.120386], [65690, 0.120386], [69271, 0.301511], [69817, 0.120386], [72144, 0.120386], [73437, 0.120386], [82821, 0.120386], [89494, 0.120386], [89794, 0.120386], [92944, 0.120386], [94863, 0.120386], [94981, 0.120386], [96072, 0.120386], [97156, 0.120386], [97471, 0.120386], [98933, 0.120386], [107308, 0.120386], [113586, 0.120386], [118657, 0.120386], [119134, 0.120386], [119539, 0.120386], [121555, 0.120386], [123033, 0.120386], [129122, 0.120386], [129257, 0.120386], [131018, 0.120386], [146800, 0.301511], [148323, 0.120386], [153936, 0.120386], [155311, 0.120386], [155520, 0.120386], [162970, 0.120386], [167743, 0.120386], [172747, 0.120386], [174935, 0.301511], [176152, 0.120386], [178686, 0.301511], [182702, 0.120386], [188043, 0.120386], [190328, 0.120386], [192277, 0.120386], [196264, 0.120386], [197539, 0.301511], [199787, 0.120386], [210412, 0.120386], [213259, 0.120386], [216453, 0.120386], [216457, 0.120386], [220075, 0.707107], [224058, 0.120386], [231211, 0.120386], [235827, 0.120386], [236173, 0.120386], [236243, 0.120386], [237481, 0.120386], [237775, 0.120386], [240777, 0.120386], [241371, 0.301511], [243332, 0.301511], [244880, 0.120386], [245955, 0.120386], [252436, 0.120386], [257194, 0.120386], [260215, 0.707107], [261086, 0.301511]], "top": [["find", 0.9995554701933457], ["npm", 0.0002051506276309378], ["grep", 0.00014603800468004333]]}, {"model": "intent:find", "f": [[1841, 0.120386], [2301, 0.120386], [5885, 0.301511], [9989, 0.120386], [14177, 0.120386], [14600, 0.120386], [16377, 0.120386], [16618, 0.120386], [17694, 0.120386], [29809, 0.301511], [36241, 0.301511], [37179, 0.120386], [43000, 0.120386], [55433, 0.120386], [57315, 0.120386], [61610, 0.120386], [62503, 0.120386], [65265, 0.120386], [65690, 0.120386], [69271, 0.301511], [69817, 0.120386], [72144, 0.120386], [73437, 0.120386], [82821, 0.120386], [89494, 0.120386], [89794, 0.120386], [92944, 0.120386], [94863, 0.120386], [94981, 0.120386], [96072, 0.120386], [97156, 0.120386], [97471, 0.120386], [98933, 0.120386], [107308, 0.120386], [113586, 0.120386], [118657, 0.120386], [119134, 0.120386], [119539, 0.120386], [121555, 0.120386], [123033, 0.120386], [129122, 0.120386], [129257, 0.120386], [131018, 0.120386], [146800, 0.301511], [148323, 0.120386], [153936, 0.120386], [155311, 0.120386], [155520, 0.120386], [162970, 0.120386], [167743, 0.120386], [172747, 0.120386], [174935, 0.301511], [176152, 0.120386], [178686, 0.301511], [182702, 0.120386], [188043, 0.120386], [190328, 0.120386], [192277, 0.120386], [196264, 0.120386], [197539, 0.301511], [199787, 0.120386], [210412, 0.120386], [213259, 0.120386], [216453, 0.120386], [216457, 0.120386], [220075, 0.707107], [224058, 0.120386], [231211, 0.120386], [235827, 0.120386], [236173, 0.120386], [236243, 0.120386], [237481, 0.120386], [237775, 0.120386], [240777, 0.120386], [241371, 0.301511], [243332, 0.301511], [244880, 0.120386], [245955, 0.120386], [252436, 0.120386], [257194, 0.120386], [260215, 0.707107], [261086, 0.301511]], "top": [["broken_symlinks", 0.9409856726590373], ["find_symlinks", 0.02086307467127827]]}, {"model": "tool", "f": [[2332, 0.132453], [3228, 0.132453], [7494, 0.132453], [8687, 0.132453], [9900, 0.132453], [14177, 0.132453], [14790, 0.132453], [17130, 0.132453], [17996, 0.132453], [20750, 0.132453], [21195, 0.132453], [21221, 0.377964], [24422, 0.132453], [28051, 0.132453], [29507, 0.132453], [49361, 0.132453], [50472, 0.377964], [51883, 0.132453], [56129, 0.132453], [62882, 0.377964], [67479, 0.377964], [70175, 0.132453], [72258, 0.132453], [73185, 0.132453], [74849, 0.132453], [79044, 0.132453], [79533, 0.377964], [83154, 0.132453], [84010, 0.132453], [87018, 0.707107], [88617, 0.377964], [92341, 0.132453], [99297, 0.132453], [103380, 0.132453], [107677, 0.132453], [116316, 0.132453], [120531, 0.132453], [120748, 0.132453], [121166, 0.132453], [121400, 0.132453], [122393, 0.132453], [126039, 0.132453], [127366, 0.132453], [129379, 0.132453], [140151, 0.132453], [142593, 0.132453], [162231, 0.132453], [171354, 0.132453], [173923, 0.132453], [175045, 0.132453], [180327, 0.132453], [182939, 0.132453], [191977, 0.132453], [197314, 0.132453], [202029, 0.132453], [208742, 0.132453], [215647, 0.132453], [217220, 0.132453], [220075, 0.707107], [222329, 0.132453], [223314, 0.132453], [234119, 0.132453], [234232, 0.132453], [235002, 0.132453], [236559, 0.377964], [252936, 0.132453]], "top": [["tail", 0.9726204533037179], ["git", 0.006046296996354741], ["fileinfo", 0.002985735304584825]]}, {"model": "intent:tail", "f": [[2332, 0.132453], [3228, 0.132453], [7494, 0.132453], [8687, 0.132453], [9900, 0.132453], [14177, 0.132453], [14790, 0.132453], [17130, 0.132453], [17996, 0.132453], [20750, 0.132453], [21195, 0.132453], [21221, 0.377964], [24422, 0.132453], [28051, 0.132453], [29507, 0.132453], [49361, 0.132453], [50472, 0.377964], [51883, 0.132453], [56129, 0.132453], [62882, 0.377964], [67479, 0.377964], [70175, 0.132453], [72258, 0.132453], [73185, 0.132453], [74849, 0.132453], [79044, 0.132453], [79533, 0.377964], [83154, 0.132453], [84010, 0.132453], [87018, 0.707107], [88617, 0.377964], [92341, 0.132453], [99297, 0.132453], [103380, 0.132453], [107677, 0.132453], [116316, 0.132453], [120531, 0.132453], [120748, 0.132453], [121166, 0.132453], [121400, 0.132453], [122393, 0.132453], [126039, 0.132453], [127366, 0.132453], [129379, 0.132453], [140151, 0.132453], [142593, 0.132453], [162231, 0.132453], [171354, 0.132453], [173923, 0.132453], [175045, 0.132453], [180327, 0.132453], [182939, 0.132453], [191977, 0.132453], [197314, 0.132453], [202029, 0.132453], [208742, 0.132453], [215647, 0.132453], [217220, 0.132453], [220075, 0.707107], [222329, 0.132453], [223314, 0.132453], [234119, 0.132453], [234232, 0.132453], [235002, 0.132453], [236559, 0.377964], [252936, 0.132453]], "top": [["tail_file", 0.9857010806244423], ["tail_follow", 0.014298919375557861]]}, {"model": "tool", "f": [[3924, 0.2], [9106, 0.2], [10562, 0.2], [12976, 0.377964], [33945, 0.2], [39304, 0.2], [41561, 0.2], [42823, 0.2], [53719, 0.2], [56419, 0.408248], [58072, 0.2], [60547, 0.2], [64195, 0.377964], [87996, 0.2], [96329, 0.2], [96956, 0.377964], [97019, 0.408248], [108869, 0.2], [118860, 0.2], [130849, 0.2], [134900, 0.2], [160317, 0.377964], [164507, 0.2], [198971, 0.2], [199988, 0.408248], [203268, 0.2], [203801, 0.2], [210963, 0.2], [213082, 0.408248], [217141, 0.2], [219811, 0.377964], [229889, 0.408248], [232738, 0.408248], [238647, 0.2], [242293, 0.377964], [250087, 0.2], [253400, 0.2], [259831, 0.377964]], "top": [["chmod", 0.9992905108997329], ["env", 0.00016460344957479626], ["grep", 6.0587549552059046e-05]]}, {"model": "intent:chmod", "f": [[3924, 0.2], [9106, 0.2], [10562, 0.2], [12976, 0.377964], [33945, 0.2], [39304, 0.2], [41561, 0.2], [42823, 0.2], [53719, 0.2], [56419, 0.408248], [58072, 0.2], [60547, 0.2], [64195, 0.377964], [87996, 0.2], [96329, 0.2], [96956, 0.377964], [97019, 0.408248], [108869, 0.2], [118860, 0.2], [130849, 0.2], [134900, 0.2], [160317, 0.377964], [164507, 0.2], [198971, 0.2], [199988, 0.408248], [203268, 0.2], [203801, 0.2], [210963, 0.2], [213082, 0.408248], [217141, 0.2], [219811, 0.377964], [229889, 0.408248], [232738, 0.408248], [238647, 0.2], [242293, 0.377964], [250087, 0.2], [253400, 0.2], [259831, 0.377964]], "top": [["chmod", 0.9949318458932593], ["make_executable", 0.005068154106740562]]}, {"model": "tool", "f": [[560, 0.110432], [5485, 0.110432], [5964, 0.110432], [6755, 0.110432], [7412, 0.110432], [8442, 0.110432], [14864, 0.27735], [23981, 0.110432], [25103, 0.110432], [27673, 0.110432], [32471, 0.110432], [32739, 0.110432], [42275, 0.27735], [46976, 0.27735], [48653, 0.110432], [49194, 0.110432], [50783, 0.110432], [51556, 0.110432], [54796, 0.110432], [56284, 0.110432], [61749, 0.110432], [62322, 0.110432], [62428, 0.27735], [64277, 0.27735], [68745, 0.110432], [70761, 0.27735], [72427, 0.27735], [74212, 0.110432], [79444, 0.110432], [85279, 0.110432], [87929, 0.110432], [89624, 0.110432], [94111, 0.110432], [99327, 0.110432], [99551, 0.110432], [99749, 0.110432], [103990, 0.110432], [106416, 0.110432], [110118, 0.110432], [115311, 0.27735], [115850, 0.110432], [118984, 0.110432], [120748, 0.110432], [125371, 0.110432], [126381, 0.110432], [127424, 0.110432], [130556, 0.110432], [135984, 0.110432], [139181, 0.27735], [139772, 0.110432], [141181, 0.27735], [141935, 0.110432], [144565, 0.110432], [146175, 0.447214], [146712, 0.110432], [148889, 0.110432], [150383, 0.110432], [153555, 0.110432], [155238, 0.110432], [159278, 0.110432], [162884, 0.27735], [165309, 0.110432], [166251, 0.110432], [166261, 0.110432], [166519, 0.110432], [173651, 0.110432], [173836, 0.110432], [174073, 0.110432], [175045, 0.110432], [175985, 0.110432], [181336, 0.110432], [190893, 0.110432], [191165, 0.447214], [192516, 0.110432], [195283, 0.110432], [201074, 0.110432], [201467, 0.110432], [205513, 0.110432], [205633, 0.447214], [207232, 0.110432], [207639, 0.27735], [211121, 0.110432], [213002, 0.110432], [213082, 0.447214], [215272, 0.110432], [220028, 0.110432], [222078, 0.110432], [226249, 0.110432], [229658, 0.110432], [229889, 0.447214], [230415, 0.110432], [237943, 0.110432], [240861, 0.110432], [243521, 0.27735], [244864, 0.110432], [245447, 0.110432], [246688, 0.110432], [246788, 0.110432], [247473, 0.110432], [247541, 0.110432]], "top": [["find", 0.9978642286032907], ["git", 0.0013816598848808517], ["grep", 0.00035509860489273674]]}, {"model": "intent:find", "f": [[560, 0.110432], [5485, 0.110432], [5964, 0.110432], [6755, 0.110432], [7412, 0.110432], [8442, 0.110432], [14864, 0.27735], [23981, 0.110432], [25103, 0.110432], [27673, 0.110432], [32471, 0.110432], [32739, 0.110432], [42275, 0.27735], [46976, 0.27735], [48653, 0.110432], [49194, 0.110432], [50783, 0.110432], [51556, 0.110432], [54796, 0.110432], [56284, 0.110432], [61749, 0.110432], [62322, 0.110432], [62428, 0.27735], [64277, 0.27735], [68745, 0.110432], [70761, 0.27735], [72427, 0.27735], [74212, 0.110432], [79444, 0.110432], [85279, 0.110432], [87929, 0.110432], [89624, 0.110432], [94111, 0.110432], [99327, 0.110432], [99551, 0.110432], [99749, 0.110432], [103990, 0.110432], [106416, 0.110432], [110118, 0.110432], [115311, 0.27735], [115850, 0.110432], [118984, 0.110432], [120748, 0.110432], [125371, 0.110432], [126381, 0.110432], [127424, 0.110432], [130556, 0.110432], [135984, 0.110432], [139181, 0.27735], [139772, 0.110432], [141181, 0.27735], [141935, 0.110432], [144565, 0.110432], [146175, 0.447214], [146712, 0.110432], [148889, 0.110432], [150383, 0.110432], [153555, 0.110432], [155238, 0.110432], [159278, 0.110432], [162884, 0.27735], [165309, 0.110432], [166251, 0.110432], [166261, 0.110432], [166519, 0.110432], [173651, 0.110432], [173836, 0.110432], [174073, 0.110432], [175045, 0.110432], [175985, 0.110432], [181336, 0.110432], [190893, 0.110432], [191165, 0.447214], [192516, 0.110432], [195283, 0.110432], [201074, 0.110432], [201467, 0.110432], [205513, 0.110432], [205633, 0.447214], [207232, 0.110432], [207639, 0.27735], [211121, 0.110432], [213002, 0.110432], [213082, 0.447214], [215272, 0.110432], [220028, 0.110432], [222078, 0.110432], [226249, 0.110432], [229658, 0.110432], [229889, 0.447214], [230415, 0.110432], [237943, 0.110432], [240861, 0.110432], [243521, 0.27735], [244864, 0.110432], [245447, 0.110432], [246688, 0.110432], [246788, 0.110432], [247473, 0.110432], [247541, 0.110432]], "top": [["delete_by_ext", 0.903498951810519], ["find_by_ext", 0.06664698728655834]]}, {"model": "tool", "f": [[197, 0.116248], [637, 0.333333], [10556, 0.333333], [11889, 0.333333], [11891, 0.116248], [15551, 0.116248], [17130, 0.116248], [20605, 0.116248], [24232, 0.116248], [27172, 0.116248], [34909, 0.116248], [37355, 0.116248], [38577, 0.116248], [39589, 0.116248], [39629, 0.116248], [40584, 0.707107], [41403, 0.116248], [45831, 0.116248], [47677, 0.333333], [48692, 0.116248], [49361, 0.116248], [52012, 0.116248], [53272, 0.116248], [56129, 0.116248], [63773, 0.116248], [67139, 0.116248], [69316, 0.116248], [71960, 0.116248], [73185, 0.116248], [73754, 0.116248], [78978, 0.116248], [79533, 0.333333], [81055, 0.116248], [86732, 0.116248], [88012, 0.116248], [88298, 0.116248], [94758, 0.116248], [99297, 0.116248], [103742, 0.116248], [110890, 0.116248], [115872, 0.333333], [117032, 0.116248], [119788, 0.116248], [119978, 0.116248], [120531, 0.116248], [124008, 0.116248], [125847, 0.116248], [126929, 0.116248], [127366, 0.116248], [128108, 0.116248], [131191, 0.116248], [133087, 0.116248], [134039, 0.116248], [137490, 0.333333], [138260, 0.116248], [142593, 0.116248], [143237, 0.333333], [144743, 0.116248], [151831, 0.116248], [163740, 0.116248], [166115, 0.116248], [171354, 0.116248], [173472, 0.116248], [175045, 0.232495], [180815, 0.116248], [184149, 0.116248], [187591, 0.116248], [191977, 0.116248], [193862, 0.116248], [195982, 0.116248], [207403, 0.116248], [208672, 0.333333], [212831, 0.116248], [213082, 0.707107], [214062, 0.116248], [223314, 0.116248], [224074, 0.116248], [225749, 0.116248], [235606, 0.116248], [236243, 0.116248], [240906, 0.116248], [253419, 0.116248]], "top": [["disks", 0.9462800251680044], ["date", 0.01374153873138284], ["who", 0.006069583866520168]]}, {"model": "intent:disks", "f": [[197, 0.116248], [637, 0.333333], [10556, 0.333333], [11889, 0.333333], [11891, 0.116248], [15551, 0.116248], [17130, 0.116248], [20605, 0.116248], [24232, 0.116248], [27172, 0.116248], [34909, 0.116248], [37355, 0.116248], [38577, 0.116248], [39589, 0.116248], [39629, 0.116248], [40584, 0.707107], [41403, 0.116248], [45831, 0.116248], [47677, 0.333333], [48692, 0.116248], [49361, 0.116248], [52012, 0.116248], [53272, 0.116248], [56129, 0.116248], [63773, 0.116248], [67139, 0.116248], [69316, 0.116248], [71960, 0.116248], [73185, 0.116248], [73754, 0.116248], [78978, 0.116248], [79533, 0.333333], [81055, 0.116248], [86732, 0.116248], [88012, 0.116248], [88298, 0.116248], [94758, 0.116248], [99297, 0.116248], [103742, 0.116248], [110890, 0.116248], [115872, 0.333333], [117032, 0.116248], [119788, 0.116248], [119978, 0.116248], [120531, 0.116248], [124008, 0.116248], [125847, 0.116248], [126929, 0.116248], [127366, 0.116248], [128108, 0.116248], [131191, 0.116248], [133087, 0.116248], [134039, 0.116248], [137490, 0.333333], [138260, 0.116248], [142593, 0.116248], [143237, 0.333333], [144743, 0.116248], [151831, 0.116248], [163740, 0.116248], [166115, 0.116248], [171354, 0.116248], [173472, 0.116248], [175045, 0.232495], [180815, 0.116248], [184149, 0.116248], [187591, 0.116248], [191977, 0.116248], [193862, 0.116248], [195982, 0.116248], [207403, 0.116248], [208672, 0.333333], [212831, 0.116248], [213082, 0.707107], [214062, 0.116248], [223314, 0.116248], [224074, 0.116248], [225749, 0.116248], [235606, 0.116248], [236243, 0.116248], [240906, 0.116248], [253419, 0.116248]], "top": [["block_devices", 0.9878157972092555], ["disk_mounts", 0.012184202790744445]]}, {"model": "tool", "f": [[2301, 0.129099], [2664, 0.129099], [8564, 0.129099], [12922, 0.129099], [16377, 0.129099], [18310, 0.129099], [19351, 0.129099], [33945, 0.129099], [34125, 0.129099], [39304, 0.129099], [40584, 0.707107], [41561, 0.129099], [48025, 0.129099], [51794, 0.129099], [54856, 0.301511], [56039, 0.129099], [57315, 0.129099], [60547, 0.129099], [69271, 0.301511], [74442, 0.129099], [76261, 0.129099], [78280, 0.129099], [80597, 0.129099], [96329, 0.129099], [99568, 0.129099], [101908, 0.301511], [110968, 0.129099], [111093, 0.129099], [118947, 0.129099], [120594, 0.129099], [121032, 0.129099], [121555, 0.129099], [122890, 0.129099], [124346, 0.129099], [130849, 0.129099], [131657, 0.301511], [142116, 0.301511], [142728, 0.129099], [145863, 0.129099], [145945, 0.129099], [147656, 0.129099], [152516, 0.129099], [153972, 0.129099], [156404, 0.301511], [156789, 0.129099], [158611, 0.129099], [181782, 0.129099], [182141, 0.129099], [183184, 0.129099], [185724, 0.129099], [194491, 0.129099], [194896, 0.129099], [200988, 0.129099], [210963, 0.129099], [213082, 0.707107], [217041, 0.129099], [221565, 0.129099], [229360, 0.129099], [232153, 0.301511], [235368, 0.129099], [236987, 0.301511], [237477, 0.301511], [239941, 0.129099], [240127, 0.129099], [240777, 0.129099], [247666, 0.129099], [250115, 0.129099], [250675, 0.129099], [251751, 0.129099], [252436, 0.129099], [252459, 0.301511], [258511, 0.129099], [259831, 0.301511]], "top": [["kill", 0.9794112005595973], ["docker", 0.007229640635169624], ["__none__", 0.003279250486079986]]}, {"model": "intent:kill", "f": [[2301, 0.129099], [2664, 0.129099], [8564, 0.129099], [12922, 0.129099], [16377, 0.129099], [18310, 0.129099], [19351, 0.129099], [33945, 0.129099], [34125, 0.129099], [39304, 0.129099], [40584, 0.707107], [41561, 0.129099], [48025, 0.129099], [51794, 0.129099], [54856, 0.301511], [56039, 0.129099], [57315, 0.129099], [60547, 0.129099], [69271, 0.301511], [74442, 0.129099], [76261, 0.129099], [78280, 0.129099], [80597, 0.129099], [96329, 0.129099], [99568, 0.129099], [101908, 0.301511], [110968, 0.129099], [111093, 0.129099], [118947, 0.129099], [120594, 0.129099], [121032, 0.129099], [121555, 0.129099], [122890, 0.129099], [124346, 0.129099], [130849, 0.129099], [131657, 0.301511], [142116, 0.301511], [142728, 0.129099], [145863, 0.129099], [145945, 0.129099], [147656, 0.129099], [152516, 0.129099], [153972, 0.129099], [156404, 0.301511], [156789, 0.129099], [158611, 0.129099], [181782, 0.129099], [182141, 0.129099], [183184, 0.129099], [185724, 0.129099], [194491, 0.129099], [194896, 0.129099], [200988, 0.129099], [210963, 0.129099], [213082, 0.707107], [217041, 0.129099], [221565, 0.129099], [229360, 0.129099], [232153, 0.301511], [235368, 0.129099], [236987, 0.301511], [237477, 0.301511], [239941, 0.129099], [240127, 0.129099], [240777, 0.129099], [247666, 0.129099], [250115, 0.129099], [250675, 0.129099], [251751, 0.129099], [252436, 0.129099], [252459, 0.301511], [258511, 0.129099], [259831, 0.301511]], "top": [["kill_force", 0.9560329078920238], ["kill_by_name", 0.03456408744927567]]}, {"model": "tool", "f": [[2716, 0.154303], [4254, 0.154303], [4412, 0.154303], [13100, 0.154303], [13804, 0.154303], [14451, 0.154303], [16787, 0.154303], [36517, 0.154303], [40584, 0.707107], [44843, 0.447214], [47301, 0.154303], [47571, 0.154303], [50673, 0.154303], [54450, 0.154303], [64973, 0.154303], [74149, 0.447214], [80071, 0.154303], [80630, 0.154303], [87723, 0.154303], [97237, 0.154303], [102744, 0.154303], [103990, 0.154303], [106874, 0.447214], [111741, 0.154303], [116316, 0.154303], [120457, 0.447214], [125847, 0.154303], [136195, 0.154303], [136774, 0.154303], [146525, 0.154303], [154394, 0.154303], [167324, 0.154303], [175045, 0.154303], [176587, 0.154303], [190883, 0.154303], [200309, 0.154303], [213045, 0.154303], [213082, 0.707107], [215117, 0.154303], [216456, 0.154303], [218564, 0.154303], [226612, 0.154303], [233423, 0.154303], [233929, 0.154303], [236731, 0.154303], [239051, 0.154303], [239314, 0.447214], [253070, 0.154303], [254799, 0.154303]], "top": [["uname", 0.9731804190020793], ["journalctl", 0.011487067796863593], ["__none__", 0.006508882693149904]]}, {"model": "intent:uname", "f": [[2716, 0.154303], [4254, 0.154303], [4412, 0.154303], [13100, 0.154303], [13804, 0.154303], [14451, 0.154303], [16787, 0.154303], [36517, 0.154303], [40584, 0.707107], [44843, 0.447214], [47301, 0.154303], [47571, 0.154303], [50673, 0.154303], [54450, 0.154303], [64973, 0.154303], [74149, 0.447214], [80071, 0.154303], [80630, 0.154303], [87723, 0.154303], [97237, 0.154303], [102744, 0.154303], [103990, 0.154303], [106874, 0.447214], [111741, 0.154303], [116316, 0.154303], [120457, 0.447214], [125847, 0.154303], [136195, 0.154303], [136774, 0.154303], [146525, 0.154303], [154394, 0.154303], [167324, 0.154303], [175045, 0.154303], [176587, 0.154303], [190883, 0.154303], [200309, 0.154303], [213045, 0.154303], [213082, 0.707107], [215117, 0.154303], [216456, 0.154303], [218564, 0.154303], [226612, 0.154303], [233423, 0.154303], [233929, 0.154303], [236731, 0.154303], [239051, 0.154303], [239314, 0.447214], [253070, 0.154303], [254799, 0.154303]], "top": [["kernel_version", 0.9895730694009436], ["os_release", 0.009001024918482257]]}, {"model": "tool", "f": [[2140, 0.57735], [24123, 0.707107], [36339, 0.218218], [50925, 0.57735], [62787, 0.707107], [65863, 0.57735], [69553, 0.218218], [95513, 0.218218], [100648, 0.218218], [116969, 0.218218], [130464, 0.218218], [163394, 0.218218], [166268, 0.218218], [181336, 0.218218], [182491, 0.218218], [188658, 0.218218], [189805, 0.218218], [194409, 0.218218], [200640, 0.218218], [215272, 0.218218], [222321, 0.218218], [230467, 0.218218], [241843, 0.218218], [247473, 0.218218], [250955, 0.218218], [260511, 0.218218]], "top": [["which", 0.9654727191957418], ["ps", 0.01829505126519277], ["git", 0.002032804957318727]]}, {"model": "tool", "f": [[747, 0.149071], [12330, 0.149071], [13786, 0.149071], [19629, 0.149071], [21356, 0.377964], [21598, 0.149071], [24780, 0.149071], [25449, 0.377964], [26884, 0.149071], [30675, 0.149071], [36639, 0.149071], [37435, 0.149071], [39137, 0.149071], [40113, 0.149071], [40584, 0.447214], [52209, 0.149071], [53696, 0.149071], [78443, 0.149071], [84849, 0.149071], [94863, 0.149071], [108996, 0.149071], [123258, 0.149071], [123736, 0.149071], [125898, 0.149071], [129469, 0.149071], [130849, 0.149071], [134008, 0.149071], [135410, 0.447214], [138669, 0.149071], [147738, 0.149071], [151396, 0.149071], [154789, 0.377964], [154881, 0.149071], [160885, 0.377964], [161499, 0.447214], [161859, 0.149071], [164507, 0.149071], [168958, 0.149071], [171483, 0.149071], [176392, 0.149071], [179408, 0.149071], [182284, 0.149071], [183729, 0.447214], [189413, 0.149071], [196068, 0.149071], [196598, 0.377964], [201385, 0.149071], [206101, 0.377964], [213082, 0.447214], [217008, 0.149071], [224058, 0.149071], [224720, 0.149071], [245689, 0.149071], [246106, 0.377964], [257194, 0.149071], [257920, 0.149071], [258599, 0.149071]], "top": [["systemctl", 0.8979975716144468], ["curl", 0.02410411954360205], ["git", 0.02070020725630582]]}, {"model": "intent:systemctl", "f": [[747, 0.149071], [12330, 0.149071], [13786, 0.149071], [19629, 0.149071], [21356, 0.377964], [21598, 0.149071], [24780, 0.149071], [25449, 0.377964], [26884, 0.149071], [30675, 0.149071], [36639, 0.149071], [37435, 0.149071], [39137, 0.149071], [40113, 0.149071], [40584, 0.447214], [52209, 0.149071], [53696, 0.149071], [78443, 0.149071], [84849, 0.149071], [94863, 0.149071], [108996, 0.149071], [123258, 0.149071], [123736, 0.149071], [125898, 0.149071], [129469, 0.149071], [130849, 0.149071], [134008, 0.149071], [135410, 0.447214], [138669, 0.149071], [147738, 0.149071], [151396, 0.149071], [154789, 0.377964], [154881, 0.149071], [160885, 0.377964], [161499, 0.447214], [161859, 0.149071], [164507, 0.149071], [168958, 0.149071], [171483, 0.149071], [176392, 0.149071], [179408, 0.149071], [182284, 0.149071], [183729, 0.447214], [189413, 0.149071], [196068, 0.149071], [196598, 0.377964], [201385, 0.149071], [206101, 0.377964], [213082, 0.447214], [217008, 0.149071], [224058, 0.149071], [224720, 0.149071], [245689, 0.149071], [246106, 0.377964], [257194, 0.149071], [257920, 0.149071], [258599, 0.149071]], "top": [["service_status", 0.9996119005340295], ["service_enable", 0.0001928128604539089]]}, {"model": "tool", "f": [[331, 0.377964], [7075, 0.125988], [8829, 0.125988], [9512, 0.125988], [12448, 0.125988], [12908, 0.125988], [21726, 0.125988], [25128, 0.125988], [34650, 0.125988], [34905, 0.125988], [36273, 0.125988], [36517, 0.125988], [39388, 0.125988], [39710, 0.125988], [40584, 0.707107], [45170, 0.125988], [46826, 0.125988], [51068, 0.125988], [51437, 0.125988], [52810, 0.125988], [59278, 0.125988], [59882, 0.125988], [60061, 0.377964], [62787, 0.707107], [72998, 0.125988], [73546, 0.125988], [80926, 0.125988], [83214, 0.125988], [87919, 0.125988], [93275, 0.125988], [94877, 0.125988], [99247, 0.125988], [104891, 0.125988], [105885, 0.125988], [105953, 0.125988], [119978, 0.125988], [123736, 0.125988], [125582, 0.125988], [125847, 0.125988], [128282, 0.377964], [134680, 0.125988], [136650, 0.125988], [137594, 0.125988], [138498, 0.377964], [140899, 0.125988], [146413, 0.125988], [149914, 0.125988], [154142, 0.125988], [154462, 0.125988], [156789, 0.125988], [162024, 0.125988], [163146, 0.125988], [170913, 0.125988], [171779, 0.377964], [179811, 0.125988], [180274, 0.125988], [181291, 0.125988], [183315, 0.125988], [196122, 0.125988], [198301, 0.125988], [207002, 0.125988], [210718, 0.125988], [216889, 0.125988], [218981, 0.377964], [220760, 0.125988], [235540, 0.125988], [239206, 0.125988], [245102, 0.125988], [248003, 0.125988], [250253, 0.125988], [256273, 0.377964], [258185, 0.125988]], "top": [["hardware", 0.9994842698721067], ["__none__", 0.00013860371982453903], ["cpu", 7.810100355307472e-05]]}, {"model": "intent:hardware", "f": [[331, 0.377964], [7075, 0.125988], [8829, 0.125988], [9512, 0.125988], [12448, 0.125988], [12908, 0.125988], [21726, 0.125988], [25128, 0.125988], [34650, 0.125988], [34905, 0.125988], [36273, 0.125988], [36517, 0.125988], [39388, 0.125988], [39710, 0.125988], [40584, 0.707107], [45170, 0.125988], [46826, 0.125988], [51068, 0.125988], [51437, 0.125988], [52810, 0.125988], [59278, 0.125988], [59882, 0.125988], [60061, 0.377964], [62787, 0.707107], [72998, 0.125988], [73546, 0.125988], [80926, 0.125988], [83214, 0.125988], [87919, 0.125988], [93275, 0.125988], [94877, 0.125988], [99247, 0.125988], [104891, 0.125988], [105885, 0.125988], [105953, 0.125988], [119978, 0.125988], [123736, 0.125988], [125582, 0.125988], [125847, 0.125988], [128282, 0.377964], [134680, 0.125988], [136650, 0.125988], [137594, 0.125988], [138498, 0.377964], [140899, 0.125988], [146413, 0.125988], [149914, 0.125988], [154142, 0.125988], [154462, 0.125988], [156789, 0.125988], [162024, 0.125988], [163146, 0.125988], [170913, 0.125988], [171779, 0.377964], [179811, 0.125988], [180274, 0.125988], [181291, 0.125988], [183315, 0.125988], [196122, 0.125988], [198301, 0.125988], [207002, 0.125988], [210718, 0.125988], [216889, 0.125988], [218981, 0.377964], [220760, 0.125988], [235540, 0.125988], [239206, 0.125988], [245102, 0.125988], [248003, 0.125988], [250253, 0.125988], [256273, 0.377964], [258185, 0.125988]], "top": [["temperature", 0.9940472842898287], ["gpu_info", 0.00281075958929011]]}, {"model": "tool", "f": [[1325, 0.408248], [8039, 0.160128], [21054, 0.160128], [26555, 0.333333], [27150, 0.160128], [37355, 0.160128], [37368, 0.160128], [38174, 0.160128], [50254, 0.160128], [54305, 0.160128], [61872, 0.333333], [76356, 0.160128], [78811, 0.160128], [79879, 0.160128], [80170, 0.160128], [81093, 0.160128], [86307, 0.160128], [86334, 0.408248], [87018, 0.408248], [93251, 0.160128], [96595, 0.160128], [98961, 0.160128], [105294, 0.160128], [109011, 0.160128], [109254, 0.333333], [113733, 0.160128], [115882, 0.160128], [116419, 0.333333], [122550, 0.160128], [122926, 0.160128], [129146, 0.408248], [137247, 0.333333], [143369, 0.160128], [143443, 0.160128], [148462, 0.160128], [153471, 0.333333], [153965, 0.160128], [172891, 0.333333], [173836, 0.160128], [178996, 0.160128], [191206, 0.160128], [193440, 0.160128], [202348, 0.160128], [211607, 0.160128], [211823, 0.333333], [213192, 0.160128], [213790, 0.160128], [220075, 0.408248], [222078, 0.160128], [233214, 0.333333], [243210, 0.160128], [255317, 0.160128], [257626, 0.160128], [258043, 0.408248]], "top": [["dig", 0.9884601420369243], ["ping", 0.0016246704117043682], ["cli", 0.0010636478445375083]]}, {"model": "tool", "f": [[506, 0.57735], [24123, 0.707107], [45714, 0.288675], [55894, 0.288675], [56298, 0.288675], [62787, 0.707107], [72593, 0.288675], [130814, 0.288675], [150694, 0.57735], [200922, 0.288675], [226987, 0.288675], [231524, 0.57735], [244110, 0.288675], [255938, 0.288675], [258918, 0.288675], [259381, 0.288675], [259890, 0.288675]], "top": [["git", 0.9750651097804875], ["__none__", 0.007928329370114435], ["date", 0.0011147342425581615]]}, {"model": "intent:git", "f": [[506, 0.57735], [24123, 0.707107], [45714, 0.288675], [55894, 0.288675], [56298, 0.288675], [62787, 0.707107], [72593, 0.288675], [130814, 0.288675], [150694, 0.57735], [200922, 0.288675], [226987, 0.288675], [231524, 0.57735], [244110, 0.288675], [255938, 0.288675], [258918, 0.288675], [259381, 0.288675], [259890, 0.288675]], "top": [["git_log", 0.8739819211080166], ["git_branches", 0.031237041918738433]]}, {"model": "tool", "f": [[499, 0.144338], [7612, 0.144338], [8442, 0.144338], [14112, 0.144338], [25103, 0.144338], [26425, 0.144338], [35413, 0.144338], [44387, 0.377964], [49194, 0.144338], [56284, 0.144338], [56624, 0.144338], [61640, 0.144338], [66750, 0.144338], [67469, 0.377964], [79444, 0.144338], [93330, 0.144338], [99551, 0.144338], [104744, 0.144338], [106416, 0.144338], [107796, 0.377964], [110281, 0.144338], [118984, 0.144338], [120739, 0.144338], [126555, 0.144338], [130556, 0.144338], [144565, 0.144338], [146712, 0.144338], [148281, 0.144338], [152919, 0.144338], [153803, 0.144338], [154392, 0.144338], [162884, 0.377964], [166251, 0.144338], [166348, 0.377964], [169216, 0.144338], [173651, 0.144338], [175202, 0.144338], [175985, 0.144338], [184377, 0.144338], [188486, 0.144338], [195897, 0.377964], [201467, 0.144338], [207232, 0.144338], [210662, 0.144338], [212280, 0.144338], [213082, 0.707107], [218375, 0.144338], [218416, 0.144338], [220028, 0.144338], [229658, 0.144338], [230409, 0.144338], [231420, 0.144338], [242649, 0.144338], [243503, 0.144338], [251380, 0.377964], [258292, 0.144338], [260215, 0.707107]], "top": [["git", 0.9938258752112047], ["pkg", 0.001320919524508035], ["sed", 0.0007191958725445445]]}, {"model": "intent:git", "f": [[499, 0.144338], [7612, 0.144338], [8442, 0.144338], [14112, 0.144338], [25103, 0.144338], [26425, 0.144338], [35413, 0.144338], [44387, 0.377964], [49194, 0.144338], [56284, 0.144338], [56624, 0.144338], [61640, 0.144338], [66750, 0.144338], [67469, 0.377964], [79444, 0.144338], [93330, 0.144338], [99551, 0.144338], [104744, 0.144338], [106416, 0.144338], [107796, 0.377964], [110281, 0.144338], [118984, 0.144338], [120739, 0.144338], [126555, 0.144338], [130556, 0.144338], [144565, 0.144338], [146712, 0.144338], [148281, 0.144338], [152919, 0.144338], [153803, 0.144338], [154392, 0.144338], [162884, 0.377964], [166251, 0.144338], [166348, 0.377964], [169216, 0.144338], [173651, 0.144338], [175202, 0.144338], [175985, 0.144338], [184377, 0.144338], [188486, 0.144338], [195897, 0.377964], [201467, 0.144338], [207232, 0.144338], [210662, 0.144338], [212280, 0.144338], [213082, 0.707107], [218375, 0.144338], [218416, 0.144338], [220028, 0.144338], [229658, 0.144338], [230409, 0.144338], [231420, 0.144338], [242649, 0.144338], [243503, 0.144338], [251380, 0.377964], [258292, 0.144338], [260215, 0.707107]], "top": [["git_discard_changes", 0.9004166263768862], ["git_add_all", 0.03889824572666908]]}, {"model": "tool", "f": [[1493, 0.097129], [5735, 0.097129], [6155, 0.097129], [7127, 0.097129], [7412, 0.097129], [9859, 0.097129], [14761, 0.097129], [18948, 0.097129], [19637, 0.097129], [24123, 0.707107], [26563, 0.301511], [27104, 0.097129], [31198, 0.097129], [32739, 0.097129], [32839, 0.097129], [34456, 0.097129], [35571, 0.097129], [36163, 0.301511], [36495, 0.097129], [37772, 0.097129], [39482, 0.097129], [39956, 0.097129], [42148, 0.097129], [44360, 0.097129], [45242, 0.301511], [49119, 0.097129], [49412, 0.097129], [51131, 0.097129], [51556, 0.097129], [53242, 0.097129], [53355, 0.301511], [55433, 0.097129], [60541, 0.097129], [61288, 0.097129], [62787, 0.707107], [65614, 0.097129], [67779, 0.301511], [70761, 0.301511], [77795, 0.097129], [88658, 0.097129], [90314, 0.097129], [90486, 0.097129], [94738, 0.097129], [96974, 0.097129], [98807, 0.097129], [101069, 0.301511], [106126, 0.301511], [115510, 0.097129], [119956, 0.097129], [120052, 0.097129], [121994, 0.097129], [128832, 0.097129], [131396, 0.097129], [131796, 0.097129], [131803, 0.097129], [138555, 0.097129], [139440, 0.097129], [139813, 0.097129], [146270, 0.097129], [146863, 0.097129], [148323, 0.097129], [149416, 0.097129], [150161, 0.301511], [150856, 0.097129], [151548, 0.097129], [152590, 0.097129], [153555, 0.097129], [159278, 0.097129], [165309, 0.097129], [166356, 0.097129], [167514, 0.097129], [167662, 0.097129], [170521, 0.097129], [173170, 0.301511], [178935, 0.097129], [182142, 0.097129], [182702, 0.097129], [183882, 0.097129], [184673, 0.097129], [185048, 0.097129], [186810, 0.097129], [190410, 0.097129], [190864, 0.097129], [196165, 0.097129], [198120, 0.097129], [203007, 0.097129], [208431, 0.097129], [211121, 0.097129], [211902, 0.097129], [212449, 0.097129], [212798, 0.097129], [215678, 0.097129], [216237, 0.097129], [216843, 0.301511], [218783, 0.097129], [220890, 0.097129], [221123, 0.097129], [223332, 0.097129], [224951, 0.097129], [226405, 0.097129], [227269, 0.097129], [227643, 0.097129], [234032, 0.097129], [236243, 0.097129], [236309, 0.097129], [237943, 0.097129], [239708, 0.097129], [241212, 0.097129], [242649, 0.097129], [243540, 0.097129], [244258, 0.097129], [246391, 0.097129], [248330, 0.097129], [249151, 0.097129], [249973, 0.097129], [253456, 0.097129], [256748, 0.097129], [257368, 0.097129], [261948, 0.097129]], "top": [["git", 0.9503861729533624], ["find", 0.03452419948372957], ["pkg", 0.0037625383978719803]]}, {"model": "intent:git", "f": [[1493, 0.097129], [5735, 0.097129], [6155, 0.097129], [7127, 0.097129], [7412, 0.097129], [9859, 0.097129], [14761, 0.097129], [18948, 0.097129], [19637, 0.097129], [24123, 0.707107], [26563, 0.301511], [27104, 0.097129], [31198, 0.097129], [32739, 0.097129], [32839, 0.097129], [34456, 0.097129], [35571, 0.097129], [36163, 0.301511], [36495, 0.097129], [37772, 0.097129], [39482, 0.097129], [39956, 0.097129], [42148, 0.097129], [44360, 0.097129], [45242, 0.301511], [49119, 0.097129], [49412, 0.097129], [51131, 0.097129], [51556, 0.097129], [53242, 0.097129], [53355, 0.301511], [55433, 0.097129], [60541, 0.097129], [61288, 0.097129], [62787, 0.707107], [65614, 0.097129], [67779, 0.301511], [70761, 0.301511], [77795, 0.097129], [88658, 0.097129], [90314, 0.097129], [90486, 0.097129], [94738, 0.097129], [96974, 0.097129], [98807, 0.097129], [101069, 0.301511], [106126, 0.301511], [115510, 0.097129], [119956, 0.097129], [120052, 0.097129], [121994, 0.097129], [128832, 0.097129], [131396, 0.097129], [131796, 0.097129], [131803, 0.097129], [138555, 0.097129], [139440, 0.097129], [139813, 0.097129], [146270, 0.097129], [146863, 0.097129], [148323, 0.097129], [149416, 0.097129], [150161, 0.301511], [150856, 0.097129], [151548, 0.097129], [152590, 0.097129], [153555, 0.097129], [159278, 0.097129], [165309, 0.097129], [166356, 0.097129], [167514, 0.097129], [167662, 0.097129], [170521, 0.097129], [173170, 0.301511], [178935, 0.097129], [182142, 0.097129], [182702, 0.097129], [183882, 0.097129], [184673, 0.097129], [185048, 0.097129], [186810, 0.097129], [190410, 0.097129], [190864, 0.097129], [196165, 0.097129], [198120, 0.097129], [203007, 0.097129], [208431, 0.097129], [211121, 0.097129], [211902, 0.097129], [212449, 0.097129], [212798, 0.097129], [215678, 0.097129], [216237, 0.097129], [216843, 0.301511], [218783, 0.097129], [220890, 0.097129], [221123, 0.097129], [223332, 0.097129], [224951, 0.097129], [226405, 0.097129], [227269, 0.097129], [227643, 0.097129], [234032, 0.097129], [236243, 0.097129], [236309, 0.097129], [237943, 0.097129], [239708, 0.097129], [241212, 0.097129], [242649, 0.097129], [243540, 0.097129], [244258, 0.097129], [246391, 0.097129], [248330, 0.097129], [249151, 0.097129], [249973, 0.097129], [253456, 0.097129], [256748, 0.097129], [257368, 0.097129], [261948, 0.097129]], "top": [["git_init", 0.9864361707289514], ["git_status", 0.002249093750960234]]}, {"model": "tool", "f": [[2751, 0.258199], [4187, 0.103695], [5967, 0.103695], [20355, 0.103695], [21082, 0.447214], [21299, 0.103695], [21549, 0.258199], [22217, 0.103695], [22927, 0.258199], [23829, 0.103695], [24123, 0.447214], [27256, 0.103695], [27903, 0.103695], [31610, 0.103695], [36562, 0.103695], [39939, 0.103695], [40501, 0.103695], [42438, 0.258199], [51184, 0.103695], [51213, 0.258199], [56079, 0.103695], [56129, 0.103695], [57349, 0.103695], [57895, 0.258199], [59060, 0.103695], [63356, 0.447214], [67318, 0.103695], [67543, 0.103695], [68485, 0.103695], [69369, 0.103695], [70392, 0.258199], [72879, 0.103695], [78898, 0.258199], [79182, 0.103695], [85478, 0.103695], [87463, 0.103695], [90740, 0.103695], [93596, 0.103695], [94863, 0.103695], [97377, 0.103695], [102610, 0.103695], [108659, 0.258199], [110504, 0.103695], [114635, 0.103695], [114795, 0.103695], [117485, 0.103695], [118003, 0.103695], [120751, 0.103695], [126934, 0.103695], [128848, 0.103695], [130331, 0.103695], [134620, 0.103695], [134967, 0.258199], [135993, 0.103695], [137660, 0.258199], [140943, 0.103695], [143084, 0.103695], [147738, 0.103695], [148729, 0.103695], [153945, 0.103695], [154056, 0.103695], [154866, 0.258199], [155216, 0.103695], [155219, 0.258199], [156059, 0.103695], [160552, 0.103695], [161615, 0.103695], [161682, 0.103695], [166522, 0.103695], [169721, 0.103695], [170251, 0.103695], [170333, 0.103695], [182702, 0.103695], [186837, 0.103695], [192546, 0.103695], [195964, 0.103695], [197047, 0.103695], [202997, 0.103695], [203818, 0.103695], [206907, 0.103695], [207319, 0.103695], [207614, 0.103695], [208799, 0.258199], [211005, 0.103695], [211121, 0.103695], [213082, 0.447214], [213419, 0.103695], [213598, 0.103695], [218342, 0.103695], [218543, 0.103695], [220293, 0.103695], [221749, 0.103695], [224058, 0.103695], [225499, 0.103695], [225549, 0.103695], [229561, 0.103695], [231480, 0.103695], [232675, 0.103695], [233270, 0.103695], [234078, 0.447214], [236422, 0.103695], [242335, 0.103695], [243269, 0.103695], [243756, 0.258199], [243900, 0.103695], [244883, 0.103695], [245492, 0.103695], [251650, 0.103695], [256961, 0.103695], [257194, 0.103695], [261440, 0.103695], [261531, 0.103695], [261720, 0.103695]], "top": [["docker", 0.9999987884208206], ["git", 3.5022934121949056e-07], ["npm", 2.3764302772276797e-07]]}, {"model": "intent:docker", "f": [[2751, 0.258199], [4187, 0.103695], [5967, 0.103695], [20355, 0.103695], [21082, 0.447214], [21299, 0.103695], [21549, 0.258199], [22217, 0.103695], [22927, 0.258199], [23829, 0.103695], [24123, 0.447214], [27256, 0.103695], [27903, 0.103695], [31610, 0.103695], [36562, 0.103695], [39939, 0.103695], [40501, 0.103695], [42438, 0.258199], [51184, 0.103695], [51213, 0.258199], [56079, 0.103695], [56129, 0.103695], [57349, 0.103695], [57895, 0.258199], [59060, 0.103695], [63356, 0.447214], [67318, 0.103695], [67543, 0.103695], [68485, 0.103695], [69369, 0.103695], [70392, 0.258199], [72879, 0.103695], [78898, 0.258199], [79182, 0.103695], [85478, 0.103695], [87463, 0.103695], [90740, 0.103695], [93596, 0.103695], [94863, 0.103695], [97377, 0.103695], [102610, 0.103695], [108659, 0.258199], [110504, 0.103695], [114635, 0.103695], [114795, 0.103695], [117485, 0.103695], [118003, 0.103695], [120751, 0.103695], [126934, 0.103695], [128848, 0.103695], [130331, 0.103695], [134620, 0.103695], [134967, 0.258199], [135993, 0.103695], [137660, 0.258199], [140943, 0.103695], [143084, 0.103695], [147738, 0.103695], [148729, 0.103695], [153945, 0.103695], [154056, 0.103695], [154866, 0.258199], [155216, 0.103695], [155219, 0.258199], [156059, 0.103695], [160552, 0.103695], [161615, 0.103695], [161682, 0.103695], [166522, 0.103695], [169721, 0.103695], [170251, 0.103695], [170333, 0.103695], [182702, 0.103695], [186837, 0.103695], [192546, 0.103695], [195964, 0.103695], [197047, 0.103695], [202997, 0.103695], [203818, 0.103695], [206907, 0.103695], [207319, 0.103695], [207614, 0.103695], [208799, 0.258199], [211005, 0.103695], [211121, 0.103695], [213082, 0.447214], [213419, 0.103695], [213598, 0.103695], [218342, 0.103695], [218543, 0.103695], [220293, 0.103695], [221749, 0.103695], [224058, 0.103695], [225499, 0.103695], [225549, 0.103695], [229561, 0.103695], [231480, 0.103695], [232675, 0.103695], [233270, 0.103695], [234078, 0.447214], [236422, 0.103695], [242335, 0.103695], [243269, 0.103695], [243756, 0.258199], [243900, 0.103695], [244883, 0.103695], [245492, 0.103695], [251650, 0.103695], [256961, 0.103695], [257194, 0.103695], [261440, 0.103695], [261531, 0.103695], [261720, 0.103695]], "top": [["docker_compose_up", 0.9847444343288116], ["docker_compose_down", 0.011650691273749434]]}, {"model": "tool", "f": [[2019, 0.116248], [9136, 0.116248], [15825, 0.116248], [19852, 0.116248], [23837, 0.116248], [24097, 0.116248], [26425, 0.116248], [30650, 0.116248], [32974, 0.116248], [36422, 0.116248], [36824, 0.116248], [48194, 0.116248], [58072, 0.116248], [61948, 0.116248], [65925, 0.242536], [69369, 0.232495], [69817, 0.116248], [70175, 0.116248], [73754, 0.116248], [78443, 0.116248], [84598, 0.116248], [88012, 0.116248], [88013, 0.116248], [88263, 0.116248], [90027, 0.116248], [90314, 0.232495], [94097, 0.116248], [94589, 0.116248], [94685, 0.116248], [96956, 0.242536], [98915, 0.116248], [100810, 0.242536], [101869, 0.116248], [110890, 0.116248], [115084, 0.116248], [119539, 0.116248], [124411, 0.116248], [124420, 0.242536], [131770, 0.232495], [133636, 0.116248], [135491, 0.116248], [136718, 0.116248], [137326, 0.116248], [144340, 0.116248], [148932, 0.116248], [150619, 0.116248], [156267, 0.116248], [156821, 0.242536], [160655, 0.242536], [164285, 0.242536], [164386, 0.116248], [168532, 0.116248], [169555, 0.242536], [171327, 0.116248], [171483, 0.116248], [172929, 0.116248], [173295, 0.116248], [174930, 0.242536], [182023, 0.116248], [191158, 0.242536], [194218, 0.116248], [201074, 0.116248], [203970, 0.116248], [204998, 0.116248], [206101, 0.242536], [206211, 0.116248], [210367, 0.242536], [213819, 0.116248], [216054, 0.116248], [220075, 0.707107], [221091, 0.116248], [224513, 0.116248], [229670, 0.116248], [229700, 0.242536], [233566, 0.116248], [234069, 0.242536], [234527, 0.242536], [245689, 0.116248], [250253, 0.116248], [251890, 0.116248], [252054, 0.242536], [254559, 0.116248], [258906, 0.242536], [260215, 0.707107]], "top": [["head", 0.9916996503675308], ["tail", 0.007909732746759102], ["journalctl", 0.00024074310738338145]]}, {"model": "intent:head", "f": [[2019, 0.116248], [9136, 0.116248], [15825, 0.116248], [19852, 0.116248], [23837, 0.116248], [24097, 0.116248], [26425, 0.116248], [30650, 0.116248], [32974, 0.116248], [36422, 0.116248], [36824, 0.116248], [48194, 0.116248], [58072, 0.116248], [61948, 0.116248], [65925, 0.242536], [69369, 0.232495], [69817, 0.116248], [70175, 0.116248], [73754, 0.116248], [78443, 0.116248], [84598, 0.116248], [88012, 0.116248], [88013, 0.116248], [88263, 0.116248], [90027, 0.116248], [90314, 0.232495], [94097, 0.116248], [94589, 0.116248], [94685, 0.116248], [96956, 0.242536], [98915, 0.116248], [100810, 0.242536], [101869, 0.116248], [110890, 0.116248], [115084, 0.116248], [119539, 0.116248], [124411, 0.116248], [124420, 0.242536], [131770, 0.232495], [133636, 0.116248], [135491, 0.116248], [136718, 0.116248], [137326, 0.116248], [144340, 0.116248], [148932, 0.116248], [150619, 0.116248], [156267, 0.116248], [156821, 0.242536], [160655, 0.242536], [164285, 0.242536], [164386, 0.116248], [168532, 0.116248], [169555, 0.242536], [171327, 0.116248], [171483, 0.116248], [172929, 0.116248], [173295, 0.116248], [174930, 0.242536], [182023, 0.116248], [191158, 0.242536], [194218, 0.116248], [201074, 0.116248], [203970, 0.116248], [204998, 0.116248], [206101, 0.242536], [206211, 0.116248], [210367, 0.242536], [213819, 0.116248], [216054, 0.116248], [220075, 0.707107], [221091, 0.116248], [224513, 0.116248], [229670, 0.116248], [229700, 0.242536], [233566, 0.116248], [234069, 0.242536], [234527, 0.242536], [245689, 0.116248], [250253, 0.116248], [251890, 0.116248], [252054, 0.242536], [254559, 0.116248], [258906, 0.242536], [260215, 0.707107]], "top": [["head_file", 0.9793961462163925], ["print_line_range", 0.020603853783607587]]}, {"model": "tool", "f": [[1325, 0.408248], [6916, 0.408248], [7091, 0.179605], [20458, 0.179605], [20757, 0.179605], [20963, 0.179605], [24123, 0.408248], [33945, 0.179605], [34223, 0.301511], [39304, 0.179605], [42714, 0.179605], [44512, 0.179605], [46585, 0.179605], [50816, 0.179605], [58072, 0.179605], [60547, 0.179605], [62787, 0.408248], [64131, 0.179605], [76495, 0.301511], [76742, 0.301511], [86920, 0.408248], [92787, 0.179605], [95353, 0.301511], [96329, 0.179605], [96956, 0.301511], [97338, 0.179605], [106407, 0.179605], [121365, 0.179605], [130849, 0.179605], [148902, 0.301511], [150275, 0.301511], [155216, 0.179605], [162085, 0.179605], [164207, 0.179605], [166618, 0.179605], [166993, 0.301511], [167577, 0.179605], [175045, 0.179605], [185827, 0.179605], [187278, 0.179605], [191882, 0.179605], [209325, 0.301511], [210963, 0.179605], [232908, 0.301511], [248913, 0.179605], [258043, 0.408248], [259831, 0.301511], [260511, 0.179605]], "top": [["ss", 0.9965575600171969], ["nc", 0.003064470910039335], ["kill", 0.000192788995012971]]}, {"model": "intent:ss", "f": [[1325, 0.408248], [6916, 0.408248], [7091, 0.179605], [20458, 0.179605], [20757, 0.179605], [20963, 0.179605], [24123, 0.408248], [33945, 0.179605], [34223, 0.301511], [39304, 0.179605], [42714, 0.179605], [44512, 0.179605], [46585, 0.179605], [50816, 0.179605], [58072, 0.179605], [60547, 0.179605], [62787, 0.408248], [64131, 0.179605], [76495, 0.301511], [76742, 0.301511], [86920, 0.408248], [92787, 0.179605], [95353, 0.301511], [96329, 0.179605], [96956, 0.301511], [97338, 0.179605], [106407, 0.179605], [121365, 0.179605], [130849, 0.179605], [148902, 0.301511], [150275, 0.301511], [155216, 0.179605], [162085, 0.179605], [164207, 0.179605], [166618, 0.179605], [166993, 0.301511], [167577, 0.179605], [175045, 0.179605], [185827, 0.179605], [187278, 0.179605], [191882, 0.179605], [209325, 0.301511], [210963, 0.179605], [232908, 0.301511], [248913, 0.179605], [258043, 0.408248], [259831, 0.301511], [260511, 0.179605]], "top": [["process_on_port", 0.999803123115935], ["listening_ports", 0.00010988377417640933]]}, {"model": "tool", "f": [[1836, 0.149071], [4573, 0.149071], [17130, 0.149071], [20497, 0.149071], [21082, 0.377964], [24123, 0.377964], [40315, 0.447214], [40540, 0.447214], [46583, 0.149071], [49361, 0.149071], [56129, 0.149071], [57044, 0.149071], [62690, 0.447214], [62787, 0.377964], [63356, 0.377964], [65084, 0.149071], [66119, 0.447214], [73185, 0.149071], [79533, 0.447214], [82596, 0.149071], [90399, 0.149071], [99297, 0.149071], [99567, 0.149071], [102136, 0.149071], [119968, 0.149071], [120531, 0.149071], [122426, 0.149071], [127366, 0.149071], [129952, 0.149071], [133564, 0.149071], [137407, 0.149071], [142593, 0.149071], [147829, 0.149071], [168099, 0.149071], [171354, 0.149071], [174939, 0.149071], [175045, 0.149071], [181016, 0.149071], [191165, 0.377964], [191977, 0.149071], [194768, 0.149071], [199988, 0.377964], [204035, 0.149071], [211499, 0.149071], [211827, 0.149071], [215902, 0.149071], [216542, 0.149071], [220342, 0.149071], [223314, 0.149071], [225359, 0.149071], [232092, 0.149071], [232143, 0.149071], [240738, 0.377964], [243664, 0.149071], [248036, 0.149071], [251738, 0.149071], [258721, 0.149071]], "top": [["systemctl", 0.9875157613066954], ["journalctl", 0.007883954158368693], ["docker", 0.0007481380826582485]]}, {"model": "intent:systemctl", "f": [[1836, 0.149071], [4573, 0.149071], [17130, 0.149071], [20497, 0.149071], [21082, 0.377964], [24123, 0.377964], [40315, 0.447214], [40540, 0.447214], [46583, 0.149071], [49361, 0.149071], [56129, 0.149071], [57044, 0.149071], [62690, 0.447214], [62787, 0.377964], [63356, 0.377964], [65084, 0.149071], [66119, 0.447214], [73185, 0.149071], [79533, 0.447214], [82596, 0.149071], [90399, 0.149071], [99297, 0.149071], [99567, 0.149071], [102136, 0.149071], [119968, 0.149071], [120531, 0.149071], [122426, 0.149071], [127366, 0.149071], [129952, 0.149071], [133564, 0.149071], [137407, 0.149071], [142593, 0.149071], [147829, 0.149071], [168099, 0.149071], [171354, 0.149071], [174939, 0.149071], [175045, 0.149071], [181016, 0.149071], [191165, 0.377964], [191977, 0.149071], [194768, 0.149071], [199988, 0.377964], [204035, 0.149071], [211499, 0.149071], [211827, 0.149071], [215902, 0.149071], [216542, 0.149071], [220342, 0.149071], [223314, 0.149071], [225359, 0.149071], [232092, 0.149071], [232143, 0.149071], [240738, 0.377964], [243664, 0.149071], [248036, 0.149071], [251738, 0.149071], [258721, 0.149071]], "top": [["list_services", 0.9535806001614843], ["failed_services", 0.024893940276690847]]}, {"model": "tool", "f": [[2301, 0.120386], [7977, 0.120386], [16377, 0.120386], [21364, 0.120386], [21794, 0.120386], [22600, 0.120386], [29397, 0.120386], [30724, 0.120386], [34899, 0.301511], [35600, 0.120386], [37858, 0.120386], [37867, 0.120386], [40584, 0.707107], [47009, 0.120386], [47607, 0.120386], [47755, 0.120386], [48463, 0.120386], [49208, 0.120386], [49764, 0.120386], [56984, 0.301511], [57037, 0.120386], [57315, 0.120386], [64082, 0.120386], [67577, 0.120386], [69271, 0.301511], [69369, 0.120386], [69564, 0.120386], [79208, 0.301511], [83511, 0.120386], [87896, 0.120386], [88702, 0.120386], [91458, 0.120386], [102513, 0.120386], [102847, 0.120386], [112607, 0.120386], [115187, 0.120386], [117494, 0.120386], [119052, 0.120386], [120751, 0.120386], [121555, 0.120386], [125308, 0.120386], [126744, 0.301511], [127579, 0.120386], [130158, 0.120386], [132467, 0.120386], [132675, 0.301511], [134943, 0.301511], [137108, 0.120386], [137859, 0.120386], [144620, 0.120386], [149577, 0.120386], [159080, 0.301511], [161467, 0.120386], [161651, 0.120386], [164436, 0.120386], [166522, 0.120386], [170310, 0.120386], [171273, 0.120386], [192399, 0.120386], [197345, 0.120386], [208188, 0.120386], [211121, 0.120386], [211666, 0.120386], [213082, 0.707107], [213304, 0.120386], [213448, 0.120386], [217213, 0.120386], [220293, 0.120386], [221749, 0.120386], [222499, 0.120386], [229892, 0.301511], [233301, 0.120386], [235256, 0.120386], [240777, 0.120386], [248733, 0.120386], [249992, 0.120386], [250499, 0.120386], [252033, 0.120386], [252436, 0.120386], [259823, 0.301511], [260925, 0.120386], [261133, 0.301511]], "top": [["git", 0.9999827706058647], ["ssh", 1.2071915466815527e-05], ["traceroute", 5.735523279285347e-07]]}, {"model": "intent:git", "f": [[2301, 0.120386], [7977, 0.120386], [16377, 0.120386], [21364, 0.120386], [21794, 0.120386], [22600, 0.120386], [29397, 0.120386], [30724, 0.120386], [34899, 0.301511], [35600, 0.120386], [37858, 0.120386], [37867, 0.120386], [40584, 0.707107], [47009, 0.120386], [47607, 0.120386], [47755, 0.120386], [48463, 0.120386], [49208, 0.120386], [49764, 0.120386], [56984, 0.301511], [57037, 0.120386], [57315, 0.120386], [64082, 0.120386], [67577, 0.120386], [69271, 0.301511], [69369, 0.120386], [69564, 0.120386], [79208, 0.301511], [83511, 0.120386], [87896, 0.120386], [88702, 0.120386], [91458, 0.120386], [102513, 0.120386], [102847, 0.120386], [112607, 0.120386], [115187, 0.120386], [117494, 0.120386], [119052, 0.120386], [120751, 0.120386], [121555, 0.120386], [125308, 0.120386], [126744, 0.301511], [127579, 0.120386], [130158, 0.120386], [132467, 0.120386], [132675, 0.301511], [134943, 0.301511], [137108, 0.120386], [137859, 0.120386], [144620, 0.120386], [149577, 0.120386], [159080, 0.301511], [161467, 0.120386], [161651, 0.120386], [164436, 0.120386], [166522, 0.120386], [170310, 0.120386], [171273, 0.120386], [192399, 0.120386], [197345, 0.120386], [208188, 0.120386], [211121, 0.120386], [211666, 0.120386], [213082, 0.707107], [213304, 0.120386], [213448, 0.120386], [217213, 0.120386], [220293, 0.120386], [221749, 0.120386], [222499, 0.120386], [229892, 0.301511], [233301, 0.120386], [235256, 0.120386], [240777, 0.120386], [248733, 0.120386], [249992, 0.120386], [250499, 0.120386], [252033, 0.120386], [252436, 0.120386], [259823, 0.301511], [260925, 0.120386], [261133, 0.301511]], "top": [["git_push", 0.9864871154917016], ["git_pull", 0.004200837708885961]]}, {"model": "tool", "f": [[1997, 0.1], [3918, 0.1], [5058, 0.1], [5964, 0.1], [8099, 0.258199], [10299, 0.1], [15140, 0.258199], [15226, 0.1], [16032, 0.1], [17130, 0.1], [19315, 0.258199], [20963, 0.1], [21534, 0.1], [23797, 0.1], [24123, 0.707107], [26032, 0.1], [27265, 0.1], [27313, 0.1], [28479, 0.1], [29950, 0.1], [33408, 0.1], [34477, 0.1], [36030, 0.258199], [36159, 0.1], [43218, 0.1], [46258, 0.258199], [48463, 0.1], [49361, 0.1], [50339, 0.1], [52127, 0.1], [54386, 0.1], [55427, 0.1], [56129, 0.1], [56847, 0.1], [62787, 0.707107], [64131, 0.1], [66541, 0.1], [70761, 0.258199], [73185, 0.1], [75028, 0.258199], [79533, 0.258199], [85544, 0.1], [89150, 0.1], [93126, 0.1], [94710, 0.1], [97281, 0.1], [99297, 0.1], [99327, 0.1], [99633, 0.1], [112031, 0.258199], [115400, 0.1], [116279, 0.1], [120531, 0.1], [120748, 0.1], [123435, 0.258199], [123709, 0.1], [126471, 0.1], [127366, 0.1], [131796, 0.1], [131803, 0.1], [135031, 0.1], [136665, 0.1], [136763, 0.258199], [139772, 0.1], [140111, 0.1], [142593, 0.1], [146710, 0.1], [149328, 0.1], [150383, 0.1], [150742, 0.1], [150968, 0.1], [151648, 0.258199], [154324, 0.1], [156544, 0.1], [158993, 0.1], [159610, 0.1], [162085, 0.1], [163843, 0.1], [171273, 0.1], [171354, 0.1], [171533, 0.258199], [173472, 0.1], [173596, 0.1], [173836, 0.1], [174196, 0.1], [174879, 0.1], [175045, 0.1], [176836, 0.1], [183878, 0.1], [183999, 0.1], [185909, 0.1], [189931, 0.1], [190819, 0.1], [191977, 0.1], [194941, 0.1], [197420, 0.258199], [198321, 0.1], [198608, 0.1], [199723, 0.1], [200545, 0.1], [208237, 0.1], [208768, 0.1], [209779, 0.1], [218691, 0.1], [223314, 0.1], [224336, 0.1], [228868, 0.1], [234541, 0.1], [236876, 0.1], [237870, 0.1], [237943, 0.1], [240542, 0.258199], [243481, 0.1], [248361, 0.1], [250905, 0.1], [254384, 0.1], [260320, 0.1]], "top": [["find", 0.8091757713684017], ["ls", 0.18914650791370446], ["fileinfo", 0.0005084921614280134]]}, {"model": "intent:find", "f": [[1997, 0.1], [3918, 0.1], [5058, 0.1], [5964, 0.1], [8099, 0.258199], [10299, 0.1], [15140, 0.258199], [15226, 0.1], [16032, 0.1], [17130, 0.1], [19315, 0.258199], [20963, 0.1], [21534, 0.1], [23797, 0.1], [24123, 0.707107], [26032, 0.1], [27265, 0.1], [27313, 0.1], [28479, 0.1], [29950, 0.1], [33408, 0.1], [34477, 0.1], [36030, 0.258199], [36159, 0.1], [43218, 0.1], [46258, 0.258199], [48463, 0.1], [49361, 0.1], [50339, 0.1], [52127, 0.1], [54386, 0.1], [55427, 0.1], [56129, 0.1], [56847, 0.1], [62787, 0.707107], [64131, 0.1], [66541, 0.1], [70761, 0.258199], [73185, 0.1], [75028, 0.258199], [79533, 0.258199], [85544, 0.1], [89150, 0.1], [93126, 0.1], [94710, 0.1], [97281, 0.1], [99297, 0.1], [99327, 0.1], [99633, 0.1], [112031, 0.258199], [115400, 0.1], [116279, 0.1], [120531, 0.1], [120748, 0.1], [123435, 0.258199], [123709, 0.1], [126471, 0.1], [127366, 0.1], [131796, 0.1], [131803, 0.1], [135031, 0.1], [136665, 0.1], [136763, 0.258199], [139772, 0.1], [140111, 0.1], [142593, 0.1], [146710, 0.1], [149328, 0.1], [150383, 0.1], [150742, 0.1], [150968, 0.1], [151648, 0.258199], [154324, 0.1], [156544, 0.1], [158993, 0.1], [159610, 0.1], [162085, 0.1], [163843, 0.1], [171273, 0.1], [171354, 0.1], [171533, 0.258199], [173472, 0.1], [173596, 0.1], [173836, 0.1], [174196, 0.1], [174879, 0.1], [175045, 0.1], [176836, 0.1], [183878, 0.1], [183999, 0.1], [185909, 0.1], [189931, 0.1], [190819, 0.1], [191977, 0.1], [194941, 0.1], [197420, 0.258199], [198321, 0.1], [198608, 0.1], [199723, 0.1], [200545, 0.1], [208237, 0.1], [208768, 0.1], [209779, 0.1], [218691, 0.1], [223314, 0.1], [224336, 0.1], [228868, 0.1], [234541, 0.1], [236876, 0.1], [237870, 0.1], [237943, 0.1], [240542, 0.258199], [243481, 0.1], [248361, 0.1], [250905, 0.1], [254384, 0.1], [260320, 0.1]], "top": [["hidden_files", 0.9987040150313304], ["empty_files", 0.000289541296694116]]}, {"model": "tool", "f": [[2301, 0.140028], [4376, 0.140028], [15825, 0.140028], [16377, 0.140028], [23705, 0.140028], [23837, 0.140028], [24097, 0.140028], [32974, 0.140028], [37306, 0.140028], [43143, 0.140028], [47591, 0.140028], [48561, 0.140028], [53095, 0.140028], [57315, 0.140028], [58078, 0.140028], [58745, 0.140028], [61293, 0.140028], [61948, 0.140028], [62418, 0.140028], [68083, 0.140028], [69271, 0.377964], [75880, 0.140028], [87514, 0.140028], [90027, 0.140028], [92700, 0.377964], [92787, 0.140028], [98915, 0.140028], [99235, 0.140028], [102991, 0.140028], [104653, 0.140028], [112800, 0.377964], [113521, 0.140028], [115084, 0.140028], [121555, 0.140028], [122379, 0.140028], [123011, 0.140028], [124373, 0.140028], [125585, 0.140028], [125620, 0.140028], [129133, 0.140028], [132921, 0.140028], [137602, 0.140028], [158087, 0.377964], [164101, 0.140028], [164285, 0.377964], [168493, 0.377964], [179075, 0.140028], [182533, 0.140028], [194218, 0.140028], [201074, 0.140028], [201770, 0.140028], [202391, 0.140028], [214007, 0.140028], [220075, 0.707107], [223304, 0.140028], [226074, 0.140028], [240777, 0.140028], [245253, 0.377964], [252436, 0.140028], [260215, 0.707107]], "top": [["cli", 0.9991701977739371], ["pkg", 0.00017598969319085724], ["which", 0.00016811686678046658]]}, {"model": "intent:cli", "f": [[2301, 0.140028], [4376, 0.140028], [15825, 0.140028], [16377, 0.140028], [23705, 0.140028], [23837, 0.140028], [24097, 0.140028], [32974, 0.140028], [37306, 0.140028], [43143, 0.140028], [47591, 0.140028], [48561, 0.140028], [53095, 0.140028], [57315, 0.140028], [58078, 0.140028], [58745, 0.140028], [61293, 0.140028], [61948, 0.140028], [62418, 0.140028], [68083, 0.140028], [69271, 0.377964], [75880, 0.140028], [87514, 0.140028], [90027, 0.140028], [92700, 0.377964], [92787, 0.140028], [98915, 0.140028], [99235, 0.140028], [102991, 0.140028], [104653, 0.140028], [112800, 0.377964], [113521, 0.140028], [115084, 0.140028], [121555, 0.140028], [122379, 0.140028], [123011, 0.140028], [124373, 0.140028], [125585, 0.140028], [125620, 0.140028], [129133, 0.140028], [132921, 0.140028], [137602, 0.140028], [158087, 0.377964], [164101, 0.140028], [164285, 0.377964], [168493, 0.377964], [179075, 0.140028], [182533, 0.140028], [194218, 0.140028], [201074, 0.140028], [201770, 0.140028], [202391, 0.140028], [214007, 0.140028], [220075, 0.707107], [223304, 0.140028], [226074, 0.140028], [240777, 0.140028], [245253, 0.377964], [252436, 0.140028], [260215, 0.707107]], "top": [["tool_version", 0.9951859596937612], ["cli_help", 0.00481404030623888]]}, {"model": "tool", "f": [[2301, 0.117851], [3924, 0.117851], [4088, 0.117851], [6123, 0.117851], [9580, 0.258199], [11532, 0.117851], [11972, 0.117851], [14191, 0.117851], [16377, 0.117851], [19754, 0.117851], [21321, 0.117851], [26370, 0.117851], [30889, 0.117851], [32219, 0.117851], [32482, 0.117851], [34351, 0.117851], [36476, 0.258199], [48400, 0.117851], [49746, 0.258199], [50500, 0.117851], [51611, 0.117851], [53841, 0.117851], [54758, 0.117851], [56107, 0.117851], [56984, 0.258199], [57315, 0.117851], [67709, 0.117851], [69271, 0.258199], [70397, 0.117851], [80309, 0.117851], [85309, 0.117851], [86103, 0.117851], [88012, 0.117851], [94589, 0.117851], [95078, 0.258199], [96972, 0.117851], [98064, 0.117851], [98398, 0.117851], [108869, 0.117851], [111453, 0.117851], [114603, 0.117851], [117741, 0.117851], [119122, 0.117851], [119647, 0.258199], [121555, 0.117851], [125051, 0.258199], [126013, 0.117851], [127521, 0.117851], [128975, 0.117851], [132348, 0.117851], [132467, 0.117851], [155629, 0.117851], [156709, 0.258199], [161843, 0.258199], [163610, 0.117851], [167137, 0.117851], [170538, 0.117851], [179308, 0.117851], [180441, 0.117851], [182411, 0.258199], [198682, 0.117851], [198971, 0.117851], [199069, 0.117851], [199773, 0.117851], [200731, 0.117851], [201053, 0.117851], [206321, 0.117851], [210240, 0.258199], [211088, 0.117851], [212217, 0.117851], [213082, 0.707107], [217141, 0.117851], [219811, 0.258199], [222499, 0.117851], [226663, 0.258199], [227621, 0.117851], [229889, 0.707107], [230614, 0.117851], [232269, 0.117851], [232294, 0.117851], [238647, 0.117851], [240777, 0.117851], [241565, 0.117851], [250087, 0.117851], [252033, 0.117851], [252436, 0.117851], [253888, 0.117851], [259302, 0.117851], [261133, 0.258199]], "top": [["wrangler", 0.9874249205342581], ["env", 0.011667730341768358], ["chown", 9.206839232356845e-05]]}, {"model": "intent:wrangler", "f": [[2301, 0.117851], [3924, 0.117851], [4088, 0.117851], [6123, 0.117851], [9580, 0.258199], [11532, 0.117851], [11972, 0.117851], [14191, 0.117851], [16377, 0.117851], [19754, 0.117851], [21321, 0.117851], [26370, 0.117851], [30889, 0.117851], [32219, 0.117851], [32482, 0.117851], [34351, 0.117851], [36476, 0.258199], [48400, 0.117851], [49746, 0.258199], [50500, 0.117851], [51611, 0.117851], [53841, 0.117851], [54758, 0.117851], [56107, 0.117851], [56984, 0.258199], [57315, 0.117851], [67709, 0.117851], [69271, 0.258199], [70397, 0.117851], [80309, 0.117851], [85309, 0.117851], [86103, 0.117851], [88012, 0.117851], [94589, 0.117851], [95078, 0.258199], [96972, 0.117851], [98064, 0.117851], [98398, 0.117851], [108869, 0.117851], [111453, 0.117851], [114603, 0.117851], [117741, 0.117851], [119122, 0.117851], [119647, 0.258199], [121555, 0.117851], [125051, 0.258199], [126013, 0.117851], [127521, 0.117851], [128975, 0.117851], [132348, 0.117851], [132467, 0.117851], [155629, 0.117851], [156709, 0.258199], [161843, 0.258199], [163610, 0.117851], [167137, 0.117851], [170538, 0.117851], [179308, 0.117851], [180441, 0.117851], [182411, 0.258199], [198682, 0.117851], [198971, 0.117851], [199069, 0.117851], [199773, 0.117851], [200731, 0.117851], [201053, 0.117851], [206321, 0.117851], [210240, 0.258199], [211088, 0.117851], [212217, 0.117851], [213082, 0.707107], [217141, 0.117851], [219811, 0.258199], [222499, 0.117851], [226663, 0.258199], [227621, 0.117851], [229889, 0.707107], [230614, 0.117851], [232269, 0.117851], [232294, 0.117851], [238647, 0.117851], [240777, 0.117851], [241565, 0.117851], [250087, 0.117851], [252033, 0.117851], [252436, 0.117851], [253888, 0.117851], [259302, 0.117851], [261133, 0.258199]], "top": [["wrangler_secret_put", 0.9962872373810052], ["wrangler_dev", 0.0018272445401419188]]}, {"model": "tool", "f": [[2139, 0.138675], [2508, 0.138675], [7918, 0.138675], [13662, 0.138675], [16114, 0.138675], [18286, 0.138675], [18936, 0.138675], [24123, 0.707107], [30708, 0.138675], [42634, 0.138675], [58072, 0.138675], [61066, 0.333333], [61568, 0.138675], [62787, 0.707107], [68343, 0.472008], [78592, 0.138675], [80697, 0.138675], [83844, 0.138675], [84265, 0.138675], [86119, 0.138675], [89221, 0.138675], [96956, 0.333333], [97780, 0.138675], [98298, 0.138675], [106449, 0.333333], [109998, 0.333333], [111072, 0.138675], [117560, 0.138675], [121564, 0.138675], [123168, 0.138675], [127599, 0.138675], [127770, 0.138675], [130745, 0.138675], [144000, 0.138675], [150735, 0.138675], [155242, 0.138675], [156838, 0.138675], [168567, 0.333333], [168938, 0.138675], [174418, 0.138675], [175123, 0.333333], [175732, 0.333333], [182702, 0.138675], [189293, 0.138675], [189484, 0.138675], [199223, 0.138675], [211269, 0.27735], [212970, 0.138675], [215690, 0.138675], [216453, 0.138675], [217666, 0.138675], [218052, 0.138675], [237036, 0.138675], [238596, 0.138675], [245600, 0.333333], [247769, 0.138675], [249354, 0.138675], [251585, 0.138675], [253085, 0.138675]], "top": [["gh", 0.9999919628037341], ["npm", 9.842572068909739e-07], ["pkg", 9.111635457035571e-07]]}, {"model": "intent:gh", "f": [[2139, 0.138675], [2508, 0.138675], [7918, 0.138675], [13662, 0.138675], [16114, 0.138675], [18286, 0.138675], [18936, 0.138675], [24123, 0.707107], [30708, 0.138675], [42634, 0.138675], [58072, 0.138675], [61066, 0.333333], [61568, 0.138675], [62787, 0.707107], [68343, 0.472008], [78592, 0.138675], [80697, 0.138675], [83844, 0.138675], [84265, 0.138675], [86119, 0.138675], [89221, 0.138675], [96956, 0.333333], [97780, 0.138675], [98298, 0.138675], [106449, 0.333333], [109998, 0.333333], [111072, 0.138675], [117560, 0.138675], [121564, 0.138675], [123168, 0.138675], [127599, 0.138675], [127770, 0.138675], [130745, 0.138675], [144000, 0.138675], [150735, 0.138675], [155242, 0.138675], [156838, 0.138675], [168567, 0.333333], [168938, 0.138675], [174418, 0.138675], [175123, 0.333333], [175732, 0.333333], [182702, 0.138675], [189293, 0.138675], [189484, 0.138675], [199223, 0.138675], [211269, 0.27735], [212970, 0.138675], [215690, 0.138675], [216453, 0.138675], [217666, 0.138675], [218052, 0.138675], [237036, 0.138675], [238596, 0.138675], [245600, 0.333333], [247769, 0.138675], [249354, 0.138675], [251585, 0.138675], [253085, 0.138675]], "top": [["gh_pr_merge", 0.9985886045871499], ["gh_pr_view", 0.0011781816650413902]]}, {"model": "tool", "f": [[179, 0.174078], [4412, 0.174078], [5964, 0.174078], [20040, 0.174078], [24123, 0.707107], [33945, 0.174078], [37687, 0.174078], [39304, 0.174078], [57092, 0.174078], [60547, 0.174078], [62787, 0.707107], [69369, 0.174078], [90314, 0.174078], [96329, 0.174078], [99327, 0.174078], [102372, 0.174078], [110401, 0.174078], [120748, 0.174078], [120751, 0.174078], [126301, 0.377964], [130849, 0.174078], [130865, 0.377964], [131770, 0.174078], [137326, 0.174078], [139772, 0.174078], [140872, 0.174078], [150383, 0.174078], [151908, 0.174078], [173836, 0.174078], [175968, 0.174078], [178296, 0.377964], [178368, 0.377964], [191158, 0.377964], [203970, 0.174078], [205264, 0.377964], [210963, 0.174078], [211217, 0.174078], [224080, 0.174078], [224696, 0.174078], [233566, 0.174078], [259831, 0.377964], [260161, 0.174078]], "top": [["rm", 0.998432750227242], ["touch", 0.0005517345063693402], ["tail", 0.000288902824033755]]}, {"model": "intent:rm", "f": [[179, 0.174078], [4412, 0.174078], [5964, 0.174078], [20040, 0.174078], [24123, 0.707107], [33945, 0.174078], [37687, 0.174078], [39304, 0.174078], [57092, 0.174078], [60547, 0.174078], [62787, 0.707107], [69369, 0.174078], [90314, 0.174078], [96329, 0.174078], [99327, 0.174078], [102372, 0.174078], [110401, 0.174078], [120748, 0.174078], [120751, 0.174078], [126301, 0.377964], [130849, 0.174078], [130865, 0.377964], [131770, 0.174078], [137326, 0.174078], [139772, 0.174078], [140872, 0.174078], [150383, 0.174078], [151908, 0.174078], [173836, 0.174078], [175968, 0.174078], [178296, 0.377964], [178368, 0.377964], [191158, 0.377964], [203970, 0.174078], [205264, 0.377964], [210963, 0.174078], [211217, 0.174078], [224080, 0.174078], [224696, 0.174078], [233566, 0.174078], [259831, 0.377964], [260161, 0.174078]], "top": [["delete_file", 0.9994127522112204], ["delete_dir", 0.0005872477887795813]]}, {"model": "tool", "f": [[5967, 0.13484], [20451, 0.301511], [21299, 0.13484], [22217, 0.13484], [23857, 0.13484], [24123, 0.707107], [27256, 0.13484], [37672, 0.13484], [37832, 0.13484], [42752, 0.13484], [48597, 0.13484], [53469, 0.13484], [62787, 0.707107], [70392, 0.301511], [70761, 0.301511], [72992, 0.13484], [78697, 0.301511], [79044, 0.13484], [79086, 0.13484], [84455, 0.301511], [90027, 0.13484], [90561, 0.13484], [92113, 0.13484], [93995, 0.13484], [94405, 0.13484], [103380, 0.13484], [109113, 0.13484], [110948, 0.301511], [113449, 0.13484], [120751, 0.13484], [122799, 0.13484], [126639, 0.13484], [127248, 0.13484], [127517, 0.301511], [131803, 0.13484], [149468, 0.13484], [149511, 0.13484], [153945, 0.13484], [156207, 0.301511], [160552, 0.13484], [165808, 0.13484], [170251, 0.13484], [170621, 0.13484], [172224, 0.13484], [177278, 0.301511], [181595, 0.13484], [187258, 0.13484], [190452, 0.301511], [190462, 0.13484], [191292, 0.13484], [193808, 0.13484], [195964, 0.13484], [197047, 0.13484], [197314, 0.13484], [202997, 0.13484], [204465, 0.13484], [212319, 0.13484], [215806, 0.13484], [222432, 0.13484], [237943, 0.13484], [244042, 0.13484], [244883, 0.13484], [251203, 0.301511], [256534, 0.13484], [256961, 0.13484], [258630, 0.13484], [260752, 0.13484], [261728, 0.13484]], "top": [["docker", 0.9999875017026577], ["find", 2.247433549944673e-06], ["npm", 2.2386192971238117e-06]]}, {"model": "intent:docker", "f": [[5967, 0.13484], [20451, 0.301511], [21299, 0.13484], [22217, 0.13484], [23857, 0.13484], [24123, 0.707107], [27256, 0.13484], [37672, 0.13484], [37832, 0.13484], [42752, 0.13484], [48597, 0.13484], [53469, 0.13484], [62787, 0.707107], [70392, 0.301511], [70761, 0.301511], [72992, 0.13484], [78697, 0.301511], [79044, 0.13484], [79086, 0.13484], [84455, 0.301511], [90027, 0.13484], [90561, 0.13484], [92113, 0.13484], [93995, 0.13484], [94405, 0.13484], [103380, 0.13484], [109113, 0.13484], [110948, 0.301511], [113449, 0.13484], [120751, 0.13484], [122799, 0.13484], [126639, 0.13484], [127248, 0.13484], [127517, 0.301511], [131803, 0.13484], [149468, 0.13484], [149511, 0.13484], [153945, 0.13484], [156207, 0.301511], [160552, 0.13484], [165808, 0.13484], [170251, 0.13484], [170621, 0.13484], [172224, 0.13484], [177278, 0.301511], [181595, 0.13484], [187258, 0.13484], [190452, 0.301511], [190462, 0.13484], [191292, 0.13484], [193808, 0.13484], [195964, 0.13484], [197047, 0.13484], [197314, 0.13484], [202997, 0.13484], [204465, 0.13484], [212319, 0.13484], [215806, 0.13484], [222432, 0.13484], [237943, 0.13484], [244042, 0.13484], [244883, 0.13484], [251203, 0.301511], [256534, 0.13484], [256961, 0.13484], [258630, 0.13484], [260752, 0.13484], [261728, 0.13484]], "top": [["docker_exec", 0.9833897859598458], ["docker_ps", 0.009161353341843717]]}, {"model": "tool", "f": [[499, 0.078326], [649, 0.078326], [1283, 0.078326], [4863, 0.078326], [5933, 0.078326], [5964, 0.078326], [7612, 0.078326], [8659, 0.078326], [9295, 0.078326], [12014, 0.078326], [14112, 0.078326], [16547, 0.078326], [17130, 0.078326], [17166, 0.078326], [18142, 0.078326], [18361, 0.078326], [19243, 0.078326], [20757, 0.078326], [20970, 0.078326], [23878, 0.078326], [27673, 0.078326], [29918, 0.078326], [31933, 0.078326], [33038, 0.078326], [33622, 0.078326], [34464, 0.078326], [35806, 0.229416], [37242, 0.078326], [37583, 0.078326], [41910, 0.078326], [42275, 0.229416], [42584, 0.078326], [49361, 0.078326], [49585, 0.229416], [50250, 0.078326], [53163, 0.078326], [54390, 0.229416], [55502, 0.078326], [56129, 0.078326], [57493, 0.078326], [59346, 0.078326], [59750, 0.078326], [61298, 0.078326], [61310, 0.078326], [62322, 0.078326], [64147, 0.078326], [67337, 0.078326], [67449, 0.078326], [70623, 0.078326], [71911, 0.078326], [73185, 0.078326], [73558, 0.078326], [78564, 0.078326], [79533, 0.229416], [85702, 0.078326], [89624, 0.078326], [90329, 0.078326], [90702, 0.078326], [92647, 0.229416], [94111, 0.078326], [96755, 0.078326], [96883, 0.078326], [97962, 0.078326], [99297, 0.078326], [99327, 0.078326], [99749, 0.078326], [101264, 0.078326], [103454, 0.078326], [103990, 0.156652], [108042, 0.078326], [110118, 0.078326], [110281, 0.078326], [111838, 0.078326], [113560, 0.078326], [114620, 0.229416], [114704, 0.078326], [115371, 0.078326], [115850, 0.078326], [116316, 0.078326], [118086, 0.078326], [118186, 0.229416], [120531, 0.078326], [120748, 0.078326], [123202, 0.078326], [127075, 0.078326], [127366, 0.078326], [128946, 0.078326], [131397, 0.078326], [131785, 0.078326], [132041, 0.078326], [139181, 0.229416], [139358, 0.078326], [139772, 0.078326], [141719, 0.078326], [142113, 0.078326], [142593, 0.078326], [143481, 0.078326], [144983, 0.078326], [149929, 0.078326], [150383, 0.078326], [155000, 0.078326], [159427, 0.078326], [160191, 0.078326], [161136, 0.229416], [162085, 0.078326], [162584, 0.229416], [162881, 0.078326], [163630, 0.078326], [164078, 0.078326], [166261, 0.078326], [166519, 0.078326], [167343, 0.229416], [168065, 0.078326], [169081, 0.078326], [169216, 0.078326], [170287, 0.078326], [171354, 0.078326], [173836, 0.078326], [174073, 0.078326], [175045, 0.156652], [184670, 0.078326], [186264, 0.078326], [186783, 0.229416], [187218, 0.078326], [190893, 0.078326], [191977, 0.078326], [192476, 0.078326], [193181, 0.078326], [193218, 0.078326], [193687, 0.078326], [194491, 0.078326], [201026, 0.078326], [201074, 0.078326], [201503, 0.078326], [202645, 0.078326], [202797, 0.229416], [206179, 0.078326], [207091, 0.078326], [210267, 0.078326], [211121, 0.078326], [211170, 0.229416], [211724, 0.078326], [211979, 0.078326], [212305, 0.078326], [213542, 0.078326], [215431, 0.078326], [216451, 0.078326], [218422, 0.078326], [219125, 0.078326], [220075, 0.707107], [221153, 0.078326], [222417, 0.229416], [222701, 0.229416], [222746, 0.229416], [223314, 0.078326], [225202, 0.078326], [226425, 0.078326], [226612, 0.078326], [227164, 0.078326], [227672, 0.078326], [233042, 0.078326], [234098, 0.078326], [238184, 0.078326], [239921, 0.078326], [240160, 0.078326], [240786, 0.078326], [241624, 0.078326], [242649, 0.078326], [245447, 0.078326], [245902, 0.078326], [246391, 0.078326], [247541, 0.078326], [251067, 0.078326], [251085, 0.229416], [255002, 0.078326], [258292, 0.078326], [258943, 0.078326], [260215, 0.707107]], "top": [["diff", 0.979714401438199], ["find", 0.010636983853264061], ["grep", 0.0036361485201743516]]}, {"model": "tool", "f": [[4, 0.068199], [1718, 0.068199], [2301, 0.136399], [5106, 0.068199], [5427, 0.068199], [5537, 0.068199], [7092, 0.156174], [7601, 0.156174], [8196, 0.068199], [9467, 0.156174], [9801, 0.068199], [9989, 0.068199], [12381, 0.068199], [14163, 0.068199], [14177, 0.068199], [14368, 0.156174], [15396, 0.156174], [15825, 0.068199], [16377, 0.136399], [17114, 0.068199], [17217, 0.068199], [20567, 0.068199], [21493, 0.068199], [21623, 0.068199], [24097, 0.068199], [24849, 0.068199], [25396, 0.068199], [25888, 0.068199], [26241, 0.068199], [26694, 0.068199], [27799, 0.068199], [28181, 0.156174], [28244, 0.156174], [28779, 0.068199], [29260, 0.068199], [29836, 0.156174], [30539, 0.068199], [31418, 0.068199], [31598, 0.156174], [31933, 0.068199], [32285, 0.068199], [32312, 0.068199], [32974, 0.068199], [33526, 0.068199], [34470, 0.156174], [35223, 0.068199], [35501, 0.156174], [39383, 0.068199], [41600, 0.068199], [42562, 0.068199], [43429, 0.068199], [44161, 0.068199], [45136, 0.068199], [50705, 0.068199], [52098, 0.068199], [52718, 0.068199], [55271, 0.068199], [55433, 0.068199], [56444, 0.068199], [56465, 0.068199], [57315, 0.136399], [57316, 0.068199], [58890, 0.068199], [61048, 0.068199], [61948, 0.068199], [62503, 0.068199], [62787, 0.707107], [64263, 0.068199], [64368, 0.068199], [65086, 0.156174], [65119, 0.156174], [65226, 0.068199], [66598, 0.068199], [67002, 0.068199], [69013, 0.068199], [69271, 0.312348], [69817, 0.068199], [70155, 0.068199], [70175, 0.068199], [76790, 0.156174], [78443, 0.068199], [78786, 0.068199], [83163, 0.156174], [83712, 0.068199], [85817, 0.068199], [89494, 0.136399], [89624, 0.068199], [89826, 0.068199], [89846, 0.068199], [90027, 0.068199], [92777, 0.068199], [92998, 0.068199], [93360, 0.156174], [93999, 0.068199], [96571, 0.068199], [97586, 0.068199], [97921, 0.068199], [98127, 0.068199], [98609, 0.068199], [98915, 0.068199], [99568, 0.068199], [100125, 0.068199], [101439, 0.068199], [104695, 0.068199], [105775, 0.068199], [105846, 0.156174], [106407, 0.068199], [107905, 0.068199], [110536, 0.068199], [112969, 0.068199], [114647, 0.068199], [115084, 0.068199], [116124, 0.156174], [116609, 0.068199], [119086, 0.068199], [120005, 0.156174], [120342, 0.156174], [120751, 0.068199], [121166, 0.068199], [121363, 0.068199], [121555, 0.136399], [121983, 0.068199], [122368, 0.068199], [122559, 0.068199], [122789, 0.068199], [124588, 0.068199], [126113, 0.156174], [126564, 0.068199], [127074, 0.068199], [128572, 0.068199], [129260, 0.068199], [130229, 0.068199], [130420, 0.068199], [131803, 0.068199], [132461, 0.068199], [132555, 0.156174], [133011, 0.068199], [135033, 0.068199], [138208, 0.156174], [143742, 0.068199], [144153, 0.068199], [147101, 0.068199], [148192, 0.068199], [148811, 0.068199], [149019, 0.156174], [153459, 0.068199], [153655, 0.068199], [153663, 0.156174], [155854, 0.156174], [156044, 0.136399], [159600, 0.068199], [160191, 0.068199], [163784, 0.068199], [164285, 0.156174], [166319, 0.068199], [166534, 0.068199], [166611, 0.156174], [166671, 0.068199], [167530, 0.068199], [168532, 0.068199], [168534, 0.068199], [168739, 0.068199], [168775, 0.068199], [168838, 0.068199], [171483, 0.068199], [177790, 0.068199], [178752, 0.068199], [178814, 0.068199], [182171, 0.068199], [183619, 0.068199], [184060, 0.068199], [190978, 0.068199], [192277, 0.068199], [192330, 0.068199], [194218, 0.068199], [194400, 0.068199], [196264, 0.068199], [197335, 0.068199], [198971, 0.068199], [201074, 0.068199], [201541, 0.068199], [206101, 0.156174], [208670, 0.068199], [210063, 0.068199], [211121, 0.068199], [212155, 0.156174], [212885, 0.068199], [214169, 0.156174], [215403, 0.068199], [215647, 0.068199], [217255, 0.068199], [218115, 0.068199], [218438, 0.156174], [220231, 0.068199], [221020, 0.156174], [221690, 0.068199], [223756, 0.068199], [223824, 0.156174], [223907, 0.068199], [225096, 0.068199], [229622, 0.068199], [229922, 0.068199], [230491, 0.068199], [232791, 0.068199], [234566, 0.068199], [234701, 0.068199], [236801, 0.068199], [237296, 0.068199], [240777, 0.136399], [241253, 0.068199], [241371, 0.156174], [242649, 0.068199], [243455, 0.068199], [244445, 0.068199], [245689, 0.068199], [245901, 0.068199], [247008, 0.068199], [250253, 0.068199], [250893, 0.068199], [252033, 0.068199], [252436, 0.136399], [252936, 0.068199], [253938, 0.068199], [254025, 0.068199], [255802, 0.068199], [256310, 0.068199], [257134, 0.068199], [259997, 0.156174], [260215, 0.707107], [260220, 0.068199], [260262, 0.156174]], "top": [["du", 0.9275140335077166], ["find", 0.046064774183755236], ["ls", 0.010704050181764683]]}, {"model": "intent:du", "f": [[4, 0.068199], [1718, 0.068199], [2301, 0.136399], [5106, 0.068199], [5427, 0.068199], [5537, 0.068199], [7092, 0.156174], [7601, 0.156174], [8196, 0.068199], [9467, 0.156174], [9801, 0.068199], [9989, 0.068199], [12381, 0.068199], [14163, 0.068199], [14177, 0.068199], [14368, 0.156174], [15396, 0.156174], [15825, 0.068199], [16377, 0.136399], [17114, 0.068199], [17217, 0.068199], [20567, 0.068199], [21493, 0.068199], [21623, 0.068199], [24097, 0.068199], [24849, 0.068199], [25396, 0.068199], [25888, 0.068199], [26241, 0.068199], [26694, 0.068199], [27799, 0.068199], [28181, 0.156174], [28244, 0.156174], [28779, 0.068199], [29260, 0.068199], [29836, 0.156174], [30539, 0.068199], [31418, 0.068199], [31598, 0.156174], [31933, 0.068199], [32285, 0.068199], [32312, 0.068199], [32974, 0.068199], [33526, 0.068199], [34470, 0.156174], [35223, 0.068199], [35501, 0.156174], [39383, 0.068199], [41600, 0.068199], [42562, 0.068199], [43429, 0.068199], [44161, 0.068199], [45136, 0.068199], [50705, 0.068199], [52098, 0.068199], [52718, 0.068199], [55271, 0.068199], [55433, 0.068199], [56444, 0.068199], [56465, 0.068199], [57315, 0.136399], [57316, 0.068199], [58890, 0.068199], [61048, 0.068199], [61948, 0.068199], [62503, 0.068199], [62787, 0.707107], [64263, 0.068199], [64368, 0.068199], [65086, 0.156174], [65119, 0.156174], [65226, 0.068199], [66598, 0.068199], [67002, 0.068199], [69013, 0.068199], [69271, 0.312348], [69817, 0.068199], [70155, 0.068199], [70175, 0.068199], [76790, 0.156174], [78443, 0.068199], [78786, 0.068199], [83163, 0.156174], [83712, 0.068199], [85817, 0.068199], [89494, 0.136399], [89624, 0.068199], [89826, 0.068199], [89846, 0.068199], [90027, 0.068199], [92777, 0.068199], [92998, 0.068199], [93360, 0.156174], [93999, 0.068199], [96571, 0.068199], [97586, 0.068199], [97921, 0.068199], [98127, 0.068199], [98609, 0.068199], [98915, 0.068199], [99568, 0.068199], [100125, 0.068199], [101439, 0.068199], [104695, 0.068199], [105775, 0.068199], [105846, 0.156174], [106407, 0.068199], [107905, 0.068199], [110536, 0.068199], [112969, 0.068199], [114647, 0.068199], [115084, 0.068199], [116124, 0.156174], [116609, 0.068199], [119086, 0.068199], [120005, 0.156174], [120342, 0.156174], [120751, 0.068199], [121166, 0.068199], [121363, 0.068199], [121555, 0.136399], [121983, 0.068199], [122368, 0.068199], [122559, 0.068199], [122789, 0.068199], [124588, 0.068199], [126113, 0.156174], [126564, 0.068199], [127074, 0.068199], [128572, 0.068199], [129260, 0.068199], [130229, 0.068199], [130420, 0.068199], [131803, 0.068199], [132461, 0.068199], [132555, 0.156174], [133011, 0.068199], [135033, 0.068199], [138208, 0.156174], [143742, 0.068199], [144153, 0.068199], [147101, 0.068199], [148192, 0.068199], [148811, 0.068199], [149019, 0.156174], [153459, 0.068199], [153655, 0.068199], [153663, 0.156174], [155854, 0.156174], [156044, 0.136399], [159600, 0.068199], [160191, 0.068199], [163784, 0.068199], [164285, 0.156174], [166319, 0.068199], [166534, 0.068199], [166611, 0.156174], [166671, 0.068199], [167530, 0.068199], [168532, 0.068199], [168534, 0.068199], [168739, 0.068199], [168775, 0.068199], [168838, 0.068199], [171483, 0.068199], [177790, 0.068199], [178752, 0.068199], [178814, 0.068199], [182171, 0.068199], [183619, 0.068199], [184060, 0.068199], [190978, 0.068199], [192277, 0.068199], [192330, 0.068199], [194218, 0.068199], [194400, 0.068199], [196264, 0.068199], [197335, 0.068199], [198971, 0.068199], [201074, 0.068199], [201541, 0.068199], [206101, 0.156174], [208670, 0.068199], [210063, 0.068199], [211121, 0.068199], [212155, 0.156174], [212885, 0.068199], [214169, 0.156174], [215403, 0.068199], [215647, 0.068199], [217255, 0.068199], [218115, 0.068199], [218438, 0.156174], [220231, 0.068199], [221020, 0.156174], [221690, 0.068199], [223756, 0.068199], [223824, 0.156174], [223907, 0.068199], [225096, 0.068199], [229622, 0.068199], [229922, 0.068199], [230491, 0.068199], [232791, 0.068199], [234566, 0.068199], [234701, 0.068199], [236801, 0.068199], [237296, 0.068199], [240777, 0.136399], [241253, 0.068199], [241371, 0.156174], [242649, 0.068199], [243455, 0.068199], [244445, 0.068199], [245689, 0.068199], [245901, 0.068199], [247008, 0.068199], [250253, 0.068199], [250893, 0.068199], [252033, 0.068199], [252436, 0.136399], [252936, 0.068199], [253938, 0.068199], [254025, 0.068199], [255802, 0.068199], [256310, 0.068199], [257134, 0.068199], [259997, 0.156174], [260215, 0.707107], [260220, 0.068199], [260262, 0.156174]], "top": [["dir_size", 0.9207957371548096], ["largest_dirs", 0.07920426284519054]]}], "tag": [{"f": [4509, 11749, 26724, 32868, 47261, 74777, 110776, 118101, 120897, 125301, 133251, 160594, 169974, 192921, 206195, 235592], "top": [["O", 0.9999634491663757], ["B-NUM", 2.322460802660483e-05]]}, {"f": [4509, 5827, 11749, 40949, 48576, 82952, 93162, 118762, 125301, 166401, 171626, 172771, 206195, 221879, 226718], "top": [["O", 0.99994827898035], ["B-NAME", 2.024741460723054e-05]]}, {"f": [4509, 11749, 47217, 64291, 86680, 86927, 93096, 93162, 113730, 116841, 120857, 156981, 188945, 206195, 240626, 262124], "top": [["O", 0.9999832502004864], ["B-PATH", 9.078170500155876e-06]]}, {"f": [4509, 11749, 57475, 73568, 98440, 103198, 119118, 120897, 125301, 180650, 183058, 188110, 192921, 205341, 206195, 235592], "top": [["O", 0.9999546849498829], ["B-NAME", 3.1381373489596194e-05]]}, {"f": [4509, 11749, 17548, 59319, 95515, 103241, 106315, 107729, 125301, 141678, 185810, 206195, 220209, 240566, 243084], "top": [["O", 0.9992395497873016], ["B-NAME", 0.0005206781584732745]]}, {"f": [4509, 11749, 33477, 53901, 136305, 136309, 149472, 177037, 187935, 206195, 207413, 244140, 255604, 256024, 259034], "top": [["O", 0.9153767950046618], ["B-PATH", 0.05802698658005951]]}, {"f": [4509, 11749, 27952, 82952, 97505, 101498, 120897, 125301, 135634, 148091, 168355, 192921, 206195, 219024, 235592, 251362], "top": [["O", 0.999810628202294], ["B-NAME", 7.366777232840334e-05]]}, {"f": [4509, 11749, 13723, 30938, 33350, 47217, 52351, 64291, 93096, 113730, 125301, 193301, 206195, 241585, 262124], "top": [["O", 0.9997545294838248], ["B-PATH", 0.00019611498235108375]]}, {"f": [4509, 11749, 37413, 42063, 69678, 85953, 97978, 118222, 139137, 154050, 181917, 197585, 206195, 254582, 259319], "top": [["O", 0.9999899004943715], ["B-NAME", 6.710745617243562e-06]]}, {"f": [11749, 26724, 34663, 50341, 74129, 82957, 118026, 120897, 125301, 131223, 177549, 206195, 207212, 215119, 233463, 235592], "top": [["O", 0.999906571279725], ["B-NUM", 8.05582029080563e-05]]}, {"f": [11749, 81548, 98755, 109116, 125301, 131223, 149263, 174879, 179244, 186716, 195125, 202496, 206195, 226755, 231665], "top": [["O", 0.9999836260049818], ["B-NAME", 8.57707136003153e-06]]}, {"f": [2072, 11749, 14774, 61737, 69735, 71918, 88261, 131223, 132178, 132812, 193064, 193299, 232895, 255037, 261594], "top": [["O", 0.9999956343468428], ["B-NAME", 1.9599195242245897e-06]]}, {"f": [11749, 17534, 64700, 65845, 82537, 101131, 113721, 114487, 120897, 125301, 200039, 206195, 234830, 235592, 242672, 250139], "top": [["O", 0.9999656068807381], ["B-NAME", 3.335469053762655e-05]]}, {"f": [11569, 11749, 36063, 46210, 55611, 64110, 72099, 93162, 97233, 125301, 158973, 163816, 206195, 232761, 242672, 254283, 254500], "top": [["B-NAME", 0.9959382624271907], ["O", 0.004059627407200303]]}, {"f": [11749, 25892, 59371, 92242, 93162, 103208, 107343, 116123, 120857, 121741, 122864, 161611, 177221, 188945, 206195, 242672], "top": [["O", 0.9944785847792437], ["B-NAME", 0.005466860844508082]]}, {"f": [11749, 29882, 42263, 54965, 94476, 120897, 124548, 125301, 148624, 164608, 204431, 206195, 216601, 217307, 235592, 261068], "top": [["O", 0.9999999471438986], ["B-NUM", 2.9369514106088053e-08]]}, {"f": [11749, 41381, 44090, 63442, 64069, 93162, 94476, 98691, 106087, 125301, 172601, 184270, 199565, 204834, 206195], "top": [["O", 0.9999997264404064], ["B-NAME", 9.209759816220308e-08]]}, {"f": [11749, 25111, 25394, 45729, 46105, 60190, 68651, 71404, 88191, 93162, 94476, 97610, 118469, 120857, 122404, 156302, 158839, 188945, 191333, 216094, 259777], "top": [["B-URL", 0.9999999991709685], ["O", 8.253536271729526e-10]]}, {"f": [5591, 5729, 11749, 24501, 95076, 118702, 120897, 125301, 191089, 191830, 195635, 205901, 206195, 235592, 246719, 255895], "top": [["O", 0.9999437528046944], ["B-NAME", 5.297556647591542e-05]]}, {"f": [11749, 53042, 53756, 76439, 111012, 118702, 125301, 141907, 149712, 151354, 204084, 206153, 206195, 210384, 230648], "top": [["O", 0.9999755612772496], ["B-NAME", 2.2727103389875902e-05]]}, {"f": [11749, 12870, 74602, 94642, 118702, 136460, 163499, 173698, 176600, 184292, 185888, 200696, 202002, 205439, 206195], "top": [["O", 0.999813493446977], ["B-NAME", 0.0001779132129612543]]}, {"f": [4692, 11749, 27780, 57261, 64280, 87498, 106549, 120897, 125301, 168916, 169572, 204938, 211953, 235592, 241340, 243048, 245216, 259777], "top": [["O", 0.9999833644717663], ["B-NUM", 6.681948722964585e-06]]}, {"f": [11749, 12166, 26485, 69532, 93162, 111166, 119302, 122613, 125301, 140617, 152830, 209696, 211953, 237130, 243048, 249618, 253954, 259777], "top": [["O", 0.9999822250597499], ["B-VAR", 1.1173710761096603e-05]]}, {"f": [11749, 29483, 41059, 75590, 78193, 93162, 97510, 107876, 120857, 139993, 162536, 185879, 188563, 188945, 221672, 243048], "top": [["O", 0.9993808244634057], ["B-PORT", 0.00043440905190978406]]}, {"f": [4509, 11749, 37747, 64291, 74137, 74777, 92642, 120897, 125301, 155314, 192921, 205056, 206195, 206206, 215092, 235592], "top": [["O", 0.9998537316715312], ["B-NAME", 7.027229665697609e-05]]}, {"f": [4509, 5134, 11749, 16270, 21593, 82952, 96203, 118460, 125301, 156388, 179243, 206195, 224594, 229283, 245919], "top": [["O", 0.997516020999613], ["B-EXT", 0.0014380311639239406]]}, {"f": [4509, 6856, 11749, 22063, 36433, 47217, 64291, 64540, 73986, 93096, 113730, 154598, 190459, 206195, 262124], "top": [["O", 0.9999858482711994], ["B-NAME", 7.229734488187527e-06]]}, {"f": [306, 11749, 17906, 52245, 81341, 83151, 116651, 120897, 125301, 154621, 155679, 188702, 206195, 207212, 235592, 246057], "top": [["O", 0.999764590862329], ["B-NUM", 0.00023404675985013495]]}, {"f": [9936, 11749, 29274, 35436, 81341, 81548, 98755, 125301, 149263, 153360, 201955, 202496, 206195, 228465, 230900], "top": [["O", 0.9999986993688589], ["B-NUM", 1.1299552926089392e-06]]}, {"f": [11749, 81341, 84924, 93162, 131613, 132178, 142199, 156385, 158812, 161338, 176109, 183553, 200102, 206195, 229094], "top": [["O", 0.9993705539906196], ["B-NUM", 0.0005383314871769986]]}]}

exec
/bin/bash -lc "nl -ba src/cli.js | sed -n '235,335p'; cat bin/tellsh.js; cat test/cli.test.js; sed -n '1,145p' test/regressions28.test.js" in /workspace/tellsh
 succeeded in 0ms:
   235	  if (opts.json) {
   236	    console.log(JSON.stringify(s, null, 2));
   237	    return s.understood ? 0 : 3;
   238	  }
   239	  if (!s.understood && s.context?.rule === 'refused') {
   240	    // a history reference that cannot be resolved safely: nothing to suggest
   241	    console.log(`Cannot resolve "${query}" from history: ${s.hint || s.context.note || 'not guessing'}.`);
   242	    console.log(C.dim('Name the target explicitly.'));
   243	    return 3;
   244	  }
   245	  if (!s.understood && s.hint && s.confidence >= s.threshold) {
   246	    // understood, but the only command the catalog has would contradict the request ("uninstall", "except 1234", "close pr")
   247	    console.log(`Not suggesting a command for "${query}": ${s.hint}.`);
   248	    return 3;
   249	  }
   250	  if (!s.understood) {
   251	    console.log(`I don't understand "${query}" (confidence ${(s.confidence * 100).toFixed(0)}% < ${(s.threshold * 100).toFixed(0)}%).`);
   252	    console.log('Did you mean:');
   253	    for (const c of s.candidates) console.log(`  - ${c.intent}: ${c.description} ${C.dim(`(${(c.p * 100).toFixed(1)}%)`)}`);
   254	    if (s.hint) console.log(C.dim(`hint: ${s.hint}`));
   255	    console.log(C.dim('Try rephrasing, or use --threshold to lower the bar.'));
   256	    return 3;
   257	  }
   258	  if (s.gap) {
   259	    console.log(`No ${s.shell} rendering for "${s.intent}" on ${s.os}: ${s.gap}.`);
   260	    console.log(C.dim(`Try --shell bash (or another shell) to see the command.`));
   261	    return 5;
   262	  }
   263	
   264	  printSuggestion(s, opts);
   265	  if (opts.dryRun) return 0;
   266	
   267	  const interactive = process.stdin.isTTY && process.stdout.isTTY;
   268	  const shellName = s.shell;
   269	  if (opts.yes) {
   270	    const fromHistory = Object.values(s.slotSources || {}).includes('history');
   271	    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog' || fromHistory || s.hybrid?.deferred) {
   272	      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' || fromHistory ? 'resolved from history' : s.missing.length ? 'incomplete' : s.hybrid?.deferred ? 're-ranked by the neural fallback' : s.risk;
   273	      console.log(C.yellow(`  --yes only auto-runs safe catalog commands; this one is ${why}. Not running.`));
   274	      return 4;
   275	    }
   276	    return runShell(s.command, shellName);
   277	  }
   278	  if (!interactive) return 0; // print-only when piped
   279	
   280	  let command = s.command;
   281	  let risk = s.risk;
   282	  let critical = s.critical;
   283	  let incomplete = s.missing.length > 0;
   284	  for (;;) {
   285	    const rule = confirmRule(risk, { composed: s.method === 'composed', incomplete });
   286	    if (rule.warning) process.stdout.write(rule.warning + '\n');
   287	    const action = await readKey(rule);
   288	    if (action === 'edit') {
   289	      command = (await editLine(command)).trim();
   290	      if (!command) return 130;
   291	      // unchanged: the suggestion as rated; any change is a user edit, at least high (danger.js trust rule)
   292	      const d = command === s.command ? { risk: s.risk, warnings: s.warnings, critical: s.critical } : checkDanger(command, s.baseRisk);
   293	      risk = maxRisk(s.baseRisk, d.risk);
   294	      critical = d.critical;
   295	      incomplete = /<[A-Z_]+>/.test(command);
   296	      process.stdout.write(C.dim('  risk: ') + riskColor(risk)(risk) + '\n');
   297	      for (const w of d.warnings) process.stdout.write(riskColor(risk)(`  ! ${w}`) + '\n');
   298	      continue;
   299	    }
   300	    if (action !== 'run' || incomplete) { console.log('aborted'); return 130; }
   301	    if (critical) {
   302	      const rl2 = createInterface({ input: process.stdin, output: process.stdout });
   303	      const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
   304	      rl2.close();
   305	      if (a2 !== command) { console.log('aborted'); return 130; }
   306	    }
   307	    return runShell(command, shellName);
   308	  }
   309	}
#!/usr/bin/env node
import { main } from '../src/cli.js';

// `tellsh … | head -1`: a closed pipe is not an error
for (const s of [process.stdout, process.stderr]) s.on('error', (e) => { if (e.code === 'EPIPE') process.exit(process.exitCode ?? 0); throw e; });

main().then((code) => { process.exitCode = code; }, (err) => {
  console.error(`tellsh: ${err?.stack || err}`);
  process.exitCode = 1;
});
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
});
// Regression tests for the v0.3 final3 review (review/final3-claude.md, review/final3-codex.md) and the rules that replace
// further parser patches:
//  (1) paths: an unquoted path or name followed by more words of its name (`~/Old Projects`) is taken to the end of its
//      span; when that end is unclear (`/tmp/a.txt b.txt`) the path is a placeholder. Never the first word alone.
//  (2) prompt: a medium-risk command never runs on a plain Enter (it needs "y"); a high-risk one needs "yes".
//  (3) tools that run project code (pytest, npm/yarn/pnpm run, make, cargo, go test/run, python/node scripts, npx,
//      wrangler) are at least medium, also for --help / --version.
//  (4) scope options (--workspace, --repo / "in project X", --env, --config, --prefix) are kept or placeholdered, never
//      dropped.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest, pathTail } from '../src/pipeline.js';
import { assessCommand, checkDanger } from '../src/danger.js';
import { scopeMentions } from '../src/fill.js';
import { confirmRule } from '../src/cli.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const SHELLS = [BASH, { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, { shell: 'fish', os: 'linux', coreutils: 'gnu' },
  { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, { shell: 'cmd', os: 'win32', coreutils: 'gnu' }];
const run = (q, env = BASH) => suggest(q, { env });

// ---------- (1) paths ----------
test('final3-claude major: an unquoted path with spaces is never cut at its first space', () => {
  const whole = {
    'delete the folder ~/Old Projects': "rm -r ~/'Old Projects'",
    'delete folder /tmp/my data': "rm -r '/tmp/my data'",
    'delete all .log files in /var/log old': "find '/var/log old' -type f -iname '*.log' -delete",
    'chmod 777 /srv/my app': "chmod 777 '/srv/my app'",
    'move /tmp/old notes to /tmp/archive': "mv -i '/tmp/old notes' /tmp/archive",
    // the same for a bare name and for Polish
    'delete the folder Old Projects': "rm -r 'Old Projects'",
    'usuń folder ~/Stare Projekty': "rm -r ~/'Stare Projekty'",
    // a modifier or a connector ends the name
    'delete the folder ~/Old Projects please': "rm -r ~/'Old Projects'",
    'delete the folder ~/Old Projects recursively': "rm -r ~/'Old Projects'",
    'copy ~/My Notes to /tmp/backup': "cp -ri ~/'My Notes' /tmp/backup",
  };
  for (const [q, cmd] of Object.entries(whole)) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.deepEqual(r.missing, [], q);
  }
});

test('final3-claude major: a path whose end is unclear is a placeholder with a warning', () => {
  for (const [q, cmd, k] of [
    ['delete file /tmp/a.txt b.txt', 'rm <FILE>', 'file'],
    ['delete file /tmp/my notes.txt', 'rm <FILE>', 'file'],
    ['copy /tmp/my notes /tmp/b', 'cp -ri <SRC> /tmp/b', 'src'],
  ]) {
    const r = run(q);
    assert.equal(r.command, cmd, q);
    assert.ok(r.missing.includes(k), q);
    assert.ok(r.warnings.some((w) => /unclear where the unquoted name ends/.test(w)), `${q}: ${r.warnings.join('; ')}`);
  }
  // ends in sentence punctuation: the existing placeholder (the name may include the `.`)
  const p = run('delete the folder ~/Old Projects.');
  assert.equal(p.command, 'rm -r <PATH>');
});

test('paths: words of the request after a path are not part of its name', () => {
  for (const [q, cmd] of [
    ['make script.sh executable', 'chmod +x script.sh'],
    ['delete file /tmp/notes.txt now', 'rm /tmp/notes.txt'],
    ['delete file /tmp/notes.txt permanently', 'rm /tmp/notes.txt'],
    ['copy /tmp/a /tmp/b', 'cp -ri /tmp/a /tmp/b'],
    ['copy /tmp/a.txt /tmp/b', 'cp -ri /tmp/a.txt /tmp/b'],
    ['list files in ~/Old Projects', "ls -lah ~/'Old Projects'"],
    ['which directory inside node_modules is the largest? show 15', 'du -h -d 1 node_modules 2>/dev/null | sort -rh | head -n 15'],
    ['ile jest plików w /etc razem z podkatalogami', 'find /etc -type f | wc -l'],
    ['utwórz archiwum tar.gz z /etc o nazwie etc.tgz', 'tar -czvf etc.tgz /etc'],
  ]) assert.equal(run(q).command, cmd, q);
  // a withheld path keeps its placeholder in an optional part of the template (never `git restore` of everything)
  assert.equal(pathTail('rm /tmp/a.txt b.txt', '/tmp/a.txt', [], { used: ['b.txt'] }), null);
  assert.deepEqual(pathTail('rm /tmp/a.txt b.txt', '/tmp/a.txt', []), { ambiguous: true, words: ['b.txt'] });
});

test('paths: the composer takes the whole name too, never its first word', () => {
  const r = run('recursively chmod 777 /srv/my app');
  assert.ok(r.command.endsWith("'/srv/my app'"), r.command);
  assert.ok(!/(?:^|\s)\/srv\/my(?:\s|$)/.test(r.command), r.command);
  // a read-only composed command is not blocked by words of the request after its path
  assert.equal(run('find files in /tmp owned by user bob').command, 'find /tmp -type f -user bob');
});

test('paths: the one-argument and the several-argument forms agree', () => {
  // `tellsh delete the folder "~/Old Projects"` is quoted again by joinArgs
  assert.equal(run('delete the folder ~/Old Projects').command, run("delete the folder '~/Old Projects'").command);
});

// ---------- (2) prompt ----------
test('0.3.2 UX: Enter runs at every risk level, Esc/Ctrl+C abort, medium/high keep a warning', () => {
  for (const r of ['safe', 'medium', 'high', undefined]) {
    const rule = confirmRule(r);
    for (const k of ['\r', '\n']) assert.equal(rule.decide(k), 'run', `${r} ${JSON.stringify(k)}`);
    for (const k of ['\x1b', '\x03', 'n', 'q']) assert.equal(rule.decide(k), 'abort', `${r} ${JSON.stringify(k)}`);
    assert.equal(rule.decide('e'), 'edit');
    // arrows / other keys / typed words are ignored, never run
    for (const k of ['\x1b[A', 'y', 'yes', 'x', ' ']) assert.equal(rule.decide(k), null, `${r} ${JSON.stringify(k)}`);
  }
  assert.equal(confirmRule('safe').warning, null);
  assert.match(confirmRule('medium').warning, /Medium risk/);
  assert.match(confirmRule('high').warning, /High risk/);
  assert.match(confirmRule(undefined).warning, /High risk/);
  assert.match(confirmRule('safe', { composed: true }).warning, /Experimental/);
  // incomplete: never runs as is, Enter opens the editor
  for (const r of ['safe', 'medium', 'high']) assert.equal(confirmRule(r, { incomplete: true }).decide('\r'), 'edit', r);
  // the reviewed medium rows still carry the medium warning
  for (const q of ['chmod 777 /srv/my app', 'move /tmp/old notes to /tmp/archive']) assert.equal(run(q).risk, 'medium', q);
});

// ---------- (3) project code ----------
test('final3-codex major: tools that run project code are at least medium, also for --help', () => {
  for (const env of SHELLS) {
    const r = run('show the help for pytest', env);
    assert.equal(r.risk, 'medium', `${env.shell}: ${r.command}`);
    assert.ok(r.warnings.some((w) => /runs code from the project/.test(w)), env.shell);
  }
  for (const c of ['pytest --help', 'pytest --version', 'py.test --help', 'make --help', 'make', 'cargo --version', 'cargo test',
    'go test ./...', 'go run .', 'go generate', 'python3 script.py', 'python -m mypkg', 'node app.js', 'node server.js --help',
    'npx eslint --help', 'npm run build', 'npm run --help', 'npm test', 'yarn dev', 'yarn --version', 'pnpm run build',
    'wrangler --version', 'wrangler dev', 'npx wrangler deploy', 'bun run dev', 'tox --help', 'poetry run pytest', 'uv run x.py', 'bundle exec rake']) {
    assert.notEqual(assessCommand(c).risk, 'safe', c);
    assert.notEqual(checkDanger(c, 'safe', { rendered: true }).risk, 'safe', c);
  }
  // the tool's own --help / --version, without project code: unchanged
  for (const c of ['node --version', 'python3 --version', 'npm --version', 'npm --help', 'pnpm --help', 'go version', 'go help', 'git --help']) {
    assert.equal(checkDanger(c, 'safe', { rendered: true }).risk, 'safe', c);
  }
  for (const q of ['pokaz wersje cargo', 'help for make']) assert.equal(run(q).risk, 'medium', q);
  // a medium intent gets no extra warning (it is medium already)
  assert.ok(!run('run npm deploy').warnings.some((w) => /runs code from the project/.test(w)));
});

// ---------- (4) scope options ----------
test('final3-codex major: an npm workspace is kept, never dropped', () => {
  for (const env of SHELLS) {
    const r = run('run npm deploy --workspace staging', env);
    assert.match(r.command, /^npm run '?deploy'? --workspace staging$/, `${env.shell}: ${r.command}`);
  }
  for (const [q, cmd] of [
    ['run npm deploy -w staging', 'npm run deploy --workspace staging'],
    ['run npm deploy --workspace=staging', 'npm run deploy --workspace staging'],
    ['run the build script in workspace api', 'npm run build --workspace api'],
    ['install express in workspace api', 'npm install express --workspace api'],

exec
/bin/bash -lc "rg -n 'confirmRule|decideKey|setRawMode|SIGINT|SIGTERM|pty|readline' src test --glob '*.js'; rg -n 'prompt|Enter|yes|unrated|composed|catastrophic|incomplete' README.md CHANGELOG.md; git diff 080b628..HEAD -- package.json" in /workspace/tellsh
 succeeded in 0ms:
test/regressions28.test.js:15:import { confirmRule } from '../src/cli.js';
test/regressions28.test.js:94:    const rule = confirmRule(r);
test/regressions28.test.js:101:  assert.equal(confirmRule('safe').warning, null);
test/regressions28.test.js:102:  assert.match(confirmRule('medium').warning, /Medium risk/);
test/regressions28.test.js:103:  assert.match(confirmRule('high').warning, /High risk/);
test/regressions28.test.js:104:  assert.match(confirmRule(undefined).warning, /High risk/);
test/regressions28.test.js:105:  assert.match(confirmRule('safe', { composed: true }).warning, /Experimental/);
test/regressions28.test.js:107:  for (const r of ['safe', 'medium', 'high']) assert.equal(confirmRule(r, { incomplete: true }).decide('\r'), 'edit', r);
test/regressions2.test.js:98:  for (const c of ['busybox rm -rf /', 'rsync -a --delete empty/ /', 'cp /dev/null /etc/passwd', 'docker run -v /:/h alpine rm -rf /h',
src/guards.js:26:const ACTION = String.raw`(?:delete|remove|rm|erase|wipe|purge|kill|terminate|stop|restart|reload|shut\w*|reboot|install|uninstall|upgrade|update|move|mv|rename|copy|cp|overwrite|push|pull|merge|deploy|drop|reset|clean|prune|format|chmod|chown|change|touch|run|start|create|make|commit|checkout|switch|enable|disable|truncate|empty|usuw\w*|usun\w*|kasuj\w*|skasuj\w*|wywal\w*|zabij\w*|ubij\w*|zatrzym\w*|restartuj\w*|zrestartuj\w*|przeladuj\w*|instaluj\w*|zainstaluj\w*|aktualizuj\w*|przeno\w*|przenies\w*|kopiuj\w*|skopiuj\w*|nadpis\w*|wypych\w*|wypchnij\w*|scal\w*|zmerguj\w*|resetuj\w*|czysc\w*|wyczysc\w*|formatuj\w*|zmieni\w*|zmien\w*|urucham\w*|uruchom\w*|odpal\w*|wylacz\w*|wlacz\w*|tworz\w*|utworz\w*|commituj\w*|zacommituj\w*)`;
src/slots.js:49:  shell: 'sh', bashowe: 'sh', skrypty: 'sh', skryptow: 'sh', yamlowe: 'yaml', jsonowe: 'json', jsonow: 'json',
src/slots.js:486:  script: set('run uruchom odpal odpalic puść pusc wykonaj execute script skrypt skryptu skrypty npm'),
src/tools.js:8:    'count_files', 'count_lines_code', 'recent_files', 'empty_files', 'empty_dirs', 'duplicate_files',
src/render.js:164: * then escapes the closing quote); empty arguments are dropped. `\"` would be right for Legacy but
src/variants.js:112:  empty_files: {
src/variants.js:116:  empty_dirs: {
src/variants.js:323:    // `kill` is an alias of Stop-Process (SIGKILL on Unix) in PowerShell; call the real binary for SIGTERM.
src/pipeline.js:148:  // (or a named location inside it) must not stand in for it: the slot stays empty (placeholder)
src/pipeline.js:583:  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
src/pipeline.js:628:    // `in $(pwd)`: the location is the output of a command, so an empty path slot is withheld too (never `.`)
src/pipeline.js:671:  // the slots the reference fills (pronoun) or leaves empty (refused / guarded)
src/pipeline.js:705:    // the reference points at something we cannot read safely: leave the slot empty (placeholder); a pull request stays
src/compose.js:47:      F('-empty', ['empty', 'pust']),
src/compose.js:339:  if (spec.filters) for (const x of ['-name', '-iname', '-mtime', '-mmin', '-size', '-type', '-maxdepth', '-empty', '-newer', '-print0', '-user']) vocab.add(x);
src/allowlist-data.js:129:  "find": ["-Hn","-L","-c","-delete","-empty","-exec","-f","-h","-iname","-k","-l","-lh","-ls","-maxdepth","-mtime","-name","-not","-path","-printf","-r","-size","-t","-type","-xdev","-xtype","/c","/v"],
src/allowlist-data.js:161:  "get-psreadlineoption": [],
src/allowlist-data.js:321:  "set-service": ["-name","-startuptype"],
src/catalog.js:53:  T('empty_files', 'Find empty files', 'find {path} -type f -empty', { path: '.' }),
src/catalog.js:54:  T('empty_dirs', 'Find empty directories', 'find {path} -type d -empty', { path: '.' }),
src/catalog.js:95:  T('touch_file', 'Create an empty file', 'touch {file}', { file: null }),
src/catalog.js:158:    { notes: 'reads the history file (the history builtin is empty in a subshell, and HISTFILE is not exported to it)' }),
src/cli.js:3:import { createInterface } from 'node:readline';
src/cli.js:165:export function confirmRule(risk, { composed = false, incomplete = false } = {}) {
src/cli.js:171:  return { warning, prompt, decide: (key) => decideKey(key, incomplete) };
src/cli.js:175:export function decideKey(key, incomplete = false) {
src/cli.js:191:    input.setRawMode(true);
src/cli.js:195:      input.setRawMode(wasRaw);
src/cli.js:285:    const rule = confirmRule(risk, { composed: s.method === 'composed', incomplete });
src/fill.js:396:    if (quoted != null) return quoted || '?'; // `""`: named but empty, withheld
src/history.js:189:  'write-host', 'write-output', 'get-help', 'get-command', 'set-psreadlineoption', 'clear-host', 'cls']);
src/history.js:1278:const NOT_HINT = /^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back|list\w*|wylistuj\w*|check|sprawdz\w*|wipe|nuke|purge|destroy|clear|clean\w*|wyczysc\w*|drop|what|which|where|about|with|from|into|then|also|again|teraz|jeszcze|whatever|everything|anything|something|thing|stuff|still|there|here|tutaj|tamto|wszystko|cokolwiek|whole|entire|completely|cale|calym|listening|running|working|executable|wykonywaln\w*|contents?|zawartosc\w*|entries|inside|wewnatrz|siedzi|srodku|please|prosze|again|ponownie|znowu|forcefully|recursively|rekurencyjnie|permanently|trwale|names?|nazw\w*|only|tylko|same|samo|thing|merged|zmergowan\w*|scalon\w*|current|biezac\w*|aktualn\w*|obecn\w*|previous|poprzedni\w*|ostatni\w*|last|other|inn\w*|empty|pust\w*|temporary|tymczasow\w*|local|lokaln\w*|remote|zdaln\w*|stopped|zatrzyman\w*|created|utworzon\w*|newly|nowo|nowy|nowa|nowe|nowym|whole|cal\w*|samym|given|mentioned|wspomnian\w*|above|powyzsz\w*|broken|zepsut\w*|failed|failing|nieudan\w*|old\w*|star\w*)$/;
CHANGELOG.md:5:**Prompt (UX).** A single keypress: **Enter runs the command at every risk level** (no more `y` / `yes`), **Esc** or
CHANGELOG.md:6:**Ctrl+C** (also `n` / `q`) aborts, `e` edits. Medium-risk commands show a yellow warning line, high-risk and unrated ones a
CHANGELOG.md:7:red one, composed (experimental) ones a yellow "experimental" line, before the prompt. Commands that match a catastrophic
CHANGELOG.md:8:pattern (`rm -rf /`, `mkfs`, `Format-Volume`, …) still have to be typed again in full. An incomplete command (a
CHANGELOG.md:9:`<PLACEHOLDER>` left) never runs: Enter opens the editor. `--yes` is unchanged (safe catalog commands only).
README.md:29:  composed (experimental) ls · bash/linux · risk: high · confidence: 100%
README.md:31:! High risk: check the command before pressing Enter.
README.md:32:[Enter] run · e edit · Esc abort
README.md:51:  -y, --yes            run without prompting (only risk=safe commands straight from the catalog; never
README.md:52:                       history-resolved, composed, incomplete or medium/high-risk ones)
README.md:62:At the prompt (a single keypress, since 0.3.2): **Enter** runs the command at every risk level, **e** edits (prefilled
README.md:63:readline), **Esc** / **Ctrl+C** (or **n**) aborts. Medium- and high-risk and composed commands print a colored warning line
README.md:64:first, so read it before Enter; catastrophic patterns (`rm -rf /`, `mkfs`, `Format-Volume`, …) need the whole command retyped. The command
README.md:66:only prints. Exit codes: command's own · `0` printed · `2` usage · `3` not understood · `4` `--yes` refused ·
README.md:190:and `wrangler dev` runs the project's build command), deploys, merges, secrets and tunnels are `medium` risk, so `--yes`
README.md:208:never auto-run with `--yes`. Details, numbers and the trade-off (fewer rejections of requests outside the catalog):
README.md:291:**high risk (the trust rule below), shown as "composed (experimental)", shows a warning before Enter and is refused by `--yes`**. POSIX shells only.
README.md:300:  a shell. Everything else is **at least high** and shows a red warning before Enter runs it; `--yes` never runs it: a command you edit
README.md:301:  (any change; an unchanged one keeps its rating), a composed command, a command resolved from history (a replay), and
README.md:315:  pytest` is `pytest --help`, medium, and `--yes` does not run it; `node --version`, `npm --help` stay safe.
README.md:357:* `--yes` only runs `safe` commands, i.e. fresh catalog renders with plain values (the trust rule): never
README.md:358:  history-resolved, composed, edited, incomplete or medium/high-risk ones. Non-TTY use prints only.
README.md:424:  elevated prompt; `disk_free` has no non-admin cmd.exe command (use PowerShell); cmd's `history_search` only sees the
README.md:436:* `<ARGS>`, `<WENV>` and `<SCOPE>` are placeholders, not values: tellsh never runs an incomplete command; edit it (`e`) first.
README.md:445:  (`same for /var`, `count lines in it`) and every composed command is high and shows the red warning (since 0.3.2
README.md:446:  Enter runs it; Esc aborts); a safe request with an
diff --git a/package.json b/package.json
index 5269a12..6ca711e 100644
--- a/package.json
+++ b/package.json
@@ -1,6 +1,6 @@
 {
   "name": "tellsh",
-  "version": "0.3.1",
+  "version": "0.3.2",
   "description": "Offline natural-language (Polish & English) to shell command CLI: tool->intent->slot cascade of tiny linear models + templates for bash/zsh/sh/PowerShell (fish/cmd best effort). No LLM at runtime, zero dependencies.",
   "type": "module",
   "bin": {

exec
/bin/bash -lc "rg -n 'write|mkdir|unlink|rmSync|spawn|exec|history' test/cli.test.js test/regressions28.test.js; node --version; python3 --version; rg --files -g AGENTS.md /workspace /home/box/.codex 2>/dev/null" in /workspace/tellsh
 succeeded in 483ms:
test/regressions28.test.js:63:    ['make script.sh executable', 'chmod +x script.sh'],
test/regressions28.test.js:122:    'wrangler --version', 'wrangler dev', 'npx wrangler deploy', 'bun run dev', 'tox --help', 'poetry run pytest', 'uv run x.py', 'bundle exec rake']) {
test/cli.test.js:3:import { spawnSync } from 'node:child_process';
test/cli.test.js:5:import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/cli.test.js:10:const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/cli.test.js:42:test('dry-run prints command and never executes', () => {
test/cli.test.js:69:  const r = run('write me a poem about the sea');
test/cli.test.js:87:  const gap = run('--shell', 'cmd', 'make deploy.sh executable');
test/cli.test.js:93:test('--history=FILE resolves references and never echoes the history', () => {
test/cli.test.js:97:    writeFileSync(f, 'echo SECRET_TOKEN=abc123\ncat notes.txt\n');
test/cli.test.js:98:    const r = run('--json', '--shell', 'bash', `--history=${f}`, 'delete', 'it');
test/cli.test.js:103:  } finally { rmSync(dir, { recursive: true, force: true }); }
v20.19.2
Python 3.13.5
/workspace/ct-landing-2026-10-08/AGENTS.md
/workspace/monetization-cnvs-freesign-whenmeet-2026-10-08/repos/whiteboard/AGENTS.md
/workspace/ar-metering/nodejs-server/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/planets/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/nodejs-server-sparse/AGENTS.md
/workspace/funnel-ship-2026-10-08/mg-plus/AGENTS.md
/workspace/funnel-ship-2026-10-08/mg-plai/AGENTS.md
/workspace/ar-metering/saas/AGENTS.md
/workspace/funnel-ship-2026-10-08/mg-plugand/AGENTS.md
/workspace/catchup-2026-10-01/whiteboard-seo/AGENTS.md
/workspace/ga4fix-genai-app/AGENTS.md
/workspace/wearfits-genai-app/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/saas/AGENTS.md
/workspace/planets/AGENTS.md
/workspace/wearfits-genai-api/AGENTS.md
/workspace/catchup-2026-10-01/multigpt/AGENTS.md
/workspace/nodejs-server-fix/AGENTS.md
/workspace/rubikon/web/public/AGENTS.md
/workspace/rubikon-deploy/web/public/AGENTS.md
/workspace/gh-actions-throttle-2026-10-07/repos/multigpt/AGENTS.md
/workspace/seo-ship-2026-10-05/planets/AGENTS.md
/workspace/multigpt/AGENTS.md
/workspace/whiteboard/AGENTS.md
/workspace/website2026-retailers/AGENTS.md
/workspace/rubikon-web-deploy/web/public/AGENTS.md
/workspace/ga4-conv-2026-10-08/repos/rubikon/web/public/AGENTS.md
/workspace/nodejs-server-zf/AGENTS.md
/workspace/ga4-conv-2026-10-08/repos/f1pl/f1pl-web/public/data/AGENTS.md
/workspace/wf-nightly-2026-10-10/repo/AGENTS.md
/workspace/ga4-conv-2026-10-08/repos/whiteboard/AGENTS.md
/workspace/zf-requeue/wearfits-genai-app/AGENTS.md
/workspace/zf-requeue/shopify-wearfits/AGENTS.md

codex
The non-TTY path and `--yes` guard are unchanged. The new reader treats each stdin data chunk as one key, which may mishandle batched keys or split escape sequences. I’ll check that with a pseudo-terminal and verify raw-mode restoration.
exec
/bin/bash -lc 'node --test test/regressions28.test.js' in /workspace/tellsh
exec
/bin/bash -lc "node --test --test-name-pattern='"'^(?!--history=FILE)'"' test/cli.test.js" in /workspace/tellsh
exec
/bin/bash -lc "python3 - <<'PY'
import os, pty, subprocess, select, time, termios


def drain(fd, seconds):
    out=b''
    until=time.monotonic()+seconds
    while time.monotonic()<until:
        ready,_,_=select.select([fd], [], [], max(0,until-time.monotonic()))
        if not ready: break
        try:
            out+=os.read(fd, 65536)
        except OSError:
            break
    return out

for label, chunks in [
    ('Enter', [(b'\\r',0)]),
    ('Ctrl+C', [(b'\\x03',0)]),
    ('n then Enter in one write', [(b'n\\r',0)]),
    ('x then Ctrl+C in one write', [(b'x\\x03',0)]),
    ('arrow split after ESC', [(b'\\x1b',0.1),(b'[A',0)]),
    ('arrow and Enter in one write', [(b'\\x1b[A\\r',0)]),
    ('e and Enter in one write', [(b'e\\r',0)]),
]:
    master,slave=pty.openpty()
    original=termios.tcgetattr(slave)
    proc=subprocess.Popen(['node','bin/tellsh.js','--shell','bash','print','working','directory'],stdin=slave,stdout=slave,stderr=slave,env={**os.environ,'NO_COLOR':'1'})
    output=b''
    until=time.monotonic()+6
    while b'[Enter] run' not in output and time.monotonic()<until:
        output+=drain(master,0.1)
    during=termios.tcgetattr(slave)
    for data,delay in chunks:
        os.write(master,data)
        if delay: time.sleep(delay)
    output+=drain(master,0.3)
    pending=proc.poll() is None
    after=termios.tcgetattr(slave)
    print(label, {'exit':proc.poll(),'pending':pending,'raw_during':not bool(during[3]&termios.ICANON),'mode_restored':after==original,'tail':output.decode('utf8',errors='replace')[-250:]})
    if pending:
        os.write(master,b'\\x03')
        output+=drain(master,0.1)
    try: proc.wait(timeout=1)
    except subprocess.TimeoutExpired:
        proc.terminate()
        proc.wait(timeout=1)
    os.close(master)
    os.close(slave)
PY" in /workspace/tellsh
 succeeded in 1276ms:
TAP version 13
# Subtest: /workspace/tellsh/test/regressions28.test.js
ok 1 - /workspace/tellsh/test/regressions28.test.js
  ---
  duration_ms: 1048.226295
  ...
1..1
# tests 1
# suites 0
# pass 1
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 1078.868769

 exited 1 in 5552ms:
TAP version 13
# Subtest: /workspace/tellsh/test/cli.test.js
not ok 1 - /workspace/tellsh/test/cli.test.js
  ---
  duration_ms: 5312.648672
  location: '/workspace/tellsh/test/cli.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..1
# tests 1
# suites 0
# pass 0
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 5321.913728

 succeeded in 6168ms:
Enter {'exit': 0, 'pending': False, 'raw_during': True, 'mode_restored': True, 'tail': '$ pwd\r\n  current_dir · bash/linux · risk: safe · confidence: 74%\r\n[Enter] run · e edit · Esc abort \r\n/workspace/tellsh\r\n'}
Ctrl+C {'exit': 130, 'pending': False, 'raw_during': True, 'mode_restored': True, 'tail': '$ pwd\r\n  current_dir · bash/linux · risk: safe · confidence: 74%\r\n[Enter] run · e edit · Esc abort \r\naborted\r\n'}
n then Enter in one write {'exit': None, 'pending': True, 'raw_during': True, 'mode_restored': False, 'tail': '$ pwd\r\n  current_dir · bash/linux · risk: safe · confidence: 74%\r\n[Enter] run · e edit · Esc abort '}
x then Ctrl+C in one write {'exit': None, 'pending': True, 'raw_during': True, 'mode_restored': False, 'tail': '$ pwd\r\n  current_dir · bash/linux · risk: safe · confidence: 74%\r\n[Enter] run · e edit · Esc abort '}
arrow split after ESC {'exit': 130, 'pending': False, 'raw_during': True, 'mode_restored': True, 'tail': '$ pwd\r\n  current_dir · bash/linux · risk: safe · confidence: 74%\r\n[Enter] run · e edit · Esc abort \r\naborted\r\n[A'}
arrow and Enter in one write {'exit': None, 'pending': True, 'raw_during': True, 'mode_restored': False, 'tail': '$ pwd\r\n  current_dir · bash/linux · risk: safe · confidence: 74%\r\n[Enter] run · e edit · Esc abort '}
e and Enter in one write {'exit': None, 'pending': True, 'raw_during': True, 'mode_restored': False, 'tail': '$ pwd\r\n  current_dir · bash/linux · risk: safe · confidence: 74%\r\n[Enter] run · e edit · Esc abort '}

exec
/bin/bash -lc "git show 080b628:src/cli.js | sed -n '155,295p'; sed -n '1,180p' src/danger.js; rg -n 'export function checkDanger|critical|placeholder|missing' src/danger.js src/pipeline.js src/render.js" in /workspace/tellsh
 succeeded in 129ms:
  }
}

/**
 * The prompt and the answer a command needs at its risk: safe runs on Enter (or y/yes); medium never runs on a plain
 * Enter, it needs an explicit "y"; high and composed (experimental) need the word "yes". `tak`/`t` are the Polish forms.
 * -> { prompt, accepts(answer) }
 */
export function confirmRule(risk, { composed = false, incomplete = false } = {}) {
  const ans = (a) => String(a ?? '').trim().toLowerCase();
  // a placeholder is left: it is edited first, never run as is
  if (incomplete) return { prompt: 'e edit · n abort: ', accepts: () => false };
  // an unknown rating is treated as high
  if (composed || (risk !== 'safe' && risk !== 'medium')) {
    return { prompt: `${risk === 'high' ? C.red('High risk.') : C.yellow('Experimental.')} Type "yes" to run, e to edit, anything else aborts: `,
      accepts: (a) => ['yes', 'tak'].includes(ans(a)) };
  }
  if (risk === 'medium') return { prompt: `${C.yellow('Medium risk.')} Type y to run, e to edit, anything else aborts: `, accepts: (a) => ['y', 'yes', 't', 'tak'].includes(ans(a)) };
  return { prompt: '[Enter] run · e edit · n abort: ', accepts: (a) => ['', 'y', 'yes', 't', 'tak'].includes(ans(a)) };
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
  if (!s.understood && s.hint && s.confidence >= s.threshold) {
    // understood, but the only command the catalog has would contradict the request ("uninstall", "except 1234", "close pr")
    console.log(`Not suggesting a command for "${query}": ${s.hint}.`);
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
  for (;;) {
    const rule = confirmRule(risk, { composed: s.method === 'composed', incomplete });
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const ans = (await ask(rl, rule.prompt)).trim().toLowerCase();
    rl.close();
    if (ans === 'e' || ans === 'edit') {
      command = (await editLine(command)).trim();
      if (!command) return 130;
      // unchanged: the suggestion as rated; any change is a user edit, at least high (danger.js trust rule)
      const d = command === s.command ? { risk: s.risk, warnings: s.warnings, critical: s.critical } : checkDanger(command, s.baseRisk);
      risk = maxRisk(s.baseRisk, d.risk);
      critical = d.critical;
      incomplete = /<[A-Z_]+>/.test(command);
      process.stdout.write(C.dim('  risk: ') + riskColor(risk)(risk) + '\n');
      for (const w of d.warnings) process.stdout.write(riskColor(risk)(`  ! ${w}`) + '\n');
      continue;
    }
    if (incomplete) { if (ans === '') continue; return 130; }
    if (!rule.accepts(ans)) { console.log('aborted'); return 130; }
    if (critical) {
      const rl2 = createInterface({ input: process.stdin, output: process.stdout });
      const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
      rl2.close();
      if (a2 !== command) { console.log('aborted'); return 130; }
    }
    return runShell(command, shellName);
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
src/render.js:176:  // slot must not be taken for a script-block brace, which made that placeholder look like the
src/render.js:182:    // the first word of the segment that is not (part of) a placeholder
src/pipeline.js:50:// function words. The path is withheld (placeholder), never silently replaced by the catalog default `.`.
src/pipeline.js:122:  // `?…` marks a value that was named but withheld (fill.js): a placeholder, never rendered as `'?'`
src/pipeline.js:127:/** History slots that failed validation (too long, a newline, ...): withheld as placeholders, never the catalog default. */
src/pipeline.js:148:  // (or a named location inside it) must not stand in for it: the slot stays empty (placeholder)
src/pipeline.js:164:  // placeholder instead of the default `.`
src/pipeline.js:174:  // an operand the request names but that is not a valid value (`npm install @types/node;rm`): placeholder, never
src/pipeline.js:210:// another value, a name that already has an extension: `/tmp/a.txt b.txt`) the path is withheld as a placeholder.
src/pipeline.js:274:// it ends is unclear: `/tmp/my file.txt`, `report.txt notes.txt`) null, a placeholder.
src/pipeline.js:429:      confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: 'the request contains a NUL byte' };
src/pipeline.js:436:    // placeholders (refused, ambiguous, rejected) are ambiguous values here, never the catalog default or a guess.
src/pipeline.js:441:      for (const k of r.missing || []) slots[k] = AMB + `<${k}>`;
src/pipeline.js:457:    // a value that fails validation (a 300-character path, ...) is a placeholder, never `find .`
src/pipeline.js:459:    // `same for ~/Old Projects`, `same for ~/'Old Projects'`: the whole new name, or a placeholder when where it ends is
src/pipeline.js:472:    // the new path ends in sentence punctuation (`same for /tmp/data!`): placeholder, as for any request
src/pipeline.js:480:    if (cutHistory) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear where the new name ends (${cutHistory}); quote the path`];
src/pipeline.js:481:    if (punct.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${punct.join(', ')}); quote the path`];
src/pipeline.js:482:    if (punct.length + (cutHistory ? 1 : 0) < blank.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: it is not a valid value (${blank.filter((k) => !punct.includes(k) && !(cutHistory && k === ref.changed)).join(', ')})`];
src/pipeline.js:487:    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: ref.note };
src/pipeline.js:510:    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
src/pipeline.js:516:    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates, tools, command: null, missing: [], hint: context.note };
src/pipeline.js:538:      command: r.command, risk: r.risk, baseRisk: 'medium', warnings: r.warnings, critical: r.critical, missing: [], slots: {}, notes: null,
src/pipeline.js:583:  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
src/pipeline.js:585:  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
src/pipeline.js:588:  // withheld operands whose optional part keeps its placeholder: an invalid operand, a history value that is ambiguous or
src/pipeline.js:591:  // an unquoted path followed by more words of its name (`~/Old Projects`): the whole name, or a placeholder when where it
src/pipeline.js:610:  // the destination what follows it; an unclear side is a placeholder + warning, never another word of the request
src/pipeline.js:621:  // explicit paths than the command takes (`in /tmp/x and /tmp/y`: only one would be used): placeholder + warning
src/pipeline.js:642:  // package, ...): placeholder + warning
src/pipeline.js:691:  // path follows "to"/"into"/"do", so it is the destination; the source stays a placeholder (never `mv /tmp/old <DST>`)
src/pipeline.js:705:    // the reference points at something we cannot read safely: leave the slot empty (placeholder); a pull request stays
src/pipeline.js:741:        // the referenced value cannot be used (too long, a newline, ...): placeholder, never the catalog default
src/pipeline.js:761:    // (a 300-character path): placeholder, not `.`
src/pipeline.js:781:  // implicit reference: a required slot is still missing and the history has a value of that type.
src/pipeline.js:784:  if (ctx && b.missing.length && ref?.rule !== 'refused' && BY_ID[intent].risk === 'safe' && b.risk === 'safe') {
src/pipeline.js:786:    for (const m of b.missing) {
src/pipeline.js:803:  if (ambiguousText.length) res.warnings = [...(res.warnings || []), `value left as a placeholder: unclear where the quoted text ends (\\" may be an escaped quote) (${ambiguousText.join(', ')})`];
src/pipeline.js:804:  if (splitPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear which words name the ${splitPaths.map((x) => x.split('=')[0] === 'src' ? 'source' : 'destination').join(' and ')} (${splitPaths.join(', ')}); quote each path`];
src/pipeline.js:805:  if (cutPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear where the unquoted name ends (${cutPaths.join(', ')}); quote the path`];
src/pipeline.js:806:  if (ambiguousPaths.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${ambiguousPaths.join(', ')}); quote the path`];
src/pipeline.js:807:  if (unclearArgs.length) res.warnings = [...(res.warnings || []), `${unclearArgs.every((x) => PATH_SLOT_NAMES.has(x.split('=')[0])) ? 'path' : 'value'} left as a placeholder: unclear whether the quoted argument is a name or part of the request (${unclearArgs.join(', ')}); pass the whole request as one quoted argument`];
src/pipeline.js:810:      ? `path left as a placeholder: the request names more paths than ${intent} takes (${explicitPaths(query).join(', ')}); run it once per path`
src/pipeline.js:811:      : `path left as a placeholder: it is the output of a command substitution (${unclearPaths.join(', ')})`];
src/pipeline.js:813:  if (method === 'catalog' && ctx == null && hasPronoun(query) && b.missing.length) res.hint = 'this looks like a reference to an earlier command; try --history';
src/pipeline.js:818:  // composer: the catalog command with its placeholder is the answer
src/pipeline.js:844:          command: comp.command, risk: comp.risk, baseRisk: 'medium', warnings: comp.warnings, critical: comp.critical, missing: [],
src/danger.js:205: * The checks only ever escalate, so reading too many candidates is safe; missing one is not.
src/danger.js:250:// delete or a move of any of these is critical
src/danger.js:435:// /, ~, $HOME, system directories, drive roots (not the relative ., .., * that rm -r also treats as critical)
src/danger.js:444:// find ROOT... -delete / -exec rm: bulk deletion; critical on /, ~, C:\ ...
src/danger.js:533:// (`system("rm -rf /")`) and file-deleting calls on /, ~ or a system directory (`shutil.rmtree('/')`) are critical.
src/danger.js:610:    for (const m of d.warnings) hit(d.risk, m, d.critical);
src/danger.js:647:// [regex, risk, message, critical]
src/danger.js:856: * @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}}
src/danger.js:867:  let critical = false;
src/danger.js:871:    if (crit) critical = true;
src/danger.js:915:    for (const m of d.warnings) hit(d.risk, m, d.critical);
src/danger.js:922:    for (const m of d.warnings) hit(d.risk, m, d.critical);
src/danger.js:933:  return { risk, warnings, critical };
src/danger.js:941:// catches what must be retyped (critical), but a command it finds nothing wrong with is still not trusted.
src/danger.js:974: * @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}}
src/danger.js:976:export function checkDanger(command, baseRisk = 'safe', { rendered = false, allowlist = null, shell = null, os = null } = {}) {
src/danger.js:979:  return { risk: 'high', warnings: [UNTRUSTED, ...d.warnings], critical: d.critical };

exec
/bin/bash -lc "node -e 'console.log({NODE_OPTIONS:process.env.NODE_OPTIONS,NODE_TEST_CONTEXT:process.env.NODE_TEST_CONTEXT})'; node --test --test-name-pattern='--version|--help|non-TTY|--yes|composed|dry-run|platform|render|unknown' --test-reporter=spec test/cli.test.js" in /workspace/tellsh
exec
/bin/bash -lc "sed -n '1,70p' README.md; sed -n '345,365p' README.md; git log -3 --oneline" in /workspace/tellsh
exec
/bin/bash -lc "python3 -u - <<'PY'
import os, pty, subprocess, select, time, termios

def drain(fd,seconds):
    out=b''
    until=time.monotonic()+seconds
    while time.monotonic()<until:
        ready,_,_=select.select([fd],[],[],max(0,until-time.monotonic()))
        if not ready: break
        try: out+=os.read(fd,65536)
        except OSError: break
    return out

def start(query, pipe_stdin=False, pipe_stdout=False):
    master,slave=pty.openpty()
    before=termios.tcgetattr(slave)
    p=subprocess.Popen(['node','bin/tellsh.js','--shell','bash',query],stdin=subprocess.PIPE if pipe_stdin else slave,stdout=subprocess.PIPE if pipe_stdout else slave,stderr=slave,env={**os.environ,'NO_COLOR':'1'})
    output=b''
    until=time.monotonic()+6
    while b'[Enter]' not in output and time.monotonic()<until and p.poll() is None:
        output+=drain(master,0.05)
    output+=drain(master,0.05)
    return p,master,slave,before,output

def finish(p,m,s):
    if p.poll() is None:
        os.write(m,b'\\x03')
        drain(m,0.1)
    try: p.wait(timeout=0.5)
    except subprocess.TimeoutExpired:
        p.terminate()
        p.wait(timeout=1)
    os.close(m)
    os.close(s)

for query,action in [('delete file /tmp/a.txt b.txt',b'\\r'),('delete the folder /',b'\\r')]:
    p,m,s,before,out=start(query)
    os.write(m,action)
    out+=drain(m,0.3)
    print(query, {'exit':p.poll(),'tail':out.decode(errors='replace')[-450:]})
    if b'Type the full command' in out:
        os.write(m,b'wrong\\r')
        out+=drain(m,0.2)
        print('retype mismatch',{'exit':p.poll(),'restored':termios.tcgetattr(s)==before,'tail':out.decode(errors='replace')[-120:]})
    finish(p,m,s)

p,m,s,before,out=start('print working directory')
os.write(m,b'\\x1b[200~')
out+=drain(m,0.1)
os.write(m,b'not a confirmation')
out+=drain(m,0.1)
os.write(m,b'\\r')
out+=drain(m,0.2)
print('bracketed paste split before embedded newline',{'exit':p.poll(),'tail':out.decode(errors='replace')[-250:]})
finish(p,m,s)

for label,kwargs in [('piped stdin',{'pipe_stdin':True}),('piped stdout',{'pipe_stdout':True})]:
    p,m,s,before,out=start('print working directory',**kwargs)
    if p.stdin is not None: p.stdin.close()
    try: p.wait(timeout=1)
    except subprocess.TimeoutExpired: pass
    if p.stdout is not None: out+=p.stdout.read()
    print(label,{'exit':p.poll(),'restored':termios.tcgetattr(s)==before,'output':out.decode(errors='replace')})
    finish(p,m,s)
PY" in /workspace/tellsh
 succeeded in 0ms:
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
  composed (experimental) ls · bash/linux · risk: high · confidence: 100%
  ~ assembled from a flag vocabulary (request asks for -t -r not in the catalog command); check it carefully
! High risk: check the command before pressing Enter.
[Enter] run · e edit · Esc abort
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

At the prompt (a single keypress, since 0.3.2): **Enter** runs the command at every risk level, **e** edits (prefilled
readline), **Esc** / **Ctrl+C** (or **n**) aborts. Medium- and high-risk and composed commands print a colored warning line
first, so read it before Enter; catastrophic patterns (`rm -rf /`, `mkfs`, `Format-Volume`, …) need the whole command retyped. The command
runs in the target shell (`$SHELL -c`, `fish -c`, `pwsh -NoProfile -Command`, `cmd /d /s /c`). Without a TTY tellsh
only prints. Exit codes: command's own · `0` printed · `2` usage · `3` not understood · `4` `--yes` refused ·
`5` no rendering for this shell · `130` aborted.

Quoting: the whole request may be one argument (`tellsh "delete folder /tmp/x"`). Among several arguments, one with a
space is a value when it starts like a path (`tellsh delete folder "/tmp/a b"`) or, after the first argument, looks
  `kill -1`/PID 1 (but not `kill -1 PID` = SIGHUP, and not `docker run --rm`); PowerShell: `Remove-Item`/`ri`/`rm`/`del`
  `-Recurse` on a drive root (`C:\`, `C:/`), home or `*`, `Stop-Process`, `Format-Volume`, `iwr | iex`, `iex (iwr …)`,
  `Set-ExecutionPolicy`, …; cmd: `rd /s`/`del /s` on a root or `%USERPROFILE%`, `del`, `taskkill`, `format`.
* Quoting per shell, every value inserted exactly once (a value containing `{file}` stays text): POSIX `'…'\''…'`
  (a leading `=` is always quoted for zsh), fish `\'`/`\\`, PowerShell always a single-quoted string with **every**
  single-quote character doubled — PowerShell also treats `‘ ’ ‚ ‛` as quotes — and `"$HOME/…"` for `~` with
  `` ` $ " “ ” „ `` escaped; cmd `"…"`, and values containing `%`, `!` or `"` (which cmd expands or cannot escape)
  are refused for cmd (reported as a gap). On Linux/macOS PowerShell without a native variant the POSIX command runs
  as `bash -c '…'`, or is piped to `bash` when it contains `"` (PowerShell < 7.3 drops embedded `"` in native args).
* Raw slots (numbers, find flags) are validated before insertion; paths starting with `-` get `./`; other values
  (names, hosts, URLs, containers, …) may not start with `-`, and URLs must be `scheme://…` or `user@host:path`.
  Values taken from history pass the same validation.
* `--yes` only runs `safe` commands, i.e. fresh catalog renders with plain values (the trust rule): never
  history-resolved, composed, edited, incomplete or medium/high-risk ones. Non-TTY use prints only.

## Accuracy & speed (details: [EVAL.md](EVAL.md))

All numbers are on held-out data never used for training (`npm run eval`, `npm run bench`). v0.4 trades a little on
the public sets for a large gain on real usage (before/after tables for A, A+B and A+C-ft: [HYBRID.md](HYBRID.md#v04-real-usage)):

| metric | result |
7b0165a release 0.3.2: version bump, changelog, README prompt docs
969fd9e cli: 0.3.2 UX — Enter runs at every risk level, Esc/Ctrl+C abort, colored warning for medium/high/composed
080b628 review: 0.3.1 r9 dual LGTM

 succeeded in 4314ms:
delete file /tmp/a.txt b.txt {'exit': None, 'tail': '$ rm <FILE>\r\n  delete_file · bash/linux · risk: high · confidence: 95%\r\n  ! rm deletes files permanently (no trash)\r\n  ! path left as a placeholder: unclear where the unquoted name ends (file=/tmp/a.txt b.txt); quote the path\r\n  ? missing: file — edit the command (e) before running\r\n! High risk: check the command before pressing Enter.\r\n[Enter]/e edit · Esc abort \r\nedit> rm <FILE>'}
delete the folder / {'exit': None, 'tail': '$ rm -r /\r\n  delete_dir · bash/linux · risk: high · confidence: 99%\r\n  ! rm deletes files permanently (no trash)\r\n  ! recursive rm on /, ~, * or . — would wipe everything\r\n! High risk: check the command before pressing Enter.\r\n[Enter] run · e edit · Esc abort \r\nThis command can destroy the system. Type the full command again to confirm: '}
retype mismatch {'exit': 130, 'restored': True, 'tail': 'un · e edit · Esc abort \r\nThis command can destroy the system. Type the full command again to confirm: wrong\r\r\naborted\r\n'}
bracketed paste split before embedded newline {'exit': 0, 'tail': '$ pwd\r\n  current_dir · bash/linux · risk: safe · confidence: 74%\r\n[Enter] run · e edit · Esc abort \r\n/workspace/tellsh\r\n'}
piped stdin {'exit': 0, 'restored': True, 'output': '$ pwd\r\n  current_dir · bash/linux · risk: safe · confidence: 74%\r\n'}
piped stdout {'exit': 0, 'restored': True, 'output': '$ pwd\n  current_dir · bash/linux · risk: safe · confidence: 74%\n'}

 exited 1 in 6731ms:
{ NODE_OPTIONS: undefined, NODE_TEST_CONTEXT: undefined }
✖ /workspace/tellsh/test/cli.test.js (6162.474772ms)
  'test failed'

ℹ tests 1
ℹ suites 0
ℹ pass 0
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 6179.458063

✖ failing tests:

test at test/cli.test.js:1:1
✖ /workspace/tellsh/test/cli.test.js (6162.474772ms)
  'test failed'

exec
/bin/bash -lc "node --input-type=module - <<'JS'
import {spawnSync} from 'node:child_process';
const queries = [['print','working','directory'],['--yes','print','working','directory'],['--yes','delete','file','nothing-here.txt'],['--yes','--shell','bash','list files sorted by modification time, oldest first, with details']];
for (const args of queries) {
 const r=spawnSync(process.execPath,['bin/tellsh.js',...args],{encoding:'utf8',env:{...process.env,NO_COLOR:'1'}});
 console.log({args,status:r.status,signal:r.signal,error:r.error?.message,stdout:r.stdout,stderr:r.stderr});
}
JS" in /workspace/tellsh
exec
/bin/bash -lc "command -v node; ls -l /usr/bin/node; node --test --test-name-pattern='0.3.2 UX' --test-reporter=spec test/regressions28.test.js" in /workspace/tellsh
 succeeded in 1324ms:
/usr/bin/node
-rwxr-xr-x 1 nobody nogroup 26704 Sep 22 19:12 /usr/bin/node
✔ /workspace/tellsh/test/regressions28.test.js (943.340251ms)
ℹ tests 1
ℹ suites 0
ℹ pass 1
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 973.214537

 succeeded in 3331ms:
{
  args: [ 'print', 'working', 'directory' ],
  status: 0,
  signal: null,
  error: 'spawnSync /usr/bin/node EPERM',
  stdout: '',
  stderr: ''
}
{
  args: [ '--yes', 'print', 'working', 'directory' ],
  status: 0,
  signal: null,
  error: 'spawnSync /usr/bin/node EPERM',
  stdout: '/workspace/tellsh\n',
  stderr: ''
}
{
  args: [ '--yes', 'delete', 'file', 'nothing-here.txt' ],
  status: 4,
  signal: null,
  error: 'spawnSync /usr/bin/node EPERM',
  stdout: '',
  stderr: ''
}
{
  args: [
    '--yes',
    '--shell',
    'bash',
    'list files sorted by modification time, oldest first, with details'
  ],
  status: 4,
  signal: null,
  error: 'spawnSync /usr/bin/node EPERM',
  stdout: '',
  stderr: ''
}

codex
The PTY checks confirm that normal Enter and abort paths restore terminal mode, incomplete commands open the editor, and catastrophic commands still require a full retype. They also reproduce dropped cancellation keys when input is batched and command execution from a newline inside a split paste. The CLI test suite is failing under sandbox `spawnSync` errors; I’ll separate that limitation from the review findings.
exec
/bin/bash -lc "node --test-name-pattern='0.3.2 UX' test/regressions28.test.js" in /workspace/tellsh
exec
/bin/bash -lc "node --test-name-pattern='"'^(?!--history=FILE)'"' test/cli.test.js" in /workspace/tellsh
exec
/bin/bash -lc "python3 -u - <<'PY'
import os,pty,subprocess,select,time,termios

query='list files sorted by modification time, oldest first, with details'

def drain(fd,wait):
    out=b''
    deadline=time.monotonic()+wait
    while time.monotonic()<deadline:
        r,_,_=select.select([fd],[],[],max(0,deadline-time.monotonic()))
        if not r: break
        try: out+=os.read(fd,65536)
        except OSError: break
    return out

for label,chunks in [
    ('batched cancellation then Enter',[(b'x\\x03',0.15),(b'\\r',0.2)]),
    ('split bracketed multiline paste',[(b'\\x1b[200~not-a-key',0.1),(b'\\r',0.2),(b'\\x1b[201~',0.1)]),
    ('ordinary e edit and Enter flow',[(b'e',0.1),(b'\\r',0.1),(b'\\x03',0.2)]),
    ('SIGTERM while raw',[]),
]:
    master,slave=pty.openpty()
    original=termios.tcgetattr(slave)
    p=subprocess.Popen(['node','bin/tellsh.js','--shell','bash',query],stdin=slave,stdout=slave,stderr=slave,env={**os.environ,'NO_COLOR':'1'})
    out=b''
    deadline=time.monotonic()+6
    while b'[Enter] run' not in out and time.monotonic()<deadline:
        out+=drain(master,0.05)
    before=out
    for chunk,delay in chunks:
        os.write(master,chunk)
        out+=drain(master,delay)
    if label=='SIGTERM while raw':
        p.terminate()
        out+=drain(master,0.2)
    print(label, {'exit':p.poll(),'term_restored':termios.tcgetattr(slave)==original,'command_output_seen':b'total ' in out[len(before):],'tail':out.decode(errors='replace')[-300:]})
    if p.poll() is None:
        os.write(master,b'\\x03')
        drain(master,0.1)
        try:p.wait(timeout=0.5)
        except subprocess.TimeoutExpired:p.terminate();p.wait(timeout=1)
    os.close(master)
    os.close(slave)
PY" in /workspace/tellsh
 succeeded in 645ms:
TAP version 13
# Subtest: final3-claude major: an unquoted path with spaces is never cut at its first space
ok 1 - final3-claude major: an unquoted path with spaces is never cut at its first space # SKIP test name does not match pattern
  ---
  duration_ms: 7.02909
  ...
# Subtest: final3-claude major: a path whose end is unclear is a placeholder with a warning
ok 2 - final3-claude major: a path whose end is unclear is a placeholder with a warning # SKIP test name does not match pattern
  ---
  duration_ms: 0.170645
  ...
# Subtest: paths: words of the request after a path are not part of its name
ok 3 - paths: words of the request after a path are not part of its name # SKIP test name does not match pattern
  ---
  duration_ms: 0.090598
  ...
# Subtest: paths: the composer takes the whole name too, never its first word
ok 4 - paths: the composer takes the whole name too, never its first word # SKIP test name does not match pattern
  ---
  duration_ms: 0.099747
  ...
# Subtest: paths: the one-argument and the several-argument forms agree
ok 5 - paths: the one-argument and the several-argument forms agree # SKIP test name does not match pattern
  ---
  duration_ms: 0.082921
  ...
# Subtest: 0.3.2 UX: Enter runs at every risk level, Esc/Ctrl+C abort, medium/high keep a warning
ok 6 - 0.3.2 UX: Enter runs at every risk level, Esc/Ctrl+C abort, medium/high keep a warning
  ---
  duration_ms: 115.108569
  ...
# Subtest: final3-codex major: tools that run project code are at least medium, also for --help
ok 7 - final3-codex major: tools that run project code are at least medium, also for --help # SKIP test name does not match pattern
  ---
  duration_ms: 0.134791
  ...
# Subtest: final3-codex major: an npm workspace is kept, never dropped
ok 8 - final3-codex major: an npm workspace is kept, never dropped # SKIP test name does not match pattern
  ---
  duration_ms: 0.090165
  ...
# Subtest: final3-codex major: a scope npm cannot express is a placeholder, never dropped
ok 9 - final3-codex major: a scope npm cannot express is a placeholder, never dropped # SKIP test name does not match pattern
  ---
  duration_ms: 0.268837
  ...
# Subtest: final3-codex major: an explicit pull request does not hide an unresolved repository
ok 10 - final3-codex major: an explicit pull request does not hide an unresolved repository # SKIP test name does not match pattern
  ---
  duration_ms: 0.183135
  ...
# Subtest: scope mentions: short options belong to one tool
ok 11 - scope mentions: short options belong to one tool # SKIP test name does not match pattern
  ---
  duration_ms: 0.134472
  ...
# Subtest: a contested npm script is a placeholder, never the literal marker
ok 12 - a contested npm script is a placeholder, never the literal marker # SKIP test name does not match pattern
  ---
  duration_ms: 0.073294
  ...
1..12
# tests 12
# suites 0
# pass 1
# fail 0
# cancelled 0
# skipped 11
# todo 0
# duration_ms 164.753326

 succeeded in 4976ms:
batched cancellation then Enter {'exit': 0, 'term_restored': True, 'command_output_seen': True, 'tail': '-x  5 box box  4096 Oct 11 23:10 scripts\r\ndrwxr-xr-x  3 box box  4096 Oct 11 23:10 test\r\n-rw-r--r--  1 box box 45096 Oct 11 23:10 README.md\r\n-rw-r--r--  1 box box  2320 Oct 11 23:10 package.json\r\n-rw-r--r--  1 box box   789 Oct 11 23:10 CHANGELOG.md\r\ndrwxr-xr-x  2 box box  4096 Oct 11 23:11 review\r\n'}
split bracketed multiline paste {'exit': 0, 'term_restored': True, 'command_output_seen': True, 'tail': 'ox box  4096 Oct 11 23:10 scripts\r\ndrwxr-xr-x  3 box box  4096 Oct 11 23:10 test\r\n-rw-r--r--  1 box box 45096 Oct 11 23:10 README.md\r\n-rw-r--r--  1 box box  2320 Oct 11 23:10 package.json\r\n-rw-r--r--  1 box box   789 Oct 11 23:10 CHANGELOG.md\r\ndrwxr-xr-x  2 box box  4096 Oct 11 23:11 review\r\n^[[201~'}
ordinary e edit and Enter flow {'exit': 130, 'term_restored': True, 'command_output_seen': False, 'tail': 'ter] run · e edit · Esc abort \r\nedit> ls -l -t -r\r\r\n  risk: high\r\n  ! not a catalog command rendered by tellsh with plain values (edited, composed, from history or unknown); it is not checked as safe\r\n! High risk: check the command before pressing Enter.\r\n[Enter] run · e edit · Esc abort \r\naborted\r\n'}
SIGTERM while raw {'exit': -15, 'term_restored': True, 'command_output_seen': False, 'tail': 'ary (request asks for -t -r not in the catalog command); check it carefully\r\n  ! not a catalog command rendered by tellsh with plain values (edited, composed, from history or unknown); it is not checked as safe\r\n! High risk: check the command before pressing Enter.\r\n[Enter] run · e edit · Esc abort '}

 exited 1 in 7861ms:
TAP version 13
# Subtest: --version
not ok 1 - --version
  ---
  duration_ms: 355.946109
  location: '/workspace/tellsh/test/cli.test.js:12:1'
  failureType: 'testCodeFailure'
  error: |-
    Expected values to be strictly equal:
    
    '' !== '0.3.2'
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected: '0.3.2'
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
  duration_ms: 560.963353
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
  duration_ms: 677.700143
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
  duration_ms: 743.738219
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
  duration_ms: 614.499622
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
  duration_ms: 996.566332
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
  duration_ms: 867.11719
  ...
# Subtest: --yes refuses non-safe commands
not ok 8 - --yes refuses non-safe commands
  ---
  duration_ms: 470.516081
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
  duration_ms: 462.830685
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
  duration_ms: 339.553774
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
  duration_ms: 561.368438
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
  duration_ms: 1.143028
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
  duration_ms: 842.694223
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
# duration_ms 7546.786151

exec
/bin/bash -lc "git status --short; nl -ba CHANGELOG.md; nl -ba src/cli.js | sed -n '159,205p'" in /workspace/tellsh
 succeeded in 0ms:
?? review/032-r1-claude.md
?? review/032-r1-codex.md
     1	# Changelog
     2	
     3	## 0.3.2
     4	
     5	**Prompt (UX).** A single keypress: **Enter runs the command at every risk level** (no more `y` / `yes`), **Esc** or
     6	**Ctrl+C** (also `n` / `q`) aborts, `e` edits. Medium-risk commands show a yellow warning line, high-risk and unrated ones a
     7	red one, composed (experimental) ones a yellow "experimental" line, before the prompt. Commands that match a catastrophic
     8	pattern (`rm -rf /`, `mkfs`, `Format-Volume`, …) still have to be typed again in full. An incomplete command (a
     9	`<PLACEHOLDER>` left) never runs: Enter opens the editor. `--yes` is unchanged (safe catalog commands only).
    10	
    11	The model, catalog and templates are unchanged from 0.3.1 (new catalog templates are in progress on
    12	`feat/templates-catalog` and need a retrain that passes the full test suite).
   159	/**
   160	 * The prompt and warning for a command at its risk (0.3.2): [Enter] runs at EVERY risk level, Esc / Ctrl+C / n / q
   161	 * aborts, e edits. Medium, high, composed (experimental) and unrated commands keep a colored warning line.
   162	 * An incomplete command (placeholder left) never runs: Enter opens the editor instead.
   163	 * -> { warning, prompt, decide(key) } where decide returns 'run' | 'edit' | 'abort' | null (ignore the key)
   164	 */
   165	export function confirmRule(risk, { composed = false, incomplete = false } = {}) {
   166	  let warning = null;
   167	  if (risk === 'high' || (risk !== 'safe' && risk !== 'medium')) warning = C.red('! High risk: check the command before pressing Enter.');
   168	  else if (composed) warning = C.yellow('! Experimental (composed) command: check it before pressing Enter.');
   169	  else if (risk === 'medium') warning = C.yellow('! Medium risk: check the command before pressing Enter.');
   170	  const prompt = incomplete ? '[Enter]/e edit · Esc abort ' : '[Enter] run · e edit · Esc abort ';
   171	  return { warning, prompt, decide: (key) => decideKey(key, incomplete) };
   172	}
   173	
   174	/** One raw keypress chunk -> action. A lone ESC aborts; longer escape sequences (arrows, F-keys) are ignored. */
   175	export function decideKey(key, incomplete = false) {
   176	  const k = String(key ?? '');
   177	  if (k === '\r' || k === '\n' || k === '\r\n') return incomplete ? 'edit' : 'run';
   178	  if (k === '\x1b' || k === '\x03' || k === '\x04') return 'abort';
   179	  const c = k.toLowerCase();
   180	  if (c === 'e') return 'edit';
   181	  if (c === 'n' || c === 'q') return 'abort';
   182	  return null;
   183	}
   184	
   185	/** Wait for a single key in raw mode (no line buffering, no echo). */
   186	function readKey(rule) {
   187	  return new Promise((res) => {
   188	    const input = process.stdin;
   189	    process.stdout.write(rule.prompt);
   190	    const wasRaw = input.isRaw;
   191	    input.setRawMode(true);
   192	    input.resume();
   193	    const done = (action) => {
   194	      input.removeListener('data', onData);
   195	      input.setRawMode(wasRaw);
   196	      input.pause();
   197	      process.stdout.write('\n');
   198	      res(action);
   199	    };
   200	    const onData = (buf) => {
   201	      const action = rule.decide(buf.toString('utf8'));
   202	      if (action) done(action);
   203	    };
   204	    input.on('data', onData);
   205	  });

codex
1. **Major — [src/cli.js:200](/workspace/tellsh/src/cli.js:200): cancellation depends on stdin chunk boundaries.** Each `data` chunk is treated as one key. PTY inputs `x\x03` and `n\r` are ignored, so Ctrl+C/n fails to abort; a subsequent Enter still executes the command. Conversely, an arrow sequence split after ESC aborts unexpectedly. Decode keys across chunks and add PTY coverage for batched and fragmented input.

2. **Major — [src/cli.js:177](/workspace/tellsh/src/cli.js:177): pasted newlines can execute commands.** The reader has no paste state. Sending a bracketed paste start and text, followed by a standalone newline chunk, executes the suggestion before the paste ends. Reproduced with a high-risk composed `ls` command without pressing Enter separately. Enable and track bracketed paste, suppressing confirmation actions within its contents.

3. **Minor — [CHANGELOG.md:7](/workspace/tellsh/CHANGELOG.md:7): composed-warning description differs from implementation.** Composed commands are high risk, so the high-risk branch produces a red warning; the yellow experimental branch is bypassed. The README example correctly shows red. Align the changelog with that behavior.

The focused prompt regression passed. PTY checks confirmed normal raw-mode restoration, non-TTY print-only behavior, incomplete-command editing, and catastrophic retype enforcement. CLI-suite validation was limited by sandbox `spawnSync`/fixture errors (`EPERM`, `EROFS`). No files changed.

VERDICT: REQUEST_CHANGES
tokens used
71,356
1. **Major — [src/cli.js:200](/workspace/tellsh/src/cli.js:200): cancellation depends on stdin chunk boundaries.** Each `data` chunk is treated as one key. PTY inputs `x\x03` and `n\r` are ignored, so Ctrl+C/n fails to abort; a subsequent Enter still executes the command. Conversely, an arrow sequence split after ESC aborts unexpectedly. Decode keys across chunks and add PTY coverage for batched and fragmented input.

2. **Major — [src/cli.js:177](/workspace/tellsh/src/cli.js:177): pasted newlines can execute commands.** The reader has no paste state. Sending a bracketed paste start and text, followed by a standalone newline chunk, executes the suggestion before the paste ends. Reproduced with a high-risk composed `ls` command without pressing Enter separately. Enable and track bracketed paste, suppressing confirmation actions within its contents.

3. **Minor — [CHANGELOG.md:7](/workspace/tellsh/CHANGELOG.md:7): composed-warning description differs from implementation.** Composed commands are high risk, so the high-risk branch produces a red warning; the yellow experimental branch is bypassed. The README example correctly shows red. Align the changelog with that behavior.

The focused prompt regression passed. PTY checks confirmed normal raw-mode restoration, non-TTY print-only behavior, incomplete-command editing, and catastrophic retype enforcement. CLI-suite validation was limited by sandbox `spawnSync`/fixture errors (`EPERM`, `EROFS`). No files changed.

VERDICT: REQUEST_CHANGES
