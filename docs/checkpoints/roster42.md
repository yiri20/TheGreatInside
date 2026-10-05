# Roster42: seventh fresh cycle after the matching diagnostic (2026-10-05)

First cycle run under the **Major Achievement Selection Standard**
(`docs/editorial-content.md`, merged with PR #53).

Base SHA: `37371d64cb3fde7807a02820e6a355886856fd84` (`ROSTER42_BASE_SHA`,
the merge commit of PR #53, exactly two parents: `9b4ad1bf...` [prior main,
Roster41 merge] and `0b1ee39f...` [editorial-audit head]). PR #53 was merged
with a normal merge commit, head-guarded on `0b1ee39fab7ff3b1fcdaf352663d74036f072da7`
(OPEN, non-draft, CLEAN, Vercel SUCCESS on that head; branch kept).
Starting state, mechanically verified: production 350, directory-visible
349, match-eligible 114, candidate JSON 415, legacy baseline 22 / 0 flagged.
Classification carried forward: **CONTINUE_EXPANSION_AS_IS** — no
architecture, eligibility or matching change, no repeated diagnostic.

## Selection: 15 frozen, 14 shipped, 1 held, 0 backlog reuse

One mechanical backlog inventory: 87 non-production candidate files (4
`evidence_approved`: Hillary, Uemura, Roddick, Shannon; 83 `held`). No
concrete new signal for Uemura / Roddick / Shannon (portrait), Hillary
(region taxonomy: still no Oceania bucket), Beauvoir / Sinan (evidence
quality) — none retried; all 15 fresh. Two obvious candidates (Don Bradman,
Douglas Mawson) were dropped before freezing because Australia would hit the
same missing-Oceania region gap; Pickford (Canadian) and Henson were chosen
instead. Pre-freeze: no slug/live-QID collision, zero-politics primary
identity, portrait preflight (Wikidata P18 + Commons licence read), plausible
independent non-self behavioural sources.

| Slug | fieldIds (final) | Category (by fieldIds) | Tier | QID | Outcome |
|---|---|---|---|---|---|
| george-stephenson | engineering, technology | building + science | field-famous | Q133614 | shipped |
| george-westinghouse | business, technology, engineering | building + science | field-famous | Q262367 | shipped |
| emil-zatopek | sport | building | field-famous | Q52589 | shipped |
| juan-manuel-fangio | sport | building | international | Q2069 | shipped |
| matthew-henson | exploration | building | long-tail | Q976683 | shipped |
| mary-pickford | film, business | arts + building | international | Q104109 | shipped |
| johannes-brahms | music | arts | international | Q7294 | shipped |
| pyotr-ilyich-tchaikovsky | music | arts | international | Q7315 | shipped |
| gustav-klimt | art | arts | international | Q34661 | shipped |
| katsushika-hokusai | art | arts | international | Q5586 | shipped |
| beatrix-potter | literature, art, environmental_science | arts | international | Q214565 | **held** (portrait) |
| edwin-hubble | natural_science, physics | science | international | Q43027 | shipped |
| blaise-pascal | mathematics, physics, philosophy | science | international | Q1290 | shipped |
| ignaz-semmelweis | medicine | science | field-famous | Q59736 | shipped |
| alfred-wegener | natural_science, exploration | science + building | field-famous | Q76323 | shipped |

Frozen mix: **9 international / 5 field-famous / 1 long-tail**; shipped
8 / 5 / 1. By field membership (frozen): building_discovery 7, arts_culture
6, science_knowledge 6; shipped: 7 / 5 / 6 (multi-category people count in
each, so the 6/5/4 targets cannot be met exactly with 15 mostly
multi-field people). Two women (Pickford, Potter). All deceased. Zero-
politics: Zátopek's 1968 stance and Fangio's 1958 Havana kidnapping are
incidental and unscored. No new taxonomy vocabulary (no `physician`-
subtype, `meteorologist`, `pianist`/`conductor`, `illustrator` ids exist;
nearest existing ids used).

## Held: 1

| Slug | Blocker | Reusable work | Next step |
|---|---|---|---|
| beatrix-potter | No rights-clear, adequately sized portrait: the Wikidata P18 King 1913 photo is NPG-hosted and its Commons page carries a third-party copyright-claim warning; the V&A Rupert Potter photos are © V&A with non-commercial/768 px terms; the Commons-tagged Rupert Potter scans are tiny and unpublished-in-UK (2039 rule) uncertain | **Yes** — 14 rows, 12 substantive sources, EN/KO editorial draft (`docs/checkpoints/roster42-held-beatrix-potter-editorial-draft.json`); candidate is `evidence_approved` with `portrait.status: "held"` (Uemura/Roddick/Shannon precedent) | Written confirmation from the V&A (vaimages@vam.ac.uk) that the Rupert Potter 1897 photo is free to use, or a pre-1931 *published* portrait on the Internet Archive / LOC |

No 16th candidate was added.

## Shipped: 14

| Slug | Substantive sources | Independent perspectives | Rows | Publication | Eligible |
|---|---|---|---|---|---|
| george-stephenson | 10 | 5 non-self (Paris [hostile], Devey, Jeaffreson, Gooch, Science Museum Group) + Smiles (admiring/derived) | 10 | evidence_approved | no |
| george-westinghouse | 8 | 3 (Adams client-side, Moran, period press) + Prout/Leupp insider | 13 | evidence_approved | no |
| emil-zatopek | 14 | 6 (Askwith, Olympedia, Times, World Athletics, IOC, period press) | 7 | evidence_approved | no |
| juan-manuel-fangio | 15 | 5 non-self (Moss, Motor Sport obituary, journalists, Tavoni [interested], Mercedes) + self via interview | 7 | evidence_approved | no |
| matthew-henson | 12 | Josephine Peary diary, Bartlett, National Archives, BlackPast/Gale + Peary (employer) + self | 4 | evidence_approved | no |
| mary-pickford | 19 | ~6 (PBS, Canadian Encyclopedia, Hampton, Ramsaye, Studlar [critical], Academy/MPTF) + Zukor counterparty | 10 | evidence_approved | no |
| johannes-brahms | 7 | 6 (May, Henschel, Dietrich/Widmann, Hadow, NDB, Tchaikovsky Research [adversarial]) | 7 | evidence_approved | no |
| pyotr-ilyich-tchaikovsky | 11 | 7 non-self (Poznansky, Modest, Rimsky-Korsakov, Damrosch, Smyth, Tchaikovsky Research, Newmarch) | 10 | evidence_approved | no |
| gustav-klimt | 8 | 6 (ÖBL, Belvedere, Bahr/Hevesi contemporaries, hostile press, Secession/Kunstschau catalogues, UNESCO) | 9 | evidence_approved | no |
| katsushika-hokusai | 6 | 3 (Revon + Japanese witnesses, Goncourt, Clark) + Focillon critical + self postscript | 12 | evidence_approved | no |
| edwin-hubble | 15 | 5+ (Osterbrock et al. critical, AIP, Kragh, MacCallum, Hughes review) + insider/admiring (Mayall, Humason, Sandage) | 10 | evidence_approved | no |
| blaise-pascal | 12 | 8 (Fermat, Brunschvicg, Tulloch critical, SEP, M'Crie, Lataste critical, Noël adversary, Clermont library) + family/self flagged | 12 | evidence_approved | no |
| ignaz-semmelweis | 6 | 5 non-self (Schürer, Kadar & Croft, Sinclair, Kußmaul, contemporary critics) — weaker independence than the count (most dated Vienna detail traces to Semmelweis/Hebra/Skoda) | 9 | evidence_approved | no |
| alfred-wegener | 13 | 6 non-self (NDB, Austrian Academy obituary, Kehrt, Demhardt, Hofbauer, Lake 1923 discussion [adversarial]) + self | 11 | evidence_approved | no |

156 substantive source records (14 shipped), 131 scored rows. Every shipped
candidate has ≥2 independent perspectives and ≥1 substantive non-self
behavioural source, actually opened/read; Wikipedia/Wikidata orientation
only. Researchers worked under the Roster40 calibration lesson. Henson is
the thinnest profile (4 rows, one `inference`): evidence-approved honestly,
no padding. Several researchers could not reach lending-only books (Greene,
Oreskes, Whitford, Skrabec, Jonnes, Carter); stated in each candidate's notes.

## Major Achievement review (new standard)

Every candidate's draft carried a review tuple (primary / second / optional
third contribution, displayed cards, and three checks) from the research
agent; the lead then re-read every set of cards independently.

- Checked: **15** (14 shipped + the held Potter draft).
- PRIMARY-CONTRIBUTION failures before correction: **0**.
- TOP-OMISSION failures before correction: **1** — Pascal: the agent's three
  cards carried probability, pressure/vacuum and the Provincial Letters/Pensées
  but left the **Pascaline** calculator only in a Moment; the lead promoted it
  to an Achievement (4 cards) and trimmed the duplicated facts from the Moment.
- IDENTITY failures before correction: **0**.
- Final: **15/15 PASS** on all three checks. Side material was routed to
  Moments (Klimt's 1901 remark and Kunstschau; Brahms's destroyed scores;
  Westinghouse's stopper lamp and perpetual-motion episode; Zátopek's
  training experiments and medal gift). Two cards only for
  Semmelweis, Westinghouse and Zátopek (no filler); Pascal 4; the rest 3.

## Lead-review corrections (before eligibility; downward/relabel only)

- **katsushika-hokusai** mastery orientation 82/0.70 → 80/0.66 (rubric
  correction B: the independent corroboration rests on three perspectives of
  uneven independence plus a self postscript).
- Portrait labels: **alfred-wegener** `likeness` → `historical_depiction`
  (a signed 1913 pencil drawing; sources do not say from life or from
  photograph). **mary-pickford** LOC scan cropped to the print area (black
  scan border and reversed negative number removed; no upscaling).
- Mechanical ERROR_CORRECTION (C): candidate source `kind` values outside the
  closed vocabulary (`encyclopedia`, `obituary`, `journal`, `book`) mapped to
  allowed kinds for Wegener and Zátopek; an archive.org identifier removed
  from a public Klimt source title. No scoring field touched.
- All other profiles accepted as researched.

## Portraits and material rights notes

Every shipped portrait: exact source page and licence read, real download,
file opens, recorded dimensions = actual, local asset, 200 on the production
server; ≤1600px long edge, never upscaled.

| Slug | Portrait | Basis | Note |
|---|---|---|---|
| george-stephenson | Pickersgill c.1845 (NPG 410, via Commons) | PD-Art (artist d. 1875) | 619x800, small; NPG/Art UK pages 403, data from Commons |
| george-westinghouse | Gessford photo, LOC 93511337 | LOC "no known restrictions"; pre-1931 | date range only |
| emil-zatopek | J.D. Noske, Anefo 1948 (Nationaal Archief 902-9145) | CC0 (archive's own record) | Fotothek P18 rejected (rights page unreadable); 13/15 Aug date discrepancy |
| juan-manuel-fangio | Willy Pragher 4 Aug 1957 (Landesarchiv BW W 134 Nr. 048170a) | CC BY 4.0 (archive viewer, terms page, Commons agree) | post-race frame, not a studio portrait |
| matthew-henson | Bain News Service 1909 (LC-DIG-ggbain-04257) | LOC "no known restrictions"; 1909 | photographer unrecorded; cropped from the full-deck shot |
| mary-pickford | Rufus Porter Moody, LC-USZ62-117995 | LOC no restrictions; Moody d. 1922 | studio © mark in image; cropped to print area |
| johannes-brahms | Fritz Luckhardt (d. 1894), ÖNB Pf 394:B(4) | PD-old (Commons) | undated; photographer active 1867-1894 |
| pyotr-ilyich-tchaikovsky | Atelier E. Bieber, Hamburg, 1888 (Commons) | PD | original holding (Bergen library Flickr) unconfirmed |
| gustav-klimt | Anton Josef Trčka (Antios), 1914 | PD (d. 1940) | Klimt Foundation prints its own © under its reproduction — read as a notice about the print it holds |
| katsushika-hokusai | Smithsonian F1904.282 'Hokusai as an old man' | CC0 (Smithsonian Open Access API) | 1900 reproduction print; `historical_depiction` |
| edwin-hubble | The Cap and Gown 1910 (Univ. of Chicago yearbook, p. 87) | US publication 1910, PD | a young Hubble (~20); Hagemeyer 1931 rejected (basis unverifiable) |
| blaise-pascal | Edelinck engraving after Quesnel c.1691 | old PD; library scan CC BY-SA 4.0 (credited) | posthumous: `historical_depiction`; Versailles photo rejected (RMN authorisation note) |
| ignaz-semmelweis | Borsos & Doctor 1860 carte-de-visite (OSZK) | PD-old-100 | hand-cropped from the Commons scan; OSZK blog source unreadable |
| alfred-wegener | Achton Friis pencil portrait 1913 (Koch 1919 plate) | PD (Friis d. 1939) | `historical_depiction`; uploader's book attribution not checked against a scan |

## Publication vs. eligibility

Rows, confidence, evidenceType, metadata and publication decisions (15 ×
`evidence_approved`; Potter portrait-held) were frozen first; eligibility was
then read only. **All 14 shipped are non-match-eligible** — no padding, no
rescue. Roster42 statistics (min / median / max): rows 4 / 10 / 13; coverage
0.126 / 0.297 / 0.388; high-confidence count 3 / 9.5 / 12; high-confidence
average 0.552 / 0.596 / 0.652. Roster42 eligible N = 0.

## Production, promotion, index, localization

`generateRoster42.ts` (explicit 14-slug literal allowlist — Potter
deliberately excluded; `preparePersonSeedForPromotion()`; never reads
eligibility) → `roster42.ts`; `ROSTER_42` wired into `seed.ts` and
`NAMED_ROSTERS`. `peopleIndex.generated.ts` regenerated (364 entries; diff =
header count + 14 entries, all directory-visible, none match-eligible; no
unrelated drift). 14 `person.name.<slug>` Korean names + concise EN/KO
editorial (no raw ids; first/only claims sourced or hedged).

| | Before | After |
|---|---|---|
| Production | 350 | **364** |
| Directory-visible | 349 | **363** |
| Match-eligible | 114 | **114** |
| Candidate JSON files | 415 | **430** |

### A. Published/directory field-category coverage

| Category | Before (350) | After (364) | Delta |
|---|---|---|---|
| science_knowledge | 153 | 159 | +6 |
| arts_culture | 128 | 133 | +5 |
| leadership_society | 77 | 77 | +0 |
| building_discovery | 92 | 99 | +7 |

### B. MATCH-ELIGIBLE interest-scope pools (114 eligible people)

| Category | Before | After | Delta |
|---|---|---|---|
| science_knowledge | 50 | 50 | +0 |
| arts_culture | 43 | 43 | +0 |
| leadership_society | 42 | 42 | +0 |
| building_discovery | 15 | 15 | +0 |

## Recent-cohort watch (recorded, not re-analyzed)

Roster42 shipped 14, eligible 0. Cumulative Roster33-42: **139** shipped,
**0** match-eligible. Classification unchanged: CONTINUE_EXPANSION_AS_IS.

## Calibration, dispersion, matching health

`calibrate.ts quiz` ×2. Eligible cohort unchanged (114): dispersion blob
identical to HEAD (meanSd 11.704); MATCH anchors identical to the shipped
values (0.3748 … 0.6201); no refresh; `CALIBRATION_VERSION` =
`calibration_v3`. Matching health: focused confirmation only (full
`matching.test.ts` passes).

## Test/audit maintenance

Mechanical bumps 350→364 / 349→363 (Roster24-41 pattern): lineage audit
(`ROSTER_42`, regex `4[0-2]`), matching / publication-separation divergent
lists (+14), kurosawa + legacy batch 2-5 + roster33-41 tests, e2e Directory
("363 people", "전체 364명 중 9명"; Playwright Directory spec passes, so the
cross-facet count of 9 is unchanged). New `roster42.test.ts`: 14 × 10
table-driven checks + backlog/hold absence (incl. Potter evidence_approved +
portrait held) + cross-target integrity + a **structural** Major Achievement
test (≥1 Achievement; keys resolve in EN and KO; no raw `src_`/snake_case ids
in rendered editorial strings). Historical significance itself is a human gate
and is not scored by any numeric heuristic.

## Validation

- `tsc --noEmit` clean (it caught five source `kind` values outside the closed
  vocabulary, fixed above). `validateCandidates.ts`: **430 candidates, 0
  errors, 0 warnings** (`qa_passed` 93, `evidence_approved` 254, `held` 83).
- `checkScoringLockIntegrity.ts` pre-work: "Checked 415 previously-committed
  candidate file(s) against HEAD. 0 flagged."; legacy 22 / 0.
- `vitest run`: **72 files, 2338 tests, all passed**.
- `next build --webpack`: success, **752 static paths** (2×364+24); no
  regression observed.
- Focused Playwright (Person, Editorial, Directory, Compare): **128/128**.
- Manual QA (production server): George Westinghouse (building), Gustav Klimt
  (arts), Edwin Hubble (science), Johannes Brahms (KO), Katsushika Hokusai
  (true 375px), `/en-US/compare/gustav-klimt` (graceful "isn't included in
  matching yet" state); all 14 portraits 200; all 28 EN/KO routes 200, no key
  leak, no raw `src_` ids, no raw snake_case ids; 375px iframe sweep of all 14:
  no overflow, hero loaded, no broken image, 7 sections, non-eligible notice
  present. Potter routes 404 as intended. No eligible new profile exists to
  spot-check. Major Achievement cards read for Westinghouse, Klimt, Hubble and
  Brahms: "Do these cards explain why this person matters?" — PASS.
- Source-link check, 182 URLs: 159 × 200; 17 × 403 and 2 × 405 (loc.gov,
  Science Museum, Britannica, ADS, oscars.org, … bot walls), 4 non-ASCII
  wikisource URLs my checker did not percent-encode — no true 404.

## Post-commit scoring lock

(Recorded in the follow-up docs commit with the literal output.)

## Operational notes

Default concurrency 1. Two agents (Hubble, Klimt) ran concurrently once and
both hit a usage-limit 429; per the brief the cycle went back to 1 agent.
Hubble resumed from files on disk (no re-reading); Klimt had saved nothing and
restarted; Semmelweis resumed after a second limit from its progress notes.

## Confirmations

No matching/architecture diagnostic repeated; no performance, similarity,
route-payload or storage benchmark (build success + static path count only).
No eligibility padding or rescue. Legacy lane paused (no legacy research,
rescoring or tuple change; Legacy Batch 6 not started). The older
henry-ford / vincent-van-gogh / stephen-hawking editorial debt and the
Rembrandt/Kubrick source-note raw-id cleanup were not pulled into Roster42.
Roster43 not started.
