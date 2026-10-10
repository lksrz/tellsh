I'm requesting changes. All round-2 runtime findings are fixed and the training/data code is fixed, but two majors remain. The shipped model is still v0.2, and the round-2 "delete them" fix only covers `find`/`grep`, so the same bug comes back through other commands.

All 203 tests pass (`npm test`). Nothing in the repo was modified: probes ran from `/tmp/r3c`, and eval, `gen_data` and `build_triggers` ran on a `git archive` copy in `/tmp/r3c/repo`. A `scripts/train.py` process is running in `/workspace/tellsh` right now, but none of its output is committed. `review/r3-codex.md` was still being written, so I didn't use it.

## Status of round-2 findings

**Fixed, and I reproduced each fix:**
- **"On the disk" phrases:** `usuń folder cache na dysku` now gives `rm -r cache`. The English versions now leave a placeholder instead of `/`. `find … on the whole disk` still searches `/`.
- **"Delete them" after `find`/`grep`/`rg`/`fd`/`locate`:** refused, and `find|xargs` lines are refused too. `grep -rl TODO src` followed by `ls src` still allows `rm -r src`, as intended.
- **PowerShell < 7.3 checks every slot of a native command:** the `tar -C 'out" --to-command=…'` and `--use-compress-program` cases are now refused.
- **Codex history findings:** a later segment of a compound line wins across types. `cat old.txt; ls $D` is refused. `remove it` / `kill it` now pick the newest target, not an older one whose name contains the verb.
- **Paths:** `/tmp/data!` and `/tmp/a.txt.` become placeholders. `/tmp/data.` is kept literally.
- **Danger checker:** all the gaps listed in round 2 are now critical (`timeout`/`chroot` wrappers, `/.`, `/etc/..`, `find -L`, `/usr/lib`, `~/.ssh`, `mv /etc`, `-v=/:/h`).
- **Composer:** `~` stays literal, the pattern is no longer reused as a search path, `--author` gets a value, and `$(…)` is rejected.
- **Other runtime minors:** `ls /a /b` now picks `/b`. cmd's `findstr /c:"/api"` works.
- **Training/data:**
  - Near-duplicate and contrastive-rewrite filtering now happens wherever rows are emitted (`scripts/lib/heldout.js`).
  - I checked the current `gen_data` output: 0 emitted training rows hit the held-out index, and 0 rows in g06, g07, `ood_teacher` and `hardneg_boost`.
  - `mine`/`verify` now start from filtered rows.
  - A failed teacher call is no longer counted as a rejection.
  - The model that proposes the teacher's options is pinned by sha256.
  - `train.py --out` no longer overwrites the test fixture.
  - Blind-set contamination is reported, along with a clean subset.
  - The stray gitlink is gone.

**Still open:** the stale model and docs (Major 1 below) and the `what about this` minor.

## Findings

### Major
1. **The shipped model, flag table, EVAL.md and README are still v0.2.** Carried over from round 2, not fixed.
   - `model/model.bin` was last changed in 0eec20e. EVAL.md still says it was trained on 25,562 rows; current `gen_data` produces 31,653.
   - Rebuilding `model/compose_explained.json` with the current builder changes 10 intents, for example `grep_text` `-n,-r` → `-r` and `list_files` `-a,-l` → `-l`.
   - Running `scripts/eval.js` at HEAD gives different numbers from the committed EVAL.md and README (`README.md:196,199`):

     | metric | committed | eval at HEAD |
     |---|---|---|
     | end-to-end | 82.8% | 84.2% |
     | composer "any acceptable" | 31.4% | 51.0% |
     | cmd rendered | 117/149 | 114/149 |

   - The history and composer blind tables are missing, and the title still reads "v0.2 … not retrained" (`EVAL.md:1-10`).
   - `review/fix1-log.md:12` says round 2 "retrains the model and regenerates EVAL.md". It did neither, and `review/fix2-log.md` is a one-line chat fragment.
   - The teacher section says the 715 held-out rows sent to the teacher were "never trained on". That is false for the shipped v0.2 model, which only dropped exact matches.
   - Fix: let the retrain finish, run `build_triggers` and `npm run eval`, then commit the model, `compose_explained.json`, EVAL.md and README.

2. **"Delete them" after a filtered listing deletes the whole directory.** This is the same bug as round-2 Major #2, which was fixed only for `find`/`grep` (`src/history.js:562-565`, `:197`, `:422`). The search-root mark is set only when the command is `find`. `Get-ChildItem`/`gci`/`ls` and a `| grep` stage piped after them never set it.
   - PowerShell: `Get-ChildItem C:\Users\me\Downloads -Recurse -Include *.tmp` then `delete them` (or `delete it`) → `Remove-Item -LiteralPath 'C:\Users\me\Downloads' -Recurse`. It is not critical, and `Get-ChildItem $HOME\Downloads -Filter *.pdf` does the same.
   - bash: `ls -la ~/Downloads | grep pdf` then `delete them` → `rm -r ~/Downloads`, not critical. `ls ~/Pobrane | grep pdf` + `usuń je` does the same.
   - Fix: treat `-Filter`/`-Include`/`-Recurse` on `Get-ChildItem`, and any `ls DIR | grep …`, as a search root (refuse). Or refuse plural pronouns when the newest entity is a directory that was only listed.

### Minor
- **History:**
  - `what about this` after `rm -r foo` → `uname -a` (carried over).
  - `ls /tmp/build` + `delete them` → `rm -r /tmp/build`: a plural "them" deletes the directory itself.
  - `egrep`/`git grep`/`ack -l TODO src` + `delete them` gives a placeholder rather than an explicit refusal (safe, but inconsistent).
- **Danger checker** (`src/danger.js`, `WRAPPERS`): `unshare rm -rf /` and `watch rm -rf /` are rated safe. `shred -u /dev/sda` is high but not critical. Catalog output can't produce these.
- **Composer and slots:**
  - `grep for ~/foo recursively in src` → `grep -rn -- recursively ~/foo`: the filler word becomes the pattern and `src` is dropped (`src/compose.js` around line 500, or the catalog grep slot path).
  - PowerShell: `search for "a\" -e evil" in src` cuts the pattern to `'a\'`.
- **Data:** 9 blind rows still match a training row once word order is ignored, for example `last 30 kernel messages` and `pokaż dyski i partycje`. The impact is small.

VERDICT: REQUEST_CHANGES
