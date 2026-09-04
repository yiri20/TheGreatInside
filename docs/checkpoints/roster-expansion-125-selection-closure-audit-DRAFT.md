# Roster Expansion 125 — FINAL Selection-Closure Audit (DRAFT, unreviewed)

**Status: AUDIT ONLY. No roster/editorial/matching/portrait/monetization
files touched, no candidates scored, nothing committed.** Builds directly on
[`roster-expansion-125-candidate-audit-DRAFT.md`](roster-expansion-125-candidate-audit-DRAFT.md)
— the 70+-person pool is reused, not regenerated.

**Headline finding, ahead of the requested order**: checking
`data-pipeline/candidates/` (167 existing files) against my proposed final
30 — a step the frozen protocol's own §0 already requires before treating
any name as fresh, and one the prior audit skipped — found that **16 of the
30 primary candidates already have a real, completed blind-scoring attempt
on file, and all 16 came back `status: "held"`** (failed `eligibility_v2`'s
confidence/coverage floor). The prior audit's "READY" grades for those 16
were wrong: they were based on "does a biography exist," not on the
rubric's actual documented-behavior bar, which is stricter and has already
been tested against these exact names. This is the dominant fact this
closure audit turned up, and it drives the final verdict in §12.

---

## 1. Southeast Asia taxonomy change scope

Traced the full chain: `Person.regionCode` (`src/core/types.ts:290`) is
typed as plain `string` — **there is no enum/union type to update anywhere**.
The controlled vocabulary is entirely and *only* the set of `region.*`
message keys in `src/core/i18n/en.ts` (11 keys today, lines 800-810), with
`validateCandidates.ts`'s `KNOWN_REGIONS = knownIds("region.")` deriving the
valid-region set live from those same keys at candidate-validation time.
Every other consumer derives from that same source, live, at runtime:

- **Directory filter options** (`src/core/people/explorer.ts:263`):
  `regionCodes: distinctSorted(people.map((p) => p.regionCode))` — built
  from whatever regions actually appear in the live roster, not a fixed
  list. Zero code change needed here.
- **Directory UI** (`app/[locale]/people/PeopleDirectoryClient.tsx:207`):
  renders each option via `t(locale, `region.${r}`)` — reads whatever
  `explorer.ts` handed it. Zero code change needed here.
- **Query/filter serialization**: `regionCodes?: readonly string[]` on the
  filter type (`explorer.ts:100`) and the `intersects(...)` check
  (`explorer.ts:189`) — both generic over `string`, no enum to extend.
- **Generated index** (`personIndex.ts:75,103`, `generatePeopleIndex.ts`):
  `regionCode: string` passed through unchanged. Zero code change needed.
- **Validation guard**: `missingRegionCoverage()`
  (`src/core/people/explorer.ts:340-343`) checks, for every regionCode a
  *live* person actually uses, that both `en["region.<id>"]` and
  `ko["region.<id>"]` exist. Tested in `explorer.test.ts:375-381`
  (`missingRegionCoverage(SEED_PEOPLE)` must be `[]`). **This test does not
  need to change today** — it only fires once a committed person actually
  carries `regionCode: "southeast_asia"`, which is exactly the intended
  trigger.
- **Candidate validation**: `validateCandidates.ts`'s `KNOWN_REGIONS` set —
  derived live from `en.ts`, so adding the key there makes
  `southeast_asia` immediately valid for any `data-pipeline/candidates/*.json`
  file. One stale artifact: its error string is hardcoded as `"not in the
  controlled 11-region vocabulary"` (`validateCandidates.ts`, the `err(...)`
  call in the regionCode check) — this text should be bumped to 12 (or made
  dynamic) in the same change, or it becomes a cosmetically-wrong error
  message the day after a 12th region exists. Not a correctness bug, just a
  stale number worth fixing alongside.

**Minimum safe change scope: exactly 2 lines, in 2 files.**
1. `src/core/i18n/en.ts` — add `"region.southeast_asia": "Southeast Asia"`
   to the `region.*` block (alphabetically, between `"region.south_asia"`
   and `"region.sub_saharan_africa"`).
2. `src/core/i18n/ko.ts` — add the matching Korean key in the same
   position (mirrors the EN block's ordering, per existing convention).

Optional, same-change cleanup: bump the `"11-region"` string in
`validateCandidates.ts`'s error message. No other file needs to change —
not `types.ts`, not `explorer.ts`, not `PeopleDirectoryClient.tsx`, not
`personIndex.ts`, not `generatePeopleIndex.ts`, not any test file — because
the vocabulary was architected as a live derivation from `en.ts` keys, not
a hardcoded enum. This is confirmed additive-safe: `i18n-audit.ts` (the
project's EN/KO parity gate) will simply see one more matched pair; no
existing test asserts an exact count of 11 regions anywhere in the
codebase (checked `explorer.test.ts`, `editorialValidation.test.ts`,
`matching.test.ts` — none hardcode a region count or list).

## 2. General political-candidate admission rule

**Rule**: A political/public figure is judged on the same seven gates as
any other candidate — historical significance, evidence sufficiency,
blind-score feasibility, identity confidence, marginal roster value,
redundancy, and whether the project's *existing* documented-behavior
discipline (`"Biographical accounts describe X"` framing, `dual_edged`/
`risk` impact tags, never inferring criminal intent or diagnosing motive)
can represent their contested conduct without either whitewashing or
overreaching. **Political controversy is not itself a gate and not itself
an exclusion criterion.**

This is not a new principle being invented for this audit — it is already
the roster's revealed practice. Genghis Khan, Julius Caesar, Wu Zetian, and
Mustafa Kemal Atatürk are all *already in the live 95*, and each carries a
documented record that includes mass violence, ruthless court politics, or
disputed nationalist policy. None was excluded for it. The prior audit's
"defer for political sensitivity" language for Ho Chi Minh/Sukarno/Deng/
Che was therefore an inconsistency with this project's own established
norm, not a defensible new standard — this closure audit corrects it.

What the rule does *not* do: it doesn't admit a figure whose *only*
documented behavior of personality-scoring relevance is the contested
conduct itself with no other independently-notable achievement (that's an
evidence/marginal-value failure, not a political one), and it doesn't
lower the evidence bar for a controversial figure relative to anyone else.

## 3. Re-evaluation: Ho Chi Minh / Sukarno / Deng Xiaoping / Che Guevara

| | Significance | Evidence | Identity | Marginal value | Honest-representation feasibility | Redundancy |
|---|---|---|---|---|---|---|
| **Ho Chi Minh** | H | A (own writings/speeches, Duiker's definitive biography) | Unambiguous | H — zero Vietnamese/communist-nationalist figure in roster | Same discipline already used for Wu Zetian/Atatürk applies cleanly; 1950s land-reform-era controversy needs neutral, source-cited framing, not omission | Low |
| **Sukarno** | H | A/B (his own as-told-to autobiography, extensive scholarship) | Unambiguous | H — distinct founding-orator profile vs. Lee Kuan Yew's technocratic-builder profile already in the primary 30 | Feasible — most severe atrocity commonly linked to 1965-66 Indonesia belongs to Suharto's subsequent coup, not Sukarno's own direct actions, which somewhat *simplifies* honest framing relative to some other names here | Low |
| **Deng Xiaoping** | H — arguably the single highest-significance name in the entire 70-person pool by global economic-historical impact | A — Ezra Vogel's ~900-page definitive biography, exceptionally rich primary-source record | Unambiguous | H — no modern Chinese economic-reformer figure in roster at all | Feasible, and unusually *well-supported*: his direct decision-making role in the 1989 Tiananmen crackdown is mainstream-consensus documented (not a thin/disputed-evidence problem the way some ancient/legendary names in this pool are) — the earlier "political sensitivity" deferral was about present-day discomfort with the topic, not about evidence quality, and that is explicitly not a gate | Low |
| **Che Guevara** | H (cultural recognition) but *substantive, personally-attributable state-building achievement is comparatively thin* — economic-ministerial tenure was brief and by most accounts not strong; most of his "significance" is symbolic/theoretical rather than sustained governance | A (his own diaries, Anderson's definitive biography) | Unambiguous | Medium — partial overlap with Toussaint Louverture already in roster (revolutionary military figure), thinner independent achievement than the other three here | **The genuine open issue**: unlike Deng (sovereign-level policy decision, diffuse command responsibility — matches the pattern already established for Genghis Khan/Wu Zetian/Atatürk) or Ho Chi Minh/Sukarno (head-of-state records over decades), Guevara's most personality-central documented behavior is his own stated, unregretted views on revolutionary violence and his personal presiding role over summary tribunals at La Cabaña — a *personal*, not sovereign-office, exercise of lethal authority, a pattern this project has no existing precedent for framing safely | Medium |

**Disposition**:
- **Ho Chi Minh** — does not remain deferred for political reasons. → **Enters the 10 alternates** (see §8). A sourcing/balance writeup (parallel to what Saladin/Ashoka already need) should precede any future scoring, per the standard practice this project already applies to complex figures — not a special political gate.
- **Sukarno** — does not remain deferred for political reasons. → **Enters the 10 alternates.**
- **Deng Xiaoping** — does not remain deferred for political reasons, and on strict merit **challenges and displaces a current primary-30 slot** (see swap 2, §7) — his evidence/significance profile is stronger than several names he'd be replacing.
- **Che Guevara** — **remains deferred, but for a non-political reason**: thinner independently-attributable achievement relative to the other three under this project's own earned-distinction framework, plus a genuinely new (not yet precedented) framing challenge around personally-directed lethal authority rather than sovereign policy. Worth a dedicated future policy discussion, not a permanent block, and explicitly not "deferred because controversial."

## 4. Current-95 vs. proposed-125 domain comparison (mechanical, post-§7 swaps applied)

| Domain | 95 (share) | 125 (share) | Δ share |
|---|---|---|---|
| politics/public leadership | 12 (12.6%) | 22 (17.6%) | +5.0 pts |
| science | 22 (23.2%) | 25 (20.0%) | −3.2 pts |
| social reform | 10 (10.5%) | 13 (10.4%) | ~flat |
| philosophy/religion/intellectual history | 13 (13.7%) | 16 (12.8%) | −0.9 pts |
| literature | 9 (9.5%) | 13 (10.4%) | +0.9 pts |
| music/performance | 6 (6.3%) | 9 (7.2%) | +0.9 pts |
| visual art/design | 8 (8.4%) | 9 (7.2%) | −1.2 pts |
| business/technology | 7 (7.4%) | 8 (6.4%) | −1.0 pts |
| exploration | 2 (2.1%) | 4 (3.2%) | +1.1 pts |
| other (sport, martial arts, film) | 6 (6.3%) | 6 (4.8%) | −1.5 pts |

Region (post-swap), reusing §1's new key:

| Region | 95 (share) | 125 (share) | Δ share |
|---|---|---|---|
| north_america | 25 (26.3%) | 25 (20.0%) | −6.3 pts |
| western_europe | 21 (22.1%) | 24 (19.2%) | −2.9 pts |
| east_asia | 9 (9.5%) | 13 (10.4%) | +0.9 pts |
| south_asia | 7 (7.4%) | 11 (8.8%) | +1.4 pts |
| latin_america | 6 (6.3%) | 10 (8.0%) | +1.7 pts |
| sub_saharan_africa | 5 (5.3%) | 9 (7.2%) | +1.9 pts |
| southern_europe | 8 (8.4%) | 8 (6.4%) | −2.0 pts |
| central_europe | 7 (7.4%) | 7 (5.6%) | −1.8 pts |
| west_asia | 2 (2.1%) | 6 (4.8%) | +2.7 pts |
| north_africa | 3 (3.2%) | 5 (4.0%) | +0.8 pts |
| central_asia | 2 (2.1%) | 4 (3.2%) | +1.1 pts |
| southeast_asia (new) | 0 | 3 (2.4%) | new |

Gender (my own classification, not a stored field, reported not engineered):
32/95 female (33.7%) → 39/125 (31.2%) — **essentially flat, slightly down**.
The two integrity-driven swaps in §7 both replaced a female pick
(Madam C.J. Walker) or a thin-evidence pick with the strongest *available*
untested alternate, and the two strongest available replacements
(Ratan Tata, Deng Xiaoping) are both male. Reported honestly per this
task's own "do not use quotas mechanically" instruction, not corrected by
force.

**Assessment against the A/B/C rubric**: **A — improves both geographic
and domain breadth**, with no new overconcentration. North America and
Western Europe both shrink in share while remaining the two largest
regions (a realistic, not overcorrected, adjustment). Science, the single
most overrepresented current domain, *shrinks* in share even while
growing in absolute count. Politics/public leadership grows the most in
absolute terms (+10) but lands at 17.6% of 125 — smaller than science's own
20.8%(→20.0%) share, so it does not become the new largest-single-domain
concentration; it's a legitimate correction of what was §3's flagged gap in
the prior audit (12/95 was proportionally thin next to science's 22/95),
not an overcorrection into a new problem.

## 5. Any overconcentration found?

**None material.** The closest thing to a concern is politics/public
leadership's +10 additions — the largest single-domain gain in the batch —
but at 17.6% of 125 it remains below science's 20.0% and below the current
roster's own literature+philosophy combined share, so it's a correction of
prior underrepresentation, not a new imbalance. Flagged for awareness in
future batches (a 3rd consecutive expansion batch leaning this hard on
political leaders would start to be a real concern), not for action now.

## 6. Any underrepresented domain still obvious?

**Yes — "other" (sport/martial arts/film) is now the standout gap.** It
was already the roster's thinnest non-exploration domain (6/95, 6.3%), and
this batch's only sport addition (Pelé) had to be dropped for a severe,
real evidence failure (§7) with no clean replacement available in the
current pool — so the domain doesn't just stay flat, its *share* actually
regresses (6.3%→4.8%). This is an honest, disclosed gap: forcing in an
unverified sport name to plug it would repeat the exact mistake this
closure audit just corrected (grading evidence-feasibility by reputation
rather than checking what a real scoring attempt would find). Recommend
this be the explicit target of the *next* candidate-pool pass, with actual
identity-preflight + a trial evidence pass done *before* any pre-screen
grade is assigned to a sport candidate.

Exploration (2→4, 3.2%) and visual art/design (8→9, 7.2%) both remain
thin in absolute terms even after this batch's additions — not urgent, but
worth naming as still-open for a future round.

## 7. Exact recommended swaps (2 of the allowed 3 used)

**Swap 1 — Madam C.J. Walker → Ratan Tata.**
Reason: not a balance call, an integrity one. `data-pipeline/candidates/
madam-cj-walker.json` already exists: `status: "held"`, **only 5 of 34
attributes scored, coverage 0.155 against a 0.6 floor** — a severe, already-
tested shortfall, not a close call. Ratan Tata has no prior file (clean),
is extremely well documented (industrialist, decades of press/interview
record, Tata Trusts philanthropy), and preserves the business/technology
domain slot while adding South Asia region weight instead of further
North-America weight (already the most crowded region). **Verified
`isLiving`/death fact before recommending this swap** — Ratan Tata died
2024-10-09 at 86 (confirmed via Al Jazeera/Gulf News/Cornell obituary), so
he'd be scored `isLiving: false, deathYear: 2024` from the start, the same
correct-from-day-one discipline this project applied after the Yayoi
Kusama correction.

**Swap 2 — Pelé → Deng Xiaoping.**
Reason: also integrity, not balance. `data-pipeline/candidates/pele.json`:
`status: "held"`, **only 3 of 34 attributes scored** — readily available
sourcing for Pelé is overwhelmingly match statistics, not documented
personal behavior, and this rubric's "success ≠ high score" rule can't
responsibly build a profile from that (the file itself compares this to
the identical problem found for Jesse Owens in an earlier batch). Deng
Xiaoping has no prior file, passes every gate in §3 at the top of the
pool, and this swap directly resolves the §3 finding rather than leaving
it as an academic exercise. Cost, disclosed: this trades away the batch's
only "other/sport" addition (see §6) and slightly increases the
politics/public-leadership count (already the batch's largest gain, still
not overconcentrated per §5).

**Swap 3 — not used, deliberately.** No remaining pool member clearly
improves marginal value enough to justify displacing a primary slot; per
this task's own instruction not to churn a good shortlist for cosmetic
balance, the third swap is left unspent rather than forced.

## 8. FINAL primary 30

| # | Person | Region | Domain | Status vs. prior file |
|---|---|---|---|---|
| 1 | José Rizal | Southeast Asia* | Literature/reform | Clean, no prior file |
| 2 | Raden Ajeng Kartini | Southeast Asia* | Social reform | Clean |
| 3 | Lee Kuan Yew | Southeast Asia* | Politics/business | Clean |
| 4 | Saladin | West Asia | Politics/military | **Held** (avgConf 0.505/0.55, 20 rows) — CAUTION |
| 5 | Golda Meir | West Asia | Politics | **Held** (avgConf 0.448, coverage 0.569) — CAUTION |
| 6 | Shirin Ebadi | West Asia | Social reform/law | Clean |
| 7 | Edward Said | West Asia | Philosophy/intellectual history | Clean |
| 8 | Al-Biruni | Central Asia | Science | **Held** (avgConf 0.517/0.55, 21 rows) — CAUTION |
| 9 | Babur | Central Asia | Politics/literature | Clean |
| 10 | Akbar the Great | South Asia | Politics | Clean |
| 11 | Ashoka the Great | South Asia | Politics | Clean |
| 12 | Ravi Shankar | South Asia | Music | Clean |
| 13 | Sun Yat-sen | East Asia | Politics | **Held** (avgConf 0.464, coverage 0.572) — CAUTION |
| 14 | Chien-Shiung Wu | East Asia | Science | **Held** (avgConf 0.465/0.55, 20 rows) — CAUTION |
| 15 | Junko Tabei | East Asia | Exploration | **Held** (avgConf 0.495/0.55, 21 rows) — CAUTION |
| 16 | Deng Xiaoping | East Asia | Politics | Clean *(new, swap 2)* |
| 17 | José Martí | Latin America | Literature/politics | **Held** (avgConf 0.463, coverage 0.539) — CAUTION |
| 18 | Gabriel García Márquez | Latin America | Literature | **Held** (avgConf 0.505/0.55, 20 rows) — CAUTION |
| 19 | Bob Marley | Latin America/Caribbean | Music | Clean |
| 20 | Sebastião Salgado | Latin America | Visual art (photography) | Clean |
| 21 | Kwame Nkrumah | Sub-Saharan Africa | Politics/social reform | **Held** (avgConf 0.503/0.55, 21 rows) — CAUTION |
| 22 | Miriam Makeba | Sub-Saharan Africa | Music/social reform | **Held** (avgConf 0.526/0.55, 20 rows — closest of any held name) — CAUTION |
| 23 | Desmond Tutu | Sub-Saharan Africa | Social reform/religion | **Held** (avgConf 0.495/0.55, 21 rows) — CAUTION |
| 24 | Haile Selassie | Sub-Saharan Africa | Politics | Clean |
| 25 | Naguib Mahfouz | North Africa | Literature | **Held** (avgConf 0.504/0.55, 20 rows) — CAUTION |
| 26 | Ibn Battuta | North Africa | Exploration/literature | **Held** (SS76 confidence-integrity revert) — CAUTION |
| 27 | Baruch Spinoza | Western Europe | Philosophy | Clean |
| 28 | Stephen Hawking | Western Europe | Science | Clean |
| 29 | Simone de Beauvoir | Western Europe | Philosophy/social reform | **Held** (SS76 confidence-integrity revert) — CAUTION |
| 30 | Ratan Tata | South Asia | Business | Clean *(new, swap 1; d. 2024-10-09, verified)* |

*Southeast Asia entries provisional pending the §1 vocabulary addition.

**16 clean / 14 with a prior held file** (all 14 kept in the primary 30
rather than swapped, since — unlike Pelé/Walker — none of their shortfalls
are severe: row counts are 18-21/34 and confidence gaps mostly sit within
0.02-0.10 of the 0.55 floor, exactly the range their own hold-reason text
describes as plausibly closeable with genuinely new primary-source
evidence, not a re-tuning exercise).

## 9. FINAL alternates (10)

1. Ho Chi Minh — passes §3's re-evaluation cleanly, clean file
2. Sukarno — passes §3's re-evaluation cleanly, clean file, strong pairing/contrast with Lee Kuan Yew
3. Chief Joseph — strongest indigenous-North-America evidence case (own recorded speeches), clean
4. Suleiman the Magnificent — clean, strong West Asia depth if a 5th slot opens there
5. Anwar Sadat — **CAUTION: prior file exists, `status: "held"`** (SS76 confidence-integrity revert, same category as Ibn Battuta/de Beauvoir) — usable but not a fresh pick
6. Corazon Aquino — clean, Southeast Asia depth
7. Hannah Arendt — clean, philosophy alternate to Spinoza/de Beauvoir
8. Miguel de Cervantes — clean, literature alternate
9. Norman Borlaug — clean, strong applied-science alternate, held in reserve given swap 3 was left unused
10. Roald Amundsen — **CAUTION: prior file exists, `status: "held"`, only 5/34 rows scored** — same severity class as Pelé/Walker; listed as an alternate only, not promotable without materially new research

## 10. Confirmation: are all 30 blind-score feasible?

**Not unconditionally, and this closure audit's job is to say so plainly
rather than repeat the prior audit's error.**

- **16 of 30 are genuinely untested** — no prior file, presumed feasible
  pending an actual scoring attempt (never previously confirmed, only
  pre-screened).
- **14 of 30 already have a completed, real scoring attempt on file that
  fell short of `eligibility_v2`**. Per this project's own binding
  confidence-change policy, these **cannot simply be re-scored as normal**
  — the existing file's confidence values may not be nudged upward just to
  cross the floor; only `NEW_EVIDENCE`, a corpus-wide `RUBRIC_CORRECTION`,
  or an `ERROR_CORRECTION` justifies a change, and 4 of the 16 (Ibn
  Battuta, Simone de Beauvoir, and alternates-list Anwar Sadat) already
  carry a specific note that they were *previously* over-promoted this
  same way and had to be corrected back down. Treating any of the 16 as
  "ready for blind scoring" without a defined, disclosed deeper
  primary-source research step first would repeat that exact failure
  mode.
- **0 of 30 are severely evidence-deficient** — both severe cases (Pelé,
  Madam C.J. Walker) were swapped out in §7.

## 11. Recommended blind-scoring batch split

Given the finding above, batching now needs to separate "fresh attempt"
from "defined deepening pass required," not just "easy" from "hard":

- **Batch A — fresh, no prior attempt (10)**: Rizal, Kartini, Lee Kuan
  Yew, Shirin Ebadi, Edward Said, Babur, Akbar, Ashoka, Ravi Shankar,
  Deng Xiaoping.
- **Batch B — fresh, no prior attempt (6)**: Bob Marley, Sebastião
  Salgado, Haile Selassie, Stephen Hawking, Baruch Spinoza, Ratan Tata.
- **Batch C — requires a defined, disclosed deeper primary-source pass
  BEFORE scoring, not a routine re-run (14)**: Saladin, Golda Meir,
  Al-Biruni, Sun Yat-sen, Chien-Shiung Wu, Junko Tabei, José Martí,
  García Márquez, Kwame Nkrumah, Miriam Makeba (closest to the floor —
  0.024 short — the best candidate to attempt first in this batch),
  Desmond Tutu, Naguib Mahfouz, Ibn Battuta, Simone de Beauvoir. Each
  needs its specific documented gap (named in §8's table) closed with
  real new sourcing before a fresh `eligibility_v2` run — and that run
  must be the first and only one per the frozen protocol, exactly as if
  it had never been attempted before.

## 12. Final verdict

**SHORTLIST REVISION REQUIRED** — not a rejection of the pool or the
selection work, but an honest correction: 2 of 30 needed a real swap
(executed above, both integrity-driven and both fact-checked for
living/death status before being proposed), and 14 of 30 need a defined,
scoped "close this specific evidence gap" research step *before* they can
honestly be called blind-score-ready — a materially different and more
specific instruction than "proceed with the standard protocol," and one
this project's own confidence-change policy requires. Once that 14-person
deepening pass is scoped and either succeeds or is itself resolved to
`held` again, the FINAL 30 in §8 is otherwise settled and ready. The
Southeast Asia vocabulary fix (§1) remains a two-line prerequisite, and
Deng Xiaoping (§3, §7) and the Ho Chi Minh/Sukarno alternates (§3, §9)
resolve the political-candidate consistency question this audit was
asked to close out.

Nothing above assigns or predicts a trait score for any candidate.
