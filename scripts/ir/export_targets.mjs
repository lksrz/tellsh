#!/usr/bin/env node
// Export model targets for the typed-IR trainer (ml/ir/) from a dataset built by dedup.mjs.
// All IR logic stays in JS: Python reads token ids, unit maps and action/P targets only.
//
//   node scripts/ir/export_targets.mjs [--data build/ir/dataset/v1] [--out build/ir/targets/v1] [--max-tokens 128] [--vocab FILE]
//
// Writes OUT/{train,dev,test}.jsonl, OUT/vocab.json (actions + P head vocabularies; --vocab: copied from FILE,
// rows with actions outside it are dropped as unknown_action) and OUT/stats.json.
// Row: {id, request, os, label, ids, tok_unit, units, actions: [[actionId, u0, u1]], p: {...} | null}
//   ids       = <s> request </s></s> os </s> (student Unigram tokenizer, XLM-R pair layout)
//   tok_unit  = pointer-unit index of each request token (-1 for specials / os tokens)
//   units     = [[charStart, charEnd]] pointer units (§4.1)
//   p         = P-route targets (§4.3) when the IR is one exec stage with <= 1 value per slot.
// Rows whose actions do not round-trip (decode(encode(ir)) canon-equal to ir) or exceed the caps are dropped.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSchemas, segment, canon, equals } from '../../ir/lib/index.js';
import { UnigramTokenizer } from '../../src/rerank/tokenizer.js';
import { buildVocab, encodeActions, decodeActions, pTargets } from './actions.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const DATA = path.resolve(ROOT, opt('data', 'build/ir/dataset/v1'));
const OUT = path.resolve(ROOT, opt('out', 'build/ir/targets/v1'));
const MAX_TOK = Number(opt('max-tokens', 128));
const VOCAB = opt('vocab', ''); // fixed vocab.json (e.g. a held-out set scored by models trained on another build)
const MAX_UNITS = 64, MAX_ACTIONS = 32;

export function loadTokenizer(dir = path.join(ROOT, 'hybrid/models/student')) {
  const v = JSON.parse(fs.readFileSync(path.join(dir, 'vocab.json'), 'utf8'));
  return new UnigramTokenizer({ vocab: v.pieces.map((p, i) => [p, v.scores[i]]), unkId: v.unk });
}

// Request tokens -> unit index by the token's start char; a unit no token starts in borrows the token covering it.
export function encodeInput(tok, request, os) {
  const seg = segment(request);
  const units = seg.units.map((u) => [u.s, u.e]);
  const rt = tok.tokenize(request);
  const os_ = tok.tokenize(os === 'darwin' ? 'macos' : 'linux');
  const unitAt = (c) => units.findIndex(([s, e]) => c >= s && c < e);
  const ids = [tok.bos, ...rt.map((t) => t.id), tok.eos, tok.eos, ...os_.map((t) => t.id), tok.eos];
  const tokUnit = [-1, ...rt.map((t) => unitAt(t.start)), -1, -1, ...os_.map(() => -1), -1];
  const extra = [];
  units.forEach(([s], ui) => {
    if (tokUnit.includes(ui)) return;
    const ti = rt.findIndex((t) => t.start <= s && t.end > s);
    if (ti >= 0) extra.push([ti + 1, ui]);
  });
  return { seg, units, ids, tokUnit, extra };
}

function main() {
  const schemas = loadSchemas();
  const vocab = VOCAB ? JSON.parse(fs.readFileSync(path.resolve(ROOT, VOCAB), 'utf8')) : buildVocab(schemas);
  const aid = new Map(vocab.actions.map((a, i) => [a, i]));
  const tok = loadTokenizer();
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'vocab.json'), JSON.stringify(vocab, null, 1));
  const stats = { vocab: { actions: vocab.actions.length, ops: vocab.p.ops.length, mods: vocab.p.mods.length, slots: vocab.p.slots.length, value_kinds: vocab.p.value_kinds.length } };
  for (const split of ['train', 'dev', 'test']) {
    const file = path.join(DATA, `${split}.jsonl`);
    if (!fs.existsSync(file)) continue;
    const st = { read: 0, written: 0, p_rows: 0, dropped: {}, len: {} };
    const drop = (k) => { st.dropped[k] = (st.dropped[k] || 0) + 1; };
    const out = [];
    fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).forEach((line, i) => {
      st.read++;
      const r = JSON.parse(line);
      const enc = encodeInput(tok, r.request, r.os);
      if (enc.ids.length > MAX_TOK) return drop('tokens');
      if (enc.units.length > MAX_UNITS || !enc.units.length) return drop('units');
      let acts;
      try { acts = encodeActions(r.ir, r.label, r.reasons, schemas); } catch (e) { return drop(`encode: ${e.message.slice(0, 40)}`); }
      if (acts.length > MAX_ACTIONS) return drop('actions');
      if (acts.some(([a]) => !aid.has(a))) return drop('unknown_action');
      if (r.label === 'ok') {
        try {
          const ctx = { schemas, request: r.request, seg: enc.seg };
          if (!equals(canon(decodeActions(acts, schemas), ctx), canon(r.ir, ctx))) return drop('roundtrip');
        } catch (e) { return drop('roundtrip_error'); }
      }
      const p = r.label === 'ok' ? pTargets(r.ir, schemas) : null;
      if (p) st.p_rows++;
      st.len[acts.length] = (st.len[acts.length] || 0) + 1;
      out.push(JSON.stringify({
        id: `${split}:${i}`, request: r.request, os: r.os, label: r.label, ids: enc.ids, tok_unit: enc.tokUnit, extra: enc.extra,
        units: enc.units, actions: acts.map(([a, u0, u1]) => [aid.get(a), u0, u1]), p,
      }));
      st.written++;
    });
    fs.writeFileSync(path.join(OUT, `${split}.jsonl`), out.join('\n') + '\n');
    stats[split] = st;
    console.error(`${split}: read ${st.read} written ${st.written} (P-expressible ${st.p_rows}) dropped ${JSON.stringify(st.dropped)}`);
  }
  fs.writeFileSync(path.join(OUT, 'stats.json'), JSON.stringify(stats, null, 1));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();
