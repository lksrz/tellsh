// scripts/train.py must never overwrite a shipped model under model/ unless --replace-shipped is passed.
// Every call uses --check-out (the guard only, never a training run), so a guard regression cannot train over model/.
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, symlinkSync, linkSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const hasDeps = spawnSync('python3', ['-c', 'import numpy, scipy, sklearn'], { encoding: 'utf8' }).status === 0;
const guard = (...a) => spawnSync('python3', ['scripts/train.py', '--check-out', ...a], { cwd: ROOT, encoding: 'utf8' });

test('train.py refuses to overwrite a shipped model (path, symlink, hard link)', { skip: !hasDeps && 'python3 with numpy/scipy/sklearn not available' }, () => {
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-guard-'));
  try {
    symlinkSync(join(ROOT, 'model/model.bin'), join(dir, 'sym.bin'));
    const outs = [[], ['--out', 'model/model.bin'], ['--out', 'model/model_templates.bin'], ['--out', join(dir, 'sym.bin')]];
    // a hard link needs the same file system: the repo's build/ directory
    mkdirSync(join(ROOT, 'build'), { recursive: true });
    const hard = join(ROOT, 'build', `guard-hard-${process.pid}.bin`);
    try { linkSync(join(ROOT, 'model/model.bin'), hard); outs.push(['--out', hard]); } catch { /* no hard links here */ }
    try {
      for (const out of outs) {
        const r = guard(...out);
        assert.notEqual(r.status, 0, out.join(' '));
        assert.match(r.stderr, /refusing to overwrite the shipped model\//);
      }
    } finally { rmSync(hard, { force: true }); }
    // a new file, or an existing shipped one with --replace-shipped, passes the guard
    assert.equal(guard('--out', join(dir, 'new.bin')).status, 0);
    assert.equal(guard('--replace-shipped').status, 0);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('npm run train writes to build/ and never runs build_triggers (it rewrites shipped model/*.json)', () => {
  const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
  assert.match(pkg.scripts.train, /train\.py --out build\/model\.bin/);
  assert.doesNotMatch(pkg.scripts.train, /build_triggers/);
});
