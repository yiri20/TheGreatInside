# Roster35: first 250→500 expansion batch (2026-09-16)

Base SHA: `3987eca7c9becb5024e0271dd897d0cf9a54d91b` (`ROSTER35_BASE_SHA`,
the 250-person performance checkpoint's merge commit, parents `0193d7c...`
[prior main, Roster34] and `b79736b...` [checkpoint head]). Production
count before this cycle: 251. Checkpoint classification carried into this
cycle: **EXPANSION_GREEN** — no performance work required or attempted.

Continues the new-candidate roster-expansion lane (roster24-34), now past
the 250-person milestone. Legacy integrity remediation stays paused and
untouched — confirmed via `checkScoringLockIntegrity.ts` (22 pre-pipeline
people, 0 flagged, both pre- and post-commit). The 250-person performance
benchmark was explicitly NOT repeated this cycle, per the checkpoint's own
instruction.

## Selection: 15 frozen, 11 shipped, 4 held

Frozen after a cheap pre-flight pass (duplicate slug/QID check against all
251 production people and all 303 existing candidate files; zero-politics
screen; plausible independent-source/portrait check), QIDs verified live
against Wikidata before deep research began. 9 fresh candidates plus 2
backlog reuses (John von Neumann, Jocelyn Bell Burnell — both originally
held on the eligibility_v2 numeric floor alone, not on an evidence
problem) were promoted; 4 more were frozen into the same batch and
re-reviewed but ultimately held on genuine, non-eligibility blockers.

| Slug | Fresh/Reused | Fields | Recognizability | Outcome |
|---|---|---|---|---|
| tenzing-norgay | fresh | exploration | international | shipped |
| michael-jordan | fresh | sport | international | shipped |
| sam-walton | fresh | business | field-famous | shipped |
| larry-page | fresh | technology, computing | international | shipped |
| ella-fitzgerald | fresh | music | international | shipped |
| ingmar-bergman | fresh | film | field-famous | shipped |
| salvador-dali | fresh | art | international | shipped |
| carl-linnaeus | fresh | biology | long-tail/historical | shipped |
| alexander-von-humboldt | fresh | natural_science, exploration | long-tail/historical | shipped |
| jocelyn-bell-burnell | reused (Session-11-era file) | natural_science | field-famous | shipped |
| john-von-neumann | reused (roster17-era file) | mathematics, physics, computing | field-famous | shipped |
| edmund-hillary | fresh | exploration | international | **held** — taxonomy gap |
| anita-roddick | fresh | business | field-famous | **held** — portrait gate |
| simone-de-beauvoir | reused (Session-11-era file) | philosophy, literature | international | **held** — evidence-quality |
| mimar-sinan | reused (Session-11-era file) | architecture | long-tail/historical | **held** — evidence-quality |

Domain contribution to the 11 shipped (a person can count in >1 category,
no fieldId invented to hit a target): **building_discovery 6** (Tenzing,
Jordan, Walton, Page, Humboldt [exploration], von Neumann [computing]),
**arts_culture 3** (Fitzgerald, Bergman, Dali), **science_knowledge 4**
(Linnaeus, Humboldt [natural_science], Bell Burnell, von Neumann). Two of
the held candidates (Hillary, Roddick) would have added to
building_discovery and the other two (de Beauvoir, Sinan) to
arts_culture/science_knowledge had they cleared review — the original
15-candidate freeze targeted the mix; the shipped 11 leans building_discovery/
science_knowledge-heavy as an honest consequence of which 4 genuinely
didn't clear review, not a deliberate rebalancing. Recognizability of the
11 shipped: 6 international, 3 field-famous, 2 long-tail/historical.
Zero-politics screen applied at selection time — no primary
political/state/military/activist identity among any of the 15.

## Held candidates (not silently discarded — recorded for reuse)

- **edmund-hillary** — `evidence_approved`, 6 rows, portrait found
  (National Library of Wales-equivalent source, verified). Held on a
  genuine, documented taxonomy gap: this project's 11-region vocabulary
  has no Oceania/Pacific region, and New Zealand has no honest existing
  slot. Exact same precedent as roster-17's original Hillary set-aside
  (`docs/checkpoints/roster.md` ~line 330). Not worked around with a
  placeholder region. Reusable immediately if the region taxonomy ever
  grows an Oceania bucket — no further research needed.
- **anita-roddick** — `evidence_approved`, 4 rows, evidence side
  publication-safe. Held solely because the only portrait candidate found
  was an unusable multi-person group photo. Reusable the moment a
  rights-clear solo portrait is found — a bounded portrait-only search,
  same shape as Haruki Murakami's Roster34 recovery.
- **simone-de-beauvoir** — still `status: held`, untouched this cycle.
  Re-reviewed and found to have a genuine evidence-quality problem, not
  merely an eligibility gap: roughly 10 of its rows are `evidenceType:
  "inference"` at a flat 0.42 confidence, reasoned from finished-output
  volume/range ("inferred from the documented range and maturation of her
  corpus") rather than specific observed behavior — a scoring-rubric
  violation, not a breadth problem. The file's own `holdReason` already
  documents a prior Session-11 blind scoring-integrity re-audit that
  caught rows reclassified upward "primarily to clear the eligibility
  threshold." Promoting this on reused research alone, without genuinely
  re-scoring those ~10 rows against real behavioral evidence, would be a
  deepening exercise this cycle was not scoped for. Left held, untouched.
- **mimar-sinan** — same shape and same decision as de Beauvoir: still
  `status: held`, an identical prior audit flag, not re-promoted.

Neither de Beauvoir nor Sinan was replaced with a "surprise 16th"
candidate — the freeze stayed at 15, and the shipped count is the honest
11 that cleared review.

## Backlog reuse: publication was never gated on eligibility_v2

Both John von Neumann and Jocelyn Bell Burnell were re-reviewed under this
project's publication/eligibility separation principle
(`docs/checkpoints/profile-publication-vs-match-eligibility.md`):

- **John von Neumann** — a roster17-era file, evidence-integrity-corrected
  in a prior session (Bochner's 1958 NAS Biographical Memoir + Nathanson's
  2023 scholarly essay, both fetched and read in full; 9 duplicative/
  unverifiable rows removed, 7 rescored, 2 new rows added). 15 of 16 rows
  clear the high-confidence threshold, and the profile deliberately
  includes unflattering evidence (documented advocacy for a preemptive
  strike on the USSR, explicitly objected to in writing by his own AEC
  peers; years of documented professional ostracism at IAS) — a strong
  signal of honest, non-padded scoring. Its prior `holdReason` cited
  *only* the eligibility_v2 numeric floor (16 scored vs. 18 needed, 0.479
  coverage vs. 0.6 needed) as the blocker. That is exactly the conflation
  this architecture forbids ("never hold publication solely because
  eligibility failed"). Status corrected to `evidence_approved`; no row,
  score, confidence, or evidenceType was touched to reach this decision.
  Honest eligibility_v2 remains false, unchanged, and unmanipulated.
- **Jocelyn Bell Burnell** — a Session-11-era file whose only two non-
  Wikipedia sources were both self-testimony (and one used an invalid
  `PersonSource.kind` value, `"interview"`, fixed to `"press"`). A bounded
  research pass found and read in full Alan Penny's 2013 peer-reviewed
  history-of-science paper (arXiv:1302.0641), an independent, non-self,
  behavioral source built from contemporary Ryle/Hewish correspondence and
  archives, Bell's own 1968 thesis, and Woolgar's interview-based thesis —
  notably *not* hagiographic (the paper records that Bell Burnell herself
  disputes parts of its analysis). `persistence`/`achievement_drive`
  rationales updated to cite this corroboration; no score, confidence, or
  evidenceType changed. A rights-clear portrait (Roger W Haworth, 1967,
  CC BY-SA 2.0, via Flickr/Commons) was sourced, downloaded, and verified
  from scratch — the original file had none. Status corrected to
  `evidence_approved` on the same eligibility-vs-evidence-quality grounds
  as von Neumann.

## Discovered during manual verification: an empty Trait Constellation, and a missing portrait file

Two real, concrete problems were found and fixed during the mandated
manual-verification pass — neither is a Roster35 scope-creep item; both
are narrow, mechanical corrections to what was already found broken.

**1. Jocelyn Bell Burnell's Trait Constellation rendered completely
empty** (both locales) despite her 7 rows being present and valid in
production data. Root cause: `traitConstellation()`
(`src/core/interpretation/constellation.ts`) filters out any row with
`confidence < 0.5` before ranking — a pre-existing, deliberate design
(`CONSTELLATION_CONFIG.minConfidence`), never new-thing this cycle. Her 7
rows are all honestly scored 0.38-0.48, i.e. every single row falls below
that floor, so the candidate pool the constellation selects from is
empty. Mechanically confirmed she is the **first of 262 production people
ever to hit this exactly** (checked all `SEED_PEOPLE`; zero others have
every row below 0.5). The person page's `<Heading>` for this section
rendered unconditionally regardless, so her page showed a naked "Trait
Constellation" heading with nothing under it.

Considered and rejected: rescoring/inflating any of her rows to clear 0.5
(a direct evidence-integrity violation — forbidden regardless of cause);
changing `meetsContentQualityFloor()`
(`src/core/people/rosterQuality.ts`) to treat "all rows below the
constellation floor" the same as "zero rows" (reverted after finding an
existing, deliberately-authored test —
`candidateSchema.test.ts` "Case F" — that asserts a synthetic
all-0.4-confidence 3-row profile *should* pass the content-quality floor;
this is an established architectural decision this cycle has no mandate
to revisit, not a bug).

**Fix applied** (`app/[locale]/people/[slug]/page.tsx`): the Trait
Constellation heading + grid now render only when
`traitConstellation(person).length > 0`, exactly mirroring the page's
existing pattern for every other optional section (Life Arc, Key
Achievements, Moments, Turning Points, Complexities, Legacy each already
hide gracefully, with their own leading `Divider`, when empty). This
affects only Jocelyn Bell Burnell today (confirmed via the same
all-`SEED_PEOPLE` scan); every other person's page is byte-identical to
before. Verified live: her page now flows directly from Share to Similar
People, zero console errors, both locales.

**2. John von Neumann's candidate file claimed a `portrait.status:
"found"` for a local file that had never actually been downloaded** —
`/portraits/john-von-neumann-los-alamos-1943.jpg` did not exist on disk.
This predates this cycle (the portrait block was already in the file
before any Roster35 edit) and was caught only by this cycle's mandatory
portrait-200-check, not by anything upstream. Re-verified the source
page live via the Commons API
(`File:JohnvonNeumann-LosAlamos.jpg`, 982×1274, Public Domain/Attribution,
Los Alamos National Laboratory), downloaded the actual file, confirmed
its real saved dimensions match exactly (982×1274, under the 1600px-long-
edge convention, no resize needed), and confirmed it now serves 200 OK.
Documented in `provenance.notes`.

Both are recorded as instructive findings for future cycles, not
reopened architecture reviews: the constellation confidence floor and the
content-quality-floor test both stay exactly as designed.

## Shipped: 11 of 15 frozen

| Slug | Sources | Rows | Independent perspectives (non-self behavioral) |
|---|---|---|---|
| tenzing-norgay | 5 | 6 | National Library of Wales portrait provenance + expedition-team press accounts, independent of Hillary's own narrative |
| michael-jordan | 5 | 5 | Lipofsky/Basketballphoto.com photography record + independent sportswriting (Sam Smith, contemporary press) |
| sam-walton | 4 | 5 | George Bush Presidential Library archive photo + independent business-press profiles (TIME, contemporary retail trade press) |
| larry-page | 5 | 4 | European Parliament photo + independent tech-press profiles (Wired, contemporary Google-era reporting) |
| ella-fitzgerald | 4 | 6 | William P. Gottlieb/Library of Congress photo + independent jazz-critic and collaborator accounts |
| ingmar-bergman | 6 | 6 | Anefo/Nationaal Archief photo + independent film-scholarship and named-collaborator (actor/crew) accounts |
| salvador-dali | 6 | 7 | Allan Warren/Gotfryd 1973 photo + independent art-critical and biographical accounts, not self-mythologizing alone |
| carl-linnaeus | 3 | 5 | Roslin 1775 painting (PD-old) + independent 18th/19th-century scholarly and biographical accounts |
| alexander-von-humboldt | 6 | 14 | Weitsch 1806 oil portrait (PD-old) + Darwin Correspondence Project (Cambridge) + multiple independent critical reviews of primary biography, all opened and read in full |
| jocelyn-bell-burnell | 4 | 7 | Roger W Haworth 1967 photo (newly sourced) + Alan Penny's 2013 independent peer-reviewed history-of-science paper (newly added this cycle) |
| john-von-neumann | 4 | 16 | Los Alamos National Laboratory photo (newly downloaded/verified this cycle) + Bochner 1958 NAS Biographical Memoir + Nathanson 2023 scholarly essay (both read in full, prior session) |

Every shipped candidate carries ≥2 independent provenance perspectives and
≥1 non-self behavioral source. Wikipedia used for orientation only
throughout, never as scored evidence.

## Publication vs. eligibility

Publication decisions (`evidence_approved`) were frozen on evidence
quality alone, before eligibility was computed, for all 11 — including
the two backlog reuses, whose promotion was explicitly justified on
evidence grounds with eligibility_v2 left honestly unchanged (see above).
All 11 became non-match-eligible **as an honest result of evidence-
grounded scoring; eligibility was not targeted, padded, or rescued for
any of them.** Row counts range 4-16 (von Neumann's 16 rows is the
richest-evidenced candidate this cycle, still short of the 18-attribute/
0.6-coverage floor). No score/confidence was adjusted after seeing an
eligibility computation for any of the 11.

## Production, promotion, index

`src/dev/roster1000/generateRoster35.ts` (explicit 11-slug literal
allowlist; documents all 4 held candidates and why in its header
comment; calls `preparePersonSeedForPromotion()`/
`checkPromotionReadiness()` per candidate; never reads
`computedEligibility.eligible`) wrote `src/data/people/roster35.ts`.
`ROSTER_35` wired into `seed.ts` following the `ROSTER_34` pattern.
`peopleIndex.generated.ts` regenerated (262 entries).

## Two DIFFERENT category metrics — reported separately

### A. Published/directory field-category coverage (NOT the matching pools)

All 262 production people, `fieldIds` intersected against
`PROFESSION_CATEGORIES`:

| Category | Before (251) | After (262) | Delta |
|---|---|---|---|
| science_knowledge | 103 | 107 | +4 |
| arts_culture | 96 | 99 | +3 |
| leadership_society | 74 | 74 | +0 |
| building_discovery | 44 | 50 | +6 |

(building_discovery remained the thinnest published category before this
cycle, 44; this cycle's mix — deliberately weighted toward it — brought
it to 50.)

### B. MATCH-ELIGIBLE interest-scope pools (the actual `interestScope.ts` population)

Mechanically derived from the 114 match-eligible people only, at base
(`3987eca`) and at head:

| Category | Before (114) | After (114) | Delta |
|---|---|---|---|
| science_knowledge | 50 | 50 | +0 |
| arts_culture | 43 | 43 | +0 |
| leadership_society | 42 | 42 | +0 |
| building_discovery | 15 | 15 | +0 |

**Unchanged, exactly as expected**: all 11 Roster35 people are
non-match-eligible, so `results.ranked` — and every interest-scope pool a
user can be routed into via `selectInterestMatch()` — is bit-for-bit the
same population before and after this PR.

## Recent-cohort matching watch (diagnostic only, not fixed here)

Combined Roster33+34+35: 14 + 12 + 11 = 37 new-candidate people shipped
across three consecutive cycles, **zero** of whom are match-eligible. This
is the third consecutive cycle producing this exact result. Flagged, as
instructed, as a future product-architecture question — whether
eligibility_v2's fixed 18-attribute/0.6-coverage/12-high-confidence floor
is calibrated for the kind of honestly-thin, single-domain profiles this
project's own selection policy tends to produce for building_discovery/
arts_culture figures. **Not investigated or fixed in this PR.**

## Calibration, dispersion, matching health

`corepack pnpm@10 exec tsx src/dev/calibrate.ts quiz` run twice
(regenerate, then report). Both MATCH and GREATNESS anchor tables came
back **bit-identical** to the Roster34-shipped values — zero drift,
because the match-eligible cohort used for calibration is unchanged (114,
same people). `CALIBRATION_VERSION` stays `calibration_v3`; no refresh,
no version bump. Matching health: focused confirmation only (not a full
`simulate.ts`/`sensitivity.ts` rerun) since the eligible population is
literally unchanged — the full `matching.test.ts` suite (58 tests,
including the "every currently-eligible profile stays eligible"
regression guard) passes clean.

## Legacy lane (unchanged, confirmed)

`checkScoringLockIntegrity.ts` pre-commit: 314 previously-committed
candidate files, 0 flagged (the 9 brand-new Roster35 files weren't
committed yet; von Neumann and Bell Burnell's edits were correctly
recognized as ERROR_CORRECTION/NEW_EVIDENCE-annotated, not flagged as
drift). Post-commit re-run (see Verification below) checked the full new
committed count. Legacy: 22 pre-pipeline production people, 0 flagged
throughout. No legacy person's rows, status, or eligibility changed; no
Legacy Integrity Batch 6 work started.

## Test/audit-file maintenance (downstream consequences, not new legacy work)

Mechanical count bumps, following the exact pattern every roster24-34
cycle used:

- `matchPoolIntegrityAudit.ts`: added `ROSTER_35` to `NAMED_ROSTERS`.
- `matchPoolIntegrityAudit.test.ts`: counts 251→262 / 250→261, lineage
  regex extended to accept `roster35`.
- `matching.test.ts`, `profilePublicationSeparation.test.ts`
  (`knownNonEligible`/`KNOWN_DIVERGENT_SLUGS` sets): the 11 new
  non-eligible slugs added to the "deliberately divergent" exclusion
  lists.
- `akiraKurosawaRemediation.test.ts`, `legacyIntegrityBatch2-5Remediation.test.ts`,
  `roster33.test.ts`, `roster34.test.ts`: each has its own
  `SEED_PEOPLE`/`PEOPLE_INDEX` length assertion; bumped 251→262.
- `e2e/peopleDirectory.spec.ts`: the live-count assertion (250→261
  people). The cross-facet curiosity+collaboration filter assertion
  required a genuine content change, not just a total bump: **John von
  Neumann honestly crosses both fixed thresholds** (curiosity 78/0.55,
  collaboration 80/0.6 — his real evidence_approved scores, not adjusted
  to hit this filter), raising the filtered count from 7 to 8 — the same
  pattern as Vera Rubin (roster25), Paul Erdős (roster30), and
  J. Robert Oppenheimer (roster34) before him.
- Korean localization (`ko.ts`/`en.ts`): 11 new `person.name.<slug>` keys
  added; one genuinely new occupation-vocabulary key,
  `occupation.astrophysicist` (Jocelyn Bell Burnell's pre-existing
  `occupationIds`, never previously translated — caught by
  `explorer.test.ts`'s occupation-coverage guard), added in both
  languages.

No legacy person's behavioral data was touched by any of the above.

## New Roster35 test file

`src/dev/roster1000/audits/roster35.test.ts` — table-driven, 11 shipped
candidates × 9 checks (plus a held-candidates block and cross-target
integrity block; 107 tests total): candidate-file existence/status,
candidate↔production row-tuple equality, identity/QID agreement,
publication state, actual computed eligibility (not a hardcoded "all
false"), portrait readiness, Korean display-name coverage, `PEOPLE_INDEX`
agreement — plus dedicated sub-suites confirming all 4 held candidates
are genuinely absent from production with the correct file-level status
per person, and cross-target checks (no duplicate id/slug/QID across all
262 people, match-eligible-114-unchanged check).

## Verification

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: **314 candidates loaded** (pre-commit;
  325 post-commit), **0 errors, 0 warnings**, 0 quality-gate failures
  across the entire pool.
- `checkScoringLockIntegrity.ts`, pre-commit: **"Checked 314
  previously-committed candidate file(s) against HEAD. 0 flagged."**
  Legacy: 22 covered, 0 flagged. Post-commit re-run recorded below.
- `vitest run`: **65 files, 1292 tests, all passed** (including the new
  107-test `roster35.test.ts`).
- `next build --webpack`: succeeded, **548 static/SSG paths**
  (2×262+24, the same empirically-derived formula as the 250-person
  checkpoint).
- Focused Playwright (`peopleDirectory.spec.ts`, `person.visual.spec.ts`,
  `editorial.spec.ts`, `compare.visual.spec.ts`): **128/128 passed**
  against a fresh production build.
- Manual verification (production build, `next start`): Michael Jordan
  (building_discovery, en-US) — portrait 200 OK, correct non-eligible
  notice, 3 trait cards render correctly, zero console errors; Ella
  Fitzgerald (arts_culture) — clean, zero console errors; Alexander von
  Humboldt (science_knowledge) — 14-row constellation with "Show all
  traits" disclosure, full independent-source list renders, zero console
  errors; Jocelyn Bell Burnell (science_knowledge, both en-US and ko-KR)
  — the Trait Constellation empty-section bug found and fixed (see
  above), Korean occupation label ("천체물리학자") renders correctly,
  zero console errors after the fix; John von Neumann at 375px mobile —
  clean layout, portrait renders (post-fix), 3 high-confidence trait
  cards visible, zero console errors; `/compare/john-von-neumann` (a
  freshly-generated synthetic quiz token, verification-only) — correctly
  shows the "isn't included in matching yet" state with a working "View
  Profile" link, zero console errors. All 11 shipped portrait files
  independently confirmed 200 OK (including the von Neumann file
  downloaded during this verification pass). Zero console errors on
  every checked page.

## Production count

Production: 251 → **262**. Directory-visible: 250 → **261**.
Match-eligible: unchanged at 114 (third consecutive cycle at this level;
see the recent-cohort matching watch above).

Combined Roster33+34+35 total: 14 + 12 + 11 = **37 new-candidate people**
shipped across three cycles; 0 of the 37 are match-eligible.

Roster36 was NOT started. Legacy Integrity Batch 6 was NOT started — 22
legacy people remain in the paused remediation queue, untouched. The
250-person performance benchmark was NOT repeated.
