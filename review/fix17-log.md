I fixed all four Major findings from round 17 and committed them as `d7bc315`. Nothing was pushed. All 351 tests pass, including the new `test/regressions19.test.js`, and every eval number is the same as before.

**What changed:**
1. **`cd` after `gh pr view N`** (`src/history.js`): after a trailing `cd`, `pushd` or `popd`, the previous PR number is treated as ambiguous. So after `gh pr view 7 && cd ../other`, `… && cd /` or `…; popd`, "merge that pr" gives `gh pr merge <PR>`. `cd ../other && gh pr view 7` still gives `gh pr merge 7`, since the PR is from the repository you're now in. I also applied this to branches: "delete that branch" after `git merge feat; cd /` gives `git branch -d <BRANCH>`.
2. **Phrases that pick out a different PR** (`src/pipeline.js`): "merge the other pr", "the latest pr", "the newest pr", "the most recent pr", "my last pr", "another pr", "the first pr" and similar phrases now give `<PR>`. This also holds when history has a PR, because "the other pr" can't mean that one. "merge the pr" and "merge the current pr" still give a bare `gh pr merge`.
3. **`GH_REPO` / `GH_HOST`**: these now count as pointing `gh` at another repository, whether written as a prefix, via `env`, or with `export` earlier in the line. After `GH_REPO=other/repo gh pr view 45`, "merge that pr" gives `gh pr merge <PR>`.
4. **Repository named in the request** (`src/fill.js` plus the `gh pr` view/checks/merge templates): the repository is now kept rather than dropped. "merge pr 45 in repository other/repo", `--repo other/repo` and `-R other/repo` all give `gh pr merge 45 --repo other/repo`. A repository it can't read ("in another repo", "in repo v2") gives `--repo <REPO>`. Because `gh` needs a PR named when `--repo` is used, "merge pr --repo a/b" gives `<PR> --repo a/b`. "merge that pr in repo a/b" does not reuse the PR from history, since that PR belongs to this repository.

**Minor findings I also fixed:**
- "close that pr", "close pr 45" and "zamknij ten pr" are now refused, instead of suggesting `gh pr create --fill` or `gh pr view 45`.
- When reading history, `-c`, `-a` and `-e` on `gh pr view/review/comment` are treated as plain switches, so `gh pr view -c 7` is read as PR 7.

**Two older tests changed on purpose** (`test/regressions17.test.js`): "merge pr in repo v2" now also withholds the repository (`gh pr merge <PR> --repo <REPO>`), and "close pr for issue 45" is now refused instead of giving `gh pr view <PR>`.

**Not done:** `checkout pr 7` still gives `gh pr checks 7`, and `merge it` after `git checkout feat` still gives `git branch -d feat`. Both were already known from earlier rounds. The training/eval split problem in `scripts/real/prepare_real.js` (packages like `npm install express` vs `react` landing in different groups) is also still open, because fixing it means regenerating the split.

I added a round-18 note to `EVAL.md` along with fresh bench results, and updated the PR section of the README. `review/fix17-log.md` was untracked and empty, so I left it out of the commit. No git identity is configured on this machine, so I made the commit as `lksrz <lukasz@wearfits.com>`, the author of the earlier commits, without changing any git config.
