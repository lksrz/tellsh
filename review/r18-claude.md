I'm requesting changes. The fix17 work does what it claims: a PR number from history is treated as ambiguous after a trailing `cd`/`pushd`/`popd`, `GH_REPO`/`GH_HOST` prefixes and exports are respected, "the other / latest / my last pr" gives `<PR>`, and `--repo a/b` / `in repo a/b` are kept. All 351 tests pass. But two of its own fixes are incomplete, and in both the gap produces a finished command with `missing=[]` that merges a PR.

I tested by calling `suggest()` directly from scratch scripts in `/tmp/r18`. I extracted `fe20cd1` (before fix17) to `/tmp/r18/old` to check which problems are older. No tracked files were changed.

## Major

**M1 — `src/pipeline.js:378` (`PR_CLOSE` check): "close" is only refused when the intent is `gh_pr_create`, `gh_pr_view` or `gh_pr_checks`. When the classifier picks `gh_pr_merge`, the PR is merged.**
- **Examples:** each gives `gh pr merge 45` with `missing=[]`:
  - `close pr 45 and delete branch`
  - `close pr 45 without merge`
  - `close pr 45, do not merge`
  - `close the pull request 45 without merging`
  - `decline and close pr 45 and delete the branch`
- **Why it's wrong:** this is the r17 "close that pr" finding again. The suggestion does the opposite of what was asked, it's medium-risk, others can see it, and it's hard to undo. These gave the same result at `fe20cd1`, but fix17 says "close" is now refused, and these phrasings get around that.
- **Suggested fix:** add `gh_pr_merge` to the list. Only allow "close" through when "merge" also appears without a negation in front (as in "merge and close pr 45"). Simpler still: refuse whenever `PR_CLOSE` matches and the request contains no un-negated "merge".
- **Related, older and general:** `do not merge pr 45` → `gh pr merge 45`, and `unmerge pr 45` / `undo the merge of pr 45` → `gh pr merge 45`. The same happens elsewhere: `do not delete file a.txt` → `rm a.txt`, `dont kill process 123` → `kill 123`. There's no negation guard anywhere, and these are identical at `fe20cd1`. I'm only reporting this, not counting it as a fix17 regression, but it should go on the list of known issues.

**M2 — `src/fill.js:106` (`PR_REPO`): a repository is only recognised when the words "repo"/"repository" appear. Otherwise it is still dropped silently.**
- **Examples:** each gives `gh pr merge 7` with `missing=[]`, which acts on PR #7 of the current repository:
  - `merge pr 7 in other/repo`
  - `merge pr 7 of org/repo`
  - `merge pr 7 from org/repo`
  - `merge pr 7 to org/repo`
  - `merge pr 7 on github.com/org/repo`
- **For comparison:** `merge pr 7 in repo a/b` and `merge pr 7 in the a/b repo` correctly give `--repo a/b`.
- **Why it's wrong:** fix17 says a named repository is "kept rather than dropped, never dropped". An `OWNER/REPO` token after a preposition is the most common way to write it, and it still falls through. Also, `merge pr org/repo#7` → `gh pr merge <PR>` with no `--repo` hint.
- **Suggested fix:** also accept `(in|of|on|from|for|at|to) [HOST/]OWNER/REPO` when the value passes `RAW_OK.repo`, and treat `OWNER/REPO#N` as `{repo, pr}`.

## Minor
- **`src/fill.js:26` (`RAW_OK.repo`):** a value may start with `-`. So `merge pr 45 --repo -x/y`, `-R=-x/y` and `in repository -o/x` give `gh pr merge 45 --repo -o/x` with `missing=[]`. pflag uses the next word as the value, so this isn't exploitable today. But every other slot validator rejects a leading dash (`(?!-)`), and this one should too, on both the owner and the repo part.
- **`src/fill.js:106` (`PR_REPO`, second alternative), withholding too much:**
  - `merge pr 45 for the repo` → `--repo <REPO>`: "the" is taken as the repository name.
  - `show checks of the pr in my current repo` → `gh pr checks <PR> --repo <REPO>`: `PR_REPO_HERE` only matches a single word.
  - Both fail safe, but both are noisy.
- **`src/history.js:485` (`exportedScope`):**
  - **Applies too widely:** an exported `GH_REPO` sets one flag for every head in `SCOPE_OPTS`. So `export GH_REPO=a/b; git checkout feat` also withholds git and docker entities.
  - **Inconsistent between spellings:** in PowerShell, `$env:GH_REPO="a/b"; gh pr view 45` (no spaces) is not detected and gives `gh pr merge 45`. `$env:GH_REPO = "a/b"` (with spaces) gives `<PR>`.
  - **Possibly unnecessary:** an exported variable stays set for the next command in the same shell. So reusing 45 is actually correct for the export forms; only the prefix form (`GH_REPO=… gh …`) needs withholding.
- **`src/history.js:300` (`staleRepo`):**
  - **Also covers `cd` into a subdirectory:** `git checkout feat && cd src` makes "delete that branch" give `<BRANCH>`, even though it's the same repository. It fails safe; it could be limited to targets that can leave the repository (`..`, absolute paths, `~`, `-`).
  - **Withholds with `cd` first, too:** `cd src && git checkout -b feat` also withholds the branch. That was already so at `fe20cd1`.
- **Intent:** `revert pr 45` and `cancel pr 45` → `gh pr view 45`. That's read-only, but it isn't what was asked.
- **Carried over, acknowledged in fix17-log:**
  - `checkout pr 7` → `gh pr checks 7`.
  - After `git checkout feat`, `merge it` → `git branch -d feat`.
  - `scripts/real/prepare_real.js` groups packages by operand (`npm install express` and `react` land in different groups), which weakens the train/eval holdout.

VERDICT: REQUEST_CHANGES
