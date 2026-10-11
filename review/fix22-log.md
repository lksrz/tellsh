I fixed all four round-22 Major findings and committed them as `79bc63c` (not pushed). All 381 tests pass. The eval scores are the same as before, and I reran bench and updated the timings in `EVAL.md`.

**Major fixes (`src/fill.js`):**
1. **Environment after "for":**
   - A strong name is now the environment: "deploy worker for production" gives `--env production`. The same goes for prod, qa, uat, canary, preview, sandbox, staging and stage.
   - A weak name withholds as `--env <WENV>`: "for testing", "for test", "for dev" and "for beta". "for the qa team" and "for prod users" also withhold, because a noun follows the name.
   - I added `production`, `prod`, `qa` and the other strong names to the "any environment mentioned" check. A prod or qa deploy is no longer silently dropped to the top-level environment.
   - Unrelated words like "for real" and "for a customer" still give a bare deploy.
2. **A selector after "pr" now withholds** as `gh pr merge <PR>`, with or without the history line. Examples are "merge pr for the login fix", "merge pr: fix login", "merge pr with dependabot", "merge pr of my colleague" and "merge pr in docs". "merge pr dependabot/renovate/docs/draft/open" was already withheld and now has tests. Neutral wordings still give a bare `gh pr merge`: "on github", "with squash", "in this repo", "for review" and "in the browser".
3. **Quoted environments are decoded:** `deploy worker to "preview2"` gives `--env preview2`, and curly quotes work too. A quoted value that can't be read or isn't a known environment withholds `<WENV>`: `"my env"`, `'cloudflare'`, `'staging eu'`.
4. **Related PR URLs:** a URL is the merge target only when a verb, a determiner or "pr" comes right before it. "merge the pr that depends on <url>" now gives `<PR>`, also with history. "merge pr <url>" and "view the pull request at <url>" are unchanged.

**Minor fixes:**
- "deploy worker env=staging" is now read as `--env staging`.
- After a preposition, a marked word only counts as an environment if it contains a known name, like "staging-eu" or "qa_1". So "to v2" and "to the worker-2 script" now withhold `<WENV>`.
- "do a dry run" later in a request is kept even when an earlier phrase said "without a dry run".
- "merge current branch pr", "merge the branch pr" and "merge branch's pr" give a plain `gh pr merge` again.
- "approve pr", "open pr in web" and "zatwierdź pr" are refused instead of creating a PR with `gh pr create --fill`. This change is in `src/pipeline.js`.

**Changed behaviour you should know about:**
- Two expectations in `test/regressions23.test.js` contradicted your new rules, so I changed them. "for testing" and "for the qa team" now withhold instead of giving a bare deploy. "to customer-a" now withholds instead of `--env customer-a`, which is the cost of the "to v2" fix.
- "merge pr for dependabot" and "merge pr for login" still treat the word as a branch name (`gh pr merge dependabot`). That's older behaviour Claude listed as related, not a Major. It doesn't give a bare merge, and existing tests depend on "for main" and "from bob" working this way.

The new tests are in `test/regressions24.test.js`. `README.md` and `EVAL.md` (a new Round 23 note) are updated. `review/fix22-log.md` was empty and untracked, so I left it out of the commit.

Three connectors (Cloudflare Developer Platform, Home and cnvs.app) still need to be authorized in your claude.ai connector settings before they can be used. This task didn't need them.
