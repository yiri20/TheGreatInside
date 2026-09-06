# Roster-19: incident-breadth-before-freeze gate, research-only outcome (2026-09)

Branch: `feat/roster19-incident-depth-intake`. Commissioned directly out of
roster-18's finding: 8 candidates researched under a genuine ≥2-source gate
still only produced 8-14 scoreable attributes each, well short of
`eligibility_v2`'s 18-attribute floor. This cycle adds a stricter gate on
top of roster-18's source-depth requirement: candidate-specific behavioral
**incident breadth** must be demonstrated, informally, *before* a
candidate is even frozen for full research, let alone scored.

## 1. What roster-18 showed, and the new gate it produced

Roster-18 proved the source-depth gate (≥2 actually-opened, independent
sources) is necessary but not sufficient — even an unusually rich single
source (Luis Alvarez's NAS memoir) capped out around 13 attributes from a
two-source pass. The diagnosis: two sources were being *read*, but their
behavioral richness wasn't being assessed *before* committing to full
research and scoring. This cycle's new binding gate, applied before any
candidate is frozen:

1. **Preliminary incident-ledger pass** across the discovery pool, not just
   a source-access check — for each candidate, real incidents spanning
   several behavioral domains (work habits, conflict, adaptation,
   collaboration, risk/decision-making, reactions to setbacks) must
   already be visible before freezing.
2. **Attribute-breadth plausibility check** — the preliminary ledger must
   plausibly support roughly 20-22 canonical attributes, not just clear
   the ≥18 floor with no margin, before a candidate proceeds to a full
   evidence pack.
3. Freeze only 4-6 candidates (this cycle: 5) that clear this bar, from a
   small (11-person) discovery pool — diligence over throughput, continued
   from roster-18.

## 2. Discovery pool (11 people, Wikidata QIDs verified before research)

Excluded mechanically: all 125 live production people; all 266
already-existing candidate JSON files (every roster9-18 candidate, held or
promoted); Che Guevara, Nellie Bly, Carl Jung, Katharine Hepburn.

John Maynard Keynes (Q9317), Werner Heisenberg (Q40904), Subrahmanyan
Chandrasekhar (Q148109), Jonas Salk (Q200101), Karl Popper (Q81244), Vera
Rubin (Q234888), Jocelyn Bell Burnell (Q233974), Ernest Rutherford (Q9123),
Paul Dirac (Q47480), Chuck Yeager (Q271939), Margaret Mead (Q180099).

## 3. Source-access preflight

A real source-existence check (not yet a full read) was run against all
11: National Academy of Sciences or Royal Society/British Academy
biographical memoirs were located for Chandrasekhar, Rubin, Salk-adjacent
material, Dirac, Rutherford, and Mead; primary-source material (Farm Hall
transcripts, Bohr's own draft letters) was located for Heisenberg; a
well-documented scholarly incident (the "Wittgenstein's Poker" 1946
confrontation) was located for Popper; press interviews and an AIP oral
history listing were located for Bell Burnell; test-pilot archives and
biographies were identified as existing for Yeager. All 11 cleared a
minimal access check. Diligence-over-throughput meant not every candidate
that cleared this minimal check received a full preliminary incident
ledger this cycle (see §7).

## 4. Frozen candidates (5, `READY_FOR_DEEP_EVIDENCE_PACK`)

Preliminary incident ledgers were actually built (not just source-checked)
for Chandrasekhar, Rubin, Heisenberg, Salk, and Bell Burnell before
freezing, each showing multiple behavioral domains and no single dominant
fact cluster:

- **Chandrasekhar**: work habits (49-year single-institution career, 46 PhD
  students), conflict (the 1935 Eddington humiliation), family strain (his
  father's reaction to U.S. citizenship), institutional leadership (two
  decades editing the Astrophysical Journal), decision-making (declining
  Princeton 1946).
- **Rubin**: work habits, conflict (1950 AAS talk, Palomar bathroom),
  collaboration (Kent Ford, the Burbidges), mentorship (Sandra Faber),
  risk/persistence (continuing through "unpleasant" reception),
  resourcefulness (the film-loading technique), sustained institutional
  advocacy for women in science.
- **Heisenberg**: conflict and moral ambiguity (the 1941 Bohr meeting,
  documented from *both* men's own later accounts, which contradict each
  other), leadership (directing wartime funding negotiations), risk
  (traveling to occupied Denmark for a politically dangerous conversation).
- **Salk**: risk-taking (self-experimentation), conflict/exclusion (never
  elected to the NAS), motivation (the patent refusal), a real,
  named rivalry (Sabin) treated with genuine nuance rather than caricature.
- **Bell Burnell**: sustained harassment and coping strategy (Glasgow desk-
  banging), family advocacy (her parents fighting her school over
  studying science), achievement (the pulsar discovery itself, in her own
  words), redirected motivation (donating her $3M Breakthrough Prize).

## 5. Full evidence packs actually gathered (Part H)

Each frozen candidate's sources were actually fetched and read in full
(PDF memoirs via the WebFetch-to-Read-tool pipeline; interview pages and
primary-transcript pages via direct fetch):

- **Chandrasekhar**: Eugene N. Parker's 1997 NAS memoir (fetched as PDF,
  extracted via the Read tool); a scholarly review of Kameshwar Wali's
  1991 biography quoting Freeman Dyson and William McCrea.
- **Rubin**: Neta Bahcall's 2021 NAS memoir; Rubin's own 28-page
  autobiographical article "An Interesting Voyage" (Annual Review of
  Astronomy and Astrophysics, 2011) — an unusually rich near-primary
  source in the subject's own words.
- **Heisenberg**: the Farm Hall transcripts (AIP exhibit); Niels Bohr's own
  unsent draft letters regarding the 1941 meeting, as summarized by
  Physics Today — two genuine primary-source classes.
- **Salk**: a PMC (NIH) journal article; reviews and coverage of Charlotte
  Jacobs's 2015 biography quoting Salk's and his research assistant's own
  words on the Sabin rivalry.
- **Bell Burnell**: a Prospect Magazine long-form interview; a set of
  shorter press interviews (APS News, CNBC). An AIP Niels Bohr Library
  oral-history transcript (interview conducted 2000 by David DeVorkin) was
  located and its existence confirmed, but returned 403 Forbidden on every
  fetch attempt and could not actually be read this cycle — reported
  honestly rather than claimed as consulted.

## 6. Scoring and validator outcome (Part I/J)

Each candidate was scored once, conservatively, from the frozen ledger,
then validated once. No score, confidence, or row was touched after
seeing the validator's output — including for Vera Rubin, whose result
came within one gate of eligibility (see below), which is exactly the
scenario the project's confidence-change policy
(`docs/scoring-rubric-v1.md` Section 10, written after a real 2026-08
incident of exactly this kind of post-hoc nudging) exists to guard
against.

| Candidate | Scored attributes | Coverage | Avg. confidence | High-conf (>=0.5) count | Eligible |
|---|---:|---:|---:|---:|---|
| Vera Rubin | 19 | 0.571 | 0.504 | — | false |
| Subrahmanyan Chandrasekhar | 13 | 0.400 | 0.502 | 8 | false |
| Werner Heisenberg | 8 | 0.236 | 0.449 | 2 | false |
| Jonas Salk | 7 | 0.204 | 0.450 | 3 | false |
| Jocelyn Bell Burnell | 7 | 0.213 | 0.429 | 0 | false |

All 5 held. **Vera Rubin is the most significant single finding of this
cycle**: 19 scored attributes clears the raw 18-attribute floor for the
first time across the roster-17/18/19 evidence-integrity arc, from two
genuinely independent, unusually rich sources (a colleague's NAS memoir
plus the subject's own 28-page autobiography) — direct evidence that the
new incident-breadth-before-freeze gate works as intended, surfacing a
candidate whose evidence base is qualitatively deeper than anything
roster-18 produced. And she still does not clear `eligibility_v2` as a
whole: coverage (0.571) falls just under the 0.6 floor, and the
high-confidence-count/average combination does not clear its own gate.
This is real information, not a near-miss to be smoothed over: attribute
*count* and evidence *depth* are necessary conditions, but coverage (which
weights by the taxonomy's `baseWeight`, not just row count) and the
confidence-band discipline are independent, real gates — clearing one
does not imply clearing the others, and this cycle is the first concrete,
measured demonstration of exactly that gap on real data. `baseWeight` was
not consulted or reverse-engineered as a selection heuristic at any point
in this cycle, per the explicit prohibition.

Heisenberg, Salk, and Bell Burnell fall well short of the floor, for a
different, more mundane reason than roster-18: even after a genuine
incident-breadth preflight, the two sources actually available for each
turned out to concentrate on a narrower slice of the person's life
(Heisenberg: 1941-1945 only; Salk and Bell Burnell: press coverage and
reviews rather than a full-length biography actually read cover to cover)
than the physicists' NAS memoirs did.

## 7. What was not pursued this cycle, and why (honest accounting)

Keynes, Popper, Rutherford, Dirac, and Yeager all cleared the minimal
source-access preflight (§3) but were not selected among the 5 frozen for
full evidence-pack research this cycle, per the explicit instruction to
freeze only 4-6 and prioritize diligence over throughput. This is not a
disposition of `SOURCE_DEPTH_INSUFFICIENT` or
`INCIDENT_BREADTH_INSUFFICIENT` for any of them — those dispositions
require an actual preliminary incident ledger to have been built and
found wanting, which did not happen here. The honest status for these
five is: sources exist and were spot-checked, but no incident ledger was
built and no research or scoring was performed. A future cycle could
resume research on any of them without re-doing this preflight step.

## 8. Post-score row audit, product-readiness gate, production wiring

Not applicable: zero candidates reached `qa_passed`, so there is nothing
to row-audit and no portrait/editorial/roster-file work was undertaken.
Committed honestly as a research-only outcome.

## 9. Validation actually run

- `corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts` —
  0 errors, 0 warnings; all 5 new candidates report `held` with the table
  above; the 271 pre-existing candidates (173 held + 93 qa_passed + 5 not
  counted from this batch) are unaffected.
- `corepack pnpm@10 exec tsx src/dev/roster1000/checkScoringLockIntegrity.ts`
  — 266 previously-committed files checked, 0 flagged.
- `corepack pnpm@10 exec tsc --noEmit` — clean.
- `corepack pnpm@10 exec vitest run src/core/people/rosterQuality.test.ts`
  — 18/18 passing, confirming no change to the live roster.
- `git status` — exactly 5 new files, all under `data-pipeline/candidates/`
  (plus this checkpoint and two docs-index updates in the commit); no
  roster file, seed import, generated index/dispersion, editorial, i18n,
  or portrait touched.

## 10. Roster-18 vs. roster-19, compared directly

| | Roster-18 | Roster-19 |
|---|---|---|
| New gate this cycle | >=2 actually-opened, independent sources | + incident-breadth-before-freeze, targeting ~20-22 plausible attributes |
| Candidates frozen | 8 | 5 |
| Best single result | Luis Alvarez, 13 scored attributes, 0.393 coverage | Vera Rubin, 19 scored attributes, 0.571 coverage |
| Did any candidate clear the 18-attribute floor? | No | Yes (Rubin) — first time this arc |
| Did any candidate reach full `eligibility_v2`? | No | No |
| Real lesson produced | Two sources, even rich ones, cap out well below the floor without an incident-breadth check first | Clearing the attribute-count floor is necessary but not sufficient; coverage and confidence-band discipline are independent real gates, not restatements of the same requirement |

## 11. Outcome

**`NO_PRODUCT_READY_QA_PASSED`** — 5 candidates researched under a
stricter, incident-breadth-first gate; all held honestly; zero promoted;
roster unchanged at 125 people / 124 match-eligible. Vera Rubin's near-miss
is preserved as-is, not rescued, and is flagged as the single most useful
data point either evidence-gate cycle has produced for understanding
exactly where `eligibility_v2`'s multiple gates diverge from a simple
attribute count.
