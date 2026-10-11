I'm approving this change. I found no real bugs: no regressions, no missed call sites, and nothing wrong with the attached-switch or PowerShell handling.

**Call sites.** Every `q(...)` call in `src/catalog.js` and `src/variants.js` (15 in total) now passes `{ name: '<slot>' }`. No function template there calls `q` with only a value or names the quoter differently. The other `q(...)` calls in `src/compose.js` use a separate local helper (`shQuote` with `{ tilde: false }`) and never go through `buildCommand`, so this change doesn't affect them.

**The new `q` in `src/fill.js:1003`.** An explicit `tilde` wins; otherwise `PATH_SLOTS.has(o.name)` decides whether a value is a path. If a future call site leaves out `name`, the value is treated as not a path. That's the safe direction: the value gaps or stays literal, and is never rewritten.

**Attached switch (`cmdTemplate`).** The wrapper passes `o` through unchanged to `q`. A held value starting with `/` is re-quoted with `{ tilde: false, attached: true }`, which only matters for `findstr /c:`, and that's the pattern slot (not a path) anyway. Checked by running it:
- path `~/src` with pattern `~/src` gives `pushd "%USERPROFILE%\src" && (findstr ... /c:"~/src" ...)`. The pattern is no longer expanded to `%USERPROFILE%` because it equals the path.
- pattern `/foo` is kept as `/c:"/foo"`.

**PowerShell native name forwarding.** `{ ...o, tilde }` now forwards `name` into the pwsh-native quote wrapper. For function templates that's harmless, because the `typeof tpl === 'function'` branch already checks every value. For example, `list_archive` with `a"b.zip` still gaps.

**Path behaviour kept.** I ran these through `buildCommand`:
- **`./` prefix:** still added for path slots. `-dir` becomes `.\-dir`, `-new` becomes `.\-new` in `mkdir`, and `-a.zip` becomes `'./-a.zip'` in `Expand-Archive` and `./-a.zip` in bash `unzip -l`.
- **Tilde expansion:** still applied to file and dest slots. `~/f` becomes `"$HOME/f"` in pwsh and `~/out` becomes `"$HOME/out"`.
- **Text slots:** never expanded. Text `~/f` becomes `'~/f'` and text `~` stays `'~'`.
- **`taskkill /im`:** quotes the name as before (`"note pad.exe"`).

**Tests.** `npm test` passes all 453, including the new test where path and pattern are equal.

VERDICT: APPROVE
