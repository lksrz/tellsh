# Changelog

## 0.3.4

**New catalog templates** (from a separate retrained model, `model/model_templates.bin`, consulted only when it picks one
of them; every pre-existing intent is still answered by the unchanged 0.3.3 model): `git fetch --all`, `git ls-files`,
`gh issue list`, `gh issue view <N>`, `gh run watch <N>`, `npx wrangler d1 list`, `npx wrangler pages deploy <dir>`.
Values are explicit only; anything the template cannot render is a placeholder, never run.

**Known-limits fixes:** PowerShell `--workspace` quoting, `pip install --target` (an allow-listed target only).

**Safety:** a typed command is never rewritten into another runnable one; a follow-up that refers to a 0.3.4 template in
history is refused except "same for X"; git grep / git show are not suggested as runnable (kept for a later release).

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
