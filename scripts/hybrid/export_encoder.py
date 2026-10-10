#!/usr/bin/env python3
"""Export the joint encoder (B) to ONNX + int8 (dynamic quantisation) and write the runtime bundle:

  hybrid/models/enc/
    encoder.int8.onnx   inputs input_ids/attention_mask [b,t] int64 -> tool [b,55], intent [b,149], tags [b,t,37]
    vocab.json          {"pieces": [...], "scores": [...], "unk": 3}  (pruned SentencePiece Unigram vocabulary)
    labels.json         tools / intents / tagLabels, context format, max length
  Also checks ONNX fp32 / int8 against PyTorch on dev sentences (argmax agreement).

Usage: python3 scripts/hybrid/export_encoder.py [--ckpt build/hybrid/enc/final.pt] [--out hybrid/models/enc]
"""
import argparse, json, os, sys
import numpy as np
import torch

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from train_encoder import Joint, ctx_str  # noqa: E402


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--enc', default=os.path.join(ROOT, 'build/hybrid/enc'))
    ap.add_argument('--ckpt', default=None)
    ap.add_argument('--out', default=os.path.join(ROOT, 'hybrid/models/enc'))
    ap.add_argument('--layers', type=int, default=None)
    ap.add_argument('--gather', action='store_true', help='also quantise the embedding Gather (smaller file)')
    a = ap.parse_args()
    from transformers import AutoTokenizer
    from onnxruntime.quantization import quantize_dynamic, QuantType
    import onnxruntime as ort
    ti = os.path.join(a.enc, 'train_info.json')
    info = json.load(open(ti)) if os.path.exists(ti) else {  # exporting a mid-training checkpoint
        'meta': json.load(open(os.path.join(ROOT, 'build/hybrid/meta.json'))), 'base': os.path.join(ROOT, 'build/hybrid/e5-pruned'), 'layers': 6}
    meta = info['meta']
    base = info['base']
    tok = AutoTokenizer.from_pretrained(base)
    model = Joint(base, len(meta['tools']), len(meta['intents']), len(meta['tagLabels']), a.layers or info.get('layers'))
    sd = torch.load(a.ckpt or os.path.join(a.enc, 'final.pt'), map_location='cpu', weights_only=False)
    model.load_state_dict(sd.get('model', sd))
    model.eval()
    os.makedirs(a.out, exist_ok=True)
    fp = os.path.join(a.out, 'encoder.fp32.onnx')
    q = os.path.join(a.out, 'encoder.int8.onnx')
    ex = tok(['pokaż największe pliki'], ['bash linux'], return_tensors='pt')
    torch.onnx.export(model, (ex['input_ids'], ex['attention_mask']), fp, input_names=['input_ids', 'attention_mask'],
                      output_names=['tool', 'intent', 'tags'],
                      dynamic_axes={'input_ids': {0: 'b', 1: 't'}, 'attention_mask': {0: 'b', 1: 't'}, 'tool': {0: 'b'}, 'intent': {0: 'b'}, 'tags': {0: 'b', 1: 't'}},
                      opset_version=17, dynamo=False)
    ops = ['MatMul', 'Gather'] if a.gather else ['MatMul']
    quantize_dynamic(fp, q, weight_type=QuantType.QInt8, op_types_to_quantize=ops, per_channel=False)
    spec = json.load(open(os.path.join(base, 'tokenizer.json'), encoding='utf-8'))
    vocab = spec['model']['vocab']
    json.dump({'pieces': [p for p, _ in vocab], 'scores': [round(s, 5) for _, s in vocab], 'unk': spec['model']['unk_id']},
              open(os.path.join(a.out, 'vocab.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    json.dump({'tools': meta['tools'], 'intents': meta['intents'], 'tagLabels': meta['tagLabels'], 'maxLen': 64,
               'context': '{shell} {os}', 'layers': info.get('layers'), 'version': 1},
              open(os.path.join(a.out, 'labels.json'), 'w'), indent=1)
    # parity on dev rows
    rows = [json.loads(l) for l in open(os.path.join(ROOT, 'build/hybrid/train.jsonl'), encoding='utf-8')]
    rows = [r for r in rows if r['split'] == 'dev'][:300]
    sess = {k: ort.InferenceSession(p, providers=['CPUExecutionProvider']) for k, p in (('fp32', fp), ('int8', q))}
    agree = {'fp32': [0, 0], 'int8': [0, 0]}
    for r in rows:
        e = tok([r['text']], [ctx_str(r)], return_tensors='pt', truncation='only_first', max_length=64)
        with torch.no_grad():
            pt = model(e['input_ids'], e['attention_mask'])
        feed = {'input_ids': e['input_ids'].numpy(), 'attention_mask': e['attention_mask'].numpy()}
        for k, s in sess.items():
            o = s.run(None, feed)
            agree[k][0] += int(np.argmax(o[1]) == int(pt[1].argmax()))
            agree[k][1] += int(np.argmax(o[0]) == int(pt[0].argmax()))
    rep = {'fp32_mb': round(os.path.getsize(fp) / 1e6, 2), 'int8_mb': round(os.path.getsize(q) / 1e6, 2),
           'vocab_json_mb': round(os.path.getsize(os.path.join(a.out, 'vocab.json')) / 1e6, 2),
           'intent_argmax_agree_fp32': agree['fp32'][0] / len(rows), 'intent_argmax_agree_int8': agree['int8'][0] / len(rows),
           'tool_argmax_agree_int8': agree['int8'][1] / len(rows), 'n': len(rows), 'gather_quantized': a.gather}
    json.dump(rep, open(os.path.join(a.out, 'export_report.json'), 'w'), indent=1)
    os.remove(fp) if not os.environ.get('KEEP_FP32') else None
    print(rep)


if __name__ == '__main__':
    main()
