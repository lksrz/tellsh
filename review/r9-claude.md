I found no blockers or majors, so this round is an approval. All 314 tests pass. On top of them I tried about 45 cases against the CLI, `checkDanger()` and the training data generator. I didn't change anything in the repo; my scratch files are in `/tmp/r9`.

**Round 8 findings: all fixed.**
- **Quoted arguments (the r8 Major):** all four examples now give a placeholder. `delete "My Notes.txt"` still gives `rm 'My Notes.txt'`.
- **Commands aimed at another repo or daemon:**
  - `-C`, `--git-dir=`, `--context=`, `-H=`, and a `DOCKER_HOST=` prefix (also behind `sudo`) are all handled.
  - With `export DOCKER_HOST=…; docker logs web`, "stop it" gives `docker stop web`. That is correct: the exported variable stays set in the user's shell, so the stop goes to the same daemon. The same applies to `docker context use` and `pushd`.
- **System files:** `dd of=`, `cp`/`mv`/`install`/`ln -sf` onto one, `perl -i`/`-pi.bak` on one, and `chmod 0`/`000`/`a-rwx` are all critical now.
- **Running a script:** after `python3 script.py data.csv`, "delete it" gives a placeholder.
- **Calibration leak:** the change to `train_a_dev.sh` looks right.
  - The new `leaks` uses the same `fnv1a('dev:'+normalize)` hash as `export_data.js`.
  - `excl.has` is an arrow function, so it still works when passed around as `leaks`.
  - OOD rows are skipped together with their typo copies.
  - `v04_policy.json` matches `POLICY` (`A+B` tau 0.9, alpha 0.5).

## Findings

### Minor
1. **The new quoted-argument rule only checks the first word, so request text can still become one path** (`src/shellwords.js:219-221`).
   - These still give complete `rm` commands with no warning:
     - `delete "notes.txt and report.pdf"` gives `rm 'notes.txt and report.pdf'`.
     - `delete "please the file a.txt"` gives `rm 'please the file a.txt'`.
     - `delete "everything in notes.txt"` gives `rm 'everything in notes.txt'`.
     - `delete "plik.txt oraz raport.pdf"` gives `rm 'plik.txt oraz raport.pdf'`.
   - Each is a single literal name that the user quoted and that rarely exists, so the command usually just fails. That is why I rate it Minor, not Major.
   - **Suggested fix:** treat the argument as unclear when it contains more than one name with an extension, or a request word anywhere in it, not only as the first word.
2. **The separator check doesn't match its doc comment** (`src/shellwords.js:219-220`).
   - The comment says every space must come after the *last* `/`. The code finds the *first* separator (`s.search(/[\\/]/)`) and compares it with the first space.
   - So `delete "build/ and /tmp"` gives `rm -r 'build/ and /tmp'`, and `delete "src/ i /etc"` gives `rm 'src/ i /etc'`. By the stated rule both should be unclear.
   - **Suggested fix:** use the last separator (`Math.max(s.lastIndexOf('/'), s.lastIndexOf('\\'))`).
3. **Not dropping the running line now depends on the file name, so some zsh history files lose it** (`src/history.js:89`, `:798`).
   - `--history=FILE` decides the shell from the file name, and anything not matching `/zsh/`, `/fish/` or `/PSReadLine/` counts as bash. That includes common zsh names like `~/.histfile` and `~/.zhistory`.
   - Before this change, the identical running `tellsh` line was dropped for every shell. Now it isn't for these files: with `touch notes.txt` then `tellsh delete it`, "delete it" no longer resolves and gives `rm <FILE>`. This fails safe, but it is a regression.
   - `sh` also maps to bash. BusyBox ash may save each line as it is entered, i.e. before it runs.
   - **Suggested fix:** decide this from `env.shell`, not from the file name, or keep dropping the line when the shell is unknown.
4. **The `cp` destination check skips `-t DIR` and a trailing `/`** (`src/danger.js:284-289`).
   - `cp -t /etc /tmp/passwd` and `cp --target-directory=/etc /tmp/passwd` get no warning at all.
   - `cp /tmp/passwd /etc/` gets a warning but isn't critical.
   - All three overwrite `/etc/passwd`, while `cp /tmp/x /etc/passwd` is critical. The comment even says -t means "(a file inside it)", but the code returns early.
   - **Suggested fix:** for a directory destination, combine the directory with each source's file name and check that against `sysFile`.
   - As in r8, this can only be reached by editing the command at the confirm prompt.

### Nits
5. A few other commands that wipe or overwrite a system file still aren't critical (`src/danger.js:293`):
   - `chmod u=,g=,o= /etc/passwd`, because the mode regex only accepts a single clause;
   - `rsync /tmp/x /etc/passwd`, which has no check at all.
6. The new `cp`/`mv` rule is broad. `sudo cp nginx.conf /etc/nginx/nginx.conf` and `cp /etc/passwd /etc/passwd.bak` are now critical, so they need "yes" typed in full. This is over-cautious rather than unsafe, but worth knowing.

### Training and data
- C is still trained on the leaky data. This is documented and C isn't shipped, so it's acceptable.
- `A+B-safe` kept tau 0.9 and alpha 0.5. The fix log doesn't say whether it was recalibrated against the new A_dev or left unchanged on purpose. Worth a line in HYBRID.md.

VERDICT: APPROVE
