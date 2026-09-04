# Roster Expansion 125 — Track A Provenance Closure, Structural-Thin Semantics, New-Alternate Search (DRAFT)

**Status: AUDIT + ONE TARGETED CORRECTION, NOT COMMITTED.** 1 candidate file
edited (`edward-said.json`, one row narrowed). No roster/editorial/portrait
files touched, no `src/` changes, no candidate files created, no one
scored, no swap performed, nothing committed. `next-env.d.ts` confirmed
untouched.

---

## A. Track A exhaustive row-level provenance audit

### Method

Per instruction, this was **not** a fresh 200-search campaign. For every
scored row across all 12 Track A candidates, I read the row's own
`rationale`, the candidate's `sources` array, and cross-referenced against
what the prior convergence audit's 11 targeted searches already verified.
New verification was performed only for rows where a claim looked
under-cited relative to what the file's own `sources` array supports, or
where a claim looked genuinely ambiguous across retellings. That
produced exactly two follow-up checks (Babur's uncited battle
historiography; Haile Selassie's Rastafari-denial anecdote — both
resolved without new search, see §A.3) and one genuine correction
(Edward Said's `leadership_drive` row — found via direct re-reading, not
a new web search).

**Provenance-type key** used in the table below:

| Code | Meaning |
|---|---|
| FH | Firsthand/self-report (memoir, own trial testimony, own correspondence, own documentary interview) |
| IN | Institutional/documentary record (trial record, Nobel citation, org founding record, government scholarship/legal record) |
| PR | Independent contemporary press/observation (witnessed and reported by parties other than the subject) |
| LB | Later serious biography/scholarly history naming specific sources (Coates, Vogel, Dunn-class) |
| IB | Independent biographer not the subject (e.g., a spouse's own separately-authored memoir) |
| DV | Derivative/secondary synthesis — reception, "well-established historical record," characterization without a named biography |

Most rows rest on more than one of these; the table lists the dominant
one(s). Full quoted rationale lives in each candidate JSON's own `rows`
object — not reproduced here per instruction.

### A.1 José Rizal — 18/18 rows audited

| Attribute | Provenance | Result |
|---|---|---|
| risk_tolerance | IN+LB | TRACEABLE |
| independent_thinking | IN+FH | TRACEABLE |
| creative_originality | IN+DV | TRACEABLE |
| discipline | LB | TRACEABLE |
| cross_domain_range | FH+IN | TRACEABLE |
| social_assertiveness | IN | TRACEABLE |
| persuasiveness | DV | TRACEABLE |
| collaboration | FH | TRACEABLE |
| adaptability | LB | TRACEABLE (already narrowed, water-system claim removed, convergence audit) |
| persistence | DV | TRACEABLE |
| achievement_drive | DV | TRACEABLE |
| autonomy_need | FH | TRACEABLE |
| detail_orientation | IN | TRACEABLE |
| curiosity | DV | TRACEABLE |
| impact_motivation | FH | TRACEABLE |
| planning_orientation | DV | TRACEABLE |
| conflict_tolerance | DV | TRACEABLE |
| proactive_agency | DV | TRACEABLE |

**18/18 TRACEABLE. 0 new corrections this pass** (the 1 pre-existing
correction from the convergence audit stands).

### A.2 Lee Kuan Yew — 18/18 rows audited

| Attribute | Provenance | Result |
|---|---|---|
| leadership_drive | DV+IN | TRACEABLE |
| planning_orientation | FH | TRACEABLE |
| decisiveness | IN+PR | TRACEABLE (Coldstore/Malaysia withdrawal, confirmed convergence audit) |
| conflict_tolerance | PR | TRACEABLE (defamation pattern, confirmed) |
| risk_tolerance | FH | TRACEABLE |
| achievement_drive | DV | TRACEABLE |
| discipline | FH | TRACEABLE |
| persuasiveness | LB (compiled-interview volume) | TRACEABLE |
| independent_thinking | FH | TRACEABLE |
| autonomy_need | DV | TRACEABLE |
| proactive_agency | FH | TRACEABLE |
| collaboration | DV | TRACEABLE |
| adaptability | DV | TRACEABLE |
| mastery_orientation | DV | TRACEABLE |
| curiosity | FH | TRACEABLE |
| persistence | DV | TRACEABLE |
| detail_orientation | FH | TRACEABLE |
| social_assertiveness | DV | TRACEABLE |

**18/18 TRACEABLE.** Special-caution items (Operation Coldstore,
defamation-litigation pattern) both independently confirmed in the prior
convergence-audit pass with named outlets (Jeyaretnam case, IHT/WSJ/FEER/
Bloomberg/Economist) — held up on re-check.

### A.3 Shirin Ebadi — 15/15 rows audited

| Attribute | Provenance | Result |
|---|---|---|
| risk_tolerance | FH+PR | TRACEABLE (Chain Murders, confirmed+strengthened) |
| independent_thinking | FH | TRACEABLE |
| persistence | FH | TRACEABLE |
| persuasiveness | IN (Nobel citation) | TRACEABLE |
| impact_motivation | FH | TRACEABLE |
| autonomy_need | FH | TRACEABLE |
| conflict_tolerance | PR | TRACEABLE |
| social_assertiveness | DV | TRACEABLE |
| achievement_drive | DV | TRACEABLE |
| collaboration | IN | TRACEABLE |
| proactive_agency | FH | TRACEABLE |
| planning_orientation | IN | TRACEABLE |
| detail_orientation | DV | TRACEABLE |
| adaptability | DV | TRACEABLE |
| leadership_drive | IN | TRACEABLE |

**15/15 TRACEABLE.** Living-person discipline (published-account
tendencies + specific documented professional acts only, nothing about
private life/motive) verified as consistently applied across every row —
no row leans on anything beyond her own memoir, the Nobel citation, or
independent press.

### A.4 Edward Said — 18/18 rows audited, **1 correction this pass**

| Attribute | Provenance | Result |
|---|---|---|
| independent_thinking | FH | TRACEABLE (narrowed to "Morning After" essay, confirmed, prior session) |
| creative_originality | DV | TRACEABLE |
| conflict_tolerance | PR | TRACEABLE (stone-throwing, confirmed precisely) |
| discipline | DV | TRACEABLE |
| risk_tolerance | DV | TRACEABLE |
| persuasiveness | DV | TRACEABLE |
| achievement_drive | DV | TRACEABLE |
| autonomy_need | FH | TRACEABLE (narrowed, prior session) |
| curiosity | DV | TRACEABLE |
| detail_orientation | DV | TRACEABLE |
| cross_domain_range | DV | TRACEABLE |
| social_assertiveness | DV | TRACEABLE |
| impact_motivation | DV | TRACEABLE |
| adaptability | DV | TRACEABLE |
| persistence | DV | TRACEABLE |
| mastery_orientation | DV | TRACEABLE |
| collaboration | IN (Divan Orchestra co-founding) | TRACEABLE |
| **leadership_drive** | IN, previously also cited an unconfirmed PLO/PNC advisory-role claim | **TRACEABLE_BUT_OVERSTATED -> CORRECTED THIS SESSION** |

**Finding**: the prior convergence-audit session narrowed
`independent_thinking` and `autonomy_need` after finding the "formal PLO
advisory role" claim could not be independently re-confirmed — but the
same claim was still present, untouched, in `leadership_drive`'s
rationale ("held a formal advisory role to the Palestinian National
Council for a period"). This is exactly the kind of row-level gap an
11-search spot-check (as opposed to reading every row) can miss.

**Correction applied this session**: `leadership_drive` rationale
narrowed to rest only on the Divan Orchestra co-founding (a specific,
named, institutional fact); the unconfirmed PNC advisory claim removed.
Confidence lowered 0.38 -> 0.35 (still within the `inference` band,
0.20-0.49) to reflect one fewer supporting fact — labeled
`ERROR_CORRECTION` per the scoring-rubric's confidence-change policy,
following directly from the same source-verification finding already
used for the other two rows. Score (55) and `evidenceType` (`inference`)
unchanged — a single institutional fact still supports the low end of
the `inference` band, no rubric violation either before or after.

**18/18 rows now accounted for, 1 corrected.** Validator re-run:
`scored=18 avgConf=0.463 coverage=0.546 eligible=false` (was 0.464) — no
lifecycle change, `held` before and after.

### A.5 Babur — 18/18 rows audited (special caution: autobiography-dependent)

| Attribute | Provenance | Result |
|---|---|---|
| persistence | FH only | TRACEABLE (confidence 0.68 proportionate to a single strong documented instance, per rubric band 3) |
| creative_originality | FH + literary-scholarship characterization | TRACEABLE |
| adaptability | FH + uncited general battle historiography | TRACEABLE, see note below |
| risk_tolerance | FH (wine renunciation, confirmed convergence audit) | TRACEABLE |
| curiosity | FH | TRACEABLE |
| discipline | FH | TRACEABLE dual_edged |
| autonomy_need | FH | TRACEABLE |
| achievement_drive | FH | TRACEABLE |
| leadership_drive | FH/DV | TRACEABLE |
| decisiveness | FH + uncited general battle historiography | TRACEABLE, see note below |
| planning_orientation | FH + uncited general battle historiography | TRACEABLE, see note below |
| social_assertiveness | FH | TRACEABLE |
| impact_motivation | FH | TRACEABLE |
| persuasiveness | FH | TRACEABLE |
| detail_orientation | FH | TRACEABLE |
| mastery_orientation | DV | TRACEABLE |
| conflict_tolerance | FH/DV | TRACEABLE |
| cross_domain_range | FH | TRACEABLE |

**Note (not a correction)**: 3 rows (`adaptability`, `decisiveness`,
`planning_orientation`) rest partly on "the well-established
military-historical record" of Panipat (1526) and Khanwa (1527) — real,
uncontroversial, independently attested history (wagon-fort/artillery
tactics at Panipat are standard military history, not solely from the
Baburnama) — but the candidate file's own `sources` array lists only
Wikipedia and the Baburnama, no named military-history source. This is a
**citation-completeness gap, not a provenance failure**: the underlying
facts are genuine and easily independently verifiable, and all three
rows are already capped at `strong_inference`/moderate confidence
(0.44-0.58), not `documented`/high-confidence, which is the honest tier
given the file's own thin sourcing. Recommended (not required) cleanup
for a future session: add a named military-history source to the file's
`sources` array. No score/confidence change made — the existing
confidence levels are already proportionate to a single-primary-source
file.

**18/18 TRACEABLE.** Babur's evidentiary shape (near-total dependence on
his own memoir) is real and similar in kind to Ibn Battuta's, but
**not** classified `STRUCTURALLY_THIN` here or in the convergence audit's
matrix, because (a) confidence throughout is already capped
appropriately low (max 0.68, mostly 0.4-0.58) rather than claiming
`documented`-tier certainty a single source can't support, and (b) unlike
the Rihla, several of the most consequential claims (Panipat, Khanwa)
describe events independently, richly attested in outside historiography
even though this file doesn't cite that historiography by name — a
different, less severe defect than Ibn Battuta's near-total
zero-external-touch pattern.

### A.6 Ravi Shankar — 18/18 rows audited (special caution: artistic/persona)

| Attribute | Provenance | Result |
|---|---|---|
| discipline | IB (autobiography) | TRACEABLE |
| mastery_orientation | DV | TRACEABLE |
| proactive_agency | FH (his + Harrison's account) | TRACEABLE |
| cross_domain_range | DV | TRACEABLE |
| persuasiveness | DV | TRACEABLE |
| social_assertiveness | PR | TRACEABLE (corrected to Concert for Bangladesh, prior session) |
| achievement_drive | DV | TRACEABLE |
| adaptability | DV | TRACEABLE |
| curiosity | DV | TRACEABLE |
| impact_motivation | FH/IN | TRACEABLE |
| persistence | IB | TRACEABLE |
| autonomy_need | IB | TRACEABLE |
| detail_orientation | DV, explicitly self-capped re: anti-pattern | TRACEABLE |
| collaboration | DV | TRACEABLE |
| leadership_drive | IN | TRACEABLE |
| planning_orientation | DV | TRACEABLE |
| risk_tolerance | DV | TRACEABLE |
| creative_originality | DV | TRACEABLE |

**18/18 TRACEABLE.** Monterey/Bangladesh misattribution (found in the
prior convergence audit) is the only correction on this file and holds
up on re-check; no other row cites that anecdote a second time
uncorrected (checked directly — `adaptability`'s Monterey/Woodstock
mention is a separate, accurate claim about venues performed at, not the
tuning-anecdote).

### A.7 Deng Xiaoping — 18/18 rows audited (special caution: Tiananmen)

| Attribute | Provenance | Result |
|---|---|---|
| persistence | DV/IN (3 purges) | TRACEABLE |
| risk_tolerance | LB (Vogel) | TRACEABLE |
| proactive_agency | LB (Vogel) | TRACEABLE |
| independent_thinking | DV (cat maxim, confirmed) | TRACEABLE |
| adaptability | DV | TRACEABLE |
| discipline | LB | TRACEABLE |
| impact_motivation | FH | TRACEABLE |
| persuasiveness | LB (Vogel, 1984 Joint Declaration) | TRACEABLE |
| planning_orientation | DV | TRACEABLE |
| conflict_tolerance | LB | TRACEABLE dual_edged |
| achievement_drive | DV | TRACEABLE |
| autonomy_need | DV | TRACEABLE |
| leadership_drive | DV | TRACEABLE |
| social_assertiveness | DV | TRACEABLE |
| decisiveness | DV | TRACEABLE dual_edged |
| collaboration | DV | TRACEABLE |
| mastery_orientation | DV | TRACEABLE |
| detail_orientation | LB (Vogel) | TRACEABLE |

**18/18 TRACEABLE.** Tiananmen is scored honestly (`risk_tolerance`,
`conflict_tolerance`, `decisiveness` all `dual_edged`/`documented`,
episode named directly) rather than omitted or softened — consistent
with this project's political-candidate admission rule. Vogel's
Harvard/Belknap biography (the definitive scholarly source) backs every
`documented`-tier row.

### A.8 Bob Marley — 18/18 rows audited (special caution: artistic/persona)

| Attribute | Provenance | Result |
|---|---|---|
| risk_tolerance | PR (Smile Jamaica, confirmed) | TRACEABLE |
| persistence | DV | TRACEABLE |
| impact_motivation | PR (1978 handshake, confirmed) | TRACEABLE |
| autonomy_need | LB (White biography) | TRACEABLE dual_edged |
| creative_originality | DV | TRACEABLE |
| discipline | DV | TRACEABLE |
| conflict_tolerance | DV | TRACEABLE |
| persuasiveness | DV | TRACEABLE |
| social_assertiveness | PR (confirmed) | TRACEABLE |
| proactive_agency | DV/PR | TRACEABLE |
| adaptability | DV | TRACEABLE |
| independent_thinking | DV | TRACEABLE |
| achievement_drive | DV | TRACEABLE |
| collaboration | DV | TRACEABLE |
| curiosity | DV | TRACEABLE |
| leadership_drive | DV | TRACEABLE |
| detail_orientation | honest gap, explicitly conservative | TRACEABLE |
| mastery_orientation | DV | TRACEABLE |

**18/18 TRACEABLE.** 1976 shooting and 1978 handshake both independently
confirmed with added detail in the prior convergence audit; nothing new
found this pass to correct.

### A.9 Sebastião Salgado — 18/18 rows audited (special caution: artistic/persona)

| Attribute | Provenance | Result |
|---|---|---|
| adaptability | FH (Salt of the Earth documentary) + IN | TRACEABLE |
| discipline | FH | TRACEABLE |
| risk_tolerance | DV | TRACEABLE |
| impact_motivation | FH (own quoted words, confirmed) | TRACEABLE |
| collaboration | IN (Instituto Terra co-founding) | TRACEABLE |
| persistence | IN | TRACEABLE |
| autonomy_need | DV | TRACEABLE |
| curiosity | DV | TRACEABLE |
| proactive_agency | DV | TRACEABLE |
| detail_orientation | DV | TRACEABLE |
| achievement_drive | DV | TRACEABLE |
| resourcefulness | DV | TRACEABLE |
| deep_focus | DV | TRACEABLE |
| social_assertiveness | DV | TRACEABLE |
| independent_thinking | DV | TRACEABLE |
| planning_orientation | DV | TRACEABLE |
| mastery_orientation | DV | TRACEABLE |
| cross_domain_range | DV | TRACEABLE |

**18/18 TRACEABLE.** His own on-camera, first-person documentary
testimony (a genuinely different provenance type from a self-selected
written memoir — recorded, directed by an independent filmmaking team,
Wim Wenders + his own son) provides an unusually strong firsthand basis
for a contemporary figure; the Rwanda crisis-of-purpose account was
independently confirmed via his own quoted words in the prior audit.

### A.10 Haile Selassie — 18/18 rows audited

| Attribute | Provenance | Result |
|---|---|---|
| social_assertiveness | PR (League of Nations, confirmed+strengthened) | TRACEABLE |
| persistence | DV | TRACEABLE |
| impact_motivation | PR (Wollo famine, confirmed) | TRACEABLE dual_edged |
| independent_thinking | DV (1966 Jamaica visit) | **PROVENANCE_AMBIGUOUS, resolved without new research** |
| risk_tolerance | PR | TRACEABLE |
| adaptability | DV | TRACEABLE |
| autonomy_need | DV | TRACEABLE |
| persuasiveness | DV | TRACEABLE |
| discipline | DV | TRACEABLE |
| leadership_drive | DV | TRACEABLE |
| achievement_drive | DV | TRACEABLE |
| planning_orientation | DV | TRACEABLE |
| curiosity | DV | TRACEABLE |
| proactive_agency | DV | TRACEABLE |
| conflict_tolerance | DV | TRACEABLE |
| mastery_orientation | DV | TRACEABLE |
| detail_orientation | honest gap, explicitly conservative | TRACEABLE |
| collaboration | IN (OAU founding) | TRACEABLE |

**Finding on `independent_thinking`**: the 1966 Jamaica visit
"declined-to-affirm-divinity" anecdote is real but retold with varying
specificity across sources (some accounts describe a more equivocal,
diplomatic non-denial rather than a flat statement). This is a genuine
provenance ambiguity, not a fabrication. **Resolved using the row's own
existing evidence discipline, per instruction, before considering new
research**: the row is already scored at `strong_inference`/0.44
confidence, not `documented`/high-confidence — exactly the tier this
kind of contested-retelling anecdote should sit at per the rubric's
single-anecdote ceiling (§4). **No change made** — the existing hedge
already correctly reflects the ambiguity.

**18/18 accounted for, 0 corrections, 1 documented ambiguity resolved by
existing discipline.**

### A.11 Stephen Hawking — 18/18 rows audited (special caution: personal-life material)

| Attribute | Provenance | Result |
|---|---|---|
| persistence | IB (Jane Hawking's independent memoir) + FH | TRACEABLE |
| adaptability | DV | TRACEABLE |
| discipline | DV | TRACEABLE |
| achievement_drive | DV | TRACEABLE |
| persuasiveness | DV | TRACEABLE |
| curiosity | DV | TRACEABLE |
| autonomy_need | DV | TRACEABLE |
| social_assertiveness | DV | TRACEABLE |
| proactive_agency | IB (Jane Hawking) | TRACEABLE |
| risk_tolerance | DV | TRACEABLE |
| impact_motivation | DV | TRACEABLE |
| collaboration | DV | TRACEABLE |
| mastery_orientation | DV | TRACEABLE |
| planning_orientation | DV | TRACEABLE |
| detail_orientation | honest gap, explicitly conservative | TRACEABLE |
| conflict_tolerance | DV | TRACEABLE |
| leadership_drive | IN, explicit limited-evidence note | TRACEABLE |
| cross_domain_range | DV | TRACEABLE |

**18/18 TRACEABLE.** Re-confirmed directly: the second marriage's
disputed mistreatment allegations (investigated by police, not
prosecuted) are used in **zero** rows, in either direction — verified by
reading every row's rationale, not just trusting the provenance note.
This is the correct application of the safety rule against inferring
unproven behavior; nothing to fix here, worth naming as a case where the
discipline was already applied correctly.

### A.12 Ratan Tata — 18/18 rows audited (special caution: organizational/interpersonal)

| Attribute | Provenance | Result |
|---|---|---|
| decisiveness | PR+legal record (Mistry + Mumbai, confirmed+strengthened) | TRACEABLE dual_edged |
| risk_tolerance | PR | TRACEABLE |
| impact_motivation | DV/IN | TRACEABLE |
| discipline | DV | TRACEABLE |
| persistence | PR | TRACEABLE |
| conflict_tolerance | PR+legal record | TRACEABLE |
| proactive_agency | DV | TRACEABLE |
| social_assertiveness | PR (confirmed+strengthened) | TRACEABLE |
| achievement_drive | DV | TRACEABLE |
| leadership_drive | DV | TRACEABLE |
| resourcefulness | DV | TRACEABLE |
| autonomy_need | DV | TRACEABLE |
| planning_orientation | DV | TRACEABLE |
| adaptability | DV | TRACEABLE |
| collaboration | DV | TRACEABLE |
| persuasiveness | DV | TRACEABLE |
| mastery_orientation | DV | TRACEABLE |
| detail_orientation | honest gap, explicitly conservative | TRACEABLE |

**18/18 TRACEABLE.** Mistry removal and Mumbai attack personal response
both independently confirmed and strengthened in the prior convergence
audit; nothing new found to correct this pass.

### A.13 Exact totals (as required)

- **Total scored rows audited: 213** (18 x 11 candidates + 15 for Shirin Ebadi).
- **TRACEABLE: 212.**
- **TRACEABLE_BUT_OVERSTATED (found and corrected this session): 1**
  (Edward Said, `leadership_drive`).
- **PROVENANCE_AMBIGUOUS (resolved via existing evidence discipline, no
  research needed, no change required): 1** (Haile Selassie,
  `independent_thinking` — counted within the 212 TRACEABLE above, since
  the ambiguity was already correctly hedged and required no action).
- **UNSUPPORTED (removed/weakened): 0.**
- **Candidate files changed: 1** (`edward-said.json`).
- **Validator changes**: `edward-said` avgConf 0.464 -> 0.463 (18 scored,
  coverage 0.546 unchanged, `eligible=false` unchanged). No other
  candidate's computed eligibility affected. Full-corpus tally unchanged:
  `held` 121, `qa_passed` 61, 0 errors, 0 warnings.
- **Every one of the 12 Track A candidates' READY classification and
  `held` lifecycle status is unaffected.** No row was strengthened; the
  one correction made moved confidence down, consistent with this
  project's "don't search until a low scorer becomes eligible" discipline.

**The Track A provenance audit is complete**: every scored row across all
12 candidates has been read, classified by provenance type, and assigned
an audit result.

---

## B. Structural-thin candidate semantics — made explicit

**Finding: the repository does not yet define this term anywhere outside
the convergence-audit checkpoint that coined it.** No prior doc,
schema field, or code comment uses `KEEP_PRIMARY_DESPITE_CEILING`. So
this section defines it going forward rather than "discovering" an
existing definition.

### The binding rule

`KEEP_PRIMARY_DESPITE_CEILING` (as used in the convergence audit) and its
replacement terms below **never mean**: waive Protocol v1's evidence
standard, raise a `STRUCTURALLY_THIN` candidate's confidence/score,
treat roster-coverage value as behavioral evidence, or promote/normalize
a structurally-thin candidate as if the evidence ceiling had been
resolved.

They **only** mean: retain the primary's existing candidate
record/place in the working, unpromoted pool because no demonstrably
superior alternate has yet been identified — a statement about the
*search's* current state, not about the *evidence's* adequacy.

**Audit of the convergence audit's own actual usage**: re-read against
this rule, the prior session's `KEEP_PRIMARY_DESPITE_CEILING` for Ibn
Battuta did **not** violate it in practice — no score/confidence was
touched, `STRUCTURALLY_THIN` was left standing, nothing was promoted, and
the stated rationale was explicitly about alternate-pool inadequacy, not
evidence-standard waiver. But the label's *wording* is genuinely
ambiguous on its face (a future reader could misread "despite the
ceiling" as "the ceiling doesn't matter"), which is exactly what this
task's instruction anticipated. **Going forward, this project retires
`KEEP_PRIMARY_DESPITE_CEILING` as a label** and uses the three
unambiguous terms below instead, applied in §D:

| Term | Meaning |
|---|---|
| `SWAP_CANDIDATE_IDENTIFIED` | A specific alternate has been found that is both era/region/domain-plausible AND has a materially better evidence structure; recommend the swap (not executed this phase). |
| `KEEP_AS_WORKING_PLACEHOLDER_PENDING_BETTER_ALTERNATE` | No alternate found this pass clears the bar; the primary's slot stays open/tentative, its `STRUCTURALLY_THIN`/unscored status is unchanged and not treated as resolved, and the search is understood to continue in a future session. |
| `NO_EVIDENTIARILY_ACCEPTABLE_REPLACEMENT_FOUND` | Stronger than the above: this pass searched specifically and found nothing era/region/domain-plausible with acceptable evidence, not merely "didn't look hard enough." |

A `STRUCTURALLY_THIN` (or unscored/`STRUCTURALLY_THIN`) disposition
**remains a structural evidence limitation regardless of which of these
three terms applies** — none of the three change, soften, or reinterpret
that underlying finding.

---

## C. One narrow new-alternate sourcing pass

### C.1 Roster contribution actually being preserved (recovered, not invented)

No formal quota system exists in this repository (`docs/checkpoints/
roster.md` confirms no era/region quotas — only an informal, named
awareness that "West Asia remains under-represented"). The dimensions
below are the same informal ones the convergence audit itself already
used (era, region, domain, archetype) — not new criteria invented for
this phase.

- **Ibn Battuta's actual contribution**: medieval era (14th c.); North
  Africa/West Asia origin with a documented life spanning West Africa,
  East Africa, South/Southeast/East Asia; the roster's only
  exploration/travel-writing domain representative; `social_influencer`
  archetype via his enduring travel-literature influence.
- **Ashoka's actual contribution**: ancient era (3rd c. BCE); South Asia
  (Indian subcontinent) — currently one of only 4 ancient-era roster
  people at all, per the roster checkpoint's own note that this remains
  the thinnest era; politics/public-leadership domain;
  `organizational_leader` archetype; a genuinely foundational,
  civilization-shaping historical figure (administrative reform,
  religious patronage at empire scale).

### C.2 Existing candidate corpus checked first (not reinvented)

Before generating new names, checked the full 182-file
`data-pipeline/candidates/` directory (not just the 10-name pool from the
original selection-closure audit) for anyone already domain/era-adjacent
to either gap. Found two directly relevant, already-tried, already-thin
cases the new search should not repeat:

- **Marco Polo** — already a candidate file, `held`, **only 3 scored
  attributes**, coverage 0.10. Already tried for the exact
  exploration/travel-writing domain and found far worse than Ibn Battuta,
  not better. Excluded from the new shortlist on this basis, not
  re-litigated.
- **Chanakya** — already a candidate file, `held`, **only 6 scored
  attributes**, coverage 0.18. Already tried for the ancient-era South
  Asian political/strategic domain (he was Chandragupta Maurya's
  minister/strategist) and found thinner than Ashoka, not better.
  Excluded on the same basis.
- **Sun Tzu** — already a candidate file, `held`, only 3 scored
  attributes. Ancient-era military-strategy domain, but not South Asian
  and already far thinner than Ashoka. Not domain/region-adjacent enough
  to warrant inclusion, and already known-inadequate regardless.

Neither gap's existing 10-name alternate pool (Ho Chi Minh, Sukarno,
Chief Joseph, Suleiman the Magnificent, Anwar Sadat, Corazon Aquino,
Hannah Arendt, Cervantes, Norman Borlaug, Roald Amundsen — per the
convergence audit's own §4) contains anyone new to check; all 10 were
already ruled out there.

### C.3 Ibn Battuta — shortlist and preflight

The evidence problem to solve: near-total dependence on one
candidate-controlled, dictated narrative (the Rihla), with 20/21 scored
rows carrying zero external touch.

| Candidate | Era/region/domain fit | Preflight disposition |
|---|---|---|
| **Leo Africanus** (al-Hasan al-Wazzan, Q332790, c.1494-c.1554) | Early modern (adjacent bucket to medieval, same as this project's own Babur/Akbar era placement); Morocco/North Africa origin, life spanning North Africa + Renaissance Italy; travel-writing + diplomacy domain | **`STRONG_EVIDENCE_REPLACEMENT`** |
| **Rabban Bar Sauma** (c.1220-1294) | Medieval (13th c., closely matches Ibn Battuta's own century); born Khanbaliq (China)/Nestorian-Christian, traveled Mongol Ilkhanate to Western Europe — a genuinely different but domain-adjacent region/culture axis; diplomacy + exploration domain | `PLAUSIBLE_BUT_NEEDS_PACK` |
| **Evliya Çelebi** (Ottoman, 17th c.) | Early modern, later than medieval; West Asia/Ottoman region — reasonable regional fit; travel-writing domain, same genre as Ibn Battuta | `PLAUSIBLE_BUT_NEEDS_PACK` |
| **Usama ibn Munqidh** (1095-1188, Syria) | Medieval, West Asia — excellent era/region fit | `STRUCTURAL_RISK` |
| **Marco Polo** | Medieval, exploration domain | `REJECT_AS_REPLACEMENT` (already tried, worse) |

**Leo Africanus — why `STRONG_EVIDENCE_REPLACEMENT`**: verified this
session (2 targeted searches) that his baptism by Pope Leo X (6 January
1520, St Peter's Basilica) and his year of captivity in Castel
Sant'Angelo are documented **in Vatican records independent of his own
later writing** — a categorically different provenance type from
anything in Ibn Battuta's file, where 20/21 rows have zero external
touch. His later career (Arabic-teaching contemporaries in Rome, e.g.
Johann Albrecht Widmanstetter, who left their own independent accounts
of knowing him) offers additional non-self-authored witness potential.
His own major work (*Description of Africa*) still supplies the bulk of
what's known about his earlier life in North Africa, so this is not a
total solution — but it materially improves the witness-diversity
problem that is Ibn Battuta's specific, named defect. Wikidata QID
Q332790 verified live.

**Rabban Bar Sauma — why only `PLAUSIBLE_BUT_NEEDS_PACK`, not
`STRONG`**: verified this session that his European court visits are
independently corroborated by **institutional documentary record** on
the receiving end (a Pope Nicholas IV letter to Arghun Khan in the
Vatican archives; a 1289 Arghun-to-Philip-IV letter mentioning him;
England's Edward I dispatching a follow-up envoy, Geoffrey of Langley, to
the Ilkhanate afterward) — genuinely better than Ibn Battuta's
Barani-only, general-context-only corroboration. But this confirms the
*fact and timing* of his meetings, not necessarily rich
*interpersonal/behavioral* detail about him specifically — the same
category of limitation (institutional confirmation of context, not
person) partially present in Ibn Battuta's own Barani cross-check. Also,
his account survives via a Syriac community chronicle compiled after his
own dictation, a genuinely different (less purely self-controlled)
production process than the Rihla's — a real, if partial, improvement.
Needs a dedicated evidence pack before any scoring judgment.

**Evliya Çelebi**: 17th-century Ottoman bureaucratic record-keeping is
generally richer than 14th-century Delhi/Maldives administration, which
could plausibly provide better external corroboration of his documented
official postings — but this was not verified this session (out of
scope for the "narrow" pass instruction) and his primary source, the
Seyahatname, has the same single-dominant-narrative shape as the Rihla.
Flagged as worth a dedicated pack in a future session, not preflighted
further here.

**Usama ibn Munqidh — why `STRUCTURAL_RISK`**: excellent era/region fit,
but his *Kitab al-I'tibar* has the identical evidentiary shape as the
Rihla (one candidate-controlled retrospective memoir) with Crusader-era
chronicles corroborating only the general political/military
environment, not his specific personal conduct — the same Barani-class
problem Ibn Battuta already has, not an improvement on it.

### C.4 Ashoka — shortlist and preflight

The evidence problem to solve: excellent contemporaneous
policy/self-presentation evidence (edicts) and real archaeological
constraint at the policy level, but no independent source class
observing interpersonal/private/ordinary conduct.

| Candidate | Era/region/domain fit | Preflight disposition |
|---|---|---|
| **Chandragupta Maurya** (Q188541, r. c.321-297 BCE, Ashoka's own grandfather, founder of the same Maurya Empire) | Ancient, South Asia, politics/founding-leadership domain — as close an era/region/domain match as could exist | **`STRONG_EVIDENCE_REPLACEMENT`** |
| **Kanishka** (Kushan Empire, c.127-151 CE) | Ancient-adjacent, South/Central Asia, politics + religious-patronage domain (a real echo of Ashoka's own Buddhist-patron profile) | `REJECT_AS_REPLACEMENT` |
| **Samudragupta** (Gupta Empire, r. c.335-375 CE) | Ancient-adjacent, South Asia, politics domain | `STRUCTURAL_RISK` |
| **Porus/Puru** (opponent of Alexander at the Hydaspes, 326 BCE) | Ancient, South Asia, politics/military domain | `REJECT_AS_REPLACEMENT` |

**Chandragupta Maurya — why `STRONG_EVIDENCE_REPLACEMENT`**: verified
this session (2 targeted searches) that Megasthenes — the Seleucid
ambassador resident at his court c.302-298 BCE — is a **genuinely
independent foreign eyewitness**, not a court-commissioned chronicler,
and his surviving *Indica* fragments (quoted in later Greek/Roman authors
— Strabo, Diodorus, Arrian) describe *specific personal conduct*: his
documented fear of assassination (never sleeping in the same room or bed
on consecutive nights, food-tasters, frequent residence changes), his
daily working pattern (continuing to receive dispatches and meet envoys
even during grooming/massage), and his public appearance customs. **This
is exactly the evidence class Ashoka's record is missing** — an
independent, non-self-proclamatory observer describing ordinary personal
behavior, not policy. Additional source layers exist too: the
*Arthashastra* (administrative treatise traditionally attributed to his
minister Chanakya, authorship/dating contested by modern scholarship —
would need to be handled with the same care Track D gave the
*Ashokavadana*, i.e. not treated as automatically reliable just because
it's early) and later Jain devotional tradition (the sallekhana/ascetic-
death legend at Shravanabelagola) — genuinely legendary material that,
like the *Ashokavadana*, would need to be excluded from personality
scoring, not imported. Wikidata QID Q188541 verified live. Preserves
Ashoka's roster contribution almost exactly (ancient era, South Asia,
founding-emperor political leadership) and arguably strengthens it (he
founded the empire Ashoka inherited and expanded).

**Kanishka — why `REJECT_AS_REPLACEMENT`, not merely weaker**: verified
this session that his evidentiary base is coins, inscriptions, and
Chinese Buddhist-pilgrim accounts (principally Xuanzang) written roughly
**five centuries after his death** — a worse version of Ashoka's own
problem (proclamation/legend, no independent contemporaneous personal
observation), not a solution to it. Scholarship itself describes his
personal-life detail as "sparse." Would very likely fail to reach even
Ashoka's own (unscored, but rich-for-policy) evidence floor.

**Samudragupta — why `STRUCTURAL_RISK`**: known almost entirely through
the Allahabad Pillar inscription, a eulogy/prashasti composed by his own
court poet Harishena — the identical self-presentation-genre problem as
Ashoka's edicts, on a single inscription rather than Ashoka's much wider
edict program. Not an improvement.

**Porus — why `REJECT_AS_REPLACEMENT`**: the one genuinely rich,
independent-observer episode (the Alexander-Porus exchange, reported by
several Greek historians) is a single encounter, not a sustained,
multi-domain record; almost certainly cannot support 18 scoreable
attributes at all, let alone at better confidence than Ashoka's own file
would have.

### C.5 Primary-vs-alternate comparison (evidence structure vs. roster contribution, kept separate)

**Ibn Battuta vs. Leo Africanus**:

| Axis | Ibn Battuta (primary) | Leo Africanus |
|---|---|---|
| Evidence structure | 20/21 rows zero external touch; single dictated narrative | Real independent Vatican/institutional record for a major life episode; own writing still carries most of the earlier-life detail |
| Roster contribution | Medieval era; North Africa/West Asia + broad Islamic-world travel; sole exploration-domain representative | Early modern (adjacent, not identical, era bucket); North Africa origin preserved; adds a Renaissance-crossing-cultures dimension Ibn Battuta doesn't have; travel-writing domain preserved |
| Net read | Real, honest ceiling; roster role well-defined | Materially better evidence structure; roster role mostly preserved with a modest era shift, not a clean swap |

**Ashoka vs. Chandragupta Maurya**:

| Axis | Ashoka (unscored) | Chandragupta Maurya |
|---|---|---|
| Evidence structure | Rich contemporaneous policy/epigraphic record; zero independent source observing interpersonal/private conduct | Genuine independent foreign-eyewitness behavioral detail (Megasthenes) plus an administrative-treatise layer plus (flaggable) later legendary material |
| Roster contribution | Ancient era; South Asia; founding-adjacent imperial leadership; religious-patronage angle | Ancient era (same or earlier); South Asia (same empire); founding emperor (the actual founder, one generation earlier); loses the specific Buddhist-patronage angle Ashoka uniquely offers |
| Net read | Real, historically important, but currently unscoreable under this project's standard | Clearly closes the specific evidentiary gap; roster contribution preserved almost exactly, with one specific facet (Buddhist religious patronage) not carried over |

---

## D. Recommended next action

### Ibn Battuta: `KEEP_AS_WORKING_PLACEHOLDER_PENDING_BETTER_ALTERNATE`, with `SWAP_CANDIDATE_IDENTIFIED` flagged for the next phase to actually pursue

Leo Africanus clears the bar for "materially better evidence structure"
and preserves most of the roster contribution, but era placement (early
modern rather than strictly medieval) and the fact that his own earlier-
life detail still depends heavily on his own later writing mean this
should be pursued as a genuine candidate-build in the next reviewed
phase, not declared a done swap here (per this phase's explicit stop
condition: no scoring, no candidate file creation, no promotion). **Best
replacement candidate: Leo Africanus (Q332790). Backup: Rabban Bar Sauma**
(needs a dedicated evidence pack first; institutional corroboration
confirmed but interpersonal-behavioral depth unverified).

### Ashoka: `SWAP_CANDIDATE_IDENTIFIED`

Chandragupta Maurya (Q188541) directly and specifically solves the named
evidentiary gap (independent eyewitness behavioral observation, missing
for Ashoka) while preserving almost the entire roster contribution
(ancient era, South Asia, founding imperial leadership) — the single
clearest result of this phase's search. **Best replacement candidate:
Chandragupta Maurya. No backup needed**; Kanishka, Samudragupta, and
Porus were all evaluated and rejected as not solving the same problem
or not supporting a scoreable profile at all.

**Neither swap is executed in this phase.** Per the stop condition: no
candidate file was created for either alternate, no Protocol v1 scoring
was performed, no one was promoted, and Ashoka/Ibn Battuta's own status
(unscored/`STRUCTURALLY_THIN` and `held`/`STRUCTURALLY_THIN`
respectively) is unchanged.

---

## E. Exact repository delta

**Candidate file modified this session (1):**
- `data-pipeline/candidates/edward-said.json` — `leadership_drive` row
  narrowed (PLO/PNC advisory claim removed, confidence 0.38 -> 0.35,
  score/evidenceType unchanged), labeled `ERROR_CORRECTION`.

**Candidate files touched in prior roster-expansion sessions, unchanged
this session (28 — Track A/B/C/D, still appearing in `git status` because
nothing has been committed yet):** all files listed in the convergence
audit's own §7 except `edward-said.json` (now touched again, this
session, as above).

**No candidate file created for Leo Africanus, Rabban Bar Sauma,
Chandragupta Maurya, or any other alternate** — per the stop condition,
this phase performed identity/evidence-structure preflight only, no
scoring.

**New checkpoint file created this session (1):**
- `docs/checkpoints/roster-expansion-125-provenance-closure-and-alternate-search-DRAFT.md`
  (this file).

**Untracked checkpoint files from earlier sessions, not touched this
session (9):** `roster-expansion-125-candidate-audit-DRAFT.md`,
`roster-expansion-125-selection-closure-audit-DRAFT.md`,
`roster-expansion-125-held-candidate-evidence-audit-DRAFT.md`,
`roster-expansion-125-evidence-deepening-batch1-DRAFT.md`,
`roster-expansion-125-evidence-deepening-batch2-DRAFT.md`,
`roster-expansion-125-track-c-structural-ceiling-DRAFT.md`,
`roster-expansion-125-track-d-evidence-packs-DRAFT.md`,
`roster-expansion-125-track-a-first-scoring-DRAFT.md`,
`roster-expansion-125-convergence-audit-DRAFT.md`.

**`next-env.d.ts` confirmed NOT touched this session or any prior
roster-expansion session** — re-verified directly via `git status` before
and after this session's edit.

**Cumulative across the whole roster-expansion series: 29 candidate
files touched (14 modified in Track B/C + 15 created in Track D/A, 4 of
the 15 also edited on provenance review across two sessions — Ravi
Shankar, Edward Said x2, José Rizal), 1 unrelated pre-existing file left
untouched, 10 checkpoint/report files untracked in git.** Nothing
committed.

## F. Phase 4 — 30-primary matrix

**Not regenerated in full.** Per instruction, this step is conditional on
the Track A audit changing any candidate's score/status. The only
change this session (Edward Said's `leadership_drive` confidence,
0.38->0.35) moved his file's own `avgConf` by 0.001 (0.464 -> 0.463) with
**no** change to `eligible` (still `false`), lifecycle (`held`), or
evidence-adequacy disposition (still "adequately evidenced, corrected on
review") — the convergence audit's 30-row matrix (§2) is otherwise
unaffected and its reconciled totals (lifecycle: 1 `qa_passed` + 28
`held`/has-file + 1 pre-score/no-file = 30; evidence adequacy: 26
adequate + 2 `IMPROVED_BUT_CEILING_REMAINS` + 2 `STRUCTURALLY_THIN` = 30)
still hold exactly. Only the matrix's Edward Said row's avgConf figure
is stale by 0.001; noted here rather than reprinting all 30 rows for a
one-cell change.

---

## G. Validation performed this turn

- `node -e "JSON.parse(...)"` on `edward-said.json` — valid JSON.
- `corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts` —
  full corpus (182 candidates), run once after the correction: **0
  errors, 0 warnings**. Status tally unchanged: `held` 121, `qa_passed`
  61. `edward-said`: `scored=18 avgConf=0.463 coverage=0.546
  eligible=false` (was 0.464) — no lifecycle change.
- Not run: `tsc`/`vitest`/`next build` — this session touches only
  `data-pipeline/candidates/edward-said.json` and documentation.
- No candidate was reopened, rescued, padded, or had its confidence
  raised — the one correction made moves a score down (confidence
  0.38->0.35), consistent with this project's discipline.

## H. Stop condition confirmed

1. Every Track A scored row (213 of 213, across all 12 candidates) has
   an auditable provenance result — 212 TRACEABLE, 1
   TRACEABLE_BUT_OVERSTATED (found and corrected), 0 UNSUPPORTED.
2. The 1 required correction (Edward Said `leadership_drive`) is applied
   and validated; live validator confirms 0 errors/0 warnings, no
   lifecycle change.
3. `KEEP_PRIMARY_DESPITE_CEILING` semantics are made explicit (§B) and
   retired in favor of three unambiguous terms for future use.
4. One narrow new-alternate search is complete for both Ibn Battuta
   (Leo Africanus identified, backup Rabban Bar Sauma) and Ashoka
   (Chandragupta Maurya identified, no backup needed).
5. Serious alternates are evidence-preflighted (§C.3/§C.4) without
   creating any candidate file or score.
6. One recommendation is produced for each structural gap (§D):
   Ibn Battuta `KEEP_AS_WORKING_PLACEHOLDER_PENDING_BETTER_ALTERNATE`
   with a specific swap flagged for next-phase pursuit; Ashoka
   `SWAP_CANDIDATE_IDENTIFIED`.
7. The exact repository delta is reported (§E) — `next-env.d.ts`
   confirmed untouched.

**No swap performed. No candidate file created for any alternate. No one
scored. No one promoted. Nothing committed.** Stopping here for the next
reviewed phase, which per the original instruction may execute the
approved replacement candidate(s), score them under Protocol v1, and
perform final roster QA.
