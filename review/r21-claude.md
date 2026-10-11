# Round 21 re-review of tellsh (0d87457..HEAD, mainly fix20 `b04a93c`)

**What I checked:** all 367 tests pass (`npm test`). I sent about 120 requests through `suggest()` on bash and pwsh, with and without history `gh pr view 45`, aimed at what fix20 changed. I compared the gh results against the tree before the fix (`80abdb7`), extracted with `git archive` into /tmp. The working tree is unchanged.

**What fix20 gets right:**
- These are withheld with or without history: "the dependabot/docs/draft/above pr", "said pr", "the pr with label urgent" and "o tytule …".
- "merge the pr", "merge my pr" and "merge the current pr" stay bare.
- "zmerguj to pr" now resolves to 45.
- After "from", a when-word is no longer read as a branch: "from last week" and "from before" both give `<PR>`.
- With history, "ten pr" gives 45 again.
- `--dry-run` and `--env staging|prod|-e=prod` are kept. `--env 'a b'`, `$ENV` and "na produkcję" become `<WENV>`.
- The `wenv` value is validated against `^[A-Za-z0-9][\w-]{0,62}$`, so nothing can be injected through it ("to staging; rm -rf /" gives `--env staging`).

## Findings

**Major**

1. **`src/fill.js:82` (the second alternative of `WR_ENV_WORD`, the "X env" form) makes up an environment name, with `missing=[]`.** It takes whatever word comes before "env" or "environment":
   - "deploy worker env" → `npx wrangler deploy --env worker`
   - "deploy worker with env vars" → `--env with`
   - "deploy worker with environment variables" → `--env with`
   - "deploy worker using env file" → `--env using`
   - "deploy worker, my environment is set" → `--env is`
   - "deploy worker environment staging." → `--env worker`. Both alternatives can match here; the regex takes the leftmost match, so "worker environment" wins over "environment staging".

   `WR_ENV_KNOWN` (`fill.js:83`) also accepts "for": "deploy worker for testing" → `--env testing`, and "for the qa team" → `--env qa`.

   As far as I know, with the default legacy environments, wrangler `deploy --env <name>` for a name that isn't in `wrangler.toml` only warns. It then deploys a separate Worker named `<name>-<env>` (for example `myworker-with`), which is publicly reachable on workers.dev. I haven't checked this against the current wrangler version. Either way, the request gets a made-up operand instead of `<WENV>` or the default, which breaks the "never invent an operand" rule that fix20 applies to `wenv`. Possible fix: only accept the "X env" form when X is in the known list, or withhold it as `<WENV>`, and drop "for" from `WR_ENV_KNOWN`.

2. **`src/fill.js:71,127-129` (`PR_DET_WORD`): the r20 Major #1 is still open when there is no determiner.** The new check only runs when "the/a/my/…" comes before the word. Without one, the result is a bare `gh pr merge` with `missing=[]`, which merges the current branch's PR:
   - "merge dependabot pr", "merge renovate pr", "merge docs pr", "merge draft pr", "merge open pr"
   - "merge alice's pr" and "merge alices pr". The `'` check only looks at the text *after* "pr".

   The same requests with "the" are withheld ("merge the dependabot pr" and "merge the bot's pr" give `<PR>`). Terse CLI input usually leaves the article out, so this is the more common wording. Possible fix: treat any non-verb, non-neutral word directly before "pr" as a selector, for example "the word after the intent verb when it isn't in `PR_DET_NEUTRAL`".

**Minor**

3. **`src/pipeline.js:96`: the new `\bto\s+prs?` reference alternative also matches English "to pr".** With history `gh pr view 45`:
   - "merge changes to pr" → `gh pr merge 45` (before the fix: bare)
   - "check out to pr" → `gh pr checks 45`
   - "view diff to pr" → `gh pr view 45`

   This is only meant for Polish, so it should be limited to Polish contexts, or to "to" at the start of the request or after a Polish verb.

4. **`src/fill.js:79` (`WR_DRY`): a negated dry run still adds the flag.** "deploy the worker, not a dry run", "deploy worker to production without dry run" and "skip the dry run" all give `--dry-run`. This fails safe because nothing is deployed, but it does the opposite of what was asked.

5. **`src/fill.js:59-60` (the after-"pr" checks): an anaphor after "pr" isn't caught.** "merge the pr in question" gives a bare `gh pr merge`, while "the pr above" and "the pr I mentioned" are withheld.

6. **`src/fill.js:62` (`PR_DESCRIBED` includes `removing|deleting`): "merge the pr removing the branch" and "… deleting the branch" give `<PR>`.** This fails safe, but those words describe a merge option rather than pick out a PR. "merge the pr, deleting the branch" is bare, so the behaviour is inconsistent.

These are carried over from earlier rounds unchanged, so I didn't count them again:
- With history, "merge the same/last/previous pr" gives `<PR>`.
- The r20 Minors #4–#7: `SetEnvironmentVariable` spacing, `rm Env:` in bash, and the nits.

VERDICT: REQUEST_CHANGES
