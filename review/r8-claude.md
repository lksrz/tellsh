# tellsh round 8 re-review (`0d87457..HEAD`, at `f4bff45`)

All 306 tests pass. I ran about 55 extra cases against the CLI, `suggest()` and `checkDanger()`. Nothing in the repo was changed; my scratch files are in `/tmp`.

**Round 7 findings: all fixed.**
- **Quoted request text as the first argument:** `tellsh "delete folder" /tmp/x` gives `rm -r /tmp/x`, and `"usuń katalog" build` gives `rm -r build`.
- **Unclear quoted argument:** `delete folder "my data"` gives `rm -r <PATH>` with a warning.
- **Current call matched too loosely:** the `tellsh show it delete it` case no longer reads two lines back.
- **Several operands:** `touch a.txt b.txt` or `mkdir -p /tmp/a /tmp/b`, then "delete them", gives a placeholder.
- **`cat a.txt; cd /srv`, then "delete it":** refused.
- **"move it there":** refused with a note.
- **System files:** `rm`, `unlink`, `shred`, `sed -i`/`--in-place=` and `tee` (without `-a`) on `/etc/passwd` are critical, including through `sudo sh -c`.
- **npm packages:** scoped packages are kept, and `@types/node;rm` gives `<PKG>`.

**One-line history:** apart from the nit in finding 4, no value from two lines back was used.

## Findings

### Major
1. **A quoted argument that mixes request words with a path or file name still becomes one path** (`src/shellwords.js:187`, `:208`).
   - After the first argument, any argument containing a space plus a `/` or a `.ext` is treated as one value. That happens even when most of it is request text:
     - `tellsh delete "folder /tmp/x"` gives `rm -r 'folder /tmp/x'`.
     - `tellsh delete "the file notes.txt"` gives `rm 'the file notes.txt'`.
     - `tellsh usuń "plik raport.pdf"` gives `rm 'plik raport.pdf'`.
     - `tellsh delete "all files in /tmp/x"` gives `find 'all files in /tmp/x' -type f -iname <GLOB> -delete`.
   - The history copy reads it the same way: `tellsh delete "folder /tmp/x"` in history, then "show it", gives `ls -lah 'folder /tmp/x'`.
   - These are complete, high-risk commands with no placeholder or warning, so they are the same kind of problem as the round 7 Major, in a case that fix doesn't cover. In practice the joined path rarely exists, so the command usually just fails.
   - **Suggested fix:** treat an argument after the first as a value only when it starts like a path (`PATH_START`). Mark it unclear, so it becomes a placeholder plus a warning, when it has `PATH_FORM` but its first word is a stop word or request word (the, all, file, folder, plik, katalog, …), or when the space comes before the `/`.
   - **Tests to add:** `["delete", "folder /tmp/x"]`, `["delete", "the file notes.txt"]`, and `["delete", "My Notes.txt"]` (this one should stay a value).

### Minor
2. **Only the script counts as "it" after running a script** (`src/history.js:723`).
   - After `python3 script.py data.csv`, "delete it" gives `rm script.py`.
   - "It" could just as well mean the data file. With more than one operand this should go through `oneOf`, giving a placeholder, the same as `touch a b`.
3. **The danger checker is still inconsistent on system files** (`src/danger.js:277`, `sysFileWriteCheck`). This was already true at the base commit, and these commands are only reachable by editing at the confirm prompt.
   - `dd if=/dev/zero of=/etc/passwd` is rated **safe**, and `sudo dd … of=/boot/vmlinuz` only medium.
   - `cp /tmp/x /etc/passwd`, `install … /etc/passwd`, `perl -pi -e … /etc/passwd` and `chmod 000 /etc/passwd` are high but not critical, while `tee /etc/passwd` is critical.
   - **Suggested fix:** add `dd of=`, plus `cp`, `install` and `mv` with a system-file destination, to `sysFileWriteCheck`.
4. **Nit: an identical earlier `tellsh` call is dropped as if it were the running one** (`src/history.js:771`).
   - In bash the running command isn't written to the history file first. With history `['cat secret.txt', 'tellsh delete it']`, running `tellsh delete it` again drops the earlier call and resolves to `rm secret.txt`, two lines back.
   - Mostly harmless, since the same request on the same history means the same thing. But dropping the last line could be limited to shells that write the call before it runs (zsh, fish, PSReadLine), since `env.shell` is known.
5. **An unclear argument is only checked against path slots** (`src/pipeline.js`, the `unclearArgs` loop).
   - `tellsh kill process "node server"` happens to give `pkill -f <NAME>`. But a `name`, `service` or `container` slot taken from part of an unclear argument isn't blanked, which only works because these values can't contain spaces.
   - Worth applying the same `partOf` check to the other non-safe operand slots.

### Training, data and eval
- `export_data.js` now filters every emitted row against the held-out index, and B was retrained.
- C (the tiny-LM reranker) is still trained on the leaky data. HYBRID.md says so, and C isn't shipped, so that's acceptable.
- `fetch_model.js` now checks that the manifest lists exactly the bundle files with checksums, and verifies everything before writing anything. That looks correct.
- The `rerankTop` change makes A+B independent of `--top`. Shown candidates are cut back to `top`.

The verdict is REQUEST_CHANGES because of the Major finding.

VERDICT: REQUEST_CHANGES
