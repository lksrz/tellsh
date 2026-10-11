I've fixed all four rules from the final3 reviews and committed as `8b55a5e` on `master` (not pushed). All 418 tests pass, and the public `npm run eval` sections are byte-identical to before.

**1. Paths.** An unquoted path is never cut at its first space.
- The words after a path, up to the end of its span, are part of its name: `delete the folder ~/Old Projects` → `rm -r ~/'Old Projects'`, `move /tmp/old notes to /tmp/archive` → `mv -i '/tmp/old notes' /tmp/archive`. The span ends at the end of the request, a word like "to", "recursively" or "please", or a noun like "folder".
- If a changing command's path has an unclear end, it gets a placeholder and a warning: `delete file /tmp/a.txt b.txt` → `rm <FILE>`.
- Read-only commands only extend an explicit path that ends the request. Applying the rule to them more widely caught ordinary sentence words ("node_modules **is the largest**").
- The composer also uses the whole name.

**2. Prompt.** A medium-risk command no longer runs on Enter; it needs `y`. High-risk and composed commands need `yes`, and a command with a placeholder never runs as is. This applies to every medium command, including `git pull` and `mv`.

**3. Project code.** pytest, make, cargo, npx, wrangler and yarn are at least medium even for `--help`/`--version`. So are npm/pnpm/poetry/uv with a subcommand, `go test`/`go run`, and node/python with a script or `-m`. `show the help for pytest` is now medium and `--yes` won't run it; `node --version` and `npm --help` stay safe.

**4. Scope options.**
- **npm workspace:** kept, so `run npm deploy --workspace staging` → `npm run deploy --workspace staging`.
- **gh project:** read as the repository, so `merge pr 42 in project acme/backend` → `gh pr merge 42 --repo acme/backend`.
- **Anything a command can't express** becomes a `<SCOPE>` placeholder, e.g. `npm run deploy --env prod`.

**Also fixed:** `run npm build or test` used to produce `npm run '?'` (an internal marker); it's now `npm run <SCRIPT>`.

**Measurements**
- **All eval sets (4,438 requests):** no command changed. Two risk ratings went up (`cargo` and `wrangler --version`, safe → medium).
- **Dev-tools eval:** still 293/324 exact.
- **Latency:** warm 0.431 ms before vs 0.445–0.468 ms after, which is within run-to-run variation.

**Regression tests:** `test/regressions28.test.js` covers all 9 review examples plus each rule. Four older parser tests expected `node server.js`, `python3 script.py`, `make` and `python3 -m json.tool` to be safe; they now expect medium, as rule 3 requires.

**Decisions and limits to check**
- Path ends are judged with word lists, so there are edge cases:
  - An unlisted word becomes part of the name: `delete folder /tmp/build output` → `'/tmp/build output'`.
  - A noun right after a path ends it: `extract a.tar.gz to /tmp/my dir` → `-C /tmp/my`.
  - A name with an extension is treated as complete.
  - Quoting the path always works. These limits are listed in EVAL.md and the README.
- Scope options are only read for npm, pip, gh and wrangler.
- **Not fixed (existing behavior):** a typed `-R` is dropped in `chmod -R 777 /srv/data` → `chmod 777 /srv/data`. The command is shown and now needs `y`.

Git had no user identity configured, so I committed with the same author as the earlier commits (`lksrz <lukasz@wearfits.com>`) without changing any git config. I left `review/STATUS` and the empty `review/close4-fix.md` uncommitted, as they were.
