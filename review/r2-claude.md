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
