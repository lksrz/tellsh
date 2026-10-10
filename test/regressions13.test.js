// Regression tests for round 12: the round-11 findings (review/r11-claude.md, review/r11-codex.md). `pkexec` always
// runs the command in the target user's home and `run0 --chdir=… / --user=…` in another directory, so relative history
// values keep that scope; a redirection inside a `( … )` subshell after a `cd` opened its file in that directory, not
// here; an explicit encoder rejection (high pNone) stays a rejection, the composer never answers in its place.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
import { analyzeCommand, isAmbiguous } from '../src/history.js';
import { suggestHybrid, rerank, POLICY } from '../src/rerank/hybrid.js';
import { NONE } from '../src/tools.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q, history) => suggest(q, { env: BASH, ...(history ? { history } : {}) });
const refused = (r, ph, why) => {
  assert.equal(r.context.rule, 'refused', `${why}: ${JSON.stringify(r.context)} -> ${r.command}`);
  assert.ok(r.command == null || r.command.includes(ph), `${why}: ${r.command}`);
};

test('major: pkexec and run0 --chdir / --user run elsewhere: relative history values are ambiguous', () => {
  for (const h of ['pkexec cat notes.txt', 'pkexec --user bob cat notes.txt', 'pkexec --disable-internal-agent cat notes.txt',
    'nohup pkexec cat notes.txt', 'run0 --chdir=/srv cat notes.txt', 'run0 -D /srv cat notes.txt', 'run0 -D/srv cat notes.txt',
    'run0 --user=bob cat notes.txt', 'run0 -u bob cat notes.txt', 'run0 --chdir /srv cat notes.txt', 'run0 --nice=5 --user=bob cat notes.txt']) {
    refused(run('delete it', [h]), '<FILE>', h);
    const r = run('show it', [h]);
    assert.ok(r.command == null || r.command.includes('<'), `show it after ${h}: ${r.command}`);
    const a = analyzeCommand(h);
    assert.ok(a.ents.file == null || isAmbiguous(a.ents.file), `${h}: ${JSON.stringify(a.ents)}`);
  }
  // an absolute path names the same file from any directory
  assert.equal(run('delete it', ['pkexec cat /tmp/abs.txt']).command, 'rm /tmp/abs.txt');
  assert.equal(run('delete it', ['run0 --chdir=/srv cat /tmp/abs.txt']).command, 'rm /tmp/abs.txt');
  // run0 as root without --chdir keeps the directory
  assert.equal(run('delete it', ['run0 cat notes.txt']).command, 'rm notes.txt');
  assert.equal(run('delete it', ['run0 --nice=5 cat notes.txt']).command, 'rm notes.txt');
});

test('major: a redirection inside a ( … ) subshell after a cd names a file in that directory', () => {
  for (const h of ['(cd /repo && echo hi > notes.txt)', '(cd /repo; echo hi >> notes.txt)', '(cd /repo && sort a.txt > notes.txt)',
    '(pushd /repo && echo hi > notes.txt)', 'ls; (cd /repo && echo hi 2> notes.txt)']) {
    refused(run('delete it', [h]), '<FILE>', h);
    const a = analyzeCommand(h);
    assert.ok(a.ents.file == null || isAmbiguous(a.ents.file), `${h}: ${JSON.stringify(a.ents)}`);
  }
  // absolute targets and redirections opened by the calling shell still resolve
  assert.equal(run('delete it', ['(cd /repo && echo hi > /tmp/abs.txt)']).command, 'rm /tmp/abs.txt');
  assert.equal(run('delete it', ['(cd /repo && cat notes.txt) > out.txt']).command, 'rm out.txt');
  assert.equal(run('delete it', ['(cd /repo && make); echo hi > out.txt']).command, 'rm out.txt');
  assert.equal(run('delete it', ['{ cd /repo && echo hi > notes.txt; }']).command, 'rm notes.txt');
  assert.equal(run('delete it', ['echo hi > notes.txt']).command, 'rm notes.txt');
});

test('major: an explicit encoder rejection (high pNone) is never overridden by the composer', async () => {
  const env = { shell: 'bash', os: 'linux' };
  const q = 'list directories recursively with sizes';
  const rejecting = { infer: async () => ({ intents: { list_files: 0.6, disk_usage: 0.3 }, pNone: 0.99 }) };
  const r = await suggestHybrid(q, { env, encoder: rejecting });
  assert.equal(r.hybrid.deferred, true);
  assert.equal(r.understood, false, `${r.method}: ${r.command}`);
  assert.equal(r.command ?? null, null);
  assert.notEqual(r.method, 'composed');
  // the same encoder without the rejection lets the pipeline answer
  const accepting = { infer: async () => ({ intents: { list_files: 0.6, disk_usage: 0.3 }, pNone: 0 }) };
  assert.equal((await suggestHybrid(q, { env, encoder: accepting })).understood, true);
  // rerank itself marks the rejection
  const c = { confidence: 0.5, topTool: 'ls', intent: 'a', tool: 'ls', tools: [], top: [{ intent: 'a', p: 0.5 }] };
  const rr = rerank(c, { a: 0.99 }, POLICY['A+B'], { thr: 0.3, pNone: 0.9 });
  assert.equal(rr.topTool, NONE);
  assert.ok(rr.rejected);
  assert.ok(rr.confidence < 0.3);
});
