// Regression tests for the round-2 review findings (review/r2-claude.md, review/r2-codex.md) on slot
// extraction: whole-disk phrases and trailing punctuation on paths of changing commands.
// History, rendering, danger and composer findings are in regressions3-history / regressions3-render.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';

const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const run = (q) => suggest(q, { env: BASH });

// r2-claude major 1: "on the disk" replaced the folder the user named with /
test('whole-disk phrases never become the target of a changing command', () => {
  assert.equal(run('usuń folder cache na dysku').command, 'rm -r cache');
  for (const q of ['delete the cache folder on the disk', 'delete old logs on my drive', 'usuń plik notatki na dysku']) {
    const r = run(q);
    assert.doesNotMatch(r.command, /^rm( -r)? \/$/, q);
    assert.equal(r.critical, false, q);
    assert.equal(r.missing.length, 1, q);
  }
  // a named folder also wins for read-only intents
  assert.equal(run('ile miejsca zajmuje folder cache na dysku').command, 'du -sh cache');
  // still a search scope where that is what the phrase means
  assert.match(run('find big files on the disk').command, /^find \/ /);
  assert.match(run('znajdź pliki .log na dysku').command, /^find \/ /);
  const del = run('usuń pliki tmp na całym dysku');
  assert.match(del.command, /^find \/ .*-delete$/);
  assert.equal(del.critical, true);
  // a literal / is still the root
  assert.equal(run('delete folder /').command, 'rm -r /');
});

// r2-codex major 1: trailing punctuation was removed from deletion targets
test('a path with trailing punctuation is a placeholder for changing commands', () => {
  for (const [q, slot] of [['delete folder /tmp/data!', 'path'], ['delete folder /tmp/a.txt.', 'path'], ['delete file /tmp/x?', 'file'],
    ['remove the file notes.txt.', 'file']]) {
    const r = run(q);
    assert.ok(r.missing.includes(slot), `${q} -> ${r.command}`);
    assert.doesNotMatch(r.command, /\/tmp\/|notes/, q);
    assert.ok(r.warnings.some((w) => /trailing punctuation/.test(w)), q);
  }
  // quoted: exact
  assert.equal(run("delete folder '/tmp/data!'").command, "rm -r '/tmp/data!'");
  // kept characters are not ambiguous; read-only commands still trim sentence punctuation
  assert.equal(run('delete file /tmp/data.').command, 'rm /tmp/data.');
  assert.equal(run('show file /tmp/a.txt.').command, 'cat /tmp/a.txt');
});
