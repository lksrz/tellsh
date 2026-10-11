# Round 22 re-review of tellsh (0d87457..HEAD, mainly fix21 `488963f`)

I made no changes to the repo. All 373 tests pass. I sent about 200 requests through `suggest()` on bash, with and without the history `gh pr view 45`, and compared the results against the tree before fix21 (`488963f^`, extracted to /tmp).

**What fix21 gets right:**
- These now give `<WENV>` instead of a made-up environment: "worker env", "with env vars", "using env file" and "my environment is set".
- Custom names are kept whole: staging-eu, prod-eu and us-east-1.
- "merge dependabot/draft/open/alice's pr", "merge upstream pr" and "merge colleague pr" are withheld.
- Quoted labels and titles are withheld.
- "merge changes to pr" and "now merge to pr" no longer pick up 45 from history, while "zmerguj to pr" still gives 45.
- "not a dry run", "without dry run" and "no dry-run" are real deploys.
- The `wenv` value is still validated, so nothing can be injected through it.

## Findings

**Major**

1. **`src/fill.js:102,119-122` (`WR_ENV_PREP`/`wranglerEnv`): fix21 broke "for <known env>". The environment the user named is silently dropped and the deploy goes to the default target, with `missing=[]`.** Removing "for" from the preposition list fixed "for testing", but it also drops environments the user plainly asked for:

   | Request | Before fix21 | Now |
   |---|---|---|
   | "deploy worker for production" | `--env production` | `npx wrangler deploy` |
   | "publish worker for prod" | `--env prod` | `npx wrangler deploy` |
   | "deploy worker for qa", "… for uat", "… for canary", "… for preview", "… for dev" | that env | bare deploy |

   Only "for staging" is still caught, giving `<WENV>`, and only because `WR_ENV_ANY` happens to contain `staging\w*`. `production` and `prod` aren't in `WR_ENV_ANY` (only Polish `produkcj\w*` is).

   This is worse than the r21 Major it fixed: a request for prod or qa deploys to whatever the top-level environment is. Possible fix: after "for", accept the strong names (`production|prod|staging|stage|qa|uat|canary|preview|sandbox`) and withhold the weak ones (`test|testing|dev|beta`) as `<WENV>`. Or simply add `production|prod` and the rest of `WR_ENV_KNOWN` to `WR_ENV_ANY`, so the request at least withholds.

2. **`src/fill.js:171-174`: the r20/r21 Major (a PR picked out but not read, `missing=[]`) is still open when the selector comes *after* "pr".** fix21 covers words before "pr" (`prWordBefore`), but these still give a bare `gh pr merge`, which merges the current branch's PR. None of these changed in fix21:
   - "merge pr for the login fix"
   - "merge pr for the issue"
   - "merge pr: fix login"
   - "merge pr with dependabot"
   - "merge pr of my colleague"
   - "merge pr in docs"

   The handling is inconsistent with nearby wordings: "merge pr of dependabot" gives `<PR>`, as do "merge colleague pr" and "merge pr - fix login".

   Related: "merge pr for dependabot" gives `gh pr merge dependabot`, and "merge pr for login" gives `gh pr merge login`. Here the word after "for" is taken as a branch even when it isn't marked as one. This is the same before fix21.

   Possible fix: after "pr", treat `for|of|with|in|:` followed by a non-neutral word as a selector, and withhold it. Neutral words here would be things like "this repo", "github", "main" or "squash".

**Minor**

3. **`src/catalog.js:287`, `src/pipeline.js:382-395`: "approve pr", "approve that pr" (with history) and "open pr in web" are classified as `gh_pr_create` and give `gh pr create --fill`.** The confidence is 0.62, 0.40 and 0.57, and the result is understood. This is the same "opposite command" case that the `PR_CLOSE` refusal already handles for "close". It creates and publishes a PR nobody asked for. This is older than fix21 and wasn't raised in earlier rounds.

4. **`src/fill.js:80-86` (`prWordBefore`): it now over-withholds some requests that clearly mean the current branch.** These worked before fix21 and are now `<PR>`. They fail safe, but are regressions:
   - "merge current branch pr" (with or without history)
   - "merge the branch pr"
   - "merge branch's pr"

   Adding `current|branch|branch's` to the neutral words would fix it.

5. **`src/fill.js:102,107` (`WR_ENV_PREP` plus `wrEnvMarked`):** any marked word after "to/into" becomes the environment.
   - "deploy to the worker-2 script" → `--env worker-2`
   - "deploy worker to v2" → `--env v2`

   These are less likely wordings than r21's, but they still make up an operand. Requiring "env/environment" nearby, or withholding marked names that come only after a preposition, would close it.

6. **`src/fill.js:95` (`WR_DRY_NOT`) is too narrow, and a request that changes its mind ends up as a real deploy.**
   - "deploy worker, not just a dry run" → `--dry-run`. This is safe.
   - "deploy worker without a dry run first? no, do a dry run" → a real deploy. Any negated phrase anywhere suppresses a dry run asked for elsewhere. It's an edge case, but it fails the unsafe way.

7. **`src/fill.js:104`: "deploy worker env=staging" → `<WENV>`.** `WR_ENV_OPT` only accepts the dashed form. This fails safe.

These are carried over from earlier rounds unchanged, so I didn't count them again:
- With history, "merge the same/last/previous pr" gives `<PR>`.
- Minor #6 from r21 (`removing|deleting` counts as describing a PR).
- The r20 Minors #4–#7.

VERDICT: REQUEST_CHANGES
