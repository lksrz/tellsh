#!/usr/bin/env python3
"""(C) System-1-style decision model: a tiny causal LM scores A's top-k candidate intents in ONE forward pass.

Prompt lists the candidates as options A..E (catalog descriptions); the next-token logits of the letters give a
distribution over the candidates.  Sub-commands:

  zeroshot  --model ID --set dev --n 300 [--fewshot]      accuracy of picking the gold among the candidates
  train     --model ID --out DIR [--lora] [--steps N]     fine-tune on training rows (letters shuffled), resumable
  score     --model DIR|ID --cands build/hybrid/cands_X.jsonl --out build/hybrid/lm_X.jsonl   letter probs for all rows
  export    --model DIR --out build/hybrid/lm.onnx         ONNX (last-position letter logits only) + int8 quantisation

Candidates come from scripts/hybrid/dump_cascade.js (A's top-k).  For training the gold is forced into the list
(replacing the last candidate if missing) and the order is shuffled so the letter position carries no information.
"""
import argparse, json, math, os, random, sys, time
import torch

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
LETTERS = 'ABCDE'
K = 5
SYSTEM = "You map a user's request to the matching shell-command intent. Reply with a single letter."


def meta():
    return json.load(open(os.path.join(ROOT, 'build/hybrid/meta.json')))


def opt_text(intent, desc):
    return f"{desc} ({intent.replace('_', ' ')})"


def prompt_body(text, shell, os_, cands, desc):
    lines = [f"Request: {text}", f"Shell: {shell} ({os_})", "Options:"]
    for L, c in zip(LETTERS, cands):
        lines.append(f"{L}) {opt_text(c, desc[c])}")
    lines.append("Answer:")
    return '\n'.join(lines)


FEWSHOT = [
    ("pokaż ukryte pliki w ~/projekt", "bash", "linux", ['list_files', 'hidden_files', 'find_by_name', 'list_tree', 'recent_files'], 1),
    ("which process listens on 8080", "zsh", "darwin", ['listening_ports', 'kill_by_port', 'process_on_port', 'port_check', 'find_process'], 2),
]


class Prompter:
    def __init__(self, tok, chat, fewshot=False):
        self.tok, self.chat, self.fewshot = tok, chat, fewshot
        self.desc = meta()['descriptions']
        ids = [tok.encode(L, add_special_tokens=False) for L in LETTERS]
        ids_sp = [tok.encode(' ' + L, add_special_tokens=False) for L in LETTERS]
        self.letter_ids = [i[-1] for i in ids]
        self.letter_ids_sp = [i[-1] for i in ids_sp]

    def __call__(self, text, shell, os_, cands):
        body = prompt_body(text, shell, os_, cands, self.desc)
        if not self.chat:
            return body + ' '  # plain format used for fine-tuning: "Answer: X"
        msgs = [{'role': 'system', 'content': SYSTEM}]
        if self.fewshot:
            for t, s, o, c, g in FEWSHOT:
                msgs += [{'role': 'user', 'content': prompt_body(t, s, o, c, self.desc)}, {'role': 'assistant', 'content': LETTERS[g]}]
        msgs.append({'role': 'user', 'content': body})
        return self.tok.apply_chat_template(msgs, tokenize=False, add_generation_prompt=True)


def candidate_list(row, rng=None, train=False):
    cands = [c['intent'] for c in row['cands'][:K]]
    gold = row.get('intent')
    if train and gold and gold not in cands:
        cands = cands[:K - 1] + [gold]
    if train:
        allints = meta()['intents']
        while len(cands) < K:
            x = rng.choice(allints)
            if x not in cands:
                cands.append(x)
        rng.shuffle(cands)
    return cands


def load(model_id, dtype=torch.float32):
    from transformers import AutoModelForCausalLM, AutoTokenizer
    tok = AutoTokenizer.from_pretrained(model_id)
    m = AutoModelForCausalLM.from_pretrained(model_id, dtype=dtype)
    m.eval()
    return tok, m


@torch.no_grad()
def letter_logits(m, tok, prompts, letter_ids, bs=8):
    tok.padding_side = 'left'
    if tok.pad_token is None:
        tok.pad_token = tok.eos_token
    out = []
    for i in range(0, len(prompts), bs):
        enc = tok(prompts[i:i + bs], return_tensors='pt', padding=True, add_special_tokens=False)
        lg = m(**enc, logits_to_keep=1).logits[:, -1, :]
        out += lg[:, letter_ids].float().tolist()
    return out


def read_cands(path, sets=None):
    rows = [json.loads(l) for l in open(path, encoding='utf-8')]
    return [r for r in rows if sets is None or r['set'] in sets]


def cmd_zeroshot(a):
    tok, m = load(a.model, getattr(torch, a.dtype))
    chat = tok.chat_template is not None and not a.plain
    P = Prompter(tok, chat, a.fewshot)
    rows = [r for r in read_cands(a.cands, {a.set}) if r['intent']]
    random.Random(1).shuffle(rows)
    rows = rows[:a.n]
    rng = random.Random(5)
    lists = [candidate_list(r, rng, train=True) for r in rows]  # gold forced in, shuffled: pure choice accuracy
    prompts = [P(r['text'], r['shell'], r['os'], c) for r, c in zip(rows, lists)]
    ntok = sum(len(tok(p, add_special_tokens=False)['input_ids']) for p in prompts) / len(prompts)
    t0 = time.time()
    best = None
    for name, lid in (('nosp', P.letter_ids), ('sp', P.letter_ids_sp)):
        lg = letter_logits(m, tok, prompts, lid)
        acc = sum(c[max(range(K), key=lambda j: l[j])] == r['intent'] for r, c, l in zip(rows, lists, lg)) / len(rows)
        langs = {}
        for r, c, l in zip(rows, lists, lg):
            langs.setdefault(r['lang'], []).append(c[max(range(K), key=lambda j: l[j])] == r['intent'])
        res = {'model': a.model, 'dtype': a.dtype, 'set': a.set, 'n': len(rows), 'fewshot': a.fewshot, 'chat': chat, 'letters': name, 'acc': round(acc, 4),
               **{f'acc_{k}': round(sum(v) / len(v), 4) for k, v in langs.items()}, 'prompt_tokens': round(ntok, 1),
               'sec_per_row_multithread': round((time.time() - t0) / len(rows), 3)}
        print(json.dumps(res), flush=True)
        t0 = time.time()
        with open(os.path.join(ROOT, 'build/hybrid/zeroshot.jsonl'), 'a') as f:
            f.write(json.dumps(res) + '\n')


def cmd_train(a):
    from transformers import AutoModelForCausalLM, AutoTokenizer
    torch.manual_seed(0)
    tok = AutoTokenizer.from_pretrained(a.model)
    m = AutoModelForCausalLM.from_pretrained(a.model, dtype=torch.float32)
    if a.lora:
        from peft import LoraConfig, get_peft_model
        m = get_peft_model(m, LoraConfig(r=16, lora_alpha=32, lora_dropout=0.05, target_modules=['q_proj', 'k_proj', 'v_proj', 'o_proj', 'gate_proj', 'up_proj', 'down_proj']))
    P = Prompter(tok, chat=False)
    rows = read_cands(a.cands, {'train'})
    rng = random.Random(11)
    rng.shuffle(rows)
    os.makedirs(a.out, exist_ok=True)
    ck = os.path.join(a.out, 'ckpt.pt')
    params = [p for p in m.parameters() if p.requires_grad]
    opt = torch.optim.AdamW(params, lr=a.lr, weight_decay=0.0)
    step = 0
    if os.path.exists(ck):
        st = torch.load(ck, map_location='cpu', weights_only=False)
        m.load_state_dict(st['model'], strict=False); opt.load_state_dict(st['opt']); step = st['step']
        print('resumed', step, flush=True)
    sched = lambda s: min(1.0, (s + 1) / 30) * max(0.05, 1 - s / a.steps)
    m.train()
    t0 = time.time()
    tok.padding_side = 'left'
    if tok.pad_token is None:
        tok.pad_token = tok.eos_token
    lid = torch.tensor(P.letter_ids)
    while step < a.steps:
        batch = [rows[(step * a.bs + j) % len(rows)] for j in range(a.bs)]
        brng = random.Random(1000 + step)
        lists = [candidate_list(r, brng, train=True) for r in batch]
        prompts = [P(r['text'], r['shell'], r['os'], c) for r, c in zip(batch, lists)]
        y = torch.tensor([c.index(r['intent']) for r, c in zip(batch, lists)])
        enc = tok(prompts, return_tensors='pt', padding=True, add_special_tokens=False)
        lg = m(**enc, logits_to_keep=1).logits[:, -1, :][:, lid]  # cross-entropy over the 5 letters only
        loss = torch.nn.functional.cross_entropy(lg, y)
        for g in opt.param_groups:
            g['lr'] = a.lr * sched(step)
        opt.zero_grad(); loss.backward(); torch.nn.utils.clip_grad_norm_(params, 1.0); opt.step(); step += 1
        if step % 10 == 0:
            print(f'step {step}/{a.steps} loss {loss.item():.4f} {time.time() - t0:.0f}s', flush=True)
        if step % 50 == 0 or step == a.steps:
            sd = {k: v for k, v in m.state_dict().items() if (not a.lora) or 'lora' in k}
            torch.save({'model': sd, 'opt': opt.state_dict(), 'step': step}, ck + '.tmp'); os.replace(ck + '.tmp', ck)
    if a.lora:
        m = m.merge_and_unload()
    m.save_pretrained(os.path.join(a.out, 'final')); tok.save_pretrained(os.path.join(a.out, 'final'))
    print('done', flush=True)


def cmd_score(a):
    tok, m = load(a.model, getattr(torch, a.dtype))
    chat = (tok.chat_template is not None) and not a.plain
    P = Prompter(tok, chat, a.fewshot)
    rows = read_cands(a.cands, set(a.sets.split(',')))
    done = set()
    if os.path.exists(a.out):
        done = {(json.loads(l)['set'], json.loads(l)['i']) for l in open(a.out)}
    rows = [r for r in rows if (r['set'], r['i']) not in done]
    lid = P.letter_ids if not chat else P.letter_ids
    with open(a.out, 'a') as f:
        for i in range(0, len(rows), 64):
            chunk = rows[i:i + 64]
            lists = [candidate_list(r) for r in chunk]
            lg = letter_logits(m, tok, [P(r['text'], r['shell'], r['os'], c) for r, c in zip(chunk, lists)], lid)
            for r, c, l in zip(chunk, lists, lg):
                f.write(json.dumps({'set': r['set'], 'i': r['i'], 'cands': c, 'logits': [round(x, 4) for x in l[:len(c)]]}) + '\n')
            f.flush()
            print(f'{i + len(chunk)}/{len(rows)}', flush=True)


def cmd_export(a):
    from onnxruntime.quantization import quantize_dynamic, QuantType
    tok, m = load(a.model)
    P = Prompter(tok, chat=False)
    lid = torch.tensor(P.letter_ids)

    class Head(torch.nn.Module):
        def __init__(s, m):
            super().__init__(); s.m = m

        def forward(s, input_ids, attention_mask):
            out = s.m(input_ids=input_ids, attention_mask=attention_mask, use_cache=False, logits_to_keep=1).logits
            return out[:, -1, :][:, lid]

    m.config.use_cache = False
    ex = tok(['Request: x\nAnswer: '], return_tensors='pt')
    fp = a.out.replace('.onnx', '.fp32.onnx')
    torch.onnx.export(Head(m), (ex['input_ids'], ex['attention_mask']), fp, input_names=['input_ids', 'attention_mask'],
                      output_names=['letters'], dynamic_axes={'input_ids': {0: 'b', 1: 't'}, 'attention_mask': {0: 'b', 1: 't'}, 'letters': {0: 'b'}},
                      opset_version=17, dynamo=False)
    quantize_dynamic(fp, a.out, weight_type=QuantType.QInt8)
    print('exported', a.out, os.path.getsize(a.out) / 1e6, 'MB')


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('cmd')
    ap.add_argument('--model', default='HuggingFaceTB/SmolLM2-135M-Instruct')
    ap.add_argument('--cands', default=os.path.join(ROOT, 'build/hybrid/cands_ship.jsonl'))
    ap.add_argument('--set', default='dev')
    ap.add_argument('--sets', default='dev,eval,shell,blind')
    ap.add_argument('--n', type=int, default=300)
    ap.add_argument('--fewshot', action='store_true')
    ap.add_argument('--plain', action='store_true')
    ap.add_argument('--lora', action='store_true')
    ap.add_argument('--steps', type=int, default=600)
    ap.add_argument('--bs', type=int, default=8)
    ap.add_argument('--lr', type=float, default=1e-4)
    ap.add_argument('--threads', type=int, default=2)
    ap.add_argument('--dtype', default='float32', help='bfloat16 halves memory (inference)')
    ap.add_argument('--out', default=os.path.join(ROOT, 'build/hybrid/lm'))
    a = ap.parse_args()
    torch.set_num_threads(a.threads)
    {'zeroshot': cmd_zeroshot, 'train': cmd_train, 'score': cmd_score, 'export': cmd_export}[a.cmd](a)
