The four round-22 Majors are fixed, and I found no new blocker or major. I re-reviewed the fix22 commit (`79bc63c`) against `0d87457..HEAD`, read-only. All 381 tests pass. I probed `suggest()` by hand on the current tree and on the tree before fix22 (`c5c8c29`, exported to `/tmp`), so I could tell new behaviour from old.

**Round-22 Majors, rechecked**
- `deploy worker to "preview2"` now gives `--env preview2`, and curly quotes work too. Bad quoted values withhold as `<WENV>`: `'a;b'`, `"$(id)"`, `"x y"`, `"-rf"` and `"--dry-run"`. Nothing unsafe reaches the command line.
- `merge the pr that depends on <url>` and `merge the pr after <url>` now give `<PR>`. `merge pr <url>` and `merge pull request <url>` still use the URL.
- After "for", strong environment names are taken and weak ones are withheld: `for production` → `--env production`; `for testing`, `for the qa team` and `for production users` → `<WENV>`.
- A word after "pr" is withheld (`merge pr about auth`, `merge pr - now`). Neutral wordings still give a plain `gh pr merge`: `on github`, `with squash`, `for review`, `in the browser`.

**Minor (new in fix22, all fail safe)**

1. **`src/fill.js:117` (`WR_ENV_PREP`): the optional `(\s+\S+)?` group swallows the next word.** When that word is a preposition, the environment after it is never matched. Old → new:
   - "deploy worker for real to production": `--env production` → `<WENV>`
   - "deploy worker for me to prod": `--env prod` → `<WENV>`
   - "deploy worker for bob, to production": `--env production` → `<WENV>`
   - "deploy the worker for us on staging": `--env staging` → `<WENV>`
   - "deploy worker for now to staging": `--env staging` → `<WENV>`

   A lookahead `(?=(\s+\S+))?`, or matching that word separately, would avoid consuming it.

2. **`src/fill.js:97` (`PR_URL_LEAD`) is too strict.** Common lead-ins now withhold a URL that used to be read:
   - "show me the pr at <url>" → `gh pr view <PR>`
   - "can you merge the pr at <url>" → `<PR>`
   - "merge the pr (<url>)" → `<PR>`
   - "merge pr, url: <url>" → `<PR>`

   Adding `me|you|can|could|i|want|to|(` and similar words would bring these back.

3. **`src/pipeline.js:102,395` (`PR_NOT_CREATE`): the "in/on the web/browser" part refuses real requests to create a PR.**
   - "open a pr in the browser" and "open pr on web" were `gh pr create`, so the refusal blocks a legitimate `gh pr create --web` request.
   - The same "opposite command" problem is still there for other verbs. "reopen pr" and "mark pr as ready" give `gh pr create --fill`, which publishes a new PR, the outcome r22 Minor #3 was about. These are older than fix22.

4. **`src/fill.js:152-157`: when several environments are named, the first one wins.**
   - "deploy worker for prod, staging later" now gives `--env prod`; before fix22 it gave `<WENV>`.
   - "deploy worker to dev, then to prod" gives `--env dev` (older).

**Minor (older than fix22, not raised before)**

5. **`src/fill.js:157`: an environment the user excludes becomes the target.**
   - "deploy worker but not to production" → `npx wrangler deploy --env production`, confidence 0.99, no warning.
   - "deploy worker, not to prod" and "don't deploy worker to prod" → `--env prod`.

   README.md:355 says negation is only read for merges, so this is within the documented limits. Still, it is the worst-case instance of that limit, and `wranglerEnv` already removes negated dry runs. Dropping an environment that comes right after `not|except|but not|no` would be cheap.

6. **Classifier: a merge request for a URL with no "pr" in it becomes `git clone`.** This happens with "merge <url>", "squash merge <url>" and "i want to merge <url>". The comment at `src/fill.js:170` lists "merge <url>" as handled, but that case never reaches `prSelector`. "checkout pr 5" gives `gh pr checks 5`, which is read-only.

I did not rerun the training scripts; fix22 changed only `src/`, `test/`, the README and `EVAL.md`.

VERDICT: APPROVE
