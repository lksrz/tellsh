All three Major findings from `review/r9-codex.md` are fixed, and so is the Minor about augmented training rows leaking into A_dev. It's committed as `4346cc5` and not pushed. All 318 tests pass, including 4 new ones in `test/regressions11.test.js`. History still reads only one line back.

**Majors**
1. **`wrangler dev`** is now `medium` risk, the same as `npm run` (`src/catalog.js`). `tellsh --yes start wrangler dev` exits with code 4 ("only auto-runs safe"); the test runs it with an empty `PATH`, so nothing can actually execute.
2. **Attached short-option values** now keep the history scope (`src/history.js`, `SCOPE_OPTS`).
   - `git -C/repo blame notes.txt` + "delete it", `docker -Htcp://prod:2375 logs web` + "stop it", and `docker -cprod …` are now refused with a placeholder.
   - `git -c` (config) and plain docker flags still resolve as before.
3. **Wrappers that change the working directory or root** keep that scope (new `wrapperScope`).
   - After `env -C` / `--chdir=`, `sudo -D` (also attached or in a cluster), `unshare`/`nsenter --wd` or `systemd-run --working-directory`, relative paths from history become ambiguous. So "delete it" or "show it" after `env -C /repo cat notes.txt` gives `rm <FILE>`.
   - Absolute paths still resolve: `rm /tmp/abs.txt`.
   - After a root-changing wrapper (`chroot`, `unshare -R`, `nsenter -r`, …), every value is ambiguous.
   - Ordinary wrappers (`sudo -u`, `nice`, `env FOO=1`, `env -i`) behave as before.

**Minor (the training-data leak)**
- `export_data.js` now drops the 98 training rows whose text equals a dev text, and writes the full list of dev texts to `build/hybrid/dev_texts.json`. `train_a_dev.sh` excludes that whole list and fails if it's missing.
- The dev split itself didn't change. I rebuilt A_dev and recalibrated the hybrid:
  - **A+B / A+B-safe:** policies are identical, so every A+B number is unchanged (`v04_after.json` is byte-identical).
  - **A+C:** tau goes from 0.8 to 0.9, and A+C-safe also goes from k 3 to 5. A+C-ft real usage moves from 87.4% to 87.5%, but it now hands off to the reranker more often (31% → 42%).

**Results**
- **Eval:** identical to round 9.
- **Bench:** warm times are the same; cold runs and the history case moved within noise for this shared box.
- **Docs:** EVAL.md, HYBRID.md (results tables regenerated, plus a round-10 note) and README are updated.

**Things to know**
- **B was not retrained** on the cleaned data, so it still saw those 98 rows. Retraining takes about 17 minutes, but B ships as a separate bundle that would then need repackaging, so I left it and disclosed this in HYBRID.md and EVAL.md.
- **Stale C-ft scores on the first run:** the scorer resumes from an existing output file, so my first rescore kept scores for the old candidates. I deleted the file and rescored all 2681 rows from scratch. HYBRID.md's reproduce steps now include deleting that file first.
- **Other `npx wrangler` intents are still `safe`:** `npx wrangler tail`, `login` and `whoami`. The review didn't flag them, but `npx` can run a project-local `wrangler` binary. Say if you want them raised to `medium` too.
- **Commit identity:** git has no identity configured here, so I committed as `lksrz <lukasz@wearfits.com>` for this commit only, as in earlier rounds. The empty untracked `review/fix9-log.md` was left out.
