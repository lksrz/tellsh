// Private-data writer: the target must resolve inside <repo>/build/ (or outside the repo) and neither the file nor any
// directory between the repo root and it may be a symlink, so private text can never land in a tracked path.
import { writeFileSync, lstatSync, realpathSync, renameSync, unlinkSync, existsSync } from 'node:fs';
import { resolve, relative, sep, dirname, isAbsolute, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

// lstat without existsSync: a dangling symlink must count as a symlink (only ENOENT means missing)
export const isLink = (p) => { try { return lstatSync(p).isSymbolicLink(); } catch (e) { if (e.code === 'ENOENT') return false; throw e; } };

const ROOT = realpathSync(fileURLToPath(new URL('../..', import.meta.url)));

// resolve through the deepest existing ancestor, so a symlinked directory outside the repo cannot point back into it
function realTarget(p) {
  let q = p; const tail = [];
  for (;;) { try { lstatSync(q); break; } catch (e) { if (e.code !== 'ENOENT') throw e; tail.unshift(q.slice(dirname(q).length + 1)); q = dirname(q); } }
  return resolve(realpathSync(q), ...tail);
}

/** Check a private output path (same rules as writePrivate) and remove an existing file, so a stream opened with
 * flags 'wx' afterwards creates a fresh inode (never writes through a symlink or hard link). Returns the path. */
export function preparePrivate(path) {
  checkPrivate(path);
  try { unlinkSync(resolve(path)); } catch (e) { if (e.code !== 'ENOENT') throw e; }
  return resolve(path);
}

function checkPrivate(path) {
  const abs = resolve(path);
  if (isLink(abs)) throw new Error(`writePrivate: refusing symlink ${abs}`);
  const real = realTarget(dirname(abs));
  const relReal = relative(ROOT, real);
  if (!(relReal === '..' || relReal.startsWith('..' + sep) || isAbsolute(relReal)) && !(relReal === 'build' || relReal.startsWith('build' + sep))) throw new Error(`writePrivate: ${path} resolves into the repo outside build/`);
  const rel = relative(ROOT, abs);
  const outside = rel === '..' || rel.startsWith('..' + sep) || isAbsolute(rel);
  if (!outside) {
    if (!(rel.startsWith('build' + sep))) throw new Error(`writePrivate: ${path} is inside the repo but not under build/`);
    for (let p = abs; p !== ROOT && p.length > ROOT.length; p = dirname(p)) {
      if (isLink(p)) throw new Error(`writePrivate: refusing symlink ${p}`);
    }
  } else if (isLink(abs)) throw new Error(`writePrivate: refusing symlink ${abs}`);
  // every enclosing git checkout (this one, a sibling worktree, a nested repo) must see the target under its build/
  for (let d = real; ; d = dirname(d)) {
    if (existsSync(join(d, '.git'))) {
      const r = relative(d, join(real, basename(abs)));
      if (!(r.startsWith('build' + sep))) throw new Error(`writePrivate: ${path} is inside the git checkout ${d} but not under its build/`);
    }
    if (dirname(d) === d) break;
  }
  return abs;
}

export function writePrivate(path, data, opts) {
  const abs = checkPrivate(path);
  // atomic replace: a new inode, so an existing hard link to the old file never receives the data
  const tmp = `${abs}.tmp-${process.pid}`;
  writeFileSync(tmp, data, { ...(typeof opts === 'object' ? opts : {}), flag: 'wx' });
  renameSync(tmp, abs);
}
