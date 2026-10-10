I'm requesting changes: one Major remains, the same kind of problem as last round's `sudo -i` Major, in two wrappers the round-10 fix didn't cover.

All 322 tests pass. I tested about 55 history lines against HEAD, and some of them against the base commit `0d87457` (extracted with `git archive` into `/tmp/r11c`). The repo was not changed.

**Round 10 fixes: all correct.**
- **Login shells:** these now refuse "delete it" and give `rm <FILE>`:
  - `sudo -i`, `--login` and `-iu bob`, also behind `nohup`, `xargs` or `time`, and with a preceding `cd`
  - `sudo -Hi` and `-E -i`
  - `runuser -l` / `--login`
  - `su -` and `su --login`
- **Not over-applied:** plain `sudo cat notes.txt` and `sudo cat -i notes.txt` still give `rm notes.txt`.
- **Absolute and `~` paths** still resolve: `sudo -i cat /tmp/a.txt` gives `rm /tmp/a.txt`. `sudo -i cat ~/notes.txt` gives `rm ~/notes.txt`, which is correct because the user's shell expanded `~` before `sudo` ran.
- **`sudo --chroot` / `-R`:** every value is now ambiguous.
- **Subshells:** `(cd /repo && cat notes.txt)` is refused. These still resolve, correctly:
  - `(cd /repo) && cd /y && cat notes.txt`
  - `(cd /repo && make); (cat notes.txt)`
  - `x=$(cd /repo; pwd); cat notes.txt`
  - `{ cd /repo && cat notes.txt; }`
  - `(cd /repo && cat notes.txt) > out.txt` gives `rm out.txt`. That is right: the redirect opens in the user's own directory.
- **Wrangler:** `npx wrangler` `tail`, `login` and `whoami` are now `medium` risk, so `--yes` won't run them.

## Findings

### Major
1. **`pkexec` and `run0` still move the command to another directory without the value being marked ambiguous. Both are regressions since the base commit.** (`src/history.js:597-605` `WRAPPER_CWD`, `src/danger.js:87` `WRAPPER_OPTARG`)

   | History line | "delete it" at base | At HEAD |
   |---|---|---|
   | `pkexec cat notes.txt` | `rm <FILE>` (refused) | `rm notes.txt` |
   | `pkexec --user bob cat notes.txt` | – | `rm notes.txt` |
   | `run0 --chdir=/srv cat notes.txt` | `rm <FILE>` (refused) | `rm notes.txt` |
   | `run0 --user=bob cat notes.txt` | – | `rm notes.txt` |

   - **`pkexec`:** it always changes to the target user's home before running the command (from my recollection of polkit's `pkexec.c`; not checked against the source here). So `pkexec cat notes.txt` showed `/root/notes.txt`, but "delete it" would delete `./notes.txt`. This is exactly the `sudo -i` case fixed last round.
   - **`run0`:** `-D` / `--chdir` sets the directory. Without it, `run0` uses the target user's home whenever the target isn't root (per its man page). `WRAPPER_OPTARG` has no `run0` entry, so the attached `--chdir=…` / `--user=…` forms unwrap cleanly and aren't scoped. The separate-value forms (`run0 -D /srv …`, `run0 -u bob …`) only get refused by accident, because the value is read as the command.
   - **Fix:**
     - Add `pkexec: /./` (any `pkexec` prefix counts as `'cwd'`), or simply treat `pkexec` like the other wrappers that always change directory.
     - Add `run0: /^-[a-zA-Z]*[Du]|^--(?:chdir|user)(?:=|$)/` to `WRAPPER_CWD`.
     - Add `run0: /^-[uDg]$|^--(?:user|group|chdir|…)$/` to `WRAPPER_OPTARG`.

### Minor
2. **`sh -c` / `bash -c` string still becomes a single file name** (open since r10): `bash -c "cd /repo && cat notes.txt"` + "delete it" gives `rm 'cd /repo && cat notes.txt'`. It was the same at base, and the command just fails rather than deleting the wrong file.
3. **Other open Minors carried over:**
   - Request text in a quoted argument becomes one path (`src/shellwords.js:219-221`).
   - `cp -t /etc` is rated `safe` (`src/danger.js:284-289`).
   - `scripts/hybrid/lm_rerank.py:203` resumes scoring keyed only by `(set, i)`, with no check that the model or candidates changed. This only affects training and evaluation.

### Nits
4. `daemonize …` and `start-stop-daemon --start …` (without `--chdir`) run the command in `/`, yet "delete it" now gives `rm notes.txt` (base refused it). In practice the original command would have failed, so the user is unlikely to refer back to it. Same category as the r10 `systemd-run` nit.
5. The `sudo` scope regex `^-[a-zA-Z]*[Di]` also matches a value attached to another option: `sudo -uadmin cat notes.txt` and `sudo -uDave …` are refused even though the user's directory doesn't change. This only makes it refuse more often, and base refused these too.
6. `sudo` accepts shortened long options (`--logi`, `--chd`, `--chr`), and these aren't recognised: `sudo --logi cat notes.txt` gives `rm notes.txt`. They're rarely typed.

VERDICT: REQUEST_CHANGES
