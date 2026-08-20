# Session 17 diagnostic-value rubric — FROZEN before classification

This rubric is written and committed to before any episode for any of the
four Session 17 candidates (Jorge Luis Borges, Thomas Sankara, Enrico
Fermi, James Baldwin) is classified. Per the session's own governing
instructions, once classification begins this rubric's category
boundaries are not redefined because one candidate or session appears
stronger, and thresholds are not adjusted to equalize the two groups. If
a genuine clarification became unavoidable mid-classification, it is
recorded in the "Clarifications applied during classification" section
at the bottom of this file, with the exact point it was adopted, rather
than silently folded into the original text above.

## Unit of analysis

The unit of analysis is the **evidence episode** — an atomic, dated or
datable behavioral/biographical fact reconstructed from a candidate's
already-locked `rows[*].rationale` text (the only form in which
Session 13's and Session 15's evidence survives in this repository; see
`README.md` for the full provenance/contamination statement). An episode
is classified on what it reveals about the person's behavior, not on
which trait it was originally used to score, how many trait rows it
produced historically, or whether it helped a candidate clear
`eligibility_v2`.

## A. Highly behaviorally diagnostic

The episode gives strong evidence about how the person tends to think,
decide, react, relate, persist, lead, plan, cope, or act under
meaningful conditions. The test applied: *if this fact were the only
thing known about the person, would it reveal something specific about
how they tend to operate — decision style, relational style, coping
style, work style, moral stance under pressure — that differentiates
them from a typical peer in their field?* Drama is not the criterion;
psychological differentiation is. A concrete, specific, dated act
(naming who, what, when, and under what real constraint) is treated as
stronger A-class evidence than an abstract summary of a general
tendency, even when the summary describes a genuinely repeated pattern
— see "Structure" below for how repetition is tracked separately from
diagnostic class.

Examples (from the session's own brief, non-exhaustive): response to
serious criticism; a repeated working habit; a decision under personal
risk; a documented conflict style; a reaction to failure; a
relationship pattern; a deliberate refusal of institutional pressure; a
repeated leadership behavior; a documented approach to uncertainty; a
meaningful sacrifice reflecting motivation; a repeated creative/
intellectual method genuinely exercised by the person themselves (not
an external assessment of them — see the boundary with C below).

## B. Moderately behaviorally diagnostic

The episode contains some useful behavioral signal but is less
repeated, more context-dependent, less clearly motivated, partly
inferential, or less psychologically distinctive than an A-class
episode. Concretely, this class is used for: (i) a real but
single-instance, thinly-detailed fact; (ii) an outcome/throughput
statistic about a program or institution the person led, where the
statistic itself is real signal (pace, scale) but no personal
decision/reaction/relational texture is described; (iii) an episode
that substantially restates another episode's underlying fact but adds
one genuinely new, non-trivial detail (a quantified margin, an
extension to a new party) — discounted from A to B rather than folded
fully into D, since it is not a bare restatement.

## C. Primarily biographical/contextual

The episode establishes what happened but provides little direct
psychological information: an award, an appointment/title held, a
publication, a job, a school attended, participation in a project, an
expedition, or — a category distinct from the session brief's own list
but treated identically for this rubric — a third party's external
characterization or reputational assessment of the person (e.g.
historians describing someone as influential), since that is evidence
about legacy/reception, not about the person's own observed behavior.
A career event is not automatically C: if the preserved evidence
includes psychologically diagnostic decision-making around it, it
belongs in A or B instead. The rubric's own worked distinction, applied
consistently below: "led the team that built X" (a role/outcome
statement, no decision texture) is treated more cautiously than "sold
the government fleet for a cheaper car" (a concrete, specific, personal
act with clear motivational content) even when both nominally concern
leadership.

## D. Redundant / low incremental information

The episode substantially repeats behavioral information already
captured by another episode for the same candidate: another
description of the same dispute, several paraphrases of one career
decision, or multiple evidence items demonstrating essentially the same
behavioral pattern without meaningfully independent context. This
measures incremental evidence value, not factual truth — a D-classified
episode is not false or unimportant, it simply adds little beyond what
an already-counted episode already established. Where decomposing a
single historical row's rationale text produces two atomic facts that
describe the same underlying event from genuinely different angles
(e.g. one fact establishes an act occurred, another fact adds that the
act was later characterized as "immediate, not deliberated"), the
richer or first-encountered fact is classified on its own merits and
the second is marked D pointing back to it, UNLESS the second angle
introduces genuinely new, non-trivial content — in which case it is
downgraded to B rather than marked D (see B(iii) above). This same-event
overlap is recorded explicitly via a `redundantWith` pointer even when
the second episode is graded B rather than D, so the underlying overlap
is never hidden by a favorable class assignment.

## Behavioral context taxonomy (tag one or more per episode)

```
solitary_intellectual_creative_work
collaboration
leadership_management
interpersonal_relationship
conflict_opposition
adversity_failure
risk_uncertainty
institutional_behavior
public_political_engagement
moral_ideological_decision
career_achievement
adaptation_change
emotional_expression
other
```

These are contextual breadth tags, not trait labels — an episode may
carry several. `career_achievement` is used liberally for any
promotion/appointment/award/publication-type fact, including ones also
classified A or B, since context breadth and diagnostic class are
independent axes.

## Evidence structure taxonomy (tag one primary per episode, secondary allowed)

```
one_time_behavior
repeated_behavior_pattern
longitudinal_pattern_across_years
```

`reaction_under_high_stakes` is a separate, independent boolean flag
(an episode can be one-time AND high-stakes, e.g. a single decision
made under real personal risk).

## Evidence form taxonomy (tag one per episode)

```
self_report                          -- the person's own quoted/stated words
third_party_observation              -- someone else directly present/observing describes the act
documented_action_with_inferred_motive -- an act is documented but reasoning/motive is inferred, not stated
```

## Additional boolean flags (independent of class/context/structure)

```
explicitMotive             -- the episode states WHY, not just WHAT
explicitEmotionalReaction  -- the episode states or directly quotes an emotional response
explicitReasoningProcess   -- the episode describes the person's own reasoning, not just an outcome
observableBehaviorOnly     -- true only when none of the above three flags apply
```

## Redundancy pointer

Every episode carries an optional `redundantWith: string[]` field
listing the id(s) of any other episode for the same candidate that
documents substantially the same underlying event or fact, regardless
of the redundant episode's own diagnostic class. This is populated
during classification and is not revisited after lock except to correct
a factual transcription error (never to change a class or reduce/inflate
either group's density figures).

## What this rubric explicitly does NOT do

It does not ask whether an episode supports one of `eligibility_v2`'s 18
required scored dimensions. It does not weight an episode by how many
historical trait rows it produced. It does not treat a dramatic or
famous episode as automatically A-class, and it does not treat a quiet
or domestic episode as automatically C-class — Fermi's F12 (a joke at
Trinity) and Sankara's S4 (selling a car fleet) are graded on the same
axis as Borges's E1 (defying a police order) using the same test above.

## Clarifications applied during classification

None. No clarification to this rubric's category boundaries, taxonomy
lists, or thresholds was found necessary during classification of all
four candidates' episodes. Every judgment call made during
classification (e.g. how to treat a two-fact rationale that splits
across A and C, or how to treat a role/title fact versus a personal
act) was resolved by direct application of the tests already stated
above, not by adding a new rule after seeing how a candidate or group
was trending. See `comparison.md` §"Borderline-call discipline" for a
worked account of the specific comparisons (Fermi's F2/F3 versus
Sankara's S4/S9, and Borges's E19/E23 versus the Fermi/Sankara
role-fact treatment) that were checked against each other for
cross-candidate consistency before classification was locked.
