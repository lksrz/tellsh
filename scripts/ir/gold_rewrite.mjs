#!/usr/bin/env node
// Deterministic gold IR rewrites + train-only adjudication overlay + gold lint (docs/ir_error_taxonomy_v2.md
// F1, F2, F4, F7, F9, F10, M7). Runs on a dataset built by dedup.mjs and writes a new dataset dir.
//
//   node scripts/ir/gold_rewrite.mjs --in build/ir/dataset/v3base --out build/ir/dataset/v3 \
//        [--adj build/ir/adjudicate/v2_kfold/adjudications.jsonl[,...] --kfold build/ir/verifier/v2/kfold.jsonl[,...]]
//
// Rules (all splits, same deterministic rule; a rewrite is kept only when the gate accepts the new IR, strict):
//   files_find   cue-less files.list (rg --files) -> files.find -type f (max_depth, -name / any_name, -not -name,
//                prune, print0). Kept as rg when the request names rg/ripgrep, search, gitignore/ignored or hidden.
//   drop_o       only_matching before sort/uniq/freq/head when the request is about lines (no match/occurrence cue).
//   count_total  text.search -c over directory operands (or none) with no each/per/every-file cue -> | wc -l.
//   curl_head    http.get -i with a headers-only cue -> http.head (-I); http.head with a headers+body cue -> -i.
//   scope_path   a literal repo/project/workspace path after the/this/my/our -> dropped (cwd).
//   hidden_only  ls -a/-A [-1] [-R] or rg --files --hidden on a hidden-only cue (hidden files / dotfiles, no
//                including / with / all) -> find X -mindepth 1 [-maxdepth 1] [-type f|d] -name '.*'; -maxdepth 1
//                unless ls -R or a recursion cue (under / recursively); -type f for files, -type d for dirs.
// Adjudications (train split only; dev/test never): rows the judge called gold-wrong get the judge-approved
// pred IR (gate-accepted) as an ok row, or are dropped when no pred was judged right. Rows with conflicting
// gold verdicts are left alone. Matched by request text (normReq) so a rebuilt v3base still lines up.
// Lint (F10, after rewrites): retired conventions still present are counted and listed in OUT/lint.jsonl.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSchemas, gate, segment } from '../../ir/lib/index.js';
import { unitWord } from '../../ir/lib/units.js';
import { findCues } from '../../ir/lib/lexicon.js';
import { normReq } from './dedup.mjs';
import { hiddenOnlyCue, RECURSE } from '../../ir/lib/strict_hidden.js';
import { ONLY_MATCH_CUE } from '../../ir/lib/compile.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const PLATFORM = { linux: 'linux_gnu', darwin: 'darwin_bsd' };
const clone = (o) => JSON.parse(JSON.stringify(o));
const words = (req) => segment(req).units.map(unitWord);

const RG_CUE = /\b(rg|ripgrep|search|searched|searches|gitignore|\.gitignore|gitignored|ignored|ignore rules|tracked)\b/i;
const MATCH_CUE = /\b(match|matches|matched|matching text|occurrences?|extract|extracted|hits?|tags?|words?|tally|instances?|tokens?|ids?|names?|values?|addresses|codes?|urls?|emails?)\b/i;
const PER_FILE_CUE = /\b(each|per|every|by file|for all files|which files|file by file|individual)\b/i;
const HEADERS_ONLY = /\b(headers? only|only (the )?(response |http )?headers?|just (the )?(response |http )?headers?|no body|without (the )?body|HEAD request|head request)\b/i;
const HEADERS_BODY = /\b(headers? (and|with|plus|\+) (the )?(response )?body|body (and|with|plus) (the )?headers?|headers? too|including (the )?headers?|include (the )?(response )?headers?|with (the )?(response )?headers? (and|in)|headers? included)\b/i;
const HIDDEN_TOO = /\b(including|incl|include|includes|with|plus|and|also|even) (the )?(hidden|dot ?files)|\b(hidden|dot ?files)( ones| files)? (too|as well|included)\b|don'?t skip hidden|do not skip hidden|without skipping hidden/i;
const SCOPE_WORDS = new Set(['repo', 'repository', 'project', 'workspace', 'codebase']);
const SCOPE_DET = new Set(['the', 'this', 'my', 'our', 'current', 'whole', 'entire']);
const SCOPE_BLOCK = new Set(['folder', 'dir', 'directory', 'named', 'called', '/']);
const FILE_NAMES = /^(makefile|dockerfile|license|readme|procfile|gemfile|rakefile|jenkinsfile|vagrantfile|caddyfile|brewfile|containerfile|justfile|cmakelists)$/i;
const DOWNSTREAM_O = new Set(['lines.sort', 'lines.uniq', 'file.head']);

const stagesOf = (ir) => ir?.body?.parts?.flatMap((p) => p.stages) ?? [];
const execOf = (st) => (st.k === 'each' ? st.exec : st);
const hasMod = (ex, m) => (ex.mods || []).some((x) => x.mod === m);
const valText = (seg, v) => (v?.k === 'span' ? seg.units.slice(v.u[0], v.u[1]).map((u) => u.t).join(' ') : null);

// ---------- rules: each takes (ir, ctx) and returns a new IR or null (not applicable) ----------

function filesFind(ir, { request, seg }) {
  let hit = false;
  const out = clone(ir);
  for (const p of out.body.parts) for (const st of p.stages) {
    if (st.k !== 'exec' || st.op !== 'files.list') continue;
    if (RG_CUE.test(request) || findCues(seg).some((c) => c.cls === 'IGNORED')) return null;
    // find lists dotfiles by default: rg --hidden == find only when hidden files are wanted TOO (not hidden-only)
    if ((hasMod(st, 'hidden') || findCues(seg).some((c) => c.cls === 'HIDDEN')) && !HIDDEN_TOO.test(request)) return null;
    const mods = [{ mod: 'type', values: [{ k: 'const', id: 'f' }] }];
    for (const m of st.mods || []) {
      const n = m.values?.length || 0;
      if (m.mod === 'max_depth') mods.push(m);
      else if (m.mod === 'name_glob') { if (n === 1) mods.push(m); else if (n <= 4) mods.push({ ...m, mod: 'any_name' }); else return null; }
      else if (m.mod === 'exclude_glob') {
        // rg -g '!dist' excludes a directory (gitignore semantics): a wildcard-free, extension-less value -> prune
        if (n > 4) return null;
        const dirLike = m.values.every((v) => v.k === 'span' && looksDir(valText(seg, v)));
        mods.push(dirLike ? { mod: 'exclude_dir', values: m.values.map((v) => ({ ...v, as: 'Name' })) } : m);
      } else if (m.mod === 'exclude_dir') { if (n > 4) return null; mods.push(m); }
      else if (m.mod === 'null') mods.push({ mod: 'print0' });
      else if (m.mod === 'hidden') continue;
      else return null; // hidden / no_ignore: rg semantics wanted
    }
    st.op = 'files.find'; st.mods = mods; delete st.pin;
    hit = true;
  }
  return hit ? out : null;
}

function dropO(ir, { request }) {
  // never against compile.js impliedOnlyMatching (it re-adds -o on an only-matching cue; its match cue needs no 'lines')
  if (!/\blines?\b/i.test(request) || MATCH_CUE.test(request) || ONLY_MATCH_CUE.test(request)) return null;
  let hit = false;
  const out = clone(ir);
  for (const p of out.body.parts) p.stages.forEach((st, i) => {
    if (st.k !== 'exec' || st.op !== 'text.search' || !hasMod(st, 'only_matching')) return;
    const nx = p.stages[i + 1];
    if (!nx || !((nx.k === 'macro') || (nx.k === 'exec' && DOWNSTREAM_O.has(nx.op)))) return;
    st.mods = st.mods.filter((m) => m.mod !== 'only_matching');
    hit = true;
  });
  return hit ? out : null;
}

const looksDir = (s) => {
  if (s == null) return false;
  const last = s.replace(/\/+$/, '').split('/').pop();
  if (s.endsWith('/') || last === '.' || last === '..' || last === '~') return true;
  return !/\./.test(last.replace(/^\./, '')) && !FILE_NAMES.test(last) && !/[*?[]/.test(last);
};

function countTotal(ir, { request, seg }) {
  if (PER_FILE_CUE.test(request)) return null;
  const parts = ir.body.parts;
  if (parts.length !== 1 || parts[0].stages.length !== 1) return null;
  const st = parts[0].stages[0];
  if (st.k !== 'exec' || st.op !== 'text.search' || !hasMod(st, 'count')) return null;
  if ((st.mods || []).some((m) => ['count_matches', 'files_with_matches', 'files_without_match', 'only_matching', 'max_count'].includes(m.mod))) return null;
  const paths = st.args?.paths || [];
  if (!paths.every((v) => looksDir(valText(seg, v)))) return null;
  const out = clone(ir);
  const s0 = out.body.parts[0].stages[0];
  s0.mods = s0.mods.filter((m) => m.mod !== 'count');
  out.body.parts[0].stages.push({ k: 'exec', op: 'file.count', mods: [{ mod: 'lines' }], args: {} });
  return out;
}

function curlHead(ir, { request }) {
  let hit = false;
  const out = clone(ir);
  for (const st of stagesOf(out)) {
    if (st.k !== 'exec') continue;
    if (st.op === 'http.get' && hasMod(st, 'include_headers') && HEADERS_ONLY.test(request) && !HEADERS_BODY.test(request)) {
      st.op = 'http.head'; st.mods = st.mods.filter((m) => m.mod !== 'include_headers'); hit = true;
    } else if (st.op === 'http.head' && HEADERS_BODY.test(request) && !HEADERS_ONLY.test(request)) {
      st.op = 'http.get'; st.mods = [...st.mods, { mod: 'include_headers' }]; hit = true;
    }
  }
  return hit ? out : null;
}

function scopePath(ir, { seg }) {
  const w = seg.units.map(unitWord);
  let hit = false;
  const out = clone(ir);
  for (const st0 of stagesOf(out)) {
    const st = execOf(st0);
    const ps = st.args?.paths;
    if (!ps) continue;
    const keep = ps.filter((v) => {
      if (v.k !== 'span' || v.u[1] - v.u[0] !== 1) return true;
      const i = v.u[0];
      if (!SCOPE_WORDS.has(w[i]) || !SCOPE_DET.has(w[i - 1]) || SCOPE_BLOCK.has(w[i + 1])) return true;
      return false;
    });
    if (keep.length === ps.length) continue;
    hit = true;
    if (keep.length) st.args.paths = keep; else delete st.args.paths;
  }
  return hit ? out : null;
}

const HIDDEN_LS_MODS = new Set(['hidden', 'one_per_line', 'recursive']);
const HID_DIR_NOUN = new Set(['dirs', 'dir', 'directories', 'directory', 'folders', 'folder', 'subdirectories', 'subdirs', 'subfolders', 'dotdirs']);
const HID_FILE_NOUN = new Set(['files', 'file', 'dotfiles', 'dotfile', 'filenames']);
// the noun the hidden cue names ("hidden files", "dot dirs", "dotfiles"): f / d / null (entries, ones, items)
const hiddenNounType = (ws) => {
  for (const [i, w] of ws.entries()) {
    const n = ['hidden', 'dot'].includes(w) ? ws[i + 1] : w;
    if (HID_FILE_NOUN.has(n) && (n.startsWith('dot') || ['hidden', 'dot'].includes(w))) return 'f';
    if (HID_DIR_NOUN.has(n) && (n.startsWith('dot') || ['hidden', 'dot'].includes(w))) return 'd';
  }
  return null;
};
const phraseIn = (ws, ph) => { const p = ph.split(' '); return ws.some((_, i) => p.every((x, k) => ws[i + k] === x)); };

function hiddenOnly(ir, { request, seg }) {
  const ws = words(request);
  if (!hiddenOnlyCue(ws, (list) => list.find((ph) => phraseIn(ws, ph)))) return null;
  if (ir.body.parts.length !== 1) return null;
  const st = ir.body.parts[0].stages[0];
  if (st.k !== 'exec' || !hasMod(st, 'hidden')) return null;
  if (st.op === 'dir.list' ? !st.mods.every((m) => HIDDEN_LS_MODS.has(m.mod)) : st.op !== 'files.list' || st.mods.length !== 1) return null;
  const type = hiddenNounType(ws);
  const recursive = hasMod(st, 'recursive') || RECURSE.some((ph) => phraseIn(ws, ph));
  const c = (id) => [{ k: 'const', id }];
  const mods = [{ mod: 'min_depth', values: c('1') }];
  if (!recursive) mods.push({ mod: 'max_depth', values: c('1') });
  if (type) mods.push({ mod: 'type', values: c(type) });
  mods.push({ mod: 'name_glob', values: c('.*') });
  const out = clone(ir);
  const ex = { k: 'exec', op: 'files.find', mods, args: st.args?.paths?.length ? { paths: st.args.paths } : {} };
  if (st.stderr) ex.stderr = st.stderr;
  out.body.parts[0].stages[0] = ex;
  void seg;
  return out;
}

export const RULES = { files_find: filesFind, drop_o: dropO, count_total: countTotal, curl_head: curlHead, scope_path: scopePath, hidden_only: hiddenOnly };

// ---------- lint (F10): retired conventions left in an ok row ----------
export function lint(row) {
  if (row.label !== 'ok' || !row.ir) return [];
  const out = [], req = row.request, sts = stagesOf(row.ir).map(execOf);
  if (sts.some((s) => s.op === 'files.list') && !RG_CUE.test(req)) out.push(/\b(hidden|dot ?files)\b/i.test(req) && !HIDDEN_TOO.test(req) ? 'rg_files_hidden_only' : 'rg_files_cueless');
  sts.forEach((s, i) => {
    if (s.op === 'text.search' && hasMod(s, 'only_matching') && i + 1 < sts.length && /\blines?\b/i.test(req) && !MATCH_CUE.test(req)) out.push('o_in_line_pipeline');
  });
  if (/^git log\b(?![^|]*(--oneline|--format|--pretty))[^|]*\| head\b/.test(row.command || '')) out.push('git_log_multiline_head');
  if (/^curl\b.* -I\b/.test(row.command || '') && HEADERS_BODY.test(req)) out.push('curl_I_with_body_cue');
  if (/^curl\b.* -i\b/.test(row.command || '') && HEADERS_ONLY.test(req)) out.push('curl_i_headers_only_cue');
  if (/\b(the|this|my|our) (repo|project|workspace)\b/i.test(req) && / (repo|project|workspace)( |$)/.test(row.command || '')) out.push('scope_word_path');
  return out;
}

// Apply every rule in order; each accepted rewrite becomes the base for the next. Returns {row, applied, rejected}.
export function rewriteRow(row, schemas) {
  if (row.label !== 'ok' || !row.ir) return { row, applied: [], rejected: [] };
  const env = { schemas, shell: 'bash', platform: PLATFORM[row.os] || 'linux_gnu', request: row.request };
  const ctx = { request: row.request, seg: segment(row.request) };
  let cur = row;
  const applied = [], rejected = [];
  for (const [name, rule] of Object.entries(RULES)) {
    const ir = rule(cur.ir, ctx);
    if (!ir) continue;
    const g = gate(row.request, ir, env);
    if (!g.accept) { rejected.push(name); continue; }
    applied.push(name);
    cur = { ...cur, ir, command: g.command, reasons: [...(cur.reasons || []), `rewrite:${name}`] };
  }
  return { row: cur, applied, rejected };
}

// ---------- adjudication overlay (train only) ----------
// Returns Map normReq -> {action: 'replace', ir, command} | {action: 'drop'}.
export function adjudicationPlan(adjRows, kfoldRows, schemas) {
  const preds = new Map();
  for (const k of kfoldRows) if (k.pred_ir) preds.set(`${k.src_id}\u0000${k.pred_command}`, k);
  const byId = new Map();
  for (const a of adjRows) {
    if (!String(a.id).startsWith('train:') || typeof a.gold_correct !== 'boolean') continue;
    (byId.get(a.id) || byId.set(a.id, []).get(a.id)).push(a);
  }
  const plan = new Map(), n = { ids: byId.size, gold_ok: 0, conflict: 0, replace: 0, drop: 0, pred_rejected: 0 };
  for (const [id, as] of byId) {
    const gc = new Set(as.map((a) => a.gold_correct));
    if (gc.size > 1) { n.conflict++; continue; }
    if (gc.has(true)) { n.gold_ok++; continue; }
    const req = as[0].request;
    let rep = null;
    for (const a of as.filter((x) => x.pred_correct === true)) {
      const k = preds.get(`${id}\u0000${a.command}`);
      if (!k) continue;
      const env = { schemas, shell: 'bash', platform: PLATFORM[k.os] || 'linux_gnu', request: req };
      const g = gate(req, k.pred_ir, env);
      if (g.accept && g.command === a.command) { rep = { action: 'replace', ir: k.pred_ir, command: g.command, old: as[0].goldLabel }; break; }
      n.pred_rejected++;
    }
    if (rep) { n.replace++; plan.set(normReq(req), rep); } else { n.drop++; plan.set(normReq(req), { action: 'drop', old: as[0].goldLabel }); }
  }
  return { plan, stats: n };
}

// ---------- CLI ----------
const readLines = (f) => fs.readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const bump = (m, k) => { m[k] = (m[k] || 0) + 1; };

function main() {
  const args = process.argv.slice(2);
  const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
  const IN = opt('in'), OUT = opt('out'), ADJ = opt('adj'), KF = opt('kfold');
  if (!IN || !OUT) { console.error('usage: gold_rewrite.mjs --in DIR --out DIR [--adj A.jsonl[,A2...] --kfold K.jsonl[,K2...]]'); process.exit(2); }
  const inDir = path.resolve(ROOT, IN), outDir = path.resolve(ROOT, OUT);
  fs.mkdirSync(outDir, { recursive: true });
  const schemas = loadSchemas();
  // --adj A1,A2 --kfold K1,K2: pairs (each adjudication file with the k-fold preds it judged; ids are per pair); plans are
  // merged by request text, a later pair overriding an earlier one
  let adj = null;
  if (ADJ) {
    const as = ADJ.split(','), ks = (KF || '').split(',');
    if (as.length !== ks.length) { console.error('--adj and --kfold need the same number of files'); process.exit(2); }
    for (let i = 0; i < as.length; i++) {
      const p = adjudicationPlan(readLines(path.resolve(ROOT, as[i])), readLines(path.resolve(ROOT, ks[i])), schemas);
      if (!adj) adj = { plan: new Map(), stats: { pairs: [] } };
      for (const [k, v] of p.plan) adj.plan.set(k, v);
      adj.stats.pairs.push({ adj: as[i], ...p.stats });
    }
  }
  const stats = { in: IN, adjudication: adj?.stats ?? null, splits: {} };
  const lintRows = [];
  for (const split of ['train', 'dev', 'test']) {
    const s = { rows_in: 0, rows_out: 0, applied: {}, gate_rejected: {}, adj_replaced: {}, adj_dropped: {}, adj_unmatched: 0, lint: {}, label_in: {}, label_out: {} };
    const used = new Set();
    const out = [];
    for (let row of readLines(path.join(inDir, `${split}.jsonl`))) {
      s.rows_in++; bump(s.label_in, row.label);
      if (split === 'train' && adj) {
        const key = normReq(row.request), a = adj.plan.get(key);
        if (a) {
          used.add(key);
          if (a.action === 'drop') { bump(s.adj_dropped, a.old); continue; }
          bump(s.adj_replaced, `${row.label}->ok`);
          row = { ...row, label: 'ok', ir: a.ir, command: a.command, status: 'accepted', reasons: ['adjudicated'] };
        }
      }
      const r = rewriteRow(row, schemas);
      r.applied.forEach((x) => bump(s.applied, x));
      r.rejected.forEach((x) => bump(s.gate_rejected, x));
      for (const l of lint(r.row)) { bump(s.lint, l); lintRows.push({ split, i: out.length, lint: l, request: r.row.request, command: r.row.command }); }
      out.push(r.row); bump(s.label_out, r.row.label);
    }
    if (split === 'train' && adj) s.adj_unmatched = adj.plan.size - used.size;
    s.rows_out = out.length;
    fs.writeFileSync(path.join(outDir, `${split}.jsonl`), out.map((r) => JSON.stringify(r)).join('\n') + '\n');
    stats.splits[split] = s;
  }
  fs.writeFileSync(path.join(outDir, 'lint.jsonl'), lintRows.map((r) => JSON.stringify(r)).join('\n') + (lintRows.length ? '\n' : ''));
  const base = path.join(inDir, 'stats.json');
  const prev = fs.existsSync(base) ? JSON.parse(fs.readFileSync(base, 'utf8')) : {};
  fs.writeFileSync(path.join(outDir, 'stats.json'), JSON.stringify({ ...prev, gold_rewrite: stats }, null, 1) + '\n');
  console.log(JSON.stringify(stats));
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
