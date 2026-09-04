# Roster Expansion 125 — Final Alternate Evidence-Pack Phase (DRAFT)

**Status: RESEARCH/REPORTING ONLY, NOT COMMITTED.** No candidate JSON
files created or edited this session. No roster/editorial/portrait
files touched, no `src/` changes, no one scored, no swap performed,
nothing committed. `next-env.d.ts` confirmed untouched (still only its
pre-existing, unrelated 2-line diff).

This phase re-tested the prior session's alternate-search conclusions
(Chandragupta Maurya, Leo Africanus, Rabban Bar Sauma) against a much
stricter standard: does independently-observed-event evidence actually
translate into candidate-specific, multi-domain *behavioral* evidence,
or does it just look better on the surface than Ashoka's/Ibn Battuta's
own well-documented ceilings? **The honest answer, reached through
actual source-transmission research rather than by re-asserting the
prior conclusion, is: less than the prior session claimed, for all
three.** All three alternates are downgraded from their prior
dispositions. Full reasoning below.

---

## 1. Reporting cleanup

### 1.1 Track A provenance wording — corrected formulation

The prior checkpoint's phrasing risked implying the corrected row was
simultaneously part of the "212 TRACEABLE" count. Corrected formulation,
for use everywhere this number is cited going forward:

> **213 scored rows were audited across the 12 Track A candidates. 212
> were traceable without correction. 1 provenance defect was found (Edward
> Said's `leadership_drive` row, which still cited a PLO/Palestinian
> National Council advisory-role claim already removed from two sibling
> rows in an earlier session) and was corrected this turn, labeled
> `ERROR_CORRECTION` per the scoring-rubric's confidence-change policy —
> not `NEW_EVIDENCE`, since nothing new was learned about Said, and not
> `RUBRIC_CORRECTION`, since no rubric rule was misapplied; the row simply
> hadn't been updated when the other two were. 0 rows remain unresolved or
> unsupported.**

The corrected row is counted separately, not folded into "212
TRACEABLE" either before or after its correction — before correction it
was `TRACEABLE_BUT_OVERSTATED`, after correction it is traceable-as-
corrected, which is a different status from a row that required no
touch at all. **213 = 212 (no correction needed) + 1 (corrected this
turn) + 0 (unresolved/unsupported).**

### 1.2 Corpus lifecycle wording — validator-domain distinction made explicit

Re-ran the validator this session to get exact, current numbers (no
candidate data changed by this read):

```
182 candidate-file status lines total: 121 [held], 61 [qa_passed]
181 of those 182 lines are followed by a computed `eligibility:` line
1 (sitting-bull) is not
```

**Precise formulation for use going forward:**

> The corpus lifecycle tally — **121 `held`, 61 `qa_passed`** — is a
> direct tally of the `status` field across all 182 candidate JSON files
> in `data-pipeline/candidates/`. It is **not** a count of validator-
> emitted eligibility decisions. The validator (`validateCandidates.ts`)
> only computes and prints an `eligibility: ...` line for a candidate
> when `rowIsScoreable(c)` is true (`Object.keys(c.rows ?? {}).length >
> 0`). **`sitting-bull.json` has `rows: {}` — a deliberate, early,
> pre-score `held` (per its own `holdReason`: the standard biography is
> oral-history-derived from ~40 years after his death, and even his
> birth location and remains' identity carry disputed provenance,
> so scoring was never attempted) — so the validator emits exactly
> **181** eligibility decisions across the 182-file corpus, not 182.**
> This is the same structural exception first identified and corrected
> in the Track C checkpoint (the 167-vs-166 accounting discrepancy at
> that corpus size); it persists unchanged at the current 182-file size
> and applies to no other candidate. No lifecycle change is made or
> authorized by this clarification — it is a wording fix only.

**Validation note**: this section required only a read-only validator
run (confirmed 0 errors, 0 warnings, tally unchanged: `held` 121,
`qa_passed` 61) — no candidate data was touched, so no candidate file
needed re-validation after an edit. Per instruction, the validator was
not re-run a second time "merely for ceremony" once this number was
confirmed.

---

## 2. Alternate-search conclusions reclassified as preliminary

Per instruction, before any deeper pack: Chandragupta Maurya, Leo
Africanus, and Rabban Bar Sauma are all re-labeled `PLAUSIBLE_BUT_NEEDS_PACK`
(the repository's own term from the Track D evidence-pack process,
reused here rather than inventing a new one) pending the packs below.
Bar Sauma specifically is evaluated at the same depth as Leo, not as a
nominal backup, per instruction §5.

---

## 3. Chandragupta Maurya evidence pack (Ashoka alternate)

### 3.1 Megasthenes provenance audit — the load-bearing question

**The prior session's core claim was that Megasthenes supplies
independent, candidate-specific behavioral detail (fear of assassination,
daily routine) that Ashoka's record categorically lacks. This session
tested that claim directly against the primary text, not against
secondary paraphrase, and found it materially overstated.**

**Transmission chain, confirmed this session**: Megasthenes' own
*Indica* (a 4-book account written after his embassy to Chandragupta's
court, c. 302-298 BCE) does not survive at all. Everything attributed to
him is a fragment or paraphrase embedded in later authors — principally
Strabo (*Geography*, early 1st c. CE), Diodorus Siculus (*Bibliotheca
historica*, 1st c. BCE, who paraphrases Megasthenes-derived material
without ever naming him), Arrian (*Indica*, 2nd c. CE), and more
sparsely Pliny and Aelian. **This means every one of these later authors
is a *transmitter* of one lost original account, not an independent
second witness** — a structurally important distinction the prior
session's framing blurred. Multiple ancient citations of the same
underlying Megasthenes passage do not multiply the number of behavioral
witnesses; there is exactly one original observer (Megasthenes himself)
for anything specific to the Mauryan court, surviving only in filtered,
possibly-altered later paraphrase.

**The specific "assassination fear" passage, checked directly against
the primary text (Strabo, Book XV, §55, LacusCurtius edition)**: the
passage reads "the king does not sleep in daytime; and even at night he
is forced to change his bed from time to time because of the plots
against him," together with detail about armed female attendants and
palace guards. **Confirmed directly this session: this passage names
neither Sandrocottus nor Chandragupta. It is phrased generically as "the
king" ("ho basileus"), part of Megasthenes' broader ethnographic account
of Mauryan royal custom.** The nearby §53, by contrast, *does* name
Sandrocottus specifically — reporting that in "the camp of Sandrocottus,"
among forty thousand men, reported thefts never exceeded two hundred
drachmae, a specific, real, candidate-named administrative/behavioral
fact (not merely achievement or reputation) about military discipline
under his direct command.

**Honest reading, stated precisely**: Megasthenes' embassy was
specifically to Chandragupta's court, so a modern reader can reasonably
infer the "king" in §55 refers to him — and most textbooks and popular
sources do exactly that, presenting it as an established fact about
Chandragupta personally. But the primary fragment itself does not make
that identification explicit, and generalized "customs of Indian kings"
material appears elsewhere in the same Megasthenes-derived material
(e.g., the extensive caste/social-structure material, and — checked this
session — an entirely separate, non-Chandragupta-specific king-list of
"153 kings over 6,042 years" mythological chronology also transmitted
under Megasthenes' name). **This is exactly the "candidate-specific
versus generic-king evidence" ambiguity this task instructed me to
resolve rather than assume away, and it does not resolve cleanly in
Chandragupta's favor.** Under this project's own scoring-rubric
discipline (§2, "a plausible-but-not-directly-evidenced reading" =
`inference`, not `documented`), the assassination-fear material — the
single richest personality-relevant anecdote in the entire Chandragupta
case — would have to be scored at `inference` tier at best, not the
`documented`-tier treatment the prior session implicitly assumed when
calling this "specific personal conduct... categorically missing" for
Ashoka.

### 3.2 Behavioral coverage test, by domain

| Domain | Evidence found | Provenance type | Assessment |
|---|---|---|---|
| Response to political threat | Assassination-precaution passage (§3.1) | Megasthenes via Strabo, but generic "the king," not name-specific | Weak — inference-tier at best on candidate-specificity grounds |
| Relations with advisers/subordinates | Chanakya (Kautilya) as minister/strategist | *Mudrarakshasa*, a Sanskrit political drama composed 300-700 CE — 600-1,000 years after Chandragupta | Weak — later dramatized literary retelling, not contemporary |
| Treatment of rivals (Nanda overthrow) | Overthrow of the Nanda dynasty, c. 323-321 BCE | Greek sources (Justin, Plutarch) only "hint" at it; full narrative comes from the *Mudrarakshasa* and the *Vishnu Purana* (undated) | Weak — verified this session that even the World History/scholarly consensus describes this as "little known for certain," reconstructed from centuries-later fragments |
| Negotiation/diplomacy | The 303 BCE Seleucus treaty (territory for Seleucus, 500 elephants to Seleucus, a marriage alliance) | **Corroborated across 5 ancient authors** (Justin, Appian, Strabo, Plutarch, Orosius) | Moderate — genuinely multi-attested, but confirms treaty *terms* (an institutional/outcome fact), not Chandragupta's personal negotiating conduct or temperament; the 5 authors likely share deeper common Hellenistic-historian ancestry (e.g. Hieronymus of Cardia), so true independence is less than "5 witnesses" suggests, though still more redundant than Ibn Battuta's single-source problem |
| Adaptation during rise to power | Same as "treatment of rivals" above | Same sources | Weak, same reason |
| Administrative decision-making | Military-camp discipline/low-theft-rate under his command (Strabo §53, **explicitly names Sandrocottus**) | Megasthenes via Strabo, name-specific | **The single strongest row in this entire pack** — genuinely candidate-specific, from an independent contemporary observer, describing actual conduct-adjacent administrative outcome, not proclamation |
| Restraint/escalation | Not found this session | — | No evidence located |
| Interpersonal conduct | Palace-attendant/guard customs (§3.1) | Generic "the king," not name-specific | Weak, same issue as assassination-fear material |
| Abdication/late-life decisions | Digambara Jain tradition: abdicated, became an ascetic under Bhadrabahu, died by *sallekhana* (ritual fasting) at Shravanabelagola | **Disputed, and not merely as "later legend."** Verified this session: modern scholarship (Jeffery D. Long and others) notes the identification is **actively contested** — some Digambara variants describe this happening to *Samprati Chandragupta*, Ashoka's own grandson and Chandragupta Maurya's great-great-grandson, not Chandragupta Maurya himself; the Shravanabelagola inscriptions do not explicitly name "Chandragupta Maurya the emperor"; and Svetambara Jain sources dispute the entire Bhadrabahu-travels-south narrative as an anachronistic later invention | **Worse than merely legendary** — this is not just late material requiring the same caution given the *Ashokavadana* (Track D §4), it is material with a live, unresolved scholarly dispute about *which person it is even about*. Cannot be used for personality scoring at all under this project's evidence standard, not even at low confidence. |
| Contradictions across traditions | Digambara vs. Svetambara disagree on Bhadrabahu's location/travels; Greek sources claiming Chandragupta held "the whole of India" are independently flagged by modern historians as exaggeration | Cross-tradition | A real, honestly-documented contradiction — informative in the way this project's rubric treats contradictions (§5), but underscores how much of the record is contested rather than settled |

### 3.3 Structural-risk items found, not present in the prior session's writeup

1. **The single richest anecdote (assassination-precaution material) is
   not explicitly candidate-named in its primary source** — a real
   attribution gap between what popular/secondary sources casually
   assert and what the surviving fragment actually says.
2. **The personality-richest late-life material (Jain asceticism/
   sallekhana) carries a live, unresolved scholarly dispute about
   whether it concerns Chandragupta Maurya at all**, as opposed to his
   great-grandson — a person-identity risk, not merely a genre-reliability
   risk.
3. **The best-attested material (the Seleucus treaty) is institutional/
   outcome-level**, confirming what was agreed, not how Chandragupta
   conducted himself in reaching it — the same category of limitation
   (context confirmed, personal conduct not) that Barani's chronicle
   provided for Ibn Battuta and that this project already treats as
   insufficient on its own.
4. **The rise-to-power/Nanda-overthrow and Chanakya-relationship
   material — intuitively the richest possible source of interpersonal/
   strategic-conduct evidence — is the *weakest* attested domain**,
   resting on a Sanskrit drama written centuries later, not contemporary
   witness.

### 3.4 Disposition

**Not `STRONG_EVIDENCE_REPLACEMENT`** — the prior session's verdict does
not survive this pack. Chandragupta trades Ashoka's specific problem
(self-proclamation/legend, no independent observer of ordinary conduct)
for a *different*, also serious set of problems: a single external
witness surviving only in fragmentary, partly-generic paraphrase; a
genuinely disputed identity question on his personality-richest late-life
material; and a rise-to-power narrative that is, if anything, less well
attested than Ashoka's own edicts are for policy.

**Not `STRUCTURAL_RISK`/`REJECT_AS_REPLACEMENT` either** — real,
genuine advantages over Ashoka exist and were confirmed directly against
primary text, not assumed: an actual independent, non-self-interested
foreign observer existed and left at least one clean, candidate-named,
non-proclamation administrative fact (the camp-discipline detail), and
the Seleucus treaty is multiply, if not fully independently, attested.
This is meaningfully different in kind from Ashoka's record, which has
*no* comparable non-self-authored, non-legendary personal-conduct
material at all.

**Disposition: `PLAUSIBLE_BUT_NEEDS_MORE`.** A future dedicated evidence
pack (not full scoring) would need to: (a) establish, via classical-
studies scholarship rather than assumption, whether Strabo §55's "the
king" is defensibly read as referring to Chandragupta specifically given
its context within the Prasii-kingdom section Megasthenes wrote about
his own embassy; (b) search specifically for any *other* Sandrocottus-
named (not generic-king) fragments beyond the one already found in §53;
(c) determine whether the Seleucus-treaty material can be pushed past
institutional-outcome level into anything about his personal conduct in
negotiation; (d) decide, following this project's own *Ashokavadana*
precedent, whether the Nanda-overthrow/Chanakya material can be used at
all given its centuries-later dramatized provenance, or must be excluded
entirely. Only after that work would a `STRONG_EVIDENCE_REPLACEMENT` or
`REJECT_AS_REPLACEMENT` call be honestly answerable.

---

## 4. Leo Africanus evidence pack (Ibn Battuta alternate)

### 4.1 Source map

| Source class | What it covers | Independent of Leo's own account? |
|---|---|---|
| Leo's own writing (*Della descrittione dell'Africa*, published 1550 via Ramusio) | The overwhelming majority of what is known about his earlier life, travels, and self-presentation | No — self-authored |
| Vatican/papal institutional record | His baptism by Pope Leo X, 6 January 1520, St Peter's Basilica; his ~1 year of captivity in Castel Sant'Angelo beforehand | **Yes** — genuinely independent, institutional, confirmed this session |
| Johann Albrecht Widmanstetter's 1555 preface (to his own Syriac New Testament translation) | The claim that Leo returned to Tunis and to Islam after Rome was sacked in 1527 | Partially independent (Widmanstetter was a real, separately-documented contemporary Orientalist who sought Leo out to learn Arabic per a 1532 suggestion from Cardinal Aegidius) but written **~28 years after** the events it describes, and it is not established this session that Widmanstetter had firsthand access to Leo's actual fate versus relaying secondhand report |
| Giovanni Battista Ramusio's later editions | Varying, contradictory claims — one edition states Leo died in Rome before 1550, contradicting Widmanstetter's Tunis/Islam account | Independent of Leo, but internally contradicts the other secondhand source |
| Modern scholarly reconstruction (Natalie Zemon Davis, *Trickster Travels*, 2006 — the definitive modern biography) | Contextual/biographical synthesis | Not independent evidence in itself — synthesizes the above |

### 4.2 Event verification vs. behavioral observation — tested directly, per instruction

The Vatican baptism record **proves the event occurred**: a specific
person, captured, held for roughly a year, then baptized by the Pope
himself on a specific date. Verified this session as institutionally
documented, independent of Leo's own writing. **It does not, by itself,
establish**:
- **Motive or voluntariness** — was this a sincere conversion, a
  survival strategy under captivity, or something in between? No source
  found this session settles this; it is a live interpretive question in
  the scholarship, not a documented fact.
- **Coping/adaptation style** — how he *behaved* during a year of
  captivity is not documented; only the outcome (conversion) is.
- **Interpersonal conduct** — nothing found this session describes how
  he treated or was treated by specific named individuals during this
  episode, unlike the Bar Sauma/Yahballaha material found in §5.

### 4.3 Genuinely new, significant finding: the modern scholarly consensus itself flags this evidentiary thinness

Checked reviews of Davis's *Trickster Travels* (the field's own
definitive treatment). Independent scholarly review (H-Net/Ooghe, and
others) explicitly criticizes the book for relying on "lengthy excurses
on matters of politics, history, culture, and literature" that
"eventually become increasingly more distanced from both the factual
data and from the original topic" — **a direct, published, professional
historian's acknowledgment that the *direct* evidentiary record about
Leo Africanus specifically is thin enough that even the best modern
biography leans heavily on contextual speculation to fill it.** This is
not this session's own judgment; it is the state of the field.

**A second, independently damaging finding**: checked this session that
specialists comparing Leo's own *Description of Africa* against other
period evidence found a genuine mixed verdict — "some claimed he gave
convincing, precious detail on little-known societies and kingdoms,
others that he was reporting tall stories picked up in Timbuktu and had
never travelled beyond its borders." **This is a live, unresolved
authenticity dispute about his own primary self-authored source** —
structurally the same category of problem Ross Dunn identified for Ibn
Battuta's China chapters (Track C §4), not a clean improvement on it.

### 4.4 Behavioral coverage test, by domain

| Domain | Evidence found | Assessment |
|---|---|---|
| Diplomacy/travel | His own account of diplomatic missions for the Wattasid sultanate of Fez before capture | Self-authored only |
| Captivity/forced displacement | Vatican record of the fact and duration of captivity | Institutional, event-level only — no behavioral detail during captivity found |
| Conversion/baptism circumstances | Vatican baptism record | Event-level only; motive/voluntariness unresolved, live interpretive dispute in the field |
| Patronage relationships (Pope Leo X, Roman scholarly circles) | Widmanstetter's account of Leo teaching Arabic in Rome | Independent, but describes role/activity, not interpersonal conduct in detail |
| Intellectual/literary work | *Description of Africa* | Self-authored; specialists dispute reliability of some content |
| Navigation of Christian/Muslim environments | The full arc of capture -> conversion -> later reported reconversion | Assembled from contradictory secondhand accounts (Widmanstetter vs. Ramusio's own conflicting editions), not a settled record |
| Identity/status decisions | Same as above | Same contradiction problem |
| Conflict | Not found this session | No evidence located |
| Adaptation | Inferable only from the outline of events, not from any source describing his actual adaptive behavior | Would require inference well beyond what the rubric's `inference` tier is meant to support |
| Later-life choices | Actively contested — Rome, Tunis, and date of death all disputed across sources | Genuine, documented contradiction, but leaves almost nothing usable at the "documented decision" level |

### 4.5 Structural-risk items found, not present in the prior session's writeup

1. The one clean independent-record advantage (Vatican baptism) is
   real but proves only an event, exactly as this task's own framing
   warned — it does not license any of the personality inferences
   (motive, coping style, conviction, autonomy) the prior session's
   optimistic read implicitly reached toward.
2. The best modern scholarly biography is explicitly critiqued in
   print for relying on speculative contextual excursus due to genuine
   source scarcity — a field-level admission, not this session's opinion.
3. Leo's own primary written source has a live, unresolved authenticity
   dispute among specialists (invented detail vs. genuine reporting),
   comparable to or worse than Ibn Battuta's already-flagged China-
   chapter embellishment problem.
4. The later-life record (the part that would supply any coping/
   identity/conviction-relevant material) is not merely thin but
   actively contradictory across the only two secondhand sources that
   address it at all.

### 4.6 Disposition

**Not `STRONG_EVIDENCE_REPLACEMENT`.** The institutional record is real
and is a genuine structural advantage Ibn Battuta's file entirely lacks
— but it establishes an event, not behavior, exactly as warned, and
everything beyond that single anchor point is either self-authored (with
a live authenticity dispute) or thin/contradictory secondhand report.

**Disposition: `PLAUSIBLE_BUT_NEEDS_MORE`.** The Vatican-record anchor
and Widmanstetter's independent (if late and possibly secondhand)
testimony are genuinely more than Ibn Battuta has, but a defensible
`STRONG` call would require locating additional independent, behavior-
level (not event-level) sources — e.g., correspondence from any of his
named Roman contemporaries beyond Widmanstetter's single preface, or a
period record of his conduct during captivity — none of which surfaced
this session.

---

## 5. Rabban Bar Sauma evidence pack (Ibn Battuta comparator, evaluated at equal depth)

### 5.1 Source map

| Source class | What it covers | Independent of Bar Sauma's own account? |
|---|---|---|
| *History of Mar Yahballaha and Rabban Sauma* (composed 1317-1319, anonymous East Syriac author) | The full double-biography: Bar Sauma's early monastic life, his mentorship of Markos (the future Patriarch Yahballaha III), their joint pilgrimage attempt, and Bar Sauma's later European embassy | **Genuinely mixed, and this matters.** Verified this session: the work's own modern editors (Borbone) describe the anonymous author as having personally been "an eyewitness of much of what he relates" for the earlier material, but for the European mission specifically, the author "was able to make use of Sauma's diary and indeed reproduces it verbatim at times." So: **third-party-witnessed for the earlier/monastic material; self-authored-diary-embedded for the European leg.** |
| Vatican archival letter (Pope Nicholas IV to Arghun Khan) | Confirms diplomatic contact occurred | Independent, institutional |
| Arghun Khan's 1289 letter to Philip IV of France | Mentions Bar Sauma's mission | Independent, diplomatic-institutional |
| English court record (Edward I dispatching Geoffrey of Langley to the Ilkhanate in 1291, following Bar Sauma's visit) | Confirms the meeting had a documented downstream diplomatic effect | Independent, institutional |
| Later Syriac ecclesiastical tradition | Preserves and transmits the 1317-1319 History | Not a separate witness, a later copying tradition |

### 5.2 Do the independent encounters constrain conduct, or just confirm occurrence? — tested directly, per instruction

The Vatican letter, Arghun's letter, and Edward I's follow-up envoy
**confirm that specific meetings happened, with approximate dates and
diplomatic content** — the same event-level, not behavior-level,
limitation found for Leo Africanus's baptism record and previously for
Ibn Battuta's Barani cross-check. **This is not a difference from the
other two cases — it is the same category of limitation.**

**Where Bar Sauma's file structurally differs, and improves on both
Ibn Battuta and Leo**: the *earlier* material (before the European
mission) is not self-narrated at all — it is witnessed by a third-party
author with access to the community's own memory, and it includes a
specific, mutual, named-second-party interpersonal episode: **Markos
(the future Yahballaha III)'s own quoted emotional reaction to Bar
Sauma's planned departure** ("How can this possibly take place?" —
expressing that Bar Sauma's absence would leave his own affairs in
"utter confusion"), and **Bar Sauma's own documented initial resistance**
to a joint pilgrimage attempt with Markos, "trying to frighten him with
the toil of the journey, the fatigue of travelling, and the terror of
the ways." **This is genuine, specific, two-person interpersonal
conduct, witnessed by someone other than Bar Sauma himself, describing
both men's behavior toward each other** — a materially different, and
better, evidentiary shape than anything found for Leo Africanus or
Chandragupta this session, and better than Ibn Battuta's zero-external-
touch pattern on 20 of 21 rows.

**Caveat, stated honestly**: this richer material covers the monastic/
early-life period. The European travel material — which is also where
the strongest institutional corroboration (Vatican/Arghun/Edward I
letters) sits — reverts to Bar Sauma's own diary, embedded verbatim.
So the *best-corroborated* period (Europe) and the *most
interpersonally-witnessed* period (the monastery, pre-departure) are
different periods of his life, not the same one reinforcing each other.

### 5.3 Behavioral coverage test, by domain

| Domain | Evidence found | Provenance |
|---|---|---|
| Travel and adversity | Extensive account of the journey's hardships | Self-diary, embedded in third-party narrative |
| Diplomacy | Meetings with Arghun Khan, Byzantine Emperor, Philip IV, Edward I, the Pope | Self-diary for content; institutional record for the fact/timing of the Philip IV, Edward I, and Papal encounters |
| Religious hierarchy | His relationship to the Church of the East patriarchy, his own eventual senior clerical status | Third-party witnessed |
| Negotiation | Attempted to secure a Western military alliance for the Ilkhanate against Mamluk Egypt; unsuccessful (both Philip IV and Edward I declined firm commitment) | Institutional record confirms the outcome (no alliance secured) — a genuine, honestly-preserved *failure*, not a curated success narrative |
| Encounters with foreign rulers/institutions | As above | Mixed self-diary/institutional |
| Adaptation | Adjusting from a monastic Central-Asian/Chinese context to Latin Christian Europe | Largely inferential from the diary's own content |
| Persistence | Continued the mission despite both major courts declining alliance | Self-diary, but corroborated in outcome by the institutional non-alliance record |
| Interpersonal style | **The Markos/Yahballaha relationship** (§5.2) — genuinely rich, mutual, witnessed | **Third-party witnessed — the strongest single finding across all three packs this session** |
| Response to setbacks | Initial resistance to the pilgrimage itself (§5.2); continued mission despite the failed alliance attempt | Third-party witnessed (resistance) / self-diary (persistence after failure) |
| Role changes over time | Monk -> pilgrim -> ambassador; his student Markos rose to Patriarch while Bar Sauma remained his subordinate-turned-envoy | Third-party witnessed |

### 5.4 Disposition

**Not `STRONG_EVIDENCE_REPLACEMENT`** — the European mission material
(the best-institutionally-corroborated part) still ultimately rests on
his own diary for its content, the same self-narration risk this whole
search exists to solve, and the work survives via a single manuscript
tradition (rediscovered only in the late 19th century), itself a
narrower transmission history than Ibn Battuta's much more widely
copied and studied Rihla.

**Disposition: `PLAUSIBLE_BUT_NEEDS_MORE`**, but **the strongest of the
three alternates evaluated this session** on the specific "does it
solve interpersonal-conduct evidence" axis — the Markos/Yahballaha
material is a genuine, named, third-party-witnessed two-person episode,
categorically different from anything found for Leo Africanus or
Chandragupta Maurya this session, and a real structural improvement over
Ibn Battuta's own zero-external-witness pattern for at least the
pre-Europe portion of his life.

---

## 6. Direct Leo Africanus vs. Rabban Bar Sauma comparison

| Dimension | Leo Africanus | Rabban Bar Sauma |
|---|---|---|
| Independent candidate-specific observation | One institutional event-record (baptism); no independent behavioral observation found | One institutional event-record class (3 diplomatic letters/records) at event-level; **plus genuine third-party-witnessed interpersonal behavior** (Markos relationship) for the pre-Europe period |
| Dependence on self-narrative | High — nearly everything beyond the baptism record is his own writing, with a live authenticity dispute among specialists | Mixed — low for the monastic/pre-Europe period (third-party witnessed), high for the Europe period (his own diary, embedded) |
| Number of behavioral domains | ~4-5 with any real evidence (diplomacy, patronage, literary work, identity/status — most thin) | ~6-7 with real evidence (travel, diplomacy, religious hierarchy, negotiation, interpersonal style, persistence, role change) |
| Temporal range | c. 1518-1527 documented (captivity through Rome); pre- and post- this window is thin/contradictory | c. 1280s (monastic period) through 1294 (death); a fuller documented arc |
| Contemporary/near-contemporary witnesses | Widmanstetter (independent, but ~28 years after the fact, uncertain firsthand access) | The anonymous 1317-1319 author (a generation after Bar Sauma's death, from his own institutional community, explicitly an eyewitness to some events) |
| Contradictory evidence | Real and damaging: Widmanstetter vs. Ramusio disagree on where/how he died | Real but less damaging: no fundamental disagreement found on the outline of events, mainly gaps rather than contradictions |
| Genre bias | Self-presentation risk in his own writing, PLUS a specialist-identified authenticity dispute (invented detail vs. genuine reporting) | Self-presentation risk confined mainly to the Europe-diary portion; the earlier material has a different, third-party-narrative genre |
| Roster geography contribution | North Africa (Fez/Morocco) origin — close match to Ibn Battuta's own regional origin | Central Asia/China (Khanbaliq) origin, Church-of-the-East Christian minority — a genuinely different, not equivalent, regional/cultural axis from Ibn Battuta's |
| Era contribution | Early modern (16th c.) — later than Ibn Battuta's own 14th c. | Medieval (13th c.) — closely matches Ibn Battuta's own century |
| Travel/diplomacy/exploration contribution | Travel-writing + diplomacy domain, matches Ibn Battuta's genre closely | Diplomacy + exploration domain; genre of the primary source (third-party biography, not self-authored travelogue) differs from Ibn Battuta's own Rihla |
| Expected Protocol v1 ceiling | Likely similar in kind to Ibn Battuta's own ceiling — moderate confidence, few `documented`-tier rows, given the authenticity dispute on his own writing | Likely a genuinely different, and probably somewhat better, ceiling for the pre-Europe period specifically; still constrained for the Europe period |

**Read together**: Leo Africanus offers a closer regional match to Ibn
Battuta's own contribution (North Africa origin, travel-writing genre)
but a *weaker* evidence-structure improvement (one clean event-record,
otherwise self-authored-with-authenticity-dispute or contradictory
secondhand report). Rabban Bar Sauma offers a *stronger* evidence-
structure improvement (genuine third-party-witnessed interpersonal
material, not just an institutional event-record) but a *weaker*
regional match (Central Asia/China rather than North Africa/West Asia)
and a narrower era match advantage (13th c., closer to Ibn Battuta's
14th c. than Leo's 16th c., which cuts the other way — era fit actually
favors Bar Sauma too). Per this phase's own decision standard (§8 of the
task: evidence improvement and roster fit are evaluated on separate
axes, and evidence quality takes priority over exact demographic
cloning), **Bar Sauma's stronger evidence-structure edge is the more
important axis**, and his era fit is if anything better than Leo's, not
worse — only the specific North-Africa/West-Asia regional match is
weaker.

---

## 7. Ashoka contingency search

**Not triggered.** Chandragupta Maurya's final disposition this session
is `PLAUSIBLE_BUT_NEEDS_MORE`, not `STRUCTURAL_RISK` or
`REJECT_AS_REPLACEMENT` — the explicit condition for the contingency
search (task §7) is not met. Chandragupta remains a real, if unproven,
lead rather than a dead end; a 2-candidate contingency search was
considered but not performed, since running it now would go beyond what
this phase's own branching logic calls for and would risk diffusing
research effort across too many unproven names rather than deepening the
one genuinely promising lead. Noted honestly: this call is closer than
the prior session's confident "STRONG" verdict suggested it would be —
worth remembering if a future dedicated Chandragupta pack comes back
weaker than hoped, at which point the contingency search this section
deliberately deferred should be run.

---

## 8. Comparative decision

### 8.1 Ashoka vs. best viable alternate

Chandragupta Maurya is the only alternate researched for Ashoka's gap.
He does not yet meet the evidence-improvement bar this phase's own
standard requires ("must plausibly support reliable behavioral
differentiation," not "one independently verified event" or "one
external observer") — the single external observer (Megasthenes) is
real, but most of what would be attributed to him personally is either
generic-"the king" phrasing, institutional/outcome-level (the Seleucus
treaty), or later material with either a genre problem (Nanda overthrow/
Chanakya, like Ashoka's own *Ashokavadana* problem) or an active
person-identity dispute (the Jain sallekhana tradition) worse than
anything in Ashoka's own file. Roster fit is excellent (same era, same
region, founding-emperor political leadership, arguably strengthening
the "founding" angle) but roster fit alone cannot satisfy the evidence
axis.

### 8.2 Ibn Battuta vs. Leo Africanus vs. Rabban Bar Sauma

Neither alternate clears `STRONG_EVIDENCE_REPLACEMENT`. Between the two,
Rabban Bar Sauma has the stronger evidence-structure case (genuine
third-party-witnessed interpersonal behavior, not just an institutional
event-record) and an era fit at least as good as Leo Africanus's, at the
cost of a weaker regional match to Ibn Battuta's specific North-Africa/
West-Asia contribution and a narrower manuscript-transmission history
for his primary source.

### 8.3 Roster consequences of NOT swapping either primary now

No change: Ibn Battuta remains the roster's sole exploration/travel-
writing-domain, North-Africa/West-Asia-medieval representative; Ashoka's
slot remains unfilled (South Asia remains under-represented in the
ancient era, unchanged from the prior checkpoint's own note). Neither
consequence is new to this session.

---

## 9. Final recommendations

### Ashoka

**`ADDITIONAL_ALTERNATE_IDENTIFIED_BUT_NEEDS_PACK`.**

Chandragupta Maurya (Q188541) is not `SWAP_READY`. The evidence-structure
case is genuinely mixed, not merely unproven: real advantages (an actual
independent contemporary observer existed; at least one clean,
candidate-named, non-proclamation administrative fact survives) sit
alongside real new problems this session surfaced (the richest anecdote
is not explicitly candidate-named in its primary source; the personality-
richest late-life material has a live scholarly dispute about which
person it even concerns). A dedicated future evidence pack — not full
scoring — should resolve the four specific open questions listed in
§3.4 before any `STRONG`/`REJECT` call is made. Ashoka himself remains
`STRUCTURALLY_THIN` and unscored, unchanged.

### Ibn Battuta

**`ADDITIONAL_ALTERNATE_IDENTIFIED_BUT_NEEDS_PACK`.**

Neither Leo Africanus (Q332790) nor Rabban Bar Sauma (Q721469) is
`SWAP_READY`. If a future session pursues one first, **this pack
recommends Rabban Bar Sauma** on evidence-structure grounds (genuine
third-party-witnessed interpersonal behavior, the single strongest
finding across all three packs this session) with era fit at least
equal to Leo's — while flagging that his regional contribution differs
meaningfully from Ibn Battuta's own (Central Asia/China origin and a
Church-of-the-East Christian-minority angle, not North Africa/West Asia
Islamic scholarship), which a future roster-fit discussion would need to
weigh explicitly rather than assume away. Leo Africanus remains a live
secondary option specifically for regional-match reasons, not evidence-
structure reasons. Ibn Battuta himself remains `held`/`STRUCTURALLY_THIN`,
unchanged.

**No swap executed. No candidate file created for any alternate. No one
scored. No one promoted.**

---

## 10. Exact repository delta

**Pre-existing candidate/checkpoint changes (unchanged this session):**
all 29 candidate files already touched across Track A/B/C/D and the
prior provenance-closure session (14 modified, 15 created, `edward-said.
json` carrying its `leadership_drive` correction from the prior
session) — none edited again this turn.

**Files modified by this phase: none.** This phase was research and
reporting only; no candidate JSON was created or edited.

**New checkpoint file created this session (1):**
- `docs/checkpoints/roster-expansion-125-final-alternate-evidence-packs-DRAFT.md`
  (this file).

**Untracked checkpoint files from earlier sessions, not touched this
session (10):** `roster-expansion-125-candidate-audit-DRAFT.md`,
`roster-expansion-125-selection-closure-audit-DRAFT.md`,
`roster-expansion-125-held-candidate-evidence-audit-DRAFT.md`,
`roster-expansion-125-evidence-deepening-batch1-DRAFT.md`,
`roster-expansion-125-evidence-deepening-batch2-DRAFT.md`,
`roster-expansion-125-track-c-structural-ceiling-DRAFT.md`,
`roster-expansion-125-track-d-evidence-packs-DRAFT.md`,
`roster-expansion-125-track-a-first-scoring-DRAFT.md`,
`roster-expansion-125-convergence-audit-DRAFT.md`,
`roster-expansion-125-provenance-closure-and-alternate-search-DRAFT.md`.

**`next-env.d.ts` confirmed NOT touched this session** — verified via
`git status`/`git diff --stat` both before and after this session's
work; its diff is unchanged from the pre-existing, unrelated 2-line
change present before this whole roster-expansion series began.

**Cumulative across the whole roster-expansion series: still 29
candidate files touched, 1 unrelated pre-existing file left untouched,
11 checkpoint/report files untracked in git (10 prior + this one).**
Nothing committed.

---

## 11. Validation

- No candidate JSON was created or edited this session, so no per-file
  JSON/validator check was needed for new data.
- The validator was run once, read-only, solely to produce the exact
  §1.2 wording (182 status lines vs. 181 eligibility computations): **0
  errors, 0 warnings**, tally unchanged (`held` 121, `qa_passed` 61).
- `git status`/`git diff --stat` inspected before and after this
  session's work; only the new checkpoint file was added. `next-env.d.ts`
  unchanged.
- Not run: `tsc`/`vitest`/`next build` — no `src/` or scored-data change
  this session to warrant them.

## 12. Stop condition confirmed

1. Chandragupta Maurya received a real evidence pack (§3), including a
   direct primary-source check (Strabo §55 vs. §53) that materially
   revised the prior session's claim.
2. Leo Africanus received a real evidence pack (§4), including the
   field's own published critique of the definitive modern biography's
   evidentiary reliance.
3. Rabban Bar Sauma received an equally serious comparator pack (§5),
   not treated as a nominal backup, and came out as the strongest
   evidence-structure case of the three.
4. The Ashoka contingency search's trigger condition was checked and
   found not met (§7) — Chandragupta's disposition is
   `PLAUSIBLE_BUT_NEEDS_MORE`, not `STRUCTURAL_RISK`/`REJECT`.
5. Final swap-readiness decisions are made for both primaries (§9):
   `ADDITIONAL_ALTERNATE_IDENTIFIED_BUT_NEEDS_PACK` for both, with a
   named preferred alternate for Ibn Battuta's slot (Rabban Bar Sauma,
   on evidence grounds) and an explicit list of open questions for
   Chandragupta before any further call.
6. The exact repository delta is reported (§10) — `next-env.d.ts`
   confirmed untouched.

**No swaps executed. No candidate files created for any alternate. No
one scored. No one promoted. No live-roster membership altered. Ashoka
and Ibn Battuta both remain exactly as they were.** Stopping here for
the next reviewed phase.
