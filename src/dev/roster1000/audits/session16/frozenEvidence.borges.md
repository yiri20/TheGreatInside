# Frozen evidence reconstruction — Jorge Luis Borges (Session 16 audit)

## Reconstruction provenance and limitations

**What was used**: `data-pipeline/candidates/jorge-luis-borges.json` as
committed at `22c77de` (Session 13's own commit; confirmed zero diff
since — see `comparison.md` for the exact verification). Specifically,
the `rationale` string of each of the 16 locked `rows` entries, plus the
`sources` list and the `provenance.notes` field.

**What could NOT be recovered exactly**: Session 13's own
`provenance.notes` states a "factual evidence ledger (19 distinct,
source-attributed episodes)" was built and locked BEFORE any trait score
was written. That pre-scoring ledger was never committed as a standalone
artifact anywhere in this repository (confirmed: no
`jorge-luis-borges`-named file exists outside `data-pipeline/candidates/`
and `docs/roster-1000-checkpoint.md` §79, and §79 itself only reports
aggregate statistics — row/coverage/HC counts — not the ledger content).
**The only frozen evidence actually available for this audit is the
already-scored row rationale text**, which is a POST-hoc audit trail
attached to a trait decision that had already been made, not a neutral,
pre-mapping fact list. This is a genuine, load-bearing limitation of this
audit, stated once here and carried into `comparison.md`'s own
reproducibility-verdict caveat: having read each fact already grouped
under its Session 13 trait heading, this reconstruction cannot be
strictly blind, and the reproducibility figures below should be read as
an upper bound on true independent-scoring agreement, not a clean
from-scratch replication.

**Mitigation actually applied**: episodes below are extracted as atomic,
trait-agnostic facts (stripped of the row they came from) and listed in
a flat, non-thematic order — not grouped by the Session 13 attribute
that originally cited them. Rows were then rebuilt from this flat list
independently, and — where a fact could plausibly support a different or
additional trait than Session 13 chose — that alternative was considered
on its own merits before deciding whether to include it (see
`comparison.md` §"Diagnosis" for several cases where this produced a
genuinely different call, in both directions: traits Session 13 scored
that this audit declined, and one case of independently reasoning to a
different confidence level).

## Sources (unchanged from the locked candidate file)

- `src_borges_wikipedia` — English Wikipedia, "Jorge Luis Borges"
- `src_borges_paris_review` — The Paris Review, "The Art of Fiction No.
  39" (1966), primary interview conducted in his National Library office
- `src_borges_infobae_dictadura` — Infobae (2019), dated press account of
  the 1976-1985 political-reversal sequence, quoting his own letters
- `src_borges_biography` — general biographical accounts (1938
  accident/recovery, library work, Bioy Casares collaboration)

## Reconstructed atomic episodes (flat, trait-agnostic)

| ID | Episode | Source(s) |
|---|---|---|
| E1 | Refused a police order to display Perón's portrait at the writers' society he led (1952); led to the society's forced closure and his own surveillance. | Wikipedia |
| E2 | Resigned the National Library directorship the instant Perón returned to power (1973). | Wikipedia |
| E3 | Praised dictator Videla as "quite a gentleman" at a May 1976 lunch; similarly praised Pinochet months later. | Infobae 2019 |
| E4 | Declined a second Pinochet invitation (1977) after learning his public image was being used for propaganda. | Infobae 2019 |
| E5 | Signed a public solidarity petition (August 1980) after two Mothers of the Plaza de Mayo visited his home and described their experiences directly. | Infobae 2019 |
| E6 | Publicly retracted his earlier pro-junta position after the October 1983 democratic elections, writing that democracy had "refuted me splendidly" (his own published letter). | Infobae 2019 |
| E7 | Attended the 1985 Trial of the Juntas in person; wrote that the military had replaced the civil code with "kidnapping, torture, and clandestine execution." | Infobae 2019 |
| E8 | Resigned immediately (1946) rather than accept a punitive "promotion" to poultry-and-rabbit inspector under Perón. | Wikipedia |
| E9 | Catalogued more than 100 books per day at the Miguel Cane Municipal Library (1938-1946 employment), fast enough to leave little remaining work for other staff. | Wikipedia |
| E10 | Maintained a sustained daily dictation-and-revision ritual at the National Library, observed directly by a Paris Review interviewer present in his office. | Paris Review 1966 (primary) |
| E11 | Revised each poem through two to four full retyped drafts before expressing satisfaction, observed directly by the same interviewer. | Paris Review 1966 (primary) |
| E12 | Later attempted to purchase and destroy all known copies of his own early published pamphlets once he judged them unsatisfactory. | Wikipedia |
| E13 | Continued producing major new work — including a documented stylistic shift that produced "Pierre Menard, Author of the Quixote" — after nearly dying from a severe head injury and subsequent sepsis on Christmas Eve 1938. | Wikipedia |
| E14 | Sustained a prolific literary career for roughly three more decades after becoming completely blind by the late 1950s; never learned Braille; required dictation for every subsequent work. | Wikipedia |
| E15 | After total blindness, shifted toward poetry specifically because its meter/compactness were easier to hold in memory than prose; dictated letters and poems to an assistant who read them back for revision. | Wikipedia; corroborated first-hand by the Paris Review interviewer (1966) |
| E16 | Five-decade joint-pseudonym literary partnership with Adolfo Bioy Casares (from 1932), producing detective fiction, screenplays, and fantastic-literature anthologies as "H. Bustos Domecq." | Wikipedia |
| E17 | Separate, deliberate five-year translation collaboration with Norman Thomas di Giovanni (from 1967), specifically undertaken to reach English-language readers. | Wikipedia |
| E18 | Self-taught French and German as a teenager in Geneva specifically to access philosophy in the original language, on top of a bilingual Spanish/English upbringing. | Wikipedia |
| E19 | Sustained major documented output across poetry, short fiction, literary essay, and two-way literary translation, plus public lecturing (the Charles Eliot Norton Lectures at Harvard, 1967). | Wikipedia |
| E20 | Repeatedly built fabricated scholarly apparatus — invented authors, fictional taxonomies (e.g. "The Analytical Language of John Wilkins"), forged "translations" of nonexistent source texts — as a structural device across multiple distinct works spanning more than two decades, beginning with *A Universal History of Infamy* (1935). | Wikipedia (recurrence across many named works) |
| E21 | Originated fictional criticism/review of nonexistent books, most famously "Pierre Menard, Author of the Quixote" (1939), with well-corroborated critical reception and continued citation as a foundational, widely imitated innovation. | Wikipedia |
| E22 | Repeatedly built entire stories around embracing unresolved paradox and infinite regress as subject matter itself — e.g. "The Library of Babel," "The Garden of Forking Paths" — a recurring thematic choice across dozens of distinct works spanning decades. | Wikipedia |
| E23 | Sustained major-scale creative output across roughly five decades despite blindness for the final third of his career, converging with independent institutional validation: the inaugural 1961 International Formentor Prize (shared with Samuel Beckett), the 1967 Norton Lectures at Harvard, a 1964 British honorary knighthood. | Wikipedia |
| E24 | Both the 1946 and 1973 resignations are specifically documented as immediate, not deliberated-over, acts. | Wikipedia (same underlying facts as E8/E2) |
| E25 | Publicly defied a direct order from an authoritarian government while under active police surveillance (1952), at real professional and personal cost (the closure of the organization he led). | Wikipedia (same underlying fact as E1) |
| E26 | When left without steady employment and with his eyesight failing simultaneously in the mid-1940s, began a new public-lecturing career as an alternate way to sustain himself as a writer. | Wikipedia |

26 atomic episodes reconstructed (Session 13's own provenance note claims
19 distinct pre-scoring episodes — the difference is expected and
explainable: this reconstruction deliberately over-decomposes wherever a
single Session 13 row's rationale bundled more than one dated fact, e.g.
splitting the five-fact belief_updating rationale into E3-E7 individually,
which the original 19-episode count may have grouped more coarsely. No
new fact beyond what the 16 locked rows' rationale text already states
was introduced.)

**SHADOW LOCKED as of this document's creation** — no episode added,
removed, or reworded after `shadowProfile.borges.json` was built from it.
