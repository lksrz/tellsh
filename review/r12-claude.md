The round-11 fixes are correct and I found no new blocker or major. All 325 tests pass (`npm test`). I checked about 40 history lines with "delete it" and ran a handful of `checkDanger` and hybrid cases. The repo was not changed; the scratch script lives in `/tmp/r12p`.

**Round-11 Majors: all fixed**
- **`pkexec`** (`src/history.js:613`, `CWD_WRAPPERS`; `:631`): any `pkexec` prefix now refuses "delete it" and gives `rm <FILE>`. This covers the `/usr/bin/pkexec` path, `--user bob`, a preceding `nohup`, and `sudo pkexec`. Absolute paths still resolve: `pkexec cat /tmp/a` gives `rm /tmp/a`.
- **`run0`** (`src/history.js:610`; `src/danger.js:88`): these are now refused:
  - `-D`, `-D/srv`, `--chdir=` and `--chdir /srv`
  - `-u bob`, `-uroot`, `--user=` and `--user bob`
  - `-i` and `--via-shell`

  Options that don't change the directory still resolve to `rm notes.txt`, which is correct: `--nice=5`, `-g wheel`, `--setenv=`, `--property=`, `--background=`. `checkDanger` rates `run0 -u bob rm -rf /` and `run0 -D / rm -rf *` as `high`.
- **Redirects inside a subshell** (`src/history.js:500`): these are refused:
  - `(cd /repo && echo hi > notes.txt)`
  - the `>notes.txt`, `&>`, `1>`, `>|`, `2>` and `>>` forms
  - a nested `( … )`
  - `exec >`, a trailing `&`, `| cat`
  - `$( … )` and `<( … )`

  These still resolve correctly:
  - `(cd /repo && …) > out.txt` gives `rm out.txt`.
  - `{ cd /repo && echo hi > notes.txt; }` gives `rm notes.txt`.
  - `(cd /repo) ; echo hi > notes.txt` gives `rm notes.txt`.
  - `(cd /repo && echo hi > notes.txt) && cat notes.txt` gives `rm notes.txt`, which is right because the last `cat` runs in the user's own directory.
- **Hybrid rejection** (`src/rerank/hybrid.js:57`): when the encoder rejects, `topTool` is set to `__none__`, and the composer's guard at `src/pipeline.js:338` honours it. The catalog-side composer (`src/pipeline.js:559`) only runs on a confident catalog answer, so a rejected result can't reach it. The A+C policies have no `none` threshold, so they keep their old behaviour. The test with an accepting encoder still answers, so the fix doesn't over-reject.

## Findings

### Minor (carried over, not regressions)
1. **A `bash -c` string becomes one file name:** `bash -c "cd /r && echo > notes.txt"` + "delete it" gives `rm 'cd /r && echo > notes.txt'`. The base commit did the same, and the command just fails rather than deleting the wrong file.
2. **`cp -t /etc a` is rated `safe`** (`src/danger.js:284-289`).
3. **`scripts/hybrid/lm_rerank.py:203`** resumes scoring keyed only by `(set, i)`, with no check that the model, prompt or candidates changed. This only affects training and evaluation.
4. **A quoted argument containing request text becomes one path** (`src/shellwords.js:219-221`), as reported last round.

### Nits
5. **`run0 --user=root cat notes.txt` and `run0 -uroot …` are refused** even though root keeps the user's directory. It only refuses more often than needed (`src/history.js:610`).
6. Still present from last round: shortened `sudo` long options (`--logi`, `--chd`) aren't recognised, and `daemonize` / `start-stop-daemon` without `--chdir` (which run in `/`) aren't scoped.

VERDICT: APPROVE
