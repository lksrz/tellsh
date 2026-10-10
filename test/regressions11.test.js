// Regression tests for round 10: the round-9 findings (review/r9-codex.md). `wrangler dev` runs the project's build
// command, so it is not safe (never auto-run with --yes); attached short-option values (`git -C/repo`,
// `docker -Htcp://…`) scope a history command like the separate form; a wrapper that changes the working directory
// (`env -C`, `sudo -D`) or the root (`chroot`) keeps that scope; the hybrid export drops train rows equal to a dev
// text and A_dev excludes the complete exported dev split.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { suggest } from '../src/pipeline.js';
import { BY_ID } from '../src/catalog.js';
import { analyzeCommand, isAmbiguous } from '../src/history.js';
import { normalize } from '../src/features.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, history) => suggest(q, { env: BASH, ...(history ? { history } : {}) });
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BIN = join(ROOT, 'bin', 'tellsh.js');
const refused = (r, ph, why) => {
  assert.equal(r.context.rule, 'refused', `${why}: ${JSON.stringify(r.context)} -> ${r.command}`);
  assert.ok(r.command == null || r.command.includes(ph), `${why}: ${r.command}`);
};

test('major: wrangler dev runs project build commands: medium risk, never auto-run with --yes', () => {
  assert.equal(BY_ID.wrangler_dev.risk, 'medium');
  assert.equal(BY_ID.wrangler_dev.risk, BY_ID.npm_run_script.risk);
  const r = run('start wrangler dev');
  assert.equal(r.intent, 'wrangler_dev');
  assert.notEqual(r.risk, 'safe');
  // nothing can run even if the gate regressed: no npx on PATH
  const c = spawnSync(process.execPath, [BIN, '--yes', '--shell', 'bash', '--os', 'linux', 'start', 'wrangler', 'dev'],
    { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1', PATH: '/nonexistent' } });
  assert.equal(c.status, 4, c.stdout + c.stderr);
  assert.match(c.stdout, /only auto-runs safe/);
});

test('major: attached short-option values scope a history command like the separate form', () => {
  refused(run('delete it', ['git -C/repo blame notes.txt']), '<FILE>', 'git -C/repo');
  refused(run('stop it', ['docker -Htcp://prod:2375 logs web']), '<CONTAINER>', 'docker -Htcp://');
  refused(run('stop it', ['docker -cprod logs web']), '<CONTAINER>', 'docker -cprod');
  refused(run('stop it', ['docker --host=tcp://prod:2375 logs web']), '<CONTAINER>', 'docker --host=');
  for (const h of ['git -C/repo blame notes.txt', 'docker -Htcp://prod:2375 logs web']) {
    const a = analyzeCommand(h);
    assert.ok(a.scoped, h);
    assert.ok(Object.values(a.ents).every((v) => v == null || isAmbiguous(v)), `${h}: ${JSON.stringify(a.ents)}`);
    for (const q of ['do it again', 'show it']) {
      const r = run(q, [h]);
      assert.ok(r.command == null || r.command.includes('<'), `${q} after ${h}: ${r.command}`);
    }
  }
  // git -c (config) is not a scope, attached or not; neither is a plain docker flag
  assert.equal(run('delete it', ['git -ccolor.ui=false blame notes.txt']).command, 'rm notes.txt');
  assert.equal(run('delete it', ['git -c color.ui=false blame notes.txt']).command, 'rm notes.txt');
  assert.equal(run('stop it', ['docker -D logs web']).command, 'docker stop web');
});

test('major: a wrapper that changes the working directory or root keeps that scope', () => {
  for (const h of ['env -C /repo cat notes.txt', 'sudo -D /repo cat notes.txt', 'env --chdir=/repo cat notes.txt', 'env -C/repo cat notes.txt',
    'sudo -D/repo cat notes.txt', 'sudo --chdir /repo cat notes.txt', 'sudo -u root -D /repo cat notes.txt', 'env -i -C /repo cat notes.txt',
    'nice -n 5 env -C /repo cat notes.txt', 'unshare --wd=/repo cat notes.txt', 'systemd-run --working-directory=/repo cat notes.txt']) {
    for (const q of ['delete it', 'show it']) refused(run(q, [h]), '<FILE>', `${q} after ${h}`);
  }
  // an absolute path names the same file from any directory
  assert.equal(run('delete it', ['env -C /repo cat /tmp/abs.txt']).command, 'rm /tmp/abs.txt');
  // another root: every path names something else
  for (const h of ['chroot /srv cat /etc/x', 'sudo chroot /srv cat notes.txt', 'unshare -R /srv cat /etc/x', 'nsenter --root=/srv cat /etc/x']) {
    refused(run('delete it', [h]), '<FILE>', h);
  }
  // wrappers that keep the directory change nothing
  for (const h of ['sudo -u root cat notes.txt', 'nice -n 5 cat notes.txt', 'env FOO=1 cat notes.txt', 'env -i cat notes.txt', 'doas -C /etc/doas.conf cat notes.txt']) {
    assert.equal(run('delete it', [h]).command, 'rm notes.txt', h);
  }
});

test('minor: hybrid export drops train rows equal to a dev text; A_dev excludes the complete dev split', () => {
  const ex = readFileSync(join(ROOT, 'scripts/hybrid/export_data.js'), 'utf8');
  assert.ok(ex.includes("r.split === 'dev' || !devTexts.has(normalize(r.text))"));
  assert.ok(ex.includes("'dev_texts.json'"));
  const sh = readFileSync(join(ROOT, 'scripts/hybrid/train_a_dev.sh'), 'utf8');
  assert.ok(sh.includes("grep -q '_devIndex.has(normalize(t))'"));
  // the rewritten import line parses and uses the dev index
  const sed = spawnSync('sh', ['-c', `DEV_TEXTS=/x.json; sed -n -e "s#^import { ctxFeatures } from '../src/history.js';#&\\nconst _devIndex = new Set(JSON.parse(readFileSync('$DEV_TEXTS', 'utf8')));#p" "${join(ROOT, 'scripts/gen_data.js')}"`], { encoding: 'utf8' });
  assert.match(sed.stdout, /const _devIndex = new Set\(JSON\.parse\(readFileSync\('\/x\.json', 'utf8'\)\)\);/);
  // when the export exists, no train row has a dev text
  const p = join(ROOT, 'build/hybrid/train.jsonl');
  let rows;
  try { rows = readFileSync(p, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)); } catch { return; }
  const dev = new Set(rows.filter((r) => r.split === 'dev').map((r) => normalize(r.text)));
  assert.equal(rows.filter((r) => r.split === 'train' && dev.has(normalize(r.text))).length, 0);
});
