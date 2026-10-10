# Round 5 fixes (review/r5-claude.md, review/r5-codex.md)

Regression tests: `test/regressions7.test.js` (8 tests). Full suite 241/241. Version stays 0.3.0.

## Place references (claude blocker 1, minor 2) — `src/history.js` `LOCATIVE`/`locativeRef`, `src/pipeline.js`
"there", "over there", "in/from there", a final "inside", "in the same folder/place", "tam", "stamtąd", "tamże",
"w tym samym katalogu/miejscu" are references to the newest history directory, checked by `changeGuard` like any
other reference (listed/searched directory, cd followed by other commands, newer file, no dir → refused, `<PATH>`).
Only the place a command runs in: `find DIR … -delete`, `ls DIR`, a cp/mv destination; for any other changing
command (`rm -r`, `mv` source, chmod, …) every path slot is withheld. Without history (or with nothing usable) the
path is `<PATH>`, never `.`; a word the request names ("remove the logs in there") is not the location either.
"is there …"/"there are …" are not references. `there`, `same`, `inside`, `tam`, `stamtąd`, … added to `FUNCTION_WORD`.
`ls /var/log` + "delete all log files there" → `find <PATH> … -delete` (refused); `cd /tmp` + same → `find /tmp … -delete`.

## Rejected paths (codex major 4) — `src/pipeline.js` `resolveWithTagger`
Any path the tagger or regex read that fails validation (newline inside quotes, function word, part of a rejected
tagged path) withholds the slot: `delete all log files in "/tmp/a\nb"` → `find <PATH> …`.

## Move/copy destination (claude minor 3) — `src/pipeline.js` `afterDestWord`
A single named path right after to/into/onto/do/na/w ("move them to /tmp/old", "copy them to /backup",
"przenieś je do /tmp/old") is the destination with or without history; the source stays `<SRC>`.

## "everything in it" (claude minor 4) — `src/history.js` `CONTENTS` in `changeGuard`
"delete everything in it", "usuń wszystko w nim", "remove all the contents of it" after `cd /tmp/build` → refused.

## Earlier tellsh requests (codex blocker 1) — `src/pipeline.js` `quick`
A `tellsh <query>` history line is re-run through `suggest` (no history, composer off); every slot it left as a
placeholder (`missing`: refused, ambiguous trailing punctuation, rejected path) becomes an ambiguous value, so
"same for txt" after `tellsh delete all log files in the` and "delete it" after `tellsh delete folder /tmp/data!` refuse.

## "same but" (codex major 2) — `src/pipeline.js`
Slots withheld by the new request (`blank`) are never refilled from the previous command.

## Wrapped listings (codex major 3) — `src/history.js` `unwrap`, uses `src/danger.js` `commandWords`/`commandChains`
History segments are unwrapped with the danger checker's wrapper parser (`sudo -u root ls`, `env ls`, `command ls`,
`nice -n 5 ls`, `timeout 5 ps aux`), and a listing anywhere in the wrapper's candidate chains counts. A wrapper whose
arguments cannot be read (`sudo -u`) marks file/dir ambiguous and every type as listed (refuse).

## Danger checker (claude minor 5) — `src/danger.js`
- Inline interpreter code (`python -c`, `perl -e/-ne`, `ruby -e`, `node/bun -e/-p`, `deno eval`, `php -r`, `lua/julia/
  Rscript/osascript -e`, awk programs with `system()`/pipes/redirects) is high (cannot be checked); string literals
  are checked as commands; `rmtree`/`rmSync`/`unlink`/`chmod`/… on /, ~ or a system directory are critical.
  `python3 -c "print(1)"` was safe and is now high (test in regressions6 updated on purpose).
- chmod/chown/chgrp without -R: `/`, top-level system dirs, drive roots → critical; other system files and `~` → high.
- tee/cp/install/sponge/pv/mv/ln onto a whole disk device → critical (`cat x | sudo tee /dev/sda`).
- An unknown program followed by a destructive command (`mywrap rm -rf /`) has that command checked (programs whose
  arguments are data — grep, echo, man, git, … — excluded).

## Not changed
- claude minor 6 ("switch back to that release branch" after `git checkout main` → `<BRANCH>`): documented,
  intended; `git checkout` is a medium-risk intent and keeps the conservative rule.

## Eval / data
- `node scripts/eval.js`: eval section of EVAL.md unchanged (history dev 91.7%, blind unchanged, e2e 85.3%, OOD 94.6%).
- `gen_data.js` output byte-identical to `build/` (31,534 classifier rows / 34,434 tagger sequences); model not retrained.
- Teacher (Jev) and gen_data share `exclusionIndex` (unchanged since round 4b; test in regressions6).
- Bench re-run (EVAL.md bench section): cold p50 169 ms, warm 0.35 ms, with 5 history lines 1.4 ms.
- `scripts/check_variants.js`: same pre-existing failure (`history_search [zsh] unknown key`).
