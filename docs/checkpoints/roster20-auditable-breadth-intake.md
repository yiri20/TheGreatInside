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
| **Helen Keller** | (1) *The Story of My Life* (1903 autobiography, Project Gutenberg, full text, PD) — opened, read, incidents extracted. (2) *Out of the Dark* (1913 essay collection, archive.org non-restricted `_djvu.txt` stream) — opened, read, incidents extracted. (3) *Midstream: My Later Life* (1929 autobiography, archive.org non-restricted `_djvu.txt` stream) — opened, read, incidents extracted. | **3 documents opened, but only 1 independent-provenance source class** (all three are Keller's own voice — see the correction note above). Carried forward to incident mapping on the strength of genuinely rich material, but this independence shortfall is now disclosed as a standing gap, not papered over. |
| **Aleksandr Solzhenitsyn** | (1) *The Gulag Archipelago* (memoir/testimony, archive.org non-restricted `_djvu.txt` stream — a specific upload of this specific abridged edition, verified NOT access-restricted) — opened, read, incidents extracted. (2) "A World Split Apart" — 1978 Harvard commencement address, official Aleksandr Solzhenitsyn Center site — opened, read. (3) Press/secondary corroboration of the Tvardovsky/*Novy Mir* publication episode (multiple independent press/reference accounts, not a single primary text actually opened in full) — weaker, background-corroborated only. | **2 documents opened, but only 1 independent-provenance source class** (both are Solzhenitsyn's own voice — see correction note). Carried forward to incident mapping; independence shortfall disclosed. |
| **Emma Goldman** | (1) *Living My Life* (1931 autobiography, theanarchistlibrary.org, full text) — opened, read (chapters covering 1885-1892). (2) *My Disillusionment in Russia* (1923 memoir, theanarchistlibrary.org, full text) — opened, read in full, rich incident set. (3) Alexander Berkman, *Prison Memoirs of an Anarchist* (1912, independent co-participant account, Gutenberg, PD) — opened; the specific passage fetch did not surface an explicit named reference to Goldman in the section retrieved, so it did not yield usable corroborating content. | **2 documents opened, but only 1 independent-provenance source class** (both self-authored — see correction note; Berkman's independently-authored memoir was opened but not substantively usable, so it does not raise the count). Carried forward to incident mapping; independence shortfall disclosed. |
| **Clara Barton** | (1) *The Story of My Childhood* (autobiography, Gutenberg) + (2) Percy Epler's *The Life of Clara Barton* (biography, archive.org open `_djvu.txt`, opened 3 times across this cycle for different life periods) + (3) William E. Barton's *The Life of Clara Barton* (biography by her cousin, Gutenberg, opened once) — all opened and read. | **3 documents, 2 independent-provenance sources** (Epler + W. E. Barton, both distinct authors from Barton herself — genuinely satisfies the corrected >=2-independent-provenance standard). **Fully evaluated in this correction pass — see Part I.** |
| **John Muir** | (1) *The Story of My Boyhood and Youth* (autobiography, Gutenberg) + (2) *A Thousand-Mile Walk to the Gulf* (autobiography/journal, Gutenberg) + (3) William Frederic Bade's *The Life and Letters of John Muir*, Vols. I-II (near-primary, his letters + independent biographical narrative, archive.org open `_djvu.txt`, opened 4 times across this cycle for different life periods) — all opened and read. | **3 documents, 2 independent-provenance sources** (Bade is a distinct author from Muir himself — genuinely satisfies the corrected >=2-independent-provenance standard). **Fully evaluated in this correction pass — see Part I.** |
| Charles Lindbergh | (1) *"We"* (1927 autobiography, Gutenberg, PD) — opened, read. (2) A. Scott Berg's *Lindbergh* biography and *The Wartime Journals of Charles A. Lindbergh* — both confirmed **access-restricted** (controlled digital lending) on every edition checked; no substantively-readable 2nd source found. | `SOURCE_ACCESS_INSUFFICIENT` |
| P. T. Barnum | (1) *Struggles and Triumphs* / *The Life of P.T. Barnum* (his own memoir, Gutenberg, PD) — opened, read. (2) A. H. Saxon's *P.T. Barnum: The Legend and the Man* — no free full text found anywhere. J. Bryan's *The World's Greatest Showman* — archive.org page did not yield actual text on fetch (landing page only, format unclear whether restricted or a fetch limitation) — not counted as opened. | `SOURCE_ACCESS_INSUFFICIENT` |
| Carl Sagan | Multiple biographies (Davidson's *Carl Sagan: A Life*) confirmed to exist but not freely full-text-readable anywhere found; *Cosmos* itself on archive.org did not yield actual text on fetch. Real secondary journalism on the Harvard tenure denial and 1991 NAS blackballing was found and is genuine, useful background, but does not meet the "actually opened, sufficiently readable for behavioral extraction" bar for a full source class — it is commentary about incidents, not incident-level primary/near-primary material. | `SOURCE_ACCESS_INSUFFICIENT` |
| Jackie Robinson | *I Never Had It Made* (autobiography) and Arnold Rampersad's biography both confirmed **access-restricted** on every Internet Archive edition checked. | `SOURCE_ACCESS_INSUFFICIENT` |

**4 of 9 discovery-pool candidates failed the source-access gate on raw
readability** (no second actually-open document at all) — a real,
expected outcome given how much of Internet Archive's biography holdings
are lending-restricted rather than open text. Of the remaining 5, only
**2 (Barton, Muir) actually have >=2 independent-provenance sources**
under the corrected definition above; Keller, Goldman, and Solzhenitsyn
each have multiple readable documents but only one independent voice
(the subject's own). This is reported as-is, not papered over.

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

## Correction record (post-PR#16 review)

A review of this checkpoint after PR #16 was opened found a real
definitional error, an incomplete evaluation, and two documentation bugs.
This section records the correction; nothing below it was rewritten to
manufacture a different outcome — the original incident ledgers for
Keller, Goldman, and Solzhenitsyn are preserved verbatim, and no further
research was performed on those three.

### 1. Source independence was defined wrong

The standing rule this project uses elsewhere is: **independence means
independent provenance/perspective — a different author, institution, or
vantage point — not merely a different book or article by the same
person.** The original version of this checkpoint conflated "multiple
books" with "multiple independent sources" for three of the five READY
candidates. Corrected below, distinguishing three separate counts that
were previously collapsed into one:

| Candidate | Source count (documents opened) | Source-class count (kinds: autobiography/memoir vs. biography vs. correspondence, etc.) | **Independent-provenance count** (distinct authors/perspectives, excluding the subject's own voice counted once) |
|---|---|---|---|
| Helen Keller | 3 (*Story of My Life*, *Out of the Dark*, *Midstream*) | 1 (all self-authored autobiography/memoir) | **1** — all three are Keller's own voice. `Midstream`'s foreword is by an editorial associate close to her circle, not an arms-length biographer, and was not treated as a separate provenance. |
| Aleksandr Solzhenitsyn | 2 (*The Gulag Archipelago*, Harvard address) | 1 (self-authored testimony/memoir + self-authored speech) | **1** — both are Solzhenitsyn's own voice. (*The Gulag Archipelago* does compile testimony from ~227 other former prisoners, but the specific incidents extracted this cycle — his own arrest and conduct — are his own self-report, not corroborated by one of those other accounts.) |
| Emma Goldman | 2 (*Living My Life*, *My Disillusionment in Russia*) | 1 (self-authored autobiography/memoir, written 9 years apart) | **1** — both are Goldman's own voice. Alexander Berkman's independently-authored *Prison Memoirs of an Anarchist* was opened but did not yield a usable corroborating passage this cycle (recorded honestly in the original text below), so it does not raise this count. |
| Clara Barton | 3 (her own *Story of My Childhood*, Percy Epler's biography, William E. Barton's biography) | 2 (autobiography + biography) | **2** — Epler (a Red Cross associate, not a blood relative, writing after her death) and William E. Barton (her cousin, also writing posthumously) are both distinct authorial voices from Barton's own. W. E. Barton's family relationship is noted as a limit on full arms-length independence, but he is still a separate author with his own narrative judgment, not the subject writing about herself. |
| John Muir | 3 (his own *Story of My Boyhood and Youth* and *A Thousand-Mile Walk to the Gulf*, William Frederic Bade's *Life and Letters*) | 2 (autobiography + biography/letters) | **2** — Bade (Muir's literary executor and friend, writing after his death, contributing his own biographical narrative around Muir's letters) is a distinct authorial voice. The friendship is noted as a limit on full arms-length independence, but this is qualitatively different from a self-authored second book. |

**Correction applied**: every "READY" label and "N sources actually opened"
claim in the table below is now qualified with its independent-provenance
count. Keller, Solzhenitsyn, and Goldman each had exactly **one**
independent-provenance source class this cycle (the subject's own voice,
however many books it appeared in) — this is disclosed honestly as a
standing shortfall against the source-independence standard, alongside
(not instead of) the incident/cluster/attribute-count findings below,
which is why all three still failed even setting the independence question
aside. Barton and Muir are the only two candidates this cycle with a
genuine second, non-self provenance actually opened and read — which is
exactly why they are the two candidates carried to a full, completed
evaluation in this correction pass (see the new Barton/Muir sections
below). No rescue research was performed on Keller, Goldman, or
Solzhenitsyn in this correction — their incident ledgers, fact-cluster
maps, and attribute counts are unchanged from the original run.

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

### Clara Barton (sources: CB1 = *The Story of My Childhood* [self], CB2 = Percy Epler's *The Life of Clara Barton* [independent], CB3 = William E. Barton's *The Life of Clara Barton* Vol. 1 [independent, cousin])

Completed in this correction pass — genuinely continued reading, not a
retrofit onto the earlier partial notes.

| ID | Period | Event | Domain | Source | Provenance |
|---|---|---|---|---|---|
| CB-01 | age 15 | Phrenologist L. W. Fowler assessed her as someone who "will never assert herself for herself... but for others she will be perfectly fearless," and advised giving her responsibility to build self-reliance — advice she later credited as formative | self-knowledge / autonomy need | CB3 | direct (documented outside assessment + her own credited response) |
| CB-02 | first teaching post | Won over four large boys who had driven out a previous teacher, matching their physical games and engaging them intellectually through Scripture discussion rather than asserting authority | leadership / social skill | CB3 | direct |
| CB-03 | childhood | Witnessed an ox slaughtered, was permanently disturbed, became lifelong near-vegetarian | personal values (weak canonical fit) | CB3 | direct |
| CB-04 | 1862, Second Bull Run campaign | Battlefield nursing despite a naturally timid disposition — a contemporary explicitly noted she "had overcome" fear rather than lacking it | risk tolerance / adaptability | CB2 | direct (contemporary account) |
| CB-05 | 1862 | When bandage supplies for the 6th Massachusetts ran out, tore up her own bed sheets on the spot | resourcefulness | CB2 | direct |
| CB-06 | multi-decade, Red Cross presidency | Combined "modesty and self-confidence" per her cousin's account; "forgot herself" in emergencies and acted with firm, undisputed authority | leadership drive / decisiveness | CB2 | near-direct (cousin's biographical account) |
| CB-07 | 1854-1857, Patent Office | Endured open workplace hostility (colleagues smoking in her face, spitting, slandering her); promoted anyway; slanderers later proven false and dismissed | conflict tolerance / persistence | CB2 | direct |
| CB-08 | 1853-1855, Bordentown NJ | Grew a public school from 6 to 600 pupils, then had a male principal installed over her against the pupils' wishes | achievement drive / institutional unfairness (setback) | CB2 | direct |
| CB-09 | 1855 | Suffered a complete loss of voice from exhaustion after the Bordentown push; forced retreat to Washington to recover | adaptability / self-regulation limit | CB2 | direct |
| CB-10 | early independence period | Her brother Stephen defended her right to independent work to their mother | autonomy need (indirect — evidence of others defending, not her own act) | CB2 | near-direct |
| CB-11 | early teaching career | Formative relationships with mentors Colonel Richard C. Stone and educator Jonathan Dana; a former student, George Ferguson, recalled her as loved "almost as much as our mothers" | collaboration / mentorship (positive interpersonal) | CB2 | direct (multiple named voices) |
| CB-12 | 1870, Franco-Prussian War | Was in Switzerland at the war's outbreak, immediately tendered her services, worked with the Grand Duchess of Baden | opportunity sensing / proactive agency | CB3 | direct |
| CB-13 | 1870s-1881 | "For years... her voice almost alone pleaded for" American recognition of the Red Cross/Geneva Convention against sustained "indifference... hostility" | persistence / persuasiveness | CB3 | direct |

**13 incidents, 3 documents (2 independent-provenance), domains**:
self-knowledge, leadership, risk tolerance, resourcefulness, conflict
tolerance, achievement, adaptability, collaboration, opportunity sensing,
persistence, persuasiveness — **10 distinct behavioral domains**, the
broadest of any candidate this cycle.

### John Muir (sources: JM1 = *The Story of My Boyhood and Youth* [self], JM2 = *A Thousand-Mile Walk to the Gulf* [self], JM3 = William Frederic Bade's *The Life and Letters of John Muir*, Vols. I-II [independent])

| ID | Period | Event | Domain | Source | Provenance |
|---|---|---|---|---|---|
| JM-01 | 1849-1860, Wisconsin farm | Grueling 4am-9pm childhood labor schedule, self-described as stunting his growth | persistence / discipline | JM1 (via JM3) | direct |
| JM-02 | c.1858 | Nearly asphyxiated by carbonic-acid gas digging a 90-foot well; rescued by his father, resumed digging until water was struck | persistence (endurance under imposed danger) | JM3 | direct |
| JM-03 | c.1858-60 | Father confronted him over building wooden clocks/an "early-rising machine," calling it "very wrong to waste your time on such nonsense" — Muir continued inventing regardless | independent thinking / autonomy need | JM3 | direct |
| JM-04 | 1874 | Father's surviving letter criticized his glacier studies as ungodly ("cold icy-topped mountains" vs. spiritual devotion) — Muir continued the science | independent thinking / autonomy need (corroborating) | JM3 | direct |
| JM-05 | 1873-74, "Oakland epoch" | Self-confined for 10 months by his own choice to focus on writing despite calling composition something that "frightens me"; completed seven Sierra studies for *Overland Monthly* | discipline | JM3 | direct |
| JM-06 | April-May 1875, Mount Shasta | Trapped overnight in a sudden blizzard in shirtsleeves with guide Jerome Fay during barometric observations; frost-nipped but recovered quickly, valued the "experience" scientifically | risk tolerance / deep focus | JM3 | direct |
| JM-07 | 1870s | Sustained correspondence/mentorship with Jeanne Carr, credited by Muir as more influential on his mountain work "than any one will ever be able to appreciate" | collaboration (positive interpersonal) | JM3 | direct |
| JM-08 | Feb 1876 | Published "God's First Temples," publicly blaming "sheep-men" for over 90% of destructive Sierra forest fires — an early, economically unpopular conservation stance | conflict tolerance | JM3 | direct |
| JM-09 | 1876-77 | Described sustained book-writing as "the life of a glacier, one eternal grind," yet persisted and came to "rather enjoy it" | mastery orientation (developed appreciation for an initially disliked task) | JM3 | direct |
| JM-10 | 1912, published (Hetch Hetchy campaign, 1906-1913) | Publicly branded dam supporters "temple destroyers, devotees of ravaging commercialism" in his own book *The Yosemite*; sustained a decade-long, ultimately losing political fight | conflict tolerance (corroborating) / persistence | background-corroborated — his own published words, verified via multiple independent secondary citations converging on the same text, but *The Yosemite* itself was not directly fetched and read this cycle | secondary/background only |
| JM-11 | March 1867 | Eye injury in an Indianapolis wagon factory, feared permanent blindness ("my right eye... is lost"); during recovery resolved "life was too brief... to waste upon belts and saws" and redirected his life entirely to nature study | belief updating / decisiveness | JM2 | direct |
| JM-12 | Sept 11, 1867 | Facing ten mounted men he recognized as guerrillas on the walk, advanced calmly, greeted them "Howdy," and walked past unharmed | risk tolerance / decisiveness (corroborating) | JM2 | direct |
| JM-13 | Oct 1867, Savannah | Stranded without funds for a week; persuaded a skeptical express clerk to release his money by demonstrating his botanical knowledge in place of identification | resourcefulness / persuasiveness | JM2 | direct |
| JM-14 | Sept 10, 1867, Cumberland Mts. | Won over a skeptical blacksmith who doubted plant study's worth by invoking "Christ says, 'Consider the lilies'" — turned opposition into hospitality | persuasiveness (corroborating) | JM2 | direct |

**14 incidents (13 fully primary-sourced, 1 background-corroborated),
3 documents (2 independent-provenance), domains**: persistence,
independent thinking, autonomy need, discipline, risk tolerance, deep
focus, collaboration, conflict tolerance, mastery orientation, belief
updating, decisiveness, resourcefulness, persuasiveness — **13 distinct
behavioral domains**, the richest incident count of any candidate this
cycle.

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

### Clara Barton — 6 fact clusters, 13 incidents

| Cluster | Incidents | Candidate attributes before cap | Kept after cap (≤3/cluster) |
|---|---|---|---|
| FC-CB-A: Early self-formation | CB-01, 03 | autonomy_need, (CB-03 no clean canonical fit) | autonomy_need (1; inference tier) |
| FC-CB-B: Teaching career | CB-02, 08, 09, 11 | leadership_drive, social_assertiveness, achievement_drive, conflict_tolerance(institutional), adaptability, collaboration | **capped to 3**: leadership_drive (CB-02), achievement_drive (CB-08), collaboration (CB-11) — social_assertiveness, conflict_tolerance-here, and adaptability-here dropped, not separately corroborated |
| FC-CB-C: Civil War nursing | CB-04, 05 | risk_tolerance, resourcefulness | risk_tolerance, resourcefulness (2, under cap) |
| FC-CB-D: Patent Office career | CB-07, 10 | conflict_tolerance, persistence, autonomy_need(dup) | conflict_tolerance, persistence (2; autonomy_need corroboration carried to cluster A) |
| FC-CB-E: Franco-Prussian War / Red Cross founding | CB-12, 13 | opportunity_sensing, persuasiveness, persistence(dup) | opportunity_sensing, persuasiveness (2; persistence corroboration carried to cluster D) |
| FC-CB-F: Red Cross presidency/management style | CB-06 | decisiveness (distinct from leadership_drive already used) | decisiveness (1) |

**Literal count after dedup: 11 distinct canonical attributes**
(autonomy_need, leadership_drive, achievement_drive, collaboration,
risk_tolerance, resourcefulness, conflict_tolerance, persistence,
opportunity_sensing, persuasiveness, decisiveness). Largest single-cluster
reuse: 3 (FC-CB-B, at the cap).

### John Muir — 7 fact clusters, 14 incidents

| Cluster | Incidents | Candidate attributes before cap | Kept after cap |
|---|---|---|---|
| FC-JM-A: Farm childhood / father conflict | JM-01, 02, 03, 04 | persistence, independent_thinking, autonomy_need | persistence, independent_thinking, autonomy_need (3, at cap) |
| FC-JM-B: Oakland writing period | JM-05, 09 | discipline, mastery_orientation | discipline, mastery_orientation (2) |
| FC-JM-C: Mount Shasta storm | JM-06 | risk_tolerance, deep_focus | risk_tolerance, deep_focus (2) |
| FC-JM-D: Jeanne Carr mentorship | JM-07 | collaboration | collaboration (1) |
| FC-JM-E: Sierra conservation advocacy | JM-08, 10 | conflict_tolerance, persistence(dup) | conflict_tolerance (1; persistence corroboration carried to cluster A) |
| FC-JM-F: 1867 eye injury / life pivot | JM-11 | belief_updating, decisiveness | belief_updating, decisiveness (2) |
| FC-JM-G: Thousand-Mile Walk | JM-12, 13, 14 | decisiveness(dup), persuasiveness, resourcefulness | persuasiveness, resourcefulness (2; decisiveness corroboration carried to cluster F) |

**Literal count after dedup: 13 distinct canonical attributes**
(persistence, independent_thinking, autonomy_need, discipline,
mastery_orientation, risk_tolerance, deep_focus, collaboration,
conflict_tolerance, belief_updating, decisiveness, persuasiveness,
resourcefulness). Largest single-cluster reuse: 3 (FC-JM-A, at the cap).
This is the richest literal count of any candidate evaluated this cycle,
and the only one built from a source set with 2 genuine independent-
provenance documents plus 14 (vs. 9-12) incidents — directly consistent
with Part C's finding that a real second, non-self-authored voice
produces measurably better breadth than three self-authored books alone.

## Part I — Freeze-gate verdict

The freeze gate has multiple independent criteria (numbered per the
roster20 brief): (1) >=2 independent-provenance sources actually opened,
(3) >=12 concrete behavioral incidents, (4) >=6 distinct fact clusters,
(5) >=4 behavioral domains, (6) a real interpersonal/collaboration domain,
(7) a real conflict/setback/constraint domain, (8) >=20 canonical
attributes surviving the literal map (preferably >=22, criterion 9), (10)
>=12 of those with STRONG/MODERATE support, (11) no cluster dominance.
**A candidate must pass every criterion — this checkpoint's original
version incorrectly implied criteria 3-7 all passed uniformly before a
single common criterion-8 failure. That was false and is corrected below:
each candidate's actual, specific set of failed criteria is reported,
using the earliest substantive failure as the primary disposition where
the brief specifically named one, while still disclosing every other
failed criterion rather than hiding it behind a single label.**

| Candidate | Crit. 1 (>=2 indep. provenance) | Crit. 3 (>=12 incidents) | Crit. 4 (>=6 clusters) | Crit. 5-7 (domains/interpersonal/conflict) | Crit. 8 (>=20 attributes) | Primary disposition |
|---|---|---|---|---|---|---|
| Helen Keller | **FAIL** (1 — see correction record) | PASS (12) | PASS (6) | PASS (8 domains, both present) | **FAIL** (11) | `ATTRIBUTE_BREADTH_INSUFFICIENT` — this is the earliest gate she fails among 3/4/8 (incident and cluster floors are genuinely cleared), but the criterion-1 independence shortfall is disclosed as a separate, foundational problem that predates it |
| Emma Goldman | **FAIL** (1) | PASS (12) | **FAIL** (5) | PASS (8 domains pre-dedup / 13 angles, both present) | **FAIL** (8) | `FACT_CLUSTER_INSUFFICIENT` (criterion 4 is the earliest of 3/4/8 she fails — 5 clusters against a 6 floor) `+ ATTRIBUTE_BREADTH_INSUFFICIENT` (8 vs. 20) — both reported, not collapsed into one label; criterion-1 shortfall also disclosed |
| Aleksandr Solzhenitsyn | **FAIL** (1) | **FAIL** (9 total / 7 scoreable, both <12) | **FAIL** (3) | PASS (6 domains, both present, though the collaboration angle rests on a background-only item) | **FAIL** (5-6) | `INCIDENT_COUNT_INSUFFICIENT` (criterion 3 is the earliest of 3/4/8 he fails) `+ FACT_CLUSTER_INSUFFICIENT` (4) `+ ATTRIBUTE_BREADTH_INSUFFICIENT` (8) — thinnest candidate on every count; criterion-1 shortfall also disclosed |
| Clara Barton | **PASS** (2 — Epler + W. E. Barton, genuinely independent of Barton herself) | PASS (13) | PASS (6) | PASS (10 domains, both present) | **FAIL** (11) | `ATTRIBUTE_BREADTH_INSUFFICIENT` — the *only* failed criterion; passes 1/3/4/5/6/7 cleanly, the best-qualified candidate on every axis except literal attribute count |
| John Muir | **PASS** (2 — Bade, genuinely independent of Muir himself) | PASS (14) | PASS (7) | PASS (13 domains, both present) | **FAIL** (13) | `ATTRIBUTE_BREADTH_INSUFFICIENT` — the *only* failed criterion; passes 1/3/4/5/6/7 cleanly, and reaches the highest literal attribute count (13) of any candidate this cycle |

**0 of 5 fully-evaluated candidates cleared the roster20 freeze gate.**
(The earlier draft of this checkpoint said "0 of 3" — Barton and Muir had
not yet been carried through the same process; both now have, and both
also failed, at criterion 8 only.) This is reported plainly, per the
brief's own instruction that a zero-freeze result is valid, and it is not
the same failure roster18/19 hit: roster18/19 froze candidates on an
*informal* breadth judgment and only discovered the shortfall after full
scoring. Roster20's literal, cluster-capped map catches the same shortfall
**before any candidate JSON is created** — exactly the stated goal of this
cycle.

The single clearest finding: **Barton and Muir — the two candidates with a
genuine second, independent-provenance source — cleared every criterion
except literal attribute count (11 and 13 respectively, both against a
>=20 floor), while Keller/Goldman/Solzhenitsyn (self-authored-only) also
failed additional, earlier criteria (fact-cluster count for Goldman;
incident count and fact-cluster count for Solzhenitsyn).** Independent
provenance measurably improved breadth (Muir: 14 incidents/7 clusters/13
attributes vs. Solzhenitsyn's 9/3/5-6), but even the best-sourced,
best-evaluated candidate this cycle (Muir) still reached only 13 of the
required 20 literal attributes. No candidate was frozen. No candidate JSON
was written. No scoring was performed. Parts J-Q (freeze audit, deep
evidence pack, final pre-score map, first scoring, calibration comparison,
qa_passed row audit, product readiness, production wiring) do not apply
this cycle because their precondition (a frozen candidate) was never met
for any of the 5.

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
  candidate is frozen, and added a stricter, corrected definition of
  source independence (provenance, not book count). Applied honestly to
  all 5 source-qualified candidates — Keller (1 indep. provenance, 12
  incidents, 6 clusters, 11 attributes), Goldman (1, 12, 5, 8),
  Solzhenitsyn (1, 9, 3, 5-6), Barton (2, 13, 6, 11), Muir (2, 14, 7,
  13) — **every literal count landed lower than roster19's own informal
  estimates typically claimed, and all 5 fell short of the >=20 floor**,
  including the 2 candidates (Barton, Muir) with a genuine second,
  independent-provenance source that cleared every other criterion.

The concrete finding for roster21 is now sharper than the first draft of
this checkpoint could show, because it covers the full source-quality
range instead of stopping at 3 self-authored-only candidates: (1) a rich,
genuinely-read autobiography or near-primary memoir reliably produces many
*behavioral-domain angles* (Goldman: 13) but far fewer *literal,
non-duplicative canonical attributes* once a real fact-cluster cap is
enforced (Goldman: 8) — a small number of dramatic life episodes naturally
cluster many plausible-sounding trait claims onto the same 1-2 underlying
stories; (2) a genuine second, independent-provenance source measurably
helps (Muir's 2-provenance pack reached 13 literal attributes from 14
incidents across 7 clusters — the best result this cycle — against
Solzhenitsyn's 1-provenance pack reaching only 5-6 from 9 incidents across
3 clusters) but **does not by itself close the gap to 20** — Muir, the
strongest candidate found this cycle by every measure, still fell 7
attributes short. Reaching 20+ literal attributes appears to require
source material spanning many more genuinely distinct life periods than
this cycle's 2-4 sources-per-candidate scope produced for any single
person (a full multi-decade, chapter-by-chapter biography, not several
memoir/biography excerpts), which is a methodology question for roster21
research-depth-per-candidate, not fixed unilaterally here.

## Part T — Diff discipline

This cycle's diff is additive-only across exactly **3 files**:
`docs/checkpoints/roster20-auditable-breadth-intake.md` (new),
`docs/checkpoints/roster.md` (one new bullet in "Known open items"), and
`docs/context/CURRENT_STATE.md` (one new "Last updated" entry). No
candidate JSON was created or modified. No existing candidate, roster
file, seed import, generated index, dispersion/calibration data, portrait,
editorial content, or test fixture was touched. `next-env.d.ts`'s
pre-existing unrelated modification (present before this branch was
created, per the original worktree's `git status`) does not exist on this
branch, which was created fresh from `origin/main`.

## Final report

1. **Discovery pool**: 9 candidates (Helen Keller, Aleksandr Solzhenitsyn,
   Emma Goldman, Clara Barton, John Muir, Charles Lindbergh, P. T. Barnum,
   Carl Sagan, Jackie Robinson).
2. **Source-access dispositions**: 5 passed raw readability (Keller,
   Solzhenitsyn, Goldman, Barton, Muir), 4 `SOURCE_ACCESS_INSUFFICIENT`
   (Lindbergh, Barnum, Sagan, Robinson). Of the 5, only **Barton and Muir
   have a genuine >=2 independent-provenance source count**; Keller,
   Goldman, and Solzhenitsyn each have only 1 (multiple self-authored
   books, corrected from the original draft's overstated "READY" framing
   — see the Correction record above).
3. **Candidates reaching preliminary incident extraction**: **all 5**
   (Keller, Solzhenitsyn, Goldman, Barton, Muir) — Barton and Muir's
   evaluation was completed in this correction pass by continuing to read
   the already-identified sources, not by adding new discovery candidates.
4. **Incident counts before freeze**: Keller 12, Goldman 12, Solzhenitsyn
   9 (7 scoreable), Barton 13, Muir 14.
5. **Fact-cluster counts before freeze**: Keller 6, Goldman 5,
   Solzhenitsyn 3, Barton 6, Muir 7.
6. **Literal preliminary mapped-attribute counts**: Keller 11, Goldman 8,
   Solzhenitsyn 5-6, Barton 11, Muir 13 — **all 5 below the >=20 freeze
   floor**, Muir the closest.
7. **Frozen candidates**: **none**.
8. **Full sources actually consulted** (fetched and read, not merely
   found): Helen Keller — *The Story of My Life* (1903), *Out of the Dark*
   (1913), *Midstream: My Later Life* (1929) — 1 independent-provenance
   voice (her own). Aleksandr Solzhenitsyn — *The Gulag Archipelago*
   (abridged), "A World Split Apart" (1978) — 1 independent-provenance
   voice (his own). Emma Goldman — *Living My Life* (1931, Part I), *My
   Disillusionment in Russia* (1923) — 1 independent-provenance voice (her
   own); Alexander Berkman's *Prison Memoirs of an Anarchist* opened but
   not substantively usable. Clara Barton — her own *Story of My
   Childhood*, Percy Epler's *Life of Clara Barton*, William E. Barton's
   *Life of Clara Barton* Vol. 1 — **2 independent-provenance voices**
   beyond her own. John Muir — his own *Story of My Boyhood and Youth* and
   *A Thousand-Mile Walk to the Gulf*, William Frederic Bade's *Life and
   Letters of John Muir* Vols. I-II — **2 independent-provenance voices**
   beyond his own.
9. **Barton sources actually read**: see item 8; 3 documents, 2
   independent-provenance sources, read across 4 separate fetch passes
   this cycle (original + 3 correction-pass reads) covering childhood
   formation, teaching career, Civil War nursing, Patent Office career,
   Franco-Prussian War/Red Cross founding, and Red Cross presidency style.
10. **Barton incident/cluster/mapped-attribute counts**: 13 incidents, 6
   fact clusters, 11 literal canonical attributes (largest cluster reuse:
   3, at the cap).
11. **Barton freeze disposition**: `ATTRIBUTE_BREADTH_INSUFFICIENT` — the
   *only* failed criterion (passes independent-provenance, incident,
   cluster, and domain floors cleanly).
12. **Muir sources actually read**: see item 8; 3 documents, 2
   independent-provenance sources, read across 5 separate fetch passes
   this cycle (original + 4 correction-pass reads) covering farm
   childhood, the Oakland writing period, the Mount Shasta storm, Jeanne
   Carr's mentorship, Sierra conservation advocacy, the 1867 eye injury,
   and the Thousand-Mile Walk.
13. **Muir incident/cluster/mapped-attribute counts**: 14 incidents, 7
   fact clusters, 13 literal canonical attributes (largest cluster reuse:
   3, at the cap) — the strongest result of any candidate this cycle.
14. **Muir freeze disposition**: `ATTRIBUTE_BREADTH_INSUFFICIENT` — the
   *only* failed criterion, same pattern as Barton.
15. **Whether anyone legitimately reached scoring**: **no** — all 5
   fully-evaluated candidates failed the freeze gate on at least criterion
   8 (literal attribute count), so none reached Parts J-Q (freeze audit,
   deep evidence pack, final pre-score map, scoring).
16. **Scoring result**: not applicable — 0 candidates scored.
17. **Final roster20 conclusion**: **0 of 5 fully-evaluated candidates
   cleared the freeze gate.** Keller: fails criterion 8 (11 vs. 20);
   independent-provenance shortfall (criterion 1) also disclosed. Goldman:
   fails criteria 4 (5 vs. 6 clusters) and 8 (8 vs. 20); criterion 1
   shortfall also disclosed. Solzhenitsyn: fails criteria 3 (9/7 vs. 12),
   4 (3 vs. 6), and 8 (5-6 vs. 20); criterion 1 shortfall also disclosed —
   the thinnest candidate on every axis. Barton and Muir both genuinely
   pass criterion 1 (2 independent-provenance sources each) and criteria
   3-7, and both fail *only* criterion 8 (11 and 13 respectively, vs. 20)
   — the best-qualified candidates this cycle, still short.
18. **Validator**: `validateCandidates.ts` — 0 errors, 0 warnings (corpus
   unchanged, no candidate JSON added).
19. **Scoring-lock**: `checkScoringLockIntegrity.ts` — 0 flagged (no
   previously-committed candidate file touched).
20. **Exact PR file scope**: exactly **3 files** —
   `docs/checkpoints/roster20-auditable-breadth-intake.md` (new),
   `docs/checkpoints/roster.md` (updated), `docs/context/CURRENT_STATE.md`
   (updated). The original PR body understated this as 2 files; corrected
   here and in the PR description.
21. **Corrective commit**: see below.
22. **PR #16 status/checks**: unmerged, updated in place on the same
   branch — no new PR created.
23. **Confirmation no candidate was rescued**: no candidate JSON was ever
   created for any of the 9 discovery-pool candidates in either the
   original run or this correction pass; Keller/Goldman/Solzhenitsyn's
   incident ledgers and attribute counts are byte-for-byte unchanged from
   the original run (no rescue research performed on them, per
   instruction); Barton and Muir were genuinely completed, not rescued —
   both failed the same hard gate (criterion 8) applied identically to
   everyone else.
24. **Roster count before/after**: 125 people / 124 match-eligible,
   **unchanged**.

**Disposition: `RESEARCH_ONLY_PR_READY`** (no candidate reached scoring or
promotion; this correction completes the evaluation the original run left
partial, without changing the ultimate research-only outcome).

