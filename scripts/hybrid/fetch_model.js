#!/usr/bin/env node
// Install the hybrid encoder bundle once into ~/.cache/tellsh/enc-v2 (afterwards tellsh works fully offline).
//   node scripts/hybrid/fetch_model.js --from <dir>          copy a local bundle (e.g. hybrid/models/enc)
//   node scripts/hybrid/fetch_model.js --from <https-url>    download <url>/manifest.json and the files it lists
// Every file is verified against manifest.json (sha256). Write a manifest for a bundle:  --manifest <dir>
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync, readdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { BUNDLE } from '../../src/rerank/encoder.js';

const argv = process.argv.slice(2);
const opt = (k) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : null; };
const sha = (buf) => createHash('sha256').update(buf).digest('hex');
const FILES = ['encoder.int8.onnx', 'vocab.json', 'labels.json'];

if (opt('manifest')) {
  const d = opt('manifest');
  const files = Object.fromEntries(FILES.map((f) => [f, sha(readFileSync(join(d, f)))]));
  writeFileSync(join(d, 'manifest.json'), JSON.stringify({ bundle: BUNDLE, files }, null, 1));
  console.log(`wrote ${join(d, 'manifest.json')}`);
  process.exit(0);
}
const from = opt('from');
if (!from) { console.error('usage: fetch_model.js --from <dir|https-url> | --manifest <dir>'); process.exit(2); }
const dest = opt('to') || join(homedir(), '.cache', 'tellsh', BUNDLE);
const get = async (name) => {
  if (/^https:\/\//.test(from)) {
    const r = await fetch(`${from.replace(/\/$/, '')}/${name}`);
    if (!r.ok) throw new Error(`${name}: HTTP ${r.status}`);
    return Buffer.from(await r.arrayBuffer());
  }
  return readFileSync(join(from, name));
};
const manifest = JSON.parse((await get('manifest.json')).toString('utf8'));
mkdirSync(dest, { recursive: true });
for (const [f, want] of Object.entries(manifest.files)) {
  const buf = await get(f);
  if (sha(buf) !== want) throw new Error(`${f}: sha256 mismatch`);
  writeFileSync(join(dest, f + '.part'), buf);
  renameSync(join(dest, f + '.part'), join(dest, f));
}
writeFileSync(join(dest, 'manifest.json'), JSON.stringify(manifest, null, 1));
console.log(`installed ${BUNDLE} -> ${dest} (${readdirSync(dest).join(', ')})`);
