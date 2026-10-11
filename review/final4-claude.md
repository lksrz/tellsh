Nothing marked safe is actually unsafe. But several destructive commands act on the wrong target with no placeholder and no warning, which goes against the placeholder rule this release accepted.

I ran the CLI with `--json --shell bash --os linux` on about 120 tricky requests. I also unpacked the base commit `0d87457` into a temporary folder outside the repo with `git archive` and ran the same requests against it, then deleted the folder. The working tree is unchanged.

## Major: wrong target, no warning

**1. Move, copy and rename drop the stated destination and use another word in the request instead.** Medium risk, so typing `y` runs it.

| request | command produced |
|---|---|
| `rename /tmp/my file.txt to /tmp/new.txt` | `mv -i /tmp/my file.txt` (moves `/tmp/my` to `./file.txt`) |
| `move /tmp/my file.txt to /tmp/dir` | `mv -i /tmp/my file.txt` |
| `copy /tmp/my file.txt to /tmp/dir` | `cp -ri /tmp/my file.txt` |
| `move report.txt notes.txt to /tmp/dir` | `mv -i report.txt notes.txt` |
| `rename my notes.txt to notes.txt` | `mv -i notes.txt notes.txt` |

- **Cause:** the reader finds three paths (`/tmp/my`, `file.txt`, `/tmp/dir`) but the template has only two places for them (`src`, `dst`). It fills them in order and silently drops the third, even though "to" clearly marks it as the destination.
- **Close4 doesn't cover this:** its path fix exempts names with an extension and never checks for an extra path.
- **Suggested fix:** when the intent has two path slots and more than two paths are found, or the word after "to/into/do" isn't what ends up in `dst`, use `<SRC>`/`<DST>` placeholders and a warning.

**2. "except" / "but not" / "oprócz" in kill requests is ignored, and in one form the result is reversed.** High risk.

| request | command produced |
|---|---|
| `kill python except pid 1234` | `kill 1234` (kills only the process the user wanted to keep) |
| `kill all python processes except pid 1234` | `kill 1234` |
| `kill all python processes except 1234` | `pkill -9 -f python` (kills 1234 too) |
| `kill every python process but not 1234` | `pkill -f python` |
| `zabij wszystkie procesy python oprócz 1234` | `pkill -f python` |

- **Cause:** the logic for competing values ("not", "except" and so on, `SEL_NEG`/`SEL_NEGATION` in `src/fill.js`) apparently isn't applied to the PID slot or to process names. `kill process 1234 not 5678` does work.
- **Suggested fix:** if a PID or name comes right after an exclusion word, use a placeholder.

**3. Wrong action or target from a misread request.** These look like model mistakes rather than slot-filling bugs, but no warning appears:
- `uninstall nginx` / `uninstall package nginx` → `sudo apt install nginx`: the opposite action. High risk, so it needs `yes`.
- `stop docker container web` → `docker stop docker`: the word "docker" is taken as the container name. Medium risk. `stop container web` works.

## Not new in v0.3
All of the above produce the same commands on `0d87457`; the only difference is that `uninstall nginx` was rated medium there. I'm still flagging them because they're exactly the "wrong target silently" category you asked about, and items 1 and 2 are in areas the close3/close4 fixes claimed to cover.

## Checked and found sound
- Command substitution (`$(…)`, backticks), `;`, `&&` and `| sh` are either dropped or quoted and rated high; none ends up safe.
- Option injection (`-rf`, `--delete`, `-exec`, `--output=`, `-o`) becomes a placeholder, is dropped, or raises the rating.
- Close4's path spans work: `rm -r ~/'Old Projects'`, `chmod 777 '/srv/my app'`, `mv -i '/tmp/old notes' /tmp/archive`, and `rm <FILE>` for an unclear end.
- The new rule holds: tools that run project code are at least medium, and `rm --help` is high.

I didn't run the test suite.

VERDICT: REQUEST_CHANGES
