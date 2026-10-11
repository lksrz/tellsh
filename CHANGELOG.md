# Changelog

## 0.3.2

**Prompt (UX).** A single keypress: **Enter runs the command at every risk level** (no more `y` / `yes`), **Esc** or
**Ctrl+C** (also `n` / `q`) aborts, `e` edits. Medium-risk commands show a yellow warning line, high-risk and unrated ones a
red one, composed (experimental) ones a yellow "experimental" line, before the prompt. Commands that match a catastrophic
pattern (`rm -rf /`, `mkfs`, `Format-Volume`, …) still have to be typed again in full. An incomplete command (a
`<PLACEHOLDER>` left) never runs: Enter opens the editor. `--yes` is unchanged (safe catalog commands only).

The model, catalog and templates are unchanged from 0.3.1 (new catalog templates are in progress on
`feat/templates-catalog` and need a retrain that passes the full test suite).
