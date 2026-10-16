"""BitNet b1.58-style quantization-aware training for the typed-IR model (arms HQ / T50).

BitLinear keeps an f32 shadow weight and, in the forward pass, uses
  - weights: absmean ternary  w_q = clamp(round(w / s), -1, 1) * s,  s = mean(|w|)  (one scale per matrix)
  - activations: per-token absmax int8  x_q = clamp(round(x * 127 / max|x|), -128, 127) * max|x| / 127
both with a straight-through estimator (forward quantized, backward identity). An optional SubLN (LayerNorm on the
input, before the activation quantizer) follows the BitNet recipe; it is off for HQ by default because it changes the
function of a pretrained layer. Embeddings, LayerNorms and the P / D heads stay high precision.

TernDecoderLayer is a pre-norm transformer decoder layer equivalent to nn.TransformerDecoderLayer(norm_first=True,
activation="gelu") whose projections are BitLinear (torch's MHA does not call its projections as modules).

pack_ternary / packed_size: 2-bit packing (4 weights per byte) of every BitLinear plus its f32 scale; the rest of
the parameters are counted at f16 and int8.
"""
import math

import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F


def ste(x, xq):
    return x + (xq - x).detach()


def weight_scale(w):
    return w.abs().mean().clamp(min=1e-5)


def ternary(w):
    """(codes in {-1,0,1}, scale)"""
    s = weight_scale(w)
    return (w / s).round().clamp(-1, 1), s


def act_quant(x):
    s = 127.0 / x.abs().amax(-1, keepdim=True).clamp(min=1e-5)
    return (x * s).round().clamp(-128, 127) / s


class BitLinear(nn.Linear):
    """nn.Linear with ternary-weight / int8-activation QAT. Same state-dict keys as nn.Linear (+ sub_ln.* if subln)."""

    def __init__(self, in_features, out_features, bias=True, subln=False):
        super().__init__(in_features, out_features, bias)
        self.sub_ln = nn.LayerNorm(in_features) if subln else None

    def forward(self, x):
        if self.sub_ln is not None:
            x = self.sub_ln(x)
        dt = x.dtype
        x = x.float()
        xq = ste(x, act_quant(x))
        q, s = ternary(self.weight.float())
        wq = ste(self.weight.float(), q * s)
        b = self.bias.float() if self.bias is not None else None
        return F.linear(xq, wq, b).to(dt)

    @classmethod
    def from_linear(cls, lin, subln=False):
        m = cls(lin.in_features, lin.out_features, lin.bias is not None, subln).to(lin.weight.device)
        m.weight.data.copy_(lin.weight.data)
        if lin.bias is not None:
            m.bias.data.copy_(lin.bias.data)
        return m


def ternarize_(module, subln=False):
    """Replace every nn.Linear inside `module` (recursively) by a BitLinear with the same weights."""
    for name, ch in module.named_children():
        if type(ch) is nn.Linear:
            setattr(module, name, BitLinear.from_linear(ch, subln))
        else:
            ternarize_(ch, subln)
    return module


# ---------------------------------------------------------------- ternary decoder

class _MHA(nn.Module):
    def __init__(self, D, heads, dropout, lin):
        super().__init__()
        self.h, self.p = heads, dropout
        self.q, self.k, self.v, self.o = lin(D, D), lin(D, D), lin(D, D), lin(D, D)

    def forward(self, x, mem, mask):  # mask: bool, True = attend, broadcastable to (B, h, T, S)
        B, T, D = x.shape
        sh = lambda t: t.view(B, -1, self.h, D // self.h).transpose(1, 2)
        a = F.scaled_dot_product_attention(sh(self.q(x)), sh(self.k(mem)), sh(self.v(mem)), attn_mask=mask,
                                           dropout_p=self.p if self.training else 0.0)
        return self.o(a.transpose(1, 2).reshape(B, T, D))


class TernDecoderLayer(nn.Module):
    def __init__(self, D, heads, d_ff, dropout, subln=False):
        super().__init__()
        lin = lambda i, o: BitLinear(i, o, subln=subln)  # noqa: E731
        self.sa, self.ca = _MHA(D, heads, dropout, lin), _MHA(D, heads, dropout, lin)
        self.ff1, self.ff2 = lin(D, d_ff), lin(d_ff, D)
        self.n1, self.n2, self.n3 = nn.LayerNorm(D), nn.LayerNorm(D), nn.LayerNorm(D)
        self.drop = nn.Dropout(dropout)

    def forward(self, y, mem, self_mask, mem_mask):
        h = self.n1(y)
        y = y + self.drop(self.sa(h, h, self_mask))
        y = y + self.drop(self.ca(self.n2(y), mem, mem_mask))
        return y + self.drop(self.ff2(self.drop(F.gelu(self.ff1(self.n3(y))))))


class TernDecoder(nn.Module):
    """Drop-in for nn.TransformerDecoder(norm_first layers, final norm) as called by IRModel.d_states."""

    def __init__(self, D, heads, d_ff, dropout, layers, subln=False):
        super().__init__()
        self.layers = nn.ModuleList(TernDecoderLayer(D, heads, d_ff, dropout, subln) for _ in range(layers))
        self.norm = nn.LayerNorm(D)

    def forward(self, y, mem, tgt_mask, tgt_key_padding_mask, memory_key_padding_mask):
        # torch semantics: True = masked. Padded query rows still see themselves (no all-masked rows / NaN).
        L = y.shape[1]
        eye = torch.eye(L, dtype=torch.bool, device=y.device)
        sm = (~tgt_mask[None, None] & ~tgt_key_padding_mask[:, None, None, :]) | eye
        mm = ~memory_key_padding_mask[:, None, None, :]
        for l in self.layers:
            y = l(y, mem, sm, mm)
        return self.norm(y)


# ---------------------------------------------------------------- export

def pack2(codes):
    """int codes in {-1,0,1} -> uint8, 4 per byte (00=0, 01=+1, 10=-1)."""
    c = np.asarray(codes, dtype=np.int8).ravel()
    u = np.where(c < 0, 2, c).astype(np.uint8)
    u = np.concatenate([u, np.zeros((-len(u)) % 4, np.uint8)]).reshape(-1, 4)
    return u[:, 0] | (u[:, 1] << 2) | (u[:, 2] << 4) | (u[:, 3] << 6)


def unpack2(packed, n):
    p = np.asarray(packed, dtype=np.uint8)
    u = np.stack([(p >> s) & 3 for s in (0, 2, 4, 6)], 1).ravel()[:n]
    return np.where(u == 2, -1, u).astype(np.int8)


@torch.no_grad()
def pack_ternary(model):
    """{name: dict(packed uint8, shape, scale)} for every BitLinear weight."""
    out = {}
    for name, m in model.named_modules():
        if isinstance(m, BitLinear):
            q, s = ternary(m.weight.float())
            out[name + ".weight"] = dict(packed=pack2(q.cpu().numpy()), shape=tuple(m.weight.shape), scale=float(s))
    return out


def packed_size(model):
    """Bytes: ternary weights packed at 2 bits + f32 scale; every other parameter at f16 and at int8 (+ per-row f32 scale
    for 2-D tensors). Without BitLinears this is the plain H8 size."""
    tern = pack_ternary(model)
    tern_bytes = sum(len(v["packed"]) + 4 for v in tern.values())
    n_tern = sum(math.prod(v["shape"]) for v in tern.values())
    rest_n, rest_i8 = 0, 0
    for name, p in model.named_parameters():
        if name in tern:
            continue
        rest_n += p.numel()
        rest_i8 += p.numel() + (4 * p.shape[0] if p.dim() == 2 else 0)
    mb = lambda b: round(b / 2**20, 2)  # noqa: E731
    return dict(ternary_params=n_tern, ternary_mb=mb(tern_bytes), other_params=rest_n, other_f16_mb=mb(2 * rest_n),
                other_int8_mb=mb(rest_i8), total_f16_mb=mb(tern_bytes + 2 * rest_n), total_int8_mb=mb(tern_bytes + rest_i8))
