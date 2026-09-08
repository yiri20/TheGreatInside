# Roster-24: Evidence-Approved Publications

Branch: `feat/roster24-evidence-approved-publications` (worktree:
`C:\Users\Lenovo\TheGreatInside-roster24-evidence-approved-publications`,
created from `origin/main` at `bd3249711e672917b709abda63e109a86fbceb63`,
confirmed matching before branching).

## Why this cycle exists

PR #21 (`feat/separate-profile-publication-match-eligibility`, merged to
`main` at `bd32497`) built the architecture but promoted nobody through it.
Roster24 is the first real production use: take the two strongest
deeply-researched `held` profiles from the prior two cycles — Giuseppe
Garibaldi (roster22) and Anton Chekhov (roster23) — and determine whether
their existing, unmodified evidence honestly supports publication as
complete, directory-visible, non-match-eligible profiles.

This is **not** another methodology experiment and **not** an
eligibility-rescue cycle. `eligibility_v2` was not touched; neither
candidate's `computedEligibility` changed. See `docs/checkpoints/
roster22-deep-evidence-intake.md` and `roster23-broad-context-deep-
evidence.md` for the original research (3 and 4 independent, actually-read
provenance perspectives respectively — not re-derived here).

## Row-by-row evidence-approval audit

Neither candidate had received a row-level audit before (both were `held`
under the old architecture, which never reached that step). Every row was
classified `SUPPORTED_AS_WRITTEN` / `SUPPORTED_BUT_OVERSTATED` /
`DUPLICATIVE_INFERENCE` / `UNSUPPORTED` against `docs/scoring-rubric-v1.md`
(including its §10 objective, corpus-wide `strong_inference` criterion).

**Garibaldi (17 rows): all 17 `SUPPORTED_AS_WRITTEN`.** Spot-verification
re-opened the same previously-cited sources (permitted: re-opening for
audit verification, not new research) via live browser + full-text
JavaScript extraction, past the same `WebFetch`-truncation ceiling the
original research hit:
- Margaret Fuller's *At Home and Abroad* — confirmed verbatim: the red-tunic
  passage ("whose red tunic makes them the natural mark of the enemy...
  Garibaldi has always done it"), the Oudinot no-safe-passage/defection
  passage ("a great number of men left the other regiments to follow the
  leader whose courage had captivated them"), Anita following him on
  horseback during the 1849 retreat, and his going to the Assembly to say
  further resistance was "unavailing" after his officers fell.
- Trevelyan's *Garibaldi's Defence of the Roman Republic* — confirmed
  verbatim: "courage and endurance without limit" and "fill men with
  ardour by his presence... stir them by his voice."
- Identity: Wikidata Q539 confirmed to resolve to Giuseppe Garibaldi.

Already-transparent disclosures in the candidate JSON (translation
double-counting avoided, the Aspromonte fact-cluster capped at 2 primary
attributes, the drowning-rescue episode's dual use for `risk_tolerance`
and `proactive_agency` disclosed rather than hidden) were reviewed and
found honest, not a violation.

**Chekhov (14 rows): all 14 `SUPPORTED_AS_WRITTEN`.** Spot-verification
re-opened *Reminiscences of Anton Chekhov* (Gorky/Kuprin/Bunin) and
confirmed verbatim: the `discipline` row's Kuprin quote ("bore it with
manly simplicity and patience...") and Bunin quote ("for fifteen years he
suffered from an exhausting illness... but his readers never knew it"),
the `autonomy_need` row's Kuprin quote ("nobody ever managed to find him
writing..."), and the `social_assertiveness` row's Gorky-authored
candied-fruits anecdote. Identity: Wikidata Q5685 confirmed to resolve to
Anton Chekhov.

## Corrections made

**Zero `RUBRIC_CORRECTION` / `ERROR_CORRECTION` to any scored row.** No
score, confidence, or evidenceType was changed for either candidate. Both
candidates' single-source, single-episode rows (`inference`-tier,
confidence 0.30-0.35) were reviewed against §10's objective criterion and
found to already be the *conservative* reading (a specific, cited,
single-source fact literally qualifies as `documented` evidence at low
confidence per §2's own worked example, but this project's established
convention across the whole roster1000 program caps an uncorroborated
single-source fact at `inference` regardless) — this is erring toward
caution, not overstatement, so no correction was warranted.

**Classification metadata corrections were made** (mechanical, not
scoring — Part G of the cycle brief):
- Garibaldi's `impactDomains: ["historical", "political"]` →
  `["historical", "social"]` — `"political"` is not a member of
  `IMPACT_DOMAINS` (`src/core/types.ts`); `"social"` matches the
  established convention for political/military-leader figures elsewhere
  in the roster (Dostoevsky, Tolstoy, and multiple roster10/14/15 entries).
- Garibaldi's `archetypeIds: ["organizational_leader", "resilient_builder"]`
  → `["organizational_leader"]` — `"resilient_builder"` does not exist in
  the current 10-id `ARCHETYPE_IDS` vocabulary
  (`src/core/greatness/archetypes.ts`), and `validateCandidates.ts` does
  not check `archetypeIds` at all, so this stale id would have silently
  entered production uncaught. No new archetype was invented to preserve
  it.
- Chekhov required no classification changes — every id (occupation,
  field, impact domain, tag, archetype, region) verified valid against
  current production vocabularies, including `regionCode: "central_europe"`
  for `nationalityCodes: ["RU"]`, matching Tolstoy/Dostoevsky's existing
  precedent.

## Evidence-approval decision

Both candidates: **APPROVED.** `status` moved `held` → `evidence_approved`
for both; the old `holdReason` (which existed solely because
`eligibility_v2` failed) was removed. `computedEligibility` is unchanged
for both — recomputed independently via `validateCandidates.ts` and
confirmed byte-identical to the pre-audit snapshot:

| Candidate | Scored | Coverage | High-conf. count | High-conf. avg | Eligible |
|---|---|---|---|---|---|
| Giuseppe Garibaldi | 17 | 0.501 | 9 | 0.604 | **false** (unchanged) |
| Anton Chekhov | 14 | 0.416 | 7 | 0.566 | **false** (unchanged) |

Neither candidate was rescued: no row added, no score/confidence/
evidenceType raised, no reinterpretation to chase a threshold.

## Portrait sourcing

Both figures are well into the photographic era (Garibaldi d. 1882,
Chekhov d. 1904), so the only new research this cycle allowed — portrait
sourcing — used real period photographs, not later depictions.

- **Garibaldi**: `Garibaldi (1866).jpg`, Fratelli Alinari studio, c.
  1866-67 (Archivi Alinari, Firenze). Public domain (`PD-old`, life+100 or
  fewer years; also PD in the US as published before 1931). Native
  1576×1930, resized to 1307×1600 (mozjpeg-equivalent quality 85 via
  Pillow, no upscale). `kind: "likeness"`.
- **Chekhov**: `Chekhov 1903.jpg`, unknown photographer, 1903 or 1904,
  reproduced in *Литературное наследство* (Literaturnoye Nasledstvo), vol.
  68 — a scholarly archive publication, chosen over an alternative 1889
  Christie's-auction photograph because the latter is a "retouched
  picture" (cropped/normalized/saturation-adjusted) with a narrower
  PD-US-only rights basis; this one carries a dual PD basis (pre-1917
  Russian Empire publication with no Berne-Convention country of origin,
  and PD-US pre-1931). Native 1594×2326, resized to 1096×1600. `kind:
  "likeness"`.

Both license/source pages were actually opened and read (Wikimedia
Commons), not assumed from a thumbnail.

## Editorial content

EN + KO achievements/moments/turning points authored for both, drawn
**only** from the already-audited roster22/23 evidence (candidate row
rationales + provenance notes) plus, where explicitly permitted by
`docs/editorial-content.md`, uncontested general knowledge for a
very-well-established figure (the 1860 Sicily/Naples campaign's basic
outline; The Seagull's 1898 revival being foundational to modern theater)
— no new historical claim was introduced from the portrait-search research.
2 achievements + 3 moments + 2 turning points each, following the existing
fact/interpretation separation discipline (`textKey`/`interpretationKey`),
calibrated interpretive language only, no pipeline/internal terminology
exposed. Korean display names added: `주세페 가리발디`, `안톤 체호프`.

## Production wiring

`src/dev/roster1000/generateRoster24.ts` (new) — the first generator
written under the new architecture: explicit 2-slug literal allowlist,
calls `preparePersonSeedForPromotion(candidate)` (not `toPersonSeed()`
directly), never checks `computedEligibility.eligible`, lets `build()`
compute `isMatchEligible` untouched, uses the helper's `directoryVisible:
true` default. Produces `src/data/people/roster24.ts`, wired into
`SEED_PEOPLE` via `seed.ts`'s existing explicit-import pattern.
`peopleIndex.generated.ts` regenerated (127 entries).

Confirmed both people resolve exactly as intended: `status: "published"`,
`isMatchEligible: false` (computed, not hand-set), `isDirectoryVisible:
true` (the helper's explicit default).

## Match-eligible set verification (before touching dispersion/calibration)

Mechanically compared the sorted list of match-eligible person `id`s on
this branch against the pre-roster24 `origin/main` baseline: **byte-for-
byte identical, 124 ids**. Per the cycle brief, since the match-eligible
set is unchanged, `dispersion.generated.ts` and the calibration anchors
were **not** touched, and the expensive matching simulation was **not**
re-run for ceremony.

## Test regression maintenance

Adding the first production people whose `isDirectoryVisible` genuinely
diverges from `isMatchEligible` exposed several tests whose assumptions
had only ever been exercised by data where the two fields coincided:

- `src/core/matching/matching.test.ts` (2 tests) — "every seed profile is
  eligible except Zheng He" loops updated to also expect `false` for
  Garibaldi/Chekhov.
- `src/core/people/explorer.test.ts` — a test titled "defaults to
  directory-visible people only, independent of matchEligibleOnly" turned
  out to test the wrong thing: `filterPeople(SEED_PEOPLE, {})` applies
  BOTH default-true gates (an intersection), which only coincidentally
  equaled "directory-visible people" when every person's two flags
  matched. Corrected the test's title and assertion to describe actual
  behavior — a real, previously-undetectable test-assumption bug, not a
  product bug (the real Directory UI, `PeopleDirectoryClient.tsx`,
  explicitly passes `matchEligibleOnly: false` and was never affected).
- `src/core/people/profilePublicationSeparation.test.ts` — "Case 4"
  baseline counts raised 125/124 → 127/126; the "mirrors isMatchEligible
  for every person" invariant now explicitly carves out Garibaldi/Chekhov
  as the two intentionally-divergent exceptions.
- `e2e/peopleDirectory.spec.ts`, `e2e/roster12MarcusAurelius.spec.ts`,
  `e2e/miriamMakebaProfileFix.spec.ts` — hardcoded total-count assertions
  (125→127 total, 124→126 default-directory-visible people) updated;
  verified neither new person's unscored `curiosity` attribute could
  affect the unrelated cross-facet-filter regression test's filtered
  count of 5.

None of these were eligibility changes — all are either mechanical count
updates or a genuine test-assumption correction that PR21's own
architecture change should have surfaced earlier but didn't, because no
production data had yet exercised the divergent case.

## Product completeness (manual browser verification)

Verified live (dev server, both locales, desktop + 375px mobile) for both
people:
- Directory: appears exactly once, searchable by name (`"1 of 127 people"`
  for an exact-name search), card has portrait, card links to the profile.
- Person page: route works, portrait renders (uncropped, correct
  attribution/license text), EN and KO editorial content both render with
  no raw i18n keys, Korean display name resolves, the honest "not yet
  included in personality matching" note renders in place of the Compare
  CTA (confirmed absent), zero console errors, zero horizontal overflow
  at 375px.
- Compare: `/compare/giuseppe-garibaldi` shows the honest non-matchable
  explanation; a genuinely nonexistent slug still shows "We couldn't find
  that person" — the two cases remain distinct.
- Matching: `Similar People` still renders on both pages (a person-to-
  person discovery rail, confirmed via Zheng He's own page to be
  independent of `isMatchEligible` and unrelated to this cycle) — not a
  regression.

## Validation

- `tsc --noEmit` — clean.
- `vitest run` — **744/744** passed (after the 3 legitimate test updates
  above; no test count change beyond those edits).
- `validateCandidates.ts` — 0 errors, 0 warnings (277 candidate files;
  `evidence_approved: 2` newly appears in the status breakdown).
- `checkScoringLockIntegrity.ts` — 0 flagged (277 previously-committed
  files, including both candidates' lifecycle/portrait/classification
  edits — the tool checks scoring fields only, correctly sees no drift).
- `i18n-audit.ts` — 100% Korean coverage, 0 missing.
- `next build --webpack` — clean, **278 static pages** (274 + 4: 2 new
  people × 2 locales).
- Focused Playwright (`peopleDirectory.spec.ts`, `person.visual.spec.ts`,
  `compare.visual.spec.ts`, `roster12MarcusAurelius.spec.ts`,
  `miriamMakebaProfileFix.spec.ts`) — **124/124** passed.
- Manual EN/KO, desktop/mobile browser verification — see above.

## Final counts

**127 production / 126 default-directory-visible / 124 match-eligible.**
Zheng He unchanged: `published`, `isMatchEligible: false`,
`isDirectoryVisible: false`. `eligibility_v2`/`ELIGIBILITY_VERSION`
byte-identical to `origin/main` (confirmed via `git diff` —
`src/core/matching/similarity.ts` does not appear in this branch's diff
at all).

## No eligibility rescue (explicit confirmation)

No row was added to either candidate. No score, confidence, or
evidenceType was changed. No new behavioral source or incident was
introduced (portrait sourcing was the only new external research, and it
contributed zero historical claims to the editorial content or trait
scores). No other `held` candidate from the 182-candidate pool was
reused or considered. `eligibility_v2`'s thresholds, the matching formula,
and `dispersion.generated.ts`/calibration anchors are all untouched.

## Diff discipline

Files touched: 2 candidate JSONs (lifecycle status, portrait,
classification metadata, provenance notes only — no scoring), 1 new
generator, 1 new roster data file, `seed.ts` (2-line import/spread
addition), `peopleIndex.generated.ts` (regenerated), 2 portrait assets,
editorial content (2 files), 1 Korean display-name addition, 3 vitest
test-file corrections, 3 Playwright spec-file count corrections, this
checkpoint doc, and pointer updates to `docs/checkpoints/roster.md` /
`docs/context/CURRENT_STATE.md`. No other candidate JSON, no other
person's data, no UI file unrelated to this cycle, no package/config file,
`.env.local`, or `next-env.d.ts` was touched.

## Disposition

**`ROSTER24_PRODUCT_PR_READY`** — both candidates evidence-approved and
promoted; production is 127/126/124; roster24 remains the first real
production use of the profile-publication/match-eligibility separation
architecture, not a rescue.
