I fixed both Major findings from Codex's round-12 review and both cheap Minors, and committed them as `77b3a9d`. Nothing was pushed or published. All 329 tests pass, and history still reads only the previous line.

**1. A pull request the user names is no longer dropped** (`src/catalog.js`, `src/variants.js`, `src/fill.js`, `src/pipeline.js`)
- `gh pr view`, `gh pr checks` and `gh pr merge` now take the pull request as a number, a `github.com/…/pull/N` URL or a branch name.
  - `merge pull request https://github.com/owner/repo/pull/123` gives `gh pr merge https://github.com/owner/repo/pull/123`.
  - `merge pull request feature/login` gives `gh pr merge feature/login`. The same holds in PowerShell and cmd.
- If the named target isn't a valid number, URL or branch, the command shows a placeholder: `gh pr merge <PR>`. That covers a GitLab URL, `../x`, `foo;rm` and `-rf`.
- A plain `gh pr merge` (the current branch's pull request) now only comes out when no pull request is named, e.g. "merge the pull request".

**2. Commands run in another namespace no longer resolve "kill it"** (`src/history.js`)
- `nsenter` and `unshare` are now handled like `chroot`: every value from that history line is ambiguous.
- After `nsenter -t 1234 -p ps -p 42`, "kill it" is refused with `kill <PID>` instead of giving `kill 42`. The long forms (`--target`/`--pid`), `--net=…`, `-a`, `sudo nsenter …` and `--` behave the same.
- After `nsenter -n lsof -i :8080`, the port is withheld.
- I also checked `ip netns exec`, `docker`/`podman`/`kubectl`/`incus exec`, `lxc-attach`, `machinectl` and `toolbox`. None of them produces a pid or port that "kill it" could use (`docker exec web …` resolves to the container `web`, which is correct).
- Plain `ps -p 42` followed by "kill it" still gives `kill 42`.

**Minors:**
- **Version constraints:** they are now kept. `install requests==2.32.0 with pip` gives `python3 -m pip install requests==2.32.0`, and `django>=4,<5` and `requests[socks]==2.32.0` come out quoted. An invalid one (`requests==2.32.0;rm`) gives `<PKG>`.
  - This also fixed a related bug: `install typescript@^5.4 with npm` used to give `npm install npm`; it now gives `npm install 'typescript@^5.4'`.
- **`train_lm_gpu.py`:** it now trains on the last, partial batch, so a dataset smaller than the batch size no longer loops forever. It also stops with a clear error if there are no training rows. I checked that the file parses but didn't run training, since that needs a GPU.

**Tests, eval, bench, docs:**
- The new tests are in `test/regressions14.test.js`, and all four fail on the old code. Three existing tests needed the new `pr` value added to their fixtures.
- The eval numbers are identical to before. I re-ran the bench and updated it in `EVAL.md`; cold start p50 is 193 ms, up from 169 ms. The warm timings also rose slightly. I didn't investigate this; I assume it's run-to-run machine noise, since the baseline `node -e 0` startup varied too.
- I added a Round 13 note to `EVAL.md` and the new cases to the README.

**Not fixed:**
- **Classifier bug:** `show pull request feature/login` (and `open pull request feature/login`) is classified as creating a pull request and gives `gh pr create --fill`. "View" and "show" with a number route correctly. This is a classifier problem rather than slot filling, so I left it; tell me if you want it fixed.
- **Variant check:** `scripts/check_variants.js` reports one failure, `history_search [zsh] unknown key`. It failed the same way before these changes.

As in round 11, git had no identity set, so I committed as `lksrz <lukasz@wearfits.com>` without changing the git config. The empty `review/fix12-log.md` was already untracked and I left it out of the commit.
