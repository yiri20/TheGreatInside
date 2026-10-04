# Editorial Major-Achievement Significance Audit

Branch `fix/editorial-major-achievement-significance`. Editorial-selection
change only: no candidate JSON, trait rows, scores, confidence,
evidenceType, eligibility, matching, calibration, portraits, roster
membership or legacy tuples were touched.

**Authoritative base SHA (`EDITORIAL_AUDIT_BASE_SHA`):**
`9b4ad1bf74295c7cef25103ea76caf8834461237` (merge of PR #52, Roster41;
parents `66fb9036…` and `63d9e662…`).

## The user-facing defect

David Bowie's Major Achievements showed the Verbasizer, BowieNet and
Modern Painters / 21 Publishing. His candidate already carried sources for
Ziggy Stardust, the Ziggy retirement, Aladdin Sane, Young Americans, the
Berlin period, Low / "Heroes" and Let's Dance. The defect was **selection**,
not missing research. Fact quality was fine; selection quality had no
rule.

## Conceptual root cause

`docs/editorial-content.md` had strong fact-quality controls (Writing
Standard v1, `validateEditorial`) and no rule for *which* achievements to
foreground. Checked against actual workflow records:

| Candidate cause | Finding |
|---|---|
| Prompts saying editorial should be "consistent with / aligned with final traits" | **Confirmed for Roster33 and Roster38.** Session transcripts for those cycles contain the editorial brief lines "…consistent with actual final traits. Do not overproduce prose." (Roster33) and "…aligned with final traits. Do not turn editorial writing into a major secondary project." (Roster38). The Roster40 checkpoint records "interpretations tied to scored rows". The Roster39/41 brief text was not found by transcript search, so it is not claimed. |
| Research-agent evidence ledgers as the selection pool | **Confirmed.** Roster38/39 checkpoints say editorial was "sourced from each candidate's own sources". Mechanical check: across all 59 recent profiles, **0** have any orientation (Wikipedia/Wikidata) source in their Achievement `sourceIds`; every card is built from the scoring-ledger source cluster. Bowie's three cards map 1:1 to ledger source clusters (Hypebot/VICE, Cybercultural, Sotheby's/TCOP/Daily Beast). |
| Preference for unusually well-sourced episodes | **Confirmed as a symptom.** Failing sets lean on first-hand interview episodes (Verbasizer, Ruth/Barrow 1918, Senna F3 and 1984 Toleman, Keaton's Oregon production, Handel's charity benefits). |
| No canonical-significance check | **Confirmed.** `docs/editorial-content.md` step 1 pointed agents at evidence ledgers/candidate rationales and contained no significance rule; `validateEditorial` is structural by design. |
| "Interesting evidence" treated as "major achievement" | **Confirmed**, same symptom as above. |

The Roster40/41 cohorts failed much less often (1/15 and 3/14); the
Roster40 checkpoint records a fixed 2-3 achievements / 2 moments / 1 turning
point shape, but what that cohort's brief said about selection was not
recoverable, so no cause is claimed for the difference.

Files that defined (or failed to define) achievement selection:
`docs/editorial-content.md` (no selection rule; step 1 "find the evidence
first"), `docs/checkpoints/editorial.md` (status only), the per-cycle
Roster38-41 editorial briefs, and
`src/core/people/editorialValidation.ts` (structural only).

## Major Achievement Selection Standard (summary)

Added to `docs/editorial-content.md` as "Major Achievement Selection
Standard": primary-contribution check, top-omission check, identity check,
significance over novelty, side-project rule, no quota, achievement/trait
separation, source rule, PASS/REWRITE/NEEDS_SOURCE classification. Step 1
of the add-editorial workflow now says evidence pools say what can be
stated, not what matters; "What NOT to do" now forbids choosing
Achievements because they align with traits or are best-sourced.

## Recent cohorts (Roster38-41), derived from `generateRoster38..41`/`roster38..41.ts`

59 profiles: 15 + 15 + 15 + 14. Counts: **PASS 36, REWRITE 23,
NEEDS_SOURCE 0.**

### Roster38 (15): PASS 6, REWRITE 9

| slug | class | reason |
|---|---|---|
| alfred-russel-wallace | REWRITE | co-discovery card never said what the 1858 essay argued; biogeography/Wallace Line and the major books absent |
| ayrton-senna | REWRITE | F3 and 1984 Monaco cards displaced three world titles, 41 wins and the Monaco record |
| david-bowie | REWRITE | Verbasizer/BowieNet/Modern Painters displaced Ziggy, Berlin and Let's Dance (mandatory fix) |
| enzo-ferrari | REWRITE | founding cards without the F1 and Le Mans record that made the marque |
| ernest-rutherford | PASS | disintegration theory, nuclear atom, nitrogen transmutation |
| frank-lloyd-wright | PASS | Unity Temple, Fallingwater, Guggenheim |
| george-mallory | REWRITE | 1921 and 1924 planning present but 1922 altitude record and the 1924 disappearance absent |
| isambard-kingdom-brunel | PASS | Great Western Railway and the Great Britain are his two central works |
| james-cook | REWRITE | Newfoundland survey and scurvy cards without the three Pacific voyages |
| jeff-bezos | PASS | Amazon founding, AWS, Prime |
| konrad-zuse | PASS | Z1/Z3, Plankalkül, Z4 and Zuse KG |
| leonhard-euler | REWRITE | Basel problem and Mechanica present; function concept and notation absent, lunar-theory card was the weaker third |
| rembrandt | REWRITE | etching and self-portrait cards without The Night Watch / Amsterdam group portraits |
| stanley-kubrick | REWRITE | lens and Steadicam process cards dominated; filmography and 2001's standing were absent |
| thor-heyerdahl | PASS | Kon-Tiki, Easter Island, Túcume |

### Roster39 (15): PASS 5, REWRITE 10

| slug | class | reason |
|---|---|---|
| antonie-van-leeuwenhoek | REWRITE | letters and surveyor cards without the discovery of microorganisms |
| babe-ruth | REWRITE | 1918 usage and World Series counts without the home-run transformation |
| buster-keaton | REWRITE | The General card was production logistics with no statement of significance |
| christopher-wren | REWRITE | science and Sheldonian cards first; the post-Fire churches and completed St Paul's were thin |
| frederic-chopin | REWRITE | publication logistics, teaching and a last concert displaced his compositional contribution |
| george-frideric-handel | REWRITE | Messiah plus two charity-benefit cards; opera and national-icon works absent |
| j-p-morgan | PASS | 1895 gold contract, U.S. Steel, 1907 panic |
| james-watt | PASS | separate condenser, sun-and-planet, parallel motion |
| johan-cruyff | REWRITE | Barcelona coaching first; Total Football, Ballon d'Or and the Cruyff turn absent |
| joseph-lister | REWRITE | early physiology led; the antiseptic system sat second |
| niki-lauda | PASS | three titles, Lauda Air, Mercedes role |
| philo-farnsworth | REWRITE | 1927 first electronic image absent; fusion card was a side topic |
| rene-descartes | PASS | Discourse with the Geometry, Meditations |
| robert-goddard | PASS | rocket thrust research, 1926 liquid-fuel launch, gyro control |
| william-herschel | REWRITE | discovery of Uranus sat in a Moment, not an Achievement |

### Roster40 (15): PASS 14, REWRITE 1

| slug | class | reason |
|---|---|---|
| albrecht-durer | PASS | woodcut series, engravings, treatises, major panels |
| auguste-rodin | PASS | Burghers of Calais, Gates of Hell, Musée Rodin |
| charles-babbage | PASS | Difference and Analytical Engines |
| clara-schumann | PASS | concert career, premieres, teaching and edition |
| cornelius-vanderbilt | PASS | steamship lines and New York Central |
| david-livingstone | PASS | trans-Africa journey, Missionary Travels, Zambezi expedition |
| eddy-merckx | REWRITE | business card displaced his Grand Tour, classics-era dominance and Triple Crown |
| hans-christian-andersen | PASS | the tales, novels/travel books, stage works |
| ivan-pavlov | PASS | Nobel, conditioned reflexes, laboratories |
| jim-thorpe | PASS | 1912 Olympics, football, baseball |
| john-snow | PASS | cholera and water, Broad Street, anaesthesia |
| maria-sibylla-merian | PASS | caterpillar volumes, Suriname work, study journal |
| rudolf-diesel | PASS | the engine, licensing and spread, locomotive |
| samuel-morse | PASS | telegraph, painting, daguerreotype |
| santiago-ramon-y-cajal | PASS | Nobel, neuron doctrine, staining methods |

### Roster41 (14): PASS 11, REWRITE 3

| slug | class | reason |
|---|---|---|
| alberto-santos-dumont | PASS | Deutsch prize airship, 14-bis, Demoiselle |
| babe-didrikson-zaharias | PASS | 1932 AAU and Olympics, golf and LPGA |
| emily-dickinson | REWRITE | cards were manuscript/publication logistics; the body of poems and its style were absent |
| giuseppe-verdi | PASS | Rigoletto-La traviata-Aida, Otello-Falstaff (third card is a secondary charity card, permitted) |
| jackie-robinson | PASS | breaking the colour line, MVP, career |
| josiah-wedgwood | PASS | Queen's Ware, jasper, Catherine service |
| jules-verne | REWRITE | Nantes manuscript-purchase and theatre cards; the novels and their reach were absent |
| mary-kingsley | PASS | Ogowe and Cameroon, zoological collection, Travels |
| mary-somerville | PASS | Mechanism of the Heavens, Connexion, RAS |
| max-planck | PASS | quantum constant, Nobel, teaching |
| orville-wright | PASS | Kitty Hawk, Fort Myer, stabilizer |
| paul-cezanne | REWRITE | exhibition-history cards; his bridge to modern art and Mont Sainte-Victoire absent |
| robert-koch | PASS | tuberculosis, anthrax, cholera |
| wilhelm-rontgen | PASS | X-rays, papers, first Nobel |

### Recent totals

- PASS **36** (R38 6, R39 5, R40 14, R41 11)
- REWRITE **23** (R38 9, R39 10, R40 1, R41 3)
- NEEDS_SOURCE **0**: every rewrite was supportable from existing person
  sources (including their orientation sources, as the standard permits);
  no source was added and no candidate JSON was touched.

Rewritten recent slugs (23): david-bowie, alfred-russel-wallace,
ayrton-senna, enzo-ferrari, george-mallory, james-cook, leonhard-euler,
rembrandt, stanley-kubrick, antonie-van-leeuwenhoek, babe-ruth,
buster-keaton, christopher-wren, frederic-chopin, george-frideric-handel,
johan-cruyff, joseph-lister, philo-farnsworth, william-herschel,
eddy-merckx, emily-dickinson, jules-verne, paul-cezanne.

Unresolved recent NEEDS_SOURCE slugs: none.

### Bowie disposition

Old: Verbasizer / BowieNet / Modern Painters + 21 Publishing. New:
(1) Ziggy Stardust and the 1972-73 breakthrough, (2) the Berlin Trilogy
(Low, "Heroes", Lodger), (3) Let's Dance (1983). Third card chosen over
Young Americans because the sources support its scale (V&A: best-selling
album; Louder: No. 1 single in US and UK, 11 million copies); the existing
Let's Dance turning point keeps the *decision*, the Achievement states the
*result*. Verbasizer moved to a Moment (a revealing working-method
episode, no interpretation). BowieNet and Modern Painters / 21 Publishing
were removed as secondary ventures; their sources remain on the person.

Other content moves: Wallace's warning-colouration card and Handel's
Foundling Hospital card became Moments; Senna's and Cook's early-career
and scurvy material was kept as secondary third cards.

## Older control sample (pre-Roster38), 24 profiles

Selection rule: the six required names, then fixed, highest-recognizability
non-political picks per domain from pre-Roster38 profiles with editorial
(science 6, technology/business 5, arts 6, sport/exploration 4, other 3).

| slug | class | reason |
|---|---|---|
| albert-einstein | PASS | 1905 papers, general relativity, 1939 letter |
| marie-curie | PASS | two Nobels, polonium/radium |
| isaac-newton | PASS | calculus/optics/gravity, Principia |
| charles-darwin | PASS | Origin of Species foregrounded |
| alan-turing | PASS | computable numbers, Bombe, Turing test |
| galileo-galilei | PASS | telescope discoveries, quantitative mechanics |
| nikola-tesla | PASS | AC motor and system, Tesla coil |
| steve-jobs | PASS | Apple, Macintosh, iPhone-era Apple, Pixar |
| thomas-edison | PASS | light and power system, Menlo Park lab |
| henry-ford | REWRITE | assembly line named but the Model T and $5 day are absent |
| wilbur-wright | PASS | research programme, three-axis control, first flights |
| ludwig-van-beethoven | PASS | nine symphonies, sonatas, heroic period |
| pablo-picasso | PASS | Cubism, enormous output |
| leonardo-da-vinci | PASS | notebooks, Mona Lisa/Last Supper, anatomy |
| wolfgang-amadeus-mozart | PASS | catalogue, Da Ponte operas |
| vincent-van-gogh | REWRITE | cards describe letters, output rate and sales; no named works or style |
| akira-kurosawa | PASS | Rashomon, Seven Samurai |
| muhammad-ali | PASS | three-time champion foregrounded; second card is promotion style (weak but secondary) |
| pele | PASS | three World Cups; second card is a set-play anecdote (secondary) |
| roald-amundsen | PASS | Northwest Passage, South Pole |
| ernest-shackleton | PASS | Endurance expedition and boat journey |
| stephen-hawking | REWRITE | first card is persevering after diagnosis; Hawking radiation and black-hole work absent |
| michelangelo | PASS | David, Sistine, St Peter's |
| mark-twain | PASS | Huckleberry Finn foregrounded |

Older totals: PASS **21**, REWRITE **3**, NEEDS_SOURCE **0** (all three
have Wikipedia orientation sources attached). 3/24 = **12.5%** < 20%.

**Regression-scope classification: `RECENT_EDITORIAL_REGRESSION`.**
Sensitivity: the decision threshold is 5/24; borderline PASS calls
(Muhammad Ali, Pelé, Picasso, Twain) each foreground their defining
contribution, so they do not fail the primary-contribution check. A
separate, non-selection observation: several older cards are phrased in
trait-evidence language ("rather than…", "evidence against a reward-driven
reading"). That is a framing issue, not a selection failure, and is not
fixed here.

## What changed

- `docs/editorial-content.md`: new standard, step 1 and "What NOT to do".
- `src/data/people/editorial.ts`, `src/core/i18n/editorial.ts`: Achievements
  for the 23 slugs (EN and KO rewritten together), three new Moments
  (Bowie, Wallace, Handel).
- This file and a short pointer in `docs/context/CURRENT_STATE.md`.

## Recommended next task

Resume **Roster42** under the new standard: its editorial brief must say
Achievements are chosen by the Major Achievement Selection Standard (not by
trait alignment or ledger strength) and require running the primary-
contribution and top-omission checks before shipping. Optionally, a small
separate follow-up could repair the three older failures found here
(henry-ford, vincent-van-gogh, stephen-hawking); no broader historical
remediation is warranted by this sample.
