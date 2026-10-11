I fixed all three Major findings from round 20 and committed them as `b04a93c` (not pushed). All 367 tests pass. The eval scores didn't change, and bench was re-run.

**1. A PR picked out by a word before "pr" (`src/fill.js`)** — none of these give a bare `gh pr merge` any more:
- "merge the dependabot / renovate / docs / draft / green / big / above / open pr", "merge said pr" and "merge the aforementioned / mentioned pr" now give `gh pr merge <PR>` with `missing=['pr']`. With history `gh pr view 45` they still give `<PR>`, so "merge the above pr" and "merge said pr" no longer skip the history.
- "merge the pr with label urgent" and "merge the pull request with title fix login" (plus "labeled …" and the Polish "z etykietą …") are withheld the same way.
- "merge the pr", "merge pr", "merge the current pr", "merge my pr" and "merge the github pr" still give bare `gh pr merge`.
- "zmerguj to pr" is now treated like "that pr": it gives `gh pr merge 45` with that history, and `<PR>` without history.

**2. wrangler deploy dropping a dry run or environment (`src/catalog.js`, `src/variants.js`)** — the template is now `npx wrangler deploy«--dry-run»«--env NAME»` on bash, pwsh and cmd:
- "do a dry run of wrangler deploy" → `npx wrangler deploy --dry-run`
- "deploy worker to staging" → `npx wrangler deploy --env staging`
- An environment that can't be read, like "to my env" or "na produkcję", gives `--env <WENV>` rather than the default target.

**Minors fixed:**
- A time word after "from" or "for" is no longer read as a branch name: "from last week", "from monday", "from before" and "from previously" all give `<PR>`. Branch names still work: "from bob" → `bob` and "for main" → `main`.
- The Polish "ten pr" regression is fixed. "ten" and "that one" were being read as the numbers 10 and 1, so "merge ten pr", "zmerguj ten pull request" and "merge that one pr" give `gh pr merge 45` again after `gh pr view 45`.

**Left as is:**
- "merge the pr for login" still gives `gh pr merge login`. A word after "for" or "from" can't be told apart from a branch name, and "from bob" → `bob` is a deliberate tested behaviour.
- The other Minors (`SetEnvironmentVariable` spacing, `rm Env:` in bash) and the nits are untouched.
- On cmd, "scal ten pr" is classified as `gh pr create --fill`. It already did this before my change, so it's a classifier problem rather than this fix; the new test only checks that phrase on bash.

The tests are in `test/regressions22.test.js`, and the README now describes the new gh pr and wrangler behaviour.

No git identity is configured on this machine, so I set your existing author name and email for this one commit only, without changing the git config. I didn't touch the empty untracked `review/fix20-log.md`.

The Cloudflare, Home and cnvs.app connectors need authorizing in your claude.ai connector settings before they can be used; none of them were needed here.
