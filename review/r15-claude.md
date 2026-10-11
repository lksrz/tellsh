I'm requesting changes. The round-14 fixes work, but two `gh pr merge` paths in `src/fill.js` still merge the wrong pull request without asking. Both bugs were already there before round 14 (I confirmed this against `e42e051`) and both are inside the reviewed range.

All 336 tests pass. The round-14 targets behave as described: marked selectors are kept, quotes have to match, and `systemd-run`/`run0` `-p`/`--property` with `WorkingDirectory=` or the root-changing properties make history values ambiguous. I checked this read-only by calling `suggest()` directly.

## Major

**M1 — `src/fill.js:164-166`: any number in the request becomes the PR number for a merge.**
When `prSelector()` finds no selector, `v.pr` falls back to `ex.numbers.find(x > 0)`, which is any number anywhere in the text. That number then fills `<PR>` with nothing reported missing, so the user gets a merge of an unrelated PR:
- `merge pr with 2 approvals` → `gh pr merge 2`
- `merge my pr from 2 days ago` → `gh pr merge 2`
- `merge the pr in 2 minutes` → `gh pr merge 2`
- `merge the 2 open prs` → `gh pr merge 2`
- `merge pr with squash and delete 1 branch` → `gh pr merge 1`
- `view pr for 3 days` → `gh pr view 3` (harmless here, but the same mechanism)

Suggested fix: use the number only when it sits right next to "pr"/"pull request" (`pr 45`, `pr #45`, `pr number 45`, `#45`). Otherwise withhold it as `<PR>`.

**M2 — `src/fill.js:32` (`PR_SELECTOR`): a named selector containing an apostrophe is dropped, giving a bare `gh pr merge`.**
The unquoted branch of the pattern excludes `'`. So `feature/x's` neither matches as a selector nor reaches the "unclosed quote" branch, `prSelector` returns `null`, and the command comes out bare. That is the "never a bare `gh pr merge`" rule from the round-14 major and the comment at `fill.js:161-162`:
- `merge pr feature/x's` → `gh pr merge`
- `merge pr it's-fix` → `gh pr merge`
- `merge pr bob's` → `gh pr merge`
- `merge pr in repo v2` → `gh pr merge` (a describing word followed by a marked word is also dropped)

Suggested fix: when the text names a pull request but no selector can be parsed, return `'?'` so it shows as `<PR>`, instead of returning `null`.

## Minor

- **`src/history.js:637,649`:** clustered short options aren't recognised. `systemd-run -tp WorkingDirectory=/srv cat notes.txt` then "delete it" → `rm notes.txt`; it should be `rm <FILE>`.
- **`src/history.js:639`:** `PROP_ROOT` misses `PrivateIPC=`, `ProtectHome=tmpfs` and `PrivateDevices=`. For example, `systemd-run -p ProtectHome=tmpfs cat /home/u/a.txt` → `rm /home/u/a.txt`. These are rare.
- **`src/fill.js:32`:** an abbreviation is taken as the selector: `merge pr e.g. main` → `gh pr merge e.g`. `merge pr w/o checks` → `gh pr merge w/o`; this one fails safely because the branch doesn't exist.
- **`src/fill.js:32`:** a word after `on`/`for` is taken as the target: `merge pr on github.com` → `gh pr merge github.com`, and `close pr for issue 45` → `gh pr view issue`.
- **Intent, carried over and deliberately left alone in fix14:** `checkout pr 5` → `gh pr checks 5`; `close the last 3 prs` → `gh run view 3`; `merge prs 1 and 2` merges only 1.

VERDICT: REQUEST_CHANGES
