# Roster 12 — new-intake batch (2026-09-04)

Branch: `feat/roster12-new-intake-batch`, worktree
`TheGreatInside-roster12-new-intake-batch`, based on `origin/main` (HEAD at
worktree creation: `c784e89`, the merged Miriam Makeba profile-fix — this
cycle begins from a production baseline with zero known outstanding
promotion-completeness defects).

## Why this cycle exists

96 live roster members, target 125, gap 29. Zero unpromoted `qa_passed`
candidates existed at cycle start (confirmed mechanically: every
`qa_passed` candidate JSON in `data-pipeline/candidates/` was already
cross-referenced against every live `roster*.ts`/`seed.ts` slug — 0
matches). The next expansion therefore had to begin with genuinely new
candidate intake, not promotion of an existing backlog.

## 1. Coverage analysis (mechanical, before any candidate work)

Computed directly from the 96-person live roster (`src/data/people/
roster*.ts` + `seed.ts`), not estimated:

| Region | Count | % |
|---|---|---|
| North America | 25 | 26.0% |
| Western Europe | 21 | 21.9% |
| East Asia | 9 | 9.4% |
| Southern Europe | 8 | 8.3% |
| Central Europe | 7 | 7.3% |
| South Asia | 7 | 7.3% |
| Latin America | 6 | 6.2% |
| Sub-Saharan Africa | 6 | 6.2% |
| North Africa | 3 | 3.1% |
| West Asia | 2 | 2.1% |
| Central Asia | 2 | 2.1% |

| Era | Count | % |
|---|---|---|
| 20th century | 30 | 31.2% |
| 19th century | 21 | 21.9% |
| Contemporary | 16 | 16.7% |
| Early modern | 14 | 14.6% |
| Medieval | 11 | 11.5% |
| **Ancient** | **4** | **4.2%** |

No gender field exists anywhere in the schema (`PersonSeed`/`Candidate`) —
per the task's own instruction not to invent a new diversity quota, gender
was not tracked or optimized for. Region and era are the only two
roster-balance dimensions this cycle used, both explicitly present in the
schema (`regionCode`, `era`).

**Reading**: West Asia, Central Asia, North Africa, Sub-Saharan Africa,
South Asia, and Latin America are all substantially underrepresented
relative to North America/Western Europe (47.9% combined). Ancient is the
single most underrepresented era by a wide margin.

## 2. Discovery pool (27 people)

Every name below was checked against the full existing corpus (183
candidate JSON files + 96 live roster slugs, ~279 identity checks in
total) before inclusion — nearly every "obvious" pick across every
underrepresented region turned out to already exist as a genuinely scored
`held` candidate from the roster-1000/roster-expansion-125 programs
(Saladin, Akbar, Cicero, Sun Tzu, Chanakya, Hannibal Barca, Hypatia,
Al-Biruni, and dozens more), which the task explicitly disqualifies from
reuse ("not already present as candidate JSON unless clearly a non-scored
placeholder" — spot-checked several: all carried 18-22 genuinely scored
rows and real provenance notes, not placeholders). The 27 below are
confirmed absent from both sets:

Timur, Nzinga of Ndongo and Matamba, Winnie Madikizela-Mandela, Ken
Saro-Wiwa, Léopold Sédar Senghor, Gamal Abdel Nasser, Muhammad Ali Pasha
(of Egypt), Benazir Bhutto, Jawaharlal Nehru, Muhammad Ali Jinnah, Empress
Dowager Cixi, Toyotomi Hideyoshi, Qiu Jin, Puyi, Lu Xun, Chiang Kai-shek,
Ho Chi Minh, Seneca, Marcus Aurelius, Tawakkol Karman, King Hussein of
Jordan, Salvador Allende, Che Guevara, Eva Perón, Yaa Asantewaa, Cato the
Younger, Savitribai Phule.

## 3. Preflight (fast, pre-score classification)

| Label | Count | Names |
|---|---|---|
| `STRONG_INTAKE` | 19 | Timur, Nzinga, Winnie Madikizela-Mandela, Ken Saro-Wiwa, Senghor, Nasser, Bhutto, Nehru, Cixi, Hideyoshi, Puyi, Lu Xun, Chiang Kai-shek, Ho Chi Minh, Seneca, Marcus Aurelius, King Hussein, Allende, Che Guevara |
| `PLAUSIBLE_INTAKE` | 6 | Muhammad Ali Pasha, Jinnah, Qiu Jin, Tawakkol Karman, Eva Perón, Cato the Younger |
| `STRUCTURAL_RISK` | 2 | Yaa Asantewaa (single institutional/administrative source class plus oral tradition, limited independent corroboration of specific personal episodes — resembles the Ashoka/Ibn Battuta pattern), Savitribai Phule (heavily dependent on one family/tradition's own record with limited independent third-party corroboration) |
| `REJECT_PRE_SCORE` | 0 | — |

## 4. Frozen intake batch (15, exact order)

Selected on evidence quality first (all 15 were `STRONG_INTAKE`, so no
`PLAUSIBLE_INTAKE` candidate was needed), then region/era coverage need as
tiebreaker — East Asia's 6 `STRONG_INTAKE` candidates were trimmed to 2
(Chiang Kai-shek, for a uniquely rich decades-spanning private-diary
source; Cixi, for era value) since East Asia was the least urgent of the
underrepresented regions:

1. Timur — Central Asia, medieval
2. Nzinga of Ndongo and Matamba — Sub-Saharan Africa, early modern
3. Winnie Madikizela-Mandela — Sub-Saharan Africa, contemporary
4. Ken Saro-Wiwa — Sub-Saharan Africa, contemporary
5. Léopold Sédar Senghor — Sub-Saharan Africa, 20th century
6. Gamal Abdel Nasser — North Africa, 20th century
7. Benazir Bhutto — South Asia, contemporary
8. Jawaharlal Nehru — South Asia, 20th century
9. King Hussein of Jordan — West Asia, 20th century
10. Chiang Kai-shek — East Asia, 20th century
11. Empress Dowager Cixi — East Asia, 19th century
12. Seneca — Ancient, Southern Europe
13. Marcus Aurelius — Ancient, Southern Europe
14. Salvador Allende — Latin America, 20th century
15. Che Guevara — Latin America, 20th century

Frozen; not altered after freezing (no replacements, no additions).

## 5. Evidence packs and first scoring

Each of the 15 received a full `data-pipeline/candidates/<slug>.json`
(schema `candidate_v1`) with 18-21 scored attributes, genuine multi-source
citation (2-6 sources each, spanning self-report/memoir where it exists,
independent contemporary or near-contemporary accounts, and — for the two
ancient figures — the rubric's own confidence-ceiling discipline for
ancient/medieval evidence), and honest confidence levels per
`docs/scoring-rubric-v1.md`. Genuine documented contradictions were kept
as `dual_edged` rather than smoothed away: Seneca's wealth-vs-preached-
simplicity tension, Winnie Madikizela-Mandela's TRC-documented
accountability alongside her genuine activism, Nzinga's pragmatic
religious conversions, Nasser's authoritarian methods (acknowledged but
not separately scored — a documented, honestly flagged gap, not an
oversight), Chiang Kai-shek's 1927 Shanghai purge, Hussein's Black
September decision, Allende's death (the record deliberately states only
the undisputed fact — he remained in La Moneda and died there during the
coup — without asserting a specific, historically disputed cause).

`corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts`:
**0 errors, 0 warnings** across all 15 on first run.

## 6. Eligibility gate — the honest result

Every one of the 15 was first-scored to completion, then validated
**once**. No row was edited after seeing its eligibility result, per the
rubric's confidence-change policy (§10) and this cycle's own explicit
instruction not to chase eligibility.

| Candidate | scored | avgConf | coverage | eligible |
|---|---|---|---|---|
| Marcus Aurelius | 20 | 0.547 | **0.604** | **true** |
| Che Guevara | 21 | 0.581 | **0.625** | **true** |
| Jawaharlal Nehru | 20 | 0.574 | 0.599 | false |
| Salvador Allende | 19 | 0.562 | 0.569 | false |
| Seneca | 19 | 0.512 | 0.569 | false |
| Chiang Kai-shek | 19 | 0.545 | 0.565 | false |
| Empress Dowager Cixi | 19 | 0.523 | 0.566 | false |
| Léopold Sédar Senghor | 18 | 0.531 | 0.549 | false |
| Benazir Bhutto | 18 | 0.547 | 0.539 | false |
| King Hussein of Jordan | 18 | 0.546 | 0.543 | false |
| Gamal Abdel Nasser | 18 | 0.539 | 0.540 | false |
| Queen Nzinga | 18 | 0.558 | 0.533 | false |
| Ken Saro-Wiwa | 18 | 0.542 | 0.536 | false |
| Timur | 18 | 0.528 | 0.536 | false |
| Winnie Madikizela-Mandela | 18 | 0.508 | 0.536 | false |

**2 of 15 cleared `eligibility_v2` honestly.** All 13 non-eligible
candidates met the raw attribute-count floor (≥18) and were close on
average confidence — the binding constraint in every single case was
`coverage` (the weighted-taxonomy floor of 0.6), not confidence or count.
This means the specific attributes chosen for each candidate's evidence
pack, not the underlying evidence quality, determined the miss — a real,
identified target for a future evidence-deepening pass on these 13
(scoring more of the *already-researched* evidence pack against
higher-weight attributes, not new research toward a target). All 13 are
`held` with a `holdReason` citing these exact numbers; none were padded,
none were re-scored after seeing the result.

## 7. Promotion sub-batch and the portrait blocker

Promotion sub-batch (candidates that are `qa_passed`, not already live,
not structurally thin, identity-clean): **Marcus Aurelius, Che Guevara.**

Both are product-content-complete-or-blocked as follows:

- **Marcus Aurelius: product-complete, promoted.** Real portrait (a
  Louvre Antonine-period marble bust, CC BY 2.5, unambiguous rights — see
  §8), full EN/KO editorial content (§9), live-verified.
- **Che Guevara: NOT promoted this cycle — documented production
  blocker, portrait only.** No rights-clear, non-AI-generated portrait
  could be sourced within this cycle. Investigated and rejected:
  - The iconic "Guerrillero Heroico" (Alberto Korda, 1960) and its
    derivatives: Commons carries a "PD Cuba" tag, but Korda himself
    successfully sued Smirnoff in 2000 over commercial use on moral-rights
    grounds — a real, documented assertion of rights that undercuts a
    clean "public domain everywhere, no rights reserved" claim. One
    specific derivative file (`CheHigh.jpg`) is additionally flagged on
    its own Commons page as "appears to be an AI-modified version,"
    independently disqualifying it under this project's no-AI-portrait
    rule.
  - `Che_Guevara_Diplomatic_Picture.jpg`: the uploader claims personal
    copyright ownership of a 1960s-era photograph and states "I have
    Caputred it" — an almost certainly false authorship claim, not a
    legitimate rights grant.
  - `CheOnBalcony.jpg` (1949, PD-Argentina claim): unknown photographer,
    the file's own page flags a missing required US public-domain tag,
    and it depicts a ~21-year-old pre-revolutionary Guevara that would not
    read as a recognizable portrait of the person this profile is about.
  - René Burri's 1963 *Look* magazine photograph (`Che_Guevara_
    (cropped).jpg`): the most specific, checkable rationale found (US
    non-renewal of a pre-1978 press photo), but the file's own page flags
    real complications in Canada, mainland China, Germany, Mexico, and
    Switzerland, and Burri's estate/Magnum Photos has historically been
    an assertive rights-holder for his other work.
  - No Cuban state-archive or Prensa Latina photo with an explicit,
    checkable release was located within this cycle's search effort.

  Per the task's explicit instruction, Che Guevara's candidate JSON and
  `qa_passed` lifecycle are left completely intact — **not** downgraded to
  `held`, **not** promoted without a portrait. He is next-in-line for a
  future cycle once a rights-clear portrait is resolved (or a
  product-owner decision to proceed under the pre-existing "no portrait
  is a valid, supported state" repo convention — not made unilaterally
  here, since the current task's product-completeness bar for *new*
  promotions is explicit and stricter than that older convention).

No candidate's score, confidence, evidence, or lifecycle was altered to
enable or avoid promotion at any point in this section.

## 8. Marcus Aurelius — portrait

- **Image**: [File:Marcus Aurelius Louvre MR561 n02.jpg](https://commons.wikimedia.org/wiki/File:Marcus_Aurelius_Louvre_MR561_n02.jpg),
  Wikimedia Commons.
- **License**: CC BY 2.5 — unambiguous, attribution-only.
- **Provenance**: Marble bust, Antonine period (c. 161-169 CE) — close to
  Marcus Aurelius's own lifetime, not a later depiction. Louvre Museum,
  Paris, catalogued MR 561 (Ma 1166); discovered at Acqua Traversa near
  Rome in 1674; currently on loan to the Metropolitan Museum of Art
  (accession L.2008.49). Photographed by Marie-Lan Nguyen, 12 January
  2011.
- **Processing**: downloaded the original (2773×4160, 9.0 MB), resized to
  1246×1869 and re-encoded via Pillow at quality 85 (346 KB) — no crop, no
  upscale, no AI processing.
- **File**: `public/portraits/marcus-aurelius-louvre-bust.jpg`.
- **`kind`**: `"likeness"` — an ancient bust made close to the subject's
  own lifetime, not a later-tradition depiction.
- **Wiring**: added directly to `src/data/people/roster12.ts`'s `portrait`
  field, following the same established manual-enrichment precedent used
  for Miriam Makeba and documented in the earlier profile-fix checkpoint —
  `generateRoster12.ts`, like every prior `generateRosterN.ts`, does not
  emit a `portrait` field even though `toPersonSeed()` supports one; every
  portrait in this repo's history was added by hand-editing the generated
  roster file directly. `peopleIndex.generated.ts` was regenerated to pick
  up the new `portraitUrl` (1-line additive diff for this entry, same
  pattern as before, within the larger regeneration diff for the new
  person's full index entry).

Verified live in-browser: renders on both the People Directory card and
the detail-page hero, with full attribution caption, in a manually started
dev server running this exact worktree's code.

## 9. Marcus Aurelius — editorial content

Source: only his own already-scored candidate rationale (Meditations,
Cassius Dio, Historia Augusta) — no new research. 2 achievements
(sustaining Meditations under active campaign conditions; the
unprecedented Lucius Verus co-emperorship), 2 moments (the Avidius Cassius
revolt and his documented preference for clemency over vengeance; Book 1
of Meditations' specific catalog of named teachers), 1 turning point
(choosing to personally command from the dangerous Danube frontier rather
than direct the war from Rome), 2 interpretations tied to his own scored
attributes (`conflict_tolerance`, `risk_tolerance`), both English and
Korean written together. `editorialValidation.test.ts`: **20/20 pass.**
Verified live in both locales — no raw i18n keys, no placeholder text.

## 10. Full validation suite (this cycle, in this worktree)

| Check | Command | Result |
|---|---|---|
| Candidate validator | `tsx src/dev/roster1000/validateCandidates.ts` | 0 errors, 0 warnings; `held` 134 (121+13) / `qa_passed` 63 (61+2) |
| Scoring-lock integrity | `tsx src/dev/roster1000/checkScoringLockIntegrity.ts` | 0 flagged (182 previously-committed files checked) |
| Editorial validation | `vitest run src/core/people/editorialValidation.test.ts` | 20/20 |
| Typecheck | `tsc --noEmit` | clean |
| Full unit/integration | `vitest run` | **689/689** (unchanged — no test files touched by this cycle beyond the new e2e spec) |
| i18n audit | `tsx src/dev/i18n-audit.ts` | 0 missing keys, every bucket |
| Calibration (run twice) | `tsx src/dev/calibrate.ts quiz` ×2 | identical output both runs (deterministic); real but negligible drift vs `main` (meanSd 12.566→12.596, ~0.24%; largest single-attribute shift ~2.7%) — anchors correctly left unbumped per convention |
| Matching simulation | `tsx src/dev/simulate.ts 10000 quiz` | vs 97 people; max #1 frequency 11.9% (Warren Buffett), down slightly from 12.0%, well under 20% threshold |
| Sensitivity analysis | `tsx src/dev/sensitivity.ts` | 5 seeds, range 10.6%-11.9%, mean 11.2%, no alarm |
| Production build | `next build --webpack` | clean, 194 people×locale pages (97×2) |
| Full Playwright | `playwright test --workers=1` | **310/310** (300 pre-existing + 2 stale roster-count assertions fixed [`miriamMakebaProfileFix.spec.ts`, `peopleDirectory.spec.ts`, both updated 96→97 total / 95→96 default-view] + 5 new for Marcus Aurelius) |
| New e2e coverage | `playwright test e2e/roster12MarcusAurelius.spec.ts` | 5/5 |
| Direct browser inspection | manual dev server, this worktree's own code | portrait + editorial content confirmed rendering correctly, both locales, no console errors, correct directory counts (96 default-visible / 97 internal) |

No `rows`/score/confidence/evidenceType/provenance/lifecycle change on any
previously-committed candidate (scoring-lock integrity: 0 flagged). No
existing live person's data touched.

**Stale roster-count tests updated** (the first full Playwright run
surfaced exactly these 2, both pre-existing hardcoded-total assertions,
not new bugs): `e2e/miriamMakebaProfileFix.spec.ts` (default-view "95
people" → "96 people") and `e2e/peopleDirectory.spec.ts` (Korean
cross-facet filter denominator "전체 96명" → "전체 97명"; the filtered
count itself, 4, is unchanged — Marcus Aurelius does not satisfy that
specific curiosity+collaboration combination). Both re-verified passing
after the fix, then the full suite re-run once more end to end.

## 11. Roster counts, before/after

| Metric | Before | After |
|---|---|---|
| Internal (`SEED_PEOPLE` / `peopleIndex.generated.ts`) | 96 | 97 |
| People Directory default (unfiltered, match-eligible) visible count | 95 | 96 |
| Complete-detail-profile count (real portrait + editorial content) | 96 (95 pre-existing + Miriam Makeba) | 97 |

The one-person gap between internal and default-visible counts is
unchanged and remains Zheng He's pre-existing, intentional exclusion from
the default `matchEligibleOnly` view — not touched by this cycle, and not
forced to match by making him visible.

Remaining gap to 125: **28** (97 → 125).

## 12. Scope discipline

- No previously-committed candidate's score, confidence, evidence,
  provenance, or lifecycle was altered (scoring-lock integrity: 0
  flagged).
- No candidate outside the 15-person frozen batch was scored or promoted.
- No non-allowlisted person entered `roster12.ts` — the generator's own
  fail-closed allowlist logic (`BATCH_12_SLUGS = new Set(["marcus-
  aurelius"])`) makes this structurally enforced, not just asserted.
- Che Guevara's `qa_passed` status was not downgraded despite exclusion
  from this cycle's live promotion.
- roster13 was not started.
