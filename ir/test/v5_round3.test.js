// docs/ir_error_taxonomy_v5.md "v5 round 3 (dev4)": derived -h / -I for "nothing else" matches, implied find -type f
// for file-like names, --date under --oneline, derived --format= for "just the file names" of commits, wc FILE for a
// bare-number cue, a bare-name prune for "X in the name". Items run decompile(command) -> lift -> gate.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas, gate, decompile, lift } from '../lib/index.js';
import { requestWantsNamesOnlyR3 } from '../lib/compile.js';

const schemas = loadSchemas();
function check(request, command, platform = 'linux_gnu') {
  const env = { schemas, shell: 'bash', platform, request };
  const d = decompile(command, env);
  assert.ok(!d.error, `decompile ${command}: ${d.error}`);
  let ir;
  try { ir = lift(schemas, d.ir, request); } catch (e) { return { accept: false, reasons: [e.message] }; }
  return gate(request, ir, env);
}
const ok = (request, command, want, platform) => {
  const r = check(request, command, platform);
  assert.equal(r.accept, true, `${request} -> ${command}: ${(r.reasons || []).join(' / ')}`);
  if (want) assert.equal(r.command, want);
};
const no = (request, command, re) => {
  const r = check(request, command);
  assert.equal(r.accept, false, `expected a reject: ${request} -> ${command}`);
  assert.match(r.reasons.join(' / '), re);
};

test('r3-a: "nothing else" / "only the matched text" over several files derives -h / -I', () => {
  ok('grep the matched text of user_id under tmp, nothing else', 'grep -r -o user_id tmp', 'grep -r -o -h user_id tmp');
  ok('just the matches of uuid in logs', 'rg -o uuid logs', 'rg -o -I uuid logs');
  // no cue, a single file or stdin keep the prefix rule as before
  ok('the matched text of user_id in app.log, nothing else', 'rg -o user_id app.log', 'rg -o user_id app.log');
  ok('grep the matched text of user_id under tmp', 'grep -r -o user_id tmp', 'grep -r -o user_id tmp');
  ok('only the matched text of ERROR from the last 50 lines of app.log', 'tail -n 50 app.log | grep -o ERROR', 'tail -n 50 app.log | grep -o ERROR');
});

test('r3-b: find with file-like names implies -type f unless directories are mentioned', () => {
  ok('case-insensitively match *.CSS or *.TSX under pkg', "find pkg \\( -iname '*.CSS' -o -iname '*.TSX' \\)", "find pkg -type f \\( -iname '*.CSS' -o -iname '*.TSX' \\)", 'darwin_bsd');
  ok('print paths in ansible/roles/web for cache.java or fixtures.cs, ignore case', "find ansible/roles/web \\( -iname 'cache.java' -o -iname 'fixtures.cs' \\)",
    "find ansible/roles/web -type f \\( -iname 'cache.java' -o -iname 'fixtures.cs' \\)");
  ok('anything named *build* under src', "find src -name '*build*'", "find src -name '*build*'");
  ok('anything named *.d under etc', "find etc -name '*.d'", "find etc -name '*.d'");
  ok('folders and files matching *.app under Applications', "find Applications -name '*.app'", "find Applications -name '*.app'");
});

test('r3-c: --date with --oneline is rejected', () => {
  no('What does the first-parent history of main look like with relative dates, one per line?', 'git log --oneline --first-parent --date=relative main --', /oneline_date/);
  ok('first-parent history of main, one per line', 'git log --oneline --first-parent main --');
});

test('r3-d: just the file names of commits derive --format=', () => {
  ok('just file names touched by non-merge commits by erin in the last 90 days', "git log --author=erin --since='90 days ago' --no-merges --name-only",
    "git log --author=erin --since='90 days ago' --no-merges --name-only --format=");
  ok('only the file names from commits in 9f8e7d6..HEAD under data/raw', 'git log --name-only 9f8e7d6..HEAD -- data/raw', 'git log --name-only --format= 9f8e7d6..HEAD -- data/raw');
  assert.equal(requestWantsNamesOnlyR3('only the file names for each commit since v2'), false);
  assert.equal(requestWantsNamesOnlyR3('just file names with the commits by erin'), false);
  assert.equal(requestWantsNamesOnlyR3('names only for commits by erin'), false);
  ok('names only for commits by erin', 'git log --author=erin --name-only', 'git log --author=erin --name-only');
});

test('r3-e: wc FILE for a bare-number cue is rejected', () => {
  no('need byte count of Procfile, nothing else', 'wc -c Procfile', /wc_bare_number/);
  no('line count of app.log, just the number', 'wc -l app.log', /wc_bare_number|bare_output/);
  ok('need byte count of Procfile', 'wc -c Procfile', 'wc -c Procfile');
  ok('how many lines mention TODO in app.log, just the number', 'rg TODO app.log | wc -l');
});

test('r3-f: a prune of the bare name for "X in the name" is rejected', () => {
  no('scss files under components/forms, leaving out any with legacy in the name', "find components/forms -type d -name legacy -prune -o -type f -name '*.scss' -print", /name_contains/);
  ok('scss files under components/forms, leaving out any with legacy in the name', "find components/forms -type f -name '*.scss' -not -name '*legacy*'");
  ok('scss files under components/forms, skipping the legacy directory', "find components/forms -type d -name legacy -prune -o -type f -name '*.scss' -print");
});

test('round-3 review: any-type wording keeps find without -type f', () => {
  ok('find anything named *.css', "find . -name '*.css'", "find . -name '*.css'");
  ok('list any entries called cache.java under src', "find src -name 'cache.java'", "find src -name 'cache.java'");
  ok('find all entries matching *.so in lib', "find lib -name '*.so'", "find lib -name '*.so'");
  ok('find style.css', "find . -name 'style.css'", "find . -type f -name 'style.css'");
});

test('round-3 review: names-only --format= not when authors / dates / hashes are asked for', () => {
  ok('show commits since last week with relative dates, just the file names', "git log --since='1 week ago' --date=relative --name-only",
    "git log --since='1 week ago' --name-only --date=relative");
  // the older requestWantsNamesOnly path must not drop requested dates either
  ok('show commits with relative dates, just the file names', 'git log --date=relative --name-only',
    'git log --name-only --date=relative');
  assert.equal(requestWantsNamesOnlyR3('commits by author with just the file names'), false);
  assert.equal(requestWantsNamesOnlyR3('commits with hashes, just the file names'), false);
  ok('show commits since last week, just the file names', "git log --since='1 week ago' --name-only", "git log --since='1 week ago' --name-only --format=");
});

test('round-3 review: wc_bare_number covers each stages and ignores quoted operands', () => {
  no('count lines in every .py file, just the number', "find . -name '*.py' -exec wc -l {} +", /wc_bare_number/);
  ok("count bytes in the file named 'nothing else'", "wc -c 'nothing else'", "wc -c 'nothing else'");
});
