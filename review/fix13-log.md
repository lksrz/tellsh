I fixed both Major findings from Codex's round-13 review and the two cheap Claude Minors, and committed them as `7d2264c`. Nothing was pushed or published. All 333 tests pass, and history still reads only the previous line.

**1. Quoted pull request targets are no longer dropped** (`src/fill.js`)
- `merge pull request "feature/login"` and `'feature/login'` now give `gh pr merge feature/login` in bash, PowerShell and cmd. Before, all of these gave a bare `gh pr merge`.
- A quoted URL or number is kept too: `view pull request "https://github.com/o/r/pull/9"`, `merge pr "123"`.
- A quoted value that isn't a valid number, URL or branch (`"foo bar"`, `"x;rm -rf /"`, `""`) gives `gh pr merge <PR>` and is reported as missing.

**2. Commands run on another machine no longer resolve "kill it"** (`src/history.js`)
- These wrappers are now handled like `nsenter`, so every value from that history line is ambiguous: `systemd-run --machine=…` / `-M` / `--host=…` / `-H`, `run0 --machine=…`, `sudo --host=…` and `machinectl shell`.
- After `systemd-run --machine=web ps -p 42`, "kill it" gives `kill <PID>` instead of a local `kill 42`. Ports are withheld the same way.
- Without those options it still resolves: `systemd-run ps -p 42`, `run0 ps -p 42` and `sudo -H ps -p 42` all give `kill 42`.

**Minors:**
- **Wrong word picked as the PR target:** words like status, github, by, quickly and me are no longer read as the target.
  - `check pr status` now gives `gh pr checks`, and `view pull request on github` gives `gh pr view`.
  - A word that could be a branch name but has no digit, `/`, `-`, `_`, `.` or `#` is now withheld rather than dropped. For example, `merge pr main` gives `gh pr merge <PR>`. This is stricter than Claude suggested, because dropping the word would merge the current branch's pull request. After "branch", "for" or "from" the word is kept (`merge pull request from bob` gives `gh pr merge bob`).
- **pip extras without a version:** `install requests[socks] with pip` now gives `python3 -m pip install 'requests[socks]'` instead of `<PKG>` (`src/pipeline.js`). An unsafe value inside the brackets still gives `<PKG>`.

**Checks:**
- **Tests:** the new tests are in `test/regressions15.test.js`, covering all three shells and the cases above.
- **Eval:** the numbers are exactly the same before and after the change.
- **Bench:** I re-ran it (warm p50 0.44 ms, cold p50 178 ms) and it updated the table in `EVAL.md`.
- **Docs:** `EVAL.md` has a new "Round 14" note, and `README.md` covers quoted PR targets and the machine/host wrappers.

Git had no author identity set, so I committed as `lksrz <lukasz@wearfits.com>` to match your earlier commits. I passed it for this one commit only and didn't change your git config. I left `review/fix13-log.md` (empty, untracked) and `review/STATUS` alone, since the separate status commits normally update them.
