Probing is done and the tests pass. Here's the review.

# Round 19 re-review of tellsh (0d87457..HEAD, mainly the fix18 commit `3d30f59`)

**What I checked:** all 358 tests pass (`npm test`). I also ran about 90 requests directly through `suggest()`, aimed at what fix18 changed: refusing "close"/negated-merge requests, reading `OWNER/REPO` as a repository, withholding PRs picked by who/when, history scoping after `export GH_REPO`, and keeping `<PR>` on refused references.

**What fix18 gets right:**
- "close pr 45", "close pr 45 and delete branch", "do not merge pr 45", "revert pr 45" and "cancel pr 45" are all refused.
- "merge and close pr 45" and "merge pr 45, do not delete branch" still give `gh pr merge 45`.
- `org/repo#7` and "in other/repo" are kept as `--repo`.
- "by alice", "that I opened" and "before lunch" give `<PR>`.
- In history:
  - `gh pr view 45; export GH_REPO=a/b`, `$env:GH_REPO="a/b"`, `GH_REPO=a/b gh pr view 45`, `… ; gh pr list`, `… ; gh pr view` and `… ; env` all give `gh pr merge <PR>`.
  - `export GIT_DIR` correctly leaves the PR alone, so scoping is per tool.
- I found no blocker or major issue.

## Findings

**Minor**
1. **`src/fill.js:123-131` (`PR_REPO_PREP`): a slash branch after to/from/of/for/at is read as a repository.** The guard only covers a preposition directly after "pr". Once a number sits in between, the branch becomes `--repo`:
   - "merge pr 12 to release/v2" → `gh pr merge 12 --repo release/v2`
   - "merge pr 12 from alice/feature" → `--repo alice/feature`
   - "view pr 7 on feature/x" → `gh pr view 7 --repo feature/x`
   - "view pr 7 for feature/login" → `--repo feature/login`
   - "merge pr 45 at 5/6" → `--repo 5/6`

   The handling is also inconsistent: "into release/v2" and "onto develop/next" get no repo. `gh pr merge` has no base-branch option, so the right output for "to <x/y>" is `<REPO>` or a refusal, not a guessed repo. The impact is limited: the risk is medium, so it always prompts, and the target usually doesn't exist, so gh errors out.
2. **`src/fill.js:124` (`continue` on an invalid value): an invalid repository is silently dropped, so the command falls back to the current repo.** "merge pr 5 in -x/y" and "merge pr 5 in a/-b" → `gh pr merge 5`, which acts on the current repository even though the user named another one. That breaks the fix18 rule that `-`-leading repos are withheld as `<REPO>`; via `--repo -x/y` it does give `<REPO>`. The value should stay as `'?'`, as the `PR_REPO` path does.
3. **`src/fill.js:111` (`PR_REPO_HERE` accepts `a|an`): "in a repo" counts as the current repository.** "merge pr 45 in a repo" → `gh pr merge 45`, but "a repo" names some unspecified repository, not this one. "in an other repo" correctly gives `<REPO>`.
4. **`src/pipeline.js:103` (`MERGE_NEGATION` window of `{0,2}` words): a negation aimed at another verb also kills the merge.** These are wrongly refused, though refusing is the safe direction:
   - "don't wait, merge pr 45"
   - "without waiting merge pr 45"

   Also, "land pr 19 and close it" is refused because "land" isn't in `MERGE_WORD`.
5. **`src/history.js:612` (`SCOPE_ENTS.gh` includes `'branch'`): `export GH_REPO` also hides a git branch.** After `git checkout feat; export GH_REPO=a/b`, "delete that branch" → `git branch -d <BRANCH>`. `GH_REPO` doesn't affect git, so this is over-conservative but safe.
6. **Polish negation and merge verbs aren't covered (the classifier picks the wrong intent).** "nie scalaj pr 45" and "scal pr 45" both → `gh pr view 45`. That's safe, but "scal pr 45" not merging is a recall gap, given the eval set has "scal ten pull request" as a merge.

**Nit**
7. **`src/history.js:620`: the `exported === true` legacy branch is dead code.** `exportedScope` is always a `Set` now, so `exported.has?.(head) || exported === true` can be just `exported.has(head)`.

Known gaps already listed by the author (`checkout pr 7` → `gh pr checks 7`; "merge org/repo#7" without "pr" → `git clone <URL>`; the train/eval split in `scripts/real/prepare_real.js`) are unchanged, and I didn't count them again.

Separately, `review/r19-codex.md` doesn't contain a review: after the prompt it holds the author's fix18 summary, so the Codex review for this round seems to have failed. Several connectors in this session (claude.ai Cloudflare Developer Platform, Home and cnvs.app) need authorizing in your claude.ai connector settings before they can be used.

VERDICT: APPROVE
