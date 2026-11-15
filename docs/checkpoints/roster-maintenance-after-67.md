# Roster tooling maintenance after Roster67 (2026-11-14)

A bounded **maintenance** task between Roster67 and Roster68. No roster was added, no candidate was touched, no portrait,
scoring, eligibility, taxonomy or editorial-content decision changed, and the legacy raw-id content cleanup was **not** done.
Branch `chore/roster-tooling-maintenance`; PR against `main` (not merged, by instruction). **Roster68 is not started.**

- `MAINTENANCE_BASE_SHA` = `44c9df907c3a51d7bc396a17afd605ca7975ce84`, the normal merge of repaired PR #81 into `main`
  (parents `33921f2042e106d8d2c4aa3ef5599caec6e1eab8` and `1fc64912c0b2a75ef3778a18ad3b6a9a46ec2eab`).

## PR #81 merge and Roster67 state verification

Guards, all mechanically passing before the merge: PR open, not draft, `mergeable` / `CLEAN`, base exactly `33921f2...`, head exactly
`1fc6491...`, 0 behind `main`, Vercel `SUCCESS` and `Vercel Preview Comments` `SUCCESS` on the exact head, 0 review threads, 0 reviews, only the
Vercel bot comment, exactly the four known commits (`51fa151`, `b5de953`, `ea581bc`, `1fc6491`). Merged with a normal merge commit guarded on the
head SHA (no squash, no rebase).

Verified at the base before any maintenance edit: production **816**, directory-visible **815**, match-eligible **114**, candidate JSON **997**;
canonical `categoryCounts.ts`: production science 340 / arts 302 / leadership 156 / building 259, visible science 340 / arts 302 / leadership 155 /
building 258; Walter Reed `["medicine","microbiology"]`; Ernst Mach `["physics","philosophy","psychology"]`; `microbiology` and `psychology` curated under
`science_knowledge` with EN/KO labels (Microbiology/미생물학, Psychology/심리학); the shared editorial raw-id ratchet and its 189-person baseline present; no
Roster68 files.

## Motivation (the three kinds of tooling debt)

1. **Count-sensitive test churn.** Roster67 mechanically edited 44 existing files (+245/-162 lines) only because the cumulative total grew.
2. **Out-of-repository wiring scripts.** Shell heredocs, sed and ad hoc Python were used to assemble roster source, insert Korean names/editorial,
   wire `seed.ts`, bump counts and generate the audit. They repeatedly failed on apostrophe quoting, escaped backslashes (including in this very
   task: a Python `"\\n"` and a `\b` both collapsed through the Bash tool), sed matching and string-insertion mode, and none of it was reviewable,
   reproducible or tested.
3. **Guard reliability.** The `RAW_ID` regex duplicated in the Roster42-66 audits contained literal `0x08` backspace characters where `\b` boundaries were
   intended, so it never matched (root cause found in the Roster67 repair).

## Count-literal inventory and classification (literal measurements at `MAINTENANCE_BASE_SHA`)

| Literal / pattern | Where | Files | Class | Action |
|---|---|---|---|---|
| `expect(SEED_PEOPLE).toHaveLength(816)` + `expect(PEOPLE_INDEX).toHaveLength(816)` | 35 `roster33`-`roster67` audits + 5 legacy remediation audits (`akiraKurosawa`, `legacyIntegrityBatch2-5`) | 40 | CURRENT_STATE_COUNT | relational: `PEOPLE_INDEX.length === SEED_PEOPLE.length` (the test's purpose is index/seed agreement) |
| titles "across all 816 production people", "at 816 people", "(816 people as of Roster47...)" | the same audits | 35 + 40 title strings | CURRENT_STATE_COUNT (stale prose) | count removed from titles |
| `toHaveLength(816)` / `(815)` / roster-lineage regex ending `6[0-7]` | `matchPoolIntegrityAudit.test.ts` | 1 | CURRENT_STATE_COUNT | `CURRENT_ROSTER_MANIFEST` + `latestRoster`-bounded predicate |
| `still exactly 816 production`, `815 visible` | `profilePublicationSeparation.test.ts` | 1 | CURRENT_STATE_COUNT | `CURRENT_ROSTER_MANIFEST` |
| `/^815 people$/`, KO `전체 816명 중 17명` | `e2e/peopleDirectory.spec.ts` | 1 | CURRENT_STATE_COUNT | imports the dependency-free manifest |
| ~700-slug "directory-visible, not eligible" literal sets (+ title enumerating `roster24/25/.../67`) | `profilePublicationSeparation.test.ts` (1 list), `matching.test.ts` (2 lists) | 2 | CURRENT_STATE_MEMBERSHIP | derived from the lineage registry (see below), **set equality proven** against the old literals (701 / 702 slugs) |
| `toHaveLength(114)` match-eligible and "114 eligible outside the N targets" | 36 test files | 36 | stable HISTORICAL_SNAPSHOT (unchanged since Legacy Batch 5; their narrative comments document it) | **left literal on purpose**; a future eligible person must force a deliberate review, and the manifest also pins it |
| per-roster "as of" counts in narrative comments, checkpoint before/after tables, legacy remediation baselines (127 -> 114), fixture sizes | comments, docs | n/a | HISTORICAL_SNAPSHOT / TEST_FIXTURE_COUNT | untouched; none converted to a live value |
| widths/years that happen to equal 815/816 (`width: 816`, "Mount Koya in 816") | candidate/editorial/roster data | n/a | UNKNOWN -> inspected, unrelated | untouched |

Classification totals: **43 test/e2e files carried a live-count literal (816 or 815)**; 2 more carried hand-maintained roster-slug lists;
44 existing files were edited by the Roster67 implementation commit for these reasons.

## Canonical shared-count architecture

- **`src/dev/roster1000/currentRosterManifest.ts`** (dependency-free constants): `latestRoster`, `production`, `directoryVisible`, `matchEligible`,
  `candidateJson`. The one place a roster cycle bumps the numbers; importable by Playwright specs without pulling roster data into any bundle.
  Not imported by `app/` or `src/core`.
- **`src/dev/roster1000/currentRoster.ts`** derives the same values from `SEED_PEOPLE`, `PEOPLE_INDEX`, the lineage registry and the candidate directory
  (filesystem access, dev-side only).
- **`currentRosterState.test.ts`** is the single test that pins live data to the manifest (production, index, visible, eligible, candidate JSON,
  latest registered roster) plus checks on the derived membership. Derivation was preferred wherever a count is a relationship (index == seed); a pinned
  number exists exactly once, so a miscount cannot hide behind a tautology.
- **`src/dev/roster1000/rosterMembership.ts`** derives "published but not eligible" membership from the lineage registry (`NAMED_ROSTERS`):
  roster24+ minus the explicit eligible exceptions (`carl-jung`, `nellie-bly`, `che-guevara`) plus the explicit 13-person legacy list. A future eligible
  person fails the assertion until a human adds an exception, exactly as before.
- Circular imports: none (`rosterMembership` -> `matchPoolIntegrityAudit` -> seed; the manifest has no imports).

## Measured reduction (literal file counts, no target invented)

| | Before | After |
|---|---|---|
| Existing test/e2e files carrying a live count literal (816/815) | **43** | **0** |
| Existing files with a hand-maintained all-roster slug list that grows each roster | **2** (`profilePublicationSeparation.test.ts`, `matching.test.ts`) | **0** |
| Existing files a roster cycle must edit (code/tests, excluding data and docs) | **44** (Roster67 diff; +245/-162 lines) | **3** (`seed.ts`, `matchPoolIntegrityAudit.ts` registry, `currentRosterManifest.ts`), all done by `wireRoster.ts` |
| Existing count-sensitive *test* files to edit | 43 | **0** |

Empirical check: bumping `production` in the manifest alone (816 -> 817, then reverted) fails exactly **3** test files, the three that consume the manifest
(`currentRosterState`, `profilePublicationSeparation`, `matchPoolIntegrityAudit`); every other test is unaffected.

## Checked-in wiring tool

Files: `src/dev/roster1000/wireRoster.ts` (CLI, planning, apply), `wireRosterCore.ts` (pure transformations), `rosterGeneratorCore.ts` (shared generator core),
`templates/rosterAudit.template.txt` (audit skeleton), `wireRoster.test.ts`.

```
tsx src/dev/roster1000/wireRoster.ts --roster 68 --shipped a,b,c --held d,e \
    [--drafts-dir <dir of <slug>.json drafts>] [--after-eligible N] [--candidates-added N] [--intro "<header text>"] [--write]
```

- **Dry run by default**: prints the files it would change, the roster/count transition (`production` and `directoryVisible` must equal before + shipped;
  candidate JSON before + shipped + held unless overridden), shipped/held counts and every problem; `--write` applies only a plan with zero errors, so a partial
  edit cannot happen.
- **Operations**: register `ROSTER_N` in `seed.ts` and `NAMED_ROSTERS`; update the manifest; create the thin `generateRosterN.ts` wrapper and the
  `audits/rosterN.test.ts` skeleton when absent; with drafts, insert EN/KO editorial entries, `PERSON_EDITORIAL` blocks and Korean display names.
- **Checks before touching anything**: the generated `rosterN.ts` exists and lists exactly the shipped slugs; held slugs are not in it; every candidate file exists;
  shipped candidates are `evidence_approved`/`qa_passed` with `portrait.status: found`.
- **Idempotence**: a fully applied edit returns the input unchanged; a partially applied one throws (seed import without spread, half-updated manifest, some editorial
  keys present). Rerunning the tool on the real, already-wired Roster67 reports every operation as a no-op.
- **Fails loudly** on a missing or ambiguous anchor; line endings (LF/CRLF) are preserved; strings are emitted with `JSON.stringify`; the tool uses no regular
  expressions and no shell/sed.
- **Never** decides ship/hold, scores, picks portrait rights, determines eligibility, edits any candidate file (tested: candidate bytes identical after apply and
  no operation targets `data-pipeline/`), rewrites historical checkpoints, fabricates a Korean name (a candidate without one is an error), or changes
  fieldIds/regions/taxonomy/prose. **Taxonomy rule:** if a roster trips the live `>=2 people` Directory-field guard, the tool leaves the failure visible; curate
  the field with EN/KO labels (the Roster67 precedent) rather than narrowing candidates.
- **Editorial validation built in**: draft source ids must be the candidate's own sources, `attributeId` must be a real attribute and a scored row, and readable
  trait names are enforced with the shared detector. Dry-running the tool against the **original Roster67 scratch drafts** reports
  `dayananda-saraswati.interpretation.moment.1 (en): contains raw attribute id(s) conflict_tolerance`, i.e. it catches the exact defect that reached rendered pages in Roster67.
- **Generated audit skeleton** (rendered for Roster67 against live data: 361 tests pass) adds a stricter candidate-vs-production classification check
  (`fieldIds`, `occupationIds`, `regionCode` equal), uses the shared raw-id detector, asserts agreement relationally, and leaves the hold assertions as a **marked
  human review item** (hold tests must reflect the actual blocker type).
- **`rosterGeneratorCore.ts`**: `generateRoster67.ts` became a thin wrapper around it; regenerating `roster67.ts` produced a **byte-identical** file.

External helper-script failure modes eliminated: apostrophe/quote handling (JSON-encoded literals), escaped backslashes and `\b`/`\n` collapse (no regexes, no escape
sequences in tool-generated text, control-character guard), sed anchor mismatch (explicit whole-line anchors that must match exactly once), insertion-mode errors (named
insertion functions with before-the-closing-brace anchors), silent partial edits (plan-then-apply, partial states throw), and unreproducible procedure (checked in, tested).

## Raw-id guard hardening

- Root cause (from the Roster67 repair): the per-roster `RAW_ID` regex had literal backspaces instead of `\b`; the traversed surface (`editorialText()` for each
  `textKey`/`interpretationKey`) was right.
- **`src/core/people/editorialRawIds.ts`** replaces every regex with whole-token string scanning built from the real attribute-id list (immune to escape corruption), exposes
  `findRawAttributeIds`, `collectRawIdLeaks` and `applyRawIdRatchet`, and `editorialValidation.test.ts` uses it. Tests: positive (`conflict_tolerance`,
  `creative_originality`, `proactive_agency` detected), negative (readable prose accepted; no match inside longer tokens), and synthetic ratchet tests (known baseline accepted,
  one new leak fails, readable prose passes, baseline growth fails), none depending on the live roster.
- **Legacy baseline recomputed mechanically**: **189 people, 480 locale texts (515 id occurrences)**, unchanged. The ratchet now enforces: baseline people may remain, no
  person outside the baseline may leak, and the baseline people's leaking texts may not exceed 480 (reducing is allowed, increasing fails). No baseline name was added;
  **no legacy raw-id content was cleaned up**.
- **`noControlCharacters.test.ts`**: a repo-wide guard that tracked `.ts/.tsx/.mjs/.js` sources contain no control characters other than tab/LF/CR, with a frozen baseline of
  the 25 historical audits (`roster42`-`roster66`, backspace only). Fixing one removes its baseline entry; a new offender fails.
- **Historical dead regexes: left unchanged and documented as superseded.** Editing 25 audits would have been a noisy cosmetic diff and, worse, would have made those
  guards live against legacy prose that still contains raw ids (189 older people include Roster42-66 people), so they would fail for a reason unrelated to those audits. The
  shared ratchet owns the forward-looking rule; the roster67 audit's own regex was already fixed and the new audit skeleton uses the shared detector.

## Validation (final state)

- `tsc --noEmit` clean; candidate validation 0 errors / 0 warnings.
- Full Vitest **8852/8852 (100 files)** (Roster67 final: 8807/97; +45 maintenance tests in 3 new files and the extended ratchet).
- Migration equivalence: the registry-derived non-eligible sets were proven set-equal to the old literals before replacement; per-audit diffs are 3 added / 4 removed lines
  each (the count pair and title strings), no historical snapshot became dynamic.
- Calibration run twice: identical output, `meanSd=11.704` (body identical to the Roster67 final runs), dispersion blob hash equal to HEAD (`73e0383...`).
- Production build: `Generating static pages ... (1656/1656)` = 2 x 816 + 24.
- Focused Playwright (Person, Editorial, Directory, Compare, Trait Explanation): **142/142** (2.2 min); the Directory spec now imports the manifest. The full suite was
  not run (no product-visible change; all maintenance code is dev/test-only).
- `categoryCounts.ts` unchanged: production 816 / science 340 / arts 302 / leadership 156 / building 259; visible 815 / 340 / 302 / 155 / 258.
- Scoring lock after the final commit: see the entry appended below.

## Invariants

No candidate JSON, portrait, editorial text, taxonomy, scoring, eligibility or production roster change: candidate files 997 (unchanged), production 816, visible 815, eligible 114.
Changed files fall into: shared-count migration (40 audits, `matchPoolIntegrityAudit.test.ts`, `profilePublicationSeparation.test.ts`, `matching.test.ts`,
`e2e/peopleDirectory.spec.ts`), the count/membership mechanism, the checked-in wiring tool and its template, guard/maintenance tests, and maintenance documentation.

## Recommended next task

Merge this maintenance PR, then start **Roster68** using the checked-in workflow (`generateRoster68.ts` via `wireRoster.ts`, dry run first). The ~1000 scale checkpoint
remains planned for about 1000 production people (184 away); the maintenance does not change that lane. Separate content task still open: the 189-person legacy raw-id
prose cleanup.
