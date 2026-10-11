Checks done: the full test suite passes and I've probed the key parser directly. Writing up the review now.

## tellsh 0.3.2 re-review (round 3): all six r2 items are fixed; two small new issues, and neither can run a command

I reviewed `git diff 080b628..HEAD` without changing anything. The full test suite passes (453/453). I also fed edge-case key sequences straight into `decideChunk` and read `readKey` and the confirm loop in `main` against them.

### r2 items: all fixed
| r2 item | Status |
|---|---|
| Paste across the startup window | Fixed. The parser state is now carried through the 150 ms startup window, and only `run`/`edit` wait until the prompt is armed (`src/cli.js:248-252`). A paste that starts before arming stays a paste. Tested. |
| Abort before a paste | Fixed. The loop now goes through the chunk in order, so `n\x1b[200~…` aborts. |
| Paste-end marker split across chunks | Fixed. `markerTail` keeps the unfinished end of the marker for the next chunk (`src/cli.js:177,197`). This also works for a split after `\x1b` alone (`…\x1b`, then `[201~`, then a later Enter runs). |
| Esc+Enter, Esc+Esc, Esc+control key, Esc+DEL | Fixed. All of these now abort (`src/cli.js:213`). |
| Malformed CSI | Fixed. Only 0x20–0x3F count as parameter bytes, and any other non-final byte aborts (`src/cli.js:208-210`). |
| Abort keys in the startup window | Fixed. Esc, `n`, `q` and Ctrl+D abort before the prompt is armed. Enter and `e` are still ignored then. |

The other guarantees still hold:
- An incomplete command can only open the editor. `decide` returns `edit`, and `main` also checks `|| incomplete`.
- The catastrophic retype prompt runs after `done()`, so raw mode and bracketed paste are already off by then.
- `--yes` is unchanged.

### MINOR
1. **`src/cli.js:214` with `:249`: Esc followed quickly by a printable key loses both aborts.** If a letter arrives within 60 ms of a bare Esc, `onData` clears the Esc timer. The parser then reads `\x1b` plus the letter as Alt+key and skips both (`i += 2`).
   - **Example:** Esc then `n` (or `q`), pressed quickly while mashing abort keys. The parser returns `null` for `\x1bn`, so the prompt keeps waiting and the next Enter runs the command.
   - **Why it matters:** this is the same kind of bug as r2 minor 3, which was fixed only for control characters. Nothing runs by itself, but a clear abort is silently dropped.
   - **Fix:** no Alt+key does anything at this prompt, so any ESC followed by something other than `[` or `O` should abort.
2. **`src/cli.js:207-208`: Esc then `[` or `O` waits indefinitely, with no timer, and swallows the next letter.**
   - **Example:** Esc then Shift+O, both within 60 ms, is stored as an unfinished SS3 sequence with no timeout. A following `n` is taken as the final byte and swallowed, so Esc and `n` are both lost (probe: `pending-esc, null, null, run`).
   - **Why it's rare:** this needs unusually fast typing.
   - **Fix:** re-arm the 60 ms abort timer while an unfinished sequence is stored, or treat ESC `O` as exactly one following byte.

### NIT
- **`CHANGELOG.md:9`:** "an abort key anywhere in a burst aborts" doesn't hold inside bracketed paste (by design) or for the Alt+key case in minor 1. A small wording tweak, or the minor 1 fix, would make it true.
- **`src/cli.js:250`:** `if ((action === 'run' || action === 'edit') && !ready) return;` is redundant now that `decideChunk` checks `armed`. It's harmless as a second safeguard.
- **Ctrl+Z:** in raw mode, Ctrl+Z (`\x1a`) and Ctrl+\ are delivered as ordinary input and ignored, so Ctrl+Z no longer suspends at the prompt. Readline used to handle it. This is cosmetic.
- **Carried over from r2:** if a signal kills the process mid-prompt, bracketed paste isn't turned off.

No blocker or major issues: every path that runs a command still needs a separate chunk that is exactly `\r`, outside a paste, after the 150 ms window, on a complete command.

VERDICT: APPROVE
