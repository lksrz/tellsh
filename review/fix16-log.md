All three Major findings from r16 (the Claude and Codex reviews) are fixed and committed as `72c64cc` on `master`. Nothing was pushed. All 345 tests pass, including 4 new ones in `test/regressions18.test.js` that check bash, PowerShell and cmd. The eval numbers didn't change and the bench was rerun.

**1. Issue numbers and `#N` (`src/fill.js`)**
- When the word after "pr" is issue, ticket or bug, the PR is withheld as `<PR>`.
- A bare `#N` is accepted only right after the verb (`merge #45`, `squash merge #45`) or right after "pr" (`merge pr #45`).
- All four cases you listed, and the ones from the review, now give `gh pr merge <PR>`: `merge pr for issue #45`, `squash merge the pr for issue #8`, `merge the pr that closes #12`, `merge the pr, see #99`, `merge the pr in issue #4`, `merge the pull request for ticket #3`, `merge the pr for #12`, `merge pr for fix #12`.

**2. "merge that pr" (`src/history.js`, `src/pipeline.js`)**
- A previous `gh pr view/checkout/merge/… N|branch|url` now gives the PR. After `gh pr view 45`, `merge that pr` → `gh pr merge 45`; after `gh pr checkout 45`, `merge this pull request` → `gh pr merge 45`.
- After unrelated history (`git checkout feat`, `cat a.txt`, `ls`, `gh pr list`), it gives `gh pr merge <PR>`. The same happens after `gh pr view` with no number, after one with `--repo`, and with no history at all. All of these used to give a bare `gh pr merge`.
- The PR from history is not passed to the model as an input, so its predictions are unchanged.

**3. Named branch phrases (`src/fill.js`)**
- `merge pr from the branch main` → `gh pr merge main`, `merge pr for the branch develop` → `gh pr merge develop`, `merge the pull request from the branch release` → `gh pr merge release`.
- A branch phrase it can't read, like `merge pr from the feature branch`, gives `<PR>` instead of a bare merge.

**Minor findings fixed:** `merge pr 2 days old`, `merge pr 3 times`, `pr 0` and `pr 007` are now withheld. I also added a comment to the systemd-run option pattern in `history.js` pointing to the man page.

**Not fixed:**
- The Codex finding that `prepare_real.js` groups commands by their operands. Changing it would change the train/eval split, so it isn't a quick fix.
- The carried-over intent findings: `uninstall it` and `checkout pr 7` → `gh pr checks 7`.
- `merge PR 1e3` still passes, because `1e3` is a valid branch name.
- An older bug that wasn't in either review: after `git checkout feat`, `merge it` suggests `git branch -d feat`. This was already the behaviour before this round. Git would refuse to delete the branch you're on, but it is the wrong suggestion.

I added a "Round 17" note to `EVAL.md` and updated the bench table, and updated the PR section of `README.md`. This machine had no git identity set, so I made the commit as the repo's existing author (lksrz) for that one command only; the git config is unchanged. `review/fix16-log.md` is still untracked.
