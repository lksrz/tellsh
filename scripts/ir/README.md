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

## equiv.mjs: command equivalence key

`equivKey(command, request)` / `sameCommand(a, b, request)` treat equivalent spellings as one answer; used by
`eval_pred.mjs` (cmd_match, accepted-wrong, `--dump`, calibration) and the verifier pair scripts. Rules (see
the file header): `find -type f` vs plain find on file requests, `git log --oneline`, `rg -o | wc -l` ==
`--count-matches`, `curl -S` without `-s`, `tail -F` vs `-f` (no rotation cue), `rg|grep P FILE | wc -l` ==
`-c P FILE` for one file operand with only line-selecting flags, `sort F | uniq` == `sort -u F`, leading flag
order, combined boolean short flags (`-iF` == `-i -F` for rg/grep/ls/sort), and single quotes around words
without shell-special characters.
