# Current state

**Authority for volatile facts below**: where a live tool/audit exists, it
is the source of truth, not this file's cached number. Re-run the tool if
the task depends on an exact current figure.

Last updated: 2026-09-05 (PR #9 merged and production-verified:
`feat/roster16-final-intake` merged to `main` — merge commit
`7a6e306e6ce0f3bed43eecaceb1856b0004d43d8`, first-parent diff mechanically
confirmed to exactly match the reviewed 36-file PR scope, no extra file
entered `main`. Production deployment succeeded on Vercel. Live-verified
on thegreatinside.com: People Directory shows "124 people"; internal
`peopleIndex`/`SEED_PEOPLE` count is 125 (0 duplicate ids/slugs/Wikidata
QIDs); all 9 roster-16 promotees (Duke Ellington, Martha Graham, Bertrand
Russell, Charles Dickens, George Orwell, T. E. Lawrence, Elizabeth Cady
Stanton, John D. Rockefeller, Bette Davis) render correctly in both EN and
KO with working portraits (all HTTP 200) and full editorial content;
Nellie Bly, Carl Jung, Katharine Hepburn, and Che Guevara all correctly
404 in production (none promoted); Miriam Makeba, Marcus Aurelius,
Abraham Lincoln, and Ruth Bader Ginsburg spot-checked with no regression;
Zheng He's default-directory exclusion is unchanged. **`ROSTER_125_TARGET_REACHED`,
production-verified — target 125, gap 0.** While closing this out, also
mechanically corrected a merge-commit misidentification from an earlier
report: PR #8's actual merge commit is `33654c3876a2857836c4af9754938d17b1c1b83c`
(two parents: `1decf00` and `c55cb57`) — `c55cb57` is
`feat/roster15-coverage-aware-intake`'s own head/feature commit, not a
merge commit; both this file's Product section and its roster-15/16
per-cycle bullets below are corrected accordingly (docs-only fix, no
candidate or roster data touched). Full record:
[`roster16-final-intake.md`](../checkpoints/roster16-final-intake.md).
Prior update, 2026-09-05 (roster-16 final intake,
`feat/roster16-final-intake`: refined the coverage-aware preflight with a
depth question (>=12 attributes plausibly supportable near the
high-confidence threshold via genuinely repeated/independent/multi-source
corroboration, not just broad topic coverage), because roster-15's four
misses all had adequate breadth but insufficient high-confidence-row
count. Built a fresh 27-person discovery pool (9 carried forward from
roster-15's own leftover, never-scored pool; 3 genuinely new), froze 12,
scored every candidate to 22-23 attributes. **11 of 12 crossed
`eligibility_v2` honestly** — Duke Ellington, Martha Graham, Bertrand
Russell, Charles Dickens, George Orwell, T. E. Lawrence, Elizabeth Cady
Stanton, John D. Rockefeller, Katharine Hepburn, Bette Davis, Nellie Bly,
Carl Jung — 91.7% pass rate, matching roster-14 and exceeding roster-15's
66.7%. Only 9 production slots remained before the 125 target, so the
**first 9 `qa_passed` by frozen intake order were promoted** via
`generateRoster16.ts` into `roster16.ts` (Duke Ellington, Martha Graham,
Bertrand Russell, Charles Dickens, George Orwell, T. E. Lawrence,
Elizabeth Cady Stanton, John D. Rockefeller, Bette Davis) — all fully
product-complete from first promotion (real Public Domain/CC0/CC BY 4.0
portraits verified live against Wikimedia Commons/Library of Congress/
Rijksmuseum/DPLA license metadata, full EN/KO editorial content, Korean
display names). **Nellie Bly and Carl Jung remain `qa_passed` but
target-cap-deferred** (not held, not portrait-blocked — deferred solely
because the target was reached before reaching them in frozen order).
**Katharine Hepburn** (22 attributes, coverage 0.642, 14 high-confidence
rows — clearing the depth-count gate comfortably) is `held`: her
high-confidence *average* (0.54) fell just under the 0.55 threshold, a
genuinely different miss pattern than any prior cycle. 116->125 people,
115->124 match-eligible. **Target: 125. Gap: 0.
`ROSTER_125_TARGET_REACHED`.** One mechanical test-threshold fix (not a
score/calibration change): `greatness.test.ts`'s `independent_creator`/
`leadership_drive` archetype-centroid guard raised from 60 to 65 after
Charles Dickens's real, honestly-scored `leadership_drive` row (68,
confidence 0.5) shifted the shrinkage-blended centroid to 60.25. No
previously-committed candidate's score/confidence/evidence/lifecycle
altered (scoring-lock integrity: 0 flagged). Full record:
[`roster16-final-intake.md`](../checkpoints/roster16-final-intake.md).
Prior update, 2026-09-05 (roster-15 coverage-aware intake,
`feat/roster15-coverage-aware-intake`: used roster-14's coverage-aware
preflight as the standing method (unchanged: ≥21-22-attribute-capable
evidence required before freezing, no `baseWeight`-driven attribute
selection, no post-validator rescue). Built a fresh 34-person discovery
pool (19 carried forward from roster-14's own preflighted-but-never-scored
pool, 15 genuinely new), froze 12, scored every candidate to 22
attributes. **8 of 12 crossed `eligibility_v2` honestly** — Catherine the
Great, Frederick the Great, James Joyce, Marlene Dietrich, Maya Angelou,
Miles Davis, Nina Simone, Ruth Bader Ginsburg — promoted via
`generateRoster15.ts` into `roster15.ts`, all fully product-complete from
first promotion (real Public Domain/CC0 portraits — 4 of the 8 are
recent-enough deaths, Angelou/Davis/Simone/Dietrich, where portrait rights
were resolved via U.S. federal government works and Dutch Nationaal
Archief/Anefo CC0 photographs — full EN/KO editorial content, Korean
display names). Agatha Christie, Thomas Jefferson, Ulysses S. Grant, and
Henry Ford (all 22 scored attributes, all coverage ≥0.648) missed solely
on the high-confidence-count gate and remain `held` — the attribute-count
preflight was 100% accurate again (12/12 frozen candidates reached the
predicted ≥22), the miss pattern is purely a confidence-distribution
question the preflight doesn't target. 108→116 people, 107→115
match-eligible, gap to 125 now 9. Three objectively-stale hardcoded
roster-count Playwright fixtures updated (108→116/5→5 filtered,
107→115 unfiltered ×2) — mechanical count corrections only. No
previously-committed candidate's score, confidence, evidence, or
lifecycle altered (scoring-lock integrity: 0 flagged). Full record:
[`roster15-coverage-aware-intake.md`](../checkpoints/roster15-coverage-aware-intake.md).
Prior update, 2026-09-05 (PR #6 and PR #7 merged to `main` — see the
Branches section below for both merge commits; roster-14's branch
description below is retained for its own historical detail but the
branch itself is no longer unmerged as of this update). Prior update,
2026-09-05 (roster-14 coverage-aware intake,
`feat/roster14-coverage-aware-intake`: applied the roster-12/13 coverage
postmortem's finding directly — raised the pre-freeze evidence-depth target
to ≥21-22-attribute-capable, built a fresh 33-person discovery pool, froze
12 (down from roster-12/13's 15-18), and scored every frozen candidate to
22-23 attributes before running `eligibility_v2` once. **11 of 12 crossed
eligibility_v2 honestly** — Abraham Lincoln, Theodore Roosevelt, Alexander
Hamilton, Mark Twain, Ernest Hemingway, Elizabeth I, Otto von Bismarck, Leo
Tolstoy, Sigmund Freud, Pablo Picasso, Gertrude Bell — a sharp reversal from
roster-12/13's combined 2 of 33, confirming the postmortem's mathematical
prediction (n=22 scored attributes essentially guarantees the 0.6 coverage
floor) in practice. Queen Victoria (22 attributes, coverage 0.655) is the
sole miss, short only on the high-confidence-count gate (4 of 22 at
confidence ≥0.5, need 12) — remains `held`, untouched. All 11 promoted are
fully product-complete from first promotion: real rights-clear Public
Domain portraits (verified live against Wikimedia Commons license
metadata — 2 are `historical_depiction`, Alexander Hamilton's 1805
posthumous Trumbull painting and Elizabeth I's c.1600 copy-of-a-lost-
original; the other 9 are lifetime photographs), full EN/KO editorial
content, Korean display names. Roster: 97→108 people, 96→107
match-eligible; gap to 125 now 17. Two objectively-stale hardcoded
roster-count Playwright fixtures updated (97→108/4→5 filtered,
96→107 unfiltered ×2) — mechanical count corrections, no calibration/
matching/scoring code touched. No previously-committed candidate's score,
confidence, evidence, or lifecycle altered (scoring-lock integrity: 0
flagged). Full record: [`roster14-coverage-aware-intake.md`](../checkpoints/roster14-coverage-aware-intake.md).
Prior update, 2026-09-05 (roster-12/13 coverage-bottleneck postmortem,
analysis-only, no candidate changed: a mechanical review of all 33
roster-12+13 first-scored candidates found `eligibility_v2`'s weighted
`coverage` floor (0.6) is mathematically unreachable at 18-19 scored
attributes regardless of evidence quality — confirmed no implementation
bug, independently recomputed coverage from `ATTRIBUTES[*].baseWeight`
and matched the validator's own output in all 33 cases. Every held
candidate in both cycles scored 17-20 attributes; none were rejected for
narrow or weak evidence. Roster-14's preflight must target ≥21-attribute-
capable evidence before freezing and use a smaller batch (10-14). Full
record: [`roster12-13-coverage-postmortem.md`](../checkpoints/roster12-13-coverage-postmortem.md).
Prior update, 2026-09-04 (roster-13 new-intake batch,
`feat/roster13-new-intake-batch`, merged to `main` as `023df19`: built a
fresh 29-person discovery
pool, froze 18 for full evidence packs and first scoring. **0 of 18
crossed `eligibility_v2`** — every one missed solely on the weighted
coverage floor (0.6), Fidel Castro closest at 0.599. All 18 are `held`
with exact numbers recorded. A bounded, single-check portrait retry for
Che Guevara found no rights-clear alternative (a newly-checked 1964
photo carries an explicit, self-acknowledged Cuban-state-copyright-
transfer risk and a questionable rationale for a non-Cuban photographer;
another lead was released only "by a webmaster" with no actual rights to
grant) — his portrait blocker from roster-12 stands unchanged. No
candidate promoted this cycle; no `roster13.ts` created. Roster counts
unchanged: 97 people, 96 match-eligible, gap to 125 still 28. No
previously-committed candidate's score/confidence/evidence/lifecycle
altered (scoring-lock integrity: 0 flagged). Full record:
[`roster13-new-intake-batch.md`](../checkpoints/roster13-new-intake-batch.md).
Prior update, 2026-09-04 (roster-12 new-intake batch,
`feat/roster12-new-intake-batch`, now merged to `main`: with zero
unpromoted `qa_passed` candidates left after Miriam Makeba, built a fresh
27-person discovery pool, froze 15 for full evidence packs and first
scoring. 2 crossed `eligibility_v2` honestly: Marcus Aurelius (promoted,
with a real CC BY 2.5 Louvre-bust portrait and full EN/KO editorial
content from first promotion — 96->97 people, 95->96 match-eligible) and
Che Guevara (NOT promoted — no rights-clear, non-AI-generated portrait
could be sourced that cycle; his `qa_passed` candidate JSON left
untouched). The other 13 frozen candidates remain `held` — real evidence
packs, genuine first scores, all missed only on `eligibility_v2`'s
weighted coverage floor, not attribute count or confidence. No
previously-committed candidate's score, confidence, evidence, or
lifecycle was altered (scoring-lock integrity: 0 flagged). Full record:
[`roster12-new-intake-batch.md`](../checkpoints/roster12-new-intake-batch.md).
Prior update, 2026-09-04 (corrective fix, `fix/miriam-makeba-complete-profile`:
the prior Miriam Makeba promotion was declared production-complete from
data-layer checks alone and was incomplete in the actual product — no
portrait, no editorial content, and an unverified user-visible-count
claim. Corrected: added a CC0-licensed portrait (Rob Mieremet/Anefo,
1969, Nationaal Archief — `roster11.ts`) and editorial content (2
achievements, 2 moments, 1 turning point, 2 interpretations, EN+KO) using
only her already-approved candidate evidence, no new research. Verified
live in-browser (not just data-layer): portrait renders on both her
PersonCard and detail hero, editorial sections render in both locales
with no raw i18n keys. Count semantics clarified: 96 total roster
(`SEED_PEOPLE`/`peopleIndex.generated.ts`) vs the People Directory's
default unfiltered view, which shows 95 — `filterPeople()`
(`src/core/people/explorer.ts`) defaults `matchEligibleOnly` to true,
which has always excluded Zheng He; both counts are correct and measure
different things, this fix did not change either filtering rule. Full
record: [`roster11-miriam-makeba-profile-fix.md`](../checkpoints/roster11-miriam-makeba-profile-fix.md).
Prior update, 2026-08-30 (Remaining-19 Editorial Completion merged to
`main`, fast-forward `9828fdd` → `37bfc23`, pushed and live in
production. **Editorial coverage is now 95/95, COMPLETE** — every
roster person has content; Tier A 8/8, Tier B 52/52, Tier C 35/35
(was 76/95 before this program). Bundled in the same lineage: Yayoi
Kusama's roster data corrected — `isLiving: false`, `deathYear: 2026`
(died 2026-08-14, independently confirmed via CNN/NPR/Washington
Post/ABC News/her official site) — a factual fix, not editorial
content. Full detail: [`docs/checkpoints/editorial.md`](../checkpoints/editorial.md).
No `rows`/matching/scoring changes, no portrait changes, no
monetization changes — portrait completion remains its own,
separately-tracked acquisition program (see Portrait delivery below,
unchanged by this merge: still 89 local / 0 remote / 6 no-portrait).
Prior update, 2026-08-28 (Portrait Completion: Final Free-Source
Recovery — Muhammad Ali merged to `main`, fast-forward `5af8e81` →
`d1b5652`. Muhammad Ali: a 1967 bust portrait by Ira Rosenberg, Library
of Congress New York World-Telegram & Sun Collection (digital IDs
LC-DIG-ds-13998 / cph.3c15435), the same pre-1968 work-for-hire rights
basis already used for Martin Luther King Jr. and Malcolm X, verified
at item level against both the Commons file page and the LOC catalog
record rather than inferred from a different NYWTS photo being clean
elsewhere. Resized to 1600px longest side (native 2932×3669),
recompressed, no crop needed — already a solo bust portrait with a
clean background. Portrait delivery: **89 local / 0 remote / 6
no-portrait** (Bruce Lee, Coco Chanel, Fela Kuti, Rumi, Umm Kulthum,
Zheng He remain)).

## Branches

| Branch | Status |
|---|---|
| `main` | **Production.** Deployed to `https://thegreatinside.com`. HEAD `7a6e306` — merge commit for PR #9 (`feat/roster16-final-intake`, 2026-09-05), the roster-16 final coverage-and-confidence-aware intake batch (9 people: Duke Ellington, Martha Graham, Bertrand Russell, Charles Dickens, George Orwell, T. E. Lawrence, Elizabeth Cady Stanton, John D. Rockefeller, Bette Davis) — internal roster reached exactly 125, `ROSTER_125_TARGET_REACHED`, production-verified live post-deploy (all 9 promotees render correctly EN/KO with working portraits and editorial content; Nellie Bly, Carl Jung, Katharine Hepburn, and Che Guevara all correctly absent/404; Miriam Makeba, Marcus Aurelius, Abraham Lincoln, Ruth Bader Ginsburg, and Zheng He's default-exclusion all verified unregressed) — see this file's own top "Last updated"/"Prior update" history and `docs/checkpoints/roster16-final-intake.md` for full detail; not repeated here. Prior HEAD `33654c3` — merge commit for PR #8 (`feat/roster15-coverage-aware-intake`, 2026-09-05; note: `c55cb57` is that branch's own head/feature commit, not the merge commit — a prior report conflated the two, corrected here), the roster-15 coverage-aware intake batch (8 people: Catherine the Great, Frederick the Great, James Joyce, Marlene Dietrich, Maya Angelou, Miles Davis, Nina Simone, Ruth Bader Ginsburg) — see `docs/checkpoints/roster15-coverage-aware-intake.md`. Prior HEAD `1decf00` — merge commit for PR #7 (`feat/roster14-coverage-aware-intake`, 2026-09-05), the roster-14 coverage-aware intake batch (11 people: Abraham Lincoln, Theodore Roosevelt, Alexander Hamilton, Mark Twain, Ernest Hemingway, Elizabeth I, Otto von Bismarck, Leo Tolstoy, Sigmund Freud, Pablo Picasso, Gertrude Bell) — see this file's own top "Last updated"/"Prior update" history and `docs/checkpoints/roster14-coverage-aware-intake.md` for full detail; not repeated here. Prior HEAD `8612e4c` — merge commit for PR #6 (`docs/roster12-13-coverage-postmortem`, 2026-09-05), the roster-12/13 coverage-bottleneck postmortem (analysis-only, no candidate changed) — see `docs/checkpoints/roster12-13-coverage-postmortem.md`. Prior HEAD `88897df` — fast-forward merge of `feat/life-arc-backfill-batch-5` (2026-08-31/09-01), Life Arc Backfill Batch 5 (4 commits preserved unsquashed: `a07caaa` implementation — Ludwig Wittgenstein, Nicolaus Copernicus, Wu Zetian, Averroes, C. V. Raman, Franz Kafka, Katherine Johnson, Maimonides, Mary Wollstonecraft, Michelangelo, Octavia Butler; `619bb19` e2e fixture fix; `6491ce1` CURRENT_STATE update; `88897df` QA-driven wording fixes). Life Arc coverage 73/95 → 84/95. This row previously described Batch 5 as unmerged on its own branch and cited a stale HEAD (`1a8259f`) — corrected here per the repo-state-is-authoritative rule (CLAUDE.md invariant 8): the merge had already happened before this correction, the row simply hadn't been updated to say so. Full detail for that release: that branch's own commits. Prior HEAD `1a8259f` — fast-forward merge of `feat/life-arc-backfill-batch-4` (2026-08-30/31), Life Arc Backfill Batch 4 (3 commits preserved unsquashed: `5950da9` implementation — Niels Bohr, Rachel Carson, Simón Bolívar, Sojourner Truth, Sor Juana Inés de la Cruz, Toussaint Louverture, Wole Soyinka, Aristotle, B. R. Ambedkar, Sequoyah, Elizabeth Blackwell, Harriet Tubman; `e0363f6` e2e fixture fix; `1a8259f` CURRENT_STATE update). Life Arc coverage 61/95 → 73/95. This row previously described Batch 4 as unmerged on its own branch and cited a stale HEAD (`37bfc23`) — corrected here per the repo-state-is-authoritative rule (CLAUDE.md invariant 8): the merge had already happened before this correction, the row simply hadn't been updated to say so. Full detail for that release: `docs/context/CURRENT_STATE.md`'s own Product section below and that branch's own commits. Prior HEAD `37bfc23` — fast-forward merge of `integration/editorial-remaining-19` (2026-08-30), Remaining-19 Editorial Completion (5 commits preserved unsquashed: `c1ed67c` Kusama factual correction, `194d6f3` Batch 1 (10 people), `fdae862` Kusama stale-comment cleanup, `cafebd4` Batch 2 (9 people), `37bfc23` closure provenance fix). Editorial coverage 95/95 COMPLETE (Tier A 8/8, Tier B 52/52, Tier C 35/35), 100% Korean coverage. Full detail: `docs/checkpoints/editorial.md`. No `rows`/matching/portrait/monetization changes. Production verified live post-deploy: a newly-completed modern profile (Steve Jobs) and premodern profile (Genghis Khan, including its Complexities section) both render correctly, a Korean profile (Rumi) renders correctly, Yayoi Kusama's lifespan displays `1929–2026`, Directory/Quiz routes load, a previously-editorialized profile (Leonardo da Vinci) still renders normally, zero console errors on every checked page. Prior HEAD `d1b5652` — fast-forward merge of `feat/portrait-muhammad-ali-nywts-1967` (2026-08-28), Portrait Completion: Final Free-Source Recovery — Muhammad Ali. A 1967 bust portrait by Ira Rosenberg, New York World-Telegram & Sun Newspaper Photograph Collection, Library of Congress (digital IDs LC-DIG-ds-13998 / cph.3c15435), verified at item level — not inferred from a different NYWTS photo being clean elsewhere — against both the Commons file page and the LOC catalog record: a pre-1968 staff work-for-hire whose reproduction rights were transferred to the Library of Congress via the collection's Instrument of Gift, the same rights basis already used for Martin Luther King Jr. and Malcolm X earlier in this program. LOC's own rights advisory ("No known copyright restriction") is preserved verbatim rather than strengthened. Resized to 1600px longest side (native 2932×3669), recompressed, no crop needed — already a solo bust portrait with a clean background; served at 1279×1600. Bruce Lee remains HOLD / FREE PATH EXHAUSTED, not touched in this release. Local validation gate: `tsc --noEmit` clean, `vitest run` 670/670, `next build --webpack` clean (confirmed via the Playwright harness's own build-then-serve step after standalone builds intermittently crashed on this machine from worker-process memory contention — an environment constraint, not a code issue; Vercel's own production build succeeded independently, confirmed by the live deployment), `peopleDirectory.spec.ts`/`person.visual.spec.ts`/`compare.visual.spec.ts` 109/109 (full 286-spec Playwright suite not re-run this release). Live production verification (EN ~1280px, KO, ~390px mobile, Directory/PersonCard): correct local portrait `src`, approved uncropped framing, face sharp, attribution/license correct, zero console errors, zero horizontal overflow, zero external portrait dependency; a fresh roster-wide live sweep of all 95 production person pages confirmed **89 local / 0 remote / 6 no-portrait**, all 89 declared local portrait URLs returning HTTP 200. **Portrait delivery: 89 local / 0 remote / 6 no-portrait**, coverage 88/95 → 89/95 (93.7%). Prior HEAD `e5b3b1e` — fast-forward merge of `feat/portrait-phase2d2-ibn-khaldun` (2026-08-28), Portrait Completion Phase 2D-2 — the first production `editorial_nonlikeness` person. Ibn Khaldun: folio 7a from a lifetime manuscript of his own al-Muqaddima — MS Atıf Efendi 1936, Süleymaniye Library, Istanbul — whose own on-page annotation identifies the boxed inscription as being in his handwriting; deliberately **not** upgraded to an unconditional autograph claim, since Rosenthal's scholarly account places this manuscript's confirmed authorial subscription elsewhere in the codex, a discrepancy this program could not independently reconcile with fol. 7a specifically. Every widely-circulated "portrait" of him (stock-image bust, the Tunisian banknote engraving, the Tunis monument) traces to a modern invented face with no historical source; the specific Commons file once titled "Ibn Khaldun.jpg" was deleted twice (2007, 2017) as a copyright violation. Sourced from Wikimedia Commons (Public Domain, faithful reproduction, already in use on English and Arabic Wikipedia), resized to 1600px longest side (native 1788×1282), recompressed, no upscale, no crop — the boxed inscription and its adjacent attribution annotation both stay in frame. First live exercise of the Phase 2D-1 `PortraitCredit` UI treatment: "Editorial visual · Not a likeness" / "편집용 이미지 · 실제 초상 아님" renders above the caption on his page only; verified live that Genghis Khan, Joan of Arc (`historical_depiction`), and Leonardo da Vinci (unclassified) show no label, and that his PersonCard carries no separate badge. One Playwright fixture migrated (`e2e/results.visual.spec.ts`): the "closest match has no portrait" test depended on Ibn Khaldun being portrait-less via `FIXTURES.neutral`; replaced with a new token (deterministic random search over `scoreQuiz`/`buildResultSet`, not handcrafted) whose closest match is Coco Chanel, the same no-portrait-fixture migration pattern used when Socrates gained a portrait. Full validation gate: `tsc` clean, `vitest` **670/670** (669 + 1 new), `next build --webpack` clean, `peopleDirectory.spec.ts`/`person.visual.spec.ts`/`compare.visual.spec.ts` 109/109, full Playwright **286/286** at `--workers=1`, plus a fresh roster-wide live sweep of all 95 production person pages (0 broken, 0 external/non-local portrait `src`). **Portrait delivery: 88 local / 0 remote / 7 no-portrait**, coverage 87/95 → 88/95 (92.6%). Prior HEAD `23b0f46` — fast-forward merge of `feat/portrait-editorial-nonlikeness-ui-2d1` (2026-08-28), Portrait Completion Phase 2D-1 Part 1. Adds `PortraitCredit` (`src/ui/components/portraitCredit.tsx`), which shows one standalone line — EN "Editorial visual · Not a likeness", KO "편집용 이미지 · 실제 초상 아님" — above the existing attribution/license caption on the Person detail page, only when `portrait.kind === "editorial_nonlikeness"`; `historical_depiction` and unclassified portraits render unchanged. Server-side only (reads the full `Person.portrait` the page already has, per `PersonPortrait.kind`'s doc comment in `core/types.ts`); no change to `peopleIndex.generated.ts`, `IdentityHero`'s API, `PersonCard`, or Directory/Similar-People/Results/Compare rendering. No Ibn Khaldun (or any) visual was added — no production person carries this `kind` yet, so this is deliberately a zero-visible-change release; tests use a fabricated `PersonPortrait` fixture (`src/ui/ui.test.ts`), not a real person's provenance. Full validation gate: `tsc` clean, `vitest` **669/669** (663 + 6 new), `next build --webpack` clean, `peopleDirectory.spec.ts`/`person.visual.spec.ts`/`compare.visual.spec.ts` 104/104, full Playwright **281/281** at `--workers=1`. Live production smoke (Genghis Khan and Joan of Arc, both `historical_depiction`; Leonardo da Vinci, unclassified; EN + KO): no label rendered anywhere, captions unchanged, zero console errors, zero horizontal overflow. Portrait delivery unchanged: **87 local / 0 remote / 8 no-portrait**. Prior HEAD `6de9c9c` — fast-forward merge of `feat/portrait-phase2c4-joan-of-arc` (2026-08-28), Portrait Completion Phase 2C-4. Joan of Arc: a miniature from *Les Vigiles du roi Charles VII* (Martial d'Auvergne, c.1484, Bibliothèque nationale de France, Français 5054, fol. 55v) depicting her being conducted to Chinon — painted roughly 50 years after her death, not a lifetime or eyewitness likeness (the only depiction from her own lifetime, Clément de Fauquembergue's 1429 marginal sketch, remains rejected for having no discernible face). Sourced via Wikimedia Commons' BnF/Gallica digitization (`Vigiles du roi Charles VII 08.jpg`), Public Domain. Locally hosted crop (640×1090, native resolution, no upscale, no AI processing, recompressed only) isolates Joan — the sole female figure in the procession, explicitly named in the BnF catalog description — from the full miniature; `kind: "historical_depiction"` set directly at implementation, not backfilled. Full validation gate: `tsc` clean, `vitest` 663/663, `next build --webpack` clean, `peopleDirectory.spec.ts`/`person.visual.spec.ts`/`compare.visual.spec.ts` 104/104, full Playwright **281/281** at `--workers=1`, plus a fresh roster-wide live sweep of all 95 production person pages (0 broken, 0 external/non-local portrait `src`). **Portrait delivery: 87 local / 0 remote / 8 no-portrait**, coverage 86/95 → 87/95 (91.6%). **Zheng He investigated (Phase 2C-2) and classified RIGHTS INQUIRY REQUIRED**: a genuine Ming-era painted clay figure (显应宫/Xianying Temple, Changle, Fujian — one of a "Patrol Sea Minister" devotional group excavated 1992, scholarly-attributed to Zheng He since a 2003 expert panel including the Chinese Academy of Social Sciences) is real and well-documented, but every publicly reachable photograph found (two Fuzhou Changle District government pages, one watermarked) is either too low-resolution or rights-unstated; the likely better source, 郑和史迹陈列馆 (the Zheng He Historical Relics Exhibition Hall, credited elsewhere on the same government pages), was identified but not contacted — no image was implemented. **Rumi re-investigated (Phase 2C-3) and confirmed HOLD**: a broader pixel-level sweep of Morgan MS M.466 (5 folios checked directly, including a third traceable copy of the tradition at the L.A. Mayer Museum, Jerusalem) found every publicly-servable image capped at roughly 310-350px on the short edge for the whole page — a hard resolution ceiling, not just the crowding problem identified in Phase 2A-1 — and confirmed the Morgan's own reproduction policy requires a paid/formal license for any use beyond personal/non-commercial; the Topkapi 1599 sister manuscript (catalog reference K.1479/R.1068 located) has no public digitized viewer found. Prior HEAD `844eca4` — fast-forward merge of `feat/portrait-phase2a-benjamin-banneker` (2026-08-28), the first completed item of Portrait Completion Phase 2 (see the Portrait Completion Phase 2 strategy audit for the full 10-person breakdown into free-source/rights-acquisition/historical-depiction tiers). Benjamin Banneker: the cover woodcut of his own 1795 almanac (*Pennsylvania, Delaware, Maryland, and Virginia Almanac, for the Year of our Lord 1795*; printed for and sold by John Fisher, Stationer, Baltimore; engraver unknown) — published in his lifetime and traditionally associated with him, but explicitly **not** presented as drawn from life, authenticated, or a confirmed likeness (no confirmed portrait of Banneker survives; his possessions were destroyed by fire the day of his funeral). Provenance cross-checked against PBS, the Maryland Center for History and Culture, the People's Graphic Design Archive, and Bedini's biography, which all independently converge on the same account. Recompressed only (mozjpeg quality 85, ~18.5% smaller, no visible linework damage at 4x magnification) — not resized, not upscaled, not AI-processed; native resolution (339×413) exceeds every UI slot's rendered size at every checked breakpoint, so the browser only ever downscales it. Full validation gate: `tsc` clean, `vitest` 662/662, `next build --webpack` clean, `peopleDirectory.spec.ts`/`person.visual.spec.ts`/`compare.visual.spec.ts` 104/104, full Playwright **281/281** at `--workers=1`, plus a fresh roster-wide live sweep of all 95 production person pages (0 broken, 0 external/non-local portrait `src`). **Portrait delivery: 86 local / 0 remote / 9 no-portrait**, coverage 85/95 → 86/95 (90.5%). **Rumi investigated and left at HOLD, deliberately untouched**: the genuinely-traceable source (Morgan Library MS M.466, a 1590s Ottoman illustrated manuscript of Aflākī's hagiography of Rumi, confirmed via the Morgan's own collection records) turned out to be a busy multi-figure narrative miniature with no confidently isolatable solo figure; the one compositionally-plausible alternative found on Commons had no traceable provenance at all. Neither clears this project's evidence bar. Prior HEAD `1a31807` — fast-forward merge of `feat/final-tier-a-portrait-recovery` (2026-08-28). A prior exposure-weighted audit (#1-match frequency, Similar-People in-degree, Directory clustering) ranked Akio Morita, Akira Kurosawa, Martin Luther King Jr., and Malcolm X as the highest-payoff remaining no-portrait people; this batch sourced all four from source families genuinely distinct from whatever blocked each of them before — Morita: a Brazilian state-archive photo (Avelino Ginjo, 1972, Arquivo Público do Estado de São Paulo), a pre-1983 government work so URAA restoration never attaches, cropped from a 4-person meeting scene per an approved crop region; Kurosawa: a 1953 Eiga no Tomo set photo whose Japanese copyright had already expired by 1970 under the old pre-1957-photograph term, before the 1996 URAA reference date, unlike the post-1957 corporate photos rejected earlier in the program; MLK: Dick DeMarsico, 1964, Library of Congress NYWTS collection, pre-1968 work-for-hire via Instrument of Gift (explicitly not the separate federal-§105 LBJ-Library backup found in the same pass); Malcolm X: Marion S. Trikosko, 1964, Library of Congress U.S. News & World Report collection, rights affirmatively dedicated to the public via USNWR's deed of gift, the unmodified original scan (not the colorized or "Remini enhanced" AI-upscaled derivatives found and rejected on Commons). All processed with sharp/mozjpeg (quality 85, 1600px-longest-side ceiling, no upscale, no AI processing); Morita's is the only one requiring a documented crop, the other three are already-solo compositions. Full validation gate: `tsc` clean, `vitest` 662/662, `next build --webpack` clean, `peopleDirectory.spec.ts`/`person.visual.spec.ts`/`compare.visual.spec.ts` 104/104, full Playwright **281/281** at `--workers=1`, plus a fresh roster-wide live sweep of all 95 production person pages (0 broken, 0 external/non-local portrait `src`). **Portrait delivery: 85 local / 0 remote / 10 no-portrait**, coverage 81/95 → 85/95 (89.5%). Prior HEAD `1278609` — fast-forward merge of `feat/final-no-portrait-coverage` (2026-08-28), closing out the No-Portrait Coverage program's active sourcing phase. Sourced and localized 3 more portraits — Octavia Butler (Nikolas Coukouma, CC BY 2.5, 2006 — a real event/signing photograph, not a publisher publicity portrait), Genghis Khan (Yuan dynasty imperial portrait album, c.1350, National Palace Museum Taipei, Public Domain — explicitly posthumous, painted ~120+ years after his death, part of a Yuan court ancestor-portrait tradition, not a lifetime/eyewitness likeness), and Socrates (Eric Gaba/"Sting", CC BY-SA 2.5, Louvre Ma 59 — a Roman-era copy within the ancient Socrates portrait tradition, explicitly not a lifetime or contemporary likeness). All hosted locally under `public/portraits/`, processed with sharp/mozjpeg (1600px-longest-side ceiling, quality 85, no upscale, no AI processing). **Umm Kulthum and Joan of Arc deliberately held**: every Umm Kulthum candidate traced to Pinterest/Facebook with no photographer credit and, on visual inspection, one didn't even resemble her; the sole contemporary Joan of Arc depiction (the 1429 Fauquembergue marginal sketch) is a crude schematic doodle with no discernible facial features, failing the strict hero/PersonCard visual threshold — no later invented likeness was substituted. **Socrates's E2E no-portrait fixture role was migrated to Coco Chanel** (`e2e/person.visual.spec.ts`, `e2e/compare.visual.spec.ts`) after verifying live that no remaining no-portrait person has a single-word display name in both locales (Rumi's English display falls back to the full multi-word canonicalName, no `en.ts` override shortens it); Coco Chanel is firmly HOLD after three separate rounds of sourcing research this program, so a stable long-term fixture, with assertions rewritten to match her real two-grapheme initials ("CC" / "코샤") rather than the old single-word assumption — original test intent (initials fallback renders, sizing matches, EN/KO both covered) fully preserved and re-verified live post-deploy. Verified via a dedicated Chromium script (zero broken images, zero console errors, zero overflow, zero Wikimedia network requests, correct attribution/caveat text) both pre-merge and again live post-deploy, plus a precise `<img src>` check across **all 95 live person pages** confirming zero Wikimedia references anywhere in the roster. Full validation gate: `tsc` clean, `vitest` 662/662, `next build --webpack` clean, 72/72 relevant Playwright specs, full Playwright **281/281** at `--workers=1` (this session repeatedly found a stale `next start` process left over from a prior session occupying the shared test port with an old build — now a known recurring gotcha, not a regression, killed before each run). **Portrait delivery split: 81 local / 0 remote-Wikimedia / 14 no-portrait**, coverage 78/95 → 81/95. |
| `feat/portrait-phase2a-benjamin-banneker`, `feat/final-tier-a-portrait-recovery`, `fix/ko-person-name-corrections-batch-1`, `feat/final-no-portrait-coverage`, `feat/no-portrait-fill-batch-2`, `feat/no-portrait-fill-batch-1`, `fix/portrait-final-remote-replacement`, `fix/portrait-reliability-batch-4`, `fix/portrait-reliability-batch-3`, `fix/portrait-reliability-batch-2`, `feat/portrait-sourcing-batch-1`, `fix/yayoi-kusama-portrait-v2` | Superseded/subsumed, cleanup candidates, not deleted. All are 0 commits ahead of `main` after their respective fast-forward merges (the latter two's portrait-data commits were cherry-picked into their own `-integration` branches, already merged into the history above; stale/unrelated commits on the originals were intentionally dropped). |
| `feat/monetization-v1` | Deliberately isolated, **not merged**, no external payment infra activated. Do not read its docs unless the task is monetization. |
| `chore/consolidated-dev-2026-08`, `chore/context-architecture`, `chore/domain-migration`, `chore/self-made-audit-2026-08`, `fix/mobile-likert-wrap`, `fix/quiz-likert-endpoint-clarity`, `fix/yayoi-kusama-portrait`, `scale/roster-1000`, `feat/editorial-backfill-batch-1..6`, `feat/editorial-qa-pilot`, `feat/launch-readiness-95`, `feat/profile-editorial-depth`, `feat/directory-taxonomy-filter-ux`, `feat/landing-cta-hierarchy`, `feat/profile-hero-polish`, `feat/profile-v2-pilot-batch-1`, `feat/profile-v2-pilot-clean`, `feat/editorial-achievements-correction-batch-1`, `feat/portrait-sourcing-batch-1-integration`, `fix/yayoi-kusama-portrait-v2-integration`, `fix/portrait-reliability-batch-1`, `fix/malcolm-x-ko-name-spelling`, `fix/landing-cta-arrow-spacing` | Fully subsumed by `main` (0 unique commits each) — cleanup candidates, not deleted (no established convention to do so; deletion needs an explicit human decision, not made here). Branch new work from `main`. |

## Product

- **Roster: 125 people, 124 match-eligible.** All roster-11 through
  roster-16 batches are merged to `main`: roster-16's 9-person final
  intake batch merged as PR #9 (merge commit `7a6e306`); roster-15's
  8-person batch merged as PR #8 (merge commit `33654c3` — note: an
  earlier report cited `c55cb57` as the roster-15 merge commit, but
  `c55cb57` is actually the `feat/roster15-coverage-aware-intake` branch's
  own head/feature commit, not the merge commit; corrected here per
  CLAUDE.md invariant 8, repository state over cached claims); roster-14's
  11-person batch merged as PR #7 (merge commit `1decf00`); roster-12's
  Marcus Aurelius promotion merged to `main`; roster-13 produced zero new
  promotions — see below. Zheng He
  is the sole non-match-eligible exception (browsable, fails only the
  coverage gate). Authority: `evaluateMatchEligibility()`
  in `src/core/matching/similarity.ts`; re-run `corepack pnpm@10 exec tsx
  src/dev/simulate.ts 10000 quiz` for a live health check. Miriam Makeba
  (`roster11.ts`) promoted 2026-09 from the roster-expansion-125 evidence
  program, merged to `main`, profile completed by a corrective fix. Marcus
  Aurelius (`roster12.ts`) promoted 2026-09 from the roster-12 new-intake
  batch, with a real portrait and editorial content from first promotion —
  see the Roster 12 entry below. **Target: 125, remaining gap: 0 —
  `ROSTER_125_TARGET_REACHED`, production-verified live on
  thegreatinside.com.** No roster-17 planned; no 125+ expansion
  authorized.
- **Eligibility rule: `eligibility_v2`** (`scored>=18`, `coverage>=0.6`,
  high-confidence-subset `count>=12`/`avgConf>=0.55`). See
  [`docs/reference/matching.md`](../reference/matching.md).
- **Matching health**: max #1 match frequency ~12.0% (Warren Buffett),
  well under the 20%-at-n≥30 threshold. Stable across roster growth.
- **Editorial content** (achievements/moments/turning points on person
  pages): **95/95 COMPLETE** (2026-08-30, Remaining-19 Editorial
  Completion) — Tier A 8/8, Tier B 52/52, Tier C 35/35. 505 total
  editorial items, 100% Korean coverage. Profile V2 sections
  (`lifeArc`/`complexities`/`legacy`) remain evidence-gated and
  asymmetric by design — omitted, not padded, where the record doesn't
  support them. **Profile Quality Normalization Batches A + B**
  (2026-08, `main` `022f274`) then ran an evidence-gated audit/edit pass
  on 7 profiles (Pasteur, Edison, Atatürk, Octavia Butler, Frida Kahlo,
  Vincent van Gogh, Simón Bolívar): Pasteur's vaccine-substitution item
  moved Moment → Complexity; Atatürk gained a second core Achievement
  (reform program); Butler gained an Achievement + Legacy; Kahlo and Van
  Gogh each gained a Legacy; Edison and Bolívar were audited and kept
  unchanged. See
  [`docs/checkpoints/editorial.md`](../checkpoints/editorial.md).
- **Profile V2 fields** (`lifeArc`/`complexities`/`legacy` on
  `PersonEditorial`): **Life Arc coverage: 95/95 COMPLETE** (2026-09,
  mechanically verified) — every roster person now has a Life Arc; the
  batch-by-batch rollout inconsistency the program ran through Batches
  1–6 to close is now fully resolved, and Life Arc is a universal
  chronological-orientation section present on every profile.
  `complexities`/`legacy` remain evidence-gated and asymmetric by
  design — present only where the record supports them, never padded —
  and this closure does **not** imply all 95 profiles now share an
  identical section structure: Turning Points, Complexity, and Legacy
  stay optional and asymmetric exactly as before, only Life Arc itself is
  now universal. 25 profiles predate the Life Arc Backfill program.
  **Batch 1**
  (2026-08, merged to `main`) added 12 (Ada Lovelace, Frida Kahlo, Leonardo
  da Vinci, Marie Curie, Yi Sun-sin, Benjamin Franklin, Jane Goodall,
  Mahatma Gandhi, Nelson Mandela, Oprah Winfrey, Srinivasa Ramanujan,
  Wangari Maathai) plus a follow-up factual closure (Jane Goodall's
  `deathYear`/`isLiving`, since corrected). **Batch 2** (2026-08, merged to
  `main`) added a further 12 (Albert Einstein, Ernest Shackleton, Frederick
  Douglass, Galileo Galilei, Hildegard of Bingen, Ibn Sina, Isaac Newton,
  Jane Austen, Martin Luther King Jr., Rabindranath Tagore, Thomas Aquinas,
  Thomas Edison). **Batch 3** (2026-08, merged to `main`) added a further 12
  (Umm Kulthum, Vincent van Gogh, Wilbur Wright, Benjamin Banneker, Chinua
  Achebe, Emmy Noether, Fela Kuti, Florence Nightingale, Grace Hopper,
  Immanuel Kant, Malcolm X, Muhammad Ali). **Batch 4** (2026-08, merged to
  `main`) added a further 12 (Niels Bohr, Rachel Carson, Simón Bolívar,
  Sojourner Truth, Sor Juana Inés de la Cruz, Toussaint Louverture, Wole
  Soyinka, Aristotle, B. R. Ambedkar, Sequoyah, Elizabeth Blackwell,
  Harriet Tubman — Aristotle at 5 beats, D-caution, all others at 6).
  **Batch 5** (2026-08, merged to `main`) added a further 11 (Ludwig
  Wittgenstein, Nicolaus Copernicus, Wu Zetian, Averroes, C. V. Raman,
  Franz Kafka, Katherine Johnson, Maimonides, Mary Wollstonecraft,
  Michelangelo, Octavia Butler — all at 6 beats; Wu Zetian, Averroes, and
  Maimonides are D-caution profiles that received a dedicated
  chronology/attribution review). **Batch 6 — FINAL** (2026-09, branch
  `feat/life-arc-backfill-batch-6`, unmerged) added the last 11 (Susan B.
  Anthony, Benito Juárez, Joan of Arc, Julius Caesar, Fyodor Dostoevsky,
  Louis Armstrong, Louis Pasteur, Akio Morita, Anna Pavlova, Mustafa Kemal
  Atatürk, Oscar Niemeyer — 10 at 6 beats, Anna Pavlova at 5), closing
  coverage to 95/95. Joan of Arc and Julius Caesar (D-caution) received a
  dedicated chronology/attribution review; the review caught and fixed
  one internal inconsistency on Joan of Arc (a drafted beat's "arrow"
  detail corrected to match this profile's own already-published
  "crossbow bolt" claim). Does not reopen the already-approved Louis
  Pasteur Moment→Complexity reclassification or the Mustafa Kemal
  Atatürk reform-program Achievement addition from the Profile Quality
  Normalization program — both verified unchanged. Same P1/P2/P3
  provenance model throughout all six batches (see each batch's own
  commits for the full per-person audit). A roster-wide final integrity
  audit (post-Batch-6) found: 7 five-beat arcs, 88 six-beat arcs, 563
  total beats, 0 missing/unresolvable `sourceId`s, 0 duplicate beat
  `textKey`s, 0 EN/KO parity gaps.
- **Person Profile Hero redesign + mobile Trait Constellation
  progressive disclosure** (2026-08): the hero moved from a fragmented
  3-column `Rail(hero, Known For)` composition to one coherent
  `IdentityHero` (portrait | identity info, Known For now living inside
  the identity column), with a compact one-line-clamped portrait credit
  and a left-aligned back-nav link. Below 640px, Trait Constellation now
  shows only the strongest 4 trait cards by default (already
  distinctiveness-ordered, no re-ranking) behind a quiet "Show all
  traits" / "모든 특성 보기" toggle — desktop/tablet grid unchanged. A
  trait-card click-to-explain affordance was evaluated and deliberately
  deferred at the time (no existing popover/dialog primitive to reuse, no
  attribute-description content yet) — since implemented, see **Profile
  Trait Explanation UX** below.
  `IdentityHero`'s missing-portrait initials fallback
  (`src/ui/components/layout.tsx`) predates this redesign (2026-08,
  `chore/consolidated-dev-2026-08`) and is unchanged by it.
- **Portrait coverage: 89/95** (55→60, Portrait Sourcing Batch 1;
  60→69, No-Portrait Fill Batch 1; 69→78, No-Portrait Fill Batch 2;
  78→81, Final No-Portrait Coverage batch; 81→85, FINAL Tier-A Portrait
  Recovery batch; 85→86, Portrait Completion Phase 2A-1 (Benjamin
  Banneker); 86→87, Portrait Completion Phase 2C-4 (Joan of Arc);
  87→88, Portrait Completion Phase 2D-2 (Ibn Khaldun); 88→89, Portrait
  Completion: Final Free-Source Recovery (Muhammad Ali), 2026-08-28 —
  see branch table above for names/sources; every other release was
  replacement/delivery-only). **Portrait
  delivery: 89 local / 0 remote-Wikimedia / 6 no-portrait** (Zheng He
  non-eligible, 5 eligible) — every portrait in the roster is self-hosted
  under `public/portraits/`, so the categorical `ERR_BLOCKED_BY_ORB` risk
  this whole program existed to fix no longer applies to any person
  page. `PersonPortrait.kind?` (`likeness`/`historical_depiction`/
  `editorial_nonlikeness`, added 2026-08) is now available — optional,
  structural, and (Phase 2D-1) has a visible UI treatment for
  `editorial_nonlikeness` only (`PortraitCredit`, see the branch table
  row above); `historical_depiction` and unclassified portraits still
  render with zero change. See
  [`docs/reference/data-model.md`](../reference/data-model.md). 7
  already-implemented portraits (Genghis Khan, Socrates, Thomas Aquinas,
  Averroes, Wu Zetian, Sor Juana Inés de la Cruz, Benjamin Banneker)
  are backfilled `historical_depiction`; Joan of Arc's portrait (Phase
  2C-4) was implemented with that `kind` directly, not backfilled. **Ibn
  Khaldun (Phase 2D-2) is the first and only `editorial_nonlikeness`
  instance** — not `historical_depiction`: no defensible historical
  likeness of him survives at all, so his visual is a real manuscript
  folio explicitly presented as not a portrait, not a later-depiction
  tradition (see the branch table row above for the full provenance).
  Ibn Sina, Maimonides, and Yi Sun-sin were deliberately left unclassified
  (modern institutional custody or a modern reconstruction, no
  established historical tradition — see each entry's own roster
  comment). **Tier-A Free-Source Recovery is COMPLETE**; the long-term
  target remains **95/95**. **Portrait Completion Phase 2 is ACTIVE**,
  four people resolved (Benjamin Banneker and Joan of Arc via
  historically-grounded later-depiction paths, Ibn Khaldun via
  editorial_nonlikeness, Muhammad Ali via free-source recovery — the
  same pre-1968 LOC NYWTS work-for-hire basis as Martin Luther King Jr.
  and Malcolm X) of the original 9: Bruce
  Lee, Fela Kuti (Tier B) and Coco Chanel,
  Umm Kulthum (Tier C) remain fully open; Zheng He (Tier C) is now
  classified RIGHTS INQUIRY REQUIRED (Phase 2C-2 — a genuine artifact
  exists, but every reachable photograph is too low-resolution or
  rights-unstated); Rumi (Tier B) was re-investigated (Phase 2C-3, a
  broader pixel-level sweep across 3 institutions) and remains HOLD for
  a different, more specific reason than Phase 2A-1 found — a hard
  resolution ceiling on every publicly-servable image, not just
  crowding. See the branch table row above for both investigations'
  detail. Repeating generic Commons searches on the rest is not expected to
  succeed — Phase 2 instead needs differentiated strategies per person:
  rights acquisition/special-source recovery (e.g. direct contact with
  an estate, archive, or rights-holder), institutional archive recovery
  (unindexed/undigitized holdings a general web search won't surface),
  and — for pre-photography subjects — historically defensible
  depiction resolution (an image whose artistic/reconstruction status is
  itself honestly documented, not a search problem to solve). "HOLD" on
  any of these means no acceptable path exists under the sourcing
  methods tried so far, not permanent abandonment — every one stays
  revisitable under a new strategy, while provenance honesty and the
  existing rights standards stay non-negotiable. See the exposure audit
  for the full priority-score derivation. Full batch-by-batch history
  lives in `git log` (each release's own commit message), not restated
  here.
  Exposure-Priority Portrait Pass (2026-08, `chore/consolidated-dev-2026-08`)
  added 13 portraits (Gandhi, Atatürk, Julius Caesar, Ibn Sina, Toni
  Morrison, Wangari Maathai, Aung San Suu Kyi, Oprah Winfrey, Maimonides,
  Averroes, Yi Sun-sin, Hayao Miyazaki, Yayoi Kusama), selected by
  deterministic exposure signals (#1-match frequency, Similar-People
  in-degree, Opposite selection, editorial status) rather than raw
  coverage. Result: Top-20 Similar-in-degree coverage 11→20/20, Top-20
  #1-match coverage 13→16/20, portrait-less share of Similar-rail
  exposure mass 48.2%→16.5%, of #1-match mass 33.6%→19.8%. All sourced
  from Wikimedia Commons/PD/CC-compatible licenses only (Akira Kurosawa,
  Akio Morita deliberately skipped over unresolved US-copyright/URAA
  ambiguity; Yi Sun-sin, Ibn Sina, Maimonides, Averroes use later
  depictions with an explicit not-a-lifetime-likeness caveat in
  `portrait.attribution`). `e2e/person.visual.spec.ts`'s no-portrait
  fixture: socrates.
- **Custom domain**: `https://thegreatinside.com` is the canonical
  production origin (migrated from `the-great-inside.vercel.app`, which
  now permanently redirects). `www` also redirects to the apex.
- **Monetization**: "Deep Inside" (one-time paid feature) implemented on
  `feat/monetization-v1`, intentionally unmerged, no live payment infra.
- **Quiz Likert endpoint-clarity hotfix (2026-08)**: the 1-7 scale's two
  endpoint descriptions now sit together in one row beneath the
  unchanged 1-7 options row at every viewport, instead of splitting
  awkwardly into a column below 640px. Presentation only —
  `src/ui/components/quiz.tsx`'s `LikertScale`.
- **Directory taxonomy + progressive disclosure** (`directory_taxonomy_v1`,
  2026-08): the People Directory's filter UI is two collapsed-by-default
  axes — Profession/Activity and the 34-attribute/7-facet Personality/
  Trait taxonomy — replacing the old flat `tagIds` checklist. See
  [`docs/reference/directory-taxonomy.md`](../reference/directory-taxonomy.md).
- **Self-made/earned-distinction philosophy audit (2026-08)**: all 95
  people classified against `inclusion_v1`'s counterfactual test — 69
  Strong Self-Made Fit, 26 Earned but Advantaged, 0 Weak Fit. No roster
  change. Full record:
  [`docs/checkpoints/self-made-earned-distinction-audit-2026-08.md`](../checkpoints/self-made-earned-distinction-audit-2026-08.md).
- **Roster Expansion 125 evidence program (2026-09)**: 30 candidates
  researched/scored toward a future 96->125 expansion — 26 adequately
  evidenced (1, Miriam Makeba, `qa_passed` -> **promoted**, see below;
  rest `held`), 2 `IMPROVED_BUT_CEILING_REMAINS`, 2 `STRUCTURALLY_THIN`
  (Ibn Battuta, Ashoka). Alternate search for both `STRUCTURALLY_THIN`
  candidates is closed (`NO_PROVEN_REPLACEMENT` for both Chandragupta
  Maurya and Rabban Bar Sauma) — no swap performed. The other 29
  candidates: no live-roster or `src/` change. Full evidence state:
  [`docs/checkpoints/roster-expansion-125-FINAL-CONVERGENCE-DRAFT.md`](../checkpoints/roster-expansion-125-FINAL-CONVERGENCE-DRAFT.md).
- **Miriam Makeba promoted and profile-completed (2026-09, merged to
  `main`)**: promoted via `generateRoster11.ts` (single-slug allowlist,
  `feat/roster11-miriam-makeba`) — 95->96 people (`SEED_PEOPLE`/
  `peopleIndex.generated.ts`), 94->95 in the People Directory's default
  match-eligible-filtered view (both counts correct — see the
  count-semantics note at the top of this file). A follow-up corrective
  fix (`fix/miriam-makeba-complete-profile`) then completed her live
  profile, which the original promotion had left incomplete: a
  CC0-licensed portrait (Rob Mieremet/Anefo, 1969, Nationaal Archief) and
  editorial content (2 achievements, 2 moments, 1 turning point, 2
  interpretations, EN+KO), sourced entirely from her already-approved
  candidate evidence — no new research, no score/confidence/evidence
  changes. Editorial coverage for the pre-existing 95-person roster is
  unaffected (remains complete); Miriam Makeba now has editorial content
  too. Full record, delta, and validation for both the promotion and the
  corrective fix:
  [`roster11-miriam-makeba-promotion-DRAFT.md`](../checkpoints/roster11-miriam-makeba-promotion-DRAFT.md),
  [`roster11-miriam-makeba-profile-fix.md`](../checkpoints/roster11-miriam-makeba-profile-fix.md).
- **Roster-12 new-intake batch (2026-09, merged to `main`)**: with zero
  unpromoted `qa_passed` candidates left after Miriam Makeba, built a fresh 27-person discovery
  pool (none previously scored, none already live), froze 15 for full
  evidence packs and first scoring — 2 crossed `eligibility_v2` honestly.
  **Marcus Aurelius** promoted via `generateRoster12.ts` (single-slug
  allowlist) into `roster12.ts` — 96->97 people, 95->96 match-eligible —
  with a real portrait (Louvre Antonine-period bust, CC BY 2.5) and full
  EN/KO editorial content from first promotion, not a follow-up fix.
  **Che Guevara is `qa_passed` but not promoted**: no rights-clear,
  non-AI-generated portrait could be sourced this cycle (the Korda
  "Guerrillero Heroico" photograph's international copyright status is
  genuinely disputed — Korda himself successfully sued over commercial
  use in 2000; several Commons alternatives were rejected for the same
  reason, a false rights claim, or an AI-modification flag); his
  candidate JSON and lifecycle are untouched. The other 13 frozen
  candidates remain `held` — real evidence packs, genuine first scores,
  all missed only on `eligibility_v2`'s weighted coverage floor (not
  attribute count or confidence), a concrete target for a future
  evidence-deepening pass rather than new research. No previously-
  committed candidate's score/confidence/evidence/lifecycle changed
  (scoring-lock integrity: 0 flagged). Target remains 125; gap now 28.
  Full record: [`roster12-new-intake-batch.md`](../checkpoints/roster12-new-intake-batch.md).
- **Roster-13 new-intake batch (2026-09, `feat/roster13-new-intake-batch`,
  candidate-intake-only, merged to `main` as `023df19`)**: built a fresh
  29-person discovery pool, froze 18 for full evidence packs and first scoring.
  **0 of 18 crossed `eligibility_v2`** — every one missed solely on the
  weighted coverage floor (0.6), Fidel Castro closest at 0.599; two
  candidates (Robert Mugabe, Juan Perón) also came in at 17 rather than
  the intended 18 scored attributes due to a disclosed drafting
  miscount, left uncorrected since it does not change either outcome
  (both sit at coverage 0.505). All 18 `held` with exact numbers
  recorded. A bounded, single-check portrait retry for Che Guevara found
  no rights-clear alternative; his roster-12 blocker stands unchanged,
  candidate JSON untouched. No candidate promoted; no `roster13.ts`
  created (nothing product-ready to allowlist). Roster counts unchanged:
  97 people, 96 match-eligible, gap to 125 still 28. No previously-
  committed candidate's score/confidence/evidence/lifecycle altered
  (scoring-lock integrity: 0 flagged). Full record:
  [`roster13-new-intake-batch.md`](../checkpoints/roster13-new-intake-batch.md).
- **Roster-14 coverage-aware intake (2026-09,
  `feat/roster14-coverage-aware-intake`, merged to `main` as PR #7,
  merge commit `1decf00`)**: applied the
  roster-12/13 coverage postmortem's finding directly — raised the
  pre-freeze evidence target to ≥21-22-attribute-capable, built a fresh
  33-person discovery pool, froze 12 (smaller than roster-12/13's 15-18),
  scored every frozen candidate to 22-23 attributes. **11 of 12 crossed
  `eligibility_v2` honestly**: Abraham Lincoln, Theodore Roosevelt,
  Alexander Hamilton, Mark Twain, Ernest Hemingway, Elizabeth I, Otto von
  Bismarck, Leo Tolstoy, Sigmund Freud, Pablo Picasso, Gertrude Bell — all
  promoted via `generateRoster14.ts` (11-slug allowlist) into `roster14.ts`,
  all fully product-complete from first promotion (real Public Domain
  portraits verified live against Commons license metadata, full EN/KO
  editorial content, Korean display names) — zero product-blocked
  `qa_passed` this cycle. Queen Victoria (22 attributes, coverage 0.655) is
  the sole miss, short only on the high-confidence-count gate (4 of 22 at
  confidence ≥0.5, need 12) — remains `held`, untouched. 97->108 people,
  96->107 match-eligible, gap to 125 now 17. Two mechanical data-entry
  fixes made before eligibility was first computed (an invalid
  `impactDomains` value, five invalid `impact: "contextual"` values) — no
  score/confidence/evidenceType touched. No previously-committed
  candidate's score/confidence/evidence/lifecycle altered (scoring-lock
  integrity: 0 flagged). Full record:
  [`roster14-coverage-aware-intake.md`](../checkpoints/roster14-coverage-aware-intake.md).
- **Roster-15 coverage-aware intake (2026-09,
  `feat/roster15-coverage-aware-intake`, merged to `main` as PR #8,
  merge commit `33654c3` — not `c55cb57`, which is the branch's own
  head/feature commit)**: used roster-14's
  coverage-aware preflight as the standing method, unchanged. Built a
  fresh 34-person discovery pool (19 carried forward from roster-14's own
  preflighted-but-never-scored pool, 15 genuinely new), froze 12, scored
  every candidate to 22 attributes. **8 of 12 crossed `eligibility_v2`
  honestly**: Catherine the Great, Frederick the Great, James Joyce,
  Marlene Dietrich, Maya Angelou, Miles Davis, Nina Simone, Ruth Bader
  Ginsburg — all promoted via `generateRoster15.ts` (8-slug allowlist)
  into `roster15.ts`, all fully product-complete from first promotion
  (real Public Domain/CC0 portraits — 4 of 8 are recent-enough deaths
  where portrait rights were a genuine risk, resolved via U.S. federal
  government works and Dutch Nationaal Archief/Anefo CC0 photographs —
  full EN/KO editorial content, Korean display names) — zero
  product-blocked `qa_passed` this cycle. Agatha Christie, Thomas
  Jefferson, Ulysses S. Grant, and Henry Ford (all 22 attributes, all
  coverage ≥0.648) missed solely on the high-confidence-count gate and
  remain `held`. Notably, Thomas Jefferson's and Henry Ford's scoring
  deliberately included their most serious documented conduct (Jefferson's
  Sally Hemings relationship and sustained enslavement of over 600 people;
  Ford's Dearborn Independent antisemitic publishing campaign) rather than
  omitting or softening it, per CLAUDE.md's instruction never to rig
  results to flatter. 108->116 people, 107->115 match-eligible, gap to 125
  now 9. No previously-committed candidate's score/confidence/evidence/
  lifecycle altered (scoring-lock integrity: 0 flagged). Full record:
  [`roster15-coverage-aware-intake.md`](../checkpoints/roster15-coverage-aware-intake.md).
- **Roster-16 final intake (2026-09, `feat/roster16-final-intake`,
  merged to `main` as PR #9, merge commit `7a6e306`)**: refined the
  coverage-aware preflight with a depth question
  (>=12 attributes plausibly supportable near the high-confidence
  threshold via genuinely repeated/independent/multi-source
  corroboration), responding directly to roster-15's finding that its
  four misses all had adequate breadth but insufficient high-confidence-
  row count. Built a fresh 27-person discovery pool (9 carried forward
  from roster-15's own leftover pool, 3 genuinely new), froze 12, scored
  every candidate to 22-23 attributes. **11 of 12 crossed
  `eligibility_v2` honestly**: Duke Ellington, Martha Graham, Bertrand
  Russell, Charles Dickens, George Orwell, T. E. Lawrence, Elizabeth Cady
  Stanton, John D. Rockefeller, Katharine Hepburn, Bette Davis, Nellie
  Bly, Carl Jung — a 91.7% pass rate, matching roster-14 and exceeding
  roster-15's 66.7%. Only 9 production slots remained before the
  125-person target, so the first 9 `qa_passed` by frozen intake order
  were promoted via `generateRoster16.ts` (9-slug allowlist) into
  `roster16.ts`: Duke Ellington, Martha Graham, Bertrand Russell, Charles
  Dickens, George Orwell, T. E. Lawrence, Elizabeth Cady Stanton, John D.
  Rockefeller, Bette Davis — all fully product-complete from first
  promotion (real Public Domain/CC0/CC BY 4.0 portraits verified live
  against Commons/LOC/Rijksmuseum/DPLA license metadata, full EN/KO
  editorial content, Korean display names) — zero product-blocked
  `qa_passed` this cycle. **Nellie Bly and Carl Jung remain `qa_passed`
  but target-cap-deferred**, not held — fully eligible for a future cycle
  if the 125 target is ever raised. **Katharine Hepburn** (22 attributes,
  coverage 0.642, 14 high-confidence rows, clearing the depth-count gate
  comfortably) is `held`: her high-confidence *average* (0.54) fell just
  under the 0.55 threshold, a genuinely new miss pattern this cycle
  surfaced — the preflight's depth question predicts row *count*, not
  average strength within that band. 116->125 people, 115->124
  match-eligible. **Target: 125. Gap: 0. `ROSTER_125_TARGET_REACHED`.**
  Several turning points handle genuinely negative or complex documented
  conduct directly rather than flattering it (Bertrand Russell's three
  failed marriages, Charles Dickens's damaging 1858 separation, Bette
  Davis's Joan Crawford feud, Elizabeth Cady Stanton's split with her own
  movement over the 15th Amendment, John D. Rockefeller's predatory
  competitive tactics per Ida Tarbell's contemporary account, Martha
  Graham's one-directional studio culture). One mechanical test-threshold
  fix, not a score/calibration change: `greatness.test.ts`'s
  `independent_creator`/`leadership_drive` archetype-centroid guard
  raised 60->65 after Dickens's real `leadership_drive` row (68,
  confidence 0.5) shifted the shrinkage-blended centroid to 60.25. No
  previously-committed candidate's score/confidence/evidence/lifecycle
  altered (scoring-lock integrity: 0 flagged). Full record:
  [`roster16-final-intake.md`](../checkpoints/roster16-final-intake.md).

## Completed major phases (durable summary — do not re-read the archive for these)

- Phases 0–8: architecture, design system, dataset to 35→95 people, quiz
  v1→v2 (64 items, `taxonomy_v1.1`), matching hardening (`matching_v2`),
  quiz/results UI, target comparison + development content, full `ko-KR`
  localization. All closed, human-approved.
- Phase 9: Supabase accounts (Auth + Postgres), sign-in/out, historical
  result-snapshot fidelity (`ResultSnapshotV1`), account history. Closed.
- Phase 10: production deployment, wide-desktop editorial visual layout
  (Landing/Person/Results/Saved-Result/Compare), SEO/locale foundation,
  sharing/OG images, custom domain migration, legal pages (Privacy/Terms),
  "Delete all saved results." Closed, launched.
- Roster-1000 program (19 sessions): grew roster 35→95, built and froze
  `Roster Research & Scoring Protocol v1`, implemented `eligibility_v2`.
  See [`docs/checkpoints/roster.md`](../checkpoints/roster.md) for the
  current protocol summary.
- Editorial narrative content (`editorial_v1`): pilot + 6 backfill
  batches, Tier A/B complete. See
  [`docs/checkpoints/editorial.md`](../checkpoints/editorial.md).

Full historical detail for any of the above: `docs/archive/` — read only
to resolve a specific historical question, not by default.

## Test baseline (last known-good, re-verify before trusting)

Verified on `main` at the 2026-08-28 Portrait Completion: Final
Free-Source Recovery — Muhammad Ali release (commit `d1b5652`): `tsc
--noEmit` clean · `vitest run` 670/670 (unchanged — this release added
no test files) · `next build --webpack` clean (via the Playwright
harness's build-then-serve step; standalone `next build` runs
intermittently crashed on this machine from worker-process memory
contention — see branch table row above) · `peopleDirectory.spec.ts` +
`person.visual.spec.ts` + `compare.visual.spec.ts` 109/109 (full
286-spec Playwright suite not re-run this release). Live production
check for Muhammad Ali (hero/PersonCard, ~1280px + ~390px, EN + KO):
all checks pass — serves from `/portraits/`, uncropped bust framing
intact, face sharp, attribution ("Ira Rosenberg, 1967 — Library of
Congress, New York World-Telegram & Sun Collection") and Public
Domain/pre-1968 work-for-hire rights wording unchanged, zero console
errors, zero horizontal overflow, zero external portrait dependency. A
roster-wide live sweep of all 95 production person pages confirmed
**89 local / 0 remote / 6 no-portrait**, all 89 declared local
portrait URLs returning HTTP 200. Prior baseline (2026-08-28 Portrait
Completion Phase 2D-2, commit `e5b3b1e`): `tsc --noEmit` clean ·
`vitest run` 670/670 · `next build --webpack` clean ·
`peopleDirectory.spec.ts` + `person.visual.spec.ts` +
`compare.visual.spec.ts` 109/109 · Playwright **286/286** at
`--workers=1`. Live production check for Ibn Khaldun
(hero/PersonCard, ~1280px + ~390px, EN + KO): all checks pass — serves
from `/portraits/`, boxed inscription and adjacent attribution
annotation both legible, editorial-nonlikeness label ("Editorial visual
· Not a likeness" / "편집용 이미지 · 실제 초상 아님") renders above the
caption, confirmed absent on Genghis Khan/Joan of Arc
(`historical_depiction`) and Leonardo da Vinci (unclassified), zero
console errors, zero horizontal overflow, zero external portrait
dependency. A roster-wide live sweep of all 95 production person pages
confirmed **88 local / 0 remote / 7 no-portrait**, 0 broken, and 0
external/non-local `src` — **zero** Wikimedia image references anywhere
in the roster. Prior baseline (2026-08-28 Portrait Completion Phase
2C-4, commit `6de9c9c`): same full gate, `vitest` 663/663, 87 local / 0
remote / 8 no-portrait at that point. Earlier baseline (2026-08-28
Portrait Completion Phase 2A-1, commit `844eca4`): same full gate,
`vitest` 662/662, 86 local / 0 remote / 9 no-portrait at that point.
Earlier baseline (2026-08-28 FINAL Tier-A Portrait Recovery batch,
commit `1a31807`): same full gate, 85 local / 0 remote / 10 no-portrait
at that point. Earlier baseline (2026-08 Final No-Portrait Coverage
batch, commit `1278609`): `tsc` clean, `vitest` 662/662, full
Playwright 281/281, a precise `<img src>` check across all 95 live
person pages confirming zero Wikimedia references anywhere in the
roster at that point too. Earlier baseline (2026-08 Editorial
Achievements Correction Batch 1 / Profile V2 / Hero redesign, commit
`b7a30ec`):
`editorialValidation.test.ts` 20/20, `i18n-audit.ts` zero missing keys,
matching simulation max #1 frequency 12.0% (Warren Buffett) —
unaffected by any portrait release, none of which touched editorial or
matching/scoring code. See [`docs/context/TESTING.md`](TESTING.md) for
what to run per change type.

## Next product checkpoint

Post-release, no blocking work outstanding. Zero remote-Wikimedia
portrait dependency remains anywhere in the roster; the categorical
`ERR_BLOCKED_BY_ORB` risk the Portrait Reliability Localization program
existed to fix stays closed. The Tier-A portrait-recovery queue (Martin
Luther King Jr., Malcolm X, Akira Kurosawa, Akio Morita) is fully
resolved, closing out the free-source/high-probability recovery phase.
Portrait Completion Phase 2 is now **active**: Benjamin Banneker
(Phase 2A-1) and Joan of Arc (Phase 2C-4) resolved via
historically-grounded later-depiction paths; Ibn Khaldun (Phase 2D-2)
resolved as the first `editorial_nonlikeness` instance — a real
manuscript folio explicitly presented as not a portrait, chosen only
after a final re-audit confirmed no defensible historical likeness of
him survives at all (unlike Banneker/Joan of Arc, this is not a
later-depiction tradition); Muhammad Ali (Final Free-Source Recovery)
resolved via the same pre-1968 LOC NYWTS work-for-hire rights basis
already used for Martin Luther King Jr. and Malcolm X. Zheng He
(Phase 2C-2) is
classified RIGHTS INQUIRY REQUIRED — a genuine Ming-era artifact exists,
but no reachable photograph clears the resolution/rights bar; the
Zheng He Historical Relics Exhibition Hall (Changle) is the identified
but not-yet-contacted next step. Rumi (Phase 2A-1, re-investigated
Phase 2C-3) remains HOLD — a genuinely traceable 1590s Ottoman
manuscript tradition exists across 3 institutions, but every publicly
reachable image is capped at a resolution too low for production use.
Portrait completion overall stays open with a long-term target of
95/95, 4 people remaining: differentiated strategies per person rather
than another generic Commons pass — rights acquisition/special-source
recovery, institutional archive recovery, or historically defensible
depiction resolution for pre-photography subjects (Tier B: Bruce Lee,
Fela Kuti; Tier C: Coco Chanel, Umm Kulthum)
— with "HOLD"/"RIGHTS INQUIRY REQUIRED" meaning no acceptable path yet,
not permanent abandonment. Candidates for a future session (none started
here): a human decision on deleting the now-fully-subsumed dev branches
listed above. Editorial content is fully closed (95/95, see above) —
not a candidate. The trait-card click-to-explain affordance once listed
here is done — see **Profile Trait Explanation UX** below.

- **Profile Trait Explanation UX** (2026-08, `feat/trait-explanation-ux`,
  **not yet merged**): clicking/tapping a Trait Constellation card opens
  an explanation — trait name, score + a 5-band 0-100 reading (Very Low
  … Very High, `src/core/interpretation/traitScoreBands.ts`), a
  centralized plain-language definition for all 34 attributes
  (`attribute.description.*` in `en.ts`/`ko.ts`), and, only when this
  person's own editorial content already ties that attribute to a
  concrete episode (`src/core/interpretation/traitExplanation.ts` reuses
  `PersonEditorialItem.attributeId`/`interpretationKey` — no new
  interpretation content authored), that interpretation text. Desktop:
  an anchored, edge-aware popover (non-modal `<dialog>` — a true modal
  would block clicking a different trait card to switch, which the spec
  requires). Mobile (≤640px, the existing breakpoint): the same `<dialog>`
  restyled as a bottom sheet, opened as a genuine modal (`showModal()`,
  not `.show()`) — corrected by a follow-up semantic/accessibility audit
  (`cdf6e9e`) after the original non-modal-everywhere version was found
  to let Tab/Shift+Tab reach trait cards still visible behind the sheet;
  `showModal()`'s native inert background/focus containment fixes this
  without a hand-rolled focus trap. That same audit also replaced the
  score bands' boundaries — originally mirrored from the unrelated
  Greatness Potential bands — with `docs/scoring-rubric-v1.md` §4's own
  center-out structure (45-55 as the rubric's explicit neutral center,
  not the low end). `tsc` clean, `vitest` 689/689,
  `e2e/traitExplanation.spec.ts` 14/14. No roster/editorial/matching/
  scoring/portrait/monetization files touched (either commit).
