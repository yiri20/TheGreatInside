# SCORING LOCKED — all 5 Session 18 candidates

Locked: 2026-08-20, roster-1000 session 18.

All five candidates' `rows` in `data-pipeline/candidates/*.json` are now
frozen:

- `louis-pasteur.json` — 26 rows
- `fyodor-dostoevsky.json` — 24 rows
- `indira-gandhi.json` — 20 rows
- `louis-armstrong.json` — 21 rows
- `william-wilberforce.json` — 18 rows

Each row traces to one or more frozen evidence-ledger episode ids (cited
in its `rationale`), per `docs/scoring-rubric-v1.md`. From this point
forward, per the Session 18 governing instructions:

- No new trait rows will be added.
- No rows will be deleted.
- No confidence values will be edited.
- No evidence will be edited.
- No further research will be performed.
- No row will be reinterpreted based on the eligibility outcome that is
  about to be computed.

`eligibility_v2` will now be run exactly once, across all five
candidates together, per instruction 13 of the Session 18 brief. Any
result — 0/5 through 5/5 — will be reported as-is. Near-misses will not
be rescued; any candidate scoring 17/18 or 16/18 on the scored-attribute
floor, or otherwise failing any gate, is held, not adjusted.
