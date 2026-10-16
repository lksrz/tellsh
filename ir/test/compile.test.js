import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  loadSchemas, compile, fromJSON, program, pipe, exec, each, freq, mod, lit, span, abstain,
} from '../lib/index.js';
import { quote, renderWord } from '../lib/compile.js';

const schemas = loadSchemas();
const examples = JSON.parse(readFileSync(new URL('./fixtures/examples.json', import.meta.url), 'utf8'));
const env = (o = {}) => ({ schemas, shell: 'bash', platform: 'linux_gnu', ...o });
const text = (ir, o) => {
  const r = compile(ir, env(o));
  assert.ok(!r.error, `unexpected error: ${r.error}`);
  return r.text;
};
const err = (ir, o) => compile(ir, env(o));
const ts = (mods, args, o = {}) => exec('text.search', { mods, args, ...o });

test('every ok §7 example compiles to exactly the listed bash (and zsh: same bytes)', () => {
  assert.ok(examples.length >= 47);
  for (const ex of examples) {
    const ir = fromJSON(ex.ir);
    for (const shell of ['bash', 'zsh']) {
      const r = compile(ir, env({ shell, platform: ex.os, request: ex.request }));
      assert.equal(r.error, undefined, `#${ex.n} ${ex.request}: ${r.error}`);
      assert.equal(r.text, ex.bash, `#${ex.n} ${ex.request} (${shell}, ${ex.os})`);
    }
  }
});

test('determinism: repeated compiles are byte-identical, plan included', () => {
  for (const ex of examples) {
    const ir = fromJSON(ex.ir);
    const a = compile(ir, env({ platform: ex.os, request: ex.request }));
    const b = compile(structuredClone(ir), env({ platform: ex.os, request: ex.request }));
    assert.equal(JSON.stringify(a.plan), JSON.stringify(b.plan));
    assert.equal(a.text, b.text);
  }
});

test('platform differences: xargs -r and grep null flag', () => {
  const ir = program(pipe(ts([mod('files_with_matches')], { pattern: [lit('x')] }, { pin: 'grep' }), each(exec('file.count', { mods: [mod('lines')] }))));
  assert.equal(text(ir), 'grep -r -l -Z x . | xargs -0 -r wc -l --');
  assert.equal(text(ir, { platform: 'darwin_bsd' }), 'grep -r -l --null x . | xargs -0 wc -l --');
  const ps = program(exec('proc.list', { mods: [mod('sort_cpu')] }));
  assert.equal(text(ps), 'ps aux --sort=-%cpu');
  assert.equal(err(ps, { platform: 'darwin_bsd' }).label, 'env_unsupported');
});

test('each inner rg: -H, patterns as -e, trailing --', () => {
  const ir = program(pipe(exec('files.find', { mods: [mod('name_glob', [lit('*.md')])] }), each(ts([], { pattern: [lit('TODO')] }))));
  assert.equal(text(ir), "find . -name '*.md' -exec rg -H -e TODO -- {} +");
  const ir2 = program(pipe(exec('git.diff', { mods: [mod('name_only')] }), each(exec('file.head', { mods: [mod('lines', [lit('3')])] }))));
  assert.equal(text(ir2), 'git diff --name-only -z | xargs -0 -r head -n 3 --');
});

test('each legality: endless inner, lines producer, filtered paths', () => {
  assert.equal(err(program(pipe(exec('files.find'), each(exec('file.tail', { mods: [mod('follow')] }))))).label, 'gate_reject');
  assert.equal(err(program(pipe(exec('git.log'), each(exec('file.count', { mods: [mod('lines')] }))))).label, 'gate_reject');
  assert.equal(err(program(pipe(exec('dir.list'), each(exec('file.count', { mods: [mod('lines')] }))))).label, 'gate_reject');
});

test('find: prune with several names, or-group with -iname, print with prune', () => {
  const ir = program(exec('files.find', { mods: [
    mod('exclude_dir', [lit('node_modules'), lit('.git')]), mod('ignore_case'),
    mod('any_name', [lit('*.ts'), lit('*.tsx')]),
  ] }));
  assert.equal(text(ir), "find . -type d \\( -name node_modules -o -name .git \\) -prune -o \\( -iname '*.ts' -o -iname '*.tsx' \\) -print");
  assert.deepEqual(compile(ir, env()).plan.parts[0].stages[0].argv.find((w) => w.text === '('), { text: '(', kind: 'raw', render: '\\(' });
  assert.equal(text(program(exec('files.find', { args: { paths: [lit('-x')] } }))), 'find ./-x');
});

test('quoting: bare set, single quotes, tilde prefix, empty, always-quoted types', () => {
  assert.equal(quote('a-b_c/d.e:f,g@h%i+j'), 'a-b_c/d.e:f,g@h%i+j');
  for (const s of ['a=b', '~x', 'a^b', '#x', '!x', '*', '?', '[a]', '{a}', '$x', 'a b', ';', '&', '|', '<', '>', '"', '`'])
    assert.equal(quote(s)[0], "'", s);
  assert.equal(quote(''), "''");
  assert.equal(quote("it's"), "'it'\\''s'");
  assert.equal(renderWord({ text: '~/My Docs/x', kind: 'tilde_prefix' }), "~/'My Docs/x'");
  assert.equal(renderWord({ text: '~', kind: 'tilde_prefix' }), '~');
  assert.equal(text(program(exec('dir.list', { args: { paths: [lit('~/Downloads')] } }))), 'ls ~/Downloads');
  assert.equal(text(program(exec('file.head', { mods: [mod('lines', [lit('1')])], args: { paths: [lit('a b'), lit("$(rm -rf ~)")] } }))), "head -n 1 'a b' '$(rm -rf ~)'");
});

test('dash safety', () => {
  assert.equal(text(program(exec('file.head', { mods: [mod('lines', [lit('1')])], args: { paths: [lit('-rf')] } }))), 'head -n 1 -- -rf');
  assert.equal(text(program(ts([], { pattern: [lit('a'), lit('b')], paths: [lit('-x')] }))), 'rg -e a -e b -- -x');
  assert.equal(err(program(exec('files.find', { mods: [mod('newer', [lit('-x')])] }))).label, 'unsafe_value');
  assert.equal(err(program(exec('npm.run', { args: { script: [lit('-x')] } }))).label, 'unsafe_value');
  assert.equal(text(program(exec('git.log', { args: { paths: [lit('-p')] } }))), 'git log -- -p');
});

test('unsafe values: control, bidi, zero-width characters', () => {
  for (const s of ['a\nb', 'a‮b', 'a​b', 'a\x00b', 'a\tb'])
    assert.equal(err(program(ts([], { pattern: [lit(s)] }))).label, 'unsafe_value', JSON.stringify(s));
});

test('pattern kinds: -F/-E derivation and literal escaping beside a regex', () => {
  assert.equal(text(program(ts([], { pattern: [lit('^a', 'regex'), lit('b.c')] }))), "rg -e '^a' -e 'b\\.c' .");
  const g = program(pipe(exec('proc.list'), ts([], { pattern: [lit('a+', 'regex')] })));
  assert.equal(text(g), 'ps aux | grep -E a+');
  const gl = program(exec('git.log', { mods: [mod('author', [lit('a.b')]), mod('grep_message', [lit('fix|feat', 'regex')])] }));
  assert.equal(text(gl), "git log -E --author='a\\.b' --grep='fix|feat'");
  assert.equal(text(program(exec('git.log', { mods: [mod('grep_message', [lit('a.b')])] }))), 'git log -F --grep=a.b');
});

test('line-buffered for text.search on endless input with piped stdout', () => {
  const ir = program(pipe(exec('file.tail', { mods: [mod('follow')], args: { paths: [lit('x.log')] } }), ts([], { pattern: [lit('E')] }), exec('file.head', { mods: [mod('lines', [lit('5')])] })));
  assert.equal(text(ir), 'tail -f x.log | grep --line-buffered E | head -n 5');
  const last = program(pipe(exec('file.tail', { mods: [mod('follow')], args: { paths: [lit('x.log')] } }), ts([], { pattern: [lit('E')] })));
  assert.equal(text(last), 'tail -f x.log | grep E');
});

test('stream legality and invariant 8', () => {
  assert.equal(err(program(exec('file.count', { mods: [mod('lines')] }))).label, 'gate_reject');
  assert.equal(err(program(pipe(exec('git.log'), exec('file.count', { mods: [mod('lines')], args: { paths: [lit('f')] } })))).label, 'gate_reject');
  assert.equal(err(program(pipe(exec('git.log'), exec('git.status')))).label, 'gate_reject');
  assert.equal(err(program(pipe(exec('git.log'), ts([mod('files_with_matches')], { pattern: [lit('x')] })))).label, 'gate_reject');
  assert.equal(err(program(pipe(freq(), exec('file.head', { mods: [mod('lines', [lit('1')])] })))).label, 'gate_reject');
  assert.equal(err(program(pipe(exec('lines.sort', { args: { paths: [lit('f')] } }), freq()))).label, 'gate_reject');
});

test('stderr modes only where the op allows them', () => {
  assert.equal(text(program(exec('files.find', { stderr: 'discard' }))), 'find . 2>/dev/null');
  assert.equal(err(program(exec('git.log', { stderr: 'merge' }))).label, 'gate_reject');
});

test('cwd rendering', () => {
  const mk = (c) => program(exec('git.status'), { cwd: lit(c) });
  assert.equal(text(mk('-x')), 'cd ./-x && git status');
  assert.equal(text(mk('/tmp/a b')), "cd '/tmp/a b' && git status");
  assert.equal(text(mk('~/proj')), 'cd ~/proj && git status');
});

test('environment: missing rg is env_unsupported (never a silent grep), versions', () => {
  const ir = program(ts([], { pattern: [lit('x')] }));
  const r = err(ir, { tools: { grep: '3.11' } });
  assert.equal(r.label, 'env_unsupported');
  assert.match(r.error, /with grep/);
  assert.equal(text(ir, { tools: { rg: '14.1.0' } }), 'rg x .');
  assert.equal(err(ir, { tools: { rg: '12.1.1' } }).label, 'env_unsupported');
  assert.equal(err(program(exec('git.branch', { mods: [mod('show_current')] })), { tools: { git: '2.20.1' } }).label, 'env_unsupported');
  assert.equal(err(ir, { shell: 'fish' }).label, 'env_unsupported');
});

test('derived/compiler mods are never accepted from the IR; abstentions never render', () => {
  assert.equal(err(program(ts([mod('fixed_strings')], { pattern: [lit('x')] }))).label, 'gate_reject');
  assert.equal(err(program(ts([mod('null'), mod('files_with_matches')], { pattern: [lit('x')] }))).label, 'gate_reject');
  const a = compile(abstain('underspecified', { missing: ['pattern'] }), env());
  assert.equal(a.label, 'underspecified');
  assert.equal(a.text, undefined);
});

test('limits: real commands per pipe after macro expansion', () => {
  const h = () => exec('file.head', { mods: [mod('lines', [lit('1')])] });
  const ir = program(pipe(ts([], { pattern: [lit('x')], paths: [lit('f')] }), freq(), freq(), h()));
  assert.equal(err(ir).label, 'gate_reject');
});

test('spans and norms resolve against the request', () => {
  const request = 'search for TODO in src';
  const ir = program(ts([], { pattern: [span(2, 3, 'Pattern')], paths: [span(4, 5, 'Path')] }));
  assert.equal(text(ir, { request }), 'rg TODO src');
  assert.equal(err(ir).label, 'gate_reject');
});
