# Round 4b fixes (review/r4-claude.md, review/r4-codex.md, stricter rules)

Version stays 0.3.0. Nothing pushed or published. Regression tests: `test/regressions6.test.js` (new) and
updated expectations in `test/regressions{3-history,4,5}.test.js` and `test/pipeline.test.js`. 233/233 tests pass.

## History references for changing commands (`src/history.js` `changeGuard`, `src/pipeline.js`)
A non-safe intent (rm, mv, cp source *and* destination, kill, chmod, git branch -d / checkout / restore, docker
stop/exec, service restart, ...) takes a history value only when it is unambiguous and the newest value of its type.
Otherwise the slot is a placeholder and `context.rule` is `refused`:
- listed or searched directories are never targets, for "it" as well as "them" (`ls DIR`, `tree DIR`, `du DIR`,
  `du -d 1 DIR | sort`, `Get-ChildItem DIR`, `find`, `grep -r`, `rg`, `fd`, `locate`, piped listings, `tellsh` listings);
- an older value is never picked: no older branch when the newest is the checked-out one, no hint-word match
  ("delete that backups folder") for a changing command (reads still may);
- a newer listing of the same entity type blocks older values: files/dirs (`ls`, `find`, `grep -r`, `git status`, ...),
  processes (`ps`, `top`, `pgrep`, `Get-Process`), ports (`ss`, `lsof`), containers (`docker ps`), services
  (`systemctl list-units`/`--failed`, `Get-Service`), branches (`git branch`);
- a `cd` directory is a target only if nothing ran after the `cd` (`cd DIR; make`, `cd DIR; rg TODO`: refused);
- "copy notes.txt to it / into that folder / do niego": the reference is the destination and the named path the
  source (previously `cp -ri /backup notes.txt`); the destination goes through the same guard.

## Stale replay
Unchanged from round 4 (refused when any newer line or later segment ran), with more tests: `rm -r old; ls`,
`rm -r old` + `cd`, `kill 1111; echo done`, `tellsh delete folder old` + `ls`, for "same for", "same but" and Polish.

## Danger checker (`src/danger.js`)
- `-c`/`--command`/`--command=` payloads of any program are checked; shells/su/runuser also in clusters
  (`bash -lc`, `sh -ec`, `su -lc`); `env -S`, `cmd /c`, `pwsh -Command`, `eval`/`iex`.
- After a wrapper (sudo, doas, su, runuser, pkexec, flock, nice, ionice, timeout, stdbuf, nohup, setsid, env, xargs,
  chrt, cgexec, eatmydata, torsocks, catchsegv, parallel, tmux, faketime, proxychains, ...), and for `ssh host …` and
  `docker/podman/kubectl exec|run …`, the command starting at every later non-option word is checked
  (`sudo -iu root rm -rf /` was medium, now critical).
- Unsure is high: command name from an expansion (`$CMD -rf /`), a runner's payload with `$`/backtick (`sh -c "$X"`,
  `eval "$X"`, `find -exec sh -c '… $1'`), `pwsh -EncodedCommand`, text piped into a shell or `iex`.
- `su`/`runuser`/`pkexec` are at least medium (like sudo). `grep -c "$PAT"` etc. stay safe.

## Function-word paths (`src/pipeline.js`)
"list files in the", "list files in out", "list files in", "pokaż pliki w", "find log files in the" now render
`<PATH>` instead of `.`; such a withheld slot is not filled implicitly from history either.

## Teacher (Jev) exclusion
`scripts/lib/heldout.js` `exclusionIndex(root)` = held-out index + eval-only slot values; used by both
`gen_data.js` and `teacher.js` (the teacher previously skipped the eval-only value filter). `gen_data` output is
byte-identical, so the model was not retrained.

## Eval / bench
- history dev 97.9% → 91.7%, blind 82.3% → 79.7%: the 5 newly failing rows expect an older branch after
  `git checkout main` (4) or a container before a newer `docker ps` (1); they now render placeholders on purpose.
- Other eval numbers unchanged (85.3% e2e, 94.6% OOD). Bench re-run (machine slower: bare node 75 → 86 ms):
  cold p50/p95 171/190 ms, warm 0.35/3.9 ms.
- Pre-existing, not changed: `scripts/check_variants.js` reports 1 failure (`history_search [zsh] unknown key`) on HEAD too.

## Behaviour changes (tests updated on purpose)
`ls /tmp/build` + "delete it", `cd /tmp/build; ls` + "delete it", `ls /tmp/build; echo done` + "delete it",
`ls /a /b` + "delete it", `kill 1111; pgrep worker` + "kill that pid", "delete that branch" after `git checkout main`,
"move it to /tmp/old" after `ls /tmp/build`, `su - bob` (now medium): all now refuse / escalate.
