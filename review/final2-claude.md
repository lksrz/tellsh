I found one blocker and two majors, all in the risk allowlist in `src/danger.js`. The placeholder rule (uncertain args become a placeholder) wasn't contradicted by anything I tried. I didn't re-run the earlier wrong-target probes, since the last round covered them and the allowlist problems are enough to block. All 396 tests pass. `review/final2-codex.md` is the other reviewer's run and was still in progress, so its verdict isn't included here.

**How these get run:** through the edit step at the prompt (`src/cli.js:229-243`). An edited command is re-checked with `checkDanger`. If it comes back `safe`, a plain Enter runs it, with no "yes" and no retyping. Generated commands can't produce these patterns, because slot values are single-quoted.

### Blocker: bash `$'…'` quoting hides commands from every check
`simpleCommands` (`src/danger.js:24`) and `substitution()` (`src/danger.js:691`) read `$'…'` as an ordinary `'…'` string. Inside `$'…'`, bash treats `\'` as an escaped quote, so where tellsh thinks a quoted string closes or opens doesn't match bash:

| command | tellsh says | bash does |
|---|---|---|
| `echo $'\''; rm -rf ~ #'` | **safe**, not critical | runs `rm -rf ~` |
| `echo $'\''; npx evil #'` | **safe** | runs `npx evil` |
| ``ls $'\''`npx evil`'`` | **safe** | runs the backtick substitution |

I ran the first form in bash (`echo $'\''; echo PWNED #'`) and it prints `PWNED`. This gets past the allowlist, the `rm` deny rules and the critical "retype the command" step all at once. Two possible fixes:
- Mark any `$'` outside single quotes as high risk.
- Parse `$'…'` properly, with `\'` as an escape.

### Major: `find -exec` runs any program, but is safe
`-exec` is on the allowlist for `find`. The program after it ends up as an ordinary argument, and the allowlist check ignores it. The deny rules only catch it when the program is `rm`, `chmod` and the like.

| command | risk shown |
|---|---|
| `find . -exec ./evil {} +` | safe |
| `find . -exec bash ./evil.sh \;` | safe |
| `find . -exec npx evil \;` | safe |

That breaks rule 2: an unknown program has to need an explicit "yes". **Fix:** run the allowlist on the `-exec` command too, or make `-exec` high risk unless what follows is exactly the catalog's own `du`/`ls` form.

### Major: `.` and `source` with any file are safe
`ALLOW['.']` and `ALLOW['source']` are `[]`, and that check only looks at options, never at the file named after them. So `. /tmp/x`, `source ./evil.sh` and `source ~/.bashrc` all come back safe. Each runs whatever script it names, in the current shell. **Fix:** only allow the exact files the catalog itself sources, or make `.` and `source` high risk whenever they name a file.

### Lesser (not blocking on its own)
`sed` with GNU's execute command is safe: `sed 's/a/b/e' f` and `sed -n '1e cmd' f` both run a shell command. `sed` scripts should go through the same inline-code check as `awk`.

VERDICT: REQUEST_CHANGES
