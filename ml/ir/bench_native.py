"""Native-runtime latency bench for the typed-IR model (ml/ir/NATIVE.md) on ONNX Runtime (CPU).

One request = tokenize (unigram Viterbi over the student vocab) + encoder/P heads (one session run) + greedy D decode
of N actions (one step-session run per action, KV cache, copy-pointer start/end per step). EOS is masked so every
request decodes exactly N actions. Weights are irrelevant for latency (export with export_onnx.py --random).

  python ml/ir/bench_native.py --onnx build/ir/onnx            # warm + cold table
  python ml/ir/bench_native.py --onnx build/ir/onnx --cold-child f32 4 16   # (internal) one fresh-process sample
"""
import time

T_PROC = time.perf_counter()  # as early as possible: interpreter start -> here is not counted (Python-only cost)

import argparse  # noqa: E402
import json  # noqa: E402
import os  # noqa: E402
import statistics  # noqa: E402
import subprocess  # noqa: E402
import sys  # noqa: E402

import numpy as np  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
REQUESTS = [
    "list files",
    "detailed listing of storage/app, hidden names included, sizes in human units",
    "count lines in every python file under src recursively and show the 10 largest, ignore errors",
    "show the last 50 lines of /var/log/syslog that mention ssh or sshd, case insensitive, newest first",
]


class Tokenizer:
    """SentencePiece-unigram Viterbi over hybrid/models/student/vocab.json (pieces + scores); XLM-R ids."""

    def __init__(self, path):
        with open(path, encoding="utf-8") as f:
            v = json.load(f)
        self.ids = {p: i for i, p in enumerate(v["pieces"])}
        self.scores = v["scores"]
        self.unk = v["unk"]
        self.maxlen = max(len(p) for p in v["pieces"])

    def encode(self, text):
        s = "▁" + text.strip().replace(" ", "▁")
        n = len(s)
        best = [0.0] + [-1e18] * n
        back = [(0, -1)] * (n + 1)
        for j in range(1, n + 1):
            for i in range(max(0, j - self.maxlen), j):
                pid = self.ids.get(s[i:j])
                sc = self.scores[pid] if pid is not None else (-30.0 if j - i == 1 else None)
                if sc is None:
                    continue
                if best[i] + sc > best[j]:
                    best[j], back[j] = best[i] + sc, (i, pid if pid is not None else self.unk)
        toks, j = [], n
        while j > 0:
            i, pid = back[j]
            toks.append((s[i:j], pid))
            j = i
        toks.reverse()
        ids = [0] + [p for _, p in toks] + [2]
        unit_of, u = [-1], -1
        for piece, _ in toks:  # a unit = a whitespace word (good enough for timing)
            if piece.startswith("▁") or u < 0:
                u += 1
            unit_of.append(u)
        unit_of.append(-1)
        U, T = u + 1, len(ids)
        um = np.zeros((1, U, T), np.float32)
        for t, uu in enumerate(unit_of):
            if uu >= 0:
                um[0, uu, t] = 1.0
        um /= np.maximum(um.sum(-1, keepdims=True), 1.0)
        return (np.array([ids], np.int64), np.ones((1, T), bool), um, np.ones((1, U), bool))


class Runner:
    def __init__(self, onnx_dir, variant, threads, vocab_targets):
        import onnxruntime as ort
        so = ort.SessionOptions()
        so.intra_op_num_threads = threads
        so.inter_op_num_threads = 1
        so.execution_mode = ort.ExecutionMode.ORT_SEQUENTIAL
        so.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
        sfx = ".int8.onnx" if variant == "int8" else ".onnx"
        prov = ["CPUExecutionProvider"]
        self.enc = ort.InferenceSession(os.path.join(onnx_dir, "encoder" + sfx), so, providers=prov)
        self.step = ort.InferenceSession(os.path.join(onnx_dir, "dstep" + sfx), so, providers=prov)
        with open(os.path.join(vocab_targets, "vocab.json"), encoding="utf-8") as f:
            v = json.load(f)
        acts = v["actions"]
        self.BOS, self.EOS, self.PAD = acts.index("BOS"), acts.index("EOS"), acts.index("PAD")
        self.ptr = np.array(v["pointer"], bool)
        ops = v["p"]["ops"]
        self.op_index = np.zeros(len(acts), np.int64)
        for k, o in enumerate(ops[1:]):
            self.op_index[acts.index("op:" + o)] = k + 1
        kshape = self.step.get_inputs()[4].shape  # [layers, 1, heads, t, dh]
        self.kv0 = np.zeros((kshape[0], 1, kshape[2], 0, kshape[4]), np.float32)

    def request(self, feats, n_actions):
        ids, attn, um, umask = feats
        e = self.enc.run(None, {"ids": ids, "attn": attn, "unit_map": um, "unit_mask": umask})
        units, ck, cv, mem_pad = e[9], e[10], e[11], e[12]
        a, span, op = self.BOS, np.array([[-1, -1]], np.int64), 0
        pk = pv = self.kv0
        out = []
        for t in range(n_actions):
            lg, s, en, pk, pv = self.step.run(None, {
                "act": np.array([a], np.int64), "span": span, "ctx_op": np.array([op], np.int64), "pos": np.array([t], np.int64),
                "past_k": pk, "past_v": pv, "cross_k": ck, "cross_v": cv, "mem_pad": mem_pad, "units": units, "unit_mask": umask})
            lg = lg[0]
            lg[[self.PAD, self.BOS, self.EOS]] = -1e9  # force exactly n_actions steps
            a = int(lg.argmax())
            span = np.array([[s[0], en[0]]] if self.ptr[a] else [[-1, -1]], np.int64)
            op = int(self.op_index[a]) or op
            out.append((a, int(span[0, 0]), int(span[0, 1])))
        return e[0].argmax(), out


def timed_request(tok, run, text, n):
    t0 = time.perf_counter()
    feats = tok.encode(text)
    t1 = time.perf_counter()
    run.request(feats, n)
    t2 = time.perf_counter()
    return (t1 - t0) * 1e3, (t2 - t1) * 1e3


def warm(args, variant, threads):
    tok = Tokenizer(args.vocab)
    run = Runner(args.onnx, variant, threads, args.targets)
    rows = []
    for n in (8, 16, 24):
        for _ in range(3):
            timed_request(tok, run, REQUESTS[1], n)
        tt, tm = [], []
        for k in range(args.reps):
            a, b = timed_request(tok, run, REQUESTS[k % len(REQUESTS)], n)
            tt.append(a)
            tm.append(b)
        # encoder alone (median) for the breakdown
        f = tok.encode(REQUESTS[2])
        te = []
        for _ in range(args.reps):
            t0 = time.perf_counter()
            run.enc.run(None, {"ids": f[0], "attn": f[1], "unit_map": f[2], "unit_mask": f[3]})
            te.append((time.perf_counter() - t0) * 1e3)
        tot = sorted(x + y for x, y in zip(tt, tm))
        rows.append(dict(variant=variant, threads=threads, n=n, tok_ms=statistics.median(tt), enc_ms=statistics.median(te),
                         total_p50=statistics.median(tot), total_p90=tot[int(0.9 * len(tot)) - 1],
                         step_ms=(statistics.median(tm) - statistics.median(te)) / n))
    return rows


def cold_child(args, variant, threads, n):
    t0 = time.perf_counter()
    import onnxruntime  # noqa: F401
    t1 = time.perf_counter()
    tok = Tokenizer(args.vocab)
    t2 = time.perf_counter()
    run = Runner(args.onnx, variant, threads, args.targets)
    t3 = time.perf_counter()
    timed_request(tok, run, REQUESTS[2], n)
    t4 = time.perf_counter()
    print(json.dumps(dict(pre_ms=(t0 - T_PROC) * 1e3, import_ort_ms=(t1 - t0) * 1e3, tok_load_ms=(t2 - t1) * 1e3,
                          session_load_ms=(t3 - t2) * 1e3, first_req_ms=(t4 - t3) * 1e3,
                          native_cold_ms=(t4 - t1) * 1e3)))


def cold(args, variant, threads, n):
    samples = []
    for _ in range(args.cold_reps):
        t0 = time.perf_counter()
        r = subprocess.run([sys.executable, os.path.abspath(__file__), "--onnx", args.onnx, "--vocab", args.vocab,
                            "--targets", args.targets, "--cold-child", variant, str(threads), str(n)],
                           capture_output=True, text=True, check=True)
        wall = (time.perf_counter() - t0) * 1e3
        d = json.loads(r.stdout.strip().splitlines()[-1])
        d["process_wall_ms"] = wall
        samples.append(d)
    med = {k: statistics.median(s[k] for s in samples) for k in samples[0]}
    return dict(variant=variant, threads=threads, n=n, **med)


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--onnx", default=os.path.join(ROOT, "build/ir/onnx"))
    a.add_argument("--vocab", default=os.path.join(ROOT, "hybrid/models/student/vocab.json"))
    a.add_argument("--targets", default=os.path.join(ROOT, "build/ir/targets/v1"))
    a.add_argument("--reps", type=int, default=40)
    a.add_argument("--cold-reps", type=int, default=5)
    a.add_argument("--cold-child", nargs=3, metavar=("VARIANT", "THREADS", "N"))
    a.add_argument("--json", default="", help="also write all rows here")
    args = a.parse_args()
    if args.cold_child:
        v, th, n = args.cold_child
        return cold_child(args, v, int(th), int(n))
    for f in os.listdir(args.onnx):
        if f.endswith(".onnx"):
            print(f"size {f:20s} {os.path.getsize(os.path.join(args.onnx, f)) / 1e6:6.1f} MB")
    W, C = [], []
    for variant in ("f32", "int8"):
        for th in (1, 4):
            W += warm(args, variant, th)
            C.append(cold(args, variant, th, 16))
    print("\nwarm (ms): variant threads N | tokenize encoder+P per-step | total p50 p90")
    for r in W:
        print(f"{r['variant']:5s} t{r['threads']} N={r['n']:2d} | {r['tok_ms']:5.2f} {r['enc_ms']:6.2f} {r['step_ms']:5.2f} | "
              f"{r['total_p50']:6.1f} {r['total_p90']:6.1f}")
    print("\ncold, fresh process, N=16 (ms, median): import_ort tok_load session_load first_req | native_cold | process_wall")
    for r in C:
        print(f"{r['variant']:5s} t{r['threads']} | {r['import_ort_ms']:6.1f} {r['tok_load_ms']:6.1f} {r['session_load_ms']:6.1f} "
              f"{r['first_req_ms']:6.1f} | {r['native_cold_ms']:6.1f} | {r['process_wall_ms']:6.1f}")
    if args.json:
        with open(args.json, "w") as f:
            json.dump(dict(warm=W, cold=C), f, indent=1)


if __name__ == "__main__":
    main()
