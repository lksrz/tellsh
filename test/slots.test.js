import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractSlots } from '../src/slots.js';
import { buildCommand } from '../src/fill.js';
import { SLOT_CASES } from './slot-cases.js';

test('number words EN/PL', () => {
  assert.equal(extractSlots('show me the twelve largest files').count, 12);
  assert.equal(extractSlots('pokaż siedem największych plików').count, 7);
  assert.equal(extractSlots('ostatnie dwadzieścia linii').count, 20);
  assert.equal(extractSlots('top 15').count, 15);
});

test('sizes', () => {
  assert.equal(extractSlots('bigger than 100M').size, '100M');
  assert.equal(extractSlots('większe niż 1GB').size, '1G');
  assert.equal(extractSlots('over 100 mb').size, '100M');
  assert.equal(extractSlots('ponad 2,5 GB').size, '2560M');
  assert.equal(extractSlots('mniejsze niż 500 kb').size, '500k');
});

test('durations', () => {
  assert.equal(extractSlots('last 7 days').duration.age, '-mtime -7');
  assert.equal(extractSlots('ostatnie 2 godziny').duration.age, '-mmin -120');
  assert.equal(extractSlots('z ostatnich trzech dni').duration.days, 3);
  assert.equal(extractSlots('wczoraj').duration.since, 'yesterday');
  assert.equal(extractSlots('past hour').duration.age, '-mmin -60');
  assert.equal(extractSlots('w ostatnim tygodniu').duration.days, 7);
  assert.equal(extractSlots('since 3 hours ago').duration.since, '3 hours ago');
});

test('ports, pids, urls, hosts, quoted', () => {
  assert.equal(extractSlots('what runs on port 8080').port, 8080);
  assert.equal(extractSlots('co jest na porcie 3000').port, 3000);
  assert.equal(extractSlots('localhost:5173').port, 5173);
  assert.equal(extractSlots('kill pid 4321').pid, 4321);
  assert.deepEqual(extractSlots('download https://x.org/a.zip now').urls, ['https://x.org/a.zip']);
  assert.ok(extractSlots('ping google.com').hosts.includes('google.com'));
  assert.deepEqual(extractSlots('grep "hello world" and \'x y\'').quoted, ['hello world', 'x y']);
});

test('extensions', () => {
  assert.equal(extractSlots('find .log files').ext, 'log');
  assert.equal(extractSlots('pliki pdf').ext, 'pdf');
  assert.equal(extractSlots('all python files').ext, 'py');
  assert.equal(extractSlots('*.md').ext, 'md');
  assert.equal(extractSlots('pliki tekstowe').ext, 'txt');
});

test('paths and named locations', () => {
  assert.deepEqual(extractSlots('copy a.txt to /tmp/b').paths, ['a.txt', '/tmp/b']);
  assert.deepEqual(extractSlots('w katalogu domowym').paths, ['~']);
  assert.deepEqual(extractSlots('in Downloads').paths, ['~/Downloads']);
  assert.deepEqual(extractSlots('na całym dysku').paths, ['/']);
  assert.deepEqual(extractSlots('version 1.5 of ./src/app.js').paths, ['./src/app.js']);
});

test('slot cases produce the exact expected command', () => {
  for (const [intent, q, expected] of SLOT_CASES) {
    assert.equal(buildCommand(intent, q, { platform: 'linux' }).command, expected, `${intent}: ${q}`);
  }
});

test('missing required slots are reported with placeholders', () => {
  const r = buildCommand('kill_by_port', 'kill the thing on the port', { platform: 'linux' });
  assert.deepEqual(r.missing, ['port']);
  assert.match(r.command, /<PORT>/);
});
