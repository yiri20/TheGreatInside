# Current state

**Authority for volatile facts below**: where a live tool/audit exists, it
is the source of truth, not this file's cached number. Re-run the tool if
the task depends on an exact current figure.

Last updated: 2026-08-30 (Remaining-19 Editorial Completion merged to
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
| `main` | **Production.** Deployed to `https://thegreatinside.com`. HEAD `37bfc23` — fast-forward merge of `integration/editorial-remaining-19` (2026-08-30), Remaining-19 Editorial Completion (5 commits preserved unsquashed: `c1ed67c` Kusama factual correction, `194d6f3` Batch 1 (10 people), `fdae862` Kusama stale-comment cleanup, `cafebd4` Batch 2 (9 people), `37bfc23` closure provenance fix). Editorial coverage 95/95 COMPLETE (Tier A 8/8, Tier B 52/52, Tier C 35/35), 100% Korean coverage. Full detail: `docs/checkpoints/editorial.md`. No `rows`/matching/portrait/monetization changes. Production verified live post-deploy: a newly-completed modern profile (Steve Jobs) and premodern profile (Genghis Khan, including its Complexities section) both render correctly, a Korean profile (Rumi) renders correctly, Yayoi Kusama's lifespan displays `1929–2026`, Directory/Quiz routes load, a previously-editorialized profile (Leonardo da Vinci) still renders normally, zero console errors on every checked page. Prior HEAD `d1b5652` — fast-forward merge of `feat/portrait-muhammad-ali-nywts-1967` (2026-08-28), Portrait Completion: Final Free-Source Recovery — Muhammad Ali. A 1967 bust portrait by Ira Rosenberg, New York World-Telegram & Sun Newspaper Photograph Collection, Library of Congress (digital IDs LC-DIG-ds-13998 / cph.3c15435), verified at item level — not inferred from a different NYWTS photo being clean elsewhere — against both the Commons file page and the LOC catalog record: a pre-1968 staff work-for-hire whose reproduction rights were transferred to the Library of Congress via the collection's Instrument of Gift, the same rights basis already used for Martin Luther King Jr. and Malcolm X earlier in this program. LOC's own rights advisory ("No known copyright restriction") is preserved verbatim rather than strengthened. Resized to 1600px longest side (native 2932×3669), recompressed, no crop needed — already a solo bust portrait with a clean background; served at 1279×1600. Bruce Lee remains HOLD / FREE PATH EXHAUSTED, not touched in this release. Local validation gate: `tsc --noEmit` clean, `vitest run` 670/670, `next build --webpack` clean (confirmed via the Playwright harness's own build-then-serve step after standalone builds intermittently crashed on this machine from worker-process memory contention — an environment constraint, not a code issue; Vercel's own production build succeeded independently, confirmed by the live deployment), `peopleDirectory.spec.ts`/`person.visual.spec.ts`/`compare.visual.spec.ts` 109/109 (full 286-spec Playwright suite not re-run this release). Live production verification (EN ~1280px, KO, ~390px mobile, Directory/PersonCard): correct local portrait `src`, approved uncropped framing, face sharp, attribution/license correct, zero console errors, zero horizontal overflow, zero external portrait dependency; a fresh roster-wide live sweep of all 95 production person pages confirmed **89 local / 0 remote / 6 no-portrait**, all 89 declared local portrait URLs returning HTTP 200. **Portrait delivery: 89 local / 0 remote / 6 no-portrait**, coverage 88/95 → 89/95 (93.7%). Prior HEAD `e5b3b1e` — fast-forward merge of `feat/portrait-phase2d2-ibn-khaldun` (2026-08-28), Portrait Completion Phase 2D-2 — the first production `editorial_nonlikeness` person. Ibn Khaldun: folio 7a from a lifetime manuscript of his own al-Muqaddima — MS Atıf Efendi 1936, Süleymaniye Library, Istanbul — whose own on-page annotation identifies the boxed inscription as being in his handwriting; deliberately **not** upgraded to an unconditional autograph claim, since Rosenthal's scholarly account places this manuscript's confirmed authorial subscription elsewhere in the codex, a discrepancy this program could not independently reconcile with fol. 7a specifically. Every widely-circulated "portrait" of him (stock-image bust, the Tunisian banknote engraving, the Tunis monument) traces to a modern invented face with no historical source; the specific Commons file once titled "Ibn Khaldun.jpg" was deleted twice (2007, 2017) as a copyright violation. Sourced from Wikimedia Commons (Public Domain, faithful reproduction, already in use on English and Arabic Wikipedia), resized to 1600px longest side (native 1788×1282), recompressed, no upscale, no crop — the boxed inscription and its adjacent attribution annotation both stay in frame. First live exercise of the Phase 2D-1 `PortraitCredit` UI treatment: "Editorial visual · Not a likeness" / "편집용 이미지 · 실제 초상 아님" renders above the caption on his page only; verified live that Genghis Khan, Joan of Arc (`historical_depiction`), and Leonardo da Vinci (unclassified) show no label, and that his PersonCard carries no separate badge. One Playwright fixture migrated (`e2e/results.visual.spec.ts`): the "closest match has no portrait" test depended on Ibn Khaldun being portrait-less via `FIXTURES.neutral`; replaced with a new token (deterministic random search over `scoreQuiz`/`buildResultSet`, not handcrafted) whose closest match is Coco Chanel, the same no-portrait-fixture migration pattern used when Socrates gained a portrait. Full validation gate: `tsc` clean, `vitest` **670/670** (669 + 1 new), `next build --webpack` clean, `peopleDirectory.spec.ts`/`person.visual.spec.ts`/`compare.visual.spec.ts` 109/109, full Playwright **286/286** at `--workers=1`, plus a fresh roster-wide live sweep of all 95 production person pages (0 broken, 0 external/non-local portrait `src`). **Portrait delivery: 88 local / 0 remote / 7 no-portrait**, coverage 87/95 → 88/95 (92.6%). Prior HEAD `23b0f46` — fast-forward merge of `feat/portrait-editorial-nonlikeness-ui-2d1` (2026-08-28), Portrait Completion Phase 2D-1 Part 1. Adds `PortraitCredit` (`src/ui/components/portraitCredit.tsx`), which shows one standalone line — EN "Editorial visual · Not a likeness", KO "편집용 이미지 · 실제 초상 아님" — above the existing attribution/license caption on the Person detail page, only when `portrait.kind === "editorial_nonlikeness"`; `historical_depiction` and unclassified portraits render unchanged. Server-side only (reads the full `Person.portrait` the page already has, per `PersonPortrait.kind`'s doc comment in `core/types.ts`); no change to `peopleIndex.generated.ts`, `IdentityHero`'s API, `PersonCard`, or Directory/Similar-People/Results/Compare rendering. No Ibn Khaldun (or any) visual was added — no production person carries this `kind` yet, so this is deliberately a zero-visible-change release; tests use a fabricated `PersonPortrait` fixture (`src/ui/ui.test.ts`), not a real person's provenance. Full validation gate: `tsc` clean, `vitest` **669/669** (663 + 6 new), `next build --webpack` clean, `peopleDirectory.spec.ts`/`person.visual.spec.ts`/`compare.visual.spec.ts` 104/104, full Playwright **281/281** at `--workers=1`. Live production smoke (Genghis Khan and Joan of Arc, both `historical_depiction`; Leonardo da Vinci, unclassified; EN + KO): no label rendered anywhere, captions unchanged, zero console errors, zero horizontal overflow. Portrait delivery unchanged: **87 local / 0 remote / 8 no-portrait**. Prior HEAD `6de9c9c` — fast-forward merge of `feat/portrait-phase2c4-joan-of-arc` (2026-08-28), Portrait Completion Phase 2C-4. Joan of Arc: a miniature from *Les Vigiles du roi Charles VII* (Martial d'Auvergne, c.1484, Bibliothèque nationale de France, Français 5054, fol. 55v) depicting her being conducted to Chinon — painted roughly 50 years after her death, not a lifetime or eyewitness likeness (the only depiction from her own lifetime, Clément de Fauquembergue's 1429 marginal sketch, remains rejected for having no discernible face). Sourced via Wikimedia Commons' BnF/Gallica digitization (`Vigiles du roi Charles VII 08.jpg`), Public Domain. Locally hosted crop (640×1090, native resolution, no upscale, no AI processing, recompressed only) isolates Joan — the sole female figure in the procession, explicitly named in the BnF catalog description — from the full miniature; `kind: "historical_depiction"` set directly at implementation, not backfilled. Full validation gate: `tsc` clean, `vitest` 663/663, `next build --webpack` clean, `peopleDirectory.spec.ts`/`person.visual.spec.ts`/`compare.visual.spec.ts` 104/104, full Playwright **281/281** at `--workers=1`, plus a fresh roster-wide live sweep of all 95 production person pages (0 broken, 0 external/non-local portrait `src`). **Portrait delivery: 87 local / 0 remote / 8 no-portrait**, coverage 86/95 → 87/95 (91.6%). **Zheng He investigated (Phase 2C-2) and classified RIGHTS INQUIRY REQUIRED**: a genuine Ming-era painted clay figure (显应宫/Xianying Temple, Changle, Fujian — one of a "Patrol Sea Minister" devotional group excavated 1992, scholarly-attributed to Zheng He since a 2003 expert panel including the Chinese Academy of Social Sciences) is real and well-documented, but every publicly reachable photograph found (two Fuzhou Changle District government pages, one watermarked) is either too low-resolution or rights-unstated; the likely better source, 郑和史迹陈列馆 (the Zheng He Historical Relics Exhibition Hall, credited elsewhere on the same government pages), was identified but not contacted — no image was implemented. **Rumi re-investigated (Phase 2C-3) and confirmed HOLD**: a broader pixel-level sweep of Morgan MS M.466 (5 folios checked directly, including a third traceable copy of the tradition at the L.A. Mayer Museum, Jerusalem) found every publicly-servable image capped at roughly 310-350px on the short edge for the whole page — a hard resolution ceiling, not just the crowding problem identified in Phase 2A-1 — and confirmed the Morgan's own reproduction policy requires a paid/formal license for any use beyond personal/non-commercial; the Topkapi 1599 sister manuscript (catalog reference K.1479/R.1068 located) has no public digitized viewer found. Prior HEAD `844eca4` — fast-forward merge of `feat/portrait-phase2a-benjamin-banneker` (2026-08-28), the first completed item of Portrait Completion Phase 2 (see the Portrait Completion Phase 2 strategy audit for the full 10-person breakdown into free-source/rights-acquisition/historical-depiction tiers). Benjamin Banneker: the cover woodcut of his own 1795 almanac (*Pennsylvania, Delaware, Maryland, and Virginia Almanac, for the Year of our Lord 1795*; printed for and sold by John Fisher, Stationer, Baltimore; engraver unknown) — published in his lifetime and traditionally associated with him, but explicitly **not** presented as drawn from life, authenticated, or a confirmed likeness (no confirmed portrait of Banneker survives; his possessions were destroyed by fire the day of his funeral). Provenance cross-checked against PBS, the Maryland Center for History and Culture, the People's Graphic Design Archive, and Bedini's biography, which all independently converge on the same account. Recompressed only (mozjpeg quality 85, ~18.5% smaller, no visible linework damage at 4x magnification) — not resized, not upscaled, not AI-processed; native resolution (339×413) exceeds every UI slot's rendered size at every checked breakpoint, so the browser only ever downscales it. Full validation gate: `tsc` clean, `vitest` 662/662, `next build --webpack` clean, `peopleDirectory.spec.ts`/`person.visual.spec.ts`/`compare.visual.spec.ts` 104/104, full Playwright **281/281** at `--workers=1`, plus a fresh roster-wide live sweep of all 95 production person pages (0 broken, 0 external/non-local portrait `src`). **Portrait delivery: 86 local / 0 remote / 9 no-portrait**, coverage 85/95 → 86/95 (90.5%). **Rumi investigated and left at HOLD, deliberately untouched**: the genuinely-traceable source (Morgan Library MS M.466, a 1590s Ottoman illustrated manuscript of Aflākī's hagiography of Rumi, confirmed via the Morgan's own collection records) turned out to be a busy multi-figure narrative miniature with no confidently isolatable solo figure; the one compositionally-plausible alternative found on Commons had no traceable provenance at all. Neither clears this project's evidence bar. Prior HEAD `1a31807` — fast-forward merge of `feat/final-tier-a-portrait-recovery` (2026-08-28). A prior exposure-weighted audit (#1-match frequency, Similar-People in-degree, Directory clustering) ranked Akio Morita, Akira Kurosawa, Martin Luther King Jr., and Malcolm X as the highest-payoff remaining no-portrait people; this batch sourced all four from source families genuinely distinct from whatever blocked each of them before — Morita: a Brazilian state-archive photo (Avelino Ginjo, 1972, Arquivo Público do Estado de São Paulo), a pre-1983 government work so URAA restoration never attaches, cropped from a 4-person meeting scene per an approved crop region; Kurosawa: a 1953 Eiga no Tomo set photo whose Japanese copyright had already expired by 1970 under the old pre-1957-photograph term, before the 1996 URAA reference date, unlike the post-1957 corporate photos rejected earlier in the program; MLK: Dick DeMarsico, 1964, Library of Congress NYWTS collection, pre-1968 work-for-hire via Instrument of Gift (explicitly not the separate federal-§105 LBJ-Library backup found in the same pass); Malcolm X: Marion S. Trikosko, 1964, Library of Congress U.S. News & World Report collection, rights affirmatively dedicated to the public via USNWR's deed of gift, the unmodified original scan (not the colorized or "Remini enhanced" AI-upscaled derivatives found and rejected on Commons). All processed with sharp/mozjpeg (quality 85, 1600px-longest-side ceiling, no upscale, no AI processing); Morita's is the only one requiring a documented crop, the other three are already-solo compositions. Full validation gate: `tsc` clean, `vitest` 662/662, `next build --webpack` clean, `peopleDirectory.spec.ts`/`person.visual.spec.ts`/`compare.visual.spec.ts` 104/104, full Playwright **281/281** at `--workers=1`, plus a fresh roster-wide live sweep of all 95 production person pages (0 broken, 0 external/non-local portrait `src`). **Portrait delivery: 85 local / 0 remote / 10 no-portrait**, coverage 81/95 → 85/95 (89.5%). Prior HEAD `1278609` — fast-forward merge of `feat/final-no-portrait-coverage` (2026-08-28), closing out the No-Portrait Coverage program's active sourcing phase. Sourced and localized 3 more portraits — Octavia Butler (Nikolas Coukouma, CC BY 2.5, 2006 — a real event/signing photograph, not a publisher publicity portrait), Genghis Khan (Yuan dynasty imperial portrait album, c.1350, National Palace Museum Taipei, Public Domain — explicitly posthumous, painted ~120+ years after his death, part of a Yuan court ancestor-portrait tradition, not a lifetime/eyewitness likeness), and Socrates (Eric Gaba/"Sting", CC BY-SA 2.5, Louvre Ma 59 — a Roman-era copy within the ancient Socrates portrait tradition, explicitly not a lifetime or contemporary likeness). All hosted locally under `public/portraits/`, processed with sharp/mozjpeg (1600px-longest-side ceiling, quality 85, no upscale, no AI processing). **Umm Kulthum and Joan of Arc deliberately held**: every Umm Kulthum candidate traced to Pinterest/Facebook with no photographer credit and, on visual inspection, one didn't even resemble her; the sole contemporary Joan of Arc depiction (the 1429 Fauquembergue marginal sketch) is a crude schematic doodle with no discernible facial features, failing the strict hero/PersonCard visual threshold — no later invented likeness was substituted. **Socrates's E2E no-portrait fixture role was migrated to Coco Chanel** (`e2e/person.visual.spec.ts`, `e2e/compare.visual.spec.ts`) after verifying live that no remaining no-portrait person has a single-word display name in both locales (Rumi's English display falls back to the full multi-word canonicalName, no `en.ts` override shortens it); Coco Chanel is firmly HOLD after three separate rounds of sourcing research this program, so a stable long-term fixture, with assertions rewritten to match her real two-grapheme initials ("CC" / "코샤") rather than the old single-word assumption — original test intent (initials fallback renders, sizing matches, EN/KO both covered) fully preserved and re-verified live post-deploy. Verified via a dedicated Chromium script (zero broken images, zero console errors, zero overflow, zero Wikimedia network requests, correct attribution/caveat text) both pre-merge and again live post-deploy, plus a precise `<img src>` check across **all 95 live person pages** confirming zero Wikimedia references anywhere in the roster. Full validation gate: `tsc` clean, `vitest` 662/662, `next build --webpack` clean, 72/72 relevant Playwright specs, full Playwright **281/281** at `--workers=1` (this session repeatedly found a stale `next start` process left over from a prior session occupying the shared test port with an old build — now a known recurring gotcha, not a regression, killed before each run). **Portrait delivery split: 81 local / 0 remote-Wikimedia / 14 no-portrait**, coverage 78/95 → 81/95. |
| `feat/portrait-phase2a-benjamin-banneker`, `feat/final-tier-a-portrait-recovery`, `fix/ko-person-name-corrections-batch-1`, `feat/final-no-portrait-coverage`, `feat/no-portrait-fill-batch-2`, `feat/no-portrait-fill-batch-1`, `fix/portrait-final-remote-replacement`, `fix/portrait-reliability-batch-4`, `fix/portrait-reliability-batch-3`, `fix/portrait-reliability-batch-2`, `feat/portrait-sourcing-batch-1`, `fix/yayoi-kusama-portrait-v2` | Superseded/subsumed, cleanup candidates, not deleted. All are 0 commits ahead of `main` after their respective fast-forward merges (the latter two's portrait-data commits were cherry-picked into their own `-integration` branches, already merged into the history above; stale/unrelated commits on the originals were intentionally dropped). |
| `feat/monetization-v1` | Deliberately isolated, **not merged**, no external payment infra activated. Do not read its docs unless the task is monetization. |
| `chore/consolidated-dev-2026-08`, `chore/context-architecture`, `chore/domain-migration`, `chore/self-made-audit-2026-08`, `fix/mobile-likert-wrap`, `fix/quiz-likert-endpoint-clarity`, `fix/yayoi-kusama-portrait`, `scale/roster-1000`, `feat/editorial-backfill-batch-1..6`, `feat/editorial-qa-pilot`, `feat/launch-readiness-95`, `feat/profile-editorial-depth`, `feat/directory-taxonomy-filter-ux`, `feat/landing-cta-hierarchy`, `feat/profile-hero-polish`, `feat/profile-v2-pilot-batch-1`, `feat/profile-v2-pilot-clean`, `feat/editorial-achievements-correction-batch-1`, `feat/portrait-sourcing-batch-1-integration`, `fix/yayoi-kusama-portrait-v2-integration`, `fix/portrait-reliability-batch-1`, `fix/malcolm-x-ko-name-spelling`, `fix/landing-cta-arrow-spacing` | Fully subsumed by `main` (0 unique commits each) — cleanup candidates, not deleted (no established convention to do so; deletion needs an explicit human decision, not made here). Branch new work from `main`. |

## Product

- **Roster: 95 people, 94 match-eligible.** Zheng He is the sole
  non-match-eligible exception (browsable, fails only the coverage gate).
  Authority: `evaluateMatchEligibility()` in `src/core/matching/similarity.ts`;
  re-run `corepack pnpm@10 exec tsx src/dev/simulate.ts 10000 quiz` for a
  live health check.
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
  `PersonEditorial`): `complexities`/`legacy` remain evidence-gated and
  asymmetric by design — present only where the record supports them,
  never padded. **Life Arc coverage: 49/95** (2026-08, mechanically
  verified). 25 profiles predate the Life Arc Backfill program. **Batch 1**
  (2026-08, merged to `main`) added 12 (Ada Lovelace, Frida Kahlo, Leonardo
  da Vinci, Marie Curie, Yi Sun-sin, Benjamin Franklin, Jane Goodall,
  Mahatma Gandhi, Nelson Mandela, Oprah Winfrey, Srinivasa Ramanujan,
  Wangari Maathai) plus a follow-up factual closure (Jane Goodall's
  `deathYear`/`isLiving`, since corrected). **Batch 2** (2026-08, branch
  `feat/life-arc-backfill-batch-2`, unmerged) added a further 12 (Albert
  Einstein, Ernest Shackleton, Frederick Douglass, Galileo Galilei,
  Hildegard of Bingen, Ibn Sina, Isaac Newton, Jane Austen, Martin Luther
  King Jr., Rabindranath Tagore, Thomas Aquinas, Thomas Edison), same
  P1/P2/P3 provenance model (see that batch's commits for the full audit).
  The remaining 46 profiles still have none of these three fields —
  expected for now, not a gap; `achievements`/`moments`/`turningPoints`
  alone is still a complete profile.
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
