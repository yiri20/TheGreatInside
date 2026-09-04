# Roster Expansion 125 — Convergence Audit: Provenance Integrity, 30-Primary Matrix, Swap Triggers (DRAFT)

**Status: AUDIT + TARGETED CORRECTIONS, NOT COMMITTED.** 3 Track A
candidate files corrected on provenance review (Ravi Shankar, Edward
Said, José Rizal) — no other files touched. No roster/editorial/portrait
files touched, no `src/` changes, nothing promoted, no swap performed,
nothing committed.

---

## 1. Track A provenance audit

### What actually happened, stated plainly

The Track A execution note ("I'll rely primarily on well-established
knowledge...") was accurate about *method* (no new search was run at
write-time for most rows) but created real ambiguity about *whether the
claims were grounded*. On direct re-examination this session: **every row
across all 12 files cites a specific, named, dateable incident or
document** (e.g. "Operation Coldstore, 1963," "the 1985 tracheotomy,"
"the 1976 Smile Jamaica concert," "the 1993 'Morning After' essay") —
none rest on the prohibited categories (fame, office, ideology, "widely
known"/"famous for," achievement alone). So the *shape* of every row
already matched the required test's first two questions (what incident,
what source-type). What had **not** been done was independently verifying
those specific claims were accurate before writing them — exactly the gap
this task asked to check.

### Verification performed this session

Ran 11 targeted searches (not a broad new evidence-pack campaign) against
the specific claims carrying the most risk — the explicitly named
special-scrutiny candidates plus the "artistic reputation" ones:

| Candidate | Claim checked | Result |
|---|---|---|
| Deng Xiaoping | The "cat" maxim's origin and authenticity | **Confirmed**, with useful nuance added: borrowed from Gen. Liu Bocheng / Sichuan folk wisdom, said in 1962 (not literally during the reform era) — not a fabrication, existing rationale already framed it as a "pragmatic justification," which holds |
| Lee Kuan Yew | Operation Coldstore; the defamation-litigation pattern | **Confirmed**, and more specifically than originally written (Jeyaretnam, IHT/WSJ/FEER/Bloomberg/Economist all named; "no PAP leader has ever lost a defamation action") |
| Ratan Tata | Personal role in the 2008 Mumbai Taj Hotel attack response | **Confirmed and strengthened** (stood at the hotel entrance during the siege; founded the Taj Public Service Welfare Trust; ensured continued salaries for killed employees' families) |
| Shirin Ebadi | The Chain Murders case specifics | **Confirmed and strengthened** (found the actual transcript implicating a government minister; was herself told she was next on the assassination list) |
| Babur | The wine-renunciation-before-Khanwa episode | **Confirmed** (25 Feb 1527, 300 begs joined him, cups broken, stores poured out) — primary motive was documented as *raising army morale*, a nuance the existing rationale already captured adequately |
| Ravi Shankar | The Monterey Pop tuning-applause anecdote | **FALSE AS WRITTEN** — the documented anecdote belongs to the 1971 Concert for Bangladesh, not Monterey 1967. **Corrected** (see §1.2). |
| Bob Marley | The 1976 shooting; the 1978 handshake | **Confirmed precisely**, including the detail that the Manley-Seaga handshake was "awkward, mutually grudging" on the politicians' side — a nuance not previously captured but not required for the row as written |
| Sebastião Salgado | The Rwanda crisis-of-purpose account | **Confirmed via his own quoted words** in the documentary ("I did not believe in anything... I had seen so much brutality") |
| Edward Said | The stone-throwing incident; the PLO/Oslo break | Stone-throwing **confirmed precisely** (3 July 2000, Kafr Killa, landed harmlessly). The PLO **advisory-role break was NOT independently re-confirmed** this session — only his sustained, sharply-worded 1993 published criticism of Oslo was. **Corrected** (see §1.2). |
| Haile Selassie | The League of Nations speech's independent press corroboration | **Confirmed and strengthened** (Italian journalists specifically; the Romanian delegate's "to the door with the savages" quote) |
| José Rizal | Species named after him; the Dapitan water-system claim | Species-naming **confirmed** (Draco rizali and others). Water-system claim **NOT independently re-confirmed** this session. **Corrected** (see §1.2). |

**10 of 11 spot-checked claims confirmed accurate, several with richer
corroboration than originally written. 1 was a genuine misattribution
(Ravi Shankar/Monterey), and 2 additional claims (Said's PLO role;
Rizal's water system) could not be independently re-confirmed this
session and were narrowed rather than left unsupported.**

### 1.2 Corrections made

- **`ravi-shankar.json`, `social_assertiveness`**: corrected from "1967
  Monterey Pop Festival" to the verified 1971 Concert for Bangladesh,
  with the actual quoted line ("If you like our tuning so much, I hope
  you will enjoy the playing more"). Score/confidence unchanged (60/0.44)
  — the underlying behavioral pattern (direct public communication under
  an awkward cross-cultural moment) is the same, only the venue/date was
  wrong.
- **`edward-said.json`, `independent_thinking`**: narrowed from "broke
  publicly from his prior advisory association with the PLO leadership"
  to the specifically re-confirmed claim (the October 1993 "Morning
  After" essay, "an instrument of Arab surrender," public call for
  Arafat's resignation). Score lowered 88→85, confidence 0.62→0.6.
- **`edward-said.json`, `autonomy_need`**: same narrowing. Score lowered
  74→72, confidence 0.48→0.46.
- **`jose-rizal.json`, `adaptability`**: the water-supply-system detail
  removed from the row's basis (not independently re-confirmed this
  session); rationale now rests only on the multiply-confirmed
  medicine/agriculture/teaching activity during the Dapitan internment.
  Score lowered 65→63, confidence 0.46→0.44.

**No row was strengthened by this pass — every change was a narrowing or
a same-direction citation fix**, consistent with the instruction not to
search until a low scorer becomes eligible.

### 1.3 Validator re-run after corrections

```
edward-said: scored=18 avgConf=0.464 coverage=0.546 eligible=false  (was 0.467)
jose-rizal:  scored=18 avgConf=0.504 coverage=0.539 eligible=false  (was 0.505)
ravi-shankar: scored=18 avgConf=0.460 coverage=0.542 eligible=false (unchanged — citation-only fix)
```

0 errors, 0 warnings across the full corpus (182 candidates). **No
lifecycle status changed** — all three were already `held` and remain
`held`. Full corpus status tally unchanged: `held` 121, `qa_passed` 61.

### 1.4 Do all 12 READY classifications still hold?

**Yes.** None of the 12 files needed a row removed entirely, and none
dropped below the READY threshold this task itself defines (a sufficient
existing evidence base to enter normal scoring) — the corrections were
narrowing/citation-fixes on 2 of 12 files (Said, Rizal), not a discovery
that any candidate's evidence base was inadequate. Ravi Shankar's
correction was a pure citation fix with no score movement.

## 2. Exact 30-primary matrix

Built mechanically from live file/validator state, not from prior prose
summaries. **Lifecycle status and evidence-adequacy disposition are kept
in separate columns, as instructed — they are not assumed synonymous.**

| # | Candidate | Origin track | JSON exists? | Scored rows | Lifecycle | Validator eligibility | Evidence-adequacy disposition | Structurally thin? | Swap trigger? |
|---|---|---|---|---|---|---|---|---|---|
| 1 | José Rizal | A | Yes | 18 | `held` | `false` (avgConf 0.504) | Adequately evidenced | No | No |
| 2 | Raden Ajeng Kartini | D | Yes | 18 | `held` | `false` (0.477) | Adequately evidenced | No | No |
| 3 | Lee Kuan Yew | A | Yes | 18 | `held` | `false` (0.499) | Adequately evidenced | No | No |
| 4 | Saladin | B | Yes | 20 | `held` | `false` (0.526) | Adequately evidenced | No | No |
| 5 | Golda Meir | B | Yes | 19 | `held` | `false` (0.446) | Adequately evidenced | No | No |
| 6 | Shirin Ebadi | A | Yes | 15 | `held` | `false` (0.472) | Adequately evidenced, thinner spread (living-person discipline) | No | No |
| 7 | Edward Said | A | Yes | 18 | `held` | `false` (0.464) | Adequately evidenced (corrected this session) | No | No |
| 8 | Al-Biruni | C | Yes | 22 | `held` | `false` (0.530) | `IMPROVED_BUT_CEILING_REMAINS` | No | No |
| 9 | Babur | A | Yes | 18 | `held` | `false` (0.473) | Adequately evidenced | No | No |
| 10 | Akbar | D | Yes | 18 | `held` | `false` (0.478) | `READY_FOR_FIRST_SCORE`, scored | No | No |
| 11 | Ashoka the Great | D | **No** | 0 | **pre-score / unscored, no candidate file** | `N/A` (not scoreable) | `STRUCTURALLY_THIN` | **Yes** | **Yes** |
| 12 | Ravi Shankar | A | Yes | 18 | `held` | `false` (0.460) | Adequately evidenced (citation corrected this session) | No | No |
| 13 | Sun Yat-sen | B | Yes | 19 | `held` | `false` (0.476) | Adequately evidenced | No | No |
| 14 | Chien-Shiung Wu | C | Yes | 20 | `held` | `false` (0.479) | `IMPROVED_BUT_CEILING_REMAINS` | No | No |
| 15 | Junko Tabei | B | Yes | 22 | `held` | `false` (0.507) | Adequately evidenced | No | No |
| 16 | Deng Xiaoping | A | Yes | 18 | `held` | `false` (0.482) | Adequately evidenced | No | No |
| 17 | José Martí | B | Yes | 18 | `held` | `false` (0.477) | Adequately evidenced | No | No |
| 18 | Gabriel García Márquez | B | Yes | 22 | `held` | `false` (0.505) | Adequately evidenced | No | No |
| 19 | Bob Marley | A | Yes | 18 | `held` | `false` (0.468) | Adequately evidenced | No | No |
| 20 | Sebastião Salgado | A | Yes | 18 | `held` | `false` (0.476) | Adequately evidenced | No | No |
| 21 | Kwame Nkrumah | B | Yes | 21 | `held` | `false` (0.509) | Adequately evidenced | No | No |
| 22 | Miriam Makeba | B | Yes | 20 | **`qa_passed`** | **`true`** (0.549) | Adequately evidenced, eligible | No | No |
| 23 | Desmond Tutu | B | Yes | 21 | `held` | `false` (0.511) | Adequately evidenced | No | No |
| 24 | Haile Selassie | A | Yes | 18 | `held` | `false` (0.426) | Adequately evidenced | No | No |
| 25 | Naguib Mahfouz | B | Yes | 20 | `held` | `false` (0.518) | Adequately evidenced | No | No |
| 26 | Ibn Battuta | C | Yes | 21 | `held` | `false` (0.486) | **`STRUCTURALLY_THIN`** | **Yes** | **Yes** |
| 27 | Baruch Spinoza | D | Yes | 18 | `held` | `false` (0.448) | `READY_FOR_FIRST_SCORE`, scored | No | No |
| 28 | Stephen Hawking | A | Yes | 18 | `held` | `false` (0.466) | Adequately evidenced | No | No |
| 29 | Simone de Beauvoir | B | Yes | 21 | `held` | `false` (0.490) | Adequately evidenced | No | No |
| 30 | Ratan Tata | A | Yes | 18 | `held` | `false` (0.441) | Adequately evidenced | No | No |

### Reconciled totals — Lifecycle (non-overlapping, sums to 30)

| Lifecycle state | Count |
|---|---|
| `qa_passed` | 1 |
| `held` (has a candidate file, scored, validator-computed) | 28 |
| Pre-score / unscored / no candidate file | 1 (Ashoka) |
| **Total** | **30** |

### Reconciled totals — Evidence adequacy (non-overlapping, sums to 30)

Counted directly from the matrix: 30 rows total, of which 4 carry a
non-"adequately evidenced" disposition (Al-Biruni, Chien-Shiung Wu, Ibn
Battuta, Ashoka) — the remaining 26 are adequately evidenced and scored.

| Evidence-adequacy category | Count |
|---|---|
| Adequately evidenced and scored (includes the 1 `qa_passed`) | 26 |
| `IMPROVED_BUT_CEILING_REMAINS` (evidenced, real ceiling, not thin) | 2 (Al-Biruni, Chien-Shiung Wu) |
| `STRUCTURALLY_THIN` | 2 (Ibn Battuta — scored but thin; Ashoka — unscored and thin) |
| **Total** | **30** |

This reconciles exactly. **The prior turn's "1 `qa_passed` / 27 `held` /
2 `STRUCTURALLY_THIN`" phrasing was imprecise**: it conflated a lifecycle
count (`held`, which was actually 28, not 27, once Ashoka's unscored state
is separated out) with an evidence-adequacy count in the same sentence —
exactly the ambiguity this phase was asked to resolve. The two axes are
now reported separately: lifecycle is 1 `qa_passed` + 28 `held` + 1
pre-score/no-file = 30; evidence adequacy is 26 adequate + 2
ceiling-remains + 2 thin = 30. Both reconcile independently.

**Confirmed, as the phase anticipated: Ibn Battuta is both `held`
(lifecycle) AND `STRUCTURALLY_THIN` (evidence adequacy) — not mutually
exclusive categories. Ashoka is pre-score/no-file (lifecycle) AND
`STRUCTURALLY_THIN` (evidence adequacy) — also not mutually exclusive,
and correctly outside normal validator eligibility computation since he
was never scored.**

## 3. Confirmed structural swap triggers

**Exactly 2, verified from the final reports, not assumed: Ibn Battuta
and Ashoka.** No other candidate in the 30 carries a `STRUCTURALLY_THIN`
disposition.

### Ibn Battuta

Per `track-c-structural-ceiling`'s own §4b (unchanged by this session):
the issue is the specific conjunction of (1) extreme dependence on the
*Rihla*, a candidate-controlled, dictated self-narration; (2) confirmed
genre/self-presentation risk within that same source (Dunn's own finding
of embellishment in the least reliable passages); (3) 20 of 21 scored
rows resting on that source alone, zero external touch; (4) the one
external source found (Barani) constraining only the general danger of
Tughluq's court, not Ibn Battuta's specific personal episode; (5)
targeted research in two separate passes failing to diversify the
witness base. **This is not "one primary source makes a candidate
unusable" as a general rule** — it is this specific conjunction, and it
is why ordinary additional mining is no longer the preferred next
action: two research passes already tried exactly that and both came
back empty on the witness-diversity axis specifically.

### Ashoka

Per `track-d-evidence-packs`'s corrected §4 (this session's wording
fix, no new finding): the issue is **not** that Ashoka is poorly
documented — the edicts are exceptionally strong contemporaneous
policy/self-presentation evidence, real archaeological/epigraphic
evidence independently situates aspects of the administrative program,
and this is a genuinely rich historical record. The specific,
narrower limitation is that **no independent source class observing his
ordinary, interpersonal, or private conduct was identified**, and the
one body of personality-rich narrative that exists (the *Ashokavadana*)
is four-plus centuries removed and explicitly legendary/propagandistic —
unsuited to fill that role reliably. This is a personality-
differentiation-specific limitation under this project's own behavioral
standard, not a historical-documentation problem in general.

## 4. Existing alternate pool (recovered, not reinvented)

Recovered from `roster-expansion-125-selection-closure-audit-DRAFT.md`
§9 (the original 10 alternates, set during the initial candidate-
selection phase, before any Track B/C/D/A evidence work existed):

1. Ho Chi Minh — clean file, passes the political-candidate consistency
   test
2. Sukarno — clean file, same
3. Chief Joseph — clean file, strongest indigenous-North-America case
4. Suleiman the Magnificent — clean file, West Asia depth
5. Anwar Sadat — **CAUTION**: prior file, `status: "held"` (SS76 revert)
6. Corazon Aquino — clean file, Southeast Asia depth
7. Hannah Arendt — clean file, philosophy alternate
8. Miguel de Cervantes — clean file, literature alternate
9. Norman Borlaug — clean file, applied-science alternate
10. Roald Amundsen — **CAUTION**: prior file, `status: "held"`, only
    5/34 rows scored (same severity class as Pelé/Walker, the two
    candidates already swapped out of the primary 30 earlier in this
    series)

**This pool was built for general roster diversity at the original
selection stage — none of the 10 were chosen with Ibn Battuta's or
Ashoka's specific gap in mind.** Checked directly against both gaps:

- **Region/era match for Ibn Battuta's slot** (medieval era; exploration
  domain; North Africa/West Asia representation): **none of the 10 are
  medieval**, and only Roald Amundsen is in the exploration domain at
  all — but he is 20th-century Western European, not medieval, and
  would add to (not relieve) Western Europe's already-largest regional
  share.
- **Region/era match for Ashoka's slot** (ancient era; South Asia;
  politics/public leadership): **none of the 10 are ancient, and none
  are South Asian.**

**Neither gap has a designated or even a plausible alternate in the
existing pool.**

## 5. Alternate evidence preflight

Given §4's finding, the only alternate worth a preflight check at all is
Roald Amundsen (the sole exploration-domain name), evaluated honestly
against Ibn Battuta's specific gap:

| Dimension | Roald Amundsen | Ibn Battuta (primary) |
|---|---|---|
| Source availability | Own file already exists; **already found severely inadequate** in an earlier pass this series (5/34 rows scored, coverage 0.152) | 21/34 rows scored, avgConf 0.486 |
| Provenance diversity | Not assessed further — the existing severe shortfall was a real, already-tested finding, not a stale guess | Single-witness (the acknowledged structural problem) |
| Behavioral richness | Unknown/untested beyond the existing thin file | Rich narrative, but single-witness |
| Era fit for the vacated slot | **Poor** — 20th century, not medieval | Medieval (the actual gap) |
| Region fit | **Poor** — Western Europe (Norway), already the 2nd-largest region in the roster | North Africa/West Asia (a genuine gap-filler) |
| Net effect if swapped in | Would not restore medieval-era representation, would add to the already-largest region, and inherits a *worse*, already-documented evidence shortfall than Ibn Battuta's | n/a |

**Conclusion: Amundsen does not solve the evidence-structure problem —
he has his own, already-documented, more severe one, and fails the
era/region fit that made Ibn Battuta valuable in the first place.** No
other alternate in the pool is even domain-adjacent to either gap, so no
further preflight is warranted this phase.

## 6. Swap recommendations

### Ibn Battuta: `KEEP_PRIMARY_DESPITE_CEILING`

**Rationale**: real, substantial, evidence-grounded work already exists
(21 scored rows, `held` not rejected); no alternate in the existing pool
addresses the specific era/region/domain gap he fills, and the one
domain-adjacent candidate (Amundsen) has an already-documented, more
severe evidence problem of his own plus poor era/region fit. **Roster-
coverage impact of keeping him**: preserves the roster's only
North-Africa/West-Asia-medieval exploration representation; his
`STRUCTURALLY_THIN` status means he should not be treated as a
scoring-improvement target, but there is no coverage reason to remove
him either. **Unresolved risk**: if a future session identifies a
genuinely better-evidenced medieval or exploration-domain candidate
(independent of this pool), that would be the actual trigger for
revisiting this — not forcing the current pool's weakest fit now.

### Ashoka: `NO_ACCEPTABLE_ALTERNATE_YET`

**Rationale**: no candidate file exists (he was never scored, correctly,
per Track D's disposition); no alternate in the existing pool is even
domain-adjacent (ancient era + South Asia + politics/leadership — zero
matches). **Roster-coverage impact**: ancient era remains the thinnest
era in the current 95 (4 people) and would gain nothing from forcing an
unrelated alternate into this nominal slot. **Unresolved risk**: this
slot effectively remains open pending either (a) a dedicated future
search specifically for an ancient-era, evidence-rich, ideally South
Asian figure, or (b) a decision that the +30 expansion proceeds with 29
primaries and this slot is simply not filled from the original
candidate pool. **No swap is recommended now in either direction** — this
is a genuine "search continues" conclusion, not a disguised keep-or-swap
default.

## 7. Exact repository delta

**Files modified before this turn (Track B + C, 14 — unchanged this
session):** `al-biruni.json`, `chien-shiung-wu.json`, `ibn-battuta.json`,
`desmond-tutu.json`, `gabriel-garcia-marquez.json`, `golda-meir.json`,
`jose-marti.json`, `junko-tabei.json`, `kwame-nkrumah.json`,
`miriam-makeba.json`, `naguib-mahfouz.json`, `saladin.json`,
`simone-de-beauvoir.json`, `sun-yat-sen.json`.

**Files created before this turn (Track D + A, 15 — unchanged in count,
3 of them edited this turn):** `kartini.json`, `akbar.json`,
`baruch-spinoza.json` (Track D); `lee-kuan-yew.json`, `shirin-ebadi.json`,
`babur.json`, `ravi-shankar.json`, `deng-xiaoping.json`,
`bob-marley.json`, `sebastiao-salgado.json`, `haile-selassie.json`,
`stephen-hawking.json`, `ratan-tata.json` (Track A, unedited this turn);
`jose-rizal.json`, `edward-said.json` (Track A, **edited this turn** —
see below).

**Track A provenance corrections from this turn (3 files edited, all
already existed, none newly created):**
- `data-pipeline/candidates/ravi-shankar.json` (citation fix)
- `data-pipeline/candidates/edward-said.json` (2 rows narrowed)
- `data-pipeline/candidates/jose-rizal.json` (1 row narrowed)

**New convergence report file (1):**
- `docs/checkpoints/roster-expansion-125-convergence-audit-DRAFT.md`
  (this file)

**Alternate-related files created or modified: none.** Per instruction,
no alternate's full candidate file was created for comparison — the
preflight in §5 was performed against Amundsen's *existing* file and the
pool's own recorded characteristics, not a new file.

**Unrelated pre-existing file, explicitly confirmed NOT touched by this
turn or any prior roster-expansion turn:**
- `next-env.d.ts`

**Untracked checkpoint files from earlier sessions, not touched this
turn (8):** `roster-expansion-125-candidate-audit-DRAFT.md`,
`roster-expansion-125-selection-closure-audit-DRAFT.md`,
`roster-expansion-125-held-candidate-evidence-audit-DRAFT.md`,
`roster-expansion-125-evidence-deepening-batch1-DRAFT.md`,
`roster-expansion-125-evidence-deepening-batch2-DRAFT.md`,
`roster-expansion-125-track-c-structural-ceiling-DRAFT.md`,
`roster-expansion-125-track-d-evidence-packs-DRAFT.md`,
`roster-expansion-125-track-a-first-scoring-DRAFT.md`.

**Cumulative across the whole roster-expansion series: 29 candidate
files touched (14 modified + 15 created, 3 of the 15 also edited this
turn), 1 unrelated pre-existing file left untouched, 9 checkpoint/report
files untracked in git (8 from earlier turns + this one).** Nothing
committed.

## 8. Validation performed this turn

- `node -e "JSON.parse(...)"` on the 3 edited files — valid JSON.
- `corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts` —
  run once after all corrections: **0 errors, 0 warnings** across the
  full 182-candidate corpus. Status tally unchanged (`held` 121,
  `qa_passed` 61) — no lifecycle status changed by this turn's
  corrections, and no unrelated candidate's computed eligibility shifted.
- Not run: `tsc`/`vitest`/`next build` — this turn touches only
  `data-pipeline/candidates/*.json` and documentation.
- **No candidate was reopened, rescued, or padded** — per instruction,
  the 26 "adequately evidenced, held" candidates were left exactly as
  they were; only the 2 genuinely mischaracterized/misattributed claims
  found during the provenance audit were corrected, and both corrections
  moved scores *down*, not up.

## 9. Stop condition confirmed

Track A provenance integrity verified and corrected (3 files). The exact
30-primary matrix is built and reconciles to 30 on both axes. The 2
genuine structural swap triggers (Ibn Battuta, Ashoka) are confirmed from
the final reports, with precise, non-generalizing reasons for each. The
existing 10-alternate pool is recovered and checked against both gaps —
no match found for either. The one domain-adjacent alternate (Amundsen)
received a preflight and was found unsuitable on both evidence-quality
and era/region-fit grounds. Recommendations: **`KEEP_PRIMARY_DESPITE_CEILING`
for Ibn Battuta; `NO_ACCEPTABLE_ALTERNATE_YET` for Ashoka.** No swap
performed. No promotion performed. No eligibility standard lowered.
Stopping here for the next reviewed phase.
