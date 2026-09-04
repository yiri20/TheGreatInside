/**
 * ROSTER 12 — new-intake batch (1 person).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed) via
 * `src/dev/roster1000/generateRoster12.ts`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline the earlier rosters use.
 *
 * The roster-12 new-intake cycle (2026-09) researched/scored 15 new
 * candidates (frozen from a 27-person discovery pool, none previously
 * present as scored candidate JSON and none already live); only Marcus
 * Aurelius and Che Guevara crossed `eligibility_v2` honestly on first
 * score. Che Guevara is deliberately NOT part of this batch — no
 * rights-clear, non-AI-generated portrait could be sourced within this
 * cycle, a documented production blocker; he remains `qa_passed` and
 * unpromoted for a future cycle. The other 13 frozen candidates remain
 * `held` (real evidence packs, genuine first scores, short only on
 * eligibility_v2's weighted coverage floor) and are not part of this batch.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_marcus_aurelius",
    slug: "marcus-aurelius",
    canonicalName: "Marcus Aurelius",
    birthYear: 121,
    deathYear: 180,
    isLiving: false,
    era: "ancient",
    nationalityCodes: [],
    regionCode: "southern_europe",
    occupationIds: ["political_leader", "philosopher"],
    fieldIds: ["politics", "philosophy", "military"],
    impactDomains: ["cultural", "historical"],
    tagIds: ["philosopher", "leader"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q1430" },
    // Roster-12 new-intake batch (2026-09): an Antonine-period marble bust
    // (c. 161-169 CE), close to his own lifetime, discovered near Rome in
    // 1674, Louvre collection MR 561 (on loan to the Met, L.2008.49). CC BY
    // 2.5, no rights ambiguity. Resized/recompressed derivative (2773x4160
    // -> 1246x1869, mozjpeg-equivalent quality-85 re-encode, no crop/
    // upscale/AI processing) of the original Commons photograph.
    portrait: {
      url: "/portraits/marcus-aurelius-louvre-bust.jpg",
      width: 1246,
      height: 1869,
      source: "Wikimedia Commons (resized/recompressed derivative; see licenseUrl for the original)",
      license: "CC BY 2.5",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Marcus_Aurelius_Louvre_MR561_n02.jpg",
      attribution: "Marie-Lan Nguyen, 2011 — Musée du Louvre, MR 561 (Ma 1166), CC BY 2.5",
      kind: "likeness",
    },
    sources: [{ id: "src_ma_meditations", kind: "archive", title: "Marcus Aurelius, Meditations (Ta eis heauton) — a private philosophical journal, not written for publication, composed largely during his Danube frontier campaigns" }, { id: "src_ma_cassius_dio", kind: "archive", title: "Cassius Dio, Roman History, Book 71/72 — near-contemporary Roman senator's account of Marcus Aurelius's reign" }, { id: "src_ma_historia_augusta", kind: "archive", title: "Historia Augusta, \"Life of Marcus Aurelius\" — later (c. 4th century) imperial biography of variable reliability; used here only for specific episodes corroborated or plausible alongside Cassius Dio" }, { id: "src_ma_wikipedia", kind: "wikipedia", title: "Marcus Aurelius", url: "https://en.wikipedia.org/wiki/Marcus_Aurelius" }],
    rows: {
      // Across all twelve books of Meditations he sustains a running, self-directed examination of his own reactions, judgments, and philosophical positions rather than restating fixed doctrine — a well-supported pattern of active self-questioning across the whole surviving text, not one isolated remark.
      curiosity: [65, 0.62, "s", "A"],
      // Meditations is itself the direct evidence: a sustained private philosophical practice maintained through years of active campaigning on the Danube frontier during the Marcomannic Wars, not composed in leisure. The practice's survival across that period is documented by the text's own internal references to camp locations.
      discipline: [78, 0.68, "d", "A"],
      // Ruled 19 years through the Antonine Plague, sustained multi-year wars on the German/Danube frontier, and Avidius Cassius's revolt, continuing to govern and campaign personally through each — a documented pattern of enduring compounding crises rather than a single instance.
      persistence: [74, 0.6, "s", "A"],
      // When his own general Avidius Cassius declared himself emperor, Marcus Aurelius personally marched east to confront the revolt (Cassius Dio) while reportedly stating he wished to spare Cassius's life and offer clemency rather than pursue vengeance (Historia Augusta, corroborated in substance by Cassius Dio) — engaged the threat directly but visibly avoided escalation to reprisal once it collapsed.
      conflict_tolerance: [70, 0.6, "d", "D"],
      // Did not seek the throne (became emperor via Antoninus Pius's adoption) and then made the unprecedented choice to rule as co-emperor with Lucius Verus rather than alone — a specific, documented institutional decision suggesting rule was accepted as duty rather than pursued for personal dominance.
      leadership_drive: [55, 0.55, "s", "N"],
      // Multiple ancient sources describe a sustained practice of convening and consulting his imperial consilium before major decisions rather than acting unilaterally — a documented governing pattern, not a single anecdote.
      autonomy_need: [40, 0.55, "s", "N"],
      // The co-emperorship with Lucius Verus (a specific, unprecedented institutional arrangement) and the well-attested consilium practice are both directly documented collaborative structures he created or sustained.
      collaboration: [68, 0.65, "d", "A"],
      // Meditations repeatedly returns to duty toward the common good over personal gratification (e.g. its recurring bee/hive framing of the individual's relation to the whole) as a sustained theme across many separate passages, not one quotable line.
      impact_motivation: [72, 0.62, "s", "A"],
      // Meditations explicitly and repeatedly disparages the pursuit of personal fame and posthumous reputation as vanity — a documented, recurring self-corrective theme that argues against strong personal-glory-seeking rather than for it.
      achievement_drive: [42, 0.5, "s", "N"],
      // Sustained a years-long, multi-front military campaign requiring real logistics and strategy, but the surviving record documents outcomes and duration more than his specific planning process — inferred from the campaign's sustained coherence rather than a cited planning episode, hence capped at inference.
      planning_orientation: [62, 0.35, "i", "A"],
      // Book 1 of Meditations is a structured, specific catalog crediting named teachers (Junius Rusticus, Sextus, others) for particular lessons learned — an unusually detailed, self-authored record of sustained deliberate intellectual formation, not a general reputation for wisdom.
      mastery_orientation: [76, 0.7, "d", "A"],
      // Governed through the Antonine Plague and simultaneous multi-front wars, but the surviving record documents institutional/military responses more than personally attributable adaptive behavior — inference-level rather than a specific cited instance.
      adaptability: [58, 0.35, "i", "N"],
      // Chose to personally command from the dangerous Danube frontier for years rather than direct the wars from Rome, an unusual choice among emperors of the era and one that likely contributed to his death near the front — a sustained pattern across the whole Marcomannic War period, not a single episode.
      risk_tolerance: [68, 0.58, "s", "R"],
      // The clemency-over-vengeance response to the Cassius revolt and the consistent application of Stoic restraint against the era's normal imperial reprisal practice both show a self-directed ethical standard distinct from surrounding political convention, evidenced across more than one documented episode.
      independent_thinking: [62, 0.5, "s", "A"],
      // The philosophical journal was self-initiated with no audience or reward (never intended for publication), and the choice to personally campaign at the front rather than delegate was his own — both self-directed rather than externally compelled.
      proactive_agency: [65, 0.55, "s", "A"],
      // Marched east immediately on learning of the Cassius revolt rather than waiting on events — one specific, dated crisis-response decision, moderate confidence given Historia Augusta's variable reliability as a source for this episode's particulars.
      decisiveness: [60, 0.5, "d", "N"],
      // Meditations repeatedly and explicitly grapples with uncertainty, mortality, and the limits of human control as a recurring theme across many passages rather than a single reflection.
      ambiguity_tolerance: [66, 0.52, "s", "A"],
      // Sustained substantive, non-dabbling engagement across philosophy, law/governance, and military command simultaneously for nearly two decades, each with real documented output or decisions, not superficial involvement.
      cross_domain_range: [64, 0.52, "s", "A"],
      // The structured, sustained philosophical practice documented across all twelve books, maintained over years including under active campaign conditions, shows sustained deliberate engagement rather than sporadic reflection.
      deep_focus: [70, 0.55, "s", "A"],
      // A private, self-directed philosophical journal is an unusual genre for a reigning Roman emperor and shows personal synthesis of Stoic tradition rather than restatement, but this is inferred from the text's unusual form rather than a directly documented claim of originality, hence inference-level.
      creative_originality: [58, 0.45, "i", "A"],
    },
  },
];

export const ROSTER_12: readonly Person[] = seeds.map(build);
