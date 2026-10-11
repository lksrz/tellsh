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
session id: 01a12c5c-1d58-7e51-a888-628b4e105382
--------
user
Round 4 review of the tellsh cmd quoting fix. Round-3 finding (both reviewers): the trailing \ -> \. rewrite also hit non-path values (git commit -m "Document C:\." , findstr patterns). Now the rewrite applies only to path slots (tilde:true, set by fill.js only for PATH_SLOTS); a quoted non-path value ending in \ throws UnquotableError, so the intent is reported as a gap for cmd (no correct spelling exists: built-ins and MSVC programs disagree). Unquoted values are unchanged. CMD_CRIT_TARGET also accepts C:\. and \. Look for real bugs only. End with exactly one line: VERDICT: APPROVE or VERDICT: REQUEST_CHANGES.

DIFF (since v0.3.1 matrix commit):
diff --git a/src/danger.js b/src/danger.js
index 9bad233..7530e7d 100644
--- a/src/danger.js
+++ b/src/danger.js
@@ -422,7 +422,7 @@ function removeItemCheck(words, hit) {
   if (recurse && targets.some((t) => PS_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive Remove-Item on a drive root, home or *', true);
 }
 
-const CMD_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*\*?(?:\.\*)?|[\\/]+\*?|\*(?:\.\*)?|%(?:USERPROFILE|HOMEDRIVE|HOMEPATH|SystemDrive|SystemRoot|windir)%[\\/]*\*?(?:\.\*)?)$/i;
+const CMD_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*(?:\.|\*?(?:\.\*)?)|[\\/]+(?:\.|\*?)|\*(?:\.\*)?|%(?:USERPROFILE|HOMEDRIVE|HOMEPATH|SystemDrive|SystemRoot|windir)%[\\/]*(?:\.|\*?(?:\.\*)?)|[A-Za-z]:[\\/]+(?:Windows|Users|Program Files(?: \(x86\))?|ProgramData)[\\/]*(?:\.|\*?(?:\.\*)?))$/i;
 
 // cmd.exe rd/rmdir/del/erase (also reached from PowerShell aliases with cmd-style switches)
 function cmdDelCheck(words, hit) {
diff --git a/src/render.js b/src/render.js
index 6f5ef6f..9a459b5 100644
--- a/src/render.js
+++ b/src/render.js
@@ -76,7 +76,16 @@ export function cmdQuote(value, { tilde: expand = true, attached = false } = {})
   // Windows paths: / -> \ (an unquoted foo/q could be read as foo /q by built-ins); other values that
   // contain / are double-quoted
   if (expand || /^[A-Za-z]:|%USERPROFILE%/.test(s)) s = s.replace(/\//g, '\\');
-  if (/^[A-Za-z0-9_\\.:@+=%-]+$/.test(s)) return s;
+  // an expanded %VAR% may contain spaces (C:\Users\John Smith): always double-quote it
+  if (!s.includes('%') && /^[A-Za-z0-9_\\.:@+=-]+$/.test(s)) return s;
+  // a closing quote after a backslash ("x\\") is an escaped quote for MSVC-parsed programs (where, tar, git) and
+  // bsdtar rejects a doubled one; dropping it would let copy/move create a file. "x\\." keeps the directory meaning
+  // for built-ins and native programs alike (checked on Windows: copy, if exist, where /r, dir, tar, forfiles, rmdir)
+  if (/\\$/.test(s)) {
+    // only a path may change form; a message or pattern ending in \ has no safe cmd.exe spelling (reported as a gap)
+    if (!expand) throw new UnquotableError(`value ${JSON.stringify(String(value))} ends in \\ and cannot be quoted safely for cmd.exe`);
+    s = s.replace(/\\+$/, '\\.');
+  }
   return '"' + s + '"';
 }
 
diff --git a/test/matrix.test.js b/test/matrix.test.js
index 09df03a..ac57b41 100644
--- a/test/matrix.test.js
+++ b/test/matrix.test.js
@@ -82,7 +82,7 @@ test('cmd: mkdir -p semantics, dotfiles in hidden_files, no admin-only disk_free
   const h = b('hidden_files', CMD, { path: 'my docs' });
   assert.equal(h.command, 'pushd "my docs" && (dir /a:h /b 2>nul & dir /a /b .* & popd)');
   assert.equal(h.risk, 'safe');
-  assert.equal(b('hidden_files', CMD, { path: '~' }).command, 'pushd %USERPROFILE% && (dir /a:h /b 2>nul & dir /a /b .* & popd)');
+  assert.equal(b('hidden_files', CMD, { path: '~' }).command, 'pushd "%USERPROFILE%" && (dir /a:h /b 2>nul & dir /a /b .* & popd)');
   assert.equal(b('hidden_files', CMD, { path: '~/my docs' }).command, 'pushd "%USERPROFILE%\\my docs" && (dir /a:h /b 2>nul & dir /a /b .* & popd)');
   assert.ok(b('disk_free', CMD, {}).gap);
 });
@@ -171,3 +171,42 @@ test('matrix report: without --before every results file is kept', () => {
     assert.match(md, /linux/); assert.match(md, /darwin/);
   } finally { rmSync(dir, { recursive: true, force: true }); }
 });
+
+test('cmd: ~ paths become a double-quoted %USERPROFILE% (a user name may contain a space)', async () => {
+  const { cmdQuote, psQuote } = await import('../src/render.js');
+  assert.equal(cmdQuote('~'), '"%USERPROFILE%"');
+  assert.equal(cmdQuote('~/foo'), '"%USERPROFILE%\\foo"');
+  assert.equal(cmdQuote('~/my docs'), '"%USERPROFILE%\\my docs"');
+  assert.equal(psQuote('~/foo'), '"$HOME/foo"');
+  for (const [id, slots] of [['delete_dir', { path: '~/foo' }], ['mkdir', { path: '~/foo' }], ['hidden_files', { path: '~' }], ['list_files', { path: '~/foo' }]]) {
+    const r = b(id, { shell: 'cmd', os: 'win32' }, slots);
+    assert.match(r.gap ? '%USERPROFILE%' : r.command, /%USERPROFILE%/, id);
+    if (r.gap) continue;
+    assert.doesNotMatch(r.command, /(?<!")%USERPROFILE%/, `${id}: ${r.command}`);
+  }
+  assert.equal(checkDanger('rd /s /q "%USERPROFILE%"', 'high', { rendered: true, shell: 'cmd', os: 'win32' }).critical, true);
+});
+
+test('cmd: a quoted path ending in \\ ends in \\. instead (MSVC argv would read \\" as a literal quote)', async () => {
+  const { cmdQuote } = await import('../src/render.js');
+  assert.equal(cmdQuote('~/'), '"%USERPROFILE%\\."');
+  assert.equal(cmdQuote('~/Downloads/'), '"%USERPROFILE%\\Downloads\\."');
+  assert.equal(cmdQuote('my docs/'), '"my docs\\."');
+  // copy into a missing folder must fail, not create a file named after it
+  assert.equal(b('copy', { shell: 'cmd', os: 'win32' }, { src: 'report.txt', dst: 'new folder/' }).command, 'copy /-y report.txt "new folder\\."');
+  assert.equal(cmdQuote('docs/'), 'docs\\');
+  const CMD = { shell: 'cmd', os: 'win32' };
+  assert.equal(b('mkdir', CMD, { path: '~/new/' }).command, 'if not exist "%USERPROFILE%\\new\\.\\" mkdir "%USERPROFILE%\\new\\."');
+  assert.doesNotMatch(b('compress_targz', CMD, { path: '~/foo/', archive: 'out.tar.gz' }).command, /[^\\]\\"/);
+  for (const c of ['rd /s /q "%USERPROFILE%\\."', 'rd /s "%USERPROFILE%\\"', 'rd /s /q "%USERPROFILE%"', 'del /s /q "%USERPROFILE%\\*"', 'rd /s /q "C:\\Users"', 'rd /s /q C:\\Windows\\', 'rd /s /q "C:\\Program Files\\."', 'rd /s /q C:\\.', 'rd /s /q \\.'])
+    assert.equal(checkDanger(c, 'high', { rendered: true, shell: 'cmd', os: 'win32' }).critical, true, c);
+  assert.notEqual(checkDanger('rd /s /q "%USERPROFILE%\\foo"', 'high', { rendered: true, shell: 'cmd', os: 'win32' }).critical, true);
+});
+
+test('cmd: a non-path value ending in \\ is a gap, never silently rewritten', async () => {
+  const { cmdQuote, UnquotableError } = await import('../src/render.js');
+  assert.throws(() => cmdQuote('Document C:\\', { tilde: false }), UnquotableError);
+  assert.equal(cmdQuote('a\\', { tilde: false }), 'a\\');
+  const r = b('git_commit', { shell: 'cmd', os: 'win32' }, { message: 'Document C:\\' });
+  assert.ok(r.gap || !/C:\\\./.test(r.command), r.command);
+});
diff --git a/test/regressions.test.js b/test/regressions.test.js
index 3d68fd9..1d21d90 100644
--- a/test/regressions.test.js
+++ b/test/regressions.test.js
@@ -265,7 +265,7 @@ test('cmd.exe: values with % ! or " are refused instead of being expanded', () =
   const r = buildCommand('cat_file', '', { env: { shell: 'cmd', os: 'win32', coreutils: 'gnu' }, resolved: { file: '%USERNAME%.txt' } });
   assert.equal(r.command, null);
   assert.match(r.gap, /cmd\.exe/);
-  assert.equal(cmdQuote('~/Downloads'), '%USERPROFILE%\\Downloads');
+  assert.equal(cmdQuote('~/Downloads'), '"%USERPROFILE%\\Downloads"');
 });
 
 // ---------------------------------------------------------------------------------------------
diff --git a/test/shells.test.js b/test/shells.test.js
index dfd8144..7faf92c 100644
--- a/test/shells.test.js
+++ b/test/shells.test.js
@@ -124,7 +124,7 @@ test('fish / PowerShell / cmd quoting rules', () => {
   assert.throws(() => cmdQuote('a "b"'), /cmd.exe/);
   assert.throws(() => cmdQuote('%PATH%'), /cmd.exe/);
   assert.equal(cmdQuote('a b'), '"a b"');
-  assert.equal(cmdQuote('~/Downloads'), '%USERPROFILE%\\Downloads');
+  assert.equal(cmdQuote('~/Downloads'), '"%USERPROFILE%\\Downloads"');
 });
 
 test('per-shell variants: intent shared, rendering differs', () => {
codex
I’ll check the quoting and danger checks in context, focusing on concrete regressions.
exec
/bin/bash -lc 'git status --short && git diff -- src/render.js src/danger.js src/fill.js' in /workspace/tellsh
 succeeded in 0ms:
 M review/STATUS_031
?? review/031-r8-claude.md
?? review/031-r8-codex.md
?? review/031-r8-prompt.txt

exec
/bin/bash -lc "pwd && rg --files -g AGENTS.md -g package.json -g '*render*' -g '*fill*' -g '*danger*' -g '*matrix*' -g '*intent*' -g '*shell*'" in /workspace/tellsh
 succeeded in 0ms:
/workspace/tellsh
package.json
test/regressions3-render.test.js
test/shells.test.js
test/matrix.test.js
test/danger.test.js
data/blind/intents.jsonl
hybrid/package/tellsh-model-enc/package.json
src/shellwords.js
src/fill.js
src/render.js
src/danger.js
scripts/matrix.js

exec
/bin/bash -lc 'for p in /AGENTS.md /workspace/AGENTS.md /workspace/tellsh/AGENTS.md; do if [ -f "$p" ]; then cat "$p"; fi; done
cat package.json
sed -n '"'1,280p' src/render.js
sed -n '1,280p' src/fill.js" in /workspace/tellsh
 succeeded in 0ms:
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
// Turn (intent, slots) into a concrete, safely-quoted command for the target shell.
import { BY_ID } from './catalog.js';
import { extractSlots, pickArg, pickDest, pickDir, foldKeepLength, isStopWord } from './slots.js';
import { checkDanger, maxRisk, plainSlotValue } from './danger.js';
import { protectedNumbers } from './guards.js';
import { shQuote, psQuote, chooseTemplate, quoteForKind, UnquotableError, pwshNativeSlots, unsafeNativePwshArg } from './render.js';

export { shQuote };

// Validators for slots that are inserted raw ({slot!raw}).
export const RAW_OK = {
  count: (v) => /^\d{1,6}$/.test(String(v)),
  depth: (v) => /^\d{1,2}$/.test(String(v)),
  days: (v) => /^\d{1,5}$/.test(String(v)),
  pid: (v) => /^\d{1,7}$/.test(String(v)),
  port: (v) => /^\d{1,5}$/.test(String(v)) && +v > 0 && +v < 65536,
  // ssh -L LOCAL:RHOST:RPORT: the remote end of a tunnel (a host name, an IPv4 address or a bracketed IPv6 address)
  rport: (v) => /^\d{1,5}$/.test(String(v)) && +v > 0 && +v < 65536,
  rhost: (v) => /^(?!-)[A-Za-z0-9](?:[\w.-]{0,252})$|^\[[0-9A-Fa-f:.]{2,45}\]$/.test(String(v)),
  size: (v) => /^\d+[ckMG]?$/.test(String(v)),
  age: (v) => /^-m(?:min|time) -\d+$/.test(String(v)),
  mode: (v) => /^[0-7]{3,4}$|^[ugoa]*[+=-][rwxXst]+$/.test(String(v)),
  var: (v) => /^[A-Za-z_][A-Za-z0-9_]*$/.test(String(v)),
  minutes: (v) => /^\d{1,7}$/.test(String(v)),
  sizeBytes: (v) => /^\d{1,16}$/.test(String(v)),
  start: (v) => /^\d{1,9}$/.test(String(v)) && +v > 0,
  end: (v) => /^\d{1,9}$/.test(String(v)) && +v > 0,
  num: (v) => /^\d{1,12}$/.test(String(v)),
  // a repository as gh -R takes it: [HOST/]OWNER/REPO
  dryrun: (v) => v === '--dry-run',
  delbranch: (v) => v === '--delete-branch',
  npmverb: (v) => v === 'install' || v === 'ci',
  // a wrangler environment name (wrangler.toml [env.NAME])
  wenv: (v) => /^[A-Za-z0-9][\w-]{0,62}$/.test(String(v)),
  // a part of a gh / wrangler request the command does not express: always the user's to fill (`<ARGS>`)
  args: () => false,
  // a scope the request names that the command cannot express (`npm run deploy --env prod`): always the user's to fill (`<SCOPE>`)
  scope: () => false,
  // an npm workspace (`--workspace api`, `-w packages/api`, `@scope/app`, a quoted `"staging app"`; rendered quoted)
  // pip install --target DIR (rendered quoted)
  piptarget: (v) => /^(?!-)[^\0\n\r]{1,255}$/.test(String(v)) && /[\w~./]/.test(String(v)),
  workspace: (v) => /^(?![-.])[\w@./-](?:[\w@./ -]{0,98}[\w@./-])?$/.test(String(v)) && !/\.\./.test(String(v)),
  repo: (v) => /^(?:(?!-)[\w-]+(?:\.[\w-]+)+\/)?(?!-)[\w-][\w.-]{0,99}\/(?!-)[\w-][\w.-]{0,99}$/.test(String(v)) && !/\.\./.test(String(v)),
  // a pull request as gh selects it: number, URL or head branch
  pr: (v) => (/^\d+$/.test(String(v)) ? /^[1-9]\d{0,11}$/.test(String(v)) : /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/pull\/\d{1,12}\/?$/.test(String(v)) || /^(?![-.])(?!.*\.\.)[\w./-]{1,100}$/.test(String(v))),
};

// "merge pull request feature/login", "view the pr for branch fix-1", "pr #45", 'merge pull request "feature/login"'
// (a quoted value ends at its matching quote, `“”„` being one family: "bob's-fix" is one value; a quote with no matching
// close, `'it''s'`, is m[7] and withheld)
const PR_SELECTOR = /\b(?:pull[\s-]+requests?|pr|prs)\s+((?:(?:for|of|on|from|branch|number|no\.?|nr\.?|(?:the|a|my|our)(?=\s+branch\b))\s+)*)(?:(?:"([^"]*)"|'([^']*)'|`([^`]*)`|[„“”]([^„“”"]*)[“”])(?=[\s.,!?;:]|$)|(#?[^\s"'`„“”]+?)[.,!?]?(?=\s|$)|(["'`„“”]))/i;
// a function or describing word after "pull request" is not a selector ("merge the pull request and …", "merge pr now",
// "check pr status", "view pull request on github", "merge pr by bob", "merge pull request quickly", "view pr from yesterday",
// "close pr for issue 45"); only checked for an unmarked word (`feature/apply`, `fix-reply`, `#12-only` are selectors);
// another unmarked word, `nightly`, is withheld
const PR_NOT_SELECTOR = /^(?:the|a|an|this|that|it|its|my|our|your|their|me|us|you|him|her|them|and|or|then|now|please|pls|into|to|with|without|in|at|by|is|was|which|again|request|requests|status|state|checks?|details?|info|summary|description|diff|changes|comments?|github|gh|web|browser|online|here|there|today|yesterday|tomorrow|earlier|later|review|fork|upstream|fast|asap|already|first|too|also|quickly|immediately|directly|safely|manually|automatically|finally|only|just|really|simply|properly|carefully|right|soon|instantly|issues?|tickets?|bugs?)$/i;
// an unmarked word (no digit, '/', '-', '_', '.', '#') names a branch only after "branch", "for" or "from" ("merge pr from bob");
// otherwise it is withheld (the `?` fails validation)
const PR_MARKED = /[\d/_.#-]/;
// an abbreviation ("merge pr e.g. main", "merge pr w/o checks") or a host ("merge pr on github.com") is not a branch
const PR_ABBREV = /^(?:e\.g|i\.e|w\/o|w\/|etc|vs|cf|a\.k\.a|n\/a|b\/c)$/i;
const PR_HOST = /^(?:[\w-]+\.)+(?:com|org|net|io|dev|app|co|me)$/i;
// a number names the pull request only right after "pr" / "pull request" (`pr 45`, `pr #45`, `pr number 45`) or as `#45`
const PR_NUMBER_LEAD = /^(?:(?:number|no\.?|nr\.?)\s+)*$/i;
const PR_WORD = /\b(?:pull[\s-]+requests?|pr|prs)\b/i;
// an issue, ticket or bug is not the pull request ("merge pr for issue #45", "merge the pull request for ticket 3")
const PR_ISSUE = /^(?:issues?|tickets?|bugs?)$/i;
// a number followed by a unit is an amount, not the pull request ("merge pr 2 days old", "merge pr 3 times")
const PR_UNIT_AFTER = /^\s+(?:secs?|seconds?|mins?|minutes?|hours?|hrs?|days?|weeks?|months?|years?|times?|ago|old|more|approvals?|reviews?|reviewers?|commits?|files?|lines?|changes?|comments?|checks?)\b/i;
// `#45` alone names the pull request only as the first word after the verb ("merge #45", "squash merge #45", "please
// close #7"); one in another clause ("the pr that closes #12", "merge the pr, see #99") is withheld
const PR_HASH_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit)\s+)+$/i;
// "merge the pull request by alice", "merge the pr from yesterday", "the pr that fixes login", "the pr opened last week": a
// pull request picked out by who or when, which is not the current branch's (withheld)
const PR_QUALIFIED = /^\s*(?:in\s+question\b|(?:by|from|since|before|after|about|titled|named|called|that|which|who|whose|where|od|autorstwa)\b|(?:\S+\s+)?(?:opened|created|authored|submitted|raised|written|made|sent|pushed|filed)\b)|\b(?:yesterday|today|tonight|tomorrow|ago|last\s+(?:week|month|year|night|friday|monday|tuesday|wednesday|thursday|saturday|sunday)|wczoraj\w*|dzisiaj|dzi[sś])\b/i;
// "merge the pr with label urgent", "the pull request with title fix login", "z etykietą pilne": picked out by a label,
// title, author, ... (withheld)
const PR_DESCRIBED = /^\s*(?:with|having|z|o)\s+(?:the\s+|a\s+)?(?:labels?|title|titled|name|tags?|authors?|assignees?|milestone|description|text|keywords?|words?|subject|commits?|etykiet\w*|tytu\w*|nazw\w*|autor\w*)\b|^\s*(?:labell?ed|tagged|assigned|mentioning|containing|regarding|concerning|touching|fixing|adding|removing|updating|changing)\b/i;
// "merge the pr from last week", "from monday", "view that pr from before": after "for" / "from" a word saying when is
// not a branch (withheld)
const PR_WHEN = /^(?:last|this|next|past|previous|previously|before|earlier|ages|recently|lately|week|month|year|morning|afternoon|evening|night|weekend|monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|wed|thu|fri|sat|sun|january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|jun|jul|aug|sep|sept|oct|nov|dec|ago|wczoraj\w*|dzisiaj|przedwczoraj|zesz\w*|poprzedni\w*|wcze\w*)$/i;
// "merge the dependabot pr", "the docs pr", "said pr", "the above pr", "zmerguj to pr": a word between a determiner and
// "pr" (or an anaphoric one) picks out a pull request the parser cannot read (withheld, also with history); "the current
// pr", "my own pr", "that one pr", "the same pr", "the last pr" (a reference) stay as they are
const PR_DET_WORD = /(?:^|\s)(?:the|a|an|my|our|your|his|her|their|this|that|these|those|its|ten|tego|ta|tamten|to)\s+((?:\S+\s+){1,3})$/i;
const PR_DET_NEUTRAL = /^(?:current|branch|branch's|branch’s|own|one|same|previous|last|prior|single|github|gh|pull|this|that|the|my|our|bieżący\w*|biezacy\w*|obecn\w*|aktualn\w*|mój|moj\w*|nasz\w*|sw[oó]j|swoj\w*|ten|tego)$/i;
const PR_ANAPHOR = /(?:^|\s)(?:said|above|aforementioned|abovementioned|above-mentioned|mentioned|referenced|aforesaid|forementioned|wspomnian\w*|powy[zż]sz\w*|ww\.?)\s+(?:\S+\s+)?$/i;
// "merge dependabot pr", "merge draft pr", "merge alice's pr": without a determiner, a word between the request's verb and
// "pr" picks out a pull request just the same (withheld); "merge pr", "squash and merge my pr", "zmerguj to pr" stay as they are
const PR_VERB = /^(?:merge|squash|rebase|land|ship|accept|view|show|open|display|see|check|checkout|diff|review|approve|close|reopen|edit|ready|comment|list|get|fetch|print|describe|zmerguj\w*|scal\w*|poka[zż]\w*|zobacz\w*|otw[oó]rz\w*|zamknij\w*|sprawd[zź]\w*|wy[sś]wietl\w*|zatwierd[zź]\w*|zaakceptuj\w*|przejrzyj\w*)$/i;
const PR_FILLER = /^(?:please|pls|now|then|just|and|also|out|up|go|ahead|to|it|tamten|that|this|ten|tego|gh|github|pull|i|you|can|could|would|will|let's|lets|me|us|want|need|prosz[eę]|teraz|i|oraz|a)$/i;
// "merge open pr", "merge ready pr": after the verb, a state word picks a pull request out
const PR_STATE = /^(?:open|ready|review|close)$/i;
function prWordBefore(before) {
  const words = before.replace(/[,;:]/g, ' ').trim().split(/\s+/).filter(Boolean);
  const v = words.findIndex((x) => PR_VERB.test(x));
  // "show checks for that pr", "view the diff of my pr": the words before the last preposition say what to show
  const at = Math.max(v, words.findLastIndex((x) => /^(?:for|of|on|in|from|about|with|dla|z|w)$/i.test(x)));
  return words.slice(at + 1).some((x) => !(PR_VERB.test(x) && !PR_STATE.test(x)) && !PR_FILLER.test(x) && !PR_DET_NEUTRAL.test(x));
}
// "merge pr for the login fix", "merge pr with dependabot", "merge pr of my colleague", "merge pr in docs", "merge pr: fix
// login": a connective (or a colon) after "pr" and a word that is not neutral pick a pull request out (withheld); "merge pr
// on github", "merge pr with squash", "merge pr in this repo", "merge pr for review" stay as they are
const PR_AFTER_PICK = /^\s*(?::\s*|[-–—]\s+|\s(?:for|of|with|in|on|from|about|regarding|re|dla|z|w|od)\s+)(?:(?:the|a|an|my|our|your|his|her|their|its|this|that)\s+)*([^\s.,!?;:]*)/i;
const PR_AFTER_NEUTRAL = /^(?:$|-\S*|github|gh|web|browser|online|cli|terminal|here|this|current|same|local|repo|repository|squash|squashing|rebase|rebasing|merge|merging|auto|automerge|auto-merge|admin|review|me|us|it|now|please|pls|main|master|default|teraz|prosz[eę]|githubie|przegl[aą]darce)$/i;
const prPickedAfter = (after) => {
  const m = after.match(PR_AFTER_PICK);
  return m != null && !PR_AFTER_NEUTRAL.test(m[1]);
};
// a URL names the pull request when only a verb, a determiner or "pr" comes before it
const PR_URL_LEAD = /^\s*(?:(?:please|pls|now|then|just|squash|rebase|and|merge|close|reopen|view|show|open|display|check|checkout|diff|review|approve|ready|edit|the|this|that|a|pull|requests?|pr|prs|at|is|me|you|can|could|would|i|want|to|url|link|[(]|zmerguj\w*|scal\w*|poka[zż]\w*|zobacz\w*|otw[oó]rz\w*|zamknij\w*|sprawd[zź]\w*)[\s:,]+)*[(<]?$/i;
// "merge ten pr" (Polish "this"), "merge that one pr": a number word that is a demonstrative, not a number
const PR_DEM_NUMBER = /\b(?:ten|(?:that|this|which|the)\s+one)\s+(?:\S+\s+)?(?:prs?|pull[\s-]+requests?)\b/gi;
// "merge pr from the feature branch", "for my branch bob": a branch is named, but not one the parser read
const PR_BRANCH_NAMED = /\b(?:for|of|on|from)\s+(?:\S+\s+){0,2}branch\b/i;
// "and delete the branch", "delete the branch after", "usuń gałąź": the head branch goes with the merge (--delete-branch)
const PR_DELETE_BRANCH = /\b(?:and\s+)?(?:delete|remove|usun)\s+(?:the\s+|its\s+|that\s+|tego\s+|ten\s+|t[ea]\s+)?(?:(?:local\s+and\s+remote|remote|head|feature)\s+)?(?:branch|branche?a?|galaz|galez)\b(?:\s+(?:after(?:wards)?|too|as\s+well|potem|tez))?/g;
const PR_DELETE_NEGATED = /(?:\b(?:not|no|never|without|nor|nie|bez)|n't|\bdont)\s+(?:\S+\s+){0,1}$/;
// wrangler deploy: "dry run", "--dry-run", "na sucho", "without (actually) deploying/publishing" (wrangler deploy --dry-run);
// "not a dry run", "without dry run", "skip the dry run": a real deploy, no flag (a dry run asked for elsewhere in the
// request, "without a dry run first? no, do a dry run", still counts)
const WR_DRY = /\bdry[\s-]*run\b|\bna\s+sucho\b|\bwithout\s+(?:actually\s+)?(?:deploying|publishing|uploading)\b|\b(?:don'?t|do\s+not)\s+actually\s+(?:deploy|publish|upload)\b|\bbez\s+(?:faktycznego\s+)?(?:wdra[zż]ania|publikowania|deployu?)\b/i;
const WR_DRY_NOT = /\b(?:not|no|without|skip|skipping|nie|bez)\s+(?:a\s+|the\s+|any\s+)?dry[\s-]*run\b|\b(?:don'?t|do\s+not)\s+(?:do\s+)?(?:a\s+|the\s+)?dry[\s-]*run\b/gi;
const wranglerDry = (t) => WR_DRY.test(t.replace(WR_DRY_NOT, ' '));
// the environment: "--env staging", "-e staging", "env=staging", "env staging", "to the staging environment", "to staging",
// "for production", "na produkcję"; a name is taken only when it is a known one ("staging", "prod", ...) or a marked one
// ("staging-eu", "preview2", "qa_1"), as a whole word, quoted or not ('to "preview2"'): "worker env", "with env vars", "env
// file", "my environment is set" never make up `--env worker/with/is` (the environment is withheld, `<WENV>`); a plain
// unknown word after "to" ("to cloudflare") is not an environment
const WR_Q = `(?:"[^"]*"|'[^']*'|\`[^\`]*\`|[„“”][^„“”"]*[“”]|\\S+)`;
const WR_ENV_OPT = new RegExp(`(?:^|\\s)(?:--env|-e|env)(?:=|(?<!\\benv)\\s+)(${WR_Q})`, 'i');
const WR_ENV_AFTER = new RegExp(`\\b(?:env|environment|środowisk\\w*|srodowisk\\w*)\\s+(called\\s+|named\\s+|o\\s+nazwie\\s+)?(${WR_Q})`, 'gi');
const WR_ENV_BEFORE = /(?:^|\s)(\S+)\s+(?:env|environment)\b/gi;
const WR_ENV_PREP = new RegExp(`\\b(to|on|in|into|for|na|do|w|dla)\\s+(?:the\\s+|my\\s+|our\\s+)?(${WR_Q})(\\s+\\S+)?`, 'gi');
const WR_ENV_KNOWN = /^(?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)$/i;
// after "for" only a strong name is the environment ("for production", "for qa"); a weak one says what the deploy is for
// ("for testing", "for dev", "for the qa team"): withheld, never made up
const WR_ENV_STRONG = /^(?:production|prod|staging|stage|qa|uat|canary|preview|sandbox)$/i;
// a word after the name that ends the phrase ("for prod now", "for qa, then …"), not a noun it describes ("for the qa team")
const WR_ENV_END = /^\s+(?:and|then|now|please|pls|too|also|again|today|asap|with|using|via|without|from|but|so|env|environment)$/i;
const WR_ENV_ANY = /\b(?:env|environment|środowisk\w*|srodowisk\w*|produkcj\w*|staging\w*|production|prod|stage|qa|uat|canary|sandbox)\b/i;
// a marked name is an environment after a preposition only when a known one is part of it ("staging-eu", "preview2",
// "qa_1"); another ("to v2", "to the worker-2 script") is withheld, never made up
const WR_ENV_STEM = /^(?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)(?=[\d_-])|[\d_-](?:staging|stage|production|prod|preview|dev|development|test|testing|qa|uat|sandbox|canary|beta)$/i;
// a quoted value is decoded (its quotes are not part of the name); a word loses the punctuation after it
const wrEnvWord = (w) => {
  const s = String(w);
  return /^["'`„“”]/.test(s) && s.length > 1 && /["'`“”]$/.test(s) ? s.slice(1, -1) : s.replace(/[.,!?;:]+$/, '');
};
const wrQuoted = (w) => /^["'`„“”]/.test(String(w));
// a marked name: letters with a digit, '-' or '_' ("staging-eu", "preview2"), not "2-3" or "src/worker.js"
const wrEnvMarked = (w) => RAW_OK.wenv(w) && /[A-Za-z]/.test(w) && /[\d_-]/.test(w);
/** The wrangler environment a deploy request names: a name, `?` (named, not readable) or null (the default). */
function wranglerEnv(t) {
  const o = t.match(WR_ENV_OPT);
  if (o) { const w = wrEnvWord(o[1]); return RAW_OK.wenv(w) ? w : '?'; }
  for (const m of t.matchAll(WR_ENV_AFTER)) {
    const w = wrEnvWord(m[2]);
    if (WR_ENV_KNOWN.test(w) || wrEnvMarked(w) || ((m[1] || wrQuoted(m[2])) && RAW_OK.wenv(w))) return w;
    if (wrQuoted(m[2])) return '?';
  }
  for (const m of t.matchAll(WR_ENV_BEFORE)) {
    if (WR_ENV_KNOWN.test(m[1]) || wrEnvMarked(m[1])) return m[1];
  }
  for (const m of t.matchAll(WR_ENV_PREP)) {
    const prep = m[1].toLowerCase();
    const w = wrEnvWord(m[2]);
    const q = wrQuoted(m[2]);
    if (prep === 'for' || prep === 'dla') {
      if (WR_ENV_STRONG.test(w) && (!m[3] || WR_ENV_END.test(m[3]) || /^[.,!?;:]/.test(m[2].slice(w.length)))) return w;
      if (WR_ENV_KNOWN.test(w) || wrEnvMarked(w) || q) return '?';
      continue;
    }
    if (WR_ENV_KNOWN.test(w)) return w;
    if (/^(?:to|into|na|do)$/.test(prep)) {
      if (wrEnvMarked(w)) return WR_ENV_STEM.test(w) ? w : '?';
      // 'to "my env"', 'to "cloudflare"': another quoted value is withheld, never dropped
      if (q) return '?';
    }
  }
  return WR_ENV_ANY.test(t) ? '?' : null;
}
// ---------------------------------------------------------------------------------------------
// gh / wrangler selector rule (v0.3): a request is read against a closed vocabulary. Every word must be a command word of
// the intent's family, a function word, or part of a value that was read (a pull request, a repository, an environment, a
// secret name). Any other word ("merge the pr about auth", "deploy worker in preview2", "create a pr into develop") names
// or describes something the command does not express: the selector is withheld as a placeholder the user has to fill
// (`gh pr merge <PR>`, `npx wrangler deploy --env <WENV>`, `gh pr create --fill <ARGS>`), never guessed and never dropped
// for a bare command. A word that is not in the vocabulary is never accepted as harmless.
const SEL_WORDS = (s) => {
  const words = s.trim().split(/\s+/);
  return { words: new Set(words.filter((w) => !w.endsWith('*'))), stems: words.filter((w) => w.endsWith('*')).map((w) => w.slice(0, -1)) };
};
const selHas = (v, w) => v.words.has(w) || v.stems.some((s) => w.startsWith(s));
const SEL_COMMON = SEL_WORDS(`
  the a an my our your this that these those it its me us i i'm im you we he she they them
  to on in into onto for from of at with by via using through over up out as
  please pls plz now just quickly again also too and then so ok okay hey hi go ahead
  can could would will shall do does did done how what whats what's is are am be been should want wanna need needs gonna let lets
  help run running execute use command commands line cli terminal shell console here there current currently same local
  right away asap today actually real really properly correctly give get tell print read see show display
  powershell* pwsh mac macu maca macos osx windows* linux* cmd cmd.exe fish fishu bash bashu zsh zshu terminal*
  z ze w we na do dla przez od o po i oraz a to ten ta te tego tej tym tych mi mnie sobie sie się jest sa są co
  prosze pls jak jakie jaki jakiego jakim czy mozesz moge mozna chce chcialbym chcialabym musze zrob zrobic zrobmy teraz
  szybko juz tutaj tu obecny obecnego obecnej obecnym aktualny aktualnego aktualnej aktualne biezacy biezacego biezacej
  moj moja moje mojego mojej moim moich naszego nasz nasza nasze polecenie* komend* konsol* linii
  uzyj uzywajac pomoca za daj odpal* pokaz* zobacz* sprawdz* wyswietl* wypisz* zerknij smialo dawaj
  jako dalej jakies jakis any some are there about their time czas* pod otworz set skonfiguruj* zebym mogl moc robic dodac edge
  same but first one yes no if whether says saying mowi done finished skonczylem gotowe give access dostep* daj* what's whats did does before after przed zanim byl byla bylo byly verify* weryfik* dziala* works working still have has which who ktore ktory ktora jeszcze ma mamy mam powiedz confirm potwierdz* check sprawdzic`);
// command words per family; a pull request, run or environment the request picks out ("the latest", "my last", "for the
// login fix") is never one of them
const SEL_FAMILY = {
  gh: SEL_WORDS(`project projekt* scopes scope scope'y token valid details szczegol* uwierzytelnion* authenticated logged zalogowan* stan setup flow tool narzedzi* credentials danymi dane konfiguracj* first-time pierwsza feature ficzer messages message description opis* commit* pushed wypchnalem wypchnij* turn zamien* tests testy pass przechodza zacznij pracy wrzuc* queue kolejce outstanding enumerate wymien* lately succeed* ran today dzis few kilka overview executions status statusem najnowszych runow odpalily wylistowac gh github* git hub
    repo repos repository repozytori* pr prs pra prka prke prki prku prow pr-y pr-ow pull pulla pull-request* request* requescie
    view open look check checks checking ci status statuses state otworz web browser online przegladar*
    branch branchu brancha branchem galezi galaz changes zmian zmiany`),
  wrangler: SEL_WORDS(`project projekt* zdeploy* session sesj* instance instancj* function funkcj* log* authenticated configured skonfigurowan* oauth browser przegladar* expired wygasl* valid wazn* details szczegol* using uzywa* uzywam account* konta konto koncie organizac* org tozsamosc* aktualn* say env environment environments srodowisk* called named nazwie npx wrangler* cloudflare* cf worker workers worker's workera workerze workerem workerow workerowi`),
};
const SEL_INTENT = {
  gh_pr_merge: SEL_WORDS(`merge* land squash squash-merge squashing rebase rebasing auto automerge auto-merge admin
    zmerguj* zmergow* zmerdz* wmerguj* merguj* scal* polacz* main master maina mastera base bazow* review* zatwierdz*
    accept approve* zaakceptuj complete finalize sfinalizuj checki`),
  gh_pr_view: SEL_WORDS(`view details detail info information diff description summary web browser online przegladarce przegladarka
    szczegol* opis* podsumowan* przeczytaj`),
  gh_pr_checks: SEL_WORDS(`tests test build builds passing passed failing failed pass fail green red results result
    workflow workflows actions action pipeline pipelines testy testow buildy przechodz* przeszl* checki checkow wynik*
    zielon* padl* padaj*`),
  gh_pr_create: SEL_WORDS(`create creating make new submit raise file send open put start propose utworz* stworz* zaloz* wystaw*
    nowy nowa nowe zglos* zrob wyslij* zaproponuj zacznij for these those my changes work zmiany zmian zmianach commit commits`),
  gh_pr_list: SEL_WORDS(`pry list listing all open opened pending show which there any lista liste wylistuj* listuj* wszystkie otwarte otwartych`),
  gh_run_list: SEL_WORDS(`list listing recent recently latest last all show workflow workflows run runs action actions ci pipeline pipelines
    build builds job jobs history happened happen* recently fail* failed failing passed przeszl* padl* ostatni* wszystkie uruchomien* przebieg* runy runow workflowy workflowow akcj* histori*
    wylistuj* listuj* lista liste buildow`),
  gh_run_view: SEL_WORDS(`view details logs log output failed failing failure why workflow run runa runie action ci pipeline build job
    szczegol* logi`),
  gh_auth_status: SEL_WORDS(`auth authenticated authentication logged log login signed sign status who account whoami am which user
    zalogowan* konto konta koncie kim kto jestem uwierzytelnien* logowani* token valid wazn* expired wygasl* session sesj*
    authorized autoryzacj* loguje credentials dane still nadal`),
  gh_auth_login: SEL_WORDS(`not nie auth authenticate authentication log login sign signin zaloguj* zalogowac logowani* konto account
    uwierzytelnij* autoryzuj* kont* konc* connect podlacz* polacz* link authorize re-authenticate re-login again ponownie setup configure skonfiguruj* konfiguracj*`),
  wrangler_deploy: SEL_WORDS(`depl* redeploy publish* ship push release upload go wdroz* zdeployuj* deployuj* opublikuj* wypchnij*
    wrzuc* wgraj* make roll rollout wypusc* wydaj* pusc* code kod kodu version wersj* new nowa nowy najnowsz* latest fresh swiez*
    changed changes zmienilem zmian* after po`),
  wrangler_dev: SEL_WORDS(`dev develop development locally local server serve start preview mode lokaln* serwer* uruchom* odpal*
    tryb* developersk* deweloper* localhos* 127.0.0.1 machine maszyn* depl* pusc* przetest* spin launch fire boot try test przetestuj* emul* serwuj* hot reload* odpal*`),
  wrangler_tail: SEL_WORDS(`thrown right now teraz tail* logs log live stream* realtime real-time watch follow logi logow zywo strumien*
    podglad* sledz* obserwuj* rzeczywist* czasie biezaco monitor* errors bledy exceptions wyjatki console.log requests requesty
    happen* happening debug* output wdrozon* wyjscie zdebug* print* wypisuj* feed attach podepnij* podlacz* deployed zdeployowan* dzialajac* running`),
  wrangler_secret_put: SEL_WORDS(`new nowy nowa nowe push wypchnij* secret secrets set put add store save update change create rotate register encrypted configure sekret*
    ustaw* dodaj* zapisz* zmien* zaktualizuj* zaszyfrowan* zarejestruj* zrotuj* utworz* jako value variable called named nazwie`),
  wrangler_login: SEL_WORDS(`not nie kont* konc* podlacz* login log sign signin re-login authenticate re-authenticate authentication auth authorize account konto kontem
    zaloguj* zalogowac logowani* autoryz* uwierzytelni* polacz* connect browser przegladarce first najpierw ponownie again`),
  wrangler_whoami: SEL_WORDS(`whoami who account logged log signed status which user am konto konta koncie zalogowan* kim kto jestem
    identity tozsamosc* id identyfikator* email mail maila whose czyje* active aktywn* uses using uzywa* uzywam`),
};
// words that pick one pull request / run / target out of several ("the latest pr", "the draft pr", "the failing run"):
// explained only for the intents that list them (gh_pr_list "open prs", gh_run_list "recent runs"), never by the family
const SEL_PICKERS = new Set(('latest last recent recently newest new old older oldest first second third next previous prior other another ' +
  'approved pending draft failing failed fail passing passed pass green red open opened closed merged ready big small ' +
  'ostatni ostatnie ostatniego najnowszy najnowsze nowy nowa nowe stary inny inne poprzedni kolejny otwarte otwartych').split(' '));
const selFamilyAll = {};
for (const [id, v] of Object.entries(SEL_INTENT)) {
  const f = id.split('_')[0];
  const all = (selFamilyAll[f] ??= { words: new Set(), stems: [] });
  // a negation ("not logged in" for a login) is explained only for the intent that lists it, never family-wide
  for (const w of v.words) if (!SEL_PICKERS.has(w) && !/^(?:not|nie|never|without|bez)$/.test(w)) all.words.add(w);
  all.stems.push(...v.stems.filter((x) => !SEL_PICKERS.has(x)));
}
// the slot that takes the placeholder when a request has words the vocabulary does not explain
const SEL_SLOT = { gh_pr_merge: 'pr', gh_pr_view: 'pr', gh_pr_checks: 'pr', gh_run_view: 'num' };
export const hasSelectorRule = (intentId) => /^(?:gh|wrangler)_/.test(intentId);
// "for issue #3", "for ticket 12", "the pr that fixes #12": a number of another kind, explained as not the pull request
const SEL_OTHER_NUMBER = /\b(?:issues?|tickets?|bugs?|zgloszeni\w*|fix(?:es)?|closes|resolves|naprawia\w*|zamyka\w*)\s+#?\d+\b/g;
const SEL_ENV_PREP = /^(?:to|on|in|into|for|na|do|w|dla|env|environment|srodowisk\w*|called|named|nazwie)$/;
const SEL_NEGATION = /^(?:not|never|don't|dont|nor|except|excluding|without|instead|rather|nie|bez|oprocz|poza|zamiast)$/;
const SEL_DET = /^(?:the|a|an|my|our|this|that)$/;
/**
 * The words of a gh / wrangler request the vocabulary and the read values do not explain, each with the word before it
 * ([] : nothing unexplained).
 */

exec
/bin/bash -lc 'git log -8 --oneline
rg --files src test review | head -120' in /workspace/tellsh
exec
/bin/bash -lc "sed -n '1,240p' src/danger.js
sed -n '350,550p' src/danger.js
rg -n 'cmdQuote|PATH_SLOTS|tilde:|cmd:' src test | head -200" in /workspace/tellsh
 succeeded in 0ms:
d605e2d cmd: non-path values ending in \ are a gap instead of being rewritten; C:\. and \. critical
e4a9108 cmd: quoted trailing separator becomes \. (keeps copy/move directory meaning); C:\Users / Windows / Program Files are critical rd targets
d155004 cmd: drop trailing separators from quoted paths instead of doubling (bsdtar rejects \\)
205d92d cmd: double a trailing backslash inside quotes (MSVC argv), tests for ~/ paths and critical home targets
ade9291 test: cmd ~ quoting test uses the real buildCommand signature; MATRIX.md from Windows run in a spaced temp path
cade95f cmd: always double-quote %USERPROFILE% paths (user names with spaces)
43637e8 matrix: report keeps all files without --before, high-risk cells never run outside a container, cwd stays in fixture
e5033d4 v0.3.1: template matrix across bash/sh/zsh/PowerShell/cmd and fixes
review/r1-codex.md
review/fix21-log.md
review/final-codex.md
review/close-fix.md
review/r19-claude.md
review/r6-codex.md
review/r20-codex.md
review/fix13-log.md
review/fix9-log.md
review/r5-codex.md
review/fix4-log.md
review/fix19-log.md
review/r18-claude.md
review/final6-codex.md
review/r4-claude.md
review/fix18-log.md
review/031-r8-claude.md
review/r9-codex.md
review/close4-fix.md
review/final3-claude.md
review/r11-codex.md
review/r23-codex.md
review/r19-codex.md
review/STATUS
review/fix8-log.md
review/r13-codex.md
review/r20-claude.md
review/r10-claude.md
review/fix17-log.md
review/r11-claude.md
review/r2-claude.md
review/fix11-log.md
review/fix7-log.md
review/final3-codex.md
review/close3-fix.md
review/r13-claude.md
review/r23-claude.md
review/fix5-log.md
review/r1-claude.md
review/fix3-log.md
review/031-r8-codex.md
review/r22-claude.md
review/r8-codex.md
review/r9-claude.md
review/fix22-log.md
review/031-r8-prompt.txt
review/final-claude.md
review/r2-codex.md
review/r17-claude.md
review/r17-codex.md
review/r21-codex.md
review/r16-claude.md
review/r7-codex.md
review/fix15-log.md
review/r8-claude.md
review/r12-claude.md
review/STATUS_031
review/r7-claude.md
review/r12-codex.md
review/final4-claude.md
review/r14-claude.md
review/r22-codex.md
review/r5-claude.md
review/fix12-log.md
review/close6-fix.md
review/fix14-log.md
review/r4-codex.md
review/r14-codex.md
review/close2-fix.md
review/hybrid-log.md
review/fix2-log.md
review/r3-claude.md
review/r18-codex.md
review/close5-fix.md
review/r6-claude.md
review/r21-claude.md
review/r15-codex.md
review/final5-codex.md
review/fix16-log.md
review/fix20-log.md
review/fix10-log.md
review/fix4b-log.md
review/r15-claude.md
review/final2-codex.md
review/r10-codex.md
review/final2-claude.md
review/final5-claude.md
review/final4-codex.md
review/final6-claude.md
review/r16-codex.md
review/r3-codex.md
review/fix1-log.md
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

 succeeded in 0ms:
// Dangerous-pattern checker. Runs on every final command (including user-edited ones)
// and can only ever escalate risk, never lower it. Whether a command can be safe at all is the
// trust rule at the end of this file (checkDanger): only tellsh's own catalog renders with plain values.
//
// Regex rules run on the command text after `git`/`docker` global options are removed
// (`git -C /repo -c x=y reset --hard` is checked as `git reset --hard`). Structural rules
// (rm, kill, Remove-Item, rd/del) tokenize each simple command so long options, quoted targets
// and `--` are understood.

import { ALLOW } from './allowlist-data.js';

const RANK = { safe: 0, medium: 1, high: 2 };
export const maxRisk = (a, b) => (RANK[b] > RANK[a] ? b : a);

// ---------------------------------------------------------------------------------------------
// light tokenizer: simple commands separated by ; & | && || ( ) and newlines, words unquoted
// (POSIX '…' "…" \x and PowerShell `x). Good enough for danger checks, not a full shell parser.

// PowerShell also treats the typographic quotes as quote characters (about_Quoting_Rules)
const PS_SQ = /['\u2018\u2019\u201A\u201B]/;
const PS_DQ = /["\u201C\u201D\u201E]/;

// $'…' (bash, zsh, ksh): the index of its closing quote (`\'` does not close it)
const ansiEnd = (s, i) => { let j = i + 2; while (j < s.length && s[j] !== "'") j += s[j] === '\\' ? 2 : 1; return Math.min(j, s.length); };
const ANSI_ESC = { n: '\n', t: '\t', r: '\r', a: '\x07', b: '\b', e: '\x1b', E: '\x1b', f: '\f', v: '\v' };

// winPaths: backslash is never an escape (cmd.exe / PowerShell paths such as "C:\"), and the
// PowerShell typographic quotes ‘…’ “…” quote like ' and "
export function simpleCommands(cmd, { winPaths = false } = {}) {
  const out = [];
  let words = [];
  let w = null;
  const flushWord = () => { if (w != null) { words.push(w); w = null; } };
  const flushCmd = () => { flushWord(); if (words.length) out.push(words); words = []; };
  const s = String(cmd);
  const isSq = (c) => (winPaths ? PS_SQ.test(c) : c === "'");
  const isDq = (c) => (winPaths ? PS_DQ.test(c) : c === '"');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (!winPaths && c === '$' && s[i + 1] === "'") {
      // bash ANSI-C quoting $'…': a backslash escapes the next character, also a quote (`$'\''` is one ')
      const end = ansiEnd(s, i);
      w = (w ?? '') + s.slice(i + 2, end).replace(/\\(.)/gs, (m, x) => ANSI_ESC[x] ?? x);
      i = end;
    } else if (isSq(c)) {
      let j = i + 1;
      while (j < s.length && !isSq(s[j])) j++;
      const end = j;
      w = (w ?? '') + s.slice(i + 1, end);
      i = end;
    } else if (isDq(c)) {
      let v = '';
      let j = i + 1;
      for (; j < s.length && !isDq(s[j]); j++) {
        if (((!winPaths && s[j] === '\\' && /[$`"\\\n]/.test(s[j + 1])) || s[j] === '`') && j + 1 < s.length) v += s[++j]; else v += s[j];
      }
      w = (w ?? '') + v;
      i = j;
    } else if (!winPaths && c === '\\' && i + 1 < s.length && !/[A-Za-z0-9_.%$~*]/.test(s[i + 1])) {
      w = (w ?? '') + s[++i]; // POSIX escape (keeps Windows paths like C:\Users intact)
    } else if ((c === '{' || c === '}') && w == null && (i + 1 >= s.length || /\s/.test(s[i + 1]))) {
      flushCmd(); // standalone { } = command group / script block
    } else if (/\s/.test(c)) {
      if (c === '\n') flushCmd(); else flushWord();
    } else if (/[;&|()]/.test(c)) {
      flushCmd();
    } else {
      w = (w ?? '') + c;
    }
  }
  flushCmd();
  return out;
}

// strip wrappers that run their argument as the command (sudo, timeout N, chroot DIR, env A=b, ...)
// options of each wrapper that take a separate value
const WRAPPER_OPTARG = {
  sudo: /^-[ugpCDhrtTUR]$|^--(?:user|group|prompt|close-from|chdir|chroot|host|role|type|other-user|command-timeout)$/,
  doas: /^-[uC]$/,
  nice: /^-n$|^--adjustment$/,
  ionice: /^-[cnpPu]$|^--(?:class|classdata|pid|pgid|uid)$/,
  xargs: /^-[IdEnLPsa]$|^--(?:arg-file|delimiter|max-args|max-procs|max-chars|replace|eof)$/,
  timeout: /^-[sk]$|^--(?:signal|kill-after)$/,
  chroot: /^--(?:userspec|groups)$/,
  stdbuf: /^-[ioe]$|^--(?:input|output|error)$/,
  env: /^-[uCS]$|^--(?:unset|chdir|split-string)$/,
  time: /^-[fo]$|^--(?:format|output)$/,
  exec: /^-a$/,
  unshare: /^-[SGRwl]$|^--(?:setuid|setgid|root|wd|map-user|map-group|propagation|setgroups)$/,
  watch: /^-[nq]$|^--(?:interval|equexit)$/,
  nsenter: /^-[tSGrw]$|^--(?:target|setuid|setgid|root|wd)$/,
  setpriv: /^--(?:reuid|regid|groups|inh-caps|ambient-caps|bounding-set|securebits|pdeathsig|selinux-label|apparmor-profile)$/,
  strace: /^-[eoopsuPIEXbS]$/,
  ltrace: /^-[eoopsuPnS]$/,
  flock: /^-[wEc]$|^--(?:timeout|wait|conflict-exit-code|command)$/,
  taskset: /^-[c]$/,
  'systemd-run': /^-[upEH]$|^--(?:unit|property|setenv|host|machine|description|slice|uid|gid|working-directory|on-calendar|on-active)$/,
  runuser: /^-[ugl]$|^--(?:user|group|login)$/,
  pkexec: /^--user$/,
  run0: /^-[ugD]$|^--(?:user|group|chdir|unit|property|description|slice|nice|setenv|background|machine|shell-prompt-prefix|area)$/,
  chrt: /^-[TPD]$|^--(?:sched-runtime|sched-period|sched-deadline)$/,
  cgexec: /^-g$/,
  torsocks: /^-[uapP]$|^--(?:user|pass|address|port)$/,
};
// Command strings given as an option value are checked as commands of their own. Any program:
// `-c STR`, `--command STR`, `--command=STR` (`flock -c "rm -rf /" LOCK`, `script -c "…"`, `find … -exec sh -c "…"`);
// shells, su and runuser also take -c inside a cluster (`bash -lc "…"`, `su -lc "…"`); env -S splits its string.
const CMD_STRING_ANY = /^(?:-c|--command|--session-command)$/;
const CMD_STRING_CLUSTER = /^-[a-zA-Z]*c$/;
const SHELLS = /^(?:ba|z|da|k|fi|c|tc|a|mk|r)?sh$|^busybox$/;
const PRIVILEGED = new Set(['sudo', 'doas', 'su', 'runuser', 'pkexec', 'run0', 'sudoedit']);
// programs whose whole job is to run a command (string): a payload that depends on the shell state cannot be checked
const RUNNERS = new Set(['su', 'runuser', 'flock', 'script', 'eval', 'env', 'watch', 'tmux', 'screen', 'ssh', 'xargs', 'parallel', 'sudo', 'doas',
  'pkexec', 'run0', 'nohup', 'setsid', 'timeout', 'iex', 'invoke-expression', 'cmd', 'pwsh', 'powershell', 'start-process', 'sem']);
const WRAPPERS = new Set(['sudo', 'doas', 'run0', 'command', 'builtin', 'exec', 'nohup', 'time', 'nice', 'ionice', 'then', 'do', 'else', '&', 'busybox', 'toybox', 'xargs', 'timeout', 'chroot', 'stdbuf', 'env', 'setsid', 'unbuffer', 'caffeinate',
  'unshare', 'watch', 'nsenter', 'setpriv', 'strace', 'ltrace', 'flock', 'taskset', 'systemd-run', 'runuser', 'firejail', 'proot', 'fakeroot',
  'pkexec', 'chrt', 'cgexec', 'eatmydata', 'torsocks', 'catchsegv', 'proxychains', 'proxychains4', 'tsocks', 'valgrind', 'faketime', 'ts',
  'chronic', 'nocache', 'trickle', 'numactl', 'schedtool', 'cpulimit', 'prlimit', 'sg', 'newgrp', 'su', 'parallel', 'sem', 'tmux', 'screen',
  'script', 'xvfb-run', 'dbus-launch', 'dbus-run-session', 'expect', 'gdb', 'ssh-agent', 'sshpass', 'with-lock-ex', 'lckdo', 'daemonize', 'start-stop-daemon']);
// programs that run the command at the end of their arguments without being a plain wrapper
const SUFFIX_RUNNERS = new Set(['ssh', 'mosh', 'kubectl', 'docker', 'podman', 'lxc', 'incus', 'machinectl', 'distrobox', 'toolbox', 'flatpak', 'nix-shell', 'firejail', 'bwrap']);

// programs whose arguments are data, never a command they run (`grep -r rm src`, `man rm`, `echo rm -rf /`)
const DATA_ARGS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'sed', 'awk', 'gawk', 'mawk', 'echo', 'printf', 'man', 'which', 'whereis',
  'type', 'whatis', 'apropos', 'help', 'info', 'tldr', 'git', 'cat', 'less', 'more', 'head', 'tail', 'ls', 'find', 'locate', 'tellsh', 'alias',
  'history', 'fc', 'complete', 'compgen', 'hash', 'test', '[', '[[', 'true', 'false', 'printenv', 'set', 'unset', 'export', 'declare', 'local',
  'readonly', 'trap', 'write-host', 'write-output', 'get-help', 'get-command', 'select-string', 'sls', 'findstr', 'wc', 'sort', 'uniq', 'cut',
  'tr', 'diff', 'cmp', 'file', 'stat', 'du', 'df', 'tree', 'jq', 'yq', 'xxd', 'od', 'hexdump', 'strings', 'mkdir', 'touch', 'cd', 'pushd']);
// programs that destroy or change things: after an unknown program they may be the command it runs (`mywrap rm -rf /`)
const DANGER_HEADS = /^(?:rm|rmdir|unlink|shred|wipe|wipefs|mkfs(?:\.\w+)?|mke2fs|dd|truncate|kill|pkill|killall|chmod|chown|chgrp|mv|cp|rsync|find|tar|tee|sh|bash|zsh|dash|ksh|fish|eval|shutdown|reboot|halt|poweroff|crontab|iptables|remove-item|ri|del|erase|rd|format|diskpart|stop-process|format-volume|clear-disk)$/i;

/** Collect `-c STR` style payloads of one simple command into `inner` (`unsure` when a runner's payload cannot be read). */
function payloads(w, inner, flags) {
  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
  if (PRIVILEGED.has(h)) flags.privileged = true;
  // a payload of a program that runs commands (or of `sh -c` inside other arguments: `find … -exec sh -c "…"`)
  // must be readable; `-c` of any other program (`grep -c "$PAT"`) is still checked, without that requirement
  const add = (v, i) => {
    if (v == null) return;
    const prev = String(w[i - 1] ?? '').replace(/^.*[\\/]/, '').toLowerCase();
    const runner = RUNNERS.has(h) || SHELLS.test(h) || SHELLS.test(prev) || /^--(?:command|session-command|split-string)/.test(String(w[i] ?? ''));
    if (!runner) { (flags.lenient ??= []).push(String(v)); return; }
    inner.push(String(v));
    if (/[$`]|^\s*$/.test(String(v))) flags.unsure = `${SHELLS.test(prev) ? prev : h} runs a command string that depends on the shell state (${String(v).slice(0, 40)}); it cannot be checked`;
  };
  for (let i = 1; i < w.length; i++) {
    const x = String(w[i]);
    if (x === '--' && !SHELLS.test(h)) continue;
    const eq = x.match(/^(--(?:command|session-command|split-string))=(.*)$/s);
    if (eq) { add(eq[2], i); continue; }
    if (h === 'pwsh' || h === 'powershell') {
      if (/^-(?:e|ec|en|enc\w*|encodedcommand)$/i.test(x)) { flags.unsure = `${h} -EncodedCommand cannot be checked`; i++; continue; }
      if (/^-(?:c|co\w*|command)$/i.test(x)) { add(w.slice(i + 1).join(' '), i); break; }
      continue;
    }
    if (h === 'cmd' && /^\/[ck]$/i.test(x)) { add(w.slice(i + 1).join(' '), i); break; }
    if (h === 'env' && (x === '-S' || x === '--split-string')) { add(w[i + 1], i); i++; continue; }
    if (CMD_STRING_ANY.test(x) || ((SHELLS.test(h) || h === 'su' || h === 'runuser') && CMD_STRING_CLUSTER.test(x))) {
      // sh -c 'cmd' arg0 args: only the string is the command
      add(w[i + 1], i);
      // its $0, $1, "$@" are the words after it (`sh -c 'rm -rf "$1"' _ /`): also checked with them filled in
      if (SHELLS.test(h) && w[i + 1] != null && w.length > i + 2) inner.push(withPositional(String(w[i + 1]), w.slice(i + 2).map(String)));
      i++;
    }
  }
  if (h === 'eval' || h === 'iex' || h === 'invoke-expression') add(w.slice(1).join(' '), 0);
}

const sq = (x) => `'${x.replace(/'/g, "'\\''")}'`;
/** `sh -c STR arg0 args…`: STR with $0…$9, ${N}, "$@", $@ and $* replaced by the (quoted) arguments. */
function withPositional(str, args) {
  const all = args.slice(1).map(sq).join(' ');
  return str.replace(/"\$@"|"\$\*"|\$@|\$\*/g, all).replace(/"\$\{?(\d)\}?"|\$\{?(\d)\}?/g, (m, a, b) => sq(args[+(a ?? b)] ?? ''));
}

/** The command a wrapper chain runs. `inner` collects command strings given as option values (`su -c "…"`). */
export function commandWords(words, inner = [], flags = {}) {
  let w = words;
  for (;;) {
    while (w.length && /^\w+=/.test(w[0])) w = w.slice(1);
    const h = (w[0] || '').replace(/^.*[\\/]/, '').toLowerCase();
    payloads(w, inner, flags);
    if (!WRAPPERS.has(h)) return w;
    w = w.slice(1);
    const optArg = WRAPPER_OPTARG[h];
    while (w.length && /^-/.test(w[0])) {
      const o = w[0];
      w = w.slice(1);
      if (o === '--') break;
      if (optArg && optArg.test(o)) w = w.slice(1);
    }
    if (h === 'env') while (w.length && /^\w+=/.test(w[0])) w = w.slice(1);
    if (h === 'timeout' && w.length) w = w.slice(1); // DURATION
    if (h === 'chroot' && w.length) w = w.slice(1); // NEWROOT
    if (h === 'flock' && w.length) w = w.slice(1); // LOCKFILE
    if (h === 'taskset' && w.length && /^(?:0x)?[\da-f,-]+$/i.test(w[0])) w = w.slice(1); // MASK (without -c: always one)
    if (h === 'chrt' && w.length && /^\d+$/.test(w[0])) w = w.slice(1); // PRIORITY
  }
}

/**
 * Every command a simple command may run: the wrapper chain as parsed by commandWords, and, because wrapper
 * options are not always understood (`sudo -iu root rm …`, `nice --adjustment=5 rm …`), the command starting
 * at every later non-option word of a wrapper / remote runner (`ssh host rm -rf /`, `docker exec ct rm …`).
 * The checks only ever escalate, so reading too many candidates is safe; missing one is not.
 */
export function commandChains(words, inner, flags) {
  const out = [];
  const push = (w) => { if (w.length && !out.some((o) => o.length === w.length && o.every((x, i) => x === w[i]))) out.push(w); };
  push(commandWords(words, inner, flags));
  const lead = words.findIndex((x) => !/^\w+=/.test(x));
  const h = lead >= 0 ? String(words[lead]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase() : '';
  const remote = SUFFIX_RUNNERS.has(h) && (!['docker', 'podman', 'kubectl', 'lxc', 'incus'].includes(h) || words.some((x) => ['exec', 'run', 'debug', 'create'].includes(x)));
  // an unknown program followed by a destructive command (`mywrap rm -rf /`, `catchsegv2 dd …`): it may run it
  if (h && !WRAPPERS.has(h) && !remote && !DATA_ARGS.has(h)) {
    for (let j = lead + 1; j < words.length - 1; j++) if (DANGER_HEADS.test(String(words[j]).replace(/^.*[\\/]/, '').replace(/\.exe$/i, ''))) push(commandWords(words.slice(j), inner, flags));
  }
  if (WRAPPERS.has(h) || remote) {
    for (let j = lead + 1; j < words.length; j++) {
      if (/^-|^\w+=/.test(words[j])) continue;
      const w = commandWords(words.slice(j), inner, flags);
      push(w);
      // a lone quoted string with spaces is a command (`tmux new "rm -rf /"`, `ssh host "rm -rf /"`)
      if (w.length === 1 && /\s/.test(w[0])) inner.push(w[0]);
    }
  }
  return out;
}

// Lexically normalise a path for the danger checks: `//`, `/./`, a trailing `/.` and `/..` collapse
// (`rm -rf /.`, `rm -rf //`, `rm -r /etc/../`), so they are compared as the directory they name.
// Only absolute, ~ and $HOME paths; a `..` above the home prefix is kept as is.
export function normTarget(t) {
  const s = String(t).trim();
  const m = s.match(/^(\/|~(?=\/|$)|\$\{?HOME\}?(?=\/|$))(.*)$/s);
  if (!m) return s;
  const root = m[1] === '/';
  const parts = [];
  for (const p of m[2].split('/')) {
    if (p === '' || p === '.') continue;
  return { scripts, fromFile };
}
function sedRunsOrWrites(script) {
  const s = String(script);
  let i = 0;
  const skipAddr = () => {
    for (;;) {
      while (i < s.length && /[\s\d$,~+!{]/.test(s[i])) i++;
      if (s[i] === '/' || (s[i] === '\\' && i + 1 < s.length)) {
        const d = s[i] === '/' ? '/' : s[++i];
        for (i++; i < s.length && s[i] !== d; i++) if (s[i] === '\\') i++;
        i++;
        while (i < s.length && /[IM]/.test(s[i])) i++;
        continue;
      }
      return;
    }
  };
  while (i < s.length) {
    skipAddr();
    const c = s[i];
    if (c == null) break;
    if (c === 'e' || c === 'w' || c === 'W') return true;
    if (c === 's' || c === 'y') {
      const d = s[i + 1];
      if (d == null) break;
      let n = 0;
      for (i += 2; i < s.length && n < 2; i++) { if (s[i] === '\\') i++; else if (s[i] === d) n++; }
      if (c === 's') { const fl = s.slice(i).match(/^[^;}\n]*/)[0]; if (/[ewW]/.test(fl)) return true; i += fl.length; }
    } else if (/[aic:bTtrRqQlLv#]/.test(c)) {
      // text / label / file-name arguments run to the end of the line
      while (i < s.length && s[i] !== '\n') i++;
    }
    while (i < s.length && s[i] !== ';' && s[i] !== '\n' && s[i] !== '}') i++;
    i++;
  }
  return false;
}
function sedCheck(w, hit) {
  const { scripts, fromFile } = sedScripts(w.slice(1));
  if (fromFile) hit('high', 'sed reads its script from a file; it cannot be checked');
  if (scripts.some(sedRunsOrWrites)) hit('high', 'sed script runs a shell command or writes a file (e / w)');
}

// kill [-SIG | -s SIG | -n NUM | --signal SIG] [--] pid...   (pid 1 / -1 = init / every process)
function killCheck(words, hit) {
  hit('high', 'terminates processes');
  const a = words.slice(1);
  let i = 0;
  if (a[i] === '-s' || a[i] === '-n' || a[i] === '--signal') i += 2;
  else if (a[i] && /^-/.test(a[i]) && a[i] !== '--' && a[i] !== '-l' && a[i] !== '-L') i += 1;
  if (a[i] === '--') i++;
  if (a.slice(i).some((p) => /^-?1$/.test(p))) hit('high', 'kill -1 / PID 1 kills everything', true);
}

const PS_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*\*?|[\\/]+\*?|\*|~[\\/]*\*?|\$(?:HOME|env:USERPROFILE|env:HOMEDRIVE|env:SystemDrive|env:SystemRoot|env:windir|\{env:USERPROFILE\})[\\/]*\*?|[A-Za-z]:[\\/]+(?:Windows|Users|Program Files(?: \(x86\))?|ProgramData)[\\/]*\*?)$/i;
const PS_REMOVE = /^(?:remove-item|ri|rm|del|erase|rd|rmdir)$/i;

// Remove-Item and its aliases (PowerShell parameter names may be abbreviated: -r, -Rec, -lp, ...)
function removeItemCheck(words, hit) {
  const a = words.slice(1);
  if (a.some((x) => /^\/[sq]$/i.test(x))) return; // cmd.exe syntax, see cmdDelCheck
  hit('high', 'deletes files permanently');
  const isParam = (x, name, min = 2) => /^-\w/.test(x) && x.length - 1 >= Math.min(min, name.length) && name.startsWith(x.slice(1).replace(/:.*$/, '').toLowerCase());
  const recurse = a.some((x) => isParam(x, 'recurse', 1));
  const targets = [];
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    if (isParam(x, 'path', 1) || isParam(x, 'literalpath', 1) || /^-(?:lp|pspath)$/i.test(x)) { if (a[i + 1] != null) targets.push(...a[++i].split(',')); continue; }
    if (/^-/.test(x)) { if (/^-(?:include|exclude|filter|credential|stream)/i.test(x)) i++; continue; }
    targets.push(...x.split(','));
  }
  if (recurse && targets.some((t) => PS_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive Remove-Item on a drive root, home or *', true);
}

const CMD_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*(?:\.|\*?(?:\.\*)?)|[\\/]+(?:\.|\*?)|\*(?:\.\*)?|%(?:USERPROFILE|HOMEDRIVE|HOMEPATH|SystemDrive|SystemRoot|windir)%[\\/]*(?:\.|\*?(?:\.\*)?)|[A-Za-z]:[\\/]+(?:Windows|Users|Program Files(?: \(x86\))?|ProgramData)[\\/]*(?:\.|\*?(?:\.\*)?))$/i;

// cmd.exe rd/rmdir/del/erase (also reached from PowerShell aliases with cmd-style switches)
function cmdDelCheck(words, hit) {
  hit('high', 'deletes files permanently');
  const a = words.slice(1);
  const recursive = a.some((x) => /^\/s$/i.test(x));
  if (recursive && a.filter((x) => !/^\/\w$/.test(x)).some((t) => CMD_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive delete of a drive root or home', true);
}

// /, ~, $HOME, system directories, drive roots (not the relative ., .., * that rm -r also treats as critical)
const critTarget = (t) => { const s = String(t).trim(); return ((POSIX_CRIT_TARGET.test(s) || PS_CRIT_TARGET.test(s)) && !/^(?:\.{1,2}\/*\*?|\*|\.\*|\.\/+\*)$/.test(s)) || sysCrit(s); };
const SYS_PATH = /^\/+(?:etc|boot|bin|sbin|usr|lib\w*|dev|proc|sys)(?:\/|$)/;
const NULL_SRC = /^\/dev\/(?:null|zero|u?random)$/;
const positional = (args) => { const out = []; let opts = true; for (const a of args) { if (opts && a === '--') { opts = false; continue; } if (opts && /^-./.test(a)) continue; out.push(a); } return out; };

// find's own leading options (-H -L -P -O3 -D debugopts) come before the starting points
const findArgs = (w) => { let a = w.slice(1); for (;;) { if (/^-[HLP]$|^-O\d*$/.test(a[0] || '')) a = a.slice(1); else if (a[0] === '-D') a = a.slice(2); else return a; } };

// find ROOT... -delete / -exec rm: bulk deletion; critical on /, ~, C:\ ...
function findCheck(w, hit) {
  const a = findArgs(w);
  const roots = [];
  for (const x of a) { if (/^[-(!]/.test(x)) break; roots.push(x); }
  const del = a.includes('-delete') || a.some((x, i) => /^-(?:exec|execdir|ok|okdir)$/.test(x) && /^(?:\S*\/)?(?:rm|shred|unlink)$/.test(a[i + 1] || ''));
  if (del && roots.some(critTarget)) hit('high', 'bulk deletion under /, ~ or a drive root', true);
}

// rsync --delete … DEST: makes DEST identical to the source, deleting everything else in it
function rsyncCheck(w, hit) {
  const a = w.slice(1);
  if (!a.some((x) => /^--(?:delete|del$|remove-source-files)/.test(x))) return;
  hit('high', 'rsync --delete removes files in the destination');
  const pos = positional(a);
  if (pos.length && critTarget(pos[pos.length - 1])) hit('high', 'rsync --delete onto /, ~ or a drive root', true);
}

// cp/mv/install/ln onto system files; /dev/null (or zero/random) copied over a file destroys it
function copyCheck(w, hit) {
  const pos = positional(w.slice(1));
  if (pos.length < 2) return;
  const dst = pos[pos.length - 1];
  const srcs = pos.slice(0, -1);
  if (SYS_PATH.test(normTarget(dst)) || normTarget(dst) === '/') hit('high', 'overwrites a system file or directory');
  // moving /etc, /usr, ~ ... away is as destructive as deleting them
  if (w[0].replace(/^.*[\\/]/, '') === 'mv') {
    if (srcs.some(critTarget)) hit('high', 'moves a system or home directory away', true);
    else if (srcs.some((x) => SYS_PATH.test(normTarget(x)))) hit('high', 'moves a system file');
  }
  if (srcs.some((s) => NULL_SRC.test(s)) && !/^\/dev\//.test(dst)) hit('high', `overwrites ${dst} with ${srcs.find((s) => NULL_SRC.test(s))}`, SYS_PATH.test(dst));
}

const LISTERS = /^(?:get-childitem|gci|dir|ls|get-item|gi)$/i;
// `Get-ChildItem C:\ -Recurse … | Remove-Item`, `find / … | xargs rm`: listing a root, deleting the results
function pipelineDeleteCheck(text, hit) {
  for (const stmt of String(text).split(/[;\n]|&&|\|\|/)) {
    const segs = stmt.split('|').map((p) => commandWords(simpleCommands(p, { winPaths: true })[0] || []));
    for (let i = 0; i < segs.length - 1; i++) {
      const w = segs[i];
      if (!w.length) continue;
      const head = w[0].replace(/^.*[\\/]/, '').toLowerCase();
      let rootList = false;
      if (head === 'find') { const roots = []; for (const x of findArgs(w)) { if (/^[-(!]/.test(x)) break; roots.push(x); } rootList = roots.some(critTarget); }
      else if (LISTERS.test(head)) {
        const a = w.slice(1);
        const rec = a.some((x) => /^-r(?:e(?:c(?:u(?:r(?:s(?:e)?)?)?)?)?)?$/i.test(x)) || head === 'ls' && a.some((x) => /^-[a-zA-Z]*R/.test(x));
        const targets = [];
        for (let k = 0; k < a.length; k++) {
          if (/^-(?:path|literalpath|lp|pspath)$/i.test(a[k])) { if (a[k + 1] != null) targets.push(a[++k]); continue; }
          if (/^-(?:filter|include|exclude|depth|attributes)$/i.test(a[k])) { k++; continue; }
          if (!/^-/.test(a[k])) targets.push(a[k]);
        }
        rootList = rec && targets.some(critTarget);
      }
      if (!rootList) continue;
      const del = segs.slice(i + 1).some((s) => {
        const h = (s[0] || '').replace(/^.*[\\/]/, '').toLowerCase();
        return PS_REMOVE.test(h) || (h === 'xargs' && s.some((x) => /^(?:\S*\/)?(?:rm|shred)$/.test(x)));
      });
      if (del) hit('high', 'bulk deletion under /, ~ or a drive root', true);
    }
  }
}

// chmod/chown/chgrp -R on /, ~, * ... (options may come in any order: chmod -R -v 777 ~); without -R on /, ~ or a
// system directory (`chmod 000 /`, `chmod 000 /etc`, `chown nobody /`): the system stops working
function permCheck(w, hit) {
  const a = w.slice(1);
  const targets = positional(a).slice(1);
  if (!a.some((x) => /^-[a-zA-Z]*R[a-zA-Z]*$/.test(x) || x === '--recursive')) {
    if (targets.some((t) => TOP_DIR.test(normTarget(t)) || /^[A-Za-z]:[\\/]*$/.test(String(t).trim()))) hit('high', 'permission/owner change on / or a system directory', true);
    else if (targets.some((t) => SYS_PATH.test(normTarget(t)) || /^(?:~|\$\{?HOME\}?)$/.test(normTarget(t)))) hit('high', 'changes permissions/owner of a system file or the home directory');
    return;
  }
  if (targets.some(critTarget)) hit('high', 'recursive permission/owner change on /, ~ or *', true);
}

// / and the top-level system directories themselves
const TOP_DIR = /^(?:\/|\/(?:bin|boot|dev|etc|home|lib\w*|opt|proc|root|sbin|srv|sys|usr|var|System|Users|Library|Applications|private))$/;
// whole disk devices (writing to them destroys the filesystem on them)
const RAW_DISK = /^\/dev\/(?:sd|hd|vd|xvd|nvme|mmcblk|disk|rdisk|md|dm-|mapper\/|loop)\w*/;
// tee/cp/install/sponge/pv … onto a whole disk device (`cat x | sudo tee /dev/sda`)
function rawDiskWriteCheck(w, hit) {
  if (positional(w.slice(1)).some((x) => RAW_DISK.test(normTarget(x)))) hit('high', 'writes onto a raw disk device', true);
}

// Interpreters running inline code (`python3 -c`, `perl -e`, `ruby -e`, `node -e`, `php -r`, awk programs that call
// system()): the code is not shell and cannot be checked, so it is high. Its string literals are checked as commands
// (`system("rm -rf /")`) and file-deleting calls on /, ~ or a system directory (`shutil.rmtree('/')`) are critical.
const INTERP_CODE = [
  [/^(?:python[\d.]*|pypy[\d.]*)$/, /^-[a-zA-Z]*c$/],
  [/^perl[\d.]*$/, /^-[a-zA-Z]*[eE]$/],
  [/^(?:ruby|jruby)[\d.]*$/, /^-[a-zA-Z]*e$/],
  [/^(?:node|nodejs|bun)$/, /^(?:-e|-p|-pe|--eval|--print)$/],
  [/^php[\d.]*$/, /^-r$/],
  [/^(?:lua[\d.]*|luajit|julia|rscript|osascript|tclsh)$/, /^-e$/],
];
const AWK = /^(?:awk|gawk|mawk|nawk|busybox-awk)$/;
const DELETE_CALL = /\b(?:rmtree|rm_rf|rm_r|rmdir|removedirs|rmSync|rmdirSync|unlink(?:Sync)?|remove|rm|delete|chmod|chown|chmodSync|chownSync)\s*\(?\s*(?:path\s*=\s*)?[rb]?['"]([^'"]*)['"]/g;
function inlineCode(w) {
  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
  if (AWK.test(h)) {
    const a = w.slice(1);
    for (let i = 0; i < a.length; i++) {
      if (/^-[Fvf]$/.test(a[i])) { if (a[i] === '-f') return null; i++; continue; }
      if (/^-/.test(a[i])) continue;
test/regressions21.test.js:44:    cmd: ['gh pr view 45 & set GH_REPO=', 'gh pr view 45 && set GH_HOST='],
src/pipeline.js:80:  name: WORDISH, service: WORDISH, container: WORDISH, cmd: WORDISH,
test/regressions3-render.test.js:11:import { cmdQuote, pwshNativeSlots } from '../src/render.js';
test/regressions3-render.test.js:135:test('cmd: a value starting with / is fine when glued to a switch (findstr /c:), refused standalone', () => {
test/regressions3-render.test.js:142:  assert.throws(() => cmdQuote('/q'), /switch/);
test/regressions3-render.test.js:145:test('cmd: an embedded / is never left unquoted (foo/q is not read as foo /q)', () => {
test/regressions3-render.test.js:146:  assert.equal(cmdQuote('foo/q'), 'foo\\q'); // path: Windows separator
test/regressions3-render.test.js:147:  assert.equal(cmdQuote('a/q', { tilde: false }), '"a/q"'); // other values: quoted
src/catalog.js:154:  T('which_cmd', 'Locate a command executable', 'which -a {cmd}', { cmd: null }),
src/catalog.js:267:  T('tool_version', 'Show the installed version of a command-line tool', '{cmd} --version', { cmd: null }),
src/catalog.js:268:  T('cli_help', 'Show the built-in help (--help) of a command', '{cmd} --help', { cmd: null }),
src/env.js:13:  fish: 'fish', cmd: 'cmd', 'cmd.exe': 'cmd',
src/fill.js:488:const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
src/fill.js:878:  if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
src/fill.js:879:  return quote(val, { tilde: PATH_SLOTS.has(name), name });
src/fill.js:964:    for (const k of PATH_SLOTS) if (values[k] === '/') values[k] = 'C:\\';
src/fill.js:999:        if (!PATH_SLOTS.has(k) && !RAW_OK[k] && typeof v === 'string' && /^-/.test(v)) { missing.push(k); vals[k] = PLACEHOLDER(k); }
src/fill.js:1001:      const pathVals = new Set([...PATH_SLOTS].filter((k) => vals[k] != null).map((k) => String(vals[k])));
src/fill.js:1004:        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { tilde: isPath });
src/fill.js:1027:  const plain = used.every((k) => !(k in values) || plainSlotValue(k, values[k], { dashOk: PATH_SLOTS.has(k) || (!!RAW_OK[k] && RAW_OK[k](values[k])) }));
test/regressions.test.js:12:import { shQuote, psQuote, cmdQuote } from '../src/render.js';
test/regressions.test.js:264:  assert.throws(() => cmdQuote('%PATH%'));
test/regressions.test.js:268:  assert.equal(cmdQuote('~/Downloads'), '"%USERPROFILE%\\Downloads"');
test/regressions.test.js:321:  const SAMPLE = { path: '/tmp/d', file: 'f.txt', name: 'node', pattern: 'x', service: 'nginx', container: 'web', pkg: 'htop', cmd: 'git',
src/history.js:31:    cmd: [],
src/history.js:67:      const m = l.match(/^- cmd: (.*)$/);
test/regressions2.test.js:19:import { shQuote, psQuote, cmdQuote, pwshNativeSlots } from '../src/render.js';
test/regressions2.test.js:235:test('cmd: values starting with / are refused (switches); /s /c gets wrapping quotes', () => {
test/regressions2.test.js:239:  assert.throws(() => cmdQuote('/q'), /switch/);
test/regressions2.test.js:261:  assert.equal(shQuote('~', { tilde: false }), "'~'");
test/regressions2.test.js:262:  assert.equal(psQuote('~/x', { tilde: false }), "'~/x'");
test/devtools.test.js:64:  const R = { script: 'dev', pkg: 'requests', cmd: 'node', start: 10, end: 20, file: 'app.log', port: 5432, target: 'db.example.com', num: 42, pr: 42 };
test/matrix.test.js:55:test('cmd: type nul >> (touch) and 2>nul are not writes; other redirects are; nul is a plain file outside Windows shells', () => {
test/matrix.test.js:77:test('cmd: mkdir -p semantics, dotfiles in hidden_files, no admin-only disk_free', () => {
test/matrix.test.js:160:test('cmd: type nul >> a & a real redirect stays a write', () => {
test/matrix.test.js:175:test('cmd: ~ paths become a double-quoted %USERPROFILE% (a user name may contain a space)', async () => {
test/matrix.test.js:176:  const { cmdQuote, psQuote } = await import('../src/render.js');
test/matrix.test.js:177:  assert.equal(cmdQuote('~'), '"%USERPROFILE%"');
test/matrix.test.js:178:  assert.equal(cmdQuote('~/foo'), '"%USERPROFILE%\\foo"');
test/matrix.test.js:179:  assert.equal(cmdQuote('~/my docs'), '"%USERPROFILE%\\my docs"');
test/matrix.test.js:190:test('cmd: a quoted path ending in \\ ends in \\. instead (MSVC argv would read \\" as a literal quote)', async () => {
test/matrix.test.js:191:  const { cmdQuote } = await import('../src/render.js');
test/matrix.test.js:192:  assert.equal(cmdQuote('~/'), '"%USERPROFILE%\\."');
test/matrix.test.js:193:  assert.equal(cmdQuote('~/Downloads/'), '"%USERPROFILE%\\Downloads\\."');
test/matrix.test.js:194:  assert.equal(cmdQuote('my docs/'), '"my docs\\."');
test/matrix.test.js:197:  assert.equal(cmdQuote('docs/'), 'docs\\');
test/matrix.test.js:206:test('cmd: a non-path value ending in \\ is a gap, never silently rewritten', async () => {
test/matrix.test.js:207:  const { cmdQuote, UnquotableError } = await import('../src/render.js');
test/matrix.test.js:208:  assert.throws(() => cmdQuote('Document C:\\', { tilde: false }), UnquotableError);
test/matrix.test.js:209:  assert.equal(cmdQuote('a\\', { tilde: false }), 'a\\');
src/slots.js:485:  cmd: set('which where gdzie location lokalizacja path sciezka sciezke command komenda komendy polecenie polecenia binary binarka executable program programu jest is version wersja wersje wersji help pomoc usage manual flags flagi options opcje'),
src/slots.js:506:const TAG_OF = { name: 'NAME', service: 'NAME', container: 'NAME', pkg: 'NAME', cmd: 'NAME', script: 'NAME', branch: 'BRANCH',
src/tools.js:91:  name: 'NAME', service: 'NAME', container: 'NAME', pkg: 'NAME', cmd: 'NAME', script: 'NAME', start: 'NUM', end: 'NUM', num: 'NUM', pr: 'NUM', branch: 'BRANCH', user: 'USER',
test/pipeline.test.js:88:  assert.deepEqual(parseHistory('- cmd: ls -la\n  when: 1700\n- cmd: git status\n', 'fish'), ['ls -la', 'git status']);
test/shells.test.js:8:import { shQuote, fishQuote, psQuote, cmdQuote } from '../src/render.js';
test/shells.test.js:16:  service: 'nginx', container: 'web', pkg: 'htop', cmd: 'git', var: 'HOME', branch: 'feature/x', user: 'www-data',
test/shells.test.js:98:test('cmd: best-effort coverage is reported, gaps carry a reason', () => {
test/shells.test.js:124:  assert.throws(() => cmdQuote('a "b"'), /cmd.exe/);
test/shells.test.js:125:  assert.throws(() => cmdQuote('%PATH%'), /cmd.exe/);
test/shells.test.js:126:  assert.equal(cmdQuote('a b'), '"a b"');
test/shells.test.js:127:  assert.equal(cmdQuote('~/Downloads'), '"%USERPROFILE%\\Downloads"');
src/render.js:19:export function shQuote(value, { tilde: expand = true } = {}) {
src/render.js:29:export function fishQuote(value, { tilde: expand = true } = {}) {
src/render.js:48:export function psQuote(value, { tilde: expand = true } = {}) {
src/render.js:67:export function cmdQuote(value, { tilde: expand = true, attached = false } = {}) {
src/render.js:92:export const QUOTE = { bash: shQuote, zsh: shQuote, sh: shQuote, fish: fishQuote, powershell: psQuote, cmd: cmdQuote };
src/render.js:128:        return cmdQuote(h.v, { tilde: false, attached: true });
src/render.js:189:export const quoteForKind =(kind, wrapPosix) => (wrapPosix ? shQuote : { posix: shQuote, fish: fishQuote, pwsh: psQuote, cmd: cmdQuote }[kind]);
test/regressions27.test.js:94:  assert.equal(buildCommand('tool_version', '', { env: BASH, resolved: { cmd: 'node' } }).risk, 'safe');
test/regressions25.test.js:146:    cmd: 'node', branch: 'dev', user: 'bob', pattern: 'err', host: 'example.com', target: 'example.com', message: 'msg', url: 'https://x.org/r.git',
src/cli.js:135:const PROMPT = { powershell: 'PS> ', cmd: '> ', fish: '> ' };
src/compose.js:408:  const q = (v) => shQuote(v, { tilde: false });
src/variants.js:35:    gaps: { cmd: 'cmd.exe cannot sort files by size across subdirectories' },
src/variants.js:41:    gaps: { cmd: 'cmd.exe cannot sum and sort directory sizes' },
src/variants.js:45:    gaps: { cmd: 'fsutil volume diskfree needs an elevated prompt; use PowerShell (Get-PSDrive)' },
src/variants.js:49:    cmd: 'dir /s /a {path}',
src/variants.js:53:    cmd: 'where /r {path} {namepat}',
src/variants.js:57:    cmd: 'where /r {path} {glob}',
src/variants.js:61:    gaps: { cmd: 'forfiles only filters by whole days, not by an arbitrary time window' },
src/variants.js:65:    cmd: 'forfiles /p {path} /s /d -{days!raw}«/m {glob}» /c "cmd /c if @isdir==FALSE echo @path"',
src/variants.js:70:    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize GTR {sizeBytes!raw} echo @path @fsize"',
src/variants.js:75:    cmd: 'forfiles /p {path} /s«/m {glob}» /c "cmd /c if @isdir==FALSE if @fsize LSS {sizeBytes!raw} echo @path"',
src/variants.js:80:    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /n /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
src/variants.js:85:    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /m /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
src/variants.js:89:    cmd: 'find /c /v "" {file}',
src/variants.js:93:    gaps: { cmd: 'no reliable way to concatenate files recursively and count lines in cmd.exe' },
src/variants.js:97:    cmd: (s, q) => `where /r ${q(s.path ?? '.')} ${s.glob ? q(s.glob) : '*'} | find /c /v ""`,
src/variants.js:101:    gaps: { cmd: 'cmd.exe has no word counter' },
src/variants.js:105:    gaps: { cmd: 'cmd.exe has no uniq/group-by equivalent' },
src/variants.js:110:    gaps: { cmd: 'dir /o-d sorts only within each directory, not recursively' },
src/variants.js:114:    cmd: 'forfiles /p {path} /s /c "cmd /c if @isdir==FALSE if @fsize==0 echo @path"',
src/variants.js:118:    gaps: { cmd: 'cmd.exe cannot test directories for emptiness recursively' },
src/variants.js:124:    gaps: { cmd: 'cmd.exe cannot hash and group files' },
src/variants.js:129:    cmd: 'dir /s /al {path}',
src/variants.js:134:    gaps: { cmd: 'cmd.exe cannot check symlink targets' },
src/variants.js:138:    cmd: 'dir /a {path}',
src/variants.js:142:    gaps: { cmd: 'tree has no depth limit' },
src/variants.js:147:    cmd: 'pushd {path} && (dir /a:h /b 2>nul & dir /a /b .* & popd)',
src/variants.js:152:    gaps: { cmd: 'no file(1) equivalent on Windows' },
src/variants.js:156:    cmd: 'dir /a /q {file}',
src/variants.js:160:    gaps: { cmd: 'cmd.exe has no head equivalent' },
src/variants.js:164:    gaps: { cmd: 'cmd.exe has no tail equivalent' },
src/variants.js:168:    gaps: { cmd: 'cmd.exe cannot follow a file' },
src/variants.js:172:    cmd: 'type {file}',
src/variants.js:176:    gaps: { cmd: 'cmd.exe has no command that prints a line range of a file' },
src/variants.js:180:    cmd: 'tar -czvf {archive} {path}',
src/variants.js:185:    cmd: '«mkdir {dest} 2>nul & »tar -xzvf {file}«-C {dest}»',
src/variants.js:191:    cmd: 'tar -a -c -f {archive} {path}', // bsdtar picks zip format from the .zip suffix
src/variants.js:195:    cmd: '«mkdir {dest} 2>nul & »tar -xf {file}«-C {dest}»',
src/variants.js:200:    cmd: 'tar -tvf {file}',
src/variants.js:204:    gaps: { pwsh: 'Windows: no POSIX permission bits (use icacls)', cmd: 'no POSIX permission bits (use icacls)' },
src/variants.js:208:    gaps: { pwsh: 'Windows: no executable bit (determined by file extension)', cmd: 'no executable bit (determined by file extension)' },
src/variants.js:212:    cmd: 'icacls {path} /setowner {user} /T',
src/variants.js:217:    cmd: 'copy /-y {src} {dst}',
src/variants.js:222:    cmd: 'move /-y {src} {dst}',
src/variants.js:226:    cmd: 'del {file}',
src/variants.js:230:    cmd: 'rmdir /s {path}',
src/variants.js:235:    cmd: 'pushd {path} && (del /s {glob} & popd)',
src/variants.js:243:    cmd: (s, q) => { const p = q(s.path); const dir = /"$/.test(p) ? p.slice(0, -1) + '\\"' : p + '\\'; return `if not exist ${dir} mkdir ${p}`; },
src/variants.js:247:    cmd: 'type nul >> {file}',
src/variants.js:251:    cmd: 'cd',
src/variants.js:255:    cmd: 'mklink {dst} {src}',
src/variants.js:262:    cmd: 'fc {src} {dst}',
src/variants.js:266:    gaps: { cmd: 'cmd.exe has no in-place text replacement' },
src/variants.js:271:    cmd: 'mountvol',
src/variants.js:276:    gaps: { cmd: 'wmic is deprecated/removed and diskpart needs admin' },
src/variants.js:280:    cmd: 'certutil -hashfile {file} SHA256',
src/variants.js:284:    cmd: 'certutil -hashfile {file} MD5',
src/variants.js:290:    gaps: { cmd: 'certutil -encode writes to a file with PEM headers, not to stdout' },
src/variants.js:296:    gaps: { cmd: 'certutil -decode writes to a file, not to stdout' },
src/variants.js:303:    gaps: { cmd: 'tasklist cannot sort by CPU usage' },
src/variants.js:308:    cmd: 'tasklist | sort /r /+65', // Mem Usage column is right-aligned starting at column 65
src/variants.js:312:    cmd: 'tasklist | findstr /i {name}',
src/variants.js:316:    cmd: (s, q) => `taskkill /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`)}`,
src/variants.js:320:    cmd: (s, q) => `taskkill /f /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`)}`,
src/variants.js:325:    cmd: 'taskkill /pid {pid!raw}',
src/variants.js:330:    cmd: 'for /f "tokens=5" %p in (\'netstat -ano ^| findstr /r /c:":{port!raw} .*LISTENING"\') do taskkill /pid %p',
src/variants.js:335:    cmd: 'netstat -ano | findstr LISTENING',
src/variants.js:340:    cmd: 'netstat -ano | findstr :{port!raw}',
src/variants.js:345:    cmd: 'netstat -an | findstr ESTABLISHED',
src/variants.js:350:    gaps: { cmd: 'tasklist has no parent PID (wmic is deprecated)' },
src/variants.js:356:    cmd: 'systeminfo',
src/variants.js:360:    cmd: 'ver',
src/variants.js:364:    cmd: 'ver',
src/variants.js:368:    cmd: 'systeminfo | findstr /c:"Physical Memory"',
src/variants.js:373:    cmd: 'echo %PROCESSOR_IDENTIFIER% & echo %NUMBER_OF_PROCESSORS%',
src/variants.js:377:    cmd: 'echo %NUMBER_OF_PROCESSORS%',
src/variants.js:381:    cmd: 'systeminfo | findstr /c:"Boot Time"',
src/variants.js:385:    cmd: 'hostname',
src/variants.js:389:    cmd: 'whoami',
src/variants.js:393:    cmd: 'query user',
src/variants.js:399:    gaps: { cmd: 'logon events need wevtutil with an XPath query on the Security log (admin)' },
src/variants.js:403:    cmd: 'set',
src/variants.js:407:    cmd: 'echo %{var!raw}%',
src/variants.js:409:  which_cmd: {
src/variants.js:411:    cmd: 'where {cmd}',
src/variants.js:416:    cmd: 'echo %PATH:;=&echo.%',
src/variants.js:423:    cmd: 'doskey /history | findstr /i /c:{pattern}',
src/variants.js:427:    cmd: 'echo %DATE% %TIME%',
src/variants.js:431:    cmd: 'tzutil /g',
src/variants.js:435:    gaps: { pwsh: 'Windows: no built-in calendar command', cmd: 'no built-in calendar command' },
src/variants.js:439:    cmd: 'schtasks /query',
src/variants.js:443:    cmd: 'taskschd.msc',
src/variants.js:447:    gaps: { cmd: 'wevtutil cannot filter events by message text' },
src/variants.js:451:    cmd: 'wevtutil qe System /q:"*[System[(Level=1 or Level=2)]]" /c:{count!raw} /rd:true /f:text',
src/variants.js:455:    cmd: 'sc query {service}',
src/variants.js:459:    cmd: 'net stop {service} && net start {service}',
src/variants.js:463:    cmd: 'net stop {service}',
src/variants.js:467:    cmd: 'net start {service}',
src/variants.js:472:    cmd: 'sc config {service} start= auto && net start {service}',
src/variants.js:476:    cmd: 'net start',
src/variants.js:481:    gaps: { cmd: 'sc query cannot filter by start mode' },
src/variants.js:485:    cmd: 'wevtutil qe System /c:{count!raw} /rd:true /f:text',
src/variants.js:492:    gaps: { cmd: 'powercfg /batteryreport only writes an HTML report' },
src/variants.js:496:    gaps: { cmd: 'no temperature sensors access from cmd.exe' },
src/variants.js:500:    gaps: { cmd: 'wmic is deprecated; dxdiag only writes a report file' },
src/variants.js:504:    gaps: { cmd: 'no reliable USB device listing in cmd.exe (pnputil output varies by build)' },
src/variants.js:508:    cmd: 'winget install {pkg}',
src/variants.js:512:    cmd: 'winget list {pkg}',
src/variants.js:516:    cmd: 'winget upgrade --all',
src/variants.js:523:    cmd: 'ipconfig',
src/variants.js:527:    cmd: 'curl -s https://ifconfig.me & echo.',
src/variants.js:531:    cmd: 'ping -n {count!raw} {host}',
src/variants.js:536:    cmd: 'nslookup {host}',
src/variants.js:540:    cmd: 'tracert {host}',
src/variants.js:544:    cmd: 'route print',
src/variants.js:549:    gaps: { cmd: 'no TCP port probe in cmd.exe (telnet client is not installed by default)' },
src/variants.js:554:    cmd: 'curl -sI {url}',
src/variants.js:558:    cmd: 'curl -s -o NUL -w "%{http_code}\\n" {url}',
src/variants.js:562:    cmd: 'curl -fLO {url}',
src/variants.js:566:    cmd: 'ssh {target}',
src/variants.js:570:    cmd: 'ssh -N -L {port!raw}:{rhost!raw}:{rport!raw} {target}',
src/variants.js:574:  git_status: { pwsh: 'git status', cmd: 'git status' },
src/variants.js:577:    cmd: 'git log --oneline --graph --decorate -n {count!raw}',
src/variants.js:582:    cmd: 'git diff«-- {file}»',
src/variants.js:584:  git_diff_staged: { pwsh: 'git diff --staged', cmd: 'git diff --staged' },
src/variants.js:585:  git_branches: { pwsh: 'git branch -a', cmd: 'git branch -a' },
src/variants.js:586:  git_current_branch: { pwsh: 'git branch --show-current', cmd: 'git branch --show-current' },
src/variants.js:587:  git_new_branch: { pwsh: 'git checkout -b {branch}', cmd: 'git checkout -b {branch}' },
src/variants.js:588:  git_switch_branch: { pwsh: 'git checkout {branch}', cmd: 'git checkout {branch}' },

exec
/bin/bash -lc "sed -n '1,155p' src/danger.js
sed -n '280,475p' src/danger.js" in /workspace/tellsh
exec
/bin/bash -lc "sed -n '840,1070p' src/fill.js" in /workspace/tellsh
 succeeded in 0ms:
// Dangerous-pattern checker. Runs on every final command (including user-edited ones)
// and can only ever escalate risk, never lower it. Whether a command can be safe at all is the
// trust rule at the end of this file (checkDanger): only tellsh's own catalog renders with plain values.
//
// Regex rules run on the command text after `git`/`docker` global options are removed
// (`git -C /repo -c x=y reset --hard` is checked as `git reset --hard`). Structural rules
// (rm, kill, Remove-Item, rd/del) tokenize each simple command so long options, quoted targets
// and `--` are understood.

import { ALLOW } from './allowlist-data.js';

const RANK = { safe: 0, medium: 1, high: 2 };
export const maxRisk = (a, b) => (RANK[b] > RANK[a] ? b : a);

// ---------------------------------------------------------------------------------------------
// light tokenizer: simple commands separated by ; & | && || ( ) and newlines, words unquoted
// (POSIX '…' "…" \x and PowerShell `x). Good enough for danger checks, not a full shell parser.

// PowerShell also treats the typographic quotes as quote characters (about_Quoting_Rules)
const PS_SQ = /['\u2018\u2019\u201A\u201B]/;
const PS_DQ = /["\u201C\u201D\u201E]/;

// $'…' (bash, zsh, ksh): the index of its closing quote (`\'` does not close it)
const ansiEnd = (s, i) => { let j = i + 2; while (j < s.length && s[j] !== "'") j += s[j] === '\\' ? 2 : 1; return Math.min(j, s.length); };
const ANSI_ESC = { n: '\n', t: '\t', r: '\r', a: '\x07', b: '\b', e: '\x1b', E: '\x1b', f: '\f', v: '\v' };

// winPaths: backslash is never an escape (cmd.exe / PowerShell paths such as "C:\"), and the
// PowerShell typographic quotes ‘…’ “…” quote like ' and "
export function simpleCommands(cmd, { winPaths = false } = {}) {
  const out = [];
  let words = [];
  let w = null;
  const flushWord = () => { if (w != null) { words.push(w); w = null; } };
  const flushCmd = () => { flushWord(); if (words.length) out.push(words); words = []; };
  const s = String(cmd);
  const isSq = (c) => (winPaths ? PS_SQ.test(c) : c === "'");
  const isDq = (c) => (winPaths ? PS_DQ.test(c) : c === '"');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (!winPaths && c === '$' && s[i + 1] === "'") {
      // bash ANSI-C quoting $'…': a backslash escapes the next character, also a quote (`$'\''` is one ')
      const end = ansiEnd(s, i);
      w = (w ?? '') + s.slice(i + 2, end).replace(/\\(.)/gs, (m, x) => ANSI_ESC[x] ?? x);
      i = end;
    } else if (isSq(c)) {
      let j = i + 1;
      while (j < s.length && !isSq(s[j])) j++;
      const end = j;
      w = (w ?? '') + s.slice(i + 1, end);
      i = end;
    } else if (isDq(c)) {
      let v = '';
      let j = i + 1;
      for (; j < s.length && !isDq(s[j]); j++) {
        if (((!winPaths && s[j] === '\\' && /[$`"\\\n]/.test(s[j + 1])) || s[j] === '`') && j + 1 < s.length) v += s[++j]; else v += s[j];
      }
      w = (w ?? '') + v;
      i = j;
    } else if (!winPaths && c === '\\' && i + 1 < s.length && !/[A-Za-z0-9_.%$~*]/.test(s[i + 1])) {
      w = (w ?? '') + s[++i]; // POSIX escape (keeps Windows paths like C:\Users intact)
    } else if ((c === '{' || c === '}') && w == null && (i + 1 >= s.length || /\s/.test(s[i + 1]))) {
      flushCmd(); // standalone { } = command group / script block
    } else if (/\s/.test(c)) {
      if (c === '\n') flushCmd(); else flushWord();
    } else if (/[;&|()]/.test(c)) {
      flushCmd();
    } else {
      w = (w ?? '') + c;
    }
  }
  flushCmd();
  return out;
}

// strip wrappers that run their argument as the command (sudo, timeout N, chroot DIR, env A=b, ...)
// options of each wrapper that take a separate value
const WRAPPER_OPTARG = {
  sudo: /^-[ugpCDhrtTUR]$|^--(?:user|group|prompt|close-from|chdir|chroot|host|role|type|other-user|command-timeout)$/,
  doas: /^-[uC]$/,
  nice: /^-n$|^--adjustment$/,
  ionice: /^-[cnpPu]$|^--(?:class|classdata|pid|pgid|uid)$/,
  xargs: /^-[IdEnLPsa]$|^--(?:arg-file|delimiter|max-args|max-procs|max-chars|replace|eof)$/,
  timeout: /^-[sk]$|^--(?:signal|kill-after)$/,
  chroot: /^--(?:userspec|groups)$/,
  stdbuf: /^-[ioe]$|^--(?:input|output|error)$/,
  env: /^-[uCS]$|^--(?:unset|chdir|split-string)$/,
  time: /^-[fo]$|^--(?:format|output)$/,
  exec: /^-a$/,
  unshare: /^-[SGRwl]$|^--(?:setuid|setgid|root|wd|map-user|map-group|propagation|setgroups)$/,
  watch: /^-[nq]$|^--(?:interval|equexit)$/,
  nsenter: /^-[tSGrw]$|^--(?:target|setuid|setgid|root|wd)$/,
  setpriv: /^--(?:reuid|regid|groups|inh-caps|ambient-caps|bounding-set|securebits|pdeathsig|selinux-label|apparmor-profile)$/,
  strace: /^-[eoopsuPIEXbS]$/,
  ltrace: /^-[eoopsuPnS]$/,
  flock: /^-[wEc]$|^--(?:timeout|wait|conflict-exit-code|command)$/,
  taskset: /^-[c]$/,
  'systemd-run': /^-[upEH]$|^--(?:unit|property|setenv|host|machine|description|slice|uid|gid|working-directory|on-calendar|on-active)$/,
  runuser: /^-[ugl]$|^--(?:user|group|login)$/,
  pkexec: /^--user$/,
  run0: /^-[ugD]$|^--(?:user|group|chdir|unit|property|description|slice|nice|setenv|background|machine|shell-prompt-prefix|area)$/,
  chrt: /^-[TPD]$|^--(?:sched-runtime|sched-period|sched-deadline)$/,
  cgexec: /^-g$/,
  torsocks: /^-[uapP]$|^--(?:user|pass|address|port)$/,
};
// Command strings given as an option value are checked as commands of their own. Any program:
// `-c STR`, `--command STR`, `--command=STR` (`flock -c "rm -rf /" LOCK`, `script -c "…"`, `find … -exec sh -c "…"`);
// shells, su and runuser also take -c inside a cluster (`bash -lc "…"`, `su -lc "…"`); env -S splits its string.
const CMD_STRING_ANY = /^(?:-c|--command|--session-command)$/;
const CMD_STRING_CLUSTER = /^-[a-zA-Z]*c$/;
const SHELLS = /^(?:ba|z|da|k|fi|c|tc|a|mk|r)?sh$|^busybox$/;
const PRIVILEGED = new Set(['sudo', 'doas', 'su', 'runuser', 'pkexec', 'run0', 'sudoedit']);
// programs whose whole job is to run a command (string): a payload that depends on the shell state cannot be checked
const RUNNERS = new Set(['su', 'runuser', 'flock', 'script', 'eval', 'env', 'watch', 'tmux', 'screen', 'ssh', 'xargs', 'parallel', 'sudo', 'doas',
  'pkexec', 'run0', 'nohup', 'setsid', 'timeout', 'iex', 'invoke-expression', 'cmd', 'pwsh', 'powershell', 'start-process', 'sem']);
const WRAPPERS = new Set(['sudo', 'doas', 'run0', 'command', 'builtin', 'exec', 'nohup', 'time', 'nice', 'ionice', 'then', 'do', 'else', '&', 'busybox', 'toybox', 'xargs', 'timeout', 'chroot', 'stdbuf', 'env', 'setsid', 'unbuffer', 'caffeinate',
  'unshare', 'watch', 'nsenter', 'setpriv', 'strace', 'ltrace', 'flock', 'taskset', 'systemd-run', 'runuser', 'firejail', 'proot', 'fakeroot',
  'pkexec', 'chrt', 'cgexec', 'eatmydata', 'torsocks', 'catchsegv', 'proxychains', 'proxychains4', 'tsocks', 'valgrind', 'faketime', 'ts',
  'chronic', 'nocache', 'trickle', 'numactl', 'schedtool', 'cpulimit', 'prlimit', 'sg', 'newgrp', 'su', 'parallel', 'sem', 'tmux', 'screen',
  'script', 'xvfb-run', 'dbus-launch', 'dbus-run-session', 'expect', 'gdb', 'ssh-agent', 'sshpass', 'with-lock-ex', 'lckdo', 'daemonize', 'start-stop-daemon']);
// programs that run the command at the end of their arguments without being a plain wrapper
const SUFFIX_RUNNERS = new Set(['ssh', 'mosh', 'kubectl', 'docker', 'podman', 'lxc', 'incus', 'machinectl', 'distrobox', 'toolbox', 'flatpak', 'nix-shell', 'firejail', 'bwrap']);

// programs whose arguments are data, never a command they run (`grep -r rm src`, `man rm`, `echo rm -rf /`)
const DATA_ARGS = new Set(['grep', 'egrep', 'fgrep', 'rg', 'ag', 'ack', 'sed', 'awk', 'gawk', 'mawk', 'echo', 'printf', 'man', 'which', 'whereis',
  'type', 'whatis', 'apropos', 'help', 'info', 'tldr', 'git', 'cat', 'less', 'more', 'head', 'tail', 'ls', 'find', 'locate', 'tellsh', 'alias',
  'history', 'fc', 'complete', 'compgen', 'hash', 'test', '[', '[[', 'true', 'false', 'printenv', 'set', 'unset', 'export', 'declare', 'local',
  'readonly', 'trap', 'write-host', 'write-output', 'get-help', 'get-command', 'select-string', 'sls', 'findstr', 'wc', 'sort', 'uniq', 'cut',
  'tr', 'diff', 'cmp', 'file', 'stat', 'du', 'df', 'tree', 'jq', 'yq', 'xxd', 'od', 'hexdump', 'strings', 'mkdir', 'touch', 'cd', 'pushd']);
// programs that destroy or change things: after an unknown program they may be the command it runs (`mywrap rm -rf /`)
const DANGER_HEADS = /^(?:rm|rmdir|unlink|shred|wipe|wipefs|mkfs(?:\.\w+)?|mke2fs|dd|truncate|kill|pkill|killall|chmod|chown|chgrp|mv|cp|rsync|find|tar|tee|sh|bash|zsh|dash|ksh|fish|eval|shutdown|reboot|halt|poweroff|crontab|iptables|remove-item|ri|del|erase|rd|format|diskpart|stop-process|format-volume|clear-disk)$/i;

/** Collect `-c STR` style payloads of one simple command into `inner` (`unsure` when a runner's payload cannot be read). */
function payloads(w, inner, flags) {
  const h = (w[0] || '').replace(/^.*[\\/]/, '').replace(/\.exe$/i, '').toLowerCase();
  if (PRIVILEGED.has(h)) flags.privileged = true;
  // a payload of a program that runs commands (or of `sh -c` inside other arguments: `find … -exec sh -c "…"`)
  // must be readable; `-c` of any other program (`grep -c "$PAT"`) is still checked, without that requirement
  const add = (v, i) => {
    if (v == null) return;
    const prev = String(w[i - 1] ?? '').replace(/^.*[\\/]/, '').toLowerCase();
    const runner = RUNNERS.has(h) || SHELLS.test(h) || SHELLS.test(prev) || /^--(?:command|session-command|split-string)/.test(String(w[i] ?? ''));
    if (!runner) { (flags.lenient ??= []).push(String(v)); return; }
    inner.push(String(v));
    if (/[$`]|^\s*$/.test(String(v))) flags.unsure = `${SHELLS.test(prev) ? prev : h} runs a command string that depends on the shell state (${String(v).slice(0, 40)}); it cannot be checked`;
  };
  for (let i = 1; i < w.length; i++) {
    const x = String(w[i]);
    if (x === '--' && !SHELLS.test(h)) continue;
    const eq = x.match(/^(--(?:command|session-command|split-string))=(.*)$/s);
    if (eq) { add(eq[2], i); continue; }
    if (h === 'pwsh' || h === 'powershell') {
      if (/^-(?:e|ec|en|enc\w*|encodedcommand)$/i.test(x)) { flags.unsure = `${h} -EncodedCommand cannot be checked`; i++; continue; }
      if (/^-(?:c|co\w*|command)$/i.test(x)) { add(w.slice(i + 1).join(' '), i); break; }
      continue;
    }
  if (recursive && targets.some((t) => POSIX_CRIT_TARGET.test(t.trim()) || PS_CRIT_TARGET.test(t.trim()) || sysCrit(t))) hit('high', 'recursive rm on /, ~, * or . — would wipe everything', true);
  if (targets.some((t) => /(?:^|[\\/])\.\.(?:[\\/]|$)/.test(t))) hit('high', 'path contains .. (refers to a parent directory)');
}

// a file under /etc, /boot, /usr, /bin, /sbin, /lib*: deleting, overwriting or editing it in place can make the system
// unbootable or lock everyone out (`rm /etc/passwd`, `sed -i d /etc/passwd`, `tee /etc/passwd < /dev/null`), the same as
// `> /etc/passwd` or `truncate -s0 /etc/passwd`
const SYS_FILE = /^\/+(?:etc|boot|usr|bin|sbin|lib\w*)\/+[^/]/;
const sysFile = (t) => SYS_FILE.test(normTarget(t));
// rm/unlink/shred of a system file; sed -i / perl -i on one; tee (not -a), dd of=, cp/install/mv/ln -f onto one; chmod 000 on one
function sysFileWriteCheck(w, head, hit) {
  const a = w.slice(1);
  if (head === 'dd') {
    if (a.some((x) => /^of=/.test(x) && sysFile(x.slice(3)))) hit('high', 'overwrites a system file', true);
  } else if (head === 'cp' || head === 'mv' || head === 'install' || (head === 'ln' && a.some((x) => /^-[a-zA-Z]*f/.test(x) || x === '--force'))) {
    // the destination: -t DIR / --target-directory=DIR (a file inside it), else the last operand unless it names a
    // directory by its form (`cp x.service /etc/systemd/system/`: adds a file)
    const ti = a.findIndex((x) => x === '-t' || x === '--target-directory');
    const td = ti >= 0 ? a[ti + 1] : a.find((x) => /^--target-directory=/.test(x))?.slice(19);
    if (td != null) return;
    const pos = positional(a);
    const dst = pos.length >= 2 ? pos[pos.length - 1] : null;
    if (dst != null && !/[\\/]$/.test(dst) && sysFile(dst)) hit('high', 'overwrites a system file or directory', true);
  } else if (/^(?:perl|ruby)[\d.]*$/.test(head)) {
    if (a.some((x) => /^-[a-zA-Z]*i/.test(x)) && positional(a).some(sysFile)) hit('high', 'edits a system file in place', true);
  } else if (head === 'chmod') {
    // no permissions at all (`chmod 000 /etc/passwd`, `chmod a= …`): nobody can read it, logins stop working
    const pos = positional(a);
    if (/^0*$|^[ugoa]*=$|^a?-rwx$/.test(pos[0] ?? 'x') && pos.slice(1).some(sysFile)) hit('high', 'removes every permission from a system file', true);
  } else if (head === 'rm' || head === 'unlink') {
    if (positional(a).some(sysFile)) hit('high', 'deletes a system file', true);
  } else if (head === 'sed') {
    if (!a.some((x) => /^-[a-zA-Z]*i/.test(x) || /^--in-place/.test(x))) return;
    // the script is the first positional unless given with -e/-f; every later positional is a file
    const pos = [];
    let script = !a.some((x) => /^-[a-zA-Z]*[ef]$|^--(?:expression|file)(?:=|$)/.test(x));
    let opts = true;
    for (let i = 0; i < a.length; i++) {
      const x = a[i];
      if (opts && x === '--') { opts = false; continue; }
      if (opts && /^-[a-zA-Z]*[ef]$|^--(?:expression|file)$/.test(x)) { i++; continue; }
      if (opts && /^-./.test(x)) continue;
      if (script) { script = false; continue; }
      pos.push(x);
    }
    if (pos.some(sysFile)) hit('high', 'edits a system file in place', true);
  } else if (head === 'tee') {
    const t = positional(a).filter(sysFile);
    if (t.length) hit('high', a.some((x) => /^-[a-zA-Z]*a/.test(x) || x === '--append') ? 'appends to a system file' : 'overwrites a system file', !a.some((x) => /^-[a-zA-Z]*a/.test(x) || x === '--append'));
  }
}

// sed scripts that run a shell command or write a file: GNU `e` (command, or flag of s///), `w` / `W` (command, or flag of
// s///); a script read from a file (-f) cannot be checked. `sed 's/a/b/e' f`, `sed -n '1e cmd' f`, `sed 'w out' f`.
function sedScripts(a) {
  const scripts = [];
  let fromFile = false;
  let first = !a.some((x) => /^-[a-zA-Z]*[ef]$|^--(?:expression|file)(?:=|$)|^-[a-zA-Z]*e./.test(x));
  let opts = true;
  for (let i = 0; i < a.length; i++) {
    const x = String(a[i]);
    if (opts && x === '--') { opts = false; continue; }
    if (opts && /^-[a-zA-Z]*f$|^--file$/.test(x)) { fromFile = true; i++; continue; }
    if (opts && /^--file=|^-[a-zA-Z]*f./.test(x)) { fromFile = true; continue; }
    if (opts && /^-[a-zA-Z]*e$|^--expression$/.test(x)) { if (a[i + 1] != null) scripts.push(String(a[i + 1])); i++; continue; }
    if (opts && /^--expression=/.test(x)) { scripts.push(x.slice(13)); continue; }
    if (opts && /^-[a-df-zA-Z]*e./.test(x)) { scripts.push(x.slice(x.indexOf('e') + 1)); continue; }
    if (opts && /^-./.test(x)) continue;
    if (first) { scripts.push(x); first = false; }
  }
  return { scripts, fromFile };
}
function sedRunsOrWrites(script) {
  const s = String(script);
  let i = 0;
  const skipAddr = () => {
    for (;;) {
      while (i < s.length && /[\s\d$,~+!{]/.test(s[i])) i++;
      if (s[i] === '/' || (s[i] === '\\' && i + 1 < s.length)) {
        const d = s[i] === '/' ? '/' : s[++i];
        for (i++; i < s.length && s[i] !== d; i++) if (s[i] === '\\') i++;
        i++;
        while (i < s.length && /[IM]/.test(s[i])) i++;
        continue;
      }
      return;
    }
  };
  while (i < s.length) {
    skipAddr();
    const c = s[i];
    if (c == null) break;
    if (c === 'e' || c === 'w' || c === 'W') return true;
    if (c === 's' || c === 'y') {
      const d = s[i + 1];
      if (d == null) break;
      let n = 0;
      for (i += 2; i < s.length && n < 2; i++) { if (s[i] === '\\') i++; else if (s[i] === d) n++; }
      if (c === 's') { const fl = s.slice(i).match(/^[^;}\n]*/)[0]; if (/[ewW]/.test(fl)) return true; i += fl.length; }
    } else if (/[aic:bTtrRqQlLv#]/.test(c)) {
      // text / label / file-name arguments run to the end of the line
      while (i < s.length && s[i] !== '\n') i++;
    }
    while (i < s.length && s[i] !== ';' && s[i] !== '\n' && s[i] !== '}') i++;
    i++;
  }
  return false;
}
function sedCheck(w, hit) {
  const { scripts, fromFile } = sedScripts(w.slice(1));
  if (fromFile) hit('high', 'sed reads its script from a file; it cannot be checked');
  if (scripts.some(sedRunsOrWrites)) hit('high', 'sed script runs a shell command or writes a file (e / w)');
}

// kill [-SIG | -s SIG | -n NUM | --signal SIG] [--] pid...   (pid 1 / -1 = init / every process)
function killCheck(words, hit) {
  hit('high', 'terminates processes');
  const a = words.slice(1);
  let i = 0;
  if (a[i] === '-s' || a[i] === '-n' || a[i] === '--signal') i += 2;
  else if (a[i] && /^-/.test(a[i]) && a[i] !== '--' && a[i] !== '-l' && a[i] !== '-L') i += 1;
  if (a[i] === '--') i++;
  if (a.slice(i).some((p) => /^-?1$/.test(p))) hit('high', 'kill -1 / PID 1 kills everything', true);
}

const PS_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*\*?|[\\/]+\*?|\*|~[\\/]*\*?|\$(?:HOME|env:USERPROFILE|env:HOMEDRIVE|env:SystemDrive|env:SystemRoot|env:windir|\{env:USERPROFILE\})[\\/]*\*?|[A-Za-z]:[\\/]+(?:Windows|Users|Program Files(?: \(x86\))?|ProgramData)[\\/]*\*?)$/i;
const PS_REMOVE = /^(?:remove-item|ri|rm|del|erase|rd|rmdir)$/i;

// Remove-Item and its aliases (PowerShell parameter names may be abbreviated: -r, -Rec, -lp, ...)
function removeItemCheck(words, hit) {
  const a = words.slice(1);
  if (a.some((x) => /^\/[sq]$/i.test(x))) return; // cmd.exe syntax, see cmdDelCheck
  hit('high', 'deletes files permanently');
  const isParam = (x, name, min = 2) => /^-\w/.test(x) && x.length - 1 >= Math.min(min, name.length) && name.startsWith(x.slice(1).replace(/:.*$/, '').toLowerCase());
  const recurse = a.some((x) => isParam(x, 'recurse', 1));
  const targets = [];
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    if (isParam(x, 'path', 1) || isParam(x, 'literalpath', 1) || /^-(?:lp|pspath)$/i.test(x)) { if (a[i + 1] != null) targets.push(...a[++i].split(',')); continue; }
    if (/^-/.test(x)) { if (/^-(?:include|exclude|filter|credential|stream)/i.test(x)) i++; continue; }
    targets.push(...x.split(','));
  }
  if (recurse && targets.some((t) => PS_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive Remove-Item on a drive root, home or *', true);
}

const CMD_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*(?:\.|\*?(?:\.\*)?)|[\\/]+(?:\.|\*?)|\*(?:\.\*)?|%(?:USERPROFILE|HOMEDRIVE|HOMEPATH|SystemDrive|SystemRoot|windir)%[\\/]*(?:\.|\*?(?:\.\*)?)|[A-Za-z]:[\\/]+(?:Windows|Users|Program Files(?: \(x86\))?|ProgramData)[\\/]*(?:\.|\*?(?:\.\*)?))$/i;

// cmd.exe rd/rmdir/del/erase (also reached from PowerShell aliases with cmd-style switches)
function cmdDelCheck(words, hit) {
  hit('high', 'deletes files permanently');
  const a = words.slice(1);
  const recursive = a.some((x) => /^\/s$/i.test(x));
  if (recursive && a.filter((x) => !/^\/\w$/.test(x)).some((t) => CMD_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive delete of a drive root or home', true);
}

// /, ~, $HOME, system directories, drive roots (not the relative ., .., * that rm -r also treats as critical)
const critTarget = (t) => { const s = String(t).trim(); return ((POSIX_CRIT_TARGET.test(s) || PS_CRIT_TARGET.test(s)) && !/^(?:\.{1,2}\/*\*?|\*|\.\*|\.\/+\*)$/.test(s)) || sysCrit(s); };
const SYS_PATH = /^\/+(?:etc|boot|bin|sbin|usr|lib\w*|dev|proc|sys)(?:\/|$)/;
const NULL_SRC = /^\/dev\/(?:null|zero|u?random)$/;
const positional = (args) => { const out = []; let opts = true; for (const a of args) { if (opts && a === '--') { opts = false; continue; } if (opts && /^-./.test(a)) continue; out.push(a); } return out; };

// find's own leading options (-H -L -P -O3 -D debugopts) come before the starting points
const findArgs = (w) => { let a = w.slice(1); for (;;) { if (/^-[HLP]$|^-O\d*$/.test(a[0] || '')) a = a.slice(1); else if (a[0] === '-D') a = a.slice(2); else return a; } };

// find ROOT... -delete / -exec rm: bulk deletion; critical on /, ~, C:\ ...
function findCheck(w, hit) {
  const a = findArgs(w);
  const roots = [];
  for (const x of a) { if (/^[-(!]/.test(x)) break; roots.push(x); }
  const del = a.includes('-delete') || a.some((x, i) => /^-(?:exec|execdir|ok|okdir)$/.test(x) && /^(?:\S*\/)?(?:rm|shred|unlink)$/.test(a[i + 1] || ''));
  if (del && roots.some(critTarget)) hit('high', 'bulk deletion under /, ~ or a drive root', true);
}

// rsync --delete … DEST: makes DEST identical to the source, deleting everything else in it
function rsyncCheck(w, hit) {
  const a = w.slice(1);
  if (!a.some((x) => /^--(?:delete|del$|remove-source-files)/.test(x))) return;
  hit('high', 'rsync --delete removes files in the destination');
  const pos = positional(a);
  if (pos.length && critTarget(pos[pos.length - 1])) hit('high', 'rsync --delete onto /, ~ or a drive root', true);
}

// cp/mv/install/ln onto system files; /dev/null (or zero/random) copied over a file destroys it
function copyCheck(w, hit) {
  const pos = positional(w.slice(1));
  if (pos.length < 2) return;
  const dst = pos[pos.length - 1];
  const srcs = pos.slice(0, -1);
  if (SYS_PATH.test(normTarget(dst)) || normTarget(dst) === '/') hit('high', 'overwrites a system file or directory');
  // moving /etc, /usr, ~ ... away is as destructive as deleting them
  if (w[0].replace(/^.*[\\/]/, '') === 'mv') {
    if (srcs.some(critTarget)) hit('high', 'moves a system or home directory away', true);
    else if (srcs.some((x) => SYS_PATH.test(normTarget(x)))) hit('high', 'moves a system file');
  }
  if (srcs.some((s) => NULL_SRC.test(s)) && !/^\/dev\//.test(dst)) hit('high', `overwrites ${dst} with ${srcs.find((s) => NULL_SRC.test(s))}`, SYS_PATH.test(dst));
}

exec
/bin/bash -lc "sed -n '1,220p' test/matrix.test.js
sed -n '1,170p' src/shellwords.js" in /workspace/tellsh
 succeeded in 0ms:
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
      const pathVals = new Set([...PATH_SLOTS].filter((k) => vals[k] != null).map((k) => String(vals[k])));
      const q = (s) => {
        const isPath = pathVals.has(String(s));
        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { tilde: isPath });
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
// Shell-aware word splitting for history lines and command comparison (POSIX sh/bash/zsh, fish
// approximated as POSIX, and PowerShell). Not a full parser: it understands quoting, escapes,
// command separators and redirections, and flags every word whose value depends on the shell
// state (expansions, unquoted globs), so callers never act on a guessed value.
//
// splitCommand(line, kind) -> { ok, segments: [{ words: string[], raw: string[] }] }
//   ok=false: unterminated quote, heredoc, or other syntax we do not interpret
//   words[i]: the literal value, or AMB + raw text when it contains an expansion ($x, $(..), `..`,
//             {a,b}), or GLOB + raw text when it contains an unquoted * ? [
// Redirections (`> f`, `2>&1`, `<in`) are dropped together with their target (keepRedirects: kept as
// words, e.g. ['ls', '>', 'out']). Each segment records the separator that ended it (sep: ; | && || &).

export const AMB = '\u0000';
export const GLOB = '\u0001';
export const isAmbiguous = (w) => typeof w === 'string' && (w.startsWith(AMB) || w.startsWith(GLOB));
export const isExpansion = (w) => typeof w === 'string' && w.startsWith(AMB);
export const isGlob = (w) => typeof w === 'string' && w.startsWith(GLOB);
export const rawOf = (w) => (isAmbiguous(w) ? w.slice(1) : w);

const PS_SQ = /['‘’‚‛]/;
const PS_DQ = /["“”„]/;

// index of the `)` closing the `(` at `open` (quotes skipped), or -1
function matchParen(s, open) {
  let depth = 0;
  for (let j = open; j < s.length; j++) {
    const d = s[j];
    if (d === "'") { const e = s.indexOf("'", j + 1); if (e < 0) return -1; j = e; continue; }
    if (d === '"') { let e = j + 1; while (e < s.length && s[e] !== '"') e += s[e] === '\\' ? 2 : 1; if (e >= s.length) return -1; j = e; continue; }
    if (d === '\\') { j++; continue; }
    if (d === '(') depth++;
    else if (d === ')' && --depth === 0) return j;
  }
  return -1;
}

export function splitCommand(line, kind = 'posix', { keepRedirects = false, literalTilde = true } = {}) {
  const ps = kind === 'pwsh' || kind === 'powershell';
  const s = String(line);
  const segments = [];
  let words = [];
  let raws = [];
  let w = null; // current word value
  let raw = '';
  let amb = false;
  let glob = false;
  let quoted0 = false; // the word starts with a quoted or escaped character
  let dropNext = false; // next word is a redirection target
  const flushWord = () => {
    if (w == null) return;
    // POSIX: a quoted/escaped leading ~ ('~/x', \~/x) is a directory literally named ~, not the home
    // directory; ./~/x keeps that meaning wherever the value is rendered again
    if (!ps && literalTilde && quoted0 && w.startsWith('~')) w = './' + w;
    if (dropNext) { dropNext = false; } else {
      words.push(amb ? AMB + raw : glob ? GLOB + raw : w);
      raws.push(raw);
    }
    w = null; raw = ''; amb = false; glob = false; quoted0 = false;
  };
  // open `( … )` subshells (posix): each segment records the ids of those it runs in (`subs`), so a `cd` inside one
  // is known not to outlast it
  const subs = [];
  let subId = 0;
  const flushSeg = (sep = '') => { flushWord(); if (words.length) segments.push({ words, raw: raws, sep, ...(subs.length ? { subs: [...subs] } : {}) }); else if (sep && segments.length) segments[segments.length - 1].sep += sep; words = []; raws = []; };
  const fail = () => ({ ok: false, segments: [] });

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const start = i;
    if (w == null && (ps ? PS_SQ.test(c) || PS_DQ.test(c) : c === "'" || c === '"' || c === '\\')) quoted0 = true;
    if (ps ? PS_SQ.test(c) : c === "'") {
      // single-quoted literal; PowerShell doubles any single-quote character to escape it
      let v = '';
      let j = i + 1;
      for (;; j++) {
        if (j >= s.length) return fail();
        if (ps ? PS_SQ.test(s[j]) : s[j] === "'") {
          if (ps && PS_SQ.test(s[j + 1] || '')) { v += s[++j]; continue; }
          break;
        }
        v += s[j];
      }
      w = (w ?? '') + v; i = j;
    } else if (ps ? PS_DQ.test(c) : c === '"') {
      let v = '';
      let j = i + 1;
      // PowerShell "$HOME/..." (how tellsh renders ~/...) is the home directory
      const home = ps && w == null && s.slice(j).match(/^\$(?:HOME|env:USERPROFILE)(?=[\\/"\u201C\u201D\u201E])/i);
      if (home) { v = '~'; j += home[0].length; }
      for (;; j++) {
        if (j >= s.length) return fail();
        const d = s[j];
        if (ps) {
          if (PS_DQ.test(d)) { if (PS_DQ.test(s[j + 1] || '')) { v += s[++j]; continue; } break; }
          if (d === '`') { if (j + 1 >= s.length) return fail(); v += s[++j]; continue; }
          if (d === '$') amb = true;
        } else {
          if (d === '"') break;
          if (d === '\\' && /[$`"\\\n]/.test(s[j + 1] || '')) { v += s[++j]; continue; }
          if (d === '$' || d === '`') amb = true;
        }
        v += d;
      }
      w = (w ?? '') + v; i = j;
    } else if (!ps && c === '\\') {
      if (i + 1 >= s.length) return fail();
      if (s[i + 1] !== '\n') w = (w ?? '') + s[i + 1];
      else if (w == null) quoted0 = false; // line continuation, not part of a word
      i++;
    } else if (ps && c === '`') {
      if (i + 1 >= s.length) return fail();
      w = (w ?? '') + s[++i];
    } else if (c === '$' && s[i + 1] === '(') {
      // command substitution / PowerShell subexpression: one (ambiguous) word, not a separator at `(`
      const end = matchParen(s, i + 1);
      if (end < 0) return fail();
      w = (w ?? '') + s.slice(i, end + 1); amb = true; i = end;
    } else if (!ps && c === '`') {
      const end = s.indexOf('`', i + 1);
      if (end < 0) return fail();
      w = (w ?? '') + s.slice(i, end + 1); amb = true; i = end;
    } else if (c === '\n' || c === ';' || c === '|' || c === '(' || c === ')' || (c === '&' && (ps ? s[i + 1] === '&' : s[i + 1] !== '>'))) {
      let sep = c === '\n' ? ';' : c;
      if ((c === '&' || c === '|') && s[i + 1] === c) { i++; sep += c; }
      flushSeg(sep);
      if (c === '(') subs.push(++subId);
      else if (c === ')') subs.pop();
    } else if ((c === '{' || c === '}') && w == null && (i + 1 >= s.length || /\s/.test(s[i + 1]))) {
      flushSeg(c); // command group / script block
    } else if (/\s/.test(c)) {
      flushWord();
    } else if (c === '#' && w == null && !ps) {
      break; // comment
    } else if (c === '<' || c === '>' || (!ps && c === '&' && s[i + 1] === '>')) {
      // redirection: [n]> [n]>> &> >& <  ... drop operator and its target
      if (c === '<' && s[i + 1] === '<') return fail(); // heredoc / here-string
      if (c === '<' && s[i + 1] === '(') return fail(); // process substitution
      if (c === '>' && s[i + 1] === '(') return fail();
      let fd = '';
      if (w != null && /^\d$/.test(w) && raw === w) { fd = w; w = null; raw = ''; } // fd number
      flushWord();
      let j = i + 1;
      while (j < s.length && /[>&|]/.test(s[j])) j++;
      let op = fd + s.slice(i, j);
      if (/&$/.test(s.slice(i, j)) && /^\d|^-/.test(s.slice(j))) { // 2>&1
        const k0 = j;
        while (j < s.length && /[\d-]/.test(s[j])) j++;
        op += s.slice(k0, j);
        if (keepRedirects) words.push(op), raws.push(op);
        i = j - 1;
        continue;
      }
      i = j - 1;
      if (keepRedirects) { words.push(op); raws.push(op); } else dropNext = true;
      continue;
    } else {
      if (c === '$') {
        // PowerShell: $HOME / $env:USERPROFILE at the start of a word is the home directory (~)
        const home = ps && w == null && s.slice(i).match(/^\$(?:HOME|env:USERPROFILE|\{env:USERPROFILE\})(?=$|[\\/\s;|)])/i);
        if (home) { w = '~'; i += home[0].length - 1; raw += s.slice(start, i + 1); continue; }
        amb = true;
      }
      if (!ps && c === '`') amb = true;
      // ~user, ~+, ~-: expanded by the shell to a directory we cannot know
      if (!ps && c === '~' && w == null && i + 1 < s.length && !/[\/\s;|&)]/.test(s[i + 1])) amb = true;
      if (/[*?[]/.test(c)) glob = true;
      if (!ps && c === '{' && /^\{[^}\s]*,[^}\s]*\}/.test(s.slice(i))) amb = true; // brace expansion
      w = (w ?? '') + c;
    }
    if (w != null) raw += s.slice(start, i + 1);

exec
/bin/bash -lc "rg -n 'cmd:.*q\\(|PATH_SLOTS|cmd.*quote|plainSlotValue' src/variants.js src/fill.js src/danger.js
sed -n '570,750p' src/variants.js
sed -n '1,120p' review/031-r8-codex.md
sed -n '1,100p' review/031-r8-claude.md" in /workspace/tellsh
 succeeded in 0ms:
src/danger.js:938:// intent is risk=safe, with slot values that are plain literals (plainSlotValue). Anything else (composer output, a
src/danger.js:959:export function plainSlotValue(name, value, { dashOk = false } = {}) {
src/fill.js:4:import { checkDanger, maxRisk, plainSlotValue } from './danger.js';
src/fill.js:488:const PATH_SLOTS = new Set(['path', 'file', 'src', 'dst', 'dest', 'archive']);
src/fill.js:878:  if (PATH_SLOTS.has(name) && /^-/.test(String(val))) val = './' + val; // never let a path look like an option
src/fill.js:879:  return quote(val, { tilde: PATH_SLOTS.has(name), name });
src/fill.js:964:    for (const k of PATH_SLOTS) if (values[k] === '/') values[k] = 'C:\\';
src/fill.js:999:        if (!PATH_SLOTS.has(k) && !RAW_OK[k] && typeof v === 'string' && /^-/.test(v)) { missing.push(k); vals[k] = PLACEHOLDER(k); }
src/fill.js:1001:      const pathVals = new Set([...PATH_SLOTS].filter((k) => vals[k] != null).map((k) => String(vals[k])));
src/fill.js:1027:  const plain = used.every((k) => !(k in values) || plainSlotValue(k, values[k], { dashOk: PATH_SLOTS.has(k) || (!!RAW_OK[k] && RAW_OK[k](values[k])) }));
src/variants.js:80:    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /n /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
src/variants.js:85:    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /m /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
src/variants.js:97:    cmd: (s, q) => `where /r ${q(s.path ?? '.')} ${s.glob ? q(s.glob) : '*'} | find /c /v ""`,
src/variants.js:243:    cmd: (s, q) => { const p = q(s.path); const dir = /"$/.test(p) ? p.slice(0, -1) + '\\"' : p + '\\'; return `if not exist ${dir} mkdir ${p}`; },
src/variants.js:316:    cmd: (s, q) => `taskkill /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`)}`,
src/variants.js:320:    cmd: (s, q) => `taskkill /f /im ${q(/\.\w+$/.test(s.name) ? s.name : `${s.name}.exe`)}`,
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
session id: 01a12c5c-1d58-7e51-a888-628b4e105382
--------
user
Round 4 review of the tellsh cmd quoting fix. Round-3 finding (both reviewers): the trailing \ -> \. rewrite also hit non-path values (git commit -m "Document C:\." , findstr patterns). Now the rewrite applies only to path slots (tilde:true, set by fill.js only for PATH_SLOTS); a quoted non-path value ending in \ throws UnquotableError, so the intent is reported as a gap for cmd (no correct spelling exists: built-ins and MSVC programs disagree). Unquoted values are unchanged. CMD_CRIT_TARGET also accepts C:\. and \. Look for real bugs only. End with exactly one line: VERDICT: APPROVE or VERDICT: REQUEST_CHANGES.

DIFF (since v0.3.1 matrix commit):
diff --git a/src/danger.js b/src/danger.js
index 9bad233..7530e7d 100644
--- a/src/danger.js
+++ b/src/danger.js
@@ -422,7 +422,7 @@ function removeItemCheck(words, hit) {
   if (recurse && targets.some((t) => PS_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive Remove-Item on a drive root, home or *', true);
 }
 
-const CMD_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*\*?(?:\.\*)?|[\\/]+\*?|\*(?:\.\*)?|%(?:USERPROFILE|HOMEDRIVE|HOMEPATH|SystemDrive|SystemRoot|windir)%[\\/]*\*?(?:\.\*)?)$/i;
+const CMD_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*(?:\.|\*?(?:\.\*)?)|[\\/]+(?:\.|\*?)|\*(?:\.\*)?|%(?:USERPROFILE|HOMEDRIVE|HOMEPATH|SystemDrive|SystemRoot|windir)%[\\/]*(?:\.|\*?(?:\.\*)?)|[A-Za-z]:[\\/]+(?:Windows|Users|Program Files(?: \(x86\))?|ProgramData)[\\/]*(?:\.|\*?(?:\.\*)?))$/i;
 
 // cmd.exe rd/rmdir/del/erase (also reached from PowerShell aliases with cmd-style switches)
 function cmdDelCheck(words, hit) {
diff --git a/src/render.js b/src/render.js
index 6f5ef6f..9a459b5 100644
--- a/src/render.js
+++ b/src/render.js
@@ -76,7 +76,16 @@ export function cmdQuote(value, { tilde: expand = true, attached = false } = {})
   // Windows paths: / -> \ (an unquoted foo/q could be read as foo /q by built-ins); other values that
   // contain / are double-quoted
   if (expand || /^[A-Za-z]:|%USERPROFILE%/.test(s)) s = s.replace(/\//g, '\\');
-  if (/^[A-Za-z0-9_\\.:@+=%-]+$/.test(s)) return s;
+  // an expanded %VAR% may contain spaces (C:\Users\John Smith): always double-quote it
+  if (!s.includes('%') && /^[A-Za-z0-9_\\.:@+=-]+$/.test(s)) return s;
+  // a closing quote after a backslash ("x\\") is an escaped quote for MSVC-parsed programs (where, tar, git) and
+  // bsdtar rejects a doubled one; dropping it would let copy/move create a file. "x\\." keeps the directory meaning
+  // for built-ins and native programs alike (checked on Windows: copy, if exist, where /r, dir, tar, forfiles, rmdir)
+  if (/\\$/.test(s)) {
+    // only a path may change form; a message or pattern ending in \ has no safe cmd.exe spelling (reported as a gap)
+    if (!expand) throw new UnquotableError(`value ${JSON.stringify(String(value))} ends in \\ and cannot be quoted safely for cmd.exe`);
+    s = s.replace(/\\+$/, '\\.');
+  }
   return '"' + s + '"';
 }
 
diff --git a/test/matrix.test.js b/test/matrix.test.js
index 09df03a..ac57b41 100644
--- a/test/matrix.test.js
+++ b/test/matrix.test.js
@@ -82,7 +82,7 @@ test('cmd: mkdir -p semantics, dotfiles in hidden_files, no admin-only disk_free
   const h = b('hidden_files', CMD, { path: 'my docs' });
   assert.equal(h.command, 'pushd "my docs" && (dir /a:h /b 2>nul & dir /a /b .* & popd)');
   assert.equal(h.risk, 'safe');
-  assert.equal(b('hidden_files', CMD, { path: '~' }).command, 'pushd %USERPROFILE% && (dir /a:h /b 2>nul & dir /a /b .* & popd)');
+  assert.equal(b('hidden_files', CMD, { path: '~' }).command, 'pushd "%USERPROFILE%" && (dir /a:h /b 2>nul & dir /a /b .* & popd)');
   assert.equal(b('hidden_files', CMD, { path: '~/my docs' }).command, 'pushd "%USERPROFILE%\\my docs" && (dir /a:h /b 2>nul & dir /a /b .* & popd)');
   assert.ok(b('disk_free', CMD, {}).gap);
 });
@@ -171,3 +171,42 @@ test('matrix report: without --before every results file is kept', () => {
     assert.match(md, /linux/); assert.match(md, /darwin/);
   } finally { rmSync(dir, { recursive: true, force: true }); }
 });
+
+test('cmd: ~ paths become a double-quoted %USERPROFILE% (a user name may contain a space)', async () => {
+  const { cmdQuote, psQuote } = await import('../src/render.js');
+  assert.equal(cmdQuote('~'), '"%USERPROFILE%"');
+  assert.equal(cmdQuote('~/foo'), '"%USERPROFILE%\\foo"');
+  assert.equal(cmdQuote('~/my docs'), '"%USERPROFILE%\\my docs"');
+  assert.equal(psQuote('~/foo'), '"$HOME/foo"');
+  for (const [id, slots] of [['delete_dir', { path: '~/foo' }], ['mkdir', { path: '~/foo' }], ['hidden_files', { path: '~' }], ['list_files', { path: '~/foo' }]]) {
+    const r = b(id, { shell: 'cmd', os: 'win32' }, slots);
+    assert.match(r.gap ? '%USERPROFILE%' : r.command, /%USERPROFILE%/, id);
+    if (r.gap) continue;
+    assert.doesNotMatch(r.command, /(?<!")%USERPROFILE%/, `${id}: ${r.command}`);
+  }
+  assert.equal(checkDanger('rd /s /q "%USERPROFILE%"', 'high', { rendered: true, shell: 'cmd', os: 'win32' }).critical, true);
+});
+
+test('cmd: a quoted path ending in \\ ends in \\. instead (MSVC argv would read \\" as a literal quote)', async () => {
+  const { cmdQuote } = await import('../src/render.js');
+  assert.equal(cmdQuote('~/'), '"%USERPROFILE%\\."');
+  assert.equal(cmdQuote('~/Downloads/'), '"%USERPROFILE%\\Downloads\\."');
+  assert.equal(cmdQuote('my docs/'), '"my docs\\."');
+  // copy into a missing folder must fail, not create a file named after it
+  assert.equal(b('copy', { shell: 'cmd', os: 'win32' }, { src: 'report.txt', dst: 'new folder/' }).command, 'copy /-y report.txt "new folder\\."');
+  assert.equal(cmdQuote('docs/'), 'docs\\');
+  const CMD = { shell: 'cmd', os: 'win32' };
+  assert.equal(b('mkdir', CMD, { path: '~/new/' }).command, 'if not exist "%USERPROFILE%\\new\\.\\" mkdir "%USERPROFILE%\\new\\."');
+  assert.doesNotMatch(b('compress_targz', CMD, { path: '~/foo/', archive: 'out.tar.gz' }).command, /[^\\]\\"/);
+  for (const c of ['rd /s /q "%USERPROFILE%\\."', 'rd /s "%USERPROFILE%\\"', 'rd /s /q "%USERPROFILE%"', 'del /s /q "%USERPROFILE%\\*"', 'rd /s /q "C:\\Users"', 'rd /s /q C:\\Windows\\', 'rd /s /q "C:\\Program Files\\."', 'rd /s /q C:\\.', 'rd /s /q \\.'])
+    assert.equal(checkDanger(c, 'high', { rendered: true, shell: 'cmd', os: 'win32' }).critical, true, c);
+  assert.notEqual(checkDanger('rd /s /q "%USERPROFILE%\\foo"', 'high', { rendered: true, shell: 'cmd', os: 'win32' }).critical, true);
+});
+
+test('cmd: a non-path value ending in \\ is a gap, never silently rewritten', async () => {
+  const { cmdQuote, UnquotableError } = await import('../src/render.js');
+  assert.throws(() => cmdQuote('Document C:\\', { tilde: false }), UnquotableError);
+  assert.equal(cmdQuote('a\\', { tilde: false }), 'a\\');
+  const r = b('git_commit', { shell: 'cmd', os: 'win32' }, { message: 'Document C:\\' });
+  assert.ok(r.gap || !/C:\\\./.test(r.command), r.command);
+});
diff --git a/test/regressions.test.js b/test/regressions.test.js
index 3d68fd9..1d21d90 100644
--- a/test/regressions.test.js
+++ b/test/regressions.test.js
@@ -265,7 +265,7 @@ test('cmd.exe: values with % ! or " are refused instead of being expanded', () =
   const r = buildCommand('cat_file', '', { env: { shell: 'cmd', os: 'win32', coreutils: 'gnu' }, resolved: { file: '%USERNAME%.txt' } });
   assert.equal(r.command, null);
   assert.match(r.gap, /cmd\.exe/);
-  assert.equal(cmdQuote('~/Downloads'), '%USERPROFILE%\\Downloads');
+  assert.equal(cmdQuote('~/Downloads'), '"%USERPROFILE%\\Downloads"');
 });
 
 // ---------------------------------------------------------------------------------------------
I found no real bugs in round 4. I couldn't run the test suite because the sandbox blocked `npm test` and `node --test`, so this is a reading of the code, not a test result.

**What I checked**

- **Which values count as paths.** Only path slots get the `\.` rewrite. In `fill.js:879`, plain string templates pass `tilde: PATH_SLOTS.has(name)`. In `fill.js:1001-1004`, function templates decide by matching the value against the path-slot values. Every other value ending in `\`, if it needs quoting, now throws `UnquotableError`. That error reaches the catch at `fill.js:1013` and is reported as a gap. So `git commit -m "Document C:\"` and findstr patterns like `/c:"foo bar\"` are now gaps for cmd. That's correct: findstr also treats `\"` as a literal quote.
- **Values glued to a switch.** The `cmdQuote(..., { tilde: false, attached: true })` call at `render.js:128` runs outside the `SwitchValueError` try. A trailing-`\` value there still ends up as a gap and doesn't crash.
- **Values that need no quotes.** They keep their trailing `\` (`docs/` → `docs\`, `a\` stays `a\`). With no closing quote, the MSVC `\"` problem can't happen, so this is safe.
- **mkdir.** The `variants.js:243` template turns `"…\."` into `"…\.\"` for `if not exist`. That's fine there, because `if` is a cmd built-in, not an MSVC-parsed program.
- **Meaning of `\.`.** It means the same as a trailing `\` for `del`, `copy` and `rd`, because Windows drops a trailing `.` path component. The dangerous targets are still caught: `CMD_CRIT_TARGET` now matches `C:\.`, `\.`, `%USERPROFILE%\.` and the system folders followed by `\.`.

**Minor, not blocking**

- The function-template `q` decides "is this a path?" by comparing strings, and it ignores any options the template passes. If a template quoted a value it built from a path (none do today), that value would fall into the non-path branch. With a trailing `\` that gives a gap, which is safe but too cautious.
- `CMD_CRIT_TARGET` also matches `C:.` (the current folder on drive C). That's a harmless false positive.
- Some dangerous targets still aren't flagged: `%SystemDrive%\Users` and paths that climb up with `..`, like `%USERPROFILE%\..`. These were missed before this change too, so they're not a regression.
- The `git_commit` assertion (`r.gap || !/C:\\\./.test(...)`) is weak. Asserting `r.gap` directly would pin the new behaviour.

VERDICT: APPROVE
exec
/bin/bash -lc "command -v wine
command -v pwsh
rg -n '"'^  (search|grep|find_|count_files)|path:|pattern:'"' src/catalog.js | head -90" in /workspace/tellsh
 succeeded in 0ms:
19:    { path: '.', count: 10 }),
22:    { path: '.', count: 10 }),
24:  T('dir_size', 'Show total size of a directory', 'du -sh {path}', { path: '.' }),
26:    'find {path} -iname {namepat}', { path: '.', name: null }),
28:    'find {path} -type f -iname {glob}«{age!raw}»', { path: '.', ext: null }),
30:    'find {path} -type f {age!raw}«-iname {glob}»', { path: '.', age: '-mtime -1' }),
32:    'find {path} -type f -mtime +{days!raw}«-iname {glob}»', { path: '.', days: 30 }),
34:    'find {path} -type f -size +{size!raw}«-iname {glob}» -exec ls -lh {} +', { path: '.', size: '100M' }),
36:    'find {path} -type f -size -{size!raw}«-iname {glob}»', { path: '.', size: '1k' }),
38:    'grep -rn«--include={glob}» -- {pattern} {path}', { path: '.', pattern: null }),
40:    'grep -rl«--include={glob}» -- {pattern} {path}', { path: '.', pattern: null }),
43:    'find {path} -type f -iname {glob} -exec cat {} + | wc -l', { path: '.', ext: null }),
45:    'find {path} -type f«-iname {glob}» | wc -l', { path: '.' }),
51:    { path: '.', count: 10 },
53:  T('empty_files', 'Find empty files', 'find {path} -type f -empty', { path: '.' }),
54:  T('empty_dirs', 'Find empty directories', 'find {path} -type d -empty', { path: '.' }),
57:    { path: '.' }, 'safe',
60:  T('find_symlinks', 'List symbolic links', 'find {path} -type l -ls', { path: '.' }),
62:    { path: '.' }, 'safe', { darwin: 'find -L {path} -type l' }),
63:  T('list_files', 'List files in a directory with details', 'ls -lah {path}', { path: '.' }),
65:    "find {path} -maxdepth {depth!raw} -not -path '*/.git/*' | sort", { path: '.', depth: 2 }),
67:    "find {path} -maxdepth 1 -name '.*'", { path: '.' }),
78:    'tar -czvf {archive} {path}', { path: '.', archive: null }, 'medium'),
80:  T('compress_zip', 'Compress into a zip archive', 'zip -r {archive} {path}', { path: '.', archive: null }, 'medium'),
87:  T('chown', 'Change file owner', 'sudo chown -R {user} {path}', { path: null, user: null }, 'medium'),
91:  T('delete_dir', 'Delete a directory recursively', 'rm -r {path}', { path: null }, 'high'),
93:    'find {path} -type f -iname {glob} -delete', { path: '.', ext: null }, 'high'),
94:  T('mkdir', 'Create a directory (with parents)', 'mkdir -p {path}', { path: null }),
157:    'grep -ai -- {pattern} "${HISTFILE:-$HOME/.bash_history}"', { pattern: null }, 'safe',
265:  T('activate_venv', 'Activate a Python virtual environment', '. {path}/bin/activate', { path: '.venv' }, 'medium',

exec
/bin/bash -lc "sed -n '35,105p' src/variants.js
sed -n '410,475p' src/danger.js
sed -n '945,980p' src/danger.js
nl -ba src/render.js | sed -n '65,94p'
sed -n '1,35p' test/matrix.test.js" in /workspace/tellsh
 succeeded in 0ms:
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
    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /n /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
  },
  grep_files_containing: {
    busybox: 'find {path} -type f«-iname {glob}» -exec grep -l -- {pattern} {} +',
    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -List -Pattern {pattern} | Select-Object -ExpandProperty Path`,
    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /m /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
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
    cmd: (s, q) => `where /r ${q(s.path ?? '.')} ${s.glob ? q(s.glob) : '*'} | find /c /v ""`,
  },
  count_words: {
    pwsh: '(Get-Content -LiteralPath {file} -Raw | Measure-Object -Word).Words',
    gaps: { cmd: 'cmd.exe has no word counter' },
  },
  sort_uniq: {
    pwsh: 'Get-Content -LiteralPath {file} | Group-Object -NoElement -CaseSensitive | Sort-Object Count -Descending | Select-Object -First {count!raw}',
    gaps: { cmd: 'cmd.exe has no uniq/group-by equivalent' },
  const a = words.slice(1);
  if (a.some((x) => /^\/[sq]$/i.test(x))) return; // cmd.exe syntax, see cmdDelCheck
  hit('high', 'deletes files permanently');
  const isParam = (x, name, min = 2) => /^-\w/.test(x) && x.length - 1 >= Math.min(min, name.length) && name.startsWith(x.slice(1).replace(/:.*$/, '').toLowerCase());
  const recurse = a.some((x) => isParam(x, 'recurse', 1));
  const targets = [];
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    if (isParam(x, 'path', 1) || isParam(x, 'literalpath', 1) || /^-(?:lp|pspath)$/i.test(x)) { if (a[i + 1] != null) targets.push(...a[++i].split(',')); continue; }
    if (/^-/.test(x)) { if (/^-(?:include|exclude|filter|credential|stream)/i.test(x)) i++; continue; }
    targets.push(...x.split(','));
  }
  if (recurse && targets.some((t) => PS_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive Remove-Item on a drive root, home or *', true);
}

const CMD_CRIT_TARGET = /^(?:[A-Za-z]:[\\/]*(?:\.|\*?(?:\.\*)?)|[\\/]+(?:\.|\*?)|\*(?:\.\*)?|%(?:USERPROFILE|HOMEDRIVE|HOMEPATH|SystemDrive|SystemRoot|windir)%[\\/]*(?:\.|\*?(?:\.\*)?)|[A-Za-z]:[\\/]+(?:Windows|Users|Program Files(?: \(x86\))?|ProgramData)[\\/]*(?:\.|\*?(?:\.\*)?))$/i;

// cmd.exe rd/rmdir/del/erase (also reached from PowerShell aliases with cmd-style switches)
function cmdDelCheck(words, hit) {
  hit('high', 'deletes files permanently');
  const a = words.slice(1);
  const recursive = a.some((x) => /^\/s$/i.test(x));
  if (recursive && a.filter((x) => !/^\/\w$/.test(x)).some((t) => CMD_CRIT_TARGET.test(t.trim()))) hit('high', 'recursive delete of a drive root or home', true);
}

// /, ~, $HOME, system directories, drive roots (not the relative ., .., * that rm -r also treats as critical)
const critTarget = (t) => { const s = String(t).trim(); return ((POSIX_CRIT_TARGET.test(s) || PS_CRIT_TARGET.test(s)) && !/^(?:\.{1,2}\/*\*?|\*|\.\*|\.\/+\*)$/.test(s)) || sysCrit(s); };
const SYS_PATH = /^\/+(?:etc|boot|bin|sbin|usr|lib\w*|dev|proc|sys)(?:\/|$)/;
const NULL_SRC = /^\/dev\/(?:null|zero|u?random)$/;
const positional = (args) => { const out = []; let opts = true; for (const a of args) { if (opts && a === '--') { opts = false; continue; } if (opts && /^-./.test(a)) continue; out.push(a); } return out; };

// find's own leading options (-H -L -P -O3 -D debugopts) come before the starting points
const findArgs = (w) => { let a = w.slice(1); for (;;) { if (/^-[HLP]$|^-O\d*$/.test(a[0] || '')) a = a.slice(1); else if (a[0] === '-D') a = a.slice(2); else return a; } };

// find ROOT... -delete / -exec rm: bulk deletion; critical on /, ~, C:\ ...
function findCheck(w, hit) {
  const a = findArgs(w);
  const roots = [];
  for (const x of a) { if (/^[-(!]/.test(x)) break; roots.push(x); }
  const del = a.includes('-delete') || a.some((x, i) => /^-(?:exec|execdir|ok|okdir)$/.test(x) && /^(?:\S*\/)?(?:rm|shred|unlink)$/.test(a[i + 1] || ''));
  if (del && roots.some(critTarget)) hit('high', 'bulk deletion under /, ~ or a drive root', true);
}

// rsync --delete … DEST: makes DEST identical to the source, deleting everything else in it
function rsyncCheck(w, hit) {
  const a = w.slice(1);
  if (!a.some((x) => /^--(?:delete|del$|remove-source-files)/.test(x))) return;
  hit('high', 'rsync --delete removes files in the destination');
  const pos = positional(a);
  if (pos.length && critTarget(pos[pos.length - 1])) hit('high', 'rsync --delete onto /, ~ or a drive root', true);
}

// cp/mv/install/ln onto system files; /dev/null (or zero/random) copied over a file destroys it
function copyCheck(w, hit) {
  const pos = positional(w.slice(1));
  if (pos.length < 2) return;
  const dst = pos[pos.length - 1];
  const srcs = pos.slice(0, -1);
  if (SYS_PATH.test(normTarget(dst)) || normTarget(dst) === '/') hit('high', 'overwrites a system file or directory');
  // moving /etc, /usr, ~ ... away is as destructive as deleting them
  if (w[0].replace(/^.*[\\/]/, '') === 'mv') {
    if (srcs.some(critTarget)) hit('high', 'moves a system or home directory away', true);
    else if (srcs.some((x) => SYS_PATH.test(normTarget(x)))) hit('high', 'moves a system file');
  }
  if (srcs.some((s) => NULL_SRC.test(s)) && !/^\/dev\//.test(dst)) hit('high', `overwrites ${dst} with ${srcs.find((s) => NULL_SRC.test(s))}`, SYS_PATH.test(dst));
}
// characters a plain slot value never has: quotes (tellsh's own single quotes are the only ones), $ and backticks
// (expansion, $'…'), command separators and redirections, control characters, PowerShell's typographic quotes
const NOT_PLAIN = /['"`$;|&<>\u0000-\u001f\u007f\u2018-\u201f]/;
// find primaries that run, delete or write (`-exec`, `-ok`, `-delete`, `-fprint`, `-fls`)
const FIND_ACTION = /(?:^|\s)-(?:exec|execdir|ok|okdir|delete|fprint0?|fprintf|fls)(?=\s|$)/;
// a slot rendered where the program goes (`{cmd} --version`): a plain program name, never a path or a shell builtin
// that runs a file or a string
const COMMAND_SLOTS = new Set(['cmd']);
const NOT_A_PROGRAM = /^(?:source|\.|eval|exec|builtin|command|sudo|doas|su|env|xargs|bash|sh|zsh|dash|ksh|fish|pwsh|powershell|cmd|iex|invoke-expression)$/i;
/**
 * Whether a slot value is a plain literal: a number, or a string without quotes, $, backticks, ; | & < >, control
 * characters or find actions. `dashOk`: a leading `-` is fine (a path rendered as `./-x`, a raw value its validator
 * accepted, `-mtime -1`); otherwise it could be read as an option.
 */
export function plainSlotValue(name, value, { dashOk = false } = {}) {
  if (value == null) return true;
  if (typeof value === 'number') return Number.isFinite(value);
  if (typeof value !== 'string') return false;
  if (NOT_PLAIN.test(value) || FIND_ACTION.test(value)) return false;
  if (/^-/.test(value) && !dashOk) return false;
  if (COMMAND_SLOTS.has(name) && (!/^[A-Za-z0-9][\w.+-]*$/.test(value) || NOT_A_PROGRAM.test(value))) return false;
  return true;
}

/**
 * The risk of a final command. `rendered`: the caller vouches that `command` is exactly what tellsh rendered from a catalog
 * template with plain slot values (fill.js buildCommand); `baseRisk` is then the intent's risk. Without it the command
 * is at least high.
 * `shell: 'powershell'`: the command is native PowerShell (a leading `$x` is an expression, see PS_CALL_VAR).
 * @returns {{risk:'safe'|'medium'|'high', warnings:string[], critical:boolean}}
 */
export function checkDanger(command, baseRisk = 'safe', { rendered = false, allowlist = null, shell = null, os = null } = {}) {
  const d = assessCommand(command, baseRisk, { allowlist, shell, os });
  if (rendered || d.risk === 'high') return d;
  return { risk: 'high', warnings: [UNTRUSTED, ...d.warnings], critical: d.critical };
}
    65	 * % ! " or control characters are refused (the intent is reported as a gap for cmd).
    66	 */
    67	export function cmdQuote(value, { tilde: expand = true, attached = false } = {}) {
    68	  let s = String(value);
    69	  const home = expand && /^~(?=[/\\]|$)/.test(s);
    70	  if (home) s = '%USERPROFILE%' + s.slice(1);
    71	  const body = home ? s.slice('%USERPROFILE%'.length) : s;
    72	  if (/[%!"\r\n\0]/.test(body)) throw new UnquotableError(`value ${JSON.stringify(String(value))} cannot be quoted safely for cmd.exe`);
    73	  // cmd built-ins read /x as a switch even when quoted ("delete directory /q" -> rmdir /s /q); a value
    74	  // glued to a switch (findstr /c:{pattern}) is not an argument of its own and is fine
    75	  if (/^\//.test(s) && !attached) throw new SwitchValueError(`value ${JSON.stringify(String(value))} starts with / and would be read as a cmd.exe switch`);
    76	  // Windows paths: / -> \ (an unquoted foo/q could be read as foo /q by built-ins); other values that
    77	  // contain / are double-quoted
    78	  if (expand || /^[A-Za-z]:|%USERPROFILE%/.test(s)) s = s.replace(/\//g, '\\');
    79	  // an expanded %VAR% may contain spaces (C:\Users\John Smith): always double-quote it
    80	  if (!s.includes('%') && /^[A-Za-z0-9_\\.:@+=-]+$/.test(s)) return s;
    81	  // a closing quote after a backslash ("x\\") is an escaped quote for MSVC-parsed programs (where, tar, git) and
    82	  // bsdtar rejects a doubled one; dropping it would let copy/move create a file. "x\\." keeps the directory meaning
    83	  // for built-ins and native programs alike (checked on Windows: copy, if exist, where /r, dir, tar, forfiles, rmdir)
    84	  if (/\\$/.test(s)) {
    85	    // only a path may change form; a message or pattern ending in \ has no safe cmd.exe spelling (reported as a gap)
    86	    if (!expand) throw new UnquotableError(`value ${JSON.stringify(String(value))} ends in \\ and cannot be quoted safely for cmd.exe`);
    87	    s = s.replace(/\\+$/, '\\.');
    88	  }
    89	  return '"' + s + '"';
    90	}
    91	
    92	export const QUOTE = { bash: shQuote, zsh: shQuote, sh: shQuote, fish: fishQuote, powershell: psQuote, cmd: cmdQuote };
    93	
    94	function posixTemplate(intent, env) {
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

exec
/bin/bash -lc "node --test --test-name-pattern='cmd|quoting' test/matrix.test.js test/shells.test.js test/regressions.test.js test/regressions2.test.js" in /workspace/tellsh
 exited 1 in 244ms:
TAP version 13
# Subtest: /workspace/tellsh/test/matrix.test.js
ok 1 - /workspace/tellsh/test/matrix.test.js
  ---
  duration_ms: 211.400603
  ...
# Subtest: /workspace/tellsh/test/regressions.test.js
ok 2 - /workspace/tellsh/test/regressions.test.js
  ---
  duration_ms: 219.281642
  ...
# Subtest: /workspace/tellsh/test/regressions2.test.js
ok 3 - /workspace/tellsh/test/regressions2.test.js
  ---
  duration_ms: 228.54519
  ...
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 4 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 213.853666
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..4
# tests 4
# suites 0
# pass 3
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 245.480003

codex
Function templates infer whether a value is a path by comparing its text with path-slot values. That may still classify a search pattern as a path when both have the same value. I’m checking a concrete reproduction.
exec
/bin/bash -lc "nl -ba src/fill.js | sed -n '993,1009p'
nl -ba src/variants.js | sed -n '76,88p'
git diff e5033d4 HEAD --stat" in /workspace/tellsh
 succeeded in 0ms:
   993	    if (typeof tpl === 'function') {
   994	      const vals = { ...values };
   995	      for (const r of required) if (!(r in vals)) { missing.push(r); vals[r] = PLACEHOLDER(r); }
   996	      // only path slots may get a ./ prefix; any other value starting with - would be read as an
   997	      // option (printf -n, findstr /?, taskkill ...): it is left as a placeholder instead
   998	      for (const [k, v] of Object.entries(vals)) {
   999	        if (!PATH_SLOTS.has(k) && !RAW_OK[k] && typeof v === 'string' && /^-/.test(v)) { missing.push(k); vals[k] = PLACEHOLDER(k); }
  1000	      }
  1001	      const pathVals = new Set([...PATH_SLOTS].filter((k) => vals[k] != null).map((k) => String(vals[k])));
  1002	      const q = (s) => {
  1003	        const isPath = pathVals.has(String(s));
  1004	        return quote(isPath && /^-/.test(String(s)) ? './' + s : s, { tilde: isPath });
  1005	      };
  1006	      // catalog functions take the OS string, variant functions a ctx object
  1007	      command = tpl(vals, q, tpl === intent.template || tpl === intent.darwin ? e.os : e);
  1008	      if (/<TEXT>/.test(command)) missing.push('text');
  1009	    } else {
    76	  },
    77	  grep_text: {
    78	    busybox: 'find {path} -type f«-iname {glob}» -exec grep -Hn -- {pattern} {} +',
    79	    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -Pattern {pattern}`,
    80	    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /n /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
    81	  },
    82	  grep_files_containing: {
    83	    busybox: 'find {path} -type f«-iname {glob}» -exec grep -l -- {pattern} {} +',
    84	    pwsh: `${PS_FILES}«| Where-Object Name -Like {glob}» | Select-String -CaseSensitive -List -Pattern {pattern} | Select-Object -ExpandProperty Path`,
    85	    cmd: (s, q) => `pushd ${q(s.path ?? '.')} && (findstr /s /m /c:${q(s.pattern)} ${s.glob ? q(s.glob) : '*'} & popd)`,
    86	  },
    87	  count_lines: {
    88	    pwsh: '@(Get-Content -LiteralPath {file}).Count',
 MATRIX.md                |  2 +-
 review/STATUS_031        |  1 +
 scripts/matrix.js        | 13 ++++++++---
 src/danger.js            |  2 +-
 src/render.js            | 11 +++++++++-
 test/matrix.test.js      | 56 +++++++++++++++++++++++++++++++++++++++++++++++-
 test/regressions.test.js |  2 +-
 test/shells.test.js      |  2 +-
 8 files changed, 80 insertions(+), 9 deletions(-)

exec
/bin/bash -lc "node --test --test-name-pattern='a non-path value ending|a quoted path ending|~ paths become' test/matrix.test.js" in /workspace/tellsh
exec
/bin/bash -lc "node --input-type=module <<'JS'
import { buildCommand } from './src/fill.js';
const env = { shell: 'cmd', os: 'win32' };
const pattern = 'C:\\\\Program Files\\\\';
for (const id of ['grep_text', 'grep_files_containing']) {
  for (const path of ['.', pattern]) {
    const r = buildCommand(id, '', { env, resolved: { path, pattern } });
    console.log(JSON.stringify({ id, path, pattern, command: r.command, gap: r.gap, risk: r.risk }));
  }
}
JS" in /workspace/tellsh
exec
/bin/bash -lc "node --test --test-name-pattern='fish / PowerShell / cmd quoting rules' test/shells.test.js" in /workspace/tellsh
 succeeded in 7ms:
{"id":"grep_text","path":".","pattern":"C:\\Program Files\\","command":null,"gap":"value \"C:\\\\Program Files\\\\\" ends in \\ and cannot be quoted safely for cmd.exe","risk":"safe"}
{"id":"grep_text","path":"C:\\Program Files\\","pattern":"C:\\Program Files\\","command":"pushd \"C:\\Program Files\\.\" && (findstr /s /n /c:\"C:\\Program Files\\.\" * & popd)","risk":"safe"}
{"id":"grep_files_containing","path":".","pattern":"C:\\Program Files\\","command":null,"gap":"value \"C:\\\\Program Files\\\\\" ends in \\ and cannot be quoted safely for cmd.exe","risk":"safe"}
{"id":"grep_files_containing","path":"C:\\Program Files\\","pattern":"C:\\Program Files\\","command":"pushd \"C:\\Program Files\\.\" && (findstr /s /m /c:\"C:\\Program Files\\.\" * & popd)","risk":"safe"}

 succeeded in 149ms:
TAP version 13
# Subtest: /workspace/tellsh/test/shells.test.js
ok 1 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 161.137972
  ...
1..1
# tests 1
# suites 0
# pass 1
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 166.912811

 succeeded in 168ms:
TAP version 13
# Subtest: /workspace/tellsh/test/matrix.test.js
ok 1 - /workspace/tellsh/test/matrix.test.js
  ---
  duration_ms: 178.142872
  ...
1..1
# tests 1
# suites 0
# pass 1
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 183.495809

exec
/bin/bash -lc "sed -n '1,155p' test/shells.test.js
node --version
node --test --test-name-pattern='cmd|quoting' test/shells.test.js" in /workspace/tellsh
exec
/bin/bash -lc "node --input-type=module <<'JS'
import assert from 'node:assert/strict';
import { buildCommand } from './src/fill.js';
import { cmdQuote, UnquotableError } from './src/render.js';
import { checkDanger } from './src/danger.js';
const env = { shell: 'cmd', os: 'win32' };
assert.equal(cmdQuote('~/'), '\"%USERPROFILE%\\\\.\"');
assert.equal(cmdQuote('a\\\\', {tilde:false}), 'a\\\\');
assert.throws(() => cmdQuote('Document C:\\\\', {tilde:false}), UnquotableError);
assert.ok(buildCommand('git_commit', '', {env, resolved:{message:'Document C:\\\\'}}).gap);
for (const s of ['rd /s /q C:\\\\.', 'rd /s /q \\\\.']) assert.equal(checkDanger(s, 'high', {rendered:true, ...env}).critical, true);
for (const id of ['grep_text','grep_files_containing']) {
  const p='C:\\\\Program Files\\\\';
  const r=buildCommand(id, '', {env,resolved:{path:p,pattern:p}});
  assert.equal(r.gap, undefined);
  assert.ok(r.command.includes('/c:\"C:\\\\Program Files\\\\.\"'));
}
console.log('Baseline assertions passed; both findstr templates reproduce a rewritten non-path pattern.');
JS" in /workspace/tellsh
 succeeded in 28ms:
Baseline assertions passed; both findstr templates reproduce a rewritten non-path pattern.

 exited 1 in 227ms:
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
v20.19.2
TAP version 13
# Subtest: /workspace/tellsh/test/shells.test.js
not ok 1 - /workspace/tellsh/test/shells.test.js
  ---
  duration_ms: 209.732486
  location: '/workspace/tellsh/test/shells.test.js:1:1'
  failureType: 'testCodeFailure'
  exitCode: 1
  signal: ~
  error: 'test failed'
  code: 'ERR_TEST_FAILURE'
  ...
1..1
# tests 1
# suites 0
# pass 0
# fail 1
# cancelled 0
# skipped 0
# todo 0
# duration_ms 215.291753

codex
**P2: Non-path patterns still get rewritten when their value equals a path.** The guard in [render.js](/workspace/tellsh/src/render.js:86) relies on `tilde`, but function templates infer it by string equality in [fill.js](/workspace/tellsh/src/fill.js:1001).

Reproduced with `grep_text` and `grep_files_containing`: setting both `path` and `pattern` to `C:\Program Files\` produces `/c:"C:\Program Files\."` instead of a gap. This silently changes the search pattern—the round-3 bug remains for matching values.

Pass the slot’s role explicitly when quoting function-template arguments, and add a regression covering equal path and pattern values.

VERDICT: REQUEST_CHANGES
tokens used
50,340
**P2: Non-path patterns still get rewritten when their value equals a path.** The guard in [render.js](/workspace/tellsh/src/render.js:86) relies on `tilde`, but function templates infer it by string equality in [fill.js](/workspace/tellsh/src/fill.js:1001).

Reproduced with `grep_text` and `grep_files_containing`: setting both `path` and `pattern` to `C:\Program Files\` produces `/c:"C:\Program Files\."` instead of a gap. This silently changes the search pattern—the round-3 bug remains for matching values.

Pass the slot’s role explicitly when quoting function-template arguments, and add a regression covering equal path and pattern values.

VERDICT: REQUEST_CHANGES
