# ml/ir — typed-IR model trainer (pilot)

Trains the System-1 typed-IR model of `docs/IR.md` §4: a shared encoder (3×384, initialised from the S student),
the **P route** (parallel heads, one encoder pass) and the **D route** (a small transformer decoder over the canonical
action vocabulary with copy pointers over request units). Scoring uses the real `ir/lib` gate and compiler (node).

All IR logic lives in JS. Python only sees token ids, unit maps and target ids:

| file | role |
|---|---|
| `scripts/ir/actions.mjs` | action vocabulary (§4.4) + P head vocabularies from the schemas; IR → canonical actions; actions → IR; P targets / P assembly |
| `scripts/ir/export_targets.mjs` | dataset v1 → `build/ir/targets/v1/{train,dev,test}.jsonl`, `vocab.json`, `stats.json` (student Unigram tokenizer, pointer units, round-trip check of every target) |
| `scripts/ir/eval_pred.mjs` | predictions → IR → `gate` / `canon` / compiled command; metrics per route |
| `ml/ir/data.py` | reads exported targets, batches them |
| `ml/ir/model.py` | encoder (TSJ1 `student.bin` int8 → f32 init), P heads, D decoder, greedy decoding |
| `ml/ir/train.py` | training loop (CUDA/AMP or CPU), checkpoints + resume, dev eval each epoch |
| `ml/ir/eval.py` | writes predictions; scores them through `eval_pred.mjs` (or later, `--score-only`) |
| `ml/ir/metrics.py` | prediction rows + quick in-Python dev metrics |

## Targets (what the model learns)

- **label**: `ok | ambiguous | underspecified | out_of_scope | not_shell` (5-way; `ambiguous` is trained as a label
  although the IR itself has no such status).
- **P route** (rows that are one part × one exec stage with ≤1 value per slot, ≈43% of train): `single` (shape),
  `op` (+`none`), `pin`, `stderr`, `mods` (multi-label sigmoid, masked to the op's supported set at assembly), and per
  *slot* (`@cwd`, `arg:<role>`, `mod:<valued mod>`) a value kind (`none | SPAN | norm:<kind> | const:<id>`) and a
  start/end unit pointer.
- **D route**: canonical action sequence (§4.4): status; `CWD` value; per stage `op`, `pin`, first-required-role
  values, mods in schema order each followed by its values, `arg:<role>` + values, `STDERR:*`; then
  `PIPE`/`EACH`/`AND`/`EOS`. `SPAN` and `norm:*` take a pointer `[u0, u1)` in the same step. `OOS` may be followed by
  `reason:<OosReason>` (parsed from the dataset reason prefix). 197 actions today.
- Deviations from §4: an `AMBIG` status action; no `missing:<Role>` (dataset reasons are free text); no grammar mask
  yet (training is unmasked cross-entropy; inference only restricts the first action to a status); pointer = start
  then end conditioned on start (`j ≥ i`, `j − i < 8`) instead of the full biaffine scorer.

## Model and arms

- encoder 16.0M params (10.5M of them the 27k×384 word embedding), P heads 0.9M, decoder 12.6M (5 layers × 384,
  8 heads, FF 1536, cross-attention over token + unit states; `--d-layers/--d-model/--d-ff` configurable), total 29.5M.
- `--arm H8` (default): f32 weights, bf16/fp16 autocast on CUDA.
- `--arm HQ` / `--arm T50`: ternary QAT, see below.

## Ternary QAT arms (`ml/ir/bitlinear.py`)

BitNet b1.58-style: `BitLinear` keeps f32 shadow weights and in the forward pass uses absmean ternary weights
(`round(w / mean|w|)` clamped to {-1,0,1}, one scale per matrix) and per-token absmax int8 activations, both through a
straight-through estimator. Embeddings, LayerNorms, the pointer / P / D heads, `mem` and `span_proj` stay high precision.

- `--arm HQ`: the H8 (student-initialised 3×384) encoder with its linears ternarized from the start of training.
- `--arm T50`: a wider encoder from scratch (`--enc-layers 6 --enc-hidden 512 --enc-heads 8 --enc-ff 2048` default;
  e.g. `--enc-hidden 768 --enc-heads 12 --enc-ff 3072`), student vocab / tokenizer, no student weights.
- `--tern-enc / --no-tern-enc` (default on for HQ/T50), `--tern-dec` (the D decoder becomes `TernDecoder`, a pre-norm
  decoder with BitLinear projections; not state-dict compatible with the f32 decoder), `--subln` (LayerNorm before every
  quantized projection, BitNet SubLN; fresh init, so it perturbs HQ's pretrained layers).
- `packed_size(model)` (printed at train start as `packed {...}`) counts BitLinear weights packed at 2 bits
  (`pack2` / `unpack2`, 4 per byte) + an f32 scale, and every other parameter at f16 and int8 (+ per-row scale).

| config | params | ternary | total, rest f16 | total, rest int8 |
|---|---|---|---|---|
| H8 | 29.5M | 0 | 56.3 MB | 28.4 MB |
| HQ (enc) | 29.5M | 5.3M | 47.5 MB | 24.6 MB |
| HQ + `--tern-dec` | 29.5M | 17.1M | 27.8 MB | 16.1 MB |
| T50 6×512 | 47.4M | 18.9M | 59.0 MB | 32.0 MB |
| T50 6×512 + `--tern-dec` | 47.4M | 30.7M | 39.3 MB | 23.4 MB |
| T50 6×768 + `--tern-dec` | 79.6M | 54.3M | 61.3 MB | 37.2 MB |

The word embedding (27k × H) dominates the high-precision remainder. `eval.py` rebuilds the model from the checkpoint's
args without the ternary flags, so it only loads HQ checkpoints trained without `--tern-dec`/`--subln`; the in-training
dev eval covers all arms.

## Local (Mac)

```sh
node scripts/ir/export_targets.mjs                      # -> build/ir/targets/v1 (≈25 s)
node scripts/ir/eval_pred.mjs --oracle --data build/ir/dataset/v1/dev.jsonl   # pipeline sanity: D/PD must be 100%
python ml/ir/train.py --out build/ir/runs/smoke --limit 2000 --max-steps 300 --batch 32 --dev-limit 300
python ml/ir/eval.py --ckpt build/ir/runs/smoke/best.pt --split dev
```

## Full run on the Windows GPU box (aic-wfs-pc: Python 3.10, venv `D:\tellsh-ir\venv`, torch cu124, no node)

Copy to `D:\tellsh-ir\tellsh\` keeping the repo layout:

- `ml/ir/*.py`
- `build/ir/targets/v1/{train,dev,test}.jsonl`, `vocab.json` (≈ 20 MB; produced on the Mac by `export_targets.mjs`)
- `hybrid/models/student/student.bin` (encoder init)

```bat
cd /d D:\tellsh-ir\tellsh
D:\tellsh-ir\venv\Scripts\python ml\ir\train.py --out build\ir\runs\h8 --epochs 20 --batch 128 --lr 3e-4 --enc-lr 1e-4 --workers 2
REM resume after an interruption
D:\tellsh-ir\venv\Scripts\python ml\ir\train.py --out build\ir\runs\h8 --epochs 20 --batch 128 --lr 3e-4 --enc-lr 1e-4 --workers 2 --resume
REM predictions only (no node there)
D:\tellsh-ir\venv\Scripts\python ml\ir\eval.py --ckpt build\ir\runs\h8\best.pt --split dev  --no-node --preds-out build\ir\runs\h8\preds_dev.jsonl
D:\tellsh-ir\venv\Scripts\python ml\ir\eval.py --ckpt build\ir\runs\h8\best.pt --split test --no-node --preds-out build\ir\runs\h8\preds_test.jsonl
```

Bring `preds_*.jsonl` (and `best.pt`, `log.jsonl`) back to the Mac and score them:

```sh
python3 ml/ir/eval.py --score-only --split dev  --preds build/ir/runs/h8/preds_dev.jsonl
python3 ml/ir/eval.py --score-only --split test --preds build/ir/runs/h8/preds_test.jsonl
```

`train.py` logs to `OUT/log.jsonl` (train loss parts every `--log-every` steps, dev eval each epoch: label accuracy of
P and D, exact action-sequence match `d_exact`, P exact on P-expressible rows), writes `OUT/last.pt` each epoch and
`OUT/best.pt` (weights only, no optimizer state) on the best `d_exact`.

## Metrics (`eval_pred.mjs`, per route P, D and PD = P when it predicts ok + one stage and the gate accepts, else D)

- `label_acc`; `exact_ir` (canon(pred) = canon(gold), gold-ok rows); `cmd_match` (accepted and the compiled command
  equals the gate-compiled gold command, gold-ok rows);
- **`accepted_wrong`** — the gate accepts the prediction but its command differs from gold, or gold is not `ok`
  (rate over all rows and over accepted rows): the key safety metric;
- `abstain_precision` / `abstain_recall` — abstain = no accepted command (model abstention, decode failure or gate
  rejection); positive = gold label not `ok`.

## Confidence + calibration

`eval.py` writes the probabilities of the greedy choices into each prediction row (extra keys; old readers ignore
them): `p.conf = {label, min, prod}` (label prob; min / product over the P probs the prediction uses: label, single,
op, pin, stderr, every mod bit, every slot kind, start/end of predicted pointer slots) and
`d.conf = {label, min_tok, min_margin, ptr_min, ptr_logp}` (status-token prob, min action-token prob, min top1-top2
margin, min / summed log of pointer start*end probs); `d.logp` stays the summed action-token log-prob. Greedy only
(no beam). Older preds (no `conf`) still calibrate on `p_label` (= `p.label_prob`) and `d_seqprob` only.

Scalar confidences swept: P `p_label`, `p_min`, `p_prod`; D `d_label`, `d_min_tok`, `d_seqprob` = exp(logp),
`d_min_all` = min(min_tok, ptr_min), `d_prob_all` = exp(logp + ptr_logp) (combined), `d_margin`. PD sweeps a P-fast-path
threshold (20 quantiles) jointly with a D threshold.

Re-run predictions on the GPU box with the current `ml/ir/*.py` (copy `eval.py` and `model.py` over first):

```bat
cd /d D:\tellsh-ir\tellsh
D:\tellsh-ir\venv\Scripts\python ml\ir\eval.py --ckpt build\ir\runs\h8\best.pt --split dev  --no-node --preds-out build\ir\runs\h8\preds_dev.jsonl
D:\tellsh-ir\venv\Scripts\python ml\ir\eval.py --ckpt build\ir\runs\h8\best.pt --split test --no-node --preds-out build\ir\runs\h8\preds_test.jsonl
```

Then on the Mac (thresholds are chosen on dev only and applied unchanged to test):

```sh
node scripts/ir/eval_pred.mjs --data build/ir/dataset/v1/dev.jsonl --preds build/ir/runs/h8/preds_dev.jsonl \
  --calibrate --thresholds-out build/ir/runs/h8/thresholds.json --out build/ir/runs/h8/preds_dev.cal.json
node scripts/ir/eval_pred.mjs --data build/ir/dataset/v1/test.jsonl --preds build/ir/runs/h8/preds_test.jsonl \
  --thresholds build/ir/runs/h8/thresholds.json --out build/ir/runs/h8/preds_test.thr.json
```

`report.calibration.routes.{P,D}`: `by_def[def][target]` (best threshold per definition), `chosen_<target>`
(the definition with max coverage), `reliability` (10 equal-count bins over accepted rows: confidence range, mean,
% correct); `routes.PD[target]`. Targets = accepted-wrong rate over kept rows <= 0.5 / 1 / 2 %; `t: "Infinity"`
means nothing can be kept. `report.thresholded.routes[route][target]` = coverage / accepted-wrong on the scored split.
Small kept counts on dev (tens of rows) make the 0.5 % target statistically weak; check the test numbers.

Prediction ids are `<split>:<line>` of `build/ir/dataset/v1/<split>.jsonl`; scoring needs that file (gold IR).

## Learned verifier (`ml/ir/verifier.py`)

The gate checks structure and provenance, not meaning, and the generator's own confidence does not separate right
from wrong (dev-chosen thresholds fail on test). The verifier scores `p(correct | request, os, command)` for every
gate-accepted candidate; the pipeline is generator → gate → verifier(threshold).

- **Model**: cross-encoder, encoder initialised from the S student exactly like `model.py` (same `Encoder`, same
  `student.bin`), input `<s> os: request </s></s> command </s>` (student Unigram tokenizer, ≤ 160 tokens, ids made in
  JS so the GPU box needs no node), mean-pool + linear head. BCE with label smoothing (`--smooth 0.02`), AdamW (encoder
  5e-5, head 1e-3), warmup + cosine, CUDA AMP (bf16, or fp16 + GradScaler on the 2080 Ti) or CPU. `OUT/last.pt` each
  epoch (`--resume`), `OUT/best.pt` on the best dev AUC (ties: lower ECE), early stop after `--patience` evals.
  No IR string input yet (optional extension). CPU scoring ≈ 1.3–2.8 ms/pair (batch 256), fine to run on the Mac.
- **Data** (`scripts/ir/make_negatives.mjs`, deterministic, split kept → no skeleton leakage): positive = gate-compiled
  gold command of each ok row (canon has one rendering per meaning, so no extra equivalent renderings); up to `--k 4`
  hard negatives per row = perturbations of the gold IR that the gate **still accepts** and that compile to another
  command: `mod_drop`, `mod_add` (unrequested boolean mod), `mod_swap` (sibling boolean mod), `span_shift` (copied span
  ±1 unit at either end), `span_other` (another span of the request), `role_swap` (e.g. path ↔ pattern), `op_family`
  (head ↔ tail, …), `stage_drop`; picked round-robin over kinds. `--errors DUMP.jsonl:SPLIT` adds real model errors
  (`eval_pred.mjs --dump` rows) as negatives of that split. v1: train 24 805 pos / 69 219 neg, dev 1 897 / 4 980,
  test 816 / 2 442 (≈ 105 s). Negatives are far more frequent than on real candidates (h8 PD dev: 82 % correct), so
  calibration on real candidates needs `score_combined.mjs` (thresholds chosen on real dev candidates), not the
  synthetic-dev ECE.
- **Candidates** (`scripts/ir/make_candidates.mjs`): eval.py preds → the PD route's gate-accepted command per row
  (same routing as `eval_pred.mjs`) with token ids → `cand_<split>.jsonl`.
- **Combined scoring** (`scripts/ir/score_combined.mjs`): coverage (correct kept / gold ok), accepted-wrong over kept
  with a one-sided 95 % Clopper–Pearson upper bound, abstention precision / recall (positive = row without a correct
  accepted candidate), verifier AUC / ECE on accepted candidates, a threshold sweep; the threshold is chosen on dev
  (max kept with accepted-wrong ≤ `--target` %, by upper bound and by point estimate) and applied unchanged to test.
  At 0.5 % the upper bound needs ≥ ~600 kept dev rows with zero errors.

Mac (data, candidates):

```sh
node scripts/ir/make_negatives.mjs                    # -> build/ir/verifier/v1/{train,dev,test}.jsonl
node scripts/ir/make_candidates.mjs --data build/ir/dataset/v1/dev.jsonl  --preds build/ir/runs/h8/preds_dev.jsonl  --out build/ir/verifier/v1/cand_dev.jsonl
node scripts/ir/make_candidates.mjs --data build/ir/dataset/v1/test.jsonl --preds build/ir/runs/h8/preds_test.jsonl --out build/ir/verifier/v1/cand_test.jsonl
```

GPU box (copy `ml/ir/{model,verifier}.py`, `build/ir/verifier/v1/*.jsonl`, `hybrid/models/student/student.bin`):

```bat
cd /d D:\tellsh-ir\tellsh
D:\tellsh-ir\venv\Scripts\python ml\ir\verifier.py train --data build\ir\verifier\v1 --out build\ir\runs\ver1 --epochs 6 --batch 128 --amp fp16
D:\tellsh-ir\venv\Scripts\python ml\ir\verifier.py train --data build\ir\verifier\v1 --out build\ir\runs\ver1 --epochs 6 --batch 128 --amp fp16 --resume
D:\tellsh-ir\venv\Scripts\python ml\ir\verifier.py score --ckpt build\ir\runs\ver1\best.pt --pairs build\ir\verifier\v1\cand_dev.jsonl  --out build\ir\runs\ver1\scores_dev.jsonl
D:\tellsh-ir\venv\Scripts\python ml\ir\verifier.py score --ckpt build\ir\runs\ver1\best.pt --pairs build\ir\verifier\v1\cand_test.jsonl --out build\ir\runs\ver1\scores_test.jsonl
```

Mac (bring `best.pt` / `scores_*.jsonl` back; or score here on CPU with the same `score` command):

```sh
node scripts/ir/score_combined.mjs \
  --dev-data build/ir/dataset/v1/dev.jsonl   --dev-preds build/ir/runs/h8/preds_dev.jsonl   --dev-scores build/ir/runs/ver1/scores_dev.jsonl \
  --test-data build/ir/dataset/v1/test.jsonl --test-preds build/ir/runs/h8/preds_test.jsonl --test-scores build/ir/runs/ver1/scores_test.jsonl \
  --target 0.5 --out build/ir/runs/ver1/combined.json
```
