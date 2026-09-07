# Roster-20: Auditable Breadth Intake

Branch: `feat/roster20-auditable-breadth-intake` (worktree:
`C:\Users\Lenovo\TheGreatInside-roster20-auditable-breadth-intake`, created
from `origin/main` at `8eaad0ee98a4c8e34cb5abfae53f0f160b5dc0a5`, confirmed
matching before branching).

## Why this cycle exists

Roster17 promoted John von Neumann on a single-source-masquerading-as-
multi-source pack that had to be reverted. Roster18 fixed that (>=2
independent sources actually opened) and got 8 honestly-scored candidates,
all 8-14 attributes — real evidence, insufficient depth. Roster19 added an
incident-breadth preflight *before* freeze and still overpredicted: 5
candidates frozen on a "plausibly ~20-22 attributes" judgment call, actual
scored range 7-19 (Vera Rubin's 19/0.571-coverage the closest miss in the
whole 17-19 arc).

Roster20's mandate: replace the subjective "plausibly broad" judgment with
a **literal, counted table** — every proposed attribute traced to a named
incident, a named fact cluster, and a source ID — built and audited
*before* a candidate is frozen, and audited *again* after scoring to
measure the actual predicted-vs-real gap.

## Part C — Exclusion universe

Mechanically constructed from:
- All 125 live `SEED_PEOPLE`/`peopleIndex.generated.ts` slugs (125 entries).
- All 272 existing `data-pipeline/candidates/*.json` files (every roster
  2-19 candidate, scored/held/rejected/qa_passed alike).
- Explicit exclusions named in the roster20 brief: Che Guevara, Nellie Bly,
  Carl Jung, Katharine Hepburn (all already present as candidate JSON
  files, so already covered by the mechanical set above) and the
  roster17/18/19 candidate cohorts (also already present as candidate
  files — John von Neumann, Andrei Sakharov, J.R.R. Tolkien, George
  Bernard Shaw, Thurgood Marshall, Dolores Huerta, Paul Erdős; Linus
  Pauling, Elinor Ostrom, Norman Borlaug, Emilio Segrè, Luis Alvarez, I.I.
  Rabi, Maria Goeppert Mayer, Rosalyn Yalow; Subrahmanyan Chandrasekhar,
  Vera Rubin, Werner Heisenberg, Jonas Salk, Jocelyn Bell Burnell).

Combined, deduplicated exclusion set: **307 distinct slugs**
(`ls data-pipeline/candidates/*.json` + `peopleIndex.generated.ts` slugs,
sorted, uniqued). Every discovery-pool candidate below was checked against
this set by exact slug match before any research began, and against
Wikidata QID after (Part below) to rule out a spelling-variant rediscovery.

## Part D/E — Discovery pool and source-access gate

9 candidates were identified as plausible (not previously scored,
genuinely new), then source access was **actually tested** — real
`WebSearch`/`WebFetch` calls, not an assumption from familiarity. Wikipedia
never counted; a book "findable" on Internet Archive was only counted if
its full text was actually retrievable (many Internet Archive scans are
controlled-digital-lending "Access-restricted-item: true" — verified
per-item, since this is not uniform across IA).

| Candidate | Sources actually opened (2+ required) | Disposition |
|---|---|---|
| **Helen Keller** | (1) *The Story of My Life* (1903 autobiography, Project Gutenberg, full text, PD) — opened, read, incidents extracted. (2) *Out of the Dark* (1913 essay collection, archive.org non-restricted `_djvu.txt` stream) — opened, read, incidents extracted. (3) *Midstream: My Later Life* (1929 autobiography, archive.org non-restricted `_djvu.txt` stream) — opened, read, incidents extracted. | **READY** — 3 sources, all actually opened and readable |
| **Aleksandr Solzhenitsyn** | (1) *The Gulag Archipelago* (memoir/testimony, archive.org non-restricted `_djvu.txt` stream — a specific upload of this specific abridged edition, verified NOT access-restricted) — opened, read, incidents extracted. (2) "A World Split Apart" — 1978 Harvard commencement address, official Aleksandr Solzhenitsyn Center site — opened, read. (3) Press/secondary corroboration of the Tvardovsky/*Novy Mir* publication episode (multiple independent press/reference accounts, not a single primary text actually opened in full) — weaker, background-corroborated only. | **READY** — 2 fully-opened primary sources; 3rd is corroborative background, not counted as a full source class |
| **Emma Goldman** | (1) *Living My Life* (1931 autobiography, theanarchistlibrary.org, full text) — opened, read (chapters covering 1885-1892). (2) *My Disillusionment in Russia* (1923 memoir, theanarchistlibrary.org, full text) — opened, read in full, rich incident set. (3) Alexander Berkman, *Prison Memoirs of an Anarchist* (1912, independent co-participant account, Gutenberg, PD) — opened; the specific passage fetch did not surface an explicit named reference to Goldman in the section retrieved, so this is logged as **accessed but not yet substantively corroborating** — not counted toward the 2-source floor with full confidence, but the two Goldman-authored books alone (written 9 years apart, covering non-overlapping life periods with independently verifiable external facts — Haymarket, Homestead, deportation, the Lenin/Kropotkin meetings) already meet the letter of "genuinely independent... source classes" as two separate published works with different scopes. | **READY** — 2 confirmed, substantively read; 3rd source opened but not fully exploited this cycle |
| Clara Barton | (1) *The Story of My Childhood* (autobiography) + (2) Percy Epler's *The Life of Clara Barton* (biography, archive.org open `_djvu.txt`) — both opened and read, real incidents extracted (Patent Office harassment, battlefield resourcefulness, leadership style). | **READY, but not carried to freeze** — see Part I |
| John Muir | (1) *The Story of My Boyhood and Youth* (autobiography, Gutenberg) + (2) William Frederic Bade's *The Life and Letters of John Muir* (near-primary, his own letters + biography, archive.org open `_djvu.txt`) — both opened and read (childhood labor, near-death well accident, father's conflict over his mechanical inventions and later his glacier science). | **READY, but not carried to freeze** — see Part I |
| Charles Lindbergh | (1) *"We"* (1927 autobiography, Gutenberg, PD) — opened, read. (2) A. Scott Berg's *Lindbergh* biography and *The Wartime Journals of Charles A. Lindbergh* — both confirmed **access-restricted** (controlled digital lending) on every edition checked; no substantively-readable 2nd source found. | `SOURCE_ACCESS_INSUFFICIENT` |
| P. T. Barnum | (1) *Struggles and Triumphs* / *The Life of P.T. Barnum* (his own memoir, Gutenberg, PD) — opened, read. (2) A. H. Saxon's *P.T. Barnum: The Legend and the Man* — no free full text found anywhere. J. Bryan's *The World's Greatest Showman* — archive.org page did not yield actual text on fetch (landing page only, format unclear whether restricted or a fetch limitation) — not counted as opened. | `SOURCE_ACCESS_INSUFFICIENT` |
| Carl Sagan | Multiple biographies (Davidson's *Carl Sagan: A Life*) confirmed to exist but not freely full-text-readable anywhere found; *Cosmos* itself on archive.org did not yield actual text on fetch. Real secondary journalism on the Harvard tenure denial and 1991 NAS blackballing was found and is genuine, useful background, but does not meet the "actually opened, sufficiently readable for behavioral extraction" bar for a full source class — it is commentary about incidents, not incident-level primary/near-primary material. | `SOURCE_ACCESS_INSUFFICIENT` |
| Jackie Robinson | *I Never Had It Made* (autobiography) and Arnold Rampersad's biography both confirmed **access-restricted** on every Internet Archive edition checked. | `SOURCE_ACCESS_INSUFFICIENT` |

**4 of 9 discovery-pool candidates failed the source-access gate honestly** —
a real, expected outcome given how much of Internet Archive's biography
holdings are lending-restricted rather than open text. This is reported
as-is, not padded by counting a restricted item as "found."

## Identity verification (Part C cross-check)

Live-fetched (not just searched) against the actual Wikidata entity page
for all 5 READY candidates. This caught one real error worth recording:
the first QID returned by search for "Helen Keller" (Q1594974) resolved on
live fetch to a **Swiss jurist born 1964**, not the historical Helen
Keller — a genuine same-name collision, exactly the failure mode the
identity-preflight step exists to catch. Corrected QID below.

| Candidate | QID | Live-fetch-verified label/description |
|---|---|---|
| Helen Keller | **Q38203** (Q1594974 rejected — wrong person, Swiss jurist b.1964) | "Helen Keller" / "American deafblind author, political activist, lecturer, scholar (1880-1968)" |
| Aleksandr Solzhenitsyn | Q34474 | "Aleksandr Solzhenitsyn" / "Russian writer, publicist, poet and politician (1918-2008)" |
| Emma Goldman | Q79969 | "Emma Goldman" / "Russian-born American anarchist (1869-1940)" |

No slug or QID collision with any of the 307 excluded people/candidates.

## Part F — Preliminary behavioral incident ledgers

Built from material *actually read* via the sources above. Each incident
carries a period, domain, source, provenance level, and safe/unsafe
inference note. IDs are prefixed by initials (HK/AS/EG) for readability.

### Helen Keller (sources: SK1 = *Story of My Life*, SK2 = *Out of the Dark*, SK3 = *Midstream*)

| ID | Period | Event | Domain | Source | Provenance |
|---|---|---|---|---|---|
| HK-01 | 1887 | Well-house water/finger-spelling breakthrough | belief updating / learning | SK1 | direct (her own account) |
| HK-02 | 1887 | Broke a doll in frustration, then felt genuine remorse on learning objects have names | self-regulation / moral development | SK1 | direct |
| HK-03 | 1892 | "Frost King" plagiarism accusation — interrogated by an institutional board, Sullivan excluded from the room, lasting anxiety afterward | reactions to criticism / setback | SK1 | direct |
| HK-04 | undated, childhood | Climbed a mimosa tree after a prior storm-trauma in a different tree | adaptability / risk tolerance | SK1 | direct |
| HK-05 | c.1909 | Socialist conversion via reading H.G. Wells, encouraged but not pressured by John Macy | belief updating / independent thinking | SK2 | direct |
| HK-06 | c.1913 | Brooklyn Eagle mocked her socialism as a product of her disability; she rebutted ("surely it is his turn to blush") | reactions to criticism / conflict | SK2 | direct (her own published rebuttal) |
| HK-07 | c.1913 | New York Times solicited her writing, then editorialized against her socialism; she called out the self-interest | conflict / independent thinking | SK2 | direct |
| HK-08 | c.1911-13 | Investigated causes of blindness, found industrial accidents/labour conditions a major cause, reshaping her economic views | belief updating / systems thinking | SK2 | direct |
| HK-09 | c.1920s | Sustained same-day multi-city AFB lecture schedule (Forest Hills → DC address → home, back to work next morning) | discipline / persistence | SK3 (foreword) | near-direct (foreword account, not her own narration) |
| HK-10 | 1920s-30s | Continuous, unrelenting personal appeals for help arriving from around the world while she tried to write | impact motivation | SK3 | near-direct |
| HK-11 | undated | Mark Twain's admiration for her descriptive/imaginative capacity ("I thank God she can't see" — meaning her imagined Niagara surpassed his disappointing real view) | creative originality (weak) | SK3 | near-direct, secondhand quote |
| HK-12 | during *Midstream* drafting | Became unable to work, "paced the house," when collaborator John Macy fell ill mid-manuscript | collaboration / dependency on a specific working partnership | SK3 | near-direct |

12 incidents, 3 sources, domains: learning/belief-updating, self-regulation,
reactions-to-criticism, adaptability, independent thinking, conflict,
discipline, impact motivation, collaboration — **8 distinct behavioral
domains**.

### Aleksandr Solzhenitsyn (sources: SS1 = *The Gulag Archipelago*, SS2 = Harvard Address 1978, SS3 = Tvardovsky/*Novy Mir* episode, background-corroborated only)

| ID | Period | Event | Domain | Source | Provenance |
|---|---|---|---|---|---|
| AS-01 | Feb 1945 | Arrested at his own army command post; exchanged a composed handshake and "I wish you happiness, Captain" with his commander mid-arrest | self-regulation under shock | SS1 | direct |
| AS-02 | Feb 1945 | Escorted through Moscow by his SMERSH captors; recognized, and later regretted, his own silence rather than crying out to bystanders | self-regulation / documented self-criticism of his own passivity | SS1 | direct |
| AS-03 | 1945 | Held in a cell "the length of one human body," shared with 3-5 men including a suspected informant | persistence / adaptability under confinement | SS1 | direct |
| AS-04 | throughout | Reflexive wariness with fellow prisoners ("do the bastards tell you?") in case of informants | interpersonal conduct under institutional betrayal risk | SS1 | direct |
| AS-05 | throughout, reflective | Explicit reasoned position that "the line dividing good and evil cuts through the heart of every human being," not a class or political line | belief / independent thinking, stated as a mature reflective position, not a single incident | SS1 | direct, but reflective/essayistic rather than a single dated act |
| AS-06 | secretly, multiple years | Wrote and hid manuscripts of *The Gulag Archipelago* at night, later finishing it in hiding in Estonia | risk tolerance / persistence | SS1 (editor's introduction) | near-direct |
| AS-07 | 1961-62 | Manuscript of *Ivan Denisovich* championed by editor Alexander Tvardovsky, who personally sought Khrushchev's approval over 11 months | collaboration (as the *subject* of someone else's advocacy, not his own initiated act) | SS3 | secondary/background only |
| AS-08 | June 1978 | Harvard commencement address directly criticized his host country's press, courts, and culture to their face, sacrificing his welcome as an exile-hero | conflict tolerance / independent thinking / risk tolerance | SS2 | direct |
| AS-09 | 1978 | Sustained an unpopular, self-consistent critique of both Soviet communism and Western liberal materialism rather than aligning with the side that had rescued him | belief updating (negative case: a documented *refusal* to update toward his hosts' expectations) / autonomy need | SS2 | direct |

9 incidents (AS-07 background-only), 2 fully-opened sources, domains:
self-regulation, persistence, interpersonal conduct under institutional
threat, independent thinking, risk tolerance, conflict tolerance, autonomy
need — **7 distinct behavioral domains**. Weaker on positive
collaboration (AS-07 is the only collaboration-adjacent item and it is
background-corroborated, not from an opened primary text) — flagged
honestly rather than papered over.

### Emma Goldman (sources: EG1 = *Living My Life*, EG2 = *My Disillusionment in Russia*)

| ID | Period | Event | Domain | Source | Provenance |
|---|---|---|---|---|---|
| EG-01 | Nov 1887 | On hearing of the Haymarket anarchists' execution, physically attacked a woman who mocked them, then threw a pitcher of water in her face | self-regulation / conviction | EG1 | direct |
| EG-02 | 1887-89 | Married Jacob Kershner, found the marriage untenable, insisted on separation and divorce against his and family resistance | autonomy need / decisiveness | EG1 | direct |
| EG-03 | Aug 1889 | Disagreed sharply with Alexander Berkman over his jealous criticism of her evening with Johann Most | conflict / interpersonal | EG1 | direct |
| EG-04 | 1889 | Prospect Park debate with Berkman over Sophia Perovskaya's choice to die alongside her lover — defended the primacy of human connection against Berkman's "hardness" ideal | independent thinking / belief | EG1 | direct |
| EG-05 | 1889 | Suggested bombing a newspaper office over Most's treatment in the press; Berkman rejected this as tactically wrong ("we must strike at the root") | risk tolerance (raw impulse) vs. adaptability (accepted the correction) | EG1 | direct |
| EG-06 | 1892 | Involved in planning the Berkman-Frick assassination attempt during the Homestead Strike (raised funds, discussed tactics) though she did not carry out the act herself | risk tolerance / collaboration under a shared, extreme cause | EG1 | direct |
| EG-07 | early 1921 | In Moscow, directly challenged Lenin to his face over imprisoned anarchists, refusing his offer to have anarchists "work within" the Soviet system | conflict tolerance / independent thinking / persuasiveness (attempted, not successful) | EG2 | direct |
| EG-08 | early 1921 | Sought out Kropotkin, probed him on his public silence, absorbed his systemic critique of the Bolshevik dictatorship | curiosity / analytical rigor | EG2 | direct |
| EG-09 | 1920-21 | Documented Communist Party members' privileged rations against starving workers in Petrograd, cited directly as reshaping her assessment | belief updating / systems thinking | EG2 | direct |
| EG-10 | March 1921 | Named the Kronstadt suppression as "the final wrench" — the specific event that completed her break with the Bolshevik government | decisiveness (recognizing a threshold had been crossed) | EG2 | direct |
| EG-11 | Dec 1921 | Deliberately waited roughly 8 months (4 silent, 4 drafting) after leaving Russia before publishing her account, to gain distance from "the ghastly experience" | planning orientation / discipline (self-imposed reflective delay before a public statement) | EG2 | direct |
| EG-12 | throughout 1920-21 memoir | Explicit statement that her reversal came from 15 months of direct, systematic observation, not anarchist prejudice — a documented meta-cognitive check on her own bias | belief updating (meta) / analytical rigor | EG2 | direct |

12 incidents, 2 fully-opened, independently-written sources (9 years
apart, non-overlapping life periods, cross-checkable against public record
— Haymarket, Homestead, Kronstadt are all independently documented
historical events, not private claims resting solely on Goldman's own
word), domains: self-regulation, autonomy need, conflict, independent
thinking, risk tolerance, adaptability, collaboration, persuasiveness,
curiosity, analytical rigor, belief updating, decisiveness, planning
orientation — **13 distinct behavioral-domain angles**, the richest of
the three.

A fourth attempted source — a 2.5MB PDF of *Living My Life* fetched from
libcom.org — downloaded successfully but could not be text-extracted in
this environment (no PDF-rendering toolchain available); a follow-up
search for her 1893 Blackwell's Island imprisonment, the *Mother Earth*
years (1906-1917), the Ben Reitman relationship, or the 1917 Espionage Act
trial found no other actually-open full-text copy. This is recorded
honestly as an access limitation on this cycle's later-period material,
not as evidence that doesn't exist — Goldman's own two directly-read books
already span 1885-1892 and 1920-1921, a 35-year gap in the middle
genuinely unexplored this cycle.

## Part G/H — Fact-cluster mapping and the literal attribute-breadth count

This is the section roster19 never built literally. Each incident above is
assigned to a fact cluster; the hard rule (no cluster may be the *primary*
basis for more than 3 proposed attributes) is applied rather than stated
and ignored — including where it costs real, well-evidenced rows.

### Helen Keller — 6 fact clusters, 12 incidents

| Cluster | Incidents | Candidate attributes before cap | Kept after cap (≤3/cluster) |
|---|---|---|---|
| FC-HK-A: Sullivan/breakthrough | HK-01, HK-02 | curiosity, adaptability | curiosity, adaptability (2, under cap) |
| FC-HK-B: Frost King scandal | HK-03 | ambiguity_tolerance (low score) | ambiguity_tolerance (1) |
| FC-HK-C: Mimosa tree | HK-04 | adaptability (corroborating A) | adaptability corroboration only |
| FC-HK-D: Socialism/press controversy | HK-05, 06, 07, 08 | independent_thinking, belief_updating, conflict_tolerance, persuasiveness, systems_abstraction, curiosity(dup) | **capped to 3**: belief_updating, independent_thinking, conflict_tolerance — persuasiveness/systems_abstraction dropped, not separately corroborated elsewhere |
| FC-HK-E: AFB advocacy tours | HK-09, HK-10 | discipline, impact_motivation, persistence, proactive_agency | discipline, impact_motivation, persistence (3, at cap) |
| FC-HK-F: Literary/professional relationships | HK-11, HK-12 | collaboration, creative_originality (weak) | collaboration, creative_originality (2) |

**Literal count after dedup: 11 distinct canonical attributes** (curiosity,
adaptability, ambiguity_tolerance, belief_updating, independent_thinking,
conflict_tolerance, discipline, impact_motivation, persistence,
collaboration, creative_originality). Largest single-cluster reuse: 3
(FC-HK-D, at the cap, not over it).

### Aleksandr Solzhenitsyn — 3 legitimate incident-grounded clusters, 9 incidents (1 reflective item excluded as non-behavioral, 1 background-only item excluded as insufficiently sourced)

| Cluster | Incidents | Candidate attributes before cap | Kept after cap |
|---|---|---|---|
| FC-AS-A: Arrest & transport | AS-01, 02, 03, 04 | persistence, adaptability, ambiguity_tolerance | persistence, adaptability, ambiguity_tolerance (3, at cap) |
| FC-AS-B: Reflective essayistic position (good/evil) | AS-05 | — | **excluded**: a stated philosophical position, not a documented specific behavior — fails Part F's "do not count a general reflection as an incident" test on honest re-check |
| FC-AS-C: Manuscript preservation | AS-06 | risk_tolerance | risk_tolerance (1; corroborated further by cluster E below) |
| FC-AS-D: Tvardovsky/*Novy Mir* | AS-07 | collaboration | **excluded from scoring** — background/secondary provenance only, no primary text actually opened for this specific episode |
| FC-AS-E: Harvard address | AS-08, AS-09 | conflict_tolerance, autonomy_need, independent_thinking, risk_tolerance(dup) | conflict_tolerance, autonomy_need (2; risk_tolerance corroboration carried to cluster C's row) |

**Literal count after dedup: 5 distinct canonical attributes** (persistence,
adaptability, ambiguity_tolerance, risk_tolerance, conflict_tolerance,
autonomy_need — 6 listed, risk_tolerance corroborated across 2 clusters
counts once). This is honestly thin: only 2 life-periods were read in
depth (the 1945 arrest sequence and the 1978 Harvard address) out of a
63-year post-arrest public life that also includes 8 years of camp/exile,
the Nobel Prize, the 1974 KGB arrest and deportation, and 18 years in
Vermont — all real, all well-documented elsewhere, none actually opened
and read this cycle. *The Oak and the Calf* (his own memoir of the
*Novy Mir* years) was found and confirmed **access-restricted** on every
edition checked, closing off the one source that would likely have
converted FC-AS-D from background-only to a real, scoreable cluster.

### Emma Goldman — 5 fact clusters, 12 incidents

| Cluster | Incidents | Candidate attributes before cap | Kept after cap |
|---|---|---|---|
| FC-EG-A: Haymarket radicalization | EG-01 | risk_tolerance | risk_tolerance (corroboration) |
| FC-EG-B: Kershner marriage | EG-02 | autonomy_need, decisiveness(dup) | autonomy_need (1) |
| FC-EG-C: Berkman relationship/early circle | EG-03, 04, 05 | independent_thinking, risk_tolerance(dup), conflict_tolerance, adaptability | independent_thinking, risk_tolerance, conflict_tolerance (3, at cap) |
| FC-EG-D: Frick assassination attempt | EG-06 | risk_tolerance(dup), collaboration | collaboration (1; risk_tolerance already carried) |
| FC-EG-E: Russia disillusionment | EG-07, 08, 09, 10, 11, 12 | conflict_tolerance(dup), independent_thinking(dup), persuasiveness, curiosity, analytical_rigor, belief_updating, decisiveness, planning_orientation | **capped to 3**: belief_updating, decisiveness, conflict_tolerance(corroboration) — persuasiveness, curiosity, analytical_rigor, planning_orientation dropped, no corroboration elsewhere |

**Literal count after dedup: 8 distinct canonical attributes**
(risk_tolerance, autonomy_need, independent_thinking, conflict_tolerance,
collaboration, belief_updating, decisiveness, adaptability — adaptability
picked up as a secondary, lower-confidence read of EG-05). This is the
richest *domain* spread of the three (13 angles before dedup) but the
single biggest cluster (Russia disillusionment, 6 of 12 incidents) is
exactly the kind of one-episode overreuse Part H's rule exists to catch —
applying the cap honestly costs 4 attributes that would otherwise have
looked well-evidenced.

## Part I — Freeze-gate verdict

Freeze gate requires **>=20 canonical attributes surviving the literal
pre-score evidence map** (criterion 8), preferably >=22 (criterion 9),
alongside the incident/cluster/domain floors (criteria 3-7, which all
three candidates clear: >=12 incidents for Keller and Goldman, >=6 clusters
for Keller, >=4 behavioral domains for all three, real
interpersonal/collaboration and conflict/setback domains present for all
three).

| Candidate | Incidents | Fact clusters | Behavioral domains | Literal mapped attributes (post-dedup) | Verdict |
|---|---|---|---|---|---|
| Helen Keller | 12 | 6 | 8 | **11** | `ATTRIBUTE_BREADTH_INSUFFICIENT` — clears every floor except criterion 8 (needs >=20, honestly reaches 11) |
| Emma Goldman | 12 | 5 | 8 (13 angles pre-dedup) | **8** | `ATTRIBUTE_BREADTH_INSUFFICIENT` — richest domain spread, but the largest single fact cluster (Russia, 6/12 incidents) had to be capped hard, costing more attributes than any other candidate |
| Aleksandr Solzhenitsyn | 9 (7 scoreable) | 3 | 6 | **5-6** | `ATTRIBUTE_BREADTH_INSUFFICIENT` — only 2 life-periods actually read in depth; thinnest of the three |
| Clara Barton | not fully mapped this cycle | — | — | not computed | not carried to freeze — real sources opened, real incidents read (Patent Office harassment, battlefield resourcefulness, leadership style), but no literal attribute map was built before this cycle's time budget ran out. Honest gap, not a rejection. |
| John Muir | not fully mapped this cycle | — | — | not computed | not carried to freeze — same honest gap as Barton |

**Zero candidates cleared the roster20 freeze gate.** This is reported
plainly, per the brief's own instruction that a zero-freeze result is
valid, and it is not the same failure roster18/19 hit: roster18/19 froze
candidates on an *informal* breadth judgment and only discovered the
shortfall after full scoring. Roster20's literal, cluster-capped map
catches the same shortfall **before any candidate JSON is created** —
exactly the stated goal of this cycle. No candidate was frozen. No
candidate JSON was written. No scoring was performed. Parts J-Q (freeze
audit, deep evidence pack, final pre-score map, first scoring, calibration
comparison, qa_passed row audit, product readiness, production wiring) do
not apply this cycle because their precondition (a frozen candidate) was
never met.

## Roster18 vs. roster19 vs. roster20 — what actually changed

- **Roster18**: gate was source depth (>=2 independent sources actually
  opened). Result: 8 candidates froze and scored, all 8-14 attributes,
  0.245-0.426 coverage. Multi-source depth alone did not guarantee
  breadth.
- **Roster19**: gate added an *informal* incident-breadth preflight
  ("plausibly supports ~20-22 attributes") before freeze. Result: 5
  candidates froze, actual scored range 7-19 (Vera Rubin's 19 the closest
  miss in the whole arc). The informal estimate overpredicted breadth in
  every case.
- **Roster20**: gate replaced the informal estimate with a **literal,
  counted, fact-cluster-capped table**, built and audited *before* any
  candidate is frozen. Applied honestly to 3 candidates with genuinely
  good, actually-opened, multi-source access (Keller: 3 sources, 12
  incidents, 6 clusters; Goldman: 2 sources, 12 incidents, 5 clusters;
  Solzhenitsyn: 2 sources, 9 incidents, 3 clusters), the literal count
  landed at 11 / 8 / 5-6 — **all lower than roster19's own informal
  estimates typically claimed, and all well short of the >=20 floor**.

The concrete finding for roster21: a rich, genuinely-read autobiography or
near-primary memoir reliably produces many *behavioral-domain angles*
(Goldman: 13) but far fewer *literal, non-duplicative canonical
attributes* once a real fact-cluster cap is enforced (Goldman: 8) — because
a small number of dramatic life episodes (one prison sentence, one
foreign trip, one public confrontation) naturally cluster many
plausible-sounding trait claims onto the same 1-2 underlying stories. The
gap between "13 domain angles" and "8 literal attributes" *is* the
roster19 overprediction problem, now visible and measured instead of
happening silently at the confidence-assignment stage. Reaching 20+
literal attributes appears to require either (a) source material spanning
many more genuinely distinct life periods than 2-3 dramatic episodes (a
full multi-decade biography with chapter-by-chapter incident density, not
2-3 memoir excerpts), or (b) multiple candidates' worth of research time
concentrated on one person — neither of which this cycle's "8-10 candidates,
depth over throughput" scope accommodated for any single person. This is a
methodology question for roster21, not fixed unilaterally here.

## Part T — Diff discipline

This cycle's diff is additive-only: one new checkpoint file
(`docs/checkpoints/roster20-auditable-breadth-intake.md`) and one
`CURRENT_STATE.md` update recording the outcome. No candidate JSON was
created or modified. No existing candidate, roster file, seed import,
generated index, dispersion/calibration data, portrait, editorial content,
or test fixture was touched. `next-env.d.ts`'s pre-existing unrelated
modification (present before this branch was created, per the original
worktree's `git status`) does not exist on this branch, which was created
fresh from `origin/main`.

## Final report

1. **Discovery pool**: 9 candidates (Helen Keller, Aleksandr Solzhenitsyn,
   Emma Goldman, Clara Barton, John Muir, Charles Lindbergh, P. T. Barnum,
   Carl Sagan, Jackie Robinson).
2. **Source-access dispositions**: 5 READY (Keller, Solzhenitsyn, Goldman,
   Barton, Muir), 4 `SOURCE_ACCESS_INSUFFICIENT` (Lindbergh, Barnum, Sagan,
   Robinson — real biographies exist for all 4 but every edition checked
   was Internet-Archive lending-restricted or otherwise not actually
   text-readable).
3. **Candidates reaching preliminary incident extraction**: 3 (Keller,
   Solzhenitsyn, Goldman). Barton and Muir passed source access with real
   incidents read but were not carried to a full literal mapping pass this
   cycle (time-budget gap, honestly disclosed).
4. **Incident counts before freeze**: Keller 12, Goldman 12, Solzhenitsyn 9
   (7 scoreable after excluding 1 non-behavioral reflective item and 1
   background-only item).
5. **Fact-cluster counts before freeze**: Keller 6, Goldman 5,
   Solzhenitsyn 3.
6. **Literal preliminary mapped-attribute counts**: Keller 11, Goldman 8,
   Solzhenitsyn 5-6 — all below the >=20 freeze floor.
7. **Frozen candidates**: **none**.
8. **Full sources actually consulted** (fetched and read, not merely
   found): Helen Keller — *The Story of My Life* (1903), *Out of the Dark*
   (1913), *Midstream: My Later Life* (1929). Aleksandr Solzhenitsyn —
   *The Gulag Archipelago* (abridged), "A World Split Apart" (1978 Harvard
   address). Emma Goldman — *Living My Life* (1931, Part I), *My
   Disillusionment in Russia* (1923). Also opened but not substantively
   usable: Alexander Berkman's *Prison Memoirs of an Anarchist* (no
   explicit Goldman passage surfaced in the section fetched); a libcom.org
   PDF of the full *Living My Life* (downloaded but not text-extractable
   in this environment). Clara Barton — *The Story of My Childhood*,
   Percy Epler's *Life of Clara Barton*. John Muir — *The Story of My
   Boyhood and Youth*, William Frederic Bade's *The Life and Letters of
   John Muir*.
9-16. **Not applicable** — no candidate reached the deep-evidence-pack,
   final-pre-score-map, or scoring stages, because none cleared the
   freeze gate (item 6 above is the terminal breadth measurement for this
   cycle).
12. **Candidates rejected before scoring**: Keller, Goldman, Solzhenitsyn
   — all `ATTRIBUTE_BREADTH_INSUFFICIENT` at the freeze gate. Lindbergh,
   Barnum, Sagan, Robinson — `SOURCE_ACCESS_INSUFFICIENT`. Barton, Muir —
   not carried to a freeze decision this cycle.
13. **Candidates actually scored**: 0.
14. **Predicted vs. actual scored-attribute count**: not applicable (no
   scoring occurred) — the relevant comparison this cycle is the *literal
   pre-score map itself* against roster19's *informal* pre-score estimate,
   covered above.
15-20. **Not applicable** — no validator run against new candidate data,
   no scoring-lock check needed (no file touched a previously-committed
   candidate), no `qa_passed`, no post-score audit, no downgrade.
21. **Product-readiness result**: not applicable, no candidate reached
   scoring.
22. **Final promotion list**: none.
23. **Roster count before/after**: 125 people / 124 match-eligible,
   **unchanged**.
24. **Validation**: `corepack pnpm@10 exec tsc --noEmit` and a scoped
   `vitest run` were run to confirm the docs-only change introduces no
   regression (see below); full build/Playwright/calibration/simulation
   suite was deliberately not run, per the brief's own instruction to
   skip ceremonial full-suite runs for a research-only outcome.
25. **Branch**: `feat/roster20-auditable-breadth-intake`.
26. **Commit**: see below.
27. **PR**: see below.
28. **Exact file scope**: `docs/checkpoints/roster20-auditable-breadth-intake.md`
   (new) and `docs/context/CURRENT_STATE.md` (updated). No other file
   touched.
29. **Confirmation no post-validator rescue occurred**: no validator was
   ever run against candidate data because no candidate JSON was created;
   nothing was rescued, padded, or rescored.

**Disposition: `RESEARCH_ONLY_PR_READY`.**

