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
session id: 01a12cdb-133c-7b51-b8d9-ee2219d36b8a
--------
user
Re-review (round 3) of tellsh release 0.3.2 in /workspace/tellsh: git diff 080b628..HEAD (earlier rounds: review/032-r1-*.md, review/032-r2-*.md; last commit addresses r2). Interactive prompt = single raw-mode keypress: Enter runs at every risk level (explicit owner decision, not a finding), Esc / Ctrl+C / Ctrl+D / n / q abort, e edits; medium yellow, high/composed/unrated red warning; incomplete never runs; catastrophic still retyped; --yes unchanged. Verify the r2 majors/minors are fixed (paste across the startup window, abort before paste, split paste-end marker, Esc+Enter, malformed CSI, abort keys in startup window) and look for new issues. Read-only. Findings with severity and file:line. End with exactly one line 'VERDICT: APPROVE' (no blocker/major) or 'VERDICT: REQUEST_CHANGES'.
codex
I’ll read the earlier findings and release diff, verify the round 2 fixes, and check the input handling for new issues. I’ll keep the review read-only.
exec
/bin/bash -lc 'git status --short && git log --oneline -8 && git diff --stat 080b628..HEAD' in /workspace/tellsh
 succeeded in 0ms:
?? review/032-r3-claude.md
?? review/032-r3-codex.md
3ab74b1 cli: r2 review fixes — parser state kept before the prompt is armed, abort before a paste honoured, split paste markers, Esc+Enter/control = abort, malformed CSI aborts, all abort keys work immediately
c70b837 cli: r1 review fixes — only a lone \r confirms, typed-ahead input discarded, bracketed paste ignored, keys decoded across chunks, aborts anywhere in a burst; composed warning red; replay/danger texts
7b0165a release 0.3.2: version bump, changelog, README prompt docs
969fd9e cli: 0.3.2 UX — Enter runs at every risk level, Esc/Ctrl+C abort, colored warning for medium/high/composed
080b628 review: 0.3.1 r9 dual LGTM
745a432 cmd: function-template q takes explicit slot role (r8 Codex RC: equal path+pattern no longer rewritten)
d605e2d cmd: non-path values ending in \ are a gap instead of being rewritten; C:\. and \. critical
e4a9108 cmd: quoted trailing separator becomes \. (keeps copy/move directory meaning); C:\Users / Windows / Program Files are critical rd targets
 CHANGELOG.md               |   14 +
 README.md                  |   21 +-
 package.json               |    2 +-
 review/032-r1-claude.md    |   40 +
 review/032-r1-codex.md     | 3210 ++++++++++++++++++++++++++++++++++++++++++++
 review/032-r2-claude.md    |   33 +
 review/032-r2-codex.md     | 2923 ++++++++++++++++++++++++++++++++++++++++
 src/cli.js                 |  130 +-
 src/danger.js              |    4 +-
 src/pipeline.js            |    2 +-
 test/regressions28.test.js |   67 +-
 11 files changed, 6396 insertions(+), 50 deletions(-)

exec
/bin/bash -lc "pwd && rg --files -g 'AGENTS.md' -g 'review/032-r1-*.md' -g 'review/032-r2-*.md' -g 'package.json' -g 'go.mod' -g 'Cargo.toml' -g 'pyproject.toml' -g 'README*'" in /workspace/tellsh
 succeeded in 0ms:
/workspace/tellsh
review/032-r2-claude.md
review/032-r2-codex.md
review/032-r1-codex.md
review/032-r1-claude.md
data/tldr/README.md
hybrid/package/tellsh-model-enc/README.md
hybrid/package/tellsh-model-enc/package.json
README.md
package.json

exec
/bin/bash -lc 'for p in /AGENTS.md /workspace/AGENTS.md /workspace/tellsh/AGENTS.md; do if [ -f "$p" ]; then cat "$p"; fi; done
cat package.json
cat review/032-r2-claude.md
sed -n '"'1,180p' review/032-r2-codex.md
cat review/032-r1-claude.md" in /workspace/tellsh
 succeeded in 0ms:
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
## tellsh 0.3.2, round 2 review: the four r1 majors are fixed; the remaining issues are minor and none can run a command

I reviewed `git diff 080b628..HEAD`. `test/regressions28.test.js` passes (12/12). I also ran the real CLI under a pty on the composed high-risk `ls -l -t -r` suggestion, timing each key from when the prompt appears. I made no changes to the repo; the test scripts are in `/tmp/r2`.

### r1 majors: all fixed, and confirmed under the pty
| r1 issue | Fix | Pty result |
|---|---|---|
| An Enter typed before the prompt runs the command | `readKey` ignores all input for the first 150 ms after the prompt appears, except Ctrl+C and Ctrl+D (`src/cli.js:248`) | Two Enters sent before the prompt: nothing ran, still waiting |
| `\n` / `\r\n` confirm | Only a chunk that is exactly `\r` runs | LF after the prompt: still waiting |
| Results depend on how stdin splits into chunks | Escape state carries across chunks; an abort key anywhere in a chunk aborts | `x\x03` and `n\r` abort; an arrow split across chunks doesn't abort (unit test) |
| Bracketed paste can confirm | Bracketed paste is enabled (`?2004h`, turned off again in `done`); paste content is ignored across chunks | Paste content containing `\r` and `q` is ignored; a later deliberate Enter runs |

A deliberate Enter 300 ms after the prompt runs the command, as intended. One Enter 20 ms after the prompt is swallowed, which is the intended safe behaviour. Raw mode and bracketed paste are reset on every path that resolves. The catastrophic retype prompt runs after `done()`, so bracketed paste is already off by then.

### MINOR
1. **`src/cli.js:198`: if the paste-end marker is split across two chunks, the prompt gets stuck in paste mode.** The code looks for the whole `\x1b[201~` inside one chunk. If one chunk ends with `\x1b[20` and the next starts with `1~`, `state.paste` never clears. After that, Enter, Esc, `n` and `q` are all ignored, so only Ctrl+C works, even though the prompt says "Esc abort". I reproduced this under the pty: Esc, `n` and Enter all did nothing. It fails safe, but it's a hang that large pastes can trigger. **Fix:** keep the last 5 characters of the paste in state and search them together with the next chunk.
2. **`src/cli.js:248` and `CHANGELOG.md:9`: Esc, `n` and `q` are silently ignored in the first 150 ms.** The comment ("an abort key in it still aborts") and the CHANGELOG ("an abort key anywhere in a burst aborts") promise more than the code does: only Ctrl+C and Ctrl+D count in that window. Under the pty, Esc or `n` pressed 50 ms after the prompt did nothing. That's a real case: someone sees the red line and hits Esc straight away. It's safe, because nothing runs, but the user has to press the key again. **Fix:** let all abort keys abort in that window too, only ignoring Enter and `e` there. Otherwise, correct the comment and the CHANGELOG.
3. **`src/cli.js:213` with `:251`: Esc followed quickly by another key loses the Esc.** If Esc and then Enter arrive within 60 ms, the pair is read as Alt+Enter (`i += 2`), and the abort timer has already been cleared. Under the pty, Esc then Enter 20 ms later was ignored, and the next Enter ran the command. It never runs on its own, but the user's abort is lost. **Fix:** treat ESC followed by `\r`, `\x1b` or a control character as an abort, not as Alt+key.

### NIT
- `src/cli.js:208`: a CSI sequence accepts any byte below 0x40 until a final byte arrives, including `\r` and control characters. Esc then `[` and Enter therefore stays pending until a letter such as `n` ends the "sequence", and that letter is swallowed. Valid parameter and intermediate bytes are only 0x20–0x3F, so anything else should end the sequence.
- Holding Enter down (autorepeat starts after about 250–600 ms) can still confirm once the 150 ms window has passed. This is acceptable, given the owner's decision that Enter runs at every risk level.
- If the process is killed by SIGTERM while waiting for the key, bracketed paste is never turned off (`\x1b[?2004l`). Most shells re-enable or ignore it, so this is cosmetic.

### r1 minors and nits: all fixed
- The REPLAY text is updated.
- The composed warning is now red, and the CHANGELOG matches.
- `confirmRule` no longer has the redundant condition.
- The `danger.js` comment is updated.
- `HELP` lists `n` / `q` and the README mentions both.
- The README diagram's trailing spaces are gone.

VERDICT: APPROVE
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
session id: 01a12cd3-9437-7fa0-9c2d-a1982d9b629a
--------
user
Re-review (round 2) of tellsh release 0.3.2 in /workspace/tellsh: git diff 080b628..HEAD (r1 reviews in review/032-r1-claude.md and review/032-r1-codex.md; last commit addresses them). Change: interactive prompt is a single raw-mode keypress: Enter runs at every risk level (explicit owner decision, not a finding), Esc / Ctrl+C / Ctrl+D / n / q abort, e edits; medium yellow / high+composed+unrated red warning; incomplete never runs; catastrophic still retyped; --yes unchanged. Verify the r1 majors are fixed (typed-ahead Enter, \n, chunk boundaries, bracketed paste) and look for new issues. Read-only. Findings with severity and file:line. End with exactly one line 'VERDICT: APPROVE' (no blocker/major) or 'VERDICT: REQUEST_CHANGES'.
codex
I’ll read both round 1 reviews, check the diff, and verify the raw-key prompt fixes with focused read-only checks.
exec
/bin/bash -lc "pwd && rg --files -g 'AGENTS.md' -g '*032-r1*' -g 'package.json' -g '*prompt*' -g '*confirm*' -g '*test*' -g '*spec*'" in /workspace/tellsh
 succeeded in 0ms:
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
test/matrix.test.js
test/regressions3-history.test.js
test/regressions17.test.js
test/pipeline.test.js
test/regressions25.test.js
test/danger.test.js
test/regressions2.test.js
test/regressions8.test.js
test/regressions30.test.js
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
hybrid/package/tellsh-model-enc/package.json
review/031-r8-prompt.txt
review/032-r1-codex.md
review/032-r1-claude.md
review/031-r9-prompt.txt
package.json

exec
/bin/bash -lc 'git status --short && git log --oneline -6 && git diff --stat 080b628..HEAD' in /workspace/tellsh
 succeeded in 0ms:
?? review/032-r2-claude.md
?? review/032-r2-codex.md
c70b837 cli: r1 review fixes — only a lone \r confirms, typed-ahead input discarded, bracketed paste ignored, keys decoded across chunks, aborts anywhere in a burst; composed warning red; replay/danger texts
7b0165a release 0.3.2: version bump, changelog, README prompt docs
969fd9e cli: 0.3.2 UX — Enter runs at every risk level, Esc/Ctrl+C abort, colored warning for medium/high/composed
080b628 review: 0.3.1 r9 dual LGTM
745a432 cmd: function-template q takes explicit slot role (r8 Codex RC: equal path+pattern no longer rewritten)
d605e2d cmd: non-path values ending in \ are a gap instead of being rewritten; C:\. and \. critical
 CHANGELOG.md               |   14 +
 README.md                  |   21 +-
 package.json               |    2 +-
 review/032-r1-claude.md    |   40 +
 review/032-r1-codex.md     | 3210 ++++++++++++++++++++++++++++++++++++++++++++
 src/cli.js                 |  124 +-
 src/danger.js              |    4 +-
 src/pipeline.js            |    2 +-
 test/regressions28.test.js |   48 +-
 9 files changed, 3415 insertions(+), 50 deletions(-)

exec
/bin/bash -lc 'for p in /AGENTS.md /workspace/AGENTS.md /workspace/tellsh/AGENTS.md; do if [ -f "$p" ]; then cat "$p"; fi; done' in /workspace/tellsh
 succeeded in 0ms:
exec
/bin/bash -lc "cat review/032-r1-claude.md && sed -n '1,230p' review/032-r1-codex.md" in /workspace/tellsh
 succeeded in 0ms:
## tellsh 0.3.2 review: one major problem; I recommend changes before release

I reviewed `git diff 080b628..HEAD`. `test/regressions28.test.js` passes (12/12). I tested the Enter-before-the-prompt behaviour with a real terminal: a small Node script, driven from Python, uses the same set-raw-mode-then-read sequence as `readKey`.

### MAJOR — An Enter pressed before the prompt runs the command, at any risk level
**`src/cli.js:177` (`decideKey` accepts `'\n'`), `src/cli.js:186-205` (`readKey`)**

Before the prompt appears, the terminal is in normal line mode, which turns an Enter keypress into `\n`. Switching to raw mode later doesn't throw that buffered input away. So a keypress made while the model loads or the suggestion prints sits waiting. `readKey` reads it as its first chunk, `decideKey('\n')` returns `'run'`, and the command runs.

I reproduced this: with a pty, I wrote `\r` while the process was still in line mode, then switched to raw mode and read. The process received `"\n"`.

How it happens:
- Someone runs `tellsh delete old logs` and presses Enter twice, or presses Enter while the model loads.
- Someone pastes a line that ends in two newlines.

Either way, a high-risk or composed command runs before the warning line or the command itself has been on screen. In 0.3.1 the same stray Enter could only run a safe command, because medium needed `y` and high needed `yes`. This is separate from the "Enter runs at every level" decision: the user never had a chance to read the warning that the new UX relies on.

Only catastrophic commands are protected, because the retype step still applies.

**Fix:** accept only `'\r'` as Enter. In raw mode, Enter sends `\r`, and Ctrl+J is the only key that sends `\n`. Also drop `'\r\n'`. The cleaner option is to also discard anything already buffered: ignore `data` that arrives within about 50–100 ms of `setRawMode(true)`, or read and throw away pending input before printing the prompt. Add a test that `decide('\n')` doesn't return `'run'`.

### MINOR
1. **`src/pipeline.js:414`** — The REPLAY warning that users see still says "…; needs an explicit yes". Every history-replay command prints this, which is now wrong.
2. **CHANGELOG.md / `confirmRule` (`src/cli.js:167-169`)** — The changelog says composed commands show a yellow "experimental" line. But composed commands are always at least high (`compose.js:548`, plus the trust rule), and `confirmRule` checks for high before it checks for composed. So the yellow Experimental warning can never appear; users get the red "High risk" line, which is what the README example shows. Either check composed first, or fix the CHANGELOG and the `confirmRule` comment.
3. **`src/cli.js:167`** — `risk === 'high' || (risk !== 'safe' && risk !== 'medium')` repeats itself; the second half already covers `'high'`. Harmless, but it hides the "unknown rating counts as high" intent.

### NIT
- `src/danger.js:718` and `:940` — the comments still say an explicit "yes" is required.
- The `HELP` text (`src/cli.js:45`) doesn't list `n` / `q` as abort keys; the README mentions `n` but not `q`.
- README pipeline diagram ("· risk high · red warning   ") has trailing spaces.
- Several keys arriving in one chunk (fast typing, or a paste such as `n\r`) are ignored rather than aborting. That's safe, but the user may have to press a key again.

### Checked and fine
- Raw mode is put back the way it was (`wasRaw`) on every path that resolves, and Node itself resets the terminal if the process exits on a signal.
- Ctrl+C (`\x03`) and Ctrl+D abort. A lone Esc aborts and arrow keys or F-keys are ignored. If a slow link splits an escape sequence, the worst case is an unwanted abort, which is the safe direction.
- Incomplete commands: Enter maps to `edit`, and the `action !== 'run' || incomplete` check backs that up.
- The catastrophic-command retype still uses line-mode input and isn't affected by buffered keystrokes.
- With no TTY, or with `--yes`, the behaviour hasn't changed.

VERDICT: REQUEST_CHANGES
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
## tellsh 0.3.2 review: one major problem; I recommend changes before release

I reviewed `git diff 080b628..HEAD`. `test/regressions28.test.js` passes (12/12). I tested the Enter-before-the-prompt behaviour with a real terminal: a small Node script, driven from Python, uses the same set-raw-mode-then-read sequence as `readKey`.

### MAJOR — An Enter pressed before the prompt runs the command, at any risk level
**`src/cli.js:177` (`decideKey` accepts `'\n'`), `src/cli.js:186-205` (`readKey`)**

Before the prompt appears, the terminal is in normal line mode, which turns an Enter keypress into `\n`. Switching to raw mode later doesn't throw that buffered input away. So a keypress made while the model loads or the suggestion prints sits waiting. `readKey` reads it as its first chunk, `decideKey('\n')` returns `'run'`, and the command runs.

I reproduced this: with a pty, I wrote `\r` while the process was still in line mode, then switched to raw mode and read. The process received `"\n"`.

How it happens:
- Someone runs `tellsh delete old logs` and presses Enter twice, or presses Enter while the model loads.
- Someone pastes a line that ends in two newlines.

Either way, a high-risk or composed command runs before the warning line or the command itself has been on screen. In 0.3.1 the same stray Enter could only run a safe command, because medium needed `y` and high needed `yes`. This is separate from the "Enter runs at every level" decision: the user never had a chance to read the warning that the new UX relies on.

Only catastrophic commands are protected, because the retype step still applies.

**Fix:** accept only `'\r'` as Enter. In raw mode, Enter sends `\r`, and Ctrl+J is the only key that sends `\n`. Also drop `'\r\n'`. The cleaner option is to also discard anything already buffered: ignore `data` that arrives within about 50–100 ms of `setRawMode(true)`, or read and throw away pending input before printing the prompt. Add a test that `decide('\n')` doesn't return `'run'`.

### MINOR
1. **`src/pipeline.js:414`** — The REPLAY warning that users see still says "…; needs an explicit yes". Every history-replay command prints this, which is now wrong.
2. **CHANGELOG.md / `confirmRule` (`src/cli.js:167-169`)** — The changelog says composed commands show a yellow "experimental" line. But composed commands are always at least high (`compose.js:548`, plus the trust rule), and `confirmRule` checks for high before it checks for composed. So the yellow Experimental warning can never appear; users get the red "High risk" line, which is what the README example shows. Either check composed first, or fix the CHANGELOG and the `confirmRule` comment.
3. **`src/cli.js:167`** — `risk === 'high' || (risk !== 'safe' && risk !== 'medium')` repeats itself; the second half already covers `'high'`. Harmless, but it hides the "unknown rating counts as high" intent.

### NIT
- `src/danger.js:718` and `:940` — the comments still say an explicit "yes" is required.
- The `HELP` text (`src/cli.js:45`) doesn't list `n` / `q` as abort keys; the README mentions `n` but not `q`.
- README pipeline diagram ("· risk high · red warning   ") has trailing spaces.
- Several keys arriving in one chunk (fast typing, or a paste such as `n\r`) are ignored rather than aborting. That's safe, but the user may have to press a key again.

### Checked and fine
- Raw mode is put back the way it was (`wasRaw`) on every path that resolves, and Node itself resets the terminal if the process exits on a signal.
- Ctrl+C (`\x03`) and Ctrl+D abort. A lone Esc aborts and arrow keys or F-keys are ignored. If a slow link splits an escape sequence, the worst case is an unwanted abort, which is the safe direction.
- Incomplete commands: Enter maps to `edit`, and the `action !== 'run' || incomplete` check backs that up.
- The catastrophic-command retype still uses line-mode input and isn't affected by buffered keystrokes.
- With no TTY, or with `--yes`, the behaviour hasn't changed.

VERDICT: REQUEST_CHANGES

exec
/bin/bash -lc 'git diff 080b628..HEAD -- src/cli.js src/danger.js src/pipeline.js test/regressions28.test.js README.md CHANGELOG.md package.json' in /workspace/tellsh
 succeeded in 0ms:
diff --git a/CHANGELOG.md b/CHANGELOG.md
new file mode 100644
index 0000000..be88341
--- /dev/null
+++ b/CHANGELOG.md
@@ -0,0 +1,14 @@
+# Changelog
+
+## 0.3.2
+
+**Prompt (UX).** A single keypress: **Enter runs the command at every risk level** (no more `y` / `yes`), **Esc** or
+**Ctrl+C** (also Ctrl+D, `n`, `q`) aborts, `e` edits. Medium-risk commands show a yellow warning line, high-risk, unrated
+and composed (experimental) ones a red one, before the prompt. Only a deliberate Enter runs: keys typed or pasted while
+the suggestion is computed are discarded, `\n` (Ctrl+J), an Enter inside a burst of keys and bracketed-paste content
+never confirm, and an abort key anywhere in a burst aborts. Commands that match a catastrophic
+pattern (`rm -rf /`, `mkfs`, `Format-Volume`, …) still have to be typed again in full. An incomplete command (a
+`<PLACEHOLDER>` left) never runs: Enter opens the editor. `--yes` is unchanged (safe catalog commands only).
+
+The model, catalog and templates are unchanged from 0.3.1 (new catalog templates are in progress on
+`feat/templates-catalog` and need a retrain that passes the full test suite).
diff --git a/README.md b/README.md
index 6628c77..6c45391 100644
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
+readline), **Esc** / **Ctrl+C** (or **n** / **q**) aborts; keys typed ahead or pasted never confirm. Medium- and high-risk and composed commands print a colored warning line
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
diff --git a/src/cli.js b/src/cli.js
index c0432fb..bacab01 100644
--- a/src/cli.js
+++ b/src/cli.js
@@ -42,9 +42,10 @@ Options:
   -v, --version     print version
   -h, --help        this help
 
-At the prompt: [Enter] runs a safe command · e edit · n abort. Medium-risk commands never run on a
-plain Enter: type "y". High-risk and composed (experimental) commands require typing "yes". Without a TTY
-(piped), tellsh only prints the command unless --yes is given.`;
+At the prompt: [Enter] runs the command at every risk level · e edit · Esc, Ctrl+C, n or q aborts. Medium-
+and high-risk (and composed, experimental) commands show a colored warning first; commands that could
+destroy the system must be typed again. Without a TTY (piped), tellsh only prints the command unless
+--yes is given.`;
 
 const C = process.stdout.isTTY && !process.env.NO_COLOR
   ? { dim: (s) => `\x1b[2m${s}\x1b[0m`, bold: (s) => `\x1b[1m${s}\x1b[0m`, red: (s) => `\x1b[31m${s}\x1b[0m`,
@@ -156,21 +157,110 @@ function printSuggestion(s, opts) {
 }
 
 /**
- * The prompt and the answer a command needs at its risk: safe runs on Enter (or y/yes); medium never runs on a plain
- * Enter, it needs an explicit "y"; high and composed (experimental) need the word "yes". `tak`/`t` are the Polish forms.
- * -> { prompt, accepts(answer) }
+ * The prompt and warning for a command at its risk (0.3.2): [Enter] runs at EVERY risk level, Esc / Ctrl+C / Ctrl+D /
+ * n / q aborts, e edits. Medium risk shows a yellow warning line; high, unrated and composed (experimental, always high)
+ * a red one. An incomplete command (placeholder left) never runs: Enter opens the editor instead.
+ * -> { warning, prompt, decide(chunk, state) } (see decideChunk)
  */
 export function confirmRule(risk, { composed = false, incomplete = false } = {}) {
-  const ans = (a) => String(a ?? '').trim().toLowerCase();
-  // a placeholder is left: it is edited first, never run as is
-  if (incomplete) return { prompt: 'e edit · n abort: ', accepts: () => false };
-  // an unknown rating is treated as high
-  if (composed || (risk !== 'safe' && risk !== 'medium')) {
-    return { prompt: `${risk === 'high' ? C.red('High risk.') : C.yellow('Experimental.')} Type "yes" to run, e to edit, anything else aborts: `,
-      accepts: (a) => ['yes', 'tak'].includes(ans(a)) };
+  let warning = null;
+  if (composed) warning = C.red('! High risk, experimental (composed) command: check it before pressing Enter.');
+  else if (risk === 'medium') warning = C.yellow('! Medium risk: check the command before pressing Enter.');
+  else if (risk !== 'safe') warning = C.red('! High risk: check the command before pressing Enter.'); // unknown rating = high
+  const prompt = incomplete ? '[Enter]/e edit · Esc abort ' : '[Enter] run · e edit · Esc abort ';
+  return { warning, prompt, decide: (chunk, state) => decideChunk(chunk, incomplete, state) };
+}
+
+const PASTE_START = '\x1b[200~';
+const PASTE_END = '\x1b[201~';
+// the longest tail of `s` that is a proper prefix of `marker` (kept for the next chunk)
+const markerTail = (s, marker) => { for (let n = Math.min(marker.length - 1, s.length); n > 0; n--) if (marker.startsWith(s.slice(-n))) return s.slice(-n); return ''; };
+/**
+ * One raw stdin chunk -> 'run' | 'edit' | 'abort' | 'pending-esc' | null (keep waiting). Deliberately strict, because
+ * Enter runs high-risk commands. `state` ({ paste, pend, armed }) carries a bracketed paste, an unfinished escape
+ * sequence or paste marker across chunks; `armed: false` (the first moments after the prompt) never confirms.
+ *  - only a chunk that is exactly one carriage return confirms (`\n` / Ctrl+J, `\r\n` and an Enter inside a burst of
+ *    other keys, i.e. typed ahead or pasted, never do); `e` edits only as a chunk of its own;
+ *  - bracketed paste content is ignored (except Ctrl+C), also when the markers are split across chunks;
+ *  - an abort key (Ctrl+C, Ctrl+D, Esc, n, q) anywhere outside a paste aborts at once, also before the prompt is armed;
+ *  - escape sequences (arrows, F-keys) are skipped; Esc followed by Enter, Esc or a control key, or a malformed
+ *    sequence, is an Esc (abort); a chunk ending in a bare ESC is 'pending-esc' (the caller aborts unless the rest of
+ *    a sequence follows within a short delay).
+ */
+export function decideChunk(chunk, incomplete = false, state = {}) {
+  const armed = state.armed !== false;
+  const k = (state.pend || '') + String(chunk ?? '');
+  state.pend = '';
+  if (k.includes('\x03')) return 'abort';
+  if (!state.paste && armed && k === '\r') return incomplete ? 'edit' : 'run';
+  if (!state.paste && armed && (k === 'e' || k === 'E')) return 'edit';
+  let i = 0;
+  while (i < k.length) {
+    if (state.paste) {
+      const j = k.indexOf(PASTE_END, i);
+      if (j < 0) { state.pend = markerTail(k.slice(i), PASTE_END); return null; }
+      state.paste = false; i = j + PASTE_END.length; continue;
+    }
+    const c = k[i];
+    if (c === '\x1b') {
+      if (i + 1 >= k.length) { state.pend = '\x1b'; return 'pending-esc'; }
+      const n = k[i + 1];
+      if (n === '[' || n === 'O') {
+        let j = i + 2;
+        while (j < k.length && k.charCodeAt(j) >= 0x20 && k.charCodeAt(j) <= 0x3f) j++;
+        if (j >= k.length) { state.pend = k.slice(i); return null; } // the sequence continues in the next chunk
+        const f = k.charCodeAt(j);
+        if (!(f >= 0x40 && f <= 0x7e)) return 'abort'; // Esc, then other keys
+        if (k.slice(i, j + 1) === PASTE_START) state.paste = true;
+        i = j + 1; continue;
+      }
+      if (n === '\x1b' || k.charCodeAt(i + 1) < 0x20 || n === '\x7f') return 'abort';
+      i += 2; continue; // Alt+key
+    }
+    if (c === '\x04' || c === 'n' || c === 'N' || c === 'q' || c === 'Q') return 'abort';
+    i++;
   }
-  if (risk === 'medium') return { prompt: `${C.yellow('Medium risk.')} Type y to run, e to edit, anything else aborts: `, accepts: (a) => ['y', 'yes', 't', 'tak'].includes(ans(a)) };
-  return { prompt: '[Enter] run · e edit · n abort: ', accepts: (a) => ['', 'y', 'yes', 't', 'tak'].includes(ans(a)) };
+  return null;
+}
+
+/** Wait for a single deliberate key in raw mode (no line buffering, no echo). Typed-ahead input is discarded. */
+function readKey(rule) {
+  return new Promise((res) => {
+    const input = process.stdin;
+    const out = process.stdout;
+    const wasRaw = input.isRaw;
+    const state = { paste: false, pend: '', armed: false };
+    let escTimer = null;
+    let ready = false;
+    let armTimer = null;
+    input.setRawMode(true);
+    out.write('\x1b[?2004h'); // bracketed paste on
+    out.write(rule.prompt);
+    const done = (action) => {
+      clearTimeout(escTimer);
+      clearTimeout(armTimer);
+      input.removeListener('data', onData);
+      out.write('\x1b[?2004l');
+      input.setRawMode(wasRaw);
+      input.pause();
+      out.write('\n');
+      res(action);
+    };
+    const onData = (buf) => {
+      const s = buf.toString('utf8');
+      // input that was already waiting (typed or pasted while the suggestion was computed) is parsed (paste state,
+      // abort keys) but never confirms: state.armed is false until the prompt has been shown for a moment
+      clearTimeout(escTimer);
+      state.armed = ready;
+      const action = rule.decide(s, state);
+      if ((action === 'run' || action === 'edit') && !ready) return;
+      if (action === 'pending-esc') { escTimer = setTimeout(() => done('abort'), 60); return; }
+      if (action) done(action);
+    };
+    input.on('data', onData);
+    input.resume();
+    armTimer = setTimeout(() => { ready = true; }, 150);
+  });
 }
 
 export async function main(argv = process.argv.slice(2)) {
@@ -251,10 +341,9 @@ export async function main(argv = process.argv.slice(2)) {
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
@@ -266,8 +355,7 @@ export async function main(argv = process.argv.slice(2)) {
       for (const w of d.warnings) process.stdout.write(riskColor(risk)(`  ! ${w}`) + '\n');
       continue;
     }
-    if (incomplete) { if (ans === '') continue; return 130; }
-    if (!rule.accepts(ans)) { console.log('aborted'); return 130; }
+    if (action !== 'run' || incomplete) { console.log('aborted'); return 130; }
     if (critical) {
       const rl2 = createInterface({ input: process.stdin, output: process.stdout });
       const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
diff --git a/src/danger.js b/src/danger.js
index 7530e7d..1631d7a 100644
--- a/src/danger.js
+++ b/src/danger.js
@@ -936,8 +936,8 @@ export function assessCommand(command, baseRisk = 'safe', { lenient = false, all
 // ---------------------------------------------------------------------------------------------
 // Trust rule (v0.3 close3). A command is rated safe ONLY when it is byte-identical to a render of a catalog template whose
 // intent is risk=safe, with slot values that are plain literals (plainSlotValue). Anything else (composer output, a
-// history replay, a user edit, an unknown program, a construct the parser does not read) is at least high and needs an
-// explicit "yes"; --yes never runs it. The parser above only raises risk, never lowers it: it adds the reasons and
+// history replay, a user edit, an unknown program, a construct the parser does not read) is at least high and shows a red
+// warning before the prompt; --yes never runs it. The parser above only raises risk, never lowers it: it adds the reasons and
 // catches what must be retyped (critical), but a command it finds nothing wrong with is still not trusted.
 
 export const UNTRUSTED = 'not a catalog command rendered by tellsh with plain values (edited, composed, from history or unknown); it is not checked as safe';
diff --git a/src/pipeline.js b/src/pipeline.js
index 026190a..f24eb2d 100644
--- a/src/pipeline.js
+++ b/src/pipeline.js
@@ -411,7 +411,7 @@ export function suggest(query, opts = {}) {
 
 // the trust rule (danger.js): a command resolved from history (a reference, "same but …", a value from an earlier
 // command) is a replay, not a fresh render of what the request says: at least high, never auto-run
-const REPLAY = 'resolved from history (a replay of an earlier command, not a fresh catalog render); needs an explicit yes';
+const REPLAY = 'resolved from history (a replay of an earlier command, not a fresh catalog render); high risk: read it before pressing Enter';
 function replayFloor(s) {
   if (!s?.command || s.method !== 'history-rule' || s.risk === 'high') return s;
   return { ...s, risk: maxRisk(s.risk, 'high'), warnings: [REPLAY, ...(s.warnings || [])] };
diff --git a/test/regressions28.test.js b/test/regressions28.test.js
index 529ff60..e5e8bb8 100644
--- a/test/regressions28.test.js
+++ b/test/regressions28.test.js
@@ -89,22 +89,57 @@ test('paths: the one-argument and the several-argument forms agree', () => {
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
+    const d = (k, st = {}) => confirmRule(r).decide(k, st);
+    assert.equal(d('\r'), 'run', String(r));
+    for (const k of ['\x03', '\x04', 'n', 'q', 'x\x03', 'n\r', '\x1b\x1b']) assert.equal(d(k), 'abort', `${r} ${JSON.stringify(k)}`);
+    assert.equal(d('\x1b'), 'pending-esc'); // lone Esc: the caller aborts unless a sequence follows
+    assert.equal(d('e'), 'edit');
+    // review r1: \n (Ctrl+J), \r\n, an Enter inside a burst, arrows, typed words never run
+    for (const k of ['\n', '\r\n', 'ls\r', '\r\r', '\x1b[A', 'y', 'yes', 'x', ' ']) assert.equal(d(k), null, `${r} ${JSON.stringify(k)}`);
+  }
+  const rule = confirmRule('high');
+  // an arrow split across chunks is not an Esc
+  let st = {};
+  assert.equal(rule.decide('\x1b', st), 'pending-esc');
+  assert.equal(rule.decide('[A', st), null);
+  st = {};
+  assert.equal(rule.decide('\x1b[', st), null);
+  assert.equal(rule.decide('A', st), null);
+  // bracketed paste: contents (newlines, n, q, Esc) are ignored across chunks; Enter after the paste runs
+  st = {};
+  assert.equal(rule.decide('\x1b[200~rm -rf x\r', st), null);
+  assert.equal(rule.decide('\r', st), null);
+  assert.equal(rule.decide('more\nq\x1b[201~', st), null);
+  assert.equal(rule.decide('\r', st), 'run');
+  assert.equal(rule.decide('\x1b[200~text\x03', {}), 'abort');
+  // review r2: an abort before a paste starts is kept; split paste-end marker; a paste begun before the prompt is
+  // armed stays a paste; Esc then Enter / Esc is an abort; malformed sequence aborts; abort keys work unarmed
+  assert.equal(rule.decide('n\x1b[200~text', {}), 'abort');
+  st = {};
+  assert.equal(rule.decide('\x1b[200~text\x1b[201', st), null);
+  assert.equal(rule.decide('~', st), null);
+  assert.equal(st.paste, false);
+  assert.equal(rule.decide('\r', st), 'run');
+  st = { armed: false };
+  assert.equal(rule.decide('\x1b[200~text', st), null);
+  st.armed = true;
+  assert.equal(rule.decide('\r', st), null);
+  assert.equal(rule.decide('\x1b[2', st), null);
+  assert.equal(rule.decide('01~', st), null);
+  assert.equal(rule.decide('\r', st), 'run');
+  for (const k of ['\x1b\r', '\x1b\x1b', '\x1b[\r']) assert.equal(rule.decide(k, {}), 'abort', JSON.stringify(k));
+  for (const k of ['\x1b', 'n', 'q', '\x04']) assert.notEqual(rule.decide(k, { armed: false }), null, JSON.stringify(k));
+  assert.equal(rule.decide('\r', { armed: false }), null);
+  assert.equal(rule.decide('e', { armed: false }), null);
+  assert.equal(confirmRule('safe').warning, null);
+  assert.match(confirmRule('medium').warning, /Medium risk/);
+  assert.match(confirmRule('high').warning, /High risk/);
+  assert.match(confirmRule(undefined).warning, /High risk/);
+  assert.match(confirmRule('high', { composed: true }).warning, /High risk, experimental/);
+  for (const r of ['safe', 'medium', 'high']) assert.equal(confirmRule(r, { incomplete: true }).decide('\r', {}), 'edit', r);
+  // the reviewed medium rows still carry the medium warning
   for (const q of ['chmod 777 /srv/my app', 'move /tmp/old notes to /tmp/archive']) assert.equal(run(q).risk, 'medium', q);
 });
 

exec
/bin/bash -lc "rg -n 'VERDICT|Major|Minor|Blocker|major|minor|Finding|Severity|severity|"'^#'"' review/032-r2-codex.md review/032-r1-codex.md
rg --files src test | head -100" in /workspace/tellsh
 succeeded in 0ms:
review/032-r2-codex.md:14:Re-review (round 2) of tellsh release 0.3.2 in /workspace/tellsh: git diff 080b628..HEAD (r1 reviews in review/032-r1-claude.md and review/032-r1-codex.md; last commit addresses them). Change: interactive prompt is a single raw-mode keypress: Enter runs at every risk level (explicit owner decision, not a finding), Esc / Ctrl+C / Ctrl+D / n / q abort, e edits; medium yellow / high+composed+unrated red warning; incomplete never runs; catastrophic still retyped; --yes unchanged. Verify the r1 majors are fixed (typed-ahead Enter, \n, chunk boundaries, bracketed paste) and look for new issues. Read-only. Findings with severity and file:line. End with exactly one line 'VERDICT: APPROVE' (no blocker/major) or 'VERDICT: REQUEST_CHANGES'.
review/032-r2-codex.md:100:## tellsh 0.3.2 review: one major problem; I recommend changes before release
review/032-r2-codex.md:104:### MAJOR — An Enter pressed before the prompt runs the command, at any risk level
review/032-r2-codex.md:121:### MINOR
review/032-r2-codex.md:126:### NIT
review/032-r2-codex.md:132:### Checked and fine
review/032-r2-codex.md:139:VERDICT: REQUEST_CHANGES
review/032-r2-codex.md:153:Review of tellsh release 0.3.2 (git diff 080b628..HEAD in /workspace/tellsh; mainly src/cli.js prompt, README, CHANGELOG, test/regressions28.test.js). Change: the interactive prompt is now a single raw-mode keypress: Enter runs the command at every risk level (no y/yes), Esc / Ctrl+C / n / q abort, e edits; medium/high/composed/unrated show a colored warning line; incomplete commands never run (Enter opens editor); catastrophic commands still require retyping the full command; --yes unchanged. This UX is an explicit product decision by the owner, do not flag it as a finding by itself; review correctness, terminal handling (raw mode restore, escape sequences, Ctrl+C, paste, non-TTY), safety regressions, docs consistency. Read-only. Findings with severity and file:line. End with exactly one line 'VERDICT: APPROVE' (no blocker/major) or 'VERDICT: REQUEST_CHANGES'.
review/032-r2-codex.md:678:-test('final3-claude major: a medium-risk command never runs on a plain Enter', () => {
review/032-r2-codex.md:734:# Subtest: --history=FILE resolves references and never echoes the history
review/032-r2-codex.md:752:# Subtest: composed commands are labelled experimental and refused by --yes
review/032-r2-codex.md:778:# tests 13
review/032-r2-codex.md:779:# suites 0
review/032-r2-codex.md:780:# pass 1
review/032-r2-codex.md:781:# fail 12
review/032-r2-codex.md:782:# cancelled 0
review/032-r2-codex.md:783:# skipped 0
review/032-r2-codex.md:784:# todo 0
review/032-r2-codex.md:785:# duration_ms 7546.786151
review/032-r2-codex.md:853:1. **Major — [src/cli.js:200](/workspace/tellsh/src/cli.js:200): cancellation depends on stdin chunk boundaries.** Each `data` chunk is treated as one key. PTY inputs `x\x03` and `n\r` are ignored, so Ctrl+C/n fails to abort; a subsequent Enter still executes the command. Conversely, an arrow sequence split after ESC aborts unexpectedly. Decode keys across chunks and add PTY coverage for batched and fragmented input.
review/032-r2-codex.md:855:2. **Major — [src/cli.js:177](/workspace/tellsh/src/cli.js:177): pasted newlines can execute commands.** The reader has no paste state. Sending a bracketed paste start and text, followed by a standalone newline chunk, executes the suggestion before the paste ends. Reproduced with a high-risk composed `ls` command without pressing Enter separately. Enable and track bracketed paste, suppressing confirmation actions within its contents.
review/032-r2-codex.md:857:3. **Minor — [CHANGELOG.md:7](/workspace/tellsh/CHANGELOG.md:7): composed-warning description differs from implementation.** Composed commands are high risk, so the high-risk branch produces a red warning; the yellow experimental branch is bypassed. The README example correctly shows red. Align the changelog with that behavior.
review/032-r2-codex.md:861:VERDICT: REQUEST_CHANGES
review/032-r2-codex.md:864:1. **Major — [src/cli.js:200](/workspace/tellsh/src/cli.js:200): cancellation depends on stdin chunk boundaries.** Each `data` chunk is treated as one key. PTY inputs `x\x03` and `n\r` are ignored, so Ctrl+C/n fails to abort; a subsequent Enter still executes the command. Conversely, an arrow sequence split after ESC aborts unexpectedly. Decode keys across chunks and add PTY coverage for batched and fragmented input.
review/032-r2-codex.md:866:2. **Major — [src/cli.js:177](/workspace/tellsh/src/cli.js:177): pasted newlines can execute commands.** The reader has no paste state. Sending a bracketed paste start and text, followed by a standalone newline chunk, executes the suggestion before the paste ends. Reproduced with a high-risk composed `ls` command without pressing Enter separately. Enable and track bracketed paste, suppressing confirmation actions within its contents.
review/032-r2-codex.md:868:3. **Minor — [CHANGELOG.md:7](/workspace/tellsh/CHANGELOG.md:7): composed-warning description differs from implementation.** Composed commands are high risk, so the high-risk branch produces a red warning; the yellow experimental branch is bypassed. The README example correctly shows red. Align the changelog with that behavior.
review/032-r2-codex.md:872:VERDICT: REQUEST_CHANGES
review/032-r2-codex.md:1823:# Changelog
review/032-r2-codex.md:1825:## 0.3.2
review/032-r2-codex.md:1970:test('final3-claude major: an unquoted path with spaces is never cut at its first space', () => {
review/032-r2-codex.md:1992:test('final3-claude major: a path whose end is unclear is a placeholder with a warning', () => {
review/032-r2-codex.md:2021:# Subtest: /workspace/tellsh/test/regressions28.test.js
review/032-r2-codex.md:2027:# tests 1
review/032-r2-codex.md:2028:# suites 0
review/032-r2-codex.md:2029:# pass 1
review/032-r2-codex.md:2030:# fail 0
review/032-r2-codex.md:2031:# cancelled 0
review/032-r2-codex.md:2032:# skipped 0
review/032-r2-codex.md:2033:# todo 0
review/032-r2-codex.md:2034:# duration_ms 1617.674531
review/032-r2-codex.md:2290:# Subtest: /workspace/tellsh/test/compose.test.js
review/032-r2-codex.md:2295:# Subtest: /workspace/tellsh/test/danger.test.js
review/032-r2-codex.md:2300:# Subtest: /workspace/tellsh/test/regressions27.test.js
review/032-r2-codex.md:2305:# Subtest: /workspace/tellsh/test/regressions28.test.js
review/032-r2-codex.md:2311:# tests 4
review/032-r2-codex.md:2312:# suites 0
review/032-r2-codex.md:2313:# pass 4
review/032-r2-codex.md:2314:# fail 0
review/032-r2-codex.md:2315:# cancelled 0
review/032-r2-codex.md:2316:# skipped 0
review/032-r2-codex.md:2317:# todo 0
review/032-r2-codex.md:2318:# duration_ms 977.809507
review/032-r2-codex.md:2322:# Subtest: /workspace/tellsh/test/cli.test.js
review/032-r2-codex.md:2334:# tests 1
review/032-r2-codex.md:2335:# suites 0
review/032-r2-codex.md:2336:# pass 0
review/032-r2-codex.md:2337:# fail 1
review/032-r2-codex.md:2338:# cancelled 0
review/032-r2-codex.md:2339:# skipped 0
review/032-r2-codex.md:2340:# todo 0
review/032-r2-codex.md:2341:# duration_ms 4609.200061
review/032-r2-codex.md:2448:#!/usr/bin/env node
review/032-r2-codex.md:2501:# Subtest: /workspace/tellsh/test/compose.test.js
review/032-r2-codex.md:2506:# Subtest: /workspace/tellsh/test/danger.test.js
review/032-r2-codex.md:2511:# Subtest: /workspace/tellsh/test/regressions27.test.js
review/032-r2-codex.md:2516:# Subtest: /workspace/tellsh/test/regressions28.test.js
review/032-r2-codex.md:2522:# tests 4
review/032-r2-codex.md:2523:# suites 0
review/032-r2-codex.md:2524:# pass 4
review/032-r2-codex.md:2525:# fail 0
review/032-r2-codex.md:2526:# cancelled 0
review/032-r2-codex.md:2527:# skipped 0
review/032-r2-codex.md:2528:# todo 0
review/032-r2-codex.md:2529:# duration_ms 817.757932
review/032-r2-codex.md:2533:# Subtest: /workspace/tellsh/test/cli.test.js
review/032-r2-codex.md:2545:# tests 1
review/032-r2-codex.md:2546:# suites 0
review/032-r2-codex.md:2547:# pass 0
review/032-r2-codex.md:2548:# fail 1
review/032-r2-codex.md:2549:# cancelled 0
review/032-r2-codex.md:2550:# skipped 0
review/032-r2-codex.md:2551:# todo 0
review/032-r2-codex.md:2552:# duration_ms 4171.23665
review/032-r2-codex.md:2643:# Subtest: --version
review/032-r2-codex.md:2669:# Subtest: --help
review/032-r2-codex.md:2694:# Subtest: --json dry-run (EN)
review/032-r2-codex.md:2699:# Subtest: --json dry-run (PL)
review/032-r2-codex.md:2704:# Subtest: dry-run prints command and never executes
review/032-r2-codex.md:2709:# Subtest: non-TTY without --yes only prints
review/032-r2-codex.md:2734:# Subtest: --yes runs safe commands and passes exit code
review/032-r2-codex.md:2739:# Subtest: --yes refuses non-safe commands
review/032-r2-codex.md:2744:# Subtest: unknown request -> I don't understand + candidates, exit 3
review/032-r2-codex.md:2749:# Subtest: --platform darwin (alias of --os)
review/032-r2-codex.md:2754:# Subtest: --shell powershell / cmd / fish render natively; gaps exit 5
review/032-r2-codex.md:2759:# Subtest: --history=FILE resolves references and never echoes the history
review/032-r2-codex.md:2764:# Subtest: composed commands are labelled experimental and refused by --yes
review/032-r2-codex.md:2770:# tests 13
review/032-r2-codex.md:2771:# suites 0
review/032-r2-codex.md:2772:# pass 0
review/032-r2-codex.md:2773:# fail 3
review/032-r2-codex.md:2774:# cancelled 0
review/032-r2-codex.md:2775:# skipped 10
review/032-r2-codex.md:2776:# todo 0
review/032-r2-codex.md:2777:# duration_ms 1771.626649
review/032-r2-codex.md:2788:# Subtest: final3-claude major: an unquoted path with spaces is never cut at its first space
review/032-r2-codex.md:2789:ok 1 - final3-claude major: an unquoted path with spaces is never cut at its first space # SKIP test name does not match pattern
review/032-r2-codex.md:2793:# Subtest: final3-claude major: a path whose end is unclear is a placeholder with a warning
review/032-r2-codex.md:2794:ok 2 - final3-claude major: a path whose end is unclear is a placeholder with a warning # SKIP test name does not match pattern
review/032-r2-codex.md:2798:# Subtest: paths: words of the request after a path are not part of its name
review/032-r2-codex.md:2803:# Subtest: paths: the composer takes the whole name too, never its first word
review/032-r2-codex.md:2808:# Subtest: paths: the one-argument and the several-argument forms agree
review/032-r2-codex.md:2813:# Subtest: 0.3.2 UX: Enter runs at every risk level, Esc/Ctrl+C abort, medium/high keep a warning
review/032-r2-codex.md:2818:# Subtest: final3-codex major: tools that run project code are at least medium, also for --help
review/032-r2-codex.md:2819:ok 7 - final3-codex major: tools that run project code are at least medium, also for --help # SKIP test name does not match pattern
review/032-r2-codex.md:2823:# Subtest: final3-codex major: an npm workspace is kept, never dropped
review/032-r2-codex.md:2824:ok 8 - final3-codex major: an npm workspace is kept, never dropped # SKIP test name does not match pattern
review/032-r2-codex.md:2828:# Subtest: final3-codex major: a scope npm cannot express is a placeholder, never dropped
review/032-r2-codex.md:2829:ok 9 - final3-codex major: a scope npm cannot express is a placeholder, never dropped # SKIP test name does not match pattern
review/032-r2-codex.md:2833:# Subtest: final3-codex major: an explicit pull request does not hide an unresolved repository
review/032-r2-codex.md:2834:ok 10 - final3-codex major: an explicit pull request does not hide an unresolved repository # SKIP test name does not match pattern
review/032-r2-codex.md:2838:# Subtest: scope mentions: short options belong to one tool
review/032-r2-codex.md:2843:# Subtest: a contested npm script is a placeholder, never the literal marker
review/032-r2-codex.md:2849:# tests 12
review/032-r2-codex.md:2850:# suites 0
review/032-r2-codex.md:2851:# pass 1
review/032-r2-codex.md:2852:# fail 0
review/032-r2-codex.md:2853:# cancelled 0
review/032-r2-codex.md:2854:# skipped 11
review/032-r2-codex.md:2855:# todo 0
review/032-r2-codex.md:2856:# duration_ms 204.831246
review/032-r2-codex.md:2859:The warning colors, incomplete-command editor path, catastrophic retype check, non-TTY behavior, and `--yes` gates check out. Four focused test files pass. The review has two major findings and one minor finding, all reproduced; the CLI suite is limited by subprocess capture in this environment. No files changed.
review/032-r2-codex.md:2912:VERDICT: REQUEST_CHANGES
review/032-r2-codex.md:2923:VERDICT: REQUEST_CHANGES
review/032-r1-codex.md:14:Review of tellsh release 0.3.2 (git diff 080b628..HEAD in /workspace/tellsh; mainly src/cli.js prompt, README, CHANGELOG, test/regressions28.test.js). Change: the interactive prompt is now a single raw-mode keypress: Enter runs the command at every risk level (no y/yes), Esc / Ctrl+C / n / q abort, e edits; medium/high/composed/unrated show a colored warning line; incomplete commands never run (Enter opens editor); catastrophic commands still require retyping the full command; --yes unchanged. This UX is an explicit product decision by the owner, do not flag it as a finding by itself; review correctness, terminal handling (raw mode restore, escape sequences, Ctrl+C, paste, non-TTY), safety regressions, docs consistency. Read-only. Findings with severity and file:line. End with exactly one line 'VERDICT: APPROVE' (no blocker/major) or 'VERDICT: REQUEST_CHANGES'.
review/032-r1-codex.md:231:-test('final3-claude major: a medium-risk command never runs on a plain Enter', () => {
review/032-r1-codex.md:784:test('final3-claude major: an unquoted path with spaces is never cut at its first space', () => {
review/032-r1-codex.md:806:test('final3-claude major: a path whose end is unclear is a placeholder with a warning', () => {
review/032-r1-codex.md:874:test('final3-codex major: tools that run project code are at least medium, also for --help', () => {
review/032-r1-codex.md:897:test('final3-codex major: an npm workspace is kept, never dropped', () => {
review/032-r1-codex.md:916:test('final3-codex major: a scope npm cannot express is a placeholder, never dropped', () => {
review/032-r1-codex.md:929:test('final3-codex major: an explicit pull request does not hide an unresolved repository', () => {
review/032-r1-codex.md:1471:test/regressions11.test.js:26:test('major: wrangler dev runs project build commands: medium risk, never auto-run with --yes', () => {
review/032-r1-codex.md:1474:test/regressions12.test.js:64:test('major: every npx wrangler intent is at least medium risk, never auto-run with --yes', () => {
review/032-r1-codex.md:1484:test/regressions7.test.js:128:test('danger: inline interpreter code, chmod/chown of /, raw disk writes, unknown wrappers (claude r5 minor 5)', () => {
review/032-r1-codex.md:1573:#!/usr/bin/env node
review/032-r1-codex.md:1716:test('final3-claude major: an unquoted path with spaces is never cut at its first space', () => {
review/032-r1-codex.md:1738:test('final3-claude major: a path whose end is unclear is a placeholder with a warning', () => {
review/032-r1-codex.md:1806:test('final3-codex major: tools that run project code are at least medium, also for --help', () => {
review/032-r1-codex.md:1829:test('final3-codex major: an npm workspace is kept, never dropped', () => {
review/032-r1-codex.md:2032:# Subtest: /workspace/tellsh/test/regressions28.test.js
review/032-r1-codex.md:2038:# tests 1
review/032-r1-codex.md:2039:# suites 0
review/032-r1-codex.md:2040:# pass 1
review/032-r1-codex.md:2041:# fail 0
review/032-r1-codex.md:2042:# cancelled 0
review/032-r1-codex.md:2043:# skipped 0
review/032-r1-codex.md:2044:# todo 0
review/032-r1-codex.md:2045:# duration_ms 1078.868769
review/032-r1-codex.md:2049:# Subtest: /workspace/tellsh/test/cli.test.js
review/032-r1-codex.md:2061:# tests 1
review/032-r1-codex.md:2062:# suites 0
review/032-r1-codex.md:2063:# pass 0
review/032-r1-codex.md:2064:# fail 1
review/032-r1-codex.md:2065:# cancelled 0
review/032-r1-codex.md:2066:# skipped 0
review/032-r1-codex.md:2067:# todo 0
review/032-r1-codex.md:2068:# duration_ms 5321.913728
review/032-r1-codex.md:2523:# tellsh
review/032-r1-codex.md:2557:## Install
review/032-r1-codex.md:2567:## Usage
review/032-r1-codex.md:2608:## Accuracy & speed (details: [EVAL.md](EVAL.md))
review/032-r1-codex.md:2762:# Subtest: final3-claude major: an unquoted path with spaces is never cut at its first space
review/032-r1-codex.md:2763:ok 1 - final3-claude major: an unquoted path with spaces is never cut at its first space # SKIP test name does not match pattern
review/032-r1-codex.md:2767:# Subtest: final3-claude major: a path whose end is unclear is a placeholder with a warning
review/032-r1-codex.md:2768:ok 2 - final3-claude major: a path whose end is unclear is a placeholder with a warning # SKIP test name does not match pattern
review/032-r1-codex.md:2772:# Subtest: paths: words of the request after a path are not part of its name
review/032-r1-codex.md:2777:# Subtest: paths: the composer takes the whole name too, never its first word
review/032-r1-codex.md:2782:# Subtest: paths: the one-argument and the several-argument forms agree
review/032-r1-codex.md:2787:# Subtest: 0.3.2 UX: Enter runs at every risk level, Esc/Ctrl+C abort, medium/high keep a warning
review/032-r1-codex.md:2792:# Subtest: final3-codex major: tools that run project code are at least medium, also for --help
review/032-r1-codex.md:2793:ok 7 - final3-codex major: tools that run project code are at least medium, also for --help # SKIP test name does not match pattern
review/032-r1-codex.md:2797:# Subtest: final3-codex major: an npm workspace is kept, never dropped
review/032-r1-codex.md:2798:ok 8 - final3-codex major: an npm workspace is kept, never dropped # SKIP test name does not match pattern
review/032-r1-codex.md:2802:# Subtest: final3-codex major: a scope npm cannot express is a placeholder, never dropped
review/032-r1-codex.md:2803:ok 9 - final3-codex major: a scope npm cannot express is a placeholder, never dropped # SKIP test name does not match pattern
review/032-r1-codex.md:2807:# Subtest: final3-codex major: an explicit pull request does not hide an unresolved repository
review/032-r1-codex.md:2808:ok 10 - final3-codex major: an explicit pull request does not hide an unresolved repository # SKIP test name does not match pattern
review/032-r1-codex.md:2812:# Subtest: scope mentions: short options belong to one tool
review/032-r1-codex.md:2817:# Subtest: a contested npm script is a placeholder, never the literal marker
review/032-r1-codex.md:2823:# tests 12
review/032-r1-codex.md:2824:# suites 0
review/032-r1-codex.md:2825:# pass 1
review/032-r1-codex.md:2826:# fail 0
review/032-r1-codex.md:2827:# cancelled 0
review/032-r1-codex.md:2828:# skipped 11
review/032-r1-codex.md:2829:# todo 0
review/032-r1-codex.md:2830:# duration_ms 164.753326
review/032-r1-codex.md:2840:# Subtest: --version
review/032-r1-codex.md:2866:# Subtest: --help
review/032-r1-codex.md:2891:# Subtest: --json dry-run (EN)
review/032-r1-codex.md:2910:# Subtest: --json dry-run (PL)
review/032-r1-codex.md:2929:# Subtest: dry-run prints command and never executes
review/032-r1-codex.md:2954:# Subtest: non-TTY without --yes only prints
review/032-r1-codex.md:2979:# Subtest: --yes runs safe commands and passes exit code
review/032-r1-codex.md:2984:# Subtest: --yes refuses non-safe commands
review/032-r1-codex.md:3009:# Subtest: unknown request -> I don't understand + candidates, exit 3
review/032-r1-codex.md:3034:# Subtest: --platform darwin (alias of --os)
review/032-r1-codex.md:3053:# Subtest: --shell powershell / cmd / fish render natively; gaps exit 5
review/032-r1-codex.md:3072:# Subtest: --history=FILE resolves references and never echoes the history
review/032-r1-codex.md:3090:# Subtest: composed commands are labelled experimental and refused by --yes
review/032-r1-codex.md:3116:# tests 13
review/032-r1-codex.md:3117:# suites 0
review/032-r1-codex.md:3118:# pass 1
review/032-r1-codex.md:3119:# fail 12
review/032-r1-codex.md:3120:# cancelled 0
review/032-r1-codex.md:3121:# skipped 0
review/032-r1-codex.md:3122:# todo 0
review/032-r1-codex.md:3123:# duration_ms 7546.786151
review/032-r1-codex.md:3191:1. **Major — [src/cli.js:200](/workspace/tellsh/src/cli.js:200): cancellation depends on stdin chunk boundaries.** Each `data` chunk is treated as one key. PTY inputs `x\x03` and `n\r` are ignored, so Ctrl+C/n fails to abort; a subsequent Enter still executes the command. Conversely, an arrow sequence split after ESC aborts unexpectedly. Decode keys across chunks and add PTY coverage for batched and fragmented input.
review/032-r1-codex.md:3193:2. **Major — [src/cli.js:177](/workspace/tellsh/src/cli.js:177): pasted newlines can execute commands.** The reader has no paste state. Sending a bracketed paste start and text, followed by a standalone newline chunk, executes the suggestion before the paste ends. Reproduced with a high-risk composed `ls` command without pressing Enter separately. Enable and track bracketed paste, suppressing confirmation actions within its contents.
review/032-r1-codex.md:3195:3. **Minor — [CHANGELOG.md:7](/workspace/tellsh/CHANGELOG.md:7): composed-warning description differs from implementation.** Composed commands are high risk, so the high-risk branch produces a red warning; the yellow experimental branch is bypassed. The README example correctly shows red. Align the changelog with that behavior.
review/032-r1-codex.md:3199:VERDICT: REQUEST_CHANGES
review/032-r1-codex.md:3202:1. **Major — [src/cli.js:200](/workspace/tellsh/src/cli.js:200): cancellation depends on stdin chunk boundaries.** Each `data` chunk is treated as one key. PTY inputs `x\x03` and `n\r` are ignored, so Ctrl+C/n fails to abort; a subsequent Enter still executes the command. Conversely, an arrow sequence split after ESC aborts unexpectedly. Decode keys across chunks and add PTY coverage for batched and fragmented input.
review/032-r1-codex.md:3204:2. **Major — [src/cli.js:177](/workspace/tellsh/src/cli.js:177): pasted newlines can execute commands.** The reader has no paste state. Sending a bracketed paste start and text, followed by a standalone newline chunk, executes the suggestion before the paste ends. Reproduced with a high-risk composed `ls` command without pressing Enter separately. Enable and track bracketed paste, suppressing confirmation actions within its contents.
review/032-r1-codex.md:3206:3. **Minor — [CHANGELOG.md:7](/workspace/tellsh/CHANGELOG.md:7): composed-warning description differs from implementation.** Composed commands are high risk, so the high-risk branch produces a red warning; the yellow experimental branch is bypassed. The README example correctly shows red. Align the changelog with that behavior.
review/032-r1-codex.md:3210:VERDICT: REQUEST_CHANGES
test/regressions22.test.js
test/regressions28.test.js
test/regressions6.test.js
test/regressions21.test.js
test/regressions14.test.js
test/slot-cases.js
test/regressions3-render.test.js
test/regressions20.test.js
test/regressions19.test.js
test/regressions9.test.js
test/regressions26.test.js
test/regressions13.test.js
test/danger.test.js
test/regressions2.test.js
test/regressions8.test.js
test/regressions30.test.js
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
test/fixtures/parity.json
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
src/history.js
test/matrix.test.js
test/regressions3-history.test.js
src/model.js
test/regressions17.test.js
src/slots.js
test/pipeline.test.js
src/tagger.js
test/regressions25.test.js
src/tools.js
src/render.js
src/danger.js
src/variants.js
src/compose.js
src/cli.js
src/guards.js
src/shellwords.js
src/features.js
src/classifier.js
src/pipeline.js
src/env.js
src/fill.js
src/cascade.js
src/catalog.js
src/allowlist-data.js
src/rerank/hybrid.js
src/rerank/encoder.js
src/rerank/tokenizer.js

exec
/bin/bash -lc 'git diff 080b628..HEAD -- src/cli.js src/danger.js src/pipeline.js test/regressions28.test.js README.md CHANGELOG.md package.json' in /workspace/tellsh
 succeeded in 0ms:
diff --git a/CHANGELOG.md b/CHANGELOG.md
new file mode 100644
index 0000000..be88341
--- /dev/null
+++ b/CHANGELOG.md
@@ -0,0 +1,14 @@
+# Changelog
+
+## 0.3.2
+
+**Prompt (UX).** A single keypress: **Enter runs the command at every risk level** (no more `y` / `yes`), **Esc** or
+**Ctrl+C** (also Ctrl+D, `n`, `q`) aborts, `e` edits. Medium-risk commands show a yellow warning line, high-risk, unrated
+and composed (experimental) ones a red one, before the prompt. Only a deliberate Enter runs: keys typed or pasted while
+the suggestion is computed are discarded, `\n` (Ctrl+J), an Enter inside a burst of keys and bracketed-paste content
+never confirm, and an abort key anywhere in a burst aborts. Commands that match a catastrophic
+pattern (`rm -rf /`, `mkfs`, `Format-Volume`, …) still have to be typed again in full. An incomplete command (a
+`<PLACEHOLDER>` left) never runs: Enter opens the editor. `--yes` is unchanged (safe catalog commands only).
+
+The model, catalog and templates are unchanged from 0.3.1 (new catalog templates are in progress on
+`feat/templates-catalog` and need a retrain that passes the full test suite).
diff --git a/README.md b/README.md
index 6628c77..6c45391 100644
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
+readline), **Esc** / **Ctrl+C** (or **n** / **q**) aborts; keys typed ahead or pasted never confirm. Medium- and high-risk and composed commands print a colored warning line
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
diff --git a/src/cli.js b/src/cli.js
index c0432fb..bacab01 100644
--- a/src/cli.js
+++ b/src/cli.js
@@ -42,9 +42,10 @@ Options:
   -v, --version     print version
   -h, --help        this help
 
-At the prompt: [Enter] runs a safe command · e edit · n abort. Medium-risk commands never run on a
-plain Enter: type "y". High-risk and composed (experimental) commands require typing "yes". Without a TTY
-(piped), tellsh only prints the command unless --yes is given.`;
+At the prompt: [Enter] runs the command at every risk level · e edit · Esc, Ctrl+C, n or q aborts. Medium-
+and high-risk (and composed, experimental) commands show a colored warning first; commands that could
+destroy the system must be typed again. Without a TTY (piped), tellsh only prints the command unless
+--yes is given.`;
 
 const C = process.stdout.isTTY && !process.env.NO_COLOR
   ? { dim: (s) => `\x1b[2m${s}\x1b[0m`, bold: (s) => `\x1b[1m${s}\x1b[0m`, red: (s) => `\x1b[31m${s}\x1b[0m`,
@@ -156,21 +157,110 @@ function printSuggestion(s, opts) {
 }
 
 /**
- * The prompt and the answer a command needs at its risk: safe runs on Enter (or y/yes); medium never runs on a plain
- * Enter, it needs an explicit "y"; high and composed (experimental) need the word "yes". `tak`/`t` are the Polish forms.
- * -> { prompt, accepts(answer) }
+ * The prompt and warning for a command at its risk (0.3.2): [Enter] runs at EVERY risk level, Esc / Ctrl+C / Ctrl+D /
+ * n / q aborts, e edits. Medium risk shows a yellow warning line; high, unrated and composed (experimental, always high)
+ * a red one. An incomplete command (placeholder left) never runs: Enter opens the editor instead.
+ * -> { warning, prompt, decide(chunk, state) } (see decideChunk)
  */
 export function confirmRule(risk, { composed = false, incomplete = false } = {}) {
-  const ans = (a) => String(a ?? '').trim().toLowerCase();
-  // a placeholder is left: it is edited first, never run as is
-  if (incomplete) return { prompt: 'e edit · n abort: ', accepts: () => false };
-  // an unknown rating is treated as high
-  if (composed || (risk !== 'safe' && risk !== 'medium')) {
-    return { prompt: `${risk === 'high' ? C.red('High risk.') : C.yellow('Experimental.')} Type "yes" to run, e to edit, anything else aborts: `,
-      accepts: (a) => ['yes', 'tak'].includes(ans(a)) };
+  let warning = null;
+  if (composed) warning = C.red('! High risk, experimental (composed) command: check it before pressing Enter.');
+  else if (risk === 'medium') warning = C.yellow('! Medium risk: check the command before pressing Enter.');
+  else if (risk !== 'safe') warning = C.red('! High risk: check the command before pressing Enter.'); // unknown rating = high
+  const prompt = incomplete ? '[Enter]/e edit · Esc abort ' : '[Enter] run · e edit · Esc abort ';
+  return { warning, prompt, decide: (chunk, state) => decideChunk(chunk, incomplete, state) };
+}
+
+const PASTE_START = '\x1b[200~';
+const PASTE_END = '\x1b[201~';
+// the longest tail of `s` that is a proper prefix of `marker` (kept for the next chunk)
+const markerTail = (s, marker) => { for (let n = Math.min(marker.length - 1, s.length); n > 0; n--) if (marker.startsWith(s.slice(-n))) return s.slice(-n); return ''; };
+/**
+ * One raw stdin chunk -> 'run' | 'edit' | 'abort' | 'pending-esc' | null (keep waiting). Deliberately strict, because
+ * Enter runs high-risk commands. `state` ({ paste, pend, armed }) carries a bracketed paste, an unfinished escape
+ * sequence or paste marker across chunks; `armed: false` (the first moments after the prompt) never confirms.
+ *  - only a chunk that is exactly one carriage return confirms (`\n` / Ctrl+J, `\r\n` and an Enter inside a burst of
+ *    other keys, i.e. typed ahead or pasted, never do); `e` edits only as a chunk of its own;
+ *  - bracketed paste content is ignored (except Ctrl+C), also when the markers are split across chunks;
+ *  - an abort key (Ctrl+C, Ctrl+D, Esc, n, q) anywhere outside a paste aborts at once, also before the prompt is armed;
+ *  - escape sequences (arrows, F-keys) are skipped; Esc followed by Enter, Esc or a control key, or a malformed
+ *    sequence, is an Esc (abort); a chunk ending in a bare ESC is 'pending-esc' (the caller aborts unless the rest of
+ *    a sequence follows within a short delay).
+ */
+export function decideChunk(chunk, incomplete = false, state = {}) {
+  const armed = state.armed !== false;
+  const k = (state.pend || '') + String(chunk ?? '');
+  state.pend = '';
+  if (k.includes('\x03')) return 'abort';
+  if (!state.paste && armed && k === '\r') return incomplete ? 'edit' : 'run';
+  if (!state.paste && armed && (k === 'e' || k === 'E')) return 'edit';
+  let i = 0;
+  while (i < k.length) {
+    if (state.paste) {
+      const j = k.indexOf(PASTE_END, i);
+      if (j < 0) { state.pend = markerTail(k.slice(i), PASTE_END); return null; }
+      state.paste = false; i = j + PASTE_END.length; continue;
+    }
+    const c = k[i];
+    if (c === '\x1b') {
+      if (i + 1 >= k.length) { state.pend = '\x1b'; return 'pending-esc'; }
+      const n = k[i + 1];
+      if (n === '[' || n === 'O') {
+        let j = i + 2;
+        while (j < k.length && k.charCodeAt(j) >= 0x20 && k.charCodeAt(j) <= 0x3f) j++;
+        if (j >= k.length) { state.pend = k.slice(i); return null; } // the sequence continues in the next chunk
+        const f = k.charCodeAt(j);
+        if (!(f >= 0x40 && f <= 0x7e)) return 'abort'; // Esc, then other keys
+        if (k.slice(i, j + 1) === PASTE_START) state.paste = true;
+        i = j + 1; continue;
+      }
+      if (n === '\x1b' || k.charCodeAt(i + 1) < 0x20 || n === '\x7f') return 'abort';
+      i += 2; continue; // Alt+key
+    }
+    if (c === '\x04' || c === 'n' || c === 'N' || c === 'q' || c === 'Q') return 'abort';
+    i++;
   }
-  if (risk === 'medium') return { prompt: `${C.yellow('Medium risk.')} Type y to run, e to edit, anything else aborts: `, accepts: (a) => ['y', 'yes', 't', 'tak'].includes(ans(a)) };
-  return { prompt: '[Enter] run · e edit · n abort: ', accepts: (a) => ['', 'y', 'yes', 't', 'tak'].includes(ans(a)) };
+  return null;
+}
+
+/** Wait for a single deliberate key in raw mode (no line buffering, no echo). Typed-ahead input is discarded. */
+function readKey(rule) {
+  return new Promise((res) => {
+    const input = process.stdin;
+    const out = process.stdout;
+    const wasRaw = input.isRaw;
+    const state = { paste: false, pend: '', armed: false };
+    let escTimer = null;
+    let ready = false;
+    let armTimer = null;
+    input.setRawMode(true);
+    out.write('\x1b[?2004h'); // bracketed paste on
+    out.write(rule.prompt);
+    const done = (action) => {
+      clearTimeout(escTimer);
+      clearTimeout(armTimer);
+      input.removeListener('data', onData);
+      out.write('\x1b[?2004l');
+      input.setRawMode(wasRaw);
+      input.pause();
+      out.write('\n');
+      res(action);
+    };
+    const onData = (buf) => {
+      const s = buf.toString('utf8');
+      // input that was already waiting (typed or pasted while the suggestion was computed) is parsed (paste state,
+      // abort keys) but never confirms: state.armed is false until the prompt has been shown for a moment
+      clearTimeout(escTimer);
+      state.armed = ready;
+      const action = rule.decide(s, state);
+      if ((action === 'run' || action === 'edit') && !ready) return;
+      if (action === 'pending-esc') { escTimer = setTimeout(() => done('abort'), 60); return; }
+      if (action) done(action);
+    };
+    input.on('data', onData);
+    input.resume();
+    armTimer = setTimeout(() => { ready = true; }, 150);
+  });
 }
 
 export async function main(argv = process.argv.slice(2)) {
@@ -251,10 +341,9 @@ export async function main(argv = process.argv.slice(2)) {
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
@@ -266,8 +355,7 @@ export async function main(argv = process.argv.slice(2)) {
       for (const w of d.warnings) process.stdout.write(riskColor(risk)(`  ! ${w}`) + '\n');
       continue;
     }
-    if (incomplete) { if (ans === '') continue; return 130; }
-    if (!rule.accepts(ans)) { console.log('aborted'); return 130; }
+    if (action !== 'run' || incomplete) { console.log('aborted'); return 130; }
     if (critical) {
       const rl2 = createInterface({ input: process.stdin, output: process.stdout });
       const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
diff --git a/src/danger.js b/src/danger.js
index 7530e7d..1631d7a 100644
--- a/src/danger.js
+++ b/src/danger.js
@@ -936,8 +936,8 @@ export function assessCommand(command, baseRisk = 'safe', { lenient = false, all
 // ---------------------------------------------------------------------------------------------
 // Trust rule (v0.3 close3). A command is rated safe ONLY when it is byte-identical to a render of a catalog template whose
 // intent is risk=safe, with slot values that are plain literals (plainSlotValue). Anything else (composer output, a
-// history replay, a user edit, an unknown program, a construct the parser does not read) is at least high and needs an
-// explicit "yes"; --yes never runs it. The parser above only raises risk, never lowers it: it adds the reasons and
+// history replay, a user edit, an unknown program, a construct the parser does not read) is at least high and shows a red
+// warning before the prompt; --yes never runs it. The parser above only raises risk, never lowers it: it adds the reasons and
 // catches what must be retyped (critical), but a command it finds nothing wrong with is still not trusted.
 
 export const UNTRUSTED = 'not a catalog command rendered by tellsh with plain values (edited, composed, from history or unknown); it is not checked as safe';
diff --git a/src/pipeline.js b/src/pipeline.js
index 026190a..f24eb2d 100644
--- a/src/pipeline.js
+++ b/src/pipeline.js
@@ -411,7 +411,7 @@ export function suggest(query, opts = {}) {
 
 // the trust rule (danger.js): a command resolved from history (a reference, "same but …", a value from an earlier
 // command) is a replay, not a fresh render of what the request says: at least high, never auto-run
-const REPLAY = 'resolved from history (a replay of an earlier command, not a fresh catalog render); needs an explicit yes';
+const REPLAY = 'resolved from history (a replay of an earlier command, not a fresh catalog render); high risk: read it before pressing Enter';
 function replayFloor(s) {
   if (!s?.command || s.method !== 'history-rule' || s.risk === 'high') return s;
   return { ...s, risk: maxRisk(s.risk, 'high'), warnings: [REPLAY, ...(s.warnings || [])] };
diff --git a/test/regressions28.test.js b/test/regressions28.test.js
index 529ff60..e5e8bb8 100644
--- a/test/regressions28.test.js
+++ b/test/regressions28.test.js
@@ -89,22 +89,57 @@ test('paths: the one-argument and the several-argument forms agree', () => {
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
+    const d = (k, st = {}) => confirmRule(r).decide(k, st);
+    assert.equal(d('\r'), 'run', String(r));
+    for (const k of ['\x03', '\x04', 'n', 'q', 'x\x03', 'n\r', '\x1b\x1b']) assert.equal(d(k), 'abort', `${r} ${JSON.stringify(k)}`);
+    assert.equal(d('\x1b'), 'pending-esc'); // lone Esc: the caller aborts unless a sequence follows
+    assert.equal(d('e'), 'edit');
+    // review r1: \n (Ctrl+J), \r\n, an Enter inside a burst, arrows, typed words never run
+    for (const k of ['\n', '\r\n', 'ls\r', '\r\r', '\x1b[A', 'y', 'yes', 'x', ' ']) assert.equal(d(k), null, `${r} ${JSON.stringify(k)}`);
+  }
+  const rule = confirmRule('high');
+  // an arrow split across chunks is not an Esc
+  let st = {};
+  assert.equal(rule.decide('\x1b', st), 'pending-esc');
+  assert.equal(rule.decide('[A', st), null);
+  st = {};
+  assert.equal(rule.decide('\x1b[', st), null);
+  assert.equal(rule.decide('A', st), null);
+  // bracketed paste: contents (newlines, n, q, Esc) are ignored across chunks; Enter after the paste runs
+  st = {};
+  assert.equal(rule.decide('\x1b[200~rm -rf x\r', st), null);
+  assert.equal(rule.decide('\r', st), null);
+  assert.equal(rule.decide('more\nq\x1b[201~', st), null);
+  assert.equal(rule.decide('\r', st), 'run');
+  assert.equal(rule.decide('\x1b[200~text\x03', {}), 'abort');
+  // review r2: an abort before a paste starts is kept; split paste-end marker; a paste begun before the prompt is
+  // armed stays a paste; Esc then Enter / Esc is an abort; malformed sequence aborts; abort keys work unarmed
+  assert.equal(rule.decide('n\x1b[200~text', {}), 'abort');
+  st = {};
+  assert.equal(rule.decide('\x1b[200~text\x1b[201', st), null);
+  assert.equal(rule.decide('~', st), null);
+  assert.equal(st.paste, false);
+  assert.equal(rule.decide('\r', st), 'run');
+  st = { armed: false };
+  assert.equal(rule.decide('\x1b[200~text', st), null);
+  st.armed = true;
+  assert.equal(rule.decide('\r', st), null);
+  assert.equal(rule.decide('\x1b[2', st), null);
+  assert.equal(rule.decide('01~', st), null);
+  assert.equal(rule.decide('\r', st), 'run');
+  for (const k of ['\x1b\r', '\x1b\x1b', '\x1b[\r']) assert.equal(rule.decide(k, {}), 'abort', JSON.stringify(k));
+  for (const k of ['\x1b', 'n', 'q', '\x04']) assert.notEqual(rule.decide(k, { armed: false }), null, JSON.stringify(k));
+  assert.equal(rule.decide('\r', { armed: false }), null);
+  assert.equal(rule.decide('e', { armed: false }), null);
+  assert.equal(confirmRule('safe').warning, null);
+  assert.match(confirmRule('medium').warning, /Medium risk/);
+  assert.match(confirmRule('high').warning, /High risk/);
+  assert.match(confirmRule(undefined).warning, /High risk/);
+  assert.match(confirmRule('high', { composed: true }).warning, /High risk, experimental/);
+  for (const r of ['safe', 'medium', 'high']) assert.equal(confirmRule(r, { incomplete: true }).decide('\r', {}), 'edit', r);
+  // the reviewed medium rows still carry the medium warning
   for (const q of ['chmod 777 /srv/my app', 'move /tmp/old notes to /tmp/archive']) assert.equal(run(q).risk, 'medium', q);
 });
 

exec
/bin/bash -lc "nl -ba src/cli.js | sed -n '360,820p'
sed -n '1,260p' test/cli.test.js
sed -n '1,220p' test/regressions28.test.js" in /workspace/tellsh
exec
/bin/bash -lc "tail -85 review/032-r2-codex.md
nl -ba src/cli.js | sed -n '1,360p'" in /workspace/tellsh
 succeeded in 0ms:
ok 11 - scope mentions: short options belong to one tool # SKIP test name does not match pattern
  ---
  duration_ms: 0.105951
  ...
# Subtest: a contested npm script is a placeholder, never the literal marker
ok 12 - a contested npm script is a placeholder, never the literal marker # SKIP test name does not match pattern
  ---
  duration_ms: 0.079533
  ...
1..12
# tests 12
# suites 0
# pass 1
# fail 0
# cancelled 0
# skipped 11
# todo 0
# duration_ms 204.831246

codex
The warning colors, incomplete-command editor path, catastrophic retype check, non-TTY behavior, and `--yes` gates check out. Four focused test files pass. The review has two major findings and one minor finding, all reproduced; the CLI suite is limited by subprocess capture in this environment. No files changed.
exec
/bin/bash -lc "git status --short && nl -ba src/cli.js | sed -n '190,201p;244,256p'" in /workspace/tellsh
 succeeded in 0ms:
?? review/032-r2-claude.md
?? review/032-r2-codex.md
   190	  if (k.includes('\x03')) return 'abort';
   191	  if (!state.paste && k === '\r') return incomplete ? 'edit' : 'run';
   192	  if (!state.paste && (k === 'e' || k === 'E')) return 'edit';
   193	  let abort = false;
   194	  let i = 0;
   195	  while (i < k.length) {
   196	    if (state.paste) {
   197	      const j = k.indexOf(PASTE_END, i);
   198	      if (j < 0) return null;
   199	      state.paste = false; i = j + PASTE_END.length; continue;
   200	    }
   201	    if (k.startsWith(PASTE_START, i)) { state.paste = true; i += PASTE_START.length; continue; }
   244	    const onData = (buf) => {
   245	      const s = buf.toString('utf8');
   246	      // input that was already waiting (typed or pasted while the suggestion was computed) is never a confirmation,
   247	      // but an abort key in it still aborts
   248	      if (!ready) { if (s.includes('\x03') || s.includes('\x04')) done('abort'); return; }
   249	      clearTimeout(escTimer);
   250	      const action = rule.decide(s, state);
   251	      if (action === 'pending-esc') { escTimer = setTimeout(() => done('abort'), 60); return; }
   252	      if (action) done(action);
   253	    };
   254	    input.on('data', onData);
   255	    input.resume();
   256	    armTimer = setTimeout(() => { ready = true; }, 150);

exec
/bin/bash -lc "node --input-type=module <<'JS'
import { spawnSync } from 'node:child_process';
for (const [name,args] of [['standalone stdout probe',['-e','process.stdout.write(\"capture-probe\\\\n\")']],['CLI version',['bin/tellsh.js','--version']]]) {
 const r=spawnSync(process.execPath,args,{encoding:'utf8'});
 console.log(JSON.stringify({name,status:r.status,error:r.error?.message,stdout:r.stdout,stderr:r.stderr}));
}
JS" in /workspace/tellsh
 succeeded in 899ms:
{"name":"standalone stdout probe","status":0,"error":"spawnSync /usr/bin/node EPERM","stdout":"","stderr":""}
{"name":"CLI version","status":0,"error":"spawnSync /usr/bin/node EPERM","stdout":"","stderr":""}

codex
1. **MAJOR — [src/cli.js:248](/workspace/tellsh/src/cli.js:248): a paste crossing the startup window can execute the command.** The first 150 ms discard input without tracking paste markers. In a PTY, sending `\x1b[200~text` 30 ms after the prompt, then a pasted `\r` at 220 ms, executed the high-risk composed suggestion before the paste ended. Preserve parser state while suppressing confirmation during startup.

2. **MAJOR — [src/cli.js:198](/workspace/tellsh/src/cli.js:198): entering paste mode can discard an explicit abort.** A chunk containing `n\x1b[200~text` sets `abort`, then returns `null` because the paste remains open. A subsequent paste-end marker followed by Enter executes the suggestion. Reproduced in a PTY: exit `0`, rather than `130`. Honor an abort already detected before any early return.

3. **MINOR — [src/cli.js:197](/workspace/tellsh/src/cli.js:197): split paste-end markers leave the prompt stuck.** Sending `\x1b[201` and `~` in separate chunks never clears `state.paste`. Subsequent Enter, edit, Esc, and Ctrl+D are ignored; Ctrl+C still exits. Retain partial end-marker bytes across chunks.

The ordinary typed-ahead Enter, LF/CRLF rejection, batched aborts, and split-arrow checks pass. Warning colors, incomplete editing, catastrophic retyping, raw-mode restoration, non-TTY behavior, and `--yes` gates also checked out. Four focused test files passed; CLI-suite validation was limited by sandbox `spawnSync` errors (`EPERM`). No files changed.

VERDICT: REQUEST_CHANGES
tokens used
103,282
1. **MAJOR — [src/cli.js:248](/workspace/tellsh/src/cli.js:248): a paste crossing the startup window can execute the command.** The first 150 ms discard input without tracking paste markers. In a PTY, sending `\x1b[200~text` 30 ms after the prompt, then a pasted `\r` at 220 ms, executed the high-risk composed suggestion before the paste ended. Preserve parser state while suppressing confirmation during startup.

2. **MAJOR — [src/cli.js:198](/workspace/tellsh/src/cli.js:198): entering paste mode can discard an explicit abort.** A chunk containing `n\x1b[200~text` sets `abort`, then returns `null` because the paste remains open. A subsequent paste-end marker followed by Enter executes the suggestion. Reproduced in a PTY: exit `0`, rather than `130`. Honor an abort already detected before any early return.

3. **MINOR — [src/cli.js:197](/workspace/tellsh/src/cli.js:197): split paste-end markers leave the prompt stuck.** Sending `\x1b[201` and `~` in separate chunks never clears `state.paste`. Subsequent Enter, edit, Esc, and Ctrl+D are ignored; Ctrl+C still exits. Retain partial end-marker bytes across chunks.

The ordinary typed-ahead Enter, LF/CRLF rejection, batched aborts, and split-arrow checks pass. Warning colors, incomplete editing, catastrophic retyping, raw-mode restoration, non-TTY behavior, and `--yes` gates also checked out. Four focused test files passed; CLI-suite validation was limited by sandbox `spawnSync` errors (`EPERM`). No files changed.

VERDICT: REQUEST_CHANGES
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
    45	At the prompt: [Enter] runs the command at every risk level · e edit · Esc, Ctrl+C, n or q aborts. Medium-
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
   160	 * The prompt and warning for a command at its risk (0.3.2): [Enter] runs at EVERY risk level, Esc / Ctrl+C / Ctrl+D /
   161	 * n / q aborts, e edits. Medium risk shows a yellow warning line; high, unrated and composed (experimental, always high)
   162	 * a red one. An incomplete command (placeholder left) never runs: Enter opens the editor instead.
   163	 * -> { warning, prompt, decide(chunk, state) } (see decideChunk)
   164	 */
   165	export function confirmRule(risk, { composed = false, incomplete = false } = {}) {
   166	  let warning = null;
   167	  if (composed) warning = C.red('! High risk, experimental (composed) command: check it before pressing Enter.');
   168	  else if (risk === 'medium') warning = C.yellow('! Medium risk: check the command before pressing Enter.');
   169	  else if (risk !== 'safe') warning = C.red('! High risk: check the command before pressing Enter.'); // unknown rating = high
   170	  const prompt = incomplete ? '[Enter]/e edit · Esc abort ' : '[Enter] run · e edit · Esc abort ';
   171	  return { warning, prompt, decide: (chunk, state) => decideChunk(chunk, incomplete, state) };
   172	}
   173	
   174	const PASTE_START = '\x1b[200~';
   175	const PASTE_END = '\x1b[201~';
   176	// the longest tail of `s` that is a proper prefix of `marker` (kept for the next chunk)
   177	const markerTail = (s, marker) => { for (let n = Math.min(marker.length - 1, s.length); n > 0; n--) if (marker.startsWith(s.slice(-n))) return s.slice(-n); return ''; };
   178	/**
   179	 * One raw stdin chunk -> 'run' | 'edit' | 'abort' | 'pending-esc' | null (keep waiting). Deliberately strict, because
   180	 * Enter runs high-risk commands. `state` ({ paste, pend, armed }) carries a bracketed paste, an unfinished escape
   181	 * sequence or paste marker across chunks; `armed: false` (the first moments after the prompt) never confirms.
   182	 *  - only a chunk that is exactly one carriage return confirms (`\n` / Ctrl+J, `\r\n` and an Enter inside a burst of
   183	 *    other keys, i.e. typed ahead or pasted, never do); `e` edits only as a chunk of its own;
   184	 *  - bracketed paste content is ignored (except Ctrl+C), also when the markers are split across chunks;
   185	 *  - an abort key (Ctrl+C, Ctrl+D, Esc, n, q) anywhere outside a paste aborts at once, also before the prompt is armed;
   186	 *  - escape sequences (arrows, F-keys) are skipped; Esc followed by Enter, Esc or a control key, or a malformed
   187	 *    sequence, is an Esc (abort); a chunk ending in a bare ESC is 'pending-esc' (the caller aborts unless the rest of
   188	 *    a sequence follows within a short delay).
   189	 */
   190	export function decideChunk(chunk, incomplete = false, state = {}) {
   191	  const armed = state.armed !== false;
   192	  const k = (state.pend || '') + String(chunk ?? '');
   193	  state.pend = '';
   194	  if (k.includes('\x03')) return 'abort';
   195	  if (!state.paste && armed && k === '\r') return incomplete ? 'edit' : 'run';
   196	  if (!state.paste && armed && (k === 'e' || k === 'E')) return 'edit';
   197	  let i = 0;
   198	  while (i < k.length) {
   199	    if (state.paste) {
   200	      const j = k.indexOf(PASTE_END, i);
   201	      if (j < 0) { state.pend = markerTail(k.slice(i), PASTE_END); return null; }
   202	      state.paste = false; i = j + PASTE_END.length; continue;
   203	    }
   204	    const c = k[i];
   205	    if (c === '\x1b') {
   206	      if (i + 1 >= k.length) { state.pend = '\x1b'; return 'pending-esc'; }
   207	      const n = k[i + 1];
   208	      if (n === '[' || n === 'O') {
   209	        let j = i + 2;
   210	        while (j < k.length && k.charCodeAt(j) >= 0x20 && k.charCodeAt(j) <= 0x3f) j++;
   211	        if (j >= k.length) { state.pend = k.slice(i); return null; } // the sequence continues in the next chunk
   212	        const f = k.charCodeAt(j);
   213	        if (!(f >= 0x40 && f <= 0x7e)) return 'abort'; // Esc, then other keys
   214	        if (k.slice(i, j + 1) === PASTE_START) state.paste = true;
   215	        i = j + 1; continue;
   216	      }
   217	      if (n === '\x1b' || k.charCodeAt(i + 1) < 0x20 || n === '\x7f') return 'abort';
   218	      i += 2; continue; // Alt+key
   219	    }
   220	    if (c === '\x04' || c === 'n' || c === 'N' || c === 'q' || c === 'Q') return 'abort';
   221	    i++;
   222	  }
   223	  return null;
   224	}
   225	
   226	/** Wait for a single deliberate key in raw mode (no line buffering, no echo). Typed-ahead input is discarded. */
   227	function readKey(rule) {
   228	  return new Promise((res) => {
   229	    const input = process.stdin;
   230	    const out = process.stdout;
   231	    const wasRaw = input.isRaw;
   232	    const state = { paste: false, pend: '', armed: false };
   233	    let escTimer = null;
   234	    let ready = false;
   235	    let armTimer = null;
   236	    input.setRawMode(true);
   237	    out.write('\x1b[?2004h'); // bracketed paste on
   238	    out.write(rule.prompt);
   239	    const done = (action) => {
   240	      clearTimeout(escTimer);
   241	      clearTimeout(armTimer);
   242	      input.removeListener('data', onData);
   243	      out.write('\x1b[?2004l');
   244	      input.setRawMode(wasRaw);
   245	      input.pause();
   246	      out.write('\n');
   247	      res(action);
   248	    };
   249	    const onData = (buf) => {
   250	      const s = buf.toString('utf8');
   251	      // input that was already waiting (typed or pasted while the suggestion was computed) is parsed (paste state,
   252	      // abort keys) but never confirms: state.armed is false until the prompt has been shown for a moment
   253	      clearTimeout(escTimer);
   254	      state.armed = ready;
   255	      const action = rule.decide(s, state);
   256	      if ((action === 'run' || action === 'edit') && !ready) return;
   257	      if (action === 'pending-esc') { escTimer = setTimeout(() => done('abort'), 60); return; }
   258	      if (action) done(action);
   259	    };
   260	    input.on('data', onData);
   261	    input.resume();
   262	    armTimer = setTimeout(() => { ready = true; }, 150);
   263	  });
   264	}
   265	
   266	export async function main(argv = process.argv.slice(2)) {
   267	  const opts = parseArgs(argv);
   268	  if (opts.version) { console.log(pkg.version); return 0; }
   269	  if (opts.help || !opts.words.length) { console.log(HELP); return opts.help ? 0 : 2; }
   270	  if (opts.badThreshold != null) { console.error(`tellsh: --threshold needs a number between 0 and 1 (got "${opts.badThreshold}")`); return 2; }
   271	  // the shell removed the quotes: a word with spaces is quoted again so "/tmp/a b" stays one path ("delete folder" as
   272	  // the first of several arguments is request text; a quoted argument that is neither is unclear: see joinArgs)
   273	  const joined = joinArgs(opts.words);
   274	  const query = joined?.text;
   275	  if (joined == null) { console.error('tellsh: an argument contains spaces and both kinds of quotes; it cannot be read as one value'); return 2; }
   276	  if (opts.shell && !normShell(opts.shell)) { console.error(`tellsh: unknown shell "${opts.shell}" (bash|zsh|sh|powershell|fish|cmd)`); return 2; }
   277	  if (opts.os && !normOs(opts.os)) { console.error(`tellsh: unknown OS "${opts.os}" (linux|darwin|win32)`); return 2; }
   278	  let s;
   279	  try {
   280	    getModel();
   281	    const env = detectEnv({ shell: opts.shell, os: opts.os });
   282	    // history is read only when asked for, kept in memory for this call, never printed or stored. Only the previous
   283	    // command is a reference target; the line before it is read too because some shells (zsh, fish, PSReadLine)
   284	    // write this `tellsh …` call to the file before it runs, and buildContext drops it.
   285	    const history = opts.history ? loadHistory({ shell: env.shell, file: opts.historyFile, n: 2 }) : undefined;
   286	    const so = { top: opts.top, threshold: opts.threshold, env, history, cwd: process.cwd(), compose: opts.compose, unclearArgs: joined.unclear };
   287	    s = opts.hybrid ? await suggestLazy(query, { ...so, system: process.env.TELLSH_HYBRID === 'safe' ? 'A+B-safe' : 'A+B' }) : pipelineSuggest(query, so);
   288	  } catch (e) {
   289	    console.error(`tellsh: ${e.message}`);
   290	    return 1;
   291	  }
   292	
   293	  if (opts.json) {
   294	    console.log(JSON.stringify(s, null, 2));
   295	    return s.understood ? 0 : 3;
   296	  }
   297	  if (!s.understood && s.context?.rule === 'refused') {
   298	    // a history reference that cannot be resolved safely: nothing to suggest
   299	    console.log(`Cannot resolve "${query}" from history: ${s.hint || s.context.note || 'not guessing'}.`);
   300	    console.log(C.dim('Name the target explicitly.'));
   301	    return 3;
   302	  }
   303	  if (!s.understood && s.hint && s.confidence >= s.threshold) {
   304	    // understood, but the only command the catalog has would contradict the request ("uninstall", "except 1234", "close pr")
   305	    console.log(`Not suggesting a command for "${query}": ${s.hint}.`);
   306	    return 3;
   307	  }
   308	  if (!s.understood) {
   309	    console.log(`I don't understand "${query}" (confidence ${(s.confidence * 100).toFixed(0)}% < ${(s.threshold * 100).toFixed(0)}%).`);
   310	    console.log('Did you mean:');
   311	    for (const c of s.candidates) console.log(`  - ${c.intent}: ${c.description} ${C.dim(`(${(c.p * 100).toFixed(1)}%)`)}`);
   312	    if (s.hint) console.log(C.dim(`hint: ${s.hint}`));
   313	    console.log(C.dim('Try rephrasing, or use --threshold to lower the bar.'));
   314	    return 3;
   315	  }
   316	  if (s.gap) {
   317	    console.log(`No ${s.shell} rendering for "${s.intent}" on ${s.os}: ${s.gap}.`);
   318	    console.log(C.dim(`Try --shell bash (or another shell) to see the command.`));
   319	    return 5;
   320	  }
   321	
   322	  printSuggestion(s, opts);
   323	  if (opts.dryRun) return 0;
   324	
   325	  const interactive = process.stdin.isTTY && process.stdout.isTTY;
   326	  const shellName = s.shell;
   327	  if (opts.yes) {
   328	    const fromHistory = Object.values(s.slotSources || {}).includes('history');
   329	    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog' || fromHistory || s.hybrid?.deferred) {
   330	      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' || fromHistory ? 'resolved from history' : s.missing.length ? 'incomplete' : s.hybrid?.deferred ? 're-ranked by the neural fallback' : s.risk;
   331	      console.log(C.yellow(`  --yes only auto-runs safe catalog commands; this one is ${why}. Not running.`));
   332	      return 4;
   333	    }
   334	    return runShell(s.command, shellName);
   335	  }
   336	  if (!interactive) return 0; // print-only when piped
   337	
   338	  let command = s.command;
   339	  let risk = s.risk;
   340	  let critical = s.critical;
   341	  let incomplete = s.missing.length > 0;
   342	  for (;;) {
   343	    const rule = confirmRule(risk, { composed: s.method === 'composed', incomplete });
   344	    if (rule.warning) process.stdout.write(rule.warning + '\n');
   345	    const action = await readKey(rule);
   346	    if (action === 'edit') {
   347	      command = (await editLine(command)).trim();
   348	      if (!command) return 130;
   349	      // unchanged: the suggestion as rated; any change is a user edit, at least high (danger.js trust rule)
   350	      const d = command === s.command ? { risk: s.risk, warnings: s.warnings, critical: s.critical } : checkDanger(command, s.baseRisk);
   351	      risk = maxRisk(s.baseRisk, d.risk);
   352	      critical = d.critical;
   353	      incomplete = /<[A-Z_]+>/.test(command);
   354	      process.stdout.write(C.dim('  risk: ') + riskColor(risk)(risk) + '\n');
   355	      for (const w of d.warnings) process.stdout.write(riskColor(risk)(`  ! ${w}`) + '\n');
   356	      continue;
   357	    }
   358	    if (action !== 'run' || incomplete) { console.log('aborted'); return 130; }
   359	    if (critical) {
   360	      const rl2 = createInterface({ input: process.stdin, output: process.stdout });

 succeeded in 0ms:
   360	      const rl2 = createInterface({ input: process.stdin, output: process.stdout });
   361	      const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
   362	      rl2.close();
   363	      if (a2 !== command) { console.log('aborted'); return 130; }
   364	    }
   365	    return runShell(command, shellName);
   366	  }
   367	}
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
    const d = (k, st = {}) => confirmRule(r).decide(k, st);
    assert.equal(d('\r'), 'run', String(r));
    for (const k of ['\x03', '\x04', 'n', 'q', 'x\x03', 'n\r', '\x1b\x1b']) assert.equal(d(k), 'abort', `${r} ${JSON.stringify(k)}`);
    assert.equal(d('\x1b'), 'pending-esc'); // lone Esc: the caller aborts unless a sequence follows
    assert.equal(d('e'), 'edit');
    // review r1: \n (Ctrl+J), \r\n, an Enter inside a burst, arrows, typed words never run
    for (const k of ['\n', '\r\n', 'ls\r', '\r\r', '\x1b[A', 'y', 'yes', 'x', ' ']) assert.equal(d(k), null, `${r} ${JSON.stringify(k)}`);
  }
  const rule = confirmRule('high');
  // an arrow split across chunks is not an Esc
  let st = {};
  assert.equal(rule.decide('\x1b', st), 'pending-esc');
  assert.equal(rule.decide('[A', st), null);
  st = {};
  assert.equal(rule.decide('\x1b[', st), null);
  assert.equal(rule.decide('A', st), null);
  // bracketed paste: contents (newlines, n, q, Esc) are ignored across chunks; Enter after the paste runs
  st = {};
  assert.equal(rule.decide('\x1b[200~rm -rf x\r', st), null);
  assert.equal(rule.decide('\r', st), null);
  assert.equal(rule.decide('more\nq\x1b[201~', st), null);
  assert.equal(rule.decide('\r', st), 'run');
  assert.equal(rule.decide('\x1b[200~text\x03', {}), 'abort');
  // review r2: an abort before a paste starts is kept; split paste-end marker; a paste begun before the prompt is
  // armed stays a paste; Esc then Enter / Esc is an abort; malformed sequence aborts; abort keys work unarmed
  assert.equal(rule.decide('n\x1b[200~text', {}), 'abort');
  st = {};
  assert.equal(rule.decide('\x1b[200~text\x1b[201', st), null);
  assert.equal(rule.decide('~', st), null);
  assert.equal(st.paste, false);
  assert.equal(rule.decide('\r', st), 'run');
  st = { armed: false };
  assert.equal(rule.decide('\x1b[200~text', st), null);
  st.armed = true;
  assert.equal(rule.decide('\r', st), null);
  assert.equal(rule.decide('\x1b[2', st), null);
  assert.equal(rule.decide('01~', st), null);
  assert.equal(rule.decide('\r', st), 'run');
  for (const k of ['\x1b\r', '\x1b\x1b', '\x1b[\r']) assert.equal(rule.decide(k, {}), 'abort', JSON.stringify(k));
  for (const k of ['\x1b', 'n', 'q', '\x04']) assert.notEqual(rule.decide(k, { armed: false }), null, JSON.stringify(k));
  assert.equal(rule.decide('\r', { armed: false }), null);
  assert.equal(rule.decide('e', { armed: false }), null);
  assert.equal(confirmRule('safe').warning, null);
  assert.match(confirmRule('medium').warning, /Medium risk/);
  assert.match(confirmRule('high').warning, /High risk/);
  assert.match(confirmRule(undefined).warning, /High risk/);
  assert.match(confirmRule('high', { composed: true }).warning, /High risk, experimental/);
  for (const r of ['safe', 'medium', 'high']) assert.equal(confirmRule(r, { incomplete: true }).decide('\r', {}), 'edit', r);
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

exec
/bin/bash -lc "nl -ba src/cli.js | sed -n '174,367p'
git show --stat HEAD" in /workspace/tellsh
 succeeded in 0ms:
   174	const PASTE_START = '\x1b[200~';
   175	const PASTE_END = '\x1b[201~';
   176	// the longest tail of `s` that is a proper prefix of `marker` (kept for the next chunk)
   177	const markerTail = (s, marker) => { for (let n = Math.min(marker.length - 1, s.length); n > 0; n--) if (marker.startsWith(s.slice(-n))) return s.slice(-n); return ''; };
   178	/**
   179	 * One raw stdin chunk -> 'run' | 'edit' | 'abort' | 'pending-esc' | null (keep waiting). Deliberately strict, because
   180	 * Enter runs high-risk commands. `state` ({ paste, pend, armed }) carries a bracketed paste, an unfinished escape
   181	 * sequence or paste marker across chunks; `armed: false` (the first moments after the prompt) never confirms.
   182	 *  - only a chunk that is exactly one carriage return confirms (`\n` / Ctrl+J, `\r\n` and an Enter inside a burst of
   183	 *    other keys, i.e. typed ahead or pasted, never do); `e` edits only as a chunk of its own;
   184	 *  - bracketed paste content is ignored (except Ctrl+C), also when the markers are split across chunks;
   185	 *  - an abort key (Ctrl+C, Ctrl+D, Esc, n, q) anywhere outside a paste aborts at once, also before the prompt is armed;
   186	 *  - escape sequences (arrows, F-keys) are skipped; Esc followed by Enter, Esc or a control key, or a malformed
   187	 *    sequence, is an Esc (abort); a chunk ending in a bare ESC is 'pending-esc' (the caller aborts unless the rest of
   188	 *    a sequence follows within a short delay).
   189	 */
   190	export function decideChunk(chunk, incomplete = false, state = {}) {
   191	  const armed = state.armed !== false;
   192	  const k = (state.pend || '') + String(chunk ?? '');
   193	  state.pend = '';
   194	  if (k.includes('\x03')) return 'abort';
   195	  if (!state.paste && armed && k === '\r') return incomplete ? 'edit' : 'run';
   196	  if (!state.paste && armed && (k === 'e' || k === 'E')) return 'edit';
   197	  let i = 0;
   198	  while (i < k.length) {
   199	    if (state.paste) {
   200	      const j = k.indexOf(PASTE_END, i);
   201	      if (j < 0) { state.pend = markerTail(k.slice(i), PASTE_END); return null; }
   202	      state.paste = false; i = j + PASTE_END.length; continue;
   203	    }
   204	    const c = k[i];
   205	    if (c === '\x1b') {
   206	      if (i + 1 >= k.length) { state.pend = '\x1b'; return 'pending-esc'; }
   207	      const n = k[i + 1];
   208	      if (n === '[' || n === 'O') {
   209	        let j = i + 2;
   210	        while (j < k.length && k.charCodeAt(j) >= 0x20 && k.charCodeAt(j) <= 0x3f) j++;
   211	        if (j >= k.length) { state.pend = k.slice(i); return null; } // the sequence continues in the next chunk
   212	        const f = k.charCodeAt(j);
   213	        if (!(f >= 0x40 && f <= 0x7e)) return 'abort'; // Esc, then other keys
   214	        if (k.slice(i, j + 1) === PASTE_START) state.paste = true;
   215	        i = j + 1; continue;
   216	      }
   217	      if (n === '\x1b' || k.charCodeAt(i + 1) < 0x20 || n === '\x7f') return 'abort';
   218	      i += 2; continue; // Alt+key
   219	    }
   220	    if (c === '\x04' || c === 'n' || c === 'N' || c === 'q' || c === 'Q') return 'abort';
   221	    i++;
   222	  }
   223	  return null;
   224	}
   225	
   226	/** Wait for a single deliberate key in raw mode (no line buffering, no echo). Typed-ahead input is discarded. */
   227	function readKey(rule) {
   228	  return new Promise((res) => {
   229	    const input = process.stdin;
   230	    const out = process.stdout;
   231	    const wasRaw = input.isRaw;
   232	    const state = { paste: false, pend: '', armed: false };
   233	    let escTimer = null;
   234	    let ready = false;
   235	    let armTimer = null;
   236	    input.setRawMode(true);
   237	    out.write('\x1b[?2004h'); // bracketed paste on
   238	    out.write(rule.prompt);
   239	    const done = (action) => {
   240	      clearTimeout(escTimer);
   241	      clearTimeout(armTimer);
   242	      input.removeListener('data', onData);
   243	      out.write('\x1b[?2004l');
   244	      input.setRawMode(wasRaw);
   245	      input.pause();
   246	      out.write('\n');
   247	      res(action);
   248	    };
   249	    const onData = (buf) => {
   250	      const s = buf.toString('utf8');
   251	      // input that was already waiting (typed or pasted while the suggestion was computed) is parsed (paste state,
   252	      // abort keys) but never confirms: state.armed is false until the prompt has been shown for a moment
   253	      clearTimeout(escTimer);
   254	      state.armed = ready;
   255	      const action = rule.decide(s, state);
   256	      if ((action === 'run' || action === 'edit') && !ready) return;
   257	      if (action === 'pending-esc') { escTimer = setTimeout(() => done('abort'), 60); return; }
   258	      if (action) done(action);
   259	    };
   260	    input.on('data', onData);
   261	    input.resume();
   262	    armTimer = setTimeout(() => { ready = true; }, 150);
   263	  });
   264	}
   265	
   266	export async function main(argv = process.argv.slice(2)) {
   267	  const opts = parseArgs(argv);
   268	  if (opts.version) { console.log(pkg.version); return 0; }
   269	  if (opts.help || !opts.words.length) { console.log(HELP); return opts.help ? 0 : 2; }
   270	  if (opts.badThreshold != null) { console.error(`tellsh: --threshold needs a number between 0 and 1 (got "${opts.badThreshold}")`); return 2; }
   271	  // the shell removed the quotes: a word with spaces is quoted again so "/tmp/a b" stays one path ("delete folder" as
   272	  // the first of several arguments is request text; a quoted argument that is neither is unclear: see joinArgs)
   273	  const joined = joinArgs(opts.words);
   274	  const query = joined?.text;
   275	  if (joined == null) { console.error('tellsh: an argument contains spaces and both kinds of quotes; it cannot be read as one value'); return 2; }
   276	  if (opts.shell && !normShell(opts.shell)) { console.error(`tellsh: unknown shell "${opts.shell}" (bash|zsh|sh|powershell|fish|cmd)`); return 2; }
   277	  if (opts.os && !normOs(opts.os)) { console.error(`tellsh: unknown OS "${opts.os}" (linux|darwin|win32)`); return 2; }
   278	  let s;
   279	  try {
   280	    getModel();
   281	    const env = detectEnv({ shell: opts.shell, os: opts.os });
   282	    // history is read only when asked for, kept in memory for this call, never printed or stored. Only the previous
   283	    // command is a reference target; the line before it is read too because some shells (zsh, fish, PSReadLine)
   284	    // write this `tellsh …` call to the file before it runs, and buildContext drops it.
   285	    const history = opts.history ? loadHistory({ shell: env.shell, file: opts.historyFile, n: 2 }) : undefined;
   286	    const so = { top: opts.top, threshold: opts.threshold, env, history, cwd: process.cwd(), compose: opts.compose, unclearArgs: joined.unclear };
   287	    s = opts.hybrid ? await suggestLazy(query, { ...so, system: process.env.TELLSH_HYBRID === 'safe' ? 'A+B-safe' : 'A+B' }) : pipelineSuggest(query, so);
   288	  } catch (e) {
   289	    console.error(`tellsh: ${e.message}`);
   290	    return 1;
   291	  }
   292	
   293	  if (opts.json) {
   294	    console.log(JSON.stringify(s, null, 2));
   295	    return s.understood ? 0 : 3;
   296	  }
   297	  if (!s.understood && s.context?.rule === 'refused') {
   298	    // a history reference that cannot be resolved safely: nothing to suggest
   299	    console.log(`Cannot resolve "${query}" from history: ${s.hint || s.context.note || 'not guessing'}.`);
   300	    console.log(C.dim('Name the target explicitly.'));
   301	    return 3;
   302	  }
   303	  if (!s.understood && s.hint && s.confidence >= s.threshold) {
   304	    // understood, but the only command the catalog has would contradict the request ("uninstall", "except 1234", "close pr")
   305	    console.log(`Not suggesting a command for "${query}": ${s.hint}.`);
   306	    return 3;
   307	  }
   308	  if (!s.understood) {
   309	    console.log(`I don't understand "${query}" (confidence ${(s.confidence * 100).toFixed(0)}% < ${(s.threshold * 100).toFixed(0)}%).`);
   310	    console.log('Did you mean:');
   311	    for (const c of s.candidates) console.log(`  - ${c.intent}: ${c.description} ${C.dim(`(${(c.p * 100).toFixed(1)}%)`)}`);
   312	    if (s.hint) console.log(C.dim(`hint: ${s.hint}`));
   313	    console.log(C.dim('Try rephrasing, or use --threshold to lower the bar.'));
   314	    return 3;
   315	  }
   316	  if (s.gap) {
   317	    console.log(`No ${s.shell} rendering for "${s.intent}" on ${s.os}: ${s.gap}.`);
   318	    console.log(C.dim(`Try --shell bash (or another shell) to see the command.`));
   319	    return 5;
   320	  }
   321	
   322	  printSuggestion(s, opts);
   323	  if (opts.dryRun) return 0;
   324	
   325	  const interactive = process.stdin.isTTY && process.stdout.isTTY;
   326	  const shellName = s.shell;
   327	  if (opts.yes) {
   328	    const fromHistory = Object.values(s.slotSources || {}).includes('history');
   329	    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog' || fromHistory || s.hybrid?.deferred) {
   330	      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' || fromHistory ? 'resolved from history' : s.missing.length ? 'incomplete' : s.hybrid?.deferred ? 're-ranked by the neural fallback' : s.risk;
   331	      console.log(C.yellow(`  --yes only auto-runs safe catalog commands; this one is ${why}. Not running.`));
   332	      return 4;
   333	    }
   334	    return runShell(s.command, shellName);
   335	  }
   336	  if (!interactive) return 0; // print-only when piped
   337	
   338	  let command = s.command;
   339	  let risk = s.risk;
   340	  let critical = s.critical;
   341	  let incomplete = s.missing.length > 0;
   342	  for (;;) {
   343	    const rule = confirmRule(risk, { composed: s.method === 'composed', incomplete });
   344	    if (rule.warning) process.stdout.write(rule.warning + '\n');
   345	    const action = await readKey(rule);
   346	    if (action === 'edit') {
   347	      command = (await editLine(command)).trim();
   348	      if (!command) return 130;
   349	      // unchanged: the suggestion as rated; any change is a user edit, at least high (danger.js trust rule)
   350	      const d = command === s.command ? { risk: s.risk, warnings: s.warnings, critical: s.critical } : checkDanger(command, s.baseRisk);
   351	      risk = maxRisk(s.baseRisk, d.risk);
   352	      critical = d.critical;
   353	      incomplete = /<[A-Z_]+>/.test(command);
   354	      process.stdout.write(C.dim('  risk: ') + riskColor(risk)(risk) + '\n');
   355	      for (const w of d.warnings) process.stdout.write(riskColor(risk)(`  ! ${w}`) + '\n');
   356	      continue;
   357	    }
   358	    if (action !== 'run' || incomplete) { console.log('aborted'); return 130; }
   359	    if (critical) {
   360	      const rl2 = createInterface({ input: process.stdin, output: process.stdout });
   361	      const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
   362	      rl2.close();
   363	      if (a2 !== command) { console.log('aborted'); return 130; }
   364	    }
   365	    return runShell(command, shellName);
   366	  }
   367	}
commit 3ab74b1a330ab567dc3f2dd7761d37fb7ec98936
Author: lksrz <lukasz@wearfits.com>
Date:   Sun Oct 11 23:25:16 2026 +0200

    cli: r2 review fixes — parser state kept before the prompt is armed, abort before a paste honoured, split paste markers, Esc+Enter/control = abort, malformed CSI aborts, all abort keys work immediately

 review/032-r2-claude.md    |   33 +
 review/032-r2-codex.md     | 2923 ++++++++++++++++++++++++++++++++++++++++++++
 src/cli.js                 |   56 +-
 test/regressions28.test.js |   19 +
 4 files changed, 3006 insertions(+), 25 deletions(-)

exec
/bin/bash -lc 'git diff 080b628..HEAD -- src/cli.js src/danger.js src/pipeline.js README.md CHANGELOG.md package.json' in /workspace/tellsh
 succeeded in 0ms:
diff --git a/CHANGELOG.md b/CHANGELOG.md
new file mode 100644
index 0000000..be88341
--- /dev/null
+++ b/CHANGELOG.md
@@ -0,0 +1,14 @@
+# Changelog
+
+## 0.3.2
+
+**Prompt (UX).** A single keypress: **Enter runs the command at every risk level** (no more `y` / `yes`), **Esc** or
+**Ctrl+C** (also Ctrl+D, `n`, `q`) aborts, `e` edits. Medium-risk commands show a yellow warning line, high-risk, unrated
+and composed (experimental) ones a red one, before the prompt. Only a deliberate Enter runs: keys typed or pasted while
+the suggestion is computed are discarded, `\n` (Ctrl+J), an Enter inside a burst of keys and bracketed-paste content
+never confirm, and an abort key anywhere in a burst aborts. Commands that match a catastrophic
+pattern (`rm -rf /`, `mkfs`, `Format-Volume`, …) still have to be typed again in full. An incomplete command (a
+`<PLACEHOLDER>` left) never runs: Enter opens the editor. `--yes` is unchanged (safe catalog commands only).
+
+The model, catalog and templates are unchanged from 0.3.1 (new catalog templates are in progress on
+`feat/templates-catalog` and need a retrain that passes the full test suite).
diff --git a/README.md b/README.md
index 6628c77..6c45391 100644
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
+readline), **Esc** / **Ctrl+C** (or **n** / **q**) aborts; keys typed ahead or pasted never confirm. Medium- and high-risk and composed commands print a colored warning line
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
diff --git a/src/cli.js b/src/cli.js
index c0432fb..bacab01 100644
--- a/src/cli.js
+++ b/src/cli.js
@@ -42,9 +42,10 @@ Options:
   -v, --version     print version
   -h, --help        this help
 
-At the prompt: [Enter] runs a safe command · e edit · n abort. Medium-risk commands never run on a
-plain Enter: type "y". High-risk and composed (experimental) commands require typing "yes". Without a TTY
-(piped), tellsh only prints the command unless --yes is given.`;
+At the prompt: [Enter] runs the command at every risk level · e edit · Esc, Ctrl+C, n or q aborts. Medium-
+and high-risk (and composed, experimental) commands show a colored warning first; commands that could
+destroy the system must be typed again. Without a TTY (piped), tellsh only prints the command unless
+--yes is given.`;
 
 const C = process.stdout.isTTY && !process.env.NO_COLOR
   ? { dim: (s) => `\x1b[2m${s}\x1b[0m`, bold: (s) => `\x1b[1m${s}\x1b[0m`, red: (s) => `\x1b[31m${s}\x1b[0m`,
@@ -156,21 +157,110 @@ function printSuggestion(s, opts) {
 }
 
 /**
- * The prompt and the answer a command needs at its risk: safe runs on Enter (or y/yes); medium never runs on a plain
- * Enter, it needs an explicit "y"; high and composed (experimental) need the word "yes". `tak`/`t` are the Polish forms.
- * -> { prompt, accepts(answer) }
+ * The prompt and warning for a command at its risk (0.3.2): [Enter] runs at EVERY risk level, Esc / Ctrl+C / Ctrl+D /
+ * n / q aborts, e edits. Medium risk shows a yellow warning line; high, unrated and composed (experimental, always high)
+ * a red one. An incomplete command (placeholder left) never runs: Enter opens the editor instead.
+ * -> { warning, prompt, decide(chunk, state) } (see decideChunk)
  */
 export function confirmRule(risk, { composed = false, incomplete = false } = {}) {
-  const ans = (a) => String(a ?? '').trim().toLowerCase();
-  // a placeholder is left: it is edited first, never run as is
-  if (incomplete) return { prompt: 'e edit · n abort: ', accepts: () => false };
-  // an unknown rating is treated as high
-  if (composed || (risk !== 'safe' && risk !== 'medium')) {
-    return { prompt: `${risk === 'high' ? C.red('High risk.') : C.yellow('Experimental.')} Type "yes" to run, e to edit, anything else aborts: `,
-      accepts: (a) => ['yes', 'tak'].includes(ans(a)) };
+  let warning = null;
+  if (composed) warning = C.red('! High risk, experimental (composed) command: check it before pressing Enter.');
+  else if (risk === 'medium') warning = C.yellow('! Medium risk: check the command before pressing Enter.');
+  else if (risk !== 'safe') warning = C.red('! High risk: check the command before pressing Enter.'); // unknown rating = high
+  const prompt = incomplete ? '[Enter]/e edit · Esc abort ' : '[Enter] run · e edit · Esc abort ';
+  return { warning, prompt, decide: (chunk, state) => decideChunk(chunk, incomplete, state) };
+}
+
+const PASTE_START = '\x1b[200~';
+const PASTE_END = '\x1b[201~';
+// the longest tail of `s` that is a proper prefix of `marker` (kept for the next chunk)
+const markerTail = (s, marker) => { for (let n = Math.min(marker.length - 1, s.length); n > 0; n--) if (marker.startsWith(s.slice(-n))) return s.slice(-n); return ''; };
+/**
+ * One raw stdin chunk -> 'run' | 'edit' | 'abort' | 'pending-esc' | null (keep waiting). Deliberately strict, because
+ * Enter runs high-risk commands. `state` ({ paste, pend, armed }) carries a bracketed paste, an unfinished escape
+ * sequence or paste marker across chunks; `armed: false` (the first moments after the prompt) never confirms.
+ *  - only a chunk that is exactly one carriage return confirms (`\n` / Ctrl+J, `\r\n` and an Enter inside a burst of
+ *    other keys, i.e. typed ahead or pasted, never do); `e` edits only as a chunk of its own;
+ *  - bracketed paste content is ignored (except Ctrl+C), also when the markers are split across chunks;
+ *  - an abort key (Ctrl+C, Ctrl+D, Esc, n, q) anywhere outside a paste aborts at once, also before the prompt is armed;
+ *  - escape sequences (arrows, F-keys) are skipped; Esc followed by Enter, Esc or a control key, or a malformed
+ *    sequence, is an Esc (abort); a chunk ending in a bare ESC is 'pending-esc' (the caller aborts unless the rest of
+ *    a sequence follows within a short delay).
+ */
+export function decideChunk(chunk, incomplete = false, state = {}) {
+  const armed = state.armed !== false;
+  const k = (state.pend || '') + String(chunk ?? '');
+  state.pend = '';
+  if (k.includes('\x03')) return 'abort';
+  if (!state.paste && armed && k === '\r') return incomplete ? 'edit' : 'run';
+  if (!state.paste && armed && (k === 'e' || k === 'E')) return 'edit';
+  let i = 0;
+  while (i < k.length) {
+    if (state.paste) {
+      const j = k.indexOf(PASTE_END, i);
+      if (j < 0) { state.pend = markerTail(k.slice(i), PASTE_END); return null; }
+      state.paste = false; i = j + PASTE_END.length; continue;
+    }
+    const c = k[i];
+    if (c === '\x1b') {
+      if (i + 1 >= k.length) { state.pend = '\x1b'; return 'pending-esc'; }
+      const n = k[i + 1];
+      if (n === '[' || n === 'O') {
+        let j = i + 2;
+        while (j < k.length && k.charCodeAt(j) >= 0x20 && k.charCodeAt(j) <= 0x3f) j++;
+        if (j >= k.length) { state.pend = k.slice(i); return null; } // the sequence continues in the next chunk
+        const f = k.charCodeAt(j);
+        if (!(f >= 0x40 && f <= 0x7e)) return 'abort'; // Esc, then other keys
+        if (k.slice(i, j + 1) === PASTE_START) state.paste = true;
+        i = j + 1; continue;
+      }
+      if (n === '\x1b' || k.charCodeAt(i + 1) < 0x20 || n === '\x7f') return 'abort';
+      i += 2; continue; // Alt+key
+    }
+    if (c === '\x04' || c === 'n' || c === 'N' || c === 'q' || c === 'Q') return 'abort';
+    i++;
   }
-  if (risk === 'medium') return { prompt: `${C.yellow('Medium risk.')} Type y to run, e to edit, anything else aborts: `, accepts: (a) => ['y', 'yes', 't', 'tak'].includes(ans(a)) };
-  return { prompt: '[Enter] run · e edit · n abort: ', accepts: (a) => ['', 'y', 'yes', 't', 'tak'].includes(ans(a)) };
+  return null;
+}
+
+/** Wait for a single deliberate key in raw mode (no line buffering, no echo). Typed-ahead input is discarded. */
+function readKey(rule) {
+  return new Promise((res) => {
+    const input = process.stdin;
+    const out = process.stdout;
+    const wasRaw = input.isRaw;
+    const state = { paste: false, pend: '', armed: false };
+    let escTimer = null;
+    let ready = false;
+    let armTimer = null;
+    input.setRawMode(true);
+    out.write('\x1b[?2004h'); // bracketed paste on
+    out.write(rule.prompt);
+    const done = (action) => {
+      clearTimeout(escTimer);
+      clearTimeout(armTimer);
+      input.removeListener('data', onData);
+      out.write('\x1b[?2004l');
+      input.setRawMode(wasRaw);
+      input.pause();
+      out.write('\n');
+      res(action);
+    };
+    const onData = (buf) => {
+      const s = buf.toString('utf8');
+      // input that was already waiting (typed or pasted while the suggestion was computed) is parsed (paste state,
+      // abort keys) but never confirms: state.armed is false until the prompt has been shown for a moment
+      clearTimeout(escTimer);
+      state.armed = ready;
+      const action = rule.decide(s, state);
+      if ((action === 'run' || action === 'edit') && !ready) return;
+      if (action === 'pending-esc') { escTimer = setTimeout(() => done('abort'), 60); return; }
+      if (action) done(action);
+    };
+    input.on('data', onData);
+    input.resume();
+    armTimer = setTimeout(() => { ready = true; }, 150);
+  });
 }
 
 export async function main(argv = process.argv.slice(2)) {
@@ -251,10 +341,9 @@ export async function main(argv = process.argv.slice(2)) {
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
@@ -266,8 +355,7 @@ export async function main(argv = process.argv.slice(2)) {
       for (const w of d.warnings) process.stdout.write(riskColor(risk)(`  ! ${w}`) + '\n');
       continue;
     }
-    if (incomplete) { if (ans === '') continue; return 130; }
-    if (!rule.accepts(ans)) { console.log('aborted'); return 130; }
+    if (action !== 'run' || incomplete) { console.log('aborted'); return 130; }
     if (critical) {
       const rl2 = createInterface({ input: process.stdin, output: process.stdout });
       const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
diff --git a/src/danger.js b/src/danger.js
index 7530e7d..1631d7a 100644
--- a/src/danger.js
+++ b/src/danger.js
@@ -936,8 +936,8 @@ export function assessCommand(command, baseRisk = 'safe', { lenient = false, all
 // ---------------------------------------------------------------------------------------------
 // Trust rule (v0.3 close3). A command is rated safe ONLY when it is byte-identical to a render of a catalog template whose
 // intent is risk=safe, with slot values that are plain literals (plainSlotValue). Anything else (composer output, a
-// history replay, a user edit, an unknown program, a construct the parser does not read) is at least high and needs an
-// explicit "yes"; --yes never runs it. The parser above only raises risk, never lowers it: it adds the reasons and
+// history replay, a user edit, an unknown program, a construct the parser does not read) is at least high and shows a red
+// warning before the prompt; --yes never runs it. The parser above only raises risk, never lowers it: it adds the reasons and
 // catches what must be retyped (critical), but a command it finds nothing wrong with is still not trusted.
 
 export const UNTRUSTED = 'not a catalog command rendered by tellsh with plain values (edited, composed, from history or unknown); it is not checked as safe';
diff --git a/src/pipeline.js b/src/pipeline.js
index 026190a..f24eb2d 100644
--- a/src/pipeline.js
+++ b/src/pipeline.js
@@ -411,7 +411,7 @@ export function suggest(query, opts = {}) {
 
 // the trust rule (danger.js): a command resolved from history (a reference, "same but …", a value from an earlier
 // command) is a replay, not a fresh render of what the request says: at least high, never auto-run
-const REPLAY = 'resolved from history (a replay of an earlier command, not a fresh catalog render); needs an explicit yes';
+const REPLAY = 'resolved from history (a replay of an earlier command, not a fresh catalog render); high risk: read it before pressing Enter';
 function replayFloor(s) {
   if (!s?.command || s.method !== 'history-rule' || s.risk === 'high') return s;
   return { ...s, risk: maxRisk(s.risk, 'high'), warnings: [REPLAY, ...(s.warnings || [])] };

exec
/bin/bash -lc "rg -n 'writeFile|mkdir|mkdtemp|rmSync|spawn|exec|readKey|confirmRule|decideChunk' test/regressions27.test.js test/regressions28.test.js test/danger.test.js test/compose.test.js src/env.js test/cli.test.js
node --test --test-reporter=dot test/regressions27.test.js test/regressions28.test.js test/danger.test.js test/compose.test.js" in /workspace/tellsh
 succeeded in 984ms:
test/cli.test.js:3:import { spawnSync } from 'node:child_process';
test/cli.test.js:5:import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/cli.test.js:10:const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/cli.test.js:42:test('dry-run prints command and never executes', () => {
test/cli.test.js:87:  const gap = run('--shell', 'cmd', 'make deploy.sh executable');
test/cli.test.js:94:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-cli-'));
test/cli.test.js:97:    writeFileSync(f, 'echo SECRET_TOKEN=abc123\ncat notes.txt\n');
test/cli.test.js:103:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions28.test.js:15:import { confirmRule } from '../src/cli.js';
test/regressions28.test.js:63:    ['make script.sh executable', 'chmod +x script.sh'],
test/regressions28.test.js:94:    const d = (k, st = {}) => confirmRule(r).decide(k, st);
test/regressions28.test.js:102:  const rule = confirmRule('high');
test/regressions28.test.js:136:  assert.equal(confirmRule('safe').warning, null);
test/regressions28.test.js:137:  assert.match(confirmRule('medium').warning, /Medium risk/);
test/regressions28.test.js:138:  assert.match(confirmRule('high').warning, /High risk/);
test/regressions28.test.js:139:  assert.match(confirmRule(undefined).warning, /High risk/);
test/regressions28.test.js:140:  assert.match(confirmRule('high', { composed: true }).warning, /High risk, experimental/);
test/regressions28.test.js:141:  for (const r of ['safe', 'medium', 'high']) assert.equal(confirmRule(r, { incomplete: true }).decide('\r', {}), 'edit', r);
test/regressions28.test.js:156:    'wrangler --version', 'wrangler dev', 'npx wrangler deploy', 'bun run dev', 'tox --help', 'poetry run pytest', 'uv run x.py', 'bundle exec rake']) {
test/compose.test.js:47:  const { spawnSync } = await import('node:child_process');
test/compose.test.js:48:  const r = spawnSync('sh', ['-c', 'node bin/tellsh.js --dry-run show disk usage | head -c 1 >/dev/null; echo $?'], { encoding: 'utf8' });
test/regressions27.test.js:24:  // final2-claude major: find -exec runs any program
test/regressions27.test.js:25:  'find . -exec ./evil {} +',
test/regressions27.test.js:26:  'find . -exec bash ./evil.sh \\;',
test/regressions27.test.js:27:  'find . -exec npx evil \\;',
test/regressions27.test.js:95:  assert.equal(plainSlotValue('name', 'x -exec rm {} +'), false);
....

codex
The parser changes cover the named round 2 cases, and the four focused test files pass. I’m now checking the real CLI under a PTY, including timing across the startup window and cleanup after aborts.
exec
/bin/bash -lc "python3 - <<'PY'
import os, pty, subprocess, select, time, json, termios, signal
master, slave = pty.openpty()
before = termios.tcgetattr(slave)
p = subprocess.Popen(['node','bin/tellsh.js','--shell','bash','list files sorted by modification time, oldest first, with details'], stdin=slave, stdout=slave, stderr=slave, env={**os.environ, 'NO_COLOR':'1'}, start_new_session=True)
buf=b''
deadline=time.monotonic()+5
while b'[Enter] run' not in buf and time.monotonic()<deadline:
    if select.select([master],[],[],0.1)[0]: buf += os.read(master,65536)
print(json.dumps({'prompt_seen':b'[Enter] run' in buf,'output':buf.decode(errors='replace')}))
if b'[Enter] run' in buf:
    os.write(master,b'n')
try: rc=p.wait(timeout=3)
except subprocess.TimeoutExpired: p.kill(); rc=p.wait()
while select.select([master],[],[],0)[0]:
    try: buf += os.read(master,65536)
    except OSError: break
print(json.dumps({'exit':rc,'restored':termios.tcgetattr(slave)==before,'output':buf.decode(errors='replace')}))
os.close(master);os.close(slave)
PY" in /workspace/tellsh
 succeeded in 140ms:
{"prompt_seen": true, "output": "$ ls -l -t -r\r\n  composed (experimental) ls \u00b7 bash/linux \u00b7 risk: high \u00b7 confidence: 97%\r\n  ~ assembled from a flag vocabulary (request asks for -t -r not in the catalog command); check it carefully\r\n  ! not a catalog command rendered by tellsh with plain values (edited, composed, from history or unknown); it is not checked as safe\r\n! High risk, experimental (composed) command: check it before pressing Enter.\r\n\u001b[?2004h[Enter] run \u00b7 e edit \u00b7 Esc abort "}
{"exit": 130, "restored": true, "output": "$ ls -l -t -r\r\n  composed (experimental) ls \u00b7 bash/linux \u00b7 risk: high \u00b7 confidence: 97%\r\n  ~ assembled from a flag vocabulary (request asks for -t -r not in the catalog command); check it carefully\r\n  ! not a catalog command rendered by tellsh with plain values (edited, composed, from history or unknown); it is not checked as safe\r\n! High risk, experimental (composed) command: check it before pressing Enter.\r\n\u001b[?2004h[Enter] run \u00b7 e edit \u00b7 Esc abort \u001b[?2004l\r\naborted\r\n"}

exec
/bin/bash -lc "node --input-type=module <<'JS'
import assert from 'node:assert/strict';
import { decideChunk, confirmRule } from './src/cli.js';
const start='\\x1b[200~', end='\\x1b[201~';
let count=0;
for(let a=1;a<start.length;a++) for(let b=1;b<end.length;b++) {
  const st={armed:false};
  for(const chunk of [start.slice(0,a),start.slice(a)+'paste']) assert.ok([null,'pending-esc'].includes(decideChunk(chunk,false,st)));
  st.armed=true;
  assert.equal(decideChunk('\\r',false,st),null);
  assert.equal(decideChunk(end.slice(0,b),false,st),null);
  assert.equal(decideChunk(end.slice(b),false,st),null);
  assert.equal(st.paste,false);
  assert.equal(decideChunk('\\r',false,st),'run'); count++;
}
for(const k of ['n','N','q','Q','\\x04','\\x03']) for(const suffix of [start+'paste', '\\x1b[', '\\x1b']) assert.equal(decideChunk(k+suffix,false,{}),'abort');
for(const invalid of ['\\r','\\n','\\x04','\\x1b','\\x7f','é']) for(const chunks of [['\\x1b['+invalid],['\\x1b[',invalid]]) {
  const st={}; let action=null;
  for(const c of chunks) action=decideChunk(c,false,st);
  assert.equal(action,'abort');
}
for(const risk of ['safe','medium','high',undefined]) assert.equal(confirmRule(risk,{incomplete:true}).decide('\\r',{}),'edit');
console.log(JSON.stringify({marker_split_combinations:count,abort_before_partial_sequence:'pass',malformed_CSI:'pass',incomplete:'pass'}));
JS" in /workspace/tellsh
exec
/bin/bash -lc "python3 - <<'PY'
import os, pty, subprocess, select, time, json, termios
ARGS=['node','bin/tellsh.js','--shell','bash','list files sorted by modification time, oldest first, with details']
CASES=[
 ('deliberate_enter',[(.24,b'\\r')],0),
 ('startup_enter',[(.03,b'\\r'),(.24,b'n')],130),
 ('LF_and_CRLF',[(.22,b'\\n'),(.26,b'\\r\\n'),(.32,b'q')],130),
 ('paste_across_startup',[(.03,b'\\x1b[200~text'),(.23,b'\\r'),(.26,b'more\\r'),(.29,b'\\x1b[201~'),(.35,b'n')],130),
 ('abort_before_paste',[(.23,b'n\\x1b[200~text'),(.28,b'\\x1b[201~'),(.33,b'\\r')],130),
 ('split_paste_end_abort',[(.22,b'\\x1b[200~text\\r'),(.26,b'\\x1b[201'),(.29,b'~'),(.34,b'q')],130),
 ('split_paste_end_then_enter',[(.22,b'\\x1b[200~text\\r'),(.26,b'\\x1b[20'),(.29,b'1~'),(.34,b'\\r')],0),
 ('split_paste_start_startup',[(.03,b'\\x1b[20'),(.08,b'0~text'),(.23,b'\\r'),(.26,b'\\x1b[201~'),(.34,b'n')],130),
 ('Esc_then_Enter',[(.23,b'\\x1b'),(.25,b'\\r')],130),
 ('Esc_Enter_one_chunk',[(.23,b'\\x1b\\r')],130),
 ('malformed_CSI_CR',[(.23,b'\\x1b['),(.25,b'\\r')],130),
 ('malformed_CSI_control',[(.23,b'\\x1b[12'),(.25,b'\\x01')],130),
 ('split_arrow_ignored',[(.23,b'\\x1b'),(.25,b'[A'),(.32,b'q')],130),
 ('batched_CtrlC',[(.23,b'x\\x03')],130),
 ('batched_abort_enter',[(.23,b'n\\r')],130),
]
CASES += [('startup_'+name,[(.03,key)],130) for name,key in [('Esc',b'\\x1b'),('CtrlC',b'\\x03'),('CtrlD',b'\\x04'),('n',b'n'),('q',b'q')]]
failures=[]
for name,events,expected in CASES:
    master,slave=pty.openpty(); before=termios.tcgetattr(slave)
    p=subprocess.Popen(ARGS,stdin=slave,stdout=slave,stderr=slave,env={**os.environ,'NO_COLOR':'1'},start_new_session=True)
    buf=b''; deadline=time.monotonic()+4
    while b'[Enter] run' not in buf and time.monotonic()<deadline:
        if select.select([master],[],[],.05)[0]: buf+=os.read(master,65536)
    start=time.monotonic(); premature=False
    for delay,data in events:
        while p.poll() is None and time.monotonic()<start+delay:
            if select.select([master],[],[],min(.02,max(0,start+delay-time.monotonic())))[0]: buf+=os.read(master,65536)
        if p.poll() is not None: break
        os.write(master,data)
    try: rc=p.wait(timeout=2)
    except subprocess.TimeoutExpired: p.kill(); rc=p.wait()
    while select.select([master],[],[],0)[0]:
        try: buf+=os.read(master,65536)
        except OSError: break
    restored=termios.tcgetattr(slave)==before
    result={'case':name,'exit':rc,'expected':expected,'restored':restored,'paste_disabled':b'\\x1b[?2004l' in buf,'pass':rc==expected and restored and b'\\x1b[?2004l' in buf}
    if not result['pass']: result['output']=buf.decode(errors='replace');failures.append(name)
    print(json.dumps(result),flush=True)
    os.close(master);os.close(slave)
print(json.dumps({'cases':len(CASES),'failures':failures}))
PY" in /workspace/tellsh
 succeeded in 60ms:
{"marker_split_combinations":25,"abort_before_partial_sequence":"pass","malformed_CSI":"pass","incomplete":"pass"}

 succeeded in 9053ms:
{"case": "deliberate_enter", "exit": 0, "expected": 0, "restored": true, "paste_disabled": true, "pass": true}
{"case": "startup_enter", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "LF_and_CRLF", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "paste_across_startup", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "abort_before_paste", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "split_paste_end_abort", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "split_paste_end_then_enter", "exit": 0, "expected": 0, "restored": true, "paste_disabled": true, "pass": true}
{"case": "split_paste_start_startup", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "Esc_then_Enter", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "Esc_Enter_one_chunk", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "malformed_CSI_CR", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "malformed_CSI_control", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "split_arrow_ignored", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "batched_CtrlC", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "batched_abort_enter", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "startup_Esc", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "startup_CtrlC", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "startup_CtrlD", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "startup_n", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"case": "startup_q", "exit": 130, "expected": 130, "restored": true, "paste_disabled": true, "pass": true}
{"cases": 20, "failures": []}

exec
/bin/bash -lc "cat bin/tellsh.js
nl -ba src/env.js | sed -n '1,210p'
rg -n 'critical|incomplete|missing' test/danger.test.js test/regressions27.test.js test/regressions28.test.js | head -50
rg -n 'needs.*yes|require.*yes|explicit.*yes|Ctrl\\+D|typed ahead|pasted' README.md CHANGELOG.md src/cli.js src/danger.js src/pipeline.js test/regressions28.test.js" in /workspace/tellsh
 succeeded in 0ms:
#!/usr/bin/env node
import { main } from '../src/cli.js';

// `tellsh … | head -1`: a closed pipe is not an error
for (const s of [process.stdout, process.stderr]) s.on('error', (e) => { if (e.code === 'EPIPE') process.exit(process.exitCode ?? 0); throw e; });

main().then((code) => { process.exitCode = code; }, (err) => {
  console.error(`tellsh: ${err?.stack || err}`);
  process.exitCode = 1;
});
     1	// Detect the target shell, OS and coreutils flavour (GNU / BSD / busybox). Results are fed to the
     2	// classifiers as `shell=X os=Y` tokens and select the per-shell rendering of the command.
     3	import { existsSync, readFileSync, readlinkSync, realpathSync } from 'node:fs';
     4	import { join, basename, delimiter } from 'node:path';
     5	
     6	export const SHELLS = ['bash', 'zsh', 'sh', 'powershell', 'fish', 'cmd'];
     7	export const OSES = ['linux', 'darwin', 'win32'];
     8	export const POSIX_SHELLS = new Set(['bash', 'zsh', 'sh']);
     9	
    10	const SHELL_ALIASES = {
    11	  bash: 'bash', zsh: 'zsh', sh: 'sh', dash: 'sh', ash: 'sh', busybox: 'sh', ksh: 'sh', mksh: 'sh',
    12	  pwsh: 'powershell', powershell: 'powershell', 'powershell.exe': 'powershell', 'pwsh.exe': 'powershell', ps: 'powershell',
    13	  fish: 'fish', cmd: 'cmd', 'cmd.exe': 'cmd',
    14	};
    15	export function normShell(s) {
    16	  if (!s) return null;
    17	  return SHELL_ALIASES[basename(String(s)).toLowerCase().replace(/^-/, '')] || null;
    18	}
    19	export function normOs(s) {
    20	  if (!s) return null;
    21	  const v = String(s).toLowerCase();
    22	  if (/^(linux|gnu)/.test(v)) return 'linux';
    23	  if (/^(darwin|mac|macos|osx)/.test(v)) return 'darwin';
    24	  if (/^(win|windows|win32)/.test(v)) return 'win32';
    25	  return null;
    26	}
    27	
    28	function parentComm(pid) {
    29	  try {
    30	    const stat = readFileSync(`/proc/${pid}/stat`, 'utf8');
    31	    const m = stat.match(/^\d+ \((.*)\) \S (\d+)/s);
    32	    return m ? { comm: m[1], ppid: +m[2] } : null;
    33	  } catch { return null; }
    34	}
    35	
    36	/** Shell that launched us: parent process chain (Linux /proc), PowerShell env heuristic, then $SHELL. */
    37	export function detectShell(env = process.env, os = process.platform) {
    38	  if (env.TELLSH_SHELL) return normShell(env.TELLSH_SHELL) || 'bash';
    39	  if (os === 'linux') {
    40	    let pid = process.ppid;
    41	    for (let i = 0; i < 4 && pid > 1; i++) {
    42	      const p = parentComm(pid);
    43	      if (!p) break;
    44	      const sh = normShell(p.comm);
    45	      if (sh) return sh;
    46	      pid = p.ppid; // e.g. npx / npm / node wrappers
    47	    }
    48	  }
    49	  if (os === 'win32') {
    50	    // PowerShell adds its per-user module dirs to PSModulePath; cmd.exe leaves only the system entry.
    51	    const psm = (env.PSModulePath || '').split(';').filter(Boolean);
    52	    if (psm.length >= 3 || /\\Documents\\(Windows)?PowerShell\\Modules/i.test(env.PSModulePath || '')) return 'powershell';
    53	    if (env.SHELL && normShell(env.SHELL)) return normShell(env.SHELL); // Git Bash / MSYS
    54	    return 'cmd';
    55	  }
    56	  return normShell(env.SHELL) || 'sh';
    57	}
    58	
    59	function onPath(name, env = process.env) {
    60	  for (const dir of (env.PATH || '').split(delimiter)) {
    61	    if (dir && existsSync(join(dir, name))) return true;
    62	  }
    63	  return false;
    64	}
    65	
    66	/** gnu | bsd | busybox. macOS = BSD unless Homebrew GNU coreutils (gdu/gsort) are installed. */
    67	export function detectCoreutils(os = process.platform, env = process.env) {
    68	  if (env.TELLSH_COREUTILS) return env.TELLSH_COREUTILS;
    69	  if (os === 'darwin') return onPath('gdu', env) && onPath('gsort', env) ? 'gnu' : 'bsd';
    70	  if (os === 'linux') {
    71	    try {
    72	      const ls = ['/bin/ls', '/usr/bin/ls'].find((p) => existsSync(p));
    73	      if (ls) {
    74	        const real = realpathSync(ls);
    75	        if (/busybox/.test(real) || /busybox/.test(readlinkSync(ls, { encoding: 'utf8' }).toString())) return 'busybox';
    76	      }
    77	    } catch { /* not a symlink */ }
    78	    return 'gnu';
    79	  }
    80	  return 'gnu';
    81	}
    82	
    83	/** -> { shell, os, coreutils, detected: {shell, os} } honouring --shell / --os overrides */
    84	export function detectEnv({ shell, os } = {}, env = process.env) {
    85	  const realOs = process.platform === 'darwin' || process.platform === 'win32' ? process.platform : 'linux';
    86	  const o = normOs(os) || (normShell(shell) === 'cmd' ? 'win32' : realOs);
    87	  const s = normShell(shell) || (o === realOs ? detectShell(env, realOs) : o === 'win32' ? 'powershell' : 'bash');
    88	  const coreutils = o === realOs ? detectCoreutils(o, env) : o === 'darwin' ? 'bsd' : 'gnu';
    89	  return { shell: s, os: o, coreutils };
    90	}
    91	
    92	/** classifier context tokens */
    93	export const envFeatures = (e) => [`shell=${e.shell}`, `os=${e.os}`];
test/regressions28.test.js:41:    assert.deepEqual(r.missing, [], q);
test/regressions28.test.js:53:    assert.ok(r.missing.includes(k), q);
test/regressions28.test.js:141:  for (const r of ['safe', 'medium', 'high']) assert.equal(confirmRule(r, { incomplete: true }).decide('\r', {}), 'edit', r);
test/regressions28.test.js:184:  assert.ok(two.missing.includes('workspace'));
test/regressions28.test.js:186:  assert.ok(run('run npm deploy --workspace ../x').missing.includes('workspace'));
test/regressions28.test.js:198:    assert.ok(r.missing.includes('scope'), q);
test/regressions28.test.js:214:  assert.ok(run('deploy worker --config other.toml').missing.length > 0);
test/regressions27.test.js:5://      parser only raises risk: it still reads $'…' quoting and sed e/w so a destructive payload stays critical.
test/regressions27.test.js:48:test("final2 blocker: $'…' is parsed as bash does, so the command after it is seen (rm -rf ~ stays critical)", () => {
test/regressions27.test.js:51:  assert.equal(d.critical, true, d.warnings.join('; '));
test/regressions27.test.js:55:  assert.equal(assessCommand("echo $'a b'").critical, false);
test/regressions27.test.js:76:  assert.equal(checkDanger('rm -rf /', 'safe', { rendered: true }).critical, true);
test/regressions27.test.js:126:  for (const [q, cmd, missing] of [
test/regressions27.test.js:133:    assert.deepEqual(r.missing, missing, q);
test/danger.test.js:8:const critical = [
test/danger.test.js:13:for (const c of critical) {
test/danger.test.js:14:  test(`critical: ${c}`, () => {
test/danger.test.js:17:    assert.equal(d.critical, true);
test/danger.test.js:33:    assert.equal(d.critical, false);
test/regressions28.test.js:5://  (2) prompt: a medium-risk command never runs on a plain Enter (it needs "y"); a high-risk one needs "yes".
src/cli.js:160: * The prompt and warning for a command at its risk (0.3.2): [Enter] runs at EVERY risk level, Esc / Ctrl+C / Ctrl+D /
src/cli.js:183: *    other keys, i.e. typed ahead or pasted, never do); `e` edits only as a chunk of its own;
src/cli.js:185: *  - an abort key (Ctrl+C, Ctrl+D, Esc, n, q) anywhere outside a paste aborts at once, also before the prompt is armed;
src/cli.js:251:      // input that was already waiting (typed or pasted while the suggestion was computed) is parsed (paste state,
CHANGELOG.md:6:**Ctrl+C** (also Ctrl+D, `n`, `q`) aborts, `e` edits. Medium-risk commands show a yellow warning line, high-risk, unrated
CHANGELOG.md:7:and composed (experimental) ones a red one, before the prompt. Only a deliberate Enter runs: keys typed or pasted while
README.md:63:readline), **Esc** / **Ctrl+C** (or **n** / **q**) aborts; keys typed ahead or pasted never confirm. Medium- and high-risk and composed commands print a colored warning line

exec
/bin/bash -lc "node --input-type=module <<'JS'
import { suggest } from './src/cli.js';
for (const q of ['delete file','delete folder /','print working directory','show the help for pytest','list files sorted by modification time, oldest first, with details']) {
 const s=suggest(q,{shell:'bash',os:'linux'});
 console.log(JSON.stringify({q,understood:s.understood,command:s.command,risk:s.risk,critical:s.critical,missing:s.missing,method:s.method}));
}
JS" in /workspace/tellsh
 succeeded in 146ms:
{"q":"delete file","understood":true,"command":"rm <FILE>","risk":"high","critical":false,"missing":["file"],"method":"catalog"}
{"q":"delete folder /","understood":true,"command":"rm -r /","risk":"high","critical":true,"missing":[],"method":"catalog"}
{"q":"print working directory","understood":true,"command":"pwd","risk":"safe","critical":false,"missing":[],"method":"catalog"}
{"q":"show the help for pytest","understood":true,"command":"pytest --help","risk":"medium","critical":false,"missing":[],"method":"catalog"}
{"q":"list files sorted by modification time, oldest first, with details","understood":true,"command":"ls -l -t -r","risk":"high","critical":false,"missing":[],"method":"composed"}

exec
/bin/bash -lc "node --test --test-reporter=dot --test-name-pattern='"'^(?!.*history=FILE)'"' test/cli.test.js" in /workspace/tellsh
exec
/bin/bash -lc "python3 - <<'PY'
import os, pty, subprocess, select, time, json, termios

def read_until(master,p,buf,marker,timeout=3):
    end=time.monotonic()+timeout
    while marker not in buf and p.poll() is None and time.monotonic()<end:
        if select.select([master],[],[],.05)[0]: buf+=os.read(master,65536)
    return buf

def finish(master,slave,p,buf,before):
    try: rc=p.wait(timeout=2)
    except subprocess.TimeoutExpired: p.kill();rc=p.wait()
    while select.select([master],[],[],0)[0]:
        try: buf+=os.read(master,65536)
        except OSError: break
    restored=termios.tcgetattr(slave)==before
    os.close(master);os.close(slave)
    return rc,buf,restored

for risk,query,color in [('medium','show the help for pytest',b'\\x1b[33m"'! Medium risk:'"'),('high','list files sorted by modification time, oldest first, with details',b'\\x1b[31m"'! High risk, experimental'"')]:
    master,slave=pty.openpty();before=termios.tcgetattr(slave)
    env=dict(os.environ);env.pop('NO_COLOR',None)
    p=subprocess.Popen(['node','bin/tellsh.js','--shell','bash',query],stdin=slave,stdout=slave,stderr=slave,env=env,start_new_session=True)
    buf=read_until(master,p,b'',b'[Enter] run')
    os.write(master,b'n')
    rc,buf,restored=finish(master,slave,p,buf,before)
    print(json.dumps({'case':risk+'_warning','color_correct':color in buf,'exit':rc,'restored':restored}))

master,slave=pty.openpty();before=termios.tcgetattr(slave)
p=subprocess.Popen(['node','bin/tellsh.js','--shell','bash','delete file'],stdin=slave,stdout=slave,stderr=slave,start_new_session=True)
buf=read_until(master,p,b'',b'[Enter]/e edit');time.sleep(.23);os.write(master,b'\\r')
buf=read_until(master,p,buf,b'edit> ')
opened=b'edit> ' in buf
os.write(master,b'\\x15\\r')
rc,buf,restored=finish(master,slave,p,buf,before)
print(json.dumps({'case':'incomplete_enter_opens_editor','opened_editor':opened,'exit':rc,'restored':restored}))

master,slave=pty.openpty();before=termios.tcgetattr(slave)
p=subprocess.Popen(['node','bin/tellsh.js','--shell','bash','delete folder /'],stdin=slave,stdout=slave,stderr=slave,start_new_session=True)
buf=read_until(master,p,b'',b'[Enter] run');time.sleep(.23);os.write(master,b'\\r')
buf=read_until(master,p,buf,b'Type the full command again to confirm: ')
retype=b'Type the full command again to confirm: ' in buf
os.write(master,b'not the command\\r')
rc,buf,restored=finish(master,slave,p,buf,before)
print(json.dumps({'case':'catastrophic_requires_retype','retype':retype,'exit':rc,'restored':restored}))
PY" in /workspace/tellsh
 exited 1 in 2789ms:
X

Failed tests:

✖ /workspace/tellsh/test/cli.test.js (2770.371706ms)
  'test failed'

 succeeded in 3225ms:
{"case": "medium_warning", "color_correct": true, "exit": 130, "restored": true}
{"case": "high_warning", "color_correct": true, "exit": 130, "restored": true}
{"case": "incomplete_enter_opens_editor", "opened_editor": true, "exit": -9, "restored": false}
{"case": "catastrophic_requires_retype", "retype": true, "exit": 130, "restored": true}

codex
All 20 PTY cases passed, including the named round 2 failures. Each completed case restored terminal settings and disabled bracketed paste. The 25 parser checks covering every start/end marker split also passed. I’m finishing the editor, catastrophic-retype, and warning-color checks.
exec
/bin/bash -lc "python3 -u - <<'PY'
import os, pty, subprocess, select, time, json, termios
master,slave=pty.openpty();before=termios.tcgetattr(slave)
p=subprocess.Popen(['node','bin/tellsh.js','--shell','bash','delete file'],stdin=slave,stdout=slave,stderr=slave,env={**os.environ,'NO_COLOR':'1'},start_new_session=True)
buf=b''
def collect(dt):
    global buf
    end=time.monotonic()+dt;part=b''
    while time.monotonic()<end:
        if select.select([master],[],[],min(.02,end-time.monotonic()))[0]:part+=os.read(master,65536)
    buf+=part;print(json.dumps({'output':part.decode(errors='replace'),'poll':p.poll(),'raw':not bool(termios.tcgetattr(slave)[3]&termios.ICANON)}))
collect(.4)
os.write(master,b'\\r');collect(.15)
os.write(master,b'\\x15');collect(.1)
os.write(master,b'\\r');collect(.3)
if p.poll() is None:
    os.write(master,b'n');collect(.3)
if p.poll() is None:
    os.write(master,b'\\x03');collect(.2)
if p.poll() is None: p.kill()
print(json.dumps({'exit':p.wait(),'restored':termios.tcgetattr(slave)==before,'all':buf.decode(errors='replace')}))
os.close(master);os.close(slave)
PY" in /workspace/tellsh
 succeeded in 1174ms:
{"output": "$ rm <FILE>\r\n  delete_file \u00b7 bash/linux \u00b7 risk: high \u00b7 confidence: 99%\r\n  ! rm deletes files permanently (no trash)\r\n  ? missing: file \u2014 edit the command (e) before running\r\n! High risk: check the command before pressing Enter.\r\n\u001b[?2004h[Enter]/e edit \u00b7 Esc abort ", "poll": null, "raw": true}
{"output": "\u001b[?2004l\r\nedit> rm <FILE>", "poll": null, "raw": true}
{"output": "\u0015", "poll": null, "raw": true}
{"output": "\r\r\n  risk: high\r\n  ! rm deletes files permanently (no trash)\r\n  ! redirect writes to a file\r\n! High risk: check the command before pressing Enter.\r\n\u001b[?2004h[Enter]/e edit \u00b7 Esc abort ", "poll": null, "raw": true}
{"output": "\u001b[?2004l\r\naborted\r\n", "poll": 130, "raw": false}
{"exit": 130, "restored": true, "all": "$ rm <FILE>\r\n  delete_file \u00b7 bash/linux \u00b7 risk: high \u00b7 confidence: 99%\r\n  ! rm deletes files permanently (no trash)\r\n  ? missing: file \u2014 edit the command (e) before running\r\n! High risk: check the command before pressing Enter.\r\n\u001b[?2004h[Enter]/e edit \u00b7 Esc abort \u001b[?2004l\r\nedit> rm <FILE>\u0015\r\r\n  risk: high\r\n  ! rm deletes files permanently (no trash)\r\n  ! redirect writes to a file\r\n! High risk: check the command before pressing Enter.\r\n\u001b[?2004h[Enter]/e edit \u00b7 Esc abort \u001b[?2004l\r\naborted\r\n"}

exec
/bin/bash -lc "node -p 'JSON.stringify({version:process.version,term:process.env.TERM})'
node --test --test-name-pattern='"'^--version$'"' test/cli.test.js
" in /workspace/tellsh
 exited 1 in 439ms:
{"version":"v20.19.2","term":"dumb"}
TAP version 13
# Subtest: /workspace/tellsh/test/cli.test.js
not ok 1 - /workspace/tellsh/test/cli.test.js
  ---
  duration_ms: 322.482853
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
# duration_ms 328.21291

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {spawnSync} from 'node:child_process';
const r=spawnSync(process.execPath,['bin/tellsh.js','--version'],{encoding:'utf8'});
console.log(JSON.stringify({status:r.status,error:r.error?.message,stdout:r.stdout,stderr:r.stderr}));
JS
git diff --check 080b628..HEAD -- src README.md CHANGELOG.md test/regressions28.test.js package.json
git status --short" in /workspace/tellsh
exec
/bin/bash -lc "python3 -u - <<'PY'
import os, pty, subprocess, select, time, json, termios
for name,query,edit in [('incomplete_stays_incomplete','delete file',b'\\r'),('e_opens_editor_and_clear_aborts','print working directory',b'\\x15\\r')]:
    master,slave=pty.openpty();before=termios.tcgetattr(slave)
    p=subprocess.Popen(['node','bin/tellsh.js','--shell','bash',query],stdin=slave,stdout=slave,stderr=slave,env={**os.environ,'TERM':'xterm-256color','NO_COLOR':'1'},start_new_session=True)
    buf=b''
    def read_to(marker,timeout=3):
        global buf
        end=time.monotonic()+timeout
        while marker not in buf and p.poll() is None and time.monotonic()<end:
            if select.select([master],[],[],.05)[0]: buf+=os.read(master,65536)
        return marker in buf
    initial=read_to(b'Esc abort ');time.sleep(.23)
    os.write(master,b'\\r' if name.startswith('incomplete') else b'e')
    opened=read_to(b'edit> ')
    os.write(master,edit)
    if name.startswith('incomplete'):
        buf=b'';still_incomplete=read_to(b'[Enter]/e edit')
        os.write(master,b'n')
    else: still_incomplete=None
    try:rc=p.wait(timeout=2)
    except subprocess.TimeoutExpired:p.kill();rc=p.wait()
    restored=termios.tcgetattr(slave)==before
    print(json.dumps({'case':name,'opened_editor':opened,'still_incomplete':still_incomplete,'exit':rc,'restored':restored}),flush=True)
    os.close(master);os.close(slave)
PY" in /workspace/tellsh
exec
/bin/bash -lc "python3 - <<'PY'
import subprocess,json
for name,args,expected in [
 ('non_TTY_print_only',['print working directory'],0),
 ('yes_safe',['--yes','print working directory'],0),
 ('yes_high_refused',['--yes','delete file nothing-here.txt'],4),
 ('yes_composed_refused',['--yes','--shell','bash','list files sorted by modification time, oldest first, with details'],4),
 ('yes_incomplete_refused',['--yes','delete file'],4),
]:
    r=subprocess.run(['node','bin/tellsh.js',*args],capture_output=True,text=True)
    print(json.dumps({'case':name,'exit':r.returncode,'expected':expected,'output':r.stdout,'stderr':r.stderr}))
PY" in /workspace/tellsh
 succeeded in 201ms:
{"status":0,"error":"spawnSync /usr/bin/node EPERM","stdout":"","stderr":""}
?? review/032-r3-claude.md
?? review/032-r3-codex.md

 succeeded in 793ms:
{"case": "incomplete_stays_incomplete", "opened_editor": true, "still_incomplete": true, "exit": 130, "restored": true}
{"case": "e_opens_editor_and_clear_aborts", "opened_editor": true, "still_incomplete": null, "exit": 130, "restored": true}

 succeeded in 1055ms:
{"case": "non_TTY_print_only", "exit": 0, "expected": 0, "output": "$ pwd\n  current_dir \u00b7 bash/linux \u00b7 risk: safe \u00b7 confidence: 74%\n", "stderr": ""}
{"case": "yes_safe", "exit": 0, "expected": 0, "output": "$ pwd\n  current_dir \u00b7 bash/linux \u00b7 risk: safe \u00b7 confidence: 74%\n/workspace/tellsh\n", "stderr": ""}
{"case": "yes_high_refused", "exit": 4, "expected": 4, "output": "$ rm nothing-here.txt\n  delete_file \u00b7 bash/linux \u00b7 risk: high \u00b7 confidence: 89%\n  ! rm deletes files permanently (no trash)\n  --yes only auto-runs safe catalog commands; this one is high. Not running.\n", "stderr": ""}
{"case": "yes_composed_refused", "exit": 4, "expected": 4, "output": "$ ls -l -t -r\n  composed (experimental) ls \u00b7 bash/linux \u00b7 risk: high \u00b7 confidence: 97%\n  ~ assembled from a flag vocabulary (request asks for -t -r not in the catalog command); check it carefully\n  ! not a catalog command rendered by tellsh with plain values (edited, composed, from history or unknown); it is not checked as safe\n  --yes only auto-runs safe catalog commands; this one is composed (experimental). Not running.\n", "stderr": ""}
{"case": "yes_incomplete_refused", "exit": 4, "expected": 4, "output": "$ rm <FILE>\n  delete_file \u00b7 bash/linux \u00b7 risk: high \u00b7 confidence: 99%\n  ! rm deletes files permanently (no trash)\n  ? missing: file \u2014 edit the command (e) before running\n  --yes only auto-runs safe catalog commands; this one is incomplete. Not running.\n", "stderr": ""}

codex
No blocker, major, or minor findings.

Verified all six r2 fixes with 20 PTY cases and 25 paste-marker split combinations. Warning colors, editing, incomplete-command protection, catastrophic retyping, terminal restoration, non-TTY behavior, and `--yes` also checked out.

Four focused test files passed. The CLI suite was blocked by sandbox `spawnSync` errors (`EPERM`); direct CLI checks passed. No files changed.

VERDICT: APPROVE
tokens used
70,429
No blocker, major, or minor findings.

Verified all six r2 fixes with 20 PTY cases and 25 paste-marker split combinations. Warning colors, editing, incomplete-command protection, catastrophic retyping, terminal restoration, non-TTY behavior, and `--yes` also checked out.

Four focused test files passed. The CLI suite was blocked by sandbox `spawnSync` errors (`EPERM`); direct CLI checks passed. No files changed.

VERDICT: APPROVE
