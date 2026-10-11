Both destructive majors are fixed and committed as `f837f07` on `master`, with regression tests. Nothing was pushed. All 433 tests pass and the eval numbers didn't change.

**1. Extract requests no longer create or overwrite the archive**
- `extract archive.tar.gz`, `untar …`, `unpack …`, `decompress …` and `rozpakuj …` now give `tar -xzvf archive.tar.gz`, and `… to /tmp` gives `-C /tmp`. Before, they gave `tar -c -z -f archive.tar.gz -- .`, which overwrites the archive.
- The second-pass composer (`src/pipeline.js`) can no longer replace an extract command with one that creates or rewrites an archive: `tar -c/-r/-u/-A`, `--create`, `czf`, `zip`, `7z a`, or `gzip` without `-d`.
- As a backstop, a final check in `src/guards.js` refuses any such command for an extract request in English or Polish.

**2. A protected PID is never killed**
- `kill 1234 but keep 5678`, `kill 1234 and leave 5678 running` and `zabij 1234, nie ruszaj 5678` now give `kill 1234`. Before, they gave `kill 5678`.
- Numbers after keep / leave / spare / except / not / zostaw / nie ruszaj / oprócz and similar words are removed from the PID choices. If no other PID is left, the result is `kill <PID>` (e.g. `kill the process but keep 5678`).
- A final check refuses any kill command that still names a protected number.

**Behaviour changes**
- One existing test (`test/regressions29.test.js`) was changed. `kill 1234 and not 5678` used to pick 5678 and then be refused; now it gives `kill 1234`, which the guard's own comment already called correct. The test now accepts either a refusal or `kill 1234`, and fails on anything that kills 5678.
- `kill python except pid 1234` is still refused.

**Checks**
- **Tests:** 433/433 pass, including 5 new ones in `test/regressions30.test.js`.
- **Eval:** `npm run eval` numbers are unchanged. Across 3,808 unique requests from all the eval sets, no command or risk level changed; the copy without the fix still showed both bugs.
- **Bench:** warm latency is 0.478 ms, the same as before. Only the latency table in `EVAL.md` was refreshed.

**Known limits** are now in both `README.md` and `EVAL.md`. All of these give a complete command with no warning:
- **pip `-t` glued:** `pip install requests -t/tmp/pkgs` drops the target.
- **Quoted workspace with a space:** `in workspace "staging app"` becomes `--workspace staging`.
- **ssh `-L` 4-part spec:** `-L 127.0.0.1:8080:db.internal:5432` becomes `-L 8080:localhost:8080`, the wrong remote host and port.
- **`~` inside quotes:** `--target ~/packages` becomes `'~/packages'`. While checking this I found `$HOME/…` is quoted too, so the docs only recommend an absolute path.
- **Other open findings I added:**
  - `kill 1234 5678` gives `kill 5678`.
  - `pull all branches` gives `git branch -a`, because some composer flags were dropped when the composer data was rebuilt (read-only).
  - `kill 1234` is misread as `pkill -9 -f <NAME>`, with a placeholder.
  - The protection words are closed English and Polish lists, so other phrasings may not be caught.

Git had no identity configured here, so I committed as `lksrz <lukasz@wearfits.com>` (the author of earlier commits) without changing the git config. As in earlier rounds, `review/STATUS` and the empty `review/close6-fix.md` are left uncommitted.
