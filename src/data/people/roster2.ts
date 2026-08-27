/**
 * ROSTER 2 — 25 additional match-eligible profiles.
 *
 * Purpose per CLAUDE.md Phase 2 objective: stress-test the numerical system,
 * not content completeness. Chosen deliberately AGAINST clustering around the
 * "extraordinary achiever" stereotype the original 10 leaned toward:
 *
 *   - low risk tolerance as the ADVANTAGE it was (Buffett), not a flaw
 *   - high collaboration / low autonomy (Mandela, Goodall) alongside the
 *     original set's heavy tilt toward solitary independents
 *   - low leadership_drive specialists (Ramanujan, Rosalind Franklin, Rumi)
 *   - explicit conflict-seekers (Genghis Khan) vs. harmony-seekers (Confucius)
 *   - extreme specialists (Ramanujan: mathematics only) vs. generalists
 *     (Benjamin Franklin: science, politics, invention, diplomacy; Ibn
 *     Khaldun: history, sociology, philosophy, law)
 *   - regions absent from roster 1: sub-Saharan Africa, South Asia, Central
 *     Asia, North Africa, West Asia, Central Europe
 *   - eras absent or thin in roster 1: ancient (2), medieval (4)
 *
 * ANCIENT / MEDIEVAL EVIDENCE NOTE: Confucius, Socrates, Genghis Khan, Zheng
 * He, Rumi and Ibn Khaldun are scored on a DELIBERATELY SMALLER set of
 * attributes (18-22 of 30) — only the ones with real corroboration across
 * historical sources — rather than diluted across all 30 at low confidence.
 * This keeps eligibility honest: a thin ancient/medieval record should not be
 * forced to a full profile just to hit a target count. Confidence tops out
 * around 0.7 for these figures; documented-tier evidence is reserved for
 * eras with primary sources.
 *
 * REMOVED (2026-08, inclusion_v1 audit, see CLAUDE.md "Inclusion philosophy"):
 * Cleopatra VII. Her primary historical prominence is inseparable from an
 * inherited Ptolemaic throne — the counterfactual test fails: without the
 * throne, none of her diplomatic or administrative acts would have had a
 * platform to be notable from.
 *
 * REPLACED WITH (2026-08): Ibn Khaldun (1332-1406). Passes the counterfactual
 * test cleanly — the Muqaddimah's historiographic/sociological/economic
 * theory is recognized on its own intellectual merit, independent of his
 * family's minor administrative background. Restores North Africa
 * representation and adds a fourth medieval profile with a distinct
 * scholar-generalist trait shape (high cross_domain_range + systems_
 * abstraction alongside real, repeatedly-exercised political/judicial
 * leadership — unlike the pure-specialist or pure-conqueror shapes already
 * in the set).
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_mozart",
    slug: "wolfgang-amadeus-mozart",
    canonicalName: "Wolfgang Amadeus Mozart",
    birthYear: 1756,
    deathYear: 1791,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["AT"],
    regionCode: "central_europe",
    occupationIds: ["composer"],
    fieldIds: ["music"],
    impactDomains: ["artistic", "cultural"],
    tagIds: ["prodigy", "specialist"],
    archetypeIds: ["creative_creator"],
    // Portrait Sourcing Batch 1 (2026-08): REPLACES the prior Barbara Krafft
    // 1819 painting, which was posthumous (Mozart died 1791). This Lange
    // portrait was painted from life in 1782 by Mozart's own brother-in-law,
    // when Mozart was 26, and is regarded by historians as the most accurate
    // surviving likeness of Mozart -- the splotchy cheek texture visible in
    // the original (Mozart Museum, Salzburg) was verified by his own
    // contemporaries as true to life. Originally a small study later
    // affixed to a larger canvas intended to show Mozart at the piano,
    // which was never completed -- hence "unfinished." Verified live
    // against the Commons file page.
    //
    // Portrait Reliability Closure (2026-08): re-hosted locally at
    // public/portraits/wolfgang-amadeus-mozart-lange-1782.jpg after real
    // Playwright/Chromium verification reproduced intermittent
    // net::ERR_BLOCKED_BY_ORB on upload.wikimedia.org hotlinks (the CDN
    // returning HTTP 429 + an HTML body during request bursts, which
    // Chromium then blocks as a non-image response -- affected both new and
    // pre-existing portraits, an infrastructure issue, not a bad URL).
    //
    // Asset-Weight Closure (2026-08): the initially-localized file was the
    // untouched original (4180x5776, 11.2MB) -- far larger than any actual
    // render size (hero maxes out around 240px wide). Re-encoded via sharp/
    // mozjpeg, proportional resize to a 1600px longest side (lanczos3, no
    // sharpening) + quality-85 mozjpeg re-encode, metadata stripped -- no
    // crop, no upscale, no AI processing, aspect ratio preserved to within
    // integer-pixel rounding (0.723684 -> 0.723750). 4180x5776 -> 1158x1600,
    // 11.2MB -> 207KB (98.2% smaller). This is now a resized/recompressed
    // derivative of the approved original, not a byte-identical copy --
    // licenseUrl below still points to the live, full-resolution Commons
    // file page.
    portrait: {
      url: "/portraits/wolfgang-amadeus-mozart-lange-1782.jpg",
      width: 1158,
      height: 1600,
      source: "Wikimedia Commons (hosted locally by this app as a resized/compressed derivative; see licenseUrl for the full-resolution original)",
      license: "Public Domain (artist died 1831)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Mozart_(unfinished)_by_Lange_1782.jpg",
      attribution: "Painted from life by Joseph Lange, 1782 — Mozart Museum, Salzburg",
    },
    // Profile V2 evidence closure (2026-08): two additional Wikipedia
    // articles, each directly fetched and inspected, close specific claims
    // (the 1762 Vienna/grand-tour details; the exact three-symphony dates)
    // the general biography article doesn't itself state in enough detail.
    sources: [
      wiki("mozart", "Wolfgang Amadeus Mozart"),
      {
        id: "src_mozart_grand_tour_wikipedia",
        kind: "wikipedia",
        title: "Mozart family grand tour",
        url: "https://en.wikipedia.org/wiki/Mozart_family_grand_tour",
      },
      {
        id: "src_mozart_symphony41_wikipedia",
        kind: "wikipedia",
        title: "Symphony No. 41 (Mozart)",
        url: "https://en.wikipedia.org/wiki/Symphony_No._41_(Mozart)",
      },
    ],
    rows: {
      curiosity: [78, 0.6, "s", "N"],
      analytical_rigor: [68, 0.5, "i", "N"],
      intuitive_synthesis: [96, 0.85, "d", "A"],
      systems_abstraction: [72, 0.55, "i", "N"],
      independent_thinking: [78, 0.6, "s", "N"],
      creative_originality: [94, 0.88, "d", "A"],
      experimentation: [75, 0.6, "s", "N"],
      cross_domain_range: [55, 0.45, "i", "N"],
      aesthetic_sensitivity: [97, 0.92, "d", "A"],
      discipline: [72, 0.6, "s", "N"],
      deep_focus: [88, 0.75, "s", "A"],
      detail_orientation: [80, 0.65, "s", "N"],
      perfectionism: [78, 0.6, "s", "N"],
      execution_speed: [90, 0.8, "d", "A"],
      planning_orientation: [42, 0.5, "i", "N"],
      persistence: [78, 0.6, "s", "N"],
      adaptability: [72, 0.55, "i", "N"],
      risk_tolerance: [58, 0.45, "i", "N"],
      ambiguity_tolerance: [65, 0.45, "i", "N"],
      decisiveness: [75, 0.55, "i", "N"],
      social_assertiveness: [68, 0.55, "i", "N"],
      collaboration: [62, 0.5, "i", "N"],
      leadership_drive: [45, 0.45, "i", "N"],
      persuasiveness: [55, 0.4, "i", "N"],
      conflict_tolerance: [55, 0.4, "i", "N"],
      mastery_orientation: [92, 0.8, "d", "A"],
      achievement_drive: [68, 0.5, "i", "N"],
      competitiveness: [55, 0.4, "i", "N"],
      autonomy_need: [65, 0.5, "i", "N"],
      impact_motivation: [58, 0.4, "i", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6, symmetric protocol): proactive_
      // agency (68, 0.55, s, D) — the 1781 break from the Archbishop of
      // Salzburg's employment, actively pursued to establish an independent
      // freelance career in Vienna rather than continuing an assigned
      // position; financially precarious for the rest of his life, hence
      // dual-edged. opportunity_sensing/resourcefulness/belief_updating:
      // checked against both poles, no qualifying episode found in either
      // direction — left missing, not defaulted from absence of high
      // evidence alone.
      proactive_agency: [68, 0.55, "s", "D"],
    },
  },
  {
    id: "p_beethoven",
    slug: "ludwig-van-beethoven",
    canonicalName: "Ludwig van Beethoven",
    birthYear: 1770,
    deathYear: 1827,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["DE"],
    regionCode: "central_europe",
    occupationIds: ["composer"],
    fieldIds: ["music"],
    impactDomains: ["artistic", "cultural"],
    tagIds: ["specialist", "overcame_adversity"],
    archetypeIds: ["creative_creator", "independent_creator"],
    // ROSTER-1000 portrait sourcing (2026-08): the best-known portrait of
    // Beethoven, painted from life in 1820. Verified live against the
    // Commons file page.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ludwig_van_Beethoven_%28Stieler%2C_1820%29.jpg",
      width: 1598,
      height: 1986,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Ludwig_van_Beethoven_(Stieler,_1820).jpg",
      attribution: "Painted from life by Joseph Karl Stieler, 1820, Beethoven-Haus, Bonn, Public Domain",
    },
    sources: [wiki("beethoven", "Ludwig van Beethoven")],
    doNotCopyKeys: ["dontcopy.beethoven.volatility"],
    rows: {
      curiosity: [70, 0.5, "i", "N"],
      analytical_rigor: [65, 0.5, "i", "N"],
      intuitive_synthesis: [92, 0.8, "s", "A"],
      systems_abstraction: [75, 0.55, "s", "N"],
      independent_thinking: [90, 0.8, "d", "A"],
      creative_originality: [95, 0.88, "d", "A"],
      experimentation: [85, 0.7, "s", "A"],
      cross_domain_range: [48, 0.4, "i", "N"],
      aesthetic_sensitivity: [94, 0.85, "d", "A"],
      discipline: [85, 0.7, "s", "A"],
      deep_focus: [90, 0.78, "s", "A"],
      detail_orientation: [78, 0.6, "s", "N"],
      perfectionism: [90, 0.78, "d", "D"],
      execution_speed: [48, 0.5, "i", "N"],
      planning_orientation: [55, 0.45, "i", "N"],
      persistence: [97, 0.92, "d", "A"],
      adaptability: [82, 0.7, "s", "A"],
      risk_tolerance: [62, 0.45, "i", "N"],
      ambiguity_tolerance: [65, 0.45, "i", "N"],
      decisiveness: [72, 0.5, "i", "N"],
      social_assertiveness: [50, 0.5, "s", "N"],
      collaboration: [38, 0.55, "s", "D"],
      leadership_drive: [52, 0.45, "i", "N"],
      persuasiveness: [50, 0.4, "i", "N"],
      conflict_tolerance: [78, 0.65, "s", "D"],
      mastery_orientation: [95, 0.85, "d", "A"],
      achievement_drive: [80, 0.62, "s", "N"],
      competitiveness: [60, 0.42, "i", "N"],
      autonomy_need: [85, 0.7, "s", "A"],
      impact_motivation: [72, 0.55, "i", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6, symmetric protocol):
      //   - resourcefulness (82, 0.68, s, A) — progressive deafness from his
      //     late 20s forced a fundamental adaptation of his compositional
      //     method (specially cut pencils/notebooks, feeling vibrations,
      //     eventually composing entirely by internal imagination without
      //     hearing performances) — a genuine constraint met by recombining
      //     available means, distinct from his already-scored persistence
      //     (continuing despite adversity generally); this is specifically
      //     about the method-substitution itself.
      //   - proactive_agency (70, 0.55, s, A) — the 1809 annuity: personally
      //     negotiated a stipend from three aristocratic patrons to remain
      //     in Vienna without a formal court/church position, self-directed
      //     rather than assigned, when he was being courted to leave for a
      //     position elsewhere.
      // opportunity_sensing/belief_updating: checked against both poles, no
      // qualifying episode either direction — left missing.
      resourcefulness: [82, 0.68, "s", "A"],
      proactive_agency: [70, 0.55, "s", "A"],
    },
  },
  {
    id: "p_nelson_mandela",
    slug: "nelson-mandela",
    canonicalName: "Nelson Mandela",
    birthYear: 1918,
    deathYear: 2013,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["ZA"],
    regionCode: "sub_saharan_africa",
    occupationIds: ["political_leader", "lawyer"],
    fieldIds: ["politics", "civil_rights"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "reconciliation", "endured_imprisonment"],
    archetypeIds: ["organizational_leader", "social_influencer"],
    sources: [wiki("mandela", "Nelson Mandela"), bio("mandela", "Nelson Mandela, Long Walk to Freedom (1994)")],
    // Verified 2026-08 via a direct fetch of the Commons file page:
    // originally sourced from Flickr (South Africa The Good News), dated
    // 13 May 2008, verified by a Commons administrator in 2010. Licensed
    // CC BY 2.0 — reuse permitted with attribution, not public domain.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/14/Nelson_Mandela-2008_%28edit%29.jpg",
      width: 657,
      height: 778,
      source: "Wikimedia Commons",
      license: "CC BY 2.0",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Nelson_Mandela-2008_(edit).jpg",
      attribution: "South Africa The Good News (sagoodnews.co.za), 2008, CC BY 2.0",
    },
    rows: {
      curiosity: [60, 0.45, "i", "N"],
      analytical_rigor: [68, 0.55, "s", "N"],
      intuitive_synthesis: [72, 0.5, "i", "N"],
      systems_abstraction: [72, 0.55, "s", "N"],
      independent_thinking: [85, 0.75, "s", "A"],
      creative_originality: [55, 0.4, "i", "N"],
      experimentation: [50, 0.4, "i", "N"],
      cross_domain_range: [52, 0.4, "i", "N"],
      aesthetic_sensitivity: [42, 0.35, "i", "N"],
      discipline: [88, 0.78, "d", "A"],
      deep_focus: [72, 0.6, "s", "N"],
      detail_orientation: [58, 0.45, "i", "N"],
      perfectionism: [52, 0.4, "i", "N"],
      execution_speed: [52, 0.4, "i", "N"],
      planning_orientation: [80, 0.65, "s", "A"],
      persistence: [98, 0.94, "d", "A"],
      adaptability: [88, 0.78, "d", "A"],
      risk_tolerance: [82, 0.7, "s", "D"],
      ambiguity_tolerance: [82, 0.65, "s", "A"],
      decisiveness: [80, 0.65, "s", "A"],
      social_assertiveness: [82, 0.7, "s", "N"],
      collaboration: [85, 0.75, "s", "A"],
      leadership_drive: [92, 0.85, "d", "A"],
      persuasiveness: [90, 0.82, "d", "A"],
      conflict_tolerance: [90, 0.8, "d", "D"],
      mastery_orientation: [62, 0.45, "i", "N"],
      achievement_drive: [75, 0.58, "s", "N"],
      competitiveness: [38, 0.4, "i", "N"],
      autonomy_need: [58, 0.45, "i", "N"],
      impact_motivation: [96, 0.9, "d", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6). Considered opportunity_sensing
      // (reading that reconciliation, not retribution, was becoming
      // strategically necessary) but dropped on reflection: it clusters too
      // closely with proactive_agency below (same broad transition period)
      // and risks the "dramatic transformation as evidence for everything"
      // pattern this migration is explicitly auditing against. Kept only
      // the two most behaviorally distinct cells from that period, plus one
      // from a separate episode:
      //   - resourcefulness (75, 0.6, s): organized informal prisoner
      //     education on Robben Island using smuggled books and improvised
      //     study groups under harsh, materially poor conditions (Long Walk
      //     to Freedom) — a separate episode from the negotiations below.
      //   - proactive_agency (78, 0.62, s): initiated secret negotiations
      //     with the apartheid government from prison, without his own
      //     movement's full knowledge or authorization at first — a
      //     specific, controversial-at-the-time behavioral act (dual-edged).
      //   - belief_updating (72, 0.58, s): explicit shift from advocating
      //     armed struggle (co-founded Umkhonto we Sizwe) to prioritizing
      //     negotiated settlement as a matter of principle, not just
      //     tactics, developed during imprisonment.
      resourcefulness: [75, 0.6, "s", "A"],
      proactive_agency: [78, 0.62, "s", "D"],
      belief_updating: [72, 0.58, "s", "A"],
    },
  },
  {
    id: "p_mahatma_gandhi",
    slug: "mahatma-gandhi",
    canonicalName: "Mahatma Gandhi",
    birthYear: 1869,
    deathYear: 1948,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["IN"],
    regionCode: "south_asia",
    occupationIds: ["political_leader", "lawyer"],
    fieldIds: ["politics", "civil_rights"],
    impactDomains: ["historical", "social"],
    tagIds: ["leader", "nonviolence", "ascetic"],
    archetypeIds: ["organizational_leader", "social_influencer"],
    // Verified 2026-08 via a direct fetch of the Commons file page. Chosen
    // over the more commonly used 1931 studio portrait (Elliott & Fry)
    // specifically because that file carries an active US-copyright warning
    // (URAA restoration risk, publication history unclear) — this one has an
    // explicit, unambiguous PD-US rationale instead. License/attribution
    // reproduced as given, not paraphrased or translated.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Gandhi_as_a_student_in_London.png",
      width: 534,
      height: 734,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Gandhi_as_a_student_in_London.png",
    },
    sources: [wiki("gandhi", "Mahatma Gandhi"), bio("gandhi", "Gandhi, An Autobiography: The Story of My Experiments with Truth (1927)")],
    doNotCopyKeys: ["dontcopy.gandhi.self_denial"],
    rows: {
      curiosity: [62, 0.45, "i", "N"],
      analytical_rigor: [58, 0.42, "i", "N"],
      intuitive_synthesis: [78, 0.55, "s", "N"],
      systems_abstraction: [68, 0.5, "i", "N"],
      independent_thinking: [90, 0.8, "d", "A"],
      creative_originality: [68, 0.5, "s", "N"],
      experimentation: [72, 0.55, "s", "N"],
      cross_domain_range: [50, 0.4, "i", "N"],
      aesthetic_sensitivity: [38, 0.35, "i", "N"],
      discipline: [95, 0.85, "d", "A"],
      deep_focus: [78, 0.6, "s", "N"],
      detail_orientation: [55, 0.4, "i", "N"],
      perfectionism: [72, 0.5, "s", "D"],
      execution_speed: [42, 0.4, "i", "N"],
      planning_orientation: [65, 0.48, "i", "N"],
      persistence: [96, 0.88, "d", "A"],
      adaptability: [75, 0.58, "s", "N"],
      risk_tolerance: [78, 0.62, "s", "D"],
      ambiguity_tolerance: [78, 0.58, "s", "A"],
      decisiveness: [70, 0.5, "i", "N"],
      social_assertiveness: [78, 0.6, "s", "N"],
      collaboration: [78, 0.62, "s", "A"],
      leadership_drive: [88, 0.75, "d", "A"],
      persuasiveness: [92, 0.82, "d", "A"],
      conflict_tolerance: [85, 0.7, "s", "D"],
      mastery_orientation: [65, 0.48, "i", "N"],
      achievement_drive: [68, 0.48, "i", "N"],
      competitiveness: [28, 0.42, "i", "N"],
      autonomy_need: [65, 0.48, "i", "N"],
      impact_motivation: [97, 0.88, "d", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6): opportunity_sensing (65, 0.5,
      // inference) — developed and tested satyagraha (mass civil
      // disobedience) against local grievances in South Africa before
      // recognizing and generalizing its potential at a much larger scale
      // for Indian independence; moderate confidence given the interpretive
      // framing involved. proactive_agency (88, 0.75, documented) — the
      // 1930 Salt March: personally organized and led a 24-day, 240-mile
      // march in deliberate defiance of British law, entirely self-
      // initiated. belief_updating (60, 0.45, inference, low confidence) —
      // biographical accounts describe an evolution in his stated positions
      // on caste over time under sustained challenge (notably from
      // B.R. Ambedkar); framed here only as documented change over time,
      // not an assessment of its adequacy. resourcefulness left unscored:
      // his ashram simple-living philosophy (already flagged via his own
      // doNotCopyKeys self-denial caution) is a stance, not evidenced
      // improvisation under constraint — same distinction applied to
      // Socrates's asceticism in Batch 1.
      opportunity_sensing: [65, 0.5, "i", "A"],
      proactive_agency: [88, 0.75, "d", "A"],
      belief_updating: [60, 0.45, "i", "N"],
    },
  },
  {
    id: "p_confucius",
    slug: "confucius",
    canonicalName: "Confucius",
    birthYear: -551,
    deathYear: -479,
    isLiving: false,
    era: "ancient",
    nationalityCodes: ["CN"],
    regionCode: "east_asia",
    occupationIds: ["philosopher", "teacher"],
    fieldIds: ["philosophy", "education"],
    impactDomains: ["historical", "educational", "cultural"],
    tagIds: ["philosopher", "administrator"],
    archetypeIds: ["scholarly_specialist", "organizational_leader"],
    // ROSTER-1000 portrait pilot (2026-08): a traditional, idealized
    // depiction (Tang Dynasty, ~750 CE, ~1,200 years after Confucius's
    // death — photography obviously did not exist) rather than a lifetime
    // likeness, per Part 17's explicit allowance for "non-photographic
    // historical representations... acceptable when defensibly
    // identified." This is the canonical traditional depiction widely used
    // across encyclopedic sources for exactly this reason, not an
    // arbitrary pick. Verified live against the Commons file page.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/54/Confucius_Tang_Dynasty.jpg",
      width: 350,
      height: 640,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Confucius_Tang_Dynasty.jpg",
      attribution: "Traditional portrait attributed to Wu Daozi, Tang Dynasty (c. 8th century) — an idealized historical depiction, not a lifetime likeness",
    },
    // Ancient sourcing: scored on a smaller, better-corroborated subset rather
    // than diluted across all 30. See file header.
    sources: [wiki("confucius", "Confucius"), bio("confucius", "The Analects (compiled by disciples)")],
    rows: {
      curiosity: [68, 0.6, "s", "N"],
      analytical_rigor: [62, 0.55, "s", "N"],
      systems_abstraction: [80, 0.62, "s", "A"],
      independent_thinking: [68, 0.55, "s", "N"],
      discipline: [90, 0.68, "s", "A"],
      deep_focus: [76, 0.58, "s", "N"],
      detail_orientation: [68, 0.55, "s", "N"],
      perfectionism: [60, 0.5, "i", "N"],
      planning_orientation: [80, 0.62, "s", "A"],
      persistence: [85, 0.65, "s", "A"],
      risk_tolerance: [32, 0.55, "s", "N"],
      social_assertiveness: [60, 0.5, "i", "N"],
      collaboration: [68, 0.55, "s", "N"],
      leadership_drive: [62, 0.5, "i", "N"],
      persuasiveness: [78, 0.6, "s", "A"],
      conflict_tolerance: [40, 0.55, "s", "N"],
      mastery_orientation: [88, 0.68, "s", "A"],
      achievement_drive: [60, 0.5, "i", "N"],
      competitiveness: [28, 0.55, "s", "N"],
      impact_motivation: [82, 0.6, "s", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6): pioneered private teaching open
      // regardless of hereditary/aristocratic status — self-initiated, not
      // commissioned by any ruler or office. opportunity_sensing,
      // resourcefulness, and belief_updating left unscored: no evidence of
      // environmental/pattern scanning (his framing is explicitly
      // backward-looking, "a transmitter, not a maker"); the Chen/Cai
      // hardship anecdote evidences endurance, not resourceful improvisation;
      // and his self-description positions him as preserving received wisdom,
      // not revising a position under evidence.
      proactive_agency: [72, 0.55, "s", "A"],
    },
  },
  {
    id: "p_socrates",
    slug: "socrates",
    canonicalName: "Socrates",
    birthYear: -470,
    deathYear: -399,
    isLiving: false,
    era: "ancient",
    nationalityCodes: ["GR"],
    regionCode: "southern_europe",
    occupationIds: ["philosopher"],
    fieldIds: ["philosophy"],
    impactDomains: ["historical", "educational"],
    tagIds: ["philosopher", "nonconformist"],
    archetypeIds: ["independent_creator", "scholarly_specialist"],
    sources: [wiki("socrates", "Socrates"), bio("socrates", "Plato's dialogues (secondary account)")],
    rows: {
      curiosity: [90, 0.65, "s", "A"],
      analytical_rigor: [82, 0.6, "s", "A"],
      independent_thinking: [95, 0.68, "s", "A"],
      creative_originality: [70, 0.5, "i", "N"],
      discipline: [65, 0.5, "i", "N"],
      deep_focus: [78, 0.55, "s", "N"],
      execution_speed: [35, 0.5, "i", "N"],
      planning_orientation: [30, 0.5, "i", "N"],
      persistence: [82, 0.6, "s", "A"],
      ambiguity_tolerance: [85, 0.6, "s", "A"],
      decisiveness: [55, 0.45, "i", "N"],
      social_assertiveness: [88, 0.62, "s", "N"],
      collaboration: [45, 0.5, "i", "N"],
      leadership_drive: [40, 0.5, "s", "N"],
      persuasiveness: [82, 0.6, "s", "A"],
      conflict_tolerance: [92, 0.68, "s", "D"],
      mastery_orientation: [78, 0.55, "s", "N"],
      competitiveness: [55, 0.42, "i", "N"],
      autonomy_need: [90, 0.65, "s", "A"],
      impact_motivation: [72, 0.52, "i", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6): sustained unlicensed public
      // questioning in the Athenian agora, unaffiliated with any office or
      // institution, continued despite social friction and his own trial —
      // self-initiated and unassigned (Apology). opportunity_sensing,
      // resourcefulness, and belief_updating left unscored: his method
      // targets OTHERS' beliefs, not a documented instance of revising his
      // own; his asceticism is a philosophical stance toward material
      // things, not evidenced improvisation under constraint; no evidence of
      // environmental/pattern scanning.
      proactive_agency: [82, 0.6, "s", "D"],
    },
  },
  {
    id: "p_warren_buffett",
    slug: "warren-buffett",
    canonicalName: "Warren Buffett",
    birthYear: 1930,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["investor"],
    fieldIds: ["finance", "business"],
    impactDomains: ["wealth_creation", "industrial"],
    tagIds: ["specialist", "low_risk", "patient"],
    archetypeIds: ["scholarly_specialist"],
    // ROSTER-1000 portrait pilot (2026-08): a US federal government work
    // (White House official photography, 2010 Presidential Medal of
    // Freedom ceremony) — public domain in the US under 17 U.S.C. §105,
    // verified live against the Commons file page. Low resolution
    // (231x228) is a real, honestly-recorded limitation of this specific
    // source image, not a licensing concern.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/df/Warren_Buffett_in_2010_%28cropped%29.jpg",
      width: 231,
      height: 228,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Warren_Buffett_in_2010_(cropped).jpg",
      attribution: "The White House, 2010",
    },
    // Profile V2 evidence closure (2026-08): two primary-source additions,
    // both directly fetched and inspected (not assumed from a general
    // Wikipedia/biography citation) to close specific claims the original
    // pilot pass had mis-cited to src_buffett_wikipedia without the article
    // actually stating them.
    sources: [
      wiki("buffett", "Warren Buffett"),
      bio("buffett", "Alice Schroeder, The Snowball (2008)"),
      {
        id: "src_buffett_1998_letter",
        kind: "archive",
        title: "Berkshire Hathaway 1998 Chairman's Letter to Shareholders",
        url: "https://www.berkshirehathaway.com/letters/1998htm.html",
      },
      {
        id: "src_buffett_1996_annual_report",
        kind: "archive",
        title: "Berkshire Hathaway 1996 Annual Report (Chairman's Letter)",
        url: "https://www.berkshirehathaway.com/1996ar/1996.html",
      },
    ],
    rows: {
      curiosity: [65, 0.55, "s", "N"],
      analytical_rigor: [92, 0.85, "d", "A"],
      intuitive_synthesis: [55, 0.45, "i", "N"],
      systems_abstraction: [82, 0.68, "s", "A"],
      independent_thinking: [85, 0.75, "s", "A"],
      creative_originality: [45, 0.4, "i", "N"],
      experimentation: [35, 0.4, "i", "N"],
      cross_domain_range: [50, 0.42, "i", "N"],
      aesthetic_sensitivity: [30, 0.35, "i", "N"],
      discipline: [95, 0.88, "d", "A"],
      deep_focus: [88, 0.75, "s", "A"],
      detail_orientation: [85, 0.72, "s", "A"],
      perfectionism: [58, 0.45, "i", "N"],
      execution_speed: [42, 0.5, "s", "N"],
      planning_orientation: [82, 0.68, "s", "A"],
      persistence: [92, 0.82, "d", "A"],
      adaptability: [55, 0.45, "i", "N"],
      risk_tolerance: [25, 0.72, "d", "A"],
      ambiguity_tolerance: [60, 0.48, "i", "N"],
      decisiveness: [70, 0.55, "s", "N"],
      social_assertiveness: [62, 0.5, "i", "N"],
      collaboration: [58, 0.45, "i", "N"],
      leadership_drive: [58, 0.48, "i", "N"],
      persuasiveness: [70, 0.55, "s", "N"],
      conflict_tolerance: [45, 0.4, "i", "N"],
      mastery_orientation: [90, 0.78, "d", "A"],
      achievement_drive: [78, 0.6, "s", "N"],
      competitiveness: [65, 0.5, "i", "N"],
      autonomy_need: [72, 0.55, "s", "N"],
      impact_motivation: [55, 0.42, "i", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6).
      //   - opportunity_sensing (60, 0.58, s, D) — MIXED-EVIDENCE RE-SCORE
      //     (symmetry audit, 2026-08; was 92, d, A). HIGH evidence: value
      //     investing's core skill, recognizing mispriced opportunities
      //     before the wider market within his analytical frame (American
      //     Express during the salad-oil scandal, GEICO), central to his
      //     identity and extensively documented, beyond generic
      //     analytical_rigor. LOW evidence, equally well documented and
      //     self-acknowledged: decades-long avoidance of technology
      //     investing (no major position until IBM 2011, Apple 2016)
      //     despite the rise of transformative technology companies being
      //     an increasingly obvious, non-speculative shift, not a weak
      //     signal — he has repeatedly stated in shareholder letters and
      //     interviews that this was an error, not merely caution. His own
      //     "circle of competence" doctrine is itself a stated, deliberate
      //     policy of NOT scanning broadly outside a bounded domain — close
      //     to the opposite of the general, cross-domain construct this
      //     attribute is defined to measure (see attribute definition:
      //     must generalize beyond one person's chosen niche). Read on the
      //     BROAD construct as instructed (general environmental scanning,
      //     not "skill within a self-chosen frame"), the well-documented,
      //     self-admitted failure to sense a major, obvious, sustained
      //     shift outweighs the narrow-frame skill enough to move the score
      //     substantially below its original value, not merely trim it —
      //     not averaged mechanically, reasoned as a single judgment call
      //     given the genuine tension. Marked dual-edged: the same
      //     narrow-frame discipline that caused the tech-investing miss
      //     also protected him from the dot-com crash.
      //   - proactive_agency (75, 0.65, s): took control of Berkshire
      //     Hathaway in 1965 by buying up shares after a dispute with
      //     existing management, rather than waiting to be invited.
      //   - belief_updating (85, 0.75, d): explicitly and repeatedly
      //     discussed, in his own shareholder letters and interviews, his
      //     shift from Benjamin Graham's "cigar-butt" cheap-but-mediocre
      //     investing toward "wonderful companies at fair prices" under
      //     Charlie Munger's influence and specific evidence (See's
      //     Candies) — one of the most clearly self-articulated reversals
      //     in the roster.
      //   - resourcefulness: re-tested against the symmetry audit's strict
      //     three-part low-pole test (genuine constraint + viable
      //     substitute existed + demonstrated refusal to adapt) — no
      //     qualifying episode found in either direction. Childhood
      //     entrepreneurial ventures are real but minor next to his
      //     defining adult career, which operates with abundant capital.
      //     Left missing.
      opportunity_sensing: [60, 0.58, "s", "D"],
      proactive_agency: [75, 0.65, "s", "N"],
      belief_updating: [85, 0.75, "d", "A"],
    },
  },
  {
    id: "p_coco_chanel",
    slug: "coco-chanel",
    canonicalName: "Coco Chanel",
    birthYear: 1883,
    deathYear: 1971,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["FR"],
    regionCode: "western_europe",
    occupationIds: ["fashion_designer", "entrepreneur"],
    fieldIds: ["design", "business"],
    impactDomains: ["cultural", "entrepreneurial", "industrial"],
    tagIds: ["founder", "self_taught", "independent"],
    archetypeIds: ["creative_creator", "entrepreneurial_builder"],
    sources: [wiki("chanel", "Coco Chanel")],
    rows: {
      curiosity: [72, 0.55, "s", "N"],
      analytical_rigor: [58, 0.45, "i", "N"],
      intuitive_synthesis: [85, 0.68, "s", "A"],
      systems_abstraction: [55, 0.42, "i", "N"],
      independent_thinking: [92, 0.8, "d", "A"],
      creative_originality: [90, 0.78, "d", "A"],
      experimentation: [78, 0.62, "s", "A"],
      cross_domain_range: [55, 0.42, "i", "N"],
      aesthetic_sensitivity: [96, 0.9, "d", "A"],
      discipline: [82, 0.65, "s", "A"],
      deep_focus: [78, 0.6, "s", "N"],
      detail_orientation: [82, 0.65, "s", "A"],
      perfectionism: [85, 0.68, "s", "D"],
      execution_speed: [75, 0.58, "s", "N"],
      planning_orientation: [62, 0.48, "i", "N"],
      persistence: [90, 0.75, "s", "A"],
      adaptability: [82, 0.65, "s", "A"],
      risk_tolerance: [85, 0.7, "s", "D"],
      ambiguity_tolerance: [72, 0.55, "i", "N"],
      decisiveness: [85, 0.7, "s", "A"],
      social_assertiveness: [82, 0.68, "s", "N"],
      collaboration: [48, 0.5, "s", "N"],
      leadership_drive: [80, 0.65, "s", "A"],
      persuasiveness: [78, 0.62, "s", "A"],
      conflict_tolerance: [78, 0.6, "s", "D"],
      mastery_orientation: [80, 0.62, "s", "A"],
      achievement_drive: [85, 0.68, "s", "N"],
      competitiveness: [78, 0.6, "s", "N"],
      autonomy_need: [92, 0.78, "d", "A"],
      impact_motivation: [72, 0.55, "i", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6, symmetric protocol):
      //   - opportunity_sensing (82, 0.68, s, A) — recognized the post-WWI
      //     shift toward practical, comfortable women's clothing (moving
      //     away from corsetry) and popularized jersey fabric for fashion
      //     before mainstream houses did.
      //   - proactive_agency (75, 0.6, s, A) — bought out her early backer
      //     Boy Capel's financial stake to secure full ownership/control of
      //     her business, a self-directed assertion of independence.
      // resourcefulness deliberately left unscored despite jersey fabric
      // also being cheap/utilitarian at the time: on reflection this is the
      // same underlying episode as opportunity_sensing (one story of
      // adopting an available material for an emerging need), not two
      // independently observable facts — kept out rather than
      // double-counted, per the episode-reuse discipline. belief_updating:
      // no supporting evidence either direction.
      opportunity_sensing: [82, 0.68, "s", "A"],
      proactive_agency: [75, 0.6, "s", "A"],
    },
  },
  {
    id: "p_nikola_tesla",
    slug: "nikola-tesla",
    canonicalName: "Nikola Tesla",
    birthYear: 1856,
    deathYear: 1943,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["RS", "US"],
    regionCode: "central_europe",
    occupationIds: ["inventor", "engineer"],
    fieldIds: ["engineering", "physics"],
    impactDomains: ["technological", "engineering", "innovation"],
    tagIds: ["independent", "poor_business_sense"],
    archetypeIds: ["technical_innovator", "independent_creator"],
    // ROSTER-1000 portrait pilot (2026-08): verified live against the
    // actual Commons file page before being added.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/7/79/Tesla_circa_1890.jpeg",
      width: 940,
      height: 1260,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Tesla_circa_1890.jpeg",
      attribution: "Napoleon Sarony",
    },
    sources: [wiki("tesla", "Nikola Tesla")],
    doNotCopyKeys: ["dontcopy.tesla.commercialisation"],
    rows: {
      curiosity: [95, 0.85, "d", "A"],
      analytical_rigor: [85, 0.7, "s", "A"],
      intuitive_synthesis: [88, 0.72, "s", "A"],
      systems_abstraction: [92, 0.8, "d", "A"],
      independent_thinking: [95, 0.85, "d", "A"],
      creative_originality: [92, 0.8, "d", "A"],
      experimentation: [90, 0.78, "d", "A"],
      cross_domain_range: [62, 0.5, "i", "N"],
      aesthetic_sensitivity: [58, 0.42, "i", "N"],
      discipline: [78, 0.6, "s", "N"],
      deep_focus: [92, 0.8, "d", "A"],
      detail_orientation: [75, 0.58, "s", "N"],
      perfectionism: [80, 0.62, "s", "D"],
      execution_speed: [55, 0.5, "i", "N"],
      planning_orientation: [45, 0.45, "i", "N"],
      persistence: [88, 0.72, "s", "A"],
      adaptability: [55, 0.45, "i", "N"],
      risk_tolerance: [82, 0.68, "s", "D"],
      ambiguity_tolerance: [82, 0.65, "s", "A"],
      decisiveness: [68, 0.5, "i", "N"],
      social_assertiveness: [45, 0.55, "s", "N"],
      collaboration: [30, 0.6, "s", "R"],
      leadership_drive: [42, 0.5, "i", "N"],
      persuasiveness: [40, 0.45, "i", "N"],
      conflict_tolerance: [55, 0.45, "i", "N"],
      mastery_orientation: [90, 0.78, "d", "A"],
      achievement_drive: [72, 0.55, "i", "N"],
      competitiveness: [60, 0.48, "i", "N"],
      autonomy_need: [95, 0.85, "d", "A"],
      impact_motivation: [80, 0.62, "s", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6, symmetric protocol): proactive_
      // agency (72, 0.58, s, N) — left Edison's company after a documented
      // pay dispute over dynamo improvements, then partnered with
      // Westinghouse to champion AC on his own technical conviction against
      // his former employer's competing DC standard — self-directed.
      // opportunity_sensing left unscored: his visionary theoretical grasp
      // (AC transmission, wireless) is already fully captured by his
      // scored creative_originality/independent_thinking/systems_
      // abstraction (all 92-95); scoring it again here would restate the
      // same evidence under a new label. resourcefulness: genuinely
      // considered both directions given his well-documented late-career
      // financial decline — checked for LOW evidence (persisted seeking
      // large-scale ideal funding for Wardenclyffe-type visions rather than
      // scaling ambitions to available means) as well as HIGH (early-career
      // improvisation before Westinghouse backing). Left missing: the
      // record doesn't cleanly separate "wouldn't adapt means" from
      // "was outmaneuvered by financiers/competitors", so neither pole
      // clears the bar with confidence. belief_updating: no evidence either
      // direction.
      proactive_agency: [72, 0.58, "s", "N"],
    },
  },
  {
    id: "p_rosalind_franklin",
    slug: "rosalind-franklin",
    canonicalName: "Rosalind Franklin",
    birthYear: 1920,
    deathYear: 1958,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["chemist", "crystallographer"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific", "medical"],
    tagIds: ["specialist", "detail_oriented"],
    archetypeIds: ["scientific_explorer", "scholarly_specialist"],
    sources: [wiki("rfranklin", "Rosalind Franklin"), bio("rfranklin", "Brenda Maddox, Rosalind Franklin: The Dark Lady of DNA (2002)")],
    // Verified 2026-08 via a direct fetch of the Commons file page: MRC
    // Laboratory of Molecular Biology, from Jennifer Glynn's personal
    // collection, dated 1955. Licensed CC BY-SA 4.0 — reuse permitted with
    // attribution, not public domain.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/9/97/Rosalind_Franklin.jpg",
      width: 521,
      height: 626,
      source: "Wikimedia Commons",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Rosalind_Franklin.jpg",
      attribution: "MRC Laboratory of Molecular Biology / Jennifer Glynn, 1955, CC BY-SA 4.0",
    },
    rows: {
      curiosity: [82, 0.68, "s", "A"],
      analytical_rigor: [95, 0.88, "d", "A"],
      intuitive_synthesis: [55, 0.45, "i", "N"],
      systems_abstraction: [78, 0.62, "s", "N"],
      independent_thinking: [85, 0.75, "s", "A"],
      creative_originality: [68, 0.52, "i", "N"],
      experimentation: [88, 0.75, "d", "A"],
      cross_domain_range: [45, 0.4, "i", "N"],
      aesthetic_sensitivity: [55, 0.42, "i", "N"],
      discipline: [92, 0.8, "d", "A"],
      deep_focus: [92, 0.8, "d", "A"],
      detail_orientation: [96, 0.88, "d", "A"],
      perfectionism: [88, 0.75, "d", "D"],
      execution_speed: [58, 0.48, "i", "N"],
      planning_orientation: [82, 0.65, "s", "A"],
      persistence: [88, 0.72, "s", "A"],
      adaptability: [50, 0.42, "i", "N"],
      risk_tolerance: [50, 0.42, "i", "N"],
      ambiguity_tolerance: [55, 0.42, "i", "N"],
      decisiveness: [68, 0.5, "i", "N"],
      social_assertiveness: [40, 0.55, "s", "N"],
      collaboration: [45, 0.6, "s", "D"],
      leadership_drive: [38, 0.5, "s", "N"],
      persuasiveness: [42, 0.42, "i", "N"],
      conflict_tolerance: [62, 0.5, "s", "N"],
      mastery_orientation: [90, 0.78, "d", "A"],
      achievement_drive: [78, 0.6, "s", "N"],
      competitiveness: [55, 0.42, "i", "N"],
      autonomy_need: [80, 0.65, "s", "A"],
      impact_motivation: [68, 0.5, "i", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6): proactive_agency (62, 0.5,
      // inference, modest confidence) — moved to Paris after WWII
      // specifically to learn X-ray diffraction technique not conveniently
      // available in England, entirely self-directed skill acquisition.
      // opportunity_sensing/resourcefulness/belief_updating left unscored:
      // the DNA-structure race was already widely recognized as important
      // by multiple competing groups, not something she uniquely sensed
      // early; no documented resource-constraint episode (her King's
      // College difficulties were institutional/interpersonal, not
      // material); no documented belief reversal. Overall thin new-trait
      // coverage, consistent with her documented profile (meticulous
      // individual technical execution, already-low collaboration/
      // leadership scores) — flagged for the missing-not-at-random audit.
      proactive_agency: [62, 0.5, "i", "N"],
    },
  },
  {
    id: "p_jane_goodall",
    slug: "jane-goodall",
    canonicalName: "Jane Goodall",
    birthYear: 1934,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["GB"],
    regionCode: "western_europe",
    occupationIds: ["primatologist", "conservationist"],
    fieldIds: ["natural_science"],
    impactDomains: ["scientific", "educational", "social"],
    tagIds: ["field_researcher", "self_taught", "patient"],
    archetypeIds: ["scientific_explorer"],
    sources: [wiki("goodall", "Jane Goodall")],
    // Verified 2026-08 via a direct fetch of the Commons file page: a U.S.
    // Department of State photograph, dated 27 October 2015. Public domain
    // as a US federal government work (17 U.S.C. §105).
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Jane_Goodall_2015.jpg",
      width: 617,
      height: 898,
      source: "Wikimedia Commons",
      license: "Public Domain (US federal government work, US Department of State)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Jane_Goodall_2015.jpg",
      attribution: "U.S. Department of State, 2015",
    },
    rows: {
      curiosity: [92, 0.8, "d", "A"],
      analytical_rigor: [68, 0.55, "s", "N"],
      intuitive_synthesis: [80, 0.62, "s", "A"],
      systems_abstraction: [65, 0.5, "i", "N"],
      independent_thinking: [85, 0.72, "s", "A"],
      creative_originality: [72, 0.55, "s", "N"],
      experimentation: [68, 0.52, "i", "N"],
      cross_domain_range: [55, 0.42, "i", "N"],
      aesthetic_sensitivity: [55, 0.42, "i", "N"],
      discipline: [82, 0.68, "s", "A"],
      deep_focus: [88, 0.75, "s", "A"],
      detail_orientation: [78, 0.6, "s", "N"],
      perfectionism: [55, 0.42, "i", "N"],
      execution_speed: [45, 0.4, "i", "N"],
      planning_orientation: [58, 0.45, "i", "N"],
      persistence: [95, 0.85, "d", "A"],
      adaptability: [85, 0.72, "s", "A"],
      risk_tolerance: [72, 0.58, "s", "N"],
      ambiguity_tolerance: [85, 0.7, "s", "A"],
      decisiveness: [62, 0.48, "i", "N"],
      social_assertiveness: [65, 0.52, "s", "N"],
      collaboration: [78, 0.62, "s", "A"],
      leadership_drive: [65, 0.5, "s", "N"],
      persuasiveness: [78, 0.62, "s", "A"],
      conflict_tolerance: [58, 0.45, "i", "N"],
      mastery_orientation: [82, 0.65, "s", "A"],
      achievement_drive: [65, 0.48, "i", "N"],
      competitiveness: [30, 0.45, "s", "N"],
      autonomy_need: [72, 0.55, "s", "N"],
      impact_motivation: [92, 0.78, "d", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6). Three distinct episodes:
      //   - opportunity_sensing (78, 0.65, s): recognized the significance
      //     of observing a chimp strip a twig to fish for termites —
      //     tool use, directly challenging the "man the toolmaker"
      //     definition — where a less attentive observer might have
      //     dismissed it; distinct from noticing itself (curiosity, already
      //     scored) in that it's specifically about grasping significance.
      //   - resourcefulness (72, 0.58, s): early Gombe fieldwork was
      //     extensively documented as under-resourced — minimal equipment,
      //     no formal training yet, basic field conditions, funded through
      //     Leakey's efforts to find sponsors.
      //   - proactive_agency (70, 0.55, s): later self-directed pivot from
      //     pure research to global conservation advocacy (founding the
      //     Jane Goodall Institute and Roots & Shoots), unprompted by any
      //     employer — a separate episode from the fieldwork years.
      // belief_updating left unscored: no specific documented reversal
      // beyond her already-scored general adaptability.
      opportunity_sensing: [78, 0.65, "s", "A"],
      resourcefulness: [72, 0.58, "s", "A"],
      proactive_agency: [70, 0.55, "s", "A"],
    },
  },
  {
    id: "p_genghis_khan",
    slug: "genghis-khan",
    canonicalName: "Genghis Khan",
    birthYear: 1162,
    deathYear: 1227,
    isLiving: false,
    era: "medieval",
    nationalityCodes: ["MN"],
    regionCode: "central_asia",
    occupationIds: ["military_leader", "political_leader"],
    fieldIds: ["military", "politics"],
    impactDomains: ["historical", "social"],
    tagIds: ["conqueror", "organizer"],
    archetypeIds: ["organizational_leader"],
    sources: [wiki("genghiskhan", "Genghis Khan")],
    doNotCopyKeys: ["dontcopy.genghiskhan.ruthlessness"],
    rows: {
      analytical_rigor: [65, 0.5, "s", "N"],
      systems_abstraction: [78, 0.58, "s", "A"],
      independent_thinking: [80, 0.6, "s", "A"],
      discipline: [85, 0.62, "s", "A"],
      execution_speed: [82, 0.6, "s", "A"],
      planning_orientation: [82, 0.62, "s", "A"],
      persistence: [90, 0.68, "s", "A"],
      adaptability: [85, 0.65, "s", "A"],
      risk_tolerance: [92, 0.7, "s", "D"],
      ambiguity_tolerance: [78, 0.58, "s", "N"],
      decisiveness: [92, 0.7, "s", "A"],
      social_assertiveness: [80, 0.58, "s", "N"],
      collaboration: [55, 0.5, "s", "N"],
      leadership_drive: [96, 0.72, "d", "A"],
      persuasiveness: [82, 0.6, "s", "A"],
      conflict_tolerance: [95, 0.72, "d", "D"],
      achievement_drive: [88, 0.62, "s", "N"],
      competitiveness: [90, 0.65, "s", "D"],
      autonomy_need: [78, 0.55, "s", "N"],
      impact_motivation: [90, 0.65, "s", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6): early unification exploited
      // shifting tribal alliances (Merkit/Tatar/Kerait/Naiman) at a specific
      // fragile political moment — recognizing which openings to act on
      // before committing, distinct from adaptability (already scored),
      // which covers adjusting an already-chosen course. proactive_agency:
      // rebuilt alliances and pursued unification entirely on his own
      // initiative after his clan abandoned him following his father's
      // death — no inherited authority or assigned role at that stage.
      // resourcefulness and belief_updating left unscored: the "lean
      // logistics" of Mongol campaigning is a structural/institutional
      // credit (already reflected in systems_abstraction/planning_
      // orientation), not a specific personal episode of improvising under
      // constraint; adoption of foreign siege technology after early
      // failures reads as strategic adaptation (already scored), not a
      // documented reversal of an articulated belief.
      opportunity_sensing: [75, 0.55, "s", "A"],
      proactive_agency: [90, 0.62, "s", "D"],
    },
  },
  {
    id: "p_ibn_khaldun",
    slug: "ibn-khaldun",
    canonicalName: "Ibn Khaldun",
    // Full Arabic name verified 2026-08 via web search, not guessed:
    // ابو زيد عبد الرحمن بن محمد بن خلدون الحضرمي.
    aliases: ["Abd al-Rahman ibn Khaldun", "ابو زيد عبد الرحمن بن محمد بن خلدون الحضرمي", "이븐 할둔"],
    birthYear: 1332,
    deathYear: 1406,
    isLiving: false,
    era: "medieval",
    nationalityCodes: ["TN", "EG"],
    regionCode: "north_africa",
    // He lived under several polities (Hafsid Tunis, Marinid Fez, Nasrid
    // Granada) before settling in Cairo for his last ~24 years — the
    // Mamluk Sultanate is his longest and most consequential, not a claim
    // that it was the only one.
    historicalPolityKey: "polity.mamluk_sultanate",
    occupationIds: ["historian", "philosopher", "jurist"],
    fieldIds: ["history", "sociology", "philosophy"],
    impactDomains: ["historical", "educational"],
    tagIds: ["cross_disciplinary", "systematic_thinker", "administrator"],
    archetypeIds: ["cross_disciplinary_generalist", "scientific_explorer"],
    externalIdentity: {
      wikidataId: "Q9294",
      wikipediaUrls: {
        "en-US": "https://en.wikipedia.org/wiki/Ibn_Khaldun",
        "ko-KR": "https://ko.wikipedia.org/wiki/이븐_할둔",
      },
    },
    sources: [
      wiki("ibnkhaldun", "Ibn Khaldun"),
      bio("ibnkhaldun", "Ibn Khaldun, The Muqaddimah (1377), trans. Franz Rosenthal (1958)"),
    ],
    rows: {
      // Evidence base: his own autobiography (At-Ta'rif) plus the Muqaddimah
      // itself and the historical record of his court/judicial career —
      // unusually rich for a medieval figure, but still interpreted history,
      // not modern documentation. 20 of 30 scored, same discipline as the
      // rest of this era cohort: deliberately fewer rather than diluted.
      curiosity: [86, 0.65, "s", "A"],
      analytical_rigor: [90, 0.7, "s", "A"],
      systems_abstraction: [92, 0.7, "d", "A"],
      independent_thinking: [88, 0.65, "s", "A"],
      cross_domain_range: [90, 0.68, "d", "A"],
      discipline: [85, 0.6, "s", "A"],
      deep_focus: [85, 0.62, "s", "A"],
      persistence: [85, 0.62, "s", "A"],
      adaptability: [85, 0.6, "s", "D"],
      risk_tolerance: [72, 0.55, "s", "D"],
      ambiguity_tolerance: [75, 0.55, "s", "A"],
      planning_orientation: [72, 0.5, "i", "A"],
      social_assertiveness: [75, 0.52, "i", "A"],
      leadership_drive: [72, 0.55, "s", "D"],
      persuasiveness: [80, 0.58, "s", "A"],
      conflict_tolerance: [78, 0.55, "s", "A"],
      autonomy_need: [65, 0.5, "i", "N"],
      achievement_drive: [82, 0.55, "s", "A"],
      mastery_orientation: [82, 0.58, "s", "A"],
      impact_motivation: [85, 0.6, "d", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6): opportunity_sensing —
      // documented directly by the Muqaddimah itself (a "d"-tier source, not
      // inference): its asabiyyah framework systematizes a cyclical pattern
      // in dynastic rise/fall that prior historians hadn't recognized,
      // beyond generic curiosity (already scored). proactive_agency —
      // repeatedly switched patrons/positions across Fez/Granada/Tunis/Cairo
      // on his own judgment, and the retreat to Qalat Ibn Salama to write
      // was self-initiated, not commissioned; marked dual-edged like his
      // already-scored leadership_drive/adaptability, since the same
      // pattern produced both his masterwork and real career instability.
      // resourcefulness REMOVED (symmetry audit, 2026-08; was 78, s, A) —
      // re-opened and tested against the strict two-part requirement
      // (actual resource constraint AND documented improvisation/
      // substitution/recombination of available means). The Qalat Ibn
      // Salama episode gives only: he withdrew to a remote location, and he
      // wrote a major work there. Working largely from memory/prior
      // synthesis rather than his usual library access is a plausible
      // INFERENCE about method, not a specifically documented act of
      // substitution — and the episode is at least as well explained by
      // deliberate withdrawal for uninterrupted independent scholarship
      // (already reflected in his scored deep_focus 85, discipline 85,
      // independent_thinking 88) as by resourcefulness specifically. Not
      // retained merely to preserve coverage or eligibility — re-run and
      // confirmed he remains comfortably eligible without it (see Stage 5
      // audit). belief_updating left unscored: his career redirection reads
      // as strategic (already covered by proactive_agency/adaptability),
      // not a documented reversal of a specific articulated belief.
      opportunity_sensing: [88, 0.65, "d", "A"],
      proactive_agency: [80, 0.6, "s", "D"],
    },
  },
  {
    id: "p_wangari_maathai",
    slug: "wangari-maathai",
    canonicalName: "Wangari Maathai",
    birthYear: 1940,
    deathYear: 2011,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["KE"],
    regionCode: "sub_saharan_africa",
    occupationIds: ["environmentalist", "political_activist"],
    fieldIds: ["environmental_science", "civil_rights"],
    impactDomains: ["social", "scientific", "historical"],
    tagIds: ["nobel_laureate", "founder", "grassroots_organizer"],
    archetypeIds: ["organizational_leader", "social_influencer"],
    // Verified 2026-08 via a direct fetch of the Commons file page. Lifetime
    // photograph (2006 interview, Salvador, Brazil) — not a posed portrait,
    // but a real likeness with a clean, unambiguous license.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Wangari_Maathai%2C_2006_%28cropped%29.jpg",
      width: 1360,
      height: 1923,
      source: "Wikimedia Commons",
      license: "CC BY 3.0 BR",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Wangari_Maathai,_2006_(cropped).jpg",
      attribution: "Antônio Cruz/Agência Brasil",
    },
    sources: [wiki("maathai", "Wangari Maathai")],
    rows: {
      curiosity: [70, 0.55, "s", "N"],
      analytical_rigor: [72, 0.55, "s", "N"],
      systems_abstraction: [75, 0.58, "s", "A"],
      independent_thinking: [85, 0.7, "s", "A"],
      creative_originality: [70, 0.55, "s", "N"],
      experimentation: [62, 0.48, "i", "N"],
      cross_domain_range: [58, 0.45, "i", "N"],
      discipline: [85, 0.7, "s", "A"],
      deep_focus: [72, 0.55, "s", "N"],
      planning_orientation: [78, 0.6, "s", "A"],
      persistence: [95, 0.82, "d", "A"],
      adaptability: [82, 0.65, "s", "A"],
      risk_tolerance: [78, 0.6, "s", "D"],
      ambiguity_tolerance: [75, 0.58, "s", "A"],
      decisiveness: [78, 0.6, "s", "A"],
      social_assertiveness: [82, 0.65, "s", "N"],
      collaboration: [88, 0.72, "s", "A"],
      leadership_drive: [88, 0.72, "s", "A"],
      persuasiveness: [85, 0.68, "s", "A"],
      conflict_tolerance: [82, 0.65, "s", "D"],
      mastery_orientation: [68, 0.5, "i", "N"],
      achievement_drive: [78, 0.6, "s", "N"],
      competitiveness: [42, 0.42, "i", "N"],
      autonomy_need: [70, 0.55, "s", "N"],
      impact_motivation: [95, 0.82, "d", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6, symmetric protocol). Three
      // distinct episodes:
      //   - opportunity_sensing (75, 0.6, s): connected deforestation/soil
      //     erosion/water scarcity to rural women's daily burden (fetching
      //     water/firewood) — unifying environmentalism and grassroots
      //     welfare in a way that wasn't the standard framing at the time;
      //     distinct from her comparatively low cross_domain_range (58).
      //   - resourcefulness (72, 0.58, s): the Green Belt Movement's early
      //     years organized rural women to plant seedlings via simple,
      //     low-cost local methods without significant institutional
      //     funding.
      //   - proactive_agency (82, 0.68, s, D): founded the Green Belt
      //     Movement in 1977 entirely self-initiated, often working against
      //     an actively opposed government (arrests, documented violence
      //     against her) — dual-edged given the direct personal cost.
      // belief_updating: no supporting evidence either direction.
      opportunity_sensing: [75, 0.6, "s", "A"],
      resourcefulness: [72, 0.58, "s", "A"],
      proactive_agency: [82, 0.68, "s", "D"],
    },
  },
  {
    id: "p_malala_yousafzai",
    slug: "malala-yousafzai",
    canonicalName: "Malala Yousafzai",
    birthYear: 1997,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["PK"],
    regionCode: "south_asia",
    occupationIds: ["activist"],
    fieldIds: ["education", "civil_rights"],
    impactDomains: ["social", "educational"],
    tagIds: ["nobel_laureate", "young_leader"],
    archetypeIds: ["social_influencer"],
    sources: [wiki("malala", "Malala Yousafzai")],
    rows: {
      curiosity: [68, 0.55, "s", "N"],
      analytical_rigor: [62, 0.48, "i", "N"],
      independent_thinking: [82, 0.68, "s", "A"],
      creative_originality: [55, 0.42, "i", "N"],
      discipline: [75, 0.58, "s", "N"],
      deep_focus: [65, 0.48, "i", "N"],
      planning_orientation: [62, 0.48, "i", "N"],
      persistence: [90, 0.75, "s", "A"],
      adaptability: [80, 0.65, "s", "A"],
      risk_tolerance: [85, 0.72, "s", "D"],
      ambiguity_tolerance: [72, 0.55, "s", "N"],
      decisiveness: [72, 0.55, "s", "N"],
      social_assertiveness: [85, 0.7, "s", "N"],
      collaboration: [72, 0.55, "s", "N"],
      leadership_drive: [78, 0.62, "s", "A"],
      persuasiveness: [88, 0.72, "s", "A"],
      conflict_tolerance: [78, 0.62, "s", "D"],
      achievement_drive: [72, 0.55, "s", "N"],
      competitiveness: [45, 0.4, "i", "N"],
      autonomy_need: [65, 0.48, "i", "N"],
      impact_motivation: [92, 0.78, "d", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6, symmetric protocol):
      // proactive_agency (78, 0.62, s, D) — began an anonymous BBC Urdu
      // blog about life under Taliban rule at age 11, self-initiated (with
      // her father's encouragement but the act itself her own), well before
      // any resulting fame — the clearest severe-personal-cost dual-edged
      // case in the roster, since this specific act led directly to the
      // attack on her. opportunity_sensing/resourcefulness/belief_updating:
      // checked against both poles, no qualifying episode either direction.
      proactive_agency: [78, 0.62, "s", "D"],
    },
  },
  {
    id: "p_bruce_lee",
    slug: "bruce-lee",
    canonicalName: "Bruce Lee",
    birthYear: 1940,
    deathYear: 1973,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["HK", "US"],
    regionCode: "east_asia",
    occupationIds: ["martial_artist", "actor", "philosopher"],
    fieldIds: ["martial_arts", "film"],
    impactDomains: ["athletic", "cultural"],
    tagIds: ["cross_disciplinary", "founder"],
    archetypeIds: ["independent_creator", "competitive_performer"],
    sources: [wiki("brucelee", "Bruce Lee")],
    rows: {
      curiosity: [78, 0.6, "s", "N"],
      analytical_rigor: [72, 0.55, "s", "N"],
      intuitive_synthesis: [82, 0.62, "s", "A"],
      systems_abstraction: [80, 0.6, "s", "A"],
      independent_thinking: [92, 0.78, "d", "A"],
      creative_originality: [88, 0.72, "s", "A"],
      experimentation: [88, 0.72, "s", "A"],
      cross_domain_range: [78, 0.6, "s", "A"],
      aesthetic_sensitivity: [70, 0.52, "i", "N"],
      discipline: [95, 0.85, "d", "A"],
      deep_focus: [92, 0.78, "s", "A"],
      detail_orientation: [82, 0.65, "s", "N"],
      perfectionism: [88, 0.72, "s", "D"],
      execution_speed: [80, 0.62, "s", "A"],
      planning_orientation: [68, 0.5, "i", "N"],
      persistence: [92, 0.78, "s", "A"],
      adaptability: [85, 0.68, "s", "A"],
      risk_tolerance: [78, 0.6, "s", "N"],
      ambiguity_tolerance: [70, 0.52, "i", "N"],
      decisiveness: [82, 0.65, "s", "A"],
      social_assertiveness: [82, 0.65, "s", "N"],
      collaboration: [55, 0.48, "i", "N"],
      leadership_drive: [78, 0.6, "s", "A"],
      persuasiveness: [80, 0.62, "s", "A"],
      conflict_tolerance: [70, 0.52, "i", "N"],
      mastery_orientation: [95, 0.82, "d", "A"],
      achievement_drive: [88, 0.72, "s", "N"],
      competitiveness: [82, 0.65, "s", "N"],
      autonomy_need: [88, 0.72, "s", "A"],
      impact_motivation: [78, 0.6, "s", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6, symmetric protocol):
      //   - opportunity_sensing (75, 0.6, s) — recognized limitations in
      //     traditional, rigid martial arts styles ahead of most
      //     contemporaries, anticipating later mixed-martial-arts thinking
      //     by decades; distinct from creative_originality/independent_
      //     thinking (already scored) in that it's specifically about
      //     perceiving a gap in the field, not just producing something
      //     original.
      //   - proactive_agency (72, 0.55, s, D) — founded his own schools and
      //     style (Jeet Kune Do) unprompted, and specifically taught
      //     non-Chinese students against the traditional martial arts
      //     community's norms — documented friction/backlash resulted.
      // resourcefulness/belief_updating: checked against both poles, no
      // qualifying episode either direction.
      opportunity_sensing: [75, 0.6, "s", "A"],
      proactive_agency: [72, 0.55, "s", "D"],
    },
  },
  {
    id: "p_ramanujan",
    slug: "srinivasa-ramanujan",
    canonicalName: "Srinivasa Ramanujan",
    birthYear: 1887,
    deathYear: 1920,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["IN"],
    regionCode: "south_asia",
    occupationIds: ["mathematician"],
    fieldIds: ["mathematics"],
    impactDomains: ["scientific"],
    tagIds: ["self_taught", "specialist", "intuitive"],
    archetypeIds: ["scholarly_specialist", "scientific_explorer"],
    // ROSTER-1000 portrait pilot (2026-08): verified live against the
    // actual Commons file page before being added.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Srinivasa_Ramanujan_-_OPC_-_1.jpg",
      width: 960,
      height: 1315,
      source: "Wikimedia Commons",
      license: "Public Domain",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Srinivasa_Ramanujan_-_OPC_-_1.jpg",
      attribution: "Oberwolfach Photo Collection",
    },
    sources: [wiki("ramanujan", "Srinivasa Ramanujan")],
    rows: {
      curiosity: [88, 0.72, "s", "A"],
      analytical_rigor: [78, 0.6, "s", "N"],
      intuitive_synthesis: [98, 0.88, "d", "A"],
      systems_abstraction: [92, 0.8, "d", "A"],
      independent_thinking: [90, 0.78, "d", "A"],
      creative_originality: [90, 0.78, "d", "A"],
      experimentation: [60, 0.48, "i", "N"],
      cross_domain_range: [35, 0.4, "i", "N"],
      aesthetic_sensitivity: [65, 0.5, "i", "N"],
      discipline: [70, 0.55, "s", "N"],
      deep_focus: [95, 0.85, "d", "A"],
      detail_orientation: [55, 0.45, "i", "N"],
      perfectionism: [55, 0.42, "i", "N"],
      execution_speed: [45, 0.42, "i", "N"],
      planning_orientation: [30, 0.45, "s", "N"],
      persistence: [90, 0.75, "s", "A"],
      adaptability: [45, 0.4, "i", "N"],
      risk_tolerance: [55, 0.42, "i", "N"],
      ambiguity_tolerance: [88, 0.7, "s", "A"],
      decisiveness: [55, 0.4, "i", "N"],
      social_assertiveness: [30, 0.55, "s", "N"],
      collaboration: [42, 0.55, "s", "N"],
      leadership_drive: [25, 0.55, "s", "N"],
      persuasiveness: [35, 0.4, "i", "N"],
      conflict_tolerance: [40, 0.4, "i", "N"],
      mastery_orientation: [95, 0.82, "d", "A"],
      achievement_drive: [62, 0.45, "i", "N"],
      competitiveness: [35, 0.4, "i", "N"],
      autonomy_need: [82, 0.65, "s", "A"],
      impact_motivation: [55, 0.42, "i", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6, symmetric protocol):
      //   - resourcefulness (88, 0.7, s, A) — as a poor, self-taught
      //     mathematician in colonial India with no access to advanced
      //     mathematical literature, reconstructed and extended vast areas
      //     of mathematics using essentially one outdated textbook (G.S.
      //     Carr's Synopsis) — a severe, genuine resource constraint met by
      //     independent reconstruction from what little was available.
      //   - proactive_agency (78, 0.65, s, A) — wrote unprompted, with no
      //     formal credentials or introduction, directly to G.H. Hardy at
      //     Cambridge (and several other mathematicians before him, mostly
      //     ignored), sending his own derived results.
      // opportunity_sensing/belief_updating: no supporting evidence either
      // direction — his profile is centrally about intuitive mathematical
      // insight (already captured) and deep focus, not environmental
      // scanning or documented belief revision.
      resourcefulness: [88, 0.7, "s", "A"],
      proactive_agency: [78, 0.65, "s", "A"],
    },
  },
  {
    id: "p_toni_morrison",
    slug: "toni-morrison",
    canonicalName: "Toni Morrison",
    birthYear: 1931,
    deathYear: 2019,
    isLiving: false,
    era: "contemporary",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["writer", "editor"],
    fieldIds: ["literature"],
    impactDomains: ["literary", "cultural"],
    tagIds: ["nobel_laureate", "independent"],
    archetypeIds: ["creative_creator", "independent_creator"],
    // Verified 2026-08 via a direct fetch of the Commons file page. Lifetime
    // photograph, 1998.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Toni_Morrison.jpg",
      width: 1540,
      height: 2195,
      source: "Wikimedia Commons",
      license: "CC BY-SA 2.0",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Toni_Morrison.jpg",
      attribution: "John Mathew Smith",
    },
    sources: [wiki("morrison", "Toni Morrison")],
    rows: {
      curiosity: [82, 0.65, "s", "A"],
      analytical_rigor: [78, 0.6, "s", "N"],
      intuitive_synthesis: [88, 0.72, "s", "A"],
      systems_abstraction: [72, 0.55, "s", "N"],
      independent_thinking: [92, 0.8, "d", "A"],
      creative_originality: [95, 0.85, "d", "A"],
      experimentation: [80, 0.65, "s", "A"],
      cross_domain_range: [55, 0.45, "i", "N"],
      aesthetic_sensitivity: [92, 0.8, "d", "A"],
      discipline: [85, 0.68, "s", "A"],
      deep_focus: [88, 0.72, "s", "A"],
      detail_orientation: [78, 0.6, "s", "N"],
      perfectionism: [80, 0.62, "s", "D"],
      execution_speed: [55, 0.45, "i", "N"],
      planning_orientation: [62, 0.48, "i", "N"],
      persistence: [88, 0.72, "s", "A"],
      adaptability: [68, 0.52, "i", "N"],
      risk_tolerance: [65, 0.5, "i", "N"],
      ambiguity_tolerance: [80, 0.62, "s", "A"],
      decisiveness: [68, 0.5, "i", "N"],
      social_assertiveness: [68, 0.52, "i", "N"],
      collaboration: [62, 0.48, "i", "N"],
      leadership_drive: [58, 0.45, "i", "N"],
      persuasiveness: [78, 0.6, "s", "A"],
      conflict_tolerance: [72, 0.55, "s", "N"],
      mastery_orientation: [85, 0.68, "s", "A"],
      achievement_drive: [72, 0.55, "i", "N"],
      competitiveness: [48, 0.42, "i", "N"],
      autonomy_need: [85, 0.68, "s", "A"],
      impact_motivation: [85, 0.68, "s", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6, symmetric protocol): proactive_
      // agency (65, 0.5, i, A), modest confidence — as a Random House
      // editor, proactively championed and acquired works by Black authors
      // (e.g. Toni Cade Bambara, Gayl Jones) that mainstream publishing
      // wasn't prioritizing, beyond her formally assigned editorial duties.
      // resourcefulness considered (writing her early novels in stolen
      // early-morning hours as a working single mother) and left unscored:
      // that is better characterized as discipline/persistence (already
      // scored) than resourcefulness's specific means-substitution
      // definition. opportunity_sensing/belief_updating: no supporting
      // evidence either direction.
      proactive_agency: [65, 0.5, "i", "A"],
    },
  },
  {
    id: "p_akira_kurosawa",
    slug: "akira-kurosawa",
    canonicalName: "Akira Kurosawa",
    birthYear: 1910,
    deathYear: 1998,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["JP"],
    regionCode: "east_asia",
    occupationIds: ["film_director"],
    fieldIds: ["film"],
    impactDomains: ["artistic", "cultural"],
    tagIds: ["perfectionist", "leader"],
    archetypeIds: ["creative_creator", "organizational_leader"],
    sources: [wiki("kurosawa", "Akira Kurosawa")],
    rows: {
      curiosity: [78, 0.6, "s", "N"],
      analytical_rigor: [75, 0.58, "s", "N"],
      intuitive_synthesis: [82, 0.65, "s", "A"],
      systems_abstraction: [72, 0.55, "s", "N"],
      independent_thinking: [88, 0.72, "s", "A"],
      creative_originality: [92, 0.78, "d", "A"],
      experimentation: [72, 0.55, "s", "N"],
      cross_domain_range: [55, 0.42, "i", "N"],
      aesthetic_sensitivity: [96, 0.85, "d", "A"],
      discipline: [90, 0.75, "s", "A"],
      deep_focus: [90, 0.75, "s", "A"],
      detail_orientation: [92, 0.78, "d", "A"],
      perfectionism: [95, 0.85, "d", "D"],
      execution_speed: [48, 0.5, "s", "D"],
      planning_orientation: [78, 0.6, "s", "A"],
      persistence: [90, 0.75, "s", "A"],
      adaptability: [62, 0.48, "i", "N"],
      risk_tolerance: [65, 0.5, "i", "N"],
      ambiguity_tolerance: [58, 0.45, "i", "N"],
      decisiveness: [82, 0.65, "s", "A"],
      social_assertiveness: [72, 0.55, "s", "N"],
      collaboration: [58, 0.5, "s", "N"],
      leadership_drive: [88, 0.72, "s", "D"],
      persuasiveness: [72, 0.55, "s", "N"],
      conflict_tolerance: [78, 0.6, "s", "D"],
      mastery_orientation: [88, 0.72, "s", "A"],
      achievement_drive: [80, 0.62, "s", "N"],
      competitiveness: [65, 0.5, "i", "N"],
      autonomy_need: [82, 0.65, "s", "A"],
      impact_motivation: [72, 0.55, "i", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6, symmetric protocol): all four new
      // attributes checked against both poles and left missing — a genuine
      // null result, not a skipped check. resourcefulness specifically
      // considered via his 1970s career crisis (Dodesukaden's commercial
      // failure, Soviet rather than Japanese funding for Dersu Uzala) and
      // his famously exacting production demands even under budget
      // pressure — both rejected: the former is external rescue, not his
      // own improvisation; the latter is his already-scored perfectionism
      // (95, D) restated, exactly the confound this audit is checking for,
      // not a distinct resourcefulness-low episode.
    },
  },
  {
    id: "p_benjamin_franklin",
    slug: "benjamin-franklin",
    canonicalName: "Benjamin Franklin",
    birthYear: 1706,
    deathYear: 1790,
    isLiving: false,
    era: "early_modern",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["statesman", "scientist", "inventor", "writer"],
    fieldIds: ["politics", "natural_science", "diplomacy"],
    impactDomains: ["historical", "scientific", "engineering", "entrepreneurial"],
    tagIds: ["generalist", "self_taught", "founder"],
    archetypeIds: ["cross_disciplinary_generalist", "entrepreneurial_builder"],
    // Key Achievements Correction Batch 1 (2026-08): two additional
    // Wikipedia articles, each directly fetched and inspected, close
    // specific claims (the kite experiment's actual mechanism and date; the
    // 1778 Treaty of Alliance's terms and signatories) the general
    // biography article doesn't itself state in enough detail.
    sources: [
      wiki("bfranklin", "Benjamin Franklin"),
      bio("bfranklin", "Walter Isaacson, Benjamin Franklin: An American Life (2003)"),
      wiki("bfranklin_kite", "Kite experiment"),
      wiki("bfranklin_treaty", "Treaty of Alliance (1778)"),
    ],
    // Verified 2026-08 via a direct fetch of the Commons file page: Joseph-
    // Siffred Duplessis's c. 1785 oil portrait. Public domain (published
    // before 1931; artist died 1802).
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/2/25/Benjamin_Franklin_by_Joseph_Duplessis_1778.jpg",
      width: 5679,
      height: 6992,
      source: "Wikimedia Commons",
      license: "Public Domain (published before 1931; artist died 1802)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Benjamin_Franklin_by_Joseph_Duplessis_1778.jpg",
      attribution: "Joseph-Siffred Duplessis, c. 1785",
    },
    rows: {
      curiosity: [95, 0.82, "d", "A"],
      analytical_rigor: [80, 0.65, "s", "N"],
      intuitive_synthesis: [72, 0.55, "s", "N"],
      systems_abstraction: [78, 0.6, "s", "A"],
      independent_thinking: [85, 0.7, "s", "A"],
      creative_originality: [82, 0.65, "s", "A"],
      experimentation: [90, 0.78, "d", "A"],
      cross_domain_range: [95, 0.85, "d", "A"],
      aesthetic_sensitivity: [55, 0.42, "i", "N"],
      discipline: [85, 0.68, "s", "A"],
      deep_focus: [68, 0.52, "i", "N"],
      detail_orientation: [70, 0.55, "s", "N"],
      perfectionism: [55, 0.42, "i", "N"],
      execution_speed: [78, 0.6, "s", "A"],
      planning_orientation: [75, 0.58, "s", "A"],
      persistence: [85, 0.68, "s", "A"],
      adaptability: [88, 0.72, "s", "A"],
      risk_tolerance: [68, 0.52, "i", "N"],
      ambiguity_tolerance: [78, 0.6, "s", "A"],
      decisiveness: [75, 0.58, "s", "N"],
      social_assertiveness: [85, 0.7, "s", "N"],
      collaboration: [78, 0.6, "s", "A"],
      leadership_drive: [72, 0.55, "s", "N"],
      persuasiveness: [88, 0.72, "s", "A"],
      conflict_tolerance: [65, 0.5, "i", "N"],
      mastery_orientation: [72, 0.55, "i", "N"],
      achievement_drive: [82, 0.65, "s", "N"],
      competitiveness: [62, 0.48, "i", "N"],
      autonomy_need: [72, 0.55, "s", "N"],
      impact_motivation: [80, 0.62, "s", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6). Four distinct episodes — one of
      // the most extensively documented people in the roster (own
      // Autobiography), no reuse concern:
      //   - opportunity_sensing (85, 0.7, s): the 1754 Albany Plan of
      //     Union — proposed unified colonial governance decades before
      //     independence, reading a structural need others hadn't yet
      //     judged urgent (rejected at the time, seen historically as
      //     prescient).
      //   - resourcefulness (78, 0.65, s): arrived in Philadelphia
      //     essentially penniless after leaving his Boston apprenticeship,
      //     built his printing business from very little (his own
      //     Autobiography).
      //   - proactive_agency (88, 0.75, d): founded the Junto, the Library
      //     Company of Philadelphia, a volunteer fire department, and the
      //     American Philosophical Society — self-initiated civic
      //     institutions, none commissioned by any authority, a pattern his
      //     own Autobiography emphasizes directly.
      //   - belief_updating (78, 0.65, s): long a loyalist seeking
      //     reconciliation with Britain, shifted to supporting independence
      //     only after direct evidence of the Crown's intransigence
      //     (notably the 1774 "Cockpit" hearing humiliation and repeated
      //     failed reconciliation efforts) — a specific, documented
      //     political reversal under evidence, not a single event but a
      //     tracked change over time.
      opportunity_sensing: [85, 0.7, "s", "A"],
      resourcefulness: [78, 0.65, "s", "A"],
      proactive_agency: [88, 0.75, "d", "A"],
      belief_updating: [78, 0.65, "s", "A"],
    },
  },
  {
    id: "p_zheng_he",
    slug: "zheng-he",
    canonicalName: "Zheng He",
    aliases: ["郑和", "鄭和", "Ma He", "马和", "정화"],
    birthYear: 1371,
    deathYear: 1433,
    isLiving: false,
    era: "medieval",
    nationalityCodes: ["CN"],
    regionCode: "east_asia",
    historicalPolityKey: "polity.ming_dynasty",
    occupationIds: ["admiral", "diplomat"],
    fieldIds: ["exploration", "military"],
    impactDomains: ["historical", "engineering"],
    tagIds: ["explorer", "organizer"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: {
      wikidataId: "Q7333",
      wikipediaUrls: {
        "en-US": "https://en.wikipedia.org/wiki/Zheng_He",
        "ko-KR": "https://ko.wikipedia.org/wiki/정화_(명나라)",
      },
    },
    sources: [wiki("zhenghe", "Zheng He")],
    rows: {
      systems_abstraction: [78, 0.6, "s", "A"],
      independent_thinking: [68, 0.55, "s", "N"],
      discipline: [85, 0.65, "s", "A"],
      planning_orientation: [88, 0.68, "s", "A"],
      persistence: [85, 0.65, "s", "A"],
      adaptability: [82, 0.62, "s", "A"],
      risk_tolerance: [80, 0.62, "s", "N"],
      ambiguity_tolerance: [78, 0.6, "s", "A"],
      decisiveness: [82, 0.62, "s", "A"],
      social_assertiveness: [68, 0.52, "s", "N"],
      collaboration: [75, 0.6, "s", "N"],
      leadership_drive: [85, 0.65, "s", "A"],
      persuasiveness: [72, 0.55, "s", "N"],
      conflict_tolerance: [62, 0.5, "i", "N"],
      achievement_drive: [78, 0.6, "s", "N"],
      competitiveness: [55, 0.48, "i", "N"],
      autonomy_need: [60, 0.5, "i", "N"],
      impact_motivation: [75, 0.58, "s", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6) — Zheng He hard gate: ALL FOUR
      // new attributes left unscored, deliberately, after individual
      // consideration of each (not a blanket skip):
      //   - opportunity_sensing: the strategic decision to engage the
      //     Indian Ocean world was the Yongle Emperor's, not demonstrably
      //     Zheng He's own — an attribution problem, not merely thin
      //     evidence.
      //   - resourcefulness: considered and REJECTED on reflection. The
      //     treasure fleets were one of the best-funded state naval efforts
      //     in pre-modern history — the opposite of the resource
      //     constraint this trait requires. Scoring it would conflate
      //     "large complex operation" with "improvising under scarcity".
      //   - proactive_agency: all seven voyages were direct imperial
      //     commissions — the cleanest assigned-not-self-initiated case in
      //     the roster. Left missing rather than inferring a LOW score:
      //     an assigned formal role doesn't tell us his personal
      //     disposition when latitude existed, and no specific evidence
      //     either way survives.
      //   - belief_updating: surviving sources (Ming court/administrative
      //     records, his own commemorative inscriptions) are administrative
      //     and factual, not reflective — no basis to infer a reversed
      //     position either way.
      // This is expected to leave him below the taxonomy_v1.1 coverage
      // floor; see docs/phase6.6-taxonomy-v1.1-implementation.md for the
      // resulting eligibility determination. Not engineered around.
    },
  },
  {
    id: "p_rumi",
    slug: "rumi",
    canonicalName: "Jalal ad-Din Muhammad Rumi",
    birthYear: 1207,
    deathYear: 1273,
    isLiving: false,
    era: "medieval",
    nationalityCodes: ["IR"],
    regionCode: "west_asia",
    occupationIds: ["poet", "theologian"],
    fieldIds: ["literature", "philosophy"],
    impactDomains: ["literary", "cultural", "historical"],
    tagIds: ["mystic", "specialist"],
    archetypeIds: ["independent_creator"],
    sources: [wiki("rumi", "Rumi")],
    rows: {
      intuitive_synthesis: [95, 0.68, "s", "A"],
      independent_thinking: [85, 0.62, "s", "A"],
      creative_originality: [90, 0.65, "s", "A"],
      aesthetic_sensitivity: [92, 0.68, "s", "A"],
      discipline: [72, 0.55, "s", "N"],
      deep_focus: [85, 0.6, "s", "A"],
      execution_speed: [40, 0.5, "i", "N"],
      planning_orientation: [30, 0.5, "i", "N"],
      persistence: [78, 0.58, "s", "N"],
      ambiguity_tolerance: [90, 0.65, "s", "A"],
      social_assertiveness: [55, 0.48, "i", "N"],
      collaboration: [50, 0.48, "i", "N"],
      leadership_drive: [45, 0.48, "i", "N"],
      persuasiveness: [78, 0.58, "s", "A"],
      conflict_tolerance: [45, 0.45, "i", "N"],
      mastery_orientation: [80, 0.58, "s", "N"],
      competitiveness: [20, 0.55, "s", "N"],
      autonomy_need: [82, 0.6, "s", "A"],
      impact_motivation: [72, 0.55, "s", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6): proactive_agency — after meeting
      // Shams-e Tabrizi, abandoned his formal jurist/professorial role
      // (self-directed, not requested; reportedly disruptive to his
      // students and family per Sultan Walad's near-contemporary account).
      // belief_updating — the single strongest case in this batch: the
      // post-Shams reorientation from formal legal/scholarly religious
      // authority toward direct mystical experience is the repeatedly
      // attested narrative core of his biography, not a peripheral detail,
      // and his own poetry extensively reflects on the change itself.
      // opportunity_sensing and resourcefulness left unscored: the Shams
      // encounter is a relational/spiritual transformation, not documented
      // environmental scanning; he inherited an established scholarly
      // position (his father was a respected theologian) rather than
      // facing evidenced material constraint requiring improvisation.
      proactive_agency: [68, 0.52, "s", "D"],
      belief_updating: [75, 0.55, "s", "A"],
    },
  },
  {
    id: "p_oprah_winfrey",
    slug: "oprah-winfrey",
    canonicalName: "Oprah Winfrey",
    birthYear: 1954,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["media_executive", "entertainer"],
    fieldIds: ["media", "business"],
    impactDomains: ["cultural", "entrepreneurial", "social"],
    tagIds: ["founder", "communicator", "overcame_adversity"],
    archetypeIds: ["social_influencer", "entrepreneurial_builder"],
    // Verified 2026-08 via a direct fetch of the Commons file page. US State
    // Dept official-duty photograph (2016) — public domain as a work of a
    // federal employee, not merely US-government-hosted.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Oprah_Winfrey_2016.jpg",
      width: 1108,
      height: 1604,
      source: "Wikimedia Commons",
      license: "Public Domain (U.S. Government work)",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Oprah_Winfrey_2016.jpg",
      attribution: "U.S. Embassy South Africa",
    },
    sources: [wiki("oprah", "Oprah Winfrey")],
    rows: {
      curiosity: [78, 0.62, "s", "N"],
      analytical_rigor: [58, 0.45, "i", "N"],
      intuitive_synthesis: [85, 0.7, "s", "A"],
      systems_abstraction: [55, 0.42, "i", "N"],
      independent_thinking: [80, 0.65, "s", "A"],
      creative_originality: [72, 0.55, "s", "N"],
      experimentation: [65, 0.5, "i", "N"],
      cross_domain_range: [60, 0.48, "i", "N"],
      aesthetic_sensitivity: [58, 0.45, "i", "N"],
      discipline: [82, 0.65, "s", "A"],
      deep_focus: [68, 0.52, "i", "N"],
      detail_orientation: [62, 0.48, "i", "N"],
      perfectionism: [65, 0.5, "i", "N"],
      execution_speed: [78, 0.6, "s", "A"],
      planning_orientation: [68, 0.52, "i", "N"],
      persistence: [90, 0.75, "s", "A"],
      adaptability: [85, 0.7, "s", "A"],
      risk_tolerance: [72, 0.55, "s", "N"],
      ambiguity_tolerance: [68, 0.52, "i", "N"],
      decisiveness: [78, 0.6, "s", "A"],
      social_assertiveness: [92, 0.82, "d", "A"],
      collaboration: [78, 0.62, "s", "A"],
      leadership_drive: [85, 0.7, "s", "A"],
      persuasiveness: [92, 0.8, "d", "A"],
      conflict_tolerance: [62, 0.48, "i", "N"],
      mastery_orientation: [68, 0.5, "i", "N"],
      achievement_drive: [88, 0.72, "s", "N"],
      competitiveness: [70, 0.52, "i", "N"],
      autonomy_need: [78, 0.6, "s", "N"],
      impact_motivation: [88, 0.72, "s", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6, symmetric protocol):
      //   - opportunity_sensing (68, 0.55, s) — shifted her show in the
      //     1980s toward personal, empathetic, issue-driven content ahead
      //     of competitors' sensationalist tabloid-style format, recognizing
      //     a shift in what audiences actually wanted; distinct from her
      //     already-scored intuitive_synthesis/persuasiveness (general
      //     insight/influence), specifically about reading a market/
      //     audience-taste shift.
      //   - proactive_agency (75, 0.6, s, A) — founded Harpo Productions in
      //     1986 to take ownership/control of her own content rather than
      //     remain hired talent, unusually early for the era.
      // resourcefulness/belief_updating: no supporting evidence either
      // direction — childhood hardship is not itself a resourcefulness
      // episode absent a documented means-substitution act.
      opportunity_sensing: [68, 0.55, "s", "A"],
      proactive_agency: [75, 0.6, "s", "A"],
    },
  },
  {
    id: "p_simone_biles",
    slug: "simone-biles",
    canonicalName: "Simone Biles",
    birthYear: 1997,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["US"],
    regionCode: "north_america",
    occupationIds: ["athlete"],
    fieldIds: ["sport"],
    impactDomains: ["athletic", "cultural"],
    tagIds: ["competitor", "advocate"],
    archetypeIds: ["competitive_performer"],
    sources: [wiki("biles", "Simone Biles")],
    rows: {
      curiosity: [55, 0.45, "i", "N"],
      analytical_rigor: [55, 0.42, "i", "N"],
      independent_thinking: [72, 0.58, "s", "N"],
      creative_originality: [68, 0.52, "s", "N"],
      experimentation: [70, 0.55, "s", "N"],
      discipline: [97, 0.88, "d", "A"],
      deep_focus: [88, 0.72, "s", "A"],
      detail_orientation: [82, 0.65, "s", "A"],
      perfectionism: [85, 0.68, "s", "D"],
      execution_speed: [80, 0.62, "s", "A"],
      planning_orientation: [75, 0.58, "s", "A"],
      persistence: [95, 0.82, "d", "A"],
      adaptability: [82, 0.65, "s", "A"],
      risk_tolerance: [78, 0.62, "s", "N"],
      ambiguity_tolerance: [58, 0.45, "i", "N"],
      decisiveness: [80, 0.62, "s", "A"],
      social_assertiveness: [70, 0.55, "s", "N"],
      collaboration: [65, 0.5, "i", "N"],
      leadership_drive: [65, 0.5, "s", "N"],
      persuasiveness: [62, 0.48, "i", "N"],
      conflict_tolerance: [58, 0.45, "i", "N"],
      mastery_orientation: [95, 0.82, "d", "A"],
      achievement_drive: [95, 0.85, "d", "A"],
      competitiveness: [92, 0.8, "d", "D"],
      autonomy_need: [68, 0.52, "i", "N"],
      impact_motivation: [75, 0.58, "s", "A"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6, symmetric protocol): proactive_
      // agency (65, 0.55, s, D) — the 2021 Tokyo Olympics withdrawal from
      // team/individual events citing mental health, a self-directed
      // decision against significant public and institutional pressure to
      // continue; genuinely controversial at the time (hence dual-edged),
      // later broadly reassessed. opportunity_sensing/resourcefulness/
      // belief_updating: checked against both poles, no qualifying episode
      // either direction.
      proactive_agency: [65, 0.55, "s", "D"],
    },
  },
  {
    id: "p_yayoi_kusama",
    slug: "yayoi-kusama",
    canonicalName: "Yayoi Kusama",
    birthYear: 1929,
    isLiving: true,
    era: "contemporary",
    nationalityCodes: ["JP"],
    regionCode: "east_asia",
    occupationIds: ["artist"],
    fieldIds: ["art"],
    impactDomains: ["artistic", "cultural"],
    tagIds: ["independent", "prolific"],
    archetypeIds: ["independent_creator", "creative_creator"],
    // Verified 2026-08 via a direct fetch of the Commons file page. Lifetime
    // photograph (video still, c. 2002-2005) from George Quasha's "art is
    // (Speaking Portraits)" project.
    portrait: {
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Yayoi_Kusama_circa_2004.jpg",
      width: 1435,
      height: 1078,
      source: "Wikimedia Commons",
      license: "CC BY 3.0",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Yayoi_Kusama_circa_2004.jpg",
      attribution: "George Quasha",
    },
    sources: [wiki("kusama", "Yayoi Kusama")],
    rows: {
      curiosity: [70, 0.55, "s", "N"],
      analytical_rigor: [48, 0.4, "i", "N"],
      intuitive_synthesis: [90, 0.75, "s", "A"],
      systems_abstraction: [55, 0.42, "i", "N"],
      independent_thinking: [95, 0.85, "d", "A"],
      creative_originality: [96, 0.88, "d", "A"],
      experimentation: [85, 0.7, "s", "A"],
      cross_domain_range: [58, 0.45, "i", "N"],
      aesthetic_sensitivity: [94, 0.82, "d", "A"],
      discipline: [90, 0.75, "s", "A"],
      deep_focus: [92, 0.78, "s", "A"],
      detail_orientation: [85, 0.68, "s", "A"],
      perfectionism: [82, 0.65, "s", "D"],
      execution_speed: [72, 0.55, "s", "N"],
      planning_orientation: [45, 0.42, "i", "N"],
      persistence: [92, 0.78, "s", "A"],
      adaptability: [65, 0.5, "i", "N"],
      risk_tolerance: [72, 0.55, "s", "N"],
      ambiguity_tolerance: [78, 0.6, "s", "A"],
      decisiveness: [68, 0.5, "i", "N"],
      social_assertiveness: [45, 0.5, "s", "N"],
      collaboration: [38, 0.5, "s", "N"],
      leadership_drive: [42, 0.45, "i", "N"],
      persuasiveness: [55, 0.42, "i", "N"],
      conflict_tolerance: [55, 0.42, "i", "N"],
      mastery_orientation: [82, 0.65, "s", "A"],
      achievement_drive: [72, 0.55, "i", "N"],
      competitiveness: [45, 0.4, "i", "N"],
      autonomy_need: [92, 0.78, "d", "A"],
      impact_motivation: [70, 0.52, "i", "N"],
      // taxonomy_v1.1 (Stage 5, Phase 6.6, symmetric protocol):
      //   - resourcefulness (75, 0.58, s, A) — moved to the US in 1957 with
      //     very limited money, sewing her own clothes and doing odd work
      //     to survive while creating art in an unfamiliar country before
      //     gaining any recognition — a genuine constraint met by
      //     improvised means, distinct from her already-scored persistence.
      //   - proactive_agency (70, 0.55, s, A) — self-initiated the move
      //     itself, including writing directly to Georgia O'Keeffe for
      //     advice/encouragement beforehand, entirely self-directed.
      // opportunity_sensing/belief_updating: no supporting evidence either
      // direction.
      resourcefulness: [75, 0.58, "s", "A"],
      proactive_agency: [70, 0.55, "s", "A"],
    },
  },
];

export const ROSTER_2: readonly Person[] = seeds.map(build);
