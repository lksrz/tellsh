# tellsh System 1: typed command IR and deterministic compiler (pilot design)

Status: design for the EN pilot, bash/zsh first. Machine-readable tool schemas live in
`ir/schemas/<tool>.json` and follow the format defined in §2. Nothing in this document changes
today's runtime (A + S, 0.3.11). The IR path is additive until §9's migration steps say otherwise.

**Basis.** Three drafts and two judge reviews (consultations `c2`/`c3`): gate and compiler
(invariants, ArgvPlan, `each` over NUL paths, two-way obligations, dialect-checked regexes, PATH-shim
harness, effect-derived risk); model encoding (word-level pointer units, biaffine span, heads-only
fast path, per-route × tier calibration); data and scope (abstract ops, global mods, `freq`, stderr
merge, reverse parser as coverage meter, minimal pairs, rule-growth accounting). Reference
implementation: `ir/lib/*.js` (tests `node --test ir/test/`); data pipeline §10.1.

**Explicitly rejected:** parseable placeholder commands (in bash/zsh `rg <PATTERN> app.log`
truncates `app.log`); inexact canonical folds (`git log | head -n N` → `-n N`); silently swapping
rg for grep on option-id parity; `xargs -d '\n'`; hard cue masks in the decoder; a second learned
verifier (gloss entailment) in the pilot; model-emitted `ambiguous` labels.

## 0. Invariants (every other rule serves these)

1. **The model points; code computes.** The model never emits a character of a value. A value is a
   copied request span, an approved normalizer's output (recomputed by the gate from its source
   span) or a schema constant.
2. **Only the compiler knows shell syntax.** IR values are raw strings. Flag spellings, `--`, `-0`,
   `-print0`, `{} +`, quoting and option order are all produced by the compiler.
3. **Risk is a pure function of the compiled IR's effects.** No model output and no code path
   lowers it. `danger.js` runs on the rendered string afterwards and can only raise risk.
4. **One gate serves every route:** A (catalog), P (heads) and D (decoder). The gate re-validates
   everything and does not trust the decoder's grammar mask.
5. **Abstaining is a correct answer.** Anything outside the IR's expressivity is out of scope and
   is never approximated. Abstention never renders a command.
6. **Round-trip holds at runtime:** `decompile(render(IR)) == canon(IR)` for every accepted answer,
   not only in tests.
7. **Generated-path answers never auto-run**, whatever their risk.
8. **A first stage never reads stdin.** A rendered command behaves the same in a terminal, under
   an agent, or with stdin redirected.

## 1. IR data model

```ts
type Program =
  | { v: 1; status: "ok"; cwd?: Value /*Path*/; body: AndChain }
  | { v: 1; status: ModelAbstain; reason?: OosReason; missing?: Role[] };

type ModelAbstain = "not_shell" | "out_of_scope" | "underspecified";       // model-emittable
type GateVerdict  = "accept" | "ambiguous" | "gate_reject" | "unsafe_value"
                  | "env_unsupported" | "low_confidence" | "disagree";      // gate-only, never trained
type OosReason = "tool_unsupported" | "embedded_program" | "control_flow"
               | "write_effect" | "privileged" | "unsupported_construct";

type AndChain = { k: "and";  parts: Pipe[] };        // 1..3 parts, joined by " && " only
type Pipe     = { k: "pipe"; stages: Stage[] };      // 1..4 IR stages; ≤6 real commands after macros
type Stage    = Exec | Each | Macro;

type Exec = {
  k: "exec";
  op: OpId;                    // abstract op, e.g. "text.search", "git.log", "file.tail"
  pin?: ToolId;                // set ONLY when the request names the tool ("use grep", "with rg")
  mods: ModInst[];             // a set; canonical order = the realized tool's schema order
  args: Partial<Record<Role, Value[]>>;    // named positionals: pattern, paths, rev, url, ... (every Path role is `paths`)
  stderr?: "discard" | "merge";            // 2>/dev/null | 2>&1; only where the op schema allows it
};
type Each  = { k: "each";  exec: Exec };   // batch-apply exec to the previous stage's paths (§3)
type Macro = { k: "macro"; id: "freq"; args?: { paths?: Value[] } };  // sort [FILE] | uniq -c | sort -rn; cap 10, pilot ships 1
type ModInst = { mod: ModId; values?: Value[] };

type Value =
  | { k: "span";  u: [number, number]; as: VType;        // half-open range of pointer units (§4.1)
      pkind?: "literal" | "regex" }                      // Pattern only; set by the gate, never by the model
  | { k: "norm";  kind: NormKind; u: [number, number] }  // value = NORM[kind](text(u)), gate recomputes
  | { k: "const"; id: ConstId };                         // closed enum from the schema

type VType = "Pattern" | "Path" | "Glob" | "Name" | "Rev" | "Url" | "ScriptName"
           | "ProcName" | "JqPath" | "Int" | "Size" | "Port" | "Date" | "LineRange";
```

Decisions:

- **Abstract ops, with pinning.** The model predicts `text.search`, not `rg`.
  - `pin` is set only when the request names a tool. A teacher-written request that says "grep for
    X" counts as pinning grep, because the word `grep` is in the tool-name lexicon.
  - Realization is deterministic and never silent; see §5.2.
- **Pattern kind is not a model output.** The gate sets `pkind` on every Pattern value before
  compiling; it is `literal` unless (1) the value comes from `starts_with`/`ends_with`, or (2) the
  request carries a REGEX cue ("regex", "regexp", "regular expression"). `pkind` is part of the IR,
  so `compile` stays a pure function of its inputs, and of `canon(IR)`.

  The compiler derives `-F` (literal with a metacharacter) and `-E` (regex: grep, git log) from
  `pkind`; the decompiler recovers `pkind` from them. Dialects: Rust regex for rg; a **strict
  POSIX-ERE checker** for grep `-E` and git `-E`, which rejects every backslash escape outside the
  POSIX set (`\. \[ \] \( \) \* \+ \? \{ \} \| \^ \$ \\`) and every GNU extension (`\w \b \s \d \<
  \>`, back-references), because GNU and BSD disagree on them. BRE is never used. A regex that
  fails gives `unsafe_value`; it never falls back to `-F`. `escape(X)` is defined per realized
  dialect (Rust: `regex::escape`; ERE: the POSIX set above).
- **No `Redirect` node.** Writing redirects (`>`, `>>`, `tee`) are out of the pilot. `stderr` is a
  stage attribute: `discard` is allowed for find/ls, and `merge` for npm run/test, which covers
  the `npm test 2>&1 | tail -n 20` idiom.
- **`cwd` is program scope**, rendered as `cd ./X && …` for a relative X (`./` blocks `cd -`,
  leading dashes and CDPATH lookup, which would also print to stdout). It must exist as a directory
  (env check, every risk tier). It costs one action plus one span.
- **No `;`, `||`, `&`, `$(…)`, variables, loops or subshells.**
- **`canon(IR)`** (`ir/lib/canon.js`) is exact by construction and idempotent. It does five things:
  1. sorts mods into schema order;
  2. dedupes repeated values and mods, and drops a first-stage `paths` equal to the op's
     `first_stage_operands` (`rg foo .` == `rg foo`; the compiler adds `.` itself);
  3. replaces provenance with value strings (keeping `pkind`; a missing `pkind` is `literal`). It
     fixes spellings the renderer prints identically: a leading `./` of `cwd` is dropped (`cd ./X`
     is how every cwd renders), and so is a `./` before a find root that needs `dot_slash`
     (`./-x`, `./(`: the compiler adds it back);
  4. collapses mods declared `same_argv_as` in the realized tool. For example, rg renders
     `exclude_dir` and `exclude_glob` identically as `-g '!X'`;
  5. sets `pkind = literal` on a regex pattern without metacharacters (they match identically).

  It contains **no semantic rewrites**: `git log | head -n 20` stays a two-stage pipe.

## 2. Tool schema format

One JSON file per tool. The same file compiles into the decoder's grammar automaton, the forward
renderer, the reverse parser (decompiler and coverage meter), the sampler's legality filter and the
gate's validators. Option entries are listed in **canonical render order**.

```ts
type ToolSchema = {
  schema_version: 1;
  tool: ToolId; binary: string;
  versions: { min?: string; notes?: string[] };
  platforms: { linux_gnu: "ok" | "absent"; darwin_bsd: "ok" | "absent"; notes?: string[] };
  cluster_short?: boolean;          // render predicted boolean short flags as one cluster (ls only)
  ops: Record<OpId, OpSchema>;      // the abstract ops this tool realizes
};
type OpSchema = {
  realization: "default" | "pinned" | "stdin_filter" | ("default" | "pinned" | "stdin_filter")[];
  argv_prefix: string[];            // subcommand / fixed argv: ["log"], ["aux"], ["-n"], ["-nP"]
  gloss: string;                    // deterministic EN template shown to the user
  effects: Effect[];
  stdin: { accepts: Stream[]; when: "never" | "no_file_operands" };
  stdout: Stream | "input";         // "input" = type-preserving filter (head, tail, sort, grep on stdin)
  stdout_when?: { mods: ModId[]; stdout: Stream }[];       // e.g. files_with_matches -> paths
  nul?: { mod: ModId };             // compiler-only mod that turns paths into paths0 (for `each`)
  no_operands: "cwd" | "stdin" | "error" | "nothing";      // behaviour with zero operands (xargs!)
  first_stage_operands?: string[];  // rendered when a first stage has none: rg/grep/find -> ["."]
  layout?: "operands_first";        // find: positionals (roots) before all options (§5.3)
  each_ok?: true;                   // may be an `each` inner (§3); absent = forbidden
  stderr?: ("discard" | "merge")[];
  positionals: Positional[];
  options: OptionSpec[];            // canonical order
  rules?: Rule[];
  excluded?: string[];              // real flags deliberately outside the pilot, with reason
  notes?: string[];
};
type Positional = {
  role: Role; type: VType; arity: [number, number];
  leading_dash: "eoo" | "dash_e" | "dot_slash" | "reject";  // how a '-'-initial value is protected
  always_eoo?: boolean;             // git paths: always preceded by "--"
  eoo_after?: boolean;              // git rev: a present rev is always followed by "--"
  multi?: "dash_e";                 // >1 value: every value is rendered "-e V" (rg, grep patterns)
  norms?: NormKind[];               // allowed value actions; default by type (§4.5)
  template?: string;                // only Int/Const/LineRange values may use templates
  quote?: "always";                 // sed script, jq filter
  dialect?: "rust_regex" | "posix_ere" | "posix_bre";
  validator?: string;               // regex the value must match (Rev, ScriptName, ProcName, Url…)
  note?: string;
};
type OptionSpec = {
  mod: ModId;                       // global modifier id (§2.3)
  flag?: string | string[];         // "-i", "--hidden", ["-not", "-name"]
  form: "bool" | "sep" | "eq" | "attached" | "word" | "group" | "none";
  //   sep: -n 5 | eq: --since=VALUE | attached: -iTCP:3000, -KILL | word: standalone word ('120,160p')
  //   group: find prune / or-groups | none: modifies another option's flag (find ignore_case -> -iname)
  value?: { type: VType | "Const"; range?: [number, number]; enum?: Record<string, string>;
            repeat?: [number, number]; prefix?: string; template?: string; quote?: "always";
            validator?: string; dialect?: string;
            norms?: NormKind[];                          // allowed value actions (§4.5)
            enum_cue?: Record<string, CueClass> };       // pkill: KILL carries cue FORCE
  model: "predict" | "derived" | "compiler";   // derived/compiler mods are never decoder actions
  derive?: string;                  // rule name, e.g. "pattern_literal_with_meta"
  cue?: CueClass;                   // two-way cue obligation (§6.3)
  polarity?: "neg"; direction?: "first" | "last";
  alt_flag_when?: { mod: ModId; flag: string };          // name_glob + ignore_case -> -iname
  group?: { kind: "prune" | "or" };                      // find: -type d (-name A [-o …]) -prune -o / \( … -o … \)
  same_argv_as?: ModId;             // canon collapses this mod into that one for this tool
  effects_add?: Effect[]; stdout?: Stream;
  platform?: { linux_gnu?: "absent" | { flag: string }; darwin_bsd?: "absent" | { flag: string } };
  min_version?: string; note?: string;
};
type Rule =
  | { excl: ModId[] }                                   // at most one of these
  | { requires: ModId; any_of: ModId[] }                // if requires is present, one of any_of is too
  | { required: ModId[] }                               // at least one of these must be present
  | { role_count: Role; when: ModId; arity: [number, number] }   // e.g. --follow needs exactly 1 path
  | { excl_role: ModId; role: Role }                    // e.g. --all forbids a rev
  | { min_values: ModId; when: ModId; min: number }     // e.g. --all-match needs ≥2 --grep values
  | { stdin_excl: ModId[] }                             // illegal when the op reads stdin (rg/grep -l/-L/-H)
  | { no_range_multi: Role };                           // with 2 values of this role, neither contains ".."
```

Effects: `read_fs`, `list_fs`, `read_vcs`, `read_proc`, `pure`, `net_read`, `exec_project`,
`write_fs`, `signal_proc`. Streams: `none`, `lines`, `paths`, `paths0`, `json`, `bytes`, `endless`.
**Value forms supplied by the schema** (`-mtime -2`, `+1024c`, `--sort=-committerdate`) may start
with `-`. Copied values are always protected by the ArgvPlan (§5.3).

### 2.1 Full schema: `rg` (op `text.search`; file `ir/schemas/rg.json`)

| Property | Value |
|---|---|
| min version | 13.0 |
| realization | `default` for `text.search` when not pinned to grep and not a stdin filter |
| argv | `rg [opts] PATTERN [PATH...]` |
| effects | `read_fs` |
| no_operands | `stdin` |
| first_stage_operands | `["."]` (invariant 8) |
| stdin | accepted only when it is not the first stage and has no paths |
| stdout | `lines`; `files_with_matches`/`files_without_match` → `paths`; plus compiler `null` → `paths0` |
| positionals | `pattern` (Pattern, 1..4, dialect `rust_regex`, leading dash → `-e`, `multi: dash_e`); `paths` (Path, 0..8, leading dash → `--`) |
| each_ok | yes (inner rendered with `-H`, patterns as `-e P`, then `--`) |

| # | mod | flag | value | model | rules / notes |
|---|---|---|---|---|---|
| 1 | fixed_strings | `-F` | | derived | `pkind` literal and the pattern contains a regex metacharacter |
| 2 | ignore_case | `-i` | | predict | cue CASE; excl smart_case, case_sensitive |
| 3 | smart_case | `-S` | | predict | cue CASE |
| 4 | case_sensitive | `-s` | | predict | cue CASE |
| 5 | word | `-w` | | predict | cue WORD; excl line_regexp |
| 6 | line_regexp | `-x` | | predict | cue WHOLE_LINE |
| 7 | invert | `-v` | | predict | polarity neg; excl files_with_matches, only_matching, count_matches |
| 8 | files_with_matches | `-l` | | predict | stdout `paths`; excl count, count_matches, only_matching, context* |
| 9 | files_without_match | `--files-without-match` | | predict | polarity neg; stdout `paths` |
| 10 | count | `-c` | | predict | cue COUNT; matching lines per file |
| 11 | count_matches | `--count-matches` | | predict | cue COUNT; excl count |
| 12 | only_matching | `-o` | | predict | |
| 13 | line_number | `-n` | | predict | cue LINE_NUMBERS (rg numbers lines only on a tty, so it is rendered when asked); `stdin_excl` also covers `-l`, `--files-without-match`, `-H` |
| 14 | no_line_number | `-N` | | predict | excl line_number |
| 15 | with_filename | `-H` | | compiler | set when the stage is the inner exec of `each` |
| 16 | max_count | `-m` | Int 1..10^6 | predict | cue LIMIT; **per file**: a global "first N" is `\| head -n N` |
| 17 | context | `-C` | Int 0..1000 | predict | cue CONTEXT; excl before, after |
| 18 | before | `-B` | Int 0..1000 | predict | cue CONTEXT |
| 19 | after | `-A` | Int 0..1000 | predict | cue CONTEXT |
| 20 | name_glob | `-g` | Glob ×1..8, always quoted, must not start with `!` | predict | |
| 21 | exclude_glob | `-g` | Glob ×1..8, prefix `!` | predict | polarity neg |
| 22 | exclude_dir | `-g` | Name ×1..8 (no `*?[]{}/!`), prefix `!` | predict | polarity neg; `same_argv_as` exclude_glob (also excludes a *file* with that exact name; noted in the gloss) |
| 23 | hidden | `--hidden` | | predict | cue HIDDEN |
| 24 | no_ignore | `--no-ignore` | | predict | cue IGNORED |
| 25 | follow_links | `-L` | | predict | cue FOLLOW_LINKS |
| 26 | max_depth | `--max-depth` | Int 0..64, norms `int`, `scope_top` | predict | cue SCOPE_TOP; `-d` is avoided |
| 27 | line_buffered | `--line-buffered` | | derived | endless input and piped stdout |
| 28 | null | `-0` | | compiler | requires files_with_matches; stdout `paths0` |

Excluded from the pilot: `-P` (PCRE2 depends on the build), `-U`/`--multiline`, `-r/--replace`
(rewrites output), `--pre` (executes programs), `--json`, `-z`, and `-t/-T` (type sets differ from
extension globs; `-g` with `ext_glob` is the single canonical form).

A second op, `files.list` (`rg --files`), takes `name_glob`, `exclude_glob`, `exclude_dir`,
`hidden`, `no_ignore`, `max_depth` and `null`. Its stdout is `paths`.

Version notes: in rg 13 and 14, `-g '!x'` follows gitignore semantics, so a pattern without a
slash matches the basename at any depth. All listed flags exist in rg ≥ 13 on linux and darwin.

### 2.2 Full schema: `git log` (op `git.log`; file `ir/schemas/git.json`)

| Property | Value |
|---|---|
| min version | git 2.20 |
| argv | `git log [opts] [REV] [-- [PATH...]]`; `--` is rendered whenever a rev or a path is present |
| effects | `read_vcs` |
| stdin | `never` |
| stdout | `lines` |
| env check | inside a work tree |
| positionals | `rev` (Rev or Rev range, 0..1, validator `^[A-Za-z0-9._/@^~][A-Za-z0-9._/@^~-]*(\.\.\.?[A-Za-z0-9._/@^~][A-Za-z0-9._/@^~-]*)?$` — no lookahead, so Rust `regex` can run it — `eoo_after`); `paths` (Path 0..8, `always_eoo`) |

| # | mod | flag | value | notes |
|---|---|---|---|---|
| 1 | oneline | `--oneline` | | excl format |
| 2 | format | `--format=` (eq) | Const: `subject`→`%s`, `hash_subject`→`%h %s`, `hash_author_date_subject`→`%h %an %ad %s`, `fuller`→`fuller` | no free format strings |
| 3 | graph | `--graph` | | excl reverse |
| 4 | decorate | `--decorate` | | |
| 5 | all_refs | `--all` | | excl the rev role |
| 6 | max_count | `-n` (sep) | Int 1..10^5 | cue LIMIT, direction first (newest first) |
| 7 | skip | `--skip=` | Int 1..10^5 | |
| 7a | fixed_strings | `-F` | | derived: no regex-kind value and some value has a metacharacter |
| 7b | extended_regex | `-E` | | derived: a grep_message value is regex kind (ERE); literal values are then ERE-escaped |
| 8 | author | `--author=` | Name ×1..2 | a pattern for git: literal under `-F`, ERE-escaped under `-E` |
| 9 | grep_message | `--grep=` | Pattern ×1..3, dialect ERE (strict) | |
| 10 | ignore_case | `-i` | | cue CASE; requires author or grep_message (`--regexp-ignore-case`) |
| 11 | all_match | `--all-match` | | requires 2 grep_message values |
| 12 | invert_grep | `--invert-grep` | | polarity neg; requires grep_message; git ≥ 2.4 |
| 13 | since | `--since=` | Date (norms `git_date`, `iso_date`) | cue RECENCY |
| 14 | until | `--until=` | Date | |
| 15 | no_merges | `--no-merges` | | polarity neg; excl merges_only |
| 16 | merges_only | `--merges` | | |
| 17 | first_parent | `--first-parent` | | |
| 18 | stat | `--stat` | | excl name_only, name_status, patch |
| 19 | name_only | `--name-only` | | |
| 20 | name_status | `--name-status` | | |
| 21 | patch | `-p` | | |
| 22 | reverse | `--reverse` | | `-n` applies **before** `--reverse` (stated in the gloss) |
| 23 | follow_renames | `--follow` | | requires exactly one path |
| 24 | date_format | `--date=` | Const `relative`/`short`/`iso` | |

Excluded: `-S`/`-G` pickaxe (phase 2), `-L` line-log, `--pretty=format:<free>`, `--output=`
(writes a file), `--ext-diff`, `-c` config overrides.

The pager is left to the user's configuration. git disables it when stdout is not a tty.

The other git ops are in `git.json`:

| op | mods |
|---|---|
| `git.status` | `short` `-s`, `branch` `-b`, `porcelain` `--porcelain` |
| `git.show` | rev 0..1 (`eoo_after`), `stat`, `name_only`, `name_status`, `no_patch` `-s`, `oneline`, paths after `--` |
| `git.diff` | rev 0..2 or one range (`no_range_multi`: never `a..b c`), `eoo_after`, `staged` `--staged`, `stat`, `name_only`, `name_status`, `word_diff` `--word-diff`, compiler `-z` with name_only for `each`, paths after `--` |
| `git.branch` | listing only: `all` `-a`, `remotes` `-r`, `verbose` `-v`, `merged=Rev`, `no_merged=Rev`, `contains=Rev`, `sort=Const`, `show_current` (≥2.22) |

Any branch-name positional is **forbidden**: `git branch X` creates a branch.

### 2.3 Global modifier vocabulary and the other tools

The model learns each modifier once. A tool schema declares which modifiers it supports and how
it renders them.

| global mod | rg | grep | find | others |
|---|---|---|---|---|
| ignore_case | `-i` | `-i` | name_glob → `-iname` (alt flag) | git log `-i`, uniq `-i`, sort `-f`, pkill `-i` |
| invert | `-v` | `-v` | | git log `--invert-grep` (mod invert_grep) |
| name_glob | `-g G` | `--include=G` | `-name G` | |
| exclude_glob | `-g '!G'` | `--exclude=G` | `-not -name G` | |
| exclude_dir | `-g '!D'` | `--exclude-dir=D` | `-type d -name D -prune -o … -print` | |
| max_depth | `--max-depth N` | | `-maxdepth N` | |
| files_with_matches / count / only_matching / line_number / word / context | as in §2.1 | `-l` `-c` `-o` `-n` `-w` `-C` | | |
| max_count | `-m` (per file) | `-m` (per file) | | git log `-n` (total) |
| lines / bytes | | | | head/tail `-n`/`-c`; wc `-l`/`-c` |
| reverse / numeric / human / unique | | | | sort `-r -n -h -u` |
| hidden | `--hidden` | | | ls `-A` (the one canonical ls form; `-a` is excluded) |

The remaining schemas (full detail in `ir/schemas/*.json`):

| tool (op) | mods / rendering | notes |
|---|---|---|
| grep (`text.search`, pinned or stdin filter) | rg ids; derived `recursive -r` (always for a first stage), `extended_regex -E`, `fixed_strings -F`, `line_buffered`; compiler `-H`; `null` = GNU `-Z` / BSD `--null`; `--include=`, `--exclude=`, `--exclude-dir=` | `-P` GNU-only, excluded; `first_stage_operands` `["."]` (pathless `grep -r` errors on old BSD) |
| find (`files.find`, `layout: operands_first`) | order: roots, `max_depth`, `min_depth`, `exclude_dir` (prune group), `type` {f,d,l}, `name_glob` (`-iname` with ignore_case), `any_name` (or-group ≤4), `exclude_glob` `-not -name`, `size_gt` `+Nc`, `size_lt` `-Nc` (bytes: exact on GNU and BSD), `modified_within_days` `-mtime -N` / `modified_before_days` `-mtime +N` (norm `age_days`), `modified_within_minutes` `-mmin -N` (norm `age_minutes`), `empty`, `newer`; compiler `-print`, `-print0`, `-exec … -- {} +` | roots = role `paths` 0..8, default `.`; leading dash → `./-x` (no usable `--`); excluded `-delete`, free `-exec`, `-printf` (GNU), `-regex`, `-path` (root-prefixed paths make a copied `src/gen` a silent no-op) |
| ls (`dir.list`, cluster_short, each_ok) | `-l -A -h -S -t -r -1 -d -R` | stdout `lines`, **never** `paths`: `ls \| xargs` is inexpressible |
| head / tail (`file.head` / `file.tail`, each_ok) | `lines -n N`, `bytes -c N`; tail `from_line -n +N`, `follow -f`, `follow_retry -F` (stdout `endless`) | `head -n -N` GNU-only, excluded |
| wc (`file.count`, each_ok) | `-l -w -c -m` | |
| sort (`lines.sort`) | `-n -h -r -u -f` | `-k/-t` phase 2; `-o` writes, excluded |
| uniq (`lines.uniq`) | `-c -d -u -i` | paths arity **0..1**: the 2nd operand is an *output file*; never an `each` inner |
| sed (`file.lines`) | `sed -n 'A,Bp' [FILE]`; script is a `word` from `LineRange` ints (`A,Bp`, `Ap`, `A,$p`), always quoted | nothing else of sed; never an `each` inner |
| npm | `npm.run` (ScriptName `^[A-Za-z0-9:._-]{1,64}$`), `npm.scripts` (`npm run`), `npm.test` (watch-mode trap, §8.6), `npm.ls` (`top_level` = fixed `--depth=0`, `depth --depth=N`, `all --all`); stderr `merge` | run/test = `exec_project`; excluded `install`, `exec`, `-- args` |
| curl (`http.get` prefix `-g`, `http.head` `-g -I`, `http.download` `-g -f -L`) | `-f -s -S -L -i` (`-i` → stdout `lines`), `--max-time N`; download: `-o PATH` xor `-O` | `-g` (globoff) always: `[]{}` never fan out into many requests; URL `https?://` only, ≤2048 chars, no whitespace/controls; excluded `-d -X -u -H -K -b -T -k --data*` |
| jq (`json.select`) | `-r`, `-c`; filter = JqPath `^(\.[A-Za-z_][A-Za-z0-9_]*(\[\d+\])*\|\.\[\d+\])+$` from norm `jq_path`, always quoted | paths 0..1; never an `each` inner |
| ps (`proc.list`) | prefix `aux`; `sort_cpu` linux `--sort=-%cpu`, `sort_mem` linux `--sort=-%mem` | darwin sort mods **absent** until `ps aux -r/-m` is verified |
| lsof (`port.who`) | prefix `-nP`; required `port` attached `-iTCP:N`; `listening` `-sTCP:LISTEN` | `read_proc`; UDP not covered |
| pkill (`proc.kill`) | `signal` attached `-KILL`/`-TERM`/`-INT`/`-HUP` (norm `signal` only; `KILL` carries cue FORCE), rendered **first**; derived `exact -x` always; `ignore_case -i` | `signal_proc` (high); name `^[A-Za-z0-9_][A-Za-z0-9_-]{1,63}$` (pkill reads it as an ERE even with `-x`, so `.`/`+` are rejected); `-f` excluded (phase 2); Linux `-x` matches the 15-char `comm` → longer names `env_unsupported` |

Pilot scale (counted from the schemas at build time, never hardcoded; today): 26 ops, 17 tool
schemas, 113 modifier ids in 179 option entries, about 40 relations, 14 value types, 19 norm kinds.

## 3. Stream typing and legal compositions

| Stream | Meaning | Produced by |
|---|---|---|
| `none` | no stdout | pkill |
| `lines` | text lines | most ops |
| `paths` | newline-separated paths, a subtype of `lines` | `rg -l`, `rg --files`, find, `git diff --name-only` |
| `paths0` | NUL-separated paths. **Compiler-only**: never in the model IR | `nul` variants of the ops above |
| `json` | JSON | the file argument of jq, or `http.get` coerced to json (body assumed JSON, stated in the gloss) |
| `bytes` | raw bytes | http.get |
| `endless` | a stream that never ends | `tail -f`/`-F` |

| Producer → consumer | Legal? |
|---|---|
| lines/paths → text.search (stdin filter), file.head, file.tail, lines.sort, lines.uniq, file.count, file.lines | yes. The consumer must have **no file operands** (else rejected: `x \| wc -l file`); a stdin-filter text.search may not carry `-l`, `-L`/`--files-without-match` or `-H` (`stdin_excl`: they print `(standard input)`) |
| endless → text.search, file.head | yes; a text.search reading `endless` with piped stdout gets derived `--line-buffered` (grep and rg block-buffer pipes) |
| endless → sort, uniq, wc, tail -n | **no**: they never finish |
| bytes (http.get, not `-i`) → json.select | yes, coerced, with a gloss note |
| bytes → anything else | no |
| paths with a `nul` variant → `each(exec)` | yes, under the conditions below |
| paths after a filter (`find \| grep x`) → `each` | **no**: the NUL form is lost |
| lines (ls, ps, git log) → `each` | **no** |
| anything → git, npm, curl, find, ls, ps, lsof, pkill | no: their stdin is `never` |
| net_read op and any `exec_project` op in the same Program (pipe **or** `&&`) | **hard deny** (`curl \| sh`; `curl -o .npmrc URL && npm test`) |
| non-sort → lines.uniq | rejected unless the request has an ADJACENT cue. Use `freq` or `sort -u` |

**`each`, the only fan-out:**

1. The inner op must declare `each_ok: true` (text.search, file.head, file.tail, file.count,
   dir.list), which requires read-only effects (`read_fs`/`list_fs`), a `paths` positional with
   upper arity > 1 and independent per-file semantics, and no `endless` output (no `tail -f`).
   lines.uniq (2nd path = output file), file.lines (`sed -n` ranges over the concatenation),
   json.select and lines.sort are never inners; nor is anything with `signal_proc`, `write_fs`,
   `exec_project` or `net_read`.
2. Transport is decided by the compiler alone:
   - **Producer is find:** fold into `find … -exec CMD … -- {} +`. It is portable and runs nothing on
     empty input.
   - **Otherwise:** set the producer's `nul` mod (`rg -l -0`, `git diff --name-only -z`) and render
     `| xargs -0 -r CMD` on `linux_gnu` or `| xargs -0 CMD` on `darwin_bsd`. BSD xargs does not
     run on empty input.
   - **Both:** the inner argv always ends with `--` (`xargs -0 -r wc -l --`, `-exec wc -l -- {} +`),
     and inner rg/grep patterns are rendered `-e P` before it. `git diff` prints names like
     `-rf.txt`, and rg under a `-x` root prints `-x/foo`; without `--` they would parse as options.
   - **Never** `xargs -d '\n'`, and never a newline-separated path stream into xargs.
3. A pathless consumer must not search the cwd. The empty-input guard above covers GNU. Inner
   rg/grep also get the compiler mod `-H`, so the output format does not change when one file
   matches.
4. Tolerated and stated in the gloss: xargs may split a long list into several invocations, so
   `wc -l` can print several "total" lines.
5. `git diff --name-only` paths are relative to the repository top. `each` after git requires the
   env check `cwd == git toplevel`; otherwise the result is `env_unsupported`.

**Limits:** 1–3 `&&` parts; 1–4 IR stages per pipe (`freq` counts as one); ≤6 real commands per
pipe, ≤8 in total; ≤1 `each` per pipe; `cwd` optional.

## 4. Model output encoding

### 4.1 Pointer units

A deterministic segmenter turns the NFC-normalized request into **pointer units**. Atomic units
are quoted or backticked strings (copied without the outer quotes), URLs, path-like tokens
(containing `/`, starting with `~` or `.`, or with a `.ext`), `HEAD~N`/`HEAD^`, SHA-like hex
(7–40), flag-like tokens (`-v`, `--hidden`) and number+unit (`50mb`, `2h`). Otherwise units split
**only** at whitespace, plus a trailing `, ; ! ?` (or `.`/`:` before whitespace or the end), which
becomes its own unit; so `foo(`, `a.b*` and `it's` are one unit each.

Each unit keeps `[charStart, charEnd)` in the original text. A span value is exactly
`request[charStart(first) : charEnd(last)]`, inner whitespace and punctuation included (Unicode
byte-exact). A span can never split a unit. The unit vector is the mean of its subword
states. Typical requests have 6–30 units.

### 4.2 Network and runtime

Shared encoder initialized from today's S student (3×384; tokenizer kept for the H8 baseline;
ternary QAT "HQ" and a 50M ternary encoder "T50" are the c3 challengers on the same IR). Conditional
decoder 5×384 with cross-attention, ≈12M parameters, int8 (ternary optional). Runtime: the own
native binary (C++/Rust; ternary kernels if they pass the c3 kill criteria). Kill test: a 100M
ternary decoder emitting 30 tokens in a fresh process took 132 ms on M1 and 381 ms on a 2 GHz Xeon
VM; the pilot decodes ≤16 actions at p95 with a decoder ≈8× smaller. Budget: A 9.3 MB + encoder
~17 MB + heads 1–3 MB + decoder ~12 MB + binary/schemas 8–15 MB ≈ **48–57 MB** (cap 100 MB).

### 4.3 Parallel heads: the P route (one encoder pass)

| Head | Output |
|---|---|
| `status` | softmax {ok, not_shell, out_of_scope, underspecified} |
| `reason` | softmax over OosReason, plus MISSING roles (multi-label) |
| `shape` | **factorized**: parts {1,2,3} × stages-of-part-1 {1..4} × cwd {0,1} × each {0,1} × stderr {none, discard, merge} |
| `op[0]` | softmax over the schemas' ops (26 today) + `none`, plus `pin` {none, rg, grep} |
| `mods[0]` | sigmoid over the global modifier vocabulary, masked to op[0]'s supported set |
| `unit_role` | per unit: {filler, op_cue, mod_cue, value:<VType>} |
| `polarity` | binary: does the request negate something. A gate feature, see §6.3 |

The **fast path** is limited to `shape = 1 part × 1 stage` (≈ half the traffic). The IR is
assembled from the heads: values from `unit_role` runs, normalizer kinds from the VType plus a
deterministic parse. The role tagger is **only a soft prior**: it never removes units from the
decoder's pointer mask, so a mis-tag cannot force a wrong span. If the assembled IR passes the gate
above the P threshold, the decoder does not run. Anything with more than one stage is the decoder's.

### 4.4 Action vocabulary (the D route)

```
STATUS : OK NOT_SHELL OOS UNDER                                  4
REASON : reason:<OosReason>  missing:<Role>                      ~16
STRUCT : EOS PIPE AND EACH CWD STDERR:discard STDERR:merge MACRO:freq   8
OP     : op:<OpId>  pin:rg pin:grep                              ~28
MOD    : mod:<ModId>                                             ~110
ARG    : arg:<Role>   (optional or second roles only)            ~10
VALUE  : SPAN  norm:<NormKind>  const:<ConstId>                  1 + 18 + ~45
                    total ≈ 245 actions; head sizes are derived from the schemas at build time
```

- **Option embeddings are factorized:** `emb(mod) + emb(op)`. `ignore_case` therefore shares
  meaning across rg, grep, find, git, uniq and pkill.
- **`SPAN` and `norm:*` take their pointer in the same step.** A biaffine scorer
  `s(i,j) = qᵀW_s h_i + qᵀW_e h_j + h_iᵀ U h_j` is masked to `j ≥ i`, `j − i < 8` and units not
  already consumed.

**Canonical order** gives one unique target per IR (the mask enforces it): status; `CWD` value;
per stage `op`, `pin`, the first required role's values (no `arg:` token), `mod`s in strictly
increasing schema index each followed by its values, `arg:<role>` + values for every other role;
then `PIPE` / `EACH` / `AND` / `EOS`. A macro is `MACRO:freq [arg:paths SPAN]` (its only role is
optional, so it always takes `arg:`).
A value directly after a value continues the same role, up to its arity. Every training target is
canonicalized and must round-trip (§5.5), or the row is dropped.

Typical lengths (BOS excluded): single command 5–9 actions; two stages 9–14; three stages or `&&`
13–20. The pilot targets p50 ≈ 7 and p95 ≈ 16, with a hard cap of 32, beyond which the request is
`out_of_scope`.

Example: "which files mention useEffect, skip node_modules"; units `which0 files1 mention2
useEffect3 ,4 skip5 node_modules6`; actions
`OK op:text.search SPAN[3,4) mod:files_with_matches mod:exclude_dir SPAN[6,7) EOS` (7). Full IR:

```json
{"v":1,"status":"ok","body":{"k":"and","parts":[{"k":"pipe","stages":[
  {"k":"exec","op":"text.search",
   "mods":[{"mod":"files_with_matches"},
           {"mod":"exclude_dir","values":[{"k":"span","u":[6,7],"as":"Name"}]}],
   "args":{"pattern":[{"k":"span","u":[3,4],"as":"Pattern"}]}}]}]}}
```

It renders as `rg -l -g '!node_modules' useEffect .`.

### 4.5 Grammar mask

A pushdown automaton is compiled offline from the schemas. Its state is:

```
(shape budget, part idx, stage idx, op, realized-tool profile, last mod index, used-mod bitset,
 pending value type + remaining arity, unfilled required roles, current stdout stream)
```

- **After `op:X`:** X's predictable mods with index > last, minus `excl` conflicts and mods whose
  `requires` can no longer be met; value actions for X's first required role; `arg:` tokens;
  `PIPE`/`EACH` only if some op accepts X's current stdout (§3); `EOS`/`AND` only once required
  roles and rules are satisfied.
- **Value actions** come from the value spec's `norms` list when declared (find `-mtime` →
  `age_days`, `-mmin` → `age_minutes`, `max_depth` → `int`/`scope_top`, pkill signal → `signal`
  only, no bare const), else from the type default: Int → `int`; Size → `size`; Path → `SPAN`,
  `home_path`; Pattern → `SPAN`, `starts_with`/`ends_with`; Glob → `ext_glob`, `substr_glob`,
  `SPAN`; Name/ScriptName/ProcName → `SPAN`; Rev → `SPAN`, `rev_rel`; Url → `SPAN`, `url_scheme`;
  Date → `git_date`, `iso_date`; LineRange → `line_range`; Port → `port`; JqPath → `jq_path`;
  Const → the schema's const ids. The gate checks the same lists.

- **Abstention:** `NOT_SHELL`/`OOS`/`UNDER` are legal as the first action. `UNDER` is followed by
  one or two `missing:` tokens.
- **No cue-gated hard masks.** A lexicon miss would make the right answer impossible and push the
  decoder to a *different* runnable answer. Cue consistency is enforced in the gate (§6.3), which
  can only abstain.
- **Training uses the same mask:** cross-entropy over the legal set, the same automaton at train
  and inference time.

### 4.6 Confidence, abstention and calibration

The masked softmax is inflated, so it is never confidence. Per-action confidence is
`c = p_unmasked(chosen) · Σ_{a ∈ legal} p_unmasked(a)`; the second factor is the "legal mass", the
out-of-grammar signal. The calibrator (logistic model
+ isotonic regression) uses: `status.ok`; min and mean `c`; minimum pointer margin (top-1 − top-2
span score); P/D canonical agreement; A agreement; unexplained content words (§6.3);
polarity-head vs lexicon agreement; shape and derived risk. P/D agreement and the polarity head
share the encoder: they are **correlated features, not independent verifiers**, fitted like any
other feature, and never override a deterministic obligation.

Thresholds are fitted **per (route × risk tier)** on a calibration split clustered by AST family.
The split must include a deployment-weighted slice derived from real usage and a human-written
slice; teacher-only NL gives an optimistic bound. The threshold is the lowest value at which the
one-sided 95% Clopper–Pearson upper bound on wrong-runnable among accepted answers is ≤ 0.5%.
Thresholds are frozen and shipped together with the schema hash.

The **high tier** (pkill, overwriting download) cannot reach a 0.1% bound with pilot data, which
would need about 3,000 accepted cases with zero errors. A generated high-tier answer therefore
requires exact P = D canonical agreement, every obligation satisfied with zero unexplained words,
the required verb cue, and UI confirmation. A's catalog intent remains the primary path for these.

## 5. Compiler

`compile(IR, shell, platform, envprofile, schemaVersion) → string | Unsupported` is a pure,
versioned function. The pipeline is `canon → realize → ArgvPlan → render`.

### 5.1 Canon

Canon is exactly the five steps of §1. It makes no semantic rewrites and drops no "default" mods;
the only default it drops is an operand list the compiler would render identically (step 2).

### 5.2 Realization (abstract op → tool)

| Op | Tool |
|---|---|
| `text.search`, first stage, no pin | rg. If rg is absent, `env_unsupported` ("rg not installed; ask 'with grep'"). **Never** a silent grep fallback: .gitignore, hidden files, binary files and regex dialect all differ |
| `text.search`, stdin filter, no pin | grep. On stdin there is no traversal, so gitignore and hidden handling do not apply. A literal pattern is dialect-free; a regex must compile as ERE |
| `text.search`, `each` inner, no pin | rg with `-H`; if rg is absent, `env_unsupported` (same message) |
| `pin: grep` / `pin: rg` | the named tool, in every position |
| every other op | exactly one tool |

### 5.3 ArgvPlan (shell-independent)

`Seq[Pipe[Stage{ argv: Word[], stderr }]]`, with `Word = {text, kind: literal | tilde_prefix}`.

1. `argv = [binary, ...argv_prefix, ...options in schema order, ...positionals]`; with
   `layout: operands_first` (find): `[binary, ...argv_prefix, ...positionals, ...options]`.
2. **Derived mods:** `-F`/`-E` from `pkind`; `-r` for **every** first-stage grep (no env probe;
   `grep -r` on a plain file just searches it); `--line-buffered` for text.search on `endless`
   input with piped stdout; `-0`/`-print0`/`-z`/`-Z` from `each`; `-H` for an `each` inner
   rg/grep; `-x` for pkill (always).
3. **First-stage operands:** if a first stage has no operands, render `first_stage_operands`. For
   rg, grep and find that is `.`, which closes the "rg reads a non-tty stdin" hole. Ops with
   `no_operands: stdin` (head, tail, wc, sort, uniq, sed, jq) are illegal as a first stage without
   a file.
4. **Dash safety, before any quoting:** quoting does not stop option parsing, so:
   - a pattern starting with `-`, more than one pattern (`multi: dash_e`) or an `each` inner →
     every pattern becomes `-e P`;
   - another copied positional starting with `-` → `--` before the first remaining positional for
     `eoo` roles, `./` + value for `dot_slash` roles (find roots), and `unsafe_value` for `reject`
     roles;
   - git paths always get `--`, and so does a git rev (`eoo_after`: `git log main --`);
   - a copied option value starting with `-` must use `eq` or `attached` form; a `sep` form gives
     `unsafe_value`.
5. **Clustering:** only for `cluster_short` tools (ls), and only for predicted boolean short flags,
   in schema order.
6. **find:** roots first (`layout: operands_first`); then global options (`-maxdepth`,
   `-mindepth`); then the prune group
   `-type d -name D -prune -o` (or `-type d \( -name A -o -name B \) -prune -o`); then predicates;
   then the terminal: `-print` if a prune group exists, `-exec CMD … -- {} +` for `each`. `\(`/`\)`
   are compiler words.
7. **Macro `freq`** expands to the fixed argvs `sort [FILE] | uniq -c | sort -rn`. A first-stage
   `freq` needs its `paths` arg (invariant 8); after a `lines.sort` stage it is illegal.

### 5.4 Rendering and quoting

**POSIX: bash and zsh produce identical bytes.**

- **Bare words:** a word is bare iff it matches `^[A-Za-z0-9_@%+:,./-]+$`. That set has no `=`
  (zsh EQUALS), no `~ ^ #` (zsh extendedglob), no `! * ? [ ] { }`, and nothing empty.
- **Everything else is single-quoted:** `'…'`, with `'` written as `'\''`. There is **no
  double-quote branch**.
- **`quote: "always"` types** (Glob, the sed script, JqPath) are single-quoted even when bare-safe.
- **Empty string:** `''`.
- **`eq` form:** renders `--flag=` + quote(value), giving one shell word, e.g. `--since='1 week ago'`.
- **`tilde_prefix`** (from `norm:home_path` or a span starting `~/`): bare `~/` followed by the
  quoted rest.
- **Rejected values (`unsafe_value`):** control characters, NUL, newlines, bidi overrides
  (U+202A–202E, U+2066–2069) and zero-width characters (U+200B–200D, U+FEFF). `$'…'` is never
  emitted.
- **Joining:** ` | ` between stages, ` && ` between parts, `cd ./X && ` for a relative cwd, and ` 2>/dev/null` or
  ` 2>&1` directly after the stage's argv.
- **Shell globs:** the pilot has **no live shell globs**. "all ts files" becomes `find -name '*.ts'`
  or `-g '*.ts'`; "only here" becomes `max_depth=N:scope_top("only here")` = 1.

**Later backends need no IR change** (a renderer plus a capability matrix each). **fish:** single
quotes escaping `\\` and `\'`; `&&` needs fish ≥ 3.0, else `; and`. **pwsh:** `''` doubling;
native-exe argument rules (reuse `unsafeNativePwshArg`); `curl.exe`, never the alias;
`ls`/`ps`/`sort`/`find` are `env_unsupported`; byte-safe pipes need 7.4+. **cmd:** `%` and `!` give
`unsafe_value`; `find` is a different program; pipes to head/wc are `env_unsupported`.

### 5.5 Round-trip and determinism

**Runtime check, for every accepted answer:**

1. A strict tokenizer accepts only what the backend emits: bare words, single-quoted words, the
   two concatenations the renderer makes (`--flag=` + bare-or-quoted, `~/` + quoted rest), `\(`,
   `\)`, ` | `, ` && `, `2>/dev/null`, `2>&1`, a leading `cd ./X &&`, `xargs -0 [-r]` and
   `-exec … -- {} +`. Anything else is a compiler bug, so the answer is rejected.
2. A schema-driven getopt decompiler reads the argv back into IR′. It handles clusters, `--opt=v`,
   `-n5`/`-n 5`, `--`, `-e`, `-g '!x'` and the `freq` macro; it recovers `pkind` from `-F`/`-E`
   (and from metacharacters for rg) before stripping derived and compiler mods.
3. Accept iff `IR′ == canon(IR)`, with provenance stripped.

**Determinism:** output is byte-identical for identical `(IR, shell, platform profile
{linux_gnu, darwin_bsd}, tool-version bucket, schema hash)`. There is no locale, time or randomness
input. Golden files are kept per profile.

**CI harness:** property-based IR fuzzing with adversarial values (`' " $ \` \ ! * ? [ { ~ = # ; &
| < >`, a leading `-`, spaces, Unicode, empty); render for bash, `zsh -f` and zsh with
`setopt extendedglob nomatch`; execute through PATH shims that dump argv as NUL-separated bytes;
assert byte equality with the ArgvPlan, `decompile(render(x)) == canon(x)`, and risk monotonicity
(adding any mod or stage never lowers risk).

The same decompiler parses real command skeletons (§10) and catalog templates (§9).

## 6. Acceptance gate and risk

The checks run in order, and the first failure abstains with a label.

### 6.1 Schema

Types, arity, ranges, `excl`/`requires`/`required`, stream legality (§3), limits and
first-stage-stdin (invariant 8).

### 6.2 Provenance

- Every span lies inside the request and passes its type validator. Allowed trims are enclosing
  quotes or backticks, and one trailing `.,;:!?`.
- Every `norm` is **recomputed** from its source text. A parse failure gives `gate_reject`: the
  model picked the kind, and code decides whether it parses.
- Every `const` is in its enum.
- No two values overlap, and no unit is used in two roles.
- Regex patterns compile in the realized dialect (strict POSIX-ERE checker for grep/git, §1).

**Approved normalizations: the complete list.**

| kind | accepts (source span) | value |
|---|---|---|
| `int` | digits, `1,000`, one…twenty, thirty…ninety, hundred, "a dozen" | integer in the option's range. "few", "some" and "couple" give **no value** |
| `size` | `N` + b/byte(s)/k/kb/m/mb/meg(s)/g/gb/gig(s) | exact **bytes**, rendered with find's `c` suffix (`50mb` → `52428800c`). Binary units; `b` = bytes (find's own `b` means 512-byte blocks and is never rendered) |
| `age_days` | "last/past N days", "N days" | `N` for `-mtime -N` |
| `age_minutes` | "last/past N minutes/hours" | minutes for `-mmin -N` (hours × 60) |
| `git_date` | closed phrase table: yesterday, N {minutes,hours,days,weeks,months} ago, last/past N {…}, last week, last {weekday} | git approxidate text (`1 week ago`); git interprets it, we do not approximate |
| `iso_date` | `YYYY-MM-DD` | verbatim |
| `ext_glob` | `.ts`, `ts`, closed language table **only for languages with one canonical extension** (python→`*.py`, go→`*.go`, rust→`*.rs`, …) | `*.ext`. A multi-extension language (typescript, javascript, c++, yaml, …) gives `ambiguous` unless the request names the extension; unknown words are rejected |
| `substr_glob` | span X | `*X*` |
| `home_path` | `~/x`, "my home", "home dir", "my downloads/desktop/documents" | `~`, `~/Downloads`, … (tilde_prefix) |
| `rev_rel` | "last commit" → `HEAD`; "N commits ago" / "N commits back" → `HEAD~N`; "the commit before last" → `HEAD~1` | "previous commit" is **deliberately absent**, so it does not parse and gives `gate_reject` (ambiguous) |
| `line_range` | "lines A to B", "A-B", "line N", "from A to the end" | `A,B` / `N` / `A,$` with A ≤ B |
| `port` | `3000`, `:3000`, "port 3000" | int 1..65535 |
| `jq_path` | span `version`, `scripts.build`, `items[0].name` | `.version`, `.scripts.build`, `.items[0].name`; keys must be copied |
| `url_scheme` | a bare hostname span (+ optional path) with a **web cue** (`www.`/`api.` prefix, or the request says url/site/website/web/api/endpoint/http/domain) **and** a TLD in an allowlist that excludes extension-like TLDs (`md py sh rs ai io zip mov ts js …`) | `https://` + span. A span that exists as a local path (env probe) is rejected; a path-like span is `ambiguous` |
| `starts_with` / `ends_with` | span X | `^` + escape(X) / escape(X) + `$` (regex kind; escape per realized dialect, §1) |
| `signal` | "force", "-9", "hard" → `KILL`; "gracefully" → `TERM`; a named `KILL/TERM/INT/HUP` (`SIGHUP`, `-HUP`) | a const id with a source span (pkill's only signal action) |
| `scope_top` | a closed SCOPE_TOP phrase ("only here", "top level only", "not recursive", "without recursing", …) | `1` (rg/find `max_depth`) |
| `possessive` | a Name span `X's` ("bob's commits") | `X` (git author/owner names) |

**Never invented:** file names, branch names ("the default branch" is `underspecified`), patterns,
URLs, script names (`npm test` needs none), process names, regexes built from descriptions ("email
addresses"), and format strings.

**Approximations are not allowed.** "today" and "yesterday" have no find mapping and give
`gate_reject`. git receives them verbatim.

### 6.3 Obligations: deterministic request/command compatibility

These are generic and keyed on mod tags, never per intent. A small closed EN cue lexicon is
matched longest-first, and each cue phrase belongs to exactly one class. "not recursive",
"non-recursive" and "top level only" are SCOPE_TOP, not NEG. Positive multiword phrases that contain
a NEG word are claimed first by their own class: "ignore .gitignore", "without respecting
gitignore", "don't respect gitignore" → IGNORED; "don't skip hidden", "without skipping hidden" →
HIDDEN. The sampler adds double-negation minimal pairs ("skip hidden" vs "don't skip hidden").

| Check | Rule (both directions where marked ⇔) |
|---|---|
| Polarity ⇔ | A NEG cue ("not", "n't", "without", "except", "excluding", "other than", "but not", "skip", "ignore <noun>", "lacking", "apart from") ⇔ ≥1 `polarity: neg` element. Also, if the learned polarity head is confident and the lexicon found no cue, abstain. That catches lexicon misses |
| **Negation scope** | The NEG cue's window is the next ≤4 units up to a clause boundary. The neg element must bind inside it: an `exclude_*` value span lies in the window, and for `invert`/`invert_grep`/`files_without_match` the *pattern* span lies in it. "TODO not in tests" → `exclude_dir(tests)` passes; `invert(TODO)` fails |
| Cue classes ⇔ | Schema classes CASE, HIDDEN, IGNORED, FOLLOW_LINKS, SCOPE_TOP, WORD, WHOLE_LINE, LINE_NUMBERS, CONTEXT, LIMIT, COUNT, RECENCY, SIZE, SORT, REVERSE, LONG_FORMAT, HUMAN_SIZES, FOLLOW, FOLLOW_REDIRECTS, HEADERS, LISTEN; gate classes FORCE, REGEX, ADJACENT, FREQ, TIMEOUT, PER_FILE (closed list, `ir/lib/lexicon.js`). Every predicted mod or `enum_cue` value carrying a cue needs one of its classes in the request, and every cue present needs ≥1 element of its class. Non-mod elements: REGEX ⇔ ≥1 copied pattern with `pkind` regex; ADJACENT ⇔ lines.uniq not directly after lines.sort; FORCE ⇔ pkill `KILL`; the `freq` macro needs FREQ/SORT/COUNT or a frequency word ("rank", "repeated", "most", "often") and explains all three; LIMIT after `freq` may come from the FREQ phrase; rg/grep `max_count` also accepts PER_FILE. Explain-only elements never need a cue but explain one that is present (a sort stage: SORT; head/tail without a count: LIMIT; per-file outputs such as `-c`/`-l`/find listings: PER_FILE; `ls -lh`: HUMAN_SIZES). Special classes: BOUND phrases ("not merged", "first parent", …) are claimed before NEG and explained only when the command has the bound mod; NAMES_ONLY ("bare names", "without the path") is explained only by plain `ls`, else rejected; NEUTRAL ("any depth", "how long") needs nothing. This blocks an invented `-i`, `--hidden`, `--no-ignore`, `-v` or `-f`. Cosmetic mods (`curl -s`, `jq -r`, `git log --oneline`) carry no cue |
| Mod words | A behaviour-changing mod or const with no cue class needs its own request word (`REQUIRE_WORDS`, keyed `op.mod` or `op.mod=const`: e.g. `files.find.type=d` "directories", `git.log.skip`, `git.branch.merged`, `git.diff.staged`, `npm.ls.all`, `lines.uniq.repeated`, `dir.list.sort_time`), or the request spells the flag itself (also inside a short cluster). Sort direction words must agree with the order (`SORT_FORBID`: "smallest" vs `ls -S`); find `-type f` is rejected when the request names directories or links but never files |
| Numbers | Every numeric token is consumed by a norm or by a copied span (path or pattern). Every int norm has a source |
| Direction | first/top/head → `direction: first`; last/bottom/end/tail → `last`; every free direction word must agree with every direction element. On newest-first streams (`git log`, `ls -t`) "last/latest/recent N" means the first N, i.e. `git log -n N`; downstream of one, "last" is ambiguous and rejected. rg/grep `-m` is per file: "first N" needs `\| head -n N` |
| Count kind | "how many files" → a count over `paths`. "how many times/occurrences" → `-o … \| wc -l` or `--count-matches`. "how many lines" → `-c` or `wc -l`. A bare "count X" with no kind gives **`ambiguous`** (gate-only) |
| Named values | Every quoted or backticked string, path-like unit and URL is consumed by a value. A flag-like unit is consumed by a value (`-v` as a pattern, `-9` by `signal`) or by a predicted mod whose realized flag, or cluster member, equals it (`rg --hidden foo`, `ls -lA`); an unmatched flag-like unit gives `gate_reject` |
| Coverage | A word from a closed lexicon that no element explains: **any** gives `gate_reject`. Tool names must be what the command runs; write verbs (delete, rename, copy, …) are inexpressible (except save/write with a `write_fs` effect); op verbs (kill, download) need their op; a language/extension word ("python files") needs a value ending in that extension. Plain-English extension names (go, c, text, json, md) count only before "file(s)" or spelled `.go`. Unknown content words (outside consumed spans, cue phrases, the closed lexicons and the known domain vocabulary): more than `MAX_UNKNOWN` (= 1) gives `gate_reject` ("…and email me the result") |
| Paths | A bare-word path (no `/ . ~`) is one request word, is not a file-kind noun before "files" ("config files"), and does not follow an unexplained modifier word ("app logs") |
| Review rejects | Known wrong accepts, rejected conservatively: "just the number" with `wc FILE` (prints the name); `uniq -i` after a case-sensitive sort; `npm ls --depth` with a package; `find -maxdepth -type d` without `-mindepth 1`; "dotfiles" with `ls -A`; a count over `git branch --merged` |
| Kill | pkill requires a kill/stop/terminate verb cue and an exact ProcName span. Its signal always comes from `norm:signal`; `KILL` requires a FORCE cue |

### 6.4 Environment

The tool exists (`command -v`, cached) at the minimum version for the mods used; the platform
render exists; git ops run inside a work tree; `cwd` exists as a directory; **for risk ≥ medium,
copied read operands must exist** (for safe risk a missing path is only flagged). Write targets
(`-o PATH`, the `-O` name) need not exist, but their parent directory must. Paths are resolved
against `cwd`, and a leading `~` against `env.home`; without `env.home` a tilde path is not probed
and a tilde write target is assumed to exist (high).

### 6.5 Round-trip (§5.5) and effects → risk

Risk is fixed once, before calibration, and can only be raised.

| Effects | Risk |
|---|---|
| only `read_fs`, `list_fs`, `read_vcs`, `read_proc`, `pure` | safe |
| `net_read` (stdout) | **medium** |
| `exec_project` (npm run/test executes repository code) | medium |
| `write_fs` where the target does not exist (runtime `stat`; for `-O` the target is the URL's last path segment, and an empty segment gives `unsupported`) | medium |
| `write_fs` where the target exists | **high** |
| `signal_proc` | high |
| `net_read` and `exec_project` anywhere in one Program, delete, VCS mutation, redirect write, `each` with a non-`each_ok` inner | **deny** (cannot be expressed) |

Composition is the max over all execs. Final risk = `max(derived, catalog risk if route A,
danger.js(rendered))`; a danger.js escalation above the derived risk is logged as a schema bug.
Confidence must clear the (route, tier) threshold (§4.6). Output: `{command, risk, route, gloss,
autorun: route == A && catalog render && risk == safe}`. Generated routes are display-only; medium
and high need confirmation.

**Abstention UX.** `underspecified` shows *what is missing* ("need: a search pattern"), together
with the missing role and an example phrasing. **It never shows a command or a placeholder.**

## 7. Worked examples

Assumptions: environment linux_gnu with rg, git, npm, curl and jq installed; bash. zsh produces
the same bytes. Notation: `"x"` copied span; `N:kind("src")` normalized value; `C:x` constant;
`{…}` mods (ids as in the schemas); `(role=…)` args (a bare positional list fills roles in order).

Every command below was checked against §2 and §5: option order, quoting and dash rules.

| # | Request | IR | bash / verdict | Notes |
|---|---|---|---|---|
| 1 | search for TODO in src | `text.search(pattern="TODO", paths="src")` | `rg TODO src` | safe; heads-only path |
| 2 | case-insensitive search for 'connection refused' in logs/ with line numbers | `text.search{ignore_case, line_number}(pattern="connection refused", paths="logs/")` | `rg -i -n 'connection refused' logs/` | CASE and LINE_NUMBERS cues |
| 3 | find foo( literally in js files | `text.search{name_glob=N:ext_glob("js")}(pattern="foo(")` | `rg -F -g '*.js' 'foo(' .` | `-F` derived (metachar); `.` added for the first stage |
| 4 | search for -v in scripts | `text.search(pattern="-v", paths="scripts")` | `rg -e -v scripts` | dash guard via `-e` |
| 5 | search for it's broken in notes | `text.search(pattern="it's broken", paths="notes")` | `rg 'it'\''s broken' notes` | single-quote only |
| 6 | which files mention useEffect, skip node_modules | `text.search{files_with_matches, exclude_dir="node_modules"}(pattern="useEffect")` | `rg -l -g '!node_modules' useEffect .` | NEG window binds "node_modules" |
| 7 | TODO not in tests | `text.search{exclude_dir="tests"}(pattern="TODO")` | `rg -g '!tests' TODO .` | negation scope: `invert(TODO)` would fail the gate |
| 8 | lines in app.log without DEBUG | `text.search{invert}(pattern="DEBUG", paths="app.log")` | `rg -v DEBUG app.log` | NEG window binds the pattern |
| 9 | how many lines in server.log contain timeout | `text.search{count}(pattern="timeout", paths="server.log")` | `rg -c timeout server.log` | count kind: lines |
| 10 | how many times does error appear in app.log | `text.search{only_matching}("error","app.log") \| file.count{lines}` | `rg -o error app.log \| wc -l` | count kind: occurrences |
| 11 | how many files mention deprecated | `text.search{files_with_matches}("deprecated") \| file.count{lines}` | `rg -l deprecated . \| wc -l` | count kind: files |
| 12 | count TODOs | (any IR) | **ambiguous** (gate) | count kind not determinable |
| 13 | first 3 matches of timeout in logs | `text.search("timeout","logs") \| file.head{lines=N:int("3")}` | `rg timeout logs \| head -n 3` | **not** `-m 3`, which is per file |
| 14 | 3 matches per file of panic under crates | `text.search{max_count=N:int("3")}("panic","crates")` | `rg -m 3 panic crates` | minimal-pair sibling of #13 |
| 15 | lines starting with import in main.ts | `text.search(pattern=N:starts_with("import"), paths="main.ts")` | `rg '^import' main.ts` | regex kind from the normalizer |
| 16 | use grep to find the literal text a.b* in python files | `text.search[pin=grep]{name_glob=N:ext_glob("python")}(pattern="a.b*")` | `grep -r -F --include='*.py' 'a.b*' .` | pinned; `-r`, `-F` and `.` derived |
| 17 | md files under docs changed in the last 2 days | `files.find{type=C:f, name_glob=N:ext_glob("md"), modified_within_days=N:age_days("last 2 days")}(paths="docs")` | `find docs -type f -name '*.md' -mtime -2` | |
| 18 | files bigger than 50mb, not in node_modules | `files.find{exclude_dir="node_modules", type=C:f, size_gt=N:size("50mb")}` | `find . -type d -name node_modules -prune -o -type f -size +52428800c -print` | prune works for any root; size in exact bytes |
| 19 | files without test in the name | `files.find{type=C:f, exclude_glob=N:substr_glob("test")}` | `find . -type f -not -name '*test*'` | |
| 20 | empty directories under build | `files.find{type=C:d, empty}(paths="build")` | `find build -type d -empty` | |
| 21 | line count of every ts file in src | `files.find{type=C:f, name_glob=N:ext_glob("ts")}("src") \| each(file.count{lines})` | `find src -type f -name '*.ts' -exec wc -l -- {} +` | find fold |
| 22 | line counts of files containing useState | `text.search{files_with_matches}("useState") \| each(file.count{lines})` | `rg -l -0 useState . \| xargs -0 -r wc -l --` | darwin: `xargs -0 wc -l --` |
| 23 | detailed list of everything here incl. hidden, biggest first, human sizes | `dir.list{long, hidden, human, sort_size}` | `ls -lAhS` | cluster_short; hidden is `-A` |
| 24 | last 50 lines of build.log | `file.tail{lines=N:int("50")}(paths="build.log")` | `tail -n 50 build.log` | |
| 25 | follow logs/server.log | `file.tail{follow}(paths="logs/server.log")` | `tail -f logs/server.log` | stdout endless |
| 26 | print lines 120 to 160 of src/cli.js | `file.lines{line_range=N:line_range("120 to 160")}(paths="src/cli.js")` | `sed -n '120,160p' src/cli.js` | script always quoted |
| 27 | last 5 commits, one line each | `git.log{oneline, max_count=N:int("5")}` | `git log --oneline -n 5` | |
| 28 | alice's commits since last week touching src | `git.log{author="alice", since=N:git_date("last week")}(paths="src")` | `git log --author=alice --since='1 week ago' -- src` | |
| 29 | last 10 commit messages mentioning fix, any case | `git.log{oneline, max_count=N:int("10"), grep_message="fix", ignore_case}` | `git log --oneline -n 10 --grep=fix -i` | |
| 30 | first 20 lines of the git log | `git.log \| file.head{lines=N:int("20")}` | `git log \| head -n 20` | kept as asked; lines ≠ commits |
| 31 | git log oneline piped to head 5 | `git.log{oneline} \| file.head{lines=N:int("5")}` | `git log --oneline \| head -n 5` | no fold |
| 32 | which files changed in HEAD~2 | `git.show{name_only}(rev="HEAD~2")` | `git show --name-only 'HEAD~2' --` | `~` quoted (zsh extendedglob); `--` forces a rev |
| 33 | what changed in package.json compared to main | `git.diff(rev="main", paths="package.json")` | `git diff main -- package.json` | |
| 34 | staged changes summary | `git.diff{staged, stat}` | `git diff --staged --stat` | |
| 35 | branches sorted by most recent commit | `git.branch{sort=C:-committerdate}` | `git branch --sort=-committerdate` | const value via eq |
| 36 | 10 most common lines in access.log | `freq(paths="access.log") \| file.head{lines=N:int("10")}` | `sort access.log \| uniq -c \| sort -rn \| head -n 10` | 2 IR stages, 4 commands |
| 37 | 10 most common ERROR lines in app.log | `text.search("ERROR","app.log") \| freq \| file.head{lines=N:int("10")}` | `rg ERROR app.log \| sort \| uniq -c \| sort -rn \| head -n 10` | |
| 38 | is redis running | `proc.list \| text.search("redis")` | `ps aux \| grep redis` | stdin filter realized as grep; the self-match line is stated in the gloss |
| 39 | what's listening on port 3000 | `port.who{port=N:port("3000"), listening}` | `lsof -nP -iTCP:3000 -sTCP:LISTEN` | |
| 40 | kill every process named node | `proc.kill(name="node")` | `pkill -x node` | **high**: confirm, never auto-run |
| 41 | force kill python | `proc.kill{signal=N:signal("force")}(name="python")` | `pkill -KILL -x python` | high; does not match `python3` (gloss) |
| 42 | just the response headers of https://api.example.com/health | `http.head(url="https://api.example.com/health")` | `curl -g -I https://api.example.com/health` | medium (network); `-g` always |
| 43 | get https://example.com/a?b=1&c=2 quietly | `http.get{silent}(url=…)` | `curl -g -s 'https://example.com/a?b=1&c=2'` | medium |
| 44 | download https://example.org/a.tar.gz | `http.download{remote_name}(url=…)` | `curl -g -f -L -O https://example.org/a.tar.gz` | medium; **high** if `./a.tar.gz` exists |
| 45 | version field from package.json | `json.select{raw}(filter=N:jq_path("version"), paths="package.json")` | `jq -r '.version' package.json` | |
| 46 | fetch api.github.com/repos/a/b and show stargazers_count | `http.get{silent}(url=N:url_scheme("api.github.com/repos/a/b")) \| json.select(filter=N:jq_path("stargazers_count"))` | `curl -g -s https://api.github.com/repos/a/b \| jq '.stargazers_count'` | medium; bytes→json; web cue `api.` + TLD `com` |
| 47 | in web, run lint and then the tests if it passes | `cwd="web"; npm.run(script="lint") && npm.test` | `cd ./web && npm run lint && npm test` | medium (exec_project); cwd must exist |
| 48 | run the tests and show only the last 20 lines of output | `npm.test[stderr=merge] \| file.tail{lines=N:int("20")}` | `npm test 2>&1 \| tail -n 20` | medium |
| 49 | top-level npm deps | `npm.ls{top_level}` | `npm ls --depth=0` | `top_level` is a bool mod rendering a fixed `--depth=0` |
| 50 | search for it in the logs folder | `UNDER missing:pattern` | **underspecified**, no command | "need: a search pattern" |
| 51 | show the last few lines of the log | `UNDER missing:file` | **underspecified** | "few" gives no int |
| 52 | show the previous commit | `rev_rel("previous commit")` does not parse | **gate_reject (ambiguous)** | HEAD or HEAD~1 |
| 53 | lines without error in app.log, but the model dropped `-v` | `text.search("error","app.log")` | **gate_reject** (polarity) | |
| 54 | last 3 lines of app.log, but the model chose head | `file.head{lines=3}("app.log")` | **gate_reject** (direction) | |
| 55 | kill whatever is using port 3000 | needs `lsof -t \| xargs kill`; `each` cannot carry `signal_proc` | **out_of_scope** (unsupported_construct) | A may answer |
| 56 | replace foo with bar in all js files | | **out_of_scope** (write_effect) | |
| 57 | sum the third column of data.csv | | **out_of_scope** (embedded_program) | awk |
| 58 | users older than 30 from users.json | | **out_of_scope** (embedded_program) | jq `select` |
| 59 | for each subfolder run npm install | | **out_of_scope** (control_flow) | |
| 60 | what's the capital of France | | **not_shell** | |

Rendering details for some of the examples:

- **#18 canonical order.** `exclude_dir` (prune group) comes before `type` and `size_gt`. The
  prune group is `-type d -name node_modules -prune -o`, and the terminal is `-print` because a
  prune group exists.
- **#22 action count.** `OK op:text.search SPAN mod:files_with_matches EACH op:file.count
  mod:lines EOS` is 8 actions. `-0`, `xargs -0 -r`, the trailing `--` and `.` are all compiler
  output.
- **#32.** The bare set excludes `~`, so the rev is quoted. `git show --name-only HEAD~2` would
  fail under zsh `extendedglob`.
- **#36 actions.** `OK MACRO:freq arg:paths SPAN PIPE op:file.head mod:lines norm:int EOS` is 9
  actions.

## 8. Hard cases, and what the pilot IR deliberately does not express

All of these are `out_of_scope` on the new path; A may still answer through a vetted intent.

1. **Embedded programs:** awk; sed beyond `-n 'A,Bp'`; jq beyond field paths/indexes (`select`,
   `map`, `|`, arithmetic); `node -e`, `python -c`, `perl -e`; free `find -exec`; `xargs -I{}`. A
   later sub-language (e.g. jq projection lists) must ship its own typed IR and verifier — never a
   free-text slot.
2. **Control flow and shell state:** loops, `if`, `||`, `;`, `&`, subshells, `$(…)`, `<(…)`,
   variables, `env X=1`, heredocs, brace expansion, live globs, `sudo`, `watch`.
3. **Writes:** `>`, `>>`, `tee`, `sed -i`, `sort -o`, uniq's output operand, `rm`/`mv`/`cp`, git
   write ops, `npm install`, `gh`. The only writer is `curl -o/-O`, with a runtime stat.
4. **Field processing:** `cut`, `sort -k`, column math, "top 10 IPs", `ps --sort` + `head` (header line).
5. **History references** ("that file", "same as before") stay in A's history/samebut machinery.
6. **Known traps, encoded as schema notes or gate rules:**

   | Trap | Handling |
   |---|---|
   | `rg -m` / `grep -m` count per file | schema note; "first N" → `\| head -n N` |
   | `git log -n` applies before `--reverse` | schema note, gloss |
   | `uniq` needs sorted input | `freq` macro, or an ADJACENT cue |
   | `ps aux \| grep x` matches its own grep line | tolerated, gloss |
   | `wc -l` prints a total line (several under xargs) | tolerated, gloss |
   | `pkill -x` matches the 15-char `comm` on Linux; `python` ≠ `python3` | `env_unsupported` / gloss |
   | `git diff --name-only` paths are relative to the repo top | env check before `each` |
   | rg's default `.gitignore`/hidden/binary filtering | always in the gloss |
   | `find -size` rounds up to the unit (`-size -1M` = empty files only; BSD differs) | sizes rendered in bytes (`c`) |
   | `npm test` → vitest/jest watch mode on a tty, single run in a pipe/agent; may never return | gloss; accepted risk (display-only) |

7. **Ambiguous scope.** "search src and tests for X but only ts files": mods apply to the whole
   stage, stated in the gloss. "search for foo in tests" (directory or `*test*` files?): if the
   directory exists the env probe resolves it, otherwise `ambiguous`. "diff vs main": the IR
   renders exactly `git diff main`; `main...HEAD` only as a rev range the user typed.
8. **Unicode homoglyphs** in paths are copied byte-exactly and shown in the gloss; bidi and
   zero-width characters give `unsafe_value`.

## 9. Sharing the gate with A, and catalog migration

**One candidate interface.** Every route produces `Candidate{route: A|P|D, ir | opaque, scores}`
and goes through the §6 gate.

**Lowering.** Render each catalog template with sentinel slot values and run the §5.5 decompiler;
sentinels map back to typed holes. An intent that decompiles becomes **IR-backed**
(`intent → IR with holes`): A's tagger spans fill the holes as copied spans, and A's numeric/size
normalizations must be on the §6.2 list. Mods fixed by the reviewed template (e.g. `-i` in
`-iname`) are marked `template_default` and are exempt from the cue-presence direction of §6.3;
every other obligation applies. A tool the template fixes but the request does not name becomes a
`template_pin` marker, not `pin`: rendering honors it, canonical comparison ignores it.

| Intent | Template | IR |
|---|---|---|
| `grep_text` | `grep -rn«--include={glob}» -- {pattern} {path}` | `text.search[template_pin=grep]{line_number, name_glob=$glob?}(pattern=$pattern, paths=$path)` |
| `grep_files_containing` | `grep -rl«--include={glob}» -- {pattern} {path}` | as above with `files_with_matches` |
| `git_log` | `git log --oneline --graph --decorate -n {count}` | `git.log{oneline, graph, decorate, max_count=$count}` |
| `count_files` | `find {path} -type f«-iname {glob}» \| wc -l` | `files.find{type=f, name_glob=$glob?, ignore_case iff $glob}($path) \| file.count{lines}` |
| `find_larger_than` | `find {path} -type f -size +{size}«-iname {glob}» -exec ls -lh {} +` | `files.find{type=f, size_gt=$size, …} \| each(dir.list{long, human})` |
| `sort_uniq` | `sort {file} \| uniq -c \| sort -rn \| head -n {count}` | example #36 |
| `tail_follow`, `git_diff_staged`, `git_show_files` | `tail -f {file}`, `git diff --staged`, `git show --stat {rev}` | `file.tail{follow}`, `git.diff{staged}`, `git.show{stat}(rev=$rev)` |

**Equivalence test.** Byte equality is *not* required (templates always emit `--` and cluster
`-rn`; the compiler emits `--` only when needed). Required instead: `decompile(template_render) ==
lowered IR` for every slot fixture, and identical behavior of both argvs on the fixture tree under
the PATH shim. A difference is either a legacy bug (fixed deliberately) or a schema gap.

**Opaque intents** — those that do not decompile: `largest_files` (`du`, `sort -rh`),
`recent_files` (`-printf`, `stat -f`), `duplicate_files` (awk) — are a *temporary, tracked*
state that must shrink per release. They skip the schema and round-trip checks (reviewed
`render.js` quotes them) but still pass slot provenance, the polarity/number/cue/named-value
obligations, the environment check and `danger.js`.

**Risk audit.** For IR-backed intents `risk = max(catalog risk, effect-derived risk)`; CI lists
every intent whose catalog risk is *below* its derived risk.

**Arbitration:**

| Situation | Result |
|---|---|
| A accepted, System 1 abstains | A |
| Both accepted, same canonical IR | A's render; agreement feeds confidence |
| Both accepted, **different** IR | **disagree** (abstain), or A alone if A clears its standalone high-precision threshold. System 1's alternative is never offered as a second runnable option; the case goes to the review queue |
| A abstains or its OOC veto fires; System 1 clears its (route, tier) threshold | System 1: shown, never auto-run |
| PL request | A only, separately calibrated. IR and compiler are language-neutral; cue lexicons are per-language data |

**Migration order.** Phase 0: opaque adapter for all ~300 intents; gate live for A in shadow mode
(rejections logged, no behavior change). Phase 1: lower the pilot-family intents (estimate 40–60%
decompile); A gains round-trip and effect-derived risk. Phase 2: A's classifier label becomes
`op + default mods`; A's slot tagger output becomes `unit_role` training data. Phase 3: retire an
IR-backed template when System 1 + gate matches or beats A on that intent's eval slice. **The
catalog stops growing**: a new hand template is accepted only for a construct the IR cannot express
(catalog-038: 2 of 11 survived). fish/pwsh/cmd stay on legacy templates until their backends pass
the shim harness.

## 10. Data, evaluation, and staying off the treadmill

**Sources.** Real skeletons (private, processed on aic-grok, aggregates only) are decompiled into
IR with typed holes. They yield the priors P(op), P(mod | op), pairwise co-occurrence,
P(next stage | stage, stream), P(cwd), P(stderr); the **coverage ceiling** (share that parses); and
the ranked parse-failure list. The next schema addition is chosen by greedy set-cover over parse
failures (the one mod/op/macro that unblocks the most chains), never one complaint at a time. A new
macro must cover ≥1% of parsed chains; cap 10.

| Sampler element | How it is drawn |
|---|---|
| op | 70% empirical prior, 30% sqrt-flattened |
| modifier-set size k | 0/1/2/3/4 at 25/35/25/12/3% |
| modifiers | pairwise prior 80%, uniform over legal 20%; reject illegal and no-op combinations |
| pipes | typed transition matrix; agent idioms (`\| head`, `\| tail`, `2>&1 \| tail`, `\| wc -l`, `\| grep`, `freq`) at their real share |
| values | realistic pools; ~5% adversarial (quotes, `$`, `;`, `*`, leading `-`, spaces, Unicode) |
| minimal-pair siblings | 30% of IRs get one sibling (mod flip, negation, head↔tail, role swap, per-file vs global limit, op swap in family), written **in the same teacher call** |

**Teacher pipeline.** (1) The teacher gets IR + render + schema card and writes 4–6 EN requests
(plain, colloquial, terse, typo, agent-style, contrastive). (2) **Values must be copied
verbatim**: spans are found by exact match or the normalizer must map the phrase; failing rows are
**dropped, never repaired**. (3) A **blind reverse teacher** sees only request, env and schema
cards and emits IR; canonical IRs must match; disagreements go to a diagnostic set. (4) 5%
behavioral spot checks on fixtures. (5) Negatives: OOS from skeletons that fail the parser
(labeled with reason); UNDER by blurring one required value into a pronoun (`missing:<role>`);
NOT_SHELL from existing OOD sets; gate-negative rows from the obligations (dropped `-v`,
head↔tail, invented `-i`). (6) Splits by source session and IR family (op + mod set + shape)
**before** paraphrasing.

**Volume and training.** ≈120–200k checked rows (≈25k distinct IRs × 5 plus ≈30k negatives);
teacher + reverse-check throughput is the bottleneck, not GPU time. Encoder initialized from S;
several seeds for calibration stability. Week 1: encoder + heads (ships the fast path); week 2:
decoder.

**Evaluation** (frozen, c2/c3): 4k deployment-weighted; 2k unseen combinations of known ops/mods;
2k contrastive/ambiguous/unsupported/hazardous; ≈500 human-written, reported separately. Primary
metric: correct accepted answers / all requests at a one-sided 95% upper bound ≤0.5% wrong-runnable
among accepted, CIs clustered by AST family, per route and tier. Also: abstention quality (correct
OOS/UNDER/NOT_SHELL; supported requests wrongly abstained) and latency p95 ≤400 ms / p99 ≤500 ms per
route on M1 and the Xeon VM.

| Treadmill check | Target |
|---|---|
| New per-combination rules per schema PR | **0** |
| Rules per 100 newly covered real skeletons | falling |
| c2 test after each schema batch: unseen combinations correct with zero new rules | ≥ 30/40 |
| Cross-tool reuse: global mods used by ≥2 ops ÷ all mods | ≥ 40% |

If new combinations keep needing bespoke obligations, the architectural premise has failed — report
it, do not patch it.

### 10.1 Synthetic data pipeline (implemented; details in `scripts/ir/README.md`)

1. `scripts/ir/grok_gen.mjs` asks a teacher for labelled requests + commands (`ok`, `ambiguous`,
   `underspecified`, `out_of_scope`, `not_shell`) with structured output. Backends (`--backend`):
   `grok` (CLI, default), `codex` (CLI), `claude` (CLI `-p`), `api` (Anthropic Messages API, 429
   backoff). Each call samples a fresh subset of `value_pools.mjs` (files, dirs, identifiers, revs,
   URLs, ports, …), so values are copied, not invented by habit.
2. `scripts/ir/convert.mjs <dir>`: decompile each command, `lift` (`ir/lib/lift.js`) every value
   back to a span / norm / const against the request, then run the full gate with round-trip.
   Status `accepted | rejected | mismatch | decompile_error | not_ok`; only `accepted` is kept.
3. `scripts/ir/dedup.mjs`: exact and MinHash near-dup removal, a cap per IR skeleton (IR with spans
   and literal strings removed), label balance, and a ~90/5/5 split **by skeleton hash** (dev/test
   skeletons never appear in train); non-ok items split by request hash.
