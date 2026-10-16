// Regression tests for the review findings on the gate / compiler / decompiler (one block per issue).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  loadSchemas, gate, compile, decompile, canon, equals, toJSON, program, pipe, exec, each, freq, mod, span,
  segment, spanText, lit,
} from '../lib/index.js';
import { helpers } from './fixtures/gate_examples.js';

const schemas = loadSchemas();
const ENV = { schemas, shell: 'bash', platform: 'linux_gnu', pathExists: () => true, isDir: () => true };
const run = (request, build, env = {}) => gate(request, build(helpers(request)), { ...ENV, request, ...env });
const ts = (args, mods = []) => exec('text.search', { args, mods });
const find = (args, mods) => exec('files.find', { args, mods });
const accepts = (r) => assert.equal(r.accept, true, r.reasons.join(' / '));
function rejects(r, re, label = 'gate_reject') {
  assert.equal(r.accept, false, `expected a reject, got: ${r.command}`);
  assert.equal(r.label, label, r.reasons.join(' / '));
  if (re) assert.match(r.reasons.join(' / '), re);
}

test('#1 direction: head/tail are checked against every direction word in the request', () => {
  const tail = (P, mods) => exec('file.tail', { args: { paths: [P] }, mods });
  const head = (P, mods) => exec('file.head', { args: { paths: [P] }, mods });
  rejects(run('5 lines at the top of app.log', ({ S, N }) => program(tail(S('app.log', 'Path'), [mod('lines', [N('int', '5')])]))), /direction/);
  rejects(run('show 5 lines from the tail of app.log', ({ S, N }) => program(head(S('app.log', 'Path'), [mod('lines', [N('int', '5')])]))), /direction/);
  rejects(run('show the first lines of app.log, 5 of them', ({ S, N }) => program(tail(S('app.log', 'Path'), [mod('lines', [N('int', '5')])]))), /direction/);
  rejects(run('show the top of app.log', ({ S }) => program(tail(S('app.log', 'Path'), []))), /direction|"top"/);
  accepts(run('show the last 5 lines of app.log', ({ S, N }) => program(tail(S('app.log', 'Path'), [mod('lines', [N('int', '5')])]))));
  accepts(run('last 5 commits', ({ N }) => program(exec('git.log', { mods: [mod('max_count', [N('int', '5')])] }))));
});

test('#2 a multi-unit span cannot swallow cue, NEG or number units', () => {
  rejects(run('lines in app.log without DEBUG', ({ S }) => program(ts({ pattern: [S('without DEBUG', 'Pattern')], paths: [S('app.log', 'Path')] }))), /swallows the cue "without"/);
  rejects(run('TODO not in tests', ({ S }) => program(ts({ pattern: [S('TODO not in tests', 'Pattern')] }))), /swallows the cue "not"/);
  rejects(run('case-insensitive search for error in src', ({ S }) => program(ts({ pattern: [S('case-insensitive search for error', 'Pattern')], paths: [S('src', 'Path')] }))), /swallows the cue/);
  rejects(run('3 matches of timeout in logs', ({ S }) => program(ts({ pattern: [S('3 matches of', 'Pattern')], paths: [S('logs', 'Path')] }))), /swallows the number/);
  accepts(run("search for it's broken in notes", ({ S }) => program(ts({ pattern: [S("it's broken", 'Pattern')], paths: [S('notes', 'Path')] }))));
  accepts(run("search for 'not found' in src", ({ S }) => program(ts({ pattern: [S("'not found'", 'Pattern')], paths: [S('src', 'Path')] }))));
});

test('#3 cue-less behaviour-changing mods and consts need request words; sort direction', () => {
  const C = (id) => ({ k: 'const', id });
  rejects(run('empty directories under build', ({ S }) => program(find({ paths: [S('build', 'Path')] }, [mod('type', [C('f')]), mod('empty')]))), /finds regular files/);
  rejects(run('symlinks under build', ({ S }) => program(find({ paths: [S('build', 'Path')] }, [mod('type', [C('d')])]))), /type=d/);
  rejects(run('branches sorted by most recent commit', () => program(exec('git.branch', { mods: [mod('sort', [C('committerdate')])] }))), /sort=committerdate/);
  rejects(run('processes sorted by memory', () => program(exec('proc.list', { mods: [mod('sort_cpu')] }))), /sort_cpu/);
  rejects(run('list files sorted by size, smallest first', () => program(exec('dir.list', { mods: [mod('sort_size')] }))), /sort_direction/);
  rejects(run('error in app.log with 5 lines before each match', ({ S, N }) => program(ts({ pattern: [S('error', 'Pattern')], paths: [S('app.log', 'Path')] }, [mod('after', [N('int', '5')])]))), /text\.search\.after/);
  rejects(run('last 5 commits', ({ N }) => program(exec('git.log', { mods: [mod('merges_only'), mod('max_count', [N('int', '5')])] }))), /merges_only/);
  rejects(run('show 5 commits', ({ N }) => program(exec('git.log', { mods: [mod('skip', [N('int', '5')])] }))), /skip/);
  rejects(run('unique lines of names.txt', ({ S }) => program(pipe(exec('lines.sort', { args: { paths: [S('names.txt', 'Path')] } }), exec('lines.uniq', { mods: [mod('repeated')] })))), /repeated/);
  rejects(run('list branches', () => program(exec('git.branch', { mods: [mod('remotes')] }))), /remotes/);
  accepts(run('empty directories under build', ({ S }) => program(find({ paths: [S('build', 'Path')] }, [mod('type', [C('d')]), mod('empty')]))));
  accepts(run('list remote branches', () => program(exec('git.branch', { mods: [mod('remotes')] }))));
  accepts(run('ls -d src', ({ S }) => program(exec('dir.list', { args: { paths: [S('src', 'Path')] }, mods: [mod('directory')] }))));
});

test('#4 more than one unknown content word, an unbound NEG clause, "stop listing"', () => {
  rejects(run('search for TODO in src and archive the folder and encrypt it', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [S('src', 'Path')] }))), /unexplained words: archive, encrypt/);
  rejects(run('search for TODO not in tests, skip vendor', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')] }, [mod('exclude_dir', [S('tests', 'Name')])]))), /NEG cue "skip" has no negated element/);
  rejects(run('stop listing node processes', ({ S }) => program(exec('proc.kill', { args: { name: [S('node', 'ProcName')] } }))), /kill/);
  accepts(run('search for TODO not in tests, skip vendor', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')] }, [mod('exclude_dir', [S('tests', 'Name'), S('vendor', 'Name')])]))));
  accepts(run('stop the node processes', ({ S }) => program(exec('proc.kill', { args: { name: [S('node', 'ProcName')] } }))));
});

test('#5 coverage: dropped file-type filters for extension words and single-extension languages', () => {
  for (const l of ['json', 'css', 'html', 'sql', 'csv', 'xml', 'go', 'markdown', 'md', 'ts']) {
    rejects(run(`search for TODO in ${l} files`, ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')] }))), /file type/);
  }
  accepts(run('search for TODO in md files', ({ S, N }) => program(ts({ pattern: [S('TODO', 'Pattern')] }, [mod('name_glob', [N('ext_glob', 'md')])]))));
  accepts(run('get the json from https://example.org/a', ({ S }) => program(exec('http.get', { args: { url: [S('https://example.org/a', 'Url')] } }))));
});

test('#6 spelled-out numbers must be consumed', () => {
  rejects(run('show five commits', () => program(exec('git.log', {}))), /numeric token "five"/);
  rejects(run('show twenty matches of timeout in logs', ({ S }) => program(ts({ pattern: [S('timeout', 'Pattern')], paths: [S('logs', 'Path')] }))), /numbers/);
  rejects(run('search for error in a dozen files under src', ({ S }) => program(ts({ pattern: [S('error', 'Pattern')], paths: [S('src', 'Path')] }))), /"dozen"/);
  accepts(run('show the last five commits', ({ N }) => program(exec('git.log', { mods: [mod('max_count', [N('int', 'five')])] }))));
});

test('#7 write targets / read operands resolve against cwd and ~', () => {
  const seen = [];
  const pathExists = (p) => { seen.push(p); return ['web/index.html', '/home/u/.bashrc'].includes(p); };
  const r = run('in web, download https://example.org/index.html', ({ S }) => {
    const p = program(exec('http.download', { args: { url: [S('https://example.org/index.html', 'Url')] }, mods: [mod('remote_name')] }));
    p.cwd = S('web', 'Path');
    return p;
  }, { pathExists });
  accepts(r);
  assert.equal(r.risk, 'high');
  assert.ok(seen.includes('web/index.html'), seen.join());
  const dl = ({ S }) => program(exec('http.download', { args: { url: [S('https://example.org/x.sh', 'Url')] }, mods: [mod('output', [S('~/.bashrc', 'Path')])] }));
  assert.equal(run('download https://example.org/x.sh to ~/.bashrc', dl, { pathExists }).risk, 'high'); // no env.home: assume it exists
  seen.length = 0;
  assert.equal(run('download https://example.org/x.sh to ~/.bashrc', dl, { pathExists, home: '/home/u' }).risk, 'high');
  assert.ok(seen.includes('/home/u/.bashrc'), seen.join());
});

test('#8 strict ERE: no (?…) groups, lazy/stacked quantifiers, {,n}, quantifier without an atom', () => {
  for (const p of ['(?:foo)', '(?=foo)', 'a+?', '(?<n>x)', 'a{,3}', '*a', '(|+a)', 'a**']) {
    const req = `ps aux, then regex '${p}'`;
    rejects(run(req, ({ S }) => program(pipe(exec('proc.list', {}), ts({ pattern: [S(`'${p}'`, 'Pattern')] })))), /regex/, 'unsafe_value');
  }
  accepts(run("ps aux, then regex 'a{2,3}|[[:digit:]]+'", ({ S }) => program(pipe(exec('proc.list', {}), ts({ pattern: [S("'a{2,3}|[[:digit:]]+'", 'Pattern')] })))));
});

test('#9 spanText trims quotes only for one quoted unit; quoted multi-unit spans are rejected', () => {
  const seg = segment("search for 'foo' or 'bar' in src");
  assert.equal(spanText(seg, [2, 3]), 'foo');
  assert.equal(spanText(seg, [2, 5]), "'foo' or 'bar'");
  rejects(run("search for 'foo' or 'bar' in src", ({ S }) => program(ts({ pattern: [span(2, 5, 'Pattern')], paths: [S('src', 'Path')] }))), /quoted string/);
});

test('#10 C1 controls, U+2028/9 and every format character are unsafe (gate and compile)', () => {
  for (const ch of ['\u009b', '\u0085', '\u2028', '\u2029', '\u061c', '\u00ad', '\u180e', '\u200e', '\u2060']) {
    const req = `search for a${ch}b in src`;
    rejects(run(req, ({ S }) => program(ts({ pattern: [S(`a${ch}b`, 'Pattern')], paths: [S('src', 'Path')] }))), null, 'unsafe_value');
    const c = compile(program(ts({ pattern: [lit(`a${ch}b`, 'literal')], paths: [lit('src')] })), ENV);
    assert.equal(c.label, 'unsafe_value', `compile emitted ${JSON.stringify(c.text)}`);
  }
});

test('#11 span values are byte-exact slices of the original (NFD) request', () => {
  const nfd = 'cafe\u0301';
  const req = `search for TODO in ${nfd}`;
  const r = gate(req, program(ts({ pattern: [span(2, 3, 'Pattern')], paths: [span(4, 5, 'Path')] })), { ...ENV, request: req });
  accepts(r);
  assert.equal(r.ir.body.parts[0].stages[0].args.paths[0].s, nfd);
  assert.ok(r.command.includes(nfd));
});

test('#12 find roots that look like expression syntax get ./', () => {
  const C = (id) => ({ k: 'const', id });
  for (const root of ['(', ')', '!', '!x']) {
    const req = `md files under ${root}`;
    const r = run(req, ({ S, N }) => program(find({ paths: [S(root, 'Path')] }, [mod('type', [C('f')]), mod('name_glob', [N('ext_glob', 'md')])])));
    accepts(r);
    assert.match(r.command, new RegExp(`^find '\\./`));
  }
});

test('#13/#14 converter-facing: the gate command compiles the gate IR (pkind) and cwd ./X round-trips', () => {
  const r = run('commits whose message matches regex leak|uaf', ({ S }) => program(exec('git.log', { mods: [mod('grep_message', [S('leak|uaf', 'Pattern')])] })));
  accepts(r);
  assert.equal(compile(r.ir, ENV).text, r.command);
  assert.match(r.command, /-E --grep=/);
  const c = run('go into ./packages/web and run npm test', ({ S }) => {
    const p = program(exec('npm.test', {}));
    p.cwd = S('./packages/web', 'Path');
    return p;
  });
  accepts(c);
  assert.equal(c.command, 'cd ./packages/web && npm test');
  accepts(run('all files under ./-cache', ({ S }) => program(find({ paths: [S('./-cache', 'Path')] }, [mod('type', [{ k: 'const', id: 'f' }])]))));
});

test('#15 an explicit "." operand equal to first_stage_operands round-trips', () => {
  const r = run('search for todo in .', ({ S }) => program(ts({ pattern: [S('todo', 'Pattern')], paths: [S('.', 'Path')] })));
  accepts(r);
  assert.equal(r.command, 'rg todo .');
  const C = (id) => ({ k: 'const', id });
  accepts(run('find py files in .', ({ S, N }) => program(find({ paths: [S('.', 'Path')] }, [mod('type', [C('f')]), mod('name_glob', [N('ext_glob', 'py')])]))));
});

test('#16 freq explains SORT / COUNT / "most common"', () => {
  accepts(run('most common lines in data.txt', ({ S }) => program(freq([S('data.txt', 'Path')]))));
  accepts(run('how often each line appears in data.txt, sort by count', ({ S }) => program(freq([S('data.txt', 'Path')]))));
  accepts(run('10 most common lines in data.txt', ({ S, N }) => program(pipe(freq([S('data.txt', 'Path')]), exec('file.head', { mods: [mod('lines', [N('int', '10')])] })))));
});

test('#17 schema cues: newer, min_depth, older-than ages, max_time, --follow, sort -h', () => {
  const C = (id) => ({ k: 'const', id });
  accepts(run('python files under apps newer than manage.py', ({ S, N }) => program(find({ paths: [S('apps', 'Path')] }, [mod('type', [C('f')]), mod('name_glob', [N('ext_glob', 'python')]), mod('newer', [S('manage.py', 'Path')])]))));
  accepts(run('files at least 3 levels deep in deploy', ({ S, N }) => program(find({ paths: [S('deploy', 'Path')] }, [mod('type', [C('f')]), mod('min_depth', [N('int', '3')])]))));
  accepts(run('get https://example.org/a with a timeout of 5 seconds', ({ S, N }) => program(exec('http.get', { args: { url: [S('https://example.org/a', 'Url')] }, mods: [mod('max_time', [N('int', '5')])] }))));
  accepts(run('history of a.txt following renames', ({ S }) => program(exec('git.log', { args: { paths: [S('a.txt', 'Path')] }, mods: [mod('follow_renames')] }))));
  accepts(run('sort sizes.txt by human-readable sizes', ({ S }) => program(exec('lines.sort', { args: { paths: [S('sizes.txt', 'Path')] }, mods: [mod('human')] }))));
});

test('#18 compile refuses {} inside a find -exec inner value', () => {
  const C = (id) => ({ k: 'const', id });
  const ir = program(pipe(find({}, [mod('type', [C('f')])]), each(ts({ pattern: [lit('{}', 'literal')] }))));
  const c = compile(ir, ENV);
  assert.equal(c.label, 'unsafe_value', c.text);
});

test('#19 freq with a dash path decompiles back to the macro', () => {
  const ir = program(freq([lit('-x')]));
  const c = compile(ir, ENV);
  assert.equal(c.text, 'sort -- -x | uniq -c | sort -rn');
  const d = decompile(c.text, ENV);
  assert.ok(equals(d.ir, canon(ir, { schemas })), toJSON(d.ir));
});

test('#20 decompile accepts only the platform spelling of NUL transport and xargs -r', () => {
  const darwin = { ...ENV, platform: 'darwin_bsd' };
  assert.ok(decompile('grep -r -l -Z -F foo . | xargs -0 -r wc -l --', darwin).error);
  assert.ok(decompile('grep -r -l --null -F foo . | xargs -0 wc -l --', ENV).error);
  assert.ok(decompile('rg -l -0 foo . | xargs -0 wc -l --', ENV).error); // linux_gnu needs -r
  assert.ok(decompile('rg -l -0 foo . | xargs -0 -r wc -l --', darwin).error);
  assert.ok(decompile('grep -r -l --null -F foo . | xargs -0 wc -l --', darwin).ir);
  assert.ok(decompile('grep -r -l -Z -F foo . | xargs -0 -r wc -l --', ENV).ir);
});
