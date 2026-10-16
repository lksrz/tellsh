// scripts/ir/equiv.mjs: request-sensitive rules (taxonomy v2 F3) and the removed over-lenience (M3).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sameCommand } from '../../scripts/ir/equiv.mjs';

const same = (a, b, r = '') => assert.ok(sameCommand(a, b, r), `${a} == ${b} | ${r}`);
const diff = (a, b, r = '') => assert.ok(!sameCommand(a, b, r), `${a} != ${b} | ${r}`);

test('git log limit and --oneline', () => {
  same('git log --oneline | head -n 5', 'git log -n 5 --oneline');
  same('git log --oneline | head -5', 'git log -5');
  same("git log --format='%h %s' --max-count=3", "git log -n 3 --format='%h %s'");
  diff('git log --oneline --graph | head -n 5', 'git log -n 5 --graph');
  diff('git log | head -n 5', 'git log -n 5');
  diff('git log --oneline | wc -l', 'git log | wc -l');
  diff('git log --oneline | grep fix', 'git log | grep fix');
  same('git log --oneline', 'git log');
  same("git log --decorate --format='%h %s'", "git log --format='%h %s'");
  diff('git log --decorate --oneline | head -n 2', 'git log --oneline -n 2 --decorate=no');
});

test('pipe-pair rewrites', () => {
  same('cat a | sort | uniq | head', 'cat a | sort -u | head');
  same('sort -f a | uniq -i', 'sort -u -f a');
  diff('sort a | uniq -i', 'sort -u a');
  same('ps aux | grep -i node | wc -l', 'ps aux | grep -ic node');
  diff('ps aux | grep -o node | wc -l', 'ps aux | grep -c node');
  same('grep -r x f.txt | wc -l', 'grep -r -c x f.txt');
});

test('curl, jq, npm, ls no-ops', () => {
  same('curl -sS https://x.io | jq .a', 'curl https://x.io | jq .a', 'get the json from x.io');
  diff('curl -s https://x.io | jq .a', 'curl https://x.io | jq .a', 'quietly get x.io');
  diff('curl -sS https://x.io', 'curl -s https://x.io', 'fetch x.io silently but show errors');
  same('curl -s -o out.html https://x.io', 'curl -o out.html https://x.io', 'download x.io');
  diff('curl -s https://x.io', 'curl https://x.io', 'fetch x.io');
  same("jq -r '.items | length' a.json", "jq '.items | length' a.json");
  diff("jq -r '.name' a.json", "jq '.name' a.json");
  same('npm ls --all react', 'npm ls react');
  diff('npm ls --all', 'npm ls');
  same('npm run build 2>&1', 'npm run build');
  same('ls -1l', 'ls -l');
  same('ls -1 | wc -l', 'ls | wc -l');
  diff('ls -1', 'ls');
  diff('ls -1 src | head', 'ls src | head', 'one per line names in src');
});

test('find: -type f kept on files + exclusion; alternatives order', () => {
  diff("find . -type f -not -name '*.md'", "find . -not -name '*.md'", 'files except markdown');
  same("find . -type f -name '*.md'", "find . -name '*.md'", 'md files');
  same("find . -type f -not -name '*.md'", "find . -not -name '*.md'", 'everything but markdown');
  same("find . \\( -name '*.js' -o -name '*.ts' \\)", "find . \\( -name '*.ts' -o -name '*.js' \\)");
});
