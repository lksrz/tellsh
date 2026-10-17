# IR error taxonomy v5: request-aware fixes (v5 round)

Source: adjudicated residual errors (judge = Opus) on the v5 dev / dev3 candidates
(`build/ir/verifier/v5/cand_t50_{dev,dev3}.jsonl`). Every fix is generic and conservative: a gate reject
(abstain) or a request-implied mod, never keyed to one example. The held-out final split was not used.

## Fixes

1. **Implied `git log --oneline`** (`ir/lib/compile.js` `impliedOneline`, `requestImpliesOneline`; inside
   `impliedMods`, so the gate's round-trip reference adds it too). A `git.log` that is the last stage of its pipe
   (not piped: `wc -l` / `head` / `grep` count or filter lines) gets `--oneline` when the request says the plural
   "commits" (not a singular "last / latest / most recent / that / this commit"), the
   log has no `oneline / format / stat / patch / name_only / name_status / graph / date_format / no_header`, and the
   request has no full-log cue (full, complete, entire, whole, detail(s), detailed, body / bodies, verbose, patch(es), diff(s), "log lines",
   "lines of the log / history / output", "how many lines") and no author / date cue (author(s), authored, email(s),
   date(s), dated, when, time(s), timestamp(s), who). Rubric: "commits ... mean --oneline or -n". Not in the IR:
   strict.js sees the predicted IR; `scripts/ir/equiv.mjs` treats unpiped `--oneline` as insignificant.
   `commits mentioning FIXME in the message, ignoring case, no merges` -> `git log --oneline --grep=FIXME -i --no-merges`.
2. **Number word as a positional value** (`ir/lib/strict_v5.js`, `[num_word_value]`). A positional value (package,
   path, rev, ...; not a search pattern, not `-name`, not a jq filter, not quoted, not after named / called) that is a
   whole English number word (zero..twenty, tens, hundred, dozen; cardinal or ordinal) used as a quantity (followed by
   levels / lines / commits / items / entries / files / results / times / deep / depth, or after most / top / first /
   last / all / depth) rejects: `npm ls fifteen` for "fifteen levels"
   should be `npm ls --depth=15`. Tokens containing such a word (`chapter-seven.md`) are unaffected.
3. **Dropped branch** (`ir/lib/strict_cover_git.js` `branchRefs`, `[branch_ref]`). "on / from (the) X branch" or
   "on / from branch X" names a ref that a `git log / diff / show` must carry as a revision argument (`api`,
   `origin/api`, `main..api`; a path or an `--author` / `--grep` value does not count); every match is checked; not
   when `git branch` is in the command. X must look like a ref: contains / . _ - or a digit, is a well-known branch
   (main, master, develop, dev, staging, production, prod, trunk, next, stable, api, web, frontend, backend, hotfix) or
   appears quoted in the request. Non-ref words (this, current, my, same, other, new, remote, default, feature,
   release, local, ...) and numbers never count; adjectives ("the wrong branch") fail the ref-like test.
4. **find directory exclusion via `-not -name`** (`strict_v5.js`, `[find_dir_name]`). With `-type f` or a file glob
   (never with `-type d`; never when the request says "file(s) named / called D"),
   `-not -name D` is a no-op when D is a directory: D in `DOT_DIRS` (exported from compile.js) or node_modules, vendor,
   dist, build, target, tests, test, `__pycache__`, venv; or D has no glob, no extension, is no dotfile / well-known
   bare file (`BARE_FILES`), the request says except / excluding / outside / skip / ignore / leave out / not in and
   calls something a folder / dir / directory / subfolder.
   Needs `-prune` (exclude_dir) instead.
5. **curl URL globs** (`strict_v5.js`, `[curl_url_glob]`). curl always renders `-g`, which keeps `{a,b}` / `[1-3]`
   literal; such a URL rejects unless the request asks for it literally (literal(ly), as is, verbatim, exact, no
   globbing, globoff).
6. **Dropped file names vs `-l`** (`strict_v5.js`, `[drop_names]`; compile.js `DROP_NAMES_CUE`). "drop / omit /
   without / no / hide / strip / leave out / remove / suppress (the) file names / filenames" (not "paths": scope
   wording) with "line(s)" rejects
   `files_with_matches` / `files_without_match`. `requestWantsFileNames` ignores such negated mentions, so the derived
   `no_filename` (`grep -h` / `rg -I`) still applies.
7. **Short dates** (`strict_cover_git.js` rule `log_short_date`). The words now include "date short", "dates short",
   "date=short" (need `--date=short`); "yyyy-mm-dd" is not a cue (it also describes input dates). Relative dates were already covered by `log_relative`
   ("relative"); git show has no date mod.
8. **Last-N window with a message filter** (`strict_cover_git.js`, `[log_window]`). "in / within / among / across /
   through (the) last N commits" with `git log -n N` plus `--grep` / `--invert-grep` keeps the last N *matching*
   commits; the rubric wants `git log -n N | grep`. "the last N commits mentioning X", "last N commits by X" (no
   preposition) and author filters are not rejected (the gold reads "commits by X in the last N commits" both ways).
   Quoted spans are removed before matching (an unquoted pattern word is not, so it can never erase a real window cue).

## Collateral (dev + dev3 + v5 k-fold heldout, 42,088 previously accepted y=1 candidates; after the review fixes)

| fix | y=1 rejected / changed | y=0 rejected | y=0 -> y=1 |
| --- | --- | --- | --- |
| 1 oneline | 0 (2,384 y=1 gain `--oneline`, still y=1) | 0 (64 y=0 gain `--oneline`) | 0 |
| 2 num_word_value | 0 | 1 | 3 (`npm ls --depth=N`) |
| 3 branch_ref | 0 | 1 | 0 |
| 4 find_dir_name | 0 | 5 | 0 |
| 5 curl_url_glob | 0 | 2 | 0 |
| 6 drop_names | 0 | 1 | 0 |
| 7 log_short_date | 0 | 0 | 1 |
| 8 log_window | 2 (gold `-n N --grep` on "in / among the last N commits", the rubric error itself) | 2 | 0 |

Accepted `git log` candidates whose command changed by the implied `--oneline` (y unchanged in every case): dev 201 /
484, dev3 28 / 62, fold0 672 / 2,576, fold1 612 / 2,838, fold2 933 / 2,773. Every brief example (dev / dev3) is still
rejected (`*.bak files anywhere except .idea` now falls to another wrong n-best candidate, y=0). The review fixes
(conservative cues) gave up 8 y=0 find rejects (extension-less exclusions without folder wording; one had recovered
to y=1) and one number-word reject.

## Round 5 measurement (v5 models, judged with Opus in batches of 100)

Ensemble: t50v5 main + h8v5, t50wv5, kfold_v5 folds 0-2. Judging: every kept row goes to Opus (`claude -p`, `--batch 100`).
Rows the batch calls wrong are re-judged one at a time, plus a seeded audit of batch-passed rows (0 wrong in 210 audited
over dev / dev3 / final). Settings are chosen on dev (`--select-adj`). The numbers are measured with fixes 1-8 as first
written; the review hardening above only narrows those rules.

| split | setting | kept | coverage | adj. wrong | rate | UB95 |
| --- | --- | --- | --- | --- | --- | --- |
| dev (before fixes) | min_agree 5, beam >= 0.8 | 2,648 | 70.4% | 8 | 0.30% | 0.54% |
| dev3 (before fixes) | same | 552 | 75.4% | 6 | 1.09% | - |
| dev (after fixes) | min_agree 5, rank 0 | 2,697 | 71.8% | 7 + 1 unadj. | 0.30% | 0.49% |
| final (measured once) | same | 1,749 | 74.3% | 20 | 1.14% | 1.66% |

- Dev under-predicts final: dev is skeleton-disjoint from train but has been the analysis set for four rounds of gate fixes.
- dev3 (fresh, unseen skeletons) predicted final before fixes (1.1%). It is now spent too, because fixes 1-8 target its errors.
- Next: a fresh dev4 generated through the subscription CLI (`grok_gen.mjs --backend claude`, haiku). It is used for setting
  selection and error analysis, and final stays untouched.
