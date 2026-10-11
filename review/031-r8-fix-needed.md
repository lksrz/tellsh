# r8 Codex RC → fix

**Finding (Codex P2):** Function-template `q` inferred path-ness by value equality against PATH_SLOTS values (`fill.js` pathVals). When `pattern === path` (e.g. both `C:\Program Files\`), the pattern was rewritten to `\. ` instead of gapping.

**Fix:**
- `fill.js`: `q(s, o)` takes explicit `{ name }` / `{ tilde }`; no value-equality heuristic.
- `variants.js` + `catalog.js`: every function-template `q(...)` call passes `{ name: '<slot>' }`.
- Regression in `test/matrix.test.js`: equal path+pattern for grep_text / grep_files_containing must gap; path-only still rewrites to `\.`.

Verified locally with node repro + matrix/regressions tests.
