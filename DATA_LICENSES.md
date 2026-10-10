# Data sources and licenses

tellsh's code is MIT (see `LICENSE`). The training data and the shipped model weights derive from the
sources below. **No raw third-party corpus is shipped in the npm package**: the tarball contains only the code,
`model/model.bin` (int8 weights), `model/tldr_triggers.json` (a few stems per flag) and
`model/compose_explained.json` (see `package.json` `files`).

| source | license | used for | in git | in npm tarball |
|---|---|---|---|---|
| tellsh's own paraphrases (`data/intents`, `data/eval`, `data/shell`, `data/history`, `data/compose`, `data/slots`, `data/ood*.jsonl`) | MIT (written for this project) | all training / evaluation | yes | no |
| [tldr-pages](https://github.com/tldr-pages/tldr) commit `f8a47632075aa8a2439081677b549b2b54bf6f05`, `pages/{common,linux,osx,windows}` and `pages.pl/*` | **CC-BY-4.0**, © the tldr-pages team and contributors | stage-1 tool classifier training (example descriptions mapped to tool families, 1.7k rows after capping) and weak composer flag triggers | derived files only: `data/tldr/*.jsonl` (cleaned + mapped, see `data/tldr/README.md`) | no (only `model/tldr_triggers.json`: ≤6 word stems per flag, plus the trained weights) |
| [NL2Bash](https://github.com/TellinaTool/nl2bash) | **GPL-3.0** | **not used** — not for training, not for evaluation, not as inspiration for data, to keep the MIT package free of copyleft obligations | no | no |
| TypeSafe Jev API (teacher) | API terms of service | build-time verification of 300 sampled training labels / risk levels (see `EVAL.md`); no API output is shipped, only the resulting decisions (`data/teacher/decisions.jsonl`, written by hand after inspection) | review + decisions | no |

## Attribution (CC-BY-4.0)

The tool-family classifier in `model/model.bin` and the trigger stems in `model/tldr_triggers.json` were trained /
derived in part from **tldr-pages** (https://github.com/tldr-pages/tldr), © the tldr-pages team and contributors,
licensed under the Creative Commons Attribution 4.0 International License
(https://creativecommons.org/licenses/by/4.0/). Changes: pages were filtered to the commands tellsh supports,
descriptions were cleaned and mapped to tool families, option flags were extracted from the example commands.

## Regenerating the tldr-derived data

```bash
git clone --depth 1 https://github.com/tldr-pages/tldr data/external/tldr   # gitignored, never packed
python3 -I scripts/tldr_ingest.py                                           # -> data/tldr/*.jsonl
```
