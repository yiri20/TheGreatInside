/**
 * ROSTER 17 — 2026-09 intake (1 person).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed) via
 * `src/dev/roster1000/generateRoster17.ts`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline every earlier roster batch uses.
 *
 * This was a deliberately scaled-down cycle: 13 genuinely new candidates
 * discovered and QID-verified, 8 classified STRONG_BREADTH_AND_DEPTH and
 * frozen, scored using a single-source-per-person research pass. Only John
 * von Neumann crossed `eligibility_v2` honestly on first score (23 scored
 * attributes, coverage 0.695). The other 7 frozen candidates remain
 * `held` purely on scored-attribute-count/coverage -- a real, honest
 * outcome from a shallower research pass than this project's usual
 * standard, not from weak underlying evidence. Full record:
 * `docs/checkpoints/roster17-intake-and-safety.md`.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_john_von_neumann",
    slug: "john-von-neumann",
    canonicalName: "John von Neumann",
    aliases: ["János Lajos Neumann", "Johann von Neumann"],
    birthYear: 1903,
    deathYear: 1957,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["HU", "US"],
    regionCode: "central_europe",
    occupationIds: ["mathematician", "physicist", "computer_scientist"],
    fieldIds: ["mathematics", "physics", "computing"],
    impactDomains: ["scientific", "innovation", "engineering"],
    tagIds: ["polymath", "prodigy", "prolific", "cross_disciplinary"],
    archetypeIds: ["cross_disciplinary_generalist", "technical_innovator"],
    externalIdentity: { wikidataId: "Q17455" },
    portrait: {
      url: "/portraits/john-von-neumann-los-alamos-1943.jpg",
      source: "Wikimedia Commons / Los Alamos National Laboratory",
      license: "Public domain",
      width: 982,
      height: 1274,
      licenseUrl: "https://commons.wikimedia.org/wiki/File:JohnvonNeumann-LosAlamos.jpg",
      attribution: "Los Alamos National Laboratory, from \"Los Alamos: Beginning of an era, 1943-1945\" (1986) -- LANL released this image for use by anyone, provided the copyright holder is properly attributed",
      
    },
    sources: [{ id: "src_jvn_wikipedia", kind: "wikipedia", title: "John von Neumann", url: "https://en.wikipedia.org/wiki/John_von_Neumann" }, { id: "src_jvn_wikidata", kind: "wikidata", title: "John von Neumann (Q17455)", url: "https://www.wikidata.org/wiki/Q17455" }, { id: "src_jvn_macrae", kind: "biography", title: "Norman Macrae, John von Neumann: The Scientific Genius (1992)" }, { id: "src_jvn_ulam", kind: "biography", title: "Stanisław Ulam, Adventures of a Mathematician (1976) -- independent firsthand account from his closest US friend and collaborator" }],
    rows: {
      // Documented encyclopedic interest well outside his professional fields -- passionate, sustained study of Ancient Greek historians in the original language and a 46-volume world history series -- corroborated independently by Ulam's memoir, not just his own reputation.
      curiosity: [90, 0.7, "s", "A"],
      // Doctoral thesis on axiomatic set theory (1925) and foundational axiomatization of quantum mechanics -- rigor attested by the surviving published work itself, independent of anecdote.
      analytical_rigor: [95, 0.82, "d", "A"],
      // Ulam's own account that von Neumann's problem-solving 'might not be visual, but more aural' and the repeated pattern of going to sleep with a problem unsolved and waking with the answer -- a specific, named-source anecdote about his synthesis style, not a generic reputation claim.
      intuitive_synthesis: [82, 0.55, "s", "A"],
      // Founding contributions to game theory (with Morgenstern), the von Neumann computer architecture, and cellular automata / universal constructor theory -- each a documented, named, surviving body of formal abstraction work.
      systems_abstraction: [92, 0.75, "d", "A"],
      // Founded or co-founded entire new fields (game theory, digital computer architecture) with no established precedent to follow -- inferred independence from the documented novelty of the work itself.
      independent_thinking: [78, 0.55, "s", "A"],
      // Documented as the originator of the stored-program computer architecture still bearing his name and of modern game theory as a mathematical discipline -- both independently attested, named contributions.
      creative_originality: [85, 0.68, "d", "A"],
      // Documented substantive published contributions across pure mathematics, quantum mechanics, economics/game theory, computer science, and nuclear-weapons engineering (Manhattan Project implosion lens design) -- an unusually wide, independently verifiable span.
      cross_domain_range: [96, 0.8, "d", "A"],
      // Documented publication pace of 'nearly one major mathematics paper per month' sustained from his late teens, corroborated by the surviving bibliography, not self-report.
      discipline: [80, 0.6, "s", "A"],
      // Documented as doing 'some of his best work in noisy, chaotic environments' and receiving neighbor complaints for playing loud music while working -- a specific, corroborated pattern that cuts against conventional solitary deep-focus, scored dual-edged rather than assumed high.
      deep_focus: [58, 0.5, "d", "D"],
      // Repeated, independently witnessed incidents of extremely fast mental calculation (Szegő's own account of being moved to tears meeting the teenage von Neumann) and rapid formal output -- corroborated by more than one named contemporary.
      execution_speed: [90, 0.65, "s", "A"],
      // Inferred from a documented career of sustained, decades-long formal output across changing institutional contexts (Berlin, Princeton, wartime and postwar government work) rather than a single named persistence incident.
      persistence: [72, 0.5, "i", "A"],
      // Documented sequence of moving between substantively different fields at the frontier of each (pure mathematics to physics to economics to computing to weapons/defense policy) across a single career, each transition independently attested by the historical record of his published work.
      adaptability: [85, 0.62, "s", "A"],
      // Documented advocacy for hawkish Cold War nuclear policy positions and central role in the ICBM program -- a real, sourced, controversial stance scored dual-edged rather than flattened to a simple advantage.
      risk_tolerance: [68, 0.5, "s", "D"],
      // Inferred from documented, repeated work at the genuine frontier of entirely new fields with no existing formal framework to lean on (game theory, computer architecture) at the time he began each.
      ambiguity_tolerance: [80, 0.58, "s", "A"],
      // Documented committee style of 'deferring rather easily on personal or organizational matters but pressing on technical ones' -- a specific, sourced but narrow behavioral pattern, kept at inference level since it describes one context (committee work), not decisiveness generally.
      decisiveness: [62, 0.45, "i", "N"],
      // Documented as sociable and able to 'attend parties until the early hours' while still working -- corroborated pattern, but this is closer to gregariousness than assertive self-promotion, so scored moderate rather than high.
      social_assertiveness: [62, 0.48, "s", "N"],
      // Documented as 'always being happy to provide others of all ability levels with scientific and mathematical advice' and sustained close working partnerships (Ulam, Wigner, Morgenstern, the Manhattan Project team) -- corroborated by more than one named collaborator.
      collaboration: [78, 0.55, "s", "A"],
      // Held real committee and advisory authority (Atomic Energy Commission, ICBM program) but the documented style is advisory/technical influence rather than a documented drive to hold top formal command -- kept at inference level and a moderate score.
      leadership_drive: [55, 0.42, "i", "N"],
      // Inferred from the documented pattern of reaching foundational, discipline-defining depth in each field he entered (set theory, quantum axiomatics, game theory, computer architecture) rather than surface engagement.
      mastery_orientation: [90, 0.68, "s", "A"],
      // Documented sustained high-volume, high-impact output across a compressed career (dead at 53) -- inferred drive from the sheer independently-verifiable rate and range of completed, published work.
      achievement_drive: [85, 0.6, "s", "A"],
      // Documented deliberate move from pure theory into high-stakes applied defense and computing work during and after WWII, inferred as motivated by wanting real-world impact rather than continuing purely theoretical work.
      impact_motivation: [75, 0.5, "i", "A"],
      // Documented early move into digital computer design at its true infancy, inferred as recognizing the field's importance well before it was an established discipline.
      opportunity_sensing: [78, 0.5, "i", "A"],
      // Documented initiative in pressing for the ICBM program alongside Schriever and Gardner rather than merely responding to assigned tasks -- inferred proactive agency from this specific, named episode.
      proactive_agency: [75, 0.48, "i", "A"],
    },
  },
];

export const ROSTER_17: readonly Person[] = seeds.map(build);
