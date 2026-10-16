"""Dataset for the typed-IR model (docs/IR.md section 4).

Reads the targets exported by scripts/ir/export_targets.mjs (token ids, pointer-unit map, label, P-route
targets, D-route action sequence). No IR logic lives here: every target is derived in JS from ir/lib.
"""
import json
import os
import random

import torch
from torch.utils.data import Dataset

IGNORE = -100


def load_vocab(targets_dir):
    with open(os.path.join(targets_dir, "vocab.json"), encoding="utf-8") as f:
        return json.load(f)


class Vocab:
    def __init__(self, v):
        self.raw = v
        self.labels = v["labels"]
        self.actions = v["actions"]
        self.aid = {a: i for i, a in enumerate(self.actions)}
        self.pointer = torch.tensor(v["pointer"], dtype=torch.bool)
        p = v["p"]
        self.ops, self.pins, self.mods = p["ops"], p["pins"], p["mods"]
        self.stderr, self.slots, self.value_kinds = p["stderr"], p["slots"], p["value_kinds"]
        self.op_action_ids = [self.aid["op:" + o] for o in self.ops[1:]]
        self.PAD, self.BOS, self.EOS = self.aid["PAD"], self.aid["BOS"], self.aid["EOS"]


class IRDataset(Dataset):
    def __init__(self, path, vocab, limit=None, seed=0):
        with open(path, encoding="utf-8") as f:
            rows = [json.loads(l) for l in f if l.strip()]
        if limit and limit < len(rows):
            random.Random(seed).shuffle(rows)
            rows = rows[:limit]
        self.rows = rows
        self.v = vocab

    def __len__(self):
        return len(self.rows)

    def __getitem__(self, i):
        return self.rows[i]


def collate(rows, v: Vocab):
    B = len(rows)
    T = max(len(r["ids"]) for r in rows)
    U = max(len(r["units"]) for r in rows)
    L = max(len(r["actions"]) for r in rows) + 1  # BOS + actions
    ids = torch.full((B, T), 1, dtype=torch.long)  # pad id 1 (XLM-R)
    attn = torch.zeros(B, T, dtype=torch.bool)
    unit_map = torch.zeros(B, U, T)
    unit_mask = torch.zeros(B, U, dtype=torch.bool)
    label = torch.zeros(B, dtype=torch.long)
    # P route
    p_mask = torch.zeros(B, dtype=torch.bool)
    op = torch.zeros(B, dtype=torch.long)
    pin = torch.zeros(B, dtype=torch.long)
    stderr = torch.zeros(B, dtype=torch.long)
    single = torch.zeros(B, dtype=torch.long)
    mods = torch.zeros(B, len(v.mods))
    S = len(v.slots)
    slot_kind = torch.zeros(B, S, dtype=torch.long)
    slot_start = torch.full((B, S), IGNORE, dtype=torch.long)
    slot_end = torch.full((B, S), IGNORE, dtype=torch.long)
    # D route: input = BOS a1 .. a_{n-1}, target = a1 .. an
    d_in = torch.full((B, L), v.PAD, dtype=torch.long)
    d_in_span = torch.full((B, L, 2), -1, dtype=torch.long)
    d_ctx_op = torch.zeros(B, L, dtype=torch.long)  # index into P ops (0 = none): factorized emb(op)
    d_tgt = torch.full((B, L), IGNORE, dtype=torch.long)
    d_start = torch.full((B, L), IGNORE, dtype=torch.long)
    d_end = torch.full((B, L), IGNORE, dtype=torch.long)
    op_index = {v.aid["op:" + o]: k + 1 for k, o in enumerate(v.ops[1:])}
    ops_idx = {o: k for k, o in enumerate(v.ops)}
    for b, r in enumerate(rows):
        n = len(r["ids"])
        ids[b, :n] = torch.tensor(r["ids"])
        attn[b, :n] = True
        nu = len(r["units"])
        unit_mask[b, :nu] = True
        for t, u in enumerate(r["tok_unit"]):
            if u >= 0:
                unit_map[b, u, t] = 1.0
        for t, u in r.get("extra", []):
            unit_map[b, u, t] = 1.0
        label[b] = v.labels.index(r["label"])
        single[b] = 1 if r["p"] else 0
        p = r["p"]
        if p:
            p_mask[b] = True
            op[b] = ops_idx[p["op"]]
            pin[b] = v.pins.index(p["pin"])
            stderr[b] = v.stderr.index(p["stderr"])
            for m in p["mods"]:
                if m in v.mods:
                    mods[b, v.mods.index(m)] = 1.0
            for s, val in p["slots"].items():
                k = v.slots.index(s)
                slot_kind[b, k] = v.value_kinds.index(val["kind"])
                if val["u"][0] >= 0:
                    slot_start[b, k], slot_end[b, k] = val["u"][0], val["u"][1] - 1  # inclusive end
        acts = r["actions"]
        d_in[b, 0] = v.BOS
        cur_op = 0
        for t, (a, u0, u1) in enumerate(acts):
            d_tgt[b, t] = a
            if u0 >= 0:
                d_start[b, t], d_end[b, t] = u0, u1 - 1
            if a in op_index:
                cur_op = op_index[a]
            if t + 1 < L:
                d_in[b, t + 1] = a
                d_in_span[b, t + 1] = torch.tensor([u0, u1 - 1]) if u0 >= 0 else torch.tensor([-1, -1])
                d_ctx_op[b, t + 1] = cur_op
    unit_map = unit_map / unit_map.sum(-1, keepdim=True).clamp(min=1.0)
    return dict(ids=ids, attn=attn, unit_map=unit_map, unit_mask=unit_mask, label=label, p_mask=p_mask, op=op, pin=pin,
                stderr=stderr, single=single, mods=mods, slot_kind=slot_kind, slot_start=slot_start, slot_end=slot_end,
                d_in=d_in, d_in_span=d_in_span, d_ctx_op=d_ctx_op, d_tgt=d_tgt, d_start=d_start, d_end=d_end)
