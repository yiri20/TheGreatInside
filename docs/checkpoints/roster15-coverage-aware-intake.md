# Roster-15 coverage-aware intake (2026-09)

Applies roster-14's coverage-aware preflight as the now-standard method
(evidence breadth first, ≥21-22 canonical-attribute-capable evidence
required before freezing, no `baseWeight`-driven attribute selection, no
post-validator rescue). Result: **8 of 12 frozen candidates crossed
`eligibility_v2` honestly on first score.**

## 1. Discovery pool (34 candidates)

Mechanically excluded: all 108 live roster people (post-roster-14), all 227
previously-researched candidate JSON files (every prior intake batch and
the roster-expansion-125 program), Che Guevara, Queen Victoria.

19 of the 34 were carried forward from roster-14's own discovery pool —
names it had already identified and Wikidata-verified but never scored or
given a candidate file (John Adams, Abigail Adams, Elizabeth Cady Stanton,
Harriet Beecher Stowe, F. Scott Fitzgerald, Zelda Fitzgerald, George
Orwell, Bertrand Russell, Charles Dickens, Giuseppe Garibaldi, Carl Jung,
Charlie Chaplin, Harry Houdini, Eva Perón, T. E. Lawrence, Gertrude Bell
[since promoted in roster-14 itself and excluded here], Qiu Jin, Édith
Piaf, Duke Ellington, John D. Rockefeller) — none of these had ever been
scored or committed as a candidate file, so re-preflighting them is
consistent with "check the current candidate corpus," not a reuse of
prior research. 15 are genuinely new to any cycle, each independently
Wikidata-verified live before freezing:

| Slug | Name | QID | Era | Region |
|---|---|---|---|---|
| frederick-the-great | Frederick the Great (Frederick II of Prussia) | Q33550 | 18th c. | Western Europe |
| catherine-the-great | Catherine the Great (Catherine II of Russia) | Q36450 | 18th c. | Central Europe |
| thomas-jefferson | Thomas Jefferson | Q11812 | 18th-19th c. | North America |
| ulysses-s-grant | Ulysses S. Grant | Q34836 | 19th c. | North America |
| andrew-jackson* | Andrew Jackson | Q11817 | 19th c. | North America |
| maya-angelou | Maya Angelou | Q19526 | 20th c. | North America |
| james-joyce | James Joyce | Q6882 | 20th c. | Western Europe (Ireland) |
| salvador-dali* | Salvador Dalí | Q5577 | 20th c. | Southern Europe |
| marlene-dietrich | Marlene Dietrich | Q4612 | 20th c. | Western Europe |
| nellie-bly* | Nellie Bly | Q230299 | 19th-20th c. | North America |
| agatha-christie | Agatha Christie | Q35064 | 20th c. | Western Europe |
| ruth-bader-ginsburg | Ruth Bader Ginsburg | Q11116 | 20th-21st c. | North America |
| miles-davis | Miles Davis | Q93341 | 20th c. | North America |
| nina-simone | Nina Simone | Q174957 | 20th c. | North America |
| henry-ford | Henry Ford | Q8768 | 19th-20th c. | North America |

`*` = discovered and preflighted but not frozen this cycle.

## 2. Preflight classifications

27 of 34 assessed `STRONG_22_CAPABLE`. 7 `PLAUSIBLE_21_22` (Zelda
Fitzgerald — illness-adjacent evidence requiring care; Giuseppe Garibaldi,
Harry Houdini, Eva Perón, Qiu Jin, Édith Piaf — self-mythologizing/legend-
accretion risk; Salvador Dalí — explicit, admitted self-mythologizing).
None `UNDER_21_EXPECTED`/`STRUCTURAL_RISK`/`REJECT_PRE_SCORE` — the pool
was again curated toward richly personally-documented figures before
preflight.

## 3. Frozen batch (12, ordered)

Froze 12, prioritizing `STRONG_22_CAPABLE` exclusively (no
`PLAUSIBLE_21_22` needed) and deliberately improving gender balance
against roster-14's 9-male/3-female skew — 6 of the 9 `STRONG`-tier women
identified this cycle were included:

1. Maya Angelou
2. Ruth Bader Ginsburg
3. Nina Simone
4. Marlene Dietrich
5. Agatha Christie
6. Catherine the Great
7. Frederick the Great
8. Thomas Jefferson
9. Ulysses S. Grant
10. James Joyce
11. Miles Davis
12. Henry Ford

Final gender split: 6 women, 6 men. No replacements after freeze; no
rescue candidates; no post-validator evidence additions.

## 4. Preflight accuracy vs. actual (Part I analysis)

| Candidate | Preflight est. attrs | Evidence-pack-supported | Actually scored | Weighted coverage | avgConf | Lifecycle |
|---|---|---|---|---|---|---|
| Maya Angelou | ~22 | 23 | 23 | 0.685 | 0.509 | qa_passed |
| Ruth Bader Ginsburg | ~22 | 22 | 22 | 0.653 | 0.516 | qa_passed |
| Nina Simone | ~22 | 22 | 22 | 0.655 | 0.505 | qa_passed |
| Marlene Dietrich | ~22 | 22 | 22 | 0.650 | 0.500 | qa_passed |
| Agatha Christie | ~22 | 22 | 22 | 0.654 | 0.466 | **held** |
| Catherine the Great | ~22 | 22 | 22 | 0.655 | 0.536 | qa_passed |
| Frederick the Great | ~22 | 22 | 22 | 0.654 | 0.531 | qa_passed |
| Thomas Jefferson | ~22 | 22 | 22 | 0.650 | 0.489 | **held** |
| Ulysses S. Grant | ~22 | 22 | 22 | 0.648 | 0.488 | **held** |
| James Joyce | ~22 | 22 | 22 | 0.653 | 0.514 | qa_passed |
| Miles Davis | ~22 | 22 | 22 | 0.657 | 0.531 | qa_passed |
| Henry Ford | ~22 | 22 | 22 | 0.661 | 0.493 | **held** |

**How many `STRONG_22_CAPABLE` actually scored >=22: 12 of 12 (100%)** —
the attribute-count preflight prediction was perfect again, consistent
with roster-14. **qa_pass rate: 8/12 (66.7%)** — lower than roster-14's
91.7%, but still far above roster-12/13's combined 6.1%. **All 4 misses
failed solely on the high-confidence-count sub-gate** (need 12 attributes
at confidence ≥0.5; Agatha Christie had 8, Thomas Jefferson 9, Ulysses S.
Grant 9, Henry Ford 11 — Ford missed by exactly one), never on coverage
(all four ≥0.648) or scored-attribute count (all four at 22). This is a
materially different miss pattern from Queen Victoria's roster-14 case and
from roster-12/13's coverage-floor misses: it reflects that these four
candidates' evidence, while broad enough in *topic* coverage, skewed
toward `inference`/`strong_inference` on individual rows more than the
other 8 — a confidence-distribution question the attribute-count preflight
does not and was never designed to predict (this was flagged explicitly in
the roster-14 checkpoint's own preflight-accuracy write-up). **Preflight
false-positive rate: 4/12 (33.3%)** on the "will this reach qa_passed"
question specifically, though 0% on the "will this reach 22 attributes"
question the preflight actually targets.

## 5. Validator and integrity results

- `validateCandidates.ts`: 0 errors, 0 warnings across the full 239-file
  corpus (227 pre-existing + 12 new). `qa_passed` 82, `held` 157.
- `checkScoringLockIntegrity.ts`: 227 previously-committed candidate files
  checked against HEAD, 0 flagged.
- No data-entry corrections were needed this cycle before finalizing — the
  `impactDomains`/`impact` value mistakes found and fixed during roster-14
  did not recur (both were checked for explicitly while drafting).

## 6. Newly `qa_passed` (8) — all product-ready, all promoted

Every one of the 8 cleared full product-readiness preflight: real
rights-clear portrait (verified live against Wikimedia Commons or
government-archive license metadata), full EN/KO editorial content,
Korean display name, working `/people/<slug>` route in both locales, no
unresolved blocker. **None excluded — zero product-blocked `qa_passed`
this cycle**, despite four of the eight (Maya Angelou, Miles Davis, Nina
Simone, Marlene Dietrich) being recent-enough deaths that portrait rights
were a genuine, non-trivial risk (the same category of risk that has
parked Che Guevara since roster-12).

### Portraits (all Public Domain or CC0, verified live via Commons API before download)

| Person | Source | Attribution | Kind |
|---|---|---|---|
| Catherine the Great | Commons | Dmitry Levitzky, c. 1780 | (painting, lifetime — confirmed via Commons dating against her 1729-1796 lifespan) |
| Frederick the Great | Commons | Anton Graff, 1781 or 1786 | (painting, lifetime) |
| James Joyce | Commons | Man Ray, 1922 (Shadowland magazine) | (photograph, lifetime) |
| Marlene Dietrich | Commons (Library of Congress) | Charles Ray, U.S. Army Signal Corps, War Department | (photograph — U.S. federal government work, lifetime) |
| Maya Angelou | Commons (DPLA / Clinton Presidential Library) | 1993 inauguration, U.S. federal government work | (photograph, lifetime) |
| Miles Davis | Commons (Nationaal Archief / Anefo) | Anefo, 15 July 1984 | (photograph, lifetime, CC0) |
| Nina Simone | Commons (Nationaal Archief / Anefo) | Jack de Nijs / Anefo | (photograph, lifetime, CC0) |
| Ruth Bader Ginsburg | Commons (Collection of the Supreme Court of the United States) | Official SCOTUS portrait, U.S. federal government work | (photograph, lifetime) |

Two portrait-sourcing strategies proved decisive for the recent-death,
highest-risk cases: **government/institutional-archive works** (U.S.
federal works — Signal Corps, presidential library, SCOTUS — carry no
copyright regardless of date) and **Dutch Nationaal Archief/Anefo CC0
photographs** (the same rights basis already used for Miriam Makeba's
portrait in this project). Both are documented, repeatable sourcing paths
worth checking first for any future recent-death candidate before
concluding a portrait is blocked. All 8 downloaded from their verified
Commons URL, resized to a 1600px longest-side ceiling (no upscale) with
Pillow-equivalent recompression, hosted locally under `public/portraits/`.

### Editorial content

116/116 people now have editorial content (was 108 pre-cycle). Full EN +
KO for all 8: 2 achievements, 2 moments (>=1 with a tied trait
interpretation), 1 turning point (with interpretation). Miles Davis's
documented domestic violence toward his first wife and Henry-Ford-adjacent
material (not promoted, held) were the two most ethically weighty
evidence items handled this cycle; Miles Davis's is scored directly in
`collaboration` (low, risk impact) and referenced factually in his
turning-point editorial text, per CLAUDE.md's instruction never to rig
results to flatter. No banned diagnostic-language patterns present
(`editorialValidation.ts` checked clean).

### Korean display names

Added `person.name.{slug}` for all 8 to `ko.ts`. i18n audit: 0 missing
keys, 100% coverage maintained.

## 7. Held candidates — not promoted, not rescued

- **Agatha Christie**: 22 attributes, coverage 0.654, only 8/22 at
  confidence ≥0.5 (need 12).
- **Thomas Jefferson**: 22 attributes, coverage 0.650, only 9/22 at
  confidence ≥0.5. Scoring for this profile deliberately included his
  documented, DNA-and-documentary-confirmed relationship with Sally
  Hemings and his sustained enslavement of over 600 people despite his own
  written condemnation of slavery — scored low/dual-edged on
  `belief_updating` and `resourcefulness` rather than omitted, per
  CLAUDE.md's instruction never to rig results to flatter.
- **Ulysses S. Grant**: 22 attributes, coverage 0.648, only 9/22 at
  confidence ≥0.5.
- **Henry Ford**: 22 attributes, coverage 0.661, 11/22 at confidence ≥0.5
  (missed by exactly one). Scoring deliberately included his documented,
  extensively researched (Baldwin, 2001) Dearborn Independent antisemitic
  publishing campaign, scored directly in `impact_motivation`
  (dual-edged), `conflict_tolerance`, and `belief_updating` (low) rather
  than sanitized.

All four candidates' JSON, evidence, and lifecycle are untouched after
these determinations — no confidence raised, no rows added, per the
confidence-change policy.

## 8. Roster15 allowlist

`src/dev/roster1000/generateRoster15.ts` — explicit 8-slug allowlist (no
dynamic `qa_passed` filter, no wildcard): `catherine-the-great`,
`frederick-the-great`, `james-joyce`, `marlene-dietrich`, `maya-angelou`,
`miles-davis`, `nina-simone`, `ruth-bader-ginsburg`. Output written to
`src/data/people/roster15.ts`, wired into `SEED_PEOPLE` via `seed.ts`.

## 9. Internal vs. visible counts

- **Internal roster (`SEED_PEOPLE`/`peopleIndex.generated.ts`): 108 -> 116.**
- **People Directory default (match-eligible-only) view: 107 -> 115** — all
  8 new people are match-eligible; Zheng He remains the sole excluded
  person, unchanged, verified live in-browser.
- **Target: 125. Remaining gap: 9** (was 17 before this cycle). 8 promoted
  this cycle did not exceed the 17-slot ceiling, so no capping logic was
  needed (Part N).

## 10. Full validation gate

- `validateCandidates.ts`: 0 errors, 0 warnings.
- `checkScoringLockIntegrity.ts`: 0 flagged.
- `tsc --noEmit`: clean.
- `vitest run`: **689/689** passed (unchanged file count).
- `generatePeopleIndex.ts`: 116 entries written.
- `calibrate.ts quiz` (run twice): anchors drift negligible (largest delta
  ~0.003 in the 0.37-0.62 raw-score range) — `CALIBRATION_VERSION`
  correctly left unbumped.
- `simulate.ts 10000 quiz`: max #1-match frequency 10.7% (Warren Buffett),
  well under the 20%-at-n>=30 domination threshold. Catherine the Great
  appears in the top-15 list at ~2.0%, not a concern.
- `sensitivity.ts seeds 10000`: stable across 5 independent seed offsets,
  max-#1-frequency mean 10.1% (sd 0.4%, range 9.5-10.7%). No run exceeds
  the 20% alarm threshold.
- `i18n-audit.ts`: 0 missing Korean keys, 100% coverage.
- `editorialCoverageAudit.ts`: 116/116 people with editorial content.
- `next build --webpack`: clean, 256 static pages (116 people x 2 locales
  + other routes).
- Full Playwright suite (`--workers=1`): **310/310 passed** after fixing
  three objectively-stale hardcoded roster-count fixtures (see below).
- Live browser verification (EN + KO) for all 8 promotees: directory card,
  portrait, route, detail page, editorial content, no raw i18n keys, no
  broken images. Confirmed Agatha Christie and Henry Ford correctly 404
  (held, not live); confirmed Queen Victoria and Che Guevara remain absent
  from production.

### Stale test fixtures fixed (mechanical count updates, not behavior changes)

- `e2e/peopleDirectory.spec.ts` (ko-KR cross-facet AND test): "전체 108명 중
  5명" -> "전체 116명 중 5명" — none of the 8 new people satisfy the
  curiosity+collaboration filter combination, so the filtered count of 5
  is unchanged, only the total.
- `e2e/miriamMakebaProfileFix.spec.ts`: "107 people" -> "115 people".
- `e2e/roster12MarcusAurelius.spec.ts`: "107 people" -> "115 people".

No calibration, matching, scoring, or eligibility-formula code was changed
to produce these updates.

## 11. What this cycle changed vs. did not change

Changed: 12 new candidate JSON files (8 `qa_passed`, 4 `held`),
`roster15.ts`, `seed.ts`'s composition, `peopleIndex.generated.ts`,
`editorial.ts` (both files), `ko.ts` (8 display names), 8 new portrait
assets under `public/portraits/`, `generateRoster15.ts`, three Playwright
count fixtures, this checkpoint, `docs/checkpoints/roster.md`,
`docs/context/CURRENT_STATE.md`.

Not changed: `eligibility_v2`'s thresholds or formula, `matching_v2`,
`ATTRIBUTES[*].baseWeight`, any of the 227 previously-committed candidate
files' scores/confidence/lifecycle, any previously-promoted person's trait
data, Che Guevara's parked portrait-blocked state (not reopened, not
touched, per instruction).

## 12. Remaining gap to 125

116 of 125 (92.8%). 9 remaining. Agatha Christie, Thomas Jefferson,
Ulysses S. Grant, and Henry Ford stay `held` for a future cycle — all four
have genuinely broad (22-attribute) evidence packs and would be strong
candidates for a confidence-deepening pass (re-examining specific rows for
additional corroborating sources) rather than fresh research, should a
future session choose to pursue that. Andrew Jackson, Salvador Dalí,
Nellie Bly (this cycle's newly-discovered but unfrozen names) plus the 12
remaining unfrozen names from roster-14's original pool (John Adams,
Abigail Adams, Elizabeth Cady Stanton, Harriet Beecher Stowe, F. Scott
Fitzgerald, Zelda Fitzgerald, George Orwell, Bertrand Russell, Charles
Dickens, Giuseppe Garibaldi, Carl Jung, Charlie Chaplin, Harry Houdini,
Eva Perón, T. E. Lawrence, Qiu Jin, Édith Piaf, Duke Ellington, John D.
Rockefeller) remain a starting point for roster-16's discovery pool,
subject to a fresh preflight pass at that time.
