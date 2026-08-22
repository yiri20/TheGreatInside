> **ARCHIVED — historical reference only. Do not load by default.**
>
> This file is preserved for provenance/traceability (per-batch selection
> rationale, QA corrections found, opener-diversity checks). For the
> current editorial coverage numbers, see
> [`docs/checkpoints/editorial.md`](../checkpoints/editorial.md) or run
> `corepack pnpm@10 exec tsx src/dev/editorialCoverageAudit.ts`.

# Editorial backfill batch history (pilot through Batch 6)

## Coverage today

Run `corepack pnpm@10 exec tsx src/dev/editorialCoverageAudit.ts` for the
current, live count — this file intentionally does not restate a number
that will go stale. As of this session's close, 20 of 95 people have
editorial content authored: the original 10-person pilot (see CLAUDE.md's
editorial-content section for exactly which and why) plus a first 10-person
Tier-B backfill batch (`feat/editorial-backfill-batch-1`) — Isaac Newton,
Harriet Tubman, Wu Zetian, Averroes, Julius Caesar, Jane Austen, Benito
Juárez, Ernest Shackleton, Wole Soyinka, and Elizabeth Blackwell, selected
by ranking the audit tool's `Rich`-tier candidates for episode/word-count
richness first, then choosing for era/region/domain/gender diversity among
the evidence-strongest candidates rather than by fame — see
`docs/archive/session-history/roster-1000-checkpoint.md`-style precedent in the batch's own commit
history for the full selection rationale. No new rule was added to Writing
Standard v1 this batch — the pattern that needed correcting (over-repeating
"This is consistent with the profile's X score" as an interpretation
opener) was already covered by the existing "vary the opening construction"
rule above; it was simply under-applied in this batch's first draft and was
caught and fixed during self-review before commit, which is exactly what
that rule anticipates a future author will need to do.

**Correction (Batch 2 session):** this section previously stated "52
Tier-B people remain unbackfilled." That was wrong — 52 is the Tier-B
**total**, not the remaining count; it did not subtract the 12 Tier-B
people already covered by the pilot (2: Albert Einstein, Joan of Arc) and
this batch (10: the nine listed above plus Averroes). The correct,
mechanically-computed figures, cross-referenced by evidence tier (see
`src/dev/editorialCoverageAudit.ts`'s "Editorial-content coverage by
evidence tier" section, added specifically so this can't silently recur):

| Tier | Total | Complete | Remaining |
|---|---|---|---|
| A (full evidence ledger) | 8 | 2 | 6 |
| B (qa_passed candidate JSON) | 52 | 12 | 40 |
| C (inline TS comments only) | 35 | 6 | 29 |
| **Total** | **95** | **20** | **75** |

Tier-C is untouched (6 of its 35 covered, all by the pilot); Tier-A has
6 of 8 remaining. Re-run the audit tool for the current live numbers
rather than trusting this table once it goes stale.

**Batch 2 (`feat/editorial-backfill-batch-2`).** A second 10-person
Tier-B backfill: Charles Darwin, Frederick Douglass, Ibn Sina, Martin
Luther King Jr., Rachel Carson, Hildegard of Bingen, Florence
Nightingale, Umm Kulthum, Sor Juana Inés de la Cruz, and Emmy Noether —
selected the same way as Batch 1 (rank the remaining Tier-B people by
evidence richness, then choose among similarly-strong candidates for
era/region/profession/gender diversity), with a deliberate correction
this round: the top 10 by pure richness were all male, so 6 of the 10
selected instead trade a modest amount of richness (still comfortably
inside the `Rich` bucket, 546-723 words) for real gender/geography/
profession balance — see the batch's own commit history for the full
per-person rationale. All content drawn entirely from each person's
existing `data-pipeline/candidates/*.json` rationale and sources — no
external research. Structural validation clean (0 issues), Korean
coverage 100%, matching/scoring untouched (confirmed: `git diff` against
`src/core/matching`, `src/core/attributes`, and every roster/db file is
empty). Opener diversity was checked DURING authoring, not only at the
end — two internal near-duplicate openers (MLK's and Sor Juana's; Florence
Nightingale's and Emmy Noether's) were caught and rewritten before commit;
the final batch introduces zero repeated interpretation openers of its own
(39 of its 44 distinct 4-word opener prefixes are used exactly once — the
only reused openers in the full 30-person corpus are all pre-existing,
from the pilot/Batch 1).

Corrected, mechanically-computed figures after Batch 2:

| Tier | Total | Complete | Remaining |
|---|---|---|---|
| A (full evidence ledger) | 8 | 2 | 6 |
| B (qa_passed candidate JSON) | 52 | 22 | 30 |
| C (inline TS comments only) | 35 | 6 | 29 |
| **Total** | **95** | **30** | **65** |

171 total items (79 achievements, 61 moments, 31 turning points), 57 with
an interpretation. Re-run the audit tool for the current live numbers.

**Interpretation-count discrepancy, found and resolved before Batch 3
(2026-08).** This section had stated "57 with an interpretation" for the
Batch 2 close, but the individual batch deltas reported along the way
(pilot 15, Batch 1 "+18", Batch 2 "+25") sum to 58, not 57 — an internal
inconsistency in prior reporting, not a live discrepancy in the data
itself. Reconstructed directly from git history
(`git show <commit>:src/data/people/editorial.ts | grep -c
"interpretationKey:"` at each batch's closing commit) rather than
guessed: pilot close = 15 (matches), Batch 1 close = **32** (so Batch 1
actually added **+17**, not +18 as previously reported), Batch 2 close =
57 (so Batch 2's own "+25" was correct, 32+25=57). The one-item error was
in Batch 1's reported delta, not in any count derived from the live code
— `editorialCoverageStats(SEED_PEOPLE).itemsWithInterpretation` has been
57 all along, both before and after this investigation. No content was
altered to make arithmetic match; only this historical narration was
corrected. `editorialCoverageAudit.ts` now also prints `EN editorial
keys`/`KO editorial keys` (distinct `textKey`/`interpretationKey` counts)
alongside the existing item-level stats, and both `editorialCoverageAudit.ts`
and `editorialCoverageStats()` carry internal consistency assertions
(achievement+moment+turningPoint sums to totalItems, interpretation count
never exceeds totalItems, KO key count never exceeds EN key count) so a
future silent arithmetic drift like this one would surface immediately
rather than needing a git-archaeology pass to catch.

**Batch 3 (`feat/editorial-backfill-batch-3`).** A third 10-person Tier-B
backfill: Franz Kafka, Vincent van Gogh, Thomas Aquinas, Maimonides,
Sequoyah, Sojourner Truth, B. R. Ambedkar, Katherine Johnson, Muhammad
Ali, and Mary Wollstonecraft — selected by ranking the audit tool's
remaining Tier-B people by evidence richness first (all ten comfortably
inside the `Rich` bucket, 536-699 words), then choosing among the
richest candidates for era/region/profession/gender/life-trajectory
diversity rather than taking the top 10 by pure word count alone — the
unadjusted top 10 skewed entirely male and heavily Western-European
(Kafka, van Gogh, Wittgenstein, Edison, Aquinas, Michelangelo, Malcolm X,
Wilbur Wright, Maimonides, Copernicus); Sequoyah (the roster's only
Indigenous American profile), Sojourner Truth, B. R. Ambedkar (South
Asia), Katherine Johnson, and Mary Wollstonecraft were selected instead
of Wittgenstein/Edison/Michelangelo/Wilbur Wright/Copernicus for real
diversity gains at only a modest richness cost (still all ≥536 words,
well clear of the 500-word/10-episode Rich threshold). All content drawn
entirely from each person's existing `data-pipeline/candidates/*.json`
rationale and sources — no external research — with one narrow exception
for Thomas Aquinas: his well-known mystical-experience/"straw" turning
point (why the Summa is unfinished) is not stated verbatim in the
candidate JSON's rationale strings (which only note he "left the Summa
unfinished"), but is uncontested general biographical knowledge directly
consistent with, and explaining, that already-cited fact, sourced to his
own cited Wikipedia/SEP entries and hedged as "a widely documented
account holds" — the same "well-established general knowledge" allowance
Writing Standard v1 already carves out, not new research. Opener
diversity was checked mechanically before and after drafting (not just
at the end): of Batch 3's 20 new interpretations, none repeats another
Batch-3 opener, and the only overlaps with the pre-existing 57-item
corpus are four 2-time reuses of a short "The profile's X score" phrase
shape with a different attribute name each time (never a full-sentence
duplicate) — the corpus's actual most-reused near-identical opener,
"This is consistent with the profile's..." (6 uses), belongs entirely to
the pilot/Batch 1/Batch 2 and was not touched or added to by Batch 3.
Structural validation clean (0 issues), Korean coverage 100%, matching
health unaffected (`simulate.ts 10000 quiz` still shows Warren Buffett's
unchanged 12.0% #1 frequency), and `git diff` against
`src/core/matching`, `src/core/attributes`, `db/`, and every roster file
is empty — only `src/core/i18n/editorial.ts`,
`src/data/people/editorial.ts`, `src/core/people/editorialValidation.ts`
(the two new coverage-stat fields), and `src/dev/editorialCoverageAudit.ts`
(the printed fields + consistency assertions) changed.

Corrected, mechanically-computed figures after Batch 3:

| Tier | Total | Complete | Remaining |
|---|---|---|---|
| A (full evidence ledger) | 8 | 2 | 6 |
| B (qa_passed candidate JSON) | 52 | 32 | 20 |
| C (inline TS comments only) | 35 | 6 | 29 |
| **Total** | **95** | **40** | **55** |

232 total items (109 achievements, 85 moments, 38 turning points), 77
with an interpretation, 309 distinct EN keys / 309 KO keys (100%
coverage).

**Batch 4 (`feat/editorial-backfill-batch-4`) — Tier-A editorial coverage
now COMPLETE (8/8).** Unlike Batches 1-3, this batch deliberately did not
simply take the next 10 Tier-B people: it finished all 6 remaining Tier-A
people first (the highest-evidence category, sourced from full
`src/dev/roster1000/production/<session>/<slug>/evidenceLedger.json`
episode ledgers rather than `data-pipeline/candidates/*.json` rationale),
then used the remaining 4 slots on the strongest available Tier-B `Rich`
candidates by the same richness-first selection rule as earlier batches.

Six Tier-A people: Fyodor Dostoevsky, Louis Pasteur, Louis Armstrong,
Akio Morita, Oscar Niemeyer, Aung San Suu Kyi (990-2215 words, 23-45
ledger episodes each — several times richer than any Tier-B/C source).
Four Tier-B people (ranked richest-first among the 20 remaining, all
comfortably `Rich`, 612-674 words): Ludwig Wittgenstein, Thomas Edison,
Michelangelo, Malcolm X — the unadjusted top 4, kept as-is this round
since (unlike Batch 3, which traded richness for diversity) Tier-A's own
six people already delivered the batch's real diversity (three
continents, four professions, two living-memory 20th-century political
figures, the roster's first Southeast Asian and first Japanese
entrepreneurial-builder editorial profiles).

**A real per-episode provenance constraint, not previously encountered at
this scale, shaped every Tier-A item.** Evidence-ledger episodes carry
their own granular `sourceIds` tags (e.g. `"ENCYC"`, `"SEARCH-AGG"`,
`"WIKI"`) that do NOT always correspond to an entry in that person's own
`Person.sources` array — several of the most famous, richest episodes in
the ledgers (Aung San Suu Kyi's Danubyu rifle-walking moment, several of
Oscar Niemeyer's Wikipedia-only-tagged episodes) were found, checked, and
deliberately excluded for exactly this reason: `SEARCH-AGG` and bare
`WIKI` tags on a per-episode basis don't reliably map to a citable,
committed source id, and inventing a citation to keep a good episode
would have violated the same evidence discipline the Aquinas check (below)
enforces. Every item actually authored traces to a `sourceIds` value that
is a real, verified subset of that person's own committed `sources` array
— checked person-by-person against the roster file, not assumed.

**Aung San Suu Kyi's later-life turning point (2015 State Counsellor
tenure through the 2017 Rohingya crisis, her 2019 ICJ defense, and her
2021 arrest) was written with deliberate additional restraint**, given
the subject: every claim traces to an institutional or press source
already in her `Person.sources` (Human Rights Watch, Journal of
Democracy, Al Jazeera's ICJ transcript, Asia Times), her own actions and
words are reported as exactly that (not moralized), no interpretation
sentence was attached to this specific item (permitted — "not every item
needs one"), and where an interpretation WAS attached to her *other*
turning point (the 1988 return), it deliberately mirrors language already
present, reviewed, and approved in her own canonical `conflict_tolerance`
row rationale in `roster10.ts`, rather than introducing a new causal
claim. Omitting this period of her life entirely was considered and
rejected — her own scored attribute rows (`leadership_drive`,
`conflict_tolerance`, `belief_updating`) already draw directly on this
period, so a profile silent about it would be a less complete, not a
safer, account of a documented public record.

**Thomas Aquinas provenance check (before Batch 4 proper began).** Batch
3's closing note flagged the "straw" turning point (his December 1273
mystical experience and cessation of writing) as resting on general
historical knowledge rather than a rationale-string-cited episode. A
narrow check — fetching the one repository-preserved source with a real
URL, `src_aquinas_wikipedia` — found the episode fully supported,
including the same hedging language ("reportedly," "is said to have")
already used in the shipped copy. One real, minor inaccuracy was found
and fixed: the copy stated Aquinas died "four months" after the event;
the source's own stated dates (6 December 1273 to 7 March 1274) put it
at roughly three months. Fixed in both `EDITORIAL_EN` and `EDITORIAL_KO`.
No broader Aquinas research was performed, per instruction.

Corrected, mechanically-computed figures after Batch 4:

| Tier | Total | Complete | Remaining |
|---|---|---|---|
| A (full evidence ledger) | 8 | **8** | **0** |
| B (qa_passed candidate JSON) | 52 | 36 | 16 |
| C (inline TS comments only) | 35 | 6 | 29 |
| **Total** | **95** | **50** | **45** |

286 total items (128 achievements, 108 moments, 50 turning points), 97
with an interpretation, 383 distinct EN keys / 383 KO keys (100%
coverage). Structural validation clean (0 issues,
`validateEditorial(SEED_PEOPLE)`). Matching health unaffected
(`simulate.ts 10000 quiz`: Warren Buffett #1 frequency 12.0%, unchanged
from the pre-batch baseline) — editorial content is presentation-only and
touches no `src/core/matching`/`src/core/attributes`/roster file, confirmed
by `git diff` scope (only `src/core/i18n/editorial.ts` and
`src/data/people/editorial.ts` changed).

**Batch 5 (`feat/editorial-backfill-batch-5`).** An eighth 8-person Tier-B
backfill (a bounded batch, not the full 16 remaining): Wilbur Wright,
Nicolaus Copernicus, Susan B. Anthony, Galileo Galilei, Niels Bohr,
Immanuel Kant, Octavia Butler, and Rabindranath Tagore — selected as the
top 8 of the 16 remaining Tier-B people by the audit tool's own
evidence-richness ranking (612-558 words, all in the `Rich` bucket,
comfortably above ranks 9-16's 501-442 words), a clean cut that happens
to fall exactly on the audit's own Rich/Adequate bucket boundary. Unlike
Batch 3, no richness was traded for diversity this round — the top 8
already spans 6 geographies (US×3, Poland, Italy, Denmark, Germany,
Bengal/British Raj), 5 domains (aviation, astronomy, activism, physics,
philosophy, literature×2), the Renaissance through the 20th century, and
2 women among 8, so no swap was needed. All content drawn entirely from
each person's existing `data-pipeline/candidates/*.json` rationale and
`sources` array (cross-checked against each person's live `roster*.ts`
`sources` field before writing, not assumed identical) — no external
research. Octavia Butler deliberately shipped with an asymmetric shape (1
achievement, 3 moments, 0 turning points) rather than a forced turning
point: her strongest evidence (day-job years, dated notebook
affirmations, the Clarion workshop) never resolves into one specific,
dated before/after trajectory shift, so no turning point was written for
her, per the "some profiles may deserve fewer items" instruction. Opener
diversity was checked mechanically before commit: of Batch 5's 15
interpretations, all 15 use a distinct 4-word opening phrase, with zero
overlap against the pre-existing corpus's own most-reused openers ("This
is consistent with", 6 uses corpus-wide, unchanged and not added to by
Batch 5). Structural validation clean (0 issues), Korean coverage 100%,
matching health unaffected (`simulate.ts 10000 quiz`: Warren Buffett #1
frequency 12.0%, unchanged), and `git diff` against `src/core/matching`,
`src/core/attributes`, `db/`, and every roster file is empty — only
`src/core/i18n/editorial.ts` and `src/data/people/editorial.ts` changed.

Corrected, mechanically-computed figures after Batch 5:

| Tier | Total | Complete | Remaining |
|---|---|---|---|
| A (full evidence ledger) | 8 | **8** | **0** |
| B (qa_passed candidate JSON) | 52 | **44** | **8** |
| C (inline TS comments only) | 35 | 6 | 29 |
| **Total** | **95** | **58** | **37** |

326 total items (143 achievements, 126 moments, 57 turning points), 112
with an interpretation, 438 distinct EN keys / 438 KO keys (100%
coverage). The 8 remaining Tier-B people (Aristotle, Simón Bolívar, Grace
Hopper, C. V. Raman, Benjamin Banneker, Fela Kuti, Toussaint Louverture,
Chinua Achebe — Aristotle/Bolívar in the `Rich` bucket, the other 6 in
`Adequate`) are the natural Batch 6 pool. Re-run the audit tool for the
current live numbers rather than trusting this table once it goes stale.

**Batch 6 (`feat/editorial-backfill-batch-6`) — Tier-B editorial coverage
now COMPLETE (52/52). Tier B is CLOSED.** The final 8 Tier-B people
confirmed by the audit tool at session start (Aristotle, Simón Bolívar,
Grace Hopper, C. V. Raman, Benjamin Banneker, Fela Kuti, Toussaint
Louverture, Chinua Achebe) were all editorialized. Unlike every prior
batch, this pool was evidence-mixed rather than uniformly `Rich`:
Aristotle and Simón Bolívar remained in the `Rich` bucket (500-501
words), the other 6 were `Adequate` (442-495 words) — the first batch to
draw from that bucket. Per explicit instruction, quantity was reduced
before quality: Aristotle and Bolívar shipped a full 5-item shape (2
achievements, 2 moments, 1 turning point, matching earlier Rich-bucket
batches), while the 6 Adequate people shipped 3-4 items each (2
achievements, 1 moment, 0-1 turning points) — smaller than any prior
batch's per-person average, deliberately, not from a failure to find
material. Benjamin Banneker shipped with zero turning points (2
achievements + 1 moment only) since no episode in his available evidence
resolved into a clean before/after trajectory shift without stretching
the record — the same "some profiles may deserve fewer items" principle
Octavia Butler set in Batch 5.

All content drawn entirely from each person's existing
`data-pipeline/candidates/*.json` rationale and `sources` array
(cross-checked against each person's live `roster*.ts` `sources` field
before writing — confirmed byte-identical for all 8), plus one narrow
class of well-established general historical knowledge consistent with
already-cited sources (e.g. Simón Bolívar's 1828-1830 authoritarian turn
and death, C. V. Raman's 1921 "blue of the sea" research-origin account,
Toussaint Louverture's 1802 capture and 1803 death, Chinua Achebe's 1990
accident and relocation) — no new external research beyond confirming
these were uncontested, standard historical facts already implied by the
person's own cited biography/Wikipedia sources.

**Several profiles in this batch carried real historical-nuance risk,
handled deliberately, per instruction:**
- **Aristotle** — kept to corpus-grounded facts (the surviving corpus's
  own breadth, the Prior Analytics, his own biological fieldwork) for 3
  of 5 items; the 2 items resting on secondhand ancient biographical
  tradition (the Alexander tutorship, the final exile and the "sin twice
  against philosophy" line) are explicitly hedged as later tradition —
  "written several centuries after Aristotle's death," "a widely
  repeated ancient anecdote" — never presented with the same certainty
  as the corpus-sourced items.
- **Simón Bolívar** — the later 1828 assumption of dictatorial power and
  1830 death are presented alongside, not smoothed into, his earlier
  unification project; the interpretation explicitly states "how to read
  Bolívar's motives in this later period is genuinely contested ground"
  rather than resolving the tension.
- **Grace Hopper** — the moth/"bug" anecdote is precise about
  attribution (a team member found it, not confirmed to be Hopper
  herself; the term "bug" predates the incident and she did not coin
  it) and the A-0/COBOL achievement is framed as "led the team," never
  sole invention.
- **C. V. Raman** — the 1928 discovery achievement explicitly names his
  collaborator K. S. Krishnan and states that historians of Indian
  science have noted the sole 1930 Nobel award did not extend to
  Krishnan's substantial role — the one item in this batch most directly
  responding to a named caution (avoid lone-genius framing where
  evidence is collaborative).
- **Benjamin Banneker** — the wooden-clock achievement is stated without
  embellishment (no claims about it running for decades or being
  "first in America"); the Jefferson correspondence states what Jefferson's
  actual reply said (forwarded the almanac to Condorcet) without implying
  it changed his own practice of enslaving people; the debunked
  L'Enfant-memory-reconstruction legend was not used.
- **Fela Kuti** — the February 1977 Kalakuta Republic raid and his
  mother's death are stated as historical fact with no moralizing
  language; the interpretation explicitly separates "the specific
  evidence behind this profile's conflict tolerance score" from "a
  judgment on the underlying political conflict."
- **Toussaint Louverture** — the 1801 constitution is presented with its
  real internal tension intact (permanent abolition of slavery
  co-existing with governor-for-life status and a coercive
  plantation-labor regime that drew contemporary and historical
  criticism); the 1802 capture and 1803 death carry no interpretation at
  all, deliberately, to avoid any deterministic personality-causal
  reading of his downfall.
- **Chinua Achebe** — his literary achievement (Things Fall Apart, the
  Conrad critique), his Biafra diplomatic work, and his 1990
  accident/relocation are kept as three distinct items rather than
  folded into one political narrative, per instruction.

Opener diversity was checked mechanically before commit: Batch 6's 10
interpretations use 10 distinct 4-word opening phrases with zero
internal repeats, and zero overlap with the corpus's own most-reused
openers ("This is consistent with," 6 uses corpus-wide; "This helps
explain the," 5 uses; "The Great Inside reads," 3 uses — all unchanged
by Batch 6). Structural validation clean (0 issues), Korean coverage
100%, matching health unaffected (`simulate.ts 10000 quiz`: Warren
Buffett #1 frequency 12.0%, unchanged), and `git diff` against
`src/core/matching`, `src/core/attributes`, `db/`, and every roster file
is empty — only `src/core/i18n/editorial.ts` and
`src/data/people/editorial.ts` changed.

Corrected, mechanically-computed figures after Batch 6:

| Tier | Total | Complete | Remaining |
|---|---|---|---|
| A (full evidence ledger) | 8 | **8** | **0** |
| B (qa_passed candidate JSON) | 52 | **52** | **0** |
| C (inline TS comments only) | 35 | 6 | 29 |
| **Total** | **95** | **66** | **29** |

359 total items (159 achievements, 136 moments, 64 turning points), 122
with an interpretation, 481 distinct EN keys / 481 KO keys (100%
coverage). **Tier A and Tier B are both now fully editorialized — every
person with committed research evidence beyond bare inline roster
comments has editorial content.** The 29 remaining people are all Tier C
(the original 10-person `seed.ts` roster plus `roster2.ts`'s 25 — the
figures the project's inline `//` rationale comments are the only
evidence source for). Per the governing instruction for this session,
Tier C backfill is explicitly NOT started here — see this file's closing
note and `CLAUDE.md`'s Phase/Roadmap record for the next step, a
deliberate product checkpoint on whether Tier A + Tier B coverage is
already sufficient before any Tier C work is scoped.

**Batch 6 provenance-verification pass (2026-08, before Tier B was
declared closed).** A dedicated closure gate re-checked every Batch-6
claim the original session had described as "general knowledge
consistent with cited sources" against the actual, already-committed
Wikipedia URL in that person's own `sources` array (via the MediaWiki
API, fetching the specific relevant section — never broad new research),
applying the stricter standard "consistent with a source is not enough;
the source must actually support the claim." **8 of the 33 Batch-6 items
required a correction** (all narrowing/precision fixes, none required
removing an item entirely):
- **Aristotle** turning point — the impiety charge and flight to Chalcis
  is dated 322 BCE in the source, not 323 BCE (Alexander's death year);
  his death followed the same year, not "the following year" as
  originally written.
- **Simón Bolívar** — the 1819 Andes-crossing force is "more than 2,000
  soldiers" per the source, not the more precise "roughly 2,100" the
  original draft stated; the 1829-30 turning point's claim that both
  "Venezuela and Ecuador" moved toward separation was narrowed to
  Venezuela only — the source's Final-years section documents Venezuela's
  secession vote explicitly but does not state an Ecuadorian secession in
  this same passage.
- **C. V. Raman** — two corrections, one substantive: the Blue-of-the-Sea
  voyage was **home to India from England**, not "to England" as
  originally written (a reversed direction of travel); and the origin
  account was published in *Nature* about two months after the September
  1921 voyage, making the original interpretation's framing of it as a
  non-contemporaneous "retrospective account... not a contemporaneous
  record" actively false, not merely soft — corrected in both the fact
  and the interpretation. The achievement item's "his student" for K. S.
  Krishnan was also softened to "a research associate," matching the
  source's own wording, and the apparatus description no longer implies
  sunlight and the spectrograph were used in the same phase of the
  experiment (the source shows sunlight/prism for the early visual
  observations, a spectrograph and mercury-arc lamp for the later
  precision measurements).
- **Toussaint Louverture** — the 1802 arrest was ordered by expedition
  commander Charles Leclerc (Napoleon's own instruction was to the
  overall expedition, not this specific arrest order), and the source
  describes contested, ambiguous accounts of exactly how Brunet lured
  Louverture into the meeting — corrected from the more specific,
  unsupported "a promise of safe conduct" to "false pretenses."
- **Grace Hopper** — two corrections: the moth/bug moment's "September 9,
  1947" date is not present in the specific Wikipedia passage this
  person's own committed source resolves to (only "in 1947" is stated) —
  narrowed accordingly. More substantively, the turning-point item's
  claim that she "remained on active duty for nearly another two
  decades" after her 1967 recall was false — the source's dedicated
  Retirement section documents a SECOND retirement in 1971 and a second
  recall in 1972, not one continuous stretch to 1986 — corrected in both
  the fact and its interpretation.

**Two items were independently re-checked and found to need no
correction, worth recording since they demonstrate the audit was not
rubber-stamped**: Chinua Achebe's 1990 accident/relocation turning point
matched its source exactly on every detail, and Fela Kuti's 1977 raid
turning point was confirmed accurate down to details more precise than
the original draft had used (the exact raid date, 18 February 1977, and
his mother's exact death date, 13 April 1978, both absent from the
original text but confirmed supportable). Benjamin Banneker's clock date
("around 1753") and Simón Bolívar's inclusion of Panama among the
liberated territories were also independently verified and left
unchanged. No item's `sourceIds`, `attributeId`, or structural shape
changed — every correction is a same-item text refinement, confirmed by
`validateEditorial(SEED_PEOPLE)` returning 0 issues before and after.
