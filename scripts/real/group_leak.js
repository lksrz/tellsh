#!/usr/bin/env node
// How much the v04 command-group split leaks across train / eval: labelled eval rows whose structural skeleton
// (scripts/real/group.js, operands masked) also occurs in the train split, and model A's intent accuracy (cascade top-1)
// on the leaked and the clean rows. Reads the PRIVATE build/real/rows.jsonl; prints aggregate counts only.
//   node scripts/real/group_leak.js
import { fileURLToPath } from 'node:url';
import { readReal } from './real_rows.js';
import { group } from './group.js';
import { cascade } from '../../src/cascade.js';
import { envFeatures } from '../../src/env.js';

const rows = readReal(fileURLToPath(new URL('../..', import.meta.url)));
if (!rows.length) { console.error('group_leak: no build/real/rows.jsonl'); process.exit(1); }
const train = new Set(rows.filter((r) => r.split === 'train').map((r) => group(r.cmd, 'structural')));
const ev = rows.filter((r) => r.split === 'eval' && r.intent);
const leaked = ev.filter((r) => train.has(group(r.cmd, 'structural')));
const clean = ev.filter((r) => !train.has(group(r.cmd, 'structural')));
const acc = (rs) => {
  const ok = rs.filter((r) => cascade(r.text, { extras: envFeatures({ shell: r.shell, os: r.os }) }).intent === r.intent).length;
  return { n: rs.length, ok, pct: +(100 * ok / (rs.length || 1)).toFixed(1) };
};
console.log(JSON.stringify({ evalLabelled: ev.length, leaked: leaked.length, A: { all: acc(ev), leaked: acc(leaked), clean: acc(clean) } }, null, 1));
