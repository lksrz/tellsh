All three Major findings from r15 are fixed and committed as `060ab50` on `master` (not pushed). All 341 tests pass, the eval numbers didn't change, and I reran the bench and updated its table.

**1. Stray numbers no longer pick the PR** (`src/fill.js`)
- I removed the fallback that used any number in the text as the PR.
- A number now counts only in `pr 45`, `pr #45`, `pr number 45`, `pr no. 7` or `#45`.
- All five of your cases now give `gh pr merge <PR>` with `pr` reported missing. `view pr for 3 days` gives `gh pr view <PR>`.
- A number after a word like "from" or "for" is now withheld (`pr from 2 days ago`), unless it comes after "branch".

**2. A PR that's named but can't be parsed is withheld, never a bare merge** (`src/fill.js`)
- `merge pr feature/x's`, `it's-fix`, `bob's`, `bob’s` (curly apostrophe) and `in repo v2` all give `gh pr merge <PR>`.
- When nothing is named (`merge pr`, `merge the pr`, `merge pr now`, `merge pr for review`), it still gives bare `gh pr merge`, as before.

**3. History replay keeps the placeholder it holds back** (`src/pipeline.js`)
- `same but merge` after `tellsh merge pr nightly` now gives `gh pr merge <PR>` with `missing:['pr']`.
- `same for foo/bar` after `npm install lodash` now gives `npm install <PKG>`.
- My first, broader version of this fix broke one case in the blind history eval: `push it` after `git commit` became `git push origin <BRANCH>` instead of `git push`. So the placeholder is now kept only when history held back a real value (unclear or invalid). It is not kept when the previous command has nothing "it" could mean. With that, the history eval matches its old results exactly.

**Cheap Minors, also done:**
- Clustered `systemd-run -tp WorkingDirectory=…` and `-tpWorkingDirectory=…` are now recognised.
- `PrivateIPC=`, `PrivateDevices=` and `ProtectHome=tmpfs` now make history paths ambiguous. `ProtectHome=read-only` still lets them resolve.
- `e.g.`, `w/o` and other abbreviations, a host like `on github.com`, and `for issue 45` are now withheld as `<PR>` instead of being used as the selector.

**Side effect to know about:** if a request names a PR and no selector parses, any digit anywhere in it now means `<PR>`. For example, `merge pr to main in python3 repo` is withheld. That errs on the safe side, but it may ask for a PR more often than strictly needed.

The new tests are in `test/regressions17.test.js` and cover bash, pwsh and cmd. `EVAL.md` has a Round 16 note and the `gh` paragraph in `README.md` now explains the number rule.

**Not addressed:**
- Codex's Minor about `scripts/real/prepare_real.js`: command grouping treats package names as subcommands, so `npm install lodash` and `npm install express` can land in different train/eval splits.
- The intent Minors that fix14 also left alone (`checkout pr 5`, `close the last 3 prs`, `merge prs 1 and 2`).
- `review/fix15-log.md` was already there, empty and untracked. I left it alone.
