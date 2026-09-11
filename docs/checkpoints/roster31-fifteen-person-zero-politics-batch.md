# Roster-31: Fourteen-Person Zero-Politics Production Batch

Base: `origin/main` at `e41f07bec990eedc626850a92e4c2856d7fb5d42` (the
interest-area-matching/Landing-copy PR's merge commit). Same throughput-
cycle discipline as Roster25-30: select from the existing
`data-pipeline/candidates/*.json` held pool only, audit with existing
evidence only, one consolidated commit, one PR. Continues Roster30's
constraint: **zero people whose primary historical significance is
political leadership, state rule, military command, or political/civil-
rights activism**.

Filename says "fifteen-person" because that was the frozen target and the
first fully-built, fully-tested state of this batch; **fourteen shipped**
after Booker T. Washington was reverted to `held` late in the cycle (see
"A precedent conflict, caught and corrected" below) — the same pattern
Roster30's own filename preserves despite shipping nineteen, not twenty.

## Held-pool inventory

277 total candidate files: 93 `qa_passed`, 91 `evidence_approved` (90 after
this cycle's Washington reversion), 93 `held` before this cycle (94 after).
Excluding the 22 Group-B evidence-integrity exclusions (mechanically
reconstructed from the `SS76`-tagged files plus the five explicitly-named
additions — John von Neumann, Marco Polo, Sun Tzu, Sitting Bull, Rigoberta
Menchú — cross-checked to exactly 22, matching every prior cycle's count)
and every candidate whose evidence richness falls below a defensible
publication floor, the practical non-political, adequately-evidenced pool
was narrow: only a handful of `held` candidates clear roughly the same
row-richness tier this project's prior evidence-approved publications sit
at (Chekhov's 14 rows, Roster24, remains the lowest prior precedent).

## Zero-politics hard gate

Applied before freezing. Candidates whose `occupationIds`/`tagIds` include
`activist`/`political_activist`/`politician`-adjacent values, or whose
scored rows are substantially built from political/activist episodes, were
excluded regardless of evidence richness:

- **Emmeline Pankhurst** (19 rows), **W. E. B. Du Bois** (18 rows),
  **Shirin Ebadi** (15 rows) — civil-rights/suffrage/human-rights activism
  is each one's primary fame; excluded outright.
- **Jane Addams** (18 rows) — occupationId `activist`; her highest-scored
  rows (WILPF founding/chairing, NAACP/ACLU co-founding, anti-war
  advocacy) are substantially political-organization leadership, not
  Hull House social work alone. Excluded.
- **Kartini** (18 rows) and **Edward Said** (18 rows) — genuinely
  ambiguous (Kartini: women's-education writer vs. `activist`
  occupationId/`civil_rights` field; Said: literary critic vs. rows
  substantially built from his PLO-era political commentary). Per the
  "if ambiguous, choose someone else" instruction, both excluded rather
  than adjudicated on a close call.
- **Taha Hussein** (10 rows) — occupationIds are `writer`/`scholar`, and
  his scored rows are about his blindness/self-education and the 1926
  *On Pre-Islamic Poetry* controversy; his 1950-52 ministerial post
  appears in exactly one row (`impact_motivation`) as a policy stance
  matching his own separately-published writing theme, not as the basis
  of his fame. Judged incidental, matching this cycle's own "novelist who
  happened to hold office" allowed example. **Included.**

### A precedent conflict, caught and corrected

**Booker T. Washington** (18 rows, occupationId `educator`) was initially
frozen and promoted to `evidence_approved` on this session's own read of
the zero-politics test: founding/running Tuskegee Institute read as
non-political, with the 1895 Atlanta Compromise speech treated as
incidental. While writing this checkpoint doc, cross-checking against
`docs/checkpoints/roster30-twenty-person-zero-politics-batch.md` found that
**Roster30's own zero-politics audit had already considered and excluded
this exact candidate**, for exactly the reason this cycle initially
overrode: "his primary historical significance (the Atlanta Compromise, the
rivalry with Du Bois over racial-uplift strategy) is substantially about
ideological movement leadership under Jim Crow, not merely running Tuskegee
Institute." Faced with a direct precedent conflict on the identical
candidate, this cycle deferred to the existing, already-documented
determination rather than re-litigate it: **Washington's candidate file was
reverted to `held`** (not `rejected` — his evidence is genuinely
publication-ready; the portrait already sourced (Library of Congress/Harris
& Ewing, no known restrictions) and Korean localization already resolved
remain usable for a future cycle without this batch's zero-politics
constraint), and every downstream artifact (generator allowlist, roster
file, seed wiring, people index, editorial content, i18n additions, test
allowlists/counts, the Playwright spec) was corrected before this PR was
opened — this was caught during documentation, before merge, not after.

Required count: **Roster31 political/state/military/activist-primary
count: 0/14.**

## Frozen 14

Ranked by (1) existing evidence/publication viability, (2) broad public
recognizability, (3) interest-area category value, (4) domain diversity,
(5) geographic/cultural diversity. All fourteen were `held` purely on
`eligibility_v2` numeric floors.

| Slug | Domain | Interest-area category | Region | Era | Rows |
|---|---|---|---|---|---|
| linus-pauling | Chemistry | Science & Knowledge | North America | 20th c. | 14 |
| robert-falcon-scott | Exploration | Building & Discovery | Western Europe | 19th c. | 14 |
| luis-alvarez | Physics | Science & Knowledge | North America | 20th c. | 13 |
| ahmed-zewail | Chemistry/Physics | Science & Knowledge | North Africa | Contemporary | 12 |
| gregor-mendel | Biology/Genetics | *(unmapped — see below)* | Central Europe | 19th c. | 12 |
| emilio-segre | Physics | Science & Knowledge | North America | 20th c. | 11 |
| taha-hussein | Literature | Arts & Culture / Leadership & Society | North Africa | 20th c. | 10 |
| sofia-kovalevskaya | Mathematics | Science & Knowledge | Central Europe | 19th c. | 10 |
| maria-goeppert-mayer | Physics | Science & Knowledge | North America | 20th c. | 10 |
| enrico-fermi | Physics | Science & Knowledge | Southern Europe | 20th c. | 10 |
| michael-faraday | Physics/Chemistry | Science & Knowledge | Western Europe | 19th c. | 9 |
| homi-bhabha | Physics | Science & Knowledge | South Asia | 20th c. | 9 |
| rosalyn-yalow | Medical Physics | Science & Knowledge | North America | 20th c. | 9 |
| dorothy-hodgkin | Chemistry | *(unmapped — see below)* | Western Europe | 20th c. | 9 |

### Product-balanced selection: an honest miss on the soft targets

Section 4's soft targets (≥4 Building & Discovery, ≥3 Arts & Culture, ≥3
Science & Knowledge) were **not** met for the first two: this batch has
**1** Building & Discovery pick (Scott) and **1** Arts & Culture pick
(Hussein), against **12 of 14** landing in Science & Knowledge. This is a
mechanically-verified fact about which non-political `held` candidates
currently clear a defensible evidence-richness floor (roughly Chekhov's
14-row precedent and above, down to the 9-row floor used here) — not a
selection preference. A systematic sweep of every non-political, non-
Group-B `held` candidate (86 candidates) by row count found: two 18-19-row
candidates excluded for political ambiguity (Pankhurst, Du Bois, Ebadi,
Addams above); a thick cluster of 9-14-row physicists/chemists/
mathematicians sourced from National Academy of Sciences biographical
memoirs (an unusually rich, consistently-available secondary-source genre
for 20th-century American-based scientists specifically); and a sharp drop
straight to 5-7-row candidates in sport (Pelé, 3 rows), visual art
(Fahrelnissa Zeid, 5 rows), and literature (Virginia Woolf, Matsuo Basho, 6
rows each) — all judged too thin to promote without new research, which
this cycle's brief forbids. Science/medicine is itself one of the
explicitly encouraged domains (Section 4's own list), so the fourteen
frozen were not artificially capped to force a balance the pool doesn't
support; the shortfall against the other two soft targets is reported
honestly rather than papered over with thinner or politically-ambiguous
substitutes.

### A taxonomy gap surfaced, and a narrow fix

`PROFESSION_CATEGORIES` (`src/core/people/directoryTaxonomy.ts`) groups
`fieldIds` into the four interest-area categories; `science_knowledge`'s
list did not include `chemistry` or `biology` (both already used by
exactly one pre-existing production person each, below the module's own
`>=2-person` curation floor). This batch's four chemists (Zewail, Faraday,
Dorothy Hodgkin — via `chemistry`) and one biologist (Mendel — via
`biology`) push both past that floor (`chemistry`: 4, `biology`: 2) —
mirroring the exact precedent Roster27/28/29 established for `field.
architecture`/`field.diplomacy`/`field.religion`/`field.dance`/`field.
journalism` crossing the same threshold. Added `chemistry`/`biology` to
`science_knowledge`'s `fieldIds` plus `field.chemistry`/`field.biology`
EN/KO translations — a narrow, precedented taxonomy/i18n fix, not a new
taxonomy or a UI redesign. Zewail and Faraday already map to
`science_knowledge` via their own `physics` fieldId regardless; Mendel and
Dorothy Hodgkin are the two people this fix actually newly categorizes.

## Pre-promotion attribution gate (Section 6)

All fourteen are 19th-20th-century or contemporary figures, sourced from
first-person autobiographies/journals, National Academy of Sciences
biographical memoirs, Nobel Foundation materials, institutional records,
and contemporary press — none rest on anonymous/collective corpus
attribution, later legend, or disputed authorship the way ancient/medieval
candidates (Hippocrates, Euclid, Al-Farabi, Chanakya) genuinely risk. This
sidesteps the Hippocrates-style attribution problem entirely; no candidate
required a hold decision on these grounds.

## Row audit and factual exactness gate (Sections 7-8, 19)

A systematic trigger-word sweep (first/only/founded/founder/invented/
created/discovered/record/award/Nobel/at age/because/therefore/
independently/personally/employees/agents/killed/died/diagnosed/confirmed)
across all fourteen candidates' rationale/notes text, with every hit
checked against its cited source (not just the rationale's own wording),
found **four rows across two candidates** needing narrowing —
all `ERROR_CORRECTION`, none touching score/confidence/evidenceType/impact:

- **Michael Faraday**, `impact_motivation` row: "19 Christmas Lectures, the
  most given by any single individual" — the Royal Institution's own
  Faraday biography page confirms he *founded* the Christmas Lectures and
  delivered many himself, but neither it nor the Wikipedia Christmas
  Lectures article confirms the specific "19"/"most by any individual"
  superlative. Narrowed to the well-documented founding + sustained,
  repeated delivery, dropping the unverified count and superlative.
- **Ahmed Zewail**, `risk_tolerance` row: "$80 million... a 1-billion-
  Egyptian-pound loan specifically from Egypt's Ministry of Defense" —
  could not be confirmed against available sources (the actually-cited
  *Science*, 2016 article was not independently re-locatable this
  session); Wikipedia's own Zewail City article instead documents a
  100-million-Egyptian-pound Samih Sawiris gift (2015). Narrowed to the
  well-documented mixed private/state funding structure, dropping the
  unverified specific figures and the Ministry of Defense attribution.
- **Ahmed Zewail**, `leadership_drive` row: "first-ever named Linus
  Pauling Chair of **Chemistry**" and "first US Science Envoy to the
  Middle East" — Wikipedia confirms he was the first Caltech faculty
  member named to the chair, but its actual name is Linus Pauling Chair
  of **Chemical Physics**; separately, Wikipedia's own account of the 2009
  Science Envoy program names Zewail, Elias Zerhouni, and Bruce Alberts as
  simultaneously appointed "first US science envoys **to the Muslim
  world**" (January 2010) — three people, not Zewail alone, and "Muslim
  world" rather than "the Middle East." Corrected the chair's exact name
  and narrowed to "one of the first three," naming the other two envoys.

Two claims were specifically checked and found accurate, requiring no
change: Linus Pauling's "only person to receive two unshared Nobel
Prizes" (Wikipedia's own infobox and body text confirm this in the exact
"unshared" framing) and Rosalyn Yalow's "first female physics graduate
student [at the University of Illinois] in nearly 40 years" (a near-
verbatim match to the actually-cited PMC source's own wording — a separate
Wikipedia framing about the wider College of Engineering "since 1917" is a
different, compatible fact, not a contradiction).

One mechanical classification-metadata fix, unrelated to scoring: Rosalyn
Yalow's `src_ry_pmc_madame_curie` source had `"kind": "journal_article"`,
not a valid `PersonSource.kind` value (the real enum has no such value) —
corrected to `"press"`, matching the source's actual character (an
NIH/PMC-hosted tribute/obituary article). Caught by `tsc`, not the
candidate validator (which does not check `sources[].kind` against the
live type).

## Publication vs. matching (Section 9)

All fourteen promoted via `preparePersonSeedForPromotion()` (never
`toPersonSeed()` directly), which fails closed on `checkPromotionReadiness()`
and never reads `computedEligibility.eligible`. `directoryVisible: true` by
default for all fourteen. `eligibility_v2` and its thresholds are
byte-unchanged.

## Portraits (Section 10)

Portrait research was the only new external research this cycle, exactly
as scoped. All fourteen needed portrait resolution (three had been
explicitly `held` for portrait rights concerns — Zewail, Homi Bhabha, Taha
Hussein; the rest had no prior portrait record at all, which
`checkPromotionReadiness()` treats identically to a rights concern: it
requires `portrait.status === "found"` before promotion). All fourteen
resolved to real, rights-clear photographic likenesses (`kind: "likeness"`
throughout — no `historical_depiction`/`editorial_nonlikeness` needed,
since all fourteen postdate photography):

| Slug | Source | License |
|---|---|---|
| linus-pauling | Landesarchiv Baden-Württemberg (Sammlung Willy Pragher), 1977 | CC BY 3.0 DE |
| robert-falcon-scott | Library of Congress (Bain News Service), 1900 | No known restrictions (LOC) |
| luis-alvarez | US National Archives / LBNL / DOE, 1969 | Public Domain (US federal work) |
| ahmed-zewail | Simon Fraser University Communications (via Flickr), 2010 | CC BY 2.0 |
| gregor-mendel | Wikimedia Commons, c. 1862, unknown photographer | PD-US (pre-1931) |
| emilio-segre | Nobel Foundation, 1959 | PD-Sweden |
| taha-hussein | Al-Ahram archive (Egypt), via Wikimedia Commons | PD-Egypt |
| sofia-kovalevskaya | Wikimedia Commons, 1888, unknown photographer | PD (life+70) |
| maria-goeppert-mayer | Nobel Foundation, 1963 | PD-Sweden |
| michael-faraday | Wikimedia Commons, c. 1850s, unknown photographer | PD-UK-unknown |
| homi-bhabha | Oberwolfach Photo Collection (Konrad Jacobs), VRTS-confirmed | CC BY-SA 2.0 DE |
| rosalyn-yalow | United States Information Agency, 1977-10-13 | Public Domain (US federal work) |
| enrico-fermi | US National Archives and Records Administration, c. 1943-49 | Public Domain (US federal work) |
| dorothy-hodgkin | Landesarchiv Baden-Württemberg (Sammlung Willy Pragher), 1970 | CC BY 4.0 |

Every license page was actually opened and read (not assumed from a
thumbnail caption); a rejected candidate (Taha Hussein's top Commons hit,
a 2014 artist's *drawing* of him labeled "من رسم عصام عزوز" — "drawn by
Essam Azouz" — self-published under CC BY-SA 4.0) was passed over in favor
of an actual lifetime photograph despite the drawing's higher resolution
and cleaner license, since he was extensively photographed in life and a
modern illustration is not a likeness. (Booker T. Washington's portrait —
Library of Congress/Harris & Ewing, c. 1905-1915, no known restrictions —
remains resolved on his candidate file for a future cycle, per the
correction above.)

## Editorial (Section 11)

Full EN + KO editorial content (2 achievements + 2 moments each, moments
carrying an `interpretationKey` tied to a real scored `attributeId`) for
all fourteen, drawn only from facts already present in each candidate's
audited rows — no new behavioral claims. `editorialCoverageAudit.ts`:
218/218 people have editorial content, 100.0% Korean coverage across 2072
distinct EN/KO key pairs project-wide.

## Provenance status cleanup (Section 12)

Not applicable in the usual sense (no promoted Roster31 candidate had a
stale "held" note surviving from an earlier cycle) — the relevant
provenance correction this cycle is Booker T. Washington's own file, which
now explicitly documents both the initial promotion and its reversion (see
above) rather than silently reverting without a trace.

## Generator / derived data (Section 13)

`src/dev/roster1000/generateRoster31.ts`, modeled exactly on
`generateRoster30.ts`: explicit frozen 14-slug allowlist, `evidence_approved`/
`qa_passed` filter, `checkPromotionReadiness()` fail-closed, never reads
`computedEligibility.eligible`. `src/data/people/roster31.ts` generated
(14 people), wired into `seed.ts`'s `ALL_ROSTERS`, `peopleIndex.generated.ts`
regenerated (218 entries). Candidate → roster31 → SEED_PEOPLE consistency
mechanically verified: 0 duplicate slugs/ids/Wikidata QIDs across all 218
production people.

## Match eligibility (Section 14)

Evaluated honestly after final candidate data was frozen: **all fourteen
fail `eligibility_v2`** (each already known from its own `held` numeric
snapshot; none re-scored or rescued). Zero newly match-eligible people, so
per Section 14's own rule: `dispersion.generated.ts` was **not**
regenerated, calibration was **not** re-evaluated, and matching-health was
**not** re-run. Match-eligible set unchanged at exactly 127 (verified: the
127 match-eligible people are byte-identical to before this cycle).

## Interest-area product sanity (Section 15)

| Category | Before | After |
|---|---|---|
| science_knowledge | 53 | 53 |
| arts_culture | 49 | 49 |
| leadership_society | 44 | 44 |
| building_discovery | 19 | 19 |

Unchanged, because none of the fourteen are match-eligible — the
interest-area quiz feature (which walks `results.ranked`, i.e.
match-eligible people only) cannot surface any of them regardless of
category. All fourteen do work normally in the Directory as ordinary,
non-match-eligible, directory-visible profiles, matching every prior
evidence-approved-publication cycle's behavior.

## Tests (Section 16)

One table-driven spec, `e2e/roster31FifteenPersonZeroPoliticsBatch.spec.ts`
(mirroring `roster30TwentyPersonZeroPoliticsBatch.spec.ts`'s structure):
directory-card presence, name search (with `searchTerm` overrides for
`Emilio Segrè`'s accent), portrait+attribution, EN/KO editorial rendering
with correct display names, Compare-route honest state, and the
non-match-eligible CTA note — 7 tests × 14 people plus one aggregate
"exactly 217 people" check = **99 tests, all passing**.

Updated only genuinely-affected existing tests: `peopleDirectory.spec.ts`'s
`204→218`-person filtered-count assertion (with the exact per-candidate
z-score check for why none of the fourteen enter that specific filtered
set); `profilePublicationSeparation.test.ts`'s and `matching.test.ts`'s
`204→218`/`203→217` production/directory-visible counts and
`KNOWN_DIVERGENT_SLUGS`/`knownNonEligible` allowlists (fourteen slugs
added); `session17Isolation.test.ts`'s Enrico Fermi frozen-state assertion
(status `held`→`evidence_approved`, exactly matching the precedent
Roster27 already set for Jorge Luis Borges in the same file — row
count/scores, the actual frozen evidence being guarded, unchanged).

**Also fixed, though not caused by this batch**: `roster30Twenty
PersonZeroPoliticsBatch.spec.ts`'s own "203 people" snapshot assertion,
which this batch's addition mechanically invalidates regardless of content
(now 217) — a directory-visible-count assertion "genuinely affected" by
this cycle's own change, per the task's explicit update criteria.
**Left alone, flagged but not fixed** (pre-existing, not caused by this
batch): `roster29FifteenPersonFastBatch.spec.ts`'s own "184 people"
assertion has been stale since Roster30 merged (184 was correct only
between Roster29 and Roster30's own merges) — this is Roster30's
regression against Roster29's spec, not Roster31's against anything;
fixing it is a separate, pre-existing cleanup outside this batch's scope.

The interest-area matching feature itself (quiz scope selector, Results
scope switcher, `interestScope.ts`) was not touched, and no test for it
was added or modified — no roster change here mechanically exposed a real
category-count or test expectation for that feature, since none of the
fourteen are match-eligible.

## Validation (Section 17)

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: 0 errors, 0 warnings across all 277 candidate
  files (status breakdown after this cycle: 93 `qa_passed`, 90
  `evidence_approved`, 94 `held`).
- `checkScoringLockIntegrity.ts`: 0 flagged across 277 previously-committed
  candidate files.
- Full `vitest run`: **54/54 files, 750/750 tests passing** (no test
  skipped or deleted to make this pass).
- `i18n-audit.ts`: 100.00% Korean coverage, 0 missing keys (1062 EN keys).
- `editorialCoverageAudit.ts`: 218/218 people have editorial content,
  100.0% Korean editorial coverage.
- `next build --webpack`: clean, 460/460 static pages (432 + 2×14).
- Focused Playwright (`roster31FifteenPersonZeroPoliticsBatch.spec.ts`):
  **99/99 passing**. Re-ran the directly-affected shared specs
  (`peopleDirectory.spec.ts`, `roster30TwentyPersonZeroPoliticsBatch.spec.ts`)
  after each fix: **265/265 passing** combined with this batch's own spec.
- Not rerun: full matching-simulation/dispersion/calibration validators —
  correctly skipped per Section 14, since zero newly match-eligible people
  resulted from this cycle.

## Manual verification (Section 18)

Representative spot-check via a live `next dev` build, not the full
fourteen: Enrico Fermi (globally recognizable, EN) — portrait, traits,
achievements/moments with interpretation-to-trait-chip linking, honest
non-match-eligible note, full source list all rendered correctly. Taha
Hussein (Arts & Culture, ko-KR) — Korean name, category tags, portrait
attribution (PD-Egypt), achievement/moment text, and interpretation-to-
trait linking all rendered correctly in Korean. Gregor Mendel (Science,
mobile 375px) — portrait with corrected "Unknown photographer, c. 1862"
attribution, traits, and achievements rendered cleanly with no horizontal
overflow. Directory default view at 375px: "218 people" (pre-Washington-
correction number, since this check preceded that fix) rendered with no
layout breakage; the profession-filter accordion structure was confirmed
functional (a click landed on a person card rather than the accordion
during this pass, not re-attempted given the mechanical
`directoryTaxonomy.test.ts` pass already verifies the chemistry/biology
addition is correctly wired).

## Final diff (Section 20)

Confirmed absent from the diff: interest-area matching implementation,
Landing product copy, quiz token/scope behavior, `next-env.d.ts` (an
auto-regenerated diff from running `next dev` was caught and reverted
before staging), `.env.local`, analytics, monetization, candidate files
outside the frozen fourteen (plus Washington's own revert), `eligibility_v2`,
the matching formula, calibration, `dispersion.generated.ts` (zero
newly-eligible, so correctly untouched), and Roster32. 45 files changed,
728 net insertions after Washington's reversion undid roughly half of his
own original addition (2750 insertions(+), 120 deletions(-) gross).

## Commit + PR (Section 22)

One consolidated commit, pushed once, one PR opened against `main`. **Not
merged**, per explicit instruction. Roster32 not started.
