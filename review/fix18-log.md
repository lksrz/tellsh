I fixed all six Major findings from round 18 and committed them as `3d30f59`. Nothing was pushed or published. All 358 tests pass, including the new `test/regressions20.test.js`. Every eval number is the same as before, and I re-ran the bench. History is still read only 1 line back.

**The Major fixes:**
1. **"Close" requests** (`src/pipeline.js`): "close" is now refused for every `gh pr` request, including when the classifier picks merge. So "close pr 45 and delete branch", "close pr 45 without merge", "close pr 45, do not merge" and "decline and close pr 45" all get "closing a pull request is not supported" and no command. It's only let through when the request also asks for a merge without negating it, as in "merge and close pr 45" → `gh pr merge 45`.
2. **Repository written as `OWNER/REPO`** (`src/fill.js`): "merge pr 7 in other/repo", "of org/repo", "from org/repo", "to org/repo", "on github.com/org/repo" and "on https://github.com/org/repo" now keep `--repo`. `org/repo#7` gives `gh pr merge 7 --repo org/repo`. One exception: right after "pr for" or "pr from" the word is still read as a branch, so "view the pr for feature/login" is unchanged.
3. **`export GH_REPO=…` after `gh pr view 45`** (`src/history.js`): the 45 is now treated as ambiguous, so "merge that pr" gives `gh pr merge <PR>`. The same applies to `GH_HOST`, `declare -x`, and PowerShell `$env:GH_REPO="a/b"`, which wasn't detected before when written without spaces.
4. **A later `gh pr view` / `gh pr list` / `gh pr status`** (`src/history.js`): these now cancel an earlier `45`, so "merge that pr" gives `<PR>`.
5. **Refused references** (`src/pipeline.js`): a refused pull request reference now always keeps `<PR>`. After `gh pr view 45; env`, "merge that pr" was giving a bare `gh pr merge`; it now gives `gh pr merge <PR>`.
6. **A PR picked out by who or when** (`src/fill.js`): "merge the pull request by alice", "merge the pr from yesterday", "the pr that fixes login" and "opened last week" now give `<PR>`. "merge the pr" and "merge pr now" still act on the current branch's PR.

**Minor findings I also fixed:**
- **Negated or undone merges:** "do not merge pr 45", "don't merge pr 45" and "unmerge pr 45" no longer give `gh pr merge`. "revert pr 45" and "cancel pr 45" are refused instead of giving `gh pr view 45`.
- **`--repo` values starting with `-`** are withheld as `<REPO>`.
- **"for the repo" / "in my current repo"** now mean the current repository instead of producing a `<REPO>` placeholder.
- **Exported scope is now per tool:** `GH_REPO` only affects `gh`, `GIT_*` only affects git.

**Two older tests changed on purpose:** "merge PR by bob" (`test/regressions15.test.js`), plus "view pr from yesterday" and "merge pr from fork" (`test/regressions16.test.js`), expected a bare command. That is exactly what r18 flags as Major, so they now expect `<PR>`.

**Docs:** I added a round-19 note and the bench results to `EVAL.md`. In the README's known gaps I noted that negation is only checked for PR merges: `do not delete a.txt` still suggests `rm a.txt`.

**Not done:**
- "merge org/repo#7" with no "pr" in it gives `git clone <URL>`, because the classifier picks the wrong command. With "pr" it works.
- Three older known issues are unchanged:
  - `checkout pr 7` still gives `gh pr checks 7`.
  - "merge it" after `git checkout feat` still gives `git branch -d feat`.
  - The train/eval split problem in `scripts/real/prepare_real.js` is still open, since fixing it means regenerating the split.
- `cd` into a subdirectory still hides the branch from history. That is the safe direction, so I left it.

`review/fix18-log.md` is untracked and empty, so I left it out of the commit. No git identity is configured here, so I committed as `lksrz <lukasz@wearfits.com>`, like the earlier commits, without changing git config.
