// The allowlist of the danger checker (src/allowlist-data.js) is generated from the catalog: it must match the templates.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ALLOW } from '../src/allowlist-data.js';
import { allowlistTable } from '../scripts/lib/allowlist_table.js';

test('src/allowlist-data.js is up to date with the catalog (node scripts/build_allowlist.js)', () => {
  assert.deepEqual(ALLOW, allowlistTable());
});
