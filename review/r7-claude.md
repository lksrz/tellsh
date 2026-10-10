# tellsh round 7 re-review (`0d87457..HEAD`, at `a816a06`)

All 295 tests pass. I probed the runtime with about 90 history and command-line cases. Nothing in the repo was changed; my scratch files were in `/tmp` and are deleted.

**Round 6 findings: all fixed.**
- **Quoted paths:** `delete folder "/tmp/a b"` now gives `rm -r '/tmp/a b'`, typed directly or read back from an earlier `tellsh` line.
- **Invalid history values:** a 265-character path becomes a placeholder, never `.`.
- **"Delete all log files in this folder" with a refused reference:** gives `find <PATH> … -delete`, never `rm -r .`.
- **Place wordings:** "previous folder", "w poprzednim katalogu" and the other variants now resolve.
- **`git -C` / `docker --context` before a listing:** fixed.
- **Minor ones also fixed:** "its contents", "move it there", several paths for one slot, `$(…)`, here-strings, `sh -c … _ /`, and NUL bytes.

**One-line history:** I found no case where a value from two lines back is used, apart from the minor case in finding 2 below. "delete it" after `ls`, `cd -`, `cat $HOME/a.txt`, `cat *.txt` or `cat a.txt | tee /etc/hosts` is refused with a placeholder.

## Findings

### Major
1. **A quoted multi-word request becomes the path** (`src/shellwords.js:191-201`, called at `src/cli.js:163`).
   - `joinWords` puts quotes back around any argument that contains a space. That includes arguments that are part of the request text, not a value.
   - Each of these gives a complete, high-risk command with no placeholder:
     - `tellsh --dry-run "delete folder" /tmp/x` gives `$ rm -r 'delete folder'`
     - `tellsh "delete the folder" "/tmp/my data"` gives `rm -r 'delete the folder'`
     - `tellsh "usuń katalog" build` gives `rm -r 'usuń katalog'`
     - `tellsh "delete all log files in" "/tmp/my logs"` gives `find '/tmp/my logs' -type f -iname <GLOB> -delete`, and the `.log` filter is lost.
   - At `0d87457` the first one gave `rm -r /tmp/x`, so this is a new regression from the round 6 fix.
   - The same function is used for `tellsh …` history lines (`src/history.js:384`), so the problem can come back through history too.
   - Suggested fix: only re-quote an argument with spaces when it looks like a value (it contains `/`, `\`, `~`, or a `.ext`), or when it comes after the first argument that is plain request text. When unsure, leave a placeholder. Add tests for `["delete folder", "/tmp/x"]` and `["usuń katalog", "build"]`.

### Minor
2. **The current `tellsh` call is matched too loosely** (`src/history.js:755`).
   - `norm(prev).includes(norm(query))` also removes an *earlier* `tellsh` line whose text merely contains the query.
   - In bash, which does not write the running command to the history file first: history `['cat secret.txt', 'tellsh show it delete it']` plus "delete it" gives `rm secret.txt`. That value is from two lines back.
   - Fix: require an exact match after normalisation. Removing the `includes` alternative does it.
3. **A plural reference silently drops values** (`src/history.js` `analyzeCommand`/`entsFromSlots`). "delete them" after `touch a.txt b.txt` gives `rm b.txt` with no warning. It should leave a placeholder or name all the files.
4. **The danger checker is inconsistent for system files** (`src/danger.js`).
   - Round 7 made `truncate -s0 /etc/passwd` and `cp /dev/null /etc/passwd` critical.
   - These are still only high, not critical: `rm /etc/passwd`, `rm -f /etc/shadow`, `sed -i d /etc/passwd`, `tee /etc/passwd < /dev/null`, `cat /dev/null | sudo tee /etc/passwd`.
   - Unlike the earlier checker gaps, this one is reachable from a generated suggestion, not just from editing at the confirm prompt: after `sudo cat /etc/shadow`, "delete it" gives `rm /etc/shadow`.
5. **`cat a.txt; cd /srv` then "delete it" gives `rm -r /srv`.** It is marked critical, so you have to type it again. But a `cd` at the end of a line wins over a file read in the same line. `locativeRef` refuses the matching "there" case (`cd /tmp/x; cat a.txt`). The "it" case should be refused too.
6. **"move it there" after `cd /tmp/x` returns nothing useful.** It comes back with `understood: false`, `method: none`, but `context.rule: 'pronoun'`. That is safe, since there is no command, but the context should say `refused` with the "it … there" note.

### Training, data and eval
- Only the EVAL.md wording and the gold rows changed. Training data and the model are unchanged.
- The 2 edited gold rows in the blind set (`data/blind/history.jsonl`) are listed in EVAL.md. Still, that set is described as never used for tuning. I'd note in EVAL.md that the blind history score from round 7 on is not directly comparable to earlier rounds.

The verdict is REQUEST_CHANGES because of the Major finding.

VERDICT: REQUEST_CHANGES
