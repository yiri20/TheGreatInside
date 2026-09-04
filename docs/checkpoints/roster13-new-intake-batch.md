# Roster 13 — new-intake batch (2026-09-04)

Branch: `feat/roster13-new-intake-batch`, worktree
`TheGreatInside-roster13-new-intake-batch`, based on `origin/main` (HEAD at
worktree creation: `b081d99`, the merged roster-12 batch — Marcus Aurelius
live, Che Guevara `qa_passed`/portrait-blocked).

## Why this cycle exists

97 live roster members, target 125, gap 28. No unpromoted `qa_passed`
candidate existed except the already-known, already-documented Che Guevara
portrait blocker. The next expansion therefore again had to begin with new
candidate intake.

## 1. Coverage analysis (mechanical, before any candidate work)

Recomputed from the 97-person live roster: North America 25.8%, Western
Europe 21.6%, East Asia 9.3%, Southern Europe 9.3%, Central Europe 7.2%,
South Asia 7.2%, Latin America 6.2%, Sub-Saharan Africa 6.2%, North Africa
3.1%, West Asia 2.1%, Central Asia 2.1%. Era: 20th century 30.9%, 19th
century 21.6%, contemporary 16.5%, early modern 14.4%, medieval 11.3%,
**ancient 5.2%** (still the most underrepresented era). Same reading as
roster-12: West Asia, Central Asia, North Africa, Sub-Saharan Africa,
Latin America, South Asia all substantially underrepresented; no new
diversity dimension invented beyond the schema's own `regionCode`/`era`.

## 2. Discovery pool (29 people)

Every name checked against the full existing corpus (197 candidate JSON
files + 97 live roster slugs) before inclusion. As with roster-12, nearly
every obvious pick in underrepresented regions was already present as a
genuinely scored `held`/`qa_passed` candidate. Three names from
roster-12's own discovery pool that were listed there but never scored
(Muhammad Ali of Egypt, Muhammad Ali Jinnah) or frozen (Toyotomi
Hideyoshi, Puyi, Lu Xun, Ho Chi Minh) were legitimately still available
this cycle, since "existing candidate JSON" — the actual exclusion
criterion — did not yet exist for them.

Suleiman the Magnificent, David Ben-Gurion, Yasser Arafat, Muhammad Ali
of Egypt, Nawal El Saadawi, Boutros Boutros-Ghali, Habib Bourguiba, Ellen
Johnson Sirleaf, Robert Mugabe, Samora Machel, Eva Perón, Fidel Castro,
Getúlio Vargas, Juan Perón, Muhammad Ali Jinnah, Subhas Chandra Bose,
Sarojini Naidu, Toyotomi Hideyoshi, Puyi, Qiu Jin, Lu Xun, Ho Chi Minh,
Cato the Younger, Cleopatra, Idi Amin, Augusto Pinochet, Mobutu Sese
Seko, Domitila Barrios de Chungara, Corazon Aquino.

## 3. Preflight

| Label | Count | Names |
|---|---|---|
| `STRONG_INTAKE` | 15 | Suleiman the Magnificent, Ben-Gurion, Arafat, Nawal El Saadawi, Ellen Johnson Sirleaf, Robert Mugabe, Fidel Castro, Getúlio Vargas, Juan Perón, Subhas Chandra Bose, Toyotomi Hideyoshi, Puyi, Lu Xun, Ho Chi Minh, Corazon Aquino |
| `PLAUSIBLE_INTAKE` | 11 | Muhammad Ali of Egypt, Boutros Boutros-Ghali, Habib Bourguiba, Samora Machel, Eva Perón, Muhammad Ali Jinnah, Sarojini Naidu, Qiu Jin, Cato the Younger, Augusto Pinochet, Domitila Barrios de Chungara |
| `STRUCTURAL_RISK` | 3 | Cleopatra (surviving accounts are dominated by hostile Augustan-era Roman propaganda, the same evidentiary problem as favorable court panegyric just inverted), Idi Amin (extensive but heavily self-mythologizing public persona makes separating documented fact from theatrical self-presentation genuinely difficult), Mobutu Sese Seko (similar self-mythologizing/personality-cult problem) |
| `REJECT_PRE_SCORE` | 0 | — |

## 4. Frozen intake batch (18, exact order)

Evidence quality first (15 `STRONG_INTAKE` filled most of the batch), then
region/era coverage as tiebreaker for the remaining 3 slots (Muhammad Ali
of Egypt: North Africa/19th century; Muhammad Ali Jinnah: South Asia;
Cato the Younger: Ancient, the roster's thinnest era):

Suleiman the Magnificent, David Ben-Gurion, Yasser Arafat, Nawal El
Saadawi, Muhammad Ali of Egypt, Ellen Johnson Sirleaf, Robert Mugabe,
Fidel Castro, Getúlio Vargas, Juan Perón, Subhas Chandra Bose, Muhammad
Ali Jinnah, Toyotomi Hideyoshi, Puyi, Lu Xun, Ho Chi Minh, Corazon
Aquino, Cato the Younger.

Frozen; not altered after freezing.

## 5. Evidence packs and first scoring

Each received a full `candidate_v1` JSON with 17-20 scored attributes,
genuine multi-source citation, and honest confidence per
`docs/scoring-rubric-v1.md`. Genuine documented complexity was kept
rather than smoothed away: Robert Mugabe's liberation-hero-to-authoritarian
reversal, Puyi's Manchukuo complicity (with several traits — leadership_drive,
social_assertiveness, achievement_drive — scored honestly LOW rather than
inferred from his imperial titles, per the rubric's explicit rule against
occupational-stereotype scoring), Cato the Younger's documented rigidity
(adaptability scored low, matching Cicero's own contemporary criticism),
Muhammad Ali of Egypt's 1811 Massacre of the Mamluks, Getúlio Vargas's
1937 self-coup and 1954 death (stated only as the undisputed fact that it
was, no cause asserted), Subhas Chandra Bose's Axis alliance, Corazon
Aquino's and Robert Mugabe's/Puyi's honestly modest achievement_drive/
leadership_drive scores where the record shows circumstance-driven rather
than power-seeking behavior.

`corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts`:
**0 errors, 0 warnings** across all 18 on first run.

## 6. Eligibility gate — the honest result

Every one of the 18 was first-scored to completion, then validated
**once**. No row was edited after seeing its eligibility result.

| Candidate | scored | avgConf | coverage | eligible |
|---|---|---|---|---|
| Fidel Castro | 20 | 0.564 | 0.599 | false |
| Suleiman the Magnificent | 19 | 0.527 | 0.568 | false |
| Ho Chi Minh | 18 | 0.546 | 0.549 | false |
| Nawal El Saadawi | 18 | 0.568 | 0.545 | false |
| Puyi | 18 | 0.477 | 0.545 | false |
| Lu Xun | 18 | 0.532 | 0.546 | false |
| David Ben-Gurion | 18 | 0.548 | 0.542 | false |
| Cato the Younger | 18 | 0.518 | 0.543 | false |
| Muhammad Ali of Egypt | 18 | 0.527 | 0.540 | false |
| Corazon Aquino | 18 | 0.522 | 0.539 | false |
| Getúlio Vargas | 18 | 0.500 | 0.536 | false |
| Yasser Arafat | 18 | 0.526 | 0.533 | false |
| Subhas Chandra Bose | 18 | 0.560 | 0.533 | false |
| Muhammad Ali Jinnah | 18 | 0.539 | 0.533 | false |
| Toyotomi Hideyoshi | 18 | 0.547 | 0.530 | false |
| Ellen Johnson Sirleaf | 18 | 0.517 | 0.531 | false |
| Robert Mugabe | 17 | 0.524 | 0.505 | false |
| Juan Perón | 17 | 0.514 | 0.505 | false |

**0 of 18 cleared `eligibility_v2`.** Every candidate missed on the
weighted-taxonomy `coverage` floor (0.6) specifically — Fidel Castro came
within 0.001 of clearing it (0.599). Robert Mugabe and Juan Perón also
came in at 17 scored attributes rather than the intended 18: a genuine
drafting miscount discovered only after the validator run (both were
planned as 18-row evidence packs but one row was not written into the
final JSON). Per the confidence-change policy and this cycle's explicit
instruction not to adjust scores after seeing the validator result, this
was **not corrected** — disclosed honestly here instead. Correcting it
would not have changed either candidate's outcome regardless: both sit
at coverage 0.505, far short of the 0.6 floor, so no lifecycle result
depends on the miscount. All 18 are `held` with a `holdReason` citing
these exact numbers; none were padded or re-scored after the result.

## 7. Che Guevara — bounded portrait-only retry

Per instruction, no new research or rescoring was performed on Che
Guevara himself; only a narrow, bounded check for a rights-clear
portrait not already investigated in the roster-12 cycle.

Checked one new lead: a 26 July 1964 photo (Vilma Espín, Raúl Castro,
and Che Guevara) attributed to Mexican photojournalist Rodrigo Moya,
tagged "PD-Cuba" on Commons. Rejected: the file's own page flags that
"the state of Cuba may decide to transfer to itself the copyright" on
expired-term works — an explicit, acknowledged uncertainty — and the
underlying rationale is questionable on its own terms, since Rodrigo
Moya is a Mexican national and Cuban copyright-term law would not
straightforwardly govern his authorship rights in the first place. Also
re-confirmed a separately-surfaced 1964 UN General Assembly photo is
attributed to release "by a webmaster" — the same category of
illegitimate rights claim (an uploader/host with no actual copyright
interest purporting to release someone else's work) already rejected in
the roster-12 cycle for a different file.

**Result: portrait blocker not cleared.** Che Guevara remains `qa_passed`,
excluded from production, with the pre-existing blocker preserved
unchanged from the roster-12 checkpoint. No further search was performed
this cycle, per instruction.

## 8. Promotion sub-batch

**Empty.** Zero of the 18 new candidates reached `qa_passed`. Che
Guevara's portrait blocker was not cleared. No candidate was promoted
this cycle. No `roster13.ts` or `generateRoster13.ts` was created, per
the task's own conditional instruction ("if there is at least one
product-ready promotee, create...") — there being none, nothing was
wired into `seed.ts`, no people index or dispersion regeneration was
needed, no portrait/editorial work was performed, and no new e2e
coverage was added, since none of that infrastructure has anything to
attach to this cycle.

## 9. Roster counts

| Metric | Before this cycle | After this cycle |
|---|---|---|
| Internal (`SEED_PEOPLE` / `peopleIndex.generated.ts`) | 97 | 97 (unchanged) |
| People Directory default (unfiltered, match-eligible) visible count | 96 | 96 (unchanged) |

Remaining gap to 125: **28** (unchanged).

## 10. Validation

Since this cycle touches only `data-pipeline/candidates/*.json` files —
never imported by the production app, only by the offline pipeline
scripts already run below — the production-behavior checks (build,
Playwright, calibration, matching simulation, sensitivity analysis) are
provably unaffected and were not re-run, per the instruction not to
repeatedly run checks a change cannot affect.

| Check | Command | Result |
|---|---|---|
| Candidate validator | `tsx src/dev/roster1000/validateCandidates.ts` | 0 errors, 0 warnings; `held` 152 (134+18) / `qa_passed` 63 (unchanged) |
| Scoring-lock integrity | `tsx src/dev/roster1000/checkScoringLockIntegrity.ts` | 0 flagged (197 previously-committed files checked — no prior candidate touched) |
| Typecheck | `tsc --noEmit` | clean |
| Full unit/integration | `vitest run` | 689/689 (unchanged — no test-relevant file touched) |
| Duplicate/identity check | via candidate validator's `runRosterQualityGates` pass (invoked internally) | 0 duplicate slugs, ids, or Wikidata QIDs among the 18 new candidates or against the existing 197-file corpus |
| Production build / Playwright / calibration / simulation / sensitivity | — | not re-run; no production code path changed this cycle (only new, not-yet-promoted candidate JSON files) |

No `rows`/score/confidence/evidenceType/provenance/lifecycle change on
any previously-committed candidate. No existing live person's data
touched. No roster/index/dispersion file touched.

## 11. Scope discipline

- No previously-committed candidate's score, confidence, evidence,
  provenance, or lifecycle was altered (scoring-lock integrity: 0
  flagged).
- No candidate outside the 18-person frozen batch was scored.
- Che Guevara was not rescored or re-researched — only a bounded
  portrait check was performed, and it did not touch his candidate JSON.
- No candidate was promoted; roster13 was not created since there was
  nothing product-ready to allowlist.
- roster14 was not started.
