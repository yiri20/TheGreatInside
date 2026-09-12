# Roster32: evidence-deepening + match-pool-balance cycle (2026-09)

**Branch:** `feat/roster32-evidence-deepening-balance-cycle`
**Base:** `dec7e16faec6904f7ed7f76788c924c0ec420eba` (PR #32 merge, unchanged)

## What this cycle is, and isn't

Recent batches (Roster25-31) grew the People Directory from 127 to 218
people while the match-eligible pool held flat at 127 — every addition
honestly failed `eligibility_v2`. This cycle is **not** another
bulk-publication batch. Its purpose was to deepen a small, frozen set of
existing `held` candidates with genuinely NEW behavioral research —
authorized for the first time since the Roster28-31 "fast production"
cycles, which deliberately used existing-evidence-only intake — and to
diagnose, honestly, why the Building & Discovery and Arts & Culture
interest-area pools stay thin. The success question is evidence quality
and match-pool usefulness, not production count. **Production count did
not change this cycle** (still 218/217/127) — that is the expected,
correct result, not a shortfall.

## Held-pool inventory: a mechanical finding that reshaped the cohort

Before selecting candidates, the entire held pool (94 candidates) was
mechanically inventoried and categorized by `PROFESSION_CATEGORIES`
multi-membership (a candidate counts toward every category any of their
`fieldIds` maps to, matching how the live Directory/interest-area filters
actually work).

**Building & Discovery, after exclusions, collapses to exactly one viable
candidate.** The raw multi-membership list showed 6 held candidates
touching `business`/`technology`/`computing`/`sport`/`exploration`: Ibn
Battuta, Mary Seacole, Marcus Garvey, John von Neumann, Marco Polo, and
Pelé. Cross-checking against the Group-B evidence-integrity exclusion set
(mechanically reconstructed via the `SS76` provenance marker, 17 files,
plus 5 explicitly-named additions) found **Ibn Battuta, Mary Seacole, John
von Neumann, and Marco Polo are all Group-B** — off-limits, not to be
re-investigated. Marcus Garvey fails the zero-politics gate (his primary
historical significance is Pan-Africanist/UNIA movement leadership, not
his secondary "entrepreneur" tag). That leaves **Pelé alone** — a
mechanically-verified, honest finding about the dataset, not a selection
preference. This is the same discovery method Roster31 used for Group-B
reconstruction, applied fresh here per CLAUDE.md's "verify, don't trust a
cached claim" invariant, and it happened to reveal that several
originally-promising "already rich" candidates (Ibn Battuta 21 rows, Mary
Seacole 21 rows, Zeami Motokiyo 21 rows, Ban Zhao 21 rows, Mimar Sinan 20
rows, Simone de Beauvoir 21 rows, Cicero 21 rows) were **all** Group-B,
eliminating what looked like the strongest shortlist entries before
research began.

Given this, the composition rule's fallback ("minimum 3 B&D, minimum 3
A&C, remaining slots from the stronger category") could not be honestly
met even at its floor — B&D's true ceiling is 1, not 3. The frozen cohort
is **1 Building & Discovery + 7 Arts & Culture**, the honest maximum this
pool supports without violating Group-B or zero-politics.

## Frozen cohort and zero-politics verification

**Roster32 political/state/military/activist-primary count: 0/8.**

| Candidate | Category | Field | Region | Pre-research rows |
|---|---|---|---|---|
| Pelé | Building & Discovery | sport | Latin America | 3 |
| Fahrelnissa Zeid | Arts & Culture | art | West Asia | 5 |
| Virginia Woolf | Arts & Culture | literature | W. Europe | 6 |
| Matsuo Bashō | Arts & Culture | literature | East Asia | 6 |
| James Baldwin | Arts & Culture | literature | N. America | 7 |
| Al-Farabi | Arts & Culture | music/philosophy | West Asia | 9 |
| George Bernard Shaw | Arts & Culture | literature | W. Europe | 13 |
| Pablo Neruda | Arts & Culture | literature | Latin America | 20 |

Zero-politics reasoning per candidate: Pelé, Zeid, Woolf, Bashō — no
political content in their occupation, fields, or existing rows at all.
Baldwin — existing/new rows concern his writing craft and individual
professional conduct, never organizational civil-rights leadership (he
held no such role, unlike Du Bois/Addams/Pankhurst, whose historical
significance *is* the organizing). Al-Farabi — "politics" in his fieldIds
reflects political philosophy he wrote about, not an office he held.
Shaw — Nobel-laureate playwright; his Fabian Society involvement and one
WWI pacifist stance are real but secondary to a dramatic career that would
be remembered independent of them. Neruda — Nobel-laureate poet; every
scored row (existing and new) is about his craft, curiosity, and personal
habits, never his Senate/ambassadorial career, even though it's a
well-known part of his biography.

Considered and explicitly rejected during selection for being ambiguous or
disqualifying: Marcus Garvey (activist-primary, see above), Herodotus
(no diversification benefit over the 5 literature picks already chosen,
plus higher achievement-vs-personality risk for an ancient figure whose
personal behavioral record is thin).

## Research discipline

Research first, ledger second, scoring third, eligibility last — no row
was added or upgraded without a specific new source, and eligibility was
computed exactly once, after every candidate's data was finalized. Two
Wave-3 research agents (Shaw, Neruda) hit a session-wide rate limit
mid-run; per this cycle's own explicit instruction ("if a shared/session
rate limit appears, stop spawning agents and continue sequentially"), no
further parallel agents were spawned — that research was completed
directly and sequentially instead. Concurrency stayed at 2-3 agents
throughout (Wave 1: Pelé/Zeid/Woolf; Wave 2: Bashō/Al-Farabi/Baldwin), all
using `WebSearch`/`WebFetch` rather than the shared interactive browser
pane, specifically to avoid the tab-conflict failure mode this cycle's
brief named.

## Per-candidate record

### Pelé (Building & Discovery — sport)

**Pre-research:** 3 rows, all `inference`, avg confidence ~0.44 — the
existing hold reason explicitly named the gap: available English-language
sourcing is match-statistics/outcomes, not personal behavior.
**Sources opened (4):** his own "Letter to My Younger Self" (Players'
Tribune), FIFA Museum's "a life in his own words," Society for American
Soccer History's "The Pursuit of Pelé," and corroborating press.
**New evidence:** childhood sock-ball/barefoot play and boot-cleaning to
save for a real ball (2 independent firsthand instances of resourcefulness
under scarcity); a specific, dated, quoted childhood promise to his father
to win a World Cup (upgrading `achievement_drive` past outcome-only
inference); recognizing a rehearsed set-play mid-1970-final (paired with
the boot-cleaning instance for `planning_orientation`); a detailed,
well-documented multi-month, thrice-reversed Cosmos negotiation showing
genuinely low `decisiveness`, not the "confident dealmaker" caricature.
**Deliberately excluded:** a 1966 vow to quit international football
after violent fouling — the only source found had no identifiable
byline/date and could not be corroborated within budget; the widely-cited
1969 Nigeria/Biafra "ceasefire" story — investigated and found unsupported
by contemporary press (and doubted by Pelé himself in a later book).
**Rows:** 3 → 6. `achievement_drive` upgraded (NEW_EVIDENCE); `resourcefulness`,
`planning_orientation`, `decisiveness` added.
**Post-lock:** scored=6, coverage=0.17, highConf=4, highConfAvg=0.65,
**not eligible**. Held.

### Fahrelnissa Zeid (Arts & Culture — art)

**Pre-research:** 5 rows (the thinnest candidate in the cohort), 4
sources.
**Sources opened (6):** The Art Newspaper, Hyperallergic, AnOther
Magazine, the Mathaf Encyclopedia, Asian Art Newspaper, and an independent
research blog (Stambouline) citing named archival/family sources.
**New evidence:** an absorbed, trance-like painting process independently
corroborated by both a Tate conservator and her own son (different
outlets, different vantage points); a self-organized, gatekeeping-bypassing
1945 solo exhibition in her own apartment, corroborated across 3 sources —
a second independent instance of the same proactive-institution-building
pattern already scored via her 1970s teaching institute; a distinctive,
twice-independently-quoted teaching philosophy ("forget what you know...
what you do not know is what you really are"); a 1989-90 Trump portrait
commission where she rendered him per her own aesthetic instincts despite
his later written objection; a teenage postcard-selling habit funding her
own art supplies; a self-described flight-over-Baghdad epiphany she
credited for her turn to abstraction.
**Deliberately excluded:** a reported suicide attempt (private-health
content this project's rubric forbids inferring personality from) and a
family-violence detail about her brother and father (not her own action).
**Rows:** 5 → 11. `creative_originality`, `adaptability`, `proactive_agency`
upgraded (NEW_EVIDENCE); `deep_focus`, `perfectionism`, `leadership_drive`,
`resourcefulness`, `autonomy_need`, `intuitive_synthesis` added.
**Post-lock:** scored=11, coverage=0.34, highConf=7, highConfAvg=0.65,
**not eligible**. Held.

### Virginia Woolf (Arts & Culture — literature)

**Pre-research:** 6 rows, 4 sources. Genuinely rich primary-source
*availability* (published diaries, letters) but a research-*coverage* gap,
not an evidence-availability one.
**Sources opened (7):** Woolf Online's digital scholarly edition, Yale's
Modernism Lab (Hogarth Press, her reading of Joyce's Ulysses), a London
Review of Books piece on her TLS reviewing career, Wikipedia's dedicated
"Mr. Bennett and Mrs. Brown" article, and secondary scholarly compilations
of her diary entries on The Years and on Katherine Mansfield.
**New evidence:** a specific, dated (30 Aug 1923) diary entry naming her
"tunnelling" compositional method for Mrs Dalloway; a dated 1922 sequence
showing her view of Ulysses genuinely shift more than once as she read it
and encountered a friend's analysis (`belief_updating`); continuing her
TLS reviewing after a specific 1905-08 editorial rejection; three
successive public reworkings of her rebuttal to Arnold Bennett's 1923
review over 19 months (`conflict_tolerance`); the 1918 joint decision (with
Leonard) declining to publish Joyce's incomplete Ulysses manuscript,
scored cautiously given the joint attribution; a self-reported, sourcing-
caveated instance of professional jealousy toward Katherine Mansfield.
**Deliberately excluded:** a ~2.5-year (1915-17) diary gap and a
nature-observation diary from the same year — both genuinely dateable,
externally-observable behavior, but both sit specifically adjacent to a
documented health crisis this file's own established precedent already
excludes from scoring; using behavior selected *because* of its proximity
to that crisis would functionally back-door the exact inference the
precedent forbids.
**Rows:** 6 → 12. `creative_originality` upgraded (NEW_EVIDENCE);
`perfectionism`, `belief_updating`, `conflict_tolerance`, `persistence`,
`risk_tolerance`, `competitiveness` added.
**Post-lock:** scored=12, coverage=0.37, highConf=8, highConfAvg=0.61,
**not eligible**. Held — of all 8, the strongest case for a dedicated
future deep-research pass, given how much of her published diary volumes
remain untapped.

### Matsuo Bashō (Arts & Culture — literature)

**Pre-research:** 6 rows, 3 sources (Wikipedia, his own Oku no Hosomichi,
general literary-historical assessment).
**Sources opened (4):** Kyoraisho ("Conversations with Kyorai," his
disciple's own teaching-record text, via the Donald Keene anthology on
Wikisource), Haruo Shirane's *Traces of Dreams* (Stanford UP), the
Sora's Diary Wikipedia article, and a World Haiku Review Kyorai
biographical summary.
**New evidence, and a real factual-gate catch:** the discovery of
Kyoraisho as a primary, individually-attributed disciple record was the
single best find of the cycle. Re-reading the actual translated text
against the draft ledger before scoring caught a genuine misattribution:
a line dismissing critic Shōhaku ("completely misses the mark") had been
attributed to Bashō, but the primary text shows it is spoken by his
disciple Kyorai — Bashō's own response was measured praise of Kyorai, not
a blunt dismissal of the critic. A second exchange (a hunting-themed haiku
subject) had been characterized as a confident dismissal; the text
actually shows Bashō pondering at length before a hedged, uncertain
verdict. Both were corrected before staging — the mis-attributed material
was moved to a more accurate row (`collaboration`, since it actually shows
Bashō warmly validating a disciple's independent judgment) and the
hedged-verdict exchange was dropped rather than force-fit anywhere. What
survived scrutiny: two solid, verified Kyoraisho quotes for
`social_assertiveness`; Sora's own contemporaneous, independently
rediscovered diary showing Bashō knowingly reshaped dates/events/poems in
Oku no Hosomichi for literary effect (an unresolved scholarly dispute
about intentionality is noted honestly); a specific 1686 letter backing an
unfashionable disciple poem against contemporary taste for years, and
deliberately timing his core doctrine's disclosure to right after
finishing his famous journey (`independent_thinking`); leaving a paid
judging position over the "frivolity" of the haikai world and adopting a
deliberately ambiguous priest/layman identity (`autonomy_need`
strengthened).
**Deliberately excluded:** a widely-repeated deathbed refusal-of-a-
death-poem story (untraceable to any primary or named-scholar source — has
the shape of too-perfect literary legend); an abandoned-child episode from
his own Nozarashi Kikō (excluded given the *confirmed* Sora's Diary
finding that he reshaped real events for literary effect, which makes a
self-only-sourced emotionally-loaded vignette especially risky to treat as
plain fact); his despondent reaction to the 1682 Fukagawa fire (a genuine,
dated, self-authored poem, but too close to open-ended emotional-state
interpretation to map confidently onto any taxonomy trait without
overreaching).
**Rows:** 6 → 9. `creative_originality`, `autonomy_need` upgraded
(NEW_EVIDENCE); `social_assertiveness`, `collaboration`,
`independent_thinking` added.
**Post-lock:** scored=9, coverage=0.28, highConf=6, highConfAvg=0.58,
**not eligible**. Held — translated disciple records (Sanzoshi, Oi no
Kobumi) beyond Kyoraisho remain a promising future-cycle direction.

### James Baldwin (Arts & Culture — literature)

**Pre-research:** 7 rows, 5 sources — already the best-started candidate
after Neruda.
**Sources opened (6):** the Paris Review's 1984 "Art of Fiction"
interview, Yale's "American Literature in the World" on the
Baldwin-Wright rupture, the Harry Ransom Center's Giovanni's Room
rejection-letter exhibit, Birth.Movies.Death on the Malcolm X screenplay
(plus his own memoir *The Devil Finds Work*), Smithsonian Magazine on
Maya Angelou's 1968 book-deal origins, and Hyperallergic on his mentorship
under painter Beauford Delaney.
**New evidence, deliberately kept to his individual professional/craft
behavior** (this cycle's brief specifically warned against drifting his
evidence toward "activist" framing, given his classification here is
literature/writer): a 38-year mentorship sought out at 15 with painter
Beauford Delaney, credited in his own words twice, decades apart
(`mastery_orientation`); publicly criticizing his own benefactor Richard
Wright's *Native Son* in print in 1949, ending their friendship, and
walking away from a well-funded 1969 Malcolm X screenplay adaptation
rather than accept studio-directed changes — two independent instances of
prioritizing his own judgment at high relational/material cost
(`autonomy_need`); a considered public response to Norman Mailer's public
put-down, combining counter-criticism with an unusual admission of being
hurt (`conflict_tolerance` upgrade); coaching an editor's approach to
Maya Angelou via "reverse psychology" that led to her writing *I Know Why
the Caged Bird Sings* (`persuasiveness` upgrade, a second, very different
context from the Buckley debate); keeping Giovanni's Room's content intact
after Knopf's 1955 rejection and finding another publisher
(`persistence` upgrade); his own account of parallel multi-genre drafting
and a specific longhand-over-typewriter tool choice.
**Deliberately excluded:** a widely-recirculated claim that the Wright
rupture became a physical brawl — traced only to uncited social-media
content, not present in any scholarly source; a claim that Knopf
suggested he "burn" the Giovanni's Room manuscript — could not be verified
against the primary rejection-letter archive.
**Rows:** 7 → 10. `persistence`, `conflict_tolerance`, `persuasiveness`
upgraded (NEW_EVIDENCE); `autonomy_need`, `mastery_orientation`,
`cross_domain_range` added.
**Post-lock:** scored=10, coverage=0.31, highConf=8, highConfAvg=0.66,
**not eligible**. Held.

### Al-Farabi (Arts & Culture — music/philosophy)

**Pre-research:** 9 rows, 3 sources. This candidate's research explicitly
tested for a Hippocrates-style attribution failure, given his 10th-century
dates and reliance on medieval biographical dictionaries.
**Sources opened (2 new, both modern critical scholarship):** the
Stanford Encyclopedia of Philosophy's main Al-Farabi entry and its
dedicated logic/language entry (the latter preserving his own now-lost
account of his training, transmitted via Ibn Abi Usaybi'a).
**The concern was warranted.** Most personal-life texture in the wider
biographical tradition — a claimed modest stipend and declined court
gifts, a court musical-performance anecdote, temperament
characterizations, even the specific circumstances of his death — traces
to biographical dictionaries written 250-320+ years after he died, is
sometimes internally contradictory across those dictionaries, and in one
case (the Aleppo/Sayf al-Dawla patronage narrative) is entirely absent
from the single most philologically rigorous modern source consulted. A
modern peer-reviewed specialist (Pormann, *JAOS* 2015) is quoted
concluding it is doubtful fact and legend can ever be fully separated for
this figure. Even a treatise long attributed to him ("Harmonization of
Plato and Aristotle") has seriously disputed authorship in current
scholarship — noted, and deliberately not used as evidence of his own
method.
**What survived:** exactly two upgrades, both grounded in his own
surviving texts or self-account rather than the later tradition — a
second, independent documented instance for `analytical_rigor` (his Book
of Music explicitly lets the ear override a "clean" mathematical ratio
when they conflict) and a modest strengthening of `mastery_orientation`
(his own, not a biographer's, account of his logic training and its
curricular limits).
**Rows:** 9 → 9 (unchanged count; 2 rows upgraded). No new rows added —
correctly, given the evidentiary reality, not a failure of research
effort.
**Post-lock:** scored=9, coverage=0.27, highConf=3, highConfAvg=0.58,
**not eligible**. Held — this candidate is likely at or near its honest
ceiling absent a genuinely new primary-source discovery, a different kind
of finding than "needs more research."

### George Bernard Shaw (Arts & Culture — literature)

**Pre-research:** 13 rows, 4 sources. The prior session's own hold reason
named the exact gap: working habits and thinking-facet attributes, with
Holroyd's 4-volume biography flagged as the likely fix (not yet consulted
directly).
**Sources opened (4):** Encyclopedia.com, Jot101 (quoting Shaw's own
description of his Pitman-shorthand composition process), the
International Vegetarian Union's history page, and press coverage of his
play prefaces.
**New evidence:** five novels written and rejected by London publishers
1879-83, output continuing regardless (`persistence`, new row); his own
quoted description of composing exclusively in Pitman shorthand,
transcribed by a dedicated typist, with draft pages deliberately destroyed
except archival samples (`detail_orientation`, new row); vegetarianism
adopted in 1881 and sustained without exception for 66 years until his
death, with a specific self-credited trigger (Shelley's *The Revolt of
Islam*) — a second, exceptionally long-duration instance corroborating
the existing `discipline` row; prefaces regularly exceeding his plays in
length (a quantified example: 67 pages for a 29-page play), systematically
arguing marriage, poverty, vivisection, vaccination, and women's rights
(`systems_abstraction`, new row).
**Deliberately excluded:** the well-known "filled five pages a day, rain
or shine" anecdote — repeated across secondary aggregation but untraceable
to a citable primary source within budget; the better-sourced underlying
fact (five novels, continuous output through rejection) was used instead.
**Rows:** 13 → 16. `discipline` upgraded (NEW_EVIDENCE); `persistence`,
`detail_orientation`, `systems_abstraction` added.
**Post-lock:** scored=16 (need 18), coverage=0.48 (need 0.6),
highConfCount=**12** (need 12 — passes), highConfAvg=**0.57** (need 0.55 —
passes). Two of four sub-gates now genuinely pass. **Not eligible** —
held, but now the second-closest-to-eligible candidate in the pool.

### Pablo Neruda (Arts & Culture — literature)

**Pre-research:** 20 rows, 3 sources — already close to eligible.
Deliberately deepened rather than expanded: research targeted new,
independently-corroborating evidence for *existing* rows, not new rows
for their own sake, and specifically avoided his political/diplomatic
career as further evidentiary basis (several existing rows already lean
on it, and this cycle's brief explicitly asked for craft/behavior focus).
**Sources opened (3):** the Fundación Pablo Neruda's own cultural portal
(on his friendship with Federico García Lorca), the Fundación's Isla
Negra museum-house page, and a specialist rare-book dealer's article on
his green-ink writing ritual.
**A diagnostic correction, not just new evidence.** The prior holdReason
attributed the shortfall to "avgConf 0.515 vs 0.55" — recomputing the
actual `eligibility_v2` formula against the pre-cycle rows shows that
number is the legacy flat average across *all* scored rows
(`eligibility_v1`-style), not the statistic the gate actually uses.
`highConfidenceAverage` was already 0.63 pre-cycle, comfortably passing;
the real binding constraint was always `highConfidenceCount` (8 of the
required 12). This is a materially more precise diagnosis than the file
previously carried, arrived at only because the eligibility formula was
independently recomputed rather than the old text trusted.
**New evidence:** a specific, dated (10 Nov 1933), multi-source-corroborated
jointly-improvised "al alimón" speech with García Lorca — a second
instance for `creative_originality`; his Isla Negra house's dedicated
shell-and-marine-curio room and ship-modeled architecture, a
much stronger, externally-verifiable second instance for
`detail_orientation` than the prior poetry-only basis; a sustained,
self-explained lifelong green-ink writing ritual ("the color of hope"),
a new `aesthetic_sensitivity` row.
**Result:** the new evidence genuinely moved `highConfidenceCount` from 8
to 10 (`detail_orientation` crossed the 0.5 line; the new
`aesthetic_sensitivity` row landed exactly at 0.5) — real progress on the
actually-binding constraint, discovered only after the fact. **Two rows
short of eligible.** Per this cycle's explicit rule against hunting one
more trait once a result is known, no further research was attempted
after this became visible.
**Rows:** 20 → 21. `creative_originality`, `detail_orientation` upgraded
(NEW_EVIDENCE); `aesthetic_sensitivity` added.
**Post-lock:** scored=21 (passes), coverage=0.63 (passes),
highConfCount=**10** (need 12), highConfAvg=0.62 (passes). **Not
eligible** — held, the single closest candidate to eligibility in the
pool, exactly 2 high-confidence rows short.

## Publication decision: zero promotions this cycle

All 8 remain `held`. This was a deliberate decision, not an oversight.
`checkPromotionReadiness()` gates only on review status, identity, and a
product-ready portrait — it has no row-count floor, so it does not itself
resolve whether Shaw (16 rows) or Neruda (21 rows) are "publication-ready"
in the judgment sense Section 15 of this cycle's brief calls for. Choosing
not to promote either was based on: (1) this cycle's own repeated,
explicit framing that it is not a publication batch and that production
count is not the success metric; (2) both candidates have already been
through multiple prior review cycles (Neruda: "two remediation rounds"
already recorded; Shaw: the prior session's own named gap) without being
promoted, suggesting considered restraint rather than oversight; (3)
neither cleared a full `eligibility_v2` sub-gate set even after this
cycle's work — Neruda misses by exactly 2 high-confidence rows, Shaw
misses on two of four sub-gates. Promoting either now, immediately after
seeing these numbers, would sit uncomfortably close to the
eligibility-adjacent decision-making this cycle's own Section 10
explicitly warns against, even though publication and match-eligibility
are formally separate gates. Both are recorded here as the strongest
near-term candidates for a **future** cycle to revisit with a
fresh, independently-motivated publication decision — not to be closed
out reactively in this one.

No portraits were sourced and no editorial content was written this
cycle, since nothing was promoted (Section 16/17 of the brief both scope
that work to publication-ready candidates only).

## Match-eligible and interest-area impact

**Zero newly match-eligible people.** Per the brief's explicit rule,
`dispersion.generated.ts`, calibration, and matching-health were correctly
left untouched — none were run.

Interest-area category pool counts (diagnostic, `isMatchEligible`-gated
only) are **unchanged before → after**, since nothing was promoted:

| Category | Before | After |
|---|---|---|
| science_knowledge | 53 | 53 |
| arts_culture | 49 | 49 |
| leadership_society | 44 | 44 |
| building_discovery | 19 | 19 |

**Remaining bottleneck, reported honestly:** Building & Discovery's held
pool is now known to be essentially exhausted (1 viable candidate,
already deepened this cycle) — closing this category's gap in any future
cycle will require either genuinely new candidate discovery (out of scope
for both this cycle and the "fast production" cycles before it) or
accepting that Building & Discovery stays the smallest category for the
foreseeable future. Arts & Culture's held pool, after Group-B/zero-politics
exclusion, was also more literature-concentrated than ideal (5 of 7 new
candidates are writers) — a second honest structural finding about this
specific pool, not a selection preference.

## Validation

- `tsc --noEmit`: clean.
- `validateCandidates.ts`: 0 errors / 0 warnings across all 277 candidate
  files.
- `checkScoringLockIntegrity.ts`: 0 flagged (an intermediate run flagged 6
  files whose `provenance.notes` described the same changes in different
  words than the literal `NEW_EVIDENCE` tag the checker looks for —
  corrected by making the tag explicit in each file's notes, not by
  changing any score).
- Full `vitest run`: **750/750 passing** after one genuine, expected fix —
  `session17Isolation.test.ts` had a frozen-row-count assertion for
  `james-baldwin.json` (7 rows, Session 15's snapshot) that this cycle's
  legitimate deepening broke; updated to 10 rows following the exact
  precedent this same file already established for `enrico-fermi.json` in
  Roster31 (a held/promoted candidate later re-touched by an in-scope
  cycle). `persistence.score` (84, unchanged) was re-verified as still
  correct — only its confidence moved.
- **Not run** (deliberately, since zero production/UI/data files changed):
  `next build`, i18n audit, editorial coverage audit, Playwright. Nothing
  these checks inspect (`src/data/people/`, `src/core/i18n/`, any UI
  route) was touched this cycle; running them would confirm a tautology
  rather than catch a regression.

## Final diff scope

Exactly 9 files: the 8 deepened candidate JSON files plus the one
genuinely-affected test file (`session17Isolation.test.ts`). Confirmed
untouched: `interestScope.ts`, the quiz interest selector, the Results
scope switcher, Landing copy, quiz token/schema, analytics, monetization,
auth, every candidate outside the frozen 8, every Group-B/zero-politics
candidate, `next-env.d.ts`, `.env.local` (copied into the worktree for
local tooling only, confirmed gitignored and never staged), `eligibility_v2`,
the matching formula, calibration, dispersion, `seed.ts`,
`peopleIndex.generated.ts`, and Roster33 (not started).

## Commit + PR

One consolidated commit, pushed once, one PR opened, not merged, per the
brief's explicit instructions. See the PR description for exact commit
SHA / file-count / Vercel status.
