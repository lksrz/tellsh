#!/usr/bin/env node
import { main } from '../src/cli.js';

// `tellsh … | head -1`: a closed pipe is not an error
for (const s of [process.stdout, process.stderr]) s.on('error', (e) => { if (e.code === 'EPIPE') process.exit(process.exitCode ?? 0); throw e; });

main().then((code) => { process.exitCode = code; }, (err) => {
  console.error(`tellsh: ${err?.stack || err}`);
  process.exitCode = 1;
});
