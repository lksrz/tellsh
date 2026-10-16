import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  loadSchemas, canon, decompile, program, pipe, and, exec, each, freq, mod, lit, toJSON, OOS_REASONS,
} from '../lib/index.js';

const schemas = loadSchemas();
const env = { schemas, shell: 'bash', platform: 'linux_gnu' };
const L = (s) => lit(s);
const P = (s, k = 'literal') => lit(s, k);
const x = (op, o = {}) => exec(op, o);

// docs/IR.md §7: rendered bash -> expected IR (values already resolved, as canon would).
const SECTION7 = [
  [1, 'rg TODO src', program(x('text.search', { args: { pattern: [P('TODO')], paths: [L('src')] } }))],
  [2, "rg -i -n 'connection refused' logs/", program(x('text.search', { mods: [mod('ignore_case'), mod('line_number')], args: { pattern: [P('connection refused')], paths: [L('logs/')] } }))],
  [3, "rg -F -g '*.js' 'foo(' .", program(x('text.search', { mods: [mod('name_glob', [L('*.js')])], args: { pattern: [P('foo(')] } }))],
  [4, 'rg -e -v scripts', program(x('text.search', { args: { pattern: [P('-v')], paths: [L('scripts')] } }))],
  [5, "rg 'it'\\''s broken' notes", program(x('text.search', { args: { pattern: [P("it's broken")], paths: [L('notes')] } }))],
  [6, "rg -l -g '!node_modules' useEffect .", program(x('text.search', { mods: [mod('files_with_matches'), mod('exclude_dir', [L('node_modules')])], args: { pattern: [P('useEffect')] } }))],
  [7, "rg -g '!tests' TODO .", program(x('text.search', { mods: [mod('exclude_dir', [L('tests')])], args: { pattern: [P('TODO')] } }))],
  [8, 'rg -v DEBUG app.log', program(x('text.search', { mods: [mod('invert')], args: { pattern: [P('DEBUG')], paths: [L('app.log')] } }))],
  [9, 'rg -c timeout server.log', program(x('text.search', { mods: [mod('count')], args: { pattern: [P('timeout')], paths: [L('server.log')] } }))],
  [10, 'rg -o error app.log | wc -l', program(pipe(x('text.search', { mods: [mod('only_matching')], args: { pattern: [P('error')], paths: [L('app.log')] } }), x('file.count', { mods: [mod('lines')] })))],
  [11, 'rg -l deprecated . | wc -l', program(pipe(x('text.search', { mods: [mod('files_with_matches')], args: { pattern: [P('deprecated')] } }), x('file.count', { mods: [mod('lines')] })))],
  [13, 'rg timeout logs | head -n 3', program(pipe(x('text.search', { args: { pattern: [P('timeout')], paths: [L('logs')] } }), x('file.head', { mods: [mod('lines', [L('3')])] })))],
  [14, 'rg -m 3 panic crates', program(x('text.search', { mods: [mod('max_count', [L('3')])], args: { pattern: [P('panic')], paths: [L('crates')] } }))],
  [15, "rg '^import' main.ts", program(x('text.search', { args: { pattern: [P('^import', 'regex')], paths: [L('main.ts')] } }))],
  [16, "grep -r -F --include='*.py' 'a.b*' .", program(x('text.search', { pin: 'grep', mods: [mod('name_glob', [L('*.py')])], args: { pattern: [P('a.b*')] } }))],
  [17, "find docs -type f -name '*.md' -mtime -2", program(x('files.find', { mods: [mod('type', [L('f')]), mod('name_glob', [L('*.md')]), mod('modified_within_days', [L('2')])], args: { paths: [L('docs')] } }))],
  [18, 'find . -type d -name node_modules -prune -o -type f -size +52428800c -print', program(x('files.find', { mods: [mod('exclude_dir', [L('node_modules')]), mod('type', [L('f')]), mod('size_gt', [L('52428800')])] }))],
  [19, "find . -type f -not -name '*test*'", program(x('files.find', { mods: [mod('type', [L('f')]), mod('exclude_glob', [L('*test*')])] }))],
  [20, 'find build -type d -empty', program(x('files.find', { mods: [mod('type', [L('d')]), mod('empty')], args: { paths: [L('build')] } }))],
  [21, "find src -type f -name '*.ts' -exec wc -l -- {} +", program(pipe(x('files.find', { mods: [mod('type', [L('f')]), mod('name_glob', [L('*.ts')])], args: { paths: [L('src')] } }), each(x('file.count', { mods: [mod('lines')] }))))],
  [22, 'rg -l -0 useState . | xargs -0 -r wc -l --', program(pipe(x('text.search', { mods: [mod('files_with_matches')], args: { pattern: [P('useState')] } }), each(x('file.count', { mods: [mod('lines')] }))))],
  [23, 'ls -lAhS', program(x('dir.list', { mods: [mod('long'), mod('hidden'), mod('human'), mod('sort_size')] }))],
  [24, 'tail -n 50 build.log', program(x('file.tail', { mods: [mod('lines', [L('50')])], args: { paths: [L('build.log')] } }))],
  [25, 'tail -f logs/server.log', program(x('file.tail', { mods: [mod('follow')], args: { paths: [L('logs/server.log')] } }))],
  [26, "sed -n '120,160p' src/cli.js", program(x('file.lines', { mods: [mod('line_range', [L('120,160')])], args: { paths: [L('src/cli.js')] } }))],
  [27, 'git log --oneline -n 5', program(x('git.log', { mods: [mod('oneline'), mod('max_count', [L('5')])] }))],
  [28, "git log --author=alice --since='1 week ago' -- src", program(x('git.log', { mods: [mod('author', [L('alice')]), mod('since', [L('1 week ago')])], args: { paths: [L('src')] } }))],
  [29, 'git log --oneline -n 10 --grep=fix -i', program(x('git.log', { mods: [mod('oneline'), mod('max_count', [L('10')]), mod('grep_message', [P('fix')]), mod('ignore_case')] }))],
  [30, 'git log | head -n 20', program(pipe(x('git.log'), x('file.head', { mods: [mod('lines', [L('20')])] })))],
  [31, 'git log --oneline | head -n 5', program(pipe(x('git.log', { mods: [mod('oneline')] }), x('file.head', { mods: [mod('lines', [L('5')])] })))],
  [32, "git show --name-only 'HEAD~2' --", program(x('git.show', { mods: [mod('name_only')], args: { rev: [L('HEAD~2')] } }))],
  [33, 'git diff main -- package.json', program(x('git.diff', { args: { rev: [L('main')], paths: [L('package.json')] } }))],
  [34, 'git diff --staged --stat', program(x('git.diff', { mods: [mod('staged'), mod('stat')] }))],
  [35, 'git branch --sort=-committerdate', program(x('git.branch', { mods: [mod('sort', [L('-committerdate')])] }))],
  [36, 'sort access.log | uniq -c | sort -rn | head -n 10', program(pipe(freq([L('access.log')]), x('file.head', { mods: [mod('lines', [L('10')])] })))],
  [37, 'rg ERROR app.log | sort | uniq -c | sort -rn | head -n 10', program(pipe(x('text.search', { args: { pattern: [P('ERROR')], paths: [L('app.log')] } }), freq(), x('file.head', { mods: [mod('lines', [L('10')])] })))],
  [38, 'ps aux | grep redis', program(pipe(x('proc.list'), x('text.search', { args: { pattern: [P('redis')] } })))],
  [39, 'lsof -nP -iTCP:3000 -sTCP:LISTEN', program(x('port.who', { mods: [mod('port', [L('3000')]), mod('listening')] }))],
  [40, 'pkill -x node', program(x('proc.kill', { args: { name: [L('node')] } }))],
  [41, 'pkill -KILL -x python', program(x('proc.kill', { mods: [mod('signal', [L('KILL')])], args: { name: [L('python')] } }))],
  [42, 'curl -g -I https://api.example.com/health', program(x('http.head', { args: { url: [L('https://api.example.com/health')] } }))],
  [43, "curl -g -s 'https://example.com/a?b=1&c=2'", program(x('http.get', { mods: [mod('silent')], args: { url: [L('https://example.com/a?b=1&c=2')] } }))],
  [44, 'curl -g -f -L -O https://example.org/a.tar.gz', program(x('http.download', { mods: [mod('remote_name')], args: { url: [L('https://example.org/a.tar.gz')] } }))],
  [45, "jq -r '.version' package.json", program(x('json.select', { mods: [mod('raw')], args: { filter: [L('.version')], paths: [L('package.json')] } }))],
  [46, "curl -g -s https://api.github.com/repos/a/b | jq '.stargazers_count'", program(pipe(x('http.get', { mods: [mod('silent')], args: { url: [L('https://api.github.com/repos/a/b')] } }), x('json.select', { args: { filter: [L('.stargazers_count')] } })))],
  [47, 'cd ./web && npm run lint && npm test', program(and(pipe(x('npm.run', { args: { script: [L('lint')] } })), pipe(x('npm.test'))), { cwd: L('web') })],
  [48, 'npm test 2>&1 | tail -n 20', program(pipe(x('npm.test', { stderr: 'merge' }), x('file.tail', { mods: [mod('lines', [L('20')])] })))],
  [49, 'npm ls --depth=0', program(x('npm.ls', { mods: [mod('top_level')] }))],
];

for (const [n, bash, ir] of SECTION7) {
  test(`§7 #${n}: ${bash}`, () => {
    const r = decompile(bash, env);
    assert.ok(r.ir, `decompile failed: ${r.error}`);
    assert.equal(toJSON(r.ir), toJSON(canon(ir, { schemas })));
  });
}

test('decompile output is canonical (canon is a fixpoint)', () => {
  for (const [, bash] of SECTION7) {
    const { ir } = decompile(bash, env);
    assert.equal(toJSON(canon(ir, { schemas })), toJSON(ir), bash);
  }
});

const ok = (bash, e = env) => {
  const r = decompile(bash, e);
  assert.ok(r.ir, `${bash}: ${r.error}`);
  return r.ir;
};
const stage = (ir, i = 0, p = 0) => ir.body.parts[p].stages[i];

test('darwin xargs (no -r), git -z transport, inner rg with -H -e', () => {
  const a = ok('rg -l -0 useState . | xargs -0 wc -l --', { ...env, platform: 'darwin_bsd' });
  assert.equal(stage(a, 1).k, 'each');
  const b = ok('git diff --name-only -z | xargs -0 -r rg -H -e TODO --');
  assert.deepEqual(stage(b, 0).mods, [{ mod: 'name_only' }]);
  assert.equal(toJSON(stage(b, 1).exec), toJSON({ k: 'exec', op: 'text.search', mods: [], args: { pattern: [P('TODO')] } }));
});

test('getopt forms: clusters, attached short values, --opt=value, --opt value', () => {
  assert.deepEqual(stage(ok('rg -lw foo')).mods, [{ mod: 'word' }, { mod: 'files_with_matches' }]);
  assert.deepEqual(stage(ok('rg -m3 foo')).mods, [{ mod: 'max_count', values: [L('3')] }]);
  assert.deepEqual(stage(ok('rg --max-depth=2 foo')).mods, [{ mod: 'max_depth', values: [L('2')] }]);
  assert.deepEqual(stage(ok('git log --author alice')).mods, [{ mod: 'author', values: [L('alice')] }]);
  assert.deepEqual(stage(ok("git log --format='%h %s'")).mods, [{ mod: 'format', values: [L('hash_subject')] }]);
});

test('shared flags resolve by value form', () => {
  assert.deepEqual(stage(ok('tail -n +5 a.log')).mods, [{ mod: 'from_line', values: [L('5')] }]);
  assert.deepEqual(stage(ok("rg -g '*.ts' -g '!dist' foo")).mods, [{ mod: 'name_glob', values: [L('*.ts')] }, { mod: 'exclude_glob', values: [L('dist')] }]);
  assert.deepEqual(stage(ok('find . -mtime +3')).mods, [{ mod: 'modified_before_days', values: [L('3')] }]);
  assert.deepEqual(stage(ok('find . -size -100c')).mods, [{ mod: 'size_lt', values: [L('100')] }]);
});

test('find: -iname, or-group, prune or-group, dot_slash root, stderr discard', () => {
  assert.deepEqual(stage(ok("find . -iname '*.md'")).mods, [{ mod: 'ignore_case' }, { mod: 'name_glob', values: [L('*.md')] }]);
  assert.deepEqual(stage(ok("find . \\( -name '*.ts' -o -name '*.js' \\)")).mods, [{ mod: 'any_name', values: [L('*.ts'), L('*.js')] }]);
  assert.deepEqual(stage(ok('find . -type d \\( -name a -o -name b \\) -prune -o -type f -print')).mods,
    [{ mod: 'exclude_dir', values: [L('a'), L('b')] }, { mod: 'type', values: [L('f')] }]);
  const r = ok('find ./-x -type f 2>/dev/null');
  assert.deepEqual(stage(r).args, { paths: [L('-x')] });
  assert.equal(stage(r).stderr, 'discard');
});

test('pkind recovery: grep -E, rg regex, git -F', () => {
  assert.deepEqual(stage(ok("ps aux | grep -E 'a|b'"), 1).args.pattern, [P('a|b', 'regex')]);
  assert.deepEqual(stage(ok("rg 'a.*b' src")).args.pattern, [P('a.*b', 'regex')]);
  assert.deepEqual(stage(ok("git log -F --grep='a.b'")).mods, [{ mod: 'grep_message', values: [P('a.b')] }]);
  assert.deepEqual(stage(ok('rg -e foo -e bar')).args.pattern, [P('foo'), P('bar')]);
});

test('home path and double quotes', () => {
  assert.deepEqual(stage(ok("ls ~/'My Docs'")).args, { paths: [L('~/My Docs')] });
  assert.deepEqual(stage(ok('rg "hello world" src')).args.pattern, [P('hello world')]);
});

const REJECT = [
  ['rg foo > out.txt', 'write_effect'],
  ['rg foo >> out.txt', 'write_effect'],
  ['rg foo < in', 'write_effect'],
  ['rg foo; ls', 'control_flow'],
  ['rg foo || ls', 'control_flow'],
  ['rg foo &', 'control_flow'],
  ['(cd src && ls)', 'control_flow'],
  ['for f in a b; do wc -l $f; done', 'control_flow'],
  ['rg $(cat pat) src', 'unsupported_construct'],
  ['rg `cat pat` src', 'unsupported_construct'],
  ['rg $HOME', 'unsupported_construct'],
  ['rg "a$b"', 'unsupported_construct'],
  ['ls *.ts', 'unsupported_construct'],
  ['ls {a,b}', 'unsupported_construct'],
  ['awk \'{print $1}\' f', 'tool_unsupported'],
  ['rm -rf build', 'tool_unsupported'],
  ['git commit -m x', 'tool_unsupported'],
  ['rg --pre cat foo', 'unsupported_construct'],
  ['rg -P foo', 'unsupported_construct'],
  ['ls -a', 'unsupported_construct'],
  ['find . -delete', 'unsupported_construct'],
  ['find . -exec rm {} ;', 'control_flow'],
  ['find . -name x -exec wc -l {} \\;', 'embedded_program'],
  ['rg -l foo | xargs wc -l', 'unsupported_construct'],
  ['rg -l -0 foo | xargs -0 -I{} wc -l {}', 'unsupported_construct'],
  ['rg -l foo | xargs -0 wc -l', 'unsupported_construct'],
  ['rg -l -0 foo', 'unsupported_construct'],
  ['cd src', 'unsupported_construct'],
  ["grep 'a.*b' f", 'unsupported_construct'],
  ['head -n -5 f', 'unsupported_construct'],
  ["rg 'unterminated", 'unsupported_construct'],
  ['', 'unsupported_construct'],
];

for (const [bash, reason] of REJECT) {
  test(`rejects: ${bash || '<empty>'}`, () => {
    const r = decompile(bash, env);
    assert.ok(r.error, `expected an error, got ${r.ir && toJSON(r.ir)}`);
    assert.ok(OOS_REASONS.includes(r.reason), r.reason);
    assert.equal(r.reason, reason, r.error);
  });
}
