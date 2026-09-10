# Roster-28: Fifteen-Person Fast Production Batch

Branch: `feat/roster28-fifteen-person-fast-batch` (worktree:
`C:\Users\Lenovo\TheGreatInside-roster28-fifteen-person-fast-batch`, created
from `origin/main` at `dbff7717ee0510645687a66ce38693a321683380`, confirmed
matching the expected base SHA — no advance on `origin/main` between task
authoring and execution).

## Why this cycle exists

Throughput, with a recognizability-weighted selection rule this time:
among evidence-viable held candidates, prioritize broad public
recognizability for product value — but recognizability was used **only**
for productization order, never to influence trait scores, confidence,
evidenceType, impact, or eligibility.

## Held-pool inventory (Part B)

Inspected all 157 `held` candidates in `data-pipeline/candidates/*.json`
(the `qa_passed`/`evidence_approved` pool was confirmed fully drained by
Roster27 — 120 such candidates exist but all are already-live people whose
files were simply never flipped to `status: "committed"`, a pre-existing
bookkeeping gap, not available candidates). Separated into:

- **Group A (eligibility-only holds, publication-auditable)**: 135
  candidates — the frozen 15 are drawn entirely from this group.
- **Group B (evidence-integrity/identity/sourcing concerns, excluded)**:
  22 candidates, explicitly NOT eligible for this cycle regardless of
  their numeric eligibility snapshot:
  - **17 candidates** carrying an identical "Session-11 blind
    scoring-integrity re-audit" flag (al-ghazali, anwar-sadat, archimedes,
    ban-zhao, bhagat-singh, chiune-sugihara, cicero, hannibal-barca,
    ibn-battuta, mary-seacole, mimar-sinan, nasir-al-din-al-tusi,
    patrice-lumumba, simone-de-beauvoir, steve-biko, zeami-motokiyo,
    zhang-heng) — confidence had been inflated specifically to cross
    `eligibility_v2` in a real 2026-08 incident, then reverted; even
    though the specific inflated rows are already corrected, promoting
    from this flagged batch without the "explicit human review" the
    files themselves call for was judged out of scope for an AI-run
    throughput cycle.
  - **John von Neumann** — a separate, later evidence-integrity
    correction (originally promoted then reverted after an audit found
    the evidence pack rested on a single actually-consulted source).
  - **Marco Polo, Sun Tzu** — contested individual historicity/source
    reliability, honestly self-documented in their own candidate files.
  - **Sitting Bull** — never scored (`0` rows), contested/oral-tradition
    facts, per a deliberate "do not score too early" hold.
  - **Rigoberta Menchu** — a disclosed source-reliability complication
    around her 1983 testimonial autobiography.

## Frozen 15 (Part C)

Ranked by evidence viability first, recognizability second, with domain
and regional diversity as explicit tie-breakers:

| # | Candidate | Domain | Region/Era | Rows | Existing evidence richness |
|---|---|---|---|---|---|
| 1 | Agatha Christie | Writer | Western Europe, 20th c. | 22 | 4 sources incl. own autobiography, 2 independent biographies |
| 2 | Winston Churchill | Politics/Writer | Western Europe, 20th c. | 20 | Official 8-vol. biography, Royal Society memoir |
| 3 | Thomas Jefferson | Politics/Law/Architecture | North America, early modern | 22 | His own papers, 2 independent biographies |
| 4 | Sun Yat-sen | Politics/Medicine | East Asia, 20th c. | 19 | His own 1897 published account, 2 standard biographies |
| 5 | Katharine Hepburn | Film | North America, 20th c. | 22 | Own memoir, independent biography, Tracy-family accounts |
| 6 | Henry Ford | Business/Engineering | North America, 20th c. | 22 | Own autobiography, 2 independent biographies |
| 7 | Eleanor Roosevelt | Diplomacy/Activism | North America, 20th c. | 20 | 4 own memoirs, GWU Papers Project |
| 8 | Stephen Hawking | Physics | Western Europe, contemporary | 18 | Own memoir, first wife's independent memoir |
| 9 | Diego Rivera | Visual Art | Latin America, 20th c. | 21 | MoMA record, Wikipedia |
| 10 | Naguib Mahfouz | Literature | North Africa, 20th c. | 20 | Nobel citation, scholarly biography, press |
| 11 | Ida B. Wells | Journalism/Civil rights | North America, 20th c. | 18 | Own autobiography, LOC record |
| 12 | Junko Tabei | Exploration | East Asia, contemporary | 22 | Own English-translated memoir, AAC review |
| 13 | Ravi Shankar | Music | South Asia, contemporary | 18 | Own autobiography, press |
| 14 | Winnie Madikizela-Mandela | Activism | Sub-Saharan Africa, contemporary | 18 | Own memoir (491 Days), TRC record |
| 15 | Amartya Sen | Economics | South Asia, contemporary (living) | 21 | Nobel citation, Wikipedia |

3 political/state figures (Churchill, Jefferson, Sun Yat-sen) — at the
brief's own cap. Regional spread: North America 5, Western Europe 3, East
Asia 2, South Asia 2, Latin America/North Africa/Sub-Saharan Africa 1
each. West Asia, Central Asia, Central Europe, and Southern Europe have no
representation this cycle — their strongest held candidates were either
Group B (Session-11 flagged) or too thin to be a strong product pick; no
weaker candidate was forced in just to fill a region.

Frozen once selected — no substitution, no swap chasing eligibility.

## Audit and corrections (Parts D-E)

Every row of all 15 candidates' existing evidence was mechanically and
manually reviewed against `docs/scoring-rubric-v1.md` §4 (the 85+
extremity rule: multiple independent documented instances required, not
one continuous episode or a single anecdote). **3 `RUBRIC_CORRECTION`s
across 2 candidates**, all moving scores down, all preserving
`confidence`/`evidenceType`:

- **Sun Yat-sen** `risk_tolerance` 88→80 — rested on one single dated
  episode (the 1896 London kidnapping); continuing to organize afterward
  is not itself a second risk-taking instance.
- **Ida B. Wells** `risk_tolerance` 90→80 and `proactive_agency` 88→80 —
  each rested on one single dated episode (the 1892 mob destruction of
  her newspaper office; the 1884 railroad lawsuit).

Several other 85+ scores were checked and kept as genuinely defensible,
distinguishing two patterns: (a) a single one-time dated **event**
elevated past 85 with no second instance — a violation, corrected above;
(b) a sustained, quantified, multi-decade **pattern** central to how the
person is historically understood (Winston Churchill's `persistence` 85
— a decade of repeated public warnings; Eleanor Roosevelt's `persistence`
92 — a quantified 27-year, six-day-a-week column; Stephen Hawking's
`persistence` 95 and `adaptability` 90 — his defining, historically
central response to ALS; Ravi Shankar's `discipline` 90 and
`mastery_orientation` 88 — a seven-year apprenticeship and a 70-year
career) — kept unchanged, applied consistently across the batch rather
than flagging one and not the other.

No candidate was rescued toward eligibility; `eligibility_v2` was not
touched at any point in this process.

## Classification metadata correction

**1 classification metadata correction**, caught by `tsc` (not the manual
row audit): **Junko Tabei** `classification.impactDomains` included
`"environmental"`, which is not a member of the `IMPACT_DOMAINS` enum
(`src/core/types.ts`). Corrected to `"social"` — her later-career focus
was environmental conservation advocacy, a form of social impact; same
substitution precedent as Roster27's Borlaug `"humanitarian"`→`"social"`
fix. No score/confidence/evidenceType/impact change.

## Product taxonomy/i18n coverage fixes

**2 product taxonomy/i18n coverage gaps**, surfaced by the full test
run — not invalid classification values, but missing curated-Directory/
localization wiring for already-valid values this batch used for the
first time:

1. `occupation.economist` had no EN/KO translation — Amartya Sen is the
   first production person with `"economist"` as `occupationIds[0]`.
   Added the translation (EN: "economist", KO: "경제학자").
2. `field.diplomacy` had no EN/KO translation and "diplomacy" was not
   wired into `PROFESSION_CATEGORIES` — it now qualifies for the
   Directory's profession filter because Winston Churchill and Eleanor
   Roosevelt both use it, crossing the "used by >=2 people" curation
   threshold. Added the translation (EN: "Diplomacy", KO: "외교") and
   added `diplomacy` to the `leadership_society` category, next to
   `politics`. (`"economics"` as a field, used only by Amartya Sen, does
   not cross the 2-person threshold and was correctly left out of the
   curated Directory taxonomy — confirmed `fieldIds` are never rendered
   outside that curated mechanism, so this is not a raw-key risk.)

## Editorial factual consistency (Part I)

Rather than a separate pass after the fact, every editorial claim was
checked against its cited row's own rationale text *while being drafted*
— the same discipline that would have caught Roster27's Lamarr/Earhart
wording errors before they were ever written. Specifically checked for:
"first"/"only"/records/awards/dates/completed-vs-attempt framing on every
item. One genuine issue was caught this way, before promotion:

- **Stephen Hawking's** `achievement.1` originally read "...following a
  1963 diagnosis with a motor neuron disease (ALS)..." — this tripped
  `editorialValidation.test.ts`'s banned-diagnostic-language pattern
  (`/\b(diagnosed|diagnosis) with\b/i`), the same evidence-discipline
  rule CLAUDE.md applies to scoring, correctly also enforced at the
  editorial layer. Reworded to "...following a 1963 ALS diagnosis..." —
  matching the phrasing his own candidate row already used, same fact,
  no banned pattern. `editorialValidation.test.ts`: 20/20 after the fix.

No other factual wording issues found in the final pass.

## Portraits (Part G)

All 15 sourced from Wikimedia Commons; every license page actually opened
and verified (never trusted from a search snippet or thumbnail), per
candidate:

| Candidate | Source/Photographer | License | Kind |
|---|---|---|---|
| Agatha Christie | Joop van Bilsen/Anefo, 1964 (Nationaal Archief) | CC0 1.0 | likeness |
| Winston Churchill | UK National Archives, 1945 (Yalta) | Crown Copyright expired | likeness |
| Thomas Jefferson | Rembrandt Peale, 1800 (White House Collection) | PD (age) | likeness |
| Sun Yat-sen | Bo'er Photo Studio, Shanghai, 1922 ("standard portrait") | PD (China/Taiwan law) | likeness |
| Katharine Hepburn | MGM Studios, 1941 (restored by A. Cuerden) | PD (documented non-renewal) | likeness |
| Henry Ford | Ford Motor Co. Photographic Dept., 1915 (The Henry Ford) | PD (pre-1931) | likeness |
| Eleanor Roosevelt | FDR Presidential Library & Museum, c.1946-47 | CC BY 2.0 | likeness |
| Stephen Hawking | NASA/Paul Alers, 2008 | PD-USGov | likeness |
| Diego Rivera | Unknown photographer, by 1957 (Museo Frida Kahlo) | PD (Mexico anonymous-work rule) | likeness |
| Naguib Mahfouz | Bertramz, 2008 (memorial statue, Cairo) | CC BY 3.0 | **editorial_nonlikeness** |
| Ida B. Wells | Mary Garrity, c.1893 | PD (age) | likeness |
| Junko Tabei | Jaan Kunnap, 1985 | CC BY-SA 4.0 | likeness |
| Ravi Shankar | Markgoff2972, 1969 (Woodstock, VRT-verified) | CC BY-SA 4.0 | likeness |
| Winnie Madikizela-Mandela | John Mathew Smith/Kingkongphoto, 1996 | CC BY-SA 2.0 | likeness |
| Amartya Sen | Elke Wetzig, 2007 (Cologne) | CC BY-SA 3.0 | likeness |

14 real likenesses, 1 `editorial_nonlikeness` (Mahfouz — no rights-clear
personal photograph found within this session's research; a memorial
statue photograph honestly labeled as not a likeness, per the project's
established fallback convention). One deliberate near-miss avoided:
Churchill's iconic Karsh "Roaring Lion" portrait (1941) carries a
defensible PD template but is also the single most commercially-exploited
Churchill photograph in existence (its physical print was the subject of
a 2022 theft/2024 restitution case); the UK National Archives' 1945 Yalta
photograph was used instead as a cleaner, unambiguous Crown-Copyright
case. All 15 resized to the project's standard 1600px-longest-side
ceiling (no upscale) and recompressed (mozjpeg, quality 85) via an
isolated `sharp` install in the session scratchpad — the main project's
`package.json`/lockfile were never touched.

## Editorial content (Part H)

Full EN/KO achievements/moments/turning points for all 15, drawn only
from each candidate's already-audited evidence corpus — no
general-knowledge exception. Variable length per person (2-3
achievements, 2 moments, 0-1 turning points), matching the fast-batch
convention rather than a forced 2/2/1 template. Korean display names
added for all 15. Two candidates' editorial content deliberately
addresses ethically serious, already-scored material honestly rather than
presenting a sanitized narrative — matching how their trait rows already
handled it: **Thomas Jefferson** (his documented, DNA-confirmed
relationship with Sally Hemings and his sustained enslavement of over 600
people despite his own written condemnation of slavery) and **Winnie
Madikizela-Mandela** (the 1997 TRC finding of accountability for violence
connected to the Mandela United Football Club, including the killing of
Stompie Moeketsi, and the 1986 "necklacing" statement controversy).

Verified via `editorialCoverageAudit.ts`: **170/170 people have complete
editorial content**, 100.0% Korean coverage, 891 total editorial items
(376 achievements, 341 moments, 174 turning points) roster-wide.

## Promotion (Parts J-K)

All 15 promoted via `src/dev/roster1000/generateRoster28.ts` — same
architecture as `generateRoster27.ts` (explicit literal slug allowlist,
`preparePersonSeedForPromotion()`, never `toPersonSeed()` directly, never
reads `computedEligibility.eligible`). `generateRoster28.ts` and
`generatePeopleIndex.ts` were run only after all candidate JSON edits
(including the Tabei metadata fix) were final.

**Derived-data consistency**: a dedicated script compared every promoted
candidate's identity, `score`/`confidence`/`evidenceType`/`impact` for
every row, classification metadata, portrait fields, `isDirectoryVisible`,
and `status` against the live `SEED_PEOPLE` entry (never trusting cached
`computedEligibility`) — **0 unexplained mismatches across all 15
candidates.**

## Match eligibility (Part L)

Ran `evaluateMatchEligibility()` live for all 15. **All 15 are
non-eligible** — zero newly match-eligible people this cycle. Exact
binding reason(s) per person:

| Candidate | Coverage (need >=0.6) | High-conf. count (need >=12) | High-conf. avg (need >=0.55) | Binding constraint |
|---|---|---|---|---|
| Agatha Christie | 0.654 OK | 8 | — | high-confidence count |
| Winston Churchill | 0.599 | 8 | — | coverage AND high-confidence count |
| Thomas Jefferson | 0.650 OK | 9 | — | high-confidence count |
| Sun Yat-sen | 0.572 | 8 | — | coverage AND high-confidence count |
| Katharine Hepburn | 0.642 OK | 14 OK | 0.540 | high-confidence average only |
| Henry Ford | 0.661 OK | 11 | — | high-confidence count (1 short) |
| Eleanor Roosevelt | 0.599 (0.001 short) | 12 OK | 0.603 OK | coverage only, essentially at boundary |
| Stephen Hawking | 0.536 | 6 | — | coverage AND high-confidence count |
| Diego Rivera | 0.632 OK | 7 | — | high-confidence count |
| Naguib Mahfouz | 0.604 OK | 8 | — | high-confidence count |
| Ida B. Wells | 0.542 | 6 | — | coverage AND high-confidence count |
| Junko Tabei | 0.663 OK | 8 | — | high-confidence count |
| Ravi Shankar | 0.542 | 4 | — | coverage AND high-confidence count |
| Winnie Madikizela-Mandela | 0.536 | 12 OK | 0.566 OK | coverage only |
| Amartya Sen | 0.635 OK | 9 | — | high-confidence count |

No score was adjusted after seeing this output. Per the brief, since zero
new people are match-eligible: **`dispersion.generated.ts` was not
regenerated, calibration was not run, no matching-health simulation was
run.** `eligibility_v2`, the matching formula, and calibration anchors are
all byte-identical to before this PR.

## Test regression maintenance (Part N)

- `src/core/matching/matching.test.ts` — both non-eligible skip lists
  extended with all 15 roster28 slugs.
- `src/core/people/profilePublicationSeparation.test.ts` — Case 4 counts
  155/154→170/169, `KNOWN_DIVERGENT_SLUGS` extended by all 15 (comment
  updated "twenty-seven"→"forty-two"), match-eligible-set test untouched
  (still 127, correctly).
- `e2e/peopleDirectory.spec.ts` — one hardcoded ko-KR cross-facet total
  (155명→170명; the filtered count of 6 people is unchanged — verified
  directly against the live rendered result, not raw score arithmetic,
  since the filter uses population z-scores, not a raw threshold).
- New shared spec `e2e/roster28FifteenPersonFastBatch.spec.ts`:
  table-driven across all 15 candidates (107 tests), not 15
  near-identical files.

## What did NOT change

- `eligibility_v2`, `ELIGIBILITY_VERSION`, the matching formula,
  calibration anchors, `dispersion.generated.ts`.
- No other candidate JSON, no other person's data, no unrelated UI,
  `next-env.d.ts`, or `.env.local` (a working copy of `.env.local` was
  copied into this worktree from the main checkout purely to run local
  servers/Playwright — the file itself is gitignored and was never
  staged or modified).
- No `package.json`/lockfile change — the `sharp` image-processing
  dependency used for portrait resizing was installed in an isolated
  scratch directory outside the project, never added to this repo.
- No `held` candidate outside the frozen 15 was reused; no new behavioral
  source or historical claim introduced (portrait sourcing was the only
  new external research this cycle, contributing zero facts to scores or
  editorial content).
- No Roster29 work started.

## Final counts

**170 production / 169 default-directory-visible / 127 match-eligible**
(was 155/154/127 — match-eligible count unchanged this cycle). Zheng He,
Giuseppe Garibaldi, Anton Chekhov, the roster25 six, the roster26 ten, and
the roster27 twelve all unchanged.

## Validation summary

- [x] `tsc --noEmit` — clean
- [x] `validateCandidates.ts` — 0 errors, 0 warnings (`evidence_approved: 42`, `qa_passed: 93`, `held: 142`)
- [x] `checkScoringLockIntegrity.ts` — 0 flagged (all 3 `RUBRIC_CORRECTION` labels recognized)
- [x] `vitest run` — **744/744** passed
- [x] `i18n-audit.ts` — 100% Korean coverage, 0 missing
- [x] `editorialCoverageAudit.ts` — 170/170 people with editorial content, 100.0% Korean coverage
- [x] `next build --webpack` — clean, static pages for 170 people × 2 locales + baseline
- [x] Focused Playwright — **107/107** (new roster28 spec) + **143/143** shared Directory/person/compare visual coverage — all passed
- [x] Manual EN/KO/mobile browser spot-check against a real production server built from this worktree (Agatha Christie, Stephen Hawking, Winston Churchill Korean profile, Naguib Mahfouz `editorial_nonlikeness` label, mobile Directory view at 375px, "amartya" name search): portraits render with correct attribution, honest non-matching note shows for all 15, `occupation.economist`/`field.diplomacy` render correctly (not raw i18n keys), no horizontal overflow, zero console errors
- [x] Candidate→roster28→`SEED_PEOPLE` consistency script — 0 mismatches across identity/score/confidence/evidenceType/impact/classification/portrait/status for all 15 candidates

## Confirmations

- No eligibility rescue: `eligibility_v2` was never modified, and no
  candidate's numeric snapshot was adjusted after being observed.
- No new behavioral research: portrait sourcing was the only new
  external research this cycle.
- No throwaway Vercel previews were created during this session (local
  validation only — `next build --webpack` and a locally-run production
  server on an unused port).
- No Roster29 work started.
