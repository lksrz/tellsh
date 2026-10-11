I found two major bugs. Both are regressions from the base commit (`0d87457` gives the right command for both). Both act on the wrong target with no placeholder and no warning about the target. I ran about 100 tricky requests through the CLI (`--json --shell bash --os linux`) and compared the two failing cases against an unpacked copy of the base in `/tmp/base`. The repo wasn't changed. I didn't run the test suite.

## Major 1: some "extract" requests become a create command that overwrites the archive

| request | v0.3 | base |
|---|---|---|
| `extract archive.tar.gz` | `tar -c -z -f archive.tar.gz -- .` | `tar -xzvf archive.tar.gz` |
| `extract the archive backup.tar.gz` | `tar -c -z -f backup.tar.gz -- .` | — |
| `untar archive.tar.gz` / `unpack archive.tar.gz` | `tar -c -z -f archive.tar.gz -- .` | `tar -xzvf …` |
| `extract files from archive.tar.gz to /tmp` | `tar -c -z -f archive.tar.gz -- /tmp` | `tar -xzvf archive.tar.gz -C /tmp` |

- **Effect:** running it replaces the user's archive with a new archive of the current folder. The original contents are lost.
- **What the user sees:** it is rated high, so it needs a typed `yes`. The only warning is the generic "not a catalog command … not checked as safe". Nothing says the action is now "create" instead of "extract".
- **Cause:**
  - The classifier is right (`extract_targz`, p=0.9987), and the catalog builds `tar -xzvf …`.
  - `model/compose_explained.json` was regenerated from the filtered corpus (`scripts/build_triggers.js`). For `extract_targz` it lost `-c` (base had `['-C','-c','-x']`, now `['-C','-x']`).
  - The word "archive" triggers `-c`, which now counts as unexplained. The same-tool composer path at `src/pipeline.js:840` then replaces the catalog command (reason: "request asks for -c not in the catalog command").
  - It happens whenever the request contains "archive", whether in the filename or as a word.
- **Other intents lost explained flags in the same regeneration:** `grep_text` (`-n`), `list_files` (`-a`), `git_current_branch` and `git_pull` (`branch -a`), `git_blame` (`diff --staged`). The ones I probed only turn into read-only commands, e.g. `pull all branches` → `git branch -a`, so they aren't harmful.
- **Suggested fix:**
  - Restore the lost entries in `compose_explained.json`.
  - Never let the composer replace a catalog command with one whose mode flag contradicts it (`-c` vs `-x`).

## Major 2: "keep" a PID kills the PID that should be kept

| request | v0.3 | base |
|---|---|---|
| `kill 1234 but keep 5678` | `kill 5678` | `kill 1234` |
| `kill 1234 and leave 5678 running` | `kill 5678` | `kill 1234` |
| `kill 1234, keep 5678 alive` | `kill 5678` | — |

- **Effect:** this is the exact opposite of the request: the named process survives and the protected one is killed. It's rated high, with no warning about the target.
- **Cause:**
  - The retrained tagger labels 1234 as PORT and 5678 as PID. `src/fill.js:621` takes the tagger's `ex.pid` over the first number in the request.
  - The new guards (`src/guards.js`) only recognise exclusion and negation words ("except", "not", "but not"…). "keep" and "leave … running" aren't among them.
- **Suggested fix:** when there are two or more bare numbers and only one `pid` slot, use `<PID>` with a warning. That follows the accepted placeholder rule.

## Checked and found sound
- **Close5 fixes hold:**
  - `kill all python processes except 1234`, `don't delete a.txt` and `uninstall nginx` are refused.
  - `stop docker container web` → `docker stop web`.
  - `rename /tmp/my file.txt to /tmp/new.txt` → `mv -i <SRC> /tmp/new.txt` with a warning.
  - `kill node not 1234` is refused.
- **Nothing unsafe came out marked safe.** Command substitution, `;`, `| sh`, `-delete`, `-exec`, `--output=` and `--exclude=` were all dropped or turned into placeholders, and every command produced was read-only.

VERDICT: REQUEST_CHANGES
