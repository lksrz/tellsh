#!/usr/bin/env python3
"""Distillation step 2 (build-time only, GPU host): LoRA-tune a 7B instruct LLM as an intent teacher, then label the pool.

  train:  python3 teacher_lora.py train --train build/hybrid/train.jsonl --meta build/hybrid/meta.json --out $D/teacher-lora
  label:  python3 teacher_lora.py label --pool $D/pool.jsonl --meta build/hybrid/meta.json --lora $D/teacher-lora --out $D/labels.jsonl

The teacher is never shipped. `label` scores every candidate intent id (pool row `cands` + "none") by its summed
log-likelihood after the prompt and writes a softmax distribution: {id, soft:{intent: p}, top, margin}.
Resumable: `label` skips ids already in --out. Needs: torch, transformers, peft (bitsandbytes optional for --4bit).
"""
import argparse, hashlib, json, math, os, random, sys
import torch

SYS = ("You map a terminal request (English or Polish) to one intent id from the tellsh catalog. "
       "Answer with the intent id only, or none if no catalog intent fits.")


def prompt(tok, r, desc):
    opts = '\n'.join(f'- {c}: {desc.get(c, "")}' for c in r['cands'] + ['none'])
    u = f"Shell: {r.get('shell') or 'bash'} on {r.get('os') or 'linux'}\nRequest: {r['text']}\nCandidates:\n{opts}"
    return tok.apply_chat_template([{'role': 'system', 'content': SYS}, {'role': 'user', 'content': u}],
                                   tokenize=False, add_generation_prompt=True)


def load(a, train=False):
    from transformers import AutoModelForCausalLM, AutoTokenizer
    tok = AutoTokenizer.from_pretrained(a.base)
    kw = {'torch_dtype': torch.bfloat16, 'device_map': 'auto'}
    if a.q4:
        from transformers import BitsAndBytesConfig
        kw['quantization_config'] = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_compute_dtype=torch.bfloat16, bnb_4bit_quant_type='nf4')
    return tok, AutoModelForCausalLM.from_pretrained(a.base, **kw)


def descs(meta_path):
    m = json.load(open(meta_path))
    return m.get('descriptions') or m.get('intentDesc') or {i: i.replace('_', ' ') for i in m['intents']}


def train(a):
    from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
    tok, model = load(a, True)
    if a.q4: model = prepare_model_for_kbit_training(model)
    model = get_peft_model(model, LoraConfig(r=16, lora_alpha=32, lora_dropout=0.05, task_type='CAUSAL_LM',
                                             target_modules=['q_proj', 'k_proj', 'v_proj', 'o_proj', 'gate_proj', 'up_proj', 'down_proj']))
    desc = descs(a.meta)
    rows = [json.loads(l) for l in open(a.train) if l.strip()]
    # 'none' targets only from explicit out-of-domain rows; tldr rows carry a tool label but no intent (not a rejection)
    rows = [r for r in rows if r.get('split') == 'train' and (r.get('intent') or r.get('src') == 'ood') and float(r.get('w', 1)) > 0]
    random.Random(17).shuffle(rows); rows = rows[:a.max_rows]
    intents = list(desc)
    opt = torch.optim.AdamW([p for p in model.parameters() if p.requires_grad], lr=a.lr)
    model.train()
    for step, r in enumerate(rows):
        gold = r.get('intent') or 'none'
        neg = random.Random(step).sample([i for i in intents if i != gold], a.k - 1)
        r = {**r, 'cands': random.Random(-step).sample(neg + ([gold] if gold != 'none' else []), len(neg) + (gold != 'none'))}
        p = prompt(tok, r, desc); t = gold + tok.eos_token
        pi = tok(p, add_special_tokens=False).input_ids; ti = tok(t, add_special_tokens=False).input_ids
        ids = torch.tensor([pi + ti], device=model.device)
        lab = torch.tensor([[-100] * len(pi) + ti], device=model.device)
        loss = model(input_ids=ids, labels=lab).loss * float(r.get('w', 1)) / a.accum  # row weight (template multiplier)
        loss.backward()
        if (step + 1) % a.accum == 0: opt.step(); opt.zero_grad()
        if step % 200 == 0: print(f'step {step}/{len(rows)} loss {loss.item() * a.accum:.4f}', flush=True)
        if step and step % 2000 == 0: model.save_pretrained(a.out)
    if len(rows) % a.accum: opt.step(); opt.zero_grad()
    model.save_pretrained(a.out)


def guard_path(path):
    # a file we write: never through a symlink (dangling included), and its directory must not resolve into a repo
    # outside build/
    if os.path.islink(path): sys.exit(f'refusing symlink {path}')
    if os.path.exists(path) and os.stat(path).st_nlink > 1: sys.exit(f'refusing hard-linked file {path}')
    d = os.path.realpath(os.path.dirname(os.path.abspath(path)))
    up = d
    while True:
        if os.path.exists(os.path.join(up, '.git')):
            rel = os.path.relpath(d, up)
            if not (rel == 'build' or rel.startswith('build' + os.sep)): sys.exit(f'refusing {path}: inside the repo {up} outside build/')
            return
        nxt = os.path.dirname(up)
        if nxt == up: return
        up = nxt


@torch.no_grad()
def label(a):
    from peft import PeftModel
    tok, model = load(a)
    model = PeftModel.from_pretrained(model, a.lora); model.eval()
    desc = descs(a.meta)
    done = set()
    if os.path.exists(a.out):
        pool_h, pool_c = {}, {}
        for l in open(a.pool, encoding='utf-8'):
            r = json.loads(l); pool_h[r['id']] = hashlib.sha1(r['text'].encode('utf-8')).hexdigest()[:12]; pool_c[r['id']] = set(r['cands'] + ['none'])
        for l in open(a.out):
            if not l.strip(): continue
            x = json.loads(l)
            if pool_h.get(x['id']) != x.get('h') or set(x.get('soft', {})) != pool_c.get(x['id']): sys.exit(f'label: {a.out} was made for a different pool (id {x["id"]}); use a new --out')
            done.add(x['id'])
    # labels are bound to the exact pool they were made from (text, shell/OS and candidates): sidecar <out>.pool.sha256
    ph = hashlib.sha256(open(a.pool, 'rb').read()).hexdigest()
    side = a.out + '.pool.sha256'
    guard_path(a.out); guard_path(side)
    if os.path.exists(side) and open(side).read().strip() != ph: sys.exit(f'label: {a.out} was made for a different pool; use a new --out')
    if done and not os.path.exists(side): sys.exit(f'label: {a.out} has no {side}; use a new --out')
    open(side, 'w').write(ph + '\n')
    out = open(a.out, 'a')
    for l in open(a.pool):
        r = json.loads(l)
        if r['id'] in done: continue
        p = tok(prompt(tok, r, desc), add_special_tokens=False).input_ids
        cands = r['cands'] + ['none']
        cs = [tok(c + tok.eos_token, add_special_tokens=False).input_ids for c in cands]
        # prompt once, then all candidates in one batch on a replicated KV cache
        o = model(input_ids=torch.tensor([p], device=model.device), use_cache=True)
        first = torch.log_softmax(o.logits[0, -1].float(), -1)
        pkv = o.past_key_values
        pkv.batch_repeat_interleave(len(cs))
        L = max(map(len, cs)); pad = tok.pad_token_id or tok.eos_token_id
        ids = torch.tensor([c + [pad] * (L - len(c)) for c in cs], device=model.device)
        att = torch.tensor([[1] * len(p) + [1] * len(c) + [0] * (L - len(c)) for c in cs], device=model.device)
        lp = torch.log_softmax(model(input_ids=ids, attention_mask=att, past_key_values=pkv, use_cache=False).logits.float(), -1)
        sc = [first[c[0]].item() + sum(lp[j, t - 1, c[t]].item() for t in range(1, len(c))) for j, c in enumerate(cs)]
        z = max(sc); e = [math.exp(x - z) for x in sc]; Z = sum(e)
        soft = {c: round(v / Z, 5) for c, v in zip(cands, e)}
        top = sorted(soft, key=soft.get, reverse=True)
        out.write(json.dumps({'id': r['id'], 'h': hashlib.sha1(r['text'].encode('utf-8')).hexdigest()[:12], 'soft': soft, 'top': top[0], 'margin': round(soft[top[0]] - soft[top[1]], 4)}) + '\n')
        out.flush()


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('cmd', choices=['train', 'label'])
    ap.add_argument('--base', default='Qwen/Qwen2.5-7B-Instruct')
    ap.add_argument('--q4', action='store_true', help='4-bit NF4 base (16 GB GPUs)')
    ap.add_argument('--train'); ap.add_argument('--meta', required=True); ap.add_argument('--pool'); ap.add_argument('--lora')
    ap.add_argument('--out', required=True)
    ap.add_argument('--lr', type=float, default=1e-4); ap.add_argument('--accum', type=int, default=16)
    ap.add_argument('--k', type=int, default=8); ap.add_argument('--max-rows', type=int, default=40000)
    a = ap.parse_args()
    # adapters and labels come from private text: refuse an output inside a git work tree unless under its build/
    # no symlinks inside an existing output (save_pretrained / labels would write through them)
    for p_ in [a.out] + ([os.path.join(dp, f) for dp, dn, fn in os.walk(a.out) for f in dn + fn] if os.path.isdir(a.out) else []):
        if os.path.islink(p_): sys.exit(f'refusing: symlink in output {p_}')
    out_real = os.path.realpath(a.out)
    d = out_real
    while True:
        up = d
        if os.path.exists(os.path.join(up, '.git')):
            rel = os.path.relpath(out_real, up)
            if not (rel == 'build' or rel.startswith('build' + os.sep)): sys.exit(f'refusing --out inside the repo {up} (use a path outside it or under build/)')
            break
        nxt = os.path.dirname(d)
        if nxt == d: break
        d = nxt
    train(a) if a.cmd == 'train' else label(a)
