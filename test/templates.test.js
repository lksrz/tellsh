import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { shQuote, render, buildCommand } from '../src/fill.js';
import { INTENTS } from '../src/catalog.js';

// round-trip through a real shell: printf '%s' <quoted> must print the original
const roundTrip = (s) => execFileSync('bash', ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' });

test('shQuote round-trips nasty strings through bash', () => {
  for (const s of ["it's", 'a b', '$(rm -rf ~)', '`id`', '"; ls', 'tab\there', 'new\nline', '*.log', '!bang', 'ąę żółw', "''", '\\', '-rf']) {
    assert.equal(roundTrip(s), s);
  }
});

test('shQuote keeps simple words bare and tilde expandable', () => {
  assert.equal(shQuote('/var/log'), '/var/log');
  assert.equal(shQuote('~/my dir'), "~/'my dir'");
  assert.equal(shQuote('~'), '~');
  assert.equal(shQuote(''), "''");
});

test('raw slots are validated, never injected', () => {
  const r = render('head -n {count!raw} {file}', { count: '5; rm -rf /', file: 'a' }, ['count']);
  assert.equal(r.command, 'head -n <COUNT> a');
  assert.deepEqual(r.missing, ['count']);
});

test('optional segments are dropped when slot missing', () => {
  assert.equal(render('git diff«-- {file}»', {}).command, 'git diff');
  assert.equal(render('git diff«-- {file}»', { file: 'a b' }).command, "git diff -- 'a b'");
});

test('non-slot braces are left alone', () => {
  assert.equal(render("awk '{print $1}' {file}", { file: 'x' }).command, "awk '{print $1}' x");
  assert.equal(render("curl -w '%{http_code}' {url}", { url: 'https://a' }).command, "curl -w '%{http_code}' https://a");
});

test('every intent renders on linux and darwin without throwing, with valid risk', () => {
  for (const i of INTENTS) {
    for (const platform of ['linux', 'darwin']) {
      const r = buildCommand(i.id, '', { platform });
      assert.ok(r.command && typeof r.command === 'string', i.id);
      assert.ok(['safe', 'medium', 'high'].includes(r.risk), i.id);
      assert.ok(!/undefined|(?<!\/dev\/)null|\{\w+(!raw)?\}/.test(r.command.replace(/%\{http_code\}/, '')), `${i.id}/${platform}: ${r.command}`);
    }
  }
});

test('darwin variants differ where commands differ', () => {
  assert.equal(buildCommand('memory_usage', '', { platform: 'darwin' }).command, 'vm_stat');
  assert.equal(buildCommand('memory_usage', '', { platform: 'linux' }).command, 'free -h');
  assert.match(buildCommand('listening_ports', '', { platform: 'darwin' }).command, /^lsof/);
  assert.match(buildCommand('replace_text', 'replace a with b in f.txt', { platform: 'darwin' }).command, /^sed -i '' /);
});

test('injection attempt in a filename stays a single quoted argument', () => {
  const r = buildCommand('cat_file', 'show file "x; rm -rf ~"', { platform: 'linux' });
  assert.equal(r.command, "cat 'x; rm -rf ~'");
});
