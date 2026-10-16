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
- `--arm H8` (default): f32 weights, bf16/fp16 autocast on CUDA. `--arm HQ` (ternary QAT) is a reserved hook and raises
  `NotImplementedError`.

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

Prediction ids are `<split>:<line>` of `build/ir/dataset/v1/<split>.jsonl`; scoring needs that file (gold IR).
