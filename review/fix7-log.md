# Round 7 fixes (user decision: one line of history; review/r6-claude.md, review/r6-codex.md)

Regression tests: `test/regressions8.test.js` (12 tests). Full suite 295/295. Version stays 0.3.0 (package.json).

## One line of history (user decision) — `src/history.js` `buildContext`, `src/cli.js`
Only the single most recent command is a reference target. `buildContext` drops the running `tellsh` line once (zsh/
fish/PSReadLine write it first), then analyses exactly one line. Removed: cross-line recency (`age`, `all`), stale-
relative propagation across lines, `cd` line + later `ls` line linking, hint-selected older values (`chooseValue`),
"newest value of its type" guard. Kept per segment within the line: later segments win, listings after a value,
search roots / listed dirs, `cd` followed by other commands, `intentStale`. The CLI reads 2 lines (`loadHistory` n=2).
A pronoun with no matching entity in that line ("delete it" after `ls`) and "same for"/"same but" after a command
that cannot be repeated are now explicit refusals (placeholder + note). "files that are …", "this week" are not
references (`NOT_REF`). Still refused for a changing command: the checked-out branch (`git_delete_branch` only), a
request naming another target ("delete that backups folder" after `mkdir /srv/current`, `HINTED_NOUN`).
Tests changed on purpose (multi-line histories → one compound line, or now expect a placeholder): pipeline,
regressions2, 3-history, 4, 5, 6, 7.

## Findings
- **Blocker (both): quoted path with a space cut** — `src/shellwords.js` `joinWords`: among several argv words, a word
  with whitespace is re-quoted (`delete folder "/tmp/a b"`); a single argv word is the whole request. Used by the CLI
  and by `tellshQuery` (also skips `--shell X`-style option values; unreadable line → refused).
- **Blocker (codex 2): invalid history values → `.`** — `src/pipeline.js` `invalidHistorySlots`: same-for, same-but and
  pronoun fills blank a value that fails validation (265-char path) instead of dropping it.
- **Major (claude 2 / codex 3): refused reference → `rm -r .`** — refused/guarded references clear the `.` read for
  "this folder" (`refWordsOnly`); a CONTENTS refusal keeps the classifier's intent and classifies without history
  features (`ref.contents`): `find <PATH> … -delete`.
- **Major (claude 3 / codex 4): other wordings of the previous directory** — `LOCATIVE`: "previous/last/prior folder",
  "the directory I listed/used/…", "w poprzednim/ostatnim katalogu". A locative with any non-safe, non-find command
  that takes a path withholds every path slot with or without history ("delete notes.txt there" → `rm <FILE>`);
  "still there" is not a place.
- **Major (codex 5): global options hide a listing** — `afterGlobals` for git/docker/podman in `listedBySegment` and
  `segmentEnts` (`git -C /tmp status`, `docker --context prod ps`). Cross-line case is moot (one line).
- **Minor: "its contents", "what is in it", "usuń jego zawartość"** — `CONTENTS` extended.
- **Minor: "move it there"** — an object pronoun plus a place reference on a two-path command withholds both ends.
- **Minor: several paths / `pwd`** — non-safe intents: more explicit paths than path slots → placeholders + warning;
  a path inside backticks / `$(…)` (or an empty path slot when the request has one) → placeholder.
- **Minor: danger** — here-strings/heredocs into shells (checked as commands) and interpreters (high, literals and
  delete calls checked); `sh -c STR arg0 args` also checked with `$1`/`"$@"` filled in; `truncate`/`shred` of a system
  file and `>` onto a system file are critical (`>>` stays high); text piped into a bare interpreter is high.
- **Minor: NUL byte** — `suggest` refuses a request with NUL; `validateComposed` never passes NUL to `spawnSync`.

## Eval / data
- `node scripts/eval.js`: only section 5 changed. Dev 91.7% (48) → 92.5% (53: 1 gold edit, 5 rows added);
  blind 79.7% → 82.3% (2 gold edits for the one-line rule; both gained rows are rule fixes). Everything else unchanged.
- `gen_data.js`: output identical between HEAD and this change (all added dev queries were already held out). Note:
  it does not match the existing `build/` (43564 vs 43574 rows; the private real-usage split differs on this machine);
  that predates this round, `build/` was restored, the model was not retrained.
- Bench re-run (EVAL.md): cold p50 177 ms, warm 0.40 ms, history case 0.74 ms (was 1.6 ms).
