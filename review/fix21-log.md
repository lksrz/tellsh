
## fix21 (round-21 Majors)
- wrangler env: known names or marked custom names (staging-eu, preview2) only, kept whole; "X env"/"env X" with an unknown
  word -> `<WENV>`; "for" no longer names an environment; a negated dry run drops `--dry-run`.
- gh pr: a non-neutral word between the verb and "pr" withholds `<PR>` also without a determiner (dependabot/draft/open/alice's);
  a quoted label/title/author is withheld before the quoted-value fallback; "the pr in question" withheld.
- English "to pr" is no longer a history reference (only Polish, at the start or after a Polish verb).
- test/regressions23.test.js; 373 tests pass; eval unchanged; bench rerun.
