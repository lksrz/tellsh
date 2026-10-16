"""Typed-IR model (docs/IR.md section 4.2-4.4).

Encoder: XLM-R/BERT-style 3x384 initialised from the S student (hybrid/models/student/student.bin, TSJ1 bundle,
int8 rows dequantised to f32). Pointer units = mean of their subword states (section 4.1).
P route: parallel heads on one encoder pass (label, single-stage shape, op, pin, stderr, mods, per-slot value kind
and span). D route: small transformer decoder over the canonical action vocabulary with copy-pointer (start/end)
attention over the request units. Grammar mask (section 4.5) is not applied (optional at inference for now).
"""
import json
import math
import struct

import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F

NEG = -1e4


# ---------------------------------------------------------------- student bundle

def read_tsj1(path):
    """student.bin -> (config, {name: float32 ndarray}); int8 tensors are dequantised with their per-row scale."""
    with open(path, "rb") as f:
        buf = f.read()
    assert buf[:4] == b"TSJ1", "not a TSJ1 bundle"
    n = struct.unpack("<I", buf[4:8])[0]
    head = json.loads(buf[8:8 + n].decode("utf8"))
    start = (8 + n + 7) // 8 * 8
    dt = {"i8": np.int8, "f16": np.float16, "f32": np.float32}
    raw = {}
    for name, t in head["tensors"].items():
        cnt = int(np.prod(t["shape"]))
        raw[name] = np.frombuffer(buf, dtype=dt[t["dtype"]], count=cnt, offset=start + t["offset"]).reshape(t["shape"])
    out = {}
    for name, a in raw.items():
        if name.endswith(".scale"):
            continue
        a = a.astype(np.float32)
        if name + ".scale" in raw:
            a = a * raw[name + ".scale"].astype(np.float32)[:, None]
        out[name] = a
    return head["config"], out


# ---------------------------------------------------------------- encoder

class Layer(nn.Module):
    def __init__(self, H, heads, inter, eps):
        super().__init__()
        self.heads = heads
        self.q, self.k, self.v, self.o = (nn.Linear(H, H) for _ in range(4))
        self.ln1 = nn.LayerNorm(H, eps=eps)
        self.ff1, self.ff2 = nn.Linear(H, inter), nn.Linear(inter, H)
        self.ln2 = nn.LayerNorm(H, eps=eps)

    def forward(self, x, mask):
        B, T, H = x.shape
        sh = lambda t: t.view(B, T, self.heads, H // self.heads).transpose(1, 2)
        a = F.scaled_dot_product_attention(sh(self.q(x)), sh(self.k(x)), sh(self.v(x)), attn_mask=mask[:, None, None, :])
        x = self.ln1(x + self.o(a.transpose(1, 2).reshape(B, T, H)))
        return self.ln2(x + self.ff2(F.gelu(self.ff1(x))))


class Encoder(nn.Module):
    def __init__(self, vocab=27297, H=384, layers=3, heads=12, inter=1536, max_pos=512, eps=1e-12):
        super().__init__()
        self.word = nn.Embedding(vocab, H)
        self.pos = nn.Embedding(max_pos, H)
        self.typ = nn.Embedding(1, H)
        self.ln = nn.LayerNorm(H, eps=eps)
        self.layers = nn.ModuleList(Layer(H, heads, inter, eps) for _ in range(layers))

    def forward(self, ids, attn):
        pos = torch.arange(ids.shape[1], device=ids.device)
        x = self.ln(self.word(ids) + self.pos(pos)[None] + self.typ.weight[0])
        for l in self.layers:
            x = l(x, attn)
        return x

    def load_student(self, path):
        cfg, t = read_tsj1(path)
        sd = {"word.weight": t["embeddings.word_embeddings.weight"], "pos.weight": t["embeddings.position_embeddings.weight"],
              "typ.weight": t["embeddings.token_type_embeddings.weight"][:1],
              "ln.weight": t["embeddings.LayerNorm.weight"], "ln.bias": t["embeddings.LayerNorm.bias"]}
        names = {"q": "attention.self.query", "k": "attention.self.key", "v": "attention.self.value",
                 "o": "attention.output.dense", "ln1": "attention.output.LayerNorm", "ff1": "intermediate.dense",
                 "ff2": "output.dense", "ln2": "output.LayerNorm"}
        for i in range(cfg["layers"]):
            for ours, theirs in names.items():
                for p in ("weight", "bias"):
                    sd[f"layers.{i}.{ours}.{p}"] = t[f"encoder.layer.{i}.{theirs}.{p}"]
        self.load_state_dict({k: torch.from_numpy(np.ascontiguousarray(v)) for k, v in sd.items()}, strict=True)
        return cfg


# ---------------------------------------------------------------- pointer

class Pointer(nn.Module):
    """Span pointer over units: start from the query, end from the query + the chosen start unit (j >= i, j - i < 8)."""

    def __init__(self, Dq, H, P=256, max_w=8):
        super().__init__()
        self.qs, self.qe, self.cs = nn.Linear(Dq, P), nn.Linear(Dq, P), nn.Linear(H, P)
        self.ks, self.ke = nn.Linear(H, P), nn.Linear(H, P)
        self.max_w, self.scale = max_w, 1.0 / math.sqrt(P)

    def start_logits(self, q, units, umask):  # q (B,N,Dq) units (B,U,H) -> (B,N,U)
        s = torch.einsum("bnp,bup->bnu", self.qs(q), self.ks(units)) * self.scale
        return s.masked_fill(~umask[:, None, :], NEG)

    def end_logits(self, q, units, umask, start):  # start (B,N) index (clamped >= 0)
        st = start.clamp(min=0)
        hs = torch.gather(units, 1, st[..., None].expand(-1, -1, units.shape[-1]))
        e = torch.einsum("bnp,bup->bnu", self.qe(q) + self.cs(hs), self.ke(units)) * self.scale
        j = torch.arange(units.shape[1], device=units.device)[None, None, :]
        ok = umask[:, None, :] & (j >= st[..., None]) & (j - st[..., None] < self.max_w)
        return e.masked_fill(~ok, NEG)


# ---------------------------------------------------------------- model

class IRModel(nn.Module):
    def __init__(self, vocab, d_model=384, d_layers=5, d_heads=8, d_ff=1536, max_len=34, arm="H8", dropout=0.1, label_smoothing=0.0):
        super().__init__()
        self.ls = label_smoothing  # for the label head and D action CE only (pointers / P heads stay hard)
        if arm != "H8":
            raise NotImplementedError(f"arm {arm}: ternary QAT (HQ/T50) is a later hook; only H8 is implemented")
        self.v = vocab
        H = 384
        self.enc = Encoder()
        self.drop = nn.Dropout(dropout)
        # P heads (section 4.3)
        self.h_label = nn.Linear(H, len(vocab.labels))
        self.h_single = nn.Linear(H, 2)
        self.h_op = nn.Linear(H, len(vocab.ops))
        self.h_pin = nn.Linear(H, len(vocab.pins))
        self.h_stderr = nn.Linear(H, len(vocab.stderr))
        self.h_mods = nn.Linear(H, len(vocab.mods))
        S = len(vocab.slots)
        self.slot_emb = nn.Embedding(S, H)
        self.slot_mlp = nn.Sequential(nn.Linear(2 * H, H), nn.GELU())
        self.h_kind = nn.Linear(H, len(vocab.value_kinds))
        self.p_ptr = Pointer(H, H)
        # D route (section 4.4)
        D = d_model
        self.mem = nn.Linear(H, D) if D != H else nn.Identity()
        self.act_emb = nn.Embedding(len(vocab.actions), D)
        self.op_emb = nn.Embedding(len(vocab.ops), D)  # factorized emb(option) + emb(op)
        self.span_proj = nn.Linear(H, D)
        self.pos_emb = nn.Embedding(max_len, D)
        layer = nn.TransformerDecoderLayer(D, d_heads, d_ff, dropout, activation="gelu", batch_first=True, norm_first=True)
        self.dec = nn.TransformerDecoder(layer, d_layers, norm=nn.LayerNorm(D))
        self.h_act = nn.Linear(D, len(vocab.actions))
        self.d_ptr = Pointer(D, H)
        self.max_len = max_len
        self.register_buffer("is_ptr", vocab.pointer.clone(), persistent=False)

    # -------- encoder
    def encode(self, b):
        x = self.enc(b["ids"], b["attn"])
        units = torch.bmm(b["unit_map"], x)
        am = b["attn"].float()[..., None]
        pooled = (x * am).sum(1) / am.sum(1)
        return x, units, pooled

    # -------- P heads
    def p_heads(self, units, pooled, umask):
        B = pooled.shape[0]
        S = self.slot_emb.num_embeddings
        ph = self.drop(pooled)
        sl = self.slot_mlp(torch.cat([ph[:, None].expand(B, S, -1), self.slot_emb.weight[None].expand(B, -1, -1)], -1))
        return dict(label=self.h_label(ph), single=self.h_single(ph), op=self.h_op(ph), pin=self.h_pin(ph),
                    stderr=self.h_stderr(ph), mods=self.h_mods(ph), kind=self.h_kind(sl), slot_h=sl,
                    start=self.p_ptr.start_logits(sl, units, umask))

    # -------- D decoder
    def d_states(self, b, x, units, d_in, d_in_span, d_ctx_op):
        B, L = d_in.shape
        sp = d_in_span.clamp(min=0)
        U = units.shape[1]
        j = torch.arange(U, device=units.device)[None, None, :]
        sel = ((j >= sp[..., :1]) & (j <= sp[..., 1:]) & (d_in_span[..., :1] >= 0)).float()
        span_vec = torch.bmm(sel, units) / sel.sum(-1, keepdim=True).clamp(min=1.0)
        pos = torch.arange(L, device=d_in.device)
        y = self.act_emb(d_in) + self.op_emb(d_ctx_op) + self.span_proj(span_vec) + self.pos_emb(pos)[None]
        mem = self.mem(torch.cat([x, units], 1))
        mem_pad = ~torch.cat([b["attn"], b["unit_mask"]], 1)
        causal = torch.triu(torch.ones(L, L, dtype=torch.bool, device=d_in.device), 1)
        return self.dec(self.drop(y), mem, tgt_mask=causal, tgt_key_padding_mask=d_in == self.v.PAD,
                        memory_key_padding_mask=mem_pad)

    # -------- training loss
    def loss(self, b, w_p=1.0, w_d=1.0):
        x, units, pooled = self.encode(b)
        um = b["unit_mask"]
        P = self.p_heads(units, pooled, um)
        out = {}
        out["label"] = F.cross_entropy(P["label"], b["label"], label_smoothing=self.ls)
        okm = b["label"] == 0
        out["single"] = F.cross_entropy(P["single"][okm], b["single"][okm]) if okm.any() else pooled.sum() * 0
        pm = b["p_mask"]
        if pm.any():
            out["op"] = F.cross_entropy(P["op"][pm], b["op"][pm])
            out["pin"] = F.cross_entropy(P["pin"][pm], b["pin"][pm])
            out["stderr"] = F.cross_entropy(P["stderr"][pm], b["stderr"][pm])
            out["mods"] = F.binary_cross_entropy_with_logits(P["mods"][pm], b["mods"][pm], reduction="sum") / pm.sum()  # per row, not per class
            out["kind"] = F.cross_entropy(P["kind"][pm].flatten(0, 1), b["slot_kind"][pm].flatten())
            st, en = b["slot_start"], b["slot_end"]
            if (st[pm] >= 0).any():
                out["p_start"] = F.cross_entropy(P["start"][pm].flatten(0, 1), st[pm].flatten(), ignore_index=-100)
                el = self.p_ptr.end_logits(P["slot_h"], units, um, st)
                out["p_end"] = F.cross_entropy(el[pm].flatten(0, 1), en[pm].flatten(), ignore_index=-100)
        h = self.d_states(b, x, units, b["d_in"], b["d_in_span"], b["d_ctx_op"])
        out["act"] = F.cross_entropy(self.h_act(h).flatten(0, 1), b["d_tgt"].flatten(), ignore_index=-100, label_smoothing=self.ls)
        if (b["d_start"] >= 0).any():
            out["d_start"] = F.cross_entropy(self.d_ptr.start_logits(h, units, um).flatten(0, 1), b["d_start"].flatten(), ignore_index=-100)
            out["d_end"] = F.cross_entropy(self.d_ptr.end_logits(h, units, um, b["d_start"]).flatten(0, 1), b["d_end"].flatten(), ignore_index=-100)
        p_keys = ["label", "single", "op", "pin", "stderr", "mods", "kind", "p_start", "p_end"]
        total = sum(w_p * v for k, v in out.items() if k in p_keys) + sum(w_d * v for k, v in out.items() if k not in p_keys)
        return total, {k: float(v.detach()) for k, v in out.items()}

    # -------- inference
    @torch.no_grad()
    def predict(self, b, conf=False):
        """Greedy P + D decode. conf=True also returns a dict of per-row confidences (probabilities of the greedy
        choices): P head probs in p[*_prob] and D {label, min_tok, min_margin, ptr_min, ptr_logp} (B,) tensors."""
        x, units, pooled = self.encode(b)
        um = b["unit_mask"]
        P = self.p_heads(units, pooled, um)
        p_start = P["start"].argmax(-1)
        p_end = self.p_ptr.end_logits(P["slot_h"], units, um, p_start).argmax(-1)
        p = dict(label=P["label"].argmax(-1), label_prob=P["label"].softmax(-1).max(-1).values, single=P["single"].argmax(-1),
                 op=P["op"].argmax(-1), pin=P["pin"].argmax(-1), stderr=P["stderr"].argmax(-1), mods=P["mods"] > 0,
                 kind=P["kind"].argmax(-1), start=p_start, end=p_end)
        if conf:
            mx = lambda t: t.float().softmax(-1).max(-1).values
            sig = P["mods"].float().sigmoid()
            p.update(single_prob=mx(P["single"]), op_prob=mx(P["op"]), pin_prob=mx(P["pin"]), stderr_prob=mx(P["stderr"]),
                     mods_prob=torch.maximum(sig, 1 - sig), kind_prob=mx(P["kind"]), start_prob=mx(P["start"]),
                     end_prob=mx(self.p_ptr.end_logits(P["slot_h"], units, um, p_start)))
        # greedy D decode (no grammar mask; first action restricted to a status)
        B, dev = x.shape[0], x.device
        v = self.v
        status_ids = torch.tensor([v.aid[a] for a in ("OK", "NOT_SHELL", "OOS", "UNDER", "AMBIG")], device=dev)
        op_index = torch.zeros(len(v.actions), dtype=torch.long, device=dev)
        for k, o in enumerate(v.ops[1:]):
            op_index[v.aid["op:" + o]] = k + 1
        d_in = torch.full((B, 1), v.BOS, dtype=torch.long, device=dev)
        d_span = torch.full((B, 1, 2), -1, dtype=torch.long, device=dev)
        d_op = torch.zeros(B, 1, dtype=torch.long, device=dev)
        acts, spans, done = [], [], torch.zeros(B, dtype=torch.bool, device=dev)
        logp = torch.zeros(B, device=dev)
        ones = torch.ones(B, device=dev)
        c_label, c_min, c_margin, c_pmin, c_plogp = ones.clone(), ones.clone(), ones.clone(), ones.clone(), torch.zeros(B, device=dev)
        for t in range(self.max_len - 1):
            h = self.d_states(b, x, units, d_in, d_span, d_op)[:, -1:]
            lg = self.h_act(h)[:, 0].float()
            lg[:, v.PAD] = NEG
            lg[:, v.BOS] = NEG
            if t == 0:
                keep = torch.full_like(lg, NEG)
                keep[:, status_ids] = 0
                lg = lg + keep
            lp = lg.log_softmax(-1)
            a = lp.argmax(-1)
            logp = logp + torch.where(done, torch.zeros_like(logp), lp.gather(1, a[:, None])[:, 0])
            sl = self.d_ptr.start_logits(h, units, um).float().log_softmax(-1)
            s = sl.argmax(-1)
            el = self.d_ptr.end_logits(h, units, um, s).float().log_softmax(-1)
            e = el.argmax(-1)
            ptr = self.is_ptr[a]
            if conf:
                live = ~done
                top = lp.exp().topk(2, -1).values
                if t == 0:
                    c_label = top[:, 0]
                c_min = torch.where(live, torch.minimum(c_min, top[:, 0]), c_min)
                c_margin = torch.where(live, torch.minimum(c_margin, top[:, 0] - top[:, 1]), c_margin)
                pl = sl.max(-1).values[:, 0] + el.max(-1).values[:, 0]
                lp_on = live & ptr
                c_pmin = torch.where(lp_on, torch.minimum(c_pmin, pl.exp()), c_pmin)
                c_plogp = c_plogp + torch.where(lp_on, pl, torch.zeros_like(pl))
            sp = torch.stack([torch.where(ptr, s[:, 0], -1), torch.where(ptr, e[:, 0], -1)], -1)
            a = torch.where(done, torch.full_like(a, v.PAD), a)
            acts.append(a)
            spans.append(sp)
            done = done | (a == v.EOS)
            new_op = torch.where(op_index[a] > 0, op_index[a], d_op[:, -1])
            d_in = torch.cat([d_in, a[:, None]], 1)
            d_span = torch.cat([d_span, sp[:, None]], 1)
            d_op = torch.cat([d_op, new_op[:, None]], 1)
            if done.all():
                break
        out = (p, torch.stack(acts, 1), torch.stack(spans, 1), logp)
        if conf:
            out += (dict(label=c_label, min_tok=c_min, min_margin=c_margin, ptr_min=c_pmin, ptr_logp=c_plogp),)
        return out


def param_counts(m: IRModel):
    c = lambda mod: sum(p.numel() for p in mod.parameters())
    enc = c(m.enc)
    dec = sum(c(x) for x in (m.mem, m.act_emb, m.op_emb, m.span_proj, m.pos_emb, m.dec, m.h_act, m.d_ptr))
    total = c(m)
    return dict(encoder=enc, encoder_word_emb=m.enc.word.weight.numel(), p_heads=total - enc - dec, decoder=dec, total=total)
