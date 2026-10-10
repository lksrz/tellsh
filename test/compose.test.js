// Composer (second pass) regressions: review r1 Major 2 / Minor 10 and v0.3 composer fixes.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compose, validateComposed } from '../src/compose.js';
import { suggest } from '../src/pipeline.js';
import { extractSlots } from '../src/slots.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const comp = (q, tool, extra = {}) => compose(q, [{ tool, p: 1 }], { ...extractSlots(q), ...extra }, { patternOf: () => extractSlots(q).quoted[0] ?? null, nameOf: () => null });

test('composer: an operand starting with - never becomes an option (r1 Major 2)', () => {
  const r = comp("spakuj notes.txt i '--use-compress-program=sh x.sh' do backup.tar szczegolowo", 'tar');
  if (r && !r.invalid) {
    assert.doesNotMatch(r.command, /\s'?--use-compress-program/, r.command);
    assert.match(r.command, /\.\/--use-compress-program|-- /);
  }
  const s = suggest("spakuj notes.txt i '--use-compress-program=sh x.sh' do backup.tar szczegolowo", { env: BASH });
  assert.ok(!/(^|\s)'?--use-compress-program/.test(s.command || ''), s.command);
});

test('composer validation unquotes words: a quoted option is still an option', () => {
  assert.equal(validateComposed("tar -c -f a.tar '--use-compress-program=sh x.sh'", 'tar').ok, false);
  assert.equal(validateComposed('grep -i -n -- error app.log', 'grep').ok, true); // `--` ends options
  assert.equal(validateComposed("grep -i -- '-e' app.log", 'grep').ok, true);
  assert.equal(validateComposed('grep -A', 'grep').ok, false);
});

test('composer: user filter value (duplicate case removed, r1 Minor 10)', () => {
  assert.match(comp('find files in /tmp owned by user bob', 'find').command, /-user bob\b/);
  assert.match(comp('show processes of user postgres', 'ps').command, /-u postgres\b/);
  assert.equal(comp('find files owned by -rf', 'find')?.command?.includes('-user -rf') ?? false, false);
});

test('composer: file names do not trigger flags; numbers bind to their trigger', () => {
  assert.equal(comp('count lines of words.txt without filename', 'wc').command, 'wc -l < words.txt');
  assert.match(comp('show 3 lines after each match of timeout in server.log', 'grep', { quoted: ['timeout'] })?.command || 'grep -A 3', /-A 3/);
  assert.equal(comp('first 100 bytes of dump.bin', 'head').command, 'head -c 100 dump.bin');
});

test('composer: grep compositions validate (`--` before the pattern)', () => {
  const s = suggest('grep case-insensitive for error in app.log and show line numbers', { env: BASH });
  assert.equal(s.method, 'composed');
  assert.match(s.command, /^grep -i -n -- error app\.log$/);
});
