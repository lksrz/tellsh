I fixed all four round-21 Major findings and committed them as `488963f` (not pushed). All 373 tests pass, the eval scores are identical to before, and bench was rerun (`EVAL.md` timings updated).

**Major fixes:**
1. **No made-up wrangler environment:** an environment name is now taken only if it's a known one (`staging`, `prod`, `qa`, …) or a custom name containing a digit, `-` or `_`.
   - "deploy worker env", "with env vars", "using env file" and "my environment is set" now give `npx wrangler deploy --env <WENV>`.
   - "deploy worker environment staging." and "env staging" correctly give `--env staging`.
   - "for" no longer names an environment, so "deploy worker for testing" and "for the qa team" give a bare `npx wrangler deploy`.
2. **A word before "pr" without "the" now withholds:** anything other than a neutral word between the verb and "pr" withholds the PR, with or without history.
   - "merge dependabot/renovate/docs/draft/open pr", "merge alice's pr" and "merge alices pr" give `gh pr merge <PR>`.
   - "merge pr", "squash and merge my pr" and "merge that pr" (with history, `45`) are unchanged.
   - "show checks for that pr" still resolves from history.
3. **Quoted labels and titles:** `merge the pr with label "urgent"`, `with title "fix-login"`, `titled "…"` and `by "alice"` now give `<PR>`, including after `gh pr view 45`. `merge the "feature/login" pull request` still merges `feature/login`.
4. **Custom environment names are kept whole:** "to staging-eu", "to preview2" and "to customer-a" each become `--env` with the full name. A plain unknown word, as in "to cloudflare", still gives a bare deploy.

**Minor fixes:**
- "not a dry run", "without dry run" and "no dry run" no longer add `--dry-run`.
- English "to pr" is no longer read as a reference to the last PR in history, so "check out to pr" and "view diff to pr" don't pick up `45`. Polish "zmerguj to pr" still resolves to `45`. This needed a matching change in `src/history.js` as well as `src/pipeline.js`.
- "merge the pr in question" now gives `<PR>`.

**Not changed:** Minor #6 (`removing|deleting` counted as describing a PR) is left as is, since it already withholds. "view the diff of my pr" gives `<PR>`, but it did that before this change too.

The new tests are in `test/regressions23.test.js`. I also updated `README.md` and appended a section to `review/fix21-log.md`, which is now committed.

Git had no author identity configured, so I committed with `lksrz <lukasz@wearfits.com>` (the same as the earlier commits), passed for this one command only. Your git config is unchanged.

Three connectors (Cloudflare Developer Platform, Home and cnvs.app) need authorizing in your claude.ai connector settings before they can be used. This task didn't need them.
