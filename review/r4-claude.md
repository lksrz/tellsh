I'm requesting changes. Most of round 3 is fixed and the shipped artifacts now match the code, but the two round-3 majors about history references are only partly fixed. Both can still lead to a high-risk `rm -r` on the wrong directory.

I didn't modify any files. All 216 tests pass. I ran the probes from `/tmp/r4c`, and ran `gen_data`, eval and `build_triggers` on a `git archive HEAD` copy. `review/r4-claude.md` is empty and `review/r4-codex.md` was still being written, so I didn't use either.

## Status of round-3 findings

**Fixed, and I reproduced each fix:**
- **Codex blocker (refusal fell back to the catalog default):** `delete all log files in /tmp/data!` (also `?`) now gives `find <PATH> … -delete`. After `find /var/log …`, "delete all those log files" gives `<PATH>`.
- **Stale model and docs (claude 1, codex 6):**
  - `gen_data` produces exactly 31,534 classifier rows and 34,434 tagger sequences, matching EVAL.md.
  - Re-running `scripts/eval.js` gives an eval section identical to the committed one (85.3%, 52.9%, 94.6%), and README matches.
  - Rebuilding gives `compose_explained.json` and `tldr_triggers.json` byte-identical to the committed files.
- **Filtered listing directly followed by `| grep`, and `Get-ChildItem -Filter/-Include/-Recurse` (claude 2):** these are refused, including for "delete it".
- **"Same for" punctuation guard (codex 2):** `same for /tmp/data!` gives `rm -r <PATH>`. The chmod composer case no longer targets `/tmp/data`.
- **Typed process references (codex 4):** after `kill 1111` then `pgrep current-worker`, "kill that process" now targets `current-worker`.
- **Literal tilde (codex 5):** `cat '~/notes.txt'` or `\~/notes.txt` then "delete it" gives `rm './~/notes.txt'`. `~user` is refused.
- **Minors:**
  - `what about this` is refused.
  - `egrep`/`git grep`/`ack` are refused.
  - The wrapper list is extended, and `shred`/`blkdiscard`/`truncate` on a disk device is critical.
  - `grep for ~/foo recursively in src` gives `grep -rn -- '~/foo' src`.
  - The escaped-quote case leaves a placeholder.
  - Teacher accounting (`jev.js`) and the word-order-insensitive `nearKey` are both fixed.
- **"Same for" replays an older changing command (codex 3):** fixed only when the newer line names a target, for example `ls newdir`. See Major 2.

## Findings

### Major
1. **A listing after `cd` (or with a non-filter stage before the filter) still turns "delete them/it" into `rm -r` on the whole directory.** This is the same bug as round-3 Major 2. The fix only marks a directory when it is named in the same command and the filter is the stage straight after the listing (`src/history.js:434`, `:590`, `:307`). A directory that comes from `cd`, or a filter that isn't directly after the listing, never gets that mark.
   - `cd ~/Downloads` then `ls | grep pdf`, then "delete them" or "delete it" → `rm -r ~/Downloads`.
   - `cd /tmp/build` then `ls`, then "delete them" or "usuń je" → `rm -r /tmp/build`. PowerShell does the same with `Get-ChildItem` → `Remove-Item … '/tmp/build' -Recurse`.
   - `ls ~/Downloads | sort | grep pdf`, `ls ~/Downloads | head -50 | grep pdf` and `ls ~/Downloads | sort | rg pdf`, then "delete it" → `rm -r ~/Downloads`.
   - `ls -S ~/Downloads | head -1`, then "delete it" → `rm -r ~/Downloads`. `Get-ChildItem C:\x | Sort-Object Length | Select-Object -First 1` → `Remove-Item 'C:\x' -Recurse`.
   - Fix: apply the listing/search mark to the `cd` directory when a later argument-less `ls`/`gci` lists it. Mark the directory as filtered when any later pipeline stage is a filter or `head`/`tail`/`Select-Object`, not just the next stage.

2. **"Same for X" still replays an older destructive command when the newer command has no arguments** (`src/history.js:642-643`). `newerUses` is only set when the newer line names something or is opaque. Bare `ls`, `echo done` and `sleep 5` do neither, so they are skipped:
   - `rm -r old` then `ls`, then "same for /srv/current" → `rm -r /srv/current`. The previous command was `ls`.
   - `echo done`, `sleep 5` or `clear` as the newer line → `rm -r /srv/current` too.
   - `git status` as the newer line → `find /srv/current … md5sum | uniq -dD`. That is safe but makes no sense.
   - Fix: any newer, non-empty history line should count as "previous command". Refuse unless `last.age` is 0 and `last` is a non-safe intent.

### Minor
- **Source and destination swap when the source reference is refused** (this was already in the previous round): "move them to /tmp/old" after a filtered listing, or "copy it to /backup" after `cat $F` → `mv -i /tmp/old <DST>` / `cp -ri /backup <DST>`. The placeholder stops it running, but filling `<DST>` in the edit prompt would move `/tmp/old`.
- **`FUNCTION_WORD` path filter rejects real names** (`src/pipeline.js:36`):
  - "delete the folder out", "delete folder up" and "delete the file w" give placeholders.
  - Worse, "show disk usage of folder out sorted by size" gives `du -sh .`, silently retargeting to the current directory (read-only).
- **Danger checker** (`src/danger.js:88-107`):
  - Rated safe, though the command runs `rm -rf /`: `flock -c "rm -rf /" /tmp/l`, `su -c "…"` and `runuser root -c "…"`. Commands with a `-c` argument are not unwrapped.
  - Also rated safe: `pkexec`, `chrt`, `cgexec`, `eatmydata`, `torsocks` and `catchsegv` before `rm -rf /`.
  - This only matters for commands the user edits at the confirm prompt (`src/cli.js:225`); catalog output can't produce these.

### Training/data
No new issues. Emission-time exclusion now also ignores word order, and that only ever excludes more rows. The teacher accounting counts every request. The shipped model reproduces exactly from the current `gen_data` output.

A side note: the Cloudflare Developer Platform, Home and cnvs.app connectors need authorizing in your claude.ai connector settings before they can be used. None of them were needed for this review.

VERDICT: REQUEST_CHANGES
