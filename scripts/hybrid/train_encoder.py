#!/usr/bin/env python3
"""(B) Fine-tune the vocab-pruned multilingual-e5-small as a joint tool + intent classifier with a BIO slot-tagger head.

Input:  build/hybrid/train.jsonl, build/hybrid/meta.json (node scripts/hybrid/export_data.js)
        build/hybrid/e5-pruned/ (python3 scripts/hybrid/prune_vocab.py)
Model:  <s> request </s></s> "bash linux" </s>  ->  mean-pooled encoder -> tool head (55) + intent head (149)
                                                   per-token -> BIO head (37 labels; only request tokens are labelled)
Rows with intent '' (tldr descriptions, OOD) train the tool head only; typo copies carry no spans (tag loss masked).
Only split=='train' rows are used; split=='dev' is kept for threshold calibration.
Resumable: a checkpoint (model + optimizer + step) is written every --ckpt-every steps and at each epoch end.

Usage: python3 scripts/hybrid/train_encoder.py [--layers 6] [--epochs 2.5] [--threads 2] [--out build/hybrid/enc]
"""
import argparse, json, math, os, random, time
import torch
import torch.nn as nn
from transformers import AutoModel, AutoTokenizer

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class Joint(nn.Module):
    def __init__(self, base, n_tool, n_intent, n_tag, layers=None):
        super().__init__()
        self.enc = AutoModel.from_pretrained(base) if isinstance(base, str) else base
        if layers and layers < len(self.enc.encoder.layer):  # keep the bottom `layers` transformer blocks
            self.enc.encoder.layer = self.enc.encoder.layer[:layers]
            self.enc.config.num_hidden_layers = layers
        h = self.enc.config.hidden_size
        self.drop = nn.Dropout(0.1)
        self.tool = nn.Linear(h, n_tool)
        self.intent = nn.Linear(h, n_intent)
        self.tag = nn.Linear(h, n_tag)

    def forward(self, input_ids, attention_mask):
        hs = self.enc(input_ids=input_ids, attention_mask=attention_mask).last_hidden_state
        m = attention_mask.unsqueeze(-1).to(hs.dtype)
        pooled = (hs * m).sum(1) / m.sum(1).clamp(min=1)
        pooled = self.drop(pooled)
        return self.tool(pooled), self.intent(pooled), self.tag(self.drop(hs))


def ctx_str(r):
    return f"{r.get('shell') or 'bash'} {r.get('os') or 'linux'}"


def encode(tok, rows, meta, max_len=64):
    tl = {t: i for i, t in enumerate(meta['tools'])}
    il = {t: i for i, t in enumerate(meta['intents'])}
    gl = {t: i for i, t in enumerate(meta['tagLabels'])}
    enc = tok([r['text'] for r in rows], [ctx_str(r) for r in rows], truncation='only_first', max_length=max_len,
              return_offsets_mapping=True)
    out = []
    for k, r in enumerate(rows):
        ids = enc['input_ids'][k]
        offs = enc['offset_mapping'][k]
        seq = enc.sequence_ids(k)
        tags = [-100] * len(ids)
        if r.get('spans') is not None:
            prev_span = None
            for j, (s, e) in enumerate(offs):
                if seq[j] != 0 or e <= s:
                    continue
                lab = 'O'
                cur = None
                for si, (typ, a, b) in enumerate(r['spans']):
                    # XLM-R offsets may include the leading space of a word piece
                    ss = s + (1 if r['text'][s:s + 1] == ' ' else 0)
                    if min(e, b) - max(ss, a) > 0:
                        cur = si
                        lab = ('I-' if prev_span == si else 'B-') + typ
                        break
                tags[j] = gl[lab]
                prev_span = cur
        soft = [0.0] * len(il) if r.get('soft') else None
        for k2, v in (r.get('soft') or {}).items():
            if k2 in il: soft[il[k2]] = v
        out.append({'ids': ids, 'tool': tl[r['tool']], 'intent': il.get(r['intent'], -100) if r['intent'] else -100, 'tags': tags, 'soft': soft, 'w': float(r.get('w', 1))})
    return out


def collate(batch, pad_id):
    L = max(len(b['ids']) for b in batch)
    ids = torch.full((len(batch), L), pad_id, dtype=torch.long)
    att = torch.zeros((len(batch), L), dtype=torch.long)
    tags = torch.full((len(batch), L), -100, dtype=torch.long)
    for i, b in enumerate(batch):
        n = len(b['ids'])
        ids[i, :n] = torch.tensor(b['ids'])
        att[i, :n] = 1
        tags[i, :n] = torch.tensor(b['tags'])
    return ids, att, torch.tensor([b['tool'] for b in batch]), torch.tensor([b['intent'] for b in batch]), tags


def soft_batch(batch, n_intent):
    # distillation targets (teacher soft labels) and per-row weights; rows without soft labels get a zero mask
    m = torch.tensor([1.0 if b.get('soft') else 0.0 for b in batch])
    s = torch.tensor([b['soft'] if b.get('soft') else [0.0] * n_intent for b in batch])
    s = s / s.sum(-1, keepdim=True).clamp(min=1e-9)
    return s, m, torch.tensor([b.get('w', 1.0) for b in batch])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', default=os.path.join(ROOT, 'build/hybrid/e5-pruned'))
    ap.add_argument('--out', default=os.path.join(ROOT, 'build/hybrid/enc'))
    ap.add_argument('--epochs', type=float, default=4)
    ap.add_argument('--bs', type=int, default=32)
    ap.add_argument('--lr', type=float, default=8e-5)
    ap.add_argument('--threads', type=int, default=4)
    ap.add_argument('--ckpt-every', type=int, default=500)
    ap.add_argument('--seed', type=int, default=17)
    ap.add_argument('--layers', type=int, default=6, help='truncate the encoder to its bottom N layers (12 = full)')
    ap.add_argument('--train-file', default=os.path.join(ROOT, 'build/hybrid/train.jsonl'), help='e.g. build/hybrid/train_distill.jsonl (scripts/distill/merge_labels.js)')
    ap.add_argument('--kd', type=float, default=1.0, help='weight of the KL loss on teacher soft labels')
    ap.add_argument('--all', action='store_true', help='also train on the dev split (final model; no calibration data left)')
    a = ap.parse_args()
    torch.set_num_threads(a.threads)
    random.seed(a.seed)
    torch.manual_seed(a.seed)
    meta = json.load(open(os.path.join(ROOT, 'build/hybrid/meta.json')))
    rows = [json.loads(l) for l in open(a.train_file, encoding='utf-8')]
    rows = [r for r in rows if a.all or r['split'] == 'train']
    tok = AutoTokenizer.from_pretrained(a.base)
    data = encode(tok, rows, meta)
    model = Joint(a.base, len(meta['tools']), len(meta['intents']), len(meta['tagLabels']), a.layers)
    head_params = [p for n, p in model.named_parameters() if not n.startswith('enc.')]
    enc_params = [p for n, p in model.named_parameters() if n.startswith('enc.')]
    opt = torch.optim.AdamW([{'params': enc_params, 'lr': a.lr}, {'params': head_params, 'lr': a.lr * 10}], weight_decay=0.01)
    steps_per_epoch = math.ceil(len(data) / a.bs)
    total = int(steps_per_epoch * a.epochs)
    warm = int(0.06 * total)
    sched = torch.optim.lr_scheduler.LambdaLR(opt, lambda s: min(1, (s + 1) / max(1, warm)) * max(0.0, (total - s) / max(1, total - warm)))
    os.makedirs(a.out, exist_ok=True)
    ck = os.path.join(a.out, 'ckpt.pt')
    step = 0
    if os.path.exists(ck):
        st = torch.load(ck, map_location='cpu', weights_only=False)
        model.load_state_dict(st['model']); opt.load_state_dict(st['opt']); sched.load_state_dict(st['sched']); step = st['step']
        print(f'resumed at step {step}/{total}', flush=True)
    ce = nn.CrossEntropyLoss(ignore_index=-100)
    cer = nn.CrossEntropyLoss(ignore_index=-100, reduction='none')
    pad = tok.pad_token_id
    t0 = time.time()
    model.train()
    while step < total:
        ep = step // steps_per_epoch
        order = list(range(len(data)))
        random.Random(a.seed + ep).shuffle(order)
        # length-bucketed batches for speed
        chunks = [order[i:i + a.bs * 50] for i in range(0, len(order), a.bs * 50)]
        batches = []
        for c in chunks:
            c = sorted(c, key=lambda i: len(data[i]['ids']))
            batches += [c[i:i + a.bs] for i in range(0, len(c), a.bs)]
        random.Random(a.seed + 1000 + ep).shuffle(batches)
        for bi in range(step - ep * steps_per_epoch, len(batches)):
            if step >= total:
                break
            bb = [data[i] for i in batches[bi]]
            ids, att, yt, yi, ytag = collate(bb, pad)
            sp, sm, w = soft_batch(bb, len(meta['intents']))
            lt, li, lg = model(ids, att)
            wn = w / w.mean()
            lti = (cer(lt, yt) * wn).mean()
            hard = yi >= 0
            lii = ((cer(li, yi) * wn)[hard].mean() if hard.any() else 0)
            kd = ((-(sp * torch.log_softmax(li, -1)).sum(-1) * wn * sm).sum() / sm.sum() if sm.sum() > 0 else 0)
            loss = lti + lii + a.kd * kd + 0.5 * (ce(lg.reshape(-1, lg.shape[-1]), ytag.reshape(-1)) if (ytag >= 0).any() else 0)
            opt.zero_grad()
            loss.backward()
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
            opt.step(); sched.step(); step += 1
            if step % 50 == 0:
                el = time.time() - t0
                print(f'step {step}/{total} ep {ep} loss {loss.item():.4f} {el:.0f}s', flush=True)
            if step % a.ckpt_every == 0 or step == total or bi == len(batches) - 1:
                torch.save({'model': model.state_dict(), 'opt': opt.state_dict(), 'sched': sched.state_dict(), 'step': step}, ck + '.tmp')
                os.replace(ck + '.tmp', ck)
    model.eval()
    torch.save(model.state_dict(), os.path.join(a.out, 'final.pt'))
    tok.save_pretrained(a.out)
    json.dump({'base': a.base, 'layers': a.layers, 'epochs': a.epochs, 'rows': len(data), 'all': a.all, 'meta': meta}, open(os.path.join(a.out, 'train_info.json'), 'w'))
    print('done', flush=True)


if __name__ == '__main__':
    main()
