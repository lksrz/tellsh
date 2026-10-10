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
session id: 01a1255c-1a9a-73f3-9aff-f1aad1916b85
--------
user
Re-review of tellsh: review the diff since 0d87457 (git diff 0d87457) plus prior reviews in review/ and whether their findings were fixed; cover runtime and training/data code. Read-only, do NOT modify files. Findings with severity and file:line. End with exactly one line 'VERDICT: APPROVE' (no blocker/major remaining) or 'VERDICT: REQUEST_CHANGES'.
codex
I’ll review the diff and prior findings, check the runtime and training/data paths, and report remaining issues with severity and file:line references. I won’t modify files.

exec
/bin/bash -lc "pwd && rg --files -g 'AGENTS.md' -g 'review/**' -g '"'!**/node_modules/**'"' -g '"'!**/.git/**'"' && git status --short && git diff --stat 0d87457" in /workspace/tellsh
 succeeded in 52ms:
/workspace/tellsh
review/r1-codex.md
review/.r3done
review/r4-claude.md
review/r2-claude.md
review/r1-claude.md
review/fix3-log.md
review/.r1done
review/.f1done
review/r2-codex.md
review/.r2done
review/r4-codex.md
review/fix2-log.md
review/r3-claude.md
review/r3-codex.md
review/fix1-log.md
?? review/r4-claude.md
?? review/r4-codex.md
 .gitignore                          |    1 +
 EVAL.md                             |  189 +-
 README.md                           |   29 +-
 bin/tellsh.js                       |    3 +
 data/blind/compose.jsonl            |   58 +
 data/blind/e2e.jsonl                |  207 +
 data/blind/history.jsonl            |   79 +
 data/blind/intents.jsonl            |  844 +++
 data/blind/ood.jsonl                |   64 +
 data/candidates/ood_new.jsonl       |  464 ++
 data/candidates/paraA.jsonl         | 1329 +++++
 data/candidates/paraB.jsonl         | 1220 +++++
 data/eval_baseline_v0.2.json        |   56 +
 data/intents/g06_teacher.jsonl      | 1911 +++++++
 data/intents/g07_hardneg.jsonl      |  463 ++
 data/ood_teacher.jsonl              |  380 ++
 data/teacher/decisions.jsonl        |  152 +-
 data/teacher/hardneg_boost.jsonl    |    3 +
 data/teacher/hardneg_rejected.jsonl |  106 +
 data/teacher/hardneg_summary.json   |   29 +
 data/teacher/label_rejected.jsonl   |   39 +
 data/teacher/label_summary.json     |   27 +
 data/teacher/ledger.json            |   33 +
 data/teacher/ood_rejected.jsonl     |   64 +
 data/teacher/review.jsonl           |  152 +-
 data/teacher/verify_summary.json    |   91 +
 model/compose_explained.json        |    2 +-
 model/model.bin                     |  Bin 2707136 -> 2707136 bytes
 package.json                        |    2 +-
 review/.f1done                      |    0
 review/.r1done                      |    0
 review/.r2done                      |    0
 review/.r3done                      |    0
 review/fix1-log.md                  |   12 +
 review/fix2-log.md                  |   17 +
 review/fix3-log.md                  |   50 +
 review/r1-claude.md                 |  115 +
 review/r1-codex.md                  | 9854 +++++++++++++++++++++++++++++++++++
 review/r2-claude.md                 |   84 +
 review/r2-codex.md                  | 8616 ++++++++++++++++++++++++++++++
 review/r3-claude.md                 |   63 +
 review/r3-codex.md                  | 8281 +++++++++++++++++++++++++++++
 scripts/build_triggers.js           |    8 +-
 scripts/compare.js                  |   59 +
 scripts/eval.js                     |  313 +-
 scripts/gen_data.js                 |   50 +-
 scripts/lib/cmdnorm.js              |   10 +-
 scripts/lib/confusable.js           |   66 +
 scripts/lib/heldout.js              |   52 +
 scripts/lib/jev.js                  |  105 +
 scripts/lib/silver.js               |   51 +-
 scripts/report.js                   |    2 +-
 scripts/teacher.js                  |  471 +-
 scripts/tldr_ingest.py              |   12 +-
 scripts/train.py                    |   23 +-
 src/cli.js                          |   22 +-
 src/compose.js                      |  178 +-
 src/danger.js                       |  214 +-
 src/fill.js                         |   59 +-
 src/history.js                      |  542 +-
 src/model.js                        |   22 +-
 src/pipeline.js                     |  132 +-
 src/render.js                       |   96 +-
 src/shellwords.js                   |   41 +-
 src/slots.js                        |   49 +-
 src/tagger.js                       |   55 +-
 test/compose.test.js                |   50 +
 test/fixtures/parity.json           |    2 +-
 test/regressions2.test.js           |  324 ++
 test/regressions3-history.test.js   |   74 +
 test/regressions3-render.test.js    |  148 +
 test/regressions3.test.js           |   46 +
 test/regressions4.test.js           |  193 +
 test/shells.test.js                 |    6 +-
 74 files changed, 37887 insertions(+), 677 deletions(-)

exec
/bin/bash -lc 'find .. -name AGENTS.md -print; cat package.json; cat review/r1-claude.md review/r2-claude.md review/r3-claude.md review/fix1-log.md review/fix2-log.md review/fix3-log.md review/r4-claude.md; head -60 review/r4-codex.md' in /workspace/tellsh
 succeeded in 566ms:
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
    "./package.json": "./package.json"
  },
  "files": [
    "bin/tellsh.js",
    "src/*.js",
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
  "dependencies": {}
}
I found 1 blocker, 11 major and 13 minor issues, so I'm requesting changes. Quoting itself held up: injection attempts stayed as single quoted arguments in bash, zsh, fish and PowerShell, and cmd refuses values it can't quote safely. The problems are elsewhere: the wrong targets get picked for destructive commands, the composer lets values become options, and several held-out evaluation claims are not true.

All 151 tests pass (`npm test`). Re-running the data generation and a full retrain gave byte-identical build output and `model/model.bin`. The `scripts/eval.js` output matches EVAL.md exactly, and the training script's model format matches the runtime loader. Unless noted, I reproduced every runtime finding below with `--dry-run`/`--json`. The training findings come from a separate review pass; I re-read the `gen_data.js` filter, the end-to-end scoring loop and the teacher report text myself and they match. The prior review is in `review/r1-codex.md` (`review/r1-claude.md` is empty). The last commit says it fixed those findings, but seven of its training/eval findings are untouched.

## Blocker

**1. A path containing `(`, `,`, `;`, `:` or trailing dots is cut back to a parent directory, and that parent gets deleted.** (`src/tagger.js:106-112` `normPath`; `src/slots.js:147` `PATH_TOKEN`)
- The tagger finds the full span, then `normPath` re-extracts it and accepts a prefix. If that fails, a location word ("Downloads") is used instead.

| Request | Command produced |
|---|---|
| `delete folder ~/Downloads/backup(2)` | `rm -r ~/Downloads` |
| `delete the folder /home/me/photos,2019` | `rm -r /home/me/photos` |
| `remove directory /var/www/site;old` | `rm -r /var/www/site` |
| `delete file /srv/a:b.txt` | `rm /srv/a` |
| `delete folder ~/old...` | `rm -r ~/old` (still open from the prior review) |

- None of these is flagged critical, and each looks like a plausible command at the confirmation prompt.

## Major — runtime

**2. Composer: a value starting with `-` becomes an option, which can run code.** (`src/compose.js:440-460`, `validateComposed` at `:313-327`)
- Unlike `fill.js`, the composer never prefixes such values with `./`, and validation only looks at unquoted tokens.
- `spakuj notes.txt i '--use-compress-program=sh x.sh' do backup.tar szczegolowo` → `tar -c -v -f backup.tar notes.txt '--use-compress-program=sh x.sh'`, risk medium, no warnings. Running it executed `x.sh` (the composer review demonstrated this in a temp directory).

**3. Composer output uses POSIX quoting but is also offered to fish.** (`src/pipeline.js:154,221`)
- In fish, `\'` inside single quotes is an escape, so a value ending in `\` leaves the quote open and later text becomes code: `ls -l -S 'a\' 'b ; id ; echo'`.
- Not executed, because fish isn't installed here. Either use `fishQuote` or exclude fish from the composer.

**4. PowerShell 5.1 and pwsh < 7.3 pass embedded `"` to native programs unescaped.** (`src/fill.js:500-505` only fixes the `bash -c` wrapper; the native variants in `src/variants.js` are not covered.)
- `commit with message 'a" --amend "b'` → `git commit -m 'a" --amend "b'`; git receives `--amend` as an option.
- The same applies to the `tar`, `unzip`, `diff`, `chown` and `curl.exe` variants.
- Not executed (no pwsh here); this is documented legacy PowerShell behaviour.

**5. History: a move/copy destination becomes "it".** (`src/history.js:233,387-389`)
- `mv notes.txt ~/Documents/` followed by `delete it` → `rm -r ~/Documents/`, not flagged critical.
- PowerShell `Move-Item … -Destination C:\Users\me\Documents` behaves the same way.

**6. History: asking for a type that isn't in history falls back to a different type.** (`src/history.js:576-577`)
- `delete that branch` with only `ls tmp_dir` in history → `rm -r tmp_dir`.
- The branch pattern `gal\w*` also matches "gallery", so `delete that gallery folder` can become `git branch -d gallery`.

**7. History: the parsers pick the wrong word.** (`src/history.js:339,342,348,363`)

| History line | Request | Result |
|---|---|---|
| `kill -s 9 4242` | `kill that process` | `kill 9` |
| `ps aux \| grep -v grep \| grep node` | `kill it` | `pkill -f grep` |
| `pkill nginx -u bob` | `kill it` | `pkill -f bob` |
| `git checkout -- app.js` | `switch to that branch` | `git checkout app.js` (discards local changes, marked medium) |

**8. History: older or ambiguous targets still win** (prior review findings, still open):
- On a compound line the first command wins: `cat old.txt; cat new.txt` → `rm old.txt`.
- Redirect targets are ignored entirely.
- `chooseValue` (`src/history.js:606`) falls back to an older value when the newest one is ambiguous (`$BACKUP`).
- Implicit filling (`src/pipeline.js:203-214`) fills destructive commands without any reference word: `delete the folder` after `du -sh /var/lib/docker` → `rm -r /var/lib/docker`.
- There is no cwd tracking, so a relative path from before a `cd` is reused.

**9. The current `tellsh` call can become the "previous command".** (`src/history.js:281-288`)
- zsh with shared/incremental history, fish and PSReadLine write the running line to history first.
- `du -sh /home` then `same for /var` correctly gives `du -sh /var`. With the `tellsh --history same for /var` line also in history, it gives an unrelated `find … md5sum …` command.

## Major — training, data and evaluation

**10. Held-out text leaks into training.** (`scripts/gen_data.js:125` filters only the base rows)
- The typo copies (`:160`), relexicalised copies (`:164-166`) and hard-coded pronoun phrases (`:175-180`) are never checked.
- An instrumented run found 162 classifier rows and 81 tagger sequences matching 45 held-out texts. Examples: the eval sentence `show routng table`, and 20 of the 48 history-eval queries.
- The measured effect is small, but README.md:187 ("never used for training") is false.

**11. The "held-out value pool" is not held out.** (`scripts/lib/silver.js:139,155,164-172,179`; claim at `scripts/eval.js:267`)
- Many eval-pool values appear verbatim in training (`./src`, `app`, `docker`, port `3000`).
- Numbers, PIDs, sizes and ports are drawn from the same random ranges for train and eval.
- 62 eval values are kept unchanged.

**12. The end-to-end metric credits incomplete commands.** (`scripts/eval.js:251-258`)
- The gold command is built by the production code, and nothing requires the gold to be complete. 52 of 1,326 gold commands contain a placeholder, and 33 of those are counted as exact matches, e.g. `grep -rn -- <PATTERN> /etc`.

**13. The composer's flag table is built from unfiltered training data.** (`scripts/build_triggers.js:53-55`)
- It reads the 540 rows that `gen_data` drops for colliding with eval sets. The shipped `model/compose_explained.json` changes for 5 intents once they are filtered out.
- That table decides when the composer fires, so it affects the composer and false-fire metrics.

**14. The teacher check is not independent, and part of its report is hard-coded.**
- `scripts/teacher.js:88,104` renders the command from the gold intent and includes it in the question, so the answer leaks and "intent agreement 100%" is not an independent result.
- `:163` always prints "no disagreement, **0 training rows dropped or relabelled**", whatever the results or `decisions.jsonl` say.

## Minor

1. A safe command whose slot was filled from history keeps `method: 'catalog'` (`src/pipeline.js:203-215`). `show file contents` after `cat secret.txt` gives `cat secret.txt`, which `--yes` would run, contrary to the help text promising history-resolved commands never auto-run.
2. `--threshold foo` becomes NaN and every query counts as understood. `bake me a cake` was accepted at 0.27% confidence and exited 0 (`src/cli.js:61`).
3. The danger checker misses `busybox rm -rf /`, `rsync --delete … /`, `cp /dev/null /etc/passwd`, `docker run -v /:/h … rm -rf /h`, and `chmod -R -v 777 ~` / `tar -x -C /`. This only affects user-edited and composed commands.
   - `QUOTE_CHARS` in `src/danger.js:16` is unused, so PowerShell typographic quotes defeat the critical-target check: `Remove-Item -Recurse -Force ‘C:\’` is not flagged critical.
4. In `simpleCommands`/`splitCommand`, the POSIX `&>` branch can never run (`src/shellwords.js:201` vs `:211`), and `$(` is split at the `(`.
5. cmd: `/s /c` without wrapping quotes mangles edited commands that start with `"` (`src/cli.js:106,115`). Values starting with `/` are read as switches: `delete directory /q` → `rmdir /s /q`.
6. Function templates prefix `./` onto non-path values starting with `-`: `printf '%s' './-n hello'`, and the same for findstr and taskkill (`src/fill.js:486`).
7. Tilde expansion is applied to non-path slots: grep patterns, `git commit -m ~`, and PowerShell `.Replace($HOME, …)`.
8. "Same for" accepts pronouns and filler words as values: `what about this` → `rm this`, `and with force` → `rm -r force` (`src/history.js:546-548`).
9. `kill process named -9` → `kill 9`. Separately, `sedEscapeOld` doesn't escape newlines and the `old` slot accepts them (defensive gap only; I couldn't trigger it from the CLI).
10. A duplicate `case 'user'` in `src/compose.js:374/399` silently drops owner and author filters.
11. Two smaller performance and robustness issues:
    - The PowerShell history regex backtracks exponentially (`src/history.js:120`).
    - `model.bin` is parsed with no size or offset validation.
12. Training-side issues:
    - Pronoun-phrase triplets are split across the calibration holdout.
    - The compose threshold is calibrated on only 35 OOD rows.
    - The accept threshold falls back to 0.0 (accept everything) if no threshold reaches 97% kept (`scripts/train.py:194-231`).
    - 11 of the 99 hand-written slot cases appear verbatim in training.
13. Smaller training-script issues:
    - `cmdnorm` ignores quoting: `du -sh *` and `du -sh '*'` compare equal.
    - `report.js:12` uses a string replacement, so `$&`/`$'` in generated text would corrupt EVAL.md.
    - Tagger features are deduplicated in training but not at runtime (34 tokens affected).
    - `tldr_ingest.py` follows symlinks in an untrusted checkout.

No files were modified; my probe scripts are in `/tmp`.

VERDICT: REQUEST_CHANGES
I'm requesting changes. Most round-1 findings are fixed, but the diff adds two major runtime bugs that delete the wrong target. The shipped model and docs also predate all the training and data work.

All 184 tests pass (`npm test`). Nothing in the repo was modified; probe scripts are in `/tmp/r2h`, `/tmp/r2rt` and `/tmp/r2train`. I ran the history checks and the round-1 blocker repros myself and re-ran N2; the composer/danger/quoting and training checks came from two read-only helper passes. The old `review/r1-claude.md` was the baseline. `review/r2-codex.md` was still being written while I worked, so I didn't use it.

## What round 1 asked for, and its status

**Runtime: fixed and reproduced**
- **Round-1 blocker (paths cut back to a parent directory):** fixed. `backup(2)`, `photos,2019`, `site;old`, `a:b.txt` and `old...` now keep the whole path, quoted where needed.
- **Majors #2, #3, #5–#9:** fixed.
  - #2: composer values starting with `-` now get `./` and a `--` before them.
  - #3: the composer is turned off for fish.
  - #5: move/copy destinations are refused as "it".
  - #6: an "it" whose type isn't in history is refused instead of switching to another type.
  - #7: `kill -s 9`, `grep -v grep`, `pkill -u` and `checkout --` lines are read correctly.
  - #8: the newest target wins on compound lines, redirect targets work, ambiguous values are refused, implicit fills no longer touch destructive commands, and relative paths before a `cd` are dropped.
  - #9: the running `tellsh` line is skipped in zsh and fish history.
- **Major #4 (PowerShell quoting):** only partly fixed (see N1).
- **Runtime minors 1–6, 9 and 11:** fixed. Minor 7 (tilde expansion) and minor 10 (`--author`) are partly fixed; details in the minor list below.

**Training: the code is fixed, the shipped results are not**
- #10 (held-out text leaking into training): fixed for exact matches.
- #11 (held-out value pool): fixed.
- #12 (credit for incomplete gold commands): fixed.
- #13 (flag table built from unfiltered rows): fixed in code, but the shipped `compose_explained.json` is stale.
- #14 (teacher sees the gold answer; hard-coded report): fixed in code, but EVAL.md still shows the old report.
- All training minors: fixed.

## New findings

### Major
1. **Location phrases replace the folder the user named with `/`** (regression). `src/slots.js:94` `ROOT_LOCATION`, `src/tagger.js:569` `ROOT_PHRASE_END`.
   - `usuń folder cache na dysku` → `rm -r /`, where v0.2 gave `rm -r cache`.
   - `delete the cache folder on the disk` → `rm -r /`.
   - `delete old logs on my drive` → `rm /`.
   - The first two are critical, so they need a typed "yes", but the target is completely wrong.
2. **"Delete them" after a search deletes the whole search directory.** `src/history.js:337,546` treat the `find` root or `grep` path as the "dir" target.
   - `find /var/log -name "*.gz"` then `delete them` → `rm -r /var/log`, not flagged critical.
   - `grep -rl TODO src` → `rm -r src`.
   - `find . -name node_modules -type d` → `rm -r .` (critical).
   - It should refuse instead, as it already does for `find ~ -size +1G` + "delete those files".
3. **PowerShell < 7.3: only the first slot of native commands is checked for `"`.** `src/render.js:129-139` `pwshNativeSlots`: the text before a later slot is split at the `{` of an earlier slot, so later slots are skipped.
   - `extract x.tar.gz to 'out" --to-command="calc'` → `tar -xzvf 'x.tar.gz' -C 'out" --to-command="calc'`, medium risk, no gap. The same applies to `scp {target}:{dst}`.
   - Not executed (there's no pwsh here); the splitting is documented legacy PowerShell behaviour.
4. **The shipped model, flag table, EVAL.md and README are still v0.2.**
   - `model/model.bin` hasn't changed since 0eec20e. Its header shows 25,562 classifier rows; current `gen_data` produces 32,063. So the v0.3.0 package ships none of the new teacher data (g06, g07, `ood_teacher`), filters or `train.py` changes.
   - EVAL.md still says "v0.2 … model was not retrained". It reports 300 teacher calls, 100% agreement and 0 rows dropped; the artifacts say 4,182 calls, 97.6% agreement, 20 dropped and 2 relabelled.
   - Re-running the current `eval.js` on the shipped model gives different numbers from the README: end-to-end 84.3% vs 82.8%, composer "any acceptable" 51.0% vs 31.4%.
   - `review/fix1-log.md` says a retrain is running, but the only training process found writes to `/workspace/tellsh-hybrid`, not this repo.
5. **The "blind" eval sets aren't clean.**
   - Some are near-duplicates of training rows. 80 blind rows match a training row once filler words are removed (for example `list all symlinks in /usr/local/bin` vs `list symlinks in /usr/local/bin`); 24 of those come from the new teacher data.
   - `mine()` (`scripts/teacher.js:217`) starts from unfiltered rows. So 12 `g07_hardneg` rows are one-word rewrites of held-out sentences, such as `push my commits` → `pull my commits`.
   - 10 of the 13 `hardneg_boost` rows are held-out texts, and `verify` sent held-out texts to the external teacher API.
   - 75 blind rows duplicate `data/eval`, and 81 were already in the v0.2 training data. That contradicts "written without access" (`scripts/eval.js:281`, commit 8f05dcd). The measured effect on accuracy is small.

### Minor
- **Danger checker** (`src/danger.js`): still has gaps, though none are reachable from catalog output.
  - Rated safe: `timeout 5 rm -rf /`, `chroot / rm -rf /`, `mv /etc /tmp/x`, `docker run -v=/:/h`.
  - High but not critical: `rm -rf /.`, `find -L / -delete`.
  - Also high but not critical: `rm -r /usr/lib`, `/var/lib` and `~/.ssh`, while `/etc` is critical (inconsistent).
- **Composer:**
  - Still expands `~` inside patterns, and reuses the pattern as a search path: `grep -i -r -- ~/foo ~/foo src`.
  - `--author` never gets a value (`src/compose.js:~433`).
  - `validateComposed` accepts `$(…)` (not reachable today).
- **cmd:**
  - Any value starting with `/` is refused, even `findstr /c:/api` (`src/render.js:328`).
  - `foo/q` is passed unquoted and may act as a `/q` switch (suspected; no Windows to test).
- **History:**
  - `what about this` after `rm -r foo` → `uname -a`, with a note claiming dir=foo.
  - `ls /a /b` + "it" picks the first argument, not the last.
- **Training:**
  - The teacher's choices always include the gold label plus the model's own top guesses, so "agreement" isn't independent.
  - Prompts and cache keys depend on whichever `model.bin` is present, so reruns aren't reproducible.
  - A failed API call counts as a teacher rejection (`scripts/teacher.js:182-187`).
  - `train.py:330` always writes `test/fixtures/parity.json`, even with `--out`.
- **Repo:** HEAD commits a stray gitlink, `.claude/worktrees/agent-a5a0a1543e0102f5b`, with no `.gitmodules`, and `review/fix1-log.md` is a chat fragment rather than a fix log.

To clear the majors:
1. Narrow `ROOT_LOCATION` so it applies only when no folder is named.
2. Make "delete them" refuse after `find`/`grep`.
3. Check every PowerShell native slot, not just the first.
4. Retrain this repo's model, rebuild `compose_explained.json`, and regenerate EVAL.md and the README.
5. Filter near-duplicates out of training and run `mine`/`verify` on the filtered rows.

VERDICT: REQUEST_CHANGES
I'm requesting changes. All round-2 runtime findings are fixed and the training/data code is fixed, but two majors remain. The shipped model is still v0.2, and the round-2 "delete them" fix only covers `find`/`grep`, so the same bug comes back through other commands.

All 203 tests pass (`npm test`). Nothing in the repo was modified: probes ran from `/tmp/r3c`, and eval, `gen_data` and `build_triggers` ran on a `git archive` copy in `/tmp/r3c/repo`. A `scripts/train.py` process is running in `/workspace/tellsh` right now, but none of its output is committed. `review/r3-codex.md` was still being written, so I didn't use it.

## Status of round-2 findings

**Fixed, and I reproduced each fix:**
- **"On the disk" phrases:** `usuń folder cache na dysku` now gives `rm -r cache`. The English versions now leave a placeholder instead of `/`. `find … on the whole disk` still searches `/`.
- **"Delete them" after `find`/`grep`/`rg`/`fd`/`locate`:** refused, and `find|xargs` lines are refused too. `grep -rl TODO src` followed by `ls src` still allows `rm -r src`, as intended.
- **PowerShell < 7.3 checks every slot of a native command:** the `tar -C 'out" --to-command=…'` and `--use-compress-program` cases are now refused.
- **Codex history findings:** a later segment of a compound line wins across types. `cat old.txt; ls $D` is refused. `remove it` / `kill it` now pick the newest target, not an older one whose name contains the verb.
- **Paths:** `/tmp/data!` and `/tmp/a.txt.` become placeholders. `/tmp/data.` is kept literally.
- **Danger checker:** all the gaps listed in round 2 are now critical (`timeout`/`chroot` wrappers, `/.`, `/etc/..`, `find -L`, `/usr/lib`, `~/.ssh`, `mv /etc`, `-v=/:/h`).
- **Composer:** `~` stays literal, the pattern is no longer reused as a search path, `--author` gets a value, and `$(…)` is rejected.
- **Other runtime minors:** `ls /a /b` now picks `/b`. cmd's `findstr /c:"/api"` works.
- **Training/data:**
  - Near-duplicate and contrastive-rewrite filtering now happens wherever rows are emitted (`scripts/lib/heldout.js`).
  - I checked the current `gen_data` output: 0 emitted training rows hit the held-out index, and 0 rows in g06, g07, `ood_teacher` and `hardneg_boost`.
  - `mine`/`verify` now start from filtered rows.
  - A failed teacher call is no longer counted as a rejection.
  - The model that proposes the teacher's options is pinned by sha256.
  - `train.py --out` no longer overwrites the test fixture.
  - Blind-set contamination is reported, along with a clean subset.
  - The stray gitlink is gone.

**Still open:** the stale model and docs (Major 1 below) and the `what about this` minor.

## Findings

### Major
1. **The shipped model, flag table, EVAL.md and README are still v0.2.** Carried over from round 2, not fixed.
   - `model/model.bin` was last changed in 0eec20e. EVAL.md still says it was trained on 25,562 rows; current `gen_data` produces 31,653.
   - Rebuilding `model/compose_explained.json` with the current builder changes 10 intents, for example `grep_text` `-n,-r` → `-r` and `list_files` `-a,-l` → `-l`.
   - Running `scripts/eval.js` at HEAD gives different numbers from the committed EVAL.md and README (`README.md:196,199`):

     | metric | committed | eval at HEAD |
     |---|---|---|
     | end-to-end | 82.8% | 84.2% |
     | composer "any acceptable" | 31.4% | 51.0% |
     | cmd rendered | 117/149 | 114/149 |

   - The history and composer blind tables are missing, and the title still reads "v0.2 … not retrained" (`EVAL.md:1-10`).
   - `review/fix1-log.md:12` says round 2 "retrains the model and regenerates EVAL.md". It did neither, and `review/fix2-log.md` is a one-line chat fragment.
   - The teacher section says the 715 held-out rows sent to the teacher were "never trained on". That is false for the shipped v0.2 model, which only dropped exact matches.
   - Fix: let the retrain finish, run `build_triggers` and `npm run eval`, then commit the model, `compose_explained.json`, EVAL.md and README.

2. **"Delete them" after a filtered listing deletes the whole directory.** This is the same bug as round-2 Major #2, which was fixed only for `find`/`grep` (`src/history.js:562-565`, `:197`, `:422`). The search-root mark is set only when the command is `find`. `Get-ChildItem`/`gci`/`ls` and a `| grep` stage piped after them never set it.
   - PowerShell: `Get-ChildItem C:\Users\me\Downloads -Recurse -Include *.tmp` then `delete them` (or `delete it`) → `Remove-Item -LiteralPath 'C:\Users\me\Downloads' -Recurse`. It is not critical, and `Get-ChildItem $HOME\Downloads -Filter *.pdf` does the same.
   - bash: `ls -la ~/Downloads | grep pdf` then `delete them` → `rm -r ~/Downloads`, not critical. `ls ~/Pobrane | grep pdf` + `usuń je` does the same.
   - Fix: treat `-Filter`/`-Include`/`-Recurse` on `Get-ChildItem`, and any `ls DIR | grep …`, as a search root (refuse). Or refuse plural pronouns when the newest entity is a directory that was only listed.

### Minor
- **History:**
  - `what about this` after `rm -r foo` → `uname -a` (carried over).
  - `ls /tmp/build` + `delete them` → `rm -r /tmp/build`: a plural "them" deletes the directory itself.
  - `egrep`/`git grep`/`ack -l TODO src` + `delete them` gives a placeholder rather than an explicit refusal (safe, but inconsistent).
- **Danger checker** (`src/danger.js`, `WRAPPERS`): `unshare rm -rf /` and `watch rm -rf /` are rated safe. `shred -u /dev/sda` is high but not critical. Catalog output can't produce these.
- **Composer and slots:**
  - `grep for ~/foo recursively in src` → `grep -rn -- recursively ~/foo`: the filler word becomes the pattern and `src` is dropped (`src/compose.js` around line 500, or the catalog grep slot path).
  - PowerShell: `search for "a\" -e evil" in src` cuts the pattern to `'a\'`.
- **Data:** 9 blind rows still match a training row once word order is ignored, for example `last 30 kernel messages` and `pokaż dyski i partycje`. The impact is small.

VERDICT: REQUEST_CHANGES
# Round-1 fix log

Fixes for `review/r1-claude.md` and `review/r1-codex.md` (commits 2b5eea8..91d3b2c):

- f85d123 — training/eval: held-out exclusion at emission time, eval-only value pools, complete-gold scoring, independent teacher questions, computed teacher report.
- 0639b18 — paths keep every character (no cut back to a parent), whole-disk phrases map to `/`, wider danger checks.
- 15d5c84 — composer: safe operands (`./`, `--`), working grep, value binding, filename-blind triggers.
- 4374238 — history references: newest target only, no silent fallbacks, no implicit fill of destructive commands.
- bb2aac3 — per-shell quoting (PowerShell native arguments, cmd switches, fish), CLI/parser/model robustness.
- 91d3b2c — v0.3.0; CLI exits cleanly on a closed pipe.

The retrain these commits needed was not shipped in round 1, and not in round 2 either (see `review/fix2-log.md`); it shipped in round 3 (`review/fix3-log.md`).
# Round-2 fix log

Fixes for `review/r2-claude.md` and `review/r2-codex.md` (commit 81ba1e4):

- "on the disk" phrases are a search scope, never the target of a changing command; whole-disk searches still use `/`.
- "delete them" after `find`/`grep`/`rg`/`fd`/`locate` (and `find | xargs`) is refused: the search root is not what the search found.
- PowerShell < 7.3: every slot passed to a native program is checked for embedded `"` / trailing `\`.
- History: later segments of a compound line win across entity types; request verbs are not target hints; `ls /a /b` picks `/b`.
- Paths ending in sentence punctuation (`/tmp/data!`, `/tmp/a.txt.`) become placeholders for changing commands.
- Danger checker: `timeout`/`chroot` wrappers, `/.`, `/etc/..`, `find -L`, `/usr/lib`, `~/.ssh`, `mv /etc`, `-v=/:/h`.
- Composer: literal `~`, no pattern reused as a path, `--author` value, `$(…)` rejected; cmd `findstr /c:"/api"`.
- Training/data: near-duplicate and contrastive-rewrite exclusion wherever rows are emitted (`scripts/lib/heldout.js`), filtered
  `mine`/`verify` input, failed teacher calls not counted as rejections, pinned option model, `train.py --out` never overwrites the
  test fixture, blind-set contamination reported with a clean subset.

Not done in round 2 (despite the round-1 log saying so): the model was **not** retrained and EVAL.md/README still described
v0.2. The retrain started at the end of round 2 shipped in round 3 (`review/fix3-log.md`).
# Round-3 fix log

Fixes for `review/r3-claude.md` and `review/r3-codex.md`. Regression tests: `test/regressions4.test.js` (216 tests pass).

## Blocker
- **Refusal fell back to the catalog default** (codex 1): `buildCommand(…, { blank })` now renders withheld slots as
  placeholders instead of using the template default. Used for paths with trailing punctuation
  (`delete all log files in /tmp/data!` → `find <PATH> … -delete`), refused history references
  (`find /var/log …` + "delete all those log files" → `find <PATH> …`), search-root refusals and ambiguous "same for" slots.

## Major
- **Shipped model/docs were v0.2** (claude 1, codex 6): retrained (`gen_data` → `train.py` → `build_triggers`) on
  31,534 classifier rows / 34,434 tagged sequences. `model/model.bin`, `test/fixtures/parity.json`,
  `model/compose_explained.json`, EVAL.md (eval, bench, teacher sections + hand-written header) and the README table are
  regenerated from the final code. The shipped model was trained on exactly the current `gen_data` output (checked
  byte-for-byte). The round-1/round-2 fix logs are corrected (round 2 did not retrain).
- **"Delete them" after a filtered listing** (claude 2): `Get-ChildItem DIR -Filter/-Include/-Exclude/-Recurse` (or a
  positional filter) and `ls DIR | grep …` (also findstr/Select-String/Where-Object stages) mark DIR as a search root, so
  the reference is refused for changing commands.
- **Punctuation guard bypassed** (codex 2): "same for /tmp/data!" leaves the new path as a placeholder. The composer never
  aims a writing command (chmod, tar, or anything the danger checker flags) at such a path. Read-only compositions with
  a sentence comma after the path (`under ~/code, …`) still work.
- **"Same for" replayed an older destructive command** (codex 3): when a newer history line named other targets than the
  command it would repeat, and that command is not read-only, the request is refused (`understood: false`, no command;
  the CLI says "Cannot resolve … from history", exit 3).
- **Typed process references ignored recency** (codex 4): when a noun maps to several entity types ("that process":
  pid/proc), the newest one wins. An ambiguous newest `pgrep "$PROC"` is refused.
- **Literal tilde lost** (codex 5): a quoted or escaped leading `~` (`'~/notes.txt'`, `\~/notes.txt`, `"~"/x`) is decoded
  as `./~/…`, so it is rendered and compared as the literal directory. `~user` is treated as an expansion (refused).
  `sameCmd("cat '~/notes.txt'", "cat ~/notes.txt")` is now false.

## Minor
- `what about this` (no new target) → refused instead of `uname -a`.
- Plural "them/those/these/je/te" after a plain listing (`ls /tmp/build`, `Get-ChildItem DIR`) refers to the entries:
  refused for changing commands. "delete it" still targets the directory.
- `egrep`/`fgrep`/`ack`/`ag`/`git grep` are searches like `grep`: explicit refusal.
- Danger: `unshare`, `watch`, `nsenter`, `setpriv`, `strace`, `ltrace`, `flock`, `taskset`, `systemd-run`, `runuser`,
  `firejail`, `proot`, `fakeroot` are unwrapped. `shred`/`wipe`/`blkdiscard`/`truncate` on a disk device is critical.
- Composer/slots: option words ("recursively", "case-insensitive") are never the pattern. In "grep for ~/foo in src",
  the path-like word after the search verb is the pattern and the other path is the directory searched.
- A quoted request value that may end at an escaped quote (`"a\" -e evil"`) becomes a placeholder, with a warning, in
  every shell.
- A bare function word tagged as a path ("on" in "delete the cache folder on the disk") is never a target.
- Teacher accounting: every request sent counts in `stats.calls`, including failed and retried ones.
- Held-out near-duplicate matching ignores word order (`nearKey` sorts words): affects training exclusion and the blind
  contamination report.

## Numbers (EVAL.md)
end-to-end 82.8% → 85.3% · composer any-acceptable 31.4% → 52.9% · OOD rejected 92.4% → 94.6% · history 97.9%
(dev), 82.3% (v0.3 blind) · cmd 117 → 114/149 rendered (`/`-leading POSIX paths are refused as cmd.exe switches).
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
session id: 01a1255c-1a9a-73f3-9aff-f1aad1916b85
--------
user
Re-review of tellsh: review the diff since 0d87457 (git diff 0d87457) plus prior reviews in review/ and whether their findings were fixed; cover runtime and training/data code. Read-only, do NOT modify files. Findings with severity and file:line. End with exactly one line 'VERDICT: APPROVE' (no blocker/major remaining) or 'VERDICT: REQUEST_CHANGES'.
codex
I’ll review the diff and prior findings, check the runtime and training/data paths, and report remaining issues with severity and file:line references. I won’t modify files.

exec
/bin/bash -lc "pwd && rg --files -g 'AGENTS.md' -g 'review/**' -g '"'!**/node_modules/**'"' -g '"'!**/.git/**'"' && git status --short && git diff --stat 0d87457" in /workspace/tellsh
 succeeded in 52ms:
/workspace/tellsh
review/r1-codex.md
review/.r3done
review/r4-claude.md
review/r2-claude.md
review/r1-claude.md
review/fix3-log.md
review/.r1done
review/.f1done
review/r2-codex.md
review/.r2done
review/r4-codex.md
review/fix2-log.md
review/r3-claude.md
review/r3-codex.md
review/fix1-log.md
?? review/r4-claude.md
?? review/r4-codex.md
 .gitignore                          |    1 +
 EVAL.md                             |  189 +-
 README.md                           |   29 +-
 bin/tellsh.js                       |    3 +
 data/blind/compose.jsonl            |   58 +
 data/blind/e2e.jsonl                |  207 +
 data/blind/history.jsonl            |   79 +
 data/blind/intents.jsonl            |  844 +++
 data/blind/ood.jsonl                |   64 +
 data/candidates/ood_new.jsonl       |  464 ++
 data/candidates/paraA.jsonl         | 1329 +++++
 data/candidates/paraB.jsonl         | 1220 +++++
 data/eval_baseline_v0.2.json        |   56 +
 data/intents/g06_teacher.jsonl      | 1911 +++++++
 data/intents/g07_hardneg.jsonl      |  463 ++
 data/ood_teacher.jsonl              |  380 ++
 data/teacher/decisions.jsonl        |  152 +-
 data/teacher/hardneg_boost.jsonl    |    3 +
 data/teacher/hardneg_rejected.jsonl |  106 +
 data/teacher/hardneg_summary.json   |   29 +
 data/teacher/label_rejected.jsonl   |   39 +
 data/teacher/label_summary.json     |   27 +

exec
/bin/bash -lc 'git diff 0d87457 -- src/pipeline.js src/fill.js src/render.js src/slots.js src/tagger.js src/model.js src/cli.js bin/tellsh.js' in /workspace/tellsh
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
index c4f433c..435e3c5 100644
--- a/src/cli.js
+++ b/src/cli.js
@@ -58,7 +58,11 @@ export function parseArgs(argv) {
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
@@ -103,7 +107,9 @@ export function shellInvocation(command, shell) {
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
@@ -145,6 +151,7 @@ export async function main(argv = process.argv.slice(2)) {
   const opts = parseArgs(argv);
   if (opts.version) { console.log(pkg.version); return 0; }
   if (opts.help || !opts.words.length) { console.log(HELP); return opts.help ? 0 : 2; }
+  if (opts.badThreshold != null) { console.error(`tellsh: --threshold needs a number between 0 and 1 (got "${opts.badThreshold}")`); return 2; }
   const query = opts.words.join(' ');
   if (opts.shell && !normShell(opts.shell)) { console.error(`tellsh: unknown shell "${opts.shell}" (bash|zsh|sh|powershell|fish|cmd)`); return 2; }
   if (opts.os && !normOs(opts.os)) { console.error(`tellsh: unknown OS "${opts.os}" (linux|darwin|win32)`); return 2; }
@@ -164,6 +171,12 @@ export async function main(argv = process.argv.slice(2)) {
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
@@ -184,8 +197,9 @@ export async function main(argv = process.argv.slice(2)) {
   const interactive = process.stdin.isTTY && process.stdout.isTTY;
   const shellName = s.shell;
   if (opts.yes) {
-    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog') {
-      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' ? 'resolved from history' : s.missing.length ? 'incomplete' : s.risk;
+    const fromHistory = Object.values(s.slotSources || {}).includes('history');
+    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog' || fromHistory) {
+      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' || fromHistory ? 'resolved from history' : s.missing.length ? 'incomplete' : s.risk;
       console.log(C.yellow(`  --yes only auto-runs safe catalog commands; this one is ${why}. Not running.`));
       return 4;
     }
diff --git a/src/fill.js b/src/fill.js
index f9849d0..e96870e 100644
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
 
@@ -25,7 +25,8 @@ const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
 const PLACEHOLDER = (name) => `<${name.toUpperCase()}>`;
 
 // sed needs regex-escaped search text and &,\,/ escaped replacement
-const sedEscapeOld = (s) => s.replace(/[\\/.*^$[\]]/g, '\\$&');
+// (a newline would end the s command: written as \n, which never matches inside one line)
+const sedEscapeOld = (s) => s.replace(/[\\/.*^$[\]]/g, '\\$&').replace(/\n/g, '\\n');
 const sedEscapeNew = (s) => s.replace(/[\\/&]/g, '\\$&').replace(/\n/g, '\\n');
 
 /** Recompute derived slots after values were merged/overridden (tagger, history rules). */
@@ -43,6 +44,21 @@ export function resolveSlots(intent, ex) {
   const textual = ['pattern', 'message', 'text', 'name', 'old', 'branch', 'service', 'container', 'pkg', 'cmd', 'user']
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
@@ -95,8 +111,9 @@ export function resolveSlots(intent, ex) {
   if (ex.urls.length) v.url = ex.urls[0];
   else if (has('url') && ex.hosts.length) v.url = /^\w+:\/\//.test(ex.hosts[0]) ? ex.hosts[0] : `https://${ex.hosts[0]}`;
 
+  if (pathPattern != null) v.pattern = pathPattern;
   for (const k of ['name', 'service', 'container', 'pkg', 'cmd', 'var', 'branch', 'user', 'pattern', 'host', 'target', 'message']) {
-    if (has(k)) {
+    if (has(k) && v[k] == null) {
       const val = pickArg(k, ex);
       if (val != null && val !== '') v[k] = val;
     }
@@ -143,7 +160,7 @@ function renderValue(name, raw, values, quote) {
   let val = values[name];
   if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
   if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
-  return quote(val);
+  return quote(val, { tilde: PATH_SLOTS.has(name), name });
 }
 
 const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;
@@ -209,7 +226,7 @@ export const envFromPlatform = (platform = process.platform) => ({
  *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
  * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}
  */
-export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given } = {}) {
+export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [] } = {}) {
   const intent = BY_ID[intentId];
   if (!intent) throw new Error(`unknown intent ${intentId}`);
   const e = env || envFromPlatform(platform);
@@ -218,8 +235,14 @@ export function buildCommand(intentId, text, { platform = process.platform, env,
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
@@ -229,15 +252,33 @@ export function buildCommand(intentId, text, { platform = process.platform, env,
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
index c5430f7..281911e 100644
--- a/src/pipeline.js
+++ b/src/pipeline.js
@@ -9,13 +9,14 @@
 import { getModel } from './model.js';
 import { cascade } from './cascade.js';
 import { tag, exFromSpans } from './tagger.js';
-import { extractSlots, pickArg } from './slots.js';
+import { extractSlots, pickArg, isOptionWord } from './slots.js';
 import { resolveSlots, buildCommand, finalizeSlots, RAW_OK } from './fill.js';
 import { BY_ID } from './catalog.js';
 import { FAMILY_OF, NONE } from './tools.js';
 import { detectEnv, envFeatures } from './env.js';
 import { buildContext, resolveReference, hasPronoun, cwdFlags, sameBut, entityForSlot, isAmbiguous } from './history.js';
 import { compose } from './compose.js';
+import { checkDanger } from './danger.js';
 import { readFileSync } from 'node:fs';
 
 let EXPLAINED = null;
@@ -32,17 +33,21 @@ const PRONOUN_VALUE = /^(it|its|that|this|them|those|one|again|back|there|here|t
 
 // Non-path values must never start with `-` (they would become options: `ssh -oProxyCommand=…`,
 // `curl -o/path`); paths get a ./ prefix at render time instead.
+const FUNCTION_WORD = /^(?:the|a|an|of|for|to|in|on|at|by|with|from|into|onto|up|out|it|its|this|that|these|those|and|or|then|is|my|me|your|w|we|z|ze|na|do|od|dla|o|i|oraz|jest|mi|moim|tym|ten|ta|to|tej)$/i;
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
@@ -69,14 +74,39 @@ export function resolveWithTagger(intentId, text, { model = getModel(), tool, mo
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
   }
   finalizeSlots(intent, slots);
   return { slots, sources, spans: t.spans };
 }
 
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
@@ -96,11 +126,22 @@ function composeInput(text, model, tool) {
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
@@ -123,7 +164,7 @@ export function suggest(query, opts = {}) {
       return { intent: c.intent, slots: resolveWithTagger(c.intent, q, { model, tool: c.tool }).slots };
     };
     const kind = opts.historyKind || opts.history.kind || (env.shell === 'powershell' ? 'pwsh' : 'posix');
-    ctx = buildContext(opts.history, { classify: quick, cwd: opts.cwd, kind });
+    ctx = buildContext(opts.history, { classify: quick, cwd: opts.cwd, kind, query });
   }
   const ctxFeats = ctx ? ctx.features : (opts.cwd ? cwdFlags(opts.cwd).map((c) => 'ctx_cwd=' + c) : []);
   const extras = [...envFeatures(env), ...ctxFeats];
@@ -134,8 +175,21 @@ export function suggest(query, opts = {}) {
 
   // ---- rule: "same for X" reuses the previous intent with one slot replaced ----
   if (ref?.rule === 'same-for') {
-    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], validHistorySlots(ref.slots)) });
-    return { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
+    const slots = validHistorySlots(ref.slots);
+    const blank = [];
+    // the new path ends in sentence punctuation (`same for /tmp/data!`): placeholder, as for any request
+    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null && BY_ID[ref.intent].risk !== 'safe' && trailingPunctAfter(query, slots[ref.changed])) {
+      blank.push(ref.changed);
+      delete slots[ref.changed];
+    }
+    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank });
+    const res = { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
+    if (blank.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${blank.join(', ')}); quote the path`];
+    return res;
+  }
+  // ---- the reference cannot be resolved at all ("what about this", an older command to replay) ----
+  if (ref?.rule === 'refused' && ref.stop) {
+    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: ref.note };
   }
 
   const sb = ctx && !ref ? sameBut(query, ctx) : null;
@@ -151,12 +205,14 @@ export function suggest(query, opts = {}) {
 
   const tryCompose = (reason) => {
     if (composeMode === 'off') return null;
-    if (env.shell === 'powershell' || env.shell === 'cmd') return null; // composer vocabulary is POSIX-only
+    // composer vocabulary and quoting are POSIX-only (fish treats \\ and \' as escapes inside single quotes)
+    if (env.shell === 'powershell' || env.shell === 'cmd' || env.shell === 'fish') return null;
     const capable = c.tools.filter((t) => t.tool !== NONE);
     if (c.topTool === NONE && composeMode !== 'force') return null;
     const ci = composeInput(query, model, capable[0]?.tool);
     const r = compose(query, capable, ci.ex, { patternOf: ci.pattern, nameOf: ci.nameOf });
     if (!r || r.invalid) return r?.invalid ? { invalid: r.invalid, command: r.command } : null;
+    if (blocksAmbiguous(r, ci.ambiguousPaths)) return null;
     // calibrated gate: confident stage-1 tool, or strong flag evidence (>= 2 triggered flags) for a likely tool
     const pOf = capable.find((t) => t.tool === r.tool)?.p ?? 0;
     if (composeMode !== 'force' && !(c.topToolP >= model.thresholds.compose || (r.triggered.length >= 2 && pOf >= 0.2))) return null;
@@ -174,13 +230,39 @@ export function suggest(query, opts = {}) {
 
   const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode });
   const slots = r.slots;
+  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
+  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
+  const ambiguousPaths = [];
+  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
+  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
+  const blank = new Set();
+  if (BY_ID[intent].risk !== 'safe') {
+    for (const k of Object.keys(slots)) {
+      if (PATH_SLOT_NAMES.has(k) && r.sources[k] !== 'history' && trailingPunctAfter(query, slots[k])) { ambiguousPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
+    }
+    if (ambiguousPaths.length) finalizeSlots(BY_ID[intent], slots);
+  }
+  const ambiguousText = [];
+  for (const k of TEXT_SLOT_NAMES) {
+    if (slots[k] != null && cutAtEscapedQuote(query, slots[k])) { ambiguousText.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
+  }
+  if (ambiguousText.length) { delete slots.sedexpr; delete slots.namepat; finalizeSlots(BY_ID[intent], slots); }
   if (ref?.rule === 'refused') {
     // the reference points at something we cannot read safely: leave the slot empty (placeholder)
     for (const k of Object.keys(slots)) if (PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
+    for (const k of ref.blank || []) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
     finalizeSlots(BY_ID[intent], slots);
     method = 'history-rule';
   }
-  if (ref?.rule === 'pronoun') {
+  if (ref?.rule === 'pronoun' && ref.searchRoot && BY_ID[intent].risk !== 'safe') {
+    // the value is a find/grep search root and the classifier picked a modifying intent: refuse
+    for (const k of Object.keys(slots)) if (PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
+    for (const k of Object.keys(ref.fill)) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
+    finalizeSlots(BY_ID[intent], slots);
+    context.rule = 'refused';
+    context.note = ref.rootNote;
+    method = 'history-rule';
+  } else if (ref?.rule === 'pronoun') {
     const it = BY_ID[intent];
     for (const [k, v] of Object.entries(ref.fill)) {
       if (!validSlot(k, v)) { if (slots[k] != null && PRONOUN_VALUE.test(String(slots[k]))) delete slots[k]; continue; }
@@ -188,6 +270,8 @@ export function suggest(query, opts = {}) {
       const literal = slots[k] != null && !PRONOUN_VALUE.test(String(slots[k])) && new RegExp(`(^|[^\\w])${String(slots[k]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^\\w])`, 'i').test(query);
       if (usesSlot(it, k) && (!literal || (k === 'path' && slots[k] === '.'))) { slots[k] = v; r.sources[k] = 'history'; }
     }
+    // the chosen command does not take the referenced value: do not claim it was used
+    if (!Object.values(r.sources).includes('history')) { context.rule = null; context.note = `the ${ref.ent} from history does not fit ${intent}; not used`; }
     finalizeSlots(it, slots);
     method = 'history-rule';
   }
@@ -198,27 +282,35 @@ export function suggest(query, opts = {}) {
     }
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
   if (method === 'catalog' && ctx == null && hasPronoun(query) && b.missing.length) res.hint = 'this looks like a reference to an earlier command; try --history';
 
   // ---- second pass on modifier mismatch: the request asks for flags the catalog command lacks ----
   //   same tool: >= 1 triggered flag not in the catalog command; another stage-1 tool: >= 2 triggered flags
-  if (method === 'catalog' && composeMode !== 'off' && b.command && env.shell !== 'powershell' && env.shell !== 'cmd') {
+  if (method === 'catalog' && composeMode !== 'off' && b.command && !['powershell', 'cmd', 'fish'].includes(env.shell)) {
     const fam = FAMILY_OF[intent];
     const ci = composeInput(query, model, fam);
     const opt = { patternOf: ci.pattern, nameOf: ci.nameOf };
@@ -226,12 +318,14 @@ export function suggest(query, opts = {}) {
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
diff --git a/src/slots.js b/src/slots.js
index fb80f79..c741b31 100644
--- a/src/slots.js
+++ b/src/slots.js
@@ -89,12 +89,18 @@ const STOP = new Set(('the a an all any every some my me mi this that these thos
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
@@ -144,7 +150,29 @@ export function durationDerived(amount, unit) {
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
@@ -209,7 +237,7 @@ export function extractSlots(input) {
     const found = [];
     while ((m = PATH_TOKEN.exec(work))) {
       const start = m.index + m[0].length - m[1].length;
-      const raw = text.slice(start, start + m[1].length).replace(/[.]+$/, '');
+      const raw = trimPathPunct(text.slice(start, start + m[1].length));
       if (!raw) continue;
       if (/^\d+([.,]\d+)*$/.test(raw)) continue; // version/number
       if (/^\d+(\.\d+)?[kmgt]i?b?$/i.test(raw)) continue; // size like 1.5GB
@@ -240,6 +268,7 @@ export function extractSlots(input) {
   for (const [re, val] of LOCATIONS) {
     const m = work.match(re);
     if (m) {
+      if (re === ROOT_LOCATION) out.rootPhrase = true;
       spans.push([m.index, val]);
       mark('PATH', m.index, m.index + m[0].length, val);
       work = blank(work, m.index, m.index + m[0].length);
@@ -364,7 +393,8 @@ export function extractSlots(input) {
   }
   // 15. remaining numbers -> count
   {
-    const numMs = [...work.matchAll(/(?<![\w.])(\d+)(?![\w.])/g)];
+    // "-9" is an option/signal, never a count or a PID ("kill process named -9")
+    const numMs = [...work.matchAll(/(?<![\w.-])(\d+)(?![\w.])/g)];
     const nums = numMs.map((m) => +m[1]);
     out.numbers = nums;
     out.numberSpans = numMs.map((m) => ({ type: 'NUM', start: m.index, end: wordEnd(text, m.index), value: +m[1] }));
@@ -432,6 +462,13 @@ const TRIG = {
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
@@ -449,7 +486,7 @@ function taggedArg(slot, ex) {
     return host ? (user ? `${user}@${host}` : host) : null;
   }
   const t = TAG_OF[slot];
-  const v = (t && ex.tagged[t]?.[0]) ?? null;
+  const v = (t && (slot === 'pattern' ? ex.tagged[t]?.find((x) => !isOptionWord(x)) : ex.tagged[t]?.[0])) ?? null;
   return slot === 'service' && v ? v.replace(/\.service$/, '') : v;
 }
 
@@ -505,7 +542,7 @@ export function pickArg(slot, ex) {
     return p || null;
   }
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

exec
/bin/bash -lc 'tail -170 review/r1-codex.md; tail -150 review/r2-codex.md; tail -160 review/r3-codex.md' in /workspace/tellsh
 succeeded in 0ms:
JS" in /workspace/tellsh
 succeeded in 1301ms:
raw heldout rows 540 changed intent explanations [{"id":"process_tree","current":["--forest","-ef"],"clean":["--forest","-ef","aux"]},{"id":"git_status","current":["diff --stat","log --stat"],"clean":["diff --staged","diff --stat","log --stat"]},{"id":"git_log","current":["log --graph","log -n"],"clean":["branch -v","log --graph","log --oneline","log -n"]},{"id":"git_stash","clean":["log --graph"]},{"id":"docker_images","clean":["images -a","ps -a"]}]

exec
/bin/bash -lc "git status --short; nl -ba scripts/gen_data.js | sed -n '104,143p'; nl -ba src/tagger.js | sed -n '101,112p'" in /workspace/tellsh
 succeeded in 0ms:
?? review/
   104	    ...readJsonl(join(ROOT, 'data', 'shell', 'eval.jsonl')).map((r) => r.text),
   105	    ...readJsonl(join(ROOT, 'data', 'history', 'eval.jsonl')).map((r) => r.query),
   106	    ...readJsonl(join(ROOT, 'data', 'compose', 'eval.jsonl')).map((r) => r.text),
   107	    ...readJsonl(join(ROOT, 'data', 'slots', 'gold.jsonl')).map((r) => r.text),
   108	    ...readJsonl(join(ROOT, 'data', 'ood_eval.jsonl')).map((r) => r.text),
   109	  ].map(normalize));
   110	
   111	  const intentRows = [...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'train.jsonl'))]
   112	    .map((r) => ({ ...r, src: 'intents' }));
   113	  const shellRows = readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell' }));
   114	  for (const r of [...intentRows, ...shellRows]) if (!ids.has(r.intent)) throw new Error(`unknown intent ${r.intent}: ${r.text}`);
   115	
   116	  // teacher review decisions (data/teacher/decisions.jsonl): drop or relabel individual training rows
   117	  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl')).filter((d) => d.text && d.field !== 'risk');
   118	  const decide = new Map(decisions.map((d) => [normalize(d.text), d]));
   119	  let dropped = 0;
   120	  let teacherDropped = 0;
   121	  const seen = new Set();
   122	  const base = [];
   123	  for (const r0 of [...intentRows, ...shellRows]) {
   124	    const n = normalize(r0.text);
   125	    if (heldOut.has(n)) { dropped++; continue; }
   126	    const d = decide.get(n);
   127	    if (d?.action === 'drop') { teacherDropped++; continue; }
   128	    const r = d?.action === 'relabel' && d.intent ? { ...r0, intent: d.intent } : r0;
   129	    const key = n + '|' + r.intent + '|' + (r.shell || '');
   130	    if (seen.has(key)) continue;
   131	    seen.add(key);
   132	    base.push(r);
   133	  }
   134	
   135	  const cls = createWriteStream(join(outDir, 'cls.jsonl'));
   136	  const tag = createWriteStream(join(outDir, 'tag.jsonl'));
   137	  const counts = { cls: 0, tag: 0, bySrc: {} };
   138	  let gid = 0;
   139	  const emit = (text, family, intent, extras, w, g, lang, group) => {
   140	    const f = [...vectorize(text, DIM, extras).entries()].sort((a, b) => a[0] - b[0]).map(([k, v]) => [k, +v.toFixed(6)]);
   141	    cls.write(JSON.stringify({ y: family, i: intent || '', f, w, g, lang: lang || '', gid: group }) + '\n');
   142	    counts.cls++;
   143	    counts.bySrc[g] = (counts.bySrc[g] || 0) + 1;
   101	// ---------- span normalisation (regex parsers reused on the span text) ----------
   102	
   103	// generic nouns the tagger sometimes marks as a bare directory name ("ile zajmuje folder /etc")
   104	const GENERIC = /^(folder\w*|katalog\w*|director(y|ies)|dirs?|files?|plik\w*|archiw\w*|archives?|the|this|that|ten|ta|to|tego|tym|it|path|sciezk\w*|repo|project|projekt\w*|system\w*|dysk\w*|disk|location|lokalizacj\w*|miejsc\w*)$/;
   105	
   106	export function normPath(s) {
   107	  const t = s.replace(/[.,;:!?]+$/, '');
   108	  if (GENERIC.test(foldKeepLength(t).toLowerCase())) return null;
   109	  const ex = extractSlots(t);
   110	  if (ex.paths.length === 1) return ex.paths[0];
   111	  if (/^[\w~./@+-][\w~./@+ -]*$/.test(t) && !/\s/.test(t)) return t;
   112	  return null;

codex
Found **10 major and 2 minor issues** across runtime, training, data generation, and evaluation.

1. **major — Implicit history resolution bypasses `--yes` protection.**  
   [src/pipeline.js:209](/workspace/tellsh/src/pipeline.js:209), [src/cli.js:187](/workspace/tellsh/src/cli.js:187)  
   Filling missing slots from history leaves `method: 'catalog'`. With history `cat notes.txt`, `count words` produces `wc -w notes.txt`, marked safe/catalog, so it passes the auto-run gate. Mark every history-derived suggestion accordingly and check slot provenance before auto-running.

2. **major — Ambiguous history can fall back to a stale destructive target.**  
   [src/pipeline.js:206](/workspace/tellsh/src/pipeline.js:206)  
   `entityForSlot()` returns null for an ambiguous latest entity, but the fallback retrieves an older `ctx.last.slots` value. Reproduced: history `['cat old.txt', 'frobnicate new.txt']`, request `delete file` → `rm old.txt`. Distinguish “absent” from “ambiguous” and prohibit fallback for the latter.

3. **major — Compound history lines select the first target instead of the latest.**  
   [src/history.js:300](/workspace/tellsh/src/history.js:300), [src/history.js:395](/workspace/tellsh/src/history.js:395)  
   Segments are processed forwards while entities use `??=`, preserving the first occurrence. Both `cat old.txt; cat new.txt` and `cat old.txt; cat $F`, followed by `delete it`, produce `rm old.txt`. Later segments must supersede earlier entities, including with ambiguity markers.

4. **major — Path normalization changes deletion targets.**  
   [src/slots.js:212](/workspace/tellsh/src/slots.js:212), [src/tagger.js:107](/workspace/tellsh/src/tagger.js:107)  
   Trailing dots are stripped from paths. Reproduced: `delete file /tmp/data.` → `rm /tmp/data`; `delete directory /tmp/cache/..` → `rm -r /tmp/cache/`. Preserve filesystem path components; ambiguous punctuation must not silently redirect destructive commands.

5. **major — Augmentation and anaphora bypass held-out filtering.**  
   [scripts/gen_data.js:160](/workspace/tellsh/scripts/gen_data.js:160), [scripts/gen_data.js:178](/workspace/tellsh/scripts/gen_data.js:178)  
   Filtering applies to base rows before augmentation; generated replacements and anaphora are emitted without checking the held-out set. An in-memory generation audit found **162 classifier rows matching 37 distinct normalized evaluation texts**: 24 augmented rows and 138 anaphora rows. Apply the exclusion check to every emitted classifier and tagger example.

6. **major — Composer training reintroduces excluded evaluation rows.**  
   [scripts/build_triggers.js:53](/workspace/tellsh/scripts/build_triggers.js:53)  
   The explained-flag table reads raw training files, bypassing held-out exclusions and teacher decisions. It consumes **540 rows** that `gen_data.js` excludes for evaluation collisions. Removing those rows changes five intents’ explained-flag sets, demonstrating an actual effect on runtime routing. Build all learned artifacts from the same filtered training corpus.

7. **major — Calibration groups split copies of the same anaphora example.**  
   [scripts/gen_data.js:176](/workspace/tellsh/scripts/gen_data.js:176), [scripts/train.py:194](/workspace/tellsh/scripts/train.py:194)  
   Each of three context variants receives a different `gid`. Replaying the configured split against existing build data found **101/254 triplets crossing the train/holdout boundary**, with 115 holdout rows having the same phrase and label in training. Assign one group to the variants before sampling environments and context.

8. **major — “Held-out” value pools contain training values.**  
   [scripts/lib/silver.js:101](/workspace/tellsh/scripts/lib/silver.js:101), [scripts/lib/silver.js:139](/workspace/tellsh/scripts/lib/silver.js:139), [scripts/gen_data.js:162](/workspace/tellsh/scripts/gen_data.js:162)  
   Pool partitioning only separates replacement choices. Original training examples still include evaluation-pool values such as `/etc/hosts` and `~/.bashrc`; numeric, size, and duration generation also shares ranges across splits. Consequently, the reported experiment does not establish generalization to unseen values. Enforce value exclusion throughout training or relabel the metric.

9. **major — End-to-end evaluation credits incomplete commands.**  
   [scripts/eval.js:251](/workspace/tellsh/scripts/eval.js:251), [scripts/eval.js:258](/workspace/tellsh/scripts/eval.js:258)  
   Gold commands come from the production extraction/rendering path, and equality is checked without requiring complete slots. Reproducing the evaluation found **52 incomplete gold commands, with 33 credited as successful full-pipeline answers**. For example, a request mentioning `parseConfig` is credited for producing `grep -rn -- <PATTERN> /etc`. Validate gold commands independently and require complete, executable suggestions for success.

10. **major — Jev intent verification exposes the label through the command.**  
    [scripts/teacher.js:88](/workspace/tellsh/scripts/teacher.js:88), [scripts/teacher.js:104](/workspace/tellsh/scripts/teacher.js:104)  
    The command is rendered using the supplied training label and then included in the shared state for the intent-choice question. This reveals the proposed answer through its command semantics, compromising independent label verification and the interpretation of 100% agreement. Ask the intent question using only the request; provide the command separately for correctness and risk assessment.

11. **minor — Command comparison erases expansion semantics.**  
    [scripts/lib/cmdnorm.js:61](/workspace/tellsh/scripts/lib/cmdnorm.js:61)  
    Mapping tokens through `rawOf()` discards expansion/glob markers. Confirmed: `sameCmd("find . -name '*.log'", "find . -name *.log")` and `sameCmd("echo '$HOME'", "echo $HOME")` both return true. These commands behave differently; preserve expansion information when comparing evaluation answers.

12. **minor — Teacher reports hard-code successful review conclusions.**  
    [scripts/teacher.js:163](/workspace/tellsh/scripts/teacher.js:163)  
    Every regenerated report asserts “no disagreement” and “0 training rows dropped or relabelled,” regardless of current results or decisions. It also attributes command failures to previously fixed bugs unconditionally. Derive these statements from the current artifacts.

No files changed. Danger, parity, and slot test suites passed; full-suite verification encountered `EPERM` subprocess and `EROFS` temporary-file restrictions. Evaluation/generation findings above were reproduced in memory with writes disabled. Benchmark code was reviewed; no separate benchmark defect is asserted.

VERDICT: REQUEST_CHANGES
tokens used
193,392
Found **10 major and 2 minor issues** across runtime, training, data generation, and evaluation.

1. **major — Implicit history resolution bypasses `--yes` protection.**  
   [src/pipeline.js:209](/workspace/tellsh/src/pipeline.js:209), [src/cli.js:187](/workspace/tellsh/src/cli.js:187)  
   Filling missing slots from history leaves `method: 'catalog'`. With history `cat notes.txt`, `count words` produces `wc -w notes.txt`, marked safe/catalog, so it passes the auto-run gate. Mark every history-derived suggestion accordingly and check slot provenance before auto-running.

2. **major — Ambiguous history can fall back to a stale destructive target.**  
   [src/pipeline.js:206](/workspace/tellsh/src/pipeline.js:206)  
   `entityForSlot()` returns null for an ambiguous latest entity, but the fallback retrieves an older `ctx.last.slots` value. Reproduced: history `['cat old.txt', 'frobnicate new.txt']`, request `delete file` → `rm old.txt`. Distinguish “absent” from “ambiguous” and prohibit fallback for the latter.

3. **major — Compound history lines select the first target instead of the latest.**  
   [src/history.js:300](/workspace/tellsh/src/history.js:300), [src/history.js:395](/workspace/tellsh/src/history.js:395)  
   Segments are processed forwards while entities use `??=`, preserving the first occurrence. Both `cat old.txt; cat new.txt` and `cat old.txt; cat $F`, followed by `delete it`, produce `rm old.txt`. Later segments must supersede earlier entities, including with ambiguity markers.

4. **major — Path normalization changes deletion targets.**  
   [src/slots.js:212](/workspace/tellsh/src/slots.js:212), [src/tagger.js:107](/workspace/tellsh/src/tagger.js:107)  
   Trailing dots are stripped from paths. Reproduced: `delete file /tmp/data.` → `rm /tmp/data`; `delete directory /tmp/cache/..` → `rm -r /tmp/cache/`. Preserve filesystem path components; ambiguous punctuation must not silently redirect destructive commands.

5. **major — Augmentation and anaphora bypass held-out filtering.**  
   [scripts/gen_data.js:160](/workspace/tellsh/scripts/gen_data.js:160), [scripts/gen_data.js:178](/workspace/tellsh/scripts/gen_data.js:178)  
   Filtering applies to base rows before augmentation; generated replacements and anaphora are emitted without checking the held-out set. An in-memory generation audit found **162 classifier rows matching 37 distinct normalized evaluation texts**: 24 augmented rows and 138 anaphora rows. Apply the exclusion check to every emitted classifier and tagger example.

6. **major — Composer training reintroduces excluded evaluation rows.**  
   [scripts/build_triggers.js:53](/workspace/tellsh/scripts/build_triggers.js:53)  
   The explained-flag table reads raw training files, bypassing held-out exclusions and teacher decisions. It consumes **540 rows** that `gen_data.js` excludes for evaluation collisions. Removing those rows changes five intents’ explained-flag sets, demonstrating an actual effect on runtime routing. Build all learned artifacts from the same filtered training corpus.

7. **major — Calibration groups split copies of the same anaphora example.**  
   [scripts/gen_data.js:176](/workspace/tellsh/scripts/gen_data.js:176), [scripts/train.py:194](/workspace/tellsh/scripts/train.py:194)  
   Each of three context variants receives a different `gid`. Replaying the configured split against existing build data found **101/254 triplets crossing the train/holdout boundary**, with 115 holdout rows having the same phrase and label in training. Assign one group to the variants before sampling environments and context.

8. **major — “Held-out” value pools contain training values.**  
   [scripts/lib/silver.js:101](/workspace/tellsh/scripts/lib/silver.js:101), [scripts/lib/silver.js:139](/workspace/tellsh/scripts/lib/silver.js:139), [scripts/gen_data.js:162](/workspace/tellsh/scripts/gen_data.js:162)  
   Pool partitioning only separates replacement choices. Original training examples still include evaluation-pool values such as `/etc/hosts` and `~/.bashrc`; numeric, size, and duration generation also shares ranges across splits. Consequently, the reported experiment does not establish generalization to unseen values. Enforce value exclusion throughout training or relabel the metric.

9. **major — End-to-end evaluation credits incomplete commands.**  
   [scripts/eval.js:251](/workspace/tellsh/scripts/eval.js:251), [scripts/eval.js:258](/workspace/tellsh/scripts/eval.js:258)  
   Gold commands come from the production extraction/rendering path, and equality is checked without requiring complete slots. Reproducing the evaluation found **52 incomplete gold commands, with 33 credited as successful full-pipeline answers**. For example, a request mentioning `parseConfig` is credited for producing `grep -rn -- <PATTERN> /etc`. Validate gold commands independently and require complete, executable suggestions for success.

10. **major — Jev intent verification exposes the label through the command.**  
    [scripts/teacher.js:88](/workspace/tellsh/scripts/teacher.js:88), [scripts/teacher.js:104](/workspace/tellsh/scripts/teacher.js:104)  
    The command is rendered using the supplied training label and then included in the shared state for the intent-choice question. This reveals the proposed answer through its command semantics, compromising independent label verification and the interpretation of 100% agreement. Ask the intent question using only the request; provide the command separately for correctness and risk assessment.

11. **minor — Command comparison erases expansion semantics.**  
    [scripts/lib/cmdnorm.js:61](/workspace/tellsh/scripts/lib/cmdnorm.js:61)  
    Mapping tokens through `rawOf()` discards expansion/glob markers. Confirmed: `sameCmd("find . -name '*.log'", "find . -name *.log")` and `sameCmd("echo '$HOME'", "echo $HOME")` both return true. These commands behave differently; preserve expansion information when comparing evaluation answers.

12. **minor — Teacher reports hard-code successful review conclusions.**  
    [scripts/teacher.js:163](/workspace/tellsh/scripts/teacher.js:163)  
    Every regenerated report asserts “no disagreement” and “0 training rows dropped or relabelled,” regardless of current results or decisions. It also attributes command failures to previously fixed bugs unconditionally. Derive these statements from the current artifacts.

No files changed. Danger, parity, and slot test suites passed; full-suite verification encountered `EPERM` subprocess and `EROFS` temporary-file restrictions. Evaluation/generation findings above were reproduced in memory with writes disabled. Benchmark code was reviewed; no separate benchmark defect is asserted.

VERDICT: REQUEST_CHANGES
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
     1	// Replace a marked section in EVAL.md (keeps eval and bench results side by side).
     2	import { readFileSync, writeFileSync, existsSync } from 'node:fs';
     3	import { fileURLToPath } from 'node:url';
     4	
     5	export const EVAL_MD = fileURLToPath(new URL('../EVAL.md', import.meta.url));
     6	
     7	export function updateSection(name, body) {
     8	  let md = existsSync(EVAL_MD) ? readFileSync(EVAL_MD, 'utf8')
     9	    : '# tellsh evaluation\n\nGenerated by `npm run eval` and `npm run bench`.\n\n<!-- eval:start -->\n<!-- eval:end -->\n\n<!-- bench:start -->\n<!-- bench:end -->\n';
    10	  const re = new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`);
    11	  const block = `<!-- ${name}:start -->\n${body.trim()}\n<!-- ${name}:end -->`;
    12	  md = re.test(md) ? md.replace(re, () => block) : `${md.trimEnd()}\n\n${block}\n`;
    13	  writeFileSync(EVAL_MD, md);
    14	}
diff --git a/scripts/report.js b/scripts/report.js
index 41410ca..235f998 100644
--- a/scripts/report.js
+++ b/scripts/report.js
@@ -9,6 +9,6 @@ export function updateSection(name, body) {
     : '# tellsh evaluation\n\nGenerated by `npm run eval` and `npm run bench`.\n\n<!-- eval:start -->\n<!-- eval:end -->\n\n<!-- bench:start -->\n<!-- bench:end -->\n';
   const re = new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`);
   const block = `<!-- ${name}:start -->\n${body.trim()}\n<!-- ${name}:end -->`;
-  md = re.test(md) ? md.replace(re, block) : `${md.trimEnd()}\n\n${block}\n`;
+  md = re.test(md) ? md.replace(re, () => block) : `${md.trimEnd()}\n\n${block}\n`;
   writeFileSync(EVAL_MD, md);
 }
node_modules/
__pycache__/
*.pyc
*.tgz
.DS_Store
data/external/
build/

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';import {buildCommand} from './src/fill.js';
const q='search for \"~\" recursively ignoring case in /tmp';const s=suggest(q,{env:{shell:'bash',os:'linux'}});console.log({q,command:s.command,method:s.method});
for(const path of ['/tmp/data"'!'"','/tmp/a.txt.','/tmp/name)']){const q='delete folder '+path;const s=suggest(q,{env:{shell:'bash',os:'linux'}});console.log({q,command:s.command,critical:s.critical,missing:s.missing})}
JS
git status --short
git diff 0d87457 --stat -- model EVAL.md" in /workspace/tellsh
 succeeded in 781ms:
{
  q: 'search for "~" recursively ignoring case in /tmp',
  command: 'grep -i -r -- ~ /tmp',
  method: 'composed'
}
{
  q: 'delete folder /tmp/data!',
  command: 'rm -r /tmp/data',
  critical: false,
  missing: []
}
{
  q: 'delete folder /tmp/a.txt.',
  command: 'rm -r /tmp/a.txt',
  critical: false,
  missing: []
}
{
  q: 'delete folder /tmp/name)',
  command: 'rm -r /tmp/name',
  critical: false,
  missing: []
}
?? review/.f1done
?? review/r2-claude.md
?? review/r2-codex.md

codex
Found **5 major and 1 minor remaining issues**.

1. **Major — Path normalization still changes deletion targets.** [src/slots.js:169](/workspace/tellsh/src/slots.js:169), [src/slots.js:173](/workspace/tellsh/src/slots.js:173)  
   Reproduced `delete folder /tmp/data!` → `rm -r /tmp/data`, and `delete folder /tmp/a.txt.` → `rm -r /tmp/a.txt`. Both have complete slots and `critical: false`. These suffixes are valid filename characters; preserve them or refuse ambiguity. The prior path-safety finding is only partially fixed.

2. **Major — PowerShell’s native-argument guard misses subsequent placeholders.** [src/render.js:134](/workspace/tellsh/src/render.js:134)  
   Splitting the template prefix on `{` makes the preceding placeholder look like the command head. For `tar -czvf {archive} {path}`, only `archive` is checked. Reproduced a normal suggestion containing:
   ```
   tar -czvf 'backup.tar.gz' 'a" --use-compress-program=evil "b'
   ```
   It reports medium risk, no warnings, and no gap. This leaves the prior native option-injection problem open under Legacy argument passing. Rendering was reproduced; PowerShell execution was unavailable. [Microsoft’s argument-passing documentation](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_parsing?view=powershell-7.6#passing-arguments-that-contain-quote-characters) describes the relevant version difference.

3. **Major — Compound-history recency is still lost across entity types.** [src/history.js:596](/workspace/tellsh/src/history.js:596), [src/history.js:600](/workspace/tellsh/src/history.js:600)  
   All entities from one line receive the same recency; ties use the fixed entity-type order. History `cat old.txt; ls newdir`, followed by `delete it`, produces `rm old.txt`. Worse, `cat old.txt; ls $D` also produces `rm old.txt`, bypassing refusal of the newest ambiguous target. The same-type regression cases pass, but the broader prior finding remains.

4. **Major — Request verbs can select older destructive targets.** [src/history.js:779](/workspace/tellsh/src/history.js:779)  
   `chooseValue()` treats any matching request word as an explicit target hint, including verbs. Reproduced:
   - History `ls /srv/remove-backups`, then `ls /srv/current`; `remove it` → `rm -r /srv/remove-backups`.
   - History `pgrep kill-worker`, then `pgrep current-worker`; `kill it` → `pkill -f kill-worker`.

   Only explicit target-identifying words should override recency.

5. **Major — Shipped model artifacts do not contain the training fixes.** [package.json:28](/workspace/tellsh/package.json:28), [scripts/build_triggers.js:53](/workspace/tellsh/scripts/build_triggers.js:53)  
   `model/model.bin` is byte-identical to `0d87457`. Its header records **25,562 classifier rows / 28,232 tagger sequences**; running the current generator with writes intercepted produced **32,063 / 35,125**. Recomputing explained flags from the filtered corpus changes **10 intents**, but `model/compose_explained.json` is also unchanged. The new filtering, calibration, teacher decisions, and added data therefore have not reached the shipped model. `EVAL.md` likewise retains the old metrics and teacher conclusions. Rebuild and regenerate these artifacts before approval.

6. **Minor — Composer still expands non-path tildes.** [src/compose.js:386](/workspace/tellsh/src/compose.js:386), [src/compose.js:477](/workspace/tellsh/src/compose.js:477)  
   `search for "~" recursively ignoring case in /tmp` → `grep -i -r -- ~ /tmp`. The pattern expands to the home directory. The catalog quoting fix needs to cover composer values too.

The prior reviews’ main training-code findings are addressed: emission-time exclusions, grouped anaphora variants, filtered composer training input, revised value pools, complete-command scoring, independent teacher questions, and computed reports. Runtime fixes also address history auto-run protection, implicit destructive filling, the reported option-parser cases, composer option injection, and fish exclusion. The findings above identify remaining gaps.

No files were modified. Danger, parity, slots, and compose suites passed; broader checks encountered subprocess/filesystem restrictions. Generation and evaluation ran with writes intercepted in memory.

VERDICT: REQUEST_CHANGES
tokens used
151,291
Found **5 major and 1 minor remaining issues**.

1. **Major — Path normalization still changes deletion targets.** [src/slots.js:169](/workspace/tellsh/src/slots.js:169), [src/slots.js:173](/workspace/tellsh/src/slots.js:173)  
   Reproduced `delete folder /tmp/data!` → `rm -r /tmp/data`, and `delete folder /tmp/a.txt.` → `rm -r /tmp/a.txt`. Both have complete slots and `critical: false`. These suffixes are valid filename characters; preserve them or refuse ambiguity. The prior path-safety finding is only partially fixed.

2. **Major — PowerShell’s native-argument guard misses subsequent placeholders.** [src/render.js:134](/workspace/tellsh/src/render.js:134)  
   Splitting the template prefix on `{` makes the preceding placeholder look like the command head. For `tar -czvf {archive} {path}`, only `archive` is checked. Reproduced a normal suggestion containing:
   ```
   tar -czvf 'backup.tar.gz' 'a" --use-compress-program=evil "b'
   ```
   It reports medium risk, no warnings, and no gap. This leaves the prior native option-injection problem open under Legacy argument passing. Rendering was reproduced; PowerShell execution was unavailable. [Microsoft’s argument-passing documentation](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_parsing?view=powershell-7.6#passing-arguments-that-contain-quote-characters) describes the relevant version difference.

3. **Major — Compound-history recency is still lost across entity types.** [src/history.js:596](/workspace/tellsh/src/history.js:596), [src/history.js:600](/workspace/tellsh/src/history.js:600)  
   All entities from one line receive the same recency; ties use the fixed entity-type order. History `cat old.txt; ls newdir`, followed by `delete it`, produces `rm old.txt`. Worse, `cat old.txt; ls $D` also produces `rm old.txt`, bypassing refusal of the newest ambiguous target. The same-type regression cases pass, but the broader prior finding remains.

4. **Major — Request verbs can select older destructive targets.** [src/history.js:779](/workspace/tellsh/src/history.js:779)  
   `chooseValue()` treats any matching request word as an explicit target hint, including verbs. Reproduced:
   - History `ls /srv/remove-backups`, then `ls /srv/current`; `remove it` → `rm -r /srv/remove-backups`.
   - History `pgrep kill-worker`, then `pgrep current-worker`; `kill it` → `pkill -f kill-worker`.

   Only explicit target-identifying words should override recency.

5. **Major — Shipped model artifacts do not contain the training fixes.** [package.json:28](/workspace/tellsh/package.json:28), [scripts/build_triggers.js:53](/workspace/tellsh/scripts/build_triggers.js:53)  
   `model/model.bin` is byte-identical to `0d87457`. Its header records **25,562 classifier rows / 28,232 tagger sequences**; running the current generator with writes intercepted produced **32,063 / 35,125**. Recomputing explained flags from the filtered corpus changes **10 intents**, but `model/compose_explained.json` is also unchanged. The new filtering, calibration, teacher decisions, and added data therefore have not reached the shipped model. `EVAL.md` likewise retains the old metrics and teacher conclusions. Rebuild and regenerate these artifacts before approval.

6. **Minor — Composer still expands non-path tildes.** [src/compose.js:386](/workspace/tellsh/src/compose.js:386), [src/compose.js:477](/workspace/tellsh/src/compose.js:477)  
   `search for "~" recursively ignoring case in /tmp` → `grep -i -r -- ~ /tmp`. The pattern expands to the home directory. The catalog quoting fix needs to cover composer values too.

The prior reviews’ main training-code findings are addressed: emission-time exclusions, grouped anaphora variants, filtered composer training input, revised value pools, complete-command scoring, independent teacher questions, and computed reports. Runtime fixes also address history auto-run protection, implicit destructive filling, the reported option-parser cases, composer option injection, and fish exclusion. The findings above identify remaining gaps.

No files were modified. Danger, parity, slots, and compose suites passed; broader checks encountered subprocess/filesystem restrictions. Generation and evaluation ran with writes intercepted in memory.

VERDICT: REQUEST_CHANGES
   431	md();
   432	
   433	// ------------------------------------------------------------------------------------------
   434	// 8. blind sets for v0.3 (written by a separate author before any v0.3 result was seen)
   435	const blindInt = readJsonl(join(ROOT, 'data', 'blind', 'intents.jsonl'));
   436	const blindE2e = readJsonl(join(ROOT, 'data', 'blind', 'e2e.jsonl'));
   437	// Contamination: a blind row whose text (exactly, or after filler words are removed) also occurs in another
   438	// eval set or in any training source file (before gen_data.js filtering, so this includes rows the v0.2
   439	// model was trained on). Those rows are excluded from training now, but they were not written blind.
   440	const otherEval = heldOutIndex([
   441	  ...readDir(join(ROOT, 'data', 'eval')).map((r) => r.text), ...readJsonl(join(ROOT, 'data', 'shell', 'eval.jsonl')).map((r) => r.text),
   442	  ...readJsonl(join(ROOT, 'data', 'compose', 'eval.jsonl')).map((r) => r.text), ...readJsonl(join(ROOT, 'data', 'slots', 'gold.jsonl')).map((r) => r.text),
   443	  ...readJsonl(join(ROOT, 'data', 'ood_eval.jsonl')).map((r) => r.text), ...SLOT_CASES.map((c) => c[1]),
   444	].filter(Boolean));
   445	const trainSrc = new Set([...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')),
   173	    });
   174	    if (slots.namepat && !slots.name && !isAmbiguous(slots.namepat)) slots.name = slots.namepat.replace(/^\*|\*$/g, '');
   175	    return { intent: id, slots, ambiguous };
   176	  }
   177	  return null;
   178	}
   179	
   180	const FILE_HEADS = new Set(['cat', 'less', 'more', 'head', 'tail', 'vim', 'vi', 'nvim', 'nano', 'code', 'stat', 'file', 'wc',
   181	  'sha256sum', 'md5sum', 'shasum', 'md5', 'touch', 'open', 'bat', 'chmod', 'chown', 'source', 'python', 'python3', 'node', 'bash', 'sh', 'unzip', 'gzip', 'gunzip', 'xdg-open']);
   182	const DIR_HEADS = new Set(['cd', 'ls', 'du', 'find', 'tree', 'mkdir', 'rmdir', 'pushd', 'ncdu']);
   183	// heads whose arguments are never file references (no stale-reference invalidation for them)
   184	const INERT_HEADS = new Set(['echo', 'printf', 'man', 'which', 'whereis', 'type', 'history', 'clear', 'exit', 'export', 'alias', 'unalias',
   185	  'npm', 'npx', 'yarn', 'pnpm', 'make', 'cargo', 'go', 'pip', 'pip3', 'apt', 'apt-get', 'brew', 'tellsh', 'true', 'false', 'date', 'sleep',
?? review/r3-claude.md
?? review/r3-codex.md

codex
The original PowerShell, composer quoting, compound-history, and verb-matching repros now pass. Remaining history failures can still select an older process or replay an older delete command. The in-memory generator produces 31,653 classifier rows and 34,575 tagger sequences; the shipped model records 25,562 and 28,232. Current evaluation results also differ from EVAL.md.
exec
/bin/bash -lc "node --input-type=module <<'JS'
import fs from 'node:fs';import {syncBuiltinESMExports} from 'node:module';
fs.mkdirSync=()=>{};fs.appendFileSync=()=>{throw new Error('unexpected attempted write')};fs.writeFileSync=()=>{throw new Error('unexpected attempted write')};syncBuiltinESMExports();
process.env.TYPESAFE_API_KEY='review-test-placeholder';
let requests=0;globalThis.fetch=async()=>{requests++;return {ok:false,status:503,json:async()=>null,headers:{get:()=>null}};};
const {ask,stats}=await import('./scripts/lib/jev.js');
try{await ask('read-only-review-test',{}, {retries:0});}catch(e){console.log(JSON.stringify({error:e.message,requests,stats}));}
JS
nl -ba src/render.js | sed -n '17,26p'
nl -ba src/history.js | sed -n '158,175p'
nl -ba EVAL.md | sed -n '1,17p'
git diff --numstat 0d87457 -- model/model.bin model/compose_explained.json README.md
 git status --short" in /workspace/tellsh
 succeeded in 234ms:
{"error":"gave up after 0 retries (last status 503)","requests":1,"stats":{"calls":0,"cached":0,"failed":1,"retries":0,"inTok":0}}
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
   158	}
   159	
   160	function invert(cmd, kind = 'posix') {
   161	  for (const { id, re, names, raws } of inverters()) {
   162	    const m = cmd.match(re[kind]);
   163	    if (!m) continue;
   164	    const slots = {};
   165	    let ambiguous = false;
   166	    names.forEach((n, i) => {
   167	      const rv = m[i + 1];
   168	      if (rv == null) return;
   169	      if (raws[i]) { slots[n] = rv; return; }
   170	      const v = decodeWord(rv, kind);
   171	      if (v == null || isExpansion(v) || (isGlob(v) && !GLOB_SLOTS.has(n))) { ambiguous = true; slots[n] = AMB + rv; return; }
   172	      slots[n] = rawOf(v);
   173	    });
   174	    if (slots.namepat && !slots.name && !isAmbiguous(slots.namepat)) slots.name = slots.namepat.replace(/^\*|\*$/g, '');
   175	    return { intent: id, slots, ambiguous };
     1	# tellsh evaluation (v0.2)
     2	
     3	Generated by `npm run eval`, `npm run bench` and `node scripts/teacher.js` (teacher section).
     4	
     5	**Post-review update (2026-10-10).** Two code reviews of v0.2 found command-injection bugs (optional template
     6	segments were substituted twice; PowerShell typographic quotes were not escaped), danger-checker gaps, history
     7	references that could pick the wrong or a stale target, and an over-lenient eval comparison. All were fixed with
     8	regression tests (`test/regressions.test.js`). The model was **not** retrained; the classifier numbers are unchanged.
     9	What moved: composer "any answer acceptable" 33.3% → 31.4% (stricter command comparison), e2e EN given gold intent
    10	91.2% → 91.4%; history references stay at 97.9% with two gold commands updated for `kill_by_port -sTCP:LISTEN`.
    11	
    12	<!-- eval:start -->
    13	## Model
    14	
    15	`model/model.bin` **2.71 MB** (int8 weights, TSH2): stage 1 tool model 20000 rows × 55 classes (54 tool families + `__none__`), 30 stage-2 intent models (469250 weights), tagger 24000 rows × 27 BIO labels. Trained 2026-10-10 on 25562 classifier rows and 28232 tagged sequences. Thresholds: accept **0.365** (cascade score), compose **0.69** (stage-1 tool p). Internal holdout during training: tool top-1 92.5%, top-3 98.3%, intent 85.5%.
    16	
    17	## 1. Cascade accuracy per stage (held-out `data/eval`, shell=bash os=linux)
?? review/r3-claude.md
?? review/r3-codex.md

codex
Found **1 blocker, 5 major issues, and 1 minor issue**.

1. **Blocker — Refusing a path can redirect deletion to the current directory.** [src/pipeline.js:195](/workspace/tellsh/src/pipeline.js:195), [src/fill.js:226](/workspace/tellsh/src/fill.js:226)  
   `delete all log files in /tmp/data!` produces `find . -type f -iname '*.log' -delete`, with `missing: []`. Removing the ambiguous path restores the catalog’s `.` default, despite a warning claiming a placeholder. Likewise, after `find /var/log -type f -iname "*.log"`, `delete all those log files` reports `context.rule: refused` but produces that executable deletion command. Refusal must prevent default substitution.

2. **Major — History retargeting and composition bypass the punctuation guard.** [src/pipeline.js:149](/workspace/tellsh/src/pipeline.js:149), [src/pipeline.js:261](/workspace/tellsh/src/pipeline.js:261)  
   After `rm -r old`, `same for /tmp/data!` produces `rm -r /tmp/data`. Separately, `change permissions recursively to 777 on /tmp/data!` produces `chmod -R 777 -- /tmp/data`. Both have complete slots. The early history return skips validation; composition re-extracts the rejected path. The prior path-normalization finding remains partially open.

3. **Major — “Same for” can replay an older destructive command.** [src/history.js:615](/workspace/tellsh/src/history.js:615), [src/history.js:757](/workspace/tellsh/src/history.js:757)  
   History `['rm -r old', 'ls newdir']`, followed by `same for /srv/current`, produces `rm -r /srv/current`. `last` means the latest command with a recoverable catalog intent, silently skipping the newer listing. Retargeting must preserve the latest operation or refuse.

4. **Major — Typed process references ignore recency.** [src/history.js:773](/workspace/tellsh/src/history.js:773)  
   History `['kill 1111', 'pgrep current-worker']`, followed by `kill that process`, produces `kill 1111`. The noun mapping prefers `pid` over `proc` regardless of `refOrder`. Replacing the latest command with `pgrep "$PROC"` still selects the older PID instead of refusing ambiguity. Rank matching entity types by recency.

5. **Major — History loses literal-tilde semantics and changes deletion targets.** [src/history.js:170](/workspace/tellsh/src/history.js:170), [src/render.js:22](/workspace/tellsh/src/render.js:22)  
   After `cat '~/notes.txt'`, `delete it` produces `rm ~/notes.txt`. The original references a relative directory literally named `~`; the suggestion targets the user’s home directory. Escaped `\~/notes.txt` behaves identically. Preserve quoting/expansion provenance. The same omission leaves the previous comparison finding partially open: `sameCmd("cat '~/notes.txt'", "cat ~/notes.txt")` returns true.

6. **Major — Shipped artifacts still omit the training fixes.** [package.json:28](/workspace/tellsh/package.json:28), [scripts/build_triggers.js:53](/workspace/tellsh/scripts/build_triggers.js:53), [EVAL.md:15](/workspace/tellsh/EVAL.md:15)  
   Both `model/model.bin` and `model/compose_explained.json` are byte-identical to `0d87457`. Current generation produces **31,653 classifier rows / 34,575 tagger sequences**; the shipped model records **25,562 / 28,232**. Thus the new teacher data, exclusions, and calibration changes remain unshipped. Current evaluation gives **84.2%** relexicalized end-to-end accuracy and **51.0%** composer acceptability, versus **82.8% / 31.4%** in EVAL.md. Rebuild the artifacts and regenerate release metrics.

7. **Minor — Teacher accounting omits retryable failed requests.** [scripts/lib/jev.js:54](/workspace/tellsh/scripts/lib/jev.js:54), [scripts/lib/jev.js:72](/workspace/tellsh/scripts/lib/jev.js:72)  
   `stats.calls` increments only for successful or terminal responses. A mocked HTTP 503 with `retries: 0` makes one request but records `calls: 0, failed: 1`; retry attempts are likewise omitted from the advertised network-call total.

Prior-review fixes verified include the original internal-punctuation paths, whole-disk targeting repros, PowerShell later-slot checks, composer option protection and literal patterns, fish exclusion, compound-history ordering, verb hints, and history `--yes` protection. The original search-root repros pass, but finding 1 exposes an incomplete refusal mechanism.

Training-code fixes address emission-time exclusions, grouped anaphora variants, replacement pools, complete-gold scoring, filtered composer input, teacher questions/reporting, and near-duplicate exclusions. Evaluation now acknowledges contamination and computes clean subsets; these improvements do not resolve the stale shipped artifacts.

Selected suites: **89 passed; two subprocess round-trip tests were blocked by `EPERM`**. Generation and evaluation ran with writes intercepted in memory. No files were modified.

VERDICT: REQUEST_CHANGES
tokens used
155,728
Found **1 blocker, 5 major issues, and 1 minor issue**.

1. **Blocker — Refusing a path can redirect deletion to the current directory.** [src/pipeline.js:195](/workspace/tellsh/src/pipeline.js:195), [src/fill.js:226](/workspace/tellsh/src/fill.js:226)  
   `delete all log files in /tmp/data!` produces `find . -type f -iname '*.log' -delete`, with `missing: []`. Removing the ambiguous path restores the catalog’s `.` default, despite a warning claiming a placeholder. Likewise, after `find /var/log -type f -iname "*.log"`, `delete all those log files` reports `context.rule: refused` but produces that executable deletion command. Refusal must prevent default substitution.

2. **Major — History retargeting and composition bypass the punctuation guard.** [src/pipeline.js:149](/workspace/tellsh/src/pipeline.js:149), [src/pipeline.js:261](/workspace/tellsh/src/pipeline.js:261)  
   After `rm -r old`, `same for /tmp/data!` produces `rm -r /tmp/data`. Separately, `change permissions recursively to 777 on /tmp/data!` produces `chmod -R 777 -- /tmp/data`. Both have complete slots. The early history return skips validation; composition re-extracts the rejected path. The prior path-normalization finding remains partially open.

3. **Major — “Same for” can replay an older destructive command.** [src/history.js:615](/workspace/tellsh/src/history.js:615), [src/history.js:757](/workspace/tellsh/src/history.js:757)  
   History `['rm -r old', 'ls newdir']`, followed by `same for /srv/current`, produces `rm -r /srv/current`. `last` means the latest command with a recoverable catalog intent, silently skipping the newer listing. Retargeting must preserve the latest operation or refuse.

4. **Major — Typed process references ignore recency.** [src/history.js:773](/workspace/tellsh/src/history.js:773)  
   History `['kill 1111', 'pgrep current-worker']`, followed by `kill that process`, produces `kill 1111`. The noun mapping prefers `pid` over `proc` regardless of `refOrder`. Replacing the latest command with `pgrep "$PROC"` still selects the older PID instead of refusing ambiguity. Rank matching entity types by recency.

5. **Major — History loses literal-tilde semantics and changes deletion targets.** [src/history.js:170](/workspace/tellsh/src/history.js:170), [src/render.js:22](/workspace/tellsh/src/render.js:22)  
   After `cat '~/notes.txt'`, `delete it` produces `rm ~/notes.txt`. The original references a relative directory literally named `~`; the suggestion targets the user’s home directory. Escaped `\~/notes.txt` behaves identically. Preserve quoting/expansion provenance. The same omission leaves the previous comparison finding partially open: `sameCmd("cat '~/notes.txt'", "cat ~/notes.txt")` returns true.

6. **Major — Shipped artifacts still omit the training fixes.** [package.json:28](/workspace/tellsh/package.json:28), [scripts/build_triggers.js:53](/workspace/tellsh/scripts/build_triggers.js:53), [EVAL.md:15](/workspace/tellsh/EVAL.md:15)  
   Both `model/model.bin` and `model/compose_explained.json` are byte-identical to `0d87457`. Current generation produces **31,653 classifier rows / 34,575 tagger sequences**; the shipped model records **25,562 / 28,232**. Thus the new teacher data, exclusions, and calibration changes remain unshipped. Current evaluation gives **84.2%** relexicalized end-to-end accuracy and **51.0%** composer acceptability, versus **82.8% / 31.4%** in EVAL.md. Rebuild the artifacts and regenerate release metrics.

7. **Minor — Teacher accounting omits retryable failed requests.** [scripts/lib/jev.js:54](/workspace/tellsh/scripts/lib/jev.js:54), [scripts/lib/jev.js:72](/workspace/tellsh/scripts/lib/jev.js:72)  
   `stats.calls` increments only for successful or terminal responses. A mocked HTTP 503 with `retries: 0` makes one request but records `calls: 0, failed: 1`; retry attempts are likewise omitted from the advertised network-call total.

Prior-review fixes verified include the original internal-punctuation paths, whole-disk targeting repros, PowerShell later-slot checks, composer option protection and literal patterns, fish exclusion, compound-history ordering, verb hints, and history `--yes` protection. The original search-root repros pass, but finding 1 exposes an incomplete refusal mechanism.

Training-code fixes address emission-time exclusions, grouped anaphora variants, replacement pools, complete-gold scoring, filtered composer input, teacher questions/reporting, and near-duplicate exclusions. Evaluation now acknowledges contamination and computes clean subsets; these improvements do not resolve the stale shipped artifacts.

Selected suites: **89 passed; two subprocess round-trip tests were blocked by `EPERM`**. Generation and evaluation ran with writes intercepted in memory. No files were modified.

VERDICT: REQUEST_CHANGES

exec
/bin/bash -lc "rg -n 'writeFile|mkdir|exec|spawn|unlink|rmSync' test; cat scripts/lib/heldout.js; git diff 0d87457 -- scripts/gen_data.js scripts/train.py scripts/lib/silver.js scripts/build_triggers.js scripts/lib/cmdnorm.js scripts/tldr_ingest.py" in /workspace/tellsh
 succeeded in 0ms:
test/compose.test.js:47:  const { spawnSync } = await import('node:child_process');
test/compose.test.js:48:  const r = spawnSync('sh', ['-c', 'node bin/tellsh.js --dry-run show disk usage | head -c 1 >/dev/null; echo $?'], { encoding: 'utf8' });
test/regressions2.test.js:6:import { spawnSync } from 'node:child_process';
test/regressions2.test.js:8:import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
test/regressions2.test.js:25:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions2.test.js:107:  assert.equal(checkDanger('find / -xdev -type f -exec du -h {} +').risk, 'safe');
test/regressions2.test.js:174:    writeFileSync(hf, 'cat secret.txt\n');
test/regressions2.test.js:178:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions4.test.js:182:  const { spawnSync } = await import('node:child_process');
test/regressions4.test.js:183:  const { mkdtempSync, writeFileSync } = await import('node:fs');
test/regressions4.test.js:188:  writeFileSync(hist, 'rm -r old\nls newdir\n');
test/regressions4.test.js:189:  const r = spawnSync(process.execPath, ['bin/tellsh.js', '--dry-run', `--history=${hist}`, 'same', 'for', '/srv/current'], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/templates.test.js:3:import { execFileSync } from 'node:child_process';
test/templates.test.js:8:const roundTrip = (s) => execFileSync('bash', ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' });
test/cli.test.js:3:import { spawnSync } from 'node:child_process';
test/cli.test.js:5:import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/cli.test.js:10:const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/cli.test.js:42:test('dry-run prints command and never executes', () => {
test/cli.test.js:87:  const gap = run('--shell', 'cmd', 'make deploy.sh executable');
test/cli.test.js:97:    writeFileSync(f, 'echo SECRET_TOKEN=abc123\ncat notes.txt\n');
test/cli.test.js:103:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/shells.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/shells.test.js:12:const has = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
test/shells.test.js:51:      const res = spawnSync(checker, args, { encoding: 'utf8' });
test/shells.test.js:65:    if (has('fish')) { const res = spawnSync('fish', ['-n', '-c', r.command]); if (res.status !== 0) bad.push(it.id); }
test/shells.test.js:112:    for (const sh of ['bash', 'sh']) assert.equal(execFileSync(sh, ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' }), s);
test/pipeline.test.js:4:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/pipeline.test.js:52:  assert.equal(S('pokaż 5 największych plików w ~/Pobrane').command, 'find ~/Pobrane -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 5');
test/pipeline.test.js:92:    writeFileSync(f, Array.from({ length: 50 }, (_, i) => `: 17000000${i}:0;echo ${i}`).join('\n') + '\n');
test/pipeline.test.js:96:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/regressions.test.js:7:import { mkdtempSync, writeFileSync, readFileSync, rmSync, chmodSync } from 'node:fs';
test/regressions.test.js:23:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions.test.js:37:  const out = execFileSync('bash', ['-c', render("printf '[%s]' {file}«{dest}»", v).command], { encoding: 'utf8' });
test/regressions.test.js:52:    assert.equal(spawnSync('bash', ['-n', '-c', command]).status, 0, command);
test/regressions.test.js:58:test('CLI: the reported injection payloads stay quoted (bash) and never execute', () => {
test/regressions.test.js:66:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:175:  const out = execFileSync('sh', ['-c', `printf 'h1 ./a\\nh1 ./b\\nh2 ./c\\nh3 ./d\\nh3 ./e\\nh3 ./f\\n' | ${awk}`], { encoding: 'utf8' });
test/regressions.test.js:185:// pwsh parse check must never execute the checked source
test/regressions.test.js:192:    writeFileSync(fake, `#!/bin/sh\nprintf '%s\\n' "$@" > '${out}'\nprintf '%s' "$TELLSH_PARSE_SRC" > '${out}.src'\nexit 0\n`);
test/regressions.test.js:198:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:279:    writeFileSync(join(dir, 'notes.txt'), 'hello\n');
test/regressions.test.js:280:    writeFileSync(f, 'ls\ncat notes.txt\n');
test/regressions.test.js:286:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions3-render.test.js:49:    'sudo -u root rm -rf /', 'doas rm -rf /', 'nohup rm -rf ~', 'time -p rm -rf ~', 'exec rm -rf /boot', 'command rm -rf $HOME', 'setsid rm -rf /']) {
test/slot-cases.js:3:  ['largest_files', 'pokaż 5 największych plików w ~/Pobrane', 'find ~/Pobrane -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 5'],
test/slot-cases.js:4:  ['largest_files', 'top twenty biggest files in /var/log', 'find /var/log -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 20'],
test/slot-cases.js:5:  ['largest_files', 'piętnaście największych plików', 'find . -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 15'],
test/slot-cases.js:16:  ['find_larger_than', 'files bigger than 100 mb in /home', 'find /home -type f -size +100M -exec ls -lh {} +'],
test/slot-cases.js:17:  ['find_larger_than', 'pliki większe niż 1,5 GB', 'find . -type f -size +1536M -exec ls -lh {} +'],
test/slot-cases.js:18:  ['find_larger_than', 'find files over 2GB', 'find . -type f -size +2G -exec ls -lh {} +'],
test/slot-cases.js:19:  ['find_larger_than', 'pliki powyżej 500 megabajtów w /data', 'find /data -type f -size +500M -exec ls -lh {} +'],
test/slot-cases.js:48:  ['make_executable', 'make run.sh executable', 'chmod +x run.sh'],
test/slot-cases.js:57:  ['mkdir', 'create folder src/components/ui', 'mkdir -p src/components/ui'],
test/slot-cases.js:61:  ['count_lines_code', 'ile linii kodu w plikach python', "find . -type f -iname '*.py' -exec cat {} + | wc -l"],
test/slot-cases.js:94:  ['docker_exec', 'wejdź do kontenera redis', 'docker exec -it redis sh'],
// Held-out texts shared by gen_data.js, teacher.js and eval.js. A training text leaks when it equals a
// held-out text after normalize(), when it equals one after filler words are removed and word order is
// ignored ("list all symlinks in X" vs "list symlinks in X", "show disks and partitions" vs "partitions and
// disks show"), or when it is a contrastive rewrite (scripts/lib/confusable.js) of a
// held-out text ("push my commits" -> "pull my commits").
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { normalize } from '../../src/features.js';
import { CONTRAST_RULES } from './confusable.js';

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

/** Raw held-out request texts (eval sets, blind sets, slot gold, slot cases). */
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
diff --git a/scripts/build_triggers.js b/scripts/build_triggers.js
index 79406d6..02a13ab 100644
--- a/scripts/build_triggers.js
+++ b/scripts/build_triggers.js
@@ -49,10 +49,10 @@ writeFileSync(`${ROOT}model/tldr_triggers.json`, JSON.stringify(out));
 // intent means ("hidden" for hidden_files, "kernel" for dmesg) and must not make the composer replace it.
 const { triggeredFlags } = await import('../src/compose.js');
 const { FAMILY_OF } = await import('../src/tools.js');
-const { readdirSync } = await import('node:fs');
-const train = [...readdirSync(`${ROOT}data/intents`).filter((f) => f.endsWith('.jsonl')).flatMap((f) => readFileSync(`${ROOT}data/intents/${f}`, 'utf8').split('\n')),
-  ...(existsSync(`${ROOT}data/shell/train.jsonl`) ? readFileSync(`${ROOT}data/shell/train.jsonl`, 'utf8').split('\n') : [])]
-  .filter(Boolean).map((l) => JSON.parse(l));
+// read the FILTERED corpus written by gen_data.js (held-out collisions, eval-only values and teacher drops removed)
+const trainFile = `${ROOT}build/train_rows.jsonl`;
+if (!existsSync(trainFile)) { console.error('no build/train_rows.jsonl (run scripts/gen_data.js first)'); process.exit(1); }
+const train = readFileSync(trainFile, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
 const counts = {};
 const totals = {};
 for (const r of train) {
diff --git a/scripts/gen_data.js b/scripts/gen_data.js
index fad8a27..7e911df 100644
--- a/scripts/gen_data.js
+++ b/scripts/gen_data.js
@@ -11,7 +11,9 @@ import { INTENTS } from '../src/catalog.js';
 import { FAMILIES, FAMILY_OF, NONE, TAG_TYPES } from '../src/tools.js';
 import { vectorize, normalize, tagTokens, tagFeatures } from '../src/features.js';
 import { ctxFeatures } from '../src/history.js';
-import { silverSpans, relex, bioLabels, mulberry32 } from './lib/silver.js';
+import { silverSpans, relex, bioLabels, mulberry32, EVAL_VALUES } from './lib/silver.js';
+import { SLOT_CASES } from '../test/slot-cases.js';
+import { heldOutTexts, heldOutIndex } from './lib/heldout.js';
 
 const ROOT = fileURLToPath(new URL('..', import.meta.url));
 export const DIM = 1 << 18;
@@ -98,15 +100,13 @@ function main() {
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
+  // held-out texts (never trained on), with filler-word near-duplicates and contrastive rewrites
+  // (scripts/lib/heldout.js)
+  const heldOut = heldOutIndex(heldOutTexts(ROOT, SLOT_CASES.map((c) => c[1])));
+  // eval-only slot values (scripts/lib/silver.js EVAL_POOLS) must never occur in training text
+  const esc = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
+  const evalValRe = new RegExp(`(?<![\\p{L}\\d_])(?:${[...EVAL_VALUES].sort((a, b) => b.length - a.length).map(esc).join('|')})(?![\\p{L}\\d_])`, 'iu');
+  const leaks = (text) => heldOut.has(text) || evalValRe.test(text);
 
   const intentRows = [...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'train.jsonl'))]
     .map((r) => ({ ...r, src: 'intents' }));
@@ -117,12 +117,15 @@ function main() {
   const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl')).filter((d) => d.text && d.field !== 'risk');
   const decide = new Map(decisions.map((d) => [normalize(d.text), d]));
   let dropped = 0;
+  let droppedEvalValue = 0;
+  let droppedDerived = 0;
   let teacherDropped = 0;
   const seen = new Set();
   const base = [];
   for (const r0 of [...intentRows, ...shellRows]) {
     const n = normalize(r0.text);
-    if (heldOut.has(n)) { dropped++; continue; }
+    if (heldOut.has(r0.text)) { dropped++; continue; }
+    if (evalValRe.test(r0.text)) { droppedEvalValue++; continue; }
     const d = decide.get(n);
     if (d?.action === 'drop') { teacherDropped++; continue; }
     const r = d?.action === 'relabel' && d.intent ? { ...r0, intent: d.intent } : r0;
@@ -136,13 +139,17 @@ function main() {
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
@@ -150,6 +157,10 @@ function main() {
     counts.tag++;
   };
 
+  // teacher-confirmed low-margin rows of confusable intents (scripts/teacher.js mine) get a second copy
+  const boost = new Set(readJsonl(join(ROOT, 'data', 'teacher', 'hardneg_boost.jsonl')).map((r) => normalize(r.text) + '|' + r.intent));
+  let nBoost = 0;
+
   // 1. intent paraphrases (+ typo copy, + relexicalised copy), random env, some ctx noise
   for (const r of base) {
     const g = gid++;
@@ -157,6 +168,7 @@ function main() {
     const env = () => (r.shell ? [`shell=${r.shell}`, `os=${r.os || 'linux'}`] : sampleEnv());
     const ctx = () => (rng() < 0.25 ? randomCtx() : []);
     emit(r.text, fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g);
+    if (boost.has(normalize(r.text) + '|' + r.intent)) { emit(r.text, fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g); nBoost++; }
     emit(typo(r.text), fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g);
     const { spans } = silverSpans(r.text, r.intent);
     emitTag(r.text, spans, fam, g);
@@ -167,14 +179,17 @@ function main() {
     }
   }
 
+  // filtered training corpus for scripts/build_triggers.js (same exclusions and teacher decisions)
+  writeFileSync(join(outDir, 'train_rows.jsonl'), base.map((r) => JSON.stringify({ text: r.text, intent: r.intent, lang: r.lang, shell: r.shell || '' })).join('\n') + '\n');
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
@@ -190,7 +205,7 @@ function main() {
   let nT = 0;
   for (const r of tldr.sort(() => rng() - 0.5)) {
     if (!FAMILIES[r.tool] || !r.text || r.text.length < 8) continue;
-    if (heldOut.has(normalize(r.text))) continue;
+    if (leaks(r.text)) continue;
     const key = r.tool + r.lang;
     if ((cap[key] = (cap[key] || 0) + 1) > (r.lang === 'pl' ? 60 : 80)) continue;
     const win = /^windows\//.test(r.page || '');
@@ -199,9 +214,9 @@ function main() {
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
@@ -215,10 +230,11 @@ function main() {
     families: [...Object.keys(FAMILIES), NONE],
     intentsByFamily: FAMILIES,
     tagLabels,
-    counts: { ...counts, base: base.length, droppedHeldOut: dropped, teacherDropped, anaphora: nAna, tldr: nT, ood: ood.length },
+    counts: { ...counts, base: base.length, droppedHeldOut: dropped, droppedEvalValue, droppedDerived, teacherDropped, boosted: nBoost, anaphora: nAna, tldr: nT, ood: ood.length },
   };
   writeFileSync(join(outDir, 'meta.json'), JSON.stringify(meta, null, 1));
-  console.log(`gen_data: ${base.length} base sentences (${dropped} dropped: collide with held-out sets), ` +
+  console.log(`gen_data: ${base.length} base sentences (${dropped} dropped: collide with held-out sets; ${droppedEvalValue} mention an eval-only value; ` +
+    `${droppedDerived} derived rows dropped), ` +
     `${counts.cls} classifier rows ${JSON.stringify(counts.bySrc)}, ${counts.tag} tagger sequences, ${nT} tldr rows, ${nAna} anaphora rows`);
 }
 
diff --git a/scripts/lib/cmdnorm.js b/scripts/lib/cmdnorm.js
index b0273c3..9a4c607 100644
--- a/scripts/lib/cmdnorm.js
+++ b/scripts/lib/cmdnorm.js
@@ -1,10 +1,14 @@
 // Normalisation of simple commands for the composer eval. Only rewrites that keep the behaviour:
 //   option bundling / order for ordinary commands: "ls -ltr" == "ls -l -r -t"; "tar -tzvf a.tgz" == "tar -t -z -v -f a.tgz"
 //   attached values: "head -n5 f" == "head -n 5 f" == "head -5 f"
-//   quoting: 'a.txt' == a.txt (words are compared after shell unquoting)
+//   quoting: 'a.txt' == a.txt (words are compared after shell unquoting), but a word that the shell expands
+//   (unquoted glob *.log, $HOME, $(..)) is kept distinct from the quoted literal ('*.log', '$HOME')
 // Kept strict: argument boundaries ('a b' != a b), case (-name != -iname, '*.LOG' != '*.log'),
 // find's expression order (filters before -delete matter), and every pipeline stage in order.
-import { splitCommand, rawOf } from '../../src/shellwords.js';
+import { splitCommand, rawOf, isExpansion, isGlob } from '../../src/shellwords.js';
+
+// literal words compare by value; expanded/globbed words keep a marker so `*.log` != '*.log'
+const tok = (w) => (isExpansion(w) ? `\u27e8expand\u27e9${rawOf(w)}` : isGlob(w) ? `\u27e8glob\u27e9${rawOf(w)}` : w);
 
 const VALUE_FLAGS = {
   grep: ['-A', '-B', '-C', '-e', '-m', '-f'],
@@ -58,7 +62,7 @@ function normSegment(w) {
 export function normCmd(cmd) {
   const r = splitCommand(String(cmd).trim(), 'posix', { keepRedirects: true });
   if (!r.ok) return 'raw:' + String(cmd).trim();
-  return JSON.stringify(r.segments.map((g) => ({ ...normSegment(g.words.map(rawOf)), sep: g.sep })));
+  return JSON.stringify(r.segments.map((g) => ({ ...normSegment(g.words.map(tok)), sep: g.sep })));
 }
 
 export const sameCmd = (a, b) => normCmd(a) === normCmd(b);
diff --git a/scripts/lib/silver.js b/scripts/lib/silver.js
index 8cdfa79..d4b1ff0 100644
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
@@ -132,12 +135,44 @@ const P = {
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
@@ -160,16 +195,16 @@ function replacement(sp, orig, lang, rng, split) {
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
diff --git a/scripts/tldr_ingest.py b/scripts/tldr_ingest.py
index 2313db6..2234fb8 100644
--- a/scripts/tldr_ingest.py
+++ b/scripts/tldr_ingest.py
@@ -288,6 +288,11 @@ def head_sub(cmd):
 
 
 # --- main ---------------------------------------------------------------------------
+def is_inside(p, root):
+    rp, rr = os.path.realpath(p), os.path.realpath(root)
+    return rp == rr or rp.startswith(rr + os.sep)
+
+
 def main():
     tldr = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_TLDR)
     os.makedirs(OUT_DIR, exist_ok=True)
@@ -296,11 +301,16 @@ def main():
     for lang, ldir in LANG_DIRS.items():
         for plat in PLATFORMS:
             d = os.path.join(tldr, ldir, plat)
-            if not os.path.isdir(d):
+            # the checkout is untrusted: never follow symlinked directories or pages out of the tree
+            if not os.path.isdir(d) or os.path.islink(d) or not is_inside(d, tldr):
                 continue
             for fn in sorted(os.listdir(d)):
                 if not fn.endswith('.md'):
                     continue
+                fp = os.path.join(d, fn)
+                if os.path.islink(fp) or not os.path.isfile(fp) or not is_inside(fp, tldr):
+                    skipped[lang] += 1
+                    continue
                 name = fn[:-3].lower()
                 fam = page_family(plat, name)
                 if fam is None:
diff --git a/scripts/train.py b/scripts/train.py
index 9e83a1a..aedd8cc 100644
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
@@ -226,10 +233,17 @@ def main():
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
 
@@ -314,9 +328,12 @@ def main():
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
/bin/bash -lc "tail -105 review/r3-codex.md; tail -80 review/r2-codex.md; rg -n 'writeFile|mkdir|exec|spawn|unlink|rmSync' test; cat scripts/lib/heldout.js" in /workspace/tellsh
 succeeded in 0ms:
    23	  if (tilde) return '~' + tilde[1] + (tilde[2] ? shQuote(tilde[2]) : '');
    24	  if (SAFE_POSIX.test(s) && !s.startsWith('~')) return s;
    25	  return "'" + s.replace(/'/g, `'\\''`) + "'";
    26	}
   158	}
   159	
   160	function invert(cmd, kind = 'posix') {
   161	  for (const { id, re, names, raws } of inverters()) {
   162	    const m = cmd.match(re[kind]);
   163	    if (!m) continue;
   164	    const slots = {};
   165	    let ambiguous = false;
   166	    names.forEach((n, i) => {
   167	      const rv = m[i + 1];
   168	      if (rv == null) return;
   169	      if (raws[i]) { slots[n] = rv; return; }
   170	      const v = decodeWord(rv, kind);
   171	      if (v == null || isExpansion(v) || (isGlob(v) && !GLOB_SLOTS.has(n))) { ambiguous = true; slots[n] = AMB + rv; return; }
   172	      slots[n] = rawOf(v);
   173	    });
   174	    if (slots.namepat && !slots.name && !isAmbiguous(slots.namepat)) slots.name = slots.namepat.replace(/^\*|\*$/g, '');
   175	    return { intent: id, slots, ambiguous };
     1	# tellsh evaluation (v0.2)
     2	
     3	Generated by `npm run eval`, `npm run bench` and `node scripts/teacher.js` (teacher section).
     4	
     5	**Post-review update (2026-10-10).** Two code reviews of v0.2 found command-injection bugs (optional template
     6	segments were substituted twice; PowerShell typographic quotes were not escaped), danger-checker gaps, history
     7	references that could pick the wrong or a stale target, and an over-lenient eval comparison. All were fixed with
     8	regression tests (`test/regressions.test.js`). The model was **not** retrained; the classifier numbers are unchanged.
     9	What moved: composer "any answer acceptable" 33.3% → 31.4% (stricter command comparison), e2e EN given gold intent
    10	91.2% → 91.4%; history references stay at 97.9% with two gold commands updated for `kill_by_port -sTCP:LISTEN`.
    11	
    12	<!-- eval:start -->
    13	## Model
    14	
    15	`model/model.bin` **2.71 MB** (int8 weights, TSH2): stage 1 tool model 20000 rows × 55 classes (54 tool families + `__none__`), 30 stage-2 intent models (469250 weights), tagger 24000 rows × 27 BIO labels. Trained 2026-10-10 on 25562 classifier rows and 28232 tagged sequences. Thresholds: accept **0.365** (cascade score), compose **0.69** (stage-1 tool p). Internal holdout during training: tool top-1 92.5%, top-3 98.3%, intent 85.5%.
    16	
    17	## 1. Cascade accuracy per stage (held-out `data/eval`, shell=bash os=linux)
?? review/r3-claude.md
?? review/r3-codex.md

codex
Found **1 blocker, 5 major issues, and 1 minor issue**.

1. **Blocker — Refusing a path can redirect deletion to the current directory.** [src/pipeline.js:195](/workspace/tellsh/src/pipeline.js:195), [src/fill.js:226](/workspace/tellsh/src/fill.js:226)  
   `delete all log files in /tmp/data!` produces `find . -type f -iname '*.log' -delete`, with `missing: []`. Removing the ambiguous path restores the catalog’s `.` default, despite a warning claiming a placeholder. Likewise, after `find /var/log -type f -iname "*.log"`, `delete all those log files` reports `context.rule: refused` but produces that executable deletion command. Refusal must prevent default substitution.

2. **Major — History retargeting and composition bypass the punctuation guard.** [src/pipeline.js:149](/workspace/tellsh/src/pipeline.js:149), [src/pipeline.js:261](/workspace/tellsh/src/pipeline.js:261)  
   After `rm -r old`, `same for /tmp/data!` produces `rm -r /tmp/data`. Separately, `change permissions recursively to 777 on /tmp/data!` produces `chmod -R 777 -- /tmp/data`. Both have complete slots. The early history return skips validation; composition re-extracts the rejected path. The prior path-normalization finding remains partially open.

3. **Major — “Same for” can replay an older destructive command.** [src/history.js:615](/workspace/tellsh/src/history.js:615), [src/history.js:757](/workspace/tellsh/src/history.js:757)  
   History `['rm -r old', 'ls newdir']`, followed by `same for /srv/current`, produces `rm -r /srv/current`. `last` means the latest command with a recoverable catalog intent, silently skipping the newer listing. Retargeting must preserve the latest operation or refuse.

4. **Major — Typed process references ignore recency.** [src/history.js:773](/workspace/tellsh/src/history.js:773)  
   History `['kill 1111', 'pgrep current-worker']`, followed by `kill that process`, produces `kill 1111`. The noun mapping prefers `pid` over `proc` regardless of `refOrder`. Replacing the latest command with `pgrep "$PROC"` still selects the older PID instead of refusing ambiguity. Rank matching entity types by recency.

5. **Major — History loses literal-tilde semantics and changes deletion targets.** [src/history.js:170](/workspace/tellsh/src/history.js:170), [src/render.js:22](/workspace/tellsh/src/render.js:22)  
   After `cat '~/notes.txt'`, `delete it` produces `rm ~/notes.txt`. The original references a relative directory literally named `~`; the suggestion targets the user’s home directory. Escaped `\~/notes.txt` behaves identically. Preserve quoting/expansion provenance. The same omission leaves the previous comparison finding partially open: `sameCmd("cat '~/notes.txt'", "cat ~/notes.txt")` returns true.

6. **Major — Shipped artifacts still omit the training fixes.** [package.json:28](/workspace/tellsh/package.json:28), [scripts/build_triggers.js:53](/workspace/tellsh/scripts/build_triggers.js:53), [EVAL.md:15](/workspace/tellsh/EVAL.md:15)  
   Both `model/model.bin` and `model/compose_explained.json` are byte-identical to `0d87457`. Current generation produces **31,653 classifier rows / 34,575 tagger sequences**; the shipped model records **25,562 / 28,232**. Thus the new teacher data, exclusions, and calibration changes remain unshipped. Current evaluation gives **84.2%** relexicalized end-to-end accuracy and **51.0%** composer acceptability, versus **82.8% / 31.4%** in EVAL.md. Rebuild the artifacts and regenerate release metrics.

7. **Minor — Teacher accounting omits retryable failed requests.** [scripts/lib/jev.js:54](/workspace/tellsh/scripts/lib/jev.js:54), [scripts/lib/jev.js:72](/workspace/tellsh/scripts/lib/jev.js:72)  
   `stats.calls` increments only for successful or terminal responses. A mocked HTTP 503 with `retries: 0` makes one request but records `calls: 0, failed: 1`; retry attempts are likewise omitted from the advertised network-call total.

Prior-review fixes verified include the original internal-punctuation paths, whole-disk targeting repros, PowerShell later-slot checks, composer option protection and literal patterns, fish exclusion, compound-history ordering, verb hints, and history `--yes` protection. The original search-root repros pass, but finding 1 exposes an incomplete refusal mechanism.

Training-code fixes address emission-time exclusions, grouped anaphora variants, replacement pools, complete-gold scoring, filtered composer input, teacher questions/reporting, and near-duplicate exclusions. Evaluation now acknowledges contamination and computes clean subsets; these improvements do not resolve the stale shipped artifacts.

Selected suites: **89 passed; two subprocess round-trip tests were blocked by `EPERM`**. Generation and evaluation ran with writes intercepted in memory. No files were modified.

VERDICT: REQUEST_CHANGES
tokens used
155,728
Found **1 blocker, 5 major issues, and 1 minor issue**.

1. **Blocker — Refusing a path can redirect deletion to the current directory.** [src/pipeline.js:195](/workspace/tellsh/src/pipeline.js:195), [src/fill.js:226](/workspace/tellsh/src/fill.js:226)  
   `delete all log files in /tmp/data!` produces `find . -type f -iname '*.log' -delete`, with `missing: []`. Removing the ambiguous path restores the catalog’s `.` default, despite a warning claiming a placeholder. Likewise, after `find /var/log -type f -iname "*.log"`, `delete all those log files` reports `context.rule: refused` but produces that executable deletion command. Refusal must prevent default substitution.

2. **Major — History retargeting and composition bypass the punctuation guard.** [src/pipeline.js:149](/workspace/tellsh/src/pipeline.js:149), [src/pipeline.js:261](/workspace/tellsh/src/pipeline.js:261)  
   After `rm -r old`, `same for /tmp/data!` produces `rm -r /tmp/data`. Separately, `change permissions recursively to 777 on /tmp/data!` produces `chmod -R 777 -- /tmp/data`. Both have complete slots. The early history return skips validation; composition re-extracts the rejected path. The prior path-normalization finding remains partially open.

3. **Major — “Same for” can replay an older destructive command.** [src/history.js:615](/workspace/tellsh/src/history.js:615), [src/history.js:757](/workspace/tellsh/src/history.js:757)  
   History `['rm -r old', 'ls newdir']`, followed by `same for /srv/current`, produces `rm -r /srv/current`. `last` means the latest command with a recoverable catalog intent, silently skipping the newer listing. Retargeting must preserve the latest operation or refuse.

4. **Major — Typed process references ignore recency.** [src/history.js:773](/workspace/tellsh/src/history.js:773)  
   History `['kill 1111', 'pgrep current-worker']`, followed by `kill that process`, produces `kill 1111`. The noun mapping prefers `pid` over `proc` regardless of `refOrder`. Replacing the latest command with `pgrep "$PROC"` still selects the older PID instead of refusing ambiguity. Rank matching entity types by recency.

5. **Major — History loses literal-tilde semantics and changes deletion targets.** [src/history.js:170](/workspace/tellsh/src/history.js:170), [src/render.js:22](/workspace/tellsh/src/render.js:22)  
   After `cat '~/notes.txt'`, `delete it` produces `rm ~/notes.txt`. The original references a relative directory literally named `~`; the suggestion targets the user’s home directory. Escaped `\~/notes.txt` behaves identically. Preserve quoting/expansion provenance. The same omission leaves the previous comparison finding partially open: `sameCmd("cat '~/notes.txt'", "cat ~/notes.txt")` returns true.

6. **Major — Shipped artifacts still omit the training fixes.** [package.json:28](/workspace/tellsh/package.json:28), [scripts/build_triggers.js:53](/workspace/tellsh/scripts/build_triggers.js:53), [EVAL.md:15](/workspace/tellsh/EVAL.md:15)  
   Both `model/model.bin` and `model/compose_explained.json` are byte-identical to `0d87457`. Current generation produces **31,653 classifier rows / 34,575 tagger sequences**; the shipped model records **25,562 / 28,232**. Thus the new teacher data, exclusions, and calibration changes remain unshipped. Current evaluation gives **84.2%** relexicalized end-to-end accuracy and **51.0%** composer acceptability, versus **82.8% / 31.4%** in EVAL.md. Rebuild the artifacts and regenerate release metrics.

7. **Minor — Teacher accounting omits retryable failed requests.** [scripts/lib/jev.js:54](/workspace/tellsh/scripts/lib/jev.js:54), [scripts/lib/jev.js:72](/workspace/tellsh/scripts/lib/jev.js:72)  
   `stats.calls` increments only for successful or terminal responses. A mocked HTTP 503 with `retries: 0` makes one request but records `calls: 0, failed: 1`; retry attempts are likewise omitted from the advertised network-call total.

Prior-review fixes verified include the original internal-punctuation paths, whole-disk targeting repros, PowerShell later-slot checks, composer option protection and literal patterns, fish exclusion, compound-history ordering, verb hints, and history `--yes` protection. The original search-root repros pass, but finding 1 exposes an incomplete refusal mechanism.

Training-code fixes address emission-time exclusions, grouped anaphora variants, replacement pools, complete-gold scoring, filtered composer input, teacher questions/reporting, and near-duplicate exclusions. Evaluation now acknowledges contamination and computes clean subsets; these improvements do not resolve the stale shipped artifacts.

Selected suites: **89 passed; two subprocess round-trip tests were blocked by `EPERM`**. Generation and evaluation ran with writes intercepted in memory. No files were modified.

VERDICT: REQUEST_CHANGES
}
{
  q: 'delete folder /tmp/name)',
  command: 'rm -r /tmp/name',
  critical: false,
  missing: []
}
?? review/.f1done
?? review/r2-claude.md
?? review/r2-codex.md

codex
Found **5 major and 1 minor remaining issues**.

1. **Major — Path normalization still changes deletion targets.** [src/slots.js:169](/workspace/tellsh/src/slots.js:169), [src/slots.js:173](/workspace/tellsh/src/slots.js:173)  
   Reproduced `delete folder /tmp/data!` → `rm -r /tmp/data`, and `delete folder /tmp/a.txt.` → `rm -r /tmp/a.txt`. Both have complete slots and `critical: false`. These suffixes are valid filename characters; preserve them or refuse ambiguity. The prior path-safety finding is only partially fixed.

2. **Major — PowerShell’s native-argument guard misses subsequent placeholders.** [src/render.js:134](/workspace/tellsh/src/render.js:134)  
   Splitting the template prefix on `{` makes the preceding placeholder look like the command head. For `tar -czvf {archive} {path}`, only `archive` is checked. Reproduced a normal suggestion containing:
   ```
   tar -czvf 'backup.tar.gz' 'a" --use-compress-program=evil "b'
   ```
   It reports medium risk, no warnings, and no gap. This leaves the prior native option-injection problem open under Legacy argument passing. Rendering was reproduced; PowerShell execution was unavailable. [Microsoft’s argument-passing documentation](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_parsing?view=powershell-7.6#passing-arguments-that-contain-quote-characters) describes the relevant version difference.

3. **Major — Compound-history recency is still lost across entity types.** [src/history.js:596](/workspace/tellsh/src/history.js:596), [src/history.js:600](/workspace/tellsh/src/history.js:600)  
   All entities from one line receive the same recency; ties use the fixed entity-type order. History `cat old.txt; ls newdir`, followed by `delete it`, produces `rm old.txt`. Worse, `cat old.txt; ls $D` also produces `rm old.txt`, bypassing refusal of the newest ambiguous target. The same-type regression cases pass, but the broader prior finding remains.

4. **Major — Request verbs can select older destructive targets.** [src/history.js:779](/workspace/tellsh/src/history.js:779)  
   `chooseValue()` treats any matching request word as an explicit target hint, including verbs. Reproduced:
   - History `ls /srv/remove-backups`, then `ls /srv/current`; `remove it` → `rm -r /srv/remove-backups`.
   - History `pgrep kill-worker`, then `pgrep current-worker`; `kill it` → `pkill -f kill-worker`.

   Only explicit target-identifying words should override recency.

5. **Major — Shipped model artifacts do not contain the training fixes.** [package.json:28](/workspace/tellsh/package.json:28), [scripts/build_triggers.js:53](/workspace/tellsh/scripts/build_triggers.js:53)  
   `model/model.bin` is byte-identical to `0d87457`. Its header records **25,562 classifier rows / 28,232 tagger sequences**; running the current generator with writes intercepted produced **32,063 / 35,125**. Recomputing explained flags from the filtered corpus changes **10 intents**, but `model/compose_explained.json` is also unchanged. The new filtering, calibration, teacher decisions, and added data therefore have not reached the shipped model. `EVAL.md` likewise retains the old metrics and teacher conclusions. Rebuild and regenerate these artifacts before approval.

6. **Minor — Composer still expands non-path tildes.** [src/compose.js:386](/workspace/tellsh/src/compose.js:386), [src/compose.js:477](/workspace/tellsh/src/compose.js:477)  
   `search for "~" recursively ignoring case in /tmp` → `grep -i -r -- ~ /tmp`. The pattern expands to the home directory. The catalog quoting fix needs to cover composer values too.

The prior reviews’ main training-code findings are addressed: emission-time exclusions, grouped anaphora variants, filtered composer training input, revised value pools, complete-command scoring, independent teacher questions, and computed reports. Runtime fixes also address history auto-run protection, implicit destructive filling, the reported option-parser cases, composer option injection, and fish exclusion. The findings above identify remaining gaps.

No files were modified. Danger, parity, slots, and compose suites passed; broader checks encountered subprocess/filesystem restrictions. Generation and evaluation ran with writes intercepted in memory.

VERDICT: REQUEST_CHANGES
tokens used
151,291
Found **5 major and 1 minor remaining issues**.

1. **Major — Path normalization still changes deletion targets.** [src/slots.js:169](/workspace/tellsh/src/slots.js:169), [src/slots.js:173](/workspace/tellsh/src/slots.js:173)  
   Reproduced `delete folder /tmp/data!` → `rm -r /tmp/data`, and `delete folder /tmp/a.txt.` → `rm -r /tmp/a.txt`. Both have complete slots and `critical: false`. These suffixes are valid filename characters; preserve them or refuse ambiguity. The prior path-safety finding is only partially fixed.

2. **Major — PowerShell’s native-argument guard misses subsequent placeholders.** [src/render.js:134](/workspace/tellsh/src/render.js:134)  
   Splitting the template prefix on `{` makes the preceding placeholder look like the command head. For `tar -czvf {archive} {path}`, only `archive` is checked. Reproduced a normal suggestion containing:
   ```
   tar -czvf 'backup.tar.gz' 'a" --use-compress-program=evil "b'
   ```
   It reports medium risk, no warnings, and no gap. This leaves the prior native option-injection problem open under Legacy argument passing. Rendering was reproduced; PowerShell execution was unavailable. [Microsoft’s argument-passing documentation](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_parsing?view=powershell-7.6#passing-arguments-that-contain-quote-characters) describes the relevant version difference.

3. **Major — Compound-history recency is still lost across entity types.** [src/history.js:596](/workspace/tellsh/src/history.js:596), [src/history.js:600](/workspace/tellsh/src/history.js:600)  
   All entities from one line receive the same recency; ties use the fixed entity-type order. History `cat old.txt; ls newdir`, followed by `delete it`, produces `rm old.txt`. Worse, `cat old.txt; ls $D` also produces `rm old.txt`, bypassing refusal of the newest ambiguous target. The same-type regression cases pass, but the broader prior finding remains.

4. **Major — Request verbs can select older destructive targets.** [src/history.js:779](/workspace/tellsh/src/history.js:779)  
   `chooseValue()` treats any matching request word as an explicit target hint, including verbs. Reproduced:
   - History `ls /srv/remove-backups`, then `ls /srv/current`; `remove it` → `rm -r /srv/remove-backups`.
   - History `pgrep kill-worker`, then `pgrep current-worker`; `kill it` → `pkill -f kill-worker`.

   Only explicit target-identifying words should override recency.

5. **Major — Shipped model artifacts do not contain the training fixes.** [package.json:28](/workspace/tellsh/package.json:28), [scripts/build_triggers.js:53](/workspace/tellsh/scripts/build_triggers.js:53)  
   `model/model.bin` is byte-identical to `0d87457`. Its header records **25,562 classifier rows / 28,232 tagger sequences**; running the current generator with writes intercepted produced **32,063 / 35,125**. Recomputing explained flags from the filtered corpus changes **10 intents**, but `model/compose_explained.json` is also unchanged. The new filtering, calibration, teacher decisions, and added data therefore have not reached the shipped model. `EVAL.md` likewise retains the old metrics and teacher conclusions. Rebuild and regenerate these artifacts before approval.

6. **Minor — Composer still expands non-path tildes.** [src/compose.js:386](/workspace/tellsh/src/compose.js:386), [src/compose.js:477](/workspace/tellsh/src/compose.js:477)  
   `search for "~" recursively ignoring case in /tmp` → `grep -i -r -- ~ /tmp`. The pattern expands to the home directory. The catalog quoting fix needs to cover composer values too.

The prior reviews’ main training-code findings are addressed: emission-time exclusions, grouped anaphora variants, filtered composer training input, revised value pools, complete-command scoring, independent teacher questions, and computed reports. Runtime fixes also address history auto-run protection, implicit destructive filling, the reported option-parser cases, composer option injection, and fish exclusion. The findings above identify remaining gaps.

No files were modified. Danger, parity, slots, and compose suites passed; broader checks encountered subprocess/filesystem restrictions. Generation and evaluation ran with writes intercepted in memory.

VERDICT: REQUEST_CHANGES
test/slot-cases.js:3:  ['largest_files', 'pokaż 5 największych plików w ~/Pobrane', 'find ~/Pobrane -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 5'],
test/slot-cases.js:4:  ['largest_files', 'top twenty biggest files in /var/log', 'find /var/log -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 20'],
test/slot-cases.js:5:  ['largest_files', 'piętnaście największych plików', 'find . -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 15'],
test/slot-cases.js:16:  ['find_larger_than', 'files bigger than 100 mb in /home', 'find /home -type f -size +100M -exec ls -lh {} +'],
test/slot-cases.js:17:  ['find_larger_than', 'pliki większe niż 1,5 GB', 'find . -type f -size +1536M -exec ls -lh {} +'],
test/slot-cases.js:18:  ['find_larger_than', 'find files over 2GB', 'find . -type f -size +2G -exec ls -lh {} +'],
test/slot-cases.js:19:  ['find_larger_than', 'pliki powyżej 500 megabajtów w /data', 'find /data -type f -size +500M -exec ls -lh {} +'],
test/slot-cases.js:48:  ['make_executable', 'make run.sh executable', 'chmod +x run.sh'],
test/slot-cases.js:57:  ['mkdir', 'create folder src/components/ui', 'mkdir -p src/components/ui'],
test/slot-cases.js:61:  ['count_lines_code', 'ile linii kodu w plikach python', "find . -type f -iname '*.py' -exec cat {} + | wc -l"],
test/slot-cases.js:94:  ['docker_exec', 'wejdź do kontenera redis', 'docker exec -it redis sh'],
test/regressions3-render.test.js:49:    'sudo -u root rm -rf /', 'doas rm -rf /', 'nohup rm -rf ~', 'time -p rm -rf ~', 'exec rm -rf /boot', 'command rm -rf $HOME', 'setsid rm -rf /']) {
test/regressions.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/regressions.test.js:7:import { mkdtempSync, writeFileSync, readFileSync, rmSync, chmodSync } from 'node:fs';
test/regressions.test.js:23:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions.test.js:37:  const out = execFileSync('bash', ['-c', render("printf '[%s]' {file}«{dest}»", v).command], { encoding: 'utf8' });
test/regressions.test.js:52:    assert.equal(spawnSync('bash', ['-n', '-c', command]).status, 0, command);
test/regressions.test.js:58:test('CLI: the reported injection payloads stay quoted (bash) and never execute', () => {
test/regressions.test.js:66:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:175:  const out = execFileSync('sh', ['-c', `printf 'h1 ./a\\nh1 ./b\\nh2 ./c\\nh3 ./d\\nh3 ./e\\nh3 ./f\\n' | ${awk}`], { encoding: 'utf8' });
test/regressions.test.js:185:// pwsh parse check must never execute the checked source
test/regressions.test.js:192:    writeFileSync(fake, `#!/bin/sh\nprintf '%s\\n' "$@" > '${out}'\nprintf '%s' "$TELLSH_PARSE_SRC" > '${out}.src'\nexit 0\n`);
test/regressions.test.js:198:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:279:    writeFileSync(join(dir, 'notes.txt'), 'hello\n');
test/regressions.test.js:280:    writeFileSync(f, 'ls\ncat notes.txt\n');
test/regressions.test.js:286:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/shells.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/shells.test.js:12:const has = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
test/shells.test.js:51:      const res = spawnSync(checker, args, { encoding: 'utf8' });
test/shells.test.js:65:    if (has('fish')) { const res = spawnSync('fish', ['-n', '-c', r.command]); if (res.status !== 0) bad.push(it.id); }
test/shells.test.js:112:    for (const sh of ['bash', 'sh']) assert.equal(execFileSync(sh, ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' }), s);
test/pipeline.test.js:4:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/pipeline.test.js:52:  assert.equal(S('pokaż 5 największych plików w ~/Pobrane').command, 'find ~/Pobrane -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 5');
test/pipeline.test.js:92:    writeFileSync(f, Array.from({ length: 50 }, (_, i) => `: 17000000${i}:0;echo ${i}`).join('\n') + '\n');
test/pipeline.test.js:96:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions2.test.js:6:import { spawnSync } from 'node:child_process';
test/regressions2.test.js:8:import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
test/regressions2.test.js:25:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions2.test.js:107:  assert.equal(checkDanger('find / -xdev -type f -exec du -h {} +').risk, 'safe');
test/regressions2.test.js:174:    writeFileSync(hf, 'cat secret.txt\n');
test/regressions2.test.js:178:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions4.test.js:182:  const { spawnSync } = await import('node:child_process');
test/regressions4.test.js:183:  const { mkdtempSync, writeFileSync } = await import('node:fs');
test/regressions4.test.js:188:  writeFileSync(hist, 'rm -r old\nls newdir\n');
test/regressions4.test.js:189:  const r = spawnSync(process.execPath, ['bin/tellsh.js', '--dry-run', `--history=${hist}`, 'same', 'for', '/srv/current'], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/cli.test.js:3:import { spawnSync } from 'node:child_process';
test/cli.test.js:5:import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/cli.test.js:10:const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/cli.test.js:42:test('dry-run prints command and never executes', () => {
test/cli.test.js:87:  const gap = run('--shell', 'cmd', 'make deploy.sh executable');
test/cli.test.js:97:    writeFileSync(f, 'echo SECRET_TOKEN=abc123\ncat notes.txt\n');
test/cli.test.js:103:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/compose.test.js:47:  const { spawnSync } = await import('node:child_process');
test/compose.test.js:48:  const r = spawnSync('sh', ['-c', 'node bin/tellsh.js --dry-run show disk usage | head -c 1 >/dev/null; echo $?'], { encoding: 'utf8' });
test/templates.test.js:3:import { execFileSync } from 'node:child_process';
test/templates.test.js:8:const roundTrip = (s) => execFileSync('bash', ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' });
// Held-out texts shared by gen_data.js, teacher.js and eval.js. A training text leaks when it equals a
// held-out text after normalize(), when it equals one after filler words are removed and word order is
// ignored ("list all symlinks in X" vs "list symlinks in X", "show disks and partitions" vs "partitions and
// disks show"), or when it is a contrastive rewrite (scripts/lib/confusable.js) of a
// held-out text ("push my commits" -> "pull my commits").
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { normalize } from '../../src/features.js';
import { CONTRAST_RULES } from './confusable.js';

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

/** Raw held-out request texts (eval sets, blind sets, slot gold, slot cases). */
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
import { extractSlots, pickArg, isOptionWord } from './slots.js';
import { resolveSlots, buildCommand, finalizeSlots, RAW_OK } from './fill.js';
import { BY_ID } from './catalog.js';
import { FAMILY_OF, NONE } from './tools.js';
import { detectEnv, envFeatures } from './env.js';
import { buildContext, resolveReference, hasPronoun, cwdFlags, sameBut, entityForSlot, isAmbiguous } from './history.js';
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
const FUNCTION_WORD = /^(?:the|a|an|of|for|to|in|on|at|by|with|from|into|onto|up|out|it|its|this|that|these|those|and|or|then|is|my|me|your|w|we|z|ze|na|do|od|dla|o|i|oraz|jest|mi|moim|tym|ten|ta|to|tej)$/i;
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

/**
 * Slot resolution: tagger is primary, regex is fallback + validator.
 * -> { slots, sources: {slot: 'tagger'|'regex'}, spans }
 */
export function resolveWithTagger(intentId, text, { model = getModel(), tool, mode = 'merge' } = {}) {
  const intent = BY_ID[intentId];
  const exR = extractSlots(text);
  const rR = resolveSlots(intent, exR);
  if (mode === 'regex') return { slots: rR, sources: Object.fromEntries(Object.keys(rR).map((k) => [k, 'regex'])), spans: [] };
  const t = tag(text, tool || FAMILY_OF[intentId], model);
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
  finalizeSlots(intent, slots);
  return { slots, sources, spans: t.spans };
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

  // ---- context (history + cwd), in memory only ----
  let ctx = null;
  if (opts.history?.length) {
    const quick = (q) => {
      const c = cascade(q, { model, extras: envFeatures(env) });
      if (c.confidence < thr) return null;
      return { intent: c.intent, slots: resolveWithTagger(c.intent, q, { model, tool: c.tool }).slots };
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
    const blank = [];
    // the new path ends in sentence punctuation (`same for /tmp/data!`): placeholder, as for any request
    if (PATH_SLOT_NAMES.has(ref.changed) && slots[ref.changed] != null && BY_ID[ref.intent].risk !== 'safe' && trailingPunctAfter(query, slots[ref.changed])) {
      blank.push(ref.changed);
      delete slots[ref.changed];
    }
    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], slots), blank });
    const res = { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
    if (blank.length) res.warnings = [...(res.warnings || []), `path left as a placeholder: unclear whether the trailing punctuation is part of the name (${blank.join(', ')}); quote the path`];
    return res;
  }
  // ---- the reference cannot be resolved at all ("what about this", an older command to replay) ----
  if (ref?.rule === 'refused' && ref.stop) {
    return { ...base, understood: false, method: 'history-rule', confidence: 0, candidates: [], tools: [], command: null, missing: [], hint: ref.note };
  }

  const sb = ctx && !ref ? sameBut(query, ctx) : null;
  const c = cascade(query, { model, extras, top, restrictTool: sb ? FAMILY_OF[sb.lastIntent] : undefined });
  const candidates = c.top.map((t) => ({ intent: t.intent, tool: t.tool, p: +t.p.toFixed(4), description: BY_ID[t.intent]?.description }));
  const tools = c.tools.map((t) => ({ tool: t.tool, p: +t.p.toFixed(4) }));
  let intent = c.intent;
  let confidence = c.confidence;
  let method = 'catalog';
  if ((ref?.rule === 'pronoun' || ref?.rule === 'refused') && ref.intent) { intent = ref.intent; method = 'history-rule'; confidence = Math.max(confidence, thr); }
  if (sb) { method = 'history-rule'; confidence = Math.max(confidence, thr); context.rule = 'same-but'; context.note = `modifies previous ${sb.lastIntent}`; }
  const out = { ...base, confidence: +confidence.toFixed(4), tool: FAMILY_OF[intent] || c.tool, tools, candidates };

  const tryCompose = (reason) => {
    if (composeMode === 'off') return null;
    // composer vocabulary and quoting are POSIX-only (fish treats \\ and \' as escapes inside single quotes)
    if (env.shell === 'powershell' || env.shell === 'cmd' || env.shell === 'fish') return null;
    const capable = c.tools.filter((t) => t.tool !== NONE);
    if (c.topTool === NONE && composeMode !== 'force') return null;
    const ci = composeInput(query, model, capable[0]?.tool);
    const r = compose(query, capable, ci.ex, { patternOf: ci.pattern, nameOf: ci.nameOf });
    if (!r || r.invalid) return r?.invalid ? { invalid: r.invalid, command: r.command } : null;
    if (blocksAmbiguous(r, ci.ambiguousPaths)) return null;
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

  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode });
  const slots = r.slots;
  // a changing command never guesses where a path ends: `/tmp/data!` or `/tmp/a.txt.` is either the
  // whole name or a name plus sentence punctuation, so the slot stays empty (placeholder)
  const ambiguousPaths = [];
  // slots that were withheld on purpose: rendered as placeholders, never replaced by a catalog default
  // (an ambiguous `/tmp/data!` must not turn `find {path} … -delete` into `find . … -delete`)
  const blank = new Set();
  if (BY_ID[intent].risk !== 'safe') {
    for (const k of Object.keys(slots)) {
      if (PATH_SLOT_NAMES.has(k) && r.sources[k] !== 'history' && trailingPunctAfter(query, slots[k])) { ambiguousPaths.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
    }
    if (ambiguousPaths.length) finalizeSlots(BY_ID[intent], slots);
  }
  const ambiguousText = [];
  for (const k of TEXT_SLOT_NAMES) {
    if (slots[k] != null && cutAtEscapedQuote(query, slots[k])) { ambiguousText.push(`${k}=${slots[k]}`); delete slots[k]; delete r.sources[k]; blank.add(k); }
  }
  if (ambiguousText.length) { delete slots.sedexpr; delete slots.namepat; finalizeSlots(BY_ID[intent], slots); }
  if (ref?.rule === 'refused') {
    // the reference points at something we cannot read safely: leave the slot empty (placeholder)
    for (const k of Object.keys(slots)) if (PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
    for (const k of ref.blank || []) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
    finalizeSlots(BY_ID[intent], slots);
    method = 'history-rule';
  }
  if (ref?.rule === 'pronoun' && ref.searchRoot && BY_ID[intent].risk !== 'safe') {
    // the value is a find/grep search root and the classifier picked a modifying intent: refuse
    for (const k of Object.keys(slots)) if (PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
    for (const k of Object.keys(ref.fill)) if (slots[k] == null && usesSlot(BY_ID[intent], k)) blank.add(k);
    finalizeSlots(BY_ID[intent], slots);
    context.rule = 'refused';
    context.note = ref.rootNote;
    method = 'history-rule';
  } else if (ref?.rule === 'pronoun') {
    const it = BY_ID[intent];
    for (const [k, v] of Object.entries(ref.fill)) {
      if (!validSlot(k, v)) { if (slots[k] != null && PRONOUN_VALUE.test(String(slots[k]))) delete slots[k]; continue; }
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
      if (usesSlot(it, k) && slots[k] == null && !['namepat', 'sedexpr'].includes(k)) { slots[k] = v; r.sources[k] = 'history'; }
    }
    finalizeSlots(it, slots);
  }
  let b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank] });
  // implicit reference: a required slot is still missing and the history has a value of that type.
  // Only for safe intents: a destructive command ("delete the folder") is never aimed at a history
  // value without an explicit reference word ("delete it"), which goes through resolveReference.
  if (ctx && b.missing.length && ref?.rule !== 'refused' && BY_ID[intent].risk === 'safe' && b.risk === 'safe') {
    const filled = [];
    for (const m of b.missing) {
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

codex
The previous review’s main fixes are present, including placeholder handling for refused paths and updated model artifacts. I’m checking whether those protections hold across other history and rendering paths, and whether the training and evaluation artifacts agree with the current code.

exec
/bin/bash -lc "sed -n '1,220p' src/history.js; sed -n '480,900p' src/history.js" in /workspace/tellsh
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
import { splitCommand, wordsOf, decodeWord, AMB, isAmbiguous, isExpansion, isGlob, rawOf } from './shellwords.js';

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

/** Last `n` commands from the user's history file (or from `file`). Returns [] when unavailable. */
export function loadHistory({ shell = 'bash', file, n = 10, env = process.env, os = process.platform } = {}) {
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
    const p = head === 'find' ? nonFlags[0] : nonFlags.filter((a) => !isGlob(a)).pop();
    if (p) { e.dir = p; if (head === 'find') e.searchDir = true; else if (['ls', 'tree'].includes(head)) e.listDir = true; }
  } else if (!INERT_HEADS.has(head.toLowerCase())) {
    // unknown command (or unknown cmdlet) naming a path: we cannot tell what it did with it, so an
    // older file/dir must not be picked up by "it"
    const p = nonFlags.find((a) => PATHLIKE.test(rawOf(a)) && !/^\w+:\/\//.test(rawOf(a)));
    if (p) e[typeByExt(p)] = AMB + rawOf(p);
  }
}

const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];

/**
 * Build the context object from history commands (oldest first).
 * kind: 'posix' | 'pwsh' (default: `cmds.kind` as set by loadHistory, else posix)
 * -> { n, ents: {type: value}, entOrder: [types by recency], refOrder, searchRoots, last: {intent, slots, ambiguous}, features: [...] }
 *    values that could not be read unambiguously are kept as AMB-prefixed strings (see isAmbiguous)
 *    entOrder ranks types by line only (it feeds ctxFeatures, which the model was trained on);
 *    refOrder also ranks the segments of one line (`cat old.txt; ls newdir`: dir before file) and is
 *    what pronoun resolution uses. searchRoots: dir values whose newest use was as a find/grep root.
 */
export function buildContext(cmds, { classify, cwd, kind, query } = {}) {
  const k = kind || cmds.kind || 'posix';
  const ents = {};
  const all = {};
  const recency = {};
  const pos = {};
  const searchRoots = new Set();
  const listedDirs = new Set();
  let last = null;
  let newerUses = false; // a line newer than `last` named something (last is then not "the previous command")
  let current = null;
  const list = [...cmds];
  // zsh (share_history / inc_append_history), fish and PSReadLine write the running line to the
  // history file before it executes: the current `tellsh <query>` call is not a previous command
  if (query != null) {
    const norm = (s) => String(s).trim().replace(/\s+/g, ' ');
    while (list.length) {
      const q = tellshQuery(list[list.length - 1], k);
      if (q == null || !(norm(q) === norm(query) || norm(list[list.length - 1]).includes(norm(query)))) break;
      list.pop();
    }
  }
  const recent = list.reverse();
  let cdAfter = false; // a newer line changed the working directory
  recent.forEach((line, i) => {
    const a = analyzeCommand(line, classify, k);
    if (cdAfter) {
      // relative paths of lines before a `cd` point somewhere else now: never reuse them
      staleRelative(a.ents, a.slots);
      if (Object.values(a.slots).some(isAmbiguous)) a.ambiguous = true;
    }
    if (a.cd) cdAfter = true;
    if (!last && a.intent) last = { intent: a.intent, slots: a.slots, age: i, ambiguous: !!a.ambiguous, skipped: newerUses };
    if (!last && (a.opaque || Object.keys(a.ents).length)) newerUses = true;
    if (current == null && a.ents.current && !isAmbiguous(a.ents.current)) current = a.ents.current;
    for (const t of ENT_TYPES) {
      if (a.ents[t] == null) continue;
      if (ents[t] == null) { ents[t] = a.ents[t]; recency[t] = i; pos[t] = a.at?.[t] ?? 0; }
      const v = String(a.ents[t]);
      if (!(all[t] ??= []).includes(v)) {
        all[t].push(v);
        if (t === 'dir' && a.searchDir) searchRoots.add(v); // its newest use was as a search root
        if (t === 'dir' && a.listDir) listedDirs.add(v); // ... or as a listing
      }
    }
  });
  const byType = (a, b) => ENT_TYPES.indexOf(a) - ENT_TYPES.indexOf(b);
  const entOrder = Object.keys(ents).sort((a, b) => recency[a] - recency[b] || byType(a, b));
  const refOrder = Object.keys(ents).sort((a, b) => recency[a] - recency[b] || pos[b] - pos[a] || byType(a, b));
  const ctx = { n: recent.length, ents, all, currentBranch: current, entOrder, refOrder, searchRoots, listedDirs, last, cwdFlags: cwdFlags(cwd) };
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

// all rule regexes run on the diacritic-folded, lowercased query (same length as the original)
const fold = (q) => foldKeepLength(String(q)).toLowerCase();
const PRONOUN_EN = /\b(it|its|that|this|them|those|these|the same one)\b/;
const PRONOUN_WORD = /^(it|its|that|this|them|those|these|one|again|there|here|tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym|to|force|forced|forcibly|sila|sile|silowo|recursive\w*|rekurencyjn\w*|please|prosze|too|also|tez|rowniez)$/;
// plural references: the entries of a listing, never the listed directory itself
const PLURAL = /(?:^|[^a-z])(them|those|these|je|te|tamte|ich|nimi)(?=$|[^a-z])/;
const PRONOUN_PL = /(?:^|\s)(tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym)(?=\s|$|[?!.,])|(?:^|\s)to(?=\s*[?!.]*$|\s+(?:co|ktor\w*|tam))/;

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

export const hasPronoun = (q) => PRONOUN_EN.test(fold(q)) || PRONOUN_PL.test(fold(q));

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
    // a newer line used other targets: replaying the older changing command for a new target is a guess
    if (rt && ctx.last.skipped && BY_ID[ctx.last.intent].risk !== 'safe') {
      return { rule: 'refused', intent: null, stop: true, note: `the newest command that tellsh can repeat (${ctx.last.intent}) is not the previous command; not guessing` };
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
  if (!hasPronoun(query) || !ctx.entOrder.length) return null;
  // which entity does the pronoun point at? noun hint first ("that container"), else most recent
  const fq = fold(query);
  const order = ctx.refOrder || ctx.entOrder;
  let types = null;
  const named = [];
  // several types for one noun ("that process": pid or name): the newest one wins
  for (const [re, ts] of NOUN_TYPE) if (re.test(fq)) { named.push(...ts); types = ts.filter((t) => ctx.ents[t] != null).sort((a, b) => order.indexOf(a) - order.indexOf(b)); if (types.length) break; }
  // "delete that branch" with no branch in history: refuse instead of using another type's value
  if (named.length && !types?.length) {
    return { rule: 'refused', intent: null, ent: named[0], blank: [...new Set(named.flatMap((t) => SLOT_FROM_ENT[t] || []))], note: `no ${named[0]} in the recent history; not guessing` };
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
  const value = chooseValue(finalEnt, fq, ctx, verb);
  if (value == null || isAmbiguous(value)) {
    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: `the latest ${finalEnt} in history (${rawOf(value ?? '?')}) cannot be read unambiguously; not guessing` };
  }
  // `find /var/log -name '*.gz'` + "delete them": the search root is not what the search found;
  // `ls /tmp/build` + "delete them": "them" are the listed entries, not the directory
  const listedOnly = finalEnt === 'dir' && PLURAL.test(fq) && !!ctx.listedDirs?.has(String(value));
  const searchRoot = finalEnt === 'dir' && (!!ctx.searchRoots?.has(String(value)) || listedOnly);
  const rootNote = listedOnly && !ctx.searchRoots?.has(String(value))
    ? `"${PLURAL.exec(fq)[1]}" are the entries listed in ${value}, not the directory; not guessing`
    : `the latest dir in history (${value}) is where a search ran, not what it found; not guessing`;
  if (searchRoot && intent && BY_ID[intent].risk !== 'safe') {
    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: rootNote };
  }
  if (intent === 'kill_by_name' && FORCE.test(fq)) intent = 'kill_force';
  if (intent === 'extract_targz' && /\.zip$/i.test(value)) intent = 'extract_zip';
  const fill = {};
  for (const s of SLOT_FROM_ENT[finalEnt] || []) fill[s] = value;
  // searchRoot: the caller must not use the value for a non-safe intent it picks itself
  return { rule: 'pronoun', intent, fill, ent: finalEnt, ...(searchRoot ? { searchRoot: true, rootNote } : {}), note: `"${finalEnt}" from history = ${value}` };
}

/**
 * Pick one value of an entity type: a value the request names part of ("that release branch" ->
 * release/2.3) wins; deleting/switching a branch skips the branch that is checked out; else most recent.
 */
function chooseValue(type, fq, ctx, verb) {
  // the newest value cannot be read ($BACKUP, a glob, an unknown command): never fall back to an older one
  if (isAmbiguous(ctx.ents[type])) return ctx.ents[type];
  let vals = ctx.all?.[type] || (ctx.ents[type] != null ? [String(ctx.ents[type])] : []);
  // only words that identify a target count, not the action, pronoun or filler words of the request
  // ("remove it" must not pick /srv/remove-backups over the newer /srv/current)
  const words = fq.split(/[^a-z0-9]+/).filter(isHintWord);
  const named = vals.find((v) => !isAmbiguous(v) && words.some((w) => foldKeepLength(v).toLowerCase().includes(w)));
  if (named) return named;
  if (type === 'branch' && (verb === 'delete' || verb === 'switch') && ctx.currentBranch) {
    const other = vals.filter((v) => v !== ctx.currentBranch);
    if (other.length) vals = other;
  }
  return vals[0];
}

const NOT_HINT = /^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back|list\w*|wylistuj\w*|check|sprawdz\w*|wipe|nuke|purge|destroy|clear|clean\w*|wyczysc\w*|drop|what|which|where|about|with|from|into|then|also|again|teraz|jeszcze)$/;
const isHintWord = (w) => w.length >= 4 && !NOT_HINT.test(w) && !isStopWord(w) && !PRONOUN_WORD.test(w) && !FORCE.test(w)
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
  for (const re of SAME_BUT) if (re.test(fq)) return { lastIntent: ctx.last.intent, lastSlots };
  return null;
}

function intentUses(intent, ent) {

exec
/bin/bash -lc "sed -n '220,480p' src/history.js; cat src/shellwords.js" in /workspace/tellsh
 succeeded in 0ms:
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

/** The request text of a `tellsh ...` history line (options removed), or null if the line is not a tellsh call. */
export function tellshQuery(line, kind = 'posix') {
  const t = String(line).trim();
  const tm = t.match(TELLSH_LINE);
  if (!tm) return null;
  const w = wordsOf(tm[1] || '', lineKind(t, kind), { literalTilde: false });
  return w ? w.filter((x) => !/^-/.test(x)).map(rawOf).join(' ') : '';
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
    const r = q && classify ? classify(q) : null;
    if (r?.intent) { intent = r.intent; slots = { ...(r.slots || {}) }; entsFromSlots(intent, slots, ents); }
    return { line: t, intent, slots, ents, at: {}, ...(isSearchRoot(intent, slots, ents) ? { searchDir: true } : {}), fromTellsh: true, ambiguous };
  }
  const split = splitCommand(t, k, { keepRedirects: true });
  if (!split.ok) {
    // cannot interpret the line (unterminated quote, heredoc, ...): it may name any file or directory,
    // so older file/dir values must not be picked up by "it"
    ents.file = AMB + t;
    ents.dir = AMB + t;
    return { line: t, intent, slots, ents, at: {}, opaque: true, ambiguous: true };
  }
  const inv = invert(t, k);
  let segIntent = null;
  let segSlots = {};
  let segIntentAt = -1;
  let cdAt = -1;
  let searchDir = false;
  let listDir = false;
  const at = {};
  const firstWord = (s) => { let w = s.words.filter((x) => !REDIR_TARGET_OP.test(x) && !REDIR_DUP_OP.test(x)); while (w.length && (w[0] === 'sudo' || /^\w+=/.test(w[0]))) w = w.slice(1); return w[0]; };
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
    while (w.length && (w[0] === 'sudo' || /^\w+=/.test(w[0]))) w = w.slice(1);
    if (w.length) segmentEnts(w, e, setIntent, split, k, segIdx, firstWord);
    if (redirTarget != null) e.file = redirTarget;
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
    else if (segIdx > 0 && split.segments[segIdx - 1].sep === '|' && at.dir === segIdx - 1 && FILTER_HEADS.has(head)) searchDir = true;
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
    if (ie.dir !== undefined) { searchDir = isSearchRoot(intent, slots, ie); listDir = !searchDir && ['ls', 'find'].includes(FAMILY_OF[intent]); }
    ents = { ...ents, ...ie };
  } else if (segIntent) {
    intent = segIntent; slots = { ...segSlots };
    if (segIntentAt < cdAt) staleRelative({}, slots);
  }
  if (Object.values(slots).some(isAmbiguous)) ambiguous = true;
  return { line: t, intent, slots, ents, at, ambiguous, ...(searchDir && ents.dir != null ? { searchDir: true } : {}),
    ...(listDir && !searchDir && ents.dir != null ? { listDir: true } : {}), ...(cdAt >= 0 ? { cd: true } : {}) };
}

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
  const args = w.slice(1);
  const nonFlags = args.filter((a) => !/^-/.test(a));
  if (CD_HEADS.has(head.toLowerCase())) return; // handled by the caller
  if ((k === 'pwsh' || PS_CMDLET.test(head)) && psNative(head.toLowerCase(), args, e, setIntent)) return;
  if (head === 'docker') {
    const sub = nonFlags[0];
    if (sub === 'run') {
      const i = args.indexOf('--name');
      if (i >= 0 && args[i + 1]) e.container ??= args[i + 1];
      const nm = args.find((a) => a.startsWith('--name='));
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
  const flushSeg = (sep = '') => { flushWord(); if (words.length) segments.push({ words, raw: raws, sep }); else if (sep && segments.length) segments[segments.length - 1].sep += sep; words = []; raws = []; };
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

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const cases=[
[['find /var/log -name \"*.log\"'],'delete all those log files'],
[['rm -r old','ls newdir'],'same but recursively'],
[['find \""'$DIR" -type f -iname "*.log" -delete'"'],'same but older than 7 days'],
[['find \""'$DIR" -type f -iname "*.log" -delete'"'],'same but txt files'],
[['rm -r old','ls newdir'],'same but force'],
[['kill 1111','pgrep current-worker'],'kill that process'],
[['ls /srv/new.dir/ -R'],'delete it'],
[['ls -R /srv/newdir'],'delete it'],
[['Get-ChildItem C:\\\\Users\\\\me\\\\Downloads -Recurse -Include *.tmp'],'delete them'],
];
for(const [history,q] of cases){const r=suggest(q,{history,shell:'bash',os:'linux'});console.log(JSON.stringify({history,q,intent:r.intent,command:r.command,missing:r.missing,context:r.context,method:r.method,understood:r.understood}));}
JS" in /workspace/tellsh
 succeeded in 170ms:
{"history":["find /var/log -name \"*.log\""],"q":"delete all those log files","intent":"delete_by_ext","command":"find <PATH> -type f -iname '*.log' -delete","missing":["path"],"context":{"used":true,"commands":1,"rule":"refused","note":"no file in the recent history; not guessing"},"method":"history-rule","understood":true}
{"history":["rm -r old","ls newdir"],"q":"same but recursively","intent":"delete_dir","command":"rm -r old","missing":[],"context":{"used":true,"commands":2,"rule":"same-but","note":"modifies previous delete_dir"},"method":"history-rule","understood":true}
{"history":["find \"$DIR\" -type f -iname \"*.log\" -delete"],"q":"same but older than 7 days","intent":"find_older_than","command":"find . -type f -mtime +7 -iname '*.log'","missing":[],"context":{"used":true,"commands":1,"rule":"same-but","note":"modifies previous delete_by_ext"},"method":"history-rule","understood":true}
{"history":["find \"$DIR\" -type f -iname \"*.log\" -delete"],"q":"same but txt files","intent":"duplicate_files","command":"find . -type f -exec md5sum {} + | sort | uniq -w32 -dD","missing":[],"context":{"used":true,"commands":1,"rule":"same-but","note":"modifies previous delete_by_ext"},"method":"history-rule","understood":true}
{"history":["rm -r old","ls newdir"],"q":"same but force","intent":"delete_dir","command":"rm -r old","missing":[],"context":{"used":true,"commands":2,"rule":"same-but","note":"modifies previous delete_dir"},"method":"history-rule","understood":true}
{"history":["kill 1111","pgrep current-worker"],"q":"kill that process","intent":"kill_by_name","command":"pkill -f current-worker","missing":[],"context":{"used":true,"commands":2,"rule":"pronoun","note":"\"proc\" from history = current-worker"},"method":"history-rule","understood":true}
{"history":["ls /srv/new.dir/ -R"],"q":"delete it","intent":"delete_dir","command":"rm -r /srv/new.dir/","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"dir\" from history = /srv/new.dir/"},"method":"history-rule","understood":true}
{"history":["ls -R /srv/newdir"],"q":"delete it","intent":"delete_dir","command":"rm -r /srv/newdir","missing":[],"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"dir\" from history = /srv/newdir"},"method":"history-rule","understood":true}
{"history":["Get-ChildItem C:\\Users\\me\\Downloads -Recurse -Include *.tmp"],"q":"delete them","intent":"delete_dir","command":"rm -r <PATH>","missing":["path"],"context":{"used":true,"commands":1,"rule":"refused","note":"the latest dir in history (C:\\Users\\me\\Downloads) is where a search ran, not what it found; not guessing"},"method":"history-rule","understood":true}

exec
/bin/bash -lc "cat scripts/lib/jev.js; sed -n '1,240p' scripts/teacher.js; sed -n '1,160p' scripts/eval.js" in /workspace/tellsh
 succeeded in 0ms:
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
import { heldOutTexts, heldOutIndex } from './lib/heldout.js';
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

/** Held-out texts incl. near-duplicates and contrastive rewrites (scripts/lib/heldout.js). */
const heldOutSet = () => heldOutIndex(heldOutTexts(ROOT));

/**
 * Training rows filtered as gen_data.js filters them: held-out texts (and their near-duplicates) are never
 * sent to the teacher, and rows dropped in data/teacher/decisions.jsonl are not mined from.
 */
function trainingRows(held = heldOutSet()) {
  const dropped = new Set(readJsonl(join(TDIR, 'decisions.jsonl')).filter((d) => d.text && d.action === 'drop').map((d) => normalize(d.text)));
  return [...readDir(join(ROOT, 'data', 'intents')).map((r) => ({ ...r, src: `intents/${r.file}` })),
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
  writeJsonl(join(TDIR, 'review.jsonl'), flagged.map((r) => ({ text: r.text, intent: r.intent, src: r.src, teacher: r.t_intent, conf: r.t_conf, p_ours: r.t_p, opts: r.opts })));
  console.log(`verify: ${ok.length}/${res.length} answered; intent agree ${agree.length} (${(100 * agree.length / ok.length).toFixed(1)}%); ` +
    `${flagged.length} flagged -> data/teacher/review.jsonl; risk agree ${(100 * summary.riskAgree / ok.length).toFixed(1)}%; ${riskFlags.length} intents with a risk disagreement`);
}

// ---------------------------------------------------------------------------------------------
// (b) label / filter new paraphrase candidates (data/candidates/*.jsonl) -> data/intents/g06_teacher.jsonl
async function label() {
  const rng = mulberry32(+arg('seed', 7));
  const held = heldOutSet();
  const have = new Set(trainingRows().filter((r) => !/^g0[67]_/.test(r.file || '')).map((r) => normalize(r.text)));
  const seen = new Set();
  const cands = readDir(join(ROOT, 'data', 'candidates')).filter((r) => {
    if (!r.intent) return false;
    const n = normalize(r.text);
    if (!BY_ID[r.intent] || held.has(r.text) || have.has(n) || seen.has(n)) return false;
    seen.add(n);
    return true;
  });
  const items = cands.map((r) => { const o = intentOptions(r.text, r.intent, r.shell, r.os, rng); return { r, o, qs: { i: intentQ(r.text, r.shell, o.opts) } }; });
  console.log(`teacher label: ${cands.length} new candidates (after dedup against training and held-out sets)`);
  const ans = await askPacked(items, +arg('per', 4), 'label');
  const accepted = [];
  const rejected = [];
  let failed = 0;
  items.forEach((it, j) => {
    const a = ans[j]?.i;
    if (!a) { failed++; return; } // a failed call is no answer, not a rejection
    const p = a?.probabilities?.[it.r.intent] ?? 0;
    const row = { text: it.r.text, intent: it.r.intent, lang: it.r.lang, ...(it.r.shell ? { shell: it.r.shell, os: it.r.os } : {}) };
    // accept when the teacher picks the proposed intent with p >= 0.6
    if (a && a.choice === it.r.intent && p >= 0.6) accepted.push({ ...row, src: 'teacher', hard: it.o.model !== it.r.intent });
    else rejected.push({ ...row, teacher: a?.choice ?? null, conf: a?.confidence ?? null, p_ours: p, opts: it.o.opts, model: it.o.model });
  });
  writeJsonl(join(ROOT, 'data', 'intents', 'g06_teacher.jsonl'), accepted.map(({ hard, ...r }) => r));
  writeJsonl(join(TDIR, 'label_rejected.jsonl'), rejected);
  // out-of-domain candidates (data/candidates/ood_*.jsonl): keep only what the teacher agrees is not a shell request
  const oodC = readDir(join(ROOT, 'data', 'candidates')).filter((r) => !r.intent && r.text && /^ood/.test(r.file));
  const oodHave = new Set(readJsonl(join(ROOT, 'data', 'ood.jsonl')).map((r) => normalize(r.text)));
  const oodItems = oodC.filter((r) => { const n = normalize(r.text); if (held.has(r.text) || oodHave.has(n) || seen.has(n)) return false; seen.add(n); return true; })
    .map((r) => ({ r, qs: { o: { type: 'noul', instructions: { question: 'Is this a request to do something on the computer that a shell command (bash, PowerShell, ...) could carry out — find, list, show, change, delete, kill, install, check something?', request: r.text } } } }));
  const oodAns = await askPacked(oodItems, +arg('per', 4), 'label-ood');
  const oodAcc = [];
  const oodRej = [];
  oodItems.forEach((it, j) => { const p = oodAns[j]?.o?.noul; if (p == null) { failed++; return; } (p < 0.3 ? oodAcc : oodRej).push({ text: it.r.text, lang: it.r.lang, p }); });
  writeJsonl(join(ROOT, 'data', 'ood_teacher.jsonl'), oodAcc.map(({ text, lang }) => ({ text, lang })));
  writeJsonl(join(TDIR, 'ood_rejected.jsonl'), oodRej);
  const hard = accepted.filter((r) => r.hard).length;
  const s = { candidates: cands.length, accepted: accepted.length, rejected: rejected.length, failed, optionsModelSha256: optionsModelSha, modelDisagreedOnAccepted: hard,
    ood: { candidates: oodItems.length, accepted: oodAcc.length, rejected: oodRej.length },
    byLang: Object.fromEntries(['en', 'pl'].map((l) => [l, accepted.filter((r) => r.lang === l).length])),
    byShell: accepted.reduce((m, r) => ((m[r.shell || 'bash'] = (m[r.shell || 'bash'] || 0) + 1), m), {}) };
  writeFileSync(join(TDIR, 'label_summary.json'), JSON.stringify(s, null, 1) + '\n');
  console.log(`label: accepted ${accepted.length}/${cands.length} (${hard} the current model got wrong), rejected ${rejected.length} -> data/teacher/label_rejected.jsonl`);
  recordLedger('label');
}

// ---------------------------------------------------------------------------------------------
// (c) hard negatives: contrastive rewrites of training rows across confusable intents
async function mine() {
  const rng = mulberry32(+arg('seed', 11));
  const held = heldOutSet();
  const rows = trainingRows().filter((r) => !/^g07_/.test(r.file || ''));
  const have = new Set(rows.map((r) => normalize(r.text)));
#!/usr/bin/env node
// Evaluation of the v0.2 cascade. Writes the eval section of EVAL.md.
//   1. per-stage accuracy on data/eval (held-out, never trained on): tool top-1/top-3, intent top-1/top-3,
//      answered / precision, per language
//   2. per shell: intent accuracy on data/eval under each shell context + data/shell/eval.jsonl
//      (shell-specific phrasing), render coverage and syntax validity (bash -n / sh -n)
//   3. slot F1 on data/slots/gold.jsonl (hand-annotated) for tagger / regex / merged, per type
//   4. end-to-end exact command: test/slot-cases.js (hand-written) and a relexicalised copy of data/eval
//      (values from held-out pools, gold command rendered from the inserted values)
//   5. history reference cases (data/history/eval.jsonl)
//   6. second pass / composer on out-of-catalogue requests (data/compose/eval.jsonl)
//   7. OOD rejection (data/ood_eval.jsonl)
import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { getModel } from '../src/model.js';
import { cascade } from '../src/cascade.js';
import { suggest, resolveWithTagger } from '../src/pipeline.js';
import { buildCommand, resolveSlots, finalizeSlots } from '../src/fill.js';
import { exFromSpans, normPath, normExt, normNum } from '../src/tagger.js';
import { extractSlots } from '../src/slots.js';
import { BY_ID } from '../src/catalog.js';
import { FAMILY_OF, SLOT_TAG, TAG_TYPES } from '../src/tools.js';
import { envFeatures } from '../src/env.js';
import { SLOT_CASES } from '../test/slot-cases.js';
import { silverSpans, relex, mulberry32 } from './lib/silver.js';
import { sameCmd } from './lib/cmdnorm.js';
import { updateSection } from './report.js';
import { pwshParses } from './lib/pwsh_parse.js';
import { heldOutIndex, nearKey } from './lib/heldout.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const VERBOSE = process.argv.includes('--verbose');
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const readDir = (d) => (existsSync(d) ? readdirSync(d) : []).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f)));
const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
const model = getModel();
const thr = model.thresholds.accept;
const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const ENVS = {
  bash: BASH, zsh: { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, sh: { shell: 'sh', os: 'linux', coreutils: 'gnu' },
  powershell: { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, fish: { shell: 'fish', os: 'linux', coreutils: 'gnu' },
  cmd: { shell: 'cmd', os: 'win32', coreutils: 'gnu' },
};
const out = [];
const md = (s = '') => out.push(s);
const SUM = {}; // machine-readable summary -> build/eval_summary.json (before/after table)
const rate = (a, b) => (b ? +(a / b).toFixed(4) : null);
const PLACEHOLDER = /<[A-Z][A-Z_]*>/;
const t0 = Date.now();

// ------------------------------------------------------------------------------------------
// 1. classification per stage
const evalRows = readDir(join(ROOT, 'data', 'eval'));
function clsStats(rows, env, extraFn = () => []) {
  const S = {};
  const conf = new Map();
  const per = new Map();
  const bump = (k, f) => { S[k] ??= { n: 0, tool1: 0, tool3: 0, top1: 0, top3: 0, ans: 0, ansOk: 0 }; S[k][f]++; };
  for (const r of rows) {
    const c = cascade(r.text, { model, extras: [...envFeatures(r.shell ? { shell: r.shell, os: r.os } : env), ...extraFn(r)] });
    const fam = FAMILY_OF[r.intent];
    const ok = c.intent === r.intent;
    for (const k of ['all', r.lang]) {
      bump(k, 'n');
      if (c.topTool === fam) bump(k, 'tool1');
      if (c.tools.some((t) => t.tool === fam)) bump(k, 'tool3');
      if (ok) bump(k, 'top1');
      if (c.top.slice(0, 3).some((t) => t.intent === r.intent)) bump(k, 'top3');
      if (c.confidence >= thr) { bump(k, 'ans'); if (ok) bump(k, 'ansOk'); }
    }
    const pi = per.get(r.intent) || { n: 0, ok: 0 };
    pi.n++; if (ok) pi.ok++;
    per.set(r.intent, pi);
    if (!ok) { const key = `${r.intent} → ${c.intent}`; conf.set(key, (conf.get(key) || 0) + 1); if (VERBOSE) console.log(`  ✗ [${r.intent} → ${c.intent} ${(c.confidence * 100).toFixed(0)}%] ${r.text}`); }
  }
  return { S, conf, per };
}
const C1 = clsStats(evalRows, BASH);
const row = (k, s) => `| ${k} | ${s.n} | ${pct(s.tool1, s.n)} | ${pct(s.tool3, s.n)} | ${pct(s.top1, s.n)} | ${pct(s.top3, s.n)} | ${pct(s.ans, s.n)} | ${pct(s.ansOk, s.ans)} |`;
const modelSize = statSync(join(ROOT, 'model', 'model.bin')).size;
const intentModels = Object.keys(model.models).filter((k) => k.startsWith('intent:'));
const tm = model.models.tool;
const tg = model.models.tagger;
md('## Model');
md();
md(`\`model/model.bin\` **${(modelSize / 1e6).toFixed(2)} MB** (int8 weights, TSH2): stage 1 tool model ${tm.rowIds.length} rows × ${tm.labels.length} classes ` +
  `(${tm.labels.length - 1} tool families + \`__none__\`), ${intentModels.length} stage-2 intent models ` +
  `(${intentModels.reduce((a, k) => a + model.models[k].rowIds.length * model.models[k].labels.length, 0)} weights), ` +
  `tagger ${tg.rowIds.length} rows × ${tg.labels.length} BIO labels. Trained ${model.trained} on ${model.n_rows} classifier rows ` +
  `and ${model.n_tag_seqs} tagged sequences. Thresholds: accept **${model.thresholds.accept}** (cascade score), compose **${model.thresholds.compose}** (stage-1 tool p). ` +
  `Internal holdout during training: tool top-1 ${(model.holdout.tool_top1 * 100).toFixed(1)}%, top-3 ${(model.holdout.tool_top3 * 100).toFixed(1)}%, intent ${(model.holdout.intent_acc * 100).toFixed(1)}%.`);
md();
md('## 1. Cascade accuracy per stage (held-out `data/eval`, shell=bash os=linux)');
md();
md(`${evalRows.length} sentences written independently of the training data (training sentences colliding with any eval set are dropped by \`gen_data.js\`).`);
md('Stage 1 = tool family (top-1 / top-3); stage 2 = intent after p(tool)·p(intent|tool) over the top-3 tools.');
md();
md('| split | n | tool top-1 | tool top-3 | intent top-1 | intent top-3 | answered (p ≥ thr) | precision when answered |');
md('|---|---|---|---|---|---|---|---|');
for (const k of ['all', 'en', 'pl']) md(row(k.toUpperCase(), C1.S[k]));
md();
const worst = [...C1.per.entries()].map(([k, v]) => [k, v.ok / v.n, v.n]).sort((a, b) => a[1] - b[1]).slice(0, 8);
md('Weakest intents: ' + worst.map(([k, a, n]) => `${k} ${(a * 100).toFixed(0)}% (n=${n})`).join(', ') + '.');
md('Top confusions: ' + [...C1.conf.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => `${k} ×${v}`).join(', ') + '.');
md();

// ------------------------------------------------------------------------------------------
// 2. per shell
const shellEval = readJsonl(join(ROOT, 'data', 'shell', 'eval.jsonl'));
const hasBin = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
const syntaxCheck = (cmd, shell) => {
  if (shell === 'bash' || shell === 'zsh') return spawnSync('bash', ['-n', '-c', cmd]).status === 0;
  if (shell === 'sh') return spawnSync('sh', ['-n', '-c', cmd]).status === 0;
  if (shell === 'fish' && hasBin('fish')) return spawnSync('fish', ['-n', '-c', cmd]).status === 0;
  if (shell === 'powershell' && hasBin('pwsh')) return pwshParses(cmd); // parse only, never runs cmd
  return null;
};
md('## 2. Per shell');
md();
md('Intent accuracy of the same held-out set under each shell/OS context (the `shell=` / `os=` tokens are classifier features),');
md('plus `data/shell/eval.jsonl`: requests phrased by users of that shell (cmdlet names, `dir /s`, Windows paths, …).');
md('*rendered*: share of eval intents with a native rendering for that shell; *syntax ok*: renders that pass `bash -n` (bash, zsh) / `sh -n` (dash; sh) ' +
  '/ `fish -n` / PowerShell parser — n/a when that shell is not installed here.');
md();
md('| shell (os) | data/eval intent top-1 | shell-phrased n | shell-phrased intent top-1 (EN / PL) | rendered | syntax ok |');
md('|---|---|---|---|---|---|');
const shellRes = {};
for (const [sh, env] of Object.entries(ENVS)) {
  const cs = sh === 'bash' ? C1 : clsStats(evalRows, env);
  const se = shellEval.filter((r) => r.shell === sh);
  const ss = clsStats(se, env);
  // render each eval sentence's gold intent with the extracted slots for this shell
  let rendered = 0;
  let checked = 0;
  let synOk = 0;
  const seen = new Set();
  for (const r of evalRows) {
    if (seen.has(r.intent)) continue;
    seen.add(r.intent);
    const b = buildCommand(r.intent, r.text, { env });
    if (b.gap || !b.command) continue;
    rendered++;
    if (b.missing.length) continue;
    const ok = syntaxCheck(b.command, sh);
    if (ok == null) continue;
    checked++;
    if (ok) synOk++; else if (VERBOSE) console.log(`  syntax ✗ ${sh}: ${b.command}`);
  }
  shellRes[sh] = { acc: cs.S.all.top1 / cs.S.all.n, phrased: ss.S.all ? ss.S.all.top1 / ss.S.all.n : null, rendered, n: seen.size, checked, synOk };
  const s = ss.S.all;
  md(`| ${sh} (${env.os}${env.coreutils === 'bsd' ? ', BSD' : ''}) | ${pct(cs.S.all.top1, cs.S.all.n)} | ${s ? s.n : 0} | ${s ? `${pct(s.top1, s.n)} (${pct(ss.S.en?.top1 || 0, ss.S.en?.n || 0)} / ${pct(ss.S.pl?.top1 || 0, ss.S.pl?.n || 0)})` : 'n/a'} | ${rendered}/${seen.size} | ${checked ? `${synOk}/${checked}` : 'n/a (not installed)'} |`);
}
md();

// ------------------------------------------------------------------------------------------
// 3. slot F1 (hand-annotated gold)
const gold = readJsonl(join(ROOT, 'data', 'slots', 'gold.jsonl'));
function typedValue(type, text) {

exec
/bin/bash -lc "rg --files test; cat test/regressions4.test.js; sed -n '220,540p' scripts/eval.js" in /workspace/tellsh
 succeeded in 0ms:
test/slot-cases.js
test/regressions3-render.test.js
test/fixtures/parity.json
test/regressions.test.js
test/parity.test.js
test/shells.test.js
test/regressions3-history.test.js
test/pipeline.test.js
test/danger.test.js
test/regressions2.test.js
test/regressions4.test.js
test/cli.test.js
test/regressions3.test.js
test/compose.test.js
test/slots.test.js
test/templates.test.js
// Regression tests for the round-3 review findings (review/r3-claude.md, review/r3-codex.md):
// refused/ambiguous slots never fall back to catalog defaults, punctuation guard on "same for" and the
// composer, "same for" never replays an older changing command, typed references by recency, literal
// tildes from history, filtered listings / plural pronouns, danger wrappers, composer pattern slots,
// ambiguous quoted text, teacher call accounting and order-insensitive held-out matching.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { checkDanger } from '../src/danger.js';
import { splitCommand } from '../src/shellwords.js';
import { sameCmd } from '../scripts/lib/cmdnorm.js';
import { nearKey, heldOutIndex } from '../scripts/lib/heldout.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const PWSH = { shell: 'powershell', os: 'win32', coreutils: 'gnu' };
const run = (q, history, env = BASH) => suggest(q, { env, ...(history ? { history } : {}) });

test('blocker: a withheld path is a placeholder, never the catalog default `.`', () => {
  const a = run('delete all log files in /tmp/data!');
  assert.match(a.command, /^find <PATH> /);
  assert.ok(!/find \. /.test(a.command), a.command);
  assert.ok(a.missing.includes('path'));
  assert.ok(a.warnings.some((w) => /placeholder/.test(w)));
  // refused history reference (the dir is a search root, the request names "files")
  const b = run('delete all those log files', ['find /var/log -type f -iname "*.log"']);
  assert.equal(b.context.rule, 'refused');
  assert.match(b.command, /^find <PATH> /);
  assert.ok(b.missing.includes('path'));
  // an ordinary request still uses the default
  assert.equal(run('delete all log files').command.startsWith('find . '), true);
});

test('punctuation guard covers "same for" and the composer', () => {
  const a = run('same for /tmp/data!', ['rm -r old']);
  assert.equal(a.command, 'rm -r <PATH>');
  assert.ok(a.missing.includes('path'));
  assert.ok(a.warnings.some((w) => /placeholder/.test(w)));
  assert.equal(run('same for /tmp/data', ['rm -r old']).command, 'rm -r /tmp/data');
  const c = run('change permissions recursively to 777 on /tmp/data!');
  assert.ok(!/\/tmp\/data/.test(c.command || ''), c.command);
  assert.notEqual(c.method, 'composed');
  // a sentence comma after a path does not stop a read-only composition
  const f = run("find directories named node_modules under ~/code, don't go deeper than 3 levels");
  assert.equal(f.method, 'composed');
  assert.equal(f.command, 'find ~/code -maxdepth 3 -type d -name node_modules');
  assert.equal(run('szukaj słowa password w katalogu /etc, rekurencyjnie, tylko nazwy plików, bez wielkości liter').command, 'grep -i -r -l -- password /etc');
});

test('"same for" never replays an older changing command past a newer one', () => {
  const r = run('same for /srv/current', ['rm -r old', 'ls newdir']);
  assert.equal(r.understood, false);
  assert.equal(r.command, null);
  assert.equal(r.context.rule, 'refused');
  // the previous command itself, or a safe one, is still repeated
  assert.equal(run('same for /srv/current', ['rm -r old']).command, 'rm -r /srv/current');
  assert.equal(run('same for /srv/x', ['du -sh old', 'ls newdir']).command, 'du -sh /srv/x');
  assert.equal(run('same for /srv/x', ['rm -r old', 'clear']).command, 'rm -r /srv/x'); // names nothing
  // "what about this": no new target at all
  const w = run('what about this', ['rm -r foo']);
  assert.equal(w.understood, false);
  assert.equal(w.command, null);
});

test('typed process references follow recency', () => {
  assert.equal(run('kill that process', ['kill 1111', 'pgrep current-worker']).command, 'pkill -f current-worker');
  assert.equal(run('kill that process', ['pgrep current-worker', 'kill 1111']).command, 'kill 1111');
  const amb = run('kill that process', ['kill 1111', 'pgrep "$PROC"']);
  assert.equal(amb.context.rule, 'refused');
  assert.ok(!/1111/.test(amb.command), amb.command);
  assert.equal(run('kill that pid', ['kill 1111', 'pgrep current-worker']).command, 'kill 1111');
});

test('a quoted or escaped ~ from history stays a literal directory named ~', () => {
  assert.equal(run('delete it', ["cat '~/notes.txt'"]).command, "rm './~/notes.txt'");
  assert.equal(run('delete it', ['cat \\~/notes.txt']).command, "rm './~/notes.txt'");
  assert.equal(run('delete it', ['cat "~"/notes.txt']).command, "rm './~/notes.txt'");
  assert.equal(run('delete it', ['cat ~/notes.txt']).command, 'rm ~/notes.txt');
  // ~user expands to a directory we cannot know
  assert.equal(run('delete it', ['cat ~bob/notes.txt']).context.rule, 'refused');
  assert.equal(sameCmd("cat '~/notes.txt'", 'cat ~/notes.txt'), false);
  assert.equal(sameCmd("cat '~/notes.txt'", 'cat \\~/notes.txt'), true);
  assert.deepEqual(splitCommand('cd ~ && ls ~/x').segments.map((s) => s.words), [['cd', '~'], ['ls', '~/x']]);
  // PowerShell resolves ~ in quoted paths too: unchanged
  assert.deepEqual(splitCommand("Get-Content '~/x'", 'pwsh').segments[0].words, ['Get-Content', '~/x']);
});

test('"delete them/it" after a filtered listing never targets the listed directory', () => {
  for (const [q, h, env] of [
    ['delete them', ['Get-ChildItem C:\\Users\\me\\Downloads -Recurse -Include *.tmp'], PWSH],
    ['delete it', ['Get-ChildItem C:\\Users\\me\\Downloads -Recurse -Include *.tmp'], PWSH],
    ['delete them', ['Get-ChildItem $HOME\\Downloads -Filter *.pdf'], PWSH],
    ['delete them', ['gci C:\\logs *.log'], PWSH],
    ['delete them', ['ls -la ~/Downloads | grep pdf'], BASH],
    ['delete it', ['ls -la ~/Downloads | grep pdf'], BASH],
    ['usuń je', ['ls ~/Pobrane | grep pdf'], BASH],
    ['delete them', ['egrep -rl TODO src'], BASH],
    ['delete them', ['git grep -l TODO src'], BASH],
    ['delete them', ['ack -l TODO src'], BASH],
  ]) {
    const r = run(q, h, env);
    assert.equal(r.context.rule, 'refused', `${q} after ${h}: ${r.command}`);
    assert.match(r.command, /<PATH>/, `${q} after ${h}: ${r.command}`);
    assert.ok(r.missing.includes('path'));
  }
  // a pipe into ps/grep still reads a process, not a directory
  assert.notEqual(run('delete it', ['ps aux | grep node']).context.rule, 'refused');
});

test('plural pronouns after a plain listing refer to the entries, not the directory', () => {
  for (const [q, h, env] of [
    ['delete them', ['ls /tmp/build'], BASH],
    ['remove those', ['ls /tmp/build'], BASH],
    ['delete them', ['grep -rl TODO src', 'ls src'], BASH],
    ['usuń je', ['ls /tmp/build'], BASH],
    ['delete them', ['Get-ChildItem C:\\tmp\\old'], PWSH],
  ]) {
    const r = run(q, h, env);
    assert.equal(r.context.rule, 'refused', `${q} after ${h}: ${r.command}`);
    assert.match(r.command, /<PATH>/);
  }
  // singular "it" is the directory itself; non-destructive plural reuse is fine
  assert.equal(run('delete it', ['ls /tmp/build']).command, 'rm -r /tmp/build');
  assert.equal(run('delete it', ['grep -rl TODO src', 'ls src']).command, 'rm -r src');
  assert.equal(run('list them', ['ls /tmp/build']).command, 'ls -lah /tmp/build');
});

test('danger: more command wrappers, whole-disk shred', () => {
  for (const c of ['unshare rm -rf /', 'unshare -m rm -rf /', 'watch rm -rf /', 'watch -n 1 rm -rf /', "watch 'rm -rf /'",
    'nsenter -t 1 -m rm -rf /', 'flock /tmp/l rm -rf /', 'taskset -c 0 rm -rf /', 'strace -f rm -rf /', 'systemd-run rm -rf /',
    'shred -u /dev/sda', 'shred /dev/nvme0n1', 'blkdiscard /dev/sdb', 'wipe /dev/mmcblk0']) {
    assert.equal(checkDanger(c).critical, true, c);
  }
  assert.equal(checkDanger('shred -u notes.txt').critical, false);
  assert.equal(checkDanger('watch ls').risk, 'safe');
  assert.equal(checkDanger('taskset 1 node bench.js').risk, 'safe');
});

test('grep pattern slot: option words are not the pattern, a path-like pattern keeps the search dir', () => {
  assert.equal(run('grep for ~/foo recursively in src').command, "grep -rn -- '~/foo' src");
  assert.equal(run('grep for ~/foo in src').command, "grep -rn -- '~/foo' src");
  assert.equal(run('grep for TODO recursively in src').command, 'grep -rn -- TODO src');
  assert.equal(run('grep TODO in ~/proj').command, 'grep -rn -- TODO ~/proj');
});

test('quoted text that may end at an escaped quote is a placeholder in every shell', () => {
  const q = 'search for "a\\" -e evil" in src';
  for (const env of [BASH, PWSH]) {
    const r = run(q, null, env);
    assert.match(r.command, /<PATTERN>/, r.command);
    assert.ok(!/'a\\'/.test(r.command), r.command);
    assert.ok(r.missing.includes('pattern'));
  }
  assert.equal(run('search for "a\\" in src').command, "grep -rn -- 'a\\' src"); // nothing after it: unambiguous
});

test('teacher accounting: every request sent is a network call', async () => {
  const saved = { fetch: globalThis.fetch, key: process.env.TYPESAFE_API_KEY };
  process.env.TYPESAFE_API_KEY = 'test-placeholder';
  let requests = 0;
  globalThis.fetch = async () => { requests++; return { ok: false, status: 503, json: async () => null, headers: { get: () => null } }; };
  try {
    const { ask, stats } = await import('../scripts/lib/jev.js');
    const before = stats.calls;
    await assert.rejects(ask(`regression-test-${Date.now()}`, {}, { retries: 1 }));
    assert.equal(requests, 2);
    assert.equal(stats.calls - before, 2);
  } finally {
    globalThis.fetch = saved.fetch;
    if (saved.key == null) delete process.env.TYPESAFE_API_KEY; else process.env.TYPESAFE_API_KEY = saved.key;
  }
});

test('held-out matching ignores word order', () => {
  assert.equal(nearKey('last 30 kernel messages'), nearKey('kernel messages last 30'));
  assert.equal(nearKey('pokaż dyski i partycje'), nearKey('pokaż partycje i dyski'));
  const idx = heldOutIndex(['show all disks and partitions']);
  assert.ok(idx.has('partitions and disks show'));
  assert.ok(!idx.has('show disks'));
});

test('CLI: an unresolvable history reference says so (exit 3, no command)', async () => {
  const { spawnSync } = await import('node:child_process');
  const { mkdtempSync, writeFileSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-r4-'));
  const hist = join(dir, 'bash_history');
  writeFileSync(hist, 'rm -r old\nls newdir\n');
  const r = spawnSync(process.execPath, ['bin/tellsh.js', '--dry-run', `--history=${hist}`, 'same', 'for', '/srv/current'], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
  assert.equal(r.status, 3);
  assert.match(r.stdout, /Cannot resolve "same for \/srv\/current" from history/);
  assert.doesNotMatch(r.stdout, /rm -r/);
});
const F = Object.fromEntries(Object.entries(sys).map(([k, v]) => [k, f1(goldTyped, v)]));
const goldLang = (lang) => gold.map((r, i) => (r.lang === lang ? i : -1)).filter((i) => i >= 0);
const fLang = (mode, lang) => { const ix = goldLang(lang); return f1(ix.map((i) => goldTyped[i]), ix.map((i) => sys[mode][i])).f1; };
md('## 3. Slot filling (stage 3)');
md();
md(`\`data/slots/gold.jsonl\`: ${gold.length} hand-annotated requests (${goldLang('en').length} EN / ${goldLang('pl').length} PL), gold intent given. ` +
  'Spans are mapped onto the slots the intent uses and compared as normalised typed values (paths after location mapping, sizes in find units, durations in minutes, …).');
md();
md('| slot method | precision | recall | F1 | F1 EN | F1 PL |');
md('|---|---|---|---|---|---|');
for (const [k, v] of Object.entries(F)) md(`| ${k === 'merge' ? '**tagger + regex fallback (shipped)**' : k === 'tagger' ? 'BIO tagger only' : 'regex only (v0.1)'} | ${(v.p * 100).toFixed(1)}% | ${(v.r * 100).toFixed(1)}% | ${(v.f1 * 100).toFixed(1)}% | ${(fLang(k, 'en') * 100).toFixed(1)}% | ${(fLang(k, 'pl') * 100).toFixed(1)}% |`);
md();
md('Per type F1 (tagger only / regex only / merged): ' + TAG_TYPES.filter((t) => F.merge.per[t]).map((t) =>
  `${t} ${(F.tagger.per[t]?.f1 * 100 || 0).toFixed(0)}/${(F.regex.per[t]?.f1 * 100 || 0).toFixed(0)}/${(F.merge.per[t].f1 * 100).toFixed(0)}`).join(', ') + '.');
md();

// ------------------------------------------------------------------------------------------
// 4. end-to-end exact command
const slotCase = { merge: 0, tagger: 0, regex: 0 };
const slotFails = [];
for (const [intent, q, expected] of SLOT_CASES) {
  for (const mode of Object.keys(slotCase)) {
    const got = buildCommand(intent, q, { env: BASH, resolved: resolveWithTagger(intent, q, { model, mode }).slots }).command;
    if (got === expected) slotCase[mode]++; else if (mode === 'merge') slotFails.push({ intent, q, expected, got });
  }
}
// relexicalised held-out eval: values from the held-out pools, gold command rendered from the inserted spans
const rng = mulberry32(7);
const e2e = { all: { n: 0, ok: 0, okGoldIntent: 0 }, en: { n: 0, ok: 0, okGoldIntent: 0 }, pl: { n: 0, ok: 0, okGoldIntent: 0 } };
const e2eFails = [];
let e2eIncompleteGold = 0;
let e2eKept = 0;
let e2eSpans = 0;
// a suggestion only counts when it is complete: no <PLACEHOLDER> and no missing required slot
const complete = (s) => s.understood && s.command && !PLACEHOLDER.test(s.command) && !(s.missing || []).length;
for (const r of evalRows) {
  const { spans } = silverSpans(r.text, r.intent);
  if (!spans.length) continue;
  const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'eval', keepProb: 0 });
  e2eSpans += rx.spans.length;
  e2eKept += rx.spans.filter((x) => !x.replaced).length;
  const it = BY_ID[r.intent];
  const goldSlots = finalizeSlots(it, resolveSlots(it, exFromSpans(rx.text, rx.spans.map((s) => ({ ...s, text: rx.text.slice(s.start, s.end) })))));
  // regex-only values the silver labeler did not mark (e.g. defaults) are not part of the gold
  const gb = buildCommand(r.intent, rx.text, { env: BASH, resolved: goldSlots });
  const goldCmd = gb.command;
  // an incomplete gold command (a required value the silver spans missed) cannot be scored: excluded
  if (!goldCmd || PLACEHOLDER.test(goldCmd) || gb.missing?.length) { e2eIncompleteGold++; continue; }
  const s = suggest(rx.text, { env: BASH, model, compose: 'off' });
  const bi = buildCommand(r.intent, rx.text, { env: BASH, resolved: resolveWithTagger(r.intent, rx.text, { model }).slots });
  const okGi = bi.command === goldCmd && !bi.missing?.length;
  const ok = complete(s) && s.command === goldCmd;
  for (const k of ['all', r.lang]) {
    e2e[k].n++;
    if (ok) e2e[k].ok++;
    if (okGi) e2e[k].okGoldIntent++;
  }
  if (!ok && e2eFails.length < 400) e2eFails.push({ text: rx.text, gold: goldCmd, got: s.command, intent: r.intent, pred: s.intent });
}
SUM.e2e_relex = rate(e2e.all.ok, e2e.all.n);
SUM.e2e_relex_gold_intent = rate(e2e.all.okGoldIntent, e2e.all.n);
md('## 4. End-to-end exact command (bash, linux)');
md();
md(`* \`test/slot-cases.js\` (${SLOT_CASES.length} hand-written request → command pairs, gold intent): ` +
  `**${slotCase.merge}/${SLOT_CASES.length}** shipped (tagger + regex fallback), ${slotCase.tagger}/${SLOT_CASES.length} tagger only, ${slotCase.regex}/${SLOT_CASES.length} regex only.`);
md(`* Relexicalised \`data/eval\` (${e2e.all.n} requests that contain slot values; values replaced from an eval-only pool that never occurs in any ` +
  `training text (\`gen_data.js\` drops training rows mentioning one), numbers from ranges disjoint from the training relexicalisation; ` +
  `${e2eKept}/${e2eSpans} spans could not be replaced and keep their original value (named locations like "Pobrane", extension aliases like "python"). ` +
  'Gold command rendered by the production code from the inserted spans, so this measures classification + slot recovery, not template correctness ' +
  `(the hand-written \`data/blind/e2e.jsonl\` below does). A prediction counts only when complete (no placeholder, no missing slot); ` +
  `${e2eIncompleteGold} rows whose gold would be incomplete are excluded):`);
md();
md('| split | n | exact command (full pipeline) | exact command given gold intent |');
md('|---|---|---|---|');
for (const k of ['all', 'en', 'pl']) md(`| ${k.toUpperCase()} | ${e2e[k].n} | ${pct(e2e[k].ok, e2e[k].n)} | ${pct(e2e[k].okGoldIntent, e2e[k].n)} |`);
md();

// ------------------------------------------------------------------------------------------
// 5. history
function histEval(rows) {
  const H = { all: { n: 0, intent: 0, cmd: 0, noHist: 0 }, en: { n: 0, intent: 0, cmd: 0, noHist: 0 }, pl: { n: 0, intent: 0, cmd: 0, noHist: 0 } };
  const fails = [];
  for (const r of rows) {
    const s = suggest(r.query, { env: BASH, model, history: r.history, compose: 'off' });
    const s0 = suggest(r.query, { env: BASH, model, compose: 'off' });
    for (const k of ['all', r.lang]) {
      H[k].n++;
      if (s.intent === r.expect_intent) H[k].intent++;
      if (s.command === r.expect_command) H[k].cmd++;
      if (s0.command === r.expect_command) H[k].noHist++;
    }
    if (s.command !== r.expect_command) fails.push({ q: r.query, h: r.history.slice(-2), exp: r.expect_command, got: s.command, rule: s.context?.rule });
  }
  return { H, fails };
}
const histTable = (H) => {
  md('| split | n | intent | exact command | exact command without history |');
  md('|---|---|---|---|---|');
  for (const k of ['all', 'en', 'pl']) md(`| ${k.toUpperCase()} | ${H[k].n} | ${pct(H[k].intent, H[k].n)} | ${pct(H[k].cmd, H[k].n)} | ${pct(H[k].noHist, H[k].n)} |`);
  md();
};
const hist = readJsonl(join(ROOT, 'data', 'history', 'eval.jsonl'));
const HO = histEval(hist);
const histBlind = readJsonl(join(ROOT, 'data', 'blind', 'history.jsonl'));
const HB = histBlind.length ? histEval(histBlind) : null;
const H = HO.H;
const histFails = [...HO.fails, ...(HB ? HB.fails.map((f) => ({ ...f, blind: true })) : [])];
SUM.history_dev = rate(H.all.cmd, H.all.n);
if (HB) SUM.history_blind = rate(HB.H.all.cmd, HB.H.all.n);
md('## 5. History references');
md();
md('"delete it" / "usuń to", "same for /var" / "to samo dla /var", "logs of that container" / "logi tego kontenera", "kill it", … with the last shell-history lines given (raw commands and earlier `tellsh` queries). ' +
  'Some rows expect a placeholder: the right answer is to refuse a stale, ambiguous or missing reference.');
md();
md(`**Development set** \`data/history/eval.jsonl\` (${hist.length} rows). Written independently of the rules but then used while developing them ` +
  '(v0.2: first run 60.4% exact), so it is **not a blind score**:');
md();
histTable(H);
if (HB) {
  md(`**Blind set** \`data/blind/history.jsonl\` (${histBlind.length} rows, written for v0.3 by a separate author before any result was seen, never used for tuning):`);
  md();
  histTable(HB.H);
}

// ------------------------------------------------------------------------------------------
// 6. composer
function compEval(rows) {
  const CP = { all: { n: 0, composed: 0, exact: 0, acc: 0, e2eAcc: 0 }, en: { n: 0, composed: 0, exact: 0, acc: 0, e2eAcc: 0 }, pl: { n: 0, composed: 0, exact: 0, acc: 0, e2eAcc: 0 } };
  const fails = [];
  for (const r of rows) {
    const s = suggest(r.text, { env: BASH, model });
    const cands = [r.gold, ...(r.acceptable || [])];
    const isComposed = s.method === 'composed';
    const exact = isComposed && sameCmd(s.command, r.gold);
    const acc = isComposed && cands.some((c) => sameCmd(s.command, c));
    const e2eAcc = s.understood && cands.some((c) => sameCmd(s.command, c));
    for (const k of ['all', r.lang]) {
      CP[k].n++;
      if (isComposed) CP[k].composed++;
      if (exact) CP[k].exact++;
      if (acc) CP[k].acc++;
      if (e2eAcc) CP[k].e2eAcc++;
    }
    if (!e2eAcc) fails.push({ q: r.text, gold: r.gold, got: s.understood ? s.command : '(not understood)', method: s.method });
  }
  return { CP, fails };
}
const compTable = (CP) => {
  md('| split | n | composer fired | composed exact | composed acceptable | any answer acceptable (catalog or composed) |');
  md('|---|---|---|---|---|---|');
  for (const k of ['all', 'en', 'pl']) md(`| ${k.toUpperCase()} | ${CP[k].n} | ${pct(CP[k].composed, CP[k].n)} | ${pct(CP[k].exact, CP[k].n)} | ${pct(CP[k].acc, CP[k].n)} | ${pct(CP[k].e2eAcc, CP[k].n)} |`);
  md();
};
const comp = readJsonl(join(ROOT, 'data', 'compose', 'eval.jsonl'));
const CO = compEval(comp);
const CP = CO.CP;
const compBlind = readJsonl(join(ROOT, 'data', 'blind', 'compose.jsonl'));
const CB = compBlind.length ? compEval(compBlind) : null;
const compFails = [...CO.fails, ...(CB ? CB.fails.map((f) => ({ ...f, blind: true })) : [])];
let falseCompose = 0;
for (const r of evalRows) if (suggest(r.text, { env: BASH, model }).method === 'composed') falseCompose++;
SUM.compose_dev_any = rate(CP.all.e2eAcc, CP.all.n);
SUM.compose_dev_composed_acc = rate(CP.all.acc, CP.all.n);
if (CB) { SUM.compose_blind_any = rate(CB.CP.all.e2eAcc, CB.CP.all.n); SUM.compose_blind_composed_acc = rate(CB.CP.all.acc, CB.CP.all.n); }
SUM.compose_false_fire = rate(falseCompose, evalRows.length);
md('## 6. Second pass: experimental composer');
md();
md('Out-of-catalogue requests (a tool with a flag combination that no catalog template has). ' +
  'Commands are compared after shell unquoting with only behaviour-preserving normalisation: option bundling/order for ordinary ' +
  'commands (`ls -ltr` = `ls -l -t -r`, `head -n5` = `head -5`); argument boundaries, case (`-name` ≠ `-iname`), quoting that changes ' +
  'expansion (`*.log` ≠ `\'*.log\'`), find\'s expression order, redirections and pipeline separators must match. ' +
  '*exact* = the gold command, *acceptable* = gold or a listed alternative.');
md();
md(`**Development set** \`data/compose/eval.jsonl\` (${comp.length} rows; used while developing the composer since v0.2 — not blind):`);
md();
compTable(CP);
if (CB) {
  md(`**Blind set** \`data/blind/compose.jsonl\` (${compBlind.length} rows, written for v0.3 by a separate author without seeing the composer vocabulary or any result):`);
  md();
  compTable(CB.CP);
}
md(`False fires on in-catalogue requests (\`data/eval\`, composer replaced a catalog answer): **${pct(falseCompose, evalRows.length)}** (${falseCompose}/${evalRows.length}).`);
md();

// ------------------------------------------------------------------------------------------
// 7. OOD
function oodEval(rows) {
  const L = { en: [0, 0], pl: [0, 0] };
  let rej = 0;
  for (const r of rows) {
    const s = suggest(r.text, { env: BASH, model });
    const ok = !s.understood;
    if (ok) rej++;
    L[r.lang] ??= [0, 0];
    L[r.lang][0]++;
    if (ok) L[r.lang][1]++;
    else if (VERBOSE) console.log(`  OOD accepted: ${r.text} -> ${s.command}`);
  }
  return { rej, L };
}
const ood = readJsonl(join(ROOT, 'data', 'ood_eval.jsonl'));
const OO = oodEval(ood);
const rejected = OO.rej;
const oodBlind = readJsonl(join(ROOT, 'data', 'blind', 'ood.jsonl'));
const OB = oodBlind.length ? oodEval(oodBlind) : null;
SUM.ood_rejected = rate(rejected, ood.length);
if (OB) SUM.ood_blind_rejected = rate(OB.rej, oodBlind.length);
md('## 7. Out-of-domain rejection');
md();
md(`\`data/ood_eval.jsonl\`: **${pct(rejected, ood.length)}** (${rejected}/${ood.length}) answered "I don't understand" (EN ${pct(OO.L.en[1], OO.L.en[0])}, PL ${pct(OO.L.pl[1], OO.L.pl[0])}), including the composer path.`);
if (OB) md(`Blind \`data/blind/ood.jsonl\`: **${pct(OB.rej, oodBlind.length)}** (${OB.rej}/${oodBlind.length}; EN ${pct(OB.L.en[1], OB.L.en[0])}, PL ${pct(OB.L.pl[1], OB.L.pl[0])}).`);
md();

// ------------------------------------------------------------------------------------------
// 8. blind sets for v0.3 (written by a separate author before any v0.3 result was seen)
const blindInt = readJsonl(join(ROOT, 'data', 'blind', 'intents.jsonl'));
const blindE2e = readJsonl(join(ROOT, 'data', 'blind', 'e2e.jsonl'));
// Contamination: a blind row whose text (exactly, or after filler words are removed and words sorted) also occurs in another
// eval set or in any training source file (before gen_data.js filtering, so this includes rows the v0.2
// model was trained on). Those rows are excluded from training now, but they were not written blind.
const otherEval = heldOutIndex([
  ...readDir(join(ROOT, 'data', 'eval')).map((r) => r.text), ...readJsonl(join(ROOT, 'data', 'shell', 'eval.jsonl')).map((r) => r.text),
  ...readJsonl(join(ROOT, 'data', 'compose', 'eval.jsonl')).map((r) => r.text), ...readJsonl(join(ROOT, 'data', 'slots', 'gold.jsonl')).map((r) => r.text),
  ...readJsonl(join(ROOT, 'data', 'ood_eval.jsonl')).map((r) => r.text), ...SLOT_CASES.map((c) => c[1]),
].filter(Boolean));
const trainSrc = new Set([...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')),
  ...readJsonl(join(ROOT, 'data', 'ood.jsonl')), ...readJsonl(join(ROOT, 'data', 'ood_teacher.jsonl'))].map((r) => nearKey(r.text)));
const contaminated = (r) => otherEval.has(r.text) || trainSrc.has(nearKey(r.text));
if (blindInt.length || blindE2e.length) {
  const all = [...blindInt, ...blindE2e];
  const nEval = all.filter((r) => otherEval.has(r.text)).length;
  const nTrain = all.filter((r) => trainSrc.has(nearKey(r.text))).length;
  SUM.blind_contaminated = { rows: all.length, otherEval: nEval, trainingSource: nTrain };
  md('## 8. Blind sets (v0.3)');
  md();
  md('Written for v0.3 from the catalog descriptions/templates and excluded from training (`gen_data.js`, including near-duplicates) and from tuning. ' +
    `They are **not fully clean**: ${nEval} of ${all.length} intent/e2e rows repeat a request from another eval set and ${nTrain} repeat (exactly, or up to filler words and word order) ` +
    'a row of a training source file, most of them rows the v0.2 model was trained on. Every table therefore also reports the **clean** subset without those rows.');
  md();
}
const DISK = /(na (całym |calym )?dysku|całego dysku|calego dysku|w całym systemie|w calym systemie|on (the )?(whole |entire )?(disk|drive)|(whole|entire) (disk|drive|system))/i;
if (blindInt.length) {
  const CBI = clsStats(blindInt, BASH);
  const disk = blindInt.filter((r) => DISK.test(r.text));
  const CD = disk.length ? clsStats(disk, BASH) : null;
  SUM.blind_intent = rate(CBI.S.all.top1, CBI.S.all.n);
  SUM.blind_intent_en = rate(CBI.S.en?.top1 || 0, CBI.S.en?.n || 0);
  SUM.blind_intent_pl = rate(CBI.S.pl?.top1 || 0, CBI.S.pl?.n || 0);
  md(`**Intent** \`data/blind/intents.jsonl\` (${blindInt.length} rows, each with its own shell/OS context; extra weight on confusable pairs):`);
  md();
  md('| split | n | tool top-1 | tool top-3 | intent top-1 | intent top-3 | answered (p ≥ thr) | precision when answered |');
  md('|---|---|---|---|---|---|---|---|');
  for (const k of ['all', 'en', 'pl']) if (CBI.S[k]) md(row(k.toUpperCase(), CBI.S[k]));
  const cleanInt = blindInt.filter((r) => !contaminated(r));
  const CCI = clsStats(cleanInt, BASH);
  md(row("CLEAN", CCI.S.all));
  SUM.blind_intent_clean = rate(CCI.S.all.top1, CCI.S.all.n);
  md();
  const byShell = {};
  for (const r of blindInt) (byShell[r.shell || 'bash'] ??= []).push(r);
  md('Per shell (intent top-1): ' + Object.entries(byShell).map(([sh, rs]) => { const c = clsStats(rs, BASH).S.all; SUM[`blind_intent_${sh}`] = rate(c.top1, c.n); return `${sh} ${pct(c.top1, c.n)} (n=${c.n})`; }).join(', ') + '.');
  md();
  const worstB = [...CBI.per.entries()].filter(([, v]) => v.n >= 4).map(([k, v]) => [k, v.ok / v.n, v.n]).sort((a, b) => a[1] - b[1]).slice(0, 8);
  md('Weakest intents (n ≥ 4): ' + worstB.map(([k, a, n]) => `${k} ${(a * 100).toFixed(0)}% (n=${n})`).join(', ') + '.');
  md('Top confusions: ' + [...CBI.conf.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => `${k} ×${v}`).join(', ') + '.');
  if (CD) { SUM.blind_intent_disk = rate(CD.S.all.top1, CD.S.all.n); md(`Rows that name the whole disk as location ("na całym dysku", "entire drive", …): intent top-1 ${pct(CD.S.all.top1, CD.S.all.n)} (n=${CD.S.all.n}).`); }
  md();
  if (VERBOSE) for (const r of blindInt) { const c = cascade(r.text, { model, extras: envFeatures({ shell: r.shell, os: r.os }) }); if (c.intent !== r.intent) console.log(`  blind ✗ [${r.intent} → ${c.intent}] (${r.shell}) ${r.text}`); }
}
const blindE2eFails = [];
if (blindE2e.length) {
  const E = { all: { n: 0, ok: 0, okGi: 0 }, en: { n: 0, ok: 0, okGi: 0 }, pl: { n: 0, ok: 0, okGi: 0 }, clean: { n: 0, ok: 0, okGi: 0 } };
  let diskN = 0; let diskOk = 0;
  for (const r of blindE2e) {
    const s = suggest(r.text, { env: BASH, model, compose: 'off' });
    const ok = complete(s) && sameCmd(s.command, r.expect_command);
    const bi = buildCommand(r.intent, r.text, { env: BASH, resolved: resolveWithTagger(r.intent, r.text, { model }).slots });
    const okGi = !bi.missing?.length && sameCmd(bi.command, r.expect_command);
    for (const k of ['all', r.lang, ...(contaminated(r) ? [] : ['clean'])]) { E[k].n++; if (ok) E[k].ok++; if (okGi) E[k].okGi++; }
    if (DISK.test(r.text)) { diskN++; if (ok) diskOk++; }
    if (!ok) blindE2eFails.push({ text: r.text, gold: r.expect_command, got: s.command, intent: r.intent, pred: s.intent });
  }
  SUM.blind_e2e = rate(E.all.ok, E.all.n);
  SUM.blind_e2e_gold_intent = rate(E.all.okGi, E.all.n);
  md(`**End-to-end** \`data/blind/e2e.jsonl\` (${blindE2e.length} requests with a hand-written complete bash command; compared with the same normalisation as §6):`);
  md();
  md('| split | n | exact command (full pipeline) | exact command given gold intent |');
  md('|---|---|---|---|');
  for (const k of ['all', 'en', 'pl', 'clean']) md(`| ${k.toUpperCase()} | ${E[k].n} | ${pct(E[k].ok, E[k].n)} | ${pct(E[k].okGi, E[k].n)} |`);
  SUM.blind_e2e_clean = rate(E.clean.ok, E.clean.n);
  md();
  if (diskN) { SUM.blind_e2e_disk = rate(diskOk, diskN); md(`Whole-disk location rows: ${diskOk}/${diskN} exact.`); md(); }
}

updateSection('eval', out.join('\n'));
SUM.intent_top1 = rate(C1.S.all.top1, C1.S.all.n);
SUM.intent_top1_en = rate(C1.S.en.top1, C1.S.en.n);
SUM.intent_top1_pl = rate(C1.S.pl.top1, C1.S.pl.n);
SUM.tool_top1 = rate(C1.S.all.tool1, C1.S.all.n);
SUM.answered = rate(C1.S.all.ans, C1.S.all.n);
SUM.precision_answered = rate(C1.S.all.ansOk, C1.S.all.ans);
SUM.slot_f1 = +F.merge.f1.toFixed(4);
SUM.slot_cases = rate(slotCase.merge, SLOT_CASES.length);
SUM.shell_phrased = Object.fromEntries(Object.entries(shellRes).map(([k, v]) => [k, v.phrased == null ? null : +v.phrased.toFixed(4)]));
SUM.weak = Object.fromEntries([...C1.per.entries()].filter(([k]) => /^(find_symlinks|broken_symlinks|find_process|service_status|git_push|git_pull|empty_files|list_files|disk_free|block_devices|users_logged_in|show_path)$/.test(k)).map(([k, v]) => [k, rate(v.ok, v.n)]));
mkdirSync(join(ROOT, 'build'), { recursive: true });
writeFileSync(join(ROOT, 'build', 'eval_summary.json'), JSON.stringify(SUM, null, 1));
const s = C1.S.all;
console.log(`stage1 tool top1=${pct(s.tool1, s.n)} top3=${pct(s.tool3, s.n)} | intent top1=${pct(s.top1, s.n)} (EN ${pct(C1.S.en.top1, C1.S.en.n)} PL ${pct(C1.S.pl.top1, C1.S.pl.n)}) answered=${pct(s.ans, s.n)} prec=${pct(s.ansOk, s.ans)}`);
console.log('per shell: ' + Object.entries(shellRes).map(([k, v]) => `${k} ${(v.acc * 100).toFixed(1)}% render ${v.rendered}/${v.n} syntax ${v.checked ? v.synOk + '/' + v.checked : 'n/a'}`).join(' | '));
console.log(`slot F1 merge=${(F.merge.f1 * 100).toFixed(1)} tagger=${(F.tagger.f1 * 100).toFixed(1)} regex=${(F.regex.f1 * 100).toFixed(1)} | slot-cases merge ${slotCase.merge}/${SLOT_CASES.length} tagger ${slotCase.tagger} regex ${slotCase.regex}`);
console.log(`e2e relex exact=${pct(e2e.all.ok, e2e.all.n)} (gold intent ${pct(e2e.all.okGoldIntent, e2e.all.n)}) | history cmd=${pct(H.all.cmd, H.all.n)} | compose fired=${pct(CP.all.composed, CP.all.n)} exact=${pct(CP.all.exact, CP.all.n)} acceptable=${pct(CP.all.acc, CP.all.n)} anyAcc=${pct(CP.all.e2eAcc, CP.all.n)} falseFire=${falseCompose} | OOD rejected=${pct(rejected, ood.length)}`);
if (VERBOSE) {
  for (const f of slotFails) console.log(`  slot-case ✗ ${f.intent}: ${f.q}\n      got ${f.got}\n      exp ${f.expected}`);
  for (const f of histFails) console.log(`  hist ✗ ${f.q} [${f.h.join(' ; ')}] rule=${f.rule}\n      got ${f.got}\n      exp ${f.exp}`);
  for (const f of compFails) console.log(`  comp ✗ (${f.method}) ${f.q}\n      got ${f.got}\n      exp ${f.gold}`);
  for (const f of blindE2eFails) console.log(`  blind-e2e ✗ [${f.intent}→${f.pred}] ${f.text}\n      got ${f.got}\n      exp ${f.gold}`);
  for (const f of e2eFails.slice(0, 60)) console.log(`  e2e ✗ [${f.intent}→${f.pred}] ${f.text}\n      got ${f.got}\n      exp ${f.gold}`);
}
console.log(`wrote EVAL.md (eval section) in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

exec
/bin/bash -lc "cat src/render.js; sed -n '440,560p' src/fill.js; git diff 0d87457 -- src/tagger.js src/slots.js src/model.js src/cli.js bin/tellsh.js" in /workspace/tellsh
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
index c4f433c..435e3c5 100644
--- a/src/cli.js
+++ b/src/cli.js
@@ -58,7 +58,11 @@ export function parseArgs(argv) {
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
@@ -103,7 +107,9 @@ export function shellInvocation(command, shell) {
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
@@ -145,6 +151,7 @@ export async function main(argv = process.argv.slice(2)) {
   const opts = parseArgs(argv);
   if (opts.version) { console.log(pkg.version); return 0; }
   if (opts.help || !opts.words.length) { console.log(HELP); return opts.help ? 0 : 2; }
+  if (opts.badThreshold != null) { console.error(`tellsh: --threshold needs a number between 0 and 1 (got "${opts.badThreshold}")`); return 2; }
   const query = opts.words.join(' ');
   if (opts.shell && !normShell(opts.shell)) { console.error(`tellsh: unknown shell "${opts.shell}" (bash|zsh|sh|powershell|fish|cmd)`); return 2; }
   if (opts.os && !normOs(opts.os)) { console.error(`tellsh: unknown OS "${opts.os}" (linux|darwin|win32)`); return 2; }
@@ -164,6 +171,12 @@ export async function main(argv = process.argv.slice(2)) {
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
@@ -184,8 +197,9 @@ export async function main(argv = process.argv.slice(2)) {
   const interactive = process.stdin.isTTY && process.stdout.isTTY;
   const shellName = s.shell;
   if (opts.yes) {
-    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog') {
-      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' ? 'resolved from history' : s.missing.length ? 'incomplete' : s.risk;
+    const fromHistory = Object.values(s.slotSources || {}).includes('history');
+    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog' || fromHistory) {
+      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' || fromHistory ? 'resolved from history' : s.missing.length ? 'incomplete' : s.risk;
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
diff --git a/src/slots.js b/src/slots.js
index fb80f79..c741b31 100644
--- a/src/slots.js
+++ b/src/slots.js
@@ -89,12 +89,18 @@ const STOP = new Set(('the a an all any every some my me mi this that these thos
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
@@ -144,7 +150,29 @@ export function durationDerived(amount, unit) {
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
@@ -209,7 +237,7 @@ export function extractSlots(input) {
     const found = [];
     while ((m = PATH_TOKEN.exec(work))) {
       const start = m.index + m[0].length - m[1].length;
-      const raw = text.slice(start, start + m[1].length).replace(/[.]+$/, '');
+      const raw = trimPathPunct(text.slice(start, start + m[1].length));
       if (!raw) continue;
       if (/^\d+([.,]\d+)*$/.test(raw)) continue; // version/number
       if (/^\d+(\.\d+)?[kmgt]i?b?$/i.test(raw)) continue; // size like 1.5GB
@@ -240,6 +268,7 @@ export function extractSlots(input) {
   for (const [re, val] of LOCATIONS) {
     const m = work.match(re);
     if (m) {
+      if (re === ROOT_LOCATION) out.rootPhrase = true;
       spans.push([m.index, val]);
       mark('PATH', m.index, m.index + m[0].length, val);
       work = blank(work, m.index, m.index + m[0].length);
@@ -364,7 +393,8 @@ export function extractSlots(input) {
   }
   // 15. remaining numbers -> count
   {
-    const numMs = [...work.matchAll(/(?<![\w.])(\d+)(?![\w.])/g)];
+    // "-9" is an option/signal, never a count or a PID ("kill process named -9")
+    const numMs = [...work.matchAll(/(?<![\w.-])(\d+)(?![\w.])/g)];
     const nums = numMs.map((m) => +m[1]);
     out.numbers = nums;
     out.numberSpans = numMs.map((m) => ({ type: 'NUM', start: m.index, end: wordEnd(text, m.index), value: +m[1] }));
@@ -432,6 +462,13 @@ const TRIG = {
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
@@ -449,7 +486,7 @@ function taggedArg(slot, ex) {
     return host ? (user ? `${user}@${host}` : host) : null;
   }
   const t = TAG_OF[slot];
-  const v = (t && ex.tagged[t]?.[0]) ?? null;
+  const v = (t && (slot === 'pattern' ? ex.tagged[t]?.find((x) => !isOptionWord(x)) : ex.tagged[t]?.[0])) ?? null;
   return slot === 'service' && v ? v.replace(/\.service$/, '') : v;
 }
 
@@ -505,7 +542,7 @@ export function pickArg(slot, ex) {
     return p || null;
   }
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

exec
/bin/bash -lc "node --test --test-name-pattern='"'^(?!CLI: an unresolvable)'"' test/danger.test.js test/parity.test.js test/slots.test.js test/compose.test.js test/regressions3.test.js test/regressions3-history.test.js test/regressions3-render.test.js test/regressions4.test.js test/templates.test.js test/shells.test.js" in /workspace/tellsh
 exited 1 in 7608ms:
TAP version 13
# Subtest: /workspace/tellsh/test/compose.test.js
ok 1 - /workspace/tellsh/test/compose.test.js
  ---
  duration_ms: 1170.344024
  ...
# Subtest: /workspace/tellsh/test/danger.test.js
ok 2 - /workspace/tellsh/test/danger.test.js
  ---
  duration_ms: 339.584268
  ...
# Subtest: /workspace/tellsh/test/parity.test.js
ok 3 - /workspace/tellsh/test/parity.test.js
  ---
  duration_ms: 359.707039
  ...
# Subtest: /workspace/tellsh/test/regressions3-history.test.js
ok 4 - /workspace/tellsh/test/regressions3-history.test.js
  ---
  duration_ms: 477.986941
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 5 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 729.612011
  ...
# Subtest: /workspace/tellsh/test/regressions3.test.js
ok 6 - /workspace/tellsh/test/regressions3.test.js
  ---
  duration_ms: 758.959682
  ...
# Subtest: /workspace/tellsh/test/regressions4.test.js
not ok 7 - /workspace/tellsh/test/regressions4.test.js
  ---
  duration_ms: 1592.193388
  location: '/workspace/tellsh/test/regressions4.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 8 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 7201.062275
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/slots.test.js
ok 9 - /workspace/tellsh/test/slots.test.js
  ---
  duration_ms: 454.331201
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 10 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 498.294327
  location: '/workspace/tellsh/test/templates.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..10
# tests 10
# suites 0
# pass 7
# fail 3
# cancelled 0
# skipped 0
# todo 0
# duration_ms 7550.960766

exec
/bin/bash -lc "node --test-name-pattern='"'^(?!CLI: an unresolvable)'"' test/regressions4.test.js; node test/templates.test.js; node test/shells.test.js" in /workspace/tellsh
 exited 1 in 8174ms:
TAP version 13
# Subtest: blocker: a withheld path is a placeholder, never the catalog default `.`
ok 1 - blocker: a withheld path is a placeholder, never the catalog default `.`
  ---
  duration_ms: 77.957065
  ...
# Subtest: punctuation guard covers "same for" and the composer
ok 2 - punctuation guard covers "same for" and the composer
  ---
  duration_ms: 72.526932
  ...
# Subtest: "same for" never replays an older changing command past a newer one
ok 3 - "same for" never replays an older changing command past a newer one
  ---
  duration_ms: 15.594609
  ...
# Subtest: typed process references follow recency
ok 4 - typed process references follow recency
  ---
  duration_ms: 7.478603
  ...
# Subtest: a quoted or escaped ~ from history stays a literal directory named ~
ok 5 - a quoted or escaped ~ from history stays a literal directory named ~
  ---
  duration_ms: 8.145996
  ...
# Subtest: "delete them/it" after a filtered listing never targets the listed directory
ok 6 - "delete them/it" after a filtered listing never targets the listed directory
  ---
  duration_ms: 33.848332
  ...
# Subtest: plural pronouns after a plain listing refer to the entries, not the directory
ok 7 - plural pronouns after a plain listing refer to the entries, not the directory
  ---
  duration_ms: 19.641336
  ...
# Subtest: danger: more command wrappers, whole-disk shred
ok 8 - danger: more command wrappers, whole-disk shred
  ---
  duration_ms: 1.051423
  ...
# Subtest: grep pattern slot: option words are not the pattern, a path-like pattern keeps the search dir
ok 9 - grep pattern slot: option words are not the pattern, a path-like pattern keeps the search dir
  ---
  duration_ms: 41.600111
  ...
# Subtest: quoted text that may end at an escaped quote is a placeholder in every shell
ok 10 - quoted text that may end at an escaped quote is a placeholder in every shell
  ---
  duration_ms: 23.556359
  ...
# Subtest: teacher accounting: every request sent is a network call
ok 11 - teacher accounting: every request sent is a network call
  ---
  duration_ms: 655.943424
  ...
# Subtest: held-out matching ignores word order
ok 12 - held-out matching ignores word order
  ---
  duration_ms: 22.492948
  ...
# Subtest: CLI: an unresolvable history reference says so (exit 3, no command)
not ok 13 - CLI: an unresolvable history reference says so (exit 3, no command)
  ---
  duration_ms: 1.281236
  location: '/workspace/tellsh/test/regressions4.test.js:181:1'
  failureType: 'testCodeFailure'
  error: "EROFS: read-only file system, mkdtemp '/tmp/tellsh-r4-XXXXXX'"
  code: 'EROFS'
  stack: |-
    mkdtempSync (node:fs:3005:18)
    TestContext.<anonymous> (file:///workspace/tellsh/test/regressions4.test.js:186:15)
    async Test.run (node:internal/test_runner/test:797:9)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
1..13
# tests 13
# suites 0
# pass 12
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 999.767864
TAP version 13
# Subtest: shQuote round-trips nasty strings through bash
not ok 1 - shQuote round-trips nasty strings through bash
  ---
  duration_ms: 15.543188
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
  duration_ms: 0.365854
  ...
# Subtest: raw slots are validated, never injected
ok 3 - raw slots are validated, never injected
  ---
  duration_ms: 1.192768
  ...
# Subtest: optional segments are dropped when slot missing
ok 4 - optional segments are dropped when slot missing
  ---
  duration_ms: 0.252966
  ...
# Subtest: non-slot braces are left alone
ok 5 - non-slot braces are left alone
  ---
  duration_ms: 0.283832
  ...
# Subtest: every intent renders on linux and darwin without throwing, with valid risk
ok 6 - every intent renders on linux and darwin without throwing, with valid risk
  ---
  duration_ms: 71.110234
  ...
# Subtest: darwin variants differ where commands differ
ok 7 - darwin variants differ where commands differ
  ---
  duration_ms: 1.284212
  ...
# Subtest: injection attempt in a filename stays a single quoted argument
ok 8 - injection attempt in a filename stays a single quoted argument
  ---
  duration_ms: 0.401857
  ...
1..8
# tests 8
# suites 0
# pass 7
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 109.084186
TAP version 13
# Subtest: bash/linux: every intent renders and passes bash -n
ok 1 - bash/linux: every intent renders and passes bash -n
  ---
  duration_ms: 387.465771
  ...
# Subtest: zsh/darwin BSD: every intent renders and passes bash -n
ok 2 - zsh/darwin BSD: every intent renders and passes bash -n
  ---
  duration_ms: 879.256887
  ...
# Subtest: zsh/darwin GNU: every intent renders and passes bash -n
ok 3 - zsh/darwin GNU: every intent renders and passes bash -n
  ---
  duration_ms: 711.823206
  ...
# Subtest: sh/linux (dash): every intent renders and passes sh -n
ok 4 - sh/linux (dash): every intent renders and passes sh -n
  ---
  duration_ms: 836.30985
  ...
# Subtest: sh/busybox: every intent renders and passes busybox -n
ok 5 - sh/busybox: every intent renders and passes busybox -n
  ---
  duration_ms: 902.91533
  ...
# Subtest: fish: every intent renders (fish -n when installed)
ok 6 - fish: every intent renders (fish -n when installed)
  ---
  duration_ms: 841.017883
  ...
# fish not installed: syntax check skipped
# Subtest: PowerShell/win32: every intent renders or reports a gap (parser check when pwsh is installed)
ok 7 - PowerShell/win32: every intent renders or reports a gap (parser check when pwsh is installed)
  ---
  duration_ms: 927.634794
  ...
# pwsh not installed: parser check skipped (3 gaps)
# Subtest: PowerShell/linux: every intent renders or reports a gap (parser check when pwsh is installed)
ok 8 - PowerShell/linux: every intent renders or reports a gap (parser check when pwsh is installed)
  ---
  duration_ms: 605.450169
  ...
# pwsh not installed: parser check skipped (0 gaps)
# Subtest: cmd: best-effort coverage is reported, gaps carry a reason
ok 9 - cmd: best-effort coverage is reported, gaps carry a reason
  ---
  duration_ms: 21.850067
  ...
# Subtest: quoting round-trips through bash and sh
not ok 10 - quoting round-trips through bash and sh
  ---
  duration_ms: 11.651067
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
  duration_ms: 0.694433
  ...
# Subtest: per-shell variants: intent shared, rendering differs
ok 12 - per-shell variants: intent shared, rendering differs
  ---
  duration_ms: 21.118762
  ...
1..12
# tests 12
# suites 0
# pass 11
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 6199.845274

codex
I reproduced a remaining history issue: after `rm -r old` followed by `ls newdir`, “same but force” suggests `rm -r old`. The stale-command guard covers “same for,” but the “same but” path bypasses it. The round-3 in-memory regression tests pass; filesystem and subprocess restrictions blocked some broader checks.

exec
/bin/bash -lc 'cat scripts/gen_data.js; cat scripts/build_triggers.js; cat src/fill.js' in /workspace/tellsh
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
import { silverSpans, relex, bioLabels, mulberry32, EVAL_VALUES } from './lib/silver.js';
import { SLOT_CASES } from '../test/slot-cases.js';
import { heldOutTexts, heldOutIndex } from './lib/heldout.js';

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

  // held-out texts (never trained on), with filler-word near-duplicates and contrastive rewrites
  // (scripts/lib/heldout.js)
  const heldOut = heldOutIndex(heldOutTexts(ROOT, SLOT_CASES.map((c) => c[1])));
  // eval-only slot values (scripts/lib/silver.js EVAL_POOLS) must never occur in training text
  const esc = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const evalValRe = new RegExp(`(?<![\\p{L}\\d_])(?:${[...EVAL_VALUES].sort((a, b) => b.length - a.length).map(esc).join('|')})(?![\\p{L}\\d_])`, 'iu');
  const leaks = (text) => heldOut.has(text) || evalValRe.test(text);

  const intentRows = [...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'train.jsonl'))]
    .map((r) => ({ ...r, src: 'intents' }));
  const shellRows = readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell' }));
  for (const r of [...intentRows, ...shellRows]) if (!ids.has(r.intent)) throw new Error(`unknown intent ${r.intent}: ${r.text}`);

  // teacher review decisions (data/teacher/decisions.jsonl): drop or relabel individual training rows
  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl')).filter((d) => d.text && d.field !== 'risk');
  const decide = new Map(decisions.map((d) => [normalize(d.text), d]));
  let dropped = 0;
  let droppedEvalValue = 0;
  let droppedDerived = 0;
  let teacherDropped = 0;
  const seen = new Set();
  const base = [];
  for (const r0 of [...intentRows, ...shellRows]) {
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
    emit(r.text, fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g);
    if (boost.has(normalize(r.text) + '|' + r.intent)) { emit(r.text, fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g); nBoost++; }
    emit(typo(r.text), fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g);
    const { spans } = silverSpans(r.text, r.intent);
    emitTag(r.text, spans, fam, g);
    for (let k = 0; k < 2; k++) {
      const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'train' });
      emitTag(rx.text, rx.spans, fam, g);
      if (k === 0 && rx.text !== r.text) emit(rx.text, fam, r.intent, [...env(), ...ctx()], 0.5, r.src, r.lang, g);
    }
  }

  // filtered training corpus for scripts/build_triggers.js (same exclusions and teacher decisions)
  writeFileSync(join(outDir, 'train_rows.jsonl'), base.map((r) => JSON.stringify({ text: r.text, intent: r.intent, lang: r.lang, shell: r.shell || '' })).join('\n') + '\n');

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
    counts: { ...counts, base: base.length, droppedHeldOut: dropped, droppedEvalValue, droppedDerived, teacherDropped, boosted: nBoost, anaphora: nAna, tldr: nT, ood: ood.length },
  };
  writeFileSync(join(outDir, 'meta.json'), JSON.stringify(meta, null, 1));
  console.log(`gen_data: ${base.length} base sentences (${dropped} dropped: collide with held-out sets; ${droppedEvalValue} mention an eval-only value; ` +
    `${droppedDerived} derived rows dropped), ` +
    `${counts.cls} classifier rows ${JSON.stringify(counts.bySrc)}, ${counts.tag} tagger sequences, ${nT} tldr rows, ${nAna} anaphora rows`);
}

main();
#!/usr/bin/env node
// Derive weak NL triggers for composer flags from tldr-pages flag descriptions (data/tldr/flags.jsonl,
// CC-BY-4.0). For every (head [sub], flag) in the composer vocabulary keep the stems that are most
// specific to that flag relative to the tool's other flags. Output: model/tldr_triggers.json (small).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { TOOLS } from '../src/compose.js';
import { foldKeepLength } from '../src/slots.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const src = `${ROOT}data/tldr/flags.jsonl`;
if (!existsSync(src)) { console.error('no data/tldr/flags.jsonl (run scripts/tldr_ingest.py)'); process.exit(1); }
const rows = readFileSync(src, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const STOP = new Set(('the a an of in on to for and or with by from all show list display given specific current ' +
  'file files directory directories using use into only each its their this that which when what are is be as ' +
  'dla oraz albo jest lub ktore ktory tylko wszystkie plik pliki katalog katalogu').split(' '));
const stems = (t) => foldKeepLength(t).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/)
  .filter((w) => w.length > 2 && !STOP.has(w)).map((w) => w.slice(0, 5));

const out = {};
for (const [tn, spec] of Object.entries(TOOLS)) {
  const variants = spec.sub ? Object.entries(spec.sub).map(([s, v]) => [`${spec.head} ${s}`, v.flags, s]) : [[spec.head, spec.flags, null]];
  for (const [key, flags, sub] of variants) {
    const mine = rows.filter((r) => r.head === spec.head && (sub ? r.sub === sub : true));
    const vocab = new Set(flags.map((f) => f.flag.split(' ')[0]));
    const byFlag = {};
    const total = {};
    for (const r of mine) {
      const f = r.flag;
      const long = r.long;
      const k = vocab.has(f) ? f : vocab.has(long) ? long : null;
      for (const s of new Set(stems(r.text))) {
        total[s] = (total[s] || 0) + 1;
        if (k) (byFlag[k] ??= {})[s] = (byFlag[k][s] || 0) + 1;
      }
    }
    const entry = {};
    for (const [flag, counts] of Object.entries(byFlag)) {
      const ranked = Object.entries(counts).map(([s, c]) => [s, c / total[s] * Math.log(1 + c)])
        .filter(([, sc]) => sc > 0.3).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([s]) => s);
      if (ranked.length) entry[flag] = ranked;
    }
    if (Object.keys(entry).length) out[key] = entry;
  }
}
writeFileSync(`${ROOT}model/tldr_triggers.json`, JSON.stringify(out));

// "explained" flags: triggers that fire on >= 5% of an intent's own training paraphrases are part of what that
// intent means ("hidden" for hidden_files, "kernel" for dmesg) and must not make the composer replace it.
const { triggeredFlags } = await import('../src/compose.js');
const { FAMILY_OF } = await import('../src/tools.js');
// read the FILTERED corpus written by gen_data.js (held-out collisions, eval-only values and teacher drops removed)
const trainFile = `${ROOT}build/train_rows.jsonl`;
if (!existsSync(trainFile)) { console.error('no build/train_rows.jsonl (run scripts/gen_data.js first)'); process.exit(1); }
const train = readFileSync(trainFile, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const counts = {};
const totals = {};
for (const r of train) {
  totals[r.intent] = (totals[r.intent] || 0) + 1;
  for (const f of new Set(triggeredFlags(r.text, FAMILY_OF[r.intent]))) ((counts[r.intent] ??= {})[f] = (counts[r.intent][f] || 0) + 1);
}
const explained = {};
for (const [intent, c] of Object.entries(counts)) {
  const fl = Object.entries(c).filter(([, n]) => n / totals[intent] >= 0.05).map(([f]) => f).sort();
  if (fl.length) explained[intent] = fl;
}
writeFileSync(`${ROOT}model/compose_explained.json`, JSON.stringify(explained));
console.log(`model/compose_explained.json: ${Object.keys(explained).length} intents, e.g. hidden_files=${JSON.stringify(explained.hidden_files)} dmesg=${JSON.stringify(explained.dmesg)}`);
console.log(`model/tldr_triggers.json: ${Object.keys(out).length} tools, ${Object.values(out).reduce((a, e) => a + Object.keys(e).length, 0)} flags`);
console.log(JSON.stringify(out.ls), JSON.stringify(out['git log']));
// Turn (intent, slots) into a concrete, safely-quoted command for the target shell.
import { BY_ID } from './catalog.js';
import { extractSlots, pickArg, pickDest, pickDir, foldKeepLength } from './slots.js';
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
};

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

/** Resolve the values an intent can use from the generic extraction. */
export function resolveSlots(intent, ex) {
  const v = {};
  const has = (k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
  const textual = ['pattern', 'message', 'text', 'name', 'old', 'branch', 'service', 'container', 'pkg', 'cmd', 'user']
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
  if (ex.ext) v.glob = `*.${ex.ext}`;
  if (ex.urls.length) v.url = ex.urls[0];
  else if (has('url') && ex.hosts.length) v.url = /^\w+:\/\//.test(ex.hosts[0]) ? ex.hosts[0] : `https://${ex.hosts[0]}`;

  if (pathPattern != null) v.pattern = pathPattern;
  for (const k of ['name', 'service', 'container', 'pkg', 'cmd', 'var', 'branch', 'user', 'pattern', 'host', 'target', 'message']) {
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
export function render(template, values, required = [], quote = shQuote) {
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
export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [] } = {}) {
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
      ({ command, missing } = render(tpl, values, required, quote));
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
/bin/bash -lc "node --input-type=module <<'JS'
import fs from 'node:fs';
import {syncBuiltinESMExports} from 'node:module';
import {createHash} from 'node:crypto';
const read=fs.readFileSync, exist=fs.existsSync;
const memory=new Map(), hashes=new Map();
fs.mkdirSync=()=>{};
fs.writeFileSync=(p,data)=>memory.set(String(p),String(data));
fs.createWriteStream=(p)=>{const h=createHash('sha256');hashes.set(String(p),h);return {write:(s)=>h.update(s),end:()=>{}}};
syncBuiltinESMExports();
await import('./scripts/gen_data.js');
for(const [p,h] of hashes){const digest=h.digest('hex'); console.log('generated',p,'matches build',exist(p)?digest===createHash('sha256').update(read(p)).digest('hex'):'no build file');}
console.log('meta',JSON.parse(memory.get('/workspace/tellsh/build/meta.json')).counts);
const {getModel}=await import('./src/model.js'); const m=getModel();console.log('model',m.n_rows,m.n_tag_seqs,m.thresholds);
fs.readFileSync=(p,...args)=>memory.has(String(p))?memory.get(String(p)):read(p,...args);
fs.existsSync=(p)=>memory.has(String(p))||exist(p);
syncBuiltinESMExports();
await import('./scripts/build_triggers.js');
for(const p of ['/workspace/tellsh/model/compose_explained.json','/workspace/tellsh/model/tldr_triggers.json']) console.log('artifact matches',p,memory.get(p)===String(read(p)));
JS" in /workspace/tellsh
exec
/bin/bash -lc "node --input-type=module <<'JS'
import fs from 'node:fs'; import {syncBuiltinESMExports} from 'node:module';
const memory=new Map(); fs.mkdirSync=()=>{}; fs.writeFileSync=(p,d)=>memory.set(String(p),String(d));syncBuiltinESMExports();
await import('./scripts/eval.js');
const generated=memory.get('/workspace/tellsh/EVAL.md');const original=fs.readFileSync('EVAL.md','utf8');
const section=s=>s.match(/<"'!-- eval:start -->['"\\s\\S]*?<"'!-- eval:end -->/)[0];
const a=section(original).split('"'\\n'),b=section(generated).split('\\n');console.log('Report differs:',a.flatMap((s,i)=>s"'!==b[i]?[{line:i,old:s,new:b[i]}]:[]));
console.log('"'summary',memory.get('/workspace/tellsh/build/eval_summary.json'));
JS" in /workspace/tellsh
 succeeded in 9164ms:
gen_data: 11450 base sentences (770 dropped: collide with held-out sets; 3 mention an eval-only value; 453 derived rows dropped), 31534 classifier rows {"intents":26057,"shell":2071,"ctx":540,"tldr":1700,"ood":1166}, 34434 tagger sequences, 1700 tldr rows, 762 anaphora rows
generated /workspace/tellsh/build/cls.jsonl matches build true
generated /workspace/tellsh/build/tag.jsonl matches build true
meta {
  cls: 31534,
  tag: 34434,
  bySrc: { intents: 26057, shell: 2071, ctx: 540, tldr: 1700, ood: 1166 },
  base: 11450,
  droppedHeldOut: 770,
  droppedEvalValue: 3,
  droppedDerived: 453,
  teacherDropped: 18,
  boosted: 3,
  anaphora: 762,
  tldr: 1700,
  ood: 589
}
model 31534 34434 { accept: 0.34, compose: 0.69 }
model/compose_explained.json: 64 intents, e.g. hidden_files=["-type d","-type f"] dmesg=["--since","-k","-n","-p err"]
model/tldr_triggers.json: 19 tools, 58 flags
{"-a":["inclu","hidde","tym","ukryt","permi","owner"],"-l":["forma","long","liste","dlugi","size","rozmi"],"-h":["kib","mib","gib","displ","human","reada"],"-d":["katal"]} {"-p":["histo","parti","diffe"],"--stat":["overv","chang"],"--oneline":["graph","branc","first","line"],"--graph":["graph","branc","first","line"],"-n":["last","numbe","certa","autho"],"--author":["last","numbe","certa","autho"]}
artifact matches /workspace/tellsh/model/compose_explained.json true
artifact matches /workspace/tellsh/model/tldr_triggers.json true

exec
/bin/bash -lc 'git diff 0d87457 -- src/compose.js src/danger.js' in /workspace/tellsh
 succeeded in 0ms:
diff --git a/src/compose.js b/src/compose.js
index 5766219..93ea67f 100644
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
@@ -305,29 +311,58 @@ export function triggeredFlags(query, toolFamily) {
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
+  const sx = spawnSync('bash', ['-n', '-c', cmd], { encoding: 'utf8', timeout: 2000 });
+  if (sx.error) return { ok: true, syntax: 'skipped (bash not found)' };
+  if (sx.status !== 0) return { ok: false, error: `bash -n: ${sx.stderr.trim()}` };
   return { ok: true, syntax: 'bash -n ok' };
 }
 
@@ -339,7 +374,7 @@ export function validateComposed(cmd, toolName, sub) {
  * -> null | { command, tool, sub, flags, risk, warnings, validation, experimental: true }
  */
 export function compose(query, tools, ex, { patternOf, nameOf } = {}) {
-  const fq = fold(query);
+  const fq = foldReq(query);
   let best = null;
   for (const { tool: fam, p } of tools) {
     const tn = FAMILY_TOOL[fam];
@@ -366,15 +401,29 @@ export function compose(query, tools, ex, { patternOf, nameOf } = {}) {
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
@@ -390,15 +439,29 @@ export function compose(query, tools, ex, { patternOf, nameOf } = {}) {
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
@@ -408,24 +471,28 @@ export function compose(query, tools, ex, { patternOf, nameOf } = {}) {
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
@@ -433,31 +500,40 @@ export function compose(query, tools, ex, { patternOf, nameOf } = {}) {
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
diff --git a/src/danger.js b/src/danger.js
index 76ea854..4c90af7 100644
--- a/src/danger.js
+++ b/src/danger.js
@@ -13,9 +13,12 @@ export const maxRisk = (a, b) => (RANK[b] > RANK[a] ? b : a);
 // light tokenizer: simple commands separated by ; & | && || ( ) and newlines, words unquoted
 // (POSIX '…' "…" \x and PowerShell `x). Good enough for danger checks, not a full shell parser.
 
-const QUOTE_CHARS = /['"\u2018\u2019\u201A\u201B\u201C\u201D\u201E]/g;
+// PowerShell also treats the typographic quotes as quote characters (about_Quoting_Rules)
+const PS_SQ = /['\u2018\u2019\u201A\u201B]/;
+const PS_DQ = /["\u201C\u201D\u201E]/;
 
-// winPaths: backslash is never an escape (cmd.exe / PowerShell paths such as "C:\")
+// winPaths: backslash is never an escape (cmd.exe / PowerShell paths such as "C:\"), and the
+// PowerShell typographic quotes ‘…’ “…” quote like ' and "
 export function simpleCommands(cmd, { winPaths = false } = {}) {
   const out = [];
   let words = [];
@@ -23,17 +26,20 @@ export function simpleCommands(cmd, { winPaths = false } = {}) {
   const flushWord = () => { if (w != null) { words.push(w); w = null; } };
   const flushCmd = () => { flushWord(); if (words.length) out.push(words); words = []; };
   const s = String(cmd);
+  const isSq = (c) => (winPaths ? PS_SQ.test(c) : c === "'");
+  const isDq = (c) => (winPaths ? PS_DQ.test(c) : c === '"');
   for (let i = 0; i < s.length; i++) {
     const c = s[i];
-    if (c === "'") {
-      const j = s.indexOf("'", i + 1);
-      const end = j < 0 ? s.length : j;
+    if (isSq(c)) {
+      let j = i + 1;
+      while (j < s.length && !isSq(s[j])) j++;
+      const end = j;
       w = (w ?? '') + s.slice(i + 1, end);
       i = end;
-    } else if (c === '"') {
+    } else if (isDq(c)) {
       let v = '';
       let j = i + 1;
-      for (; j < s.length && s[j] !== '"'; j++) {
+      for (; j < s.length && !isDq(s[j]); j++) {
         if (((!winPaths && s[j] === '\\' && /[$`"\\\n]/.test(s[j + 1])) || s[j] === '`') && j + 1 < s.length) v += s[++j]; else v += s[j];
       }
       w = (w ?? '') + v;
@@ -54,23 +60,79 @@ export function simpleCommands(cmd, { winPaths = false } = {}) {
   return out;
 }
 
-// strip wrappers that run their argument as the command
+// strip wrappers that run their argument as the command (sudo, timeout N, chroot DIR, env A=b, ...)
+// options of each wrapper that take a separate value
+const WRAPPER_OPTARG = {
+  sudo: /^-[ugpCDhrtTUR]$|^--(?:user|group|prompt|close-from|chdir|host|role|type|other-user|command-timeout)$/,
+  doas: /^-[uC]$/,
+  nice: /^-n$|^--adjustment$/,
+  ionice: /^-[cnpPu]$|^--(?:class|classdata|pid|pgid|uid)$/,
+  xargs: /^-[IdEnLPsa]$|^--(?:arg-file|delimiter|max-args|max-procs|max-chars|replace|eof)$/,
+  timeout: /^-[sk]$|^--(?:signal|kill-after)$/,
+  chroot: /^--(?:userspec|groups)$/,
+  stdbuf: /^-[ioe]$|^--(?:input|output|error)$/,
+  env: /^-[uCS]$|^--(?:unset|chdir|split-string)$/,
+  time: /^-[fo]$|^--(?:format|output)$/,
+  exec: /^-a$/,
+  unshare: /^-[SGRwl]$|^--(?:setuid|setgid|root|wd|map-user|map-group|propagation|setgroups)$/,
+  watch: /^-[nq]$|^--(?:interval|equexit)$/,
+  nsenter: /^-[tSGrw]$|^--(?:target|setuid|setgid|root|wd)$/,
+  setpriv: /^--(?:reuid|regid|groups|inh-caps|ambient-caps|bounding-set|securebits|pdeathsig|selinux-label|apparmor-profile)$/,
+  strace: /^-[eoopsuPIEXbS]$/,
+  ltrace: /^-[eoopsuPnS]$/,
+  flock: /^-[wEc]$|^--(?:timeout|wait|conflict-exit-code|command)$/,
+  taskset: /^-[c]$/,
+  'systemd-run': /^-[upEH]$|^--(?:unit|property|setenv|host|machine|description|slice|uid|gid|working-directory|on-calendar|on-active)$/,
+  runuser: /^-[ugl]$|^--(?:user|group|login)$/,
+};
+const WRAPPERS = new Set(['sudo', 'doas', 'command', 'builtin', 'exec', 'nohup', 'time', 'nice', 'ionice', 'then', 'do', 'else', '&', 'busybox', 'toybox', 'xargs', 'timeout', 'chroot', 'stdbuf', 'env', 'setsid', 'unbuffer', 'caffeinate',
+  'unshare', 'watch', 'nsenter', 'setpriv', 'strace', 'ltrace', 'flock', 'taskset', 'systemd-run', 'runuser', 'firejail', 'proot', 'fakeroot']);
 function commandWords(words) {
   let w = words;
   for (;;) {
     while (w.length && /^\w+=/.test(w[0])) w = w.slice(1);
     const h = (w[0] || '').replace(/^.*[\\/]/, '').toLowerCase();
-    if (['sudo', 'doas', 'command', 'builtin', 'exec', 'nohup', 'time', 'nice', 'ionice', 'then', 'do', 'else', '&'].includes(h)) {
+    if (!WRAPPERS.has(h)) return w;
+    w = w.slice(1);
+    const optArg = WRAPPER_OPTARG[h];
+    while (w.length && /^-/.test(w[0])) {
+      const o = w[0];
       w = w.slice(1);
-      while (w.length && /^-/.test(w[0])) w = w.slice(1 + (/^-[ugnc]$/.test(w[0]) ? 1 : 0));
-      continue;
+      if (o === '--') break;
+      if (optArg && optArg.test(o)) w = w.slice(1);
     }
-    if (h === 'xargs') { w = w.slice(1); while (w.length && /^-/.test(w[0])) w = w.slice(1 + (/^-[IdEnLPs]$/.test(w[0]) ? 1 : 0)); continue; }
-    if (h === 'env') { w = w.slice(1); while (w.length && (/^-/.test(w[0]) || /^\w+=/.test(w[0]))) w = w.slice(1); continue; }
-    return w;
+    if (h === 'env') while (w.length && /^\w+=/.test(w[0])) w = w.slice(1);
+    if (h === 'timeout' && w.length) w = w.slice(1); // DURATION
+    if (h === 'chroot' && w.length) w = w.slice(1); // NEWROOT
+    if (h === 'flock' && w.length) w = w.slice(1); // LOCKFILE
+    if (h === 'taskset' && w.length && /^(?:0x)?[\da-f,-]+$/i.test(w[0])) w = w.slice(1); // MASK (without -c: always one)
   }
 }
 
+// Lexically normalise a path for the danger checks: `//`, `/./`, a trailing `/.` and `/..` collapse
+// (`rm -rf /.`, `rm -rf //`, `rm -r /etc/../`), so they are compared as the directory they name.
+// Only absolute, ~ and $HOME paths; a `..` above the home prefix is kept as is.
+export function normTarget(t) {
+  const s = String(t).trim();
+  const m = s.match(/^(\/|~(?=\/|$)|\$\{?HOME\}?(?=\/|$))(.*)$/s);
+  if (!m) return s;
+  const root = m[1] === '/';
+  const parts = [];
+  for (const p of m[2].split('/')) {
+    if (p === '' || p === '.') continue;
+    if (p === '..' && parts.length && parts[parts.length - 1] !== '..') { parts.pop(); continue; }
+    if (p === '..' && root) continue;
+    parts.push(p);
+  }
+  const prefix = root ? '' : m[1];
+  return parts.length ? prefix + '/' + parts.join('/') : (root ? '/' : prefix);
+}
+
+// system directories (and their direct children), user homes and key dot-directories: a recursive
+// delete or a move of any of these is critical
+const SYS_CRIT = /^(?:\/\*?|(?:~|\$\{?HOME\}?)(?:\/\*|\/\.(?:ssh|gnupg|config|local)(?:\/\*)?)?|\/(?:bin|boot|dev|etc|home|lib\w*|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private)(?:\/\*)?|\/(?:bin|boot|etc|home|lib\w*|sbin|usr|System|Users|Library|private)\/[^/*]+(?:\/\*)?|\/var\/(?:lib|db|spool|log|mail|backups)(?:\/\*)?|\/usr\/local\/[^/*]+(?:\/\*)?)$/;
+const sysCrit = (t) => SYS_CRIT.test(normTarget(t));
+
 const POSIX_CRIT_TARGET = /^(?:\/+|\/+\*|~\/*|~\/+\*|\$\{?HOME\}?\/*|\$\{?HOME\}?\/+\*|\*|\.\/*|\.\/+\*|\.\.\/*|\.\.\/+\*|\.\*|\/+(?:bin|boot|dev|etc|home|lib|lib32|lib64|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private)\/*\*?)$/;
 
 function rmCheck(words, hit) {
@@ -97,7 +159,8 @@ function rmCheck(words, hit) {
   hit('high', 'rm deletes files permanently (no trash)');
   if (noPreserve) hit('high', 'rm --no-preserve-root', true);
   if (recursive && force) hit('high', 'rm -rf deletes without asking');
-  if (recursive && targets.some((t) => POSIX_CRIT_TARGET.test(t.trim()) || PS_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive rm on /, ~, * or . — would wipe everything', true);
+  if (recursive && targets.some((t) => POSIX_CRIT_TARGET.test(t.trim()) || PS_CRIT_TARGET.test(t.trim()) || sysCrit(t))) hit('high', 'recursive rm on /, ~, * or . — would wipe everything', true);
+  if (targets.some((t) => /(?:^|[\\/])\.\.(?:[\\/]|$)/.test(t))) hit('high', 'path contains .. (refers to a parent directory)');
 }
 
 // kill [-SIG | -s SIG | -n NUM | --signal SIG] [--] pid...   (pid 1 / -1 = init / every process)
@@ -141,6 +204,119 @@ function cmdDelCheck(words, hit) {
   if (recursive && a.filter((x) => !/^\/\w$/.test(x)).some((t) => CMD_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive delete of a drive root or home', true);
 }
 
+// /, ~, $HOME, system directories, drive roots (not the relative ., .., * that rm -r also treats as critical)
+const critTarget = (t) => { const s = String(t).trim(); return ((POSIX_CRIT_TARGET.test(s) || PS_CRIT_TARGET.test(s)) && !/^(?:\.{1,2}\/*\*?|\*|\.\*|\.\/+\*)$/.test(s)) || sysCrit(s); };
+const SYS_PATH = /^\/+(?:etc|boot|bin|sbin|usr|lib\w*|dev|proc|sys)(?:\/|$)/;
+const NULL_SRC = /^\/dev\/(?:null|zero|u?random)$/;
+const positional = (args) => { const out = []; let opts = true; for (const a of args) { if (opts && a === '--') { opts = false; continue; } if (opts && /^-./.test(a)) continue; out.push(a); } return out; };
+
+// find's own leading options (-H -L -P -O3 -D debugopts) come before the starting points
+const findArgs = (w) => { let a = w.slice(1); for (;;) { if (/^-[HLP]$|^-O\d*$/.test(a[0] || '')) a = a.slice(1); else if (a[0] === '-D') a = a.slice(2); else return a; } };
+
+// find ROOT... -delete / -exec rm: bulk deletion; critical on /, ~, C:\ ...
+function findCheck(w, hit) {
+  const a = findArgs(w);
+  const roots = [];
+  for (const x of a) { if (/^[-(!]/.test(x)) break; roots.push(x); }
+  const del = a.includes('-delete') || a.some((x, i) => /^-(?:exec|execdir|ok|okdir)$/.test(x) && /^(?:\S*\/)?(?:rm|shred|unlink)$/.test(a[i + 1] || ''));
+  if (del && roots.some(critTarget)) hit('high', 'bulk deletion under /, ~ or a drive root', true);
+}
+
+// rsync --delete … DEST: makes DEST identical to the source, deleting everything else in it
+function rsyncCheck(w, hit) {
+  const a = w.slice(1);
+  if (!a.some((x) => /^--(?:delete|del$|remove-source-files)/.test(x))) return;
+  hit('high', 'rsync --delete removes files in the destination');
+  const pos = positional(a);
+  if (pos.length && critTarget(pos[pos.length - 1])) hit('high', 'rsync --delete onto /, ~ or a drive root', true);
+}
+
+// cp/mv/install/ln onto system files; /dev/null (or zero/random) copied over a file destroys it
+function copyCheck(w, hit) {
+  const pos = positional(w.slice(1));
+  if (pos.length < 2) return;
+  const dst = pos[pos.length - 1];
+  const srcs = pos.slice(0, -1);
+  if (SYS_PATH.test(normTarget(dst)) || normTarget(dst) === '/') hit('high', 'overwrites a system file or directory');
+  // moving /etc, /usr, ~ ... away is as destructive as deleting them
+  if (w[0].replace(/^.*[\\/]/, '') === 'mv') {
+    if (srcs.some(critTarget)) hit('high', 'moves a system or home directory away', true);
+    else if (srcs.some((x) => SYS_PATH.test(normTarget(x)))) hit('high', 'moves a system file');
+  }
+  if (srcs.some((s) => NULL_SRC.test(s)) && !/^\/dev\//.test(dst)) hit('high', `overwrites ${dst} with ${srcs.find((s) => NULL_SRC.test(s))}`, SYS_PATH.test(dst));
+}
+
+const LISTERS = /^(?:get-childitem|gci|dir|ls|get-item|gi)$/i;
+// `Get-ChildItem C:\ -Recurse … | Remove-Item`, `find / … | xargs rm`: listing a root, deleting the results
+function pipelineDeleteCheck(text, hit) {
+  for (const stmt of String(text).split(/[;\n]|&&|\|\|/)) {
+    const segs = stmt.split('|').map((p) => commandWords(simpleCommands(p, { winPaths: true })[0] || []));
+    for (let i = 0; i < segs.length - 1; i++) {
+      const w = segs[i];
+      if (!w.length) continue;
+      const head = w[0].replace(/^.*[\\/]/, '').toLowerCase();
+      let rootList = false;
+      if (head === 'find') { const roots = []; for (const x of findArgs(w)) { if (/^[-(!]/.test(x)) break; roots.push(x); } rootList = roots.some(critTarget); }
+      else if (LISTERS.test(head)) {
+        const a = w.slice(1);
+        const rec = a.some((x) => /^-r(?:e(?:c(?:u(?:r(?:s(?:e)?)?)?)?)?)?$/i.test(x)) || head === 'ls' && a.some((x) => /^-[a-zA-Z]*R/.test(x));
+        const targets = [];
+        for (let k = 0; k < a.length; k++) {
+          if (/^-(?:path|literalpath|lp|pspath)$/i.test(a[k])) { if (a[k + 1] != null) targets.push(a[++k]); continue; }
+          if (/^-(?:filter|include|exclude|depth|attributes)$/i.test(a[k])) { k++; continue; }
+          if (!/^-/.test(a[k])) targets.push(a[k]);
+        }
+        rootList = rec && targets.some(critTarget);
+      }
+      if (!rootList) continue;
+      const del = segs.slice(i + 1).some((s) => {
+        const h = (s[0] || '').replace(/^.*[\\/]/, '').toLowerCase();
+        return PS_REMOVE.test(h) || (h === 'xargs' && s.some((x) => /^(?:\S*\/)?(?:rm|shred)$/.test(x)));
+      });
+      if (del) hit('high', 'bulk deletion under /, ~ or a drive root', true);
+    }
+  }
+}
+
+// chmod/chown/chgrp -R on /, ~, * ... (options may come in any order: chmod -R -v 777 ~)
+function permCheck(w, hit) {
+  const a = w.slice(1);
+  if (!a.some((x) => /^-[a-zA-Z]*R[a-zA-Z]*$/.test(x) || x === '--recursive')) return;
+  if (positional(a).slice(1).some(critTarget)) hit('high', 'recursive permission/owner change on /, ~ or *', true);
+}
+
+// tar -x … -C / (or --directory=/): extracting over the root or home directory
+function tarCheck(w, hit) {
+  const a = w.slice(1);
+  const extract = a.some((x) => /^-[a-zA-Z]*x/.test(x) || x === '--extract' || x === '--get') || /^[a-wyzA-Z]*x[a-zA-Z]*$/.test(a[0] || '');
+  if (!extract) return;
+  const dirs = [];
+  a.forEach((x, i) => {
+    if (x === '-C' || x === '--directory') dirs.push(a[i + 1] ?? '');
+    else if (/^-C./.test(x)) dirs.push(x.slice(2));
+    else if (/^--directory=/.test(x)) dirs.push(x.slice(12));
+  });
+  if (dirs.some(critTarget)) hit('high', 'extracts an archive over /, ~ or a drive root', true);
+}
+
+// docker run -v /:/host …: the container gets the host's whole filesystem (read-write unless :ro)
+function dockerCheck(w, hit) {
+  const a = w.slice(1);
+  if (!a.includes('run') && !a.includes('create')) return;
+  const vols = [];
+  a.forEach((x, i) => {
+    if (x === '-v' || x === '--volume' || x === '--mount') vols.push(a[i + 1] || '');
+    else if (/^(?:-v=?|--volume=|--mount=)/.test(x)) vols.push(x.replace(/^(?:-v=?|--volume=|--mount=)/, ''));
+    else if (/^-[a-zA-Z]*v$/.test(x)) vols.push(a[i + 1] || ''); // -itv /:/h
+  });
+  for (const v of vols) {
+    const host = v.split(':')[0];
+    const src = (v.match(/(?:^|,)(?:source|src)=([^,]*)/) || [])[1];
+    const root = (v.includes(':') && normTarget(host) === '/') || (src != null && normTarget(src) === '/');
+    if (root) hit('high', 'mounts the host root filesystem into a container', !/:ro(?:,|$)|(?:^|,)(?:readonly|ro)(?:=true|=1)?(?:,|$)/.test(v));
+  }
+}
+
 // [regex, risk, message, critical]
 const RULES = [
   [/\bmkfs(?:\.\w+)?\b|\bmke2fs\b|\bwipefs\b/, 'high', 'formats a filesystem', true],
@@ -161,6 +337,7 @@ const RULES = [
   [/\bdocker\s+(?:system|volume|image|container|network|builder)\s+prune\b|\bdocker\s+(?:rmi?|container\s+rm|image\s+rm|volume\s+rm)\b/, 'high', 'deletes docker data'],
   [/\b(?:shutdown|reboot|halt|poweroff)\b|\binit\s+[06]\b/, 'high', 'shuts down / reboots the machine'],
   [/\b(?:pkill|killall)\b|\bdocker\s+kill\b/, 'high', 'terminates processes'],
+  [/\b(?:shred|wipe|blkdiscard|truncate)\b[^|;&]*\s['"]?\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk|md|dm-|mapper\/|loop)\w*/, 'high', 'destroys a whole disk device', true],
   [/\b(?:shred|truncate)\b/, 'high', 'destroys file contents'],
   [/\biptables\s+-F\b|\bufw\s+disable\b/, 'high', 'drops firewall rules'],
   [/\bmv\s+\S+\s+\/dev\/null\b/, 'high', 'moves a file into /dev/null (deletes it)', true],
@@ -223,8 +400,15 @@ export function checkDanger(command, baseRisk = 'safe') {
       if (!a.some((x) => /^\/[a-z]$/i.test(x)) && a.some((x) => /^-\w/.test(x))) removeItemCheck(w, hit);
       else cmdDelCheck(w, hit);
     } else if (PS_REMOVE.test(lower)) removeItemCheck(w, hit);
+    else if (head === 'find') findCheck(w, hit);
+    else if (head === 'rsync') rsyncCheck(w, hit);
+    else if (['cp', 'mv', 'install', 'ln'].includes(head)) copyCheck(w, hit);
+    else if (['chmod', 'chown', 'chgrp'].includes(head)) permCheck(w, hit);
+    else if (head === 'tar' || head === 'bsdtar' || head === 'gtar') tarCheck(w, hit);
+    else if (head === 'docker' || head === 'podman') dockerCheck(w, hit);
     if (head === 'git' && w[1] === 'rm') hit('high', 'rm deletes files permanently (no trash)');
   }
+  pipelineDeleteCheck(text, hit);
   for (const c of inner) {
     if (c === command) continue;
     const d = checkDanger(c);

 succeeded in 20412ms:
stage1 tool top1=97.2% top3=99.7% | intent top1=95.6% (EN 95.2% PL 96.1%) answered=98.3% prec=96.5%
per shell: bash 95.6% render 149/149 syntax 148/148 | zsh 95.6% render 149/149 syntax 148/148 | sh 95.7% render 149/149 syntax 148/148 | powershell 95.2% render 146/149 syntax n/a | fish 95.8% render 149/149 syntax n/a | cmd 95.7% render 114/149 syntax n/a
slot F1 merge=96.3 tagger=94.6 regex=95.1 | slot-cases merge 99/99 tagger 90 regex 99
e2e relex exact=85.3% (gold intent 93.9%) | history cmd=97.9% | compose fired=54.9% exact=47.1% acceptable=49.0% anyAcc=52.9% falseFire=11 | OOD rejected=94.6%
wrote EVAL.md (eval section) in 20.0s
Report differs: []
summary {
 "e2e_relex": 0.8533,
 "e2e_relex_gold_intent": 0.9388,
 "history_dev": 0.9792,
 "history_blind": 0.8228,
 "compose_dev_any": 0.5294,
 "compose_dev_composed_acc": 0.4902,
 "compose_blind_any": 0.2241,
 "compose_blind_composed_acc": 0.2241,
 "compose_false_fire": 0.0046,
 "ood_rejected": 0.9457,
 "ood_blind_rejected": 1,
 "blind_contaminated": {
  "rows": 1051,
  "otherEval": 126,
  "trainingSource": 166
 },
 "blind_intent": 0.9882,
 "blind_intent_en": 0.9839,
 "blind_intent_pl": 0.9927,
 "blind_intent_clean": 0.9865,
 "blind_intent_bash": 1,
 "blind_intent_zsh": 0.9877,
 "blind_intent_powershell": 0.976,
 "blind_intent_fish": 0.9683,
 "blind_intent_sh": 0.9697,
 "blind_intent_cmd": 1,
 "blind_intent_disk": 1,
 "blind_e2e": 0.9614,
 "blind_e2e_gold_intent": 0.971,
 "blind_e2e_clean": 0.96,
 "blind_e2e_disk": 0.9565,
 "intent_top1": 0.9564,
 "intent_top1_en": 0.9522,
 "intent_top1_pl": 0.9606,
 "tool_top1": 0.9719,
 "answered": 0.9832,
 "precision_answered": 0.9654,
 "slot_f1": 0.9628,
 "slot_cases": 1,
 "shell_phrased": {
  "bash": 0.9891,
  "zsh": 0.9636,
  "sh": 1,
  "powershell": 0.957,
  "fish": 0.9444,
  "cmd": 0.9867
 },
 "weak": {
  "disk_free": 0.875,
  "empty_files": 0.9375,
  "find_symlinks": 1,
  "broken_symlinks": 1,
  "list_files": 0.875,
  "block_devices": 0.9375,
  "find_process": 0.75,
  "users_logged_in": 0.875,
  "show_path": 0.9375,
  "service_status": 1,
  "git_pull": 0.9375,
  "git_push": 0.9375
 }
}

exec
/bin/bash -lc "sed -n '1,180p' scripts/train.py; sed -n '240,340p' scripts/train.py; cat scripts/lib/cmdnorm.js; cat scripts/compare.js; sed -n '240,430p' scripts/teacher.js" in /workspace/tellsh
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
    step = max(1, len(rows) // 30)
    for r in rows[::step][:30]:
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
// Normalisation of simple commands for the composer eval. Only rewrites that keep the behaviour:
//   option bundling / order for ordinary commands: "ls -ltr" == "ls -l -r -t"; "tar -tzvf a.tgz" == "tar -t -z -v -f a.tgz"
//   attached values: "head -n5 f" == "head -n 5 f" == "head -5 f"
//   quoting: 'a.txt' == a.txt (words are compared after shell unquoting), but a word that the shell expands
//   (unquoted glob *.log, $HOME, $(..)) is kept distinct from the quoted literal ('*.log', '$HOME')
// Kept strict: argument boundaries ('a b' != a b), case (-name != -iname, '*.LOG' != '*.log'),
// find's expression order (filters before -delete matter), and every pipeline stage in order.
import { splitCommand, rawOf, isExpansion, isGlob } from '../../src/shellwords.js';

// literal words compare by value; expanded/globbed words keep a marker so `*.log` != '*.log'
const tok = (w) => (isExpansion(w) ? `\u27e8expand\u27e9${rawOf(w)}` : isGlob(w) ? `\u27e8glob\u27e9${rawOf(w)}` : w);

const VALUE_FLAGS = {
  grep: ['-A', '-B', '-C', '-e', '-m', '-f'],
  head: ['-n', '-c'], tail: ['-n', '-c'], sort: ['-k', '-t'], du: ['-d', '-t'], df: ['-t'],
  tar: ['-f', '-C'], ps: ['-u', '-o', '-p', '-C'], journalctl: ['-u', '-n', '-p'], wc: [], ls: [],
  'git log': ['-n'], 'docker ps': ['-n', '-f'], 'docker images': ['-f'],
};

/** Shell words of a command (unquoted). Kept for callers that only need the word list. */
export function shellWords(s) {
  const r = splitCommand(String(s));
  return r.ok ? r.segments.flatMap((g) => g.words.map(rawOf)) : String(s).split(/\s+/).filter(Boolean);
}

function normSegment(w) {
  const head = w[0] || '';
  let i = 1;
  let sub = '';
  if ((head === 'git' || head === 'docker') && w[1]) { sub = w[1]; i = 2; }
  const key = sub ? `${head} ${sub}` : head;
  if (head === 'find') return { key, flags: [], args: w.slice(1) }; // the expression is order-sensitive: compare verbatim
  const vf = VALUE_FLAGS[key] ?? VALUE_FLAGS[head] ?? [];
  const flags = [];
  const args = [];
  for (; i < w.length; i++) {
    const t = w[i];
    if (t === '--') { const rest = w.slice(i + 1); args.push(...(rest.some((x) => /^-/.test(x)) ? ['--'] : []), ...rest); break; } // `--` is a no-op unless an operand starts with -
    if (/^--[\w-]+=/.test(t)) { flags.push(t); continue; }
    if (/^--/.test(t)) { flags.push(vf.includes(t) ? `${t} ${w[++i] ?? ''}` : t); continue; }
    if (/^-\d+$/.test(t) && ['head', 'tail'].includes(head)) { flags.push(`-n ${t.slice(1)}`); continue; }
    if (/^-[A-Za-z]/.test(t)) {
      const letters = t.slice(1);
      for (let k = 0; k < letters.length; k++) {
        const f = '-' + letters[k];
        if (/\d/.test(letters[k])) { flags.push(f); continue; }
        if (vf.includes(f)) {
          const rest = letters.slice(k + 1);
          flags.push(`${f} ${rest || (w[++i] ?? '')}`);
          break;
        }
        flags.push(f);
      }
      continue;
    }
    if (head === 'ps' && /^[a-z]+$/.test(t) && i === 1) { for (const c of t) flags.push('bsd:' + c); continue; }
    args.push(t);
  }
  return { key, flags: [...new Set(flags)].sort(), args };
}

export function normCmd(cmd) {
  const r = splitCommand(String(cmd).trim(), 'posix', { keepRedirects: true });
  if (!r.ok) return 'raw:' + String(cmd).trim();
  return JSON.stringify(r.segments.map((g) => ({ ...normSegment(g.words.map(tok)), sep: g.sep })));
}

export const sameCmd = (a, b) => normCmd(a) === normCmd(b);
#!/usr/bin/env node
// Before/after table for EVAL.md: v0.2 (code + model at commit 2b5eea8, measured with the v0.3 eval
// harness: data/eval_baseline_v0.2.json) vs the current build (build/eval_summary.json from scripts/eval.js).
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { updateSection } from './report.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const read = (p) => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null);
const B = read(join(ROOT, 'data', 'eval_baseline_v0.2.json'));
const A = read(join(ROOT, 'build', 'eval_summary.json'));
if (!B || !A) { console.log('compare: missing baseline or build/eval_summary.json (run scripts/eval.js)'); process.exit(0); }
const version = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version;
const get = (o, k) => k.split('.').reduce((x, p) => (x == null ? x : x[p]), o);
const f = (v) => (v == null ? 'n/a' : `${(v * 100).toFixed(1)}%`);
const d = (a, b) => (a == null || b == null ? '' : `${a - b >= 0 ? '+' : ''}${((a - b) * 100).toFixed(1)}`);
const ROWS = [
  ['**Blind sets (written for v0.3 before any result; never tuned on)**'],
  ['intent top-1, `data/blind/intents.jsonl` (all shells)', 'blind_intent'],
  ['  … EN / PL', 'blind_intent_en', 'blind_intent_pl'],
  ['  … whole-disk location rows', 'blind_intent_disk'],
  ['end-to-end exact command, `data/blind/e2e.jsonl` (hand-written gold)', 'blind_e2e'],
  ['  … given gold intent', 'blind_e2e_gold_intent'],
  ['  … whole-disk location rows', 'blind_e2e_disk'],
  ['history references exact, `data/blind/history.jsonl`', 'history_blind'],
  ['composer: any answer acceptable, `data/blind/compose.jsonl`', 'compose_blind_any'],
  ['composer: composed & acceptable, blind', 'compose_blind_composed_acc'],
  ['OOD rejected, `data/blind/ood.jsonl`', 'ood_blind_rejected'],
  ['**Held-out sets from v0.2 (not tuned on, but known since v0.2)**'],
  ['intent top-1, `data/eval` (bash)', 'intent_top1'],
  ['  … EN / PL', 'intent_top1_en', 'intent_top1_pl'],
  ['tool top-1, `data/eval`', 'tool_top1'],
  ['answered / precision when answered', 'answered', 'precision_answered'],
  ['end-to-end exact, relexicalised `data/eval` (eval-only values; complete commands only)', 'e2e_relex'],
  ['  … given gold intent', 'e2e_relex_gold_intent'],
  ['slot F1 (`data/slots/gold.jsonl`)', 'slot_f1'],
  ['shell-phrased intent top-1: bash / zsh / PowerShell / cmd', 'shell_phrased.bash', 'shell_phrased.zsh', 'shell_phrased.powershell', 'shell_phrased.cmd'],
  ['OOD rejected, `data/ood_eval.jsonl`', 'ood_rejected'],
  ['composer false fires on `data/eval` (lower is better)', 'compose_false_fire'],
  ['**Development sets (used for tuning since v0.2 — not blind)**'],
  ['history references exact, `data/history/eval.jsonl`', 'history_dev'],
  ['composer: any answer acceptable, `data/compose/eval.jsonl`', 'compose_dev_any'],
  ['**v0.2 weak intents (`data/eval`, n=16 each)**'],
  ...['find_symlinks', 'broken_symlinks', 'find_process', 'service_status', 'git_push', 'git_pull', 'empty_files', 'list_files', 'disk_free', 'block_devices', 'users_logged_in', 'show_path']
    .map((k) => [`  ${k}`, `weak.${k}`]),
];
const lines = [`## v0.2 → v${version}`, '',
  'Both columns are measured with the **same v0.3 eval harness** (stricter: complete commands only, eval-only value pools, quoting-aware comparison); ' +
  'the v0.2 column runs the v0.2 code and model (commit `2b5eea8`) — so v0.2 numbers can differ slightly from the v0.2 EVAL.md.', '',
  `| metric | v0.2 | v${version} | Δ (pt) |`, '|---|---|---|---|'];
for (const [label, ...keys] of ROWS) {
  if (!keys.length) { lines.push(`| ${label} | | | |`); continue; }
  const b = keys.map((k) => get(B, k));
  const a = keys.map((k) => get(A, k));
  lines.push(`| ${label} | ${b.map(f).join(' / ')} | **${a.map(f).join(' / ')}** | ${keys.map((_, i) => d(a[i], b[i])).join(' / ')} |`);
}
updateSection('compare', lines.join('\n'));
console.log('compare: wrote EVAL.md compare section');
  const have = new Set(rows.map((r) => normalize(r.text)));
  const cands = [];
  const seen = new Set();
  for (const rule of CONTRAST_RULES) {
    const src = rows.filter((r) => r.intent === rule.from && (!rule.lang || r.lang === rule.lang));
    let made = 0;
    for (const r of src.sort(() => rng() - 0.5)) {
      if (made >= (rule.max || 40)) break;
      if (!rule.re.test(r.text)) continue;
      const text = r.text.replace(rule.re, rule.to);
      const n = normalize(text);
      if (text === r.text || rule.bad?.test(text) || held.has(text) || have.has(n) || seen.has(n)) continue;
      seen.add(n);
      cands.push({ text, intent: rule.target, lang: r.lang, shell: r.shell, os: r.os, from: r.intent, orig: r.text });
      made++;
    }
  }
  // plus: training rows of confusable intents the current model gets wrong or nearly wrong (margin < 0.2)
  const hardRows = [];
  for (const r of rows) {
    if (!CONFUSABLE[r.intent]) continue;
    const c = cascade(r.text, { model: getOptionsModel(), extras: envFeatures({ shell: r.shell || 'bash', os: r.os || 'linux' }), top: 2 });
    const margin = c.top[0]?.intent === r.intent ? (c.top[0].p - (c.top[1]?.p ?? 0)) : -1;
    if (margin < 0.2) hardRows.push({ ...r, margin });
  }
  const items = cands.map((r) => { const o = intentOptions(r.text, r.intent, r.shell, r.os, rng); if (!o.opts.includes(r.from)) o.opts.push(r.from); return { r, o, qs: { i: intentQ(r.text, r.shell, o.opts) } }; });
  console.log(`teacher mine: ${cands.length} contrastive rewrites from ${CONTRAST_RULES.length} rules; ${hardRows.length} low-margin training rows`);
  const ans = await askPacked(items, +arg('per', 4), 'mine');
  const accepted = [];
  const rejected = [];
  let failed = 0;
  items.forEach((it, j) => {
    const a = ans[j]?.i;
    if (!a) { failed++; return; } // a failed call is no answer, not a rejection
    const p = a?.probabilities?.[it.r.intent] ?? 0;
    const row = { text: it.r.text, intent: it.r.intent, lang: it.r.lang, ...(it.r.shell ? { shell: it.r.shell, os: it.r.os } : {}) };
    if (a && a.choice === it.r.intent && p >= 0.6) accepted.push({ ...row, src: 'hardneg' });
    else rejected.push({ ...row, from: it.r.from, orig: it.r.orig, teacher: a?.choice ?? null, conf: a?.confidence ?? null });
  });
  // low-margin rows are re-weighted (duplicated once) in training if the teacher already confirmed them in verify
  const verified = new Map(readJsonl(join(BDIR, 'verify.jsonl')).map((r) => [normalize(r.text) + '|' + r.intent, r]));
  const boost = hardRows.filter((r) => verified.get(normalize(r.text) + '|' + r.intent)?.t_intent === r.intent)
    .map((r) => ({ text: r.text, intent: r.intent, lang: r.lang, ...(r.shell ? { shell: r.shell, os: r.os } : {}), src: 'hardneg-boost' }));
  writeJsonl(join(ROOT, 'data', 'intents', 'g07_hardneg.jsonl'), accepted);
  writeJsonl(join(TDIR, 'hardneg_rejected.jsonl'), rejected);
  writeJsonl(join(TDIR, 'hardneg_boost.jsonl'), boost);
  const s = { rewrites: cands.length, accepted: accepted.length, rejected: rejected.length, failed, optionsModelSha256: optionsModelSha, lowMarginRows: hardRows.length, boosted: boost.length,
    byPair: accepted.reduce((m, r) => ((m[r.intent] = (m[r.intent] || 0) + 1), m), {}) };
  writeFileSync(join(TDIR, 'hardneg_summary.json'), JSON.stringify(s, null, 1) + '\n');
  console.log(`mine: accepted ${accepted.length}/${cands.length} rewrites; ${boost.length} teacher-confirmed low-margin rows boosted`);
  recordLedger('mine');
}

// ---------------------------------------------------------------------------------------------
function report() {
  const L = existsSync(LEDGER) ? JSON.parse(readFileSync(LEDGER, 'utf8')) : null;
  if (!L) { updateSection('teacher', '## Teacher (TypeSafe Jev)\n\nNot run: no `data/teacher/ledger.json`.'); return; }
  const J = (f) => (existsSync(join(TDIR, f)) ? JSON.parse(readFileSync(join(TDIR, f), 'utf8')) : null);
  const V = J('verify_summary.json');
  const LB = J('label_summary.json');
  const HN = J('hardneg_summary.json');
  const decisions = readJsonl(join(TDIR, 'decisions.jsonl'));
  const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
  const usd = (t) => `$${((t / 1e6) * PRICE_PER_MTOK).toFixed(4)}`;
  const count = (pred) => decisions.filter(pred).length;
  const lines = [];
  lines.push('## Teacher (TypeSafe Jev, build time only)');
  lines.push('');
  lines.push(`All calls to \`${MODEL}\` ($${L.pricePerMtok}/Mtok input, output free), counted by \`scripts/lib/jev.js\` in \`data/teacher/ledger.json\` ` +
    '(every request sent, including failed and retried ones; cache hits are free and not counted). Several rows are packed per call; every row gets its own question(s), and the intent ' +
    'question shows only the request and shell — never our label or a command rendered from it.');
  lines.push('');
  lines.push('| task | calls | failed | input tokens | spend |');
  lines.push('|---|---|---|---|---|');
  for (const [k, t] of Object.entries(L.tasks)) lines.push(`| ${k} | ${t.calls} | ${t.failed} | ${t.inTok} | ${usd(t.inTok)} |`);
  lines.push(`| **total** | **${L.total.calls}** | ${L.total.failed} | ${L.total.inTok} | **$${L.total.usd.toFixed(4)}** |`);
  lines.push('');
  if (V) {
    lines.push(`**(a) Verification of every training row** (${V.rows} rows; ${V.answered} answered): teacher intent = our label for **${pct(V.intentAgree, V.answered)}** ` +
      '(not an independent accuracy: the options always contain our label plus the cascade\'s own top guesses, so this is agreement among 4-6 plausible choices); ' +
      `${V.flagged} rows flagged (teacher prefers another option with confidence ≥ 0.6 and gives our label p < 0.3) → \`data/teacher/review.jsonl\`. ` +
      (V.heldOutSent ? `This run predates the held-out filter: ${V.heldOutSent} of the rows sent were held-out texts or near-duplicates of one (none of them is in the training data of the shipped model; \`teacher.js\` no longer sends them). ` : '') +
      `Risk (asked about the request alone): identical to the catalog risk for ${pct(V.riskAgree, V.answered)} of rows; ${V.riskFlags.length} intents where the teacher rates most rows differently ` +
      `(${V.riskFlags.map((f) => `${f.intent} ${f.ours}→${f.teacher}`).join(', ') || 'none'}).`);
    lines.push('');
    lines.push(`After manual inspection (\`data/teacher/decisions.jsonl\`, ${decisions.length} decisions): ` +
      `**${count((d) => d.text && d.action === 'drop')} rows dropped**, **${count((d) => d.text && d.action === 'relabel')} rows relabelled**, ` +
      `${count((d) => d.text && d.action === 'keep')} flagged rows kept (teacher wrong or request genuinely ambiguous); risk: ` +
      `${count((d) => d.field === 'risk' && d.action === 'relabel')} intents relabelled (${decisions.filter((d) => d.field === 'risk' && d.action === 'relabel').map((d) => `${d.intent} ${d.from}→${d.to}`).join(', ') || 'none'}), ` +
      `${count((d) => d.field === 'risk' && d.action === 'keep')} kept.`);
    lines.push('');
  }
  if (LB) {
    lines.push(`**(b) New paraphrases**: ${LB.candidates} candidates (PL+EN, bash/zsh/sh/PowerShell/fish/cmd, written for v0.3; deduplicated against training and every held-out set) ` +
      `labelled by the teacher; **${LB.accepted} accepted** (teacher picks the proposed intent with p ≥ 0.6; EN ${LB.byLang.en}, PL ${LB.byLang.pl}; ` +
      `shells ${Object.entries(LB.byShell).map(([k, v]) => `${k} ${v}`).join(', ')}), ${LB.rejected} rejected → \`data/teacher/label_rejected.jsonl\`. ` +
      `${LB.modelDisagreedOnAccepted} of the accepted rows were misclassified by the v0.2 model. ` +
      (LB.ood ? `Out-of-domain candidates: ${LB.ood.candidates}, **${LB.ood.accepted} kept** (teacher p(shell request) < 0.3) → \`data/ood_teacher.jsonl\`.` : '') +
      (LB.heldOutLeaksRemoved ? ` ${LB.heldOutLeaksRemoved.accepted} accepted paraphrases and ${LB.heldOutLeaksRemoved.ood} out-of-domain rows were later removed as near-duplicates of held-out texts.` : ''));
    lines.push('');
  }
  if (HN) {
    lines.push(`**(c) Hard negatives**: ${HN.rewrites} contrastive rewrites of training rows across confusable intents (e.g. "symlinks" → "broken symlinks", "push" → "pull", ` +
      `"process" → "service"); **${HN.accepted} confirmed** by the teacher and added (${Object.entries(HN.byPair).map(([k, v]) => `${k} ${v}`).join(', ')}); ` +
      `${HN.boosted} low-margin training rows of confusable intents (confirmed in (a)) are given double weight.` +
      (HN.heldOutLeaksRemoved ? ` ${HN.heldOutLeaksRemoved.rewrites} confirmed rewrites and ${HN.heldOutLeaksRemoved.boosted} boosted rows were later removed because they were ` +
        'held-out texts, near-duplicates of one, or one-word rewrites of one (`scripts/lib/heldout.js`).' : ''));
  }
  updateSection('teacher', lines.join('\n'));
  console.log(`teacher report: ${L.total.calls} calls, ${L.total.inTok} input tokens, $${L.total.usd}`);
}

const cmd = process.argv[2];
const run = { verify, label, mine, report }[cmd];
if (!run) { console.log('usage: node scripts/teacher.js verify|label|mine|report'); process.exit(2); }
if (cmd !== 'report' && !process.env.TYPESAFE_API_KEY) { console.log('teacher: TYPESAFE_API_KEY not set — skipped'); process.exit(0); }
await run();
if (cmd !== 'report') console.log(`teacher ${cmd}: ${stats.calls} network calls (${stats.failed} failed, ${stats.retries} retries), ${stats.cached} cache hits, ${stats.inTok} input tokens ≈ $${((stats.inTok / 1e6) * PRICE_PER_MTOK).toFixed(4)}`);

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
for(const history of [['find \""'$DIR" -type f -iname "*.log" -delete'"'],['find /srv/old -type f -iname \"*.log\" -delete','ls /srv/new'],['rm -r old','ls newdir'],['rm \""'$FILE"'"']]) {
 for(const q of ['same but delete txt files','same but remove all txt files','same but delete log files','same but force','same but recursively','same but only empty files','same but delete empty files']) {
 const r=suggest(q,{history,shell:'bash',os:'linux'}); if(r.risk==='high') console.log(JSON.stringify({history,q,command:r.command,intent:r.intent,missing:r.missing,rule:r.context?.rule}));
 }
}
JS" in /workspace/tellsh
 succeeded in 623ms:
{"history":["find \"$DIR\" -type f -iname \"*.log\" -delete"],"q":"same but delete txt files","command":"find . -type f -iname '*.txt' -delete","intent":"delete_by_ext","missing":[],"rule":"same-but"}
{"history":["find \"$DIR\" -type f -iname \"*.log\" -delete"],"q":"same but remove all txt files","command":"find . -type f -iname '*.txt' -delete","intent":"delete_by_ext","missing":[],"rule":"same-but"}
{"history":["find \"$DIR\" -type f -iname \"*.log\" -delete"],"q":"same but delete log files","command":"find . -type f -iname '*.log' -delete","intent":"delete_by_ext","missing":[],"rule":"same-but"}
{"history":["find /srv/old -type f -iname \"*.log\" -delete","ls /srv/new"],"q":"same but delete txt files","command":"find /srv/old -type f -iname '*.txt' -delete","intent":"delete_by_ext","missing":[],"rule":"same-but"}
{"history":["find /srv/old -type f -iname \"*.log\" -delete","ls /srv/new"],"q":"same but remove all txt files","command":"find /srv/old -type f -iname '*.txt' -delete","intent":"delete_by_ext","missing":[],"rule":"same-but"}
{"history":["find /srv/old -type f -iname \"*.log\" -delete","ls /srv/new"],"q":"same but delete log files","command":"find /srv/old -type f -iname '*.log' -delete","intent":"delete_by_ext","missing":[],"rule":"same-but"}
{"history":["rm -r old","ls newdir"],"q":"same but delete txt files","command":"rm -r old","intent":"delete_dir","missing":[],"rule":"same-but"}
{"history":["rm -r old","ls newdir"],"q":"same but remove all txt files","command":"rm -r old","intent":"delete_dir","missing":[],"rule":"same-but"}
{"history":["rm -r old","ls newdir"],"q":"same but delete log files","command":"rm -r old","intent":"delete_dir","missing":[],"rule":"same-but"}
{"history":["rm -r old","ls newdir"],"q":"same but force","command":"rm -r old","intent":"delete_dir","missing":[],"rule":"same-but"}
{"history":["rm -r old","ls newdir"],"q":"same but recursively","command":"rm -r old","intent":"delete_dir","missing":[],"rule":"same-but"}
{"history":["rm -r old","ls newdir"],"q":"same but only empty files","command":"rm -r old","intent":"delete_dir","missing":[],"rule":"same-but"}
{"history":["rm -r old","ls newdir"],"q":"same but delete empty files","command":"rm -r old","intent":"delete_dir","missing":[],"rule":"same-but"}
{"history":["rm \"$FILE\""],"q":"same but delete txt files","command":"rm <FILE>","intent":"delete_file","missing":["file"],"rule":"same-but"}
{"history":["rm \"$FILE\""],"q":"same but remove all txt files","command":"rm <FILE>","intent":"delete_file","missing":["file"],"rule":"same-but"}
{"history":["rm \"$FILE\""],"q":"same but delete log files","command":"rm <FILE>","intent":"delete_file","missing":["file"],"rule":"same-but"}
{"history":["rm \"$FILE\""],"q":"same but force","command":"rm <FILE>","intent":"delete_file","missing":["file"],"rule":"same-but"}
{"history":["rm \"$FILE\""],"q":"same but recursively","command":"rm <FILE>","intent":"delete_file","missing":["file"],"rule":"same-but"}
{"history":["rm \"$FILE\""],"q":"same but only empty files","command":"rm <FILE>","intent":"delete_file","missing":["file"],"rule":"same-but"}
{"history":["rm \"$FILE\""],"q":"same but delete empty files","command":"rm <FILE>","intent":"delete_file","missing":["file"],"rule":"same-but"}

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
import {buildContext,analyzeCommand} from './src/history.js';
const cases=[
['tellsh list files in /tmp/build','delete them'],['tellsh show files in ~/Downloads','delete them'],
['ls ~/Downloads | sort | grep pdf','delete it'],['find /tmp -name \"*.txt\" | xargs cat','delete them'],
['grep -rl TODO src.js','delete them'],['find /srv/project.v1 -name \"*.log\"','delete them'],
['gci C:\\\\logs -fi *.log','delete it'],['Get-ChildItem -Path C:\\\\logs -Filter *.log','delete it'],
['ls /tmp/build','delete those directories']
];
for(const [h,q] of cases){const r=suggest(q,{history:[h],shell:h.startsWith('gci')||h.startsWith('Get-')?'powershell':'bash',os:h.startsWith('gci')||h.startsWith('Get-')?'win32':'linux'});console.log(JSON.stringify({h,q,command:r.command,missing:r.missing,rule:r.context.rule,note:r.context.note}));}
JS" in /workspace/tellsh
 succeeded in 372ms:
{"h":"tellsh list files in /tmp/build","q":"delete them","command":"rm -r <PATH>","missing":["path"],"rule":"refused","note":"the latest dir in history (/tmp/build) is where a search ran, not what it found; not guessing"}
{"h":"tellsh show files in ~/Downloads","q":"delete them","command":"rm -r <PATH>","missing":["path"],"rule":"refused","note":"the latest dir in history (~/Downloads) is where a search ran, not what it found; not guessing"}
{"h":"ls ~/Downloads | sort | grep pdf","q":"delete it","command":"rm -r ~/Downloads","missing":[],"rule":"pronoun","note":"\"dir\" from history = ~/Downloads"}
{"h":"find /tmp -name \"*.txt\" | xargs cat","q":"delete them","command":"rm -r <PATH>","missing":["path"],"rule":"refused","note":"the latest dir in history (/tmp) is where a search ran, not what it found; not guessing"}
{"h":"grep -rl TODO src.js","q":"delete them","command":"rm src.js","missing":[],"rule":"pronoun","note":"\"file\" from history = src.js"}
{"h":"find /srv/project.v1 -name \"*.log\"","q":"delete them","command":"rm -r <PATH>","missing":["path"],"rule":"refused","note":"the latest dir in history (/srv/project.v1) is where a search ran, not what it found; not guessing"}
{"h":"gci C:\\logs -fi *.log","q":"delete it","command":"Remove-Item -LiteralPath <PATH> -Recurse","missing":["path"],"rule":"refused","note":"the latest dir in history (C:\\logs) is where a search ran, not what it found; not guessing"}
{"h":"Get-ChildItem -Path C:\\logs -Filter *.log","q":"delete it","command":"Remove-Item -LiteralPath <PATH> -Recurse","missing":["path"],"rule":"refused","note":"the latest dir in history (C:\\logs) is where a search ran, not what it found; not guessing"}
{"h":"ls /tmp/build","q":"delete those directories","command":"rm -r <PATH>","missing":["path"],"rule":"refused","note":"\"those\" are the entries listed in /tmp/build, not the directory; not guessing"}

exec
/bin/bash -lc "cat scripts/lib/confusable.js; git diff 0d87457 -- README.md EVAL.md .gitignore package.json scripts/report.js; nl -ba src/history.js | sed -n '840,910p'; nl -ba src/pipeline.js | sed -n '268,302p'; cat data/teacher/decisions.jsonl" in /workspace/tellsh
 succeeded in 0ms:
// Confusable intent groups (from the v0.2 eval confusions and the catalog) and contrastive rewrite rules
// used by scripts/teacher.js: the teacher always sees the confusable intents as options, and `mine`
// rewrites training rows of one intent into candidate rows of its neighbour, which the teacher must confirm.
const GROUPS = [
  ['find_symlinks', 'broken_symlinks', 'create_symlink'],
  ['find_process', 'service_status', 'kill_by_name', 'top_cpu'],
  ['git_push', 'git_pull', 'git_clone', 'git_commit'],
  ['empty_files', 'empty_dirs', 'find_by_ext', 'find_smaller_than'],
  ['list_files', 'list_tree', 'hidden_files', 'find_by_ext'],
  ['disk_free', 'block_devices', 'disk_mounts', 'dir_size'],
  ['users_logged_in', 'last_logins', 'whoami'],
  ['show_path', 'which_cmd', 'env_var_get', 'env_vars'],
  ['file_type', 'file_stat'],
  ['listening_ports', 'process_on_port', 'port_check', 'kill_by_port'],
  ['docker_ps', 'docker_ps_all', 'docker_images', 'docker_stats'],
  ['service_restart', 'service_start', 'service_stop', 'service_enable'],
  ['ip_addresses', 'public_ip', 'routes'],
];
export const CONFUSABLE = {};
for (const g of GROUPS) for (const a of g) CONFUSABLE[a] = [...new Set([...(CONFUSABLE[a] || []), ...g.filter((b) => b !== a)])];

// from -> target: regex on the training text of `from`, replacement making it a `target` request;
// `bad`: rewrites matching it read wrong ("push … from origin") and are not generated
// word boundaries that understand Polish letters (\b does not)
const W = (src, tail = true) => new RegExp(`(?<![\\p{L}\\d_])(?:${src})${tail ? '(?![\\p{L}\\d_])' : ''}`, 'iu');
export const CONTRAST_RULES = [
  // symlinks <-> broken symlinks
  { from: 'find_symlinks', target: 'broken_symlinks', lang: 'en', re: W(String.raw`(symbolic links|symlinks|soft links|links)`), to: 'broken $1' },
  { from: 'find_symlinks', target: 'broken_symlinks', lang: 'pl', re: W(String.raw`(dowiązania symboliczne|dowiazania symboliczne|dowiązania|dowiazania|symlinki|linki symboliczne)`), to: 'zepsute $1' },
  { from: 'broken_symlinks', target: 'find_symlinks', lang: 'en', re: W(String.raw`(broken|dangling|dead|orphaned)\s+`, false), to: '' },
  { from: 'broken_symlinks', target: 'find_symlinks', lang: 'pl', re: W(String.raw`(zepsute|martwe|wiszące|wiszace|uszkodzone|niedziałające|niedzialajace)\s+`, false), to: '' },
  // push <-> pull
  { from: 'git_push', target: 'git_pull', lang: 'en', re: W(String.raw`push`), to: 'pull', bad: /\b(to|onto|into)\b/i },
  { from: 'git_pull', target: 'git_push', lang: 'en', re: W(String.raw`pull`), to: 'push', bad: /\bfrom\b/i },
  { from: 'git_push', target: 'git_pull', lang: 'pl', re: W(String.raw`(wypchnij|wypchnąć|wypchnac|wyślij|wyslij|pushnij)`), to: 'ściągnij', bad: /(?<![\p{L}])(na|do)(?![\p{L}])/iu },
  { from: 'git_pull', target: 'git_push', lang: 'pl', re: W(String.raw`(ściągnij|sciagnij|pobierz|zaciągnij|zaciagnij|pullnij)`), to: 'wypchnij', bad: /(?<![\p{L}])(z|ze)(?![\p{L}])/iu },
  // process <-> service
  { from: 'find_process', target: 'service_status', lang: 'en', re: W(String.raw`process(es)?`), to: 'service' },
  { from: 'service_status', target: 'find_process', lang: 'en', re: W(String.raw`(service|daemon|unit)`), to: 'process' },
  { from: 'find_process', target: 'service_status', lang: 'pl', re: W(String.raw`proces(y|u|ów)?`), to: 'usługa' },
  { from: 'service_status', target: 'find_process', lang: 'pl', re: W(String.raw`(usługa|usługi|usługę|serwis)`), to: 'proces' },
  // empty files <-> empty dirs
  { from: 'empty_files', target: 'empty_dirs', lang: 'en', re: W(String.raw`files`), to: 'directories' },
  { from: 'empty_dirs', target: 'empty_files', lang: 'en', re: W(String.raw`(directories|folders|dirs)`), to: 'files' },
  { from: 'empty_files', target: 'empty_dirs', lang: 'pl', re: W(String.raw`pliki`), to: 'katalogi' },
  { from: 'empty_dirs', target: 'empty_files', lang: 'pl', re: W(String.raw`(katalogi|foldery)`), to: 'pliki' },
  // disk free <-> block devices
  { from: 'disk_free', target: 'block_devices', lang: 'en', re: W(String.raw`(free|available) (disk )?space`), to: 'disks and partitions' },
  { from: 'block_devices', target: 'disk_free', lang: 'en', re: W(String.raw`(block devices|disks|drives|partitions)`), to: 'free space on the disks' },
  // logged in <-> last logins
  { from: 'users_logged_in', target: 'last_logins', lang: 'en', re: W(String.raw`(is|are) (currently )?logged in`), to: 'logged in recently' },
  { from: 'users_logged_in', target: 'last_logins', lang: 'pl', re: W(String.raw`jest (teraz )?zalogowany`), to: 'się ostatnio logował' },
  // PATH <-> which
  { from: 'which_cmd', target: 'show_path', lang: 'en', re: W(String.raw`where is ([\w.-]+)( installed)?`), to: 'what directories are in my PATH' },
  // list files <-> hidden files
  { from: 'list_files', target: 'hidden_files', lang: 'en', re: W(String.raw`files`), to: 'hidden files' },
  { from: 'list_files', target: 'hidden_files', lang: 'pl', re: W(String.raw`pliki`), to: 'ukryte pliki' },
  // docker ps <-> ps -a
  { from: 'docker_ps', target: 'docker_ps_all', lang: 'en', re: W(String.raw`(running )?containers`), to: 'all containers, including stopped ones' },
  { from: 'docker_ps', target: 'docker_ps_all', lang: 'pl', re: W(String.raw`(działające |dzialajace )?kontenery`), to: 'wszystkie kontenery, także zatrzymane' },
  // restart <-> stop
  { from: 'service_restart', target: 'service_stop', lang: 'en', re: W(String.raw`restart`), to: 'stop' },
  { from: 'service_stop', target: 'service_restart', lang: 'en', re: W(String.raw`stop`), to: 'restart' },
  { from: 'service_restart', target: 'service_stop', lang: 'pl', re: W(String.raw`zrestartuj`), to: 'zatrzymaj' },
  { from: 'service_stop', target: 'service_restart', lang: 'pl', re: W(String.raw`zatrzymaj`), to: 'zrestartuj' },
];
diff --git a/.gitignore b/.gitignore
index 3bf14f6..16b4aa2 100644
--- a/.gitignore
+++ b/.gitignore
@@ -5,3 +5,4 @@ __pycache__/
 .DS_Store
 data/external/
 build/
+.claude/
diff --git a/EVAL.md b/EVAL.md
index 2f3d8d1..1f20a26 100644
--- a/EVAL.md
+++ b/EVAL.md
@@ -1,18 +1,24 @@
-# tellsh evaluation (v0.2)
-
-Generated by `npm run eval`, `npm run bench` and `node scripts/teacher.js` (teacher section).
-
-**Post-review update (2026-10-10).** Two code reviews of v0.2 found command-injection bugs (optional template
-segments were substituted twice; PowerShell typographic quotes were not escaped), danger-checker gaps, history
-references that could pick the wrong or a stale target, and an over-lenient eval comparison. All were fixed with
-regression tests (`test/regressions.test.js`). The model was **not** retrained; the classifier numbers are unchanged.
-What moved: composer "any answer acceptable" 33.3% → 31.4% (stricter command comparison), e2e EN given gold intent
-91.2% → 91.4%; history references stay at 97.9% with two gold commands updated for `kill_by_port -sTCP:LISTEN`.
+# tellsh evaluation (v0.3.0)
+
+Generated by `npm run eval`, `npm run bench` and `node scripts/teacher.js report` (teacher section).
+
+**v0.3.0 (2026-10-10), after three review rounds.** The model is **retrained** on the v0.3 data (31534 classifier
+rows, 34434 tagged sequences; teacher-labelled paraphrases and hard negatives; every held-out text, its near-duplicates
+up to filler words and word order, and its contrastive rewrites excluded at emission time), and
+`model/compose_explained.json` is rebuilt from the same rows. Runtime fixes from the reviews (all with regression
+tests in `test/regressions*.test.js`): refused or ambiguous history references and paths with trailing punctuation
+stay placeholders and never fall back to a catalog default (`find . … -delete`); "same for X" never replays an older
+changing command or a cut path; a searched, filtered or (for "them") listed directory is never a deletion target;
+typed references follow recency; quoted `'~/x'` from history stays literal; more danger-checker wrappers. Against the
+v0.2 numbers: end-to-end 82.8% → **85.3%**, composer "any answer acceptable" 31.4% → **52.9%**, out-of-domain
+rejection 92.4% → **94.6%**; history references unchanged at 97.9% (dev set). cmd renders 114/149 intents natively
+(117 in v0.2: a value starting with `/` is now refused where cmd.exe would read it as a switch, so the eval rows
+for `dir_size`, `chown` and `create_symlink`, which use POSIX paths like `/var/www`, report a gap).
 
 <!-- eval:start -->
 ## Model
 
-`model/model.bin` **2.71 MB** (int8 weights, TSH2): stage 1 tool model 20000 rows × 55 classes (54 tool families + `__none__`), 30 stage-2 intent models (469250 weights), tagger 24000 rows × 27 BIO labels. Trained 2026-10-10 on 25562 classifier rows and 28232 tagged sequences. Thresholds: accept **0.365** (cascade score), compose **0.69** (stage-1 tool p). Internal holdout during training: tool top-1 92.5%, top-3 98.3%, intent 85.5%.
+`model/model.bin` **2.71 MB** (int8 weights, TSH2): stage 1 tool model 20000 rows × 55 classes (54 tool families + `__none__`), 30 stage-2 intent models (469250 weights), tagger 24000 rows × 27 BIO labels. Trained 2026-10-10 on 31534 classifier rows and 34434 tagged sequences. Thresholds: accept **0.34** (cascade score), compose **0.69** (stage-1 tool p). Internal holdout during training: tool top-1 92.3%, top-3 98.7%, intent 87.9%.
 
 ## 1. Cascade accuracy per stage (held-out `data/eval`, shell=bash os=linux)
 
@@ -21,12 +27,12 @@ Stage 1 = tool family (top-1 / top-3); stage 2 = intent after p(tool)·p(intent|
 
 | split | n | tool top-1 | tool top-3 | intent top-1 | intent top-3 | answered (p ≥ thr) | precision when answered |
 |---|---|---|---|---|---|---|---|
-| ALL | 2384 | 96.9% | 99.7% | 95.2% | 99.2% | 97.7% | 96.3% |
-| EN | 1192 | 97.2% | 99.8% | 95.3% | 99.2% | 97.8% | 96.5% |
-| PL | 1192 | 96.5% | 99.7% | 95.1% | 99.3% | 97.5% | 96.0% |
+| ALL | 2384 | 97.2% | 99.7% | 95.6% | 99.4% | 98.3% | 96.5% |
+| EN | 1192 | 97.1% | 99.7% | 95.2% | 99.2% | 98.2% | 96.3% |
+| PL | 1192 | 97.3% | 99.7% | 96.1% | 99.6% | 98.5% | 96.8% |
 
-Weakest intents: find_symlinks 69% (n=16), find_process 75% (n=16), git_push 75% (n=16), empty_files 81% (n=16), list_files 81% (n=16), users_logged_in 81% (n=16), show_path 81% (n=16), disk_free 88% (n=16).
-Top confusions: find_symlinks → broken_symlinks ×4, find_process → service_status ×4, git_push → git_pull ×3, disk_free → block_devices ×2, empty_files → find_by_ext ×2, list_files → find_by_ext ×2, list_tree → hidden_files ×2, file_type → docker_images ×2.
+Weakest intents: find_process 75% (n=16), list_archive 81% (n=16), git_diff_staged 81% (n=16), docker_logs 81% (n=16), docker_stop 81% (n=16), disk_free 88% (n=16), find_by_name 88% (n=16), list_files 88% (n=16).
+Top confusions: find_process → service_status ×4, docker_stop → service_stop ×3, disk_free → block_devices ×2, list_tree → hidden_files ×2, listening_ports → established_connections ×2, gpu_info → package_installed ×2, git_diff → git_diff_staged ×2, git_stash_pop → git_stash ×2.
 
 ## 2. Per shell
 
@@ -36,12 +42,12 @@ plus `data/shell/eval.jsonl`: requests phrased by users of that shell (cmdlet na
 
 | shell (os) | data/eval intent top-1 | shell-phrased n | shell-phrased intent top-1 (EN / PL) | rendered | syntax ok |
 |---|---|---|---|---|---|
-| bash (linux) | 95.2% | 92 | 98.9% (98.0% / 100.0%) | 149/149 | 148/148 |
-| zsh (darwin, BSD) | 95.5% | 55 | 96.4% (96.4% / 96.3%) | 149/149 | 148/148 |
-| sh (linux) | 95.0% | 3 | 100.0% (100.0% / 100.0%) | 149/149 | 148/148 |
-| powershell (win32) | 94.8% | 93 | 96.8% (97.5% / 96.2%) | 146/149 | n/a (not installed) |
-| fish (linux) | 95.1% | 18 | 94.4% (90.0% / 100.0%) | 149/149 | n/a (not installed) |
-| cmd (win32) | 94.6% | 75 | 96.0% (100.0% / 92.5%) | 117/149 | n/a (not installed) |
+| bash (linux) | 95.6% | 92 | 98.9% (98.0% / 100.0%) | 149/149 | 148/148 |
+| zsh (darwin, BSD) | 95.6% | 55 | 96.4% (96.4% / 96.3%) | 149/149 | 148/148 |
+| sh (linux) | 95.7% | 3 | 100.0% (100.0% / 100.0%) | 149/149 | 148/148 |
+| powershell (win32) | 95.2% | 93 | 95.7% (95.0% / 96.2%) | 146/149 | n/a (not installed) |
+| fish (linux) | 95.8% | 18 | 94.4% (90.0% / 100.0%) | 149/149 | n/a (not installed) |
+| cmd (win32) | 95.7% | 75 | 98.7% (100.0% / 97.5%) | 114/149 | n/a (not installed) |
 
 ## 3. Slot filling (stage 3)
 
@@ -49,26 +55,28 @@ plus `data/shell/eval.jsonl`: requests phrased by users of that shell (cmdlet na
 
 | slot method | precision | recall | F1 | F1 EN | F1 PL |
 |---|---|---|---|---|---|
-| BIO tagger only | 98.9% | 90.0% | 94.2% | 95.0% | 93.4% |
-| regex only (v0.1) | 94.5% | 94.5% | 94.5% | 94.3% | 94.7% |
-| **tagger + regex fallback (shipped)** | 94.9% | 96.4% | 95.7% | 95.9% | 95.4% |
+| BIO tagger only | 99.3% | 90.3% | 94.6% | 95.0% | 94.1% |
+| regex only (v0.1) | 95.7% | 94.5% | 95.1% | 94.6% | 95.7% |
+| **tagger + regex fallback (shipped)** | 96.1% | 96.4% | 96.3% | 96.2% | 96.4% |
 
-Per type F1 (tagger only / regex only / merged): PATH 97/97/98, SIZE 100/100/100, EXT 85/90/90, PORT 100/100/100, TIME 100/100/100, NAME 93/91/97, NUM 100/87/87, URL 100/94/94, HOST 80/88/88, BRANCH 93/100/100, PATTERN 77/90/90, REPL 67/100/100, USER 86/100/100, MODE 86/100/100, MSG 100/100/100, VAR 100/100/100, PID 100/100/100, TEXT 75/75/75.
+Per type F1 (tagger only / regex only / merged): PATH 97/97/98, SIZE 100/100/100, EXT 85/90/90, PORT 100/100/100, TIME 100/100/100, NAME 93/91/97, NUM 100/93/93, URL 100/94/94, HOST 88/88/88, BRANCH 93/100/100, PATTERN 69/90/83, REPL 67/100/100, USER 86/100/100, MODE 86/100/100, MSG 100/100/100, VAR 100/100/100, PID 100/100/100, TEXT 100/75/100.
 
 ## 4. End-to-end exact command (bash, linux)
 
 * `test/slot-cases.js` (99 hand-written request → command pairs, gold intent): **99/99** shipped (tagger + regex fallback), 90/99 tagger only, 99/99 regex only.
-* Relexicalised `data/eval` (1326 requests that contain slot values; every value replaced from a *held-out* value pool never used in training; gold command rendered from the inserted spans; full pipeline incl. classification):
+* Relexicalised `data/eval` (1275 requests that contain slot values; values replaced from an eval-only pool that never occurs in any training text (`gen_data.js` drops training rows mentioning one), numbers from ranges disjoint from the training relexicalisation; 63/1593 spans could not be replaced and keep their original value (named locations like "Pobrane", extension aliases like "python"). Gold command rendered by the production code from the inserted spans, so this measures classification + slot recovery, not template correctness (the hand-written `data/blind/e2e.jsonl` below does). A prediction counts only when complete (no placeholder, no missing slot); 51 rows whose gold would be incomplete are excluded):
 
 | split | n | exact command (full pipeline) | exact command given gold intent |
 |---|---|---|---|
-| ALL | 1326 | 82.8% | 92.2% |
-| EN | 674 | 82.2% | 91.4% |
-| PL | 652 | 83.4% | 93.1% |
+| ALL | 1275 | 85.3% | 93.9% |
+| EN | 650 | 83.8% | 93.2% |
+| PL | 625 | 86.9% | 94.6% |
 
-## 5. History references (`data/history/eval.jsonl`)
+## 5. History references
 
-"delete it" / "usuń to", "same for /var" / "to samo dla /var", "logs of that container" / "logi tego kontenera", "kill it", … with the last shell-history lines given (raw commands and earlier `tellsh` queries).
+"delete it" / "usuń to", "same for /var" / "to samo dla /var", "logs of that container" / "logi tego kontenera", "kill it", … with the last shell-history lines given (raw commands and earlier `tellsh` queries). Some rows expect a placeholder: the right answer is to refuse a stale, ambiguous or missing reference.
+
+**Development set** `data/history/eval.jsonl` (48 rows). Written independently of the rules but then used while developing them (v0.2: first run 60.4% exact), so it is **not a blind score**:
 
 | split | n | intent | exact command | exact command without history |
 |---|---|---|---|---|
@@ -76,27 +84,70 @@ Per type F1 (tagger only / regex only / merged): PATH 97/97/98, SIZE 100/100/100
 | EN | 24 | 100.0% | 95.8% | 0.0% |
 | PL | 24 | 100.0% | 100.0% | 0.0% |
 
-*Development note:* this set was written independently of the rules, but it was then used while developing them: the first (blind) run scored **60.4%** exact; the failures led to general fixes (more Polish pronoun forms, `ps -p`/`wget` entities, blame/extract verbs, "same but …", implicit required-slot fill). The number above is therefore not a blind score.
+**Blind set** `data/blind/history.jsonl` (79 rows, written for v0.3 by a separate author before any result was seen, never used for tuning):
+
+| split | n | intent | exact command | exact command without history |
+|---|---|---|---|---|
+| ALL | 79 | 93.7% | 82.3% | 13.9% |
+| EN | 40 | 95.0% | 85.0% | 12.5% |
+| PL | 39 | 92.3% | 79.5% | 15.4% |
 
-*Review fixes:* history lines are now split with a shell-aware tokenizer (`a\ b.txt`, quoted `;`/`|`, PowerShell `''`/backtick escapes, native cmdlets such as `Get-Content -LiteralPath`), and a reference whose latest value depends on the shell state (`$F`, `*.txt`, unparseable or unknown-command lines) is refused (placeholder) instead of falling back to an older value. Two gold commands (`kill_by_port`) were updated for the `-sTCP:LISTEN` fix; no other row changed.
+## 6. Second pass: experimental composer
 
-## 6. Second pass: experimental composer (`data/compose/eval.jsonl`)
+Out-of-catalogue requests (a tool with a flag combination that no catalog template has). Commands are compared after shell unquoting with only behaviour-preserving normalisation: option bundling/order for ordinary commands (`ls -ltr` = `ls -l -t -r`, `head -n5` = `head -5`); argument boundaries, case (`-name` ≠ `-iname`), quoting that changes expansion (`*.log` ≠ `'*.log'`), find's expression order, redirections and pipeline separators must match. *exact* = the gold command, *acceptable* = gold or a listed alternative.
 
-51 out-of-catalogue requests (a tool with a flag combination that no catalog template has), written independently of the composer vocabulary. Commands are compared after shell unquoting with only behaviour-preserving normalisation: option bundling/order for ordinary commands (`ls -ltr` = `ls -l -t -r`, `head -n5` = `head -5`); argument boundaries, case (`-name` ≠ `-iname`), find's expression order, redirections and pipeline separators must match. *exact* = the gold command, *acceptable* = gold or a listed alternative. (Before the review the comparison lowercased find predicates and mapped `-iname` to `-name`; that credited one catalog answer: "any answer acceptable" was 33.3%, now 31.4%.)
+**Development set** `data/compose/eval.jsonl` (51 rows; used while developing the composer since v0.2 — not blind):
 
 | split | n | composer fired | composed exact | composed acceptable | any answer acceptable (catalog or composed) |
 |---|---|---|---|---|---|
-| ALL | 51 | 43.1% | 27.5% | 29.4% | 31.4% |
-| EN | 26 | 50.0% | 30.8% | 30.8% | 34.6% |
-| PL | 25 | 36.0% | 24.0% | 28.0% | 28.0% |
+| ALL | 51 | 54.9% | 47.1% | 49.0% | 52.9% |
+| EN | 26 | 57.7% | 46.2% | 46.2% | 53.8% |
+| PL | 25 | 52.0% | 48.0% | 52.0% | 52.0% |
 
-*Development note:* the flag vocabulary was written before looking at this set; the first (blind) run fired on 11.8% and was acceptable on **3.9%**. After inspecting the failures, general fixes were made (firing on unexplained modifiers, value flags, tar compression from the archive name, the data-driven explained-flag table) — the numbers above include them.
+**Blind set** `data/blind/compose.jsonl` (58 rows, written for v0.3 by a separate author without seeing the composer vocabulary or any result):
 
-False fires on in-catalogue requests (`data/eval`, composer replaced a catalog answer): **0.7%** (17/2384).
+| split | n | composer fired | composed exact | composed acceptable | any answer acceptable (catalog or composed) |
+|---|---|---|---|---|---|
+| ALL | 58 | 46.6% | 19.0% | 22.4% | 22.4% |
+| EN | 30 | 53.3% | 23.3% | 26.7% | 26.7% |
+| PL | 28 | 39.3% | 14.3% | 17.9% | 17.9% |
 
-## 7. Out-of-domain rejection (`data/ood_eval.jsonl`)
+False fires on in-catalogue requests (`data/eval`, composer replaced a catalog answer): **0.5%** (11/2384).
 
-**92.4%** (85/92) answered "I don't understand" (EN 95.7%, PL 89.1%), including the composer path.
+## 7. Out-of-domain rejection
+
+`data/ood_eval.jsonl`: **94.6%** (87/92) answered "I don't understand" (EN 95.7%, PL 93.5%), including the composer path.
+Blind `data/blind/ood.jsonl`: **100.0%** (64/64; EN 100.0%, PL 100.0%).
+
+## 8. Blind sets (v0.3)
+
+Written for v0.3 from the catalog descriptions/templates and excluded from training (`gen_data.js`, including near-duplicates) and from tuning. They are **not fully clean**: 126 of 1051 intent/e2e rows repeat a request from another eval set and 166 repeat (exactly, or up to filler words and word order) a row of a training source file, most of them rows the v0.2 model was trained on. Every table therefore also reports the **clean** subset without those rows.
+
+**Intent** `data/blind/intents.jsonl` (844 rows, each with its own shell/OS context; extra weight on confusable pairs):
+
+| split | n | tool top-1 | tool top-3 | intent top-1 | intent top-3 | answered (p ≥ thr) | precision when answered |
+|---|---|---|---|---|---|---|---|
+| ALL | 844 | 98.8% | 100.0% | 98.8% | 99.8% | 99.4% | 99.0% |
+| EN | 434 | 98.6% | 100.0% | 98.4% | 99.8% | 99.3% | 98.6% |
+| PL | 410 | 99.0% | 100.0% | 99.3% | 99.8% | 99.5% | 99.5% |
+| CLEAN | 666 | 98.9% | 100.0% | 98.6% | 99.7% | 99.2% | 98.9% |
+
+Per shell (intent top-1): bash 100.0% (n=341), zsh 98.8% (n=163), powershell 97.6% (n=167), fish 96.8% (n=63), sh 97.0% (n=66), cmd 100.0% (n=44).
+
+Weakest intents (n ≥ 4): whoami 83% (n=6), env_var_get 83% (n=6), tail_file 86% (n=7), list_files 88% (n=17), broken_symlinks 93% (n=14), list_tree 93% (n=14), block_devices 93% (n=15), disk_free 94% (n=18).
+Top confusions: disk_free → disk_mounts ×1, broken_symlinks → find_symlinks ×1, list_files → count_files ×1, list_tree → largest_dirs ×1, block_devices → disk_free ×1, kill_force → kill_by_name ×1, whoami → users_logged_in ×1, list_files → find_by_ext ×1.
+Rows that name the whole disk as location ("na całym dysku", "entire drive", …): intent top-1 100.0% (n=57).
+
+**End-to-end** `data/blind/e2e.jsonl` (207 requests with a hand-written complete bash command; compared with the same normalisation as §6):
+
+| split | n | exact command (full pipeline) | exact command given gold intent |
+|---|---|---|---|
+| ALL | 207 | 96.1% | 97.1% |
+| EN | 112 | 96.4% | 97.3% |
+| PL | 95 | 95.8% | 96.8% |
+| CLEAN | 175 | 96.0% | 97.1% |
+
+Whole-disk location rows: 22/23 exact.
 <!-- eval:end -->
 
 <!-- bench:start -->
@@ -106,36 +157,34 @@ Machine: Intel(R) Xeon(R) Processor, Node v20.19.2, linux; CPU affinity: `0` (ru
 
 | measurement | p50 | p95 | runs |
 |---|---|---|---|
-| bare `node -e 0` startup (baseline) | 104.2 ms | 124.6 ms | 10 |
-| **cold**: `node bin/tellsh.js --dry-run --json --shell bash <query>` (new process, model load, full pipeline) | **158.7 ms** | **189.7 ms** | 40 |
-| model load (in-process, one-off) | 4.6 ms | – | 1 |
-| **warm**: full cascade + tagger + render (bash, composer off) | **0.305 ms** | **2.2 ms** | 2000 |
-| warm, incl. composer modifier check (shipped default) | 0.502 ms | 6.4 ms | 2000 |
-| warm, PowerShell rendering | 0.263 ms | 0.532 ms | 2000 |
-| warm, with 5 history lines (context build + reference rules) | 0.996 ms | 6.7 ms | 2000 |
+| bare `node -e 0` startup (baseline) | 71.9 ms | 111.3 ms | 10 |
+| **cold**: `node bin/tellsh.js --dry-run --json --shell bash <query>` (new process, model load, full pipeline) | **157.9 ms** | **186.9 ms** | 40 |
+| model load (in-process, one-off) | 4.1 ms | – | 1 |
+| **warm**: full cascade + tagger + render (bash, composer off) | **0.302 ms** | **2.1 ms** | 2000 |
+| warm, incl. composer modifier check (shipped default) | 0.512 ms | 6.2 ms | 2000 |
+| warm, PowerShell rendering | 0.279 ms | 0.610 ms | 2000 |
+| warm, with 5 history lines (context build + reference rules) | 1.1 ms | 7.7 ms | 2000 |
 
 The composer runs `bash -n` (a subprocess, ~2 ms) only when it actually returns a composed command.
 <!-- bench:end -->
 
 <!-- teacher:start -->
-## Teacher verification (TypeSafe Jev, build time only)
-
-Sampled **300** training rows (stratified over intents, EN+PL, incl. shell-phrased rows) and made **300 API calls**
-(0 failed) to `jev-latest`: 164275 input tokens ≈ **$0.0069**
-(at $0.042/Mtok input, output free). Each call asked: intent (choice among the gold label and our two closest
-alternatives), "the rendered command does what is asked" (noul), risk (choice) and up to 3 silver slot spans (noul).
-
-| check | agreement |
-|---|---|
-| intent label = teacher choice | 100.0% |
-| command judged correct (noul ≥ 0.5) | 93.3% |
-| risk level identical | 86.7% (teacher rated higher with conf ≥ 0.5: 28) |
-| silver slot spans accepted (noul ≥ 0.5) | 93.4% of 181 |
-
-40 rows flagged → `data/teacher/review.jsonl`. After manual inspection (`data/teacher/decisions.jsonl`):
-* intent labels: no disagreement, **0 training rows dropped or relabelled**;
-* risk: **10 intents relabelled safe → medium** (extract_zip, extract_targz, compress_targz, compress_zip, git_stash, git_stash_pop, git_pull, git_new_branch, git_switch_branch, git_clone) — they overwrite files or change the git working tree;
-  4 kept safe where the teacher was stricter than our definition (touch_file, mkdir, git_init, git_add_all);
-* "command wrong" flags were slot-extraction bugs, not label errors (Windows `C:\` paths, `plik X.b64` for base64, Polish inflection
-  `javy` → `java`, filler words taken as values); fixed in `src/slots.js` / `src/tagger.js` (6 rows kept).
+## Teacher (TypeSafe Jev, build time only)
+
+All calls to `jev-latest` ($0.042/Mtok input, output free), counted by `scripts/lib/jev.js` in `data/teacher/ledger.json` (every request sent, including failed and retried ones; cache hits are free and not counted). Several rows are packed per call; every row gets its own question(s), and the intent question shows only the request and shell — never our label or a command rendered from it.
+
+| task | calls | failed | input tokens | spend |
+|---|---|---|---|---|
+| verify | 3292 | 0 | 3641360 | $0.1529 |
+| label | 611 | 0 | 519493 | $0.0218 |
+| mine | 279 | 0 | 259891 | $0.0109 |
+| **total** | **4182** | 0 | 4420744 | **$0.1857** |
+
+**(a) Verification of every training row** (9875 rows; 9875 answered): teacher intent = our label for **97.6%** (not an independent accuracy: the options always contain our label plus the cascade's own top guesses, so this is agreement among 4-6 plausible choices); 112 rows flagged (teacher prefers another option with confidence ≥ 0.6 and gives our label p < 0.3) → `data/teacher/review.jsonl`. This run predates the held-out filter: 715 of the rows sent were held-out texts or near-duplicates of one (none of them is in the training data of the shipped model; `teacher.js` no longer sends them). Risk (asked about the request alone): identical to the catalog risk for 94.4% of rows; 4 intents where the teacher rates most rows differently (mkdir safe→medium, touch_file safe→medium, git_add_all safe→medium, git_init safe→medium).
+
+After manual inspection (`data/teacher/decisions.jsonl`, 132 decisions): **20 rows dropped**, **2 rows relabelled**, 96 flagged rows kept (teacher wrong or request genuinely ambiguous); risk: 10 intents relabelled (extract_zip safe→medium, extract_targz safe→medium, compress_targz safe→medium, compress_zip safe→medium, git_stash safe→medium, git_stash_pop safe→medium, git_pull safe→medium, git_new_branch safe→medium, git_switch_branch safe→medium, git_clone safe→medium), 4 kept.
+
+**(b) New paraphrases**: 1995 candidates (PL+EN, bash/zsh/sh/PowerShell/fish/cmd, written for v0.3; deduplicated against training and every held-out set) labelled by the teacher; **1911 accepted** (teacher picks the proposed intent with p ≥ 0.6; EN 999, PL 912; shells bash 787, zsh 299, powershell 505, sh 114, fish 112, cmd 94), 39 rejected → `data/teacher/label_rejected.jsonl`. 74 of the accepted rows were misclassified by the v0.2 model. Out-of-domain candidates: 445, **380 kept** (teacher p(shell request) < 0.3) → `data/ood_teacher.jsonl`. 45 accepted paraphrases and 1 out-of-domain rows were later removed as near-duplicates of held-out texts.
+
+**(c) Hard negatives**: 601 contrastive rewrites of training rows across confusable intents (e.g. "symlinks" → "broken symlinks", "push" → "pull", "process" → "service"); **463 confirmed** by the teacher and added (broken_symlinks 72, find_symlinks 51, git_pull 9, git_push 10, service_status 20, find_process 18, empty_dirs 68, empty_files 51, block_devices 10, disk_free 18, last_logins 8, show_path 1, hidden_files 25, docker_ps_all 41, service_stop 29, service_restart 32); 3 low-margin training rows of confusable intents (confirmed in (a)) are given double weight. 32 confirmed rewrites and 10 boosted rows were later removed because they were held-out texts, near-duplicates of one, or one-word rewrites of one (`scripts/lib/heldout.js`).
 <!-- teacher:end -->
diff --git a/README.md b/README.md
index d076e63..058ba74 100644
--- a/README.md
+++ b/README.md
@@ -115,7 +115,7 @@ The intent and slots are shared; only the rendering differs (`src/render.js`, va
 | sh (dash / busybox) | **v1** | POSIX-only templates; tests run `sh -n` (dash) and `busybox sh -n`; busybox variants for 24 intents (no `ps --sort`, `find -printf`, …) |
 | PowerShell (7, mostly 5.1) | **v1** | real cmdlets (`Get-ChildItem`, `Get-Process`, `Stop-Process`, `Get-NetTCPConnection`, …) for 146/149 on Windows; on Linux/macOS native tools or `bash -c '…'`; gaps: chmod, chmod +x, cal on Windows |
 | fish | best effort | POSIX template with fish quoting + fish overrides (`string join \n $PATH`, history, …); not syntax-checked (fish not installed in CI) |
-| cmd.exe | best effort | 117/149 (`dir /s /b`, `tasklist`, `taskkill`, `netstat -ano | findstr`, `certutil -hashfile`, …); the rest reports a gap (exit 5) |
+| cmd.exe | best effort | 114/149 (`dir /s /b`, `tasklist`, `taskkill`, `netstat -ano | findstr`, `certutil -hashfile`, …); the rest reports a gap (exit 5) |
 
 * **macOS** = BSD userland unless Homebrew GNU coreutils (`gdu` + `gsort`) are on `PATH`: `du -k … | sort -rn` instead of
   `sort -h`, `sed -i ''`, `stat -f`, `md5 -r`, `lsof` instead of `ss`, `vm_stat`, `launchctl`/`brew services`, …
@@ -133,7 +133,11 @@ Lines are split with a shell-aware tokenizer (`a\ b.txt`, quoted `;`/`|`, redire
 escapes and native cmdlets such as `Get-Content -LiteralPath`, `Remove-Item`, `Stop-Process -Id`, `Restart-Service`).
 If the latest value of the referenced type depends on the shell state (`cat $F`, `rm *.log`), comes from a line that
 cannot be parsed, or from an unknown command naming a path, the reference is **refused** (the slot stays a
-placeholder) rather than resolved to an older value.
+placeholder) rather than resolved to an older value. A directory that was only searched or filtered (`find /var/log
+-name '*.gz'`, `grep -rl TODO src`, `Get-ChildItem DIR -Filter *.pdf`, `ls DIR | grep pdf`), or only listed when the
+request says "them"/"those"/"je" (`ls /tmp/build` + "delete them"), is never the target of a changing command: the
+results live inside it. "Same for X" is refused when a newer line used other targets than the command it would repeat
+(or when X names nothing), and a quoted `'~/x'` from history stays the literal directory `./~/x`.
 
 * deterministic rules: "same for /var" / "to samo dla /var" (previous intent, one slot replaced), "delete it" /
   "usuń to", "logs of that container" / "logi tego kontenera", "kill it" / "zabij go" (verb × entity type table; a
@@ -188,19 +192,20 @@ All numbers are on held-out data never used for training (`npm run eval`, `npm r
 
 | metric | result |
 |---|---|
-| stage 1 tool family top-1 / top-3 (`data/eval`, 2384 EN+PL) | **96.9% / 99.7%** |
-| stage 2 intent top-1 (EN / PL) | **95.2%** (95.3% / 95.1%); v0.1 flat classifier: 95.2% |
-| per shell, intent top-1 (bash · zsh · sh · PowerShell · fish · cmd) | 95.2 · 95.5 · 95.0 · 94.8 · 95.1 · 94.6% |
+| stage 1 tool family top-1 / top-3 (`data/eval`, 2384 EN+PL) | **97.2% / 99.7%** |
+| stage 2 intent top-1 (EN / PL) | **95.6%** (95.2% / 96.1%); v0.1 flat classifier: 95.2% |
+| per shell, intent top-1 (bash · zsh · sh · PowerShell · fish · cmd) | 95.6 · 95.6 · 95.7 · 95.2 · 95.8 · 95.7% |
 | renders passing `bash -n` / `sh -n` | 148/148 bash · zsh · sh (+ all 149 intents × 5 POSIX envs in `npm test`) |
-| slot F1, hand-annotated gold (tagger + regex fallback / tagger / regex) | **95.7%** / 94.2% / 94.5% |
-| end-to-end exact command, relexicalised held-out values (full pipeline / gold intent) | **82.8%** / 92.2% |
+| slot F1, hand-annotated gold (tagger + regex fallback / tagger / regex) | **96.3%** / 94.6% / 95.1% |
+| end-to-end exact command, relexicalised held-out values (full pipeline / gold intent) | **85.3%** / 93.9% |
+| blind sets (v0.3, separate author): intent top-1 · end-to-end exact command | 98.8% (clean subset 98.6%) · 96.1% (clean 96.0%) |
 | hand-written slot cases, exact command | 99/99 |
-| history references, exact command (48 EN+PL; without history 0%) | **97.9%** (dev set, blind first run 60.4%) |
-| composer on out-of-catalogue requests: acceptable / exact | 29.4% / 27.5% (blind first run 3.9%) · any answer acceptable 31.4% · false fires on catalog requests 0.7% |
-| out-of-domain rejected | 92.4% |
+| history references, exact command (48 EN+PL; without history 0%) | **97.9%** (dev set, blind first run 60.4%) · v0.3 blind set (79): 82.3% |
+| composer on out-of-catalogue requests: acceptable / exact | 49.0% / 47.1% (dev set) · any answer acceptable 52.9% · v0.3 blind set (58): acceptable 22.4% · false fires on catalog requests 0.5% |
+| out-of-domain rejected | 94.6% (blind set 100%) |
 | model size | **2.71 MB** (v0.1: 3.68 MB) |
-| latency, `taskset -c 0`: cold process p50 / p95 | **159 / 190 ms** (bare `node -e 0`: 104 ms) |
-| latency, warm full cascade + tagger + render p50 / p95 | **0.31 / 2.2 ms** |
+| latency, `taskset -c 0`: cold process p50 / p95 | **158 / 187 ms** (bare `node -e 0`: 72 ms) |
+| latency, warm full cascade + tagger + render p50 / p95 | **0.30 / 2.1 ms** |
 
 ## Data & licenses
 
diff --git a/package.json b/package.json
index 33f809b..ffea962 100644
--- a/package.json
+++ b/package.json
@@ -1,6 +1,6 @@
 {
   "name": "tellsh",
-  "version": "0.2.0",
+  "version": "0.3.0",
   "description": "Offline natural-language (Polish & English) to shell command CLI: tool->intent->slot cascade of tiny linear models + templates for bash/zsh/sh/PowerShell (fish/cmd best effort). No LLM at runtime, zero dependencies.",
   "type": "module",
   "bin": {
diff --git a/scripts/report.js b/scripts/report.js
index 41410ca..235f998 100644
--- a/scripts/report.js
+++ b/scripts/report.js
@@ -9,6 +9,6 @@ export function updateSection(name, body) {
     : '# tellsh evaluation\n\nGenerated by `npm run eval` and `npm run bench`.\n\n<!-- eval:start -->\n<!-- eval:end -->\n\n<!-- bench:start -->\n<!-- bench:end -->\n';
   const re = new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`);
   const block = `<!-- ${name}:start -->\n${body.trim()}\n<!-- ${name}:end -->`;
-  md = re.test(md) ? md.replace(re, block) : `${md.trimEnd()}\n\n${block}\n`;
+  md = re.test(md) ? md.replace(re, () => block) : `${md.trimEnd()}\n\n${block}\n`;
   writeFileSync(EVAL_MD, md);
 }
   840	    : `the latest dir in history (${value}) is where a search ran, not what it found; not guessing`;
   841	  if (searchRoot && intent && BY_ID[intent].risk !== 'safe') {
   842	    return { rule: 'refused', intent, ent: finalEnt, blank: SLOT_FROM_ENT[finalEnt], note: rootNote };
   843	  }
   844	  if (intent === 'kill_by_name' && FORCE.test(fq)) intent = 'kill_force';
   845	  if (intent === 'extract_targz' && /\.zip$/i.test(value)) intent = 'extract_zip';
   846	  const fill = {};
   847	  for (const s of SLOT_FROM_ENT[finalEnt] || []) fill[s] = value;
   848	  // searchRoot: the caller must not use the value for a non-safe intent it picks itself
   849	  return { rule: 'pronoun', intent, fill, ent: finalEnt, ...(searchRoot ? { searchRoot: true, rootNote } : {}), note: `"${finalEnt}" from history = ${value}` };
   850	}
   851	
   852	/**
   853	 * Pick one value of an entity type: a value the request names part of ("that release branch" ->
   854	 * release/2.3) wins; deleting/switching a branch skips the branch that is checked out; else most recent.
   855	 */
   856	function chooseValue(type, fq, ctx, verb) {
   857	  // the newest value cannot be read ($BACKUP, a glob, an unknown command): never fall back to an older one
   858	  if (isAmbiguous(ctx.ents[type])) return ctx.ents[type];
   859	  let vals = ctx.all?.[type] || (ctx.ents[type] != null ? [String(ctx.ents[type])] : []);
   860	  // only words that identify a target count, not the action, pronoun or filler words of the request
   861	  // ("remove it" must not pick /srv/remove-backups over the newer /srv/current)
   862	  const words = fq.split(/[^a-z0-9]+/).filter(isHintWord);
   863	  const named = vals.find((v) => !isAmbiguous(v) && words.some((w) => foldKeepLength(v).toLowerCase().includes(w)));
   864	  if (named) return named;
   865	  if (type === 'branch' && (verb === 'delete' || verb === 'switch') && ctx.currentBranch) {
   866	    const other = vals.filter((v) => v !== ctx.currentBranch);
   867	    if (other.length) vals = other;
   868	  }
   869	  return vals[0];
   870	}
   871	
   872	const NOT_HINT = /^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back|list\w*|wylistuj\w*|check|sprawdz\w*|wipe|nuke|purge|destroy|clear|clean\w*|wyczysc\w*|drop|what|which|where|about|with|from|into|then|also|again|teraz|jeszcze)$/;
   873	const isHintWord = (w) => w.length >= 4 && !NOT_HINT.test(w) && !isStopWord(w) && !PRONOUN_WORD.test(w) && !FORCE.test(w)
   874	  && !VERBS.some(([, re]) => re.test(w)) && !NOUN_TYPE.some(([re]) => re.test(w));
   875	
   876	/** Implicit references ("ile ma słów", "md5 of the same file"): fill a missing slot from history. */
   877	export function entityForSlot(slot, ctx) {
   878	  // the most recent value of the type is used, or nothing: an ambiguous latest value never falls back
   879	  // to an older one ({ ambiguous: true } tells the caller not to look anywhere else either)
   880	  for (const [ent, slots] of Object.entries(SLOT_FROM_ENT)) {
   881	    if (slots[0] === slot && ctx.ents[ent] != null) return isAmbiguous(ctx.ents[ent]) ? { ent, ambiguous: true } : { ent, value: String(ctx.ents[ent]) };
   882	  }
   883	  if (slot === 'file' && ctx.ents.dir == null && ctx.ents.file != null) return isAmbiguous(ctx.ents.file) ? { ent: 'file', ambiguous: true } : { ent: 'file', value: String(ctx.ents.file) };
   884	  // a type that maps onto this slot exists but is ambiguous (e.g. src <- file/dir)
   885	  if (Object.entries(SLOT_FROM_ENT).some(([ent, slots]) => slots.includes(slot) && isAmbiguous(ctx.ents[ent]))) return { ambiguous: true };
   886	  return null;
   887	}
   888	
   889	const SAME_BUT = [/^\s*(?:and\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?,?\s+but\s+(.+)$/, /^\s*(?:a\s+|i\s+)?(?:to\s+)?samo,?\s+ale\s+(.+)$/,
   890	  /^\s*(?:a\s+|i\s+)?tak samo,?\s+ale\s+(.+)$/];
   891	/** "same but only file names" / "to samo ale tylko nazwy plików": modifier for the previous command. */
   892	export function sameBut(query, ctx) {
   893	  if (!ctx?.last) return null;
   894	  const fq = fold(query);
   895	  const lastSlots = Object.fromEntries(Object.entries(ctx.last.slots || {}).filter(([, v]) => !isAmbiguous(v)));
   896	  for (const re of SAME_BUT) if (re.test(fq)) return { lastIntent: ctx.last.intent, lastSlots };
   897	  return null;
   898	}
   899	
   900	function intentUses(intent, ent) {
   901	  const it = BY_ID[intent];
   902	  return (SLOT_FROM_ENT[ent] || []).some((k) => k in it.slots);
   903	}
   904	function pickEnt(intent, ent, ctx) {
   905	  if (intentUses(intent, ent)) return ent;
   906	  return (ctx.refOrder || ctx.entOrder).find((e) => intentUses(intent, e)) || ent;
   907	}
   268	      if (!validSlot(k, v)) { if (slots[k] != null && PRONOUN_VALUE.test(String(slots[k]))) delete slots[k]; continue; }
   269	      // the referenced value wins unless the request spells out its own value literally ("kill 4242")
   270	      const literal = slots[k] != null && !PRONOUN_VALUE.test(String(slots[k])) && new RegExp(`(^|[^\\w])${String(slots[k]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^\\w])`, 'i').test(query);
   271	      if (usesSlot(it, k) && (!literal || (k === 'path' && slots[k] === '.'))) { slots[k] = v; r.sources[k] = 'history'; }
   272	    }
   273	    // the chosen command does not take the referenced value: do not claim it was used
   274	    if (!Object.values(r.sources).includes('history')) { context.rule = null; context.note = `the ${ref.ent} from history does not fit ${intent}; not used`; }
   275	    finalizeSlots(it, slots);
   276	    method = 'history-rule';
   277	  }
   278	  if (sb) {
   279	    const it = BY_ID[intent];
   280	    for (const [k, v] of Object.entries(validHistorySlots(sb.lastSlots))) {
   281	      if (usesSlot(it, k) && slots[k] == null && !['namepat', 'sedexpr'].includes(k)) { slots[k] = v; r.sources[k] = 'history'; }
   282	    }
   283	    finalizeSlots(it, slots);
   284	  }
   285	  let b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank] });
   286	  // implicit reference: a required slot is still missing and the history has a value of that type.
   287	  // Only for safe intents: a destructive command ("delete the folder") is never aimed at a history
   288	  // value without an explicit reference word ("delete it"), which goes through resolveReference.
   289	  if (ctx && b.missing.length && ref?.rule !== 'refused' && BY_ID[intent].risk === 'safe' && b.risk === 'safe') {
   290	    const filled = [];
   291	    for (const m of b.missing) {
   292	      const e = entityForSlot(m, ctx);
   293	      // an ambiguous newest value blocks the fill; ctx.last is consulted only when no entity type applies
   294	      const v = e ? (e.ambiguous ? null : e.value) : (ctx.last?.slots?.[m] ?? null);
   295	      if (v != null && validSlot(m, v)) { slots[m] = v; r.sources[m] = 'history'; filled.push(`${m}=${v}`); }
   296	    }
   297	    if (filled.length) {
   298	      finalizeSlots(BY_ID[intent], slots);
   299	      b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank] });
   300	      method = 'history-rule'; // history-derived: never auto-run by --yes
   301	      context.rule ??= 'implicit';
   302	      context.note = [context.note, `filled from history: ${filled.join(', ')}`].filter(Boolean).join('; ');
{"action": "relabel", "field": "risk", "intent": "extract_zip", "from": "safe", "to": "medium", "reason": "teacher: medium; unzip/tar -x can overwrite existing files"}
{"action": "relabel", "field": "risk", "intent": "extract_targz", "from": "safe", "to": "medium", "reason": "teacher: medium; tar -x overwrites files silently"}
{"action": "relabel", "field": "risk", "intent": "compress_targz", "from": "safe", "to": "medium", "reason": "teacher: medium; tar -c overwrites an existing archive"}
{"action": "relabel", "field": "risk", "intent": "compress_zip", "from": "safe", "to": "medium", "reason": "teacher: medium; writes/updates an archive file"}
{"action": "relabel", "field": "risk", "intent": "git_stash", "from": "safe", "to": "medium", "reason": "teacher: medium; changes the working tree"}
{"action": "relabel", "field": "risk", "intent": "git_stash_pop", "from": "safe", "to": "medium", "reason": "teacher: medium; can conflict with local changes"}
{"action": "relabel", "field": "risk", "intent": "git_pull", "from": "safe", "to": "medium", "reason": "teacher: medium; merges remote changes into the working tree"}
{"action": "relabel", "field": "risk", "intent": "git_new_branch", "from": "safe", "to": "medium", "reason": "teacher: medium; checkout changes HEAD"}
{"action": "relabel", "field": "risk", "intent": "git_switch_branch", "from": "safe", "to": "medium", "reason": "teacher: medium; checkout changes the working tree"}
{"action": "relabel", "field": "risk", "intent": "git_clone", "from": "safe", "to": "medium", "reason": "teacher: medium; network + creates a directory"}
{"action": "keep", "field": "risk", "intent": "touch_file", "reason": "teacher: medium; kept safe: creates an empty file, never overwrites content; v0.3 verify (request-only risk question) again rated most rows medium — kept safe: creates new things, never overwrites or deletes data"}
{"action": "keep", "field": "risk", "intent": "mkdir", "reason": "teacher: medium; kept safe: mkdir -p only creates; v0.3 verify (request-only risk question) again rated most rows medium — kept safe: creates new things, never overwrites or deletes data"}
{"action": "keep", "field": "risk", "intent": "git_init", "reason": "teacher: medium; kept safe: creates .git only, idempotent; v0.3 verify (request-only risk question) again rated most rows medium — kept safe: creates new things, never overwrites or deletes data"}
{"action": "keep", "field": "risk", "intent": "git_add_all", "reason": "teacher: medium; kept safe: index change, undone by git reset; v0.3 verify (request-only risk question) again rated most rows medium — kept safe: creates new things, never overwrites or deletes data"}
{"action": "keep", "field": "label", "text": "pokaż właściwości pliku C:\\Windows\\notepad.exe (data utworzenia, rozmiar)", "reason": "label correct; Windows paths now extracted (slots.js PATH_TOKEN)"}
{"action": "keep", "field": "label", "text": "copy C:\\Users\\me\\Desktop\\report.docx to D:\\backup", "reason": "label correct; Windows paths now extracted"}
{"action": "keep", "field": "label", "text": "zdekoduj plik token.b64 z base64", "reason": "label correct; 'plik X.ext' now selects file mode for base64"}
{"action": "keep", "field": "label", "text": "zabij procesy javy", "reason": "label correct; Polish inflection javy -> java now mapped (slots.js deinflect)"}
{"action": "keep", "field": "label", "text": "połącz się z moim raspberry pi przez ssh", "reason": "label correct; request has no host -> placeholder instead of 'moim'"}
{"action": "keep", "field": "label", "text": "folder tree of /opt/app with depth one", "reason": "teacher rejected NUM 'one' but it is the depth; silver span correct"}
{"action": "drop", "field": "label", "text": "czy nginx działa?", "intent": null, "from": "find_process", "reason": "teacher (v0.3 verify): service_status 0.89; ambiguous: nginx is both a process and a systemd service"}
{"action": "drop", "field": "label", "text": "chek if apache2 is running", "intent": null, "from": "find_process", "reason": "teacher (v0.3 verify): service_status 0.9; ambiguous process vs service"}
{"action": "drop", "field": "label", "text": "sprwadz czy apache2 chodzi", "intent": null, "from": "find_process", "reason": "teacher (v0.3 verify): service_status 0.95; ambiguous process vs service"}
{"action": "drop", "field": "label", "text": "who is connected to my machine", "intent": null, "from": "established_connections", "reason": "teacher (v0.3 verify): users_logged_in 0.96; ambiguous: network connections vs logged-in users"}
{"action": "drop", "field": "label", "text": "kto jest połączony z moim komputerem", "intent": null, "from": "established_connections", "reason": "teacher (v0.3 verify): users_logged_in 0.75; ambiguous: network connections vs logged-in users"}
{"action": "drop", "field": "label", "text": "kto jest teraz podłączony do serwera bazy", "intent": null, "from": "established_connections", "reason": "teacher (v0.3 verify): users_logged_in 0.84; ambiguous: network connections vs logged-in users"}
{"action": "drop", "field": "label", "text": "last 100 log lines for nginx", "intent": null, "from": "journal_service", "reason": "teacher (v0.3 verify): tail_file 0.79; ambiguous: nginx log files vs journal"}
{"action": "drop", "field": "label", "text": "nginx logs last 200 lines", "intent": null, "from": "journal_service", "reason": "teacher (v0.3 verify): tail_file 0.97; ambiguous: nginx log files vs journal"}
{"action": "drop", "field": "label", "text": "ostatnie 100 linii logów nginx", "intent": null, "from": "journal_service", "reason": "teacher (v0.3 verify): tail_file 0.81; ambiguous: nginx log files vs journal"}
{"action": "drop", "field": "label", "text": "shwo logs for nginx", "intent": null, "from": "docker_logs", "reason": "teacher (v0.3 verify): journal_service 0.73; ambiguous: container vs service vs log file"}
{"action": "drop", "field": "label", "text": "which files did i touch", "intent": null, "from": "git_status", "reason": "teacher (v0.3 verify): recent_files 0.9; ambiguous: git status vs recently modified files"}
{"action": "drop", "field": "label", "text": "ktore pliki ruszalem", "intent": null, "from": "git_status", "reason": "teacher (v0.3 verify): recent_files 0.8; ambiguous: git status vs recently modified files"}
{"action": "drop", "field": "label", "text": "pokaz roznice w plikach", "intent": null, "from": "git_diff", "reason": "teacher (v0.3 verify): diff_files 0.95; ambiguous: git diff vs diff of two files"}
{"action": "drop", "field": "label", "text": "open branch feature/api-v2", "intent": null, "from": "git_new_branch", "reason": "teacher (v0.3 verify): git_switch_branch 0.95; ambiguous: create vs switch"}
{"action": "drop", "field": "label", "text": "pobierz aktualizacje", "intent": null, "from": "git_pull", "reason": "teacher (v0.3 verify): system_update 0.92; ambiguous: git pull vs system update"}
{"action": "drop", "field": "label", "text": "ściągnij to co jest na githubie", "intent": null, "from": "git_pull", "reason": "teacher (v0.3 verify): git_clone 0.84; ambiguous: git pull vs git clone"}
{"action": "drop", "field": "label", "text": "stop mongo", "intent": null, "from": "docker_stop", "reason": "teacher (v0.3 verify): service_stop 0.85; ambiguous: container vs service"}
{"action": "drop", "field": "label", "text": "zatrzymaj mongo", "intent": null, "from": "docker_stop", "reason": "teacher (v0.3 verify): service_stop 0.71; ambiguous: container vs service"}
{"action": "drop", "field": "label", "text": "stopnij nginxa", "intent": null, "from": "docker_stop", "reason": "teacher (v0.3 verify): service_stop 0.84; ambiguous: container vs service"}
{"action": "drop", "field": "label", "text": "shut down my-app", "intent": null, "from": "docker_stop", "reason": "teacher (v0.3 verify): service_stop 0.66; ambiguous: container vs service"}
{"action": "relabel", "field": "label", "text": "see whether the ssh daemon is running", "from": "find_process", "intent": "service_status", "reason": "teacher (v0.3 verify): service_status 0.8; 'daemon' names a service"}
{"action": "relabel", "field": "label", "text": "sprawdź czy demon ssh jest uruchomiony", "from": "find_process", "intent": "service_status", "reason": "teacher (v0.3 verify): service_status 0.81; 'daemon' names a service"}
{"action": "keep", "field": "label", "text": "find all .jsno files", "intent": "find_by_ext", "reason": "teacher (v0.3 verify) preferred find_by_name (0.64); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "gdzie jest napisane 'Copyright 2023'", "intent": "grep_text", "reason": "teacher (v0.3 verify) preferred grep_files_containing (0.65); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "same nazwy plików zawierających 'deprecated' w ./src", "intent": "grep_files_containing", "reason": "teacher (v0.3 verify) preferred find_by_name (0.64); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "tylko nazwy plików: 'timeout' w ./config", "intent": "grep_files_containing", "reason": "teacher (v0.3 verify) preferred find_by_name (0.62); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "loc of the project counting .py only", "intent": "count_lines_code", "reason": "teacher (v0.3 verify) preferred count_files (0.94); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "symlinki pod /usr/lib", "intent": "find_symlinks", "reason": "teacher (v0.3 verify) preferred create_symlink (0.62); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "wiszace linki w biezacym folderze", "intent": "broken_symlinks", "reason": "teacher (v0.3 verify) preferred find_symlinks (0.83); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "set +x on hooks/pre-commit", "intent": "make_executable", "reason": "teacher (v0.3 verify) preferred none (0.85); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "jaka nazwe urzadzenia ma moj pendrive", "intent": "block_devices", "reason": "teacher (v0.3 verify) preferred usb_devices (0.72); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "wyświetl dyski z rozmiarami", "intent": "block_devices", "reason": "teacher (v0.3 verify) preferred disk_free (0.75); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "co zjada procesor?", "intent": "top_cpu", "reason": "teacher (v0.3 verify) preferred cpu_info (0.66); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "co zjada ram?", "intent": "top_mem", "reason": "teacher (v0.3 verify) preferred memory_usage (0.94); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "stop the nginx process", "intent": "kill_by_name", "reason": "teacher (v0.3 verify) preferred service_stop (0.82); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "murder all the node processes", "intent": "kill_by_name", "reason": "teacher (v0.3 verify) preferred kill_force (0.68); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "odblokuj port 3000", "intent": "kill_by_port", "reason": "teacher (v0.3 verify) preferred none (0.93); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "jaka to platforma", "intent": "system_info", "reason": "teacher (v0.3 verify) preferred os_release (0.65); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "cat /etc/os-release", "intent": "os_release", "reason": "teacher (v0.3 verify) preferred cat_file (0.65); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "pokaz plik os-release", "intent": "os_release", "reason": "teacher (v0.3 verify) preferred cat_file (0.77); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "sprawdź czy swap jest używany", "intent": "memory_usage", "reason": "teacher (v0.3 verify) preferred none (0.66); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "czy architektura to x86_64 czy arm", "intent": "cpu_info", "reason": "teacher (v0.3 verify) preferred system_info (0.76); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "how many corse do i have", "intent": "cpu_cores", "reason": "teacher (v0.3 verify) preferred none (0.9); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "show my PATH", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.8); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "echo $PATH", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.98); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "print my search path", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.69); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "what does my PATH look like", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.76); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "path variable contents", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.82); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "list dirs in path", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred list_files (0.71); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "check whether cargo bin is in PATH", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred which_cmd (1); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "pritn PATH", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.9); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "show PATH", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.75); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "pokaż PATH", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.83); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "pokaż echo $PATH", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.95); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "jak wyglada moj PATH", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.77); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "zawartosc zmiennej PATH", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.95); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "moja sciezka PATH", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.89); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "co mam w zmiennej path", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.95); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "data systemowa", "intent": "date_time", "reason": "teacher (v0.3 verify) preferred system_info (0.92); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "service logs for docker", "intent": "journal_service", "reason": "teacher (v0.3 verify) preferred docker_logs (0.64); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "print fifty lines of docker logs from journald", "intent": "journal_service", "reason": "teacher (v0.3 verify) preferred docker_logs (0.79); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "logi usługi docker", "intent": "journal_service", "reason": "teacher (v0.3 verify) preferred docker_logs (0.76); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "logi serwisu docker", "intent": "journal_service", "reason": "teacher (v0.3 verify) preferred docker_logs (0.96); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "which gpu", "intent": "gpu_info", "reason": "teacher (v0.3 verify) preferred which_cmd (0.99); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "jaka mam grafike", "intent": "gpu_info", "reason": "teacher (v0.3 verify) preferred none (0.8); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "find out if tmux is installed", "intent": "package_installed", "reason": "teacher (v0.3 verify) preferred which_cmd (0.74); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "installed packages matching python", "intent": "package_installed", "reason": "teacher (v0.3 verify) preferred none (0.68); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "list installed packages with openjdk in the name", "intent": "package_installed", "reason": "teacher (v0.3 verify) preferred none (0.64); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "czy python3 jest zainstalowany czy nie", "intent": "package_installed", "reason": "teacher (v0.3 verify) preferred which_cmd (0.68); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "zainstalowane pakiety z python w nazwie", "intent": "package_installed", "reason": "teacher (v0.3 verify) preferred none (0.66); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "preview the commit diff", "intent": "git_diff_staged", "reason": "teacher (v0.3 verify) preferred git_diff (0.82); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "przejrzyj zmiany przed commitem", "intent": "git_diff_staged", "reason": "teacher (v0.3 verify) preferred none (0.66); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "zmiany dodane ale niezacommitowane", "intent": "git_diff_staged", "reason": "teacher (v0.3 verify) preferred git_diff (0.97); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "podgląd diffa commita", "intent": "git_diff_staged", "reason": "teacher (v0.3 verify) preferred none (0.86); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "pokaż diff wszystkiego w poczekalni", "intent": "git_diff_staged", "reason": "teacher (v0.3 verify) preferred git_diff (0.7); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "restore index.html to its committed version", "intent": "git_discard_changes", "reason": "teacher (v0.3 verify) preferred none (0.66); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "przywróć plik src/app.js do ostatniego commita", "intent": "git_discard_changes", "reason": "teacher (v0.3 verify) preferred none (0.65); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "schowaj moje zmiany", "intent": "git_stash", "reason": "teacher (v0.3 verify) preferred git_diff (0.96); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "schowaj zmodyfikowane pliki", "intent": "git_stash", "reason": "teacher (v0.3 verify) preferred git_status (0.96); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "przechowaj moje bieżące edycje w schowku", "intent": "git_stash", "reason": "teacher (v0.3 verify) preferred none (0.7); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "git stash poprosze", "intent": "git_stash", "reason": "teacher (v0.3 verify) preferred git_stash_pop (0.96); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "odstashuj", "intent": "git_stash_pop", "reason": "teacher (v0.3 verify) preferred git_stash (0.8); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "git add kropka", "intent": "git_add_all", "reason": "teacher (v0.3 verify) preferred none (0.85); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "co chodzi w dockerze", "intent": "docker_ps", "reason": "teacher (v0.3 verify) preferred none (0.88); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "show me the last 200 log lines of web", "intent": "docker_logs", "reason": "teacher (v0.3 verify) preferred tail_file (0.81); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "stream logs from postgres", "intent": "docker_logs", "reason": "teacher (v0.3 verify) preferred tail_follow (0.7); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "show logs from db, last twenty lines", "intent": "docker_logs", "reason": "teacher (v0.3 verify) preferred tail_file (0.73); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "live log output from proxy", "intent": "docker_logs", "reason": "teacher (v0.3 verify) preferred tail_follow (0.7); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "pokaz logi redisa na zywo", "intent": "docker_logs", "reason": "teacher (v0.3 verify) preferred tail_follow (0.61); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "pokaż ostatnie 200 linii logów weba", "intent": "docker_logs", "reason": "teacher (v0.3 verify) preferred tail_file (0.92); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "strumieniuj logi z postgresa", "intent": "docker_logs", "reason": "teacher (v0.3 verify) preferred none (0.69); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "pokaż logi db, ostatnie dwadzieścia linii", "intent": "docker_logs", "reason": "teacher (v0.3 verify) preferred tail_file (0.62); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "śledź na bieżąco logi backend", "intent": "docker_logs", "reason": "teacher (v0.3 verify) preferred tail_follow (0.95); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "how much space do my images take, list them", "intent": "docker_images", "reason": "teacher (v0.3 verify) preferred dir_size (0.69); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "bring down the db container", "intent": "docker_stop", "reason": "teacher (v0.3 verify) preferred docker_compose_down (0.64); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "bring down all containers", "intent": "docker_stop_all", "reason": "teacher (v0.3 verify) preferred docker_compose_down (0.74); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "sprunuj dockera", "intent": "docker_prune", "reason": "teacher (v0.3 verify) preferred none (0.66); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "shell into postgres", "intent": "docker_exec", "reason": "teacher (v0.3 verify) preferred none (0.89); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "exec it into elastic", "intent": "docker_exec", "reason": "teacher (v0.3 verify) preferred none (0.69); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "get shel in web", "intent": "docker_exec", "reason": "teacher (v0.3 verify) preferred none (0.75); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "statsy dzialajacych kontenerow", "intent": "docker_stats", "reason": "teacher (v0.3 verify) preferred docker_ps (0.78); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "up the stack", "intent": "docker_compose_up", "reason": "teacher (v0.3 verify) preferred none (0.86); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "położ usługi compose", "intent": "docker_compose_down", "reason": "teacher (v0.3 verify) preferred docker_compose_up (0.71); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "położ stack docker compose", "intent": "docker_compose_down", "reason": "teacher (v0.3 verify) preferred docker_compose_up (0.6); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "let me execute ./start", "intent": "make_executable", "reason": "teacher (v0.3 verify) preferred none (0.62); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "$env:COMPUTERNAME", "intent": "hostname", "reason": "teacher (v0.3 verify) preferred env_var_get (0.73); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "echo %PATH%", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.98); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "pokaż PATH", "intent": "show_path", "reason": "teacher (v0.3 verify) preferred env_var_get (0.7); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "schtasks /query - list scheduled tasks", "intent": "cron_list", "reason": "teacher (v0.3 verify) preferred none (0.86); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "pokaż zaplanowane zadania (Get-ScheduledTask)", "intent": "cron_list", "reason": "teacher (v0.3 verify) preferred none (0.66); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "event log entries for the W3SVC service", "intent": "journal_service", "reason": "teacher (v0.3 verify) preferred none (0.92); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}
{"action": "keep", "field": "label", "text": "Get-NetTCPConnection nie ma na linuxie, ale sprawdź kto słucha na 8443", "intent": "process_on_port", "reason": "teacher (v0.3 verify) preferred listening_ports (0.76); label kept: catalog meaning (e.g. show_path is the PATH-specific intent, docker_logs/stash/compose rows name the tool), typo or teacher misread"}

exec
/bin/bash -lc "node --input-type=module <<'JS'
import fs from 'node:fs'; import {join} from 'node:path';
import {heldOutTexts,heldOutIndex} from './scripts/lib/heldout.js'; import {SLOT_CASES} from './test/slot-cases.js'; import {normalize} from './src/features.js';
const read=p=>fs.existsSync(p)?fs.readFileSync(p,'utf8').split('\\n').filter(Boolean).map(JSON.parse):[];
const root=process.cwd();const h=heldOutIndex(heldOutTexts(root));const hx=heldOutIndex(heldOutTexts(root,SLOT_CASES.map(r=>r[1])));
const rows=fs.readdirSync('data/intents').filter(f=>f.endsWith('.jsonl')).flatMap(f=>read(join('data/intents',f)).map(r=>({...r,file:f}))).concat(read('data/shell/train.jsonl'));
const drop=new Set(read('data/teacher/decisions.jsonl').filter(d=>d.text&&d.action==='drop').map(d=>normalize(d.text)));
console.log('teacher would send slot eval rows', rows.filter(r=>"'!h.has(r.text)&&hx.has(r.text)&&!drop.has(normalize(r.text))).map(r=>({text:r.text,intent:r.intent,file:r.file})));
JS
nl -ba src/history.js | sed -n '"'405,420p;882,900p'
nl -ba src/pipeline.js | sed -n '276,290p'
git status --short" in /workspace/tellsh
 succeeded in 290ms:
teacher would send slot eval rows [
  {
    text: 'follow /var/log/nginx/access.log',
    intent: 'tail_follow',
    file: 'g01.jsonl'
  },
  { text: 'chmod 755 deploy.sh', intent: 'chmod', file: 'g01.jsonl' },
  {
    text: 'ustaw uprawnienia config.yml na 644',
    intent: 'chmod',
    file: 'g01.jsonl'
  },
  {
    text: "zamień 'localhost' na '127.0.0.1' w pliku app.conf",
    intent: 'replace_text',
    file: 'g02.jsonl'
  },
  {
    text: 'kill whatever is on port 3000',
    intent: 'kill_by_port',
    file: 'g02.jsonl'
  },
  {
    text: 'co działa na porcie 3000',
    intent: 'process_on_port',
    file: 'g02.jsonl'
  },
  {
    text: 'pobierz https://example.com/file.zip',
    intent: 'download_file',
    file: 'g04.jsonl'
  },
  {
    text: 'i want to stop the app container',
    intent: 'docker_stop',
    file: 'g05.jsonl'
  },
  {
    text: 'make run.sh executable',
    intent: 'make_executable',
    file: undefined
  },
  { text: 'pingnij 192.168.0.1', intent: 'ping_host', file: undefined },
  {
    text: 'is port 3389 open on 10.0.0.5',
    intent: 'port_check',
    file: undefined
  }
]
   405	    let w = [];
   406	    let redirTarget = null;
   407	    for (let i = 0; i < words.length; i++) {
   408	      const x = words[i];
   409	      if (REDIR_DUP_OP.test(x)) continue;
   410	      if (REDIR_TARGET_OP.test(x)) {
   411	        const target = words[i + 1];
   412	        i++;
   413	        if (target != null && !/^\/dev\/(?:null|stdout|stderr|tty)$|^(?:\$null|NUL)$/i.test(rawOf(target))) redirTarget = target;
   414	        continue;
   415	      }
   416	      w.push(x);
   417	    }
   418	    while (w.length && (w[0] === 'sudo' || /^\w+=/.test(w[0]))) w = w.slice(1);
   419	    if (w.length) segmentEnts(w, e, setIntent, split, k, segIdx, firstWord);
   420	    if (redirTarget != null) e.file = redirTarget;
   882	  }
   883	  if (slot === 'file' && ctx.ents.dir == null && ctx.ents.file != null) return isAmbiguous(ctx.ents.file) ? { ent: 'file', ambiguous: true } : { ent: 'file', value: String(ctx.ents.file) };
   884	  // a type that maps onto this slot exists but is ambiguous (e.g. src <- file/dir)
   885	  if (Object.entries(SLOT_FROM_ENT).some(([ent, slots]) => slots.includes(slot) && isAmbiguous(ctx.ents[ent]))) return { ambiguous: true };
   886	  return null;
   887	}
   888	
   889	const SAME_BUT = [/^\s*(?:and\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?,?\s+but\s+(.+)$/, /^\s*(?:a\s+|i\s+)?(?:to\s+)?samo,?\s+ale\s+(.+)$/,
   890	  /^\s*(?:a\s+|i\s+)?tak samo,?\s+ale\s+(.+)$/];
   891	/** "same but only file names" / "to samo ale tylko nazwy plików": modifier for the previous command. */
   892	export function sameBut(query, ctx) {
   893	  if (!ctx?.last) return null;
   894	  const fq = fold(query);
   895	  const lastSlots = Object.fromEntries(Object.entries(ctx.last.slots || {}).filter(([, v]) => !isAmbiguous(v)));
   896	  for (const re of SAME_BUT) if (re.test(fq)) return { lastIntent: ctx.last.intent, lastSlots };
   897	  return null;
   898	}
   899	
   900	function intentUses(intent, ent) {
   276	    method = 'history-rule';
   277	  }
   278	  if (sb) {
   279	    const it = BY_ID[intent];
   280	    for (const [k, v] of Object.entries(validHistorySlots(sb.lastSlots))) {
   281	      if (usesSlot(it, k) && slots[k] == null && !['namepat', 'sedexpr'].includes(k)) { slots[k] = v; r.sources[k] = 'history'; }
   282	    }
   283	    finalizeSlots(it, slots);
   284	  }
   285	  let b = buildCommand(intent, query, { env, resolved: slots, blank: [...blank] });
   286	  // implicit reference: a required slot is still missing and the history has a value of that type.
   287	  // Only for safe intents: a destructive command ("delete the folder") is never aimed at a history
   288	  // value without an explicit reference word ("delete it"), which goes through resolveReference.
   289	  if (ctx && b.missing.length && ref?.rule !== 'refused' && BY_ID[intent].risk === 'safe' && b.risk === 'safe') {
   290	    const filled = [];
?? review/r4-claude.md
?? review/r4-codex.md

codex
The regenerated classifier/tagger data matches the existing build files byte-for-byte, both rebuilt trigger tables match the shipped artifacts, and evaluation reproduces EVAL.md. The stale-artifact finding is fixed. I also reproduced the earlier default-path bug through “same but”: it drops an unresolved `$DIR` and produces a complete deletion command rooted at `.`.

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js'; import {buildContext} from './src/history.js';
const BASH={shell:'bash',os:'linux',coreutils:'gnu'};
for(const h of [['rm -r old','ls newdir'],['find \""'$DIR" -type f -iname "*.log" -delete'"']]) {
 const query=h.length===2?'same but force':'same but delete txt files';
 const r=suggest(query,{env:BASH,history:h});console.log(JSON.stringify({query,h,intent:r.intent,command:r.command,missing:r.missing,critical:r.critical,risk:r.risk,warnings:r.warnings,context:r.context,slots:r.slots}));
}
for(const [h,q,env] of [
 ['ls ~/Downloads | sort | grep pdf','delete it',BASH],
 ['ls C:\\\\Users\\\\me\\\\Downloads -Recurse -Include *.tmp','delete it',{shell:'powershell',os:'win32',coreutils:'gnu'}],
 ['Get-ChildItem -LiteralPath C:\\\\Users\\\\me\\\\Downloads -Depth 2','delete it',{shell:'powershell',os:'win32',coreutils:'gnu'}],
 ['tellsh list directory /tmp/build','delete them',BASH],
 ['tellsh show directory contents /tmp/build','delete them',BASH],
 ['tellsh --dry-run delete folder /tmp/old','delete it',BASH]
]){const r=suggest(q,{env,history:[h]});console.log(JSON.stringify({h,q,command:r.command,missing:r.missing,critical:r.critical,context:r.context}));}
JS
nl -ba src/history.js | sed -n '427,445p;640,663p;779,807p'
nl -ba scripts/teacher.js | sed -n '112,132p'
nl -ba src/compose.js | sed -n '494,520p'" in /workspace/tellsh
 succeeded in 232ms:
{"query":"same but force","h":["rm -r old","ls newdir"],"intent":"delete_dir","command":"rm -r old","missing":[],"critical":false,"risk":"high","warnings":["rm deletes files permanently (no trash)"],"context":{"used":true,"commands":2,"rule":"same-but","note":"modifies previous delete_dir"},"slots":{"path":"old"}}
{"query":"same but delete txt files","h":["find \"$DIR\" -type f -iname \"*.log\" -delete"],"intent":"delete_by_ext","command":"find . -type f -iname '*.txt' -delete","missing":[],"critical":false,"risk":"high","warnings":["bulk deletion via find/xargs"],"context":{"used":true,"commands":1,"rule":"same-but","note":"modifies previous delete_by_ext"},"slots":{"glob":"*.txt"}}
{"h":"ls ~/Downloads | sort | grep pdf","q":"delete it","command":"rm -r ~/Downloads","missing":[],"critical":false,"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"dir\" from history = ~/Downloads"}}
{"h":"ls C:\\Users\\me\\Downloads -Recurse -Include *.tmp","q":"delete it","command":"Remove-Item -LiteralPath 'C:\\Users\\me\\Downloads' -Recurse","missing":[],"critical":false,"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"dir\" from history = C:\\Users\\me\\Downloads"}}
{"h":"Get-ChildItem -LiteralPath C:\\Users\\me\\Downloads -Depth 2","q":"delete it","command":"Remove-Item -LiteralPath 'C:\\Users\\me\\Downloads' -Recurse","missing":[],"critical":false,"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"dir\" from history = C:\\Users\\me\\Downloads"}}
{"h":"tellsh list directory /tmp/build","q":"delete them","command":"rm -r /tmp/build","missing":[],"critical":false,"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"dir\" from history = /tmp/build"}}
{"h":"tellsh show directory contents /tmp/build","q":"delete them","command":"rm -r /tmp/build","missing":[],"critical":false,"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"dir\" from history = /tmp/build"}}
{"h":"tellsh --dry-run delete folder /tmp/old","q":"delete it","command":"rm -r /tmp/old","missing":[],"critical":false,"context":{"used":true,"commands":1,"rule":"pronoun","note":"\"dir\" from history = /tmp/old"}}
   427	      if (target != null && !isAmbiguous(target) && !isRelativePath(target) && target !== '-') e.dir = target;
   428	      else e.dir = AMB + (target ?? '-');
   429	      delete e.file;
   430	    }
   431	    if (e.dir !== undefined) { searchDir = !!e.searchDir; listDir = !!e.listDir; }
   432	    // `ls ~/Downloads | grep pdf`, `gci DIR | Where-Object …`: the listed directory was filtered, so what
   433	    // the user saw are entries inside it
   434	    else if (segIdx > 0 && split.segments[segIdx - 1].sep === '|' && at.dir === segIdx - 1 && FILTER_HEADS.has(head)) searchDir = true;
   435	    delete e.searchDir;
   436	    delete e.listDir;
   437	    for (const key of Object.keys(e)) at[key] = segIdx;
   438	    Object.assign(ents, e); // later segments supersede earlier ones
   439	  });
   440	  if (inv && cdAt < 0) {
   441	    // the whole line is a catalog/variant command: its slots are the most precise reading
   442	    intent = inv.intent; slots = inv.slots; ambiguous = inv.ambiguous;
   443	    const ie = {};
   444	    entsFromSlots(intent, slots, ie);
   445	    for (const key of Object.keys(ie)) at[key] = split.segments.length;
   640	    }
   641	    if (a.cd) cdAfter = true;
   642	    if (!last && a.intent) last = { intent: a.intent, slots: a.slots, age: i, ambiguous: !!a.ambiguous, skipped: newerUses };
   643	    if (!last && (a.opaque || Object.keys(a.ents).length)) newerUses = true;
   644	    if (current == null && a.ents.current && !isAmbiguous(a.ents.current)) current = a.ents.current;
   645	    for (const t of ENT_TYPES) {
   646	      if (a.ents[t] == null) continue;
   647	      if (ents[t] == null) { ents[t] = a.ents[t]; recency[t] = i; pos[t] = a.at?.[t] ?? 0; }
   648	      const v = String(a.ents[t]);
   649	      if (!(all[t] ??= []).includes(v)) {
   650	        all[t].push(v);
   651	        if (t === 'dir' && a.searchDir) searchRoots.add(v); // its newest use was as a search root
   652	        if (t === 'dir' && a.listDir) listedDirs.add(v); // ... or as a listing
   653	      }
   654	    }
   655	  });
   656	  const byType = (a, b) => ENT_TYPES.indexOf(a) - ENT_TYPES.indexOf(b);
   657	  const entOrder = Object.keys(ents).sort((a, b) => recency[a] - recency[b] || byType(a, b));
   658	  const refOrder = Object.keys(ents).sort((a, b) => recency[a] - recency[b] || pos[b] - pos[a] || byType(a, b));
   659	  const ctx = { n: recent.length, ents, all, currentBranch: current, entOrder, refOrder, searchRoots, listedDirs, last, cwdFlags: cwdFlags(cwd) };
   660	  ctx.features = ctxFeatures(ctx);
   661	  return ctx;
   662	}
   663	
   779	/**
   780	 * Deterministic resolution. Returns null, or
   781	 *   { rule: 'same-for', intent, slots, note }   (full override, slots to merge over the previous ones)
   782	 *   { rule: 'pronoun', intent|null, fill: {slot: value}, ent, note }
   783	 *   { rule: 'refused', intent|null, ent?, note }  (the referenced value is ambiguous: nothing is filled)
   784	 */
   785	export function resolveReference(query, ctx) {
   786	  if (!ctx || !ctx.n) return null;
   787	  const arg = sameFor(query);
   788	  if (arg && ctx.last) {
   789	    const rt = retarget(ctx.last.intent, arg);
   790	    // "what about this": no new argument at all, nothing to retarget
   791	    if (!rt && !arg.trim().split(/\s+/).some((w) => !PRONOUN_WORD.test(fold(w)) && !isStopWord(fold(w)))) {
   792	      return { rule: 'refused', intent: null, stop: true, note: `"${arg}" does not name a new target for the previous ${ctx.last.intent}; not guessing` };
   793	    }
   794	    // a newer line used other targets: replaying the older changing command for a new target is a guess
   795	    if (rt && ctx.last.skipped && BY_ID[ctx.last.intent].risk !== 'safe') {
   796	      return { rule: 'refused', intent: null, stop: true, note: `the newest command that tellsh can repeat (${ctx.last.intent}) is not the previous command; not guessing` };
   797	    }
   798	    if (rt) {
   799	      const slots = { ...ctx.last.slots, [rt.slot]: rt.value };
   800	      const amb = Object.entries(slots).find(([, v]) => isAmbiguous(v));
   801	      if (amb) return { rule: 'refused', intent: ctx.last.intent, blank: [amb[0]], note: `previous ${ctx.last.intent} has ${amb[0]}=${rawOf(amb[1])}, which depends on the shell state; not guessing` };
   802	      if (rt.slot === 'ext') delete slots.glob;
   803	      if (rt.slot === 'name') delete slots.namepat;
   804	      return { rule: 'same-for', intent: ctx.last.intent, slots, changed: rt.slot, note: `same as previous ${ctx.last.intent} with ${rt.slot}=${rt.value}` };
   805	    }
   806	  }
   807	  if (!hasPronoun(query) || !ctx.entOrder.length) return null;
   112	const heldOutSet = () => heldOutIndex(heldOutTexts(ROOT));
   113	
   114	/**
   115	 * Training rows filtered as gen_data.js filters them: held-out texts (and their near-duplicates) are never
   116	 * sent to the teacher, and rows dropped in data/teacher/decisions.jsonl are not mined from.
   117	 */
   118	function trainingRows(held = heldOutSet()) {
   119	  const dropped = new Set(readJsonl(join(TDIR, 'decisions.jsonl')).filter((d) => d.text && d.action === 'drop').map((d) => normalize(d.text)));
   120	  return [...readDir(join(ROOT, 'data', 'intents')).map((r) => ({ ...r, src: `intents/${r.file}` })),
   121	    ...readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell/train.jsonl' }))]
   122	    .filter((r) => !held.has(r.text) && !dropped.has(normalize(r.text)));
   123	}
   124	
   125	// ---------------------------------------------------------------------------------------------
   126	// (a) verify every training row
   127	async function verify() {
   128	  const rng = mulberry32(+arg('seed', 5));
   129	  const rows = trainingRows().slice(0, +arg('limit', 1e9));
   130	  const items = rows.map((r) => {
   131	    const o = intentOptions(r.text, r.intent, r.shell, r.os, rng);
   132	    return { r, o, qs: { i: intentQ(r.text, r.shell, o.opts), k: riskQ(r.text) } };
   494	  if (tn === 'find') {
   495	    parts.splice(1, 0, qp(paths[0] || '.'));
   496	    if (ex.ext && !used.includes('-name')) parts.push(used.includes('-iname') ? '-iname' : '-name', q(`*.${ex.ext}`));
   497	    if (ex.duration) parts.push(ex.duration.age.split(' ')[0], ex.duration.age.split(' ')[1]);
   498	    if (ex.size) parts.push('-size', (/\b(smaller|less|under|below|mniejsz|ponizej)\b/.test(fq) ? '-' : '+') + ex.size);
   499	    // move -maxdepth right after the path (find warns otherwise)
   500	    const i = parts.indexOf('-maxdepth');
   501	    if (i > 2) { const v = parts.splice(i, 2); parts.splice(2, 0, ...v); }
   502	  } else if (tn === 'grep') {
   503	    let pat = patternOf?.() ?? null;
   504	    // "search for ~/foo in src": the word right after "search for" is the pattern even when it looks
   505	    // like a path (it must not become a search path, and ~ must stay literal)
   506	    const lead = query.match(/(?:search(?:ing)? for|look(?:ing)? for|grep(?: for)?|szukaj|wyszukaj)\s+(["'„]?)([^\s"'”]+)\1/i)?.[2];
   507	    if (lead && paths.includes(lead)) pat = lead;
   508	    if (!pat) return null;
   509	    if (ex.ext && used.includes('-r')) parts.push(`--include=${q(`*.${ex.ext}`)}`);
   510	    parts.push('--', q(pat));
   511	    // the pattern is never also a search path (`search for ~/foo in src` -> grep -- '~/foo' src)
   512	    const searchPaths = paths.filter((x) => x !== pat && x !== String(pat).trim());
   513	    if (searchPaths.length) parts.push(...searchPaths.map(qp));
   514	    else if (used.includes('-r')) parts.push('.');
   515	  } else if (tn === 'tar') {
   516	    const arch = paths.find((x) => /\.(tar(\.\w+)?|tgz|tbz2?|txz)$/.test(x));
   517	    if (!arch) return null;
   518	    parts.push('-f', qp(arch));
   519	    const rest = paths.filter((x) => x !== arch && !(used.includes('-C') && x === paths[1]));
   520	    if (used.includes('-c')) parts.push('--', ...(rest.length ? rest : ['.']).map(qp));

exec
/bin/bash -lc "node --input-type=module <<'JS'
for (const file of ['danger','parity','slots','compose','regressions3','regressions3-history','regressions3-render']) await import("'`./test/${file}.test.js`);
JS' in /workspace/tellsh
 succeeded in 1038ms:
TAP version 13
# Subtest: critical: rm -rf /
ok 1 - critical: rm -rf /
  ---
  duration_ms: 22.376263
  ...
# Subtest: critical: rm -rf /*
ok 2 - critical: rm -rf /*
  ---
  duration_ms: 6.309277
  ...
# Subtest: critical: sudo rm -rf ~
ok 3 - critical: sudo rm -rf ~
  ---
  duration_ms: 0.27149
  ...
# Subtest: critical: rm -fr *
ok 4 - critical: rm -fr *
  ---
  duration_ms: 0.14293
  ...
# Subtest: critical: rm -r -f $HOME
ok 5 - critical: rm -r -f $HOME
  ---
  duration_ms: 0.253278
  ...
# Subtest: critical: rm -rf --no-preserve-root /
ok 6 - critical: rm -rf --no-preserve-root /
  ---
  duration_ms: 0.17709
  ...
# Subtest: critical: mkfs.ext4 /dev/sda1
ok 7 - critical: mkfs.ext4 /dev/sda1
  ---
  duration_ms: 1.381107
  ...
# Subtest: critical: dd if=/dev/zero of=/dev/sda bs=1M
ok 8 - critical: dd if=/dev/zero of=/dev/sda bs=1M
  ---
  duration_ms: 0.225156
  ...
# Subtest: critical: echo x > /dev/sda
ok 9 - critical: echo x > /dev/sda
  ---
  duration_ms: 0.182912
  ...
# Subtest: critical: cat img > /dev/nvme0n1
ok 10 - critical: cat img > /dev/nvme0n1
  ---
  duration_ms: 0.190445
  ...
# Subtest: critical: chmod -R 777 /
ok 11 - critical: chmod -R 777 /
  ---
  duration_ms: 0.400141
  ...
# Subtest: critical: sudo chown -R nobody /
ok 12 - critical: sudo chown -R nobody /
  ---
  duration_ms: 0.152343
  ...
# Subtest: critical: :(){ :|:& };:
ok 13 - critical: :(){ :|:& };:
  ---
  duration_ms: 0.295631
  ...
# Subtest: critical: crontab -r
ok 14 - critical: crontab -r
  ---
  duration_ms: 0.179346
  ...
# Subtest: critical: mv ~/.ssh /dev/null
ok 15 - critical: mv ~/.ssh /dev/null
  ---
  duration_ms: 1.377987
  ...
# Subtest: high: curl -s https://x.sh | sh
ok 16 - high: curl -s https://x.sh | sh
  ---
  duration_ms: 0.444477
  ...
# Subtest: high: wget -qO- http://x | sudo bash
ok 17 - high: wget -qO- http://x | sudo bash
  ---
  duration_ms: 5.364495
  ...
# Subtest: high: rm notes.txt
ok 18 - high: rm notes.txt
  ---
  duration_ms: 0.348834
  ...
# Subtest: high: git push --force
ok 19 - high: git push --force
  ---
  duration_ms: 0.172318
  ...
# Subtest: high: git reset --hard HEAD~3
ok 20 - high: git reset --hard HEAD~3
  ---
  duration_ms: 0.213432
  ...
# Subtest: high: docker system prune -a
ok 21 - high: docker system prune -a
  ---
  duration_ms: 0.325835
  ...
# Subtest: high: find . -name "*.o" -delete
ok 22 - high: find . -name "*.o" -delete
  ---
  duration_ms: 0.395479
  ...
# Subtest: high: pkill node
ok 23 - high: pkill node
  ---
  duration_ms: 0.137866
  ...
# Subtest: high: shutdown -h now
ok 24 - high: shutdown -h now
  ---
  duration_ms: 0.09651
  ...
# Subtest: safe: ls -lah
ok 25 - safe: ls -lah
  ---
  duration_ms: 0.131128
  ...
# Subtest: safe: df -h
ok 26 - safe: df -h
  ---
  duration_ms: 0.073297
  ...
# Subtest: safe: du -h -d 1 . 2>/dev/null | sort -rh | head -n 10
ok 27 - safe: du -h -d 1 . 2>/dev/null | sort -rh | head -n 10
  ---
  duration_ms: 0.121583
  ...
# Subtest: safe: git status
ok 28 - safe: git status
  ---
  duration_ms: 0.119757
  ...
# Subtest: safe: ps aux --sort=-%cpu | head -n 10
ok 29 - safe: ps aux --sort=-%cpu | head -n 10
  ---
  duration_ms: 0.127992
  ...
# Subtest: safe: find . -type f -iname '*.log'
ok 30 - safe: find . -type f -iname '*.log'
  ---
  duration_ms: 0.378935
  ...
# Subtest: safe: grep -rn -- TODO .
ok 31 - safe: grep -rn -- TODO .
  ---
  duration_ms: 0.126488
  ...
# Subtest: safe: curl -s -o /dev/null -w '%{http_code}\\n' https://x.org
ok 32 - safe: curl -s -o /dev/null -w '%{http_code}\\n' https://x.org
  ---
  duration_ms: 0.130761
  ...
# Subtest: medium escalations
ok 33 - medium escalations
  ---
  duration_ms: 0.383449
  ...
# Subtest: risk is never lowered
ok 34 - risk is never lowered
  ---
  duration_ms: 0.149972
  ...
# Subtest: fnv1a matches known vectors
ok 35 - fnv1a matches known vectors
  ---
  duration_ms: 0.571992
  ...
# Subtest: normalize folds Polish diacritics and digits
ok 36 - normalize folds Polish diacritics and digits
  ---
  duration_ms: 0.353099
  ...
# Subtest: classifier models (tool + intent) match Python probabilities
ok 37 - classifier models (tool + intent) match Python probabilities
  ---
  duration_ms: 18.56728
  ...
# Subtest: tagger matches Python probabilities
ok 38 - tagger matches Python probabilities
  ---
  duration_ms: 5.114195
  ...
# Subtest: number words EN/PL
ok 39 - number words EN/PL
  ---
  duration_ms: 7.889284
  ...
# Subtest: sizes
ok 40 - sizes
  ---
  duration_ms: 1.301723
  ...
# Subtest: durations
ok 41 - durations
  ---
  duration_ms: 0.91357
  ...
# Subtest: ports, pids, urls, hosts, quoted
ok 42 - ports, pids, urls, hosts, quoted
  ---
  duration_ms: 2.069711
  ...
# Subtest: extensions
ok 43 - extensions
  ---
  duration_ms: 0.312563
  ...
# Subtest: paths and named locations
ok 44 - paths and named locations
  ---
  duration_ms: 0.695935
  ...
# Subtest: slot cases produce the exact expected command
ok 45 - slot cases produce the exact expected command
  ---
  duration_ms: 30.363883
  ...
# Subtest: missing required slots are reported with placeholders
ok 46 - missing required slots are reported with placeholders
  ---
  duration_ms: 0.433389
  ...
# Subtest: composer: an operand starting with - never becomes an option (r1 Major 2)
ok 47 - composer: an operand starting with - never becomes an option (r1 Major 2)
  ---
  duration_ms: 30.171098
  ...
# Subtest: composer validation unquotes words: a quoted option is still an option
ok 48 - composer validation unquotes words: a quoted option is still an option
  ---
  duration_ms: 6.809486
  ...
# Subtest: composer: user filter value (duplicate case removed, r1 Minor 10)
ok 49 - composer: user filter value (duplicate case removed, r1 Minor 10)
  ---
  duration_ms: 20.6704
  ...
# Subtest: composer: file names do not trigger flags; numbers bind to their trigger
ok 50 - composer: file names do not trigger flags; numbers bind to their trigger
  ---
  duration_ms: 22.040387
  ...
# Subtest: composer: grep compositions validate (`--` before the pattern)
ok 51 - composer: grep compositions validate (`--` before the pattern)
  ---
  duration_ms: 20.787358
  ...
# Subtest: CLI: output piped into a closed pipe exits cleanly (no EPIPE crash)
ok 52 - CLI: output piped into a closed pipe exits cleanly (no EPIPE crash)
  ---
  duration_ms: 318.962092
  ...
# Subtest: whole-disk phrases never become the target of a changing command
ok 53 - whole-disk phrases never become the target of a changing command
  ---
  duration_ms: 75.441564
  ...
# Subtest: a path with trailing punctuation is a placeholder for changing commands
ok 54 - a path with trailing punctuation is a placeholder for changing commands
  ---
  duration_ms: 11.149418
  ...
# Subtest: history: "delete them" after a search never targets the search root
ok 55 - history: "delete them" after a search never targets the search root
  ---
  duration_ms: 43.33235
  ...
# Subtest: history: the later segment of a compound line wins across entity types
ok 56 - history: the later segment of a compound line wins across entity types
  ---
  duration_ms: 4.002025
  ...
# Subtest: history: request verbs are not target hints (newest target wins)
ok 57 - history: request verbs are not target hints (newest target wins)
  ---
  duration_ms: 8.517045
  ...
# Subtest: history: a note never claims a history value the command does not use
ok 58 - history: a note never claims a history value the command does not use
  ---
  duration_ms: 1.161852
  ...
# Subtest: history: `ls /a /b` + "it" is the last argument
ok 59 - history: `ls /a /b` + "it" is the last argument
  ---
  duration_ms: 6.021769
  ...
# Subtest: pwshNativeSlots finds every slot of a native command
ok 60 - pwshNativeSlots finds every slot of a native command
  ---
  duration_ms: 0.654932
  ...
# Subtest: PowerShell: a later native slot with " is refused (tar -C, tar path)
ok 61 - PowerShell: a later native slot with " is refused (tar -C, tar path)
  ---
  duration_ms: 5.815172
  ...
# Subtest: wrapper commands are looked through (timeout, chroot, stdbuf, env, nice, xargs, ...)
ok 62 - wrapper commands are looked through (timeout, chroot, stdbuf, env, nice, xargs, ...)
  ---
  duration_ms: 0.946975
  ...
# Subtest: paths like /. // /./ /etc/.. are normalised to /
ok 63 - paths like /. // /./ /etc/.. are normalised to /
  ---
  duration_ms: 0.39702
  ...
# Subtest: recursive delete of system directories and key home directories is consistently critical
ok 64 - recursive delete of system directories and key home directories is consistently critical
  ---
  duration_ms: 0.628176
  ...
# Subtest: mv of a system or home directory is critical; ordinary moves stay safe
ok 65 - mv of a system or home directory is critical; ordinary moves stay safe
  ---
  duration_ms: 0.301926
  ...
# Subtest: docker -v=/:/h and --mount=…source=/ mount the host root
ok 66 - docker -v=/:/h and --mount=…source=/ mount the host root
  ---
  duration_ms: 5.817902
  ...
# Subtest: composer: grep patterns are quoted literally and never reused as a search path
ok 67 - composer: grep patterns are quoted literally and never reused as a search path
  ---
  duration_ms: 49.239433
  ...
# Subtest: composer: git log --author always gets a value (or is not emitted)
ok 68 - composer: git log --author always gets a value (or is not emitted)
  ---
  duration_ms: 24.132981
  ...
# Subtest: composer validation rejects command substitution and expansions
ok 69 - composer validation rejects command substitution and expansions
  ---
  duration_ms: 21.662258
  ...
# Subtest: cmd: a value starting with / is fine when glued to a switch (findstr /c:), refused standalone
ok 70 - cmd: a value starting with / is fine when glued to a switch (findstr /c:), refused standalone
  ---
  duration_ms: 1.913668
  ...
# Subtest: cmd: an embedded / is never left unquoted (foo/q is not read as foo /q)
ok 71 - cmd: an embedded / is never left unquoted (foo/q is not read as foo /q)
  ---
  duration_ms: 0.675721
  ...
1..71
# tests 71
# suites 0
# pass 71
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 897.165311

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';import {buildContext,analyzeCommand} from './src/history.js';
for (const [h,q] of [
[['systemctl stop nginx; ls newdir'],'same for redis'],
[['kill 1111; ls newdir'],'same for 2222'],
[['rm -r old','ls newdir'],'same but force'],
[['rm -r old','echo hi > new.txt'],'same for /srv/new'],
[['rm -r old','cat notes.txt; clear'],'same for /srv/new'],
]){const r=suggest(q,{env:{shell:'bash',os:'linux',coreutils:'gnu'},history:h});console.log(JSON.stringify({h,q,command:r.command,missing:r.missing,context:r.context,understood:r.understood,ctx:buildContext(h).last}));}
JS
nl -ba src/history.js | sed -n '372,385p;439,458p'
git diff --numstat 0d87457 -- src/history.js" in /workspace/tellsh
 succeeded in 221ms:
{"h":["systemctl stop nginx; ls newdir"],"q":"same for redis","command":"sudo systemctl stop redis","missing":[],"context":{"used":true,"commands":1,"rule":"same-for","note":"same as previous service_stop with service=redis"},"understood":true,"ctx":{"intent":"service_stop","slots":{"service":"nginx"},"age":0,"ambiguous":false,"skipped":false}}
{"h":["kill 1111; ls newdir"],"q":"same for 2222","command":"kill 2222","missing":[],"context":{"used":true,"commands":1,"rule":"same-for","note":"same as previous kill_by_pid with pid=2222"},"understood":true,"ctx":{"intent":"kill_by_pid","slots":{"pid":"1111"},"age":0,"ambiguous":false,"skipped":false}}
{"h":["rm -r old","ls newdir"],"q":"same but force","command":"rm -r old","missing":[],"context":{"used":true,"commands":2,"rule":"same-but","note":"modifies previous delete_dir"},"understood":true,"ctx":{"intent":"delete_dir","slots":{"path":"old"},"age":1,"ambiguous":false,"skipped":true}}
{"h":["rm -r old","echo hi > new.txt"],"q":"same for /srv/new","command":null,"missing":[],"context":{"used":true,"commands":2,"rule":"refused","note":"the newest command that tellsh can repeat (delete_dir) is not the previous command; not guessing"},"understood":false,"ctx":{"intent":"delete_dir","slots":{"path":"old"},"age":1,"ambiguous":false,"skipped":true}}
{"h":["rm -r old","cat notes.txt; clear"],"q":"same for /srv/new","command":null,"missing":[],"context":{"used":true,"commands":2,"rule":"refused","note":"the newest command that tellsh can repeat (delete_dir) is not the previous command; not guessing"},"understood":false,"ctx":{"intent":"delete_dir","slots":{"path":"old"},"age":1,"ambiguous":false,"skipped":true}}
   372	  let ents = {};
   373	  let intent = null;
   374	  let slots = {};
   375	  let ambiguous = false;
   376	  const t = line.trim();
   377	  const k = lineKind(t, kind);
   378	  if (TELLSH_LINE.test(t)) {
   379	    const q = tellshQuery(t, k);
   380	    const r = q && classify ? classify(q) : null;
   381	    if (r?.intent) { intent = r.intent; slots = { ...(r.slots || {}) }; entsFromSlots(intent, slots, ents); }
   382	    return { line: t, intent, slots, ents, at: {}, ...(isSearchRoot(intent, slots, ents) ? { searchDir: true } : {}), fromTellsh: true, ambiguous };
   383	  }
   384	  const split = splitCommand(t, k, { keepRedirects: true });
   385	  if (!split.ok) {
   439	  });
   440	  if (inv && cdAt < 0) {
   441	    // the whole line is a catalog/variant command: its slots are the most precise reading
   442	    intent = inv.intent; slots = inv.slots; ambiguous = inv.ambiguous;
   443	    const ie = {};
   444	    entsFromSlots(intent, slots, ie);
   445	    for (const key of Object.keys(ie)) at[key] = split.segments.length;
   446	    if (ie.dir !== undefined) { searchDir = isSearchRoot(intent, slots, ie); listDir = !searchDir && ['ls', 'find'].includes(FAMILY_OF[intent]); }
   447	    ents = { ...ents, ...ie };
   448	  } else if (segIntent) {
   449	    intent = segIntent; slots = { ...segSlots };
   450	    if (segIntentAt < cdAt) staleRelative({}, slots);
   451	  }
   452	  if (Object.values(slots).some(isAmbiguous)) ambiguous = true;
   453	  return { line: t, intent, slots, ents, at, ambiguous, ...(searchDir && ents.dir != null ? { searchDir: true } : {}),
   454	    ...(listDir && !searchDir && ents.dir != null ? { listDir: true } : {}), ...(cdAt >= 0 ? { cd: true } : {}) };
   455	}
   456	
   457	// pipeline stages that filter the entries of a listing piped into them
   458	const FILTER_HEADS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ack', 'ag', 'findstr', 'select-string', 'sls', 'where-object', 'where', '?']);
403	139	src/history.js

codex
The review is complete. The remaining runtime findings are the default-path fallback, stale-command replay, and incomplete tracking of listed or filtered directories. I also found a smaller training issue: the teacher filter omits the hand-written slot cases, leaving 11 rows eligible for submission that training generation correctly excludes.

codex
Found **1 blocker, 2 major issues, and 1 minor issue**.

1. **Blocker — “Same but” still replaces an ambiguous deletion path with `.`.** [src/history.js:895](/workspace/tellsh/src/history.js:895), [src/pipeline.js:278](/workspace/tellsh/src/pipeline.js:278)  
   History `find "$DIR" -type f -iname "*.log" -delete`, followed by `same but delete txt files`, produces:
   ```sh
   find . -type f -iname '*.txt' -delete
   ```
   It reports `missing: []` and `critical: false`. `sameBut()` discards ambiguous slots without marking them withheld, restoring the catalog default. The previous blocker remains reachable. Preserve ambiguity and render a placeholder or refuse.

2. **Major — Stale destructive commands remain replayable.** [src/history.js:892](/workspace/tellsh/src/history.js:892), [src/history.js:448](/workspace/tellsh/src/history.js:448)  
   After `['rm -r old', 'ls newdir']`, `same but force` produces `rm -r old`, despite `ctx.last.skipped: true`. Separately, history `kill 1111; ls newdir` followed by `same for 2222` produces `kill 2222`: recency checks do not account for later segments when selecting the replayable intent. Apply the stale-command guard to both replay forms and track intent recency within compound lines.

3. **Major — Listing protections still allow deletion of the entire parent directory.** [src/history.js:382](/workspace/tellsh/src/history.js:382), [src/history.js:434](/workspace/tellsh/src/history.js:434)  
   Reproduced:
   - `tellsh list directory /tmp/build` → `delete them` → `rm -r /tmp/build`.
   - `ls ~/Downloads | sort | grep pdf` → `delete it` → `rm -r ~/Downloads`.

   Both have complete slots and are not critical. Earlier `tellsh` listings omit `listDir`; filtered pipelines are recognized only when the filter immediately follows the directory-producing segment. Preserve listing/search provenance through both paths.

4. **Minor — Teacher filtering omits the hand-written slot evaluation cases.** [scripts/teacher.js:112](/workspace/tellsh/scripts/teacher.js:112)  
   Unlike `gen_data.js`, the teacher calls `heldOutTexts(ROOT)` without `SLOT_CASES`. Its current filter admits **11 rows** excluded by the generator’s fuller index, including `chmod 755 deploy.sh` and `make run.sh executable`. Use the same exclusion index throughout. This does **not** establish leakage into the shipped model; generation filters these rows correctly.

Prior fixes verified include the reported punctuation-path cases, PowerShell later-slot checks, composer quoting/options, typed-reference recency, literal tildes, history auto-run protection, and teacher retry accounting. Training fixes cover emission-time exclusions, calibration grouping, replacement pools, complete-gold scoring, and filtered composer input.

The stale-artifact finding is **fixed**: generation reproduced the existing classifier/tagger build files byte-for-byte; rebuilt trigger tables matched shipped artifacts; model counts match **31,534 classifier rows / 34,434 tagged sequences**; evaluation reproduced EVAL.md.

**Validation:** 71 selected tests and 12 additional in-memory regression tests passed. Filesystem/subprocess restrictions blocked some broader checks. Generation and evaluation writes were intercepted in memory. No files were modified.

VERDICT: REQUEST_CHANGES
tokens used
173,964
Found **1 blocker, 2 major issues, and 1 minor issue**.

1. **Blocker — “Same but” still replaces an ambiguous deletion path with `.`.** [src/history.js:895](/workspace/tellsh/src/history.js:895), [src/pipeline.js:278](/workspace/tellsh/src/pipeline.js:278)  
   History `find "$DIR" -type f -iname "*.log" -delete`, followed by `same but delete txt files`, produces:
   ```sh
   find . -type f -iname '*.txt' -delete
   ```
   It reports `missing: []` and `critical: false`. `sameBut()` discards ambiguous slots without marking them withheld, restoring the catalog default. The previous blocker remains reachable. Preserve ambiguity and render a placeholder or refuse.

2. **Major — Stale destructive commands remain replayable.** [src/history.js:892](/workspace/tellsh/src/history.js:892), [src/history.js:448](/workspace/tellsh/src/history.js:448)  
   After `['rm -r old', 'ls newdir']`, `same but force` produces `rm -r old`, despite `ctx.last.skipped: true`. Separately, history `kill 1111; ls newdir` followed by `same for 2222` produces `kill 2222`: recency checks do not account for later segments when selecting the replayable intent. Apply the stale-command guard to both replay forms and track intent recency within compound lines.

3. **Major — Listing protections still allow deletion of the entire parent directory.** [src/history.js:382](/workspace/tellsh/src/history.js:382), [src/history.js:434](/workspace/tellsh/src/history.js:434)  
   Reproduced:
   - `tellsh list directory /tmp/build` → `delete them` → `rm -r /tmp/build`.
   - `ls ~/Downloads | sort | grep pdf` → `delete it` → `rm -r ~/Downloads`.

   Both have complete slots and are not critical. Earlier `tellsh` listings omit `listDir`; filtered pipelines are recognized only when the filter immediately follows the directory-producing segment. Preserve listing/search provenance through both paths.

4. **Minor — Teacher filtering omits the hand-written slot evaluation cases.** [scripts/teacher.js:112](/workspace/tellsh/scripts/teacher.js:112)  
   Unlike `gen_data.js`, the teacher calls `heldOutTexts(ROOT)` without `SLOT_CASES`. Its current filter admits **11 rows** excluded by the generator’s fuller index, including `chmod 755 deploy.sh` and `make run.sh executable`. Use the same exclusion index throughout. This does **not** establish leakage into the shipped model; generation filters these rows correctly.

Prior fixes verified include the reported punctuation-path cases, PowerShell later-slot checks, composer quoting/options, typed-reference recency, literal tildes, history auto-run protection, and teacher retry accounting. Training fixes cover emission-time exclusions, calibration grouping, replacement pools, complete-gold scoring, and filtered composer input.

The stale-artifact finding is **fixed**: generation reproduced the existing classifier/tagger build files byte-for-byte; rebuilt trigger tables matched shipped artifacts; model counts match **31,534 classifier rows / 34,434 tagged sequences**; evaluation reproduced EVAL.md.

**Validation:** 71 selected tests and 12 additional in-memory regression tests passed. Filesystem/subprocess restrictions blocked some broader checks. Generation and evaluation writes were intercepted in memory. No files were modified.

VERDICT: REQUEST_CHANGES
