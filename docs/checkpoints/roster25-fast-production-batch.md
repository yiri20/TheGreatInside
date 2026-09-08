# Roster-25: Fast Production Batch

Branch: `feat/roster25-fast-production-batch` (worktree:
`C:\Users\Lenovo\TheGreatInside-roster25-fast-production-batch`, created
from `origin/main` at `23e403cdfe44d57b55633901248119676091df36`).

## Why this cycle exists

Speed, not methodology. A fixed six-candidate intake — no new candidate
discovery — audited only deeply enough to trust each existing profile,
then productized and shipped together in one PR. Not an eligibility-rescue
cycle: `eligibility_v2` was not touched, and no row was added anywhere.

## Audit and disposition

| Candidate | Audit | Publication | Match eligible | Portrait | Product complete |
|---|---|---|---|---|---|
| Nellie Bly | Fast-path integrity check (pre-existing `qa_passed`) — no issues found | `qa_passed` (preserved) | **true** (unchanged) | LOC, H. J. Myers c.1890 | ✅ |
| Carl Jung | Fast-path integrity check (pre-existing `qa_passed`) — provenance independence confirmed, no diagnostic language found | `qa_passed` (preserved) | **true** (unchanged) | ETH-Bibliothek, c.1935 | ✅ |
| Vera Rubin | Full row audit — 1 `RUBRIC_CORRECTION` (`curiosity` 88→78) | `evidence_approved` | false | AIP/Godfrey, c.1985 | ✅ |
| Subrahmanyan Chandrasekhar | Full row audit — 1 `RUBRIC_CORRECTION` (`mastery_orientation` 85→78) | `evidence_approved` | false | AIP, undated | ✅ |
| Fridtjof Nansen | Full row audit — no issues found | `evidence_approved` | false | LOC, van der Weyde 1915 | ✅ |
| Isabella Bird | Full row audit — no issues found | `evidence_approved` | false | NYPL, 1899 | ✅ |

## Corrections

**Two `RUBRIC_CORRECTION`s, both the same violation type**: a single-source
score had drifted into the 85+ ("extreme") band, which
`docs/scoring-rubric-v1.md` §4 reserves for claims independently
documented by *more than one source*. Both corrected to the top of the
71-84 band with `evidenceType` downgraded to `strong_inference`:
- Vera Rubin `curiosity`: 88/documented (single source: her own memoir) → 78/strong_inference.
- Subrahmanyan Chandrasekhar `mastery_orientation`: 85/documented (single source: the NAS memoir only, not corroborated by the Wali-biography review) → 78/strong_inference.

Neither correction was reactive to eligibility — both candidates remain
non-eligible before and after, by a wide margin (Rubin 19/0.571 coverage,
Chandrasekhar 13/0.400 coverage, both far under the 18/0.6 floors).

No corrections were needed for Bly, Jung, Nansen, or Bird — mechanical row
review found no semantic mismatches, unsupported extremes, or improperly
hidden shared-episode reuse (all disclosed transparently in the existing
rationale text).

## Metadata corrections (mechanical only, no scoring touched)

- Fridtjof Nansen: `impactDomains` had `"humanitarian"`, not a member of
  `IMPACT_DOMAINS` — corrected to `"social"` (established convention,
  matching Niels Bohr's precedent for the same region/era).
- Vera Rubin: source `kind: "autobiography"` is not in `PersonSource`'s
  kind union — corrected to `"archive"` (matching the convention already
  used for other self-authored primary sources).
- Subrahmanyan Chandrasekhar: source `kind: "book_review"` likewise not a
  valid kind — corrected to `"press"`.
- All six candidates' Wikidata QIDs, occupation/field/tag/archetype ids,
  and region codes otherwise verified valid against current production
  vocabularies.

## Spot-verification (targeted, not exhaustive re-reads)

Re-opened the two candidates' highest-stakes sources directly (both had
PDF URLs) and confirmed verbatim: Rubin's NAS memoir ("No. I can go.";
the Palomar bathroom-sign episode; "The Nobel missed their opportunity...")
and Chandrasekhar's NAS memoir (the January 1935 RAS meeting account,
Fowler/Russell's silence, Russell blocking his response at the 1935/1939
Paris meetings; the editorship "extraordinary feats... to the exclusion
of nearly everything else" line). No discrepancies found. Nellie Bly's
and Carl Jung's evidence records (already `qa_passed` from an earlier
cycle) were reviewed for internal consistency and found sound; their
underlying claims (the Blackwell's Island exposé and grand jury
investigation; the Freud/Jung rupture) are independently well-established
historical record.

## Portraits

All six figures are within the photographic era; every portrait actually
opened and license-verified on Wikimedia Commons before download:

| Candidate | Source | License basis |
|---|---|---|
| Nellie Bly | Library of Congress (cph.3b22819), H. J. Myers, c.1890 | PD-old (life+70) |
| Carl Jung | ETH-Bibliothek Zürich, Portr_14163, c.1935 | Public Domain Mark 1.0, applied by the copyright holder |
| Vera Rubin | AIP Emilio Segrè Visual Archives, Mark Godfrey, c.1985, gift of Vera Rubin | Free use with attribution, granted by AIP |
| Subrahmanyan Chandrasekhar | AIP Emilio Segrè Visual Archives, gift of Kameshwar Wali | Free use with attribution, granted by AIP |
| Fridtjof Nansen | Library of Congress (ggbain.03377), Henry van der Weyde, 1915 (unretouched original, preferred over a retouched Commons derivative) | PD-US (pre-1931 publication) |
| Isabella Bird | New York Public Library, published in *The Yangtze Valley and Beyond* (1899) | PD-US (pre-1931 publication) |

## Production wiring

`src/dev/roster1000/generateRoster25.ts` (new) — same architecture as
`generateRoster24.ts`: explicit 6-slug allowlist, calls
`preparePersonSeedForPromotion()`, never checks
`computedEligibility.eligible`. Produces `src/data/people/roster25.ts`,
wired into `SEED_PEOPLE`. `peopleIndex.generated.ts` regenerated (133
entries).

## Match-eligible set verification

Mechanically compared the sorted match-eligible `id` list against the
pre-roster25 baseline: **the only change is the addition of `p_nellie_bly`
and `p_carl_jung`** — both pre-existing `qa_passed` candidates whose
`computedEligibility.eligible` was already `true`. No other person's
eligibility changed; the 124 pre-existing ids are all still present
unchanged. Per plan, this is exactly the anticipated case, so the normal
one-time dataset maintenance was performed:

1. Regenerated `dispersion.generated.ts` (now derived from 126
   match-eligible profiles).
2. Ran `calibrate.ts` twice. Proposed anchor drift vs. the currently
   shipped `MATCH_CALIBRATION_ANCHORS`/`GREATNESS_CALIBRATION_ANCHORS` was
   ≤0.006 absolute at every percentile point (e.g. p99 match: 0.584 shipped
   vs. 0.5797 proposed) — negligible for a 2-person growth in the
   match-eligible pool (124→126). **Anchors left unchanged**;
   `CALIBRATION_VERSION` unbumped.
3. Ran one matching-health simulation (`simulate.ts 10000 quiz`, n=133):
   max #1-match frequency is Warren Buffett at 10.5%, well under the ~20%
   domination threshold. Nellie Bly (0.8%) and Carl Jung (0.6%) both
   integrate into the matching pool without dominating.

## Test regression maintenance

Adding six more people (two more whose `isDirectoryVisible` diverges from
`isMatchEligible`, on top of roster24's two) required updating the same
class of baseline-count assertions roster24 already established a pattern
for:
- `src/core/matching/matching.test.ts` — extended the non-eligible skip
  list to include Rubin/Chandrasekhar/Nansen/Bird.
- `src/core/people/profilePublicationSeparation.test.ts` — Case 4 counts
  raised 127/126→133/132; match-eligible set assertion updated to 126 with
  an explicit check that Bly and Jung are the two additions.
- `e2e/peopleDirectory.spec.ts`, `e2e/roster12MarcusAurelius.spec.ts`,
  `e2e/miriamMakebaProfileFix.spec.ts` — hardcoded total/default-visible
  counts updated (127→133, 126→132).
- **One genuine, non-mechanical finding**: the curiosity+collaboration
  cross-facet filter test's hardcoded match count needed to change from 5
  to 6 — Vera Rubin's corrected-but-still-legitimate scores (curiosity 78,
  collaboration 74) both genuinely cross that filter's z-score thresholds
  (curiosity needs ≥72, collaboration ≥73 at this taxonomy's reference
  mean/sd). Verified this is not sensitive to score gaming: the reference
  mean/sd are static constants in `attributes.ts`, not recomputed from the
  live roster, so no existing person's result could have shifted — this is
  a real, correct new match, not a symptom of anything to correct.

New shared spec: `e2e/roster25FastProductionBatch.spec.ts` — table-driven
across all six candidates (directory presence/search/portrait, EN+KO
editorial rendering, Compare/match-eligibility behavior), plus one
combined "all six present, count is 132" test — 44 tests, not six
near-identical files.

## Validation

- `tsc --noEmit` — clean.
- `vitest run` — **744/744** passed (after the same class of baseline
  regression-guard updates as above).
- `validateCandidates.ts` — 0 errors, 0 warnings (`evidence_approved: 6`,
  `qa_passed: 93`, `held: 178`).
- `checkScoringLockIntegrity.ts` — 0 flagged (both `RUBRIC_CORRECTION`
  labels recognized as an allowed reason).
- `i18n-audit.ts` — 100% Korean coverage, 0 missing.
- `next build --webpack` — clean, **290 static pages** (278 + 12: 6 new
  people × 2 locales).
- Focused Playwright — **168/168** passed across
  `peopleDirectory.spec.ts`, `person.visual.spec.ts`,
  `compare.visual.spec.ts`, `roster12MarcusAurelius.spec.ts`,
  `miriamMakebaProfileFix.spec.ts`, and the new
  `roster25FastProductionBatch.spec.ts`.
- Manual EN/KO browser spot-check (Carl Jung, Vera Rubin): portraits
  render with correct attribution, honest non-matching note shows only
  for the four non-eligible people, "Take the Quiz to Compare" shows
  normally for Bly/Jung, zero console errors.

## Final counts

**133 production / 132 default-directory-visible / 126 match-eligible**
(was 127/126/124). Zheng He, Giuseppe Garibaldi, and Anton Chekhov all
unchanged.

## No eligibility rescue (explicit confirmation)

No row was added to any of the six candidates. The two `RUBRIC_CORRECTION`s
both moved scores *down* (88→78, 85→78), the opposite of a rescue
direction, and neither changed either candidate's already-non-eligible
`eligible: false` outcome. No new behavioral source or incident was
introduced — portrait sourcing was the only new external research, and it
contributed zero facts to any trait score or editorial claim. No other
`held` candidate outside the fixed six was reused or considered.
`eligibility_v2`'s thresholds and the matching formula are untouched;
calibration anchors were evaluated and deliberately left unchanged given
negligible drift.

## Disposition

**`ROSTER25_FAST_BATCH_PR_READY`** — all six candidates shipped; roster25
was completed as a genuinely fast batch (fixed intake, audit
proportional to risk, one consolidated PR), not another slow
methodology cycle.
