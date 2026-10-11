I fixed all four majors and committed them as `12bb087` on `master`. Nothing was pushed. All 396 tests pass, and `npm run eval` gives the same numbers as before.

**The four fixes**
1. **Command substitution** (`src/danger.js`): `$(…)` and backticks anywhere outside single quotes, including inside double quotes, are now high risk. So are `<(…)` and `>(…)`. `ls "$(rm -rf ~)"`, `` ls `npx evil` `` and `echo "$(unknown-program)"` all come back high now. `$((5 + 4))` (arithmetic) is not counted as a substitution, but `$(( $(id -u) + 1 ))` is.
2. **Unknown programs** (`src/danger.js`): the "expression fragment" exemption is gone, and a program has to match the allowlist exactly as typed. `7z …`, `.hidden …`, `./ls`, `/tmp/x/ls` and `C:\t\ls.exe` are all high. The pieces of the catalog's own PowerShell commands (like `$_.Name`, `.Count`, `[math]::Round`) are now written into the generated allowlist. Three value shapes are matched by pattern instead: a number, a list item like `'a',`, and `$env:NAME`.
3. **`--env` dropping arguments** (`src/fill.js`): `deploy worker --env staging --config other.toml` now gives `npx wrangler deploy --env staging <ARGS>`, with `args` in missing.
4. **Conflicting `--repo`** (`src/fill.js`): two `--repo` values, `a/b or c/d`, `a/b#42 --repo c/d`, or a PR URL from a different repo than `--repo` all give `--repo <REPO>`. This holds even when the PR number is given.

**Other changes you should know about**
- **Two catalog commands changed**, because otherwise they would be flagged by the new rules:
  - **Linux battery** (bash and fish) now uses `upower -i /org/freedesktop/UPower/devices/DisplayDevice` instead of `"$(upower -e | grep -m1 BAT)"`. On a machine with more than one battery, it reports the combined device rather than the first battery.
  - **PowerShell `journal_service`** now filters with `-Match ([regex]::Escape(…))` instead of `-Like ('*' + … + '*')`. The old version would have put a bare `*` on the allowlist, which in bash runs the first file in the folder.
  - I haven't run either new command on a real system. The tests only check the generated text.
- **Two existing tests adjusted:**
  - `test/regressions25.test.js` now accepts the substitution warning for intents that are already high risk. That covers `docker stop $(docker ps -q)`.
  - In `test/regressions.test.js`, the "piped to bash" check now passes with zero cases. The old battery command was the only catalog command containing `"`, so that code path has no catalog coverage now.
- **New behaviour to be aware of:** a harmless substitution typed during an edit, like `echo "$(date)"`, now needs an explicit "yes". So does any backtick in a PowerShell edit, since it is PowerShell's escape character. I listed this under Known limits in EVAL.md.
- **Measured effect:** the dev-tools eval is 294 / 324 exact, the same as before. Outside the two changed commands, the only rendered output that changed is the PowerShell `journal_service` with a `<SERVICE>` placeholder. It went from medium to safe, because the old command was wrongly read as a file redirect.

**Housekeeping**
- The regression tests are in `test/regressions26.test.js`, and EVAL.md has a new paragraph describing this round.
- The repo has no git identity set, so I committed as `lksrz <lukasz@wearfits.com>`, the same author as the earlier commits, for this commit only.
- I left `review/STATUS` (with its `CLOSEDONE` change) and the untracked `review/close2-fix.md` uncommitted; neither was mine.
