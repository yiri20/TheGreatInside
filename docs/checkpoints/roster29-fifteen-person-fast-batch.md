# Roster-29: Fifteen-Person Fast Production Batch

Branch: `feat/roster29-fifteen-person-fast-batch` (worktree:
`C:\Users\Lenovo\TheGreatInside-roster29-fifteen-person-fast-batch`, created
from `origin/main` at `f255edb8931952c09b3f8484fc5e604488fdc9de`, confirmed
matching the expected base SHA — no advance on `origin/main` between task
authoring and execution).

## Why this cycle exists

Throughput: publish 13-15 more product-ready people from the existing held
pool, evidence-viability first, recognizability second, in one consolidated
batch.

## Held-pool inventory

Built mechanically from `data-pipeline/candidates/*.json` (277 files) minus
production people (170, via `peopleIndex.generated.ts`) minus the 22 known
Group-B evidence-integrity exclusions from Roster28 (unchanged — none of
their underlying files were touched since). Confirmed via a fresh
`validateCandidates.ts` run (not cached): `held: 142` at session start,
exactly 120 Group-A (eligibility-only) + 22 Group-B, matching Roster28's own
closing inventory. All 120 Group-A candidates' `holdReason` text was read
directly (not pattern-matched) to confirm each is a clean eligibility-only
hold — no additional evidence-integrity/identity/sourcing concerns surfaced
beyond the known 22.

## Frozen 15

Ranked by existing evidence viability first (documented-row ratio, source
diversity, confidence), then recognizability, then domain/regional
diversity, surveying 45+ of the 120 available candidates in depth before
freezing:

| # | Candidate | Domain | Region/Era | Rows | Documented/Total | Sources |
|---|---|---|---|---|---|---|
| 1 | Gabriel García Márquez | Literature | Latin America, 20th c. | 22 | 6/22 | Own memoir, Nobel citation, NYRB, Paris Review |
| 2 | Murasaki Shikibu | Literature | East Asia, medieval | 21 | 7/21 | Her own diary, her own novel |
| 3 | Zora Neale Hurston | Literature | North America, 20th c. | 20 | 10/20 (highest ratio surveyed) | Boyd biography |
| 4 | Seneca | Philosophy | Southern Europe, ancient | 19 | 7/19 | His own letters/essays, Tacitus, Cassius Dio |
| 5 | Jean Piaget | Science (psychology) | Western Europe, 20th c. | 21 | 8/21 | Britannica, Wikipedia |
| 6 | Ibn al-Haytham | Science (optics) | West Asia, medieval | 20 | 7/20 | His own Book of Optics, MacTutor |
| 7 | Dorothea Lange | Visual art (photography) | North America, 20th c. | 21 | 6/21 | ICP, Wikipedia |
| 8 | Katherine Dunham | Performing arts (dance) | North America, 20th c. | 20 | 6/20 | LOC, Wikipedia |
| 9 | Wilma Rudolph | Sports | North America, 20th c. | 20 | 5/20 | Team USA/Olympics.com |
| 10 | William Wilberforce | Activism/social reform | Western Europe, 19th c. | 18 | 5/18, richest sourcing (6) | Hague biography, House of Parliament, own-era sources |
| 11 | Desmond Tutu | Activism/religious | Sub-Saharan Africa, contemporary | 21 | 6/21 | His own TRC memoir, Nobel citation |
| 12 | Ratan Tata | Business/entrepreneurship | South Asia, contemporary | 18 | 2/18 (thinnest surveyed) | Press/legal record of acquisitions, Mistry dispute, Mumbai 2008 |
| 13 | Indira Gandhi | Politics | South Asia, 20th c. | 20 | 3/20, highest avgConf (0.55) surveyed | 2 biographies, Nehru-Gandhi letters |
| 14 | Ulysses S. Grant | Politics/military | North America, 19th c. | 22 | 4/22 | Own Personal Memoirs, Chernow, White |
| 15 | Suleiman the Magnificent | Politics/military | West Asia, early modern | 19 | 13/19 (2nd-highest ratio) | Decades of Venetian ambassador dispatches, own poetry, the Kanunname |

3 political/state/military figures (Gandhi, Grant, Suleiman) — at the
brief's cap, chosen for maximum regional spread (South Asia, North America,
West Asia) among the strongest-evidenced political candidates. Regional
spread across the full 15: North America 5, Western Europe 2, West Asia 2,
East Asia 2, South Asia 2, Sub-Saharan Africa 1, Latin America 1, Southern
Europe 1 — 8 of 11 regions represented, none forced. Domains: literature 3,
science 2, philosophy 1, visual art 1, performing arts 1, sports 1,
activism/social reform 2, business 1, politics 3.

Frozen once selected — no substitution, no swap chasing eligibility.

## Audit and corrections (row-level)

Every row of all 15 candidates' existing evidence was manually reviewed
against `docs/scoring-rubric-v1.md` — the 85+ extremity rule (multiple
independent documented instances required), duplicate-instance-as-multiple
checks, confidence/evidenceType/impact internal consistency, and stale
provenance language. **Zero `RUBRIC_CORRECTION`s and zero
`ERROR_CORRECTION`s were needed at the scoring level** — every 85+ score
found (Wilberforce's `persistence` 95/`impact_motivation` 90, Indira
Gandhi's `risk_tolerance` 88/`leadership_drive` 88, Ulysses S. Grant's
`persistence` 85) was independently multi-instance-supported, and every
dual-edged/controversial episode (Gandhi's Emergency and Operation Blue
Star, Suleiman's execution of Ibrahim Pasha and his son Mustafa, Grant's
alcohol-allegation handling, Tata's Mistry removal) was already honestly
scored with appropriate `dual_edged`/`risk` impact and hedged rationale
language before this cycle began. This candidate pool had already been
through explicit remediation passes and, for Wilberforce and Indira Gandhi,
a formal evidence-lock process — the audit confirmed that work held up
rather than finding new problems.

One **`ERROR_CORRECTION`** was made, caught during the Part 19 factual gate
(see below), not the row audit itself: Jean Piaget's `curiosity` row
rationale claimed his early albino-sparrow paper was published "at age 11"
— re-opening the cited sources found Britannica supports "as a youth" with
no specific age, and Wikipedia (the row's other implied source) does not
mention the anecdote at all. Corrected the rationale text to remove the
unsupported number; `score`/`confidence`/`evidenceType`/`impact` unchanged
(62 documented facts don't hinge on the specific age).

## Classification metadata corrections

None found. `tsc --noEmit` ran clean on the first pass — no invalid enum
values (contrast Roster28's Tabei `impactDomains` fix and Roster27's
Borlaug fix).

## Product taxonomy/i18n coverage fixes

**5 gaps**, surfaced by the full test suite (`directoryTaxonomy.test.ts`,
`explorer.test.ts`) — not invalid classification values, but missing
curated-Directory/localization wiring for already-valid values this batch
used for the first time or pushed over the curation threshold:

1. `occupation.photographer` had no EN/KO translation — Dorothea Lange is
   the first production person with `"photographer"` as `occupationIds[0]`.
   Added (EN: "photographer", KO: "사진작가").
2. `occupation.religious_leader` had no EN/KO translation — Desmond Tutu is
   the first production person with `"religious_leader"` as
   `occupationIds[0]`. Added (EN: "religious leader", KO: "종교 지도자").
3. `field.religion` had no EN/KO translation and was not wired into
   `PROFESSION_CATEGORIES` — it now qualifies for the Directory's
   profession filter because it's used by >=2 people in the live roster.
   Added the translation (EN: "Religion", KO: "종교") and added `religion`
   to the `leadership_society` category.
4. `field.dance` had no EN/KO translation and was not wired into
   `PROFESSION_CATEGORIES` — now used by >=2 people. Added (EN: "Dance",
   KO: "무용") and added `dance` to the `arts_culture` category.
5. `field.journalism` had no EN/KO translation and was not wired into
   `PROFESSION_CATEGORIES` — now used by >=2 people (Dorothea Lange plus an
   existing production person). Added (EN: "Journalism", KO: "저널리즘") and
   added `journalism` to the `arts_culture` category.

`occupation.dancer` already existed (Katherine Dunham's `occupationIds[0]`
was already covered) — confirmed, not a gap.

## Editorial content

Full EN/KO achievements/moments/turning points for all 15, drawn only from
each candidate's already-audited evidence corpus — no general-knowledge
exception. Variable length matching the fast-batch convention: 3
achievements each, 1-2 moments each, 0-1 turning points (7 of 15 have one).
Korean display names added for all 15.

Two candidates' editorial content addresses ethically serious, already-scored
material honestly rather than presenting a sanitized narrative, matching how
their trait rows already handled it: **Indira Gandhi** (the 1975-77
Emergency, declared unilaterally and sustained for 21 months under
international condemnation; the 1984 Golden Temple military assault) and
**Suleiman the Magnificent** (the 1536 execution of his closest advisor
Ibrahim Pasha after a decade of partnership; the 1553 execution of his own
son Şehzade Mustafa on accusations historians regard as likely fabricated
by court rivals). **Ratan Tata**'s editorial explicitly includes the
contested 2016 Cyrus Mistry removal alongside the acquisitions record,
rather than a business-triumph-only narrative; **Ulysses S. Grant**'s
includes his 1859 manumission of William Jones at his own financial cost
without overstating it, and does not raise the contested alcohol
allegations at all, matching the candidate row's own deliberate restraint
on that point.

Verified via `editorialCoverageStats()`: **185/185 people have complete
editorial content**, 100.0% Korean coverage, `validateEditorial()` — 0
issues (including 0 among the 15 new profiles specifically). Total
editorial items roster-wide: 970 (421 achievements, 368 moments, 181
turning points), up from Roster28's 891.

## Portraits

All 15 sourced from Wikimedia Commons; every license page actually opened
and read (never trusted from a search snippet or thumbnail), per candidate:

| Candidate | Source/Creator | License | Kind |
|---|---|---|---|
| Gabriel García Márquez | Festival Internacional de Cine en Guadalajara, 2009 (cropped) | CC BY 2.0 | likeness |
| Murasaki Shikibu | Tosa Mitsuoki, c. late 17th c. (Ishiyama-dera tradition) | PD (artist d. 1691) | historical_depiction |
| Zora Neale Hurston | Carl Van Vechten, 1938 (LOC) | PD (no known restrictions) | likeness |
| Seneca | Unknown artist, Wawel Royal Castle Museum, Kraków | CC BY-SA 4.0 / PD | historical_depiction |
| Jean Piaget | Fotograaf Onbekend/Anefo, 1972 (Nationaal Archief) | CC0 1.0 | likeness |
| Ibn al-Haytham | Johannes Hevelius, 1647 engraving (Selenographia) | PD (artist d. 1687) | historical_depiction |
| Dorothea Lange | Rondal Partridge, 1936 (LOC/FSA) | PD-USGov | likeness |
| Katherine Dunham | Carl Van Vechten, 1940 (LOC) | PD (no known restrictions) | likeness |
| Wilma Rudolph | NYWT&S staff, 1961 (LOC) | PD (pre-1968 work-for-hire) | likeness |
| William Wilberforce | John Russell (d. 1806), National Portrait Gallery London | PD-Art | likeness |
| Desmond Tutu | Benny Gool, released by Tutu's office 2004 | PD (rights waived) | likeness |
| Ratan Tata | Sarvajanik Puralekh (Flickr) | CC BY-SA 2.0 | likeness |
| Indira Gandhi | Prime Minister's Office, Government of India, 1983 | GODL-India | likeness |
| Ulysses S. Grant | Library of Congress, 1860 | PD (pre-1931) | likeness |
| Suleiman the Magnificent | Melchior Lorck, 1562 engraving | PD (artist d. 1583) | historical_depiction |

11 likenesses, 4 `historical_depiction` (Murasaki Shikibu, Seneca, Ibn
al-Haytham, Suleiman the Magnificent — all pre-photography subjects with no
possible lifetime image). Two deliberate rejections during sourcing:

- **Seneca**: Commons hosts a "Pseudo-Seneca" bust tradition long assumed to
  depict him, now understood by scholars to be a misidentification (Commons
  itself flags this in a dedicated `Pseudo-Seneca` category). Used a
  separately-catalogued Wawel Castle Museum painting instead, explicitly
  honestly labeled as a later depiction by an unknown artist — not a
  substitute claim of authenticity.
- **Ibn al-Haytham**: the image most Wikipedia language editions actually
  use as his lead portrait (`File:Ibn Al-Haytham portrait.jpg`) is a 2021
  Commons upload whose own author describes it as "رسم تخيلي" — an
  imaginary/fictional drawing — with no historical source at all. Used the
  genuine 1647 Hevelius engraving instead, a real historical depiction with
  real provenance (Polona/National Library of Poland, GLAM partnership),
  honestly labeled `historical_depiction`, not presented as a lifetime
  likeness either.

One 2-person photo required cropping to isolate the subject (Jean Piaget,
from a 1972 Erasmus Prize ceremony photo with Prince Bernhard — CC0 source,
crop noted in the portrait's `attribution` field). Two files (Zora Neale
Hurston, Katherine Dunham — both Carl Van Vechten photographs) were
deliberately left uncropped per the Van Vechten estate's stated request
that his photographs not be cropped or colorized. All 15 resized to the
project's standard 1600px-longest-side ceiling (no upscale) and recompressed
(mozjpeg, quality 85) via an isolated `sharp` install in the session
scratchpad — the main project's `package.json`/lockfile were never touched.
Wikimedia's edge rate-limiter blocked rapid-fire direct-file downloads
partway through sourcing (`429 Too many requests`); switched to the
documented 1280px-width thumbnail CDN path per Wikimedia's own guidance
rather than retrying the blocked path, which resolved cleanly.

## Promotion

All 15 promoted via `src/dev/roster1000/generateRoster29.ts` — same
architecture as `generateRoster28.ts` (explicit literal slug allowlist,
`preparePersonSeedForPromotion()`, never `toPersonSeed()` directly, never
reads `computedEligibility.eligible`). Run twice: once after the initial
candidate JSON finalization, once more after the Jean Piaget
`ERROR_CORRECTION` found during the Part 19 factual gate, so the committed
`roster29.ts` reflects the final corrected rationale text.

**Derived-data consistency**: a dedicated script compared every promoted
candidate's identity, `score`/`confidence`/`evidenceType`/`impact` for every
row, classification metadata, portrait fields, and `isMatchEligible` against
the live `peopleIndex.generated.ts` entry — **0 unexplained mismatches
across all 15 candidates**, confirmed both before and after the second
generator run.

## Match eligibility

Ran `evaluateMatchEligibility()` live for all 15 via the actual production
function (not a cached snapshot). **All 15 are non-eligible** — zero newly
match-eligible people this cycle. Exact binding reason(s) per person:

| Candidate | Coverage (need >=0.6) | High-conf. count (need >=12) | High-conf. avg (need >=0.55) | Binding constraint |
|---|---|---|---|---|
| Gabriel García Márquez | 0.664 OK | 9 | 0.590 OK | high-confidence count |
| Murasaki Shikibu | 0.625 OK | 13 OK | 0.548 | high-confidence average only |
| Zora Neale Hurston | 0.603 OK | 11 | 0.575 OK | high-confidence count (1 short) |
| Seneca | 0.569 | 15 OK | 0.555 OK | coverage only |
| Jean Piaget | 0.636 OK | 10 | 0.620 OK | high-confidence count |
| Ibn al-Haytham | 0.604 OK | 9 | 0.622 OK | high-confidence count |
| Dorothea Lange | 0.636 OK | 6 | 0.650 OK | high-confidence count |
| Katherine Dunham | 0.607 OK | 8 | 0.615 OK | high-confidence count |
| Wilma Rudolph | 0.604 OK | 5 | 0.650 OK | high-confidence count |
| William Wilberforce | 0.542 | 12 OK | 0.622 OK | coverage only |
| Desmond Tutu | 0.629 OK | 10 | 0.605 OK | high-confidence count |
| Ratan Tata | 0.531 | 3 | 0.550 | coverage AND high-confidence count AND average |
| Indira Gandhi | 0.590 | 13 OK | 0.617 OK | coverage only (0.01 short) |
| Ulysses S. Grant | 0.648 OK | 9 | 0.576 OK | high-confidence count |
| Suleiman the Magnificent | 0.568 | 14 OK | 0.565 OK | coverage only |

No score was adjusted after seeing this output. Per the brief, since zero
new people are match-eligible: **`dispersion.generated.ts` was not
regenerated, calibration was not run, no matching-health simulation was
run.** `eligibility_v2`, the matching formula, and calibration anchors are
all byte-identical to before this PR.

## Source-claim factual gate (Part 19)

Performed one risk-based verification pass on all newly-authored EN/KO
editorial text and candidate rationale changes, scanning for the trigger
words (first, only, founder/founded, invented, purchased, financed,
confirmed, DNA, award/Nobel, etc.) and re-opening the actual cited sources
for the highest-risk hits — not a reflex trust of the already-audited
candidate rationale. **Two real issues found and fixed before commit:**

1. **Wilma Rudolph** — editorial claimed she became "the first American
   woman to win three gold medals in a single Olympic Games." Re-opening
   the cited Wikipedia article found the actual claim is scoped to *track
   and field*: "the first American woman to win three gold medals in track
   and field during a single Olympic Games." Corrected both EN and KO to
   include the qualifier.
2. **Jean Piaget** — candidate row and editorial both stated his early
   albino-sparrow paper was published "at age 11." Wikipedia doesn't
   mention the anecdote at all (it credits his early reputation to mollusk
   papers "by the age of 15" instead); Britannica does confirm the sparrow
   paper but says only "as a youth," with no specific age given. Corrected
   the candidate row (`ERROR_CORRECTION`, score/confidence/evidenceType/
   impact unchanged) and both EN/KO editorial text to remove the
   unsupported number, and fixed the editorial item's `sourceIds` from
   Wikipedia to Britannica to match what actually supports the claim.

One additional precision-only adjustment, not a factual error: **Katherine
Dunham**'s editorial said she "founded" the Dunham Technique; the cited
Wikipedia article's own verb is "developed." Changed to match the source's
wording — "founded" isn't false for a named technique she originated, but
"developed" is what the source actually says, and this project's own
overclaim-word discipline treats "founded" as a trigger to verify rather
than a word to use loosely.

Ratan Tata's editorial was drafted with particular care given the
"founder"/"founded" overclaim risk: he chaired Tata Sons (1991-2012), a
company founded by Jamsetji Tata in 1868. No sentence in his editorial or
candidate rows calls him a founder of Tata Group; all wording uses
"directed," "began his career," or "led."

## Validation summary

- [x] `tsc --noEmit` — clean (both generator runs)
- [x] `validateCandidates.ts` — 0 errors, 0 warnings (`evidence_approved: 57`, `qa_passed: 93`, `held: 127`)
- [x] `checkScoringLockIntegrity.ts` — 0 flagged
- [x] `vitest run` — **744/744** passed (after 9 genuinely-affected test updates — see below)
- [x] `i18n-audit.ts` — 100% Korean coverage, 0 missing
- [x] `editorialCoverageStats()` / `validateEditorial()` — 185/185 people with editorial content, 100.0% Korean coverage, 0 validation issues
- [x] `next build --webpack` — clean, 394 static pages
- [x] Focused Playwright (`roster29FifteenPersonFastBatch.spec.ts` + `peopleDirectory.spec.ts` + `person.visual.spec.ts` + `compare.visual.spec.ts`) — **221/221** passed. One genuine test bug found and fixed on the first run: Gabriel García Márquez's "findable via Directory search" test used a naive ASCII `slug.replace(/-/g, " ")` search term that doesn't reproduce his name's accented characters (í, á) — same class of issue Roster28 hit for Sun Yat-sen/Ida B. Wells/Winnie Madikizela-Mandela. Added a `searchTerm: "gabriel"` override matching that precedent; re-ran that one test to confirm, then the full suite was already green.
- [x] Manual production-server spot-check (see below) — a `next dev` artifact unrelated to this batch's own correctness was found and routed around: newly-added people 404'd under `next dev` (even after clearing `.next` and restarting) while every pre-existing person rendered fine, despite `generateStaticParams()` correctly listing them and Playwright's independent from-scratch `next build && next start` cycle passing all 15 in full. Verified this is a dev-server-only symptom, not a data or code defect, by running a plain `next start` production server on a separate port for the manual check instead of fighting `next dev` further.
- [x] Candidate→roster29→`SEED_PEOPLE` consistency script — 0 mismatches across identity/score/confidence/evidenceType/impact/classification/portrait/`isMatchEligible` for all 15 candidates, re-confirmed after the Piaget correction

### Manual product verification

Representative spot-check on a real production server (`next build --webpack`
+ `next start`, not `next dev` — see the dev-mode artifact note above),
en-US unless noted:

- Globally recognizable: **Ulysses S. Grant** — portrait, attribution,
  trait constellation, achievements/moments, and the honest
  non-match-eligible note all render correctly.
- Science/technical: **Ibn al-Haytham** — `historical_depiction` portrait
  renders with correct attribution and, correctly, no
  `editorial_nonlikeness` "Editorial visual · Not a likeness" label (this
  batch used zero `editorial_nonlikeness` portraits; that label is reserved
  for a different `kind` value than the four `historical_depiction`
  portraits used here).
- Controversial/dual-edged + Korean profile (combined):
  **인디라 간디 (Indira Gandhi, ko-KR)** — Korean name, editorial, and
  interpretation text all render naturally; the Emergency and Golden Temple
  military action are presented with the same honesty as the underlying
  rows (`양날의 특성`/dual-edged badges visible on `risk_tolerance`,
  `conflict_tolerance`, `decisiveness`, `autonomy_need`, `competitiveness`);
  no raw i18n keys.
- Mobile Directory (375px): clean layout, no horizontal overflow, "184
  people" count correct.
- Search: "suleiman" correctly resolves to exactly one result, Suleiman the
  Magnificent.
- `editorial_nonlikeness` check: N/A — none used this cycle (see above).

Not manually re-checked beyond this sample (Playwright's 221/221 already
covers per-person portrait/attribution/editorial/search/Compare-state
correctness for all 15 individually, in both locales).

### Test maintenance (genuinely affected only)

- `src/core/matching/matching.test.ts` — both non-eligible skip lists
  extended with all 15 roster29 slugs (2 tests).
- `src/core/people/profilePublicationSeparation.test.ts` — counts
  170/169→185/184, `KNOWN_DIVERGENT_SLUGS` extended by all 15 (comment
  "forty-two"→"fifty-seven") (3 tests).
- `src/dev/roster1000/production/session18/session18Isolation.test.ts` —
  Indira Gandhi and William Wilberforce moved from `held` to
  `evidence_approved` by this batch; updated both tests to assert the new
  status while independently re-verifying the *locked scoring itself*
  (row count, `computedEligibility.coverage`) is unchanged from session 18
  (2 tests).
- `src/core/people/directoryTaxonomy.test.ts` / `explorer.test.ts` — no
  test *logic* changed; both failed honestly against the new taxonomy gaps
  above and now pass once the gaps were fixed (product code changes, not
  test changes).
- `e2e/peopleDirectory.spec.ts` — one hardcoded ko-KR cross-facet total
  (170명→185명; the filtered count of 6 people is unchanged — verified
  directly against the live `filterPeople()` call, not raw score
  arithmetic, since the filter uses population z-scores).
- New shared spec `e2e/roster29FifteenPersonFastBatch.spec.ts`: table-driven
  across all 15 candidates, not 15 near-identical files.

No unrelated historical test was rewritten.

## What did NOT change

- `eligibility_v2`, `ELIGIBILITY_VERSION`, the matching formula, calibration
  anchors, `dispersion.generated.ts`.
- No other candidate JSON, no other person's data, no unrelated UI,
  `next-env.d.ts`. `.env.local` was copied into this worktree from the main
  checkout purely to run local servers/Playwright — gitignored, never
  staged or modified.
- No `package.json`/lockfile change — `sharp` was installed in an isolated
  scratch directory outside the project, never added to this repo.
- No `held` candidate outside the frozen 15 was reused; no new behavioral
  source or historical claim introduced (portrait sourcing and the Part 19
  source-claim re-verification were the only new external research this
  cycle, and the latter narrowed/corrected wording rather than adding
  facts).
- No Roster30 work started.

## Final counts

**185 production / 184 default-directory-visible / 127 match-eligible**
(was 170/169/127 — match-eligible count unchanged this cycle).

## Confirmations

- No eligibility rescue: `eligibility_v2` was never modified, and no
  candidate's numeric snapshot was adjusted after being observed.
- No new behavioral research: portrait sourcing and the Part 19 source
  re-verification (which only narrowed wording against already-cited
  sources) were the only new external research this cycle.
- No throwaway Vercel previews were created during this session (local
  validation only — `next build --webpack` and Playwright's own
  build-then-serve `webServer`).
- No Roster30 work started.
