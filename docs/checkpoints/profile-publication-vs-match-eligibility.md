# Architecture decision: profile publication vs. match eligibility

## Correction 2 (hidden-coupling cleanup pass, same PR)

A final pre-merge review found the architecture above was still not fully
wired: three residual couplings would have blocked exactly the scenario
this document exists to enable. All fixed, no roster/scoring/candidate JSON
changed:

1. **`meetsContentQualityFloor()` independently required 18 scored
   attributes** (`src/core/people/rosterQuality.ts`) — the exact same
   number as `eligibility_v2.minScoredAttributes`, but as a PUBLICATION
   gate. An evidence-approved, honestly-thin (<18-attribute) candidate
   could pass promotion readiness and still never be committable, because
   this separate gate silently re-imposed the matching threshold on
   publication. Fixed: the floor now only rejects a genuinely empty
   trait profile (`attributes.length === 0`); trait-count *breadth*
   belongs exclusively to `eligibility_v2`. Proven by a new
   `candidateSchema.test.ts` case that runs a synthetic 3-attribute
   candidate through the real `preparePersonSeedForPromotion()` →
   `build()` → `meetsContentQualityFloor()` path end-to-end.
2. **`toPersonSeed()` silently dropped a verified candidate QID** whenever
   `candidate.externalIdentity` wasn't already set, even though
   `checkPromotionReadiness()` requires `identity.wikidataId`. Fixed:
   `toPersonSeed()` now always carries `identity.wikidataId` into
   `PersonSeed.externalIdentity.wikidataId`, preserving any existing
   `externalIdentity` fields (e.g. `wikipediaUrls`).
   `checkPromotionReadiness()` additionally fails closed if
   `identity.wikidataId` and a pre-existing `externalIdentity.wikidataId`
   disagree (an identity-integrity error, never silently resolved).
3. **Portrait promotion readiness accepted `{ status: "found" }` alone**,
   with every other portrait field optional — a malformed record could
   pass readiness and then have `toPersonSeed()` silently omit the
   portrait. Fixed: `checkPromotionReadiness()` now also requires
   non-empty `url`/`source`/`license`/`sourcePageUrl` whenever
   `status === "found"` (the candidate schema already documented
   `sourcePageUrl` as required in this case; it is now enforced, not just
   documented).

Also corrected: `PromotionOptions.directoryVisible`'s doc comment
described `directoryVisible: false` as merely "excluded from the default
listing" — imprecise, since the Directory's search also passes through
`directoryVisibleOnly` (`src/core/people/explorer.ts`). Reworded to state
plainly that the direct profile route stays reachable while both the
default listing and search exclude the profile, and matching separately
excludes it whenever `isMatchEligible === false`.

A narrowly-scoped repository search for other `18`/`minScoredAttributes`/
`computedEligibility.eligible` uses found nothing else acting as a
publication gate: `similarity.ts`/`matching.test.ts` are the legitimate
matching-only home for the threshold; historical `generateRoster1.ts`
through `generateRoster16.ts` and `session18Isolation.test.ts` are
unmodified historical snapshots/fixture checks, left as-is per this
document's existing "Correction" note above.

## Correction (post-review completion pass, same PR)

A review of the initial version of this PR found the architecture was
described but not actually wired end-to-end, and one accidental regression.
Both are fixed, disclosed here rather than silently folded in:

1. **`CandidateStatus` accidentally dropped `"localized"` and
   `"portrait_pending"`** when `"evidence_approved"` was added. Both are
   restored; no candidate JSON was migrated or relabeled.
2. **No actual promotion path used the new architecture.**
   `checkPromotionReadiness()` existed but nothing called it, and
   `docs/adding-a-person.md` told future work to copy
   `generateRoster16.ts` — which still hard-requires `status ===
   "qa_passed"` and `computedEligibility.eligible`, the exact coupling
   this document argues against. Fixed by adding
   `preparePersonSeedForPromotion()` (the function a future generator
   should actually call — see "What changed" below) and correcting the
   runbook to stop pointing at the old generators as a template.
   Historical `generateRoster1.ts`-`generateRoster16.ts` are deliberately
   **not** rewritten — they remain accurate records of the cycles that
   produced them.

## Why this decision was triggered

Roster21-23 (2026-09) tried three different research strategies — shallow
2-source packs, one deeply-corroborated candidate (Giuseppe Garibaldi), one
deliberately broad-life-context candidate (Anton Chekhov) — and all landed
short of `eligibility_v2` (`scored>=18`, `coverage>=0.6`, high-confidence
`count>=12`/`avgConf>=0.55`) in the same structural way: 3 of 4 criteria
failing, only the high-confidence average sometimes clearing. Roster23's
own checkpoint concluded this pattern, repeated across genuinely different
evidence architectures, could not be resolved by another candidate-search
cycle and required a deliberate decision:
`ROSTER_EXPANSION_METHOD_REQUIRES_DECISION`.

The decision made here: **`eligibility_v2` is not lowered or replaced.**
It stays the match-safety gate exactly as calibrated. Instead, the
product/pipeline stops conflating it with a different question:
`eligibility_v2`'s own code comment already says "Incomplete profiles stay
browsable but never match" — this document makes the codebase actually
realize that distinction, which it did not cleanly do before.

## The two questions, separated

1. **Is this evidence-backed profile good enough to publish?** — a review
   outcome (identity verified, sources actually read, provenance honest,
   every row semantically supported, scoring locked). Never a numeric
   floor.
2. **Is this profile broad/well-covered enough to participate in
   matching?** — `eligibility_v2`, unchanged, computed independently.

## What was already correct, and what was actually coupled

Reading the existing architecture (not assumed) found:

- `Person.status: PersonStatus` (`draft`/`needs_evidence`/`needs_review`/
  `approved`/`published`/`needs_update`) already exists and is already
  checked by `evaluateMatchEligibility` (`ELIGIBILITY.eligibleStatuses`) —
  this field is question 1's natural home and needed no new field. It was
  simply unused as a real signal: `builder.ts`'s `build()` unconditionally
  stamped every person `"published"`, so the check was always trivially
  true. Left as-is; this document does not change that default.
- The REAL coupling: **directory default-visibility had no field of its
  own.** `PeopleFilter.matchEligibleOnly` (default `true`) was the only
  thing gating the People Directory's default listing, so "does this
  profile show up by default" and "is this profile match-eligible" were
  the same boolean in practice. Zheng He (published, `isMatchEligible:
  false`) already demonstrates the one combination this accidentally
  allowed — direct-only, not match-eligible — but there was no way to
  express the OTHER new combination this program's own findings now call
  for: a fully published, honestly-scored, non-match-eligible profile
  that should still appear in the default listing.
- Candidate promotion (`generateRosterN.ts`, every batch through roster16)
  hard-required `computedEligibility.eligible === true` before writing
  ANY candidate to production — even though `docs/adding-a-person.md`
  already documented, in prose, that a non-eligible candidate "is still a
  legitimate addition if you want a browsable, non-match-eligible profile
  (like Zheng He)". The code never actually allowed what the docs already
  promised.

## What changed

1. **`Person.isDirectoryVisible: boolean`** (new field, `src/core/types.ts`)
   — whether a profile appears in the default People Directory listing
   (and its search — both pass through the same
   `directoryVisibleOnly` gate). Independent of `isMatchEligible`;
   matching code never reads it. **Two different defaults apply on
   purpose, for two different callers**:
   - Raw `build()`'s own fallback (`seed.directoryVisible ??
     isMatchEligible`) exists ONLY to preserve every pre-existing seed's
     exact behavior — every existing person's value is mechanically
     identical to their current `isMatchEligible`, so nothing about the
     live product changes.
   - A NEW candidate promotion goes through `preparePersonSeedForPromotion()`
     (see item 4 below), which explicitly defaults `directoryVisible:
     true` — a fully product-ready, evidence-approved profile is a normal
     directory-visible publication regardless of its independently-
     computed match eligibility. This default is intentionally different
     from raw `build()`'s backward-compatible mirror-`isMatchEligible`
     fallback; both are correct for what they're each for.
2. **`PeopleFilter.directoryVisibleOnly`** (new, default `true`,
   `src/core/people/explorer.ts`) — the gate that actually controls
   default browsing visibility, independent of the pre-existing
   `matchEligibleOnly` (also still default `true`, unchanged semantics).
   `PeopleDirectoryClient.tsx` now explicitly passes `matchEligibleOnly:
   false`, relying on `directoryVisibleOnly` alone for its default view —
   this is what makes a future directory-visible-but-non-eligible profile
   actually appear, without exposing today's direct-only profiles.
3. **`CandidateStatus: "evidence_approved"`** (new,
   `src/dev/roster1000/candidateSchema.ts`) — the evidence-approval review
   outcome, reachable regardless of `computedEligibility.eligible`.
   `"qa_passed"` keeps its established, narrower historical meaning
   (evidence-approved AND match-eligible) unchanged — no past candidate is
   relabeled.
4. **`checkPromotionReadiness()` and `preparePersonSeedForPromotion()`**
   (both new, `candidateSchema.ts`) — a future `generateRosterN.ts` should
   call `preparePersonSeedForPromotion(candidate, { directoryVisible })`,
   NOT `toPersonSeed()` directly. It calls `checkPromotionReadiness()`
   internally (status must be `evidence_approved` or `qa_passed`, identity
   present, portrait found) and **fails closed** (throws) if not ready,
   then returns a seed with `directoryVisible` explicitly set (default
   `true`). Neither function checks `computedEligibility.eligible` —
   `isMatchEligible` in production is computed independently by `build()`
   regardless. `checkPromotionReadiness()` checks only candidate-JSON-level
   preconditions, not the final rendered product (EN/KO editorial, Korean
   name, portrait file, Directory card) — those are still established the
   existing way, after this check passes. `toPersonSeed()` itself remains
   a neutral, non-gating reshaper that `validateCandidates.ts` legitimately
   calls on `held`/merely-`scored` candidates too, for diagnostic
   reporting only.
5. **Honest UX for a non-match-eligible profile** — the person page
   (`app/[locale]/people/[slug]/page.tsx`) previously just omitted the
   "Compare Yourself" CTA with no explanation when `!isMatchEligible`; it
   now shows a short, localized, honest note (`person.not_in_matching`) in
   its place. The Compare route previously told a visitor it "couldn't
   find" a person who, in fact, exists but isn't match-eligible; it now
   distinguishes the two cases with distinct, honest copy
   (`compare.not_in_matching.*`). Neither surface exposes internal terms
   (`eligibility_v2`, coverage, confidence counts) — both are provided
   EN+KO.

## What deliberately did NOT change

- `ELIGIBILITY_VERSION`, every `ELIGIBILITY` threshold, matching weights,
  coverage shrinkage, dispersion, the similarity formula — byte-identical.
- `rankMatches`/`rankSimilarPeople`/`TargetSwitcher`/the Compare route's
  target selection — all still gate on `isMatchEligible` alone, never
  `isDirectoryVisible`. No regression to matching safety.
- Every existing person's `isMatchEligible`, score, or `status` value.
- The live roster: still 125 people, 124 default-directory-visible (all
  except Zheng He, unchanged), same match-eligible set.
- No candidate was rescored, promoted, researched, or added. Roster24 was
  not started.

## Future promotion workflow

1. Research a candidate; freeze evidence.
2. Score once, under the unchanged rubric.
3. Row-by-row evidence audit (per-row classification: supported as
   written / overstated / duplicative / unsupported — correct honestly).
4. Determine evidence/profile approval → candidate `status`:
   `"evidence_approved"` or, if the evidence itself isn't good enough to
   publish at all, `"held"`/`"rejected"` (unchanged meanings).
5. Compute `eligibility_v2` independently (`validateCandidates.ts`) — read
   only, never fed back into step 4's decision.
6. If evidence-approved: complete product readiness (portrait, EN/KO
   editorial, Korean display name) and promote via a new
   `generateRosterN.ts` that calls `preparePersonSeedForPromotion()` per
   allowlisted candidate (never copy a historical `generateRoster1..16.ts`
   file's gating logic — see the Correction note above).
7. `build()` computes `isMatchEligible` automatically. If `true`: the
   person is included in matching, same as every eligible person today.
8. If `false`: the profile is still published, and — because
   `preparePersonSeedForPromotion()` defaults `directoryVisible: true` —
   still directory-visible by default too, unless the promotion explicitly
   passed `{ directoryVisible: false }` for a deliberate direct-only
   publication (Zheng He's existing pattern, achieved today via raw
   `build()`'s own separate backward-compatible fallback, not this
   function). Either way, the profile is never included in matching.
9. A future, deeper evidence cycle can raise a profile's confidence/
   coverage enough to change its computed `isMatchEligible` outcome — never
   by threshold-gaming the existing evidence.
