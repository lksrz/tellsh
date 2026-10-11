I fixed all the Major findings from both r14 reviews and the cheap Minors, and committed it as `1b5dfc0`. All 336 tests pass, the eval numbers didn't change, and I reran the bench. Nothing was pushed or published, and history still only reads the previous line.

**1. Pull request targets (`src/fill.js`)**
- Words containing `/`, `-`, `_`, `.`, a digit or `#` are now accepted as the target before the stop-word check, so the reported cases keep their target:
  - `merge pr feature/apply`
  - `merge pull request fix-reply`
  - `merge pr hotfix/weekly`
  - `merge pull request release/monthly`
  - `view pr fix/assembly`
  - `merge pr #12-only` (gives `12-only`, as before round 14)
  - `merge pull request from feature-only`
- I went a bit further than `^[a-z]+ly$`: the "-ly" rule is now a list of adverbs (`quickly`, `only`, `directly`, …). Any other plain "-ly" word, like `merge pr nightly`, now gives `gh pr merge <PR>` instead of being dropped. `merge pr from nightly` keeps `nightly`.
- `merge pull request for branch status` gives `gh pr merge <PR>`, never a bare `gh pr merge`.
- A quoted target now has to end with the same kind of quote it started with (`“”„` count as one kind). `"bob's-fix"` and `"don't-merge-yet"` now give `<PR>` instead of being cut to `bob` or `don`. `'it''s'` also gives `<PR>`.
- `yesterday`, `review`, `fork`, `tomorrow`, `earlier`, `later` and `upstream` no longer count as targets, so `view pr from yesterday` gives `gh pr view`.

**2. systemd-run settings (`src/history.js`)**
- The `-p X=…`, `-pX=…`, `--property=X=…` and `--property X=…` forms are now read for `systemd-run` and `run0`.
- `WorkingDirectory=` works like `--working-directory`: a relative path such as `notes.txt` becomes ambiguous. An absolute path like `/etc/example.conf` still resolves, which is how `--working-directory` already behaved.
- `RootDirectory=`, `RootImage=`, `BindPaths=`, `TemporaryFileSystem=`, `PrivateTmp=`, `PrivatePIDs=`, `PrivateNetwork=` and similar settings make every history value ambiguous, the same as `--machine`. So `systemd-run -p RootDirectory=/srv cat /etc/example.conf` followed by "delete it" now gives `rm <FILE>`, and `-p PrivatePIDs=yes ps -p 42` followed by "kill it" gives `kill <PID>`.
- Settings that don't affect this, such as `-p Nice=5`, still resolve as before.

The new tests are in `test/regressions16.test.js` and cover bash, pwsh and cmd. I added a round 15 note to `EVAL.md`, along with the new bench numbers, and two short additions to `README.md`.

**Worth knowing:**
- Git had no identity set in this environment, so I passed your name and email (`lksrz <lukasz@wearfits.com>`) for this one commit, matching earlier commits. I didn't change the git config.
- `review/fix14-log.md` is still uncommitted, since earlier rounds committed their logs separately.
- I didn't touch the "carried over" items from the Claude review (intent misclassification, keeping only the first of several quoted values, and the round-13 leftovers).
