/**
 * Canonical English message bundle.
 *
 * Every user-visible string is a key. Nothing in this file is ever an input to
 * scoring, matching, or Greatness Potential — swapping bundles changes
 * presentation only, and that invariant is asserted in tests.
 */
export const en = {
  /* ------------------------------------------------------------ attributes */
  "attribute.curiosity": "Curiosity",
  "attribute.analytical_rigor": "Analytical Rigour",
  "attribute.intuitive_synthesis": "Intuitive Synthesis",
  "attribute.systems_abstraction": "Systems Thinking",
  "attribute.independent_thinking": "Independent Thinking",
  "attribute.creative_originality": "Creative Originality",
  "attribute.experimentation": "Experimentation",
  "attribute.cross_domain_range": "Cross-Domain Range",
  "attribute.aesthetic_sensitivity": "Aesthetic Sensitivity",
  "attribute.discipline": "Discipline",
  "attribute.deep_focus": "Deep Focus",
  "attribute.detail_orientation": "Detail Orientation",
  "attribute.perfectionism": "Perfectionism",
  "attribute.execution_speed": "Execution Speed",
  "attribute.planning_orientation": "Planning Orientation",
  "attribute.persistence": "Persistence",
  "attribute.adaptability": "Adaptability",
  "attribute.risk_tolerance": "Risk Tolerance",
  "attribute.ambiguity_tolerance": "Ambiguity Tolerance",
  "attribute.decisiveness": "Decisiveness",
  "attribute.social_assertiveness": "Social Assertiveness",
  "attribute.collaboration": "Collaboration",
  "attribute.leadership_drive": "Leadership Drive",
  "attribute.persuasiveness": "Persuasiveness",
  "attribute.conflict_tolerance": "Conflict Tolerance",
  "attribute.mastery_orientation": "Mastery Orientation",
  "attribute.achievement_drive": "Achievement Drive",
  "attribute.competitiveness": "Competitiveness",
  "attribute.autonomy_need": "Need for Autonomy",
  "attribute.impact_motivation": "Impact Motivation",
  "attribute.belief_updating": "Belief Updating",
  "attribute.opportunity_sensing": "Opportunity Sensing",
  "attribute.resourcefulness": "Resourcefulness",
  "attribute.proactive_agency": "Proactive Agency",

  /* ---------------------------------------------------------------- facets */
  "facet.thinking": "Thinking",
  "facet.creativity": "Creativity",
  "facet.work_style": "Work Style",
  "facet.resilience": "Resilience",
  "facet.social": "Social",
  "facet.motivation": "Motivation",
  "facet.world_sense": "World Sense",

  "facet.match.thinking": "Closest Thinking Match",
  "facet.match.creativity": "Closest Creative Match",
  "facet.match.work_style": "Closest Work-Style Match",
  "facet.match.resilience": "Closest Resilience Match",
  "facet.match.social": "Closest Social Match",
  "facet.match.motivation": "Closest Motivation Match",
  "facet.match.world_sense": "Closest World-Sense Match",

  /* ---------------------------------------------------------------- impact */
  "impact.advantage": "Advantage",
  "impact.dual_edged": "Dual-edged",
  "impact.risk": "Risk",
  "impact.neutral": "Contextual",
  "impact.advantage.icon": "▲",
  "impact.dual_edged.icon": "◇",
  "impact.risk.icon": "▼",
  "impact.neutral.icon": "●",

  /* ------------------------------------------------- comparison templates */
  "tpl.match_extremely_close": "Your scores are extremely close on {trait}.",
  "tpl.match_similar": "You show a similar level of {trait}.",
  "tpl.match_moderate_gap": "You differ moderately on {trait}.",
  "tpl.user_significantly_higher": "Your profile shows substantially more {trait} than {person}.",
  "tpl.person_significantly_higher": "{person}'s profile shows substantially more {trait} than yours.",
  "tpl.user_higher": "You score somewhat higher on {trait} than {person}.",
  "tpl.person_higher": "{person} scores somewhat higher on {trait} than you.",
  "tpl.advantage_intro":
    "Your profile suggests a stronger orientation toward {trait} than {person}'s. In situations that reward it, that difference may work in your favour.",
  "tpl.difference_not_deficiency":
    "A difference is not a deficiency. Scoring lower than {person} on {trait} is not a gap to close by default.",

  /* --------------------------------------------------------- result copy */
  "result.profile_match.explainer":
    "Profile Match represents similarity across the traits measured by The Great Inside. It is not a psychological diagnosis or a prediction of future success.",
  "result.greatness.explainer":
    "Greatness Potential is an entertainment-oriented profile score based on patterns found across The Great Inside dataset. It is not a prediction of future success.",
  "result.greatness.how":
    "This score measures how your trait pattern aligns with multiple achievement patterns found in The Great Inside dataset.",
  "result.match.how":
    "We compare your questionnaire-derived trait profile with the same set of measured traits assigned to each person in our database. Traits with stronger supporting evidence carry more weight.",
  "result.confidence.explainer":
    "This profile is based on documented biographical evidence and structured interpretation, not a psychological assessment completed by the person.",
  "result.opposite.framing":
    "Your Opposite Profile is the person in our database whose measured pattern differs from yours the most. It is an invitation to explore, not a judgement.",
  "result.distinctive":
    "Your profile contains several patterns frequently found among extraordinary people, but your particular combination is relatively unusual.",
  "result.unexpected.framing":
    "You work in completely different worlds, but your profiles align strongly across the traits below.",

  /* -------------------------------------------------------- result labels */
  "label.greatness_potential": "Greatness Potential",
  "label.closest_match": "Your Closest Great Match",
  "label.unexpected_match": "Your Unexpected Match",
  "label.opposite_profile": "Your Opposite Profile",
  "label.signature_trait": "Your Signature Trait",
  "label.dual_edged_trait": "Your Strongest Dual-Edged Trait",
  "label.you_both": "You Both",
  "label.where_you_differ": "Where You Differ Most",
  // Reworded Stage 10C-B (Phase 6.6) — "the Advantage" conflicted with the
  // project's own "difference is not deficiency, and higher is not
  // inherently better" framing (CLAUDE.md "Safety"). Parallel structure
  // with the sibling heading "Where You Differ Most" above.
  "label.your_advantage": "Where You Bring Something Different",
  "label.dont_copy": "Don't Copy Everything",
  "label.the_edge": "The Edge",
  "label.the_cost": "The Cost",
  "label.signature_trait.support": "One of the most distinctive features of your profile.",
  "label.you": "You",
  "label.profile_match": "Profile Match",
  "label.confidence": "Profile confidence",

  /* -------------------------------------------------------- confidence bands */
  "confidence.low": "Limited evidence",
  "confidence.moderate": "Moderate evidence",
  "confidence.high": "Well documented",

  /* --------------------------------------------------------- greatness bands */
  "greatness.band.uncommon_alignment": "Uncommon Alignment",
  "greatness.band.emerging_pattern": "Emerging Pattern",
  "greatness.band.strong_pattern": "Strong Pattern",
  "greatness.band.high_alignment": "High Alignment",
  "greatness.band.exceptional_alignment": "Exceptional Pattern Alignment",

  /* ------------------------------------------------------------ archetypes */
  "archetype.creative_creator": "Creative Maker",
  "archetype.scientific_explorer": "Scientific Explorer",
  "archetype.entrepreneurial_builder": "Builder",
  "archetype.technical_innovator": "Technical Innovator",
  "archetype.organizational_leader": "Organisational Leader",
  "archetype.independent_creator": "Independent Creator",
  "archetype.competitive_performer": "Competitive Performer",
  "archetype.scholarly_specialist": "Deep Specialist",
  "archetype.cross_disciplinary_generalist": "Cross-Disciplinary Generalist",
  "archetype.social_influencer": "Social Catalyst",

  /* --------------------------------------------------- result archetypes */
  "archetype_result.strong_match": "Strong Match",
  "archetype_result.distinctive_profile": "Distinctive Profile",
  "archetype_result.cross_field_match": "Cross-Field Match",
  "archetype_result.balanced_profile": "Balanced Profile",
  "archetype_result.unusual_combination": "Unusual Combination",

  "archetype_result.strong_match.body": "Your profile aligns closely with your closest match below.",
  "archetype_result.distinctive_profile.body":
    "Your particular combination of traits is relatively unusual in this dataset — that is worth noticing on its own, even before any single match.",
  "archetype_result.cross_field_match.body":
    "Your closest match built a life in a different world than you might expect.",
  "archetype_result.balanced_profile.body":
    "Your traits spread broadly rather than clustering tightly around one strong pattern.",
  "archetype_result.unusual_combination.body":
    "Your profile doesn't cluster tightly around any one person in this dataset — which is its own kind of interesting result.",

  /* --------------------------------------------------- Phase 6: results UI */
  "site.name": "The Great Inside",
  "results.hero.title": "Your Greatness Profile",

  /* ------------------------------------------- Phase 9 Stage 9D: header/auth */
  "auth.sign_in": "Sign in",
  "auth.sign_out": "Sign out",
  "auth.account": "Account",
  // Shared inline sign-in CTA label (Phase 10C post-E2E) — used by both
  // /account's signed-out state and /account/results/[id]'s auth-required
  // state, one key rather than two copies of the same string.
  "auth.sign_in_with_google": "Sign in with Google",
  "locale_switcher.label": "Change language",

  // Reworded Stage 10C-B (Phase 6.6) — "Most people land closer to..." read
  // as a measured population-norm claim, but reference_v3 is a stated
  // modelling assumption (CLAUDE.md "Attribute taxonomy" / Stage 6), not
  // population data. Flagged at Stage 6, fixed here per instruction.
  "results.signature_trait.explain":
    "The reference point for this trait is {refMean}. Yours is {score} — one of the most distinctive points in your whole profile.",
  "results.signature_trait.not_inherently_positive":
    "Standing out here isn't automatically good or bad — it depends entirely on the situation you're in.",

  "results.dual_edged.powerful_when": "In the right situation, leaning into this can be a real asset.",
  "results.dual_edged.watch_for": "In the wrong situation, the same tendency can work against you.",

  "results.comparison.reassurance":
    "A difference is not a deficiency — these are two different ways of being effective, not a better and a worse one.",

  "results.invalid.title": "We couldn't read this result",
  "results.invalid.body":
    "This link may be incomplete, or it was generated by an older version of the quiz. Retake the quiz to get a current result.",
  "results.invalid.cta": "Take the Quiz",

  "results.section.trait_profile": "Your Trait Profile",
  "results.section.trait_profile.intro":
    "All 34 traits The Great Inside measures, grouped by category. A score is a location on a dimension, not a percentage — and not a rating of how good you are.",
  "results.trait_profile.highlights": "What Stands Out Most",
  "results.trait_profile.all": "All Traits",

  "results.section.category_matches": "Your Closest Match, By Category",
  "results.section.top_matches": "More People Worth Meeting",
  "results.section.how_calculated": "How This Was Calculated",
  "results.section.comparison": "Compared With {person}",

  "results.comparison.user_higher": "Where You Lean Higher",
  "results.comparison.person_higher": "Where {person} Leans Higher",

  "results.unexpected.none.title": "No Unexpected Match This Time",
  "results.unexpected.none.body":
    "Every profile close enough to be a surprise also turned out to share a fairly similar world with yours. That's a legitimate result, not a missing feature.",

  "results.method.toggle": "How this was calculated",
  "results.method.intro":
    "No part of this process uses generative AI. Every number below is produced by a fixed, repeatable calculation.",
  "results.method.step1": "Your answers are converted into scores across 34 measured traits.",
  "results.method.step2":
    "That trait profile is compared against the same 34 traits recorded for each person in the dataset.",
  "results.method.step3":
    "Similarity considers the overall pattern of your traits, your general level, and how much you vary — not just how many traits happen to line up.",
  "results.method.step4":
    "People with less-complete historical evidence have their similarity pulled toward a neutral baseline, so a thin profile can't look artificially close to you.",
  "results.method.step5":
    "The similarity value shown is calibrated against thousands of simulated profiles so the numbers read consistently across the whole scale.",

  "results.cta.view_profile": "View Profile",
  "results.cta.full_comparison": "See Full Comparison",
  "results.cta.retake": "Retake the Quiz",

  /* ---------------------------------- Phase 10C: save-to-account + history */
  "results.save_cta.title": "Save your result",
  "results.save_cta.body": "Sign in to save this result to your account and return to it later.",
  "results.save_cta.action": "Sign in with Google & save",
  "results.save_cta.saved": "Saved to your account.",

  "account.title": "Your Saved Results",
  "account.signed_out.title": "Sign in to see your saved results",
  "account.signed_out.body": "Once you sign in, results you've saved will appear here.",
  "account.signed_out.action": "Sign in with Google",
  "account.empty.title": "No saved results yet",
  "account.empty.body": "Complete the quiz and sign in to save your first result here.",
  "account.list.completed_at": "Completed {date}",
  "account.list.view": "View",
  "account.list.unavailable": "Not available for this early result",
  "account.back": "Back to Your Saved Results",

  "account.results.not_found.title": "We couldn't find that result",
  "account.results.not_found.body": "It may belong to a different account, or the link may be incorrect.",
  "account.results.unavailable.title": "This saved result isn't available",
  "account.results.unavailable.body":
    "This result was saved before we could store a full snapshot of it, so it can't be faithfully reopened. Retake the quiz for a current result.",
  "account.results.cta.retake": "Retake the Quiz",

  // Phase 10C post-E2E fix: a signed-out visitor on a saved-result page
  // (e.g. right after clicking Sign out) must see this, never
  // account.results.not_found.* — that copy falsely implies the result
  // doesn't exist or belongs to someone else.
  "account.results.auth_required.title": "Sign in required",
  "account.results.auth_required.body": "Sign in to view your saved result.",

  // Authored, not yet rendered anywhere — same "prepared ahead of the UI
  // that will use it" pattern as compare.cta.from_results was at Phase 7.
  // Phase 10C's legacy-pending-entry preservation mechanism
  // (src/lib/results/pendingOwnResults.ts's quarantine store) needed this
  // copy defined and correct now, even though no recovery UI exists yet to
  // display it — see that file's doc comment for the full mechanism.
  "account.legacy_pending.notice":
    "This result was completed before the current save format was introduced, so we can't verify an exact historical replay. Your result has not been overwritten.",

  /* ------------------------------------------------ Phase 7: target comparison */
  "compare.cta.has_result": "Compare Yourself With This Person",
  "compare.cta.no_result": "Take the Quiz to Compare",
  "compare.cta.from_results": "Compare With {person}",

  "compare.hero.eyebrow": "You × {person}",

  // compare.section.differ/learn reworded Phase 7 Stage 7B — split the
  // former combined "Where You Differ" section (both directions at once)
  // into two distinct sections in the page's information architecture:
  // this one (person leans higher, framed neutrally) and a separate
  // "Where You Bring Something Different" section (reuses the already-
  // fixed `label.your_advantage`, Stage 10C-B) for the user-higher side.
  "compare.section.share": "What You Share",
  "compare.section.differ": "Where You Lean Differently",
  "compare.section.learn": "What You Could Learn From Them",
  "compare.section.dont_copy": "What Not to Copy",
  // Reworded Phase 7 human-review Stage (Issue 4) — "Facet Comparison" read
  // as ambiguous between "a score of your ability" and "how aligned you
  // are"; these values are calibrated USER<->TARGET similarity per facet
  // (`calibrateMatch(similarityFrom(facetTerms))` in similarity.ts, verified
  // by reading the implementation directly before wording this), not a
  // trait-quality score, so the heading and a new explanatory line now say
  // so explicitly.
  "compare.section.facets": "Facet Similarity",
  "compare.section.detailed": "Detailed Trait Comparison",

  "compare.facets.intro":
    "How closely your profile aligns with {person} within each category — not a measure of your ability or quality in that area.",

  "compare.learn.intro":
    "These are differences worth exploring — not a claim that {person}'s path was caused by them. Correlation in one profile isn't causation.",
  "compare.learn.none": "No strong learning suggestions stood out this time — that's a legitimate result, not a missing feature.",
  "compare.learn.target_score": "{person}'s profile shows a notably higher {trait} ({score} / 100).",
  "compare.learn.try": "Try:",
  "compare.learn.watch_for": "Worth knowing:",

  // New Phase 7 human-review Stage (Issue 1) — the non-prescriptive
  // counterpart to compare.learn.*, for `contextual`-shaped differences
  // `learnFromTraits` correctly never credits in either direction. See
  // `selectWorthExploring` (targetComparison.ts) for the full rationale.
  // compare.explore.note simplified Phase 7 human-review Stage (Issue 1) —
  // selectWorthExploring is now TARGET-HIGHER only (a user-higher
  // contextual difference belongs conceptually under "Where You Bring
  // Something Different" instead, per that stage's finding), so the
  // direction is no longer a runtime choice between two keys.
  "compare.explore.title": "Worth Exploring",
  "compare.explore.intro":
    "A few other differences don't point toward a clearly \"better\" direction — but may still be worth noticing.",
  "compare.explore.note":
    "{person} leans further toward {trait} than you do — not necessarily a better approach, just a different one.",
  "compare.explore.helps_when_label": "Where this can help:",
  // Replaces a reused "Worth knowing:" + dev-guide caution pairing that
  // answered the wrong question for this surface (Phase 7 human-review
  // Stage, second pass — see PRESERVES_ATTRIBUTE_IDS in
  // targetComparison.ts). Names the semantic role directly: what the
  // user's own current, lower pole protects.
  "compare.explore.preserves_label": "What your current style may preserve:",

  "compare.dontcopy.intro": "A strong match doesn't mean copying everything would help — here's where to be careful.",
  "compare.dontcopy.none": "Nothing stood out as a specific caution for this profile.",
  "compare.dontcopy.low_confidence_note": "Based on limited historical evidence — read this one with extra caution.",

  "compare.switch.title": "Compare With Someone Else",
  "compare.switch.placeholder": "Search for another person",
  "compare.switch.empty": "No one matches that search.",

  "compare.invalid.title": "Take the Quiz to Compare Yourself With {person}",
  "compare.invalid.body": "You'll need a result first — it only takes a few minutes.",
  "compare.invalid.cta": "Take the Quiz",

  "compare.person_not_found.title": "We couldn't find that person",
  "compare.person_not_found.cta": "Browse All People",

  /* -------------------------------------------------------- Phase 6: quiz UI */
  "landing.eyebrow": "The Great Inside",
  "landing.title": "Who in history thinks like you?",
  "landing.subtitle":
    "Answer a set of questions about how you think, create, work, and make decisions. We'll compare your profile against 35 extraordinary people — and show you who you actually resemble.",
  "landing.cta_primary": "Take the Quiz",
  "landing.cta_secondary": "Explore the People First",
  "landing.ai_disclaimer":
    "Every result is calculated deterministically from your answers — no generative AI is involved in scoring or matching.",
  // Phase 10D-1: label for the wide-desktop rail's secondary region — same
  // "How this was calculated" naming convention as results.method.toggle,
  // adapted to present tense since landing precedes any computed result.
  // The disclaimer text itself (above) is unchanged.
  "landing.method.eyebrow": "How It Works",

  "quiz.intro.eyebrow": "Before you begin",
  "quiz.intro.title": "A few honest answers",
  "quiz.intro.body":
    "64 short questions about how you think, create, work, handle setbacks, relate to people, sense and act on the world around you, and what drives you. Most people finish in around 10-15 minutes. Answer with your first instinct — there's no right answer, and nothing you choose is judged as good or bad.",
  "quiz.intro.privacy":
    "Your answers stay in this browser and in the link to your results. Nothing is sent to a server or saved to an account.",
  "quiz.intro.start": "Start the Quiz",

  "quiz.progress": "Question {current} of {total}",
  "quiz.progress.range": "Questions {from}–{to} of {total}",
  "quiz.progress.section": "Section {index} of {sectionTotal} · {name}",
  "quiz.nav.back": "Back",
  "quiz.nav.next": "Next",
  "quiz.nav.see_results": "See My Results",
  "quiz.nav.required": "Choose an answer to continue.",
  "quiz.likert.disagree": "Strongly disagree",
  "quiz.likert.agree": "Strongly agree",

  "quiz.resume.title": "Continue where you left off?",
  "quiz.resume.body": "You already answered {count} of {total} questions in an earlier visit.",
  "quiz.resume.continue": "Continue",
  "quiz.resume.restart": "Start Over",

  "quiz.stale.title": "The quiz has changed since your last visit",
  "quiz.stale.body": "To keep your results accurate, please start again — it only takes a few minutes.",
  "quiz.stale.restart": "Start the Current Quiz",

  /* ------------------------------------------------------- quiz sections */
  "quiz.section.s1_thinking": "How You Think",
  "quiz.section.s2_ideas": "Ideas and Making",
  "quiz.section.s3_work": "How You Work",
  "quiz.section.s4_uncertainty": "Uncertainty and Setbacks",
  "quiz.section.s5_people": "People",
  "quiz.section.s6_drive": "What Drives You",

  /* ---------------------------------------------------------- quiz items */
  // q01 removed in quiz_v2 (Phase 6.6) — see bank.ts header for why.
  "quiz.q02.prompt": "You have to make a call on something you only half understand. Which is closer to how you get there?",
  "quiz.q02.option.a": "Break it down, lay out the evidence, and reason to a conclusion",
  "quiz.q02.option.b": "Let it sit, then go with the read that forms on its own",

  "quiz.q03.prompt": "When something goes wrong, I find myself looking for the underlying structure that produced it rather than the immediate cause.",
  "quiz.q04.prompt": "I'll hold a position I've thought through even when most people around me disagree.",

  // q05 rewritten in quiz_v2 (Phase 6.6) — retargeted to opportunity_sensing.
  "quiz.q05.prompt": "A field you've never paid attention to suddenly turns out to matter for something you care about. What's your first move?",
  "quiz.q05.option.a": "Notice it's probably an opening and start figuring out how to use it",
  "quiz.q05.option.b": "Read into it for a while before deciding whether it's worth anything",
  // q05.option.c reworded Stage 10B (Phase 6.6) — "keep doing what you were
  // already doing" read as passive/oblivious next to option (a)'s "start
  // figuring out how to use it". Reframed as deliberate prioritisation.
  "quiz.q05.option.c": "Keep your attention on current priorities until its relevance becomes clearer",

  "quiz.q06.prompt": "The ideas I'm drawn to are usually ones other people haven't considered.",

  "quiz.q07.prompt": "Starting something genuinely new. Which frustrates you more?",
  "quiz.q07.option.a": "Planning for so long that nothing has been built yet",
  "quiz.q07.option.b": "Building so early that half of it has to be thrown away",

  "quiz.q08.prompt": "How something looks, sounds, or feels affects my judgement of whether it's any good.",

  "quiz.q09.prompt": "Given ten years to spend on work you care about, which shape appeals more?",
  "quiz.q09.option.a": "Move between several fields and connect what you find",
  "quiz.q09.option.b": "Go further into one thing than almost anyone has",
  "quiz.q09.option.c": "Follow whatever the moment seems to need",

  "quiz.q10.prompt": "I'd rather try an approach nobody has tested than refine one that's known to work.",

  // q11 reworded Stage 10B (Phase 6.6) — "even on days when I don't feel
  // like it" read as diligent-vs-lazy. Reframed as a pace/interest fact.
  // Micro-pass (Stage 10B, post human-review): "keep the same pace even
  // after my interest drops" still carried a mild diligence/virtue signal
  // (only mentions interest DROPPING). Generalised to interest rising OR
  // falling so neither pole reads as more virtuous.
  "quiz.q11.prompt": "My pace on something I've committed to tends to stay fairly steady even when my interest in it rises or falls.",

  "quiz.q12.prompt": "On work that matters to you, which bothers you more?",
  "quiz.q12.option.a": "Releasing something before it feels fully refined",
  "quiz.q12.option.b": "Refining something so long that progress stalls",

  // q13 restated as a neutral stem + custom bipolar anchors Stage 10C-B
  // (Phase 6.6) — "I can stay inside one problem for hours without needing
  // to come up for air" read as a capability claim under a plain agree/
  // disagree scale (disagreeing implied "can't"). See bank.ts header
  // "STAGE 10C-B". Construct/direction/weight unchanged.
  "quiz.q13.prompt": "When I'm deep in demanding work, I tend to...",
  "quiz.q13.anchor.left": "Resurface often and switch attention",
  "quiz.q13.anchor.right": "Stay immersed for long stretches",
  "quiz.q14.prompt": "Small inconsistencies that most people don't notice tend to bother me.",

  // q15 rewritten in quiz_v2 (Phase 6.6) — reframed as a resource-shortfall
  // scenario so option (c) could be retargeted to resourcefulness; (a)/(b)
  // keep their quiz_v1 meaning under the new framing.
  "quiz.q15.prompt": "Partway into a long project, the resources you were counting on (budget, people, time, tools) turn out to be far less than you planned for. What do you do?",
  "quiz.q15.option.a": "Rebuild the plan properly around the real numbers before continuing",
  "quiz.q15.option.b": "Adjust as you go and figure out the new shape while still moving",
  "quiz.q15.option.c": "Find a way to get most of the value out of what's actually still available",

  "quiz.q16.prompt": "I'd rather have five things finished and imperfect than one thing finished and excellent.",

  "quiz.q17.prompt": "Something you worked on for months fails unexpectedly. What are you most likely to do next?",
  "quiz.q17.option.a": "Go at the same goal again, differently",
  "quiz.q17.option.b": "Take what you learned somewhere new",
  "quiz.q17.option.c": "Work out exactly why it failed before moving at all",
  "quiz.q17.option.d": "Talk it through with people you trust before deciding",

  "quiz.q18.prompt": "I'll accept a real chance of losing something if the upside is large enough.",
  "quiz.q19.prompt": "I'm comfortable working on something where nobody can tell me what the right answer looks like.",

  "quiz.q20.prompt": "A decision has to be made and the information is incomplete. Which is closer to you?",
  "quiz.q20.option.a": "Decide now and correct course later",
  "quiz.q20.option.b": "Wait until you can see the situation more clearly",

  // q21 reworded Stage 10B (Phase 6.6) — "well past the point where others
  // would switch" implicitly framed persistence as outlasting/besting peers.
  // Reframed as stay-with-it-longer vs. redirect-sooner (Length constraint:
  // must stay <=110 chars to preserve its Stage 10A screen pairing with q26).
  "quiz.q21.prompt": "When something isn't working as expected, I'll keep at it longer before deciding to redirect my effort.",

  "quiz.q22.prompt": "In a room of people I don't know, I'll be one of the first to speak.",

  "quiz.q23.prompt": "Same work, same outcome. Which version would you take?",
  "quiz.q23.option.a": "Doing it with a team you like working with",
  "quiz.q23.option.b": "Doing it alone, on your own terms",

  "quiz.q24.prompt": "When a group has no direction, I tend to be the one who sets it.",

  "quiz.q25.prompt": "Someone senior makes a call you're fairly sure is wrong. What do you actually do?",
  "quiz.q25.option.a": "Say so directly, even if it makes the room uncomfortable",
  "quiz.q25.option.b": "Let it go unless the cost is serious",
  "quiz.q25.option.c": "Work on them privately until they come around",

  // q26 reworded Stage 10B (Phase 6.6) — "I can usually get people to see"
  // was a self-rated success/competence claim. Reframed as a behavioural
  // effort contrast (keep reshaping vs. state once and move on), distinct
  // from q44's disagreement-specific persuasiveness item. Length constraint:
  // must stay <=110 chars to preserve its Stage 10A screen pairing with q21.
  "quiz.q26.prompt": "I'll usually keep reshaping how I explain something, rather than state it once and leave it at that.",

  // q27 removed in quiz_v2 (Phase 6.6) — see bank.ts header for why.
  // q28 reworded Stage 10B (Phase 6.6) — "makes me work harder" implied
  // diligent-vs-lazy. Reframed as a comparison-sensitivity fact, direction
  // unspecified. Length constraint: must stay <=85 chars (VERY_SHORT_MAX)
  // to preserve its Stage 10A 3-question screen with q43/q32.
  "quiz.q28.prompt": "Knowing someone comparable is ahead of me changes how much effort I put in.",
  // q29 reworded Stage 10B (Phase 6.6) — "beyond my own situation" implied
  // altruism vs. selfishness. Reframed as external-impact vs. personal-value
  // motivation (both legitimate, matches the project's respect for
  // mastery-driven specialists elsewhere in the seed dataset).
  // Micro-pass (Stage 10B, post human-review): "mainly valuable to me
  // personally" still read as morally loaded next to "beyond myself".
  // Named the low pole explicitly as interest/meaning/satisfaction —
  // legitimate intrinsic motivation, not vague self-interest.
  "quiz.q29.prompt": "I'm more motivated by work whose effects extend beyond me than by work whose main value is the interest, meaning, or satisfaction I get from doing it.",
  "quiz.q30.prompt": "I set targets for myself that are higher than what's expected of me.",

  "quiz.q31.prompt": "When I'm deep in a hard problem, the right next step often occurs to me before I can fully explain why.",
  "quiz.q32.prompt": "I do my best work when nobody is directing how I get there.",

  /* ---------------------------------------------------- Phase 4 additions */
  "quiz.q33.prompt": "Even when a project of mine is going well on my own, I look for ways to bring other people into it.",
  "quiz.q34.prompt": "I'll keep refining a skill past the point where it's already good enough for what I actually need it for.",
  "quiz.q35.prompt": "I'm drawn to connecting ideas from fields that don't obviously belong together.",

  // q36 removed in quiz_v2 (Phase 6.6) — see bank.ts header for why.
  "quiz.q37.prompt": "Once I have enough to start, I'd rather ship something rough soon than wait until it's more complete.",
  "quiz.q38.prompt": "I'll follow an interesting tangent that has nothing to do with what I'm actually supposed to be doing.",
  // q39 reworded Stage 10B (Phase 6.6) — "makes my approach look wrong...
  // drop it" declared the switch normatively correct. Reframed as a
  // switch-sooner vs. give-it-more-time trade-off. Length constraint: must
  // stay >110 chars (long/solo) to avoid a new Stage 10A screen pairing
  // with q18.
  "quiz.q39.prompt": "When new information weakens my original approach, I'll usually switch fairly quickly rather than give the current approach more time to prove itself.",

  // q40 rewritten in quiz_v2 (Phase 6.6) — retargeted to belief_updating;
  // was a near-duplicate of q20's decisiveness trade-off (see bank.ts header).
  // Prompt/options reworded again Stage 10B (Phase 6.6) — the original
  // declared the prior conclusion "is wrong" (a verdict) and option (b) read
  // as rationalisation ("probably doesn't outweigh"). Reframed as two
  // legitimate epistemic postures: reopen readily vs. weigh cumulatively
  // against a case already built.
  "quiz.q40.prompt": "New, credible evidence cuts against a conclusion you'd already settled on and started acting on. Which is closer to you?",
  "quiz.q40.option.a": "Reopen the conclusion and adjust course if the new evidence holds up",
  "quiz.q40.option.b": "Treat it as one more piece to weigh against the case you already built, and stay the course for now",

  "quiz.q41.prompt": "I'll show people work that's still rough, just to see what happens with it.",
  "quiz.q42.prompt": "Whether my work actually reaches or changes people matters more to me than how polished it is on its own terms.",
  "quiz.q43.prompt": "I want to be the one setting direction for a group, even when nobody's asked me to.",
  "quiz.q44.prompt": "When someone disagrees with me about something I care about, I'll actively work to bring them around to my view.",
  "quiz.q45.prompt": "I'd rather take a shot at something that could fail badly but pay off big, than something safe with a modest return.",

  "quiz.q46.prompt": "Learning something genuinely new, which is closer to how you approach it?",
  "quiz.q46.option.a": "I look for the underlying pattern before the specifics",
  "quiz.q46.option.b": "I start with concrete examples and build up from there",

  "quiz.q47.prompt": "On work that's genuinely absorbing, which is closer to you?",
  "quiz.q47.option.a": "I can lose track of time entirely once I'm in it",
  "quiz.q47.option.b": "I check in with myself regularly so I don't lose momentum elsewhere",

  "quiz.q48.prompt": "I'll redo something several times until it feels exactly right, even after it already meets what was actually required.",
  // q49 reworded Stage 10B (Phase 6.6) — "productively" was a competence
  // claim. Reframed as a behavioural fact (keeps moving vs. resolves
  // uncertainty first), no competence implied either way.
  // Micro-pass (Stage 10B, post human-review): "I can keep moving" still
  // carried a residual competence implication. Removed "can" entirely.
  "quiz.q49.prompt": "When the right answer is genuinely unclear, I tend to keep moving rather than resolve the uncertainty first.",
  // q50 reworded Stage 10B (Phase 6.6) — "I feel a real pull to finish...
  // even on projects nobody else is tracking" was a reliability/virtue
  // claim. Reframed as a psychological fact (stays on my mind), legitimising
  // the low pole as letting go rather than being unreliable.
  "quiz.q50.prompt": "An unfinished project tends to stay on my mind even when nobody else is waiting on it.",
  "quiz.q51.prompt": "I do noticeably better work when I get to decide how to approach something myself, not just what the end goal is.",

  // q52 remapped in quiz_v2 (Phase 6.6) — option (a) only, retargeted to
  // proactive_agency; (b)/(c) byte-identical to quiz_v1.
  "quiz.q52.prompt": "Working on a shared project, you notice a real problem nobody assigned you to fix. What's more likely?",
  "quiz.q52.option.a": "Just start fixing it yourself before anyone asks",
  "quiz.q52.option.b": "Bring it to the group before deciding",
  "quiz.q52.option.c": "Take the lead on framing the decision for everyone",

  // q53 reworded Stage 10B (Phase 6.6) — "before I accept" implicitly framed
  // the low pole as credulous/gullible. Reframed as a timing-of-scrutiny
  // trade-off (stress-test up front vs. accept provisionally and revisit),
  // deliberately kept inside analytical_rigor rather than reintroducing a
  // rigor-vs-holistic-sense-making axis (q02 already covers that contrast).
  // Length constraint: must stay <=110 chars to preserve its Stage 10A
  // screen pairing with q06.
  // Micro-pass (Stage 10B, post human-review): "accept it and deal with
  // problems later" still read as clearly inferior/careless (passive,
  // reactive-cleanup framing). Reframed the low pole as "trust by default,
  // verify on contradiction" — a real, recognised strategy (not scrutinising
  // everything preemptively is an efficiency choice, not carelessness) —
  // while staying inside analytical_rigor's own territory (scrutiny timing,
  // not analytical-vs-intuitive, which q02 already covers).
  "quiz.q53.prompt": "I'd rather check a claim for weak points upfront than trust it by default and look closer if it's challenged.",
  "quiz.q54.prompt": "Even for routine tasks, I like to know the order I'll do things in before I start.",
  "quiz.q55.prompt": "I don't mind repetitive practice if it's actually moving my skill forward.",
  "quiz.q56.prompt": "I do my best work in long uninterrupted stretches, not short bursts spread across the day.",

  // q57-q65: new in quiz_v2 (Phase 6.6) — see bank.ts header for the full
  // migration rationale per item. q58/q60/q62/q65 were revised again by the
  // Stage 4.5 measurement-repair gate (bank.ts header, "STAGE 4.5" section)
  // — each converted from a forced-choice trade-off to a graded likert.
  //
  // q57/q58/q59/q61/q64/q65 reworded again Stage 10B (Phase 6.6) — see
  // CLAUDE.md "Evaluative symmetry" and docs/phase6.6-taxonomy-v1.1-
  // implementation.md "Stage 10B" for the full audit. Each removed an
  // implicit "sharper/more capable than others" or "genuinely good case ->
  // reasonable person agrees" framing while preserving construct meaning
  // and scoring direction unchanged.
  //
  // q57: removed "before people around me mention it" (outperforms-others
  // framing). Length is unconstrained (first item in s1_thinking, followed
  // by forced-choice q02 which always starts its own screen either way).
  // Restated as a neutral stem + custom bipolar anchors Stage 10C-B (Phase
  // 6.6) — see bank.ts header "STAGE 10C-B". Anchors deliberately use
  // "notice"/perception language only, never "act on" — opportunity_sensing
  // is about perceiving signals, not acting on them (that's q64/q65's
  // proactive_agency), so "act on" would have leaked into that construct.
  "quiz.q57.prompt": "When something around me starts to change, I tend to...",
  "quiz.q57.anchor.left": "Wait for a clearer signal",
  "quiz.q57.anchor.right": "Notice an early signal",
  // q58: reframed "gap before I notice" (obliviousness) as a deliberate
  // confirmation-seeking strategy. Length constraint: must stay <=110 chars
  // to preserve its Stage 10A screen pairing with q31.
  "quiz.q58.prompt":
    "I usually wait for a change around me to become fairly clear before I treat it as something worth reacting to.",
  // q59: "can usually still find a workable way" was a competence claim
  // (implying the low pole "can't"). Reframed as substitute-now vs.
  // secure-preferred-resources-first, pairing naturally with q60's
  // unchanged low-pole item. Length constraint: must stay >110 chars
  // (long/solo) to avoid a new Stage 10A screen pairing with q55.
  "quiz.q59.prompt":
    "When ideal tools or resources aren't available, I tend to keep moving with workable substitutes rather than pause to get the preferred setup.",
  // q60 audited Stage 10B, unchanged — already a legitimate high-evidence-
  // bar strategy ("push to get it rather than settle"), not stigmatised as
  // incapable. Kept as the benchmark for resourcefulness's low pole.
  "quiz.q60.prompt":
    "When the ideal resource for something isn't available, I'll usually push to get it rather than settle for a workable substitute.",
  // q61: "genuinely good case" + "not just my willingness to argue about it"
  // implied the low pole was disingenuous (performing open-mindedness
  // without really changing). Reframed as reopen-readily vs. require-
  // stronger-counterevidence, mirroring q62's already-neutral framing.
  // Length constraint: must stay >110 chars (long/solo) to avoid a new
  // Stage 10A screen pairing with q21 (which would break q21's pairing
  // with q26).
  // Restated as a neutral stem + custom bipolar anchors Stage 10C-B (Phase
  // 6.6) — see bank.ts header "STAGE 10C-B". The >110-char constraint above
  // still applies to whatever this key's value is, so the new stem was
  // deliberately kept long enough (117 chars) to satisfy it, verified by
  // the same buildQuizScreens diff methodology Stage 10B established, not
  // assumed. q62 (the paired reverse item) intentionally left as a plain
  // agreement-scale item — converting both would double-display the same
  // left/right contrast for one construct.
  "quiz.q61.prompt":
    "When new counterevidence comes in against a position I'd already settled on and felt was well-supported, I tend to...",
  "quiz.q61.anchor.left": "Need stronger evidence first",
  "quiz.q61.anchor.right": "Reopen it fairly readily",
  // q62 audited Stage 10B, unchanged — already frames resistance around a
  // higher proof threshold rather than mere stubbornness; used as the
  // benchmark for q61's rewrite above.
  "quiz.q62.prompt":
    "Once I've committed to a course of action, criticism of the underlying idea doesn't change my mind much until there's real proof it's wrong.",
  "quiz.q63.prompt":
    "When a decision needs to be made and I already have most of what I need to know, I'd rather commit and move than keep gathering information.",
  // q64: "nobody put me in charge of it and nobody asked me to" framed the
  // high pole as heroically breaking the rules. Reframed as a plain
  // strategy choice, mirroring q65's rewrite. Length is unconstrained
  // (preceded by situational q25, followed by forced-choice q23, both of
  // which isolate q64 onto its own screen regardless of its length).
  // Micro-pass (Stage 10B, post human-review): "wait for it to become
  // someone's assigned job" still read as mildly heroic next to a vague
  // bureaucratic delay. Reframed directly as initiative vs. formal
  // ownership, mirroring q65's "route it through the person responsible"
  // language so both poles of the pair read as equally deliberate choices.
  "quiz.q64.prompt":
    "If I see a way to improve how something is done, I tend to act on it directly rather than first route it through whoever formally owns the process.",
  // q65: "leave it to whoever's actually in charge of it" read as passive.
  // Reframed as role-boundary respect, a legitimate strategy, not passivity.
  // Length constraint: must stay >110 chars (long/solo) to avoid a new
  // Stage 10A screen pairing with q22.
  "quiz.q65.prompt":
    "If something outside my formal responsibility could be improved, I usually prefer to route it through the person responsible rather than change it myself.",
  // q66-q67: new in Stage 4.5 (Phase 6.6 measurement-repair gate) — see
  // bank.ts header "STAGE 4.5" section.
  "quiz.q66.prompt":
    "A friendly game or contest with people I know pulls a genuinely competitive streak out of me, even when nothing real is at stake.",
  "quiz.q67.prompt":
    "I'll switch between very different kinds of problems within the same week, rather than going deep on one kind for a long stretch.",

  /* ------------------------------------------------------------------ eras */
  "era.ancient": "Ancient",
  "era.medieval": "Medieval",
  "era.early_modern": "Early Modern",
  "era.19th_century": "19th Century",
  "era.20th_century": "20th Century",
  "era.contemporary": "Contemporary",

  /* ------------------------------------------------------------ occupations
     PHASE 8 (2026-08): every `occupationIds[0]` value actually rendered
     across the current 35-person roster (verified directly against
     seed.ts/roster2.ts, not guessed — 45 distinct values, not the 46
     originally estimated in the audit that preceded this fix). Same
     `t(locale, occupation.${id})` pattern already used for `era.*`;
     `missingOccupationCoverage()`/`missingImpactDomainCoverage()`
     (`src/core/people/explorer.ts`) are the regression guards. English
     values here are the plain, undecorated occupation names `humanize()`
     used to produce — this key namespace exists so Korean (and future
     locales) get real translations instead of a raw id with underscores
     swapped for spaces. */
  "occupation.activist": "activist",
  "occupation.actor": "actor",
  "occupation.admiral": "admiral",
  "occupation.anatomist": "anatomist",
  "occupation.animator": "animator",
  "occupation.artist": "artist",
  "occupation.athlete": "athlete",
  "occupation.chemist": "chemist",
  "occupation.composer": "composer",
  "occupation.computer_scientist": "computer scientist",
  "occupation.conservationist": "conservationist",
  "occupation.crystallographer": "crystallographer",
  "occupation.diplomat": "diplomat",
  "occupation.editor": "editor",
  "occupation.engineer": "engineer",
  "occupation.entertainer": "entertainer",
  "occupation.entrepreneur": "entrepreneur",
  "occupation.environmentalist": "environmentalist",
  "occupation.executive": "executive",
  "occupation.fashion_designer": "fashion designer",
  "occupation.film_director": "film director",
  "occupation.historian": "historian",
  "occupation.inventor": "inventor",
  "occupation.investor": "investor",
  "occupation.jurist": "jurist",
  "occupation.lawyer": "lawyer",
  "occupation.martial_artist": "martial artist",
  "occupation.mathematician": "mathematician",
  "occupation.media_executive": "media executive",
  "occupation.military_leader": "military leader",
  "occupation.naval_commander": "naval commander",
  "occupation.painter": "painter",
  "occupation.philosopher": "philosopher",
  "occupation.physicist": "physicist",
  "occupation.poet": "poet",
  "occupation.political_activist": "political activist",
  "occupation.political_leader": "political leader",
  "occupation.primatologist": "primatologist",
  "occupation.product_designer": "product designer",
  "occupation.scientist": "scientist",
  "occupation.statesman": "statesman",
  "occupation.strategist": "strategist",
  "occupation.teacher": "teacher",
  "occupation.theologian": "theologian",
  "occupation.writer": "writer",

  /* --------------------------------------------------------- impact domains
     PHASE 8: all 15 `ImpactDomain` union values (`core/types.ts`) — the
     chip list on the person detail page's "known for" section. A closed
     union, so this is complete by construction, not by roster audit. */
  "impact_domain.scientific": "scientific",
  "impact_domain.technological": "technological",
  "impact_domain.entrepreneurial": "entrepreneurial",
  "impact_domain.cultural": "cultural",
  "impact_domain.artistic": "artistic",
  "impact_domain.literary": "literary",
  "impact_domain.athletic": "athletic",
  "impact_domain.historical": "historical",
  "impact_domain.engineering": "engineering",
  "impact_domain.medical": "medical",
  "impact_domain.educational": "educational",
  "impact_domain.social": "social",
  "impact_domain.industrial": "industrial",
  "impact_domain.innovation": "innovation",
  "impact_domain.wealth_creation": "wealth creation",

  /* -------------------------------------------------------------- explorer */
  "people.directory.title": "Explore Great Minds",
  "people.directory.intro": "Browse the people in The Great Inside by era, region, and trait.",
  "people.directory.search_placeholder": "Search by name, field, or tag",
  "people.directory.era_label": "Era",
  "people.directory.region_label": "Region",
  "people.directory.sort_label": "Sort",
  "people.directory.all": "All",
  "people.directory.empty": "No one matches these filters yet.",
  "people.directory.count": "{count} people",

  "sort.name_asc": "Name (A–Z)",
  "sort.name_desc": "Name (Z–A)",
  "sort.birth_year_asc": "Earliest born",
  "sort.birth_year_desc": "Most recently born",
  "sort.confidence_desc": "Best documented",

  /* --------------------------------------------------------- person page */
  "person.trait_constellation": "Trait Constellation",
  "person.similar_people": "Similar People",
  "person.opposite_profile": "Opposite Profile",
  "person.sources": "Sources",
  "person.back_to_people": "All People",
  "person.known_for": "Known For",
  "person.no_similar_people": "Not enough comparable profiles yet.",
  "person.wikipedia_link": "Wikipedia",
  "person.wikidata_link": "Wikidata",

  /* ---------------------------------------------------- historical polities */
  /* Shown alongside modern nationalityCodes, never replacing them — see
     CLAUDE.md "External identity & media metadata" for why both exist. */
  "polity.congress_poland": "Congress Poland, Russian Empire",
  "polity.joseon_dynasty": "Joseon Dynasty, Korea",
  "polity.ming_dynasty": "Ming Dynasty, China",
  "polity.mamluk_sultanate": "Mamluk Sultanate, Cairo",

  /* ================================================================
     PHASE 7 — DEVELOPMENT GUIDES (development_v1)
     All 30 canonical attributes, three score bands each. Written as
     experiments to try, never as fixes for a deficiency; every "high"
     entry deliberately avoids "get even more of this" (see CLAUDE.md
     "Greatness Potential" — higher is not automatically better) and
     every "low" entry states the legitimate case for staying there
     rather than framing it as a gap to close. English-first: full
     Korean editorial coverage of 270 entries is deferred rather than
     mechanically translated — see CLAUDE.md "Phase 7".
     ================================================================ */

  /* ---------------------------------------------------------- curiosity */
  "dev.curiosity.low.exp.1": "Pick one thing you know nothing about this week and spend 20 minutes just poking at it — no goal beyond finding out what's there.",
  "dev.curiosity.low.exp.2": "Notice the next time you feel a flicker of \"huh, why is that\" and follow it for five minutes instead of letting it pass.",
  "dev.curiosity.low.caution.1": "A narrower focus isn't a flaw — it can mean more depth where you've already chosen to look.",
  "dev.curiosity.medium.exp.1": "Block 30 minutes a week for reading or exploring something completely outside your usual lane.",
  "dev.curiosity.medium.exp.2": "Ask one more \"why\" than feels natural the next time someone explains something to you.",
  "dev.curiosity.medium.caution.1": "Curiosity that never converges into depth on anything can leave you wide but thin — pair it with something you actually finish.",
  "dev.curiosity.high.exp.1": "Practice closing a loop: pick one open question you're chasing and decide on a stopping point before starting the next one.",
  "dev.curiosity.high.exp.2": "Use your range deliberately — pull an idea from a field you follow into whatever you're currently working on.",
  "dev.curiosity.high.caution.1": "Constant novelty-seeking can crowd out follow-through; if projects pile up half-finished, that's the cost showing up.",

  /* --------------------------------------------------- analytical_rigor */
  "dev.analytical_rigor.low.exp.1": "Before your next decision, write down the two or three pieces of evidence actually behind it.",
  "dev.analytical_rigor.low.exp.2": "Pick one belief you hold strongly and spend ten minutes listing what would change your mind.",
  "dev.analytical_rigor.low.caution.1": "Moving fast on instinct isn't wrong — it just trades verification for speed, and that trade is sometimes the right one.",
  "dev.analytical_rigor.medium.exp.1": "Before accepting a conclusion (yours or someone else's), ask what the strongest counter-argument would be.",
  "dev.analytical_rigor.medium.exp.2": "Practice separating \"I'm confident because I checked\" from \"I'm confident because it feels right.\"",
  "dev.analytical_rigor.medium.caution.1": "Rigor applied unevenly — intense on some things, absent on others — can look like objectivity while actually just following interest.",
  "dev.analytical_rigor.high.exp.1": "Set a time box for analysis before a decision, so thoroughness doesn't quietly become a way to avoid deciding.",
  "dev.analytical_rigor.high.exp.2": "Practice giving a \"good enough\" answer out loud before you'd normally feel ready, on a low-stakes call.",
  "dev.analytical_rigor.high.caution.1": "Taken far enough, rigor becomes paralysis — endless verification on a decision that doesn't warrant it.",

  /* ------------------------------------------------- intuitive_synthesis */
  "dev.intuitive_synthesis.low.exp.1": "Next time you're stuck, try answering fast, with your first instinct, before analysing — then check how it holds up.",
  "dev.intuitive_synthesis.low.exp.2": "Notice a moment where you \"just knew\" something without a chain of reasoning, and don't discount it.",
  "dev.intuitive_synthesis.low.caution.1": "Leaning on explicit reasoning over gut calls isn't a weakness — it just means your instincts get less practice being trusted.",
  "dev.intuitive_synthesis.medium.exp.1": "When a hunch and your analysis disagree, sit with both for a day before picking one.",
  "dev.intuitive_synthesis.medium.exp.2": "Try explaining a snap judgment out loud — often the reasoning was there, just unspoken.",
  "dev.intuitive_synthesis.medium.caution.1": "Mixing modes inconsistently can mean neither gets refined — notice which one you actually trust under pressure.",
  "dev.intuitive_synthesis.high.exp.1": "Pressure-test one strong hunch this month against the actual evidence before acting on it.",
  "dev.intuitive_synthesis.high.exp.2": "When explaining a conclusion to someone else, practice building the step-by-step case, not just the answer.",
  "dev.intuitive_synthesis.high.caution.1": "A felt sense of rightness can be very convincingly wrong — it's hardest to catch exactly when it feels most obvious.",

  /* ------------------------------------------------- systems_abstraction */
  "dev.systems_abstraction.low.exp.1": "Next time something breaks, ask what pattern or structure produced it, not just what happened in the moment.",
  "dev.systems_abstraction.low.exp.2": "Try sketching how three separate things you're dealing with actually connect.",
  "dev.systems_abstraction.low.caution.1": "Staying close to specifics isn't a limitation — it can mean faster, more concrete action without waiting to model the whole system.",
  "dev.systems_abstraction.medium.exp.1": "Zoom out one level on a current problem: what's the general shape, not just this instance of it?",
  "dev.systems_abstraction.medium.exp.2": "Try explaining a system you know well using an analogy from a completely different domain.",
  "dev.systems_abstraction.medium.caution.1": "Abstraction that never comes back down to specifics can leave plans that sound coherent but don't survive contact with detail.",
  "dev.systems_abstraction.high.exp.1": "Take one abstract model you rely on and stress-test it against a messy, real exception.",
  "dev.systems_abstraction.high.exp.2": "Practice explaining your framework to someone who wants the concrete version, not the structure.",
  "dev.systems_abstraction.high.caution.1": "Structure-first thinking can miss what's actually in front of you if the map stops matching the territory.",

  /* ------------------------------------------------- independent_thinking */
  "dev.independent_thinking.low.exp.1": "Next time the group leans one way, privately write down your own view before hearing anyone else's.",
  "dev.independent_thinking.low.exp.2": "Pick one widely-accepted opinion in your field and spend ten minutes genuinely questioning it.",
  "dev.independent_thinking.low.caution.1": "Weighing group input heavily isn't a flaw — it can mean faster alignment and fewer costly solo mistakes.",
  "dev.independent_thinking.medium.exp.1": "Notice the next time you adjust your view mainly because of who else holds it, not new evidence.",
  "dev.independent_thinking.medium.exp.2": "Voice a dissenting view once this week, even on something minor.",
  "dev.independent_thinking.medium.caution.1": "Independence that only shows up occasionally can look inconsistent rather than principled.",
  "dev.independent_thinking.high.exp.1": "Before rejecting the consensus view, steelman it as strongly as you can first.",
  "dev.independent_thinking.high.exp.2": "Actively seek out one person likely to disagree with you before finalising a decision.",
  "dev.independent_thinking.high.caution.1": "Reflexive contrarianism costs you the real value of expertise and consensus when they're actually right.",

  /* -------------------------------------------------- creative_originality */
  "dev.creative_originality.low.exp.1": "Take something that already works and deliberately change one rule of it, just to see what happens.",
  "dev.creative_originality.low.exp.2": "Set a timer for 10 minutes and generate as many variations on one idea as you can, no filtering.",
  "dev.creative_originality.low.caution.1": "Working within established forms isn't a shortcoming — refinement of what already works is its own skill.",
  "dev.creative_originality.medium.exp.1": "Combine two ideas from unrelated areas you're familiar with and see what forms.",
  "dev.creative_originality.medium.exp.2": "Share a rough, unfinished idea before it feels ready, and watch what reactions teach you.",
  "dev.creative_originality.medium.caution.1": "Novelty for its own sake, untethered from a real problem, can become its own kind of formula.",
  "dev.creative_originality.high.exp.1": "Take your most original idea this month and pressure-test it against a boring, practical constraint.",
  "dev.creative_originality.high.exp.2": "Finish and ship one thing instead of starting a new variation.",
  "dev.creative_originality.high.caution.1": "A strong pull toward the unusual can mean walking past genuinely good conventional solutions.",

  /* -------------------------------------------------------- experimentation */
  "dev.experimentation.low.exp.1": "Pick one small assumption you're currently treating as fixed and test it this week.",
  "dev.experimentation.low.exp.2": "Build the roughest possible version of something before refining it.",
  "dev.experimentation.low.caution.1": "Preferring to plan carefully before acting isn't wrong — it can avoid a lot of wasted motion.",
  "dev.experimentation.medium.exp.1": "Run one experiment with a clear before/after you'll actually check.",
  "dev.experimentation.medium.exp.2": "Try a different approach to something you already do well, just to see what you learn.",
  "dev.experimentation.medium.caution.1": "Trying things without tracking outcomes can feel productive without actually teaching you anything.",
  "dev.experimentation.high.exp.1": "Pick one experiment result and follow it all the way to a real decision, instead of moving to the next test.",
  "dev.experimentation.high.exp.2": "Ask what you'd need to see to stop iterating on something and call it done.",
  "dev.experimentation.high.caution.1": "Constant experimentation can become a way to avoid commitment — nothing ever has to be finished or judged.",

  /* ------------------------------------------------------- cross_domain_range */
  "dev.cross_domain_range.low.exp.1": "Pick one method from a field outside your own and try applying it to something you're working on.",
  "dev.cross_domain_range.low.exp.2": "Spend an hour this week reading something entirely outside your usual domain.",
  "dev.cross_domain_range.low.caution.1": "Staying deep in one lane isn't a weakness — depth is its own genuine advantage.",
  "dev.cross_domain_range.medium.exp.1": "Notice a problem in one area that resembles one you've already solved somewhere else.",
  "dev.cross_domain_range.medium.exp.2": "Explain your specialty to someone from a completely different field and see what translates.",
  "dev.cross_domain_range.medium.caution.1": "Spreading attention across domains without depth anywhere can leave you a step behind true specialists everywhere.",
  "dev.cross_domain_range.high.exp.1": "Pick one domain and commit to going deeper before adding a new one.",
  "dev.cross_domain_range.high.exp.2": "Notice when a cross-domain analogy is actually misleading rather than illuminating.",
  "dev.cross_domain_range.high.caution.1": "Breadth without follow-through can look like expertise it isn't — it's worth being honest about where you're shallow.",

  /* ------------------------------------------------- aesthetic_sensitivity */
  "dev.aesthetic_sensitivity.low.exp.1": "Next time you finish something, spend five extra minutes just on how it looks or feels, not just whether it works.",
  "dev.aesthetic_sensitivity.low.exp.2": "Pick something you admire and try to name specifically what makes it work.",
  "dev.aesthetic_sensitivity.low.caution.1": "Prioritising function over form isn't a flaw — plenty of excellent work is judged on nothing else.",
  "dev.aesthetic_sensitivity.medium.exp.1": "Get a second opinion on the look/feel of something before calling it finished.",
  "dev.aesthetic_sensitivity.medium.exp.2": "Notice one small aesthetic choice you usually skip, and make it deliberately once.",
  "dev.aesthetic_sensitivity.medium.caution.1": "Inconsistent attention to aesthetics can read as carelessness even when the substance is solid.",
  "dev.aesthetic_sensitivity.high.exp.1": "Set a firm deadline before starting so refinement has a hard stop.",
  "dev.aesthetic_sensitivity.high.exp.2": "Ship one thing before it feels aesthetically complete, and notice whether anyone else even minds.",
  "dev.aesthetic_sensitivity.high.caution.1": "Chasing polish past the point of diminishing returns can quietly become a way to avoid finishing.",

  /* --------------------------------------------------------------- discipline */
  "dev.discipline.low.exp.1": "Pick one small commitment and do it at the same time every day for a week, no exceptions.",
  "dev.discipline.low.exp.2": "Lower the bar for a habit you want until it's almost too easy to skip — then actually do it daily.",
  "dev.discipline.low.caution.1": "Loose structure isn't automatically a problem — it can mean more room to follow what the moment actually needs.",
  "dev.discipline.medium.exp.1": "Identify the one habit that would matter most right now, and protect it for two weeks.",
  "dev.discipline.medium.exp.2": "Notice which days discipline slips, and what's different about them.",
  "dev.discipline.medium.caution.1": "Discipline that only shows up under external pressure isn't the same as discipline that holds on its own.",
  "dev.discipline.high.exp.1": "Deliberately break your own routine once this week and notice what, if anything, actually goes wrong.",
  "dev.discipline.high.exp.2": "Build in a scheduled exception, on purpose, so the system bends instead of breaking under real disruption.",
  "dev.discipline.high.caution.1": "Rigid discipline can turn into its own form of avoidance — following the routine instead of reassessing whether it's still the right one.",

  /* --------------------------------------------------------------- deep_focus */
  "dev.deep_focus.low.exp.1": "Block 25 minutes with notifications off and one single task — nothing else allowed.",
  "dev.deep_focus.low.exp.2": "Notice what specifically breaks your focus first, and remove just that one thing tomorrow.",
  "dev.deep_focus.low.caution.1": "Working in shorter bursts isn't a deficiency — it can mean more natural breaks to reassess and stay fresh.",
  "dev.deep_focus.medium.exp.1": "Extend your longest uninterrupted block by 15 minutes this week.",
  "dev.deep_focus.medium.exp.2": "Protect one specific hour of your day as focus-only, same time daily.",
  "dev.deep_focus.medium.caution.1": "Inconsistent focus can mean your best work depends on unreliable conditions instead of a repeatable practice.",
  "dev.deep_focus.high.exp.1": "Set an alarm to check in with your body and surroundings during a long focus session.",
  "dev.deep_focus.high.exp.2": "Practice a clean stopping point instead of always pushing until you're interrupted.",
  "dev.deep_focus.high.caution.1": "Losing track of time and context for long stretches can mean missing things — people, deadlines, your own needs — happening around you.",

  /* -------------------------------------------------------- detail_orientation */
  "dev.detail_orientation.low.exp.1": "Before calling something finished, do one dedicated pass looking only for small errors.",
  "dev.detail_orientation.low.exp.2": "Pick one recurring task and build a short checklist for it.",
  "dev.detail_orientation.low.caution.1": "Focusing on the big picture over small details isn't wrong — it can mean faster progress on what actually matters most.",
  "dev.detail_orientation.medium.exp.1": "Notice which kinds of details you catch reliably and which you consistently miss.",
  "dev.detail_orientation.medium.exp.2": "Have someone else review the fine points on something important before it ships.",
  "dev.detail_orientation.medium.caution.1": "Inconsistent attention to detail can be more frustrating for collaborators than either consistently high or low attention.",
  "dev.detail_orientation.high.exp.1": "Before polishing further, ask whether this level of detail actually matters for this specific thing.",
  "dev.detail_orientation.high.exp.2": "Practice deliberately shipping something \"good enough\" and tracking whether it actually caused a problem.",
  "dev.detail_orientation.high.caution.1": "Chasing every detail can slow things down past the point where the extra precision changes anything.",

  /* ---------------------------------------------------------------- perfectionism */
  "dev.perfectionism.low.exp.1": "Pick one piece of work and do a single deliberate revision pass before calling it done.",
  "dev.perfectionism.low.exp.2": "Notice one place where \"good enough\" actually cost you something, and name what standard would've helped.",
  "dev.perfectionism.low.caution.1": "A relaxed relationship with \"done\" isn't a flaw — it usually means more gets finished and shipped.",
  "dev.perfectionism.medium.exp.1": "Before revising again, ask what specifically would improve, not just whether it could improve.",
  "dev.perfectionism.medium.exp.2": "Set a personal \"good enough\" bar in advance for your next piece of work, then hold it.",
  "dev.perfectionism.medium.caution.1": "Inconsistent standards — exacting on some things, loose on others — can be confusing for people relying on your output.",
  "dev.perfectionism.high.exp.1": "Set a hard deadline before starting, specifically to stop endless revision.",
  "dev.perfectionism.high.exp.2": "Ship one thing at 90% and track what actually happens as a result.",
  "dev.perfectionism.high.caution.1": "Pursued far enough, perfectionism delays or prevents finishing — the work that never ships helps no one.",

  /* --------------------------------------------------------------- execution_speed */
  "dev.execution_speed.low.exp.1": "Pick one task you'd normally deliberate over and do it today instead.",
  "dev.execution_speed.low.exp.2": "Set an artificial deadline for something with no real one, and hold yourself to it.",
  "dev.execution_speed.low.caution.1": "Moving deliberately isn't a weakness — it often means fewer mistakes made in the rush.",
  "dev.execution_speed.medium.exp.1": "Notice the point where more deliberation stops adding value on your next decision.",
  "dev.execution_speed.medium.exp.2": "Time-box one task this week and stop when the timer ends, regardless of \"done.\"",
  "dev.execution_speed.medium.caution.1": "Inconsistent pace — fast on some things, slow on others — can be less predictable for people depending on you than either extreme.",
  "dev.execution_speed.high.exp.1": "Before shipping, take one extra pass specifically to check for a fixable, costly mistake.",
  "dev.execution_speed.high.exp.2": "Practice explicitly separating \"fast because it's simple\" from \"fast because I'm rushing something that matters.\"",
  "dev.execution_speed.high.caution.1": "Speed that consistently outruns quality control creates rework — sometimes slower really is faster overall.",

  /* -------------------------------------------------------------- planning_orientation */
  "dev.planning_orientation.low.exp.1": "Before starting your next project, spend 20 minutes outlining the first three steps.",
  "dev.planning_orientation.low.exp.2": "Write down one likely obstacle in advance and a rough plan for it.",
  "dev.planning_orientation.low.caution.1": "Working things out as you go isn't a flaw — it keeps you responsive to what's actually happening.",
  "dev.planning_orientation.medium.exp.1": "Notice which kinds of tasks you plan carefully and which you wing, and whether that split is deliberate.",
  "dev.planning_orientation.medium.exp.2": "Build a lightweight plan for something you'd normally just start.",
  "dev.planning_orientation.medium.caution.1": "Plans that are neither firm nor flexible can leave you committed to structure without getting its real benefits.",
  "dev.planning_orientation.high.exp.1": "Before executing a plan, name in advance what would make you abandon it.",
  "dev.planning_orientation.high.exp.2": "Deliberately start one small thing without a plan, and notice what you learn from the improvisation.",
  "dev.planning_orientation.high.caution.1": "Over-planning can become its own form of stalling, especially when the real world won't sit still long enough to match the plan.",

  /* --------------------------------------------------------------------- persistence */
  "dev.persistence.low.exp.1": "Pick one thing you abandoned and give it one more real attempt with a different approach.",
  "dev.persistence.low.exp.2": "Set a minimum effort threshold for your next setback before you're allowed to quit.",
  "dev.persistence.low.caution.1": "Letting go of what isn't working isn't a weakness — it frees you to redirect effort somewhere more promising.",
  "dev.persistence.medium.exp.1": "Before quitting something, name specifically what would need to be true for it to be worth continuing.",
  "dev.persistence.medium.exp.2": "Track one long effort's small wins along the way, not just the final outcome.",
  "dev.persistence.medium.caution.1": "Persistence that only shows up when things are going well isn't the same as persistence through an actual setback.",
  "dev.persistence.high.exp.1": "Set a specific, pre-decided condition under which you'd genuinely stop and redirect.",
  "dev.persistence.high.exp.2": "Ask someone else, honestly, whether this is still worth pursuing.",
  "dev.persistence.high.caution.1": "Persistence past the point of real signal becomes sunk-cost — the hardest costs to see are the ones you've already paid.",

  /* ---------------------------------------------------------------------- adaptability */
  "dev.adaptability.low.exp.1": "Next time plans change, try going with the new version for a day before pushing back.",
  "dev.adaptability.low.exp.2": "Deliberately take a different route or method for something routine, just to practice the switch.",
  "dev.adaptability.low.caution.1": "Staying the course isn't a flaw — consistency has its own real value, especially when a plan is actually working.",
  "dev.adaptability.medium.exp.1": "Notice what specifically makes a change feel disruptive versus fine, and whether that pattern is worth examining.",
  "dev.adaptability.medium.exp.2": "Practice a same-day pivot on something low-stakes when new information arrives.",
  "dev.adaptability.medium.caution.1": "Switching approaches without finishing the last one can mean nothing gets the follow-through it needs.",
  "dev.adaptability.high.exp.1": "Before pivoting, ask whether the original plan actually failed or just got uncomfortable.",
  "dev.adaptability.high.exp.2": "Pick one thing to stick with on purpose, specifically resisting the pull to change it.",
  "dev.adaptability.high.caution.1": "Adapting too readily can mean never letting a plan run long enough to actually prove itself.",

  /* --------------------------------------------------------------------- risk_tolerance */
  "dev.risk_tolerance.low.exp.1": "Take one small, genuinely low-stakes risk this week specifically to notice how it feels.",
  "dev.risk_tolerance.low.exp.2": "Name the actual worst case for something you're hesitating on, and how recoverable it really is.",
  "dev.risk_tolerance.low.caution.1": "Caution isn't a weakness — it's often exactly what avoids the losses that undo bigger risks elsewhere.",
  "dev.risk_tolerance.medium.exp.1": "Before deciding, write down the real downside and your actual ability to absorb it.",
  "dev.risk_tolerance.medium.exp.2": "Notice one place you're being cautious out of habit rather than an actual read of the risk.",
  "dev.risk_tolerance.medium.caution.1": "Inconsistent risk tolerance — bold in some areas, cautious in others — can mean unmanaged blind spots either way.",
  "dev.risk_tolerance.high.exp.1": "Before committing, name explicitly what you'd lose if this goes wrong, not just what you'd gain if it works.",
  "dev.risk_tolerance.high.exp.2": "Size one upcoming bet deliberately smaller than your instinct says to.",
  "dev.risk_tolerance.high.caution.1": "A high appetite for risk works until the one loss that isn't recoverable — worth knowing in advance which bets those are.",

  /* ------------------------------------------------------------------ ambiguity_tolerance */
  "dev.ambiguity_tolerance.low.exp.1": "Next time something is unclear, sit with the uncertainty for a day before pushing to resolve it.",
  "dev.ambiguity_tolerance.low.exp.2": "Start a task with an incomplete brief on purpose, and fill in gaps as you go.",
  "dev.ambiguity_tolerance.low.caution.1": "Wanting clarity before acting isn't a flaw — it often prevents wasted effort built on wrong assumptions.",
  "dev.ambiguity_tolerance.medium.exp.1": "Notice the specific point where ambiguity starts to feel uncomfortable, and what you do about it.",
  "dev.ambiguity_tolerance.medium.exp.2": "Make one decision this week with less information than you'd normally wait for.",
  "dev.ambiguity_tolerance.medium.caution.1": "Comfort with ambiguity that never resolves into a decision can leave things permanently open-ended.",
  "dev.ambiguity_tolerance.high.exp.1": "Practice naming the ambiguity explicitly to collaborators instead of just absorbing it quietly.",
  "dev.ambiguity_tolerance.high.exp.2": "Set a point at which you'll seek clarity even though you don't strictly need to.",
  "dev.ambiguity_tolerance.high.caution.1": "High tolerance for unclear situations can mean moving forward on things that genuinely needed more definition first.",

  /* --------------------------------------------------------------------------- decisiveness */
  "dev.decisiveness.low.exp.1": "Set a firm deadline for your next decision, even an artificial one.",
  "dev.decisiveness.low.exp.2": "Practice making one low-stakes choice within 60 seconds today.",
  "dev.decisiveness.low.caution.1": "Taking time to decide isn't a weakness — it often means better-considered choices.",
  "dev.decisiveness.medium.exp.1": "Before deciding, name the one piece of information that would actually change your answer.",
  "dev.decisiveness.medium.exp.2": "Notice which kinds of decisions you make quickly and which you stall on, and why.",
  "dev.decisiveness.medium.caution.1": "Inconsistent decisiveness — fast on some calls, stuck on others — can be more disruptive to collaborators than either extreme.",
  "dev.decisiveness.high.exp.1": "Before committing, pause long enough to name one thing that could prove you wrong.",
  "dev.decisiveness.high.exp.2": "Practice saying \"let me think about this\" once this week, even when your instinct wants to answer now.",
  "dev.decisiveness.high.caution.1": "Deciding quickly can mean deciding before the information that mattered actually arrived.",

  /* ------------------------------------------------------------------- social_assertiveness */
  "dev.social_assertiveness.low.exp.1": "Speak first in one meeting this week, before you'd normally jump in.",
  "dev.social_assertiveness.low.exp.2": "Practice stating an opinion directly instead of framing it as a question.",
  "dev.social_assertiveness.low.caution.1": "Holding back isn't a weakness — it often means more room for others and more listening before responding.",
  "dev.social_assertiveness.medium.exp.1": "Notice one situation where you held back and name what stopped you.",
  "dev.social_assertiveness.medium.exp.2": "Practice taking up slightly more space in a conversation than feels automatic.",
  "dev.social_assertiveness.medium.caution.1": "Assertiveness that shows up unevenly can read as unpredictable rather than as a considered choice.",
  "dev.social_assertiveness.high.exp.1": "Practice deliberately pausing and inviting someone else to speak first.",
  "dev.social_assertiveness.high.exp.2": "Notice one meeting where holding back would have surfaced someone else's better idea.",
  "dev.social_assertiveness.high.caution.1": "Strong assertiveness can crowd out quieter voices that had something worth hearing.",

  /* ---------------------------------------------------------------------------- collaboration */
  "dev.collaboration.low.exp.1": "Bring one piece of solo work to someone else before it's finished, specifically for their input.",
  "dev.collaboration.low.exp.2": "Ask a genuine question about someone else's approach before offering your own.",
  "dev.collaboration.low.caution.1": "Working independently isn't a flaw — it can mean faster progress and clearer ownership on the right kind of task.",
  "dev.collaboration.medium.exp.1": "Notice one task you default to doing alone that could genuinely benefit from another person.",
  "dev.collaboration.medium.exp.2": "Practice handing off a piece of a project instead of doing all of it yourself.",
  "dev.collaboration.medium.caution.1": "Collaborating inconsistently can be more confusing for a team than a clear, known pattern either way.",
  "dev.collaboration.high.exp.1": "Take one task and deliberately do it solo, start to finish, before looping anyone in.",
  "dev.collaboration.high.exp.2": "Notice a decision you deferred to the group that you actually had a clear, informed view on.",
  "dev.collaboration.high.caution.1": "A strong pull toward consensus can slow decisions down or dilute a genuinely good individual call.",

  /* ------------------------------------------------------------------------------ leadership_drive */
  "dev.leadership_drive.low.exp.1": "Volunteer to own one small decision or task end-to-end this week.",
  "dev.leadership_drive.low.exp.2": "Practice stating a clear recommendation instead of just laying out the options.",
  "dev.leadership_drive.low.caution.1": "Not seeking to lead isn't a weakness — it can mean more focus and less overhead spent managing others.",
  "dev.leadership_drive.medium.exp.1": "Notice one moment where no one was steering and step into it deliberately.",
  "dev.leadership_drive.medium.exp.2": "Practice setting direction for a small group task, even briefly.",
  "dev.leadership_drive.medium.caution.1": "Leading only when convenient can read as inconsistent to people who need to know whether to look to you or not.",
  "dev.leadership_drive.high.exp.1": "Practice deliberately stepping back and letting someone else set direction on something you'd normally own.",
  "dev.leadership_drive.high.exp.2": "Ask directly whether people want you leading this, before assuming they do.",
  "dev.leadership_drive.high.caution.1": "A strong pull to direct things can crowd out other people's ownership and initiative, even when you're right.",

  /* -------------------------------------------------------------------------------- persuasiveness */
  "dev.persuasiveness.low.exp.1": "Before your next pitch, write down the strongest version of the other side's view first.",
  "dev.persuasiveness.low.exp.2": "Practice stating your case in one clear sentence before adding supporting detail.",
  "dev.persuasiveness.low.caution.1": "Not pushing to persuade isn't a weakness — it can mean people trust that your \"yes\" means yes.",
  "dev.persuasiveness.medium.exp.1": "Notice one place you let a good point go unstated because it felt like too much effort to argue.",
  "dev.persuasiveness.medium.exp.2": "Practice making your case once, clearly, without over-explaining.",
  "dev.persuasiveness.medium.caution.1": "Inconsistent persuasive effort can mean your best ideas don't land just because you didn't push them as hard.",
  "dev.persuasiveness.high.exp.1": "Before pressing your case again, ask whether the other person actually needs more information or just more room.",
  "dev.persuasiveness.high.exp.2": "Practice presenting a case and then explicitly inviting the strongest counter-argument.",
  "dev.persuasiveness.high.caution.1": "Strong persuasive skill can win an argument that shouldn't have been won — being convincing isn't the same as being right.",

  /* ----------------------------------------------------------------------------------- conflict_tolerance */
  "dev.conflict_tolerance.low.exp.1": "Name one small disagreement directly this week instead of letting it pass.",
  "dev.conflict_tolerance.low.exp.2": "Practice stating a mild objection out loud in a low-stakes conversation.",
  "dev.conflict_tolerance.low.caution.1": "Avoiding conflict isn't a weakness — it often keeps relationships and rooms genuinely workable.",
  "dev.conflict_tolerance.medium.exp.1": "Notice one disagreement you're currently avoiding and name what you're actually afraid will happen.",
  "dev.conflict_tolerance.medium.exp.2": "Practice raising a real objection calmly, once, this week.",
  "dev.conflict_tolerance.medium.caution.1": "Inconsistent willingness to engage conflict can make it hard for others to predict when you'll actually push back.",
  "dev.conflict_tolerance.high.exp.1": "Before engaging a disagreement, ask whether this particular one is actually worth having.",
  "dev.conflict_tolerance.high.exp.2": "Practice letting one minor disagreement go on purpose, without needing to resolve it.",
  "dev.conflict_tolerance.high.caution.1": "A high appetite for conflict can turn minor disagreements into unnecessary fights.",

  /* ---------------------------------------------------------------------------------------- mastery_orientation */
  "dev.mastery_orientation.low.exp.1": "Pick one skill and spend 20 focused minutes deliberately practising just that, this week.",
  "dev.mastery_orientation.low.exp.2": "Ask for specific feedback on one thing you'd like to improve, not just general feedback.",
  "dev.mastery_orientation.low.caution.1": "Not chasing mastery on everything isn't a flaw — it leaves more room for breadth and for things that are just useful, not deeply honed.",
  "dev.mastery_orientation.medium.exp.1": "Pick one area and commit to noticeable improvement over the next month, tracked concretely.",
  "dev.mastery_orientation.medium.exp.2": "Notice what specifically you're optimising for — is it genuine skill, or just comfort with what you already do well?",
  "dev.mastery_orientation.medium.caution.1": "Mastery-seeking applied unevenly can mean deep skill in comfortable areas and real gaps in ones you avoid.",
  "dev.mastery_orientation.high.exp.1": "Apply your skill to a genuinely new domain where you'll be a beginner again.",
  "dev.mastery_orientation.high.exp.2": "Practice shipping something before it meets your own bar for mastery.",
  "dev.mastery_orientation.high.caution.1": "An intense pull toward mastery can turn into perfectionism or make it hard to ever call something finished.",

  /* --------------------------------------------------------------------------------------------- achievement_drive */
  "dev.achievement_drive.low.exp.1": "Set one concrete, specific goal for this week and track whether you hit it.",
  "dev.achievement_drive.low.exp.2": "Notice one recent accomplishment you didn't acknowledge, and actually acknowledge it.",
  "dev.achievement_drive.low.caution.1": "A relaxed relationship with achievement isn't a flaw — it can mean less burnout and more room for things that don't produce a visible result.",
  "dev.achievement_drive.medium.exp.1": "Set one goal that's genuinely yours, not inherited from what you think you should want.",
  "dev.achievement_drive.medium.exp.2": "Notice whether your drive shows up consistently or mainly around external recognition.",
  "dev.achievement_drive.medium.caution.1": "Achievement drive that depends on visible wins can leave you flat during the necessary, unglamorous stretches.",
  "dev.achievement_drive.high.exp.1": "Practice sitting with something finished without immediately moving to the next goal.",
  "dev.achievement_drive.high.exp.2": "Ask whether your current goal is actually yours, or just the next rung on a ladder you stopped examining.",
  "dev.achievement_drive.high.caution.1": "Strong achievement drive can crowd out rest, relationships, or goals that don't produce a checkable result.",

  /* -------------------------------------------------------------------------------------------------- competitiveness */
  "dev.competitiveness.low.exp.1": "Set a personal best for yourself on something this week, independent of anyone else's performance.",
  "dev.competitiveness.low.exp.2": "Notice one situation where a bit of competitive push would actually help you, and lean into it.",
  "dev.competitiveness.low.caution.1": "Not measuring yourself against others isn't a weakness — it can mean more genuine cooperation and less zero-sum thinking.",
  "dev.competitiveness.medium.exp.1": "Notice which situations bring out your competitive streak and whether that pattern serves you.",
  "dev.competitiveness.medium.exp.2": "Practice treating one comparison as information rather than a verdict.",
  "dev.competitiveness.medium.caution.1": "Competitiveness that flares unpredictably can be more disruptive to collaborators than either a steady drive or none at all.",
  "dev.competitiveness.high.exp.1": "Practice genuinely celebrating someone else's win this week, specifically one that isn't about you.",
  "dev.competitiveness.high.exp.2": "Ask whether you're competing because it matters here, or out of habit.",
  "dev.competitiveness.high.caution.1": "Strong competitiveness can turn collaborative situations adversarial even when nobody else is actually competing.",

  /* -------------------------------------------------------------------------------------------------------- autonomy_need */
  "dev.autonomy_need.low.exp.1": "Take ownership of one small decision end-to-end this week, without checking in first.",
  "dev.autonomy_need.low.exp.2": "Notice one place you deferred that you actually had a clear view on.",
  "dev.autonomy_need.low.caution.1": "Preferring shared direction isn't a weakness — it can mean better-aligned outcomes and less solo risk.",
  "dev.autonomy_need.medium.exp.1": "Notice which tasks you want full control over and which you're fine sharing, and whether that split is deliberate.",
  "dev.autonomy_need.medium.exp.2": "Practice asking for more latitude on one specific task this week.",
  "dev.autonomy_need.medium.caution.1": "An inconsistent need for autonomy can be confusing to collaborators trying to know when to check in versus step back.",
  "dev.autonomy_need.high.exp.1": "Practice explicitly inviting input on something you'd normally just decide alone.",
  "dev.autonomy_need.high.exp.2": "Notice one place where more structure or oversight would actually have helped, not hurt.",
  "dev.autonomy_need.high.caution.1": "A strong need for independence can shade into difficulty being managed or coordinated with, even by people trying to help.",

  /* ------------------------------------------------------------------------------------------------------------- impact_motivation */
  "dev.impact_motivation.low.exp.1": "Pick one piece of work and trace, concretely, who it actually reaches or helps.",
  "dev.impact_motivation.low.exp.2": "Notice one moment your work mattered to someone, even quietly, and let that register.",
  "dev.impact_motivation.low.caution.1": "Not needing visible impact isn't a flaw — it can mean more focus on craft for its own sake, without needing external payoff.",
  "dev.impact_motivation.medium.exp.1": "Before starting your next project, name specifically who it's for.",
  "dev.impact_motivation.medium.exp.2": "Notice whether your sense of impact depends on scale, or on depth for a smaller group — and whether that's the tradeoff you want.",
  "dev.impact_motivation.medium.caution.1": "Impact motivation that depends entirely on visible reach can undervalue quieter work that still genuinely matters.",
  "dev.impact_motivation.high.exp.1": "Practice finishing one piece of quality work with no plan for how it reaches anyone yet.",
  "dev.impact_motivation.high.exp.2": "Ask whether you're chasing reach at the cost of depth on something that would benefit from more of it.",
  "dev.impact_motivation.high.caution.1": "A strong pull toward impact can push toward whatever scales fastest, even when slower, deeper work would matter more.",

  /* ================================================================
     PHASE 7 STAGE 7C — development guides for the 4 taxonomy_v1.1
     attributes added at Phase 6.6 (opportunity_sensing, resourcefulness,
     proactive_agency, belief_updating). Same schema, tone, and "high band
     is never just 'get more of this'" discipline as the original 30
     above. See development.ts header for why these were deliberately NOT
     authored at Phase 6.6 Stage 9 (taxonomy migration in progress) and are
     completed here instead.
     ================================================================ */
  "dev.opportunity_sensing.low.exp.1":
    "Once this week, before deciding something's not relevant, spend five minutes asking what it might be an early sign of.",
  "dev.opportunity_sensing.low.exp.2":
    "Pick one thing you follow loosely and check it slightly more often than usual for a week, just to notice what normally passes you by.",
  "dev.opportunity_sensing.low.caution.1":
    "Waiting for a pattern to become clear before acting is a real form of discipline — it protects you from chasing noise, not a blind spot.",
  "dev.opportunity_sensing.medium.exp.1":
    "Next time something catches your attention as maybe-relevant, write it down and check back on it in a month instead of immediately acting or immediately dismissing it.",
  "dev.opportunity_sensing.medium.exp.2":
    "Notice which parts of your world you actually track closely, and whether that's still the right set to be watching.",
  "dev.opportunity_sensing.medium.caution.1":
    "Tracking too many loose signals at once can leave you reacting a little to everything and fully to nothing.",
  "dev.opportunity_sensing.high.exp.1":
    "Before acting on an early signal, ask what would have to be true for it to be noise instead of a real pattern.",
  "dev.opportunity_sensing.high.exp.2":
    "Pick one weak signal you've noticed recently and deliberately wait before acting on it, to calibrate how often it turns out real.",
  "dev.opportunity_sensing.high.caution.1":
    "Acting fast on early signals means sometimes acting on noise — the same instinct that catches real openings early also catches false ones.",

  "dev.resourcefulness.low.exp.1":
    "Next time your first-choice resource isn't available, spend ten minutes listing three substitutes before deciding whether to wait for the right one.",
  "dev.resourcefulness.low.exp.2":
    "Pick one recurring task where you always wait for ideal conditions, and try it once with what's actually on hand.",
  "dev.resourcefulness.low.caution.1":
    "Holding out for the right tool or resource protects quality — it isn't the same as being unable to adapt.",
  "dev.resourcefulness.medium.exp.1":
    "Next time you reach for a workaround, notice whether it's genuinely good enough or just convenient.",
  "dev.resourcefulness.medium.exp.2":
    "Practice naming, even just to yourself, when a substitute is temporary versus when it's quietly become the permanent way you do something.",
  "dev.resourcefulness.medium.caution.1":
    "Switching between 'push for the right resource' and 'make do' without a clear reason can make your standards look inconsistent to people around you.",
  "dev.resourcefulness.high.exp.1":
    "Before defaulting to a workaround, ask whether this is actually a case where the proper resource is worth waiting for.",
  "dev.resourcefulness.high.exp.2":
    "Pick one workaround you rely on regularly and check whether it's quietly become a permanent downgrade rather than a temporary fix.",
  "dev.resourcefulness.high.caution.1":
    "Comfort with substitutes can drift into normalising worse tools or conditions than the situation actually needs.",

  "dev.proactive_agency.low.exp.1":
    "Next time you notice something outside your formal role that could be improved, mention it to whoever owns it within the week instead of letting it pass.",
  "dev.proactive_agency.low.exp.2":
    "Pick one small thing you'd normally wait to be asked about, and take the first step yourself.",
  "dev.proactive_agency.low.caution.1":
    "Routing changes through the person responsible isn't passivity — it protects coordination and avoids acting on work you don't have full context on.",
  "dev.proactive_agency.medium.exp.1":
    "Before acting on something outside your role, notice whether you're checking first because it genuinely matters here or out of habit.",
  "dev.proactive_agency.medium.exp.2":
    "Try the opposite of your default once this week — if you'd normally ask first, act; if you'd normally act, ask first.",
  "dev.proactive_agency.medium.caution.1":
    "Being inconsistent about when you act unprompted and when you wait can be hard for people around you to predict.",
  "dev.proactive_agency.high.exp.1":
    "Before acting on something outside your formal responsibility, ask who else might have context you don't.",
  "dev.proactive_agency.high.exp.2":
    "Pick one thing you changed unprompted recently and check in with whoever owns that area, even after the fact.",
  "dev.proactive_agency.high.caution.1":
    "Acting without waiting for permission can create real friction when it bypasses someone else's ownership or context you didn't have.",

  "dev.belief_updating.low.exp.1":
    "Next time you get real pushback on a settled view, write down specifically what evidence would actually change your mind, before deciding whether this counts.",
  "dev.belief_updating.low.exp.2":
    "Pick one belief you've held a long time and check when you last actually tested it against new information.",
  "dev.belief_updating.low.caution.1":
    "Requiring strong evidence before reopening a settled position is a real form of conviction — it isn't the same as being closed-minded.",
  "dev.belief_updating.medium.exp.1":
    "Next time you revise a view, check whether the new evidence actually justified it or whether it was just the most recent thing you heard.",
  "dev.belief_updating.medium.exp.2":
    "Pick one position you're not fully sure about and deliberately seek out the strongest case against it.",
  "dev.belief_updating.medium.caution.1":
    "Updating some views quickly and others not at all, without a clear reason why, can look inconsistent even when each individual call was reasonable.",
  "dev.belief_updating.high.exp.1":
    "Before revising a settled view, give it a day and see if the new evidence still feels as strong.",
  "dev.belief_updating.high.exp.2":
    "Pick one recent belief change and check whether you'd have made the same call with only half the new information.",
  "dev.belief_updating.high.caution.1":
    "Updating readily means sometimes revising on evidence that doesn't hold up — the same openness that catches real errors early also catches false alarms.",

  /* ================================================================
     PHASE 7 HUMAN-REVIEW STAGE — "helps when" content (Issues 2 + 5).
     ONE sentence per attribute (all 34), reused by "Where You Bring
     Something Different" (the user's own higher pole on a
     HELPS_WHEN_HIGHER_SHAPES trait) and "Worth Exploring" (the target's
     higher pole on a contextual trait). See helpsWhenKey() in
     targetComparison.ts for the full rationale. Deliberately avoids
     "advantage"/"favour"/"stronger"/"better" — each sentence names a
     CONDITION the tendency helps under, never a general superiority claim.
     ================================================================ */
  "dev.curiosity.helps_when": "This tendency can be useful when there's real value in noticing what others have overlooked.",
  "dev.analytical_rigor.helps_when":
    "This tendency can be useful when a conclusion needs to hold up under real scrutiny before it's acted on.",
  "dev.intuitive_synthesis.helps_when":
    "This tendency can be useful when a workable answer is needed faster than a fully worked-through one.",
  "dev.systems_abstraction.helps_when":
    "This tendency can be useful when the underlying structure matters more than the immediate specifics.",
  "dev.independent_thinking.helps_when":
    "This tendency can be useful when a position needs to hold up under real pressure to conform.",
  "dev.belief_updating.helps_when": "This tendency can be useful when new evidence is genuinely strong enough to be worth acting on.",
  "dev.creative_originality.helps_when":
    "This tendency can be useful when an unfamiliar idea is more valuable than a familiar, reliable one.",
  "dev.experimentation.helps_when":
    "This tendency can be useful when trying something unproven is genuinely lower-cost than waiting for certainty.",
  "dev.cross_domain_range.helps_when":
    "This tendency can be useful when a problem benefits from connections across genuinely different fields.",
  "dev.aesthetic_sensitivity.helps_when":
    "This tendency can be useful when how something looks, sounds, or feels is part of what makes it work.",
  "dev.discipline.helps_when":
    "This tendency can be useful when steady, sustained effort matters more than short bursts of intensity.",
  "dev.deep_focus.helps_when": "This tendency can be useful when sustained concentration matters more than frequent switching.",
  "dev.detail_orientation.helps_when":
    "This tendency can be useful when a small inconsistency would otherwise become a real problem later.",
  "dev.perfectionism.helps_when": "This tendency can be useful when the small details are actually what the outcome depends on.",
  "dev.execution_speed.helps_when":
    "This tendency can be useful when getting something real in front of people sooner matters more than polish.",
  "dev.planning_orientation.helps_when":
    "This tendency can be useful when the cost of an avoidable mistake outweighs the cost of the time spent planning.",
  "dev.persistence.helps_when":
    "This tendency can be useful when staying with something longer is what actually gets it across the line.",
  "dev.adaptability.helps_when":
    "This tendency can be useful when circumstances are changing faster than a fixed plan can keep up with.",
  "dev.risk_tolerance.helps_when": "This tendency can be useful when meaningful upside requires accepting genuine uncertainty.",
  "dev.ambiguity_tolerance.helps_when":
    "This tendency can be useful when making progress requires moving before the picture is fully clear.",
  "dev.decisiveness.helps_when":
    "This tendency can be useful when the cost of further delay outweighs the value of more information.",
  "dev.social_assertiveness.helps_when": "This tendency can be useful when a group needs someone willing to speak first.",
  "dev.collaboration.helps_when": "This tendency can be useful when the work genuinely benefits from more than one perspective.",
  "dev.leadership_drive.helps_when": "This tendency can be useful when a group needs someone to set direction.",
  "dev.persuasiveness.helps_when":
    "This tendency can be useful when getting others genuinely aligned matters for what happens next.",
  "dev.conflict_tolerance.helps_when":
    "This tendency can be useful when a disagreement genuinely needs to be surfaced rather than smoothed over.",
  "dev.mastery_orientation.helps_when":
    "This tendency can be useful when getting genuinely better at something matters more than finishing it quickly.",
  "dev.achievement_drive.helps_when": "This tendency can be useful when a genuinely higher bar is worth setting for yourself.",
  "dev.competitiveness.helps_when": "This tendency can be useful when direct comparison is what actually drives better effort.",
  "dev.autonomy_need.helps_when":
    "This tendency can be useful when the work genuinely benefits from one clear, self-directed approach.",
  "dev.impact_motivation.helps_when":
    "This tendency can be useful when the value of the work depends on how far its effects actually reach.",
  "dev.opportunity_sensing.helps_when":
    "This tendency can be useful when there's real value in noticing a shift before it's obvious to everyone else.",
  "dev.resourcefulness.helps_when":
    "This tendency can be useful when the work genuinely needs to keep moving despite imperfect conditions.",
  "dev.proactive_agency.helps_when":
    "This tendency can be useful when a genuine improvement would otherwise sit waiting for someone to be assigned to it.",

  /* ================================================================
     PHASE 7 HUMAN-REVIEW STAGE, SECOND PASS — "preserves" content, for
     Worth Exploring's second statement specifically. What the LOWER pole
     of a `contextual` attribute genuinely protects — NOT a generic
     caution about the trait, and deliberately NOT the dev-guide caution
     corpus (that content is banded by absolute score for a different
     purpose; reused here it answered the wrong question — see
     PRESERVES_ATTRIBUTE_IDS in targetComparison.ts for the full finding).
     ONE sentence per `contextual` attribute (all 12).
     ================================================================ */
  "dev.intuitive_synthesis.preserves":
    "Working through a conclusion more deliberately can protect against acting on a pattern that doesn't actually hold up.",
  "dev.cross_domain_range.preserves":
    "Staying within one area for longer can protect the depth that real mastery there requires.",
  "dev.aesthetic_sensitivity.preserves":
    "Judging something mainly by whether it works can protect against decisions driven by surface appeal alone.",
  "dev.detail_orientation.preserves":
    "Letting small inconsistencies pass can protect momentum on work that doesn't depend on that level of precision.",
  "dev.planning_orientation.preserves":
    "Starting before every detail is planned can protect against losing time to planning that circumstances will outdate anyway.",
  "dev.social_assertiveness.preserves":
    "Waiting to speak can protect space for others to contribute before the conversation settles on one view.",
  "dev.conflict_tolerance.preserves":
    "Choosing not to press a disagreement can protect a relationship or a group's cohesion when the stakes don't call for the friction.",
  "dev.competitiveness.preserves": "Not measuring effort against others can protect a steadier, more internally-driven pace.",
  "dev.autonomy_need.preserves": "Working within a shared approach can protect coordination and consistency across a group.",
  "dev.opportunity_sensing.preserves":
    "Waiting for a clearer signal can protect against acting on a pattern that turns out to be noise.",
  "dev.resourcefulness.preserves":
    "Preferring to secure the right resources first can protect standards, quality, or consistency when a workaround would create an avoidable compromise.",
  "dev.proactive_agency.preserves":
    "Routing a change through the person responsible can protect coordination and avoid acting without context someone else has.",

  /* ================================================================
     PHASE 7 HUMAN-REVIEW STAGE — neutral, third-person trade-off content
     for "What Not to Copy" (Issue 4). Distinct from the dev-guide
     `caution` corpus above, which is written in second-person "you" voice
     for the personal-development-guide context and reads as an accusation
     when reused to describe a historical person's profile. Every sentence
     here describes a trait-level trade-off in general — never the
     specific person — per the "do not diagnose the historical person"
     instruction. Evidence-based coverage (26 of 34 attributes; see
     TRADEOFF_ATTRIBUTE_IDS in targetComparison.ts for which 8 are
     deliberately not yet covered, and why).
     ================================================================ */
  "dontcopy.tradeoff.achievement_drive":
    "Setting a high personal bar can drive strong results, but can also make it hard to feel satisfied with real progress.",
  "dontcopy.tradeoff.aesthetic_sensitivity":
    "A strong response to how things look, sound, or feel can shape better craft, but can also slow decisions that don't need it.",
  "dontcopy.tradeoff.ambiguity_tolerance":
    "Comfort with an unclear right answer can keep momentum going, but can also mean acting before enough is actually known.",
  "dontcopy.tradeoff.analytical_rigor":
    "Close scrutiny of evidence can catch real flaws early, but can also slow momentum on calls that didn't need that much certainty.",
  "dontcopy.tradeoff.autonomy_need":
    "A strong need to set one's own approach can produce more ownership, but can also make coordination with others harder.",
  "dontcopy.tradeoff.creative_originality":
    "A pull toward unfamiliar ideas can open new directions, but can also come at the cost of refining what already works.",
  "dontcopy.tradeoff.cross_domain_range":
    "Breadth across fields can create unusual connections, but can also reduce the time available for sustained depth in any one of them.",
  "dontcopy.tradeoff.curiosity":
    "Following a wide range of interests can uncover unexpected openings, but can also pull attention from priorities that need finishing.",
  "dontcopy.tradeoff.decisiveness":
    "Committing quickly on incomplete information can keep things moving, but can also mean less room to catch a wrong call early.",
  "dontcopy.tradeoff.deep_focus":
    "Long, uninterrupted concentration can produce depth, but can also mean missing things happening outside that focus.",
  "dontcopy.tradeoff.detail_orientation":
    "Close attention to small inconsistencies can catch real problems, but can also slow down work that didn't need that level of scrutiny.",
  "dontcopy.tradeoff.discipline":
    "Steady, consistent effort can compound over time, but can also make it harder to change course when circumstances genuinely call for it.",
  "dontcopy.tradeoff.execution_speed":
    "Shipping quickly can create momentum and real feedback, but can also mean less polish than the situation actually needed.",
  "dontcopy.tradeoff.experimentation":
    "Trying unproven approaches can reveal better paths, but can also create churn before any one approach has time to work.",
  "dontcopy.tradeoff.impact_motivation":
    "A strong pull toward visible reach can drive ambitious work, but can also undervalue quieter work that still genuinely matters.",
  "dontcopy.tradeoff.independent_thinking":
    "Holding a well-considered position under pressure can protect good judgment, but can also mean missing a genuinely valid point from someone else.",
  "dontcopy.tradeoff.intuitive_synthesis":
    "Fast pattern recognition can reach a workable answer sooner, but can also skip the verification a situation actually needed.",
  "dontcopy.tradeoff.leadership_drive":
    "A strong pull to set direction can help a group that lacks one, but can also crowd out others who had something worth contributing.",
  "dontcopy.tradeoff.mastery_orientation":
    "Continued refinement of a skill can raise the ceiling on what's possible, but can also mean spending time past the point of real return.",
  "dontcopy.tradeoff.opportunity_sensing":
    "Noticing early signals can create a real head start, but can also mean reacting to noise that never becomes a real pattern.",
  "dontcopy.tradeoff.persistence":
    "Staying with something past the point others would switch can pay off, but can also mean sunk time on something that genuinely wasn't going to work.",
  "dontcopy.tradeoff.persuasiveness":
    "A strong pull to bring others around can align a group faster, but can also crowd out disagreement worth actually hearing.",
  "dontcopy.tradeoff.planning_orientation":
    "Working out a plan before starting can prevent avoidable mistakes, but can also cost time in situations that reward moving first.",
  "dontcopy.tradeoff.resourcefulness":
    "Making do with what's on hand can keep things moving under real constraints, but can also normalise a workaround that was only ever meant to be temporary.",
  "dontcopy.tradeoff.social_assertiveness":
    "Speaking up early in a group can shape the conversation, but can also crowd out quieter input that would have been worth hearing.",
  "dontcopy.tradeoff.systems_abstraction":
    "Focusing on the underlying structure can clarify a problem, but can also miss what's actually different about this specific case.",

  /* ================================================================
     PHASE 7 — "WHAT NOT TO COPY" generic reason copy
     Used by selectDoNotCopy's deterministic (non-editorial) items —
     interpolated with {trait}, {person}, and {score} where relevant.
     ================================================================ */
  "dontcopy.generic.risk": "{trait} is flagged as a risk specifically for {person} — read their story before treating it as something to adopt.",
  "dontcopy.generic.dual_edged": "{trait} is a double-edged trait for {person} — it cuts both ways depending on context, so copying it wholesale isn't a safe bet.",
  "dontcopy.generic.extreme": "{trait} sits at an extreme for {person} ({score} / 100) — extremes like this often carry real costs that a single number doesn't show.",
  "dontcopy.generic.shape_mismatch": "{trait} is unusually high for {person}, even though lower tends to help most people on this dimension — this may be specific to their situation, not a model to copy.",

  /* -------------------------------------------------------------------
     "What not to copy" — curated, per-person editorial cautions.
     "Biographical accounts describe..." framing throughout, per CLAUDE.md
     "Safety": never a diagnosis, always separable from the trait itself.
     ------------------------------------------------------------------- */
  "dontcopy.davinci.unfinished_work":
    "Biographical accounts describe Leonardo leaving many works and projects unfinished, often moving on once the interesting problem was solved. The same restlessness that fed his range is also what left so much of his output incomplete.",
  "dontcopy.jobs.demandingness":
    "Biographical accounts describe Jobs as an extremely demanding manager, at times harshly so, and colleagues often cite the personal cost of working for him. High standards and a harsh way of delivering them are two different things worth separating.",
  "dontcopy.miyazaki.exacting_standards":
    "Biographical accounts describe Miyazaki's standards as exacting enough to strain his studio and his own health during production. The same intensity that produced his films came with a real cost to the people working alongside him.",
  "dontcopy.beethoven.volatility":
    "Biographical accounts describe Beethoven's temperament as volatile, including frequent, sharp conflict with people around him. Intensity of conviction and volatility toward others are not the same thing, even when they show up together.",
  "dontcopy.gandhi.self_denial":
    "Biographical accounts describe Gandhi practising extreme self-denial, including fasting, that at points affected his health and strained relationships close to him. Discipline in service of a conviction is not the same as the specific practices used to express it.",
  "dontcopy.tesla.commercialisation":
    "Biographical accounts describe Tesla's difficulty translating his inventions into sustainable businesses, repeatedly losing control of his own work commercially. Inventive range and business execution are separate skills, and this profile shows what a real gap between them can cost.",
  "dontcopy.genghiskhan.ruthlessness":
    "Biographical accounts describe campaigns under Genghis Khan involving mass violence against civilian populations. Strategic and organisational skill is separable from the ends it was put toward, and this profile is not an endorsement of the latter.",
} as const;

export type MessageKey = keyof typeof en;
