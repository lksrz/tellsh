I fixed every round-4 blocker, major and minor finding from both reviews, each with regression tests, and committed locally as `305c764 fix review round 4`. Nothing was pushed or published, and the version is still 0.3.0. All 225 tests pass (216 before plus 9 new ones in `test/regressions5.test.js`).

**Blocker (codex)**
- "same but delete txt files" after `find "$DIR" … -delete` now gives `find <PATH> … -delete`. The unreadable `$DIR` stays a placeholder instead of becoming `.`.

**Major**
- **Repeating an older command:** "same for X" and "same but …" now refuse a changing command if anything ran after it. That includes lines like `ls`, `echo done`, `sleep 5`, `clear` or `git status`, and a later part of the same line (`kill 1111; ls newdir`). An explicit "same for X" is also refused when the previous command has nowhere to put X (e.g. after `git status`). In the CLI this prints "Cannot resolve…" and exits with code 3.
- **"Delete them/it" after a listing:** these cases are now refused instead of producing `rm -r` on the directory:
  - a listing piped into anything (`ls DIR | sort | grep pdf`, `ls -S DIR | head -1`, `Get-ChildItem C:\x | Sort-Object Length | Select-Object -First 1`);
  - a filter anywhere later in the pipeline, not just the next stage;
  - a bare `ls`, `ls *.pdf` or `Get-ChildItem` after `cd DIR`, on a later line or after `&&` on the same one;
  - an earlier `tellsh list directory X` line.

**Minor**
- **Move/copy with a reference:** "move them to /tmp/old" now gives `mv -i <SRC> /tmp/old` instead of swapping source and destination.
- **Stop-word names:** "delete the folder out" gives `rm -r out`, and "show disk usage of folder out sorted by size" gives `du -sh out` instead of quietly using `.`. "folder on the disk" is still read as a location. This is a fixed rule in `src/pipeline.js`; the tagger still doesn't recognise these words.
- **Danger checker:** command strings passed with `-c` to `su`, `runuser` and `flock` are now checked. `pkexec`, `chrt`, `cgexec`, `eatmydata`, `torsocks` and `catchsegv` are unwrapped too. `flock -c "rm -rf /" /tmp/l` is now high risk and critical.
- **Teacher filter (codex):** the shared held-out list now always includes the hand-written slot cases, so `teacher.js` and `gen_data.js` exclude the same texts.

**Eval and bench**
- `gen_data` output is byte-identical to the build the shipped model was trained on, so I didn't retrain.
- The eval section is unchanged: 85.3% end-to-end, history 97.9% dev and 82.3% blind, OOD 94.6%.
- I re-ran bench and updated the latency numbers in EVAL.md and README. They moved only by noise: cold p50 160 ms, warm p50 0.32 ms.
- README now describes the new history behaviour, and `review/fix4-log.md` (previously empty) has the full round-4 log.

**Behaviour change:** one round-3 test expected `rm -r old` then `clear`, then "same for /srv/x", to produce `rm -r /srv/x`. This round reverses that on purpose (it's refused now), and I updated the test.

**Recreated file:** I accidentally deleted the untracked marker `review/.r4done` and recreated it as an empty file. If it had content or your automation relies on it, please check it.

**Connectors:** the Cloudflare Developer Platform, Home and cnvs.app connectors need authorizing in your claude.ai connector settings before they can be used. None were needed for this work.
