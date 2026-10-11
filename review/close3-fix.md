I've committed both changes as `21060a5` on `master`; nothing was pushed. All 406 tests pass, and `npm run eval` gives the same numbers as before.

**1. Safe-command rule (`src/danger.js`)**
- **What counts as safe:** only a command tellsh rendered itself, from a catalog template whose intent is `risk=safe`, with plain-literal slot values. A plain value has no quotes, `$`, backticks, `;` `|` `&` `<` `>`, control characters or find actions like `-exec`, and doesn't start with `-`. A path starting with `-` is rendered as `./-x`, so it still counts. The `{cmd} --version` slot must be a bare program name, never a path or `source`, `.`, `eval` or a shell.
- **Everything else is at least high and needs an explicit "yes":** composer output, anything resolved from history, any edited command, and anything else (like `diskutil …`). `--yes` never runs it.
- **The old checker only raises risk now.** It's kept as `assessCommand`, which `checkDanger` calls. Two gaps in it are fixed:
  - It now reads bash `$'…'` quoting correctly, so `echo $'\''; rm -rf ~ #'` still needs the full command retyped, on top of being high.
  - It flags sed scripts that run a command or write a file (`e`, `w`, `W`, `-f`).
- **Edits:** an edited command that's unchanged keeps its rating; any change makes it untrusted.

**2. Competing values (`src/fill.js`)**
- An alternative or negation next to a value (or / albo / lub / not / but not / nie / oprócz / except …), or two values for the same slot, now gives a placeholder:
  - `merge pr 4 or 44` → `gh pr merge <PR>`
  - `deploy worker --env prod --env prodprod` → `--env <WENV>`
  - `merge pr 42 but not in repo acme/app` → `gh pr merge 42 --repo <REPO>`
- It covers the gh/wrangler values (PR, run number, environment, repo, secret name), the package for npm/pip install, and the `npm run` script name.

**Bugs found along the way, also fixed**
- `merge pr 42 and don't delete the branch` produced `--delete-branch`. Now no flag is added.
- When a run number was withheld, it was silently dropped, so `view run 8080808 2` gave a bare `gh run view`. It's now `gh run view <NUM>`.

**Decisions and side effects to check**
- **I read "everything else is high" as not covering medium catalog commands.** A medium intent rendered with plain values stays medium; with any other values it's high. Taken literally, your wording would make every medium catalog command high. That's a one-line change if you want it.
- **Edits are now strict.** Any change at all, even `ls -la` → `ls -l`, needs "yes".
- **Commands built from history:** all 53 in the history eval set are now high. Before, 23 were safe and 12 medium.
- **Composer:** all 43 composed commands in its eval set are now high. Before, all 43 were medium.
- **Dev-tools eval:** 294 → 293 / 324 exact. The one loss is `open the details of the last workflow run`, which is now `gh run view <NUM>` instead of the bare `gh run view` the eval expects. That's the dropped-run-number fix showing.
- **Unchanged:** risk ratings of catalog commands rendered with defaults, the gh/wrangler/npm placeholder counts (15 / 1507), and speed (0.404 ms warm p50).
- **Existing tests:** nine parser test files now import `assessCommand` so they still test the checker on its own. Their assertions are unchanged.
- **The placeholder rule can be over-cautious.** It matches words within a fixed range, so `merge pr 42 or close it` also withholds the PR number.

There's a regression test for every example in both final2 reviews, plus tests for both rules, in `test/regressions27.test.js`. EVAL.md and README describe both rules and their known limits.

`review/STATUS` and the empty `review/close3-fix.md` were already in the working tree before I started, so I left them uncommitted.
