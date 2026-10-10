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
// the manifest comes from the same place as the files, so its names are not trusted: exactly the bundle's own file
// names (never `../../.bashrc` or an absolute path), each with a sha256
const names = Object.keys(manifest?.files || {});
if (names.length !== FILES.length || !FILES.every((f) => names.includes(f)) ||
    !FILES.every((f) => /^[0-9a-f]{64}$/.test(String(manifest.files[f])))) {
  console.error(`fetch_model: manifest.json must list exactly ${FILES.join(', ')} with sha256 checksums (got: ${names.join(', ') || 'none'})`);
  process.exit(1);
}
// everything is downloaded and verified before anything is written
const bufs = {};
for (const f of FILES) {
  bufs[f] = await get(f);
  if (sha(bufs[f]) !== manifest.files[f]) throw new Error(`${f}: sha256 mismatch`);
}
mkdirSync(dest, { recursive: true });
for (const f of FILES) {
  writeFileSync(join(dest, f + '.part'), bufs[f]);
  renameSync(join(dest, f + '.part'), join(dest, f));
}
writeFileSync(join(dest, 'manifest.json'), JSON.stringify({ bundle: manifest.bundle, files: Object.fromEntries(FILES.map((f) => [f, manifest.files[f]])) }, null, 1));
console.log(`installed ${BUNDLE} -> ${dest} (${readdirSync(dest).join(', ')})`);
