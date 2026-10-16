# tellsh typed IR: merged error clusters and a ranked plan of systematic fixes

## 0. Facts behind the numbers

I checked these against the code and the adjudication outputs, not only the analysts' notes.

**Adjudication base rates**
- Train k-fold (`build/ir/adjudicate/v2_kfold/summary.json`):
  - The model disagreed with gold on 12,241 of 61,374 predictions (19.9%).
  - 1,999 of those disagreements were judged: 278 both correct, 309 pred right and gold wrong, 1,340 pred wrong, 72 both wrong.
  - A sample of 599 agreeing rows was also judged: 8 had a wrong gold (both wrong or pred right and gold wrong).
- Dev (`v2_dev`): 253 disagreements out of 3,147 candidates (8%). Of those, 26 both correct, 57 pred right and gold wrong, 146 pred wrong, 24 both wrong.
  - In the 300 agreeing dev rows, 14 were judged both wrong and 2 pred right / gold wrong.
- The verdict mapping is correct: `adjudicate_lib.mjs:63` maps a/b back to pred/gold through `a_is_pred`.
  - The analysts' "judge swapped A/B" findings come from reading the WHY text, which still says A/B. The verdicts themselves are not swapped.
  - The judge ran at `effort: low`.
- Gold counts in `dataset/v2/train` (50,998 rows with a command):
  - 1,214 rows are `rg --files`; only 190 of them have an ignore/rg cue.
  - 905 rows are `git log … | head -n`.
  - 579 rows are unpiped `rg|grep -c`.

**Claims checked in the code**

| Claim | Status | Evidence |
|---|---|---|
| `files.list` (rg `--files`) is a default realization | ✔ | `rg.json:470-471` `"realization":"default"` |
| `-o` is implied whenever piped | ✔ | `rg.json` (~l.173) and `grep.json` (~l.169): `implied.when: "piped"` |
| `git log --oneline` is implied when piped | ✔ | `git.json:118` |
| equiv: sort\\|uniq and \\|wc -l rewrites only fire for 3-part commands | ✔ | `equiv.mjs` `parts.length === 3` |
| equiv: `LINE_FLAGS` has no `-r` | ✔ | |
| equiv: curl `-S` is dropped only when there is no `-s` | ✔ | |
| equiv: no rewrite of `git log \\| head -n N` | ✔ | |
| equiv: always drops `--oneline` and `-type f` (over-lenient) | ✔ | |
| A cue → required mod check exists, but is small | ✔ | `strict.js:85` `COVER`, about 16 rules. `REQUIRE_WORDS` (`lexicon.js:240`) only enforces the other direction (no mod without a cue word) |
| "starts with" requires `^` | ✔ `strict.js:454` | There is **no** "ends with" → `$` rule and no check that rejects `^` on an "end" cue |
| "remote branches" accepts either `-r` or `-a` | ✔ `COVER` | This is why `-a`/`-r` swaps pass the gate |
| `PATH_STOPWORDS` lacks current/cwd/across | ✔ `strict.js:163` | |
| `GIT_SCOPE_WORDS` only applies when a git op is present | ✔ `strict.js:274` | |
| `REF_WORD` lacks feat/fix/chore/refactor | ✔ `strict.js:168` | |
| A rev value is only checked for "looks like a file" | ✔ `strict.js:472` | No generic-word check on revs |
| Accountability `CONTENT_WORDS` is very small | ✔ 8 words | `GENERIC` contains words like `out` and `collapse`, which hides truncated phrases |
| Possessive normalizer exists | ✔ `normalizers.js:286` | Nothing rejects a raw `'s` span |
| Ops that already exist | | `npm.scripts`, `git.branch.merged`, `show_current`, `jq.raw`/`compact`, `ls.one_per_line`/`directory`/`recursive`, `find.min_depth`/`empty`/`type`. The schema-gap claim about "needs `--merged`" is wrong |
| Real schema gaps | | No `ls -a`, no tac / `tail -r`, no `git log %an`, no pgrep, no `ps -u`, no `find -perm` |
| Hidden-only files | | `find -name '.*'` can already be expressed with `name_glob`. The gap is only in `ls` |

**There is no n-best or gate-in-the-loop decoding** (no beam, rerank or top-k anywhere in the repo or `docs/IR.md`). So a new gate rule only turns an accepted wrong answer into a rejection or a fall-through to another route. It does not produce the right answer unless retraining or n-best decoding is added (see F5).

## 1. Merged clusters (counts summed over the four analysts, out of about 2,286 errors)

| # | Merged cluster | Layer | Count | Main sources |
|---|---|---|---|---|
| M1 | File listing realized as `rg --files` vs `find` (gold 139, pred 80, `-not -name` without `-type f` 4) | compile + gold | **223** | 8 clusters |
| M2 | Equiv over-strict: git log `-n` vs `\\|head` (57+), curl `-s`/`-S` and jq `-r` (79), grep `-c` vs `\\|wc -l`, sort\\|uniq (≈63), `find -exec rg` vs `rg -g` (41), other no-ops (42) | equiv | **282** | 16 clusters |
| M3 | Equiv over-lenient: `--oneline` dropped before head/tail/wc, `-type f` dropped on "files" requests | equiv | 16 | |
| M4 | Gold declines a clear request (gold null wrong, pred right) | gold | **121** | +12 more where pred is also wrong |
| M5 | Cue word present but its mod/const missing or wrong. Biggest parts: uniq -d/-u 77, show/diff/log 62, sort/wc 55, git format 52, ls 42, find type 45, branch -a/-r 39, anchors 39, curl flags 38, git status 32, curl -I/-i 28, other dropped flags 29, show-current 15, jq raw 11, date 10 | model (catchable by the gate) | **≈ 610** | |
| M6 | Request word becomes a value: path, rev, npm package, author or pattern, including spurious grep stages and misread words | gate / model | **≈ 166** | |
| M7 | Scope words (repo, project, current, cwd, workspace) used as a literal directory (gold also inconsistent) | gate / gold | **≈ 43** | |
| M8 | Rev and path on the wrong side of `--` | gate | **≈ 38** | |
| M9 | Wrong glob or exclude shape: bare extension, `--exclude` vs `--exclude-dir`, prune vs `-not -name`, a named file turned into an include glob, exact name vs `*.ext` | gate / compile | **≈ 55** | |
| M10 | Possessive kept in `--author`, trailing punctuation in a value | gate | **≈ 27** | |
| M11 | `rg/grep -c` over a directory (per-file counts) vs one total via `\\| wc -l`; judge inconsistent here | compile / ambiguous / judge | **≈ 68** | |
| M12 | `-o` added because "piped" implies it, wrong for frequency or distinct-line pipelines | schema / gate / gold | **≈ 36** | |
| M13 | curl `-I` vs `-i`, gold side or genuinely ambiguous | gold / ambiguous | **≈ 36** | |
| M14 | Model answers an underspecified or deictic request where gold correctly declines | gate | **≈ 71** | |
| M15 | Capabilities the schemas lack (tac, `ls -a`, hidden-only `ls`, `%an`, pgrep, `ps -u`, `-perm`, braces, git add) | schema | **≈ 67** | |
| M16 | Other gold errors: misc semantics, git log `\\| head` on a multi-line log, `.status` jq on a plain endpoint, identical pred and gold that both miss intent | gold | **≈ 44** | |
| M17 | Stage order and slicing: last-N-matching vs matches-in-last-N, `--grep` vs `\\| grep`, `head` vs `tail` | ambiguous / model | **≈ 34** | |
| M18 | Judge errors: misreads, plus "repo" treated as a literal | judge | **22** | Not counting template inconsistencies, which are folded into M2 and M11 |
| M19 | Pure model capacity: wrong op family (75), dropped search root (73), dropped stage (46), truncated phrase (21), per-file vs total op (17), output mode (26), case on the wrong stage (8), compound search (5), path with a space (3) | model | **≈ 274** | |

The rows sum to about 2,290, which matches the total. By layer, as the analysts tagged them: model ≈ 1,120, gold_data 340, gate_gap 270, equiv 298, compile 127, schema 55, ambiguous 54, judge 22.

**Extrapolation to the full k-fold set:** the 1,999 judged disagreements are a sample of 12,241, so multiply train-side counts by about 6.1 for full-train impact.

## 2. Ranked plan of systematic fixes

Ranking is by errors removed divided by effort. "Removed" means the row stops counting as an error: it is relabeled, scored as equivalent, or turned from accepted-wrong into a correct rejection.

### F1. Retire `rg --files` as the default file lister (M1 ≈ 223, plus about 1,024 gold rows). Effort: S–M

**Changes**
- `ir/schemas/rg.json` `files.list`: change `"realization":"default"` to opt-in.
- `ir/lib/strict.js`: reject `files.list` unless an IGNORED cue (`lexicon.js` `CUE_LEXICON.IGNORED`) or an explicit `rg`/`ripgrep`/"would search" cue is present.
- `scripts/ir/apply_relabel.mjs` (or the gold normalizer): rewrite cue-less gold `rg --files [-g G] [--max-depth N] D` as follows. Lift it, then recompile through `files.find`:
  - always add `-type f`;
  - `--max-depth N` → `-maxdepth N`;
  - a positive glob → `-name`;
  - `!*.ext` → `-not -name`;
  - `!dir` → `-type d -name dir -prune -o -type f -print`.
- `compile.js`: whenever the request noun is "files", emit `-type f` together with `-not -name`.

**Expected effect**
- About 223 sample errors removed, roughly 1,300 at full-train scale.
- One op realization fewer for the model to confuse.
- macOS correctness: rg is not installed on stock macOS.

**Risks**
- Requests that really want gitignore semantics. Keep the IGNORED cue path for those.
- `--hidden` listings (see F12).

**Verify**
- Count of cue-less `rg --files` in regenerated gold should be 0.
- Re-score the adjudicated set: `y` should flip to 1 on the M1 rows.
- Gate-replay the k-fold preds. Expect no rejections of `pred_correct` rows that carry an IGNORED cue.

### F2. Apply the adjudications to declined gold and other judge-approved preds (M4 121, M16 about 30, part of M13). Effort: S, because the script exists

**Changes**
- Run `scripts/ir/apply_adjudications.mjs` over every row with `pred_correct && !gold_correct && gate accepted`. The pred replaces the gold.
- For both-wrong rows, use the judge's suggested command only when it compiles. Otherwise drop the row or mark it `schema_gap`.

**Expected effect**
- About 150 sample errors removed. In the k-fold sample, 93 of 1,999 rows are null gold the judge marked wrong, so roughly 570 train rows.

**Risks**
- It teaches the model to answer borderline-ambiguous requests. Limit the flip to rows whose request maps to a single supported op and that the gate accepts strictly, with no unpin retry.

**Verify**
- The dev decline rate should drop.
- Dev precision on genuinely ambiguous rows (M14 set) must not fall.

### F3. equiv.mjs normalizations, request-sensitive (M2 ≈ 282, M3 16). Effort: S

These change scoring and verifier-pair labels, not the shipped commands. They also remove false negatives from the verifier training pairs (`make_candidates`, `kfold_mine`).

`stageKey` already receives `request`. Rules:
1. **git log limit.** Before `--oneline` is stripped: `git log ARGS | head -n N` → `git log -n N ARGS`, only when ARGS has `--oneline` or a one-line `--format`, and has no `--graph`, `-p`, `--stat` or `--name-*`.
2. **Generalize the 3-part rewrites** to any adjacent stage pair:
   - `sort F | uniq` → `sort -u F`;
   - `sort -f | uniq -i` → `sort -u -f`;
   - `X | grep FL P | wc -l` → `X | grep FL -c P` when grep reads stdin.
   - Add `-r`/`-R`/`--recursive` to `LINE_FLAGS` for the single-file case.
3. **curl.** Drop `-s` when output goes to a pipe or to `-o`/`-O`/`-I` and the request has no quiet/silent/progress cue. Drop `-S` unless there is a "show/still show errors" cue.
4. **jq.** Drop `-r` unless there is a raw/unquoted/no-quotes cue.
5. **Small no-ops:**
   - sort the alternatives inside `find \\( -name A -o -name B \\)`;
   - `npm ls --all PKG` == `npm ls PKG`;
   - drop `ls -1` when there is `-l` or ls is piped, unless the request says "one per line";
   - drop a trailing `2>&1` on `npm run`;
   - drop `--decorate` when `--format` has no `%d`.
6. **Remove the over-lenience (M3):**
   - keep `--oneline` when the next stage is head/tail/wc and the request is about lines;
   - keep `-type f` when the request contains a FILE_NOUN and the command uses `-not -name`. Only safe after the F1 relabel.
7. **Do not** add `find -exec rg -H` == `rg -g`. Choose one canonical form in `compile.js` instead: `rg -g '*.ext' P D` unless hidden/ignored/"each file" is asked. Relabel gold to match (41 rows). The judge ruled both ways on this pair.

**Expected effect:** about 240 to 280 sample rows re-scored, roughly 10–14% of disagreements. This matches `both_correct` = 278/1,999.

**Risks:** over-merging. Each rule must be request-sensitive.

**Verify:** run `equivKey` over all 2,252 adjudicated rows. Rows whose key changes must have judge `equivalent || both_correct` in at least 97% of cases. Every row where the judge said "not equivalent" but the new key matches is a bug in the rule.

### F4. Count semantics: `-c` over a directory vs one total (M11 ≈ 68). Effort: S–M

**Changes**
- `docs/IR.md` and `compile.js`: "count (matching) lines" over a directory, glob, several paths or `-r` means `search | wc -l`. `-c` is allowed only for a single file operand or with an "each/per/every file" cue.
- `strict.js`: reject the count mod with a directory operand unless that per-file cue is present.
- Add the same rule to the adjudicator prompt in `scripts/ir/adjudicate_lib.mjs`.
- Relabel gold.

**Expected effect:** about 68 sample rows, and part of the 579 unpiped `-c` gold rows.

**Risk:** "in every python file" is genuinely per-file. Keep "every/each" as the per-file cue.

**Verify:** grep gold for `-c` with a directory operand. Re-judge 50 rows with the new rubric.

### F5. Cue → mod coverage obligations: extend `COVER` in `strict.js` (M5 ≈ 610). Effort: M

This is the largest lever, but it buys **precision only** unless n-best decoding is added.

Add entries to `COVER` (for exact-const cues, key on `op.mod=const`) and a small FORBID table for the contradicting mod. Both tables share one lexicon in `lexicon.js`.

| Cue words | Required | Forbidden |
|---|---|---|
| numeric, numerically, by number | `lines.sort.numeric` | |
| only repeated, dupes only, which repeat, more than once | `lines.uniq.repeated` | |
| once, singles, singletons, non-repeated | `lines.uniq.unique_only` | |
| collapse, squash, dedupe adjacent | | `repeated` |
| short (with git status) | `git.status.short` | |
| branch info, branch line, branch header | `git.status.branch` | |
| current branch (name) | `git.branch.show_current` | |
| including remotes, local and remote, every branch, all branches | `git.branch.all` | `remotes` |
| remote branches with no all/local cue | `remotes` | `all` (today `COVER` accepts either) |
| hash and subject | `format=hash_subject` | |
| subjects only, just subjects | `format=subject` | |
| author … date | four-field format | |
| fuller | `fuller` | |
| relative, iso | `date=` const | |
| until, up to, before | `until` | `since` |
| both X and Y (in the message) | `all_match` | |
| patch, diffs | `-p` | |
| stat, diffstat | `stat` | |
| names, name-only, which files (for git) | `name_only` | |
| staged, cached, index | `staged` | |
| labels, decorate | `decorate` | |
| ends with, ending with | `$` anchor | `^` |
| starts with (exists) | | `$` |
| one per line, one column | `ls -1` | |
| recursive | `-R` | |
| directory entry, itself | `-d` | `-d` when "contents" |
| directories, folders as the head noun | `type=d` | |
| symlinks | `type=l` | |
| empty | `-empty` | |
| at least, or deeper | `min_depth` | |
| quiet, silent, hide progress | curl `silent` | |
| show errors, errors on | `show_error` | |
| fail on errors, silent-fail | `fail` | |
| include headers, headers and body, headers too | `http.get.include_headers` | `http.head` |
| headers only, just headers | `http.head` | |
| raw, unquoted | `jq.raw` | |
| words / bytes / lines (with wc) | exactly the flags named | flags not named |
| scripts (with npm) | `npm.scripts` | |
| X commit, of commit X | `git.show` | |
| vs, against, compared to, working tree | `git.diff` | `git.show` |
| from A to B | `git.diff` with two revs | |

**Expected effect**
- Turns about 450 to 550 accepted-wrong sample rows into rejections. The rest are cases the cue lexicon misses.
- Recall gain only after:
  - (a) retraining on data that covers these cues (§4), and/or
  - (b) **gate-in-the-loop n-best**: sample k=4–8 IRs from the D route or the P-head top-2 per slot, and return the first one the gate accepts. Medium effort; this alone converts many of these rejections into correct answers.

**Risks**
- Over-rejection when a cue word is used in a different sense, for example "short" inside a filename. Restrict matching to free (unconsumed) words, as `hasFree` already does.
- The regression budget is the number of `pred_correct` rows that become rejected.

**Verify**
- Replay the gate over all k-fold and dev preds. Report:
  - accepted-wrong rows newly rejected, which should be about 0.35 of M5;
  - `pred_correct` rows newly rejected; target under 0.5% of accepted.
- Run the existing gate tests.

### F6. Value-span integrity in `strict.js` (M6 + M7 + M8 + M10 ≈ 274). Effort: M

**Changes**
1. Add `current`, `cwd`, `pwd`, `top-level`, `across`, `machine`, `readable`, `printing` to `PATH_STOPWORDS`. Reject a single-punctuation path (`,`).
2. Apply `GIT_SCOPE_WORDS` to **all** ops when preceded by the/this/my/our or followed by "root" (map to `.`). A bare "under repo" stays a literal directory.
3. Run the stopword, filler and cue-word checks (today they apply to `paths` only, `strict.js:271`) on these slots as well:
   - `rev` and `mod:rev`;
   - the npm package positional and the npm run script name;
   - `mod:author`;
   - the pattern of a trailing grep stage;
   - the jq key (extend `FIELD_FILLER`: fetch, get, json, status after "check the", if, End).
4. Require a rev value to look like a ref: `REF_WORD` extended with `(feat|fix|chore|refactor)/…`, a hex sha of 7–40 characters, `HEAD~n`/`HEAD^`, `v\\d…` tags, or a value containing `/`. Reject a `paths` value that matches `REF_WORD` and has no extension.
5. Reject `mod:author` spans that match `/['’]s(\\s|$)/` and are not quoted, which forces `norm:possessive`.
6. Reject any value whose unit lies inside a matched cue phrase, not only after `CUE_LEAD` words.

**Expected effect:** about 200 to 270 sample rows go from accepted-wrong to rejected. Gold relabel for "the repo" → `.` covers about 8 more.

**Risks**
- Real directories named `current`, `project` or `machine`. The DIR_NOUNS / "named" exemption already covers explicit wording.
- Real branches named like English words (`view`). Accept a word that is quoted or `REF_PREP` + word + "branch".

**Verify:** the same gate replay as F5, plus targeted unit fixtures for each word list.

### F7. Narrow the implied `-o` (M12 ≈ 36). Effort: XS

**Changes**
- `rg.json` and `grep.json` `only_matching.implied.when`: change `"piped"` to wc-only, meaning occurrence counting with `| wc -l`.
- Otherwise `-o` needs a `COVER` cue: "only the match", "matched text", "occurrences", "extract".
- Relabel gold `-o` under `sort|uniq -c`, `sort -u` or `head` when the request says "lines" (31 or more train rows).

**Risk:** "each X name / extract" requests. Add those to the cue list.

**Verify:** grep gold for `-o … | sort`, then re-score.

### F8. Glob and exclude shape checks (M9 ≈ 55). Effort: S

**Changes in `strict.js`**
- Extend the extension-without-wildcard check (`strict.js:283`) to:
  - grep `include_glob` and `exclude_glob`;
  - rg glob values, including the `!` prefix;
  - "ending in .X" values, regardless of `isExtWord`.
- A file-like value (has an extension) in `exclude_dir` or prune → reject.
- An extensionless value, or a known directory (`KNOWN_IDENT`: `node_modules`, `vendor`, `target`, `__pycache__`), in `-not -name` or `--exclude` → reject.
- A single literal filename in a grep `--include` with path `.` → reject.

**Changes in `compile.js` / `canon.js`:** render a bare filename target as an operand, not an include glob.

**Verify:** gate replay; check the dotfile exemptions (`DOTFILES`).

### F9. curl `-I` vs `-i` and the "repo" rule: gold relabel plus adjudicator rubric (M13 36, M18 judge 22). Effort: S

**Changes**
- Write the `-I`/`-i` cue rule (F5 table) into `docs/IR.md` and the `adjudicate_lib.mjs` prompt.
- Add to the prompt: "repo/the project without a path marker = `.`", "count lines with no per-file cue = one total", and "rg `--files` skips ignored files".
- Relabel gold with the same rules.
- Rewrite A/B in the exported WHY text to PRED/GOLD so analysts stop misreading it.
- Re-run the judge on changed templates at `effort: medium`, in both orders, and keep only verdicts that agree.

**Verify:** judge agreement between the two orders should be at least 95%. The inconsistency on the same template (`grep -c`, `rg -g`) should drop.

### F10. Generator prompt changes for Haiku (prevents the gold noise from coming back). Effort: S

In the generation prompts (`grok_gen.mjs` and the Haiku generation scripts):
- Decline only when no single supported op answers the request. Add explicit positive examples for tail, sed, jq, pkill, curl, git log.
- Use `find -type f` for listing files.
- Never use `-o` before `uniq -c` or `sort -u` for "lines".
- `git log -n N`, never a multi-line `git log | head`.
- One total for "count lines" over a directory.
- "The repo" → `.`.
- `-I` for headers only, `-i` for headers together with the body.

Add a post-generation **gold lint**: these rules expressed as regexes run against the IR, which drops or flags violations.

### F11. Equiv-independent scoring of accepted alternatives. Effort: XS

`score_combined` already uses the adjudicated accepted-wrong verdicts (commit 8ee2fd2). Extend it to treat judge `both_correct` as soft-equivalent, for example in `--grep` vs `| grep` pairs and the M17 ambiguous order cases. This affects measurement only.

### F12. Schema gaps (M15 ≈ 67). Effort: M–L

- Add `lines.reverse` (tac on Linux, `tail -r` on darwin).
- Add `ls.all` (`-a`).
- Add a `git.log` format const `%an`.
- Add `proc.find` (`pgrep -x`/`-f`).
- Add `proc.list` user (`ps -u`).
- Add `find -perm` / executable.
- Hidden-only listing: lexicon "hidden files" with no too/included cue → `find D -maxdepth 1 -name '.*'`. This needs no schema change. Relabel the gold `rg --files --hidden` rows (28 rows).
- `pkill`: reconsider the forced `-x` for interpreter-hosted processes.
- Until the new ops exist, add `uncovered_content` triggers ("root", "executable", "tree view", "reverse the lines") so the gate rejects instead of letting a near-miss op through.

### F13. Decline underspecified and deictic requests (M14 ≈ 71). Effort: M, regression risk higher

**Changes in `accountability.js`**
- Reject definite references with no antecedent: "the function", "the server log", "the target", "over there", "from before", "the file I was editing".
- Reject a pattern or key span that is the op's own cue word or a generic noun (function, usages, case-insensitive, `.jq`).
- Reject a restricting noun phrase left uncovered ("test files", "8000 range").
- Grow `CONTENT_WORDS` (`out`, `app`, `web`, `e2e`, `config`, `logs`, `site`, `scripts`, …).
- Remove `out` and `collapse` from `GENERIC` where they hide truncated phrases.

**Verify:** precision and recall on the dev decline subset. Hold the false-decline budget to 1% or less.

### Summary table

| Rank | Fix | Rows (sample) | Effort | Kind |
|---|---|---|---|---|
| 1 | F7 implied `-o` | ~36 | XS | product and gold |
| 2 | F2 apply adjudications (gold nulls) | ~150 | S | gold |
| 3 | F3 equiv rules | ~250 | S | measurement |
| 4 | F1 retire `rg --files` | ~223 (+1,000 gold rows) | S–M | product and gold |
| 5 | F4 count semantics | ~68 | S–M | product and gold |
| 6 | F9 rubric and relabel (`-I`/`-i`, repo) | ~60 | S | gold and judge |
| 7 | F8 glob shape | ~55 | S | precision |
| 8 | F5 cue coverage | ~500 | M | precision; recall only with retraining or n-best |
| 9 | F6 span integrity | ~250 | M | precision |
| 10 | F10 generator prompt and lint | prevents recurrence | S | data |
| 11 | F12 schema gaps | ~67 | M–L | product |
| 12 | F13 decline rules | ~71 | M | precision; risky |

## 3. What remains as pure model capacity

- **Measurement and label problems:** about 830 of 2,286 errors (36%) are not model errors. Gold 340, equiv 298, ambiguous 54, judge 22, plus the gold side of compile issues about 120. F1–F4 and F9 remove most of this.
- **Model errors the gate can catch:** about 880 (38%), covered by F5 and F6–F8. The gate turns them into rejections, which raises precision. They become correct answers only through retraining or n-best decoding.
- **Errors the gate cannot catch at all:** about 274 (12%, M19) plus the residue of M5 and M6 that lexicon cues miss (about 100 to 150).
  - In total about 380 to 420 errors, **17–18% of the current error set**. That is roughly 2.5–3.5% of k-fold predictions: 12,241 × 0.18 ≈ 2,200 of 61k.
  - Constructs: wrong op family (ls vs head/sort, npm test vs run, rg vs ps), a dropped search root, a dropped filter or extraction stage, show/diff/log choice, stage order (last N lines of a match vs matches in the last N), compound "X in files mentioning Y", a multi-word pattern cut to one word, case or word flags on the wrong stage.

**Data and training changes**
1. **Contrastive minimal pairs per cue**, generated from templates with `value_pools.mjs`. For each F5 cue row, write pairs that differ only in that cue: uniq plain/-d/-u; `-I`/`-i`; `-a`/`-r`; `%s` / `%h %s`; status `-s`/`-b`; show/diff; since/until; `^`/`$`; ls `-1`/`-d`/`-R`; wc flag sets. About 200 to 400 pairs per construct. Weight the verifier's `mod_drop`/`mod_swap` negatives toward these.
2. **Path-dropout augmentation.** Make the path the only content token ("Which lines in ci don't include X", "recursive listing of docs"). Also add directory names that are English words (`out`, `include`, `logs`, `config`).
3. **Filler-noise augmentation.** Put slang and filler next to slots ("rn", "real quick", "pls", "the repo", "drawn as a graph", "for scripts") with targets that leave them out. Also typos ("shwo", "chnages").
4. **Ref-shape and possessive data.** Branches like `feat/`, `fix/`, `chore/`; "on X" vs "touching X"; "dave's commits" with `--author=dave`.
5. **Op-choice data.** Beginning/opening/top of FILE → head; "processes/procs" → ps; "in the name" → `find -name`; "scripts" → `npm.scripts`; reverse listing of a directory → `ls -r`.
6. **Structure data.** "X in files that mention Y" (two-stage); "last N <pattern> lines" (filter, then tail); "first N files" (head on the list) vs "first N lines of each" (per-file head).
7. **Retrain after** the F1, F2, F4, F7 and F9 relabels. The current mix teaches the model both list ops and both count conventions, so retraining before the relabel would bake that in.
8. **Gate-in-the-loop n-best** (see F5) is the cheapest way to turn gate rejections into right answers without growing the model.

## 4. Noise estimates

**Gold noise rate**
- Train k-fold: in disagreements, (309 + 72) / 1,999 = 19.1%, so about 2,340 of the 12,241 disagreements. In agreements, 8/599 = 1.3%, so about 660 of 49,133. Total ≈ **4.9% of train gold** (rough 95% CI 3.8–6.0%).
- Dev: (57 + 24) / 253 in disagreements; in agreements 16/300 = 5.3%. Total ≈ (81 + 154) / 3,147 ≈ **7.5%**. The agreeing sample is small (CI about 4–11%).
- About **one quarter (train) to two thirds (dev) of the gold errors sit where pred and gold agree**, for example `rg --files`, `-o` in frequency pipelines, and git log `| head`. Disagreement mining cannot see these, which is why F1, F7 and the F10 lint must rewrite gold by rule, not by adjudication.
- By type:
  - wrong declines: about 30% of gold errors (null rate inflated on curl/tail/pkill/git log);
  - systematic realization conventions (`rg --files`, `-o`, `-c`, `-i`): about 45%;
  - one-off semantic slips: about 25%.

**Judge error rate**
- Clear misreads: 22/2,286 ≈ **1%**.
- Template inconsistency, meaning different verdicts on the same construct (`grep -c` vs `| wc -l`, `rg -g` vs `find -exec`, curl `-s`, `-I`/`-i`, "repo"): about 60 to 80 rows, **3%**.
- Combined, **about 3–5%** of adjudicated rows. The agree-sample rows with y=1 but pred judged wrong (8 train, 9 dev) are mostly real equiv over-lenience (M3), not judge error.
- To reduce it: run the judge in both orders (`effort` medium) and add the explicit rubric rules from F4 and F9.

Files checked:
- ir/lib/strict.js
- ir/lib/accountability.js
- ir/lib/lexicon.js
- ir/lib/obligations.js
- ir/schemas/rg.json
- ir/schemas/grep.json
- ir/schemas/git.json
- scripts/ir/equiv.mjs
- scripts/ir/adjudicate_lib.mjs
- build/ir/adjudicate/v2_kfold/summary.json
- build/ir/adjudicate/v2_dev/summary.json
- build/ir/dataset/v2/train.jsonl
