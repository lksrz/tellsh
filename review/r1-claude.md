I found 1 blocker, 11 major and 13 minor issues, so I'm requesting changes. Quoting itself held up: injection attempts stayed as single quoted arguments in bash, zsh, fish and PowerShell, and cmd refuses values it can't quote safely. The problems are elsewhere: the wrong targets get picked for destructive commands, the composer lets values become options, and several held-out evaluation claims are not true.

All 151 tests pass (`npm test`). Re-running the data generation and a full retrain gave byte-identical build output and `model/model.bin`. The `scripts/eval.js` output matches EVAL.md exactly, and the training script's model format matches the runtime loader. Unless noted, I reproduced every runtime finding below with `--dry-run`/`--json`. The training findings come from a separate review pass; I re-read the `gen_data.js` filter, the end-to-end scoring loop and the teacher report text myself and they match. The prior review is in `review/r1-codex.md` (`review/r1-claude.md` is empty). The last commit says it fixed those findings, but seven of its training/eval findings are untouched.

## Blocker

**1. A path containing `(`, `,`, `;`, `:` or trailing dots is cut back to a parent directory, and that parent gets deleted.** (`src/tagger.js:106-112` `normPath`; `src/slots.js:147` `PATH_TOKEN`)
- The tagger finds the full span, then `normPath` re-extracts it and accepts a prefix. If that fails, a location word ("Downloads") is used instead.

| Request | Command produced |
|---|---|
| `delete folder ~/Downloads/backup(2)` | `rm -r ~/Downloads` |
| `delete the folder /home/me/photos,2019` | `rm -r /home/me/photos` |
| `remove directory /var/www/site;old` | `rm -r /var/www/site` |
| `delete file /srv/a:b.txt` | `rm /srv/a` |
| `delete folder ~/old...` | `rm -r ~/old` (still open from the prior review) |

- None of these is flagged critical, and each looks like a plausible command at the confirmation prompt.

## Major — runtime

**2. Composer: a value starting with `-` becomes an option, which can run code.** (`src/compose.js:440-460`, `validateComposed` at `:313-327`)
- Unlike `fill.js`, the composer never prefixes such values with `./`, and validation only looks at unquoted tokens.
- `spakuj notes.txt i '--use-compress-program=sh x.sh' do backup.tar szczegolowo` → `tar -c -v -f backup.tar notes.txt '--use-compress-program=sh x.sh'`, risk medium, no warnings. Running it executed `x.sh` (the composer review demonstrated this in a temp directory).

**3. Composer output uses POSIX quoting but is also offered to fish.** (`src/pipeline.js:154,221`)
- In fish, `\'` inside single quotes is an escape, so a value ending in `\` leaves the quote open and later text becomes code: `ls -l -S 'a\' 'b ; id ; echo'`.
- Not executed, because fish isn't installed here. Either use `fishQuote` or exclude fish from the composer.

**4. PowerShell 5.1 and pwsh < 7.3 pass embedded `"` to native programs unescaped.** (`src/fill.js:500-505` only fixes the `bash -c` wrapper; the native variants in `src/variants.js` are not covered.)
- `commit with message 'a" --amend "b'` → `git commit -m 'a" --amend "b'`; git receives `--amend` as an option.
- The same applies to the `tar`, `unzip`, `diff`, `chown` and `curl.exe` variants.
- Not executed (no pwsh here); this is documented legacy PowerShell behaviour.

**5. History: a move/copy destination becomes "it".** (`src/history.js:233,387-389`)
- `mv notes.txt ~/Documents/` followed by `delete it` → `rm -r ~/Documents/`, not flagged critical.
- PowerShell `Move-Item … -Destination C:\Users\me\Documents` behaves the same way.

**6. History: asking for a type that isn't in history falls back to a different type.** (`src/history.js:576-577`)
- `delete that branch` with only `ls tmp_dir` in history → `rm -r tmp_dir`.
- The branch pattern `gal\w*` also matches "gallery", so `delete that gallery folder` can become `git branch -d gallery`.

**7. History: the parsers pick the wrong word.** (`src/history.js:339,342,348,363`)

| History line | Request | Result |
|---|---|---|
| `kill -s 9 4242` | `kill that process` | `kill 9` |
| `ps aux \| grep -v grep \| grep node` | `kill it` | `pkill -f grep` |
| `pkill nginx -u bob` | `kill it` | `pkill -f bob` |
| `git checkout -- app.js` | `switch to that branch` | `git checkout app.js` (discards local changes, marked medium) |

**8. History: older or ambiguous targets still win** (prior review findings, still open):
- On a compound line the first command wins: `cat old.txt; cat new.txt` → `rm old.txt`.
- Redirect targets are ignored entirely.
- `chooseValue` (`src/history.js:606`) falls back to an older value when the newest one is ambiguous (`$BACKUP`).
- Implicit filling (`src/pipeline.js:203-214`) fills destructive commands without any reference word: `delete the folder` after `du -sh /var/lib/docker` → `rm -r /var/lib/docker`.
- There is no cwd tracking, so a relative path from before a `cd` is reused.

**9. The current `tellsh` call can become the "previous command".** (`src/history.js:281-288`)
- zsh with shared/incremental history, fish and PSReadLine write the running line to history first.
- `du -sh /home` then `same for /var` correctly gives `du -sh /var`. With the `tellsh --history same for /var` line also in history, it gives an unrelated `find … md5sum …` command.

## Major — training, data and evaluation

**10. Held-out text leaks into training.** (`scripts/gen_data.js:125` filters only the base rows)
- The typo copies (`:160`), relexicalised copies (`:164-166`) and hard-coded pronoun phrases (`:175-180`) are never checked.
- An instrumented run found 162 classifier rows and 81 tagger sequences matching 45 held-out texts. Examples: the eval sentence `show routng table`, and 20 of the 48 history-eval queries.
- The measured effect is small, but README.md:187 ("never used for training") is false.

**11. The "held-out value pool" is not held out.** (`scripts/lib/silver.js:139,155,164-172,179`; claim at `scripts/eval.js:267`)
- Many eval-pool values appear verbatim in training (`./src`, `app`, `docker`, port `3000`).
- Numbers, PIDs, sizes and ports are drawn from the same random ranges for train and eval.
- 62 eval values are kept unchanged.

**12. The end-to-end metric credits incomplete commands.** (`scripts/eval.js:251-258`)
- The gold command is built by the production code, and nothing requires the gold to be complete. 52 of 1,326 gold commands contain a placeholder, and 33 of those are counted as exact matches, e.g. `grep -rn -- <PATTERN> /etc`.

**13. The composer's flag table is built from unfiltered training data.** (`scripts/build_triggers.js:53-55`)
- It reads the 540 rows that `gen_data` drops for colliding with eval sets. The shipped `model/compose_explained.json` changes for 5 intents once they are filtered out.
- That table decides when the composer fires, so it affects the composer and false-fire metrics.

**14. The teacher check is not independent, and part of its report is hard-coded.**
- `scripts/teacher.js:88,104` renders the command from the gold intent and includes it in the question, so the answer leaks and "intent agreement 100%" is not an independent result.
- `:163` always prints "no disagreement, **0 training rows dropped or relabelled**", whatever the results or `decisions.jsonl` say.

## Minor

1. A safe command whose slot was filled from history keeps `method: 'catalog'` (`src/pipeline.js:203-215`). `show file contents` after `cat secret.txt` gives `cat secret.txt`, which `--yes` would run, contrary to the help text promising history-resolved commands never auto-run.
2. `--threshold foo` becomes NaN and every query counts as understood. `bake me a cake` was accepted at 0.27% confidence and exited 0 (`src/cli.js:61`).
3. The danger checker misses `busybox rm -rf /`, `rsync --delete … /`, `cp /dev/null /etc/passwd`, `docker run -v /:/h … rm -rf /h`, and `chmod -R -v 777 ~` / `tar -x -C /`. This only affects user-edited and composed commands.
   - `QUOTE_CHARS` in `src/danger.js:16` is unused, so PowerShell typographic quotes defeat the critical-target check: `Remove-Item -Recurse -Force ‘C:\’` is not flagged critical.
4. In `simpleCommands`/`splitCommand`, the POSIX `&>` branch can never run (`src/shellwords.js:201` vs `:211`), and `$(` is split at the `(`.
5. cmd: `/s /c` without wrapping quotes mangles edited commands that start with `"` (`src/cli.js:106,115`). Values starting with `/` are read as switches: `delete directory /q` → `rmdir /s /q`.
6. Function templates prefix `./` onto non-path values starting with `-`: `printf '%s' './-n hello'`, and the same for findstr and taskkill (`src/fill.js:486`).
7. Tilde expansion is applied to non-path slots: grep patterns, `git commit -m ~`, and PowerShell `.Replace($HOME, …)`.
8. "Same for" accepts pronouns and filler words as values: `what about this` → `rm this`, `and with force` → `rm -r force` (`src/history.js:546-548`).
9. `kill process named -9` → `kill 9`. Separately, `sedEscapeOld` doesn't escape newlines and the `old` slot accepts them (defensive gap only; I couldn't trigger it from the CLI).
10. A duplicate `case 'user'` in `src/compose.js:374/399` silently drops owner and author filters.
11. Two smaller performance and robustness issues:
    - The PowerShell history regex backtracks exponentially (`src/history.js:120`).
    - `model.bin` is parsed with no size or offset validation.
12. Training-side issues:
    - Pronoun-phrase triplets are split across the calibration holdout.
    - The compose threshold is calibrated on only 35 OOD rows.
    - The accept threshold falls back to 0.0 (accept everything) if no threshold reaches 97% kept (`scripts/train.py:194-231`).
    - 11 of the 99 hand-written slot cases appear verbatim in training.
13. Smaller training-script issues:
    - `cmdnorm` ignores quoting: `du -sh *` and `du -sh '*'` compare equal.
    - `report.js:12` uses a string replacement, so `$&`/`$'` in generated text would corrupt EVAL.md.
    - Tagger features are deduplicated in training but not at runtime (34 tokens affected).
    - `tldr_ingest.py` follows symlinks in an untrusted checkout.

No files were modified; my probe scripts are in `/tmp`.

VERDICT: REQUEST_CHANGES
