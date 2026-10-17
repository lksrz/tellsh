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

## v5 round 2 (dev4)

Source: judge-adjudicated residual errors on the dev4 candidates (`build/ir/dataset/dev4/test.jsonl`, t50v5 n-best 8).
Same policy: generic, conservative, a gate reject or a request-implied mod. Where the reading was in doubt, the
majority form in the v5 train gold decided (counts below). Rules r2-1 to r2-3 live in `ir/lib/strict_v5r2.js` (called from
`strict_v5.js`); r2-4 lives in `compile.js`.

1. **Context direction** (`[context_dir]`, `contextDirection`). "trailing / after / following context", "N lines
   after" -> `-A`, so `-C` or `-B` rejects. "leading / before / preceding context", "N lines before" -> `-B`, so `-C` or
   `-A` rejects. Only "context / around / surrounding" -> `-C`, so a lone `-A` or `-B` rejects (in practice
   `mod_words` already catches it). No rule when both sides are named ("before and after", "three lines before and one
   after", "either side"). rg and grep `text.search` only. The `mod_words` license words follow the same vocabulary
   (`-B`: before / preceding / above / prior / leading; `-A`: after / following / below / trailing / subsequent), and
   "following / trailing / leading / preceding / subsequent context" is a CONTEXT phrase, so it no longer reads as the
   tail -f FOLLOW cue.
   `... one line of trailing context` -> `rg -F -n -C 1 ...` rejects, `-A 1` accepts.
2. **"X in the name"** (`[name_contains]`, `nameContains`). "with / having / containing X in the (file)name",
   "named like X", "(file) name contains / includes X": an rg `-g` / `--glob` or find `-name` / `-iname` / `-not -name`
   value that is exactly X with no glob characters and no extension rejects. It should be `*X*`. Polarity: a cue
   after an exclusion word in its clause (except / excluding / without / leaving out / skip / ignore / not ...) checks
   only negated globs (`-g '!X'`, `-not -name X`); any other cue checks only positive globs. A value the request names
   exactly ("named X", "called X") is never checked, so `files in src with foo in the name except files named foo` ->
   `find src -type f -name '*foo*' -not -name foo` accepts.
   `leaving out anything with test in the name` -> `rg -l -g '!test'` rejects, `-g '!*test*'` accepts.
3. **Line count of each matching file** (`[file_line_counts]`, `requestWantsFileLineCounts`). The request asks for
   the total lines of each file, `rg -l -0 X | xargs -0 wc -l --`. Cues: "line count(s) of / for / per (each / every)
   file(s) [in D] that / with / containing / mentioning / where / has ...", "line counts of the matching files", or
   "line count per file" with "everything / anything / files ... with X in it". A first-stage rg / grep `-c` then
   rejects. Match-count wording keeps `-c`: "matching line(s)", "lines that match", "count lines", "how many lines",
   "lines with / containing X", "matching line count". Train gold: "line count(s) ... per / of each / of every file" +
   a file clause gives 34 `xargs wc -l` against 11 `-c` (the `-c` ones are "line counts of X per file" / "per-file line
   counts", which this rule does not match). "count lines per file" gives 15 / 15 `-c`, so
   `count lines per file under backend/app/models where the regex user_[0-9]+ matches` -> `rg -c` stays accepted.
   One train gold rejects: "line count per file in templates where extends appears" (`rg -i -c`, ambiguous).
4. **Implied `--oneline` before a grep** (`compile.js` `requestImpliesPipedOneline`, inside `impliedOneline`).
   A `git log` with none of the `ONELINE_BLOCK` mods, piped straight into a `text.search` (grep / rg), gets `--oneline`
   when the request says "commits" or "commit lines". The fix-1 exclusions apply: no singular-commit cue and no full-log /
   author / date cue. wc / head / tail pipes are unchanged. Train gold for unshaped `git log ... | grep`: 31
   `--oneline` against 1 plain when the request says "commits", and 15 against 0 for "commit lines". Request wording
   without "commit" splits 86 / 25 and is left alone. `scripts/ir/equiv.mjs` counts piped `--oneline` as significant,
   so this changes y. Not when the grep / rg pattern reads the full-log layout (`^commit`, `^Author`, `^Date`,
   `^Merge`, `Author:`, `Date:`, `commit [0-9a-f`, or an indented-body `^ ` / `^\s`): `grep commits for the regex ^commit`
   keeps `git log | grep -E '^commit'`.
   `commit lines by judy from the last 2 days, grep for refactor` -> `git log --oneline --author=judy --since='2 days ago' | grep refactor`.
5. **Skipped: names-only with commits.** The train gold keeps the commit header. "just / only (the) file names" + commit(s)
   gives 6 `git log --name-only` (header kept) against 0 `--format=`, and no train gold row has `--format=` together with
   `--name-only` / `--name-status`. `requestWantsNamesOnly` is unchanged.
6. **Skipped: `wc -c < FILE`.** The IR has no stdin-redirect form: decompile rejects `<` / `>` as "redirections are not
   in the pilot IR", and there is no `cat` op. `wc -c Procfile` stays accepted.

### Collateral (dev + dev3 + dev4 + v5 k-fold heldout, 42,829 previously accepted y=1 candidates)

Re-measured after the review hardening (polarity / exact-name exemption, full-log grep patterns, context license words):
the candidate diff against the pre-round-2 base is unchanged, row for row.

| fix | y=1 rejected / changed | y=0 rejected | y=0 -> y=1 |
| --- | --- | --- | --- |
| r2-1 context_dir | 0 | 1 (`after context 1 line` with `-C 1`) | 1 (dev4 brief example, now `-A 1`) |
| r2-2 name_contains | 0 | 2 rejected + 1 changed, still y=0 (`-name 'retry'` -> `'*retry*'`) | 1 (dev4 brief example, `-g '!*test*'`) |
| r2-3 file_line_counts | 1 (fold0 "line count per file in templates where extends appears", the ambiguous train phrasing) | 2 | 3 (`xargs wc -l`) |
| r2-4 piped oneline | 0 | 0 (1 changed, still y=0) | 2 + 1 same-command y flip (the gold now gains `--oneline` too) |

Brief examples: the trailing-context example and the test-in-the-name example now get the wanted command. "everything in bench
with FIXME in it, line count per file" now abstains: its other n-best hypotheses are not accepted. The judy commit lines
example now gets `--oneline`. "count lines per file ... user_[0-9]+ matches" stays `rg -c`, which the train gold supports.
Over all train gold (51,353 decompilable ok rows), the new rules reject 1 row (fix 3, above). The context and name rules reject 0.

## v5 round 3 (dev4)

Residual judge-confirmed dev4 errors. Where the judge and the Haiku train gold disagree on a convention, the judge wins
(round 2 skipped items 5 and 6 on gold grounds; they are done here). Tests: `ir/test/v5_round3.test.js`.

1. **r3-a: derived `-h` / `-I` for bare matches** (`compile.js` `bareMatchesMultiFile`, under `derive: multi_file_sorted`).
   "nothing else", "only / just the matched / matching text", "just the matches" over a multi-file search (no path,
   a directory-like operand, a glob, several paths) derive `no_filename` in any position: `grep -r -o -h user_id tmp`.
   Not on stdin (a later stage with no path), not with `-l / -L / -c / --count-matches / -H`, not when the request asks
   for file names / paths (`requestWantsFileNames`).
2. **r3-b: implied `-type f` for file-like names** (`compile.js` `impliedFileType`, `namesAreFileLike`). A `files.find`
   with no `type` whose every `name_glob` / `any_name` value has an extension (`*.css`, `cache.java`, an `ext_glob`
   norm; not `*.d`) gets `-type f` unless the request mentions dir(s) / directory / directories / subdirectories /
   folder(s) / subfolder(s), or has any-type wording (the `find_any_type` words, anything, entries, whatever, items
   named, symlinks / links). Request-implied (in the IR), so it round-trips.
3. **r3-c: `[oneline_date]`** (`strict_v5r3.js`). Reject `git log` / `git show` with `--oneline` and `--date=...`
   and no `--format` / `--pretty`: `--date` has no effect under `--oneline`.
4. **r3-d: `--format=` for "just the file names" of commits** (`compile.js` `requestWantsNamesOnlyR3`, under
   `derive: names_only_requested`). "just / only (the) (changed) file names / filenames / names of the files" derives
   `no_header` even when the request mentions commits / log / history, unless it groups per commit (per / each / every
   commit, with the commits, commits and files, which commit) or also asks for authors / dates / relative / when /
   who / subjects / messages / hashes / sha. Unpiped logs only: a piped log
   (`git log --name-only | sort -u`) keeps the old `requestWantsNamesOnly`.
5. **r3-e: `[wc_bare_number]`** (`strict_v5r3.js`). Reject `wc` (`file.count`) on file operand(s) when the request
   says "nothing else", "just / only the number / count", "number only", "bare number" or "without the (file)name":
   `wc -c FILE` prints the name and the IR has no `wc -c < FILE`. Also `wc` in an each stage (`find -exec` / `xargs`);
   quoted spans of the request are not cues. The existing `bare_output` rule covers some of these.
6. **r3-f: `[name_contains]` for a prune** (`strict_v5r3.js`). For an exclusion "X in the name" cue
   (`strict_v5r2.js` `nameCues`, neg), a `find` `exclude_dir` (`-type d -name X -prune`) of the bare X fails.

### Collateral (dev + dev3 + dev4 + v5 k-fold heldout, 42,836 previously accepted y=1 candidates)

| fix | y=1 rejected / changed | y=0 rejected / changed | y=0 -> y=1 |
| --- | --- | --- | --- |
| r3-a no_filename | 79 changed, all stay y=1 | 2 changed, still y=0 | 0 |
| r3-b -type f | 313 changed, all stay y=1 (318 before the any-type exception; inside cover-cue buckets still accepted) | 12 changed, still y=0 | 0 |
| r3-c oneline_date | 5 rejected (1 the dev4 example; 4 fold "one line / oneline log with dates") | 1 rejected | 0 |
| r3-d no_header | 21 changed, all stay y=1 | 0 | 0 |
| r3-e wc_bare_number | 2 rejected (both dev4 "..., nothing else": the example + `wc -l pyproject.toml`) | 0 | 0 |
| r3-f name_contains | 0 | 1 rejected (the dev4 example) | 0 |

No y flips: equivalence (`scripts/ir/equiv.mjs`, unchanged) treats the new derived / implied mods as insignificant
for the gold. The reject rules stay well under 3 y=1 rejects per 1000 accepted (r3-c 0.12, r3-e 0.05 per 1000).
All six dev4 examples now get the wanted command (a, b, d) or a reject (c, e, f).

## v5 round 4 (dev5)

Residual judge-confirmed dev5 errors (fresh set). The judge wins over train-gold conventions; the rules are generic and
conservative. Tests: `ir/test/v5_round4.test.js`.

1. **r4-1: possessive recency** (`decline.js` rule (d) `recency`). "this / last / past / previous week's / month's /
   year's / day's / night's" and "today's / yesterday's / tonight's" with no time mod (`since`, `until`,
   `modified_within_*`, `modified_before_days`, `newer`) fail `dropped_value` (`this week's byte count for F` ->
   `wc -c F`). The possessive word fails even when a value took it ("rg -e this week's"). Not when a value is a commit
   range (`a..b`). "N days ago" was already covered by the RECENCY cue rule. Train gold carries these as noise
   prefixes: 51 of 51,353 ok gold rows (45 "this week's", 4 "today's", 1 "this year's", 1 "past week's") are rejected.
2. **r4-2: `[wc_dir_operand]`** (`strict_v5r4.js` `looksLikeDir`). `wc` (not in an each stage) with an operand ending
   in `/`, `.` / `..` / `~`, a known dot directory (`.github`), or a path with a directory part and no extension in the
   last segment (`spec/models`, `~/.config/nvim`). Bare extensionless words (`build`, `bench`) stay ambiguous and pass;
   `BARE_FILES` names (`LICENSE`), dot files and globs pass. 1 gold row (`wc -c shell/aliases shell/functions`).
3. **r4-3: `[line_number_wc]`** (`strict_v5r4.js`). A search with `-n` piped straight into `wc`: the numbers are
   discarded. 5 gold rows ("count lines ... with line numbers" -> `rg -n X F | wc -l`).
4. **r4-4: `[branch_name_filter]`** (`strict_v5r4.js`). `git branch --contains / --merged / --no-merged` when the
   request asks about branch names ("in their names", "named (like)", "name contains / matches / starts with") and does
   not mention commits / merged. 0 gold rows.
5. **r4-5: `[ls_d_entries]`** (`strict_v5r4.js`). `ls -d` when the request asks for the entries ("every / each / all
   entry / file / item in", "what's inside it", "the contents of") and has no only-the-directory cue ("not contents",
   "directory entries", "itself only", "just the directory itself"). 0 gold rows.
6. **r4-6: "file names only" word order** (`compile.js` `requestWantsNamesOnlyR3`). "(changed) file names / filenames
   only" derives `--format=` like "only the file names", with the same per-commit and author / date exclusions.
7. **r4-7: `ps aux | grep NAME`: skipped.** Train gold answers "is X running / is there a process named X" with
   `ps aux | grep X` in 27 rows and never with `pgrep`; changing the convention is out of scope for a gate rule.
8. **r4-8: explanation requests** (`decline.js` rule (i) `explain`, label `not_shell`). "tell me / explain / show me /
   describe how ... work(s)", "how does / do X work", "explain" (quoted spans excluded). On v5 train the cue matches 849
   not_shell rows and 0 ok rows. "Is there a sort order for F?" is skipped (too specific for a generic rule).

### Collateral (dev + dev3 + dev4 + dev5 + v5 k-fold heldout, 43,470 previously accepted y=1 candidates)

| fix | y=1 rejected / changed | y=0 rejected / changed | y=0 -> y=1 |
| --- | --- | --- | --- |
| r4-1 recency | 40 rejected (0.92 per 1000; gold also lacks the filter: 38 "this week's", 1 "today's", 1 "past week's") | 25 rejected | 0 |
| r4-2 wc_dir_operand | 5 rejected (4 dev5 incl. the example, 1 fold `shell/aliases shell/functions`) | 5 rejected | 0 |
| r4-3 line_number_wc | 5 rejected (fold0 "count ... with line numbers") | 1 rejected (the example) | 0 |
| r4-4 branch_name_filter | 0 | 2 rejected (the example + "branches with staging in the name") | 0 |
| r4-5 ls_d_entries | 0 (16 before the only-the-directory cues) | 1 rejected (the example) | 0 |
| r4-6 names only | 12 changed, all stay y=1 (incl. the example) | 1 changed, still y=0 | 0 |
| r4-8 explain | 0 | 1 rejected (the example) | 0 |

All dev5 examples of fixes 1-6 and 8 now get a reject or the wanted command; fix 7 is skipped.

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

## Final after round 4 (measured once)

Gate at 94337e8, same ensemble and `--select-adj` setting (min_agree 5, rank 0). Labels are the earlier Opus verdicts on
final. 53 kept rows had no verdict: Jev (gold, 0.73) flagged 3 of them, and grok-4.6 (batched) judged all 3 correct.

| split | kept | coverage | adj. wrong | rate | UB95 |
| --- | --- | --- | --- | --- | --- |
| dev | 2,696 | 72.6% | 5 | 0.19% | 0.39% |
| dev5 | 467 | 55.5% | 8 | 1.71% | 3.07% |
| final (round 1 gate) | 1,749 | 74.3% | 20 | 1.14% | 1.66% |
| final (round 4 gate) | 1,748 | 76.6% | 19 | 1.09% | 1.59% |

- Rounds 2-4 fixed errors on dev4 and dev5 but moved final by one row. Every fresh set lands at 1-2%, while dev, which
  the gate has been tuned on, reads 0.2%.
- Conclusion: per-pattern gate rules do not generalise to new phrasings. Reaching 0.5% on final needs a different
  mechanism, not another round of rules on the same error stream.
