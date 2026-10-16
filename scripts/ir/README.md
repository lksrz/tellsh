# scripts/ir

## grok_gen.mjs: synthetic NL -> shell data for the typed-IR pilot

Generates labelled requests (`ok | ambiguous | underspecified | out_of_scope | not_shell`) with
bash commands for the pilot tools, by calling the `grok` CLI headlessly with structured output
(`--json-schema`). Each call gets a spec: a focus (one tool schema, a §3 pipe pattern, a
contrastive minimal-pair theme, or an abstention family), a label mix, a style and a project
flavour. Run mix: ~55% single-tool, 20% pipes/each, 10% contrastive, 15% abstentions.

Only `docs/IR.md` excerpts (§0, §3, §7 example rows, §8) and `ir/schemas/*.json` are sent.
grok runs from `build/ir/grok/cwd` so it does not index the repo.

```sh
node scripts/ir/grok_gen.mjs --total 10000 --per-call 100 --concurrency 6 \
  --out build/ir/grok/run1 --seed 1          # [--model ID] [--timeout SEC] [--dry-run]
```

Outputs in `--out` (under `build/`, gitignored):

- `items.jsonl` — one item per line + `{call, spec, model}`
- `usage.jsonl` — per call `{call, input_tokens, output_tokens, reasoning_tokens, cost_usd, ms, n_items, ok, error}`
- `rejects.jsonl` — items flagged by local checks (still kept in items.jsonl): ok without
  command, forbidden constructs (`;` `&&` `||` redirects `$(` backticks sudo rm loops awk ...),
  binaries not in the schemas, duplicate requests
- `plan.json`, `prompts/callN.txt`

Backends (`--backend`, same prompt and output schema): `grok` (default, CLI), `codex` (CLI,
`gpt-6-luna`), `claude` (CLI `-p`, `claude-haiku-5-5`), `api` (Anthropic Messages API, key from
`CLAUDE_API_KEY` / `ANTHROPIC_API_KEY`; HTTP 429/529 are retried with backoff). `--model` and
`--effort` override the backend defaults.

Resumable: re-running with the same args skips calls whose usage line has `ok: true`.
Failed calls are retried twice. `--dry-run` writes one prompt to `prompts/dry.txt` without calling grok.

### Prompt rules and value pools

Each call samples a fresh subset of a built-in vocabulary (`value_pools.mjs`: file names,
multi-level dirs, extensions/languages, identifiers, error strings, log levels, TODO-like tags,
regexes, git authors/branches/revs, URLs/hosts, processes, ports, jq paths, sizes, ages, npm
scripts, counts), seeded by `--seed` and call index, and tells the model to draw values from it
(not src/docs/README/TODO by default). Each call also gets 4 required opening styles; "how many" /
"show" openings are capped at ~1 in 10. Request rules: grep only when the request names grep
(else rg); regex only when the request says regex/pattern-ish words or uses regex syntax (else
literal); never paste a command (at most ~1 in 10 requests name one flag); counting requests
say what is counted (lines / files / matches / occurrences) except deliberate ambiguous items;
`~/` paths stay unquoted.

## convert.mjs: items.jsonl -> converted.jsonl

`node scripts/ir/convert.mjs <dir>` decompiles each `ok` command, lifts every value back to a
span / norm / const against the request (`ir/lib/lift.js`), and runs the full gate with round-trip
(docs/IR.md §6). Status per item: `accepted | rejected | mismatch | decompile_error | not_ok`.

## dedup.mjs: converted.jsonl -> train/dev/test

```sh
node scripts/ir/dedup.mjs --name v1 [--cap 60] [--near 0.8] [--label-ratio 0.25] [--seed 1] \
  [--overlay build/ir/relabel/v1_overlay.jsonl] [--source-cap N] \
  build/ir/gen/haiku100k/converted.jsonl build/ir/grok/run10k/converted.jsonl=20000
```

`FILE=N` caps one source at N rows (after the status filter, seeded shuffle); `--source-cap N` is the
default for the others. `--overlay` applies `apply_relabel.mjs` output to non-ok rows matched by
normalized request (drop / relabel / replace with an accepted ok row). Sources earlier on the command
line win exact duplicates.

1. keeps `ok` items only when `status: accepted` (rejected / mismatch / decompile_error are
   dropped) and non-ok labels (no IR);
2. exact dedup on the normalized request (lowercase, collapsed spaces, trailing `.?!` stripped);
3. near-dup removal: MinHash (64 hashes, 16x4 LSH) over word 3-shingles, verified Jaccard >= `--near`, first kept;
4. per IR skeleton (IR body with span/norm offsets and literal strings removed) at most `--cap` ok items (deterministic shuffle first);
5. each non-ok label capped at `--label-ratio` x #ok;
6. split ~90/5/5: ok items by skeleton hash (dev/test skeletons never in train), non-ok by request hash.

Writes `build/ir/dataset/<name>/{train,dev,test}.jsonl` and `stats.json` (drop counts, overlay counts,
exact / near dups, capped counts, per label / split, per tool, per op, skeleton counts, and `per_source`:
read, ok acceptance, overlay hits, each drop stage, final rows per label).

## apply_relabel.mjs: relabel proposals -> dedup overlay

`node scripts/ir/apply_relabel.mjs [--changes build/ir/relabel/v1_changes.jsonl] [--out build/ir/relabel/v1_overlay.jsonl]`
combines `relabel_nonok.mjs` proposals per normalized request: any `flag` -> drop the row; `ok` with
gate `accepted` -> ok row with IR re-derived by decompile + lift + gate (not re-accepted -> drop);
non-ok -> non-ok only when the consistency pass and the model agree (else ignored); conflicts -> drop.

## build_v2.sh: one-command v2 build

`scripts/ir/build_v2.sh [--partial] [--name NAME]` converts each source generator dir (haiku100k, run10k,
haiku_v2_smoke, g46_v2_20k, haiku_v2_200k) whose `converted.jsonl` is missing or older than `items.jsonl`,
builds the relabel overlay, runs dedup (`--cap 80 --near 0.8 --overlay`), exports targets to
`build/ir/targets/<name>` and the 3 k-fold splits. A dir is complete when every planned call has an ok
usage line; incomplete dirs are skipped, or with `--partial` snapshotted into `<dir>_partial/` and
converted there (dataset name defaults to `v2pre`, else `v2`). Re-runs only redo stale conversions.

`--rewrite` (default for `--name v3*`) writes dedup output to `build/ir/dataset/<name>base` and runs
`gold_rewrite.mjs` (below) into `build/ir/dataset/<name>` before targets and k-fold: `scripts/ir/build_v2.sh --name v3`.

## gold_rewrite.mjs: gold rules, train adjudication overlay, gold lint (v3)

`node scripts/ir/gold_rewrite.mjs --in build/ir/dataset/v3base --out build/ir/dataset/v3 [--adj ADJ --kfold KFOLD]`
(docs/ir_error_taxonomy_v2.md F1/F2/F4/F7/F9/F10/M7). Deterministic IR rules on every split; a rewrite is kept only
when the gate accepts the new IR (strict), otherwise the row is unchanged and counted under `gate_rejected`:
- `files_find`: cue-less `files.list` (`rg --files`) -> `find D -type f` (`-maxdepth`, `-name` / `\( -name A -o ... \)`,
  `-not -name`, a wildcard-free extension-less `!dir` -> prune, `-0` -> `-print0`). Kept when the request names
  rg/ripgrep/search/gitignore/ignored or wants hidden files only;
- `drop_o`: `-o` before sort/uniq/freq/head removed when the request is about lines with no match/occurrence cue;
- `count_total`: a single-stage `-c` search over directory operands (or none) with no each/per/every-file cue -> `| wc -l`;
- `curl_head`: `-i` with a headers-only cue -> `-I`; `-I` with a headers-and-body cue -> `-i`;
- `scope_path`: a literal repo/project/workspace path after the/this/my/our -> dropped (cwd).

Adjudications (`build/ir/adjudicate/v2_kfold/adjudications.jsonl`, train ids only; dev/test are never touched): a
train row the judge called gold-wrong is replaced by the judge-approved k-fold pred IR (`build/ir/verifier/v2/kfold.jsonl`,
re-gated, same command) as an ok row, or dropped when no pred was judged right; rows with conflicting gold verdicts are
left alone. Rows are matched by normalized request. The lint (F10) counts retired conventions left after the rules
(cue-less `rg --files`, hidden-only `rg --files`, `-o` in a line pipeline, multi-line `git log | head`, curl `-I`/`-i`
against the cue, scope-word paths) and lists them in `OUT/lint.jsonl`. Counts per rule / split / label go to
`OUT/stats.json` (`gold_rewrite`). Tests: `ir/test/gold_rewrite.test.js`. The generator prompt (`grok_gen.mjs`,
"Conventions") asks for the same conventions in new generations.

## equiv.mjs: command equivalence key

`equivKey(command, request)` / `sameCommand(a, b, request)` treat equivalent spellings as one answer; used by
`eval_pred.mjs` (cmd_match, accepted-wrong, `--dump`, calibration) and the verifier pair scripts. Rules (see
the file header): `find -type f` vs plain find on file requests, `git log --oneline`, `rg -o | wc -l` ==
`--count-matches`, `curl -S` without `-s`, `tail -F` vs `-f` (no rotation cue), `rg|grep P FILE | wc -l` ==
`-c P FILE` for one file operand with only line-selecting flags, `sort F | uniq` == `sort -u F`, leading flag
order, combined boolean short flags (`-iF` == `-i -F` for rg/grep/ls/sort), and single quotes around words
without shell-special characters.

## adjudicate.mjs: LLM adjudication of gold disagreements

Gold (synthetic, Haiku-generated) has errors, and many `y = 0` candidates are equivalent spellings, so raw
accepted-wrong is noisy. `adjudicate.mjs` sends every `y = 0` candidate of a `make_candidates.mjs` file (plus an
optional random `--sample-agree N` of `y = 1` rows, to estimate false agreement) to the Anthropic Messages API
(default `claude-opus-5-5`, adaptive thinking, `--effort low`, JSON-schema output). Prediction and gold are shown
as A/B in a deterministic per-id random order and judged independently (`a_correct`, `b_correct`, `equivalent`,
`reason`); a refusal gold (label != ok) is shown as "decline", so the judge decides whether the request should be
answered at all. Only synthetic data: never point it at build/real or private data.

    zsh -ic 'node scripts/ir/adjudicate.mjs --cands build/ir/verifier/v1/cand_test.jsonl \
      --data build/ir/dataset/v1/test.jsonl --out build/ir/adjudicate/v1_test [--sample-agree 100] [--concurrency 16] [--limit N]'

Key from `CLAUDE_API_KEY` (or `ANTHROPIC_API_KEY`), workspace from `CLAUDE_WORKSPACE_ID` (`anthropic-workspace-id`);
never logged. 429/5xx are retried with backoff. `OUT/cache.jsonl` (keyed by id, command, gold, model) makes runs
resumable; `OUT/adjudications.jsonl` and `OUT/summary.json` (both_correct / pred_correct_gold_wrong / pred_wrong /
both_wrong, equivalent, cost) are rewritten each run. Pure helpers live in `adjudicate_lib.mjs`
(tests: `ir/test/adjudicate.test.js`).

`score_combined.mjs --adjudications DEV_ADJ,TEST_ADJ` counts a `y = 0` candidate as correct when its adjudication
(same id and command) says the prediction is correct, and reports `adj_wrong`, `adj_accepted_wrong_rate`,
`adj_accepted_wrong_ub95` next to the raw numbers (thresholds are still chosen on raw labels).

### Ensemble agreement

`score_combined.mjs --dev-agree P1,P2,... --test-agree P1,P2,...` takes other models' predictions for the same split
(e.g. `build/ir/runs/kfold_v2/fold{0,1,2}/preds_{dev,test}.jsonl`, produced by `ml/ir/run_ens_v2.bat`). Each accepted
candidate of the main model gets `agree` = the number of other models whose own gate-accepted command (same PD route
assembly) is `sameCommand`-equal to it (`combined_lib.mjs`). The report adds `agreement_settings` (chosen on dev: max
kept rows subject to UB / point accepted-wrong <= `--target`, at least `--min-kept`, over `min_agree in 0..N` x
verifier threshold) and per split `agreement.{by_upper_bound,by_point,sweep}`. Without `--dev-scores` the run is
agreement-only (gate + `min_agree`, no verifier). Tests: `ir/test/agreement.test.js`.

## N-best D routing (`nbest_lib.mjs`)

Preds written with `ml/ir/eval.py --nbest K` carry `d.nbest` (hypotheses, best first). `eval_pred.mjs`,
`make_candidates.mjs` and `score_combined.mjs` then take as the D candidate the **first gate-accepted hypothesis** in
rank order (no accepted hypothesis = abstain), and record:

- `rank`: its index in the beam (0 = the beam's best);
- `margin`: its score minus the score of the next lower-ranked hypothesis with a different command (sameCommand;
  rejected hypotheses count as different); 99 when there is none;
- `nb_agree` (beam agreement): softmax mass of the beam (over `logp + ptr_logp`) on hypotheses compiling to a
  sameCommand-equal command.

`eval_pred.mjs`: `--nbest-max-rank R` caps the rank; `d_nb_agree` / `d_nb_margin` join the D confidences for
`--calibrate`; `report.nbest.chosen_rank` is the rank histogram. `make_candidates.mjs` writes rank / margin / nb_agree
on D rows. `score_combined.mjs`: fixed knobs `--max-rank`, `--min-margin`, `--min-beam-agree` filter D candidates; when
dev has n-best candidates, `nbest_settings` is a dev-chosen (max_rank, min_agree, min_margin, t) setting (max kept,
UB / point accepted-wrong <= target) plus `by_coverage_{20,30,40,50}` (lowest dev UB at dev coverage >= floor), over
max_rank x ensemble min_agree x min_beam_agree x min_margin x t, applied unchanged to test (`<split>.nbest`, with the full
grid in `<split>.nbest.sweep`). `--select-adj` makes the dev choice count adjudicated wrong / correct; `unadjudicated_wrong`
counts kept raw-wrong candidates with no adjudication of that exact command. Gate results are memoized per (row, IR). Preds without `d.nbest` behave as
before. Tests: `node --test ir/test/nbest.test.js`.
