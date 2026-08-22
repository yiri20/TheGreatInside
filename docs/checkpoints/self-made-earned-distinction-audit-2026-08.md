# Self-Made / Earned-Distinction Roster Philosophy Audit (2026-08)

Full 95-person audit against the project's existing `inclusion_v1`
counterfactual test, run at finer (3-tier + borderline) granularity. This
is a **dedicated structured artifact** — durable conclusions are
summarized in [`roster.md`](roster.md) and
[`CURRENT_STATE.md`](../context/CURRENT_STATE.md); this file holds the
full per-person record so neither of those has to.

**Scope discipline honored**: no person removed or replaced this
session; no change to matching, editorial content, Tier C, or
monetization; self-made-fit tier is informational only and is never
read by scoring/matching (same hard boundary as `inclusion_v1` itself).

## Result summary

| Tier | Count |
|---|---|
| Strong Self-Made Fit | 69 |
| Earned but Advantaged | 26 |
| Weak Fit / Inherited-Position Dependent | **0** |
| — of which Borderline-flagged | 1 (Aung San Suu Kyi, within Earned but Advantaged) |

**Headline finding**: no one in the current 95-person roster lands in
Weak Fit. This is not the audit finding "nothing to check" — it's
evidence that `inclusion_v1`'s authoring-time discipline (the same test
that removed Cleopatra VII pre-emptively) has been applied with real
rigor already: most roster3–10 candidate files already carry an explicit
counterfactual note in their own words, several literally citing
"inclusion_v1" or Ibn Khaldun/Toussaint Louverture by name as precedent.
This audit's contribution is (a) verifying that at even, systematic
3-tier granularity across all 95 — not just the flagged/famous cases —
nothing was missed, and (b) producing the first explicit **Earned but
Advantaged** breakdown: which 26 people carry real inherited advantage,
what kind, and why it doesn't disqualify them under the project's own
stated non-factors. Since zero people landed in Weak Fit, the required
next step ("analyze Weak-Fit people's matching niche and cultural/era/
domain coverage before recommending KEEP/REVIEW/REPLACE") is **vacuously
satisfied — no KEEP/REVIEW/REPLACE-CANDIDATE action applies to anyone**.

## 1. Recovered philosophy — `inclusion_v1`

Full text: `docs/archive/completed-phases/claude-md-phase-history-2026-08.md`
~line 2673; pointer in `docs/reference/architecture.md` ("Inclusion
philosophy"). Recap, since this audit extends it rather than replacing it:

- Not a poverty/hardship test. Inherited wealth, elite education, social
  access, family advantage do **not** disqualify.
- **Counterfactual test**: subtract any inherited title/office/fame/family
  position — is the recognized achievement still independently notable?
  Yes -> keep (privilege bought access, not the achievement). No -> poor
  fit, however famous.
- Worked examples on file: Ada Lovelace (Yes/kept), Cleopatra VII
  (No/removed 2026-08), Ibn Khaldun (Yes/added as her replacement).
- Decided once per person, never per-trait, never auto-inferred from
  occupation/era/wealth/title metadata.
- Hard boundary: inclusion status never feeds scoring/matching, exactly
  as this audit's tier does not either.

## 2. Rubric v1 (calibrated + locked before scoring all 95)

**Question per person:** subtract any inherited title, office, wealth,
family position, or family-derived name-recognition — is the *specific*
achievement this roster credits them for still independently notable?

- **Strong Self-Made Fit** — no meaningful inherited advantage, or a
  neutral/modest/disadvantaged starting position (ordinary, poor,
  enslaved, oppressed, orphaned, structurally barred). Achievement built
  from a standing start.
- **Earned but Advantaged** — a real inherited advantage (wealth, family
  name/fame, a family professional or scholarly tradition providing
  direct field-specific access, a title, an elite social network)
  provided *opportunity*, but the counterfactual passes clearly: the
  specific achievement is separable and plausibly attainable by an
  equally talented person without that specific advantage. Privilege
  bought a running start, not the finish line.
- **Weak Fit / Inherited-Position Dependent** — the recognized
  achievement *is* substantially the exercise of an inherited or
  marriage-conferred position itself; subtract it and there is no
  separable achievement left. Mirrors the failed Cleopatra VII case.
  None found in the current 95.
- **Borderline flag** — layered on a primary tier, used only when
  reasonable, well-informed people could disagree about the
  counterfactual *answer itself* (not merely "under-researched").

**Explicit non-factors (binding for this audit, carried from
`inclusion_v1`):**
1. Wealth alone never disqualifies.
2. Elite education alone never disqualifies.
3. A family professional/scholarly tradition that provided training
   access does not disqualify if the substantive achievement is
   separable from that access.
4. Adversity/poverty is **not** required for "Strong" — a neutral,
   unremarkable-but-unprivileged background is Strong, full stop. This
   audit does not rank overcome-adversity narratives above neutral-
   background merit.
5. **Historical fairness for premodern intellectuals**: where court
   patronage, church office, or family scholarly lineage was the *only*
   available pathway into a given vocation in that era, that pathway is
   opportunity/access (per the Ada Lovelace precedent), not
   disqualifying — a 12th-century scholar is not held to a modern
   economic-mobility bar.
6. **The distinction this audit exists to sharpen**: (a) inherited
   *starting privilege* (wealth/education/connections that open doors)
   is never disqualifying alone; (b) *dependence on inherited
   distinction itself* (the fame/office/notability credited to them *is*
   the inherited thing) is the actual disqualifying condition. A wealthy
   person who becomes a scientist has (a) not (b); a monarch remembered
   for reigning has (b).
7. **Not the same category**: adult-life patronage, mentorship,
   investors, or a spouse's/partner's support (e.g. Coco Chanel's early
   backers, Averroes's introduction to the Caliph) is ordinary
   opportunity-generation, not inherited *family* position — only
   birth-conferred status counts toward this test.
8. This tier is completely separate from `isMatchEligible`/
   `eligibility_v2` and is never read by scoring or matching.

**Evidence discipline used per non-"clean Strong" classification**:
(i) what the inherited element was, (ii) what the separable achievement
is, (iii) counterfactual answer + one-line reasoning, (iv) source tag —
`repo` (cited file:line), `settled-record` (uncontested historical fact,
not in repo, not independently re-verified live), or `verified`
(confirmed via live check this session).

## 3. Calibration sample (10, stratified) — the lock point

Run before touching the other 85, to pressure-test the rubric across
eras/domains/privilege-types before committing to it:

| # | Person | Provisional call | Reasoning |
|---|---|---|---|
| 1 | Toussaint Louverture | Strong | Enslaved-born; entire achievement self-built (`repo`: candidate JSON explicitly invokes `inclusion_v1`, passes) |
| 2 | Isaac Newton | Strong | Modest yeoman-farmer family, no privilege (`settled-record`) |
| 3 | Ada Lovelace | Earned but Advantaged | Baron's daughter/Countess; project's own worked example (`repo`, archive doc) |
| 4 | Charles Darwin | Earned but Advantaged | Wealthy family funded decades of unpaid independent research; theory itself is separable (`settled-record`) |
| 5 | Ibn Khaldun | Earned but Advantaged | Minor administrative/scholarly family; already vetted and added specifically because it passes (`repo`) |
| 6 | Wu Zetian | Earned but Advantaged | Rose from low-ranking concubine to sole female Emperor entirely through her own political action — no throne was ever hers to inherit; family gave modest court-entry access only (`repo`: candidate JSON explicitly invokes `inclusion_v1` by name, compares to Toussaint Louverture/Ibn Khaldun) |
| 7 | Aung San Suu Kyi | Earned but Advantaged, **Borderline** | Father's assassinated-founding-father legacy demonstrably launched her 1988 entry into politics (her own words, in evidence ledger); but ~15 years of house arrest, movement-building, and sustained leadership are unambiguously her own — genuinely contestable, unlike the other 9 (`repo`: evidence ledger + rawNotes) |
| 8 | Julius Caesar | Earned but Advantaged | Patrician birth = career-track access in a Republic with no hereditary throne to inherit; military/political achievements self-built (`repo`) |
| 9 | Simón Bolívar | Earned but Advantaged | Wealthy Creole family funded campaigns; leadership/vision across 6 countries is his own (`repo`, explicitly cites `inclusion_v1`'s wealth non-factor) |
| 10 | Thomas Aquinas | Strong | Noble family wanted him made abbot of Monte Cassino (a position they could influence); he refused, was held ~1yr to stop him, joined the Dominicans (a poverty-vowed order) instead, built his own scholarly/teaching reputation (`settled-record`) |

Result: 3 Strong / 6 Earned but Advantaged / 1 Borderline, 0 Weak Fit —
rubric produces a clean, non-degenerate spread across a deliberately
adversarial sample (it included the two cases structurally closest to
the failed Cleopatra pattern: Wu Zetian and Aung San Suu Kyi). **Locked
as-is; no rubric changes needed after calibration.**

## 4. Full 95-person classification

Sources: `PEOPLE_INDEX` (`src/data/people/peopleIndex.generated.ts`) for
occupation/era/region/tags; inline comments in `seed.ts`/`roster2..10.ts`;
`data-pipeline/candidates/*.json` notes fields (many already contain an
explicit `inclusion_v1` counterfactual note written at authoring time);
`src/dev/roster1000/production/session19/*/{evidenceLedger.json,rawNotes.md}`
for the two people with a full evidence ledger. Where the repo is silent,
tagged `settled-record` (uncontested general historical fact) or
`verified` (checked live this session via web search: Yi Sun-sin's family
decline, Hildegard of Bingen's oblate status).

### Strong Self-Made Fit (69)

No meaningful inherited advantage, or a neutral/modest/disadvantaged
starting position, for every person below — one-line basis given only
where the "obviously fine" call benefits from a note:

Leonardo da Vinci (illegitimate notary's son) · Marie Curie (modest
Polish teacher family, self-funded) · Richard Feynman (middle-class
sales-manager family) · Steve Jobs (working-class adoptive family) ·
Hayao Miyazaki (comfortable but ordinary manufacturing family) ·
Yi Sun-sin (`verified`: nominally yangban but family fell into real
poverty/political disgrace after an ancestor's purge two generations
earlier; earned his rank via the state military exam system, no
inherited command) · Frida Kahlo (photographer's family, disability
adversity) · Serena Williams (self-taught coach father, no privilege) ·
Alan Turing (comfortable colonial-civil-service family — meritocratic
professional class, not inherited title/wealth) · Beethoven (musician
father, but financially unstable/burdensome, not advantageous) · Nelson
Mandela (Thembu chiefly-council lineage; explicitly *left* that
grooming track for law/activism — same shape as Aquinas, `settled-
record` from his own autobiography) · Confucius (`settled-record`:
minor-noble father died when he was ~3, family fell into poverty, self-
taught, rose on reputation) · Socrates (sculptor father, ordinary
citizen-class) · Warren Buffett (middle-class stockbroker father, built
his own stake) · Coco Chanel (orphaned, convent-raised; later adult-life
patronage from Balsan/Capel is opportunity-generation, not inherited
family position — non-factor #7) · Nikola Tesla (Orthodox priest's
son) · Jane Goodall (comfortable but ordinary family, no formal science
credential when hired) · Genghis Khan (`repo`: clan abandoned the family
after his father's death; rebuilt all authority from nothing) · Wangari
Maathai (rural farming family, scholarship-funded) · Malala Yousafzai
(father a modest local school-owner/activist — real but minor platform
access, not name-brand inherited fame) · Srinivasa Ramanujan (poor
clerk's family, entirely self-taught) · Toni Morrison (working-class
welder/domestic-worker family) · Akira Kurosawa (PE-instructor family) ·
Benjamin Franklin (candle-maker's son) · Zheng He (captured/enslaved as
a child, castrated, rose via demonstrated ability in Ming court service
— the opposite of inherited privilege, even though the voyages
themselves were carried out under imperial command) · Oprah Winfrey
(severe rural poverty, abuse) · Simone Biles (foster care, adopted by
grandparents) · Yayoi Kusama (family ran a seed business but was
actively *hostile* to her art career; achievement built in New York
against family wishes) · Albert Einstein (financially precarious
family business) · Ernest Shackleton (comfortable doctor's family,
ordinary professional class) · Frederick Douglass (born enslaved) ·
Galileo Galilei (musician father, financially strained) · Ibn Sina
(father a modest local administrative official; Ibn Sina reportedly
outstripped his own tutors and was substantially self-taught in
philosophy/medicine) · Isaac Newton (modest yeoman family) · Jane Austen
(clergyman father, comfortable gentry, no fortune) · Thomas Aquinas (see
calibration — refused the family's inherited-adjacent plan) · Thomas
Edison (shingle-maker's son, largely homeschooled) · Umm Kulthum
(village imam's daughter, no wealth) · Vincent van Gogh (pastor's son;
uncle's art-dealer connection led to a job he was fired from, painting
career came later and independently) · Wilbur Wright (bishop's son,
modest clergy family) · Benjamin Banneker (free Black farming family,
grandmother a former indentured servant) · Chinua Achebe (mission
catechist's son — ordinary colonial-African professional class) · Grace
Hopper (ordinary comfortable NYC professional family) · Immanuel Kant
(harness-maker's son) · Malcolm X (working-poor family, father likely
murdered by white supremacists) · Muhammad Ali (working-class family,
segregated Louisville) · Rachel Carson (financially struggling rural
family) · Sojourner Truth (born enslaved) · Sor Juana Inés de la Cruz
(illegitimate birth, largely self-taught, joined a convent specifically
to escape marriage and pursue intellectual life since women couldn't
attend university) · Toussaint Louverture (see calibration) · Wole
Soyinka (headmaster's son — ordinary colonial-African professional
class, same tier as Achebe) · B. R. Ambedkar (Dalit family facing severe
caste oppression despite father's army service; entirely self-built
academic/legal/political career) · Sequoyah (illiterate-in-English
silversmith, entirely self-taught) · Elizabeth Blackwell (family fortune
had collapsed by the time she pursued medicine; rejected by ~28 schools,
funded her own way) · Harriet Tubman (born enslaved) · C. V. Raman
(ordinary academic-family background, same tier as Rachel Carson/Grace
Hopper — not a distinctive advantage) · Franz Kafka (self-made merchant
father, comfortable but not inherited wealth) · Katherine Johnson
(laborer father who funded schooling against segregation-era barriers) ·
Mary Wollstonecraft (father squandered the family's money, financially
unstable/abusive home) · Michelangelo (`repo`, candidate JSON:
"stonemason's son... no inherited position of any kind") · Octavia
Butler (widowed maid's daughter, poverty) · Susan B. Anthony (ordinary
comfortable Quaker business family) · Benito Juarez (`repo`: orphaned,
Spanish-illiterate Zapotec child; entirely self-built legal/political
career) · Joan of Arc (`repo`: unranked peasant, no family standing) ·
Fyodor Dostoevsky (minor/modest gentry, financially precarious his whole
adult life) · Louis Armstrong (extreme New Orleans poverty) · Louis
Pasteur (tanner's son) · Mustafa Kemal Atatürk (`repo`: minor customs
official father died young, raised in reduced circumstances by his
mother) · Anna Pavlova (illegitimate birth, poverty).

### Earned but Advantaged (26)

For each: inherited element -> why the achievement is still separable.

| Person | Inherited element | Separable achievement | Source |
|---|---|---|---|
| Ada Lovelace | Baron's daughter, Countess; elite tutors | *Notes on the Analytical Engine* stands on its own mathematical merit | `repo` |
| Mozart | Father was a professional composer who built/toured his prodigy career from age ~4 | The compositions themselves are credited to no one but Mozart | `settled-record` |
| Mahatma Gandhi | Father was Diwan (chief minister) of Porbandar; funded London legal education | Satyagraha philosophy and decades of independence leadership are his own | `settled-record` |
| Rosalind Franklin | Prominent, prosperous Anglo-Jewish family (great-uncle a Viscount) | X-ray diffraction work / Photo 51 is her own technical achievement | `settled-record` |
| Ibn Khaldun | Minor administrative/scholarly Andalusian-émigré family | *Muqaddimah* recognized on independent intellectual merit | `repo` |
| Bruce Lee | Father a well-known Cantonese opera/film actor — gave early industry access | Jeet Kune Do and his specific stardom are his own innovation | `settled-record` |
| Rumi | Father a respected Islamic scholar; Rumi *literally inherited* his madrasa headship | His actual fame — the *Masnavi*/mystical poetry — emerged later, independently, after a personal spiritual transformation unrelated to the inherited post | `settled-record` |
| Charles Darwin | Wealthy family (grandfather Erasmus Darwin, Wedgwood marriage) funded decades of unpaid research | The theory of natural selection and the evidentiary rigor behind it are his own | `settled-record` |
| Hildegard of Bingen | Family of free nobility; tithed as a child oblate alongside another noblewoman | Visionary theology, composition, natural science are her own recognized corpus | `verified` |
| Martin Luther King Jr. | Father a prominent, established Atlanta pastor (Ebenezer Baptist, NAACP-adjacent) — gave an institutional pulpit | Nonviolent civil-rights leadership/oratory/organizing are his own | `settled-record` |
| Rabindranath Tagore | Wealthy, culturally dominant Bengali Tagore family | Nobel-winning literary/musical/philosophical corpus is his own; he renounced the one conferred title (a British knighthood) he was given | `repo` + `settled-record` |
| Emmy Noether | Father Max Noether, an established mathematician at the same institution (Erlangen) — direct same-field insider access | Noether's theorem / abstract algebra work is her own, achieved despite severe gender-based obstruction her father's status could not remove | `settled-record` |
| Fela Kuti | Mother a nationally prominent Nigerian activist; father a teachers'-union founder | Afrobeat as a genre and his own political persecution/activism are his | `settled-record` |
| Florence Nightingale | Wealthy upper-class British family; family opposed her career choice | Founding of modern nursing and statistical epidemiology work are her own, pursued against family wishes | `settled-record` |
| Niels Bohr | Father Christian Bohr, an internationally recognized physiologist hosting scientific salons at home | Quantum theory / atomic model / complementarity are his own | `settled-record` |
| Simón Bolívar | Wealthy Creole family | Leadership and strategic vision across 6 countries' independence movements is his own | `repo` |
| Aristotle | Father was court physician to the King of Macedon | His philosophical corpus is credited to him alone, not the court connection | `settled-record` |
| Ludwig Wittgenstein | One of the wealthiest families in the Austro-Hungarian Empire | *Tractatus*/*Philosophical Investigations* are entirely his own; he gave away the family fortune | `settled-record` |
| Nicolaus Copernicus | Uncle a Bishop who secured him a canon sinecure | Heliocentric theory recognized on its own scientific merit | `repo` |
| Wu Zetian | Modest court-entry access via father's official rank | Becoming the only female Emperor to rule in her own name was self-built political action with no hereditary claim available to her at all | `repo` |
| Averroes | Family dynasty of qadis (chief judges) across two generations | Philosophical commentaries on Aristotle stand as independent intellectual achievement | `repo` |
| Maimonides | Family of rabbinic scholars (early access), later severely disrupted by forced exile/persecution | *Mishneh Torah*/*Guide for the Perplexed* rebuilt and produced after displacement, on his own merit | `repo` |
| Julius Caesar | Patrician family (Julii); no hereditary throne existed to inherit in the Republic | Gallic conquest, political restructuring, dictatorship built through his own military/political career | `repo` |
| Akio Morita | Heir to a 14-generation family sake-brewing fortune; explicitly declined to inherit the family business | Co-founding Sony and its post-war electronics innovation is a distinct, self-built achievement | `settled-record` |
| Aung San Suu Kyi | Father Aung San's political legacy/name recognition (assassinated when she was 2) | ~15 years under house arrest, NLD leadership, Nobel Peace Prize — **Borderline**: genuinely contestable how much of her recognition traces to her father vs. her own sustained action; audit leans pass given the scale of personal sacrifice involved | `repo` (evidence ledger) |
| Oscar Niemeyer | Grandfather a Brazilian Supreme Court justice; elite Rio social access | Architectural innovation (Brasília, UN HQ contribution, signature style) is his own creative/technical work | `settled-record` |

## 5. Weak Fit / Inherited-Position Dependent (0)

None. The two structurally closest candidates to the failed Cleopatra
pattern — Wu Zetian (a female monarch) and Aung San Suu Kyi (inherited
political legacy) — were both examined in the calibration set precisely
*because* they looked risky, and both clear the counterfactual with a
real, separable, self-built achievement. Per the task's required
sequencing, KEEP/REVIEW/REPLACE-CANDIDATE analysis (matching-niche and
cultural/era/domain coverage review) applies only to the Weak-Fit tier —
**with zero people in that tier, no KEEP/REVIEW/REPLACE-CANDIDATE
action applies to anyone in the current roster.** Nothing was removed
or replaced this session, per scope.

## 6. Borderline note: Aung San Suu Kyi (no action required)

Flagged, not actioned. Her case is the one place in the roster where
"how much of this person's platform is inherited name-recognition"
is genuinely debatable rather than clear-cut. This does not trigger
KEEP/REVIEW/REPLACE (she is not Weak Fit — the audit's classification
is Earned but Advantaged, passing), but is worth keeping visible for any
future editorial-content work on her page, so a future session doesn't
have to re-derive the nuance: her decades of imprisonment/sacrifice are
unambiguously separable from her father's legacy; her *initial 1988
entry into politics* is the part that leans on it.

## 7. Proposed Self-Made / Earned-Distinction Gate v1 (for future candidates)

Extends the Roster Research & Scoring Protocol v1
(`roster.md` §"Frozen protocol") — insert as an explicit sub-step of
step 2 ("evidence-first, trait-blind"), before any trait is scored:

1. In the raw-notes/evidence-ledger stage, explicitly answer: *"What, if
   anything, did this person inherit — title, office, wealth, family
   name, family position?"* Write the answer down even if it's "nothing
   notable."
2. Classify using this audit's fixed 3-tier vocabulary — **Strong
   Self-Made Fit / Earned but Advantaged / Weak Fit — Inherited-Position
   Dependent** — with a Borderline flag if the counterfactual answer
   itself is genuinely contestable. Several roster3–10 candidate JSONs
   already write a free-text version of this note informally (this gate
   makes it mandatory and standardizes the vocabulary, it does not
   invent a new requirement).
3. A **Weak Fit** classification is a *hold requiring second-pass human
   review*, not an automatic rejection — same process weight as the
   Cleopatra -> Ibn Khaldun swap. Do not promote a Weak-Fit candidate
   without a recorded override rationale.
4. **Borderline** classifications are promotable as-is, but the
   one-paragraph counterfactual reasoning must be recorded in the
   permanent evidence record (candidate JSON `notes` field or evidence
   ledger), so a future audit doesn't have to re-derive it from scratch.
5. Apply the explicit non-factors checklist from §2 above: wealth alone,
   elite education alone, a family professional/scholarly tradition
   providing access, and premodern-era patronage/church/court pathways
   never by themselves trigger Weak Fit.
6. Distinguish, explicitly, starting privilege (never disqualifying
   alone) from dependence on inherited distinction itself (the actual
   disqualifying condition) — this is the single most common source of
   misclassification risk and the reason this gate exists as its own
   step rather than being folded into general "evidence discipline."
7. Hard boundary, unchanged from `inclusion_v1`: this gate never writes
   to any `Person` field read by scoring or matching. It is a
   candidate-research checklist and audit-trail note only.
8. Re-apply this audit's checklist (not full external re-research) to
   the incremental new people whenever a batch of 10+ is added, to catch
   drift before it accumulates.
