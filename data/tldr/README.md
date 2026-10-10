# data/tldr

`tools.jsonl` and `flags.jsonl` are derived from
[tldr-pages](https://github.com/tldr-pages/tldr), commit `f8a47632075aa8a2439081677b549b2b54bf6f05`
(English `pages/` and Polish `pages.pl/`; platforms common, linux, osx, windows).

tldr-pages content is licensed under the
[Creative Commons Attribution 4.0 International License (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/),
© the tldr-pages team and contributors.

**Modified:** pages were filtered to the commands relevant to tellsh, example
descriptions were cleaned (trailing colons dropped, backticks/placeholders
unwrapped, mnemonic brackets removed, whitespace collapsed) and mapped to tellsh
tool families; option flags were extracted from example commands.

Files:

- `tools.jsonl`: `{"text", "tool", "lang", "page", "cmd"}`; one row per example
  description plus one per page summary (`cmd` is null for summaries).
- `flags.jsonl`: `{"tool", "head", "sub", "flag", "long", "text", "lang", "page"}`;
  one row per option flag found in an example command.

## Regenerate

```sh
git clone --depth 1 https://github.com/tldr-pages/tldr data/external/tldr
python3 -I scripts/tldr_ingest.py
```
