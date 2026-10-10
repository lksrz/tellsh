#!/usr/bin/env node
// Render build/hybrid/{results,bench,policy}.json + zeroshot.jsonl into HYBRID.md (<!-- hybrid:start/end -->).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const J = (f) => (existsSync(join(ROOT, f)) ? JSON.parse(readFileSync(join(ROOT, f), 'utf8')) : null);
const res = J('build/hybrid/results.json');
// fine-tuned C variant (eval_hybrid.js --tag=_ft): merged in as C-ft / A+C-ft / A+C-ft-safe
const ft = J('build/hybrid/results_ft.json');
const merge = (dst, src) => {
  for (const [k, v] of Object.entries(src)) {
    if (/C/.test(k) && !/^(en|pl|all)$/.test(k) && typeof v === 'object' && !Array.isArray(v) && ['C', 'A+C', 'A+C-safe'].includes(k)) dst[k.replace('C', 'C-ft')] = v;
    else if (typeof v === 'object' && v && !Array.isArray(v) && dst[k] && typeof dst[k] === 'object') merge(dst[k], v);
  }
};
if (ft) merge(res.R, ft.R);
const bench = J('build/hybrid/bench.json');
const pol = J('build/hybrid/policy.json');
const polFt = J('build/hybrid/policy_ft.json');
if (pol && polFt) for (const k of ['C', 'A+C', 'A+C-safe']) if (polFt[k]) pol[k.replace('C', 'C-ft')] = polFt[k];
const zs = existsSync(join(ROOT, 'build/hybrid/zeroshot.jsonl')) ? readFileSync(join(ROOT, 'build/hybrid/zeroshot.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l)) : [];
const pct = (a, b) => (b ? `${((100 * a) / b).toFixed(1)}%` : 'n/a');
const R = res.R;
const ORDER = ['A', 'B', 'A+B', 'A+B-safe', 'C', 'A+C', 'A+C-safe', 'C-ft', 'A+C-ft', 'A+C-ft-safe'];
const SYS = ORDER.filter((s) => R.eval[s]);
const NAME = { 'C-ft': 'C-ft LM rerank alone (LoRA)', 'A+C-ft': 'A+C-ft hybrid', 'A+C-ft-safe': 'A+C-ft safe (no rescue)', A: 'A cascade (v0.2)', B: 'B encoder alone', C: 'C LM rerank alone', 'A+B': 'A+B hybrid', 'A+C': 'A+C hybrid', 'A+B-safe': 'A+B safe (no rescue)', 'A+C-safe': 'A+C safe (no rescue)' };
const md = [];
const L = (s = '') => md.push(s);

const SETNAME = { eval: '`data/eval` (bash)', shell: '`data/shell/eval` (shell-phrased)', blind: 'blind (all)', blind_novel: 'blind, novel texts only', private: 'private real-history (unverified labels)' };
L('### Classification (full pipeline; a rejected request counts as wrong)');
L();
L('| set | system | n | tool | intent | intent EN | intent PL | answered | precision | deferred to B/C |');
L('|---|---|---|---|---|---|---|---|---|---|');
for (const set of Object.keys(SETNAME)) {
  if (!R[set]) continue;
  for (const s of SYS) {
    const x = R[set][s]; if (!x?.all) continue;
    if (set === 'private' && /C/.test(s)) continue; // C was not scored on the private set
    const a = x.all;
    L(`| ${SETNAME[set]} | ${NAME[s]} | ${a.n} | ${pct(a.tool, a.n)} | **${pct(a.intent, a.n)}** | ${pct(x.en?.intent, x.en?.n)} | ${pct(x.pl?.intent, x.pl?.n)} | ${pct(a.ans, a.n)} | ${pct(a.ansOk, a.ans)} | ${s === 'A' ? '–' : pct(a.deferred, a.n)} |`);
  }
}
L();
L('### Per shell');
L();
const shells = ['bash', 'zsh', 'sh', 'powershell', 'fish', 'cmd'];
L('Blind set, intent accuracy by the row\'s shell (n in header); `data/eval` re-scored under each shell/OS context.');
L();
L(`| system | ${shells.map((sh) => `blind ${sh} (n=${R.blind.A['sh:' + sh]?.n || 0})`).join(' | ')} | ${shells.map((sh) => `data/eval as ${sh}`).join(' | ')} |`);
L(`|---|${shells.map(() => '---').join('|')}|${shells.map(() => '---').join('|')}|`);
for (const s of SYS) {
  const b = shells.map((sh) => { const x = R.blind[s]?.['sh:' + sh]; return x ? pct(x.intent, x.n) : 'n/a'; });
  const e = shells.map((sh) => (R.evalShells?.[s]?.[sh] != null ? `${(R.evalShells[s][sh] * 100).toFixed(1)}%` : 'n/a'));
  L(`| ${NAME[s]} | ${b.join(' | ')} | ${e.join(' | ')} |`);
}
L();
L('### Out-of-domain rejection');
L();
L('| system | `data/ood_eval` | blind OOD |');
L('|---|---|---|');
for (const s of SYS) L(`| ${NAME[s]} | ${pct(R.ood[s]?.rej, R.ood[s]?.n)} (n=${R.ood[s]?.n}) | ${pct(R.blind_ood[s]?.rej, R.blind_ood[s]?.n)} (n=${R.blind_ood[s]?.n}) |`);
L();
L('### Slots (stage 3, gold intent given)');
L();
L('| set | tagger | precision | recall | F1 | F1 EN | F1 PL |');
L('|---|---|---|---|---|---|---|');
for (const [set, v] of Object.entries(R.slots)) for (const [k, x] of Object.entries(v)) L(`| ${set === 'gold' ? '`data/slots/gold` (208)' : `blind (${x.n})`} | ${k} | ${(x.p * 100).toFixed(1)}% | ${(x.r * 100).toFixed(1)}% | **${(x.f1 * 100).toFixed(1)}%** | ${(x.en * 100).toFixed(1)}% | ${(x.pl * 100).toFixed(1)}% |`);
L();
L('### End-to-end exact command (bash for relex; the row\'s own shell for blind)');
L();
L('| system | relex `data/eval` (EN / PL) | blind (EN / PL) | blind novel | history refs |');
L('|---|---|---|---|---|');
for (const s of SYS) {
  const f = (x) => (x ? `${pct(x.all[1], x.all[0])} (${pct(x.en[1], x.en[0])} / ${pct(x.pl[1], x.pl[0])})` : 'n/a');
  const h = R.history[s];
  L(`| ${NAME[s]} | ${/^C/.test(s) && R.e2e.relex[s]?.all[0] < 200 ? `n/a (n=${R.e2e.relex[s]?.all[0]})` : f(R.e2e.relex[s])} | ${f(R.e2e.blind[s])} | ${R.e2e.blind_novel[s] ? pct(R.e2e.blind_novel[s].all[1], R.e2e.blind_novel[s].all[0]) : 'n/a'} | ${h ? `${h[1]}/${h[0]}` : 'n/a'} |`);
}
L();
if (pol) {
  L('### Calibrated policies (training dev split, A_dev)');
  L();
  L(`Dev rows: ${pol.n} (in-domain + OOD; A_dev accept threshold ${pol.thrAdev}). Objective: decision accuracy (correct intent, or rejection for OOD).`);
  L();
  L('| system | tau (A conf to answer alone) | k | alpha (weight of log pA) | accept | none | dev decision acc | dev deferred |');
  L('|---|---|---|---|---|---|---|---|');
  L(`| A_dev alone | – | – | – | – | – | ${(pol.A.acc * 100).toFixed(1)}% | – |`);
  for (const s of ['B', 'A+B', 'A+B-safe', 'C', 'A+C', 'A+C-safe', 'C-ft', 'A+C-ft', 'A+C-ft-safe']) {
    const p = pol[s]; if (!p) continue;
    L(`| ${s} | ${p.P.tau} | ${p.P.k} | ${p.P.alpha} | ${p.P.accept} | ${p.P.none}${p.P.keepNone ? ', keepNone' : ''} | ${(p.s.acc * 100).toFixed(1)}% (n=${p.s.n}) | ${(p.s.deferred * 100).toFixed(1)}% |`);
  }
  L();
}
if (zs.length) {
  L('### C: zero-/few-shot choice accuracy (gold forced among 5 shuffled candidates, 100 dev rows)');
  L();
  L('| model | prompt | letters | acc | EN | PL | prompt tokens |');
  L('|---|---|---|---|---|---|---|');
  for (const z of zs) L(`| ${z.model.split('/')[1]} (${z.dtype || 'float32'}) | ${z.fewshot ? '2-shot' : '0-shot'} chat | ${z.letters === 'sp' ? '" A"' : '"A"'} | ${(z.acc * 100).toFixed(0)}% | ${(z.acc_en * 100).toFixed(0)}% | ${(z.acc_pl * 100).toFixed(0)}% | ${z.prompt_tokens} |`);
  L();
}
if (bench) {
  L(`### Latency (one core: \`taskset -c ${bench.affinity}\`; ${bench.machine}, Node ${bench.node}; shared machine under load)`);
  L();
  const r = (x) => (x ? `${x.p50} / ${x.p95}` : 'n/a');
  L('| measurement | p50 / p95 ms |');
  L('|---|---|');
  L(`| warm A (full pipeline, composer off) | ${r(bench.warm_A)} |`);
  for (const rt of ['node', 'web']) {
    if (!bench[`warm_B_infer_${rt}`]) continue;
    L(`| warm B encoder inference only (onnxruntime-${rt}) | ${r(bench[`warm_B_infer_${rt}`])} |`);
    L(`| warm B alone, full pipeline (onnxruntime-${rt}) | ${r(bench[`warm_B_full_${rt}`])} |`);
    L(`| warm A+B, full pipeline (onnxruntime-${rt}; ${(bench[`warm_AB_${rt}`].deferred * 100).toFixed(1)}% deferred) | ${r(bench[`warm_AB_${rt}`])} |`);
    L(`| B bundle load + session create (onnxruntime-${rt}) | ${bench[`load_B_${rt}_ms`]} |`);
  }
  L(`| cold \`node -e 0\` | ${r(bench.cold_node_baseline)} |`);
  L(`| cold A (new process, one query) | ${r(bench.cold_A)} |`);
  L(`| cold A+B (lazy encoder only when deferred; ${bench.cold_AB.deferred}/${bench.cold_AB.n} deferred) | ${r(bench.cold_AB)} |`);
  if (bench.cold_AB_deferred_only) L(`| cold A+B, deferred queries only | ${r(bench.cold_AB_deferred_only)} |`);
  L(`| cold B (always loads the encoder) | ${r(bench.cold_B)} |`);
  for (const [k, v] of Object.entries(bench)) {
    if (k.startsWith('C_llama_') && Array.isArray(v)) for (const x of v) if (x.n_prompt) L(`| C ${k.slice(8)}: ${x.n_prompt}-token prompt (llama.cpp, 1 thread, ${x.tps.toFixed(0)} tok/s) | ${(1000 * x.n_prompt / x.tps).toFixed(0)} |`);
    if (k.startsWith('C_cold_')) L(`| C cold ${k.slice(7)}: new llama-cli process, load + 300-token prompt | ${r(v)} |`);
  }
  L();
  if (bench.bundle) L(`B bundle files: ${Object.entries(bench.bundle).map(([f, s]) => `${f} ${(s / 1e6).toFixed(1)} MB`).join(', ')}.`);
  L();
}
const quant = J('build/hybrid/quant.json');
if (quant) {
  L('### B quantisation (dev split, 600 rows; 1-core onnxruntime-node p50)');
  L();
  L('| variant | size MB | dev intent acc | argmax agreement with fp32 | p50 ms |');
  L('|---|---|---|---|---|');
  for (const q of quant) L(`| ${q.variant} | ${q.mb} | ${q.dev_acc != null ? (q.dev_acc * 100).toFixed(1) + '%' : 'n/a'} | ${(q.agree * 100).toFixed(1)}% | ${q.p50_ms ?? 'n/a'} |`);
  L();
}
const sz = J('build/hybrid/sizes.json');
if (sz) {
  L('### Sizes');
  L();
  L('| artefact | size |');
  L('|---|---|');
  L(`| tellsh npm package (A, zero dependencies) | ${sz.tellsh_pack_mb} MB packed (model.bin ${sz.model_bin_mb} MB) |`);
  L(`| B bundle (tellsh-model-enc): encoder.int8.onnx + vocab.json | ${sz.enc_onnx_mb} + ${sz.enc_vocab_mb} MB (${sz.enc_bundle_tgz_mb} MB .tgz) |`);
  L(`| B params: e5-small ${sz.e5_small_full_params_m}M -> PL+EN vocab ${sz.vocab_before} -> ${sz.vocab_after} pieces ${sz.e5_pruned_params_m}M -> 6 layers ${sz.e5_pruned_6l_params_m}M | |`);
  L(`| onnxruntime-node (runtime for B) | ${sz.ort_node_tgz_mb} MB .tgz, ${sz.ort_node_unpacked_mb} MB unpacked (all platforms), + ${sz.ort_node_cuda_postinstall_mb} MB CUDA EP downloaded by its postinstall on linux-x64 (skip: \`--onnxruntime-node-install=skip\`); linux-x64 lib alone ${sz.ort_node_linux_x64_so_mb} MB |`);
  L(`| onnxruntime-web (WASM alternative) | ${sz.ort_web_tgz_mb} MB .tgz (one .wasm ${sz.ort_web_wasm_mb} MB) |`);
  L(`| C: Qwen2.5-0.5B GGUF | q8_0 ${sz.qwen05_q8_gguf_mb} MB, Q4_K_M ${sz.qwen05_q4km_gguf_mb} MB (+ llama.cpp CPU build ${sz.llama_cpp_cpu_release_tgz_mb} MB) |`);
  L();
}
const block = `<!-- hybrid:start -->\n${md.join('\n').trim()}\n<!-- hybrid:end -->`;
const P = join(ROOT, 'HYBRID.md');
let doc = existsSync(P) ? readFileSync(P, 'utf8') : '# tellsh hybrid\n\n<!-- hybrid:start -->\n<!-- hybrid:end -->\n';
doc = doc.replace(/<!-- hybrid:start -->[\s\S]*?<!-- hybrid:end -->/, block);
writeFileSync(P, doc);
console.log('wrote HYBRID.md tables');
