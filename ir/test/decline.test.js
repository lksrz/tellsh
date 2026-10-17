// decline.js (taxonomy v4 fix 3): requests that name no value are declined before the strict rules.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas, gate } from '../lib/index.js';
import { declineObligations } from '../lib/decline.js';

const schemas = loadSchemas();
const pipe = (...stages) => ({ v: 1, status: 'ok', body: { k: 'and', parts: [{ k: 'pipe', stages }] } });
const span = (a, as, b = a + 1) => ({ k: 'span', u: [a, b], as });
const run = (request, ir) => gate(request, ir, { schemas, shell: 'bash', platform: 'linux_gnu', request });
const no = (request, ir, re) => {
  const g = run(request, ir);
  assert.equal(g.accept, false, `${request} should be declined`);
  assert.match(g.reasons.at(-1), re);
};
const ok = (request, ir) => {
  const g = run(request, ir);
  assert.ok(g.accept, `${request}: ${g.reasons?.at(-1)}`);
};
const search = (pat, path) => pipe({ k: 'exec', op: 'text.search', mods: [], args: { pattern: [span(pat, 'Pattern')], ...(path != null ? { paths: [span(path, 'Path')] } : {}) } });

test('(a) a dangling preposition / comparator at the end', () => {
  // "line counts of files containing" -> the dangling word itself taken as the pattern
  no('search for containing', search(2), /underspecified: request ends in "containing"/);
  ok('search for TODO', search(2));
  // "with case-sensitive matching": a mode word before matching, not a dangling filter
  ok('search app for params with case-sensitive matching', pipe({ k: 'exec', op: 'text.search', mods: [{ mod: 'case_sensitive' }], args: { pattern: [span(3, 'Pattern')], paths: [span(1, 'Path')] } }));
});

test('(b) a definite generic noun phrase with no value', () => {
  // direct: "the deprecated helper" with the pattern elsewhere ("deprecated" alone also trips span integrity in the gate)
  const words = 'which files use the deprecated helper in packages/api'.split(' ');
  const cx = (used) => ({ words, consumed: new Set(used.flatMap((v) => [v.u[0]])), hasFree: () => null, execInfos: [], used,
    seg: { units: words.map((t) => ({ t })) }, fail: (check, detail) => { throw new Error(`${check}: ${detail}`); } });
  assert.throws(() => declineObligations(cx([{ u: [7, 8], role: 'paths', kind: 'span', value: 'packages/api' }])), /underspecified: "the deprecated helper"/);
  assert.throws(() => declineObligations(cx([{ u: [4, 5], role: 'pattern', kind: 'span', value: 'deprecated' }, { u: [7, 8], role: 'paths', kind: 'span', value: 'packages/api' }])), /"the deprecated helper"/);
  no('rg in src for the hook', search(5, 2), /underspecified: "the hook" names no value/);
  // a modifier a value spells names the noun ("the version field" -> .version)
  ok('just the version field of package.json', pipe({ k: 'exec', op: 'json.select', mods: [], args: { filter: [{ k: 'norm', kind: 'jq_path', u: [2, 3] }], paths: [span(5, 'Path')] } }));
});

test('(c) a placeholder as the whole pattern', () => {
  no('search for text in src', search(2, 4), /underspecified: pattern "text" is a placeholder/);
  // a capitalised identifier is a real pattern
  ok('search for Text in src', search(2, 4));
});

test('(d) a free recency phrase with no time mod', () => {
  no('get me last 15 of oscar history this week', pipe({ k: 'exec', op: 'git.log', mods: [{ mod: 'max_count', values: [{ k: 'norm', kind: 'int', u: [3, 4] }] }, { mod: 'author', values: [span(6, 'Name')] }], args: {} }), /dropped_value: recency "this week"/);
  ok('commits since yesterday', pipe({ k: 'exec', op: 'git.log', mods: [{ mod: 'since', values: [{ k: 'norm', kind: 'git_date', u: [2, 3] }] }], args: {} }));
});

test('(e) upstream as a bare rev', () => {
  no('diff against upstream', pipe({ k: 'exec', op: 'git.diff', mods: [], args: { rev: [span(2, 'Rev')] } }), /underspecified: "upstream" is ambiguous/);
  ok('diff against upstream/main', pipe({ k: 'exec', op: 'git.diff', mods: [], args: { rev: [span(2, 'Rev')] } }));
});

test('(f) "In DIR, download" needs the directory', () => {
  const dl = (cwd) => ({ ...pipe({ k: 'exec', op: 'http.download', mods: [{ mod: 'remote_name' }], args: { url: [span(4, 'Url')] } }), ...(cwd ? { cwd: span(1, 'Path') } : {}) });
  no('In e2e, download https://example.com/a.json', dl(false), /dropped_value: "in e2e ,"/);
  ok('In e2e, download https://example.com/a.json', dl(true));
});

test('(g) permission filters are not expressible', () => {
  const find = (mods, req) => run(req, pipe({ k: 'exec', op: 'files.find', mods, args: { paths: [span(4, 'Path')] } }));
  const g = find([{ mod: 'type', values: [{ k: 'const', id: 'f' }] }, { mod: 'name_glob', values: [{ k: 'norm', kind: 'ext_glob', u: [1, 2] }] }, { mod: 'exclude_glob', values: [span(8, 'Glob')] }],
    'find sh scripts under ci that are not executable');
  assert.equal(g.accept, false);
  assert.match(g.reasons.at(-1), /permission filter/);
});

test('(h) schema gaps: tail -c +N, blame', () => {
  const tail = pipe({ k: 'exec', op: 'file.tail', mods: [{ mod: 'bytes', values: [{ k: 'norm', kind: 'int', u: [5, 6] }] }], args: { paths: [span(10, 'Path')] } });
  no('print the bytes from byte 1000 to the end of syslog', tail, /tail -c \+N/);
});
