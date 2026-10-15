// 0.3.4: git grep / git show are never offered as runnable, whatever the phrasing, shell or history replay
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { suggest } from '../src/pipeline.js';

const ENVS = [{ shell: 'bash', os: 'linux' }, { shell: 'zsh', os: 'darwin' }, { shell: 'pwsh', os: 'win32' }, { shell: 'cmd', os: 'win32' }];
// every quoted request in the kept review suite plus plain phrasings
const kept = readFileSync(new URL('../test-grep-show/review-templates-r1.mjs', import.meta.url), 'utf8');
const QUERIES = [...new Set([...kept.matchAll(/'((?:[^'\\]|\\.){4,200})'/g)].map((m) => m[1].replace(/\\'/g, "'").replace(/\\n/g, '\n').replace(/\\t/g, '\t')))].concat([
  'search tracked files for "TODO"', 'git grep TODO', 'git grep -n TODO', 'grep the repo for TODO', 'find TODO in tracked files',
  'show the last commit', 'show commit HEAD', 'git show HEAD~1', 'show the previous commit', 'show commit abc123', 'pokaż ostatni commit', 'przeszukaj repo pod kątem TODO',
]);

test('git_grep and git_show are never runnable (0.3.8: never answered from the templates model at all)', () => {
  let seen = 0;
  for (const env of ENVS) for (const q of QUERIES) {
    const r = suggest(q, env);
    if (r && /^(?:git_grep|git_show)$/.test(r.intent ?? '')) { seen++; assert.ok(!r.command || (r.missing || []).length > 0, `${env.shell}: ${JSON.stringify(q)} -> ${r.command}`); }
    if (r && r.command && (r.missing || []).length === 0) assert.ok(!/^\s*git\s+(?:grep|show)\b/i.test(r.command), `${env.shell}: ${JSON.stringify(q)} -> ${r.command}`);
  }
  assert.equal(seen, 0, 'git_grep / git_show are not in the two-model gate (the 0.3.3 model answers as in 0.3.7)');
});
test('history replay of a git grep / git show command is not runnable', () => {
  for (const env of ENVS) for (const [h, q] of [['git grep -n -- TODO', 'same for FIXME'], ['git show HEAD', 'same for HEAD~2']]) {
    const r = suggest(q, { ...env, history: [h] });
    if (r && r.command && (r.missing || []).length === 0) assert.ok(!/\bgit\s+(?:grep|show)\b/.test(r.command), `${env.shell}: ${q} -> ${r.command}`);
  }
});
