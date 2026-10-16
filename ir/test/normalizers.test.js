import { test } from 'node:test';
import assert from 'node:assert/strict';
import { NORM, NORM_KINDS, escapeRegex, segment, spanText } from '../lib/index.js';

const val = (kind, text, ctx) => {
  const r = NORM[kind](text, ctx);
  return r.ok ? r.value : `!${r.label}`;
};

test('every NORM_KIND has a normalizer', () => {
  assert.deepEqual(Object.keys(NORM).sort(), [...NORM_KINDS].sort());
});

test('int', () => {
  assert.equal(val('int', '3'), '3');
  assert.equal(val('int', '1,000'), '1000');
  assert.equal(val('int', 'twelve'), '12');
  assert.equal(val('int', 'fifty'), '50');
  assert.equal(val('int', 'a dozen'), '12');
  assert.equal(val('int', 'hundred'), '100');
  assert.equal(val('int', 'few'), '!gate_reject');
  assert.equal(val('int', 'couple'), '!gate_reject');
  assert.equal(val('int', '0', { range: [1, 10] }), '!gate_reject');
});

test('size in exact bytes', () => {
  assert.equal(val('size', '50mb'), '52428800');
  assert.equal(val('size', '1 gig'), '1073741824');
  assert.equal(val('size', '10k'), '10240');
  assert.equal(val('size', '100b'), '100');
  assert.equal(val('size', '5 tb'), '!gate_reject');
});

test('ages', () => {
  assert.equal(val('age_days', 'last 2 days'), '2');
  assert.equal(val('age_days', '7 days'), '7');
  assert.equal(val('age_days', 'today'), '!gate_reject');
  assert.equal(val('age_minutes', 'past 2 hours'), '120');
  assert.equal(val('age_minutes', 'last 15 minutes'), '15');
});

test('dates', () => {
  assert.equal(val('git_date', 'last week'), '1 week ago');
  assert.equal(val('git_date', 'yesterday'), 'yesterday');
  assert.equal(val('git_date', '3 days ago'), '3 days ago');
  assert.equal(val('git_date', 'past 2 months'), '2 months ago');
  assert.equal(val('git_date', 'last friday'), 'last friday');
  assert.equal(val('git_date', 'recently'), '!gate_reject');
  assert.equal(val('iso_date', '2026-02-28'), '2026-02-28');
  assert.equal(val('iso_date', '2026-02-30'), '!gate_reject');
});

test('globs', () => {
  assert.equal(val('ext_glob', 'js'), '*.js');
  assert.equal(val('ext_glob', '.ts'), '*.ts');
  assert.equal(val('ext_glob', 'python'), '*.py');
  assert.equal(val('ext_glob', 'typescript'), '!ambiguous');
  assert.equal(val('ext_glob', 'banana'), '!gate_reject');
  assert.equal(val('substr_glob', 'test'), '*test*');
  assert.equal(val('substr_glob', 'a*b'), '!gate_reject');
});

test('paths, revs, ranges, ports, jq', () => {
  assert.equal(val('home_path', 'my downloads'), '~/Downloads');
  assert.equal(val('home_path', '~/x y'), '~/x y');
  assert.equal(val('rev_rel', 'last commit'), 'HEAD');
  assert.equal(val('rev_rel', '3 commits ago'), 'HEAD~3');
  assert.equal(val('rev_rel', 'the commit before last'), 'HEAD~1');
  assert.equal(val('rev_rel', 'previous commit'), '!ambiguous');
  assert.equal(val('line_range', '120 to 160'), '120,160');
  assert.equal(val('line_range', 'lines 5-9'), '5,9');
  assert.equal(val('line_range', 'line 7'), '7');
  assert.equal(val('line_range', 'from 40 to the end'), '40,$');
  assert.equal(val('line_range', '9 to 5'), '!gate_reject');
  assert.equal(val('port', '3000'), '3000');
  assert.equal(val('port', ':8080'), '8080');
  assert.equal(val('port', 'port 443'), '443');
  assert.equal(val('port', '70000'), '!gate_reject');
  assert.equal(val('jq_path', 'version'), '.version');
  assert.equal(val('jq_path', 'items[0].name'), '.items[0].name');
  assert.equal(val('jq_path', 'a | b'), '!gate_reject');
});

test('url_scheme', () => {
  assert.equal(val('url_scheme', 'api.github.com/repos/a/b'), 'https://api.github.com/repos/a/b');
  assert.equal(val('url_scheme', 'example.com', { request: 'fetch the site example.com' }), 'https://example.com');
  assert.equal(val('url_scheme', 'example.com', { request: 'cat example.com' }), '!gate_reject');
  assert.equal(val('url_scheme', 'notes.md', { request: 'open url notes.md' }), '!gate_reject');
  assert.equal(val('url_scheme', './a.com'), '!ambiguous');
  assert.equal(val('url_scheme', 'www.a.com', { pathExists: () => true }), '!gate_reject');
});

test('starts_with / ends_with escape per dialect', () => {
  const r = NORM.starts_with('import', { dialect: 'rust_regex' });
  assert.deepEqual(r, { ok: true, value: '^import', pkind: 'regex' });
  assert.equal(val('ends_with', 'a.b', { dialect: 'posix_ere' }), 'a\\.b$');
  assert.equal(val('starts_with', 'x'), '!gate_reject');
  assert.equal(escapeRegex('a-b#c', 'rust_regex'), 'a\\-b\\#c');
  assert.equal(escapeRegex('a-b#c', 'posix_ere'), 'a-b#c');
});

test('signal / scope_top', () => {
  assert.equal(val('signal', 'force'), 'KILL');
  assert.equal(val('signal', '-9'), 'KILL');
  assert.equal(val('signal', 'gracefully'), 'TERM');
  assert.equal(val('signal', 'nicely'), '!gate_reject');
  assert.equal(val('scope_top', 'only here'), '1');
  assert.equal(val('scope_top', 'not recursive'), '1');
});

test('segmenter and span text', () => {
  const seg = segment("case-insensitive search for 'connection refused' in logs/, please.");
  assert.deepEqual(seg.units.map((u) => u.t),
    ['case-insensitive', 'search', 'for', "'connection refused'", 'in', 'logs/', ',', 'please', '.']);
  assert.equal(spanText(seg, [3, 4]), 'connection refused');
  assert.equal(spanText(seg, [0, 2]), 'case-insensitive search');
  assert.equal(segment("it's broken").units.length, 2);
  assert.throws(() => spanText(seg, [5, 99]), RangeError);
});
