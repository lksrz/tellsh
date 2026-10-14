# tellsh 0.3.5 plan — distilled student hybrid (A+S)

**Status:** ready for another agent to pick up. Docs only in this commit; no code change yet.  
**Base:** `main` after **0.3.4** (templates-only release, merge `e199c6f`, tag `v0.3.4`).  
**Owner historically:** Infra / hybrid workstreams. **npm publish** must be done by **lksrz** (OTP).

## Goal

Ship **0.3.5** as the first release that optionally uses the **distilled student** encoder at runtime:

- Default path stays the **linear cascade A** (zero npm deps, unchanged UX).
- When `onnxruntime-node` + `tellsh-model-student` are installed, consult the student (**A+S**) only when A's confidence is **< 0.6**.
- Never turn an A rejection into an answer; never auto-run (`--yes`) an answer the student changed.
- Optional `TELLSH_HYBRID=student-full` / off via `TELLSH_HYBRID=0` or `--no-hybrid`.

0.3.4 was deliberately **templates-only** (new catalog templates + `model_templates.bin`). 0.3.5 is the student hybrid release that follows.

Do **not** ship system **C** (Qwen LoRA / llama.cpp). The heavier **A+B** path (`tellsh-model-enc` / enc-v2) stays an alternate opt-in; 0.3.5's product default for "hybrid installed" is **A+S** (smaller ~14 MB student).

## Current state

### Already on GitHub

| Item | Where |
|---|---|
| 0.3.4 on `main` | tag `v0.3.4`, commit `e199c6f` |
| Student runtime branch | `origin/feat/hybrid-student` @ `ad692f4` (3 commits on top of **0.3.3** / `1e827f3`, **not yet rebased onto 0.3.4**) |
| Runtime code | `src/rerank/student.js`, A+S / A+S-full in `src/rerank/hybrid.js`, CLI wiring in `src/cli.js` |
| Tests | `test/student.test.js` |
| Eval harness | `scripts/hybrid/eval_student_runtime.js` |
| Package stub | `hybrid/package/tellsh-model-student/{package.json,README.md}` (version **0.1.0**) |
| Study docs | root `HYBRID.md` (A/B/C + v0.4 real-usage), `EVAL.md`, `review/hybrid-log.md` |
| Original hybrid brief | this commit: `docs/hybrid-spec.md` (copied from box) |

Branch diff vs its base (summary): +~418 lines across 11 files (runtime, tests, docs snippet, peerDeps, gitignore for student weights).

### On the shared box (not in git — by design)

Weights and private data stay off the repo (see `.gitignore`: `*.onnx`, student `vocab.json` / `labels.json`).

| Artifact | Box path |
|---|---|
| Student bundle `stu-v1` (ready to pack) | `/workspace/tellsh-hs/hybrid/package/tellsh-model-student/` (`encoder.int8.onnx` ~14 MB, `vocab.json`, `labels.json`) |
| Same bundle (dev load path) | `/workspace/tellsh-hs/hybrid/models/student/` |
| Worktree for `feat/hybrid-student` | `/workspace/tellsh-hs` |
| Distillation / teacher workstream | branch `ml/distill` worktree `/workspace/tellsh-ml` (`scripts/distill/`, `scripts/distill/eval_student.js`, `bench_student.js`, build under `build/` gitignored) |
| Older hybrid study worktree | `/workspace/tellsh-hybrid` (branch `hybrid`) |
| Templates progress notes (0.3.4 history) | `/workspace/tellsh-templates-progress.md` |
| Hybrid agent log | `/workspace/tellsh-hybrid.log` |
| Private real-usage data | `/workspace/tellsh-data/` — **never commit or copy into the repo** |
| Template retrain bins (0.3.4 era) | `/workspace/tellsh-models/` |

Load order at runtime (from `student.js`): `$TELLSH_STUDENT_DIR` → `~/.cache/tellsh/stu-v1` → npm package `tellsh-model-student` → `hybrid/models/student` (dev).

### Policy (A+S) — already implemented

1. If A's confidence ≥ **0.6** → A answers; student not loaded.  
2. If A rejected (threshold / pipeline guard) → stay rejected; student not run.  
3. Else student's catalog argmax replaces A only if **p ≥ 0.5** and **pNone < 0.5**; otherwise A stands.  
4. `student-full`: additionally a student with **p ≥ 0.9** may overrule a confident A (runs student every query; measured no better e2e).  
5. Rescuing A's rejections was measured and **rejected** (~99% of out-of-catalog real requests became wrong answers).

### Related prior recommendation (still valid context)

From `review/hybrid-log.md` / `HYBRID.md` (encoder **B** / A+B study): ship retrained **A** as default and **A+B** as opt-in `--hybrid`; do not ship **C**. Before making any hybrid the default for everyone, teach stage 1 an explicit "shell task but not in catalog" reject. Real-usage A **82.0%**, A+B **88.8%** (held-out groups). Student path is the lighter packaging of that idea.

## Remaining tasks (checklist)

### Merge / integrate

- [ ] Rebase or merge `feat/hybrid-student` onto current `main` (0.3.4). Resolve conflicts carefully around templates gate, history rules, and `src/cli.js` / `package.json` `files` / `prepack`.
- [ ] Confirm `model/model_templates.bin` still packed and 0.3.4 template behaviour unchanged when student is absent.
- [ ] `npm test` green on the rebased HEAD (include `test/student.test.js`).

### Eval / docs before release

- [ ] Run `node scripts/hybrid/eval_student_runtime.js` with the box bundle + `onnxruntime-node`; record JSON under `hybrid/results/` (or paste tables into `HYBRID.md`). Cover at least: `data/eval`, shell-phrased, blind, `eval_v04`/devtools, real_human / real_tmpl aggregates, OOD + real out-of-catalog.
- [ ] Expand the short "Distilled student fallback" section in `HYBRID.md` with those numbers (A vs A+S vs A+S-full; studentCalls / changed rates; 1-core latency if feasible).
- [ ] Update `CHANGELOG.md` + README hybrid section for 0.3.5 (install: `npm i -g tellsh onnxruntime-node tellsh-model-student`).
- [ ] Dual review per standing rule (`/cr` then `/crv`, Opus + Codex, max 3 rounds) on the release diff. Docs-only fixes OK; no secret paths in the tree.

### Packages

- [ ] Publish **`tellsh-model-student@0.1.0`** (or bump if weights change) from the box package dir — **lksrz OTP**.
- [ ] Bump **`tellsh` → `0.3.5`**, tag `v0.3.5`, `npm pack` sanity (models present, no private data), then **`npm publish`** — **lksrz OTP**.
- [ ] Verify: fresh install without optional deps = cascade-only; with both optional deps = A+S on low-confidence queries; `TELLSH_HYBRID=0` forces A.

### Explicitly out of scope for 0.3.5

- [ ] Shipping **C** or making A+B / A+S the unconditional default for all installs.
- [ ] Committing ONNX weights into `tellsh` git.
- [ ] Retrain of A/B on `--group structural` (noted debt in `HYBRID.md`; next retrain).
- [ ] Re-enabling runnable `git_grep` / `git_show` (parked on `feat/templates-grep-show`).

## Eval / acceptance criteria

Must hold on the rebased 0.3.5 candidate:

1. **Cascade alone** (no ort / no student): behaviour and accuracy within noise of 0.3.4 on public `data/eval` and template matrix platforms.
2. **A+S** does not increase false accepts on OOD / chit-chat vs A in a way that undoes `keepNone` / `rescue: false` (rejections stay rejections).
3. **A+S** improves or matches A on held-out real_human / new-intent sets in the student eval script; document any regression ≥ 1 pt.
4. Student answers that change the decision are marked so `--yes` will not auto-run them (existing hybrid contract).
5. Missing optional deps → silent degrade to A with `hybrid.unavailable` explaining student install.
6. Full `npm test` pass; no private `/workspace/tellsh-data` content in the tarball.

## Release steps

1. Land rebased PR (or direct docs+code PR) for student runtime → `main`.  
2. Dual review LGTM (max 3 rounds).  
3. From clean worktree @ release commit: `npm test`, `npm pack`, inspect tarball file list.  
4. Pack/publish `tellsh-model-student` from `/workspace/tellsh-hs/hybrid/package/tellsh-model-student` (or refreshed copy) — **OTP**.  
5. Bump tellsh version, CHANGELOG, tag, push tag, `npm publish` — **OTP**.  
6. Smoke: `npx tellsh …` with and without optional deps.

**Note:** 0.3.4 progress log said pack was ready and publish was waiting on OTP; confirm whether `tellsh@0.3.4` is already on npm before publishing 0.3.5 (if 0.3.4 never published, publish 0.3.4 first or skip straight to 0.3.5 only if product accepts skipping the templates-only npm line).

## Open review findings to carry (from `review/hybrid-log.md` + HYBRID.md)

- Out-of-catalog real shell tasks: A rejects less often after v0.4-style training (50.8% → 29.1%); A+B almost never rejects them. Same risk class for any neural fallback — student must keep **rescue: false**.
- Real-usage labels for existing intents are LLM-assigned; line-range intents dominate new-intent eval.
- C-ft trained on a once-leaky export and was not fully retrained — **do not ship C**.
- Next A/B retrain should use `--group structural` (`scripts/real/group.js`); current `--group v04` slightly inflates real-usage (~0.2 pt).
- B / enc-v2 bundle stays out of git; student weights likewise.

## Risks

| Risk | Mitigation |
|---|---|
| Rebase onto 0.3.4 breaks template gate / history safety | Re-run template matrix + student unit tests; dual review |
| Student improves intent but hurts OOD | Keep rescue off; compare OOD columns in eval_student_runtime |
| onnxruntime-node size / CUDA fetch (~hundreds MB) | Optional peer only; document `--onnxruntime-node-install=skip` where relevant |
| Publishing without OTP / wrong account | Only lksrz publishes; never embed tokens in repo or agent logs |
| Private data leak into package | `npm pack` file audit; never copy `/workspace/tellsh-data` |
| Agent token budget | Prefer one focused PR + eval run; avoid re-running full B/C training |

## Pointers for the picking-up agent

- Start: this file + `docs/hybrid-spec.md` + root `HYBRID.md` (student section at end) + `origin/feat/hybrid-student`.  
- Box weights: `/workspace/tellsh-hs/hybrid/package/tellsh-model-student/`.  
- Distill tooling: `/workspace/tellsh-ml` (`ml/distill`).  
- Do not push secrets; do not `npm publish` without lksrz OTP; do not message the user in quiet hours unless production is broken.
