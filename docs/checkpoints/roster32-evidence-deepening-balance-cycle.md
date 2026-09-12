# Roster32: evidence-deepening + match-pool-balance cycle (2026-09)

**Branch:** `feat/roster32-evidence-deepening-balance-cycle`
**Base:** `dec7e16faec6904f7ed7f76788c924c0ec420eba` (PR #32 merge)

## Revision note (2026-09-12 correction pass)

This checkpoint was substantially corrected after the initial version
conflated match-eligibility diagnostics with publication readiness --
holding all 8 candidates because none crossed `eligibility_v2`, which is
not what publication approval is gated on (see
`docs/checkpoints/profile-publication-vs-match-eligibility.md`: "Is this
evidence-backed profile good enough to publish?" is a review-outcome
question, never a numeric floor). A second, eligibility-BLIND publication
review was performed -- reasoning from evidence quality alone, with
eligibility numbers appended only afterward, as a separate diagnostic --
and found **7 of the 8 candidates publication-safe**. They are now
`evidence_approved`, published, and directory-visible. This pass also
mechanically re-derived every row-change count from a real git diff
(the original figures were arithmetic errors) and corrected wording that
overstated how "craft-only" the cohort's evidence base is -- several
pre-existing rows (Neruda, Shaw) legitimately include political/diplomatic
material, which is not a defect under this project's actual zero-politics
rule.

## What this cycle is, and isn't

Recent batches (Roster25-31) grew the People Directory from 127 to 218
people while the match-eligible pool held flat at 127. This cycle is
**not** another bulk-publication batch. Its purpose was to deepen a small,
frozen set of existing `held` candidates with genuinely NEW behavioral
research -- authorized for the first time since the Roster28-31 "fast
production" cycles -- and to diagnose why Building & Discovery and Arts &
Culture stay thin. Publication or non-publication of the resulting,
deepened evidence is a *separate* question from that research goal,
governed by its own architecture (below), not by whether the research
happened to close the match-eligibility gap. **Zero candidates became
newly match-eligible this cycle** -- that is an honest, expected result,
not a shortfall, and it is not what the publication decisions below turn
on.

## Held-pool inventory: a mechanical finding that reshaped the cohort

Before selecting candidates, the entire held pool (94 candidates) was
mechanically inventoried and categorized by `PROFESSION_CATEGORIES`
multi-membership. **Building & Discovery, after exclusions, collapses to
exactly one viable candidate.** The raw multi-membership list showed 6
held candidates touching `business`/`technology`/`computing`/`sport`/
`exploration`: Ibn Battuta, Mary Seacole, Marcus Garvey, John von Neumann,
Marco Polo, and Pele. Cross-checking against the Group-B evidence-
integrity exclusion set found **Ibn Battuta, Mary Seacole, John von
Neumann, and Marco Polo are all Group-B** -- off-limits. Marcus Garvey
fails the zero-politics gate (his primary historical significance is
Pan-Africanist/UNIA movement leadership). That leaves **Pele alone**.
Several originally-promising shortlist candidates (Ibn Battuta, Mary
Seacole, Zeami Motokiyo, Ban Zhao, Mimar Sinan, Simone de Beauvoir,
Cicero -- all 20-21 rows) turned out to carry the `SS76` Group-B marker,
eliminating what looked like the strongest options before research began.

Given this, the frozen cohort is **1 Building & Discovery + 7 Arts &
Culture** -- the honest maximum this pool supports without violating
Group-B or zero-politics.

## Frozen cohort and zero-politics verification

**Roster32 political/state/military/activist-primary count: 0/8.**

| Candidate | Category | Field | Region | Pre-research rows |
|---|---|---|---|---|
| Pele | Building & Discovery | sport | Latin America | 3 |
| Fahrelnissa Zeid | Arts & Culture | art | West Asia | 5 |
| Virginia Woolf | Arts & Culture | literature | W. Europe | 6 |
| Matsuo Basho | Arts & Culture | literature | East Asia | 6 |
| James Baldwin | Arts & Culture | literature | N. America | 7 |
| Al-Farabi | Arts & Culture | music/philosophy | West Asia | 9 |
| George Bernard Shaw | Arts & Culture | literature | W. Europe | 13 |
| Pablo Neruda | Arts & Culture | literature | Latin America | 20 |

**On the zero-politics rule, precisely:** this rule governs a person's
PRIMARY product identity -- "what is this person primarily famous for" --
not the absence of any political fact from their documented biography.
Neruda held a Senate seat, was forced into exile after denouncing Chile's
president, and was a Communist Party member and later presidential
pre-candidate; several of his PRE-EXISTING rows (risk_tolerance,
impact_motivation, independent_thinking, conflict_tolerance) legitimately
rest on that record. Shaw was a prominent Fabian Society voice and took a
public WWI pacifist stance; his existing `independent_thinking` and
`conflict_tolerance` rows partly rest on it. Neither is sanitized here --
both remain unambiguously "poet" and "playwright" as their primary product
identity (each via a Nobel Prize in Literature and global readership), so
neither trips the zero-politics gate. This cycle's own NEW evidence
additions for both deliberately avoided adding further political material
as evidentiary basis, specifically to diversify the profiles' evidence
base -- not because the existing political-adjacent rows were themselves a
problem. Pele, Zeid, Woolf, Basho, Baldwin, and Al-Farabi have no
political content in their fields, occupations, or rows at all.
Baldwin's rows concern his individual professional conduct as a writer
(mentorship, a public literary break, a screenplay walkout), never
organizational civil-rights leadership -- he held no such role, unlike
Du Bois/Addams/Pankhurst, whose historical significance *is* the
organizing.

Considered and rejected during selection: Marcus Garvey (activist-primary,
see above); Herodotus (no diversification benefit over the 5 literature
picks already chosen, plus higher achievement-vs-personality risk for an
ancient figure).

## Research discipline

Research first, ledger second, scoring third, eligibility last -- no row
was added or upgraded without a specific new source, and eligibility was
computed exactly once, after every candidate's data was finalized. Two
Wave-3 research agents (Shaw, Neruda) hit a session-wide rate limit
mid-run; per this cycle's own instruction, no further parallel agents were
spawned -- that research was completed directly and sequentially instead.
Concurrency stayed at 2-3 agents throughout, all using `WebSearch`/
`WebFetch` rather than the shared interactive browser pane.

## Mechanically-derived evidence ledger (corrected)

The original version of this checkpoint stated "20 new rows + 13 upgrades
= 33 row-level changes." That arithmetic was wrong on both terms. The
actual numbers below are derived by diffing every candidate file's `rows`
object at `dec7e16` (base) against `fd8375f` (the original Roster32
commit) programmatically -- not re-counted by hand.

| Metric | Count |
|---|---|
| Rows added | **25** |
| Rows removed | **0** |
| Existing rows modified (any field changed) | **17** |
| **Total row-level changes** | **42** |
| — of which: score changed | 4 |
| — of which: confidence changed | 15 |
| — of which: evidenceType changed | 3 |
| — of which: impact changed | 0 |
| — of which: rationale-only, no score/conf/evType/impact change | 2 |
| NEW_EVIDENCE-tagged changes (added + modified) | 40 |

The 2 rationale-only changes are Pele's `competitiveness` and `discipline`
rows: both rows' numeric fields (score/confidence/evidenceType/impact) are
byte-identical before and after, and the wording differences are
incidental copy-edits made while restructuring the surrounding
`achievement_drive` row's text in the same edit, not a substantive
evidence change -- correctly not tagged `NEW_EVIDENCE`, and not
double-counted as a distinct correction.

Per-candidate breakdown (rows added / rows modified):

| Candidate | Added | Modified | Total |
|---|---|---|---|
| Pele | 3 | 3 (1 tagged, 2 rationale-only) | 6 rows -> 6 |
| Fahrelnissa Zeid | 6 | 3 | 5 -> 11 |
| Virginia Woolf | 6 | 1 | 6 -> 12 |
| Al-Farabi | 0 | 2 | 9 -> 9 |
| Matsuo Basho | 3 | 2 | 6 -> 9 |
| James Baldwin | 3 | 3 | 7 -> 10 |
| George Bernard Shaw | 3 | 1 | 13 -> 16 |
| Pablo Neruda | 1 | 2 | 20 -> 21 |
| **Total** | **25** | **17** | **42** |

## Publication decision: eligibility-blind review, all eight

Per the architecture doc's own test -- identity integrity, source
quality, provenance honesty, semantic support of scored rows, unresolved
attribution/factual problems, legendary/late-source risk, and whether the
evidence supports a meaningful, non-misleading profile with honest EN/KO
editorial -- reasoned through BEFORE consulting eligibility numbers:

| Candidate | Publication decision | Rationale (evidence quality only) |
|---|---|---|
| Pele | **evidence_approved** | No attribution/legend risk; 6 rows honestly sourced (his own writing, FIFA Museum, a historical society), reasonably diverse across work-style/resilience/motivation. |
| Fahrelnissa Zeid | **evidence_approved** | No attribution/legend risk; 11 rows, vivid and well-corroborated across creativity/resilience/motivation/thinking facets; excluded sensitive material stays excluded. |
| Virginia Woolf | **evidence_approved** | No attribution/legend risk; 12 rows, well-rounded across nearly every facet; health-adjacent material correctly excluded per established precedent, not a defect. |
| Matsuo Basho | **evidence_approved** | Kyoraisho is a genuine disciple-authored primary text, already independently re-verified sentence-by-sentence (catching and fixing a real misattribution before this review, see below); legend-risk material already excluded from scoring. |
| James Baldwin | **evidence_approved** | No attribution/legend risk; 10 rows entirely grounded in individual professional/personal conduct; unverified brawl/manuscript claims already excluded. |
| **Al-Farabi** | **held** | Concrete defect: the existing `autonomy_need` row rests specifically on "later biographical tradition" -- exactly the medieval-dictionary tradition this cycle's own research found unreliable for personal-life claims about him, absent from the most rigorous modern source for its Aleppo chapter. Not a row-count issue; the row itself was not touched (locked evidence, no new research). |
| George Bernard Shaw | **evidence_approved** | No attribution/legend risk; 16 rows, well-rounded, several directly quoted in his own words; existing Fabian/pacifism rows document individual conviction, not organizational leadership. |
| Pablo Neruda | **evidence_approved** | No attribution/legend risk; 21 rows, the richest and most complete profile in the cohort; the one genuinely sensitive matter (an assault confession in his own memoir) remains excluded from all scoring, as established in an earlier cycle. |

**Match-eligibility, reported separately and only after the above was
decided** (informational; not a publication factor):

| Candidate | scored | coverage | HC count | HC avg | Eligible? |
|---|---|---|---|---|---|
| Pele | 6 | 0.17 | 4 | 0.65 | No |
| Fahrelnissa Zeid | 11 | 0.34 | 7 | 0.65 | No |
| Virginia Woolf | 12 | 0.37 | 8 | 0.61 | No |
| Al-Farabi | 9 | 0.27 | 3 | 0.58 | No (held anyway, see above) |
| Matsuo Basho | 9 | 0.28 | 6 | 0.58 | No |
| James Baldwin | 10 | 0.31 | 8 | 0.66 | No |
| George Bernard Shaw | 16 | 0.48 | **12** | **0.57** | No (row count + coverage only; both HC sub-gates pass) |
| Pablo Neruda | 21 | 0.63 | 10 | 0.62 | No (2 HC rows short; row count, coverage, HC avg all pass) |

None of the 7 published candidates are match-eligible. This is the
expected, honest result of a cycle that deepened rather than manufactured
eligibility, not a shortfall to explain away.

## A real factual-gate catch (Matsuo Basho)

Re-reading Basho's primary source (Kyoraisho) against the draft evidence
before finalizing found a genuine misattribution: a line dismissing critic
Shohaku ("completely misses the mark") had been attributed to Basho, but
the text shows it is spoken by his disciple Kyorai -- Basho's own response
was measured praise of Kyorai. A second exchange characterized as a
confident dismissal actually shows him pondering at length before a
hedged, uncertain verdict. Both were corrected before staging: the
misattributed material was moved to a more accurate row (`collaboration`,
since it genuinely shows Basho validating a disciple's judgment) and the
hedged-verdict exchange was dropped rather than force-fit anywhere.

## Per-candidate research summary

**Pele** -- 9 sources opened (Players' Tribune, FIFA Museum, a soccer
historical society). New: childhood sock-ball/boot-cleaning
(resourcefulness), a specific father-promise anecdote (achievement_drive),
the 1970-final set-play recognition + boot-cleaning (planning_orientation),
the multi-month Cosmos negotiation (decisiveness, low). Excluded: an
unverifiable 1966 quit-vow story; the debunked 1969 Biafra-ceasefire myth.

**Fahrelnissa Zeid** -- 6 sources opened. New: independently-corroborated
trance-like painting process (deep_focus), a "not meticulous... spontaneous"
assessment (perfectionism, low), the 1945 self-organized exhibition
(upgrading proactive_agency), a teaching-institute philosophy quote
(leadership_drive), teenage postcard-selling (resourcefulness), the Trump
portrait episode (autonomy_need), a flight-epiphany account
(intuitive_synthesis). Excluded: a reported suicide attempt; a
family-violence detail not her own action.

**Virginia Woolf** -- 8 sources opened. New: the "tunnelling" method
(upgrading creative_originality), extensive revision across two books a
decade apart (perfectionism), an evolving view of Joyce's Ulysses
(belief_updating), a 19-month public rebuttal to Bennett (conflict_tolerance),
continuing TLS reviewing after rejection (persistence), the 1918 Ulysses
publishing decision (risk_tolerance, low, joint-decision caveat), Mansfield
jealousy (competitiveness). Excluded: diary-gap and nature-diary material
specifically adjacent to a documented health crisis, per established
precedent.

**Matsuo Basho** -- 4 sources opened, centered on discovering Kyoraisho as
a primary source. New (post-correction): two verified Kyoraisho quotes
(social_assertiveness), Sora's Diary confirming deliberate literary
reshaping (upgrading creative_originality), a 1686 letter backing an
unfashionable poem for years plus deliberate doctrine-timing
(independent_thinking), warmth toward disciples (collaboration), leaving a
paid post over "frivolity" plus an ambiguous priest/layman identity
(upgrading autonomy_need). Excluded: a deathbed legend; an abandoned-child
episode (legend-risk given the confirmed Sora's Diary pattern); the 1682
fire reaction (too close to emotional-state interpretation).

**James Baldwin** -- 6 sources opened. New: the Beauford Delaney mentorship
(mastery_orientation), the Wright break and Malcolm X screenplay walkout
(autonomy_need), the Mailer response (upgrading conflict_tolerance), the
Angelou "reverse psychology" episode (upgrading persuasiveness), the
Giovanni's Room/Knopf episode (upgrading persistence). Excluded: an
unverified brawl claim; an unverified "burn the manuscript" claim.

**Al-Farabi** -- 2 new sources (modern critical scholarship), explicitly
testing for a Hippocrates-style attribution failure. Found it warranted:
most personal-life texture in the wider tradition is late (250-320+ years
post-death), sometimes contradictory, and in one case absent from the most
rigorous modern source. Only 2 rows touched (analytical_rigor,
mastery_orientation), both from his own surviving texts/self-account.

**George Bernard Shaw** -- 4 sources opened, closing this file's own
previously-named gap. New: five novels written and rejected 1879-83
(persistence), his own quoted Pitman-shorthand composition process
(detail_orientation), the 66-year vegetarianism commitment (upgrading
discipline), systematic argumentative prefaces (systems_abstraction).
Excluded: the "five pages a day" anecdote, untraceable to a primary
source.

**Pablo Neruda** -- 3 sources opened, deliberately corroborating existing
rows rather than expanding. New: the "al alimon" joint speech with Lorca
(upgrading creative_originality), the Isla Negra shell collection
(upgrading detail_orientation), the green-ink ritual (aesthetic_sensitivity).
A diagnostic correction: the prior holdReason's "avgConf 0.515" was the
legacy flat average, not the real eligibility_v2 statistic -- the actual
binding constraint was always high-confidence row count (8 of 12), not
average quality (already 0.63).

## Interest-area impact

**Zero newly match-eligible people.** Per the brief's rule,
`dispersion.generated.ts`, calibration, and matching-health were correctly
left untouched.

Interest-area category pool counts (diagnostic, `isMatchEligible`-gated)
are unchanged, since none of the 7 published candidates are match-eligible:

| Category | Before | After |
|---|---|---|
| science_knowledge | 53 | 53 |
| arts_culture | 49 | 49 |
| leadership_society | 44 | 44 |
| building_discovery | 19 | 19 |

Building & Discovery's held pool is now known to be essentially exhausted
(1 viable candidate, already deepened and published this cycle). Arts &
Culture's viable held pool, after Group-B/zero-politics exclusion, was
also more literature-concentrated than ideal (5 of 7 promoted candidates
are writers) -- an honest structural finding about this specific pool.

## Portraits

All 7 published candidates have real, rights-clear portraits, each
verified by directly fetching the source page (not inferred from a search
snippet):

| Candidate | Source | License | Kind |
|---|---|---|---|
| Pele | Nationaal Archief/Anefo (Joop van Bilsen), 1962 | CC0 1.0 | likeness |
| Fahrelnissa Zeid | Family archive (Prince Ra'ad Zeid Al-Hussein), 1937 | PD-old | likeness (family photo -- no solo portrait is rights-clear) |
| Virginia Woolf | George Charles Beresford, 1902 | Public Domain | likeness |
| Matsuo Basho | Attributed to Morikawa Kyoriku, 17th c. | PD-old-100 | **historical_depiction** (his own disciple, painted within ~20 years of his death; not a photograph -- none can exist) |
| James Baldwin | Carl Van Vechten / Library of Congress, 1955 | Public Domain | likeness |
| George Bernard Shaw | Bain News Service / Library of Congress, 1909 | Public Domain | likeness |
| Pablo Neruda | Library of Congress, 1966 | Public Domain (US federal work) | likeness |

Notable rejected candidate: a Nobel Foundation-attributed Neruda 1971
photo was found mistagged CC-BY-4.0 on Commons -- directly checking
NobelPrize.org's own copyright policy confirmed the Foundation states it
"cannot grant permissions to use portrait photos of the Nobel Prize
laureates of 1901-2006," contradicting the file's self-applied license.
Not used.

## EN/KO editorial

All 7 published candidates received 2 achievements + 2 moments (with
interpretations tied to specific scored rows), EN and KO, following the
established minimal pattern -- every claim grounded in the locked evidence
above, no general-knowledge filler, no new behavioral claims beyond what
was already scored.

## Validation

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: 0 errors / 0 warnings across all 277 candidate
  files. Status counts: qa_passed 93, evidence_approved 97 (+7), held 87
  (-7).
- `checkScoringLockIntegrity.ts`: 0 flagged.
- `i18n-audit.ts`: 100% Korean coverage, 0 missing keys.
- `editorialCoverageAudit.ts`: 225/225 people have editorial content, 100%
  Korean coverage.
- `next build --webpack`: clean.
- Full `vitest run`: **750/750 passing**, after fixing 3 genuinely-expected
  regressions from the promotion: `matching.test.ts`'s `knownNonEligible`
  allowlist (2 duplicate blocks) needed the 7 new slugs;
  `profilePublicationSeparation.test.ts`'s production/directory-visible
  counts (218/217 -> 225/224) and `KNOWN_DIVERGENT_SLUGS` needed the 7 new
  slugs; `session17Isolation.test.ts`'s James Baldwin frozen-state check
  needed its status assertion updated `held` -> `evidence_approved`
  (row count and the frozen `persistence` score were already correct from
  the prior pass).
- Focused Playwright: new `roster32EvidenceDeepeningBalanceCycle.spec.ts`
  (91 tests: 7 candidates x 13 tests + 3 aggregate checks, including a
  negative-presence check confirming Al-Farabi is NOT shipped) +
  `peopleDirectory.spec.ts` (updated authoritative count 217 -> 224, and
  the ko-KR filtered-count assertion 218 -> 225 total, 7 filtered --
  mechanically verified none of the 7 new candidates have both curiosity
  and collaboration scored, let alone crossing both thresholds) +
  `roster31FifteenPersonZeroPoliticsBatch.spec.ts` (regression check) --
  **182/182 passing**.

## Final diff scope

23 files: 8 candidate JSON, 2 editorial content files (data + i18n text),
1 i18n display-name file, 3 test files (matching, profilePublicationSeparation,
session17Isolation), `seed.ts`, `peopleIndex.generated.ts`, the new
generator, the new roster file, the new Playwright spec,
`peopleDirectory.spec.ts`, and 7 portrait images. Confirmed untouched:
`interestScope.ts`, the quiz interest selector, the Results scope
switcher, Landing copy, quiz token/schema, analytics, monetization, auth,
every candidate outside the frozen 8, every Group-B candidate,
`next-env.d.ts`, `.env.local`, `eligibility_v2`, the matching formula,
calibration, dispersion, and Roster33 (not started).

## Commit + PR

Original commit `fd8375f`, corrected in a second focused commit on the
same branch, both pushed to the same PR #34. Not merged, per explicit
instruction. See the PR description for exact final commit SHA and Vercel
status.
