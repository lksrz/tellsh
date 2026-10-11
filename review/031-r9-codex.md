Reading additional input from stdin...
OpenAI Codex v0.160.0
--------
workdir: /workspace/tellsh
model: gpt-6.1-sol
provider: openai
approval: never
sandbox: read-only
reasoning effort: xhigh
reasoning summaries: none
session id: 01a12c60-0513-7dc3-bebb-5152800b41f9
--------
user
Round 5 review of the tellsh cmd quoting fix. Round-4 / r8: Claude APPROVE; Codex REQUEST_CHANGES (P2): function-template q inferred path-ness by value equality (fill.js pathVals), so when pattern === path (e.g. both C:\Program Files\) findstr /c: rewrote the pattern to \. instead of gapping. Fix (commit 745a432): q(s, o) now takes explicit { name } / { tilde }; pathVals heuristic removed; every function-template q() call in variants.js and catalog.js passes { name: '<slot>' }; regression test covers equal path+pattern for grep_text / grep_files_containing (must gap) while path-only still rewrites to \.. Look for real bugs only (regressions from this change, missed call sites still using bare q(value), attached-switch / cmdTemplate interaction, pwsh native name forwarding). End with exactly one line: VERDICT: APPROVE or VERDICT: REQUEST_CHANGES.

DIFF (r8 Codex RC fix, commit 745a432):
commit 745a432b530c83b2e8d463cfa048bf2f23d7299c
Author: lksrz <lukasz@wearfits.com>
Date:   Sun Oct 11 21:10:35 2026 +0200

    cmd: function-template q takes explicit slot role (r8 Codex RC: equal path+pattern no longer rewritten)

 review/031-r8-claude.md     |   18 +
 review/031-r8-codex.md      | 3324 +++++++++++++++++++++++++++++++++++++++++++
 review/031-r8-fix-needed.md |   10 +
 review/031-r8-prompt.txt    |  120 ++
 review/STATUS_031           |    2 +-
 src/catalog.js              |    6 +-
 src/fill.js                 |    9 +-
 src/variants.js             |   24 +-
 test/matrix.test.js         |   13 +
 9 files changed, 3506 insertions(+), 20 deletions(-)

commit 745a432b530c83b2e8d463cfa048bf2f23d7299c
Author: lksrz <lukasz@wearfits.com>
Date:   Sun Oct 11 21:10:35 2026 +0200

    cmd: function-template q takes explicit slot role (r8 Codex RC: equal path+pattern no longer rewritten)

diff --git a/src/catalog.js b/src/catalog.js
index a141fb5..23b63bb 100644
--- a/src/catalog.js
+++ b/src/catalog.js
@@ -80,7 +80,7 @@ export const INTENTS = [
   T('compress_zip', 'Compress into a zip archive', 'zip -r {archive} {path}', { path: '.', archive: null }, 'medium'),
   T('extract_zip', 'Extract a zip archive', 'unzip {file}«-d {dest}»', { file: null }, 'medium'),
   T('list_archive', 'List contents of an archive (tar/zip)',
-    (s, q) => /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file)}` : `tar -tvf ${q(s.file)}`,
+    (s, q) => /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file, { name: 'file' })}` : `tar -tvf ${q(s.file, { name: 'file' })}`,
     { file: null }),
   T('chmod', 'Change file permissions', 'chmod {mode!raw} {file}', { file: null, mode: null }, 'medium'),
   T('make_executable', 'Make a file executable', 'chmod +x {file}', { file: null }, 'medium'),
@@ -106,12 +106,12 @@ export const INTENTS = [
   T('hash_md5', 'Compute MD5 checksum', 'md5sum {file}', { file: null }, 'safe', { darwin: 'md5 {file}' }),
   T('base64_encode', 'Base64-encode text or a file',
     // macOS base64 takes no positional file operand: it needs -i FILE
-    (s, q, os) => s.file ? (os === 'darwin' ? `base64 -i ${q(s.file)}` : `base64 ${q(s.file)}`) : `printf '%s' ${q(s.text ?? '<TEXT>')} | base64`,
+    (s, q, os) => s.file ? (os === 'darwin' ? `base64 -i ${q(s.file, { name: 'file' })}` : `base64 ${q(s.file, { name: 'file' })}`) : `printf '%s' ${q(s.text ?? '<TEXT>', { name: 'text' })} | base64`,
     {}),
   T('base64_decode', 'Decode base64 text or a file',
     (s, q, os) => {
       const d = os === 'darwin' ? 'base64 -D' : 'base64 -d';
-      return s.file ? `${d} ${os === 'darwin' ? '-i ' : ''}${q(s.file)}` : `printf '%s' ${q(s.text ?? '<TEXT>')} | ${d}`;
+      return s.file ? `${d} ${os === 'darwin' ? '-i ' : ''}${q(s.file, { name: 'file' })}` : `printf '%s' ${q(s.text ?? '<TEXT>', { name: 'text' })} | ${d}`;
     }, {}),
 
   // ---------- processes ----------
diff --git a/src/fill.js b/src/fill.js
index ab06388..c27cb2d 100644
--- a/src/fill.js
+++ b/src/fill.js
@@ -998,10 +998,11 @@ export function buildCommand(intentId, text, { platform = process.platform, env,
       for (const [k, v] of Object.entries(vals)) {
         if (!PATH_SLOTS.has(k) && !RAW_OK[k] && typeof v === 'string' && /^-/.test(v)) { missing.push(k); vals[k] = PLACEHOLDER(k); }
       }
-      const pathVals = new Set([...PATH_SLOTS].filter((k) => vals[k] != null).map((k) => String(vals[k])));
-      const q = (s) => {
-        const isPath = pathVals.has(String(s));
-        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { tilde: isPath });
+      // slot role must be passed explicitly ({ name } or { tilde }); never infer from value
+      // equality — a pattern equal to a path would otherwise be rewritten like a path
+      const q = (s, o = {}) => {
+        const isPath = 'tilde' in o ? !!o.tilde : PATH_SLOTS.has(o.name);
+        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { ...o, tilde: isPath });
       };
       // catalog functions take the OS string, variant functions a ctx object
       command = tpl(vals, q, tpl === intent.template || tpl === intent.darwin ? e.os : e);
diff --git a/src/variants.js b/src/variants.js
index cc734fd..9dc3b85 100644
--- a/src/variants.js
+++ b/src/variants.js
@@ -77,12 +77,12 @@ export const VARIANTS = {
   grep_text: {
     busybox: 'find {path} -type f«-iname {glob}» -exec grep -Hn -- {pattern} {} +',
     pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -Pattern {pattern}`,
-    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /n /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
+    cmd: (s, q) => `pushd ${q(s.path ?? '.', { name: 'path' })} && (findstr /s /n /c:${q(s.pattern, { name: 'pattern' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} & popd)`,
   },
   grep_files_containing: {
     busybox: 'find {path} -type f«-iname {glob}» -exec grep -l -- {pattern} {} +',
     pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -List -Pattern {pattern} | Select-Object -ExpandProperty Path`,
-    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /m /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
+    cmd: (s, q) => `pushd ${q(s.path ?? '.', { name: 'path' })} && (findstr /s /m /c:${q(s.pattern, { name: 'pattern' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} & popd)`,
   },
   count_lines: {
     pwsh: '@(Get-Content -LiteralPath {file}).Count',
@@ -94,7 +94,7 @@ export const VARIANTS = {
   },
   count_files: {
     pwsh: `(${PS_FILES}«| Where-Object Name -Like {glob}» | Measure-Object).Count`,
-    cmd: (s, q) => `where /r ${q(s.path ?? '.')} ${s.glob ? q(s.glob) : '*'} | find /c /v ""`,
+    cmd: (s, q) => `where /r ${q(s.path ?? '.', { name: 'path' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} | find /c /v ""`,
   },
   count_words: {
     pwsh: '(Get-Content -LiteralPath {file} -Raw | Measure-Object -Word).Words',
@@ -191,12 +191,12 @@ export const VARIANTS = {
     cmd: 'tar -a -c -f {archive} {path}', // bsdtar picks zip format from the .zip suffix
   },
   extract_zip: {
-    pwsh: (s, q) => `Expand-Archive -LiteralPath ${q(s.file)} -DestinationPath ${s.dest ? q(s.dest) : '.'}`,
+    pwsh: (s, q) => `Expand-Archive -LiteralPath ${q(s.file, { name: 'file' })} -DestinationPath ${s.dest ? q(s.dest, { name: 'dest' }) : '.'}`,
     cmd: '«mkdir {dest} 2>nul & »tar -xf {file}«-C {dest}»',
   },
   list_archive: {
     // bsdtar on Windows lists zip archives too; GNU tar on Linux does not.
-    pwsh: (s, q, ctx) => (!isWin(ctx) && /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file)}` : `tar -tvf ${q(s.file)}`),
+    pwsh: (s, q, ctx) => (!isWin(ctx) && /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file, { name: 'file' })}` : `tar -tvf ${q(s.file, { name: 'file' })}`),
     cmd: 'tar -tvf {file}',
   },
   chmod: {
@@ -240,7 +240,7 @@ export const VARIANTS = {
     pwsh: 'if (-not (Test-Path -LiteralPath {path} -PathType Container)) { New-Item -ItemType Directory -Path {path} }',
     // mkdir -p: an existing directory is not an error (cmd's mkdir already creates parents); a trailing \ makes
     // `if exist` test for a directory, so an existing file of that name still fails like mkdir -p does
-    cmd: (s, q) => { const p = q(s.path); const dir = /"$/.test(p) ? p.slice(0, -1) + '\\"' : p + '\\'; return `if not exist ${dir} mkdir ${p}`; },
+    cmd: (s, q) => { const p = q(s.path, { name: 'path' }); const dir = /"$/.test(p) ? p.slice(0, -1) + '\\"' : p + '\\'; return `if not exist ${dir} mkdir ${p}`; },
   },
   touch_file: {
     pwsh: 'if (Test-Path -LiteralPath {file}) { (Get-Item -LiteralPath {file}).LastWriteTime = Get-Date } else { New-Item -ItemType File -Path {file} }',
@@ -285,14 +285,14 @@ export const VARIANTS = {
   },
   base64_encode: {
     pwsh: (s, q) => (s.file
-      ? `[Convert]::ToBase64String([System.IO.File]::ReadAllBytes((Resolve-Path -LiteralPath ${q(s.file)}).ProviderPath))`
-      : `[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(${q(s.text ?? '<TEXT>')}))`),
+      ? `[Convert]::ToBase64String([System.IO.File]::ReadAllBytes((Resolve-Path -LiteralPath ${q(s.file, { name: 'file' })}).ProviderPath))`
+      : `[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(${q(s.text ?? '<TEXT>', { name: 'text' })}))`),
     gaps: { cmd: 'certutil -encode writes to a file with PEM headers, not to stdout' },
   },
   base64_decode: {
     pwsh: (s, q) => (s.file
-      ? `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String((Get-Content -LiteralPath ${q(s.file)} -Raw)))`
-      : `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(${q(s.text ?? '<TEXT>')}))`),
+      ? `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String((Get-Content -LiteralPath ${q(s.file, { name: 'file' })} -Raw)))`
+      : `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(${q(s.text ?? '<TEXT>', { name: 'text' })}))`),
     gaps: { cmd: 'certutil -decode writes to a file, not to stdout' },
   },
 
@@ -313,11 +313,11 @@ export const VARIANTS = {
   },
   kill_by_name: {
     pwsh: { win: `${PS_PROC_MATCH} | Stop-Process`, unix: 'pkill -f {name}' },
-    cmd: (s, q) => `taskkill /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`)}`,
+    cmd: (s, q) => `taskkill /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`, { name: 'name' })}`,
   },
   kill_force: {
     pwsh: { win: `${PS_PROC_MATCH} | Stop-Process -Force`, unix: 'pkill -9 -f {name}' },
-    cmd: (s, q) => `taskkill /f /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`)}`,
+    cmd: (s, q) => `taskkill /f /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`, { name: 'name' })}`,
   },
   kill_by_pid: {
     // `kill` is an alias of Stop-Process (SIGKILL on Unix) in PowerShell; call the real binary for SIGTERM.
diff --git a/test/matrix.test.js b/test/matrix.test.js
index ac57b41..78fa3ca 100644
--- a/test/matrix.test.js
+++ b/test/matrix.test.js
@@ -210,3 +210,16 @@ test('cmd: a non-path value ending in \\ is a gap, never silently rewritten', as
   const r = b('git_commit', { shell: 'cmd', os: 'win32' }, { message: 'Document C:\\' });
   assert.ok(r.gap || !/C:\\\./.test(r.command), r.command);
 });
+
+test('cmd: pattern equal to a path slot still gaps (no value-equality tilde inference)', () => {
+  const CMD = { shell: 'cmd', os: 'win32' };
+  const p = 'C:\\Program Files\\';
+  for (const id of ['grep_text', 'grep_files_containing']) {
+    const same = b(id, CMD, { path: p, pattern: p });
+    assert.ok(same.gap, `${id}: expected gap, got ${same.command}`);
+    assert.doesNotMatch(String(same.command || ''), /Program Files\\\./, id);
+    const pathOnly = b(id, CMD, { path: p, pattern: 'x' });
+    assert.match(pathOnly.command, /pushd "C:\\Program Files\\."/, id);
+    assert.match(pathOnly.command, /\/c:x/, id);
+  }
+});
codex
I’ll trace the changed `q()` calls through cmd and PowerShell quoting, check for missed callers, and run the relevant tests.
exec
/bin/bash -lc "pwd && rg --files -g 'AGENTS.md' -g 'package.json' -g '*quote*' -g '*fill*' -g '*matrix*' -g '*variants*' -g '*catalog*'" in /workspace/tellsh
 succeeded in 0ms:
/workspace/tellsh
test/matrix.test.js
hybrid/package/tellsh-model-enc/package.json
src/catalog.js
src/fill.js
src/variants.js
scripts/check_variants.js
scripts/matrix.js
package.json

exec
/bin/bash -lc 'for f in /AGENTS.md /workspace/AGENTS.md /workspace/tellsh/AGENTS.md; do if test -f "$f"; then cat "$f"; fi; done' in /workspace/tellsh
 succeeded in 0ms:
exec
/bin/bash -lc 'git status --short && git log -3 --oneline && cat package.json' in /workspace/tellsh
 succeeded in 0ms:
?? review/031-r9-claude.md
?? review/031-r9-codex.md
?? review/031-r9-prompt.txt
745a432 cmd: function-template q takes explicit slot role (r8 Codex RC: equal path+pattern no longer rewritten)
d605e2d cmd: non-path values ending in \ are a gap instead of being rewritten; C:\. and \. critical
e4a9108 cmd: quoted trailing separator becomes \. (keeps copy/move directory meaning); C:\Users / Windows / Program Files are critical rd targets
{
  "name": "tellsh",
  "version": "0.3.1",
  "description": "Offline natural-language (Polish & English) to shell command CLI: tool->intent->slot cascade of tiny linear models + templates for bash/zsh/sh/PowerShell (fish/cmd best effort). No LLM at runtime, zero dependencies.",
  "type": "module",
  "bin": {
    "tellsh": "bin/tellsh.js"
  },
  "main": "src/cli.js",
  "exports": {
    ".": "./src/cli.js",
    "./pipeline": "./src/pipeline.js",
    "./classifier": "./src/classifier.js",
    "./cascade": "./src/cascade.js",
    "./tagger": "./src/tagger.js",
    "./fill": "./src/fill.js",
    "./slots": "./src/slots.js",
    "./danger": "./src/danger.js",
    "./catalog": "./src/catalog.js",
    "./history": "./src/history.js",
    "./env": "./src/env.js",
    "./compose": "./src/compose.js",
    "./package.json": "./package.json",
    "./hybrid": "./src/rerank/hybrid.js"
  },
  "files": [
    "bin/tellsh.js",
    "src/*.js",
    "src/rerank/*.js",
    "model/model.bin",
    "model/tldr_triggers.json",
    "model/compose_explained.json",
    "README.md",
    "DATA_LICENSES.md",
    "LICENSE"
  ],
  "engines": {
    "node": ">=18"
  },
  "scripts": {
    "test": "node --test test/",
    "gen-data": "node scripts/gen_data.js",
    "train": "node scripts/gen_data.js && python3 scripts/train.py && node scripts/build_triggers.js",
    "tldr": "python3 -I scripts/tldr_ingest.py",
    "teacher": "node scripts/teacher.js",
    "eval": "node scripts/eval.js",
    "bench": "taskset -c 0 node scripts/bench.js",
    "prepack": "node -e \"for (const f of ['model/model.bin','model/tldr_triggers.json','model/compose_explained.json']) require('fs').statSync(f)\""
  },
  "keywords": [
    "cli",
    "bash",
    "shell",
    "natural-language",
    "nl2bash",
    "offline",
    "polish",
    "intent-classification",
    "terminal",
    "powershell",
    "zsh",
    "slot-filling"
  ],
  "author": "lksrz <lukasz@wearfits.com>",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/lksrz/tellsh.git"
  },
  "dependencies": {},
  "peerDependencies": {
    "onnxruntime-node": ">=1.20.0",
    "tellsh-model-enc": "0.4.x"
  },
  "peerDependenciesMeta": {
    "onnxruntime-node": {
      "optional": true
    },
    "tellsh-model-enc": {
      "optional": true
    }
  }
}

exec
/bin/bash -lc "rg -n '\\bq\\(|PATH_SLOTS|cmdTemplate|pwsh.*[Nn]ative|function quote|const quote|function buildCommand' src test && sed -n '1,260p' test/matrix.test.js" in /workspace/tellsh
 succeeded in 0ms:
src/catalog.js:83:    (s, q) => /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file, { name: 'file' })}` : `tar -tvf ${q(s.file, { name: 'file' })}`,
src/catalog.js:109:    (s, q, os) => s.file ? (os === 'darwin' ? `base64 -i ${q(s.file, { name: 'file' })}` : `base64 ${q(s.file, { name: 'file' })}`) : `printf '%s' ${q(s.text ?? '<TEXT>', { name: 'text' })} | base64`,
src/catalog.js:114:      return s.file ? `${d} ${os === 'darwin' ? '-i ' : ''}${q(s.file, { name: 'file' })}` : `printf '%s' ${q(s.text ?? '<TEXT>', { name: 'text' })} | ${d}`;
test/regressions2.test.js:19:import { shQuote, psQuote, cmdQuote, pwshNativeSlots } from '../src/render.js';
test/regressions2.test.js:231:  assert.deepEqual([...pwshNativeSlots('git add -A; if ($LASTEXITCODE -eq 0) { git commit -m {message} }')], ['message']);
test/regressions2.test.js:232:  assert.deepEqual([...pwshNativeSlots("(Get-Content -LiteralPath {file} -Raw).Replace({old}, {new})")], []);
src/slots.js:222:  const quotedSpans = [];
src/tagger.js:73:  const quoted = extractSlots(text).spans.filter((s) => s.type === 'QUOTED');
src/render.js:59:/** A cmd.exe value starting with `/`: refused only where it stands alone as an argument (see cmdTemplate). */
src/render.js:108:const cmdTemplates = new WeakMap();
src/render.js:111: * its own. Glued to a switch (`findstr /c:${q(pattern)}`) it cannot be read as one, so it is kept.
src/render.js:113:function cmdTemplate(fn) {
src/render.js:114:  if (!cmdTemplates.has(fn)) {
src/render.js:115:    cmdTemplates.set(fn, (vals, q, ctx) => {
src/render.js:118:        try { return q(v, o); } catch (err) {
src/render.js:132:  return cmdTemplates.get(fn);
src/render.js:155:    if (v.cmd) return { tpl: typeof v.cmd === 'function' ? cmdTemplate(v.cmd) : v.cmd, kind: 'cmd', variant: 'cmd' };
src/render.js:162: * PowerShell 5.1 and pwsh < 7.3 ("Legacy" native argument passing) build a native program's command
src/render.js:172:export function pwshNativeSlots(tpl) {
src/render.js:189:export const quoteForKind =(kind, wrapPosix) => (wrapPosix ? shQuote : { posix: shQuote, fish: fishQuote, pwsh: psQuote, cmd: cmdQuote }[kind]);
src/compose.js:427:      case 'since': return ex.duration?.since ? q(ex.duration.since) : null;
src/compose.js:431:        if (m) return q(m[2]);
src/compose.js:433:        return w ? q({ c: ',', p: ',', s: ';', d: ':', t: '\t' }[/^(comma|przec)/.test(w[1]) ? 'c' : /^(semi|sred)/.test(w[1]) ? 's' : /^(colon|dwuk)/.test(w[1]) ? 'd' : /^tab/.test(w[1]) ? 't' : 'p'] || '|') : null;
src/compose.js:449:        return v ? q(v) : null;
src/compose.js:463:          if (!NOTAUTHOR.test(m[1])) { const v = word(m[1]); if (v) return q(v); }
src/compose.js:466:        return n ? q(n) : null;
src/compose.js:498:    if (ex.ext && !used.includes('-name')) parts.push(used.includes('-iname') ? '-iname' : '-name', q(`*.${ex.ext}`));
src/compose.js:511:    if (ex.ext && used.includes('-r')) parts.push(`--include=${q(`*.${ex.ext}`)}`);
src/compose.js:512:    parts.push('--', q(pat));
src/compose.js:529:    parts.push(q(url));
src/compose.js:532:    if (word(ref)) parts.push(q(ref));
src/rerank/encoder.js:138:    const quoted = lead > 0 && /["'„“`]/.test(w[0]);
src/fill.js:6:import { shQuote, psQuote, chooseTemplate, quoteForKind, UnquotableError, pwshNativeSlots, unsafeNativePwshArg } from './render.js';
src/fill.js:395:    const quoted = m[2] ?? m[3] ?? m[4] ?? m[5];
src/fill.js:488:const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
src/fill.js:761:    const quoted = m[2] ?? m[3] ?? m[5] ?? m[6];
src/fill.js:878:  if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
src/fill.js:879:  return quote(val, { tilde: PATH_SLOTS.has(name), name });
src/fill.js:951:export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [], keepOptional = [] } = {}) {
src/fill.js:964:    for (const k of PATH_SLOTS) if (values[k] === '/') values[k] = 'C:\\';
src/fill.js:981:  const pwshNative = choice.kind === 'pwsh' && !choice.wrapPosix;
src/fill.js:982:  const nativeSlots = pwshNative ? pwshNativeSlots(tpl) : new Set();
src/fill.js:983:  const quote = !pwshNative ? baseQuote : (v, o = {}) => {
src/fill.js:999:        if (!PATH_SLOTS.has(k) && !RAW_OK[k] && typeof v === 'string' && /^-/.test(v)) { missing.push(k); vals[k] = PLACEHOLDER(k); }
src/fill.js:1004:        const isPath = 'tilde' in o ? !!o.tilde : PATH_SLOTS.has(o.name);
src/fill.js:1028:  const plain = used.every((k) => !(k in values) || plainSlotValue(k, values[k], { dashOk: PATH_SLOTS.has(k) || (!!RAW_OK[k] && RAW_OK[k](values[k])) }));
test/regressions.test.js:78:    const quoted = psQuote(v);
test/regressions.test.js:83:    const quoted = psQuote(`~/a${q}; calc; ${q}$x`);
test/regressions3-render.test.js:11:import { cmdQuote, pwshNativeSlots } from '../src/render.js';
test/regressions3-render.test.js:24:test('pwshNativeSlots finds every slot of a native command', () => {
test/regressions3-render.test.js:25:  assert.deepEqual([...pwshNativeSlots('tar -czvf {archive} {path}')].sort(), ['archive', 'path']);
test/regressions3-render.test.js:26:  assert.deepEqual([...pwshNativeSlots('tar -xzvf {file}«-C {dest}»')].sort(), ['dest', 'file']);
test/regressions3-render.test.js:27:  assert.deepEqual([...pwshNativeSlots('scp {target}:{dst}')].sort(), ['dst', 'target']);
test/regressions3-render.test.js:28:  assert.deepEqual([...pwshNativeSlots('docker logs --tail {count!raw} -f {container}')], ['container']);
test/regressions3-render.test.js:30:  assert.deepEqual([...pwshNativeSlots('if (Test-Path -LiteralPath {file}) { (Get-Item -LiteralPath {file}).LastWriteTime = Get-Date } else { New-Item -ItemType File -Path {file} }')], []);
test/regressions3-render.test.js:31:  assert.deepEqual([...pwshNativeSlots('Compress-Archive -LiteralPath {path} -DestinationPath {archive}')], []);
src/history.js:776:  if ((k === 'pwsh' || PS_CMDLET.test(head)) && psNative(head.toLowerCase(), args, e, setIntent)) return;
src/variants.js:80:    cmd: (s, q) => `pushd ${q(s.path ?? '.', { name: 'path' })} && (findstr /s /n /c:${q(s.pattern, { name: 'pattern' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} & popd)`,
src/variants.js:85:    cmd: (s, q) => `pushd ${q(s.path ?? '.', { name: 'path' })} && (findstr /s /m /c:${q(s.pattern, { name: 'pattern' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} & popd)`,
src/variants.js:97:    cmd: (s, q) => `where /r ${q(s.path ?? '.', { name: 'path' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} | find /c /v ""`,
src/variants.js:194:    pwsh: (s, q) => `Expand-Archive -LiteralPath ${q(s.file, { name: 'file' })} -DestinationPath ${s.dest ? q(s.dest, { name: 'dest' }) : '.'}`,
src/variants.js:199:    pwsh: (s, q, ctx) => (!isWin(ctx) && /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file, { name: 'file' })}` : `tar -tvf ${q(s.file, { name: 'file' })}`),
src/variants.js:243:    cmd: (s, q) => { const p = q(s.path, { name: 'path' }); const dir = /"$/.test(p) ? p.slice(0, -1) + '\\"' : p + '\\'; return `if not exist ${dir} mkdir ${p}`; },
src/variants.js:288:      ? `[Convert]::ToBase64String([System.IO.File]::ReadAllBytes((Resolve-Path -LiteralPath ${q(s.file, { name: 'file' })}).ProviderPath))`
src/variants.js:289:      : `[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(${q(s.text ?? '<TEXT>', { name: 'text' })}))`),
src/variants.js:294:      ? `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String((Get-Content -LiteralPath ${q(s.file, { name: 'file' })} -Raw)))`
src/variants.js:295:      : `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(${q(s.text ?? '<TEXT>', { name: 'text' })}))`),
src/variants.js:316:    cmd: (s, q) => `taskkill /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`, { name: 'name' })}`,
src/variants.js:320:    cmd: (s, q) => `taskkill /f /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`, { name: 'name' })}`,
// v0.3.1: fixes found by the cross-platform template matrix (scripts/matrix.js, MATRIX.md)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildCommand } from '../src/fill.js';
import { checkDanger } from '../src/danger.js';

const WIN_PS = { shell: 'powershell', os: 'win32', coreutils: 'gnu' };
const CMD = { shell: 'cmd', os: 'win32', coreutils: 'gnu' };
const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };
const b = (id, env, resolved) => buildCommand(id, '', { env, resolved });

test('matrix: every template renders without static issues on every platform', () => {
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-mx-test-'));
  try {
    for (const p of ['linux', 'busybox', 'darwin', 'win32']) {
      const out = join(dir, `${p}.json`);
      const r = spawnSync(process.execPath, ['scripts/matrix.js', 'gen', p, out, '--container'], { encoding: 'utf8' });
      assert.equal(r.status, 0, r.stderr);
      const bad = JSON.parse(readFileSync(out, 'utf8')).cases.filter((c) => c.staticIssues.length);
      assert.deepEqual(bad.map((c) => `${c.id} ${c.label}: ${c.staticIssues.join('; ')}`), [], p);
    }
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('PowerShell expressions starting with $ are not commands; & $var still is', () => {
  for (const id of ['dir_size', 'hidden_files', 'memory_usage', 'show_path', 'find_process']) {
    const r = b(id, WIN_PS, { path: 'my docs', var: 'HOME', name: 'node' });
    assert.equal(r.risk, 'safe', `${id}: ${r.command} ${r.warnings}`);
  }
  assert.equal(b('env_var_get', WIN_PS, { var: 'HOME' }).risk, 'safe');
  assert.equal(b('git_commit', WIN_PS, { message: 'x' }).risk, 'medium');
  for (const c of ['& $tool -rf C:\\', "& '$x'", 'Get-Item x; & $env:COMSPEC', '& ($env:COMSPEC)', '. ($env:SCRIPT)', '& "$x"', '& { $x }', '& (@($env:SCRIPT) | Select-Object -First 1)', '. (@($env:SCRIPT) | Select-Object -First 1)']) {
    assert.equal(checkDanger(c, 'safe', { rendered: true, shell: 'powershell' }).risk, 'high', c);
  }
  // without the shell hint (POSIX reading) a $-head is still unknown
  assert.equal(checkDanger('$CMD -rf /', 'safe', { rendered: true }).risk, 'high');
});

test('New-Item: without -Force it never overwrites; -Force (any -ItemType, registry keys too) or -Value is a write', () => {
  const m = b('mkdir', WIN_PS, { path: 'a b' });
  assert.equal(m.command, "if (-not (Test-Path -LiteralPath 'a b' -PathType Container)) { New-Item -ItemType Directory -Path 'a b' }");
  assert.equal(m.risk, 'safe');
  assert.doesNotMatch(b('mkdir', WIN_PS, { path: 'HKCU:\\Software\\Victim' }).command, /-Force/);
  assert.notEqual(checkDanger("New-Item -ItemType Directory -Force -Path 'HKCU:\\Software\\Victim'", 'safe', { rendered: true, shell: 'powershell' }).risk, 'safe');
  assert.doesNotMatch(b('extract_targz', WIN_PS, { file: 'a.tar.gz', dest: 'out' }).command, /-Force/);
  assert.equal(b('touch_file', WIN_PS, { file: 'a.txt' }).risk, 'safe');
  assert.notEqual(checkDanger("New-Item -ItemType File -Force -Path 'a.txt'", 'safe', { rendered: true, shell: 'powershell' }).risk, 'safe');
  assert.notEqual(checkDanger("New-Item -Path 'a.txt' -Value 'x'", 'safe', { rendered: true, shell: 'powershell' }).risk, 'safe');
});

test('cmd: type nul >> (touch) and 2>nul are not writes; other redirects are; nul is a plain file outside Windows shells', () => {
  assert.equal(b('touch_file', CMD, { file: 'a.txt' }).risk, 'safe');
  assert.equal(checkDanger('dir 2>nul', 'safe', { rendered: true, shell: 'cmd' }).risk, 'safe');
  assert.equal(checkDanger('echo x > nul', 'safe', { rendered: true, shell: 'bash' }).risk, 'medium');
  assert.equal(checkDanger('echo x > nul', 'safe', { rendered: true }).risk, 'medium');
  assert.equal(checkDanger('echo x > nul', 'safe', { rendered: true, shell: 'powershell', os: 'linux' }).risk, 'medium');
  assert.equal(checkDanger('Get-Item x 2> nul', 'safe', { rendered: true, shell: 'powershell', os: 'win32' }).risk, 'safe');
  assert.equal(checkDanger('type nul >> a.txt', 'safe', { rendered: true, shell: 'bash' }).risk, 'medium');
  assert.equal(checkDanger('echo x > "nul backup"', 'safe', { rendered: true, shell: 'cmd' }).risk, 'medium');
  assert.equal(checkDanger('echo x >> a.txt', 'safe', { rendered: true, shell: 'cmd' }).risk, 'medium');
  assert.equal(checkDanger('type nul > a.txt', 'safe', { rendered: true, shell: 'cmd' }).risk, 'medium');
  assert.equal(checkDanger('dir > nul.txt', 'safe', { rendered: true, shell: 'cmd' }).risk, 'medium');
});

test('extract to a directory creates it first (tar -C needs an existing dir), no leading space', () => {
  assert.equal(b('extract_targz', BASH, { file: 'a.tar.gz', dest: 'out' }).command, 'mkdir -p out && tar -xzvf a.tar.gz -C out');
  assert.equal(b('extract_targz', BASH, { file: 'a.tar.gz' }).command, 'tar -xzvf a.tar.gz');
  assert.equal(b('extract_targz', WIN_PS, { file: 'a.tar.gz', dest: 'out' }).command, "if (-not (Test-Path -LiteralPath 'out' -PathType Container)) { New-Item -ItemType Directory -Path 'out' | Out-Null }; tar -xzvf 'a.tar.gz' -C 'out'");
  assert.equal(b('extract_targz', CMD, { file: 'a.tar.gz', dest: 'out' }).command, 'mkdir out 2>nul & tar -xzvf a.tar.gz -C out');
  assert.equal(b('extract_zip', CMD, { file: 'a.zip', dest: 'out' }).command, 'mkdir out 2>nul & tar -xf a.zip -C out');
});

test('cmd: mkdir -p semantics, dotfiles in hidden_files, no admin-only disk_free', () => {
  assert.equal(b('mkdir', CMD, { path: 'my docs' }).command, 'if not exist "my docs\\" mkdir "my docs"');
  assert.equal(b('mkdir', CMD, { path: 'out' }).command, 'if not exist out\\ mkdir out');
  assert.equal(b('mkdir', CMD, { path: '~/new dir' }).command, 'if not exist "%USERPROFILE%\\new dir\\" mkdir "%USERPROFILE%\\new dir"');
  assert.equal(b('mkdir', CMD, { path: 'my docs' }).risk, 'safe');
  const h = b('hidden_files', CMD, { path: 'my docs' });
  assert.equal(h.command, 'pushd "my docs" && (dir /a:h /b 2>nul & dir /a /b .* & popd)');
  assert.equal(h.risk, 'safe');
  assert.equal(b('hidden_files', CMD, { path: '~' }).command, 'pushd "%USERPROFILE%" && (dir /a:h /b 2>nul & dir /a /b .* & popd)');
  assert.equal(b('hidden_files', CMD, { path: '~/my docs' }).command, 'pushd "%USERPROFILE%\\my docs" && (dir /a:h /b 2>nul & dir /a /b .* & popd)');
  assert.ok(b('disk_free', CMD, {}).gap);
});

test('Windows PowerShell: zip via bsdtar, duplicate hashing skips unreadable files', () => {
  assert.equal(b('compress_zip', WIN_PS, { path: 'my docs', archive: 'b.zip' }).command, "tar -a -c -f 'b.zip' 'my docs'");
  // GNU tar has no zip format: PowerShell on Linux / macOS keeps Compress-Archive
  for (const os of ['linux', 'darwin']) {
    assert.equal(b('compress_zip', { shell: 'powershell', os, coreutils: 'gnu' }, { path: 'my docs', archive: 'b.zip' }).command, "Compress-Archive -LiteralPath 'my docs' -DestinationPath 'b.zip'");
  }
  assert.match(b('duplicate_files', WIN_PS, { path: '.' }).command, /Get-FileHash -Algorithm MD5 -ErrorAction SilentlyContinue/);
});

test('timezone falls back to /etc/localtime and date (Alpine has no timedatectl or /etc/timezone)', () => {
  const r = b('timezone', BASH, {});
  assert.match(r.command, /readlink \/etc\/localtime 2>\/dev\/null \|\| date \+%Z$/);
  assert.equal(r.risk, 'safe');
});

test('busybox and macOS GNU variants are on the allowlist', () => {
  const bb = { shell: 'sh', os: 'linux', coreutils: 'busybox' };
  for (const id of ['grep_text', 'find_symlinks', 'top_cpu', 'top_mem', 'listening_ports', 'ip_addresses']) {
    const r = b(id, bb, { path: '.', pattern: 'x' });
    assert.equal(r.risk, 'safe', `${id}: ${r.command} ${r.warnings}`);
  }
  const gm = { shell: 'zsh', os: 'darwin', coreutils: 'gnu' };
  for (const id of ['largest_files', 'largest_dirs', 'duplicate_files']) assert.equal(b(id, gm, { path: '.' }).risk, 'safe', id);
});

test('broken_symlinks (Windows PowerShell 5.1): no Split-Path -LiteralPath -Parent (parameter set error)', () => {
  const r = b('broken_symlinks', WIN_PS, { path: 'my docs' });
  assert.doesNotMatch(r.command, /Split-Path/);
  assert.match(r.command, /\[System\.IO\.Path\]::GetDirectoryName\(\$_\.FullName\)/);
  assert.equal(r.risk, 'safe');
});

test('g-prefixed names are trusted only where the macOS GNU templates render them; fuser -k kills', () => {
  for (const c of ['gfind / -delete', 'gxargs -r git commit', 'gfoo /var', 'grm -rf /']) {
    assert.equal(checkDanger(c, 'safe', { rendered: true }).risk, 'high', c);
  }
  assert.equal(checkDanger('gdu -h -d 1 /var 2>/dev/null | gsort -rh | head -n 10', 'safe', { rendered: true }).risk, 'safe');
  for (const c of ['fuser -k /', 'fuser -k -TERM 8080/tcp', 'fuser -vk 80/tcp']) assert.equal(checkDanger(c, 'safe', { rendered: true }).risk, 'high', c);
});

test('matrix run: a hostile environment (GIT_DIR, BASH_ENV) cannot reach outside the fixture', { skip: process.platform === 'win32' }, () => {
  const dir = mkdtempSync(join(tmpdir(), 'tellsh-mx-iso-'));
  try {
    const victim = join(dir, 'victim');
    spawnSync('git', ['init', '-q', victim]);
    const marker = join(dir, 'bash_env_ran');
    writeFileSync(join(dir, 'evil.sh'), `touch '${marker}'\n`);
    const cases = { platform: 'linux', container: false, cases: [
      { id: 'git_status', env: BASH, label: 'bash/linux', catalogRisk: 'safe', risk: 'safe', command: 'git status', staticIssues: [], heads: ['git'],
        exec: { run: true, cwd: 'repo', expectOutput: true, okCodes: [0] } },
      { id: 'list_files', env: BASH, label: 'bash/linux', catalogRisk: 'safe', risk: 'safe', command: 'ls -lah .', staticIssues: [], heads: ['ls'],
        exec: { run: true, cwd: '.', expectOutput: true, okCodes: [0] } }] };
    writeFileSync(join(dir, 'cases.json'), JSON.stringify(cases));
    const r = spawnSync(process.execPath, ['scripts/matrix.js', 'run', join(dir, 'cases.json'), join(dir, 'out.json')], {
      encoding: 'utf8', env: { ...process.env, GIT_DIR: join(victim, '.git'), GIT_WORK_TREE: victim, BASH_ENV: join(dir, 'evil.sh') } });
    assert.equal(r.status, 0, r.stderr);
    const log = spawnSync('git', ['-C', victim, 'rev-list', '--all', '--count'], { encoding: 'utf8' });
    assert.equal(log.stdout.trim(), '0', 'the fixture git setup must not commit into GIT_DIR');
    assert.equal(existsSync(marker), false, 'BASH_ENV must not be honoured');
    const res = JSON.parse(readFileSync(join(dir, 'out.json'), 'utf8')).results;
    assert.deepEqual(res.map((x) => x.status), ['pass', 'pass'], JSON.stringify(res.map((x) => x.detail)));
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('New-Item: -Target alias and pipeline input are content writes', () => {
  for (const c of ["New-Item -ItemType File -Path 'a.txt' -Target 'hello'", "echo hello | New-Item -ItemType File -Path 'a.txt'"])
    assert.notEqual(checkDanger(c, 'safe', { rendered: true, shell: 'powershell' }).risk, 'safe', c);
  assert.equal(checkDanger("New-Item -ItemType Directory -Path 'x'", 'safe', { rendered: true, shell: 'powershell' }).risk, 'safe');
});

test('cmd: type nul >> a & a real redirect stays a write', () => {
  assert.notEqual(checkDanger('type nul >> a.txt & echo x > b.txt', 'safe', { rendered: true, shell: 'cmd', os: 'win32' }).risk, 'safe');
});

test('matrix report: without --before every results file is kept', () => {
  const dir = mkdtempSync(join(tmpdir(), 'mxr-'));
  try {
    const res = (platform) => JSON.stringify({ platform, results: [{ id: 'list_files', label: 'bash/' + platform, status: 'pass' }] });
    writeFileSync(join(dir, 'a.json'), res('linux')); writeFileSync(join(dir, 'b.json'), res('darwin'));
    const r = spawnSync(process.execPath, [join(process.cwd(), 'scripts/matrix.js'), 'report', join(dir, 'a.json'), join(dir, 'b.json')], { encoding: 'utf8', cwd: dir });
    const md = readFileSync(join(dir, 'MATRIX.md'), 'utf8');
    assert.match(md, /linux/); assert.match(md, /darwin/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('cmd: ~ paths become a double-quoted %USERPROFILE% (a user name may contain a space)', async () => {
  const { cmdQuote, psQuote } = await import('../src/render.js');
  assert.equal(cmdQuote('~'), '"%USERPROFILE%"');
  assert.equal(cmdQuote('~/foo'), '"%USERPROFILE%\\foo"');
  assert.equal(cmdQuote('~/my docs'), '"%USERPROFILE%\\my docs"');
  assert.equal(psQuote('~/foo'), '"$HOME/foo"');
  for (const [id, slots] of [['delete_dir', { path: '~/foo' }], ['mkdir', { path: '~/foo' }], ['hidden_files', { path: '~' }], ['list_files', { path: '~/foo' }]]) {
    const r = b(id, { shell: 'cmd', os: 'win32' }, slots);
    assert.match(r.gap ? '%USERPROFILE%' : r.command, /%USERPROFILE%/, id);
    if (r.gap) continue;
    assert.doesNotMatch(r.command, /(?<!")%USERPROFILE%/, `${id}: ${r.command}`);
  }
  assert.equal(checkDanger('rd /s /q "%USERPROFILE%"', 'high', { rendered: true, shell: 'cmd', os: 'win32' }).critical, true);
});

test('cmd: a quoted path ending in \\ ends in \\. instead (MSVC argv would read \\" as a literal quote)', async () => {
  const { cmdQuote } = await import('../src/render.js');
  assert.equal(cmdQuote('~/'), '"%USERPROFILE%\\."');
  assert.equal(cmdQuote('~/Downloads/'), '"%USERPROFILE%\\Downloads\\."');
  assert.equal(cmdQuote('my docs/'), '"my docs\\."');
  // copy into a missing folder must fail, not create a file named after it
  assert.equal(b('copy', { shell: 'cmd', os: 'win32' }, { src: 'report.txt', dst: 'new folder/' }).command, 'copy /-y report.txt "new folder\\."');
  assert.equal(cmdQuote('docs/'), 'docs\\');
  const CMD = { shell: 'cmd', os: 'win32' };
  assert.equal(b('mkdir', CMD, { path: '~/new/' }).command, 'if not exist "%USERPROFILE%\\new\\.\\" mkdir "%USERPROFILE%\\new\\."');
  assert.doesNotMatch(b('compress_targz', CMD, { path: '~/foo/', archive: 'out.tar.gz' }).command, /[^\\]\\"/);
  for (const c of ['rd /s /q "%USERPROFILE%\\."', 'rd /s "%USERPROFILE%\\"', 'rd /s /q "%USERPROFILE%"', 'del /s /q "%USERPROFILE%\\*"', 'rd /s /q "C:\\Users"', 'rd /s /q C:\\Windows\\', 'rd /s /q "C:\\Program Files\\."', 'rd /s /q C:\\.', 'rd /s /q \\.'])
    assert.equal(checkDanger(c, 'high', { rendered: true, shell: 'cmd', os: 'win32' }).critical, true, c);
  assert.notEqual(checkDanger('rd /s /q "%USERPROFILE%\\foo"', 'high', { rendered: true, shell: 'cmd', os: 'win32' }).critical, true);
});

test('cmd: a non-path value ending in \\ is a gap, never silently rewritten', async () => {
  const { cmdQuote, UnquotableError } = await import('../src/render.js');
  assert.throws(() => cmdQuote('Document C:\\', { tilde: false }), UnquotableError);
  assert.equal(cmdQuote('a\\', { tilde: false }), 'a\\');
  const r = b('git_commit', { shell: 'cmd', os: 'win32' }, { message: 'Document C:\\' });
  assert.ok(r.gap || !/C:\\\./.test(r.command), r.command);
});

test('cmd: pattern equal to a path slot still gaps (no value-equality tilde inference)', () => {
  const CMD = { shell: 'cmd', os: 'win32' };
  const p = 'C:\\Program Files\\';
  for (const id of ['grep_text', 'grep_files_containing']) {
    const same = b(id, CMD, { path: p, pattern: p });
    assert.ok(same.gap, `${id}: expected gap, got ${same.command}`);
    assert.doesNotMatch(String(same.command || ''), /Program Files\\\./, id);
    const pathOnly = b(id, CMD, { path: p, pattern: 'x' });
    assert.match(pathOnly.command, /pushd "C:\\Program Files\\."/, id);
    assert.match(pathOnly.command, /\/c:x/, id);
  }
});

exec
/bin/bash -lc "cat src/variants.js && sed -n '1,190p' src/catalog.js" in /workspace/tellsh
exec
/bin/bash -lc "cat src/render.js && sed -n '820,1065p' src/fill.js" in /workspace/tellsh
 succeeded in 0ms:
// Per-shell rendering: pick the template variant for (shell, os, coreutils) and quote slot values
// for that shell. Intent and slots are shared across shells; only the rendered command differs.
//
// Precedence
//   bash/zsh/sh  linux: busybox (if busybox userland) ?? template
//                darwin: gnuMac (GNU coreutils present) ?? bsd ?? catalog darwin ?? template
//   fish         fish ?? the POSIX choice above (fish quoting)
//   powershell   pwsh (string | {win, unix}); no unix variant -> `bash -c '<posix>'`; no win variant -> gap
//   cmd          cmd ?? gap
import { VARIANTS } from './variants.js';

// never a leading `=`: zsh expands `=word` to the path of command `word`
const SAFE_POSIX = /^[A-Za-z0-9_\/.,:@%+-][A-Za-z0-9_\/.,:@%+=-]*$/;

// Every quote function takes { tilde }: true (default) only for path slots, where a leading ~ means
// the home directory; any other value (grep pattern, commit message, sed text) stays a literal `~`.

/** POSIX shell quoting. Keeps a leading ~/ of a path unquoted so tilde expansion still works. */
export function shQuote(value, { tilde: expand = true } = {}) {
  const s = String(value);
  if (s === '') return "''";
  const tilde = expand && s.match(/^~(\/|$)(.*)$/s);
  if (tilde) return '~' + tilde[1] + (tilde[2] ? shQuote(tilde[2]) : '');
  if (SAFE_POSIX.test(s) && !s.startsWith('~')) return s;
  return "'" + s.replace(/'/g, `'\\''`) + "'";
}

/** fish: inside single quotes only \\ and \' are escapes. */
export function fishQuote(value, { tilde: expand = true } = {}) {
  const s = String(value);
  if (s === '') return "''";
  const tilde = expand && s.match(/^~(\/|$)(.*)$/s);
  if (tilde) return '~' + tilde[1] + (tilde[2] ? fishQuote(tilde[2]) : '');
  if (/^[A-Za-z0-9_\/.,:@+-][A-Za-z0-9_\/.,:@+=-]*$/.test(s)) return s;
  return "'" + s.replace(/[\\']/g, '\\$&') + "'";
}

// PowerShell treats the typographic quotes as quote characters too (about_Quoting_Rules):
// single: ' ‘ ’ ‚ ‛   double: " “ ” „
const PS_SQ = /['\u2018\u2019\u201A\u201B]/g;
const PS_DQ_SPECIAL = /[`$"\u201C\u201D\u201E]/g;

/**
 * PowerShell: always a single-quoted literal (each single-quote character doubled), so the value is a
 * string both as a command argument and inside an expression (.Replace('a', 'b'), -match 'x').
 * ~ becomes $HOME in a double-quoted string.
 */
export function psQuote(value, { tilde: expand = true } = {}) {
  const s = String(value);
  const tilde = expand && s.match(/^~(?:[/\\](.*))?$/s);
  if (tilde) {
    if (!tilde[1]) return '$HOME';
    return '"$HOME/' + tilde[1].replace(PS_DQ_SPECIAL, '`$&') + '"';
  }
  return "'" + s.replace(PS_SQ, '$&$&') + "'";
}

export class UnquotableError extends Error {}
/** A cmd.exe value starting with `/`: refused only where it stands alone as an argument (see cmdTemplate). */
export class SwitchValueError extends UnquotableError {}

/**
 * cmd.exe (best effort): double quotes, ~ -> %USERPROFILE%. cmd expands %VAR% (and !VAR! with delayed
 * expansion) even inside double quotes and has no escape for `"` inside them, so values containing
 * % ! " or control characters are refused (the intent is reported as a gap for cmd).
 */
export function cmdQuote(value, { tilde: expand = true, attached = false } = {}) {
  let s = String(value);
  const home = expand && /^~(?=[/\\]|$)/.test(s);
  if (home) s = '%USERPROFILE%' + s.slice(1);
  const body = home ? s.slice('%USERPROFILE%'.length) : s;
  if (/[%!"\r\n\0]/.test(body)) throw new UnquotableError(`value ${JSON.stringify(String(value))} cannot be quoted safely for cmd.exe`);
  // cmd built-ins read /x as a switch even when quoted ("delete directory /q" -> rmdir /s /q); a value
  // glued to a switch (findstr /c:{pattern}) is not an argument of its own and is fine
  if (/^\//.test(s) && !attached) throw new SwitchValueError(`value ${JSON.stringify(String(value))} starts with / and would be read as a cmd.exe switch`);
  // Windows paths: / -> \ (an unquoted foo/q could be read as foo /q by built-ins); other values that
  // contain / are double-quoted
  if (expand || /^[A-Za-z]:|%USERPROFILE%/.test(s)) s = s.replace(/\//g, '\\');
  // an expanded %VAR% may contain spaces (C:\Users\John Smith): always double-quote it
  if (!s.includes('%') && /^[A-Za-z0-9_\\.:@+=-]+$/.test(s)) return s;
  // a closing quote after a backslash ("x\\") is an escaped quote for MSVC-parsed programs (where, tar, git) and
  // bsdtar rejects a doubled one; dropping it would let copy/move create a file. "x\\." keeps the directory meaning
  // for built-ins and native programs alike (checked on Windows: copy, if exist, where /r, dir, tar, forfiles, rmdir)
  if (/\\$/.test(s)) {
    // only a path may change form; a message or pattern ending in \ has no safe cmd.exe spelling (reported as a gap)
    if (!expand) throw new UnquotableError(`value ${JSON.stringify(String(value))} ends in \\ and cannot be quoted safely for cmd.exe`);
    s = s.replace(/\\+$/, '\\.');
  }
  return '"' + s + '"';
}

export const QUOTE = { bash: shQuote, zsh: shQuote, sh: shQuote, fish: fishQuote, powershell: psQuote, cmd: cmdQuote };

function posixTemplate(intent, env) {
  const v = VARIANTS[intent.id] || {};
  if (env.shell === 'zsh' && v.zsh) return { tpl: v.zsh, variant: 'zsh' };
  if (env.os === 'darwin') {
    if (env.coreutils === 'gnu' && v.gnuMac) return { tpl: v.gnuMac, variant: 'gnuMac' };
    if (v.bsd) return { tpl: v.bsd, variant: 'bsd' };
    if (intent.darwin) return { tpl: intent.darwin, variant: 'darwin' };
    return { tpl: intent.template, variant: 'posix' };
  }
  if (env.coreutils === 'busybox' && v.busybox) return { tpl: v.busybox, variant: 'busybox' };
  return { tpl: intent.template, variant: 'posix' };
}

const CMD_HOLD = /\uE000(\d+)\uE001/g;
const cmdTemplates = new WeakMap();
/**
 * Function templates for cmd.exe: a value starting with `/` is refused only where it is an argument of
 * its own. Glued to a switch (`findstr /c:${q(pattern)}`) it cannot be read as one, so it is kept.
 */
function cmdTemplate(fn) {
  if (!cmdTemplates.has(fn)) {
    cmdTemplates.set(fn, (vals, q, ctx) => {
      const held = [];
      const q2 = (v, o) => {
        try { return q(v, o); } catch (err) {
          if (!(err instanceof SwitchValueError)) throw err;
          held.push({ v, err });
          return `\uE000${held.length - 1}\uE001`;
        }
      };
      const out = fn(vals, q2, ctx);
      return out.replace(CMD_HOLD, (m, i, at) => {
        const h = held[+i];
        if (!/\/\w+:$/.test(out.slice(0, at))) throw h.err;
        return cmdQuote(h.v, { tilde: false, attached: true });
      });
    });
  }
  return cmdTemplates.get(fn);
}

/**
 * -> { tpl, kind: 'posix'|'fish'|'pwsh'|'cmd', variant, wrapPosix?: boolean, gap?: string }
 * wrapPosix: render the POSIX template and wrap it as `bash -c '...'` (PowerShell on unix).
 */
export function chooseTemplate(intent, env) {
  const v = VARIANTS[intent.id] || {};
  const shell = env.shell;
  if (shell === 'fish') {
    if (v.fish) return { tpl: v.fish, kind: 'fish', variant: 'fish' };
    return { ...posixTemplate(intent, env), kind: 'fish' };
  }
  if (shell === 'powershell') {
    const p = v.pwsh;
    const win = env.os === 'win32';
    const t = p == null ? null : typeof p === 'string' || typeof p === 'function' ? p : win ? p.win : p.unix;
    if (t) return { tpl: t, kind: 'pwsh', variant: 'pwsh' };
    if (!win) return { ...posixTemplate(intent, env), kind: 'pwsh', wrapPosix: true };
    return { tpl: null, kind: 'pwsh', gap: v.gaps?.pwsh || 'no PowerShell equivalent on Windows yet' };
  }
  if (shell === 'cmd') {
    if (v.cmd) return { tpl: typeof v.cmd === 'function' ? cmdTemplate(v.cmd) : v.cmd, kind: 'cmd', variant: 'cmd' };
    return { tpl: null, kind: 'cmd', gap: v.gaps?.cmd || 'no cmd.exe equivalent yet (try PowerShell)' };
  }
  return { ...posixTemplate(intent, env), kind: 'posix' };
}

/**
 * PowerShell 5.1 and pwsh < 7.3 ("Legacy" native argument passing) build a native program's command
 * line by wrapping arguments with spaces in "..." without escaping embedded `"` (and a trailing `\`
 * then escapes the closing quote); empty arguments are dropped. `\"` would be right for Legacy but
 * wrong for 7.3+ (Standard/Windows), so no escaping is correct for both: values like that are refused
 * for native programs (git, tar, curl.exe, ssh, ...) and the intent is reported as a gap. Cmdlets and
 * .NET expressions receive the single-quoted literal unchanged and are not affected.
 */
export const unsafeNativePwshArg = (v) => { const s = String(v); return s === '' || s.includes('"') || (/\s/.test(s) && /\\$/.test(s)); };
const PS_KEYWORDS = new Set(['if', 'elseif', 'else', 'foreach', 'for', 'while', 'do', 'switch', 'return', 'try', 'catch', 'finally']);
/** Slots of a PowerShell string template that are arguments of a native program (not a cmdlet/expression). */
export function pwshNativeSlots(tpl) {
  const out = new Set();
  if (typeof tpl !== 'string') return out;
  // Placeholders are masked first (same length, so indices still line up): the `{` of an earlier
  // slot must not be taken for a script-block brace, which made that placeholder look like the
  // command head and skipped every later slot (`tar -czvf {archive} {path}`, `scp {target}:{dst}`).
  const masked = tpl.replace(/\{(\w+)(!raw)?\}/g, (m) => '\u0001'.repeat(m.length)).replace(/[«»]/g, ' ');
  for (const m of tpl.matchAll(/\{(\w+)(!raw)?\}/g)) {
    if (m[2]) continue;
    const seg = masked.slice(0, m.index).split(/[;|{}(]/).pop();
    // the first word of the segment that is not (part of) a placeholder
    const head = seg.trim().split(/\s+/).find((w) => w && !/\u0001/.test(w)) || '';
    if (/^[A-Za-z][\w.-]*$/.test(head) && !/^[A-Za-z]+-[A-Za-z]+$/.test(head) && !PS_KEYWORDS.has(head.toLowerCase())) out.add(m[1]);
  }
  return out;
}

export const quoteForKind =(kind, wrapPosix) => (wrapPosix ? shQuote : { posix: shQuote, fish: fishQuote, pwsh: psQuote, cmd: cmdQuote }[kind]);
const SEL_CLAUSE_END = /^(?:and|then|i|oraz|potem|so)$/;
// a number of something else ("issue 12", "2 approvals", "in 5 minutes"), not a candidate pull request / run
const SEL_NUM_OTHER_BEFORE = /^(?:issues?|tickets?|bugs?|zgloszeni\w*|fix(?:es)?|closes|resolves|line|lines|linii|top|last|first)$/;
const SEL_NUM_UNIT_AFTER = /^(?:secs?|seconds?|mins?|minutes?|minut\w*|hours?|hrs?|godzin\w*|days?|dni|dzien|weeks?|tygodn\w*|months?|miesi\w*|years?|lat\w*|times?|razy|ago|temu|old|more|approvals?|reviews?|reviewers?|commits?|files?|lines?|changes?|comments?|checks?)$/;
const SEL_ENV_ALIAS = (w) => (/^(?:prod|production|produkc\w*)$/.test(w) ? 'prod' : /^(?:staging|stage|stagingu|stagingowe\w*)$/.test(w) ? 'staging' : w);
const tokenClean = (w) => w.replace(/^[("'`„“”]+|[)"'`“”.,!?;:]+$/g, '');
/** The selector slots of a request that are contested (an alternative, a negation, two candidates): withheld (`?`). */
export function contestedSlots(intentId, text, values = {}) {
  // a slot already withheld (`?`) still takes the alternative / negation next to its candidates
  const slots = CONTESTED(intentId).filter((k) => values[k] != null);
  if (!slots.some((k) => !String(values[k]).startsWith('?'))) return [];
  const raw = foldKeepLength(String(text)).toLowerCase().split(/\s+/).filter(Boolean);
  const words = raw.map(tokenClean);
  const ends = raw.map((w, i) => /[.,;!?:]$/.test(w) || SEL_CLAUSE_END.test(words[i]));
  // the candidate values of a slot, by token index
  const candidates = (k) => {
    const out = new Map();
    const v = foldKeepLength(String(values[k])).toLowerCase();
    words.forEach((w, i) => {
      const bare = w.replace(/^#(?=\d)/, '');
      if (bare === v || (k === 'repo' && RAW_OK.repo(repoValue(w)) && repoKey(repoValue(w)) === repoKey(v))) out.set(i, k === 'repo' ? repoKey(v) : v);
      if ((k === 'pr' || k === 'num') && /^\d{1,12}$/.test(bare) && !SEL_NUM_OTHER_BEFORE.test(words[i - 1] ?? '') && !SEL_NUM_UNIT_AFTER.test(words[i + 1] ?? '')) out.set(i, bare);
      if (k === 'pr') { const u = w.match(/\/pull\/(\d{1,12})\/?$/); if (u) out.set(i, /^\d+$/.test(v) ? u[1] : w); }
      if (k === 'repo' && /\//.test(w) && RAW_OK.repo(repoValue(w)) && (/^(?:--repo|-r|repo|repository|repozytorium|in|of|on|from|at|to|w|z)$/.test(words[i - 1] ?? '') || /^--repo=/.test(w))) out.set(i, repoKey(repoValue(w.replace(/^--repo=/, ''))));
      if (k === 'wenv') {
        const opt = w.match(/^(?:--env|env)=(.+)$/);
        if (opt) out.set(i, SEL_ENV_ALIAS(opt[1]));
        else if (/^(?:--env|-e)$/.test(words[i - 1] ?? '') && RAW_OK.wenv(w)) out.set(i, SEL_ENV_ALIAS(w));
        else if (WR_ENV_STRONG.test(w) || /^produkc/.test(w)) out.set(i, SEL_ENV_ALIAS(w));
        if (out.get(i) === SEL_ENV_ALIAS(v) || w === v) out.set(i, SEL_ENV_ALIAS(v));
      }
    });
    return out;
  };
  const cand = Object.fromEntries(slots.map((k) => [k, candidates(k)]));
  const out = new Set(slots.filter((k) => new Set(cand[k].values()).size > 1));
  // the slots of the nearest candidate within n words of i, in the same clause
  const nearest = (i, step, n) => {
    for (let j = i + step, m = 0; j >= 0 && j < words.length && m < n; j += step, m++) {
      const hit = slots.filter((k) => cand[k].has(j));
      if (hit.length) return hit;
      if (ends[step > 0 ? j : j - 1]) break;
    }
    return [];
  };
  words.forEach((w, i) => {
    const alt = SEL_ALT.test(w);
    if (!alt && (!SEL_NEG.test(w) || SEL_NEG_STATE.test(words[i + 1] ?? ''))) return;
    const hit = [...(/[.,;!?:]$/.test(raw[i]) ? [] : nearest(i, 1, 5)), ...(alt ? nearest(i, -1, 3) : [])];
    for (const k of hit) out.add(k);
  });
  return [...out].filter((k) => !String(values[k]).startsWith('?'));
}

function renderValue(name, raw, values, quote) {
  if (!(name in values)) return null;
  let val = values[name];
  if (raw) return RAW_OK[name] && !RAW_OK[name](val) ? null : String(val);
  if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
  return quote(val, { tilde: PATH_SLOTS.has(name), name });
}

const SLOT_NAMES = /^(path|file|count|src|dst|archive|glob|namepat|sedexpr|age|days|size|depth|port|rport|rhost|pid|mode|var|name|service|container|pkg|cmd|branch|user|pattern|host|target|message|url|since|dest|text|ext|minutes|sizeBytes|old|new)$/;

/**
 * Fill a template. Returns { command, missing[] }.
 * `values` = resolved slots merged over intent defaults.
 */
export function render(template, values, required = [], quote = shQuote, keepOptional = []) {
  const missing = [];
  const isSlot = (name) => name in values || required.includes(name) || SLOT_NAMES.test(name);
  // Single pass over the template: every {slot} and «optional segment» is substituted exactly once and
  // inserted values are never scanned again (a value containing "{file}" must stay inert text).
  const out = template.replace(/«([^»]*)»|\{(\w+)(!raw)?\}/g, (m, seg, name, raw) => {
    if (seg != null) {
      let ok = true;
      const r = seg.replace(/\{(\w+)(!raw)?\}/g, (m2, n2, raw2) => {
        if (!ok) return m2;
        const val = renderValue(n2, !!raw2, values, quote);
        // an operand withheld on purpose (keepOptional: an invalid operand, an unresolved history value) keeps its
        // placeholder: the optional part is not silently dropped (`npm install <PKG>`, never `npm install`)
        if (val == null && keepOptional.includes(n2)) { missing.push(n2); return PLACEHOLDER(n2); }
        if (val == null) { ok = false; return m2; }
        return val;
      });
      return ok ? (/^\s/.test(r) ? r : ' ' + r) : '';
    }
    if (!isSlot(name)) return m; // not a slot (e.g. awk braces, %{http_code}, PowerShell script blocks)
    const val = renderValue(name, !!raw, values, quote);
    if (val == null) {
      missing.push(name);
      return PLACEHOLDER(name);
    }
    return val;
  });
  // an optional segment at the very start (`«mkdir -p {dest} && »tar …`) must not leave a leading space
  return { command: out.replace(/^\s+/, ''), missing };
}

const DERIVED_REQUIRED = { namepat: 'name', glob: 'ext', sedexpr: 'old' };

const SIZE_MULT = { c: 1, k: 1024, M: 1024 ** 2, G: 1024 ** 3 };
/** Slots derived from others so every shell can use the unit it needs (find: -mmin/-size, PowerShell: minutes/bytes). */
export function deriveSlots(v) {
  // ssh -L: the remote port is the local one unless the request names another
  if (v.rhost != null && v.rport == null && v.port != null) v.rport = v.port;
  if (v.glob && v.ext == null) { const m = String(v.glob).match(/^\*\.([\w]+)$/); if (m) v.ext = m[1]; }
  if (v.minutes == null && v.age) {
    const m = String(v.age).match(/^-m(min|time) -(\d+)$/);
    if (m) v.minutes = m[1] === 'min' ? +m[2] : +m[2] * 1440;
  }
  if (v.sizeBytes == null && v.size != null) {
    const m = String(v.size).match(/^(\d+)([ckMG]?)$/);
    if (m) v.sizeBytes = +m[1] * (SIZE_MULT[m[2]] ?? 512);
  }
  return v;
}

/** env from the legacy `platform` option */
export const envFromPlatform = (platform = process.platform) => ({
  shell: 'bash',
  os: platform === 'darwin' ? 'darwin' : platform === 'win32' ? 'win32' : 'linux',
  coreutils: platform === 'darwin' ? 'bsd' : 'gnu',
});

/**
 * Build a full suggestion for an intent and query.
 *   env: { shell, os, coreutils } (default: bash on `platform`)
 *   resolved: pre-resolved slot values (skips extraction; used by the cascade/tagger and history rules)
 * @returns {{intent, command, risk, baseRisk, warnings, critical, missing, slots, notes, shell, variant, gap}}
 */
export function buildCommand(intentId, text, { platform = process.platform, env, extracted, resolved: given, blank = [], keepOptional = [] } = {}) {
  const intent = BY_ID[intentId];
  if (!intent) throw new Error(`unknown intent ${intentId}`);
  const e = env || envFromPlatform(platform);
  const resolved = given || resolveSlots(intent, extracted || extractSlots(text));
  const defaults = { ...intent.slots, ...(e.os === 'darwin' ? intent.darwinDefaults : {}) };
  const values = {};
  for (const [k, d] of Object.entries(defaults)) if (d != null) values[k] = d;
  Object.assign(values, resolved);
  // blank: slots withheld on purpose (refused reference, ambiguous path): no default stands in for them
  for (const k of blank) if (resolved[k] == null) delete values[k];
  // the filesystem root ("whole disk", "na całym dysku") is the system drive for Windows shells
  if (e.os === 'win32' && (e.shell === 'powershell' || e.shell === 'cmd')) {
    for (const k of PATH_SLOTS) if (values[k] === '/') values[k] = 'C:\\';
  }
  deriveSlots(values);
  // (a withheld slot is not derived from another one either: `<RPORT>`, never the local port)
  for (const k of blank) if (resolved[k] == null) delete values[k];
  const required = [...new Set([...Object.entries(intent.slots).filter(([, d]) => d == null).map(([k]) => k), ...blank.filter((k) => !(k in values))])];

  const choice = chooseTemplate(intent, e);
  const base = {
    intent: intent.id, description: intent.description, baseRisk: intent.risk, slots: resolved,
    notes: intent.notes || null, shell: e.shell, os: e.os, variant: choice.variant || null,
  };
  if (choice.gap) {
    return { ...base, command: null, gap: choice.gap, risk: intent.risk, warnings: [], critical: false, missing: [] };
  }
  const baseQuote = quoteForKind(choice.kind, choice.wrapPosix);
  const tpl = choice.tpl;
  const pwshNative = choice.kind === 'pwsh' && !choice.wrapPosix;
  const nativeSlots = pwshNative ? pwshNativeSlots(tpl) : new Set();
  const quote = !pwshNative ? baseQuote : (v, o = {}) => {
    // function templates: every value is checked (the target program is not known statically)
    if ((typeof tpl === 'function' || nativeSlots.has(o.name)) && unsafeNativePwshArg(v)) {
      throw new UnquotableError(`value ${JSON.stringify(String(v))} cannot be passed to a native program safely by PowerShell < 7.3 (embedded " or trailing \\)`);
    }
    return baseQuote(v, o);
  };
  let command;
  let missing = [];
  try {
    if (typeof tpl === 'function') {
      const vals = { ...values };
      for (const r of required) if (!(r in vals)) { missing.push(r); vals[r] = PLACEHOLDER(r); }
      // only path slots may get a ./ prefix; any other value starting with - would be read as an
      // option (printf -n, findstr /?, taskkill ...): it is left as a placeholder instead
      for (const [k, v] of Object.entries(vals)) {
        if (!PATH_SLOTS.has(k) && !RAW_OK[k] && typeof v === 'string' && /^-/.test(v)) { missing.push(k); vals[k] = PLACEHOLDER(k); }
      }
      // slot role must be passed explicitly ({ name } or { tilde }); never infer from value
      // equality — a pattern equal to a path would otherwise be rewritten like a path
      const q = (s, o = {}) => {
        const isPath = 'tilde' in o ? !!o.tilde : PATH_SLOTS.has(o.name);
        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { ...o, tilde: isPath });
      };
      // catalog functions take the OS string, variant functions a ctx object
      command = tpl(vals, q, tpl === intent.template || tpl === intent.darwin ? e.os : e);
      if (/<TEXT>/.test(command)) missing.push('text');
    } else {
      ({ command, missing } = render(tpl, values, required, quote, keepOptional.filter((k) => blank.includes(k) && !(k in values))));
      missing = missing.map((m) => DERIVED_REQUIRED[m] || m);
    }
  } catch (err) {
    if (!(err instanceof UnquotableError)) throw err;
    return { ...base, command: null, gap: err.message, risk: intent.risk, warnings: [], critical: false, missing: [] };
  }
  if (choice.wrapPosix) {
    // PowerShell < 7.3 drops embedded double quotes when passing arguments to native programs, so a
    // POSIX command containing `"` is fed to bash on stdin instead of as a -c argument.
    if (command.includes('"')) { command = psQuote(command) + ' | bash'; base.variant = 'piped to bash (no native PowerShell variant)'; }
    else { command = 'bash -c ' + psQuote(command); base.variant = 'bash -c (no native PowerShell variant)'; }
  }
  missing = [...new Set(missing)];
  // the trust rule (danger.js): this is tellsh's own render; it can be rated safe only when every value it was given is
  // a plain literal (a missing value is tellsh's own <PLACEHOLDER>, and the command cannot run before it is edited)
  const used = typeof tpl === 'function' ? Object.keys(values) : [...String(tpl).matchAll(/\{(\w+)(!raw)?\}/g)].map((m) => m[1]);
  const plain = used.every((k) => !(k in values) || plainSlotValue(k, values[k], { dashOk: PATH_SLOTS.has(k) || (!!RAW_OK[k] && RAW_OK[k](values[k])) }));
  const danger = checkDanger(command, intent.risk, { rendered: plain, shell: choice.kind === 'pwsh' && !choice.wrapPosix ? 'powershell' : e.shell, os: e.os });
  return {
    ...base,
    command,
    risk: maxRisk(intent.risk, danger.risk),
    warnings: danger.warnings,
    critical: danger.critical,
    missing,
  };
}

 succeeded in 0ms:
// Per-shell / per-OS template variants (see src/render.js for precedence). Keys are intent ids from src/catalog.js.
//
// Keys per intent (all optional):
//   bsd      macOS/BSD userland (bash/zsh/sh on macOS without GNU coreutils), used before catalog `darwin`
//   gnuMac   macOS + Homebrew GNU coreutils (g-prefixed: gdu, gsort, gmd5sum, guniq, ...)
//   zsh      zsh only (bash/sh keep the POSIX choice)
//   busybox  BusyBox userland (Alpine etc.) - only where the GNU template uses flags/tools busybox lacks
//   fish     fish 3.x - only where the POSIX template is not valid fish
//   pwsh     PowerShell: a string (all OSes) or { win, unix }. A missing `unix` means the renderer falls back
//            to `bash -c '<posix command>'` (used where Linux and macOS natives differ). A missing `win`
//            is a Windows gap and is explained in gaps.pwsh ("Windows: ...").
//   cmd      cmd.exe, best effort
//   gaps     { shell: reason } when a shell/OS has no reasonable equivalent
//
// Template syntax is the catalog one ({slot}, {slot!raw}, «optional»). Function templates get
// (s, q, ctx) with ctx = { os, shell, coreutils }; `q` quotes for the target shell.
// PowerShell variants avoid `&&`/`||` (5.1 compat) and aliases, use -LiteralPath for user paths and
// never add -Force to destructive cmdlets unless the POSIX template forces too. Derived slots:
// ext (bare extension), minutes (time window in minutes), sizeBytes (size in bytes).

// Recursive file listing used by many PowerShell variants (-Force = include hidden files, like find).
const PS_FILES = 'Get-ChildItem -LiteralPath {path} -File -Recurse -Force -ErrorAction SilentlyContinue';
const PS_ALL = 'Get-ChildItem -LiteralPath {path} -Recurse -Force -ErrorAction SilentlyContinue';
const PS_FULLNAME = 'Select-Object -ExpandProperty FullName';
const PS_PROC_MATCH = 'Get-Process | Where-Object { $_.ProcessName -match {name} -or $_.CommandLine -match {name} }';
const PS_OS = 'Get-CimInstance -ClassName Win32_OperatingSystem';
const isWin = (ctx) => (ctx && ctx.os) === 'win32';

export const VARIANTS = {
  // ---------- files & disk ----------
  largest_files: {
    bsd: 'find {path} -xdev -type f -exec du -k {} + 2>/dev/null | sort -rn | head -n {count!raw}',
    gnuMac: 'find {path} -xdev -type f -exec du -h {} + 2>/dev/null | gsort -rh | head -n {count!raw}',
    pwsh: `${PS_FILES} | Sort-Object Length -Descending | Select-Object -First {count!raw} -Property Length, FullName`,
    gaps: { cmd: 'cmd.exe cannot sort files by size across subdirectories' },
  },
  largest_dirs: {
    bsd: 'du -k -d 1 {path} 2>/dev/null | sort -rn | head -n {count!raw}',
    gnuMac: 'gdu -h -d 1 {path} 2>/dev/null | gsort -rh | head -n {count!raw}',
    pwsh: "Get-ChildItem -LiteralPath {path} -Directory -Force | ForEach-Object { [pscustomobject]@{ Size = (Get-ChildItem -LiteralPath $_.FullName -File -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum; Path = $_.FullName } } | Sort-Object Size -Descending | Select-Object -First {count!raw}",
    gaps: { cmd: 'cmd.exe cannot sum and sort directory sizes' },
  },
  disk_free: {
    pwsh: { win: 'Get-PSDrive -PSProvider FileSystem', unix: 'df -h' },
    gaps: { cmd: 'fsutil volume diskfree needs an elevated prompt; use PowerShell (Get-PSDrive)' },
  },
  dir_size: {
    pwsh: `${PS_FILES} | Measure-Object -Property Length -Sum | Select-Object Count, Sum, @{ Name = 'MB'; Expression = { [math]::Round($_.Sum / 1MB, 1) } }`,
    cmd: 'dir /s /a {path}',
  },
  find_by_name: {
    pwsh: `${PS_ALL} | Where-Object Name -Like {namepat} | ${PS_FULLNAME}`,
    cmd: 'where /r {path} {namepat}',
  },
  find_by_ext: {
    pwsh: `${PS_FILES} | Where-Object Name -Like {glob}«| Where-Object LastWriteTime -GT (Get-Date).AddMinutes(-{minutes!raw})» | ${PS_FULLNAME}`,
    cmd: 'where /r {path} {glob}',
  },
  find_recent: {
    pwsh: `${PS_FILES} | Where-Object LastWriteTime -GT (Get-Date).AddMinutes(-{minutes!raw})«| Where-Object Name -Like {glob}» | ${PS_FULLNAME}`,
    gaps: { cmd: 'forfiles only filters by whole days, not by an arbitrary time window' },
  },
  find_older_than: {
    pwsh: `${PS_FILES} | Where-Object LastWriteTime -LT (Get-Date).AddDays(-{days!raw})«| Where-Object Name -Like {glob}» | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s /d -{days!raw}«/m {glob}» /c "cmd /c if @isdir==FALSE echo @path"',
  },
  find_larger_than: {
    busybox: 'find {path} -type f -size +{sizeBytes!raw}c«-iname {glob}» -exec ls -lh {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Where-Object Length -GT {sizeBytes!raw} | Select-Object Length, LastWriteTime, FullName`,
    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize GTR {sizeBytes!raw} echo @path @fsize"',
  },
  find_smaller_than: {
    busybox: 'find {path} -type f -size -{sizeBytes!raw}c«-iname {glob}»',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Where-Object Length -LT {sizeBytes!raw} | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize LSS {sizeBytes!raw} echo @path"',
  },
  grep_text: {
    busybox: 'find {path} -type f«-iname {glob}» -exec grep -Hn -- {pattern} {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -Pattern {pattern}`,
    cmd: (s, q) => `pushd ${q(s.path ?? '.', { name: 'path' })} && (findstr /s /n /c:${q(s.pattern, { name: 'pattern' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} & popd)`,
  },
  grep_files_containing: {
    busybox: 'find {path} -type f«-iname {glob}» -exec grep -l -- {pattern} {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -List -Pattern {pattern} | Select-Object -ExpandProperty Path`,
    cmd: (s, q) => `pushd ${q(s.path ?? '.', { name: 'path' })} && (findstr /s /m /c:${q(s.pattern, { name: 'pattern' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} & popd)`,
  },
  count_lines: {
    pwsh: '@(Get-Content -LiteralPath {file}).Count',
    cmd: 'find /c /v "" {file}',
  },
  count_lines_code: {
    pwsh: `(${PS_FILES} | Where-Object Name -Like {glob} | Get-Content | Measure-Object).Count`,
    gaps: { cmd: 'no reliable way to concatenate files recursively and count lines in cmd.exe' },
  },
  count_files: {
    pwsh: `(${PS_FILES}«| Where-Object Name -Like {glob}» | Measure-Object).Count`,
    cmd: (s, q) => `where /r ${q(s.path ?? '.', { name: 'path' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} | find /c /v ""`,
  },
  count_words: {
    pwsh: '(Get-Content -LiteralPath {file} -Raw | Measure-Object -Word).Words',
    gaps: { cmd: 'cmd.exe has no word counter' },
  },
  sort_uniq: {
    pwsh: 'Get-Content -LiteralPath {file} | Group-Object -NoElement -CaseSensitive | Sort-Object Count -Descending | Select-Object -First {count!raw}',
    gaps: { cmd: 'cmd.exe has no uniq/group-by equivalent' },
  },
  recent_files: {
    busybox: "find {path} -type f -exec stat -c '%Y %y %n' {} + 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-",
    pwsh: `${PS_FILES} | Sort-Object LastWriteTime -Descending | Select-Object -First {count!raw} -Property LastWriteTime, FullName`,
    gaps: { cmd: 'dir /o-d sorts only within each directory, not recursively' },
  },
  empty_files: {
    pwsh: `${PS_FILES} | Where-Object Length -EQ 0 | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s /c "cmd /c if @isdir==FALSE if @fsize==0 echo @path"',
  },
  empty_dirs: {
    pwsh: `Get-ChildItem -LiteralPath {path} -Directory -Recurse -Force -ErrorAction SilentlyContinue | Where-Object { -not (Get-ChildItem -LiteralPath $_.FullName -Force | Select-Object -First 1) } | ${PS_FULLNAME}`,
    gaps: { cmd: 'cmd.exe cannot test directories for emptiness recursively' },
  },
  duplicate_files: {
    gnuMac: 'find {path} -type f -exec gmd5sum {} + | gsort | guniq -w32 -dD',
    busybox: "find {path} -type f -exec md5sum {} + | sort | awk '{ k = substr($0, 1, 32) } k == p { if (!shown) print last; print; shown = 1; next } { p = k; last = $0; shown = 0 }'",
    pwsh: `${PS_FILES} | Get-FileHash -Algorithm MD5 -ErrorAction SilentlyContinue | Group-Object -Property Hash | Where-Object Count -GT 1 | ForEach-Object Group | Select-Object Hash, Path`,
    gaps: { cmd: 'cmd.exe cannot hash and group files' },
  },
  find_symlinks: {
    busybox: 'find {path} -type l -exec ls -l {} +',
    pwsh: `${PS_ALL} | Where-Object LinkType -EQ 'SymbolicLink' | Select-Object FullName, Target`,
    cmd: 'dir /s /al {path}',
  },
  broken_symlinks: {
    busybox: 'find -L {path} -type l',
    pwsh: `${PS_ALL} | Where-Object { $_.LinkType -eq 'SymbolicLink' -and -not (Test-Path -LiteralPath ([System.IO.Path]::Combine([System.IO.Path]::GetDirectoryName($_.FullName), [string]$_.Target))) } | ${PS_FULLNAME}`,
    gaps: { cmd: 'cmd.exe cannot check symlink targets' },
  },
  list_files: {
    pwsh: 'Get-ChildItem -LiteralPath {path} -Force',
    cmd: 'dir /a {path}',
  },
  list_tree: {
    pwsh: String.raw`Get-ChildItem -LiteralPath {path} -Recurse -Depth ({depth!raw} - 1) -Force -ErrorAction SilentlyContinue | Where-Object FullName -NotMatch '[\\/]\.git([\\/]|$)' | Sort-Object FullName | ` + PS_FULLNAME,
    gaps: { cmd: 'tree has no depth limit' },
  },
  hidden_files: {
    pwsh: "Get-ChildItem -LiteralPath {path} -Force | Where-Object { $_.Name -like '.*' -or $_.Attributes -band [System.IO.FileAttributes]::Hidden }",
    // dotfiles are not hidden on Windows: list both the Hidden attribute and names starting with a dot
    cmd: 'pushd {path} && (dir /a:h /b 2>nul & dir /a /b .* & popd)',
  },
  file_type: {
    // Windows has no content sniffing like file(1); show what the filesystem knows instead.
    pwsh: { win: 'Get-Item -LiteralPath {file} -Force | Select-Object Name, Extension, Length, Attributes, LinkType', unix: 'file {file}' },
    gaps: { cmd: 'no file(1) equivalent on Windows' },
  },
  file_stat: {
    pwsh: 'Get-Item -LiteralPath {file} -Force | Format-List FullName, Mode, Length, CreationTime, LastWriteTime, LastAccessTime',
    cmd: 'dir /a /q {file}',
  },
  head_file: {
    pwsh: 'Get-Content -LiteralPath {file} -TotalCount {count!raw}',
    gaps: { cmd: 'cmd.exe has no head equivalent' },
  },
  tail_file: {
    pwsh: 'Get-Content -LiteralPath {file} -Tail {count!raw}',
    gaps: { cmd: 'cmd.exe has no tail equivalent' },
  },
  tail_follow: {
    pwsh: 'Get-Content -LiteralPath {file} -Tail 10 -Wait',
    gaps: { cmd: 'cmd.exe cannot follow a file' },
  },
  cat_file: {
    pwsh: 'Get-Content -LiteralPath {file}',
    cmd: 'type {file}',
  },
  print_line_range: {
    pwsh: 'Get-Content -LiteralPath {file} | Select-Object -Index (({start!raw} - 1)..({end!raw} - 1))',
    gaps: { cmd: 'cmd.exe has no command that prints a line range of a file' },
  },
  compress_targz: {
    pwsh: 'tar -czvf {archive} {path}', // tar.exe ships with Windows 10 1803+
    cmd: 'tar -czvf {archive} {path}',
  },
  extract_targz: {
    // tar -C needs an existing directory (like the POSIX template, create it first)
    pwsh: '«if (-not (Test-Path -LiteralPath {dest} -PathType Container)) { New-Item -ItemType Directory -Path {dest} | Out-Null }; »tar -xzvf {file}«-C {dest}»',
    cmd: '«mkdir {dest} 2>nul & »tar -xzvf {file}«-C {dest}»',
  },
  compress_zip: {
    // Windows: Compress-Archive aborts on a broken symlink or a locked file; bsdtar (Windows 10+) picks zip from .zip.
    // Elsewhere tar may be GNU tar (no zip format): keep Compress-Archive.
    pwsh: { win: 'tar -a -c -f {archive} {path}', unix: 'Compress-Archive -LiteralPath {path} -DestinationPath {archive}' },
    cmd: 'tar -a -c -f {archive} {path}', // bsdtar picks zip format from the .zip suffix
  },
  extract_zip: {
    pwsh: (s, q) => `Expand-Archive -LiteralPath ${q(s.file, { name: 'file' })} -DestinationPath ${s.dest ? q(s.dest, { name: 'dest' }) : '.'}`,
    cmd: '«mkdir {dest} 2>nul & »tar -xf {file}«-C {dest}»',
  },
  list_archive: {
    // bsdtar on Windows lists zip archives too; GNU tar on Linux does not.
    pwsh: (s, q, ctx) => (!isWin(ctx) && /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file, { name: 'file' })}` : `tar -tvf ${q(s.file, { name: 'file' })}`),
    cmd: 'tar -tvf {file}',
  },
  chmod: {
    pwsh: { unix: 'chmod {mode!raw} {file}' },
    gaps: { pwsh: 'Windows: no POSIX permission bits (use icacls)', cmd: 'no POSIX permission bits (use icacls)' },
  },
  make_executable: {
    pwsh: { unix: 'chmod +x {file}' },
    gaps: { pwsh: 'Windows: no executable bit (determined by file extension)', cmd: 'no executable bit (determined by file extension)' },
  },
  chown: {
    pwsh: { win: 'icacls {path} /setowner {user} /T', unix: 'sudo chown -R {user} {path}' },
    cmd: 'icacls {path} /setowner {user} /T',
  },
  copy: {
    // -Confirm keeps cp -i's "ask before overwriting" safety (Copy-Item overwrites silently).
    pwsh: 'Copy-Item -LiteralPath {src} -Destination {dst} -Recurse -Confirm',
    cmd: 'copy /-y {src} {dst}',
  },
  move_rename: {
    // Move-Item refuses to overwrite an existing file without -Force, which matches mv -i's safety.
    pwsh: 'Move-Item -LiteralPath {src} -Destination {dst}',
    cmd: 'move /-y {src} {dst}',
  },
  delete_file: {
    pwsh: 'Remove-Item -LiteralPath {file}',
    cmd: 'del {file}',
  },
  delete_dir: {
    pwsh: 'Remove-Item -LiteralPath {path} -Recurse',
    cmd: 'rmdir /s {path}',
  },
  delete_by_ext: {
    busybox: 'find {path} -type f -iname {glob} -exec rm {} +',
    pwsh: `${PS_FILES} | Where-Object Name -Like {glob} | Remove-Item`,
    cmd: 'pushd {path} && (del /s {glob} & popd)',
  },
  mkdir: {
    // mkdir -p without -Force: an existing directory is left alone, New-Item never replaces anything (-Force would replace a
    // registry key on HKCU:, whatever -ItemType says)
    pwsh: 'if (-not (Test-Path -LiteralPath {path} -PathType Container)) { New-Item -ItemType Directory -Path {path} }',
    // mkdir -p: an existing directory is not an error (cmd's mkdir already creates parents); a trailing \ makes
    // `if exist` test for a directory, so an existing file of that name still fails like mkdir -p does
    cmd: (s, q) => { const p = q(s.path, { name: 'path' }); const dir = /"$/.test(p) ? p.slice(0, -1) + '\\"' : p + '\\'; return `if not exist ${dir} mkdir ${p}`; },
  },
  touch_file: {
    pwsh: 'if (Test-Path -LiteralPath {file}) { (Get-Item -LiteralPath {file}).LastWriteTime = Get-Date } else { New-Item -ItemType File -Path {file} }',
    cmd: 'type nul >> {file}',
  },
  current_dir: {
    pwsh: 'Get-Location',
    cmd: 'cd',
  },
  create_symlink: {
    pwsh: 'New-Item -ItemType SymbolicLink -Path {dst} -Target {src}',
    cmd: 'mklink {dst} {src}',
  },
  diff_files: {
    pwsh: {
      win: 'Compare-Object -ReferenceObject (Get-Content -LiteralPath {src}) -DifferenceObject (Get-Content -LiteralPath {dst})',
      unix: 'diff -u {src} {dst}',
    },
    cmd: 'fc {src} {dst}',
  },
  replace_text: {
    pwsh: '(Get-Content -LiteralPath {file} -Raw).Replace({old}, {new}) | Set-Content -LiteralPath {file} -NoNewline',
    gaps: { cmd: 'cmd.exe has no in-place text replacement' },
  },
  disk_mounts: {
    busybox: 'mount',
    pwsh: { win: 'Get-Volume' },
    cmd: 'mountvol',
  },
  block_devices: {
    busybox: 'cat /proc/partitions',
    pwsh: { win: 'Get-Partition' },
    gaps: { cmd: 'wmic is deprecated/removed and diskpart needs admin' },
  },
  hash_sha256: {
    pwsh: 'Get-FileHash -LiteralPath {file} -Algorithm SHA256',
    cmd: 'certutil -hashfile {file} SHA256',
  },
  hash_md5: {
    pwsh: 'Get-FileHash -LiteralPath {file} -Algorithm MD5',
    cmd: 'certutil -hashfile {file} MD5',
  },
  base64_encode: {
    pwsh: (s, q) => (s.file
      ? `[Convert]::ToBase64String([System.IO.File]::ReadAllBytes((Resolve-Path -LiteralPath ${q(s.file, { name: 'file' })}).ProviderPath))`
      : `[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(${q(s.text ?? '<TEXT>', { name: 'text' })}))`),
    gaps: { cmd: 'certutil -encode writes to a file with PEM headers, not to stdout' },
  },
  base64_decode: {
    pwsh: (s, q) => (s.file
      ? `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String((Get-Content -LiteralPath ${q(s.file, { name: 'file' })} -Raw)))`
      : `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(${q(s.text ?? '<TEXT>', { name: 'text' })}))`),
    gaps: { cmd: 'certutil -decode writes to a file, not to stdout' },
  },

  // ---------- processes ----------
  top_cpu: {
    busybox: 'top -b -n 1 | head -n $(({count!raw} + 4))',
    pwsh: 'Get-Process | Sort-Object CPU -Descending | Select-Object -First {count!raw}',
    gaps: { cmd: 'tasklist cannot sort by CPU usage' },
  },
  top_mem: {
    busybox: 'ps -o pid,user,rss,vsz,args | sort -k3 -rh | head -n {count!raw}',
    pwsh: 'Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First {count!raw}',
    cmd: 'tasklist | sort /r /+65', // Mem Usage column is right-aligned starting at column 65
  },
  find_process: {
    pwsh: `${PS_PROC_MATCH} | Select-Object Id, ProcessName, CommandLine`,
    cmd: 'tasklist | findstr /i {name}',
  },
  kill_by_name: {
    pwsh: { win: `${PS_PROC_MATCH} | Stop-Process`, unix: 'pkill -f {name}' },
    cmd: (s, q) => `taskkill /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`, { name: 'name' })}`,
  },
  kill_force: {
    pwsh: { win: `${PS_PROC_MATCH} | Stop-Process -Force`, unix: 'pkill -9 -f {name}' },
    cmd: (s, q) => `taskkill /f /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`, { name: 'name' })}`,
  },
  kill_by_pid: {
    // `kill` is an alias of Stop-Process (SIGKILL on Unix) in PowerShell; call the real binary for SIGTERM.
    pwsh: { win: 'Stop-Process -Id {pid!raw}', unix: '/bin/kill {pid!raw}' },
    cmd: 'taskkill /pid {pid!raw}',
  },
  kill_by_port: {
    busybox: 'fuser -k -TERM {port!raw}/tcp',
    pwsh: { win: 'Get-NetTCPConnection -LocalPort {port!raw} -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ }' },
    cmd: 'for /f "tokens=5" %p in (\'netstat -ano ^| findstr /r /c:":{port!raw} .*LISTENING"\') do taskkill /pid %p',
  },
  listening_ports: {
    busybox: 'netstat -tulpn',
    pwsh: { win: 'Get-NetTCPConnection -State Listen | Sort-Object LocalPort' },
    cmd: 'netstat -ano | findstr LISTENING',
  },
  process_on_port: {
    busybox: "netstat -tulpn | grep ':{port!raw} '",
    pwsh: { win: "Get-NetTCPConnection -LocalPort {port!raw} -State Listen -ErrorAction SilentlyContinue | Select-Object LocalAddress, LocalPort, State, OwningProcess, @{ Name = 'Process'; Expression = { (Get-Process -Id $_.OwningProcess).ProcessName } }" },
    cmd: 'netstat -ano | findstr :{port!raw}',
  },
  established_connections: {
    busybox: 'netstat -tun | grep ESTABLISHED',
    pwsh: { win: 'Get-NetTCPConnection -State Established' },
    cmd: 'netstat -an | findstr ESTABLISHED',
  },
  process_tree: {
    busybox: 'ps -o pid,ppid,user,args',
    pwsh: { win: 'Get-CimInstance -ClassName Win32_Process | Sort-Object ParentProcessId | Select-Object ProcessId, ParentProcessId, Name' },
    gaps: { cmd: 'tasklist has no parent PID (wmic is deprecated)' },
  },

  // ---------- system ----------
  system_info: {
    pwsh: { win: `${PS_OS} | Select-Object CSName, Caption, Version, BuildNumber, OSArchitecture`, unix: 'uname -a' },
    cmd: 'systeminfo',
  },
  os_release: {
    pwsh: { win: `${PS_OS} | Select-Object Caption, Version, BuildNumber` },
    cmd: 'ver',
  },
  kernel_version: {
    pwsh: { win: '[System.Environment]::OSVersion.Version', unix: 'uname -r' },
    cmd: 'ver',
  },
  memory_usage: {
    pwsh: { win: `${PS_OS} | Select-Object @{ Name = 'TotalGB'; Expression = { [math]::Round($_.TotalVisibleMemorySize / 1MB, 1) } }, @{ Name = 'FreeGB'; Expression = { [math]::Round($_.FreePhysicalMemory / 1MB, 1) } }` },
    cmd: 'systeminfo | findstr /c:"Physical Memory"',
  },
  cpu_info: {
    busybox: 'cat /proc/cpuinfo',
    pwsh: { win: 'Get-CimInstance -ClassName Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors, MaxClockSpeed' },
    cmd: 'echo %PROCESSOR_IDENTIFIER% & echo %NUMBER_OF_PROCESSORS%',
  },
  cpu_cores: {
    pwsh: '[System.Environment]::ProcessorCount',
    cmd: 'echo %NUMBER_OF_PROCESSORS%',
  },
  uptime: {
    pwsh: { win: `(Get-Date) - (${PS_OS}).LastBootUpTime`, unix: 'uptime' },
    cmd: 'systeminfo | findstr /c:"Boot Time"',
  },
  hostname: {
    pwsh: 'hostname',
    cmd: 'hostname',
  },
  whoami: {
    pwsh: 'whoami',
    cmd: 'whoami',
  },
  users_logged_in: {
    pwsh: { win: 'Get-CimInstance -ClassName Win32_ComputerSystem | Select-Object UserName', unix: 'who' },
    cmd: 'query user',
  },
  last_logins: {
    bsd: 'last | head -n {count!raw}',
    busybox: 'last | head -n {count!raw}',
    pwsh: { win: "Get-WinEvent -FilterHashtable @{ LogName = 'Security'; Id = 4624 } -MaxEvents {count!raw}", unix: 'last -n {count!raw}' },
    gaps: { cmd: 'logon events need wevtutil with an XPath query on the Security log (admin)' },
  },
  env_vars: {
    pwsh: 'Get-ChildItem -Path Env: | Sort-Object Name',
    cmd: 'set',
  },
  env_var_get: {
    pwsh: '$env:{var!raw}',
    cmd: 'echo %{var!raw}%',
  },
  which_cmd: {
    pwsh: 'Get-Command -Name {cmd} -CommandType Application -All | Select-Object -ExpandProperty Source',
    cmd: 'where {cmd}',
  },
  show_path: {
    fish: 'string join \\n $PATH',
    pwsh: '$env:PATH -split [System.IO.Path]::PathSeparator',
    cmd: 'echo %PATH:;=&echo.%',
  },
  history_search: {
    zsh: 'grep -ai -- {pattern} "${HISTFILE:-$HOME/.zsh_history}"',
    busybox: 'grep -i -- {pattern} "${HISTFILE:-$HOME/.ash_history}"',
    fish: 'history search --contains -- {pattern}',
    pwsh: 'Select-String -LiteralPath (Get-PSReadLineOption).HistorySavePath -Pattern {pattern}',
    cmd: 'doskey /history | findstr /i /c:{pattern}',
  },
  date_time: {
    pwsh: 'Get-Date',
    cmd: 'echo %DATE% %TIME%',
  },
  timezone: {
    pwsh: 'Get-TimeZone',
    cmd: 'tzutil /g',
  },
  calendar: {
    pwsh: { unix: 'cal' },
    gaps: { pwsh: 'Windows: no built-in calendar command', cmd: 'no built-in calendar command' },
  },
  cron_list: {
    pwsh: { win: "Get-ScheduledTask -TaskPath '\\'", unix: 'crontab -l' },
    cmd: 'schtasks /query',
  },
  cron_edit: {
    pwsh: { win: 'taskschd.msc', unix: 'crontab -e' },
    cmd: 'taskschd.msc',
  },
  journal_service: {
    pwsh: { win: "Get-WinEvent -FilterHashtable @{ LogName = 'System'; ProviderName = 'Service Control Manager' } -MaxEvents 1000 -ErrorAction SilentlyContinue | Where-Object Message -Match ([regex]::Escape({service}))«| Where-Object TimeCreated -GT (Get-Date).AddMinutes(-{minutes!raw})» | Select-Object -First {count!raw}" },
    gaps: { cmd: 'wevtutil cannot filter events by message text' },
  },
  journal_errors: {
    pwsh: { win: `Get-WinEvent -FilterHashtable @{ LogName = 'System'; Level = 1, 2; StartTime = (${PS_OS}).LastBootUpTime } -MaxEvents {count!raw} -ErrorAction SilentlyContinue` },
    cmd: 'wevtutil qe System /q:"*[System[(Level=1 or Level=2)]]" /c:{count!raw} /rd:true /f:text',
  },
  service_status: {
    pwsh: { win: 'Get-Service -Name {service}' },
    cmd: 'sc query {service}',
  },
  service_restart: {
    pwsh: { win: 'Restart-Service -Name {service}' },
    cmd: 'net stop {service} && net start {service}',
  },
  service_stop: {
    pwsh: { win: 'Stop-Service -Name {service}' },
    cmd: 'net stop {service}',
  },
  service_start: {
    pwsh: { win: 'Start-Service -Name {service}' },
    cmd: 'net start {service}',
  },
  service_enable: {
    bsd: 'brew services start {service}',
    pwsh: { win: 'Set-Service -Name {service} -StartupType Automatic; Start-Service -Name {service}' },
    cmd: 'sc config {service} start= auto && net start {service}',
  },
  list_services: {
    pwsh: { win: "Get-Service | Where-Object Status -EQ 'Running'" },
    cmd: 'net start',
  },
  failed_services: {
    bsd: "launchctl list | awk 'NR == 1 || ($2 != \"0\" && $2 != \"-\")'",
    pwsh: { win: "Get-CimInstance -ClassName Win32_Service -Filter \"StartMode='Auto' AND State<>'Running'\" | Select-Object Name, State, ExitCode" },
    gaps: { cmd: 'sc query cannot filter by start mode' },
  },
  dmesg: {
    pwsh: { win: 'Get-WinEvent -LogName System -MaxEvents {count!raw}', unix: 'sudo dmesg | tail -n {count!raw}' },
    cmd: 'wevtutil qe System /c:{count!raw} /rd:true /f:text',
  },
  battery: {
    fish: (s, q, ctx) => ((ctx && ctx.os) === 'darwin'
      ? 'pmset -g batt'
      : 'set -l b /sys/class/power_supply/BAT*/capacity; if test (count $b) -gt 0; cat $b; else; upower -i /org/freedesktop/UPower/devices/DisplayDevice; end'),
    pwsh: { win: 'Get-CimInstance -ClassName Win32_Battery | Select-Object Name, EstimatedChargeRemaining, BatteryStatus' },
    gaps: { cmd: 'powercfg /batteryreport only writes an HTML report' },
  },
  temperature: {
    pwsh: { win: "Get-CimInstance -Namespace root/WMI -ClassName MSAcpi_ThermalZoneTemperature | Select-Object InstanceName, @{ Name = 'Celsius'; Expression = { $_.CurrentTemperature / 10 - 273.15 } }" },
    gaps: { cmd: 'no temperature sensors access from cmd.exe' },
  },
  gpu_info: {
    pwsh: { win: 'Get-CimInstance -ClassName Win32_VideoController | Select-Object Name, DriverVersion, AdapterRAM' },
    gaps: { cmd: 'wmic is deprecated; dxdiag only writes a report file' },
  },
  usb_devices: {
    pwsh: { win: "Get-PnpDevice -PresentOnly | Where-Object InstanceId -Like 'USB*'" },
    gaps: { cmd: 'no reliable USB device listing in cmd.exe (pnputil output varies by build)' },
  },
  install_package: {
    pwsh: { win: 'winget install {pkg}' },
    cmd: 'winget install {pkg}',
  },
  package_installed: {
    pwsh: { win: 'winget list {pkg}' },
    cmd: 'winget list {pkg}',
  },
  system_update: {
    pwsh: { win: 'winget upgrade --all' },
    cmd: 'winget upgrade --all',
  },

  // ---------- network ----------
  ip_addresses: {
    busybox: 'ip -o addr show',
    pwsh: { win: 'Get-NetIPAddress | Select-Object InterfaceAlias, AddressFamily, IPAddress, PrefixLength' },
    cmd: 'ipconfig',
  },
  public_ip: {
    pwsh: "Invoke-RestMethod -Uri 'https://ifconfig.me/ip'",
    cmd: 'curl -s https://ifconfig.me & echo.',
  },
  ping_host: {
    pwsh: 'Test-Connection -ComputerName {host} -Count {count!raw}',
    cmd: 'ping -n {count!raw} {host}',
  },
  dns_lookup: {
    busybox: 'nslookup {host}',
    pwsh: { win: 'Resolve-DnsName -Name {host}', unix: 'dig +short {host}' },
    cmd: 'nslookup {host}',
  },
  traceroute: {
    pwsh: { win: 'Test-NetConnection -ComputerName {host} -TraceRoute', unix: 'traceroute {host}' },
    cmd: 'tracert {host}',
  },
  routes: {
    pwsh: { win: 'Get-NetRoute' },
    cmd: 'route print',
  },
  port_check: {
    busybox: 'nc -w 3 {host} {port!raw} </dev/null && echo open || echo closed',
    pwsh: { win: 'Test-NetConnection -ComputerName {host} -Port {port!raw}', unix: 'nc -zv {host} {port!raw}' },
    gaps: { cmd: 'no TCP port probe in cmd.exe (telnet client is not installed by default)' },
  },
  curl_headers: {
    // Windows PowerShell 5.1 aliases curl to Invoke-WebRequest, so call curl.exe explicitly.
    pwsh: { win: 'curl.exe -sI {url}', unix: 'curl -sI {url}' },
    cmd: 'curl -sI {url}',
  },
  http_status: {
    pwsh: { win: "curl.exe -s -o NUL -w '%{http_code}\\n' {url}", unix: "curl -s -o /dev/null -w '%{http_code}\\n' {url}" },
    cmd: 'curl -s -o NUL -w "%{http_code}\\n" {url}',
  },
  download_file: {
    pwsh: { win: 'curl.exe -fLO {url}', unix: 'curl -fLO {url}' },
    cmd: 'curl -fLO {url}',
  },
  ssh_connect: {
    pwsh: 'ssh {target}',
    cmd: 'ssh {target}',
  },
  ssh_port_forward: {
    pwsh: 'ssh -N -L {port!raw}:{rhost!raw}:{rport!raw} {target}', // OpenSSH client ships with Windows 10 1809+
    cmd: 'ssh -N -L {port!raw}:{rhost!raw}:{rport!raw} {target}',
  },

  // ---------- git ----------
  git_status: { pwsh: 'git status', cmd: 'git status' },
  git_log: {
    pwsh: 'git log --oneline --graph --decorate -n {count!raw}',
    cmd: 'git log --oneline --graph --decorate -n {count!raw}',
  },
  git_diff: {
    // a bare `--` can be swallowed by PowerShell before reaching native commands; quote it
    pwsh: "git diff«'--' {file}»",
    cmd: 'git diff«-- {file}»',
  },
  git_diff_staged: { pwsh: 'git diff --staged', cmd: 'git diff --staged' },
  git_branches: { pwsh: 'git branch -a', cmd: 'git branch -a' },
  git_current_branch: { pwsh: 'git branch --show-current', cmd: 'git branch --show-current' },
  git_new_branch: { pwsh: 'git checkout -b {branch}', cmd: 'git checkout -b {branch}' },
  git_switch_branch: { pwsh: 'git checkout {branch}', cmd: 'git checkout {branch}' },
  git_delete_branch: { pwsh: 'git branch -d {branch}', cmd: 'git branch -d {branch}' },
  git_undo_commit: { pwsh: 'git reset --soft HEAD~1', cmd: 'git reset --soft HEAD~1' },
  git_discard_changes: { pwsh: 'git restore«{file}»', cmd: 'git restore«{file}»' },
  git_stash: { pwsh: 'git stash', cmd: 'git stash' },
  git_stash_pop: { pwsh: 'git stash pop', cmd: 'git stash pop' },
  git_pull: { pwsh: 'git pull', cmd: 'git pull' },
  git_push: { pwsh: 'git push«origin {branch}»', cmd: 'git push«origin {branch}»' },
  git_clone: { pwsh: 'git clone {url}', cmd: 'git clone {url}' },
  git_add_all: { pwsh: 'git add -A', cmd: 'git add -A' },
  git_commit: {
    // `&&` needs PowerShell 7+; this form also works in Windows PowerShell 5.1
    pwsh: 'git add -A; if ($LASTEXITCODE -eq 0) { git commit -m {message} }',
    cmd: 'git add -A && git commit -m {message}',
  },
  git_remote: { pwsh: 'git remote -v', cmd: 'git remote -v' },
  git_blame: { pwsh: 'git blame {file}', cmd: 'git blame {file}' },
  git_init: { pwsh: 'git init', cmd: 'git init' },

  // ---------- docker ----------
  docker_ps: { pwsh: 'docker ps', cmd: 'docker ps' },
  docker_ps_all: { pwsh: 'docker ps -a', cmd: 'docker ps -a' },
  docker_logs: {
    pwsh: 'docker logs --tail {count!raw} -f {container}',
    cmd: 'docker logs --tail {count!raw} -f {container}',
  },
  docker_images: { pwsh: 'docker images', cmd: 'docker images' },
  docker_stop: { pwsh: 'docker stop {container}', cmd: 'docker stop {container}' },
  docker_stop_all: {
    fish: 'docker stop (docker ps -q)',
    pwsh: 'docker stop (docker ps -q)',
    cmd: "for /f %i in ('docker ps -q') do docker stop %i",
  },
  docker_prune: { pwsh: 'docker system prune -a', cmd: 'docker system prune -a' },
  docker_exec: { pwsh: 'docker exec -it {container} sh', cmd: 'docker exec -it {container} sh' },
  docker_stats: { pwsh: 'docker stats --no-stream', cmd: 'docker stats --no-stream' },
  docker_compose_up: { pwsh: 'docker compose up -d', cmd: 'docker compose up -d' },
  docker_compose_down: { pwsh: 'docker compose down', cmd: 'docker compose down' },

  // ---------- developer tools (v0.4) ----------
  // npm / npx / gh / ssh are the same native programs in PowerShell and cmd.exe
  npm_run_script: { pwsh: 'npm run {script}«--workspace {workspace!raw}»«{scope!raw}»', cmd: 'npm run {script}«--workspace {workspace!raw}»«{scope!raw}»' },
  npm_install: { pwsh: 'npm {npmverb!raw}«{pkg}»«--workspace {workspace!raw}»«{scope!raw}»', cmd: 'npm {npmverb!raw}«{pkg}»«--workspace {workspace!raw}»«{scope!raw}»' },
  npm_install_global: { pwsh: 'npm install -g {pkg}«{scope!raw}»', cmd: 'npm install -g {pkg}«{scope!raw}»' },
  pip_install: { pwsh: { win: 'py -m pip install {pkg}«{scope!raw}»', unix: 'python3 -m pip install {pkg}«{scope!raw}»' }, cmd: 'py -m pip install {pkg}«{scope!raw}»' },
  tool_version: { pwsh: '& {cmd} --version', cmd: '{cmd} --version' },
  cli_help: { pwsh: '& {cmd} --help', cmd: '{cmd} --help' },
  wrangler_deploy: { pwsh: 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»«{args!raw}»', cmd: 'npx wrangler deploy«{dryrun!raw}»«--env {wenv!raw}»«{args!raw}»' },
  wrangler_dev: { pwsh: 'npx wrangler dev«--env {wenv!raw}»«{args!raw}»', cmd: 'npx wrangler dev«--env {wenv!raw}»«{args!raw}»' },
  wrangler_tail: { pwsh: 'npx wrangler tail«--env {wenv!raw}»«{args!raw}»', cmd: 'npx wrangler tail«--env {wenv!raw}»«{args!raw}»' },
  wrangler_secret_put: { pwsh: 'npx wrangler secret put {var!raw}«--env {wenv!raw}»«{args!raw}»', cmd: 'npx wrangler secret put {var!raw}«--env {wenv!raw}»«{args!raw}»' },
  wrangler_login: { pwsh: 'npx wrangler login«{args!raw}»', cmd: 'npx wrangler login«{args!raw}»' },
  wrangler_whoami: { pwsh: 'npx wrangler whoami«{args!raw}»', cmd: 'npx wrangler whoami«{args!raw}»' },
  gh_auth_status: { pwsh: 'gh auth status«{args!raw}»', cmd: 'gh auth status«{args!raw}»' },
  gh_auth_login: { pwsh: 'gh auth login«{args!raw}»', cmd: 'gh auth login«{args!raw}»' },
  gh_pr_list: { pwsh: 'gh pr list«--repo {repo!raw}»«{args!raw}»', cmd: 'gh pr list«--repo {repo!raw}»«{args!raw}»' },
  gh_pr_view: { pwsh: 'gh pr view«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»', cmd: 'gh pr view«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»' },
  gh_pr_create: { pwsh: 'gh pr create --fill«--repo {repo!raw}»«{args!raw}»', cmd: 'gh pr create --fill«--repo {repo!raw}»«{args!raw}»' },
  gh_pr_checks: { pwsh: 'gh pr checks«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»', cmd: 'gh pr checks«{pr!raw}»«--repo {repo!raw}»«{scope!raw}»' },
  gh_pr_merge: { pwsh: 'gh pr merge«{pr!raw}»«--repo {repo!raw}»«{delbranch!raw}»«{scope!raw}»', cmd: 'gh pr merge«{pr!raw}»«--repo {repo!raw}»«{delbranch!raw}»«{scope!raw}»' },
  gh_run_list: { pwsh: 'gh run list«--repo {repo!raw}»«{args!raw}»', cmd: 'gh run list«--repo {repo!raw}»«{args!raw}»' },
  gh_run_view: { pwsh: 'gh run view«{num!raw}»«--repo {repo!raw}»«{scope!raw}»', cmd: 'gh run view«{num!raw}»«--repo {repo!raw}»«{scope!raw}»' },
  activate_venv: {
    fish: 'source {path}/bin/activate.fish',
    pwsh: { win: "& (Join-Path {path} 'Scripts/Activate.ps1')", unix: "& (Join-Path {path} 'bin/Activate.ps1')" },
    cmd: 'call {path}\\Scripts\\activate.bat',
  },
};
// Intent catalog: every command tellsh knows how to produce.
//
// Template syntax (see src/fill.js):
//   {slot}       value is shell-quoted
//   {slot!raw}   value inserted verbatim (only for validated slots: numbers, ports, find size/age flags)
//   «...»        optional segment, dropped if any slot inside it is missing
// `slots` maps slot name -> default value; `null` means required (a <PLACEHOLDER> is shown).
// `darwin` overrides the template on macOS. `risk` is safe | medium | high (src/danger.js may escalate).
// v0.2: archive create/extract, git stash/pull/checkout/clone raised safe -> medium after the teacher review
// (they overwrite files or change the working tree; data/teacher/decisions.jsonl).

const T = (id, description, template, slots, risk = 'safe', extra = {}) =>
  ({ id, description, template, slots, risk, ...extra });

export const INTENTS = [
  // ---------- files & disk ----------
  T('largest_files', 'Show the largest files under a directory',
    'find {path} -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n {count!raw}',
    { path: '.', count: 10 }),
  T('largest_dirs', 'Show the largest subdirectories of a directory',
    'du -h -d 1 {path} 2>/dev/null | sort -rh | head -n {count!raw}',
    { path: '.', count: 10 }),
  T('disk_free', 'Show free/used disk space per filesystem', 'df -h', {}),
  T('dir_size', 'Show total size of a directory', 'du -sh {path}', { path: '.' }),
  T('find_by_name', 'Find files by (part of) name',
    'find {path} -iname {namepat}', { path: '.', name: null }),
  T('find_by_ext', 'Find files with a given extension',
    'find {path} -type f -iname {glob}«{age!raw}»', { path: '.', ext: null }),
  T('find_recent', 'Find files modified within a time window',
    'find {path} -type f {age!raw}«-iname {glob}»', { path: '.', age: '-mtime -1' }),
  T('find_older_than', 'Find files older than N days',
    'find {path} -type f -mtime +{days!raw}«-iname {glob}»', { path: '.', days: 30 }),
  T('find_larger_than', 'Find files bigger than a size',
    'find {path} -type f -size +{size!raw}«-iname {glob}» -exec ls -lh {} +', { path: '.', size: '100M' }),
  T('find_smaller_than', 'Find files smaller than a size',
    'find {path} -type f -size -{size!raw}«-iname {glob}»', { path: '.', size: '1k' }),
  T('grep_text', 'Search for text recursively in files',
    'grep -rn«--include={glob}» -- {pattern} {path}', { path: '.', pattern: null }),
  T('grep_files_containing', 'List files that contain a text',
    'grep -rl«--include={glob}» -- {pattern} {path}', { path: '.', pattern: null }),
  T('count_lines', 'Count lines in a file', 'wc -l {file}', { file: null }),
  T('count_lines_code', 'Count total lines in all files of a type',
    'find {path} -type f -iname {glob} -exec cat {} + | wc -l', { path: '.', ext: null }),
  T('count_files', 'Count files in a directory (recursive)',
    'find {path} -type f«-iname {glob}» | wc -l', { path: '.' }),
  T('count_words', 'Count words in a file', 'wc -w {file}', { file: null }),
  T('sort_uniq', 'Most frequent lines in a file (sort | uniq -c)',
    'sort {file} | uniq -c | sort -rn | head -n {count!raw}', { file: null, count: 10 }),
  T('recent_files', 'List most recently modified files',
    "find {path} -type f -printf '%T@ %TY-%Tm-%Td %TH:%TM %p\\n' 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-",
    { path: '.', count: 10 },
    'safe', { darwin: "find {path} -type f -exec stat -f '%m %Sm %N' -t '%Y-%m-%d %H:%M' {} + 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-" }),
  T('empty_files', 'Find empty files', 'find {path} -type f -empty', { path: '.' }),
  T('empty_dirs', 'Find empty directories', 'find {path} -type d -empty', { path: '.' }),
  T('duplicate_files', 'Find duplicate files by content hash',
    'find {path} -type f -exec md5sum {} + | sort | uniq -w32 -dD',
    { path: '.' }, 'safe',
    // sorted `hash path` lines: print every member of a group, including the first one
    { darwin: "find {path} -type f -exec md5 -r {} + | sort | awk '$1 == p { if (!shown) print last; print; shown = 1; next } { p = $1; last = $0; shown = 0 }'" }),
  T('find_symlinks', 'List symbolic links', 'find {path} -type l -ls', { path: '.' }),
  T('broken_symlinks', 'Find broken symbolic links', 'find {path} -xtype l',
    { path: '.' }, 'safe', { darwin: 'find -L {path} -type l' }),
  T('list_files', 'List files in a directory with details', 'ls -lah {path}', { path: '.' }),
  T('list_tree', 'Show directory tree (2 levels)',
    "find {path} -maxdepth {depth!raw} -not -path '*/.git/*' | sort", { path: '.', depth: 2 }),
  T('hidden_files', 'List hidden files (dotfiles)',
    "find {path} -maxdepth 1 -name '.*'", { path: '.' }),
  T('file_type', 'Detect a file type', 'file {file}', { file: null }),
  T('file_stat', 'Show file metadata (size, permissions, times)', 'stat {file}', { file: null }),
  T('head_file', 'Show first lines of a file', 'head -n {count!raw} {file}', { file: null, count: 10 }),
  T('tail_file', 'Show last lines of a file', 'tail -n {count!raw} {file}', { file: null, count: 10 }),
  T('tail_follow', 'Follow a (log) file live', 'tail -f {file}',
    { file: '/var/log/syslog' }, 'safe', { darwinDefaults: { file: '/var/log/system.log' } }),
  T('cat_file', 'Print a file contents', 'cat {file}', { file: null }),
  T('print_line_range', 'Show a range of lines of a file (lines N to M)',
    "sed -n '{start!raw},{end!raw}p' {file}", { file: null, start: null, end: null }),
  T('compress_targz', 'Compress a directory/file into tar.gz',
    'tar -czvf {archive} {path}', { path: '.', archive: null }, 'medium'),
  T('extract_targz', 'Extract a tar.gz archive', '«mkdir -p {dest} && »tar -xzvf {file}«-C {dest}»', { file: null }, 'medium'),
  T('compress_zip', 'Compress into a zip archive', 'zip -r {archive} {path}', { path: '.', archive: null }, 'medium'),
  T('extract_zip', 'Extract a zip archive', 'unzip {file}«-d {dest}»', { file: null }, 'medium'),
  T('list_archive', 'List contents of an archive (tar/zip)',
    (s, q) => /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file, { name: 'file' })}` : `tar -tvf ${q(s.file, { name: 'file' })}`,
    { file: null }),
  T('chmod', 'Change file permissions', 'chmod {mode!raw} {file}', { file: null, mode: null }, 'medium'),
  T('make_executable', 'Make a file executable', 'chmod +x {file}', { file: null }, 'medium'),
  T('chown', 'Change file owner', 'sudo chown -R {user} {path}', { path: null, user: null }, 'medium'),
  T('copy', 'Copy files or directories', 'cp -ri {src} {dst}', { src: null, dst: null }, 'medium'),
  T('move_rename', 'Move or rename a file', 'mv -i {src} {dst}', { src: null, dst: null }, 'medium'),
  T('delete_file', 'Delete a file', 'rm {file}', { file: null }, 'high'),
  T('delete_dir', 'Delete a directory recursively', 'rm -r {path}', { path: null }, 'high'),
  T('delete_by_ext', 'Delete all files with an extension',
    'find {path} -type f -iname {glob} -delete', { path: '.', ext: null }, 'high'),
  T('mkdir', 'Create a directory (with parents)', 'mkdir -p {path}', { path: null }),
  T('touch_file', 'Create an empty file', 'touch {file}', { file: null }),
  T('current_dir', 'Print current working directory', 'pwd', {}),
  T('create_symlink', 'Create a symbolic link', 'ln -s {src} {dst}', { src: null, dst: null }, 'medium'),
  T('diff_files', 'Compare two files', 'diff -u {src} {dst}', { src: null, dst: null }),
  T('replace_text', 'Replace text in a file with sed (in place)',
    'sed -i {sedexpr} {file}', { file: null, old: null, new: null }, 'medium',
    { darwin: "sed -i '' {sedexpr} {file}" }),
  T('disk_mounts', 'Show mounted filesystems', 'findmnt', {}, 'safe', { darwin: 'mount' }),
  T('block_devices', 'List disks and partitions', 'lsblk', {}, 'safe', { darwin: 'diskutil list' }),
  T('hash_sha256', 'Compute SHA-256 checksum', 'sha256sum {file}', { file: null }, 'safe',
    { darwin: 'shasum -a 256 {file}' }),
  T('hash_md5', 'Compute MD5 checksum', 'md5sum {file}', { file: null }, 'safe', { darwin: 'md5 {file}' }),
  T('base64_encode', 'Base64-encode text or a file',
    // macOS base64 takes no positional file operand: it needs -i FILE
    (s, q, os) => s.file ? (os === 'darwin' ? `base64 -i ${q(s.file, { name: 'file' })}` : `base64 ${q(s.file, { name: 'file' })}`) : `printf '%s' ${q(s.text ?? '<TEXT>', { name: 'text' })} | base64`,
    {}),
  T('base64_decode', 'Decode base64 text or a file',
    (s, q, os) => {
      const d = os === 'darwin' ? 'base64 -D' : 'base64 -d';
      return s.file ? `${d} ${os === 'darwin' ? '-i ' : ''}${q(s.file, { name: 'file' })}` : `printf '%s' ${q(s.text ?? '<TEXT>', { name: 'text' })} | ${d}`;
    }, {}),

  // ---------- processes ----------
  T('top_cpu', 'Processes using the most CPU', 'ps aux --sort=-%cpu | head -n {count!raw}',
    { count: 10 }, 'safe', { darwin: 'ps aux -r | head -n {count!raw}' }),
  T('top_mem', 'Processes using the most memory', 'ps aux --sort=-%mem | head -n {count!raw}',
    { count: 10 }, 'safe', { darwin: 'ps aux -m | head -n {count!raw}' }),
  T('find_process', 'Find a running process by name', 'pgrep -af {name}',
    { name: null }, 'safe', { darwin: 'pgrep -lf {name}' }),
  T('kill_by_name', 'Kill processes by name', 'pkill -f {name}', { name: null }, 'high'),
  T('kill_force', 'Force-kill (SIGKILL) processes by name', 'pkill -9 -f {name}', { name: null }, 'high'),
  T('kill_by_pid', 'Kill a process by PID', 'kill {pid!raw}', { pid: null }, 'high'),
  T('kill_by_port', 'Kill the process listening on a port',
    // -sTCP:LISTEN: only the server; plain `-i tcp:PORT` also matches clients connected to that port
    'lsof -ti tcp:{port!raw} -sTCP:LISTEN | xargs -r kill', { port: null }, 'high',
    { darwin: 'lsof -ti tcp:{port!raw} -sTCP:LISTEN | xargs kill', notes: 'needs lsof' }),
  T('listening_ports', 'Show listening ports', 'ss -tulpn', {}, 'safe',
    { darwin: 'lsof -iTCP -sTCP:LISTEN -n -P' }),
  T('process_on_port', 'Which process is using a port', "ss -ltnup 'sport = :{port!raw}'",
    { port: null }, 'safe', { darwin: 'lsof -nP -i :{port!raw}' }),
  T('established_connections', 'Show established network connections', 'ss -tun state established',
    {}, 'safe', { darwin: 'netstat -an | grep ESTABLISHED' }),
  T('process_tree', 'Show process tree', 'ps -ef --forest', {}, 'safe', { darwin: 'ps -ef' }),

  // ---------- system ----------
  T('system_info', 'General system information', 'uname -a', {}),
  T('os_release', 'Show OS distribution/version', 'cat /etc/os-release', {}, 'safe', { darwin: 'sw_vers' }),
  T('kernel_version', 'Show kernel version', 'uname -r', {}),
  T('memory_usage', 'Show RAM usage', 'free -h', {}, 'safe', { darwin: 'vm_stat' }),
  T('cpu_info', 'Show CPU model and details', 'lscpu', {}, 'safe',
    { darwin: 'sysctl -n machdep.cpu.brand_string; sysctl hw.ncpu' }),
  T('cpu_cores', 'Number of CPU cores', 'nproc', {}, 'safe', { darwin: 'sysctl -n hw.ncpu' }),
  T('uptime', 'Uptime and load average', 'uptime', {}),
  T('hostname', 'Show the machine hostname', 'hostname', {}),
  T('whoami', 'Show current user name', 'whoami', {}),
  T('users_logged_in', 'Show logged-in users', 'who', {}),
  T('last_logins', 'Show recent logins', 'last -n {count!raw}', { count: 10 }),
  T('env_vars', 'List environment variables', 'env | sort', {}),
  T('env_var_get', 'Show the value of an environment variable', 'printenv {var!raw}', { var: null }),
  T('which_cmd', 'Locate a command executable', 'which -a {cmd}', { cmd: null }),
  T('show_path', 'Show PATH entries one per line', "echo \"$PATH\" | tr ':' '\\n'", {}),
  T('history_search', 'Search shell history',
    'grep -ai -- {pattern} "${HISTFILE:-$HOME/.bash_history}"', { pattern: null }, 'safe',
    { notes: 'reads the history file (the history builtin is empty in a subshell, and HISTFILE is not exported to it)' }),
  T('date_time', 'Show current date and time', 'date', {}),
  T('timezone', 'Show the system time zone',
    'timedatectl show -p Timezone --value 2>/dev/null || cat /etc/timezone 2>/dev/null || readlink /etc/localtime 2>/dev/null || date +%Z', {}, 'safe',
    { darwin: "readlink /etc/localtime | sed 's#.*/zoneinfo/##'" }),
  T('calendar', 'Show a calendar', 'cal', {}),
  T('cron_list', 'List cron jobs of the current user', 'crontab -l', {}),
  T('cron_edit', 'Edit cron jobs', 'crontab -e', {}, 'medium'),
  T('journal_service', 'Show logs of a systemd service',
    'journalctl -u {service} -n {count!raw} --no-pager«--since {since}»', { service: null, count: 50 }, 'safe',
    { darwin: 'log show --style compact --last 1h | grep -i {service}', notes: 'journalctl is Linux/systemd only' }),
  T('journal_errors', 'Show system error logs', 'journalctl -p err -b --no-pager | tail -n {count!raw}',
    { count: 50 }, 'safe', { darwin: 'log show --style compact --last 1h --predicate \'messageType == error\' | tail -n {count!raw}' }),
  T('service_status', 'Show status of a service', 'systemctl status {service} --no-pager',
    { service: null }, 'safe', { darwin: 'launchctl list | grep -i {service}' }),
  T('service_restart', 'Restart a service', 'sudo systemctl restart {service}', { service: null }, 'medium',
    { darwin: 'brew services restart {service}' }),
  T('service_stop', 'Stop a service', 'sudo systemctl stop {service}', { service: null }, 'medium',
    { darwin: 'brew services stop {service}' }),
  T('service_start', 'Start a service', 'sudo systemctl start {service}', { service: null }, 'medium',
    { darwin: 'brew services start {service}' }),
  T('service_enable', 'Enable a service at boot', 'sudo systemctl enable --now {service}', { service: null }, 'medium'),
  T('list_services', 'List running services', 'systemctl list-units --type=service --state=running --no-pager',
    {}, 'safe', { darwin: 'launchctl list' }),
  T('failed_services', 'List failed services', 'systemctl --failed --no-pager', {}),
  T('dmesg', 'Kernel messages (dmesg)', 'sudo dmesg | tail -n {count!raw}', { count: 50 }),
  T('battery', 'Battery level/status',
    'cat /sys/class/power_supply/BAT*/capacity 2>/dev/null || upower -i /org/freedesktop/UPower/devices/DisplayDevice',
    {}, 'safe', { darwin: 'pmset -g batt' }),
  T('temperature', 'CPU temperature sensors', 'sensors', {}, 'safe',
    { darwin: 'sudo powermetrics --samplers smc -n 1 | grep -i temp', notes: 'needs lm-sensors on Linux' }),
  T('gpu_info', 'Show GPU information', "lspci | grep -iE 'vga|3d|display'", {}, 'safe',
    { darwin: 'system_profiler SPDisplaysDataType' }),

exec
/bin/bash -lc "cat test/regressions3-render.test.js && sed -n '180,265p' test/regressions2.test.js && rg --files test" in /workspace/tellsh
 succeeded in 0ms:
// Regression tests for the round-3 review findings on rendering, the danger checker and the composer:
// PowerShell < 7.3 native-argument guard on every slot, danger checker gaps (wrappers, path
// normalisation, system directories, mv, docker -v=), composer quoting/--author/substitution, and
// cmd.exe handling of values containing `/`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { suggest } from '../src/pipeline.js';
// the parser on its own (it only raises risk); the trust rule (a non-catalog command is high) is in regressions27.test.js
import { assessCommand as checkDanger, normTarget } from '../src/danger.js';
import { buildCommand } from '../src/fill.js';
import { cmdQuote, pwshNativeSlots } from '../src/render.js';
import { compose, validateComposed } from '../src/compose.js';
import { extractSlots } from '../src/slots.js';
// v0.3: commands outside the catalog are high by the allowlist; these cases check the deny rules alone
const denyOnly = (c, base = 'safe') => checkDanger(c, base, { allowlist: { off: true } });

const PS_WIN = { shell: 'powershell', os: 'win32', coreutils: 'gnu' };
const CMD = { shell: 'cmd', os: 'win32', coreutils: 'gnu' };
const BASH = { shell: 'bash', os: 'linux', coreutils: 'gnu' };

// ---------------------------------------------------------------------------------------------
// 1. PowerShell < 7.3: every slot of a native command is checked, not only the first one

test('pwshNativeSlots finds every slot of a native command', () => {
  assert.deepEqual([...pwshNativeSlots('tar -czvf {archive} {path}')].sort(), ['archive', 'path']);
  assert.deepEqual([...pwshNativeSlots('tar -xzvf {file}«-C {dest}»')].sort(), ['dest', 'file']);
  assert.deepEqual([...pwshNativeSlots('scp {target}:{dst}')].sort(), ['dst', 'target']);
  assert.deepEqual([...pwshNativeSlots('docker logs --tail {count!raw} -f {container}')], ['container']);
  // cmdlets / expressions are still not native
  assert.deepEqual([...pwshNativeSlots('if (Test-Path -LiteralPath {file}) { (Get-Item -LiteralPath {file}).LastWriteTime = Get-Date } else { New-Item -ItemType File -Path {file} }')], []);
  assert.deepEqual([...pwshNativeSlots('Compress-Archive -LiteralPath {path} -DestinationPath {archive}')], []);
});

test('PowerShell: a later native slot with " is refused (tar -C, tar path)', () => {
  const x = buildCommand('extract_targz', '', { env: PS_WIN, resolved: { file: 'x.tar.gz', dest: 'out" --to-command="calc' } });
  assert.equal(x.command, null);
  assert.match(x.gap, /native program/);
  const c = buildCommand('compress_targz', '', { env: PS_WIN, resolved: { archive: 'b.tar.gz', path: 'a" --use-compress-program=evil "b' } });
  assert.equal(c.command, null);
  assert.match(c.gap, /native program/);
  assert.equal(buildCommand('compress_targz', '', { env: PS_WIN, resolved: { archive: 'b.tar.gz', path: 'src' } }).command, "tar -czvf 'b.tar.gz' 'src'");
  const r = suggest(`extract x.tar.gz to 'out" --to-command="calc'`, { env: PS_WIN });
  assert.equal(r.command, null);
});

// ---------------------------------------------------------------------------------------------
// 2. danger checker

test('wrapper commands are looked through (timeout, chroot, stdbuf, env, nice, xargs, ...)', () => {
  for (const c of ['timeout 5 rm -rf /', 'timeout -s KILL 5 rm -rf /', 'chroot / rm -rf /', 'chroot --userspec=a:b /mnt rm -rf /',
    'stdbuf -oL rm -rf /', 'stdbuf -o L rm -rf /', 'env -u X A=1 rm -rf /', 'nice -n 5 rm -rf /', 'ionice -c 3 rm -rf /',
    'sudo -u root rm -rf /', 'doas rm -rf /', 'nohup rm -rf ~', 'time -p rm -rf ~', 'exec rm -rf /boot', 'command rm -rf $HOME', 'setsid rm -rf /']) {
    const d = checkDanger(c);
    assert.equal(d.critical, true, c);
    assert.equal(d.risk, 'high', c);
  }
});

test('paths like /. // /./ /etc/.. are normalised to /', () => {
  assert.equal(normTarget('/.'), '/');
  assert.equal(normTarget('//'), '/');
  assert.equal(normTarget('/./'), '/');
  assert.equal(normTarget('/etc/..'), '/');
  assert.equal(normTarget('/usr//lib/'), '/usr/lib');
  assert.equal(normTarget('~/./.ssh/'), '~/.ssh');
  for (const c of ['rm -rf /.', 'rm -rf /./', 'rm -rf //', 'rm -r /etc/../', 'find -L / -delete', 'find -P -O3 /. -delete']) assert.equal(checkDanger(c).critical, true, c);
});

test('recursive delete of system directories and key home directories is consistently critical', () => {
  for (const t of ['/etc', '/usr', '/usr/lib', '/usr/local/bin', '/var', '/var/lib', '/boot', '/bin', '/sbin', '/lib64', '/home/me', '~', '$HOME', '~/.ssh', '$HOME/.ssh', '~/.gnupg']) {
    assert.equal(checkDanger(`rm -r ${t}`).critical, true, t);
  }
  for (const t of ['/tmp/x', '/home/me/photos', '~/Downloads/old', 'build']) assert.equal(checkDanger(`rm -r ${t}`).critical, false, t);
});

test('mv of a system or home directory is critical; ordinary moves stay safe', () => {
  for (const c of ['mv /etc /tmp/x', 'mv ~ /tmp/x', 'mv /usr/lib /tmp', 'sudo mv /boot /old']) {
    const d = checkDanger(c);
    assert.equal(d.risk, 'high', c);
    assert.equal(d.critical, true, c);
  }
  assert.equal(checkDanger('mv /tmp/a /tmp/b').risk, 'safe');
});

test('docker -v=/:/h and --mount=…source=/ mount the host root', () => {
  assert.equal(checkDanger('docker run -v=/:/h alpine').critical, true);
  assert.equal(checkDanger('docker run -v=//:/h alpine').critical, true);
  assert.equal(checkDanger('docker run --mount=type=bind,source=/,target=/h alpine').critical, true);
  const ro = checkDanger('docker run -v=/:/h:ro alpine');
  assert.equal(ro.risk, 'high');
  assert.equal(ro.critical, false);
  assert.equal(denyOnly('docker run -v=/srv/data:/data alpine').risk, 'safe');
});

// ---------------------------------------------------------------------------------------------
// 3. composer

const grepTools = [{ tool: 'grep', p: 1 }];
const composeGrep = (q, pattern, paths) => compose(q, grepTools, { ...extractSlots(q), paths }, { patternOf: () => pattern, nameOf: () => null });

test('composer: grep patterns are quoted literally and never reused as a search path', () => {
  const a = composeGrep('search for ~/foo recursively ignoring case in src', 'recursively', ['~/foo', 'src']);
  assert.equal(a.command, "grep -i -r -- '~/foo' src");
  const b = composeGrep('search for "~" recursively ignoring case in /tmp', '~', ['~', '/tmp']);
  assert.equal(b.command, "grep -i -r -- '~' /tmp");
  // a real search path keeps tilde expansion
  const c = composeGrep('search for TODO recursively ignoring case in ~/src', 'TODO', ['~/src']);
  assert.equal(c.command, 'grep -i -r -- TODO ~/src');
  // end to end through the pipeline
  assert.equal(suggest('search for ~/foo recursively ignoring case in src', { env: BASH }).command, "grep -i -r -- '~/foo' src");
  assert.equal(suggest('search for "~" recursively ignoring case in /tmp', { env: BASH }).command, "grep -i -r -- '~' /tmp");
});

test('composer: git log --author always gets a value (or is not emitted)', () => {
  const gitTools = [{ tool: 'git', p: 1 }];
  const run = (q) => compose(q, gitTools, extractSlots(q), { patternOf: () => null, nameOf: () => null });
  assert.match(run('git log commits by alice').command, /--author=alice\b/);
  assert.match(run('git log by author bob').command, /--author=bob\b/);
  const none = run('git log by author');
  assert.ok(!none || !/--author(?!=\w)/.test(none.command), none?.command);
});

test('composer validation rejects command substitution and expansions', () => {
  for (const c of ['grep -- "$(id)" .', 'grep -- $(id) .', 'grep -- `id` .', 'grep -- "${x}" .', 'grep -- x <(id)']) {
    const v = validateComposed(c, 'grep');
    assert.equal(v.ok, false, c);
  }
  assert.equal(validateComposed("grep -- '$(id)' .", 'grep').ok, true);
  assert.equal(validateComposed("grep -- '`id`' .", 'grep').ok, true);
});

// ---------------------------------------------------------------------------------------------
// 4. cmd.exe: values with /

test('cmd: a value starting with / is fine when glued to a switch (findstr /c:), refused standalone', () => {
  const r = buildCommand('grep_text', '', { env: CMD, resolved: { pattern: '/api', path: 'src' } });
  assert.equal(r.command, 'pushd src && (findstr /s /n /c:"/api" * & popd)');
  const s = buildCommand('grep_text', '', { env: CMD, resolved: { pattern: 'x', path: '/api' } });
  assert.equal(s.command, null);
  assert.match(s.gap, /switch/);
  assert.equal(suggest('delete directory /q', { env: CMD }).command, null);
  assert.throws(() => cmdQuote('/q'), /switch/);
});

test('cmd: an embedded / is never left unquoted (foo/q is not read as foo /q)', () => {
  assert.equal(cmdQuote('foo/q'), 'foo\\q'); // path: Windows separator
  assert.equal(cmdQuote('a/q', { tilde: false }), '"a/q"'); // other values: quoted
  assert.equal(buildCommand('delete_dir', '', { env: CMD, resolved: { path: 'foo/q' } }).command, 'rmdir /s foo\\q');
  assert.equal(buildCommand('find_process', '', { env: CMD, resolved: { name: 'a/q' } }).command, 'tasklist | findstr /i "a/q"');
  assert.equal(buildCommand('delete_dir', '', { env: BASH, resolved: { path: 'foo/q' } }).command, 'rm -r foo/q');
});
});

test('history: relative paths from before a cd are not reused', () => {
  const r = run('delete it', ['cat notes.txt', 'cd /tmp', 'true']);
  assert.ok(!/notes\.txt/.test(r.command), r.command);
  const rel = run('show it', ['cat notes.txt', 'cd sub']);
  assert.ok(!/notes\.txt|sub/.test(rel.command), rel.command);
  // absolute paths survive a cd (in the same line; an older line is never a reference target)
  assert.equal(run('show that file', ['cat /etc/hosts; cd sub']).command, 'cat /etc/hosts');
  assert.ok(!/hosts/.test(run('show that file', ['cat /etc/hosts', 'cd sub', 'true']).command ?? ''));
  // same line: `cat a.txt; cd y` makes a.txt stale
  const same = run('show it', ['cat a.txt; cd y']);
  assert.ok(!/a\.txt/.test(same.command), same.command);
});

test('history: the running tellsh call is not the previous command', () => {
  assert.equal(run('same for /var', ['du -sh /home', 'tellsh --history same for /var']).command, 'du -sh /var');
  assert.equal(run('same for /var', ['du -sh /home', "tellsh --history 'same for /var'"]).command, 'du -sh /var');
  assert.equal(run('same for /var', ['du -sh /home', 'node bin/tellsh.js same for /var']).command, 'du -sh /var');
});

test('history: "same for" does not take pronouns or filler words as values', () => {
  for (const q of ['what about this', 'and with force', 'what about it']) {
    const r = run(q, ['rm -r olddir']);
    assert.notEqual(r.context.rule, 'same-for', q);
    assert.ok(!r.command || !/\b(this|force|it)\b/.test(r.command), `${q}: ${r.command}`);
  }
  assert.equal(run('same for build', ['rm -r olddir']).command, 'rm -r build');
});

// ---------------------------------------------------------------------------------------------
// quoting per shell (r1-claude major 3/4, minor 5/6/7/9)

test('composer is never offered to fish (its single quotes treat \\ as an escape)', () => {
  const q = 'pokaż pliki w a\\ szczegółowo posortowane po rozmiarze';
  for (const compose of ['auto', 'force']) {
    const r = suggest(q, { env: { shell: 'fish', os: 'linux', coreutils: 'gnu' }, compose });
    assert.notEqual(r.method, 'composed', compose);
  }
});

test('PowerShell: values with " are refused for native programs, not for cmdlets', () => {
  const r = buildCommand('git_commit', '', { env: PS_WIN, resolved: { message: 'a" --amend "b' } });
  assert.equal(r.command, null);
  assert.match(r.gap, /PowerShell < 7\.3/);
  for (const [id, s] of [['extract_targz', { file: 'a".tar.gz' }], ['download_file', { url: 'https://x.org/"a' }], ['git_switch_branch', { branch: 'x"y' }]]) {
    assert.equal(buildCommand(id, '', { env: PS_WIN, resolved: s }).command, null, id);
  }
  assert.equal(buildCommand('git_commit', '', { env: PS_WIN, resolved: { message: 'fix it' } }).command, "git add -A; if ($LASTEXITCODE -eq 0) { git commit -m 'fix it' }");
  // cmdlets receive the single-quoted literal unchanged
  assert.equal(buildCommand('cat_file', '', { env: PS_WIN, resolved: { file: 'a"b.txt' } }).command, "Get-Content -LiteralPath 'a\"b.txt'");
  assert.deepEqual([...pwshNativeSlots('git add -A; if ($LASTEXITCODE -eq 0) { git commit -m {message} }')], ['message']);
  assert.deepEqual([...pwshNativeSlots("(Get-Content -LiteralPath {file} -Raw).Replace({old}, {new})")], []);
});

test('cmd: values starting with / are refused (switches); /s /c gets wrapping quotes', () => {
  const r = suggest('delete directory /q', { env: CMD });
  assert.equal(r.command, null);
  assert.match(r.gap, /switch/);
  assert.throws(() => cmdQuote('/q'), /switch/);
  assert.deepEqual(shellInvocation('"C:\\Program Files\\x.exe" "a b"', 'cmd'), ['cmd.exe', ['/d', '/s', '/c', '""C:\\Program Files\\x.exe" "a b""']]);
});

test('function templates: only path values get ./, other values starting with - become placeholders', () => {
  const b = buildCommand('base64_encode', '', { env: BASH, resolved: { text: '-n hello' } });
  assert.ok(!/\.\/-n/.test(b.command), b.command);
  assert.ok(b.missing.includes('text'));
  const f = buildCommand('grep_text', '', { env: CMD, resolved: { pattern: '-x', path: 'src' } });
  assert.ok(!/\.\/-x/.test(f.command || ''), f.command);
  const k = buildCommand('kill_by_name', '', { env: CMD, resolved: { name: '-f' } });
  assert.ok(!/\.\/-f/.test(k.command || ''), k.command);
  // a path still gets ./
  assert.equal(buildCommand('base64_encode', '', { env: BASH, resolved: { file: '-x.txt' } }).command, 'base64 ./-x.txt');
});

test('tilde expansion only for path slots', () => {
  assert.equal(buildCommand('git_commit', '', { env: BASH, resolved: { message: '~' } }).command, "git add -A && git commit -m '~'");
  assert.match(buildCommand('grep_text', '', { env: BASH, resolved: { pattern: '~/x', path: '~/src' } }).command, /-- '~\/x' ~\/src/);
  assert.equal(buildCommand('git_commit', '', { env: PS_LINUX, resolved: { message: '~' } }).command.includes("'~'"), true);
  assert.match(buildCommand('replace_text', '', { env: PS_WIN, resolved: { file: 'a.txt', old: '~', new: 'x' } }).command, /\.Replace\('~', 'x'\)/);
  assert.equal(shQuote('~/a b'), "~/'a b'");
  assert.equal(shQuote('~', { tilde: false }), "'~'");
  assert.equal(psQuote('~/x', { tilde: false }), "'~/x'");
});

test('"kill process named -9" is not kill 9; sed old text with a newline is escaped/refused', () => {
test/regressions22.test.js
test/regressions28.test.js
test/regressions6.test.js
test/regressions21.test.js
test/regressions14.test.js
test/slot-cases.js
test/regressions3-render.test.js
test/regressions20.test.js
test/regressions19.test.js
test/regressions9.test.js
test/regressions26.test.js
test/regressions13.test.js
test/fixtures/parity.json
test/regressions18.test.js
test/regressions.test.js
test/regressions23.test.js
test/devtools.test.js
test/regressions5.test.js
test/parity.test.js
test/regressions16.test.js
test/shells.test.js
test/regressions27.test.js
test/regressions7.test.js
test/hybrid.test.js
test/matrix.test.js
test/regressions3-history.test.js
test/regressions17.test.js
test/pipeline.test.js
test/regressions25.test.js
test/danger.test.js
test/regressions2.test.js
test/regressions8.test.js
test/regressions30.test.js
test/regressions24.test.js
test/regressions29.test.js
test/regressions15.test.js
test/allowlist.test.js
test/regressions4.test.js
test/cli.test.js
test/regressions3.test.js
test/compose.test.js
test/regressions12.test.js
test/regressions10.test.js
test/regressions11.test.js
test/slots.test.js
test/templates.test.js

exec
/bin/bash -lc "sed -n '976,1050p' src/fill.js && sed -n '1,115p' src/variants.js && sed -n '185,205p' src/variants.js && sed -n '235,249p' src/variants.js && sed -n '278,328p' src/variants.js" in /workspace/tellsh
exec
/bin/bash -lc "rg -n 'q\\)|q,|=>|function' src/catalog.js src/variants.js && sed -n '1,125p' src/catalog.js && sed -n '1,240p' test/shells.test.js" in /workspace/tellsh
 succeeded in 0ms:
src/variants.js:5://   gnuMac   macOS + Homebrew GNU coreutils (g-prefixed: gdu, gsort, gmd5sum, guniq, ...)
src/variants.js:16:// (s, q, ctx) with ctx = { os, shell, coreutils }; `q` quotes for the target shell.
src/variants.js:27:const isWin = (ctx) => (ctx && ctx.os) === 'win32';
src/variants.js:80:    cmd: (s, q) => `pushd ${q(s.path ?? '.', { name: 'path' })} && (findstr /s /n /c:${q(s.pattern, { name: 'pattern' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} & popd)`,
src/variants.js:85:    cmd: (s, q) => `pushd ${q(s.path ?? '.', { name: 'path' })} && (findstr /s /m /c:${q(s.pattern, { name: 'pattern' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} & popd)`,
src/variants.js:97:    cmd: (s, q) => `where /r ${q(s.path ?? '.', { name: 'path' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} | find /c /v ""`,
src/variants.js:194:    pwsh: (s, q) => `Expand-Archive -LiteralPath ${q(s.file, { name: 'file' })} -DestinationPath ${s.dest ? q(s.dest, { name: 'dest' }) : '.'}`,
src/variants.js:199:    pwsh: (s, q, ctx) => (!isWin(ctx) && /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file, { name: 'file' })}` : `tar -tvf ${q(s.file, { name: 'file' })}`),
src/variants.js:243:    cmd: (s, q) => { const p = q(s.path, { name: 'path' }); const dir = /"$/.test(p) ? p.slice(0, -1) + '\\"' : p + '\\'; return `if not exist ${dir} mkdir ${p}`; },
src/variants.js:287:    pwsh: (s, q) => (s.file
src/variants.js:293:    pwsh: (s, q) => (s.file
src/variants.js:316:    cmd: (s, q) => `taskkill /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`, { name: 'name' })}`,
src/variants.js:320:    cmd: (s, q) => `taskkill /f /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`, { name: 'name' })}`,
src/variants.js:488:    fish: (s, q, ctx) => ((ctx && ctx.os) === 'darwin'
src/variants.js:617:    fish: 'docker stop (docker ps -q)',
src/variants.js:618:    pwsh: 'docker stop (docker ps -q)',
src/catalog.js:12:const T = (id, description, template, slots, risk = 'safe', extra = {}) =>
src/catalog.js:83:    (s, q) => /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file, { name: 'file' })}` : `tar -tvf ${q(s.file, { name: 'file' })}`,
src/catalog.js:109:    (s, q, os) => s.file ? (os === 'darwin' ? `base64 -i ${q(s.file, { name: 'file' })}` : `base64 ${q(s.file, { name: 'file' })}`) : `printf '%s' ${q(s.text ?? '<TEXT>', { name: 'text' })} | base64`,
src/catalog.js:112:    (s, q, os) => {
src/catalog.js:250:  T('docker_stop_all', 'Stop all running containers', 'docker stop $(docker ps -q)', {}, 'high'),
src/catalog.js:295:export const BY_ID = Object.fromEntries(INTENTS.map((i) => [i.id, i]));
// Intent catalog: every command tellsh knows how to produce.
//
// Template syntax (see src/fill.js):
//   {slot}       value is shell-quoted
//   {slot!raw}   value inserted verbatim (only for validated slots: numbers, ports, find size/age flags)
//   «...»        optional segment, dropped if any slot inside it is missing
// `slots` maps slot name -> default value; `null` means required (a <PLACEHOLDER> is shown).
// `darwin` overrides the template on macOS. `risk` is safe | medium | high (src/danger.js may escalate).
// v0.2: archive create/extract, git stash/pull/checkout/clone raised safe -> medium after the teacher review
// (they overwrite files or change the working tree; data/teacher/decisions.jsonl).

const T = (id, description, template, slots, risk = 'safe', extra = {}) =>
  ({ id, description, template, slots, risk, ...extra });

export const INTENTS = [
  // ---------- files & disk ----------
  T('largest_files', 'Show the largest files under a directory',
    'find {path} -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n {count!raw}',
    { path: '.', count: 10 }),
  T('largest_dirs', 'Show the largest subdirectories of a directory',
    'du -h -d 1 {path} 2>/dev/null | sort -rh | head -n {count!raw}',
    { path: '.', count: 10 }),
  T('disk_free', 'Show free/used disk space per filesystem', 'df -h', {}),
  T('dir_size', 'Show total size of a directory', 'du -sh {path}', { path: '.' }),
  T('find_by_name', 'Find files by (part of) name',
    'find {path} -iname {namepat}', { path: '.', name: null }),
  T('find_by_ext', 'Find files with a given extension',
    'find {path} -type f -iname {glob}«{age!raw}»', { path: '.', ext: null }),
  T('find_recent', 'Find files modified within a time window',
    'find {path} -type f {age!raw}«-iname {glob}»', { path: '.', age: '-mtime -1' }),
  T('find_older_than', 'Find files older than N days',
    'find {path} -type f -mtime +{days!raw}«-iname {glob}»', { path: '.', days: 30 }),
  T('find_larger_than', 'Find files bigger than a size',
    'find {path} -type f -size +{size!raw}«-iname {glob}» -exec ls -lh {} +', { path: '.', size: '100M' }),
  T('find_smaller_than', 'Find files smaller than a size',
    'find {path} -type f -size -{size!raw}«-iname {glob}»', { path: '.', size: '1k' }),
  T('grep_text', 'Search for text recursively in files',
    'grep -rn«--include={glob}» -- {pattern} {path}', { path: '.', pattern: null }),
  T('grep_files_containing', 'List files that contain a text',
    'grep -rl«--include={glob}» -- {pattern} {path}', { path: '.', pattern: null }),
  T('count_lines', 'Count lines in a file', 'wc -l {file}', { file: null }),
  T('count_lines_code', 'Count total lines in all files of a type',
    'find {path} -type f -iname {glob} -exec cat {} + | wc -l', { path: '.', ext: null }),
  T('count_files', 'Count files in a directory (recursive)',
    'find {path} -type f«-iname {glob}» | wc -l', { path: '.' }),
  T('count_words', 'Count words in a file', 'wc -w {file}', { file: null }),
  T('sort_uniq', 'Most frequent lines in a file (sort | uniq -c)',
    'sort {file} | uniq -c | sort -rn | head -n {count!raw}', { file: null, count: 10 }),
  T('recent_files', 'List most recently modified files',
    "find {path} -type f -printf '%T@ %TY-%Tm-%Td %TH:%TM %p\\n' 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-",
    { path: '.', count: 10 },
    'safe', { darwin: "find {path} -type f -exec stat -f '%m %Sm %N' -t '%Y-%m-%d %H:%M' {} + 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-" }),
  T('empty_files', 'Find empty files', 'find {path} -type f -empty', { path: '.' }),
  T('empty_dirs', 'Find empty directories', 'find {path} -type d -empty', { path: '.' }),
  T('duplicate_files', 'Find duplicate files by content hash',
    'find {path} -type f -exec md5sum {} + | sort | uniq -w32 -dD',
    { path: '.' }, 'safe',
    // sorted `hash path` lines: print every member of a group, including the first one
    { darwin: "find {path} -type f -exec md5 -r {} + | sort | awk '$1 == p { if (!shown) print last; print; shown = 1; next } { p = $1; last = $0; shown = 0 }'" }),
  T('find_symlinks', 'List symbolic links', 'find {path} -type l -ls', { path: '.' }),
  T('broken_symlinks', 'Find broken symbolic links', 'find {path} -xtype l',
    { path: '.' }, 'safe', { darwin: 'find -L {path} -type l' }),
  T('list_files', 'List files in a directory with details', 'ls -lah {path}', { path: '.' }),
  T('list_tree', 'Show directory tree (2 levels)',
    "find {path} -maxdepth {depth!raw} -not -path '*/.git/*' | sort", { path: '.', depth: 2 }),
  T('hidden_files', 'List hidden files (dotfiles)',
    "find {path} -maxdepth 1 -name '.*'", { path: '.' }),
  T('file_type', 'Detect a file type', 'file {file}', { file: null }),
  T('file_stat', 'Show file metadata (size, permissions, times)', 'stat {file}', { file: null }),
  T('head_file', 'Show first lines of a file', 'head -n {count!raw} {file}', { file: null, count: 10 }),
  T('tail_file', 'Show last lines of a file', 'tail -n {count!raw} {file}', { file: null, count: 10 }),
  T('tail_follow', 'Follow a (log) file live', 'tail -f {file}',
    { file: '/var/log/syslog' }, 'safe', { darwinDefaults: { file: '/var/log/system.log' } }),
  T('cat_file', 'Print a file contents', 'cat {file}', { file: null }),
  T('print_line_range', 'Show a range of lines of a file (lines N to M)',
    "sed -n '{start!raw},{end!raw}p' {file}", { file: null, start: null, end: null }),
  T('compress_targz', 'Compress a directory/file into tar.gz',
    'tar -czvf {archive} {path}', { path: '.', archive: null }, 'medium'),
  T('extract_targz', 'Extract a tar.gz archive', '«mkdir -p {dest} && »tar -xzvf {file}«-C {dest}»', { file: null }, 'medium'),
  T('compress_zip', 'Compress into a zip archive', 'zip -r {archive} {path}', { path: '.', archive: null }, 'medium'),
  T('extract_zip', 'Extract a zip archive', 'unzip {file}«-d {dest}»', { file: null }, 'medium'),
  T('list_archive', 'List contents of an archive (tar/zip)',
    (s, q) => /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file, { name: 'file' })}` : `tar -tvf ${q(s.file, { name: 'file' })}`,
    { file: null }),
  T('chmod', 'Change file permissions', 'chmod {mode!raw} {file}', { file: null, mode: null }, 'medium'),
  T('make_executable', 'Make a file executable', 'chmod +x {file}', { file: null }, 'medium'),
  T('chown', 'Change file owner', 'sudo chown -R {user} {path}', { path: null, user: null }, 'medium'),
  T('copy', 'Copy files or directories', 'cp -ri {src} {dst}', { src: null, dst: null }, 'medium'),
  T('move_rename', 'Move or rename a file', 'mv -i {src} {dst}', { src: null, dst: null }, 'medium'),
  T('delete_file', 'Delete a file', 'rm {file}', { file: null }, 'high'),
  T('delete_dir', 'Delete a directory recursively', 'rm -r {path}', { path: null }, 'high'),
  T('delete_by_ext', 'Delete all files with an extension',
    'find {path} -type f -iname {glob} -delete', { path: '.', ext: null }, 'high'),
  T('mkdir', 'Create a directory (with parents)', 'mkdir -p {path}', { path: null }),
  T('touch_file', 'Create an empty file', 'touch {file}', { file: null }),
  T('current_dir', 'Print current working directory', 'pwd', {}),
  T('create_symlink', 'Create a symbolic link', 'ln -s {src} {dst}', { src: null, dst: null }, 'medium'),
  T('diff_files', 'Compare two files', 'diff -u {src} {dst}', { src: null, dst: null }),
  T('replace_text', 'Replace text in a file with sed (in place)',
    'sed -i {sedexpr} {file}', { file: null, old: null, new: null }, 'medium',
    { darwin: "sed -i '' {sedexpr} {file}" }),
  T('disk_mounts', 'Show mounted filesystems', 'findmnt', {}, 'safe', { darwin: 'mount' }),
  T('block_devices', 'List disks and partitions', 'lsblk', {}, 'safe', { darwin: 'diskutil list' }),
  T('hash_sha256', 'Compute SHA-256 checksum', 'sha256sum {file}', { file: null }, 'safe',
    { darwin: 'shasum -a 256 {file}' }),
  T('hash_md5', 'Compute MD5 checksum', 'md5sum {file}', { file: null }, 'safe', { darwin: 'md5 {file}' }),
  T('base64_encode', 'Base64-encode text or a file',
    // macOS base64 takes no positional file operand: it needs -i FILE
    (s, q, os) => s.file ? (os === 'darwin' ? `base64 -i ${q(s.file, { name: 'file' })}` : `base64 ${q(s.file, { name: 'file' })}`) : `printf '%s' ${q(s.text ?? '<TEXT>', { name: 'text' })} | base64`,
    {}),
  T('base64_decode', 'Decode base64 text or a file',
    (s, q, os) => {
      const d = os === 'darwin' ? 'base64 -D' : 'base64 -d';
      return s.file ? `${d} ${os === 'darwin' ? '-i ' : ''}${q(s.file, { name: 'file' })}` : `printf '%s' ${q(s.text ?? '<TEXT>', { name: 'text' })} | ${d}`;
    }, {}),

  // ---------- processes ----------
  T('top_cpu', 'Processes using the most CPU', 'ps aux --sort=-%cpu | head -n {count!raw}',
    { count: 10 }, 'safe', { darwin: 'ps aux -r | head -n {count!raw}' }),
  T('top_mem', 'Processes using the most memory', 'ps aux --sort=-%mem | head -n {count!raw}',
    { count: 10 }, 'safe', { darwin: 'ps aux -m | head -n {count!raw}' }),
  T('find_process', 'Find a running process by name', 'pgrep -af {name}',
    { name: null }, 'safe', { darwin: 'pgrep -lf {name}' }),
  T('kill_by_name', 'Kill processes by name', 'pkill -f {name}', { name: null }, 'high'),
  T('kill_force', 'Force-kill (SIGKILL) processes by name', 'pkill -9 -f {name}', { name: null }, 'high'),
// Every intent renders for every shell; POSIX renders are syntax-checked with `bash -n` / `sh -n`
// (also busybox sh if present); fish / PowerShell renders are parsed only when those shells are installed.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync, execFileSync } from 'node:child_process';
import { INTENTS } from '../src/catalog.js';
import { buildCommand } from '../src/fill.js';
import { shQuote, fishQuote, psQuote, cmdQuote } from '../src/render.js';
import { VARIANTS } from '../src/variants.js';
import { pwshParses } from '../scripts/lib/pwsh_parse.js';

const has = (b) => spawnSync('sh', ['-c', `command -v ${b}`]).status === 0;
// nasty-but-valid values for every slot (quotes, spaces, $, &, globs)
const SAMPLE = {
  path: '/tmp/my dir', file: "it's.txt", src: 'a b.txt', dst: '/tmp/x', dest: '/tmp/out', archive: 'out.tar.gz', name: 'node',
  service: 'nginx', container: 'web', pkg: 'htop', cmd: 'git', var: 'HOME', branch: 'feature/x', user: 'www-data',
  pattern: "a'b $x", host: 'example.com', target: 'root@example.com', message: 'fix "quotes" & $HOME', url: 'https://x.org/a?b=1&c',
  port: 8080, pid: 4242, mode: '755', old: 'a/b', new: 'c&d', text: 'hello world', glob: '*.pdf', age: '-mtime -3', size: '100M',
  count: 5, days: 30, since: '3 days ago', depth: 2, start: 10, end: 20, num: 42, pr: 42, script: 'build:prod',
};
function sampleFor(intent) {
  const v = {};
  const names = new Set(Object.keys(intent.slots));
  for (const t of [intent.template, intent.darwin, ...Object.values(VARIANTS[intent.id] || {})]) {
    if (typeof t === 'string') for (const m of t.matchAll(/\{(\w+)/g)) names.add(m[1]);
    else if (t && typeof t === 'object') for (const s of Object.values(t)) if (typeof s === 'string') for (const m of s.matchAll(/\{(\w+)/g)) names.add(m[1]);
  }
  for (const n of names) if (SAMPLE[n] != null) v[n] = SAMPLE[n];
  if (intent.id === 'replace_text') v.sedexpr = 's/a\\/b/c\\&d/g';
  if (intent.id === 'find_by_name') v.namepat = '*my file*';
  if (intent.id.startsWith('base64')) v.text = SAMPLE.text;
  if (intent.id === 'list_archive') v.file = 'out.tar.gz';
  return v;
}

const POSIX_ENVS = [
  ['bash/linux', { shell: 'bash', os: 'linux', coreutils: 'gnu' }, 'bash'],
  ['zsh/darwin BSD', { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, 'bash'],
  ['zsh/darwin GNU', { shell: 'zsh', os: 'darwin', coreutils: 'gnu' }, 'bash'],
  ['sh/linux (dash)', { shell: 'sh', os: 'linux', coreutils: 'gnu' }, 'sh'],
  ['sh/busybox', { shell: 'sh', os: 'linux', coreutils: 'busybox' }, has('busybox') ? 'busybox' : 'sh'],
];
for (const [label, env, checker] of POSIX_ENVS) {
  test(`${label}: every intent renders and passes ${checker} -n`, () => {
    const bad = [];
    for (const it of INTENTS) {
      const r = buildCommand(it.id, '', { env, resolved: sampleFor(it) });
      assert.ok(r.command, `${it.id}: no command`);
      assert.deepEqual(r.missing, [], `${it.id}: missing ${r.missing}`);
      const args = checker === 'busybox' ? ['sh', '-n', '-c', r.command] : ['-n', '-c', r.command];
      const res = spawnSync(checker, args, { encoding: 'utf8' });
      if (res.status !== 0) bad.push(`${it.id}: ${r.command}\n    ${res.stderr.trim()}`);
    }
    assert.deepEqual(bad, []);
  });
}

test('fish: every intent renders (fish -n when installed)', (t) => {
  const env = { shell: 'fish', os: 'linux', coreutils: 'gnu' };
  const bad = [];
  for (const it of INTENTS) {
    const r = buildCommand(it.id, '', { env, resolved: sampleFor(it) });
    assert.ok(r.command, it.id);
    assert.ok(!/\$\{|\$\(/.test(r.command), `${it.id}: POSIX-only expansion in fish render: ${r.command}`);
    if (has('fish')) { const res = spawnSync('fish', ['-n', '-c', r.command]); if (res.status !== 0) bad.push(it.id); }
  }
  if (!has('fish')) t.diagnostic('fish not installed: syntax check skipped');
  assert.deepEqual(bad, []);
});

for (const os of ['win32', 'linux']) {
  test(`PowerShell/${os}: every intent renders or reports a gap (parser check when pwsh is installed)`, (t) => {
    const env = { shell: 'powershell', os, coreutils: 'gnu' };
    let gaps = 0;
    const bad = [];
    for (const it of INTENTS) {
      const r = buildCommand(it.id, '', { env, resolved: sampleFor(it) });
      // the sample message contains `"`, which legacy PowerShell cannot pass to a native program (git): refused by design
      if (r.gap && /PowerShell < 7\.3/.test(r.gap)) continue;
      if (r.gap) { gaps++; continue; }
      assert.ok(r.command, it.id);
      // cheap structural lint: balanced quotes/brackets, no bash-only expansions outside bash -c
      if (!/^bash -c /.test(r.command)) {
        const s = r.command.replace(/'(?:[^']|'')*'/g, "''").replace(/"(?:`.|[^"`])*"/g, '""');
        for (const [o, c] of [['{', '}'], ['(', ')'], ['[', ']']]) assert.equal(s.split(o).length, s.split(c).length, `${it.id}: unbalanced ${o}${c}: ${r.command}`);
        assert.ok(!/\$\{\w+:-/.test(s), `${it.id}: POSIX expansion in PowerShell: ${r.command}`);
      }
      if (has('pwsh')) {
        if (pwshParses(r.command) !== true) bad.push(it.id);
      }
    }
    if (!has('pwsh')) t.diagnostic(`pwsh not installed: parser check skipped (${gaps} gaps)`);
    assert.ok(gaps <= (os === 'win32' ? 5 : 0), `too many PowerShell gaps on ${os}: ${gaps}`);
    assert.deepEqual(bad, []);
  });
}

test('cmd: best-effort coverage is reported, gaps carry a reason', () => {
  const env = { shell: 'cmd', os: 'win32', coreutils: 'gnu' };
  let ok = 0;
  for (const it of INTENTS) {
    // Windows paths: a value starting with / is a cmd.exe switch and is refused by design
    const s = Object.fromEntries(Object.entries(sampleFor(it)).map(([k, v]) => [k, typeof v === 'string' && v.startsWith('/') ? 'C:' + v.replace(/\//g, '\\') : v]));
    const r = buildCommand(it.id, '', { env, resolved: s });
    if (r.gap) assert.ok(r.gap.length > 5, it.id); else ok++;
  }
  assert.ok(ok >= 100, `cmd renders: ${ok}`);
});

test('quoting round-trips through bash and sh', () => {
  for (const s of ["it's", 'a b', '$(rm -rf ~)', '`id`', '"; ls', '*.log', 'ąę żółw', '\\', '-rf']) {
    for (const sh of ['bash', 'sh']) assert.equal(execFileSync(sh, ['-c', `printf '%s' ${shQuote(s)}`], { encoding: 'utf8' }), s);
  }
});

test('fish / PowerShell / cmd quoting rules', () => {
  assert.equal(fishQuote("it's"), "'it\\'s'");
  assert.equal(fishQuote('a\\b c'), "'a\\\\b c'");
  assert.equal(fishQuote('~/my dir'), "~/'my dir'");
  assert.equal(psQuote("it's"), "'it''s'");
  assert.equal(psQuote('$(evil)'), "'$(evil)'");
  assert.equal(psQuote('~/Pobrane'), '"$HOME/Pobrane"');
  assert.equal(psQuote('~/$x'), '"$HOME/`$x"');
  assert.throws(() => cmdQuote('a "b"'), /cmd.exe/);
  assert.throws(() => cmdQuote('%PATH%'), /cmd.exe/);
  assert.equal(cmdQuote('a b'), '"a b"');
  assert.equal(cmdQuote('~/Downloads'), '"%USERPROFILE%\\Downloads"');
});

test('per-shell variants: intent shared, rendering differs', () => {
  const q = { path: '/var', count: 5 };
  assert.match(buildCommand('largest_dirs', '', { env: { shell: 'bash', os: 'linux', coreutils: 'gnu' }, resolved: q }).command, /^du -h -d 1 \/var .*sort -rh/);
  assert.match(buildCommand('largest_dirs', '', { env: { shell: 'zsh', os: 'darwin', coreutils: 'bsd' }, resolved: q }).command, /^du -k -d 1 \/var .*sort -rn/);
  assert.match(buildCommand('largest_dirs', '', { env: { shell: 'zsh', os: 'darwin', coreutils: 'gnu' }, resolved: q }).command, /gsort -rh/);
  assert.match(buildCommand('largest_dirs', '', { env: { shell: 'powershell', os: 'win32', coreutils: 'gnu' }, resolved: q }).command, /^Get-ChildItem/);
  assert.match(buildCommand('replace_text', 'replace a with b in f.txt', { env: { shell: 'zsh', os: 'darwin', coreutils: 'bsd' } }).command, /^sed -i '' /);
  assert.equal(buildCommand('show_path', '', { env: { shell: 'fish', os: 'linux', coreutils: 'gnu' } }).command, 'string join \\n $PATH');
  // PowerShell on Linux without a native variant runs the POSIX command through bash -c
  const r = buildCommand('journal_errors', '', { env: { shell: 'powershell', os: 'linux', coreutils: 'gnu' } });
  assert.ok(/^bash -c '/.test(r.command) || /journalctl/.test(r.command), r.command);
});

 succeeded in 0ms:
  if (choice.gap) {
    return { ...base, command: null, gap: choice.gap, risk: intent.risk, warnings: [], critical: false, missing: [] };
  }
  const baseQuote = quoteForKind(choice.kind, choice.wrapPosix);
  const tpl = choice.tpl;
  const pwshNative = choice.kind === 'pwsh' && !choice.wrapPosix;
  const nativeSlots = pwshNative ? pwshNativeSlots(tpl) : new Set();
  const quote = !pwshNative ? baseQuote : (v, o = {}) => {
    // function templates: every value is checked (the target program is not known statically)
    if ((typeof tpl === 'function' || nativeSlots.has(o.name)) && unsafeNativePwshArg(v)) {
      throw new UnquotableError(`value ${JSON.stringify(String(v))} cannot be passed to a native program safely by PowerShell < 7.3 (embedded " or trailing \\)`);
    }
    return baseQuote(v, o);
  };
  let command;
  let missing = [];
  try {
    if (typeof tpl === 'function') {
      const vals = { ...values };
      for (const r of required) if (!(r in vals)) { missing.push(r); vals[r] = PLACEHOLDER(r); }
      // only path slots may get a ./ prefix; any other value starting with - would be read as an
      // option (printf -n, findstr /?, taskkill ...): it is left as a placeholder instead
      for (const [k, v] of Object.entries(vals)) {
        if (!PATH_SLOTS.has(k) && !RAW_OK[k] && typeof v === 'string' && /^-/.test(v)) { missing.push(k); vals[k] = PLACEHOLDER(k); }
      }
      // slot role must be passed explicitly ({ name } or { tilde }); never infer from value
      // equality — a pattern equal to a path would otherwise be rewritten like a path
      const q = (s, o = {}) => {
        const isPath = 'tilde' in o ? !!o.tilde : PATH_SLOTS.has(o.name);
        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { ...o, tilde: isPath });
      };
      // catalog functions take the OS string, variant functions a ctx object
      command = tpl(vals, q, tpl === intent.template || tpl === intent.darwin ? e.os : e);
      if (/<TEXT>/.test(command)) missing.push('text');
    } else {
      ({ command, missing } = render(tpl, values, required, quote, keepOptional.filter((k) => blank.includes(k) && !(k in values))));
      missing = missing.map((m) => DERIVED_REQUIRED[m] || m);
    }
  } catch (err) {
    if (!(err instanceof UnquotableError)) throw err;
    return { ...base, command: null, gap: err.message, risk: intent.risk, warnings: [], critical: false, missing: [] };
  }
  if (choice.wrapPosix) {
    // PowerShell < 7.3 drops embedded double quotes when passing arguments to native programs, so a
    // POSIX command containing `"` is fed to bash on stdin instead of as a -c argument.
    if (command.includes('"')) { command = psQuote(command) + ' | bash'; base.variant = 'piped to bash (no native PowerShell variant)'; }
    else { command = 'bash -c ' + psQuote(command); base.variant = 'bash -c (no native PowerShell variant)'; }
  }
  missing = [...new Set(missing)];
  // the trust rule (danger.js): this is tellsh's own render; it can be rated safe only when every value it was given is
  // a plain literal (a missing value is tellsh's own <PLACEHOLDER>, and the command cannot run before it is edited)
  const used = typeof tpl === 'function' ? Object.keys(values) : [...String(tpl).matchAll(/\{(\w+)(!raw)?\}/g)].map((m) => m[1]);
  const plain = used.every((k) => !(k in values) || plainSlotValue(k, values[k], { dashOk: PATH_SLOTS.has(k) || (!!RAW_OK[k] && RAW_OK[k](values[k])) }));
  const danger = checkDanger(command, intent.risk, { rendered: plain, shell: choice.kind === 'pwsh' && !choice.wrapPosix ? 'powershell' : e.shell, os: e.os });
  return {
    ...base,
    command,
    risk: maxRisk(intent.risk, danger.risk),
    warnings: danger.warnings,
    critical: danger.critical,
    missing,
  };
}
// Per-shell / per-OS template variants (see src/render.js for precedence). Keys are intent ids from src/catalog.js.
//
// Keys per intent (all optional):
//   bsd      macOS/BSD userland (bash/zsh/sh on macOS without GNU coreutils), used before catalog `darwin`
//   gnuMac   macOS + Homebrew GNU coreutils (g-prefixed: gdu, gsort, gmd5sum, guniq, ...)
//   zsh      zsh only (bash/sh keep the POSIX choice)
//   busybox  BusyBox userland (Alpine etc.) - only where the GNU template uses flags/tools busybox lacks
//   fish     fish 3.x - only where the POSIX template is not valid fish
//   pwsh     PowerShell: a string (all OSes) or { win, unix }. A missing `unix` means the renderer falls back
//            to `bash -c '<posix command>'` (used where Linux and macOS natives differ). A missing `win`
//            is a Windows gap and is explained in gaps.pwsh ("Windows: ...").
//   cmd      cmd.exe, best effort
//   gaps     { shell: reason } when a shell/OS has no reasonable equivalent
//
// Template syntax is the catalog one ({slot}, {slot!raw}, «optional»). Function templates get
// (s, q, ctx) with ctx = { os, shell, coreutils }; `q` quotes for the target shell.
// PowerShell variants avoid `&&`/`||` (5.1 compat) and aliases, use -LiteralPath for user paths and
// never add -Force to destructive cmdlets unless the POSIX template forces too. Derived slots:
// ext (bare extension), minutes (time window in minutes), sizeBytes (size in bytes).

// Recursive file listing used by many PowerShell variants (-Force = include hidden files, like find).
const PS_FILES = 'Get-ChildItem -LiteralPath {path} -File -Recurse -Force -ErrorAction SilentlyContinue';
const PS_ALL = 'Get-ChildItem -LiteralPath {path} -Recurse -Force -ErrorAction SilentlyContinue';
const PS_FULLNAME = 'Select-Object -ExpandProperty FullName';
const PS_PROC_MATCH = 'Get-Process | Where-Object { $_.ProcessName -match {name} -or $_.CommandLine -match {name} }';
const PS_OS = 'Get-CimInstance -ClassName Win32_OperatingSystem';
const isWin = (ctx) => (ctx && ctx.os) === 'win32';

export const VARIANTS = {
  // ---------- files & disk ----------
  largest_files: {
    bsd: 'find {path} -xdev -type f -exec du -k {} + 2>/dev/null | sort -rn | head -n {count!raw}',
    gnuMac: 'find {path} -xdev -type f -exec du -h {} + 2>/dev/null | gsort -rh | head -n {count!raw}',
    pwsh: `${PS_FILES} | Sort-Object Length -Descending | Select-Object -First {count!raw} -Property Length, FullName`,
    gaps: { cmd: 'cmd.exe cannot sort files by size across subdirectories' },
  },
  largest_dirs: {
    bsd: 'du -k -d 1 {path} 2>/dev/null | sort -rn | head -n {count!raw}',
    gnuMac: 'gdu -h -d 1 {path} 2>/dev/null | gsort -rh | head -n {count!raw}',
    pwsh: "Get-ChildItem -LiteralPath {path} -Directory -Force | ForEach-Object { [pscustomobject]@{ Size = (Get-ChildItem -LiteralPath $_.FullName -File -Recurse -Force -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum; Path = $_.FullName } } | Sort-Object Size -Descending | Select-Object -First {count!raw}",
    gaps: { cmd: 'cmd.exe cannot sum and sort directory sizes' },
  },
  disk_free: {
    pwsh: { win: 'Get-PSDrive -PSProvider FileSystem', unix: 'df -h' },
    gaps: { cmd: 'fsutil volume diskfree needs an elevated prompt; use PowerShell (Get-PSDrive)' },
  },
  dir_size: {
    pwsh: `${PS_FILES} | Measure-Object -Property Length -Sum | Select-Object Count, Sum, @{ Name = 'MB'; Expression = { [math]::Round($_.Sum / 1MB, 1) } }`,
    cmd: 'dir /s /a {path}',
  },
  find_by_name: {
    pwsh: `${PS_ALL} | Where-Object Name -Like {namepat} | ${PS_FULLNAME}`,
    cmd: 'where /r {path} {namepat}',
  },
  find_by_ext: {
    pwsh: `${PS_FILES} | Where-Object Name -Like {glob}«| Where-Object LastWriteTime -GT (Get-Date).AddMinutes(-{minutes!raw})» | ${PS_FULLNAME}`,
    cmd: 'where /r {path} {glob}',
  },
  find_recent: {
    pwsh: `${PS_FILES} | Where-Object LastWriteTime -GT (Get-Date).AddMinutes(-{minutes!raw})«| Where-Object Name -Like {glob}» | ${PS_FULLNAME}`,
    gaps: { cmd: 'forfiles only filters by whole days, not by an arbitrary time window' },
  },
  find_older_than: {
    pwsh: `${PS_FILES} | Where-Object LastWriteTime -LT (Get-Date).AddDays(-{days!raw})«| Where-Object Name -Like {glob}» | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s /d -{days!raw}«/m {glob}» /c "cmd /c if @isdir==FALSE echo @path"',
  },
  find_larger_than: {
    busybox: 'find {path} -type f -size +{sizeBytes!raw}c«-iname {glob}» -exec ls -lh {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Where-Object Length -GT {sizeBytes!raw} | Select-Object Length, LastWriteTime, FullName`,
    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize GTR {sizeBytes!raw} echo @path @fsize"',
  },
  find_smaller_than: {
    busybox: 'find {path} -type f -size -{sizeBytes!raw}c«-iname {glob}»',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Where-Object Length -LT {sizeBytes!raw} | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize LSS {sizeBytes!raw} echo @path"',
  },
  grep_text: {
    busybox: 'find {path} -type f«-iname {glob}» -exec grep -Hn -- {pattern} {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -Pattern {pattern}`,
    cmd: (s, q) => `pushd ${q(s.path ?? '.', { name: 'path' })} && (findstr /s /n /c:${q(s.pattern, { name: 'pattern' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} & popd)`,
  },
  grep_files_containing: {
    busybox: 'find {path} -type f«-iname {glob}» -exec grep -l -- {pattern} {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -List -Pattern {pattern} | Select-Object -ExpandProperty Path`,
    cmd: (s, q) => `pushd ${q(s.path ?? '.', { name: 'path' })} && (findstr /s /m /c:${q(s.pattern, { name: 'pattern' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} & popd)`,
  },
  count_lines: {
    pwsh: '@(Get-Content -LiteralPath {file}).Count',
    cmd: 'find /c /v "" {file}',
  },
  count_lines_code: {
    pwsh: `(${PS_FILES} | Where-Object Name -Like {glob} | Get-Content | Measure-Object).Count`,
    gaps: { cmd: 'no reliable way to concatenate files recursively and count lines in cmd.exe' },
  },
  count_files: {
    pwsh: `(${PS_FILES}«| Where-Object Name -Like {glob}» | Measure-Object).Count`,
    cmd: (s, q) => `where /r ${q(s.path ?? '.', { name: 'path' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} | find /c /v ""`,
  },
  count_words: {
    pwsh: '(Get-Content -LiteralPath {file} -Raw | Measure-Object -Word).Words',
    gaps: { cmd: 'cmd.exe has no word counter' },
  },
  sort_uniq: {
    pwsh: 'Get-Content -LiteralPath {file} | Group-Object -NoElement -CaseSensitive | Sort-Object Count -Descending | Select-Object -First {count!raw}',
    gaps: { cmd: 'cmd.exe has no uniq/group-by equivalent' },
  },
  recent_files: {
    busybox: "find {path} -type f -exec stat -c '%Y %y %n' {} + 2>/dev/null | sort -rn | head -n {count!raw} | cut -d' ' -f2-",
    pwsh: `${PS_FILES} | Sort-Object LastWriteTime -Descending | Select-Object -First {count!raw} -Property LastWriteTime, FullName`,
    gaps: { cmd: 'dir /o-d sorts only within each directory, not recursively' },
  },
  empty_files: {
    pwsh: `${PS_FILES} | Where-Object Length -EQ 0 | ${PS_FULLNAME}`,
    cmd: 'forfiles /p {path} /s /c "cmd /c if @isdir==FALSE if @fsize==0 echo @path"',
  },
    cmd: '«mkdir {dest} 2>nul & »tar -xzvf {file}«-C {dest}»',
  },
  compress_zip: {
    // Windows: Compress-Archive aborts on a broken symlink or a locked file; bsdtar (Windows 10+) picks zip from .zip.
    // Elsewhere tar may be GNU tar (no zip format): keep Compress-Archive.
    pwsh: { win: 'tar -a -c -f {archive} {path}', unix: 'Compress-Archive -LiteralPath {path} -DestinationPath {archive}' },
    cmd: 'tar -a -c -f {archive} {path}', // bsdtar picks zip format from the .zip suffix
  },
  extract_zip: {
    pwsh: (s, q) => `Expand-Archive -LiteralPath ${q(s.file, { name: 'file' })} -DestinationPath ${s.dest ? q(s.dest, { name: 'dest' }) : '.'}`,
    cmd: '«mkdir {dest} 2>nul & »tar -xf {file}«-C {dest}»',
  },
  list_archive: {
    // bsdtar on Windows lists zip archives too; GNU tar on Linux does not.
    pwsh: (s, q, ctx) => (!isWin(ctx) && /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file, { name: 'file' })}` : `tar -tvf ${q(s.file, { name: 'file' })}`),
    cmd: 'tar -tvf {file}',
  },
  chmod: {
    pwsh: { unix: 'chmod {mode!raw} {file}' },
    gaps: { pwsh: 'Windows: no POSIX permission bits (use icacls)', cmd: 'no POSIX permission bits (use icacls)' },
  },
    cmd: 'pushd {path} && (del /s {glob} & popd)',
  },
  mkdir: {
    // mkdir -p without -Force: an existing directory is left alone, New-Item never replaces anything (-Force would replace a
    // registry key on HKCU:, whatever -ItemType says)
    pwsh: 'if (-not (Test-Path -LiteralPath {path} -PathType Container)) { New-Item -ItemType Directory -Path {path} }',
    // mkdir -p: an existing directory is not an error (cmd's mkdir already creates parents); a trailing \ makes
    // `if exist` test for a directory, so an existing file of that name still fails like mkdir -p does
    cmd: (s, q) => { const p = q(s.path, { name: 'path' }); const dir = /"$/.test(p) ? p.slice(0, -1) + '\\"' : p + '\\'; return `if not exist ${dir} mkdir ${p}`; },
  },
  touch_file: {
    pwsh: 'if (Test-Path -LiteralPath {file}) { (Get-Item -LiteralPath {file}).LastWriteTime = Get-Date } else { New-Item -ItemType File -Path {file} }',
    cmd: 'type nul >> {file}',
  },
  current_dir: {
  hash_sha256: {
    pwsh: 'Get-FileHash -LiteralPath {file} -Algorithm SHA256',
    cmd: 'certutil -hashfile {file} SHA256',
  },
  hash_md5: {
    pwsh: 'Get-FileHash -LiteralPath {file} -Algorithm MD5',
    cmd: 'certutil -hashfile {file} MD5',
  },
  base64_encode: {
    pwsh: (s, q) => (s.file
      ? `[Convert]::ToBase64String([System.IO.File]::ReadAllBytes((Resolve-Path -LiteralPath ${q(s.file, { name: 'file' })}).ProviderPath))`
      : `[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(${q(s.text ?? '<TEXT>', { name: 'text' })}))`),
    gaps: { cmd: 'certutil -encode writes to a file with PEM headers, not to stdout' },
  },
  base64_decode: {
    pwsh: (s, q) => (s.file
      ? `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String((Get-Content -LiteralPath ${q(s.file, { name: 'file' })} -Raw)))`
      : `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(${q(s.text ?? '<TEXT>', { name: 'text' })}))`),
    gaps: { cmd: 'certutil -decode writes to a file, not to stdout' },
  },

  // ---------- processes ----------
  top_cpu: {
    busybox: 'top -b -n 1 | head -n $(({count!raw} + 4))',
    pwsh: 'Get-Process | Sort-Object CPU -Descending | Select-Object -First {count!raw}',
    gaps: { cmd: 'tasklist cannot sort by CPU usage' },
  },
  top_mem: {
    busybox: 'ps -o pid,user,rss,vsz,args | sort -k3 -rh | head -n {count!raw}',
    pwsh: 'Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First {count!raw}',
    cmd: 'tasklist | sort /r /+65', // Mem Usage column is right-aligned starting at column 65
  },
  find_process: {
    pwsh: `${PS_PROC_MATCH} | Select-Object Id, ProcessName, CommandLine`,
    cmd: 'tasklist | findstr /i {name}',
  },
  kill_by_name: {
    pwsh: { win: `${PS_PROC_MATCH} | Stop-Process`, unix: 'pkill -f {name}' },
    cmd: (s, q) => `taskkill /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`, { name: 'name' })}`,
  },
  kill_force: {
    pwsh: { win: `${PS_PROC_MATCH} | Stop-Process -Force`, unix: 'pkill -9 -f {name}' },
    cmd: (s, q) => `taskkill /f /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`, { name: 'name' })}`,
  },
  kill_by_pid: {
    // `kill` is an alias of Stop-Process (SIGKILL on Unix) in PowerShell; call the real binary for SIGTERM.
    pwsh: { win: 'Stop-Process -Id {pid!raw}', unix: '/bin/kill {pid!raw}' },
    cmd: 'taskkill /pid {pid!raw}',
  },
  kill_by_port: {
    busybox: 'fuser -k -TERM {port!raw}/tcp',

exec
/bin/bash -lc "node --test --test-name-pattern='cmd:|function templates:|tilde expansion|pwshNativeSlots|PowerShell:' test/matrix.test.js test/regressions2.test.js test/regressions3-render.test.js test/shells.test.js" in /workspace/tellsh
 succeeded in 457ms:
TAP version 13
# Subtest: /workspace/tellsh/test/matrix.test.js
ok 1 - /workspace/tellsh/test/matrix.test.js
  ---
  duration_ms: 382.910522
  ...
# Subtest: /workspace/tellsh/test/regressions2.test.js
ok 2 - /workspace/tellsh/test/regressions2.test.js
  ---
  duration_ms: 394.857967
  ...
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 3 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 381.467185
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
ok 4 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 373.472461
  ...
1..4
# tests 4
# suites 0
# pass 4
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 410.933005

codex
Every function-template `q()` call passes a slot name. The cmd wrapper forwards those options and still handles `/api` as an attached `/c:` value; the PowerShell guard still checks every function-template argument. I’m checking these interactions with focused cases.
exec
/bin/bash -lc "sed -n '478,505p' src/variants.js && rg -n 'node|test|spawn' test/templates.test.js && git diff 745a432"'^ 745a432 -- src/fill.js src/catalog.js src/variants.js test/matrix.test.js && rg -n '"'(cmdTemplate|q\\(.*name|pathVals|tilde|VERDICT|REQUEST_CHANGES|APPROVE)' review/031-r8-claude.md review/031-r8-fix-needed.md" in /workspace/tellsh
 succeeded in 0ms:
  failed_services: {
    bsd: "launchctl list | awk 'NR == 1 || ($2 != \"0\" && $2 != \"-\")'",
    pwsh: { win: "Get-CimInstance -ClassName Win32_Service -Filter \"StartMode='Auto' AND State<>'Running'\" | Select-Object Name, State, ExitCode" },
    gaps: { cmd: 'sc query cannot filter by start mode' },
  },
  dmesg: {
    pwsh: { win: 'Get-WinEvent -LogName System -MaxEvents {count!raw}', unix: 'sudo dmesg | tail -n {count!raw}' },
    cmd: 'wevtutil qe System /c:{count!raw} /rd:true /f:text',
  },
  battery: {
    fish: (s, q, ctx) => ((ctx && ctx.os) === 'darwin'
      ? 'pmset -g batt'
      : 'set -l b /sys/class/power_supply/BAT*/capacity; if test (count $b) -gt 0; cat $b; else; upower -i /org/freedesktop/UPower/devices/DisplayDevice; end'),
    pwsh: { win: 'Get-CimInstance -ClassName Win32_Battery | Select-Object Name, EstimatedChargeRemaining, BatteryStatus' },
    gaps: { cmd: 'powercfg /batteryreport only writes an HTML report' },
  },
  temperature: {
    pwsh: { win: "Get-CimInstance -Namespace root/WMI -ClassName MSAcpi_ThermalZoneTemperature | Select-Object InstanceName, @{ Name = 'Celsius'; Expression = { $_.CurrentTemperature / 10 - 273.15 } }" },
    gaps: { cmd: 'no temperature sensors access from cmd.exe' },
  },
  gpu_info: {
    pwsh: { win: 'Get-CimInstance -ClassName Win32_VideoController | Select-Object Name, DriverVersion, AdapterRAM' },
    gaps: { cmd: 'wmic is deprecated; dxdiag only writes a report file' },
  },
  usb_devices: {
    pwsh: { win: "Get-PnpDevice -PresentOnly | Where-Object InstanceId -Like 'USB*'" },
    gaps: { cmd: 'no reliable USB device listing in cmd.exe (pnputil output varies by build)' },
  },
1:import { test } from 'node:test';
2:import assert from 'node:assert/strict';
3:import { execFileSync } from 'node:child_process';
10:test('shQuote round-trips nasty strings through bash', () => {
16:test('shQuote keeps simple words bare and tilde expandable', () => {
23:test('raw slots are validated, never injected', () => {
29:test('optional segments are dropped when slot missing', () => {
34:test('non-slot braces are left alone', () => {
39:test('every intent renders on linux and darwin without throwing, with valid risk', () => {
45:      assert.ok(!/undefined|(?<!\/dev\/)null|\{\w+(!raw)?\}/.test(r.command.replace(/%\{http_code\}/, '')), `${i.id}/${platform}: ${r.command}`);
50:test('darwin variants differ where commands differ', () => {
57:test('injection attempt in a filename stays a single quoted argument', () => {
diff --git a/src/catalog.js b/src/catalog.js
index a141fb5..23b63bb 100644
--- a/src/catalog.js
+++ b/src/catalog.js
@@ -80,7 +80,7 @@ export const INTENTS = [
   T('compress_zip', 'Compress into a zip archive', 'zip -r {archive} {path}', { path: '.', archive: null }, 'medium'),
   T('extract_zip', 'Extract a zip archive', 'unzip {file}«-d {dest}»', { file: null }, 'medium'),
   T('list_archive', 'List contents of an archive (tar/zip)',
-    (s, q) => /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file)}` : `tar -tvf ${q(s.file)}`,
+    (s, q) => /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file, { name: 'file' })}` : `tar -tvf ${q(s.file, { name: 'file' })}`,
     { file: null }),
   T('chmod', 'Change file permissions', 'chmod {mode!raw} {file}', { file: null, mode: null }, 'medium'),
   T('make_executable', 'Make a file executable', 'chmod +x {file}', { file: null }, 'medium'),
@@ -106,12 +106,12 @@ export const INTENTS = [
   T('hash_md5', 'Compute MD5 checksum', 'md5sum {file}', { file: null }, 'safe', { darwin: 'md5 {file}' }),
   T('base64_encode', 'Base64-encode text or a file',
     // macOS base64 takes no positional file operand: it needs -i FILE
-    (s, q, os) => s.file ? (os === 'darwin' ? `base64 -i ${q(s.file)}` : `base64 ${q(s.file)}`) : `printf '%s' ${q(s.text ?? '<TEXT>')} | base64`,
+    (s, q, os) => s.file ? (os === 'darwin' ? `base64 -i ${q(s.file, { name: 'file' })}` : `base64 ${q(s.file, { name: 'file' })}`) : `printf '%s' ${q(s.text ?? '<TEXT>', { name: 'text' })} | base64`,
     {}),
   T('base64_decode', 'Decode base64 text or a file',
     (s, q, os) => {
       const d = os === 'darwin' ? 'base64 -D' : 'base64 -d';
-      return s.file ? `${d} ${os === 'darwin' ? '-i ' : ''}${q(s.file)}` : `printf '%s' ${q(s.text ?? '<TEXT>')} | ${d}`;
+      return s.file ? `${d} ${os === 'darwin' ? '-i ' : ''}${q(s.file, { name: 'file' })}` : `printf '%s' ${q(s.text ?? '<TEXT>', { name: 'text' })} | ${d}`;
     }, {}),
 
   // ---------- processes ----------
diff --git a/src/fill.js b/src/fill.js
index ab06388..c27cb2d 100644
--- a/src/fill.js
+++ b/src/fill.js
@@ -998,10 +998,11 @@ export function buildCommand(intentId, text, { platform = process.platform, env,
       for (const [k, v] of Object.entries(vals)) {
         if (!PATH_SLOTS.has(k) && !RAW_OK[k] && typeof v === 'string' && /^-/.test(v)) { missing.push(k); vals[k] = PLACEHOLDER(k); }
       }
-      const pathVals = new Set([...PATH_SLOTS].filter((k) => vals[k] != null).map((k) => String(vals[k])));
-      const q = (s) => {
-        const isPath = pathVals.has(String(s));
-        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { tilde: isPath });
+      // slot role must be passed explicitly ({ name } or { tilde }); never infer from value
+      // equality — a pattern equal to a path would otherwise be rewritten like a path
+      const q = (s, o = {}) => {
+        const isPath = 'tilde' in o ? !!o.tilde : PATH_SLOTS.has(o.name);
+        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { ...o, tilde: isPath });
       };
       // catalog functions take the OS string, variant functions a ctx object
       command = tpl(vals, q, tpl === intent.template || tpl === intent.darwin ? e.os : e);
diff --git a/src/variants.js b/src/variants.js
index cc734fd..9dc3b85 100644
--- a/src/variants.js
+++ b/src/variants.js
@@ -77,12 +77,12 @@ export const VARIANTS = {
   grep_text: {
     busybox: 'find {path} -type f«-iname {glob}» -exec grep -Hn -- {pattern} {} +',
     pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -Pattern {pattern}`,
-    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /n /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
+    cmd: (s, q) => `pushd ${q(s.path ?? '.', { name: 'path' })} && (findstr /s /n /c:${q(s.pattern, { name: 'pattern' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} & popd)`,
   },
   grep_files_containing: {
     busybox: 'find {path} -type f«-iname {glob}» -exec grep -l -- {pattern} {} +',
     pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -List -Pattern {pattern} | Select-Object -ExpandProperty Path`,
-    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /m /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
+    cmd: (s, q) => `pushd ${q(s.path ?? '.', { name: 'path' })} && (findstr /s /m /c:${q(s.pattern, { name: 'pattern' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} & popd)`,
   },
   count_lines: {
     pwsh: '@(Get-Content -LiteralPath {file}).Count',
@@ -94,7 +94,7 @@ export const VARIANTS = {
   },
   count_files: {
     pwsh: `(${PS_FILES}«| Where-Object Name -Like {glob}» | Measure-Object).Count`,
-    cmd: (s, q) => `where /r ${q(s.path ?? '.')} ${s.glob ? q(s.glob) : '*'} | find /c /v ""`,
+    cmd: (s, q) => `where /r ${q(s.path ?? '.', { name: 'path' })} ${s.glob ? q(s.glob, { name: 'glob' }) : '*'} | find /c /v ""`,
   },
   count_words: {
     pwsh: '(Get-Content -LiteralPath {file} -Raw | Measure-Object -Word).Words',
@@ -191,12 +191,12 @@ export const VARIANTS = {
     cmd: 'tar -a -c -f {archive} {path}', // bsdtar picks zip format from the .zip suffix
   },
   extract_zip: {
-    pwsh: (s, q) => `Expand-Archive -LiteralPath ${q(s.file)} -DestinationPath ${s.dest ? q(s.dest) : '.'}`,
+    pwsh: (s, q) => `Expand-Archive -LiteralPath ${q(s.file, { name: 'file' })} -DestinationPath ${s.dest ? q(s.dest, { name: 'dest' }) : '.'}`,
     cmd: '«mkdir {dest} 2>nul & »tar -xf {file}«-C {dest}»',
   },
   list_archive: {
     // bsdtar on Windows lists zip archives too; GNU tar on Linux does not.
-    pwsh: (s, q, ctx) => (!isWin(ctx) && /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file)}` : `tar -tvf ${q(s.file)}`),
+    pwsh: (s, q, ctx) => (!isWin(ctx) && /\.zip$/i.test(s.file || '') ? `unzip -l ${q(s.file, { name: 'file' })}` : `tar -tvf ${q(s.file, { name: 'file' })}`),
     cmd: 'tar -tvf {file}',
   },
   chmod: {
@@ -240,7 +240,7 @@ export const VARIANTS = {
     pwsh: 'if (-not (Test-Path -LiteralPath {path} -PathType Container)) { New-Item -ItemType Directory -Path {path} }',
     // mkdir -p: an existing directory is not an error (cmd's mkdir already creates parents); a trailing \ makes
     // `if exist` test for a directory, so an existing file of that name still fails like mkdir -p does
-    cmd: (s, q) => { const p = q(s.path); const dir = /"$/.test(p) ? p.slice(0, -1) + '\\"' : p + '\\'; return `if not exist ${dir} mkdir ${p}`; },
+    cmd: (s, q) => { const p = q(s.path, { name: 'path' }); const dir = /"$/.test(p) ? p.slice(0, -1) + '\\"' : p + '\\'; return `if not exist ${dir} mkdir ${p}`; },
   },
   touch_file: {
     pwsh: 'if (Test-Path -LiteralPath {file}) { (Get-Item -LiteralPath {file}).LastWriteTime = Get-Date } else { New-Item -ItemType File -Path {file} }',
@@ -285,14 +285,14 @@ export const VARIANTS = {
   },
   base64_encode: {
     pwsh: (s, q) => (s.file
-      ? `[Convert]::ToBase64String([System.IO.File]::ReadAllBytes((Resolve-Path -LiteralPath ${q(s.file)}).ProviderPath))`
-      : `[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(${q(s.text ?? '<TEXT>')}))`),
+      ? `[Convert]::ToBase64String([System.IO.File]::ReadAllBytes((Resolve-Path -LiteralPath ${q(s.file, { name: 'file' })}).ProviderPath))`
+      : `[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes(${q(s.text ?? '<TEXT>', { name: 'text' })}))`),
     gaps: { cmd: 'certutil -encode writes to a file with PEM headers, not to stdout' },
   },
   base64_decode: {
     pwsh: (s, q) => (s.file
-      ? `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String((Get-Content -LiteralPath ${q(s.file)} -Raw)))`
-      : `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(${q(s.text ?? '<TEXT>')}))`),
+      ? `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String((Get-Content -LiteralPath ${q(s.file, { name: 'file' })} -Raw)))`
+      : `[System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(${q(s.text ?? '<TEXT>', { name: 'text' })}))`),
     gaps: { cmd: 'certutil -decode writes to a file, not to stdout' },
   },
 
@@ -313,11 +313,11 @@ export const VARIANTS = {
   },
   kill_by_name: {
     pwsh: { win: `${PS_PROC_MATCH} | Stop-Process`, unix: 'pkill -f {name}' },
-    cmd: (s, q) => `taskkill /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`)}`,
+    cmd: (s, q) => `taskkill /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`, { name: 'name' })}`,
   },
   kill_force: {
     pwsh: { win: `${PS_PROC_MATCH} | Stop-Process -Force`, unix: 'pkill -9 -f {name}' },
-    cmd: (s, q) => `taskkill /f /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`)}`,
+    cmd: (s, q) => `taskkill /f /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`, { name: 'name' })}`,
   },
   kill_by_pid: {
     // `kill` is an alias of Stop-Process (SIGKILL on Unix) in PowerShell; call the real binary for SIGTERM.
diff --git a/test/matrix.test.js b/test/matrix.test.js
index ac57b41..78fa3ca 100644
--- a/test/matrix.test.js
+++ b/test/matrix.test.js
@@ -210,3 +210,16 @@ test('cmd: a non-path value ending in \\ is a gap, never silently rewritten', as
   const r = b('git_commit', { shell: 'cmd', os: 'win32' }, { message: 'Document C:\\' });
   assert.ok(r.gap || !/C:\\\./.test(r.command), r.command);
 });
+
+test('cmd: pattern equal to a path slot still gaps (no value-equality tilde inference)', () => {
+  const CMD = { shell: 'cmd', os: 'win32' };
+  const p = 'C:\\Program Files\\';
+  for (const id of ['grep_text', 'grep_files_containing']) {
+    const same = b(id, CMD, { path: p, pattern: p });
+    assert.ok(same.gap, `${id}: expected gap, got ${same.command}`);
+    assert.doesNotMatch(String(same.command || ''), /Program Files\\\./, id);
+    const pathOnly = b(id, CMD, { path: p, pattern: 'x' });
+    assert.match(pathOnly.command, /pushd "C:\\Program Files\\."/, id);
+    assert.match(pathOnly.command, /\/c:x/, id);
+  }
+});
review/031-r8-fix-needed.md:3:**Finding (Codex P2):** Function-template `q` inferred path-ness by value equality against PATH_SLOTS values (`fill.js` pathVals). When `pattern === path` (e.g. both `C:\Program Files\`), the pattern was rewritten to `\. ` instead of gapping.
review/031-r8-fix-needed.md:6:- `fill.js`: `q(s, o)` takes explicit `{ name }` / `{ tilde }`; no value-equality heuristic.
review/031-r8-fix-needed.md:7:- `variants.js` + `catalog.js`: every function-template `q(...)` call passes `{ name: '<slot>' }`.
review/031-r8-claude.md:5:- **Which values count as paths.** Only path slots get the `\.` rewrite. In `fill.js:879`, plain string templates pass `tilde: PATH_SLOTS.has(name)`. In `fill.js:1001-1004`, function templates decide by matching the value against the path-slot values. Every other value ending in `\`, if it needs quoting, now throws `UnquotableError`. That error reaches the catch at `fill.js:1013` and is reported as a gap. So `git commit -m "Document C:\"` and findstr patterns like `/c:"foo bar\"` are now gaps for cmd. That's correct: findstr also treats `\"` as a literal quote.
review/031-r8-claude.md:6:- **Values glued to a switch.** The `cmdQuote(..., { tilde: false, attached: true })` call at `render.js:128` runs outside the `SwitchValueError` try. A trailing-`\` value there still ends up as a gap and doesn't crash.
review/031-r8-claude.md:18:VERDICT: APPROVE

exec
/bin/bash -lc 'node --version && node --test test/regressions3-render.test.js test/templates.test.js test/shells.test.js' in /workspace/tellsh
 exited 1 in 4343ms:
v20.19.2
TAP version 13
# Subtest: /workspace/tellsh/test/regressions3-render.test.js
ok 1 - /workspace/tellsh/test/regressions3-render.test.js
  ---
  duration_ms: 379.666194
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 2 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 4298.182672
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
# Subtest: /workspace/tellsh/test/templates.test.js
not ok 3 - /workspace/tellsh/test/templates.test.js
  ---
  duration_ms: 317.584682
  location: '/workspace/tellsh/test/templates.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..3
# tests 3
# suites 0
# pass 1
# fail 2
# cancelled 0
# skipped 0
# todo 0
# duration_ms 4309.46168

exec
/bin/bash -lc "node --input-type=module <<'NODE'
import assert from 'node:assert/strict';
import { buildCommand } from './src/fill.js';
const cmd = { shell: 'cmd', os: 'win32', coreutils: 'gnu' };
const b = (id, resolved, env = cmd) => buildCommand(id, '', { env, resolved });
let checked = 0;
const p = 'C:\\\\Program Files\\\\';
for (const id of ['grep_text', 'grep_files_containing']) {
  assert.ok(b(id, {path:p, pattern:p}).gap); checked++;
  assert.ok(b(id, {path:p, pattern:'foo bar\\\\'}).gap); checked++;
  assert.ok(b(id, {path:p, pattern:'/api\\\\'}).gap); checked++;
  assert.match(b(id, {path:p, pattern:'x'}).command, /pushd \"C:\\\\Program Files\\\\\\.\"/); checked++;
  assert.match(b(id, {path:p, pattern:'/api'}).command, /\\/c:\"\\/api\"/); checked++;
  assert.ok(b(id, {path:'/api', pattern:'/api'}).gap); checked++;
  assert.ok(b(id, {path:p, pattern:'x', glob:'/api'}).gap); checked++;
  const tilde = b(id, {path:'~/src', pattern:'~/src'});
  assert.match(tilde.command, /pushd \"%USERPROFILE%\\\\src\"/);
  assert.match(tilde.command, /\\/c:\"~\\/src\"/); checked++;
  assert.ok(b(id, {path:p, pattern:'x', glob:p}).gap); checked++;
}
assert.match(b('count_files', {path:p}).command, /where \\/r \"C:\\\\Program Files\\\\\\.\"/); checked++;
assert.ok(b('count_files', {path:p, glob:p}).gap); checked++;
assert.equal(b('mkdir', {path:'~/new/'}).command, 'if not exist \"%USERPROFILE%\\\\new\\\\.\\\\\" mkdir \"%USERPROFILE%\\\\new\\\\.\"'); checked++;
for (const shell of ['bash', 'fish', 'powershell']) {
  const env = {shell, os:'linux', coreutils:'gnu'};
  assert.match(b('base64_encode', {text:'~/foo', path:'~/foo'}, env).command, /'~\\/foo'/); checked++;
  assert.ok(b('base64_encode', {file:'-foo'}, env).command.includes('./-foo')); checked++;
  assert.ok(b('list_archive', {file:'~/foo.zip'}, env).command.includes(shell === 'powershell' ? '"'$HOME/foo.zip'"' : '~/foo.zip')); checked++;
}
for (const os of ['linux','win32']) {
  const env = {shell:'powershell', os, coreutils:'gnu'};
  for (const file of ['bad\".zip', 'C:\\\\Program Files\\\\']) {
    assert.ok(b('list_archive', {file}, env).gap); checked++;
  }
  assert.ok(b('list_archive', {file:'normal.zip'}, env).command); checked++;
  assert.equal(b('base64_encode', {text:'~/foo', path:'~/foo'}, env).command, \"[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes('~/foo'))\"); checked++;
}
console.log("'`${checked} focused assertions passed`);
NODE' in /workspace/tellsh
 succeeded in 43ms:
38 focused assertions passed

exec
/bin/bash -lc "node --test --test-name-pattern='cmd:|function templates:|tilde expansion|PowerShell:' --test-isolation=none test/matrix.test.js test/regressions2.test.js" in /workspace/tellsh
 exited 9 in 0ms:
node: bad option: --test-isolation=none

exec
/bin/bash -lc 'node test/shells.test.js' in /workspace/tellsh
exec
/bin/bash -lc 'node test/regressions3-render.test.js' in /workspace/tellsh
exec
/bin/bash -lc 'node test/templates.test.js' in /workspace/tellsh
 exited 1 in 164ms:
TAP version 13
# Subtest: shQuote round-trips nasty strings through bash
not ok 1 - shQuote round-trips nasty strings through bash
  ---
  duration_ms: 7.163679
  location: '/workspace/tellsh/test/templates.test.js:10:1'
  failureType: 'testCodeFailure'
  error: 'spawnSync bash EPERM'
  code: 'EPERM'
  stack: |-
    Object.spawnSync (node:internal/child_process:1123:20)
    spawnSync (node:child_process:877:24)
    execFileSync (node:child_process:920:15)
    roundTrip (file:///workspace/tellsh/test/templates.test.js:8:26)
    TestContext.<anonymous> (file:///workspace/tellsh/test/templates.test.js:12:18)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    node:internal/test_runner/harness:255:12
    node:internal/process/task_queues:140:7
  ...
# Subtest: shQuote keeps simple words bare and tilde expandable
ok 2 - shQuote keeps simple words bare and tilde expandable
  ---
  duration_ms: 0.402965
  ...
# Subtest: raw slots are validated, never injected
ok 3 - raw slots are validated, never injected
  ---
  duration_ms: 1.554155
  ...
# Subtest: optional segments are dropped when slot missing
ok 4 - optional segments are dropped when slot missing
  ---
  duration_ms: 0.35176
  ...
# Subtest: non-slot braces are left alone
ok 5 - non-slot braces are left alone
  ---
  duration_ms: 0.349185
  ...
# Subtest: every intent renders on linux and darwin without throwing, with valid risk
ok 6 - every intent renders on linux and darwin without throwing, with valid risk
  ---
  duration_ms: 113.994941
  ...
# Subtest: darwin variants differ where commands differ
ok 7 - darwin variants differ where commands differ
  ---
  duration_ms: 1.759868
  ...
# Subtest: injection attempt in a filename stays a single quoted argument
ok 8 - injection attempt in a filename stays a single quoted argument
  ---
  duration_ms: 0.495176
  ...
1..8
# tests 8
# suites 0
# pass 7
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 145.426533

 succeeded in 251ms:
TAP version 13
# Subtest: pwshNativeSlots finds every slot of a native command
ok 1 - pwshNativeSlots finds every slot of a native command
  ---
  duration_ms: 2.563118
  ...
# Subtest: PowerShell: a later native slot with " is refused (tar -C, tar path)
ok 2 - PowerShell: a later native slot with " is refused (tar -C, tar path)
  ---
  duration_ms: 42.090936
  ...
# Subtest: wrapper commands are looked through (timeout, chroot, stdbuf, env, nice, xargs, ...)
ok 3 - wrapper commands are looked through (timeout, chroot, stdbuf, env, nice, xargs, ...)
  ---
  duration_ms: 12.330842
  ...
# Subtest: paths like /. // /./ /etc/.. are normalised to /
ok 4 - paths like /. // /./ /etc/.. are normalised to /
  ---
  duration_ms: 1.90208
  ...
# Subtest: recursive delete of system directories and key home directories is consistently critical
ok 5 - recursive delete of system directories and key home directories is consistently critical
  ---
  duration_ms: 1.779855
  ...
# Subtest: mv of a system or home directory is critical; ordinary moves stay safe
ok 6 - mv of a system or home directory is critical; ordinary moves stay safe
  ---
  duration_ms: 1.370704
  ...
# Subtest: docker -v=/:/h and --mount=…source=/ mount the host root
ok 7 - docker -v=/:/h and --mount=…source=/ mount the host root
  ---
  duration_ms: 1.570689
  ...
# Subtest: composer: grep patterns are quoted literally and never reused as a search path
ok 8 - composer: grep patterns are quoted literally and never reused as a search path
  ---
  duration_ms: 47.118611
  ...
# Subtest: composer: git log --author always gets a value (or is not emitted)
ok 9 - composer: git log --author always gets a value (or is not emitted)
  ---
  duration_ms: 14.688412
  ...
# Subtest: composer validation rejects command substitution and expansions
ok 10 - composer validation rejects command substitution and expansions
  ---
  duration_ms: 7.911992
  ...
# Subtest: cmd: a value starting with / is fine when glued to a switch (findstr /c:), refused standalone
ok 11 - cmd: a value starting with / is fine when glued to a switch (findstr /c:), refused standalone
  ---
  duration_ms: 3.908495
  ...
# Subtest: cmd: an embedded / is never left unquoted (foo/q is not read as foo /q)
ok 12 - cmd: an embedded / is never left unquoted (foo/q is not read as foo /q)
  ---
  duration_ms: 1.754495
  ...
1..12
# tests 12
# suites 0
# pass 12
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 170.882923

 exited 1 in 4082ms:
TAP version 13
# Subtest: bash/linux: every intent renders and passes bash -n
ok 1 - bash/linux: every intent renders and passes bash -n
  ---
  duration_ms: 585.944019
  ...
# Subtest: zsh/darwin BSD: every intent renders and passes bash -n
ok 2 - zsh/darwin BSD: every intent renders and passes bash -n
  ---
  duration_ms: 534.7458
  ...
# Subtest: zsh/darwin GNU: every intent renders and passes bash -n
ok 3 - zsh/darwin GNU: every intent renders and passes bash -n
  ---
  duration_ms: 525.783514
  ...
# Subtest: sh/linux (dash): every intent renders and passes sh -n
ok 4 - sh/linux (dash): every intent renders and passes sh -n
  ---
  duration_ms: 450.220468
  ...
# Subtest: sh/busybox: every intent renders and passes busybox -n
ok 5 - sh/busybox: every intent renders and passes busybox -n
  ---
  duration_ms: 472.183876
  ...
# Subtest: fish: every intent renders (fish -n when installed)
ok 6 - fish: every intent renders (fish -n when installed)
  ---
  duration_ms: 453.959025
  ...
# fish not installed: syntax check skipped
# Subtest: PowerShell/win32: every intent renders or reports a gap (parser check when pwsh is installed)
ok 7 - PowerShell/win32: every intent renders or reports a gap (parser check when pwsh is installed)
  ---
  duration_ms: 448.949863
  ...
# pwsh not installed: parser check skipped (3 gaps)
# Subtest: PowerShell/linux: every intent renders or reports a gap (parser check when pwsh is installed)
ok 8 - PowerShell/linux: every intent renders or reports a gap (parser check when pwsh is installed)
  ---
  duration_ms: 460.73402
  ...
# pwsh not installed: parser check skipped (0 gaps)
# Subtest: cmd: best-effort coverage is reported, gaps carry a reason
ok 9 - cmd: best-effort coverage is reported, gaps carry a reason
  ---
  duration_ms: 20.154235
  ...
# Subtest: quoting round-trips through bash and sh
not ok 10 - quoting round-trips through bash and sh
  ---
  duration_ms: 4.91356
  location: '/workspace/tellsh/test/shells.test.js:110:1'
  failureType: 'testCodeFailure'
  error: 'spawnSync bash EPERM'
  code: 'EPERM'
  stack: |-
    Object.spawnSync (node:internal/child_process:1123:20)
    spawnSync (node:child_process:877:24)
    execFileSync (node:child_process:920:15)
    TestContext.<anonymous> (file:///workspace/tellsh/test/shells.test.js:112:51)
    Test.runInAsyncScope (node:async_hooks:206:9)
    Test.run (node:internal/test_runner/test:796:25)
    Test.processPendingSubtests (node:internal/test_runner/test:526:18)
    Test.postRun (node:internal/test_runner/test:889:19)
    Test.run (node:internal/test_runner/test:835:12)
    async Test.processPendingSubtests (node:internal/test_runner/test:526:7)
  ...
# Subtest: fish / PowerShell / cmd quoting rules
ok 11 - fish / PowerShell / cmd quoting rules
  ---
  duration_ms: 0.828076
  ...
# Subtest: per-shell variants: intent shared, rendering differs
ok 12 - per-shell variants: intent shared, rendering differs
  ---
  duration_ms: 12.825973
  ...
1..12
# tests 12
# suites 0
# pass 11
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 4011.30171

exec
/bin/bash -lc "node --test-name-pattern='function templates:|tilde expansion|PowerShell: values|cmd: values' test/regressions2.test.js" in /workspace/tellsh
exec
/bin/bash -lc "node --test-name-pattern='every intent renders on linux|darwin variants|shQuote keeps|raw slots|optional segments|non-slot braces|injection attempt' test/templates.test.js" in /workspace/tellsh
exec
/bin/bash -lc "node --test-name-pattern='cmd:|PowerShell expressions|Windows PowerShell' test/matrix.test.js" in /workspace/tellsh
 succeeded in 99ms:
TAP version 13
# Subtest: matrix: every template renders without static issues on every platform
ok 1 - matrix: every template renders without static issues on every platform # SKIP test name does not match pattern
  ---
  duration_ms: 1.301801
  ...
# Subtest: PowerShell expressions starting with $ are not commands; & $var still is
ok 2 - PowerShell expressions starting with $ are not commands; & $var still is
  ---
  duration_ms: 22.259373
  ...
# Subtest: New-Item: without -Force it never overwrites; -Force (any -ItemType, registry keys too) or -Value is a write
ok 3 - New-Item: without -Force it never overwrites; -Force (any -ItemType, registry keys too) or -Value is a write # SKIP test name does not match pattern
  ---
  duration_ms: 0.117215
  ...
# Subtest: cmd: type nul >> (touch) and 2>nul are not writes; other redirects are; nul is a plain file outside Windows shells
ok 4 - cmd: type nul >> (touch) and 2>nul are not writes; other redirects are; nul is a plain file outside Windows shells
  ---
  duration_ms: 1.61121
  ...
# Subtest: extract to a directory creates it first (tar -C needs an existing dir), no leading space
ok 5 - extract to a directory creates it first (tar -C needs an existing dir), no leading space # SKIP test name does not match pattern
  ---
  duration_ms: 0.117686
  ...
# Subtest: cmd: mkdir -p semantics, dotfiles in hidden_files, no admin-only disk_free
ok 6 - cmd: mkdir -p semantics, dotfiles in hidden_files, no admin-only disk_free
  ---
  duration_ms: 2.335989
  ...
# Subtest: Windows PowerShell: zip via bsdtar, duplicate hashing skips unreadable files
ok 7 - Windows PowerShell: zip via bsdtar, duplicate hashing skips unreadable files
  ---
  duration_ms: 1.980686
  ...
# Subtest: timezone falls back to /etc/localtime and date (Alpine has no timedatectl or /etc/timezone)
ok 8 - timezone falls back to /etc/localtime and date (Alpine has no timedatectl or /etc/timezone) # SKIP test name does not match pattern
  ---
  duration_ms: 0.11025
  ...
# Subtest: busybox and macOS GNU variants are on the allowlist
ok 9 - busybox and macOS GNU variants are on the allowlist # SKIP test name does not match pattern
  ---
  duration_ms: 0.268474
  ...
# Subtest: broken_symlinks (Windows PowerShell 5.1): no Split-Path -LiteralPath -Parent (parameter set error)
ok 10 - broken_symlinks (Windows PowerShell 5.1): no Split-Path -LiteralPath -Parent (parameter set error)
  ---
  duration_ms: 1.027783
  ...
# Subtest: g-prefixed names are trusted only where the macOS GNU templates render them; fuser -k kills
ok 11 - g-prefixed names are trusted only where the macOS GNU templates render them; fuser -k kills # SKIP test name does not match pattern
  ---
  duration_ms: 0.127363
  ...
# Subtest: matrix run: a hostile environment (GIT_DIR, BASH_ENV) cannot reach outside the fixture
ok 12 - matrix run: a hostile environment (GIT_DIR, BASH_ENV) cannot reach outside the fixture # SKIP test name does not match pattern
  ---
  duration_ms: 0.092558
  ...
# Subtest: New-Item: -Target alias and pipeline input are content writes
ok 13 - New-Item: -Target alias and pipeline input are content writes # SKIP test name does not match pattern
  ---
  duration_ms: 0.192322
  ...
# Subtest: cmd: type nul >> a & a real redirect stays a write
ok 14 - cmd: type nul >> a & a real redirect stays a write
  ---
  duration_ms: 0.579693
  ...
# Subtest: matrix report: without --before every results file is kept
ok 15 - matrix report: without --before every results file is kept # SKIP test name does not match pattern
  ---
  duration_ms: 0.121875
  ...
# Subtest: cmd: ~ paths become a double-quoted %USERPROFILE% (a user name may contain a space)
ok 16 - cmd: ~ paths become a double-quoted %USERPROFILE% (a user name may contain a space)
  ---
  duration_ms: 2.875635
  ...
# Subtest: cmd: a quoted path ending in \\ ends in \\. instead (MSVC argv would read \\" as a literal quote)
ok 17 - cmd: a quoted path ending in \\ ends in \\. instead (MSVC argv would read \\" as a literal quote)
  ---
  duration_ms: 2.504182
  ...
# Subtest: cmd: a non-path value ending in \\ is a gap, never silently rewritten
ok 18 - cmd: a non-path value ending in \\ is a gap, never silently rewritten
  ---
  duration_ms: 1.121542
  ...
# Subtest: cmd: pattern equal to a path slot still gaps (no value-equality tilde inference)
ok 19 - cmd: pattern equal to a path slot still gaps (no value-equality tilde inference)
  ---
  duration_ms: 1.365374
  ...
1..19
# tests 19
# suites 0
# pass 10
# fail 0
# cancelled 0
# skipped 9
# todo 0
# duration_ms 61.91123

 succeeded in 149ms:
TAP version 13
# Subtest: paths with ( , ; : keep every character (no parent directory is deleted)
ok 1 - paths with ( , ; : keep every character (no parent directory is deleted) # SKIP test name does not match pattern
  ---
  duration_ms: 1.429455
  ...
# Subtest: trailing dots are not stripped from a path (only one sentence dot after an extension)
ok 2 - trailing dots are not stripped from a path (only one sentence dot after an extension) # SKIP test name does not match pattern
  ---
  duration_ms: 0.134326
  ...
# Subtest: tagger span normalisation never accepts a shorter path than the span
ok 3 - tagger span normalisation never accepts a shorter path than the span # SKIP test name does not match pattern
  ---
  duration_ms: 0.08331
  ...
# Subtest: whole-disk phrases map to / (C:\\ on Windows shells)
ok 4 - whole-disk phrases map to / (C:\\ on Windows shells) # SKIP test name does not match pattern
  ---
  duration_ms: 0.077664
  ...
# Subtest: deleting on the whole disk is flagged critical
ok 5 - deleting on the whole disk is flagged critical # SKIP test name does not match pattern
  ---
  duration_ms: 0.198725
  ...
# Subtest: danger: busybox, rsync --delete, /dev/null copies, root bind mounts, chmod -R ~, tar -C /
ok 6 - danger: busybox, rsync --delete, /dev/null copies, root bind mounts, chmod -R ~, tar -C / # SKIP test name does not match pattern
  ---
  duration_ms: 0.09543
  ...
# Subtest: danger: PowerShell typographic quotes do not hide a drive root
ok 7 - danger: PowerShell typographic quotes do not hide a drive root # SKIP test name does not match pattern
  ---
  duration_ms: 0.098997
  ...
# Subtest: history: a mv/cp destination directory is not "it"
ok 8 - history: a mv/cp destination directory is not "it" # SKIP test name does not match pattern
  ---
  duration_ms: 0.153054
  ...
# Subtest: history: a requested type that is not in history is refused, and "gallery" is not a branch
ok 9 - history: a requested type that is not in history is refused, and "gallery" is not a branch # SKIP test name does not match pattern
  ---
  duration_ms: 0.362179
  ...
# Subtest: history: parsers pick the right word (kill -s, grep -v grep, pkill -u, checkout --)
ok 10 - history: parsers pick the right word (kill -s, grep -v grep, pkill -u, checkout --) # SKIP test name does not match pattern
  ---
  duration_ms: 0.404965
  ...
# Subtest: history: later segments of a compound line win; redirect targets count
ok 11 - history: later segments of a compound line win; redirect targets count # SKIP test name does not match pattern
  ---
  duration_ms: 0.195508
  ...
# Subtest: history: no implicit fill of destructive commands, no fallback past an ambiguous value
ok 12 - history: no implicit fill of destructive commands, no fallback past an ambiguous value # SKIP test name does not match pattern
  ---
  duration_ms: 0.092334
  ...
# Subtest: history: any history-derived slot marks the result as history (never --yes)
ok 13 - history: any history-derived slot marks the result as history (never --yes) # SKIP test name does not match pattern
  ---
  duration_ms: 0.085424
  ...
# Subtest: history: relative paths from before a cd are not reused
ok 14 - history: relative paths from before a cd are not reused # SKIP test name does not match pattern
  ---
  duration_ms: 0.157625
  ...
# Subtest: history: the running tellsh call is not the previous command
ok 15 - history: the running tellsh call is not the previous command # SKIP test name does not match pattern
  ---
  duration_ms: 0.074088
  ...
# Subtest: history: "same for" does not take pronouns or filler words as values
ok 16 - history: "same for" does not take pronouns or filler words as values # SKIP test name does not match pattern
  ---
  duration_ms: 0.199899
  ...
# Subtest: composer is never offered to fish (its single quotes treat \\ as an escape)
ok 17 - composer is never offered to fish (its single quotes treat \\ as an escape) # SKIP test name does not match pattern
  ---
  duration_ms: 0.177405
  ...
# Subtest: PowerShell: values with " are refused for native programs, not for cmdlets
ok 18 - PowerShell: values with " are refused for native programs, not for cmdlets
  ---
  duration_ms: 17.726811
  ...
# Subtest: cmd: values starting with / are refused (switches); /s /c gets wrapping quotes
ok 19 - cmd: values starting with / are refused (switches); /s /c gets wrapping quotes
  ---
  duration_ms: 34.326913
  ...
# Subtest: function templates: only path values get ./, other values starting with - become placeholders
ok 20 - function templates: only path values get ./, other values starting with - become placeholders
  ---
  duration_ms: 2.884233
  ...
# Subtest: tilde expansion only for path slots
ok 21 - tilde expansion only for path slots
  ---
  duration_ms: 1.844687
  ...
# Subtest: "kill process named -9" is not kill 9; sed old text with a newline is escaped/refused
ok 22 - "kill process named -9" is not kill 9; sed old text with a newline is escaped/refused # SKIP test name does not match pattern
  ---
  duration_ms: 0.087762
  ...
# Subtest: --threshold must be a number in [0, 1]
ok 23 - --threshold must be a number in [0, 1] # SKIP test name does not match pattern
  ---
  duration_ms: 0.054395
  ...
# Subtest: shellwords: &> is a redirection, $(...) and backticks are one ambiguous word
ok 24 - shellwords: &> is a redirection, $(...) and backticks are one ambiguous word # SKIP test name does not match pattern
  ---
  duration_ms: 0.046413
  ...
# Subtest: history parsing does not backtrack exponentially on long \\ or quote runs
ok 25 - history parsing does not backtrack exponentially on long \\ or quote runs # SKIP test name does not match pattern
  ---
  duration_ms: 0.044346
  ...
# Subtest: model.bin is validated: truncated or corrupt files give a clear error
ok 26 - model.bin is validated: truncated or corrupt files give a clear error # SKIP test name does not match pattern
  ---
  duration_ms: 0.040958
  ...
# Subtest: tagger features are deduplicated per token like training (set of indices)
ok 27 - tagger features are deduplicated per token like training (set of indices) # SKIP test name does not match pattern
  ---
  duration_ms: 0.04163
  ...
1..27
# tests 27
# suites 0
# pass 4
# fail 0
# cancelled 0
# skipped 23
# todo 0
# duration_ms 86.203187

 succeeded in 171ms:
TAP version 13
# Subtest: shQuote round-trips nasty strings through bash
ok 1 - shQuote round-trips nasty strings through bash # SKIP test name does not match pattern
  ---
  duration_ms: 1.238323
  ...
# Subtest: shQuote keeps simple words bare and tilde expandable
ok 2 - shQuote keeps simple words bare and tilde expandable
  ---
  duration_ms: 0.396019
  ...
# Subtest: raw slots are validated, never injected
ok 3 - raw slots are validated, never injected
  ---
  duration_ms: 1.442521
  ...
# Subtest: optional segments are dropped when slot missing
ok 4 - optional segments are dropped when slot missing
  ---
  duration_ms: 0.367579
  ...
# Subtest: non-slot braces are left alone
ok 5 - non-slot braces are left alone
  ---
  duration_ms: 0.359618
  ...
# Subtest: every intent renders on linux and darwin without throwing, with valid risk
ok 6 - every intent renders on linux and darwin without throwing, with valid risk
  ---
  duration_ms: 104.387226
  ...
# Subtest: darwin variants differ where commands differ
ok 7 - darwin variants differ where commands differ
  ---
  duration_ms: 1.702995
  ...
# Subtest: injection attempt in a filename stays a single quoted argument
ok 8 - injection attempt in a filename stays a single quoted argument
  ---
  duration_ms: 0.507799
  ...
1..8
# tests 8
# suites 0
# pass 7
# fail 0
# cancelled 0
# skipped 1
# todo 0
# duration_ms 126.526301

codex
No actionable findings. All affected function-template `q()` calls pass the correct slot name. Equal path/pattern values now gap correctly; path-only rewriting, attached `/c:` handling, and PowerShell option forwarding remain intact.

Relevant regression tests and 38 focused assertions passed. Shell round-trip tests were blocked by sandbox `EPERM`; native Windows execution was unavailable.

VERDICT: APPROVE
tokens used
68,253
No actionable findings. All affected function-template `q()` calls pass the correct slot name. Equal path/pattern values now gap correctly; path-only rewriting, attached `/c:` handling, and PowerShell option forwarding remain intact.

Relevant regression tests and 38 focused assertions passed. Shell round-trip tests were blocked by sandbox `EPERM`; native Windows execution was unavailable.

VERDICT: APPROVE
