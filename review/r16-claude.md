I'm requesting changes. The round-15 fixes do what they say: a stray number no longer becomes the pull request, an unparsable selector shows as `<PR>`, history replay keeps the placeholder, and clustered `-tp` is handled. All 341 tests pass. But two paths still hand out a ready-to-run `gh pr merge` aimed at the wrong pull request, which is the problem the last two rounds set out to remove.

I tested by calling `suggest()` directly. To compare against `7eb2ca7` I added a temporary git worktree under `/tmp` and removed it afterwards. No tracked files were changed.

## Major

**M1 — `src/fill.js:75` (the new `#N` fallback): an issue number becomes the PR to merge.**
- **Cause:** fix15 added `issues?` to `PR_NOT_SELECTOR` (`fill.js:36`), so `for issue` no longer matches as a selector. The request then falls through to the new fallback, which takes any `#N` anywhere in the text. It also catches `#N` in a later clause.
- **Examples:** each comes out as a complete command with `missing=[]`:
  - `merge pr for issue #45` → `gh pr merge 45`
  - `squash merge the pr for issue #8` → `gh pr merge 8`
  - `merge the pr in issue #4` → `gh pr merge 4`
  - `merge the pr that closes #12` → `gh pr merge 12`
  - `merge pr which fixes #12` → `gh pr merge 12`
  - `merge the pr, see #99` → `gh pr merge 99`
- **Inconsistency:** this is the exact case the round-16 test withholds (`close pr for issue 45` → `<PR>`), and only the `#` spelling slips through. `merge pr fixing issue #7` is correctly withheld.
- **Suggested fix:**
  - When the selector match lands on an issue/ticket/bug word, return `'?'` instead of falling through.
  - Accept a bare `#N` only if it is the first token after the verb or right after "pr", not anywhere in the text.

**M2 — `src/history.js:1115-1119` with `src/pipeline.js:475`: "merge that pr" gives a bare `gh pr merge`, i.e. the current branch's PR.**
- **Examples:**
  - after `gh pr view 45` → `merge that pr` → `gh pr merge`, `missing=[]`, with the note "previous command names nothing … not guessing"
  - after `gh pr checkout 45` → `merge this pull request` → `gh pr merge`
  - after `git checkout feat` → `merge that pr` → `gh pr merge` (note: "branch … does not fit; not used")
  - after `cat a.txt` → `merge that pr` → `gh pr merge`
- **Why it's wrong:** the user explicitly points at a pull request, and the history parser doesn't extract one from `gh pr view/checkout N`. The new `blanket: true` flag then drops the optional `{pr}` on purpose, so the "not guessing" refusal turns into a confident merge of a different PR.
- **Status:** this was already the behaviour before fix15 (checked against `7eb2ca7`). fix15's `blanket` path now makes it the intended outcome, and it breaks the "never a bare `gh pr merge` when a PR is named" rule.
- **Suggested fix:** when the reference words name an entity the intent uses ("that pr", "that branch"), add it to `keep` even when the refusal is blanket. Separately, extract `pr` entities from `gh pr <verb> N|branch|url`.

## Minor
- **`src/fill.js:50`, the `pr` immediately followed by a number rule:**
  - `merge pr 2 days old` → `gh pr merge 2`; `merge pr 3 times` → `gh pr merge 3`.
  - `merge pr 0`, `merge pr 007` and `merge PR 1e3` pass as-is. These fail safely in `gh`, but validation could reject `0` and non-integers.
- **`src/fill.js:32`:** `merge the pr for #12` → `12` and `merge pr for fix #12` → `gh pr merge fix`. Either "for" names the target or it doesn't; these two give contradictory results.
- **Intent, carried over:** after `npm install lodash`, `same but uninstall` → `npm install lodash` (the opposite action) and `uninstall it` → `python3 -m pip install <PKG>`. Also still open: `checkout pr 7` → `gh pr checks 7`; `merge pr 12 and 13` / `merge pr #12 and #13` merge only 12.
- **`src/history.js:637` (`PROP_OPT`):** the cluster class `[tPqGdSr]` is hand-maintained. Other valueless `systemd-run` flags such as `--user` are long options, so this is fine for now, but a comment pointing to the systemd-run man page would stop it drifting.

VERDICT: REQUEST_CHANGES
