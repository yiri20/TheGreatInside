# SCORING LOCKED — all 5 Session 19 candidates

Locked: 2026-08-20, roster-1000 session 19.

All five candidates' `rows` in `data-pipeline/candidates/*.json` are now
frozen:

- `mustafa-kemal-ataturk.json` — 29 rows
- `aung-san-suu-kyi.json` — 25 rows
- `anna-pavlova.json` — 25 rows
- `akio-morita.json` — 26 rows
- `oscar-niemeyer.json` — 24 rows

Each row traces to one or more frozen evidence-ledger episode ids (cited
in its `rationale`), per `docs/scoring-rubric-v1.md`. All five candidates
were scored by the same single scorer (the orchestrating session) for
cross-candidate consistency, per the Session 19 governing instructions.

From this point forward:

- No new trait rows will be added.
- No rows will be deleted.
- No confidence values will be edited.
- No evidence will be edited.
- No further research will be performed.
- No row will be reinterpreted based on the eligibility outcome that is
  about to be computed.

`eligibility_v2` will now be run exactly once, across all five candidates
together. Any result — 0/5 through 5/5 — will be reported as-is.
Near-misses will not be rescued; any candidate failing any gate is held,
not adjusted.
