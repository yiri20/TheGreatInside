# Roster research — entrypoint

This is a routing stub, not a duplicate procedure. Read in this order:

1. [`docs/checkpoints/roster.md`](../checkpoints/roster.md) — current
   roster numbers, the frozen protocol summary, known open items. Start
   here.
2. [`docs/adding-a-person.md`](../adding-a-person.md) — the exact
   command-by-command pipeline (identity preflight → research → score →
   validate → promote → regenerate dispersion/calibration → verify).
3. [`docs/scoring-rubric-v1.md`](../scoring-rubric-v1.md) — the
   methodology for turning evidence into a trait score (the four fields,
   confidence bands, anti-pattern table, the confidence-change policy).
4. `data-pipeline/candidates/README.md` — candidate-file workflow
   mechanics (step 0: name-collision check + live Wikidata verification —
   both mandatory, both added after real incidents).

## Do NOT read for a routine roster addition

- `docs/archive/session-history/roster-1000-checkpoint.md` — the full
  19-session narrative (methodology experiments, dead ends, exact
  historical arithmetic). Only open it to resolve a specific historical
  "why was this threshold chosen" question that steps 1–4 don't answer.
- Editorial content docs (`docs/editorial-content.md`) — a different
  concern (deepening an already-roster'd person's profile page), not
  needed to add a new person.
- Monetization or deployment docs — unrelated.

## If you're auditing roster *philosophy* (e.g. a self-made/earned-
## distinction review), not adding a person

Read only:
1. `CLAUDE.md` (the router)
2. `docs/context/CURRENT_STATE.md`
3. `docs/reference/architecture.md`'s "Inclusion philosophy" section
4. `docs/checkpoints/roster.md`
5. The actual roster/evidence files as the audit needs them (`src/data/
   people/*.ts`, `data-pipeline/candidates/*.json`)

Do not read editorial, monetization, or deployment history for this kind
of audit.
