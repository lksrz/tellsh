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
  composed (experimental) ls · bash/linux · risk: high · confidence: 100%
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
      --history[=FILE] resolve "it", "that container", "same for /var" from the previous command
      --compose / --no-compose   force / disable the experimental composer
      --top <k>, --threshold <p>, -v/--version, -h/--help
```

At the prompt: **Enter** runs a safe command, **e** edits (prefilled readline), **n** aborts. A medium-risk command never
runs on a plain Enter: it needs **y**. High-risk and composed commands need `yes`; catastrophic patterns (`rm -rf /`, `mkfs`, `Format-Volume`, …) need the whole command retyped. The command
runs in the target shell (`$SHELL -c`, `fish -c`, `pwsh -NoProfile -Command`, `cmd /d /s /c`). Without a TTY tellsh
only prints. Exit codes: command's own · `0` printed · `2` usage · `3` not understood · `4` `--yes` refused ·
`5` no rendering for this shell · `130` aborted.

Quoting: the whole request may be one argument (`tellsh "delete folder /tmp/x"`). Among several arguments, one with a
space is a value when it starts like a path (`tellsh delete folder "/tmp/a b"`) or, after the first argument, looks
like a file name (`"My Notes.txt"`, `"data/my notes.txt"`), and request text when it comes first
(`tellsh "delete folder" /tmp/x`). Anything else is unclear: `tellsh delete folder "my data"`, and arguments that mix
request words with a path (`delete "folder /tmp/x"`, `delete "the file notes.txt"`, `usuń "plik raport.pdf"`, a space
before the first `/`). A changing command leaves that path (or name) as a placeholder, with a warning.

Unquoted paths with spaces (v0.3 close4): a path or name is never cut at its first space. `delete the folder ~/Old
Projects` gives `rm -r ~/'Old Projects'`: the words after a path up to the end of its span (the end of the request, a
connector like `to` / `do`, a modifier like `recursively` / `please`, a noun like `folder` / `files`) are part of its
name. When that end is unclear (another file name follows, `delete file /tmp/a.txt b.txt`, or name words run into other
words of the request) a changing command shows the path as a placeholder with a warning. A read-only command takes an
explicit path to the end of the request (`list files in ~/Old Projects`) and otherwise keeps the first reading
(`which folder in node_modules is the largest`). Quote the path to be sure.

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
   ▼                                              ▼    · risk high · explicit "yes"
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
  A path the request names but that fails validation (a function word: "in the", "in there"; a name with a newline;
  a place reference such as "there") stays `<PATH>`; it is never silently replaced by the default `.`.

### Shells and operating systems

The intent and slots are shared; only the rendering differs (`src/render.js`, variants in `src/variants.js`).

| shell | status | notes |
|---|---|---|
| bash, zsh | **v1** | all 173 intents; every render passes `bash -n` in tests (zsh has no checker here) |
| sh (dash / busybox) | **v1** | POSIX-only templates; tests run `sh -n` (dash) and `busybox sh -n`; busybox variants for 24 intents (no `ps --sort`, `find -printf`, …) |
| PowerShell (7, mostly 5.1) | **v1** | real cmdlets (`Get-ChildItem`, `Get-Process`, `Stop-Process`, `Get-NetTCPConnection`, …) for 170/173 on Windows; on Linux/macOS native tools or `bash -c '…'`; gaps: chmod, chmod +x, cal on Windows |
| fish | best effort | POSIX template with fish quoting + fish overrides (`string join \n $PATH`, history, …); not syntax-checked (fish not installed in CI) |
| cmd.exe | best effort | 140/173 (`dir /s /b`, `tasklist`, `taskkill`, `netstat -ano | findstr`, `certutil -hashfile`, …); the rest reports a gap (exit 5) |

* **macOS** = BSD userland unless Homebrew GNU coreutils (`gdu` + `gsort`) are on `PATH`: `du -k … | sort -rn` instead of
  `sort -h`, `sed -i ''`, `stat -f`, `md5 -r`, `lsof` instead of `ss`, `vm_stat`, `launchctl`/`brew services`, …
* **Detection** (`src/env.js`): parent process chain on Linux (`/proc`), PowerShell heuristic on Windows (`PSModulePath`),
  `$SHELL`, `TELLSH_SHELL`; `--shell` / `--os` override. `--shell cmd` implies Windows.

### Developer tools (v0.4)

Added from real command usage: `npm run <script>`, `npm install [pkg]`, `npm install -g`, `pip install`
(`py -m pip` on Windows), activating a virtualenv (per shell), `<tool> --version` / `--help`, printing a line range
(`sed -n 'N,Mp'`, `Get-Content … -Index` in PowerShell), SSH local port forwarding, Cloudflare `wrangler`
(deploy, dev, tail, secret put, login, whoami; a dry run and an environment are kept, `do a dry run of wrangler deploy` ->
`npx wrangler deploy --dry-run`, `deploy worker to staging` -> `npx wrangler deploy --env staging`, `for production` ->
`--env production`, a custom name whole, also quoted, `to staging-eu`, `to "preview2"` -> `--env staging-eu` / `preview2`; an
unreadable one or one it would have to guess, `deploy worker env`, `with env vars`, `for testing`, `for the qa team`, `to v2`,
gives `--env <WENV>`) and the GitHub CLI (`gh auth`, `gh pr list/view/create/checks/merge`,
`gh run list/view`; a pull request the request names, by number, URL or branch, is passed on: `gh pr merge
feature/login`, also quoted, `merge pull request "feature/login"`, never a bare `gh pr merge` for the current branch's
pull request; a word that may not be a branch, `merge pr main`, gives `gh pr merge <PR>`, while `feature/apply` or
`hotfix/weekly` are kept; a number counts only next to "pr" (`pr 45`, `pr #45`) or as `#45` right after the verb: `merge pr with 2 approvals`,
`merge pr for issue #45` and `merge the pr that closes #12` give `gh pr merge <PR>`; so do a pull request picked out by
a word before "pr" or by a label or title (`merge the dependabot pr`, `merge dependabot pr`, `merge alice's pr`, `merge said pr`,
`merge the pr with label urgent`, `merge the pr with title "fix-login"`) or after "pr" (`merge pr for the login fix`,
`merge pr: fix login`, `merge pr with dependabot`), and a related pull request's URL (`merge the pr that depends on
https://github.com/o/r/pull/12`); plain `merge the pr`, `merge pr on github` stay `gh pr merge`); "merge that pr" after `gh pr view 45`
gives `gh pr merge 45`, after any other command, a trailing `cd` or under `GH_REPO` `gh pr merge <PR>`; `merge the other pr`
or `merge my last pr` give `gh pr merge <PR>`; a named repository is kept, `merge pr 45 in repo a/b` -> `gh pr merge 45 --repo a/b`). A package version constraint is kept
(`install requests==2.32.0 with pip` -> `python3 -m pip install requests==2.32.0`). "Install the project dependencies"
is `npm install` (never `npm install dependencies` / `project` / `npm`), "npm ci" / "a clean install" is `npm ci`.

**Selector rule (v0.3, gh and wrangler).** A gh / wrangler request is read against a closed vocabulary: every word must
be a command word of the tool family (`merge`, `pr`, `worker`, `deploy`, `logs`, …), a function word, a shell name, or
part of a value that was read (pull request number / URL / branch, `--repo` repository, environment, secret name). A
word that nothing explains — a description, a picked-out item, a quoted or uncertain name — withholds the selector
as a placeholder you fill before running, never a guess and never a bare command: `merge the pr about auth` ->
`gh pr merge <PR>`, `deploy worker in preview2` -> `npx wrangler deploy --env <WENV>`, `create a pr into develop` /
`list closed prs` -> `gh pr create --fill <ARGS>` / `gh pr list <ARGS>`. An explicit value stays unless another one
competes with it (`merge pr 45 or 46` -> `<PR>`), and an environment the request excludes is never the target
(`deploy worker but not to production` -> `--env <WENV>`).

**Contested selectors (v0.3 close3).** When a request offers an alternative for a selector or negates one (`or`, `albo`,
`lub`, `either`, `instead`, `zamiast`, `not`, `but not`, `don't`, `never`, `nie`, `oprócz`, `poza`, `except`,
`without`, …: the selector value nearest after it within five words of the same clause, and for an alternative also
the one nearest before it), or names two candidate values for one slot, that slot is rendered as a placeholder,
never one of the candidates: `merge pr 4 or 44` -> `gh pr merge <PR>`, `merge pr 42 but not in repo acme/app` ->
`gh pr merge 42 --repo <REPO>`, `deploy worker --env prod --env prodprod` / `deploy to prod, not staging` /
`wdróż na produkcję, nie na staging` -> `--env <WENV>`, `install axios or lodash with npm` -> `npm install <PKG>`. Slots:
pull request, run number, environment, repository and secret name (gh / wrangler), the package of `npm install` /
`npm install -g` / `pip install` and the `npm run` script. A negation that describes a state (`co poszło nie tak`,
`not passing`) is not one; `… and don't delete the branch` gives no `--delete-branch`. `--env` is kept for `wrangler dev/tail/secret put` too,
`--repo` for `gh pr create/list` and `gh run list/view`, and `merge pr 45 and delete the branch` gives
`gh pr merge 45 --delete-branch`. Installs, project scripts (also every `npx wrangler` command: `npx` prefers a project-local binary,
and `wrangler dev` runs the project's build command), deploys, merges, secrets and tunnels are `medium` risk, so `--yes`
never runs them.

**Scope options (v0.3 close4).** A dev-tool request that says where its command acts keeps it or gets a placeholder,
never the default scope: an npm workspace (`--workspace api`, `-w api`, `in workspace api`) is rendered as
`--workspace api`; a repository (`--repo a/b`, `-R a/b`, `in repo a/b`, `in project a/b`) as gh `--repo` (`merge pr 42
in project acme/backend` -> `gh pr merge 42 --repo acme/backend`, an unreadable one `--repo <REPO>`); a wrangler
environment as `--env`. A scope the command cannot express (`npm run deploy --env prod`, `--prefix`, `--config`, `in
project api` for npm, `--env` for gh) is a `<SCOPE>` placeholder (`<ARGS>` for wrangler), never dropped.
A quoted value is one value (`--workspace "staging app"` -> `--workspace 'staging app'`), and pip's install directory is
kept (`pip install requests --target /tmp/packages`, also `-t`) (v0.3 close5).

### Optional neural fallback (`--hybrid`)

`tellsh --hybrid …` (or `TELLSH_HYBRID=1`) keeps the cascade's answer when it is confident (≥ 0.9, most requests) and
otherwise re-ranks its top-5 with a small int8 encoder (pruned multilingual-e5-small, 6 layers, 27 MB, ~4 ms on one
core). It needs `onnxruntime-node` and the `tellsh-model-enc` 0.4 bundle (`enc-v2`, not in this repo); without them
tellsh silently uses the cascade. `TELLSH_HYBRID=safe` never turns a rejection into an answer. Re-ranked answers are
never auto-run with `--yes`. Details, numbers and the trade-off (fewer rejections of requests outside the catalog):
[HYBRID.md](HYBRID.md).

### History context

`--history` (or `TELLSH_HISTORY=1`) reads the **tail** (last 32 KB) of `$HISTFILE` / `~/.bash_history` /
`~/.zsh_history` (extended format and zsh metafication handled) / fish history / PSReadLine
`ConsoleHost_history.txt`, keeps the last 2 lines **in memory for this one request** and never prints, logs or
stores them. **Only the single most recent command is a reference target**: "delete it", "same for /var", "there"
always mean the previous command, never an older line (the second line is read only because zsh, fish and PSReadLine
write the running `tellsh …` call to the file before it runs; that line is dropped when it is exactly this request,
and never for bash, which writes it afterwards). When the previous command does
not name a value of the needed type ("delete it" after `ls`, "logs of that container" after `git status`, "same for
/var" after `clear`), or it cannot be read (an unparseable line, `cat $F`, `rm *.log`, an unknown command naming a
path), the reference is **refused**: the slot stays a placeholder, never an older value or a catalog default.
An earlier `tellsh <query>` line is re-interpreted (words keep their quoting, so `tellsh delete folder "/tmp/a b"`
names `/tmp/a b`); a slot it left as a placeholder is not a usable value. Raw commands are parsed (template inversion +
per-tool rules: `docker run --name`, `systemctl … X`, `kill N`, `ps -p N`, `lsof -i :P`, `git checkout`, file
arguments, global options such as `git -C DIR`/`docker --context X`, …) with a shell-aware tokenizer (`a\ b.txt`,
quoted `;`/`|`, redirections; PowerShell `''`/backtick escapes and native cmdlets such as `Get-Content -LiteralPath`,
`Remove-Item`, `Stop-Process -Id`, `Restart-Service`).

Within that one line, later segments win (`cat old.txt; cat new.txt` → `new.txt`). A changing command (rm, mv, cp
source or destination, kill, chmod, git branch -d/checkout/restore, docker stop/exec, service restart, …) takes the
value only when it is unambiguous; otherwise the slot stays a placeholder:
  * a directory that was searched, filtered or listed (`find /var/log -name '*.gz'`, `grep -rl TODO src`, `ls /tmp/build`,
    `du -d 1 DIR`, `Get-ChildItem DIR`, `ls DIR | sort | grep pdf`, `ls -S DIR | head -1`) is never the target, for
    "it" as well as "them": the user saw entries inside it;
  * a later listing of the same type in the line (`cat a.txt; ls`, `pgrep foo; ps aux`, `docker logs web; docker ps`,
    `cat a.txt; git -C /tmp status`) means "it" may be one of the listed values;
  * the directory of a `cd` is a target only when nothing ran after the `cd` in that line (`cd DIR && make`: refused);
  * the request names something else ("delete that backups folder" after `mkdir /srv/current`), or is about the
    entries of the directory ("everything in it", "its contents", "what is in it", "usuń jego zawartość"); a request
    about entries keeps its own intent (`find <PATH> … -delete`, never `rm -r .` for "delete all log files in this folder");
  * the checked-out branch is never the one deleted;
  * the command ran against another repository, directory or daemon (`git -C /repo blame notes.txt`, `git -C/repo …`,
    `git --work-tree=…`, `docker --context prod logs web`, `docker -H …`/`-Htcp://…`, `DOCKER_HOST=… docker …`) or under
    another root (`chroot /srv …`, `sudo --chroot=/srv …`, `systemd-run -p RootDirectory=/srv …`, also `BindPaths=`,
    `PrivateTmp=` and similar unit properties) or in other namespaces (`nsenter -t 1234 -p ps -p 42`,
    `nsenter -n lsof -i :8080`, `unshare …`) or on another machine / host (`systemd-run --machine=web …`, `systemd-run -H …`,
    `run0 --machine=…`, `machinectl shell …`; "kill it" would hit another pid / port here): "delete it", "stop it",
    "kill it" and "same for api" are refused, here
    they would hit something else; after a wrapper that changes the working directory (`env -C /repo cat notes.txt`,
    `sudo -D /repo …`, a login shell: `sudo -i …`, `sudo -iu bob …`, `runuser -l …`, `pkexec …`, `run0 --chdir=/srv …`,
    `run0 --user=bob …`) or a `cd` inside a `( … )` subshell (`(cd /repo && cat notes.txt)`, also a redirection there:
    `(cd /repo && echo hi > notes.txt)`; a `{ … }` group or a plain `cd` moves the user's own shell and resolves as before)
    relative paths are refused the same way (absolute ones still resolve);
  * the command has several operands (`touch a.txt b.txt`, `python3 script.py data.csv`): "it" may be any of them.
Place references ("there", "over there", "in there", a final "inside", "in the same folder", "in the previous/last
folder", "the directory I listed", "tam", "stamtąd", "w tym samym / poprzednim katalogu") are the directory of the
previous command under the same rules, only as the place a command runs in (`find DIR … -delete`, `ls DIR`, a
`cp`/`mv` destination), never as the object of `rm -r`/`mv`; a path named next to one ("delete notes.txt there") is
withheld too, with or without history, and without a usable directory the place stays `<PATH>`, never `.`. ("is there
…" / "there are …" / "still there" are not references.) "Move it there" names both ends by reference and is refused.
Wrapped commands (`sudo -u root ls`, `env ls`, `command ls`, `nice -n 5 ps aux`) are read as the command they run.
"Same for X" / "same but …" repeat the previous command only; they are refused when it cannot be repeated, when a
later segment of its line ran after the repeatable command, or when X names nothing it takes. A slot of the previous
command that depends on the shell state (`find "$DIR" …`) or fails validation (a 300-character path) stays a
placeholder, and a slot the new request withheld (`same but … in /tmp/new!`) is never refilled. A single named path
after "to"/"into"/"do" ("move them to /tmp/old", with or without history) is the destination and the source stays
`<SRC>`; with a reference in destination position ("copy notes.txt to it / into that folder / do niego"), the named
path is the source. A quoted `'~/x'` from history stays the literal directory `./~/x`.

* deterministic rules: "same for /var" / "to samo dla /var" (previous intent, one slot replaced), "delete it" /
  "usuń to", "logs of that container" / "logi tego kontenera", "kill it" / "zabij go" (verb × entity type table; a
  noun in the request picks the entity type), "same but only file names" / "to samo ale tylko nazwy plików" (previous
  tool, new intent, slots carried over), and missing required slots of safe commands filled from the previous
  command ("ile ma słów" after `cat raport.txt`);
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
**high risk (the trust rule below), shown as "composed (experimental)", needs an explicit `yes` and is refused by `--yes`**. POSIX shells only.

## Safety model

* **Trust rule (v0.3 close3).** A command is rated **safe only** when it is byte-identical to tellsh's own render of a
  catalog template whose intent is `risk=safe`, with slot values that are plain literals: no quote characters (tellsh's
  own single quotes are the only ones), no `$`, backticks or `$'…'`, no `;` `|` `&` `<` `>`, no control characters, no
  find action (`-exec`, `-ok`, `-delete`, …), no leading `-` (a path is rendered `./-x`; a raw value must pass its
  validator), and a program slot (`{cmd} --version`) is a plain program name, never a path or `source` / `.` / `eval` /
  a shell. Everything else is **at least high** and needs an explicit `yes`; `--yes` never runs it: a command you edit
  (any change; an unchanged one keeps its rating), a composed command, a command resolved from history (a replay), and
  any typed text with an unknown program (`diskutil …`), construct or sed script. A catalog render of a medium / high
  intent with plain values keeps its intent's risk; with other values it is high. The parser below (deny rules,
  allowlist) only ever raises risk, never lowers it: it gives the reasons and decides what must be retyped
  (critical), but finding nothing wrong does not make a command safe. It reads bash `$'…'` quoting (so
  `echo $'\''; rm -rf ~ #'` is critical) and flags sed scripts that run a command or write a file (`e`, `w`, `W`, `-f`).
* Every intent has a base risk: **safe** (read-only), **medium** (modifies state: archives, git checkout/pull/stash,
  chmod, mv, sudo, …), **high** (destructive: rm, kill, prune, discard). v0.2 raised 10 intents from safe to medium after
  the teacher review (see `EVAL.md`).
* **Project code (v0.3 close4).** A tool that loads code of the project it starts in is at least **medium**, also for
  `--help` / `--version`: `pytest` (imports `conftest.py`), `make`, `cargo`, `npx`, `wrangler`, `yarn` (`yarnPath`),
  `tox`, `gradle`, `mvn`, `rake`, `just`; `npm` / `pnpm` / `bun` / `poetry` / `uv` / `bundle` / … with a subcommand
  (`npm run …`, `npm test`, `poetry run …`); `go` with
  a subcommand other than `version` / `help` / `env`; `node` / `python` with a script or `-m`. So `show the help for
  pytest` is `pytest --help`, medium, and `--yes` does not run it; `node --version`, `npm --help` stay safe.
* **Allowlist (v0.3).** Only the commands, subcommands and flags tellsh itself renders are trusted
  (`src/allowlist-data.js`, generated from every catalog template for every shell by `scripts/build_allowlist.js`; a test
  fails when it is stale). Any **wrapper** (`sudo`, `env CMD`, `timeout`, `nohup`, `xargs`, `bash -c`, `ssh host CMD`,
  …), an environment assignment in front of a command (`FOO=1 cmd`), an **unknown program** (`mywrap`, `cowsay`), an
  **unknown subcommand** (`git filter-branch`, `npx cowsay`, `gh pr close`) or an **unknown flag** for a known command
  (`gh pr merge --admin`, `git push --force-with-lease`, `rm -P`) makes the command **high** risk, with the reason, so
  it needs an explicit `yes`. Known option clusters (`ls -la` when `-l` and `-a` are known) and attached numbers
  (`tail -n5`) count as known. The composer's commands add the flags it validated against its tool vocabulary. Under
  the trust rule it no longer decides whether a typed or edited command is safe (none is); it raises catalog renders
  and adds reasons. Consequence: every catalog command that goes through `sudo` (service start/stop,
  `apt install`, `chown`, `dmesg`, …) is high and needs `yes`.
* `src/danger.js` also scans the **final** command — also edited ones — with deny rules, and can only escalate. It tokenizes each simple
  command (quotes, `--`, long options) and checks every command it may run: after a wrapper (`sudo`, `doas`, `su`,
  `runuser`, `pkexec`, `flock`, `nice`, `ionice`, `timeout`, `stdbuf`, `nohup`, `setsid`, `env`, `xargs`, `chrt`, `cgexec`,
  `eatmydata`, `torsocks`, `catchsegv`, `parallel`, `tmux`, …) the command starting at **every** later non-option word,
  so unknown wrapper options cannot hide it; the remote command of `ssh host …` and `docker/kubectl exec …`; and any
  `-c`/`--command`/`--command=` string (`bash -lc '…'`, `su -c '…'`, `script -c '…'`, `find … -exec sh -c '…'`,
  `env -S '…'`, `eval`, `cmd /c`, `pwsh -Command`). Unsure is high: a command name or a runner's command string that
  depends on the shell state (`$CMD -rf /`, `sh -c "$X"`, `eval "$X"`), `pwsh -EncodedCommand`, and text piped into a
  shell (`… | sh`, `… | iex`), inline interpreter code (`python3 -c`, `perl -e`, `ruby -e`, `node -e`, `php -r`, awk
  programs calling `system()`; their string literals are checked as commands and `shutil.rmtree('/')`-style calls on
  `/`, `~` or system directories are critical), and an unknown program followed by a destructive command
  (`mywrap rm -rf /`). `chmod`/`chown` of `/` or a top-level system directory (even without `-R`) and `tee`/`cp` onto a
  whole disk device (`… | sudo tee /dev/sda`) are critical, and so is deleting, overwriting or editing in place a
  system file under `/etc`, `/boot`, `/usr`, `/bin`, `/sbin`, `/lib*` (`rm`, `unlink`, `sed -i`, `perl -i`, `tee`
  without `-a`, `dd of=`, `cp`/`install`/`mv`/`ln -f` onto it, `chmod 000`). Switching user (`su`, `runuser`, `pkexec`) is at least medium, like `sudo` (high by the allowlist). It
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
* `--yes` only runs `safe` commands, i.e. fresh catalog renders with plain values (the trust rule): never
  history-resolved, composed, edited, incomplete or medium/high-risk ones. Non-TTY use prints only.

## Accuracy & speed (details: [EVAL.md](EVAL.md))

All numbers are on held-out data never used for training (`npm run eval`, `npm run bench`). v0.4 trades a little on
the public sets for a large gain on real usage (before/after tables for A, A+B and A+C-ft: [HYBRID.md](HYBRID.md#v04-real-usage)):

| metric | result |
|---|---|
| stage 1 tool family top-1 / top-3 (`data/eval`, 2384 EN+PL) | **96.9% / 99.8%** |
| stage 2 intent top-1 (EN / PL) | **95.4%** (95.2% / 95.6%); v0.3: 95.6% |
| per shell, intent top-1 (bash · zsh · sh · PowerShell · fish · cmd) | 95.4 · 95.6 · 95.6 · 95.4 · 95.1 · 95.1% |
| renders passing `bash -n` / `sh -n` | all 173 intents × 5 POSIX envs in `npm test` |
| slot F1, hand-annotated gold (tagger + regex fallback / tagger / regex) | **96.3%** / 94.6% / 95.4% |
| end-to-end exact command, relexicalised held-out values (full pipeline / gold intent) | **83.4%** / 92.6% (v0.3: 85.3%) |
| blind sets (v0.3, separate author): intent top-1 · end-to-end exact command | 98.8% (clean subset 98.5%) · 95.7% |
| hand-written slot cases, exact command | 98/99 |
| history references, exact command (53 EN+PL; only the previous command is a target) | **92.5%** (dev set, blind first run 60.4%) · v0.3 blind set (79): 82.3% (2 gold rows changed for the one-line rule, see EVAL.md) |
| composer on out-of-catalogue requests: acceptable / exact | 43.1% / 41.2% (dev set) · any answer acceptable 49.0% · v0.3 blind set (58): acceptable 17.2% · false fires on catalog requests 0.7% |
| out-of-domain rejected | 92.4% (blind set 98.4%) |
| **real usage** (private, held-out command groups, 2957 EN+PL): intent, A · A+B (`--hybrid`) | **82.0% · 88.8%** (v0.3: 31.6% · 38.5%) |
| v0.4 intents, independent eval set (424 rows): intent · exact command | **95.8%** · 91.0% |
| model size | **2.95 MB** (v0.3: 2.71 MB) |
| latency, `taskset -c 0`: cold process p50 / p95 | **205 / 272 ms** (shared, loaded box; bare `node` 112 ms) |
| latency, warm full cascade + tagger + render p50 / p95 | **0.45 / 4.7 ms** |

## Data & licenses

**Private real-usage data (v0.4).** The shipped weights were also trained on a private set of real shell commands
(EN/PL requests written for each command, labels partly by command pattern, partly by an LLM pipeline; see
[HYBRID.md](HYBRID.md#v04-real-usage)). The data and anything verbatim derived from it stay outside git: it is read
from `$TELLSH_REAL_DATA` by `scripts/real/prepare_real.js` into `build/real/` (gitignored); only model weights and
aggregate numbers are committed. Without the file every script trains and evaluates on public data only
(`gen_data.js --no-real` forces this).

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
~60 paraphrases in `data/intents/`, ~16 eval rows written by someone else (`data/eval_v04/` for the v0.4 intents);
retrain; `npm test && npm run eval`.

## Known limits

* **The selector rule trades recall for safety.** Its vocabulary is closed and hand-written (English and Polish): a
  harmless paraphrase with a word it does not list (`deploy the api worker to cloudflare`, `run the worker on
  localhost:8787`) gets a placeholder (`<ARGS>`, `<WENV>`) you have to fill or delete. On the 1097 gh / wrangler
  phrasings of the training and dev-tools eval data, 103 now end in a placeholder (57 before). Options the commands do
  not render (`--draft`, `--base`, `--label`, `--state`, `--squash`, `--port`, `--hostname`) are never added: their
  requests get `<ARGS>`. Words the vocabulary does list are trusted, so a selector hidden in one of them (e.g.
  "merge the pr into main" reads "main" as the merge base, not as a pull request) is not caught.
* The selector rule covers gh and wrangler only (plus `npm install` dependency words). Other intents still read their
  slots with the per-slot parsers: a descriptive word can still become a value there (`install the testing library`
  -> `python3 -m pip install testing`). Read the command before running it.
* `<ARGS>`, `<WENV>` and `<SCOPE>` are placeholders, not values: tellsh never runs an incomplete command; edit it (`e`) first.
* **Unquoted paths with spaces are read with word lists (close4).** Request words that are not on the lists can become
  part of a name (`delete folder /tmp/build output` -> `rm -r '/tmp/build output'`, a name that most likely does not
  exist), and a noun right after a path ends it (`extract a.tar.gz to /tmp/my dir` -> `-C /tmp/my`). A name with an
  extension is taken as whole (`rm /tmp/notes.txt` for `… notes.txt permanently`). Quote paths with spaces.
* **Scope options are read for npm, pip, gh and wrangler only**, from `--workspace` / `--repo` / `--env` / `--config` /
  `--prefix` / `--filter` / `--cwd` / `--project` (plus `-w` npm, `-R` gh, `-e` / `-c` wrangler) and "in workspace /
  repo / project / environment / config X"; other phrasings of a scope (`for the api package`) are not seen.
* **The trust rule is deliberately blunt.** Every edit, however harmless (`ls -la` -> `ls -l`), every history replay
  (`same for /var`, `count lines in it`) and every composed command is high and needs `yes`; a safe request with an
  unusual value (a file name with a quote, `$` or `&`, a grep pattern starting with `-`) is high too.
* **The allowlist knows only what the catalog renders.** A command you type or edit with a flag tellsh never emits
  (`ls --color=never`, `git log --stat`) gets an extra "unknown option" reason. PowerShell expressions
  are tokenized with the same light tokenizer: parts of an expression (`$_.Length -gt 1MB`, `.Count`) are not judged
  by the allowlist (a `$`-named program stays high by the deny rules). Payload strings of a runner (`forfiles /c "…"`,
  `bash -c '…'`) are checked by the deny rules; the wrapper itself already makes the command high.
* **sudo is a wrapper.** Every `sudo` catalog command (and the `bash -c` fallback for PowerShell on Linux/macOS without a
  native variant, and `… | xargs kill`) is high risk by the allowlist; the deny rules alone would call most of them medium.
* fish / cmd renders are not syntax-checked here (no fish/pwsh in CI); PowerShell variants are hand-written and only
  linted structurally — `pwsh` parser checks run automatically where `pwsh` is installed.
* zsh is validated with `bash -n` (no zsh in CI); zsh-only behaviour (e.g. `NOMATCH` on unquoted globs) is avoided by quoting.
* busybox: variants are based on Debian's busybox applet set; Alpine builds may differ.
* History: bash writes history late (see above); references are resolved to the most recent matching entity, there is no
  multi-turn memory of tellsh's own suggestions beyond the history file.
* Composer: closed vocabulary, POSIX only, no pipelines, no `--format`/`-o` style arguments; it is a safety net, not a generator.
* **Negation and exclusion are read with word lists (close5).** "except", "other than", "but not", "oprócz", "z
  wyjątkiem", a value after "not" / "without" / "bez", and "don't / never / nie <verb>" are never ignored: the command
  expresses the exclusion, a placeholder stands for it, or tellsh refuses (`kill all python processes except 1234`,
  `don't delete a.txt`, `uninstall nginx` are refused: there is no exclusion pipeline and no package-removal command in the
  catalog yet). A phrasing outside the lists can still be missed; a Polish prohibition later in a request is only caught
  when the command's action is named in English (`stop nginx, don't restart it`).
* **Two-path commands (close5).** mv / cp read the source before "to" / "do" / "na" and the destination after it. An
  unquoted source that may be one name with a space or several files (`move /tmp/my file.txt to /tmp/dir`, `move a.txt
  b.txt to /tmp/dir`) is a `<SRC>` placeholder: quote each path. `ln -s` is not split this way.
* **Misread requests** (the classifier, not slot filling) can still produce a plausible command without a warning, e.g.
  `forward port 3000 to db.example.com:5432` is a near tie between an ssh tunnel and `nc -zv db.example.com 3000`. Read
  the command before running it.
* **Release v0.3: open review findings** (details in [EVAL.md](EVAL.md#known-limits-release-v03-open-review-findings-not-fixed)).
  These give a complete command with no warning:
  - attached pip target is dropped: `pip install requests -t/tmp/pkgs` -> `python3 -m pip install requests` (write `-t /tmp/pkgs`);
  - a quoted workspace with a space after "in workspace" is cut: `run npm deploy in workspace "staging app"` ->
    `--workspace staging` (`--workspace "staging app"` is kept whole);
  - ssh `-L` with a bind address (4-part spec): `-L 127.0.0.1:8080:db.internal:5432` -> `-L 8080:localhost:8080` (only
    `-L PORT:HOST:PORT` is read);
  - `~` in a pip target is quoted literally: `--target ~/packages` -> `--target '~/packages'` (use an absolute path; `$HOME/…` is quoted too);
  - two bare PIDs for one slot: `kill 1234 5678` -> `kill 5678`;
  - some composer flags are no longer explained for their intents (`pull all branches` -> `git branch -a`; read-only);
  - `kill 1234` is read as `pkill -9 -f <NAME>` (a placeholder; `kill pid 1234` -> `kill 1234`).
* **Extract and protected PIDs (close6).** An extract / untar / unpack / rozpakuj request never becomes `tar -c` / `zip`
  (the composer keeps `tar -x…`, a guard refuses otherwise), and a PID after keep / leave / spare / except / zostaw / nie
  ruszaj is never the kill target (the other PID, else `<PID>`). Both read closed English / Polish word lists.
* The real-usage split's command groups keep some operands (`npm install express` ≠ `npm install react`): 552 of 2957
  eval rows share an operand-masked skeleton with train; A scores ~1 pt higher on those, ~0.2 pt overall
  ([HYBRID.md](HYBRID.md#v04-real-usage)).
* Slot F1 gold set is small (208 requests); relexicalised end-to-end numbers use silver spans for unreplaced values.

- PowerShell/cmd: a quoted `--workspace` value containing spaces or another flag can be split into separate arguments, and an explicit pip `--target` can be dropped (install goes to the active Python). Always read the shown command before confirming.

## License

MIT (code). Model weights partly derived from tldr-pages (CC-BY-4.0) — see [DATA_LICENSES.md](DATA_LICENSES.md).
