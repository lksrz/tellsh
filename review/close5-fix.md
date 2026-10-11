I've fixed all of the final4 majors and committed as `956e111` on `master` (not pushed). All 428 tests pass, including 10 new tests in `test/regressions29.test.js`, and every one of the 17 review examples now gives the right target, a placeholder, or a refusal.

**What changed for each finding**
- **"Except", "not" and "don't" are never ignored.** The command either expresses the exclusion, uses a placeholder for it, or tellsh refuses with the reason. This runs as a final check on every suggestion, in a new file `src/guards.js`.
  - `kill all python processes except 1234` (was `pkill -9 -f python`) and `don't delete a.txt` (was `rm a.txt`) are now refused.
  - `kill process 1234 not 5678` still gives `kill 1234`.
  - `delete /tmp/x without asking` and `merge pr 42 and don't delete the branch` are unaffected.
- **Uninstall is never install.** `uninstall nginx`, `odinstaluj nginx`, `pip uninstall requests` and similar are refused. The catalog has no remove/uninstall commands, so nothing is suggested instead. Contrastive tests confirm `install nginx` still installs.
- **`stop docker container web` → `docker stop web`.** The words "docker", "container", "package" and so on are never taken as the name. If no name follows, it's a placeholder.
- **Move/copy:** the request is split at "to/do/na" before reading paths.
  - `rename /tmp/my file.txt to /tmp/new.txt` → `mv -i <SRC> /tmp/new.txt` with a warning.
  - A quoted source keeps the whole name.
- **History:** `same for ~/Old Projects` → `rm -r ~/'Old Projects'`. I also found that `same for ~/'Old Projects'` used to give `rm -r ~/`; that's fixed too.
- **Quoted workspace:** `--workspace "staging app"` is kept whole, rendered as `--workspace 'staging app'`.
- **SSH tunnel:** the remote port and host are kept, e.g. `ssh -N -L 8080:localhost:5432 db.example.com`. Two bare port numbers with nothing saying which is local give `<RPORT>`.
- **pip:** `--target` (and `-t`) is kept.
- **CLI message:** these refusals now print "Not suggesting a command for …: <reason>" instead of the contradictory "confidence 88% < 38%".

**Measurements**
- **All eval requests (4,800):** 13 commands changed and no risk levels changed. 12 are fixes (for example `docker stop 'docker'` → `docker stop 'minio'`). The 13th is a symlink request misread as a copy: it was wrong before and is now a placeholder instead of a wrong path.
- **Dev-tools eval:** 293 → 297 out of 324 exact.
- **Blind end-to-end set:** unchanged at 198/207.
- **Main eval:** the only change is end-to-end exact 83.4% → 83.5%.
- **Speed:** warm latency 0.468 → 0.478 ms. My first benchmark run looked slower, but rerunning on the unchanged code gave the same numbers, so that was run-to-run noise.

**Known limits** (now listed in EVAL.md and the README)
- Exclusions and uninstall requests are refused rather than turned into a command such as `pgrep … | grep -v` or `apt remove`.
- An unquoted source with a space or several files becomes `<SRC>`; symlinks (`ln -s`) aren't split this way.
- Negation, noun and tunnel phrasings are matched against fixed English and Polish word lists, so unusual wording can slip through.
- Some classifier misreads still get no warning. For example, `forward port 3000 to db.example.com:5432` is a near tie between an SSH tunnel and `nc -zv`.
- Older limits are unchanged, e.g. `chmod -R` still loses the `-R`.

As in the last round, `review/STATUS` and the empty `review/close5-fix.md` are left uncommitted. I committed with the same author as earlier commits, `lksrz <lukasz@wearfits.com>`.
