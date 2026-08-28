/**
 * ROSTER 8 — roster-1000 session 11 (3 people, revised after
 * the session-11 scoring-integrity re-audit).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed) via
 * `src/dev/roster1000/generateRoster8.ts`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline the earlier rosters use.
 *
 * Session 11 originally researched 20 candidates and, after a confidence-
 * band reclassification pass, all 20 initially cleared `eligibility_v2`.
 * A subsequent audit (docs/roster-1000-checkpoint.md §75) found that
 * reclassification pass was threshold-driven for a real subset of rows —
 * some rows were reclassified primarily because the numeric eligibility
 * bar required it, not because the rubric independently supported the
 * higher confidence tier. A blind re-review (§76) re-judged every
 * touched row against `scoring-rubric-v1.md` §2/§3 without reference to
 * eligibility outcome, reverted the threshold-driven rows, and only THEN
 * re-ran `eligibility_v2` against the locked result. **Only 3 of the
 * original 20 candidates remained eligible: benito-juarez, joan-of-arc,
 * julius-caesar.** The other 17 are preserved, unscored-value-unchanged,
 * as `held` candidates in `data-pipeline/candidates/` with an honest
 * `holdReason` — nothing about their underlying evidence was deleted,
 * only the confidence-tier assignment that had been inflated to cross
 * the threshold.
 *
 * Korean display names for these people were added to `person.name.*` in
 * `src/core/i18n/ko.ts` in session 11, before the re-audit; they remain
 * valid for the 3 who stayed eligible.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_benito_juarez",
    slug: "benito-juarez",
    canonicalName: "Benito Juarez",
    birthYear: 1806,
    deathYear: 1872,
    isLiving: false,
    era: "19th_century",
    nationalityCodes: ["MX"],
    regionCode: "latin_america",
    occupationIds: ["statesman", "lawyer"],
    fieldIds: ["politics", "law"],
    impactDomains: ["historical", "social"],
    tagIds: ["overcame_adversity", "reconciliation", "leader"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q182276" },
    sources: [{ id: "src_juarez_wikipedia", kind: "wikipedia", title: "Benito Juarez", url: "https://en.wikipedia.org/wiki/Benito_Ju%C3%A1rez" }, { id: "src_juarez_biography", kind: "biography", title: "Historical biographical accounts of the La Reforma period and the French intervention in Mexico" }],
    rows: {
      // Led a government that operated continuously, often relocating under military pressure, throughout the French intervention (1862-1867) rather than accepting exile or capitulation, documented via the sustained historical record of his government's movements and continued functioning during that period.
      persistence: [92, 0.68, "d", "A"],
      // Ordered the trial and execution of Emperor Maximilian I after the Republic's victory despite extensive international pressure (including from the United States and European governments) for clemency, documented via the historical record of the decision and the diplomatic correspondence around it.
      decisiveness: [82, 0.62, "d", "D"],
      // Widely documented for austere, legally formal personal conduct, including insisting Maximilian receive a formal court-martial trial rather than summary execution even amid war conditions, documented via the historical record of the trial proceedings themselves.
      discipline: [78, 0.58, "d", "A"],
      // Rose from an orphaned, Spanish-illiterate Zapotec child (he did not learn Spanish until around age 12) to become a lawyer, state governor, and ultimately Mexico's first Indigenous president, documented via the well-corroborated historical record of his early life and career.
      achievement_drive: [85, 0.6, "d", "A"],
      // Led the Liberal government through the Reform War against Conservative and Church-aligned forces, and later sustained direct armed conflict against French occupation for five years, documented via the extended historical record of both conflicts.
      conflict_tolerance: [76, 0.55, "d", "D"],
      // Served continuously as president through extraordinary institutional disruption, maintaining a functioning claim to legitimate government even while it lacked a fixed capital, documented via the sustained historical continuity of his administration.
      leadership_drive: [74, 0.52, "d", "A"],
      // The La Reforma laws he championed (separation of church and state, land reform, civil registry) addressed structural issues affecting the broader population rather than only consolidating personal power, inferred from the substantive content of the reforms themselves.
      impact_motivation: [70, 0.5, "s", "A"],
      // Sustained a functioning government while relocating repeatedly under military pressure and with limited resources during the French intervention, inferred as requiring significant improvisation from the documented conditions of that period.
      resourcefulness: [68, 0.52, "s", "A"],
      // Continued leading armed resistance against a French-backed empire with substantial military superiority rather than accepting exile, inferred as significant risk tolerance from the documented military imbalance of the conflict.
      risk_tolerance: [70, 0.52, "s", "D"],
      // Coordinated a multi-year legislative reform program (La Reforma) alongside ongoing military conflict, inferred as requiring real strategic planning from the documented scope and sequencing of the reform laws.
      planning_orientation: [62, 0.52, "s", "A"],
      // Moved between four distinct documented roles -- lawyer, judge, provincial governor, and wartime head of state -- across a career spanning major political upheaval, inferred from the documented convergence of this range of roles.
      adaptability: [64, 0.55, "s", "A"],
      // Maintained an independent government claim throughout the French intervention rather than accepting accommodation with the imperial regime, inferred as real autonomy orientation from the documented refusal to negotiate a settlement.
      autonomy_need: [58, 0.42, "i", "N"],
      // Worked within a cabinet and allied Liberal military commanders throughout both the Reform War and the French intervention, a genuinely collaborative wartime leadership structure, inferred from the documented composition of his governments.
      collaboration: [55, 0.42, "i", "N"],
      // His legal training and insistence on formal judicial process even in extraordinary circumstances (the Maximilian trial) suggests careful attention to procedural correctness, inferred from the documented formality of that episode.
      detail_orientation: [60, 0.5, "s", "A"],
      // Pursued anticlerical liberal reforms that broke sharply with prevailing conservative Mexican political and religious authority of the era, inferred as independent political judgment from the documented departure of the Reform laws from prior norms.
      independent_thinking: [58, 0.4, "i", "N"],
      // Rose through Oaxacan legal and political institutions from a non-elite background to statewide and then national office, inferred as requiring real social assertiveness from the documented trajectory of that rise.
      social_assertiveness: [56, 0.4, "i", "N"],
      // His documented career centers narrowly on law and governance rather than broader intellectual range, an honest moderate score reflecting the specific, focused character of his recorded activities.
      curiosity: [48, 0.4, "i", "N"],
      // Positioned the Liberal party to capitalize on Conservative military and political weakness at key points in both the Reform War and the French intervention, inferred from the documented timing of major Liberal political and military gains.
      opportunity_sensing: [52, 0.4, "i", "N"],
      // Maintained sustained direct engagement with the legal proceedings of the Maximilian trial and the ongoing government administration simultaneously, inferred as capacity for concentrated attention under crisis conditions from the documented parallel demands of that period.
      deep_focus: [58, 0.4, "i", "A"],
      // Progressed through increasingly senior legal and political roles (lawyer, judge, governor, president) over decades, inferred as accumulating and applying growing expertise from the documented trajectory of his career.
      mastery_orientation: [50, 0.4, "i", "A"],
      // The La Reforma laws applied existing European liberal constitutional principles to Mexican circumstances rather than introducing wholly novel political theory, an honest moderate score reflecting the documented, adaptation-based rather than originary character of the reforms.
      creative_originality: [46, 0.4, "i", "N"],
    },
  },
  {
    id: "p_joan_of_arc",
    slug: "joan-of-arc",
    canonicalName: "Joan of Arc",
    birthYear: 1412,
    deathYear: 1431,
    isLiving: false,
    era: "medieval",
    nationalityCodes: ["FR"],
    regionCode: "western_europe",
    occupationIds: ["military_leader"],
    fieldIds: ["military", "religion"],
    impactDomains: ["historical", "cultural"],
    tagIds: ["young_leader", "nonconformist", "endured_imprisonment"],
    archetypeIds: ["organizational_leader", "independent_creator"],
    externalIdentity: { wikidataId: "Q7226" },
    sources: [{ id: "src_joanofarc_wikipedia", kind: "wikipedia", title: "Joan of Arc", url: "https://en.wikipedia.org/wiki/Joan_of_Arc" }, { id: "src_joanofarc_trial", kind: "archive", title: "The Trial of Condemnation (1431) -- scribal transcript of Joan's own recorded testimony under interrogation" }, { id: "src_joanofarc_nullification", kind: "archive", title: "The Nullification Trial (1455-1456) -- witness testimony from those who knew her, gathered to posthumously overturn her conviction" }],
    rows: {
      // As an unknown peasant teenager with no rank or family standing, traveled to the Dauphin's court and insisted on an audience, then insisted on being given troops and equipment to relieve the siege of Orléans -- documented in both the trial testimony and contemporary court chronicles.
      decisiveness: [90, 0.68, "d", "A"],
      // Sustained weeks of hostile theological interrogation by trained clergy at her trial without breaking under pressure, documented directly in the scribal trial transcript -- one of the rare cases of literal first-person testimony surviving for a medieval individual, not later reconstruction.
      conflict_tolerance: [85, 0.68, "d", "A"],
      // Was wounded by a crossbow bolt during the assault on Orléans and, per multiple witness accounts at the later Nullification Trial, returned to the fighting after treatment rather than withdrawing; ultimately refused to permanently recant her claimed visions even facing execution.
      risk_tolerance: [84, 0.62, "d", "A"],
      // Convinced the Dauphin's court, and subsequently French troops and commanders, to follow her leadership despite having no prior military standing or noble birth, documented via contemporary chronicles and Nullification Trial witness testimony describing the effect of her conviction on soldiers' morale.
      persuasiveness: [80, 0.58, "d", "A"],
      // Continued wearing male soldier's clothing against direct clerical instruction to stop, a central charge at her trial, documented explicitly in the trial transcript as her own stated, repeated choice rather than an incidental detail.
      independent_thinking: [82, 0.62, "d", "D"],
      // Pursued a singular, self-declared mission (lifting the siege of Orléans and securing the Dauphin's coronation) with total focus from her arrival at court through the coronation at Reims, inferred from the tightly sequenced documented timeline of her actual campaign.
      achievement_drive: [78, 0.55, "s", "A"],
      // Contemporary chronicles record that when the Dauphin attempted to test her by disguising himself among his courtiers, she identified him correctly and unprompted -- a specific, widely repeated episode across multiple near-contemporary sources.
      social_assertiveness: [76, 0.55, "d", "A"],
      // Was granted nominal co-command alongside experienced captains at Orléans and was consistently described by them, per Nullification Trial testimony, as driving the army's aggressive tempo even while deferring to their tactical expertise, inferred from the convergence of multiple witnesses' accounts.
      leadership_drive: [72, 0.5, "s", "A"],
      // Repeatedly stated at trial that she answered to her own claimed divine instruction rather than to the clerical authority interrogating her, documented directly in the trial transcript's recorded exchanges.
      autonomy_need: [78, 0.55, "d", "N"],
      // Continued pursuing military campaigns (the failed assault on Paris, later engagements) after the successful relief of Orléans and the coronation, rather than treating her stated mission as complete, inferred from the documented continuation of her military activity through her capture.
      persistence: [74, 0.52, "s", "A"],
      // Trial testimony shows her giving consistent, unchanging answers under sustained pressure to alter her account, suggesting more steadfastness than flexibility -- scored moderate rather than high, since firmness under interrogation is a distinct trait from adaptability.
      adaptability: [55, 0.45, "i", "N"],
      // Her stated goals throughout (per both trials) centered on the kingdom's outcome -- lifting the siege, the coronation -- rather than personal reward or status, inferred from the consistency of her stated motivation across both the hostile 1431 trial and the friendlier 1456 testimony.
      impact_motivation: [68, 0.48, "i", "N"],
      // The trial record shows a narrowly focused, singular sense of mission with little evidence of broader intellectual exploration beyond her stated purpose -- an honest lower score reflecting the actual documented focus of her testimony, not a gap in the sources.
      curiosity: [40, 0.42, "i", "N"],
      // Nullification Trial witnesses described her as maintaining a notably strict, disciplined personal conduct while campaigning (attending Mass regularly, insisting on order among the soldiers), inferred from the convergence of multiple independent witness accounts on this specific point.
      discipline: [62, 0.52, "s", "A"],
      // Her documented conduct centers on mission accomplishment rather than personal rivalry with commanders or peers, a genuinely moderate/low signal rather than a strong lean toward competitiveness specifically.
      competitiveness: [45, 0.4, "i", "N"],
      // Consistently deferred detailed tactical planning to experienced captains (per Nullification Trial testimony) while driving urgency and morale herself, an honest lower score for this specific trait rather than crediting her with tactical planning the sources attribute to others.
      planning_orientation: [42, 0.4, "i", "N"],
      // Worked within an existing military command structure alongside veteran captains at Orléans rather than commanding independently, inferred as a moderate, genuinely mixed signal from the documented co-command arrangement.
      collaboration: [58, 0.4, "i", "N"],
      // Her entire documented life and testimony center on a single military-religious mission with no evidence of activity outside it, an honest low score for breadth reflecting the narrow, intense focus the sources themselves document.
      cross_domain_range: [35, 0.4, "i", "N"],
      // The same narrow, singular, undivided focus on her mission that produces the low curiosity/cross_domain_range scores above is itself direct evidence of intense concentrated absorption in one goal, inferred from the same well-documented trial and Nullification Trial record of her exclusive focus.
      deep_focus: [78, 0.5, "s", "A"],
      // Her entire path to influence -- an unranked peasant girl claiming divine visions to secure royal military command -- had no real precedent for a person of her background, inferred as a genuinely novel approach from the documented absence of comparable prior cases in the sources.
      creative_originality: [55, 0.42, "i", "N"],
      // Her documented military career lasted only about two years before capture, too brief a window for the sources to show meaningful skill refinement over time, an honest lower score reflecting the short duration of the record rather than a gap in it.
      mastery_orientation: [40, 0.4, "i", "N"],
    },
  },
  {
    id: "p_julius_caesar",
    slug: "julius-caesar",
    canonicalName: "Julius Caesar",
    birthYear: -100,
    deathYear: -44,
    isLiving: false,
    era: "ancient",
    nationalityCodes: [],
    regionCode: "southern_europe",
    historicalPolityKey: "polity.roman_republic",
    occupationIds: ["military_leader", "statesman"],
    fieldIds: ["military", "politics", "literature"],
    impactDomains: ["historical", "cultural"],
    tagIds: ["strategist", "conqueror", "leader"],
    archetypeIds: ["organizational_leader"],
    externalIdentity: { wikidataId: "Q1048" },
    // Verified 2026-08 via a direct fetch of the Commons file page. NOT a
    // lifetime likeness — the Tusculum portrait, a Roman marble bust (44
    // BCE), the only extant contemporary sculpture of Caesar (Archaeological
    // Museum of Turin). The photograph of the bust is separately licensed
    // CC BY 2.0 by its photographer; the underlying sculpture is itself
    // public domain (ancient work).
    portrait: {
      url: "/portraits/julius-caesar-tusculum-bust.jpg",
      width: 1178,
      height: 1600,
      source: "Wikimedia Commons",
      license: "CC BY 2.0",
      licenseUrl: "https://commons.wikimedia.org/wiki/File:Retrato_de_Julio_C%C3%A9sar_(26724093101)_(cropped).jpg",
      attribution: "Ángel M. Felicísimo (photograph of the Tusculum portrait, 44 BCE)",
    },
    sources: [{ id: "src_caesar_wikipedia", kind: "wikipedia", title: "Julius Caesar", url: "https://en.wikipedia.org/wiki/Julius_Caesar" }, { id: "src_caesar_commentaries", kind: "archive", title: "Caesar's own Commentarii de Bello Gallico and de Bello Civili (first-person campaign accounts)" }, { id: "src_caesar_suetonius", kind: "biography", title: "Suetonius, The Twelve Caesars (Life of Julius Caesar)" }, { id: "src_caesar_plutarch", kind: "biography", title: "Plutarch, Life of Caesar" }],
    rows: {
      // Crossed the Rubicon with his legion in 49 BCE, a single irreversible act triggering civil war, reportedly with the words "alea iacta est" (the die is cast) -- documented across multiple ancient sources (Suetonius, Plutarch, Appian) converging on the same decisive act.
      decisiveness: [90, 0.68, "d", "A"],
      // The Rubicon crossing itself was a calculated but existential political and physical risk (illegal for a general to enter Italy under arms); Suetonius also records that as a young man captured by pirates, he insisted his ransom was too low and later returned to hunt down and execute his captors -- a repeated pattern of accepting high personal risk, documented across sources.
      risk_tolerance: [86, 0.65, "d", "D"],
      // Famous for rapid campaign tempo, summarized in his own reported dispatch after the Battle of Zela: "veni, vidi, vici" (I came, I saw, I conquered) -- documented via Suetonius's direct quotation, and consistent with the compressed campaign timelines described throughout his own Commentarii.
      execution_speed: [88, 0.62, "d", "A"],
      // His own Commentarii de Bello Gallico present terrain, logistics, and tribal politics in clear, structured, analytically organized prose -- a primary-source document in his own words, though written partly for political self-presentation, which this rubric's ancient-evidence discipline accounts for via the confidence cap rather than the score.
      analytical_rigor: [80, 0.62, "d", "A"],
      // Coordinated multi-year, multi-front campaigns across Gaul with supply lines, allied-tribe diplomacy, and seasonal timing, documented via his own Commentarii; the accounts describe outcomes and logistics in enough consistent detail across multiple campaigns to support strong_inference for underlying planning capacity.
      planning_orientation: [78, 0.58, "s", "A"],
      // Pursued and held the consulship, proconsular military command, and ultimately the dictatorship, documented via the consistent political record across Suetonius, Plutarch, and contemporary references in Cicero's own letters -- an unusually well-corroborated ancient case since Cicero's correspondence is genuinely contemporary, not later biography.
      leadership_drive: [84, 0.6, "d", "D"],
      // Repeatedly secured legionary loyalty during politically fraught moments (crossing the Rubicon, the civil war) and Senate/popular support for major reforms, documented across multiple sources as a consistent pattern rather than a single episode.
      persuasiveness: [76, 0.55, "s", "A"],
      // Shifted rapidly between military command, political maneuvering in Rome, and administrative governance as dictator across a compressed timeline, documented via the sequence of his own recorded career moves.
      adaptability: [74, 0.52, "s", "A"],
      // Sustained direct political conflict with the Senate, Pompey, and the optimates for over a decade rather than seeking accommodation, documented via the consistent trajectory from the First Triumvirate's breakdown through the civil war.
      conflict_tolerance: [82, 0.58, "s", "D"],
      // Pursued an unusually compressed sequence of major offices and honors (praetor, consul, proconsul of Gaul, dictator) relative to typical Roman cursus honorum timing, documented via the political record, suggesting genuine drive toward exceptional achievement specifically.
      achievement_drive: [82, 0.55, "s", "D"],
      // Implemented the Julian calendar reform (replacing the lunar Roman calendar with a solar 365.25-day system used for over 1,500 years afterward) and broader administrative/citizenship reforms as dictator, documented via the historical record of his reforms.
      systems_abstraction: [70, 0.5, "s", "A"],
      // Formed and maintained the First Triumvirate alliance with Pompey and Crassus for years before its breakdown, documented via the political record -- a genuinely mixed signal (real sustained alliance-building, but one that ultimately collapsed into conflict), scored moderate rather than high.
      collaboration: [50, 0.42, "i", "N"],
      // Suetonius records Caesar weeping before a statue of Alexander the Great, reportedly distressed at having achieved less at the same age -- a documented anecdote (single source, hence not scored higher) consistent with the broader pattern of his rapid pursuit of exceptional distinction.
      competitiveness: [78, 0.42, "i", "D"],
      // His Commentarii include detailed ethnographic and geographic observation of Gallic and Germanic peoples well beyond military necessity, suggesting some genuine intellectual curiosity alongside the propagandistic purpose of the text.
      curiosity: [62, 0.42, "i", "N"],
      // His reforms as dictator (debt relief, land redistribution, citizenship extension to provincials) addressed real, longstanding structural grievances rather than only consolidating personal power, inferred from the substance of the reforms themselves.
      impact_motivation: [72, 0.48, "i", "N"],
      // Sustained a demanding, near-continuous campaign schedule across nearly a decade in Gaul, inferred from the consistency of the campaign record in his own Commentarii.
      discipline: [68, 0.42, "i", "A"],
      // Operated at a high level across military command, political strategy, legislative reform, and literary composition (his Commentarii are still regarded as a Latin prose stylistic model), inferred from the documented breadth of his activities.
      cross_domain_range: [64, 0.42, "i", "A"],
      // Repeatedly acted outside or against explicit Senate authorization (Gaul campaigns beyond mandate, the Rubicon crossing) when he judged it necessary, inferred from the documented pattern of unilateral action.
      autonomy_need: [66, 0.4, "i", "N"],
      // Sustained the Gallic campaign across roughly eight years despite significant setbacks (the near-disaster at Gergovia, the prolonged siege of Alesia), inferred from the documented multi-year continuity of the campaign in his own Commentarii.
      persistence: [76, 0.5, "s", "A"],
      // Repeatedly acted against explicit Senate instruction when he judged circumstances required it, inferred as independent political and military judgment from the same documented pattern of unilateral action noted above.
      independent_thinking: [72, 0.48, "s", "D"],
      // Suetonius records that Caesar could dictate correspondence to multiple scribes simultaneously while traveling or in camp, inferred as evidence of sustained concentrated output even under distracting conditions, from this specific documented account.
      deep_focus: [62, 0.42, "i", "A"],
    },
  },
];

export const ROSTER_8: readonly Person[] = seeds.map(build);
