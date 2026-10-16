# ir/lib API (typed-IR pilot)

Design: `docs/IR.md` (authoritative). Plain ESM, Node >= 20, no dependencies. Import from
`ir/lib/index.js`. Tests: `node --test ir/test/`.

## Data model — `ir.js` (§1)

- Constructors: `program(body, {cwd})`, `abstain(status, {reason, missing})`, `and(...pipes)`,
  `pipe(...stages)`, `exec(op, {pin, mods, args, stderr})`, `each(exec)`, `freq(paths?)`,
  `mod(id, values?)`, `span(u0, u1, as, pkind?)`, `norm(kind, u0, u1)`, `cnst(id)`.
- `lit(s, pkind?)` — canonical value `{k:'lit', s, pkind?}`: produced by `canon` and `decompile`
  only (provenance replaced by the value string). `pkind` is kept on Pattern values only.
- `validateShape(ir) -> string[]` (structure + limits, no schema knowledge),
  `fromJSON(strOrObj) -> ir` (throws `IRError`), `toJSON(ir) -> string` (sorted keys,
  deterministic), `equals(a, b)`, `execs(ir)` generator of `{exec, part, stage, position}` with
  position `'first' | 'filter' | 'each'`.
- Enums: `STATUSES`, `MODEL_ABSTAIN`, `LABELS` (`ok ambiguous underspecified out_of_scope not_shell`),
  `GATE_VERDICTS`, `OOS_REASONS`, `VTYPES`, `NORM_KINDS` (18), `PKINDS`, `LIMITS`.
- `IRError(message, {label, path})` — `label` is the abstention it maps to (default `gate_reject`).

## Schemas — `schemas.js` (§2, §3, §5.2)

- `loadSchemas(dir?, {strict = true}) -> registry` (strict throws `SchemaError` with `.problems`
  `[{file, path, msg}]`); `{strict:false}` returns `{registry, problems}`. `validateSchema(obj, file)`.
- `registry = {tools, ops: {opId: {toolId: opSchema}}, mods: Set, cues: {CUE: [{tool, op, mod}]},
  hash (sha256 of the schema files), stats}`. Option specs carry a hidden `_index` (= canonical
  render order; also `optionIndex(spec)`).
- Lookups: `opSchema(reg, tool, op)`, `optionSpec(reg, tool, op, mod)`,
  `positionalSpec(reg, tool, op, role)`, `valueActions(spec) -> {span, norms, consts}` (§4.5).
- `realize(reg, exec, position) -> {tool} | {error, label}` (§5.2; env availability, e.g. rg
  missing -> `env_unsupported`, is the compiler's/gate's job).
- Streams: `stdoutOf(opSchema, modIds, input)`, `acceptsStream(opSchema, stream)`,
  `pipeIllegal(stream, consumerOp, {hasFileOperands, consumerMods}) -> null | reason`,
  `eachIllegal(producerOp, producerStream, innerOp, innerMods) -> null | reason`,
  `effectsOf(opSchema, modIds)`. Constants `STREAMS`, `EFFECTS`, `CUE_CLASSES`, `TYPE_ACTIONS`.

## Units, normalizers, canon

- `segment(request) -> {text (NFC), units: [{s, e, t}]}`; `spanText(seg, [a, b])` (one pair of
  enclosing quotes trimmed) — §4.1.
- `NORM[kind](text, ctx)` / `normalize(kind, text, ctx)` ->
  `{ok:true, value, pkind?} | {ok:false, label:'gate_reject'|'ambiguous', reason}`;
  `ctx = {dialect, range, request, pathExists}`. `escapeRegex(s, dialect)`, `hasRegexMeta(s)`.
  Values: `size` = bytes as a string (the template adds `c`); `home_path` values start with `~`
  (render as tilde_prefix); `signal` returns the const id.
- `canon(ir, {schemas, request?, seg?, pathExists?}) -> canonical IR` (§5.1). Throws `IRError`
  (label from the failing normalizer, or `gate_reject`). Idempotent; accepts `lit` values.

## To implement (stubs throw `not implemented`)

Shared `env`:

```js
env = {
  schemas,                       // registry from loadSchemas()
  shell: 'bash' | 'zsh',
  platform: 'linux_gnu' | 'darwin_bsd',
  tools?: { [binary]: version }, // installed tools (absent key = not installed)
  request?: string,              // needed to resolve span/norm values
  pathExists?(p), isDir?(p), gitTop?: string, cwd?: string,
}
```

- `compile(ir, env) -> {plan, text, canonical} | {error, label}` — `compile.js`, §5. Pure. Runs `canon`
  first. `plan` is the ArgvPlan: `{cwd?: string, parts: [{stages: [{argv: Word[], stderr?:
  'discard'|'merge'}]}]}`, `Word = {text, kind: 'literal' | 'tilde_prefix' | 'raw', prefix?,
  quote?, render?}` (`raw` = compiler syntax words; for raw words `text` is the argv string and
  `render` its shell spelling, e.g. text `(` render `\(`; `prefix` = the bare head of an eq/attached
  word, e.g. `--sort=`; `quote: 'always'` forces quoting). `canonical` is the canonical IR compiled.
  `quote`, `renderWord`, `renderPlan` are exported too (`compile.js` also exports `BARE_WORD`,
  `UNSAFE_CHARS`, `COMPILER_VERSION`). `text` is the rendered command
  (bash and zsh: identical bytes). `label` is one of `unsafe_value`, `env_unsupported`,
  `gate_reject`.
- `decompile(text, env) -> {ir} | {error, reason}` (`reason` one of `OOS_REASONS`) — `decompile.js`, §5.5. Strict tokenizer + schema
  getopt; returns a canonical IR (`lit` values, `pkind` recovered, derived/compiler mods stripped)
  such that `equals(decompile(compile(x).text).ir, canon(x))`.
- `gate(request, ir, env) -> {accept, label, risk, reasons, obligations}` — `gate.js`, §6.
  `accept: boolean`; `label`: `ok` when accepted, else one of `LABELS` or a gate verdict
  (`gate_reject`, `unsafe_value`, `env_unsupported`, `ambiguous`); `risk`: `safe | medium | high |
  deny`; `reasons: string[]`; `obligations: [{check, ok, detail}]` (§6.3). An accepted result
  should also carry `command` (compiled text) and `gloss`.

## Accountability — `accountability.js` (gate step 3, after `strict.js`)

Every free (unconsumed) content word of the request must be accounted for by the accepted IR, or the gate
rejects with `uncovered_content: "<word>", ...` (label `gate_reject`). A word is accounted for when it is:

- inside a copied / normalized value span, or a cue phrase of the cue lexicon (`findCues`);
- echoed by a value (`ids` next to `ids.txt`, `history` next to `~/.zsh_history`), or the one word right
  after a named value (head noun: "the metro **bundler**", not after regex / non-identifier patterns);
- a closed-lexicon word, a product name (`PRODUCT_NAMES`), a typo of a known word, or one of `GENERIC`
  (request wording that asks for nothing by itself; tuned on train gold).

Uncovered: an unknown content word (`zod`, `accounts`), a known word that names a thing (`CONTENT_WORDS`:
`src`, `lib`, `fuzz`, ...), a file type listed next to globbed ones but used by no value (`png jpg or gif`
with `*.png`, `*.gif`), a bare path / rev that is request wording (`working tree`), and a cue word whose
element is absent (`CUE_KEYS`: `porcelain` / `machine-readable` without `--porcelain`, `history` without
`git log` / `git show`, `whose names` with a content search). This replaces the one-unknown-word tolerance
of the coverage check (`MAX_UNKNOWN`) for accepted IR.

Gold false-reject rate (gold IR of ok rows, h8b eval, Oct 2026): train 190 / 25360 (0.75%), dev 12 / 1976
(0.61%), test 8 / 851 (0.94%).
