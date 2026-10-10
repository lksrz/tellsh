I fixed all the Major findings from both r10 reviews and committed them as `33d2e50`. Nothing was pushed or published. All 322 tests pass. History still reads only one line back.

**1. `sudo` login shells and `sudo --chroot`** (`src/history.js`, `src/danger.js`)
- A login shell starts in the target user's home, so relative paths from that command are now treated as unclear, the same way as `sudo -D`. This covers:
  - `sudo -i`, `sudo --login` and clusters like `sudo -iu bob`
  - `runuser -l` / `--login`
  - `su -`, which wasn't in the reviews but has the same problem
- `sudo --chroot=DIR`, `--chroot DIR` and `-R DIR` now make every value unclear, like `chroot`.
- `sudo -i cat notes.txt` + "delete it" is now refused and gives `rm <FILE>`.
- Absolute paths still resolve, and plain `sudo` / `sudo -u bob` work as before.

**2. `cd` inside `( … )`** (`src/shellwords.js`, `src/history.js`)
- The command splitter now records which subshells each part of a line runs in.
- After a `cd` or `pushd` inside a subshell, relative values later in that same subshell are treated as unclear. `(cd /repo && cat notes.txt)` + "delete it" is now refused.
- These still resolve as before:
  - absolute paths, e.g. `(cd /repo && cat /tmp/a.txt)` → `rm /tmp/a.txt`
  - commands after the subshell closes, e.g. `(cd /repo); cat notes.txt` → `rm notes.txt`
  - `{ … }` groups and a plain `cd`, which move the user's own shell
- This only applies to bash-style shells. In PowerShell a `cd` inside parentheses does persist, so it is left alone there.

**3. Wrangler** (`src/catalog.js`)
- `npx wrangler tail`, `login` and `whoami` are now `medium` risk, so `--yes` never runs them.
- An older test in `test/devtools.test.js` required `wrangler_tail` to be `safe`. I updated it to expect `medium`.

**Tests, eval and bench**
- The new regression tests are in `test/regressions12.test.js` (4 tests). The wrangler one checks that every `npx wrangler` intent is above `safe`, and that `--yes` exits with status 4 when nothing is on PATH.
- Eval: every number is unchanged (intent top-1 95.4%, history 92.5%).
- Bench was rerun and its table in `EVAL.md` refreshed. Warm-path times stayed under 1 ms at p50, but cold start went from 180.8 to 189.5 ms at p50 and from 198 to 329 ms at p95. The plain `node -e 0` startup baseline also rose from 83.8 to 111.6 ms, which points to a slower machine during this run rather than the change.
- I added a "Round 11" section to `EVAL.md` and updated the matching risk and history-scope wording in `README.md`.

**Not done**
- The Minor findings and nits in both reviews are still open: `sh -c` strings, quoted request text, `cp -t`, `rsync`, `systemd-run` and the `lm_rerank.py` resume check.
- The empty, untracked `review/fix10-log.md` was left out of the commit.
- Git has no identity set on this machine, so I made the commit with the author already used in this repo's history (`lksrz <lukasz@wearfits.com>`), without changing any git config.
