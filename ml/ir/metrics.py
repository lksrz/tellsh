"""Model outputs -> prediction rows (for scripts/ir/eval_pred.mjs) and quick in-Python dev metrics.

Quick metrics compare against the exported targets only (exact canonical action sequence; P-head exact match on
P-expressible rows). The canonical target is unique per IR (docs/IR.md 4.4), so d_exact is a lower bound of exact
canonical-IR match; gate-based metrics (accepted-wrong etc.) come from eval_pred.mjs.
"""
STATUS = {"OK": "ok", "NOT_SHELL": "not_shell", "OOS": "out_of_scope", "UNDER": "underspecified", "AMBIG": "ambiguous"}


def d_sequences(acts, spans, v):
    """(B,L) action ids, (B,L,2) inclusive spans -> [[ [name, u0, u1_exclusive], ... ]] cut at EOS."""
    out = []
    for a_row, s_row in zip(acts.tolist(), spans.tolist()):
        seq = []
        for a, (s, e) in zip(a_row, s_row):
            if a == v.PAD:
                break
            name = v.actions[a]
            seq.append([name, s, e + 1] if v.raw["pointer"][a] else [name, -1, -1])
            if a == v.EOS:
                break
        out.append(seq)
    return out


def p_rows(p, v):
    rows = []
    B = p["label"].shape[0]
    for i in range(B):
        slots = {}
        for k, s in enumerate(v.slots):
            kind = v.value_kinds[int(p["kind"][i, k])]
            if kind == "none":
                continue
            ptr = kind == "SPAN" or kind.startswith("norm:")
            slots[s] = {"kind": kind, "u": [int(p["start"][i, k]), int(p["end"][i, k]) + 1] if ptr else [-1, -1]}
        rows.append({"label": v.labels[int(p["label"][i])], "label_prob": round(float(p["label_prob"][i]), 4),
                     "single": bool(p["single"][i]), "op": v.ops[int(p["op"][i])], "pin": v.pins[int(p["pin"][i])],
                     "stderr": v.stderr[int(p["stderr"][i])],
                     "mods": [m for m, on in zip(v.mods, p["mods"][i].tolist()) if on], "slots": slots})
    return rows


def gold_d(b, v):
    out = []
    for t_row, s_row, e_row in zip(b["d_tgt"].tolist(), b["d_start"].tolist(), b["d_end"].tolist()):
        seq = []
        for a, s, e in zip(t_row, s_row, e_row):
            if a < 0:
                break
            seq.append([v.actions[a], s, e + 1] if s >= 0 else [v.actions[a], -1, -1])
        out.append(seq)
    return out


def quick_metrics(batches, v):
    n = lab = dlab = dex = pn = pex = 0
    for b, p, acts, spans in batches:
        pred = d_sequences(acts, spans, v)
        gold = gold_d(b, v)
        pr = p_rows(p, v)
        for i, (ps, gs) in enumerate(zip(pred, gold)):
            n += 1
            gl = v.labels[int(b["label"][i])]
            lab += pr[i]["label"] == gl
            dlab += bool(ps) and STATUS.get(ps[0][0]) == gl
            dex += ps == gs
            if bool(b["p_mask"][i]):
                pn += 1
                g_mods = {m for m, on in zip(v.mods, b["mods"][i].tolist()) if on}
                g_slots = {}
                for k, s in enumerate(v.slots):
                    kind = v.value_kinds[int(b["slot_kind"][i, k])]
                    if kind != "none":
                        st = int(b["slot_start"][i, k])
                        g_slots[s] = {"kind": kind, "u": [st, int(b["slot_end"][i, k]) + 1] if st >= 0 else [-1, -1]}
                q = pr[i]
                pex += (q["label"] == "ok" and q["op"] == v.ops[int(b["op"][i])] and q["pin"] == v.pins[int(b["pin"][i])]
                        and q["stderr"] == v.stderr[int(b["stderr"][i])] and set(q["mods"]) == g_mods and q["slots"] == g_slots)
    r = lambda a, d: round(a / d, 4) if d else None
    return {"n": n, "p_label_acc": r(lab, n), "d_label_acc": r(dlab, n), "d_exact": r(dex, n), "p_rows": pn, "p_exact": r(pex, pn)}
