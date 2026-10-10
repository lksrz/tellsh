I've fixed every finding in `review/r7-claude.md` and `review/r7-codex.md`, each with regression tests. Everything is committed as `3538ae3` on `master`. All 306 tests pass, eval and the hybrid evaluation were re-run, and nothing was pushed or published. History still reads only the previous command.

**Findings fixed**
- **Major, quoted request text read as the path:** a multi-word argument is now treated as the request when it comes first (`tellsh "delete folder" /tmp/x` gives `rm -r /tmp/x`). It is treated as a value when it looks like a path (`"/tmp/my data"`, `"My Notes.txt"`). Anything else (`tellsh delete folder "my data"`) gets a placeholder plus a warning when the command changes something. Earlier `tellsh` lines in history are read the same way. All four of the reviewer's examples work, and the `.log` filter is kept.
- **Major, current `tellsh` call matched too loosely (both reviews):** it is now dropped from history only when it is an exact match for the request.
- **Major, composer filling withheld values:** `` `pwd` ``, `$(…)` and paths with line breaks are no longer composed into the command. The catalog command keeps its placeholder.
- **Major, `fetch_model.js` could write outside its directory:** the manifest must list exactly the three bundle files with checksums. Everything is downloaded and verified before anything is written.
- **Major, held-out texts in the hybrid training data:** all rows, including typo and reworded copies, are now checked against the held-out sets. That removed 143 rows, including the ones the reviewer named. I retrained the encoder (B) and recalibrated the A+B policies (A+B now: `tau` 0.8, `alpha` 0.75, `none` 0.5).
- **Major, `--top` changing hybrid results:** the reranker now always looks at its own 5 candidates. `--top` only limits how many are shown.
- **Minor:**
  - "delete them" after `touch a.txt b.txt` (or after `rm a b`, `ls /a /b`) now gives a placeholder, not the last file.
  - `rm /etc/passwd`, `sed -i … /etc/passwd` and `tee /etc/passwd` are critical; `tee -a` stays high.
  - "delete it" after `cat a.txt; cd /srv` is refused.
  - "move it there" is now marked refused with a note.
  - `npm install @types/node` keeps the package; an invalid package name becomes `<PKG>` instead of disappearing.
- **EVAL.md:** it now notes that the blind history scores from round 7 on aren't directly comparable with earlier rounds.

**Results**
- **Main model (A):** unchanged. Every eval number is identical to before, apart from the new-intents set's exact command (90.7% → 91.0%, from the scoped-package fix).
- **Hybrid after retraining:**

| | Before | After |
|---|---|---|
| Real usage, A+B | 88.8% | 88.3% |
| `data/eval`, A+B | 96.7% | 96.8% |
| Hybrid blind set, A+B | 98.9% | 99.4% |
| Blind out-of-domain rejected, A+B | 98.4% | 96.9% |
| End-to-end exact command (relexicalised `data/eval`), A+B | 86.8% | 85.4% |

  The hybrid now hands fewer requests to the encoder, so real-usage queries are faster (p50 12.2 → 1.3 ms). HYBRID.md, EVAL.md, README and the results files are updated.

**Things to check**
- **The tiny-LM reranker (C) was not retrained.** Its training data had the same leak, and retraining needs a GPU, which isn't available here. HYBRID.md says its numbers may be slightly optimistic. It isn't shipped.
- **The bundle version went from 0.4.0 to 0.4.1** in `hybrid/package/tellsh-model-enc/package.json`, because the model files changed. It hasn't been published.
- **The reviewer's typo example changed answer.** `clnoe https://github.com/sharkdp/bat` now gives `curl -fLO …` for every `--top`, where the old encoder gave `git clone` at `--top 5`. The answer no longer depends on `--top`, but the retrained encoder prefers `curl` here.
- **One older test changed on purpose:** "show it" or "delete it" after `ls /a /b` or `du -sh /a /b` now gives a placeholder, as the plural finding requires.
- **Problems I found but didn't fix**, because they exist in the previous commit too and are outside these findings:
  - `npm i -g typescript` gives `npm run typescript`.
  - `npm install all deps` gives `npm install all`.
- **Commit identity:** git has no identity configured, so I committed as `lksrz <lukasz@wearfits.com>`, matching earlier commits.
- **Left out of the commit:** the uncommitted edit to `review/fix7-log.md` was already there; I didn't stage or touch it.
