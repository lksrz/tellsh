## tellsh 0.3.2, round 2 review: the four r1 majors are fixed; the remaining issues are minor and none can run a command

I reviewed `git diff 080b628..HEAD`. `test/regressions28.test.js` passes (12/12). I also ran the real CLI under a pty on the composed high-risk `ls -l -t -r` suggestion, timing each key from when the prompt appears. I made no changes to the repo; the test scripts are in `/tmp/r2`.

### r1 majors: all fixed, and confirmed under the pty
| r1 issue | Fix | Pty result |
|---|---|---|
| An Enter typed before the prompt runs the command | `readKey` ignores all input for the first 150 ms after the prompt appears, except Ctrl+C and Ctrl+D (`src/cli.js:248`) | Two Enters sent before the prompt: nothing ran, still waiting |
| `\n` / `\r\n` confirm | Only a chunk that is exactly `\r` runs | LF after the prompt: still waiting |
| Results depend on how stdin splits into chunks | Escape state carries across chunks; an abort key anywhere in a chunk aborts | `x\x03` and `n\r` abort; an arrow split across chunks doesn't abort (unit test) |
| Bracketed paste can confirm | Bracketed paste is enabled (`?2004h`, turned off again in `done`); paste content is ignored across chunks | Paste content containing `\r` and `q` is ignored; a later deliberate Enter runs |

A deliberate Enter 300 ms after the prompt runs the command, as intended. One Enter 20 ms after the prompt is swallowed, which is the intended safe behaviour. Raw mode and bracketed paste are reset on every path that resolves. The catastrophic retype prompt runs after `done()`, so bracketed paste is already off by then.

### MINOR
1. **`src/cli.js:198`: if the paste-end marker is split across two chunks, the prompt gets stuck in paste mode.** The code looks for the whole `\x1b[201~` inside one chunk. If one chunk ends with `\x1b[20` and the next starts with `1~`, `state.paste` never clears. After that, Enter, Esc, `n` and `q` are all ignored, so only Ctrl+C works, even though the prompt says "Esc abort". I reproduced this under the pty: Esc, `n` and Enter all did nothing. It fails safe, but it's a hang that large pastes can trigger. **Fix:** keep the last 5 characters of the paste in state and search them together with the next chunk.
2. **`src/cli.js:248` and `CHANGELOG.md:9`: Esc, `n` and `q` are silently ignored in the first 150 ms.** The comment ("an abort key in it still aborts") and the CHANGELOG ("an abort key anywhere in a burst aborts") promise more than the code does: only Ctrl+C and Ctrl+D count in that window. Under the pty, Esc or `n` pressed 50 ms after the prompt did nothing. That's a real case: someone sees the red line and hits Esc straight away. It's safe, because nothing runs, but the user has to press the key again. **Fix:** let all abort keys abort in that window too, only ignoring Enter and `e` there. Otherwise, correct the comment and the CHANGELOG.
3. **`src/cli.js:213` with `:251`: Esc followed quickly by another key loses the Esc.** If Esc and then Enter arrive within 60 ms, the pair is read as Alt+Enter (`i += 2`), and the abort timer has already been cleared. Under the pty, Esc then Enter 20 ms later was ignored, and the next Enter ran the command. It never runs on its own, but the user's abort is lost. **Fix:** treat ESC followed by `\r`, `\x1b` or a control character as an abort, not as Alt+key.

### NIT
- `src/cli.js:208`: a CSI sequence accepts any byte below 0x40 until a final byte arrives, including `\r` and control characters. Esc then `[` and Enter therefore stays pending until a letter such as `n` ends the "sequence", and that letter is swallowed. Valid parameter and intermediate bytes are only 0x20–0x3F, so anything else should end the sequence.
- Holding Enter down (autorepeat starts after about 250–600 ms) can still confirm once the 150 ms window has passed. This is acceptable, given the owner's decision that Enter runs at every risk level.
- If the process is killed by SIGTERM while waiting for the key, bracketed paste is never turned off (`\x1b[?2004l`). Most shells re-enable or ignore it, so this is cosmetic.

### r1 minors and nits: all fixed
- The REPLAY text is updated.
- The composed warning is now red, and the CHANGELOG matches.
- `confirmRule` no longer has the redundant condition.
- The `danger.js` comment is updated.
- `HELP` lists `n` / `q` and the README mentions both.
- The README diagram's trailing spaces are gone.

VERDICT: APPROVE
