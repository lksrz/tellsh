# tellsh

**Say what you want in Polish or English, get the bash command.** Fully offline, zero runtime
dependencies, no generative model at runtime. It's a fast "System 1" reflex, not an LLM. Each request
is classified into one of ~150 known intents, then slots (paths, numbers, sizes, ports, names…) are
extracted deterministically and filled into a vetted, safely quoted command template.

```console
$ tellsh pokaż 5 największych plików w ~/Pobrane
$ find ~/Pobrane -xdev -type f -exec du -h {} + 2>/dev/null | sort -rh | head -n 5
  largest_files · risk: safe · confidence: 95%
[Enter] run · e edit · n abort:

$ tellsh what is listening on port 8080
$ ss -ltnup 'sport = :8080'
  process_on_port · risk: safe · confidence: 95%

$ tellsh zabij wszystkie procesy chrome
$ pkill -f chrome
  kill_by_name · risk: high · confidence: 100%
  ! terminates processes
High risk. Type "yes" to run, e to edit, anything else aborts:
```

## Install

```bash
npm i -g tellsh        # then: tellsh <request...>
npx tellsh df          # one-off, no install
```

Requires Node ≥ 18. No network is needed after install (except for intents that use the network
themselves, e.g. `public_ip`, `ping_host`, `download_file`).

### Offline / air-gapped install

```bash
# on a machine with the repo (or with npm access)
npm pack                       # -> tellsh-0.1.0.tgz (~0.85 MB gzipped, 3.8 MB unpacked, includes the model)
# copy the tarball over, then on the target:
npm i -g ./tellsh-0.1.0.tgz
```

There are no dependencies to fetch, so the tarball is all you need.

## Usage

```
tellsh [options] <request...>

  -n, --dry-run     print the command only, never run it
  -y, --yes         run without prompting (only for risk=safe commands)
  -e, --explain     show intent, extracted slots and top candidates
      --json        machine-readable output (implies --dry-run)
      --top <k>     number of candidate intents to show (default 3)
      --threshold <p>  override the confidence threshold
      --platform <linux|darwin>  generate commands for another OS
  -v, --version / -h, --help
```

At the prompt: **Enter** runs, **e** opens the command in an editable line (readline, prefilled),
**n** aborts. The command runs via `$SHELL -c` (falls back to `bash -c`) with inherited stdio, and
tellsh exits with the command's exit code. When stdout/stdin is not a TTY (pipes, scripts), tellsh
**only prints** the command unless `--yes` is given.

Exit codes: command's own code when run · `0` printed · `2` no request · `3` not understood ·
`4` `--yes` refused (not safe / incomplete) · `130` aborted.

### More examples

| request | command |
|---|---|
| `find all pdf files in Documents modified in the last 3 days` | `find ~/Documents -type f -iname '*.pdf' -mtime -3` |
| `pliki większe niż 1,5 GB` | `find . -type f -size +1536M -exec ls -lh {} +` |
| `szukaj słowa error w plikach .log` | `grep -rn --include='*.log' -- error .` |
| `pliki zmienione w ciągu ostatnich 2 godzin` | `find . -type f -mmin -120` |
| `logi nginx z ostatniej godziny` | `journalctl -u nginx -n 50 --no-pager --since '1 hour ago'` |
| `zamień 'localhost' na '127.0.0.1' w pliku app.conf` | `sed -i s/localhost/127.0.0.1/g app.conf` |
| `utwórz nową gałąź o nazwie fix-123` | `git checkout -b fix-123` |
| `commit everything with message "fix typo"` | `git add -A && git commit -m 'fix typo'` |
| `connect to myserver.com as root` | `ssh root@myserver.com` |
| `spakuj folder projekt do tar.gz` | `tar -czvf projekt.tar.gz projekt` |
| `ile linii kodu w plikach python` | `find . -type f -iname '*.py' -exec cat {} + \| wc -l` |
| `how much ram is free` (macOS) | `vm_stat` |

Coverage: largest files/dirs, disk usage, find by name/ext/age/size, grep, counting, processes
(cpu/mem/name/port/kill), network (ip, public ip, ping, dns, traceroute, ports, curl), archives
(tar.gz/zip), permissions, copy/move/delete, git (status/log/diff/branches/undo/stash/pull/push/clone/commit),
docker (ps/logs/images/stop/prune/exec/compose), systemd/journalctl, system info, env, cron, hashes,
base64, and more. See `src/catalog.js` for all intents.

## How it works

```
request ─► normalise ─► hashed features ─► logistic regression ─► intent (+ confidence)
   │                                                                 │
   └──────────► regex slot extraction ─────────────► template fill ◄─┘
                                                          │
                                       danger checker ─► risk ─► confirm ─► $SHELL -c
```

1. **Normalisation.** Lowercase, fold Polish diacritics (`ż→z`, `ł→l`, …), digits → `0`, then keep `[a-z0-9]` tokens.
2. **Features.** Stemmed word unigrams and bigrams (light stemming = prefix truncation to 5 chars,
   which works well for Polish inflection: `plików/plikach → pliko/plika`, `największych → najwi`),
   plus character 3–5-grams inside word boundaries. Each block is L2-normalised. Everything is hashed with
   FNV-1a into 2^18 buckets. `src/features.js` and `scripts/features.py` are exact mirrors, and
   `test/parity.test.js` checks the hashed features and probabilities against a fixture exported by Python.
3. **Classifier.** Multinomial logistic regression (scikit-learn, lbfgs), trained by `scripts/train.py`.
   Only the most important feature rows (by weight norm) are kept, the model is retrained on them, and
   the weights are quantised to int8 with a float scale per class. The shipped `model/model.bin` is a
   tiny header plus raw typed arrays, loaded in a few ms.
4. **Confidence.** The softmax max probability is compared with a threshold that was calibrated on an
   internal split of the training data plus out-of-domain chit-chat (`data/ood.jsonl`). Below the
   threshold, tellsh says *"I don't understand"* and lists the top-3 candidates.
5. **Slots** (`src/slots.js`). Deterministic regex and vocabulary extraction:
   - paths, filenames and named places (`~/Pobrane`, `Downloads`, "katalog domowy" → `~`, "cały dysk" → `/`)
   - counts (digits or EN/PL number words up to 20)
   - sizes (`100M`, `1,5 GB`, `500 megabajtów`)
   - extensions (`.log`, "pliki pdf", "python files" → `py`)
   - durations ("last 7 days", "ostatnie 2 godziny", "wczoraj")
   - ports, PIDs, quoted strings, URLs, hosts, `user@host`
   - process/service/container/package names, git branch names, env vars, sed old/new pairs

   Missing slots fall back to defaults, or to a visible `<PLACEHOLDER>` when no safe default exists.
6. **Templates** (`src/catalog.js`, `src/fill.js`). Every value is POSIX-quoted (`'…'\''…'`). Numeric
   slots are inserted raw only after validation. Paths starting with `-` get a `./` prefix. macOS
   variants are used where commands differ (`lsof` vs `ss`, `vm_stat` vs `free`, `sed -i ''`, `shasum -a 256`, …).

## Safety model

* Every intent has a base risk: **safe** (read-only), **medium** (modifies state: chmod, mv, git push, sudo…),
  or **high** (destructive: rm, kill, prune, discarding git changes).
* `src/danger.js` scans the **final** command, including commands you edited, and can only
  **escalate** risk. It catches `rm -rf /`/`~`/`*`, `mkfs`, `dd of=/dev/…`, `> /dev/sd*`, `chmod -R 777 /`,
  fork bombs, `curl … | sh`, `sudo`, `find -delete`, force-push, `git reset --hard`, `shutdown`, `crontab -r`, …
* Confirmation depends on risk:
  - safe/medium: run with Enter.
  - high: you must type `yes`.
  - catastrophic patterns: you must retype the whole command.
* `--yes` never runs anything that isn't `safe`. Commands with unfilled `<PLACEHOLDER>`s can't run until edited.
* No piping into a shell happens without you seeing the exact command first. Non-TTY use prints only.

tellsh is a convenience tool. Always read the command before pressing Enter.

## Accuracy & speed

See [EVAL.md](EVAL.md) (generated by `npm run eval` and `npm run bench`). It reports held-out top-1/top-3
accuracy overall and per language, OOD rejection, slot-filling tests, and cold/warm latency.

## Development & retraining

```bash
npm test                       # node:test — parity, slots, danger, quoting, CLI
python3 scripts/train.py       # needs numpy + scikit-learn; writes model/model.bin + test/fixtures/parity.json
npm run eval                   # held-out accuracy -> EVAL.md
npm run bench                  # latency (taskset -c 0) -> EVAL.md
```

Data layout:

* `data/intents/*.jsonl`: training paraphrases `{"text", "intent", "lang"}`, ~30 EN + ~30 PL per intent
  (informal wording, typos, missing diacritics, inline slot values). Add `data/train.jsonl` for extra examples.
* `data/eval/*.jsonl`: held-out set of ~8 EN + ~8 PL per intent, written independently. It is never
  used for training, and `train.py` drops any training sentence that collides with it after normalisation.
* `data/ood.jsonl` (threshold calibration) and `data/ood_eval.jsonl` (reporting): out-of-domain requests.

To add an intent:
1. Add it to `src/catalog.js` (template, slots, risk, optional `darwin` variant).
2. Add ~60 paraphrases to `data/intents/` and ~16 to `data/eval/`.
3. Retrain, then run `npm test` and `npm run eval`.

## Roadmap

* Optional **small ONNX sentence-encoder head** (e.g. a distilled multilingual MiniLM, int8) as a second
  stage for low-confidence queries. It would be opt-in, keeping the zero-dependency default.
* **Distillation**: use a larger model (e.g. basal/Jev) as a teacher to label real-world query logs and
  generate harder paraphrases, then retrain the linear student.
* Multi-step requests ("find big logs and gzip them") via intent composition.
* Shell-aware slot extraction (globs, env vars) and per-user aliases/feedback (`tellsh --fix` to relabel).
* zsh/fish history integration, and more macOS/BSD template coverage.

## License

MIT
