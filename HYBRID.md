# tellsh hybrid: linear cascade + small neural models (v0.3 study)

Branch `hybrid`. Question: does a real small language model help tellsh at runtime, and which one is worth shipping?
Everything below was measured on one shared 8-vCPU box (Xeon Sapphire Rapids, heavily loaded by other jobs during the
work); **all latency numbers are pinned to one core (`taskset -c 0`)**.

## TL;DR

{TLDR}

## Systems

| | what | runtime | size |
|---|---|---|---|
| **A** | v0.2 linear cascade (tool -> intent -> BIO tagger, hashed n-grams, int8) — unchanged | pure JS, zero deps | 2.7 MB |
| **B** | `intfloat/multilingual-e5-small`, vocabulary pruned to PL+EN pieces (250k -> 36k), bottom 6 of 12 layers, fine-tuned as joint tool (55) + intent (149) classifier + BIO slot tagger (37 labels); int8 ONNX | `onnxruntime-node` (or `-web`), own SentencePiece-Unigram tokenizer in JS (`src/rerank/tokenizer.js`, 12 364/12 364 sequences identical to HF) | 26.7 MB (21.7 MB .tgz) |
| **C** | System-1 decision model: Qwen2.5-0.5B-Instruct scores A's top-k candidates in **one forward pass** (prompt lists options A..E with catalog descriptions; next-token logits of the letters). Few-shot (2 examples, no training) and **C-ft** (LoRA r=16 fine-tuned on CPU, 800 steps × 8, plain prompt) | llama.cpp GGUF q8_0 (1 thread) | 531 MB |
| **A+B / A+C** | A answers when its cascade score >= tau; otherwise B/C re-ranks A's top-k: `alpha·log pA + (1-alpha)·log pX` | | |
| **…-safe** | same, but re-ranking only requests A would answer anyway (A's rejections are never turned into answers) | | |

SmolLM2-135M/360M-Instruct were also tried for C: chance-level (15–24%) zero-shot on the option task, Polish is
essentially unsupported, so they were dropped. basal-1.5-mini was not used.

## Method

* **Same held-out sets as v0.2**: `data/eval` (2384, written independently of training), `data/shell/eval`
  (336 shell-phrased), relexicalised `data/eval` for end-to-end exact commands (1326, held-out value pools, same seed as
  `scripts/eval.js`), `data/slots/gold` (208), `data/history/eval` (48), `data/ood_eval` (92).
* **New blind set** `data/hybrid/blind/` (681 rows: 331 EN, 310 PL, 40 OOD; bash/zsh/sh/PowerShell/fish/cmd with matching OS,
  Windows paths, typos, Polish without diacritics, slang, gold slot spans). Written by a separate agent that saw only
  the intent catalog (ids, descriptions, templates), **before any model result was looked at**; never used for training,
  calibration or any modelling decision. 59 of its texts turned out to also occur in A's training data (short generic
  queries such as "install htop"); B/C training drops them, and the "blind, novel texts only" rows (527) exclude every
  blind text that occurs in any training file.
* **Private real-history set** (`/workspace/tellsh-data`, not committed, aggregate numbers only): 6865 PL/EN paraphrases of
  real shell-history commands whose catalog intent was assigned by an LLM pipeline (labels not human-verified; many
  rows are short or literal command-like texts). Treat as a noisy robustness signal.
* **Calibration on training data only.** A 10% group-wise *dev split* of the training sentences (`export_data.js`, hash of
  the normalised text) is never used to fit B or C. Because the shipped A was trained on those sentences, a shadow
  **A_dev** (`scripts/hybrid/train_a_dev.sh`: identical pipeline minus the dev split) provides honest cascade scores on
  dev; tau / k / alpha / accept / none / keepNone are grid-searched there (objective: decision accuracy = correct intent,
  or rejection for out-of-domain) and the resulting policy is applied to the shipped A.
* *Disclosure:* the first calibration ignored OOD (only 48 of 2669 dev rows) and the first held-out run showed the
  rerankers answering almost every OOD request (A+B 47.8%, A+C 0% rejection on `data/ood_eval`). Two OOD safeguards were
  then added to the *procedure* (dev OOD rejection may not drop more than ~2 rows below A_dev's; option to keep A's
  rejection when stage 1 says `__none__`), plus the "safe" variants. No other change was informed by held-out results.
* **C cost control:** C was scored (Python, same prompts/weights) on every row A would defer at tau <= 0.9 plus a 10%
  uniform sample (for "C alone"); calibration of A+C is restricted to tau <= 0.9. "C alone" rows are therefore smaller
  samples (n shown).

## Results

<!-- hybrid:start -->
### Classification (full pipeline; a rejected request counts as wrong)

| set | system | n | tool | intent | intent EN | intent PL | answered | precision | deferred to B/C |
|---|---|---|---|---|---|---|---|---|---|
| `data/eval` (bash) | A cascade (v0.2) | 2384 | 97.2% | **94.0%** | 94.4% | 93.6% | 97.7% | 96.3% | – |
| `data/eval` (bash) | B encoder alone | 2384 | 94.5% | **85.9%** | 86.6% | 85.3% | 99.7% | 86.2% | 100.0% |
| `data/eval` (bash) | A+B hybrid | 2384 | 98.1% | **95.9%** | 96.1% | 95.7% | 99.7% | 96.2% | 28.3% |
| `data/eval` (bash) | A+B safe (no rescue) | 2384 | 97.8% | **94.4%** | 94.7% | 94.1% | 97.6% | 96.7% | 28.3% |
| `data/eval` (bash) | C LM rerank alone | 222 | 91.0% | **82.0%** | 84.8% | 79.5% | 99.5% | 82.4% | 100.0% |
| `data/eval` (bash) | A+C hybrid | 2384 | 97.6% | **96.1%** | 96.7% | 95.5% | 99.8% | 96.3% | 28.3% |
| `data/eval` (bash) | A+C safe (no rescue) | 2384 | 97.4% | **94.7%** | 95.4% | 94.0% | 97.7% | 97.0% | 28.3% |
| `data/shell/eval` (shell-phrased) | A cascade (v0.2) | 336 | 97.9% | **94.6%** | 95.1% | 94.2% | 96.4% | 98.1% | – |
| `data/shell/eval` (shell-phrased) | B encoder alone | 336 | 96.4% | **92.0%** | 91.5% | 92.4% | 100.0% | 92.0% | 100.0% |
| `data/shell/eval` (shell-phrased) | A+B hybrid | 336 | 98.5% | **97.9%** | 98.2% | 97.7% | 100.0% | 97.9% | 23.2% |
| `data/shell/eval` (shell-phrased) | A+B safe (no rescue) | 336 | 97.9% | **94.9%** | 95.7% | 94.2% | 96.4% | 98.5% | 23.2% |
| `data/shell/eval` (shell-phrased) | C LM rerank alone | 36 | 91.7% | **80.6%** | 81.3% | 80.0% | 100.0% | 80.6% | 100.0% |
| `data/shell/eval` (shell-phrased) | A+C hybrid | 336 | 97.6% | **96.7%** | 97.6% | 95.9% | 100.0% | 96.7% | 23.2% |
| `data/shell/eval` (shell-phrased) | A+C safe (no rescue) | 336 | 97.6% | **94.3%** | 95.1% | 93.6% | 96.4% | 97.8% | 23.2% |
| blind (all) | A cascade (v0.2) | 641 | 98.9% | **98.8%** | 98.5% | 99.0% | 99.8% | 98.9% | – |
| blind (all) | B encoder alone | 641 | 95.8% | **89.4%** | 89.7% | 89.0% | 100.0% | 89.4% | 100.0% |
| blind (all) | A+B hybrid | 641 | 99.4% | **98.9%** | 98.8% | 99.0% | 100.0% | 98.9% | 14.7% |
| blind (all) | A+B safe (no rescue) | 641 | 99.4% | **98.8%** | 98.8% | 98.7% | 99.8% | 98.9% | 14.7% |
| blind (all) | C LM rerank alone | 63 | 92.1% | **77.8%** | 91.2% | 62.1% | 100.0% | 77.8% | 100.0% |
| blind (all) | A+C hybrid | 641 | 99.5% | **99.4%** | 99.1% | 99.7% | 100.0% | 99.4% | 14.7% |
| blind (all) | A+C safe (no rescue) | 641 | 99.5% | **99.2%** | 99.1% | 99.4% | 99.8% | 99.4% | 14.7% |
| blind, novel texts only | A cascade (v0.2) | 527 | 98.9% | **98.7%** | 98.2% | 99.2% | 99.8% | 98.9% | – |
| blind, novel texts only | B encoder alone | 527 | 95.6% | **89.9%** | 90.9% | 88.9% | 100.0% | 89.9% | 100.0% |
| blind, novel texts only | A+B hybrid | 527 | 99.4% | **98.9%** | 98.5% | 99.2% | 100.0% | 98.9% | 15.4% |
| blind, novel texts only | A+B safe (no rescue) | 527 | 99.4% | **98.7%** | 98.5% | 98.8% | 99.8% | 98.9% | 15.4% |
| blind, novel texts only | C LM rerank alone | 47 | 93.6% | **78.7%** | 96.2% | 57.1% | 100.0% | 78.7% | 100.0% |
| blind, novel texts only | A+C hybrid | 527 | 99.4% | **99.2%** | 98.9% | 99.6% | 100.0% | 99.2% | 15.4% |
| blind, novel texts only | A+C safe (no rescue) | 527 | 99.4% | **99.1%** | 98.9% | 99.2% | 99.8% | 99.2% | 15.4% |
| private real-history (unverified labels) | A cascade (v0.2) | 6865 | 65.8% | **48.5%** | 49.6% | 47.5% | 61.1% | 79.5% | – |
| private real-history (unverified labels) | B encoder alone | 6865 | 59.9% | **52.9%** | 54.1% | 51.6% | 99.2% | 53.3% | 100.0% |
| private real-history (unverified labels) | A+B hybrid | 6865 | 71.8% | **67.1%** | 67.8% | 66.4% | 99.2% | 67.6% | 82.4% |
| private real-history (unverified labels) | A+B safe (no rescue) | 6865 | 67.5% | **49.7%** | 51.3% | 48.1% | 61.1% | 81.3% | 82.4% |

### Per shell

Blind set, intent accuracy by the row's shell (n in header); `data/eval` re-scored under each shell/OS context.

| system | blind bash (n=226) | blind zsh (n=142) | blind sh (n=44) | blind powershell (n=125) | blind fish (n=50) | blind cmd (n=54) | data/eval as bash | data/eval as zsh | data/eval as sh | data/eval as powershell | data/eval as fish | data/eval as cmd |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A cascade (v0.2) | 98.7% | 97.9% | 100.0% | 99.2% | 98.0% | 100.0% | 94.0% | 94.1% | 93.9% | 93.8% | 93.8% | 93.5% |
| B encoder alone | 91.6% | 86.6% | 90.9% | 90.4% | 88.0% | 85.2% | 85.9% | 86.3% | 86.3% | 85.9% | 85.8% | 86.1% |
| A+B hybrid | 99.1% | 97.9% | 100.0% | 99.2% | 98.0% | 100.0% | 95.9% | 96.3% | 95.9% | 96.1% | 96.1% | 95.7% |
| A+B safe (no rescue) | 98.7% | 97.9% | 100.0% | 99.2% | 98.0% | 100.0% | 94.4% | 94.8% | 94.6% | 94.4% | 94.5% | 94.4% |
| C LM rerank alone | 75.0% | 61.5% | 100.0% | 100.0% | 100.0% | 80.0% | n/a | n/a | n/a | n/a | n/a | n/a |
| A+C hybrid | 99.6% | 98.6% | 100.0% | 100.0% | 98.0% | 100.0% | n/a | n/a | n/a | n/a | n/a | n/a |
| A+C safe (no rescue) | 99.1% | 98.6% | 100.0% | 100.0% | 98.0% | 100.0% | n/a | n/a | n/a | n/a | n/a | n/a |

### Out-of-domain rejection

| system | `data/ood_eval` | blind OOD |
|---|---|---|
| A cascade (v0.2) | 92.4% (n=92) | 95.0% (n=40) |
| B encoder alone | 85.9% (n=92) | 90.0% (n=40) |
| A+B hybrid | 85.9% (n=92) | 90.0% (n=40) |
| A+B safe (no rescue) | 92.4% (n=92) | 95.0% (n=40) |
| C LM rerank alone | 83.3% (n=12) | 100.0% (n=3) |
| A+C hybrid | 83.7% (n=92) | 90.0% (n=40) |
| A+C safe (no rescue) | 92.4% (n=92) | 95.0% (n=40) |

### Slots (stage 3, gold intent given)

| set | tagger | precision | recall | F1 | F1 EN | F1 PL |
|---|---|---|---|---|---|---|
| `data/slots/gold` (208) | A tagger + regex (shipped) | 94.9% | 96.4% | **95.7%** | 95.9% | 95.4% |
| `data/slots/gold` (208) | A tagger only | 98.9% | 90.0% | **94.2%** | 95.0% | 93.4% |
| `data/slots/gold` (208) | B tagger + regex | 94.3% | 96.1% | **95.2%** | 96.5% | 93.8% |
| `data/slots/gold` (208) | B tagger only | 98.5% | 84.8% | **91.1%** | 93.2% | 89.0% |
| blind (641) | A tagger + regex (shipped) | 89.3% | 94.5% | **91.8%** | 91.0% | 92.7% |
| blind (641) | A tagger only | 96.6% | 90.2% | **93.3%** | 93.9% | 92.7% |
| blind (641) | B tagger + regex | 88.9% | 94.3% | **91.5%** | 90.7% | 92.5% |
| blind (641) | B tagger only | 98.7% | 86.5% | **92.2%** | 91.7% | 92.7% |

### End-to-end exact command (bash for relex; the row's own shell for blind)

| system | relex `data/eval` (EN / PL) | blind (EN / PL) | blind novel | history refs |
|---|---|---|---|---|
| A cascade (v0.2) | 82.8% (82.2% / 83.4%) | 94.4% (94.0% / 94.8%) | 93.4% | 47/48 |
| B encoder alone | 83.0% (83.2% / 82.7%) | 85.3% (85.5% / 85.2%) | 85.0% | 47/48 |
| A+B hybrid | 87.7% (86.9% / 88.5%) | 94.4% (94.3% / 94.5%) | 93.4% | 47/48 |
| A+B safe (no rescue) | 84.5% (83.8% / 85.3%) | 94.4% (94.3% / 94.5%) | 93.4% | 47/48 |
| C LM rerank alone | n/a (n=6) | 74.6% (88.2% / 58.6%) | 74.5% | 47/48 |
| A+C hybrid | 85.7% (84.9% / 86.5%) | 94.5% (94.0% / 95.2%) | 93.4% | 47/48 |
| A+C safe (no rescue) | 83.0% (82.2% / 83.9%) | 94.5% (94.0% / 95.2%) | 93.4% | 47/48 |

### Calibrated policies (training dev split, A_dev)

Dev rows: 2669 (in-domain + OOD; A_dev accept threshold 0.29). Objective: decision accuracy (correct intent, or rejection for OOD).

| system | tau (A conf to answer alone) | k | alpha (weight of log pA) | accept | none | dev decision acc | dev deferred |
|---|---|---|---|---|---|---|---|
| A_dev alone | – | – | – | – | – | 81.8% | – |
| B | Infinity | 0 | 0 | 0 | 0.5, keepNone | 80.2% (n=2669) | 100.0% |
| A+B | 0.9 | 5 | 0.5 | 0 | 0.5, keepNone | 87.9% (n=2669) | 57.0% |
| A+B-safe | 0.9 | 5 | 0.5 | 0 | 0.5 | 84.9% (n=2669) | 57.0% |
| C | Infinity | 3 | 0 | 0 | 1.01, keepNone | 67.2% (n=1522) | 100.0% |
| A+C | 0.9 | 5 | 0.75 | 0 | 1.01, keepNone | 87.6% (n=2669) | 57.0% |
| A+C-safe | 0.9 | 5 | 0.75 | 0 | 1.01 | 84.5% (n=2669) | 57.0% |

### C: zero-/few-shot choice accuracy (gold forced among 5 shuffled candidates, 100 dev rows)

| model | prompt | letters | acc | EN | PL | prompt tokens |
|---|---|---|---|---|---|---|
| SmolLM2-135M-Instruct (float32) | 0-shot chat | "A" | 20% | 15% | 26% | 125.7 |
| SmolLM2-135M-Instruct (float32) | 0-shot chat | " A" | 24% | 27% | 20% | 125.7 |
| Qwen2.5-0.5B-Instruct (bfloat16) | 0-shot chat | "A" | 65% | 70% | 59% | 111.5 |
| SmolLM2-360M-Instruct (float32) | 0-shot chat | "A" | 18% | 15% | 22% | 125.7 |
| Qwen2.5-0.5B-Instruct (bfloat16) | 0-shot chat | " A" | 66% | 72% | 59% | 111.5 |
| Qwen2.5-0.5B-Instruct (bfloat16) | 2-shot chat | "A" | 79% | 87% | 70% | 307.5 |
| SmolLM2-360M-Instruct (float32) | 0-shot chat | " A" | 15% | 13% | 17% | 125.7 |

### Latency (one core: `taskset -c 0`; Intel(R) Xeon(R) Processor, Node v20.19.2; shared machine under load)

| measurement | p50 / p95 ms |
|---|---|
| warm A (full pipeline, composer off) | 0.34 / 4.399 |
| warm B encoder inference only (onnxruntime-node) | 3.547 / 5.669 |
| warm B alone, full pipeline (onnxruntime-node) | 4.653 / 9.477 |
| warm A+B, full pipeline (onnxruntime-node; 30.3% deferred) | 0.376 / 8.338 |
| B bundle load + session create (onnxruntime-node) | 189 |
| warm B encoder inference only (onnxruntime-web) | 32.59 / 44.271 |
| warm B alone, full pipeline (onnxruntime-web) | 32.403 / 41.737 |
| warm A+B, full pipeline (onnxruntime-web; 30.3% deferred) | 0.418 / 37.804 |
| B bundle load + session create (onnxruntime-web) | 1099.2 |
| cold `node -e 0` | 90.335 / 106.408 |
| cold A (new process, one query) | 152.678 / 165.871 |
| cold A+B (lazy encoder only when deferred; 9/20 deferred) | 156.715 / 349.333 |
| cold A+B, deferred queries only | 340.429 / 349.333 |
| cold B (always loads the encoder) | 341.633 / 355.12 |
| C qwen05-q8_0.gguf: 112-token prompt (llama.cpp, 1 thread, 474 tok/s) | 236 |
| C qwen05-q8_0.gguf: 308-token prompt (llama.cpp, 1 thread, 422 tok/s) | 731 |
| C cold qwen05-q8_0.gguf: new llama-cli process, load + 300-token prompt | 1665.217 / 1698.228 |
| C qwen05-q4_k_m.gguf: 112-token prompt (llama.cpp, 1 thread, 119 tok/s) | 942 |
| C qwen05-q4_k_m.gguf: 308-token prompt (llama.cpp, 1 thread, 118 tok/s) | 2617 |
| C cold qwen05-q4_k_m.gguf: new llama-cli process, load + 300-token prompt | 3425.443 / 3426.963 |

B bundle files: encoder.int8.onnx 26.7 MB, export_report.json 0.0 MB, labels.json 0.0 MB, manifest.json 0.0 MB, vocab.json 0.7 MB.

### B quantisation (dev split, 600 rows; 1-core onnxruntime-node p50)

| variant | size MB | dev intent acc | argmax agreement with fp32 | p50 ms |
|---|---|---|---|---|
| PyTorch fp32 (reference) | 99.7 | 83.7% | 100.0% | n/a |
| dynamic int8 (QOperator), per-tensor, int8 embeddings, fp32 heads | 25.4 | 74.7% | 85.7% | n/a |
| dynamic int8, per-channel, int8 embeddings | 25.3 | n/a | 95.7% | 1.86 |
| weight-only 4-bit (MatMulNBits + 4-bit embeddings), fp32 compute | 16.1 | 81.7% | 94.5% | n/a |
| weight-only 8-bit MatMulNBits, int8 embeddings, fp32 compute | 26.7 | 84.2% | 99.0% | 17.3 |
| weight-only 8-bit MatMulNBits accuracy_level=4 (int8 compute), int8 embeddings  [shipped] | 26.7 | 84.3% | 98.7% | 4.25 |

### Sizes

| artefact | size |
|---|---|
| tellsh npm package (A, zero dependencies) | 1.1 MB packed (model.bin 2.71 MB) |
| B bundle (tellsh-model-enc): encoder.int8.onnx + vocab.json | 26.72 + 0.73 MB (21.7 MB .tgz) |
| B params: e5-small 117.6M -> PL+EN vocab 250002 -> 36357 pieces 35.6M -> 6 layers 25M | |
| onnxruntime-node (runtime for B) | 113.5 MB .tgz, 301 MB unpacked (all platforms), + 272.1 MB CUDA EP downloaded by its postinstall on linux-x64 (skip: `--onnxruntime-node-install=skip`); linux-x64 lib alone 45.8 MB |
| onnxruntime-web (WASM alternative) | 33.1 MB .tgz (one .wasm 14.2 MB) |
| C: Qwen2.5-0.5B GGUF | q8_0 531 MB, Q4_K_M 398 MB (+ llama.cpp CPU build 17.8 MB) |
<!-- hybrid:end -->

## Discussion

{DISCUSSION}

## Recommendation for v0.3

{RECO}

## Reproduce

```sh
node scripts/hybrid/export_data.js                         # raw-text training data + dev split -> build/hybrid/
python3 scripts/hybrid/prune_vocab.py                      # PL+EN vocabulary pruning of multilingual-e5-small
python3 scripts/hybrid/train_encoder.py --layers 6 --epochs 2.5   # B (resumable; ~1.2 h on 2 busy CPU threads)
python3 scripts/hybrid/export_encoder.py --wq 8 --gather --acc-level 4 --out hybrid/models/enc
node scripts/hybrid/fetch_model.js --manifest hybrid/models/enc   # + `--from <dir|https-url>` installs to ~/.cache/tellsh/enc-v1
scripts/hybrid/train_a_dev.sh                              # A_dev (cascade without the dev split) for calibration
node scripts/hybrid/dump_cascade.js --tag=ship             # A's top-k for every set (and --model=build/adev/model/model.bin --tag=adev)
python3 scripts/hybrid/lm_rerank.py zeroshot|train|score   # C (see build/hybrid/run_lm_*.sh); GPU: scripts/hybrid/train_lm_gpu.py
node scripts/hybrid/eval_hybrid.js --calibrate --lm=adev:qwenfs && node scripts/hybrid/eval_hybrid.js --lm=ship:qwenfs
node scripts/hybrid/eval_hybrid.js --calibrate --lm=adev:qwenft --tag=_ft && node scripts/hybrid/eval_hybrid.js --lm=ship:qwenft --tag=_ft --systems=A,C,A+C,A+C-safe
taskset -c 0 node scripts/hybrid/bench_hybrid.js           # LLAMA_BIN=… LLAMA_MODELS=…gguf for C
node scripts/hybrid/report_hybrid.js                       # tables above
```
Runtime: `tellsh --hybrid …` (or `TELLSH_HYBRID=1`) uses A+B with the encoder loaded lazily only when the cascade defers;
without `onnxruntime-node` / the bundle it silently falls back to A. Re-ranked answers are never auto-run with `--yes`.
