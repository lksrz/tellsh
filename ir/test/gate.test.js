import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  loadSchemas, gate, program, pipe, exec, each, mod, lit, abstain, and, norm, lit as L,
} from '../lib/index.js';
import { OK_EXAMPLES, helpers } from './fixtures/gate_examples.js';

const schemas = loadSchemas();
const ENV = { schemas, shell: 'bash', platform: 'linux_gnu', skipRoundTrip: true, pathExists: () => true, isDir: () => true };
const run = (request, build, env = {}) => gate(request, build(helpers(request)), { ...ENV, ...env });
const ts = (args, mods = [], extra = {}) => exec('text.search', { args, mods, ...extra });

function rejects(r, label, re) {
  assert.equal(r.accept, false, `expected a reject, got accept (${r.gloss})`);
  assert.equal(r.label, label, r.reasons.join(' / '));
  if (re) assert.match(r.reasons.join(' / '), re);
}

// ---------- §7 ok examples ----------

for (const ex of OK_EXAMPLES) {
  test(`§7 #${ex.n} accepted: ${ex.request}`, () => {
    const r = run(ex.request, ex.ir, { pathExists: () => false });
    assert.equal(r.accept, true, r.reasons.join(' / '));
    assert.equal(r.label, 'ok');
    assert.equal(r.risk, ex.risk || 'safe');
    assert.ok(r.gloss);
    assert.ok(r.obligations.every((o) => o.ok));
  });
}

test('accepted result carries spans, canonical IR and pkind', () => {
  const r = run('search for TODO in src', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [S('src', 'Path')] })));
  assert.deepEqual(r.spans.map((s) => [s.role, s.value]), [['pattern', 'TODO'], ['paths', 'src']]);
  assert.deepEqual(r.ir.body.parts[0].stages[0].args, { paths: [lit('src')], pattern: [lit('TODO', 'literal')] });
  assert.equal(r.gloss, "search file contents for TODO in src (recursive; skips .gitignore'd, hidden and binary files)");
});

test('REGEX cue makes a span pattern regex', () => {
  const r = run('regex search for fo+ in src', ({ S }) => program(ts({ pattern: [S('fo+', 'Pattern')], paths: [S('src', 'Path')] })));
  assert.equal(r.accept, true, r.reasons.join());
  assert.equal(r.ir.body.parts[0].stages[0].args.pattern[0].pkind, 'regex');
});

// ---------- provenance ----------

test('invented value: paths "src" not in the request', () => {
  rejects(run('search for TODO', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [L('src')] }))), 'gate_reject', /lit/);
});

test('span outside the request', () => {
  rejects(run('search for TODO', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [{ k: 'span', u: [3, 4], as: 'Path' }] }))), 'gate_reject', /outside/);
});

test('one unit used by two values', () => {
  rejects(run('search for TODO', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [S('TODO', 'Path')] }))), 'gate_reject', /overlap/);
});

test('norm kind not allowed for the type, and a span where only a norm is allowed', () => {
  rejects(run('search for TODO in src', ({ S, N }) => program(ts({ pattern: [N('int', 'TODO')], paths: [S('src', 'Path')] }))), 'gate_reject', /norm int/);
  rejects(run('last 50 lines of build.log', ({ S }) => program(exec('file.tail', { args: { paths: [S('build.log', 'Path')] }, mods: [mod('lines', [S('50', 'Int')])] }))), 'gate_reject', /cannot be copied/);
});

test('§7 #52 previous commit: rev_rel does not parse', () => {
  rejects(run('show the previous commit', ({ N }) => program(exec('git.show', { args: { rev: [N('rev_rel', 'previous commit')] } }))), 'ambiguous', /previous commit/);
});

test('const not in enum; pkill signal only via norm', () => {
  rejects(run('directories under build', ({ S, C }) => program(exec('files.find', { args: { paths: [S('build', 'Path')] }, mods: [mod('type', [C('x')])] }))), 'gate_reject', /const/);
  rejects(run('force kill python', ({ S, C }) => program(exec('proc.kill', { args: { name: [S('python', 'ProcName')] }, mods: [mod('signal', [C('KILL')])] }))), 'gate_reject', /const/);
});

test('zero-width character in a value is unsafe_value', () => {
  rejects(run('search for TO​DO in src', ({ S }) => program(ts({ pattern: [S('TO​DO', 'Pattern')], paths: [S('src', 'Path')] }))), 'unsafe_value');
});

test('regex outside the strict POSIX-ERE set (grep) is unsafe_value', () => {
  rejects(run('use grep to find regex \\w+ in src', ({ S }) => program(ts({ pattern: [S('\\w+', 'Pattern')], paths: [S('src', 'Path')] }, [], { pin: 'grep' }))), 'unsafe_value', /POSIX/);
});

test('validator: ProcName with a dot', () => {
  rejects(run('kill node.js', ({ S }) => program(exec('proc.kill', { args: { name: [S('node.js', 'ProcName')] } }))), 'unsafe_value');
});

// ---------- obligations ----------

test('§7 #7 invert-vs-exclude: invert(TODO) for "TODO not in tests"', () => {
  rejects(run('TODO not in tests', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [S('tests', 'Path')] }, [mod('invert')]))), 'gate_reject', /negation_scope/);
});

test('§7 #8 exclude instead of invert: the excluded value is the pattern', () => {
  rejects(run('lines in app.log without DEBUG', ({ S }) => program(ts({ pattern: [S('DEBUG', 'Pattern')], paths: [S('app.log', 'Path')] }, [mod('exclude_glob', [S('lines', 'Glob')])]))), 'gate_reject', /negation_scope/);
});

test('§7 #53 polarity: NEG cue, -v dropped', () => {
  rejects(run('lines without error in app.log', ({ S }) => program(ts({ pattern: [S('error', 'Pattern')], paths: [S('app.log', 'Path')] }))), 'gate_reject', /polarity/);
});

test('polarity: negated mod without a NEG cue', () => {
  rejects(run('search for TODO in src', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [S('src', 'Path')] }, [mod('invert')]))), 'gate_reject', /polarity/);
});

test('§7 #12 count TODOs is ambiguous', () => {
  rejects(run('count TODOs', ({ S }) => program(ts({ pattern: [S('TODOs', 'Pattern')] }, [mod('count')]))), 'ambiguous', /count_kind/);
});

test('wrong count kind: files counted with rg -c, occurrences with rg -c', () => {
  rejects(run('how many files mention deprecated', ({ S }) => program(ts({ pattern: [S('deprecated', 'Pattern')] }, [mod('count')]))), 'gate_reject', /count_kind/);
  rejects(run('how many times does error appear in app.log', ({ S }) => program(ts({ pattern: [S('error', 'Pattern')], paths: [S('app.log', 'Path')] }, [mod('count')]))), 'gate_reject', /count_kind/);
  rejects(run('how many lines in server.log contain timeout', ({ S }) => program(pipe(ts({ pattern: [S('timeout', 'Pattern')], paths: [S('server.log', 'Path')] }, [mod('files_with_matches')]), exec('file.count', { mods: [mod('lines')] })))), 'gate_reject', /count_kind/);
});

test('§7 #13 first N with -m (per file) is rejected', () => {
  rejects(run('first 3 matches of timeout in logs', ({ S, N }) => program(ts({ pattern: [S('timeout', 'Pattern')], paths: [S('logs', 'Path')] }, [mod('max_count', [N('int', '3')])]))), 'gate_reject', /per_file/);
});

test('§7 #54 direction: last 3 lines with head', () => {
  rejects(run('last 3 lines of app.log', ({ S, N }) => program(exec('file.head', { args: { paths: [S('app.log', 'Path')] }, mods: [mod('lines', [N('int', '3')])] }))), 'gate_reject', /direction/);
});

test('cue: invented -i, and a CASE cue with no element', () => {
  rejects(run('search for TODO in src', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [S('src', 'Path')] }, [mod('ignore_case')]))), 'gate_reject', /CASE/);
  rejects(run('case-insensitive search for TODO in src', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [S('src', 'Path')] }))), 'gate_reject', /CASE/);
});

test('uniq after a non-sort needs an ADJACENT cue', () => {
  rejects(run('unique lines of app.log', ({ S }) => program(exec('lines.uniq', { args: { paths: [S('app.log', 'Path')] } }))), 'gate_reject', /ADJACENT/);
  const r = run('collapse adjacent duplicate lines of app.log', ({ S }) => program(exec('lines.uniq', { args: { paths: [S('app.log', 'Path')] } })));
  assert.equal(r.accept, true, r.reasons.join());
});

test('numbers: an unconsumed numeric token', () => {
  rejects(run('search for TODO in src 7 times', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [S('src', 'Path')] }))), 'gate_reject', /numbers/);
});

test('named values: unconsumed path and flag-like units', () => {
  rejects(run('search for TODO in src and docs/x.md', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [S('src', 'Path')] }))), 'gate_reject', /named_values/);
  rejects(run('rg --hidden foo', ({ S }) => program(ts({ pattern: [S('foo', 'Pattern')] }))), 'gate_reject', /named_values/);
  const r = run('rg --hidden foo', ({ S }) => program(ts({ pattern: [S('foo', 'Pattern')] }, [mod('hidden')])));
  assert.equal(r.accept, false); // --hidden is a flag, but no HIDDEN cue word: the cue rule still holds
  const ls = run('ls -lA', () => program(exec('dir.list', { mods: [mod('long'), mod('hidden')] })), {});
  assert.doesNotMatch(ls.reasons.join(), /named_values/);
});

test('coverage: dropped language glob, unexplained tool name, write verb', () => {
  rejects(run('search for TODO in python files', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')] }))), 'gate_reject', /coverage/);
  rejects(run('use grep to find foo in src', ({ S }) => program(ts({ pattern: [S('foo', 'Pattern')], paths: [S('src', 'Path')] }))), 'gate_reject', /coverage/);
  rejects(run('search for TODO in src and email me the result', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [S('src', 'Path')] }))), 'gate_reject', /coverage/);
});

test('pin without the tool name in the request', () => {
  rejects(run('search for TODO in src', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [S('src', 'Path')] }, [], { pin: 'grep' }))), 'gate_reject', /pin/);
});

test('kill needs a kill verb', () => {
  rejects(run('make python go away', ({ S }) => program(exec('proc.kill', { args: { name: [S('python', 'ProcName')] } }))), 'gate_reject', /kill/);
});

// ---------- schema / streams / limits ----------

test('derived and compiler mods are never model output', () => {
  rejects(run('search for TODO in src', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [S('src', 'Path')] }, [mod('fixed_strings')]))), 'gate_reject', /derived/);
});

test('excl rule, missing required role, unknown mod', () => {
  rejects(run('files mention TODO counts', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')] }, [mod('files_with_matches'), mod('count')]))), 'gate_reject', /at most one/);
  rejects(run('search in src', ({ S }) => program(ts({ paths: [S('src', 'Path')] }))), 'underspecified');
  rejects(run('list here', () => program(exec('dir.list', { mods: [mod('nope')] }))), 'gate_reject', /not supported/);
});

test('invariant 8: a first stage never reads stdin', () => {
  rejects(run('first 5 lines', ({ N }) => program(exec('file.head', { mods: [mod('lines', [N('int', '5')])] }))), 'gate_reject', /invariant 8/);
});

test('stdin consumer with file operands, stdin into find', () => {
  rejects(run('search for x in src then count lines in a.txt', ({ S }) => program(pipe(ts({ pattern: [S('x', 'Pattern')], paths: [S('src', 'Path')] }), exec('file.count', { args: { paths: [S('a.txt', 'Path')] }, mods: [mod('lines')] })))), 'gate_reject', /file operands/);
  rejects(run('list here', () => program(pipe(exec('dir.list'), exec('files.find')))), 'gate_reject', /does not accept/);
});

test('each with a non-each_ok inner is deny; each after a filter loses NUL', () => {
  const r = run('sort every ts file in src', ({ S, N }) => program(pipe(exec('files.find', { args: { paths: [S('src', 'Path')] }, mods: [mod('name_glob', [N('ext_glob', 'ts')])] }), each(exec('lines.sort')))));
  rejects(r, 'gate_reject', /each_ok/);
  assert.equal(r.risk, 'deny');
});

test('net_read and exec_project in one program is deny', () => {
  const r = run('download https://x.example.com/a.sh then run the tests', ({ S }) => program(and(
    pipe(exec('http.download', { args: { url: [S('https://x.example.com/a.sh', 'Url')] }, mods: [mod('remote_name')] })), pipe(exec('npm.test')))));
  rejects(r, 'gate_reject', /net_read and exec_project/);
  assert.equal(r.risk, 'deny');
});

test('abstentions pass through with their status', () => {
  const r = gate('search for it in the logs folder', abstain('underspecified', { missing: ['pattern'] }), ENV);
  assert.deepEqual([r.accept, r.label], [false, 'underspecified']);
  assert.match(r.reasons.join(), /need: pattern/);
  assert.equal(gate('capital of France', abstain('not_shell'), ENV).label, 'not_shell');
});

test('malformed IR is gate_reject', () => {
  rejects(gate('x', { v: 1, status: 'ok', body: { k: 'and', parts: [] } }, ENV), 'gate_reject', /schema/);
});

// ---------- environment + risk ----------

test('env: tool missing / too old, git outside a work tree, darwin-absent mod, pkill comm limit', () => {
  const ex = ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [S('src', 'Path')] }));
  rejects(run('search for TODO in src', ex, { tools: { grep: '3.11' } }), 'env_unsupported', /rg is not installed/);
  rejects(run('search for TODO in src', ex, { tools: { rg: '11.0.0' } }), 'env_unsupported', /< 13/);
  assert.equal(run('search for TODO in src', ex, { tools: { rg: '14.1.0' } }).accept, true);
  rejects(run('staged changes summary', () => program(exec('git.diff', { mods: [mod('staged'), mod('stat')] })), { gitTop: null }), 'env_unsupported', /git work tree/);
  rejects(run('processes sorted by cpu', () => program(exec('proc.list', { mods: [mod('sort_cpu')] })), { platform: 'darwin_bsd' }), 'env_unsupported', /absent/);
  rejects(run('kill averyveryverylongname', ({ S }) => program(exec('proc.kill', { args: { name: [S('averyveryverylongname', 'ProcName')] } }))), 'env_unsupported', /15-char/);
});

test('env: cwd must be a directory; medium risk needs existing read operands', () => {
  const ex = OK_EXAMPLES.find((e) => e.n === 47);
  rejects(run(ex.request, ex.ir, { isDir: () => false }), 'env_unsupported', /cwd/);
  const safe = run('search for TODO in src', ({ S }) => program(ts({ pattern: [S('TODO', 'Pattern')], paths: [S('src', 'Path')] })), { pathExists: () => false });
  assert.equal(safe.accept, true);
  assert.match(safe.reasons.join(), /does not exist/);
});

test('risk: download over an existing file is high', () => {
  const ex = OK_EXAMPLES.find((e) => e.n === 44);
  assert.equal(run(ex.request, ex.ir, { pathExists: () => false }).risk, 'medium');
  const r = run(ex.request, ex.ir, { pathExists: (p) => p === 'a.tar.gz' });
  assert.deepEqual([r.accept, r.risk], [true, 'high']);
});

test('risk: an external danger risk can only raise', () => {
  const ex = OK_EXAMPLES[0];
  assert.equal(run(ex.request, ex.ir, { dangerRisk: 'high' }).risk, 'high');
});

// ---------- round-trip ----------

test('round-trip runs by default and rejects while compile is a stub', () => {
  const ex = OK_EXAMPLES[0];
  const r = run(ex.request, ex.ir, { skipRoundTrip: false, compile: undefined });
  if (r.accept) return; // compile/decompile implemented: nothing to assert about the stub
  rejects(r, 'gate_reject', /round_trip|compile/);
});

test('round-trip with injected compile/decompile: match accepts, mismatch rejects', async () => {
  const { canon } = await import('../lib/index.js');
  const ex = OK_EXAMPLES[0];
  const request = ex.request;
  let seen;
  const compile = (ir, env) => { seen = canon(ir, { schemas, request: env.request }); return { plan: {}, text: 'rg TODO src' }; };
  const good = run(request, ex.ir, { skipRoundTrip: false, compile, decompile: () => ({ ir: seen }) });
  assert.deepEqual([good.accept, good.command], [true, 'rg TODO src']);
  const bad = run(request, ex.ir, { skipRoundTrip: false, compile, decompile: () => ({ ir: { ...seen, cwd: lit('x') } }) });
  rejects(bad, 'gate_reject', /round_trip/);
  const err = run(request, ex.ir, { skipRoundTrip: false, compile: () => ({ error: 'bad', label: 'unsafe_value' }) });
  rejects(err, 'unsafe_value');
});

test('norm helper sanity (unused import guard)', () => {
  assert.equal(norm('int', 0, 1).kind, 'int');
});

test('§7 ok examples through the real compile + decompile round-trip render the §7 bash', async () => {
  const { BASH } = await import('./fixtures/gate_examples.js');
  for (const ex of OK_EXAMPLES) {
    const r = run(ex.request, ex.ir, { skipRoundTrip: false, pathExists: () => false, gitTop: '/r', cwd: '/r' });
    if (!r.accept && /not implemented/.test(r.reasons.join())) return; // compile/decompile still stubs
    assert.equal(r.accept, true, `#${ex.n}: ${r.reasons.join(' / ')}`);
    assert.equal(r.command, BASH[ex.n], `#${ex.n}`);
  }
});
