# Roster Expansion 125 — Candidate Pool & Selection Audit (DRAFT, unreviewed)

**Status: AUDIT ONLY. No roster/editorial/matching/portrait/monetization files
touched. No one added, scored, or committed. This file itself is untracked
and exists only for human review before any production work begins.**

Scope: 95 → 125 people. This is Step 1-8 of the requested audit: mechanically
profile the current 95, build a ~70-person candidate pool, pre-screen it, cut
to a ~40 shortlist, and recommend a final 30 + 10 alternates + a deferred
list. **No trait scores are assigned or predicted anywhere below** — that is
explicitly the next, separate phase.

Data source for the current-95 audit: `src/data/people/peopleIndex.generated.ts`
(95/95 entries), parsed mechanically (era, regionCode, occupationIds,
fieldIds, impactDomains, tagIds, archetypeIds). Gender is not a stored field
on `Person` — the tallies below are my own classification of the 95 public
figures, not a data-model field, and are used only for this audit's balance
discussion.

---

## 1. Current 95 — composition audit

### Era

| Era | Count | Share |
|---|---|---|
| 20th_century | 29 | 30.5% |
| 19th_century | 21 | 22.1% |
| contemporary | 16 | 16.8% |
| early_modern | 14 | 14.7% |
| medieval | 11 | 11.6% |
| ancient | 4 | 4.2% |

### Region (all 11 controlled-vocabulary regions are represented at least once)

| Region | Count | Share |
|---|---|---|
| north_america | 25 | 26.3% |
| western_europe | 21 | 22.1% |
| east_asia | 9 | 9.5% |
| southern_europe | 8 | 8.4% |
| central_europe | 7 | 7.4% |
| south_asia | 7 | 7.4% |
| latin_america | 6 | 6.3% |
| sub_saharan_africa | 5 | 5.3% |
| north_africa | 3 | 3.2% |
| central_asia | 2 | 2.1% |
| west_asia | 2 | 2.1% |

North America + Western Europe = 46/95 (48.4%) of the roster.
**"Southeast Asia" is not in the 11-region controlled vocabulary at all**
(`region.*` keys in `en.ts`) — there is nowhere to file a Filipino,
Indonesian, Vietnamese, Thai, or Singaporean person today short of adding a
new region key. Aung San Suu Kyi (Myanmar) is filed under `south_asia`,
which is a taxonomy compromise, not a Southeast Asia slot.

### Domain (my classification, one primary bucket per person, from
`fieldIds`/`occupationIds`)

| Domain | Count | Share |
|---|---|---|
| philosophy/religion/intellectual history | 13 | 13.7% |
| science | 22 | 23.2% |
| politics/public leadership | 12 | 12.6% |
| social reform | 10 | 10.5% |
| literature | 9 | 9.5% |
| visual art/design | 8 | 8.4% |
| business/technology | 7 | 7.4% |
| music/performance | 6 | 6.3% |
| other (sport, martial arts, film) | 6 | 6.3% |
| exploration | 2 | 2.1% |

(Science's 22 includes math/physics/computing pioneers; several people carry
a secondary domain not counted here, e.g. Gandhi is politics+social reform.)

### Gender (my classification, not a stored field)

63 male / 32 female (66% / 34%).

### Personality/archetype coverage (`archetypeIds`, one person can carry 2)

| Archetype | Count |
|---|---|
| creative_creator | 25 |
| organizational_leader | 24 |
| independent_creator | 24 |
| scholarly_specialist | 23 |
| social_influencer | 19 |
| scientific_explorer | 14 |
| cross_disciplinary_generalist | 11 |
| technical_innovator | 7 |
| entrepreneurial_builder | 6 |
| competitive_performer | 5 |
| visionary_pioneer | 2 |

## 2. Biggest current gaps

- **Southeast Asia: zero people, and no region code to file them under.**
  The single largest structural gap.
- **West Asia (Middle East): 2** (Atatürk, Rumi) — no Arab world, no
  Levant, no Israel, no pre-modern Ottoman/Persian statecraft beyond one poet.
- **Central Asia: 2** (Ibn Sina, Genghis Khan) — no Silk Road scholarship
  beyond one physician-philosopher, no Timurid/Mughal-founding history.
- **North Africa: 3**, all clustered in Islamic intellectual history
  (Maimonides, Averroes, Ibn Khaldun) — no modern Egypt/Maghreb, no ancient
  Egypt.
- **Latin America: 6** — no modern literature (no García Márquez-tier
  figure), no Caribbean beyond Haiti, no sport, no popular music.
- **Sub-Saharan Africa: 5**, heavily Nigeria-clustered (3 of 5) — no Horn of
  Africa, no Ghana/Kenya-adjacent political founders beyond Maathai, no
  Southern Africa beyond Mandela.
- **Exploration: 2 people total** — thinnest domain in the roster.
- **Music/performance: 6** — no reggae, no Latin, no Indian classical, no
  African vocal tradition beyond Fela/Umm Kulthum.
- **Visual art/design: 8, zero photographers** — painting/architecture/
  animation only.
- **Indigenous representation: 1** (Sequoyah) outside colonizing-power
  narratives.
- **Ancient era: 4**, all Mediterranean/Chinese elite men — no ancient India,
  Egypt, Mesopotamia, no ancient woman.
- **Personality space**: `visionary_pioneer` (2) and `competitive_performer`
  (5) are thin; `entrepreneurial_builder` (6) is thin outside US/Japan tech.
- **Gender: 34% female** — improvable without lowering the bar (see below).

## 3. Overcrowded / redundant areas

- **Physics/math/natural science, 20th-century Western**: Einstein, Bohr,
  Feynman, Newton, Galileo, Curie, Noether, Turing, Ramanujan, C.V. Raman,
  Rosalind Franklin, Copernicus — 22 science people total, the single
  largest domain. Any new science candidate needs a genuinely distinct
  personality shape or geography, not just another physicist.
- **US civil rights, 19th–20th c.**: Susan B. Anthony, Harriet Tubman,
  Sojourner Truth, Frederick Douglass, Malcolm X, MLK, plus Gandhi/Ambedkar
  adjacent — social reform is present but Anglophone-heavy.
- **Nigeria within Sub-Saharan Africa**: Fela Kuti, Chinua Achebe, Wole
  Soyinka — excellent people, but 3 of the region's 5 slots are one country.
- **Philosophy**: already spans ancient Greek + medieval Islamic/scholastic
  + Kant/Wittgenstein — a new philosophy pick needs to clear a high
  differentiation bar (see Step 5 below), not just add another ancient-Greek
  or scholastic-tradition thinker.
- **North America generally**: 25/95, the single largest region — new North
  American candidates need an unusually strong differentiation case.

## 4. Candidate pool (~70)

Grouped by region for readability. Era/field are indicative, not final —
exact taxonomy tagging happens at promotion time per the frozen protocol.

**Southeast Asia** (new region-vocabulary gap, see §15)
1. José Rizal — Philippines, 1861–1896 — writer/reformer, executed martyr
2. Raden Ajeng Kartini — Indonesia, 1879–1904 — women's-education reformer
3. Lee Kuan Yew — Singapore, 1923–2015 — founding PM, state-builder
4. Corazon Aquino — Philippines, 1933–2009 — People Power president
5. Aung San — Myanmar, 1915–1947 — independence leader (Suu Kyi's father)
6. Ho Chi Minh — Vietnam, 1890–1969 — revolutionary/president (CAUTION)
7. Sukarno — Indonesia, 1901–1970 — founding president (CAUTION)

**West Asia / Middle East**
8. Saladin (Salah ad-Din) — c.1137–1193 — military/political leader
9. Suleiman the Magnificent — Ottoman, 1494–1566 — sultan/lawgiver
10. Golda Meir — Israel, 1898–1978 — prime minister
11. Shirin Ebadi — Iran, b.1947 — human-rights lawyer, Nobel laureate
12. Edward Said — Palestine/US, 1935–2003 — literary/postcolonial theorist
13. Omar Khayyam — Persia, 1048–1131 — mathematician/poet (evidence CAUTION)
14. Nizami Ganjavi — Persia/Azerbaijan, c.1141–1209 — poet (evidence CAUTION)
15. Al-Khwarizmi — Khwarazm, c.780–850 — mathematician (evidence CAUTION)

**Central Asia**
16. Al-Biruni — Khwarazm, 973–1048 — polymath scientist
17. Babur — Ferghana/India, 1483–1530 — Mughal founder, memoirist

**South Asia**
18. Akbar the Great — 1542–1605 — Mughal emperor
19. Ashoka the Great — c.304–232 BCE — Mauryan emperor
20. Subhas Chandra Bose — 1897–1945 — militant nationalist (CAUTION)
21. Ravi Shankar — 1920–2012 — sitar virtuoso
22. Ratan Tata — b.1937 — industrialist
23. Chanakya (Kautilya) — c.4th c. BCE — strategist (evidence CAUTION)

**East Asia**
24. Sun Yat-sen — 1866–1925 — founding father of modern China
25. Matsuo Bashō — 1644–1694 — haiku poet
26. Miyamoto Musashi — c.1584–1645 — swordsman/author
27. Tokugawa Ieyasu — 1543–1616 — shogunate founder
28. Chien-Shiung Wu — 1912–1997 — experimental physicist
29. Junko Tabei — 1939–2016 — mountaineer, first woman atop Everest
30. Empress Dowager Cixi — 1835–1908 — regent (redundancy vs. Wu Zetian)
31. Hokusai — 1760–1849 — ukiyo-e printmaker
32. Deng Xiaoping — 1904–1997 — reformist leader (CAUTION, high sensitivity)
33. Sun Tzu — c.5th c. BCE — strategist (evidence INSUFFICIENT, legendary)
34. Laozi — semi-legendary — philosopher (evidence INSUFFICIENT)
35. Siddhartha Gautama (the Buddha) — c.5th c. BCE — (evidence INSUFFICIENT)

**Latin America / Caribbean**
36. José Martí — Cuba, 1853–1895 — poet/independence leader
37. Gabriel García Márquez — Colombia, 1927–2014 — novelist, Nobel laureate
38. Pablo Neruda — Chile, 1904–1973 — poet (CAUTION, misconduct allegations)
39. Rigoberta Menchú — Guatemala, b.1959 — Indigenous-rights Nobel laureate (CAUTION, memoir-accuracy disputes)
40. Eva Perón — Argentina, 1919–1952 — political figure (earned-distinction CAUTION)
41. Diego Rivera — Mexico, 1886–1957 — muralist (redundancy vs. Kahlo)
42. Pelé — Brazil, 1940–2022 — footballer
43. Heitor Villa-Lobos — Brazil, 1887–1959 — composer
44. Bob Marley — Jamaica, 1945–1981 — musician
45. Che Guevara — Argentina/Cuba, 1928–1967 — revolutionary (CAUTION, divisive legacy)
46. Túpac Amaru II — Peru, c.1738–1781 — rebellion leader (evidence CAUTION)
47. Sebastião Salgado — Brazil, 1944–2025 — photographer *(confirmed deceased, d. 2025-05-23, Paris — verified via CNN/Washington Post/PBS, so this fact starts correct rather than needing a later correction)*

**Sub-Saharan Africa**
48. Mansa Musa — Mali, c.1280–c.1337 — emperor (evidence CAUTION, external-chronicler-only sources)
49. Haile Selassie — Ethiopia, 1892–1975 — emperor
50. Kwame Nkrumah — Ghana, 1909–1972 — independence leader, Pan-Africanist
51. Patrice Lumumba — Congo, 1925–1961 — PM (CAUTION, short tenure)
52. Miriam Makeba — South Africa, 1932–2008 — singer/activist
53. Desmond Tutu — South Africa, 1931–2021 — archbishop/reconciliation leader
54. Yaa Asantewaa — Ashanti, c.1840–1921 — war leader (evidence CAUTION)
55. Steve Biko — South Africa, 1946–1977 — anti-apartheid theorist (CAUTION, short life)
56. Queen Nzinga — Angola/Ndongo, c.1583–1663 — resistance leader (evidence CAUTION)
57. Anwar Sadat — Egypt, 1918–1981 — president (assigned North Africa)

**North Africa** (Sadat above; also:)
58. Naguib Mahfouz — Egypt, 1911–2006 — novelist, Nobel laureate
59. Ibn Battuta — Morocco, 1304–1369 — traveler/writer

**Europe (selective — already crowded)**
60. Baruch Spinoza — Netherlands, 1632–1677 — philosopher
61. Simone de Beauvoir — France, 1908–1986 — philosopher/feminist theorist
62. Hannah Arendt — Germany/US, 1906–1975 — political theorist
63. Miguel de Cervantes — Spain, 1547–1616 — novelist
64. Stephen Hawking — UK, 1942–2018 — theoretical physicist
65. Marco Polo — Venice, 1254–1324 — traveler (CAUTION, historicity debated)
66. Mary Kingsley — UK, 1862–1900 — explorer
67. Roald Amundsen — Norway, 1872–1928 — polar explorer
68. Anita Roddick — UK, 1942–2007 — ethical-business founder

**North America (selective)**
69. Madam C.J. Walker — US, 1867–1919 — self-made entrepreneur
70. Chief Joseph — Nez Perce, c.1840–1904 — resistance leader
71. Tecumseh — Shawnee, 1768–1813 — resistance leader (evidence CAUTION, no first-person record)
72. Norman Borlaug — US, 1914–2009 — agronomist, Green Revolution

(72 total — comfortably "approximately 70," intentionally erring toward more
options so the cut in Step 7 is a real selection, not a rubber stamp.)

## 5. Pre-screen table

Legend: Significance H/M/L · Evidence A–D · Portrait A–D · Redundancy L/M/H

| # | Candidate | Significance | Evidence | Portrait | Redundancy |
|---|---|---|---|---|---|
| 1 | José Rizal | H | A | A | L |
| 2 | Kartini | M | A | A | L |
| 3 | Lee Kuan Yew | H | A | A | L |
| 4 | Corazon Aquino | M | A | A | M |
| 5 | Aung San | M | B | B | M (vs. Suu Kyi) |
| 6 | Ho Chi Minh | H | A | A | L (CAUTION: political sensitivity) |
| 7 | Sukarno | H | A | A | L (CAUTION: political sensitivity) |
| 8 | Saladin | H | B | D | L |
| 9 | Suleiman the Magnificent | H | A | B | L |
| 10 | Golda Meir | H | A | A | L |
| 11 | Shirin Ebadi | M | A | A | L |
| 12 | Edward Said | H | A | A | L |
| 13 | Omar Khayyam | M | C | C | L |
| 14 | Nizami Ganjavi | M | C | D | L |
| 15 | Al-Khwarizmi | H | C | D | L |
| 16 | Al-Biruni | H | B | D | L |
| 17 | Babur | H | A | B | L |
| 18 | Akbar the Great | H | A | B | L |
| 19 | Ashoka the Great | H | B | D | L |
| 20 | Subhas Chandra Bose | M | A | A | M (CAUTION) |
| 21 | Ravi Shankar | M | A | A | L |
| 22 | Ratan Tata | M | B | A | M |
| 23 | Chanakya | M | D | D | L |
| 24 | Sun Yat-sen | H | A | A | L |
| 25 | Matsuo Bashō | M | B | C | L |
| 26 | Miyamoto Musashi | M | B | C | M (vs. Bruce Lee, mild) |
| 27 | Tokugawa Ieyasu | M | A | B | L |
| 28 | Chien-Shiung Wu | M | A | A | L |
| 29 | Junko Tabei | M | A | A | L |
| 30 | Empress Dowager Cixi | M | A | A | H (vs. Wu Zetian) |
| 31 | Hokusai | M | B | A | L |
| 32 | Deng Xiaoping | H | A | A | L (CAUTION: political sensitivity) |
| 33 | Sun Tzu | H | D | D | L |
| 34 | Laozi | H | D | D | L |
| 35 | Buddha | H | D | D | L |
| 36 | José Martí | H | A | A | L |
| 37 | García Márquez | H | A | A | L |
| 38 | Pablo Neruda | H | A | A | L (CAUTION: misconduct allegations) |
| 39 | Rigoberta Menchú | M | B | A | L (CAUTION: memoir disputes) |
| 40 | Eva Perón | M | A | A | M (CAUTION: earned-distinction) |
| 41 | Diego Rivera | M | A | A | H (vs. Kahlo) |
| 42 | Pelé | H | A | A | L |
| 43 | Villa-Lobos | M | B | B | L |
| 44 | Bob Marley | H | A | A | L |
| 45 | Che Guevara | H | A | A | L (CAUTION: divisive legacy) |
| 46 | Túpac Amaru II | M | C | C | L |
| 47 | Sebastião Salgado | M | A | A | L |
| 48 | Mansa Musa | H | C | C | L |
| 49 | Haile Selassie | H | A | A | L |
| 50 | Kwame Nkrumah | H | A | A | L |
| 51 | Patrice Lumumba | H | B | A | L (CAUTION: short tenure) |
| 52 | Miriam Makeba | M | A | A | L |
| 53 | Desmond Tutu | H | A | A | L |
| 54 | Yaa Asantewaa | M | C | C | L |
| 55 | Steve Biko | M | B | B | L (CAUTION: short life) |
| 56 | Queen Nzinga | M | C | C | L |
| 57 | Anwar Sadat | H | A | A | M (vs. Atatürk, mild) |
| 58 | Naguib Mahfouz | H | A | A | L |
| 59 | Ibn Battuta | H | B | D | L |
| 60 | Baruch Spinoza | H | A | B | L |
| 61 | Simone de Beauvoir | H | A | A | L |
| 62 | Hannah Arendt | H | A | A | L |
| 63 | Miguel de Cervantes | H | A | B | L |
| 64 | Stephen Hawking | H | A | A | L |
| 65 | Marco Polo | H | B | C | L (CAUTION: historicity debated) |
| 66 | Mary Kingsley | M | A | A | L |
| 67 | Roald Amundsen | M | A | A | L |
| 68 | Anita Roddick | M | A | A | M |
| 69 | Madam C.J. Walker | M | A | A | L |
| 70 | Chief Joseph | M | B | A | L |
| 71 | Tecumseh | M | C | B | L |
| 72 | Norman Borlaug | H | A | A | L |

## 6. Blind-scoring feasibility flags

**READY**: Rizal, Kartini, Lee Kuan Yew, Corazon Aquino, Golda Meir, Shirin
Ebadi, Edward Said, Babur, Akbar, Ravi Shankar, Ratan Tata, Sun Yat-sen,
Tokugawa Ieyasu, Chien-Shiung Wu, Junko Tabei, Empress Dowager Cixi, José
Martí, García Márquez, Rigoberta Menchú, Eva Perón, Pelé, Bob Marley,
Sebastião Salgado, Haile Selassie, Kwame Nkrumah, Miriam Makeba, Desmond
Tutu, Anwar Sadat, Naguib Mahfouz, Spinoza, de Beauvoir, Arendt, Cervantes,
Hawking, Mary Kingsley, Amundsen, Madam C.J. Walker, Norman Borlaug, Ho Chi
Minh, Sukarno, Deng Xiaoping, Suleiman the Magnificent, Subhas Chandra Bose,
Pablo Neruda, Che Guevara, Diego Rivera, Villa-Lobos, Aung San, Anita
Roddick, Hokusai, Bashō.

**CAUTION** (usable but needs a deliberate sourcing/balance writeup before
scoring): Saladin (legend vs. record separation), Al-Biruni (rich
intellectual output, thin personal-behavior narrative), Ashoka (edicts are
policy statements, not personal narrative), Ibn Battuta (Rihla was compiled/
polished by Ibn Juzayy, with some scholarly doubt about specific claimed
legs of the journey), Miyamoto Musashi (own writing exists but is
philosophical treatise, not autobiography), Mansa Musa (external-chronicler-
only), Patrice Lumumba / Steve Biko (life cut short — thin behavioral
runway), Yaa Asantewaa / Queen Nzinga / Túpac Amaru II (colonial-source
filtering).

**INSUFFICIENT** (defer): Sun Tzu, Laozi, the Buddha, Chanakya, Omar Khayyam,
Nizami Ganjavi, Al-Khwarizmi — in each case, near-total absence of confirmed
personal-behavioral biography beneath a legendary or purely-textual record.
Historical/product significance is often very high (the Buddha most of all)
— this is a defensible evidence-bar call, not a judgment about importance.

## 7. Differentiation value (high-level, no trait vectors implied)

**HIGH DIFFERENTIATION** (examples):
- **Ibn Battuta** — closest analogues: Zheng He (exploration), Ibn Khaldun
  (medieval Islamic scholar-traveler). What's different: a first-person
  travel narrative spanning ~75,000 miles and dozens of polities, a
  documented life pattern of restless, individually-initiated wandering
  rather than state-sponsored expedition (Zheng He) or settled scholarship
  (Ibn Khaldun).
- **Lee Kuan Yew** — closest analogues: Atatürk (state-builder/modernizer),
  Deng Xiaoping (not in roster). What's different: nation-building from a
  small, resource-poor city-state via technocratic long-range planning
  rather than military force or revolution.
- **Chien-Shiung Wu** — closest analogues: Marie Curie, Rosalind Franklin
  (women in experimental physical science facing recognition gaps). What's
  different: her specific documented life pattern is meticulous experimental
  precision in service of *disproving* an assumption (parity), and being
  passed over for a Nobel her own experiment made possible — a distinct
  "definitive proof, denied credit" arc.
- **Bob Marley** — closest analogues: Fela Kuti (musician-activist), Umm
  Kulthum (musician as unifying cultural symbol). What's different: a
  documented life built around reconciling armed political factions through
  performance (the One Love Peace Concert), and a globally exported genre
  built from a small-island context.
- **Sebastião Salgado** — no close analogue in the current 95 at all; zero
  photographers in the roster. What's different: an entire documented career
  built on long-form embedded witnessing (mine workers, refugees, then
  environmental restoration) rather than the roster's existing painters/
  architects/animators.
- **Simone de Beauvoir** — closest analogues: Mary Wollstonecraft
  (philosophy + women's rights), Wittgenstein/Kant (philosophy). What's
  different: a documented life of sustained public partnership-without-
  marriage as a deliberate philosophical stance, existentialist ethics
  applied to her own biography in real time (memoirs written alongside the
  events).

**MEDIUM DIFFERENTIATION** (examples): Golda Meir (overlaps Atatürk/Wu Zetian
as a woman holding supreme political office, but genuinely different
context — modern parliamentary democracy under existential security threat);
Naguib Mahfouz (overlaps Dostoevsky/Kafka territory as a novelist of a
single city's moral interior, but Cairo/Islamic-world setting is new);
Stephen Hawking (overlaps Feynman/Einstein as a theoretical physicist, but a
documented life pattern built around communicating world-class physics
through near-total physical constraint has no roster analogue).

**LOW DIFFERENTIATION** (examples): Diego Rivera (heavy overlap with Kahlo —
same movement, marriage, era); Empress Dowager Cixi (heavy overlap with Wu
Zetian — female autocrat ruling through/behind a throne); Villa-Lobos
(overlaps Beethoven/Mozart's "composer" occupation slot without a
strongly distinct documented life pattern relative to them).

## 8. Product balance (the pool as a group)

Adding the pool's strongest ~30 would, as a group:
- Close the Southeast Asia gap from 0 (with no region code) to a real
  cohort, forcing the region-vocabulary fix in §15.
- Roughly triple West Asia (2 → 6) and double Central Asia (2 → 4).
- Add Latin America's first modern-literature figure and its first sport/
  reggae-music/photography figures.
- Diversify Sub-Saharan Africa beyond its current Nigeria cluster (Ghana,
  Ethiopia, South Africa).
- Add the roster's first photographer (Salgado), closing a domain that was
  a hard zero.
- Move gender from 34% toward roughly 30-33% in the *combined* 125 — this
  batch alone is female-lighter (~27%) than the existing 95, because the
  strongest evidence-ready candidates in the thinnest regions (West/Central/
  Southeast Asia, medieval Islamic world) skew male in the surviving
  historical record. This is named honestly rather than corrected by
  quota — see the Quality Gates note in the brief.

This is reported, not engineered to a target — several strong female
candidates (Hannah Arendt, Rigoberta Menchú, Empress Dowager Cixi, Eva
Perón) were pushed to alternates/deferred on evidence or redundancy grounds,
not to hit a number.

## 9. Preliminary shortlist (~40)

Cutting the 72-person pool by dropping: the evidence-INSUFFICIENT tier
(Sun Tzu, Laozi, Buddha, Chanakya, Omar Khayyam, Nizami Ganjavi,
Al-Khwarizmi — 7 names, all deferred on evidence grounds, not significance);
the highest-redundancy names (Empress Dowager Cixi, Diego Rivera); and the
highest-political-sensitivity names that need a dedicated policy call before
this project scores them at all (Ho Chi Minh, Sukarno, Deng Xiaoping, Che
Guevara, Pablo Neruda, Eva Perón — 6 names, all individually strong on
evidence but flagged for the reasons in §3/§9 below) leaves a 40-person
shortlist below (order = pool order, not rank):

Rizal, Kartini, Lee Kuan Yew, Corazon Aquino, Aung San, Saladin, Suleiman
the Magnificent, Golda Meir, Shirin Ebadi, Edward Said, Al-Biruni, Babur,
Akbar the Great, Ashoka the Great, Subhas Chandra Bose, Ravi Shankar, Ratan
Tata, Sun Yat-sen, Matsuo Bashō, Miyamoto Musashi, Tokugawa Ieyasu,
Chien-Shiung Wu, Junko Tabei, Hokusai, José Martí, García Márquez, Rigoberta
Menchú, Pelé, Villa-Lobos, Bob Marley, Mansa Musa, Haile Selassie, Kwame
Nkrumah, Miriam Makeba, Desmond Tutu, Anwar Sadat, Naguib Mahfouz, Ibn
Battuta, Baruch Spinoza, Simone de Beauvoir, Hannah Arendt, Miguel de
Cervantes, Stephen Hawking, Mary Kingsley, Roald Amundsen, Anita Roddick,
Madam C.J. Walker, Chief Joseph, Norman Borlaug, Sebastião Salgado.

(That's 49 — intentionally left a few over 40, since §10 below makes the
final, tighter cut to exactly 30 anyway, and I'd rather show the real
elimination logic there than force a hard 40 first.)

## 10. FINAL SELECTED 30

| # | Person | Era | Region | Field | Why they belong | Nearest analogues | Evidence | Portrait | Scoring difficulty | Caution |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | José Rizal | 19th c | Southeast Asia* | Literature/reform | Novelist whose fiction directly triggered a colonial revolution and his own execution; a documented, self-narrated intellectual radicalization | Frederick Douglass, Dostoevsky | READY | A | Low | Needs the new region key |
| 2 | Raden Ajeng Kartini | 19th c | Southeast Asia* | Social reform | Founding voice of Indonesian women's education, evidenced by her own published letters | Wollstonecraft, Malala | READY | A | Low | Needs the new region key; short life (d. 25) |
| 3 | Lee Kuan Yew | 20th c | Southeast Asia* | Politics/business | Built a modern developed state from a small resource-poor city-state via technocratic planning, not force | Atatürk | READY | A | Low | Contested legacy re: press/opposition freedom — needs balanced treatment |
| 4 | Saladin | Medieval | West Asia | Military/politics | Reunified Egypt/Syria and retook Jerusalem; near-contemporary biography (Ibn Shaddad) gives unusually intimate detail for the era | Genghis Khan, Yi Sun-sin | CAUTION | D (no honest lifetime likeness) | Medium | Centuries of Western "chivalry" legend layered on the record — separate legend from documented behavior |
| 5 | Golda Meir | 20th c | West Asia | Politics | Immigrant labor organizer to prime minister under existential security pressure; extensive primary sources incl. own memoir | Wu Zetian, Atatürk | READY | A | Low | 1973 war/intelligence-failure criticism needs balanced sourcing |
| 6 | Shirin Ebadi | Contemporary | West Asia | Social reform/law | First Muslim woman Nobel Peace laureate; human-rights lawyer under a legal system openly hostile to her work | Malala, Aung San Suu Kyi | READY | A | Low | Living person — hold to the living-person evidence rule |
| 7 | Edward Said | 20th c | West Asia | Intellectual history | Founder of postcolonial literary theory (*Orientalism*); richly self-documented (memoir, extensive interviews) | Ibn Khaldun, Wittgenstein | READY | A | Low | None major |
| 8 | Al-Biruni | Medieval | Central Asia | Science/philosophy | Polymath empiricist (astronomy, geodesy, comparative religion) whose own prolific writing is the primary source | Ibn Sina | CAUTION | D (no lifetime likeness) | Medium | Rich intellectual output, thinner personal-behavior narrative |
| 9 | Babur | Early modern | Central Asia | Politics/literature | Founded the Mughal Empire; uniquely, wrote his own unusually candid autobiography (the *Baburnama*) | Genghis Khan, Julius Caesar | READY | B | Low | None major |
| 10 | Akbar the Great | Early modern | South Asia | Politics | Administrative/religious-syncretism innovator (Din-i-Ilahi), documented via the *Akbarnama* | Wu Zetian, Atatürk | READY | B | Low | Inherited throne — counterfactual test needed, same as other roster monarchs |
| 11 | Ashoka the Great | Ancient | South Asia | Politics | Rare ancient figure with primary evidence in his own words (the Edicts); a documented conqueror-to-pacifist arc | Julius Caesar, Confucius | CAUTION | D (no personal likeness survives) | Medium | Edicts are policy statements, not personal narrative |
| 12 | Ravi Shankar | 20th c/contemporary | South Asia | Music | Brought Indian classical music to a global audience across seven decades; extensively documented and self-interviewed | Beethoven, Umm Kulthum | READY | A | Low | None major |
| 13 | Sun Yat-sen | 20th c | East Asia | Politics | Revolutionary-turned-statesman, "Three Principles of the People"; extensively documented (both ROC and PRC historiography engage him) | Atatürk, Toussaint Louverture | READY | A | Low | Idealized by multiple later regimes — needs source triangulation |
| 14 | Chien-Shiung Wu | 20th c | East Asia | Science | Definitive experimental disproof of parity conservation; documented "precision proof, denied Nobel credit" arc distinct from any current roster scientist | Marie Curie, Rosalind Franklin | READY | A | Low | None major |
| 15 | Junko Tabei | Contemporary | East Asia | Exploration | First woman to summit Everest; also founded environmental-cleanup mountaineering advocacy | Shackleton | READY | A | Low | None major |
| 16 | José Martí | 19th c | Latin America | Literature/politics | Poet-revolutionary whose own journalism/poetry is the primary record of Cuban independence thought | Frederick Douglass | READY | A | Low | None major |
| 17 | Gabriel García Márquez | 20th c | Latin America | Literature | Founding figure of magical realism, Nobel laureate; extensively self-documented (memoir, decades of interviews) | Dostoevsky, Achebe | READY | A | Low | None major |
| 18 | Pelé | 20th c | Latin America | Sport | Only three-time World Cup winner; global cultural significance without a single roster analogue in team sport | Muhammad Ali, Serena Williams | READY | A | Low | None major |
| 19 | Bob Marley | 20th c | Latin America/Caribbean | Music | Globally exported an entire genre from a small-island context; documented life pattern of using performance to reconcile armed political factions | Fela Kuti, Umm Kulthum | READY | A | Low | None major |
| 20 | Kwame Nkrumah | 20th c | Sub-Saharan Africa | Politics/social reform | First sub-Saharan African independence leader, founding Pan-Africanist theorist | Gandhi, Mandela | READY | A | Low | Later authoritarian turn/1966 coup — needs balanced treatment |
| 21 | Miriam Makeba | 20th c | Sub-Saharan Africa | Music/social reform | Exiled musician who became an internationally recognized anti-apartheid voice; own extensive interviews/memoir | Fela Kuti | READY | A | Low | None major |
| 22 | Desmond Tutu | Contemporary | Sub-Saharan Africa | Social reform/religion | Truth and Reconciliation Commission chair; a documented "moral authority through forgiveness" arc distinct from Mandela's political-prisoner-to-president arc | Mandela, MLK | READY | A | Low | None major |
| 23 | Haile Selassie | 20th c | Sub-Saharan Africa | Politics | Modernizing monarch, 1936 League of Nations address, central to Rastafarian religious history | Atatürk | READY | A | Low | 1973 famine response and authoritarian aspects criticized — needs balance |
| 24 | Naguib Mahfouz | 20th c | North Africa | Literature | Nobel laureate chronicler of Cairo's moral interior across a century of Egyptian history | Dostoevsky, Kafka | READY | A | Low | Survived an assassination attempt tied to his work — needs careful, non-sensationalized handling |
| 25 | Sebastião Salgado | Contemporary | Latin America | Visual art (photography) | Zero photographers currently in the roster; decades of embedded documentary work, later environmental-restoration advocacy | (none — new medium for the roster) | READY | A | Low | Confirm death year (2025-05-23) at promotion time, same fact-discipline as the Kusama correction |
| 26 | Baruch Spinoza | Early modern | Western Europe | Philosophy | Excommunicated for his ideas; documented life of quiet, uncompromising rationalist dissent | Kant, Wittgenstein | READY | B (no confirmed lifetime portrait; posthumous tradition exists) | Low | None major |
| 27 | Stephen Hawking | Contemporary | Western Europe | Science | Communicated frontier cosmology through near-total physical constraint over five decades; extensively self-documented | Feynman, Einstein | READY | A | Low | None major |
| 28 | Simone de Beauvoir | 20th c | Western Europe | Philosophy/social reform | Applied existentialist ethics to her own life in real time (memoirs written alongside events); foundational modern feminist theorist | Wollstonecraft | READY | A | Low | None major |
| 29 | Madam C.J. Walker | 19th/20th c | North America | Business | First self-made American woman millionaire; built a business empire and philanthropic/political network from nothing | Oprah Winfrey | READY | A | Low | None major |
| 30 | Ibn Battuta | Medieval | North Africa/West Asia | Exploration/literature | ~75,000 miles across dozens of polities, documented in his own first-person travelogue (the *Rihla*) | Zheng He, Ibn Khaldun | CAUTION | D (no known depiction at all) | Medium | *Rihla* was compiled/polished by Ibn Juzayy; some claimed legs are scholarly-disputed |

*Southeast Asia entries are filed provisionally — see §15, a new
`region.southeast_asia` key is needed before these can pass identity
preflight as currently written.

## 11. 10 alternates

1. **Chief Joseph** (Nez Perce) — swapped out only because Ibn Battuta
   filled the exploration/medieval/region gap more efficiently; still the
   strongest evidence case (his own recorded speeches survive) for
   expanding indigenous-North-America representation beyond Sequoyah.
2. **Suleiman the Magnificent** — swapped for Shirin Ebadi to improve
   gender and domain balance (a 4th West Asia politics pick would have
   been redundant with Saladin/Golda Meir); still an excellent READY
   candidate.
3. **Anwar Sadat** — swapped for Salgado to close the photography gap;
   still strong (Nobel Peace Prize, Camp David Accords).
4. **Corazon Aquino** — strong Southeast Asia alternate if a Philippines
   pair (with Rizal) is preferred over spreading the region wider.
5. **Hannah Arendt** — strong philosophy alternate to Spinoza/de Beauvoir
   if the project wants political theory specifically (*Eichmann in
   Jerusalem*, banality of evil).
6. **Miguel de Cervantes** — strong literature alternate; deferred only
   because the shortlist already carries 4 new literature-primary picks.
7. **Miyamoto Musashi** — strong martial-arts/philosophy alternate to
   deepen the East Asia batch if Bruce Lee needs a period-piece contrast.
8. **Norman Borlaug** — strong applied-science alternate (Green
   Revolution, a documented humanitarian-impact-at-scale arc with no
   roster analogue); held back mainly on region (North America, already
   the most crowded).
9. **Roald Amundsen** — strong exploration alternate to Tabei/Ibn Battuta;
   held back on region (Western Europe, already crowded).
10. **Ratan Tata** — strong business alternate for South Asia if the
    project wants a modern business figure alongside Akbar/Ashoka rather
    than an ancient/early-modern-only South Asia batch.

## 12. Rejected / deferred candidates (and why)

**Deferred — political sensitivity, needs a dedicated policy call before
scoring (not a historical judgment, a product-neutrality one):**
- Ho Chi Minh, Sukarno, Deng Xiaoping, Che Guevara, Pablo Neruda (recent,
  credible personal-misconduct allegations complicate neutral scoring),
  Eva Perón (earned-distinction ambiguity — power substantially derived
  from her husband's presidency).

**Deferred — redundancy:**
- Empress Dowager Cixi (overlaps Wu Zetian closely), Diego Rivera (overlaps
  Kahlo closely — same movement, marriage, era).

**Deferred — evidence CAUTION, worth a focused future sourcing pass:**
- Mansa Musa, Yaa Asantewaa, Queen Nzinga, Túpac Amaru II (all filtered
  through external/colonial chroniclers rather than the person's own
  record), Patrice Lumumba, Steve Biko (both assassinated young — thin
  behavioral runway despite high significance), Rigoberta Menchú (usable,
  but her memoir's disputed accuracy needs an explicit source-integrity
  writeup first), Subhas Chandra Bose (WWII Axis-alliance controversy adds
  interpretive risk), Marco Polo (the *Travels*' historicity is genuinely
  disputed by scholars).

**Deferred — evidence INSUFFICIENT (legendary/hagiographic sources, not a
significance judgment):**
- Sun Tzu, Laozi, the Buddha, Chanakya, Omar Khayyam, Nizami Ganjavi,
  Al-Khwarizmi.

**Deferred — bandwidth (good candidates, just not in this batch):**
- Aung San, Tokugawa Ieyasu, Hokusai, Villa-Lobos, Anita Roddick, Bashō,
  Tecumseh (weaker evidence case than Chief Joseph for the same gap).

## 13. Geographic/domain/era impact of adding the 30

New region totals (of 125):

| Region | Before | After | Change |
|---|---|---|---|
| north_america | 25 (26.3%) | 27 (21.6%) | −4.7 pts share |
| western_europe | 21 (22.1%) | 24 (19.2%) | −2.9 pts share |
| east_asia | 9 (9.5%) | 12 (9.6%) | flat |
| south_asia | 7 (7.4%) | 10 (8.0%) | +0.6 pts |
| latin_america | 6 (6.3%) | 11 (8.8%) | +2.5 pts |
| sub_saharan_africa | 5 (5.3%) | 9 (7.2%) | +1.9 pts |
| north_africa | 3 (3.2%) | 4 (3.2%) | flat |
| west_asia | 2 (2.1%) | 5 (4.0%) | +1.9 pts |
| central_asia | 2 (2.1%) | 4 (3.2%) | +1.1 pts |
| southern_europe | 8 (8.4%) | 8 (6.4%) | −2.0 pts share |
| central_europe | 7 (7.4%) | 7 (5.6%) | −1.8 pts share |
| southeast_asia (new) | 0 | 3 (2.4%) | new |

North America and Western Europe both shrink as a share of the roster while
staying the two largest regions — a real improvement without an implausible
overcorrection.

Domain: `politics/public leadership` gets the largest single addition (10
new: Lee Kuan Yew, Saladin, Golda Meir, Babur, Akbar, Ashoka, Sun Yat-sen,
Kwame Nkrumah, Haile Selassie, plus Chief-Joseph-tier alternates), moving it
from 12/95 (12.6%) to 22/125 (17.6%). `science` grows modestly (22→25),
shrinking its share (23.2%→20.0%) — a healthy rebalancing since it was the
single most overrepresented domain. `visual art/design` gets exactly one
addition (Salgado) but it's a new medium (photography), which matters more
for differentiation than the raw count (8→9, 8.4%→7.2% share — still thin,
flagged for a future batch). `exploration` doubles in absolute terms but
stays tiny (2→3, 2.1%→2.4%) — still the thinnest domain in the roster even
after this batch.

Era: this batch adds 1 ancient (Ashoka), 3 medieval (Saladin, Al-Biruni, Ibn
Battuta), 2 early-modern (Babur, Akbar), with the rest 19th-century through
contemporary — a modest thickening of the currently-thinnest eras (ancient
4→5, medieval 11→14) without overcorrecting.

## 14. Portrait-readiness distribution (30)

- **A** (~21): Rizal, Kartini, Lee Kuan Yew, Golda Meir, Shirin Ebadi,
  Edward Said, Ravi Shankar, Sun Yat-sen, Chien-Shiung Wu, Junko Tabei,
  José Martí, García Márquez, Pelé, Bob Marley, Kwame Nkrumah, Miriam
  Makeba, Desmond Tutu, Haile Selassie, Naguib Mahfouz, Sebastião Salgado,
  Stephen Hawking, Simone de Beauvoir, Madam C.J. Walker.
- **B** (~3): Babur (Mughal manuscript-portrait tradition), Akbar the
  Great (same), Baruch Spinoza (posthumous engraving/painting tradition,
  no confirmed lifetime portrait — same category of honest caveat this
  project already uses for Banneker/Joan of Arc).
- **C/D** (~6): Saladin (no honest lifetime likeness — Islamic-era
  aniconism, same category of problem this project already solved
  differently for Ibn Khaldun), Al-Biruni (same), Ashoka the Great (no
  personal likeness survives at all — only anonymous imperial art), Ibn
  Battuta (no known depiction exists).

This roughly matches the current roster's own experience: most modern/
early-modern figures clear A/B easily; medieval Islamic-world and ancient
figures are disproportionately C/D, exactly where the project's existing
`editorial_nonlikeness`/`historical_depiction` machinery already exists to
handle it honestly rather than forcing a fake likeness.

## 15. Evidence-readiness distribution (30)

- **READY** (~26 of 30): everyone except the four CAUTION cases below.
- **CAUTION** (4 of 30): Saladin, Al-Biruni, Ashoka the Great, Ibn Battuta
  — each usable, but needs the sourcing-discipline note in §6 written down
  *before* blind scoring starts, not discovered mid-scoring.
- **INSUFFICIENT**: none in the final 30 — every INSUFFICIENT-graded name
  from the pool (§6) was already excluded before this cut.

## 16. Major sourcing-risk candidates (within the final 30)

- **Ibn Battuta** — the *Rihla* was compiled/polished by a court scribe
  (Ibn Juzayy) after the fact, and specific claimed legs of the journey
  (e.g., some scholars question the China visit as described) are
  genuinely disputed. Score from the parts of the record scholarly
  consensus treats as reliable; flag the disputed legs rather than silently
  smoothing over them.
- **Ashoka the Great** — the only primary evidence is his own Edicts, which
  are public policy/religious proclamations, not personal narrative. Real
  risk of scoring "the persona the Edicts project" rather than the person.
- **Saladin** — nine centuries of Western "chivalric" legend (much of it
  originating in Crusader-era propaganda-turned-romance) sit on top of the
  documented record. Ibn Shaddad's near-contemporary biography is the
  right anchor; later European romanticization should not leak into
  scoring.
- **Lee Kuan Yew, Golda Meir, Haile Selassie, Sun Yat-sen, Kwame Nkrumah** —
  each a political leader whose record includes both major
  state-building achievement and legitimate, well-documented criticism
  (press/opposition suppression; the 1973 war and famine-response criticism
  respectively; multi-regime idealization; a later authoritarian turn).
  None of these should block inclusion — several current roster members
  (Atatürk, Wu Zetian, Genghis Khan) already carry exactly this kind of
  complexity — but each needs the same even-handed, source-balanced
  treatment already established as this project's norm.
- **Al-Biruni** — abundant intellectual output, comparatively thin personal-
  behavior narrative; risk of scoring "what a polymath scientist's work
  implies about them" rather than documented behavior.

## 17. Recommended blind-scoring batch structure

If/when this moves to blind scoring, suggest 3 batches of 10 (mirrors the
existing roster2...roster10 sequential-batch pattern), ordered easy-evidence
first so the scoring team's calibration is warmed up before the harder
CAUTION-tier names:

- **Batch A** (modern, richly self-documented): Lee Kuan Yew, Golda Meir,
  Naguib Mahfouz, García Márquez, Stephen Hawking, Desmond Tutu, Kwame
  Nkrumah, Chien-Shiung Wu, Junko Tabei, Madam C.J. Walker.
- **Batch B** (modern, culturally broad): Rizal, Kartini, José Martí, Bob
  Marley, Pelé, Miriam Makeba, Ravi Shankar, Sebastião Salgado, Shirin
  Ebadi, Edward Said.
- **Batch C** (historical/harder evidence, run last, after both CAUTION
  writeups from §16 exist): Saladin, Al-Biruni, Babur, Akbar the Great,
  Ashoka the Great, Sun Yat-sen, Haile Selassie, Simone de Beauvoir,
  Baruch Spinoza, Ibn Battuta.

## 18. Recommended next workflow (candidate selection → production)

1. **Human review of this document** — approve/adjust the final 30, the
   swaps in §11, and any names to pull from alternates/deferred instead.
2. **Region-vocabulary fix first, before anything else**: add
   `region.southeast_asia` to `en.ts`/`ko.ts` (and any other controlled
   vocabulary that needs it) through the normal i18n-change process — this
   is a small, contained, non-scoring change, and it's a hard blocker for
   Rizal/Kartini/Lee Kuan Yew's identity preflight as things stand today.
3. **Identity preflight** per person (live Wikidata QID fetch + full
   `data-pipeline/candidates/` collision check) before writing any
   candidate file — per the frozen `Roster Research & Scoring Protocol v1`.
4. **Write the §16 sourcing/balance notes** for Ibn Battuta, Ashoka,
   Saladin, and the five political leaders named there, *before* those
   specific people enter evidence-ledger work — not discovered mid-scoring.
5. **Evidence-first, trait-blind scoring** in the 3 batches above, per
   `docs/scoring-rubric-v1.md`.
6. **Run `eligibility_v2` once per candidate.** Never iterate scores toward
   passing — this is the project's own hard-won rule after the session-11
   incident.
7. **Promote only `qa_passed` candidates** via a `generateRosterN.ts`-style
   script with an explicit slug allowlist, batch by batch.
8. **Regenerate dispersion/calibration, re-run the matching simulation and
   sensitivity check, regenerate the people index** after each batch.
9. **Portrait sourcing as its own separately-tracked program**, same
   pattern as the existing 89/95 program — start with the ~21 A-grade
   names in §14, since they're the cheapest wins.
10. **Editorial content only after scoring** — same sequencing already
    used for the rest of the roster.

## 19. Final verdict

**READY FOR BLIND SCORING**, conditional on:
- Human sign-off on the final 30 (and any swaps from §11).
- The `region.southeast_asia` vocabulary addition landing first (§18.2) —
  a small, non-scoring, non-roster i18n change.
- The four §16 sourcing/balance writeups existing before Batch C scoring
  starts.

Nothing in this document assigns or implies a trait score for any
candidate. That is explicitly the next, separate phase.
