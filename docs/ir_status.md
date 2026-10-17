# Typed-IR status (2026-10-17)

Branch `feat/typed-ir`. Not merged to main, and not wired into the shipped CLI: `src/` and `bin/` are unchanged, so npm
stays at 0.3.11. Spec: `docs/IR.md`. Gate rounds and measurements: `docs/ir_error_taxonomy_v5.md`. Tooling:
`scripts/ir/README.md`.

## Pipeline

NL request -> typed IR (models t50v5, h8v5, t50wv5, kfold_v5 folds 0-2) -> deterministic compile -> acceptance gate.
A command is accepted only when the gate passes and all 6 models agree (`--select-adj`: min_agree 5, rank 0).

## Where it stands

Target: accepted-wrong at most 0.5% (Clopper-Pearson UB95) on final, at meaningful coverage. Not reached.

| split | kept | coverage | wrong | UB95 |
| --- | --- | --- | --- | --- |
| dev (tuned on) | 2,696 | 72.6% | 0.19% | 0.39% |
| dev4 / dev5 (fresh, then tuned on) | 582 / 467 | 69% / 56% | 0.34% / 1.71% | 1.08% / 3.07% |
| final (gate 94337e8) | 1,748 | 76.6% | 1.09% | 1.59% |

## Where it is stuck

- Four rounds of per-pattern gate rules cut errors on the set each round targets. They moved final by a single row
  (1.14% -> 1.09%). Every fresh set reads 1-2%. The remaining errors are long-tail phrasing, plus unclear requests that
  should be declined.
- Final has been measured twice and is close to spent. Do not analyse its errors.
- Judging: Opus is unavailable (no paid API, claude CLI limits used up). Jev does the bulk judging; batched grok-4.6 and
  gpt-6-luna judge only the rows Jev flags, with gpt-6-astra breaking ties.

## Options (owner decision pending)

1. Stricter acceptance, selected on dev4+dev5 instead of dev. No new data is needed, and coverage is expected to fall
   to about 40-50%.
2. A learned verifier (request, command) -> accept/reject, trained on the judge verdicts already collected (dev, dev3,
   dev4, dev5). It needs more work, but it is more likely to generalise than hand-written rules.

Then: measure a fresh held-out set once, and only after that integrate it into the CLI behind the existing catalog
route (A) and release.
