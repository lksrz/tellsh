I fixed all three Major findings from the round-11 reviews and committed them as `03f69e2`. Nothing was pushed or published. All 325 tests pass, and history still reads only the previous line.

**1. `pkexec` and `run0` now count as changing the directory** (`src/history.js`, `src/danger.js`)
- Any `pkexec` prefix is treated as moving to another directory. So `pkexec cat notes.txt` + "delete it" is refused (`rm <FILE>`), and so is `pkexec --user bob …`, also behind `nohup`.
- `run0` with `-D`, `--chdir=…`, `-u` or `--user=…` (attached or separate value) now makes relative history values ambiguous. I also included `-i`/`--via-shell`, to be safe.
- I added `run0`'s value-taking options to `WRAPPER_OPTARG`, so they are read correctly. Plain `run0 cat notes.txt` and `run0 --nice=5 cat notes.txt` (root, same directory) still give `rm notes.txt`.
- Absolute paths still resolve: `pkexec cat /tmp/abs.txt` gives `rm /tmp/abs.txt`. Danger checks still flag `run0 -u bob rm -rf /` and `pkexec rm -rf /` as critical.

**2. Redirects inside a subshell get the same guard as relative paths** (`src/history.js`)
- `(cd /repo && echo hi > notes.txt)` + "delete it" is now refused. The same holds for `>>`, `2>` and `pushd`.
- These still resolve, correctly: `(cd /repo && cat notes.txt) > out.txt` gives `rm out.txt`, because the redirect opens in the user's own directory. `{ cd /repo && echo hi > notes.txt; }` and absolute targets also still resolve.

**3. The hybrid keeps an explicit model rejection** (`src/rerank/hybrid.js`)
- When the neural model rejects a request (high `pNone`), the result is now marked as "not a shell request". That stops the low-confidence composer from answering in its place. Before, `list directories recursively with sizes` with `pNone 0.99` returned `understood: true` with `ls -l -R`; now it returns `understood: false` and no command.

**Tests:** the new tests are in `test/regressions13.test.js`, and all three fail on the old code.

**Eval, bench and docs:**
- The eval numbers are identical to before. The hybrid eval runs with the composer off, so this fix doesn't move its numbers. The new test covers the shipped setup with the composer on.
- I re-ran the bench and the numbers in `EVAL.md` are updated (cold start p50 168.8 ms).
- I added a Round 12 note to `EVAL.md`, a line on rejections to `HYBRID.md`, and the new wrapper and redirect cases to the README.

**Not fixed:** the round-11 Minors and Nits (the `bash -c` string, `cp -t`, the `lm_rerank.py` resume, `daemonize`, `sudo -uDave`, shortened `sudo` options), since you asked for the Majors only.

**Commit author:** git had no identity set, so I made the commit as `lksrz <lukasz@wearfits.com>`, the author on the earlier commits. I didn't change the git config. The empty `review/fix11-log.md` was already untracked and I didn't commit it.
