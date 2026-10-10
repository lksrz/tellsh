Reading additional input from stdin...
OpenAI Codex v0.160.0
--------
workdir: /workspace/tellsh
model: gpt-6-astra
provider: openai
approval: never
sandbox: read-only
reasoning effort: high
reasoning summaries: none
session id: 01a124cf-e6b6-7c63-af2e-ecad87f1d4e1
--------
user
Full code review of this repo (tellsh, offline NL->shell CLI): BOTH runtime (src/, bin/) AND training/data-generation code (scripts/, data generation, Jev teacher, eval/bench validity, held-out leakage). Read-only, do NOT modify files. List findings with severity blocker/major/minor and file:line. End with exactly one line 'VERDICT: APPROVE' (only if no blocker/major) or 'VERDICT: REQUEST_CHANGES'.
codex
I’ll review the runtime and training pipeline, including data generation, the Jev teacher, evaluation validity, and held-out leakage. I’ll keep the repo unchanged and report findings with severity and file/line references.
exec
/bin/bash -lc "pwd && rg --files -g 'AGENTS.md' -g '"'!node_modules'"' -g '"'!vendor'"' -g '"'!dist'"' -g '"'!*.lock'"' -g '"'!data/**'"' -g '"'!models/**'"' -g '"'!*.jsonl'"' -g '"'!*.csv'"' -g '"'!*.parquet'"' -g '"'!*.safetensors'"' -g '"'!*.bin'"' -g '"'!*.pt'"' -g '"'!*.gguf'"' -g '"'!*.json'"' -g '"'!*.txt'"' -g '"'!*.md'"'" in /workspace/tellsh
 exited 1 in 0ms:
/workspace/tellsh

exec
/bin/bash -lc "rg --files -g 'AGENTS.md' -g '*.md' -g '*test*' -g 'package.json' -g 'pyproject.toml' -g 'Cargo.toml' -g 'requirements*' -g 'Makefile' -g '.gitignore'" in /workspace/tellsh
 succeeded in 0ms:
test/regressions.test.js
test/parity.test.js
test/shells.test.js
test/pipeline.test.js
test/danger.test.js
test/cli.test.js
test/slots.test.js
test/templates.test.js
README.md
DATA_LICENSES.md
package.json
review/r1-codex.md
review/r1-claude.md
EVAL.md
.gitignore
data/tldr/README.md

exec
/bin/bash -lc "ls -la; rg --files --hidden -g '"'!.git/**'"' -g '"'!node_modules/**'"'" in /workspace/tellsh
 succeeded in 0ms:
total 136
drwxr-xr-x 11 box box  4096 Oct 10 09:56 .
drwxr-xr-x  1 box box 45056 Oct 10 09:56 ..
drwxr-xr-x  8 box box  4096 Oct 10 08:45 .git
-rw-r--r--  1 box box    71 Oct 10 07:33 .gitignore
-rw-r--r--  1 box box  2528 Oct 10 08:13 DATA_LICENSES.md
-rw-r--r--  1 box box 10589 Oct 10 08:42 EVAL.md
-rw-r--r--  1 box box  1062 Oct 10 07:21 LICENSE
-rw-r--r--  1 box box 18335 Oct 10 08:43 README.md
drwxr-xr-x  2 box box  4096 Oct 10 07:20 bin
drwxr-xr-x  2 box box  4096 Oct 10 08:13 build
drwxr-xr-x 11 box box  4096 Oct 10 08:11 data
drwxr-xr-x  2 box box  4096 Oct 10 08:10 model
-rw-r--r--  1 box box  2014 Oct 10 08:13 package.json
drwxr-xr-x  2 box box  4096 Oct 10 09:56 review
drwxr-xr-x  3 box box  4096 Oct 10 08:41 scripts
drwxr-xr-x  2 box box  4096 Oct 10 08:41 src
drwxr-xr-x  3 box box  4096 Oct 10 08:41 test
LICENSE
test/slot-cases.js
test/fixtures/parity.json
test/regressions.test.js
test/parity.test.js
test/shells.test.js
test/pipeline.test.js
test/danger.test.js
test/cli.test.js
test/slots.test.js
test/templates.test.js
README.md
data/ood_eval.jsonl
data/intents/g05.jsonl
data/intents/g00.jsonl
data/intents/g03.jsonl
data/intents/g01.jsonl
data/intents/g04.jsonl
data/intents/g02.jsonl
data/teacher/decisions.jsonl
data/teacher/review.jsonl
data/compose/eval.jsonl
data/shell/train.jsonl
data/shell/eval.jsonl
data/ood.jsonl
data/history/eval.jsonl
data/tldr/README.md
scripts/gen_data.js
data/tldr/tools.jsonl
data/tldr/flags.jsonl
EVAL.md
data/eval/e00.jsonl
data/eval/e01.jsonl
data/eval/e02.jsonl
.gitignore
scripts/build_triggers.js
scripts/bench.js
scripts/check_variants.js
scripts/eval.js
scripts/tldr_ingest.py
DATA_LICENSES.md
package.json
scripts/train.py
scripts/teacher.js
scripts/report.js
scripts/lib/cmdnorm.js
scripts/lib/pwsh_parse.js
scripts/lib/silver.js
data/slots/gold.jsonl
model/compose_explained.json
model/model.bin
model/tldr_triggers.json
src/compose.js
src/cli.js
review/r1-claude.md
review/r1-codex.md
src/variants.js
src/danger.js
src/render.js
src/shellwords.js
src/features.js
src/classifier.js
src/pipeline.js
src/catalog.js
src/cascade.js
src/env.js
src/fill.js
src/history.js
src/model.js
src/slots.js
src/tagger.js
src/tools.js
bin/tellsh.js

exec
/bin/bash -lc 'git status --short; cat package.json; cat README.md; cat EVAL.md' in /workspace/tellsh
 succeeded in 0ms:
?? review/
{
  "name": "tellsh",
  "version": "0.2.0",
  "description": "Offline natural-language (Polish & English) to shell command CLI: tool->intent->slot cascade of tiny linear models + templates for bash/zsh/sh/PowerShell (fish/cmd best effort). No LLM at runtime, zero dependencies.",
  "type": "module",
  "bin": {
    "tellsh": "bin/tellsh.js"
  },
  "main": "src/cli.js",
  "exports": {
    ".": "./src/cli.js",
    "./pipeline": "./src/pipeline.js",
    "./classifier": "./src/classifier.js",
    "./cascade": "./src/cascade.js",
    "./tagger": "./src/tagger.js",
    "./fill": "./src/fill.js",
    "./slots": "./src/slots.js",
    "./danger": "./src/danger.js",
    "./catalog": "./src/catalog.js",
    "./history": "./src/history.js",
    "./env": "./src/env.js",
    "./compose": "./src/compose.js",
    "./package.json": "./package.json"
  },
  "files": [
    "bin/tellsh.js",
    "src/*.js",
    "model/model.bin",
    "model/tldr_triggers.json",
    "model/compose_explained.json",
    "README.md",
    "DATA_LICENSES.md",
    "LICENSE"
  ],
  "engines": {
    "node": ">=18"
  },
  "scripts": {
    "test": "node --test test/",
    "gen-data": "node scripts/gen_data.js",
    "train": "node scripts/gen_data.js && python3 scripts/train.py && node scripts/build_triggers.js",
    "tldr": "python3 -I scripts/tldr_ingest.py",
    "teacher": "node scripts/teacher.js",
    "eval": "node scripts/eval.js",
    "bench": "taskset -c 0 node scripts/bench.js",
    "prepack": "node -e \"for (const f of ['model/model.bin','model/tldr_triggers.json','model/compose_explained.json']) require('fs').statSync(f)\""
  },
  "keywords": [
    "cli",
    "bash",
    "shell",
    "natural-language",
    "nl2bash",
    "offline",
    "polish",
    "intent-classification",
    "terminal",
    "powershell",
    "zsh",
    "slot-filling"
  ],
  "author": "lksrz <lukasz@wearfits.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/lksrz/tellsh.git"
  },
  "dependencies": {}
}
# tellsh

**Say what you want in Polish or English, get the shell command — for bash, zsh, sh, PowerShell (fish and cmd
best effort).** Fully offline, zero runtime dependencies, no generative model at runtime: a fast "System 1" reflex.
A cascade of tiny linear models picks the **tool**, then the **intent**, then tags the **slots** (paths, sizes,
ports, names, …); a vetted, safely quoted template is rendered for *your* shell and OS. Requests outside the
catalog fall back to an experimental flag composer that is always clearly marked and never auto-runs.

```console
$ tellsh pokaż 5 największych plików w '~/Pobrane'
$ find ~/Pobrane -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 5
  largest_files · bash/linux · risk: safe · confidence: 99%

PS> tellsh pokaż 5 największych plików w '~/Pobrane'
PS> Get-ChildItem -LiteralPath "$HOME/Pobrane" -File -Recurse -Force -ErrorAction SilentlyContinue | Sort-Object Length -Descending | Select-Object -First 5 -Property Length, FullName
  largest_files · powershell/win32 · risk: safe · confidence: 99%

$ tellsh show the 3 largest folders in /var            # macOS, BSD userland: no `sort -h`
$ du -k -d 1 /var 2>/dev/null | sort -rn | head -n 3

$ docker run -d --name web nginx
$ tellsh --history logi tego kontenera
$ docker logs --tail 100 -f web
  docker_logs · bash/linux · risk: safe · confidence: 94%
  ↺ from history: "container" from history = web

$ tellsh list files sorted by modification time, oldest first, with details
$ ls -l -t -r
  composed (experimental) ls · bash/linux · risk: medium · confidence: 100%
  ~ assembled from a flag vocabulary (request asks for -t -r not in the catalog command); check it carefully
Experimental. Type "yes" to run, e to edit, anything else aborts:
```

## Install

```bash
npm i -g tellsh        # then: tellsh <request...>
npx tellsh df          # one-off, no install
```

Node ≥ 18, no dependencies, no network after install (except for intents that use the network themselves).
Offline install: `npm pack` → copy `tellsh-0.2.0.tgz` (~1.1 MB) → `npm i -g ./tellsh-0.2.0.tgz`.

## Usage

```
tellsh [options] <request...>

  -n, --dry-run        print the command only, never run it
  -y, --yes            run without prompting (only risk=safe commands straight from the catalog; never
                       history-resolved, composed, incomplete or medium/high-risk ones)
  -e, --explain        tool/intent scores, slots and where each slot came from (tagger/regex/history)
      --json           machine-readable output (implies --dry-run)
      --shell <s>      bash | zsh | sh | powershell | fish | cmd   (default: detected)
      --os <o>         linux | darwin | win32                      (default: this machine; --platform = alias)
      --history[=FILE] resolve "it", "that container", "same for /var" from the last ~10 history lines
      --compose / --no-compose   force / disable the experimental composer
      --top <k>, --threshold <p>, -v/--version, -h/--help
```

At the prompt: **Enter** runs, **e** edits (prefilled readline), **n** aborts. High-risk and composed commands need
`yes`; catastrophic patterns (`rm -rf /`, `mkfs`, `Format-Volume`, …) need the whole command retyped. The command
runs in the target shell (`$SHELL -c`, `fish -c`, `pwsh -NoProfile -Command`, `cmd /d /s /c`). Without a TTY tellsh
only prints. Exit codes: command's own · `0` printed · `2` usage · `3` not understood · `4` `--yes` refused ·
`5` no rendering for this shell · `130` aborted.

## How it works

```
                      ┌──────────── env: shell / OS / coreutils (GNU, BSD, busybox) ─────────────┐
 request ─► normalise │  ctx: history entities + cwd (--history, in memory only)                 │
   │                  └───────── tokens  shell=zsh os=darwin ctx_last=container ctx_tool=docker ─┘
   │                                              │ (classifier features)
   │   history rules ──────────────► "same for X" / "delete it" / "same but …" (deterministic)
   ▼                                              ▼
 STAGE 1  tool family  p(tool)  ── top-3 ──►  STAGE 2  intent per tool  p(intent | tool)
 (55 classes incl. __none__;                   score = p(tool) · p(intent | tool), best over the 3 tools
  PowerShell/cmd verbs → same family)          (recovers stage-1 mistakes)
   │                                              │
   │                         score < threshold ───┼──► SECOND PASS: flag composer (experimental)
   │                         or ≥1 unexplained    │    head from stage-1 tools · flags from NL triggers
   │                         modifier             │    (+ tldr stems) · bash -n + allowed-flag check
   ▼                                              ▼    · risk ≥ medium · explicit "yes"
 STAGE 3  BIO slot tagger (tool = input feature, only the tool's slot types are candidates,
          constrained Viterbi)  ──► typed spans ──► validate ──► regex extractor fills misses / replaces
          invalid values  ──► template for (shell, OS, coreutils) ──► per-shell quoting
          ──► danger checker (POSIX + PowerShell + cmd patterns, escalate only) ──► confirm ──► run
```

* **Features** (`src/features.js`, the single implementation used both by `scripts/gen_data.js` for training and at
  runtime): stemmed word uni/bigrams, character 3–5-grams, plus context tokens `shell=…`, `os=…`, `ctx_…`, all hashed
  (FNV-1a, 2^18). Tagger features per token: word, stem, shape, prefix/suffix, ±2 neighbours, quote/path/number
  cues, gazetteers (process/service names, extensions, units), and the tool family (alone and crossed with the word).
* **Models** (`scripts/train.py`, scikit-learn at build time only): multinomial logistic regression for the tool model,
  one per family with >1 intent (30), and a token-level BIO model (27 labels: `PATH SIZE EXT PORT TIME NAME NUM URL HOST
  BRANCH PATTERN REPL USER MODE MSG VAR PID TEXT`). Top-K feature rows by weight norm are kept, models are refit on
  them and quantised to int8; everything ships in one `model/model.bin` (**~2.7 MB**, loaded with a binary-searched row
  index in a few ms). Thresholds (accept, compose) are calibrated on a group-wise holdout + out-of-domain data.
* **Training data** (`scripts/gen_data.js`): ~9.3k EN/PL paraphrases (+ typo copies), ~1k shell-phrased requests
  (cmdlets, `dir /s`, Windows paths, …), 1.7k tldr-pages descriptions (stage 1 only), out-of-domain chit-chat as
  `__none__`, and synthetic history anaphora with `ctx_` features. **Tagger data** is generated by delexicalising every
  paraphrase with the gold intent's slots (silver spans from the regex extractor) and re-filling the spans with values
  from pools — 28k tagged sequences. Eval values come from separate held-out pools.
* **Slots**: the tagger is primary; every value is validated (paths not generic nouns, ports 1–65535, branch/user
  syntax, …). If the tagger misses a slot or its value fails validation, the v0.1 regex extractor fills/wins. Values are
  normalised by the same parsers (`~/Pobrane`, "katalog domowy" → `~`, "1,5 GB" → `1536M`, "ostatnie 2 godziny" → 120 min).

### Shells and operating systems

The intent and slots are shared; only the rendering differs (`src/render.js`, variants in `src/variants.js`).

| shell | status | notes |
|---|---|---|
| bash, zsh | **v1** | all 149 intents; every render passes `bash -n` in tests (zsh has no checker here) |
| sh (dash / busybox) | **v1** | POSIX-only templates; tests run `sh -n` (dash) and `busybox sh -n`; busybox variants for 24 intents (no `ps --sort`, `find -printf`, …) |
| PowerShell (7, mostly 5.1) | **v1** | real cmdlets (`Get-ChildItem`, `Get-Process`, `Stop-Process`, `Get-NetTCPConnection`, …) for 146/149 on Windows; on Linux/macOS native tools or `bash -c '…'`; gaps: chmod, chmod +x, cal on Windows |
| fish | best effort | POSIX template with fish quoting + fish overrides (`string join \n $PATH`, history, …); not syntax-checked (fish not installed in CI) |
| cmd.exe | best effort | 117/149 (`dir /s /b`, `tasklist`, `taskkill`, `netstat -ano | findstr`, `certutil -hashfile`, …); the rest reports a gap (exit 5) |

* **macOS** = BSD userland unless Homebrew GNU coreutils (`gdu` + `gsort`) are on `PATH`: `du -k … | sort -rn` instead of
  `sort -h`, `sed -i ''`, `stat -f`, `md5 -r`, `lsof` instead of `ss`, `vm_stat`, `launchctl`/`brew services`, …
* **Detection** (`src/env.js`): parent process chain on Linux (`/proc`), PowerShell heuristic on Windows (`PSModulePath`),
  `$SHELL`, `TELLSH_SHELL`; `--shell` / `--os` override. `--shell cmd` implies Windows.

### History context

`--history` (or `TELLSH_HISTORY=1`) reads the **tail** (last 32 KB) of `$HISTFILE` / `~/.bash_history` /
`~/.zsh_history` (extended format and zsh metafication handled) / fish history / PSReadLine
`ConsoleHost_history.txt`, keeps the last 10 commands **in memory for this one request** and never prints, logs or
stores them. Earlier `tellsh <query>` lines are re-interpreted, raw commands are parsed (template inversion + per-tool
rules: `docker run --name`, `systemctl … X`, `kill N`, `ps -p N`, `lsof -i :P`, `git checkout`, file arguments, …).
Lines are split with a shell-aware tokenizer (`a\ b.txt`, quoted `;`/`|`, redirections; PowerShell `''`/backtick
escapes and native cmdlets such as `Get-Content -LiteralPath`, `Remove-Item`, `Stop-Process -Id`, `Restart-Service`).
If the latest value of the referenced type depends on the shell state (`cat $F`, `rm *.log`), comes from a line that
cannot be parsed, or from an unknown command naming a path, the reference is **refused** (the slot stays a
placeholder) rather than resolved to an older value.

* deterministic rules: "same for /var" / "to samo dla /var" (previous intent, one slot replaced), "delete it" /
  "usuń to", "logs of that container" / "logi tego kontenera", "kill it" / "zabij go" (verb × entity type table; a
  noun in the request picks the entity type; a named part like "that release branch" picks the value; the checked-out
  branch is never the one deleted), "same but only file names" / "to samo ale tylko nazwy plików" (previous tool,
  new intent, slots carried over), and missing required slots filled from history ("ile ma słów" after `cat raport.txt`);
* `ctx_last=…`, `ctx_has=…`, `ctx_tool=…`, `ctx_cwd=git|compose` tokens are classifier features (trained on synthetic
  anaphora), so un-ruled paraphrases still benefit.

Gap: bash appends to `~/.bash_history` only when the shell exits unless you set `PROMPT_COMMAND='history -a'`
(zsh with `INC_APPEND_HISTORY`/`SHARE_HISTORY`, fish and PSReadLine write immediately).

### Second pass: composer (experimental)

`src/compose.js` has a closed vocabulary for 17 tools (ls, find, grep, du, df, ps, tar, sort, head, tail, wc,
git log/branch/diff/status, docker ps/images, ss, journalctl, curl, chmod): each flag has EN/PL trigger stems, plus
weak evidence from tldr-pages flag descriptions. It runs when the cascade is below threshold (and stage 1 is
confident it is a shell task), or when the request asks for a flag the catalog command lacks — "unexplained" means the
trigger does not occur in ≥5% of that intent's own training paraphrases (`model/compose_explained.json`), so "hidden"
does not re-route `hidden_files`. Value flags (`-n 5`, `-maxdepth 2`, `-t ext4`, `-k 2 -t ,`, `--since`), tar
compression from the archive name, `bash -n` and an allowed-flag check validate the result; it is always
**risk ≥ medium, shown as "composed (experimental)", needs an explicit `yes` and is refused by `--yes`**. POSIX shells only.

## Safety model

* Every intent has a base risk: **safe** (read-only), **medium** (modifies state: archives, git checkout/pull/stash,
  chmod, mv, sudo, …), **high** (destructive: rm, kill, prune, discard). v0.2 raised 10 intents from safe to medium after
  the teacher review (see `EVAL.md`).
* `src/danger.js` scans the **final** command — also edited ones — and can only escalate. It tokenizes each simple
  command (quotes, `--`, long options, `sudo`/`xargs`/`env` wrappers, `bash -c '…'`/`eval`/`'…' | bash` payloads) and
  strips `git`/`docker` global options (`git -C dir -c k=v reset --hard` = `git reset --hard`). POSIX: `rm -rf` /
  `rm --recursive --force` on `/`, `~`, `~/*`, `"/"`, `/usr`, …, `mkfs`, `dd of=/dev/…`, fork bombs, `curl | sh`,
  `bash <(curl …)`, `sh -c "$(curl …)"`, force-push (incl. `+branch`), redirects into `/etc` (`>>`, `1>`, `&>`),
  `kill -1`/PID 1 (but not `kill -1 PID` = SIGHUP, and not `docker run --rm`); PowerShell: `Remove-Item`/`ri`/`rm`/`del`
  `-Recurse` on a drive root (`C:\`, `C:/`), home or `*`, `Stop-Process`, `Format-Volume`, `iwr | iex`, `iex (iwr …)`,
  `Set-ExecutionPolicy`, …; cmd: `rd /s`/`del /s` on a root or `%USERPROFILE%`, `del`, `taskkill`, `format`.
* Quoting per shell, every value inserted exactly once (a value containing `{file}` stays text): POSIX `'…'\''…'`
  (a leading `=` is always quoted for zsh), fish `\'`/`\\`, PowerShell always a single-quoted string with **every**
  single-quote character doubled — PowerShell also treats `‘ ’ ‚ ‛` as quotes — and `"$HOME/…"` for `~` with
  `` ` $ " “ ” „ `` escaped; cmd `"…"`, and values containing `%`, `!` or `"` (which cmd expands or cannot escape)
  are refused for cmd (reported as a gap). On Linux/macOS PowerShell without a native variant the POSIX command runs
  as `bash -c '…'`, or is piped to `bash` when it contains `"` (PowerShell < 7.3 drops embedded `"` in native args).
* Raw slots (numbers, find flags) are validated before insertion; paths starting with `-` get `./`; other values
  (names, hosts, URLs, containers, …) may not start with `-`, and URLs must be `scheme://…` or `user@host:path`.
  Values taken from history pass the same validation.
* `--yes` only runs `safe` commands that come straight from the catalog: never history-resolved, composed, incomplete
  or medium/high-risk ones. Non-TTY use prints only.

## Accuracy & speed (details: [EVAL.md](EVAL.md))

All numbers are on held-out data never used for training (`npm run eval`, `npm run bench`):

| metric | result |
|---|---|
| stage 1 tool family top-1 / top-3 (`data/eval`, 2384 EN+PL) | **96.9% / 99.7%** |
| stage 2 intent top-1 (EN / PL) | **95.2%** (95.3% / 95.1%); v0.1 flat classifier: 95.2% |
| per shell, intent top-1 (bash · zsh · sh · PowerShell · fish · cmd) | 95.2 · 95.5 · 95.0 · 94.8 · 95.1 · 94.6% |
| renders passing `bash -n` / `sh -n` | 148/148 bash · zsh · sh (+ all 149 intents × 5 POSIX envs in `npm test`) |
| slot F1, hand-annotated gold (tagger + regex fallback / tagger / regex) | **95.7%** / 94.2% / 94.5% |
| end-to-end exact command, relexicalised held-out values (full pipeline / gold intent) | **82.8%** / 92.2% |
| hand-written slot cases, exact command | 99/99 |
| history references, exact command (48 EN+PL; without history 0%) | **97.9%** (dev set, blind first run 60.4%) |
| composer on out-of-catalogue requests: acceptable / exact | 29.4% / 27.5% (blind first run 3.9%) · any answer acceptable 31.4% · false fires on catalog requests 0.7% |
| out-of-domain rejected | 92.4% |
| model size | **2.71 MB** (v0.1: 3.68 MB) |
| latency, `taskset -c 0`: cold process p50 / p95 | **159 / 190 ms** (bare `node -e 0`: 104 ms) |
| latency, warm full cascade + tagger + render p50 / p95 | **0.31 / 2.2 ms** |

## Data & licenses

Own EN/PL data (MIT) + **tldr-pages** (CC-BY-4.0, attribution in [DATA_LICENSES.md](DATA_LICENSES.md); derived
descriptions only, in git, never in the npm tarball). **NL2Bash is GPL-3.0 and is not used** (not even for eval).
The optional **TypeSafe Jev** teacher is build-time only (300 calls, < $0.01).

## Development

```bash
npm test                         # node:test — parity, cascade, tagger, history, composer, per-shell syntax, CLI
npm run train                    # node scripts/gen_data.js && python3 scripts/train.py && node scripts/build_triggers.js
npm run eval                     # all metrics -> EVAL.md
npm run bench                    # latency (taskset -c 0) -> EVAL.md
python3 -I scripts/tldr_ingest.py    # rebuild data/tldr from a clone in data/external/tldr
TYPESAFE_API_KEY=… node scripts/teacher.js --calls=300   # optional teacher review -> data/teacher/review.jsonl
node scripts/check_variants.js   # lint per-shell variants
```

Training needs Python 3 with numpy, scipy and scikit-learn (≈6 min on 8 cores). Data layout: `data/intents` (train),
`data/eval` (held out), `data/shell/{train,eval}.jsonl` (shell-tagged), `data/history/eval.jsonl`,
`data/compose/eval.jsonl`, `data/slots/gold.jsonl` (hand-annotated spans), `data/ood*.jsonl`, `data/tldr/*.jsonl`,
`data/teacher/*.jsonl`. `gen_data.js` drops any training sentence that collides with any eval set.

To add an intent: template in `src/catalog.js` (+ shell variants in `src/variants.js`), family in `src/tools.js`,
~60 paraphrases in `data/intents/`, ~16 in `data/eval/`; retrain; `npm test && npm run eval`.

## Known gaps

* fish / cmd renders are not syntax-checked here (no fish/pwsh in CI); PowerShell variants are hand-written and only
  linted structurally — `pwsh` parser checks run automatically where `pwsh` is installed.
* zsh is validated with `bash -n` (no zsh in CI); zsh-only behaviour (e.g. `NOMATCH` on unquoted globs) is avoided by quoting.
* busybox: variants are based on Debian's busybox applet set; Alpine builds may differ.
* History: bash writes history late (see above); references are resolved to the most recent matching entity, there is no
  multi-turn memory of tellsh's own suggestions beyond the history file.
* Composer: closed vocabulary, POSIX only, no pipelines, no `--format`/`-o` style arguments; it is a safety net, not a generator.
* Slot F1 gold set is small (208 requests); relexicalised end-to-end numbers use silver spans for unreplaced values.

## License

MIT (code). Model weights partly derived from tldr-pages (CC-BY-4.0) — see [DATA_LICENSES.md](DATA_LICENSES.md).
# tellsh evaluation (v0.2)

Generated by `npm run eval`, `npm run bench` and `node scripts/teacher.js` (teacher section).

**Post-review update (2026-10-10).** Two code reviews of v0.2 found command-injection bugs (optional template
segments were substituted twice; PowerShell typographic quotes were not escaped), danger-checker gaps, history
references that could pick the wrong or a stale target, and an over-lenient eval comparison. All were fixed with
regression tests (`test/regressions.test.js`). The model was **not** retrained; the classifier numbers are unchanged.
What moved: composer "any answer acceptable" 33.3% → 31.4% (stricter command comparison), e2e EN given gold intent
91.2% → 91.4%; history references stay at 97.9% with two gold commands updated for `kill_by_port -sTCP:LISTEN`.

<!-- eval:start -->
## Model

`model/model.bin` **2.71 MB** (int8 weights, TSH2): stage 1 tool model 20000 rows × 55 classes (54 tool families + `__none__`), 30 stage-2 intent models (469250 weights), tagger 24000 rows × 27 BIO labels. Trained 2026-10-10 on 25562 classifier rows and 28232 tagged sequences. Thresholds: accept **0.365** (cascade score), compose **0.69** (stage-1 tool p). Internal holdout during training: tool top-1 92.5%, top-3 98.3%, intent 85.5%.

## 1. Cascade accuracy per stage (held-out `data/eval`, shell=bash os=linux)

2384 sentences written independently of the training data (training sentences colliding with any eval set are dropped by `gen_data.js`).
Stage 1 = tool family (top-1 / top-3); stage 2 = intent after p(tool)·p(intent|tool) over the top-3 tools.

| split | n | tool top-1 | tool top-3 | intent top-1 | intent top-3 | answered (p ≥ thr) | precision when answered |
|---|---|---|---|---|---|---|---|
| ALL | 2384 | 96.9% | 99.7% | 95.2% | 99.2% | 97.7% | 96.3% |
| EN | 1192 | 97.2% | 99.8% | 95.3% | 99.2% | 97.8% | 96.5% |
| PL | 1192 | 96.5% | 99.7% | 95.1% | 99.3% | 97.5% | 96.0% |

Weakest intents: find_symlinks 69% (n=16), find_process 75% (n=16), git_push 75% (n=16), empty_files 81% (n=16), list_files 81% (n=16), users_logged_in 81% (n=16), show_path 81% (n=16), disk_free 88% (n=16).
Top confusions: find_symlinks → broken_symlinks ×4, find_process → service_status ×4, git_push → git_pull ×3, disk_free → block_devices ×2, empty_files → find_by_ext ×2, list_files → find_by_ext ×2, list_tree → hidden_files ×2, file_type → docker_images ×2.

## 2. Per shell

Intent accuracy of the same held-out set under each shell/OS context (the `shell=` / `os=` tokens are classifier features),
plus `data/shell/eval.jsonl`: requests phrased by users of that shell (cmdlet names, `dir /s`, Windows paths, …).
*rendered*: share of eval intents with a native rendering for that shell; *syntax ok*: renders that pass `bash -n` (bash, zsh) / `sh -n` (dash; sh) / `fish -n` / PowerShell parser — n/a when that shell is not installed here.

| shell (os) | data/eval intent top-1 | shell-phrased n | shell-phrased intent top-1 (EN / PL) | rendered | syntax ok |
|---|---|---|---|---|---|
| bash (linux) | 95.2% | 92 | 98.9% (98.0% / 100.0%) | 149/149 | 148/148 |
| zsh (darwin, BSD) | 95.5% | 55 | 96.4% (96.4% / 96.3%) | 149/149 | 148/148 |
| sh (linux) | 95.0% | 3 | 100.0% (100.0% / 100.0%) | 149/149 | 148/148 |
| powershell (win32) | 94.8% | 93 | 96.8% (97.5% / 96.2%) | 146/149 | n/a (not installed) |
| fish (linux) | 95.1% | 18 | 94.4% (90.0% / 100.0%) | 149/149 | n/a (not installed) |
| cmd (win32) | 94.6% | 75 | 96.0% (100.0% / 92.5%) | 117/149 | n/a (not installed) |

## 3. Slot filling (stage 3)

`data/slots/gold.jsonl`: 208 hand-annotated requests (104 EN / 104 PL), gold intent given. Spans are mapped onto the slots the intent uses and compared as normalised typed values (paths after location mapping, sizes in find units, durations in minutes, …).

| slot method | precision | recall | F1 | F1 EN | F1 PL |
|---|---|---|---|---|---|
| BIO tagger only | 98.9% | 90.0% | 94.2% | 95.0% | 93.4% |
| regex only (v0.1) | 94.5% | 94.5% | 94.5% | 94.3% | 94.7% |
| **tagger + regex fallback (shipped)** | 94.9% | 96.4% | 95.7% | 95.9% | 95.4% |

Per type F1 (tagger only / regex only / merged): PATH 97/97/98, SIZE 100/100/100, EXT 85/90/90, PORT 100/100/100, TIME 100/100/100, NAME 93/91/97, NUM 100/87/87, URL 100/94/94, HOST 80/88/88, BRANCH 93/100/100, PATTERN 77/90/90, REPL 67/100/100, USER 86/100/100, MODE 86/100/100, MSG 100/100/100, VAR 100/100/100, PID 100/100/100, TEXT 75/75/75.

## 4. End-to-end exact command (bash, linux)

* `test/slot-cases.js` (99 hand-written request → command pairs, gold intent): **99/99** shipped (tagger + regex fallback), 90/99 tagger only, 99/99 regex only.
* Relexicalised `data/eval` (1326 requests that contain slot values; every value replaced from a *held-out* value pool never used in training; gold command rendered from the inserted spans; full pipeline incl. classification):

| split | n | exact command (full pipeline) | exact command given gold intent |
|---|---|---|---|
| ALL | 1326 | 82.8% | 92.2% |
| EN | 674 | 82.2% | 91.4% |
| PL | 652 | 83.4% | 93.1% |

## 5. History references (`data/history/eval.jsonl`)

"delete it" / "usuń to", "same for /var" / "to samo dla /var", "logs of that container" / "logi tego kontenera", "kill it", … with the last shell-history lines given (raw commands and earlier `tellsh` queries).

| split | n | intent | exact command | exact command without history |
|---|---|---|---|---|
| ALL | 48 | 100.0% | 97.9% | 0.0% |
| EN | 24 | 100.0% | 95.8% | 0.0% |
| PL | 24 | 100.0% | 100.0% | 0.0% |

*Development note:* this set was written independently of the rules, but it was then used while developing them: the first (blind) run scored **60.4%** exact; the failures led to general fixes (more Polish pronoun forms, `ps -p`/`wget` entities, blame/extract verbs, "same but …", implicit required-slot fill). The number above is therefore not a blind score.

*Review fixes:* history lines are now split with a shell-aware tokenizer (`a\ b.txt`, quoted `;`/`|`, PowerShell `''`/backtick escapes, native cmdlets such as `Get-Content -LiteralPath`), and a reference whose latest value depends on the shell state (`$F`, `*.txt`, unparseable or unknown-command lines) is refused (placeholder) instead of falling back to an older value. Two gold commands (`kill_by_port`) were updated for the `-sTCP:LISTEN` fix; no other row changed.

## 6. Second pass: experimental composer (`data/compose/eval.jsonl`)

51 out-of-catalogue requests (a tool with a flag combination that no catalog template has), written independently of the composer vocabulary. Commands are compared after shell unquoting with only behaviour-preserving normalisation: option bundling/order for ordinary commands (`ls -ltr` = `ls -l -t -r`, `head -n5` = `head -5`); argument boundaries, case (`-name` ≠ `-iname`), find's expression order, redirections and pipeline separators must match. *exact* = the gold command, *acceptable* = gold or a listed alternative. (Before the review the comparison lowercased find predicates and mapped `-iname` to `-name`; that credited one catalog answer: "any answer acceptable" was 33.3%, now 31.4%.)

| split | n | composer fired | composed exact | composed acceptable | any answer acceptable (catalog or composed) |
|---|---|---|---|---|---|
| ALL | 51 | 43.1% | 27.5% | 29.4% | 31.4% |
| EN | 26 | 50.0% | 30.8% | 30.8% | 34.6% |
| PL | 25 | 36.0% | 24.0% | 28.0% | 28.0% |

*Development note:* the flag vocabulary was written before looking at this set; the first (blind) run fired on 11.8% and was acceptable on **3.9%**. After inspecting the failures, general fixes were made (firing on unexplained modifiers, value flags, tar compression from the archive name, the data-driven explained-flag table) — the numbers above include them.

False fires on in-catalogue requests (`data/eval`, composer replaced a catalog answer): **0.7%** (17/2384).

## 7. Out-of-domain rejection (`data/ood_eval.jsonl`)

**92.4%** (85/92) answered "I don't understand" (EN 95.7%, PL 89.1%), including the composer path.
<!-- eval:end -->

<!-- bench:start -->
## Latency

Machine: Intel(R) Xeon(R) Processor, Node v20.19.2, linux; CPU affinity: `0` (run via `taskset -c 0`).

| measurement | p50 | p95 | runs |
|---|---|---|---|
| bare `node -e 0` startup (baseline) | 104.2 ms | 124.6 ms | 10 |
| **cold**: `node bin/tellsh.js --dry-run --json --shell bash <query>` (new process, model load, full pipeline) | **158.7 ms** | **189.7 ms** | 40 |
| model load (in-process, one-off) | 4.6 ms | – | 1 |
| **warm**: full cascade + tagger + render (bash, composer off) | **0.305 ms** | **2.2 ms** | 2000 |
| warm, incl. composer modifier check (shipped default) | 0.502 ms | 6.4 ms | 2000 |
| warm, PowerShell rendering | 0.263 ms | 0.532 ms | 2000 |
| warm, with 5 history lines (context build + reference rules) | 0.996 ms | 6.7 ms | 2000 |

The composer runs `bash -n` (a subprocess, ~2 ms) only when it actually returns a composed command.
<!-- bench:end -->

<!-- teacher:start -->
## Teacher verification (TypeSafe Jev, build time only)

Sampled **300** training rows (stratified over intents, EN+PL, incl. shell-phrased rows) and made **300 API calls**
(0 failed) to `jev-latest`: 164275 input tokens ≈ **$0.0069**
(at $0.042/Mtok input, output free). Each call asked: intent (choice among the gold label and our two closest
alternatives), "the rendered command does what is asked" (noul), risk (choice) and up to 3 silver slot spans (noul).

| check | agreement |
|---|---|
| intent label = teacher choice | 100.0% |
| command judged correct (noul ≥ 0.5) | 93.3% |
| risk level identical | 86.7% (teacher rated higher with conf ≥ 0.5: 28) |
| silver slot spans accepted (noul ≥ 0.5) | 93.4% of 181 |

40 rows flagged → `data/teacher/review.jsonl`. After manual inspection (`data/teacher/decisions.jsonl`):
* intent labels: no disagreement, **0 training rows dropped or relabelled**;
* risk: **10 intents relabelled safe → medium** (extract_zip, extract_targz, compress_targz, compress_zip, git_stash, git_stash_pop, git_pull, git_new_branch, git_switch_branch, git_clone) — they overwrite files or change the git working tree;
  4 kept safe where the teacher was stricter than our definition (touch_file, mkdir, git_init, git_add_all);
* "command wrong" flags were slot-extraction bugs, not label errors (Windows `C:\` paths, `plik X.b64` for base64, Polish inflection
  `javy` → `java`, filler words taken as values); fixed in `src/slots.js` / `src/tagger.js` (6 rows kept).
<!-- teacher:end -->

exec
/bin/bash -lc 'wc -l src/*.js scripts/*.js scripts/*.py scripts/lib/*.js test/*.js bin/*; for f in /AGENTS.md /workspace/AGENTS.md /workspace/tellsh/AGENTS.md; do if [ -f "$f" ]; then cat "$f"; fi; done; cat src/cli.js src/pipeline.js src/render.js' in /workspace/tellsh
 succeeded in 0ms:
    45 src/cascade.js
   254 src/catalog.js
    20 src/classifier.js
   230 src/cli.js
   469 src/compose.js
   235 src/danger.js
    93 src/env.js
   173 src/features.js
   268 src/fill.js
   643 src/history.js
    72 src/model.js
   248 src/pipeline.js
   112 src/render.js
   151 src/shellwords.js
   537 src/slots.js
   171 src/tagger.js
   112 src/tools.js
   611 src/variants.js
    79 scripts/bench.js
    70 scripts/build_triggers.js
   189 scripts/check_variants.js
   382 scripts/eval.js
   225 scripts/gen_data.js
    14 scripts/report.js
   172 scripts/teacher.js
   417 scripts/tldr_ingest.py
   323 scripts/train.py
    64 scripts/lib/cmdnorm.js
    13 scripts/lib/pwsh_parse.js
   242 scripts/lib/silver.js
   111 test/cli.test.js
    42 test/danger.test.js
    41 test/parity.test.js
   130 test/pipeline.test.js
   347 test/regressions.test.js
   137 test/shells.test.js
   102 test/slot-cases.js
    68 test/slots.test.js
    60 test/templates.test.js
     7 bin/tellsh.js
  7679 total
// tellsh CLI: natural language (PL/EN) -> shell command, confirm, run.
import { spawn, spawnSync } from 'node:child_process';
import { createInterface } from 'node:readline';
import { readFileSync } from 'node:fs';
import { constants as osConstants } from 'node:os';
import { getModel } from './model.js';
import { suggest as pipelineSuggest } from './pipeline.js';
import { checkDanger, maxRisk } from './danger.js';
import { detectEnv, normShell, normOs } from './env.js';
import { loadHistory } from './history.js';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const HELP = `tellsh ${pkg.version} — natural language (Polish/English) -> shell command, fully offline

Usage: tellsh [options] <request...>

  tellsh pokaż 10 największych plików w ~/Pobrane
  tellsh what is listening on port 8080
  tellsh --history delete it
  tellsh -n kill node

Options:
  -n, --dry-run     print the command only, never run it
  -y, --yes         run without prompting (only risk=safe commands straight from the catalog;
                    never history-resolved, composed, incomplete or medium/high-risk ones)
  -e, --explain     show tool/intent scores, slots and their source
      --json        machine-readable output (implies --dry-run)
      --shell <s>   target shell: bash|zsh|sh|powershell|fish|cmd (default: detected)
      --os <o>      target OS: linux|darwin|win32 (default: this machine); --platform is an alias
      --history[=FILE]  use the last ~10 shell history lines to resolve "it", "same for /var", ...
                    (read in memory only, never stored or logged; also TELLSH_HISTORY=1)
      --no-compose  never fall back to the experimental flag composer
      --compose     force the experimental composer
      --top <k>     show k candidate intents (default 3)
      --threshold <p>  override confidence threshold
  -v, --version     print version
  -h, --help        this help

At the prompt: [Enter] run · e edit · n abort. High-risk and composed (experimental) commands
require typing "yes". Without a TTY (piped), tellsh only prints the command unless --yes is given.`;

const C = process.stdout.isTTY && !process.env.NO_COLOR
  ? { dim: (s) => `\x1b[2m${s}\x1b[0m`, bold: (s) => `\x1b[1m${s}\x1b[0m`, red: (s) => `\x1b[31m${s}\x1b[0m`,
      yellow: (s) => `\x1b[33m${s}\x1b[0m`, green: (s) => `\x1b[32m${s}\x1b[0m`, cyan: (s) => `\x1b[36m${s}\x1b[0m` }
  : { dim: (s) => s, bold: (s) => s, red: (s) => s, yellow: (s) => s, green: (s) => s, cyan: (s) => s };
const riskColor = (r) => (r === 'high' ? C.red : r === 'medium' ? C.yellow : C.green);

export function parseArgs(argv) {
  const o = { dryRun: false, yes: false, explain: false, json: false, top: 3, words: [], threshold: undefined, shell: undefined, os: undefined,
    history: process.env.TELLSH_HISTORY === '1', historyFile: undefined, compose: 'auto' };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--') { o.words.push(...argv.slice(i + 1)); break; }
    else if (a === '-n' || a === '--dry-run') o.dryRun = true;
    else if (a === '-y' || a === '--yes') o.yes = true;
    else if (a === '-e' || a === '--explain') o.explain = true;
    else if (a === '--json') { o.json = true; o.dryRun = true; }
    else if (a === '--top') o.top = Math.max(1, parseInt(argv[++i], 10) || 3);
    else if (a.startsWith('--top=')) o.top = Math.max(1, parseInt(a.slice(6), 10) || 3);
    else if (a === '--threshold') o.threshold = parseFloat(argv[++i]);
    else if (a === '--platform' || a === '--os') o.os = argv[++i];
    else if (a.startsWith('--os=') || a.startsWith('--platform=')) o.os = a.split('=')[1];
    else if (a === '--shell') o.shell = argv[++i];
    else if (a.startsWith('--shell=')) o.shell = a.slice(8);
    else if (a === '--history') o.history = true;
    else if (a.startsWith('--history=')) { o.history = true; o.historyFile = a.slice(10); }
    else if (a === '--no-history') o.history = false;
    else if (a === '--compose') o.compose = 'force';
    else if (a === '--no-compose') o.compose = 'off';
    else if (a === '-v' || a === '--version') o.version = true;
    else if (a === '-h' || a === '--help') o.help = true;
    else o.words.push(a);
  }
  return o;
}

/** Pure function used by the CLI and tests: query -> suggestion object (see src/pipeline.js). */
export function suggest(query, { top = 3, threshold, platform, shell, os, history, cwd, compose } = {}) {
  return pipelineSuggest(query, { top, threshold, shell, os: os || platform, history, cwd, compose });
}

function ask(rl, q) {
  return new Promise((res) => rl.question(q, res));
}

function editLine(initial) {
  return new Promise((res) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl.question(C.cyan('edit> '), (ans) => { rl.close(); res(ans); });
    rl.write(initial);
  });
}

function hasBin(name) {
  const r = spawnSync(process.platform === 'win32' ? 'where' : 'which', [name], { stdio: 'ignore' });
  return r.status === 0;
}

/** Run with the target shell: $SHELL/bash/zsh/sh -c, fish -c, pwsh -NoProfile -Command, cmd /d /s /c. */
export function shellInvocation(command, shell) {
  if (shell === 'powershell') {
    const bin = hasBin('pwsh') ? 'pwsh' : 'powershell';
    return [bin, ['-NoProfile', '-Command', command]];
  }
  if (shell === 'cmd') return ['cmd.exe', ['/d', '/s', '/c', command]];
  if (shell === 'fish') return ['fish', ['-c', command]];
  const envShell = process.env.SHELL && normShell(process.env.SHELL) === shell ? process.env.SHELL : null;
  return [envShell || shell || 'bash', ['-c', command]];
}

export function runShell(command, shellName = normShell(process.env.SHELL) || 'bash') {
  const [shell, args] = shellInvocation(command, shellName);
  return new Promise((res) => {
    const child = spawn(shell, args, { stdio: 'inherit', windowsVerbatimArguments: shell === 'cmd.exe' });
    child.on('error', (e) => { console.error(`tellsh: cannot start ${shell}: ${e.message}`); res(127); });
    child.on('exit', (code, sig) => res(code ?? (sig ? 128 + (osConstants.signals[sig] ?? 1) : 1)));
  });
}

const PROMPT = { powershell: 'PS> ', cmd: '> ', fish: '> ' };
function printSuggestion(s, opts) {
  const out = process.stdout;
  out.write(`${C.bold((PROMPT[s.shell] || '$ ') + s.command)}\n`);
  const conf = `${(s.confidence * 100).toFixed(0)}%`;
  const label = s.method === 'composed' ? C.yellow('composed (experimental)') + C.dim(` ${s.composed.tool}${s.composed.sub ? ' ' + s.composed.sub : ''}`) : s.intent;
  out.write(C.dim('  ') + label + C.dim(` · ${s.shell}/${s.os} · risk: `) + riskColor(s.risk)(s.risk) + C.dim(` · confidence: ${conf}`) + '\n');
  if (s.method === 'composed') out.write(C.yellow(`  ~ assembled from a flag vocabulary (${s.reason}); check it carefully`) + '\n');
  if (s.context?.note) out.write(C.cyan(`  ↺ from history: ${s.context.note}`) + '\n');
  for (const w of s.warnings) out.write(riskColor(s.risk)(`  ! ${w}`) + '\n');
  if (s.missing.length) out.write(C.yellow(`  ? missing: ${s.missing.join(', ')} — edit the command (e) before running`) + '\n');
  if (s.hint) out.write(C.dim(`  hint: ${s.hint}`) + '\n');
  if (s.notes) out.write(C.dim(`  note: ${s.notes}`) + '\n');
  if (opts.explain) {
    if (s.description) out.write(C.dim(`  ${s.description}`) + '\n');
    if (s.variant) out.write(C.dim(`  rendering: ${s.variant}`) + '\n');
    if (s.catalogCommand) out.write(C.dim(`  catalog command was: ${s.catalogCommand}`) + '\n');
    out.write(C.dim(`  slots: ${JSON.stringify(s.slots)}${s.slotSources ? ' via ' + JSON.stringify(s.slotSources) : ''}`) + '\n');
    out.write(C.dim('  tools: ' + s.tools.map((t) => `${t.tool} ${(t.p * 100).toFixed(1)}%`).join(', ')) + '\n');
    out.write(C.dim('  candidates: ' + s.candidates.map((c) => `${c.intent} ${(c.p * 100).toFixed(1)}%`).join(', ')) + '\n');
  }
}

export async function main(argv = process.argv.slice(2)) {
  const opts = parseArgs(argv);
  if (opts.version) { console.log(pkg.version); return 0; }
  if (opts.help || !opts.words.length) { console.log(HELP); return opts.help ? 0 : 2; }
  const query = opts.words.join(' ');
  if (opts.shell && !normShell(opts.shell)) { console.error(`tellsh: unknown shell "${opts.shell}" (bash|zsh|sh|powershell|fish|cmd)`); return 2; }
  if (opts.os && !normOs(opts.os)) { console.error(`tellsh: unknown OS "${opts.os}" (linux|darwin|win32)`); return 2; }
  let s;
  try {
    getModel();
    const env = detectEnv({ shell: opts.shell, os: opts.os });
    // history is read only when asked for, kept in memory for this call, never printed or stored
    const history = opts.history ? loadHistory({ shell: env.shell, file: opts.historyFile, n: 10 }) : undefined;
    s = pipelineSuggest(query, { top: opts.top, threshold: opts.threshold, env, history, cwd: process.cwd(), compose: opts.compose });
  } catch (e) {
    console.error(`tellsh: ${e.message}`);
    return 1;
  }

  if (opts.json) {
    console.log(JSON.stringify(s, null, 2));
    return s.understood ? 0 : 3;
  }
  if (!s.understood) {
    console.log(`I don't understand "${query}" (confidence ${(s.confidence * 100).toFixed(0)}% < ${(s.threshold * 100).toFixed(0)}%).`);
    console.log('Did you mean:');
    for (const c of s.candidates) console.log(`  - ${c.intent}: ${c.description} ${C.dim(`(${(c.p * 100).toFixed(1)}%)`)}`);
    if (s.hint) console.log(C.dim(`hint: ${s.hint}`));
    console.log(C.dim('Try rephrasing, or use --threshold to lower the bar.'));
    return 3;
  }
  if (s.gap) {
    console.log(`No ${s.shell} rendering for "${s.intent}" on ${s.os}: ${s.gap}.`);
    console.log(C.dim(`Try --shell bash (or another shell) to see the command.`));
    return 5;
  }

  printSuggestion(s, opts);
  if (opts.dryRun) return 0;

  const interactive = process.stdin.isTTY && process.stdout.isTTY;
  const shellName = s.shell;
  if (opts.yes) {
    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog') {
      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' ? 'resolved from history' : s.missing.length ? 'incomplete' : s.risk;
      console.log(C.yellow(`  --yes only auto-runs safe catalog commands; this one is ${why}. Not running.`));
      return 4;
    }
    return runShell(s.command, shellName);
  }
  if (!interactive) return 0; // print-only when piped

  let command = s.command;
  let risk = s.risk;
  let critical = s.critical;
  let incomplete = s.missing.length > 0;
  const strict = () => risk === 'high' || s.method === 'composed';
  for (;;) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const prompt = strict()
      ? `${risk === 'high' ? C.red('High risk.') : C.yellow('Experimental.')} Type "yes" to run, e to edit, anything else aborts: `
      : incomplete ? 'e edit · n abort: ' : '[Enter] run · e edit · n abort: ';
    const ans = (await ask(rl, prompt)).trim().toLowerCase();
    rl.close();
    if (ans === 'e' || ans === 'edit') {
      command = (await editLine(command)).trim();
      if (!command) return 130;
      const d = checkDanger(command, s.baseRisk);
      risk = maxRisk(s.baseRisk, d.risk);
      critical = d.critical;
      incomplete = /<[A-Z_]+>/.test(command);
      process.stdout.write(C.dim('  risk: ') + riskColor(risk)(risk) + '\n');
      for (const w of d.warnings) process.stdout.write(riskColor(risk)(`  ! ${w}`) + '\n');
      continue;
    }
    if (incomplete) { if (ans === '' ) continue; return 130; }
    const go = strict() ? ans === 'yes' || ans === 'tak' : ans === '' || ans === 'y' || ans === 'yes' || ans === 't' || ans === 'tak';
    if (!go) { console.log('aborted'); return 130; }
    if (critical) {
      const rl2 = createInterface({ input: process.stdin, output: process.stdout });
      const a2 = (await ask(rl2, C.red('This command can destroy the system. Type the full command again to confirm: '))).trim();
      rl2.close();
      if (a2 !== command) { console.log('aborted'); return 130; }
    }
    return runShell(command, shellName);
  }
}
// End-to-end: request -> command for the target shell.
//
//   env (shell/os/coreutils) + history ctx ──► classifier context tokens (shell=, os=, ctx_*)
//   history rules ("same for X", "delete it") ─► may fix intent / fill slots deterministically
//   cascade: tool top-3 ─► intent (p(tool)·p(intent|tool))
//   slots: BIO tagger (tool-conditioned) ─► validated values; regex extraction fills/overrides failures
//   render for shell/os ─► danger check
//   low confidence (or unexplained modifiers) ─► second pass: experimental flag composer
import { getModel } from './model.js';
import { cascade } from './cascade.js';
import { tag, exFromSpans } from './tagger.js';
import { extractSlots, pickArg } from './slots.js';
import { resolveSlots, buildCommand, finalizeSlots, RAW_OK } from './fill.js';
import { BY_ID } from './catalog.js';
import { FAMILY_OF, NONE } from './tools.js';
import { detectEnv, envFeatures } from './env.js';
import { buildContext, resolveReference, hasPronoun, cwdFlags, sameBut, entityForSlot, isAmbiguous } from './history.js';
import { compose } from './compose.js';
import { readFileSync } from 'node:fs';

let EXPLAINED = null;
const explained = () => {
  if (!EXPLAINED) {
    try { EXPLAINED = JSON.parse(readFileSync(new URL('../model/compose_explained.json', import.meta.url), 'utf8')); } catch { EXPLAINED = {}; }
  }
  return EXPLAINED;
};
const headOf = (cmd) => { const w = String(cmd).replace(/^sudo\s+/, '').split(/\s+/); return ['git', 'docker'].includes(w[0]) ? `${w[0]} ${w[1]}` : w[0]; };

// extracted "values" that are really the pronoun/filler words of a reference ("restart it", "zatrzymaj tę usługę")
const PRONOUN_VALUE = /^(it|its|that|this|them|those|one|again|back|there|here|to|tego|ten|tę|te|ta|tą|tej|tym|go|je|ją|ja|jego|jej|niego|nią|nia|nim|niej|mu|tamten|tamtego|tamto|ponownie|znowu)$/i;

// Non-path values must never start with `-` (they would become options: `ssh -oProxyCommand=…`,
// `curl -o/path`); paths get a ./ prefix at render time instead.
const WORDISH = (v) => /^(?!-)[\w@.:+-]{1,64}$/.test(v);
const VALID_SLOT = {
  path: (v) => typeof v === 'string' && v.length < 256 && !/[\n\0\u0001]/.test(v) && /[\w~./]/.test(v),
  name: WORDISH, service: WORDISH, container: WORDISH, pkg: WORDISH, cmd: WORDISH,
  branch: (v) => /^(?!-)[\w./-]{1,100}$/.test(v), user: (v) => /^[a-z_][\w.-]{0,31}$/i.test(v),
  glob: (v) => /^\*\.[\w]{1,8}$/.test(v),
  url: (v) => v.length < 2048 && (/^(?:https?|ftp|ftps|ssh|git|file):\/\/[^\s/?#]*[^\s]*$/i.test(v) || /^(?!-)[\w.-]+@[\w.-]+:[^\s]+$/.test(v)),
  host: (v) => /^(?!-)[\w.@:-]+$/.test(v), target: (v) => /^(?!-)[\w.@:-]+$/.test(v),
  pattern: (v) => v.length < 300 && !/[\n\0]/.test(v), message: (v) => v.length < 300 && !/\0/.test(v),
};
for (const k of ['file', 'src', 'dst', 'dest', 'archive']) VALID_SLOT[k] = VALID_SLOT.path;
export function validSlot(k, v) {
  if (v == null || v === '') return false;
  if (isAmbiguous(v)) return false;
  if (RAW_OK[k]) return RAW_OK[k](v);
  if (VALID_SLOT[k]) return VALID_SLOT[k](String(v));
  return String(v).length < 300 && !/\0/.test(String(v));
}
/** Values recovered from history go through the same validation as classifier/regex values. */
const validHistorySlots = (slots) => Object.fromEntries(Object.entries(slots || {}).filter(([k, v]) => ['namepat', 'sedexpr'].includes(k) || validSlot(k, v)));

/**
 * Slot resolution: tagger is primary, regex is fallback + validator.
 * -> { slots, sources: {slot: 'tagger'|'regex'}, spans }
 */
export function resolveWithTagger(intentId, text, { model = getModel(), tool, mode = 'merge' } = {}) {
  const intent = BY_ID[intentId];
  const exR = extractSlots(text);
  const rR = resolveSlots(intent, exR);
  if (mode === 'regex') return { slots: rR, sources: Object.fromEntries(Object.keys(rR).map((k) => [k, 'regex'])), spans: [] };
  const t = tag(text, tool || FAMILY_OF[intentId], model);
  const exT = exFromSpans(text, t.spans);
  const rT = resolveSlots(intent, exT);
  if (rT.archive && !exT.paths.includes(rT.archive)) delete rT.archive; // derived default, not a tagged value
  if (mode === 'tagger') return { slots: rT, sources: Object.fromEntries(Object.keys(rT).map((k) => [k, 'tagger'])), spans: t.spans };
  const slots = {};
  const sources = {};
  for (const k of new Set([...Object.keys(rT), ...Object.keys(rR)])) {
    if (k === 'namepat' || k === 'sedexpr') continue; // derived, recomputed below
    if (validSlot(k, rT[k])) { slots[k] = rT[k]; sources[k] = 'tagger'; } else if (rR[k] != null && (validSlot(k, rR[k]) || !VALID_SLOT[k])) { slots[k] = rR[k]; sources[k] = 'regex'; }
  }
  finalizeSlots(intent, slots);
  return { slots, sources, spans: t.spans };
}

const usesSlot = (intent, k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));

function flagTokens(cmd) {
  const set = new Set();
  for (const w of String(cmd).split(/\s+/)) {
    if (/^-[A-Za-z]+$/.test(w) && !w.startsWith('--')) for (const c of w.slice(1)) set.add('-' + c);
    else if (/^-/.test(w)) set.add(w.replace(/=.*$/, ''));
    else if (/^[a-z]{3}$/.test(w)) set.add(w); // ps aux
  }
  return set;
}

/** Second pass input: paths, numbers, ... from the merged extraction for the composer. */
function composeInput(text, model, tool) {
  const ex = extractSlots(text);
  const t = tag(text, tool, model);
  const exT = exFromSpans(text, t.spans);
  const merged = { ...ex };
  if (exT.paths.length) merged.paths = exT.paths;
  for (const k of ['count', 'size', 'duration', 'ext', 'mode']) if (exT[k] != null) merged[k] = exT[k];
  const pattern = () => exT.tagged.PATTERN?.[0] ?? ex.quoted[0] ?? pickArg('pattern', ex) ?? null;
  const nameOf = (type) => exT.tagged[type]?.[0] ?? null;
  return { ex: merged, pattern, nameOf };
}

/**
 * Pure function used by the CLI, eval and tests.
 * opts: { shell, os, env, history: string[] (commands, oldest first), cwd, threshold, top, compose: 'auto'|'force'|'off',
 *         slotMode: 'merge'|'tagger'|'regex', model }
 */
export function suggest(query, opts = {}) {
  const model = opts.model || getModel();
  const env = opts.env || detectEnv({ shell: opts.shell, os: opts.os });
  const top = opts.top ?? 3;
  const thr = opts.threshold ?? model.thresholds.accept;
  const composeMode = opts.compose || 'auto';

  // ---- context (history + cwd), in memory only ----
  let ctx = null;
  if (opts.history?.length) {
    const quick = (q) => {
      const c = cascade(q, { model, extras: envFeatures(env) });
      if (c.confidence < thr) return null;
      return { intent: c.intent, slots: resolveWithTagger(c.intent, q, { model, tool: c.tool }).slots };
    };
    const kind = opts.historyKind || opts.history.kind || (env.shell === 'powershell' ? 'pwsh' : 'posix');
    ctx = buildContext(opts.history, { classify: quick, cwd: opts.cwd, kind });
  }
  const ctxFeats = ctx ? ctx.features : (opts.cwd ? cwdFlags(opts.cwd).map((c) => 'ctx_cwd=' + c) : []);
  const extras = [...envFeatures(env), ...ctxFeats];
  const ref = ctx ? resolveReference(query, ctx) : null;
  const context = ctx ? { used: true, commands: ctx.n, rule: ref?.rule || null, note: ref?.note || null } : { used: false };

  const base = { query, shell: env.shell, os: env.os, coreutils: env.coreutils, threshold: thr, context };

  // ---- rule: "same for X" reuses the previous intent with one slot replaced ----
  if (ref?.rule === 'same-for') {
    const b = buildCommand(ref.intent, query, { env, resolved: finalizeSlots(BY_ID[ref.intent], validHistorySlots(ref.slots)) });
    return { ...base, understood: true, method: 'history-rule', confidence: 1, tool: FAMILY_OF[ref.intent], candidates: [], tools: [], ...b };
  }

  const sb = ctx && !ref ? sameBut(query, ctx) : null;
  const c = cascade(query, { model, extras, top, restrictTool: sb ? FAMILY_OF[sb.lastIntent] : undefined });
  const candidates = c.top.map((t) => ({ intent: t.intent, tool: t.tool, p: +t.p.toFixed(4), description: BY_ID[t.intent]?.description }));
  const tools = c.tools.map((t) => ({ tool: t.tool, p: +t.p.toFixed(4) }));
  let intent = c.intent;
  let confidence = c.confidence;
  let method = 'catalog';
  if ((ref?.rule === 'pronoun' || ref?.rule === 'refused') && ref.intent) { intent = ref.intent; method = 'history-rule'; confidence = Math.max(confidence, thr); }
  if (sb) { method = 'history-rule'; confidence = Math.max(confidence, thr); context.rule = 'same-but'; context.note = `modifies previous ${sb.lastIntent}`; }
  const out = { ...base, confidence: +confidence.toFixed(4), tool: FAMILY_OF[intent] || c.tool, tools, candidates };

  const tryCompose = (reason) => {
    if (composeMode === 'off') return null;
    if (env.shell === 'powershell' || env.shell === 'cmd') return null; // composer vocabulary is POSIX-only
    const capable = c.tools.filter((t) => t.tool !== NONE);
    if (c.topTool === NONE && composeMode !== 'force') return null;
    const ci = composeInput(query, model, capable[0]?.tool);
    const r = compose(query, capable, ci.ex, { patternOf: ci.pattern, nameOf: ci.nameOf });
    if (!r || r.invalid) return r?.invalid ? { invalid: r.invalid, command: r.command } : null;
    // calibrated gate: confident stage-1 tool, or strong flag evidence (>= 2 triggered flags) for a likely tool
    const pOf = capable.find((t) => t.tool === r.tool)?.p ?? 0;
    if (composeMode !== 'force' && !(c.topToolP >= model.thresholds.compose || (r.triggered.length >= 2 && pOf >= 0.2))) return null;
    return { ...out, understood: true, method: 'composed', experimental: true, reason, intent: null, description: `composed ${r.tool}${r.sub ? ' ' + r.sub : ''} command (experimental)`,
      command: r.command, risk: r.risk, baseRisk: 'medium', warnings: r.warnings, critical: r.critical, missing: [], slots: {}, notes: null,
      composed: { tool: r.tool, sub: r.sub, flags: r.flags, validation: r.validation } };
  };

  if (confidence < thr && method === 'catalog') {
    const comp = tryCompose('low confidence');
    if (comp && !comp.invalid) return comp;
    const hint = hasPronoun(query) && !ctx ? 'this looks like a reference to an earlier command; try --history' : null;
    return { ...out, understood: false, method: 'none', hint, composeError: comp?.invalid || null };
  }

  const r = resolveWithTagger(intent, query, { model, tool: FAMILY_OF[intent], mode: opts.slotMode });
  const slots = r.slots;
  if (ref?.rule === 'refused') {
    // the reference points at something we cannot read safely: leave the slot empty (placeholder)
    for (const k of Object.keys(slots)) if (PRONOUN_VALUE.test(String(slots[k]))) { delete slots[k]; delete r.sources[k]; }
    finalizeSlots(BY_ID[intent], slots);
    method = 'history-rule';
  }
  if (ref?.rule === 'pronoun') {
    const it = BY_ID[intent];
    for (const [k, v] of Object.entries(ref.fill)) {
      if (!validSlot(k, v)) { if (slots[k] != null && PRONOUN_VALUE.test(String(slots[k]))) delete slots[k]; continue; }
      // the referenced value wins unless the request spells out its own value literally ("kill 4242")
      const literal = slots[k] != null && !PRONOUN_VALUE.test(String(slots[k])) && new RegExp(`(^|[^\\w])${String(slots[k]).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^\\w])`, 'i').test(query);
      if (usesSlot(it, k) && (!literal || (k === 'path' && slots[k] === '.'))) { slots[k] = v; r.sources[k] = 'history'; }
    }
    finalizeSlots(it, slots);
    method = 'history-rule';
  }
  if (sb) {
    const it = BY_ID[intent];
    for (const [k, v] of Object.entries(validHistorySlots(sb.lastSlots))) {
      if (usesSlot(it, k) && slots[k] == null && !['namepat', 'sedexpr'].includes(k)) { slots[k] = v; r.sources[k] = 'history'; }
    }
    finalizeSlots(it, slots);
  }
  let b = buildCommand(intent, query, { env, resolved: slots });
  // implicit reference: a required slot is still missing and the history has a value of that type
  if (ctx && b.missing.length && ref?.rule !== 'refused') {
    const filled = [];
    for (const m of b.missing) {
      const e = entityForSlot(m, ctx) || (ctx.last?.slots?.[m] != null ? { ent: m, value: ctx.last.slots[m] } : null);
      if (e && validSlot(m, e.value)) { slots[m] = e.value; r.sources[m] = 'history'; filled.push(`${m}=${e.value}`); }
    }
    if (filled.length) {
      finalizeSlots(BY_ID[intent], slots);
      b = buildCommand(intent, query, { env, resolved: slots });
      context.rule ??= 'implicit';
      context.note = [context.note, `filled from history: ${filled.join(', ')}`].filter(Boolean).join('; ');
    }
  }
  const res = { ...out, understood: true, method, ...b, slotSources: r.sources, spans: r.spans.map((s) => ({ type: s.type, text: s.text })) };
  if (method === 'catalog' && ctx == null && hasPronoun(query) && b.missing.length) res.hint = 'this looks like a reference to an earlier command; try --history';

  // ---- second pass on modifier mismatch: the request asks for flags the catalog command lacks ----
  //   same tool: >= 1 triggered flag not in the catalog command; another stage-1 tool: >= 2 triggered flags
  if (method === 'catalog' && composeMode !== 'off' && b.command && env.shell !== 'powershell' && env.shell !== 'cmd') {
    const fam = FAMILY_OF[intent];
    const ci = composeInput(query, model, fam);
    const opt = { patternOf: ci.pattern, nameOf: ci.nameOf };
    const have = flagTokens(b.command);
    const expl = new Set(explained()[intent] || []);
    const unexplained = (cmp) => cmp.triggered.filter((f) => !expl.has((cmp.sub ? cmp.sub + ' ' : '') + f));
    let comp = compose(query, [{ tool: fam, p: 1 }], ci.ex, opt);
    // same tool: the composed command must keep the catalog command's head (+ git/docker subcommand)
    const sameHead = comp && !comp.invalid && headOf(comp.command) === headOf(b.command);
    let extra = sameHead ? unexplained(comp).filter((f) => [...flagTokens(f)].some((x) => !have.has(x))) : [];
    if (!extra.length) {
      const others = c.tools.filter((t) => t.tool !== NONE && t.p >= 0.05);
      const alt = compose(query, others.length ? others : [{ tool: fam, p: 1 }], ci.ex, opt);
      const ux = alt && !alt.invalid && headOf(alt.command) !== headOf(b.command) ? unexplained(alt) : [];
      if (ux.length >= 2) { comp = alt; extra = ux; }
    }
    if (comp && !comp.invalid && comp.command !== b.command) {
      if (extra.length >= 1 || composeMode === 'force') {
        return { ...res, method: 'composed', experimental: true, reason: `request asks for ${extra.join(' ')} not in the catalog command`,
          catalogCommand: b.command, description: `composed ${comp.tool}${comp.sub ? ' ' + comp.sub : ''} command (experimental)`,
          command: comp.command, risk: comp.risk, baseRisk: 'medium', warnings: comp.warnings, critical: comp.critical, missing: [],
          composed: { tool: comp.tool, sub: comp.sub, flags: comp.flags, validation: comp.validation } };
      }
    }
  }
  return res;
}
// Per-shell rendering: pick the template variant for (shell, os, coreutils) and quote slot values
// for that shell. Intent and slots are shared across shells; only the rendered command differs.
//
// Precedence
//   bash/zsh/sh  linux: busybox (if busybox userland) ?? template
//                darwin: gnuMac (GNU coreutils present) ?? bsd ?? catalog darwin ?? template
//   fish         fish ?? the POSIX choice above (fish quoting)
//   powershell   pwsh (string | {win, unix}); no unix variant -> `bash -c '<posix>'`; no win variant -> gap
//   cmd          cmd ?? gap
import { VARIANTS } from './variants.js';

// never a leading `=`: zsh expands `=word` to the path of command `word`
const SAFE_POSIX = /^[A-Za-z0-9_\/.,:@%+-][A-Za-z0-9_\/.,:@%+=-]*$/;

/** POSIX shell quoting. Keeps a leading ~/ unquoted so tilde expansion still works. */
export function shQuote(value) {
  const s = String(value);
  if (s === '') return "''";
  const tilde = s.match(/^~(\/|$)(.*)$/s);
  if (tilde) return '~' + tilde[1] + (tilde[2] ? shQuote(tilde[2]) : '');
  if (SAFE_POSIX.test(s)) return s;
  return "'" + s.replace(/'/g, `'\\''`) + "'";
}

/** fish: inside single quotes only \\ and \' are escapes. */
export function fishQuote(value) {
  const s = String(value);
  if (s === '') return "''";
  const tilde = s.match(/^~(\/|$)(.*)$/s);
  if (tilde) return '~' + tilde[1] + (tilde[2] ? fishQuote(tilde[2]) : '');
  if (/^[A-Za-z0-9_\/.,:@+-][A-Za-z0-9_\/.,:@+=-]*$/.test(s)) return s;
  return "'" + s.replace(/[\\']/g, '\\$&') + "'";
}

// PowerShell treats the typographic quotes as quote characters too (about_Quoting_Rules):
// single: ' ‘ ’ ‚ ‛   double: " “ ” „
const PS_SQ = /['\u2018\u2019\u201A\u201B]/g;
const PS_DQ_SPECIAL = /[`$"\u201C\u201D\u201E]/g;

/**
 * PowerShell: always a single-quoted literal (each single-quote character doubled), so the value is a
 * string both as a command argument and inside an expression (.Replace('a', 'b'), -match 'x').
 * ~ becomes $HOME in a double-quoted string.
 */
export function psQuote(value) {
  const s = String(value);
  const tilde = s.match(/^~(?:[/\\](.*))?$/s);
  if (tilde) {
    if (!tilde[1]) return '$HOME';
    return '"$HOME/' + tilde[1].replace(PS_DQ_SPECIAL, '`$&') + '"';
  }
  return "'" + s.replace(PS_SQ, '$&$&') + "'";
}

export class UnquotableError extends Error {}

/**
 * cmd.exe (best effort): double quotes, ~ -> %USERPROFILE%. cmd expands %VAR% (and !VAR! with delayed
 * expansion) even inside double quotes and has no escape for `"` inside them, so values containing
 * % ! " or control characters are refused (the intent is reported as a gap for cmd).
 */
export function cmdQuote(value) {
  let s = String(value);
  s = s.replace(/^~(?=[/\\]|$)/, '%USERPROFILE%');
  const body = s.replace(/^%USERPROFILE%/, '');
  if (/[%!"\r\n\0]/.test(body)) throw new UnquotableError(`value ${JSON.stringify(String(value))} cannot be quoted safely for cmd.exe`);
  if (/^[A-Za-z0-9_\\\/.:@+=%-]+$/.test(s)) return s.replace(/\//g, (m) => (/^[A-Za-z]:|%USERPROFILE%/.test(s) ? '\\' : m));
  return '"' + s + '"';
}

export const QUOTE = { bash: shQuote, zsh: shQuote, sh: shQuote, fish: fishQuote, powershell: psQuote, cmd: cmdQuote };

function posixTemplate(intent, env) {
  const v = VARIANTS[intent.id] || {};
  if (env.shell === 'zsh' && v.zsh) return { tpl: v.zsh, variant: 'zsh' };
  if (env.os === 'darwin') {
    if (env.coreutils === 'gnu' && v.gnuMac) return { tpl: v.gnuMac, variant: 'gnuMac' };
    if (v.bsd) return { tpl: v.bsd, variant: 'bsd' };
    if (intent.darwin) return { tpl: intent.darwin, variant: 'darwin' };
    return { tpl: intent.template, variant: 'posix' };
  }
  if (env.coreutils === 'busybox' && v.busybox) return { tpl: v.busybox, variant: 'busybox' };
  return { tpl: intent.template, variant: 'posix' };
}

/**
 * -> { tpl, kind: 'posix'|'fish'|'pwsh'|'cmd', variant, wrapPosix?: boolean, gap?: string }
 * wrapPosix: render the POSIX template and wrap it as `bash -c '...'` (PowerShell on unix).
 */
export function chooseTemplate(intent, env) {
  const v = VARIANTS[intent.id] || {};
  const shell = env.shell;
  if (shell === 'fish') {
    if (v.fish) return { tpl: v.fish, kind: 'fish', variant: 'fish' };
    return { ...posixTemplate(intent, env), kind: 'fish' };
  }
  if (shell === 'powershell') {
    const p = v.pwsh;
    const win = env.os === 'win32';
    const t = p == null ? null : typeof p === 'string' || typeof p === 'function' ? p : win ? p.win : p.unix;
    if (t) return { tpl: t, kind: 'pwsh', variant: 'pwsh' };
    if (!win) return { ...posixTemplate(intent, env), kind: 'pwsh', wrapPosix: true };
    return { tpl: null, kind: 'pwsh', gap: v.gaps?.pwsh || 'no PowerShell equivalent on Windows yet' };
  }
  if (shell === 'cmd') {
    if (v.cmd) return { tpl: v.cmd, kind: 'cmd', variant: 'cmd' };
    return { tpl: null, kind: 'cmd', gap: v.gaps?.cmd || 'no cmd.exe equivalent yet (try PowerShell)' };
  }
  return { ...posixTemplate(intent, env), kind: 'posix' };
}

export const quoteForKind = (kind, wrapPosix) => (wrapPosix ? shQuote : { posix: shQuote, fish: fishQuote, pwsh: psQuote, cmd: cmdQuote }[kind]);

exec
/bin/bash -lc 'cat scripts/teacher.js scripts/bench.js scripts/build_triggers.js scripts/lib/cmdnorm.js' in /workspace/tellsh
exec
/bin/bash -lc 'cat scripts/gen_data.js scripts/train.py' in /workspace/tellsh
 succeeded in 0ms:
#!/usr/bin/env node
// Optional build-time teacher: verify a SAMPLE of generated training labels with TypeSafe Jev
// (https://docs.typesafe.ai, POST /v1/systemone, model jev-latest). Never used at runtime.
//
//   TYPESAFE_API_KEY=... node scripts/teacher.js [--calls 300] [--seed 5]
//
// Per sampled training row, ONE call asks (questions are evaluated in parallel by the API):
//   intent  choice   gold intent vs the two closest alternatives from our cascade (+ "none of these")
//   correct noul     the rendered bash command does what the request asks
//   risk    choice   safe / medium / high — compared with our final risk (catalog risk + danger.js)
//   span_i  noul     up to 3 silver slot spans ("'~/Pobrane' is the directory/file path")
// Disagreements are written to data/teacher/review.jsonl for manual inspection; decisions taken after
// inspection live in data/teacher/decisions.jsonl and are applied by scripts/gen_data.js.
// The API key is read from the environment only; it is never printed or logged.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BY_ID } from '../src/catalog.js';
import { FAMILY_OF } from '../src/tools.js';
import { buildCommand } from '../src/fill.js';
import { cascade } from '../src/cascade.js';
import { silverSpans, mulberry32 } from './lib/silver.js';
import { updateSection } from './report.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=')[1] : d; };
const MAX_CALLS = Math.min(300, +arg('calls', 300));
const PRICE_PER_MTOK = 0.042; // USD per million input tokens (jev-1.13, docs.typesafe.ai/models); output tokens are free
const ENDPOINT = 'https://api.typesafe.ai/v1/systemone';
const KEY = process.env.TYPESAFE_API_KEY;

const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const TYPE_DESC = {
  PATH: 'a file or directory path (or a named place like the home or Downloads folder)', SIZE: 'a file size', EXT: 'a file extension / file type',
  PORT: 'a network port number', TIME: 'a time window or age', NAME: 'the name of a process, service, container, package or command',
  NUM: 'a count (how many results/lines)', URL: 'a URL', HOST: 'a host name, IP address or user@host', BRANCH: 'a git branch name',
  PATTERN: 'the text to search for (or the text to be replaced)', REPL: 'the replacement text', USER: 'a user name', MODE: 'file permission bits',
  MSG: 'a commit message', VAR: 'an environment variable name', PID: 'a process id', TEXT: 'the text to encode/decode',
};
const RISK_DESC = {
  safe: 'read-only: only shows information, changes nothing',
  medium: 'changes files, settings, services or remote state, but in a recoverable way',
  high: 'deletes data, kills processes, discards work or is hard to undo',
};

async function ask(state, questions) {
  const r = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'jev-latest', state, questions }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return j;
}

async function main() {
  const reportOnly = process.argv.includes('--report-only');
  if (reportOnly) {
    const meta = JSON.parse(readFileSync(join(ROOT, 'build', 'teacher_meta.json'), 'utf8'));
    return summarize(readJsonl(join(ROOT, 'build', 'teacher_results.jsonl')), meta);
  }
  if (!KEY) {
    console.log('teacher: TYPESAFE_API_KEY not set — skipped');
    updateSection('teacher', '## Teacher verification (TypeSafe Jev)\n\nSkipped: `TYPESAFE_API_KEY` not set at build time.');
    return;
  }
  const rng = mulberry32(+arg('seed', 5));
  const rows = [...readdirSync(join(ROOT, 'data', 'intents')).sort().flatMap((f) => readJsonl(join(ROOT, 'data', 'intents', f))),
    ...readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl'))];
  // stratified sample: shuffle, then round-robin over intents
  const byIntent = {};
  for (const r of rows.sort(() => rng() - 0.5)) (byIntent[r.intent] ??= []).push(r);
  const sample = [];
  for (let round = 0; sample.length < MAX_CALLS && round < 10; round++) {
    for (const id of Object.keys(byIntent).sort(() => rng() - 0.5)) {
      if (sample.length >= MAX_CALLS) break;
      if (byIntent[id][round]) sample.push(byIntent[id][round]);
    }
  }
  const results = [];
  let calls = 0;
  let inTok = 0;
  let failed = 0;
  const t0 = Date.now();
  const work = sample.map((r) => async () => {
    const env = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
    const b = buildCommand(r.intent, r.text, { env });
    const c = cascade(r.text, { extras: ['shell=bash', 'os=linux'], top: 4 });
    const alts = c.top.map((t) => t.intent).filter((i) => i !== r.intent).slice(0, 2);
    const opts = [r.intent, ...alts].sort(() => rng() - 0.5);
    const criteria = Object.fromEntries(opts.map((i) => [i, BY_ID[i].description]));
    criteria.none = 'none of these';
    const { spans } = silverSpans(r.text, r.intent);
    const questions = {
      intent: { type: 'choice', instructions: 'Which action does the user request? (The request may be in Polish or English.)', criteria },
      correct: { type: 'noul', instructions: 'The shell command does what the request asks for (values the request does not mention may use sensible defaults)' },
      risk: { type: 'choice', instructions: 'How risky is running the shell command on a user machine', criteria: RISK_DESC },
    };
    spans.slice(0, 3).forEach((s, i) => {
      questions[`span_${i}`] = { type: 'noul', instructions: `In the request, "${r.text.slice(s.start, s.end)}" is ${TYPE_DESC[s.type]}` };
    });
    try {
      const j = await ask({ request: r.text, shell: 'bash on Linux', command: b.command }, questions);
      calls++;
      inTok += j.usage?.input_tokens || 0;
      const a = j.answers || {};
      results.push({
        text: r.text, intent: r.intent, lang: r.lang, command: b.command, risk: b.risk,
        t_intent: a.intent?.choice, t_intent_conf: a.intent?.confidence, t_correct: a.correct?.noul,
        t_risk: a.risk?.choice, t_risk_conf: a.risk?.confidence,
        spans: spans.slice(0, 3).map((s, i) => ({ type: s.type, text: r.text.slice(s.start, s.end), p: a[`span_${i}`]?.noul })),
      });
    } catch (e) {
      failed++;
      if (failed <= 3) console.log(`teacher: call failed (${e.message})`);
    }
  });
  // small concurrency, well under the documented rate limits
  for (let i = 0; i < work.length; i += 6) await Promise.all(work.slice(i, i + 6).map((f) => f()));
  const meta = { calls, failed, inTok, seconds: Math.round((Date.now() - t0) / 1000), date: new Date().toISOString().slice(0, 10) };
  mkdirSync(join(ROOT, 'build'), { recursive: true });
  writeFileSync(join(ROOT, 'build', 'teacher_meta.json'), JSON.stringify(meta));
  writeFileSync(join(ROOT, 'build', 'teacher_results.jsonl'), results.map((r) => JSON.stringify(r)).join('\n') + '\n');
  summarize(results, meta);
}

function summarize(results, { calls, failed, inTok, seconds }) {
  const RANK = { safe: 0, medium: 1, high: 2 };
  const review = [];
  let intentAgree = 0; let correctOk = 0; let riskAgree = 0; let riskHigher = 0; let spanN = 0; let spanOk = 0;
  for (const r of results) {
    const reasons = [];
    if (r.t_intent === r.intent) intentAgree++;
    else if ((r.t_intent_conf ?? 0) >= 0.5) reasons.push(`teacher intent ${r.t_intent} (${r.t_intent_conf})`);
    if ((r.t_correct ?? 0) >= 0.5) correctOk++; else if ((r.t_correct ?? 1) < 0.3) reasons.push(`command judged wrong (${r.t_correct})`);
    if (r.t_risk === r.risk) riskAgree++;
    if (RANK[r.t_risk] > RANK[r.risk] && (r.t_risk_conf ?? 0) >= 0.5) { riskHigher++; reasons.push(`teacher risk ${r.t_risk} > ours ${r.risk}`); }
    for (const s of r.spans) { spanN++; if ((s.p ?? 0) >= 0.5) spanOk++; else if ((s.p ?? 1) < 0.3) reasons.push(`span ${s.type} "${s.text}" rejected (${s.p})`); }
    if (reasons.length) review.push({ text: r.text, intent: r.intent, command: r.command, reasons });
  }
  mkdirSync(join(ROOT, 'data', 'teacher'), { recursive: true });
  writeFileSync(join(ROOT, 'data', 'teacher', 'review.jsonl'), review.map((r) => JSON.stringify(r)).join('\n') + '\n');
  const spend = (inTok / 1e6) * PRICE_PER_MTOK;
  const n = results.length;
  const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl'));
  const md = `## Teacher verification (TypeSafe Jev, build time only)

Sampled **${n}** training rows (stratified over intents, EN+PL, incl. shell-phrased rows) and made **${calls} API calls**
(${failed} failed) to \`jev-latest\`${seconds ? ` in ${seconds} s` : ''}: ${inTok} input tokens ≈ **$${spend.toFixed(4)}**
(at $${PRICE_PER_MTOK}/Mtok input, output free). Each call asked: intent (choice among the gold label and our two closest
alternatives), "the rendered command does what is asked" (noul), risk (choice) and up to 3 silver slot spans (noul).

| check | agreement |
|---|---|
| intent label = teacher choice | ${pct(intentAgree, n)} |
| command judged correct (noul ≥ 0.5) | ${pct(correctOk, n)} |
| risk level identical | ${pct(riskAgree, n)} (teacher rated higher with conf ≥ 0.5: ${riskHigher}) |
| silver slot spans accepted (noul ≥ 0.5) | ${pct(spanOk, spanN)} of ${spanN} |

${review.length} rows flagged → \`data/teacher/review.jsonl\`. After manual inspection (\`data/teacher/decisions.jsonl\`):
* intent labels: no disagreement, **0 training rows dropped or relabelled**;
* risk: **${decisions.filter((d) => d.action === 'relabel' && d.field === 'risk').length} intents relabelled safe → medium** (${decisions.filter((d) => d.action === 'relabel' && d.field === 'risk').map((d) => d.intent).join(', ')}) — they overwrite files or change the git working tree;
  ${decisions.filter((d) => d.action === 'keep' && d.field === 'risk').length} kept safe where the teacher was stricter than our definition (${decisions.filter((d) => d.action === 'keep' && d.field === 'risk').map((d) => d.intent).join(', ')});
* "command wrong" flags were slot-extraction bugs, not label errors (Windows \`C:\\\` paths, \`plik X.b64\` for base64, Polish inflection
  \`javy\` → \`java\`, filler words taken as values); fixed in \`src/slots.js\` / \`src/tagger.js\` (${decisions.filter((d) => d.action === 'keep' && d.field === 'label').length} rows kept).`;
  updateSection('teacher', md);
  console.log(`teacher: ${calls} calls, ${inTok} input tokens ≈ $${spend.toFixed(4)}; intent agree ${pct(intentAgree, n)}, correct ${pct(correctOk, n)}, risk agree ${pct(riskAgree, n)}, spans ${pct(spanOk, spanN)}; ${review.length} flagged`);
}

main().catch((e) => { console.log(`teacher: failed (${e.message}) — skipped`); process.exitCode = 0; });
#!/usr/bin/env node
// Latency benchmark. Run pinned to one core: `taskset -c 0 node scripts/bench.js` (npm run bench).
//  cold: spawn a fresh `node bin/tellsh.js --dry-run --json --shell bash <query>` (node startup + model load + full pipeline)
//  warm: in-process full pipeline per query: env/ctx tokens -> cascade (tool top-3 + intent) -> BIO tagger ->
//        regex fallback/merge -> render for the shell -> danger check (+ composer check)
import { spawnSync, execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { cpus } from 'node:os';
import { loadModel } from '../src/model.js';
import { suggest } from '../src/pipeline.js';
import { updateSection } from './report.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BIN = join(ROOT, 'bin', 'tellsh.js');
const COLD_RUNS = +(process.env.COLD_RUNS || 40);
const WARM_N = +(process.env.WARM_N || 2000);

const quantile = (arr, q) => { const s = [...arr].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(q * s.length))]; };
const fmt = (ms) => `${ms.toFixed(ms < 1 ? 3 : 1)} ms`;
const queries = readdirSync(join(ROOT, 'data', 'eval')).filter((f) => f.endsWith('.jsonl')).sort()
  .flatMap((f) => readFileSync(join(ROOT, 'data', 'eval', f), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l).text));

const nodeOnly = [];
for (let i = 0; i < 10; i++) { const t = performance.now(); spawnSync(process.execPath, ['-e', '0']); nodeOnly.push(performance.now() - t); }

const cold = [];
for (let i = 0; i < COLD_RUNS; i++) {
  const q = queries[(i * 37) % queries.length];
  const t = performance.now();
  const r = spawnSync(process.execPath, [BIN, '--dry-run', '--json', '--shell', 'bash', '--os', 'linux', q], { encoding: 'utf8' });
  cold.push(performance.now() - t);
  if (![0, 3, 5].includes(r.status)) throw new Error(`cold run failed (${r.status}): ${r.stderr}`);
}

const tl = performance.now();
const model = loadModel();
const loadMs = performance.now() - tl;

const run = (env, extra = {}) => {
  for (let i = 0; i < 200; i++) suggest(queries[i % queries.length], { model, env, ...extra });
  const times = [];
  for (let i = 0; i < WARM_N; i++) {
    const q = queries[(i * 7) % queries.length];
    const t = performance.now();
    suggest(q, { model, env, ...extra });
    times.push(performance.now() - t);
  }
  return times;
};
const warm = run({ shell: 'bash', os: 'linux', coreutils: 'gnu' }, { compose: 'off' });
const warmCompose = run({ shell: 'bash', os: 'linux', coreutils: 'gnu' });
const warmPs = run({ shell: 'powershell', os: 'win32', coreutils: 'gnu' });
const hist = ['docker run -d --name web nginx', 'cd ~/projects/api', 'tellsh ile zajmuje /home', 'git checkout -b feature/x', 'cat notes.txt'];
const warmHist = run({ shell: 'bash', os: 'linux', coreutils: 'gnu' }, { history: hist });

let affinity = 'unknown';
try { affinity = execFileSync('taskset', ['-cp', String(process.pid)], { encoding: 'utf8' }).trim().split(': ').pop(); } catch {}

const md = `## Latency

Machine: ${cpus()[0]?.model || 'unknown CPU'}, Node ${process.version}, ${process.platform}; CPU affinity: \`${affinity}\` (run via \`taskset -c 0\`).

| measurement | p50 | p95 | runs |
|---|---|---|---|
| bare \`node -e 0\` startup (baseline) | ${fmt(quantile(nodeOnly, 0.5))} | ${fmt(quantile(nodeOnly, 0.95))} | ${nodeOnly.length} |
| **cold**: \`node bin/tellsh.js --dry-run --json --shell bash <query>\` (new process, model load, full pipeline) | **${fmt(quantile(cold, 0.5))}** | **${fmt(quantile(cold, 0.95))}** | ${cold.length} |
| model load (in-process, one-off) | ${fmt(loadMs)} | – | 1 |
| **warm**: full cascade + tagger + render (bash, composer off) | **${fmt(quantile(warm, 0.5))}** | **${fmt(quantile(warm, 0.95))}** | ${warm.length} |
| warm, incl. composer modifier check (shipped default) | ${fmt(quantile(warmCompose, 0.5))} | ${fmt(quantile(warmCompose, 0.95))} | ${warmCompose.length} |
| warm, PowerShell rendering | ${fmt(quantile(warmPs, 0.5))} | ${fmt(quantile(warmPs, 0.95))} | ${warmPs.length} |
| warm, with 5 history lines (context build + reference rules) | ${fmt(quantile(warmHist, 0.5))} | ${fmt(quantile(warmHist, 0.95))} | ${warmHist.length} |

The composer runs \`bash -n\` (a subprocess, ~2 ms) only when it actually returns a composed command.
`;
updateSection('bench', md);
console.log(md);
#!/usr/bin/env node
// Derive weak NL triggers for composer flags from tldr-pages flag descriptions (data/tldr/flags.jsonl,
// CC-BY-4.0). For every (head [sub], flag) in the composer vocabulary keep the stems that are most
// specific to that flag relative to the tool's other flags. Output: model/tldr_triggers.json (small).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { TOOLS } from '../src/compose.js';
import { foldKeepLength } from '../src/slots.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const src = `${ROOT}data/tldr/flags.jsonl`;
if (!existsSync(src)) { console.error('no data/tldr/flags.jsonl (run scripts/tldr_ingest.py)'); process.exit(1); }
const rows = readFileSync(src, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const STOP = new Set(('the a an of in on to for and or with by from all show list display given specific current ' +
  'file files directory directories using use into only each its their this that which when what are is be as ' +
  'dla oraz albo jest lub ktore ktory tylko wszystkie plik pliki katalog katalogu').split(' '));
const stems = (t) => foldKeepLength(t).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/)
  .filter((w) => w.length > 2 && !STOP.has(w)).map((w) => w.slice(0, 5));

const out = {};
for (const [tn, spec] of Object.entries(TOOLS)) {
  const variants = spec.sub ? Object.entries(spec.sub).map(([s, v]) => [`${spec.head} ${s}`, v.flags, s]) : [[spec.head, spec.flags, null]];
  for (const [key, flags, sub] of variants) {
    const mine = rows.filter((r) => r.head === spec.head && (sub ? r.sub === sub : true));
    const vocab = new Set(flags.map((f) => f.flag.split(' ')[0]));
    const byFlag = {};
    const total = {};
    for (const r of mine) {
      const f = r.flag;
      const long = r.long;
      const k = vocab.has(f) ? f : vocab.has(long) ? long : null;
      for (const s of new Set(stems(r.text))) {
        total[s] = (total[s] || 0) + 1;
        if (k) (byFlag[k] ??= {})[s] = (byFlag[k][s] || 0) + 1;
      }
    }
    const entry = {};
    for (const [flag, counts] of Object.entries(byFlag)) {
      const ranked = Object.entries(counts).map(([s, c]) => [s, c / total[s] * Math.log(1 + c)])
        .filter(([, sc]) => sc > 0.3).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([s]) => s);
      if (ranked.length) entry[flag] = ranked;
    }
    if (Object.keys(entry).length) out[key] = entry;
  }
}
writeFileSync(`${ROOT}model/tldr_triggers.json`, JSON.stringify(out));

// "explained" flags: triggers that fire on >= 5% of an intent's own training paraphrases are part of what that
// intent means ("hidden" for hidden_files, "kernel" for dmesg) and must not make the composer replace it.
const { triggeredFlags } = await import('../src/compose.js');
const { FAMILY_OF } = await import('../src/tools.js');
const { readdirSync } = await import('node:fs');
const train = [...readdirSync(`${ROOT}data/intents`).filter((f) => f.endsWith('.jsonl')).flatMap((f) => readFileSync(`${ROOT}data/intents/${f}`, 'utf8').split('\n')),
  ...(existsSync(`${ROOT}data/shell/train.jsonl`) ? readFileSync(`${ROOT}data/shell/train.jsonl`, 'utf8').split('\n') : [])]
  .filter(Boolean).map((l) => JSON.parse(l));
const counts = {};
const totals = {};
for (const r of train) {
  totals[r.intent] = (totals[r.intent] || 0) + 1;
  for (const f of new Set(triggeredFlags(r.text, FAMILY_OF[r.intent]))) ((counts[r.intent] ??= {})[f] = (counts[r.intent][f] || 0) + 1);
}
const explained = {};
for (const [intent, c] of Object.entries(counts)) {
  const fl = Object.entries(c).filter(([, n]) => n / totals[intent] >= 0.05).map(([f]) => f).sort();
  if (fl.length) explained[intent] = fl;
}
writeFileSync(`${ROOT}model/compose_explained.json`, JSON.stringify(explained));
console.log(`model/compose_explained.json: ${Object.keys(explained).length} intents, e.g. hidden_files=${JSON.stringify(explained.hidden_files)} dmesg=${JSON.stringify(explained.dmesg)}`);
console.log(`model/tldr_triggers.json: ${Object.keys(out).length} tools, ${Object.values(out).reduce((a, e) => a + Object.keys(e).length, 0)} flags`);
console.log(JSON.stringify(out.ls), JSON.stringify(out['git log']));
// Normalisation of simple commands for the composer eval. Only rewrites that keep the behaviour:
//   option bundling / order for ordinary commands: "ls -ltr" == "ls -l -r -t"; "tar -tzvf a.tgz" == "tar -t -z -v -f a.tgz"
//   attached values: "head -n5 f" == "head -n 5 f" == "head -5 f"
//   quoting: 'a.txt' == a.txt (words are compared after shell unquoting)
// Kept strict: argument boundaries ('a b' != a b), case (-name != -iname, '*.LOG' != '*.log'),
// find's expression order (filters before -delete matter), and every pipeline stage in order.
import { splitCommand, rawOf } from '../../src/shellwords.js';

const VALUE_FLAGS = {
  grep: ['-A', '-B', '-C', '-e', '-m', '-f'],
  head: ['-n', '-c'], tail: ['-n', '-c'], sort: ['-k', '-t'], du: ['-d', '-t'], df: ['-t'],
  tar: ['-f', '-C'], ps: ['-u', '-o', '-p', '-C'], journalctl: ['-u', '-n', '-p'], wc: [], ls: [],
  'git log': ['-n'], 'docker ps': ['-n', '-f'], 'docker images': ['-f'],
};

/** Shell words of a command (unquoted). Kept for callers that only need the word list. */
export function shellWords(s) {
  const r = splitCommand(String(s));
  return r.ok ? r.segments.flatMap((g) => g.words.map(rawOf)) : String(s).split(/\s+/).filter(Boolean);
}

function normSegment(w) {
  const head = w[0] || '';
  let i = 1;
  let sub = '';
  if ((head === 'git' || head === 'docker') && w[1]) { sub = w[1]; i = 2; }
  const key = sub ? `${head} ${sub}` : head;
  if (head === 'find') return { key, flags: [], args: w.slice(1) }; // the expression is order-sensitive: compare verbatim
  const vf = VALUE_FLAGS[key] ?? VALUE_FLAGS[head] ?? [];
  const flags = [];
  const args = [];
  for (; i < w.length; i++) {
    const t = w[i];
    if (t === '--') { const rest = w.slice(i + 1); args.push(...(rest.some((x) => /^-/.test(x)) ? ['--'] : []), ...rest); break; } // `--` is a no-op unless an operand starts with -
    if (/^--[\w-]+=/.test(t)) { flags.push(t); continue; }
    if (/^--/.test(t)) { flags.push(vf.includes(t) ? `${t} ${w[++i] ?? ''}` : t); continue; }
    if (/^-\d+$/.test(t) && ['head', 'tail'].includes(head)) { flags.push(`-n ${t.slice(1)}`); continue; }
    if (/^-[A-Za-z]/.test(t)) {
      const letters = t.slice(1);
      for (let k = 0; k < letters.length; k++) {
        const f = '-' + letters[k];
        if (/\d/.test(letters[k])) { flags.push(f); continue; }
        if (vf.includes(f)) {
          const rest = letters.slice(k + 1);
          flags.push(`${f} ${rest || (w[++i] ?? '')}`);
          break;
        }
        flags.push(f);
      }
      continue;
    }
    if (head === 'ps' && /^[a-z]+$/.test(t) && i === 1) { for (const c of t) flags.push('bsd:' + c); continue; }
    args.push(t);
  }
  return { key, flags: [...new Set(flags)].sort(), args };
}

export function normCmd(cmd) {
  const r = splitCommand(String(cmd).trim(), 'posix', { keepRedirects: true });
  if (!r.ok) return 'raw:' + String(cmd).trim();
  return JSON.stringify(r.segments.map((g) => ({ ...normSegment(g.words.map(rawOf)), sep: g.sep })));
}

export const sameCmd = (a, b) => normCmd(a) === normCmd(b);

 succeeded in 0ms:
#!/usr/bin/env node
// Build featurised training data for scripts/train.py (all features computed by src/features.js, so
// training and runtime share one implementation). Writes build/cls.jsonl, build/tag.jsonl, build/meta.json.
//
//   classifier rows: {y: family, i: intent|"", f: [[idx, val], ...], w, g: source, lang, gid}
//   tagger rows:     {tool, f: [[idx, ...] per token], y: [BIO label per token], gid}
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { INTENTS } from '../src/catalog.js';
import { FAMILIES, FAMILY_OF, NONE, TAG_TYPES } from '../src/tools.js';
import { vectorize, normalize, tagTokens, tagFeatures } from '../src/features.js';
import { ctxFeatures } from '../src/history.js';
import { silverSpans, relex, bioLabels, mulberry32 } from './lib/silver.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
export const DIM = 1 << 18;
export const TAG_DIM = 1 << 18;
const args = process.argv.slice(2);
const SEED = +(args.find((a) => a.startsWith('--seed='))?.slice(7) || 13);
const rng = mulberry32(SEED);
const pick = (arr) => arr[Math.floor(rng() * arr.length)];

const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l, i) => {
  try { return JSON.parse(l); } catch (e) { throw new Error(`${p}:${i + 1}: ${e.message}`); }
}) : []);
const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);

// ---------- environment / context sampling ----------
const SHELL_P = [['bash', 0.35], ['zsh', 0.25], ['sh', 0.07], ['powershell', 0.18], ['fish', 0.08], ['cmd', 0.07]];
function sampleEnv(shell) {
  let s = shell;
  if (!s) { let r = rng(); for (const [k, p] of SHELL_P) { if ((r -= p) <= 0) { s = k; break; } } s ??= 'bash'; }
  let os;
  if (s === 'cmd') os = 'win32';
  else if (s === 'powershell') os = rng() < 0.7 ? 'win32' : rng() < 0.5 ? 'linux' : 'darwin';
  else if (s === 'zsh') os = rng() < 0.6 ? 'darwin' : 'linux';
  else os = rng() < 0.7 ? 'linux' : 'darwin';
  return [`shell=${s}`, `os=${os}`];
}
const ENT_FAMILY = { container: 'docker', service: 'systemctl', pid: 'ps', proc: 'ps', port: 'ss', file: 'cat', dir: 'ls', branch: 'git', host: 'ping', url: 'curl' };
const ENTS = Object.keys(ENT_FAMILY);
function randomCtx(main) {
  const types = [...new Set([main ?? pick(ENTS), ...ENTS.filter(() => rng() < 0.15)])];
  const fam = rng() < 0.7 ? ENT_FAMILY[types[0]] : pick(Object.keys(FAMILIES));
  return ctxFeatures({ entOrder: types, last: { intent: FAMILIES[fam][0] }, cwdFlags: rng() < 0.3 ? ['git'] : [] });
}

// ---------- typo augmentation ----------
function typo(text) {
  const chars = [...text];
  const idxs = chars.map((c, i) => (/\p{L}/u.test(c) ? i : -1)).filter((i) => i >= 0);
  if (idxs.length < 4) return text;
  const i = idxs[1 + Math.floor(rng() * (idxs.length - 2))];
  const op = rng();
  if (op < 0.4) chars.splice(i, 1);
  else if (op < 0.8 && /\p{L}/u.test(chars[i + 1] || '')) [chars[i], chars[i + 1]] = [chars[i + 1], chars[i]];
  else chars.splice(i, 0, chars[i]);
  return chars.join('');
}

// ---------- anaphora (history reference) samples ----------
const ANAPHORA = {
  kill: { en: ['kill it', 'kill that', 'kill that process', 'terminate it', 'kill it now', 'kill this one', 'end that process', 'just kill it'],
    pl: ['zabij go', 'zabij to', 'ubij go', 'zabij ten proces', 'zakończ go', 'ubij ten proces', 'zabij tamten', 'ubij to'],
    map: { pid: 'kill_by_pid', proc: 'kill_by_name', port: 'kill_by_port', container: 'docker_stop' } },
  logs: { en: ['show its logs', 'logs of that container', 'show logs for it', 'logs of it', 'tail its logs', "show that service's logs", 'what did it log'],
    pl: ['pokaż jego logi', 'logi tego kontenera', 'pokaż logi tego', 'logi tej usługi', 'pokaż z niego logi', 'logi z tego', 'co tam loguje'],
    map: { container: 'docker_logs', service: 'journal_service' } },
  restart: { en: ['restart it', 'restart that service', 'restart that', 'reload it', 'bounce it'],
    pl: ['zrestartuj go', 'zrestartuj tę usługę', 'zrestartuj to', 'uruchom go ponownie', 'przeładuj to'],
    map: { service: 'service_restart' } },
  stop: { en: ['stop it', 'stop that', 'stop that container', 'stop this service', 'shut it down'],
    pl: ['zatrzymaj go', 'zatrzymaj to', 'zatrzymaj ten kontener', 'zatrzymaj tę usługę', 'wyłącz to'],
    map: { container: 'docker_stop', service: 'service_stop', pid: 'kill_by_pid', proc: 'kill_by_name' } },
  start: { en: ['start it', 'start that service', 'start it again'], pl: ['uruchom go', 'wystartuj tę usługę', 'włącz to'],
    map: { service: 'service_start' } },
  delete: { en: ['delete it', 'remove that', 'remove that file', 'delete this', 'rm it', 'get rid of it', 'delete that branch', 'delete that folder'],
    pl: ['usuń to', 'usuń go', 'skasuj to', 'usuń ten plik', 'wywal to', 'skasuj tę gałąź', 'usuń ten folder', 'usuń tamto'],
    map: { file: 'delete_file', dir: 'delete_dir', branch: 'git_delete_branch' } },
  enter: { en: ['open a shell in it', 'exec into it', 'enter that container'], pl: ['wejdź do niego', 'wejdź do tego kontenera', 'otwórz w nim shell'],
    map: { container: 'docker_exec' } },
  switch: { en: ['switch to it', 'checkout that branch', 'go to that branch'], pl: ['przełącz się na nią', 'przejdź na tę gałąź', 'checkout na to'],
    map: { branch: 'git_switch_branch' } },
  status: { en: ['status of it', "what's its status", 'is it running'], pl: ['jaki ma status', 'status tego', 'czy to działa'],
    map: { service: 'service_status' } },
  size: { en: ['how big is it', 'size of that', "what's its size"], pl: ['ile to zajmuje', 'jaki ma rozmiar', 'ile waży ten folder'],
    map: { dir: 'dir_size', file: 'file_stat' } },
  show: { en: ['show it', 'open it', 'print it', 'cat that file', 'display that'], pl: ['pokaż go', 'pokaż to', 'wyświetl ten plik', 'otwórz to', 'wypisz to'],
    map: { file: 'cat_file', dir: 'list_files' } },
  ping: { en: ['ping it', 'ping that host'], pl: ['pingnij go', 'spinguj ten serwer'], map: { host: 'ping_host' } },
  connect: { en: ['ssh into it', 'connect to it'], pl: ['połącz się z nim', 'zaloguj się na niego'], map: { host: 'ssh_connect' } },
};

// ---------------------------------------------------------------------------------------------
function main() {
  const outDir = join(ROOT, 'build');
  mkdirSync(outDir, { recursive: true });
  const ids = new Set(INTENTS.map((i) => i.id));

  // held-out texts (never trained on)
  const heldOut = new Set([
    ...readDir(join(ROOT, 'data', 'eval')).map((r) => r.text),
    ...readJsonl(join(ROOT, 'data', 'shell', 'eval.jsonl')).map((r) => r.text),
    ...readJsonl(join(ROOT, 'data', 'history', 'eval.jsonl')).map((r) => r.query),
    ...readJsonl(join(ROOT, 'data', 'compose', 'eval.jsonl')).map((r) => r.text),
    ...readJsonl(join(ROOT, 'data', 'slots', 'gold.jsonl')).map((r) => r.text),
    ...readJsonl(join(ROOT, 'data', 'ood_eval.jsonl')).map((r) => r.text),
  ].map(normalize));

  const intentRows = [...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'train.jsonl'))]
    .map((r) => ({ ...r, src: 'intents' }));
  const shellRows = readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell' }));
  for (const r of [...intentRows, ...shellRows]) if (!ids.has(r.intent)) throw new Error(`unknown intent ${r.intent}: ${r.text}`);

  // teacher review decisions (data/teacher/decisions.jsonl): drop or relabel individual training rows
  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl')).filter((d) => d.text && d.field !== 'risk');
  const decide = new Map(decisions.map((d) => [normalize(d.text), d]));
  let dropped = 0;
  let teacherDropped = 0;
  const seen = new Set();
  const base = [];
  for (const r0 of [...intentRows, ...shellRows]) {
    const n = normalize(r0.text);
    if (heldOut.has(n)) { dropped++; continue; }
    const d = decide.get(n);
    if (d?.action === 'drop') { teacherDropped++; continue; }
    const r = d?.action === 'relabel' && d.intent ? { ...r0, intent: d.intent } : r0;
    const key = n + '|' + r.intent + '|' + (r.shell || '');
    if (seen.has(key)) continue;
    seen.add(key);
    base.push(r);
  }

  const cls = createWriteStream(join(outDir, 'cls.jsonl'));
  const tag = createWriteStream(join(outDir, 'tag.jsonl'));
  const counts = { cls: 0, tag: 0, bySrc: {} };
  let gid = 0;
  const emit = (text, family, intent, extras, w, g, lang, group) => {
    const f = [...vectorize(text, DIM, extras).entries()].sort((a, b) => a[0] - b[0]).map(([k, v]) => [k, +v.toFixed(6)]);
    cls.write(JSON.stringify({ y: family, i: intent || '', f, w, g, lang: lang || '', gid: group }) + '\n');
    counts.cls++;
    counts.bySrc[g] = (counts.bySrc[g] || 0) + 1;
  };
  const emitTag = (text, spans, tool, group) => {
    const toks = tagTokens(text);
    if (!toks.length) return;
    const y = bioLabels(toks, spans);
    tag.write(JSON.stringify({ tool, f: tagFeatures(toks, tool, TAG_DIM), y, gid: group }) + '\n');
    counts.tag++;
  };

  // 1. intent paraphrases (+ typo copy, + relexicalised copy), random env, some ctx noise
  for (const r of base) {
    const g = gid++;
    const fam = FAMILY_OF[r.intent];
    const env = () => (r.shell ? [`shell=${r.shell}`, `os=${r.os || 'linux'}`] : sampleEnv());
    const ctx = () => (rng() < 0.25 ? randomCtx() : []);
    emit(r.text, fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g);
    emit(typo(r.text), fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g);
    const { spans } = silverSpans(r.text, r.intent);
    emitTag(r.text, spans, fam, g);
    for (let k = 0; k < 2; k++) {
      const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'train' });
      emitTag(rx.text, rx.spans, fam, g);
      if (k === 0 && rx.text !== r.text) emit(rx.text, fam, r.intent, [...env(), ...ctx()], 0.5, r.src, r.lang, g);
    }
  }

  // 2. history anaphora: pronoun requests whose intent depends on ctx_ features
  let nAna = 0;
  for (const [, v] of Object.entries(ANAPHORA)) {
    for (const [ent, intent] of Object.entries(v.map)) {
      for (const lang of ['en', 'pl']) {
        for (const text of v[lang]) {
          for (let k = 0; k < 3; k++) {
            const g = gid++;
            emit(text, FAMILY_OF[intent], intent, [...sampleEnv(), ...randomCtx(ent)], 1, 'ctx', lang, g);
            if (k === 0) emitTag(text, [], FAMILY_OF[intent], g);
            nAna++;
          }
        }
      }
    }
  }

  // 3. tldr descriptions (CC-BY-4.0): stage-1 tool labels only, capped per family/lang
  const tldr = readJsonl(join(ROOT, 'data', 'tldr', 'tools.jsonl'));
  const cap = {};
  let nT = 0;
  for (const r of tldr.sort(() => rng() - 0.5)) {
    if (!FAMILIES[r.tool] || !r.text || r.text.length < 8) continue;
    if (heldOut.has(normalize(r.text))) continue;
    const key = r.tool + r.lang;
    if ((cap[key] = (cap[key] || 0) + 1) > (r.lang === 'pl' ? 60 : 80)) continue;
    const win = /^windows\//.test(r.page || '');
    emit(r.text, r.tool, '', win ? ['shell=powershell', 'os=win32'] : sampleEnv(), 0.5, 'tldr', r.lang, gid++);
    nT++;
  }

  // 4. out-of-domain -> __none__
  const ood = readJsonl(join(ROOT, 'data', 'ood.jsonl'));
  for (const r of ood) {
    if (heldOut.has(normalize(r.text))) continue;
    const g = gid++;
    emit(r.text, NONE, '', sampleEnv(), 1, 'ood', r.lang, g);
    emit(typo(r.text), NONE, '', [...sampleEnv(), ...(rng() < 0.25 ? randomCtx() : [])], 1, 'ood', r.lang, g);
  }

  cls.end();
  tag.end();
  const tagLabels = ['O', ...TAG_TYPES.flatMap((t) => [`B-${t}`, `I-${t}`])];
  const meta = {
    dim: DIM, tagDim: TAG_DIM, seed: SEED,
    families: [...Object.keys(FAMILIES), NONE],
    intentsByFamily: FAMILIES,
    tagLabels,
    counts: { ...counts, base: base.length, droppedHeldOut: dropped, teacherDropped, anaphora: nAna, tldr: nT, ood: ood.length },
  };
  writeFileSync(join(outDir, 'meta.json'), JSON.stringify(meta, null, 1));
  console.log(`gen_data: ${base.length} base sentences (${dropped} dropped: collide with held-out sets), ` +
    `${counts.cls} classifier rows ${JSON.stringify(counts.bySrc)}, ${counts.tag} tagger sequences, ${nT} tldr rows, ${nAna} anaphora rows`);
}

main();
#!/usr/bin/env python3
"""Train the tellsh v0.2 cascade and export model/model.bin (TSH2).

Input: build/cls.jsonl, build/tag.jsonl, build/meta.json written by `node scripts/gen_data.js`
(features are computed in JS by src/features.js -- the same code used at runtime).

Models (all multinomial logistic regression, int8-quantised, top-K feature rows kept):
  tool          stage 1: request -> tool family (+ __none__ for non-shell requests)
  intent:<fam>  stage 2: request -> intent, one model per family with >1 intent
  tagger        stage 3: token -> BIO slot label (tool is an input feature)

Thresholds are calibrated on a group-wise holdout (all copies of a sentence stay on one side):
  accept   cascade score p(tool) * p(intent|tool) needed to answer from the catalog
  compose  stage-1 tool probability needed to try the experimental composer instead

Usage: python3 scripts/train.py [--keep-tool 20000] [--C 30] [--tagC 2]
"""
import argparse
import json
import os
import struct
import sys
import time

import numpy as np
from scipy import sparse
from sklearn.linear_model import LogisticRegression

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, 'build')


def log(*a):
    print(*a, flush=True)


# ---------------------------------------------------------------------------------------------
# loading

def load_cls(dim):
    rows = [json.loads(l) for l in open(os.path.join(BUILD, 'cls.jsonl'), encoding='utf-8')]
    indptr, indices, data = [0], [], []
    for r in rows:
        for k, v in r['f']:
            indices.append(k)
            data.append(v)
        indptr.append(len(indices))
    X = sparse.csr_matrix((np.array(data), np.array(indices), np.array(indptr)), shape=(len(rows), dim))
    return rows, X


def load_tag(dim):
    seqs = [json.loads(l) for l in open(os.path.join(BUILD, 'tag.jsonl'), encoding='utf-8')]
    indptr, indices, ys, gids, seq_of = [0], [], [], [], []
    for si, s in enumerate(seqs):
        for f, y in zip(s['f'], s['y']):
            indices.extend(sorted(set(f)))
            indptr.append(len(indices))
            ys.append(y)
            gids.append(s['gid'])
            seq_of.append(si)
    X = sparse.csr_matrix((np.ones(len(indices)), np.array(indices), np.array(indptr)), shape=(len(ys), dim))
    return seqs, X, np.array(ys), np.array(gids), np.array(seq_of)


# ---------------------------------------------------------------------------------------------
# model helpers

class Compact:
    """LogisticRegression fitted on the non-empty columns only; exposes full-width coef."""

    def __init__(self, clf, cols, dim, labels):
        self.clf, self.cols, self.labels = clf, cols, list(labels)
        self.coef = np.zeros((len(self.labels), dim))
        if len(self.labels) == 2 and clf.coef_.shape[0] == 1:  # binary: expand to 2 classes
            self.coef[1, cols] = clf.coef_[0] / 2
            self.coef[0, cols] = -clf.coef_[0] / 2
            self.bias = np.array([-clf.intercept_[0] / 2, clf.intercept_[0] / 2])
        else:
            self.coef[:, cols] = clf.coef_
            self.bias = clf.intercept_.copy()

    def proba(self, X):
        z = X @ self.coef.T + self.bias
        z -= z.max(1, keepdims=True)
        e = np.exp(z)
        return e / e.sum(1, keepdims=True)


def fit(X, y, C, w=None, max_iter=1000):
    cols = np.flatnonzero(np.asarray((X != 0).sum(0)).ravel())
    labels = sorted(set(y))
    clf = LogisticRegression(C=C, max_iter=max_iter, tol=1e-4)
    clf.fit(X[:, cols], y, sample_weight=w)
    assert list(clf.classes_) == labels
    return Compact(clf, cols, X.shape[1], labels)


def prune_refit(X, y, C, keep, w=None):
    """Fit, keep the `keep` feature rows with the largest weight norm, refit on those rows only."""
    m = fit(X, y, C, w)
    norms = np.sqrt((m.coef ** 2).sum(0))
    used = np.flatnonzero(norms > 0)
    k = min(keep, len(used))
    rows = np.sort(used[np.argsort(-norms[used])[:k]])
    mask = np.zeros(X.shape[1], bool)
    mask[rows] = True
    Xr = X.multiply(mask[None, :]).tocsr() if k < len(used) else X
    m2 = fit(Xr, y, C, w)
    W = m2.coef[:, rows].T  # (rows, classes)
    return {'labels': m2.labels, 'rows': rows, 'W': W, 'b': m2.bias, 'model': m2}


def quantize(W):
    scale = np.abs(W).max(axis=0) / 127.0
    scale[scale == 0] = 1.0
    Q = np.clip(np.round(W / scale), -127, 127).astype(np.int8)
    return Q, scale.astype(np.float32)


# ---------------------------------------------------------------------------------------------
# cascade

def cascade_scores(p_tool, tool_labels, intent_models, X, fam_intents, k=3):
    """For each row: best (intent, score, tool_p, tool) using top-k tools; score = p(tool)*p(intent|tool)."""
    out = []
    none = tool_labels.index('__none__') if '__none__' in tool_labels else -1
    cache = {}
    for fam, m in intent_models.items():
        cache[fam] = m.proba(X)
    for r in range(X.shape[0]):
        order = np.argsort(-p_tool[r])
        best = (None, 0.0, 0.0, None)
        cand = [t for t in order if t != none][:k]
        for t in cand:
            fam = tool_labels[t]
            pt = p_tool[r, t]
            if fam in cache:
                pi = cache[fam][r]
                j = int(np.argmax(pi))
                s, intent = pt * pi[j], intent_models[fam].labels[j]
            else:
                s, intent = pt, fam_intents[fam][0]
            if s > best[1]:
                best = (intent, s, pt, fam)
        top_tool = tool_labels[order[0]]
        out.append((best[0], best[1], p_tool[r, order[0]], top_tool, [tool_labels[t] for t in cand]))
    return out


def train_all(rows, X, meta, idx, C, keep_tool, keep_int, log_prefix=''):
    """Train tool + intent models on row subset idx."""
    y_tool = np.array([rows[i]['y'] for i in idx])
    w = np.array([rows[i]['w'] for i in idx], dtype=float)
    Xs = X[idx]
    t0 = time.time()
    tool = prune_refit(Xs, y_tool, C, keep_tool, w)
    log(f'{log_prefix}tool model: {len(tool["labels"])} classes, {len(tool["rows"])} rows ({time.time() - t0:.0f}s)')
    intents = {}
    for fam, ids in meta['intentsByFamily'].items():
        if len(ids) < 2:
            continue
        sub = [i for i in idx if rows[i]['y'] == fam and rows[i]['i']]
        ys = np.array([rows[i]['i'] for i in sub])
        if len(set(ys)) < 2:
            continue
        intents[fam] = prune_refit(X[sub], ys, C, keep_int(len(ids)), np.array([rows[i]['w'] for i in sub], dtype=float))
    log(f'{log_prefix}intent models: {len(intents)} families ({time.time() - t0:.0f}s)')
    return tool, intents


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--C', type=float, default=30.0)
    ap.add_argument('--tagC', type=float, default=2.0)
    ap.add_argument('--keep-tool', type=int, default=20000)
    ap.add_argument('--keep-tag', type=int, default=24000)
    ap.add_argument('--holdout', type=float, default=0.15)
    ap.add_argument('--seed', type=int, default=13)
    ap.add_argument('--out', default=os.path.join(ROOT, 'model', 'model.bin'))
    args = ap.parse_args()
    t0 = time.time()
    meta = json.load(open(os.path.join(BUILD, 'meta.json')))
    dim, tag_dim = meta['dim'], meta['tagDim']
    rows, X = load_cls(dim)
    log(f'{len(rows)} classifier rows, {X.nnz} nnz')
    keep_int = lambda n: 1500 + 250 * n  # noqa: E731
    fam_intents = meta['intentsByFamily']

    # ---------------- calibration on a group-wise holdout ----------------
    rng = np.random.default_rng(args.seed)
    gids = np.array([r['gid'] for r in rows])
    ug = np.unique(gids)
    ho_g = set(rng.choice(ug, int(len(ug) * args.holdout), replace=False).tolist())
    is_ho = np.array([g in ho_g for g in gids])
    # evaluate on the original (non-augmented) sentence of each group only: first row of the group
    first = np.zeros(len(rows), bool)
    seen = set()
    for i, g in enumerate(gids):
        if g not in seen:
            first[i] = True
            seen.add(g)
    tr_idx = np.flatnonzero(~is_ho)
    ho_idx = np.flatnonzero(is_ho & first)
    tool_s, int_s = train_all(rows, X, meta, tr_idx, args.C, args.keep_tool, keep_int, '[split] ')
    Xho = X[ho_idx]
    p_tool = tool_s['model'].proba(Xho)
    res = cascade_scores(p_tool, tool_s['labels'], {f: m['model'] for f, m in int_s.items()}, Xho, fam_intents)
    gold_i = [rows[i]['i'] for i in ho_idx]
    gold_t = [rows[i]['y'] for i in ho_idx]
    ind = np.array([g != '__none__' and gi != '' for g, gi in zip(gold_t, gold_i)])
    oodm = np.array([g == '__none__' for g in gold_t])
    score = np.array([r[1] for r in res])
    correct = np.array([r[0] == gi for r, gi in zip(res, gold_i)])
    t1 = np.array([r[3] == g for r, g in zip(res, gold_t)])
    t3 = np.array([g in r[4] for r, g in zip(res, gold_t)])
    log(f'[split] holdout: intent acc={correct[ind].mean():.4f} tool top1={t1[ind].mean():.4f} top3={t3[ind].mean():.4f} '
        f'(n={ind.sum()}, ood n={oodm.sum()})')
    best_t, best_s = 0.0, -1
    for t in np.arange(0.02, 0.6, 0.005):
        keep_c = (score[ind & correct] >= t).mean()
        rej_w = (score[ind & ~correct] < t).mean() if (ind & ~correct).any() else 1.0
        rej_o = (score[oodm] < t).mean() if oodm.any() else 0.0
        if keep_c < 0.97:
            continue
        s = keep_c + 0.5 * rej_o + 0.25 * rej_w
        if s > best_s:
            best_t, best_s = float(t), s
    # compose threshold: stage-1 top tool probability (non-__none__) that lets <=5% of OOD through
    top_nn = np.array([r[2] if r[3] != '__none__' else 0.0 for r in res])
    cands = [t for t in np.arange(0.1, 0.95, 0.01) if (top_nn[oodm] >= t).mean() <= 0.05] if oodm.any() else [0.5]
    compose_t = float(cands[0]) if cands else 0.9
    log(f'accept threshold={best_t:.3f} (correct kept={(score[ind & correct] >= best_t).mean():.3f}, '
        f'OOD rejected={(score[oodm] < best_t).mean() if oodm.any() else float("nan"):.3f}); compose tool threshold={compose_t:.2f}')

    # ---------------- final models on all data ----------------
    all_idx = np.arange(len(rows))
    tool, intents = train_all(rows, X, meta, all_idx, args.C, args.keep_tool, keep_int, '[final] ')

    # ---------------- tagger ----------------
    seqs, XT, yT, gT, seq_of = load_tag(tag_dim)
    log(f'tagger: {len(seqs)} sequences, {XT.shape[0]} tokens')
    ho_t = np.array([g in ho_g for g in gT])
    tt = time.time()
    tag_split = fit(XT[~ho_t], yT[~ho_t], args.tagC)
    pred = np.array(tag_split.labels)[tag_split.proba(XT[ho_t]).argmax(1)]
    gold = yT[ho_t]
    nz = gold != 'O'
    log(f'[split] tagger token acc={np.mean(pred == gold):.4f} non-O recall={np.mean(pred[nz] == gold[nz]):.4f} '
        f'non-O precision={np.mean(pred[pred != "O"] == gold[pred != "O"]):.4f} ({time.time() - tt:.0f}s)')
    tagger = prune_refit(XT, yT, args.tagC, args.keep_tag)
    log(f'[final] tagger: {len(tagger["labels"])} labels, {len(tagger["rows"])} rows ({time.time() - tt:.0f}s)')

    # ---------------- export ----------------
    models = {'tool': tool, 'tagger': tagger}
    for fam, m in intents.items():
        models['intent:' + fam] = m
    header = {
        'version': 2, 'dim': dim, 'tagDim': tag_dim,
        'thresholds': {'accept': round(best_t, 4), 'compose': round(compose_t, 4)},
        'C': args.C, 'tagC': args.tagC, 'trained': time.strftime('%Y-%m-%d'),
        'n_train': int(sum(1 for r in rows if r['g'] in ('intents', 'shell')) // 2),
        'n_rows': len(rows), 'n_tag_seqs': len(seqs),
        'intentsByFamily': fam_intents,
        'holdout': {'intent_acc': round(float(correct[ind].mean()), 4), 'tool_top1': round(float(t1[ind].mean()), 4),
                    'tool_top3': round(float(t3[ind].mean()), 4)},
        'models': {},
    }
    payload = bytearray()
    blobs = {}
    for name, m in models.items():
        Q, scale = quantize(m['W'])
        b = np.asarray(m['b'], dtype=np.float32)
        blob = m['rows'].astype('<u4').tobytes() + scale.astype('<f4').tobytes() + b.astype('<f4').tobytes() + Q.tobytes(order='C')
        blob += b'\0' * ((4 - len(blob) % 4) % 4)
        header['models'][name] = {'labels': m['labels'], 'rows': int(len(m['rows'])), 'offset': len(payload)}
        payload += blob
        blobs[name] = (m['rows'], Q, scale, b)
    hb = json.dumps(header, separators=(',', ':')).encode('utf-8')
    hb += b' ' * ((4 - (8 + len(hb)) % 4) % 4)
    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, 'wb') as f:
        f.write(b'TSH2')
        f.write(struct.pack('<I', len(hb)))
        f.write(hb)
        f.write(payload)
    log(f'wrote {args.out} ({os.path.getsize(args.out) / 1e6:.2f} MB): ' +
        ', '.join(f'{n}={len(m["rows"])}x{len(m["labels"])}' for n, m in models.items() if not n.startswith('intent:')) +
        f', {len(intents)} intent models ({sum(len(m["rows"]) * len(m["labels"]) for m in intents.values())} weights)')

    # ---------------- parity fixture (JS inference must reproduce these probabilities) ----------------
    def q_proba(name, feats):
        rws, Q, scale, b = blobs[name]
        pos = {int(r): k for k, r in enumerate(rws)}
        z = b.astype(np.float64).copy()
        for k, v in feats:
            if k in pos:
                z += v * Q[pos[k]].astype(np.float64) * scale.astype(np.float64)
        z -= z.max()
        e = np.exp(z)
        return e / e.sum()

    fx = {'cls': [], 'tag': []}
    step = max(1, len(rows) // 30)
    for r in rows[::step][:30]:
        p = q_proba('tool', r['f'])
        fx['cls'].append({'model': 'tool', 'f': r['f'], 'top': [[header['models']['tool']['labels'][i], float(p[i])] for i in np.argsort(-p)[:3]]})
        fam = r['y']
        if 'intent:' + fam in blobs:
            p = q_proba('intent:' + fam, r['f'])
            labels = header['models']['intent:' + fam]['labels']
            fx['cls'].append({'model': 'intent:' + fam, 'f': r['f'], 'top': [[labels[i], float(p[i])] for i in np.argsort(-p)[:2]]})
    for s in seqs[::max(1, len(seqs) // 10)][:10]:
        for f in s['f'][:3]:
            p = q_proba('tagger', [(k, 1.0) for k in sorted(set(f))])
            fx['tag'].append({'f': sorted(set(f)), 'top': [[header['models']['tagger']['labels'][i], float(p[i])] for i in np.argsort(-p)[:2]]})
    with open(os.path.join(ROOT, 'test', 'fixtures', 'parity.json'), 'w', encoding='utf-8') as f:
        json.dump(fx, f)
    log(f'wrote test/fixtures/parity.json; done in {time.time() - t0:.0f}s')


if __name__ == '__main__':
    main()

exec
/bin/bash -lc 'cat src/fill.js src/danger.js src/catalog.js' in /workspace/tellsh
 succeeded in 0ms:
// Turn (intent, slots) into a concrete, safely-quoted command for the target shell.
import { BY_ID } from './catalog.js';
import { extractSlots, pickArg, pickDest, pickDir } from './slots.js';
import { checkDanger, maxRisk } from './danger.js';
import { shQuote, psQuote, chooseTemplate, quoteForKind, UnquotableError } from './render.js';

export { shQuote };

// Validators for slots that are inserted raw ({slot!raw}).
export const RAW_OK = {
  count: (v) => /^\d{1,6}$/.test(String(v)),
  depth: (v) => /^\d{1,2}$/.test(String(v)),
  days: (v) => /^\d{1,5}$/.test(String(v)),
  pid: (v) => /^\d{1,7}$/.test(String(v)),
  port: (v) => /^\d{1,5}$/.test(String(v)) && +v > 0 && +v < 65536,
  size: (v) => /^\d+[ckMG]?$/.test(String(v)),
  age: (v) => /^-m(?:min|time) -\d+$/.test(String(v)),
  mode: (v) => /^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(String(v)),
  var: (v) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(String(v)),
  minutes: (v) => /^\d{1,7}$/.test(String(v)),
  sizeBytes: (v) => /^\d{1,16}$/.test(String(v)),
};

const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
const PLACEHOLDER = (name) => `<${name.toUpperCase()}>`;

// sed needs regex-escaped search text and &,\,/ escaped replacement
const sedEscapeOld = (s) => s.replace(/[\\/.*^$[\]]/g, '\\$&');
const sedEscapeNew = (s) => s.replace(/[\\/&]/g, '\\$&').replace(/\n/g, '\\n');

/** Recompute derived slots after values were merged/overridden (tagger, history rules). */
export function finalizeSlots(intent, v) {
  if (v.ext != null && v.glob == null) v.glob = `*.${v.ext}`;
  if (intent.id === 'find_by_name' && v.name) v.namepat = /[*?]/.test(v.name) || /\.\w+$/.test(v.name) ? v.name : `*${v.name}*`;
  if (intent.id === 'replace_text' && v.old != null && v.new != null) v.sedexpr = `s/${sedEscapeOld(v.old)}/${sedEscapeNew(v.new)}/g`;
  return v;
}

/** Resolve the values an intent can use from the generic extraction. */
export function resolveSlots(intent, ex) {
  const v = {};
  const has = (k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
  const textual = ['pattern', 'message', 'text', 'name', 'old', 'branch', 'service', 'container', 'pkg', 'cmd', 'user']
    .some((k) => k in intent.slots) || ['base64_encode', 'base64_decode', 'replace_text', 'find_by_name'].includes(intent.id);
  const paths = [...(textual ? ex.paths : ex.pathsWithQuoted)];

  // archive-type paths (compress/extract)
  const isArchive = (p) => /\.(tar\.gz|tgz|tar|zip|tar\.bz2|tar\.xz|gz)$/i.test(p) && !/^(tar\.gz|tar|tgz|zip|gz)$/i.test(p);
  if (has('archive')) {
    const a = paths.find(isArchive);
    if (a) { v.archive = a; paths.splice(paths.indexOf(a), 1); }
  }
  if (has('src') || has('dst')) {
    if (paths[0]) v.src = paths[0];
    if (paths[1]) v.dst = paths[1];
    else if (paths[0]) {
      const d = pickDest(ex);
      if (d && d !== paths[0]) v.dst = d;
    }
  }
  if (has('file')) {
    const f = paths.find((p) => /\.[A-Za-z0-9]+$/.test(p) || p.includes('/')) || paths[0];
    if (f) v.file = f;
    if (has('dest') && paths.length > 1) v.dest = paths.find((p) => p !== f);
  }
  if (has('path') && paths.length) {
    v.path = paths[0];
  } else if (has('path') && !['find_by_name', 'chown'].includes(intent.id)) {
    const d = pickDir(ex);
    if (d) v.path = d;
  }
  if (has('archive') && !v.archive) {
    const base = (v.path || '.').replace(/\/+$/, '').split('/').pop();
    const ext = intent.id === 'compress_zip' ? '.zip' : '.tar.gz';
    v.archive = (!base || base === '.' || base === '..' || base === '~') ? `archive${ext}` : `${base}${ext}`;
  }
  if (ex.count != null) v.count = ex.count;
  if (has('depth') && ex.count != null && ex.count <= 10) v.depth = ex.count;
  if (ex.size) v.size = ex.size;
  if (ex.duration) {
    v.age = ex.duration.age;
    v.days = ex.duration.days;
    v.since = ex.duration.since;
  } else if (has('days') && ex.count != null) {
    v.days = ex.count;
  }
  if (ex.port) v.port = ex.port;
  if (has('pid')) {
    if (ex.pid) v.pid = ex.pid;
    else if (ex.numbers?.length) v.pid = ex.numbers.find((n) => n > 1);
  }
  if (has('port') && !v.port && ex.numbers?.length) v.port = ex.numbers.find((n) => n >= 20 && n < 65536);
  if (ex.mode && has('mode')) v.mode = ex.mode;
  if (ex.ext) v.glob = `*.${ex.ext}`;
  if (ex.urls.length) v.url = ex.urls[0];
  else if (has('url') && ex.hosts.length) v.url = /^\w+:\/\//.test(ex.hosts[0]) ? ex.hosts[0] : `https://${ex.hosts[0]}`;

  for (const k of ['name', 'service', 'container', 'pkg', 'cmd', 'var', 'branch', 'user', 'pattern', 'host', 'target', 'message']) {
    if (has(k)) {
      const val = pickArg(k, ex);
      if (val != null && val !== '') v[k] = val;
    }
  }
  if (intent.id === 'base64_encode' || intent.id === 'base64_decode') {
    const t = pickArg('text', ex);
    const fileWord = /\b(plik\w*|files?)\s+\S+\.\w+/i.test(ex.text);
    if (ex.quoted.length) v.text = ex.quoted[0];
    else if (paths.length && fileWord) v.file = paths[0];
    else if (paths.length && !(t && t.includes(' '))) v.file = paths[0];
    else if (t) v.text = t;
  }
  if (intent.id === 'find_by_name') {
    let name = v.name ?? (ex.quoted[0] || paths.find((p) => !p.includes('/') && p !== '.' && p !== '~'));
    if (!name) {
      const w = ex.rest.match(/\b(?:named|called|name|nazwie|nazwa|nazwany|nazywa sie|nazywajacy sie|plik|file|pliku)\s+(?:o\s+)?(?:nazwie\s+)?([\w.*-]+)/);
      if (w && !/^(o|the|a|nazwie|named|called)$/.test(w[1])) name = w[1];
    }
    if (name) {
      v.name = name;
      v.namepat = /[*?]/.test(name) || /\.\w+$/.test(name) ? name : `*${name}*`;
      if (v.path === name) v.path = paths.find((p) => p !== name);
    }
  }
  if (intent.id === 'replace_text') {
    let [o, n] = ex.taggerOnly ? [ex.tagged.PATTERN?.[0], ex.tagged.REPL?.[0]] : ex.quoted;
    if (!ex.taggerOnly && (o == null || n == null)) {
      const m = ex.text.match(/(?:replace|substitute|change|swap|zamie[nń]|zmie[nń]|podmie[nń]|zast[aą]p)\s+(?:all\s+|every\s+|wszystkie\s+|ka[zż]de\s+)?(?:occurrences of\s+|wyst[aą]pienia\s+)?(?:word\s+|s[lł]owo\s+|text\s+|tekst\s+|string\s+)?["'„]?([^\s"'”]+)["'”]?\s+(?:with|to|for|into|by|na|->|=>)\s+["'„]?([^\s"'”]+)["'”]?/i);
      if (m) { o = o ?? m[1]; n = n ?? m[2]; }
    }
    if (o != null) v.old = o;
    if (n != null) v.new = n;
    if (o != null && n != null) v.sedexpr = `s/${sedEscapeOld(o)}/${sedEscapeNew(n)}/g`;
    // the file is the path that is not one of the replaced words
    if (v.file && (v.file === o || v.file === n)) v.file = paths.find((p) => p !== o && p !== n);
  }
  if (intent.id === 'chown' && v.user && v.path === v.user) delete v.path;
  for (const k of Object.keys(v)) if (v[k] === undefined) delete v[k];
  return v;
}

function renderValue(name, raw, values, quote) {
  if (!(name in values)) return null;
  let val = values[name];
  if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
  if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
  return quote(val);
}

const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;

/**
 * Fill a template. Returns { command, missing[] }.
 * `values` = resolved slots merged over intent defaults.
 */
export function render(template, values, required = [], quote = shQuote) {
  const missing = [];
  const isSlot = (name) => name in values || required.includes(name) || SLOT_NAMES.test(name);
  // Single pass over the template: every {slot} and «optional segment» is substituted exactly once and
  // inserted values are never scanned again (a value containing "{file}" must stay inert text).
  const out = template.replace(/«([^»]*)»|\{(\w+)(!raw)?\}/g, (m, seg, name, raw) => {
    if (seg != null) {
      let ok = true;
      const r = seg.replace(/\{(\w+)(!raw)?\}/g, (m2, n2, raw2) => {
        if (!ok) return m2;
        const val = renderValue(n2, !!raw2, values, quote);
        if (val == null) { ok = false; return m2; }
        return val;
      });
      return ok ? (/^\s/.test(r) ? r : ' ' + r) : '';
    }
    if (!isSlot(name)) return m; // not a slot (e.g. awk braces, %{http_code}, PowerShell script blocks)
    const val = renderValue(name, !!raw, values, quote);
    if (val == null) {
      missing.push(name);
      return PLACEHOLDER(name);
    }
    return val;
  });
  return { command: out, missing };
}

const DERIVED_REQUIRED = { namepat: 'name', glob: 'ext', sedexpr: 'old' };

const SIZE_MULT = { c: 1, k: 1024, M: 1024 ** 2, G: 1024 ** 3 };
/** Slots derived from others so every shell can use the unit it needs (find: -mmin/-size, PowerShell: minutes/bytes). */
export function deriveSlots(v) {
  if (v.glob && v.ext == null) { const m = String(v.glob).match(/^\*\.([\w]+)$/); if (m) v.ext = m[1]; }
  if (v.minutes == null && v.age) {
    const m = String(v.age).match(/^-m(min|time) -(\d+)$/);
    if (m) v.minutes = m[1] === 'min' ? +m[2] : +m[2] * 1440;
  }
  if (v.sizeBytes == null && v.size != null) {
    const m = String(v.size).match(/^(\d+)([ckMG]?)$/);
    if (m) v.sizeBytes = +m[1] * (SIZE_MULT[m[2]] ?? 512);
  }
  return v;
}

/** env from the legacy `platform` option */
export const envFromPlatform = (platform = process.platform) => ({
  shell: 'bash',
  os: platform === 'darwin' ? 'darwin' : platform === 'win32' ? 'win32' : 'linux',
  coreutils: platform === 'darwin' ? 'bsd' : 'gnu',
});

/**
 * Build a full suggestion for an intent and query.
 *   env: { shell, os, coreutils } (default: bash on `platform`)
 *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
 * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}
 */
export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given } = {}) {
  const intent = BY_ID[intentId];
  if (!intent) throw new Error(`unknown intent ${intentId}`);
  const e = env || envFromPlatform(platform);
  const resolved = given || resolveSlots(intent, extracted || extractSlots(text));
  const defaults = { ...intent.slots, ...(e.os === 'darwin' ? intent.darwinDefaults : {}) };
  const values = {};
  for (const [k, d] of Object.entries(defaults)) if (d != null) values[k] = d;
  Object.assign(values, resolved);
  deriveSlots(values);
  const required = Object.entries(intent.slots).filter(([, d]) => d == null).map(([k]) => k);

  const choice = chooseTemplate(intent, e);
  const base = {
    intent: intent.id, description: intent.description, baseRisk: intent.risk, slots: resolved,
    notes: intent.notes || null, shell: e.shell, os: e.os, variant: choice.variant || null,
  };
  if (choice.gap) {
    return { ...base, command: null, gap: choice.gap, risk: intent.risk, warnings: [], critical: false, missing: [] };
  }
  const quote = quoteForKind(choice.kind, choice.wrapPosix);
  const tpl = choice.tpl;
  let command;
  let missing = [];
  try {
    if (typeof tpl === 'function') {
      const q = (s) => (/^-/.test(String(s)) ? quote('./' + s) : quote(s));
      const vals = { ...values };
      for (const r of required) if (!(r in vals)) { missing.push(r); vals[r] = PLACEHOLDER(r); }
      // catalog functions take the OS string, variant functions a ctx object
      command = tpl(vals, q, tpl === intent.template || tpl === intent.darwin ? e.os : e);
      if (/<TEXT>/.test(command)) missing.push('text');
    } else {
      ({ command, missing } = render(tpl, values, required, quote));
      missing = missing.map((m) => DERIVED_REQUIRED[m] || m);
    }
  } catch (err) {
    if (!(err instanceof UnquotableError)) throw err;
    return { ...base, command: null, gap: err.message, risk: intent.risk, warnings: [], critical: false, missing: [] };
  }
  if (choice.wrapPosix) {
    // PowerShell < 7.3 drops embedded double quotes when passing arguments to native programs, so a
    // POSIX command containing `"` is fed to bash on stdin instead of as a -c argument.
    if (command.includes('"')) { command = psQuote(command) + ' | bash'; base.variant = 'piped to bash (no native PowerShell variant)'; }
    else { command = 'bash -c ' + psQuote(command); base.variant = 'bash -c (no native PowerShell variant)'; }
  }
  missing = [...new Set(missing)];
  const danger = checkDanger(command, intent.risk);
  return {
    ...base,
    command,
    risk: maxRisk(intent.risk, danger.risk),
    warnings: danger.warnings,
    critical: danger.critical,
    missing,
  };
}
// Dangerous-pattern checker. Runs on every final command (including user-edited ones)
// and can only ever escalate risk, never lower it.
//
// Regex rules run on the command text after `git`/`docker` global options are removed
// (`git -C /repo -c x=y reset --hard` is checked as `git reset --hard`). Structural rules
// (rm, kill, Remove-Item, rd/del) tokenize each simple command so long options, quoted targets
// and `--` are understood.

const RANK = { safe: 0, medium: 1, high: 2 };
export const maxRisk = (a, b) => (RANK[b] > RANK[a] ? b : a);

// ---------------------------------------------------------------------------------------------
// light tokenizer: simple commands separated by ; & | && || ( ) and newlines, words unquoted
// (POSIX '…' "…" \x and PowerShell `x). Good enough for danger checks, not a full shell parser.

const QUOTE_CHARS = /['"\u2018\u2019\u201A\u201B\u201C\u201D\u201E]/g;

// winPaths: backslash is never an escape (cmd.exe / PowerShell paths such as "C:\")
export function simpleCommands(cmd, { winPaths = false } = {}) {
  const out = [];
  let words = [];
  let w = null;
  const flushWord = () => { if (w != null) { words.push(w); w = null; } };
  const flushCmd = () => { flushWord(); if (words.length) out.push(words); words = []; };
  const s = String(cmd);
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "'") {
      const j = s.indexOf("'", i + 1);
      const end = j < 0 ? s.length : j;
      w = (w ?? '') + s.slice(i + 1, end);
      i = end;
    } else if (c === '"') {
      let v = '';
      let j = i + 1;
      for (; j < s.length && s[j] !== '"'; j++) {
        if (((!winPaths && s[j] === '\\' && /[$`"\\\n]/.test(s[j + 1])) || s[j] === '`') && j + 1 < s.length) v += s[++j]; else v += s[j];
      }
      w = (w ?? '') + v;
      i = j;
    } else if (!winPaths && c === '\\' && i + 1 < s.length && !/[A-Za-z0-9_.%$~*]/.test(s[i + 1])) {
      w = (w ?? '') + s[++i]; // POSIX escape (keeps Windows paths like C:\Users intact)
    } else if ((c === '{' || c === '}') && w == null && (i + 1 >= s.length || /\s/.test(s[i + 1]))) {
      flushCmd(); // standalone { } = command group / script block
    } else if (/\s/.test(c)) {
      if (c === '\n') flushCmd(); else flushWord();
    } else if (/[;&|()]/.test(c)) {
      flushCmd();
    } else {
      w = (w ?? '') + c;
    }
  }
  flushCmd();
  return out;
}

// strip wrappers that run their argument as the command
function commandWords(words) {
  let w = words;
  for (;;) {
    while (w.length && /^\w+=/.test(w[0])) w = w.slice(1);
    const h = (w[0] || '').replace(/^.*[\\/]/, '').toLowerCase();
    if (['sudo', 'doas', 'command', 'builtin', 'exec', 'nohup', 'time', 'nice', 'ionice', 'then', 'do', 'else', '&'].includes(h)) {
      w = w.slice(1);
      while (w.length && /^-/.test(w[0])) w = w.slice(1 + (/^-[ugnc]$/.test(w[0]) ? 1 : 0));
      continue;
    }
    if (h === 'xargs') { w = w.slice(1); while (w.length && /^-/.test(w[0])) w = w.slice(1 + (/^-[IdEnLPs]$/.test(w[0]) ? 1 : 0)); continue; }
    if (h === 'env') { w = w.slice(1); while (w.length && (/^-/.test(w[0]) || /^\w+=/.test(w[0]))) w = w.slice(1); continue; }
    return w;
  }
}

const POSIX_CRIT_TARGET = /^(?:\/+|\/+\*|~\/*|~\/+\*|\$\{?HOME\}?\/*|\$\{?HOME\}?\/+\*|\*|\.\/*|\.\/+\*|\.\.\/*|\.\.\/+\*|\.\*|\/+(?:bin|boot|dev|etc|home|lib|lib32|lib64|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private)\/*\*?)$/;

function rmCheck(words, hit) {
  let recursive = false;
  let force = false;
  let noPreserve = false;
  const targets = [];
  let opts = true;
  for (const a of words.slice(1)) {
    if (opts && a === '--') { opts = false; continue; }
    if (opts && /^--/.test(a)) {
      if (a === '--recursive') recursive = true;
      else if (a === '--force') force = true;
      else if (a === '--no-preserve-root') noPreserve = true;
      continue;
    }
    if (opts && /^-[a-zA-Z]+$/.test(a)) {
      if (/[rR]/.test(a)) recursive = true;
      if (/f/.test(a)) force = true;
      continue;
    }
    targets.push(a);
  }
  hit('high', 'rm deletes files permanently (no trash)');
  if (noPreserve) hit('high', 'rm --no-preserve-root', true);
  if (recursive && force) hit('high', 'rm -rf deletes without asking');
  if (recursive && targets.some((t) => POSIX_CRIT_TARGET.test(t.trim()) || PS_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive rm on /, ~, * or . — would wipe everything', true);
}

// kill [-SIG | -s SIG | -n NUM | --signal SIG] [--] pid...   (pid 1 / -1 = init / every process)
function killCheck(words, hit) {
  hit('high', 'terminates processes');
  const a = words.slice(1);
  let i = 0;
  if (a[i] === '-s' || a[i] === '-n' || a[i] === '--signal') i += 2;
  else if (a[i] && /^-/.test(a[i]) && a[i] !== '--' && a[i] !== '-l' && a[i] !== '-L') i += 1;
  if (a[i] === '--') i++;
  if (a.slice(i).some((p) => /^-?1$/.test(p))) hit('high', 'kill -1 / PID 1 kills everything', true);
}

const PS_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*\*?|[\\/]+\*?|\*|~[\\/]*\*?|\$(?:HOME|env:USERPROFILE|env:HOMEDRIVE|env:SystemDrive|env:SystemRoot|env:windir|\{env:USERPROFILE\})[\\/]*\*?|[A-Za-z]:[\\/]+(?:Windows|Users|Program Files(?: \(x86\))?|ProgramData)[\\/]*\*?)$/i;
const PS_REMOVE = /^(?:remove-item|ri|rm|del|erase|rd|rmdir)$/i;

// Remove-Item and its aliases (PowerShell parameter names may be abbreviated: -r, -Rec, -lp, ...)
function removeItemCheck(words, hit) {
  const a = words.slice(1);
  if (a.some((x) => /^\/[sq]$/i.test(x))) return; // cmd.exe syntax, see cmdDelCheck
  hit('high', 'deletes files permanently');
  const isParam = (x, name, min = 2) => /^-\w/.test(x) && x.length - 1 >= Math.min(min, name.length) && name.startsWith(x.slice(1).replace(/:.*$/, '').toLowerCase());
  const recurse = a.some((x) => isParam(x, 'recurse', 1));
  const targets = [];
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    if (isParam(x, 'path', 1) || isParam(x, 'literalpath', 1) || /^-(?:lp|pspath)$/i.test(x)) { if (a[i + 1] != null) targets.push(...a[++i].split(',')); continue; }
    if (/^-/.test(x)) { if (/^-(?:include|exclude|filter|credential|stream)/i.test(x)) i++; continue; }
    targets.push(...x.split(','));
  }
  if (recurse && targets.some((t) => PS_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive Remove-Item on a drive root, home or *', true);
}

const CMD_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*\*?(?:\.\*)?|[\\/]+\*?|\*(?:\.\*)?|%(?:USERPROFILE|HOMEDRIVE|HOMEPATH|SystemDrive|SystemRoot|windir)%[\\/]*\*?(?:\.\*)?)$/i;

// cmd.exe rd/rmdir/del/erase (also reached from PowerShell aliases with cmd-style switches)
function cmdDelCheck(words, hit) {
  hit('high', 'deletes files permanently');
  const a = words.slice(1);
  const recursive = a.some((x) => /^\/s$/i.test(x));
  if (recursive && a.filter((x) => !/^\/\w$/.test(x)).some((t) => CMD_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive delete of a drive root or home', true);
}

// [regex, risk, message, critical]
const RULES = [
  [/\bmkfs(?:\.\w+)?\b|\bmke2fs\b|\bwipefs\b/, 'high', 'formats a filesystem', true],
  [/\bdd\b[^|;&]*\bof=\/dev\//, 'high', 'dd writing to a raw device', true],
  [/>\s*\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk)\w*/, 'high', 'redirect onto a raw disk device', true],
  [/\b(?:chmod|chown|chgrp)\s+(?:\S+\s+)*(?:-[a-zA-Z]*R[a-zA-Z]*|--recursive)\s+(?:\S+\s+)*['"]?\/['"]?(?:\s|$|\*)/, 'high', 'recursive permission/owner change on /', true],
  [/\bchmod\s+(?:-\S+\s+)*0?777\b/, 'medium', 'chmod 777 makes files world-writable'],
  [/:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:/, 'high', 'fork bomb', true],
  [/\b(?:curl|wget|fetch)\b[^|;]*\|\s*(?:sudo\s+)?(?:\S*\/)?(?:ba|z|da|k|fi)?sh\b/, 'high', 'pipes a download straight into a shell'],
  [/(?:\b(?:ba|z|da|k|fi)?sh\b|\bsource\b|\beval\b|(?:^|[;&|(]\s*)\.)\s[^|;&]*(?:<\(|\$\(|`)\s*(?:sudo\s+)?(?:curl|wget|fetch)\b/, 'high', 'runs a downloaded script'],
  [/\bsudo\b|\bdoas\b/, 'medium', 'runs with root privileges'],
  [/\bfind\b.*\s-delete\b|\bfind\b.*-exec(?:dir)?\s+(?:\S*\/)?rm\b|\bxargs\s+(?:-\S+\s+)*(?:\S*\/)?rm\b/, 'high', 'bulk deletion via find/xargs'],
  [/\bgit\s+push\b[^;&|]*\s(?:--force(?:-with-lease|-if-includes)?\b|-[a-zA-Z]*f\b|\+[^\s:]*(?::\S*)?|--mirror\b)/, 'high', 'force-push rewrites remote history'],
  [/\bgit\s+push\b[^;&|]*\s(?:--delete\b|-d\b|:\S)/, 'high', 'deletes a remote branch'],
  [/\bgit\s+reset\b[^;&|]*\s--(?:hard|merge|keep)\b|\bgit\s+clean\b[^;&|]*\s(?:-[a-zA-Z]*f|--force\b)|\bgit\s+restore\b|\bgit\s+checkout\b[^;&|]*\s(?:--\s|-f\b|--force\b|\.(?:\s|$))|\bgit\s+switch\b[^;&|]*\s(?:-f\b|--force\b|--discard-changes\b)/, 'high', 'discards uncommitted work'],
  [/\bgit\s+branch\b[^;&|]*\s(?:-D\b|-[a-zA-Z]*d[a-zA-Z]*f|--delete\s+--force|--force\s+--delete)/, 'high', 'force-deletes a branch'],
  [/\bgit\s+stash\s+(?:drop|clear)\b/, 'high', 'deletes stashed changes'],
  [/\bdocker\s+(?:system|volume|image|container|network|builder)\s+prune\b|\bdocker\s+(?:rmi?|container\s+rm|image\s+rm|volume\s+rm)\b/, 'high', 'deletes docker data'],
  [/\b(?:shutdown|reboot|halt|poweroff)\b|\binit\s+[06]\b/, 'high', 'shuts down / reboots the machine'],
  [/\b(?:pkill|killall)\b|\bdocker\s+kill\b/, 'high', 'terminates processes'],
  [/\b(?:shred|truncate)\b/, 'high', 'destroys file contents'],
  [/\biptables\s+-F\b|\bufw\s+disable\b/, 'high', 'drops firewall rules'],
  [/\bmv\s+\S+\s+\/dev\/null\b/, 'high', 'moves a file into /dev/null (deletes it)', true],
  // redirections: N>, N>>, &>, >|, >> onto system files; any other file write is medium
  [/(?:\d*|&)>>?\|?\s*['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'overwrites a system file'],
  [/(?:^|[^<>=-])(?:\d+|&)?>>?\|?(?!&|>)\s*(?!['"]?\/dev\/(?:null|stdout|stderr)\b)['"]?[^\s&|;)]/, 'medium', 'redirect writes to a file'],
  [/\btee\b/, 'medium', 'tee writes to a file'],
  [/\bsed\s+(?:-\S+\s+)*(?:-i|--in-place)\b/, 'medium', 'edits files in place'],
  [/\bcrontab\s+-r\b/, 'high', 'removes all cron jobs', true],
  // PowerShell
  [/\bRemove-Item\b|\bClear-Content\b/i, 'high', 'deletes files permanently'],
  [/\bStop-Process\b|\bspps\b|\btaskkill\b/i, 'high', 'terminates processes'],
  [/\bFormat-Volume\b|\bClear-Disk\b|\bInitialize-Disk\b|(?:^|[;&|(]\s*)format\s+[a-z]:/i, 'high', 'formats a disk', true],
  [/\b(?:Stop|Restart)-Computer\b|\bshutdown(?:\.exe)?\s+\/[srp]\b/i, 'high', 'shuts down / reboots the machine'],
  [/\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|curl|wget)\b[^|;]*\|\s*(?:iex|Invoke-Expression)\b/i, 'high', 'pipes a download straight into PowerShell'],
  [/\b(?:iex|Invoke-Expression)\b[^|;]*\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|curl|wget|DownloadString|DownloadData|Net\.WebClient)\b|\[scriptblock\]::Create\([^;]*\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|DownloadString)\b/i, 'high', 'runs a downloaded script'],
  [/\bSet-ExecutionPolicy\b|\bStart-Process\b.*-Verb\s+RunAs/i, 'medium', 'changes security policy / elevates'],
  [/\b(?:Stop|Restart|Start|Set)-Service\b/i, 'medium', 'changes a service'],
  [/\b(?:Set-Content|Out-File|Add-Content|Rename-Item|Move-Item|Copy-Item|New-Item|Set-Acl|Compress-Archive|Expand-Archive)\b/i, 'medium', 'modifies files'],
  [/\bdocker\s+stop\b/, 'medium', 'stops containers'],
];

// `git -C dir -c k=v --no-pager reset` -> `git reset`; `docker --context x -H h rm` -> `docker rm`
const OPTVAL = String.raw`(?:'[^']*'|"[^"]*"|[^\s;&|'"])+`;
const GIT_GLOBALS = new RegExp(String.raw`\bgit((?:\s+(?:(?:-C|-c|--git-dir|--work-tree|--namespace|--super-prefix|--config-env|--exec-path)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
const DOCKER_GLOBALS = new RegExp(String.raw`\bdocker((?:\s+(?:(?:-H|--host|-c|--context|--config|-l|--log-level|--tls\w*)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
export function normalizeGlobals(command) {
  return String(command).replace(GIT_GLOBALS, 'git').replace(DOCKER_GLOBALS, 'docker');
}

/** @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}} */
export function checkDanger(command, baseRisk = 'safe') {
  let risk = baseRisk;
  const warnings = [];
  let critical = false;
  const hit = (r, msg, crit) => {
    risk = maxRisk(risk, r);
    if (!warnings.includes(msg)) warnings.push(msg);
    if (crit) critical = true;
  };
  const text = normalizeGlobals(command);
  const inner = [];
  // structural checks run on both readings of backslashes (POSIX escapes / Windows path separators)
  for (const words of [...simpleCommands(text), ...simpleCommands(text, { winPaths: true })]) {
    const w = commandWords(words);
    if (!w.length) continue;
    const head = w[0].replace(/^.*[\\/]/, '');
    const lower = head.toLowerCase().replace(/\.exe$/, '');
    // a lone string with spaces is a command handed to another program ('…' | bash)
    if (w.length === 1 && /\s/.test(w[0])) inner.push(w[0]);
    // shells / eval run their argument as a command: check it too
    if (/^(?:ba|z|da|k|fi|c)?sh$|^(?:pwsh|powershell|cmd)$/.test(lower)) {
      const i = w.findIndex((x, k) => k > 0 && /^(?:-c|-Command|-Co\w*|\/c|\/k)$/i.test(x));
      if (i > 0 && w[i + 1] != null) inner.push(w.slice(i + 1).join(' '));
    } else if (lower === 'eval' || lower === 'iex' || lower === 'invoke-expression') inner.push(w.slice(1).join(' '));
    if (head === 'rm' || head === 'unlink') rmCheck(w, hit);
    else if (head === 'kill') killCheck(w, hit);
    else if (/^(?:rd|rmdir|del|erase)$/i.test(head)) {
      const a = w.slice(1);
      if (!a.some((x) => /^\/[a-z]$/i.test(x)) && a.some((x) => /^-\w/.test(x))) removeItemCheck(w, hit);
      else cmdDelCheck(w, hit);
    } else if (PS_REMOVE.test(lower)) removeItemCheck(w, hit);
    if (head === 'git' && w[1] === 'rm') hit('high', 'rm deletes files permanently (no trash)');
  }
  for (const c of inner) {
    if (c === command) continue;
    const d = checkDanger(c);
    for (const m of d.warnings) hit(d.risk, m, d.critical);
  }
  for (const [re, r, msg, crit] of RULES) if (re.test(text)) hit(r, msg, crit);
  return { risk, warnings, critical };
}
// Intent catalog: every command tellsh knows how to produce.
//
// Template syntax (see src/fill.js):
//   {slot}       value is shell-quoted
//   {slot!raw}   value inserted verbatim (only for validated slots: numbers, ports, find size/age flags)
//   «...»        optional segment, dropped if any slot inside it is missing
// `slots` maps slot name -> default value; `null` means required (a <PLACEHOLDER> is shown).
// `darwin` overrides the template on macOS. `risk` is safe | medium | high (src/danger.js may escalate).
// v0.2: archive create/extract, git stash/pull/checkout/clone raised safe -> medium after the teacher review
// (they overwrite files or change the working tree; data/teacher/decisions.jsonl).

const T = (id, description, template, slots, risk = 'safe', extra = {}) =>
  ({ id, description, template, slots, risk, ...extra });

export const INTENTS = [
  // ---------- files & disk ----------
  T('largest_files', 'Show the largest files under a directory',
    'find {path} -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n {count!raw}',
    { path: '.', count: 10 }),
  T('largest_dirs', 'Show the largest subdirectories of a directory',
    'du -h -d 1 {path} 2>/dev/null | sort -rh | head -n {count!raw}',
    { path: '.', count: 10 }),
  T('disk_free', 'Show free/used disk space per filesystem', 'df -h', {}),
  T('dir_size', 'Show total size of a directory', 'du -sh {path}', { path: '.' }),
  T('find_by_name', 'Find files by (part of) name',
    'find {path} -iname {namepat}', { path: '.', name: null }),
  T('find_by_ext', 'Find files with a given extension',
    'find {path} -type f -iname {glob}«{age!raw}»', { path: '.', ext: null }),
  T('find_recent', 'Find files modified within a time window',
    'find {path} -type f {age!raw}«-iname {glob}»', { path: '.', age: '-mtime -1' }),
  T('find_older_than', 'Find files older than N days',
    'find {path} -type f -mtime +{days!raw}«-iname {glob}»', { path: '.', days: 30 }),
  T('find_larger_than', 'Find files bigger than a size',
    'find {path} -type f -size +{size!raw}«-iname {glob}» -exec ls -lh {} +', { path: '.', size: '100M' }),
  T('find_smaller_than', 'Find files smaller than a size',
    'find {path} -type f -size -{size!raw}«-iname {glob}»', { path: '.', size: '1k' }),
  T('grep_text', 'Search for text recursively in files',
    'grep -rn«--include={glob}» -- {pattern} {path}', { path: '.', pattern: null }),
  T('grep_files_containing', 'List files that contain a text',
    'grep -rl«--include={glob}» -- {pattern} {path}', { path: '.', pattern: null }),
  T('count_lines', 'Count lines in a file', 'wc -l {file}', { file: null }),
  T('count_lines_code', 'Count total lines in all files of a type',
    'find {path} -type f -iname {glob} -exec cat {} + | wc -l', { path: '.', ext: null }),
  T('count_files', 'Count files in a directory (recursive)',
    'find {path} -type f«-iname {glob}» | wc -l', { path: '.' }),
  T('count_words', 'Count words in a file', 'wc -w {file}', { file: null }),
  T('sort_uniq', 'Most frequent lines in a file (sort | uniq -c)',
    'sort {file} | uniq -c | sort -rn | head -n {count!raw}', { file: null, count: 10 }),
  T('recent_files', 'List most recently modified files',
    "find {path} -type f -printf '%T@ %TY-%Tm-%Td %TH:%TM %p\\n' 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-",
    { path: '.', count: 10 },
    'safe', { darwin: "find {path} -type f -exec stat -f '%m %Sm %N' -t '%Y-%m-%d %H:%M' {} + 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-" }),
  T('empty_files', 'Find empty files', 'find {path} -type f -empty', { path: '.' }),
  T('empty_dirs', 'Find empty directories', 'find {path} -type d -empty', { path: '.' }),
  T('duplicate_files', 'Find duplicate files by content hash',
    'find {path} -type f -exec md5sum {} + | sort | uniq -w32 -dD',
    { path: '.' }, 'safe',
    // sorted `hash path` lines: print every member of a group, including the first one
    { darwin: "find {path} -type f -exec md5 -r {} + | sort | awk '$1 == p { if (!shown) print last; print; shown = 1; next } { p = $1; last = $0; shown = 0 }'" }),
  T('find_symlinks', 'List symbolic links', 'find {path} -type l -ls', { path: '.' }),
  T('broken_symlinks', 'Find broken symbolic links', 'find {path} -xtype l',
    { path: '.' }, 'safe', { darwin: 'find -L {path} -type l' }),
  T('list_files', 'List files in a directory with details', 'ls -lah {path}', { path: '.' }),
  T('list_tree', 'Show directory tree (2 levels)',
    "find {path} -maxdepth {depth!raw} -not -path '*/.git/*' | sort", { path: '.', depth: 2 }),
  T('hidden_files', 'List hidden files (dotfiles)',
    "find {path} -maxdepth 1 -name '.*'", { path: '.' }),
  T('file_type', 'Detect a file type', 'file {file}', { file: null }),
  T('file_stat', 'Show file metadata (size, permissions, times)', 'stat {file}', { file: null }),
  T('head_file', 'Show first lines of a file', 'head -n {count!raw} {file}', { file: null, count: 10 }),
  T('tail_file', 'Show last lines of a file', 'tail -n {count!raw} {file}', { file: null, count: 10 }),
  T('tail_follow', 'Follow a (log) file live', 'tail -f {file}',
    { file: '/var/log/syslog' }, 'safe', { darwinDefaults: { file: '/var/log/system.log' } }),
  T('cat_file', 'Print a file contents', 'cat {file}', { file: null }),
  T('compress_targz', 'Compress a directory/file into tar.gz',
    'tar -czvf {archive} {path}', { path: '.', archive: null }, 'medium'),
  T('extract_targz', 'Extract a tar.gz archive', 'tar -xzvf {file}«-C {dest}»', { file: null }, 'medium'),
  T('compress_zip', 'Compress into a zip archive', 'zip -r {archive} {path}', { path: '.', archive: null }, 'medium'),
  T('extract_zip', 'Extract a zip archive', 'unzip {file}«-d {dest}»', { file: null }, 'medium'),
  T('list_archive', 'List contents of an archive (tar/zip)',
    (s, q) => /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file)}` : `tar -tvf ${q(s.file)}`,
    { file: null }),
  T('chmod', 'Change file permissions', 'chmod {mode!raw} {file}', { file: null, mode: null }, 'medium'),
  T('make_executable', 'Make a file executable', 'chmod +x {file}', { file: null }, 'medium'),
  T('chown', 'Change file owner', 'sudo chown -R {user} {path}', { path: null, user: null }, 'medium'),
  T('copy', 'Copy files or directories', 'cp -ri {src} {dst}', { src: null, dst: null }, 'medium'),
  T('move_rename', 'Move or rename a file', 'mv -i {src} {dst}', { src: null, dst: null }, 'medium'),
  T('delete_file', 'Delete a file', 'rm {file}', { file: null }, 'high'),
  T('delete_dir', 'Delete a directory recursively', 'rm -r {path}', { path: null }, 'high'),
  T('delete_by_ext', 'Delete all files with an extension',
    'find {path} -type f -iname {glob} -delete', { path: '.', ext: null }, 'high'),
  T('mkdir', 'Create a directory (with parents)', 'mkdir -p {path}', { path: null }),
  T('touch_file', 'Create an empty file', 'touch {file}', { file: null }),
  T('current_dir', 'Print current working directory', 'pwd', {}),
  T('create_symlink', 'Create a symbolic link', 'ln -s {src} {dst}', { src: null, dst: null }, 'medium'),
  T('diff_files', 'Compare two files', 'diff -u {src} {dst}', { src: null, dst: null }),
  T('replace_text', 'Replace text in a file with sed (in place)',
    'sed -i {sedexpr} {file}', { file: null, old: null, new: null }, 'medium',
    { darwin: "sed -i '' {sedexpr} {file}" }),
  T('disk_mounts', 'Show mounted filesystems', 'findmnt', {}, 'safe', { darwin: 'mount' }),
  T('block_devices', 'List disks and partitions', 'lsblk', {}, 'safe', { darwin: 'diskutil list' }),
  T('hash_sha256', 'Compute SHA-256 checksum', 'sha256sum {file}', { file: null }, 'safe',
    { darwin: 'shasum -a 256 {file}' }),
  T('hash_md5', 'Compute MD5 checksum', 'md5sum {file}', { file: null }, 'safe', { darwin: 'md5 {file}' }),
  T('base64_encode', 'Base64-encode text or a file',
    // macOS base64 takes no positional file operand: it needs -i FILE
    (s, q, os) => s.file ? (os === 'darwin' ? `base64 -i ${q(s.file)}` : `base64 ${q(s.file)}`) : `printf '%s' ${q(s.text ?? '<TEXT>')} | base64`,
    {}),
  T('base64_decode', 'Decode base64 text or a file',
    (s, q, os) => {
      const d = os === 'darwin' ? 'base64 -D' : 'base64 -d';
      return s.file ? `${d} ${os === 'darwin' ? '-i ' : ''}${q(s.file)}` : `printf '%s' ${q(s.text ?? '<TEXT>')} | ${d}`;
    }, {}),

  // ---------- processes ----------
  T('top_cpu', 'Processes using the most CPU', 'ps aux --sort=-%cpu | head -n {count!raw}',
    { count: 10 }, 'safe', { darwin: 'ps aux -r | head -n {count!raw}' }),
  T('top_mem', 'Processes using the most memory', 'ps aux --sort=-%mem | head -n {count!raw}',
    { count: 10 }, 'safe', { darwin: 'ps aux -m | head -n {count!raw}' }),
  T('find_process', 'Find a running process by name', 'pgrep -af {name}',
    { name: null }, 'safe', { darwin: 'pgrep -lf {name}' }),
  T('kill_by_name', 'Kill processes by name', 'pkill -f {name}', { name: null }, 'high'),
  T('kill_force', 'Force-kill (SIGKILL) processes by name', 'pkill -9 -f {name}', { name: null }, 'high'),
  T('kill_by_pid', 'Kill a process by PID', 'kill {pid!raw}', { pid: null }, 'high'),
  T('kill_by_port', 'Kill the process listening on a port',
    // -sTCP:LISTEN: only the server; plain `-i tcp:PORT` also matches clients connected to that port
    'lsof -ti tcp:{port!raw} -sTCP:LISTEN | xargs -r kill', { port: null }, 'high',
    { darwin: 'lsof -ti tcp:{port!raw} -sTCP:LISTEN | xargs kill', notes: 'needs lsof' }),
  T('listening_ports', 'Show listening ports', 'ss -tulpn', {}, 'safe',
    { darwin: 'lsof -iTCP -sTCP:LISTEN -n -P' }),
  T('process_on_port', 'Which process is using a port', "ss -ltnup 'sport = :{port!raw}'",
    { port: null }, 'safe', { darwin: 'lsof -nP -i :{port!raw}' }),
  T('established_connections', 'Show established network connections', 'ss -tun state established',
    {}, 'safe', { darwin: 'netstat -an | grep ESTABLISHED' }),
  T('process_tree', 'Show process tree', 'ps -ef --forest', {}, 'safe', { darwin: 'ps -ef' }),

  // ---------- system ----------
  T('system_info', 'General system information', 'uname -a', {}),
  T('os_release', 'Show OS distribution/version', 'cat /etc/os-release', {}, 'safe', { darwin: 'sw_vers' }),
  T('kernel_version', 'Show kernel version', 'uname -r', {}),
  T('memory_usage', 'Show RAM usage', 'free -h', {}, 'safe', { darwin: 'vm_stat' }),
  T('cpu_info', 'Show CPU model and details', 'lscpu', {}, 'safe',
    { darwin: 'sysctl -n machdep.cpu.brand_string; sysctl hw.ncpu' }),
  T('cpu_cores', 'Number of CPU cores', 'nproc', {}, 'safe', { darwin: 'sysctl -n hw.ncpu' }),
  T('uptime', 'Uptime and load average', 'uptime', {}),
  T('hostname', 'Show the machine hostname', 'hostname', {}),
  T('whoami', 'Show current user name', 'whoami', {}),
  T('users_logged_in', 'Show logged-in users', 'who', {}),
  T('last_logins', 'Show recent logins', 'last -n {count!raw}', { count: 10 }),
  T('env_vars', 'List environment variables', 'env | sort', {}),
  T('env_var_get', 'Show the value of an environment variable', 'printenv {var!raw}', { var: null }),
  T('which_cmd', 'Locate a command executable', 'which -a {cmd}', { cmd: null }),
  T('show_path', 'Show PATH entries one per line', "echo \"$PATH\" | tr ':' '\\n'", {}),
  T('history_search', 'Search shell history',
    'grep -ai -- {pattern} "${HISTFILE:-$HOME/.bash_history}"', { pattern: null }, 'safe',
    { notes: 'reads the history file (the history builtin is empty in a subshell, and HISTFILE is not exported to it)' }),
  T('date_time', 'Show current date and time', 'date', {}),
  T('timezone', 'Show the system time zone',
    'timedatectl show -p Timezone --value 2>/dev/null || cat /etc/timezone', {}, 'safe',
    { darwin: "readlink /etc/localtime | sed 's#.*/zoneinfo/##'" }),
  T('calendar', 'Show a calendar', 'cal', {}),
  T('cron_list', 'List cron jobs of the current user', 'crontab -l', {}),
  T('cron_edit', 'Edit cron jobs', 'crontab -e', {}, 'medium'),
  T('journal_service', 'Show logs of a systemd service',
    'journalctl -u {service} -n {count!raw} --no-pager«--since {since}»', { service: null, count: 50 }, 'safe',
    { darwin: 'log show --style compact --last 1h | grep -i {service}', notes: 'journalctl is Linux/systemd only' }),
  T('journal_errors', 'Show system error logs', 'journalctl -p err -b --no-pager | tail -n {count!raw}',
    { count: 50 }, 'safe', { darwin: 'log show --style compact --last 1h --predicate \'messageType == error\' | tail -n {count!raw}' }),
  T('service_status', 'Show status of a service', 'systemctl status {service} --no-pager',
    { service: null }, 'safe', { darwin: 'launchctl list | grep -i {service}' }),
  T('service_restart', 'Restart a service', 'sudo systemctl restart {service}', { service: null }, 'medium',
    { darwin: 'brew services restart {service}' }),
  T('service_stop', 'Stop a service', 'sudo systemctl stop {service}', { service: null }, 'medium',
    { darwin: 'brew services stop {service}' }),
  T('service_start', 'Start a service', 'sudo systemctl start {service}', { service: null }, 'medium',
    { darwin: 'brew services start {service}' }),
  T('service_enable', 'Enable a service at boot', 'sudo systemctl enable --now {service}', { service: null }, 'medium'),
  T('list_services', 'List running services', 'systemctl list-units --type=service --state=running --no-pager',
    {}, 'safe', { darwin: 'launchctl list' }),
  T('failed_services', 'List failed services', 'systemctl --failed --no-pager', {}),
  T('dmesg', 'Kernel messages (dmesg)', 'sudo dmesg | tail -n {count!raw}', { count: 50 }),
  T('battery', 'Battery level/status',
    'cat /sys/class/power_supply/BAT*/capacity 2>/dev/null || upower -i "$(upower -e | grep -m1 BAT)"',
    {}, 'safe', { darwin: 'pmset -g batt' }),
  T('temperature', 'CPU temperature sensors', 'sensors', {}, 'safe',
    { darwin: 'sudo powermetrics --samplers smc -n 1 | grep -i temp', notes: 'needs lm-sensors on Linux' }),
  T('gpu_info', 'Show GPU information', "lspci | grep -iE 'vga|3d|display'", {}, 'safe',
    { darwin: 'system_profiler SPDisplaysDataType' }),
  T('usb_devices', 'List USB devices', 'lsusb', {}, 'safe', { darwin: 'system_profiler SPUSBDataType' }),
  T('install_package', 'Install a package', 'sudo apt install {pkg}', { pkg: null }, 'medium',
    { darwin: 'brew install {pkg}' }),
  T('package_installed', 'Check whether a package is installed', 'dpkg -l | grep -i -- {pkg}',
    { pkg: null }, 'safe', { darwin: 'brew list | grep -i -- {pkg}' }),
  T('system_update', 'Update system packages', 'sudo apt update && sudo apt upgrade', {}, 'medium',
    { darwin: 'brew update && brew upgrade' }),

  // ---------- network ----------
  T('ip_addresses', 'Show local IP addresses', 'ip -brief address', {}, 'safe',
    { darwin: "ifconfig | grep 'inet '" }),
  T('public_ip', 'Show public IP address (needs network)', 'curl -s https://ifconfig.me; echo', {}, 'safe',
    { notes: 'needs network access' }),
  T('ping_host', 'Ping a host', 'ping -c {count!raw} {host}', { host: null, count: 4 }),
  T('dns_lookup', 'DNS lookup for a domain', 'dig +short {host}', { host: null }, 'safe',
    { notes: 'fallback: nslookup' }),
  T('traceroute', 'Trace network route to a host', 'traceroute {host}', { host: null }),
  T('routes', 'Show routing table / default gateway', 'ip route', {}, 'safe', { darwin: 'netstat -rn' }),
  T('port_check', 'Check if a remote port is open', 'nc -zv {host} {port!raw}', { host: null, port: null }),
  T('curl_headers', 'Show HTTP response headers of a URL', 'curl -sI {url}', { url: null }),
  T('http_status', 'Show HTTP status code of a URL',
    "curl -s -o /dev/null -w '%{http_code}\\n' {url}", { url: null }),
  T('download_file', 'Download a file from a URL', 'curl -fLO {url}', { url: null }, 'medium'),
  T('ssh_connect', 'Connect to a server over SSH', 'ssh {target}', { target: null }, 'medium'),

  // ---------- git ----------
  T('git_status', 'Show git working tree status', 'git status', {}),
  T('git_log', 'Show recent commits', 'git log --oneline --graph --decorate -n {count!raw}', { count: 10 }),
  T('git_diff', 'Show unstaged changes', 'git diff«-- {file}»', {}),
  T('git_diff_staged', 'Show staged changes', 'git diff --staged', {}),
  T('git_branches', 'List git branches', 'git branch -a', {}),
  T('git_current_branch', 'Show current git branch', 'git branch --show-current', {}),
  T('git_new_branch', 'Create and switch to a new branch', 'git checkout -b {branch}', { branch: null }, 'medium'),
  T('git_switch_branch', 'Switch to an existing branch', 'git checkout {branch}', { branch: null }, 'medium'),
  T('git_delete_branch', 'Delete a local branch', 'git branch -d {branch}', { branch: null }, 'medium'),
  T('git_undo_commit', 'Undo the last commit (keep changes)', 'git reset --soft HEAD~1', {}, 'medium'),
  T('git_discard_changes', 'Discard all uncommitted changes', 'git restore«{file}»', { file: '.' }, 'high'),
  T('git_stash', 'Stash current changes', 'git stash', {}, 'medium'),
  T('git_stash_pop', 'Restore stashed changes', 'git stash pop', {}, 'medium'),
  T('git_pull', 'Pull from remote', 'git pull', {}, 'medium'),
  T('git_push', 'Push to remote', 'git push«origin {branch}»', {}, 'medium'),
  T('git_clone', 'Clone a repository', 'git clone {url}', { url: null }, 'medium'),
  T('git_add_all', 'Stage all changes', 'git add -A', {}),
  T('git_commit', 'Commit all changes with a message', 'git add -A && git commit -m {message}',
    { message: null }, 'medium'),
  T('git_remote', 'Show git remotes', 'git remote -v', {}),
  T('git_blame', 'Show who changed each line of a file', 'git blame {file}', { file: null }),
  T('git_init', 'Initialize a git repository', 'git init', {}),

  // ---------- docker ----------
  T('docker_ps', 'List running containers', 'docker ps', {}),
  T('docker_ps_all', 'List all containers including stopped', 'docker ps -a', {}),
  T('docker_logs', 'Show logs of a container', 'docker logs --tail {count!raw} -f {container}',
    { container: null, count: 100 }),
  T('docker_images', 'List docker images', 'docker images', {}),
  T('docker_stop', 'Stop a container', 'docker stop {container}', { container: null }, 'medium'),
  T('docker_stop_all', 'Stop all running containers', 'docker stop $(docker ps -q)', {}, 'high'),
  T('docker_prune', 'Remove unused docker data', 'docker system prune -a', {}, 'high'),
  T('docker_exec', 'Open a shell inside a container', 'docker exec -it {container} sh',
    { container: null }, 'medium'),
  T('docker_stats', 'Container resource usage', 'docker stats --no-stream', {}),
  T('docker_compose_up', 'Start docker compose services', 'docker compose up -d', {}, 'medium'),
  T('docker_compose_down', 'Stop docker compose services', 'docker compose down', {}, 'medium'),
];

export const BY_ID = Object.fromEntries(INTENTS.map((i) => [i.id, i]));

exec
/bin/bash -lc "cat scripts/teacher.js scripts/bench.js scripts/build_triggers.js scripts/lib/cmdnorm.js; sed -n '179,340p' scripts/train.py" in /workspace/tellsh
 succeeded in 0ms:
#!/usr/bin/env node
// Optional build-time teacher: verify a SAMPLE of generated training labels with TypeSafe Jev
// (https://docs.typesafe.ai, POST /v1/systemone, model jev-latest). Never used at runtime.
//
//   TYPESAFE_API_KEY=... node scripts/teacher.js [--calls 300] [--seed 5]
//
// Per sampled training row, ONE call asks (questions are evaluated in parallel by the API):
//   intent  choice   gold intent vs the two closest alternatives from our cascade (+ "none of these")
//   correct noul     the rendered bash command does what the request asks
//   risk    choice   safe / medium / high — compared with our final risk (catalog risk + danger.js)
//   span_i  noul     up to 3 silver slot spans ("'~/Pobrane' is the directory/file path")
// Disagreements are written to data/teacher/review.jsonl for manual inspection; decisions taken after
// inspection live in data/teacher/decisions.jsonl and are applied by scripts/gen_data.js.
// The API key is read from the environment only; it is never printed or logged.
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BY_ID } from '../src/catalog.js';
import { FAMILY_OF } from '../src/tools.js';
import { buildCommand } from '../src/fill.js';
import { cascade } from '../src/cascade.js';
import { silverSpans, mulberry32 } from './lib/silver.js';
import { updateSection } from './report.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=')[1] : d; };
const MAX_CALLS = Math.min(300, +arg('calls', 300));
const PRICE_PER_MTOK = 0.042; // USD per million input tokens (jev-1.13, docs.typesafe.ai/models); output tokens are free
const ENDPOINT = 'https://api.typesafe.ai/v1/systemone';
const KEY = process.env.TYPESAFE_API_KEY;

const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const TYPE_DESC = {
  PATH: 'a file or directory path (or a named place like the home or Downloads folder)', SIZE: 'a file size', EXT: 'a file extension / file type',
  PORT: 'a network port number', TIME: 'a time window or age', NAME: 'the name of a process, service, container, package or command',
  NUM: 'a count (how many results/lines)', URL: 'a URL', HOST: 'a host name, IP address or user@host', BRANCH: 'a git branch name',
  PATTERN: 'the text to search for (or the text to be replaced)', REPL: 'the replacement text', USER: 'a user name', MODE: 'file permission bits',
  MSG: 'a commit message', VAR: 'an environment variable name', PID: 'a process id', TEXT: 'the text to encode/decode',
};
const RISK_DESC = {
  safe: 'read-only: only shows information, changes nothing',
  medium: 'changes files, settings, services or remote state, but in a recoverable way',
  high: 'deletes data, kills processes, discards work or is hard to undo',
};

async function ask(state, questions) {
  const r = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'jev-latest', state, questions }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return j;
}

async function main() {
  const reportOnly = process.argv.includes('--report-only');
  if (reportOnly) {
    const meta = JSON.parse(readFileSync(join(ROOT, 'build', 'teacher_meta.json'), 'utf8'));
    return summarize(readJsonl(join(ROOT, 'build', 'teacher_results.jsonl')), meta);
  }
  if (!KEY) {
    console.log('teacher: TYPESAFE_API_KEY not set — skipped');
    updateSection('teacher', '## Teacher verification (TypeSafe Jev)\n\nSkipped: `TYPESAFE_API_KEY` not set at build time.');
    return;
  }
  const rng = mulberry32(+arg('seed', 5));
  const rows = [...readdirSync(join(ROOT, 'data', 'intents')).sort().flatMap((f) => readJsonl(join(ROOT, 'data', 'intents', f))),
    ...readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl'))];
  // stratified sample: shuffle, then round-robin over intents
  const byIntent = {};
  for (const r of rows.sort(() => rng() - 0.5)) (byIntent[r.intent] ??= []).push(r);
  const sample = [];
  for (let round = 0; sample.length < MAX_CALLS && round < 10; round++) {
    for (const id of Object.keys(byIntent).sort(() => rng() - 0.5)) {
      if (sample.length >= MAX_CALLS) break;
      if (byIntent[id][round]) sample.push(byIntent[id][round]);
    }
  }
  const results = [];
  let calls = 0;
  let inTok = 0;
  let failed = 0;
  const t0 = Date.now();
  const work = sample.map((r) => async () => {
    const env = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
    const b = buildCommand(r.intent, r.text, { env });
    const c = cascade(r.text, { extras: ['shell=bash', 'os=linux'], top: 4 });
    const alts = c.top.map((t) => t.intent).filter((i) => i !== r.intent).slice(0, 2);
    const opts = [r.intent, ...alts].sort(() => rng() - 0.5);
    const criteria = Object.fromEntries(opts.map((i) => [i, BY_ID[i].description]));
    criteria.none = 'none of these';
    const { spans } = silverSpans(r.text, r.intent);
    const questions = {
      intent: { type: 'choice', instructions: 'Which action does the user request? (The request may be in Polish or English.)', criteria },
      correct: { type: 'noul', instructions: 'The shell command does what the request asks for (values the request does not mention may use sensible defaults)' },
      risk: { type: 'choice', instructions: 'How risky is running the shell command on a user machine', criteria: RISK_DESC },
    };
    spans.slice(0, 3).forEach((s, i) => {
      questions[`span_${i}`] = { type: 'noul', instructions: `In the request, "${r.text.slice(s.start, s.end)}" is ${TYPE_DESC[s.type]}` };
    });
    try {
      const j = await ask({ request: r.text, shell: 'bash on Linux', command: b.command }, questions);
      calls++;
      inTok += j.usage?.input_tokens || 0;
      const a = j.answers || {};
      results.push({
        text: r.text, intent: r.intent, lang: r.lang, command: b.command, risk: b.risk,
        t_intent: a.intent?.choice, t_intent_conf: a.intent?.confidence, t_correct: a.correct?.noul,
        t_risk: a.risk?.choice, t_risk_conf: a.risk?.confidence,
        spans: spans.slice(0, 3).map((s, i) => ({ type: s.type, text: r.text.slice(s.start, s.end), p: a[`span_${i}`]?.noul })),
      });
    } catch (e) {
      failed++;
      if (failed <= 3) console.log(`teacher: call failed (${e.message})`);
    }
  });
  // small concurrency, well under the documented rate limits
  for (let i = 0; i < work.length; i += 6) await Promise.all(work.slice(i, i + 6).map((f) => f()));
  const meta = { calls, failed, inTok, seconds: Math.round((Date.now() - t0) / 1000), date: new Date().toISOString().slice(0, 10) };
  mkdirSync(join(ROOT, 'build'), { recursive: true });
  writeFileSync(join(ROOT, 'build', 'teacher_meta.json'), JSON.stringify(meta));
  writeFileSync(join(ROOT, 'build', 'teacher_results.jsonl'), results.map((r) => JSON.stringify(r)).join('\n') + '\n');
  summarize(results, meta);
}

function summarize(results, { calls, failed, inTok, seconds }) {
  const RANK = { safe: 0, medium: 1, high: 2 };
  const review = [];
  let intentAgree = 0; let correctOk = 0; let riskAgree = 0; let riskHigher = 0; let spanN = 0; let spanOk = 0;
  for (const r of results) {
    const reasons = [];
    if (r.t_intent === r.intent) intentAgree++;
    else if ((r.t_intent_conf ?? 0) >= 0.5) reasons.push(`teacher intent ${r.t_intent} (${r.t_intent_conf})`);
    if ((r.t_correct ?? 0) >= 0.5) correctOk++; else if ((r.t_correct ?? 1) < 0.3) reasons.push(`command judged wrong (${r.t_correct})`);
    if (r.t_risk === r.risk) riskAgree++;
    if (RANK[r.t_risk] > RANK[r.risk] && (r.t_risk_conf ?? 0) >= 0.5) { riskHigher++; reasons.push(`teacher risk ${r.t_risk} > ours ${r.risk}`); }
    for (const s of r.spans) { spanN++; if ((s.p ?? 0) >= 0.5) spanOk++; else if ((s.p ?? 1) < 0.3) reasons.push(`span ${s.type} "${s.text}" rejected (${s.p})`); }
    if (reasons.length) review.push({ text: r.text, intent: r.intent, command: r.command, reasons });
  }
  mkdirSync(join(ROOT, 'data', 'teacher'), { recursive: true });
  writeFileSync(join(ROOT, 'data', 'teacher', 'review.jsonl'), review.map((r) => JSON.stringify(r)).join('\n') + '\n');
  const spend = (inTok / 1e6) * PRICE_PER_MTOK;
  const n = results.length;
  const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl'));
  const md = `## Teacher verification (TypeSafe Jev, build time only)

Sampled **${n}** training rows (stratified over intents, EN+PL, incl. shell-phrased rows) and made **${calls} API calls**
(${failed} failed) to \`jev-latest\`${seconds ? ` in ${seconds} s` : ''}: ${inTok} input tokens ≈ **$${spend.toFixed(4)}**
(at $${PRICE_PER_MTOK}/Mtok input, output free). Each call asked: intent (choice among the gold label and our two closest
alternatives), "the rendered command does what is asked" (noul), risk (choice) and up to 3 silver slot spans (noul).

| check | agreement |
|---|---|
| intent label = teacher choice | ${pct(intentAgree, n)} |
| command judged correct (noul ≥ 0.5) | ${pct(correctOk, n)} |
| risk level identical | ${pct(riskAgree, n)} (teacher rated higher with conf ≥ 0.5: ${riskHigher}) |
| silver slot spans accepted (noul ≥ 0.5) | ${pct(spanOk, spanN)} of ${spanN} |

${review.length} rows flagged → \`data/teacher/review.jsonl\`. After manual inspection (\`data/teacher/decisions.jsonl\`):
* intent labels: no disagreement, **0 training rows dropped or relabelled**;
* risk: **${decisions.filter((d) => d.action === 'relabel' && d.field === 'risk').length} intents relabelled safe → medium** (${decisions.filter((d) => d.action === 'relabel' && d.field === 'risk').map((d) => d.intent).join(', ')}) — they overwrite files or change the git working tree;
  ${decisions.filter((d) => d.action === 'keep' && d.field === 'risk').length} kept safe where the teacher was stricter than our definition (${decisions.filter((d) => d.action === 'keep' && d.field === 'risk').map((d) => d.intent).join(', ')});
* "command wrong" flags were slot-extraction bugs, not label errors (Windows \`C:\\\` paths, \`plik X.b64\` for base64, Polish inflection
  \`javy\` → \`java\`, filler words taken as values); fixed in \`src/slots.js\` / \`src/tagger.js\` (${decisions.filter((d) => d.action === 'keep' && d.field === 'label').length} rows kept).`;
  updateSection('teacher', md);
  console.log(`teacher: ${calls} calls, ${inTok} input tokens ≈ $${spend.toFixed(4)}; intent agree ${pct(intentAgree, n)}, correct ${pct(correctOk, n)}, risk agree ${pct(riskAgree, n)}, spans ${pct(spanOk, spanN)}; ${review.length} flagged`);
}

main().catch((e) => { console.log(`teacher: failed (${e.message}) — skipped`); process.exitCode = 0; });
#!/usr/bin/env node
// Latency benchmark. Run pinned to one core: `taskset -c 0 node scripts/bench.js` (npm run bench).
//  cold: spawn a fresh `node bin/tellsh.js --dry-run --json --shell bash <query>` (node startup + model load + full pipeline)
//  warm: in-process full pipeline per query: env/ctx tokens -> cascade (tool top-3 + intent) -> BIO tagger ->
//        regex fallback/merge -> render for the shell -> danger check (+ composer check)
import { spawnSync, execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { cpus } from 'node:os';
import { loadModel } from '../src/model.js';
import { suggest } from '../src/pipeline.js';
import { updateSection } from './report.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BIN = join(ROOT, 'bin', 'tellsh.js');
const COLD_RUNS = +(process.env.COLD_RUNS || 40);
const WARM_N = +(process.env.WARM_N || 2000);

const quantile = (arr, q) => { const s = [...arr].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(q * s.length))]; };
const fmt = (ms) => `${ms.toFixed(ms < 1 ? 3 : 1)} ms`;
const queries = readdirSync(join(ROOT, 'data', 'eval')).filter((f) => f.endsWith('.jsonl')).sort()
  .flatMap((f) => readFileSync(join(ROOT, 'data', 'eval', f), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l).text));

const nodeOnly = [];
for (let i = 0; i < 10; i++) { const t = performance.now(); spawnSync(process.execPath, ['-e', '0']); nodeOnly.push(performance.now() - t); }

const cold = [];
for (let i = 0; i < COLD_RUNS; i++) {
  const q = queries[(i * 37) % queries.length];
  const t = performance.now();
  const r = spawnSync(process.execPath, [BIN, '--dry-run', '--json', '--shell', 'bash', '--os', 'linux', q], { encoding: 'utf8' });
  cold.push(performance.now() - t);
  if (![0, 3, 5].includes(r.status)) throw new Error(`cold run failed (${r.status}): ${r.stderr}`);
}

const tl = performance.now();
const model = loadModel();
const loadMs = performance.now() - tl;

const run = (env, extra = {}) => {
  for (let i = 0; i < 200; i++) suggest(queries[i % queries.length], { model, env, ...extra });
  const times = [];
  for (let i = 0; i < WARM_N; i++) {
    const q = queries[(i * 7) % queries.length];
    const t = performance.now();
    suggest(q, { model, env, ...extra });
    times.push(performance.now() - t);
  }
  return times;
};
const warm = run({ shell: 'bash', os: 'linux', coreutils: 'gnu' }, { compose: 'off' });
const warmCompose = run({ shell: 'bash', os: 'linux', coreutils: 'gnu' });
const warmPs = run({ shell: 'powershell', os: 'win32', coreutils: 'gnu' });
const hist = ['docker run -d --name web nginx', 'cd ~/projects/api', 'tellsh ile zajmuje /home', 'git checkout -b feature/x', 'cat notes.txt'];
const warmHist = run({ shell: 'bash', os: 'linux', coreutils: 'gnu' }, { history: hist });

let affinity = 'unknown';
try { affinity = execFileSync('taskset', ['-cp', String(process.pid)], { encoding: 'utf8' }).trim().split(': ').pop(); } catch {}

const md = `## Latency

Machine: ${cpus()[0]?.model || 'unknown CPU'}, Node ${process.version}, ${process.platform}; CPU affinity: \`${affinity}\` (run via \`taskset -c 0\`).

| measurement | p50 | p95 | runs |
|---|---|---|---|
| bare \`node -e 0\` startup (baseline) | ${fmt(quantile(nodeOnly, 0.5))} | ${fmt(quantile(nodeOnly, 0.95))} | ${nodeOnly.length} |
| **cold**: \`node bin/tellsh.js --dry-run --json --shell bash <query>\` (new process, model load, full pipeline) | **${fmt(quantile(cold, 0.5))}** | **${fmt(quantile(cold, 0.95))}** | ${cold.length} |
| model load (in-process, one-off) | ${fmt(loadMs)} | – | 1 |
| **warm**: full cascade + tagger + render (bash, composer off) | **${fmt(quantile(warm, 0.5))}** | **${fmt(quantile(warm, 0.95))}** | ${warm.length} |
| warm, incl. composer modifier check (shipped default) | ${fmt(quantile(warmCompose, 0.5))} | ${fmt(quantile(warmCompose, 0.95))} | ${warmCompose.length} |
| warm, PowerShell rendering | ${fmt(quantile(warmPs, 0.5))} | ${fmt(quantile(warmPs, 0.95))} | ${warmPs.length} |
| warm, with 5 history lines (context build + reference rules) | ${fmt(quantile(warmHist, 0.5))} | ${fmt(quantile(warmHist, 0.95))} | ${warmHist.length} |

The composer runs \`bash -n\` (a subprocess, ~2 ms) only when it actually returns a composed command.
`;
updateSection('bench', md);
console.log(md);
#!/usr/bin/env node
// Derive weak NL triggers for composer flags from tldr-pages flag descriptions (data/tldr/flags.jsonl,
// CC-BY-4.0). For every (head [sub], flag) in the composer vocabulary keep the stems that are most
// specific to that flag relative to the tool's other flags. Output: model/tldr_triggers.json (small).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { TOOLS } from '../src/compose.js';
import { foldKeepLength } from '../src/slots.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const src = `${ROOT}data/tldr/flags.jsonl`;
if (!existsSync(src)) { console.error('no data/tldr/flags.jsonl (run scripts/tldr_ingest.py)'); process.exit(1); }
const rows = readFileSync(src, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const STOP = new Set(('the a an of in on to for and or with by from all show list display given specific current ' +
  'file files directory directories using use into only each its their this that which when what are is be as ' +
  'dla oraz albo jest lub ktore ktory tylko wszystkie plik pliki katalog katalogu').split(' '));
const stems = (t) => foldKeepLength(t).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/)
  .filter((w) => w.length > 2 && !STOP.has(w)).map((w) => w.slice(0, 5));

const out = {};
for (const [tn, spec] of Object.entries(TOOLS)) {
  const variants = spec.sub ? Object.entries(spec.sub).map(([s, v]) => [`${spec.head} ${s}`, v.flags, s]) : [[spec.head, spec.flags, null]];
  for (const [key, flags, sub] of variants) {
    const mine = rows.filter((r) => r.head === spec.head && (sub ? r.sub === sub : true));
    const vocab = new Set(flags.map((f) => f.flag.split(' ')[0]));
    const byFlag = {};
    const total = {};
    for (const r of mine) {
      const f = r.flag;
      const long = r.long;
      const k = vocab.has(f) ? f : vocab.has(long) ? long : null;
      for (const s of new Set(stems(r.text))) {
        total[s] = (total[s] || 0) + 1;
        if (k) (byFlag[k] ??= {})[s] = (byFlag[k][s] || 0) + 1;
      }
    }
    const entry = {};
    for (const [flag, counts] of Object.entries(byFlag)) {
      const ranked = Object.entries(counts).map(([s, c]) => [s, c / total[s] * Math.log(1 + c)])
        .filter(([, sc]) => sc > 0.3).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([s]) => s);
      if (ranked.length) entry[flag] = ranked;
    }
    if (Object.keys(entry).length) out[key] = entry;
  }
}
writeFileSync(`${ROOT}model/tldr_triggers.json`, JSON.stringify(out));

// "explained" flags: triggers that fire on >= 5% of an intent's own training paraphrases are part of what that
// intent means ("hidden" for hidden_files, "kernel" for dmesg) and must not make the composer replace it.
const { triggeredFlags } = await import('../src/compose.js');
const { FAMILY_OF } = await import('../src/tools.js');
const { readdirSync } = await import('node:fs');
const train = [...readdirSync(`${ROOT}data/intents`).filter((f) => f.endsWith('.jsonl')).flatMap((f) => readFileSync(`${ROOT}data/intents/${f}`, 'utf8').split('\n')),
  ...(existsSync(`${ROOT}data/shell/train.jsonl`) ? readFileSync(`${ROOT}data/shell/train.jsonl`, 'utf8').split('\n') : [])]
  .filter(Boolean).map((l) => JSON.parse(l));
const counts = {};
const totals = {};
for (const r of train) {
  totals[r.intent] = (totals[r.intent] || 0) + 1;
  for (const f of new Set(triggeredFlags(r.text, FAMILY_OF[r.intent]))) ((counts[r.intent] ??= {})[f] = (counts[r.intent][f] || 0) + 1);
}
const explained = {};
for (const [intent, c] of Object.entries(counts)) {
  const fl = Object.entries(c).filter(([, n]) => n / totals[intent] >= 0.05).map(([f]) => f).sort();
  if (fl.length) explained[intent] = fl;
}
writeFileSync(`${ROOT}model/compose_explained.json`, JSON.stringify(explained));
console.log(`model/compose_explained.json: ${Object.keys(explained).length} intents, e.g. hidden_files=${JSON.stringify(explained.hidden_files)} dmesg=${JSON.stringify(explained.dmesg)}`);
console.log(`model/tldr_triggers.json: ${Object.keys(out).length} tools, ${Object.values(out).reduce((a, e) => a + Object.keys(e).length, 0)} flags`);
console.log(JSON.stringify(out.ls), JSON.stringify(out['git log']));
// Normalisation of simple commands for the composer eval. Only rewrites that keep the behaviour:
//   option bundling / order for ordinary commands: "ls -ltr" == "ls -l -r -t"; "tar -tzvf a.tgz" == "tar -t -z -v -f a.tgz"
//   attached values: "head -n5 f" == "head -n 5 f" == "head -5 f"
//   quoting: 'a.txt' == a.txt (words are compared after shell unquoting)
// Kept strict: argument boundaries ('a b' != a b), case (-name != -iname, '*.LOG' != '*.log'),
// find's expression order (filters before -delete matter), and every pipeline stage in order.
import { splitCommand, rawOf } from '../../src/shellwords.js';

const VALUE_FLAGS = {
  grep: ['-A', '-B', '-C', '-e', '-m', '-f'],
  head: ['-n', '-c'], tail: ['-n', '-c'], sort: ['-k', '-t'], du: ['-d', '-t'], df: ['-t'],
  tar: ['-f', '-C'], ps: ['-u', '-o', '-p', '-C'], journalctl: ['-u', '-n', '-p'], wc: [], ls: [],
  'git log': ['-n'], 'docker ps': ['-n', '-f'], 'docker images': ['-f'],
};

/** Shell words of a command (unquoted). Kept for callers that only need the word list. */
export function shellWords(s) {
  const r = splitCommand(String(s));
  return r.ok ? r.segments.flatMap((g) => g.words.map(rawOf)) : String(s).split(/\s+/).filter(Boolean);
}

function normSegment(w) {
  const head = w[0] || '';
  let i = 1;
  let sub = '';
  if ((head === 'git' || head === 'docker') && w[1]) { sub = w[1]; i = 2; }
  const key = sub ? `${head} ${sub}` : head;
  if (head === 'find') return { key, flags: [], args: w.slice(1) }; // the expression is order-sensitive: compare verbatim
  const vf = VALUE_FLAGS[key] ?? VALUE_FLAGS[head] ?? [];
  const flags = [];
  const args = [];
  for (; i < w.length; i++) {
    const t = w[i];
    if (t === '--') { const rest = w.slice(i + 1); args.push(...(rest.some((x) => /^-/.test(x)) ? ['--'] : []), ...rest); break; } // `--` is a no-op unless an operand starts with -
    if (/^--[\w-]+=/.test(t)) { flags.push(t); continue; }
    if (/^--/.test(t)) { flags.push(vf.includes(t) ? `${t} ${w[++i] ?? ''}` : t); continue; }
    if (/^-\d+$/.test(t) && ['head', 'tail'].includes(head)) { flags.push(`-n ${t.slice(1)}`); continue; }
    if (/^-[A-Za-z]/.test(t)) {
      const letters = t.slice(1);
      for (let k = 0; k < letters.length; k++) {
        const f = '-' + letters[k];
        if (/\d/.test(letters[k])) { flags.push(f); continue; }
        if (vf.includes(f)) {
          const rest = letters.slice(k + 1);
          flags.push(`${f} ${rest || (w[++i] ?? '')}`);
          break;
        }
        flags.push(f);
      }
      continue;
    }
    if (head === 'ps' && /^[a-z]+$/.test(t) && i === 1) { for (const c of t) flags.push('bsd:' + c); continue; }
    args.push(t);
  }
  return { key, flags: [...new Set(flags)].sort(), args };
}

export function normCmd(cmd) {
  const r = splitCommand(String(cmd).trim(), 'posix', { keepRedirects: true });
  if (!r.ok) return 'raw:' + String(cmd).trim();
  return JSON.stringify(r.segments.map((g) => ({ ...normSegment(g.words.map(rawOf)), sep: g.sep })));
}

export const sameCmd = (a, b) => normCmd(a) === normCmd(b);
    ap.add_argument('--seed', type=int, default=13)
    ap.add_argument('--out', default=os.path.join(ROOT, 'model', 'model.bin'))
    args = ap.parse_args()
    t0 = time.time()
    meta = json.load(open(os.path.join(BUILD, 'meta.json')))
    dim, tag_dim = meta['dim'], meta['tagDim']
    rows, X = load_cls(dim)
    log(f'{len(rows)} classifier rows, {X.nnz} nnz')
    keep_int = lambda n: 1500 + 250 * n  # noqa: E731
    fam_intents = meta['intentsByFamily']

    # ---------------- calibration on a group-wise holdout ----------------
    rng = np.random.default_rng(args.seed)
    gids = np.array([r['gid'] for r in rows])
    ug = np.unique(gids)
    ho_g = set(rng.choice(ug, int(len(ug) * args.holdout), replace=False).tolist())
    is_ho = np.array([g in ho_g for g in gids])
    # evaluate on the original (non-augmented) sentence of each group only: first row of the group
    first = np.zeros(len(rows), bool)
    seen = set()
    for i, g in enumerate(gids):
        if g not in seen:
            first[i] = True
            seen.add(g)
    tr_idx = np.flatnonzero(~is_ho)
    ho_idx = np.flatnonzero(is_ho & first)
    tool_s, int_s = train_all(rows, X, meta, tr_idx, args.C, args.keep_tool, keep_int, '[split] ')
    Xho = X[ho_idx]
    p_tool = tool_s['model'].proba(Xho)
    res = cascade_scores(p_tool, tool_s['labels'], {f: m['model'] for f, m in int_s.items()}, Xho, fam_intents)
    gold_i = [rows[i]['i'] for i in ho_idx]
    gold_t = [rows[i]['y'] for i in ho_idx]
    ind = np.array([g != '__none__' and gi != '' for g, gi in zip(gold_t, gold_i)])
    oodm = np.array([g == '__none__' for g in gold_t])
    score = np.array([r[1] for r in res])
    correct = np.array([r[0] == gi for r, gi in zip(res, gold_i)])
    t1 = np.array([r[3] == g for r, g in zip(res, gold_t)])
    t3 = np.array([g in r[4] for r, g in zip(res, gold_t)])
    log(f'[split] holdout: intent acc={correct[ind].mean():.4f} tool top1={t1[ind].mean():.4f} top3={t3[ind].mean():.4f} '
        f'(n={ind.sum()}, ood n={oodm.sum()})')
    best_t, best_s = 0.0, -1
    for t in np.arange(0.02, 0.6, 0.005):
        keep_c = (score[ind & correct] >= t).mean()
        rej_w = (score[ind & ~correct] < t).mean() if (ind & ~correct).any() else 1.0
        rej_o = (score[oodm] < t).mean() if oodm.any() else 0.0
        if keep_c < 0.97:
            continue
        s = keep_c + 0.5 * rej_o + 0.25 * rej_w
        if s > best_s:
            best_t, best_s = float(t), s
    # compose threshold: stage-1 top tool probability (non-__none__) that lets <=5% of OOD through
    top_nn = np.array([r[2] if r[3] != '__none__' else 0.0 for r in res])
    cands = [t for t in np.arange(0.1, 0.95, 0.01) if (top_nn[oodm] >= t).mean() <= 0.05] if oodm.any() else [0.5]
    compose_t = float(cands[0]) if cands else 0.9
    log(f'accept threshold={best_t:.3f} (correct kept={(score[ind & correct] >= best_t).mean():.3f}, '
        f'OOD rejected={(score[oodm] < best_t).mean() if oodm.any() else float("nan"):.3f}); compose tool threshold={compose_t:.2f}')

    # ---------------- final models on all data ----------------
    all_idx = np.arange(len(rows))
    tool, intents = train_all(rows, X, meta, all_idx, args.C, args.keep_tool, keep_int, '[final] ')

    # ---------------- tagger ----------------
    seqs, XT, yT, gT, seq_of = load_tag(tag_dim)
    log(f'tagger: {len(seqs)} sequences, {XT.shape[0]} tokens')
    ho_t = np.array([g in ho_g for g in gT])
    tt = time.time()
    tag_split = fit(XT[~ho_t], yT[~ho_t], args.tagC)
    pred = np.array(tag_split.labels)[tag_split.proba(XT[ho_t]).argmax(1)]
    gold = yT[ho_t]
    nz = gold != 'O'
    log(f'[split] tagger token acc={np.mean(pred == gold):.4f} non-O recall={np.mean(pred[nz] == gold[nz]):.4f} '
        f'non-O precision={np.mean(pred[pred != "O"] == gold[pred != "O"]):.4f} ({time.time() - tt:.0f}s)')
    tagger = prune_refit(XT, yT, args.tagC, args.keep_tag)
    log(f'[final] tagger: {len(tagger["labels"])} labels, {len(tagger["rows"])} rows ({time.time() - tt:.0f}s)')

    # ---------------- export ----------------
    models = {'tool': tool, 'tagger': tagger}
    for fam, m in intents.items():
        models['intent:' + fam] = m
    header = {
        'version': 2, 'dim': dim, 'tagDim': tag_dim,
        'thresholds': {'accept': round(best_t, 4), 'compose': round(compose_t, 4)},
        'C': args.C, 'tagC': args.tagC, 'trained': time.strftime('%Y-%m-%d'),
        'n_train': int(sum(1 for r in rows if r['g'] in ('intents', 'shell')) // 2),
        'n_rows': len(rows), 'n_tag_seqs': len(seqs),
        'intentsByFamily': fam_intents,
        'holdout': {'intent_acc': round(float(correct[ind].mean()), 4), 'tool_top1': round(float(t1[ind].mean()), 4),
                    'tool_top3': round(float(t3[ind].mean()), 4)},
        'models': {},
    }
    payload = bytearray()
    blobs = {}
    for name, m in models.items():
        Q, scale = quantize(m['W'])
        b = np.asarray(m['b'], dtype=np.float32)
        blob = m['rows'].astype('<u4').tobytes() + scale.astype('<f4').tobytes() + b.astype('<f4').tobytes() + Q.tobytes(order='C')
        blob += b'\0' * ((4 - len(blob) % 4) % 4)
        header['models'][name] = {'labels': m['labels'], 'rows': int(len(m['rows'])), 'offset': len(payload)}
        payload += blob
        blobs[name] = (m['rows'], Q, scale, b)
    hb = json.dumps(header, separators=(',', ':')).encode('utf-8')
    hb += b' ' * ((4 - (8 + len(hb)) % 4) % 4)
    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, 'wb') as f:
        f.write(b'TSH2')
        f.write(struct.pack('<I', len(hb)))
        f.write(hb)
        f.write(payload)
    log(f'wrote {args.out} ({os.path.getsize(args.out) / 1e6:.2f} MB): ' +
        ', '.join(f'{n}={len(m["rows"])}x{len(m["labels"])}' for n, m in models.items() if not n.startswith('intent:')) +
        f', {len(intents)} intent models ({sum(len(m["rows"]) * len(m["labels"]) for m in intents.values())} weights)')

    # ---------------- parity fixture (JS inference must reproduce these probabilities) ----------------
    def q_proba(name, feats):
        rws, Q, scale, b = blobs[name]
        pos = {int(r): k for k, r in enumerate(rws)}
        z = b.astype(np.float64).copy()
        for k, v in feats:
            if k in pos:
                z += v * Q[pos[k]].astype(np.float64) * scale.astype(np.float64)
        z -= z.max()
        e = np.exp(z)
        return e / e.sum()

    fx = {'cls': [], 'tag': []}
    step = max(1, len(rows) // 30)
    for r in rows[::step][:30]:
        p = q_proba('tool', r['f'])
        fx['cls'].append({'model': 'tool', 'f': r['f'], 'top': [[header['models']['tool']['labels'][i], float(p[i])] for i in np.argsort(-p)[:3]]})
        fam = r['y']
        if 'intent:' + fam in blobs:
            p = q_proba('intent:' + fam, r['f'])
            labels = header['models']['intent:' + fam]['labels']
            fx['cls'].append({'model': 'intent:' + fam, 'f': r['f'], 'top': [[labels[i], float(p[i])] for i in np.argsort(-p)[:2]]})
    for s in seqs[::max(1, len(seqs) // 10)][:10]:
        for f in s['f'][:3]:
            p = q_proba('tagger', [(k, 1.0) for k in sorted(set(f))])
            fx['tag'].append({'f': sorted(set(f)), 'top': [[header['models']['tagger']['labels'][i], float(p[i])] for i in np.argsort(-p)[:2]]})
    with open(os.path.join(ROOT, 'test', 'fixtures', 'parity.json'), 'w', encoding='utf-8') as f:
        json.dump(fx, f)
    log(f'wrote test/fixtures/parity.json; done in {time.time() - t0:.0f}s')


if __name__ == '__main__':
    main()

codex
The runtime has extensive quoting and regression coverage, but I found a possible bypass in the history auto-run gate and gaps in held-out filtering. I’ll check both with read-only probes and inspect how evaluation constructs its gold answers.
exec
/bin/bash -lc 'cat src/fill.js src/danger.js' in /workspace/tellsh
 succeeded in 0ms:
// Turn (intent, slots) into a concrete, safely-quoted command for the target shell.
import { BY_ID } from './catalog.js';
import { extractSlots, pickArg, pickDest, pickDir } from './slots.js';
import { checkDanger, maxRisk } from './danger.js';
import { shQuote, psQuote, chooseTemplate, quoteForKind, UnquotableError } from './render.js';

export { shQuote };

// Validators for slots that are inserted raw ({slot!raw}).
export const RAW_OK = {
  count: (v) => /^\d{1,6}$/.test(String(v)),
  depth: (v) => /^\d{1,2}$/.test(String(v)),
  days: (v) => /^\d{1,5}$/.test(String(v)),
  pid: (v) => /^\d{1,7}$/.test(String(v)),
  port: (v) => /^\d{1,5}$/.test(String(v)) && +v > 0 && +v < 65536,
  size: (v) => /^\d+[ckMG]?$/.test(String(v)),
  age: (v) => /^-m(?:min|time) -\d+$/.test(String(v)),
  mode: (v) => /^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(String(v)),
  var: (v) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(String(v)),
  minutes: (v) => /^\d{1,7}$/.test(String(v)),
  sizeBytes: (v) => /^\d{1,16}$/.test(String(v)),
};

const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
const PLACEHOLDER = (name) => `<${name.toUpperCase()}>`;

// sed needs regex-escaped search text and &,\,/ escaped replacement
const sedEscapeOld = (s) => s.replace(/[\\/.*^$[\]]/g, '\\$&');
const sedEscapeNew = (s) => s.replace(/[\\/&]/g, '\\$&').replace(/\n/g, '\\n');

/** Recompute derived slots after values were merged/overridden (tagger, history rules). */
export function finalizeSlots(intent, v) {
  if (v.ext != null && v.glob == null) v.glob = `*.${v.ext}`;
  if (intent.id === 'find_by_name' && v.name) v.namepat = /[*?]/.test(v.name) || /\.\w+$/.test(v.name) ? v.name : `*${v.name}*`;
  if (intent.id === 'replace_text' && v.old != null && v.new != null) v.sedexpr = `s/${sedEscapeOld(v.old)}/${sedEscapeNew(v.new)}/g`;
  return v;
}

/** Resolve the values an intent can use from the generic extraction. */
export function resolveSlots(intent, ex) {
  const v = {};
  const has = (k) => k in intent.slots || (typeof intent.template === 'string' && intent.template.includes(`{${k}`));
  const textual = ['pattern', 'message', 'text', 'name', 'old', 'branch', 'service', 'container', 'pkg', 'cmd', 'user']
    .some((k) => k in intent.slots) || ['base64_encode', 'base64_decode', 'replace_text', 'find_by_name'].includes(intent.id);
  const paths = [...(textual ? ex.paths : ex.pathsWithQuoted)];

  // archive-type paths (compress/extract)
  const isArchive = (p) => /\.(tar\.gz|tgz|tar|zip|tar\.bz2|tar\.xz|gz)$/i.test(p) && !/^(tar\.gz|tar|tgz|zip|gz)$/i.test(p);
  if (has('archive')) {
    const a = paths.find(isArchive);
    if (a) { v.archive = a; paths.splice(paths.indexOf(a), 1); }
  }
  if (has('src') || has('dst')) {
    if (paths[0]) v.src = paths[0];
    if (paths[1]) v.dst = paths[1];
    else if (paths[0]) {
      const d = pickDest(ex);
      if (d && d !== paths[0]) v.dst = d;
    }
  }
  if (has('file')) {
    const f = paths.find((p) => /\.[A-Za-z0-9]+$/.test(p) || p.includes('/')) || paths[0];
    if (f) v.file = f;
    if (has('dest') && paths.length > 1) v.dest = paths.find((p) => p !== f);
  }
  if (has('path') && paths.length) {
    v.path = paths[0];
  } else if (has('path') && !['find_by_name', 'chown'].includes(intent.id)) {
    const d = pickDir(ex);
    if (d) v.path = d;
  }
  if (has('archive') && !v.archive) {
    const base = (v.path || '.').replace(/\/+$/, '').split('/').pop();
    const ext = intent.id === 'compress_zip' ? '.zip' : '.tar.gz';
    v.archive = (!base || base === '.' || base === '..' || base === '~') ? `archive${ext}` : `${base}${ext}`;
  }
  if (ex.count != null) v.count = ex.count;
  if (has('depth') && ex.count != null && ex.count <= 10) v.depth = ex.count;
  if (ex.size) v.size = ex.size;
  if (ex.duration) {
    v.age = ex.duration.age;
    v.days = ex.duration.days;
    v.since = ex.duration.since;
  } else if (has('days') && ex.count != null) {
    v.days = ex.count;
  }
  if (ex.port) v.port = ex.port;
  if (has('pid')) {
    if (ex.pid) v.pid = ex.pid;
    else if (ex.numbers?.length) v.pid = ex.numbers.find((n) => n > 1);
  }
  if (has('port') && !v.port && ex.numbers?.length) v.port = ex.numbers.find((n) => n >= 20 && n < 65536);
  if (ex.mode && has('mode')) v.mode = ex.mode;
  if (ex.ext) v.glob = `*.${ex.ext}`;
  if (ex.urls.length) v.url = ex.urls[0];
  else if (has('url') && ex.hosts.length) v.url = /^\w+:\/\//.test(ex.hosts[0]) ? ex.hosts[0] : `https://${ex.hosts[0]}`;

  for (const k of ['name', 'service', 'container', 'pkg', 'cmd', 'var', 'branch', 'user', 'pattern', 'host', 'target', 'message']) {
    if (has(k)) {
      const val = pickArg(k, ex);
      if (val != null && val !== '') v[k] = val;
    }
  }
  if (intent.id === 'base64_encode' || intent.id === 'base64_decode') {
    const t = pickArg('text', ex);
    const fileWord = /\b(plik\w*|files?)\s+\S+\.\w+/i.test(ex.text);
    if (ex.quoted.length) v.text = ex.quoted[0];
    else if (paths.length && fileWord) v.file = paths[0];
    else if (paths.length && !(t && t.includes(' '))) v.file = paths[0];
    else if (t) v.text = t;
  }
  if (intent.id === 'find_by_name') {
    let name = v.name ?? (ex.quoted[0] || paths.find((p) => !p.includes('/') && p !== '.' && p !== '~'));
    if (!name) {
      const w = ex.rest.match(/\b(?:named|called|name|nazwie|nazwa|nazwany|nazywa sie|nazywajacy sie|plik|file|pliku)\s+(?:o\s+)?(?:nazwie\s+)?([\w.*-]+)/);
      if (w && !/^(o|the|a|nazwie|named|called)$/.test(w[1])) name = w[1];
    }
    if (name) {
      v.name = name;
      v.namepat = /[*?]/.test(name) || /\.\w+$/.test(name) ? name : `*${name}*`;
      if (v.path === name) v.path = paths.find((p) => p !== name);
    }
  }
  if (intent.id === 'replace_text') {
    let [o, n] = ex.taggerOnly ? [ex.tagged.PATTERN?.[0], ex.tagged.REPL?.[0]] : ex.quoted;
    if (!ex.taggerOnly && (o == null || n == null)) {
      const m = ex.text.match(/(?:replace|substitute|change|swap|zamie[nń]|zmie[nń]|podmie[nń]|zast[aą]p)\s+(?:all\s+|every\s+|wszystkie\s+|ka[zż]de\s+)?(?:occurrences of\s+|wyst[aą]pienia\s+)?(?:word\s+|s[lł]owo\s+|text\s+|tekst\s+|string\s+)?["'„]?([^\s"'”]+)["'”]?\s+(?:with|to|for|into|by|na|->|=>)\s+["'„]?([^\s"'”]+)["'”]?/i);
      if (m) { o = o ?? m[1]; n = n ?? m[2]; }
    }
    if (o != null) v.old = o;
    if (n != null) v.new = n;
    if (o != null && n != null) v.sedexpr = `s/${sedEscapeOld(o)}/${sedEscapeNew(n)}/g`;
    // the file is the path that is not one of the replaced words
    if (v.file && (v.file === o || v.file === n)) v.file = paths.find((p) => p !== o && p !== n);
  }
  if (intent.id === 'chown' && v.user && v.path === v.user) delete v.path;
  for (const k of Object.keys(v)) if (v[k] === undefined) delete v[k];
  return v;
}

function renderValue(name, raw, values, quote) {
  if (!(name in values)) return null;
  let val = values[name];
  if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
  if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
  return quote(val);
}

const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;

/**
 * Fill a template. Returns { command, missing[] }.
 * `values` = resolved slots merged over intent defaults.
 */
export function render(template, values, required = [], quote = shQuote) {
  const missing = [];
  const isSlot = (name) => name in values || required.includes(name) || SLOT_NAMES.test(name);
  // Single pass over the template: every {slot} and «optional segment» is substituted exactly once and
  // inserted values are never scanned again (a value containing "{file}" must stay inert text).
  const out = template.replace(/«([^»]*)»|\{(\w+)(!raw)?\}/g, (m, seg, name, raw) => {
    if (seg != null) {
      let ok = true;
      const r = seg.replace(/\{(\w+)(!raw)?\}/g, (m2, n2, raw2) => {
        if (!ok) return m2;
        const val = renderValue(n2, !!raw2, values, quote);
        if (val == null) { ok = false; return m2; }
        return val;
      });
      return ok ? (/^\s/.test(r) ? r : ' ' + r) : '';
    }
    if (!isSlot(name)) return m; // not a slot (e.g. awk braces, %{http_code}, PowerShell script blocks)
    const val = renderValue(name, !!raw, values, quote);
    if (val == null) {
      missing.push(name);
      return PLACEHOLDER(name);
    }
    return val;
  });
  return { command: out, missing };
}

const DERIVED_REQUIRED = { namepat: 'name', glob: 'ext', sedexpr: 'old' };

const SIZE_MULT = { c: 1, k: 1024, M: 1024 ** 2, G: 1024 ** 3 };
/** Slots derived from others so every shell can use the unit it needs (find: -mmin/-size, PowerShell: minutes/bytes). */
export function deriveSlots(v) {
  if (v.glob && v.ext == null) { const m = String(v.glob).match(/^\*\.([\w]+)$/); if (m) v.ext = m[1]; }
  if (v.minutes == null && v.age) {
    const m = String(v.age).match(/^-m(min|time) -(\d+)$/);
    if (m) v.minutes = m[1] === 'min' ? +m[2] : +m[2] * 1440;
  }
  if (v.sizeBytes == null && v.size != null) {
    const m = String(v.size).match(/^(\d+)([ckMG]?)$/);
    if (m) v.sizeBytes = +m[1] * (SIZE_MULT[m[2]] ?? 512);
  }
  return v;
}

/** env from the legacy `platform` option */
export const envFromPlatform = (platform = process.platform) => ({
  shell: 'bash',
  os: platform === 'darwin' ? 'darwin' : platform === 'win32' ? 'win32' : 'linux',
  coreutils: platform === 'darwin' ? 'bsd' : 'gnu',
});

/**
 * Build a full suggestion for an intent and query.
 *   env: { shell, os, coreutils } (default: bash on `platform`)
 *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
 * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}
 */
export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given } = {}) {
  const intent = BY_ID[intentId];
  if (!intent) throw new Error(`unknown intent ${intentId}`);
  const e = env || envFromPlatform(platform);
  const resolved = given || resolveSlots(intent, extracted || extractSlots(text));
  const defaults = { ...intent.slots, ...(e.os === 'darwin' ? intent.darwinDefaults : {}) };
  const values = {};
  for (const [k, d] of Object.entries(defaults)) if (d != null) values[k] = d;
  Object.assign(values, resolved);
  deriveSlots(values);
  const required = Object.entries(intent.slots).filter(([, d]) => d == null).map(([k]) => k);

  const choice = chooseTemplate(intent, e);
  const base = {
    intent: intent.id, description: intent.description, baseRisk: intent.risk, slots: resolved,
    notes: intent.notes || null, shell: e.shell, os: e.os, variant: choice.variant || null,
  };
  if (choice.gap) {
    return { ...base, command: null, gap: choice.gap, risk: intent.risk, warnings: [], critical: false, missing: [] };
  }
  const quote = quoteForKind(choice.kind, choice.wrapPosix);
  const tpl = choice.tpl;
  let command;
  let missing = [];
  try {
    if (typeof tpl === 'function') {
      const q = (s) => (/^-/.test(String(s)) ? quote('./' + s) : quote(s));
      const vals = { ...values };
      for (const r of required) if (!(r in vals)) { missing.push(r); vals[r] = PLACEHOLDER(r); }
      // catalog functions take the OS string, variant functions a ctx object
      command = tpl(vals, q, tpl === intent.template || tpl === intent.darwin ? e.os : e);
      if (/<TEXT>/.test(command)) missing.push('text');
    } else {
      ({ command, missing } = render(tpl, values, required, quote));
      missing = missing.map((m) => DERIVED_REQUIRED[m] || m);
    }
  } catch (err) {
    if (!(err instanceof UnquotableError)) throw err;
    return { ...base, command: null, gap: err.message, risk: intent.risk, warnings: [], critical: false, missing: [] };
  }
  if (choice.wrapPosix) {
    // PowerShell < 7.3 drops embedded double quotes when passing arguments to native programs, so a
    // POSIX command containing `"` is fed to bash on stdin instead of as a -c argument.
    if (command.includes('"')) { command = psQuote(command) + ' | bash'; base.variant = 'piped to bash (no native PowerShell variant)'; }
    else { command = 'bash -c ' + psQuote(command); base.variant = 'bash -c (no native PowerShell variant)'; }
  }
  missing = [...new Set(missing)];
  const danger = checkDanger(command, intent.risk);
  return {
    ...base,
    command,
    risk: maxRisk(intent.risk, danger.risk),
    warnings: danger.warnings,
    critical: danger.critical,
    missing,
  };
}
// Dangerous-pattern checker. Runs on every final command (including user-edited ones)
// and can only ever escalate risk, never lower it.
//
// Regex rules run on the command text after `git`/`docker` global options are removed
// (`git -C /repo -c x=y reset --hard` is checked as `git reset --hard`). Structural rules
// (rm, kill, Remove-Item, rd/del) tokenize each simple command so long options, quoted targets
// and `--` are understood.

const RANK = { safe: 0, medium: 1, high: 2 };
export const maxRisk = (a, b) => (RANK[b] > RANK[a] ? b : a);

// ---------------------------------------------------------------------------------------------
// light tokenizer: simple commands separated by ; & | && || ( ) and newlines, words unquoted
// (POSIX '…' "…" \x and PowerShell `x). Good enough for danger checks, not a full shell parser.

const QUOTE_CHARS = /['"\u2018\u2019\u201A\u201B\u201C\u201D\u201E]/g;

// winPaths: backslash is never an escape (cmd.exe / PowerShell paths such as "C:\")
export function simpleCommands(cmd, { winPaths = false } = {}) {
  const out = [];
  let words = [];
  let w = null;
  const flushWord = () => { if (w != null) { words.push(w); w = null; } };
  const flushCmd = () => { flushWord(); if (words.length) out.push(words); words = []; };
  const s = String(cmd);
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "'") {
      const j = s.indexOf("'", i + 1);
      const end = j < 0 ? s.length : j;
      w = (w ?? '') + s.slice(i + 1, end);
      i = end;
    } else if (c === '"') {
      let v = '';
      let j = i + 1;
      for (; j < s.length && s[j] !== '"'; j++) {
        if (((!winPaths && s[j] === '\\' && /[$`"\\\n]/.test(s[j + 1])) || s[j] === '`') && j + 1 < s.length) v += s[++j]; else v += s[j];
      }
      w = (w ?? '') + v;
      i = j;
    } else if (!winPaths && c === '\\' && i + 1 < s.length && !/[A-Za-z0-9_.%$~*]/.test(s[i + 1])) {
      w = (w ?? '') + s[++i]; // POSIX escape (keeps Windows paths like C:\Users intact)
    } else if ((c === '{' || c === '}') && w == null && (i + 1 >= s.length || /\s/.test(s[i + 1]))) {
      flushCmd(); // standalone { } = command group / script block
    } else if (/\s/.test(c)) {
      if (c === '\n') flushCmd(); else flushWord();
    } else if (/[;&|()]/.test(c)) {
      flushCmd();
    } else {
      w = (w ?? '') + c;
    }
  }
  flushCmd();
  return out;
}

// strip wrappers that run their argument as the command
function commandWords(words) {
  let w = words;
  for (;;) {
    while (w.length && /^\w+=/.test(w[0])) w = w.slice(1);
    const h = (w[0] || '').replace(/^.*[\\/]/, '').toLowerCase();
    if (['sudo', 'doas', 'command', 'builtin', 'exec', 'nohup', 'time', 'nice', 'ionice', 'then', 'do', 'else', '&'].includes(h)) {
      w = w.slice(1);
      while (w.length && /^-/.test(w[0])) w = w.slice(1 + (/^-[ugnc]$/.test(w[0]) ? 1 : 0));
      continue;
    }
    if (h === 'xargs') { w = w.slice(1); while (w.length && /^-/.test(w[0])) w = w.slice(1 + (/^-[IdEnLPs]$/.test(w[0]) ? 1 : 0)); continue; }
    if (h === 'env') { w = w.slice(1); while (w.length && (/^-/.test(w[0]) || /^\w+=/.test(w[0]))) w = w.slice(1); continue; }
    return w;
  }
}

const POSIX_CRIT_TARGET = /^(?:\/+|\/+\*|~\/*|~\/+\*|\$\{?HOME\}?\/*|\$\{?HOME\}?\/+\*|\*|\.\/*|\.\/+\*|\.\.\/*|\.\.\/+\*|\.\*|\/+(?:bin|boot|dev|etc|home|lib|lib32|lib64|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private)\/*\*?)$/;

function rmCheck(words, hit) {
  let recursive = false;
  let force = false;
  let noPreserve = false;
  const targets = [];
  let opts = true;
  for (const a of words.slice(1)) {
    if (opts && a === '--') { opts = false; continue; }
    if (opts && /^--/.test(a)) {
      if (a === '--recursive') recursive = true;
      else if (a === '--force') force = true;
      else if (a === '--no-preserve-root') noPreserve = true;
      continue;
    }
    if (opts && /^-[a-zA-Z]+$/.test(a)) {
      if (/[rR]/.test(a)) recursive = true;
      if (/f/.test(a)) force = true;
      continue;
    }
    targets.push(a);
  }
  hit('high', 'rm deletes files permanently (no trash)');
  if (noPreserve) hit('high', 'rm --no-preserve-root', true);
  if (recursive && force) hit('high', 'rm -rf deletes without asking');
  if (recursive && targets.some((t) => POSIX_CRIT_TARGET.test(t.trim()) || PS_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive rm on /, ~, * or . — would wipe everything', true);
}

// kill [-SIG | -s SIG | -n NUM | --signal SIG] [--] pid...   (pid 1 / -1 = init / every process)
function killCheck(words, hit) {
  hit('high', 'terminates processes');
  const a = words.slice(1);
  let i = 0;
  if (a[i] === '-s' || a[i] === '-n' || a[i] === '--signal') i += 2;
  else if (a[i] && /^-/.test(a[i]) && a[i] !== '--' && a[i] !== '-l' && a[i] !== '-L') i += 1;
  if (a[i] === '--') i++;
  if (a.slice(i).some((p) => /^-?1$/.test(p))) hit('high', 'kill -1 / PID 1 kills everything', true);
}

const PS_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*\*?|[\\/]+\*?|\*|~[\\/]*\*?|\$(?:HOME|env:USERPROFILE|env:HOMEDRIVE|env:SystemDrive|env:SystemRoot|env:windir|\{env:USERPROFILE\})[\\/]*\*?|[A-Za-z]:[\\/]+(?:Windows|Users|Program Files(?: \(x86\))?|ProgramData)[\\/]*\*?)$/i;
const PS_REMOVE = /^(?:remove-item|ri|rm|del|erase|rd|rmdir)$/i;

// Remove-Item and its aliases (PowerShell parameter names may be abbreviated: -r, -Rec, -lp, ...)
function removeItemCheck(words, hit) {
  const a = words.slice(1);
  if (a.some((x) => /^\/[sq]$/i.test(x))) return; // cmd.exe syntax, see cmdDelCheck
  hit('high', 'deletes files permanently');
  const isParam = (x, name, min = 2) => /^-\w/.test(x) && x.length - 1 >= Math.min(min, name.length) && name.startsWith(x.slice(1).replace(/:.*$/, '').toLowerCase());
  const recurse = a.some((x) => isParam(x, 'recurse', 1));
  const targets = [];
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    if (isParam(x, 'path', 1) || isParam(x, 'literalpath', 1) || /^-(?:lp|pspath)$/i.test(x)) { if (a[i + 1] != null) targets.push(...a[++i].split(',')); continue; }
    if (/^-/.test(x)) { if (/^-(?:include|exclude|filter|credential|stream)/i.test(x)) i++; continue; }
    targets.push(...x.split(','));
  }
  if (recurse && targets.some((t) => PS_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive Remove-Item on a drive root, home or *', true);
}

const CMD_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*\*?(?:\.\*)?|[\\/]+\*?|\*(?:\.\*)?|%(?:USERPROFILE|HOMEDRIVE|HOMEPATH|SystemDrive|SystemRoot|windir)%[\\/]*\*?(?:\.\*)?)$/i;

// cmd.exe rd/rmdir/del/erase (also reached from PowerShell aliases with cmd-style switches)
function cmdDelCheck(words, hit) {
  hit('high', 'deletes files permanently');
  const a = words.slice(1);
  const recursive = a.some((x) => /^\/s$/i.test(x));
  if (recursive && a.filter((x) => !/^\/\w$/.test(x)).some((t) => CMD_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive delete of a drive root or home', true);
}

// [regex, risk, message, critical]
const RULES = [
  [/\bmkfs(?:\.\w+)?\b|\bmke2fs\b|\bwipefs\b/, 'high', 'formats a filesystem', true],
  [/\bdd\b[^|;&]*\bof=\/dev\//, 'high', 'dd writing to a raw device', true],
  [/>\s*\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk)\w*/, 'high', 'redirect onto a raw disk device', true],
  [/\b(?:chmod|chown|chgrp)\s+(?:\S+\s+)*(?:-[a-zA-Z]*R[a-zA-Z]*|--recursive)\s+(?:\S+\s+)*['"]?\/['"]?(?:\s|$|\*)/, 'high', 'recursive permission/owner change on /', true],
  [/\bchmod\s+(?:-\S+\s+)*0?777\b/, 'medium', 'chmod 777 makes files world-writable'],
  [/:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:/, 'high', 'fork bomb', true],
  [/\b(?:curl|wget|fetch)\b[^|;]*\|\s*(?:sudo\s+)?(?:\S*\/)?(?:ba|z|da|k|fi)?sh\b/, 'high', 'pipes a download straight into a shell'],
  [/(?:\b(?:ba|z|da|k|fi)?sh\b|\bsource\b|\beval\b|(?:^|[;&|(]\s*)\.)\s[^|;&]*(?:<\(|\$\(|`)\s*(?:sudo\s+)?(?:curl|wget|fetch)\b/, 'high', 'runs a downloaded script'],
  [/\bsudo\b|\bdoas\b/, 'medium', 'runs with root privileges'],
  [/\bfind\b.*\s-delete\b|\bfind\b.*-exec(?:dir)?\s+(?:\S*\/)?rm\b|\bxargs\s+(?:-\S+\s+)*(?:\S*\/)?rm\b/, 'high', 'bulk deletion via find/xargs'],
  [/\bgit\s+push\b[^;&|]*\s(?:--force(?:-with-lease|-if-includes)?\b|-[a-zA-Z]*f\b|\+[^\s:]*(?::\S*)?|--mirror\b)/, 'high', 'force-push rewrites remote history'],
  [/\bgit\s+push\b[^;&|]*\s(?:--delete\b|-d\b|:\S)/, 'high', 'deletes a remote branch'],
  [/\bgit\s+reset\b[^;&|]*\s--(?:hard|merge|keep)\b|\bgit\s+clean\b[^;&|]*\s(?:-[a-zA-Z]*f|--force\b)|\bgit\s+restore\b|\bgit\s+checkout\b[^;&|]*\s(?:--\s|-f\b|--force\b|\.(?:\s|$))|\bgit\s+switch\b[^;&|]*\s(?:-f\b|--force\b|--discard-changes\b)/, 'high', 'discards uncommitted work'],
  [/\bgit\s+branch\b[^;&|]*\s(?:-D\b|-[a-zA-Z]*d[a-zA-Z]*f|--delete\s+--force|--force\s+--delete)/, 'high', 'force-deletes a branch'],
  [/\bgit\s+stash\s+(?:drop|clear)\b/, 'high', 'deletes stashed changes'],
  [/\bdocker\s+(?:system|volume|image|container|network|builder)\s+prune\b|\bdocker\s+(?:rmi?|container\s+rm|image\s+rm|volume\s+rm)\b/, 'high', 'deletes docker data'],
  [/\b(?:shutdown|reboot|halt|poweroff)\b|\binit\s+[06]\b/, 'high', 'shuts down / reboots the machine'],
  [/\b(?:pkill|killall)\b|\bdocker\s+kill\b/, 'high', 'terminates processes'],
  [/\b(?:shred|truncate)\b/, 'high', 'destroys file contents'],
  [/\biptables\s+-F\b|\bufw\s+disable\b/, 'high', 'drops firewall rules'],
  [/\bmv\s+\S+\s+\/dev\/null\b/, 'high', 'moves a file into /dev/null (deletes it)', true],
  // redirections: N>, N>>, &>, >|, >> onto system files; any other file write is medium
  [/(?:\d*|&)>>?\|?\s*['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'overwrites a system file'],
  [/(?:^|[^<>=-])(?:\d+|&)?>>?\|?(?!&|>)\s*(?!['"]?\/dev\/(?:null|stdout|stderr)\b)['"]?[^\s&|;)]/, 'medium', 'redirect writes to a file'],
  [/\btee\b/, 'medium', 'tee writes to a file'],
  [/\bsed\s+(?:-\S+\s+)*(?:-i|--in-place)\b/, 'medium', 'edits files in place'],
  [/\bcrontab\s+-r\b/, 'high', 'removes all cron jobs', true],
  // PowerShell
  [/\bRemove-Item\b|\bClear-Content\b/i, 'high', 'deletes files permanently'],
  [/\bStop-Process\b|\bspps\b|\btaskkill\b/i, 'high', 'terminates processes'],
  [/\bFormat-Volume\b|\bClear-Disk\b|\bInitialize-Disk\b|(?:^|[;&|(]\s*)format\s+[a-z]:/i, 'high', 'formats a disk', true],
  [/\b(?:Stop|Restart)-Computer\b|\bshutdown(?:\.exe)?\s+\/[srp]\b/i, 'high', 'shuts down / reboots the machine'],
  [/\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|curl|wget)\b[^|;]*\|\s*(?:iex|Invoke-Expression)\b/i, 'high', 'pipes a download straight into PowerShell'],
  [/\b(?:iex|Invoke-Expression)\b[^|;]*\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|curl|wget|DownloadString|DownloadData|Net\.WebClient)\b|\[scriptblock\]::Create\([^;]*\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|DownloadString)\b/i, 'high', 'runs a downloaded script'],
  [/\bSet-ExecutionPolicy\b|\bStart-Process\b.*-Verb\s+RunAs/i, 'medium', 'changes security policy / elevates'],
  [/\b(?:Stop|Restart|Start|Set)-Service\b/i, 'medium', 'changes a service'],
  [/\b(?:Set-Content|Out-File|Add-Content|Rename-Item|Move-Item|Copy-Item|New-Item|Set-Acl|Compress-Archive|Expand-Archive)\b/i, 'medium', 'modifies files'],
  [/\bdocker\s+stop\b/, 'medium', 'stops containers'],
];

// `git -C dir -c k=v --no-pager reset` -> `git reset`; `docker --context x -H h rm` -> `docker rm`
const OPTVAL = String.raw`(?:'[^']*'|"[^"]*"|[^\s;&|'"])+`;
const GIT_GLOBALS = new RegExp(String.raw`\bgit((?:\s+(?:(?:-C|-c|--git-dir|--work-tree|--namespace|--super-prefix|--config-env|--exec-path)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
const DOCKER_GLOBALS = new RegExp(String.raw`\bdocker((?:\s+(?:(?:-H|--host|-c|--context|--config|-l|--log-level|--tls\w*)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
export function normalizeGlobals(command) {
  return String(command).replace(GIT_GLOBALS, 'git').replace(DOCKER_GLOBALS, 'docker');
}

/** @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}} */
export function checkDanger(command, baseRisk = 'safe') {
  let risk = baseRisk;
  const warnings = [];
  let critical = false;
  const hit = (r, msg, crit) => {
    risk = maxRisk(risk, r);
    if (!warnings.includes(msg)) warnings.push(msg);
    if (crit) critical = true;
  };
  const text = normalizeGlobals(command);
  const inner = [];
  // structural checks run on both readings of backslashes (POSIX escapes / Windows path separators)
  for (const words of [...simpleCommands(text), ...simpleCommands(text, { winPaths: true })]) {
    const w = commandWords(words);
    if (!w.length) continue;
    const head = w[0].replace(/^.*[\\/]/, '');
    const lower = head.toLowerCase().replace(/\.exe$/, '');
    // a lone string with spaces is a command handed to another program ('…' | bash)
    if (w.length === 1 && /\s/.test(w[0])) inner.push(w[0]);
    // shells / eval run their argument as a command: check it too
    if (/^(?:ba|z|da|k|fi|c)?sh$|^(?:pwsh|powershell|cmd)$/.test(lower)) {
      const i = w.findIndex((x, k) => k > 0 && /^(?:-c|-Command|-Co\w*|\/c|\/k)$/i.test(x));
      if (i > 0 && w[i + 1] != null) inner.push(w.slice(i + 1).join(' '));
    } else if (lower === 'eval' || lower === 'iex' || lower === 'invoke-expression') inner.push(w.slice(1).join(' '));
    if (head === 'rm' || head === 'unlink') rmCheck(w, hit);
    else if (head === 'kill') killCheck(w, hit);
    else if (/^(?:rd|rmdir|del|erase)$/i.test(head)) {
      const a = w.slice(1);
      if (!a.some((x) => /^\/[a-z]$/i.test(x)) && a.some((x) => /^-\w/.test(x))) removeItemCheck(w, hit);
      else cmdDelCheck(w, hit);
    } else if (PS_REMOVE.test(lower)) removeItemCheck(w, hit);
    if (head === 'git' && w[1] === 'rm') hit('high', 'rm deletes files permanently (no trash)');
  }
  for (const c of inner) {
    if (c === command) continue;
    const d = checkDanger(c);
    for (const m of d.warnings) hit(d.risk, m, d.critical);
  }
  for (const [re, r, msg, crit] of RULES) if (re.test(text)) hit(r, msg, crit);
  return { risk, warnings, critical };
}

exec
/bin/bash -lc 'cat scripts/eval.js' in /workspace/tellsh
 succeeded in 0ms:
#!/usr/bin/env node
// Evaluation of the v0.2 cascade. Writes the eval section of EVAL.md.
//   1. per-stage accuracy on data/eval (held-out, never trained on): tool top-1/top-3, intent top-1/top-3,
//      answered / precision, per language
//   2. per shell: intent accuracy on data/eval under each shell context + data/shell/eval.jsonl
//      (shell-specific phrasing), render coverage and syntax validity (bash -n / sh -n)
//   3. slot F1 on data/slots/gold.jsonl (hand-annotated) for tagger / regex / merged, per type
//   4. end-to-end exact command: test/slot-cases.js (hand-written) and a relexicalised copy of data/eval
//      (values from held-out pools, gold command rendered from the inserted values)
//   5. history reference cases (data/history/eval.jsonl)
//   6. second pass / composer on out-of-catalogue requests (data/compose/eval.jsonl)
//   7. OOD rejection (data/ood_eval.jsonl)
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { getModel } from '../src/model.js';
import { cascade } from '../src/cascade.js';
import { suggest, resolveWithTagger } from '../src/pipeline.js';
import { buildCommand, resolveSlots, finalizeSlots } from '../src/fill.js';
import { exFromSpans, normPath, normExt, normNum } from '../src/tagger.js';
import { extractSlots } from '../src/slots.js';
import { BY_ID } from '../src/catalog.js';
import { FAMILY_OF, SLOT_TAG, TAG_TYPES } from '../src/tools.js';
import { envFeatures } from '../src/env.js';
import { SLOT_CASES } from '../test/slot-cases.js';
import { silverSpans, relex, mulberry32 } from './lib/silver.js';
import { sameCmd } from './lib/cmdnorm.js';
import { updateSection } from './report.js';
import { pwshParses } from './lib/pwsh_parse.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const VERBOSE = process.argv.includes('--verbose');
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const readDir = (d) => readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f)));
const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
const model = getModel();
const thr = model.thresholds.accept;
const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const ENVS = {
  bash: BASH, zsh: { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, sh: { shell: 'sh', os: 'linux', coreutils: 'gnu' },
  powershell: { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, fish: { shell: 'fish', os: 'linux', coreutils: 'gnu' },
  cmd: { shell: 'cmd', os: 'win32', coreutils: 'gnu' },
};
const out = [];
const md = (s = '') => out.push(s);
const t0 = Date.now();

// ------------------------------------------------------------------------------------------
// 1. classification per stage
const evalRows = readDir(join(ROOT, 'data', 'eval'));
function clsStats(rows, env, extraFn = () => []) {
  const S = {};
  const conf = new Map();
  const per = new Map();
  const bump = (k, f) => { S[k] ??= { n: 0, tool1: 0, tool3: 0, top1: 0, top3: 0, ans: 0, ansOk: 0 }; S[k][f]++; };
  for (const r of rows) {
    const c = cascade(r.text, { model, extras: [...envFeatures(r.shell ? { shell: r.shell, os: r.os } : env), ...extraFn(r)] });
    const fam = FAMILY_OF[r.intent];
    const ok = c.intent === r.intent;
    for (const k of ['all', r.lang]) {
      bump(k, 'n');
      if (c.topTool === fam) bump(k, 'tool1');
      if (c.tools.some((t) => t.tool === fam)) bump(k, 'tool3');
      if (ok) bump(k, 'top1');
      if (c.top.slice(0, 3).some((t) => t.intent === r.intent)) bump(k, 'top3');
      if (c.confidence >= thr) { bump(k, 'ans'); if (ok) bump(k, 'ansOk'); }
    }
    const pi = per.get(r.intent) || { n: 0, ok: 0 };
    pi.n++; if (ok) pi.ok++;
    per.set(r.intent, pi);
    if (!ok) { const key = `${r.intent} → ${c.intent}`; conf.set(key, (conf.get(key) || 0) + 1); if (VERBOSE) console.log(`  ✗ [${r.intent} → ${c.intent} ${(c.confidence * 100).toFixed(0)}%] ${r.text}`); }
  }
  return { S, conf, per };
}
const C1 = clsStats(evalRows, BASH);
const row = (k, s) => `| ${k} | ${s.n} | ${pct(s.tool1, s.n)} | ${pct(s.tool3, s.n)} | ${pct(s.top1, s.n)} | ${pct(s.top3, s.n)} | ${pct(s.ans, s.n)} | ${pct(s.ansOk, s.ans)} |`;
const modelSize = statSync(join(ROOT, 'model', 'model.bin')).size;
const intentModels = Object.keys(model.models).filter((k) => k.startsWith('intent:'));
const tm = model.models.tool;
const tg = model.models.tagger;
md('## Model');
md();
md(`\`model/model.bin\` **${(modelSize / 1e6).toFixed(2)} MB** (int8 weights, TSH2): stage 1 tool model ${tm.rowIds.length} rows × ${tm.labels.length} classes ` +
  `(${tm.labels.length - 1} tool families + \`__none__\`), ${intentModels.length} stage-2 intent models ` +
  `(${intentModels.reduce((a, k) => a + model.models[k].rowIds.length * model.models[k].labels.length, 0)} weights), ` +
  `tagger ${tg.rowIds.length} rows × ${tg.labels.length} BIO labels. Trained ${model.trained} on ${model.n_rows} classifier rows ` +
  `and ${model.n_tag_seqs} tagged sequences. Thresholds: accept **${model.thresholds.accept}** (cascade score), compose **${model.thresholds.compose}** (stage-1 tool p). ` +
  `Internal holdout during training: tool top-1 ${(model.holdout.tool_top1 * 100).toFixed(1)}%, top-3 ${(model.holdout.tool_top3 * 100).toFixed(1)}%, intent ${(model.holdout.intent_acc * 100).toFixed(1)}%.`);
md();
md('## 1. Cascade accuracy per stage (held-out `data/eval`, shell=bash os=linux)');
md();
md(`${evalRows.length} sentences written independently of the training data (training sentences colliding with any eval set are dropped by \`gen_data.js\`).`);
md('Stage 1 = tool family (top-1 / top-3); stage 2 = intent after p(tool)·p(intent|tool) over the top-3 tools.');
md();
md('| split | n | tool top-1 | tool top-3 | intent top-1 | intent top-3 | answered (p ≥ thr) | precision when answered |');
md('|---|---|---|---|---|---|---|---|');
for (const k of ['all', 'en', 'pl']) md(row(k.toUpperCase(), C1.S[k]));
md();
const worst = [...C1.per.entries()].map(([k, v]) => [k, v.ok / v.n, v.n]).sort((a, b) => a[1] - b[1]).slice(0, 8);
md('Weakest intents: ' + worst.map(([k, a, n]) => `${k} ${(a * 100).toFixed(0)}% (n=${n})`).join(', ') + '.');
md('Top confusions: ' + [...C1.conf.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => `${k} ×${v}`).join(', ') + '.');
md();

// ------------------------------------------------------------------------------------------
// 2. per shell
const shellEval = readJsonl(join(ROOT, 'data', 'shell', 'eval.jsonl'));
const hasBin = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
const syntaxCheck = (cmd, shell) => {
  if (shell === 'bash' || shell === 'zsh') return spawnSync('bash', ['-n', '-c', cmd]).status === 0;
  if (shell === 'sh') return spawnSync('sh', ['-n', '-c', cmd]).status === 0;
  if (shell === 'fish' && hasBin('fish')) return spawnSync('fish', ['-n', '-c', cmd]).status === 0;
  if (shell === 'powershell' && hasBin('pwsh')) return pwshParses(cmd); // parse only, never runs cmd
  return null;
};
md('## 2. Per shell');
md();
md('Intent accuracy of the same held-out set under each shell/OS context (the `shell=` / `os=` tokens are classifier features),');
md('plus `data/shell/eval.jsonl`: requests phrased by users of that shell (cmdlet names, `dir /s`, Windows paths, …).');
md('*rendered*: share of eval intents with a native rendering for that shell; *syntax ok*: renders that pass `bash -n` (bash, zsh) / `sh -n` (dash; sh) ' +
  '/ `fish -n` / PowerShell parser — n/a when that shell is not installed here.');
md();
md('| shell (os) | data/eval intent top-1 | shell-phrased n | shell-phrased intent top-1 (EN / PL) | rendered | syntax ok |');
md('|---|---|---|---|---|---|');
const shellRes = {};
for (const [sh, env] of Object.entries(ENVS)) {
  const cs = sh === 'bash' ? C1 : clsStats(evalRows, env);
  const se = shellEval.filter((r) => r.shell === sh);
  const ss = clsStats(se, env);
  // render each eval sentence's gold intent with the extracted slots for this shell
  let rendered = 0;
  let checked = 0;
  let synOk = 0;
  const seen = new Set();
  for (const r of evalRows) {
    if (seen.has(r.intent)) continue;
    seen.add(r.intent);
    const b = buildCommand(r.intent, r.text, { env });
    if (b.gap || !b.command) continue;
    rendered++;
    if (b.missing.length) continue;
    const ok = syntaxCheck(b.command, sh);
    if (ok == null) continue;
    checked++;
    if (ok) synOk++; else if (VERBOSE) console.log(`  syntax ✗ ${sh}: ${b.command}`);
  }
  shellRes[sh] = { acc: cs.S.all.top1 / cs.S.all.n, rendered, n: seen.size, checked, synOk };
  const s = ss.S.all;
  md(`| ${sh} (${env.os}${env.coreutils === 'bsd' ? ', BSD' : ''}) | ${pct(cs.S.all.top1, cs.S.all.n)} | ${s ? s.n : 0} | ${s ? `${pct(s.top1, s.n)} (${pct(ss.S.en?.top1 || 0, ss.S.en?.n || 0)} / ${pct(ss.S.pl?.top1 || 0, ss.S.pl?.n || 0)})` : 'n/a'} | ${rendered}/${seen.size} | ${checked ? `${synOk}/${checked}` : 'n/a (not installed)'} |`);
}
md();

// ------------------------------------------------------------------------------------------
// 3. slot F1 (hand-annotated gold)
const gold = readJsonl(join(ROOT, 'data', 'slots', 'gold.jsonl'));
function typedValue(type, text) {
  const t = String(text).replace(/^["'„“`](.*)["'”`]$/s, '$1').trim();
  switch (type) {
    case 'PATH': return normPath(t);
    case 'NUM': return normNum(t);
    case 'SIZE': return extractSlots(t).size ?? null;
    case 'TIME': return extractSlots(t).duration?.minutes ?? null;
    case 'EXT': return normExt(t);
    case 'PORT': case 'PID': { const n = parseInt(t.replace(/^\D+/, ''), 10); return Number.isFinite(n) ? n : null; }
    case 'HOST': return t.toLowerCase().replace(/^.*@/, '');
    default: return t.toLowerCase();
  }
}
// resolved slots -> typed values (same normalisation for every system)
function typedFromSlots(slots) {
  const out = [];
  for (const [k, v] of Object.entries(slots)) {
    if (v == null) continue;
    let type = SLOT_TAG[k];
    if (!type || k === 'since' || k === 'days' || k === 'glob') continue; // age carries TIME, ext/glob once
    let val;
    if (k === 'age') val = (() => { const m = String(v).match(/^-m(min|time) -(\d+)$/); return m ? (m[1] === 'min' ? +m[2] : +m[2] * 1440) : null; })();
    else if (type === 'PATH') val = normPath(String(v)) ?? String(v);
    else if (type === 'NUM' || type === 'PORT' || type === 'PID') val = +v;
    else if (type === 'HOST') val = String(v).toLowerCase().replace(/^.*@/, '');
    else val = String(v).toLowerCase();
    if (k === 'target' && String(v).includes('@')) out.push(['USER', String(v).split('@')[0].toLowerCase()]);
    out.push([type, val]);
  }
  if (slots.glob) out.push(['EXT', String(slots.glob).replace(/^\*\./, '').toLowerCase()]);
  if (slots.age == null && slots.days != null && slots.since) out.push(['TIME', +slots.days * 1440]);
  return out;
}
function f1(goldSets, predSets) {
  const per = {};
  let tp = 0; let fp = 0; let fn = 0;
  goldSets.forEach((g, i) => {
    const p = [...predSets[i]];
    for (const [t, v] of g) {
      per[t] ??= { tp: 0, fp: 0, fn: 0 };
      const j = p.findIndex(([pt, pv]) => pt === t && String(pv) === String(v));
      if (j >= 0) { tp++; per[t].tp++; p.splice(j, 1); } else { fn++; per[t].fn++; }
    }
    for (const [t] of p) { fp++; per[t] ??= { tp: 0, fp: 0, fn: 0 }; per[t].fp++; }
  });
  const F = (a) => { const pr = a.tp / (a.tp + a.fp || 1); const rc = a.tp / (a.tp + a.fn || 1); return pr + rc ? (2 * pr * rc) / (pr + rc) : 0; };
  return { f1: F({ tp, fp, fn }), p: tp / (tp + fp || 1), r: tp / (tp + fn || 1), per: Object.fromEntries(Object.entries(per).map(([k, a]) => [k, { ...a, f1: F(a) }])) };
}
const goldTyped = [];
const sys = { tagger: [], regex: [], merge: [] };
for (const r of gold) {
  const it = BY_ID[r.intent];
  // gold: annotated spans restricted to what the intent can use (others cannot be scored for any system)
  const gslots = resolveSlots(it, exFromSpans(r.text, r.spans.map(([type, text]) => {
    const start = r.text.indexOf(text);
    return { type, start, end: start + text.length, text };
  })));
  goldTyped.push(typedFromSlots(finalizeSlots(it, gslots)));
  for (const mode of ['tagger', 'regex', 'merge']) sys[mode].push(typedFromSlots(resolveWithTagger(r.intent, r.text, { model, mode }).slots));
}
const F = Object.fromEntries(Object.entries(sys).map(([k, v]) => [k, f1(goldTyped, v)]));
const goldLang = (lang) => gold.map((r, i) => (r.lang === lang ? i : -1)).filter((i) => i >= 0);
const fLang = (mode, lang) => { const ix = goldLang(lang); return f1(ix.map((i) => goldTyped[i]), ix.map((i) => sys[mode][i])).f1; };
md('## 3. Slot filling (stage 3)');
md();
md(`\`data/slots/gold.jsonl\`: ${gold.length} hand-annotated requests (${goldLang('en').length} EN / ${goldLang('pl').length} PL), gold intent given. ` +
  'Spans are mapped onto the slots the intent uses and compared as normalised typed values (paths after location mapping, sizes in find units, durations in minutes, …).');
md();
md('| slot method | precision | recall | F1 | F1 EN | F1 PL |');
md('|---|---|---|---|---|---|');
for (const [k, v] of Object.entries(F)) md(`| ${k === 'merge' ? '**tagger + regex fallback (shipped)**' : k === 'tagger' ? 'BIO tagger only' : 'regex only (v0.1)'} | ${(v.p * 100).toFixed(1)}% | ${(v.r * 100).toFixed(1)}% | ${(v.f1 * 100).toFixed(1)}% | ${(fLang(k, 'en') * 100).toFixed(1)}% | ${(fLang(k, 'pl') * 100).toFixed(1)}% |`);
md();
md('Per type F1 (tagger only / regex only / merged): ' + TAG_TYPES.filter((t) => F.merge.per[t]).map((t) =>
  `${t} ${(F.tagger.per[t]?.f1 * 100 || 0).toFixed(0)}/${(F.regex.per[t]?.f1 * 100 || 0).toFixed(0)}/${(F.merge.per[t].f1 * 100).toFixed(0)}`).join(', ') + '.');
md();

// ------------------------------------------------------------------------------------------
// 4. end-to-end exact command
const slotCase = { merge: 0, tagger: 0, regex: 0 };
const slotFails = [];
for (const [intent, q, expected] of SLOT_CASES) {
  for (const mode of Object.keys(slotCase)) {
    const got = buildCommand(intent, q, { env: BASH, resolved: resolveWithTagger(intent, q, { model, mode }).slots }).command;
    if (got === expected) slotCase[mode]++; else if (mode === 'merge') slotFails.push({ intent, q, expected, got });
  }
}
// relexicalised held-out eval: values from the held-out pools, gold command rendered from the inserted spans
const rng = mulberry32(7);
const e2e = { all: { n: 0, ok: 0, okGoldIntent: 0 }, en: { n: 0, ok: 0, okGoldIntent: 0 }, pl: { n: 0, ok: 0, okGoldIntent: 0 } };
const e2eFails = [];
for (const r of evalRows) {
  const { spans } = silverSpans(r.text, r.intent);
  if (!spans.length) continue;
  const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'eval', keepProb: 0 });
  const it = BY_ID[r.intent];
  const goldSlots = finalizeSlots(it, resolveSlots(it, exFromSpans(rx.text, rx.spans.map((s) => ({ ...s, text: rx.text.slice(s.start, s.end) })))));
  // regex-only values the silver labeler did not mark (e.g. defaults) are not part of the gold
  const goldCmd = buildCommand(r.intent, rx.text, { env: BASH, resolved: goldSlots }).command;
  const s = suggest(rx.text, { env: BASH, model, compose: 'off' });
  const okGi = buildCommand(r.intent, rx.text, { env: BASH, resolved: resolveWithTagger(r.intent, rx.text, { model }).slots }).command === goldCmd;
  for (const k of ['all', r.lang]) {
    e2e[k].n++;
    if (s.understood && s.command === goldCmd) e2e[k].ok++;
    if (okGi) e2e[k].okGoldIntent++;
  }
  if (!(s.understood && s.command === goldCmd) && e2eFails.length < 400) e2eFails.push({ text: rx.text, gold: goldCmd, got: s.command, intent: r.intent, pred: s.intent });
}
md('## 4. End-to-end exact command (bash, linux)');
md();
md(`* \`test/slot-cases.js\` (${SLOT_CASES.length} hand-written request → command pairs, gold intent): ` +
  `**${slotCase.merge}/${SLOT_CASES.length}** shipped (tagger + regex fallback), ${slotCase.tagger}/${SLOT_CASES.length} tagger only, ${slotCase.regex}/${SLOT_CASES.length} regex only.`);
md(`* Relexicalised \`data/eval\` (${e2e.all.n} requests that contain slot values; every value replaced from a *held-out* value pool never used in training; ` +
  'gold command rendered from the inserted spans; full pipeline incl. classification):');
md();
md('| split | n | exact command (full pipeline) | exact command given gold intent |');
md('|---|---|---|---|');
for (const k of ['all', 'en', 'pl']) md(`| ${k.toUpperCase()} | ${e2e[k].n} | ${pct(e2e[k].ok, e2e[k].n)} | ${pct(e2e[k].okGoldIntent, e2e[k].n)} |`);
md();

// ------------------------------------------------------------------------------------------
// 5. history
const hist = readJsonl(join(ROOT, 'data', 'history', 'eval.jsonl'));
const H = { all: { n: 0, intent: 0, cmd: 0, noHist: 0 }, en: { n: 0, intent: 0, cmd: 0, noHist: 0 }, pl: { n: 0, intent: 0, cmd: 0, noHist: 0 } };
const histFails = [];
for (const r of hist) {
  const s = suggest(r.query, { env: BASH, model, history: r.history, compose: 'off' });
  const s0 = suggest(r.query, { env: BASH, model, compose: 'off' });
  for (const k of ['all', r.lang]) {
    H[k].n++;
    if (s.intent === r.expect_intent) H[k].intent++;
    if (s.command === r.expect_command) H[k].cmd++;
    if (s0.command === r.expect_command) H[k].noHist++;
  }
  if (s.command !== r.expect_command) histFails.push({ q: r.query, h: r.history.slice(-2), exp: r.expect_command, got: s.command, rule: s.context?.rule });
}
md('## 5. History references (`data/history/eval.jsonl`)');
md();
md('"delete it" / "usuń to", "same for /var" / "to samo dla /var", "logs of that container" / "logi tego kontenera", "kill it", … with the last shell-history lines given (raw commands and earlier `tellsh` queries).');
md();
md('| split | n | intent | exact command | exact command without history |');
md('|---|---|---|---|---|');
for (const k of ['all', 'en', 'pl']) md(`| ${k.toUpperCase()} | ${H[k].n} | ${pct(H[k].intent, H[k].n)} | ${pct(H[k].cmd, H[k].n)} | ${pct(H[k].noHist, H[k].n)} |`);
md();
md('*Development note:* this set was written independently of the rules, but it was then used while developing them: the first ' +
  '(blind) run scored **60.4%** exact; the failures led to general fixes (more Polish pronoun forms, `ps -p`/`wget` entities, ' +
  'blame/extract verbs, "same but …", implicit required-slot fill). The number above is therefore not a blind score.');
md();
md('*Review fixes:* history lines are now split with a shell-aware tokenizer (`a\\ b.txt`, quoted `;`/`|`, PowerShell `\'\'`/backtick escapes, ' +
  'native cmdlets such as `Get-Content -LiteralPath`), and a reference whose latest value depends on the shell state (`$F`, `*.txt`, ' +
  'unparseable or unknown-command lines) is refused (placeholder) instead of falling back to an older value. Two gold commands ' +
  '(`kill_by_port`) were updated for the `-sTCP:LISTEN` fix; no other row changed.');
md();

// ------------------------------------------------------------------------------------------
// 6. composer
const comp = readJsonl(join(ROOT, 'data', 'compose', 'eval.jsonl'));
const CP = { all: { n: 0, composed: 0, exact: 0, acc: 0, e2eAcc: 0 }, en: { n: 0, composed: 0, exact: 0, acc: 0, e2eAcc: 0 }, pl: { n: 0, composed: 0, exact: 0, acc: 0, e2eAcc: 0 } };
const compFails = [];
for (const r of comp) {
  const s = suggest(r.text, { env: BASH, model });
  const cands = [r.gold, ...(r.acceptable || [])];
  const isComposed = s.method === 'composed';
  const exact = isComposed && sameCmd(s.command, r.gold);
  const acc = isComposed && cands.some((c) => sameCmd(s.command, c));
  const e2eAcc = s.understood && cands.some((c) => sameCmd(s.command, c));
  for (const k of ['all', r.lang]) {
    CP[k].n++;
    if (isComposed) CP[k].composed++;
    if (exact) CP[k].exact++;
    if (acc) CP[k].acc++;
    if (e2eAcc) CP[k].e2eAcc++;
  }
  if (!e2eAcc) compFails.push({ q: r.text, gold: r.gold, got: s.understood ? s.command : '(not understood)', method: s.method });
}
let falseCompose = 0;
for (const r of evalRows) if (suggest(r.text, { env: BASH, model }).method === 'composed') falseCompose++;
md('## 6. Second pass: experimental composer (`data/compose/eval.jsonl`)');
md();
md(`${comp.length} out-of-catalogue requests (a tool with a flag combination that no catalog template has), written independently of the composer vocabulary. ` +
  'Commands are compared after shell unquoting with only behaviour-preserving normalisation: option bundling/order for ordinary ' +
  'commands (`ls -ltr` = `ls -l -t -r`, `head -n5` = `head -5`); argument boundaries, case (`-name` ≠ `-iname`), find\'s expression order, ' +
  'redirections and pipeline separators must match. *exact* = the gold command, *acceptable* = gold or a listed alternative. ' +
  '(Before the review the comparison lowercased find predicates and mapped `-iname` to `-name`; that credited one catalog answer: ' +
  '"any answer acceptable" was 33.3%, now 31.4%.)');
md();
md('| split | n | composer fired | composed exact | composed acceptable | any answer acceptable (catalog or composed) |');
md('|---|---|---|---|---|---|');
for (const k of ['all', 'en', 'pl']) md(`| ${k.toUpperCase()} | ${CP[k].n} | ${pct(CP[k].composed, CP[k].n)} | ${pct(CP[k].exact, CP[k].n)} | ${pct(CP[k].acc, CP[k].n)} | ${pct(CP[k].e2eAcc, CP[k].n)} |`);
md();
md('*Development note:* the flag vocabulary was written before looking at this set; the first (blind) run fired on 11.8% ' +
  'and was acceptable on **3.9%**. After inspecting the failures, general fixes were made (firing on unexplained modifiers, ' +
  'value flags, tar compression from the archive name, the data-driven explained-flag table) — the numbers above include them.');
md();
md(`False fires on in-catalogue requests (\`data/eval\`, composer replaced a catalog answer): **${pct(falseCompose, evalRows.length)}** (${falseCompose}/${evalRows.length}).`);
md();

// ------------------------------------------------------------------------------------------
// 7. OOD
const ood = readJsonl(join(ROOT, 'data', 'ood_eval.jsonl'));
const oodLang = { en: [0, 0], pl: [0, 0] };
let rejected = 0;
for (const r of ood) {
  const s = suggest(r.text, { env: BASH, model });
  const rej = !s.understood;
  if (rej) rejected++;
  oodLang[r.lang] ??= [0, 0];
  oodLang[r.lang][0]++;
  if (rej) oodLang[r.lang][1]++;
  else if (VERBOSE) console.log(`  OOD accepted: ${r.text} -> ${s.command}`);
}
md('## 7. Out-of-domain rejection (`data/ood_eval.jsonl`)');
md();
md(`**${pct(rejected, ood.length)}** (${rejected}/${ood.length}) answered "I don't understand" (EN ${pct(oodLang.en[1], oodLang.en[0])}, PL ${pct(oodLang.pl[1], oodLang.pl[0])}), including the composer path.`);

updateSection('eval', out.join('\n'));
const s = C1.S.all;
console.log(`stage1 tool top1=${pct(s.tool1, s.n)} top3=${pct(s.tool3, s.n)} | intent top1=${pct(s.top1, s.n)} (EN ${pct(C1.S.en.top1, C1.S.en.n)} PL ${pct(C1.S.pl.top1, C1.S.pl.n)}) answered=${pct(s.ans, s.n)} prec=${pct(s.ansOk, s.ans)}`);
console.log('per shell: ' + Object.entries(shellRes).map(([k, v]) => `${k} ${(v.acc * 100).toFixed(1)}% render ${v.rendered}/${v.n} syntax ${v.checked ? v.synOk + '/' + v.checked : 'n/a'}`).join(' | '));
console.log(`slot F1 merge=${(F.merge.f1 * 100).toFixed(1)} tagger=${(F.tagger.f1 * 100).toFixed(1)} regex=${(F.regex.f1 * 100).toFixed(1)} | slot-cases merge ${slotCase.merge}/${SLOT_CASES.length} tagger ${slotCase.tagger} regex ${slotCase.regex}`);
console.log(`e2e relex exact=${pct(e2e.all.ok, e2e.all.n)} (gold intent ${pct(e2e.all.okGoldIntent, e2e.all.n)}) | history cmd=${pct(H.all.cmd, H.all.n)} | compose fired=${pct(CP.all.composed, CP.all.n)} exact=${pct(CP.all.exact, CP.all.n)} acceptable=${pct(CP.all.acc, CP.all.n)} anyAcc=${pct(CP.all.e2eAcc, CP.all.n)} falseFire=${falseCompose} | OOD rejected=${pct(rejected, ood.length)}`);
if (VERBOSE) {
  for (const f of slotFails) console.log(`  slot-case ✗ ${f.intent}: ${f.q}\n      got ${f.got}\n      exp ${f.expected}`);
  for (const f of histFails) console.log(`  hist ✗ ${f.q} [${f.h.join(' ; ')}] rule=${f.rule}\n      got ${f.got}\n      exp ${f.exp}`);
  for (const f of compFails) console.log(`  comp ✗ (${f.method}) ${f.q}\n      got ${f.got}\n      exp ${f.gold}`);
  for (const f of e2eFails.slice(0, 60)) console.log(`  e2e ✗ [${f.intent}→${f.pred}] ${f.text}\n      got ${f.got}\n      exp ${f.gold}`);
}
console.log(`wrote EVAL.md (eval section) in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

exec
/bin/bash -lc 'cat src/history.js' in /workspace/tellsh
 succeeded in 0ms:
// Shell-history context for reference resolution ("delete it", "to samo dla /var", "logs of that container").
// Only the tail of the history file is read, kept in memory for this one request, and never logged
// or written anywhere.
import { openSync, readSync, fstatSync, closeSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { INTENTS, BY_ID } from './catalog.js';
import { FAMILY_OF } from './tools.js';
import { extractSlots, foldKeepLength } from './slots.js';
import { VARIANTS } from './variants.js';
import { splitCommand, wordsOf, decodeWord, AMB, isAmbiguous, isExpansion, isGlob, rawOf } from './shellwords.js';

export { isAmbiguous };

// ---------------------------------------------------------------------------------------------
// reading

export function historyCandidates(shell, env = process.env, os = process.platform) {
  const home = env.HOME || env.USERPROFILE || homedir();
  const ps = os === 'win32'
    ? join(env.APPDATA || join(home, 'AppData', 'Roaming'), 'Microsoft', 'Windows', 'PowerShell', 'PSReadLine', 'ConsoleHost_history.txt')
    : join(env.XDG_DATA_HOME || join(home, '.local', 'share'), 'powershell', 'PSReadLine', 'ConsoleHost_history.txt');
  const fish = join(env.XDG_DATA_HOME || join(home, '.local', 'share'), 'fish', 'fish_history');
  const byShell = {
    zsh: [['zsh', env.HISTFILE], ['zsh', join(home, '.zsh_history')], ['zsh', join(home, '.zhistory')]],
    bash: [['bash', env.HISTFILE], ['bash', join(home, '.bash_history')]],
    sh: [['bash', env.HISTFILE], ['bash', join(home, '.sh_history')], ['bash', join(home, '.ash_history')], ['bash', join(home, '.bash_history')]],
    fish: [['fish', fish]],
    powershell: [['pwsh', ps]],
    cmd: [],
  };
  const order = [...(byShell[shell] || []), ...byShell.bash, ...byShell.zsh];
  const seen = new Set();
  return order.filter(([, p]) => p && !seen.has(p) && seen.add(p));
}

function readTail(path, maxBytes = 32768) {
  const fd = openSync(path, 'r');
  try {
    const size = fstatSync(fd).size;
    const len = Math.min(size, maxBytes);
    const buf = Buffer.alloc(len);
    readSync(fd, buf, 0, len, size - len);
    return { buf, partial: size > len };
  } finally {
    closeSync(fd);
  }
}

// zsh "metafies" bytes >= 0x83: Meta (0x83) followed by byte ^ 0x20
function unmetafy(buf) {
  const out = [];
  for (let i = 0; i < buf.length; i++) {
    if (buf[i] === 0x83 && i + 1 < buf.length) { out.push(buf[++i] ^ 0x20); } else out.push(buf[i]);
  }
  return Buffer.from(out);
}

/** Parse raw history text into commands (oldest first). kind: bash | zsh | fish | pwsh */
export function parseHistory(text, kind = 'bash', { partial = false } = {}) {
  let lines = text.split(/\r?\n/);
  if (partial) lines = lines.slice(1); // first line may be cut in the middle
  const cmds = [];
  if (kind === 'fish') {
    for (const l of lines) {
      const m = l.match(/^- cmd: (.*)$/);
      if (m) cmds.push(m[1].replace(/\\n/g, '\n').replace(/\\\\/g, '\\'));
    }
    return cmds;
  }
  let cur = null;
  for (let l of lines) {
    if (kind === 'bash' && /^#\d{9,}$/.test(l)) continue; // HISTTIMEFORMAT timestamps
    if (kind === 'zsh' && cur === null) l = l.replace(/^: \d+:\d+;/, ''); // extended history
    const cont = kind === 'pwsh' ? /`$/.test(l) : /\\$/.test(l);
    const body = cont ? l.slice(0, -1) : l;
    cur = cur === null ? body : cur + '\n' + body;
    if (!cont) {
      if (cur.trim()) cmds.push(cur.trim());
      cur = null;
    }
  }
  return cmds;
}

/** Last `n` commands from the user's history file (or from `file`). Returns [] when unavailable. */
export function loadHistory({ shell = 'bash', file, n = 10, env = process.env, os = process.platform } = {}) {
  const cands = file ? [[/zsh/.test(file) ? 'zsh' : /fish/.test(file) ? 'fish' : /PSReadLine/i.test(file) ? 'pwsh' : 'bash', file]]
    : historyCandidates(shell, env, os);
  for (const [kind, path] of cands) {
    try {
      if (!existsSync(path)) continue;
      const { buf, partial } = readTail(path);
      const text = (kind === 'zsh' ? unmetafy(buf) : buf).toString('utf8');
      const cmds = parseHistory(text, kind, { partial });
      if (cmds.length) return Object.assign(cmds.slice(-n), { kind: kind === 'pwsh' ? 'pwsh' : 'posix' });
    } catch { /* unreadable: no context */ }
  }
  return [];
}

// ---------------------------------------------------------------------------------------------
// entities from commands
//
// Values are decoded with a shell-aware tokenizer (src/shellwords.js): quotes, escapes (a\ b.txt),
// separators inside quotes, PowerShell '' / ` escapes. A value that depends on shell state ($VAR,
// $(..), unquoted globs) or a line that cannot be interpreted becomes an *ambiguous* entity: it
// still shadows older values of the same type, and a reference to it is refused instead of being
// resolved to a stale or guessed target.

const PS_CMDLET = /^[A-Za-z]+-[A-Za-z]+$/;
const lineKind = (line, kind) => (kind === 'pwsh' || PS_CMDLET.test(String(line).trim().split(/\s/)[0]) ? 'pwsh' : 'posix');
const PATHLIKE = /(?:^|\s)['"]?[~.\w-]*[\\/][\w.-]|\.\w{1,5}(?:['"]?\s|['"]?$)/;
const GLOB_SLOTS = new Set(['namepat', 'glob', 'pattern', 'sedexpr', 'old', 'new', 'text', 'message']);

// template inversion: catalog/variant template -> regex that recovers intent + slot values from a command
const BT = '`';
const WORD_RE = {
  posix: String.raw`((?:'[^']*'|"(?:\\.|[^"\\])*"|\\.|[^\s'"\;&|<>()])+)`,
  pwsh: `((?:['‘-‛](?:[^'‘-‛]|['‘-‛]{2})*['‘-‛]|["“-„](?:${BT}.|["“-„]{2}|[^"“-„${BT}])*["“-„]|${BT}.|[^\\s'"‘-„${BT};|(){}<>])+)`,
};
let INV = null;
function inverters() {
  if (INV) return INV;
  INV = [];
  const add = (id, tpl) => {
    if (typeof tpl !== 'string') return;
    const names = [];
    const raws = [];
    const src = { posix: '', pwsh: '' };
    for (const part of tpl.split(/(«[^»]*»)/)) {
      const opt = part.startsWith('«');
      const body = opt ? part.slice(1, -1) : part;
      const rx = { posix: '', pwsh: '' };
      for (const piece of body.split(/(\{\w+(?:!raw)?\})/)) {
        const m = piece.match(/^\{(\w+)(!raw)?\}$/);
        for (const k of ['posix', 'pwsh']) {
          if (m) rx[k] += !m[2] ? WORD_RE[k] : m[1] === 'age' ? '(-m(?:min|time) -\\d+)' : '([\\w.+=-]+)';
          else rx[k] += piece.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }
        if (m) { names.push(m[1]); raws.push(!!m[2]); }
      }
      for (const k of ['posix', 'pwsh']) src[k] += opt ? `(?: ${rx[k]})?` : rx[k];
    }
    try { INV.push({ id, re: { posix: new RegExp(`^${src.posix}$`), pwsh: new RegExp(`^${src.pwsh}$`) }, names, raws }); } catch { /* skip */ }
  };
  for (const it of INTENTS) {
    add(it.id, it.template);
    add(it.id, it.darwin);
    const v = VARIANTS[it.id] || {};
    for (const k of ['bsd', 'gnuMac', 'busybox', 'zsh', 'fish']) add(it.id, v[k]);
    if (v.pwsh) for (const t of typeof v.pwsh === 'object' ? [v.pwsh.win, v.pwsh.unix] : [v.pwsh]) add(it.id, t);
  }
  return INV;
}

function invert(cmd, kind = 'posix') {
  for (const { id, re, names, raws } of inverters()) {
    const m = cmd.match(re[kind]);
    if (!m) continue;
    const slots = {};
    let ambiguous = false;
    names.forEach((n, i) => {
      const rv = m[i + 1];
      if (rv == null) return;
      if (raws[i]) { slots[n] = rv; return; }
      const v = decodeWord(rv, kind);
      if (v == null || isExpansion(v) || (isGlob(v) && !GLOB_SLOTS.has(n))) { ambiguous = true; slots[n] = AMB + rv; return; }
      slots[n] = rawOf(v);
    });
    if (slots.namepat && !slots.name && !isAmbiguous(slots.namepat)) slots.name = slots.namepat.replace(/^\*|\*$/g, '');
    return { intent: id, slots, ambiguous };
  }
  return null;
}

const FILE_HEADS = new Set(['cat', 'less', 'more', 'head', 'tail', 'vim', 'vi', 'nvim', 'nano', 'code', 'stat', 'file', 'wc',
  'sha256sum', 'md5sum', 'shasum', 'md5', 'touch', 'open', 'bat', 'chmod', 'chown', 'source', 'python', 'python3', 'node', 'bash', 'sh', 'unzip', 'gzip', 'gunzip', 'xdg-open']);
const DIR_HEADS = new Set(['cd', 'ls', 'du', 'find', 'tree', 'mkdir', 'rmdir', 'pushd', 'ncdu']);
// heads whose arguments are never file references (no stale-reference invalidation for them)
const INERT_HEADS = new Set(['echo', 'printf', 'man', 'which', 'whereis', 'type', 'history', 'clear', 'exit', 'export', 'alias', 'unalias',
  'npm', 'npx', 'yarn', 'pnpm', 'make', 'cargo', 'go', 'pip', 'pip3', 'apt', 'apt-get', 'brew', 'tellsh', 'true', 'false', 'date', 'sleep',
  'write-host', 'write-output', 'get-help', 'get-command', 'set-psreadlineoption', 'clear-host', 'cls']);
const DOCKER_CT = new Set(['logs', 'exec', 'stop', 'start', 'restart', 'rm', 'inspect', 'attach', 'kill', 'top', 'port', 'pause', 'unpause']);
const DOCKER_VAL_FLAGS = new Set(['--tail', '-n', '--since', '--until', '-e', '--env', '-u', '--user', '-w', '--workdir', '-t', '--time', '-s', '--signal']);
const DOCKER_INTENT = { logs: 'docker_logs', stop: 'docker_stop', exec: 'docker_exec' };
const SYSTEMCTL_INTENT = { status: 'service_status', restart: 'service_restart', stop: 'service_stop', start: 'service_start', enable: 'service_enable' };

// PowerShell cmdlets and their aliases -> what their target argument is
const PS_NATIVE = {
  'get-content': 'file', gc: 'file', type: 'file', 'get-filehash': 'file', 'select-string': 'file', 'expand-archive': 'file', 'set-content': 'file', 'add-content': 'file', 'out-file': 'file',
  'get-item': 'path', gi: 'path', 'get-itemproperty': 'path', 'invoke-item': 'path', ii: 'path', 'rename-item': 'path', rni: 'path', 'test-path': 'path',
  'remove-item': 'remove', ri: 'remove', del: 'remove', erase: 'remove', rd: 'remove',
  'set-location': 'dir', sl: 'dir', chdir: 'dir', 'push-location': 'dir', 'get-childitem': 'dir', gci: 'dir', dir: 'dir',
  'copy-item': 'copy', cpi: 'copy', copy: 'copy', 'move-item': 'copy', mi: 'copy', move: 'copy', 'new-item': 'new', ni: 'new',
  'stop-process': 'proc', spps: 'proc', 'get-process': 'proc', gps: 'proc',
  'stop-service': 'service', 'start-service': 'service', 'restart-service': 'service', 'get-service': 'service', gsv: 'service', 'set-service': 'service',
  'test-connection': 'host', 'test-netconnection': 'host', 'resolve-dnsname': 'host',
  'invoke-webrequest': 'url', iwr: 'url', 'invoke-restmethod': 'url', irm: 'url',
};
const PS_SERVICE_INTENT = { 'stop-service': 'service_stop', 'start-service': 'service_start', 'restart-service': 'service_restart', 'get-service': 'service_status' };
const PS_VALUE_PARAMS = new Set(['path', 'literalpath', 'lp', 'pspath', 'name', 'id', 'processname', 'computername', 'targetname', 'uri', 'destination',
  'destinationpath', 'totalcount', 'tail', 'head', 'first', 'last', 'encoding', 'filter', 'include', 'exclude', 'itemtype', 'type', 'algorithm', 'value',
  'newname', 'pattern', 'count', 'depth', 'outfile', 'method', 'erroraction', 'ea', 'port', 'delimiter', 'readcount', 'stream', 'credential', 'displayname']);

function psArgs(args) {
  const named = {};
  const pos = [];
  const sw = new Set();
  for (let i = 0; i < args.length; i++) {
    const m = String(args[i]).match(/^-([A-Za-z]\w*)(?::(.+))?$/);
    if (!m) { pos.push(args[i]); continue; }
    const p = m[1].toLowerCase();
    if (m[2] != null) named[p] = m[2];
    else if (PS_VALUE_PARAMS.has(p) && args[i + 1] != null) named[p] = args[++i];
    else sw.add(p);
  }
  return { named, pos, sw };
}

const typeByExt = (p) => (/\.\w{1,5}$/.test(rawOf(p)) ? 'file' : 'dir');

/** PowerShell native commands. Returns true when the head was recognised. */
function psNative(head, args, ents, setIntent) {
  const kind = PS_NATIVE[head];
  if (!kind) return false;
  const { named, pos, sw } = psArgs(args);
  const path = named.literalpath ?? named.lp ?? named.path ?? named.pspath ?? pos[0];
  if (kind === 'file' && path != null) ents.file ??= path;
  else if (kind === 'path' && path != null) ents[typeByExt(path)] ??= path;
  else if (kind === 'dir' && path != null) ents.dir ??= path;
  else if (kind === 'remove' && path != null) ents[[...sw].some((s) => 'recurse'.startsWith(s)) ? 'dir' : typeByExt(path)] ??= path;
  else if (kind === 'copy') { const d = named.destination ?? pos[1]; if (d != null) ents[typeByExt(d)] ??= d; }
  else if (kind === 'new' && path != null) ents[/^dir/i.test(named.itemtype ?? named.type ?? '') ? 'dir' : 'file'] ??= path;
  else if (kind === 'proc') {
    const id = named.id ?? (pos[0] != null && /^\d+$/.test(pos[0]) ? pos[0] : null);
    const nm = named.name ?? named.processname ?? (id == null ? pos[0] : null);
    if (id != null) ents.pid ??= String(id).split(',')[0];
    if (nm != null) ents.proc ??= nm;
  } else if (kind === 'service') {
    const s = named.name ?? named.displayname ?? pos[0];
    if (s != null) { ents.service ??= s; if (PS_SERVICE_INTENT[head]) setIntent(PS_SERVICE_INTENT[head], { service: s }); }
  } else if (kind === 'host') { const h = named.computername ?? named.targetname ?? pos[0]; if (h != null) ents.host ??= h; }
  else if (kind === 'url') {
    const u = named.uri ?? pos[0];
    if (u != null) ents.url ??= u;
    if (named.outfile != null) ents.file ??= named.outfile;
  }
  return true;
}

function entsFromSlots(intent, slots, ents) {
  const fam = FAMILY_OF[intent];
  const put = (k, v) => { if (v != null && v !== '' && !/^<\w+>$/.test(String(v))) ents[k] ??= String(v); };
  if (slots.container) put('container', slots.container);
  if (slots.service) put('service', slots.service);
  if (slots.name && fam !== 'find') put('proc', slots.name);
  if (/^\d+$/.test(String(slots.pid ?? ''))) put('pid', slots.pid);
  if (slots.port) put('port', slots.port);
  if (slots.branch) put('branch', slots.branch);
  if (slots.host) put('host', slots.host);
  if (slots.target) put('host', slots.target);
  if (slots.url) put('url', slots.url);
  if (slots.file) put('file', slots.file);
  if (slots.archive) put('file', slots.archive);
  if (slots.dst) put(/\.\w+$/.test(slots.dst) ? 'file' : 'dir', slots.dst);
  if (slots.path && slots.path !== '.') put(['delete_dir', 'mkdir', 'dir_size', 'largest_dirs', 'list_files'].includes(intent) || fam === 'find' ? 'dir' : /\.\w{1,5}$/.test(slots.path) ? 'file' : 'dir', slots.path);
}

/**
 * Analyse one history line. `classify(query)` handles previous `tellsh <query>` lines.
 * kind: 'posix' | 'pwsh' (PowerShell history; Verb-Noun lines are always read as PowerShell).
 */
export function analyzeCommand(line, classify, kind = 'posix') {
  const ents = {};
  let intent = null;
  let slots = {};
  let ambiguous = false;
  const t = line.trim();
  const k = lineKind(t, kind);
  const tm = t.match(/^(?:npx\s+(?:-y\s+)?)?tellsh\s+(.*)$/s);
  if (tm) {
    const w = wordsOf(tm[1], k);
    const q = w ? w.filter((x) => !/^-/.test(x)).map(rawOf).join(' ') : '';
    const r = q && classify ? classify(q) : null;
    if (r?.intent) { intent = r.intent; slots = r.slots || {}; entsFromSlots(intent, slots, ents); }
    return { line: t, intent, slots, ents, fromTellsh: true, ambiguous };
  }
  const split = splitCommand(t, k);
  if (!split.ok) {
    // cannot interpret the line (unterminated quote, heredoc, ...): it may name any file or directory,
    // so older file/dir values must not be picked up by "it"
    ents.file = AMB + t;
    ents.dir = AMB + t;
    return { line: t, intent, slots, ents, opaque: true, ambiguous: true };
  }
  const inv = invert(t, k);
  if (inv) { intent = inv.intent; slots = inv.slots; ambiguous = inv.ambiguous; entsFromSlots(intent, slots, ents); }
  const setIntent = (id, s) => { if (!intent) { intent = id; slots = s; } };
  for (const { words } of split.segments) {
    let w = words;
    while (w.length && (w[0] === 'sudo' || /^\w+=/.test(w[0]))) w = w.slice(1);
    if (!w.length) continue;
    if (isAmbiguous(w[0])) {
      if (w.slice(1).some((a) => PATHLIKE.test(rawOf(a)))) { ents.file ??= AMB + t; ents.dir ??= AMB + t; }
      continue;
    }
    const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '');
    const args = w.slice(1);
    const nonFlags = args.filter((a) => !/^-/.test(a));
    if ((k === 'pwsh' || PS_CMDLET.test(head)) && psNative(head.toLowerCase(), args, ents, setIntent)) continue;
    if (head === 'docker') {
      const sub = nonFlags[0];
      if (sub === 'run') {
        const i = args.indexOf('--name');
        if (i >= 0 && args[i + 1]) ents.container ??= args[i + 1];
        const nm = args.find((a) => a.startsWith('--name='));
        if (nm) ents.container ??= nm.slice(7);
      } else if (DOCKER_CT.has(sub)) {
        const rest = args.slice(args.indexOf(sub) + 1);
        for (let i = 0; i < rest.length; i++) {
          if (DOCKER_VAL_FLAGS.has(rest[i])) { i++; continue; }
          if (/^-/.test(rest[i])) continue;
          ents.container ??= rest[i];
          break;
        }
        intent ??= DOCKER_INTENT[sub] || null;
        if (intent) slots = { container: ents.container, ...slots };
      }
    } else if (head === 'systemctl' || head === 'service') {
      const svc = head === 'systemctl' ? nonFlags[1] : nonFlags[0];
      const verb = head === 'systemctl' ? nonFlags[0] : nonFlags[1];
      if (svc) ents.service ??= svc.replace(/\.service$/, '');
      if (!intent && SYSTEMCTL_INTENT[verb] && svc) { intent = SYSTEMCTL_INTENT[verb]; slots = { service: ents.service }; }
    } else if (head === 'journalctl') {
      const i = args.findIndex((a) => a === '-u' || a === '--unit');
      if (i >= 0 && args[i + 1]) { ents.service ??= args[i + 1].replace(/\.service$/, ''); intent ??= 'journal_service'; }
    } else if (head === 'kill') {
      const pid = nonFlags.find((a) => /^\d+$/.test(a));
      if (pid) { ents.pid ??= pid; if (!intent) { intent = 'kill_by_pid'; slots = { pid }; } }
    } else if (['pkill', 'killall', 'pgrep', 'pidof'].includes(head)) {
      if (nonFlags[0]) ents.proc ??= nonFlags[nonFlags.length - 1];
      if (!intent && head === 'pgrep') { intent = 'find_process'; slots = { name: ents.proc }; }
    } else if ((head === 'ps' || head === 'top' || head === 'htop') && args.some((a) => /^-\w*p$/.test(a))) {
      const i = args.findIndex((a) => /^-\w*p$/.test(a));
      const pid = (args[i + 1] || '').split(',')[0];
      if (/^\d+$/.test(pid)) ents.pid ??= pid;
    } else if (head === 'grep' && split.segments.some((s) => s.words[0] === 'ps')) {
      if (nonFlags[0]) ents.proc ??= nonFlags[0];
    } else if ((head === 'grep' || head === 'rg') && nonFlags[0]) {
      const path = nonFlags[1];
      if (!intent) {
        intent = args.some((a) => /^-\w*l/.test(a)) ? 'grep_files_containing' : 'grep_text';
        slots = { pattern: rawOf(nonFlags[0]), ...(path ? { path } : {}) };
      }
      if (path) ents[typeByExt(path)] ??= path;
    } else if (head === 'lsof' || head === 'ss' || head === 'netstat' || head === 'fuser') {
      const pm = args.map(rawOf).join(' ').match(/(?::|tcp:|udp:|sport = :)(\d{2,5})\b/);
      if (pm) { ents.port ??= pm[1]; if (!intent) { intent = 'process_on_port'; slots = { port: pm[1] }; } }
    } else if (head === 'git') {
      const sub = nonFlags[0];
      if (['checkout', 'switch', 'merge', 'rebase'].includes(sub) || (sub === 'branch' && nonFlags[1])) {
        const b = nonFlags[nonFlags.length - 1];
        const creates = args.some((a) => ['-b', '-B', '-c', '-C'].includes(a));
        if (b && b !== sub && b !== '.' && !isGlob(b) && !b.startsWith('-')) {
          ents.branch ??= b;
          if ((sub === 'checkout' || sub === 'switch')) ents.current ??= b;
          if (creates) ents.created ??= b;
        }
      } else if (sub === 'push' && nonFlags.length >= 2) ents.branch ??= nonFlags[nonFlags.length - 1];
      else if (sub === 'clone' && nonFlags[1]) ents.url ??= nonFlags[1];
      else if (['add', 'diff', 'blame', 'restore', 'rm', 'log'].includes(sub) && nonFlags[1] && nonFlags[1] !== '.') ents.file ??= nonFlags[nonFlags.length - 1];
    } else if (['ssh', 'ping', 'dig', 'nslookup', 'traceroute', 'mtr', 'host', 'telnet', 'nc'].includes(head)) {
      const h = nonFlags.find((a) => /[\w-]+\.[\w.-]+|^[\w-]+@/.test(a)) || nonFlags[0];
      if (h) ents.host ??= h;
    } else if (['curl', 'wget', 'http'].includes(head)) {
      const u = args.find((a) => /^https?:\/\//.test(a));
      if (u) {
        ents.url ??= u;
        const base = u.replace(/[?#].*$/, '').split('/').pop();
        const saves = head === 'wget' || args.some((a) => /^-\w*O/.test(a));
        if (saves && /\.\w{1,5}$/.test(base)) ents.file ??= base;
      }
    } else if (head === 'rm' || head === 'trash' || head === 'rmdir') {
      const p = nonFlags[nonFlags.length - 1];
      if (p) ents[args.some((a) => /^-\w*r/i.test(a)) || head === 'rmdir' ? 'dir' : 'file'] ??= p;
    } else if (head === 'cp' || head === 'mv' || head === 'ln') {
      const p = nonFlags[nonFlags.length - 1];
      if (p) ents[typeByExt(p)] ??= p;
    } else if (head === 'tar' || head === 'zip') {
      const a = nonFlags.find((x) => /\.(tar(\.\w+)?|tgz|zip)$/.test(x));
      if (a) ents.file ??= a;
    } else if (FILE_HEADS.has(head)) {
      const p = nonFlags.filter((a) => !/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(a)).pop();
      if (p) ents[/\/$/.test(p) ? 'dir' : 'file'] ??= p;
    } else if (DIR_HEADS.has(head)) {
      const p = head === 'find' ? nonFlags[0] : nonFlags.find((a) => !isGlob(a));
      if (p) ents.dir ??= p;
    } else if (!INERT_HEADS.has(head.toLowerCase())) {
      // unknown command (or unknown cmdlet) naming a path: we cannot tell what it did with it, so an
      // older file/dir must not be picked up by "it"
      const p = nonFlags.find((a) => PATHLIKE.test(rawOf(a)) && !/^\w+:\/\//.test(rawOf(a)));
      if (p) ents[typeByExt(p)] ??= AMB + rawOf(p);
    }
  }
  if (Object.values(slots).some(isAmbiguous)) ambiguous = true;
  return { line: t, intent, slots, ents, ambiguous };
}

const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];

/**
 * Build the context object from history commands (oldest first).
 * kind: 'posix' | 'pwsh' (default: `cmds.kind` as set by loadHistory, else posix)
 * -> { n, ents: {type: value}, entOrder: [types by recency], last: {intent, slots, ambiguous}, features: [...] }
 *    values that could not be read unambiguously are kept as AMB-prefixed strings (see isAmbiguous)
 */
export function buildContext(cmds, { classify, cwd, kind } = {}) {
  const k = kind || cmds.kind || 'posix';
  const ents = {};
  const all = {};
  const recency = {};
  let last = null;
  let current = null;
  const recent = [...cmds].reverse();
  recent.forEach((line, i) => {
    const a = analyzeCommand(line, classify, k);
    if (!last && a.intent) last = { intent: a.intent, slots: a.slots, age: i, ambiguous: !!a.ambiguous };
    if (current == null && a.ents.current && !isAmbiguous(a.ents.current)) current = a.ents.current;
    for (const t of ENT_TYPES) {
      if (a.ents[t] == null) continue;
      if (ents[t] == null) { ents[t] = a.ents[t]; recency[t] = i; }
      (all[t] ??= []).includes(String(a.ents[t])) || all[t].push(String(a.ents[t]));
    }
  });
  const entOrder = Object.keys(ents).sort((a, b) => recency[a] - recency[b] || ENT_TYPES.indexOf(a) - ENT_TYPES.indexOf(b));
  const ctx = { n: cmds.length, ents, all, currentBranch: current, entOrder, last, cwdFlags: cwdFlags(cwd) };
  ctx.features = ctxFeatures(ctx);
  return ctx;
}

export function cwdFlags(cwd) {
  if (!cwd) return [];
  const f = [];
  try {
    if (existsSync(join(cwd, '.git'))) f.push('git');
    if (['docker-compose.yml', 'docker-compose.yaml', 'compose.yml', 'compose.yaml'].some((n) => existsSync(join(cwd, n)))) f.push('compose');
  } catch { /* ignore */ }
  return f;
}

/** ctx_ tokens fed to the classifiers (same function is used by scripts/gen_data.js). */
export function ctxFeatures(ctx) {
  const f = [];
  if (ctx.entOrder?.[0]) f.push('ctx_last=' + ctx.entOrder[0]);
  for (const k of ctx.entOrder || []) f.push('ctx_has=' + k);
  if (ctx.last?.intent) f.push('ctx_tool=' + FAMILY_OF[ctx.last.intent]);
  for (const c of ctx.cwdFlags || []) f.push('ctx_cwd=' + c);
  return f;
}

// ---------------------------------------------------------------------------------------------
// deterministic coreference rules

const SAME_RES = [
  /^\s*(?:and\s+|now\s+)?(?:do\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?(?:\s+but)?\s+(?:for|in|on|with|to|at)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:now|again|and)\s+(?:for|in|on|with)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:what|how)\s+about\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:repeat|do it again|run it again)\s+(?:for|in|on|with)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:a\s+|i\s+)?(?:teraz\s+)?(?:to\s+)?samo\s+(?:dla|w|we|na|z|do|ale\s+dla|ale\s+w)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:a|i)\s+(?:teraz\s+)?(?:dla|w|we|na)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:tak samo|analogicznie|powt[oó]rz)\s+(?:dla|w|we|na)\s+(.+?)\s*[?!.]*$/i,
  /^\s*(?:a\s+)?co\s+z\s+(.+?)\s*[?!.]*$/i,
];

// all rule regexes run on the diacritic-folded, lowercased query (same length as the original)
const fold = (q) => foldKeepLength(String(q)).toLowerCase();
const PRONOUN_EN = /\b(it|its|that|this|them|those|these|the same one)\b/;
const PRONOUN_PL = /(?:^|\s)(tego|ten|te|ta|tej|tym|go|je|ja|jego|jej|niego|nia|nim|niej|mu|im|tamten|tamtego|tamta|tamtej|tamto|tamtym)(?=\s|$|[?!.,])|(?:^|\s)to(?=\s*[?!.]*$|\s+(?:co|ktor\w*|tam))/;

const NOUN_TYPE = [
  [/\b(containers?|kontener\w*)\b/i, ['container']],
  [/\b(services?|unit|uslug\w*|serwis\w*|daemon|demon\w*)\b/i, ['service']],
  [/\b(process(es)?|proces\w*|program\w*|app)\b/i, ['pid', 'proc']],
  [/\b(pid)\b/i, ['pid']],
  [/\b(ports?|port\w*)\b/i, ['port']],
  [/\b(branch\w*|gal\w*|gal[eę]\w*|branch)\b/i, ['branch']],
  [/\b(dir(ectory)?|folder\w*|katalog\w*)\b/i, ['dir']],
  [/\b(files?|plik\w*)\b/i, ['file']],
  [/\b(hosts?|server\w*|serwer\w*|machine|maszyn\w*)\b/i, ['host']],
  [/\b(url|link\w*|adres\w*)\b/i, ['url']],
];

// verb class -> entity type -> intent
const FORCE = /\b(force\w*|forcibly|-9|sigkill|na sile|sila|silowo|brutaln\w*)\b/;
const VERBS = [
  ['blame', /\b(who (changed|modified|edited|wrote)|blame|kto (zmienial|modyfikowal|edytowal|pisal|zmienil))\b/i, { file: 'git_blame' }],
  ['extract', /\b(extract|unpack|unzip|untar|decompress|rozpakuj\w*|wypakuj\w*)\b/i, { file: 'extract_targz' }],
  ['kill', /\b(kill|zabij\w*|ubij\w*|terminate|zako[nń]cz\w*|ubi[cć])\b/i,
    { pid: 'kill_by_pid', proc: 'kill_by_name', port: 'kill_by_port', container: 'docker_stop' }],
  ['logs', /\b(logs?|log[iaó]\w*|journal)\b/i, { container: 'docker_logs', service: 'journal_service' }],
  ['restart', /\b(restart\w*|zrestartuj\w*|zrestartowa\w*|uruchom\w* ponownie|reload|prze[lł]aduj)\b/i, { service: 'service_restart' }],
  ['stop', /\b(stop|zatrzymaj\w*|wy[lł][aą]cz\w*|shut down)\b/i,
    { container: 'docker_stop', service: 'service_stop', pid: 'kill_by_pid', proc: 'kill_by_name' }],
  ['start', /\b(start|uruchom\w*|wystartuj\w*|w[lł][aą]cz\w*)\b/i, { service: 'service_start' }],
  ['delete', /\b(delete|remove|rm|erase|usu[nń]\w*|skasuj\w*|wywal\w*|wyrzu[cć]\w*)\b/i,
    { file: 'delete_file', dir: 'delete_dir', branch: 'git_delete_branch' }],
  ['enter', /\b(enter|shell into|exec|wejd[zź]\w*|wej[sś][cć])\b/i, { container: 'docker_exec' }],
  ['switch', /\b(switch|checkout|prze[lł][aą]cz\w*|przejd[zź]\w*)\b/i, { branch: 'git_switch_branch' }],
  ['status', /\b(status|stan\w*)\b/i, { service: 'service_status' }],
  ['size', /\b(size|how big|how much space|rozmiar\w*|ile zajmuje|ile wa[zż]y|wielko[sś][cć])\b/i, { dir: 'dir_size', file: 'file_stat' }],
  ['show', /\b(show|cat|print|display|open|read|view|poka[zż]\w*|wy[sś]wietl\w*|otw[oó]rz\w*|przeczytaj)\b/i,
    { file: 'cat_file', dir: 'list_files', service: 'service_status' }],
  ['ping', /\b(ping\w*)\b/i, { host: 'ping_host' }],
  ['connect', /\b(connect|ssh|po[lł][aą]cz\w*|zaloguj\w*)\b/i, { host: 'ssh_connect' }],
];

const SLOT_FROM_ENT = {
  container: ['container'], service: ['service'], pid: ['pid'], proc: ['name'], port: ['port'], branch: ['branch'],
  host: ['host', 'target'], url: ['url'], file: ['file', 'src', 'path'], dir: ['path', 'src'],
};

export const hasPronoun = (q) => PRONOUN_EN.test(fold(q)) || PRONOUN_PL.test(fold(q));

/** "same for X": returns the new argument text or null. */
export function sameFor(q) {
  const fq = fold(q);
  for (const re of SAME_RES) {
    const m = fq.match(re);
    if (m) { const at = m.index + m[0].indexOf(m[1]); return q.slice(at, at + m[1].length); }
  }
  return null;
}

/** Map a new argument onto the slot of `intent` it replaces. -> {slot, value} | null */
function retarget(intent, arg) {
  const it = BY_ID[intent];
  const has = (k) => k in it.slots || (typeof it.template === 'string' && it.template.includes(`{${k}`));
  const ex = extractSlots(arg);
  if (ex.paths.length && (has('path') || has('file'))) return { slot: has('path') ? 'path' : 'file', value: ex.paths[0] };
  if (ex.port && has('port')) return { slot: 'port', value: ex.port };
  if (ex.hosts.length && (has('host') || has('target'))) return { slot: has('host') ? 'host' : 'target', value: ex.target || ex.hosts[0] };
  if (ex.urls.length && has('url')) return { slot: 'url', value: ex.urls[0] };
  if (ex.ext && has('ext')) return { slot: 'ext', value: ex.ext };
  if (ex.count != null && (has('count') || has('pid'))) return { slot: has('pid') ? 'pid' : 'count', value: ex.count };
  const word = arg.trim().replace(/^(the|ten|ta|to|kontener\w*|container|service|usług\w*|branch|gałąź|galaz|proces\w*|process)\s+/i, '').trim();
  if (!/^[\w@.:/~+-]+$/.test(word)) return null;
  for (const k of ['container', 'service', 'name', 'branch', 'pkg', 'host', 'path', 'file']) if (has(k)) return { slot: k, value: word };
  return null;
}

/**
 * Deterministic resolution. Returns null, or
 *   { rule: 'same-for', intent, slots, note }   (full override, slots to merge over the previous ones)
 *   { rule: 'pronoun', intent|null, fill: {slot: value}, ent, note }
 *   { rule: 'refused', intent|null, ent?, note }  (the referenced value is ambiguous: nothing is filled)
 */
export function resolveReference(query, ctx) {
  if (!ctx || !ctx.n) return null;
  const arg = sameFor(query);
  if (arg && ctx.last) {
    const rt = retarget(ctx.last.intent, arg);
    if (rt) {
      const slots = { ...ctx.last.slots, [rt.slot]: rt.value };
      const amb = Object.entries(slots).find(([, v]) => isAmbiguous(v));
      if (amb) return { rule: 'refused', intent: ctx.last.intent, note: `previous ${ctx.last.intent} has ${amb[0]}=${rawOf(amb[1])}, which depends on the shell state; not guessing` };
      if (rt.slot === 'ext') delete slots.glob;
      if (rt.slot === 'name') delete slots.namepat;
      return { rule: 'same-for', intent: ctx.last.intent, slots, note: `same as previous ${ctx.last.intent} with ${rt.slot}=${rt.value}` };
    }
  }
  if (!hasPronoun(query) || !ctx.entOrder.length) return null;
  // which entity does the pronoun point at? noun hint first ("that container"), else most recent
  const fq = fold(query);
  let types = null;
  for (const [re, ts] of NOUN_TYPE) if (re.test(fq)) { types = ts.filter((t) => ctx.ents[t] != null); if (types.length) break; }
  const ent = (types && types.length ? types : ctx.entOrder)[0];
  if (!ent) return null;
  let intent = null;
  let verb = null;
  for (const [name, re, table] of VERBS) {
    if (re.test(fq)) {
      const pick = table[ent] || (!types && ctx.entOrder.map((e) => table[e]).find(Boolean));
      if (pick) { intent = pick; verb = name; break; }
    }
  }
  const finalEnt = intent ? (Object.entries(SLOT_FROM_ENT).find(([e]) => ctx.ents[e] != null && intentUses(intent, e)) ? pickEnt(intent, ent, ctx) : ent) : ent;
  const value = chooseValue(finalEnt, fq, ctx, verb);
  if (value == null || isAmbiguous(value)) {
    return { rule: 'refused', intent, ent: finalEnt, note: `the latest ${finalEnt} in history (${rawOf(value ?? '?')}) cannot be read unambiguously; not guessing` };
  }
  if (intent === 'kill_by_name' && FORCE.test(fq)) intent = 'kill_force';
  if (intent === 'extract_targz' && /\.zip$/i.test(value)) intent = 'extract_zip';
  const fill = {};
  for (const s of SLOT_FROM_ENT[finalEnt] || []) fill[s] = value;
  return { rule: 'pronoun', intent, fill, ent: finalEnt, note: `"${finalEnt}" from history = ${value}` };
}

/**
 * Pick one value of an entity type: a value the request names part of ("that release branch" ->
 * release/2.3) wins; deleting/switching a branch skips the branch that is checked out; else most recent.
 */
function chooseValue(type, fq, ctx, verb) {
  let vals = ctx.all?.[type] || (ctx.ents[type] != null ? [String(ctx.ents[type])] : []);
  const words = fq.split(/[^a-z0-9]+/).filter((w) => w.length >= 4 && !/^(that|this|branch|file|plik|galez|container|kontener|service|usluga|back)$/.test(w));
  const named = vals.find((v) => !isAmbiguous(v) && words.some((w) => foldKeepLength(v).toLowerCase().includes(w)));
  if (named) return named;
  if (type === 'branch' && (verb === 'delete' || verb === 'switch') && ctx.currentBranch) {
    const other = vals.filter((v) => v !== ctx.currentBranch);
    if (other.length) vals = other;
  }
  return vals[0];
}

/** Implicit references ("ile ma słów", "md5 of the same file"): fill a missing slot from history. */
export function entityForSlot(slot, ctx) {
  // the most recent value of the type is used, or nothing: an ambiguous latest value never falls back to an older one
  for (const [ent, slots] of Object.entries(SLOT_FROM_ENT)) {
    if (slots[0] === slot && ctx.ents[ent] != null) return isAmbiguous(ctx.ents[ent]) ? null : { ent, value: String(ctx.ents[ent]) };
  }
  if (slot === 'file' && ctx.ents.dir == null && ctx.ents.file != null && !isAmbiguous(ctx.ents.file)) return { ent: 'file', value: String(ctx.ents.file) };
  return null;
}

const SAME_BUT = [/^\s*(?:and\s+)?(?:the\s+)?same(?:\s+thing|\s+command)?,?\s+but\s+(.+)$/, /^\s*(?:a\s+|i\s+)?(?:to\s+)?samo,?\s+ale\s+(.+)$/,
  /^\s*(?:a\s+|i\s+)?tak samo,?\s+ale\s+(.+)$/];
/** "same but only file names" / "to samo ale tylko nazwy plików": modifier for the previous command. */
export function sameBut(query, ctx) {
  if (!ctx?.last) return null;
  const fq = fold(query);
  const lastSlots = Object.fromEntries(Object.entries(ctx.last.slots || {}).filter(([, v]) => !isAmbiguous(v)));
  for (const re of SAME_BUT) if (re.test(fq)) return { lastIntent: ctx.last.intent, lastSlots };
  return null;
}

function intentUses(intent, ent) {
  const it = BY_ID[intent];
  return (SLOT_FROM_ENT[ent] || []).some((k) => k in it.slots);
}
function pickEnt(intent, ent, ctx) {
  if (intentUses(intent, ent)) return ent;
  return ctx.entOrder.find((e) => intentUses(intent, e)) || ent;
}

exec
/bin/bash -lc 'cat scripts/lib/silver.js; cat src/shellwords.js' in /workspace/tellsh
 succeeded in 0ms:
// Silver slot spans + relexicalisation for tagger training/eval data.
//  silverSpans(text, intent): run the regex extractor with the GOLD intent and map every slot the
//    intent actually uses back to its surface span -> typed spans (PATH, NUM, NAME, ...).
//  relex(text, spans, ...): replace span values with fresh values from a pool (train or held-out),
//    keeping exact offsets, so the tagger sees many values in the same contexts.
import { extractSlots, foldKeepLength } from '../../src/slots.js';
import { resolveSlots } from '../../src/fill.js';
import { BY_ID } from '../../src/catalog.js';
import { SLOT_TAG } from '../../src/tools.js';

export function usedSlots(intent) {
  const s = new Set(Object.keys(intent.slots));
  if (typeof intent.template === 'string') for (const m of intent.template.matchAll(/\{(\w+)/g)) s.add(m[1]);
  if (s.has('glob')) s.add('ext');
  if (s.has('namepat')) s.add('name');
  if (s.has('sedexpr')) { s.add('old'); s.add('new'); }
  if (s.has('age') || s.has('days') || s.has('since')) { s.add('age'); s.add('days'); s.add('since'); }
  if (intent.id.startsWith('base64')) { s.add('file'); s.add('text'); }
  if (intent.id === 'list_archive') s.add('file');
  return s;
}

const isWordChar = (c) => c !== undefined && /[\p{L}\d_]/u.test(c);
function findLit(text, v, taken) {
  if (v == null || v === '') return null;
  const val = String(v);
  const hay = [text, foldKeepLength(text).toLowerCase()];
  const needles = [val, foldKeepLength(val).toLowerCase()];
  for (let h = 0; h < 2; h++) {
    let from = 0;
    for (;;) {
      const i = hay[h].indexOf(needles[h], from);
      if (i < 0) break;
      const j = i + val.length;
      const free = !taken.some((o) => o.start < j && i < o.end);
      if (free && !isWordChar(text[i - 1]) && !isWordChar(text[j])) return { start: i, end: j };
      from = i + 1;
    }
  }
  return null;
}

export function silverSpans(text, intentId) {
  const intent = BY_ID[intentId];
  const ex = extractSlots(text);
  const r = resolveSlots(intent, ex);
  const used = usedSlots(intent);
  const out = [];
  const add = (type, sp, slot) => {
    if (!sp || sp.end <= sp.start) return;
    if (out.some((o) => o.start < sp.end && sp.start < o.end)) return;
    out.push({ type, start: sp.start, end: sp.end, slot });
  };
  const ofType = (t) => ex.spans.filter((s) => s.type === t);
  const numSpan = (v) => (ex.countSpan?.value === v ? ex.countSpan : ex.numberSpans?.find((s) => s.value === v));
  const order = ['url', 'host', 'target', 'port', 'pid', 'size', 'age', 'since', 'days', 'mode', 'glob',
    'src', 'dst', 'file', 'path', 'dest', 'archive', 'count', 'depth'];
  const keys = Object.keys(r).sort((a, b) => (order.indexOf(a) + 1 || 99) - (order.indexOf(b) + 1 || 99));
  for (const k of keys) {
    const v = r[k];
    if (!used.has(k) || v == null) continue;
    switch (k) {
      case 'path': case 'file': case 'src': case 'dst': case 'dest': case 'archive':
        add('PATH', ex.spans.find((s) => (s.type === 'PATH' || s.type === 'QUOTED') && s.value === v) ||
          (k === 'path' || k === 'dest' ? findLit(text, v, out) : null), k); break;
      case 'count': case 'depth': add('NUM', numSpan(v), k); break;
      case 'days': add(ex.duration ? 'TIME' : 'NUM', ex.duration ? ofType('TIME')[0] : numSpan(v), k); break;
      case 'age': case 'since': add('TIME', ofType('TIME')[0], k); break;
      case 'size': add('SIZE', ofType('SIZE')[0], k); break;
      case 'port': add('PORT', ofType('PORT')[0] || numSpan(v), k); break;
      case 'pid': add('PID', ofType('PID')[0] || numSpan(v), k); break;
      case 'mode': add('MODE', ex.modeSpan, k); break;
      case 'glob': add('EXT', ofType('EXT')[0], k); break;
      case 'url': add('URL', ofType('URL')[0] || ofType('HOST')[0], k); break;
      case 'host': add('HOST', ofType('HOST').find((s) => s.value === v) || findLit(text, v, out), k); break;
      case 'target': {
        const hs = ofType('HOST').find((s) => s.value === v || String(v).endsWith(s.value)) || findLit(text, v, out);
        add('HOST', hs, k);
        const u = String(v).split('@');
        if (u.length === 2 && hs && !text.slice(hs.start, hs.end).includes('@')) add('USER', findLit(text, u[0], out), 'user');
        break;
      }
      default: {
        const type = SLOT_TAG[k];
        if (!type) break;
        const q = ex.spans.find((s) => s.type === 'QUOTED' && s.value === v);
        add(type, q || findLit(text, v, out), k);
      }
    }
  }
  out.sort((a, b) => a.start - b.start);
  return { spans: out, resolved: r, ex };
}

// ---------- value pools (index % 4 == 3 -> held-out eval pool) ----------
const P = {
  dir: ['/var/log', '/etc/nginx', '~/projects', './src', 'build', '/opt/app', '~/Documents/reports', '/srv/www',
    'node_modules', '../backup', '/tmp/cache', '~/Pobrane', '/mnt/data', '/home/ola/zdjecia', 'dist', '/var/lib/docker',
    '~/code/tellsh', 'src/components', '/usr/local/bin', '~/Desktop/stare', 'logs', '/data/exports', './tests', '/etc',
    '~/Music', 'public/img', '/var/www/html', 'vendor', '~/.config', '/backup/2024', 'docs', '/home/jan/projekty'],
  file: ['notes.txt', 'config.yaml', './scripts/run.sh', '/etc/hosts', 'app.log', 'README.md', 'data.csv', '~/.bashrc',
    'main.py', 'index.js', 'raport_2024.pdf', 'Dockerfile', 'docker-compose.yml', '/var/log/syslog', 'package.json',
    'server.conf', 'test.py', '/etc/fstab', 'faktura-03.pdf', 'src/app.ts', 'error.log', 'deploy.sh', 'zdjecie.jpg',
    '.env', 'requirements.txt', 'build/output.bin', 'notatki.md', '/var/log/nginx/access.log', 'Makefile', 'lista.txt',
    'schema.sql', 'wyniki_final.xlsx'],
  tar: ['backup.tar.gz', 'logs-2024.tgz', 'release.tar.gz', 'site.tar.gz', 'dane.tar.gz', 'archive.tar.gz', 'src.tgz', 'kopia.tar.gz'],
  zip: ['site.zip', 'photos.zip', 'projekt.zip', 'export.zip', 'docs.zip', 'zdjecia.zip', 'build.zip', 'raporty.zip'],
  proc: ['nginx', 'node', 'chrome', 'myapp', 'worker-2', 'api_server', 'java', 'python3', 'qzx-daemon', 'ffmpeg',
    'gunicorn', 'backend', 'firefox', 'redis-server', 'slack', 'celery', 'vite', 'postgres', 'spotify', 'crawler',
    'zoom', 'webpack', 'sidekiq', 'mongod', 'code', 'deno', 'kafka', 'puma'],
  service: ['nginx', 'docker', 'ssh', 'postgresql', 'redis', 'myapp', 'cron', 'apache2', 'api-gateway', 'mysql',
    'grafana-server', 'bluetooth', 'cups', 'fail2ban', 'containerd', 'prometheus', 'haproxy', 'php-fpm', 'jenkins', 'ufw'],
  container: ['web', 'db', 'redis-cache', 'api-1', 'my_app', 'frontend', 'nginx-proxy', 'worker', 'postgres-dev',
    'backend_2', 'kafka-broker', 'grafana', 'mailhog', 'minio', 'test-runner', 'app'],
  pkg: ['htop', 'curl', 'jq', 'ripgrep', 'tmux', 'ffmpeg', 'tree', 'ncdu', 'nmap', 'git', 'zsh', 'neofetch', 'wget', 'unzip', 'bat', 'fzf'],
  cmd: ['python3', 'node', 'git', 'docker', 'java', 'code', 'npm', 'pip', 'gcc', 'make', 'kubectl', 'go', 'ruby', 'cargo', 'psql', 'terraform'],
  branch: ['main', 'develop', 'feature/login', 'fix-123', 'release/2.1', 'hotfix/crash', 'feat/JIRA-42-auth', 'dev',
    'staging', 'bugfix/null-ptr', 'experiment', 'feature/nowy-panel', 'v2', 'chore/deps', 'test/e2e', 'poprawki'],
  pattern: ['error', 'TODO', 'api_key', 'FIXME', 'Exception', 'localhost', 'password', 'timeout', 'deprecated',
    'NullPointer', 'warning', 'secret', 'session_id', 'błąd', 'uwaga', 'debug'],
  phrase: ['connection refused', 'out of memory', 'Not Found', 'permission denied', 'hello world', 'brak dostępu',
    'segmentation fault', 'disk full'],
  user: ['www-data', 'root', 'ola', 'deploy', 'jan', 'postgres', 'nobody', 'admin', 'kasia', 'git', 'ubuntu', 'marek'],
  msg: ['fix typo', 'initial commit', 'poprawki w README', 'add login form', 'wip', 'update deps', 'naprawa błędu logowania',
    'refactor parser', 'bump version', 'dodanie testów', 'remove dead code', 'nowy endpoint'],
  var: ['PATH', 'HOME', 'JAVA_HOME', 'NODE_ENV', 'EDITOR', 'LANG', 'DATABASE_URL', 'GOPATH', 'SHELL', 'USER', 'API_TOKEN', 'TERM'],
  text: ['hello', 'Hello World', 'secret123', 'zażółć', 'admin:admin', 'tellsh', 'abc123', 'my token'],
  host: ['google.com', '8.8.8.8', 'example.org', 'myserver.local', '192.168.1.10', 'github.com', 'api.example.com',
    'wp.pl', '10.0.0.5', 'onet.pl', 'db.internal', '1.1.1.1', 'cloudflare.com', 'serwer.firma.pl', 'localhost', 'gitlab.com'],
  userhost: ['root@myserver.com', 'ola@10.0.0.5', 'deploy@prod.example.com', 'jan@192.168.0.20', 'admin@vps.example.org',
    'ubuntu@ec2.example.net', 'git@serwer.pl', 'pi@raspberrypi.local'],
  url: ['https://example.com', 'https://github.com/user/repo.git', 'http://localhost:3000/health', 'https://api.example.com/v1',
    'https://x.org/file.zip', 'https://onet.pl', 'https://releases.example.com/app-1.2.tar.gz', 'http://192.168.1.1',
    'git@github.com:org/app.git', 'https://wp.pl', 'https://httpbin.org/get', 'https://cdn.example.net/img.png'],
  mode: ['755', '644', '600', '700', '777', '640', 'u+x', 'g-w', 'a+r', 'o-rwx', '750', '+x'],
  ext: ['pdf', 'log', 'py', 'js', 'txt', 'json', 'md', 'csv', 'jpg', 'png', 'yaml', 'sh', 'html', 'ts', 'mp4', 'conf'],
  port: [22, 80, 443, 3000, 5432, 8080, 8443, 9000, 27017, 6379, 5173, 8000, 4200, 3306, 9090, 5000],
};
const pool = (name, split) => P[name].filter((_, i) => (split === 'eval' ? i % 4 === 3 : i % 4 !== 3));
export const POOLS = P;

const NUMW = {
  en: ['three', 'five', 'ten', 'twenty', 'two', 'seven'],
  pl: ['trzy', 'pięć', 'dziesięć', 'dwadzieścia', 'dwa', 'siedem'],
};

function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
const ARCH = /\.(tar\.gz|tgz|tar|zip|tar\.bz2|tar\.xz|gz)$/i;
const LOCISH = /\s|^(home|downloads?|pobrane|desktop|pulpit|documents|dokumenty)$/i;

function replacement(sp, orig, lang, rng, split) {
  const quotedCtx = sp.quoted;
  switch (sp.type) {
    case 'PATH': {
      if (LOCISH.test(orig) && !/[/~.]/.test(orig)) return null; // named location phrase: keep
      if (ARCH.test(orig)) return pick(rng, pool(/zip$/i.test(orig) ? 'zip' : 'tar', split));
      const fileish = /\.[A-Za-z0-9]{1,5}$/.test(orig) || ['file', 'src'].includes(sp.slot) && !/\/$/.test(orig) && /\./.test(orig);
      let v = pick(rng, pool(fileish ? 'file' : 'dir', split));
      if (quotedCtx && rng() < 0.3) v = v.replace(/[^/]*$/, (b) => b.replace(/[_-]/, ' '));
      return v;
    }
    case 'NUM': {
      if (sp.slot === 'depth') return String(1 + Math.floor(rng() * 4));
      if (/^\d+$/.test(orig) || rng() < 0.7) return String(1 + Math.floor(rng() * 30));
      return pick(rng, NUMW[lang] || NUMW.en);
    }
    case 'TIME': case 'SIZE': {
      if (!/\d/.test(orig)) return null;
      return orig.replace(/\d+(?:[.,]\d+)?/, () => String(1 + Math.floor(rng() * 30)));
    }
    case 'PORT': return String(rng() < 0.6 ? pick(rng, pool('port', split)) : 1024 + Math.floor(rng() * 60000));
    case 'PID': return String(100 + Math.floor(rng() * 99000));
    case 'MODE': return pick(rng, pool('mode', split));
    case 'EXT': {
      const e = pick(rng, pool('ext', split));
      if (/^\*\./.test(orig)) return '*.' + e;
      if (/^\./.test(orig)) return '.' + e;
      if (/^[a-z0-9]{1,5}$/i.test(orig) && orig.length <= 4) return e;
      return null; // alias word like "python" / "pythonowe": keep
    }
    case 'URL': return pick(rng, pool('url', split));
    case 'HOST': return orig.includes('@') ? pick(rng, pool('userhost', split)) : pick(rng, pool('host', split));
    case 'NAME': {
      const kind = { service: 'service', container: 'container', pkg: 'pkg', cmd: 'cmd' }[sp.slot] || 'proc';
      return pick(rng, pool(kind, split));
    }
    case 'BRANCH': return pick(rng, pool('branch', split));
    case 'PATTERN': case 'REPL': return quotedCtx && rng() < 0.4 ? pick(rng, pool('phrase', split)) : pick(rng, pool('pattern', split));
    case 'USER': return pick(rng, pool('user', split));
    case 'MSG': return pick(rng, pool('msg', split));
    case 'VAR': return pick(rng, pool('var', split));
    case 'TEXT': return quotedCtx ? pick(rng, pool('text', split)) : pick(rng, pool('text', split)).split(' ')[0];
    default: return null;
  }
}

/** Replace span values; returns { text, spans } with updated offsets. keepProb: chance to keep a value. */
export function relex(text, spans, { lang = 'en', rng, split = 'train', keepProb = 0.2 } = {}) {
  let out = '';
  let last = 0;
  const ns = [];
  for (const sp of spans) {
    const orig = text.slice(sp.start, sp.end);
    const quoted = /["'„“`]/.test(text[sp.start - 1] || '');
    let rep = rng() < keepProb ? null : replacement({ ...sp, quoted }, orig, lang, rng, split);
    if (rep != null && !quoted && /\s/.test(rep) && !['TIME', 'SIZE', 'MSG'].includes(sp.type)) rep = rep.split(' ')[0];
    const val = rep ?? orig;
    out += text.slice(last, sp.start);
    ns.push({ ...sp, start: out.length, end: out.length + val.length, replaced: rep != null });
    out += val;
    last = sp.end;
  }
  out += text.slice(last);
  return { text: out, spans: ns };
}

/** BIO labels for tokens given spans (a token takes the label of the span it overlaps most). */
export function bioLabels(toks, spans) {
  const labels = toks.map(() => 'O');
  for (const sp of spans) {
    let first = true;
    toks.forEach((t, i) => {
      const ov = Math.min(t.end, sp.end) - Math.max(t.start, sp.start);
      if (ov <= 0) return;
      if (/^["'„“”`]$/.test(t.text)) return;
      labels[i] = (first ? 'B-' : 'I-') + sp.type;
      first = false;
    });
  }
  return labels;
}

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
// Shell-aware word splitting for history lines and command comparison (POSIX sh/bash/zsh, fish
// approximated as POSIX, and PowerShell). Not a full parser: it understands quoting, escapes,
// command separators and redirections, and flags every word whose value depends on the shell
// state (expansions, unquoted globs), so callers never act on a guessed value.
//
// splitCommand(line, kind) -> { ok, segments: [{ words: string[], raw: string[] }] }
//   ok=false: unterminated quote, heredoc, or other syntax we do not interpret
//   words[i]: the literal value, or AMB + raw text when it contains an expansion ($x, $(..), `..`,
//             {a,b}), or GLOB + raw text when it contains an unquoted * ? [
// Redirections (`> f`, `2>&1`, `<in`) are dropped together with their target (keepRedirects: kept as
// words, e.g. ['ls', '>', 'out']). Each segment records the separator that ended it (sep: ; | && || &).

export const AMB = '\u0000';
export const GLOB = '\u0001';
export const isAmbiguous = (w) => typeof w === 'string' && (w.startsWith(AMB) || w.startsWith(GLOB));
export const isExpansion = (w) => typeof w === 'string' && w.startsWith(AMB);
export const isGlob = (w) => typeof w === 'string' && w.startsWith(GLOB);
export const rawOf = (w) => (isAmbiguous(w) ? w.slice(1) : w);

const PS_SQ = /['‘’‚‛]/;
const PS_DQ = /["“”„]/;

export function splitCommand(line, kind = 'posix', { keepRedirects = false } = {}) {
  const ps = kind === 'pwsh' || kind === 'powershell';
  const s = String(line);
  const segments = [];
  let words = [];
  let raws = [];
  let w = null; // current word value
  let raw = '';
  let amb = false;
  let glob = false;
  let dropNext = false; // next word is a redirection target
  const flushWord = () => {
    if (w == null) return;
    if (dropNext) { dropNext = false; } else {
      words.push(amb ? AMB + raw : glob ? GLOB + raw : w);
      raws.push(raw);
    }
    w = null; raw = ''; amb = false; glob = false;
  };
  const flushSeg = (sep = '') => { flushWord(); if (words.length) segments.push({ words, raw: raws, sep }); else if (sep && segments.length) segments[segments.length - 1].sep += sep; words = []; raws = []; };
  const fail = () => ({ ok: false, segments: [] });

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const start = i;
    if (ps ? PS_SQ.test(c) : c === "'") {
      // single-quoted literal; PowerShell doubles any single-quote character to escape it
      let v = '';
      let j = i + 1;
      for (;; j++) {
        if (j >= s.length) return fail();
        if (ps ? PS_SQ.test(s[j]) : s[j] === "'") {
          if (ps && PS_SQ.test(s[j + 1] || '')) { v += s[++j]; continue; }
          break;
        }
        v += s[j];
      }
      w = (w ?? '') + v; i = j;
    } else if (ps ? PS_DQ.test(c) : c === '"') {
      let v = '';
      let j = i + 1;
      // PowerShell "$HOME/..." (how tellsh renders ~/...) is the home directory
      const home = ps && w == null && s.slice(j).match(/^\$(?:HOME|env:USERPROFILE)(?=[\\/"\u201C\u201D\u201E])/i);
      if (home) { v = '~'; j += home[0].length; }
      for (;; j++) {
        if (j >= s.length) return fail();
        const d = s[j];
        if (ps) {
          if (PS_DQ.test(d)) { if (PS_DQ.test(s[j + 1] || '')) { v += s[++j]; continue; } break; }
          if (d === '`') { if (j + 1 >= s.length) return fail(); v += s[++j]; continue; }
          if (d === '$') amb = true;
        } else {
          if (d === '"') break;
          if (d === '\\' && /[$`"\\\n]/.test(s[j + 1] || '')) { v += s[++j]; continue; }
          if (d === '$' || d === '`') amb = true;
        }
        v += d;
      }
      w = (w ?? '') + v; i = j;
    } else if (!ps && c === '\\') {
      if (i + 1 >= s.length) return fail();
      if (s[i + 1] !== '\n') w = (w ?? '') + s[i + 1];
      i++;
    } else if (ps && c === '`') {
      if (i + 1 >= s.length) return fail();
      w = (w ?? '') + s[++i];
    } else if (c === '\n' || c === ';' || c === '|' || c === '(' || c === ')' || (c === '&' && (!ps || s[i + 1] === '&'))) {
      let sep = c === '\n' ? ';' : c;
      if ((c === '&' || c === '|') && s[i + 1] === c) { i++; sep += c; }
      flushSeg(sep);
    } else if ((c === '{' || c === '}') && w == null && (i + 1 >= s.length || /\s/.test(s[i + 1]))) {
      flushSeg(c); // command group / script block
    } else if (/\s/.test(c)) {
      flushWord();
    } else if (c === '#' && w == null && !ps) {
      break; // comment
    } else if (c === '<' || c === '>' || (!ps && c === '&' && s[i + 1] === '>')) {
      // redirection: [n]> [n]>> &> >& <  ... drop operator and its target
      if (c === '<' && s[i + 1] === '<') return fail(); // heredoc / here-string
      if (c === '<' && s[i + 1] === '(') return fail(); // process substitution
      if (c === '>' && s[i + 1] === '(') return fail();
      let fd = '';
      if (w != null && /^\d$/.test(w) && raw === w) { fd = w; w = null; raw = ''; } // fd number
      flushWord();
      let j = i + 1;
      while (j < s.length && /[>&|]/.test(s[j])) j++;
      let op = fd + s.slice(i, j);
      if (/&$/.test(s.slice(i, j)) && /^\d|^-/.test(s.slice(j))) { // 2>&1
        const k0 = j;
        while (j < s.length && /[\d-]/.test(s[j])) j++;
        op += s.slice(k0, j);
        if (keepRedirects) words.push(op), raws.push(op);
        i = j - 1;
        continue;
      }
      i = j - 1;
      if (keepRedirects) { words.push(op); raws.push(op); } else dropNext = true;
      continue;
    } else {
      if (c === '$') {
        // PowerShell: $HOME / $env:USERPROFILE at the start of a word is the home directory (~)
        const home = ps && w == null && s.slice(i).match(/^\$(?:HOME|env:USERPROFILE|\{env:USERPROFILE\})(?=$|[\\/\s;|)])/i);
        if (home) { w = '~'; i += home[0].length - 1; raw += s.slice(start, i + 1); continue; }
        amb = true;
      }
      if (!ps && c === '`') amb = true;
      if (/[*?[]/.test(c)) glob = true;
      if (!ps && c === '{' && /^\{[^}\s]*,[^}\s]*\}/.test(s.slice(i))) amb = true; // brace expansion
      w = (w ?? '') + c;
    }
    if (w != null) raw += s.slice(start, i + 1);
  }
  flushSeg();
  if (dropNext) return fail();
  return { ok: true, segments };
}

/** All words of a single simple command (no separators), or null if the text is not exactly one word list. */
export function wordsOf(line, kind = 'posix') {
  const r = splitCommand(line, kind);
  if (!r.ok || r.segments.length !== 1) return null;
  return r.segments[0].words;
}

/** Decode one shell word (as written in a command) to its literal value; null if it is not exactly one word. */
export function decodeWord(text, kind = 'posix') {
  const w = wordsOf(text, kind);
  return w && w.length === 1 ? w[0] : null;
}

exec
/bin/bash -lc 'cat src/compose.js' in /workspace/tellsh
 succeeded in 0ms:
// Second pass (experimental): compose a command from a closed vocabulary when no catalog intent fits.
//   1. command head = a tool from stage 1 (top-3), restricted to tools that have a flag vocabulary
//   2. per tool, every flag has natural-language triggers (EN + PL, matched on folded stems) plus
//      weak evidence from tldr-pages flag descriptions; flags whose trigger score >= 1 are selected
//   3. slot values (paths, patterns, numbers, ...) come from the tagger/regex extraction
//   4. validation: only flags from the tool's vocabulary, then `bash -n` syntax check
// Composed commands are always at least medium risk and must be confirmed explicitly (never --yes).
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { foldKeepLength } from './slots.js';
import { shQuote } from './render.js';
import { checkDanger, maxRisk } from './danger.js';

const fold = (s) => ' ' + foldKeepLength(String(s)).toLowerCase().replace(/[^a-z0-9.*/~+-]+/g, ' ') + ' ';

// trigger syntax: plain words/phrases are matched as stem prefixes at a word start ("szczegol" matches
// "szczegolami"); a trailing "$" requires a whole word.
const F = (flag, triggers, extra = {}) => ({ flag, triggers, ...extra });

export const TOOLS = {
  ls: {
    head: 'ls', args: ['path'],
    flags: [
      F('-l', ['long', 'detail', 'details', 'permission', 'with size', 'owner', 'full info', 'szczegol', 'dlug', 'uprawnien', 'wlasciciel']),
      F('-a', ['hidden', 'all files', 'dotfile', 'dot file', 'including hidden', 'ukryt', 'wszystkie pliki', 'z kropk']),
      F('-t', ['by time', 'by date', 'modification time', 'modified time', 'newest', 'most recent', 'latest first', 'by modif', 'wg czasu', 'wedlug czasu', 'po czasie', 'wg daty', 'wedlug daty', 'po dacie', 'najnowsz', 'czasu modyfikacji', 'daty modyfikacji'], { group: 'sort' }),
      F('-S', ['by size', 'largest first', 'biggest first', 'size order', 'sorted by size', 'wg rozmiaru', 'wedlug rozmiaru', 'po rozmiarze', 'najwieksze najpierw', 'od najwiekszego'], { group: 'sort' }),
      F('-r', ['reverse', 'oldest first', 'ascending', 'smallest first', 'odwrot', 'najstarsz', 'rosnac', 'od najmniejsz', 'od najstarsz']),
      F('-h', ['human', 'readable size', 'kb mb', 'czyteln', 'ludzk']),
      F('-R', ['recursive', 'subdirector', 'subfolder', 'rekurenc', 'podkatalog', 'podfolder']),
      F('-1', ['one per line', 'per line', 'single column', 'one column', 'jeden na linie', 'po jednym', 'w jednej kolumnie', 'jedna kolumna']),
      F('-d', ['directory itself', 'not its contents', 'not the contents', 'sam katalog', 'nie zawartosc']),
      F('-i', ['inode', 'i-wezl', 'i-node']),
      F('-U', ['unsorted', 'no sorting', 'without sorting', 'directory order', 'bez sortowania', 'nieposortowan']),
    ],
  },
  find: {
    head: 'find', args: ['path'], filters: true,
    flags: [
      F('-type f', ['files$', 'file$', 'pliki$', 'plikow$', 'plik$', 'only files', 'tylko pliki'], { group: 'type' }),
      F('-type d', ['director', 'folder', 'katalog', 'dirs$'], { group: 'type' }),
      F('-type l', ['symlink', 'symbolic link', 'dowiazan', 'link symbol'], { group: 'type' }),
      F('-empty', ['empty', 'pust']),
      F('-maxdepth', ['depth', 'levels deep', 'level', 'not recursive', 'top level only', 'glebok', 'poziom', 'bez podkatalog'], { value: 'depth' }),
      F('-iname', ['case insensitive', 'ignore case', 'ignoring case', 'bez wzgledu na wielkosc', 'wielkosc liter']),
      F('-newer', ['newer than', 'nowsze niz', 'nowszych niz', 'nowszy niz'], { value: 'newer' }),
      F('-print0', ['null separated', 'print0']),
      F('-executable', ['executable', 'wykonywaln']),
      F('-user', ['owned by', 'belonging to', 'of user', 'nalezace do', 'uzytkownika', 'wlasciciel'], { value: 'user' }),
      F('-name', ['named', 'called', 'nazwan', 'o nazwie', 'nazywaj'], { value: 'fname' }),
    ],
  },
  grep: {
    head: 'grep', args: ['pattern', 'path'],
    flags: [
      F('-i', ['case insensitive', 'case-insensitive', 'ignore case', 'ignoring case', 'any case', 'bez wzgledu na wielkosc', 'wielkosc liter', 'ignoruj wielkosc', 'niezaleznie od wielkosci']),
      F('-n', ['line number', 'numbers of lines', 'with numbers', 'numerami linii', 'numer linii', 'numery linii', 'numerem linii', 'z numerami']),
      F('-r', ['recursive', 'subdirector', 'all files in', 'rekurenc', 'podkatalog', 'w calym katalogu', 'w katalogu$']),
      F('-l', ['only file names', 'only filenames', 'file names only', 'which files', 'list files', 'names of files', 'tylko nazwy plikow', 'nazwy plikow', 'ktore pliki'], { group: 'out' }),
      F('-c', ['count', 'how many lines', 'number of matching', 'ile linii', 'policz', 'zlicz', 'liczba', 'ile razy', 'trafien'], { group: 'out' }),
      F('-v', ['invert', 'not containing', "don't contain", 'do not contain', 'not matching', 'excluding', 'which are not', 'that are not', 'nie zawieraj', 'bez slowa', 'ktore nie', 'odwroc dopasowan']),
      F('-w', ['whole word', 'exact word', 'full word', 'cale slowo', 'calych slow', 'jako slowo']),
      F('-o', ['only the match', 'only matching', 'just the match', 'tylko dopasowan', 'samo dopasowan']),
      F('-E', ['regex', 'extended', 'regular expression', 'wyrazenie regularn']),
      F('-A', ['lines after', 'after each match', 'linii po', 'po kazdym'], { value: 'count' }),
      F('-B', ['lines before', 'before each match', 'linii przed', 'przed kazdym'], { value: 'count' }),
      F('-C', ['context', 'around each match', 'kontekst', 'wokol'], { value: 'count' }),
      F('-h', ['without filename', 'no filename', 'without file name', 'bez nazw plikow', 'bez nazwy pliku']),
    ],
  },
  du: {
    head: 'du', args: ['path'],
    flags: [
      F('-s', ['total', 'summary', 'summar', 'only the total', 'one number', 'lacznie', 'laczny', 'suma', 'podsumow', 'calkowit']),
      F('-h', ['human', 'readable', 'czyteln', 'ludzk'], { group: 'unit' }),
      F('-m', ['megabyte', 'in mb', 'megabajt', 'w mb'], { group: 'unit' }),
      F('-k', ['kilobyte', 'in kb', 'kilobajt', 'w kb'], { group: 'unit' }),
      F('-a', ['all files', 'every file', 'files too', 'including files', 'kazdy plik', 'wszystkie pliki', 'takze pliki', 'rowniez pliki']),
      F('-c', ['grand total', 'total at the end', 'suma na koncu', 'podsumowanie na koncu']),
      F('-d', ['depth', 'level', 'levels', 'each subdirectory', 'every subdirectory', 'glebok', 'poziom', 'kazdego podkatalogu'], { value: 'depth' }),
      F('-x', ['one filesystem', 'same filesystem', 'jeden system plikow', 'tym samym systemie plikow']),
    ],
  },
  df: {
    head: 'df', args: ['path'],
    flags: [
      F('-h', ['human', 'readable', 'gb', 'czyteln', 'ludzk']),
      F('-t', [], { value: 'fstype' }),
      F('-T', ['with type', 'filesystem type', 'types', 'z typem', 'typy system', 'typ systemu']),
      F('-i', ['inode', 'i-node']),
      F('-l', ['local only', 'only local', 'tylko lokaln']),
    ],
  },
  ps: {
    head: 'ps', args: [],
    flags: [
      F('aux', ['all processes', 'every process', 'all users', 'with users', 'wszystkie procesy', 'kazdy proces', 'wszystkich uzytkownik'], { group: 'sel' }),
      F('-ef', ['full format', 'full listing', 'ppid', 'parent', 'pelny format', 'rodzic'], { group: 'sel' }),
      F('--forest', ['tree', 'forest', 'hierarch', 'drzew']),
      F('--sort=-%mem', ['by memory', 'by mem', 'by ram', 'most memory', 'wg pamieci', 'wedlug pamieci', 'po pamieci', 'najwiecej pamieci', 'wg ram'], { group: 'sort' }),
      F('--sort=-%cpu', ['by cpu', 'most cpu', 'wg cpu', 'wedlug cpu', 'po cpu', 'procesora'], { group: 'sort' }),
      F('-u', ['owned by', 'of user', 'for user', 'uzytkownika', 'nalezace do'], { value: 'user' }),
    ],
  },
  tar: {
    head: 'tar', args: ['archive', 'path'],
    flags: [
      F('-c', ['create', 'pack', 'compress', 'archive', 'utworz', 'spakuj', 'stworz', 'zrob archiwum', 'skompresuj'], { group: 'op' }),
      F('-x', ['extract', 'unpack', 'decompress', 'rozpakuj', 'wypakuj', 'rozpakowac', 'wypakowac'], { group: 'op' }),
      F('-t', ['list', 'contents', 'what is in', "what's in", 'show files in', 'zawartosc', 'wylistuj', 'co jest w', 'lista plikow'], { group: 'op' }),
      F('-z', [], { compress: /\.(tar\.gz|tgz)$/ }),
      F('-j', [], { compress: /\.(tar\.bz2|tbz2?)$/ }),
      F('-J', [], { compress: /\.(tar\.xz|txz)$/ }),
      F('-v', ['verbose', 'verbosely', 'show progress', 'szczegol', 'gadatliw', 'pokazuj pliki']),
      F('-f', [], { always: true }),
      F('-C', ['into', 'to directory', 'do katalogu', 'do folderu', 'w katalogu docelowym'], { value: 'dest' }),
    ],
  },
  sort: {
    head: 'sort', args: ['file'],
    flags: [
      F('-r', ['reverse', 'descending', 'largest first', 'highest first', 'malejaco', 'odwrot', 'od najwieksz']),
      F('-n', ['numeric', 'numerically', 'as numbers', 'numeryczn', 'liczbowo', 'jak liczby']),
      F('-h', ['human readable', 'human-readable', 'sizes like', 'czytelne rozmiary']),
      F('-u', ['unique', 'deduplicate', 'without duplicates', 'remove duplicates', 'unikal', 'bez duplikat', 'usun duplikat']),
      F('-f', ['ignore case', 'case insensitive', 'bez wzgledu na wielkosc']),
      F('-t', ['separated by', 'delimiter', 'separator', 'oddzielon', 'rozdzielon'], { value: 'sep' }),
      F('-k', ['column', 'field', 'kolumn', 'pole', 'polu'], { value: 'column' }),
    ],
  },
  head: {
    head: 'head', args: ['file'],
    flags: [F('-c', ['bytes', 'bajt'], { value: 'count' }), F('-n', [], { value: 'count', implied: true })],
  },
  tail: {
    head: 'tail', args: ['file'],
    flags: [
      F('-c', ['bytes', 'bajt'], { value: 'count' }),
      F('-n', [], { value: 'lines', implied: true }),
      F('-f', ['follow', 'live', 'watch', 'as it grows', 'na biezaco', 'na zywo', 'sledz', 'obserwuj']),
    ],
  },
  wc: {
    head: 'wc', args: ['file'],
    flags: [
      F('-l', ['lines', 'line count', 'linii', 'linie', 'wierszy']),
      F('-w', ['words', 'word count', 'slow', 'wyrazow']),
      F('-c', ['bytes', 'bajt']),
      F('-m', ['characters', 'chars', 'znakow', 'znaki']),
    ],
  },
  git: {
    head: 'git', sub: {
      log: { triggers: ['log', 'history', 'commits', 'historia', 'historie', 'commity', 'commitow'], args: [],
        flags: [
          F('--oneline', ['one line', 'oneline', 'compact', 'short', 'jednej linii', 'jedna linia', 'w skrocie', 'zwiezl']),
          F('--graph', ['graph', 'tree', 'graf', 'drzew']),
          F('-n', ['last', 'latest', 'recent', 'ostatni'], { value: 'count' }),
          F('--author', ['by author', 'author', 'autor', 'from user'], { value: 'user' }),
          F('--stat', ['stat', 'changed files', 'files changed', 'statyst', 'zmienione pliki']),
          F('-p', ['patch', 'with diff', 'with changes', 'z diffem', 'ze zmianami']),
          F('--all', ['all branches', 'wszystkich galezi', 'wszystkie galezie']),
          F('--decorate', ['decorate', 'with refs', 'tags and branches']),
          F('--reverse', ['oldest first', 'reverse', 'chronolog', 'od najstarsz']),
          F('--merges', ['only merges', 'merge commits', 'tylko merge']),
          F('--no-merges', ['without merges', 'no merges', 'bez merge']),
        ] },
      branch: { triggers: ['branch', 'branches', 'galez', 'galezi', 'branche', 'branchy'], args: [],
        flags: [
          F('-a', ['all', 'including remote', 'wszystkie', 'z zdalnymi', 'lacznie ze zdalnymi'], { group: 'sel' }),
          F('-r', ['remote only', 'only remote', 'remote branches', 'tylko zdalne', 'zdalne galezie'], { group: 'sel' }),
          F('-v', ['verbose', 'last commit', 'with commit', 'ostatnim commitem', 'z commitem', 'szczegol']),
          F('--merged', ['merged', 'zmergowane', 'scalone']),
          F('--no-merged', ['not merged', 'unmerged', 'niezmergowane', 'nie scalone', 'niescalone']),
        ] },
      diff: { triggers: ['diff', 'changes', 'changed', 'difference', 'zmiany', 'zmienion', 'roznice', 'roznica'], args: ['ref'],
        flags: [
          F('--staged', ['staged', 'cached', 'index', 'w indeksie', 'staged', 'dodane']),
          F('--stat', ['stat', 'summary', 'which files', 'statyst', 'podsumow', 'ktore pliki']),
          F('--name-only', ['names only', 'only names', 'file names', 'tylko nazwy', 'nazwy plikow']),
          F('-w', ['ignore whitespace', 'ignoring whitespace', 'bez bialych znakow', 'ignoruj biale']),
          F('--word-diff', ['word diff', 'by word', 'per word', 'slowami', 'po slowach']),
        ] },
      status: { triggers: ['status', 'stan'], args: [],
        flags: [F('-s', ['short', 'compact', 'krotk', 'zwiezl']), F('-b', ['branch', 'galez'])] },
    },
  },
  docker: {
    head: 'docker', sub: {
      ps: { triggers: ['container', 'kontener', 'ps$', 'running'], args: [],
        flags: [
          F('-a', ['all', 'stopped', 'including stopped', 'wszystkie', 'zatrzymane']),
          F('-q', ['only ids', 'ids only', 'just ids', 'only the ids', 'quiet', 'tylko id', 'same id', 'identyfikator']),
          F('-s', ['size', 'sizes', 'rozmiar']),
          F('--no-trunc', ['full', 'not truncated', 'no trunc', 'untruncated', 'pelne', 'nieobciet', 'bez obcinania']),
          F('-l', ['latest', 'last created', 'most recent', 'ostatnio utworzony', 'najnowszy']),
          F('-n', ['last', 'ostatnie'], { value: 'count' }),
        ] },
      images: { triggers: ['image', 'obraz'], args: [],
        flags: [
          F('-a', ['all', 'intermediate', 'wszystkie', 'posrednie']),
          F('-q', ['only ids', 'ids only', 'just ids', 'quiet', 'tylko id', 'same id', 'identyfikator']),
          F('--no-trunc', ['full', 'not truncated', 'pelne', 'bez obcinania']),
          F('--digests', ['digest', 'skrot']),
        ] },
    },
  },
  ss: {
    head: 'ss', args: [],
    flags: [
      F('-t', ['tcp']), F('-u', ['udp']), F('-l', ['listening', 'listen', 'nasluch']),
      F('-n', ['numeric', 'numbers', "don't resolve", 'no dns', 'numerycz', 'bez rozwiazywania']),
      F('-p', ['process', 'pid', 'program', 'proces']), F('-a', ['all', 'wszystkie']),
      F('-s', ['summary', 'statistics', 'podsumow', 'statyst']),
    ],
  },
  journalctl: {
    head: 'journalctl', args: [],
    flags: [
      F('-u', ['service', 'unit', 'uslug', 'serwis'], { value: 'name' }),
      F('-f', ['follow', 'live', 'na biezaco', 'na zywo', 'sledz']),
      F('-n', ['last', 'lines', 'ostatni', 'linii'], { value: 'count' }),
      F('-b', ['this boot', 'current boot', 'since boot', 'od startu', 'od uruchomienia', 'biezacego rozruchu']),
      F('-k', ['kernel', 'jadr']),
      F('-r', ['reverse', 'newest first', 'odwrot', 'najnowsze najpierw']),
      F('-p err', ['error', 'errors', 'bled', 'bledy']),
      F('--since', ['since', 'last', 'from', 'od', 'ostatni'], { value: 'since' }),
      F('--no-pager', [], { always: true }),
    ],
  },
  curl: {
    head: 'curl', args: ['url'],
    flags: [
      F('-I', ['headers', 'head request', 'naglowk'], { group: 'm' }),
      F('-L', ['follow redirect', 'redirects', 'przekierowan']),
      F('-s', ['silent', 'quiet', 'cicho', 'bez paska']),
      F('-O', ['download', 'save', 'pobierz', 'zapisz'], { group: 'out' }),
      F('-v', ['verbose', 'debug', 'szczegol']),
      F('-k', ['insecure', 'ignore certificate', 'self-signed', 'bez weryfikacji', 'ignoruj certyfikat']),
      F('--compressed', ['compressed', 'gzip', 'kompresj']),
    ],
  },
  chmod: {
    head: 'chmod', args: ['mode', 'path'],
    flags: [F('-R', ['recursive', 'recursively', 'everything inside', 'rekurenc', 'wszystko w srodku', 'cal']), F('-v', ['verbose', 'szczegol'])],
  },
};

// tldr-derived weak triggers: { head: { flag: [stems] } } (CC-BY-4.0 tldr-pages, see DATA_LICENSES.md)
let TLDR = null;
function tldrTriggers() {
  if (TLDR) return TLDR;
  try { TLDR = JSON.parse(readFileSync(new URL('../model/tldr_triggers.json', import.meta.url), 'utf8')); } catch { TLDR = {}; }
  return TLDR;
}

const FAMILY_TOOL = { ls: 'ls', find: 'find', grep: 'grep', du: 'du', df: 'df', ps: 'ps', tar: 'tar', sort: 'sort',
  head: 'head', tail: 'tail', wc: 'wc', git: 'git', docker: 'docker', ss: 'ss', journalctl: 'journalctl', curl: 'curl', chmod: 'chmod' };
export const composerTools = () => Object.keys(FAMILY_TOOL);

function triggerScore(fq, triggers) {
  let best = 0;
  for (const t of triggers) {
    const whole = t.endsWith('$');
    const w = foldKeepLength(whole ? t.slice(0, -1) : t).toLowerCase();
    const re = new RegExp(`\\s${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}${whole ? '\\s' : ''}`);
    if (re.test(fq)) best = Math.max(best, 1 + Math.min(w.length, 20) / 100);
  }
  return best;
}
const STOP = new Set('the a an of in on to for and or with by from all show list display me my files file plik pliki w z na do i oraz pokaz wyswietl'.split(' '));
function tldrScore(fq, stems) {
  if (!stems?.length) return 0;
  const toks = new Set(fq.trim().split(/\s+/).filter((t) => t.length > 2 && !STOP.has(t)).map((t) => t.slice(0, 5)));
  let hit = 0;
  for (const s of stems) if (toks.has(s)) hit++;
  return hit >= 2 ? 0.5 * hit : 0;
}

function selectFlags(fq, spec, head, sub) {
  const tl = tldrTriggers()[head + (sub ? ' ' + sub : '')] || {};
  const scored = spec.flags.map((f) => ({ ...f, score: f.always || f.implied || f.compress ? 1 : triggerScore(fq, f.triggers) + tldrScore(fq, tl[f.flag]) }))
    .filter((f) => f.score >= 1);
  // one flag per exclusive group (highest score, then earliest in vocabulary)
  const out = [];
  const groups = new Set();
  for (const f of scored.sort((a, b) => b.score - a.score)) {
    if (f.group) { if (groups.has(f.group)) continue; groups.add(f.group); }
    out.push(f);
  }
  return out.sort((a, b) => spec.flags.indexOf(spec.flags.find((x) => x.flag === a.flag)) - spec.flags.indexOf(spec.flags.find((x) => x.flag === b.flag)));
}

/** Flags whose triggers fire for this request with `toolFamily`'s vocabulary (used to build the explained-flags table). */
export function triggeredFlags(query, toolFamily) {
  const tn = FAMILY_TOOL[toolFamily];
  if (!tn) return [];
  const fq = fold(query);
  const spec = TOOLS[tn];
  const subs = spec.sub ? Object.entries(spec.sub) : [[null, spec]];
  const out = [];
  for (const [sub, fspec] of subs) {
    for (const f of selectFlags(fq, fspec, spec.head, sub)) if (!f.always && !f.implied && !f.compress) out.push((sub ? sub + ' ' : '') + f.flag);
  }
  return out;
}

/** Validate a composed command: flags must come from the tool vocabulary; POSIX syntax via `bash -n`. */
export function validateComposed(cmd, toolName, sub) {
  const spec = TOOLS[toolName];
  const vocab = new Set((sub ? spec.sub[sub].flags : spec.flags).flatMap((f) => f.flag.split(' ')[0]));
  if (spec.filters) for (const x of ['-name', '-iname', '-mtime', '-mmin', '-size', '-type', '-maxdepth', '-empty', '-newer', '-print0', 'f', 'd', 'l']) vocab.add(x);
  const words = cmd.match(/'(?:[^']|'\\'')*'|\S+/g) || [];
  // flags that take an operand must have one (find -newer FILE, grep -A N, ...)
  const needsArg = new Set((sub ? spec.sub[sub].flags : spec.flags).filter((f) => f.value && !f.flag.startsWith('--')).map((f) => f.flag));
  if (spec.filters) for (const x of ['-name', '-iname', '-mtime', '-mmin', '-size', '-type', '-maxdepth', '-newer', '-user']) needsArg.add(x);
  for (let i = sub ? 2 : 1; i < words.length; i++) {
    if (!needsArg.has(words[i])) continue;
    const next = words[i + 1];
    if (next == null || (/^-[a-z]/i.test(next) && !/^-\d/.test(next))) return { ok: false, error: `${words[i]} needs an operand` };
    i++;
  }
  for (const w of words.slice(sub ? 2 : 1)) {
    if (!/^-/.test(w)) continue;
    const base = w.replace(/=.*$/, '');
    if (!vocab.has(w) && !vocab.has(base) && !/^-\d+$/.test(w) && !/^[-+]\d/.test(w)) return { ok: false, error: `flag ${w} not in the ${toolName} vocabulary` };
  }
  const r = spawnSync('bash', ['-n', '-c', cmd], { encoding: 'utf8', timeout: 2000 });
  if (r.error) return { ok: true, syntax: 'skipped (bash not found)' };
  if (r.status !== 0) return { ok: false, error: `bash -n: ${r.stderr.trim()}` };
  return { ok: true, syntax: 'bash -n ok' };
}

/**
 * @param query   request text
 * @param tools   stage-1 candidates [{tool, p}] (top-3)
 * @param ex      slot extraction for the query (regex+tagger merge): { paths, count, size, duration, ext, quoted, ... }
 * @param patternOf callback(toolFamily) -> pattern text (tagger PATTERN / quoted) or null
 * -> null | { command, tool, sub, flags, risk, warnings, validation, experimental: true }
 */
export function compose(query, tools, ex, { patternOf, nameOf } = {}) {
  const fq = fold(query);
  let best = null;
  for (const { tool: fam, p } of tools) {
    const tn = FAMILY_TOOL[fam];
    if (!tn) continue;
    const spec = TOOLS[tn];
    let sub = null;
    let fspec = spec;
    if (spec.sub) {
      let bs = 0;
      for (const [name, s] of Object.entries(spec.sub)) {
        const sc = triggerScore(fq, s.triggers);
        if (sc > bs) { bs = sc; sub = name; }
      }
      if (!sub) continue;
      fspec = spec.sub[sub];
    }
    const flags = selectFlags(fq, fspec, spec.head, sub);
    const hits = flags.filter((f) => !f.always && !f.implied && !f.compress).length;
    const score = p * (1 + hits);
    if (!best || score > best.score) best = { score, tn, sub, fspec, flags, p, hits };
  }
  if (!best || best.hits === 0) return null;
  const { tn, sub, fspec, flags } = best;
  const spec = TOOLS[tn];
  const parts = [spec.head];
  if (sub) parts.push(sub);
  const q = shQuote;
  const valueOf = (kind) => {
    switch (kind) {
      case 'count': return ex.count != null ? String(ex.count) : null;
      case 'depth': return ex.count != null && ex.count <= 20 ? String(ex.count) : '1';
      case 'user': return nameOf?.('USER') || null;
      case 'name': return nameOf?.('NAME') || null;
      case 'since': return ex.duration?.since ? q(ex.duration.since) : null;
      case 'dest': return ex.paths[1] ? q(ex.paths[1]) : null;
      case 'sep': {
        const m = query.match(/(?:by|przez)\s+(['"]?)([,;:|\t])\1/);
        if (m) return q(m[2]);
        const w = fq.match(/\b(comma|przecin\w*|semicolon|srednik\w*|colon|dwukrop\w*|tab\w*|pipe)\b/);
        return w ? q({ c: ',', p: ',', s: ';', d: ':', t: '\t' }[/^(comma|przec)/.test(w[1]) ? 'c' : /^(semi|sred)/.test(w[1]) ? 's' : /^(colon|dwuk)/.test(w[1]) ? 'd' : /^tab/.test(w[1]) ? 't' : 'p'] || '|') : null;
      }
      case 'column': {
        const ord = fq.match(/\b(first|second|third|fourth|fifth|pierwsz\w*|drug\w*|trzeci\w*|czwart\w*|piat\w*)\b/);
        if (ord) return String(['fir', 'sec', 'thi', 'fou', 'fif'].indexOf(ord[1].slice(0, 3)) + 1 || ['pie', 'dru', 'trz', 'czw', 'pia'].indexOf(ord[1].slice(0, 3)) + 1);
        return ex.count != null ? String(ex.count) : null;
      }
      case 'lines': {
        if (ex.count == null) return null;
        return /\b(from line|starting at line|od linii|od wiersza|poczawszy od)\b/.test(fq) ? `+${ex.count}` : String(ex.count);
      }
      case 'newer': return newerRef ? q(newerRef) : null;
      case 'fstype': { const m = fq.match(/\b(ext[234]|xfs|btrfs|tmpfs|nfs4?|vfat|ntfs|zfs|apfs|overlay|squashfs)\b/); return m ? m[1] : null; }
      case 'fname': {
        const m = query.match(/(?:named|called|nazwan\w*|o nazwie|nazywaj\w* si[eę])\s+["']?([\w.*?-]+)/i);
        return m ? q(m[1]) : nameOf?.('NAME') ? q(nameOf('NAME')) : null;
      }
      case 'user': {
        const m = query.match(/(?:user|owned by|belonging to|u[zż]ytkownik\w*|w[lł]a[sś]ciciel\w*|nale[zż][aą]ce do)\s+([a-z_][\w-]*)/i);
        return m ? m[1] : nameOf?.('USER') || null;
      }
      default: return null;
    }
  };
  // find -newer FILE: the reference file is the operand of -newer, never the search root
  const newerRef = tn === 'find' ? (() => {
    const m = query.match(/(?:newer than|nowsze? niż|nowsze? niz|nowszych niż|nowszych niz|nowszy niż|nowszy niz)\s+["'„]?([^\s"'”]+)/i);
    return m ? (ex.paths.find((p) => p === m[1] || m[1].startsWith(p)) || m[1]) : null;
  })() : null;
  const used = [];
  const archive = ex.paths.find((x) => /\.(tar(\.\w+)?|tgz|tbz2?|txz)$/.test(x));
  for (const f of flags) {
    if (f.compress) { if (archive && f.compress.test(archive)) { parts.push(f.flag); used.push(f.flag); } continue; }
    if (f.value) {
      const v = valueOf(f.value);
      if (v == null) continue;
      if (f.flag.startsWith('--')) parts.push(`${f.flag}=${v}`);
      else parts.push(f.flag, v);
    } else if (f.flag === '-f' && tn === 'tar') {
      continue; // added with the archive below
    } else parts.push(f.flag);
    used.push(f.flag);
  }
  // tool-specific arguments
  const paths = ex.paths.filter((p) => p !== newerRef);
  if (tn === 'find') {
    parts.splice(1, 0, q(paths[0] || '.'));
    if (ex.ext && !used.includes('-name')) parts.push(used.includes('-iname') ? '-iname' : '-name', q(`*.${ex.ext}`));
    if (ex.duration) parts.push(ex.duration.age.split(' ')[0], ex.duration.age.split(' ')[1]);
    if (ex.size) parts.push('-size', (/\b(smaller|less|under|below|mniejsz|ponizej)\b/.test(fq) ? '-' : '+') + ex.size);
    // move -maxdepth right after the path (find warns otherwise)
    const i = parts.indexOf('-maxdepth');
    if (i > 2) { const v = parts.splice(i, 2); parts.splice(2, 0, ...v); }
  } else if (tn === 'grep') {
    const pat = patternOf?.() ?? null;
    if (!pat) return null;
    if (ex.ext && used.includes('-r')) parts.push(`--include=${q(`*.${ex.ext}`)}`);
    parts.push('--', q(pat));
    if (paths.length) parts.push(...paths.map(q));
    else if (used.includes('-r')) parts.push('.');
  } else if (tn === 'tar') {
    const arch = paths.find((x) => /\.(tar(\.\w+)?|tgz|tbz2?|txz)$/.test(x));
    if (!arch) return null;
    parts.push('-f', q(arch));
    const rest = paths.filter((x) => x !== arch && !(used.includes('-C') && x === paths[1]));
    if (used.includes('-c')) parts.push(...(rest.length ? rest : ['.']).map(q));
  } else if (tn === 'chmod') {
    if (!ex.mode || !paths.length) return null;
    parts.push(ex.mode, ...paths.map(q));
  } else if (tn === 'curl') {
    const url = ex.urls?.[0] || (ex.hosts?.[0] ? `https://${ex.hosts[0]}` : null);
    if (!url) return null;
    parts.push(q(url));
  } else if ((fspec.args || []).includes('ref')) {
    const ref = nameOf?.('BRANCH') || query.match(/(?:against|compared to|vs\.?|w stosunku do|wzgl[eę]dem|do)\s+([\w./-]+)\s*$/i)?.[1];
    if (ref) parts.push(q(ref));
    else if (paths.length) parts.push('--', ...paths.map(q));
  } else if ((fspec.args || []).includes('path') || (fspec.args || []).includes('file')) {
    if (paths.length) parts.push(...paths.slice(0, 2).map(q));
    else if ((fspec.args || []).includes('file') && !['ls', 'du', 'df'].includes(tn)) return null;
  }
  const command = parts.join(' ');
  const validation = validateComposed(command, tn, sub);
  if (!validation.ok) return { command, tool: tn, sub, flags: used, invalid: validation.error, experimental: true };
  const d = checkDanger(command, 'medium');
  const triggered = flags.filter((f) => !f.always && !f.implied && !f.compress).map((f) => f.flag).filter((f) => used.includes(f));
  return { command, tool: tn, sub, flags: used, triggered, risk: maxRisk('medium', d.risk), warnings: d.warnings, critical: d.critical, validation, experimental: true };
}

exec
/bin/bash -lc 'cat src/tagger.js src/env.js src/model.js src/cascade.js src/classifier.js bin/tellsh.js; cat src/features.js' in /workspace/tellsh
 succeeded in 0ms:
// Stage 3: per-token BIO slot tagger (linear model over token features, tool as input feature),
// decoded with a constrained Viterbi: only tag types valid for the chosen tool are candidates and
// I-X may only follow B-X / I-X. Tagged spans are normalised with the regex parsers in slots.js.
import { tagTokens, tagFeatures } from './features.js';
import { logits } from './model.js';
import { extractSlots, KNOWN_EXT, EXT_ALIASES, KNOWN_PROCS, KNOWN_SERVICES, foldKeepLength, isStopWord, deinflect } from './slots.js';
import { familyTags } from './tools.js';
import { BY_ID } from './catalog.js';

let FAM_TAGS = null;
export const allowedTags = (tool) => {
  FAM_TAGS ??= familyTags(BY_ID);
  return FAM_TAGS[tool] || new Set(['PATH', 'NUM']);
};

/** -> { tokens, labels, spans: [{type, start, end, text}] } */
export function tag(text, tool, model) {
  const m = model.models.tagger;
  const toks = tagTokens(text);
  if (!toks.length || !m) return { tokens: toks, labels: [], spans: [] };
  const feats = tagFeatures(toks, tool, model.tagDim);
  const L = m.labels;
  const allowed = allowedTags(tool);
  const ok = L.map((l) => l === 'O' || allowed.has(l.slice(2)));
  const scores = feats.map((f) => {
    const z = logits(m, f);
    // log-softmax so Viterbi sums are comparable
    let max = -Infinity;
    for (let c = 0; c < z.length; c++) if (ok[c] && z[c] > max) max = z[c];
    let s = 0;
    for (let c = 0; c < z.length; c++) if (ok[c]) s += Math.exp(z[c] - max);
    const lse = max + Math.log(s);
    return Array.from(z, (v, c) => (ok[c] ? v - lse : -Infinity));
  });
  const n = toks.length;
  const C = L.length;
  const canFollow = (prev, cur) => {
    const lc = L[cur];
    if (!lc.startsWith('I-')) return true;
    if (prev < 0) return false;
    const lp = L[prev];
    return lp !== 'O' && lp.slice(2) === lc.slice(2);
  };
  const dp = Array.from({ length: n }, () => new Float64Array(C).fill(-Infinity));
  const bp = Array.from({ length: n }, () => new Int16Array(C).fill(-1));
  for (let c = 0; c < C; c++) if (canFollow(-1, c)) dp[0][c] = scores[0][c];
  for (let i = 1; i < n; i++) {
    for (let c = 0; c < C; c++) {
      if (scores[i][c] === -Infinity) continue;
      let best = -Infinity;
      let arg = -1;
      for (let p = 0; p < C; p++) {
        if (dp[i - 1][p] === -Infinity || !canFollow(p, c)) continue;
        if (dp[i - 1][p] > best) { best = dp[i - 1][p]; arg = p; }
      }
      if (arg >= 0) { dp[i][c] = best + scores[i][c]; bp[i][c] = arg; }
    }
  }
  let last = 0;
  for (let c = 1; c < C; c++) if (dp[n - 1][c] > dp[n - 1][last]) last = c;
  const path = new Array(n);
  path[n - 1] = last;
  for (let i = n - 1; i > 0; i--) path[i - 1] = bp[i][path[i]] >= 0 ? bp[i][path[i]] : 0;
  const labels = path.map((c) => L[c]);
  return { tokens: toks, labels, spans: snapToQuotes(text, labelsToSpans(text, toks, labels)) };
}

// a span inside a quoted string covers the whole string ('my file.txt' is one PATH, not two)
function snapToQuotes(text, spans) {
  const quoted = extractSlots(text).spans.filter((s) => s.type === 'QUOTED');
  if (!quoted.length) return spans;
  const out = [];
  for (const sp of spans) {
    const q = quoted.find((r) => sp.start < r.end && r.start < sp.end);
    if (!q) { out.push(sp); continue; }
    if (out.some((o) => o.start === q.start && o.end === q.end)) continue;
    out.push({ type: sp.type, start: q.start, end: q.end, text: text.slice(q.start, q.end), quoted: true });
  }
  return out;
}

export function labelsToSpans(text, toks, labels) {
  const spans = [];
  let cur = null;
  labels.forEach((l, i) => {
    if (l.startsWith('B-') || (l.startsWith('I-') && (!cur || cur.type !== l.slice(2)))) {
      if (cur) spans.push(cur);
      cur = { type: l.slice(2), start: toks[i].start, end: toks[i].end };
    } else if (l.startsWith('I-')) {
      cur.end = toks[i].end;
    } else {
      if (cur) spans.push(cur);
      cur = null;
    }
  });
  if (cur) spans.push(cur);
  for (const s of spans) s.text = text.slice(s.start, s.end);
  return spans;
}

// ---------- span normalisation (regex parsers reused on the span text) ----------

// generic nouns the tagger sometimes marks as a bare directory name ("ile zajmuje folder /etc")
const GENERIC = /^(folder\w*|katalog\w*|director(y|ies)|dirs?|files?|plik\w*|archiw\w*|archives?|the|this|that|ten|ta|to|tego|tym|it|path|sciezk\w*|repo|project|projekt\w*|system\w*|dysk\w*|disk|location|lokalizacj\w*|miejsc\w*)$/;

export function normPath(s) {
  const t = s.replace(/[.,;:!?]+$/, '');
  if (GENERIC.test(foldKeepLength(t).toLowerCase())) return null;
  const ex = extractSlots(t);
  if (ex.paths.length === 1) return ex.paths[0];
  if (/^[\w~./@+-][\w~./@+ -]*$/.test(t) && !/\s/.test(t)) return t;
  return null;
}
export function normExt(s) {
  const t = foldKeepLength(s).replace(/^\*?\./, '').toLowerCase();
  if (KNOWN_EXT.has(t)) return t;
  if (EXT_ALIASES[t]) return EXT_ALIASES[t];
  return /^[a-z0-9]{1,6}$/.test(t) ? t : null;
}
export function normNum(s) {
  const ex = extractSlots(s);
  if (ex.numbers.length === 1) return ex.numbers[0];
  return null;
}

const VALID = {
  NAME: (v) => /^[\w@.:+-]{1,64}$/.test(v),
  BRANCH: (v) => /^(?!-)[\w./-]{1,100}$/.test(v) && !/\.\.|\/$|\.lock$/.test(v),
  USER: (v) => /^[a-z_][\w.-]{0,31}$/i.test(v),
  VAR: (v) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(v),
  HOST: (v) => /^([\w.-]+@)?[\w.-]+$/.test(v) && /[a-z0-9]/i.test(v),
  URL: (v) => /^(https?|ftp|ssh|git):\/\/\S+$|^www\.\S+$|^git@[\w.-]+:\S+$/.test(v),
  PATTERN: (v) => v.length > 0 && v.length < 200 && !/\n/.test(v),
  REPL: (v) => v.length < 200 && !/\n/.test(v),
  MSG: (v) => v.length > 0 && v.length < 300,
  TEXT: (v) => v.length > 0 && v.length < 500,
};
const unquote = (s) => s.replace(/^["'„“`](.*)["'”`]$/s, '$1');

/**
 * Build an extractSlots()-shaped object from tagger spans only (no regex fallbacks), so the same
 * resolveSlots() logic can map it onto an intent. Invalid span values are dropped here (validation).
 */
export function exFromSpans(text, spans) {
  const ex = { text, quoted: [], urls: [], hosts: [], paths: [], pathsWithQuoted: [], numbers: [], words: [], rest: '', tagged: {}, taggerOnly: true, spans };
  const push = (k, v) => { (ex.tagged[k] ??= []).push(v); };
  for (const sp of spans) {
    const raw = unquote(sp.text.trim());
    switch (sp.type) {
      case 'PATH': { const p = sp.quoted ? raw : normPath(raw); if (p) { ex.paths.push(p); ex.pathsWithQuoted.push(p); } break; }
      case 'NUM': { const n = normNum(raw); if (n != null) { ex.numbers.push(n); ex.count ??= n; } break; }
      case 'SIZE': { const e = extractSlots(raw); if (e.size) ex.size ??= e.size; break; }
      case 'TIME': { const e = extractSlots(raw); if (e.duration) ex.duration ??= e.duration; break; }
      case 'PORT': { const n = +raw.replace(/^:/, ''); if (Number.isInteger(n) && n > 0 && n < 65536) ex.port ??= n; break; }
      case 'PID': { const n = +raw; if (Number.isInteger(n) && n > 0) ex.pid ??= n; break; }
      case 'MODE': if (/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(raw)) ex.mode ??= raw; break;
      case 'EXT': { const e = normExt(raw); if (e) ex.ext ??= e; break; }
      case 'URL': if (VALID.URL(raw)) { ex.urls.push(raw); } break;
      case 'HOST': if (VALID.HOST(raw) && !isStopWord(raw)) { ex.hosts.push(raw.includes('@') ? raw.split('@')[1] : raw); if (raw.includes('@')) ex.target ??= raw; } break;
      case 'NAME': {
        if (!VALID.NAME(raw) || isStopWord(raw)) break;
        const f = foldKeepLength(raw).toLowerCase();
        push('NAME', KNOWN_PROCS.has(f) || KNOWN_SERVICES.has(f) ? raw : deinflect(f, KNOWN_PROCS) || deinflect(f, KNOWN_SERVICES) || raw);
        break;
      }
      case 'BRANCH': case 'USER': if (VALID[sp.type](raw) && !isStopWord(raw) && !/^(origin|upstream)$/.test(raw)) push(sp.type, raw); break;
      default: if (VALID[sp.type]?.(raw)) push(sp.type, raw);
    }
  }
  return ex;
}
// Detect the target shell, OS and coreutils flavour (GNU / BSD / busybox). Results are fed to the
// classifiers as `shell=X os=Y` tokens and select the per-shell rendering of the command.
import { existsSync, readFileSync, readlinkSync, realpathSync } from 'node:fs';
import { join, basename, delimiter } from 'node:path';

export const SHELLS = ['bash', 'zsh', 'sh', 'powershell', 'fish', 'cmd'];
export const OSES = ['linux', 'darwin', 'win32'];
export const POSIX_SHELLS = new Set(['bash', 'zsh', 'sh']);

const SHELL_ALIASES = {
  bash: 'bash', zsh: 'zsh', sh: 'sh', dash: 'sh', ash: 'sh', busybox: 'sh', ksh: 'sh', mksh: 'sh',
  pwsh: 'powershell', powershell: 'powershell', 'powershell.exe': 'powershell', 'pwsh.exe': 'powershell', ps: 'powershell',
  fish: 'fish', cmd: 'cmd', 'cmd.exe': 'cmd',
};
export function normShell(s) {
  if (!s) return null;
  return SHELL_ALIASES[basename(String(s)).toLowerCase().replace(/^-/, '')] || null;
}
export function normOs(s) {
  if (!s) return null;
  const v = String(s).toLowerCase();
  if (/^(linux|gnu)/.test(v)) return 'linux';
  if (/^(darwin|mac|macos|osx)/.test(v)) return 'darwin';
  if (/^(win|windows|win32)/.test(v)) return 'win32';
  return null;
}

function parentComm(pid) {
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, 'utf8');
    const m = stat.match(/^\d+ \((.*)\) \S (\d+)/s);
    return m ? { comm: m[1], ppid: +m[2] } : null;
  } catch { return null; }
}

/** Shell that launched us: parent process chain (Linux /proc), PowerShell env heuristic, then $SHELL. */
export function detectShell(env = process.env, os = process.platform) {
  if (env.TELLSH_SHELL) return normShell(env.TELLSH_SHELL) || 'bash';
  if (os === 'linux') {
    let pid = process.ppid;
    for (let i = 0; i < 4 && pid > 1; i++) {
      const p = parentComm(pid);
      if (!p) break;
      const sh = normShell(p.comm);
      if (sh) return sh;
      pid = p.ppid; // e.g. npx / npm / node wrappers
    }
  }
  if (os === 'win32') {
    // PowerShell adds its per-user module dirs to PSModulePath; cmd.exe leaves only the system entry.
    const psm = (env.PSModulePath || '').split(';').filter(Boolean);
    if (psm.length >= 3 || /\\Documents\\(Windows)?PowerShell\\Modules/i.test(env.PSModulePath || '')) return 'powershell';
    if (env.SHELL && normShell(env.SHELL)) return normShell(env.SHELL); // Git Bash / MSYS
    return 'cmd';
  }
  return normShell(env.SHELL) || 'sh';
}

function onPath(name, env = process.env) {
  for (const dir of (env.PATH || '').split(delimiter)) {
    if (dir && existsSync(join(dir, name))) return true;
  }
  return false;
}

/** gnu | bsd | busybox. macOS = BSD unless Homebrew GNU coreutils (gdu/gsort) are installed. */
export function detectCoreutils(os = process.platform, env = process.env) {
  if (env.TELLSH_COREUTILS) return env.TELLSH_COREUTILS;
  if (os === 'darwin') return onPath('gdu', env) && onPath('gsort', env) ? 'gnu' : 'bsd';
  if (os === 'linux') {
    try {
      const ls = ['/bin/ls', '/usr/bin/ls'].find((p) => existsSync(p));
      if (ls) {
        const real = realpathSync(ls);
        if (/busybox/.test(real) || /busybox/.test(readlinkSync(ls, { encoding: 'utf8' }).toString())) return 'busybox';
      }
    } catch { /* not a symlink */ }
    return 'gnu';
  }
  return 'gnu';
}

/** -> { shell, os, coreutils, detected: {shell, os} } honouring --shell / --os overrides */
export function detectEnv({ shell, os } = {}, env = process.env) {
  const realOs = process.platform === 'darwin' || process.platform === 'win32' ? process.platform : 'linux';
  const o = normOs(os) || (normShell(shell) === 'cmd' ? 'win32' : realOs);
  const s = normShell(shell) || (o === realOs ? detectShell(env, realOs) : o === 'win32' ? 'powershell' : 'bash');
  const coreutils = o === realOs ? detectCoreutils(o, env) : o === 'darwin' ? 'bsd' : 'gnu';
  return { shell: s, os: o, coreutils };
}

/** classifier context tokens */
export const envFeatures = (e) => [`shell=${e.shell}`, `os=${e.os}`];
// Model file (TSH2): several sparse int8 linear models in one binary, written by scripts/train.py.
//   'TSH2' | u32 header length | JSON header | per model: u32 rowIds[rows] f32 scale[C] f32 bias[C] i8 W[rows*C] (pad 4)
// Rows are sorted hash indices; lookup is a binary search, so loading needs no Map construction.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const DEFAULT_MODEL = fileURLToPath(new URL('../model/model.bin', import.meta.url));

export function loadModel(path = DEFAULT_MODEL) {
  const buf = readFileSync(path);
  if (buf.toString('latin1', 0, 4) !== 'TSH2') throw new Error(`bad model file (expected TSH2): ${path}`);
  const hlen = buf.readUInt32LE(4);
  const header = JSON.parse(buf.toString('utf8', 8, 8 + hlen));
  const ab = buf.buffer.slice(buf.byteOffset + 8 + hlen, buf.byteOffset + buf.length);
  const models = {};
  for (const [name, m] of Object.entries(header.models)) {
    const C = m.labels.length;
    let off = m.offset;
    const rowIds = new Uint32Array(ab, off, m.rows); off += m.rows * 4;
    const scale = new Float32Array(ab, off, C); off += C * 4;
    const bias = new Float32Array(ab, off, C); off += C * 4;
    const weights = new Int8Array(ab, off, m.rows * C);
    models[name] = { name, labels: m.labels, classes: C, rowIds, scale, bias, weights };
  }
  return { ...header, models, size: buf.length };
}

let cached = null;
export function getModel() {
  if (!cached) cached = loadModel();
  return cached;
}

function findRow(rowIds, idx) {
  let lo = 0;
  let hi = rowIds.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const v = rowIds[mid];
    if (v === idx) return mid;
    if (v < idx) lo = mid + 1; else hi = mid - 1;
  }
  return -1;
}

/** Raw scores (logits) for a sparse input: iterable of [index, value] pairs, or of bare indices (value 1). */
export function logits(m, feats) {
  const { classes: C, rowIds, weights, scale, bias } = m;
  const acc = new Float64Array(C);
  for (const f of feats) {
    const idx = typeof f === 'number' ? f : f[0];
    const val = typeof f === 'number' ? 1 : f[1];
    const r = findRow(rowIds, idx);
    if (r < 0) continue;
    const base = r * C;
    for (let c = 0; c < C; c++) acc[c] += val * weights[base + c];
  }
  for (let c = 0; c < C; c++) acc[c] = acc[c] * scale[c] + bias[c];
  return acc;
}

export function softmax(z) {
  let max = -Infinity;
  for (const v of z) if (v > max) max = v;
  const out = new Float64Array(z.length);
  let sum = 0;
  for (let i = 0; i < z.length; i++) { out[i] = Math.exp(z[i] - max); sum += out[i]; }
  for (let i = 0; i < z.length; i++) out[i] /= sum;
  return out;
}

export const predictProba = (m, feats) => softmax(logits(m, feats));
// Stages 1+2 of the cascade.
//   stage 1: p(tool | request, shell/os/ctx tokens)          -> top-k tool families (k = 3)
//   stage 2: p(intent | request, tool) inside each candidate -> score = p(tool) * p(intent | tool)
// The best score over all candidate tools wins, so a stage-1 mistake ranked 2nd/3rd can still be recovered.
import { getModel, predictProba } from './model.js';
import { vectorize } from './features.js';
import { NONE } from './tools.js';

/**
 * -> { intent, tool, confidence, top: [{intent, tool, p, pTool, pIntent}], tools: [{tool, p}],
 *      topTool, topToolP, pNone }
 */
export function cascade(text, { model = getModel(), extras = [], k = 3, top = 3, restrictTool } = {}) {
  const feats = [...vectorize(text, model.dim, extras)];
  const tm = model.models.tool;
  const pt = predictProba(tm, feats);
  const order = Array.from(pt.keys()).sort((a, b) => pt[b] - pt[a]);
  const noneIdx = tm.labels.indexOf(NONE);
  // restrictTool: stage 2 only inside one family (history "same but ..." refers to the previous tool)
  if (restrictTool) { const i = tm.labels.indexOf(restrictTool); pt[i] = 1; order.splice(order.indexOf(i), 1); order.unshift(i); }
  const cands = restrictTool ? [tm.labels.indexOf(restrictTool)] : order.filter((i) => i !== noneIdx).slice(0, k);
  const scored = [];
  for (const i of cands) {
    const fam = tm.labels[i];
    const im = model.models['intent:' + fam];
    if (im) {
      const pi = predictProba(im, feats);
      im.labels.forEach((l, j) => scored.push({ intent: l, tool: fam, p: pt[i] * pi[j], pTool: pt[i], pIntent: pi[j] }));
    } else {
      for (const l of model.intentsByFamily[fam] || []) scored.push({ intent: l, tool: fam, p: pt[i], pTool: pt[i], pIntent: 1 });
    }
  }
  scored.sort((a, b) => b.p - a.p);
  const best = scored[0] || { intent: null, tool: null, p: 0 };
  return {
    intent: best.intent,
    tool: best.tool,
    confidence: best.p,
    top: scored.slice(0, Math.max(1, top)),
    tools: order.slice(0, k).map((i) => ({ tool: tm.labels[i], p: pt[i] })),
    topTool: tm.labels[order[0]],
    topToolP: pt[order[0]],
    pNone: noneIdx >= 0 ? pt[noneIdx] : 0,
  };
}
// Compatibility wrapper (v0.1 API): classify(text) on top of the v0.2 cascade.
import { getModel, loadModel, DEFAULT_MODEL } from './model.js';
import { cascade } from './cascade.js';

export { getModel, loadModel, DEFAULT_MODEL };

// -> { intent, confidence, confident, threshold, top: [{intent, p}] }
export function classify(text, { top = 3, model = getModel(), threshold, extras = [] } = {}) {
  const c = cascade(text, { model, top, extras });
  const thr = threshold ?? model.thresholds.accept;
  return {
    intent: c.intent,
    tool: c.tool,
    confidence: c.confidence,
    confident: c.confidence >= thr,
    threshold: thr,
    top: c.top.map((t) => ({ intent: t.intent, p: t.p })),
    tools: c.tools,
  };
}
#!/usr/bin/env node
import { main } from '../src/cli.js';

main().then((code) => { process.exitCode = code; }, (err) => {
  console.error(`tellsh: ${err?.stack || err}`);
  process.exitCode = 1;
});
// Feature extraction for all models. This is the single source of truth: scripts/gen_data.js uses
// these same functions to featurise the training data that scripts/train.py fits, so training and
// inference can never drift apart (test/parity.test.js checks the exported weights reproduce Python).
import { KNOWN_EXT, KNOWN_PROCS, KNOWN_SERVICES, foldKeepLength } from './slots.js';

export const STEM_LEN = 5;
export const CHAR_MIN = 3;
export const CHAR_MAX = 5;

// lowercase, fold Polish/Latin diacritics, digits -> 0, keep [a-z0-9] tokens
export function normalize(text) {
  let s = String(text).toLowerCase().replace(/ł/g, 'l');
  s = s.normalize('NFD').replace(/[̀-ͯ]/g, '');
  s = s.replace(/[0-9]+/g, '0');
  s = s.replace(/[^a-z0-9]+/g, ' ').trim();
  return s;
}

export function tokenize(text) {
  const s = normalize(text);
  return s ? s.split(' ') : [];
}

const stem = (t) => (t.length > STEM_LEN ? t.slice(0, STEM_LEN) : t);

// FNV-1a 32-bit over UTF-16 code units (feature names are ASCII after normalisation)
export function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i) & 0xff;
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Returns { words, chars } — feature names before hashing.
export function featureNames(text) {
  const toks = tokenize(text);
  const words = [];
  const chars = [];
  const stems = toks.map(stem);
  for (let i = 0; i < stems.length; i++) {
    words.push('w:' + stems[i]);
    if (i + 1 < stems.length) words.push('b:' + stems[i] + '_' + stems[i + 1]);
  }
  for (const t of toks) {
    const p = ' ' + t + ' ';
    for (let n = CHAR_MIN; n <= CHAR_MAX; n++) {
      for (let i = 0; i + n <= p.length; i++) chars.push('c:' + p.slice(i, i + n));
    }
  }
  return { words, chars };
}

/**
 * Sparse classifier vector: Map<hashIndex, value>. Blocks (words, chars, extras) are counted then
 * L2-normalised separately. `extras` are context tokens such as `shell=bash`, `os=linux`,
 * `ctx_tool=docker` (shell/OS/history features).
 */
export function vectorize(text, dim, extras = []) {
  const { words, chars } = featureNames(text);
  const out = new Map();
  const blocks = [words, chars];
  if (extras.length) blocks.push(extras.map((e) => 'x:' + e));
  for (const block of blocks) {
    const counts = new Map();
    for (const f of block) {
      const idx = fnv1a(f) % dim;
      counts.set(idx, (counts.get(idx) || 0) + 1);
    }
    let norm = 0;
    for (const v of counts.values()) norm += v * v;
    norm = Math.sqrt(norm) || 1;
    for (const [k, v] of counts) out.set(k, (out.get(k) || 0) + v / norm);
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// Token-level features for the BIO slot tagger.

const QUOTE_CHARS = `"'„“”\``;

/**
 * Split text into tokens with character offsets. Whitespace separates tokens; quote characters,
 * brackets and sentence punctuation at token edges become their own tokens; a trailing "." is
 * split off unless the token is a path-like "." / ".." / "x.y".
 */
export function tagTokens(text) {
  const toks = [];
  const re = /\S+/g;
  let m;
  while ((m = re.exec(text))) {
    let s = m.index;
    let w = m[0];
    const pre = [];
    const post = [];
    // peel leading punctuation/quotes
    while (w.length > 1 && /^[(\[{,;!?"'„“”`]/.test(w)) { pre.push([s, w[0]]); s++; w = w.slice(1); }
    // peel trailing punctuation/quotes and sentence dots
    for (;;) {
      if (w.length > 1 && /[)\]},;:!?"'„“”`]$/.test(w)) { post.unshift([s + w.length - 1, w.slice(-1)]); w = w.slice(0, -1); continue; }
      if (w.length > 1 && /\.$/.test(w) && !/^\.+$/.test(w) && !/\.\.$/.test(w)) { post.unshift([s + w.length - 1, '.']); w = w.slice(0, -1); continue; }
      break;
    }
    for (const [i, c] of pre) toks.push({ text: c, start: i, end: i + 1 });
    toks.push({ text: w, start: s, end: s + w.length });
    for (const [i, c] of post) toks.push({ text: c, start: i, end: i + 1 });
  }
  return toks;
}

const fold = (w) => foldKeepLength(w).toLowerCase();
function shape(w) {
  let s = '';
  for (const ch of w) {
    const c = /\p{Lu}/u.test(ch) ? 'X' : /\p{Ll}/u.test(ch) ? 'x' : /\d/.test(ch) ? 'd' : ch;
    if (s[s.length - 1] !== c || !/[Xxd]/.test(c)) s += c;
  }
  return s.slice(0, 8);
}
const NUM_WORD = /^(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|dozen|jeden|jedna|dwa|dwie|trzy|cztery|piec|pieciu|szesc|siedem|osiem|dziewiec|dziesiec|dziesieciu|pietnascie|dwadziescia|\w+nascie|\w+nastu)$/;
const TIME_UNIT = /^(min\w*|minut\w*|godz\w*|hours?|hrs?|h|dni|dnia|dzien|days?|dob\w*|tydzien|tygodni\w*|weeks?|miesi\w*|months?|lat|rok\w*|years?|ago|temu|yesterday|wczoraj\w*|today|dzis\w*)$/;
const SIZE_UNIT = /^(\d+([.,]\d+)?)?(k|m|g|t)i?b?$|^(kb|mb|gb|tb|bytes?|bajt\w*|mega\w*|giga\w*|kilo\w*)$/;
const LOC_WORD = /^(home|domow\w*|downloads?|pobran\w*|desktop|pulpi\w*|documents|dokument\w*|root|current|biezac\w*|here|tutaj|tu|everywhere|wszedzie|katalog\w*|folder\w*|directory|dir)$/;

/** Feature names for token i (binary features). `tool` is the stage-2 family (input feature). */
export function tokenFeatureNames(toks, i, tool) {
  const w = toks[i].text;
  const lw = fold(w);
  const at = (k) => (toks[k] ? fold(toks[k].text) : k < 0 ? '<s>' : '</s>');
  const st = (x) => (x.length > STEM_LEN ? x.slice(0, STEM_LEN) : x);
  const f = ['b', 'w=' + lw, 'st=' + st(lw), 'sh=' + shape(w), 'p2=' + lw.slice(0, 2), 's3=' + lw.slice(-3),
    'w-1=' + at(i - 1), 'w+1=' + at(i + 1), 'w-2=' + st(at(i - 2)), 'w+2=' + st(at(i + 2)),
    'bg-=' + st(at(i - 1)) + '|' + st(lw), 'bg+=' + st(lw) + '|' + st(at(i + 1)),
    'T=' + tool, 'T|w=' + tool + '|' + st(lw), 'T|w-1=' + tool + '|' + st(at(i - 1))];
  // inside quotes?
  let q = 0;
  for (let k = 0; k < i; k++) if (QUOTE_CHARS.includes(toks[k].text)) q ^= 1;
  if (q) f.push('inq');
  if (toks[i - 1] && QUOTE_CHARS.includes(toks[i - 1].text)) f.push('q-1');
  if (toks[i + 1] && QUOTE_CHARS.includes(toks[i + 1].text)) f.push('q+1');
  if (i === 0) f.push('first');
  if (i === toks.length - 1) f.push('last');
  if (w.includes('/')) f.push('has/');
  if (/^~/.test(w)) f.push('tilde');
  if (/^\.{1,2}\//.test(w) || w === '.' || w === '..') f.push('dotpath');
  if (/\w\.\w/.test(w)) f.push('hasdot');
  if (/^\*?\.[a-z0-9]{1,6}$/i.test(w)) f.push('dotext');
  if (/^-/.test(w)) f.push('dash');
  if (/^\d+$/.test(w)) f.push(w.length <= 2 ? 'num12' : w.length <= 4 ? 'num34' : 'num5+');
  else if (/\d/.test(w)) f.push('hasdigit');
  if (/[A-Z]/.test(w.slice(1))) f.push('innerupper');
  if (/^[A-Z_][A-Z0-9_]+$/.test(w)) f.push('allcaps');
  if (w.includes('@')) f.push('at');
  if (/:\d+$/.test(w)) f.push('colonnum');
  if (/^\w+:\/\//.test(w) || /^www\./.test(w)) f.push('url');
  if (/^[0-7]{3,4}$/.test(w) || /^[ugoa]*[+=-][rwxXst]+$/.test(w)) f.push('modeish');
  if (/[_-]/.test(w) && /\w/.test(w)) f.push('hyphen');
  if (KNOWN_PROCS.has(lw)) f.push('gz=proc');
  if (KNOWN_SERVICES.has(lw)) f.push('gz=svc');
  if (KNOWN_EXT.has(lw.replace(/^\*?\./, ''))) f.push('gz=ext');
  if (NUM_WORD.test(lw)) f.push('gz=numw');
  if (TIME_UNIT.test(lw)) f.push('gz=tunit');
  if (SIZE_UNIT.test(lw)) f.push('gz=sunit');
  if (LOC_WORD.test(lw)) f.push('gz=loc');
  return f;
}

/** Hashed indices of tagger features for every token. */
export function tagFeatures(toks, tool, dim) {
  return toks.map((_, i) => tokenFeatureNames(toks, i, tool).map((n) => fnv1a(n) % dim));
}

exec
/bin/bash -lc "rg -n 'write|mkdir|unlink|rmSync|mkdtemp|exec|spawn|test\\(' test/ scripts/check_variants.js; cat src/variants.js" in /workspace/tellsh
 succeeded in 0ms:
scripts/check_variants.js:10:import { spawnSync } from 'node:child_process';
scripts/check_variants.js:83:  const r = spawnSync(args[0], args[1], { encoding: 'utf8' });
scripts/check_variants.js:113:  if (/&&|\|\|/.test(bare)) fail(id, label, `uses && / || (not valid in Windows PowerShell 5.1): ${s}`);
scripts/check_variants.js:114:  if (ctx?.os === 'win32' && PS_ALIASES.test(bare)) fail(id, label, `uses an alias / ambiguous name: ${s}`);
scripts/check_variants.js:115:  if (ctx?.os !== 'win32' && /(^|[|;({]\s*)(kill)(\s|$)/.test(bare)) fail(id, label, `kill is an alias of Stop-Process in pwsh: ${s}`);
scripts/check_variants.js:116:  if (/(^|\s)--(\s|$)/.test(bare)) fail(id, label, `bare -- may be swallowed by PowerShell: ${s}`);
scripts/check_variants.js:151:          if (!/\{\w+(!raw)?\}/.test(seg[1])) fail(intent.id, label, `optional segment without slot: «${seg[1]}»`);
scripts/check_variants.js:177:      if (key === 'fish' && /\$\(|\$\{|`/.test(rendered)) fail(intent.id, label, `POSIX-only syntax in fish: ${rendered}`);
test/slot-cases.js:3:  ['largest_files', 'pokaż 5 największych plików w ~/Pobrane', 'find ~/Pobrane -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 5'],
test/slot-cases.js:4:  ['largest_files', 'top twenty biggest files in /var/log', 'find /var/log -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 20'],
test/slot-cases.js:5:  ['largest_files', 'piętnaście największych plików', 'find . -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 15'],
test/slot-cases.js:16:  ['find_larger_than', 'files bigger than 100 mb in /home', 'find /home -type f -size +100M -exec ls -lh {} +'],
test/slot-cases.js:17:  ['find_larger_than', 'pliki większe niż 1,5 GB', 'find . -type f -size +1536M -exec ls -lh {} +'],
test/slot-cases.js:18:  ['find_larger_than', 'find files over 2GB', 'find . -type f -size +2G -exec ls -lh {} +'],
test/slot-cases.js:19:  ['find_larger_than', 'pliki powyżej 500 megabajtów w /data', 'find /data -type f -size +500M -exec ls -lh {} +'],
test/slot-cases.js:48:  ['make_executable', 'make run.sh executable', 'chmod +x run.sh'],
test/slot-cases.js:57:  ['mkdir', 'create folder src/components/ui', 'mkdir -p src/components/ui'],
test/slot-cases.js:61:  ['count_lines_code', 'ile linii kodu w plikach python', "find . -type f -iname '*.py' -exec cat {} + | wc -l"],
test/slot-cases.js:94:  ['docker_exec', 'wejdź do kontenera redis', 'docker exec -it redis sh'],
test/pipeline.test.js:4:import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/pipeline.test.js:18:test('stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1', () => {
test/pipeline.test.js:27:test('PowerShell vocabulary maps to the same tool family', () => {
test/pipeline.test.js:32:test('tagger: tool-conditioned BIO spans, only tags valid for the tool', () => {
test/pipeline.test.js:42:test('slot merge: tagger primary, regex fills misses and replaces invalid values', () => {
test/pipeline.test.js:51:test('end-to-end bash + PowerShell + BSD', () => {
test/pipeline.test.js:52:  assert.equal(S('pokaż 5 największych plików w ~/Pobrane').command, 'find ~/Pobrane -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 5');
test/pipeline.test.js:58:test('history: pronouns, "same for", container/service/pid references (EN + PL)', () => {
test/pipeline.test.js:76:test('history is optional: without it a pronoun request gets a hint, never a guessed value', () => {
test/pipeline.test.js:81:test('history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation', () => {
test/pipeline.test.js:88:test('loadHistory reads only the tail of HISTFILE and returns the last n commands', () => {
test/pipeline.test.js:89:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-hist-'));
test/pipeline.test.js:92:    writeFileSync(f, Array.from({ length: 50 }, (_, i) => `: 17000000${i}:0;echo ${i}`).join('\n') + '\n');
test/pipeline.test.js:96:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/pipeline.test.js:99:test('context exposes ctx_ classifier features and entity references', () => {
test/pipeline.test.js:106:test('second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk', () => {
test/pipeline.test.js:118:test('out-of-domain requests are rejected (also by the composer)', () => {
test/pipeline.test.js:119:  for (const q of ['write me a poem about the sea', 'jaka jest pogoda w krakowie', 'tell me a joke']) assert.equal(S(q).understood, false, q);
test/pipeline.test.js:122:test('env detection and overrides', () => {
test/parity.test.js:11:test('fnv1a matches known vectors', () => {
test/parity.test.js:17:test('normalize folds Polish diacritics and digits', () => {
test/parity.test.js:21:test('classifier models (tool + intent) match Python probabilities', () => {
test/parity.test.js:34:test('tagger matches Python probabilities', () => {
test/danger.test.js:11:  test(`critical: ${c}`, () => {
test/danger.test.js:21:  test(`high: ${c}`, () => assert.equal(checkDanger(c).risk, 'high'));
test/danger.test.js:27:  test(`safe: ${c}`, () => {
test/danger.test.js:34:test('medium escalations', () => {
test/danger.test.js:40:test('risk is never lowered', () => {
test/cli.test.js:3:import { spawnSync } from 'node:child_process';
test/cli.test.js:5:import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
test/cli.test.js:10:const run = (...args) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } });
test/cli.test.js:12:test('--version', () => {
test/cli.test.js:18:test('--help', () => {
test/cli.test.js:24:test('--json dry-run (EN)', () => {
test/cli.test.js:34:test('--json dry-run (PL)', () => {
test/cli.test.js:42:test('dry-run prints command and never executes', () => {
test/cli.test.js:49:test('non-TTY without --yes only prints', () => {
test/cli.test.js:56:test('--yes runs safe commands and passes exit code', () => {
test/cli.test.js:62:test('--yes refuses non-safe commands', () => {
test/cli.test.js:68:test('unknown request -> I don\'t understand + candidates, exit 3', () => {
test/cli.test.js:69:  const r = run('write me a poem about the sea');
test/cli.test.js:75:test('--platform darwin (alias of --os)', () => {
test/cli.test.js:80:test('--shell powershell / cmd / fish render natively; gaps exit 5', () => {
test/cli.test.js:87:  const gap = run('--shell', 'cmd', 'make deploy.sh executable');
test/cli.test.js:93:test('--history=FILE resolves references and never echoes the history', () => {
test/cli.test.js:94:  const dir = mkdtempSync(join(tmpdir(), 'tellsh-cli-'));
test/cli.test.js:97:    writeFileSync(f, 'echo SECRET_TOKEN=abc123\ncat notes.txt\n');
test/cli.test.js:103:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/cli.test.js:106:test('composed commands are labelled experimental and refused by --yes', () => {
test/shells.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/shells.test.js:12:const has = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
test/shells.test.js:44:  test(`${label}: every intent renders and passes ${checker} -n`, () => {
test/shells.test.js:51:      const res = spawnSync(checker, args, { encoding: 'utf8' });
test/shells.test.js:58:test('fish: every intent renders (fish -n when installed)', (t) => {
test/shells.test.js:64:    assert.ok(!/\$\{|\$\(/.test(r.command), `${it.id}: POSIX-only expansion in fish render: ${r.command}`);
test/shells.test.js:65:    if (has('fish')) { const res = spawnSync('fish', ['-n', '-c', r.command]); if (res.status !== 0) bad.push(it.id); }
test/shells.test.js:72:  test(`PowerShell/${os}: every intent renders or reports a gap (parser check when pwsh is installed)`, (t) => {
test/shells.test.js:81:      if (!/^bash -c /.test(r.command)) {
test/shells.test.js:84:        assert.ok(!/\$\{\w+:-/.test(s), `${it.id}: POSIX expansion in PowerShell: ${r.command}`);
test/shells.test.js:96:test('cmd: best-effort coverage is reported, gaps carry a reason', () => {
test/shells.test.js:106:test('quoting round-trips through bash and sh', () => {
test/shells.test.js:108:    for (const sh of ['bash', 'sh']) assert.equal(execFileSync(sh, ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' }), s);
test/shells.test.js:112:test('fish / PowerShell / cmd quoting rules', () => {
test/shells.test.js:126:test('per-shell variants: intent shared, rendering differs', () => {
test/shells.test.js:136:  assert.ok(/^bash -c '/.test(r.command) || /journalctl/.test(r.command), r.command);
test/slots.test.js:7:test('number words EN/PL', () => {
test/slots.test.js:14:test('sizes', () => {
test/slots.test.js:22:test('durations', () => {
test/slots.test.js:32:test('ports, pids, urls, hosts, quoted', () => {
test/slots.test.js:42:test('extensions', () => {
test/slots.test.js:50:test('paths and named locations', () => {
test/slots.test.js:58:test('slot cases produce the exact expected command', () => {
test/slots.test.js:64:test('missing required slots are reported with placeholders', () => {
test/templates.test.js:3:import { execFileSync } from 'node:child_process';
test/templates.test.js:8:const roundTrip = (s) => execFileSync('bash', ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' });
test/templates.test.js:10:test('shQuote round-trips nasty strings through bash', () => {
test/templates.test.js:16:test('shQuote keeps simple words bare and tilde expandable', () => {
test/templates.test.js:23:test('raw slots are validated, never injected', () => {
test/templates.test.js:29:test('optional segments are dropped when slot missing', () => {
test/templates.test.js:34:test('non-slot braces are left alone', () => {
test/templates.test.js:39:test('every intent renders on linux and darwin without throwing, with valid risk', () => {
test/templates.test.js:45:      assert.ok(!/undefined|(?<!\/dev\/)null|\{\w+(!raw)?\}/.test(r.command.replace(/%\{http_code\}/, '')), `${i.id}/${platform}: ${r.command}`);
test/templates.test.js:50:test('darwin variants differ where commands differ', () => {
test/templates.test.js:57:test('injection attempt in a filename stays a single quoted argument', () => {
test/regressions.test.js:5:import { spawnSync, execFileSync } from 'node:child_process';
test/regressions.test.js:7:import { mkdtempSync, writeFileSync, readFileSync, rmSync, chmodSync } from 'node:fs';
test/regressions.test.js:23:const cli = (args, opts = {}) => spawnSync(process.execPath, [BIN, ...args], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' }, ...opts });
test/regressions.test.js:27:const tmp = () => mkdtempSync(join(tmpdir(), 'tellsh-reg-'));
test/regressions.test.js:33:test('render: values are substituted once; a value containing {slot} stays inert', () => {
test/regressions.test.js:37:  const out = execFileSync('bash', ['-c', render("printf '[%s]' {file}«{dest}»", v).command], { encoding: 'utf8' });
test/regressions.test.js:41:test('render: every template with an optional segment keeps every free-text value one literal word', () => {
test/regressions.test.js:52:    assert.equal(spawnSync('bash', ['-n', '-c', command]).status, 0, command);
test/regressions.test.js:58:test('CLI: the reported injection payloads stay quoted (bash) and never execute', () => {
test/regressions.test.js:66:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:72:test('psQuote escapes every PowerShell quote character', () => {
test/regressions.test.js:86:test('CLI: typographic-quote payloads stay one PowerShell argument (win32 native and bash -c wrapper)', () => {
test/regressions.test.js:93:  if (/^bash -c /.test(w.command)) {
test/regressions.test.js:100:test('PowerShell values are string expressions in expression positions', () => {
test/regressions.test.js:106:test('PowerShell on unix: POSIX commands containing " are piped to bash (PowerShell < 7.3 drops embedded ")', () => {
test/regressions.test.js:110:    if (!r.command || !/bash/.test(r.variant || '')) continue;
test/regressions.test.js:111:    assert.ok(!(/^bash -c /.test(r.command) && r.command.includes('"')), `${it.id}: ${r.command}`);
test/regressions.test.js:112:    if (/\| bash$/.test(r.command)) {
test/regressions.test.js:129:for (const c of NOW_HIGH) test(`danger: high: ${c}`, () => assert.equal(checkDanger(c).risk, 'high', checkDanger(c).warnings.join('; ')));
test/regressions.test.js:135:  test(`danger: critical: ${c}`, () => {
test/regressions.test.js:142:test('danger: no false alarms for docker --rm and SIGHUP', () => {
test/regressions.test.js:150:test('catalog commands rendered with ~/ for cmd are recognised as home-directory wipes', () => {
test/regressions.test.js:158:test('kill_by_port only matches listening sockets (not clients connected to that port)', () => {
test/regressions.test.js:165:test('macOS base64 reads files with -i (no positional operand)', () => {
test/regressions.test.js:172:test('BSD duplicate finder prints every member of a group, including the first', () => {
test/regressions.test.js:175:  const out = execFileSync('sh', ['-c', `printf 'h1 ./a\\nh1 ./b\\nh2 ./c\\nh3 ./d\\nh3 ./e\\nh3 ./f\\n' | ${awk}`], { encoding: 'utf8' });
test/regressions.test.js:179:test('history_search reads the zsh history file under zsh (HISTFILE is not exported to -c children)', () => {
test/regressions.test.js:185:// pwsh parse check must never execute the checked source
test/regressions.test.js:187:test('pwsh parse check passes the source only through an env var, never as a -Command argument', () => {
test/regressions.test.js:192:    writeFileSync(fake, `#!/bin/sh\nprintf '%s\\n' "$@" > '${out}'\nprintf '%s' "$TELLSH_PARSE_SRC" > '${out}.src'\nexit 0\n`);
test/regressions.test.js:198:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:200:    assert.ok(!/ParseInput\(\$args/.test(readFileSync(new URL(f, import.meta.url), 'utf8')), f);
test/regressions.test.js:209:test('history: escaped and quoted filenames are tokenized like the shell does', () => {
test/regressions.test.js:215:test('history: ambiguous latest references are refused, never resolved to an older value', () => {
test/regressions.test.js:218:    assert.ok(!/old\.txt/.test(s.command || ''), `${latest}: ${s.command}`);
test/regressions.test.js:226:test('history: native PowerShell commands are understood (no stale reference)', () => {
test/regressions.test.js:232:  assert.ok(!/old\.txt/.test(u.command), u.command);
test/regressions.test.js:237:test('history: values recovered from history are validated like extracted ones', () => {
test/regressions.test.js:239:  assert.ok(!/-oProxy/.test(s.command), s.command);
test/regressions.test.js:244:test('url slot accepts URLs only (never an option)', () => {
test/regressions.test.js:254:test('zsh: a leading = is always quoted (=word expands to a command path)', () => {
test/regressions.test.js:259:test('cmd.exe: values with % ! or " are refused instead of being expanded', () => {
test/regressions.test.js:270:test('exit code after a signal is 128 + signal number', async () => {
test/regressions.test.js:275:test('--yes only runs safe commands straight from the catalog (not history-resolved ones)', () => {
test/regressions.test.js:279:    writeFileSync(join(dir, 'notes.txt'), 'hello\n');
test/regressions.test.js:280:    writeFileSync(f, 'ls\ncat notes.txt\n');
test/regressions.test.js:286:  } finally { rmSync(dir, { recursive: true, force: true }); }
test/regressions.test.js:292:test('composer: find -newer gets its reference file as operand (not as the search root)', () => {
test/regressions.test.js:297:test('composer validation rejects flags missing their operand', () => {
test/regressions.test.js:303:test('eval normalisation keeps behaviour-relevant differences', () => {
test/regressions.test.js:316:test('existing danger behaviour for catalog templates: every safe intent still renders safe on bash', () => {
test/regressions.test.js:329:test('critical flag for recursive deletes of root/home in every shell and path form', () => {
test/fixtures/parity.json:1:{"cls": [{"model": "tool", "f": [[5537, 0.160128], [7265, 0.160128], [12374, 0.160128], [15825, 0.160128], [21845, 0.160128], [24097, 0.160128], [24123, 0.377964], [24755, 0.160128], [25128, 0.160128], [28898, 0.160128], [32312, 0.160128], [32974, 0.160128], [61443, 0.160128], [61948, 0.160128], [62787, 0.377964], [64263, 0.160128], [69817, 0.160128], [71929, 0.377964], [76173, 0.160128], [90027, 0.160128], [97019, 0.377964], [98127, 0.160128], [98915, 0.160128], [104937, 0.447214], [105599, 0.160128], [115084, 0.160128], [121166, 0.160128], [121363, 0.160128], [134680, 0.160128], [135410, 0.377964], [137222, 0.160128], [138678, 0.160128], [144348, 0.160128], [154622, 0.447214], [161499, 0.377964], [163784, 0.160128], [164285, 0.447214], [166611, 0.447214], [168532, 0.160128], [183729, 0.377964], [194218, 0.160128], [201074, 0.160128], [208670, 0.160128], [215647, 0.160128], [220285, 0.160128], [225745, 0.447214], [228497, 0.160128], [247174, 0.160128], [250253, 0.160128], [251473, 0.160128], [252936, 0.160128]], "top": [["find", 0.9909910047581834], ["git", 0.0017733441542645558], ["du", 0.0015145870510943113]]}, {"model": "intent:find", "f": [[5537, 0.160128], [7265, 0.160128], [12374, 0.160128], [15825, 0.160128], [21845, 0.160128], [24097, 0.160128], [24123, 0.377964], [24755, 0.160128], [25128, 0.160128], [28898, 0.160128], [32312, 0.160128], [32974, 0.160128], [61443, 0.160128], [61948, 0.160128], [62787, 0.377964], [64263, 0.160128], [69817, 0.160128], [71929, 0.377964], [76173, 0.160128], [90027, 0.160128], [97019, 0.377964], [98127, 0.160128], [98915, 0.160128], [104937, 0.447214], [105599, 0.160128], [115084, 0.160128], [121166, 0.160128], [121363, 0.160128], [134680, 0.160128], [135410, 0.377964], [137222, 0.160128], [138678, 0.160128], [144348, 0.160128], [154622, 0.447214], [161499, 0.377964], [163784, 0.160128], [164285, 0.447214], [166611, 0.447214], [168532, 0.160128], [183729, 0.377964], [194218, 0.160128], [201074, 0.160128], [208670, 0.160128], [215647, 0.160128], [220285, 0.160128], [225745, 0.447214], [228497, 0.160128], [247174, 0.160128], [250253, 0.160128], [251473, 0.160128], [252936, 0.160128]], "top": [["largest_files", 0.9966488379575501], ["recent_files", 0.001181569169946605]]}, {"model": "tool", "f": [[5964, 0.122169], [8442, 0.122169], [9577, 0.301511], [15179, 0.122169], [16965, 0.301511], [16997, 0.122169], [21069, 0.122169], [22280, 0.122169], [24123, 0.707107], [25103, 0.122169], [28479, 0.122169], [49194, 0.122169], [56284, 0.122169], [61649, 0.122169], [61859, 0.301511], [70761, 0.301511], [70899, 0.122169], [73437, 0.122169], [79444, 0.122169], [81766, 0.301511], [86758, 0.122169], [99327, 0.122169], [99551, 0.122169], [103990, 0.122169], [106416, 0.122169], [118984, 0.122169], [120748, 0.122169], [123963, 0.122169], [130556, 0.122169], [131771, 0.122169], [136763, 0.301511], [136833, 0.122169], [137060, 0.122169], [137655, 0.122169], [139701, 0.301511], [139772, 0.122169], [142775, 0.122169], [144565, 0.122169], [144901, 0.122169], [146712, 0.122169], [149695, 0.122169], [149929, 0.122169], [150383, 0.122169], [162884, 0.301511], [163843, 0.122169], [166251, 0.122169], [170803, 0.301511], [172044, 0.122169], [172980, 0.301511], [173472, 0.122169], [173651, 0.122169], [173836, 0.122169], [174879, 0.122169], [175543, 0.122169], [175985, 0.122169], [176152, 0.122169], [181630, 0.122169], [184824, 0.122169], [191710, 0.122169], [194951, 0.122169], [196264, 0.122169], [196780, 0.301511], [196956, 0.122169], [198467, 0.122169], [199530, 0.122169], [201467, 0.122169], [207232, 0.122169], [209403, 0.122169], [213082, 0.707107], [215873, 0.122169], [219095, 0.122169], [220028, 0.122169], [222078, 0.122169], [227797, 0.122169], [229658, 0.122169], [234541, 0.122169], [237943, 0.122169], [243481, 0.122169], [248301, 0.122169], [250376, 0.122169]], "top": [["find", 0.9994932893705698], ["grep", 0.00045522896496532776], ["ls", 2.589868032154781e-05]]}, {"model": "intent:find", "f": [[5964, 0.122169], [8442, 0.122169], [9577, 0.301511], [15179, 0.122169], [16965, 0.301511], [16997, 0.122169], [21069, 0.122169], [22280, 0.122169], [24123, 0.707107], [25103, 0.122169], [28479, 0.122169], [49194, 0.122169], [56284, 0.122169], [61649, 0.122169], [61859, 0.301511], [70761, 0.301511], [70899, 0.122169], [73437, 0.122169], [79444, 0.122169], [81766, 0.301511], [86758, 0.122169], [99327, 0.122169], [99551, 0.122169], [103990, 0.122169], [106416, 0.122169], [118984, 0.122169], [120748, 0.122169], [123963, 0.122169], [130556, 0.122169], [131771, 0.122169], [136763, 0.301511], [136833, 0.122169], [137060, 0.122169], [137655, 0.122169], [139701, 0.301511], [139772, 0.122169], [142775, 0.122169], [144565, 0.122169], [144901, 0.122169], [146712, 0.122169], [149695, 0.122169], [149929, 0.122169], [150383, 0.122169], [162884, 0.301511], [163843, 0.122169], [166251, 0.122169], [170803, 0.301511], [172044, 0.122169], [172980, 0.301511], [173472, 0.122169], [173651, 0.122169], [173836, 0.122169], [174879, 0.122169], [175543, 0.122169], [175985, 0.122169], [176152, 0.122169], [181630, 0.122169], [184824, 0.122169], [191710, 0.122169], [194951, 0.122169], [196264, 0.122169], [196780, 0.301511], [196956, 0.122169], [198467, 0.122169], [199530, 0.122169], [201467, 0.122169], [207232, 0.122169], [209403, 0.122169], [213082, 0.707107], [215873, 0.122169], [219095, 0.122169], [220028, 0.122169], [222078, 0.122169], [227797, 0.122169], [229658, 0.122169], [234541, 0.122169], [237943, 0.122169], [243481, 0.122169], [248301, 0.122169], [250376, 0.122169]], "top": [["find_by_ext", 0.9864656380341823], ["delete_by_ext", 0.005606117089222099]]}, {"model": "tool", "f": [[1490, 0.110432], [2277, 0.110432], [2490, 0.110432], [4412, 0.110432], [5964, 0.110432], [18780, 0.110432], [20846, 0.110432], [22043, 0.110432], [26208, 0.110432], [27237, 0.110432], [31703, 0.110432], [32137, 0.333333], [38760, 0.110432], [40584, 0.707107], [40875, 0.110432], [44615, 0.110432], [45393, 0.110432], [52487, 0.110432], [54450, 0.110432], [57464, 0.110432], [61664, 0.110432], [66784, 0.110432], [70761, 0.333333], [73437, 0.110432], [74016, 0.110432], [77697, 0.110432], [80294, 0.110432], [83236, 0.333333], [88012, 0.110432], [89600, 0.110432], [93174, 0.110432], [95189, 0.110432], [95332, 0.110432], [98758, 0.110432], [99327, 0.110432], [99548, 0.110432], [102372, 0.110432], [103990, 0.110432], [110703, 0.110432], [111696, 0.110432], [112013, 0.110432], [112028, 0.110432], [113342, 0.333333], [116316, 0.110432], [120748, 0.110432], [123156, 0.110432], [131293, 0.110432], [132974, 0.110432], [133539, 0.333333], [137441, 0.110432], [139772, 0.110432], [141963, 0.110432], [145100, 0.110432], [147496, 0.110432], [148377, 0.110432], [150383, 0.110432], [156949, 0.110432], [157563, 0.333333], [159070, 0.110432], [161845, 0.110432], [167067, 0.110432], [172383, 0.110432], [173836, 0.110432], [175983, 0.110432], [176152, 0.110432], [177331, 0.110432], [178103, 0.110432], [193601, 0.110432], [196264, 0.110432], [196480, 0.333333], [199582, 0.110432], [200309, 0.110432], [206638, 0.110432], [206801, 0.110432], [212829, 0.110432], [213082, 0.707107], [215998, 0.110432], [216621, 0.110432], [216659, 0.110432], [216897, 0.110432], [221884, 0.110432], [223056, 0.110432], [225827, 0.110432], [226612, 0.110432], [228352, 0.110432], [232965, 0.110432], [233423, 0.110432], [237943, 0.110432], [247473, 0.110432], [247775, 0.333333], [248003, 0.110432], [256616, 0.110432], [258223, 0.333333]], "top": [["grep", 0.9771206110316346], ["find", 0.005774668365039984], ["git", 0.004210994409774819]]}, {"model": "intent:grep", "f": [[1490, 0.110432], [2277, 0.110432], [2490, 0.110432], [4412, 0.110432], [5964, 0.110432], [18780, 0.110432], [20846, 0.110432], [22043, 0.110432], [26208, 0.110432], [27237, 0.110432], [31703, 0.110432], [32137, 0.333333], [38760, 0.110432], [40584, 0.707107], [40875, 0.110432], [44615, 0.110432], [45393, 0.110432], [52487, 0.110432], [54450, 0.110432], [57464, 0.110432], [61664, 0.110432], [66784, 0.110432], [70761, 0.333333], [73437, 0.110432], [74016, 0.110432], [77697, 0.110432], [80294, 0.110432], [83236, 0.333333], [88012, 0.110432], [89600, 0.110432], [93174, 0.110432], [95189, 0.110432], [95332, 0.110432], [98758, 0.110432], [99327, 0.110432], [99548, 0.110432], [102372, 0.110432], [103990, 0.110432], [110703, 0.110432], [111696, 0.110432], [112013, 0.110432], [112028, 0.110432], [113342, 0.333333], [116316, 0.110432], [120748, 0.110432], [123156, 0.110432], [131293, 0.110432], [132974, 0.110432], [133539, 0.333333], [137441, 0.110432], [139772, 0.110432], [141963, 0.110432], [145100, 0.110432], [147496, 0.110432], [148377, 0.110432], [150383, 0.110432], [156949, 0.110432], [157563, 0.333333], [159070, 0.110432], [161845, 0.110432], [167067, 0.110432], [172383, 0.110432], [173836, 0.110432], [175983, 0.110432], [176152, 0.110432], [177331, 0.110432], [178103, 0.110432], [193601, 0.110432], [196264, 0.110432], [196480, 0.333333], [199582, 0.110432], [200309, 0.110432], [206638, 0.110432], [206801, 0.110432], [212829, 0.110432], [213082, 0.707107], [215998, 0.110432], [216621, 0.110432], [216659, 0.110432], [216897, 0.110432], [221884, 0.110432], [223056, 0.110432], [225827, 0.110432], [226612, 0.110432], [228352, 0.110432], [232965, 0.110432], [233423, 0.110432], [237943, 0.110432], [247473, 0.110432], [247775, 0.333333], [248003, 0.110432], [256616, 0.110432], [258223, 0.333333]], "top": [["grep_text", 0.9933483693086561], ["grep_files_containing", 0.005447609323087888]]}, {"model": "tool", "f": [[2019, 0.125988], [3317, 0.125988], [4058, 0.125988], [9989, 0.125988], [32336, 0.125988], [33650, 0.125988], [36422, 0.125988], [40066, 0.301511], [45171, 0.301511], [48194, 0.125988], [50024, 0.125988], [50962, 0.125988], [62503, 0.125988], [62787, 0.377964], [66598, 0.125988], [69369, 0.125988], [70175, 0.125988], [71895, 0.125988], [71929, 0.377964], [75406, 0.125988], [78280, 0.125988], [78679, 0.125988], [83015, 0.125988], [90314, 0.125988], [100444, 0.377964], [100529, 0.301511], [101869, 0.125988], [102398, 0.301511], [113415, 0.125988], [113465, 0.125988], [115358, 0.125988], [119539, 0.125988], [121399, 0.125988], [121623, 0.125988], [124905, 0.125988], [125531, 0.301511], [131770, 0.125988], [135034, 0.125988], [137326, 0.125988], [137501, 0.125988], [139740, 0.301511], [155906, 0.125988], [159338, 0.301511], [161686, 0.125988], [164386, 0.125988], [168532, 0.125988], [169023, 0.125988], [171781, 0.125988], [178710, 0.125988], [183729, 0.377964], [183769, 0.125988], [185225, 0.125988], [191158, 0.301511], [191591, 0.377964], [192277, 0.125988], [197335, 0.125988], [199988, 0.377964], [203970, 0.125988], [204369, 0.301511], [206100, 0.125988], [206211, 0.125988], [206425, 0.125988], [210367, 0.301511], [216054, 0.125988], [224853, 0.125988], [229360, 0.125988], [229517, 0.125988], [230610, 0.125988], [231854, 0.125988], [233566, 0.125988], [233692, 0.125988], [236583, 0.125988], [241371, 0.301511], [242318, 0.125988], [247472, 0.125988], [250253, 0.125988], [250893, 0.125988], [251890, 0.125988], [252813, 0.125988], [254559, 0.125988], [260215, 0.377964]], "top": [["sort", 0.9978742866607285], ["tail", 0.001082194149499825], ["wc", 0.0007464918584367558]]}, {"model": "tool", "f": [[694, 0.123091], [1555, 0.123091], [2019, 0.123091], [2301, 0.123091], [5797, 0.123091], [12330, 0.123091], [12428, 0.301511], [21941, 0.301511], [24123, 0.707107], [29361, 0.123091], [30021, 0.123091], [30031, 0.123091], [32285, 0.123091], [33663, 0.123091], [34693, 0.123091], [37553, 0.123091], [46137, 0.123091], [47593, 0.123091], [50570, 0.123091], [52645, 0.301511], [54015, 0.123091], [56765, 0.123091], [60940, 0.123091], [62787, 0.707107], [70175, 0.123091], [70623, 0.123091], [75478, 0.301511], [75816, 0.123091], [83464, 0.123091], [87206, 0.123091], [88460, 0.123091], [90600, 0.123091], [94456, 0.123091], [95219, 0.123091], [96072, 0.123091], [96837, 0.123091], [100807, 0.123091], [113755, 0.301511], [114689, 0.123091], [119539, 0.123091], [123359, 0.301511], [123972, 0.123091], [127063, 0.123091], [127947, 0.123091], [129367, 0.123091], [131085, 0.301511], [137153, 0.123091], [139209, 0.301511], [152320, 0.123091], [157608, 0.123091], [160880, 0.123091], [165192, 0.123091], [166252, 0.123091], [167743, 0.123091], [176010, 0.123091], [178755, 0.123091], [196983, 0.123091], [207518, 0.123091], [207634, 0.123091], [213237, 0.301511], [217389, 0.123091], [219262, 0.301511], [219325, 0.123091], [220084, 0.123091], [228352, 0.123091], [235315, 0.123091], [237502, 0.123091], [237775, 0.123091], [238375, 0.301511], [239029, 0.123091], [240895, 0.123091], [241511, 0.123091], [243285, 0.123091], [244705, 0.123091], [251227, 0.123091], [252479, 0.123091], [252696, 0.123091], [252803, 0.123091], [259341, 0.123091]], "top": [["find", 0.9975282601812404], ["ln", 0.00135377059425154], ["cp", 0.00010900085786359298]]}, {"model": "intent:find", "f": [[694, 0.123091], [1555, 0.123091], [2019, 0.123091], [2301, 0.123091], [5797, 0.123091], [12330, 0.123091], [12428, 0.301511], [21941, 0.301511], [24123, 0.707107], [29361, 0.123091], [30021, 0.123091], [30031, 0.123091], [32285, 0.123091], [33663, 0.123091], [34693, 0.123091], [37553, 0.123091], [46137, 0.123091], [47593, 0.123091], [50570, 0.123091], [52645, 0.301511], [54015, 0.123091], [56765, 0.123091], [60940, 0.123091], [62787, 0.707107], [70175, 0.123091], [70623, 0.123091], [75478, 0.301511], [75816, 0.123091], [83464, 0.123091], [87206, 0.123091], [88460, 0.123091], [90600, 0.123091], [94456, 0.123091], [95219, 0.123091], [96072, 0.123091], [96837, 0.123091], [100807, 0.123091], [113755, 0.301511], [114689, 0.123091], [119539, 0.123091], [123359, 0.301511], [123972, 0.123091], [127063, 0.123091], [127947, 0.123091], [129367, 0.123091], [131085, 0.301511], [137153, 0.123091], [139209, 0.301511], [152320, 0.123091], [157608, 0.123091], [160880, 0.123091], [165192, 0.123091], [166252, 0.123091], [167743, 0.123091], [176010, 0.123091], [178755, 0.123091], [196983, 0.123091], [207518, 0.123091], [207634, 0.123091], [213237, 0.301511], [217389, 0.123091], [219262, 0.301511], [219325, 0.123091], [220084, 0.123091], [228352, 0.123091], [235315, 0.123091], [237502, 0.123091], [237775, 0.123091], [238375, 0.301511], [239029, 0.123091], [240895, 0.123091], [241511, 0.123091], [243285, 0.123091], [244705, 0.123091], [251227, 0.123091], [252479, 0.123091], [252696, 0.123091], [252803, 0.123091], [259341, 0.123091]], "top": [["find_symlinks", 0.9672819774509421], ["broken_symlinks", 0.028482255557341154]]}, {"model": "tool", "f": [[2243, 0.103695], [9801, 0.103695], [12343, 0.103695], [15825, 0.103695], [23301, 0.103695], [24097, 0.103695], [24109, 0.103695], [24123, 0.707107], [24238, 0.103695], [25069, 0.103695], [28797, 0.103695], [30539, 0.103695], [32974, 0.103695], [48431, 0.103695], [48597, 0.103695], [51020, 0.242536], [51323, 0.103695], [52274, 0.242536], [52718, 0.103695], [53015, 0.103695], [55030, 0.103695], [56465, 0.103695], [61948, 0.103695], [63775, 0.103695], [71464, 0.242536], [71735, 0.242536], [71935, 0.103695], [76650, 0.103695], [78443, 0.103695], [80273, 0.103695], [84853, 0.103695], [87868, 0.103695], [89494, 0.103695], [90027, 0.103695], [93654, 0.103695], [94557, 0.103695], [94589, 0.103695], [96069, 0.242536], [97921, 0.103695], [98915, 0.103695], [103050, 0.103695], [111858, 0.103695], [115084, 0.103695], [120005, 0.242536], [121983, 0.103695], [127386, 0.103695], [129525, 0.103695], [131803, 0.103695], [133255, 0.242536], [134680, 0.103695], [138950, 0.103695], [140377, 0.103695], [144277, 0.103695], [145459, 0.103695], [153459, 0.103695], [154635, 0.242536], [156612, 0.103695], [162095, 0.103695], [162638, 0.242536], [164003, 0.242536], [164285, 0.242536], [165873, 0.103695], [168534, 0.103695], [171170, 0.103695], [171483, 0.103695], [182946, 0.242536], [183809, 0.103695], [188474, 0.103695], [194218, 0.103695], [194434, 0.103695], [195234, 0.103695], [196350, 0.103695], [197672, 0.103695], [198831, 0.103695], [199871, 0.103695], [201074, 0.103695], [201142, 0.103695], [206101, 0.242536], [206321, 0.103695], [206611, 0.103695], [213065, 0.103695], [213082, 0.707107], [217107, 0.103695], [223907, 0.103695], [224058, 0.103695], [226181, 0.103695], [227672, 0.103695], [229561, 0.103695], [229626, 0.103695], [229939, 0.242536], [232057, 0.242536], [232236, 0.103695], [238023, 0.103695], [238999, 0.103695], [245689, 0.103695], [246052, 0.103695], [246701, 0.103695], [246755, 0.242536], [248927, 0.103695], [249128, 0.103695], [249615, 0.103695], [250653, 0.242536], [250886, 0.103695], [251694, 0.103695], [251734, 0.103695], [251936, 0.103695], [252679, 0.103695], [252839, 0.103695], [253539, 0.103695], [253605, 0.103695], [254948, 0.103695], [255802, 0.103695]], "top": [["fileinfo", 0.9454353177578223], ["tar", 0.045359598637477606], ["chown", 0.0018935191962129883]]}, {"model": "intent:fileinfo", "f": [[2243, 0.103695], [9801, 0.103695], [12343, 0.103695], [15825, 0.103695], [23301, 0.103695], [24097, 0.103695], [24109, 0.103695], [24123, 0.707107], [24238, 0.103695], [25069, 0.103695], [28797, 0.103695], [30539, 0.103695], [32974, 0.103695], [48431, 0.103695], [48597, 0.103695], [51020, 0.242536], [51323, 0.103695], [52274, 0.242536], [52718, 0.103695], [53015, 0.103695], [55030, 0.103695], [56465, 0.103695], [61948, 0.103695], [63775, 0.103695], [71464, 0.242536], [71735, 0.242536], [71935, 0.103695], [76650, 0.103695], [78443, 0.103695], [80273, 0.103695], [84853, 0.103695], [87868, 0.103695], [89494, 0.103695], [90027, 0.103695], [93654, 0.103695], [94557, 0.103695], [94589, 0.103695], [96069, 0.242536], [97921, 0.103695], [98915, 0.103695], [103050, 0.103695], [111858, 0.103695], [115084, 0.103695], [120005, 0.242536], [121983, 0.103695], [127386, 0.103695], [129525, 0.103695], [131803, 0.103695], [133255, 0.242536], [134680, 0.103695], [138950, 0.103695], [140377, 0.103695], [144277, 0.103695], [145459, 0.103695], [153459, 0.103695], [154635, 0.242536], [156612, 0.103695], [162095, 0.103695], [162638, 0.242536], [164003, 0.242536], [164285, 0.242536], [165873, 0.103695], [168534, 0.103695], [171170, 0.103695], [171483, 0.103695], [182946, 0.242536], [183809, 0.103695], [188474, 0.103695], [194218, 0.103695], [194434, 0.103695], [195234, 0.103695], [196350, 0.103695], [197672, 0.103695], [198831, 0.103695], [199871, 0.103695], [201074, 0.103695], [201142, 0.103695], [206101, 0.242536], [206321, 0.103695], [206611, 0.103695], [213065, 0.103695], [213082, 0.707107], [217107, 0.103695], [223907, 0.103695], [224058, 0.103695], [226181, 0.103695], [227672, 0.103695], [229561, 0.103695], [229626, 0.103695], [229939, 0.242536], [232057, 0.242536], [232236, 0.103695], [238023, 0.103695], [238999, 0.103695], [245689, 0.103695], [246052, 0.103695], [246701, 0.103695], [246755, 0.242536], [248927, 0.103695], [249128, 0.103695], [249615, 0.103695], [250653, 0.242536], [250886, 0.103695], [251694, 0.103695], [251734, 0.103695], [251936, 0.103695], [252679, 0.103695], [252839, 0.103695], [253539, 0.103695], [253605, 0.103695], [254948, 0.103695], [255802, 0.103695]], "top": [["file_stat", 0.9924929441958804], ["file_type", 0.007507055804119683]]}, {"model": "tool", "f": [[1718, 0.140028], [2301, 0.140028], [5106, 0.140028], [16377, 0.140028], [25396, 0.140028], [26694, 0.140028], [33526, 0.140028], [39383, 0.140028], [41600, 0.140028], [48431, 0.140028], [53015, 0.140028], [57315, 0.140028], [69013, 0.140028], [69271, 0.333333], [71464, 0.333333], [83163, 0.333333], [87018, 0.707107], [93999, 0.140028], [100125, 0.140028], [117476, 0.333333], [119086, 0.140028], [121555, 0.140028], [122559, 0.140028], [127716, 0.333333], [131967, 0.140028], [143742, 0.140028], [144277, 0.140028], [152320, 0.140028], [160191, 0.140028], [165713, 0.140028], [177415, 0.140028], [178752, 0.140028], [182171, 0.140028], [183619, 0.140028], [184540, 0.140028], [185975, 0.140028], [189716, 0.140028], [196264, 0.140028], [198379, 0.140028], [199871, 0.140028], [201018, 0.140028], [201541, 0.140028], [206321, 0.140028], [210659, 0.140028], [210783, 0.333333], [212885, 0.140028], [217255, 0.140028], [220075, 0.707107], [226181, 0.140028], [226942, 0.140028], [232057, 0.333333], [234440, 0.333333], [236586, 0.140028], [238023, 0.140028], [240777, 0.140028], [242649, 0.140028], [246755, 0.333333], [247008, 0.140028], [249615, 0.140028], [252436, 0.140028], [253605, 0.140028], [260220, 0.140028]], "top": [["tar", 0.9906115984579275], ["rm", 0.006645031016944642], ["pwd", 0.0008476639434871756]]}, {"model": "intent:tar", "f": [[1718, 0.140028], [2301, 0.140028], [5106, 0.140028], [16377, 0.140028], [25396, 0.140028], [26694, 0.140028], [33526, 0.140028], [39383, 0.140028], [41600, 0.140028], [48431, 0.140028], [53015, 0.140028], [57315, 0.140028], [69013, 0.140028], [69271, 0.333333], [71464, 0.333333], [83163, 0.333333], [87018, 0.707107], [93999, 0.140028], [100125, 0.140028], [117476, 0.333333], [119086, 0.140028], [121555, 0.140028], [122559, 0.140028], [127716, 0.333333], [131967, 0.140028], [143742, 0.140028], [144277, 0.140028], [152320, 0.140028], [160191, 0.140028], [165713, 0.140028], [177415, 0.140028], [178752, 0.140028], [182171, 0.140028], [183619, 0.140028], [184540, 0.140028], [185975, 0.140028], [189716, 0.140028], [196264, 0.140028], [198379, 0.140028], [199871, 0.140028], [201018, 0.140028], [201541, 0.140028], [206321, 0.140028], [210659, 0.140028], [210783, 0.333333], [212885, 0.140028], [217255, 0.140028], [220075, 0.707107], [226181, 0.140028], [226942, 0.140028], [232057, 0.333333], [234440, 0.333333], [236586, 0.140028], [238023, 0.140028], [240777, 0.140028], [242649, 0.140028], [246755, 0.333333], [247008, 0.140028], [249615, 0.140028], [252436, 0.140028], [253605, 0.140028], [260220, 0.140028]], "top": [["compress_targz", 0.9786286907657462], ["extract_targz", 0.013143920366936552]]}, {"model": "tool", "f": [[4661, 0.091287], [6755, 0.091287], [8030, 0.091287], [8442, 0.091287], [9172, 0.091287], [14560, 0.091287], [19980, 0.091287], [24006, 0.091287], [25103, 0.091287], [32482, 0.091287], [37355, 0.091287], [37368, 0.091287], [38577, 0.182574], [40501, 0.091287], [40584, 0.707107], [47677, 0.229416], [49194, 0.091287], [50250, 0.091287], [51000, 0.091287], [52871, 0.229416], [54305, 0.091287], [55223, 0.091287], [56079, 0.091287], [56284, 0.091287], [58072, 0.091287], [67139, 0.091287], [69995, 0.091287], [71911, 0.091287], [72302, 0.091287], [72879, 0.091287], [73558, 0.091287], [78811, 0.091287], [79444, 0.091287], [81292, 0.229416], [85011, 0.091287], [85279, 0.091287], [85429, 0.229416], [87929, 0.091287], [88040, 0.091287], [89794, 0.091287], [90702, 0.091287], [90740, 0.091287], [91506, 0.229416], [91594, 0.091287], [92872, 0.091287], [93334, 0.091287], [94589, 0.091287], [96755, 0.091287], [96956, 0.229416], [98961, 0.091287], [99551, 0.091287], [106416, 0.091287], [108246, 0.229416], [110504, 0.091287], [113686, 0.229416], [113733, 0.091287], [118984, 0.091287], [121098, 0.091287], [125495, 0.091287], [126381, 0.091287], [127186, 0.229416], [130556, 0.091287], [131371, 0.091287], [131397, 0.091287], [131771, 0.091287], [137660, 0.229416], [138228, 0.091287], [139358, 0.091287], [139624, 0.091287], [140943, 0.091287], [144565, 0.091287], [144710, 0.229416], [146712, 0.091287], [148377, 0.091287], [148889, 0.091287], [150905, 0.229416], [153471, 0.229416], [159184, 0.091287], [160061, 0.091287], [161682, 0.091287], [162884, 0.229416], [162902, 0.229416], [164078, 0.091287], [166251, 0.091287], [166522, 0.091287], [168065, 0.091287], [168519, 0.091287], [169188, 0.229416], [169260, 0.091287], [172321, 0.091287], [172702, 0.091287], [173651, 0.091287], [175985, 0.091287], [179483, 0.091287], [181336, 0.091287], [186783, 0.229416], [186837, 0.091287], [192516, 0.091287], [197714, 0.091287], [199322, 0.229416], [201467, 0.091287], [207232, 0.091287], [210854, 0.091287], [211632, 0.091287], [212305, 0.091287], [213082, 0.707107], [213598, 0.091287], [215216, 0.091287], [215272, 0.091287], [218342, 0.091287], [218543, 0.091287], [220028, 0.091287], [220293, 0.091287], [221749, 0.091287], [224058, 0.091287], [225202, 0.091287], [227643, 0.091287], [229658, 0.091287], [229941, 0.091287], [231083, 0.091287], [231144, 0.091287], [232092, 0.091287], [232294, 0.091287], [236243, 0.091287], [237696, 0.229416], [240440, 0.091287], [242335, 0.091287], [243269, 0.091287], [244883, 0.091287], [244936, 0.091287], [245654, 0.091287], [246391, 0.091287], [247473, 0.091287], [251650, 0.091287], [259497, 0.091287], [259530, 0.091287], [261440, 0.091287], [262006, 0.091287]], "top": [["chmod", 0.901925083408639], ["docker", 0.04622903421230571], ["find", 0.011817325135705825]]}, {"model": "intent:chmod", "f": [[4661, 0.091287], [6755, 0.091287], [8030, 0.091287], [8442, 0.091287], [9172, 0.091287], [14560, 0.091287], [19980, 0.091287], [24006, 0.091287], [25103, 0.091287], [32482, 0.091287], [37355, 0.091287], [37368, 0.091287], [38577, 0.182574], [40501, 0.091287], [40584, 0.707107], [47677, 0.229416], [49194, 0.091287], [50250, 0.091287], [51000, 0.091287], [52871, 0.229416], [54305, 0.091287], [55223, 0.091287], [56079, 0.091287], [56284, 0.091287], [58072, 0.091287], [67139, 0.091287], [69995, 0.091287], [71911, 0.091287], [72302, 0.091287], [72879, 0.091287], [73558, 0.091287], [78811, 0.091287], [79444, 0.091287], [81292, 0.229416], [85011, 0.091287], [85279, 0.091287], [85429, 0.229416], [87929, 0.091287], [88040, 0.091287], [89794, 0.091287], [90702, 0.091287], [90740, 0.091287], [91506, 0.229416], [91594, 0.091287], [92872, 0.091287], [93334, 0.091287], [94589, 0.091287], [96755, 0.091287], [96956, 0.229416], [98961, 0.091287], [99551, 0.091287], [106416, 0.091287], [108246, 0.229416], [110504, 0.091287], [113686, 0.229416], [113733, 0.091287], [118984, 0.091287], [121098, 0.091287], [125495, 0.091287], [126381, 0.091287], [127186, 0.229416], [130556, 0.091287], [131371, 0.091287], [131397, 0.091287], [131771, 0.091287], [137660, 0.229416], [138228, 0.091287], [139358, 0.091287], [139624, 0.091287], [140943, 0.091287], [144565, 0.091287], [144710, 0.229416], [146712, 0.091287], [148377, 0.091287], [148889, 0.091287], [150905, 0.229416], [153471, 0.229416], [159184, 0.091287], [160061, 0.091287], [161682, 0.091287], [162884, 0.229416], [162902, 0.229416], [164078, 0.091287], [166251, 0.091287], [166522, 0.091287], [168065, 0.091287], [168519, 0.091287], [169188, 0.229416], [169260, 0.091287], [172321, 0.091287], [172702, 0.091287], [173651, 0.091287], [175985, 0.091287], [179483, 0.091287], [181336, 0.091287], [186783, 0.229416], [186837, 0.091287], [192516, 0.091287], [197714, 0.091287], [199322, 0.229416], [201467, 0.091287], [207232, 0.091287], [210854, 0.091287], [211632, 0.091287], [212305, 0.091287], [213082, 0.707107], [213598, 0.091287], [215216, 0.091287], [215272, 0.091287], [218342, 0.091287], [218543, 0.091287], [220028, 0.091287], [220293, 0.091287], [221749, 0.091287], [224058, 0.091287], [225202, 0.091287], [227643, 0.091287], [229658, 0.091287], [229941, 0.091287], [231083, 0.091287], [231144, 0.091287], [232092, 0.091287], [232294, 0.091287], [236243, 0.091287], [237696, 0.229416], [240440, 0.091287], [242335, 0.091287], [243269, 0.091287], [244883, 0.091287], [244936, 0.091287], [245654, 0.091287], [246391, 0.091287], [247473, 0.091287], [251650, 0.091287], [259497, 0.091287], [259530, 0.091287], [261440, 0.091287], [262006, 0.091287]], "top": [["chmod", 0.9621097237271136], ["make_executable", 0.037890276272886575]]}, {"model": "tool", "f": [[5933, 0.164399], [5964, 0.164399], [18156, 0.27735], [18807, 0.164399], [28394, 0.164399], [34082, 0.164399], [54582, 0.164399], [55549, 0.27735], [57025, 0.164399], [57092, 0.164399], [59131, 0.27735], [60085, 0.164399], [75194, 0.27735], [79345, 0.164399], [84111, 0.164399], [87844, 0.164399], [90561, 0.164399], [90662, 0.164399], [93654, 0.164399], [94847, 0.27735], [99327, 0.164399], [113912, 0.164399], [120748, 0.164399], [124765, 0.164399], [139772, 0.164399], [140027, 0.164399], [140872, 0.164399], [150383, 0.164399], [151908, 0.164399], [157694, 0.164399], [161033, 0.27735], [168390, 0.27735], [169518, 0.27735], [173836, 0.164399], [174535, 0.27735], [180148, 0.707107], [180558, 0.164399], [184153, 0.27735], [205264, 0.27735], [213082, 0.707107], [218375, 0.164399], [223687, 0.164399], [223778, 0.164399], [225170, 0.164399], [226687, 0.27735], [227536, 0.164399], [232092, 0.164399], [238953, 0.27735], [240607, 0.164399], [240843, 0.164399], [246298, 0.164399], [248107, 0.164399]], "top": [["rm", 0.9385925663340454], ["ssh", 0.01235658459270109], ["touch", 0.009308022597076094]]}, {"model": "intent:rm", "f": [[5933, 0.164399], [5964, 0.164399], [18156, 0.27735], [18807, 0.164399], [28394, 0.164399], [34082, 0.164399], [54582, 0.164399], [55549, 0.27735], [57025, 0.164399], [57092, 0.164399], [59131, 0.27735], [60085, 0.164399], [75194, 0.27735], [79345, 0.164399], [84111, 0.164399], [87844, 0.164399], [90561, 0.164399], [90662, 0.164399], [93654, 0.164399], [94847, 0.27735], [99327, 0.164399], [113912, 0.164399], [120748, 0.164399], [124765, 0.164399], [139772, 0.164399], [140027, 0.164399], [140872, 0.164399], [150383, 0.164399], [151908, 0.164399], [157694, 0.164399], [161033, 0.27735], [168390, 0.27735], [169518, 0.27735], [173836, 0.164399], [174535, 0.27735], [180148, 0.707107], [180558, 0.164399], [184153, 0.27735], [205264, 0.27735], [213082, 0.707107], [218375, 0.164399], [223687, 0.164399], [223778, 0.164399], [225170, 0.164399], [226687, 0.27735], [227536, 0.164399], [232092, 0.164399], [238953, 0.27735], [240607, 0.164399], [240843, 0.164399], [246298, 0.164399], [248107, 0.164399]], "top": [["delete_file", 0.9811611980059428], ["delete_dir", 0.01883880199405713]]}, {"model": "tool", "f": [[694, 0.107833], [696, 0.107833], [1095, 0.107833], [2019, 0.107833], [8687, 0.107833], [12428, 0.242536], [21845, 0.107833], [22164, 0.242536], [24123, 0.707107], [28051, 0.107833], [29019, 0.107833], [29507, 0.107833], [30031, 0.107833], [33663, 0.107833], [34693, 0.107833], [34886, 0.107833], [36562, 0.107833], [41581, 0.107833], [42438, 0.242536], [46632, 0.242536], [49764, 0.215666], [51220, 0.107833], [51855, 0.242536], [52433, 0.107833], [53043, 0.242536], [56765, 0.107833], [57037, 0.107833], [60940, 0.107833], [66234, 0.107833], [67318, 0.107833], [67577, 0.107833], [69369, 0.107833], [70175, 0.107833], [72258, 0.107833], [75791, 0.107833], [75816, 0.107833], [76284, 0.107833], [79166, 0.107833], [80093, 0.107833], [83154, 0.107833], [88460, 0.107833], [88702, 0.107833], [90600, 0.107833], [93638, 0.242536], [94872, 0.107833], [96072, 0.107833], [96571, 0.107833], [108430, 0.107833], [115813, 0.242536], [119052, 0.107833], [119539, 0.107833], [120751, 0.107833], [123972, 0.107833], [126147, 0.107833], [127063, 0.107833], [127947, 0.107833], [130158, 0.107833], [130910, 0.242536], [132467, 0.107833], [134906, 0.107833], [140849, 0.107833], [142042, 0.107833], [142305, 0.107833], [152320, 0.107833], [155523, 0.107833], [157608, 0.107833], [160880, 0.107833], [161651, 0.107833], [165192, 0.107833], [166252, 0.107833], [167743, 0.107833], [172145, 0.107833], [172736, 0.242536], [177791, 0.242536], [188627, 0.107833], [192277, 0.107833], [192399, 0.107833], [204537, 0.242536], [213082, 0.707107], [213371, 0.107833], [217213, 0.107833], [217389, 0.107833], [219325, 0.107833], [220084, 0.107833], [221629, 0.242536], [222499, 0.107833], [229175, 0.107833], [232092, 0.107833], [234728, 0.107833], [235002, 0.107833], [236422, 0.107833], [237775, 0.107833], [241511, 0.107833], [242858, 0.107833], [248282, 0.242536], [248710, 0.242536], [248733, 0.107833], [252033, 0.107833], [252696, 0.107833], [259823, 0.242536], [261133, 0.242536], [261580, 0.107833]], "top": [["ln", 0.9990333277539583], ["find", 0.0002570929457724084], ["cp", 0.00020738583918980763]]}, {"model": "tool", "f": [[2332, 0.136083], [5964, 0.136083], [10886, 0.136083], [15409, 0.333333], [20217, 0.136083], [25342, 0.136083], [32464, 0.136083], [36517, 0.136083], [36539, 0.136083], [40025, 0.136083], [40688, 0.136083], [52810, 0.136083], [61662, 0.136083], [71128, 0.136083], [71264, 0.136083], [74849, 0.136083], [75265, 0.333333], [79268, 0.136083], [87018, 0.707107], [87883, 0.136083], [88083, 0.136083], [90561, 0.136083], [90653, 0.136083], [92341, 0.136083], [99327, 0.136083], [104936, 0.136083], [114707, 0.333333], [118544, 0.136083], [120748, 0.136083], [120905, 0.136083], [123972, 0.136083], [128227, 0.136083], [128703, 0.333333], [131377, 0.136083], [131440, 0.136083], [134234, 0.136083], [137378, 0.136083], [139772, 0.136083], [141424, 0.333333], [144718, 0.136083], [145526, 0.136083], [149775, 0.136083], [150383, 0.136083], [150938, 0.136083], [151184, 0.136083], [158611, 0.136083], [162231, 0.136083], [173836, 0.136083], [182939, 0.136083], [188590, 0.136083], [196122, 0.136083], [212440, 0.136083], [216589, 0.333333], [220075, 0.707107], [223210, 0.136083], [231195, 0.136083], [233793, 0.136083], [236228, 0.333333], [241091, 0.136083], [243735, 0.333333], [244936, 0.136083], [246126, 0.333333], [247301, 0.136083], [250272, 0.136083], [258677, 0.136083]], "top": [["hash", 0.9997837148276684], ["__none__", 8.306498171574895e-05], ["fileinfo", 2.3723168717140007e-05]]}, {"model": "intent:hash", "f": [[2332, 0.136083], [5964, 0.136083], [10886, 0.136083], [15409, 0.333333], [20217, 0.136083], [25342, 0.136083], [32464, 0.136083], [36517, 0.136083], [36539, 0.136083], [40025, 0.136083], [40688, 0.136083], [52810, 0.136083], [61662, 0.136083], [71128, 0.136083], [71264, 0.136083], [74849, 0.136083], [75265, 0.333333], [79268, 0.136083], [87018, 0.707107], [87883, 0.136083], [88083, 0.136083], [90561, 0.136083], [90653, 0.136083], [92341, 0.136083], [99327, 0.136083], [104936, 0.136083], [114707, 0.333333], [118544, 0.136083], [120748, 0.136083], [120905, 0.136083], [123972, 0.136083], [128227, 0.136083], [128703, 0.333333], [131377, 0.136083], [131440, 0.136083], [134234, 0.136083], [137378, 0.136083], [139772, 0.136083], [141424, 0.333333], [144718, 0.136083], [145526, 0.136083], [149775, 0.136083], [150383, 0.136083], [150938, 0.136083], [151184, 0.136083], [158611, 0.136083], [162231, 0.136083], [173836, 0.136083], [182939, 0.136083], [188590, 0.136083], [196122, 0.136083], [212440, 0.136083], [216589, 0.333333], [220075, 0.707107], [223210, 0.136083], [231195, 0.136083], [233793, 0.136083], [236228, 0.333333], [241091, 0.136083], [243735, 0.333333], [244936, 0.136083], [246126, 0.333333], [247301, 0.136083], [250272, 0.136083], [258677, 0.136083]], "top": [["hash_md5", 0.9967135071051649], ["hash_sha256", 0.0032864928948350457]]}, {"model": "tool", "f": [[5106, 0.132453], [6655, 0.132453], [21556, 0.132453], [27648, 0.132453], [28709, 0.132453], [29075, 0.132453], [32837, 0.132453], [33552, 0.132453], [38258, 0.132453], [45988, 0.132453], [49798, 0.132453], [50302, 0.132453], [51427, 0.132453], [53649, 0.132453], [58954, 0.132453], [60350, 0.132453], [69189, 0.132453], [69817, 0.132453], [73831, 0.447214], [78956, 0.132453], [79919, 0.132453], [85435, 0.132453], [85523, 0.132453], [88035, 0.447214], [89858, 0.132453], [91809, 0.132453], [94097, 0.132453], [96223, 0.132453], [98389, 0.132453], [124773, 0.132453], [126557, 0.132453], [131272, 0.132453], [137635, 0.132453], [144992, 0.132453], [148323, 0.132453], [152565, 0.132453], [166011, 0.132453], [168532, 0.132453], [169081, 0.132453], [170152, 0.447214], [170188, 0.132453], [175087, 0.132453], [182702, 0.132453], [184416, 0.132453], [184596, 0.132453], [184828, 0.132453], [202403, 0.132453], [212252, 0.132453], [213082, 0.707107], [214323, 0.132453], [217568, 0.132453], [222148, 0.132453], [224513, 0.132453], [227584, 0.132453], [229517, 0.132453], [229889, 0.707107], [233559, 0.132453], [236243, 0.132453], [244803, 0.132453], [249033, 0.447214], [249973, 0.132453], [252906, 0.447214], [256617, 0.132453], [261542, 0.132453]], "top": [["kill", 0.9879836369978174], ["ps", 0.006487298900478607], ["systemctl", 0.0025074405122893295]]}, {"model": "intent:kill", "f": [[5106, 0.132453], [6655, 0.132453], [21556, 0.132453], [27648, 0.132453], [28709, 0.132453], [29075, 0.132453], [32837, 0.132453], [33552, 0.132453], [38258, 0.132453], [45988, 0.132453], [49798, 0.132453], [50302, 0.132453], [51427, 0.132453], [53649, 0.132453], [58954, 0.132453], [60350, 0.132453], [69189, 0.132453], [69817, 0.132453], [73831, 0.447214], [78956, 0.132453], [79919, 0.132453], [85435, 0.132453], [85523, 0.132453], [88035, 0.447214], [89858, 0.132453], [91809, 0.132453], [94097, 0.132453], [96223, 0.132453], [98389, 0.132453], [124773, 0.132453], [126557, 0.132453], [131272, 0.132453], [137635, 0.132453], [144992, 0.132453], [148323, 0.132453], [152565, 0.132453], [166011, 0.132453], [168532, 0.132453], [169081, 0.132453], [170152, 0.447214], [170188, 0.132453], [175087, 0.132453], [182702, 0.132453], [184416, 0.132453], [184596, 0.132453], [184828, 0.132453], [202403, 0.132453], [212252, 0.132453], [213082, 0.707107], [214323, 0.132453], [217568, 0.132453], [222148, 0.132453], [224513, 0.132453], [227584, 0.132453], [229517, 0.132453], [229889, 0.707107], [233559, 0.132453], [236243, 0.132453], [244803, 0.132453], [249033, 0.447214], [249973, 0.132453], [252906, 0.447214], [256617, 0.132453], [261542, 0.132453]], "top": [["kill_by_name", 0.9901867553241842], ["kill_by_pid", 0.006219873468689907]]}, {"model": "tool", "f": [[499, 0.096225], [3332, 0.096225], [3918, 0.096225], [5964, 0.096225], [8540, 0.096225], [8971, 0.301511], [12786, 0.096225], [14112, 0.096225], [15115, 0.096225], [23686, 0.096225], [27648, 0.096225], [29104, 0.096225], [31593, 0.096225], [31703, 0.096225], [33077, 0.096225], [33182, 0.301511], [38985, 0.096225], [39215, 0.096225], [41279, 0.096225], [41681, 0.096225], [44972, 0.096225], [45061, 0.096225], [47086, 0.096225], [49212, 0.096225], [58935, 0.096225], [61705, 0.096225], [62199, 0.096225], [65583, 0.096225], [69491, 0.096225], [72748, 0.096225], [78978, 0.096225], [79351, 0.096225], [80656, 0.096225], [84204, 0.096225], [86732, 0.096225], [87673, 0.096225], [89624, 0.096225], [90406, 0.096225], [90927, 0.301511], [92096, 0.096225], [92764, 0.096225], [92939, 0.096225], [100318, 0.096225], [101264, 0.096225], [105653, 0.096225], [111720, 0.096225], [114704, 0.096225], [120748, 0.096225], [121913, 0.096225], [121921, 0.096225], [126131, 0.096225], [127565, 0.096225], [128498, 0.096225], [129379, 0.096225], [130849, 0.096225], [132867, 0.096225], [137441, 0.096225], [140294, 0.301511], [141503, 0.096225], [142886, 0.096225], [145291, 0.301511], [146951, 0.096225], [148986, 0.301511], [149413, 0.096225], [149872, 0.301511], [150383, 0.096225], [150589, 0.096225], [154885, 0.096225], [155687, 0.301511], [155771, 0.301511], [156789, 0.096225], [158740, 0.096225], [160626, 0.096225], [166519, 0.096225], [167067, 0.096225], [169216, 0.096225], [169339, 0.096225], [171187, 0.096225], [171273, 0.096225], [173562, 0.096225], [175045, 0.096225], [175595, 0.301511], [178103, 0.096225], [181016, 0.096225], [188589, 0.096225], [188607, 0.096225], [190154, 0.096225], [190302, 0.096225], [192027, 0.096225], [197314, 0.096225], [199358, 0.096225], [200094, 0.096225], [206528, 0.301511], [207875, 0.096225], [210648, 0.096225], [213082, 0.707107], [213087, 0.096225], [218287, 0.096225], [220540, 0.096225], [221884, 0.096225], [222247, 0.096225], [223575, 0.096225], [225051, 0.096225], [225657, 0.096225], [228070, 0.096225], [229158, 0.096225], [229889, 0.707107], [230757, 0.096225], [231439, 0.096225], [235002, 0.096225], [235540, 0.096225], [235606, 0.096225], [236876, 0.096225], [239206, 0.096225], [240786, 0.096225], [245447, 0.096225], [251331, 0.096225], [252632, 0.096225], [254935, 0.096225], [255856, 0.096225], [256616, 0.096225]], "top": [["ss", 0.9923594540438082], ["nc", 0.0007331724118623816], ["__none__", 0.00046357151080397336]]}, {"model": "intent:ss", "f": [[499, 0.096225], [3332, 0.096225], [3918, 0.096225], [5964, 0.096225], [8540, 0.096225], [8971, 0.301511], [12786, 0.096225], [14112, 0.096225], [15115, 0.096225], [23686, 0.096225], [27648, 0.096225], [29104, 0.096225], [31593, 0.096225], [31703, 0.096225], [33077, 0.096225], [33182, 0.301511], [38985, 0.096225], [39215, 0.096225], [41279, 0.096225], [41681, 0.096225], [44972, 0.096225], [45061, 0.096225], [47086, 0.096225], [49212, 0.096225], [58935, 0.096225], [61705, 0.096225], [62199, 0.096225], [65583, 0.096225], [69491, 0.096225], [72748, 0.096225], [78978, 0.096225], [79351, 0.096225], [80656, 0.096225], [84204, 0.096225], [86732, 0.096225], [87673, 0.096225], [89624, 0.096225], [90406, 0.096225], [90927, 0.301511], [92096, 0.096225], [92764, 0.096225], [92939, 0.096225], [100318, 0.096225], [101264, 0.096225], [105653, 0.096225], [111720, 0.096225], [114704, 0.096225], [120748, 0.096225], [121913, 0.096225], [121921, 0.096225], [126131, 0.096225], [127565, 0.096225], [128498, 0.096225], [129379, 0.096225], [130849, 0.096225], [132867, 0.096225], [137441, 0.096225], [140294, 0.301511], [141503, 0.096225], [142886, 0.096225], [145291, 0.301511], [146951, 0.096225], [148986, 0.301511], [149413, 0.096225], [149872, 0.301511], [150383, 0.096225], [150589, 0.096225], [154885, 0.096225], [155687, 0.301511], [155771, 0.301511], [156789, 0.096225], [158740, 0.096225], [160626, 0.096225], [166519, 0.096225], [167067, 0.096225], [169216, 0.096225], [169339, 0.096225], [171187, 0.096225], [171273, 0.096225], [173562, 0.096225], [175045, 0.096225], [175595, 0.301511], [178103, 0.096225], [181016, 0.096225], [188589, 0.096225], [188607, 0.096225], [190154, 0.096225], [190302, 0.096225], [192027, 0.096225], [197314, 0.096225], [199358, 0.096225], [200094, 0.096225], [206528, 0.301511], [207875, 0.096225], [210648, 0.096225], [213082, 0.707107], [213087, 0.096225], [218287, 0.096225], [220540, 0.096225], [221884, 0.096225], [222247, 0.096225], [223575, 0.096225], [225051, 0.096225], [225657, 0.096225], [228070, 0.096225], [229158, 0.096225], [229889, 0.707107], [230757, 0.096225], [231439, 0.096225], [235002, 0.096225], [235540, 0.096225], [235606, 0.096225], [236876, 0.096225], [239206, 0.096225], [240786, 0.096225], [245447, 0.096225], [251331, 0.096225], [252632, 0.096225], [254935, 0.096225], [255856, 0.096225], [256616, 0.096225]], "top": [["established_connections", 0.9936165094704845], ["listening_ports", 0.005722174613385672]]}, {"model": "tool", "f": [[2301, 0.144338], [6916, 0.377964], [7265, 0.144338], [8560, 0.144338], [12374, 0.144338], [14504, 0.377964], [15825, 0.144338], [16377, 0.144338], [18882, 0.144338], [21082, 0.377964], [21364, 0.144338], [23837, 0.144338], [24097, 0.144338], [25723, 0.144338], [32974, 0.144338], [46660, 0.377964], [49208, 0.144338], [57315, 0.144338], [61948, 0.144338], [68172, 0.144338], [69271, 0.377964], [69369, 0.144338], [83511, 0.144338], [84643, 0.144338], [86334, 0.377964], [87896, 0.144338], [88966, 0.144338], [90027, 0.144338], [93302, 0.144338], [98846, 0.144338], [98915, 0.144338], [105274, 0.144338], [112800, 0.377964], [115084, 0.144338], [116132, 0.144338], [119978, 0.144338], [121555, 0.144338], [129352, 0.144338], [130743, 0.144338], [131655, 0.144338], [140093, 0.377964], [145961, 0.144338], [160117, 0.144338], [164285, 0.377964], [168532, 0.144338], [168533, 0.377964], [180148, 0.377964], [189771, 0.377964], [194218, 0.144338], [197847, 0.144338], [201074, 0.144338], [207412, 0.144338], [208188, 0.144338], [213060, 0.144338], [213082, 0.377964], [213448, 0.144338], [228497, 0.144338], [237737, 0.144338], [240738, 0.377964], [240777, 0.144338], [246044, 0.144338], [252436, 0.144338]], "top": [["uptime", 0.9911277059362311], ["git", 0.00291225024477772], ["hardware", 0.0009285437210134048]]}, {"model": "tool", "f": [[13480, 0.136083], [17114, 0.136083], [17130, 0.136083], [23213, 0.136083], [23516, 0.136083], [24123, 0.707107], [30217, 0.136083], [33245, 0.136083], [35495, 0.136083], [49361, 0.136083], [56129, 0.136083], [62787, 0.707107], [65502, 0.377964], [66381, 0.136083], [66690, 0.136083], [73185, 0.136083], [78116, 0.377964], [79533, 0.377964], [84289, 0.377964], [84516, 0.136083], [85156, 0.136083], [87206, 0.136083], [95145, 0.136083], [95217, 0.136083], [95480, 0.136083], [99297, 0.136083], [101807, 0.136083], [103282, 0.136083], [105217, 0.136083], [111682, 0.136083], [125752, 0.136083], [126555, 0.136083], [127366, 0.136083], [131723, 0.136083], [140689, 0.136083], [140796, 0.136083], [142593, 0.136083], [148300, 0.136083], [151762, 0.377964], [155222, 0.136083], [156044, 0.136083], [157862, 0.136083], [165954, 0.377964], [167530, 0.136083], [170471, 0.136083], [171354, 0.136083], [173961, 0.136083], [175045, 0.136083], [177090, 0.136083], [177463, 0.136083], [185920, 0.377964], [190998, 0.136083], [192292, 0.136083], [213739, 0.136083], [214229, 0.136083], [228929, 0.136083], [238589, 0.136083], [242253, 0.136083], [243556, 0.136083], [250835, 0.136083], [257972, 0.136083], [261580, 0.136083], [261700, 0.136083]], "top": [["which", 0.9445720137273664], ["pwd", 0.010176872633907976], ["env", 0.009664447371613328]]}, {"model": "tool", "f": [[1030, 0.258199], [2243, 0.128037], [5873, 0.128037], [11743, 0.128037], [11959, 0.258199], [15825, 0.128037], [16308, 0.128037], [22780, 0.258199], [24097, 0.128037], [26181, 0.128037], [26733, 0.128037], [27396, 0.128037], [32168, 0.128037], [32974, 0.128037], [43436, 0.128037], [45714, 0.128037], [52994, 0.128037], [58072, 0.128037], [60277, 0.128037], [61948, 0.128037], [65835, 0.258199], [69369, 0.128037], [69697, 0.128037], [75669, 0.128037], [78443, 0.128037], [88013, 0.128037], [89624, 0.128037], [90027, 0.128037], [90314, 0.128037], [96956, 0.258199], [98799, 0.128037], [98915, 0.128037], [103475, 0.128037], [108742, 0.128037], [115084, 0.128037], [116674, 0.128037], [117863, 0.128037], [124804, 0.128037], [126214, 0.258199], [129625, 0.258199], [131770, 0.128037], [133059, 0.128037], [133714, 0.128037], [135814, 0.128037], [136718, 0.128037], [138107, 0.128037], [138798, 0.128037], [149185, 0.128037], [156044, 0.128037], [156267, 0.128037], [163698, 0.128037], [163896, 0.128037], [164253, 0.128037], [164285, 0.258199], [166724, 0.128037], [171327, 0.128037], [171483, 0.128037], [172929, 0.128037], [177322, 0.258199], [177462, 0.258199], [193641, 0.258199], [194218, 0.128037], [196068, 0.128037], [197238, 0.128037], [201074, 0.128037], [206101, 0.258199], [206277, 0.258199], [213819, 0.128037], [216860, 0.128037], [220075, 0.707107], [234527, 0.258199], [238698, 0.258199], [242626, 0.128037], [245689, 0.128037], [247411, 0.128037], [256771, 0.128037], [259198, 0.128037], [260215, 0.707107]], "top": [["journalctl", 0.9906915357927923], ["find", 0.0038835361054327154], ["docker", 0.000999223759516451]]}, {"model": "intent:journalctl", "f": [[1030, 0.258199], [2243, 0.128037], [5873, 0.128037], [11743, 0.128037], [11959, 0.258199], [15825, 0.128037], [16308, 0.128037], [22780, 0.258199], [24097, 0.128037], [26181, 0.128037], [26733, 0.128037], [27396, 0.128037], [32168, 0.128037], [32974, 0.128037], [43436, 0.128037], [45714, 0.128037], [52994, 0.128037], [58072, 0.128037], [60277, 0.128037], [61948, 0.128037], [65835, 0.258199], [69369, 0.128037], [69697, 0.128037], [75669, 0.128037], [78443, 0.128037], [88013, 0.128037], [89624, 0.128037], [90027, 0.128037], [90314, 0.128037], [96956, 0.258199], [98799, 0.128037], [98915, 0.128037], [103475, 0.128037], [108742, 0.128037], [115084, 0.128037], [116674, 0.128037], [117863, 0.128037], [124804, 0.128037], [126214, 0.258199], [129625, 0.258199], [131770, 0.128037], [133059, 0.128037], [133714, 0.128037], [135814, 0.128037], [136718, 0.128037], [138107, 0.128037], [138798, 0.128037], [149185, 0.128037], [156044, 0.128037], [156267, 0.128037], [163698, 0.128037], [163896, 0.128037], [164253, 0.128037], [164285, 0.258199], [166724, 0.128037], [171327, 0.128037], [171483, 0.128037], [172929, 0.128037], [177322, 0.258199], [177462, 0.258199], [193641, 0.258199], [194218, 0.128037], [196068, 0.128037], [197238, 0.128037], [201074, 0.128037], [206101, 0.258199], [206277, 0.258199], [213819, 0.128037], [216860, 0.128037], [220075, 0.707107], [234527, 0.258199], [238698, 0.258199], [242626, 0.128037], [245689, 0.128037], [247411, 0.128037], [256771, 0.128037], [259198, 0.128037], [260215, 0.707107]], "top": [["journal_service", 0.9756735433580616], ["journal_errors", 0.019687032803957963]]}, {"model": "tool", "f": [[8300, 0.125988], [15569, 0.125988], [16593, 0.377964], [18644, 0.125988], [20434, 0.125988], [22187, 0.125988], [22496, 0.125988], [26590, 0.125988], [26685, 0.125988], [40540, 0.377964], [40584, 0.377964], [41747, 0.125988], [46009, 0.377964], [46660, 0.377964], [55257, 0.377964], [57674, 0.125988], [59721, 0.125988], [68495, 0.125988], [71929, 0.377964], [73754, 0.125988], [80606, 0.125988], [82493, 0.125988], [82876, 0.125988], [86334, 0.377964], [88012, 0.125988], [99249, 0.125988], [99572, 0.125988], [100876, 0.125988], [102136, 0.125988], [110890, 0.125988], [116009, 0.125988], [124411, 0.125988], [126555, 0.125988], [127406, 0.125988], [129848, 0.125988], [129952, 0.125988], [133373, 0.125988], [133636, 0.125988], [137407, 0.125988], [140096, 0.125988], [144340, 0.125988], [152998, 0.377964], [156051, 0.125988], [163952, 0.125988], [172953, 0.377964], [173327, 0.125988], [182675, 0.377964], [186396, 0.125988], [186846, 0.125988], [187107, 0.377964], [193989, 0.125988], [195094, 0.125988], [204035, 0.125988], [205350, 0.125988], [206232, 0.125988], [207944, 0.125988], [208161, 0.377964], [213082, 0.377964], [213812, 0.125988], [214930, 0.125988], [216658, 0.125988], [216711, 0.125988], [220342, 0.125988], [225359, 0.125988], [229405, 0.125988], [232092, 0.125988], [232495, 0.125988], [239031, 0.125988], [241466, 0.125988], [243343, 0.125988], [243664, 0.125988], [247140, 0.125988], [248036, 0.125988], [249033, 0.125988], [253402, 0.125988], [260150, 0.125988], [261114, 0.125988]], "top": [["systemctl", 0.9997959655790478], ["journalctl", 0.0001240398536700793], ["docker", 1.3889753256145892e-05]]}, {"model": "intent:systemctl", "f": [[8300, 0.125988], [15569, 0.125988], [16593, 0.377964], [18644, 0.125988], [20434, 0.125988], [22187, 0.125988], [22496, 0.125988], [26590, 0.125988], [26685, 0.125988], [40540, 0.377964], [40584, 0.377964], [41747, 0.125988], [46009, 0.377964], [46660, 0.377964], [55257, 0.377964], [57674, 0.125988], [59721, 0.125988], [68495, 0.125988], [71929, 0.377964], [73754, 0.125988], [80606, 0.125988], [82493, 0.125988], [82876, 0.125988], [86334, 0.377964], [88012, 0.125988], [99249, 0.125988], [99572, 0.125988], [100876, 0.125988], [102136, 0.125988], [110890, 0.125988], [116009, 0.125988], [124411, 0.125988], [126555, 0.125988], [127406, 0.125988], [129848, 0.125988], [129952, 0.125988], [133373, 0.125988], [133636, 0.125988], [137407, 0.125988], [140096, 0.125988], [144340, 0.125988], [152998, 0.377964], [156051, 0.125988], [163952, 0.125988], [172953, 0.377964], [173327, 0.125988], [182675, 0.377964], [186396, 0.125988], [186846, 0.125988], [187107, 0.377964], [193989, 0.125988], [195094, 0.125988], [204035, 0.125988], [205350, 0.125988], [206232, 0.125988], [207944, 0.125988], [208161, 0.377964], [213082, 0.377964], [213812, 0.125988], [214930, 0.125988], [216658, 0.125988], [216711, 0.125988], [220342, 0.125988], [225359, 0.125988], [229405, 0.125988], [232092, 0.125988], [232495, 0.125988], [239031, 0.125988], [241466, 0.125988], [243343, 0.125988], [243664, 0.125988], [247140, 0.125988], [248036, 0.125988], [249033, 0.125988], [253402, 0.125988], [260150, 0.125988], [261114, 0.125988]], "top": [["service_start", 0.9834429862587012], ["list_services", 0.006517783029123131]]}, {"model": "tool", "f": [[489, 0.160128], [3674, 0.160128], [7494, 0.160128], [8950, 0.160128], [17795, 0.160128], [20716, 0.160128], [23658, 0.160128], [38935, 0.160128], [40817, 0.160128], [45821, 0.447214], [51368, 0.447214], [57899, 0.160128], [58481, 0.447214], [69502, 0.160128], [80926, 0.447214], [87018, 0.707107], [95409, 0.160128], [99249, 0.160128], [107451, 0.160128], [109894, 0.160128], [118003, 0.160128], [118155, 0.160128], [121194, 0.160128], [130050, 0.160128], [153842, 0.160128], [163907, 0.160128], [164108, 0.160128], [164507, 0.160128], [167176, 0.160128], [173472, 0.160128], [182798, 0.160128], [188590, 0.160128], [195094, 0.160128], [197213, 0.160128], [199731, 0.160128], [205350, 0.160128], [209188, 0.160128], [213812, 0.160128], [217662, 0.160128], [220075, 0.707107], [229405, 0.160128], [241309, 0.160128], [245678, 0.447214], [247140, 0.160128], [249408, 0.160128], [256390, 0.160128]], "top": [["hardware", 0.9914315115651487], ["__none__", 0.002630935775354712], ["cpu", 0.0005676051618290633]]}, {"model": "intent:hardware", "f": [[489, 0.160128], [3674, 0.160128], [7494, 0.160128], [8950, 0.160128], [17795, 0.160128], [20716, 0.160128], [23658, 0.160128], [38935, 0.160128], [40817, 0.160128], [45821, 0.447214], [51368, 0.447214], [57899, 0.160128], [58481, 0.447214], [69502, 0.160128], [80926, 0.447214], [87018, 0.707107], [95409, 0.160128], [99249, 0.160128], [107451, 0.160128], [109894, 0.160128], [118003, 0.160128], [118155, 0.160128], [121194, 0.160128], [130050, 0.160128], [153842, 0.160128], [163907, 0.160128], [164108, 0.160128], [164507, 0.160128], [167176, 0.160128], [173472, 0.160128], [182798, 0.160128], [188590, 0.160128], [195094, 0.160128], [197213, 0.160128], [199731, 0.160128], [205350, 0.160128], [209188, 0.160128], [213812, 0.160128], [217662, 0.160128], [220075, 0.707107], [229405, 0.160128], [241309, 0.160128], [245678, 0.447214], [247140, 0.160128], [249408, 0.160128], [256390, 0.160128]], "top": [["gpu_info", 0.9953744471698914], ["temperature", 0.002514879867739116]]}, {"model": "tool", "f": [[6624, 0.117851], [10528, 0.117851], [16780, 0.117851], [19396, 0.117851], [21054, 0.117851], [45817, 0.117851], [48221, 0.117851], [48805, 0.117851], [51954, 0.117851], [56071, 0.117851], [57316, 0.117851], [62888, 0.117851], [67469, 0.301511], [67784, 0.117851], [76404, 0.117851], [79664, 0.117851], [82626, 0.117851], [86307, 0.117851], [87018, 0.707107], [89305, 0.117851], [91655, 0.117851], [93251, 0.117851], [94520, 0.117851], [94589, 0.117851], [96595, 0.117851], [100464, 0.117851], [103920, 0.117851], [105294, 0.117851], [109011, 0.117851], [110281, 0.117851], [118057, 0.117851], [120937, 0.301511], [122550, 0.117851], [122926, 0.117851], [125756, 0.301511], [126555, 0.117851], [127945, 0.301511], [135156, 0.301511], [138227, 0.117851], [143369, 0.117851], [143443, 0.117851], [148462, 0.117851], [149522, 0.117851], [153803, 0.117851], [153965, 0.117851], [155411, 0.301511], [155960, 0.117851], [157435, 0.117851], [158356, 0.117851], [158481, 0.117851], [158865, 0.117851], [164020, 0.117851], [172627, 0.117851], [173497, 0.301511], [183164, 0.301511], [184562, 0.117851], [185261, 0.301511], [191206, 0.117851], [193282, 0.117851], [193440, 0.117851], [198044, 0.117851], [202348, 0.117851], [205136, 0.117851], [207091, 0.117851], [207561, 0.117851], [211823, 0.301511], [213382, 0.117851], [213790, 0.117851], [215021, 0.117851], [215248, 0.117851], [218914, 0.117851], [220075, 0.707107], [220087, 0.117851], [222078, 0.117851], [223659, 0.117851], [226721, 0.301511], [230493, 0.117851], [239286, 0.117851], [243210, 0.117851], [244883, 0.117851], [244936, 0.117851], [248599, 0.117851], [250320, 0.117851], [256863, 0.117851], [257253, 0.117851]], "top": [["ping", 0.9672123485143227], ["ps", 0.009763758577065124], ["ip", 0.004126591219787946]]}, {"model": "tool", "f": [[855, 0.242536], [5797, 0.094491], [9843, 0.094491], [16978, 0.094491], [23096, 0.094491], [27690, 0.094491], [33142, 0.094491], [33336, 0.188982], [33650, 0.094491], [34586, 0.094491], [39286, 0.094491], [40253, 0.094491], [40584, 0.707107], [42194, 0.094491], [42296, 0.242536], [49073, 0.242536], [49764, 0.094491], [49873, 0.094491], [52344, 0.188982], [53966, 0.094491], [57037, 0.094491], [57070, 0.242536], [58072, 0.094491], [67577, 0.094491], [69088, 0.188982], [69146, 0.094491], [69369, 0.094491], [70623, 0.094491], [72494, 0.094491], [76941, 0.094491], [78378, 0.094491], [82343, 0.094491], [85524, 0.188982], [86899, 0.094491], [87177, 0.094491], [88621, 0.094491], [88702, 0.094491], [90306, 0.242536], [90740, 0.094491], [96484, 0.094491], [96956, 0.242536], [96972, 0.094491], [98183, 0.094491], [100807, 0.094491], [101713, 0.094491], [103976, 0.188982], [107792, 0.094491], [112536, 0.188982], [113755, 0.242536], [115650, 0.094491], [116158, 0.094491], [118346, 0.094491], [119681, 0.094491], [123954, 0.094491], [125430, 0.094491], [127461, 0.242536], [129367, 0.094491], [130158, 0.094491], [136292, 0.094491], [137268, 0.485071], [140305, 0.094491], [144140, 0.242536], [146850, 0.094491], [153958, 0.094491], [154324, 0.094491], [160223, 0.094491], [160306, 0.094491], [161651, 0.094491], [166268, 0.188982], [166522, 0.094491], [168598, 0.094491], [170145, 0.094491], [174315, 0.094491], [176745, 0.094491], [178710, 0.094491], [185017, 0.094491], [190080, 0.188982], [192399, 0.094491], [199312, 0.094491], [203890, 0.094491], [211121, 0.094491], [213082, 0.707107], [218279, 0.094491], [220821, 0.242536], [223114, 0.094491], [224570, 0.094491], [229254, 0.094491], [233146, 0.094491], [237787, 0.242536], [239781, 0.094491], [239862, 0.094491], [240776, 0.188982], [240814, 0.094491], [243285, 0.094491], [245639, 0.094491], [247081, 0.094491], [248733, 0.094491], [250253, 0.094491], [252479, 0.094491], [256877, 0.242536], [259823, 0.242536]], "top": [["curl", 0.999188120007183], ["git", 0.00038877820371513623], ["grep", 0.00010517929764374306]]}, {"model": "intent:curl", "f": [[855, 0.242536], [5797, 0.094491], [9843, 0.094491], [16978, 0.094491], [23096, 0.094491], [27690, 0.094491], [33142, 0.094491], [33336, 0.188982], [33650, 0.094491], [34586, 0.094491], [39286, 0.094491], [40253, 0.094491], [40584, 0.707107], [42194, 0.094491], [42296, 0.242536], [49073, 0.242536], [49764, 0.094491], [49873, 0.094491], [52344, 0.188982], [53966, 0.094491], [57037, 0.094491], [57070, 0.242536], [58072, 0.094491], [67577, 0.094491], [69088, 0.188982], [69146, 0.094491], [69369, 0.094491], [70623, 0.094491], [72494, 0.094491], [76941, 0.094491], [78378, 0.094491], [82343, 0.094491], [85524, 0.188982], [86899, 0.094491], [87177, 0.094491], [88621, 0.094491], [88702, 0.094491], [90306, 0.242536], [90740, 0.094491], [96484, 0.094491], [96956, 0.242536], [96972, 0.094491], [98183, 0.094491], [100807, 0.094491], [101713, 0.094491], [103976, 0.188982], [107792, 0.094491], [112536, 0.188982], [113755, 0.242536], [115650, 0.094491], [116158, 0.094491], [118346, 0.094491], [119681, 0.094491], [123954, 0.094491], [125430, 0.094491], [127461, 0.242536], [129367, 0.094491], [130158, 0.094491], [136292, 0.094491], [137268, 0.485071], [140305, 0.094491], [144140, 0.242536], [146850, 0.094491], [153958, 0.094491], [154324, 0.094491], [160223, 0.094491], [160306, 0.094491], [161651, 0.094491], [166268, 0.188982], [166522, 0.094491], [168598, 0.094491], [170145, 0.094491], [174315, 0.094491], [176745, 0.094491], [178710, 0.094491], [185017, 0.094491], [190080, 0.188982], [192399, 0.094491], [199312, 0.094491], [203890, 0.094491], [211121, 0.094491], [213082, 0.707107], [218279, 0.094491], [220821, 0.242536], [223114, 0.094491], [224570, 0.094491], [229254, 0.094491], [233146, 0.094491], [237787, 0.242536], [239781, 0.094491], [239862, 0.094491], [240776, 0.188982], [240814, 0.094491], [243285, 0.094491], [245639, 0.094491], [247081, 0.094491], [248733, 0.094491], [250253, 0.094491], [252479, 0.094491], [256877, 0.242536], [259823, 0.242536]], "top": [["http_status", 0.993120804277235], ["curl_headers", 0.0032136679597981996]]}, {"model": "tool", "f": [[2818, 0.447214], [4957, 0.447214], [9620, 0.125988], [15551, 0.125988], [17130, 0.125988], [20846, 0.125988], [23930, 0.125988], [28460, 0.125988], [28849, 0.125988], [31198, 0.125988], [35706, 0.125988], [39956, 0.125988], [40004, 0.125988], [40584, 0.707107], [44360, 0.125988], [49361, 0.125988], [49412, 0.125988], [56062, 0.125988], [56129, 0.125988], [60898, 0.125988], [62787, 0.707107], [65717, 0.125988], [69321, 0.125988], [73185, 0.125988], [79533, 0.447214], [80713, 0.125988], [90673, 0.125988], [99297, 0.125988], [108011, 0.125988], [109946, 0.125988], [110935, 0.125988], [116723, 0.125988], [117308, 0.125988], [118003, 0.125988], [120531, 0.125988], [123176, 0.125988], [127366, 0.125988], [129026, 0.125988], [135397, 0.125988], [135684, 0.125988], [136765, 0.125988], [142593, 0.125988], [148146, 0.447214], [149606, 0.125988], [149779, 0.125988], [152590, 0.125988], [161067, 0.125988], [161845, 0.125988], [165019, 0.125988], [165211, 0.125988], [171354, 0.125988], [175045, 0.125988], [175587, 0.125988], [191096, 0.125988], [191977, 0.125988], [196563, 0.125988], [210487, 0.125988], [212824, 0.125988], [215800, 0.125988], [216457, 0.125988], [223314, 0.125988], [226734, 0.125988], [227269, 0.125988], [233567, 0.125988], [234577, 0.125988], [234835, 0.447214], [237518, 0.125988], [240260, 0.125988], [249973, 0.125988], [251585, 0.125988]], "top": [["git", 0.9996679591389854], ["disks", 0.00011346256747423864], ["env", 1.9103353994667922e-05]]}, {"model": "intent:git", "f": [[2818, 0.447214], [4957, 0.447214], [9620, 0.125988], [15551, 0.125988], [17130, 0.125988], [20846, 0.125988], [23930, 0.125988], [28460, 0.125988], [28849, 0.125988], [31198, 0.125988], [35706, 0.125988], [39956, 0.125988], [40004, 0.125988], [40584, 0.707107], [44360, 0.125988], [49361, 0.125988], [49412, 0.125988], [56062, 0.125988], [56129, 0.125988], [60898, 0.125988], [62787, 0.707107], [65717, 0.125988], [69321, 0.125988], [73185, 0.125988], [79533, 0.447214], [80713, 0.125988], [90673, 0.125988], [99297, 0.125988], [108011, 0.125988], [109946, 0.125988], [110935, 0.125988], [116723, 0.125988], [117308, 0.125988], [118003, 0.125988], [120531, 0.125988], [123176, 0.125988], [127366, 0.125988], [129026, 0.125988], [135397, 0.125988], [135684, 0.125988], [136765, 0.125988], [142593, 0.125988], [148146, 0.447214], [149606, 0.125988], [149779, 0.125988], [152590, 0.125988], [161067, 0.125988], [161845, 0.125988], [165019, 0.125988], [165211, 0.125988], [171354, 0.125988], [175045, 0.125988], [175587, 0.125988], [191096, 0.125988], [191977, 0.125988], [196563, 0.125988], [210487, 0.125988], [212824, 0.125988], [215800, 0.125988], [216457, 0.125988], [223314, 0.125988], [226734, 0.125988], [227269, 0.125988], [233567, 0.125988], [234577, 0.125988], [234835, 0.447214], [237518, 0.125988], [240260, 0.125988], [249973, 0.125988], [251585, 0.125988]], "top": [["git_diff_staged", 0.9593237626394672], ["git_diff", 0.03101851937408523]]}, {"model": "tool", "f": [[10718, 0.129099], [11532, 0.129099], [12174, 0.129099], [17305, 0.301511], [19754, 0.129099], [21845, 0.129099], [24849, 0.129099], [38088, 0.301511], [40584, 0.707107], [55256, 0.129099], [62787, 0.707107], [71814, 0.129099], [77925, 0.129099], [78389, 0.129099], [80150, 0.301511], [80309, 0.129099], [84368, 0.129099], [84643, 0.129099], [85609, 0.301511], [93270, 0.129099], [96571, 0.129099], [96786, 0.129099], [99568, 0.129099], [106512, 0.129099], [106617, 0.129099], [107905, 0.129099], [117335, 0.129099], [120591, 0.129099], [122789, 0.129099], [126147, 0.129099], [132348, 0.129099], [140849, 0.129099], [142305, 0.129099], [147447, 0.129099], [153322, 0.129099], [153663, 0.301511], [153938, 0.129099], [163701, 0.129099], [164507, 0.129099], [164750, 0.301511], [165289, 0.129099], [166522, 0.129099], [168532, 0.129099], [169622, 0.301511], [176361, 0.301511], [183926, 0.129099], [187214, 0.129099], [188627, 0.129099], [192277, 0.129099], [197685, 0.129099], [205063, 0.129099], [211484, 0.129099], [213161, 0.129099], [215021, 0.129099], [215248, 0.129099], [215403, 0.129099], [216510, 0.129099], [219583, 0.301511], [220576, 0.129099], [221629, 0.301511], [224431, 0.129099], [225330, 0.129099], [225349, 0.129099], [227621, 0.129099], [227950, 0.129099], [228497, 0.129099], [236373, 0.129099], [237191, 0.129099], [250164, 0.129099], [250320, 0.129099], [256304, 0.301511], [258724, 0.129099], [259302, 0.129099]], "top": [["git", 0.9994706893506792], ["cp", 0.0004516452835402498], ["chmod", 8.418637280481398e-06]]}, {"model": "intent:git", "f": [[10718, 0.129099], [11532, 0.129099], [12174, 0.129099], [17305, 0.301511], [19754, 0.129099], [21845, 0.129099], [24849, 0.129099], [38088, 0.301511], [40584, 0.707107], [55256, 0.129099], [62787, 0.707107], [71814, 0.129099], [77925, 0.129099], [78389, 0.129099], [80150, 0.301511], [80309, 0.129099], [84368, 0.129099], [84643, 0.129099], [85609, 0.301511], [93270, 0.129099], [96571, 0.129099], [96786, 0.129099], [99568, 0.129099], [106512, 0.129099], [106617, 0.129099], [107905, 0.129099], [117335, 0.129099], [120591, 0.129099], [122789, 0.129099], [126147, 0.129099], [132348, 0.129099], [140849, 0.129099], [142305, 0.129099], [147447, 0.129099], [153322, 0.129099], [153663, 0.301511], [153938, 0.129099], [163701, 0.129099], [164507, 0.129099], [164750, 0.301511], [165289, 0.129099], [166522, 0.129099], [168532, 0.129099], [169622, 0.301511], [176361, 0.301511], [183926, 0.129099], [187214, 0.129099], [188627, 0.129099], [192277, 0.129099], [197685, 0.129099], [205063, 0.129099], [211484, 0.129099], [213161, 0.129099], [215021, 0.129099], [215248, 0.129099], [215403, 0.129099], [216510, 0.129099], [219583, 0.301511], [220576, 0.129099], [221629, 0.301511], [224431, 0.129099], [225330, 0.129099], [225349, 0.129099], [227621, 0.129099], [227950, 0.129099], [228497, 0.129099], [236373, 0.129099], [237191, 0.129099], [250164, 0.129099], [250320, 0.129099], [256304, 0.301511], [258724, 0.129099], [259302, 0.129099]], "top": [["git_discard_changes", 0.9588614183017243], ["git_add_all", 0.012343904444230943]]}, {"model": "tool", "f": [[2291, 0.27735], [7993, 0.098533], [11162, 0.098533], [14177, 0.098533], [14969, 0.098533], [21794, 0.197066], [22626, 0.098533], [25566, 0.098533], [37858, 0.197066], [37867, 0.197066], [38602, 0.098533], [43153, 0.197066], [53637, 0.098533], [56465, 0.098533], [58746, 0.098533], [62503, 0.098533], [64082, 0.197066], [68782, 0.098533], [85274, 0.098533], [89494, 0.098533], [95506, 0.27735], [97921, 0.098533], [102847, 0.197066], [110271, 0.098533], [120005, 0.27735], [120751, 0.098533], [121983, 0.098533], [123807, 0.098533], [132799, 0.098533], [134122, 0.098533], [134943, 0.5547], [137317, 0.098533], [138297, 0.098533], [146146, 0.098533], [147830, 0.197066], [153459, 0.098533], [166522, 0.197066], [171530, 0.098533], [180148, 0.707107], [188690, 0.27735], [195614, 0.098533], [199326, 0.27735], [199977, 0.098533], [213082, 0.707107], [213304, 0.197066], [213766, 0.27735], [216606, 0.098533], [219323, 0.098533], [220293, 0.197066], [220532, 0.098533], [220890, 0.098533], [221749, 0.197066], [223907, 0.098533], [225039, 0.098533], [231439, 0.098533], [232505, 0.27735], [234951, 0.27735], [235783, 0.098533], [242649, 0.098533], [243503, 0.295599], [249992, 0.197066], [250499, 0.197066], [251933, 0.27735], [252839, 0.098533], [260925, 0.197066]], "top": [["git", 0.9999993312923849], ["chmod", 2.0775201097436448e-07], ["diff", 1.1347306263818703e-07]]}, {"model": "intent:git", "f": [[2291, 0.27735], [7993, 0.098533], [11162, 0.098533], [14177, 0.098533], [14969, 0.098533], [21794, 0.197066], [22626, 0.098533], [25566, 0.098533], [37858, 0.197066], [37867, 0.197066], [38602, 0.098533], [43153, 0.197066], [53637, 0.098533], [56465, 0.098533], [58746, 0.098533], [62503, 0.098533], [64082, 0.197066], [68782, 0.098533], [85274, 0.098533], [89494, 0.098533], [95506, 0.27735], [97921, 0.098533], [102847, 0.197066], [110271, 0.098533], [120005, 0.27735], [120751, 0.098533], [121983, 0.098533], [123807, 0.098533], [132799, 0.098533], [134122, 0.098533], [134943, 0.5547], [137317, 0.098533], [138297, 0.098533], [146146, 0.098533], [147830, 0.197066], [153459, 0.098533], [166522, 0.197066], [171530, 0.098533], [180148, 0.707107], [188690, 0.27735], [195614, 0.098533], [199326, 0.27735], [199977, 0.098533], [213082, 0.707107], [213304, 0.197066], [213766, 0.27735], [216606, 0.098533], [219323, 0.098533], [220293, 0.197066], [220532, 0.098533], [220890, 0.098533], [221749, 0.197066], [223907, 0.098533], [225039, 0.098533], [231439, 0.098533], [232505, 0.27735], [234951, 0.27735], [235783, 0.098533], [242649, 0.098533], [243503, 0.295599], [249992, 0.197066], [250499, 0.197066], [251933, 0.27735], [252839, 0.098533], [260925, 0.197066]], "top": [["git_commit", 0.9803579127693565], ["git_undo_commit", 0.01278987150916298]]}, {"model": "tool", "f": [[3461, 0.144338], [8027, 0.144338], [17130, 0.144338], [18754, 0.144338], [21082, 0.447214], [24123, 0.447214], [32482, 0.144338], [38276, 0.144338], [38577, 0.144338], [40954, 0.144338], [49361, 0.144338], [55223, 0.144338], [56129, 0.144338], [63356, 0.447214], [66938, 0.447214], [69995, 0.144338], [71477, 0.447214], [73185, 0.144338], [79533, 0.447214], [87077, 0.144338], [88040, 0.144338], [93334, 0.144338], [99297, 0.144338], [102344, 0.447214], [103742, 0.144338], [104085, 0.144338], [119978, 0.144338], [120531, 0.144338], [121098, 0.144338], [122348, 0.144338], [123535, 0.144338], [125847, 0.144338], [127186, 0.447214], [127366, 0.144338], [138361, 0.144338], [141551, 0.144338], [142593, 0.144338], [168519, 0.144338], [171354, 0.144338], [172321, 0.144338], [175045, 0.144338], [191977, 0.144338], [197090, 0.144338], [206905, 0.144338], [210854, 0.144338], [213082, 0.447214], [214142, 0.144338], [221497, 0.144338], [223314, 0.144338], [230389, 0.144338], [233772, 0.144338], [245654, 0.144338], [245661, 0.447214], [247029, 0.144338], [247301, 0.144338], [248599, 0.144338], [256472, 0.144338], [259497, 0.144338]], "top": [["docker", 0.9967834676485818], ["systemctl", 0.0007878913728934337], ["journalctl", 0.0005081397698252196]]}, {"model": "intent:docker", "f": [[3461, 0.144338], [8027, 0.144338], [17130, 0.144338], [18754, 0.144338], [21082, 0.447214], [24123, 0.447214], [32482, 0.144338], [38276, 0.144338], [38577, 0.144338], [40954, 0.144338], [49361, 0.144338], [55223, 0.144338], [56129, 0.144338], [63356, 0.447214], [66938, 0.447214], [69995, 0.144338], [71477, 0.447214], [73185, 0.144338], [79533, 0.447214], [87077, 0.144338], [88040, 0.144338], [93334, 0.144338], [99297, 0.144338], [102344, 0.447214], [103742, 0.144338], [104085, 0.144338], [119978, 0.144338], [120531, 0.144338], [121098, 0.144338], [122348, 0.144338], [123535, 0.144338], [125847, 0.144338], [127186, 0.447214], [127366, 0.144338], [138361, 0.144338], [141551, 0.144338], [142593, 0.144338], [168519, 0.144338], [171354, 0.144338], [172321, 0.144338], [175045, 0.144338], [191977, 0.144338], [197090, 0.144338], [206905, 0.144338], [210854, 0.144338], [213082, 0.447214], [214142, 0.144338], [221497, 0.144338], [223314, 0.144338], [230389, 0.144338], [233772, 0.144338], [245654, 0.144338], [245661, 0.447214], [247029, 0.144338], [247301, 0.144338], [248599, 0.144338], [256472, 0.144338], [259497, 0.144338]], "top": [["docker_images", 0.9722043916181676], ["docker_prune", 0.01315980798957245]]}, {"model": "tool", "f": [[6916, 0.377964], [24123, 0.377964], [27648, 0.129099], [29075, 0.129099], [32837, 0.129099], [37179, 0.129099], [40501, 0.129099], [42038, 0.129099], [49013, 0.447214], [51427, 0.129099], [53649, 0.129099], [56079, 0.129099], [58954, 0.129099], [61610, 0.129099], [62787, 0.377964], [72879, 0.129099], [73831, 0.447214], [85435, 0.129099], [85523, 0.129099], [89383, 0.129099], [90740, 0.129099], [91809, 0.129099], [99354, 0.377964], [110504, 0.129099], [110640, 0.129099], [115433, 0.129099], [115910, 0.129099], [124773, 0.129099], [124796, 0.377964], [126557, 0.129099], [131018, 0.129099], [131272, 0.129099], [137635, 0.129099], [137660, 0.447214], [138949, 0.129099], [140943, 0.129099], [144992, 0.129099], [148323, 0.129099], [151202, 0.129099], [159024, 0.129099], [161682, 0.129099], [166011, 0.129099], [166522, 0.129099], [169081, 0.129099], [175087, 0.129099], [181734, 0.377964], [182702, 0.129099], [184596, 0.129099], [186837, 0.129099], [188043, 0.129099], [190328, 0.129099], [196563, 0.129099], [199988, 0.377964], [202403, 0.129099], [212306, 0.447214], [213598, 0.129099], [214323, 0.129099], [217568, 0.129099], [218342, 0.129099], [218543, 0.129099], [220293, 0.129099], [221749, 0.129099], [231211, 0.129099], [236243, 0.129099], [242335, 0.129099], [243269, 0.129099], [244803, 0.129099], [249973, 0.129099], [251650, 0.129099], [261086, 0.447214], [261440, 0.129099], [261542, 0.129099]], "top": [["docker", 0.9981209337057929], ["kill", 0.0010462127836598234], ["find", 0.0003045060504300193]]}, {"model": "intent:docker", "f": [[6916, 0.377964], [24123, 0.377964], [27648, 0.129099], [29075, 0.129099], [32837, 0.129099], [37179, 0.129099], [40501, 0.129099], [42038, 0.129099], [49013, 0.447214], [51427, 0.129099], [53649, 0.129099], [56079, 0.129099], [58954, 0.129099], [61610, 0.129099], [62787, 0.377964], [72879, 0.129099], [73831, 0.447214], [85435, 0.129099], [85523, 0.129099], [89383, 0.129099], [90740, 0.129099], [91809, 0.129099], [99354, 0.377964], [110504, 0.129099], [110640, 0.129099], [115433, 0.129099], [115910, 0.129099], [124773, 0.129099], [124796, 0.377964], [126557, 0.129099], [131018, 0.129099], [131272, 0.129099], [137635, 0.129099], [137660, 0.447214], [138949, 0.129099], [140943, 0.129099], [144992, 0.129099], [148323, 0.129099], [151202, 0.129099], [159024, 0.129099], [161682, 0.129099], [166011, 0.129099], [166522, 0.129099], [169081, 0.129099], [175087, 0.129099], [181734, 0.377964], [182702, 0.129099], [184596, 0.129099], [186837, 0.129099], [188043, 0.129099], [190328, 0.129099], [196563, 0.129099], [199988, 0.377964], [202403, 0.129099], [212306, 0.447214], [213598, 0.129099], [214323, 0.129099], [217568, 0.129099], [218342, 0.129099], [218543, 0.129099], [220293, 0.129099], [221749, 0.129099], [231211, 0.129099], [236243, 0.129099], [242335, 0.129099], [243269, 0.129099], [244803, 0.129099], [249973, 0.129099], [251650, 0.129099], [261086, 0.447214], [261440, 0.129099], [261542, 0.129099]], "top": [["docker_compose_down", 0.9930254285866951], ["docker_stop", 0.003711093990512432]]}, {"model": "tool", "f": [[1718, 0.103695], [5106, 0.103695], [12335, 0.103695], [13385, 0.103695], [16187, 0.301511], [19346, 0.103695], [20021, 0.103695], [22864, 0.103695], [25396, 0.103695], [26694, 0.103695], [26876, 0.103695], [27465, 0.103695], [29283, 0.301511], [33526, 0.103695], [34341, 0.103695], [35142, 0.103695], [39383, 0.103695], [41600, 0.103695], [43184, 0.103695], [46582, 0.103695], [53637, 0.20739], [55112, 0.103695], [59394, 0.301511], [62906, 0.103695], [63748, 0.301511], [64111, 0.103695], [67813, 0.103695], [69013, 0.103695], [77879, 0.103695], [83163, 0.301511], [90653, 0.103695], [93751, 0.103695], [93999, 0.103695], [97673, 0.301511], [100125, 0.103695], [103097, 0.103695], [103122, 0.301511], [107507, 0.301511], [107534, 0.103695], [108549, 0.103695], [111893, 0.103695], [117306, 0.103695], [119086, 0.103695], [122480, 0.103695], [122559, 0.103695], [123972, 0.103695], [128837, 0.103695], [131592, 0.103695], [134234, 0.103695], [135038, 0.103695], [135118, 0.103695], [138608, 0.103695], [138795, 0.301511], [143742, 0.103695], [147426, 0.103695], [149914, 0.20739], [152031, 0.103695], [152320, 0.103695], [156074, 0.103695], [156576, 0.20739], [157488, 0.301511], [160191, 0.103695], [164020, 0.103695], [166252, 0.103695], [171209, 0.103695], [178752, 0.103695], [182171, 0.103695], [183592, 0.103695], [183619, 0.103695], [183911, 0.103695], [196264, 0.103695], [199399, 0.103695], [199751, 0.20739], [201541, 0.103695], [203703, 0.20739], [212885, 0.103695], [215696, 0.20739], [217141, 0.103695], [217255, 0.103695], [217881, 0.103695], [220075, 0.707107], [224752, 0.103695], [239965, 0.301511], [242649, 0.103695], [247008, 0.103695], [260215, 0.707107], [260220, 0.103695], [261929, 0.103695]], "top": [["mkdir", 0.9307739371082857], ["ls", 0.010013865884509336], ["curl", 0.00961005961778112]]}, {"model": "tool", "f": [[5849, 0.127], [27809, 0.377964], [33142, 0.127], [38174, 0.127], [39810, 0.127], [40219, 0.127], [42133, 0.127], [42919, 0.127], [45015, 0.127], [50699, 0.127], [55271, 0.127], [56133, 0.127], [56463, 0.377964], [56655, 0.377964], [66617, 0.377964], [77084, 0.127], [79879, 0.127], [93343, 0.127], [95883, 0.127], [96573, 0.127], [96823, 0.127], [113226, 0.127], [114562, 0.127], [118577, 0.127], [120315, 0.127], [126639, 0.127], [129848, 0.127], [139113, 0.127], [141611, 0.127], [141966, 0.127], [146163, 0.127], [146689, 0.127], [150332, 0.127], [153673, 0.127], [153958, 0.127], [160930, 0.127], [166522, 0.254], [169339, 0.127], [185567, 0.127], [186303, 0.127], [186432, 0.127], [196709, 0.127], [198985, 0.377964], [202408, 0.127], [203120, 0.377964], [203850, 0.377964], [211121, 0.127], [211547, 0.127], [211607, 0.127], [219084, 0.127], [220058, 0.127], [220075, 0.707107], [220293, 0.127], [220540, 0.127], [221749, 0.127], [222991, 0.127], [225963, 0.127], [226200, 0.127], [227596, 0.127], [230369, 0.127], [239158, 0.127], [242246, 0.127], [244101, 0.127], [249163, 0.127], [252388, 0.127], [260215, 0.707107], [260382, 0.127], [260823, 0.127]], "top": [["dig", 0.9797728914482999], ["ping", 0.006813693297627296], ["curl", 0.00259737102918525]]}, {"model": "tool", "f": [[6916, 0.408248], [27648, 0.19245], [29075, 0.19245], [32837, 0.19245], [40584, 0.408248], [43199, 0.57735], [45714, 0.19245], [51427, 0.19245], [53649, 0.19245], [58954, 0.19245], [73831, 0.57735], [84739, 0.408248], [85435, 0.19245], [85523, 0.19245], [91809, 0.19245], [124773, 0.19245], [126557, 0.19245], [131272, 0.19245], [137635, 0.19245], [144992, 0.19245], [151362, 0.19245], [161499, 0.408248], [166011, 0.19245], [169081, 0.19245], [175087, 0.19245], [183729, 0.408248], [184596, 0.19245], [202403, 0.19245], [213082, 0.408248], [214323, 0.19245], [217568, 0.19245], [230614, 0.19245], [239714, 0.57735], [244803, 0.19245], [249973, 0.19245], [261542, 0.19245]], "top": [["docker", 0.9733225102508896], ["systemctl", 0.020727546630852148], ["kill", 0.004650011345962361]]}, {"model": "intent:docker", "f": [[6916, 0.408248], [27648, 0.19245], [29075, 0.19245], [32837, 0.19245], [40584, 0.408248], [43199, 0.57735], [45714, 0.19245], [51427, 0.19245], [53649, 0.19245], [58954, 0.19245], [73831, 0.57735], [84739, 0.408248], [85435, 0.19245], [85523, 0.19245], [91809, 0.19245], [124773, 0.19245], [126557, 0.19245], [131272, 0.19245], [137635, 0.19245], [144992, 0.19245], [151362, 0.19245], [161499, 0.408248], [166011, 0.19245], [169081, 0.19245], [175087, 0.19245], [183729, 0.408248], [184596, 0.19245], [202403, 0.19245], [213082, 0.408248], [214323, 0.19245], [217568, 0.19245], [230614, 0.19245], [239714, 0.57735], [244803, 0.19245], [249973, 0.19245], [261542, 0.19245]], "top": [["docker_stop", 0.9983478469948969], ["docker_stop_all", 0.0007669396170513601]]}, {"model": "tool", "f": [[1718, 0.099504], [2301, 0.199007], [3337, 0.099504], [5106, 0.099504], [9467, 0.258199], [11268, 0.258199], [14368, 0.258199], [15825, 0.099504], [16377, 0.199007], [17114, 0.099504], [23857, 0.099504], [24097, 0.099504], [25396, 0.099504], [26694, 0.099504], [27799, 0.099504], [28779, 0.099504], [31933, 0.099504], [32974, 0.099504], [33526, 0.099504], [39383, 0.099504], [41600, 0.099504], [48463, 0.099504], [50705, 0.099504], [57315, 0.199007], [58551, 0.099504], [61048, 0.099504], [61948, 0.099504], [66598, 0.099504], [69013, 0.099504], [69035, 0.258199], [69271, 0.516398], [78443, 0.099504], [79630, 0.099504], [80188, 0.258199], [83163, 0.258199], [90027, 0.099504], [93999, 0.099504], [94405, 0.099504], [98435, 0.099504], [98457, 0.099504], [98915, 0.099504], [100125, 0.099504], [110536, 0.099504], [112800, 0.258199], [112969, 0.099504], [115084, 0.099504], [119086, 0.099504], [121555, 0.199007], [122559, 0.099504], [126639, 0.099504], [133011, 0.099504], [143742, 0.099504], [149511, 0.099504], [156044, 0.099504], [157198, 0.099504], [160191, 0.099504], [163728, 0.258199], [164285, 0.258199], [165808, 0.099504], [166522, 0.099504], [167530, 0.099504], [168775, 0.099504], [171483, 0.099504], [178752, 0.099504], [182171, 0.099504], [183619, 0.099504], [185247, 0.099504], [190462, 0.099504], [194218, 0.099504], [196264, 0.099504], [197335, 0.099504], [201074, 0.099504], [201541, 0.099504], [202408, 0.099504], [206101, 0.258199], [212885, 0.099504], [217255, 0.099504], [219084, 0.099504], [220075, 0.707107], [220540, 0.099504], [225096, 0.099504], [226200, 0.099504], [229622, 0.099504], [229978, 0.099504], [232791, 0.099504], [240777, 0.199007], [242649, 0.099504], [245689, 0.099504], [247008, 0.099504], [250893, 0.199007], [252436, 0.199007], [256836, 0.258199], [260215, 0.707107], [260220, 0.099504]], "top": [["ls", 0.7938069816915055], ["pwd", 0.09679259203724255], ["ss", 0.018470630229184912]]}, {"model": "tool", "f": [[2301, 0.09759], [2692, 0.09759], [4058, 0.09759], [6655, 0.09759], [11172, 0.09759], [13582, 0.09759], [14177, 0.09759], [16377, 0.09759], [21501, 0.09759], [28137, 0.09759], [28797, 0.09759], [30346, 0.09759], [33552, 0.09759], [36175, 0.09759], [36423, 0.09759], [39383, 0.09759], [40584, 0.707107], [41057, 0.09759], [45166, 0.09759], [46793, 0.09759], [47577, 0.09759], [48463, 0.09759], [49915, 0.09759], [51575, 0.09759], [55649, 0.09759], [57315, 0.09759], [57555, 0.09759], [64368, 0.09759], [65668, 0.09759], [69189, 0.09759], [69271, 0.27735], [72450, 0.09759], [75677, 0.09759], [76059, 0.27735], [76600, 0.09759], [78443, 0.09759], [81635, 0.09759], [83012, 0.09759], [85594, 0.09759], [85817, 0.09759], [87135, 0.09759], [88035, 0.27735], [89858, 0.09759], [90578, 0.09759], [93596, 0.09759], [94589, 0.09759], [94914, 0.09759], [96223, 0.09759], [96251, 0.27735], [97210, 0.09759], [103278, 0.09759], [104300, 0.09759], [105445, 0.09759], [105843, 0.09759], [108868, 0.09759], [110271, 0.09759], [112460, 0.09759], [117494, 0.09759], [118034, 0.09759], [121555, 0.09759], [122156, 0.09759], [122976, 0.09759], [123794, 0.27735], [127927, 0.27735], [128621, 0.09759], [130229, 0.09759], [131655, 0.09759], [132959, 0.09759], [133878, 0.09759], [134671, 0.09759], [135580, 0.09759], [137501, 0.09759], [142116, 0.09759], [142890, 0.09759], [147446, 0.09759], [148323, 0.09759], [153607, 0.09759], [155190, 0.09759], [155533, 0.09759], [156940, 0.09759], [163698, 0.09759], [164613, 0.27735], [166414, 0.09759], [166566, 0.09759], [171483, 0.09759], [182702, 0.09759], [184416, 0.09759], [188126, 0.09759], [197244, 0.27735], [199752, 0.27735], [206101, 0.27735], [211666, 0.09759], [213082, 0.707107], [215021, 0.09759], [215248, 0.09759], [220680, 0.09759], [222148, 0.09759], [227284, 0.09759], [227584, 0.09759], [227659, 0.09759], [229517, 0.09759], [230193, 0.09759], [230491, 0.09759], [232521, 0.09759], [232694, 0.09759], [236243, 0.09759], [237296, 0.09759], [238134, 0.27735], [240777, 0.09759], [241798, 0.09759], [242404, 0.09759], [245689, 0.09759], [247176, 0.27735], [248679, 0.09759], [250320, 0.09759], [251672, 0.09759], [252436, 0.09759], [254548, 0.09759], [256008, 0.09759], [258668, 0.27735]], "top": [["cpu", 0.9633172564889391], ["kill", 0.013360969744753816], ["ps", 0.010957841689596565]]}, {"model": "intent:cpu", "f": [[2301, 0.09759], [2692, 0.09759], [4058, 0.09759], [6655, 0.09759], [11172, 0.09759], [13582, 0.09759], [14177, 0.09759], [16377, 0.09759], [21501, 0.09759], [28137, 0.09759], [28797, 0.09759], [30346, 0.09759], [33552, 0.09759], [36175, 0.09759], [36423, 0.09759], [39383, 0.09759], [40584, 0.707107], [41057, 0.09759], [45166, 0.09759], [46793, 0.09759], [47577, 0.09759], [48463, 0.09759], [49915, 0.09759], [51575, 0.09759], [55649, 0.09759], [57315, 0.09759], [57555, 0.09759], [64368, 0.09759], [65668, 0.09759], [69189, 0.09759], [69271, 0.27735], [72450, 0.09759], [75677, 0.09759], [76059, 0.27735], [76600, 0.09759], [78443, 0.09759], [81635, 0.09759], [83012, 0.09759], [85594, 0.09759], [85817, 0.09759], [87135, 0.09759], [88035, 0.27735], [89858, 0.09759], [90578, 0.09759], [93596, 0.09759], [94589, 0.09759], [94914, 0.09759], [96223, 0.09759], [96251, 0.27735], [97210, 0.09759], [103278, 0.09759], [104300, 0.09759], [105445, 0.09759], [105843, 0.09759], [108868, 0.09759], [110271, 0.09759], [112460, 0.09759], [117494, 0.09759], [118034, 0.09759], [121555, 0.09759], [122156, 0.09759], [122976, 0.09759], [123794, 0.27735], [127927, 0.27735], [128621, 0.09759], [130229, 0.09759], [131655, 0.09759], [132959, 0.09759], [133878, 0.09759], [134671, 0.09759], [135580, 0.09759], [137501, 0.09759], [142116, 0.09759], [142890, 0.09759], [147446, 0.09759], [148323, 0.09759], [153607, 0.09759], [155190, 0.09759], [155533, 0.09759], [156940, 0.09759], [163698, 0.09759], [164613, 0.27735], [166414, 0.09759], [166566, 0.09759], [171483, 0.09759], [182702, 0.09759], [184416, 0.09759], [188126, 0.09759], [197244, 0.27735], [199752, 0.27735], [206101, 0.27735], [211666, 0.09759], [213082, 0.707107], [215021, 0.09759], [215248, 0.09759], [220680, 0.09759], [222148, 0.09759], [227284, 0.09759], [227584, 0.09759], [227659, 0.09759], [229517, 0.09759], [230193, 0.09759], [230491, 0.09759], [232521, 0.09759], [232694, 0.09759], [236243, 0.09759], [237296, 0.09759], [238134, 0.27735], [240777, 0.09759], [241798, 0.09759], [242404, 0.09759], [245689, 0.09759], [247176, 0.27735], [248679, 0.09759], [250320, 0.09759], [251672, 0.09759], [252436, 0.09759], [254548, 0.09759], [256008, 0.09759], [258668, 0.27735]], "top": [["cpu_cores", 0.9557915932499749], ["cpu_info", 0.04420840675002519]]}], "tag": [{"f": [4509, 11749, 26724, 32868, 47261, 74777, 110776, 118101, 120897, 125301, 133251, 160594, 169974, 192921, 206195, 235592], "top": [["O", 0.9998735878784959], ["B-NUM", 5.653318912113985e-05]]}, {"f": [4509, 5827, 11749, 40949, 48576, 82952, 93162, 118762, 125301, 166401, 171626, 172771, 206195, 221879, 226718], "top": [["O", 0.9998370876835851], ["B-EXT", 6.0384185629504216e-05]]}, {"f": [4509, 11749, 47217, 64291, 86680, 86927, 93096, 93162, 113730, 116841, 120857, 156981, 188945, 206195, 240626, 262124], "top": [["O", 0.9999147380594204], ["B-PATH", 5.711046940841327e-05]]}, {"f": [11749, 26254, 26719, 48220, 103011, 103017, 104792, 120897, 125301, 128903, 153675, 154208, 155980, 168459, 206195, 235592], "top": [["O", 0.9999897460425388], ["B-PATH", 3.8861953430639526e-06]]}, {"f": [11749, 20540, 45649, 48220, 69861, 104775, 113301, 125301, 143381, 165459, 181784, 206195, 206411, 208256, 214400], "top": [["O", 0.999862899150667], ["B-NAME", 3.907285644144312e-05]]}, {"f": [11749, 29646, 37531, 48220, 54974, 98159, 118631, 151734, 171626, 188110, 198957, 206195, 220436, 224449, 254283], "top": [["O", 0.9999450508512667], ["B-PATH", 3.1497576149906565e-05]]}, {"f": [11749, 27252, 49326, 64986, 76730, 120897, 125301, 142908, 155558, 176702, 204431, 206195, 232742, 233080, 235592, 256278], "top": [["O", 0.9999846612416794], ["B-PATH", 4.7877648948195425e-06]]}, {"f": [11749, 45423, 49326, 78842, 118114, 119410, 125301, 144518, 146794, 152738, 154048, 184028, 206195, 210864, 216601], "top": [["O", 0.9998714290429107], ["B-PATH", 8.474396455591177e-05]]}, {"f": [11749, 49326, 56613, 64069, 65950, 70040, 77992, 93162, 157249, 170866, 172601, 184270, 185825, 204834, 206195], "top": [["O", 0.9998509060722198], ["B-PATH", 0.00012461361275979772]]}, {"f": [11749, 12780, 52075, 55293, 81037, 104775, 120897, 125301, 136074, 149680, 153523, 171842, 206195, 235592, 239469, 255895], "top": [["O", 0.9999886239599216], ["B-NAME", 3.869580507121157e-06]]}, {"f": [11749, 13194, 37531, 41852, 55293, 117608, 118631, 125301, 128397, 139604, 170519, 171626, 197614, 206195, 254283], "top": [["O", 0.9999980572157546], ["B-PATH", 5.976926792546267e-07]]}, {"f": [11749, 32437, 55293, 58768, 60971, 93605, 104716, 126880, 127452, 172022, 183463, 190977, 206195, 217043, 220815], "top": [["O", 0.9999927974638065], ["B-PATH", 1.3583659073716627e-06]]}, {"f": [11749, 26724, 34663, 50341, 74129, 82957, 109569, 120897, 125301, 169572, 177549, 206195, 207212, 233463, 235592, 243048], "top": [["O", 0.9999775909917742], ["B-NUM", 8.3150886981425e-06]]}, {"f": [11749, 69104, 81548, 98755, 109116, 125301, 149263, 162767, 174879, 179244, 202496, 206195, 226755, 231665, 243048], "top": [["O", 0.9999856628636454], ["B-PATH", 7.903301345354937e-06]]}, {"f": [2072, 11749, 14774, 61737, 71918, 88261, 132178, 132812, 132918, 144726, 193064, 193299, 210168, 243048, 261594], "top": [["O", 0.9999884762638691], ["B-PORT", 7.595311812890943e-06]]}, {"f": [11749, 48920, 118991, 120897, 125301, 128495, 140549, 150154, 163092, 166285, 176573, 177974, 206195, 235592, 252128, 254985], "top": [["O", 0.9931913214222704], ["B-NAME", 0.006593239537867017]]}, {"f": [11749, 18626, 38505, 40621, 47678, 60588, 111344, 118991, 125301, 173698, 198434, 206195, 230721, 231871, 258222], "top": [["O", 0.9971837224163221], ["B-NAME", 0.002642642218209378]]}, {"f": [8407, 11749, 31572, 61908, 63054, 69530, 72099, 89116, 93162, 93842, 118991, 129611, 144460, 197596, 206195, 238951], "top": [["B-NAME", 0.9994016715749573], ["O", 0.000569806754686738]]}, {"f": [8747, 11749, 38969, 67462, 80105, 86567, 120897, 125301, 149385, 180118, 206195, 206722, 235592, 249971, 254985, 255037], "top": [["O", 0.9998136526970836], ["B-NAME", 8.449324032277021e-05]]}, {"f": [11749, 17451, 22263, 35876, 101173, 125301, 156640, 181405, 206195, 206722, 219636, 230050, 237321, 245283, 255014], "top": [["O", 0.9995328771852897], ["B-TIME", 0.00023277983742774647]]}, {"f": [6306, 11749, 60086, 68956, 89548, 103248, 121830, 129458, 130382, 157017, 206195, 206722, 223428, 228586, 257712], "top": [["O", 0.9998412525683733], ["I-TIME", 0.00013448517610214824]]}, {"f": [11749, 52376, 93162, 94476, 120897, 125301, 127614, 161430, 180136, 206195, 224918, 235592, 243032, 258612, 260634, 261068], "top": [["O", 0.9998486619067987], ["B-NAME", 0.0001223108539505334]]}, {"f": [3572, 11749, 25394, 45702, 60190, 93162, 94476, 97610, 105418, 120857, 122404, 125301, 143036, 154152, 156302, 182674, 188945, 191333, 216094], "top": [["B-URL", 0.9999995781146119], ["O", 4.1349270525188504e-07]]}, {"f": [52, 11749, 14202, 77604, 120897, 125301, 132250, 133114, 144575, 148766, 169594, 204834, 206195, 211526, 235592, 238986], "top": [["O", 0.9999931577056721], ["B-NUM", 2.9415238896743685e-06]]}, {"f": [11749, 30022, 84258, 86826, 120129, 125301, 133114, 144100, 161318, 180956, 183113, 206195, 212604, 224008, 227969], "top": [["O", 0.9998988121468672], ["B-BRANCH", 5.7088656496280135e-05]]}, {"f": [11749, 42263, 129458, 131217, 133114, 182108, 192340, 194096, 196261, 206195, 212693, 226309, 227642, 241471, 243305], "top": [["O", 0.9999108866797692], ["B-MSG", 3.1639394294582275e-05]]}, {"f": [8747, 11749, 59572, 78112, 86567, 120897, 125301, 149385, 206195, 207997, 213924, 235592, 236093, 244673, 249971, 254985], "top": [["O", 0.9999453191763595], ["B-NUM", 2.207696673995851e-05]]}, {"f": [6045, 11749, 14032, 50178, 54537, 54642, 99740, 101173, 125301, 148662, 178389, 181405, 199842, 206195, 236093], "top": [["O", 0.9986906060500337], ["B-PATH", 0.0010450306395874257]]}, {"f": [11749, 12797, 26680, 68799, 119874, 130382, 167597, 173324, 188533, 189521, 206195, 218570, 231645, 236093, 238403], "top": [["O", 0.999843621409411], ["B-PATH", 7.991275921634736e-05]]}]}
// Per-shell / per-OS template variants (see src/render.js for precedence). Keys are intent ids from src/catalog.js.
//
// Keys per intent (all optional):
//   bsd      macOS/BSD userland (bash/zsh/sh on macOS without GNU coreutils), used before catalog `darwin`
//   gnuMac   macOS + Homebrew GNU coreutils (g-prefixed: gdu, gsort, gmd5sum, guniq, ...)
//   zsh      zsh only (bash/sh keep the POSIX choice)
//   busybox  BusyBox userland (Alpine etc.) - only where the GNU template uses flags/tools busybox lacks
//   fish     fish 3.x - only where the POSIX template is not valid fish
//   pwsh     PowerShell: a string (all OSes) or { win, unix }. A missing `unix` means the renderer falls back
//            to `bash -c '<posix command>'` (used where Linux and macOS natives differ). A missing `win`
//            is a Windows gap and is explained in gaps.pwsh ("Windows: ...").
//   cmd      cmd.exe, best effort
//   gaps     { shell: reason } when a shell/OS has no reasonable equivalent
//
// Template syntax is the catalog one ({slot}, {slot!raw}, «optional»). Function templates get
// (s, q, ctx) with ctx = { os, shell, coreutils }; `q` quotes for the target shell.
// PowerShell variants avoid `&&`/`||` (5.1 compat) and aliases, use -LiteralPath for user paths and
// never add -Force to destructive cmdlets unless the POSIX template forces too. Derived slots:
// ext (bare extension), minutes (time window in minutes), sizeBytes (size in bytes).

// Recursive file listing used by many PowerShell variants (-Force = include hidden files, like find).
const PS_FILES = 'Get-ChildItem -LiteralPath {path} -File -Recurse -Force -ErrorAction SilentlyContinue';
const PS_ALL = 'Get-ChildItem -LiteralPath {path} -Recurse -Force -ErrorAction SilentlyContinue';
const PS_FULLNAME = 'Select-Object -ExpandProperty FullName';
const PS_PROC_MATCH = 'Get-Process | Where-Object { $_.ProcessName -match {name} -or $_.CommandLine -match {name} }';
const PS_OS = 'Get-CimInstance -ClassName Win32_OperatingSystem';
const isWin = (ctx) => (ctx && ctx.os) === 'win32';

export const VARIANTS = {
  // ---------- files & disk ----------
  largest_files: {
    bsd: 'find {path} -xdev -type f -exec du -k {} + 2>/dev/null | sort -rn | head -n {count!raw}',
    gnuMac: 'find {path} -xdev -type f -exec du -h {} + 2>/dev/null | gsort -rh | head -n {count!raw}',
    pwsh: `${PS_FILES} | Sort-Object Length -Descending | Select-Object -First {count!raw} -Property Length, FullName`,
    gaps: { cmd: 'cmd.exe cannot sort files by size across subdirectories' },
  },
  largest_dirs: {
    bsd: 'du -k -d 1 {path} 2>/dev/null | sort -rn | head -n {count!raw}',
    gnuMac: 'gdu -h -d 1 {path} 2>/dev/null | gsort -rh | head -n {count!raw}',
    pwsh: "Get-ChildItem -LiteralPath {path} -Directory -Force | ForEach-Object { [pscustomobject]@{ Size = (Get-ChildItem -LiteralPath $_.FullName -File -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum; Path = $_.FullName } } | Sort-Object Size -Descending | Select-Object -First {count!raw}",
    gaps: { cmd: 'cmd.exe cannot sum and sort directory sizes' },
  },
  disk_free: {
    pwsh: { win: 'Get-PSDrive -PSProvider FileSystem', unix: 'df -h' },
    cmd: 'fsutil volume diskfree C:',
  },
  dir_size: {
    pwsh: `${PS_FILES} | Measure-Object -Property Length -Sum | Select-Object Count, Sum, @{ Name = 'MB'; Expression = { [math]::Round($_.Sum / 1MB, 1) } }`,
    cmd: 'dir /s /a {path}',
  },
  find_by_name: {
    pwsh: `${PS_ALL} | Where-Object Name -Like {namepat} | ${PS_FULLNAME}`,
    cmd: 'where /r {path} {namepat}',
  },
  find_by_ext: {
    pwsh: `${PS_FILES} | Where-Object Name -Like {glob}«| Where-Object LastWriteTime -GT (Get-Date).AddMinutes(-{minutes!raw})» | ${PS_FULLNAME}`,
    cmd: 'where /r {path} {glob}',
  },
  find_recent: {
    pwsh: `${PS_FILES} | Where-Object LastWriteTime -GT (Get-Date).AddMinutes(-{minutes!raw})«| Where-Object Name -Like {glob}» | ${PS_FULLNAME}`,
    gaps: { cmd: 'forfiles only filters by whole days, not by an arbitrary time window' },
  },
  find_older_than: {
    pwsh: `${PS_FILES} | Where-Object LastWriteTime -LT (Get-Date).AddDays(-{days!raw})«| Where-Object Name -Like {glob}» | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s /d -{days!raw}«/m {glob}» /c "cmd /c if @isdir==FALSE echo @path"',
  },
  find_larger_than: {
    busybox: 'find {path} -type f -size +{sizeBytes!raw}c«-iname {glob}» -exec ls -lh {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Where-Object Length -GT {sizeBytes!raw} | Select-Object Length, LastWriteTime, FullName`,
    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize GTR {sizeBytes!raw} echo @path @fsize"',
  },
  find_smaller_than: {
    busybox: 'find {path} -type f -size -{sizeBytes!raw}c«-iname {glob}»',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Where-Object Length -LT {sizeBytes!raw} | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize LSS {sizeBytes!raw} echo @path"',
  },
  grep_text: {
    busybox: 'find {path} -type f«-iname {glob}» -exec grep -Hn -- {pattern} {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -Pattern {pattern}`,
    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /n /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
  },
  grep_files_containing: {
    busybox: 'find {path} -type f«-iname {glob}» -exec grep -l -- {pattern} {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -List -Pattern {pattern} | Select-Object -ExpandProperty Path`,
    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /m /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
  },
  count_lines: {
    pwsh: '@(Get-Content -LiteralPath {file}).Count',
    cmd: 'find /c /v "" {file}',
  },
  count_lines_code: {
    pwsh: `(${PS_FILES} | Where-Object Name -Like {glob} | Get-Content | Measure-Object).Count`,
    gaps: { cmd: 'no reliable way to concatenate files recursively and count lines in cmd.exe' },
  },
  count_files: {
    pwsh: `(${PS_FILES}«| Where-Object Name -Like {glob}» | Measure-Object).Count`,
    cmd: (s, q) => `where /r ${q(s.path ?? '.')} ${s.glob ? q(s.glob) : '*'} | find /c /v ""`,
  },
  count_words: {
    pwsh: '(Get-Content -LiteralPath {file} -Raw | Measure-Object -Word).Words',
    gaps: { cmd: 'cmd.exe has no word counter' },
  },
  sort_uniq: {
    pwsh: 'Get-Content -LiteralPath {file} | Group-Object -NoElement -CaseSensitive | Sort-Object Count -Descending | Select-Object -First {count!raw}',
    gaps: { cmd: 'cmd.exe has no uniq/group-by equivalent' },
  },
  recent_files: {
    busybox: "find {path} -type f -exec stat -c '%Y %y %n' {} + 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-",
    pwsh: `${PS_FILES} | Sort-Object LastWriteTime -Descending | Select-Object -First {count!raw} -Property LastWriteTime, FullName`,
    gaps: { cmd: 'dir /o-d sorts only within each directory, not recursively' },
  },
  empty_files: {
    pwsh: `${PS_FILES} | Where-Object Length -EQ 0 | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s /c "cmd /c if @isdir==FALSE if @fsize==0 echo @path"',
  },
  empty_dirs: {
    pwsh: `Get-ChildItem -LiteralPath {path} -Directory -Recurse -Force -ErrorAction SilentlyContinue | Where-Object { -not (Get-ChildItem -LiteralPath $_.FullName -Force | Select-Object -First 1) } | ${PS_FULLNAME}`,
    gaps: { cmd: 'cmd.exe cannot test directories for emptiness recursively' },
  },
  duplicate_files: {
    gnuMac: 'find {path} -type f -exec gmd5sum {} + | gsort | guniq -w32 -dD',
    busybox: "find {path} -type f -exec md5sum {} + | sort | awk '{ k = substr($0, 1, 32) } k == p { if (!shown) print last; print; shown = 1; next } { p = k; last = $0; shown = 0 }'",
    pwsh: `${PS_FILES} | Get-FileHash -Algorithm MD5 | Group-Object -Property Hash | Where-Object Count -GT 1 | ForEach-Object Group | Select-Object Hash, Path`,
    gaps: { cmd: 'cmd.exe cannot hash and group files' },
  },
  find_symlinks: {
    busybox: 'find {path} -type l -exec ls -l {} +',
    pwsh: `${PS_ALL} | Where-Object LinkType -EQ 'SymbolicLink' | Select-Object FullName, Target`,
    cmd: 'dir /s /al {path}',
  },
  broken_symlinks: {
    busybox: 'find -L {path} -type l',
    pwsh: `${PS_ALL} | Where-Object { $_.LinkType -eq 'SymbolicLink' -and -not (Test-Path -LiteralPath ([System.IO.Path]::Combine((Split-Path -LiteralPath $_.FullName -Parent), [string]$_.Target))) } | ${PS_FULLNAME}`,
    gaps: { cmd: 'cmd.exe cannot check symlink targets' },
  },
  list_files: {
    pwsh: 'Get-ChildItem -LiteralPath {path} -Force',
    cmd: 'dir /a {path}',
  },
  list_tree: {
    pwsh: String.raw`Get-ChildItem -LiteralPath {path} -Recurse -Depth ({depth!raw} - 1) -Force -ErrorAction SilentlyContinue | Where-Object FullName -NotMatch '[\\/]\.git([\\/]|$)' | Sort-Object FullName | ` + PS_FULLNAME,
    gaps: { cmd: 'tree has no depth limit' },
  },
  hidden_files: {
    pwsh: "Get-ChildItem -LiteralPath {path} -Force | Where-Object { $_.Name -like '.*' -or $_.Attributes -band [System.IO.FileAttributes]::Hidden }",
    cmd: 'dir /a:h {path}',
  },
  file_type: {
    // Windows has no content sniffing like file(1); show what the filesystem knows instead.
    pwsh: { win: 'Get-Item -LiteralPath {file} -Force | Select-Object Name, Extension, Length, Attributes, LinkType', unix: 'file {file}' },
    gaps: { cmd: 'no file(1) equivalent on Windows' },
  },
  file_stat: {
    pwsh: 'Get-Item -LiteralPath {file} -Force | Format-List FullName, Mode, Length, CreationTime, LastWriteTime, LastAccessTime',
    cmd: 'dir /a /q {file}',
  },
  head_file: {
    pwsh: 'Get-Content -LiteralPath {file} -TotalCount {count!raw}',
    gaps: { cmd: 'cmd.exe has no head equivalent' },
  },
  tail_file: {
    pwsh: 'Get-Content -LiteralPath {file} -Tail {count!raw}',
    gaps: { cmd: 'cmd.exe has no tail equivalent' },
  },
  tail_follow: {
    pwsh: 'Get-Content -LiteralPath {file} -Tail 10 -Wait',
    gaps: { cmd: 'cmd.exe cannot follow a file' },
  },
  cat_file: {
    pwsh: 'Get-Content -LiteralPath {file}',
    cmd: 'type {file}',
  },
  compress_targz: {
    pwsh: 'tar -czvf {archive} {path}', // tar.exe ships with Windows 10 1803+
    cmd: 'tar -czvf {archive} {path}',
  },
  extract_targz: {
    pwsh: 'tar -xzvf {file}«-C {dest}»',
    cmd: 'tar -xzvf {file}«-C {dest}»',
  },
  compress_zip: {
    pwsh: 'Compress-Archive -LiteralPath {path} -DestinationPath {archive}',
    cmd: 'tar -a -c -f {archive} {path}', // bsdtar picks zip format from the .zip suffix
  },
  extract_zip: {
    pwsh: (s, q) => `Expand-Archive -LiteralPath ${q(s.file)} -DestinationPath ${s.dest ? q(s.dest) : '.'}`,
    cmd: 'tar -xf {file}«-C {dest}»',
  },
  list_archive: {
    // bsdtar on Windows lists zip archives too; GNU tar on Linux does not.
    pwsh: (s, q, ctx) => (!isWin(ctx) && /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file)}` : `tar -tvf ${q(s.file)}`),
    cmd: 'tar -tvf {file}',
  },
  chmod: {
    pwsh: { unix: 'chmod {mode!raw} {file}' },
    gaps: { pwsh: 'Windows: no POSIX permission bits (use icacls)', cmd: 'no POSIX permission bits (use icacls)' },
  },
  make_executable: {
    pwsh: { unix: 'chmod +x {file}' },
    gaps: { pwsh: 'Windows: no executable bit (determined by file extension)', cmd: 'no executable bit (determined by file extension)' },
  },
  chown: {
    pwsh: { win: 'icacls {path} /setowner {user} /T', unix: 'sudo chown -R {user} {path}' },
    cmd: 'icacls {path} /setowner {user} /T',
  },
  copy: {
    // -Confirm keeps cp -i's "ask before overwriting" safety (Copy-Item overwrites silently).
    pwsh: 'Copy-Item -LiteralPath {src} -Destination {dst} -Recurse -Confirm',
    cmd: 'copy /-y {src} {dst}',
  },
  move_rename: {
    // Move-Item refuses to overwrite an existing file without -Force, which matches mv -i's safety.
    pwsh: 'Move-Item -LiteralPath {src} -Destination {dst}',
    cmd: 'move /-y {src} {dst}',
  },
  delete_file: {
    pwsh: 'Remove-Item -LiteralPath {file}',
    cmd: 'del {file}',
  },
  delete_dir: {
    pwsh: 'Remove-Item -LiteralPath {path} -Recurse',
    cmd: 'rmdir /s {path}',
  },
  delete_by_ext: {
    busybox: 'find {path} -type f -iname {glob} -exec rm {} +',
    pwsh: `${PS_FILES} | Where-Object Name -Like {glob} | Remove-Item`,
    cmd: 'pushd {path} && (del /s {glob} & popd)',
  },
  mkdir: {
    // -Force on a directory only means "create parents, do not fail if it exists" (mkdir -p).
    pwsh: 'New-Item -ItemType Directory -Force -Path {path}',
    cmd: 'mkdir {path}',
  },
  touch_file: {
    pwsh: 'if (Test-Path -LiteralPath {file}) { (Get-Item -LiteralPath {file}).LastWriteTime = Get-Date } else { New-Item -ItemType File -Path {file} }',
    cmd: 'type nul >> {file}',
  },
  current_dir: {
    pwsh: 'Get-Location',
    cmd: 'cd',
  },
  create_symlink: {
    pwsh: 'New-Item -ItemType SymbolicLink -Path {dst} -Target {src}',
    cmd: 'mklink {dst} {src}',
  },
  diff_files: {
    pwsh: {
      win: 'Compare-Object -ReferenceObject (Get-Content -LiteralPath {src}) -DifferenceObject (Get-Content -LiteralPath {dst})',
      unix: 'diff -u {src} {dst}',
    },
    cmd: 'fc {src} {dst}',
  },
  replace_text: {
    pwsh: '(Get-Content -LiteralPath {file} -Raw).Replace({old}, {new}) | Set-Content -LiteralPath {file} -NoNewline',
    gaps: { cmd: 'cmd.exe has no in-place text replacement' },
  },
  disk_mounts: {
    busybox: 'mount',
    pwsh: { win: 'Get-Volume' },
    cmd: 'mountvol',
  },
  block_devices: {
    busybox: 'cat /proc/partitions',
    pwsh: { win: 'Get-Partition' },
    gaps: { cmd: 'wmic is deprecated/removed and diskpart needs admin' },
  },
  hash_sha256: {
    pwsh: 'Get-FileHash -LiteralPath {file} -Algorithm SHA256',
    cmd: 'certutil -hashfile {file} SHA256',
  },
  hash_md5: {
    pwsh: 'Get-FileHash -LiteralPath {file} -Algorithm MD5',
    cmd: 'certutil -hashfile {file} MD5',
  },
  base64_encode: {
    pwsh: (s, q) => (s.file
      ? `[Convert]::ToBase64String([System.IO.File]::ReadAllBytes((Resolve-Path -LiteralPath ${q(s.file)}).ProviderPath))`
      : `[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(${q(s.text ?? '<TEXT>')}))`),
    gaps: { cmd: 'certutil -encode writes to a file with PEM headers, not to stdout' },
  },
  base64_decode: {
    pwsh: (s, q) => (s.file
      ? `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String((Get-Content -LiteralPath ${q(s.file)} -Raw)))`
      : `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(${q(s.text ?? '<TEXT>')}))`),
    gaps: { cmd: 'certutil -decode writes to a file, not to stdout' },
  },

  // ---------- processes ----------
  top_cpu: {
    busybox: 'top -b -n 1 | head -n $(({count!raw} + 4))',
    pwsh: 'Get-Process | Sort-Object CPU -Descending | Select-Object -First {count!raw}',
    gaps: { cmd: 'tasklist cannot sort by CPU usage' },
  },
  top_mem: {
    busybox: 'ps -o pid,user,rss,vsz,args | sort -k3 -rh | head -n {count!raw}',
    pwsh: 'Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First {count!raw}',
    cmd: 'tasklist | sort /r /+65', // Mem Usage column is right-aligned starting at column 65
  },
  find_process: {
    pwsh: `${PS_PROC_MATCH} | Select-Object Id, ProcessName, CommandLine`,
    cmd: 'tasklist | findstr /i {name}',
  },
  kill_by_name: {
    pwsh: { win: `${PS_PROC_MATCH} | Stop-Process`, unix: 'pkill -f {name}' },
    cmd: (s, q) => `taskkill /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`)}`,
  },
  kill_force: {
    pwsh: { win: `${PS_PROC_MATCH} | Stop-Process -Force`, unix: 'pkill -9 -f {name}' },
    cmd: (s, q) => `taskkill /f /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`)}`,
  },
  kill_by_pid: {
    // `kill` is an alias of Stop-Process (SIGKILL on Unix) in PowerShell; call the real binary for SIGTERM.
    pwsh: { win: 'Stop-Process -Id {pid!raw}', unix: '/bin/kill {pid!raw}' },
    cmd: 'taskkill /pid {pid!raw}',
  },
  kill_by_port: {
    busybox: 'fuser -k -TERM {port!raw}/tcp',
    pwsh: { win: 'Get-NetTCPConnection -LocalPort {port!raw} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ }' },
    cmd: 'for /f "tokens=5" %p in (\'netstat -ano ^| findstr /r /c:":{port!raw} .*LISTENING"\') do taskkill /pid %p',
  },
  listening_ports: {
    busybox: 'netstat -tulpn',
    pwsh: { win: 'Get-NetTCPConnection -State Listen | Sort-Object LocalPort' },
    cmd: 'netstat -ano | findstr LISTENING',
  },
  process_on_port: {
    busybox: "netstat -tulpn | grep ':{port!raw} '",
    pwsh: { win: "Get-NetTCPConnection -LocalPort {port!raw} -State Listen -ErrorAction SilentlyContinue | Select-Object LocalAddress, LocalPort, State, OwningProcess, @{ Name = 'Process'; Expression = { (Get-Process -Id $_.OwningProcess).ProcessName } }" },
    cmd: 'netstat -ano | findstr :{port!raw}',
  },
  established_connections: {
    busybox: 'netstat -tun | grep ESTABLISHED',
    pwsh: { win: 'Get-NetTCPConnection -State Established' },
    cmd: 'netstat -an | findstr ESTABLISHED',
  },
  process_tree: {
    busybox: 'ps -o pid,ppid,user,args',
    pwsh: { win: 'Get-CimInstance -ClassName Win32_Process | Sort-Object ParentProcessId | Select-Object ProcessId, ParentProcessId, Name' },
    gaps: { cmd: 'tasklist has no parent PID (wmic is deprecated)' },
  },

  // ---------- system ----------
  system_info: {
    pwsh: { win: `${PS_OS} | Select-Object CSName, Caption, Version, BuildNumber, OSArchitecture`, unix: 'uname -a' },
    cmd: 'systeminfo',
  },
  os_release: {
    pwsh: { win: `${PS_OS} | Select-Object Caption, Version, BuildNumber` },
    cmd: 'ver',
  },
  kernel_version: {
    pwsh: { win: '[System.Environment]::OSVersion.Version', unix: 'uname -r' },
    cmd: 'ver',
  },
  memory_usage: {
    pwsh: { win: `${PS_OS} | Select-Object @{ Name = 'TotalGB'; Expression = { [math]::Round($_.TotalVisibleMemorySize / 1MB, 1) } }, @{ Name = 'FreeGB'; Expression = { [math]::Round($_.FreePhysicalMemory / 1MB, 1) } }` },
    cmd: 'systeminfo | findstr /c:"Physical Memory"',
  },
  cpu_info: {
    busybox: 'cat /proc/cpuinfo',
    pwsh: { win: 'Get-CimInstance -ClassName Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors, MaxClockSpeed' },
    cmd: 'echo %PROCESSOR_IDENTIFIER% & echo %NUMBER_OF_PROCESSORS%',
  },
  cpu_cores: {
    pwsh: '[System.Environment]::ProcessorCount',
    cmd: 'echo %NUMBER_OF_PROCESSORS%',
  },
  uptime: {
    pwsh: { win: `(Get-Date) - (${PS_OS}).LastBootUpTime`, unix: 'uptime' },
    cmd: 'systeminfo | findstr /c:"Boot Time"',
  },
  hostname: {
    pwsh: 'hostname',
    cmd: 'hostname',
  },
  whoami: {
    pwsh: 'whoami',
    cmd: 'whoami',
  },
  users_logged_in: {
    pwsh: { win: 'Get-CimInstance -ClassName Win32_ComputerSystem | Select-Object UserName', unix: 'who' },
    cmd: 'query user',
  },
  last_logins: {
    bsd: 'last | head -n {count!raw}',
    busybox: 'last | head -n {count!raw}',
    pwsh: { win: "Get-WinEvent -FilterHashtable @{ LogName = 'Security'; Id = 4624 } -MaxEvents {count!raw}", unix: 'last -n {count!raw}' },
    gaps: { cmd: 'logon events need wevtutil with an XPath query on the Security log (admin)' },
  },
  env_vars: {
    pwsh: 'Get-ChildItem -Path Env: | Sort-Object Name',
    cmd: 'set',
  },
  env_var_get: {
    pwsh: '$env:{var!raw}',
    cmd: 'echo %{var!raw}%',
  },
  which_cmd: {
    pwsh: 'Get-Command -Name {cmd} -CommandType Application -All | Select-Object -ExpandProperty Source',
    cmd: 'where {cmd}',
  },
  show_path: {
    fish: 'string join \\n $PATH',
    pwsh: '$env:PATH -split [System.IO.Path]::PathSeparator',
    cmd: 'echo %PATH:;=&echo.%',
  },
  history_search: {
    zsh: 'grep -ai -- {pattern} "${HISTFILE:-$HOME/.zsh_history}"',
    busybox: 'grep -i -- {pattern} "${HISTFILE:-$HOME/.ash_history}"',
    fish: 'history search --contains -- {pattern}',
    pwsh: 'Select-String -LiteralPath (Get-PSReadLineOption).HistorySavePath -Pattern {pattern}',
    cmd: 'doskey /history | findstr /i /c:{pattern}',
  },
  date_time: {
    pwsh: 'Get-Date',
    cmd: 'echo %DATE% %TIME%',
  },
  timezone: {
    pwsh: 'Get-TimeZone',
    cmd: 'tzutil /g',
  },
  calendar: {
    pwsh: { unix: 'cal' },
    gaps: { pwsh: 'Windows: no built-in calendar command', cmd: 'no built-in calendar command' },
  },
  cron_list: {
    pwsh: { win: "Get-ScheduledTask -TaskPath '\\'", unix: 'crontab -l' },
    cmd: 'schtasks /query',
  },
  cron_edit: {
    pwsh: { win: 'taskschd.msc', unix: 'crontab -e' },
    cmd: 'taskschd.msc',
  },
  journal_service: {
    pwsh: { win: "Get-WinEvent -FilterHashtable @{ LogName = 'System'; ProviderName = 'Service Control Manager' } -MaxEvents 1000 -ErrorAction SilentlyContinue | Where-Object Message -Like ('*' + {service} + '*')«| Where-Object TimeCreated -GT (Get-Date).AddMinutes(-{minutes!raw})» | Select-Object -First {count!raw}" },
    gaps: { cmd: 'wevtutil cannot filter events by message text' },
  },
  journal_errors: {
    pwsh: { win: `Get-WinEvent -FilterHashtable @{ LogName = 'System'; Level = 1, 2; StartTime = (${PS_OS}).LastBootUpTime } -MaxEvents {count!raw} -ErrorAction SilentlyContinue` },
    cmd: 'wevtutil qe System /q:"*[System[(Level=1 or Level=2)]]" /c:{count!raw} /rd:true /f:text',
  },
  service_status: {
    pwsh: { win: 'Get-Service -Name {service}' },
    cmd: 'sc query {service}',
  },
  service_restart: {
    pwsh: { win: 'Restart-Service -Name {service}' },
    cmd: 'net stop {service} && net start {service}',
  },
  service_stop: {
    pwsh: { win: 'Stop-Service -Name {service}' },
    cmd: 'net stop {service}',
  },
  service_start: {
    pwsh: { win: 'Start-Service -Name {service}' },
    cmd: 'net start {service}',
  },
  service_enable: {
    bsd: 'brew services start {service}',
    pwsh: { win: 'Set-Service -Name {service} -StartupType Automatic; Start-Service -Name {service}' },
    cmd: 'sc config {service} start= auto && net start {service}',
  },
  list_services: {
    pwsh: { win: "Get-Service | Where-Object Status -EQ 'Running'" },
    cmd: 'net start',
  },
  failed_services: {
    bsd: "launchctl list | awk 'NR == 1 || ($2 != \"0\" && $2 != \"-\")'",
    pwsh: { win: "Get-CimInstance -ClassName Win32_Service -Filter \"StartMode='Auto' AND State<>'Running'\" | Select-Object Name, State, ExitCode" },
    gaps: { cmd: 'sc query cannot filter by start mode' },
  },
  dmesg: {
    pwsh: { win: 'Get-WinEvent -LogName System -MaxEvents {count!raw}', unix: 'sudo dmesg | tail -n {count!raw}' },
    cmd: 'wevtutil qe System /c:{count!raw} /rd:true /f:text',
  },
  battery: {
    fish: (s, q, ctx) => ((ctx && ctx.os) === 'darwin'
      ? 'pmset -g batt'
      : 'set -l b /sys/class/power_supply/BAT*/capacity; if test (count $b) -gt 0; cat $b; else; upower -i (upower -e | grep -m1 BAT); end'),
    pwsh: { win: 'Get-CimInstance -ClassName Win32_Battery | Select-Object Name, EstimatedChargeRemaining, BatteryStatus' },
    gaps: { cmd: 'powercfg /batteryreport only writes an HTML report' },
  },
  temperature: {
    pwsh: { win: "Get-CimInstance -Namespace root/WMI -ClassName MSAcpi_ThermalZoneTemperature | Select-Object InstanceName, @{ Name = 'Celsius'; Expression = { $_.CurrentTemperature / 10 - 273.15 } }" },
    gaps: { cmd: 'no temperature sensors access from cmd.exe' },
  },
  gpu_info: {
    pwsh: { win: 'Get-CimInstance -ClassName Win32_VideoController | Select-Object Name, DriverVersion, AdapterRAM' },
    gaps: { cmd: 'wmic is deprecated; dxdiag only writes a report file' },
  },
  usb_devices: {
    pwsh: { win: "Get-PnpDevice -PresentOnly | Where-Object InstanceId -Like 'USB*'" },
    gaps: { cmd: 'no reliable USB device listing in cmd.exe (pnputil output varies by build)' },
  },
  install_package: {
    pwsh: { win: 'winget install {pkg}' },
    cmd: 'winget install {pkg}',
  },
  package_installed: {
    pwsh: { win: 'winget list {pkg}' },
    cmd: 'winget list {pkg}',
  },
  system_update: {
    pwsh: { win: 'winget upgrade --all' },
    cmd: 'winget upgrade --all',
  },

  // ---------- network ----------
  ip_addresses: {
    busybox: 'ip -o addr show',
    pwsh: { win: 'Get-NetIPAddress | Select-Object InterfaceAlias, AddressFamily, IPAddress, PrefixLength' },
    cmd: 'ipconfig',
  },
  public_ip: {
    pwsh: "Invoke-RestMethod -Uri 'https://ifconfig.me/ip'",
    cmd: 'curl -s https://ifconfig.me & echo.',
  },
  ping_host: {
    pwsh: 'Test-Connection -ComputerName {host} -Count {count!raw}',
    cmd: 'ping -n {count!raw} {host}',
  },
  dns_lookup: {
    busybox: 'nslookup {host}',
    pwsh: { win: 'Resolve-DnsName -Name {host}', unix: 'dig +short {host}' },
    cmd: 'nslookup {host}',
  },
  traceroute: {
    pwsh: { win: 'Test-NetConnection -ComputerName {host} -TraceRoute', unix: 'traceroute {host}' },
    cmd: 'tracert {host}',
  },
  routes: {
    pwsh: { win: 'Get-NetRoute' },
    cmd: 'route print',
  },
  port_check: {
    busybox: 'nc -w 3 {host} {port!raw} </dev/null && echo open || echo closed',
    pwsh: { win: 'Test-NetConnection -ComputerName {host} -Port {port!raw}', unix: 'nc -zv {host} {port!raw}' },
    gaps: { cmd: 'no TCP port probe in cmd.exe (telnet client is not installed by default)' },
  },
  curl_headers: {
    // Windows PowerShell 5.1 aliases curl to Invoke-WebRequest, so call curl.exe explicitly.
    pwsh: { win: 'curl.exe -sI {url}', unix: 'curl -sI {url}' },
    cmd: 'curl -sI {url}',
  },
  http_status: {
    pwsh: { win: "curl.exe -s -o NUL -w '%{http_code}\\n' {url}", unix: "curl -s -o /dev/null -w '%{http_code}\\n' {url}" },
    cmd: 'curl -s -o NUL -w "%{http_code}\\n" {url}',
  },
  download_file: {
    pwsh: { win: 'curl.exe -fLO {url}', unix: 'curl -fLO {url}' },
    cmd: 'curl -fLO {url}',
  },
  ssh_connect: {
    pwsh: 'ssh {target}',
    cmd: 'ssh {target}',
  },

  // ---------- git ----------
  git_status: { pwsh: 'git status', cmd: 'git status' },
  git_log: {
    pwsh: 'git log --oneline --graph --decorate -n {count!raw}',
    cmd: 'git log --oneline --graph --decorate -n {count!raw}',
  },
  git_diff: {
    // a bare `--` can be swallowed by PowerShell before reaching native commands; quote it
    pwsh: "git diff«'--' {file}»",
    cmd: 'git diff«-- {file}»',
  },
  git_diff_staged: { pwsh: 'git diff --staged', cmd: 'git diff --staged' },
  git_branches: { pwsh: 'git branch -a', cmd: 'git branch -a' },
  git_current_branch: { pwsh: 'git branch --show-current', cmd: 'git branch --show-current' },
  git_new_branch: { pwsh: 'git checkout -b {branch}', cmd: 'git checkout -b {branch}' },
  git_switch_branch: { pwsh: 'git checkout {branch}', cmd: 'git checkout {branch}' },
  git_delete_branch: { pwsh: 'git branch -d {branch}', cmd: 'git branch -d {branch}' },
  git_undo_commit: { pwsh: 'git reset --soft HEAD~1', cmd: 'git reset --soft HEAD~1' },
  git_discard_changes: { pwsh: 'git restore«{file}»', cmd: 'git restore«{file}»' },
  git_stash: { pwsh: 'git stash', cmd: 'git stash' },
  git_stash_pop: { pwsh: 'git stash pop', cmd: 'git stash pop' },
  git_pull: { pwsh: 'git pull', cmd: 'git pull' },
  git_push: { pwsh: 'git push«origin {branch}»', cmd: 'git push«origin {branch}»' },
  git_clone: { pwsh: 'git clone {url}', cmd: 'git clone {url}' },
  git_add_all: { pwsh: 'git add -A', cmd: 'git add -A' },
  git_commit: {
    // `&&` needs PowerShell 7+; this form also works in Windows PowerShell 5.1
    pwsh: 'git add -A; if ($LASTEXITCODE -eq 0) { git commit -m {message} }',
    cmd: 'git add -A && git commit -m {message}',
  },
  git_remote: { pwsh: 'git remote -v', cmd: 'git remote -v' },
  git_blame: { pwsh: 'git blame {file}', cmd: 'git blame {file}' },
  git_init: { pwsh: 'git init', cmd: 'git init' },

  // ---------- docker ----------
  docker_ps: { pwsh: 'docker ps', cmd: 'docker ps' },
  docker_ps_all: { pwsh: 'docker ps -a', cmd: 'docker ps -a' },
  docker_logs: {
    pwsh: 'docker logs --tail {count!raw} -f {container}',
    cmd: 'docker logs --tail {count!raw} -f {container}',
  },
  docker_images: { pwsh: 'docker images', cmd: 'docker images' },
  docker_stop: { pwsh: 'docker stop {container}', cmd: 'docker stop {container}' },
  docker_stop_all: {
    fish: 'docker stop (docker ps -q)',
    pwsh: 'docker stop (docker ps -q)',
    cmd: "for /f %i in ('docker ps -q') do docker stop %i",
  },
  docker_prune: { pwsh: 'docker system prune -a', cmd: 'docker system prune -a' },
  docker_exec: { pwsh: 'docker exec -it {container} sh', cmd: 'docker exec -it {container} sh' },
  docker_stats: { pwsh: 'docker stats --no-stream', cmd: 'docker stats --no-stream' },
  docker_compose_up: { pwsh: 'docker compose up -d', cmd: 'docker compose up -d' },
  docker_compose_down: { pwsh: 'docker compose down', cmd: 'docker compose down' },
};

exec
/bin/bash -lc "ls -lh build; sed -n '1,185p' src/variants.js; cat scripts/tldr_ingest.py" in /workspace/tellsh
 succeeded in 0ms:
total 50M
-rw-r--r-- 1 box box  34M Oct 10 08:13 cls.jsonl
-rw-r--r-- 1 box box 4.9K Oct 10 08:13 meta.json
-rw-r--r-- 1 box box  16M Oct 10 08:13 tag.jsonl
-rw-r--r-- 1 box box   75 Oct 10 08:13 teacher_meta.json
-rw-r--r-- 1 box box  77K Oct 10 08:11 teacher_results.jsonl
// Per-shell / per-OS template variants (see src/render.js for precedence). Keys are intent ids from src/catalog.js.
//
// Keys per intent (all optional):
//   bsd      macOS/BSD userland (bash/zsh/sh on macOS without GNU coreutils), used before catalog `darwin`
//   gnuMac   macOS + Homebrew GNU coreutils (g-prefixed: gdu, gsort, gmd5sum, guniq, ...)
//   zsh      zsh only (bash/sh keep the POSIX choice)
//   busybox  BusyBox userland (Alpine etc.) - only where the GNU template uses flags/tools busybox lacks
//   fish     fish 3.x - only where the POSIX template is not valid fish
//   pwsh     PowerShell: a string (all OSes) or { win, unix }. A missing `unix` means the renderer falls back
//            to `bash -c '<posix command>'` (used where Linux and macOS natives differ). A missing `win`
//            is a Windows gap and is explained in gaps.pwsh ("Windows: ...").
//   cmd      cmd.exe, best effort
//   gaps     { shell: reason } when a shell/OS has no reasonable equivalent
//
// Template syntax is the catalog one ({slot}, {slot!raw}, «optional»). Function templates get
// (s, q, ctx) with ctx = { os, shell, coreutils }; `q` quotes for the target shell.
// PowerShell variants avoid `&&`/`||` (5.1 compat) and aliases, use -LiteralPath for user paths and
// never add -Force to destructive cmdlets unless the POSIX template forces too. Derived slots:
// ext (bare extension), minutes (time window in minutes), sizeBytes (size in bytes).

// Recursive file listing used by many PowerShell variants (-Force = include hidden files, like find).
const PS_FILES = 'Get-ChildItem -LiteralPath {path} -File -Recurse -Force -ErrorAction SilentlyContinue';
const PS_ALL = 'Get-ChildItem -LiteralPath {path} -Recurse -Force -ErrorAction SilentlyContinue';
const PS_FULLNAME = 'Select-Object -ExpandProperty FullName';
const PS_PROC_MATCH = 'Get-Process | Where-Object { $_.ProcessName -match {name} -or $_.CommandLine -match {name} }';
const PS_OS = 'Get-CimInstance -ClassName Win32_OperatingSystem';
const isWin = (ctx) => (ctx && ctx.os) === 'win32';

export const VARIANTS = {
  // ---------- files & disk ----------
  largest_files: {
    bsd: 'find {path} -xdev -type f -exec du -k {} + 2>/dev/null | sort -rn | head -n {count!raw}',
    gnuMac: 'find {path} -xdev -type f -exec du -h {} + 2>/dev/null | gsort -rh | head -n {count!raw}',
    pwsh: `${PS_FILES} | Sort-Object Length -Descending | Select-Object -First {count!raw} -Property Length, FullName`,
    gaps: { cmd: 'cmd.exe cannot sort files by size across subdirectories' },
  },
  largest_dirs: {
    bsd: 'du -k -d 1 {path} 2>/dev/null | sort -rn | head -n {count!raw}',
    gnuMac: 'gdu -h -d 1 {path} 2>/dev/null | gsort -rh | head -n {count!raw}',
    pwsh: "Get-ChildItem -LiteralPath {path} -Directory -Force | ForEach-Object { [pscustomobject]@{ Size = (Get-ChildItem -LiteralPath $_.FullName -File -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum; Path = $_.FullName } } | Sort-Object Size -Descending | Select-Object -First {count!raw}",
    gaps: { cmd: 'cmd.exe cannot sum and sort directory sizes' },
  },
  disk_free: {
    pwsh: { win: 'Get-PSDrive -PSProvider FileSystem', unix: 'df -h' },
    cmd: 'fsutil volume diskfree C:',
  },
  dir_size: {
    pwsh: `${PS_FILES} | Measure-Object -Property Length -Sum | Select-Object Count, Sum, @{ Name = 'MB'; Expression = { [math]::Round($_.Sum / 1MB, 1) } }`,
    cmd: 'dir /s /a {path}',
  },
  find_by_name: {
    pwsh: `${PS_ALL} | Where-Object Name -Like {namepat} | ${PS_FULLNAME}`,
    cmd: 'where /r {path} {namepat}',
  },
  find_by_ext: {
    pwsh: `${PS_FILES} | Where-Object Name -Like {glob}«| Where-Object LastWriteTime -GT (Get-Date).AddMinutes(-{minutes!raw})» | ${PS_FULLNAME}`,
    cmd: 'where /r {path} {glob}',
  },
  find_recent: {
    pwsh: `${PS_FILES} | Where-Object LastWriteTime -GT (Get-Date).AddMinutes(-{minutes!raw})«| Where-Object Name -Like {glob}» | ${PS_FULLNAME}`,
    gaps: { cmd: 'forfiles only filters by whole days, not by an arbitrary time window' },
  },
  find_older_than: {
    pwsh: `${PS_FILES} | Where-Object LastWriteTime -LT (Get-Date).AddDays(-{days!raw})«| Where-Object Name -Like {glob}» | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s /d -{days!raw}«/m {glob}» /c "cmd /c if @isdir==FALSE echo @path"',
  },
  find_larger_than: {
    busybox: 'find {path} -type f -size +{sizeBytes!raw}c«-iname {glob}» -exec ls -lh {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Where-Object Length -GT {sizeBytes!raw} | Select-Object Length, LastWriteTime, FullName`,
    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize GTR {sizeBytes!raw} echo @path @fsize"',
  },
  find_smaller_than: {
    busybox: 'find {path} -type f -size -{sizeBytes!raw}c«-iname {glob}»',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Where-Object Length -LT {sizeBytes!raw} | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize LSS {sizeBytes!raw} echo @path"',
  },
  grep_text: {
    busybox: 'find {path} -type f«-iname {glob}» -exec grep -Hn -- {pattern} {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -Pattern {pattern}`,
    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /n /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
  },
  grep_files_containing: {
    busybox: 'find {path} -type f«-iname {glob}» -exec grep -l -- {pattern} {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -List -Pattern {pattern} | Select-Object -ExpandProperty Path`,
    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /m /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
  },
  count_lines: {
    pwsh: '@(Get-Content -LiteralPath {file}).Count',
    cmd: 'find /c /v "" {file}',
  },
  count_lines_code: {
    pwsh: `(${PS_FILES} | Where-Object Name -Like {glob} | Get-Content | Measure-Object).Count`,
    gaps: { cmd: 'no reliable way to concatenate files recursively and count lines in cmd.exe' },
  },
  count_files: {
    pwsh: `(${PS_FILES}«| Where-Object Name -Like {glob}» | Measure-Object).Count`,
    cmd: (s, q) => `where /r ${q(s.path ?? '.')} ${s.glob ? q(s.glob) : '*'} | find /c /v ""`,
  },
  count_words: {
    pwsh: '(Get-Content -LiteralPath {file} -Raw | Measure-Object -Word).Words',
    gaps: { cmd: 'cmd.exe has no word counter' },
  },
  sort_uniq: {
    pwsh: 'Get-Content -LiteralPath {file} | Group-Object -NoElement -CaseSensitive | Sort-Object Count -Descending | Select-Object -First {count!raw}',
    gaps: { cmd: 'cmd.exe has no uniq/group-by equivalent' },
  },
  recent_files: {
    busybox: "find {path} -type f -exec stat -c '%Y %y %n' {} + 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-",
    pwsh: `${PS_FILES} | Sort-Object LastWriteTime -Descending | Select-Object -First {count!raw} -Property LastWriteTime, FullName`,
    gaps: { cmd: 'dir /o-d sorts only within each directory, not recursively' },
  },
  empty_files: {
    pwsh: `${PS_FILES} | Where-Object Length -EQ 0 | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s /c "cmd /c if @isdir==FALSE if @fsize==0 echo @path"',
  },
  empty_dirs: {
    pwsh: `Get-ChildItem -LiteralPath {path} -Directory -Recurse -Force -ErrorAction SilentlyContinue | Where-Object { -not (Get-ChildItem -LiteralPath $_.FullName -Force | Select-Object -First 1) } | ${PS_FULLNAME}`,
    gaps: { cmd: 'cmd.exe cannot test directories for emptiness recursively' },
  },
  duplicate_files: {
    gnuMac: 'find {path} -type f -exec gmd5sum {} + | gsort | guniq -w32 -dD',
    busybox: "find {path} -type f -exec md5sum {} + | sort | awk '{ k = substr($0, 1, 32) } k == p { if (!shown) print last; print; shown = 1; next } { p = k; last = $0; shown = 0 }'",
    pwsh: `${PS_FILES} | Get-FileHash -Algorithm MD5 | Group-Object -Property Hash | Where-Object Count -GT 1 | ForEach-Object Group | Select-Object Hash, Path`,
    gaps: { cmd: 'cmd.exe cannot hash and group files' },
  },
  find_symlinks: {
    busybox: 'find {path} -type l -exec ls -l {} +',
    pwsh: `${PS_ALL} | Where-Object LinkType -EQ 'SymbolicLink' | Select-Object FullName, Target`,
    cmd: 'dir /s /al {path}',
  },
  broken_symlinks: {
    busybox: 'find -L {path} -type l',
    pwsh: `${PS_ALL} | Where-Object { $_.LinkType -eq 'SymbolicLink' -and -not (Test-Path -LiteralPath ([System.IO.Path]::Combine((Split-Path -LiteralPath $_.FullName -Parent), [string]$_.Target))) } | ${PS_FULLNAME}`,
    gaps: { cmd: 'cmd.exe cannot check symlink targets' },
  },
  list_files: {
    pwsh: 'Get-ChildItem -LiteralPath {path} -Force',
    cmd: 'dir /a {path}',
  },
  list_tree: {
    pwsh: String.raw`Get-ChildItem -LiteralPath {path} -Recurse -Depth ({depth!raw} - 1) -Force -ErrorAction SilentlyContinue | Where-Object FullName -NotMatch '[\\/]\.git([\\/]|$)' | Sort-Object FullName | ` + PS_FULLNAME,
    gaps: { cmd: 'tree has no depth limit' },
  },
  hidden_files: {
    pwsh: "Get-ChildItem -LiteralPath {path} -Force | Where-Object { $_.Name -like '.*' -or $_.Attributes -band [System.IO.FileAttributes]::Hidden }",
    cmd: 'dir /a:h {path}',
  },
  file_type: {
    // Windows has no content sniffing like file(1); show what the filesystem knows instead.
    pwsh: { win: 'Get-Item -LiteralPath {file} -Force | Select-Object Name, Extension, Length, Attributes, LinkType', unix: 'file {file}' },
    gaps: { cmd: 'no file(1) equivalent on Windows' },
  },
  file_stat: {
    pwsh: 'Get-Item -LiteralPath {file} -Force | Format-List FullName, Mode, Length, CreationTime, LastWriteTime, LastAccessTime',
    cmd: 'dir /a /q {file}',
  },
  head_file: {
    pwsh: 'Get-Content -LiteralPath {file} -TotalCount {count!raw}',
    gaps: { cmd: 'cmd.exe has no head equivalent' },
  },
  tail_file: {
    pwsh: 'Get-Content -LiteralPath {file} -Tail {count!raw}',
    gaps: { cmd: 'cmd.exe has no tail equivalent' },
  },
  tail_follow: {
    pwsh: 'Get-Content -LiteralPath {file} -Tail 10 -Wait',
    gaps: { cmd: 'cmd.exe cannot follow a file' },
  },
  cat_file: {
    pwsh: 'Get-Content -LiteralPath {file}',
    cmd: 'type {file}',
  },
  compress_targz: {
    pwsh: 'tar -czvf {archive} {path}', // tar.exe ships with Windows 10 1803+
    cmd: 'tar -czvf {archive} {path}',
  },
  extract_targz: {
    pwsh: 'tar -xzvf {file}«-C {dest}»',
    cmd: 'tar -xzvf {file}«-C {dest}»',
  },
  compress_zip: {
    pwsh: 'Compress-Archive -LiteralPath {path} -DestinationPath {archive}',
    cmd: 'tar -a -c -f {archive} {path}', // bsdtar picks zip format from the .zip suffix
  },
  extract_zip: {
#!/usr/bin/env python3
"""Ingest tldr-pages into tellsh training data (stdlib only).

Usage: python3 -I scripts/tldr_ingest.py [tldr_dir]

The tldr checkout is treated as untrusted *data*: pages are only read and
parsed as text, nothing from it is executed or imported.

Outputs (relative to the repo root):
  data/tldr/tools.jsonl  {"text","tool","lang","page","cmd"}
  data/tldr/flags.jsonl  {"tool","head","sub","flag","long","text","lang","page"}
  data/tldr/README.md    provenance / license / regeneration notes
"""
import json
import os
import re
import subprocess
import sys
from collections import Counter, defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_TLDR = os.path.join(ROOT, 'data', 'external', 'tldr')
OUT_DIR = os.path.join(ROOT, 'data', 'tldr')

LANG_DIRS = {'en': 'pages', 'pl': 'pages.pl'}
PLATFORMS = ['common', 'linux', 'osx', 'windows']

# --- page name -> tool family ------------------------------------------------
# Plain names apply on every platform; "platform/name" keys override them
# (e.g. Windows `find`/`findstr` search text in files, so they map to grep;
# `type` is cat on Windows but a `which`-like builtin elsewhere).
FAMILY_MAP = {}


def _m(family, *names):
    for n in names:
        FAMILY_MAP[n] = family


_m('find', 'find', 'fd')
_m('du', 'du', 'ncdu', 'dust')
_m('df', 'df', 'duf')
_m('grep', 'grep', 'rg', 'ag', 'egrep', 'select-string', 'windows/find', 'findstr')
_m('wc', 'wc')
_m('sort', 'sort', 'uniq')
_m('ls', 'ls', 'exa', 'eza', 'get-childitem', 'dir')
_m('fileinfo', 'file', 'stat')
_m('head', 'head')
_m('tail', 'tail')
_m('cat', 'cat', 'bat', 'get-content', 'windows/type')
_m('tar', 'tar')
_m('zip', 'zip', 'unzip', 'compress-archive', 'expand-archive')
_m('chmod', 'chmod')
_m('chown', 'chown', 'chgrp')
_m('cp', 'cp', 'copy', 'copy-item')
_m('mv', 'mv', 'move', 'move-item', 'rename-item')
_m('rm', 'rm', 'del', 'remove-item', 'rmdir')
_m('mkdir', 'mkdir', 'md')
_m('touch', 'touch')
_m('pwd', 'pwd', 'get-location')
_m('ln', 'ln')
_m('diff', 'diff', 'cmp', 'fc', 'compare-object')
_m('sed', 'sed')
_m('disks', 'mount', 'findmnt', 'lsblk', 'diskutil', 'fdisk')
_m('hash', 'sha256sum', 'md5sum', 'shasum', 'md5', 'get-filehash', 'certutil')
_m('base64', 'base64')
_m('ps', 'ps', 'pgrep', 'top', 'htop', 'get-process', 'tasklist', 'pstree')
_m('kill', 'kill', 'pkill', 'killall', 'stop-process', 'taskkill')
_m('ss', 'ss', 'netstat', 'lsof', 'get-nettcpconnection')
_m('uname', 'uname', 'sw_vers', 'lsb_release', 'hostnamectl')
_m('free', 'free', 'vm_stat')
_m('cpu', 'lscpu', 'nproc')
_m('uptime', 'uptime')
_m('hostname', 'hostname')
_m('whoami', 'whoami')
_m('who', 'who', 'w', 'last', 'users')
_m('env', 'env', 'printenv', 'export', 'set')
_m('which', 'which', 'whereis', 'type', 'where', 'get-command')
_m('date', 'date', 'cal', 'timedatectl', 'get-date')
_m('crontab', 'crontab')
_m('journalctl', 'journalctl', 'dmesg', 'get-winevent')
_m('systemctl', 'systemctl', 'service', 'launchctl', 'get-service', 'restart-service',
   'stop-service', 'start-service', 'sc')
_m('hardware', 'lsusb', 'lspci', 'sensors', 'upower', 'pmset')
_m('pkg', 'apt', 'apt-get', 'dpkg', 'brew', 'dnf', 'yum', 'pacman', 'winget', 'choco')
_m('ip', 'ip', 'ifconfig', 'ipconfig', 'route', 'get-netipaddress')
_m('curl', 'curl', 'wget', 'invoke-webrequest')
_m('ping', 'ping', 'test-connection')
_m('dig', 'dig', 'nslookup', 'host', 'resolve-dnsname')
_m('traceroute', 'traceroute', 'tracert', 'mtr')
_m('nc', 'nc', 'ncat', 'telnet', 'test-netconnection')
_m('ssh', 'ssh')
_m('git', 'git')
_m('docker', 'docker', 'docker-compose')

# Subcommand page prefixes (git-commit, docker-run, choco-install, ...).
PREFIX_MAP = {'git-': 'git', 'docker-': 'docker', 'choco-': 'pkg'}

# Pages whose family is decided per example rather than per page.
PER_EXAMPLE = {'new-item'}


def page_family(platform, name):
    key = f'{platform}/{name}'
    if key in FAMILY_MAP:
        return FAMILY_MAP[key]
    if name in PER_EXAMPLE:
        return 'per-example'
    if name in FAMILY_MAP:
        return FAMILY_MAP[name]
    for pre, fam in PREFIX_MAP.items():
        if name.startswith(pre):
            return fam
    return None


def new_item_family(desc, cmd):
    """Route a New-Item example to mkdir / ln / touch, or None to skip."""
    m = re.search(r'-ItemType\s+(\{\{)?([^\s}]+)', cmd, re.I)
    if m:
        kind = m.group(2).lower()
        if kind.startswith('directory'):
            return 'mkdir'
        if any(k in kind for k in ('symboliclink', 'hardlink', 'junction')):
            return 'ln'
        if kind.startswith('file'):
            return 'touch'
        return None
    d = desc.lower()
    if 'regist' in d or 'rejestr' in d:  # registry / rejestr
        return None
    if 'file' in d or 'plik' in d:
        return 'touch'
    return None


# --- text cleaning -------------------------------------------------------------
def clean_text(s):
    s = s.strip()
    s = re.sub(r'\{\{(.*?)\}\}', lambda m: m.group(1).split('|')[0], s)  # {{x|y}} -> x
    s = re.sub(r'<(https?://[^>]+)>', r'\1', s)
    s = s.replace('`', '')
    # tldr mnemonic brackets: "[l]ong format", "sorted by [S]ize", "[r]ecursive"
    s = re.sub(r'\[([A-Za-z0-9]{1,3})\](?=[A-Za-z])', r'\1', s)
    s = re.sub(r'(?<=[A-Za-z])\[([A-Za-z0-9]{1,3})\]', r'\1', s)
    s = re.sub(r'(?<![\w\[])\[([A-Za-z0-9])\](?![\w\]])', r'\1', s)
    s = re.sub(r'\s+', ' ', s).strip()
    s = s.rstrip(':').rstrip()
    return s


def clean_summary(s):
    s = clean_text(s)
    return s.rstrip('.').strip()


# --- page parsing -------------------------------------------------------------
def parse_page(path):
    with open(path, encoding='utf-8', errors='replace') as f:
        lines = [l.rstrip('\n') for l in f]
    summary = None
    examples = []
    desc = None
    for line in lines:
        st = line.strip()
        if st.startswith('>'):
            if summary is None:
                summary = st[1:].strip()
        elif st.startswith('- '):
            desc = st[2:]
        elif st.startswith('`') and st.endswith('`') and len(st) > 1 and desc is not None:
            examples.append((desc, st[1:-1]))
            desc = None
    return summary, examples


# --- flag extraction ------------------------------------------------------------
FLAG_RE = re.compile(r'^--?[A-Za-z][\w-]*(=.*)?$')


def first_segment(cmd):
    """Return the first pipeline segment, ignoring separators inside {{...}}."""
    out, depth, i = [], 0, 0
    while i < len(cmd):
        if cmd.startswith('{{', i):
            depth += 1; out.append('{{'); i += 2; continue
        if cmd.startswith('}}', i) and depth:
            depth -= 1; out.append('}}'); i += 2; continue
        c = cmd[i]
        if depth == 0 and c in '|;' or (depth == 0 and cmd.startswith('&&', i)):
            break
        out.append(c); i += 1
    return ''.join(out)


def strip_flag_value(f):
    return f.split('=', 1)[0]


def split_alt(inner):
    """'[-h|--human-readable]' -> list of (short, long) pairs, or [] if not flags."""
    if '|' not in inner:
        return []
    left, right = inner.split('|', 1)
    left, right = left.strip(), right.strip()
    if not left.startswith('-'):
        return []
    lt, rt = left.split(), right.split()
    if len(lt) != 1:
        return []
    short = strip_flag_value(lt[0])
    if not FLAG_RE.match(short):
        return []
    rt = [strip_flag_value(t) for t in rt if t.startswith('-')]
    # expand bundled shorts on the long side too: [-lSR|-lS --recursive]
    rt = [u for t in rt for u in (['-' + c for c in t[1:]]
                                    if not t.startswith('--') and len(t) > 2 else [t])]
    if not rt:
        return [(short, None)]
    # bundled short flags: [-sh|--summarize --human-readable], [-la|-l --all]
    if not short.startswith('--') and len(short) > 2 and len(rt) == len(short) - 1:
        pairs = []
        for ch, lng in zip(short[1:], rt):
            if lng.startswith('--'):
                pairs.append(('-' + ch, lng))
            elif lng == '-' + ch:
                pairs.append(('-' + ch, None))
            else:
                return [(short, ' '.join(rt))]
        return pairs
    if len(rt) == 1:
        lng = rt[0]
        if short.startswith('--'):
            return [(short, None)]
        return [(short, lng if lng.startswith('--') else None)]
    return [(short, ' '.join(rt))]


PH_RE = re.compile(r'\{\{(.*?)\}\}')


def extract_flags(cmd):
    seg = first_segment(cmd)
    flags = []
    for m in PH_RE.finditer(seg):
        inner = m.group(1).strip()
        if inner.startswith('[') and inner.endswith(']'):
            flags.extend(split_alt(inner[1:-1]))
        elif '|' in inner:  # {{--context|--before-context|--after-context}}
            alts = [a.strip() for a in inner.split('|')]
            if all(FLAG_RE.match(a) for a in alts):
                for a in alts:
                    a = strip_flag_value(a)
                    flags.append((None, a) if a.startswith('--') else (a, None))
    plain = PH_RE.sub(' X ', seg)
    toks = plain.split()
    # drop quoted regions crudely: tokens starting with a quote until closing
    inq = None
    for t in toks:
        if inq:
            if t.endswith(inq):
                inq = None
            continue
        if t[:1] in '\'"' and not (len(t) > 1 and t.endswith(t[0])):
            inq = t[0]
            continue
        if FLAG_RE.match(t):
            f = strip_flag_value(t)
            flags.append((None, f) if f.startswith('--') else (f, None))
    seen, out = set(), []
    for s, l in flags:
        k = (s, l)
        if k not in seen:
            seen.add(k)
            out.append((s, l))
    return out


def head_sub(cmd):
    toks = PH_RE.sub(' X ', first_segment(cmd)).split()
    while toks and toks[0] in ('sudo', 'doas'):
        toks = toks[1:]
    if not toks:
        return None, None
    head = toks[0].lstrip('(')
    sub = toks[1] if len(toks) > 1 and re.match(r'^[a-z][a-z0-9-]*$', toks[1]) else None
    return head, sub


# --- main ---------------------------------------------------------------------------
def main():
    tldr = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else DEFAULT_TLDR)
    os.makedirs(OUT_DIR, exist_ok=True)
    rows, flag_rows = [], []
    used, skipped = Counter(), Counter()
    for lang, ldir in LANG_DIRS.items():
        for plat in PLATFORMS:
            d = os.path.join(tldr, ldir, plat)
            if not os.path.isdir(d):
                continue
            for fn in sorted(os.listdir(d)):
                if not fn.endswith('.md'):
                    continue
                name = fn[:-3].lower()
                fam = page_family(plat, name)
                if fam is None:
                    skipped[lang] += 1
                    continue
                page = f'{plat}/{name}'
                summary, examples = parse_page(os.path.join(d, fn))
                used[lang] += 1
                if summary and fam != 'per-example':
                    s = clean_summary(summary)
                    if s and not re.search(r'alias', s, re.I):
                        rows.append({'text': s, 'tool': fam, 'lang': lang, 'page': page,
                                     'cmd': None})
                for desc, cmd in examples:
                    if re.match(r'^\s*tldr\s', cmd):  # alias stubs: `tldr grep`
                        continue
                    text = clean_text(desc)
                    if not text:
                        continue
                    fams = []
                    if fam == 'per-example':
                        f2 = new_item_family(desc, cmd)
                        if f2:
                            fams.append(f2)
                    else:
                        fams.append(fam)
                        if name == 'get-childitem' and re.search(r'-(Recurse|Filter)\b', cmd, re.I):
                            fams.append('find')
                    for f in fams:
                        rows.append({'text': text, 'tool': f, 'lang': lang, 'page': page,
                                     'cmd': cmd})
                    if not fams:
                        continue
                    head, sub = head_sub(cmd)
                    if not head:
                        continue
                    for short, lng in extract_flags(cmd):
                        flag_rows.append({'tool': fams[0], 'head': head, 'sub': sub,
                                          'flag': short or lng, 'long': lng, 'text': text,
                                          'lang': lang, 'page': page})

    with open(os.path.join(OUT_DIR, 'tools.jsonl'), 'w', encoding='utf-8') as f:
        for r in rows:
            f.write(json.dumps(r, ensure_ascii=False) + '\n')
    with open(os.path.join(OUT_DIR, 'flags.jsonl'), 'w', encoding='utf-8') as f:
        for r in flag_rows:
            f.write(json.dumps(r, ensure_ascii=False) + '\n')
    write_readme(tldr)

    # --- stats ---
    by_fam = Counter(r['tool'] for r in rows)
    by_lang = Counter(r['lang'] for r in rows)
    by_fam_lang = defaultdict(Counter)
    for r in rows:
        by_fam_lang[r['tool']][r['lang']] += 1
    print(f'pages used: {dict(used)} (total {sum(used.values())}); '
          f'skipped: {dict(skipped)} (total {sum(skipped.values())})')
    print(f'tools.jsonl rows: {len(rows)}  per lang: {dict(by_lang)}')
    print('rows per family (total en/pl):')
    for fam, n in sorted(by_fam.items(), key=lambda x: -x[1]):
        c = by_fam_lang[fam]
        print(f'  {fam:12s} {n:5d}  {c["en"]:5d}/{c["pl"]:<5d}')
    by_head = Counter(r['head'] for r in flag_rows)
    uniq_head = defaultdict(set)
    for r in flag_rows:
        uniq_head[r['head']].add(r['flag'])
    print(f'flags.jsonl rows: {len(flag_rows)}  per lang: '
          f'{dict(Counter(r["lang"] for r in flag_rows))}')
    print('flags per head (rows / distinct flags):')
    for h, n in sorted(by_head.items(), key=lambda x: -x[1]):
        print(f'  {h:22s} {n:5d} / {len(uniq_head[h])}')


def write_readme(tldr):
    try:
        commit = subprocess.run(['git', '-C', tldr, 'rev-parse', 'HEAD'], capture_output=True,
                                text=True, check=True).stdout.strip()
    except Exception:
        commit = 'unknown'
    text = f"""# data/tldr

`tools.jsonl` and `flags.jsonl` are derived from
[tldr-pages](https://github.com/tldr-pages/tldr), commit `{commit}`
(English `pages/` and Polish `pages.pl/`; platforms common, linux, osx, windows).

tldr-pages content is licensed under the
[Creative Commons Attribution 4.0 International License (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/),
© the tldr-pages team and contributors.

**Modified:** pages were filtered to the commands relevant to tellsh, example
descriptions were cleaned (trailing colons dropped, backticks/placeholders
unwrapped, mnemonic brackets removed, whitespace collapsed) and mapped to tellsh
tool families; option flags were extracted from example commands.

Files:

- `tools.jsonl`: `{{"text", "tool", "lang", "page", "cmd"}}`; one row per example
  description plus one per page summary (`cmd` is null for summaries).
- `flags.jsonl`: `{{"tool", "head", "sub", "flag", "long", "text", "lang", "page"}}`;
  one row per option flag found in an example command.

## Regenerate

```sh
git clone --depth 1 https://github.com/tldr-pages/tldr data/external/tldr
python3 -I scripts/tldr_ingest.py
```
"""
    with open(os.path.join(OUT_DIR, 'README.md'), 'w', encoding='utf-8') as f:
        f.write(text)


if __name__ == '__main__':
    main()

codex
The implicit history path leaves a suggestion marked `catalog` after filling a slot from history, which appears to let it pass the `--yes` gate. I also found that the claimed held-out value pools contain values present in training text. I’m quantifying the overlap and checking which tests can run without writing files.
exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
import {sameCmd} from './scripts/lib/cmdnorm.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for (const [q,history] of [
['count words',['cat notes.txt']],['ile ma słów',['cat notes.txt']],['count words',['cat old.txt','cat "'$F'"']],['delete it',['cat old.txt; cat new.txt']],['delete it',['cat old.txt; cat "'$F'"']],['same for /var',['du -sh /etc','frobnicate /tmp/xxx']],['delete it',['cat old.txt','cat "'$(printf new.txt)'"']],
]) {const s=suggest(q,{env,history,compose:'off'});console.log(JSON.stringify({q,history,command:s.command,method:s.method,missing:s.missing,risk:s.risk,context:s.context,sources:s.slotSources}));}
for (const [a,b] of [[\"find . -name '*.log'\",\"find . -name *.log\"],[\"echo '"'$HOME'"'\",\"echo "'$HOME"],['"'sort -n -r a','sort -r -n a'],['ls > out -l','ls -l > out']]) console.log('sameCmd',a,b,sameCmd(a,b));
JS
sed -n '50,72p' test/regressions.test.js; sed -n '270,290p' test/regressions.test.js; cat scripts/report.js scripts/lib/pwsh_parse.js" in /workspace/tellsh
 succeeded in 78ms:
{"q":"count words","history":["cat notes.txt"],"command":"wc -w notes.txt","method":"catalog","missing":[],"risk":"safe","context":{"used":true,"commands":1,"rule":"implicit","note":"filled from history: file=notes.txt"},"sources":{"file":"history"}}
{"q":"ile ma słów","history":["cat notes.txt"],"command":"wc -w notes.txt","method":"catalog","missing":[],"risk":"safe","context":{"used":true,"commands":1,"rule":"implicit","note":"filled from history: file=notes.txt"},"sources":{"file":"history"}}
{"q":"count words","history":["cat old.txt","cat $F"],"command":"wc -w <FILE>","method":"catalog","missing":["file"],"risk":"safe","context":{"used":true,"commands":2,"rule":null,"note":null},"sources":{}}
{"q":"delete it","history":["cat old.txt; cat new.txt"],"command":"rm old.txt","method":"history-rule","missing":[],"risk":"high","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = old.txt"},"sources":{"file":"history"}}
{"q":"delete it","history":["cat old.txt; cat $F"],"command":"rm old.txt","method":"history-rule","missing":[],"risk":"high","context":{"used":true,"commands":1,"rule":"pronoun","note":"\"file\" from history = old.txt"},"sources":{"file":"history"}}
{"q":"same for /var","history":["du -sh /etc","frobnicate /tmp/xxx"],"command":"du -sh /var","method":"history-rule","missing":[],"risk":"safe","context":{"used":true,"commands":2,"rule":"same-for","note":"same as previous dir_size with path=/var"}}
{"q":"delete it","history":["cat old.txt","cat $(printf new.txt)"],"command":"rm <FILE>","method":"history-rule","missing":["file"],"risk":"high","context":{"used":true,"commands":2,"rule":"refused","note":"the latest file in history ($) cannot be read unambiguously; not guessing"},"sources":{}}
sameCmd find . -name '*.log' find . -name *.log true
sameCmd echo '$HOME' echo $HOME true
sameCmd sort -n -r a sort -r -n a true
sameCmd ls > out -l ls -l > out true
    const w = words(command);
    for (const x of w) if (x.includes('PWNED')) assert.ok(x === INJ || x.endsWith('=' + INJ), `${it.id}: ${command}`);
    assert.equal(spawnSync('bash', ['-n', '-c', command]).status, 0, command);
    checked++;
  }
  assert.ok(checked >= 10, `checked ${checked}`);
});

test('CLI: the reported injection payloads stay quoted (bash) and never execute', () => {
  const j = JSON.parse(cli(['--json', '--shell', 'bash', "rozpakuj 'x$(id).tar.gz' do 'o{file}'"]).stdout);
  assert.ok(!j.command.includes("'o'x"), j.command);
  assert.ok(words(j.command).includes('o{file}'), j.command);
  const dir = tmp();
  try {
    const r = cli(['--yes', '--shell', 'bash', 'show git diff for "{file}; printf INJECTED; #"'], { cwd: dir });
    assert.equal((r.stdout.match(/INJECTED/g) || []).length, 1, r.stdout); // only inside the printed, quoted command
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

// ---------------------------------------------------------------------------------------------
// blocker 2: PowerShell accepts typographic quotes as quote characters

test('psQuote escapes every PowerShell quote character', () => {
test('exit code after a signal is 128 + signal number', async () => {
  assert.equal(await runShell('kill -TERM $$', 'bash'), 143);
  assert.equal(await runShell('kill -INT $$', 'bash'), 130);
});

test('--yes only runs safe commands straight from the catalog (not history-resolved ones)', () => {
  const dir = tmp();
  try {
    const f = join(dir, 'hist');
    writeFileSync(join(dir, 'notes.txt'), 'hello\n');
    writeFileSync(f, 'ls\ncat notes.txt\n');
    const r = cli(['--yes', '--shell', 'bash', `--history=${f}`, 'show', 'it'], { cwd: dir });
    assert.equal(r.status, 4, r.stdout);
    assert.match(r.stdout, /resolved from history/);
    assert.ok(!r.stdout.includes('hello'));
    assert.match(cli(['--help']).stdout, /never history-resolved/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

// ---------------------------------------------------------------------------------------------
// composer and eval normalisation
// Replace a marked section in EVAL.md (keeps eval and bench results side by side).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const EVAL_MD = fileURLToPath(new URL('../EVAL.md', import.meta.url));

export function updateSection(name, body) {
  let md = existsSync(EVAL_MD) ? readFileSync(EVAL_MD, 'utf8')
    : '# tellsh evaluation\n\nGenerated by `npm run eval` and `npm run bench`.\n\n<!-- eval:start -->\n<!-- eval:end -->\n\n<!-- bench:start -->\n<!-- bench:end -->\n';
  const re = new RegExp(`<!-- ${name}:start -->[\\s\\S]*?<!-- ${name}:end -->`);
  const block = `<!-- ${name}:start -->\n${body.trim()}\n<!-- ${name}:end -->`;
  md = re.test(md) ? md.replace(re, block) : `${md.trimEnd()}\n\n${block}\n`;
  writeFileSync(EVAL_MD, md);
}
// PowerShell syntax check that never executes the checked source: the source is passed in an
// environment variable and only handed to the parser. (Anything placed after `-Command <script>`
// would be appended to the script and run.)
import { spawnSync } from 'node:child_process';

export const PWSH_PARSE_SCRIPT = '$e=$null;[void][System.Management.Automation.Language.Parser]::ParseInput($env:TELLSH_PARSE_SRC,[ref]$null,[ref]$e);if($e.Count){exit 1}';

/** -> true (parses), false (syntax errors), null (pwsh could not be started) */
export function pwshParses(src, { bin = 'pwsh', env = process.env } = {}) {
  const r = spawnSync(bin, ['-NoProfile', '-NonInteractive', '-Command', PWSH_PARSE_SCRIPT], { env: { ...env, TELLSH_PARSE_SRC: src }, encoding: 'utf8' });
  if (r.error) return null;
  return r.status === 0;
}

exec
/bin/bash -lc 'cat src/slots.js' in /workspace/tellsh
 succeeded in 0ms:
// Deterministic slot extraction (regex + small vocabularies). No ML here.
// extractSlots(text) returns everything it can find; src/fill.js picks what an intent needs.

const FOLD = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };

// Lowercase + fold Polish diacritics, preserving string length so indices map back to the original.
export function foldKeepLength(s) {
  let out = '';
  for (const ch of s) {
    let c = ch.toLowerCase();
    if (c.length !== ch.length) c = ch;
    c = FOLD[c] || c;
    if (c.length !== ch.length) c = ch; // never change length
    out += c;
  }
  return out;
}

// ---------- number words (EN + PL, folded) up to 20 ----------
const NUM_WORDS = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
  eighteen: 18, nineteen: 19, twenty: 20, dozen: 12,
  jeden: 1, jedna: 1, jedno: 1, jednego: 1, jednej: 1,
  dwa: 2, dwie: 2, dwoch: 2, dwu: 2, dwoma: 2,
  trzy: 3, trzech: 3, cztery: 4, czterech: 4,
  piec: 5, pieciu: 5, szesc: 6, szesciu: 6, siedem: 7, siedmiu: 7, osiem: 8, osmiu: 8,
  dziewiec: 9, dziewieciu: 9, dziesiec: 10, dziesieciu: 10,
  jedenascie: 11, jedenastu: 11, dwanascie: 12, dwunastu: 12, trzynascie: 13, trzynastu: 13,
  czternascie: 14, czternastu: 14, pietnascie: 15, pietnastu: 15, szesnascie: 16, szesnastu: 16,
  siedemnascie: 17, siedemnastu: 17, osiemnascie: 18, osiemnastu: 18,
  dziewietnascie: 19, dziewietnastu: 19, dwadziescia: 20, dwudziestu: 20,
};
const NUM_WORD_RE = new RegExp(`\\b(${Object.keys(NUM_WORDS).sort((a, b) => b.length - a.length).join('|')})\\b`, 'g');
const NUM = String.raw`(\d+(?:[.,]\d+)?)`;

// ---------- vocabularies ----------
export const KNOWN_EXT = new Set(('log txt pdf py js mjs cjs ts tsx jsx json md csv tsv xml html htm css scss sh bash zsh ' +
  'jpg jpeg png gif webp svg bmp tiff mp4 mkv avi mov webm mp3 wav flac ogg zip gz tgz tar bz2 xz 7z rar iso ' +
  'yaml yml toml ini conf cfg env cpp hpp java kt go rs rb php sql sqlite db doc docx xls xlsx ppt pptx odt ods ' +
  'deb rpm dmg exe bak tmp swp out lock class jar war o so a').split(' '));
// extensions that are also common words: only accepted with an explicit dot
const AMBIG_EXT = new Set(['go', 'a', 'o', 'so', 'out', 'lock', 'env', 'db', 'class', 'war', 'tmp', 'doc', 'c', 'h', 'rs', 'sh']);
export const EXT_ALIASES = {
  python: 'py', pythona: 'py', pythonowe: 'py', javascript: 'js', javascriptowe: 'js', typescript: 'ts',
  typescriptowe: 'ts', markdown: 'md', markdownowe: 'md', tekstowe: 'txt', tekstowych: 'txt', tekstowy: 'txt',
  text: 'txt', logi: 'log', logow: 'log', logs: 'log', logami: 'log', logach: 'log',
  images: 'jpg', image: 'jpg', photos: 'jpg', zdjecia: 'jpg', zdjec: 'jpg', obrazki: 'png', obrazkow: 'png',
  shell: 'sh', bashowe: 'sh', skrypty: 'sh', skryptow: 'sh', yamlowe: 'yaml', jsonowe: 'json', jsonow: 'json',
  pdfy: 'pdf', pdfow: 'pdf', pdfami: 'pdf', pdfach: 'pdf', csvki: 'csv', csvek: 'csv', golang: 'go', rust: 'rs',
  ruby: 'rb', java: 'java', cpp: 'cpp', backup: 'bak', backupy: 'bak', tymczasowe: 'tmp', temporary: 'tmp', temp: 'tmp',
  mp3ki: 'mp3', filmy: 'mp4', videos: 'mp4', video: 'mp4', filmow: 'mp4', archiwa: 'zip',
};
// alias words that only count as an extension when next to a "files" word
const WEAK_ALIAS = new Set(['text', 'logs', 'logi', 'logow', 'shell', 'backup', 'temp', 'java', 'image', 'video', 'ruby', 'rust']);
const FILE_WORDS = /\b(files?|plik\w*|scripts?|skrypt\w*|sources?|zrodl\w*|documents?|dokument\w*)\b/;

export const KNOWN_PROCS = new Set(('nginx apache2 httpd node nodejs python python3 java chrome chromium firefox code slack ' +
  'spotify docker dockerd postgres mysqld mysql redis redis-server mongod sshd php php-fpm gunicorn uwsgi ruby rails ' +
  'vim nvim emacs zoom teams discord steam electron npm yarn webpack vite deno bun kubelet containerd jenkins tomcat ' +
  'elasticsearch kafka zookeeper cron crond xorg gnome-shell pulseaudio pipewire htop top tmux screen sleep ffmpeg vlc ' +
  'thunderbird telegram signal celery sidekiq puma unicorn beam erlang dotnet ollama postgresql mariadb caddy traefik ' +
  'haproxy memcached rabbitmq-server minecraft safari skype obs gimp blender libreoffice').split(' '));
export const KNOWN_SERVICES = new Set(('nginx apache2 apache httpd docker ssh sshd postgresql postgres mysql mariadb redis ' +
  'redis-server mongod mongodb cron crond cups bluetooth networkmanager network-manager ufw firewalld fail2ban php-fpm ' +
  'systemd-resolved systemd-journald rsyslog containerd kubelet jenkins tomcat elasticsearch grafana-server grafana ' +
  'prometheus haproxy postfix dovecot named bind9 avahi-daemon snapd gdm lightdm sddm nfs-server smbd samba vsftpd ' +
  'memcached rabbitmq-server supervisor openvpn wireguard caddy traefik ntp chronyd chrony nodered pm2 gunicorn ' +
  'celery minio vault consul nomad zabbix-agent netdata cockpit').split(' '));
const KNOWN_PKGS = new Set(('htop curl wget git vim nano tmux jq nodejs npm python3 python3-pip pip docker docker.io ' +
  'ffmpeg tree ncdu neofetch zsh fish build-essential gcc make cmake openssl openssh-server net-tools nmap ' +
  'traceroute dnsutils whois unzip zip p7zip ripgrep fd-find bat fzf golang rustc ruby php sqlite3 postgresql ' +
  'redis nginx apache2 mc lm-sensors iotop iftop nethogs rsync gnupg imagemagick').split(' '));

// words that are never a slot value
const STOP = new Set(('the a an all any every some my me mi this that these those of for to in on at by with from ' +
  'named called name nazwie nazwa nazwany nazwana o process processes proces procesy procesu procesow program ' +
  'programu app aplikacje aplikacja aplikacji service services usluga usluge uslugi uslug serwis serwisu daemon demon ' +
  'demona unit container kontener kontenera kontenerze kontenerow kontenery package pakiet pakietu paczke paczka ' +
  'branch brancha branchu gałąź galaz galezi galezia new nowy nowa nowej nowego nowa nowa nowym local lokalny ' +
  'lokalna lokalnej please prosze pls plz wszystkie wszystko wszystkich running uruchomiony dzialajacy dzialajace ' +
  'force forcibly silowo sile -9 now teraz natychmiast is jest czy mam have i do na w we z ze ze od dla jak how ' +
  'which what co gdzie where file plik pliku files pliki command komenda komendy polecenie polecenia called ' +
  'zmienna zmiennej variable env value wartosc wartość and i oraz then logs logi logow status restart start stop ' +
  'kill zabij ubij show pokaz pokaż sprawdz sprawdź check list lista via using uzywajac it its it\'s up out into ' +
  'się sie mnie mi tego ten ta to tej tym user uzytkownik uzytkownika owner wlasciciel host server serwer serwera ' +
  'domain domena domeny word slowo slowa text tekst tekstu phrase fraze fraza string ciag pattern wzorzec ' +
  'history historii historia historie historyczne shell bash zsh commands komend poprzednich previous earlier wczesniej ' +
  'moim mojego moj moja moje mojej mojego twoim your exactly dokladnie somewhere gdzies anywhere ma byc być').split(' '));
export const isStopWord = (w) => STOP.has(foldKeepLength(String(w)).toLowerCase());

const LOCATIONS = [
  [/\b(home dir(ectory)?|home folder|my home|katalog\w* domow\w*|folder\w* domow\w*|domow\w* (katalog|folder)\w*|w domu|\$home)\b/, '~'],
  [/\b(downloads?( folder| dir(ectory)?)?|pobrane|pobranych|folder\w* pobrane)\b/, '~/Downloads'],
  [/\b(desktop|pulpit\w*)\b/, '~/Desktop'],
  [/\b(documents|dokumenty|dokumentach|dokumentow)\b/, '~/Documents'],
  [/\b(whole (system|disk|drive|filesystem|computer)|entire (system|disk|drive|filesystem|computer)|root (dir(ectory)?|folder|filesystem)|cal\w* (system\w*|dysk\w*|komputer\w*)|everywhere|wszedzie|katalog\w* glown\w*)\b/, '/'],
  [/\b(current (dir(ectory)?|folder)|this (dir(ectory)?|folder)|here|tutaj|tu|biezac\w* (katalog|folder)\w*|tym (katalogu|folderze)|obecn\w* (katalog|folder)\w*|aktualn\w* (katalog|folder)\w*)\b/, '.'],
  [/\b(var log|system logs? dir(ectory)?|katalog\w* (z )?logami|katalog\w* logow)\b/, '/var/log'],
];

const blank = (s, start, end) => s.slice(0, start) + ' '.repeat(end - start) + s.slice(end);
// end of the word starting at `i` in the original text (number words were padded to digits in `work`)
const wordEnd = (text, i) => { const m = /^[\p{L}\d]+/u.exec(text.slice(i)); return i + (m ? m[0].length : 1); };

function numVal(s) {
  if (s == null) return null;
  if (/^\d+([.,]\d+)?$/.test(s)) return parseFloat(s.replace(',', '.'));
  return NUM_WORDS[s] ?? null;
}

function sizeToFind(numStr, unit) {
  const n = parseFloat(numStr.replace(',', '.'));
  const u = unit.toLowerCase();
  let mult; // in KiB
  if (/^(t|tb|tib|tera\w*)$/.test(u)) mult = 1024 ** 3;
  else if (/^(g|gb|gib|giga\w*|gig|gigs)$/.test(u)) mult = 1024 ** 2;
  else if (/^(m|mb|mib|meg|megs|mega\w*)$/.test(u)) mult = 1024;
  else if (/^(k|kb|kib|kilo\w*)$/.test(u)) mult = 1;
  else return `${Math.round(n)}c`; // bytes
  const kib = n * mult;
  if (Number.isInteger(kib / 1024 ** 2) && kib >= 1024 ** 2) return `${kib / 1024 ** 2}G`;
  if (Number.isInteger(kib / 1024) && kib >= 1024) return `${kib / 1024}M`;
  return `${Math.round(kib)}k`;
}

const UNIT_RE = String.raw`(minut\w*|mins?|minutes?|m|godzin\w*|godz|hours?|hrs?|h|dni|dnia|dzien|days?|d|dob\w*|tydzien|tygodni\w*|tyg|weeks?|w|miesiac\w*|mies|months?|lat|lata|rok|roku|years?)`;

function unitOf(u) {
  if (/^(minut|mins?$|minutes?$|m$)/.test(u)) return 'min';
  if (/^(godz|hours?$|hrs?$|h$)/.test(u)) return 'h';
  if (/^(dni|dnia|dzien|days?$|d$|dob)/.test(u)) return 'd';
  if (/^(tydzien|tygodni|tyg|weeks?$|w$)/.test(u)) return 'w';
  if (/^(miesiac|mies|months?$)/.test(u)) return 'mo';
  return 'y';
}

export function durationDerived(amount, unit) {
  const minutes = { min: 1, h: 60, d: 1440, w: 10080, mo: 43200, y: 525600 }[unit] * amount;
  const days = Math.max(1, Math.round(minutes / 1440));
  const age = minutes < 1440 ? `-mmin -${Math.round(minutes)}` : `-mtime -${days}`;
  const names = { min: 'minutes', h: 'hours', d: 'days', w: 'weeks', mo: 'months', y: 'years' };
  const since = `${amount} ${amount === 1 ? names[unit].slice(0, -1) : names[unit]} ago`;
  return { minutes, days, age, since };
}

const PATH_TOKEN = /(?:^|[\s(=,])([A-Za-z]:\\[^\s,;"'()]*|\\\\[^\s,;"'()]+|(?:~|\.{1,2})?\/[^\s,;:"'()]*|~(?=[\s,;]|$)|(?:[\w@+-][\w.@+-]*\/)+[\w.@+-]*|[\w@+-][\w@+-]*(?:\.[\w-]+)*\.[A-Za-z][A-Za-z0-9]{0,4}(?:\.[a-z0-9]{1,3})?)(?=$|[\s,;:!?)])/g;

/**
 * @returns object with: quoted[], urls[], hosts[], target, paths[], count, size, duration, port, pid, mode,
 *   ext, var, words (folded token list), text (original), rest (folded text with consumed spans blanked)
 */
export function extractSlots(input) {
  const text = String(input);
  let work = foldKeepLength(text); // same length as text
  const out = { text, quoted: [], urls: [], hosts: [], paths: [], numbers: [], spans: [] };
  const spans = []; // [start, value] for ordering paths
  // surface spans (character offsets into `text`) by type; `work` stays the same length as `text`
  // throughout so every regex index maps straight back to the original string
  const mark = (type, start, end, value) => out.spans.push({ type, start, end, value });
  const take = (re, fn) => {
    re.lastIndex = 0;
    let m;
    const found = [];
    while ((m = re.exec(work))) found.push(m);
    for (const mm of found) {
      fn(mm);
    }
    for (const mm of found.reverse()) work = blank(work, mm.index, mm.index + mm[0].length);
  };
  const cut = (m) => { work = blank(work, m.index, m.index + m[0].length); };

  // 1. quoted strings (values from the original text, case preserved)
  const quotedSpans = [];
  take(/"([^"]*)"|(?<![\p{L}\d])'(.+?)'(?![\p{L}\d])|„([^”"]*)[”"]|“([^”]*)”|`([^`]*)`/gu, (m) => {
    const v = text.slice(m.index + 1, m.index + m[0].length - 1);
    out.quoted.push(v);
    quotedSpans.push([m.index, v]);
    mark('QUOTED', m.index + 1, m.index + m[0].length - 1, v);
  });
  // 2. URLs and git remotes
  take(/\b(?:https?|ftp|ssh|git):\/\/[^\s"'<>]+|\bwww\.[^\s"'<>]+|\bgit@[\w.-]+:[\w./-]+/g, (m) => {
    const u = text.slice(m.index, m.index + m[0].length).replace(/[.,;:!?)]+$/, '');
    out.urls.push(u);
    mark('URL', m.index, m.index + u.length, u);
    const h = u.replace(/^\w+:\/\//, '').replace(/^git@/, '').split(/[/:?#]/)[0];
    if (h) out.hosts.push(h);
  });
  // 3. user@host
  take(/\b[\w.-]+@[\w.-]*[\w-]\b/g, (m) => {
    const v = text.slice(m.index, m.index + m[0].length);
    out.target = out.target || v;
    out.hosts.push(v.split('@')[1]);
    mark('HOST', m.index, m.index + v.length, v);
  });
  // 4. IPv4 (optionally with :port)
  take(/\b(\d{1,3}(?:\.\d{1,3}){3})(?::(\d{1,5}))?\b/g, (m) => {
    out.hosts.push(m[1]);
    mark('HOST', m.index, m.index + m[1].length, m[1]);
    if (m[2]) {
      out.port = out.port || +m[2];
      mark('PORT', m.index + m[0].length - m[2].length, m.index + m[0].length, +m[2]);
    }
  });
  // 5. paths / filenames (positions kept for src/dst ordering)
  PATH_TOKEN.lastIndex = 0;
  {
    let m;
    const found = [];
    while ((m = PATH_TOKEN.exec(work))) {
      const start = m.index + m[0].length - m[1].length;
      const raw = text.slice(start, start + m[1].length).replace(/[.]+$/, '');
      if (!raw) continue;
      if (/^\d+([.,]\d+)*$/.test(raw)) continue; // version/number
      if (/^\d+(\.\d+)?[kmgt]i?b?$/i.test(raw)) continue; // size like 1.5GB
      if (/^(e\.g|i\.e|np|tj|itp|etc|tar\.gz|tar\.bz2|tar\.xz)$/i.test(raw)) continue;
      if (/^[^/]*\.[a-z]+$/i.test(raw) && !raw.includes('/')) {
        // bare "name.ext": a domain (host intents) or a filename — keep it as both candidates
        if (/^[a-z0-9-]+(\.[a-z0-9-]+)*\.(com|org|net|io|pl|dev|de|uk|eu|gov|edu|info|co|app|ai|me|cloud|local|lan|internal|xyz|tech|ru|fr|it|es|nl|cz|us|ca)$/i.test(raw)) {
          out.hosts.push(raw);
          mark('HOST', start, start + raw.length, raw);
          continue;
        }
      }
      if (/:\/\//.test(raw)) continue;
      found.push([start, raw, m[1].length]);
    }
    for (const [start, raw, len] of found.reverse()) {
      spans.push([start, raw]);
      mark('PATH', start, start + raw.length, raw);
      work = blank(work, start, start + len);
    }
  }
  // 5b. domains / hostnames not caught above (e.g. "google.com" without path)
  take(/\b((?:[a-z0-9-]+\.)+[a-z]{2,})\b/g, (m) => {
    out.hosts.push(text.slice(m.index, m.index + m[0].length));
    mark('HOST', m.index, m.index + m[0].length, out.hosts[out.hosts.length - 1]);
  });
  // 6. named locations
  for (const [re, val] of LOCATIONS) {
    const m = work.match(re);
    if (m) {
      spans.push([m.index, val]);
      mark('PATH', m.index, m.index + m[0].length, val);
      work = blank(work, m.index, m.index + m[0].length);
    }
  }
  spans.sort((a, b) => a[0] - b[0]);
  for (const [, v] of spans) if (!out.paths.includes(v)) out.paths.push(v);
  // same list but with quoted strings as path candidates (for intents that take only paths)
  out.pathsWithQuoted = [];
  for (const [, v] of [...spans, ...quotedSpans].sort((a, b) => a[0] - b[0])) {
    if (!out.pathsWithQuoted.includes(v)) out.pathsWithQuoted.push(v);
  }

  // 7. variable names (UPPER_CASE in the original)
  {
    const m = text.match(/(?:^|[\s$])\$?\{?([A-Z_][A-Z0-9_]{1,})\}?(?=$|[\s,.?!])/);
    if (m && !/^(PID|CPU|RAM|GPU|USB|DNS|IP|URL|HTTP|HTTPS|SSH|TCP|UDP|OS|PDF|JSON|CSV|MD5|SHA|SHA256|GB|MB|KB|TB|II|PL|EN|README|TODO|FIXME|ERROR|WARN|INFO|DEBUG|HEAD|API|SQL|AWS|GCP)$/.test(m[1])) {
      out.var = m[1];
      const at = m.index + m[0].indexOf(m[1]);
      mark('VAR', at, at + m[1].length, m[1]);
    }
  }

  // 8. number words -> digits, padded with spaces so positions keep mapping to `text`
  work = work.replace(NUM_WORD_RE, (w) => String(NUM_WORDS[w]).padEnd(w.length));
  // half an hour
  work = work.replace(/\b(half an hour|pol godziny|polgodziny)\b/, (w) => '30 min'.padEnd(w.length));

  // 9. sizes
  {
    const m = work.match(new RegExp(String.raw`(?:^|\s|[+><])${NUM}\s*(tb|tib|terabajt\w*|terabytes?|gb|gib|gigabajt\w*|gigabytes?|giga|gigs?|g|mb|mib|megabajt\w*|megabytes?|mega|megs?|meg|m|kb|kib|kilobajt\w*|kilobytes?|kilo|k|bajt\w*|bytes?|b)\b(?!\s*(?:dni|days?|godz|hour|minut))`, 'i'));
    // "5 m" could be minutes; treat bare m/k/g as size only when glued ("100M") or explicit unit
    if (m && !(/^[mkgb]$/i.test(m[2]) && /\s/.test(m[0].trim().slice(m[1].length, m[1].length + 1)))) {
      out.size = sizeToFind(m[1], m[2]);
      const at = m.index + m[0].indexOf(m[1]);
      mark('SIZE', at, m.index + m[0].length, out.size);
      cut(m);
    }
  }

  // 10. durations
  const durRe = new RegExp(String.raw`(?:\b(?:last|past|previous|within|in the last|ostatni\w*|poprzedni\w*|minion\w*|older than|starsze? niz|starszych niz|sprzed|ponad|over|more than|od|since|for|przez|z)\s+)?\b${NUM}\s*${UNIT_RE}\b(?:\s+ago|\s+temu)?`);
  let dm = work.match(durRe);
  if (dm) {
    const amount = numVal(dm[1]);
    out.duration = { amount, unit: unitOf(dm[2]), ...durationDerived(amount, unitOf(dm[2])) };
    mark('TIME', dm.index, dm.index + dm[0].length, out.duration.minutes);
    cut(dm);
  } else {
    const rel = [
      [/\b(yesterday|wczoraj\w*|od wczoraj)\b/, 2, 'd', 'yesterday'],
      [/\b(today|dzisiaj|dzis|dzisiejsz\w*|this morning|rano)\b/, 1, 'd', 'today'],
      [/\b(last|past|this|ostatni\w*|z ostatni\w*|w ostatni\w*|ten|tym|ta) (hour|godzin\w*)\b/, 1, 'h'],
      [/\b(last|past|this|ostatni\w*|z ostatni\w*|w ostatni\w*|ten|tym) (week|tydzien|tygodni\w*)\b/, 7, 'd'],
      [/\b(last|past|this|ostatni\w*|z ostatni\w*|w ostatni\w*|ten|tym) (month|miesiac\w*)\b/, 30, 'd'],
      [/\b(last|past|ostatni\w*|z ostatni\w*|ostatniej|w ostatni\w*) (day|dob\w*|dzien|24h)\b/, 1, 'd'],
      [/\b(last|past|ostatni\w*|z ostatni\w*|w ostatni\w*) (year|rok\w*)\b/, 365, 'd'],
      [/\b(minute|minut\w*) temu\b/, 1, 'min'],
    ];
    for (const [re, amount, unit, since] of rel) {
      const m = work.match(re);
      if (m) {
        out.duration = { amount, unit, ...durationDerived(amount, unit) };
        if (since) out.duration.since = since;
        mark('TIME', m.index, m.index + m[0].length, out.duration.minutes);
        cut(m);
        break;
      }
    }
  }

  // 11. ports
  {
    const m = work.match(/\b(?:port\w*|porcie)\s*(?:nr\.?|numer|number|no\.?)?\s*:?\s*(\d{1,5})\b/) ||
      work.match(/(?:^|[\s\w]):(\d{2,5})\b/) || work.match(/\b(\d{2,5})\s*(?:port\w*|porcie)\b/);
    if (m && +m[1] > 0 && +m[1] < 65536) {
      out.port = out.port || +m[1];
      const at = m.index + m[0].lastIndexOf(m[1]);
      mark('PORT', at, at + m[1].length, +m[1]);
      cut(m);
    }
  }
  // 12. pid
  {
    const m = work.match(/\b(?:pid\w*|process id|id procesu|procesu? (?:o )?(?:id|numerze|nr)|numer procesu)\s*(?:=|:|nr|numer)?\s*(\d+)\b/);
    if (m) {
      out.pid = +m[1];
      const at = m.index + m[0].lastIndexOf(m[1]);
      mark('PID', at, at + m[1].length, +m[1]);
      cut(m);
    }
  }
  // 13. chmod mode
  {
    const m = work.match(/(?:^|\s)([0-7]{3,4})(?=\s|$)/) || work.match(/(?:^|\s)([ugoa]*[+=-][rwxXst]+)(?=\s|$)/);
    if (m && (/[+=-]/.test(m[1]) || /^[0-7]{3,4}$/.test(m[1]))) {
      out.mode = m[1];
      out.modeRaw = m[0];
      const at = m.index + m[0].indexOf(m[1]);
      out.modeSpan = { type: 'MODE', start: at, end: at + m[1].length, value: m[1] };
    }
  }
  // 14. extension
  {
    let m = work.match(/(?:^|\s)\*?\.([a-z0-9]{1,6})\b/);
    if (m && (KNOWN_EXT.has(m[1]) || /^[a-z]{1,5}$/.test(m[1]))) {
      out.ext = m[1];
      const at = m.index + m[0].search(/\S/);
      mark('EXT', at, m.index + m[0].length, m[1]);
      cut(m);
    } else {
      const hasFileWord = FILE_WORDS.test(work);
      for (const tm of work.matchAll(/[a-z0-9]+/g)) {
        const t = tm[0];
        let e = null;
        if (KNOWN_EXT.has(t) && !AMBIG_EXT.has(t) && t !== 'tar' && t !== 'zip' && t !== 'gz') e = t;
        else if (EXT_ALIASES[t] && (!WEAK_ALIAS.has(t) || hasFileWord)) e = EXT_ALIASES[t];
        else if ((t === 'zip' || t === 'gz' || t === 'tar') && hasFileWord) e = t;
        if (e) { out.ext = e; mark('EXT', tm.index, tm.index + t.length, e); break; }
      }
    }
  }
  // 15. remaining numbers -> count
  {
    const numMs = [...work.matchAll(/(?<![\w.])(\d+)(?![\w.])/g)];
    const nums = numMs.map((m) => +m[1]);
    out.numbers = nums;
    out.numberSpans = numMs.map((m) => ({ type: 'NUM', start: m.index, end: wordEnd(text, m.index), value: +m[1] }));
    const top = work.match(/\b(?:top|first|last|pierwsz\w*|ostatni\w*|najwieksz\w*)\s+(\d+)\b/) ||
      work.match(/\b(\d+)\s+(?:largest|biggest|najwieksz\w*|top|najciezsz\w*|lines?|lini\w*|files?|plik\w*|process\w*|proces\w*|commit\w*|entries|wpis\w*|items?|results?|wynik\w*|ostatnich|pierwszych)\b/);
    if (top) {
      out.count = +top[1];
      const at = top.index + top[0].indexOf(top[1]);
      out.countSpan = { type: 'NUM', start: at, end: wordEnd(text, at), value: out.count };
    } else if (nums.length) {
      out.count = nums[0];
      out.countSpan = out.numberSpans[0];
    }
  }
  out.rest = work;
  out.words = work.split(/[^a-z0-9@._/+-]+/).filter(Boolean);
  return out;
}

// ---------- argument extraction for name-like slots ----------

/** Map a Polish-inflected form onto a vocabulary entry (javy -> java, nginxa -> nginx). */
export function deinflect(w, vocab) {
  if (w.length < 4) return null;
  for (const suf of ['ami', 'ach', 'owi', 'em', 'om', 'ie', 'y', 'a', 'u', 'e', 'i']) {
    if (!w.endsWith(suf)) continue;
    const stem = w.slice(0, -suf.length);
    for (const add of ['', 'a', 'e', 'o']) if (stem.length + add.length >= 3 && vocab.has(stem + add)) return stem + add;
  }
  return null;
}

function nextAfter(words, triggers, { skip = STOP, accept = /^[\w@.:/+-]+$/ } = {}) {
  for (let i = 0; i < words.length; i++) {
    if (!triggers.has(words[i])) continue;
    for (let j = i + 1; j < words.length; j++) {
      const w = words[j];
      if (skip.has(w)) continue;
      if (triggers.has(w)) continue;
      if (accept.test(w) && !/^\d+$/.test(w)) return { word: w, index: j };
      break;
    }
  }
  return null;
}

// original-case token from the original text matching a folded word
function original(text, folded) {
  const toks = text.split(/[\s,;!?()"']+/);
  return toks.find((t) => foldKeepLength(t).replace(/[.:]+$/, '') === folded) || folded;
}

const set = (s) => new Set(s.split(' '));
const TRIG = {
  name: set('kill killall pkill zabij ubij zakoncz zakończ terminate stop end zamknij close proces procesu procesy procesow process processes named called nazwie pgrep find znajdz szukaj running dziala działa ubic zabic zabić'),
  service: set('service services usluga usluge uslugi usluga serwis serwisu serwisy daemon demon demona unit restart restartuj zrestartuj start uruchom wystartuj stop zatrzymaj status stan enable wlacz wlaczyc wylacz disable logs logi logow logach of for dla journal journalctl reload przeladuj'),
  container: set('container kontener kontenera kontenerze kontenerow logs logi logow exec into do stop zatrzymaj shell bash sh wejdz enter'),
  pkg: set('install zainstaluj instaluj doinstaluj package pakiet pakietu paczke paczka installed zainstalowany zainstalowane zainstalowana apt brew mam have'),
  cmd: set('which where gdzie location lokalizacja path sciezka sciezke command komenda komendy polecenie polecenia binary binarka executable program programu jest is'),
  var: set('variable zmienna zmiennej zmiennych env value wartosc printenv echo'),
  branch: set('branch branchu brancha branchem branche galaz galezi galezia checkout switch przelacz przelaczyc przejdz -b called named nazwie na to do delete usun skasuj'),
  user: set('user uzytkownik uzytkownika uzytkownikowi owner wlasciciel wlasciciela to dla na chown byc'),
  pattern: set('for containing contains contain word text phrase string pattern grep szukaj wyszukaj poszukaj slowo slowa tekst tekstu fraze fraza frazy zawierajace zawierajacy zawierajacych zawieraja zawiera zawierajace ciag wystapienia occurrences mentions mention wzmianki find znajdz search'),
  host: set('ping pinguj pingnij host hosta hosts server serwer serwera serwerem to do domain domena domeny domenie for dla lookup resolve traceroute trace route trasa trase reach dns nslookup dig'),
  target: set('ssh connect polacz polaczyc zaloguj login log to do na into server serwer serwera'),
};

const BRANCH_STOP = new Set([...STOP, 'on', 'off', 'and', 'then', 'git', 'switch', 'checkout', 'create', 'utworz', 'stworz', 'zrob', 'make', 'go', 'idz',
  'origin', 'upstream', 'remote', 'istniejaca', 'istniejacy', 'existing', 'nowa', 'nowy', 'the']);
const BRANCH_STRONG = set('branch branchu brancha branchem galaz galezi galezia -b checkout switch named called nazwie');

const TAG_OF = { name: 'NAME', service: 'NAME', container: 'NAME', pkg: 'NAME', cmd: 'NAME', branch: 'BRANCH',
  user: 'USER', pattern: 'PATTERN', message: 'MSG', var: 'VAR', text: 'TEXT' };

// tagger-only mode (ex built by src/tagger.js exFromSpans): values come from tagged spans, no regex fallback
function taggedArg(slot, ex) {
  if (slot === 'host') return ex.hosts[0] ?? null;
  if (slot === 'target') {
    if (ex.target) return ex.target;
    const host = ex.hosts[0];
    const user = ex.tagged.USER?.[0];
    return host ? (user ? `${user}@${host}` : host) : null;
  }
  const t = TAG_OF[slot];
  const v = (t && ex.tagged[t]?.[0]) ?? null;
  return slot === 'service' && v ? v.replace(/\.service$/, '') : v;
}

export function pickArg(slot, ex) {
  if (ex.taggerOnly) return taggedArg(slot, ex);
  const { quoted, words, text } = ex;
  const vocab = slot === 'service' ? KNOWN_SERVICES : slot === 'pkg' ? KNOWN_PKGS : (slot === 'name' || slot === 'container') ? KNOWN_PROCS : null;
  if (['pattern', 'message', 'text', 'name', 'service', 'container', 'pkg', 'cmd', 'branch', 'user'].includes(slot) && quoted.length) {
    return quoted[0];
  }
  if (slot === 'var') {
    if (ex.var) return ex.var;
    const r = nextAfter(words, TRIG.var, { accept: /^[a-z_][a-z0-9_]*$/ });
    return r ? r.word.toUpperCase() : null;
  }
  if (slot === 'service') {
    const svc = text.match(/([\w@.-]+)\.service\b/);
    if (svc) return svc[1];
  }
  if (slot === 'host') {
    if (ex.hosts.length) return ex.hosts[0];
    const r = nextAfter(words, TRIG.host, { accept: /^[a-z0-9][\w.-]*$/ });
    return r ? original(text, r.word) : (ex.paths.find((p) => /^[\w-]+\.[\w.-]+$/.test(p)) || null);
  }
  if (slot === 'target') {
    if (ex.target) return ex.target;
    const host = ex.hosts[0] || nextAfter(words, TRIG.target, { accept: /^[a-z0-9][\w.-]*$/ })?.word;
    if (!host) return null;
    const as = ex.rest.match(/\b(?:as|jako|user|uzytkownik\w*)\s+([a-z_][\w-]*)\b/);
    return as && !STOP.has(as[1]) ? `${as[1]}@${host}` : host;
  }
  if (slot === 'message') {
    const m = text.match(/(?:message|wiadomo\S*|opisem|komentarzem|-m|saying|:)\s+(.+)$/i);
    return m ? m[1].trim().replace(/^(["'„“])(.*)["'”]$/s, '$2') : null;
  }
  if (slot === 'text') {
    const b64 = text.match(/(?:^|\s)([A-Za-z0-9+/]{8,}={0,2})(?=\s|$)/);
    if (b64 && /[A-Z]/.test(b64[1]) && /[a-z]/.test(b64[1]) || b64 && /=$/.test(b64[1])) return b64[1];
    const m = text.match(/(?:encode|zakoduj|zakodowac|zakodować|decode|odkoduj|zdekoduj|dekoduj)\s+(?:the\s+)?(?:string|text|tekst|napis|slowo|słowo)?\s*(.+?)(?:\s+(?:in|to|na|w|do|z|from|using)\s+base64.*)?$/i);
    if (m && !/^(base64|to|this|it|in)\b/i.test(m[1])) return m[1].trim();
    return null;
  }
  if (vocab) {
    for (const w of words) if (vocab.has(w)) return original(text, w);
    // Polish inflection of a known name: "procesy javy" -> java, "logi nginxa" -> nginx, "chroma" -> chrome
    for (const w of words) { const d = deinflect(w, vocab); if (d) return d; }
  }
  if (slot === 'branch') {
    const r = nextAfter(words, BRANCH_STRONG, { skip: BRANCH_STOP, accept: /^[\w./-]+$/ }) ||
      nextAfter(words, TRIG.branch, { skip: BRANCH_STOP, accept: /^[\w./-]+$/ });
    if (r) return original(text, r.word);
    const p = ex.paths.find((x) => /^[\w-]+\/[\w./-]+$/.test(x));
    return p || null;
  }
  if (slot === 'pattern') {
    const r = nextAfter(words, TRIG.pattern, { accept: /^[\w@.:/+-]+$/ });
    return r ? original(text, r.word) : null;
  }
  const trig = TRIG[slot];
  if (!trig) return null;
  const r = nextAfter(words, trig);
  return r ? original(text, r.word) : null;
}

// bare directory name: "in src", "w folderze projekt", "katalog node_modules"
const NOT_DIR = /^(plik|file|folder|katalog|director|dir$|ciag|ostatn|last|past|cal|whole|entire|this|current|biez|obecn|aktual|system|the$|my$|moim|moj|all$|each|every|real|czas|time|order|kolejn|desc|asc|base64|terminal|konsol|backgr|tle$|human|format|bajt|byte|linux|mac|bash|shell|repo|git|tym$|ten$|tej$|which|ktor|sort|reverse|odwrot|size|rozmiar|gb$|mb$|tar$|zip$|gz$)/;
export function pickDir(ex) {
  const re = /\b(?:in|inside|under|within|w|we|wewnatrz|pod|of|z|ze|from|for|dla|folder\w*|katalog\w*|directory|dir|podkatalog\w*)\s+(?:the\s+|my\s+|moim\s+)?(?:folder\w*\s+|katalog\w*\s+|directory\s+|dir\s+|podkatalog\w*\s+)?([\w][\w.-]*)/g;
  let m;
  while ((m = re.exec(ex.rest))) {
    const w = m[1];
    const bad = STOP.has(w) || NOT_DIR.test(w) || /^\d+$/.test(w) || KNOWN_EXT.has(w) || EXT_ALIASES[w] ||
      (!/^(folder|katalog|director|dir|podkatalog)/.test(m[0]) && !/[._-]/.test(w) && w.length < 3);
    if (bad) { re.lastIndex = m.index + 1; continue; }
    return original(ex.text, w);
  }
  return null;
}

// src/dst style: "X to Y" / "X do Y" when only one explicit path was found
export function pickDest(ex) {
  const m = ex.rest.match(/\b(?:to|into|do|na|->|as|jako)\s+([\w.~/-]+)\s*$/) || ex.rest.match(/\b(?:to|into|do|->)\s+(?:folder\w*|katalog\w*|directory|dir)?\s*([\w.~/-]+)/);
  if (m && !STOP.has(m[1])) return original(ex.text, m[1]);
  return null;
}

exec
/bin/bash -lc "node --test --test-reporter=dot --test-name-pattern='"'^(?!.*(?:loadHistory reads|--history=FILE|reported injection payloads|pwsh parse check passes|--yes only runs safe commands straight)).*$'"' test/*.test.js" in /workspace/tellsh
exec
/bin/bash -lc "node --input-type=module <<'JS'
import fs from 'node:fs';
import {normalize} from './src/features.js';
import {POOLS} from './scripts/lib/silver.js';
const read=p=>fs.readFileSync(p,'utf8').split('\\n').filter(Boolean).map(JSON.parse);
const ev=[...fs.readdirSync('data/eval').flatMap(f=>read('data/eval/'+f)),...read('data/shell/eval.jsonl'),...read('data/history/eval.jsonl').map(r=>({...r,text:r.query})),...read('data/compose/eval.jsonl'),...read('data/slots/gold.jsonl'),...read('data/ood_eval.jsonl')];
const evMap=new Map(ev.map(r=>[normalize(r.text),r]));
globalThis.audit=[];
let source=fs.readFileSync('scripts/gen_data.js','utf8').replace(/from '\\.\\.\\/src\\//g,\"from 'file:///workspace/tellsh/src/\").replace(/from '\\.\\/lib\\//g,\"from 'file:///workspace/tellsh/scripts/lib/\");
source=source.replace(\"const ROOT = fileURLToPath(new URL('..', import.meta.url));\",\"const ROOT = '/workspace/tellsh';\");
source=source.replace('readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, createWriteStream','readFileSync, readdirSync, existsSync');
source='const mkdirSync=()=>{}; const writeFileSync=()=>{}; const createWriteStream=()=>({write(){},end(){}});\\n'+source;
source=source.replace('const f = [...vectorize(text, DIM, extras).entries()]','globalThis.audit.push({text,family,intent,extras,g,group}); const f = [...vectorize(text, DIM, extras).entries()]');
await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const hits=globalThis.audit.filter(r=>evMap.has(normalize(r.text)));
console.log('generated classifier collisions',hits.length,'distinct eval texts',new Set(hits.map(r=>normalize(r.text))).size,'by source',Object.fromEntries([...new Set(hits.map(r=>r.g))].map(g=>[g,hits.filter(r=>r.g===g).length])));
console.log('collision examples',JSON.stringify(hits.filter(r=>r.g"'!=='"'ctx').slice(0,8))); console.log('ctx examples',JSON.stringify(hits.filter(r=>r.g==='ctx').slice(0,4)));
const train=globalThis.audit.filter(r=>r.g==='intents'||r.g==='shell');
const held=Object.entries(POOLS).flatMap(([k,vs])=>vs.filter((_,i)=>i%4===3).map(v=>[k,String(v)]));
const leaked=held.filter(([k,v])=>train.some(r=>r.text.includes(v)));
console.log('eval pool values present in emitted classifier text',leaked.length,'/',held.length,JSON.stringify(leaked.slice(0,35)));
const groups=new Map(); for(const r of globalThis.audit){const k=normalize(r.text)+'|'+r.intent; const x=groups.get(k)||new Set(); x.add(r.group);groups.set(k,x);}
console.log('normalized text+intent across gids', [...groups.values()].filter(x=>x.size>1).length);
JS" in /workspace/tellsh
 exited 1 in 38ms:
data:text/javascript;base64,Y29uc3QgbWtkaXJTeW5jPSgpPT57fTsgY29uc3Qgd3JpdGVGaWxlU3luYz0oKT0+e307IGNvbnN0IGNyZWF0ZVdyaXRlU3RyZWFtPSgpPT4oe3dyaXRlKCl7fSxlbmQoKXt9fSk7CiMhL3Vzci9iaW4vZW52IG5vZGUKLy8gQnVpbGQgZmVhdHVyaXNlZCB0cmFpbmluZyBkYXRhIGZvciBzY3JpcHRzL3RyYWluLnB5IChhbGwgZmVhdHVyZXMgY29tcHV0ZWQgYnkgc3JjL2ZlYXR1cmVzLmpzLCBzbwovLyB0cmFpbmluZyBhbmQgcnVudGltZSBzaGFyZSBvbmUgaW1wbGVtZW50YXRpb24pLiBXcml0ZXMgYnVpbGQvY2xzLmpzb25sLCBidWlsZC90YWcuanNvbmwsIGJ1aWxkL21ldGEuanNvbi4KLy8KLy8gICBjbGFzc2lmaWVyIHJvd3M6IHt5OiBmYW1pbHksIGk6IGludGVudHwiIiwgZjogW1tpZHgsIHZhbF0sIC4uLl0sIHcsIGc6IHNvdXJjZSwgbGFuZywgZ2lkfQovLyAgIHRhZ2dlciByb3dzOiAgICAge3Rvb2wsIGY6IFtbaWR4LCAuLi5dIHBlciB0b2tlbl0sIHk6IFtCSU8gbGFiZWwgcGVyIHRva2VuXSwgZ2lkfQppbXBvcnQgeyByZWFkRmlsZVN5bmMsIHJlYWRkaXJTeW5jLCBleGlzdHNTeW5jIH0gZnJvbSAnbm9kZTpmcyc7CmltcG9ydCB7IGpvaW4gfSBmcm9tICdub2RlOnBhdGgnOwppbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSAnbm9kZTp1cmwnOwppbXBvcnQgeyBJTlRFTlRTIH0gZnJvbSAnZmlsZTovLy93b3Jrc3BhY2UvdGVsbHNoL3NyYy9jYXRhbG9nLmpzJzsKaW1wb3J0IHsgRkFNSUxJRVMsIEZBTUlMWV9PRiwgTk9ORSwgVEFHX1RZUEVTIH0gZnJvbSAnZmlsZTovLy93b3Jrc3BhY2UvdGVsbHNoL3NyYy90b29scy5qcyc7CmltcG9ydCB7IHZlY3Rvcml6ZSwgbm9ybWFsaXplLCB0YWdUb2tlbnMsIHRhZ0ZlYXR1cmVzIH0gZnJvbSAnZmlsZTovLy93b3Jrc3BhY2UvdGVsbHNoL3NyYy9mZWF0dXJlcy5qcyc7CmltcG9ydCB7IGN0eEZlYXR1cmVzIH0gZnJvbSAnZmlsZTovLy93b3Jrc3BhY2UvdGVsbHNoL3NyYy9oaXN0b3J5LmpzJzsKaW1wb3J0IHsgc2lsdmVyU3BhbnMsIHJlbGV4LCBiaW9MYWJlbHMsIG11bGJlcnJ5MzIgfSBmcm9tICdmaWxlOi8vL3dvcmtzcGFjZS90ZWxsc2gvc2NyaXB0cy9saWIvc2lsdmVyLmpzJzsKCmNvbnN0IFJPT1QgPSAnL3dvcmtzcGFjZS90ZWxsc2gnOwpleHBvcnQgY29uc3QgRElNID0gMSA8PCAxODsKZXhwb3J0IGNvbnN0IFRBR19ESU0gPSAxIDw8IDE4Owpjb25zdCBhcmdzID0gcHJvY2Vzcy5hcmd2LnNsaWNlKDIpOwpjb25zdCBTRUVEID0gKyhhcmdzLmZpbmQoKGEpID0+IGEuc3RhcnRzV2l0aCgnLS1zZWVkPScpKT8uc2xpY2UoNykgfHwgMTMpOwpjb25zdCBybmcgPSBtdWxiZXJyeTMyKFNFRUQpOwpjb25zdCBwaWNrID0gKGFycikgPT4gYXJyW01hdGguZmxvb3Iocm5nKCkgKiBhcnIubGVuZ3RoKV07Cgpjb25zdCByZWFkSnNvbmwgPSAocCkgPT4gKGV4aXN0c1N5bmMocCkgPyByZWFkRmlsZVN5bmMocCwgJ3V0ZjgnKS5zcGxpdCgnXG4nKS5maWx0ZXIoKGwpID0+IGwudHJpbSgpKS5tYXAoKGwsIGkpID0+IHsKICB0cnkgeyByZXR1cm4gSlNPTi5wYXJzZShsKTsgfSBjYXRjaCAoZSkgeyB0aHJvdyBuZXcgRXJyb3IoYCR7cH06JHtpICsgMX06ICR7ZS5tZXNzYWdlfWApOyB9Cn0pIDogW10pOwpjb25zdCByZWFkRGlyID0gKGQpID0+IChleGlzdHNTeW5jKGQpID8gcmVhZGRpclN5bmMoZCkuZmlsdGVyKChmKSA9PiBmLmVuZHNXaXRoKCcuanNvbmwnKSkuc29ydCgpLmZsYXRNYXAoKGYpID0+IHJlYWRKc29ubChqb2luKGQsIGYpKSkgOiBbXSk7CgovLyAtLS0tLS0tLS0tIGVudmlyb25tZW50IC8gY29udGV4dCBzYW1wbGluZyAtLS0tLS0tLS0tCmNvbnN0IFNIRUxMX1AgPSBbWydiYXNoJywgMC4zNV0sIFsnenNoJywgMC4yNV0sIFsnc2gnLCAwLjA3XSwgWydwb3dlcnNoZWxsJywgMC4xOF0sIFsnZmlzaCcsIDAuMDhdLCBbJ2NtZCcsIDAuMDddXTsKZnVuY3Rpb24gc2FtcGxlRW52KHNoZWxsKSB7CiAgbGV0IHMgPSBzaGVsbDsKICBpZiAoIXMpIHsgbGV0IHIgPSBybmcoKTsgZm9yIChjb25zdCBbaywgcF0gb2YgU0hFTExfUCkgeyBpZiAoKHIgLT0gcCkgPD0gMCkgeyBzID0gazsgYnJlYWs7IH0gfSBzID8/PSAnYmFzaCc7IH0KICBsZXQgb3M7CiAgaWYgKHMgPT09ICdjbWQnKSBvcyA9ICd3aW4zMic7CiAgZWxzZSBpZiAocyA9PT0gJ3Bvd2Vyc2hlbGwnKSBvcyA9IHJuZygpIDwgMC43ID8gJ3dpbjMyJyA6IHJuZygpIDwgMC41ID8gJ2xpbnV4JyA6ICdkYXJ3aW4nOwogIGVsc2UgaWYgKHMgPT09ICd6c2gnKSBvcyA9IHJuZygpIDwgMC42ID8gJ2RhcndpbicgOiAnbGludXgnOwogIGVsc2Ugb3MgPSBybmcoKSA8IDAuNyA/ICdsaW51eCcgOiAnZGFyd2luJzsKICByZXR1cm4gW2BzaGVsbD0ke3N9YCwgYG9zPSR7b3N9YF07Cn0KY29uc3QgRU5UX0ZBTUlMWSA9IHsgY29udGFpbmVyOiAnZG9ja2VyJywgc2VydmljZTogJ3N5c3RlbWN0bCcsIHBpZDogJ3BzJywgcHJvYzogJ3BzJywgcG9ydDogJ3NzJywgZmlsZTogJ2NhdCcsIGRpcjogJ2xzJywgYnJhbmNoOiAnZ2l0JywgaG9zdDogJ3BpbmcnLCB1cmw6ICdjdXJsJyB9Owpjb25zdCBFTlRTID0gT2JqZWN0LmtleXMoRU5UX0ZBTUlMWSk7CmZ1bmN0aW9uIHJhbmRvbUN0eChtYWluKSB7CiAgY29uc3QgdHlwZXMgPSBbLi4ubmV3IFNldChbbWFpbiA/PyBwaWNrKEVOVFMpLCAuLi5FTlRTLmZpbHRlcigoKSA9PiBybmcoKSA8IDAuMTUpXSldOwogIGNvbnN0IGZhbSA9IHJuZygpIDwgMC43ID8gRU5UX0ZBTUlMWVt0eXBlc1swXV0gOiBwaWNrKE9iamVjdC5rZXlzKEZBTUlMSUVTKSk7CiAgcmV0dXJuIGN0eEZlYXR1cmVzKHsgZW50T3JkZXI6IHR5cGVzLCBsYXN0OiB7IGludGVudDogRkFNSUxJRVNbZmFtXVswXSB9LCBjd2RGbGFnczogcm5nKCkgPCAwLjMgPyBbJ2dpdCddIDogW10gfSk7Cn0KCi8vIC0tLS0tLS0tLS0gdHlwbyBhdWdtZW50YXRpb24gLS0tLS0tLS0tLQpmdW5jdGlvbiB0eXBvKHRleHQpIHsKICBjb25zdCBjaGFycyA9IFsuLi50ZXh0XTsKICBjb25zdCBpZHhzID0gY2hhcnMubWFwKChjLCBpKSA9PiAoL1xwe0x9L3UudGVzdChjKSA/IGkgOiAtMSkpLmZpbHRlcigoaSkgPT4gaSA+PSAwKTsKICBpZiAoaWR4cy5sZW5ndGggPCA0KSByZXR1cm4gdGV4dDsKICBjb25zdCBpID0gaWR4c1sxICsgTWF0aC5mbG9vcihybmcoKSAqIChpZHhzLmxlbmd0aCAtIDIpKV07CiAgY29uc3Qgb3AgPSBybmcoKTsKICBpZiAob3AgPCAwLjQpIGNoYXJzLnNwbGljZShpLCAxKTsKICBlbHNlIGlmIChvcCA8IDAuOCAmJiAvXHB7TH0vdS50ZXN0KGNoYXJzW2kgKyAxXSB8fCAnJykpIFtjaGFyc1tpXSwgY2hhcnNbaSArIDFdXSA9IFtjaGFyc1tpICsgMV0sIGNoYXJzW2ldXTsKICBlbHNlIGNoYXJzLnNwbGljZShpLCAwLCBjaGFyc1tpXSk7CiAgcmV0dXJuIGNoYXJzLmpvaW4oJycpOwp9CgovLyAtLS0tLS0tLS0tIGFuYXBob3JhIChoaXN0b3J5IHJlZmVyZW5jZSkgc2FtcGxlcyAtLS0tLS0tLS0tCmNvbnN0IEFOQVBIT1JBID0gewogIGtpbGw6IHsgZW46IFsna2lsbCBpdCcsICdraWxsIHRoYXQnLCAna2lsbCB0aGF0IHByb2Nlc3MnLCAndGVybWluYXRlIGl0JywgJ2tpbGwgaXQgbm93JywgJ2tpbGwgdGhpcyBvbmUnLCAnZW5kIHRoYXQgcHJvY2VzcycsICdqdXN0IGtpbGwgaXQnXSwKICAgIHBsOiBbJ3phYmlqIGdvJywgJ3phYmlqIHRvJywgJ3ViaWogZ28nLCAnemFiaWogdGVuIHByb2NlcycsICd6YWtvxYRjeiBnbycsICd1YmlqIHRlbiBwcm9jZXMnLCAnemFiaWogdGFtdGVuJywgJ3ViaWogdG8nXSwKICAgIG1hcDogeyBwaWQ6ICdraWxsX2J5X3BpZCcsIHByb2M6ICdraWxsX2J5X25hbWUnLCBwb3J0OiAna2lsbF9ieV9wb3J0JywgY29udGFpbmVyOiAnZG9ja2VyX3N0b3AnIH0gfSwKICBsb2dzOiB7IGVuOiBbJ3Nob3cgaXRzIGxvZ3MnLCAnbG9ncyBvZiB0aGF0IGNvbnRhaW5lcicsICdzaG93IGxvZ3MgZm9yIGl0JywgJ2xvZ3Mgb2YgaXQnLCAndGFpbCBpdHMgbG9ncycsICJzaG93IHRoYXQgc2VydmljZSdzIGxvZ3MiLCAnd2hhdCBkaWQgaXQgbG9nJ10sCiAgICBwbDogWydwb2thxbwgamVnbyBsb2dpJywgJ2xvZ2kgdGVnbyBrb250ZW5lcmEnLCAncG9rYcW8IGxvZ2kgdGVnbycsICdsb2dpIHRlaiB1c8WCdWdpJywgJ3Bva2HFvCB6IG5pZWdvIGxvZ2knLCAnbG9naSB6IHRlZ28nLCAnY28gdGFtIGxvZ3VqZSddLAogICAgbWFwOiB7IGNvbnRhaW5lcjogJ2RvY2tlcl9sb2dzJywgc2VydmljZTogJ2pvdXJuYWxfc2VydmljZScgfSB9LAogIHJlc3RhcnQ6IHsgZW46IFsncmVzdGFydCBpdCcsICdyZXN0YXJ0IHRoYXQgc2VydmljZScsICdyZXN0YXJ0IHRoYXQnLCAncmVsb2FkIGl0JywgJ2JvdW5jZSBpdCddLAogICAgcGw6IFsnenJlc3RhcnR1aiBnbycsICd6cmVzdGFydHVqIHTEmSB1c8WCdWfEmScsICd6cmVzdGFydHVqIHRvJywgJ3VydWNob20gZ28gcG9ub3duaWUnLCAncHJ6ZcWCYWR1aiB0byddLAogICAgbWFwOiB7IHNlcnZpY2U6ICdzZXJ2aWNlX3Jlc3RhcnQnIH0gfSwKICBzdG9wOiB7IGVuOiBbJ3N0b3AgaXQnLCAnc3RvcCB0aGF0JywgJ3N0b3AgdGhhdCBjb250YWluZXInLCAnc3RvcCB0aGlzIHNlcnZpY2UnLCAnc2h1dCBpdCBkb3duJ10sCiAgICBwbDogWyd6YXRyenltYWogZ28nLCAnemF0cnp5bWFqIHRvJywgJ3phdHJ6eW1haiB0ZW4ga29udGVuZXInLCAnemF0cnp5bWFqIHTEmSB1c8WCdWfEmScsICd3ecWCxIVjeiB0byddLAogICAgbWFwOiB7IGNvbnRhaW5lcjogJ2RvY2tlcl9zdG9wJywgc2VydmljZTogJ3NlcnZpY2Vfc3RvcCcsIHBpZDogJ2tpbGxfYnlfcGlkJywgcHJvYzogJ2tpbGxfYnlfbmFtZScgfSB9LAogIHN0YXJ0OiB7IGVuOiBbJ3N0YXJ0IGl0JywgJ3N0YXJ0IHRoYXQgc2VydmljZScsICdzdGFydCBpdCBhZ2FpbiddLCBwbDogWyd1cnVjaG9tIGdvJywgJ3d5c3RhcnR1aiB0xJkgdXPFgnVnxJknLCAnd8WCxIVjeiB0byddLAogICAgbWFwOiB7IHNlcnZpY2U6ICdzZXJ2aWNlX3N0YXJ0JyB9IH0sCiAgZGVsZXRlOiB7IGVuOiBbJ2RlbGV0ZSBpdCcsICdyZW1vdmUgdGhhdCcsICdyZW1vdmUgdGhhdCBmaWxlJywgJ2RlbGV0ZSB0aGlzJywgJ3JtIGl0JywgJ2dldCByaWQgb2YgaXQnLCAnZGVsZXRlIHRoYXQgYnJhbmNoJywgJ2RlbGV0ZSB0aGF0IGZvbGRlciddLAogICAgcGw6IFsndXN1xYQgdG8nLCAndXN1xYQgZ28nLCAnc2thc3VqIHRvJywgJ3VzdcWEIHRlbiBwbGlrJywgJ3d5d2FsIHRvJywgJ3NrYXN1aiB0xJkgZ2HFgsSFxbonLCAndXN1xYQgdGVuIGZvbGRlcicsICd1c3XFhCB0YW10byddLAogICAgbWFwOiB7IGZpbGU6ICdkZWxldGVfZmlsZScsIGRpcjogJ2RlbGV0ZV9kaXInLCBicmFuY2g6ICdnaXRfZGVsZXRlX2JyYW5jaCcgfSB9LAogIGVudGVyOiB7IGVuOiBbJ29wZW4gYSBzaGVsbCBpbiBpdCcsICdleGVjIGludG8gaXQnLCAnZW50ZXIgdGhhdCBjb250YWluZXInXSwgcGw6IFsnd2VqZMW6IGRvIG5pZWdvJywgJ3dlamTFuiBkbyB0ZWdvIGtvbnRlbmVyYScsICdvdHfDs3J6IHcgbmltIHNoZWxsJ10sCiAgICBtYXA6IHsgY29udGFpbmVyOiAnZG9ja2VyX2V4ZWMnIH0gfSwKICBzd2l0Y2g6IHsgZW46IFsnc3dpdGNoIHRvIGl0JywgJ2NoZWNrb3V0IHRoYXQgYnJhbmNoJywgJ2dvIHRvIHRoYXQgYnJhbmNoJ10sIHBsOiBbJ3ByemXFgsSFY3ogc2nEmSBuYSBuacSFJywgJ3ByemVqZMW6IG5hIHTEmSBnYcWCxIXFuicsICdjaGVja291dCBuYSB0byddLAogICAgbWFwOiB7IGJyYW5jaDogJ2dpdF9zd2l0Y2hfYnJhbmNoJyB9IH0sCiAgc3RhdHVzOiB7IGVuOiBbJ3N0YXR1cyBvZiBpdCcsICJ3aGF0J3MgaXRzIHN0YXR1cyIsICdpcyBpdCBydW5uaW5nJ10sIHBsOiBbJ2pha2kgbWEgc3RhdHVzJywgJ3N0YXR1cyB0ZWdvJywgJ2N6eSB0byBkemlhxYJhJ10sCiAgICBtYXA6IHsgc2VydmljZTogJ3NlcnZpY2Vfc3RhdHVzJyB9IH0sCiAgc2l6ZTogeyBlbjogWydob3cgYmlnIGlzIGl0JywgJ3NpemUgb2YgdGhhdCcsICJ3aGF0J3MgaXRzIHNpemUiXSwgcGw6IFsnaWxlIHRvIHpham11amUnLCAnamFraSBtYSByb3ptaWFyJywgJ2lsZSB3YcW8eSB0ZW4gZm9sZGVyJ10sCiAgICBtYXA6IHsgZGlyOiAnZGlyX3NpemUnLCBmaWxlOiAnZmlsZV9zdGF0JyB9IH0sCiAgc2hvdzogeyBlbjogWydzaG93IGl0JywgJ29wZW4gaXQnLCAncHJpbnQgaXQnLCAnY2F0IHRoYXQgZmlsZScsICdkaXNwbGF5IHRoYXQnXSwgcGw6IFsncG9rYcW8IGdvJywgJ3Bva2HFvCB0bycsICd3ecWbd2lldGwgdGVuIHBsaWsnLCAnb3R3w7NyeiB0bycsICd3eXBpc3ogdG8nXSwKICAgIG1hcDogeyBmaWxlOiAnY2F0X2ZpbGUnLCBkaXI6ICdsaXN0X2ZpbGVzJyB9IH0sCiAgcGluZzogeyBlbjogWydwaW5nIGl0JywgJ3BpbmcgdGhhdCBob3N0J10sIHBsOiBbJ3BpbmduaWogZ28nLCAnc3Bpbmd1aiB0ZW4gc2Vyd2VyJ10sIG1hcDogeyBob3N0OiAncGluZ19ob3N0JyB9IH0sCiAgY29ubmVjdDogeyBlbjogWydzc2ggaW50byBpdCcsICdjb25uZWN0IHRvIGl0J10sIHBsOiBbJ3BvxYLEhWN6IHNpxJkgeiBuaW0nLCAnemFsb2d1aiBzacSZIG5hIG5pZWdvJ10sIG1hcDogeyBob3N0OiAnc3NoX2Nvbm5lY3QnIH0gfSwKfTsKCi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQpmdW5jdGlvbiBtYWluKCkgewogIGNvbnN0IG91dERpciA9IGpvaW4oUk9PVCwgJ2J1aWxkJyk7CiAgbWtkaXJTeW5jKG91dERpciwgeyByZWN1cnNpdmU6IHRydWUgfSk7CiAgY29uc3QgaWRzID0gbmV3IFNldChJTlRFTlRTLm1hcCgoaSkgPT4gaS5pZCkpOwoKICAvLyBoZWxkLW91dCB0ZXh0cyAobmV2ZXIgdHJhaW5lZCBvbikKICBjb25zdCBoZWxkT3V0ID0gbmV3IFNldChbCiAgICAuLi5yZWFkRGlyKGpvaW4oUk9PVCwgJ2RhdGEnLCAnZXZhbCcpKS5tYXAoKHIpID0+IHIudGV4dCksCiAgICAuLi5yZWFkSnNvbmwoam9pbihST09ULCAnZGF0YScsICdzaGVsbCcsICdldmFsLmpzb25sJykpLm1hcCgocikgPT4gci50ZXh0KSwKICAgIC4uLnJlYWRKc29ubChqb2luKFJPT1QsICdkYXRhJywgJ2hpc3RvcnknLCAnZXZhbC5qc29ubCcpKS5tYXAoKHIpID0+IHIucXVlcnkpLAogICAgLi4ucmVhZEpzb25sKGpvaW4oUk9PVCwgJ2RhdGEnLCAnY29tcG9zZScsICdldmFsLmpzb25sJykpLm1hcCgocikgPT4gci50ZXh0KSwKICAgIC4uLnJlYWRKc29ubChqb2luKFJPT1QsICdkYXRhJywgJ3Nsb3RzJywgJ2dvbGQuanNvbmwnKSkubWFwKChyKSA9PiByLnRleHQpLAogICAgLi4ucmVhZEpzb25sKGpvaW4oUk9PVCwgJ2RhdGEnLCAnb29kX2V2YWwuanNvbmwnKSkubWFwKChyKSA9PiByLnRleHQpLAogIF0ubWFwKG5vcm1hbGl6ZSkpOwoKICBjb25zdCBpbnRlbnRSb3dzID0gWy4uLnJlYWREaXIoam9pbihST09ULCAnZGF0YScsICdpbnRlbnRzJykpLCAuLi5yZWFkSnNvbmwoam9pbihST09ULCAnZGF0YScsICd0cmFpbi5qc29ubCcpKV0KICAgIC5tYXAoKHIpID0+ICh7IC4uLnIsIHNyYzogJ2ludGVudHMnIH0pKTsKICBjb25zdCBzaGVsbFJvd3MgPSByZWFkSnNvbmwoam9pbihST09ULCAnZGF0YScsICdzaGVsbCcsICd0cmFpbi5qc29ubCcpKS5tYXAoKHIpID0+ICh7IC4uLnIsIHNyYzogJ3NoZWxsJyB9KSk7CiAgZm9yIChjb25zdCByIG9mIFsuLi5pbnRlbnRSb3dzLCAuLi5zaGVsbFJvd3NdKSBpZiAoIWlkcy5oYXMoci5pbnRlbnQpKSB0aHJvdyBuZXcgRXJyb3IoYHVua25vd24gaW50ZW50ICR7ci5pbnRlbnR9OiAke3IudGV4dH1gKTsKCiAgLy8gdGVhY2hlciByZXZpZXcgZGVjaXNpb25zIChkYXRhL3RlYWNoZXIvZGVjaXNpb25zLmpzb25sKTogZHJvcCBvciByZWxhYmVsIGluZGl2aWR1YWwgdHJhaW5pbmcgcm93cwogIGNvbnN0IGRlY2lzaW9ucyA9IHJlYWRKc29ubChqb2luKFJPT1QsICdkYXRhJywgJ3RlYWNoZXInLCAnZGVjaXNpb25zLmpzb25sJykpLmZpbHRlcigoZCkgPT4gZC50ZXh0ICYmIGQuZmllbGQgIT09ICdyaXNrJyk7CiAgY29uc3QgZGVjaWRlID0gbmV3IE1hcChkZWNpc2lvbnMubWFwKChkKSA9PiBbbm9ybWFsaXplKGQudGV4dCksIGRdKSk7CiAgbGV0IGRyb3BwZWQgPSAwOwogIGxldCB0ZWFjaGVyRHJvcHBlZCA9IDA7CiAgY29uc3Qgc2VlbiA9IG5ldyBTZXQoKTsKICBjb25zdCBiYXNlID0gW107CiAgZm9yIChjb25zdCByMCBvZiBbLi4uaW50ZW50Um93cywgLi4uc2hlbGxSb3dzXSkgewogICAgY29uc3QgbiA9IG5vcm1hbGl6ZShyMC50ZXh0KTsKICAgIGlmIChoZWxkT3V0LmhhcyhuKSkgeyBkcm9wcGVkKys7IGNvbnRpbnVlOyB9CiAgICBjb25zdCBkID0gZGVjaWRlLmdldChuKTsKICAgIGlmIChkPy5hY3Rpb24gPT09ICdkcm9wJykgeyB0ZWFjaGVyRHJvcHBlZCsrOyBjb250aW51ZTsgfQogICAgY29uc3QgciA9IGQ/LmFjdGlvbiA9PT0gJ3JlbGFiZWwnICYmIGQuaW50ZW50ID8geyAuLi5yMCwgaW50ZW50OiBkLmludGVudCB9IDogcjA7CiAgICBjb25zdCBrZXkgPSBuICsgJ3wnICsgci5pbnRlbnQgKyAnfCcgKyAoci5zaGVsbCB8fCAnJyk7CiAgICBpZiAoc2Vlbi5oYXMoa2V5KSkgY29udGludWU7CiAgICBzZWVuLmFkZChrZXkpOwogICAgYmFzZS5wdXNoKHIpOwogIH0KCiAgY29uc3QgY2xzID0gY3JlYXRlV3JpdGVTdHJlYW0oam9pbihvdXREaXIsICdjbHMuanNvbmwnKSk7CiAgY29uc3QgdGFnID0gY3JlYXRlV3JpdGVTdHJlYW0oam9pbihvdXREaXIsICd0YWcuanNvbmwnKSk7CiAgY29uc3QgY291bnRzID0geyBjbHM6IDAsIHRhZzogMCwgYnlTcmM6IHt9IH07CiAgbGV0IGdpZCA9IDA7CiAgY29uc3QgZW1pdCA9ICh0ZXh0LCBmYW1pbHksIGludGVudCwgZXh0cmFzLCB3LCBnLCBsYW5nLCBncm91cCkgPT4gewogICAgZ2xvYmFsVGhpcy5hdWRpdC5wdXNoKHt0ZXh0LGZhbWlseSxpbnRlbnQsZXh0cmFzLGcsZ3JvdXB9KTsgY29uc3QgZiA9IFsuLi52ZWN0b3JpemUodGV4dCwgRElNLCBleHRyYXMpLmVudHJpZXMoKV0uc29ydCgoYSwgYikgPT4gYVswXSAtIGJbMF0pLm1hcCgoW2ssIHZdKSA9PiBbaywgK3YudG9GaXhlZCg2KV0pOwogICAgY2xzLndyaXRlKEpTT04uc3RyaW5naWZ5KHsgeTogZmFtaWx5LCBpOiBpbnRlbnQgfHwgJycsIGYsIHcsIGcsIGxhbmc6IGxhbmcgfHwgJycsIGdpZDogZ3JvdXAgfSkgKyAnXG4nKTsKICAgIGNvdW50cy5jbHMrKzsKICAgIGNvdW50cy5ieVNyY1tnXSA9IChjb3VudHMuYnlTcmNbZ10gfHwgMCkgKyAxOwogIH07CiAgY29uc3QgZW1pdFRhZyA9ICh0ZXh0LCBzcGFucywgdG9vbCwgZ3JvdXApID0+IHsKICAgIGNvbnN0IHRva3MgPSB0YWdUb2tlbnModGV4dCk7CiAgICBpZiAoIXRva3MubGVuZ3RoKSByZXR1cm47CiAgICBjb25zdCB5ID0gYmlvTGFiZWxzKHRva3MsIHNwYW5zKTsKICAgIHRhZy53cml0ZShKU09OLnN0cmluZ2lmeSh7IHRvb2wsIGY6IHRhZ0ZlYXR1cmVzKHRva3MsIHRvb2wsIFRBR19ESU0pLCB5LCBnaWQ6IGdyb3VwIH0pICsgJ1xuJyk7CiAgICBjb3VudHMudGFnKys7CiAgfTsKCiAgLy8gMS4gaW50ZW50IHBhcmFwaHJhc2VzICgrIHR5cG8gY29weSwgKyByZWxleGljYWxpc2VkIGNvcHkpLCByYW5kb20gZW52LCBzb21lIGN0eCBub2lzZQogIGZvciAoY29uc3QgciBvZiBiYXNlKSB7CiAgICBjb25zdCBnID0gZ2lkKys7CiAgICBjb25zdCBmYW0gPSBGQU1JTFlfT0Zbci5pbnRlbnRdOwogICAgY29uc3QgZW52ID0gKCkgPT4gKHIuc2hlbGwgPyBbYHNoZWxsPSR7ci5zaGVsbH1gLCBgb3M9JHtyLm9zIHx8ICdsaW51eCd9YF0gOiBzYW1wbGVFbnYoKSk7CiAgICBjb25zdCBjdHggPSAoKSA9PiAocm5nKCkgPCAwLjI1ID8gcmFuZG9tQ3R4KCkgOiBbXSk7CiAgICBlbWl0KHIudGV4dCwgZmFtLCByLmludGVudCwgWy4uLmVudigpLCAuLi5jdHgoKV0sIDEsIHIuc3JjLCByLmxhbmcsIGcpOwogICAgZW1pdCh0eXBvKHIudGV4dCksIGZhbSwgci5pbnRlbnQsIFsuLi5lbnYoKSwgLi4uY3R4KCldLCAxLCByLnNyYywgci5sYW5nLCBnKTsKICAgIGNvbnN0IHsgc3BhbnMgfSA9IHNpbHZlclNwYW5zKHIudGV4dCwgci5pbnRlbnQpOwogICAgZW1pdFRhZyhyLnRleHQsIHNwYW5zLCBmYW0sIGcpOwogICAgZm9yIChsZXQgayA9IDA7IGsgPCAyOyBrKyspIHsKICAgICAgY29uc3QgcnggPSByZWxleChyLnRleHQsIHNwYW5zLCB7IGxhbmc6IHIubGFuZywgcm5nLCBzcGxpdDogJ3RyYWluJyB9KTsKICAgICAgZW1pdFRhZyhyeC50ZXh0LCByeC5zcGFucywgZmFtLCBnKTsKICAgICAgaWYgKGsgPT09IDAgJiYgcngudGV4dCAhPT0gci50ZXh0KSBlbWl0KHJ4LnRleHQsIGZhbSwgci5pbnRlbnQsIFsuLi5lbnYoKSwgLi4uY3R4KCldLCAwLjUsIHIuc3JjLCByLmxhbmcsIGcpOwogICAgfQogIH0KCiAgLy8gMi4gaGlzdG9yeSBhbmFwaG9yYTogcHJvbm91biByZXF1ZXN0cyB3aG9zZSBpbnRlbnQgZGVwZW5kcyBvbiBjdHhfIGZlYXR1cmVzCiAgbGV0IG5BbmEgPSAwOwogIGZvciAoY29uc3QgWywgdl0gb2YgT2JqZWN0LmVudHJpZXMoQU5BUEhPUkEpKSB7CiAgICBmb3IgKGNvbnN0IFtlbnQsIGludGVudF0gb2YgT2JqZWN0LmVudHJpZXModi5tYXApKSB7CiAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ2VuJywgJ3BsJ10pIHsKICAgICAgICBmb3IgKGNvbnN0IHRleHQgb2YgdltsYW5nXSkgewogICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCAzOyBrKyspIHsKICAgICAgICAgICAgY29uc3QgZyA9IGdpZCsrOwogICAgICAgICAgICBlbWl0KHRleHQsIEZBTUlMWV9PRltpbnRlbnRdLCBpbnRlbnQsIFsuLi5zYW1wbGVFbnYoKSwgLi4ucmFuZG9tQ3R4KGVudCldLCAxLCAnY3R4JywgbGFuZywgZyk7CiAgICAgICAgICAgIGlmIChrID09PSAwKSBlbWl0VGFnKHRleHQsIFtdLCBGQU1JTFlfT0ZbaW50ZW50XSwgZyk7CiAgICAgICAgICAgIG5BbmErKzsKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgIH0KICAgIH0KICB9CgogIC8vIDMuIHRsZHIgZGVzY3JpcHRpb25zIChDQy1CWS00LjApOiBzdGFnZS0xIHRvb2wgbGFiZWxzIG9ubHksIGNhcHBlZCBwZXIgZmFtaWx5L2xhbmcKICBjb25zdCB0bGRyID0gcmVhZEpzb25sKGpvaW4oUk9PVCwgJ2RhdGEnLCAndGxkcicsICd0b29scy5qc29ubCcpKTsKICBjb25zdCBjYXAgPSB7fTsKICBsZXQgblQgPSAwOwogIGZvciAoY29uc3QgciBvZiB0bGRyLnNvcnQoKCkgPT4gcm5nKCkgLSAwLjUpKSB7CiAgICBpZiAoIUZBTUlMSUVTW3IudG9vbF0gfHwgIXIudGV4dCB8fCByLnRleHQubGVuZ3RoIDwgOCkgY29udGludWU7CiAgICBpZiAoaGVsZE91dC5oYXMobm9ybWFsaXplKHIudGV4dCkpKSBjb250aW51ZTsKICAgIGNvbnN0IGtleSA9IHIudG9vbCArIHIubGFuZzsKICAgIGlmICgoY2FwW2tleV0gPSAoY2FwW2tleV0gfHwgMCkgKyAxKSA+IChyLmxhbmcgPT09ICdwbCcgPyA2MCA6IDgwKSkgY29udGludWU7CiAgICBjb25zdCB3aW4gPSAvXndpbmRvd3NcLy8udGVzdChyLnBhZ2UgfHwgJycpOwogICAgZW1pdChyLnRleHQsIHIudG9vbCwgJycsIHdpbiA/IFsnc2hlbGw9cG93ZXJzaGVsbCcsICdvcz13aW4zMiddIDogc2FtcGxlRW52KCksIDAuNSwgJ3RsZHInLCByLmxhbmcsIGdpZCsrKTsKICAgIG5UKys7CiAgfQoKICAvLyA0LiBvdXQtb2YtZG9tYWluIC0+IF9fbm9uZV9fCiAgY29uc3Qgb29kID0gcmVhZEpzb25sKGpvaW4oUk9PVCwgJ2RhdGEnLCAnb29kLmpzb25sJykpOwogIGZvciAoY29uc3QgciBvZiBvb2QpIHsKICAgIGlmIChoZWxkT3V0Lmhhcyhub3JtYWxpemUoci50ZXh0KSkpIGNvbnRpbnVlOwogICAgY29uc3QgZyA9IGdpZCsrOwogICAgZW1pdChyLnRleHQsIE5PTkUsICcnLCBzYW1wbGVFbnYoKSwgMSwgJ29vZCcsIHIubGFuZywgZyk7CiAgICBlbWl0KHR5cG8oci50ZXh0KSwgTk9ORSwgJycsIFsuLi5zYW1wbGVFbnYoKSwgLi4uKHJuZygpIDwgMC4yNSA/IHJhbmRvbUN0eCgpIDogW10pXSwgMSwgJ29vZCcsIHIubGFuZywgZyk7CiAgfQoKICBjbHMuZW5kKCk7CiAgdGFnLmVuZCgpOwogIGNvbnN0IHRhZ0xhYmVscyA9IFsnTycsIC4uLlRBR19UWVBFUy5mbGF0TWFwKCh0KSA9PiBbYEItJHt0fWAsIGBJLSR7dH1gXSldOwogIGNvbnN0IG1ldGEgPSB7CiAgICBkaW06IERJTSwgdGFnRGltOiBUQUdfRElNLCBzZWVkOiBTRUVELAogICAgZmFtaWxpZXM6IFsuLi5PYmplY3Qua2V5cyhGQU1JTElFUyksIE5PTkVdLAogICAgaW50ZW50c0J5RmFtaWx5OiBGQU1JTElFUywKICAgIHRhZ0xhYmVscywKICAgIGNvdW50czogeyAuLi5jb3VudHMsIGJhc2U6IGJhc2UubGVuZ3RoLCBkcm9wcGVkSGVsZE91dDogZHJvcHBlZCwgdGVhY2hlckRyb3BwZWQsIGFuYXBob3JhOiBuQW5hLCB0bGRyOiBuVCwgb29kOiBvb2QubGVuZ3RoIH0sCiAgfTsKICB3cml0ZUZpbGVTeW5jKGpvaW4ob3V0RGlyLCAnbWV0YS5qc29uJyksIEpTT04uc3RyaW5naWZ5KG1ldGEsIG51bGwsIDEpKTsKICBjb25zb2xlLmxvZyhgZ2VuX2RhdGE6ICR7YmFzZS5sZW5ndGh9IGJhc2Ugc2VudGVuY2VzICgke2Ryb3BwZWR9IGRyb3BwZWQ6IGNvbGxpZGUgd2l0aCBoZWxkLW91dCBzZXRzKSwgYCArCiAgICBgJHtjb3VudHMuY2xzfSBjbGFzc2lmaWVyIHJvd3MgJHtKU09OLnN0cmluZ2lmeShjb3VudHMuYnlTcmMpfSwgJHtjb3VudHMudGFnfSB0YWdnZXIgc2VxdWVuY2VzLCAke25UfSB0bGRyIHJvd3MsICR7bkFuYX0gYW5hcGhvcmEgcm93c2ApOwp9CgptYWluKCk7Cg==:2
#!/usr/bin/env node
^

SyntaxError: Invalid or unexpected token
    at compileSourceTextModule (node:internal/modules/esm/utils:340:16)
    at ModuleLoader.moduleStrategy (node:internal/modules/esm/translators:146:18)
    at #translate (node:internal/modules/esm/loader:431:12)
    at ModuleLoader.loadAndTranslate (node:internal/modules/esm/loader:478:27)
    at async ModuleJob._link (node:internal/modules/esm/module_job:110:19)

Node.js v20.19.2

 exited 1 in 2873ms:
X..XXX.X

Failed tests:

✖ /workspace/tellsh/test/cli.test.js (1993.701983ms)
  'test failed'
✖ /workspace/tellsh/test/pipeline.test.js (316.72523ms)
  'test failed'
✖ /workspace/tellsh/test/regressions.test.js (738.841689ms)
  'test failed'
✖ /workspace/tellsh/test/shells.test.js (2852.287623ms)
  'test failed'
✖ /workspace/tellsh/test/templates.test.js (181.22952ms)
  'test failed'

exec
/bin/bash -lc "node --input-type=module <<'JS'
import fs from 'node:fs';
import {normalize} from './src/features.js';
import {POOLS} from './scripts/lib/silver.js';
const read=p=>fs.readFileSync(p,'utf8').split('\\n').filter(Boolean).map(JSON.parse);
const ev=[...fs.readdirSync('data/eval').flatMap(f=>read('data/eval/'+f)),...read('data/shell/eval.jsonl'),...read('data/history/eval.jsonl').map(r=>({...r,text:r.query})),...read('data/compose/eval.jsonl'),...read('data/slots/gold.jsonl'),...read('data/ood_eval.jsonl')];
const evMap=new Map(ev.map(r=>[normalize(r.text),r]));
globalThis.audit=[];
let source=fs.readFileSync('scripts/gen_data.js','utf8').replace(/"'^#![''^'"\\n]*\\n/,'').replace(/from '\\.\\.\\/src\\//g,\"from 'file:///workspace/tellsh/src/\").replace(/from '\\.\\/lib\\//g,\"from 'file:///workspace/tellsh/scripts/lib/\");
source=source.replace(\"const ROOT = fileURLToPath(new URL('..', import.meta.url));\",\"const ROOT = '/workspace/tellsh';\");
source=source.replace('readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync, createWriteStream','readFileSync, readdirSync, existsSync');
source='const mkdirSync=()=>{}; const writeFileSync=()=>{}; const createWriteStream=()=>({write(){},end(){}});\\n'+source;
source=source.replace('const f = [...vectorize(text, DIM, extras).entries()]','globalThis.audit.push({text,intent,g,group}); const f = [...vectorize(text, DIM, extras).entries()]');
try {await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));}catch(e){console.log(e.message);process.exit(1);}
const hits=globalThis.audit.filter(r=>evMap.has(normalize(r.text)));
console.log('generated classifier collisions',hits.length,'distinct eval texts',new Set(hits.map(r=>normalize(r.text))).size,'by source',Object.fromEntries([...new Set(hits.map(r=>r.g))].map(g=>[g,hits.filter(r=>r.g===g).length])));
console.log('collision examples',JSON.stringify(hits.filter(r=>r.g"'!=='"'ctx').slice(0,8))); console.log('ctx examples',JSON.stringify(hits.filter(r=>r.g==='ctx').slice(0,4)));
const train=globalThis.audit.filter(r=>r.g==='intents'||r.g==='shell');
const held=Object.entries(POOLS).flatMap(([k,vs])=>vs.filter((_,i)=>i%4===3).map(v=>[k,String(v)]));
const leaked=held.filter(([k,v])=>train.some(r=>r.text.includes(v)));
console.log('eval pool values present in emitted classifier text',leaked.length,'/',held.length,JSON.stringify(leaked.slice(0,35)));
JS" in /workspace/tellsh
 succeeded in 3110ms:
gen_data: 9326 base sentences (540 dropped: collide with held-out sets), 25562 classifier rows {"intents":20482,"shell":2199,"ctx":762,"tldr":1701,"ood":418}, 28232 tagger sequences, 1701 tldr rows, 762 anaphora rows
generated classifier collisions 162 distinct eval texts 37 by source { intents: 20, shell: 4, ctx: 138 }
collision examples [{"text":"find all .log files","intent":"find_by_ext","g":"intents","group":309},{"text":"rozpakuj zdjecia.zip","intent":"extract_zip","g":"intents","group":2089},{"text":"rozpakuj zdjecia.zip","intent":"extract_zip","g":"intents","group":2100},{"text":"rozpakuj zdjecia.zip","intent":"extract_zip","g":"intents","group":2117},{"text":"usuń wszystkie pliki *.log","intent":"delete_by_ext","g":"intents","group":2633},{"text":"which node","intent":"which_cmd","g":"intents","group":4696},{"text":"restart nginx","intent":"service_restart","g":"intents","group":5319},{"text":"stop redis","intent":"service_stop","g":"intents","group":5375}]
ctx examples [{"text":"kill it","intent":"kill_by_pid","g":"ctx","group":9326},{"text":"kill it","intent":"kill_by_pid","g":"ctx","group":9327},{"text":"kill it","intent":"kill_by_pid","g":"ctx","group":9328},{"text":"zabij go","intent":"kill_by_pid","g":"ctx","group":9350}]
eval pool values present in emitted classifier text 66 / 85 [["dir","./src"],["dir","/srv/www"],["dir","~/Pobrane"],["dir","/var/lib/docker"],["dir","/etc"],["dir","vendor"],["file","/etc/hosts"],["file","~/.bashrc"],["file","Dockerfile"],["file","src/app.ts"],["file",".env"],["file","/var/log/nginx/access.log"],["tar","site.tar.gz"],["tar","kopia.tar.gz"],["zip","export.zip"],["proc","myapp"],["proc","python3"],["proc","backend"],["proc","celery"],["proc","mongod"],["service","postgresql"],["service","apache2"],["service","bluetooth"],["service","prometheus"],["service","ufw"],["container","worker"],["container","grafana"],["container","app"],["pkg","ripgrep"],["pkg","ncdu"],["pkg","fzf"],["cmd","docker"],["cmd","pip"],["cmd","go"],["cmd","terraform"]]

exec
/bin/bash -lc "node --test --test-reporter=spec --test-name-pattern='"'^(?!.*(?:loadHistory reads|--history=FILE|reported injection payloads|pwsh parse check passes|--yes only runs safe commands straight)).*$'"' test/*.test.js" in /workspace/tellsh
 exited 1 in 2960ms:
✖ /workspace/tellsh/test/cli.test.js (1999.312191ms)
  'test failed'

✔ /workspace/tellsh/test/danger.test.js (218.279876ms)
✔ /workspace/tellsh/test/parity.test.js (233.991677ms)
✖ /workspace/tellsh/test/pipeline.test.js (324.004252ms)
  'test failed'

✖ /workspace/tellsh/test/regressions.test.js (763.92195ms)
  'test failed'

✖ /workspace/tellsh/test/shells.test.js (2946.855949ms)
  'test failed'

✔ /workspace/tellsh/test/slots.test.js (255.172145ms)
✖ /workspace/tellsh/test/templates.test.js (200.558559ms)
  'test failed'

ℹ tests 8
ℹ suites 0
ℹ pass 3
ℹ fail 5
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 2966.600101

✖ failing tests:

test at test/cli.test.js:1:1
✖ /workspace/tellsh/test/cli.test.js (1999.312191ms)
  'test failed'

test at test/pipeline.test.js:1:1
✖ /workspace/tellsh/test/pipeline.test.js (324.004252ms)
  'test failed'

test at test/regressions.test.js:1:1
✖ /workspace/tellsh/test/regressions.test.js (763.92195ms)
  'test failed'

test at test/shells.test.js:1:1
✖ /workspace/tellsh/test/shells.test.js (2946.855949ms)
  'test failed'

test at test/templates.test.js:1:1
✖ /workspace/tellsh/test/templates.test.js (200.558559ms)
  'test failed'

exec
/bin/bash -lc "sed -n '150,240p' src/danger.js; sed -n '1,85p' scripts/eval.js; cat DATA_LICENSES.md; cat data/teacher/decisions.jsonl" in /workspace/tellsh
 succeeded in 0ms:
  [/\bchmod\s+(?:-\S+\s+)*0?777\b/, 'medium', 'chmod 777 makes files world-writable'],
  [/:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;\s*:/, 'high', 'fork bomb', true],
  [/\b(?:curl|wget|fetch)\b[^|;]*\|\s*(?:sudo\s+)?(?:\S*\/)?(?:ba|z|da|k|fi)?sh\b/, 'high', 'pipes a download straight into a shell'],
  [/(?:\b(?:ba|z|da|k|fi)?sh\b|\bsource\b|\beval\b|(?:^|[;&|(]\s*)\.)\s[^|;&]*(?:<\(|\$\(|`)\s*(?:sudo\s+)?(?:curl|wget|fetch)\b/, 'high', 'runs a downloaded script'],
  [/\bsudo\b|\bdoas\b/, 'medium', 'runs with root privileges'],
  [/\bfind\b.*\s-delete\b|\bfind\b.*-exec(?:dir)?\s+(?:\S*\/)?rm\b|\bxargs\s+(?:-\S+\s+)*(?:\S*\/)?rm\b/, 'high', 'bulk deletion via find/xargs'],
  [/\bgit\s+push\b[^;&|]*\s(?:--force(?:-with-lease|-if-includes)?\b|-[a-zA-Z]*f\b|\+[^\s:]*(?::\S*)?|--mirror\b)/, 'high', 'force-push rewrites remote history'],
  [/\bgit\s+push\b[^;&|]*\s(?:--delete\b|-d\b|:\S)/, 'high', 'deletes a remote branch'],
  [/\bgit\s+reset\b[^;&|]*\s--(?:hard|merge|keep)\b|\bgit\s+clean\b[^;&|]*\s(?:-[a-zA-Z]*f|--force\b)|\bgit\s+restore\b|\bgit\s+checkout\b[^;&|]*\s(?:--\s|-f\b|--force\b|\.(?:\s|$))|\bgit\s+switch\b[^;&|]*\s(?:-f\b|--force\b|--discard-changes\b)/, 'high', 'discards uncommitted work'],
  [/\bgit\s+branch\b[^;&|]*\s(?:-D\b|-[a-zA-Z]*d[a-zA-Z]*f|--delete\s+--force|--force\s+--delete)/, 'high', 'force-deletes a branch'],
  [/\bgit\s+stash\s+(?:drop|clear)\b/, 'high', 'deletes stashed changes'],
  [/\bdocker\s+(?:system|volume|image|container|network|builder)\s+prune\b|\bdocker\s+(?:rmi?|container\s+rm|image\s+rm|volume\s+rm)\b/, 'high', 'deletes docker data'],
  [/\b(?:shutdown|reboot|halt|poweroff)\b|\binit\s+[06]\b/, 'high', 'shuts down / reboots the machine'],
  [/\b(?:pkill|killall)\b|\bdocker\s+kill\b/, 'high', 'terminates processes'],
  [/\b(?:shred|truncate)\b/, 'high', 'destroys file contents'],
  [/\biptables\s+-F\b|\bufw\s+disable\b/, 'high', 'drops firewall rules'],
  [/\bmv\s+\S+\s+\/dev\/null\b/, 'high', 'moves a file into /dev/null (deletes it)', true],
  // redirections: N>, N>>, &>, >|, >> onto system files; any other file write is medium
  [/(?:\d*|&)>>?\|?\s*['"]?\/(?:etc|boot|usr|bin|sbin|lib\w*)\//, 'high', 'overwrites a system file'],
  [/(?:^|[^<>=-])(?:\d+|&)?>>?\|?(?!&|>)\s*(?!['"]?\/dev\/(?:null|stdout|stderr)\b)['"]?[^\s&|;)]/, 'medium', 'redirect writes to a file'],
  [/\btee\b/, 'medium', 'tee writes to a file'],
  [/\bsed\s+(?:-\S+\s+)*(?:-i|--in-place)\b/, 'medium', 'edits files in place'],
  [/\bcrontab\s+-r\b/, 'high', 'removes all cron jobs', true],
  // PowerShell
  [/\bRemove-Item\b|\bClear-Content\b/i, 'high', 'deletes files permanently'],
  [/\bStop-Process\b|\bspps\b|\btaskkill\b/i, 'high', 'terminates processes'],
  [/\bFormat-Volume\b|\bClear-Disk\b|\bInitialize-Disk\b|(?:^|[;&|(]\s*)format\s+[a-z]:/i, 'high', 'formats a disk', true],
  [/\b(?:Stop|Restart)-Computer\b|\bshutdown(?:\.exe)?\s+\/[srp]\b/i, 'high', 'shuts down / reboots the machine'],
  [/\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|curl|wget)\b[^|;]*\|\s*(?:iex|Invoke-Expression)\b/i, 'high', 'pipes a download straight into PowerShell'],
  [/\b(?:iex|Invoke-Expression)\b[^|;]*\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|curl|wget|DownloadString|DownloadData|Net\.WebClient)\b|\[scriptblock\]::Create\([^;]*\b(?:iwr|irm|Invoke-WebRequest|Invoke-RestMethod|DownloadString)\b/i, 'high', 'runs a downloaded script'],
  [/\bSet-ExecutionPolicy\b|\bStart-Process\b.*-Verb\s+RunAs/i, 'medium', 'changes security policy / elevates'],
  [/\b(?:Stop|Restart|Start|Set)-Service\b/i, 'medium', 'changes a service'],
  [/\b(?:Set-Content|Out-File|Add-Content|Rename-Item|Move-Item|Copy-Item|New-Item|Set-Acl|Compress-Archive|Expand-Archive)\b/i, 'medium', 'modifies files'],
  [/\bdocker\s+stop\b/, 'medium', 'stops containers'],
];

// `git -C dir -c k=v --no-pager reset` -> `git reset`; `docker --context x -H h rm` -> `docker rm`
const OPTVAL = String.raw`(?:'[^']*'|"[^"]*"|[^\s;&|'"])+`;
const GIT_GLOBALS = new RegExp(String.raw`\bgit((?:\s+(?:(?:-C|-c|--git-dir|--work-tree|--namespace|--super-prefix|--config-env|--exec-path)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
const DOCKER_GLOBALS = new RegExp(String.raw`\bdocker((?:\s+(?:(?:-H|--host|-c|--context|--config|-l|--log-level|--tls\w*)\s+${OPTVAL}|-(?!-\s)${OPTVAL}))+)(?=\s+[a-z])`, 'g');
export function normalizeGlobals(command) {
  return String(command).replace(GIT_GLOBALS, 'git').replace(DOCKER_GLOBALS, 'docker');
}

/** @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}} */
export function checkDanger(command, baseRisk = 'safe') {
  let risk = baseRisk;
  const warnings = [];
  let critical = false;
  const hit = (r, msg, crit) => {
    risk = maxRisk(risk, r);
    if (!warnings.includes(msg)) warnings.push(msg);
    if (crit) critical = true;
  };
  const text = normalizeGlobals(command);
  const inner = [];
  // structural checks run on both readings of backslashes (POSIX escapes / Windows path separators)
  for (const words of [...simpleCommands(text), ...simpleCommands(text, { winPaths: true })]) {
    const w = commandWords(words);
    if (!w.length) continue;
    const head = w[0].replace(/^.*[\\/]/, '');
    const lower = head.toLowerCase().replace(/\.exe$/, '');
    // a lone string with spaces is a command handed to another program ('…' | bash)
    if (w.length === 1 && /\s/.test(w[0])) inner.push(w[0]);
    // shells / eval run their argument as a command: check it too
    if (/^(?:ba|z|da|k|fi|c)?sh$|^(?:pwsh|powershell|cmd)$/.test(lower)) {
      const i = w.findIndex((x, k) => k > 0 && /^(?:-c|-Command|-Co\w*|\/c|\/k)$/i.test(x));
      if (i > 0 && w[i + 1] != null) inner.push(w.slice(i + 1).join(' '));
    } else if (lower === 'eval' || lower === 'iex' || lower === 'invoke-expression') inner.push(w.slice(1).join(' '));
    if (head === 'rm' || head === 'unlink') rmCheck(w, hit);
    else if (head === 'kill') killCheck(w, hit);
    else if (/^(?:rd|rmdir|del|erase)$/i.test(head)) {
      const a = w.slice(1);
      if (!a.some((x) => /^\/[a-z]$/i.test(x)) && a.some((x) => /^-\w/.test(x))) removeItemCheck(w, hit);
      else cmdDelCheck(w, hit);
    } else if (PS_REMOVE.test(lower)) removeItemCheck(w, hit);
    if (head === 'git' && w[1] === 'rm') hit('high', 'rm deletes files permanently (no trash)');
  }
  for (const c of inner) {
    if (c === command) continue;
    const d = checkDanger(c);
    for (const m of d.warnings) hit(d.risk, m, d.critical);
  }
  for (const [re, r, msg, crit] of RULES) if (re.test(text)) hit(r, msg, crit);
  return { risk, warnings, critical };
}
#!/usr/bin/env node
// Evaluation of the v0.2 cascade. Writes the eval section of EVAL.md.
//   1. per-stage accuracy on data/eval (held-out, never trained on): tool top-1/top-3, intent top-1/top-3,
//      answered / precision, per language
//   2. per shell: intent accuracy on data/eval under each shell context + data/shell/eval.jsonl
//      (shell-specific phrasing), render coverage and syntax validity (bash -n / sh -n)
//   3. slot F1 on data/slots/gold.jsonl (hand-annotated) for tagger / regex / merged, per type
//   4. end-to-end exact command: test/slot-cases.js (hand-written) and a relexicalised copy of data/eval
//      (values from held-out pools, gold command rendered from the inserted values)
//   5. history reference cases (data/history/eval.jsonl)
//   6. second pass / composer on out-of-catalogue requests (data/compose/eval.jsonl)
//   7. OOD rejection (data/ood_eval.jsonl)
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { getModel } from '../src/model.js';
import { cascade } from '../src/cascade.js';
import { suggest, resolveWithTagger } from '../src/pipeline.js';
import { buildCommand, resolveSlots, finalizeSlots } from '../src/fill.js';
import { exFromSpans, normPath, normExt, normNum } from '../src/tagger.js';
import { extractSlots } from '../src/slots.js';
import { BY_ID } from '../src/catalog.js';
import { FAMILY_OF, SLOT_TAG, TAG_TYPES } from '../src/tools.js';
import { envFeatures } from '../src/env.js';
import { SLOT_CASES } from '../test/slot-cases.js';
import { silverSpans, relex, mulberry32 } from './lib/silver.js';
import { sameCmd } from './lib/cmdnorm.js';
import { updateSection } from './report.js';
import { pwshParses } from './lib/pwsh_parse.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const VERBOSE = process.argv.includes('--verbose');
const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const readDir = (d) => readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f)));
const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
const model = getModel();
const thr = model.thresholds.accept;
const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const ENVS = {
  bash: BASH, zsh: { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, sh: { shell: 'sh', os: 'linux', coreutils: 'gnu' },
  powershell: { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, fish: { shell: 'fish', os: 'linux', coreutils: 'gnu' },
  cmd: { shell: 'cmd', os: 'win32', coreutils: 'gnu' },
};
const out = [];
const md = (s = '') => out.push(s);
const t0 = Date.now();

// ------------------------------------------------------------------------------------------
// 1. classification per stage
const evalRows = readDir(join(ROOT, 'data', 'eval'));
function clsStats(rows, env, extraFn = () => []) {
  const S = {};
  const conf = new Map();
  const per = new Map();
  const bump = (k, f) => { S[k] ??= { n: 0, tool1: 0, tool3: 0, top1: 0, top3: 0, ans: 0, ansOk: 0 }; S[k][f]++; };
  for (const r of rows) {
    const c = cascade(r.text, { model, extras: [...envFeatures(r.shell ? { shell: r.shell, os: r.os } : env), ...extraFn(r)] });
    const fam = FAMILY_OF[r.intent];
    const ok = c.intent === r.intent;
    for (const k of ['all', r.lang]) {
      bump(k, 'n');
      if (c.topTool === fam) bump(k, 'tool1');
      if (c.tools.some((t) => t.tool === fam)) bump(k, 'tool3');
      if (ok) bump(k, 'top1');
      if (c.top.slice(0, 3).some((t) => t.intent === r.intent)) bump(k, 'top3');
      if (c.confidence >= thr) { bump(k, 'ans'); if (ok) bump(k, 'ansOk'); }
    }
    const pi = per.get(r.intent) || { n: 0, ok: 0 };
    pi.n++; if (ok) pi.ok++;
    per.set(r.intent, pi);
    if (!ok) { const key = `${r.intent} → ${c.intent}`; conf.set(key, (conf.get(key) || 0) + 1); if (VERBOSE) console.log(`  ✗ [${r.intent} → ${c.intent} ${(c.confidence * 100).toFixed(0)}%] ${r.text}`); }
  }
  return { S, conf, per };
}
const C1 = clsStats(evalRows, BASH);
const row = (k, s) => `| ${k} | ${s.n} | ${pct(s.tool1, s.n)} | ${pct(s.tool3, s.n)} | ${pct(s.top1, s.n)} | ${pct(s.top3, s.n)} | ${pct(s.ans, s.n)} | ${pct(s.ansOk, s.ans)} |`;
const modelSize = statSync(join(ROOT, 'model', 'model.bin')).size;
const intentModels = Object.keys(model.models).filter((k) => k.startsWith('intent:'));
const tm = model.models.tool;
const tg = model.models.tagger;
md('## Model');
md();
md(`\`model/model.bin\` **${(modelSize / 1e6).toFixed(2)} MB** (int8 weights, TSH2): stage 1 tool model ${tm.rowIds.length} rows × ${tm.labels.length} classes ` +
  `(${tm.labels.length - 1} tool families + \`__none__\`), ${intentModels.length} stage-2 intent models ` +
# Data sources and licenses

tellsh's code is MIT (see `LICENSE`). The training data and the shipped model weights derive from the
sources below. **No raw third-party corpus is shipped in the npm package**: the tarball contains only the code,
`model/model.bin` (int8 weights), `model/tldr_triggers.json` (a few stems per flag) and
`model/compose_explained.json` (see `package.json` `files`).

| source | license | used for | in git | in npm tarball |
|---|---|---|---|---|
| tellsh's own paraphrases (`data/intents`, `data/eval`, `data/shell`, `data/history`, `data/compose`, `data/slots`, `data/ood*.jsonl`) | MIT (written for this project) | all training / evaluation | yes | no |
| [tldr-pages](https://github.com/tldr-pages/tldr) commit `f8a47632075aa8a2439081677b549b2b54bf6f05`, `pages/{common,linux,osx,windows}` and `pages.pl/*` | **CC-BY-4.0**, © the tldr-pages team and contributors | stage-1 tool classifier training (example descriptions mapped to tool families, 1.7k rows after capping) and weak composer flag triggers | derived files only: `data/tldr/*.jsonl` (cleaned + mapped, see `data/tldr/README.md`) | no (only `model/tldr_triggers.json`: ≤6 word stems per flag, plus the trained weights) |
| [NL2Bash](https://github.com/TellinaTool/nl2bash) | **GPL-3.0** | **not used** — not for training, not for evaluation, not as inspiration for data, to keep the MIT package free of copyleft obligations | no | no |
| TypeSafe Jev API (teacher) | API terms of service | build-time verification of 300 sampled training labels / risk levels (see `EVAL.md`); no API output is shipped, only the resulting decisions (`data/teacher/decisions.jsonl`, written by hand after inspection) | review + decisions | no |

## Attribution (CC-BY-4.0)

The tool-family classifier in `model/model.bin` and the trigger stems in `model/tldr_triggers.json` were trained /
derived in part from **tldr-pages** (https://github.com/tldr-pages/tldr), © the tldr-pages team and contributors,
licensed under the Creative Commons Attribution 4.0 International License
(https://creativecommons.org/licenses/by/4.0/). Changes: pages were filtered to the commands tellsh supports,
descriptions were cleaned and mapped to tool families, option flags were extracted from the example commands.

## Regenerating the tldr-derived data

```bash
git clone --depth 1 https://github.com/tldr-pages/tldr data/external/tldr   # gitignored, never packed
python3 -I scripts/tldr_ingest.py                                           # -> data/tldr/*.jsonl
```
{"action":"relabel","field":"risk","intent":"extract_zip","from":"safe","to":"medium","reason":"teacher: medium; unzip/tar -x can overwrite existing files"}
{"action":"relabel","field":"risk","intent":"extract_targz","from":"safe","to":"medium","reason":"teacher: medium; tar -x overwrites files silently"}
{"action":"relabel","field":"risk","intent":"compress_targz","from":"safe","to":"medium","reason":"teacher: medium; tar -c overwrites an existing archive"}
{"action":"relabel","field":"risk","intent":"compress_zip","from":"safe","to":"medium","reason":"teacher: medium; writes/updates an archive file"}
{"action":"relabel","field":"risk","intent":"git_stash","from":"safe","to":"medium","reason":"teacher: medium; changes the working tree"}
{"action":"relabel","field":"risk","intent":"git_stash_pop","from":"safe","to":"medium","reason":"teacher: medium; can conflict with local changes"}
{"action":"relabel","field":"risk","intent":"git_pull","from":"safe","to":"medium","reason":"teacher: medium; merges remote changes into the working tree"}
{"action":"relabel","field":"risk","intent":"git_new_branch","from":"safe","to":"medium","reason":"teacher: medium; checkout changes HEAD"}
{"action":"relabel","field":"risk","intent":"git_switch_branch","from":"safe","to":"medium","reason":"teacher: medium; checkout changes the working tree"}
{"action":"relabel","field":"risk","intent":"git_clone","from":"safe","to":"medium","reason":"teacher: medium; network + creates a directory"}
{"action":"keep","field":"risk","intent":"touch_file","reason":"teacher: medium; kept safe: creates an empty file, never overwrites content"}
{"action":"keep","field":"risk","intent":"mkdir","reason":"teacher: medium; kept safe: mkdir -p only creates"}
{"action":"keep","field":"risk","intent":"git_init","reason":"teacher: medium; kept safe: creates .git only, idempotent"}
{"action":"keep","field":"risk","intent":"git_add_all","reason":"teacher: medium; kept safe: index change, undone by git reset"}
{"action":"keep","field":"label","text":"pokaż właściwości pliku C:\\Windows\\notepad.exe (data utworzenia, rozmiar)","reason":"label correct; Windows paths now extracted (slots.js PATH_TOKEN)"}
{"action":"keep","field":"label","text":"copy C:\\Users\\me\\Desktop\\report.docx to D:\\backup","reason":"label correct; Windows paths now extracted"}
{"action":"keep","field":"label","text":"zdekoduj plik token.b64 z base64","reason":"label correct; 'plik X.ext' now selects file mode for base64"}
{"action":"keep","field":"label","text":"zabij procesy javy","reason":"label correct; Polish inflection javy -> java now mapped (slots.js deinflect)"}
{"action":"keep","field":"label","text":"połącz się z moim raspberry pi przez ssh","reason":"label correct; request has no host -> placeholder instead of 'moim'"}
{"action":"keep","field":"label","text":"folder tree of /opt/app with depth one","reason":"teacher rejected NUM 'one' but it is the depth; silver span correct"}

exec
/bin/bash -lc "printenv NODE_TEST_CONTEXT; node --test-name-pattern='"'^(?!.*(?:loadHistory reads|--history=FILE|reported injection payloads|pwsh parse check passes|--yes only runs safe commands straight)).*$'"' test/pipeline.test.js" in /workspace/tellsh
 exited 1 in 356ms:
TAP version 13
# Subtest: stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
ok 1 - stage 1 returns top-3 tools; stage 2 can recover a tool ranked below top-1
  ---
  duration_ms: 13.391525
  ...
# Subtest: PowerShell vocabulary maps to the same tool family
ok 2 - PowerShell vocabulary maps to the same tool family
  ---
  duration_ms: 1.046467
  ...
# Subtest: tagger: tool-conditioned BIO spans, only tags valid for the tool
ok 3 - tagger: tool-conditioned BIO spans, only tags valid for the tool
  ---
  duration_ms: 14.691157
  ...
# Subtest: slot merge: tagger primary, regex fills misses and replaces invalid values
ok 4 - slot merge: tagger primary, regex fills misses and replaces invalid values
  ---
  duration_ms: 7.683803
  ...
# Subtest: end-to-end bash + PowerShell + BSD
ok 5 - end-to-end bash + PowerShell + BSD
  ---
  duration_ms: 54.007324
  ...
# Subtest: history: pronouns, "same for", container/service/pid references (EN + PL)
ok 6 - history: pronouns, "same for", container/service/pid references (EN + PL)
  ---
  duration_ms: 103.451756
  ...
# Subtest: history is optional: without it a pronoun request gets a hint, never a guessed value
ok 7 - history is optional: without it a pronoun request gets a hint, never a guessed value
  ---
  duration_ms: 0.782314
  ...
# Subtest: history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
ok 8 - history parsing: bash timestamps, zsh extended format, fish, PSReadLine continuation
  ---
  duration_ms: 0.586493
  ...
# Subtest: loadHistory reads only the tail of HISTFILE and returns the last n commands
not ok 9 - loadHistory reads only the tail of HISTFILE and returns the last n commands
  ---
  duration_ms: 1.005613
  location: '/workspace/tellsh/test/pipeline.test.js:88:1'
  failureType: 'testCodeFailure'
  error: "EROFS: read-only file system, mkdtemp '/tmp/tellsh-hist-XXXXXX'"
  code: 'EROFS'
  stack: |-
    mkdtempSync (node:fs:3005:18)
    TestContext.<anonymous> (file:///workspace/tellsh/test/pipeline.test.js:89:15)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: context exposes ctx_ classifier features and entity references
ok 10 - context exposes ctx_ classifier features and entity references
  ---
  duration_ms: 0.658462
  ...
# Subtest: second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
not ok 11 - second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk
  ---
  duration_ms: 12.300222
  location: '/workspace/tellsh/test/pipeline.test.js:106:1'
  failureType: 'testCodeFailure'
  error: |-
    Expected values to be strictly equal:
    
    true !== false
    
  code: 'ERR_ASSERTION'
  name: 'AssertionError'
  expected: false
  actual: true
  operator: 'strictEqual'
  stack: |-
    TestContext.<anonymous> (file:///workspace/tellsh/test/pipeline.test.js:114:10)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: out-of-domain requests are rejected (also by the composer)
ok 12 - out-of-domain requests are rejected (also by the composer)
  ---
  duration_ms: 0.887879
  ...
# Subtest: env detection and overrides
ok 13 - env detection and overrides
  ---
  duration_ms: 0.515039
  ...
1..13
# tests 13
# suites 0
# pass 11
# fail 2
# cancelled 0
# skipped 0
# todo 0
# duration_ms 229.489826

exec
/bin/bash -lc 'node test/templates.test.js; node test/shells.test.js' in /workspace/tellsh
exec
/bin/bash -lc "sed -n '105,118p' test/pipeline.test.js; sed -n '170,180p' scripts/train.py; git diff --stat; git status --short" in /workspace/tellsh
 succeeded in 0ms:

test('second pass: composer for out-of-catalogue flag combinations is experimental and >= medium risk', () => {
  const s = S('list files sorted by modification time, oldest first, with details');
  assert.equal(s.method, 'composed');
  assert.equal(s.experimental, true);
  assert.equal(s.command, 'ls -l -t -r');
  assert.notEqual(s.risk, 'safe');
  assert.equal(s.composed.validation.ok, true);
  assert.equal(validateComposed('ls -l --evil', 'ls').ok, false);
  assert.equal(validateComposed("ls -l 'unterminated", 'ls').ok, false);
  assert.equal(S('list files sorted by modification time, oldest first', { compose: 'off' }).method, 'catalog');
});

test('out-of-domain requests are rejected (also by the composer)', () => {


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--C', type=float, default=30.0)
    ap.add_argument('--tagC', type=float, default=2.0)
    ap.add_argument('--keep-tool', type=int, default=20000)
    ap.add_argument('--keep-tag', type=int, default=24000)
    ap.add_argument('--holdout', type=float, default=0.15)
    ap.add_argument('--seed', type=int, default=13)
    ap.add_argument('--out', default=os.path.join(ROOT, 'model', 'model.bin'))
?? review/

 exited 1 in 4053ms:
TAP version 13
# Subtest: shQuote round-trips nasty strings through bash
not ok 1 - shQuote round-trips nasty strings through bash
  ---
  duration_ms: 11.129598
  location: '/workspace/tellsh/test/templates.test.js:10:1'
  failureType: 'testCodeFailure'
  error: 'spawnSync bash EPERM'
  code: 'EPERM'
  stack: |-
    Object.spawnSync (node:internal/child_process:1123:20)
    spawnSync (node:child_process:877:24)
    execFileSync (node:child_process:920:15)
    roundTrip (file:///workspace/tellsh/test/templates.test.js:8:26)
    TestContext.<anonymous> (file:///workspace/tellsh/test/templates.test.js:12:18)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    node:internal/test_runner/harness:255:12
    node:internal/process/task_queues:140:7
  ...
# Subtest: shQuote keeps simple words bare and tilde expandable
ok 2 - shQuote keeps simple words bare and tilde expandable
  ---
  duration_ms: 0.331689
  ...
# Subtest: raw slots are validated, never injected
ok 3 - raw slots are validated, never injected
  ---
  duration_ms: 1.2948
  ...
# Subtest: optional segments are dropped when slot missing
ok 4 - optional segments are dropped when slot missing
  ---
  duration_ms: 0.240527
  ...
# Subtest: non-slot braces are left alone
ok 5 - non-slot braces are left alone
  ---
  duration_ms: 0.257185
  ...
# Subtest: every intent renders on linux and darwin without throwing, with valid risk
ok 6 - every intent renders on linux and darwin without throwing, with valid risk
  ---
  duration_ms: 62.141861
  ...
# Subtest: darwin variants differ where commands differ
ok 7 - darwin variants differ where commands differ
  ---
  duration_ms: 1.190146
  ...
# Subtest: injection attempt in a filename stays a single quoted argument
ok 8 - injection attempt in a filename stays a single quoted argument
  ---
  duration_ms: 0.388051
  ...
1..8
# tests 8
# suites 0
# pass 7
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 97.839094
TAP version 13
# Subtest: bash/linux: every intent renders and passes bash -n
ok 1 - bash/linux: every intent renders and passes bash -n
  ---
  duration_ms: 602.740906
  ...
# Subtest: zsh/darwin BSD: every intent renders and passes bash -n
ok 2 - zsh/darwin BSD: every intent renders and passes bash -n
  ---
  duration_ms: 522.980346
  ...
# Subtest: zsh/darwin GNU: every intent renders and passes bash -n
ok 3 - zsh/darwin GNU: every intent renders and passes bash -n
  ---
  duration_ms: 394.139603
  ...
# Subtest: sh/linux (dash): every intent renders and passes sh -n
ok 4 - sh/linux (dash): every intent renders and passes sh -n
  ---
  duration_ms: 380.888266
  ...
# Subtest: sh/busybox: every intent renders and passes busybox -n
ok 5 - sh/busybox: every intent renders and passes busybox -n
  ---
  duration_ms: 374.725366
  ...
# Subtest: fish: every intent renders (fish -n when installed)
ok 6 - fish: every intent renders (fish -n when installed)
  ---
  duration_ms: 391.306319
  ...
# fish not installed: syntax check skipped
# Subtest: PowerShell/win32: every intent renders or reports a gap (parser check when pwsh is installed)
ok 7 - PowerShell/win32: every intent renders or reports a gap (parser check when pwsh is installed)
  ---
  duration_ms: 438.866955
  ...
# pwsh not installed: parser check skipped (3 gaps)
# Subtest: PowerShell/linux: every intent renders or reports a gap (parser check when pwsh is installed)
ok 8 - PowerShell/linux: every intent renders or reports a gap (parser check when pwsh is installed)
  ---
  duration_ms: 515.750211
  ...
# pwsh not installed: parser check skipped (0 gaps)
# Subtest: cmd: best-effort coverage is reported, gaps carry a reason
ok 9 - cmd: best-effort coverage is reported, gaps carry a reason
  ---
  duration_ms: 14.784435
  ...
# Subtest: quoting round-trips through bash and sh
not ok 10 - quoting round-trips through bash and sh
  ---
  duration_ms: 3.416796
  location: '/workspace/tellsh/test/shells.test.js:106:1'
  failureType: 'testCodeFailure'
  error: 'spawnSync bash EPERM'
  code: 'EPERM'
  stack: |-
    Object.spawnSync (node:internal/child_process:1123:20)
    spawnSync (node:child_process:877:24)
    execFileSync (node:child_process:920:15)
    TestContext.<anonymous> (file:///workspace/tellsh/test/shells.test.js:108:51)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: fish / PowerShell / cmd quoting rules
ok 11 - fish / PowerShell / cmd quoting rules
  ---
  duration_ms: 0.789429
  ...
# Subtest: per-shell variants: intent shared, rendering differs
ok 12 - per-shell variants: intent shared, rendering differs
  ---
  duration_ms: 17.870588
  ...
1..12
# tests 12
# suites 0
# pass 11
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 3703.480778

exec
/bin/bash -lc "node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
import {analyzeCommand} from './src/history.js';
import {buildCommand} from './src/fill.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for(const history of [['cat old.txt','frobnicate new.txt'],['cat old.txt','cat \"unterminated'],['cat important.txt','cd /tmp']]) for (const q of ['count words','delete it']) {const s=suggest(q,{env,history,compose:'off'});console.log(JSON.stringify({history,q,cmd:s.command,context:s.context,method:s.method,missing:s.missing}));}
for (const q of ['replace \"a\\\\n/e\" with \"b\" in x.txt','find files named \"*.js\"','delete directory /tmp/cache/..']) {const s=suggest(q,{env,compose:'off'});console.log(JSON.stringify({q,cmd:s.command,slots:s.slots,intent:s.intent,missing:s.missing}));}
JS
rg -n '(/etc/hosts|~/.bashrc)' data/intents | head -n 8
nl -ba src/pipeline.js | sed -n '190,215p'
nl -ba scripts/gen_data.js | sed -n '149,189p'
nl -ba scripts/lib/cmdnorm.js | sed -n '48,65p'" in /workspace/tellsh
 succeeded in 258ms:
{"history":["cat old.txt","frobnicate new.txt"],"q":"count words","cmd":"wc -w old.txt","context":{"used":true,"commands":2,"rule":"implicit","note":"filled from history: file=old.txt"},"method":"catalog","missing":[]}
{"history":["cat old.txt","frobnicate new.txt"],"q":"delete it","cmd":"rm <FILE>","context":{"used":true,"commands":2,"rule":"refused","note":"the latest file in history (new.txt) cannot be read unambiguously; not guessing"},"method":"history-rule","missing":["file"]}
{"history":["cat old.txt","cat \"unterminated"],"q":"count words","cmd":"wc -w old.txt","context":{"used":true,"commands":2,"rule":"implicit","note":"filled from history: file=old.txt"},"method":"catalog","missing":[]}
{"history":["cat old.txt","cat \"unterminated"],"q":"delete it","cmd":"rm <FILE>","context":{"used":true,"commands":2,"rule":"refused","note":"the latest file in history (cat \"unterminated) cannot be read unambiguously; not guessing"},"method":"history-rule","missing":["file"]}
{"history":["cat important.txt","cd /tmp"],"q":"count words","cmd":"wc -w important.txt","context":{"used":true,"commands":2,"rule":"implicit","note":"filled from history: file=important.txt"},"method":"catalog","missing":[]}
{"history":["cat important.txt","cd /tmp"],"q":"delete it","cmd":"rm -r /tmp","context":{"used":true,"commands":2,"rule":"pronoun","note":"\"dir\" from history = /tmp"},"method":"history-rule","missing":[]}
{"q":"replace \"a\\n/e\" with \"b\" in x.txt","cmd":"sed -i 's/a\\\\n\\/e/b/g' x.txt","slots":{"file":"x.txt","old":"a\\n/e","new":"b","sedexpr":"s/a\\\\n\\/e/b/g"},"intent":"replace_text","missing":[]}
{"q":"find files named \"*.js\"","cmd":"find . -iname <NAMEPAT>","slots":{"glob":"*.js"},"intent":"find_by_name","missing":["name"]}
{"q":"delete directory /tmp/cache/..","cmd":"rm -r /tmp/cache/","slots":{"path":"/tmp/cache/"},"intent":"delete_dir","missing":[]}
data/intents/g01.jsonl:369:{"text": "display file stats for ~/.bashrc", "intent": "file_stat", "lang": "en"}
data/intents/g01.jsonl:373:{"text": "stat the file /etc/hosts", "intent": "file_stat", "lang": "en"}
data/intents/g01.jsonl:398:{"text": "wyświetl statystyki pliku ~/.bashrc", "intent": "file_stat", "lang": "pl"}
data/intents/g01.jsonl:402:{"text": "zrób stat na /etc/hosts", "intent": "file_stat", "lang": "pl"}
data/intents/g01.jsonl:438:{"text": "show beginning of file /etc/hosts, 8 lines", "intent": "head_file", "lang": "en"}
data/intents/g01.jsonl:468:{"text": "pokaż początek /etc/hosts, 8 linii", "intent": "head_file", "lang": "pl"}
data/intents/g01.jsonl:601:{"text": "print the whole file /etc/hosts", "intent": "cat_file", "lang": "en"}
data/intents/g01.jsonl:608:{"text": "print ~/.bashrc", "intent": "cat_file", "lang": "en"}
   190	    }
   191	    finalizeSlots(it, slots);
   192	    method = 'history-rule';
   193	  }
   194	  if (sb) {
   195	    const it = BY_ID[intent];
   196	    for (const [k, v] of Object.entries(validHistorySlots(sb.lastSlots))) {
   197	      if (usesSlot(it, k) && slots[k] == null && !['namepat', 'sedexpr'].includes(k)) { slots[k] = v; r.sources[k] = 'history'; }
   198	    }
   199	    finalizeSlots(it, slots);
   200	  }
   201	  let b = buildCommand(intent, query, { env, resolved: slots });
   202	  // implicit reference: a required slot is still missing and the history has a value of that type
   203	  if (ctx && b.missing.length && ref?.rule !== 'refused') {
   204	    const filled = [];
   205	    for (const m of b.missing) {
   206	      const e = entityForSlot(m, ctx) || (ctx.last?.slots?.[m] != null ? { ent: m, value: ctx.last.slots[m] } : null);
   207	      if (e && validSlot(m, e.value)) { slots[m] = e.value; r.sources[m] = 'history'; filled.push(`${m}=${e.value}`); }
   208	    }
   209	    if (filled.length) {
   210	      finalizeSlots(BY_ID[intent], slots);
   211	      b = buildCommand(intent, query, { env, resolved: slots });
   212	      context.rule ??= 'implicit';
   213	      context.note = [context.note, `filled from history: ${filled.join(', ')}`].filter(Boolean).join('; ');
   214	    }
   215	  }
   149	    tag.write(JSON.stringify({ tool, f: tagFeatures(toks, tool, TAG_DIM), y, gid: group }) + '\n');
   150	    counts.tag++;
   151	  };
   152	
   153	  // 1. intent paraphrases (+ typo copy, + relexicalised copy), random env, some ctx noise
   154	  for (const r of base) {
   155	    const g = gid++;
   156	    const fam = FAMILY_OF[r.intent];
   157	    const env = () => (r.shell ? [`shell=${r.shell}`, `os=${r.os || 'linux'}`] : sampleEnv());
   158	    const ctx = () => (rng() < 0.25 ? randomCtx() : []);
   159	    emit(r.text, fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g);
   160	    emit(typo(r.text), fam, r.intent, [...env(), ...ctx()], 1, r.src, r.lang, g);
   161	    const { spans } = silverSpans(r.text, r.intent);
   162	    emitTag(r.text, spans, fam, g);
   163	    for (let k = 0; k < 2; k++) {
   164	      const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'train' });
   165	      emitTag(rx.text, rx.spans, fam, g);
   166	      if (k === 0 && rx.text !== r.text) emit(rx.text, fam, r.intent, [...env(), ...ctx()], 0.5, r.src, r.lang, g);
   167	    }
   168	  }
   169	
   170	  // 2. history anaphora: pronoun requests whose intent depends on ctx_ features
   171	  let nAna = 0;
   172	  for (const [, v] of Object.entries(ANAPHORA)) {
   173	    for (const [ent, intent] of Object.entries(v.map)) {
   174	      for (const lang of ['en', 'pl']) {
   175	        for (const text of v[lang]) {
   176	          for (let k = 0; k < 3; k++) {
   177	            const g = gid++;
   178	            emit(text, FAMILY_OF[intent], intent, [...sampleEnv(), ...randomCtx(ent)], 1, 'ctx', lang, g);
   179	            if (k === 0) emitTag(text, [], FAMILY_OF[intent], g);
   180	            nAna++;
   181	          }
   182	        }
   183	      }
   184	    }
   185	  }
   186	
   187	  // 3. tldr descriptions (CC-BY-4.0): stage-1 tool labels only, capped per family/lang
   188	  const tldr = readJsonl(join(ROOT, 'data', 'tldr', 'tools.jsonl'));
   189	  const cap = {};
    48	        flags.push(f);
    49	      }
    50	      continue;
    51	    }
    52	    if (head === 'ps' && /^[a-z]+$/.test(t) && i === 1) { for (const c of t) flags.push('bsd:' + c); continue; }
    53	    args.push(t);
    54	  }
    55	  return { key, flags: [...new Set(flags)].sort(), args };
    56	}
    57	
    58	export function normCmd(cmd) {
    59	  const r = splitCommand(String(cmd).trim(), 'posix', { keepRedirects: true });
    60	  if (!r.ok) return 'raw:' + String(cmd).trim();
    61	  return JSON.stringify(r.segments.map((g) => ({ ...normSegment(g.words.map(rawOf)), sep: g.sep })));
    62	}
    63	
    64	export const sameCmd = (a, b) => normCmd(a) === normCmd(b);

exec
/bin/bash -lc "node --input-type=module <<'JS'
import fs from 'node:fs';
import {silverSpans,relex,mulberry32} from './scripts/lib/silver.js';
import {resolveSlots,finalizeSlots,buildCommand} from './src/fill.js';
import {exFromSpans} from './src/tagger.js';
import {suggest} from './src/pipeline.js';
import {BY_ID} from './src/catalog.js';
const rows=fs.readdirSync('data/eval').sort().flatMap(f=>fs.readFileSync('data/eval/'+f,'utf8').trim().split('\\n').map(JSON.parse));
const rng=mulberry32(7),env={shell:'bash',os:'linux',coreutils:'gnu'};let n=0,missing=0,credited=0,retained=0,spN=0;const examples=[];
for(const r of rows){const {spans}=silverSpans(r.text,r.intent);if("'!spans.length)continue;const rx=relex(r.text,spans,{lang:r.lang,rng,split:'"'eval',keepProb:0});spN+=rx.spans.length;retained+=rx.spans.filter(s=>"'!s.replaced).length;const it=BY_ID[r.intent];const gs=finalizeSlots(it,resolveSlots(it,exFromSpans(rx.text,rx.spans.map(s=>({...s,text:rx.text.slice(s.start,s.end)})))));const b=buildCommand(r.intent,rx.text,{env,resolved:gs});n++;if(b.missing.length){missing++; const s=suggest(rx.text,{env,compose:'"'off'});const ok=s.understood&&s.command===b.command;if(ok)credited++;if(examples.length<6)examples.push({text:rx.text,cmd:b.command,missing:b.missing,credited:ok});}}
console.log(JSON.stringify({n,missing,credited,retained,spN,examples},null,2));
JS
python3 -B <<'PY'
import json
try:
 import numpy as np
except ImportError as e:
 print(e); raise SystemExit
rows=[json.loads(l) for l in open('build/cls.jsonl')]
gids=np.array([r['gid'] for r in rows]); ug=np.unique(gids);ho=set(np.random.default_rng(13).choice(ug,int(len(ug)*.15),replace=False).tolist())
ctx=[r for r in rows if r['g']=='ctx'];mixed=0;cnt=0
for i in range(0,len(ctx),3):
 gs=[r['gid'] for r in ctx[i:i+3]]; n=sum(g in ho for g in gs)
 if 0<n<3: mixed+=1;cnt+=n
print('ctx triplets split across train/holdout',mixed,'of',len(ctx)//3,'holdout rows with same phrase+label in training',cnt)
PY" in /workspace/tellsh
 succeeded in 3137ms:
{
  "n": 1326,
  "missing": 52,
  "credited": 33,
  "retained": 62,
  "spN": 1593,
  "examples": [
    {
      "text": "where in the /etc is the function parseConfig used? show lines",
      "cmd": "grep -rn -- <PATTERN> /etc",
      "missing": [
        "pattern"
      ],
      "credited": true
    },
    {
      "text": "gdzie w ./src jest uzywana funkcja parseConfig? pokaz linie",
      "cmd": "grep -rn -- <PATTERN> ./src",
      "missing": [
        "pattern"
      ],
      "credited": true
    },
    {
      "text": "przeszukaj rekurencyjnie pod /etc DATABASE_URL",
      "cmd": "grep -rn -- <PATTERN> /etc",
      "missing": [
        "pattern"
      ],
      "credited": true
    },
    {
      "text": "grepnij FIXME ./src",
      "cmd": "grep -rn -- <PATTERN> ./src",
      "missing": [
        "pattern"
      ],
      "credited": true
    },
    {
      "text": "what files in vendor reference 192.168.1.10?",
      "cmd": "grep -rl -- <PATTERN> vendor",
      "missing": [
        "pattern"
      ],
      "credited": false
    },
    {
      "text": "jakie pliki w /etc odwołują się do 192.168.1.10?",
      "cmd": "grep -rl -- <PATTERN> /etc",
      "missing": [
        "pattern"
      ],
      "credited": true
    }
  ]
}
ctx triplets split across train/holdout 101 of 254 holdout rows with same phrase+label in training 115

codex
The read-only probes confirm several issues: compound history lines can select an older deletion target; implicit history filling can recover a stale value; and augmented training rows collide with evaluation text. The end-to-end evaluator also credits 33 commands that still contain required placeholders. Subprocess checks and temporary-file tests hit sandbox restrictions, so I’m separating those failures from repository defects.
exec
/bin/bash -lc "nl -ba src/slots.js | sed -n '225,241p'; nl -ba src/history.js | sed -n '314,332p'; nl -ba src/history.js | sed -n '401,417p'; nl -ba scripts/eval.js | sed -n '240,266p'; nl -ba scripts/teacher.js | sed -n '78,114p'; nl -ba scripts/teacher.js | sed -n '149,172p'; nl -ba scripts/lib/silver.js | sed -n '95,108p'; nl -ba scripts/lib/silver.js | sed -n '139,175p'; nl -ba scripts/bench.js | sed -n '39,59p'" in /workspace/tellsh
 succeeded in 0ms:
   225	      if (/:\/\//.test(raw)) continue;
   226	      found.push([start, raw, m[1].length]);
   227	    }
   228	    for (const [start, raw, len] of found.reverse()) {
   229	      spans.push([start, raw]);
   230	      mark('PATH', start, start + raw.length, raw);
   231	      work = blank(work, start, start + len);
   232	    }
   233	  }
   234	  // 5b. domains / hostnames not caught above (e.g. "google.com" without path)
   235	  take(/\b((?:[a-z0-9-]+\.)+[a-z]{2,})\b/g, (m) => {
   236	    out.hosts.push(text.slice(m.index, m.index + m[0].length));
   237	    mark('HOST', m.index, m.index + m[0].length, out.hosts[out.hosts.length - 1]);
   238	  });
   239	  // 6. named locations
   240	  for (const [re, val] of LOCATIONS) {
   241	    const m = work.match(re);
   314	      if (sub === 'run') {
   315	        const i = args.indexOf('--name');
   316	        if (i >= 0 && args[i + 1]) ents.container ??= args[i + 1];
   317	        const nm = args.find((a) => a.startsWith('--name='));
   318	        if (nm) ents.container ??= nm.slice(7);
   319	      } else if (DOCKER_CT.has(sub)) {
   320	        const rest = args.slice(args.indexOf(sub) + 1);
   321	        for (let i = 0; i < rest.length; i++) {
   322	          if (DOCKER_VAL_FLAGS.has(rest[i])) { i++; continue; }
   323	          if (/^-/.test(rest[i])) continue;
   324	          ents.container ??= rest[i];
   325	          break;
   326	        }
   327	        intent ??= DOCKER_INTENT[sub] || null;
   328	        if (intent) slots = { container: ents.container, ...slots };
   329	      }
   330	    } else if (head === 'systemctl' || head === 'service') {
   331	      const svc = head === 'systemctl' ? nonFlags[1] : nonFlags[0];
   332	      const verb = head === 'systemctl' ? nonFlags[0] : nonFlags[1];
   401	      // older file/dir must not be picked up by "it"
   402	      const p = nonFlags.find((a) => PATHLIKE.test(rawOf(a)) && !/^\w+:\/\//.test(rawOf(a)));
   403	      if (p) ents[typeByExt(p)] ??= AMB + rawOf(p);
   404	    }
   405	  }
   406	  if (Object.values(slots).some(isAmbiguous)) ambiguous = true;
   407	  return { line: t, intent, slots, ents, ambiguous };
   408	}
   409	
   410	const ENT_TYPES = ['container', 'service', 'pid', 'proc', 'port', 'file', 'dir', 'branch', 'host', 'url'];
   411	
   412	/**
   413	 * Build the context object from history commands (oldest first).
   414	 * kind: 'posix' | 'pwsh' (default: `cmds.kind` as set by loadHistory, else posix)
   415	 * -> { n, ents: {type: value}, entOrder: [types by recency], last: {intent, slots, ambiguous}, features: [...] }
   416	 *    values that could not be read unambiguously are kept as AMB-prefixed strings (see isAmbiguous)
   417	 */
   240	  }
   241	}
   242	// relexicalised held-out eval: values from the held-out pools, gold command rendered from the inserted spans
   243	const rng = mulberry32(7);
   244	const e2e = { all: { n: 0, ok: 0, okGoldIntent: 0 }, en: { n: 0, ok: 0, okGoldIntent: 0 }, pl: { n: 0, ok: 0, okGoldIntent: 0 } };
   245	const e2eFails = [];
   246	for (const r of evalRows) {
   247	  const { spans } = silverSpans(r.text, r.intent);
   248	  if (!spans.length) continue;
   249	  const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'eval', keepProb: 0 });
   250	  const it = BY_ID[r.intent];
   251	  const goldSlots = finalizeSlots(it, resolveSlots(it, exFromSpans(rx.text, rx.spans.map((s) => ({ ...s, text: rx.text.slice(s.start, s.end) })))));
   252	  // regex-only values the silver labeler did not mark (e.g. defaults) are not part of the gold
   253	  const goldCmd = buildCommand(r.intent, rx.text, { env: BASH, resolved: goldSlots }).command;
   254	  const s = suggest(rx.text, { env: BASH, model, compose: 'off' });
   255	  const okGi = buildCommand(r.intent, rx.text, { env: BASH, resolved: resolveWithTagger(r.intent, rx.text, { model }).slots }).command === goldCmd;
   256	  for (const k of ['all', r.lang]) {
   257	    e2e[k].n++;
   258	    if (s.understood && s.command === goldCmd) e2e[k].ok++;
   259	    if (okGi) e2e[k].okGoldIntent++;
   260	  }
   261	  if (!(s.understood && s.command === goldCmd) && e2eFails.length < 400) e2eFails.push({ text: rx.text, gold: goldCmd, got: s.command, intent: r.intent, pred: s.intent });
   262	}
   263	md('## 4. End-to-end exact command (bash, linux)');
   264	md();
   265	md(`* \`test/slot-cases.js\` (${SLOT_CASES.length} hand-written request → command pairs, gold intent): ` +
   266	  `**${slotCase.merge}/${SLOT_CASES.length}** shipped (tagger + regex fallback), ${slotCase.tagger}/${SLOT_CASES.length} tagger only, ${slotCase.regex}/${SLOT_CASES.length} regex only.`);
    78	      if (byIntent[id][round]) sample.push(byIntent[id][round]);
    79	    }
    80	  }
    81	  const results = [];
    82	  let calls = 0;
    83	  let inTok = 0;
    84	  let failed = 0;
    85	  const t0 = Date.now();
    86	  const work = sample.map((r) => async () => {
    87	    const env = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
    88	    const b = buildCommand(r.intent, r.text, { env });
    89	    const c = cascade(r.text, { extras: ['shell=bash', 'os=linux'], top: 4 });
    90	    const alts = c.top.map((t) => t.intent).filter((i) => i !== r.intent).slice(0, 2);
    91	    const opts = [r.intent, ...alts].sort(() => rng() - 0.5);
    92	    const criteria = Object.fromEntries(opts.map((i) => [i, BY_ID[i].description]));
    93	    criteria.none = 'none of these';
    94	    const { spans } = silverSpans(r.text, r.intent);
    95	    const questions = {
    96	      intent: { type: 'choice', instructions: 'Which action does the user request? (The request may be in Polish or English.)', criteria },
    97	      correct: { type: 'noul', instructions: 'The shell command does what the request asks for (values the request does not mention may use sensible defaults)' },
    98	      risk: { type: 'choice', instructions: 'How risky is running the shell command on a user machine', criteria: RISK_DESC },
    99	    };
   100	    spans.slice(0, 3).forEach((s, i) => {
   101	      questions[`span_${i}`] = { type: 'noul', instructions: `In the request, "${r.text.slice(s.start, s.end)}" is ${TYPE_DESC[s.type]}` };
   102	    });
   103	    try {
   104	      const j = await ask({ request: r.text, shell: 'bash on Linux', command: b.command }, questions);
   105	      calls++;
   106	      inTok += j.usage?.input_tokens || 0;
   107	      const a = j.answers || {};
   108	      results.push({
   109	        text: r.text, intent: r.intent, lang: r.lang, command: b.command, risk: b.risk,
   110	        t_intent: a.intent?.choice, t_intent_conf: a.intent?.confidence, t_correct: a.correct?.noul,
   111	        t_risk: a.risk?.choice, t_risk_conf: a.risk?.confidence,
   112	        spans: spans.slice(0, 3).map((s, i) => ({ type: s.type, text: r.text.slice(s.start, s.end), p: a[`span_${i}`]?.noul })),
   113	      });
   114	    } catch (e) {
   149	
   150	Sampled **${n}** training rows (stratified over intents, EN+PL, incl. shell-phrased rows) and made **${calls} API calls**
   151	(${failed} failed) to \`jev-latest\`${seconds ? ` in ${seconds} s` : ''}: ${inTok} input tokens ≈ **$${spend.toFixed(4)}**
   152	(at $${PRICE_PER_MTOK}/Mtok input, output free). Each call asked: intent (choice among the gold label and our two closest
   153	alternatives), "the rendered command does what is asked" (noul), risk (choice) and up to 3 silver slot spans (noul).
   154	
   155	| check | agreement |
   156	|---|---|
   157	| intent label = teacher choice | ${pct(intentAgree, n)} |
   158	| command judged correct (noul ≥ 0.5) | ${pct(correctOk, n)} |
   159	| risk level identical | ${pct(riskAgree, n)} (teacher rated higher with conf ≥ 0.5: ${riskHigher}) |
   160	| silver slot spans accepted (noul ≥ 0.5) | ${pct(spanOk, spanN)} of ${spanN} |
   161	
   162	${review.length} rows flagged → \`data/teacher/review.jsonl\`. After manual inspection (\`data/teacher/decisions.jsonl\`):
   163	* intent labels: no disagreement, **0 training rows dropped or relabelled**;
   164	* risk: **${decisions.filter((d) => d.action === 'relabel' && d.field === 'risk').length} intents relabelled safe → medium** (${decisions.filter((d) => d.action === 'relabel' && d.field === 'risk').map((d) => d.intent).join(', ')}) — they overwrite files or change the git working tree;
   165	  ${decisions.filter((d) => d.action === 'keep' && d.field === 'risk').length} kept safe where the teacher was stricter than our definition (${decisions.filter((d) => d.action === 'keep' && d.field === 'risk').map((d) => d.intent).join(', ')});
   166	* "command wrong" flags were slot-extraction bugs, not label errors (Windows \`C:\\\` paths, \`plik X.b64\` for base64, Polish inflection
   167	  \`javy\` → \`java\`, filler words taken as values); fixed in \`src/slots.js\` / \`src/tagger.js\` (${decisions.filter((d) => d.action === 'keep' && d.field === 'label').length} rows kept).`;
   168	  updateSection('teacher', md);
   169	  console.log(`teacher: ${calls} calls, ${inTok} input tokens ≈ $${spend.toFixed(4)}; intent agree ${pct(intentAgree, n)}, correct ${pct(correctOk, n)}, risk agree ${pct(riskAgree, n)}, spans ${pct(spanOk, spanN)}; ${review.length} flagged`);
   170	}
   171	
   172	main().catch((e) => { console.log(`teacher: failed (${e.message}) — skipped`); process.exitCode = 0; });
    95	// ---------- value pools (index % 4 == 3 -> held-out eval pool) ----------
    96	const P = {
    97	  dir: ['/var/log', '/etc/nginx', '~/projects', './src', 'build', '/opt/app', '~/Documents/reports', '/srv/www',
    98	    'node_modules', '../backup', '/tmp/cache', '~/Pobrane', '/mnt/data', '/home/ola/zdjecia', 'dist', '/var/lib/docker',
    99	    '~/code/tellsh', 'src/components', '/usr/local/bin', '~/Desktop/stare', 'logs', '/data/exports', './tests', '/etc',
   100	    '~/Music', 'public/img', '/var/www/html', 'vendor', '~/.config', '/backup/2024', 'docs', '/home/jan/projekty'],
   101	  file: ['notes.txt', 'config.yaml', './scripts/run.sh', '/etc/hosts', 'app.log', 'README.md', 'data.csv', '~/.bashrc',
   102	    'main.py', 'index.js', 'raport_2024.pdf', 'Dockerfile', 'docker-compose.yml', '/var/log/syslog', 'package.json',
   103	    'server.conf', 'test.py', '/etc/fstab', 'faktura-03.pdf', 'src/app.ts', 'error.log', 'deploy.sh', 'zdjecie.jpg',
   104	    '.env', 'requirements.txt', 'build/output.bin', 'notatki.md', '/var/log/nginx/access.log', 'Makefile', 'lista.txt',
   105	    'schema.sql', 'wyniki_final.xlsx'],
   106	  tar: ['backup.tar.gz', 'logs-2024.tgz', 'release.tar.gz', 'site.tar.gz', 'dane.tar.gz', 'archive.tar.gz', 'src.tgz', 'kopia.tar.gz'],
   107	  zip: ['site.zip', 'photos.zip', 'projekt.zip', 'export.zip', 'docs.zip', 'zdjecia.zip', 'build.zip', 'raporty.zip'],
   108	  proc: ['nginx', 'node', 'chrome', 'myapp', 'worker-2', 'api_server', 'java', 'python3', 'qzx-daemon', 'ffmpeg',
   139	const pool = (name, split) => P[name].filter((_, i) => (split === 'eval' ? i % 4 === 3 : i % 4 !== 3));
   140	export const POOLS = P;
   141	
   142	const NUMW = {
   143	  en: ['three', 'five', 'ten', 'twenty', 'two', 'seven'],
   144	  pl: ['trzy', 'pięć', 'dziesięć', 'dwadzieścia', 'dwa', 'siedem'],
   145	};
   146	
   147	function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
   148	const ARCH = /\.(tar\.gz|tgz|tar|zip|tar\.bz2|tar\.xz|gz)$/i;
   149	const LOCISH = /\s|^(home|downloads?|pobrane|desktop|pulpit|documents|dokumenty)$/i;
   150	
   151	function replacement(sp, orig, lang, rng, split) {
   152	  const quotedCtx = sp.quoted;
   153	  switch (sp.type) {
   154	    case 'PATH': {
   155	      if (LOCISH.test(orig) && !/[/~.]/.test(orig)) return null; // named location phrase: keep
   156	      if (ARCH.test(orig)) return pick(rng, pool(/zip$/i.test(orig) ? 'zip' : 'tar', split));
   157	      const fileish = /\.[A-Za-z0-9]{1,5}$/.test(orig) || ['file', 'src'].includes(sp.slot) && !/\/$/.test(orig) && /\./.test(orig);
   158	      let v = pick(rng, pool(fileish ? 'file' : 'dir', split));
   159	      if (quotedCtx && rng() < 0.3) v = v.replace(/[^/]*$/, (b) => b.replace(/[_-]/, ' '));
   160	      return v;
   161	    }
   162	    case 'NUM': {
   163	      if (sp.slot === 'depth') return String(1 + Math.floor(rng() * 4));
   164	      if (/^\d+$/.test(orig) || rng() < 0.7) return String(1 + Math.floor(rng() * 30));
   165	      return pick(rng, NUMW[lang] || NUMW.en);
   166	    }
   167	    case 'TIME': case 'SIZE': {
   168	      if (!/\d/.test(orig)) return null;
   169	      return orig.replace(/\d+(?:[.,]\d+)?/, () => String(1 + Math.floor(rng() * 30)));
   170	    }
   171	    case 'PORT': return String(rng() < 0.6 ? pick(rng, pool('port', split)) : 1024 + Math.floor(rng() * 60000));
   172	    case 'PID': return String(100 + Math.floor(rng() * 99000));
   173	    case 'MODE': return pick(rng, pool('mode', split));
   174	    case 'EXT': {
   175	      const e = pick(rng, pool('ext', split));
    39	const model = loadModel();
    40	const loadMs = performance.now() - tl;
    41	
    42	const run = (env, extra = {}) => {
    43	  for (let i = 0; i < 200; i++) suggest(queries[i % queries.length], { model, env, ...extra });
    44	  const times = [];
    45	  for (let i = 0; i < WARM_N; i++) {
    46	    const q = queries[(i * 7) % queries.length];
    47	    const t = performance.now();
    48	    suggest(q, { model, env, ...extra });
    49	    times.push(performance.now() - t);
    50	  }
    51	  return times;
    52	};
    53	const warm = run({ shell: 'bash', os: 'linux', coreutils: 'gnu' }, { compose: 'off' });
    54	const warmCompose = run({ shell: 'bash', os: 'linux', coreutils: 'gnu' });
    55	const warmPs = run({ shell: 'powershell', os: 'win32', coreutils: 'gnu' });
    56	const hist = ['docker run -d --name web nginx', 'cd ~/projects/api', 'tellsh ile zajmuje /home', 'git checkout -b feature/x', 'cat notes.txt'];
    57	const warmHist = run({ shell: 'bash', os: 'linux', coreutils: 'gnu' }, { history: hist });
    58	
    59	let affinity = 'unknown';

exec
/bin/bash -lc "nl -ba src/slots.js | sed -n '200,212p'; nl -ba src/history.js | sed -n '295,310p'; nl -ba src/history.js | sed -n '388,399p'; nl -ba src/cli.js | sed -n '178,190p'; nl -ba scripts/build_triggers.js | sed -n '45,62p'; nl -ba scripts/train.py | sed -n '189,205p'; nl -ba scripts/teacher.js | sed -n '23,30p'; node --input-type=module <<'JS'
import {suggest} from './src/pipeline.js';
const env={shell:'bash',os:'linux',coreutils:'gnu'};
for (const q of ['delete file /tmp/data.','delete directory /tmp/cache/..','delete file','remove file','remove directory']) {let s=suggest(q,{env,history:['cat old.txt','frobnicate new.txt'],compose:'off'});console.log(JSON.stringify({q,command:s.command,intent:s.intent,method:s.method,missing:s.missing}));}
JS" in /workspace/tellsh
 succeeded in 547ms:
   200	    if (m[2]) {
   201	      out.port = out.port || +m[2];
   202	      mark('PORT', m.index + m[0].length - m[2].length, m.index + m[0].length, +m[2]);
   203	    }
   204	  });
   205	  // 5. paths / filenames (positions kept for src/dst ordering)
   206	  PATH_TOKEN.lastIndex = 0;
   207	  {
   208	    let m;
   209	    const found = [];
   210	    while ((m = PATH_TOKEN.exec(work))) {
   211	      const start = m.index + m[0].length - m[1].length;
   212	      const raw = text.slice(start, start + m[1].length).replace(/[.]+$/, '');
   295	    return { line: t, intent, slots, ents, opaque: true, ambiguous: true };
   296	  }
   297	  const inv = invert(t, k);
   298	  if (inv) { intent = inv.intent; slots = inv.slots; ambiguous = inv.ambiguous; entsFromSlots(intent, slots, ents); }
   299	  const setIntent = (id, s) => { if (!intent) { intent = id; slots = s; } };
   300	  for (const { words } of split.segments) {
   301	    let w = words;
   302	    while (w.length && (w[0] === 'sudo' || /^\w+=/.test(w[0]))) w = w.slice(1);
   303	    if (!w.length) continue;
   304	    if (isAmbiguous(w[0])) {
   305	      if (w.slice(1).some((a) => PATHLIKE.test(rawOf(a)))) { ents.file ??= AMB + t; ents.dir ??= AMB + t; }
   306	      continue;
   307	    }
   308	    const head = w[0].replace(/^.*[\\/]/, '').replace(/\.exe$/i, '');
   309	    const args = w.slice(1);
   310	    const nonFlags = args.filter((a) => !/^-/.test(a));
   388	      const p = nonFlags[nonFlags.length - 1];
   389	      if (p) ents[typeByExt(p)] ??= p;
   390	    } else if (head === 'tar' || head === 'zip') {
   391	      const a = nonFlags.find((x) => /\.(tar(\.\w+)?|tgz|zip)$/.test(x));
   392	      if (a) ents.file ??= a;
   393	    } else if (FILE_HEADS.has(head)) {
   394	      const p = nonFlags.filter((a) => !/^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(a)).pop();
   395	      if (p) ents[/\/$/.test(p) ? 'dir' : 'file'] ??= p;
   396	    } else if (DIR_HEADS.has(head)) {
   397	      const p = head === 'find' ? nonFlags[0] : nonFlags.find((a) => !isGlob(a));
   398	      if (p) ents.dir ??= p;
   399	    } else if (!INERT_HEADS.has(head.toLowerCase())) {
   178	    return 5;
   179	  }
   180	
   181	  printSuggestion(s, opts);
   182	  if (opts.dryRun) return 0;
   183	
   184	  const interactive = process.stdin.isTTY && process.stdout.isTTY;
   185	  const shellName = s.shell;
   186	  if (opts.yes) {
   187	    if (s.risk !== 'safe' || s.missing.length || s.method !== 'catalog') {
   188	      const why = s.method === 'composed' ? 'composed (experimental)' : s.method !== 'catalog' ? 'resolved from history' : s.missing.length ? 'incomplete' : s.risk;
   189	      console.log(C.yellow(`  --yes only auto-runs safe catalog commands; this one is ${why}. Not running.`));
   190	      return 4;
    45	}
    46	writeFileSync(`${ROOT}model/tldr_triggers.json`, JSON.stringify(out));
    47	
    48	// "explained" flags: triggers that fire on >= 5% of an intent's own training paraphrases are part of what that
    49	// intent means ("hidden" for hidden_files, "kernel" for dmesg) and must not make the composer replace it.
    50	const { triggeredFlags } = await import('../src/compose.js');
    51	const { FAMILY_OF } = await import('../src/tools.js');
    52	const { readdirSync } = await import('node:fs');
    53	const train = [...readdirSync(`${ROOT}data/intents`).filter((f) => f.endsWith('.jsonl')).flatMap((f) => readFileSync(`${ROOT}data/intents/${f}`, 'utf8').split('\n')),
    54	  ...(existsSync(`${ROOT}data/shell/train.jsonl`) ? readFileSync(`${ROOT}data/shell/train.jsonl`, 'utf8').split('\n') : [])]
    55	  .filter(Boolean).map((l) => JSON.parse(l));
    56	const counts = {};
    57	const totals = {};
    58	for (const r of train) {
    59	  totals[r.intent] = (totals[r.intent] || 0) + 1;
    60	  for (const f of new Set(triggeredFlags(r.text, FAMILY_OF[r.intent]))) ((counts[r.intent] ??= {})[f] = (counts[r.intent][f] || 0) + 1);
    61	}
    62	const explained = {};
   189	
   190	    # ---------------- calibration on a group-wise holdout ----------------
   191	    rng = np.random.default_rng(args.seed)
   192	    gids = np.array([r['gid'] for r in rows])
   193	    ug = np.unique(gids)
   194	    ho_g = set(rng.choice(ug, int(len(ug) * args.holdout), replace=False).tolist())
   195	    is_ho = np.array([g in ho_g for g in gids])
   196	    # evaluate on the original (non-augmented) sentence of each group only: first row of the group
   197	    first = np.zeros(len(rows), bool)
   198	    seen = set()
   199	    for i, g in enumerate(gids):
   200	        if g not in seen:
   201	            first[i] = True
   202	            seen.add(g)
   203	    tr_idx = np.flatnonzero(~is_ho)
   204	    ho_idx = np.flatnonzero(is_ho & first)
   205	    tool_s, int_s = train_all(rows, X, meta, tr_idx, args.C, args.keep_tool, keep_int, '[split] ')
    23	import { updateSection } from './report.js';
    24	
    25	const ROOT = fileURLToPath(new URL('..', import.meta.url));
    26	const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=')[1] : d; };
    27	const MAX_CALLS = Math.min(300, +arg('calls', 300));
    28	const PRICE_PER_MTOK = 0.042; // USD per million input tokens (jev-1.13, docs.typesafe.ai/models); output tokens are free
    29	const ENDPOINT = 'https://api.typesafe.ai/v1/systemone';
    30	const KEY = process.env.TYPESAFE_API_KEY;
{"q":"delete file /tmp/data.","command":"rm /tmp/data","intent":"delete_file","method":"catalog","missing":[]}
{"q":"delete directory /tmp/cache/..","command":"rm -r /tmp/cache/","intent":"delete_dir","method":"catalog","missing":[]}
{"q":"delete file","command":"rm old.txt","intent":"delete_file","method":"catalog","missing":[]}
{"q":"remove file","command":"rm old.txt","intent":"delete_file","method":"catalog","missing":[]}
{"q":"remove directory","command":"rm -r <PATH>","intent":"delete_dir","method":"catalog","missing":["path"]}

exec
/bin/bash -lc "node --input-type=module <<'JS'
import fs from 'node:fs'; import {normalize} from './src/features.js'; import {triggeredFlags} from './src/compose.js'; import {FAMILY_OF} from './src/tools.js';
const read=p=>fs.readFileSync(p,'utf8').split('\\n').filter(Boolean).map(JSON.parse);
const dir=p=>fs.readdirSync(p).filter(f=>f.endsWith('.jsonl')).flatMap(f=>read(p+'/'+f));
const ev=[...dir('data/eval'),...read('data/shell/eval.jsonl'),...read('data/history/eval.jsonl').map(r=>({...r,text:r.query})),...read('data/compose/eval.jsonl'),...read('data/slots/gold.jsonl'),...read('data/ood_eval.jsonl')];const held=new Set(ev.map(r=>normalize(r.text)));const raw=[...dir('data/intents'),...read('data/shell/train.jsonl')];let counts={},totals={};for(const r of raw.filter(r=>"'!held.has(normalize(r.text)))){totals[r.intent]=(totals[r.intent]||0)+1;for(const f of new Set(triggeredFlags(r.text,FAMILY_OF[r.intent])))((counts[r.intent]??={})[f]=(counts[r.intent][f]||0)+1);}
const current=JSON.parse(fs.readFileSync('"'model/compose_explained.json'));const diff=[];for(const id of new Set([...Object.keys(counts),...Object.keys(current)])){const clean=Object.entries(counts[id]||{}).filter(([,n])=>n/totals[id]>=.05).map(([f])=>f).sort();if(JSON.stringify(clean)"'!==JSON.stringify(current[id]||[]))diff.push({id,current:current[id],clean});}console.log('"'raw heldout rows',raw.filter(r=>held.has(normalize(r.text))).length,'changed intent explanations',JSON.stringify(diff));
JS" in /workspace/tellsh
 succeeded in 1301ms:
raw heldout rows 540 changed intent explanations [{"id":"process_tree","current":["--forest","-ef"],"clean":["--forest","-ef","aux"]},{"id":"git_status","current":["diff --stat","log --stat"],"clean":["diff --staged","diff --stat","log --stat"]},{"id":"git_log","current":["log --graph","log -n"],"clean":["branch -v","log --graph","log --oneline","log -n"]},{"id":"git_stash","clean":["log --graph"]},{"id":"docker_images","clean":["images -a","ps -a"]}]

exec
/bin/bash -lc "git status --short; nl -ba scripts/gen_data.js | sed -n '104,143p'; nl -ba src/tagger.js | sed -n '101,112p'" in /workspace/tellsh
 succeeded in 0ms:
?? review/
   104	    ...readJsonl(join(ROOT, 'data', 'shell', 'eval.jsonl')).map((r) => r.text),
   105	    ...readJsonl(join(ROOT, 'data', 'history', 'eval.jsonl')).map((r) => r.query),
   106	    ...readJsonl(join(ROOT, 'data', 'compose', 'eval.jsonl')).map((r) => r.text),
   107	    ...readJsonl(join(ROOT, 'data', 'slots', 'gold.jsonl')).map((r) => r.text),
   108	    ...readJsonl(join(ROOT, 'data', 'ood_eval.jsonl')).map((r) => r.text),
   109	  ].map(normalize));
   110	
   111	  const intentRows = [...readDir(join(ROOT, 'data', 'intents')), ...readJsonl(join(ROOT, 'data', 'train.jsonl'))]
   112	    .map((r) => ({ ...r, src: 'intents' }));
   113	  const shellRows = readJsonl(join(ROOT, 'data', 'shell', 'train.jsonl')).map((r) => ({ ...r, src: 'shell' }));
   114	  for (const r of [...intentRows, ...shellRows]) if (!ids.has(r.intent)) throw new Error(`unknown intent ${r.intent}: ${r.text}`);
   115	
   116	  // teacher review decisions (data/teacher/decisions.jsonl): drop or relabel individual training rows
   117	  const decisions = readJsonl(join(ROOT, 'data', 'teacher', 'decisions.jsonl')).filter((d) => d.text && d.field !== 'risk');
   118	  const decide = new Map(decisions.map((d) => [normalize(d.text), d]));
   119	  let dropped = 0;
   120	  let teacherDropped = 0;
   121	  const seen = new Set();
   122	  const base = [];
   123	  for (const r0 of [...intentRows, ...shellRows]) {
   124	    const n = normalize(r0.text);
   125	    if (heldOut.has(n)) { dropped++; continue; }
   126	    const d = decide.get(n);
   127	    if (d?.action === 'drop') { teacherDropped++; continue; }
   128	    const r = d?.action === 'relabel' && d.intent ? { ...r0, intent: d.intent } : r0;
   129	    const key = n + '|' + r.intent + '|' + (r.shell || '');
   130	    if (seen.has(key)) continue;
   131	    seen.add(key);
   132	    base.push(r);
   133	  }
   134	
   135	  const cls = createWriteStream(join(outDir, 'cls.jsonl'));
   136	  const tag = createWriteStream(join(outDir, 'tag.jsonl'));
   137	  const counts = { cls: 0, tag: 0, bySrc: {} };
   138	  let gid = 0;
   139	  const emit = (text, family, intent, extras, w, g, lang, group) => {
   140	    const f = [...vectorize(text, DIM, extras).entries()].sort((a, b) => a[0] - b[0]).map(([k, v]) => [k, +v.toFixed(6)]);
   141	    cls.write(JSON.stringify({ y: family, i: intent || '', f, w, g, lang: lang || '', gid: group }) + '\n');
   142	    counts.cls++;
   143	    counts.bySrc[g] = (counts.bySrc[g] || 0) + 1;
   101	// ---------- span normalisation (regex parsers reused on the span text) ----------
   102	
   103	// generic nouns the tagger sometimes marks as a bare directory name ("ile zajmuje folder /etc")
   104	const GENERIC = /^(folder\w*|katalog\w*|director(y|ies)|dirs?|files?|plik\w*|archiw\w*|archives?|the|this|that|ten|ta|to|tego|tym|it|path|sciezk\w*|repo|project|projekt\w*|system\w*|dysk\w*|disk|location|lokalizacj\w*|miejsc\w*)$/;
   105	
   106	export function normPath(s) {
   107	  const t = s.replace(/[.,;:!?]+$/, '');
   108	  if (GENERIC.test(foldKeepLength(t).toLowerCase())) return null;
   109	  const ex = extractSlots(t);
   110	  if (ex.paths.length === 1) return ex.paths[0];
   111	  if (/^[\w~./@+-][\w~./@+ -]*$/.test(t) && !/\s/.test(t)) return t;
   112	  return null;

codex
Found **10 major and 2 minor issues** across runtime, training, data generation, and evaluation.

1. **major — Implicit history resolution bypasses `--yes` protection.**  
   [src/pipeline.js:209](/workspace/tellsh/src/pipeline.js:209), [src/cli.js:187](/workspace/tellsh/src/cli.js:187)  
   Filling missing slots from history leaves `method: 'catalog'`. With history `cat notes.txt`, `count words` produces `wc -w notes.txt`, marked safe/catalog, so it passes the auto-run gate. Mark every history-derived suggestion accordingly and check slot provenance before auto-running.

2. **major — Ambiguous history can fall back to a stale destructive target.**  
   [src/pipeline.js:206](/workspace/tellsh/src/pipeline.js:206)  
   `entityForSlot()` returns null for an ambiguous latest entity, but the fallback retrieves an older `ctx.last.slots` value. Reproduced: history `['cat old.txt', 'frobnicate new.txt']`, request `delete file` → `rm old.txt`. Distinguish “absent” from “ambiguous” and prohibit fallback for the latter.

3. **major — Compound history lines select the first target instead of the latest.**  
   [src/history.js:300](/workspace/tellsh/src/history.js:300), [src/history.js:395](/workspace/tellsh/src/history.js:395)  
   Segments are processed forwards while entities use `??=`, preserving the first occurrence. Both `cat old.txt; cat new.txt` and `cat old.txt; cat $F`, followed by `delete it`, produce `rm old.txt`. Later segments must supersede earlier entities, including with ambiguity markers.

4. **major — Path normalization changes deletion targets.**  
   [src/slots.js:212](/workspace/tellsh/src/slots.js:212), [src/tagger.js:107](/workspace/tellsh/src/tagger.js:107)  
   Trailing dots are stripped from paths. Reproduced: `delete file /tmp/data.` → `rm /tmp/data`; `delete directory /tmp/cache/..` → `rm -r /tmp/cache/`. Preserve filesystem path components; ambiguous punctuation must not silently redirect destructive commands.

5. **major — Augmentation and anaphora bypass held-out filtering.**  
   [scripts/gen_data.js:160](/workspace/tellsh/scripts/gen_data.js:160), [scripts/gen_data.js:178](/workspace/tellsh/scripts/gen_data.js:178)  
   Filtering applies to base rows before augmentation; generated replacements and anaphora are emitted without checking the held-out set. An in-memory generation audit found **162 classifier rows matching 37 distinct normalized evaluation texts**: 24 augmented rows and 138 anaphora rows. Apply the exclusion check to every emitted classifier and tagger example.

6. **major — Composer training reintroduces excluded evaluation rows.**  
   [scripts/build_triggers.js:53](/workspace/tellsh/scripts/build_triggers.js:53)  
   The explained-flag table reads raw training files, bypassing held-out exclusions and teacher decisions. It consumes **540 rows** that `gen_data.js` excludes for evaluation collisions. Removing those rows changes five intents’ explained-flag sets, demonstrating an actual effect on runtime routing. Build all learned artifacts from the same filtered training corpus.

7. **major — Calibration groups split copies of the same anaphora example.**  
   [scripts/gen_data.js:176](/workspace/tellsh/scripts/gen_data.js:176), [scripts/train.py:194](/workspace/tellsh/scripts/train.py:194)  
   Each of three context variants receives a different `gid`. Replaying the configured split against existing build data found **101/254 triplets crossing the train/holdout boundary**, with 115 holdout rows having the same phrase and label in training. Assign one group to the variants before sampling environments and context.

8. **major — “Held-out” value pools contain training values.**  
   [scripts/lib/silver.js:101](/workspace/tellsh/scripts/lib/silver.js:101), [scripts/lib/silver.js:139](/workspace/tellsh/scripts/lib/silver.js:139), [scripts/gen_data.js:162](/workspace/tellsh/scripts/gen_data.js:162)  
   Pool partitioning only separates replacement choices. Original training examples still include evaluation-pool values such as `/etc/hosts` and `~/.bashrc`; numeric, size, and duration generation also shares ranges across splits. Consequently, the reported experiment does not establish generalization to unseen values. Enforce value exclusion throughout training or relabel the metric.

9. **major — End-to-end evaluation credits incomplete commands.**  
   [scripts/eval.js:251](/workspace/tellsh/scripts/eval.js:251), [scripts/eval.js:258](/workspace/tellsh/scripts/eval.js:258)  
   Gold commands come from the production extraction/rendering path, and equality is checked without requiring complete slots. Reproducing the evaluation found **52 incomplete gold commands, with 33 credited as successful full-pipeline answers**. For example, a request mentioning `parseConfig` is credited for producing `grep -rn -- <PATTERN> /etc`. Validate gold commands independently and require complete, executable suggestions for success.

10. **major — Jev intent verification exposes the label through the command.**  
    [scripts/teacher.js:88](/workspace/tellsh/scripts/teacher.js:88), [scripts/teacher.js:104](/workspace/tellsh/scripts/teacher.js:104)  
    The command is rendered using the supplied training label and then included in the shared state for the intent-choice question. This reveals the proposed answer through its command semantics, compromising independent label verification and the interpretation of 100% agreement. Ask the intent question using only the request; provide the command separately for correctness and risk assessment.

11. **minor — Command comparison erases expansion semantics.**  
    [scripts/lib/cmdnorm.js:61](/workspace/tellsh/scripts/lib/cmdnorm.js:61)  
    Mapping tokens through `rawOf()` discards expansion/glob markers. Confirmed: `sameCmd("find . -name '*.log'", "find . -name *.log")` and `sameCmd("echo '$HOME'", "echo $HOME")` both return true. These commands behave differently; preserve expansion information when comparing evaluation answers.

12. **minor — Teacher reports hard-code successful review conclusions.**  
    [scripts/teacher.js:163](/workspace/tellsh/scripts/teacher.js:163)  
    Every regenerated report asserts “no disagreement” and “0 training rows dropped or relabelled,” regardless of current results or decisions. It also attributes command failures to previously fixed bugs unconditionally. Derive these statements from the current artifacts.

No files changed. Danger, parity, and slot test suites passed; full-suite verification encountered `EPERM` subprocess and `EROFS` temporary-file restrictions. Evaluation/generation findings above were reproduced in memory with writes disabled. Benchmark code was reviewed; no separate benchmark defect is asserted.

VERDICT: REQUEST_CHANGES
tokens used
193,392
Found **10 major and 2 minor issues** across runtime, training, data generation, and evaluation.

1. **major — Implicit history resolution bypasses `--yes` protection.**  
   [src/pipeline.js:209](/workspace/tellsh/src/pipeline.js:209), [src/cli.js:187](/workspace/tellsh/src/cli.js:187)  
   Filling missing slots from history leaves `method: 'catalog'`. With history `cat notes.txt`, `count words` produces `wc -w notes.txt`, marked safe/catalog, so it passes the auto-run gate. Mark every history-derived suggestion accordingly and check slot provenance before auto-running.

2. **major — Ambiguous history can fall back to a stale destructive target.**  
   [src/pipeline.js:206](/workspace/tellsh/src/pipeline.js:206)  
   `entityForSlot()` returns null for an ambiguous latest entity, but the fallback retrieves an older `ctx.last.slots` value. Reproduced: history `['cat old.txt', 'frobnicate new.txt']`, request `delete file` → `rm old.txt`. Distinguish “absent” from “ambiguous” and prohibit fallback for the latter.

3. **major — Compound history lines select the first target instead of the latest.**  
   [src/history.js:300](/workspace/tellsh/src/history.js:300), [src/history.js:395](/workspace/tellsh/src/history.js:395)  
   Segments are processed forwards while entities use `??=`, preserving the first occurrence. Both `cat old.txt; cat new.txt` and `cat old.txt; cat $F`, followed by `delete it`, produce `rm old.txt`. Later segments must supersede earlier entities, including with ambiguity markers.

4. **major — Path normalization changes deletion targets.**  
   [src/slots.js:212](/workspace/tellsh/src/slots.js:212), [src/tagger.js:107](/workspace/tellsh/src/tagger.js:107)  
   Trailing dots are stripped from paths. Reproduced: `delete file /tmp/data.` → `rm /tmp/data`; `delete directory /tmp/cache/..` → `rm -r /tmp/cache/`. Preserve filesystem path components; ambiguous punctuation must not silently redirect destructive commands.

5. **major — Augmentation and anaphora bypass held-out filtering.**  
   [scripts/gen_data.js:160](/workspace/tellsh/scripts/gen_data.js:160), [scripts/gen_data.js:178](/workspace/tellsh/scripts/gen_data.js:178)  
   Filtering applies to base rows before augmentation; generated replacements and anaphora are emitted without checking the held-out set. An in-memory generation audit found **162 classifier rows matching 37 distinct normalized evaluation texts**: 24 augmented rows and 138 anaphora rows. Apply the exclusion check to every emitted classifier and tagger example.

6. **major — Composer training reintroduces excluded evaluation rows.**  
   [scripts/build_triggers.js:53](/workspace/tellsh/scripts/build_triggers.js:53)  
   The explained-flag table reads raw training files, bypassing held-out exclusions and teacher decisions. It consumes **540 rows** that `gen_data.js` excludes for evaluation collisions. Removing those rows changes five intents’ explained-flag sets, demonstrating an actual effect on runtime routing. Build all learned artifacts from the same filtered training corpus.

7. **major — Calibration groups split copies of the same anaphora example.**  
   [scripts/gen_data.js:176](/workspace/tellsh/scripts/gen_data.js:176), [scripts/train.py:194](/workspace/tellsh/scripts/train.py:194)  
   Each of three context variants receives a different `gid`. Replaying the configured split against existing build data found **101/254 triplets crossing the train/holdout boundary**, with 115 holdout rows having the same phrase and label in training. Assign one group to the variants before sampling environments and context.

8. **major — “Held-out” value pools contain training values.**  
   [scripts/lib/silver.js:101](/workspace/tellsh/scripts/lib/silver.js:101), [scripts/lib/silver.js:139](/workspace/tellsh/scripts/lib/silver.js:139), [scripts/gen_data.js:162](/workspace/tellsh/scripts/gen_data.js:162)  
   Pool partitioning only separates replacement choices. Original training examples still include evaluation-pool values such as `/etc/hosts` and `~/.bashrc`; numeric, size, and duration generation also shares ranges across splits. Consequently, the reported experiment does not establish generalization to unseen values. Enforce value exclusion throughout training or relabel the metric.

9. **major — End-to-end evaluation credits incomplete commands.**  
   [scripts/eval.js:251](/workspace/tellsh/scripts/eval.js:251), [scripts/eval.js:258](/workspace/tellsh/scripts/eval.js:258)  
   Gold commands come from the production extraction/rendering path, and equality is checked without requiring complete slots. Reproducing the evaluation found **52 incomplete gold commands, with 33 credited as successful full-pipeline answers**. For example, a request mentioning `parseConfig` is credited for producing `grep -rn -- <PATTERN> /etc`. Validate gold commands independently and require complete, executable suggestions for success.

10. **major — Jev intent verification exposes the label through the command.**  
    [scripts/teacher.js:88](/workspace/tellsh/scripts/teacher.js:88), [scripts/teacher.js:104](/workspace/tellsh/scripts/teacher.js:104)  
    The command is rendered using the supplied training label and then included in the shared state for the intent-choice question. This reveals the proposed answer through its command semantics, compromising independent label verification and the interpretation of 100% agreement. Ask the intent question using only the request; provide the command separately for correctness and risk assessment.

11. **minor — Command comparison erases expansion semantics.**  
    [scripts/lib/cmdnorm.js:61](/workspace/tellsh/scripts/lib/cmdnorm.js:61)  
    Mapping tokens through `rawOf()` discards expansion/glob markers. Confirmed: `sameCmd("find . -name '*.log'", "find . -name *.log")` and `sameCmd("echo '$HOME'", "echo $HOME")` both return true. These commands behave differently; preserve expansion information when comparing evaluation answers.

12. **minor — Teacher reports hard-code successful review conclusions.**  
    [scripts/teacher.js:163](/workspace/tellsh/scripts/teacher.js:163)  
    Every regenerated report asserts “no disagreement” and “0 training rows dropped or relabelled,” regardless of current results or decisions. It also attributes command failures to previously fixed bugs unconditionally. Derive these statements from the current artifacts.

No files changed. Danger, parity, and slot test suites passed; full-suite verification encountered `EPERM` subprocess and `EROFS` temporary-file restrictions. Evaluation/generation findings above were reproduced in memory with writes disabled. Benchmark code was reviewed; no separate benchmark defect is asserted.

VERDICT: REQUEST_CHANGES
