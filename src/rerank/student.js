// Distilled student encoder (3-layer, trained from a LoRA-tuned teacher's labels): the fallback for the linear
// cascade, run by the pure-JS runtime in src/rerank/student-js.js (no onnxruntime). Its bundle (student.bin,
// vocab.json, labels.json, ~17 MB) is looked up in $TELLSH_STUDENT_DIR, ~/.cache/tellsh/stu-v2, the
// `tellsh-model-student` package (>= 0.2; the ONNX-only 0.1 package counts as missing), or hybrid/models/student
// (development). No network; nothing is loaded until the cascade asks for help.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
export const STUDENT_BUNDLE = 'stu-v2'; // stu-v1 was the ONNX bundle (tellsh 0.3.5)
export const STUDENT_FILES = ['student.bin', 'vocab.json', 'labels.json'];
const ok = (d) => !!d && STUDENT_FILES.every((f) => existsSync(join(d, f)));

/** First complete student bundle, or null. Cheap (stat calls only): used to skip the runtime import when absent. */
export function findStudentDir(explicit) {
  const cands = [explicit, process.env.TELLSH_STUDENT_DIR, join(homedir(), '.cache', 'tellsh', STUDENT_BUNDLE)];
  try { cands.push(join(require.resolve('tellsh-model-student/package.json'), '..')); } catch { /* not installed */ }
  cands.push(fileURLToPath(new URL('../../hybrid/models/student', import.meta.url)));
  return cands.find(ok) || null;
}

/** Load the student (pure JS); null when no bundle is found or it cannot be read. `threads` is ignored (1 thread). */
export async function loadStudent({ dir } = {}) {
  const d = findStudentDir(dir);
  if (!d) return null;
  try {
    const { StudentJS } = await import('./student-js.js');
    return StudentJS.load(d);
  } catch {
    return null;
  }
}
