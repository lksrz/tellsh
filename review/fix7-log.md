History references now use only the previous command, and every open finding in `review/r6-claude.md` and `review/r6-codex.md` is fixed. Everything is committed as `142fa6f` on `master`. All 295 tests pass, eval and bench were re-run, and nothing was pushed or published.

**One line of history**
- `buildContext` (`src/history.js`) reads only the most recent command. It first drops the current `tellsh` call, which zsh, fish and PowerShell write to the history file before it runs. The CLI now reads 2 lines instead of 10.
- All the logic that compared or combined older lines is gone. Rules within one compound line (`cat a.txt; ls`, `cd X && make`) still work.
- If the previous command has nothing of the needed type ("delete it" after `ls`), or can't be read, the reference is refused: you get a placeholder and a note, never an older value. "same for X" or "same but …" after a command that can't be repeated is refused the same way.
- Destructive requests still need confirmation. "delete that branch" is refused when the previous command checked that branch out. "delete that backups folder" is refused when the previous command named a different folder.

**Review findings fixed**
- **Blocker, both reviews:** a quoted path with a space is no longer cut. `tellsh delete folder "/tmp/a b"` gives `rm -r '/tmp/a b'`, both from the command line and from an earlier `tellsh` line in history. A request passed as one quoted argument is used as is.
- **Blocker, codex:** a history value that fails validation (e.g. a 265-character path) becomes a placeholder, never `find .`.
- **Major:** "delete all log files in this folder" with a refused reference now gives `find <PATH> … -delete`, never `rm -r .`.
- **Major:** "in the previous folder", "in the last directory", "the directory I listed" and "w poprzednim katalogu" are now treated like "there". A file named next to "there" ("delete notes.txt there") becomes a placeholder, with or without history.
- **Major, codex:** `git -C /tmp status` and `docker --context prod ps` count as listings again.
- **Minor:**
  - "its contents", "what is in it" and "usuń jego zawartość" no longer target the directory itself.
  - "move it there" is refused.
  - A request naming more paths than the command takes, or a path inside `` `…` `` or `$(…)`, gets a placeholder and a warning.
  - The danger checker now catches here-strings and heredocs, `sh -c 'rm -rf "$1"' _ /`, and truncating or overwriting system files (now critical).
  - A NUL byte in the request no longer crashes `suggest()`.

**Data, eval and docs**
- I changed 3 gold rows where the expected answer referenced an older line:
  - dev: "start it again" → `sudo systemctl start <SERVICE>`
  - blind: "push it" → `git push`
  - blind: "delete that branch" → `git branch -d <BRANCH>`
- I added 5 dev rows checking that an older line is never used. Their queries were already in the held-out set, so training data is unaffected.

| History eval | Before | After |
|---|---|---|
| Dev set | 91.7% (48 rows) | **92.5%** (53 rows) |
| Blind set | 79.7% | **82.3%** |

Both rows gained on the blind set come from rule changes, not the gold edits. All other eval numbers are unchanged. In the bench, the history case went from 1.6 to 0.74 ms. EVAL.md, the README history section, the CLI help and `review/fix7-log.md` are updated.

Things to check:
- **Blind set edits:** I edited 2 gold rows in a set described as "never used for tuning". EVAL.md lists each change, but you may prefer to keep those rows untouched.
- **"push it" after `git commit`:** it gives `git push`, which pushes the current branch, rather than a `<BRANCH>` placeholder. I judged that the right answer; say if you'd rather have the placeholder.
- **Training data vs `build/`:** regenerating the training data gives 43,564 classifier rows against 43,574 in the shipped model. HEAD without my changes gives the same 43,564, so this predates the round. It is probably the private real-usage data differing on this machine. I restored `build/` and did not retrain.
- **Commit identity:** git had no identity configured, so I committed as `lksrz <lukasz@wearfits.com>`, matching earlier commits, without changing git config.
- **Uncommitted files:** `review/STATUS` and `review/.hdone` look like review-tool markers, so I left them out.
edates this round, `build/` was restored, the model was not retrained.
- Bench re-run (EVAL.md): cold p50 177 ms, warm 0.40 ms, history case 0.74 ms (was 1.6 ms).
