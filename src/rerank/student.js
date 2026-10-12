// Distilled student encoder (3-layer, ~14 MB int4/int8 ONNX, trained from a LoRA-tuned teacher's labels): an optional
// fallback for the linear cascade. Same runtime as the B encoder (src/rerank/encoder.js), but its own bundle, looked up
// in $TELLSH_STUDENT_DIR, ~/.cache/tellsh/stu-v1, the `tellsh-model-student` package, or hybrid/models/student
// (development). No network; nothing is loaded until the cascade asks for help.
import { existsSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
export const STUDENT_BUNDLE = 'stu-v1';
const ok = (d) => !!d && existsSync(join(d, 'encoder.int8.onnx')) && existsSync(join(d, 'vocab.json')) && existsSync(join(d, 'labels.json'));

/** First complete student bundle, or null. Cheap (stat calls only): used to skip the runtime import when absent. */
export function findStudentDir(explicit) {
  const cands = [explicit, process.env.TELLSH_STUDENT_DIR, join(homedir(), '.cache', 'tellsh', STUDENT_BUNDLE)];
  try { cands.push(join(require.resolve('tellsh-model-student/package.json'), '..')); } catch { /* not installed */ }
  cands.push(fileURLToPath(new URL('../../hybrid/models/student', import.meta.url)));
  return cands.find(ok) || null;
}

/** Load the student; null when the bundle or onnxruntime is unavailable or the model cannot be opened. */
export async function loadStudent({ dir, threads = 1 } = {}) {
  const d = findStudentDir(dir);
  if (!d) return null;
  try {
    const { Encoder } = await import('./encoder.js');
    const enc = await Encoder.load({ dir: d, threads });
    // Encoder.load falls back to the B bundle when a directory is incomplete: accept only the student bundle itself
    if (!enc || realpathSync(enc.dir) !== realpathSync(d)) return null;
    return enc;
  } catch {
    return null;
  }
}
