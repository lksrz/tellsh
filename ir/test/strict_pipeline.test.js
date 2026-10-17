// Regression tests for ir/lib/strict_pipeline.js and the WP3 MOD_WORDS narrowing in strict.js
// (docs/ir_error_taxonomy_v4.md fixes 5, 10, 13-16): the judged-wrong prediction is rejected, the gold
// phrasing is still accepted. Same decompile -> lift -> gate round-trip as strict.test.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSchemas, gate, decompile, lift } from '../lib/index.js';

const schemas = loadSchemas();
function check(request, command) {
  const env = { schemas, shell: 'bash', platform: 'linux_gnu', request };
  const d = decompile(command, env);
  assert.ok(!d.error, `decompile ${command}: ${d.error}`);
  let ir;
  try { ir = lift(schemas, d.ir, request); } catch (e) { return { accept: false, label: 'provenance', reasons: [e.message] }; }
  return gate(request, ir, env);
}
const ok = (request, command) => {
  const r = check(request, command);
  assert.equal(r.accept, true, `${request} -> ${command}: ${r.reasons.join(' / ')}`);
};
const no = (request, command, re) => {
  const r = check(request, command);
  assert.equal(r.accept, false, `expected a reject: ${request} -> ${command}`);
  if (re) assert.match(r.reasons.join(' / '), re);
};

test('10. operand kinds: sort / ls / rg on the wrong kind of operand', () => {
  no('list /etc/nginx in reverse order', 'sort -r /etc/nginx', /lists a directory/);
  ok('list .env.example lines sorted numerically', 'sort -n .env.example');
  no('reverse human sizes of cache/sizes.txt', 'ls -lhr cache/sizes.txt', /is a file/);
  ok('newest first long listing of the .expo folder', 'ls -lt .expo');
  no('show the start of features/user_agg.csv', 'ls features/user_agg.csv', /prints only its name/);
  ok('list the file src/main.rs', 'ls src/main.rs');
  no('case insensitive search for handler.md under lib', 'rg -F -i handler.md lib', /file name/);
  ok('console.log in plugins, skip rst files', "rg -F -g '!*.rst' console.log plugins");
  no('list files with User in the name under app/Models', 'rg -l User app/Models', /file names/);
  no('line 88 of include/ring.h', 'rg 88 include/ring.h', /line number/);
  ok('from line 14 of notes.md', 'tail -n +14 notes.md');
});

test('13. search output mode and counts', () => {
  no('first 200 bytes of the matches for webhookSecret in config', 'rg -o webhookSecret config | head -c 200', /only_matching/);
  ok('Print only the regex matches of user_[0-9]+ inside api/v2.', "rg -o 'user_[0-9]+' api/v2");
  no('useRef in tsx files under packages/web', "rg -l -g '*.tsx' useRef packages/web", /files_with_matches/);
  ok('list php files under app/Http/Controllers that mention dispatch', "rg -l -g '*.php' dispatch app/Http/Controllers");
  ok('grep files-with-matches for deserialize in go files under backend/app/models', "grep -r -l --include='*.go' deserialize backend/app/models");
  no('grep files-with-matches for deserialize in go files under backend/app/models', "grep -r --include='*.go' deserialize backend/app/models", /files-with-matches/);
  no('search isEnabled in cs files under services/billing, with filenames', "rg -l -g '*.cs' isEnabled services/billing", /with file names/);
  ok('in files mentioning useState, find useRef with file names', 'rg -l -0 useState . | xargs -0 -r rg -H -e useRef --');
  no("grep for 'disk full' in deploy/k8s, at most 40 matches in each file", "grep -r -l -Z 'disk full' deploy/k8s | xargs -0 -r head -n 40 --");
  ok('what files in public/static mention REVIEW, first 5 lines each', 'rg -l -0 REVIEW public/static | xargs -0 -r head -n 5 --');
  no('count occurrences of NotFoundError in the lua files', "rg --count-matches -g '*.lua' NotFoundError .", /per file/);
});

test('14. git show vs diff vs log', () => {
  no('name status for HEAD~3', "git diff --name-status 'HEAD~3' --", /one commit/);
  ok('name status for HEAD~3', "git show --name-status 'HEAD~3' --");
  ok('name status of HEAD~3 against the working tree', "git diff --name-status 'HEAD~3' --");
});

test('15. jq', () => {
  no('I need the data from http://127.0.0.1:9200/_cluster/health and a 300 second limit', "curl -g -s --max-time 300 http://127.0.0.1:9200/_cluster/health | jq '.data'", /fetch word/);
  ok('Please get the status value from http://127.0.0.1:9200/_cluster/health with jq.', "curl -g http://127.0.0.1:9200/_cluster/health | jq -r '.status'");
});

test('16. pattern truncation', () => {
  no('line numbers for regex status [0-9]{3} in /var/log', "rg -n '[0-9]{3}' /var/log", /drops "status"/);
  ok('line numbers for regex status [0-9]{3} in /var/log', "rg -n 'status [0-9]{3}' /var/log");
  ok('use grep with a regex matching ^import in swift files under scripts', "grep -r -E --include='*.swift' '^import' scripts");
  no('use grep to find the first 4 matches of nil pointer under pkg/cache', 'grep -r nil pkg/cache | head -n 4', /stops before/);
  ok('top 4 most common deprecated warnings in logs/ios.log', 'rg deprecated logs/ios.log | sort | uniq -c | sort -rn | head -n 4');
});

test('5. npm test stages; 9. MOD_WORDS blockers', () => {
  no('run the lint script', 'npm test');
  ok('run the tests', 'npm test');
  no('only remote-tracking branches', 'git branch -r -v', /verbose/);
  no('which remote branches contain fix/race-condition', 'git branch -r | grep fix/race-condition', /--contains/);
  ok('remote branches whose names contain feature', 'git branch -r | grep feature');
});
