# Roster Expansion 125 — Track D Pre-Score Evidence-Pack Report (DRAFT)

**Status: PRODUCTION WORK, NOT COMMITTED.** 3 new `data-pipeline/
candidates/*.json` files created (Kartini, Akbar, Spinoza) with genuine
first-time Protocol v1 scoring, following completed evidence packs. 1
candidate (Ashoka) evaluated and deliberately **not** scored. No
roster/editorial/portrait files touched, no `src/` changes, nothing
promoted, nothing committed. Closes out Track D. Track A (12 fresh READY
candidates) is explicitly **not started**.

---

## 0. Ibn Battuta disposition re-check (done first, no new research)

See the fuller writeup now in
[`roster-expansion-125-track-c-structural-ceiling-DRAFT.md`](roster-expansion-125-track-c-structural-ceiling-DRAFT.md)
§4b. Summary: re-applied the strict test ("does the record contain enough
*independently witnessed* repeated behavior for *reliable*
differentiation, not just narrative breadth?") and found, mechanically,
that 20 of Ibn Battuta's 21 scored rows rest on the *Rihla* alone with
zero external witness, and the 21st cites Barani only for general
court-volatility context, not independent corroboration of his specific
episode. **Disposition revised from `IMPROVED_BUT_CEILING_REMAINS` to
`STRUCTURALLY_THIN`.** No score/confidence/evidenceType value was altered
by this re-check — only the report-level classification changed. No
replacement candidate sourced. Al-Biruni and Chien-Shiung Wu were checked
for the same defect and do not share it (Al-Biruni has a genuine second
witness — Ibn Sina's own surviving replies; Wu's record is externally
witnessed, just topically narrow) — neither reopened.

## 1. Track D candidate set, verified against the audit

Per the held-candidate-evidence audit's §8 table (not reconstructed from
memory): the exact 4 NEEDS-EVIDENCE-PACK names are **Raden Ajeng Kartini,
Akbar, Ashoka the Great, and Baruch Spinoza.** Confirmed, matches this
task's expected set exactly.

**`READY_FOR_FIRST_SCORE` defined explicitly, as instructed**: means only
that the evidence base is behaviorally rich and provenance-diverse enough
to enter the normal Protocol v1 first-scoring process. It does **not**
mean eligible, accepted, high-scoring, `qa_passed`, or live-roster ready —
all 3 candidates scored below actually still came back `held` (see §6).

## 2. Kartini — evidence pack

**Original concern**: short lifespan (25 years), evidence concentrated in
correspondence, possible publication/editorial selection effects, limited
longitudinal observation.

### Source inventory

| Source | Author/editor/translator | Date | Type | Proximity | Independence | Genre/incentive bias |
|---|---|---|---|---|---|---|
| *Kartini: The Complete Writings 1898-1904* | Joost Coté (ed./trans.) | 2014 | Scholarly critical edition | Direct archival transcription | Independent of the 1911 edition's selection | Modern academic; explicitly corrective of the earlier edition's omissions |
| *Door Duisternis tot Licht* / *Letters of a Javanese Princess* | J.H. Abendanon (ed.); Agnes L. Symmers (Eng. trans.) | 1911 | Edited letter selection | Near-contemporary (7 years post-death) | Not independent — Abendanon was both a correspondent's husband and a colonial official promoting the Ethical Policy | Documented selection effect: English edition is ~2/3 of the original; material on her own family's polygamy was omitted, only restored via Coté (2014) |
| 1902-03 Dutch government scholarship record | States General proceedings | 1902-1903 | Institutional/documentary | Contemporary | Independent of her own correspondence | Government administrative record, not her self-presentation |
| Marriage/school biographical accounts | Britannica; Encyclopedia.com | Modern | Secondary historical synthesis | Removed | Draws on both editions above | Standard reference-work synthesis |

### Behavioral evidence ledger (selected)

| Period | Domain | Behavior | Source | Type | Corroboration | What it supports / cannot support |
|---|---|---|---|---|---|---|
| ~1891 (age 12) | Family/constraint | Entered pingitan (seclusion) per aristocratic custom | Coté; secondary biography | Third-party/biographical | Multiply corroborated | Supports: documented constraint context. Cannot support: her *feelings* about it beyond what she later wrote |
| 1899-1904 | Correspondence | Sustained anti-polygamy/anti-seclusion position to ~10 pen-friends | Coté; Abendanon (selection) | Self-report | Same position repeated, NOT independent instances | Supports: one consistent documented stance. Cannot support: 10x confidence multiplier |
| 1902-1903 | Institutional | Awarded, then declined, a Dutch government scholarship; attempted to transfer it to Agus Salim | Institutional record | Documentary + third-party | Independent of her letters | Supports: a costly, other-directed, dated act |
| Nov 1903 | Negotiation | Secured specific marriage conditions (continued schooling) | Biographical synthesis | Third-party | Corroborated across sources | Supports: real negotiated compromise. Also the clearest documented contradiction with her own anti-polygamy writing |
| 1903-1904 | Action | Personally operated a girls' school (10 students, 4 days/week) | Biographical synthesis | Third-party | Corroborated | Supports: sustained action distinct from aspiration |

### Coverage assessment

4-5 distinct life periods (childhood seclusion, adolescent correspondence
onset, the 1902-03 scholarship episode, the 1903 marriage negotiation, the
1903-04 school operation); at least 3 genuinely distinct behavioral
domains (institutional/financial decision-making, negotiated compromise,
sustained real-world action) beyond correspondence-stated belief;
source independence real but partial (the institutional scholarship
record and Coté's restored family material are genuinely independent of
the Abendanon-curated letters); one clear, preserved contradiction
(anti-polygamy writing vs. her own marriage); major gap: no independent
third-party account of her personal temperament in ordinary daily
interaction exists in any source reviewed.

**Disposition: `READY_FOR_FIRST_SCORE`.** Explicit test applied: her short
life still yields cross-context behavior — an institutional/financial
decision, a negotiated compromise, and a sustained independent action —
that is not simply "the same belief restated to different pen-friends."
That specific risk (treating repeated correspondence as multiplied
evidence) was the one this pack was built to guard against, and the
scoring below explicitly does not do it (see the `independent_thinking`
row's own rationale).

**First scoring authorized and completed** — see
`data-pipeline/candidates/kartini.json`. 18 attributes scored.

## 3. Akbar — evidence pack

**Original concern**: the earlier audit's own claim that no independent,
non-court source existed was wrong (corrected in the prior checkpoint);
this pack's job was to actually *triangulate*, not just cite, sources
with different incentives.

### Source inventory

| Source | Author | Date | Type | Proximity | Independence | Incentive bias |
|---|---|---|---|---|---|---|
| *Akbarnama* | Abul Fazl (Akbar's own court historian) | c. 1590s | Official chronicle | Contemporary | Not independent — commissioned | Panegyric; explicit glorification |
| *Muntakhab-ut-Tawarikh* | Abd al-Qadir Badauni (Akbar's own appointed court Imam) | 1590-1615, written secretly | Chronicle | Contemporary | Independent of Abul Fazl — an insider turned critic | Hostile; orthodox-Sunni religious grievance, "a corrective to Fazl's almost eulogical work" |
| *Commentary* | Antonio Monserrate (Jesuit missionary, resident 1580-82) | Written shortly after 1582, published 1914 | Eyewitness account | Contemporary, direct personal observation | Independent of both Mughal-court traditions | Favorable-to-Akbar but has its own incentive: framing his openness as receptiveness to Christianity |

### Behavioral evidence ledger (selected)

| Period | Domain | Behavior | Source(s) | Corroboration | What it supports |
|---|---|---|---|---|---|
| From 1575 | Religious/intellectual | Convened Ibadat Khana interfaith debates | Akbarnama, Badauni, Monserrate all discuss it | **All three, different incentives, converge on the institution's existence and its contentiousness** | Strong: sustained curiosity + tolerance for conflict |
| 1580-82 | Personal practice | Personally practiced Christian prayer, Zoroastrian fire rites | Monserrate (favorable) and Badauni (hostile, condemning the same acts) | **Convergent on the fact, divergent on valence** — exactly the triangulation this pack targeted | Strong: curiosity enacted physically, not just discussed |
| 1562 | Response to threat | Ordered Adham Khan thrown from the ramparts (twice) after he murdered minister Ataga Khan | Akbarnama (including its own commissioned illustrations) | **Not independently corroborated** — single source-family | Moderate: a real, specific episode, but flagged and kept at strong_inference/dual_edged rather than documented |
| Multi-decade | Policy | Shift from early orthodox posture to Din-i-Ilahi and administrative centralization | Akbarnama's own chronology *and* Badauni's independent, critical account of the same shift | Corroborated (both track the same change, disagreeing only on approval) | Strong: longitudinal change |

### Coverage assessment

3 independent source traditions with genuinely different incentives, 2
of which (Badauni, Monserrate) are non-panegyric; multiple life periods
spanning ~1562-1600s; several distinct domains (religious practice,
administrative design, response to violence, diplomatic/interfaith
engagement); one genuine convergent-triangulation finding (interfaith
practice) that is the strongest evidence in the file; one clear
single-source-family limitation (Adham Khan) explicitly flagged rather
than laundered as independently confirmed.

**Disposition: `READY_FOR_FIRST_SCORE`.** The explicit triangulation this
pack was asked to perform — checking whether sources with different
incentives converge or disagree on actual behavior, not just listing them
— produced a real, usable finding (the interfaith-practice convergence),
which is materially different from and stronger than merely having
"another source exist."

**First scoring authorized and completed** — see
`data-pipeline/candidates/akbar.json`. 18 attributes scored.

## 4. Ashoka — evidence pack, and why he is NOT scored

**Original concern**: edicts are royal proclamation/self-presentation, not
ordinary personal narrative; the Kalinga-remorse and later legendary
material must be tested, not imported.

### Source inventory

| Source | Date relative to Ashoka | Type | Genre |
|---|---|---|---|
| Major Rock Edict XIII (and the other rock/pillar edicts) | Contemporary, his own reign (epigraphic) | Primary/epigraphic | Royal proclamation |
| *Ashokavadana* | 2nd century CE — roughly 400+ years later | Buddhist hagiographic narrative | Explicitly legendary/propagandistic (a "before conversion, Chandashoka the Fierce" narrative scholars regard as gross exaggeration) |
| Modern epigraphic/administrative scholarship (the Dhamma Mahamatta institution, edict chronology across regnal years) | Modern | Historical-archaeological synthesis | Academic |

### What was explicitly tested rather than imported

The famous Kalinga-war "remorse" narrative **is** primary (Rock Edict
XIII, his own words/proclamation) — but a specific, sourced scholarly
observation complicates taking it at face value: **the remorse language
is reported to be absent from the inscriptions actually found within
Kalinga territory itself**, suggesting the apology may have been a
message strategically directed at audiences *elsewhere*, not a private
confession communicated to the people who suffered the war. This is
exactly the kind of test this task asked for, rather than importing the
popular "converted-and-genuinely-remorseful" reading uncritically. (Noted
with appropriate hedging — this specific claim was not cross-verified
against a peer-reviewed epigraphic source in this pass, only against
secondary historical-discussion pieces, and is reported here as a
caution about the narrative, not as an established fact in its own
right.)

The dramatic *Ashokavadana* material (mass executions of ministers,
burning 500 concubines, "Ashoka's Hell") is unambiguously later legend —
2nd century CE, explicitly a Buddhist-conversion morality narrative, and
identified in scholarship as propagandistic exaggeration. **This material
was not used anywhere in this evidence pack and must not be used for
personality scoring.**

The Dhamma Mahamatta institution and the edicts' progression across
regnal years (Minor Rock Edicts, year 8 → Major Rock Edicts, years 11-13
→ the Mahamatta cadre, year 13-14) provide a genuine, epigraphically
grounded, multi-year *administrative* development trail — real evidence
of policy change over time.

### Coverage assessment, and the honest conclusion — precision correction (on review)

The original wording here ("every source is either a proclamation or a
legend," "personal-behavior evidence is categorically absent") overstated
the case by collapsing several genuinely distinct evidence classes into
"no evidence." Stated precisely instead:

- The edicts are exceptionally valuable **contemporaneous evidence of
  royal policy, public self-presentation, and longitudinal administrative
  priorities** — real, epigraphically dateable, and internally
  consistent enough to show actual policy evolution over ~13+ regnal
  years (Minor Rock Edicts → Major Rock Edicts → the Mahamatta cadre).
- **Archaeological/epigraphic evidence can and does independently situate
  aspects of the program** — the Mahamatta institution's structure, the
  edicts' find-locations, and their chronology are external, physical
  facts, not merely what the edicts claim about themselves.
- **Later Buddhist narrative traditions (the *Ashokavadana*) are
  genuinely personality-rich** — vivid, specific, dramatic material about
  temperament, cruelty, and transformation — but are 2nd-century-CE,
  four-plus centuries removed, and explicitly identified by scholarship
  as legendary/propagandistic, not reliable observation of his actual
  conduct.
- **What targeted research did not find, despite a real attempt, is any
  independent source class observing his interpersonal, private,
  conflict-response, or ordinary behavioral conduct** — no correspondence,
  no courtier's or foreign observer's account, no record of a personal
  relationship or disagreement outside what the state itself chose to
  proclaim.

**The defensible conclusion is narrower than the original wording
suggested**: the record is rich for policy and administrative history,
genuinely constrained by independent archaeological evidence at the
policy level, and contains vivid but unreliable legendary material at the
personal level — but it is **not adequate for Protocol v1 personal-
behavioral differentiation**, because no source class independent of the
state's own proclamation was found that describes his actual interpersonal
conduct. This is a narrower and more precise claim than "no evidence
exists," and it is the one this pack's disposition actually rests on.

**Disposition: `STRUCTURALLY_THIN` for personal-behavioral first
scoring.** Historical importance is not in question and is not the test.
**Ashoka is NOT scored.** No placeholder or partial score was created; no
bar was lowered. This is a defensible product decision, matching this
task's own explicit permission to reach exactly this conclusion when the
evidence supports it.

## 5. Spinoza — evidence pack

**Original concern**: important correspondence and early biography exist,
but far less dense than a modern memoir; famous anecdotes need tracing to
their earliest credible source before use.

### Source inventory

| Source | Date | Type | Proximity | Independence | Bias |
|---|---|---|---|---|---|
| 1656 herem document | 1656 | Institutional/documentary | Contemporary | Independent (community's own archive, not Spinoza's own account) | Doesn't specify his actual offense — a real, disclosed gap |
| His own *Epistolae* (de Vries, Blijenbergh, Fabricius/Heidelberg letters) | 1663-1673 | Firsthand correspondence | Contemporary, self-authored | Multiple independent correspondents, cross-checkable against each other | His own voice, but naturally self-presenting |
| 1670/1674 TTP publication and ban | 1670-1674 | Institutional/public record | Contemporary | Independent of any biographer | Neutral — a formal government action |
| "Ultimi barbarorum" anecdote | Earliest identified this pass: Freudenthal 1899 | Later scholarly compilation | **Not near-contemporary** — a ~227-year gap to the identified source | Not established as independent of earlier biographical tradition (Colerus 1705 is the traditionally-cited origin but was not independently re-confirmed in this pass) | Used at low confidence only, explicitly flagged |

### What was explicitly NOT taken at face value

The famous "ultimi barbarorum" story was investigated specifically to
trace it to its earliest source, per this task's instruction. The
cleanest citation found this session traces only to a 1899 scholarly
compilation (Freudenthal), not a verified near-contemporary witness. It
is used in the file at `inference`/0.35 confidence only, and explicitly
**not** used to inflate `risk_tolerance`, which instead rests on the
independently, publicly documented 1670 anonymous publication and 1674
formal ban of the *Tractatus Theologico-Politicus* — a stronger,
better-provenanced basis for the same trait.

### Coverage assessment

Genuine firsthand correspondence across at least 3 distinct domains
(financial/material decisions with de Vries, sustained-then-deliberately-
ended intellectual disagreement with Blijenbergh, and an institutional
career decision — declining Heidelberg); one institutional record (the
herem) with an honestly disclosed gap (cause unspecified); one anecdote
explicitly downgraded rather than laundered. Major gap: no account of his
ordinary daily habits or temperament from a friend or acquaintance
survives independent of his own letters.

**Provenance-precision check (added on review)**: the word
"multi-provenance" was not actually used to describe this file, but the
underlying question is worth answering explicitly rather than left
implicit. Auditing the 18 scored rows by what actually grounds them: **2
rows** (`independent_thinking`, `risk_tolerance`) rest on genuinely
independent institutional/public records (the herem document; the TTP's
public ban) that exist entirely outside Spinoza's own voice. **2 rows**
(`autonomy_need`, `conflict_tolerance`) rest on two-party correspondence
where the *other* party's own letters also survive (de Vries's Letter
XXVI; Blijenbergh's side of the exchange) — real corroboration that he
did not simply narrate the exchange himself, though still not a third
party's independent characterization of him. **The remaining 14 rows**
are inferences drawn from his own documented life-pattern (correspondence
content, craft livelihood, relocation history) — cross-domain, but
ultimately traceable to his own record, not to an external observer's
account of him the way Monserrate's testimony functions for Akbar or
Klagsbrun's archival biography functions for Golda Meir. **The accurate
description of this file's evidentiary foundation is: cross-domain,
firsthand-rich, with limited external constraint** — not
"multi-provenance" in the stronger sense of broad third-party
corroboration. This is a description correction only; it does not change
the disposition below, which was never premised on broad third-party
corroboration in the first place.

**Disposition: `READY_FOR_FIRST_SCORE`.** The correspondence provides
genuine, dateable, firsthand episodes in more than one domain — exactly
what this task's concern named as the open question — and the weakest,
most-repeated anecdote was deliberately not used to manufacture
confidence.

**First scoring authorized and completed** — see
`data-pipeline/candidates/baruch-spinoza.json`. 18 attributes scored.

## 6. Four-candidate comparison

| | Kartini | Akbar | Ashoka | Spinoza |
|---|---|---|---|---|
| Pre-score disposition | `READY_FOR_FIRST_SCORE` | `READY_FOR_FIRST_SCORE` | `STRUCTURALLY_THIN` | `READY_FOR_FIRST_SCORE` |
| Why cleared / didn't | Real institutional + negotiated + action-domain evidence beyond repeated belief-statements | Genuine cross-incentive source triangulation, not just source-listing | Rich, epigraphically-constrained policy/administrative record, but no independent source class observing interpersonal/private/ordinary conduct was found | Firsthand correspondence across 3+ distinct domains, weakest anecdote deliberately downgraded |
| First scored? | Yes, 18 attributes | Yes, 18 attributes | **No — not scored** | Yes, 18 attributes |
| Validator result | scored=18, avgConf=0.477, coverage=0.540, `eligible=false` | scored=18, avgConf=0.478, coverage=0.543, `eligible=false` | n/a | scored=18, avgConf=0.448, coverage=0.542, `eligible=false` |
| Lifecycle status | `held` | `held` | not created | `held` |

**All 3 scored candidates came back `held`, not `qa_passed`.** This is the
expected, unforced outcome — `READY_FOR_FIRST_SCORE` was never equated
with eligibility, exactly as instructed, and no further remediation round
was run on any of the three to chase the floor.

## 7. Does Track D change the earlier audit's conclusion?

**Partially, and it should be stated precisely.** The earlier audit
concluded these four "merely needed an evidence pack rather than
immediate replacement." For Kartini, Akbar, and Spinoza, that conclusion
holds — real evidence packs were built, all three cleared the pre-score
bar, and all three now have genuine first scores (short of eligibility,
but that was never the test). **For Ashoka, the conclusion does not
hold**: the evidence pack found a genuinely rich, epigraphically-
constrained policy/administrative record, but no independent source
class — beyond the state's own proclamation and much-later, explicitly
legendary Buddhist narrative — observing his interpersonal, private, or
ordinary conduct. That specific, narrower gap is not one more targeted
research pass is likely to close, since it is a gap in what kind of
record survives, not in how thoroughly the existing record has been read.
This is a genuine, substantive revision for one of the four, reached only
after actually doing the work the "needs a pack" label implied, not
asserted in advance.

## 8. Confirmation: evidence-first, not score-first

For all three scored candidates, the evidence pack (source inventory +
behavioral ledger) was completed and the `READY_FOR_FIRST_SCORE`
disposition was reached *before* any row was scored. Every search this
session named a person, an episode, and a source type ("Kartini letters
correspondents Rosa Abendanon Stella Zeehandelaar," "Door Duisternis tot
Licht Kartini editing controversy," "Badauni Muntakhab-ut-Tawarikh
critical Akbar," "Monserrate Commentary Akbar personal behavior,"
"Ashoka Rock Edict XIII exact text versus Ashokavadana," "Spinoza ultimi
barbarorum earliest source provenance," "Spinoza Simon de Vries
inheritance earliest source") — never an attribute-shaped query. No score
was assigned and then defended after the fact.

## 9. Validation

- `node -e "JSON.parse(...)"` on all 3 new files — valid JSON.
- `corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts` —
  run once, after all scoring was finalized: **0 errors, 0 warnings**
  across the now-170-file corpus. Status tally: `held` 109 (was 106),
  `qa_passed` 61 (unchanged) — exactly the 3 new candidates, all landing
  at `held` per their own honest computed eligibility, no unrelated
  candidate affected.
- Status field updated on all 3 new files from the initial `"scored"` to
  `"held"` (with a `holdReason` added), matching the empirically-verified
  repository convention from the 167-vs-166 check (§0 of the prior
  checkpoint): `held` ⟺ `eligible: false` among scored candidates. This
  was applied mechanically from the validator's own output, not decided
  in advance.
- Not run: `tsc`/`vitest`/`next build` — this work touches only
  `data-pipeline/candidates/*.json`.

## 10. Exact diff accounting

**New candidate files created this session (Track D, 3):**
- `data-pipeline/candidates/kartini.json`
- `data-pipeline/candidates/akbar.json`
- `data-pipeline/candidates/baruch-spinoza.json`

**No candidate file created for Ashoka** — deliberately, per §4's
disposition.

**Candidate files modified in prior sessions (Track B + C, 14 —
unchanged this session, still appearing in `git status` because nothing
has been committed yet):**
- `data-pipeline/candidates/al-biruni.json`, `chien-shiung-wu.json`,
  `ibn-battuta.json` (Track C)
- `data-pipeline/candidates/desmond-tutu.json`,
  `gabriel-garcia-marquez.json`, `golda-meir.json`, `jose-marti.json`,
  `junko-tabei.json`, `kwame-nkrumah.json`, `miriam-makeba.json`,
  `naguib-mahfouz.json`, `saladin.json`, `simone-de-beauvoir.json`,
  `sun-yat-sen.json` (Track B)

**Checkpoint file modified this session (1 — the Ibn Battuta disposition
revision, §0):**
- `docs/checkpoints/roster-expansion-125-track-c-structural-ceiling-DRAFT.md`

**New checkpoint file created this session (1):**
- `docs/checkpoints/roster-expansion-125-track-d-evidence-packs-DRAFT.md`
  (this file)

**Untracked checkpoint files from earlier sessions, not touched this
session (5):**
- `docs/checkpoints/roster-expansion-125-candidate-audit-DRAFT.md`
- `docs/checkpoints/roster-expansion-125-selection-closure-audit-DRAFT.md`
- `docs/checkpoints/roster-expansion-125-held-candidate-evidence-audit-DRAFT.md`
- `docs/checkpoints/roster-expansion-125-evidence-deepening-batch1-DRAFT.md`
- `docs/checkpoints/roster-expansion-125-evidence-deepening-batch2-DRAFT.md`

**`next-env.d.ts` was NOT touched by this work, or any roster-expansion
session** — it appears modified in `git status` only because it was
already modified in the working tree before this whole task series began.

**Total across the whole roster-expansion series so far: 17 candidate
files touched (14 modified + 3 newly created), 1 unrelated pre-existing
file left untouched, 8 checkpoint/report files untracked in git.**
Nothing committed.

## 11. Stopping point

Ibn Battuta's disposition re-check is complete and corrected. All 4 Track
D candidates have evidence packs; 3 (Kartini, Akbar, Spinoza) cleared
`READY_FOR_FIRST_SCORE` and now have genuine first scores, all landing at
`held`; 1 (Ashoka) is `STRUCTURALLY_THIN` and was deliberately not scored.
Track A (12 fresh READY candidates) is explicitly **not started**. No one
was promoted into the live roster. No alternate candidates were sourced.
Stopping here for review.
