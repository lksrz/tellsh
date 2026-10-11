I re-reviewed the round-13 fix commit (`7d2264c`) on top of the full diff. All 333 tests pass. I tested about 90 inputs and compared the suspicious ones with the commit before it, using a temporary worktree in `/tmp` that I've removed. The repo is unchanged.

**Round-13 fixes: working, with one new regression**
- **Quoted pull request targets** (`src/fill.js:41-49`): `"feature/login"`, `'…'`, `“…”`, `„…”`, `"123"`, `"#12"` and quoted URLs are kept. `"$(id)"`, `` "`id`" ``, `"--admin"`, `".."`, `"%PATH%"`, `"a!b"` and `""` all give `<PR>` and are reported as missing, in bash and cmd.
- **Commands run on another machine** (`src/history.js:624-648`): after `systemd-run -M/--machine/-H/--host`, `run0 -M`, `sudo -h/--host` and `machinectl` (also with `/usr/bin/`, `env` or `sudo` in front), "kill it" no longer gives `kill 42`. The same holds for `ssh`, `kubectl`, `incus`, `lxc`, `podman`, `distrobox`, `toolbox`, `flatpak-spawn --host`, `systemd-nspawn`, `pct` and `wsl`. `sudo -u bob ps -p 42` and `systemd-run --user ps -p 42` still give `kill 42`.
- **pip extras without a version** (`src/pipeline.js:85`): `requests[socks]` and `requests[socks,http2]` are quoted correctly in bash, pwsh, cmd and fish. `requests[]` and `requests[a b]` give `<PKG>`.

## Findings

### Major
1. **Branch names ending in "ly" are dropped, so the command merges the current branch's pull request instead** (`src/fill.js:33`, used at `:44`). The `|ly$` in `PR_NOT_SELECTOR` is checked before `PR_MARKED`, so it also hits names that clearly are branches. The target is then dropped, and the output looks complete with nothing reported missing. This is the same kind of failure as the round-13 Major the commit set out to fix.

   | Request | Now gives | Before (`7d2264c~1`) |
   |---|---|---|
   | `merge pr feature/apply` | `gh pr merge` | `gh pr merge feature/apply` |
   | `merge pull request fix-reply` | `gh pr merge` | `gh pr merge fix-reply` |
   | `merge pr hotfix/weekly` | `gh pr merge` | `gh pr merge hotfix/weekly` |
   | `merge pull request release/monthly` | `gh pr merge` | `gh pr merge release/monthly` |
   | `view pr fix/assembly` | `gh pr view` | `gh pr view fix/assembly` |
   | `merge pr #12-only` | `gh pr merge 12` (a different PR) | `gh pr merge 12-only` |

   Names like nightly, weekly, apply, reply, only, early, family and supply are common in branch names. Suggested fix: only apply the stop-word list, including the `ly$` part, to words that have no marker (check `PR_MARKED` first), or limit it to `^[a-z]+ly$`. Add tests for `feature/apply` and `hotfix/weekly`.

### Minor
2. **A quoted target containing an apostrophe is cut off at the apostrophe** (`src/fill.js:31`). The closing-quote class accepts any quote character, so `merge pull request "bob's-fix"` gives `gh pr merge bob`, and `"don't-merge-yet"` gives `gh pr merge don`. Nothing is reported missing, and the shortened word passes validation. The previous commit gave a bare `gh pr merge`, which was also wrong. Suggested fix: require the closing quote to match the opening one, treating `“”„` as one family. If no matching close is found, give `<PR>`.
3. **Any word after "for" or "from" becomes the target**: `view pr from yesterday` gives `gh pr view yesterday`, and `merge pr for review` / `merge pr from fork` give `gh pr merge review` / `gh pr merge fork`. This was a deliberate trade-off, and gh only errors unless a branch with that name exists. Words like "yesterday", "review" and "fork" could be added to the stop list.
4. **A quoted value skips the stop-word check**: `merge pr 'it''s'` gives `gh pr merge it`. This is unusual input, so it's low impact.

### Carried over (not regressions)
5. The intent classifier gets some PR requests wrong. `close the pull request "fix-1"` gives `gh pr view fix-1`, `checkout pr "fix-1"` gives `gh pr checks fix-1`, and `close pr "-d"` gives `gh pr create --fill`.
6. `merge pull request "a" and "b"` and `merge pr "fix-1" into "main"` silently keep only the first quoted value.
7. Items 5–8 from round 13 still apply: a `bash -c` string becomes one file name, `cp -t` is rated `safe`, the `lm_rerank.py` resume key doesn't check whether the model or candidates changed, and `show pull request feature/login` is still classified as creating a pull request.

VERDICT: REQUEST_CHANGES
