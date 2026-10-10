#!/usr/bin/env node
// One cold query as the CLI would run it (new process): node startup + model load + pipeline, + for hybrid systems
// the encoder bundle and onnxruntime are loaded lazily ONLY if the cascade defers.
//   node scripts/hybrid/cold_query.js <A|A+B|B> <query>
import { suggestHybrid } from '../../src/rerank/hybrid.js';

const [system, ...q] = process.argv.slice(2);
const query = q.join(' ');
let encoder = null;
const lazy = { infer: async (t, env) => { if (!encoder) { const { Encoder } = await import('../../src/rerank/encoder.js'); encoder = await Encoder.load({ threads: 1 }); } return encoder.infer(t, env); } };
const r = await suggestHybrid(query, { system, shell: 'bash', os: 'linux', compose: 'off', encoder: lazy });
process.stdout.write(JSON.stringify({ intent: r.intent, command: r.command, deferred: r.hybrid?.deferred }) + '\n');
