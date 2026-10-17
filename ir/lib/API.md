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
  `positionalSpec(reg, tool, op, role)`, `valueActions(spec) -> {span, norms, consts}` (§4.5). A value spec's
  `consts` (any type) lists fixed values the model may emit as `{k:'const'}` without provenance (find
  `name_glob='.*'`, `min_depth` / `max_depth='1'`: the hidden-only listing; guarded by `strict_hidden.js`).
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

## Product semantics and scoring equivalence (taxonomy v2, `docs/ir_error_taxonomy_v2.md`)

- **File listing (F1).** `files.find` (`find … -type f`) is the file lister. `files.list` (`rg --files`) is opt-in:
  only for a gitignore cue (`IGNORED`) or an explicit rg / ripgrep request (the gate enforces it; the schema keeps
  `realization: default` only because rg is its sole realizer). `compile` adds `type=f` to a `files.find` exec that has
  no `type` (any name / time / size filters), when the request says "file(s)" and names no directories / folders / links / entries / everything / anything
  (`requestWantsFiles(request)`; `impliedFileType(ir, request)`, applied before `canon`, so `canonical` carries it,
  and the gate's round-trip reference applies it too).
- **git show names (v3).** `git.show` with `name_only` / `name_status` and no `oneline` derives `no_header`
  (`--format=`): `git show --name-only --format= REV --` prints only the file names. `git.log` derives the same `no_header` (`names_only_requested`) only when the request
  asks for just the file names ("only the file names", "just file names") and not for commits / history / per-commit
  output (`requestWantsNamesOnly(request)`); "names only" alone stays `git log --name-only` (headers kept).
- **git branch -vv (v3).** `very_verbose` (`-vv`, excl `verbose`); a tracking info / upstream cue needs it
  (`COVER_RULES` `branch_tracking`, not for "remote tracking branches").
- **Not done:** `wc -c < FILE` for a bare-number cue: the IR has no stdin redirection (decompile rejects `<`); v5 round 3 rejects `wc FILE` for that cue instead.
- **Count semantics (F4).** IR-level convention, not a compile rewrite (compile stays a pure function of the IR):
  "count (matching) lines" over a directory, glob, several paths or `-r` is one total, `search | file.count{lines}`
  (`rg P DIR | wc -l`); the `count` mod (`-c`, per-file counts) is for a single file operand or an each / per / every
  file cue. The gate and the gold relabel enforce it.
- **Implied `-o` (F7).** `only_matching` is implied before `wc -l` (`when: before:file.count.lines`: counting
  occurrences, gate-only) and under `match_cue` (`matchCueImpliesO(stage, next, request)`): a `text.search` with no
  `-l / -L / -c / --count-matches / context / -v / -m` feeding `sort` / `uniq` / freq when the request has a match cue
  (`MATCH_CUE`: matches, matched, occurrences, extract, each / every match) and no "line(s)"; or in any position on an
  only-matching cue (`ONLY_MATCH_CUE`: only / just the match(es) / matching / matched, print only matches; not "only
  matching files / lines"). `compile` adds it (`impliedOnlyMatching`, inside `impliedMods(ir, request)` with
  `impliedFileType`, before `canon`; the gate's round-trip reference uses `impliedMods` too), so a model need not emit
  `-o`. `head` and line pipelines ("lines with X | sort -u") keep the predicted IR. The schema validator accepts
  `before:op[.mod]` and `match_cue`; `strict.js` evaluates them. The strict COVER only-matching words count the implied
  `-o` as present. `gold_rewrite` `drop_o` never fires on an `ONLY_MATCH_CUE` request.
  "each / every (X) match" (`EACH_MATCH_CUE`; not "each matching line", "every line / file / rg match") implies `-o`
  in any position too, piped or not ("print each TODO match and its line number" -> `rg -o -n`).
- **Derived `--no-filename` (F8, v4).** `rg -I` / `grep -h` (`no_filename`, `derive: multi_file_sorted`): a first-stage
  `text.search` over several files (no path = cwd, a directory-like operand, a `-g` / `--include` glob, two or more
  paths) feeding `sort` / `uniq` / freq drops the `path:` prefix, so unique / counted matches are not per file. A single
  operand counts as a file when its basename has an extension, is a dotfile (not `.git`, `.github`, `.config`, ...) or
  a well-known bare file (Procfile, Makefile, syslog, ...). Not with `-l / -L / -c / --count-matches / -H` or when the
  request asks for file names / paths / which files / per file (`requestWantsFileNames`). Never in the IR: decompile
  strips it.
- **Taxonomy v4 round 3 (`docs/ir_error_taxonomy_v4.md` WP4).** Derived or request-implied only: no new predicted mod,
  so the v4 action vocabulary and checkpoints are unchanged (`scripts/ir/actions.mjs` skips non-`predict` mods).
  - `git log --merges` with `--name-only` / `--name-status` / `--stat` derives `diff_merges`
    (`--diff-merges=first-parent`, git ≥2.31; `derive: merges_with_file_lists`).
  - `ls -a` (`all`, `derive: all_entries_requested`, `requestWantsAllEntries(request, paths)`): ". and ..", "all /
    every entries", "dot entries", or "all of DIR" right before a path operand (not "all of the DIR files"); never with
    a predicted `hidden` (`-A`).
  - A literal cue (`LITERAL_CUE`: literal(ly), fixed string(s), verbatim, not (as a) regex) makes the derived
    `fixed_strings` hold without a metacharacter: `rg -F` / `grep -F` / `git log -F --grep=`.
  - `impliedLangExts(ir, request)` (in `impliedMods`): an `ext_glob` norm of a multi-extension language
    (`normalizers.js` `LANG_EXTRA`: elixir -> `exs`) appends the other globs as literals (find `name_glob` becomes
    `any_name`: `\( -name '*.ex' -o -name '*.exs' \)`). `lexicon.js` `langExts(w)` lists every extension of a word;
    `langWordAt` reads a template extension (j2, jinja, twig, tpl, erb, haml, svelte) before "template(s)".
  - jq's path operand has a validator: a URL (`scheme://`) is invalid (fetch it with curl and pipe).
  - Implied `when` tokens `with:mod` / `not:a!b` (exec-local; `schemas.js` `impliedModTokenHolds`). Planned for curl
    `silent` (`["piped", "not:fail!show_error"]`, fix 20) once `strict.js` `impliedHolds` evaluates them; curl.json
    still says `always`.
- **v5 round (`docs/ir_error_taxonomy_v5.md`).** Request-implied only, no new predicted mod:
  - `impliedOneline(ir, request)` (in `impliedMods`): an unpiped last-stage `git.log` gets `--oneline` when the
    request says the plural "commits" (`requestImpliesOneline`: no singular "last / latest / most recent / that / this
    commit", no full-log (full / complete / entire / whole / body ...) / author / date cue) and the log has no
    oneline / format / stat / patch / name list / graph / `--date` mod.
  - `requestWantsFileNames` ignores negated mentions (`DROP_NAMES_CUE`: "drop / without / no the file names"; file
    name wording only, "skip paths" is scope), so the
    derived `no_filename` holds for them.
  - `DOT_DIRS` and `BARE_FILES` are exported (used by `strict_v5.js`).
- **v5 round 3 (dev4, `docs/ir_error_taxonomy_v5.md` "v5 round 3").** Derived / request-implied only:
  - `no_filename` (`multi_file_sorted`) also holds for "nothing else" / "only the matched text" / "just the matches"
    over a multi-file search in any position, not on stdin (`bareMatchesMultiFile(paths, values, request)`).
  - `impliedFileType` adds `type=f` also when every `name_glob` / `any_name` value is file-like (has an extension;
    `namesAreFileLike(exec, request)`) and the request mentions no dir / directory / folder.
  - `names_only_requested` (`no_header`, `--format=`) also holds for an unpiped `git.log` when
    `requestWantsNamesOnlyR3(request)`: just / only the file names, commits mentioned or not, no per-commit grouping.
  - Gate rejects in `strict_v5r3.js`: `[oneline_date]`, `[wc_bare_number]`, `[name_contains]` for a bare-name prune.
- **Decline pre-check (v4, `decline.js` `declineObligations`).** Called from `obligations()` before `strictObligations`:
  (a) a dangling last word ("compared to", "containing", "by author", "with", "for", "of"; not after a mode word such
  as "case-sensitive matching") and (b) a definite generic noun with no value ("the deprecated helper", "that commit",
  "the hook" taken as the pattern, "in there"), (c) a placeholder as the whole pattern / jq field (`text`, `something`,
  `.nth`, lowercase only) and (e) a bare `upstream` rev with no remote word give `underspecified` (label
  `underspecified`); (d) a free recency phrase ("this week", "since yesterday", "last 3 days") with no
  since / until / mtime / newer mod and (f) "In DIR, download ..." with no value in DIR give `dropped_value`; (g) a
  permission filter (executable, writable, perms, setuid) with `files.find`, free or taken as a name, gives
  `uncovered_content`. `env.declineOff` (comma list of `DECLINE_RULES`) switches rules off for measurement.
  Gold false declines (v4): train 10 / 51,306 ok rows (0.02%), dev 0 / 3,708.
- **Strict cover (v4).** `find_any_type`: "anything / everything named / called / matching / with ..., any / every
  entry" rejects an explicit `-type f` unless the request also says file(s) / regular or the find has a size filter.
  `wc_units`: every wc unit named in a list ("word and line counts", "words, lines and bytes") or as "<unit>
  count(s)" needs its flag (bytes / chars accept `-c` or `-m`).
- **Scoring equivalence (F3)** — `scripts/ir/equiv.mjs` `equivKey(cmd, request)` / `sameCommand(a, b, request)`; the
  rule list is in the file header. Request-sensitive: curl `-s` / `-S` (quiet / show-errors cues), `ls -1` ("one per
  line"), `find -type f` (kept when `requestWantsFiles(request)`, the same test compile uses). Not merged on purpose:
  `find -exec rg -H` vs `rg -g` (one canonical form instead), `jq -r` on non-numeric output, `git log --oneline` when
  piped (head / wc / grep see a different line shape), `ls -1` on a tty without `-l`.

## Strict cue coverage and value shapes — `strict_cover.js`, `strict_values.js` (gate step 3, agent B)

Called at the end of `strictObligations` (strict.js); tuned on train gold (dataset v2), see
`docs/ir_error_taxonomy_v2.md` F1/F5/F6/F8/F13.

- `coverObligations(cx)` (strict_cover.js):
  - **F1** `files_list`: `files.list` (`rg --files`) is rejected unless an IGNORED cue or the words
    rg / ripgrep / gitignore / ignored / respect(ing) occur — a plain file listing is `find -type f`.
  - **F5** `COVER_RULES` (exported table; fields `id, words, when, need, forbid, unless`; keys `op`,
    `op.mod`, `op.mod=const`): a free cue needs one `need` key and no `forbid` key. Covers uniq -d/-u
    (and "collapse" forbids them), sort -n, wc word/byte/char flags, git log format (hash+subject,
    subject only, fuller, author/date forbids one-line formats), --date relative/iso, --until, -p,
    --stat, --name-only, diff --staged, --decorate, --graph, git show vs/against (→ diff), git status
    -s/-b/--porcelain, git branch --show-current, ls -1/-R/-d (and "contents" forbids -d), find
    -type l/-empty/-mindepth, curl -s/-S/-f/-i/-I, jq -r. Reason suffix `[rule id]`.
  - git branch: "remote branches" without an all/local cue forbids `-a`; an all/local cue (and no
    "nothing local") forbids `-r` alone.
  - find: directories/folders as the listed noun (not after a preposition, no file noun) need `-type d`.
  - anchors: a free "ends with" before a pattern span needs `$` and no `^`; "starts with" must not get
    only `$`; a starts_with/ends_with norm over the opposite cue is rejected.
- `valueObligations(cx)` (strict_values.js):
  - **F6** paths: `,`/`;`, scope words (current, cwd, pwd, top-level, across, machine, readable,
    printing), repo/project after the/this/my/our or before "root" (non-git ops; git ops already reject
    them), a ref word after on/from/branch on git ops. rev/packages/script/author: filler, git nouns,
    scope words and generic words (changes, files, all, latest, ...) are rejected; a rev that is a known
    English word and not ref-shaped (`REF_SHAPE`: feat|fix|chore|refactor/…, sha, HEAD~n, v1…, contains
    `/~^.@`, main/develop/…) is rejected unless next to branch/tag/ref. `--author` keeping `'s`;
    trailing `,;!?` on path/rev/author/package/script. A filter-stage search whose pattern is request
    wording (lines, output, files, commits, …). Function words as name/glob/exclude values.
  - **F8** an exclude_dir with a file extension; a known directory (node_modules, vendor, .git, …) as
    find/grep `-not -name`/`--exclude` (rg `-g '!dir'` is fine); a bare extension as a name/exclude
    glob; a single literal file as grep `--include` over `.` (unless each/every/all/any).
  - **F13** (conservative): "this file", "that file", "that dir/folder/directory", "the file I", "the
    one I" with no path value → `scope` reject.
- strict.js `impliedHolds` also accepts `before:op[.mod]` (the next stage's op/mod), mirroring `after:`.
- obligations.js: a HIDDEN cue is explained by `files.find` (find lists hidden entries by default). A mod whose
  values are all fixed schema `consts` adds no cue element.
- `hiddenObligations(cx)` (strict_hidden.js, reason prefix `hidden:`): a hidden-only cue (`hiddenOnlyCue`: hidden
  files / entries / dirs, only hidden, dotfiles, dot files — free words; no including / include / with / also /
  plus / as well / all / too / every… and no skip / without / excluding / not / visible) rejects a first-stage
  `ls -a/-A`, `rg --files --hidden` and a `find` without a dot name glob. The fixed `name_glob='.*'` needs that cue;
  fixed depths need the dot name, `max_depth=1` needs `min_depth=1` and no recursion cue (under / recursively / …).
  The hidden-only form is `find X -mindepth 1 [-maxdepth 1] [-type f|d] -name '.*'`; gold rewrite `hidden_only`
  (scripts/ir/gold_rewrite.mjs) maps ls -A [-1] [-R] / rg --files --hidden gold to it.
