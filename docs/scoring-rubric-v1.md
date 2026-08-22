# Trait scoring rubric — `scoring_rubric_v1`

Formalizes the scoring methodology this project's existing 35 people were
already built against (visible in `src/data/people/seed.ts`/`roster2.ts`'s
inline evidence comments and `src/data/people/builder.ts`'s authoring
discipline), so a resumable offline pipeline can apply it consistently
across hundreds of new candidates without re-deriving it from scratch each
session. Not a new personality theory — the taxonomy stays the existing
34-trait / 7-facet `taxonomy_v1.1` (`src/core/attributes/attributes.ts`).

This document is itself versioned (`scoring_rubric_v1`) independently of
`SCORING_VERSION` (`scoring_v1`, the numeric formula in
`src/core/quiz/scoring.ts` that turns quiz answers into a user's scores) —
this rubric governs how a *person's* evidence becomes a score, a
human/pipeline judgment process, not a code formula. Bump this file's own
version if the methodology changes; it does not require a `SCORING_VERSION`
bump (that formula is untouched by anything in this document).

## 1. The four fields, and why they are not one field

Every scored attribute already carries four separate fields
(`PersonAttribute`, `src/core/types.ts`):

```
score:        Score        (0-100, "where on this dimension")
confidence:   Confidence   (0-1, "how sure are we this score is right")
evidenceType: EvidenceType ("documented" | "strong_inference" | "inference")
impact:       TraitImpact  ("advantage" | "dual_edged" | "risk" | "neutral")
```

**Score and confidence answer different questions and must never be
conflated.** A score of 90 with confidence 0.3 is a genuinely different
claim from a score of 90 with confidence 0.9 — the first says "if this
trait is measurable at all, it looks high, but we're not sure the
measurement is right"; the second says "we're confident this is high."
Weak evidence must lower `confidence`, never inflate or deflate `score`
to compensate. `evidenceType` is the human-readable reason *why*
confidence is what it is (documented fact vs. reasoned inference vs.
weaker inference) — `confidence` is the numeric summary a pipeline/gate
can threshold on; `evidenceType` is what a reviewer reads.

`impact` is never a property of the trait alone — it is *person ×
attribute × context*. The same trait can be `advantage` for one person
and `risk` for another (Buffett's low `risk_tolerance` is `advantage` in
value investing; the same low score could be `risk` for someone whose
career required fast, bold bets). Never assign `impact` by attribute
stereotype.

## 2. What counts as evidence, per evidence type

| `evidenceType` | What it means | Example |
|---|---|---|
| `documented` | A specific, attributable action, decision, or directly-quoted statement from a reputable source, describing a concrete instance of the behavior. | "Reorganized his entire research program around a single anomalous result for three years, at the cost of two other active projects" (documented, cited). |
| `strong_inference` | A well-supported pattern across multiple documented instances, or a documented outcome whose most plausible explanation is the trait, even without a single named "smoking gun" moment. | A person's biography documents five separate career pivots into unrelated fields, each independently well-sourced — supports `cross_domain_range` as strong_inference, even with no single quote saying "I love changing fields." |
| `inference` | A single weaker signal, an editorial characterization by a biographer without a specific cited instance, or a plausible-but-not-directly-evidenced reading of otherwise-documented facts. | A biographer's summary adjective ("famously stubborn") with no specific cited incident. |

**What does NOT count as evidence, for any evidence type:**
- Personality-test sites, biography farms, SEO content, unsourced social
  posts, other trait-comparison products' own output.
- A person's occupation or era used as a stand-in for a trait ("he was a
  general, so `competitiveness` must be high").
- Fame, wealth, or historical prominence itself.
- A single colorful anecdote with no corroboration, used to justify an
  *extreme* score (a single anecdote can support a *moderate* inference,
  never a 90+ or sub-15 score on its own — see §4).
- Modern retrospective psychological labeling ("he was clearly
  narcissistic") — see `CLAUDE.md`'s "Safety" section; this rubric
  inherits that rule unchanged.

## 3. Confidence bands

Confidence is not the reviewer's gut feeling — it is a function of
*how much independent evidence exists* and *how directly it speaks to
the trait*:

| Confidence | Criterion |
|---|---|
| 0.85 - 1.0 | Multiple independent `documented` instances, from more than one source, directly on-point for this specific trait. |
| 0.65 - 0.84 | One strong `documented` instance, or multiple `strong_inference` instances that converge. |
| 0.50 - 0.64 | A single `strong_inference`, or multiple weaker `inference`-level signals that agree with each other. |
| 0.20 - 0.49 | A single `inference`-level signal, or documented evidence that is suggestive but not squarely on-point for this exact trait. |
| Below 0.20 | Do not score. Leave the attribute unscored — this project's own existing convention (`scoring_v1`) already treats an unscored attribute as a floor-confidence neutral 50 at *quiz* time; the same "absence is honest, a guessed number is not" discipline applies to *person* scoring. |

These bands are guidance for a human/pipeline reviewer's judgment, not a
mechanical formula — two `documented` instances that are both thin and
tangential are worth less than one that is squarely on-point. When in
doubt, score the lower band.

## 4. Score bands and the evidence-strength-vs-extremity rule

**The core anti-fake-precision rule: the more extreme the score, the
stronger the evidence must be.** A score of 55 needs far less to support
it than a score of 95.

| Score range | Meaning | Minimum evidence bar |
|---|---|---|
| 45-55 | Unremarkable on this dimension — no strong signal either way, or genuinely mixed/contextual evidence. | This is the SAFE DEFAULT when evidence is thin or contradictory. No special justification needed to land here. |
| 56-70 / 30-44 | A real, evidenced lean in one direction. | At least one `strong_inference` or `documented` instance. |
| 71-84 / 16-29 | A clear, well-evidenced pattern. | At least one `documented` instance AND at least one corroborating `strong_inference`, OR multiple independent `documented` instances. |
| 85-100 / 0-15 | An extreme, defining characteristic. | Multiple independent `documented` instances from more than one source, with no significant contradicting evidence. Reserve for traits genuinely central to how the person is understood historically — not "seems high," but "this is one of the two or three things everyone who studies this person's life converges on." |

**A single quote or anecdote never justifies an 85+ or sub-15 score on
its own**, regardless of how vivid it is — this is the exact "eccentric
anecdote = extreme score" failure mode Section 6 of the roster-expansion
brief names explicitly. If the ONLY evidence for an extreme score is one
memorable story, the honest score is in the 71-84/16-29 band at most,
with `evidenceType: inference` or `strong_inference`, not `documented`.

## 5. Contradictory evidence

When evidence points in different directions on the same trait:

1. **Do not average toward a fake middle unless the evidence genuinely
   is mixed.** If Source A says the person was famously patient and
   Source B documents a specific instance of them abandoning a project
   after one setback, that is not "so the score is 50" — read both
   accounts for what they actually describe (were they patient in most
   domains but not this one? did their patience change over their
   life?) and either score the more specific, better-corroborated claim,
   or lower `confidence` to reflect genuine unresolved conflict.
2. **Prefer the more specific, better-sourced account** over a general
   characterization when they conflict.
3. **A genuine, well-documented contradiction is itself information** —
   it may mean the trait is real but context-dependent (which is what
   `impact: dual_edged` exists to capture on the *person's own* profile,
   independent of score), or it may mean the person's behavior on this
   dimension genuinely changed over their life (in which case, score
   the pattern that dominates the majority of their documented life/
   career, and consider whether the earlier/later exception belongs in
   `doNotCopyKeys` editorial content instead of the trait score).
4. When irreducibly unresolved: lower `confidence` into the 0.20-0.49
   band rather than picking a side arbitrarily.

## 6. Explicit anti-patterns (from the roster-expansion brief, made concrete)

| Anti-pattern | What it looks like | The fix |
|---|---|---|
| Halo effect | "She was clearly brilliant, so `curiosity` must be 90+." | Score `curiosity` from evidence *of curiosity specifically* (documented exploration, question-asking, cross-domain interest) — not from the person's general reputation for brilliance, which is a different (and separately real) thing. |
| Fame = high score | "He's one of the most famous X in history, so his `X`-relevant traits must all be extreme." | Fame correlates with achievement, not with every trait being extreme. A famous person can be thoroughly unremarkable — even low — on traits unrelated to what made them famous. |
| Success = high score | "The venture succeeded, so `risk_tolerance`/`planning_orientation`/etc. must all be high." | Success has many causes (luck, timing, other people's contributions, structural advantage). Score the trait from evidence of the BEHAVIOR, not backward from the OUTCOME. |
| Eccentric anecdote -> extreme score | One vivid, widely-repeated story becomes the sole basis for a 90+ score. | See §4 — a single anecdote caps at the 71-84/16-29 band regardless of how vivid it is. |
| One quote determines a whole trait | A single interview quote is treated as settling the score. | A quote is `inference`-level evidence at best unless corroborated by documented behavior — see §2/§3. |
| Occupational stereotype | "She was a general/scientist/artist, so trait X must be [stereotype for that occupation]." | `occupationIds` must never be read as evidence for a trait score. Score from the person's own documented behavior, not their job title's cultural connotation. |
| Biography tone determines score | A hagiographic biography's admiring tone is read as evidence of high scores across the board; a critical biography's tone is read as evidence of low scores across the board. | Read PAST the biographer's editorial tone to the specific facts being described. A critical biography can still document real strengths; an admiring one can still document real flaws. |

## 7. Confidence vs. `overallProfileConfidence` and match eligibility

Nothing in this rubric changes the existing, already-computed
`evaluateMatchEligibility` gate (`src/core/matching/similarity.ts`):
minimum 18 scored attributes, minimum average confidence 0.55, minimum
coverage 0.6 of total taxonomy weight, status in `{"approved",
"published"}`. This rubric exists to make sure the *scores feeding into*
that gate are honestly arrived at — it does not loosen or tighten the
gate itself. A candidate who cannot honestly clear 18 attributes at
confidence >= roughly-band-3-or-higher on average should be held or
rejected, not padded with low-confidence guesses to hit the count.

## 8. Ancient/medieval evidence discipline (unchanged, restated)

For historical figures where only administrative/chronicle-level sources
survive (matching this project's existing treatment of Confucius,
Socrates, Genghis Khan, Zheng He, Rumi, Ibn Khaldun), it is expected and
correct to score fewer attributes (the existing project's own
18-22-of-30 pattern) at correspondingly capped confidence (this project's
existing ceiling of roughly 0.7, `strong_inference` not `documented`) —
never to force all 34 attributes to reach the same resolution a
primary-source-rich modern biography supports. This is not a lower
standard; it is the honest one.

## 9. What a completed evidence manifest entry looks like

One attribute, one person, one entry — the unit the offline pipeline
(`docs/archive/session-history/roster-1000-checkpoint.md`) produces and a future reviewer can
audit without re-deriving the reasoning from scratch:

```
attributeId: "cross_domain_range"
score: 78
confidence: 0.72
evidenceType: "strong_inference"
impact: "advantage"
reasonSummary: "Documented sustained, self-directed work across at least
  four unrelated fields (X, Y, Z, W) over a 20-year span, each with real
  output (not dabbling) — [source A], [source B]. No single quote framing
  this as deliberate breadth-seeking, hence strong_inference rather than
  documented; multiple independent, corroborating instances support the
  70s band rather than the 50s."
sourceIds: ["src_a_id", "src_b_id"]
```

`reasonSummary` is a concise audit trail (a few sentences), not
chain-of-thought — it should let a future reviewer understand *why* this
score exists without re-reading every source from scratch, matching the
existing inline-comment discipline already visible in `seed.ts`/
`roster2.ts` (e.g. the Buffett `opportunity_sensing` correction, the Ibn
Khaldun `resourcefulness` removal — both real precedents for exactly
this kind of documented, reasoned score decision).

## 10. Scoring/eligibility separation and the confidence-change policy
## (added roster-1000 session 11, after a real threshold-driven-scoring
## incident — see `docs/archive/session-history/roster-1000-checkpoint.md` §75-77)

**Evidence extraction, attribute selection, `evidenceType`, `confidence`,
and `score` must all be finalized BEFORE eligibility is evaluated.**
`evaluateMatchEligibility` (`src/core/matching/similarity.ts`) is a
downstream diagnostic on locked scoring — never a target to score
toward. A real incident (session 11, 2026-08) found a 20-candidate batch
where confidence values were iteratively adjusted, computing exact
numeric targets, until `highConfidenceCount`/`highConfidenceAverage`
crossed `eligibility_v2`'s admission floor. This is exactly the failure
mode this section exists to prevent.

**Any change to an already-scored row's `confidence`/`evidenceType`
must be attributable to one of three reasons — never a fourth:**

```
A. NEW_EVIDENCE        A genuinely new substantive source/evidence item
                        changed what's actually known about the person.
B. RUBRIC_CORRECTION   The prior stored classification demonstrably
                        contradicted an explicit rule in this document
                        (see the objective strong_inference criterion
                        below) -- and the SAME correction criterion
                        must be checked across the rest of the corpus,
                        not applied only to the one candidate currently
                        failing eligibility.
C. ERROR_CORRECTION    A mechanical/data-entry mistake.

NOT ALLOWED, ever:
D. ELIGIBILITY_REMEDIATION   Changing confidence/evidenceType because
                              scored-attribute count, coverage,
                              high-confidence count, high-confidence
                              average, or the eligible/held result
                              itself came out wrong. Eligibility is
                              read, never written to.
```

**Objective, corpus-wide `strong_inference` criterion.** §3's confidence
bands above are unchanged, but this document narrows *which* branch of
the `strong_inference` definition (§2) is treated as objectively,
mechanically verifiable for the purpose of a corpus-wide consistency
check: `strong_inference` is defined disjunctively — "a well-supported
pattern across multiple documented instances, OR a documented outcome
whose most plausible explanation is the trait." The second branch is
real, legitimate rubric text and is not deleted here, but it is
inherently more subjective, and it is exactly the branch the session-11
incident exploited — nearly any single fact about an accomplished
person can be narrated as "the most plausible explanation." **For the
purpose of any corpus-wide audit or correction pass, only the first
branch counts**: a row may be assigned `strong_inference` (confidence
0.50-0.64) only if its rationale documents TWO OR MORE independently-
verifiable, distinct facts, instances, sources, or episodes that all
support the same trait — matching this document's own §2 worked example
("a biography documents five separate career pivots... supports
`cross_domain_range` as strong_inference"). A row resting on a single
documented fact and one inferential step belongs in `inference`
(0.20-0.49), however plausible the inference sounds, unless a human
reviewer is prepared to individually defend the single-fact
"most-plausible-explanation" claim on its own terms — that judgment
call is exactly what produced the session-11 incident, so treat it with
real skepticism rather than reaching for it by default.

**Practical workflow guardrail**: score a candidate to completion first;
run `src/dev/roster1000/validateCandidates.ts` only once the researcher
believes the profile is complete; treat any post-validation edit as
requiring an explicit A/B/C label in the row's `rationale` or the
candidate's `provenance.notes`. A lightweight script that diffs a
candidate file against its last-committed version and flags any
confidence change lacking such a label is recorded as useful, concrete,
not-yet-built future tooling (see the checkpoint's own "Exact next
steps") — this document does not mandate it, since a documentation
discipline enforced by a human researcher, backed by periodic audit
(exactly what session 11's own repair was), is proportionate for a
project of this scale; do not overbuild a workflow platform around it.
