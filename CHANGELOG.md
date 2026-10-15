# Changelog

## Unreleased — catalog-038

**New catalog templates (catalog-038):** `git diff --stat` / `git diff --name-only`,
`git worktree list`, `pip list`, `npm outdated`. Training rows in `data/intents/g10_catalog038.jsonl` (EN + PL, with near-miss negatives); labelling
patterns for the real-usage split in `scripts/real/prepare_real.js`. The two diff templates are value-free (always the
plain working-tree diff): a request naming a revision or scope (a ref / hash, commit, last, branch, staged / index,
since / from / vs / against / od / do, per / each, HEAD / main / origin, ...) is withheld, never answered with the plain
diff. Values come only from the request text, and a request the template cannot fully express is withheld
(`src/templates038.js`). They go through the same two-model gate as the 0.3.4 templates (`NEW_TEMPLATE_INTENTS`); a
template answer is never replaced by a composed command.
**Not in this release:** opening a file / URL (`open`), a local HTTP server (`http.server`), pretty-printing JSON
(`jq`), `git worktree add`, creating a virtualenv and `git show --stat` are recognised by the templates model but always
withheld (shown, never run: `DISABLED_038` in `src/templates038.js`), like the 0.3.4 `git grep` / `git show`, so their
requests never fall through to a different 0.3.3 answer.
**Gate fall-through guard:** when the templates model ranks a template intent among its candidates at p >= 0.2 but
not first (among its top 5, whatever `--top` is), the request falls through to the 0.3.3 model; that answer is withheld if its risk is medium or higher
(`missing: args (a <template> template request, not answered by the fallback model)`, `fallthroughGuard` in
`src/templates038.js`), so a retrain's probability shift cannot turn a fetch-like request into a runnable `git pull` /
`git checkout -b`. Safe fall-through answers are unchanged.
`model/model_templates.bin` is retrained (catalog + the structural real-usage train split); `model/model.bin` (0.3.3) is
unchanged. On the private real-usage eval split (36,858 labelled rows, rebuilt with the 0.3.4 + 0.3.8 labels) the gate
scores 93.66% (93.59% with the 0.3.4 templates model); human-written requests 89.23% (88.60%); template intents 87.2%
(50.0%, n=78); every other intent 93.68% (93.68%).

**cmd:** a URL in a path slot keeps its slashes (`start "" "https://…"`).

## 0.3.9 — repeat phrasings guarded

**Safety:** the 0.3.8 same-but risk guard also covers repeat phrasings at the start of a request followed by
"but"/"ale" (`again but without deleting it` after `cat config.txt` is no longer `rm config.txt`; `repeat it, but discard
changes` after `git status` is refused; Polish `jeszcze raz, ale …`, `powtórz to ale …`, `jak poprzednio, ale …`). Guard
only: these phrasings are not applied as modifiers of the previous command. Models are unchanged.

## 0.3.8 — "same but" safety fix

**Safety:** a "same but …" follow-up never turns the previous command into a different, riskier intent, whichever way
the history reference is resolved (`src/samebut-guard.js`; whitespace and line breaks are folded first; a previous
command tellsh cannot classify counts as safe). Before, `same but no discard` after any git command suggested
`git restore .`, and `same but without deleting it` after `cat config.txt` suggested `rm config.txt` (both high risk,
never auto-run, but one Enter away); both are now refused with a hint to ask directly. Other repeat phrasings ("again but
without deleting it") are not recognised yet (known limit); a plain `delete it` still works. Models are unchanged.

**Build (no runtime change):** training scripts synced with the pipeline that built the 0.3.5/0.3.6 models
(`scripts/real/prepare_real.js --labels 036` reproduces that split exactly; structural split, template-generated row
flag, private-data writer); `npm run train` writes `build/model.bin` and no longer rewrites `model/*.json`;
`scripts/train.py` refuses to overwrite a shipped `model/` file (by inode) without `--replace-shipped`;
`scripts/real/eval_gate.js` scores the two-model gate on the private eval split (aggregates only).

## 0.3.7 — installed-tool flag check

**Help-verifier.** Before a command is shown, its flags are checked against the man page of the tool actually
installed (new `src/helpcheck.js`). Only system tools (real path in /bin, /usr/bin, /sbin, /usr/sbin) are checked;
Homebrew / GNU coreutils on macOS are not. The tool is never executed: only `man -P cat <page>` (`git-<sub>` for git) from a
fixed absolute path, no shell, closed stdin, minimal environment, 250 ms timeout, 256 KB cap, at most 270 ms of probes
per call. Option arguments are parsed from the page so operands are not mistaken for flags; unknown arity is never
flagged; long options accept only a unique prefix. Option tables (and failures, for a day) are cached per binary
(realpath + size + mtime) in `$XDG_CACHE_HOME/tellsh/help` (`~/.cache/tellsh/help`). An undocumented flag prints a
warning (`flag -x not found in your installed <tool> man page`) and `--yes` refuses to run the command; a missing tool
is noted. `--json` carries the result as `helpcheck`. Commands are never rewritten; commands nested in `find -exec` /
`xargs` are not checked. `suggest()` is unchanged (the check runs in the CLI only). `TELLSH_HELPCHECK=0` turns it off.

## 0.3.6

**The distilled student runs in pure JS and is on by default.** A new forward pass (`src/rerank/student-js.js`, with a tiny
WebAssembly SIMD kernel for matmuls and attention and a plain-JS fallback) runs the A+S student without onnxruntime, from the `tellsh-model-student` 0.2.0 bundle (`student.bin`: int8 weights with
per-row scales, ~17 MB; built by `scripts/hybrid/export_student_js.js`). The package is now a regular dependency, so a
plain `npm i -g tellsh` gets the A+S hybrid; onnxruntime-node stays an optional peer for `--hybrid` (A+B) only. The
policy is unchanged; the JS student matches the 0.3.5 ONNX student's final decision on 99.71% of the public eval rows and
its accuracy on held-out real usage (A 89.4% → A+S 91.0% human-phrased, 94.1% → 95.7% template-phrased; numbers in
[HYBRID.md](HYBRID.md)). A whole CLI call that consults the student takes ~0.25 s on an Apple M-series laptop and ~0.42 s
on a 1-core Xeon VM. The bundle cache directory is now `~/.cache/tellsh/stu-v2`; an ONNX-only 0.1.x bundle counts as
missing (cascade alone).

## 0.3.5

**Optional distilled student (A+S).** If `onnxruntime-node` and the new optional `tellsh-model-student` package (a 14 MB
3-layer encoder) are both installed, tellsh consults the student when the cascade's confidence is below 0.6:
`npm i -g tellsh onnxruntime-node tellsh-model-student`. A rejection is never turned into an answer, and the student
replaces the cascade's answer only when it is confident (p >= 0.5, pNone < 0.5). Answers the student changed are never
auto-run with `--yes`. On real held-out usage it raises correct answers from 89.4% to 91.1% (human-phrased) and from 94.1% to
95.7% (template-phrased), with no new false accepts on out-of-scope sets (numbers in [HYBRID.md](HYBRID.md)). Without
either optional package tellsh behaves exactly as 0.3.4. `--no-hybrid` / `TELLSH_HYBRID=0` turns the student off.
`TELLSH_HYBRID=student-full` also lets a very confident student (p >= 0.9) overrule a confident cascade. `--hybrid` (A+B)
is unchanged.

## 0.3.4

**New catalog templates** (from a separate retrained model, `model/model_templates.bin`, consulted only when it picks one
of them; every pre-existing intent is still answered by the unchanged 0.3.3 model): `git fetch --all`, `git ls-files`,
`gh issue list`, `gh issue view <N>`, `gh run watch [N]`, `npx wrangler d1 list`, `npx wrangler pages deploy <dir>`.
Values are explicit only; a request the template cannot render is marked incomplete and withheld from execution.

**Known-limits fixes:** PowerShell `--workspace` quoting, `pip install --target` (an allow-listed target only).

**Safety:** a follow-up that refers to a 0.3.4 template (or to a `git
grep` / `git show` line) in history is refused except "same for X"; git grep / git show are not suggested as runnable (kept for a later release).

## 0.3.3

Republish of 0.3.2 (reviewed): 0.3.2 was accidentally published from an unreviewed working tree.

## 0.3.2

**Prompt (UX).** A single keypress: **Enter runs the command at every risk level** (no more `y` / `yes`), **Esc** or
**Ctrl+C** (also Ctrl+D, `n`, `q`) aborts, `e` edits. Medium-risk commands show a yellow warning line, high-risk, unrated
and composed (experimental) ones a red one, before the prompt. Only a deliberate Enter runs: keys typed or pasted while
the suggestion is computed are discarded, `\n` (Ctrl+J), an Enter inside a burst of keys and bracketed-paste content
never confirm, and an abort key anywhere in a burst aborts. Commands that match a catastrophic
pattern (`rm -rf /`, `mkfs`, `Format-Volume`, …) still have to be typed again in full. An incomplete command (a
`<PLACEHOLDER>` left) never runs: Enter opens the editor. `--yes` is unchanged (safe catalog commands only).

The model, catalog and templates are unchanged from 0.3.1 (new catalog templates are in progress on
`feat/templates-catalog` and need a retrain that passes the full test suite).
