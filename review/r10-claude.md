I found two Major issues, so I'm requesting changes. All 318 tests pass. I tried about 60 cases against `suggest()` and `checkDanger()` at three commits: HEAD, `246793b` (the commit just before HEAD) and the base `0d87457`. I didn't change the repo; my scratch scripts are in `/tmp/r10`.

**Round 9 fixes: all correct.**
- `wrangler_dev` is now `medium` risk, so `--yes` won't auto-run it.
- Attached short options scope a history command: `git -C/repo`, `git -Cfoo`, `docker -Htcp://…` and `docker -cprod`. Plain flags don't: `git -c…`, `docker -D`, `docker -l`.
- Wrappers that change the directory work through every prefix I tried: `env -C`, `--chdir` and `sudo -D`, also behind `time`, `nohup`, `timeout`, `xargs`, `/usr/bin/env` or `VAR=`. So do the root-changing wrappers (`chroot`, `proot`, `firejail`, `unshare -R`, `nsenter --root`).
- Absolute paths still resolve, and a later segment in the user's own directory (`env -C /repo rm -f notes.txt; touch notes.txt`) correctly gives `rm notes.txt`.
- **Training scripts:** `export_data.js` writes the dev-text list and drops the matching training rows. `train_a_dev.sh` checks that list exists, and its extra `grep -q` confirms the sed edit went in. `readFileSync` and `normalize` are already imported in `gen_data.js`, so the inserted line works.

## Findings

### Major
1. **`sudo -i` / `sudo --login` no longer keeps the history value scoped: a regression since the base commit** (`src/history.js:594`, `WRAPPER_CWD.sudo`; the unwrap change is somewhere in this diff).
   - `sudo -i` starts a login shell, which runs in the target user's home directory. A relative path in that command names a file there, not here.
   - | History line | "delete it" at base | At HEAD (and at `246793b`) |
     |---|---|---|
     | `sudo -i cat notes.txt` | `rm <FILE>` | `rm notes.txt` |
     | `sudo --login cat notes.txt` | `rm <FILE>` | `rm notes.txt` |
     | `sudo -u bob -i cat notes.txt` | – | `rm notes.txt` |
   - If the current directory also has a `notes.txt`, the wrong file is deleted. This is the same kind of problem as the `sudo -D` Major fixed last round.
   - The cluster form `sudo -iu bob` is still refused. `runuser -l` has the same gap.
   - **Fix:** treat `-i` / `--login` (also inside a cluster) as `'cwd'`, e.g. `sudo: /^-[a-zA-Z]*[Di]|^--(?:chdir|login)(?:=|$)/`. Do the same for `runuser -l` / `--login`.

2. **A `cd` inside a subshell is treated as if it changed the user's directory** (`src/history.js:506-513` and `:546`, the `cdAt` handling).
   - These all give `rm notes.txt`, and "show it" gives `cat notes.txt`:
     - `(cd /repo && cat notes.txt)`
     - `(cd /repo; cat notes.txt)`
     - `( cd /repo && cat notes.txt )`
     - `(cd /repo && touch notes.txt)`
   - A `cd` inside `( … )` doesn't last after the subshell ends. The file is `/repo/notes.txt`, but `rm` would run in the user's current directory, so it can delete a different file with the same name.
   - The code already handles this correctly for `cd … && cd -`, `cd ..` and `pushd … popd`; only the subshell form is missed.
   - This was already wrong at base, but it is the same kind of problem as the round-9 `env -C` Major, and `history.js` was reworked heavily in this diff.
   - `{ cd /repo && cat notes.txt; }` correctly gives `rm notes.txt`, because a `{ … }` group runs in the user's own shell.
   - **Fix:** when a `cd`/`pushd` happens inside parentheses, mark relative values ambiguous, the same way `wrapCwd` does. Keep absolute paths: `(cd /repo && cat /tmp/a.txt)` → `rm /tmp/a.txt` is already correct.

### Minor
3. **The string passed to `sh -c` / `bash -c` becomes a single file name.** `bash -c "cat notes.txt"` + "delete it" gives `rm 'cat notes.txt'`. `sh -c "cd /repo && cat notes.txt"` gives `rm 'cd /repo && cat notes.txt'`. The quoted name almost never exists, so the command just fails. It was the same at base. The value should be ambiguous. Compare `su - bob -c "…"`, which is correctly refused.
4. **Round-9 Minors are still open:**
   - **Request text in a quoted argument still becomes one path** (`src/shellwords.js:219-221`): `delete "notes.txt and report.pdf"` gives `rm 'notes.txt and report.pdf'`.
   - **The separator check uses the first `/`, not the last** (same lines): `delete "build/ and /tmp"` gives `rm -r 'build/ and /tmp'`.
   - **`cp -t` / `--target-directory` onto a system path** (`src/danger.js:284-289`): `cp -t /etc /tmp/passwd` gets risk `safe` with no warning, and `cp /tmp/passwd /etc/` gets a warning but isn't critical. These can only be reached by editing the command at the confirm prompt.

### Nits
5. `systemd-run` without `--working-directory` or `--same-dir` runs the command in `/` (or `~` with `--user`). So `systemd-run cat notes.txt` is out of scope, but "delete it" still resolves it as a local file. In practice the original command would have failed, so the user is unlikely to refer back to it.
6. `rsync /tmp/x /etc/passwd` → risk `safe` (still no check, carried over from round 9).
7. `train_a_dev.sh` puts `$DEV_TEXTS` inside a single-quoted JS string and a `#`-delimited sed expression. A repo path containing `'` or `#` would break the sed edit. The `grep -q` checks would catch the failure.
8. B is still trained on the 98 rows that duplicate dev texts. This is disclosed in HYBRID.md and EVAL.md, so it's acceptable.

VERDICT: REQUEST_CHANGES
