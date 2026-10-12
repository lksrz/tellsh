// Private-data writer: the target must resolve inside <repo>/build/ (or outside the repo) and neither the file nor any
// directory between the repo root and it may be a symlink, so private text can never land in a tracked path.
import { writeFileSync, lstatSync, realpathSync, existsSync } from 'node:fs';
import { resolve, relative, sep, dirname, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = realpathSync(fileURLToPath(new URL('../..', import.meta.url)));

export function writePrivate(path, data, opts) {
  const abs = resolve(path);
  const rel = relative(ROOT, abs);
  const outside = rel === '..' || rel.startsWith('..' + sep) || isAbsolute(rel);
  if (!outside) {
    if (!(rel.startsWith('build' + sep))) throw new Error(`writePrivate: ${path} is inside the repo but not under build/`);
    for (let p = abs; p !== ROOT && p.length > ROOT.length; p = dirname(p)) {
      if (existsSync(p) && lstatSync(p).isSymbolicLink()) throw new Error(`writePrivate: refusing symlink ${p}`);
    }
  } else if (existsSync(abs) && lstatSync(abs).isSymbolicLink()) throw new Error(`writePrivate: refusing symlink ${abs}`);
  writeFileSync(abs, data, opts);
}
