## tellsh 0.3.2 review: one major problem; I recommend changes before release

I reviewed `git diff 080b628..HEAD`. `test/regressions28.test.js` passes (12/12). I tested the Enter-before-the-prompt behaviour with a real terminal: a small Node script, driven from Python, uses the same set-raw-mode-then-read sequence as `readKey`.

### MAJOR — An Enter pressed before the prompt runs the command, at any risk level
**`src/cli.js:177` (`decideKey` accepts `'\n'`), `src/cli.js:186-205` (`readKey`)**

Before the prompt appears, the terminal is in normal line mode, which turns an Enter keypress into `\n`. Switching to raw mode later doesn't throw that buffered input away. So a keypress made while the model loads or the suggestion prints sits waiting. `readKey` reads it as its first chunk, `decideKey('\n')` returns `'run'`, and the command runs.

I reproduced this: with a pty, I wrote `\r` while the process was still in line mode, then switched to raw mode and read. The process received `"\n"`.

How it happens:
- Someone runs `tellsh delete old logs` and presses Enter twice, or presses Enter while the model loads.
- Someone pastes a line that ends in two newlines.

Either way, a high-risk or composed command runs before the warning line or the command itself has been on screen. In 0.3.1 the same stray Enter could only run a safe command, because medium needed `y` and high needed `yes`. This is separate from the "Enter runs at every level" decision: the user never had a chance to read the warning that the new UX relies on.

Only catastrophic commands are protected, because the retype step still applies.

**Fix:** accept only `'\r'` as Enter. In raw mode, Enter sends `\r`, and Ctrl+J is the only key that sends `\n`. Also drop `'\r\n'`. The cleaner option is to also discard anything already buffered: ignore `data` that arrives within about 50–100 ms of `setRawMode(true)`, or read and throw away pending input before printing the prompt. Add a test that `decide('\n')` doesn't return `'run'`.

### MINOR
1. **`src/pipeline.js:414`** — The REPLAY warning that users see still says "…; needs an explicit yes". Every history-replay command prints this, which is now wrong.
2. **CHANGELOG.md / `confirmRule` (`src/cli.js:167-169`)** — The changelog says composed commands show a yellow "experimental" line. But composed commands are always at least high (`compose.js:548`, plus the trust rule), and `confirmRule` checks for high before it checks for composed. So the yellow Experimental warning can never appear; users get the red "High risk" line, which is what the README example shows. Either check composed first, or fix the CHANGELOG and the `confirmRule` comment.
3. **`src/cli.js:167`** — `risk === 'high' || (risk !== 'safe' && risk !== 'medium')` repeats itself; the second half already covers `'high'`. Harmless, but it hides the "unknown rating counts as high" intent.

### NIT
- `src/danger.js:718` and `:940` — the comments still say an explicit "yes" is required.
- The `HELP` text (`src/cli.js:45`) doesn't list `n` / `q` as abort keys; the README mentions `n` but not `q`.
- README pipeline diagram ("· risk high · red warning   ") has trailing spaces.
- Several keys arriving in one chunk (fast typing, or a paste such as `n\r`) are ignored rather than aborting. That's safe, but the user may have to press a key again.

### Checked and fine
- Raw mode is put back the way it was (`wasRaw`) on every path that resolves, and Node itself resets the terminal if the process exits on a signal.
- Ctrl+C (`\x03`) and Ctrl+D abort. A lone Esc aborts and arrow keys or F-keys are ignored. If a slow link splits an escape sequence, the worst case is an unwanted abort, which is the safe direction.
- Incomplete commands: Enter maps to `edit`, and the `action !== 'run' || incomplete` check backs that up.
- The catastrophic-command retype still uses line-mode input and isn't affected by buffered keystrokes.
- With no TTY, or with `--yes`, the behaviour hasn't changed.

VERDICT: REQUEST_CHANGES
