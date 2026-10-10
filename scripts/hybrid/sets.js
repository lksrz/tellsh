// Evaluation sets shared by scripts/hybrid/dump_cascade.js (A's top-k for the Python rerankers) and eval_hybrid.js.
// Every set is a list of {text, intent|null, lang, shell, os, ...}. The real-usage sets come from the PRIVATE
// build/real/rows.jsonl (scripts/real/prepare_real.js) and are empty when it is missing.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { silverSpans, relex, mulberry32 } from '../lib/silver.js';

const readJsonl = (p) => (existsSync(p) ? readFileSync(p, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l)) : []);
const readDir = (d) => (existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.jsonl')).sort().flatMap((f) => readJsonl(join(d, f))) : []);

// intents added in v0.4 (from real command usage)
export const NEW_INTENTS = new Set(['print_line_range', 'ssh_port_forward', 'npm_run_script', 'npm_install', 'npm_install_global',
  'pip_install', 'activate_venv', 'tool_version', 'cli_help', 'wrangler_deploy', 'wrangler_dev', 'wrangler_tail',
  'wrangler_secret_put', 'wrangler_login', 'wrangler_whoami', 'gh_auth_status', 'gh_auth_login', 'gh_pr_list', 'gh_pr_view',
  'gh_pr_create', 'gh_pr_checks', 'gh_pr_merge', 'gh_run_list', 'gh_run_view']);

// their tool families (lets the v0.3 code, which does not know them, be scored on stage 1 too)
export const NEW_FAMILY = Object.fromEntries([...NEW_INTENTS].map((i) => [i,
  i === 'print_line_range' ? 'head' : i === 'ssh_port_forward' ? 'ssh' : /^npm_/.test(i) ? 'npm' : /^(pip_install|activate_venv)$/.test(i) ? 'python'
    : /^(tool_version|cli_help)$/.test(i) ? 'cli' : i.split('_')[0]]));

export function evalSets(ROOT) {
  const real = readJsonl(join(ROOT, 'build/real/rows.jsonl')).filter((r) => r.split === 'eval');
  const v04 = readDir(join(ROOT, 'data/eval_v04'));
  return {
    eval: () => readDir(join(ROOT, 'data/eval')).map((r) => ({ ...r, shell: 'bash', os: 'linux' })),
    shell: () => readJsonl(join(ROOT, 'data/shell/eval.jsonl')),
    blind: () => readDir(join(ROOT, 'data/hybrid/blind')).filter((r) => r.intent),
    blind_ood: () => readDir(join(ROOT, 'data/hybrid/blind')).filter((r) => !r.intent),
    blind3: () => readJsonl(join(ROOT, 'data/blind/intents.jsonl')),
    blind3_ood: () => readJsonl(join(ROOT, 'data/blind/ood.jsonl')),
    ood: () => readJsonl(join(ROOT, 'data/ood_eval.jsonl')),
    devtools: () => v04.filter((r) => r.intent),
    real: () => real.filter((r) => r.intent),
    real_ooc: () => real.filter((r) => !r.intent),
    // relexicalised data/eval: same construction and seed as scripts/eval.js section 4
    relex: () => {
      const rng = mulberry32(7);
      const out = [];
      for (const r of readDir(join(ROOT, 'data/eval'))) {
        const { spans } = silverSpans(r.text, r.intent);
        if (!spans.length) continue;
        const rx = relex(r.text, spans, { lang: r.lang, rng, split: 'eval', keepProb: 0 });
        out.push({ text: rx.text, intent: r.intent, lang: r.lang, shell: 'bash', os: 'linux' });
      }
      return out;
    },
  };
}
