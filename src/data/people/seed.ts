/**
 * SEED DATASET — roster 1 (the original 10 reviewed profiles).
 *
 * Purpose: exercise the engine, not to be the product's content. Combined with
 * roster 2 (src/data/people/roster2.ts, +24 — see that file's header for the
 * 2026-08 inclusion_v1 removal) below into the exported SEED_PEOPLE.
 * Deliberately spread across era, region, field and — most
 * importantly — trait SHAPE, so match distributions can be inspected.
 *
 * SCORING DISCIPLINE
 * - Scores are inferred from documented biographical accounts. They are not
 *   psychological assessments, and `confidence` + `evidenceType` say so per trait.
 * - `impact` is always PERSON x ATTRIBUTE x CONTEXT. Perfectionism is marked
 *   dual-edged for Miyazaki and da Vinci but is not globally "amber".
 * - Living people: only tendencies that published accounts describe directly.
 *   No inference about health, relationships, orientation, or clinical labels.
 * - Metadata (nationality, region, era, occupation) is present for filtering and
 *   for the Unexpected Match selector. It NEVER enters similarity.
 */

import type { Person } from "../../core/types.js";
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import { ROSTER_2 } from "./roster2.js";
import { ROSTER_3 } from "./roster3.js";
import { ROSTER_4 } from "./roster4.js";
import { ROSTER_5 } from "./roster5.js";
import { ROSTER_6 } from "./roster6.js";
import { ROSTER_7 } from "./roster7.js";
import { ROSTER_8 } from "./roster8.js";
import { ROSTER_9 } from "./roster9.js";
import { ROSTER_10 } from "./roster10.js";
import { PERSON_EDITORIAL } from "./editorial.js";

const seeds: PersonSeed[] = [
  {
    id: "p_leonardo_da_vinci",
    slug: "leonardo-da-vinci",
    canonicalName: "Leonardo da Vinci",
    aliases: ["Leonardo di ser Piero da Vinci"],
    birthYear: 1452,
    deathYear: 1519,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["IT"],
    regionCode: "southern_europe",
    // No historicalPolityKey: he worked across the Republic of Florence, the
    // Duchy of Milan and finally the Kingdom of France, with no single
    // "primary" polity that isn't a contested oversimplification — left unset
    // rather than forced, same discipline as an unscored trait attribute.
    occupationIds: ["painter", "engineer", "anatomist"],
    fieldIds: ["art", "engineering", "natural_science"],
    impactDomains: ["artistic", "engineering", "scientific", "innovation"],
    tagIds: ["polymath", "self_taught", "renaissance"],
    archetypeIds: ["cross_disciplinary_generalist", "creative_creator"],
    // Verified 2026-08 via a direct Wikidata fetch (see CLAUDE.md "External
    // identity & media metadata"), not guessed from training data.
    externalIdentity: {
      wikidataId: "Q762",
      wikipediaUrls: {
        "en-US": "https://en.wikipedia.org/wiki/Leonardo_da_Vinci",
        "ko-KR": "https://ko.wikipedia.org/wiki/레오나르도_다_빈치",
      },
    },
    // Verified 2026-08 via a direct fetch of the Commons file page, license
    // and attribution reproduced as given, not paraphrased or translated.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo_self.jpg",
      width: 420,
      height: 659,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Leonardo_self.jpg",
      attribution: "Leonardo da Vinci — Biblioteca Reale di Torino",
    },
    sources: [wiki("davinci", "Leonardo da Vinci"), bio("davinci", "Walter Isaacson, Leonardo da Vinci (2017)")],
    doNotCopyKeys: ["dontcopy.davinci.unfinished_work"],
    rows: {
      curiosity: [97, 0.92, "d", "A"],
      analytical_rigor: [82, 0.7, "s", "N"],
      intuitive_synthesis: [88, 0.7, "s", "N"],
      systems_abstraction: [86, 0.72, "s", "A"],
      independent_thinking: [91, 0.82, "s", "A"],
      creative_originality: [96, 0.89, "d", "A"],
      experimentation: [92, 0.85, "d", "A"],
      cross_domain_range: [98, 0.94, "d", "A"],
      aesthetic_sensitivity: [95, 0.9, "d", "A"],
      discipline: [58, 0.55, "i", "D"],
      deep_focus: [78, 0.65, "s", "N"],
      detail_orientation: [90, 0.85, "d", "A"],
      perfectionism: [88, 0.78, "s", "D"],
      execution_speed: [32, 0.8, "d", "D"],
      planning_orientation: [45, 0.5, "i", "N"],
      persistence: [62, 0.55, "i", "D"],
      adaptability: [78, 0.6, "s", "N"],
      risk_tolerance: [55, 0.5, "i", "N"],
      ambiguity_tolerance: [88, 0.7, "s", "A"],
      decisiveness: [40, 0.6, "s", "D"],
      social_assertiveness: [55, 0.5, "i", "N"],
      collaboration: [58, 0.5, "i", "N"],
      leadership_drive: [45, 0.5, "i", "N"],
      persuasiveness: [62, 0.5, "i", "N"],
      conflict_tolerance: [45, 0.45, "i", "N"],
      mastery_orientation: [92, 0.85, "d", "A"],
      achievement_drive: [65, 0.5, "i", "N"],
      competitiveness: [55, 0.45, "i", "N"],
      autonomy_need: [85, 0.7, "s", "A"],
      impact_motivation: [70, 0.5, "i", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6). Three DISTINCT episodes used,
      // tracked for the episode-reuse audit — none shared across traits:
      //   - opportunity_sensing (78, 0.6, s): his 1482 letter to Ludovico
      //     Sforza (survives) leads with engineering/military capabilities,
      //     not painting — a documented, correct read of what that specific
      //     patron/political moment needed, distinct from cross_domain_range
      //     (already scored 98) which is about his own work spanning
      //     domains, not reading an external situation.
      //   - proactive_agency (75, 0.62, s): self-directed human dissection
      //     for anatomical study, unprompted by any patron or institution
      //     and at real personal/legal risk — a different episode from the
      //     Sforza letter.
      //   - belief_updating (65, 0.5, i): repeated re-dissection and
      //     revision of his own earlier anatomical studies (e.g. heart
      //     function) as observation accumulated (Isaacson) — inference
      //     from a pattern of practice, not an explicit textual statement,
      //     hence lower confidence.
      // resourcefulness left unscored: the evidence is genuinely mixed, not
      // merely thin — many projects were abandoned or left unfinished when
      // circumstances weren't ideal (already reflected in his low
      // execution_speed and the unfinished-work doNotCopy caution), which
      // cuts against, not for, a confident resourcefulness score either way.
      opportunity_sensing: [78, 0.6, "s", "A"],
      proactive_agency: [75, 0.62, "s", "N"],
      belief_updating: [65, 0.5, "i", "A"],
    },
  },
  {
    id: "p_marie_curie",
    slug: "marie-curie",
    canonicalName: "Marie Curie",
    aliases: ["Maria Skłodowska-Curie", "마리 퀴리"],
    birthYear: 1867,
    deathYear: 1934,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["PL", "FR"],
    regionCode: "western_europe",
    // Born 1867 in Warsaw, then under Russian imperial partition — modern
    // "PL" (Poland) did not exist as a state until 1918. See CLAUDE.md
    // "External identity & media metadata".
    historicalPolityKey: "polity.congress_poland",
    occupationIds: ["physicist", "chemist"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific", "medical", "educational"],
    tagIds: ["nobel_laureate", "specialist", "late_recognition"],
    archetypeIds: ["scientific_explorer", "scholarly_specialist"],
    externalIdentity: {
      wikidataId: "Q7186",
      wikipediaUrls: {
        "en-US": "https://en.wikipedia.org/wiki/Marie_Curie",
        "ko-KR": "https://ko.wikipedia.org/wiki/마리_퀴리",
      },
    },
    // ROSTER-1000 portrait pilot (2026-08): verified live against the
    // actual Commons file page (license reason, author, dimensions) before
    // being added — same discipline as da Vinci's portrait above.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/db/Marie_Curie%2C_portrait%2C_1900.jpg",
      width: 609,
      height: 894,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Marie_Curie,_portrait,_1900.jpg",
      attribution: "Collection Guy et Marie José Pallardy",
    },
    sources: [wiki("curie", "Marie Curie"), bio("curie", "Susan Quinn, Marie Curie: A Life (1995)")],
    rows: {
      curiosity: [92, 0.85, "d", "A"],
      analytical_rigor: [94, 0.9, "d", "A"],
      intuitive_synthesis: [60, 0.5, "i", "N"],
      systems_abstraction: [82, 0.7, "s", "A"],
      independent_thinking: [88, 0.82, "d", "A"],
      creative_originality: [78, 0.65, "s", "N"],
      experimentation: [90, 0.9, "d", "A"],
      cross_domain_range: [55, 0.6, "s", "N"],
      aesthetic_sensitivity: [40, 0.4, "i", "N"],
      discipline: [96, 0.92, "d", "A"],
      deep_focus: [95, 0.9, "d", "A"],
      detail_orientation: [92, 0.88, "d", "A"],
      perfectionism: [84, 0.7, "s", "D"],
      execution_speed: [60, 0.55, "i", "N"],
      planning_orientation: [78, 0.65, "s", "A"],
      persistence: [97, 0.94, "d", "A"],
      adaptability: [62, 0.5, "i", "N"],
      risk_tolerance: [70, 0.7, "s", "D"],
      ambiguity_tolerance: [78, 0.65, "s", "A"],
      decisiveness: [72, 0.5, "i", "N"],
      social_assertiveness: [42, 0.65, "s", "N"],
      collaboration: [68, 0.7, "s", "N"],
      leadership_drive: [55, 0.5, "i", "N"],
      persuasiveness: [50, 0.45, "i", "N"],
      conflict_tolerance: [62, 0.6, "s", "N"],
      mastery_orientation: [95, 0.9, "d", "A"],
      achievement_drive: [82, 0.7, "s", "N"],
      competitiveness: [48, 0.45, "i", "N"],
      autonomy_need: [82, 0.7, "s", "A"],
      impact_motivation: [80, 0.7, "s", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6). Two distinct episodes:
      //   - resourcefulness (90, 0.8, d): processing tons of pitchblende
      //     ore in a leaky, minimally-heated/-ventilated shed with
      //     improvised equipment over several years to isolate radium and
      //     polonium — extensively documented, direct, not merely
      //     large-scale (she began with almost nothing, distinct from a
      //     well-funded operation).
      //   - proactive_agency (80, 0.68, s): pursued higher education via
      //     Warsaw's clandestine "Flying University" and then Paris, against
      //     restrictions on women's formal education — self-initiated, not
      //     assigned. A different episode from the shed lab.
      // opportunity_sensing left unscored: her path from Becquerel's
      // discovery to sustained radioactivity research is a documented
      // extension of an existing lead, not evidence of noticing a shift
      // others hadn't. belief_updating left unscored: no specific documented
      // instance of revising an articulated position under evidence, as
      // distinct from her already-scored analytical_rigor.
      resourcefulness: [90, 0.8, "d", "A"],
      proactive_agency: [80, 0.68, "s", "A"],
    },
  },
  {
    id: "p_richard_feynman",
    slug: "richard-feynman",
    canonicalName: "Richard Feynman",
    birthYear: 1918,
    deathYear: 1988,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["physicist", "teacher"],
    fieldIds: ["natural_science", "education"],
    impactDomains: ["scientific", "educational"],
    tagIds: ["nobel_laureate", "generalist", "communicator"],
    archetypeIds: ["scientific_explorer", "cross_disciplinary_generalist"],
    sources: [wiki("feynman", "Richard Feynman"), bio("feynman", "James Gleick, Genius (1992)")],
    // Verified 2026-08 via a direct fetch of the Commons file page: a
    // Manhattan-Project-era Los Alamos National Laboratory archive photo,
    // photographer unknown. Public domain in the US as a federal
    // government work (17 U.S.C. §105).
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Feynman_at_Los_Alamos.jpg",
      width: 265,
      height: 284,
      source: "Wikimedia Commons",
      license: "Public Domain (US federal government work, Los Alamos National Laboratory)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Feynman_at_Los_Alamos.jpg",
      attribution: "Los Alamos National Laboratory archive, photographer unknown",
    },
    rows: {
      curiosity: [97, 0.94, "d", "A"],
      analytical_rigor: [90, 0.88, "d", "A"],
      intuitive_synthesis: [92, 0.85, "d", "A"],
      systems_abstraction: [90, 0.85, "d", "A"],
      independent_thinking: [95, 0.92, "d", "A"],
      creative_originality: [88, 0.8, "s", "A"],
      experimentation: [88, 0.85, "d", "A"],
      cross_domain_range: [80, 0.75, "s", "A"],
      aesthetic_sensitivity: [62, 0.5, "i", "N"],
      discipline: [70, 0.6, "s", "N"],
      deep_focus: [90, 0.85, "d", "A"],
      detail_orientation: [68, 0.5, "i", "N"],
      perfectionism: [55, 0.5, "i", "N"],
      execution_speed: [72, 0.55, "i", "N"],
      planning_orientation: [40, 0.55, "s", "N"],
      persistence: [85, 0.75, "s", "A"],
      adaptability: [82, 0.7, "s", "A"],
      risk_tolerance: [68, 0.5, "i", "N"],
      ambiguity_tolerance: [90, 0.8, "s", "A"],
      decisiveness: [75, 0.5, "i", "N"],
      social_assertiveness: [82, 0.85, "d", "N"],
      collaboration: [72, 0.65, "s", "N"],
      leadership_drive: [48, 0.55, "s", "N"],
      persuasiveness: [85, 0.85, "d", "A"],
      conflict_tolerance: [70, 0.6, "s", "N"],
      mastery_orientation: [92, 0.88, "d", "A"],
      achievement_drive: [70, 0.5, "i", "N"],
      competitiveness: [62, 0.5, "i", "N"],
      autonomy_need: [88, 0.85, "d", "A"],
      impact_motivation: [72, 0.5, "i", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6): proactive_agency (82, 0.7,
      // documented) — appointed to the Rogers Commission (assigned), but his
      // specific decision to conduct an unauthorized, unplanned live O-ring
      // ice-water demonstration during a public hearing, going around the
      // official process he judged too slow, is a clean instance of
      // initiative beyond what the assigned role required (his own account
      // plus commission records). opportunity_sensing and resourcefulness
      // left unscored: his Challenger diagnosis and general first-principles
      // problem-solving are better characterized as his already-scored
      // analytical_rigor/independent_thinking/intuitive_synthesis in
      // action, not distinct evidence of environmental scanning or making
      // do under genuine resource constraint. belief_updating left
      // unscored: no specific documented reversal of an articulated
      // position under evidence.
      proactive_agency: [82, 0.7, "d", "A"],
    },
  },
  {
    id: "p_ada_lovelace",
    slug: "ada-lovelace",
    canonicalName: "Ada Lovelace",
    birthYear: 1815,
    deathYear: 1852,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["mathematician", "writer"],
    fieldIds: ["mathematics", "computing"],
    impactDomains: ["scientific", "technological", "innovation"],
    tagIds: ["early_computing", "generalist", "self_taught"],
    archetypeIds: ["technical_innovator", "cross_disciplinary_generalist"],
    sources: [wiki("lovelace", "Ada Lovelace"), bio("lovelace", "Betty Alexandra Toole, Ada, the Enchantress of Numbers (1992)")],
    // Verified 2026-08 via a direct fetch of the Commons file page: Alfred
    // Edward Chalon's 1840 watercolor, held by the Science Museum, London
    // (accession 1995-0796). Public domain — faithful photographic
    // reproduction of a 2D public-domain work of art, published before 1931.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Ada_Lovelace_Chalon_portrait.jpg",
      width: 1118,
      height: 1118,
      source: "Wikimedia Commons",
      license: "Public Domain (published before 1931; artist died 1860)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Ada_Lovelace_Chalon_portrait.jpg",
      attribution: "Alfred Edward Chalon, 1840 — Science Museum, London",
    },
    rows: {
      curiosity: [92, 0.8, "s", "A"],
      analytical_rigor: [90, 0.85, "d", "A"],
      intuitive_synthesis: [82, 0.7, "s", "N"],
      systems_abstraction: [94, 0.88, "d", "A"],
      independent_thinking: [88, 0.78, "s", "A"],
      creative_originality: [90, 0.82, "s", "A"],
      experimentation: [72, 0.55, "i", "N"],
      cross_domain_range: [88, 0.82, "d", "A"],
      aesthetic_sensitivity: [70, 0.6, "s", "N"],
      discipline: [78, 0.65, "s", "N"],
      deep_focus: [85, 0.72, "s", "A"],
      detail_orientation: [82, 0.72, "s", "A"],
      perfectionism: [72, 0.55, "i", "N"],
      execution_speed: [55, 0.5, "i", "N"],
      planning_orientation: [68, 0.5, "i", "N"],
      persistence: [80, 0.68, "s", "A"],
      adaptability: [65, 0.5, "i", "N"],
      risk_tolerance: [60, 0.5, "i", "N"],
      ambiguity_tolerance: [82, 0.68, "s", "A"],
      decisiveness: [62, 0.45, "i", "N"],
      social_assertiveness: [62, 0.5, "i", "N"],
      collaboration: [70, 0.65, "s", "N"],
      leadership_drive: [45, 0.45, "i", "N"],
      persuasiveness: [68, 0.55, "i", "N"],
      conflict_tolerance: [55, 0.45, "i", "N"],
      mastery_orientation: [85, 0.72, "s", "A"],
      achievement_drive: [75, 0.55, "i", "N"],
      competitiveness: [50, 0.45, "i", "N"],
      autonomy_need: [80, 0.65, "s", "N"],
      impact_motivation: [78, 0.55, "i", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6): opportunity_sensing (80, 0.65,
      // strong_inference) — her own surviving Notes on the Analytical Engine
      // articulate a broader significance of the machine (general symbol
      // manipulation, e.g. music composition) that Babbage himself hadn't
      // emphasized — a documented instance of perceiving a pattern/
      // implication in an existing object that its own creator had not.
      // proactive_agency deliberately left unscored despite the same Notes
      // also going well beyond her assigned translation task: on reflection
      // that is a weaker, "expanded an already-assigned task's scope" case,
      // not the same standard as an unassigned, self-initiated act (the bar
      // applied elsewhere in this migration) — kept out rather than
      // double-counting one episode under a second construct.
      // resourcefulness/belief_updating: no supporting evidence.
      opportunity_sensing: [80, 0.65, "s", "A"],
    },
  },
  {
    id: "p_steve_jobs",
    slug: "steve-jobs",
    canonicalName: "Steve Jobs",
    birthYear: 1955,
    deathYear: 2011,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["entrepreneur", "executive", "product_designer"],
    fieldIds: ["technology", "business", "design"],
    impactDomains: ["entrepreneurial", "technological", "industrial", "cultural"],
    tagIds: ["founder", "perfectionist", "product_leader"],
    archetypeIds: ["entrepreneurial_builder", "organizational_leader"],
    sources: [wiki("jobs", "Steve Jobs"), bio("jobs", "Walter Isaacson, Steve Jobs (2011)")],
    doNotCopyKeys: ["dontcopy.jobs.demandingness"],
    rows: {
      curiosity: [82, 0.7, "s", "A"],
      analytical_rigor: [62, 0.55, "i", "N"],
      intuitive_synthesis: [92, 0.85, "d", "A"],
      systems_abstraction: [78, 0.65, "s", "A"],
      independent_thinking: [92, 0.9, "d", "A"],
      creative_originality: [88, 0.78, "s", "A"],
      experimentation: [72, 0.6, "s", "N"],
      cross_domain_range: [80, 0.8, "d", "A"],
      aesthetic_sensitivity: [96, 0.94, "d", "A"],
      discipline: [78, 0.6, "s", "N"],
      deep_focus: [82, 0.7, "s", "A"],
      detail_orientation: [92, 0.88, "d", "D"],
      perfectionism: [95, 0.92, "d", "D"],
      execution_speed: [82, 0.7, "s", "N"],
      planning_orientation: [62, 0.5, "i", "N"],
      persistence: [92, 0.88, "d", "A"],
      adaptability: [78, 0.65, "s", "N"],
      risk_tolerance: [88, 0.85, "d", "D"],
      ambiguity_tolerance: [72, 0.6, "s", "N"],
      decisiveness: [92, 0.88, "d", "D"],
      social_assertiveness: [90, 0.9, "d", "N"],
      collaboration: [48, 0.75, "s", "D"],
      leadership_drive: [95, 0.92, "d", "D"],
      persuasiveness: [95, 0.94, "d", "A"],
      conflict_tolerance: [92, 0.9, "d", "D"],
      mastery_orientation: [78, 0.6, "s", "N"],
      achievement_drive: [92, 0.85, "d", "N"],
      competitiveness: [88, 0.82, "d", "D"],
      autonomy_need: [85, 0.7, "s", "N"],
      impact_motivation: [92, 0.85, "d", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6). Three distinct episodes:
      //   - opportunity_sensing (90, 0.8, d): the 1979 Xerox PARC visit —
      //     immediately recognized the GUI/mouse's transformative potential
      //     when Xerox itself hadn't productized it. Extensively documented.
      //   - proactive_agency (85, 0.75, d): the 1996-97 return to Apple via
      //     the NeXT acquisition, then deliberately maneuvering (persuading
      //     the board, the Amelio ouster) into control rather than being
      //     reinstated to a role — marked dual-edged, matching his already-
      //     scored leadership_drive/competitiveness pattern.
      //   - belief_updating (68, 0.62, s): initially resisted third-party
      //     iPhone apps (closed web-app-only model), reversed within about a
      //     year to launch the App Store in response to developer/market
      //     evidence — a specific, documented reversal of an articulated
      //     public position, not merely a strategy pivot.
      // resourcefulness left unscored: the garage/NeXT/Pixar years are
      // better attributed to persistence (already scored) or to Wozniak's
      // engineering specifically; no clean episode of Jobs personally
      // improvising under resource constraint.
      opportunity_sensing: [90, 0.8, "d", "A"],
      proactive_agency: [85, 0.75, "d", "D"],
      belief_updating: [68, 0.62, "s", "N"],
    },
  },
  {
    id: "p_hayao_miyazaki",
    slug: "hayao-miyazaki",
    canonicalName: "Hayao Miyazaki",
    birthYear: 1941,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["JP"],
    regionCode: "east_asia",
    occupationIds: ["animator", "film_director"],
    fieldIds: ["film", "art"],
    impactDomains: ["artistic", "cultural"],
    tagIds: ["perfectionist", "independent", "craft_focused"],
    archetypeIds: ["creative_creator", "independent_creator"],
    // Verified 2026-08 via a direct fetch of the Commons file page. Lifetime
    // photograph, 2009.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/f/ff/HayaoMiyazakiCCJuly09.jpg",
      width: 342,
      height: 519,
      source: "Wikimedia Commons",
      license: "CC BY 2.0",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:HayaoMiyazakiCCJuly09.jpg",
      attribution: "Natasha Baucas",
    },
    sources: [
      wiki("miyazaki", "Hayao Miyazaki"),
      bio("miyazaki", "Hayao Miyazaki, Starting Point: 1979-1996 (1996)"),
    ],
    doNotCopyKeys: ["dontcopy.miyazaki.exacting_standards"],
    rows: {
      curiosity: [85, 0.7, "s", "A"],
      analytical_rigor: [62, 0.5, "i", "N"],
      intuitive_synthesis: [85, 0.7, "s", "N"],
      systems_abstraction: [65, 0.5, "i", "N"],
      independent_thinking: [92, 0.88, "d", "A"],
      creative_originality: [95, 0.92, "d", "A"],
      experimentation: [70, 0.55, "s", "N"],
      cross_domain_range: [62, 0.5, "i", "N"],
      aesthetic_sensitivity: [98, 0.95, "d", "A"],
      discipline: [92, 0.88, "d", "A"],
      deep_focus: [95, 0.9, "d", "A"],
      detail_orientation: [96, 0.94, "d", "D"],
      perfectionism: [96, 0.92, "d", "D"],
      execution_speed: [42, 0.75, "d", "D"],
      planning_orientation: [55, 0.5, "i", "N"],
      persistence: [94, 0.88, "d", "A"],
      adaptability: [58, 0.5, "i", "N"],
      risk_tolerance: [62, 0.5, "i", "N"],
      ambiguity_tolerance: [68, 0.5, "i", "N"],
      decisiveness: [78, 0.6, "s", "N"],
      social_assertiveness: [52, 0.5, "i", "N"],
      collaboration: [55, 0.6, "s", "N"],
      leadership_drive: [72, 0.65, "s", "D"],
      persuasiveness: [62, 0.5, "i", "N"],
      conflict_tolerance: [72, 0.65, "s", "D"],
      mastery_orientation: [96, 0.92, "d", "A"],
      achievement_drive: [72, 0.5, "i", "N"],
      competitiveness: [48, 0.45, "i", "N"],
      autonomy_need: [90, 0.85, "d", "A"],
      impact_motivation: [82, 0.7, "s", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6): proactive_agency (78, 0.65,
      // strong_inference) — co-founded Studio Ghibli (1985) specifically to
      // secure creative/production control, unprompted by any employer.
      // opportunity_sensing left unscored: his career is characterized by
      // consistent adherence to his own vision (already reflected in
      // independent_thinking/autonomy_need) rather than documented reading
      // of external shifts. resourcefulness: considered (early TV-animation
      // budget constraints) and left unscored — that's a generic industry
      // condition, not documented evidence of a personal resourceful-
      // improvisation pattern specific to him. belief_updating: his repeated
      // announced-then-reversed retirements are a personal/plan change, not
      // evidence of revising a substantive belief under evidence — left
      // unscored rather than stretched.
      proactive_agency: [78, 0.65, "s", "A"],
    },
  },
  {
    id: "p_yi_sun_sin",
    slug: "yi-sun-sin",
    canonicalName: "Yi Sun-sin",
    // Native script + hanja, resolving alias search regardless of the
    // current UI locale (product spec item 46).
    aliases: ["이순신", "李舜臣"],
    birthYear: 1545,
    deathYear: 1598,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["KR"],
    regionCode: "east_asia",
    historicalPolityKey: "polity.joseon_dynasty",
    occupationIds: ["naval_commander", "strategist"],
    fieldIds: ["military", "engineering"],
    impactDomains: ["historical", "engineering", "social"],
    tagIds: ["strategist", "leader", "innovator"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: {
      wikidataId: "Q50184",
      wikipediaUrls: {
        "en-US": "https://en.wikipedia.org/wiki/Yi_Sun-sin",
        "ko-KR": "https://ko.wikipedia.org/wiki/이순신",
      },
    },
    // Verified 2026-08 via a direct fetch of the Commons file page. NOT a
    // lifetime likeness — no contemporary depiction or photograph of Yi
    // Sun-sin survives (16th century, predates photography); a modern
    // reconstruction bust at the War Memorial of Korea, photographed 2019.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Bust_of_Yi_Sun-sin_01.jpg",
      width: 2000,
      height: 3000,
      source: "Wikimedia Commons",
      license: "Korea Open Government License Type 1",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Bust_of_Yi_Sun-sin_01.jpg",
      attribution: "War Memorial of Korea (modern reconstruction — no contemporary depiction survives)",
    },
    sources: [wiki("yisunsin", "Yi Sun-sin"), bio("yisunsin", "Nanjung Ilgi (War Diary of Yi Sun-sin)")],
    rows: {
      curiosity: [68, 0.5, "i", "N"],
      analytical_rigor: [88, 0.82, "d", "A"],
      intuitive_synthesis: [78, 0.6, "s", "N"],
      systems_abstraction: [90, 0.85, "d", "A"],
      independent_thinking: [88, 0.85, "d", "A"],
      creative_originality: [82, 0.75, "s", "A"],
      experimentation: [78, 0.7, "s", "A"],
      cross_domain_range: [60, 0.5, "i", "N"],
      aesthetic_sensitivity: [45, 0.4, "i", "N"],
      discipline: [96, 0.94, "d", "A"],
      deep_focus: [82, 0.65, "s", "N"],
      detail_orientation: [90, 0.88, "d", "A"],
      perfectionism: [78, 0.6, "s", "N"],
      execution_speed: [80, 0.7, "s", "A"],
      planning_orientation: [95, 0.92, "d", "A"],
      persistence: [96, 0.94, "d", "A"],
      adaptability: [88, 0.85, "d", "A"],
      risk_tolerance: [72, 0.65, "s", "N"],
      ambiguity_tolerance: [82, 0.7, "s", "A"],
      decisiveness: [90, 0.88, "d", "A"],
      social_assertiveness: [68, 0.5, "i", "N"],
      collaboration: [70, 0.6, "s", "N"],
      leadership_drive: [92, 0.9, "d", "A"],
      persuasiveness: [75, 0.6, "s", "N"],
      conflict_tolerance: [85, 0.8, "d", "D"],
      mastery_orientation: [88, 0.75, "s", "A"],
      achievement_drive: [72, 0.5, "i", "N"],
      competitiveness: [62, 0.45, "i", "N"],
      autonomy_need: [72, 0.65, "s", "D"],
      impact_motivation: [92, 0.85, "d", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6). Unusually well-evidenced for this
      // era via his own war diary (Nanjung Ilgi). Three distinct episodes:
      //   - opportunity_sensing (82, 0.68, s): pushed for turtle-ship
      //     construction and naval defensive preparation before the wider
      //     Joseon court recognized the threat — Korea was famously
      //     under-prepared for the 1592 invasion despite warning signs;
      //     distinct from his already-scored systems_abstraction/
      //     analytical_rigor, which are about structural reasoning, not
      //     reading an unfolding external threat pattern early.
      //   - resourcefulness (92, 0.85, d): the Battle of Myeongnyang —
      //     decisively defeated a vastly larger Japanese fleet with as few
      //     as 12-13 remaining ships, through tactical use of strait
      //     currents/geography. One of the best-documented instances of
      //     making do with severely limited material means in the roster.
      //   - proactive_agency (78, 0.65, s): documented instances of acting
      //     on his own tactical judgment against specific court orders,
      //     leading to his own imprisonment and torture before
      //     reinstatement — marked dual-edged given the direct personal cost.
      // belief_updating left unscored: diary-documented tactical adjustments
      // read as adaptability (already scored), not a specific reversal of an
      // articulated belief.
      opportunity_sensing: [82, 0.68, "s", "A"],
      resourcefulness: [92, 0.85, "d", "A"],
      proactive_agency: [78, 0.65, "s", "D"],
    },
  },
  {
    id: "p_frida_kahlo",
    slug: "frida-kahlo",
    canonicalName: "Frida Kahlo",
    birthYear: 1907,
    deathYear: 1954,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["MX"],
    regionCode: "latin_america",
    occupationIds: ["painter"],
    fieldIds: ["art"],
    impactDomains: ["artistic", "cultural", "social"],
    tagIds: ["independent", "self_taught", "late_recognition"],
    archetypeIds: ["independent_creator", "creative_creator"],
    sources: [wiki("kahlo", "Frida Kahlo"), bio("kahlo", "Hayden Herrera, Frida: A Biography of Frida Kahlo (1983)")],
    // Verified 2026-08 via a direct fetch of the Commons file page: a
    // gelatin silver print by her father, Guillermo Kahlo, dated 16 October
    // 1932. Public domain (artist died 1941, in both Mexico and the US).
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/0/06/Frida_Kahlo%2C_by_Guillermo_Kahlo.jpg",
      width: 1197,
      height: 1795,
      source: "Wikimedia Commons",
      license: "Public Domain (artist died 1941)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Frida_Kahlo,_by_Guillermo_Kahlo.jpg",
      attribution: "Guillermo Kahlo, 16 October 1932",
    },
    rows: {
      curiosity: [75, 0.55, "i", "N"],
      analytical_rigor: [48, 0.45, "i", "N"],
      intuitive_synthesis: [90, 0.75, "s", "N"],
      systems_abstraction: [52, 0.45, "i", "N"],
      independent_thinking: [95, 0.9, "d", "A"],
      creative_originality: [96, 0.92, "d", "A"],
      experimentation: [78, 0.65, "s", "N"],
      cross_domain_range: [58, 0.5, "i", "N"],
      aesthetic_sensitivity: [95, 0.92, "d", "A"],
      discipline: [78, 0.65, "s", "N"],
      deep_focus: [85, 0.72, "s", "A"],
      detail_orientation: [82, 0.7, "s", "N"],
      perfectionism: [82, 0.65, "s", "D"],
      execution_speed: [62, 0.5, "i", "N"],
      planning_orientation: [42, 0.45, "i", "N"],
      persistence: [95, 0.9, "d", "A"],
      adaptability: [72, 0.6, "s", "N"],
      risk_tolerance: [78, 0.65, "s", "N"],
      ambiguity_tolerance: [75, 0.55, "i", "N"],
      decisiveness: [78, 0.5, "i", "N"],
      social_assertiveness: [82, 0.7, "s", "N"],
      collaboration: [55, 0.5, "i", "N"],
      leadership_drive: [48, 0.45, "i", "N"],
      persuasiveness: [72, 0.55, "i", "N"],
      conflict_tolerance: [82, 0.7, "s", "N"],
      mastery_orientation: [82, 0.68, "s", "A"],
      achievement_drive: [68, 0.5, "i", "N"],
      competitiveness: [45, 0.45, "i", "N"],
      autonomy_need: [92, 0.88, "d", "A"],
      impact_motivation: [78, 0.65, "s", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6): resourcefulness (85, 0.72,
      // strong_inference) — after her 1925 bus accident, painted while
      // largely bedridden using a specially-mounted mirror and easel
      // arranged by her mother so she could paint lying down; a concrete,
      // well-corroborated case of continuing creative work under severe
      // physical/material constraint via improvised equipment.
      // proactive_agency (65, 0.5, inference, lower confidence — more
      // biographical-tradition than firmly documented) — approached Diego
      // Rivera unprompted as a young unknown artist seeking his judgment on
      // her work. opportunity_sensing/belief_updating: no supporting
      // evidence found.
      resourcefulness: [85, 0.72, "s", "A"],
      proactive_agency: [65, 0.5, "i", "N"],
    },
  },
  {
    id: "p_serena_williams",
    slug: "serena-williams",
    canonicalName: "Serena Williams",
    birthYear: 1981,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["athlete", "entrepreneur"],
    fieldIds: ["sport", "business"],
    impactDomains: ["athletic", "cultural", "social"],
    tagIds: ["competitor", "career_changer", "sustained_excellence"],
    archetypeIds: ["competitive_performer"],
    sources: [
      wiki("serena", "Serena Williams"),
      bio("serena", "Serena Williams, On the Line (2009)"),
    ],
    rows: {
      curiosity: [62, 0.45, "i", "N"],
      analytical_rigor: [70, 0.5, "i", "N"],
      intuitive_synthesis: [78, 0.5, "i", "N"],
      systems_abstraction: [58, 0.45, "i", "N"],
      independent_thinking: [82, 0.7, "s", "A"],
      creative_originality: [62, 0.45, "i", "N"],
      experimentation: [65, 0.5, "i", "N"],
      cross_domain_range: [68, 0.6, "s", "N"],
      aesthetic_sensitivity: [72, 0.6, "s", "N"],
      discipline: [97, 0.94, "d", "A"],
      deep_focus: [90, 0.85, "d", "A"],
      detail_orientation: [82, 0.7, "s", "A"],
      perfectionism: [88, 0.8, "d", "D"],
      execution_speed: [85, 0.7, "s", "A"],
      planning_orientation: [80, 0.65, "s", "A"],
      persistence: [97, 0.94, "d", "A"],
      adaptability: [85, 0.8, "d", "A"],
      risk_tolerance: [72, 0.6, "s", "N"],
      ambiguity_tolerance: [68, 0.5, "i", "N"],
      decisiveness: [88, 0.8, "d", "A"],
      social_assertiveness: [88, 0.85, "d", "N"],
      collaboration: [65, 0.5, "i", "N"],
      leadership_drive: [80, 0.7, "s", "A"],
      persuasiveness: [78, 0.65, "s", "N"],
      conflict_tolerance: [85, 0.8, "d", "D"],
      mastery_orientation: [95, 0.9, "d", "A"],
      achievement_drive: [96, 0.94, "d", "A"],
      competitiveness: [98, 0.95, "d", "D"],
      autonomy_need: [78, 0.6, "s", "N"],
      impact_motivation: [85, 0.8, "d", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6): proactive_agency (62, 0.5,
      // inference, modest confidence) — public advocacy on maternal health/
      // childbirth safety for Black women following her own near-fatal
      // childbirth complications, self-initiated rather than a professional
      // obligation; distinct from her already-scored leadership_drive/
      // impact_motivation (general drive to lead/matter), which don't
      // specifically evidence unprompted initiative. opportunity_sensing/
      // belief_updating: no supporting evidence. resourcefulness: considered
      // (early training on under-resourced Compton public courts) and left
      // unscored — too generic/common among athletes from similar
      // backgrounds to treat as distinctive personal evidence. Overall the
      // thinnest new-trait coverage in Batch 2 despite excellent coverage on
      // the original 30 — her public record documents competitive
      // performance far more than these specific constructs; flagged for
      // the missing-not-at-random audit.
      proactive_agency: [62, 0.5, "i", "A"],
    },
  },
  {
    id: "p_alan_turing",
    slug: "alan-turing",
    canonicalName: "Alan Turing",
    birthYear: 1912,
    deathYear: 1954,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["mathematician", "computer_scientist"],
    fieldIds: ["mathematics", "computing"],
    impactDomains: ["scientific", "technological", "historical", "innovation"],
    tagIds: ["theorist", "independent", "early_computing"],
    archetypeIds: ["technical_innovator", "scientific_explorer"],
    // Profile V2 evidence closure (2026-08): src_turing_aps_burglary added,
    // directly fetched and inspected, to close the January 1952 burglary
    // detail -- src_turing_wikipedia's own article text does not state how
    // Turing came to police attention, only that he was prosecuted.
    sources: [
      wiki("turing", "Alan Turing"),
      bio("turing", "Andrew Hodges, Alan Turing: The Enigma (1983)"),
      {
        id: "src_turing_aps_burglary",
        kind: "press",
        title: "American Physical Society — \"January 23, 1952: Alan Turing's House Is Burglarized\"",
        url: "https://www.aps.org/apsnews/2014/01/alan-turing-house-burglarized",
      },
    ],
    // Verified 2026-08 via a direct fetch of the Commons file page: Elliott
    // & Fry studio photograph, dated 29 March 1951. Public domain (Creative
    // Commons Public Domain Mark 1.0) in both the UK and US.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Alan_Turing_%281951%29.jpg",
      width: 800,
      height: 1067,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Alan_Turing_(1951).jpg",
      attribution: "Elliott & Fry, 29 March 1951",
    },
    rows: {
      curiosity: [94, 0.88, "d", "A"],
      analytical_rigor: [96, 0.94, "d", "A"],
      intuitive_synthesis: [82, 0.7, "s", "N"],
      systems_abstraction: [97, 0.95, "d", "A"],
      independent_thinking: [95, 0.92, "d", "A"],
      creative_originality: [92, 0.88, "d", "A"],
      experimentation: [82, 0.75, "s", "A"],
      cross_domain_range: [82, 0.8, "d", "A"],
      aesthetic_sensitivity: [52, 0.45, "i", "N"],
      discipline: [82, 0.68, "s", "N"],
      deep_focus: [95, 0.9, "d", "A"],
      detail_orientation: [80, 0.65, "s", "N"],
      perfectionism: [70, 0.5, "i", "N"],
      execution_speed: [68, 0.5, "i", "N"],
      planning_orientation: [58, 0.5, "i", "N"],
      persistence: [92, 0.85, "d", "A"],
      adaptability: [72, 0.6, "s", "N"],
      risk_tolerance: [65, 0.5, "i", "N"],
      ambiguity_tolerance: [92, 0.82, "s", "A"],
      decisiveness: [72, 0.5, "i", "N"],
      social_assertiveness: [35, 0.7, "s", "N"],
      collaboration: [58, 0.6, "s", "N"],
      leadership_drive: [38, 0.55, "i", "N"],
      persuasiveness: [45, 0.5, "i", "N"],
      conflict_tolerance: [50, 0.45, "i", "N"],
      mastery_orientation: [92, 0.85, "d", "A"],
      achievement_drive: [72, 0.5, "i", "N"],
      competitiveness: [55, 0.45, "i", "N"],
      autonomy_need: [88, 0.78, "s", "A"],
      impact_motivation: [78, 0.65, "s", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6): proactive_agency (78, 0.65,
      // strong_inference) — in 1941, wrote directly to Winston Churchill
      // with colleagues, bypassing the normal chain of command, to request
      // more resources for Bletchley Park when official channels weren't
      // acting with urgency (the letter survives; Churchill's "action this
      // day" response is documented). Not "d" tier since it was a
      // group-authored letter, not solely his individual act.
      // opportunity_sensing/resourcefulness/belief_updating left unscored:
      // his 1936 computability insight and later morphogenesis work are
      // theoretical breakthroughs already reflected in systems_abstraction/
      // creative_originality/cross_domain_range, not distinct evidence of
      // environmental scanning; Bletchley's resource constraints are
      // attributable to the wider wartime effort, not a personal
      // resourcefulness episode specific to him; no documented reversal of
      // an articulated belief.
      proactive_agency: [78, 0.65, "s", "A"],
    },
  },
];

const ROSTER_1: readonly Person[] = seeds.map(build);

/**
 * Combined seed dataset: the original 10 (roster 1) plus the 25 added in
 * Phase 2 (roster 2, src/data/people/roster2.ts) for match-frequency and
 * signature-trait stress testing, plus the roster-1000 expansion batches
 * (roster 3, session 3, +16; roster 4, session 4, +16; roster 5, session 5,
 * +3; roster 6, session 6, +5; roster 7, session 10, +9 eligibility_v2
 * promotions; roster 8, session 11, +20 fresh candidates). See CLAUDE.md
 * "Seed dataset" and docs/roster-1000-checkpoint.md for the current count
 * and simulation results.
 */
const ALL_ROSTERS: readonly Person[] = [
  ...ROSTER_1,
  ...ROSTER_2,
  ...ROSTER_3,
  ...ROSTER_4,
  ...ROSTER_5,
  ...ROSTER_6,
  ...ROSTER_7,
  ...ROSTER_8,
  ...ROSTER_9,
  ...ROSTER_10,
];

/**
 * Editorial narrative content (achievements/moments/turning points, see
 * `editorial.ts` and CLAUDE.md's editorial-content section) is merged onto
 * the built roster by slug here, rather than inlined into each roster
 * file's `PersonSeed` literal — a pure, additive transform that touches no
 * existing roster file and cannot affect `build()`/scoring/matching. Most
 * people have no entry in `PERSON_EDITORIAL` yet; `editorial` is simply
 * left `undefined` for them, which every consumer already treats as "no
 * editorial content authored yet", not an error.
 */
export const SEED_PEOPLE: readonly Person[] = ALL_ROSTERS.map((person) => {
  const editorial = PERSON_EDITORIAL[person.slug];
  return editorial ? { ...person, editorial } : person;
});

export function personBySlug(slug: string): Person | undefined {
  return SEED_PEOPLE.find((p) => p.slug === slug);
}
