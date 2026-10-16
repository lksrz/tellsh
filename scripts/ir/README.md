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

Resumable: re-running with the same args skips calls whose usage line has `ok: true`.
Failed calls are retried twice. `--dry-run` writes one prompt to `prompts/dry.txt` without calling grok.
