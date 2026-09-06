# Roster-18: stricter multi-source intake, research-only outcome (2026-09)

Branch: `feat/roster18-multisource-intake`. This cycle was commissioned
directly out of the roster-17 evidence-integrity correction (see
[`roster17-intake-and-safety.md`](roster17-intake-and-safety.md)) with an
explicit instruction: prepare the next candidate-intake cycle under a
**stricter** multi-source evidence gate, and accept whatever lifecycle
outcome the real research produces — do not restore or rescore John von
Neumann, do not rescue the six roster-17 held candidates, and do not begin
production roster18 until new candidates actually pass the stronger gate.

## 1. Why roster-17 failed, in one sentence

Roster-17's John von Neumann pack claimed two named biographies had been
"cross-checked" when only Wikipedia had actually been fetched, and 16 of
23 scored rows re-derived from the same 2-4 achievement facts repackaged
into nominally-distinct attribute rows — a single real source, dressed up
as several. The correction that followed replaced that pack with a
genuinely multi-source one (a real National Academy of Sciences memoir
plus a scholarly essay quoting his resignation letter and firsthand
witnesses) and the honest result was a narrower, more defensible profile
that fell below the eligibility floor. The promotion was reverted.

## 2. The new binding gate (established this cycle, applies going forward)

1. **Minimum source-depth gate.** At least 2 genuinely independent,
   *actually opened and read* source classes per candidate before any
   scoring. Wikipedia may orient the research but is never counted as one
   of the two.
2. **Incident-depth gate.** A behavioral incident ledger — specific,
   dated, sourced incidents — is built and frozen *before* any row is
   scored. A cluster of facts that all trace back to one underlying
   achievement (one office held, one prize, one book) must not be split
   across multiple nominally-distinct attribute rows.
3. **Diversity-of-behavior gate.** The ledger must include at least one
   real constraint, conflict, or setback domain where the record actually
   supports it. A purely flattering profile does not proceed to scoring
   without an explicit note that no adverse material was found (and even
   then, is treated with extra skepticism).
4. **Source-to-row traceability gate.** Before scoring, each candidate
   gets an explicit pre-score disposition: ready to score, source-depth
   insufficient, behavioral-breadth insufficient, or structurally thin.

## 3. Discovery pool and freeze

A fresh discovery pool of 15 people was built, explicitly excluding: all
125 live production people; every candidate JSON already on file from any
prior cycle (roster9-17), held or rejected; and Che Guevara, Nellie Bly,
Carl Jung, Katharine Hepburn (deferred/target-cap candidates from earlier
cycles). Diligence was prioritized over throughput — 15 candidates, not
30-40.

8 were frozen after a breadth+depth preflight (multiple life periods,
multiple behavioral domains, no single-source dependence, real books/
memoirs plausibly available, not just many search results):

| Candidate | Field | Why frozen |
|---|---|---|
| Linus Pauling | Chemistry | Two unshared Nobel Prizes; NAS memoir by a close colleague (Dunitz) documents a real intellectual-humility episode, a real interpersonal/legal conflict, and sustained public controversy |
| Elinor Ostrom | Political economy | First woman to win the Nobel in Economic Sciences; NAS memoir documents real 1954 labor-market discrimination and a concrete later act of financial self-sacrifice |
| Norman Borlaug | Agronomy | "Green Revolution"; NAS memoir by a personal acquaintance documents concrete field-work habits, a real family-cost admission, and a real ongoing public conflict with environmentalist critics |
| Emilio Segrè | Physics | Co-discoverer of two elements and the antiproton; NAS memoir is unusually candid about a difficult, aloof personality and a documented grievance over recognition |
| Luis Alvarez | Physics | Extraordinarily broad invention record; NAS memoir (Trower, a close collaborator) is the richest single source of the eight, including documented flaws (no intellectual consistency, a real falling-out with a lab director) |
| I. I. Rabi | Physics | Invented the technique underlying MRI; NAS memoir plus encyclopedia entry together document a real early-career drift and specific working-style quotes |
| Maria Goeppert Mayer | Physics | Second woman to win the Nobel in Physics; NAS memoir (written by her first PhD student) documents nine unpaid years under a nepotism rule and a vividly witnessed discovery incident |
| Rosalyn Yalow | Medical physics | Co-inventor of radioimmunoassay; no NAS memoir could be located, but a PMC/NIH tribute article documents unusually explicit, quoted discrimination and two principled refusals (an award, a patent) |

## 4. Research actually performed (Part H)

For each candidate, at least one source was fetched as a raw PDF/HTML
document and read in full via the WebFetch-to-Read-tool pipeline (WebFetch
cannot parse PDF text directly, but it saves the binary locally, which the
Read tool then extracts correctly) — not merely cited from a Wikipedia
summary. Two WebFetch attempts on `nobelprize.org` returned 403 Forbidden
and that source class was abandoned as inaccessible for this pipeline.
One candidate-specific second-source lead cited directly in a memoir's own
references (an Annual Reviews interview transcript for Ostrom) was
attempted and returned a dead link (404) — not substituted with a weaker
source merely to preserve the appearance of a full pass; the two sources
actually read for Ostrom are reported honestly as the thinnest evidence
base of the eight.

Sources actually opened and read, by candidate:

- **Pauling**: Dunitz's 1997 NAS memoir (PDF); Encyclopedia.com/CDSB entry.
- **Ostrom**: McCay & Bennett's 2014 NAS memoir (PDF); Encyclopedia.com entry.
- **Borlaug**: Phillips's 2013 NAS memoir (PDF); Encyclopedia.com entry.
- **Segrè**: Jackson's 2002 NAS memoir (PDF); Encyclopedia.com entry.
- **Alvarez**: Trower's 2009 NAS memoir (PDF); Encyclopedia.com/CDSB entry.
- **Rabi**: Ramsey's 1993 NAS memoir (PDF); Encyclopedia.com entry.
- **Mayer**: Sachs's 1979 NAS memoir (PDF); Encyclopedia.com entry.
- **Yalow**: PMC/NIH tribute article ("Madame Curie from the Bronx");
  Encyclopedia.com entry.

One methodological note for future sessions: an early WebFetch attempt on
a corrupted-looking PDF returned a plausible-sounding but generic,
non-quotative summary for Alvarez ("colleagues noted...", vague and
unsourced) rather than an error — this was recognized as likely
hallucinated rather than extracted, and discarded in favor of the
Read-tool-on-saved-binary path, which then produced a genuinely rich,
quote-dense result from the same file. A WebFetch response that reads as
generic paraphrase rather than specific quotation, especially after a
"corrupted PDF" disclaimer, should be treated as suspect and re-verified
via direct extraction, not accepted at face value.

## 5. Scoring and validator outcome (Part I)

Each candidate was scored once, conservatively, from the frozen incident
ledger — including unflattering incidents where the record supported them
(Segrè's documented aloofness and recognition grievance; Alvarez's
documented lack of intellectual consistency and his falling-out with lab
director McMillan; Pauling's documented discriminatory hiring conduct
alongside his vitamin-C controversy; Rabi's three-year post-graduation
"floundering"; Mayer's "distaste" toward wartime bomb-adjacent work). The
real validator (`corepack pnpm@10 exec tsx src/dev/roster1000/
validateCandidates.ts`) was then run once against all 8, and the resulting
lifecycle was accepted mechanically — no score, confidence, or row was
touched after seeing the output.

| Candidate | Scored attributes | Coverage | Avg. confidence | High-conf (>=0.5) count | Eligible |
|---|---:|---:|---:|---:|---|
| Linus Pauling | 14 | 0.423 | 0.523 | 9 | false |
| Norman Borlaug | 14 | 0.426 | 0.505 | 8 | false |
| Luis Alvarez | 13 | 0.393 | 0.513 | 7 | false |
| Emilio Segrè | 11 | 0.334 | 0.483 | 4 | false |
| I. I. Rabi | 11 | 0.330 | 0.465 | 3 | false |
| Maria Goeppert Mayer | 10 | 0.311 | 0.480 | 4 | false |
| Rosalyn Yalow | 9 | 0.274 | 0.503 | 5 | false |
| Elinor Ostrom | 8 | 0.245 | 0.434 | 1 | false |

Floor required for `eligibility_v2`: >=18 scored attributes, >=0.6
coverage, >=12 attributes at confidence>=0.5 with their own average
>=0.55. **All 8 candidates fall short, most by a wide margin.**

This is a genuinely different failure mode than roster-17's: roster-17's
von Neumann pack was thin because it was fake-multi-source (one real
fetch dressed up as several); roster-18's 8 packs are thin because they
are honestly two-source, and two real secondary/tertiary sources — even
an unusually rich one like Alvarez's NAS memoir — cannot reach the depth
a committed-roster profile needs on their own. Reaching the 18-attribute
floor for a person like this would very likely require a full-length
biography (the kind roster14-16's deeper research passes drew on), not
just the two documents actually available and readable within this
session.

## 6. Pre-promotion audit (Part J) and portrait/editorial work (Part K)

Not applicable this cycle: zero candidates reached `qa_passed`, so there
was nothing to audit and no portrait or bilingual editorial work was
undertaken. Per the standing instruction, this is committed honestly as a
research-only outcome rather than forcing a production file into
existence.

## 7. Validation actually run

- `corepack pnpm@10 exec tsx src/dev/roster1000/validateCandidates.ts` —
  0 errors, 0 warnings across all candidates (including the 173 pre-existing
  ones, unaffected); all 8 roster-18 candidates report `held` with the
  table above.
- `corepack pnpm@10 exec tsc --noEmit` — clean.
- `corepack pnpm@10 exec vitest run src/core/people/rosterQuality.test.ts`
  — 18/18 passing, confirming the roster-batch import-completeness guard
  (added during the pre-250 hygiene pass earlier this arc) sees no change,
  because none was made.
- `git status` in the worktree shows exactly 8 new files, all under
  `data-pipeline/candidates/`, nothing else — no roster file, no seed
  import, no generated index/dispersion, no editorial, no i18n, no
  portrait. Production is byte-for-byte unaffected by this branch.

## 8. Outcome

**`NO_PRODUCT_READY_QA_PASSED`** — 8 candidates genuinely researched under
a stricter gate than roster-17's, all held honestly on coverage/attribute-
count grounds, zero promoted, roster unchanged at 125 people / 124
match-eligible. The 8 held candidate JSONs are committed as legitimate,
reusable research: a future session with access to full-length
biographies for any of them (Vietmeyer's Borlaug trilogy, Hoffman-style
deep biographies for the physicists, or a full Ostrom biography) could
extend the same incident ledgers rather than starting over, since the
sources already consulted and the incidents already frozen are recorded
in each file's `sources` and `provenance.notes`.
