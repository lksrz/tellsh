# Typed-IR gate: fix plan for judged-wrong accepted predictions (round 3)

Inputs: 2,463 accepted predictions that the judge called wrong, plus 22 STRICTDEV residuals. Every claim below was checked against the code on `feat/typed-ir` (`ir/lib/*.js`, `ir/schemas/*.json`). Nothing was edited.

## 0. What checking the code changed

- **"my home / my desktop" is a gate gap, not a normalizer gap.** `normalizers.js:164` `HOME_WORDS` already maps these phrases to `~`, `~/Desktop` and so on. The gate just never rejects a `.` root, or a lowercase `desktop` path, while one of those phrases is free.
- **"first 200 bytes of the matches" gets `rg -o` from the gate, not from compile.** `compile.js:415` `O_DOWNSTREAM=['lines.sort','lines.uniq']`, and `MATCH_CUE` only implies `-o` before sort/uniq. The `-o` passes the gate because `MOD_WORDS['text.search.only_matching']` (strict.js:64) lists the bare word `matches`. Fix it in strict.js, not compile.js.
- **Analyst claims I confirmed:**
  - `uniq_repeated.unless` contains `consecutive` (strict_cover.js:20).
  - `hasFree` matches whole words only (obligations.js:54), so `collapsing` never hits `collapse`.
  - `curl_head_only.unless` contains `lines` (:124).
  - `branch_all` runs only when a REMOTE word is free (:176).
  - `find_dirs` is skipped when `exclude_dir` is present (:183).
  - `find_min_depth` has only 3 phrases (:99).
  - `log_until` has no "older than" or "before" (:53).
  - The anchor check on norm values looks only inside `v.u` (:206).
  - `REF_SHAPE`'s catch-all `.*[/~^.@{].*` (strict_values.js:12) accepts every file name as a rev.
  - `isFileLike('release/2.4')` is true, because `2.4` passes the extension regex.
  - The file-as-rev check needs paths to be present (strict.js:493).
  - The single-rev `git diff` check fires only after `in/by/commit` (:401).
  - "starts with" reads only `pattern` values (:453, :475).
  - `perFileCue` treats a bare `files` as a per-file cue (:443).
  - `dotPath` runs only for `unknown||DIRISH` words, only for `text.search` and `files.find`, and never for git (:554-559).
  - `SCOPE_STOP` is exempted through `DIR_NOUNS.has(next)`, and `DIR_NOUNS` contains `file`, which is why "unstaged **file** names" gives `-- unstaged` (strict_values.js:29, strict.js:291).
  - `CUE_KEYS` has 3 entries and `CONTENT_WORDS` has 8.
  - `FILTER_WORDS` has about 20 entries.
  - `tail` `follow` and `follow_retry` share the cue `FOLLOW`.
  - `curl` `silent` is implied `always` (curl.json:59, 157, 236), and `git log --oneline` is implied `piped` (git.json:117).
- **Why truncated patterns get through.** `STRICT_KNOWN` contains every `MOD_WORDS` word: status, lines, full, matches and so on. So span-integrity rules that are keyed on `unknown(w)` cannot see a pattern cut before a known word. This is the root cause of the "truncated pattern" cluster.
- **File-size limit.** strict.js is 580 lines. New rules should go into new modules, which are named in the work packages below.

## 1. Merged clusters (four analysts, counts summed)

| # | Theme | count | strict | layer |
|---|---|---|---|---|
| A | Named dir or pathspec dropped (`.` root, missing `-- X`) | ~180 | 2 (my home) | gate |
| T | git mod cues: format, name-only, branch -a/-r/-v, all-match, until, -p, short date, -b | ~185 | 0 | gate |
| Q | Wrong op for a cue: sort↔ls on a dir or file, ls↔head/tail, status, process list, find↔rg | ~170 | 0 | gate |
| G | npm: wording as the package name, "scripts" → `npm run`, test stages | ~150 | 0 | gate |
| X | Decline: deixis, truncated request, placeholder, dropped recency | ~145 | 3 | gate/decline |
| F | uniq -d/-u/plain | ~128 | 0 | gate |
| B | Request word used as a path, pathspec or rev | ~116 | 1 | gate |
| C | git rev↔pathspec↔author role swap | ~136 | 0 | gate |
| R | Exclude or name glob shape (prune vs -not -name, `!txt`, `*X*`, `.ext`) | ~116 | 1 | gate |
| H | curl -I/-i, -s/-f/-S | ~100 | 0 | gate + schema + gold |
| J | grep or `--grep` pattern built from wording (retry, unstaged, mac) | ~77 | 0 | gate |
| I | jq field invented, jq on a URL or non-JSON file | ~78 | 0 | gate |
| M | Output mode -l / -o / -H / -L | ~68 | 1 | gate |
| E | git show vs diff vs log for one commit or a range | ~67 | 0 | gate |
| P | `--oneline` on "N lines of the log" | ~65 | 0 | schema + gold |
| N | Per-file vs total counts; `xargs head` vs `head` on the list | ~64 | 0 | gate |
| U | sort/wc flags (-u, -n, extra -l, unit lists, keep duplicates) | ~63 | 0 | gate |
| K | Pattern span truncated or over-extended | ~61 | 1 | gate |
| O | Filter/slice stage order | ~49 | 0 | ambiguous + gold |
| S | find -type, depth, path↔name role | ~47 | 0 | gate |
| D | Named ref or second rev dropped | ~38 | 1 | gate |
| L | Anchors (^ for "ends with", `--grep` "starts with") | ~33 | 0 | gate |
| V/W | tail -F, -A/-B/-C, rg -s, ls -d, size sign, bytes/line N, list member, two-stage swap, freq cue, space paths | ~75 | 0 | gate |
| Y | STRICTDEV schema/compile gaps where pred equals gold | 6+3 | 6 | schema/compile |
| Z | Gold data wrong, or judge inconsistent | ~117 | 0 | data |

The cluster lists attribute 18 of the 22 STRICTDEV residuals: Y 6, X 3, ambiguous 2, A 2, B/D/R/M/K 1 each. The other 4 are not attributed.

## 2. Ranked fixes

Score = (count + 20 × strict) / effort, with XS=1, S=2, M=4. The work package (WP) is in brackets.

1. **Home and scope phrase must reach a path** (A, 2 strict, XS) [WP2].
   - Rule: when any `HOME_WORDS` phrase ("my home", "home dir", "my desktop") is free and no path value is `~` or `~/…`, fail `dropped_value`. Also reject a lowercase `desktop|downloads|documents` path after `my`.
   - Tests: `notes.txt anywhere in my home, max depth 4` → `find . …` gives no; `find ~ …` gives ok.

2. **Small schema/compile gaps that STRICTDEV hits** (Y, 6 strict, S each) [WP4]. Pred equals gold for all of these, so each also needs a `gold_rewrite.mjs` rule.
   - `compile.js`: `git.log merges_only` plus `name_only/name_status/stat` emits `--diff-merges=first-parent` (from git.json; it is derived, so decompile strips it).
   - `ls.json`: add `all` (`-a`) with cue words "all of", "all entries", ". and ..".
   - `curl.json` download: an `output_dir` mod (`--output-dir`), or the gate rejects "In DIR, download …" when no cd and no dir is present.
   - `wc.json`: a count-only form (`wc -l < f`) for "just the count", "number only".
   - Add `executable` (and the `-perm` family) to the uncovered-content triggers.
   - A literal cue always emits `-F`.
   - Gold risk: none, because these rewrite gold together with the change. Measure with `rw.mjs` (see section 4) and check that the `ap` counts equal the number of rewritten rows.

3. **Decline pre-check** (X, 3 strict, M) [WP4], in a new `ir/lib/decline.js` called from `obligations.js` before `strictObligations`.
   - (a) A request ending in a dangling preposition, comparator or verb (`compared to|containing|matching|by author|with|for|of`) is `underspecified`.
   - (b) A definite generic noun phrase with no value: `the (function|helper|hook|gem|config|field|glob|folder|build output|docs|tests)`, `that (commit|branch|folder|python process)`, `in there`, `it`. Fail when no used value covers the following word.
   - (c) A placeholder used as the whole pattern, field or path: `text|function|constant|string|pattern|something|somewhere|nth|key|max|I`.
   - (d) A free RECENCY phrase ("this week", "since yesterday", "from the last N days", "newer") when no `since`, `mtime` or `newer` mod is present is `dropped_value`. This one is cheap and catches STRICTDEV "oscar history this week".
   - (e) "upstream" with no remote word → `normalizers.js` maps it to `@{u}`, or the request is declined.
   - Gold risk is medium. The budget is ≤1% false declines on dev rows with label `ok`. Only (c) needs per-word tuning; skip a word when another value exists.
   - Tests: the cluster examples as `no`, and "the config dir" with `config` used as the path as `ok`.

4. **uniq -d/-u/collapse** (F 128, XS) [WP1], all in strict_cover.js.
   - Remove `consecutive` from `uniq_repeated.unless`.
   - New rule `uniq_dup_noun`, when `lines.uniq`:
     - words: duplicates, duplicate, duplicated, dupes, dups, repeats, repeated, repeating, repeat, "adjacent repeats", "which … repeat";
     - unless: remove, removed, drop, dropping, dedupe, deduped, collapse(d/s), collapsing, merge, merging, squash(ing), fold, without, "no dupes", count, "how many", frequency, top, most, once;
     - need: `lines.uniq.repeated`.
   - `uniq_collapse`: add the inflections plus fold, removed, remove, drop, "each line once".
   - `uniq_unique`: add occurring once, occurs once, appearing once, appear once, appears once, non-repeating, one-off, singles, "lines that are unique".
   - Forbid `uniq | uniq -d`.
   - Gold risk is low. The analysts measured v4 train: -d 234 / -u 16 / -c 7 / plain 14, and the 14 plain rows are mostly gold errors.
   - Measure: `rw.mjs` on v4 train, then `cmp.js`, then review the rows that change from accepted to rejected.

5. **npm** (G 150, S) [WP2 values, WP1 cover].
   - WP2, strict_values.js F6.3, role `packages`:
     - reject `NPM_WORDING` = full, all, every, whole, complete, nested, tree, view, level(s), dep(s), dependency, dependencies, package(s), module(s), installed, available, including, included, transitive, direct, top, up, dump, list, scripts, script, it, master, everything;
     - reject any `isFileLike` value;
     - role `script`: reject scripts, script, package, available, npm, list, output, prints.
   - WP2, dropped package: a free word after "for", "checking for", "is X installed" or "X pulled in" while `npm.ls` is present is dropped. This drops the `PRODUCT_NAMES` exemption for `npm.ls` only.
   - WP1, `npm_scripts` cover rule:
     - words: scripts, "script list", "package scripts", "what scripts", "scripts available/defined";
     - when: any `npm.*`, `dir.list` or `files.find`;
     - unless: "run the", "the X script" (a `SCRIPT_NAMES` word before it), or a path value `scripts`;
     - need: `npm.run` with no script.
   - WP3 owns strict.js. `npm.test` needs a free test or tests word. Reject two stages that run the same script (`npm run test && npm test`). A free token right after "run" must be the script value.
   - Gold risk is very low: 0 of 286 gold package values are wording words. Line 544 ("just list scripts" → `ls scripts`) is covered by the path-value exemption.

6. **Request word used as a path or rev** (B 116, 1 strict, S) [WP2].
   - The `SCOPE_STOP` exemption applies only after named/called (drop `DIR_NOUNS.has(next)`). This fixes "the current folder" and "top-level dir" (STRICTDEV).
   - Use the same narrowing for the `PATH_STOPWORDS` exemption at strict.js:291. That line is in strict.js, so WP3 changes it: only exempt when the next word is a dir noun that is not followed by names, list or files.
   - New `PATH_WORDING` set: could, check, chek, but, as, at, vs, versus, against, else, used, older, newer, modified, touched, changed, edited, include, including, literally, lines, regular, stat, status, give, print, quick, full, machine-readable, uncommitted, insensitive, desktop (after "my"), plus any `CUE_LEAD`.
   - Reject a path that is inside a matched cue (`inCue` alone, without the `CUE_LEAD` condition).
   - Reject a possessive (`X's`).
   - Reject an extension word or language name followed by files, scripts or only.
   - Reject a path span that starts with a preposition.
   - On git ops, reject a one-word, unquoted, slash-free pathspec or rev that is `STRICT_KNOWN` or a `MOD_WORDS` cue, unless it comes after a path preposition plus a dir noun, or after "named". Reject a rev with a trailing `.`.
   - Gold risk is low to medium for "repo", "project" and "code". Keep `DIRISH` words after in/under exempt, and spot-check gold rows where the path is `project`.

7. **git rev↔pathspec↔author roles** (C 136, S) [WP2], in strict_values.js.
   - (1) Split `REF_SHAPE` into a strict shape: sha, `HEAD[~^]N`, `v\d…`, ranges `..`/`...`, `@{u}`, REF_WORD, and branch prefixes including feat|fix|chore|refactor|experiment|origin|upstream.
   - A rev that `isFileLike` (not a v-tag or range) is rejected unconditionally.
   - A single-word rev that fails the strict shape is rejected unless the next or previous word is branch, tag or ref, or the previous word is on or from. This drops the `isKnown` condition, so unknown plurals (experiments, edits) are caught.
   - (2) Require an alphabetic first character in an extension inside `isFileLike` for this check (`release/2.4`). Pass a local variant; do not change the shared helper.
   - (3) Reject a git path value that matches the strict ref shape, unless a path noun or under/touching/folder comes before it. Extend the `prev` list at :34 to vs, versus, against, to, for, of.
   - (4) `mod:author`: reject a sha, `HEAD~n` or slash ref. Reject a value whose span contains author or by. Require by/author/authored/from/for/a possessive before it.
   - (5) `grep_message`: a ref-shaped value after for, on or of is a ref.
   - Gold risk is very low: 0 of 4,791 gold revs before `--` have an extension, about 20 bare-word revs fail the shape, and 1 ref after `--` (`feature/login`) is a gold error. The analysts' scratch script `revs.mjs` (section 4) already measures this. Re-run it with the new shape.

8. **Dropped dir or pathspec** (A ~180, M) [WP2], in a new `ir/lib/strict_scope.js` called from `valueObligations`. It replaces strict.js `dotPath`; WP3 deletes :553-559 after WP2 lands.
   - Trigger: the first stage is `text.search`, `files.find` or `dir.list` and no path has `u`. Or the op is `git.log/diff/status/show` and no path value exists.
   - Path position: after in, under, inside, within, touching, touched, affecting, "limited to", "restricted to", "only for", or for/of on git status/diff. Skip the, my, our or this. Or before folder, dir or directory.
   - A free word there that is not in `PATH_POS_STOP` fails `dropped_value`. Also count tokens with digits (e2e).
   - `PATH_POS_STOP` comes from the cluster: last, past, repo, project (gold is inconsistent; exempt for now), codebase, code, monorepo, root, reverse, order, case, any, message(s), long, them, it, its, their, those, files, file, current, whole, commit(s), working, tree, short, process, history, output, full, both, range, only, name, total, place, detail, json, yaml, human, language names, time words, and `GIT_SCOPE_WORDS`. Plus any word consumed by an author, since or rev value.
   - Gold risk is medium. About 5,000 gold occurrences of a word in path position are absent from the command, and about 95% are covered by the stop list. Measure with `rw.mjs` and `cmp.js`, list the rejected-gold tail by word, and grow `PATH_POS_STOP` until gold false rejects are ≤0.3%.

9. **git mod cue lexicon** (T 185, M) [WP1], all in strict_cover.js.
   - Subject and hash formats:
     - `log_subject_only` += subject only, subject-only, commit subjects, subjects of, "just their subjects", plus a bare "subject(s)" with no hash, sha or oneline word and not after "whose"; forbid `format=hash_subject`.
     - `log_hash_subject` = hash/hashes/sha and subject/subjects in any order within 4 words.
   - Dates: `log_until` += older than, "up to N … ago", before/prior to/earlier than + a time phrase; forbid `since`. Add `log_short_date` ("short date(s)" needs `date_format=short`).
   - Diff content:
     - `log_patch` += patch(es) of, patches, full diffs, patch output;
     - `git_name_only` += names, file list, list (the) files, files staged, unstaged names, which files did, files (they|each commit) changed, with file names, "name only", name lists; unless patch, diff of, content;
     - name-status / name status needs `name_status`;
     - `word_diff` needs "word-level", "word level" or "word diff";
     - `diff_staged` += index, "of the index", index diff.
   - Branch flags:
     - in the `branch_all` block, an `allCue` with neither `-a` nor `-r` fails. Run the "all branches", "every branch", "local and remote" check even when no REMOTE word is free;
     - a free REMOTE word with `git.branch` and neither `-a` nor `-r` fails;
     - drop the `when: git.branch` limit on `branch_current`.
     - New rules: `branch_verbose` ("commit info", "commit subjects", "with commit", "last commit") and `branch_merged` ("merged into X").
   - Message grep: `all_match` ("both X and Y" with two `grep_message` values); `invert_grep` ("doesn't/does not contain/mention" with `grep_message`).
   - `status_branch` += including branch.
   - WP3 removes the strict.js-side blockers:
     - drop `commit`/`commits`/`tracking` from `MOD_WORDS git.branch.verbose` (use hasFree on whole words, not on parts of a hyphenated word);
     - drop `name`/`file`/`path`/`which`/`what` from `NAMES` for git.log and git.show;
     - the format-drops-author check at :417 no longer depends on `!hasMod(author)`;
     - the COVER `contains` rule at :112 no longer has `unless: text.search`.
   - Gold risk is low per rule. Each is a positive-cue rule; measure each one separately with `cmp.js`.

10. **Op-cue mismatch** (Q ~170, M), split by file.
    - WP2, accountability.js `CUE_KEYS` additions (cue words → keys any of which satisfies them):
      - "start of", "beginning of", "begining of", "top of", "lead of", preview, "peek at" → `file.head`;
      - "end of", "bottom of", "tail of", "last part" → `file.tail`;
      - status, "name status" → `git.status`, `*.name_status`, `http.*`, `proc.*`;
      - process, processes, procs, "process list", "process table", "running processes", aux, alive → `proc.list`. Exempt "running tests" and npm ops;
      - symlinks → `files.find.type=l`;
      - "git show" → `git.show`;
      - dependencies, deps, "top level" → `npm.ls`, unless a `node_modules` path is present.
    - WP3, strict.js operand-kind rules:
      - `lines.sort`/`uniq` on a single non-`isFileLike` operand with a free list, listing, entries, contents or "what's in" fails;
      - `dir.list` with reverse, `sort_size` or long-sort on one `isFileLike` operand fails;
      - `dir.list` on one `isFileLike` operand with no long, size or date mod fails;
      - use `env.pathExists` when it is present.
      - A text.search pattern that is `isFileLike` or a glob with no content cue (mention, contain, text, string, literal, occurrence) fails;
      - "names with X", "X in the name" or "named" with text.search fails;
      - "line N of" needs a print-line op, and a pattern equal to that N fails.
    - Gold risk is low to medium. Gold 311 ("order of deploy" → sort) shows extensionless files exist, so the sort rule needs a list cue.

11. **Exclude and name glob shape** (R 116, 1 strict, S) [WP2], strict_values.js F8.
    - An `exclude_dir` or prune value that `isExtWord` (csv, png, json) with no dir noun fails.
    - Remove the rg `exclude_glob` exemption when the word `isExtWord` and is not `DIRISH`.
    - Reject `^\.[a-z0-9]+$` when the word is not in `DOTFILES`, and reject `min.js` or `pb.go` without `*`.
    - A find `exclude_glob` with no wildcard and no extension, or any value when the exclusion noun is folder, dir or directory, needs `exclude_dir`. Use the extension test instead of the 10-entry `DIR_IDENT` set. Apply the same to grep `--exclude`.
    - An include glob directly after skip, skipping, except, excluding, without or not fails.
    - "named/called .x", or ".x files" where x is in `DOTFILES`, with `*.x` fails. This fixes the STRICTDEV `.env` row.
    - "X in the name", "with X in it" or "names have X" needs `*X*`.
    - "EXT files" with `*EXT*` needs `*.EXT`.
    - The grep `--include` operand rule should accept N≥1 wildcard-free `EXT_FILE` globs.
    - Gold risk is very low. Analysts measured 0 gold `-not -name` values without an extension, and 0 named-dotfile rows with `*.x`.

12. **Spurious grep or pattern provenance** (J 77, S) [WP2], strict_values.js F6.3.
    - A one-word, unquoted trailing-filter, `--grep` or `grep -c` pattern must follow a FILTER lead (with, containing, contain(s), mention(ing), matching, match(es), for, grep, keep, only, have/has, about, named, like, where, is, find, if, whether, any, are, does, "whole word"), after skipping a determiner or word/string/text. Otherwise it must be followed by a head noun (processes, lines, entries, commits, branches, names, messages, matches, ones).
    - Always reject: tail cues (retry, retrying, rotated, rotation) when `tail -F` is present, git cues (staged, unstaged, edits) with `git.diff`, greetings, and OS or host words when `proc.list` is present.
    - Gold risk is low after tuning. Analysts measured that 157 of 1,041 gold patterns fail the narrow lead set, and nearly all pass the extended one.

13. **Search output mode and counts** (M 68 + N 64, 1 strict, S) [WP3], in strict.js or a new `strict_pipeline.js`.
    - `MOD_WORDS files_with_matches`: drop file, files and where when the file noun directly follows an extension or language word.
    - `MOD_WORDS only_matching`: drop the bare matches, match, each, every, only and just unless `ONLY_MATCH_CUE` holds or the search is piped to sort or uniq. This also fixes the "first 200 bytes of the matches" row.
    - A spelled "files-with-matches" or "files-without-match" needs that mod (STRICTDEV).
    - "with file names", "with filenames" or "prefix the file name" forbids `-l`.
    - lack, lacking, missing or "without X" plus a files noun needs `-L`.
    - `perFileCue`: remove files and counts from the cue list at :443.
    - Reject `-l | xargs wc -l` when the request says "lines containing" or "matching lines".
    - An each-kind `head` or `tail` after `-l` fails when N quantifies files, paths, names or "of them", which mirrors :515.
    - "at most N matches per/in each file" needs `max_count`.
    - A freq stage followed by `wc -l` with "each" or "most frequent" fails.
    - "most repeated", "grouped by" or "how often" with no freq stage fails.
    - Gold risk is low to medium. Before tightening `only_matching`, grep gold for unpiped `-o` rows that have no `ONLY_MATCH_CUE`.

14. **git show vs diff vs log** (E 67, S) [WP3], strict.js :398.
    - Fire for a single non-range rev preceded by of, for, at, tag or commit, or in "<mod-noun> of/for REV", when there is no compare cue (vs, versus, against, compared, relative to, since, from…to, between, "working tree", "differ(s) from", the literal word diff).
    - `git.show` with a `..` rev or "differs from" fails. Add "relative to" to `show_vs` (that one is a WP1 edit).
    - `git.log` with vs, against or compared fails.
    - Gold risk is very low: "of/for REV" with no vs-cue is git show in 279 gold rows and git diff in 1.

15. **jq** (I 78, S) [WP3], strict.js `FIELD_FILLER`.
    - When jq follows curl, reject a field equal to a fetch noun (json, data, status, page, response, content, load, health, end, start, top, preview, redirects, from, if, get), unless field, key, property or `.x` is adjacent.
    - A jq path that is `^https?://` fails. In WP4, jq.json should also reject URL operands.
    - jq on an extension other than json, jsonl, geojson, lock or map fails unless "json" is said.
    - "the X key/field" with no `json.select` is `dropped_value`.
    - `jq_raw` += "as text" (WP1). "as (compact) JSON" forbids raw.
    - `MOD_WORDS json.select.raw`: drop field, key, name and value. Measure first, because gold sometimes uses `-r` for "value of key".

16. **Pattern truncation and dropped list members** (K 61 + list 12, 1 strict, M) [WP3].
    - After a filter lead, the pattern must cover every free non-function word up to the next boundary: in, under, from, a comma, a cue word, the end of the request, or "of <path value>".
    - "regex X" with a word before the regex metacharacters must include that word (STRICTDEV "status [0-9]{3}").
    - Key the check on "free and not consumed by any element", not on `unknown()`, which is blocked by `STRICT_KNOWN`.
    - Reject a pattern ending in a head noun (matches, lines, mentions) or containing "author".
    - Generalise the "X and Y" dropped-operand rule (:317) to comma, or and either lists for every role.
    - Gold risk is medium. Exempt adjacent head nouns (comments, calls, messages, errors, warnings, entries).

17. **Dropped ref** (D 38, 1 strict, S) [WP2], `strict_scope.js`.
    - Any free token of strict ref shape (`HEAD[~^]N`, `v\d+(\.\d+)+[\w.-]*`, A..B, a slash-prefix branch), or "the X branch" or "X branch", while a rev op is present, must be a rev value. A grep or author value equal to it fails.
    - Add of, for, to, against and vs to `REF_PREP`. Add "REF_WORD commits/history/log".
    - Gold risk is low. Guard against `main.go` as one token, and against version numbers after a message lead.

18. **Small cue rules** (U, S, V, W, L ~170 total, XS each) [WP1], all strict_cover.js.
    - Sort and wc:
      - drop-duplicates phrases as a COVER_RULE (no dupes, duplicates removed, dropping repeats, with duplicates removed);
      - `sort_keep_dups` (keep(ing) duplicates, duplicates kept) forbids `sort -u` and uniq;
      - `sort_numeric` += "number sort", numbers;
      - `wc_words`/`wc_chars`/`wc_bytes` forbid `file.count.lines` when no line or lines word is present (this overrides the `MOD_WORDS` count/how-many licence);
      - fix the `wc_units` parser for "words, and bytes" (skip a JOIN after a comma), for space lists, and for "X too".
    - `tail_retry`: retry, retrying, retries, rotation, rotated, rotate, "by name", reopen, recreated need `follow_retry`; "no retry" or "without retry" forbids it.
    - find depth:
      - `find_min_depth` += "at least N", "or more", "starting at depth", "from depth", "N levels under";
      - new `find_max_depth` (or less, at most, no deeper, up to N levels, within N, max depth, "at depth N", "depth N only") needs `max_depth` and forbids `min_depth` alone.
    - `find_dirs`: count only dir nouns outside the exclusion clause, and do not skip when `exclude_dir` is present. type=d is forbidden for file(s), anything, everything, entries.
    - Context flags: "before and after" or around needs context; trailing or "after" alone forbids context; "before" alone needs before.
    - Case: an ignore-case cue plus `case_sensitive` or `smart_case` fails. Skip "not case sensitive" in the :368 check; that is a WP3 one-liner.
    - `ls_itself` += dir entry, directory entries, directory-only, "no contents", "entries for". Remove entry and entries from `ls_contents.unless` and add a forbid for "entries of" and "hidden entries included".
    - Size sign: smaller, less than, under or below needs `size_lt` and forbids `size_gt`, and the reverse.
    - "N bytes" with head or tail needs bytes.
    - Anchors: add `grep_message` values to the anchor `patterns` list and move the "starts with needs ^" check here.
      - For norms, scan the 3 free words before `v.u`.
      - An anchored value with no START or END cue fails.
      - The :475 check then becomes redundant (WP3 deletes it).
    - curl:
      - `curl_include_headers` += include/including (the) response headers, headers plus body, plus (the) body, along with the body, incl headers;
      - remove lines from `curl_head_only.unless` and add "and nothing else";
      - `curl_fail` += on fail, silent-fail, "http errors as failure", bail on;
      - `curl_show_error` += show-error, print any error, still print(ing) errors, errors on.
      - Do not add a bare "headers" rule until gold is relabelled (73 rows use `-i`).
    - Gold risk is about zero to low. depth max 396/0 and min 308/0, and until 14/0, were measured.

19. **`--oneline` on "N lines of the log"** (P 65, M, gold first) [WP4 relabel, then a WP3 rule].
    - The rubric goes into `IR.md` and `adjudicate_lib.mjs`: "N lines of the log/history/output", "log lines", "how many lines does git log print" mean plain `git log`; commits, "commit lines" and "one line" mean `--oneline` or `-n`.
    - Relabel the 130 gold rows with `gold_rewrite.mjs`.
    - Then change git.json oneline `implied.when` to a new `piped_commits` (compile.js and strict.js `impliedHolds`), and add a forbid on `oneline` without a ONE_LINE cue when lines plus a head, tail or wc stage are present.
    - Gold risk is high until the relabel is done, so do it last.

20. **curl `-s` implied always** (H part ~33, S) [WP4].
    - curl.json: `silent.implied.when` changes from `always` to "piped, or after -o/-O, or not fail-without-show_error". `impliedHolds` gets the new `when` tokens.
    - Gold risk is very low: 5 of 747 rows.

21. **Stage order and list-vs-find conventions** (O 49, plus "list files in D", ambiguous). Rubric first [WP4], then rules [WP3]:
    - "in/within the last N lines" means tail first;
    - "last N lines with/matching X" means search first;
    - "N of the sorted/unique" means sort first;
    - "among the last N commits" means a pipe grep, not `-n` with `--grep`.
    - Gold risk is medium. Audit gold with the same rule before enabling it.

22. **Data work (no gate rule)** (Z ~117, judge 17) [WP4].
    - Run `apply_relabel.mjs` and `apply_adjudications.mjs` on the `gold_ok=false` ids.
    - Mark schema gaps as uncovered triggers: tac/`tail -r`, difftool, `git add`, blame, `--format=%h`, `-b`, `tail -c +N`.
    - Re-judge in both orders for the -type f/"everything" and per-file vs total pairs.

## 3. Work packages (no shared files)

**WP1: cue rules.** Files: `ir/lib/strict_cover.js`, `ir/test/strict_cover.test.js`.
- Fixes: 4 (uniq), 5 (`npm_scripts` rule), 9 (git mod cues), 18 (all the small rules, including anchors with `grep_message` and curl phrases), plus `jq_raw` and `show_vs` additions.
- It may grow toward 450 lines. If it passes about 600, split `strict_cover_git.js` from the generic file.

**WP2: value provenance, roles, dropped content.** Files: `ir/lib/strict_values.js`, `ir/lib/accountability.js`, new `ir/lib/strict_scope.js`, and new tests `ir/test/strict_scope.test.js` and `ir/test/accountability.test.js`.
- Fixes: 1, 5 (package and script values, dropped package), 6, 7, 8, 10 (`CUE_KEYS`), 11, 12, 17.
- Needs from strict.js only what `cx` already passes. Import `STRICT_KNOWN`, `PRODUCT_NAMES` and `DIRISH` from strict.js; the import cycle is safe because they are used only inside functions. `DIRISH` must be exported (this is the one-word WP3 change).

**WP3: pipeline and op semantics, `MOD_WORDS` tightening.** Files: `ir/lib/strict.js`, new `ir/lib/strict_pipeline.js`, `ir/test/strict.test.js`, and a new `ir/test/strict_pipeline.test.js`.
- Fixes: 5 (npm test stages), 10 (operand-kind rules), 13, 14, 15, 16, the `MOD_WORDS` and COVER blockers listed under 9, and the :291 `PATH_STOPWORDS` exemption.
- Also exports `DIRISH`. It deletes `dotPath` (:553-559), the paths condition at :493, and :475 only after WP1 and WP2 have merged.

**WP4: schemas, compile, normalizers, decline, data.** Files: `ir/schemas/{curl,git,ls,wc,jq}.json`, `ir/lib/compile.js`, `ir/lib/normalizers.js`, `ir/lib/lexicon.js`, new `ir/lib/decline.js` and its wiring in `ir/lib/obligations.js`, `scripts/ir/gold_rewrite.mjs`, `scripts/ir/adjudicate_lib.mjs`, `ir/lib/API.md`, `docs/IR.md`, plus tests in `compile_semantics.test.js`, `schemas.test.js`, `normalizers.test.js`, `gold_rewrite.test.js` and a new `decline.test.js`.
- Fixes: 2, 3, 19 (relabel and schema), 20, 21 (rubric), 22.
- lexicon.js: multi-extension languages (elixir → ex, exs; also svelte and j2 as extension words).
- jq.json: a URL operand is invalid.
- The decline module's lists are its own; WP2 leaves the `DEIXIS` set in strict_values.js unchanged.

Merge order: WP4 relabels first (19 and 21 depend on the data), then WP1, WP2 and WP3 in any order, then the WP3 cleanup deletions.

## 4. How to measure (per rule, before enabling)

The scratch tools are in `/private/tmp/claude-501/-Users-lukasz-Git-tellsh/b1b12a4f-3441-4192-8991-7f52ddcdb6e5/scratchpad/`:

- **Gold false rejects.** Run `node /private/tmp/claude-501/-Users-lukasz-Git-tellsh/b1b12a4f-3441-4192-8991-7f52ddcdb6e5/scratchpad/rw.mjs build/ir/dataset/v4/train.jsonl before.jsonl`. Apply the rule, run it again into `after.jsonl`, then run `node /private/tmp/claude-501/-Users-lukasz-Git-tellsh/b1b12a4f-3441-4192-8991-7f52ddcdb6e5/scratchpad/cmp.js before.jsonl after.jsonl 6`. Do the same for `build/ir/dataset/v4/dev.jsonl`.
  - Budget: ≤0.1% of gold `ok` rows newly rejected per XS/S rule, ≤0.3% for fixes 8 and 3, and ≤1% in total.
  - Each newly rejected gold row is either a gold error (send it to the relabel list) or a reason to tighten the rule.
- **Errors removed.** Run `node /private/tmp/claude-501/-Users-lukasz-Git-tellsh/b1b12a4f-3441-4192-8991-7f52ddcdb6e5/scratchpad/adj1/regate.mjs <judged-wrong list> linux_gnu`. It re-gates both PRED and GOLD for each judged line, and the target is P:REJECT with G:ACCEPT.
  - Track the STRICTDEV ids separately, because they are weighted ×20.
- **Role shapes.** `/private/tmp/claude-501/-Users-lukasz-Git-tellsh/b1b12a4f-3441-4192-8991-7f52ddcdb6e5/scratchpad/revs.mjs` and `/private/tmp/claude-501/-Users-lukasz-Git-tellsh/b1b12a4f-3441-4192-8991-7f52ddcdb6e5/scratchpad/paths.mjs` are ready for fix 7. Re-run `revs.mjs` with the strict `REF_SHAPE` (no catch-all).
- **Strictest setting.** After every WP, re-run the dev evaluation at the strictest acceptance setting, and report the residuals and the coverage loss.
- **Tests.** Every fix gets at least one `no(...)` built from a cluster example and one `ok(...)` built from the matching gold-positive phrasing, using the `check()` / `ok()` / `no()` helpers that already exist in `ir/test/strict_cover.test.js`. Frontend unit tests do not apply.

Expected yield if all gate rules land within budget: about 1,500 to 1,700 of the 2,463 judged-wrong accepted predictions rejected, and about 12 to 14 of the 18 attributed STRICTDEV residuals. The decline rules, the schema gaps and home scope carry most of the strict weight. The estimate does not count the relabel-dependent fixes 19 and 21.