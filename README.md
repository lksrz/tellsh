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
| cmd.exe | best effort | 114/149 (`dir /s /b`, `tasklist`, `taskkill`, `netstat -ano | findstr`, `certutil -hashfile`, …); the rest reports a gap (exit 5) |

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
placeholder) rather than resolved to an older value. A directory that was only searched or filtered (`find /var/log
-name '*.gz'`, `grep -rl TODO src`, `Get-ChildItem DIR -Filter *.pdf`, `ls DIR | grep pdf`), or only listed when the
request says "them"/"those"/"je" (`ls /tmp/build` + "delete them"), is never the target of a changing command: the
results live inside it. "Same for X" is refused when a newer line used other targets than the command it would repeat
(or when X names nothing), and a quoted `'~/x'` from history stays the literal directory `./~/x`.

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
| stage 1 tool family top-1 / top-3 (`data/eval`, 2384 EN+PL) | **97.2% / 99.7%** |
| stage 2 intent top-1 (EN / PL) | **95.6%** (95.2% / 96.1%); v0.1 flat classifier: 95.2% |
| per shell, intent top-1 (bash · zsh · sh · PowerShell · fish · cmd) | 95.6 · 95.6 · 95.7 · 95.2 · 95.8 · 95.7% |
| renders passing `bash -n` / `sh -n` | 148/148 bash · zsh · sh (+ all 149 intents × 5 POSIX envs in `npm test`) |
| slot F1, hand-annotated gold (tagger + regex fallback / tagger / regex) | **96.3%** / 94.6% / 95.1% |
| end-to-end exact command, relexicalised held-out values (full pipeline / gold intent) | **85.3%** / 93.9% |
| blind sets (v0.3, separate author): intent top-1 · end-to-end exact command | 98.8% (clean subset 98.6%) · 96.1% (clean 96.0%) |
| hand-written slot cases, exact command | 99/99 |
| history references, exact command (48 EN+PL; without history 0%) | **97.9%** (dev set, blind first run 60.4%) · v0.3 blind set (79): 82.3% |
| composer on out-of-catalogue requests: acceptable / exact | 49.0% / 47.1% (dev set) · any answer acceptable 52.9% · v0.3 blind set (58): acceptable 22.4% · false fires on catalog requests 0.5% |
| out-of-domain rejected | 94.6% (blind set 100%) |
| model size | **2.71 MB** (v0.1: 3.68 MB) |
| latency, `taskset -c 0`: cold process p50 / p95 | **158 / 187 ms** (bare `node -e 0`: 72 ms) |
| latency, warm full cascade + tagger + render p50 / p95 | **0.30 / 2.1 ms** |

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
