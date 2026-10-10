# Round-1 fix log

Fixes for `review/r1-claude.md` and `review/r1-codex.md` (commits 2b5eea8..91d3b2c):

- f85d123 — training/eval: held-out exclusion at emission time, eval-only value pools, complete-gold scoring, independent teacher questions, computed teacher report.
- 0639b18 — paths keep every character (no cut back to a parent), whole-disk phrases map to `/`, wider danger checks.
- 15d5c84 — composer: safe operands (`./`, `--`), working grep, value binding, filename-blind triggers.
- 4374238 — history references: newest target only, no silent fallbacks, no implicit fill of destructive commands.
- bb2aac3 — per-shell quoting (PowerShell native arguments, cmd switches, fish), CLI/parser/model robustness.
- 91d3b2c — v0.3.0; CLI exits cleanly on a closed pipe.

The retrain these commits needed was not shipped in round 1; round 2 (`review/fix2-log.md`) retrains the model and regenerates EVAL.md.
