// v0.4 developer-tool intents: slot extraction (EN/PL), per-shell rendering, risk.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildCommand } from '../src/fill.js';
import { BY_ID } from '../src/catalog.js';
import { FAMILY_OF } from '../src/tools.js';
import { NEW_INTENTS } from '../scripts/hybrid/sets.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const cmd = (id, text, env = BASH) => buildCommand(id, text, { env }).command;

test('every v0.4 intent is in the catalog and a tool family', () => {
  for (const id of NEW_INTENTS) {
    assert.ok(BY_ID[id], id);
    assert.ok(FAMILY_OF[id], id);
  }
});

const CASES = [
  ['npm_run_script', 'run the dev server with npm', 'npm run dev'],
  ['npm_run_script', 'npm run build', 'npm run build'],
  ['npm_run_script', 'odpal skrypt lint', 'npm run lint'],
  ['npm_run_script', 'run the "test:e2e" script', 'npm run test:e2e'],
  ['npm_install', 'npm install', 'npm install'],
  ['npm_install', 'install axios in this project', 'npm install axios'],
  ['npm_install', 'yarn add zod', 'npm install zod'],
  ['npm_install_global', 'install typescript globally', 'npm install -g typescript'],
  ['npm_install_global', 'zainstaluj globalnie pakiet vercel', 'npm install -g vercel'],
  ['npm_install_global', 'npm i -g @angular/cli', 'npm install -g @angular/cli'],
  ['pip_install', 'pip install requests', 'python3 -m pip install requests'],
  ['pip_install', 'install numpy with pip', 'python3 -m pip install numpy'],
  ['pip_install', 'pip3 install pillow==10.4.0', 'python3 -m pip install pillow==10.4.0'],
  ['tool_version', 'what version of node do I have', 'node --version'],
  ['tool_version', 'jaka mam wersje pythona3? python3', 'python3 --version'],
  ['cli_help', 'show help for wrangler', 'wrangler --help'],
  ['print_line_range', 'show lines 120-180 of src/app.js', "sed -n '120,180p' src/app.js"],
  ['print_line_range', 'pokaż linie od 10 do 25 w config.yaml', "sed -n '10,25p' config.yaml"],
  ['print_line_range', 'lines 40 to 12 of main.py', "sed -n '12,40p' main.py"],
  ['ssh_port_forward', 'forward port 5432 from db.example.com', 'ssh -N -L 5432:localhost:5432 db.example.com'],
  ['ssh_port_forward', 'tunel ssh na port 8080 do ola@10.0.0.5', 'ssh -N -L 8080:localhost:8080 ola@10.0.0.5'],
  ['gh_pr_view', 'show PR 42', 'gh pr view 42'],
  ['gh_pr_view', 'show the current pull request', 'gh pr view'],
  ['gh_pr_checks', 'czy CI przeszło na PR 7', 'gh pr checks 7'],
  ['gh_run_view', 'show workflow run 81234567', 'gh run view 81234567'],
  ['wrangler_secret_put', 'set the API_KEY secret on my worker', 'npx wrangler secret put API_KEY'],
  ['activate_venv', 'activate the venv', '. .venv/bin/activate'],
  ['activate_venv', 'activate the virtualenv in ./env', '. ./env/bin/activate'],
];
for (const [id, text, want] of CASES) {
  test(`${id}: ${text}`, () => assert.equal(cmd(id, text), want));
}

test('installer words are not package names; apt installs keep working', () => {
  assert.equal(cmd('install_package', 'install npm'), 'sudo apt install npm');
  assert.equal(cmd('install_package', 'zainstaluj mi htop'), 'sudo apt install htop');
  assert.equal(cmd('install_package', 'apt install vim'), 'sudo apt install vim');
});

test('per-shell renders of the new intents', () => {
  const R = { script: 'dev', pkg: 'requests', cmd: 'node', start: 10, end: 20, file: 'app.log', port: 5432, target: 'db.example.com', num: 42 };
  const r = (id, env) => buildCommand(id, '', { env, resolved: { ...R } });
  const PS = { shell: 'powershell', os: 'win32' };
  const CMD = { shell: 'cmd', os: 'win32' };
  const FISH = { shell: 'fish', os: 'linux' };
  assert.equal(r('pip_install', PS).command, "py -m pip install 'requests'");
  assert.equal(r('pip_install', CMD).command, 'py -m pip install requests');
  assert.equal(r('tool_version', PS).command, "& 'node' --version");
  assert.equal(r('print_line_range', PS).command, "Get-Content -LiteralPath 'app.log' | Select-Object -Index ((10 - 1)..(20 - 1))");
  assert.equal(r('print_line_range', CMD).command, null);
  assert.match(r('print_line_range', CMD).gap, /cmd\.exe/);
  assert.equal(r('activate_venv', FISH).command, 'source .venv/bin/activate.fish');
  assert.equal(r('activate_venv', PS).command, "& (Join-Path '.venv' 'Scripts/Activate.ps1')");
  assert.equal(r('activate_venv', { shell: 'powershell', os: 'linux' }).command, "& (Join-Path '.venv' 'bin/Activate.ps1')");
  assert.equal(r('activate_venv', CMD).command, 'call .venv\\Scripts\\activate.bat');
  assert.equal(r('gh_pr_view', PS).command, 'gh pr view 42');
});

test('risk: installs, project scripts, deploys, merges and tunnels are never safe', () => {
  for (const id of ['npm_run_script', 'npm_install', 'npm_install_global', 'pip_install', 'activate_venv', 'wrangler_deploy',
    'wrangler_secret_put', 'gh_pr_create', 'gh_pr_merge', 'ssh_port_forward']) assert.notEqual(BY_ID[id].risk, 'safe', id);
  for (const id of ['gh_pr_list', 'gh_auth_status', 'tool_version', 'cli_help', 'print_line_range', 'wrangler_tail']) {
    assert.equal(BY_ID[id].risk, 'safe', id);
  }
  // a rendered safe command stays safe (no danger warnings)
  const r = buildCommand('print_line_range', '', { env: BASH, resolved: { file: 'a.txt', start: 1, end: 5 } });
  assert.equal(r.risk, 'safe');
});

test('raw numeric slots never take non-numbers', () => {
  const r = buildCommand('print_line_range', '', { env: BASH, resolved: { file: 'a.txt', start: '1;rm -rf /', end: 5 } });
  assert.doesNotMatch(r.command || '', /rm -rf/);
  const g = buildCommand('gh_pr_view', '', { env: BASH, resolved: { num: '$(id)' } });
  assert.doesNotMatch(g.command || '', /\$\(id\)/);
});
