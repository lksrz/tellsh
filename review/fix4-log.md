# Round-4 fix log

Fixes for `review/r4-claude.md` and `review/r4-codex.md`. Regression tests: `test/regressions5.test.js` (225 tests pass).
`gen_data` output is byte-identical to the build the shipped model was trained on, so the model was not retrained.

## Blocker
- **"Same but" restored the catalog default for an ambiguous path** (codex 1): `sameBut()` now reports the previous
  command's shell-state-dependent slots, and they are rendered as placeholders. `find "$DIR" … -delete` + "same but
  delete txt files" gives `find <PATH> -type f -iname '*.txt' -delete` (rule `refused`).

## Major
- **Stale commands replayed** (claude 2, codex 2): any newer history line (`ls`, `echo done`, `sleep 5`, `clear`,
  `git status`, …), or a later non-pipe segment of the same line (`kill 1111; ls newdir`), makes `last` stale. Then
  "same for X" and "same but …" are refused for a changing command. An explicit "same for X" whose previous command has
  no slot for X (`git status`) is refused instead of being sent to the classifier.
- **Listing provenance** (claude 1, codex 3):
  - A listing piped into any later stage (`ls DIR | sort | grep`, `ls -S DIR | head -1`,
    `gci DIR | Sort-Object | Select-Object -First 1`) marks DIR as a search root.
  - A filter stage anywhere later in the same pipeline counts, not just the next stage.
  - An argument-less `ls`/`tree`/`Get-ChildItem` (also `ls *.pdf`) after `cd DIR`, on a later line or after `&&` on the
    same one, marks DIR as listed, or as searched when filtered.
  - `tellsh list directory X` history lines mark X as listed.

## Minor
- **Source/destination swap** (claude): when the source is a pronoun reference (resolved or refused) and the request
  names one path, that path is the destination: `mv -i <SRC> /tmp/old`, `cp -ri <SRC> /backup`, and
  `cp -ri a.txt /backup` after `cat a.txt`.
- **Stop-word names** (claude): a stop word right after "folder/directory/file/katalog/plik" is the name when it ends
  the request or is followed by a continuation word ("sorted", "recursively", …). For example "delete the folder out"
  gives `rm -r out`, and "show disk usage of folder out sorted by size" gives `du -sh out`, no longer `du -sh .`.
  "folder on the disk" is still a preposition.
- **Danger** (claude): `-c`/`--command` strings of `flock`, `su` and `runuser` are checked as commands. `pkexec`,
  `chrt`, `cgexec`, `eatmydata`, `torsocks` and `catchsegv` are unwrapped.
- **Teacher held-out filter** (codex 4): `heldOutTexts()` always includes `test/slot-cases.js`, so `teacher.js` and
  `gen_data.js` use the same index.

## Numbers (EVAL.md)
Eval section unchanged (e2e 85.3%, composer any-acceptable 52.9%, OOD 94.6%, history 97.9% dev / 82.3% blind). The
latency section was re-run (noise only: cold p50 160 ms, warm p50 0.32 ms).
