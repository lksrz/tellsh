I'm requesting changes. The fix16 changes do what they claim: issue numbers and `#N` in another clause are withheld, "merge that pr" now reads the PR from a previous `gh pr view/checkout/merge N`, and "from the branch X" is parsed. All 345 tests pass. But one new path merges PR N in the wrong repository, and the "never a bare merge when a PR is referred to" rule still has holes.

I tested by calling `suggest()` directly from scratch scripts in `/tmp/r17`. I extracted `2dfca9d` (before fix16) into `/tmp/r17/old` with `git archive` to check which problems are older. No tracked files were changed.

## Major

**M1 — `src/history.js:521` (`staleRelative`) with the new `pr` entity at `src/history.js:790-796`: a `cd` after `gh pr view N` still hands out N.**
- **Cause:** a `cd`/`pushd`/`popd` segment calls `staleRelative(ents, null)`, which only marks `file` and `dir` as stale. The new `pr` entity survives, even though which repository a PR number refers to depends on the working directory.
- **Examples:** each gives a complete command with `missing=[]`:
  - after `gh pr view 7 && cd ../other` → `merge that pr` → `gh pr merge 7`. That merges PR #7 of a different repository.
  - after `gh pr view 7 && cd /` → `gh pr merge 7`
  - after `gh pr view 7; popd` → `gh pr merge 7`
- **Inconsistency:** the wrapper and subshell forms are already withheld (`env -C ../x gh pr view 7` and `(cd ../x && gh pr view 7)` → `<PR>`), and a file is too (after `cat a.txt && cd ..`, "delete that file" → `rm <FILE>`). Only the plain trailing `cd` slips through.
- **Suggested fix:** in the `CD_HEADS` branch, also mark `ents.pr` as ambiguous (a PR number or branch name is meaningful only in the cwd's repository). Add a regressions18 case for it.

**M2 — `src/pipeline.js:96` (`PR_REFERENCE`): other ways of naming a specific PR still give a bare `gh pr merge` (the current branch's PR).**
- **Examples:** each gives `gh pr merge` with `missing=[]`:
  - `merge the other pr`
  - `merge the latest pr`
  - `merge the newest pr`
  - `merge the most recent pr`
  - `merge my last pr` (also after `gh pr view 45`, where the "that pr" path would have used 45)
- **Why it's wrong:** this is the same defect as r16 M2. The user names a specific PR (and "the other pr" can't be the current branch's), and the suggestion silently picks the current branch's PR instead. `PR_REFERENCE` is a short list of exact words (`that|this|the same|the previous|the last|…`), so near-synonyms fall through. These behaved the same before fix16 (checked against `2dfca9d`).
- **Suggested fix:** widen the reference set (`latest|newest|most recent|other|my last|my latest|…`), or invert the rule: any word qualifying "pr" other than an article or "my"/"our" withholds `<PR>`.

## Minor
- **`src/history.js:880-882` (`GH_PR_VALUE_OPTS`):** this is one shared set, but `-c`, `-a` and `-e` take a value in some `gh pr` subcommands and are plain switches in others: `view -c` is `--comments`, `review -c` is `--comment`, `review -a` is `--approve`, `comment -e` is `--editor`. So after `gh pr view -c 7`, `gh pr review -a 7` or `gh pr comment -e 7`, "merge that pr" is withheld ("names no pr"). This is the safe direction, but it should be a per-subcommand table.
- **Intent, older than fix16 (same at `2dfca9d`):** `close that pr` → `gh pr create --fill`, both with and without history. That suggests the opposite action and opens a PR, which other people can see. `close the pr` / `close pull request 45` → `gh pr view …`. The catalog has no `gh_pr_close` intent, so "close" should at least withhold rather than map to create.
- **Carried over, acknowledged in fix16-log:**
  - `checkout pr 7` → `gh pr checks 7`.
  - After `git checkout feat`, `merge it` → `git branch -d feat`.
  - `merge pr from the branch main and delete it` → `gh pr merge main` drops the delete-branch part. Same behaviour as `merge pr and delete the branch`, which the tests expect.
  - `scripts/real/prepare_real.js:67-79`: `group()` still treats operands as subcommands (`npm install lodash` and `npm install express` land in different groups), which weakens the train/eval holdout. Deferred, with a reason given.

VERDICT: REQUEST_CHANGES
