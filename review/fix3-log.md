# Round-3 fix log

Fixes for `review/r3-claude.md` and `review/r3-codex.md`. Regression tests: `test/regressions4.test.js` (216 tests pass).

## Blocker
- **Refusal fell back to the catalog default** (codex 1): `buildCommand(…, { blank })` now renders withheld slots as
  placeholders instead of using the template default. Used for paths with trailing punctuation
  (`delete all log files in /tmp/data!` → `find <PATH> … -delete`), refused history references
  (`find /var/log …` + "delete all those log files" → `find <PATH> …`), search-root refusals and ambiguous "same for" slots.

## Major
- **Shipped model/docs were v0.2** (claude 1, codex 6): retrained (`gen_data` → `train.py` → `build_triggers`) on
  31,534 classifier rows / 34,434 tagged sequences. `model/model.bin`, `test/fixtures/parity.json`,
  `model/compose_explained.json`, EVAL.md (eval, bench, teacher sections + hand-written header) and the README table are
  regenerated from the final code. The shipped model was trained on exactly the current `gen_data` output (checked
  byte-for-byte). The round-1/round-2 fix logs are corrected (round 2 did not retrain).
- **"Delete them" after a filtered listing** (claude 2): `Get-ChildItem DIR -Filter/-Include/-Exclude/-Recurse` (or a
  positional filter) and `ls DIR | grep …` (also findstr/Select-String/Where-Object stages) mark DIR as a search root, so
  the reference is refused for changing commands.
- **Punctuation guard bypassed** (codex 2): "same for /tmp/data!" leaves the new path as a placeholder. The composer never
  aims a writing command (chmod, tar, or anything the danger checker flags) at such a path. Read-only compositions with
  a sentence comma after the path (`under ~/code, …`) still work.
- **"Same for" replayed an older destructive command** (codex 3): when a newer history line named other targets than the
  command it would repeat, and that command is not read-only, the request is refused (`understood: false`, no command;
  the CLI says "Cannot resolve … from history", exit 3).
- **Typed process references ignored recency** (codex 4): when a noun maps to several entity types ("that process":
  pid/proc), the newest one wins. An ambiguous newest `pgrep "$PROC"` is refused.
- **Literal tilde lost** (codex 5): a quoted or escaped leading `~` (`'~/notes.txt'`, `\~/notes.txt`, `"~"/x`) is decoded
  as `./~/…`, so it is rendered and compared as the literal directory. `~user` is treated as an expansion (refused).
  `sameCmd("cat '~/notes.txt'", "cat ~/notes.txt")` is now false.

## Minor
- `what about this` (no new target) → refused instead of `uname -a`.
- Plural "them/those/these/je/te" after a plain listing (`ls /tmp/build`, `Get-ChildItem DIR`) refers to the entries:
  refused for changing commands. "delete it" still targets the directory.
- `egrep`/`fgrep`/`ack`/`ag`/`git grep` are searches like `grep`: explicit refusal.
- Danger: `unshare`, `watch`, `nsenter`, `setpriv`, `strace`, `ltrace`, `flock`, `taskset`, `systemd-run`, `runuser`,
  `firejail`, `proot`, `fakeroot` are unwrapped. `shred`/`wipe`/`blkdiscard`/`truncate` on a disk device is critical.
- Composer/slots: option words ("recursively", "case-insensitive") are never the pattern. In "grep for ~/foo in src",
  the path-like word after the search verb is the pattern and the other path is the directory searched.
- A quoted request value that may end at an escaped quote (`"a\" -e evil"`) becomes a placeholder, with a warning, in
  every shell.
- A bare function word tagged as a path ("on" in "delete the cache folder on the disk") is never a target.
- Teacher accounting: every request sent counts in `stats.calls`, including failed and retried ones.
- Held-out near-duplicate matching ignores word order (`nearKey` sorts words): affects training exclusion and the blind
  contamination report.

## Numbers (EVAL.md)
end-to-end 82.8% → 85.3% · composer any-acceptable 31.4% → 52.9% · OOD rejected 92.4% → 94.6% · history 97.9%
(dev), 82.3% (v0.3 blind) · cmd 117 → 114/149 rendered (`/`-leading POSIX paths are refused as cmd.exe switches).
