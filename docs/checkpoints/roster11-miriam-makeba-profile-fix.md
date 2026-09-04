# Miriam Makeba live-profile corrective fix (2026-09-04)

Branch: `fix/miriam-makeba-complete-profile`, worktree
`TheGreatInside-miriam-profile-fix`, based on `origin/main` (HEAD at
worktree creation: `c26cae4`, "chore: finalize roster expansion 125
evidence program" — i.e. the already-merged Miriam Makeba promotion from
[`roster11-miriam-makeba-promotion-DRAFT.md`](roster11-miriam-makeba-promotion-DRAFT.md)).

## 1. Why this fix exists

The prior promotion session declared Miriam Makeba's promotion
production-complete from data-layer checks alone (candidate validator,
scoring-lock integrity, `tsc`, `vitest`, i18n audit, duplicate/identity
checks, calibration, matching simulation, sensitivity analysis,
production build) — it never opened the actual rendered product in a
browser. A product-owner report on the live site identified three real
gaps that data-layer checks cannot see:

1. The user-visible roster count claim ("95->96") had not been checked
   against what a user actually sees in the People Directory.
2. Miriam Makeba had no portrait.
3. Miriam Makeba's detail page had no editorial narrative content (no
   Key Achievements / Moments / Turning Points).

All three are confirmed real by this session, with one correction to
how they were characterized: her detail route was never broken or
missing — it always rendered successfully (200, full Trait
Constellation, Sources, Similar/Opposite People) — the actual gap was
that its content was genuinely thin, not that the page failed.

This fix does **not** touch Miriam Makeba's candidate scores,
confidence, evidenceType, provenance, or lifecycle status. It adds two
things the original promotion left out (portrait, editorial content)
and corrects how the count claim is documented. No other person's data
changed.

## 2. Count semantics — established, not changed

Mechanically compared, live, in this worktree:

| Metric | Before Miriam | After Miriam | Where it's measured |
|---|---|---|---|
| `SEED_PEOPLE.length` / `peopleIndex.generated.ts` total | 95 | 96 | `src/data/people/seed.ts`, regenerated index |
| People Directory default (unfiltered) view | 94 | 95 | `explorePeople()`/`filterPeople()`, `src/core/people/explorer.ts` |

Both are correct; they measure different things. `filterPeople()`
defaults `matchEligibleOnly` to `true`:

```ts
const eligibleOnly = filter.matchEligibleOnly ?? true;
```

This is pre-existing, intentional, documented behavior (the function's
own comment: "Excludes profiles the matching engine would exclude.
Default true ... under-evidenced profiles stay independently browsable
via search") — it is **not** something this fix changed, and it did not
change when Miriam Makeba was promoted either. Zheng He
(`isMatchEligible: false`) has been excluded from the default directory
view since before this program started; he is the entire reason the two
numbers above differ by one both before and after. Miriam Makeba herself
**is** match-eligible (`scored=20, avgConf=0.549, coverage=0.606`, well
above `eligibility_v2`'s floor), so her promotion moved both numbers up
by exactly one.

The product owner's "94 to 95, not 95 to 96" observation was an
accurate description of the default-view count. The original
promotion's "95->96" was an accurate description of the total-roster
count. Neither needed correcting; what was missing was documenting that
they are different numbers on purpose. That documentation gap is fixed
in [`roster.md`](roster.md) and
[`CURRENT_STATE.md`](../context/CURRENT_STATE.md) alongside this file.

Verified live in-browser (not just computed): `http://localhost:3050/en-US/people`
renders "95 people" with no filter active; Miriam Makeba's card appears
exactly once; Zheng He does not appear in the unfiltered grid (confirmed
absent from the rendered page text).

## 3. UI reproduction (before this fix's edits)

Checked live against a dev server running from this worktree specifically
(see the caveat below), before any content was added:

- Directory: Miriam Makeba's card rendered correctly — name, dates,
  occupation/era, no console errors. No portrait thumbnail (initials
  fallback would apply if the hero used one; the directory card itself
  simply renders no `<img>` when `portrait` is absent).
- Detail route (`/en-US/people/miriam-makeba`): **200, no error, no
  blank page.** Rendered: initials placeholder ("MM") in place of a
  portrait, name/dates/occupation, Known For tags, Wikipedia/Wikidata
  links, full 20-trait Trait Constellation with evidence-strength
  labels, Similar People, Opposite Profile, Sources list.
- **Missing**: Key Achievements, Moments That Reveal Them, Turning
  Points — all absent, because `PERSON_EDITORIAL` (`src/data/people/
  editorial.ts`) had no `"miriam-makeba"` entry at all.

Caveat worth recording: an early check in this session pointed the
`preview_start` browser tool at `name: "web"`, which launched a dev
server relative to the session's original checkout
(`C:\Users\Lenovo\TheGreatInside`, still on `feat/trait-explanation-ux`
@ `c26cae4`) rather than this worktree — that server showed 94 people
with Miriam Makeba entirely absent, which briefly looked like a real
regression. An isolated Node script run directly against this
worktree's own compiled modules (`PEOPLE_INDEX`, `explorePeople`,
`filterPeople`) returned the correct 95/Miriam-included result,
contradicting the browser. Manually starting `next dev --webpack -p
3050` with the shell explicitly `cd`'d into this worktree first resolved
the discrepancy — the browser tool had simply been driving the wrong
codebase's server. No product bug; a tooling misdirection, diagnosed and
corrected before any conclusions were drawn from it.

## 4. Canonical profile requirements (from Nelson Mandela's live page)

Field-by-field comparison against a complete existing profile
identified the concrete gap list acted on below: portrait +
attribution caption, Key Achievements, Moments That Reveal Them, Turning
Points. (Life Arc / Complexities / Legacy are optional, evidence-gated
sections most roster members don't have — not part of the gap here;
Miriam Makeba's approved evidence doesn't support adding them without
new research, so they remain absent, same as for many other complete
profiles.)

## 5. Editorial content added

Source: **only** Miriam Makeba's own already-approved candidate
rationale (`data-pipeline/candidates/miriam-makeba.json`, carried
verbatim into `roster11.ts`'s row comments) — no new research. Every
fact below already existed in her approved evidence before this
session; nothing here is newly sourced.

Added to `PERSON_EDITORIAL["miriam-makeba"]`
([`src/data/people/editorial.ts`](../../src/data/people/editorial.ts)):

- **2 achievements**: the 1963 UN Special Committee on Apartheid
  testimony and its consequence (passport/citizenship revoked, 30+ year
  exile); ~5 decades popularizing South African/Xhosa musical styles
  internationally.
- **2 moments**: the 1968 Stokely Carmichael marriage and its direct,
  quoted career consequence (record label drop, cancelled US concerts);
  the inability to return even for her mother's funeral, given her
  revoked citizenship.
- **1 turning point**: the redirection of her career from a US
  commercial platform toward international touring/recording built
  around anti-apartheid advocacy, following the 1968 career collapse.
- **2 interpretations**, calibrated language only ("is consistent
  with", never "proves"/"shows"), each tied to one of her own scored
  attributes: the Carmichael-marriage moment to `risk_tolerance` (score
  84, her single highest-confidence row); the turning point to
  `autonomy_need`/`independent_thinking`.

Deliberately **not** added: any biographical fact not present in her
approved sources (e.g. "Pata Pata," Grammy history, the *Come Back,
Africa* documentary, the Harry Belafonte collaboration) — these are
real and well-known but are not in her candidate JSON's rationale text
or source list, so adding them would have been new research, which this
task's instructions explicitly prohibited. No `lifeArc`, `complexities`,
or `legacy` section — the approved evidence doesn't support them without
padding.

Prose written per `docs/editorial-content.md`'s Editorial Writing
Standard v1: 2-3 sentences, source-grounded, fact/interpretation kept in
separate fields (`textKey`/`interpretationKey`), no diagnostic language.
English and Korean both written directly (Korean is a semantic
adaptation, not a literal machine translation) — `editorialText()` is
locale-strict, so a missing Korean entry would have silently omitted the
item rather than showing English or a raw key; both locales were written
together specifically to avoid that gap.

`corepack pnpm@10 exec vitest run src/core/people/editorialValidation.test.ts`:
**20/20 pass** (no duplicate item ids, every `textKey`/`interpretationKey`
resolves, every `attributeId` real, every `sourceId` a subset of Miriam
Makeba's own sources).

## 6. Portrait added

**Status: found, not blocked.** Per the earlier explicit product
decision on this promotion ("repo convention governs" — no-portrait is
a valid, already-supported production state, matching 6 other roster
members), sourcing a portrait was not required to avoid a block: it was
attempted anyway per this fix's own instructions ("use approved existing
reference if found; otherwise follow repo-authorized sourcing ...
BLOCKED_MISSING_APPROVED_PORTRAIT only if genuinely unobtainable"), and
succeeded.

No existing approved portrait reference existed anywhere in the
repository (her candidate JSON has no `portrait` field; no checkpoint
mentions one) — sourced fresh, following this project's established
Wikimedia Commons rights-verification pattern (see `roster10.ts`'s
"No-Portrait Fill Batch" entries for the precedent this follows).

- **Image**: [File:Miriam Makeba, Bestanddeelnr 922-1835 (cropped).jpg](https://commons.wikimedia.org/wiki/File:Miriam_Makeba,_Bestanddeelnr_922-1835_(cropped).jpg),
  Wikimedia Commons.
- **License**: CC0 1.0 Universal Public Domain Dedication — unambiguous,
  no rights uncertainty.
- **Provenance**: Nationaal Archief (Dutch National Archives), Fotocollectie
  Anefo. Photographer Rob Mieremet, 7 March 1969, "Grand Gala du Disque
  Populaire" event. A candid backstage/dressing-room photograph (mirror
  reflection visible), not a posed studio portrait — same category of
  source this project has used before (cf. Akio Morita's 1972 candid
  photo in `roster10.ts`) when it's the strongest rights-clear option
  available. Face clearly visible, in focus, engaged with the camera.
- **Processing**: downloaded the original (2455×2230, 846 KB), resized
  to 1236×1123 (matches this project's typical portrait long-edge
  range) and re-encoded via Pillow at quality 85 (258 KB) — no crop
  beyond Commons' own pre-existing "(cropped)" extract, no upscale, no
  AI processing.
- **File**: `public/portraits/miriam-makeba-grand-gala-1969.jpg`.
- **Wiring**: added directly to `src/data/people/roster11.ts`'s
  `portrait` field (following the established precedent that
  `generateRoster11.ts`, like `generateRoster10.ts`, never emitted a
  `portrait` field even when `toPersonSeed()` supports one — every
  existing "No-Portrait Fill Batch" portrait in this repo was added by
  hand-editing the already-generated roster file directly, not by
  round-tripping through the candidate JSON + generator). Consistent
  with that same precedent, `data-pipeline/candidates/miriam-makeba.json`
  itself was **not** given a `portrait` field — an initial attempt to
  add one there and regenerate via `generateRoster11.ts` was reverted
  once it became clear the generator doesn't read that field at all
  (confirmed: no other promoted candidate's JSON carries a `portrait`
  field either, including ones with live portraits like Akio Morita's).
  `src/data/people/peopleIndex.generated.ts` was regenerated
  (`generatePeopleIndex.ts`) to pick up the new `portraitUrl` for the
  Directory grid — a clean 1-line additive diff.
- `kind` deliberately left unclassified (`undefined`) — same default
  most already-implemented portraits use; this is a candid event photo,
  not a claim about historical-depiction tradition.

Verified live in-browser: portrait renders on the detail-page hero
(`.tgi-identity-hero__portrait img`, no `.tgi-identity-hero__placeholder`
fallback) with the full attribution caption ("Rob Mieremet / Anefo, 7
March 1969 — Nationaal Archief ... CC0 1.0 Universal Public Domain
Dedication", linking to the live Commons file page); and on her
People Directory card (`.tgi-personcard img.tgi-personcard__portrait`,
confirmed via DOM inspection — `src="/portraits/
miriam-makeba-grand-gala-1969.jpg"`).

## 7. E2E coverage added

New file: [`e2e/miriamMakebaProfileFix.spec.ts`](../../e2e/miriamMakebaProfileFix.spec.ts),
5 tests, all passing:

1. Directory default (unfiltered) view shows exactly "95 people"; Miriam
   Makeba's card appears exactly once.
2. Her card is clickable (its link resolves), its portrait `<img>`
   renders with the correct `src`, and her detail route responds 200.
3. Her detail-page hero renders a real portrait (not the initials
   fallback) with correct attribution text and a working CC0 license
   link.
4. Her detail page renders real Key Achievements / Moments / Turning
   Points content (specific substrings asserted, not just heading
   presence) and contains no raw editorial i18n key anywhere in the
   page text (en-US).
5. Same content check in Korean (ko-KR), plus confirms no raw
   `person.name.miriam-makeba`-style key leaks either.

## 8. Full validation suite (this session, in this worktree)

| Check | Command | Result |
|---|---|---|
| Candidate validator | `tsx src/dev/roster1000/validateCandidates.ts` | 0 errors, 0 warnings; `held` 121 / `qa_passed` 61 (unchanged) |
| Scoring-lock integrity | `tsx src/dev/roster1000/checkScoringLockIntegrity.ts` | 0 flagged (182 files) |
| Editorial validation | `vitest run src/core/people/editorialValidation.test.ts` | 20/20 |
| Typecheck | `tsc --noEmit` | clean |
| Full unit/integration | `vitest run` | **689/689** |
| i18n audit | `tsx src/dev/i18n-audit.ts` | 0 missing keys, every bucket |
| i18n identity/determinism check | `tsx src/dev/i18n-identity-check.ts` | deterministic scores hash, unchanged |
| Calibration (run twice) | `tsx src/dev/calibrate.ts quiz` ×2 | identical output both runs; `dispersion.generated.ts` byte-identical to `main` (no drift — this fix touches no trait scores) |
| Matching simulation | `tsx src/dev/simulate.ts 10000 quiz` | vs 96 people; max #1 frequency 12.0% (Warren Buffett), unchanged, well under 20% threshold |
| Sensitivity analysis | `tsx src/dev/sensitivity.ts` | pass (no matching/scoring code touched) |
| Production build | `next build --webpack` | clean, 216 static pages |
| Full Playwright | `playwright test --workers=1` | **305/305** (300 pre-existing + 5 new) |
| New e2e coverage | `playwright test e2e/miriamMakebaProfileFix.spec.ts` | 5/5 |
| Direct browser inspection | manual, this worktree's own dev server (port 3050) | portrait + editorial content confirmed rendering correctly, both locales, no console errors |

No `rows`/score/confidence/evidenceType/provenance/lifecycle change on
Miriam Makeba or any other candidate or person. No other person's
portrait, editorial content, or roster data touched.

## 9. Scope discipline

- Did not start roster12 or promote any other candidate.
- Did not change Miriam Makeba's candidate scores, confidence, evidence,
  provenance, or lifecycle — `git diff` against
  `data-pipeline/candidates/miriam-makeba.json` is empty (the earlier
  portrait-field attempt there was reverted, per §6).
- Did not perform new personality-scoring research.
- All editorial content traces to her already-approved candidate
  rationale; nothing invented.
- Portrait sourced under this repo's existing rights-verification
  standard (CC0, unambiguous, provenance documented) — not
  AI-generated, not a placeholder, not uncertain/unlicensed.
- `next-env.d.ts` (this worktree's own dev-server-regenerated copy) left
  untouched in the final diff — reverted after inspection, not part of
  the deliverable. The original checkout's (`C:\Users\Lenovo\
  TheGreatInside`) unrelated unstaged `next-env.d.ts` change was never
  touched at all.
