# Round-2 fix log

Fixes for `review/r2-claude.md` and `review/r2-codex.md` (commit 81ba1e4):

- "on the disk" phrases are a search scope, never the target of a changing command; whole-disk searches still use `/`.
- "delete them" after `find`/`grep`/`rg`/`fd`/`locate` (and `find | xargs`) is refused: the search root is not what the search found.
- PowerShell < 7.3: every slot passed to a native program is checked for embedded `"` / trailing `\`.
- History: later segments of a compound line win across entity types; request verbs are not target hints; `ls /a /b` picks `/b`.
- Paths ending in sentence punctuation (`/tmp/data!`, `/tmp/a.txt.`) become placeholders for changing commands.
- Danger checker: `timeout`/`chroot` wrappers, `/.`, `/etc/..`, `find -L`, `/usr/lib`, `~/.ssh`, `mv /etc`, `-v=/:/h`.
- Composer: literal `~`, no pattern reused as a path, `--author` value, `$(…)` rejected; cmd `findstr /c:"/api"`.
- Training/data: near-duplicate and contrastive-rewrite exclusion wherever rows are emitted (`scripts/lib/heldout.js`), filtered
  `mine`/`verify` input, failed teacher calls not counted as rejections, pinned option model, `train.py --out` never overwrites the
  test fixture, blind-set contamination reported with a clean subset.

Not done in round 2 (despite the round-1 log saying so): the model was **not** retrained and EVAL.md/README still described
v0.2. The retrain started at the end of round 2 shipped in round 3 (`review/fix3-log.md`).
