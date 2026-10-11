# Round 20 re-review of tellsh (0d87457..HEAD, mainly the fix19 commit `cd2c0ef`)

**What I checked:** all 361 tests pass (`npm test`). I sent about 150 requests through `suggest()` on bash, pwsh and cmd, aimed at what fix19 changed: keeping an unreadable PR as `<PR>` when there is history, and dropping repo scope after `unset` / `Remove-Item Env:` / `SetEnvironmentVariable`. I also compared each request against the pre-fix tree (`ee3feaf`), extracted with `git archive` into /tmp. I briefly created and then removed a git worktree for that comparison; the worktree list is back to its original state and the working tree is unchanged.

**What fix19 gets right:**
- After `gh pr view 45`, "merge that pr" gives `gh pr merge <PR>` when any of these follow: `unset GH_REPO`, `unset -f`, `export -n`, `Remove-Item Env:GH_REPO, Env:GH_HOST`, `Remove-Item -Path Env:GH_REPO`, `Env:/GH_REPO`, `SetEnvironmentVariable('GH_REPO',$null,'Process')`, `set "GH_REPO="` (cmd), or a removal inside a subshell or pipeline.
- A removal before the command still gives `gh pr merge 45`. `unset GIT_DIR` correctly leaves the PR alone.
- `unset DOCKER_HOST` and `unset GIT_DIR` withhold the container and branch correctly.
- "the pr that fixes login", `"bob's"`, "by alice" and "that pr main" stay `<PR>` with history.
- `scripts/real/group.js` is a faithful move, and the default `v04` mode keeps the same depth bound as the old `head.length < 3`.

## Findings

**Major**

1. **`src/fill.js:103-104` (`prSelector` falls back to `null`): a PR picked out by a word before "pr" becomes a bare `gh pr merge`, which merges the current branch's PR.** These all give `gh pr merge` with `missing=[]`, with or without history:
   - "merge the dependabot pr"
   - "merge the renovate pr"
   - "merge the docs pr"
   - "merge the draft pr"
   - "merge the green pr"
   - "merge the big pr"
   - "merge the above pr"
   - "merge said pr"
   - "merge the aforementioned pr"
   - "merge the mentioned pr"
   - "zmerguj to pr"

   With history `gh pr view 45`, "merge the above pr" and "merge said pr" ignore 45 and still give a bare `gh pr merge`. This breaks the module's own rule (fill.js:61-64): a PR the request names but can't read is withheld, never a bare `gh pr merge`. `PR_PICKED` (pipeline.js:99) only covers ordinals and words like latest/other, not descriptive or anaphoric words. Plain "merge the pr" and "merge pr" giving `gh pr merge` is intended and tested; the fix should only apply when there is a non-article word between the determiner and "pr".

**Minor**

2. **`src/fill.js:92` (the `for|from → w` branch): a who/when word after "from"/"for" is used as a branch name.** `PR_QUALIFIED` lists `last week`, but it is only checked on the fallback path, not on the `PR_SELECTOR` path. So:
   - "merge the pr from last week" → `gh pr merge last`
   - "… from monday" → `gh pr merge monday`
   - "… from before" → `gh pr merge before` (with or without history)
   - "… from ages ago" → `gh pr merge ages`
   - "… from previously" → `gh pr merge previously`
   - "merge pr from bob" → `gh pr merge bob`, while "by bob" gives `<PR>`
   - "merge the pr for login" → `gh pr merge login`
   - "view that pr from before" → `gh pr view before`

   All come back with `missing=[]`. gh usually fails with "no pull requests found for branch …", which is why this is minor, but these should be `<PR>`.

3. **`src/pipeline.js:532`: regression for Polish "ten pr" ("this pr") with history.** "merge ten pr", "scal ten pr", "zmerguj ten pr" and "zmerguj ten pull request" gave `gh pr merge 45` before fix19 and now give `<PR>`. So do "merge that one pr" and "merge this one pr". The demonstrative is read as an unreadable operand, and the new check now treats that as authoritative. This fails safe, but it is the most common Polish wording for this. The history eval stayed at 92.5% only because it doesn't include these phrasings. "zmerguj tego pr" still resolves.

4. **`src/history.js:489-492`: the `SetEnvironmentVariable` detection depends on how the line is split into words.** `[System.Environment]::SetEnvironmentVariable("GH_REPO",$null)` with no space after the comma → `gh pr merge 45`. The same call with a space is caught. Related export-style PowerShell forms that are still missed (each → `gh pr merge 45`):
   - `Set-Item Env:GH_REPO a/b`
   - `${env:GH_REPO}="a/b"`
   - `New-Item`/`Set-Content Env:…`

   These are rare in history.

5. **`src/history.js:625` (`unsetScopeVars` accepts `rm|del|rd|rmdir|erase`): this also fires in bash/cmd.** For example, `rm Env:GH_REPO` deletes a file. This is over-conservative and safe; noted for consistency only.

**Nit**

6. **`src/history.js:494`: `exported.includes(x)` is an O(n²) membership check in the loop.** It's harmless, but tagging each entry with whether it was exported or removed would be clearer than re-checking membership.

7. **`scripts/real/group.js:17`: the comment says "up to two lower-case words after the head".** With `head.length <= depth` and depth 2, the head can be the tool plus two words, which matches the old `< 3`. The wording is correct; I'm noting it because `structural` uses the same `<=` bound, and `gcloud: 3` therefore allows three subcommand words, which is presumably intended.

Known gaps from earlier rounds (`checkout pr 7` → `gh pr checks 7`, the `--repo` from "to release/v2", the split leak now measured at about 0.2 points) are unchanged, and I didn't count them again.

VERDICT: REQUEST_CHANGES
