# Session 17 — evidence quality / diagnostic-density audit

## Purpose

Sessions 14-16 established that Session 13's demonstrated scoring
density (mean 12.83 rows/candidate) could not be reproduced by Session
14 (mean 6.0) or Session 15 (mean 7.75), even after Session 15
rigorously verified a research-completeness floor matching or exceeding
Session 13's own episode counts for 2 of its 4 candidates
(`docs/roster-1000-checkpoint.md` §81). Session 16's frozen-ledger
reproducibility audit on Borges and Sankara found that scoring-
conversion discipline is a real but small (9.4% of Session 13's row
total) contributing factor, not the primary driver (§82 item 17).

This session tests a different, still-untested candidate explanation:
**did Session 13 collect more behaviorally diagnostic evidence per
episode than Session 15, even though both sessions' evidence ledgers
looked similarly deep by raw episode count?** This is an evidence-
QUALITY audit, distinct from Session 16's evidence-CONVERSION audit —
Session 16 held evidence fixed and varied the scorer; this session
holds the SCORING PROCESS out of scope entirely and instead classifies
the underlying evidence itself.

This session is explicitly **not**: a new research session (no
WebSearch/WebFetch was used — see "Zero new research" below), a
rescoring session (no candidate file's `rows` were touched), an
eligibility experiment (`eligibility_v2` was never run against
anything in this directory), or a historical correction pass (Sessions
13-16's own conclusions are read, not rewritten).

## Candidates

Exactly four, as specified by this session's own governing
instructions, no substitution needed:

- **Session 13 group**: Jorge Luis Borges, Thomas Sankara — the two
  Session 13 diagnostic candidates that landed closest to
  `eligibility_v2` (both 16/18 scored attributes), also Session 16's own
  audit subjects.
- **Session 15 group**: Enrico Fermi, James Baldwin — 2 of Session 15's
  4 tightly-controlled-calibration candidates.

All four had sufficient preserved evidence (their locked
`data-pipeline/candidates/*.json` `rows[*].rationale` text) to perform
this audit; no substitution was required.

## Evidence provenance

- Borges: `data-pipeline/candidates/jorge-luis-borges.json`, unchanged
  since commit `22c77de` (Session 13). Episode text (E1-E26) reused
  verbatim from `src/dev/roster1000/audits/session16/
  frozenEvidence.borges.md`, which was itself Session 16's own atomic
  decomposition of this exact candidate file's `rationale` text.
- Sankara: `data-pipeline/candidates/thomas-sankara.json`, unchanged
  since commit `22c77de`. Episode text (S1-S19) reused verbatim from
  `session16/frozenEvidence.sankara.md`.
- Fermi: `data-pipeline/candidates/enrico-fermi.json`, unchanged since
  commit `18fac06` (Session 15). Episode text (F1-F12) is NEW atomic
  decomposition performed this session, from that file's `rows[*]
  .rationale` text, using the identical methodology Session 16 used for
  Borges/Sankara.
- Baldwin: `data-pipeline/candidates/james-baldwin.json`, unchanged
  since commit `18fac06`. Episode text (J1-J12) is NEW atomic
  decomposition performed this session, using the identical
  methodology.

Every fact in every episode file is traceable to the `rationale` text
of a `rows` entry already committed and locked in the corresponding
candidate file — confirmed by construction (each episode file was built
by manually reading and decomposing that exact text, not by independent
lookup), and reconfirmed structurally by `session17Isolation.test.ts`'s
zero-diff assertion against all four candidate files.

## Reconstruction limitations

**A significant, honest finding of this session, not merely a caveat
carried forward unexamined**: instruction 10 asked this audit to
determine whether Session 15's evidence artifacts are closer to a
genuine pre-scoring ledger than Session 13's (Session 16 had flagged
this asymmetry as a real possibility for Borges/Sankara specifically).
**They are not closer.** Checked directly against
`docs/roster-1000-checkpoint.md`: §79 (Session 13) states a
19-episode (Borges) / 12-episode (Sankara) ledger was "built and locked
before any trait score was assigned," and §81 (Session 15) states the
same for Fermi (15 episodes) and Baldwin (13 episodes) — but in BOTH
cases, only the aggregate STATISTIC survives in the checkpoint, never
the ledger's actual content. No standalone pre-scoring ledger file was
ever committed to this repository for any of the four candidates
(confirmed: no such file exists outside `data-pipeline/candidates/` and
the two checkpoint sections, which report counts only). The only frozen
evidence available for ANY of the four candidates is the already-scored
`rows[*].rationale` text — evidence that was necessarily written AFTER
a trait had already been chosen for it.

This means every episode in every one of the four `episodes.*.json`
files in this directory is, in the terminology this session's own
instructions require, **historically trait-conditioned evidence** — not
a blind pre-scoring ledger. This label is applied uniformly to all four
candidates, not only Borges/Sankara. See `comparison.md` §9 for the full
implication: because the contamination is symmetric across both groups
rather than favoring one side, the diagnostic-density comparison in
`comparison.md` is a fairer test than the session's own governing
instructions anticipated it might be — but it is still bounded by this
limitation, and a true blind trial (extracting episodes directly from
each candidate's four originally-cited primary sources, with no
exposure to the already-scored rows) remains the only way to fully rule
out trait-conditioned narration inflating apparent diagnostic richness,
for all four candidates, not merely the two Session 16 already flagged
this concern for.

## Zero new research, confirmed

No WebSearch, no WebFetch, no Wikidata lookup was performed at any
point this session. Every episode's source citation traces to a source
already present in the corresponding candidate file's locked `sources`
array. No biographical fact appears anywhere in this directory that is
not already stated in one of the four candidate files' `rationale` text.

## No trait scoring, confirmed

No new psychological trait row was created. No candidate's `rows` were
rescored, added to, or removed from. `eligibility_v2` was never invoked
against any shadow/reconstructed profile in this directory — this
audit's episode classification (`class: "A"|"B"|"C"|"D"`) is
deliberately a different label space from a trait attribute id, and no
episode-to-row mapping was performed. The unit of analysis throughout is
the evidence episode itself, per this session's own explicit
instruction.

## Directory contents

- `README.md` — this file.
- `diagnosticRubric.md` — the frozen A/B/C/D rubric plus context/
  structure/evidence-form taxonomies, written and committed to BEFORE
  any episode was classified.
- `episodes.borges.json`, `episodes.sankara.json`, `episodes.fermi.json`,
  `episodes.baldwin.json` — the locked, per-candidate episode
  classifications (schemaVersion `session17_episode_audit_v1`).
- `CLASSIFICATION_LOCK.md` — the explicit lock marker; no field in any
  episode file changed after this file's creation.
- `computeDiagnosticDensity.ts` — a pure, deterministic script that
  reads the four locked episode files and computes every group/
  candidate statistic reported in `comparison.md`. Run with
  `corepack pnpm@10 exec tsx src/dev/roster1000/audits/session17/
  computeDiagnosticDensity.ts`.
- `results.json` — this script's own output, regenerable byte-for-byte
  from the locked episode files (committed for convenience/review, not
  as a second source of truth).
- `comparison.md` — the full Session-13-vs-Session-15 comparison,
  central hypothesis verdict, and remaining confounds.
- `session17Isolation.test.ts` — regression guard proving this
  directory cannot be discovered by the production candidate pipeline
  and that the four source candidate files remain byte-identical to
  what this audit read.

## Production-data immutability

This session touched nothing outside this directory (plus this
checkpoint documentation and, if applicable, `CLAUDE.md`). No file
under `data-pipeline/candidates/` was modified. `eligibility_v2` /
`src/core/matching/similarity.ts` was not touched. The live roster
(87 people, 86 match-eligible) is unchanged. See `comparison.md` and
the checkpoint entry for the complete verification record.
