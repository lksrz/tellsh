# Typed-IR model: native latency (track B)

Question: does the typed-IR architecture fit in **≤0.5 s per request** in a native runtime, both cold and warm?
The architecture is the student encoder (3×384, XLM-R vocab 27k) plus the P heads plus the D decoder (5×384, FF 1536, copy pointer), 29.5M params in total (`param_counts`: encoder 16.0M, of which 10.5M is the word embedding; P heads 0.9M; decoder 12.6M).

**Answer: yes, with a large margin.** On an M1 Max:
- Warm: ≤40 ms f32 and ≤18 ms int8 for 24 actions.
- Cold fresh-process: about 120–170 ms, excluding the Python interpreter.

## Setup

- `ml/ir/export_onnx.py` exports two ONNX graphs (opset 17):
  - `encoder.onnx`: encoder, P heads (pointer start/end argmax inside the graph), and the per-layer cross-attention K/V of the decoder, computed once per request.
  - `dstep.onnx`: one greedy D step with a self-attention KV cache (past_k/past_v inputs). It re-implements `nn.TransformerDecoderLayer` (norm_first, gelu). It outputs action logits and the copy-pointer start/end, with end conditioned on start as in `Pointer.end_logits`.
- A built-in check runs on every export and teacher-forces 10 steps against `IRModel.d_states`. Max logit diff: 1.5e-6.
- `*.int8.onnx` = `onnxruntime.quantization.quantize_dynamic`, QInt8 weights. Activations are quantized dynamically per call.
- Weights: student encoder plus random P/D weights, using `--random`. Weights do not affect latency. One gotcha: untrained `nn.TransformerDecoder` layers are deep copies with identical values, and the ONNX exporter dedupes them into one initializer, so the file comes out 4× too small. `--random` re-randomises them.
- `ml/ir/bench_native.py` runs onnxruntime 1.31 (Python, CPU EP, ORT_ENABLE_ALL, sequential) on an Apple M1 Max.
  - One request = tokenize (unigram Viterbi in Python over the student vocab) + one encoder run + N step runs, with EOS masked so exactly N actions are decoded.
  - 4 request strings of 2–17 words.
  - Warm = median over 40 requests after 3 warm-ups.
  - Cold = a fresh subprocess, median of 5, warm page cache.

Reproduce:
```
python ml/ir/export_onnx.py --random --out build/ir/onnx
python ml/ir/bench_native.py --onnx build/ir/onnx --json /tmp/bench.json
```

## Sizes

| file | f32 | int8 (dynamic) |
|---|---|---|
| encoder + P heads + cross-K/V projections | 73.5 MB | 18.6 MB |
| decoder step | 44.6 MB | 11.3 MB |
| **total** | **118 MB** | **30 MB** |

- int8 lands at the 30 MB budget edge.
- The 10.5M-row word embedding (27k × 384) is ~10.5 MB even at int8. Pruning the vocab to the tokens the domain uses (e.g. 8k) would save ~7 MB.
- A ternary (BitNet/TQ2) body would take the 19M non-embedding params to ~5 MB.

## Warm latency (ms per request)

Columns: tokenize | encoder+P | per decoder step | **total p50** / p90

| variant | thr | N=8 | N=16 | N=24 | enc+P | step |
|---|---|---|---|---|---|---|
| f32  | 1 | 16.9 / 18.8 | 27.7 / 35.7 | 39.3 / 42.0 | 5.5 | 1.38 |
| f32  | 4 | 13.1 / 14.2 | 25.0 / 31.3 | 33.2 / 38.0 | 2.5 | 1.27 |
| int8 | 1 | 7.2 / 8.1 | 11.7 / 12.7 | 16.6 / 17.7 | 2.1 | 0.58 |
| int8 | 4 | 7.7 / 12.7 | 12.4 / 14.0 | 17.3 / 21.0 | 1.2 | 0.68 |

- Tokenizing takes 0.4 ms in pure Python.
- Each step includes the Python→ORT call overhead (~0.1–0.2 ms), which a native loop would partly remove.
- The decoder at batch 1 is too small to gain from 4 threads. The encoder gains ~2×.

## Cold, fresh process, N=16 (ms, median)

| variant | thr | import ort | tokenizer load | session load (2 graphs) | first request | **native cold** | process wall incl. Python |
|---|---|---|---|---|---|---|---|
| f32  | 1 | 23 | 8 | 127 | 31 | **168** | 289 |
| f32  | 4 | 24 | 9 | 127 | 24 | **162** | 287 |
| int8 | 1 | 23 | 8 | 100 | 14 | **122** | 250 |
| int8 | 4 | 23 | 8 | 97 | 13 | **119** | 235 |

- "Native cold" = import ort + tokenizer + session load + first request. It excludes the Python interpreter start and the numpy import, about 115 ms, which a native binary does not pay.
- Session load is dominated by ORT graph optimisation. In a shipped binary it can be cut by:
  - saving the pre-optimised model (`optimized_model_filepath`), or using the `.ort` format with `ORT_DISABLE_ALL` at load;
  - mmapping the weights.

  Expected: tens of ms. This was not measured here.

## Comparison with the llama.cpp kill-test (tellsh-bench/RESULTS.md, M1 Max, fresh process)

| model | cold wall (load + prompt + 30 tok) | decode ms/tok t1 / t4 |
|---|---|---|
| llama.cpp d12 Q8_0 (12.6M body) | 111 | 0.69 / 0.48 |
| llama.cpp e50 Q8_0 (47M) | 166 | — |
| llama.cpp d100 TQ2_0 (104M) | 132 | 4.0 / 2.4 |
| **IR model, ORT int8, N=24 warm** | — | 0.58 / 0.68 per action + 2.1 ms encoder |
| **IR model, ORT int8, cold N=16** | 119–122 (excl. Python) | |

- Per action, the decoder step (5×384 with cross-attention over ~40 memory positions plus pointer heads) costs about the same as llama.cpp's d12 Q8_0 token. The IR target sequences are short (8–24 actions vs 30 tokens).
- Cold start is in the same 110–170 ms band as llama.cpp.
- Both are far under 0.5 s on M1. Scaling by the kill-test's Xeon-VM factor (~2–3× slower cold, ~5–10× slower per step) gives an estimate for slow x86 of about 300–400 ms cold and ≤150 ms warm for int8 N=24. Not measured.

## Runtime recommendation for the final binary

| option | fit | ternary/BitNet kernels |
|---|---|---|
| **ONNX Runtime C API (from Rust via `ort` crate, or C++)** | Works today with exactly these graphs, has int8 dynamic-quant kernels (MLAS, NEON/AVX2/VNNI), and is measured here. Its cost is a ~15–25 MB shared library (minimal build with only the needed ops: ~3–6 MB) and a session-load that needs `.ort` pre-optimisation. | None. There is no ternary MatMul. It would need a custom op, or the weights stored as int8. |
| candle (Rust) | Pure Rust, static binary, small. The encoder/decoder must be hand-written (the PyTorch modules are simple, ~300 lines). Quantised matmuls use GGML-style q8_0/q4 k-quants. Single-request CPU perf is usually behind ORT/llama.cpp. | None. |
| **ggml custom graph (C, as llama.cpp uses)** | Smallest dependency (~1–2 MB static). It mmaps GGUF, so load is near zero. This is the path the kill-test numbers come from. The encoder, decoder step, KV cache and pointer heads must be written as a ggml graph (~500–800 lines of C), and the converter (GGUF writer) is ours. | **Yes**: TQ1_0/TQ2_0 are in ggml mainline, so ternary weights are usable directly. bitnet.cpp's I2_S/TL1/TL2 kernels are a ggml fork and could be ported. |
| Hand-written C/Rust (no framework) | ~30M params at batch 1 is small enough that int8 GEMV with NEON/AVX2 intrinsics is a few hundred lines. Smallest and most controllable, but the most work to make fast on every CPU. | We would write our own. Ternary GEMV is simple (add/sub) and exactly where it pays. |

**Recommendation:**
- **Ship on a ggml custom graph** (GGUF, mmap, Q8_0 now, TQ2_0 when the HQ/T50 ternary arm lands). This is the only option here with ternary kernels already in mainline, near-zero load time and a ~1–2 MB runtime. The kill-test showed its per-token cost is in line with what we measured here.
- **Use ORT as the reference / fallback runtime**, for parity tests with the PyTorch model and quick measurements.
  - If schedule matters more than size, an ORT minimal build with int8 is a proven route. It is already within budget (30 MB model, ~120 ms cold, ~17 ms warm on M1).
- candle is not recommended: no ternary kernels, and no latency advantage.

## Not measured / caveats

- Random weights. Real requests stop at EOS early: typical sequences are 8–12 actions, so the N=16/24 numbers are upper bounds.
- Python drives the loop. A native loop removes ~0.1–0.2 ms per step and the ~115 ms interpreter start.
- Not measured:
  - x86, slow CPUs and truly cold disk reads (dropped page cache);
  - ORT `.ort`/pre-optimised load;
  - the grammar mask (section 4.5);
  - ggml/candle ports of this graph.
- int8 here is ORT dynamic quantisation. Its accuracy impact on a trained checkpoint is not evaluated. Run `export_onnx.py --ckpt` plus a parity check before relying on it.
