I've fixed every finding in `review/r8-claude.md` and `review/r8-codex.md`, each with regression tests, and committed it all as `07ea182` on `master`. All 314 tests pass, and nothing was pushed or published. History still reads only the previous command.

**The Major you singled out: quoted arguments**
- After the first argument, an argument with a space is now a value only if:
  - it starts like a path (`"/tmp/my data"`), or
  - it looks like a file name, its first word isn't a request word, and every space comes after the last `/` (`"My Notes.txt"`, `"data/my notes.txt"`).
- Everything else gets a placeholder plus a warning, including the history copy:
  - `delete "folder /tmp/x"` → `rm -r <PATH>`
  - `delete "the file notes.txt"` → `rm <FILE>`
  - `usuń "plik raport.pdf"` → `rm <FILE>`
  - `delete "all files in /tmp/x"` → `find <PATH> …`
  - `delete "My Notes.txt"` stays `rm 'My Notes.txt'`.
- **Side effect:** `delete "my data/a.txt"` is now unclear too, because the space comes before the `/`. That follows your rule, but it was a value before.

**The two Majors from codex**
- **Commands aimed at another repo or daemon:** after `git -C /repo blame notes.txt`, `docker --context prod logs web`, `docker -H …` or `DOCKER_HOST=…`, "delete it", "stop it" and "same for api" are refused. Two older tests that expected `docker stop web` and `git branch -d feature/x` in that situation now expect a refusal.
- **Calibration leak:** the shadow model used to calibrate the hybrid (A_dev) now excludes the dev split from every training source, including the out-of-domain, tldr and anaphora rows.
  - Before, all 23 out-of-domain dev sentences were in A_dev's training data; now none are. The shipped model's data still contains all 23, as it should.
  - I rebuilt A_dev and recalibrated A+B. Its threshold moved from 0.8 to 0.9 and its mixing weight from 0.75 to 0.5.

**Minor findings**
- After `python3 script.py data.csv`, "delete it" gives a placeholder; the script and its argument both count as operands.
- With bash history, an identical last `tellsh` line is no longer dropped, since bash writes the call only after it runs.
- `dd of=`, `cp`/`install`/`mv`/`ln -f` onto a system file, `perl -i` on one and `chmod 000` of one are now critical. Copying into a system directory (`cp x.service /etc/systemd/system/`) and plain `chmod 644` are not.
- A quoted unclear argument now also blanks name, service, container and package slots. In practice these slots never take such values yet, so this is defensive and tested directly.

**Results**
- **Main model (A):** unchanged. The eval output is identical (history dev set 92.5%).
- **Hybrid A+B:**

| | Before | After |
|---|---|---|
| Real usage | 88.3% | 88.8% |
| End-to-end exact command (relexicalised `data/eval`) | 85.4% | 86.3% |
| `data/eval` | 96.8% | 96.7% |
| Shell-phrased eval | 98.5% | 98.2% |
| v0.4 devtools set | 97.9% | 97.6% |
| Out-of-domain rejection | unchanged | unchanged |

  The reviewer's typo example `clnoe https://github.com/sharkdp/bat` gives `git clone` again.
- EVAL.md, HYBRID.md (including the reproduce steps), README and the results files are updated.

**Things to check**
- **Hybrid is slower on real usage:** A+B now hands more requests to the encoder (42% of real-usage rows, up from 31%). Warm p50 goes from 1.3 to 7.2 ms, cold from 240 to 401 ms.
- **The tiny-LM reranker (C) was rescored, not retrained.** Its scores were tied to the old A_dev, so I recomputed them on CPU with the same model. Matching the original run needed `--dtype bfloat16`; scores still differ slightly from the old ones because of batch padding. A+C moved from 0.9 to 0.8 and now covers every dev row. C isn't shipped.
- **The A bench ran on a noisier machine:** bare `node` startup went from 83 to 112 ms. tellsh's own cold overhead is unchanged at about 93 ms, and README shows the new numbers.
- **Not covered:** podman containers were never read from history, so the podman part of the scope fix has no visible effect yet.
- **Commit identity:** git has no identity configured, so I committed as `lksrz <lukasz@wearfits.com>`, matching earlier commits. The untracked `review/fix8-log.md` was left out.
