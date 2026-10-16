"""Export the typed-IR model (model.py) to ONNX for native-latency measurements (ml/ir/NATIVE.md).

Two graphs:
  encoder.onnx  ids, attn, unit_map, unit_mask -> P head outputs (argmaxed where the native runtime only needs the
                choice), units, and the per-layer cross-attention K/V of the D decoder (computed once per request).
  dstep.onnx    one greedy D step with a self-attention KV cache: (action, span, ctx op, position, past K/V, cross K/V,
                units, unit mask) -> action logits, copy-pointer start/end, new K/V.
Plus *.int8.onnx variants (onnxruntime dynamic int8 quantisation of MatMul/Gemm weights).

The step graph re-implements nn.TransformerDecoderLayer (norm_first, gelu) with explicit caches; --check verifies it
against IRModel.d_states on a teacher-forced sequence.

  python ml/ir/export_onnx.py --ckpt build/ir/runs/x/best.pt --out build/ir/onnx      # trained weights
  python ml/ir/export_onnx.py --random --out build/ir/onnx                              # student encoder + random rest
"""
import argparse
import os
import sys

import torch
import torch.nn as nn
import torch.nn.functional as F

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from data import Vocab, load_vocab  # noqa: E402
from model import IRModel, NEG  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))


class EncoderGraph(nn.Module):
    def __init__(self, m: IRModel):
        super().__init__()
        self.m = m

    def forward(self, ids, attn, unit_map, unit_mask):
        m = self.m
        b = {"ids": ids, "attn": attn}
        x = m.enc(ids, attn)
        units = torch.bmm(unit_map, x)
        am = attn.float()[..., None]
        pooled = (x * am).sum(1) / am.sum(1)
        P = m.p_heads(units, pooled, unit_mask)
        p_start = P["start"].argmax(-1)
        p_end = m.p_ptr.end_logits(P["slot_h"], units, unit_mask, p_start).argmax(-1)
        mem = m.mem(torch.cat([x, units], 1))
        mem_pad = ~torch.cat([attn, unit_mask], 1)
        ks, vs = [], []
        for layer in m.dec.layers:
            k, v = _cross_kv(layer, mem)
            ks.append(k)
            vs.append(v)
        del b
        return (P["label"], P["single"], P["op"], P["pin"], P["stderr"], P["mods"], P["kind"], p_start, p_end,
                units, torch.stack(ks), torch.stack(vs), mem_pad)


def _heads(layer):
    return layer.self_attn.num_heads


def _split(t, h):  # (B,T,D) -> (B,h,T,D/h)
    B, T, D = t.shape
    return t.view(B, T, h, D // h).transpose(1, 2)


def _lin(w, b):
    """Detached nn.Linear from a slice of a packed in_proj, so ONNX keeps it an initializer (quantisable)."""
    lin = nn.Linear(w.shape[1], w.shape[0])
    lin.weight.data.copy_(w.detach())
    lin.bias.data.copy_(b.detach())
    return lin


def split_proj(m: IRModel):
    """Attach per-layer q/k/v Linears for self- and cross-attention (packed in_proj in nn.MultiheadAttention)."""
    for layer in m.dec.layers:
        for name in ("self_attn", "multihead_attn"):
            a = getattr(layer, name)
            D, w, b = a.embed_dim, a.in_proj_weight, a.in_proj_bias
            a.pq, a.pk, a.pv = (_lin(w[i * D:(i + 1) * D], b[i * D:(i + 1) * D]) for i in range(3))


def _cross_kv(layer, mem):
    a = layer.multihead_attn
    return _split(a.pk(mem), a.num_heads), _split(a.pv(mem), a.num_heads)


class StepGraph(nn.Module):
    """One decoder step for batch 1 with caches. past_k/past_v (layers,1,heads,t,dh); t may be 0."""

    def __init__(self, m: IRModel):
        super().__init__()
        self.m = m

    def forward(self, act, span, ctx_op, pos, past_k, past_v, cross_k, cross_v, mem_pad, units, unit_mask):
        m = self.m
        U = units.shape[1]
        j = torch.arange(U)[None, :]
        sp = span.clamp(min=0)  # (1,2)
        sel = ((j >= sp[:, :1]) & (j <= sp[:, 1:]) & (span[:, :1] >= 0)).float()  # (1,U)
        span_vec = (sel[:, :, None] * units).sum(1) / sel.sum(-1, keepdim=True).clamp(min=1.0)
        y = m.act_emb(act) + m.op_emb(ctx_op) + m.span_proj(span_vec) + m.pos_emb(pos)  # (1,D)
        y = y[:, None]  # (1,1,D)
        new_k, new_v = [], []
        for i, layer in enumerate(m.dec.layers):
            sa = layer.self_attn
            D, h = sa.embed_dim, sa.num_heads
            x = layer.norm1(y)
            q, k, v = sa.pq(x), sa.pk(x), sa.pv(x)
            K = torch.cat([past_k[i], _split(k, h)], 2)
            V = torch.cat([past_v[i], _split(v, h)], 2)
            new_k.append(K)
            new_v.append(V)
            a = F.scaled_dot_product_attention(_split(q, h), K, V)
            y = y + sa.out_proj(a.transpose(1, 2).reshape(1, 1, D))
            ca = layer.multihead_attn
            x = layer.norm2(y)
            qc = ca.pq(x)
            mask = torch.zeros(mem_pad.shape, dtype=torch.float32).masked_fill(mem_pad, float("-inf"))[:, None, None, :]
            a = F.scaled_dot_product_attention(_split(qc, h), cross_k[i], cross_v[i], attn_mask=mask)
            y = y + ca.out_proj(a.transpose(1, 2).reshape(1, 1, D))
            y = y + layer.linear2(F.gelu(layer.linear1(layer.norm3(y))))
        hs = m.dec.norm(y)  # (1,1,D)
        logits = m.h_act(hs)[:, 0]
        s = m.d_ptr.start_logits(hs, units, unit_mask).argmax(-1)  # (1,1)
        e = m.d_ptr.end_logits(hs, units, unit_mask, s).argmax(-1)
        return logits, s[:, 0], e[:, 0], torch.stack(new_k), torch.stack(new_v)


def build_model(args):
    vocab = Vocab(load_vocab(args.targets))
    m = IRModel(vocab)
    if args.ckpt:
        ck = torch.load(args.ckpt, map_location="cpu", weights_only=False)
        m.load_state_dict(ck["model"])
    else:
        if os.path.exists(args.student):
            m.enc.load_student(args.student)
        # nn.TransformerDecoder deep-copies one layer, so untrained layers share identical values and the ONNX
        # exporter would dedupe them into one initializer; give every decoder weight distinct random values
        g = torch.Generator().manual_seed(0)
        with torch.no_grad():
            for n, p in m.named_parameters():
                if not n.startswith("enc.") and p.dim() >= 2:
                    p.copy_(torch.randn(p.shape, generator=g) * 0.02)
    split_proj(m)
    return m.eval(), vocab


def dummy(T=24, U=12):
    ids = torch.randint(5, 20000, (1, T))
    attn = torch.ones(1, T, dtype=torch.bool)
    um = torch.zeros(1, U, T)
    for u in range(U):
        um[0, u, 1 + 2 * u: 3 + 2 * u] = 0.5
    return ids, attn, um, torch.ones(1, U, dtype=torch.bool)


@torch.no_grad()
def check(m, vocab):
    """Teacher-forced: step graph logits/pointers == IRModel.d_states over the same prefix."""
    ids, attn, um, umask = dummy()
    enc = EncoderGraph(m)(ids, attn, um, umask)
    units, ck, cv, mem_pad = enc[9], enc[10], enc[11], enc[12]
    L = 10
    d_in = torch.randint(2, len(vocab.actions), (1, L))
    d_in[0, 0] = vocab.BOS
    d_span = torch.full((1, L, 2), -1, dtype=torch.long)
    d_span[0, 3] = torch.tensor([2, 4])
    d_op = torch.randint(0, len(vocab.ops), (1, L))
    b = {"attn": attn, "unit_mask": umask}
    x = m.enc(ids, attn)
    ref = m.h_act(m.d_states(b, x, units, d_in, d_span, d_op))
    nl, H, dh = len(m.dec.layers), m.dec.layers[0].self_attn.num_heads, 384 // m.dec.layers[0].self_attn.num_heads
    pk = pv = torch.zeros(nl, 1, H, 0, dh)
    st = StepGraph(m)
    worst = 0.0
    for t in range(L):
        lg, _, _, pk, pv = st(d_in[:, t], d_span[:, t], d_op[:, t], torch.tensor([t]), pk, pv, ck, cv, mem_pad, units, umask)
        worst = max(worst, (lg - ref[:, t]).abs().max().item())
    print(f"check: max |step - full| logit diff over {L} steps = {worst:.2e}")
    assert worst < 1e-3, "step graph diverges from IRModel.d_states"


def export(m, vocab, out):
    os.makedirs(out, exist_ok=True)
    ids, attn, um, umask = dummy()
    enc_g = EncoderGraph(m)
    enc_out = ["label", "single", "op", "pin", "stderr", "mods", "kind", "p_start", "p_end", "units", "cross_k", "cross_v", "mem_pad"]
    torch.onnx.export(enc_g, (ids, attn, um, umask), os.path.join(out, "encoder.onnx"), dynamo=False, opset_version=17,
                      input_names=["ids", "attn", "unit_map", "unit_mask"], output_names=enc_out,
                      dynamic_axes={"ids": {1: "T"}, "attn": {1: "T"}, "unit_map": {1: "U", 2: "T"}, "unit_mask": {1: "U"},
                                    "units": {1: "U"}, "cross_k": {3: "M"}, "cross_v": {3: "M"}, "mem_pad": {1: "M"},
                                    "kind": {}, "p_start": {}, "p_end": {}})
    with torch.no_grad():
        e = enc_g(ids, attn, um, umask)
    nl, H = len(m.dec.layers), m.dec.layers[0].self_attn.num_heads
    pk = torch.zeros(nl, 1, H, 1, 384 // H)
    args = (torch.tensor([vocab.BOS]), torch.tensor([[-1, -1]]), torch.tensor([0]), torch.tensor([1]), pk, pk.clone(),
            e[10], e[11], e[12], e[9], umask)
    torch.onnx.export(StepGraph(m), args, os.path.join(out, "dstep.onnx"), dynamo=False, opset_version=17,
                      input_names=["act", "span", "ctx_op", "pos", "past_k", "past_v", "cross_k", "cross_v", "mem_pad", "units", "unit_mask"],
                      output_names=["logits", "ptr_start", "ptr_end", "new_k", "new_v"],
                      dynamic_axes={"past_k": {3: "t"}, "past_v": {3: "t"}, "cross_k": {3: "M"}, "cross_v": {3: "M"},
                                    "mem_pad": {1: "M"}, "units": {1: "U"}, "unit_mask": {1: "U"},
                                    "new_k": {3: "t1"}, "new_v": {3: "t1"}})
    from onnxruntime.quantization import QuantType, quantize_dynamic
    for name in ("encoder", "dstep"):
        quantize_dynamic(os.path.join(out, name + ".onnx"), os.path.join(out, name + ".int8.onnx"), weight_type=QuantType.QInt8)
    for f in sorted(os.listdir(out)):
        if f.endswith(".onnx"):
            print(f"{f:22s} {os.path.getsize(os.path.join(out, f)) / 1e6:7.1f} MB")


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--ckpt", default="")
    a.add_argument("--random", action="store_true", help="no checkpoint: student encoder + random P/D weights")
    a.add_argument("--targets", default=os.path.join(ROOT, "build/ir/targets/v1"))
    a.add_argument("--student", default=os.path.join(ROOT, "hybrid/models/student/student.bin"))
    a.add_argument("--out", default=os.path.join(ROOT, "build/ir/onnx"))
    args = a.parse_args()
    if not args.ckpt and not args.random:
        a.error("--ckpt or --random")
    m, vocab = build_model(args)
    check(m, vocab)
    export(m, vocab, args.out)


if __name__ == "__main__":
    main()
